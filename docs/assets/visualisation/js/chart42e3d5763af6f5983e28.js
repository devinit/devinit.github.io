(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_plots_polar_index_js-node_modules_plotly_js_src_traces_sca-265508"],{

/***/ "./node_modules/plotly.js/src/plots/polar/constants.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/constants.js ***!
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



module.exports = {
    attr: 'subplot',
    name: 'polar',

    axisNames: ['angularaxis', 'radialaxis'],
    axisName2dataArray: {angularaxis: 'theta', radialaxis: 'r'},

    layerNames: [
        'draglayer',
        'plotbg',
        'backplot',
        'angular-grid',
        'radial-grid',
        'frontplot',
        'angular-line',
        'radial-line',
        'angular-axis',
        'radial-axis'
    ],

    radialDragBoxSize: 50,
    angularDragBoxSize: 30,
    cornerLen: 25,
    cornerHalfWidth: 2,

    // pixels to move mouse before you stop clamping to starting point
    MINDRAG: 8,
    // smallest radial distance [px] allowed for a zoombox
    MINZOOM: 20,
    // distance [px] off (r=0) or (r=radius) where we transition
    // from single-sided to two-sided radial zoom
    OFFEDGE: 20
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/helpers.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/helpers.js ***!
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
var polygonTester = __webpack_require__(/*! ../../lib/polygon */ "./node_modules/plotly.js/src/lib/polygon.js").tester;

var findIndexOfMin = Lib.findIndexOfMin;
var isAngleInsideSector = Lib.isAngleInsideSector;
var angleDelta = Lib.angleDelta;
var angleDist = Lib.angleDist;

/**
 * is pt (r,a) inside polygon made up vertices at angles 'vangles'
 * inside a given polar sector
 *
 * @param {number} r : pt's radial coordinate
 * @param {number} a : pt's angular coordinate in *radians*
 * @param {2-item array} rBnds : sector's radial bounds
 * @param {2-item array} aBnds : sector's angular bounds *radians*
 * @param {array} vangles : angles of polygon vertices in *radians*
 * @return {boolean}
 */
function isPtInsidePolygon(r, a, rBnds, aBnds, vangles) {
    if(!isAngleInsideSector(a, aBnds)) return false;

    var r0, r1;

    if(rBnds[0] < rBnds[1]) {
        r0 = rBnds[0];
        r1 = rBnds[1];
    } else {
        r0 = rBnds[1];
        r1 = rBnds[0];
    }

    var polygonIn = polygonTester(makePolygon(r0, aBnds[0], aBnds[1], vangles));
    var polygonOut = polygonTester(makePolygon(r1, aBnds[0], aBnds[1], vangles));
    var xy = [r * Math.cos(a), r * Math.sin(a)];
    return polygonOut.contains(xy) && !polygonIn.contains(xy);
}

// find intersection of 'v0' <-> 'v1' edge with a ray at angle 'a'
// (i.e. a line that starts from the origin at angle 'a')
// given an (xp,yp) pair on the 'v0' <-> 'v1' line
// (N.B. 'v0' and 'v1' are angles in radians)
function findIntersectionXY(v0, v1, a, xpyp) {
    var xstar, ystar;

    var xp = xpyp[0];
    var yp = xpyp[1];
    var dsin = clampTiny(Math.sin(v1) - Math.sin(v0));
    var dcos = clampTiny(Math.cos(v1) - Math.cos(v0));
    var tanA = Math.tan(a);
    var cotanA = clampTiny(1 / tanA);
    var m = dsin / dcos;
    var b = yp - m * xp;

    if(cotanA) {
        if(dsin && dcos) {
            // given
            //  g(x) := v0 -> v1 line = m*x + b
            //  h(x) := ray at angle 'a' = m*x = tanA*x
            // solve g(xstar) = h(xstar)
            xstar = b / (tanA - m);
            ystar = tanA * xstar;
        } else if(dcos) {
            // horizontal v0 -> v1
            xstar = yp * cotanA;
            ystar = yp;
        } else {
            // vertical v0 -> v1
            xstar = xp;
            ystar = xp * tanA;
        }
    } else {
        // vertical ray
        if(dsin && dcos) {
            xstar = 0;
            ystar = b;
        } else if(dcos) {
            xstar = 0;
            ystar = yp;
        } else {
            // does this case exists?
            xstar = ystar = NaN;
        }
    }

    return [xstar, ystar];
}

// solves l^2 = (f(x)^2 - yp)^2 + (x - xp)^2
// rearranged into 0 = a*x^2 + b * x + c
//
// where f(x) = m*x + t + yp
// and   (x0, x1) = (-b +/- del) / (2*a)
function findXYatLength(l, m, xp, yp) {
    var t = -m * xp;
    var a = m * m + 1;
    var b = 2 * (m * t - xp);
    var c = t * t + xp * xp - l * l;
    var del = Math.sqrt(b * b - 4 * a * c);
    var x0 = (-b + del) / (2 * a);
    var x1 = (-b - del) / (2 * a);
    return [
        [x0, m * x0 + t + yp],
        [x1, m * x1 + t + yp]
    ];
}

function makeRegularPolygon(r, vangles) {
    var len = vangles.length;
    var vertices = new Array(len + 1);
    var i;
    for(i = 0; i < len; i++) {
        var va = vangles[i];
        vertices[i] = [r * Math.cos(va), r * Math.sin(va)];
    }
    vertices[i] = vertices[0].slice();
    return vertices;
}

function makeClippedPolygon(r, a0, a1, vangles) {
    var len = vangles.length;
    var vertices = [];
    var i, j;

    function a2xy(a) {
        return [r * Math.cos(a), r * Math.sin(a)];
    }

    function findXY(va0, va1, s) {
        return findIntersectionXY(va0, va1, s, a2xy(va0));
    }

    function cycleIndex(ind) {
        return Lib.mod(ind, len);
    }

    function isInside(v) {
        return isAngleInsideSector(v, [a0, a1]);
    }

    // find index in sector closest to a0
    // use it to find intersection of v[i0] <-> v[i0-1] edge with sector radius
    var i0 = findIndexOfMin(vangles, function(v) {
        return isInside(v) ? angleDist(v, a0) : Infinity;
    });
    var xy0 = findXY(vangles[i0], vangles[cycleIndex(i0 - 1)], a0);
    vertices.push(xy0);

    // fill in in-sector vertices
    for(i = i0, j = 0; j < len; i++, j++) {
        var va = vangles[cycleIndex(i)];
        if(!isInside(va)) break;
        vertices.push(a2xy(va));
    }

    // find index in sector closest to a1,
    // use it to find intersection of v[iN] <-> v[iN+1] edge with sector radius
    var iN = findIndexOfMin(vangles, function(v) {
        return isInside(v) ? angleDist(v, a1) : Infinity;
    });
    var xyN = findXY(vangles[iN], vangles[cycleIndex(iN + 1)], a1);
    vertices.push(xyN);

    vertices.push([0, 0]);
    vertices.push(vertices[0].slice());

    return vertices;
}

function makePolygon(r, a0, a1, vangles) {
    return Lib.isFullCircle([a0, a1]) ?
        makeRegularPolygon(r, vangles) :
        makeClippedPolygon(r, a0, a1, vangles);
}

function findPolygonOffset(r, a0, a1, vangles) {
    var minX = Infinity;
    var minY = Infinity;
    var vertices = makePolygon(r, a0, a1, vangles);

    for(var i = 0; i < vertices.length; i++) {
        var v = vertices[i];
        minX = Math.min(minX, v[0]);
        minY = Math.min(minY, -v[1]);
    }
    return [minX, minY];
}

/**
 * find vertex angles (in 'vangles') the enclose angle 'a'
 *
 * @param {number} a : angle in *radians*
 * @param {array} vangles : angles of polygon vertices in *radians*
 * @return {2-item array}
 */
function findEnclosingVertexAngles(a, vangles) {
    var minFn = function(v) {
        var adelta = angleDelta(v, a);
        return adelta > 0 ? adelta : Infinity;
    };
    var i0 = findIndexOfMin(vangles, minFn);
    var i1 = Lib.mod(i0 + 1, vangles.length);
    return [vangles[i0], vangles[i1]];
}

// to more easily catch 'almost zero' numbers in if-else blocks
function clampTiny(v) {
    return Math.abs(v) > 1e-10 ? v : 0;
}

function transformForSVG(pts0, cx, cy) {
    cx = cx || 0;
    cy = cy || 0;

    var len = pts0.length;
    var pts1 = new Array(len);

    for(var i = 0; i < len; i++) {
        var pt = pts0[i];
        pts1[i] = [cx + pt[0], cy - pt[1]];
    }
    return pts1;
}

/**
 * path polygon
 *
 * @param {number} r : polygon 'radius'
 * @param {number} a0 : first angular coordinate in *radians*
 * @param {number} a1 : second angular coordinate in *radians*
 * @param {array} vangles : angles of polygon vertices in *radians*
 * @param {number (optional)} cx : x coordinate of center
 * @param {number (optional)} cy : y coordinate of center
 * @return {string} svg path
 *
 */
function pathPolygon(r, a0, a1, vangles, cx, cy) {
    var poly = makePolygon(r, a0, a1, vangles);
    return 'M' + transformForSVG(poly, cx, cy).join('L');
}

/**
 * path a polygon 'annulus'
 * i.e. a polygon with a concentric hole
 *
 * N.B. this routine uses the evenodd SVG rule
 *
 * @param {number} r0 : first radial coordinate
 * @param {number} r1 : second radial coordinate
 * @param {number} a0 : first angular coordinate in *radians*
 * @param {number} a1 : second angular coordinate in *radians*
 * @param {array} vangles : angles of polygon vertices in *radians*
 * @param {number (optional)} cx : x coordinate of center
 * @param {number (optional)} cy : y coordinate of center
 * @return {string} svg path
 *
 */
function pathPolygonAnnulus(r0, r1, a0, a1, vangles, cx, cy) {
    var rStart, rEnd;

    if(r0 < r1) {
        rStart = r0;
        rEnd = r1;
    } else {
        rStart = r1;
        rEnd = r0;
    }

    var inner = transformForSVG(makePolygon(rStart, a0, a1, vangles), cx, cy);
    var outer = transformForSVG(makePolygon(rEnd, a0, a1, vangles), cx, cy);
    return 'M' + outer.reverse().join('L') + 'M' + inner.join('L');
}

module.exports = {
    isPtInsidePolygon: isPtInsidePolygon,
    findPolygonOffset: findPolygonOffset,
    findEnclosingVertexAngles: findEnclosingVertexAngles,
    findIntersectionXY: findIntersectionXY,
    findXYatLength: findXYatLength,
    clampTiny: clampTiny,
    pathPolygon: pathPolygon,
    pathPolygonAnnulus: pathPolygonAnnulus
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/index.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var getSubplotCalcData = __webpack_require__(/*! ../get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getSubplotCalcData;
var counterRegex = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").counterRegex;

var createPolar = __webpack_require__(/*! ./polar */ "./node_modules/plotly.js/src/plots/polar/polar.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/polar/constants.js");

var attr = constants.attr;
var name = constants.name;
var counter = counterRegex(name);

var attributes = {};
attributes[attr] = {
    valType: 'subplotid',
    role: 'info',
    dflt: name,
    editType: 'calc',
    description: [
        'Sets a reference between this trace\'s data coordinates and',
        'a polar subplot.',
        'If *polar* (the default value), the data refer to `layout.polar`.',
        'If *polar2*, the data refer to `layout.polar2`, and so on.'
    ].join(' ')
};

function plot(gd) {
    var fullLayout = gd._fullLayout;
    var calcData = gd.calcdata;
    var subplotIds = fullLayout._subplots[name];

    for(var i = 0; i < subplotIds.length; i++) {
        var id = subplotIds[i];
        var subplotCalcData = getSubplotCalcData(calcData, name, id);
        var subplot = fullLayout[id]._subplot;

        if(!subplot) {
            subplot = createPolar(gd, id);
            fullLayout[id]._subplot = subplot;
        }

        subplot.plot(subplotCalcData, fullLayout, gd._promises);
    }
}

function clean(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var oldIds = oldFullLayout._subplots[name] || [];
    var hadGl = (oldFullLayout._has && oldFullLayout._has('gl'));
    var hasGl = (newFullLayout._has && newFullLayout._has('gl'));
    var mustCleanScene = hadGl && !hasGl;

    for(var i = 0; i < oldIds.length; i++) {
        var id = oldIds[i];
        var oldSubplot = oldFullLayout[id]._subplot;

        if(!newFullLayout[id] && !!oldSubplot) {
            oldSubplot.framework.remove();
            oldSubplot.layers['radial-axis-title'].remove();

            for(var k in oldSubplot.clipPaths) {
                oldSubplot.clipPaths[k].remove();
            }
        }

        if(mustCleanScene && oldSubplot._scene) {
            oldSubplot._scene.destroy();
            oldSubplot._scene = null;
        }
    }
}

module.exports = {
    attr: attr,
    name: name,
    idRoot: name,
    idRegex: counter,
    attrRegex: counter,
    attributes: attributes,
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/polar/layout_attributes.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/plots/polar/layout_defaults.js"),
    plot: plot,
    clean: clean,
    toSVG: __webpack_require__(/*! ../cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js").toSVG
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/layout_attributes.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/layout_attributes.js ***!
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



var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");
var axesAttrs = __webpack_require__(/*! ../cartesian/layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");
var domainAttrs = __webpack_require__(/*! ../domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var extendFlat = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var axisLineGridAttr = overrideAll({
    color: axesAttrs.color,
    showline: extendFlat({}, axesAttrs.showline, {dflt: true}),
    linecolor: axesAttrs.linecolor,
    linewidth: axesAttrs.linewidth,
    showgrid: extendFlat({}, axesAttrs.showgrid, {dflt: true}),
    gridcolor: axesAttrs.gridcolor,
    gridwidth: axesAttrs.gridwidth

    // TODO add spike* attributes down the road

    // should we add zeroline* attributes?

}, 'plot', 'from-root');

var axisTickAttrs = overrideAll({
    tickmode: axesAttrs.tickmode,
    nticks: axesAttrs.nticks,
    tick0: axesAttrs.tick0,
    dtick: axesAttrs.dtick,
    tickvals: axesAttrs.tickvals,
    ticktext: axesAttrs.ticktext,
    ticks: axesAttrs.ticks,
    ticklen: axesAttrs.ticklen,
    tickwidth: axesAttrs.tickwidth,
    tickcolor: axesAttrs.tickcolor,
    showticklabels: axesAttrs.showticklabels,
    showtickprefix: axesAttrs.showtickprefix,
    tickprefix: axesAttrs.tickprefix,
    showticksuffix: axesAttrs.showticksuffix,
    ticksuffix: axesAttrs.ticksuffix,
    showexponent: axesAttrs.showexponent,
    exponentformat: axesAttrs.exponentformat,
    separatethousands: axesAttrs.separatethousands,
    tickfont: axesAttrs.tickfont,
    tickangle: axesAttrs.tickangle,
    tickformat: axesAttrs.tickformat,
    tickformatstops: axesAttrs.tickformatstops,
    layer: axesAttrs.layer
}, 'plot', 'from-root');

var radialAxisAttrs = {
    visible: extendFlat({}, axesAttrs.visible, {dflt: true}),
    type: extendFlat({}, axesAttrs.type, {
        values: ['-', 'linear', 'log', 'date', 'category']
    }),

    autorange: extendFlat({}, axesAttrs.autorange, {editType: 'plot'}),
    rangemode: {
        valType: 'enumerated',
        values: ['tozero', 'nonnegative', 'normal'],
        dflt: 'tozero',
        role: 'style',
        editType: 'calc',
        description: [
            'If *tozero*`, the range extends to 0,',
            'regardless of the input data',
            'If *nonnegative*, the range is non-negative,',
            'regardless of the input data.',
            'If *normal*, the range is computed in relation to the extrema',
            'of the input data (same behavior as for cartesian axes).'
        ].join(' ')
    },
    range: extendFlat({}, axesAttrs.range, {
        items: [
            {valType: 'any', editType: 'plot', impliedEdits: {'^autorange': false}},
            {valType: 'any', editType: 'plot', impliedEdits: {'^autorange': false}}
        ],
        editType: 'plot'
    }),

    categoryorder: axesAttrs.categoryorder,
    categoryarray: axesAttrs.categoryarray,

    angle: {
        valType: 'angle',
        editType: 'plot',
        role: 'info',
        description: [
            'Sets the angle (in degrees) from which the radial axis is drawn.',
            'Note that by default, radial axis line on the theta=0 line',
            'corresponds to a line pointing right (like what mathematicians prefer).',
            'Defaults to the first `polar.sector` angle.'
        ].join(' ')
    },

    side: {
        valType: 'enumerated',
        // TODO add 'center' for `showline: false` radial axes
        values: ['clockwise', 'counterclockwise'],
        dflt: 'clockwise',
        editType: 'plot',
        role: 'info',
        description: [
            'Determines on which side of radial axis line',
            'the tick and tick labels appear.'
        ].join(' ')
    },


    title: {
        // radial title is not gui-editable at the moment,
        // so it needs dflt: '', similar to carpet axes.
        text: extendFlat({}, axesAttrs.title.text, {editType: 'plot', dflt: ''}),
        font: extendFlat({}, axesAttrs.title.font, {editType: 'plot'}),

        // TODO
        // - might need a 'titleside' and even 'titledirection' down the road
        // - what about standoff ??

        editType: 'plot'
    },

    hoverformat: axesAttrs.hoverformat,

    uirevision: {
        valType: 'any',
        role: 'info',
        editType: 'none',
        description: [
            'Controls persistence of user-driven changes in axis `range`,',
            '`autorange`, `angle`, and `title` if in `editable: true` configuration.',
            'Defaults to `polar<N>.uirevision`.'
        ].join(' ')
    },

    editType: 'calc',

    _deprecated: {
        title: axesAttrs._deprecated.title,
        titlefont: axesAttrs._deprecated.titlefont
    }
};

extendFlat(
    radialAxisAttrs,

    // N.B. radialaxis grid lines are circular,
    // but radialaxis lines are straight from circle center to outer bound
    axisLineGridAttr,
    axisTickAttrs
);

var angularAxisAttrs = {
    visible: extendFlat({}, axesAttrs.visible, {dflt: true}),
    type: {
        valType: 'enumerated',
        // 'linear' should maybe be called 'angle' or 'angular' here
        // to make clear that axis here is periodic and more tightly match
        // `thetaunit`?
        //
        // skip 'date' for first push
        // no 'log' for now
        values: ['-', 'linear', 'category'],
        dflt: '-',
        role: 'info',
        editType: 'calc',
        _noTemplating: true,
        description: [
            'Sets the angular axis type.',
            'If *linear*, set `thetaunit` to determine the unit in which axis value are shown.',
            'If *category, use `period` to set the number of integer coordinates around polar axis.'
        ].join(' ')
    },

    categoryorder: axesAttrs.categoryorder,
    categoryarray: axesAttrs.categoryarray,

    thetaunit: {
        valType: 'enumerated',
        values: ['radians', 'degrees'],
        dflt: 'degrees',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the format unit of the formatted *theta* values.',
            'Has an effect only when `angularaxis.type` is *linear*.'
        ].join(' ')
    },

    period: {
        valType: 'number',
        editType: 'calc',
        min: 0,
        role: 'info',
        description: [
            'Set the angular period.',
            'Has an effect only when `angularaxis.type` is *category*.',
        ].join(' ')
        // Examples for date axes:
        //
        // - period that equals the timeseries length
        //  http://flowingdata.com/2017/01/24/one-dataset-visualized-25-ways/18-polar-coordinates/
        // - and 1-year periods (focusing on seasonal change0
        //  http://otexts.org/fpp2/seasonal-plots.html
        //  https://blogs.scientificamerican.com/sa-visual/why-are-so-many-babies-born-around-8-00-a-m/
        //  http://www.seasonaladjustment.com/2012/09/05/clock-plot-visualising-seasonality-using-r-and-ggplot2-part-3/
        //  https://i.pinimg.com/736x/49/b9/72/49b972ccb3206a1a6d6f870dac543280.jpg
        //  https://www.climate-lab-book.ac.uk/spirals/
    },

    direction: {
        valType: 'enumerated',
        values: ['counterclockwise', 'clockwise'],
        dflt: 'counterclockwise',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the direction corresponding to positive angles.'
        ].join(' ')
    },

    rotation: {
        valType: 'angle',
        editType: 'calc',
        role: 'info',
        description: [
            'Sets that start position (in degrees) of the angular axis',
            'By default, polar subplots with `direction` set to *counterclockwise*',
            'get a `rotation` of *0*',
            'which corresponds to due East (like what mathematicians prefer).',
            'In turn, polar with `direction` set to *clockwise* get a rotation of *90*',
            'which corresponds to due North (like on a compass),'
        ].join(' ')
    },

    hoverformat: axesAttrs.hoverformat,

    uirevision: {
        valType: 'any',
        role: 'info',
        editType: 'none',
        description: [
            'Controls persistence of user-driven changes in axis `rotation`.',
            'Defaults to `polar<N>.uirevision`.'
        ].join(' ')
    },

    editType: 'calc'
};

extendFlat(
    angularAxisAttrs,

    // N.B. angular grid lines are straight lines from circle center to outer bound
    // the angular line is circular bounding the polar plot area.
    axisLineGridAttr,

    // N.B. ticksuffix defaults to '°' for angular axes with `thetaunit: 'degrees'`
    axisTickAttrs
);

module.exports = {
    // TODO for x/y/zoom system for paper-based zooming:
    // x: {},
    // y: {},
    // zoom: {},

    domain: domainAttrs({name: 'polar', editType: 'plot'}),

    sector: {
        valType: 'info_array',
        items: [
            {valType: 'number', editType: 'plot'},
            {valType: 'number', editType: 'plot'}
        ],
        dflt: [0, 360],
        role: 'info',
        editType: 'plot',
        description: [
            'Sets angular span of this polar subplot with two angles (in degrees).',
            'Sector are assumed to be spanned in the counterclockwise direction',
            'with *0* corresponding to rightmost limit of the polar subplot.'
        ].join(' ')
    },
    hole: {
        valType: 'number',
        min: 0,
        max: 1,
        dflt: 0,
        editType: 'plot',
        role: 'info',
        description: [
            'Sets the fraction of the radius to cut out of the polar subplot.'
        ].join(' ')
    },

    bgcolor: {
        valType: 'color',
        role: 'style',
        editType: 'plot',
        dflt: colorAttrs.background,
        description: 'Set the background color of the subplot'
    },

    radialaxis: radialAxisAttrs,
    angularaxis: angularAxisAttrs,

    gridshape: {
        valType: 'enumerated',
        values: ['circular', 'linear'],
        dflt: 'circular',
        role: 'style',
        editType: 'plot',
        description: [
            'Determines if the radial axis grid lines and angular axis line are drawn',
            'as *circular* sectors or as *linear* (polygon) sectors.',
            'Has an effect only when the angular axis has `type` *category*.',
            'Note that `radialaxis.angle` is snapped to the angle of the closest',
            'vertex when `gridshape` is *circular*',
            '(so that radial axis scale is the same as the data scale).'
        ].join(' ')
    },

    // TODO maybe?
    // annotations:

    uirevision: {
        valType: 'any',
        role: 'info',
        editType: 'none',
        description: [
            'Controls persistence of user-driven changes in axis attributes,',
            'if not overridden in the individual axes.',
            'Defaults to `layout.uirevision`.'
        ].join(' ')
    },

    editType: 'calc'
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/layout_defaults.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/layout_defaults.js ***!
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
var Template = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");

var handleSubplotDefaults = __webpack_require__(/*! ../subplot_defaults */ "./node_modules/plotly.js/src/plots/subplot_defaults.js");
var getSubplotData = __webpack_require__(/*! ../get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getSubplotData;

var handleTickValueDefaults = __webpack_require__(/*! ../cartesian/tick_value_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_value_defaults.js");
var handleTickMarkDefaults = __webpack_require__(/*! ../cartesian/tick_mark_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_mark_defaults.js");
var handleTickLabelDefaults = __webpack_require__(/*! ../cartesian/tick_label_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_label_defaults.js");
var handleCategoryOrderDefaults = __webpack_require__(/*! ../cartesian/category_order_defaults */ "./node_modules/plotly.js/src/plots/cartesian/category_order_defaults.js");
var handleLineGridDefaults = __webpack_require__(/*! ../cartesian/line_grid_defaults */ "./node_modules/plotly.js/src/plots/cartesian/line_grid_defaults.js");
var autoType = __webpack_require__(/*! ../cartesian/axis_autotype */ "./node_modules/plotly.js/src/plots/cartesian/axis_autotype.js");

var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/polar/layout_attributes.js");
var setConvert = __webpack_require__(/*! ./set_convert */ "./node_modules/plotly.js/src/plots/polar/set_convert.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/polar/constants.js");
var axisNames = constants.axisNames;

function handleDefaults(contIn, contOut, coerce, opts) {
    var bgColor = coerce('bgcolor');
    opts.bgColor = Color.combine(bgColor, opts.paper_bgcolor);

    var sector = coerce('sector');
    coerce('hole');

    // could optimize, subplotData is not always needed!
    var subplotData = getSubplotData(opts.fullData, constants.name, opts.id);
    var layoutOut = opts.layoutOut;
    var axName;

    function coerceAxis(attr, dflt) {
        return coerce(axName + '.' + attr, dflt);
    }

    for(var i = 0; i < axisNames.length; i++) {
        axName = axisNames[i];

        if(!Lib.isPlainObject(contIn[axName])) {
            contIn[axName] = {};
        }

        var axIn = contIn[axName];
        var axOut = Template.newContainer(contOut, axName);
        axOut._id = axOut._name = axName;
        axOut._attr = opts.id + '.' + axName;
        axOut._traceIndices = subplotData.map(function(t) { return t._expandedIndex; });

        var dataAttr = constants.axisName2dataArray[axName];
        var axType = handleAxisTypeDefaults(axIn, axOut, coerceAxis, subplotData, dataAttr);

        handleCategoryOrderDefaults(axIn, axOut, coerceAxis, {
            axData: subplotData,
            dataAttr: dataAttr
        });

        var visible = coerceAxis('visible');
        setConvert(axOut, contOut, layoutOut);

        coerceAxis('uirevision', contOut.uirevision);

        var dfltColor;
        var dfltFontColor;

        if(visible) {
            dfltColor = coerceAxis('color');
            dfltFontColor = (dfltColor === axIn.color) ? dfltColor : opts.font.color;
        }

        // We don't want to make downstream code call ax.setScale,
        // as both radial and angular axes don't have a set domain.
        // Furthermore, angular axes don't have a set range.
        //
        // Mocked domains and ranges are set by the polar subplot instances,
        // but Axes.findExtremes uses the sign of _m to determine which padding value
        // to use.
        //
        // By setting, _m to 1 here, we make Axes.findExtremes think that
        // range[1] > range[0], and vice-versa for `autorange: 'reversed'` below.
        axOut._m = 1;

        switch(axName) {
            case 'radialaxis':
                var autoRange = coerceAxis('autorange', !axOut.isValidRange(axIn.range));
                axIn.autorange = autoRange;
                if(autoRange && (axType === 'linear' || axType === '-')) coerceAxis('rangemode');
                if(autoRange === 'reversed') axOut._m = -1;

                coerceAxis('range');
                axOut.cleanRange('range', {dfltRange: [0, 1]});

                if(visible) {
                    coerceAxis('side');
                    coerceAxis('angle', sector[0]);

                    coerceAxis('title.text');
                    Lib.coerceFont(coerceAxis, 'title.font', {
                        family: opts.font.family,
                        size: Math.round(opts.font.size * 1.2),
                        color: dfltFontColor
                    });
                }
                break;

            case 'angularaxis':
                // We do not support 'true' date angular axes yet,
                // users can still plot dates on angular axes by setting
                // `angularaxis.type: 'category'`.
                //
                // Here, if a date angular axes is detected, we make
                // all its corresponding traces invisible, so that
                // when we do add support for data angular axes, the new
                // behavior won't conflict with existing behavior
                if(axType === 'date') {
                    Lib.log('Polar plots do not support date angular axes yet.');

                    for(var j = 0; j < subplotData.length; j++) {
                        subplotData[j].visible = false;
                    }

                    // turn this into a 'dummy' linear axis so that
                    // the subplot still renders ok
                    axType = axIn.type = axOut.type = 'linear';
                }

                if(axType === 'linear') {
                    coerceAxis('thetaunit');
                } else {
                    coerceAxis('period');
                }

                var direction = coerceAxis('direction');
                coerceAxis('rotation', {counterclockwise: 0, clockwise: 90}[direction]);
                break;
        }

        if(visible) {
            handleTickValueDefaults(axIn, axOut, coerceAxis, axOut.type);
            handleTickLabelDefaults(axIn, axOut, coerceAxis, axOut.type, {
                tickSuffixDflt: axOut.thetaunit === 'degrees' ? '°' : undefined
            });
            handleTickMarkDefaults(axIn, axOut, coerceAxis, {outerTicks: true});

            var showTickLabels = coerceAxis('showticklabels');
            if(showTickLabels) {
                Lib.coerceFont(coerceAxis, 'tickfont', {
                    family: opts.font.family,
                    size: opts.font.size,
                    color: dfltFontColor
                });
                coerceAxis('tickangle');
                coerceAxis('tickformat');
            }

            handleLineGridDefaults(axIn, axOut, coerceAxis, {
                dfltColor: dfltColor,
                bgColor: opts.bgColor,
                // default grid color is darker here (60%, vs cartesian default ~91%)
                // because the grid is not square so the eye needs heavier cues to follow
                blend: 60,
                showLine: true,
                showGrid: true,
                noZeroLine: true,
                attributes: layoutAttributes[axName]
            });

            coerceAxis('layer');
        }

        if(axType !== 'category') coerceAxis('hoverformat');

        axOut._input = axIn;
    }

    if(contOut.angularaxis.type === 'category') {
        coerce('gridshape');
    }
}

function handleAxisTypeDefaults(axIn, axOut, coerce, subplotData, dataAttr) {
    var axType = coerce('type');

    if(axType === '-') {
        var trace;

        for(var i = 0; i < subplotData.length; i++) {
            if(subplotData[i].visible) {
                trace = subplotData[i];
                break;
            }
        }

        if(trace && trace[dataAttr]) {
            axOut.type = autoType(trace[dataAttr], 'gregorian');
        }

        if(axOut.type === '-') {
            axOut.type = 'linear';
        } else {
            // copy autoType back to input axis
            // note that if this object didn't exist
            // in the input layout, we have to put it in
            // this happens in the main supplyDefaults function
            axIn.type = axOut.type;
        }
    }

    return axOut.type;
}

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut, fullData) {
    handleSubplotDefaults(layoutIn, layoutOut, fullData, {
        type: constants.name,
        attributes: layoutAttributes,
        handleDefaults: handleDefaults,
        font: layoutOut.font,
        paper_bgcolor: layoutOut.paper_bgcolor,
        fullData: fullData,
        layoutOut: layoutOut
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/polar.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/polar.js ***!
  \*********************************************************/
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
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Plots = __webpack_require__(/*! ../plots */ "./node_modules/plotly.js/src/plots/plots.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var setConvertCartesian = __webpack_require__(/*! ../cartesian/set_convert */ "./node_modules/plotly.js/src/plots/cartesian/set_convert.js");
var setConvertPolar = __webpack_require__(/*! ./set_convert */ "./node_modules/plotly.js/src/plots/polar/set_convert.js");
var doAutoRange = __webpack_require__(/*! ../cartesian/autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").doAutoRange;
var dragBox = __webpack_require__(/*! ../cartesian/dragbox */ "./node_modules/plotly.js/src/plots/cartesian/dragbox.js");
var dragElement = __webpack_require__(/*! ../../components/dragelement */ "./node_modules/plotly.js/src/components/dragelement/index.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Titles = __webpack_require__(/*! ../../components/titles */ "./node_modules/plotly.js/src/components/titles/index.js");
var prepSelect = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").prepSelect;
var selectOnClick = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").selectOnClick;
var clearSelect = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").clearSelect;
var setCursor = __webpack_require__(/*! ../../lib/setcursor */ "./node_modules/plotly.js/src/lib/setcursor.js");
var clearGlCanvases = __webpack_require__(/*! ../../lib/clear_gl_canvases */ "./node_modules/plotly.js/src/lib/clear_gl_canvases.js");
var redrawReglTraces = __webpack_require__(/*! ../../plot_api/subroutines */ "./node_modules/plotly.js/src/plot_api/subroutines.js").redrawReglTraces;

var MID_SHIFT = __webpack_require__(/*! ../../constants/alignment */ "./node_modules/plotly.js/src/constants/alignment.js").MID_SHIFT;
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/polar/constants.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/plots/polar/helpers.js");

var _ = Lib._;
var mod = Lib.mod;
var deg2rad = Lib.deg2rad;
var rad2deg = Lib.rad2deg;

function Polar(gd, id) {
    this.id = id;
    this.gd = gd;

    this._hasClipOnAxisFalse = null;
    this.vangles = null;
    this.radialAxisAngle = null;
    this.traceHash = {};
    this.layers = {};
    this.clipPaths = {};
    this.clipIds = {};
    this.viewInitial = {};

    var fullLayout = gd._fullLayout;
    var clipIdBase = 'clip' + fullLayout._uid + id;

    this.clipIds.forTraces = clipIdBase + '-for-traces';
    this.clipPaths.forTraces = fullLayout._clips.append('clipPath')
        .attr('id', this.clipIds.forTraces);
    this.clipPaths.forTraces.append('path');

    this.framework = fullLayout._polarlayer.append('g')
        .attr('class', id);

    // unfortunately, we have to keep track of some axis tick settings
    // as polar subplots do not implement the 'ticks' editType
    this.radialTickLayout = null;
    this.angularTickLayout = null;
}

var proto = Polar.prototype;

module.exports = function createPolar(gd, id) {
    return new Polar(gd, id);
};

proto.plot = function(polarCalcData, fullLayout) {
    var _this = this;
    var polarLayout = fullLayout[_this.id];

    _this._hasClipOnAxisFalse = false;
    for(var i = 0; i < polarCalcData.length; i++) {
        var trace = polarCalcData[i][0].trace;
        if(trace.cliponaxis === false) {
            _this._hasClipOnAxisFalse = true;
            break;
        }
    }

    _this.updateLayers(fullLayout, polarLayout);
    _this.updateLayout(fullLayout, polarLayout);
    Plots.generalUpdatePerTraceModule(_this.gd, _this, polarCalcData, polarLayout);
    _this.updateFx(fullLayout, polarLayout);
};

proto.updateLayers = function(fullLayout, polarLayout) {
    var _this = this;
    var layers = _this.layers;
    var radialLayout = polarLayout.radialaxis;
    var angularLayout = polarLayout.angularaxis;
    var layerNames = constants.layerNames;

    var frontPlotIndex = layerNames.indexOf('frontplot');
    var layerData = layerNames.slice(0, frontPlotIndex);
    var isAngularAxisBelowTraces = angularLayout.layer === 'below traces';
    var isRadialAxisBelowTraces = radialLayout.layer === 'below traces';

    if(isAngularAxisBelowTraces) layerData.push('angular-line');
    if(isRadialAxisBelowTraces) layerData.push('radial-line');
    if(isAngularAxisBelowTraces) layerData.push('angular-axis');
    if(isRadialAxisBelowTraces) layerData.push('radial-axis');

    layerData.push('frontplot');

    if(!isAngularAxisBelowTraces) layerData.push('angular-line');
    if(!isRadialAxisBelowTraces) layerData.push('radial-line');
    if(!isAngularAxisBelowTraces) layerData.push('angular-axis');
    if(!isRadialAxisBelowTraces) layerData.push('radial-axis');

    var join = _this.framework.selectAll('.polarsublayer')
        .data(layerData, String);

    join.enter().append('g')
        .attr('class', function(d) { return 'polarsublayer ' + d;})
        .each(function(d) {
            var sel = layers[d] = d3.select(this);

            switch(d) {
                case 'frontplot':
                    // TODO add option to place in 'backplot' layer??
                    sel.append('g').classed('barlayer', true);
                    sel.append('g').classed('scatterlayer', true);
                    break;
                case 'backplot':
                    sel.append('g').classed('maplayer', true);
                    break;
                case 'plotbg':
                    layers.bg = sel.append('path');
                    break;
                case 'radial-grid':
                    sel.style('fill', 'none');
                    break;
                case 'angular-grid':
                    sel.style('fill', 'none');
                    break;
                case 'radial-line':
                    sel.append('line').style('fill', 'none');
                    break;
                case 'angular-line':
                    sel.append('path').style('fill', 'none');
                    break;
            }
        });

    join.order();
};

/* Polar subplots juggle with 6 'axis objects' (!), these are:
 *
 * - polarLayout.radialaxis (aka radialLayout in this file):
 * - polarLayout.angularaxis (aka angularLayout in this file):
 *   used for data -> calcdata conversions (aka d2c) during the calc step
 *
 * - this.radialAxis
 *   extends polarLayout.radialaxis, adds mocked 'domain' and
 *   few other keys in order to reuse Cartesian doAutoRange and the Axes
 *   drawing routines.
 *   used for calcdata -> geometric conversions (aka c2g) during the plot step
 *   + setGeometry setups ax.c2g for given ax.range
 *   + setScale setups ax._m,ax._b for given ax.range
 *
 * - this.angularAxis
 *   extends polarLayout.angularaxis, adds mocked 'range' and 'domain' and
 *   a few other keys in order to reuse the Axes drawing routines.
 *   used for calcdata -> geometric conversions (aka c2g) during the plot step
 *   + setGeometry setups ax.c2g given ax.rotation, ax.direction & ax._categories,
 *                 and mocks ax.range
 *   + setScale setups ax._m,ax._b with that mocked ax.range
 *
 * - this.xaxis
 * - this.yaxis
 *   setup so that polar traces can reuse plot methods of Cartesian traces
 *   which mostly rely on 2pixel methods (e.g ax.c2p)
 */
proto.updateLayout = function(fullLayout, polarLayout) {
    var _this = this;
    var layers = _this.layers;
    var gs = fullLayout._size;

    // axis attributes
    var radialLayout = polarLayout.radialaxis;
    var angularLayout = polarLayout.angularaxis;
    // layout domains
    var xDomain = polarLayout.domain.x;
    var yDomain = polarLayout.domain.y;
    // offsets from paper edge to layout domain box
    _this.xOffset = gs.l + gs.w * xDomain[0];
    _this.yOffset = gs.t + gs.h * (1 - yDomain[1]);
    // lengths of the layout domain box
    var xLength = _this.xLength = gs.w * (xDomain[1] - xDomain[0]);
    var yLength = _this.yLength = gs.h * (yDomain[1] - yDomain[0]);
    // sector to plot
    var sector = polarLayout.sector;
    _this.sectorInRad = sector.map(deg2rad);
    var sectorBBox = _this.sectorBBox = computeSectorBBox(sector);
    var dxSectorBBox = sectorBBox[2] - sectorBBox[0];
    var dySectorBBox = sectorBBox[3] - sectorBBox[1];
    // aspect ratios
    var arDomain = yLength / xLength;
    var arSector = Math.abs(dySectorBBox / dxSectorBBox);
    // actual lengths and domains of subplot box
    var xLength2, yLength2;
    var xDomain2, yDomain2;
    var gap;
    if(arDomain > arSector) {
        xLength2 = xLength;
        yLength2 = xLength * arSector;
        gap = (yLength - yLength2) / gs.h / 2;
        xDomain2 = [xDomain[0], xDomain[1]];
        yDomain2 = [yDomain[0] + gap, yDomain[1] - gap];
    } else {
        xLength2 = yLength / arSector;
        yLength2 = yLength;
        gap = (xLength - xLength2) / gs.w / 2;
        xDomain2 = [xDomain[0] + gap, xDomain[1] - gap];
        yDomain2 = [yDomain[0], yDomain[1]];
    }
    _this.xLength2 = xLength2;
    _this.yLength2 = yLength2;
    _this.xDomain2 = xDomain2;
    _this.yDomain2 = yDomain2;
    // actual offsets from paper edge to the subplot box top-left corner
    var xOffset2 = _this.xOffset2 = gs.l + gs.w * xDomain2[0];
    var yOffset2 = _this.yOffset2 = gs.t + gs.h * (1 - yDomain2[1]);
    // circle radius in px
    var radius = _this.radius = xLength2 / dxSectorBBox;
    // 'inner' radius in px (when polar.hole is set)
    var innerRadius = _this.innerRadius = polarLayout.hole * radius;
    // circle center position in px
    var cx = _this.cx = xOffset2 - radius * sectorBBox[0];
    var cy = _this.cy = yOffset2 + radius * sectorBBox[3];
    // circle center in the coordinate system of plot area
    var cxx = _this.cxx = cx - xOffset2;
    var cyy = _this.cyy = cy - yOffset2;

    _this.radialAxis = _this.mockAxis(fullLayout, polarLayout, radialLayout, {
        // make this an 'x' axis to make positioning (especially rotation) easier
        _id: 'x',
        // convert to 'x' axis equivalent
        side: {
            counterclockwise: 'top',
            clockwise: 'bottom'
        }[radialLayout.side],
        // spans length 1 radius
        domain: [innerRadius / gs.w, radius / gs.w]
    });

    _this.angularAxis = _this.mockAxis(fullLayout, polarLayout, angularLayout, {
        side: 'right',
        // to get auto nticks right
        domain: [0, Math.PI],
        // don't pass through autorange logic
        autorange: false
    });

    _this.doAutoRange(fullLayout, polarLayout);
    // N.B. this sets _this.vangles
    _this.updateAngularAxis(fullLayout, polarLayout);
    // N.B. this sets _this.radialAxisAngle
    _this.updateRadialAxis(fullLayout, polarLayout);
    _this.updateRadialAxisTitle(fullLayout, polarLayout);

    _this.xaxis = _this.mockCartesianAxis(fullLayout, polarLayout, {
        _id: 'x',
        domain: xDomain2
    });

    _this.yaxis = _this.mockCartesianAxis(fullLayout, polarLayout, {
        _id: 'y',
        domain: yDomain2
    });

    var dPath = _this.pathSubplot();

    _this.clipPaths.forTraces.select('path')
        .attr('d', dPath)
        .attr('transform', strTranslate(cxx, cyy));

    layers.frontplot
        .attr('transform', strTranslate(xOffset2, yOffset2))
        .call(Drawing.setClipUrl, _this._hasClipOnAxisFalse ? null : _this.clipIds.forTraces, _this.gd);

    layers.bg
        .attr('d', dPath)
        .attr('transform', strTranslate(cx, cy))
        .call(Color.fill, polarLayout.bgcolor);
};

proto.mockAxis = function(fullLayout, polarLayout, axLayout, opts) {
    var ax = Lib.extendFlat({}, axLayout, opts);
    setConvertPolar(ax, polarLayout, fullLayout);
    return ax;
};

proto.mockCartesianAxis = function(fullLayout, polarLayout, opts) {
    var _this = this;
    var axId = opts._id;

    var ax = Lib.extendFlat({type: 'linear'}, opts);
    setConvertCartesian(ax, fullLayout);

    var bboxIndices = {
        x: [0, 2],
        y: [1, 3]
    };

    ax.setRange = function() {
        var sectorBBox = _this.sectorBBox;
        var ind = bboxIndices[axId];
        var rl = _this.radialAxis._rl;
        var drl = (rl[1] - rl[0]) / (1 - polarLayout.hole);
        ax.range = [sectorBBox[ind[0]] * drl, sectorBBox[ind[1]] * drl];
    };

    ax.isPtWithinRange = axId === 'x' ?
        function(d) { return _this.isPtInside(d); } :
        function() { return true; };

    ax.setRange();
    ax.setScale();
    return ax;
};

proto.doAutoRange = function(fullLayout, polarLayout) {
    var gd = this.gd;
    var radialAxis = this.radialAxis;
    var radialLayout = polarLayout.radialaxis;

    radialAxis.setScale();
    doAutoRange(gd, radialAxis);

    var rng = radialAxis.range;
    radialLayout.range = rng.slice();
    radialLayout._input.range = rng.slice();

    radialAxis._rl = [
        radialAxis.r2l(rng[0], null, 'gregorian'),
        radialAxis.r2l(rng[1], null, 'gregorian')
    ];
};

proto.updateRadialAxis = function(fullLayout, polarLayout) {
    var _this = this;
    var gd = _this.gd;
    var layers = _this.layers;
    var radius = _this.radius;
    var innerRadius = _this.innerRadius;
    var cx = _this.cx;
    var cy = _this.cy;
    var radialLayout = polarLayout.radialaxis;
    var a0 = mod(polarLayout.sector[0], 360);
    var ax = _this.radialAxis;
    var hasRoomForIt = innerRadius < radius;

    _this.fillViewInitialKey('radialaxis.angle', radialLayout.angle);
    _this.fillViewInitialKey('radialaxis.range', ax.range.slice());

    ax.setGeometry();

    // rotate auto tick labels by 180 if in quadrant II and III to make them
    // readable from left-to-right
    //
    // TODO try moving deeper in Axes.drawLabels for better results?
    if(ax.tickangle === 'auto' && (a0 > 90 && a0 <= 270)) {
        ax.tickangle = 180;
    }

    // easier to set rotate angle with custom translate function
    var transFn = function(d) {
        return 'translate(' + (ax.l2p(d.x) + innerRadius) + ',0)';
    };

    // set special grid path function
    var gridPathFn = function(d) {
        return _this.pathArc(ax.r2p(d.x) + innerRadius);
    };

    var newTickLayout = strTickLayout(radialLayout);
    if(_this.radialTickLayout !== newTickLayout) {
        layers['radial-axis'].selectAll('.xtick').remove();
        _this.radialTickLayout = newTickLayout;
    }

    if(hasRoomForIt) {
        ax.setScale();

        var vals = Axes.calcTicks(ax);
        var valsClipped = Axes.clipEnds(ax, vals);
        var tickSign = Axes.getTickSigns(ax)[2];

        Axes.drawTicks(gd, ax, {
            vals: vals,
            layer: layers['radial-axis'],
            path: Axes.makeTickPath(ax, 0, tickSign),
            transFn: transFn,
            crisp: false
        });

        Axes.drawGrid(gd, ax, {
            vals: valsClipped,
            layer: layers['radial-grid'],
            path: gridPathFn,
            transFn: Lib.noop,
            crisp: false
        });

        Axes.drawLabels(gd, ax, {
            vals: vals,
            layer: layers['radial-axis'],
            transFn: transFn,
            labelFns: Axes.makeLabelFns(ax, 0)
        });
    }

    // stash 'actual' radial axis angle for drag handlers (in degrees)
    var angle = _this.radialAxisAngle = _this.vangles ?
        rad2deg(snapToVertexAngle(deg2rad(radialLayout.angle), _this.vangles)) :
        radialLayout.angle;

    var tLayer = strTranslate(cx, cy);
    var tLayer2 = tLayer + strRotate(-angle);

    updateElement(
        layers['radial-axis'],
        hasRoomForIt && (radialLayout.showticklabels || radialLayout.ticks),
        {transform: tLayer2}
    );

    updateElement(
        layers['radial-grid'],
        hasRoomForIt && radialLayout.showgrid,
        {transform: tLayer}
    );

    updateElement(
        layers['radial-line'].select('line'),
        hasRoomForIt && radialLayout.showline,
        {
            x1: innerRadius,
            y1: 0,
            x2: radius,
            y2: 0,
            transform: tLayer2
        }
    )
    .attr('stroke-width', radialLayout.linewidth)
    .call(Color.stroke, radialLayout.linecolor);
};

proto.updateRadialAxisTitle = function(fullLayout, polarLayout, _angle) {
    var _this = this;
    var gd = _this.gd;
    var radius = _this.radius;
    var cx = _this.cx;
    var cy = _this.cy;
    var radialLayout = polarLayout.radialaxis;
    var titleClass = _this.id + 'title';

    var angle = _angle !== undefined ? _angle : _this.radialAxisAngle;
    var angleRad = deg2rad(angle);
    var cosa = Math.cos(angleRad);
    var sina = Math.sin(angleRad);

    var pad = 0;

    // Hint: no need to check if there is in fact a title.text set
    // because if plot is editable, pad needs to be calculated anyways
    // to properly show placeholder text when title is empty.
    if(radialLayout.title) {
        var h = Drawing.bBox(_this.layers['radial-axis'].node()).height;
        var ts = radialLayout.title.font.size;
        pad = radialLayout.side === 'counterclockwise' ?
            -h - ts * 0.4 :
            h + ts * 0.8;
    }

    _this.layers['radial-axis-title'] = Titles.draw(gd, titleClass, {
        propContainer: radialLayout,
        propName: _this.id + '.radialaxis.title',
        placeholder: _(gd, 'Click to enter radial axis title'),
        attributes: {
            x: cx + (radius / 2) * cosa + pad * sina,
            y: cy - (radius / 2) * sina + pad * cosa,
            'text-anchor': 'middle'
        },
        transform: {rotate: -angle}
    });
};

proto.updateAngularAxis = function(fullLayout, polarLayout) {
    var _this = this;
    var gd = _this.gd;
    var layers = _this.layers;
    var radius = _this.radius;
    var innerRadius = _this.innerRadius;
    var cx = _this.cx;
    var cy = _this.cy;
    var angularLayout = polarLayout.angularaxis;
    var ax = _this.angularAxis;

    _this.fillViewInitialKey('angularaxis.rotation', angularLayout.rotation);

    ax.setGeometry();
    ax.setScale();

    // 't'ick to 'g'eometric radians is used all over the place here
    var t2g = function(d) { return ax.t2g(d.x); };

    // run rad2deg on tick0 and ditck for thetaunit: 'radians' axes
    if(ax.type === 'linear' && ax.thetaunit === 'radians') {
        ax.tick0 = rad2deg(ax.tick0);
        ax.dtick = rad2deg(ax.dtick);
    }

    var _transFn = function(rad) {
        return strTranslate(cx + radius * Math.cos(rad), cy - radius * Math.sin(rad));
    };

    var transFn = function(d) {
        return _transFn(t2g(d));
    };

    var transFn2 = function(d) {
        var rad = t2g(d);
        return _transFn(rad) + strRotate(-rad2deg(rad));
    };

    var gridPathFn = function(d) {
        var rad = t2g(d);
        var cosRad = Math.cos(rad);
        var sinRad = Math.sin(rad);
        return 'M' + [cx + innerRadius * cosRad, cy - innerRadius * sinRad] +
            'L' + [cx + radius * cosRad, cy - radius * sinRad];
    };

    var out = Axes.makeLabelFns(ax, 0);
    var labelStandoff = out.labelStandoff;
    var labelFns = {};

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

    var newTickLayout = strTickLayout(angularLayout);
    if(_this.angularTickLayout !== newTickLayout) {
        layers['angular-axis'].selectAll('.' + ax._id + 'tick').remove();
        _this.angularTickLayout = newTickLayout;
    }

    var vals = Axes.calcTicks(ax);

    // angle of polygon vertices in geometric radians (null means circles)
    // TODO what to do when ax.period > ax._categories ??
    var vangles;
    if(polarLayout.gridshape === 'linear') {
        vangles = vals.map(t2g);

        // ax._vals should be always ordered, make them
        // always turn counterclockwise for convenience here
        if(Lib.angleDelta(vangles[0], vangles[1]) < 0) {
            vangles = vangles.slice().reverse();
        }
    } else {
        vangles = null;
    }
    _this.vangles = vangles;

    // Use tickval filter for category axes instead of tweaking
    // the range w.r.t sector, so that sectors that cross 360 can
    // show all their ticks.
    if(ax.type === 'category') {
        vals = vals.filter(function(d) {
            return Lib.isAngleInsideSector(t2g(d), _this.sectorInRad);
        });
    }

    if(ax.visible) {
        var tickSign = ax.ticks === 'inside' ? -1 : 1;
        var pad = (ax.linewidth || 1) / 2;

        Axes.drawTicks(gd, ax, {
            vals: vals,
            layer: layers['angular-axis'],
            path: 'M' + (tickSign * pad) + ',0h' + (tickSign * ax.ticklen),
            transFn: transFn2,
            crisp: false
        });

        Axes.drawGrid(gd, ax, {
            vals: vals,
            layer: layers['angular-grid'],
            path: gridPathFn,
            transFn: Lib.noop,
            crisp: false
        });

        Axes.drawLabels(gd, ax, {
            vals: vals,
            layer: layers['angular-axis'],
            repositionOnUpdate: true,
            transFn: transFn,
            labelFns: labelFns
        });
    }

    // TODO maybe two arcs is better here?
    // maybe split style attributes between inner and outer angular axes?

    updateElement(layers['angular-line'].select('path'), angularLayout.showline, {
        d: _this.pathSubplot(),
        transform: strTranslate(cx, cy)
    })
    .attr('stroke-width', angularLayout.linewidth)
    .call(Color.stroke, angularLayout.linecolor);
};

proto.updateFx = function(fullLayout, polarLayout) {
    if(!this.gd._context.staticPlot) {
        this.updateAngularDrag(fullLayout);
        this.updateRadialDrag(fullLayout, polarLayout, 0);
        this.updateRadialDrag(fullLayout, polarLayout, 1);
        this.updateMainDrag(fullLayout);
    }
};

proto.updateMainDrag = function(fullLayout) {
    var _this = this;
    var gd = _this.gd;
    var layers = _this.layers;
    var zoomlayer = fullLayout._zoomlayer;
    var MINZOOM = constants.MINZOOM;
    var OFFEDGE = constants.OFFEDGE;
    var radius = _this.radius;
    var innerRadius = _this.innerRadius;
    var cx = _this.cx;
    var cy = _this.cy;
    var cxx = _this.cxx;
    var cyy = _this.cyy;
    var sectorInRad = _this.sectorInRad;
    var vangles = _this.vangles;
    var radialAxis = _this.radialAxis;
    var clampTiny = helpers.clampTiny;
    var findXYatLength = helpers.findXYatLength;
    var findEnclosingVertexAngles = helpers.findEnclosingVertexAngles;
    var chw = constants.cornerHalfWidth;
    var chl = constants.cornerLen / 2;

    var mainDrag = dragBox.makeDragger(layers, 'path', 'maindrag', 'crosshair');

    d3.select(mainDrag)
        .attr('d', _this.pathSubplot())
        .attr('transform', strTranslate(cx, cy));

    var dragOpts = {
        element: mainDrag,
        gd: gd,
        subplot: _this.id,
        plotinfo: {
            id: _this.id,
            xaxis: _this.xaxis,
            yaxis: _this.yaxis
        },
        xaxes: [_this.xaxis],
        yaxes: [_this.yaxis]
    };

    // mouse px position at drag start (0), move (1)
    var x0, y0;
    // radial distance from circle center at drag start (0), move (1)
    var r0, r1;
    // zoombox persistent quantities
    var path0, dimmed, lum;
    // zoombox, corners elements
    var zb, corners;

    function norm(x, y) {
        return Math.sqrt(x * x + y * y);
    }

    function xy2r(x, y) {
        return norm(x - cxx, y - cyy);
    }

    function xy2a(x, y) {
        return Math.atan2(cyy - y, x - cxx);
    }

    function ra2xy(r, a) {
        return [r * Math.cos(a), r * Math.sin(-a)];
    }

    function pathCorner(r, a) {
        if(r === 0) return _this.pathSector(2 * chw);

        var da = chl / r;
        var am = a - da;
        var ap = a + da;
        var rb = Math.max(0, Math.min(r, radius));
        var rm = rb - chw;
        var rp = rb + chw;

        return 'M' + ra2xy(rm, am) +
            'A' + [rm, rm] + ' 0,0,0 ' + ra2xy(rm, ap) +
            'L' + ra2xy(rp, ap) +
            'A' + [rp, rp] + ' 0,0,1 ' + ra2xy(rp, am) +
            'Z';
    }

    // (x,y) is the pt at middle of the va0 <-> va1 edge
    //
    // ... we could eventually add another mode for cursor
    // angles 'close to' enough to a particular vertex.
    function pathCornerForPolygons(r, va0, va1) {
        if(r === 0) return _this.pathSector(2 * chw);

        var xy0 = ra2xy(r, va0);
        var xy1 = ra2xy(r, va1);
        var x = clampTiny((xy0[0] + xy1[0]) / 2);
        var y = clampTiny((xy0[1] + xy1[1]) / 2);
        var innerPts, outerPts;

        if(x && y) {
            var m = y / x;
            var mperp = -1 / m;
            var midPts = findXYatLength(chw, m, x, y);
            innerPts = findXYatLength(chl, mperp, midPts[0][0], midPts[0][1]);
            outerPts = findXYatLength(chl, mperp, midPts[1][0], midPts[1][1]);
        } else {
            var dx, dy;
            if(y) {
                // horizontal handles
                dx = chl;
                dy = chw;
            } else {
                // vertical handles
                dx = chw;
                dy = chl;
            }
            innerPts = [[x - dx, y - dy], [x + dx, y - dy]];
            outerPts = [[x - dx, y + dy], [x + dx, y + dy]];
        }

        return 'M' + innerPts.join('L') +
            'L' + outerPts.reverse().join('L') + 'Z';
    }

    function zoomPrep() {
        r0 = null;
        r1 = null;
        path0 = _this.pathSubplot();
        dimmed = false;

        var polarLayoutNow = gd._fullLayout[_this.id];
        lum = tinycolor(polarLayoutNow.bgcolor).getLuminance();

        zb = dragBox.makeZoombox(zoomlayer, lum, cx, cy, path0);
        zb.attr('fill-rule', 'evenodd');
        corners = dragBox.makeCorners(zoomlayer, cx, cy);
        clearSelect(gd);
    }

    // N.B. this sets scoped 'r0' and 'r1'
    // return true if 'valid' zoom distance, false otherwise
    function clampAndSetR0R1(rr0, rr1) {
        rr1 = Math.max(Math.min(rr1, radius), innerRadius);

        // starting or ending drag near center (outer edge),
        // clamps radial distance at origin (at r=radius)
        if(rr0 < OFFEDGE) rr0 = 0;
        else if((radius - rr0) < OFFEDGE) rr0 = radius;
        else if(rr1 < OFFEDGE) rr1 = 0;
        else if((radius - rr1) < OFFEDGE) rr1 = radius;

        // make sure r0 < r1,
        // to get correct fill pattern in path1 below
        if(Math.abs(rr1 - rr0) > MINZOOM) {
            if(rr0 < rr1) {
                r0 = rr0;
                r1 = rr1;
            } else {
                r0 = rr1;
                r1 = rr0;
            }
            return true;
        } else {
            r0 = null;
            r1 = null;
            return false;
        }
    }

    function applyZoomMove(path1, cpath) {
        path1 = path1 || path0;
        cpath = cpath || 'M0,0Z';

        zb.attr('d', path1);
        corners.attr('d', cpath);
        dragBox.transitionZoombox(zb, corners, dimmed, lum);
        dimmed = true;

        var updateObj = {};
        computeZoomUpdates(updateObj);
        gd.emit('plotly_relayouting', updateObj);
    }

    function zoomMove(dx, dy) {
        var x1 = x0 + dx;
        var y1 = y0 + dy;
        var rr0 = xy2r(x0, y0);
        var rr1 = Math.min(xy2r(x1, y1), radius);
        var a0 = xy2a(x0, y0);
        var path1;
        var cpath;

        if(clampAndSetR0R1(rr0, rr1)) {
            path1 = path0 + _this.pathSector(r1);
            if(r0) path1 += _this.pathSector(r0);
            // keep 'starting' angle
            cpath = pathCorner(r0, a0) + pathCorner(r1, a0);
        }
        applyZoomMove(path1, cpath);
    }

    function findPolygonRadius(x, y, va0, va1) {
        var xy = helpers.findIntersectionXY(va0, va1, va0, [x - cxx, cyy - y]);
        return norm(xy[0], xy[1]);
    }

    function zoomMoveForPolygons(dx, dy) {
        var x1 = x0 + dx;
        var y1 = y0 + dy;
        var a0 = xy2a(x0, y0);
        var a1 = xy2a(x1, y1);
        var vangles0 = findEnclosingVertexAngles(a0, vangles);
        var vangles1 = findEnclosingVertexAngles(a1, vangles);
        var rr0 = findPolygonRadius(x0, y0, vangles0[0], vangles0[1]);
        var rr1 = Math.min(findPolygonRadius(x1, y1, vangles1[0], vangles1[1]), radius);
        var path1;
        var cpath;

        if(clampAndSetR0R1(rr0, rr1)) {
            path1 = path0 + _this.pathSector(r1);
            if(r0) path1 += _this.pathSector(r0);
            // keep 'starting' angle here too
            cpath = [
                pathCornerForPolygons(r0, vangles0[0], vangles0[1]),
                pathCornerForPolygons(r1, vangles0[0], vangles0[1])
            ].join(' ');
        }
        applyZoomMove(path1, cpath);
    }

    function zoomDone() {
        dragBox.removeZoombox(gd);

        if(r0 === null || r1 === null) return;
        var updateObj = {};
        computeZoomUpdates(updateObj);

        dragBox.showDoubleClickNotifier(gd);

        Registry.call('_guiRelayout', gd, updateObj);
    }

    function computeZoomUpdates(update) {
        var rl = radialAxis._rl;
        var m = (rl[1] - rl[0]) / (1 - innerRadius / radius) / radius;
        var newRng = [
            rl[0] + (r0 - innerRadius) * m,
            rl[0] + (r1 - innerRadius) * m
        ];
        update[_this.id + '.radialaxis.range'] = newRng;
    }

    function zoomClick(numClicks, evt) {
        var clickMode = gd._fullLayout.clickmode;

        dragBox.removeZoombox(gd);

        // TODO double once vs twice logic (autorange vs fixed range)
        if(numClicks === 2) {
            var updateObj = {};
            for(var k in _this.viewInitial) {
                updateObj[_this.id + '.' + k] = _this.viewInitial[k];
            }

            gd.emit('plotly_doubleclick', null);
            Registry.call('_guiRelayout', gd, updateObj);
        }

        if(clickMode.indexOf('select') > -1 && numClicks === 1) {
            selectOnClick(evt, gd, [_this.xaxis], [_this.yaxis], _this.id, dragOpts);
        }

        if(clickMode.indexOf('event') > -1) {
            Fx.click(gd, evt, _this.id);
        }
    }

    dragOpts.prepFn = function(evt, startX, startY) {
        var dragModeNow = gd._fullLayout.dragmode;

        var bbox = mainDrag.getBoundingClientRect();
        x0 = startX - bbox.left;
        y0 = startY - bbox.top;

        // need to offset x/y as bbox center does not
        // match origin for asymmetric polygons
        if(vangles) {
            var offset = helpers.findPolygonOffset(radius, sectorInRad[0], sectorInRad[1], vangles);
            x0 += cxx + offset[0];
            y0 += cyy + offset[1];
        }

        switch(dragModeNow) {
            case 'zoom':
                if(vangles) {
                    dragOpts.moveFn = zoomMoveForPolygons;
                } else {
                    dragOpts.moveFn = zoomMove;
                }
                dragOpts.clickFn = zoomClick;
                dragOpts.doneFn = zoomDone;
                zoomPrep(evt, startX, startY);
                break;
            case 'select':
            case 'lasso':
                prepSelect(evt, startX, startY, dragOpts, dragModeNow);
                break;
        }
    };

    mainDrag.onmousemove = function(evt) {
        Fx.hover(gd, evt, _this.id);
        gd._fullLayout._lasthover = mainDrag;
        gd._fullLayout._hoversubplot = _this.id;
    };

    mainDrag.onmouseout = function(evt) {
        if(gd._dragging) return;
        dragElement.unhover(gd, evt);
    };

    dragElement.init(dragOpts);
};

proto.updateRadialDrag = function(fullLayout, polarLayout, rngIndex) {
    var _this = this;
    var gd = _this.gd;
    var layers = _this.layers;
    var radius = _this.radius;
    var innerRadius = _this.innerRadius;
    var cx = _this.cx;
    var cy = _this.cy;
    var radialAxis = _this.radialAxis;
    var bl = constants.radialDragBoxSize;
    var bl2 = bl / 2;

    if(!radialAxis.visible) return;

    var angle0 = deg2rad(_this.radialAxisAngle);
    var rl = radialAxis._rl;
    var rl0 = rl[0];
    var rl1 = rl[1];
    var rbase = rl[rngIndex];
    var m = 0.75 * (rl[1] - rl[0]) / (1 - polarLayout.hole) / radius;

    var tx, ty, className;
    if(rngIndex) {
        tx = cx + (radius + bl2) * Math.cos(angle0);
        ty = cy - (radius + bl2) * Math.sin(angle0);
        className = 'radialdrag';
    } else {
        // the 'inner' box can get called:
        // - when polar.hole>0
        // - when polar.sector isn't a full circle
        // otherwise it is hidden behind the main drag.
        tx = cx + (innerRadius - bl2) * Math.cos(angle0);
        ty = cy - (innerRadius - bl2) * Math.sin(angle0);
        className = 'radialdrag-inner';
    }

    var radialDrag = dragBox.makeRectDragger(layers, className, 'crosshair', -bl2, -bl2, bl, bl);
    var dragOpts = {element: radialDrag, gd: gd};

    updateElement(d3.select(radialDrag), radialAxis.visible && innerRadius < radius, {
        transform: strTranslate(tx, ty)
    });

    // move function (either rotate or re-range flavor)
    var moveFn2;
    // rotate angle on done
    var angle1;
    // re-range range[1] (or range[0]) on done
    var rprime;

    function moveFn(dx, dy) {
        if(moveFn2) {
            moveFn2(dx, dy);
        } else {
            var dvec = [dx, -dy];
            var rvec = [Math.cos(angle0), Math.sin(angle0)];
            var comp = Math.abs(Lib.dot(dvec, rvec) / Math.sqrt(Lib.dot(dvec, dvec)));

            // mostly perpendicular motions rotate,
            // mostly parallel motions re-range
            if(!isNaN(comp)) {
                moveFn2 = comp < 0.5 ? rotateMove : rerangeMove;
            }
        }

        var update = {};
        computeRadialAxisUpdates(update);
        gd.emit('plotly_relayouting', update);
    }

    function computeRadialAxisUpdates(update) {
        if(angle1 !== null) {
            update[_this.id + '.radialaxis.angle'] = angle1;
        } else if(rprime !== null) {
            update[_this.id + '.radialaxis.range[' + rngIndex + ']'] = rprime;
        }
    }

    function doneFn() {
        if(angle1 !== null) {
            Registry.call('_guiRelayout', gd, _this.id + '.radialaxis.angle', angle1);
        } else if(rprime !== null) {
            Registry.call('_guiRelayout', gd, _this.id + '.radialaxis.range[' + rngIndex + ']', rprime);
        }
    }

    function rotateMove(dx, dy) {
        // disable for inner drag boxes
        if(rngIndex === 0) return;

        var x1 = tx + dx;
        var y1 = ty + dy;

        angle1 = Math.atan2(cy - y1, x1 - cx);
        if(_this.vangles) angle1 = snapToVertexAngle(angle1, _this.vangles);
        angle1 = rad2deg(angle1);

        var transform = strTranslate(cx, cy) + strRotate(-angle1);
        layers['radial-axis'].attr('transform', transform);
        layers['radial-line'].select('line').attr('transform', transform);

        var fullLayoutNow = _this.gd._fullLayout;
        var polarLayoutNow = fullLayoutNow[_this.id];
        _this.updateRadialAxisTitle(fullLayoutNow, polarLayoutNow, angle1);
    }

    function rerangeMove(dx, dy) {
        // project (dx, dy) unto unit radial axis vector
        var dr = Lib.dot([dx, -dy], [Math.cos(angle0), Math.sin(angle0)]);
        rprime = rbase - m * dr;

        // make sure rprime does not change the range[0] -> range[1] sign
        if((m > 0) !== (rngIndex ? rprime > rl0 : rprime < rl1)) {
            rprime = null;
            return;
        }

        var fullLayoutNow = gd._fullLayout;
        var polarLayoutNow = fullLayoutNow[_this.id];

        // update radial range -> update c2g -> update _m,_b
        radialAxis.range[rngIndex] = rprime;
        radialAxis._rl[rngIndex] = rprime;
        _this.updateRadialAxis(fullLayoutNow, polarLayoutNow);

        _this.xaxis.setRange();
        _this.xaxis.setScale();
        _this.yaxis.setRange();
        _this.yaxis.setScale();

        var hasRegl = false;

        for(var traceType in _this.traceHash) {
            var moduleCalcData = _this.traceHash[traceType];
            var moduleCalcDataVisible = Lib.filterVisible(moduleCalcData);
            var _module = moduleCalcData[0][0].trace._module;
            _module.plot(gd, _this, moduleCalcDataVisible, polarLayoutNow);
            if(Registry.traceIs(traceType, 'gl') && moduleCalcDataVisible.length) hasRegl = true;
        }

        if(hasRegl) {
            clearGlCanvases(gd);
            redrawReglTraces(gd);
        }
    }

    dragOpts.prepFn = function() {
        moveFn2 = null;
        angle1 = null;
        rprime = null;

        dragOpts.moveFn = moveFn;
        dragOpts.doneFn = doneFn;

        clearSelect(gd);
    };

    dragOpts.clampFn = function(dx, dy) {
        if(Math.sqrt(dx * dx + dy * dy) < constants.MINDRAG) {
            dx = 0;
            dy = 0;
        }
        return [dx, dy];
    };

    dragElement.init(dragOpts);
};

proto.updateAngularDrag = function(fullLayout) {
    var _this = this;
    var gd = _this.gd;
    var layers = _this.layers;
    var radius = _this.radius;
    var angularAxis = _this.angularAxis;
    var cx = _this.cx;
    var cy = _this.cy;
    var cxx = _this.cxx;
    var cyy = _this.cyy;
    var dbs = constants.angularDragBoxSize;

    var angularDrag = dragBox.makeDragger(layers, 'path', 'angulardrag', 'move');
    var dragOpts = {element: angularDrag, gd: gd};

    d3.select(angularDrag)
        .attr('d', _this.pathAnnulus(radius, radius + dbs))
        .attr('transform', strTranslate(cx, cy))
        .call(setCursor, 'move');

    function xy2a(x, y) {
        return Math.atan2(cyy + dbs - y, x - cxx - dbs);
    }

    // scatter trace, points and textpoints selections
    var scatterTraces = layers.frontplot.select('.scatterlayer').selectAll('.trace');
    var scatterPoints = scatterTraces.selectAll('.point');
    var scatterTextPoints = scatterTraces.selectAll('.textpoint');

    // mouse px position at drag start (0), move (1)
    var x0, y0;
    // angular axis angle rotation at drag start (0), move (1)
    var rot0, rot1;
    // induced radial axis rotation (only used on polygon grids)
    var rrot1;
    // angle about circle center at drag start
    var a0;

    function moveFn(dx, dy) {
        var fullLayoutNow = _this.gd._fullLayout;
        var polarLayoutNow = fullLayoutNow[_this.id];

        var x1 = x0 + dx;
        var y1 = y0 + dy;
        var a1 = xy2a(x1, y1);
        var da = rad2deg(a1 - a0);
        rot1 = rot0 + da;

        layers.frontplot.attr('transform',
            strTranslate(_this.xOffset2, _this.yOffset2) + strRotate([-da, cxx, cyy])
        );

        if(_this.vangles) {
            rrot1 = _this.radialAxisAngle + da;

            var trans = strTranslate(cx, cy) + strRotate(-da);
            var trans2 = strTranslate(cx, cy) + strRotate(-rrot1);

            layers.bg.attr('transform', trans);
            layers['radial-grid'].attr('transform', trans);
            layers['radial-axis'].attr('transform', trans2);
            layers['radial-line'].select('line').attr('transform', trans2);
            _this.updateRadialAxisTitle(fullLayoutNow, polarLayoutNow, rrot1);
        } else {
            _this.clipPaths.forTraces.select('path').attr('transform',
                strTranslate(cxx, cyy) + strRotate(da)
            );
        }

        // 'un-rotate' marker and text points
        scatterPoints.each(function() {
            var sel = d3.select(this);
            var xy = Drawing.getTranslate(sel);
            sel.attr('transform', strTranslate(xy.x, xy.y) + strRotate([da]));
        });
        scatterTextPoints.each(function() {
            var sel = d3.select(this);
            var tx = sel.select('text');
            var xy = Drawing.getTranslate(sel);
            // N.B rotate -> translate ordering matters
            sel.attr('transform', strRotate([da, tx.attr('x'), tx.attr('y')]) + strTranslate(xy.x, xy.y));
        });

        // update rotation -> range -> _m,_b
        angularAxis.rotation = Lib.modHalf(rot1, 360);
        _this.updateAngularAxis(fullLayoutNow, polarLayoutNow);

        if(_this._hasClipOnAxisFalse && !Lib.isFullCircle(_this.sectorInRad)) {
            scatterTraces.call(Drawing.hideOutsideRangePoints, _this);
        }

        var hasRegl = false;

        for(var traceType in _this.traceHash) {
            if(Registry.traceIs(traceType, 'gl')) {
                var moduleCalcData = _this.traceHash[traceType];
                var moduleCalcDataVisible = Lib.filterVisible(moduleCalcData);
                var _module = moduleCalcData[0][0].trace._module;
                _module.plot(gd, _this, moduleCalcDataVisible, polarLayoutNow);
                if(moduleCalcDataVisible.length) hasRegl = true;
            }
        }

        if(hasRegl) {
            clearGlCanvases(gd);
            redrawReglTraces(gd);
        }

        var update = {};
        computeRotationUpdates(update);
        gd.emit('plotly_relayouting', update);
    }

    function computeRotationUpdates(updateObj) {
        updateObj[_this.id + '.angularaxis.rotation'] = rot1;

        if(_this.vangles) {
            updateObj[_this.id + '.radialaxis.angle'] = rrot1;
        }
    }

    function doneFn() {
        scatterTextPoints.select('text').attr('transform', null);

        var updateObj = {};
        computeRotationUpdates(updateObj);
        Registry.call('_guiRelayout', gd, updateObj);
    }

    dragOpts.prepFn = function(evt, startX, startY) {
        var polarLayoutNow = fullLayout[_this.id];
        rot0 = polarLayoutNow.angularaxis.rotation;

        var bbox = angularDrag.getBoundingClientRect();
        x0 = startX - bbox.left;
        y0 = startY - bbox.top;
        a0 = xy2a(x0, y0);

        dragOpts.moveFn = moveFn;
        dragOpts.doneFn = doneFn;

        clearSelect(gd);
    };

    // I don't what we should do in this case, skip we now
    if(_this.vangles && !Lib.isFullCircle(_this.sectorInRad)) {
        dragOpts.prepFn = Lib.noop;
        setCursor(d3.select(angularDrag), null);
    }

    dragElement.init(dragOpts);
};

proto.isPtInside = function(d) {
    var sectorInRad = this.sectorInRad;
    var vangles = this.vangles;
    var thetag = this.angularAxis.c2g(d.theta);
    var radialAxis = this.radialAxis;
    var r = radialAxis.c2l(d.r);
    var rl = radialAxis._rl;

    var fn = vangles ? helpers.isPtInsidePolygon : Lib.isPtInsideSector;
    return fn(r, thetag, rl, sectorInRad, vangles);
};

proto.pathArc = function(r) {
    var sectorInRad = this.sectorInRad;
    var vangles = this.vangles;
    var fn = vangles ? helpers.pathPolygon : Lib.pathArc;
    return fn(r, sectorInRad[0], sectorInRad[1], vangles);
};

proto.pathSector = function(r) {
    var sectorInRad = this.sectorInRad;
    var vangles = this.vangles;
    var fn = vangles ? helpers.pathPolygon : Lib.pathSector;
    return fn(r, sectorInRad[0], sectorInRad[1], vangles);
};

proto.pathAnnulus = function(r0, r1) {
    var sectorInRad = this.sectorInRad;
    var vangles = this.vangles;
    var fn = vangles ? helpers.pathPolygonAnnulus : Lib.pathAnnulus;
    return fn(r0, r1, sectorInRad[0], sectorInRad[1], vangles);
};

proto.pathSubplot = function() {
    var r0 = this.innerRadius;
    var r1 = this.radius;
    return r0 ? this.pathAnnulus(r0, r1) : this.pathSector(r1);
};

proto.fillViewInitialKey = function(key, val) {
    if(!(key in this.viewInitial)) {
        this.viewInitial[key] = val;
    }
};

function strTickLayout(axLayout) {
    var out = axLayout.ticks + String(axLayout.ticklen) + String(axLayout.showticklabels);
    if('side' in axLayout) out += axLayout.side;
    return out;
}

// Finds the bounding box of a given circle sector,
// inspired by https://math.stackexchange.com/q/1852703
//
// assumes:
// - sector[0] < sector[1]
// - counterclockwise rotation
function computeSectorBBox(sector) {
    var s0 = sector[0];
    var s1 = sector[1];
    var arc = s1 - s0;
    var a0 = mod(s0, 360);
    var a1 = a0 + arc;

    var ax0 = Math.cos(deg2rad(a0));
    var ay0 = Math.sin(deg2rad(a0));
    var ax1 = Math.cos(deg2rad(a1));
    var ay1 = Math.sin(deg2rad(a1));

    var x0, y0, x1, y1;

    if((a0 <= 90 && a1 >= 90) || (a0 > 90 && a1 >= 450)) {
        y1 = 1;
    } else if(ay0 <= 0 && ay1 <= 0) {
        y1 = 0;
    } else {
        y1 = Math.max(ay0, ay1);
    }

    if((a0 <= 180 && a1 >= 180) || (a0 > 180 && a1 >= 540)) {
        x0 = -1;
    } else if(ax0 >= 0 && ax1 >= 0) {
        x0 = 0;
    } else {
        x0 = Math.min(ax0, ax1);
    }

    if((a0 <= 270 && a1 >= 270) || (a0 > 270 && a1 >= 630)) {
        y0 = -1;
    } else if(ay0 >= 0 && ay1 >= 0) {
        y0 = 0;
    } else {
        y0 = Math.min(ay0, ay1);
    }

    if(a1 >= 360) {
        x1 = 1;
    } else if(ax0 <= 0 && ax1 <= 0) {
        x1 = 0;
    } else {
        x1 = Math.max(ax0, ax1);
    }

    return [x0, y0, x1, y1];
}

function snapToVertexAngle(a, vangles) {
    var fn = function(v) { return Lib.angleDist(a, v); };
    var ind = Lib.findIndexOfMin(vangles, fn);
    return vangles[ind];
}

function updateElement(sel, showAttr, attrs) {
    if(showAttr) {
        sel.attr('display', null);
        sel.attr(attrs);
    } else if(sel) {
        sel.attr('display', 'none');
    }
    return sel;
}

function strTranslate(x, y) {
    return 'translate(' + x + ',' + y + ')';
}

function strRotate(angle) {
    return 'rotate(' + angle + ')';
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/set_convert.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/set_convert.js ***!
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
var setConvertCartesian = __webpack_require__(/*! ../cartesian/set_convert */ "./node_modules/plotly.js/src/plots/cartesian/set_convert.js");

var deg2rad = Lib.deg2rad;
var rad2deg = Lib.rad2deg;

/**
 * setConvert for polar axes!
 *
 * @param {object} ax
 *   axis in question (works for both radial and angular axes)
 * @param {object} polarLayout
 *   full polar layout of the subplot associated with 'ax'
 * @param {object} fullLayout
 *   full layout
 *
 * Here, reuse some of the Cartesian setConvert logic,
 * but we must extend some of it, as both radial and angular axes
 * don't have domains and angular axes don't have _true_ ranges.
 *
 * Moreover, we introduce two new coordinate systems:
 * - 'g' for geometric coordinates and
 * - 't' for angular ticks
 *
 * Radial axis coordinate systems:
 * - d, c and l: same as for cartesian axes
 * - g: like calcdata but translated about `radialaxis.range[0]` & `polar.hole`
 *
 * Angular axis coordinate systems:
 * - d: data, in whatever form it's provided
 * - c: calcdata, turned into radians (for linear axes)
 *      or category indices (category axes)
 * - t: tick calcdata, just like 'c' but in degrees for linear axes
 * - g: geometric calcdata, radians coordinates that take into account
 *      axis rotation and direction
 *
 * Then, 'g'eometric data is ready to be converted to (x,y).
 */
module.exports = function setConvert(ax, polarLayout, fullLayout) {
    setConvertCartesian(ax, fullLayout);

    switch(ax._id) {
        case 'x':
        case 'radialaxis':
            setConvertRadial(ax, polarLayout);
            break;
        case 'angularaxis':
            setConvertAngular(ax, polarLayout);
            break;
    }
};

function setConvertRadial(ax, polarLayout) {
    var subplot = polarLayout._subplot;

    ax.setGeometry = function() {
        var rl0 = ax._rl[0];
        var rl1 = ax._rl[1];

        var b = subplot.innerRadius;
        var m = (subplot.radius - b) / (rl1 - rl0);
        var b2 = b / m;

        var rFilter = rl0 > rl1 ?
            function(v) { return v <= 0; } :
            function(v) { return v >= 0; };

        ax.c2g = function(v) {
            var r = ax.c2l(v) - rl0;
            return (rFilter(r) ? r : 0) + b2;
        };

        ax.g2c = function(v) {
            return ax.l2c(v + rl0 - b2);
        };

        ax.g2p = function(v) { return v * m; };
        ax.c2p = function(v) { return ax.g2p(ax.c2g(v)); };
    };
}

function toRadians(v, unit) {
    return unit === 'degrees' ? deg2rad(v) : v;
}

function fromRadians(v, unit) {
    return unit === 'degrees' ? rad2deg(v) : v;
}

function setConvertAngular(ax, polarLayout) {
    var axType = ax.type;

    if(axType === 'linear') {
        var _d2c = ax.d2c;
        var _c2d = ax.c2d;

        ax.d2c = function(v, unit) { return toRadians(_d2c(v), unit); };
        ax.c2d = function(v, unit) { return _c2d(fromRadians(v, unit)); };
    }

    // override makeCalcdata to handle thetaunit and special theta0/dtheta logic
    ax.makeCalcdata = function(trace, coord) {
        var arrayIn = trace[coord];
        var len = trace._length;
        var arrayOut, i;

        var _d2c = function(v) { return ax.d2c(v, trace.thetaunit); };

        if(arrayIn) {
            if(Lib.isTypedArray(arrayIn) && axType === 'linear') {
                if(len === arrayIn.length) {
                    return arrayIn;
                } else if(arrayIn.subarray) {
                    return arrayIn.subarray(0, len);
                }
            }

            arrayOut = new Array(len);
            for(i = 0; i < len; i++) {
                arrayOut[i] = _d2c(arrayIn[i]);
            }
        } else {
            var coord0 = coord + '0';
            var dcoord = 'd' + coord;
            var v0 = (coord0 in trace) ? _d2c(trace[coord0]) : 0;
            var dv = (trace[dcoord]) ? _d2c(trace[dcoord]) : (ax.period || 2 * Math.PI) / len;

            arrayOut = new Array(len);
            for(i = 0; i < len; i++) {
                arrayOut[i] = v0 + i * dv;
            }
        }

        return arrayOut;
    };

    // N.B. we mock the axis 'range' here
    ax.setGeometry = function() {
        var sector = polarLayout.sector;
        var sectorInRad = sector.map(deg2rad);
        var dir = {clockwise: -1, counterclockwise: 1}[ax.direction];
        var rot = deg2rad(ax.rotation);

        var rad2g = function(v) { return dir * v + rot; };
        var g2rad = function(v) { return (v - rot) / dir; };

        var rad2c, c2rad;
        var rad2t, t2rad;

        switch(axType) {
            case 'linear':
                c2rad = rad2c = Lib.identity;
                t2rad = deg2rad;
                rad2t = rad2deg;

                // Set the angular range in degrees to make auto-tick computation cleaner,
                // changing rotation/direction should not affect the angular tick value.
                ax.range = Lib.isFullCircle(sectorInRad) ?
                    [sector[0], sector[0] + 360] :
                    sectorInRad.map(g2rad).map(rad2deg);
                break;

            case 'category':
                var catLen = ax._categories.length;
                var _period = ax.period ? Math.max(ax.period, catLen) : catLen;

                // fallback in case all categories have been filtered out
                if(_period === 0) _period = 1;

                c2rad = t2rad = function(v) { return v * 2 * Math.PI / _period; };
                rad2c = rad2t = function(v) { return v * _period / Math.PI / 2; };

                ax.range = [0, _period];
                break;
        }

        ax.c2g = function(v) { return rad2g(c2rad(v)); };
        ax.g2c = function(v) { return rad2c(g2rad(v)); };

        ax.t2g = function(v) { return rad2g(t2rad(v)); };
        ax.g2t = function(v) { return rad2t(g2rad(v)); };
    };
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolar/attributes.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolar/attributes.js ***!
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



var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var lineAttrs = scatterAttrs.line;

module.exports = {
    mode: scatterAttrs.mode,

    r: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: 'Sets the radial coordinates'
    },

    theta: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: 'Sets the angular coordinates'
    },

    r0: {
        valType: 'any',
        dflt: 0,
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Alternate to `r`.',
            'Builds a linear space of r coordinates.',
            'Use with `dr`',
            'where `r0` is the starting coordinate and `dr` the step.'
        ].join(' ')
    },
    dr: {
        valType: 'number',
        dflt: 1,
        role: 'info',
        editType: 'calc',
        description: 'Sets the r coordinate step.'
    },

    theta0: {
        valType: 'any',
        dflt: 0,
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Alternate to `theta`.',
            'Builds a linear space of theta coordinates.',
            'Use with `dtheta`',
            'where `theta0` is the starting coordinate and `dtheta` the step.'
        ].join(' ')
    },
    dtheta: {
        valType: 'number',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the theta coordinate step.',
            'By default, the `dtheta` step equals the subplot\'s period divided',
            'by the length of the `r` coordinates.'
        ].join(' ')
    },

    thetaunit: {
        valType: 'enumerated',
        values: ['radians', 'degrees', 'gradians'],
        dflt: 'degrees',
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the unit of input *theta* values.',
            'Has an effect only when on *linear* angular axes.'
        ].join(' ')
    },

    text: scatterAttrs.text,
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: ['r', 'theta', 'text']
    }),
    hovertext: scatterAttrs.hovertext,

    line: {
        color: lineAttrs.color,
        width: lineAttrs.width,
        dash: lineAttrs.dash,
        shape: extendFlat({}, lineAttrs.shape, {
            values: ['linear', 'spline']
        }),
        smoothing: lineAttrs.smoothing,
        editType: 'calc'
    },
    connectgaps: scatterAttrs.connectgaps,

    marker: scatterAttrs.marker,
    cliponaxis: extendFlat({}, scatterAttrs.cliponaxis, {dflt: false}),

    textposition: scatterAttrs.textposition,
    textfont: scatterAttrs.textfont,

    fill: extendFlat({}, scatterAttrs.fill, {
        values: ['none', 'toself', 'tonext'],
        dflt: 'none',
        description: [
            'Sets the area to fill with a solid color.',
            'Use with `fillcolor` if not *none*.',
            'scatterpolar has a subset of the options available to scatter.',
            '*toself* connects the endpoints of the trace (or each segment',
            'of the trace if it has gaps) into a closed shape.',
            '*tonext* fills the space between two traces if one completely',
            'encloses the other (eg consecutive contour lines), and behaves like',
            '*toself* if there is no trace before it. *tonext* should not be',
            'used if one trace does not enclose the other.'
        ].join(' ')
    }),
    fillcolor: scatterAttrs.fillcolor,

    // TODO error bars
    // https://stackoverflow.com/a/26597487/4068492
    // error_x (error_r, error_theta)
    // error_y

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['r', 'theta', 'text', 'name']
    }),
    hoveron: scatterAttrs.hoveron,
    hovertemplate: hovertemplateAttrs(),

    selected: scatterAttrs.selected,
    unselected: scatterAttrs.unselected
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolar/defaults.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolar/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var handleMarkerDefaults = __webpack_require__(/*! ../scatter/marker_defaults */ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js");
var handleLineDefaults = __webpack_require__(/*! ../scatter/line_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js");
var handleLineShapeDefaults = __webpack_require__(/*! ../scatter/line_shape_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_shape_defaults.js");
var handleTextDefaults = __webpack_require__(/*! ../scatter/text_defaults */ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js");
var handleFillColorDefaults = __webpack_require__(/*! ../scatter/fillcolor_defaults */ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js");
var PTS_LINESONLY = __webpack_require__(/*! ../scatter/constants */ "./node_modules/plotly.js/src/traces/scatter/constants.js").PTS_LINESONLY;

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatterpolar/attributes.js");

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleRThetaDefaults(traceIn, traceOut, layout, coerce);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('thetaunit');
    coerce('mode', len < PTS_LINESONLY ? 'lines+markers' : 'lines');
    coerce('text');
    coerce('hovertext');
    if(traceOut.hoveron !== 'fills') coerce('hovertemplate');

    if(subTypes.hasLines(traceOut)) {
        handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);
        handleLineShapeDefaults(traceIn, traceOut, coerce);
        coerce('connectgaps');
    }

    if(subTypes.hasMarkers(traceOut)) {
        handleMarkerDefaults(traceIn, traceOut, defaultColor, layout, coerce, {gradient: true});
    }

    if(subTypes.hasText(traceOut)) {
        coerce('texttemplate');
        handleTextDefaults(traceIn, traceOut, layout, coerce);
    }

    var dfltHoverOn = [];

    if(subTypes.hasMarkers(traceOut) || subTypes.hasText(traceOut)) {
        coerce('cliponaxis');
        coerce('marker.maxdisplayed');
        dfltHoverOn.push('points');
    }

    coerce('fill');

    if(traceOut.fill !== 'none') {
        handleFillColorDefaults(traceIn, traceOut, defaultColor, coerce);
        if(!subTypes.hasLines(traceOut)) handleLineShapeDefaults(traceIn, traceOut, coerce);
    }

    if(traceOut.fill === 'tonext' || traceOut.fill === 'toself') {
        dfltHoverOn.push('fills');
    }
    coerce('hoveron', dfltHoverOn.join('+') || 'points');

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
}

function handleRThetaDefaults(traceIn, traceOut, layout, coerce) {
    var r = coerce('r');
    var theta = coerce('theta');
    var len;

    if(r) {
        if(theta) {
            len = Math.min(r.length, theta.length);
        } else {
            len = r.length;
            coerce('theta0');
            coerce('dtheta');
        }
    } else {
        if(!theta) return 0;
        len = traceOut.theta.length;
        coerce('r0');
        coerce('dr');
    }

    traceOut._length = len;
    return len;
}

module.exports = {
    handleRThetaDefaults: handleRThetaDefaults,
    supplyDefaults: supplyDefaults
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolar/format_labels.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolar/format_labels.js ***!
  \*************************************************************************/
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

module.exports = function formatLabels(cdi, trace, fullLayout) {
    var labels = {};

    var subplot = fullLayout[trace.subplot]._subplot;
    var radialAxis;
    var angularAxis;

    // for scatterpolargl texttemplate, _subplot is NOT defined, this takes part during the convert step
    // TODO we should consider moving the texttemplate formatting logic to the plot step
    if(!subplot) {
        subplot = fullLayout[trace.subplot];
        radialAxis = subplot.radialaxis;
        angularAxis = subplot.angularaxis;
    } else {
        radialAxis = subplot.radialAxis;
        angularAxis = subplot.angularAxis;
    }

    var rVal = radialAxis.c2l(cdi.r);
    labels.rLabel = Axes.tickText(radialAxis, rVal, true).text;

    // N.B here the ° sign is part of the formatted value for thetaunit:'degrees'
    var thetaVal = angularAxis.thetaunit === 'degrees' ? Lib.rad2deg(cdi.theta) : cdi.theta;
    labels.thetaLabel = Axes.tickText(angularAxis, thetaVal, true).text;

    return labels;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterpolar/hover.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterpolar/hover.js ***!
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



var scatterHover = __webpack_require__(/*! ../scatter/hover */ "./node_modules/plotly.js/src/traces/scatter/hover.js");

function hoverPoints(pointData, xval, yval, hovermode) {
    var scatterPointData = scatterHover(pointData, xval, yval, hovermode);
    if(!scatterPointData || scatterPointData[0].index === false) return;

    var newPointData = scatterPointData[0];

    // hovering on fill case
    if(newPointData.index === undefined) {
        return scatterPointData;
    }

    var subplot = pointData.subplot;
    var cdi = newPointData.cd[newPointData.index];
    var trace = newPointData.trace;

    if(!subplot.isPtInside(cdi)) return;

    newPointData.xLabelVal = undefined;
    newPointData.yLabelVal = undefined;
    makeHoverPointText(cdi, trace, subplot, newPointData);
    newPointData.hovertemplate = trace.hovertemplate;
    return scatterPointData;
}

function makeHoverPointText(cdi, trace, subplot, pointData) {
    var radialAxis = subplot.radialAxis;
    var angularAxis = subplot.angularAxis;
    radialAxis._hovertitle = 'r';
    angularAxis._hovertitle = 'θ';

    var fullLayout = {};
    fullLayout[trace.subplot] = {_subplot: subplot};
    var labels = trace._module.formatLabels(cdi, trace, fullLayout);
    pointData.rLabel = labels.rLabel;
    pointData.thetaLabel = labels.thetaLabel;

    var hoverinfo = cdi.hi || trace.hoverinfo;
    var text = [];
    function textPart(ax, val) {
        text.push(ax._hovertitle + ': ' + val);
    }

    if(!trace.hovertemplate) {
        var parts = hoverinfo.split('+');

        if(parts.indexOf('all') !== -1) parts = ['r', 'theta', 'text'];
        if(parts.indexOf('r') !== -1) textPart(radialAxis, pointData.rLabel);
        if(parts.indexOf('theta') !== -1) textPart(angularAxis, pointData.thetaLabel);

        if(parts.indexOf('text') !== -1 && pointData.text) {
            text.push(pointData.text);
            delete pointData.text;
        }

        pointData.extraText = text.join('<br>');
    }
}

module.exports = {
    hoverPoints: hoverPoints,
    makeHoverPointText: makeHoverPointText
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvcG9sYXIvY29uc3RhbnRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9wb2xhci9oZWxwZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9wb2xhci9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvcG9sYXIvbGF5b3V0X2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL3BvbGFyL2xheW91dF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvcG9sYXIvcG9sYXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL3BvbGFyL3NldF9jb252ZXJ0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcnBvbGFyL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVycG9sYXIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVycG9sYXIvZm9ybWF0X2xhYmVscy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJwb2xhci9o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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDZCQUE2QixlQUFlO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUJBQXFCLDRCQUE0QixFQUFFO0FBQ25ELG9CQUFvQixhQUFhOztBQUVqQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULG9CQUFvQjtBQUNwQixLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQixvQkFBb0I7O0FBRS9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9COztBQUVwQjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9CQUFvQjs7QUFFcEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBCQUEwQiw0QkFBNEI7QUFDdEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3A1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLDBCQUEwQixtQkFBTyxDQUFDLDZGQUEwQjs7QUFFNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLDhFQUFrQjs7QUFFN0M7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ0MmUzZDU3NjNhZjZmNTk4M2UyOC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cjogJ3N1YnBsb3QnLFxuICAgIG5hbWU6ICdwb2xhcicsXG5cbiAgICBheGlzTmFtZXM6IFsnYW5ndWxhcmF4aXMnLCAncmFkaWFsYXhpcyddLFxuICAgIGF4aXNOYW1lMmRhdGFBcnJheToge2FuZ3VsYXJheGlzOiAndGhldGEnLCByYWRpYWxheGlzOiAncid9LFxuXG4gICAgbGF5ZXJOYW1lczogW1xuICAgICAgICAnZHJhZ2xheWVyJyxcbiAgICAgICAgJ3Bsb3RiZycsXG4gICAgICAgICdiYWNrcGxvdCcsXG4gICAgICAgICdhbmd1bGFyLWdyaWQnLFxuICAgICAgICAncmFkaWFsLWdyaWQnLFxuICAgICAgICAnZnJvbnRwbG90JyxcbiAgICAgICAgJ2FuZ3VsYXItbGluZScsXG4gICAgICAgICdyYWRpYWwtbGluZScsXG4gICAgICAgICdhbmd1bGFyLWF4aXMnLFxuICAgICAgICAncmFkaWFsLWF4aXMnXG4gICAgXSxcblxuICAgIHJhZGlhbERyYWdCb3hTaXplOiA1MCxcbiAgICBhbmd1bGFyRHJhZ0JveFNpemU6IDMwLFxuICAgIGNvcm5lckxlbjogMjUsXG4gICAgY29ybmVySGFsZldpZHRoOiAyLFxuXG4gICAgLy8gcGl4ZWxzIHRvIG1vdmUgbW91c2UgYmVmb3JlIHlvdSBzdG9wIGNsYW1waW5nIHRvIHN0YXJ0aW5nIHBvaW50XG4gICAgTUlORFJBRzogOCxcbiAgICAvLyBzbWFsbGVzdCByYWRpYWwgZGlzdGFuY2UgW3B4XSBhbGxvd2VkIGZvciBhIHpvb21ib3hcbiAgICBNSU5aT09NOiAyMCxcbiAgICAvLyBkaXN0YW5jZSBbcHhdIG9mZiAocj0wKSBvciAocj1yYWRpdXMpIHdoZXJlIHdlIHRyYW5zaXRpb25cbiAgICAvLyBmcm9tIHNpbmdsZS1zaWRlZCB0byB0d28tc2lkZWQgcmFkaWFsIHpvb21cbiAgICBPRkZFREdFOiAyMFxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHBvbHlnb25UZXN0ZXIgPSByZXF1aXJlKCcuLi8uLi9saWIvcG9seWdvbicpLnRlc3RlcjtcblxudmFyIGZpbmRJbmRleE9mTWluID0gTGliLmZpbmRJbmRleE9mTWluO1xudmFyIGlzQW5nbGVJbnNpZGVTZWN0b3IgPSBMaWIuaXNBbmdsZUluc2lkZVNlY3RvcjtcbnZhciBhbmdsZURlbHRhID0gTGliLmFuZ2xlRGVsdGE7XG52YXIgYW5nbGVEaXN0ID0gTGliLmFuZ2xlRGlzdDtcblxuLyoqXG4gKiBpcyBwdCAocixhKSBpbnNpZGUgcG9seWdvbiBtYWRlIHVwIHZlcnRpY2VzIGF0IGFuZ2xlcyAndmFuZ2xlcydcbiAqIGluc2lkZSBhIGdpdmVuIHBvbGFyIHNlY3RvclxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfSByIDogcHQncyByYWRpYWwgY29vcmRpbmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IGEgOiBwdCdzIGFuZ3VsYXIgY29vcmRpbmF0ZSBpbiAqcmFkaWFucypcbiAqIEBwYXJhbSB7Mi1pdGVtIGFycmF5fSByQm5kcyA6IHNlY3RvcidzIHJhZGlhbCBib3VuZHNcbiAqIEBwYXJhbSB7Mi1pdGVtIGFycmF5fSBhQm5kcyA6IHNlY3RvcidzIGFuZ3VsYXIgYm91bmRzICpyYWRpYW5zKlxuICogQHBhcmFtIHthcnJheX0gdmFuZ2xlcyA6IGFuZ2xlcyBvZiBwb2x5Z29uIHZlcnRpY2VzIGluICpyYWRpYW5zKlxuICogQHJldHVybiB7Ym9vbGVhbn1cbiAqL1xuZnVuY3Rpb24gaXNQdEluc2lkZVBvbHlnb24ociwgYSwgckJuZHMsIGFCbmRzLCB2YW5nbGVzKSB7XG4gICAgaWYoIWlzQW5nbGVJbnNpZGVTZWN0b3IoYSwgYUJuZHMpKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgcjAsIHIxO1xuXG4gICAgaWYockJuZHNbMF0gPCByQm5kc1sxXSkge1xuICAgICAgICByMCA9IHJCbmRzWzBdO1xuICAgICAgICByMSA9IHJCbmRzWzFdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHIwID0gckJuZHNbMV07XG4gICAgICAgIHIxID0gckJuZHNbMF07XG4gICAgfVxuXG4gICAgdmFyIHBvbHlnb25JbiA9IHBvbHlnb25UZXN0ZXIobWFrZVBvbHlnb24ocjAsIGFCbmRzWzBdLCBhQm5kc1sxXSwgdmFuZ2xlcykpO1xuICAgIHZhciBwb2x5Z29uT3V0ID0gcG9seWdvblRlc3RlcihtYWtlUG9seWdvbihyMSwgYUJuZHNbMF0sIGFCbmRzWzFdLCB2YW5nbGVzKSk7XG4gICAgdmFyIHh5ID0gW3IgKiBNYXRoLmNvcyhhKSwgciAqIE1hdGguc2luKGEpXTtcbiAgICByZXR1cm4gcG9seWdvbk91dC5jb250YWlucyh4eSkgJiYgIXBvbHlnb25Jbi5jb250YWlucyh4eSk7XG59XG5cbi8vIGZpbmQgaW50ZXJzZWN0aW9uIG9mICd2MCcgPC0+ICd2MScgZWRnZSB3aXRoIGEgcmF5IGF0IGFuZ2xlICdhJ1xuLy8gKGkuZS4gYSBsaW5lIHRoYXQgc3RhcnRzIGZyb20gdGhlIG9yaWdpbiBhdCBhbmdsZSAnYScpXG4vLyBnaXZlbiBhbiAoeHAseXApIHBhaXIgb24gdGhlICd2MCcgPC0+ICd2MScgbGluZVxuLy8gKE4uQi4gJ3YwJyBhbmQgJ3YxJyBhcmUgYW5nbGVzIGluIHJhZGlhbnMpXG5mdW5jdGlvbiBmaW5kSW50ZXJzZWN0aW9uWFkodjAsIHYxLCBhLCB4cHlwKSB7XG4gICAgdmFyIHhzdGFyLCB5c3RhcjtcblxuICAgIHZhciB4cCA9IHhweXBbMF07XG4gICAgdmFyIHlwID0geHB5cFsxXTtcbiAgICB2YXIgZHNpbiA9IGNsYW1wVGlueShNYXRoLnNpbih2MSkgLSBNYXRoLnNpbih2MCkpO1xuICAgIHZhciBkY29zID0gY2xhbXBUaW55KE1hdGguY29zKHYxKSAtIE1hdGguY29zKHYwKSk7XG4gICAgdmFyIHRhbkEgPSBNYXRoLnRhbihhKTtcbiAgICB2YXIgY290YW5BID0gY2xhbXBUaW55KDEgLyB0YW5BKTtcbiAgICB2YXIgbSA9IGRzaW4gLyBkY29zO1xuICAgIHZhciBiID0geXAgLSBtICogeHA7XG5cbiAgICBpZihjb3RhbkEpIHtcbiAgICAgICAgaWYoZHNpbiAmJiBkY29zKSB7XG4gICAgICAgICAgICAvLyBnaXZlblxuICAgICAgICAgICAgLy8gIGcoeCkgOj0gdjAgLT4gdjEgbGluZSA9IG0qeCArIGJcbiAgICAgICAgICAgIC8vICBoKHgpIDo9IHJheSBhdCBhbmdsZSAnYScgPSBtKnggPSB0YW5BKnhcbiAgICAgICAgICAgIC8vIHNvbHZlIGcoeHN0YXIpID0gaCh4c3RhcilcbiAgICAgICAgICAgIHhzdGFyID0gYiAvICh0YW5BIC0gbSk7XG4gICAgICAgICAgICB5c3RhciA9IHRhbkEgKiB4c3RhcjtcbiAgICAgICAgfSBlbHNlIGlmKGRjb3MpIHtcbiAgICAgICAgICAgIC8vIGhvcml6b250YWwgdjAgLT4gdjFcbiAgICAgICAgICAgIHhzdGFyID0geXAgKiBjb3RhbkE7XG4gICAgICAgICAgICB5c3RhciA9IHlwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gdmVydGljYWwgdjAgLT4gdjFcbiAgICAgICAgICAgIHhzdGFyID0geHA7XG4gICAgICAgICAgICB5c3RhciA9IHhwICogdGFuQTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHZlcnRpY2FsIHJheVxuICAgICAgICBpZihkc2luICYmIGRjb3MpIHtcbiAgICAgICAgICAgIHhzdGFyID0gMDtcbiAgICAgICAgICAgIHlzdGFyID0gYjtcbiAgICAgICAgfSBlbHNlIGlmKGRjb3MpIHtcbiAgICAgICAgICAgIHhzdGFyID0gMDtcbiAgICAgICAgICAgIHlzdGFyID0geXA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBkb2VzIHRoaXMgY2FzZSBleGlzdHM/XG4gICAgICAgICAgICB4c3RhciA9IHlzdGFyID0gTmFOO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFt4c3RhciwgeXN0YXJdO1xufVxuXG4vLyBzb2x2ZXMgbF4yID0gKGYoeCleMiAtIHlwKV4yICsgKHggLSB4cCleMlxuLy8gcmVhcnJhbmdlZCBpbnRvIDAgPSBhKnheMiArIGIgKiB4ICsgY1xuLy9cbi8vIHdoZXJlIGYoeCkgPSBtKnggKyB0ICsgeXBcbi8vIGFuZCAgICh4MCwgeDEpID0gKC1iICsvLSBkZWwpIC8gKDIqYSlcbmZ1bmN0aW9uIGZpbmRYWWF0TGVuZ3RoKGwsIG0sIHhwLCB5cCkge1xuICAgIHZhciB0ID0gLW0gKiB4cDtcbiAgICB2YXIgYSA9IG0gKiBtICsgMTtcbiAgICB2YXIgYiA9IDIgKiAobSAqIHQgLSB4cCk7XG4gICAgdmFyIGMgPSB0ICogdCArIHhwICogeHAgLSBsICogbDtcbiAgICB2YXIgZGVsID0gTWF0aC5zcXJ0KGIgKiBiIC0gNCAqIGEgKiBjKTtcbiAgICB2YXIgeDAgPSAoLWIgKyBkZWwpIC8gKDIgKiBhKTtcbiAgICB2YXIgeDEgPSAoLWIgLSBkZWwpIC8gKDIgKiBhKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBbeDAsIG0gKiB4MCArIHQgKyB5cF0sXG4gICAgICAgIFt4MSwgbSAqIHgxICsgdCArIHlwXVxuICAgIF07XG59XG5cbmZ1bmN0aW9uIG1ha2VSZWd1bGFyUG9seWdvbihyLCB2YW5nbGVzKSB7XG4gICAgdmFyIGxlbiA9IHZhbmdsZXMubGVuZ3RoO1xuICAgIHZhciB2ZXJ0aWNlcyA9IG5ldyBBcnJheShsZW4gKyAxKTtcbiAgICB2YXIgaTtcbiAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgdmEgPSB2YW5nbGVzW2ldO1xuICAgICAgICB2ZXJ0aWNlc1tpXSA9IFtyICogTWF0aC5jb3ModmEpLCByICogTWF0aC5zaW4odmEpXTtcbiAgICB9XG4gICAgdmVydGljZXNbaV0gPSB2ZXJ0aWNlc1swXS5zbGljZSgpO1xuICAgIHJldHVybiB2ZXJ0aWNlcztcbn1cblxuZnVuY3Rpb24gbWFrZUNsaXBwZWRQb2x5Z29uKHIsIGEwLCBhMSwgdmFuZ2xlcykge1xuICAgIHZhciBsZW4gPSB2YW5nbGVzLmxlbmd0aDtcbiAgICB2YXIgdmVydGljZXMgPSBbXTtcbiAgICB2YXIgaSwgajtcblxuICAgIGZ1bmN0aW9uIGEyeHkoYSkge1xuICAgICAgICByZXR1cm4gW3IgKiBNYXRoLmNvcyhhKSwgciAqIE1hdGguc2luKGEpXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kWFkodmEwLCB2YTEsIHMpIHtcbiAgICAgICAgcmV0dXJuIGZpbmRJbnRlcnNlY3Rpb25YWSh2YTAsIHZhMSwgcywgYTJ4eSh2YTApKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjeWNsZUluZGV4KGluZCkge1xuICAgICAgICByZXR1cm4gTGliLm1vZChpbmQsIGxlbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaXNJbnNpZGUodikge1xuICAgICAgICByZXR1cm4gaXNBbmdsZUluc2lkZVNlY3Rvcih2LCBbYTAsIGExXSk7XG4gICAgfVxuXG4gICAgLy8gZmluZCBpbmRleCBpbiBzZWN0b3IgY2xvc2VzdCB0byBhMFxuICAgIC8vIHVzZSBpdCB0byBmaW5kIGludGVyc2VjdGlvbiBvZiB2W2kwXSA8LT4gdltpMC0xXSBlZGdlIHdpdGggc2VjdG9yIHJhZGl1c1xuICAgIHZhciBpMCA9IGZpbmRJbmRleE9mTWluKHZhbmdsZXMsIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgcmV0dXJuIGlzSW5zaWRlKHYpID8gYW5nbGVEaXN0KHYsIGEwKSA6IEluZmluaXR5O1xuICAgIH0pO1xuICAgIHZhciB4eTAgPSBmaW5kWFkodmFuZ2xlc1tpMF0sIHZhbmdsZXNbY3ljbGVJbmRleChpMCAtIDEpXSwgYTApO1xuICAgIHZlcnRpY2VzLnB1c2goeHkwKTtcblxuICAgIC8vIGZpbGwgaW4gaW4tc2VjdG9yIHZlcnRpY2VzXG4gICAgZm9yKGkgPSBpMCwgaiA9IDA7IGogPCBsZW47IGkrKywgaisrKSB7XG4gICAgICAgIHZhciB2YSA9IHZhbmdsZXNbY3ljbGVJbmRleChpKV07XG4gICAgICAgIGlmKCFpc0luc2lkZSh2YSkpIGJyZWFrO1xuICAgICAgICB2ZXJ0aWNlcy5wdXNoKGEyeHkodmEpKTtcbiAgICB9XG5cbiAgICAvLyBmaW5kIGluZGV4IGluIHNlY3RvciBjbG9zZXN0IHRvIGExLFxuICAgIC8vIHVzZSBpdCB0byBmaW5kIGludGVyc2VjdGlvbiBvZiB2W2lOXSA8LT4gdltpTisxXSBlZGdlIHdpdGggc2VjdG9yIHJhZGl1c1xuICAgIHZhciBpTiA9IGZpbmRJbmRleE9mTWluKHZhbmdsZXMsIGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgcmV0dXJuIGlzSW5zaWRlKHYpID8gYW5nbGVEaXN0KHYsIGExKSA6IEluZmluaXR5O1xuICAgIH0pO1xuICAgIHZhciB4eU4gPSBmaW5kWFkodmFuZ2xlc1tpTl0sIHZhbmdsZXNbY3ljbGVJbmRleChpTiArIDEpXSwgYTEpO1xuICAgIHZlcnRpY2VzLnB1c2goeHlOKTtcblxuICAgIHZlcnRpY2VzLnB1c2goWzAsIDBdKTtcbiAgICB2ZXJ0aWNlcy5wdXNoKHZlcnRpY2VzWzBdLnNsaWNlKCkpO1xuXG4gICAgcmV0dXJuIHZlcnRpY2VzO1xufVxuXG5mdW5jdGlvbiBtYWtlUG9seWdvbihyLCBhMCwgYTEsIHZhbmdsZXMpIHtcbiAgICByZXR1cm4gTGliLmlzRnVsbENpcmNsZShbYTAsIGExXSkgP1xuICAgICAgICBtYWtlUmVndWxhclBvbHlnb24ociwgdmFuZ2xlcykgOlxuICAgICAgICBtYWtlQ2xpcHBlZFBvbHlnb24ociwgYTAsIGExLCB2YW5nbGVzKTtcbn1cblxuZnVuY3Rpb24gZmluZFBvbHlnb25PZmZzZXQociwgYTAsIGExLCB2YW5nbGVzKSB7XG4gICAgdmFyIG1pblggPSBJbmZpbml0eTtcbiAgICB2YXIgbWluWSA9IEluZmluaXR5O1xuICAgIHZhciB2ZXJ0aWNlcyA9IG1ha2VQb2x5Z29uKHIsIGEwLCBhMSwgdmFuZ2xlcyk7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgdmVydGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHYgPSB2ZXJ0aWNlc1tpXTtcbiAgICAgICAgbWluWCA9IE1hdGgubWluKG1pblgsIHZbMF0pO1xuICAgICAgICBtaW5ZID0gTWF0aC5taW4obWluWSwgLXZbMV0pO1xuICAgIH1cbiAgICByZXR1cm4gW21pblgsIG1pblldO1xufVxuXG4vKipcbiAqIGZpbmQgdmVydGV4IGFuZ2xlcyAoaW4gJ3ZhbmdsZXMnKSB0aGUgZW5jbG9zZSBhbmdsZSAnYSdcbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gYSA6IGFuZ2xlIGluICpyYWRpYW5zKlxuICogQHBhcmFtIHthcnJheX0gdmFuZ2xlcyA6IGFuZ2xlcyBvZiBwb2x5Z29uIHZlcnRpY2VzIGluICpyYWRpYW5zKlxuICogQHJldHVybiB7Mi1pdGVtIGFycmF5fVxuICovXG5mdW5jdGlvbiBmaW5kRW5jbG9zaW5nVmVydGV4QW5nbGVzKGEsIHZhbmdsZXMpIHtcbiAgICB2YXIgbWluRm4gPSBmdW5jdGlvbih2KSB7XG4gICAgICAgIHZhciBhZGVsdGEgPSBhbmdsZURlbHRhKHYsIGEpO1xuICAgICAgICByZXR1cm4gYWRlbHRhID4gMCA/IGFkZWx0YSA6IEluZmluaXR5O1xuICAgIH07XG4gICAgdmFyIGkwID0gZmluZEluZGV4T2ZNaW4odmFuZ2xlcywgbWluRm4pO1xuICAgIHZhciBpMSA9IExpYi5tb2QoaTAgKyAxLCB2YW5nbGVzLmxlbmd0aCk7XG4gICAgcmV0dXJuIFt2YW5nbGVzW2kwXSwgdmFuZ2xlc1tpMV1dO1xufVxuXG4vLyB0byBtb3JlIGVhc2lseSBjYXRjaCAnYWxtb3N0IHplcm8nIG51bWJlcnMgaW4gaWYtZWxzZSBibG9ja3NcbmZ1bmN0aW9uIGNsYW1wVGlueSh2KSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHYpID4gMWUtMTAgPyB2IDogMDtcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtRm9yU1ZHKHB0czAsIGN4LCBjeSkge1xuICAgIGN4ID0gY3ggfHwgMDtcbiAgICBjeSA9IGN5IHx8IDA7XG5cbiAgICB2YXIgbGVuID0gcHRzMC5sZW5ndGg7XG4gICAgdmFyIHB0czEgPSBuZXcgQXJyYXkobGVuKTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgcHQgPSBwdHMwW2ldO1xuICAgICAgICBwdHMxW2ldID0gW2N4ICsgcHRbMF0sIGN5IC0gcHRbMV1dO1xuICAgIH1cbiAgICByZXR1cm4gcHRzMTtcbn1cblxuLyoqXG4gKiBwYXRoIHBvbHlnb25cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gciA6IHBvbHlnb24gJ3JhZGl1cydcbiAqIEBwYXJhbSB7bnVtYmVyfSBhMCA6IGZpcnN0IGFuZ3VsYXIgY29vcmRpbmF0ZSBpbiAqcmFkaWFucypcbiAqIEBwYXJhbSB7bnVtYmVyfSBhMSA6IHNlY29uZCBhbmd1bGFyIGNvb3JkaW5hdGUgaW4gKnJhZGlhbnMqXG4gKiBAcGFyYW0ge2FycmF5fSB2YW5nbGVzIDogYW5nbGVzIG9mIHBvbHlnb24gdmVydGljZXMgaW4gKnJhZGlhbnMqXG4gKiBAcGFyYW0ge251bWJlciAob3B0aW9uYWwpfSBjeCA6IHggY29vcmRpbmF0ZSBvZiBjZW50ZXJcbiAqIEBwYXJhbSB7bnVtYmVyIChvcHRpb25hbCl9IGN5IDogeSBjb29yZGluYXRlIG9mIGNlbnRlclxuICogQHJldHVybiB7c3RyaW5nfSBzdmcgcGF0aFxuICpcbiAqL1xuZnVuY3Rpb24gcGF0aFBvbHlnb24ociwgYTAsIGExLCB2YW5nbGVzLCBjeCwgY3kpIHtcbiAgICB2YXIgcG9seSA9IG1ha2VQb2x5Z29uKHIsIGEwLCBhMSwgdmFuZ2xlcyk7XG4gICAgcmV0dXJuICdNJyArIHRyYW5zZm9ybUZvclNWRyhwb2x5LCBjeCwgY3kpLmpvaW4oJ0wnKTtcbn1cblxuLyoqXG4gKiBwYXRoIGEgcG9seWdvbiAnYW5udWx1cydcbiAqIGkuZS4gYSBwb2x5Z29uIHdpdGggYSBjb25jZW50cmljIGhvbGVcbiAqXG4gKiBOLkIuIHRoaXMgcm91dGluZSB1c2VzIHRoZSBldmVub2RkIFNWRyBydWxlXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHIwIDogZmlyc3QgcmFkaWFsIGNvb3JkaW5hdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSByMSA6IHNlY29uZCByYWRpYWwgY29vcmRpbmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IGEwIDogZmlyc3QgYW5ndWxhciBjb29yZGluYXRlIGluICpyYWRpYW5zKlxuICogQHBhcmFtIHtudW1iZXJ9IGExIDogc2Vjb25kIGFuZ3VsYXIgY29vcmRpbmF0ZSBpbiAqcmFkaWFucypcbiAqIEBwYXJhbSB7YXJyYXl9IHZhbmdsZXMgOiBhbmdsZXMgb2YgcG9seWdvbiB2ZXJ0aWNlcyBpbiAqcmFkaWFucypcbiAqIEBwYXJhbSB7bnVtYmVyIChvcHRpb25hbCl9IGN4IDogeCBjb29yZGluYXRlIG9mIGNlbnRlclxuICogQHBhcmFtIHtudW1iZXIgKG9wdGlvbmFsKX0gY3kgOiB5IGNvb3JkaW5hdGUgb2YgY2VudGVyXG4gKiBAcmV0dXJuIHtzdHJpbmd9IHN2ZyBwYXRoXG4gKlxuICovXG5mdW5jdGlvbiBwYXRoUG9seWdvbkFubnVsdXMocjAsIHIxLCBhMCwgYTEsIHZhbmdsZXMsIGN4LCBjeSkge1xuICAgIHZhciByU3RhcnQsIHJFbmQ7XG5cbiAgICBpZihyMCA8IHIxKSB7XG4gICAgICAgIHJTdGFydCA9IHIwO1xuICAgICAgICByRW5kID0gcjE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgclN0YXJ0ID0gcjE7XG4gICAgICAgIHJFbmQgPSByMDtcbiAgICB9XG5cbiAgICB2YXIgaW5uZXIgPSB0cmFuc2Zvcm1Gb3JTVkcobWFrZVBvbHlnb24oclN0YXJ0LCBhMCwgYTEsIHZhbmdsZXMpLCBjeCwgY3kpO1xuICAgIHZhciBvdXRlciA9IHRyYW5zZm9ybUZvclNWRyhtYWtlUG9seWdvbihyRW5kLCBhMCwgYTEsIHZhbmdsZXMpLCBjeCwgY3kpO1xuICAgIHJldHVybiAnTScgKyBvdXRlci5yZXZlcnNlKCkuam9pbignTCcpICsgJ00nICsgaW5uZXIuam9pbignTCcpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBpc1B0SW5zaWRlUG9seWdvbjogaXNQdEluc2lkZVBvbHlnb24sXG4gICAgZmluZFBvbHlnb25PZmZzZXQ6IGZpbmRQb2x5Z29uT2Zmc2V0LFxuICAgIGZpbmRFbmNsb3NpbmdWZXJ0ZXhBbmdsZXM6IGZpbmRFbmNsb3NpbmdWZXJ0ZXhBbmdsZXMsXG4gICAgZmluZEludGVyc2VjdGlvblhZOiBmaW5kSW50ZXJzZWN0aW9uWFksXG4gICAgZmluZFhZYXRMZW5ndGg6IGZpbmRYWWF0TGVuZ3RoLFxuICAgIGNsYW1wVGlueTogY2xhbXBUaW55LFxuICAgIHBhdGhQb2x5Z29uOiBwYXRoUG9seWdvbixcbiAgICBwYXRoUG9seWdvbkFubnVsdXM6IHBhdGhQb2x5Z29uQW5udWx1c1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGdldFN1YnBsb3RDYWxjRGF0YSA9IHJlcXVpcmUoJy4uL2dldF9kYXRhJykuZ2V0U3VicGxvdENhbGNEYXRhO1xudmFyIGNvdW50ZXJSZWdleCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmNvdW50ZXJSZWdleDtcblxudmFyIGNyZWF0ZVBvbGFyID0gcmVxdWlyZSgnLi9wb2xhcicpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG5cbnZhciBhdHRyID0gY29uc3RhbnRzLmF0dHI7XG52YXIgbmFtZSA9IGNvbnN0YW50cy5uYW1lO1xudmFyIGNvdW50ZXIgPSBjb3VudGVyUmVnZXgobmFtZSk7XG5cbnZhciBhdHRyaWJ1dGVzID0ge307XG5hdHRyaWJ1dGVzW2F0dHJdID0ge1xuICAgIHZhbFR5cGU6ICdzdWJwbG90aWQnLFxuICAgIHJvbGU6ICdpbmZvJyxcbiAgICBkZmx0OiBuYW1lLFxuICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgJ1NldHMgYSByZWZlcmVuY2UgYmV0d2VlbiB0aGlzIHRyYWNlXFwncyBkYXRhIGNvb3JkaW5hdGVzIGFuZCcsXG4gICAgICAgICdhIHBvbGFyIHN1YnBsb3QuJyxcbiAgICAgICAgJ0lmICpwb2xhciogKHRoZSBkZWZhdWx0IHZhbHVlKSwgdGhlIGRhdGEgcmVmZXIgdG8gYGxheW91dC5wb2xhcmAuJyxcbiAgICAgICAgJ0lmICpwb2xhcjIqLCB0aGUgZGF0YSByZWZlciB0byBgbGF5b3V0LnBvbGFyMmAsIGFuZCBzbyBvbi4nXG4gICAgXS5qb2luKCcgJylcbn07XG5cbmZ1bmN0aW9uIHBsb3QoZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBjYWxjRGF0YSA9IGdkLmNhbGNkYXRhO1xuICAgIHZhciBzdWJwbG90SWRzID0gZnVsbExheW91dC5fc3VicGxvdHNbbmFtZV07XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VicGxvdElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaWQgPSBzdWJwbG90SWRzW2ldO1xuICAgICAgICB2YXIgc3VicGxvdENhbGNEYXRhID0gZ2V0U3VicGxvdENhbGNEYXRhKGNhbGNEYXRhLCBuYW1lLCBpZCk7XG4gICAgICAgIHZhciBzdWJwbG90ID0gZnVsbExheW91dFtpZF0uX3N1YnBsb3Q7XG5cbiAgICAgICAgaWYoIXN1YnBsb3QpIHtcbiAgICAgICAgICAgIHN1YnBsb3QgPSBjcmVhdGVQb2xhcihnZCwgaWQpO1xuICAgICAgICAgICAgZnVsbExheW91dFtpZF0uX3N1YnBsb3QgPSBzdWJwbG90O1xuICAgICAgICB9XG5cbiAgICAgICAgc3VicGxvdC5wbG90KHN1YnBsb3RDYWxjRGF0YSwgZnVsbExheW91dCwgZ2QuX3Byb21pc2VzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFuKG5ld0Z1bGxEYXRhLCBuZXdGdWxsTGF5b3V0LCBvbGRGdWxsRGF0YSwgb2xkRnVsbExheW91dCkge1xuICAgIHZhciBvbGRJZHMgPSBvbGRGdWxsTGF5b3V0Ll9zdWJwbG90c1tuYW1lXSB8fCBbXTtcbiAgICB2YXIgaGFkR2wgPSAob2xkRnVsbExheW91dC5faGFzICYmIG9sZEZ1bGxMYXlvdXQuX2hhcygnZ2wnKSk7XG4gICAgdmFyIGhhc0dsID0gKG5ld0Z1bGxMYXlvdXQuX2hhcyAmJiBuZXdGdWxsTGF5b3V0Ll9oYXMoJ2dsJykpO1xuICAgIHZhciBtdXN0Q2xlYW5TY2VuZSA9IGhhZEdsICYmICFoYXNHbDtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvbGRJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0gb2xkSWRzW2ldO1xuICAgICAgICB2YXIgb2xkU3VicGxvdCA9IG9sZEZ1bGxMYXlvdXRbaWRdLl9zdWJwbG90O1xuXG4gICAgICAgIGlmKCFuZXdGdWxsTGF5b3V0W2lkXSAmJiAhIW9sZFN1YnBsb3QpIHtcbiAgICAgICAgICAgIG9sZFN1YnBsb3QuZnJhbWV3b3JrLnJlbW92ZSgpO1xuICAgICAgICAgICAgb2xkU3VicGxvdC5sYXllcnNbJ3JhZGlhbC1heGlzLXRpdGxlJ10ucmVtb3ZlKCk7XG5cbiAgICAgICAgICAgIGZvcih2YXIgayBpbiBvbGRTdWJwbG90LmNsaXBQYXRocykge1xuICAgICAgICAgICAgICAgIG9sZFN1YnBsb3QuY2xpcFBhdGhzW2tdLnJlbW92ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYobXVzdENsZWFuU2NlbmUgJiYgb2xkU3VicGxvdC5fc2NlbmUpIHtcbiAgICAgICAgICAgIG9sZFN1YnBsb3QuX3NjZW5lLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIG9sZFN1YnBsb3QuX3NjZW5lID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cjogYXR0cixcbiAgICBuYW1lOiBuYW1lLFxuICAgIGlkUm9vdDogbmFtZSxcbiAgICBpZFJlZ2V4OiBjb3VudGVyLFxuICAgIGF0dHJSZWdleDogY291bnRlcixcbiAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlMYXlvdXREZWZhdWx0czogcmVxdWlyZSgnLi9sYXlvdXRfZGVmYXVsdHMnKSxcbiAgICBwbG90OiBwbG90LFxuICAgIGNsZWFuOiBjbGVhbixcbiAgICB0b1NWRzogcmVxdWlyZSgnLi4vY2FydGVzaWFuJykudG9TVkdcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvckF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvci9hdHRyaWJ1dGVzJyk7XG52YXIgYXhlc0F0dHJzID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG52YXIgZG9tYWluQXR0cnMgPSByZXF1aXJlKCcuLi9kb21haW4nKS5hdHRyaWJ1dGVzO1xudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWInKS5leHRlbmRGbGF0O1xudmFyIG92ZXJyaWRlQWxsID0gcmVxdWlyZSgnLi4vLi4vcGxvdF9hcGkvZWRpdF90eXBlcycpLm92ZXJyaWRlQWxsO1xuXG52YXIgYXhpc0xpbmVHcmlkQXR0ciA9IG92ZXJyaWRlQWxsKHtcbiAgICBjb2xvcjogYXhlc0F0dHJzLmNvbG9yLFxuICAgIHNob3dsaW5lOiBleHRlbmRGbGF0KHt9LCBheGVzQXR0cnMuc2hvd2xpbmUsIHtkZmx0OiB0cnVlfSksXG4gICAgbGluZWNvbG9yOiBheGVzQXR0cnMubGluZWNvbG9yLFxuICAgIGxpbmV3aWR0aDogYXhlc0F0dHJzLmxpbmV3aWR0aCxcbiAgICBzaG93Z3JpZDogZXh0ZW5kRmxhdCh7fSwgYXhlc0F0dHJzLnNob3dncmlkLCB7ZGZsdDogdHJ1ZX0pLFxuICAgIGdyaWRjb2xvcjogYXhlc0F0dHJzLmdyaWRjb2xvcixcbiAgICBncmlkd2lkdGg6IGF4ZXNBdHRycy5ncmlkd2lkdGhcblxuICAgIC8vIFRPRE8gYWRkIHNwaWtlKiBhdHRyaWJ1dGVzIGRvd24gdGhlIHJvYWRcblxuICAgIC8vIHNob3VsZCB3ZSBhZGQgemVyb2xpbmUqIGF0dHJpYnV0ZXM/XG5cbn0sICdwbG90JywgJ2Zyb20tcm9vdCcpO1xuXG52YXIgYXhpc1RpY2tBdHRycyA9IG92ZXJyaWRlQWxsKHtcbiAgICB0aWNrbW9kZTogYXhlc0F0dHJzLnRpY2ttb2RlLFxuICAgIG50aWNrczogYXhlc0F0dHJzLm50aWNrcyxcbiAgICB0aWNrMDogYXhlc0F0dHJzLnRpY2swLFxuICAgIGR0aWNrOiBheGVzQXR0cnMuZHRpY2ssXG4gICAgdGlja3ZhbHM6IGF4ZXNBdHRycy50aWNrdmFscyxcbiAgICB0aWNrdGV4dDogYXhlc0F0dHJzLnRpY2t0ZXh0LFxuICAgIHRpY2tzOiBheGVzQXR0cnMudGlja3MsXG4gICAgdGlja2xlbjogYXhlc0F0dHJzLnRpY2tsZW4sXG4gICAgdGlja3dpZHRoOiBheGVzQXR0cnMudGlja3dpZHRoLFxuICAgIHRpY2tjb2xvcjogYXhlc0F0dHJzLnRpY2tjb2xvcixcbiAgICBzaG93dGlja2xhYmVsczogYXhlc0F0dHJzLnNob3d0aWNrbGFiZWxzLFxuICAgIHNob3d0aWNrcHJlZml4OiBheGVzQXR0cnMuc2hvd3RpY2twcmVmaXgsXG4gICAgdGlja3ByZWZpeDogYXhlc0F0dHJzLnRpY2twcmVmaXgsXG4gICAgc2hvd3RpY2tzdWZmaXg6IGF4ZXNBdHRycy5zaG93dGlja3N1ZmZpeCxcbiAgICB0aWNrc3VmZml4OiBheGVzQXR0cnMudGlja3N1ZmZpeCxcbiAgICBzaG93ZXhwb25lbnQ6IGF4ZXNBdHRycy5zaG93ZXhwb25lbnQsXG4gICAgZXhwb25lbnRmb3JtYXQ6IGF4ZXNBdHRycy5leHBvbmVudGZvcm1hdCxcbiAgICBzZXBhcmF0ZXRob3VzYW5kczogYXhlc0F0dHJzLnNlcGFyYXRldGhvdXNhbmRzLFxuICAgIHRpY2tmb250OiBheGVzQXR0cnMudGlja2ZvbnQsXG4gICAgdGlja2FuZ2xlOiBheGVzQXR0cnMudGlja2FuZ2xlLFxuICAgIHRpY2tmb3JtYXQ6IGF4ZXNBdHRycy50aWNrZm9ybWF0LFxuICAgIHRpY2tmb3JtYXRzdG9wczogYXhlc0F0dHJzLnRpY2tmb3JtYXRzdG9wcyxcbiAgICBsYXllcjogYXhlc0F0dHJzLmxheWVyXG59LCAncGxvdCcsICdmcm9tLXJvb3QnKTtcblxudmFyIHJhZGlhbEF4aXNBdHRycyA9IHtcbiAgICB2aXNpYmxlOiBleHRlbmRGbGF0KHt9LCBheGVzQXR0cnMudmlzaWJsZSwge2RmbHQ6IHRydWV9KSxcbiAgICB0eXBlOiBleHRlbmRGbGF0KHt9LCBheGVzQXR0cnMudHlwZSwge1xuICAgICAgICB2YWx1ZXM6IFsnLScsICdsaW5lYXInLCAnbG9nJywgJ2RhdGUnLCAnY2F0ZWdvcnknXVxuICAgIH0pLFxuXG4gICAgYXV0b3JhbmdlOiBleHRlbmRGbGF0KHt9LCBheGVzQXR0cnMuYXV0b3JhbmdlLCB7ZWRpdFR5cGU6ICdwbG90J30pLFxuICAgIHJhbmdlbW9kZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWyd0b3plcm8nLCAnbm9ubmVnYXRpdmUnLCAnbm9ybWFsJ10sXG4gICAgICAgIGRmbHQ6ICd0b3plcm8nLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0lmICp0b3plcm8qYCwgdGhlIHJhbmdlIGV4dGVuZHMgdG8gMCwnLFxuICAgICAgICAgICAgJ3JlZ2FyZGxlc3Mgb2YgdGhlIGlucHV0IGRhdGEnLFxuICAgICAgICAgICAgJ0lmICpub25uZWdhdGl2ZSosIHRoZSByYW5nZSBpcyBub24tbmVnYXRpdmUsJyxcbiAgICAgICAgICAgICdyZWdhcmRsZXNzIG9mIHRoZSBpbnB1dCBkYXRhLicsXG4gICAgICAgICAgICAnSWYgKm5vcm1hbCosIHRoZSByYW5nZSBpcyBjb21wdXRlZCBpbiByZWxhdGlvbiB0byB0aGUgZXh0cmVtYScsXG4gICAgICAgICAgICAnb2YgdGhlIGlucHV0IGRhdGEgKHNhbWUgYmVoYXZpb3IgYXMgZm9yIGNhcnRlc2lhbiBheGVzKS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICByYW5nZTogZXh0ZW5kRmxhdCh7fSwgYXhlc0F0dHJzLnJhbmdlLCB7XG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7dmFsVHlwZTogJ2FueScsIGVkaXRUeXBlOiAncGxvdCcsIGltcGxpZWRFZGl0czogeydeYXV0b3JhbmdlJzogZmFsc2V9fSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnYW55JywgZWRpdFR5cGU6ICdwbG90JywgaW1wbGllZEVkaXRzOiB7J15hdXRvcmFuZ2UnOiBmYWxzZX19XG4gICAgICAgIF0sXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICB9KSxcblxuICAgIGNhdGVnb3J5b3JkZXI6IGF4ZXNBdHRycy5jYXRlZ29yeW9yZGVyLFxuICAgIGNhdGVnb3J5YXJyYXk6IGF4ZXNBdHRycy5jYXRlZ29yeWFycmF5LFxuXG4gICAgYW5nbGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2FuZ2xlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGFuZ2xlIChpbiBkZWdyZWVzKSBmcm9tIHdoaWNoIHRoZSByYWRpYWwgYXhpcyBpcyBkcmF3bi4nLFxuICAgICAgICAgICAgJ05vdGUgdGhhdCBieSBkZWZhdWx0LCByYWRpYWwgYXhpcyBsaW5lIG9uIHRoZSB0aGV0YT0wIGxpbmUnLFxuICAgICAgICAgICAgJ2NvcnJlc3BvbmRzIHRvIGEgbGluZSBwb2ludGluZyByaWdodCAobGlrZSB3aGF0IG1hdGhlbWF0aWNpYW5zIHByZWZlcikuJyxcbiAgICAgICAgICAgICdEZWZhdWx0cyB0byB0aGUgZmlyc3QgYHBvbGFyLnNlY3RvcmAgYW5nbGUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBzaWRlOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgLy8gVE9ETyBhZGQgJ2NlbnRlcicgZm9yIGBzaG93bGluZTogZmFsc2VgIHJhZGlhbCBheGVzXG4gICAgICAgIHZhbHVlczogWydjbG9ja3dpc2UnLCAnY291bnRlcmNsb2Nrd2lzZSddLFxuICAgICAgICBkZmx0OiAnY2xvY2t3aXNlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgb24gd2hpY2ggc2lkZSBvZiByYWRpYWwgYXhpcyBsaW5lJyxcbiAgICAgICAgICAgICd0aGUgdGljayBhbmQgdGljayBsYWJlbHMgYXBwZWFyLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG5cbiAgICB0aXRsZToge1xuICAgICAgICAvLyByYWRpYWwgdGl0bGUgaXMgbm90IGd1aS1lZGl0YWJsZSBhdCB0aGUgbW9tZW50LFxuICAgICAgICAvLyBzbyBpdCBuZWVkcyBkZmx0OiAnJywgc2ltaWxhciB0byBjYXJwZXQgYXhlcy5cbiAgICAgICAgdGV4dDogZXh0ZW5kRmxhdCh7fSwgYXhlc0F0dHJzLnRpdGxlLnRleHQsIHtlZGl0VHlwZTogJ3Bsb3QnLCBkZmx0OiAnJ30pLFxuICAgICAgICBmb250OiBleHRlbmRGbGF0KHt9LCBheGVzQXR0cnMudGl0bGUuZm9udCwge2VkaXRUeXBlOiAncGxvdCd9KSxcblxuICAgICAgICAvLyBUT0RPXG4gICAgICAgIC8vIC0gbWlnaHQgbmVlZCBhICd0aXRsZXNpZGUnIGFuZCBldmVuICd0aXRsZWRpcmVjdGlvbicgZG93biB0aGUgcm9hZFxuICAgICAgICAvLyAtIHdoYXQgYWJvdXQgc3RhbmRvZmYgPz9cblxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgfSxcblxuICAgIGhvdmVyZm9ybWF0OiBheGVzQXR0cnMuaG92ZXJmb3JtYXQsXG5cbiAgICB1aXJldmlzaW9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnbm9uZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQ29udHJvbHMgcGVyc2lzdGVuY2Ugb2YgdXNlci1kcml2ZW4gY2hhbmdlcyBpbiBheGlzIGByYW5nZWAsJyxcbiAgICAgICAgICAgICdgYXV0b3JhbmdlYCwgYGFuZ2xlYCwgYW5kIGB0aXRsZWAgaWYgaW4gYGVkaXRhYmxlOiB0cnVlYCBjb25maWd1cmF0aW9uLicsXG4gICAgICAgICAgICAnRGVmYXVsdHMgdG8gYHBvbGFyPE4+LnVpcmV2aXNpb25gLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgZWRpdFR5cGU6ICdjYWxjJyxcblxuICAgIF9kZXByZWNhdGVkOiB7XG4gICAgICAgIHRpdGxlOiBheGVzQXR0cnMuX2RlcHJlY2F0ZWQudGl0bGUsXG4gICAgICAgIHRpdGxlZm9udDogYXhlc0F0dHJzLl9kZXByZWNhdGVkLnRpdGxlZm9udFxuICAgIH1cbn07XG5cbmV4dGVuZEZsYXQoXG4gICAgcmFkaWFsQXhpc0F0dHJzLFxuXG4gICAgLy8gTi5CLiByYWRpYWxheGlzIGdyaWQgbGluZXMgYXJlIGNpcmN1bGFyLFxuICAgIC8vIGJ1dCByYWRpYWxheGlzIGxpbmVzIGFyZSBzdHJhaWdodCBmcm9tIGNpcmNsZSBjZW50ZXIgdG8gb3V0ZXIgYm91bmRcbiAgICBheGlzTGluZUdyaWRBdHRyLFxuICAgIGF4aXNUaWNrQXR0cnNcbik7XG5cbnZhciBhbmd1bGFyQXhpc0F0dHJzID0ge1xuICAgIHZpc2libGU6IGV4dGVuZEZsYXQoe30sIGF4ZXNBdHRycy52aXNpYmxlLCB7ZGZsdDogdHJ1ZX0pLFxuICAgIHR5cGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAvLyAnbGluZWFyJyBzaG91bGQgbWF5YmUgYmUgY2FsbGVkICdhbmdsZScgb3IgJ2FuZ3VsYXInIGhlcmVcbiAgICAgICAgLy8gdG8gbWFrZSBjbGVhciB0aGF0IGF4aXMgaGVyZSBpcyBwZXJpb2RpYyBhbmQgbW9yZSB0aWdodGx5IG1hdGNoXG4gICAgICAgIC8vIGB0aGV0YXVuaXRgP1xuICAgICAgICAvL1xuICAgICAgICAvLyBza2lwICdkYXRlJyBmb3IgZmlyc3QgcHVzaFxuICAgICAgICAvLyBubyAnbG9nJyBmb3Igbm93XG4gICAgICAgIHZhbHVlczogWyctJywgJ2xpbmVhcicsICdjYXRlZ29yeSddLFxuICAgICAgICBkZmx0OiAnLScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgX25vVGVtcGxhdGluZzogdHJ1ZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBhbmd1bGFyIGF4aXMgdHlwZS4nLFxuICAgICAgICAgICAgJ0lmICpsaW5lYXIqLCBzZXQgYHRoZXRhdW5pdGAgdG8gZGV0ZXJtaW5lIHRoZSB1bml0IGluIHdoaWNoIGF4aXMgdmFsdWUgYXJlIHNob3duLicsXG4gICAgICAgICAgICAnSWYgKmNhdGVnb3J5LCB1c2UgYHBlcmlvZGAgdG8gc2V0IHRoZSBudW1iZXIgb2YgaW50ZWdlciBjb29yZGluYXRlcyBhcm91bmQgcG9sYXIgYXhpcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGNhdGVnb3J5b3JkZXI6IGF4ZXNBdHRycy5jYXRlZ29yeW9yZGVyLFxuICAgIGNhdGVnb3J5YXJyYXk6IGF4ZXNBdHRycy5jYXRlZ29yeWFycmF5LFxuXG4gICAgdGhldGF1bml0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ3JhZGlhbnMnLCAnZGVncmVlcyddLFxuICAgICAgICBkZmx0OiAnZGVncmVlcycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBmb3JtYXQgdW5pdCBvZiB0aGUgZm9ybWF0dGVkICp0aGV0YSogdmFsdWVzLicsXG4gICAgICAgICAgICAnSGFzIGFuIGVmZmVjdCBvbmx5IHdoZW4gYGFuZ3VsYXJheGlzLnR5cGVgIGlzICpsaW5lYXIqLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgcGVyaW9kOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXQgdGhlIGFuZ3VsYXIgcGVyaW9kLicsXG4gICAgICAgICAgICAnSGFzIGFuIGVmZmVjdCBvbmx5IHdoZW4gYGFuZ3VsYXJheGlzLnR5cGVgIGlzICpjYXRlZ29yeSouJyxcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgLy8gRXhhbXBsZXMgZm9yIGRhdGUgYXhlczpcbiAgICAgICAgLy9cbiAgICAgICAgLy8gLSBwZXJpb2QgdGhhdCBlcXVhbHMgdGhlIHRpbWVzZXJpZXMgbGVuZ3RoXG4gICAgICAgIC8vICBodHRwOi8vZmxvd2luZ2RhdGEuY29tLzIwMTcvMDEvMjQvb25lLWRhdGFzZXQtdmlzdWFsaXplZC0yNS13YXlzLzE4LXBvbGFyLWNvb3JkaW5hdGVzL1xuICAgICAgICAvLyAtIGFuZCAxLXllYXIgcGVyaW9kcyAoZm9jdXNpbmcgb24gc2Vhc29uYWwgY2hhbmdlMFxuICAgICAgICAvLyAgaHR0cDovL290ZXh0cy5vcmcvZnBwMi9zZWFzb25hbC1wbG90cy5odG1sXG4gICAgICAgIC8vICBodHRwczovL2Jsb2dzLnNjaWVudGlmaWNhbWVyaWNhbi5jb20vc2EtdmlzdWFsL3doeS1hcmUtc28tbWFueS1iYWJpZXMtYm9ybi1hcm91bmQtOC0wMC1hLW0vXG4gICAgICAgIC8vICBodHRwOi8vd3d3LnNlYXNvbmFsYWRqdXN0bWVudC5jb20vMjAxMi8wOS8wNS9jbG9jay1wbG90LXZpc3VhbGlzaW5nLXNlYXNvbmFsaXR5LXVzaW5nLXItYW5kLWdncGxvdDItcGFydC0zL1xuICAgICAgICAvLyAgaHR0cHM6Ly9pLnBpbmltZy5jb20vNzM2eC80OS9iOS83Mi80OWI5NzJjY2IzMjA2YTFhNmQ2Zjg3MGRhYzU0MzI4MC5qcGdcbiAgICAgICAgLy8gIGh0dHBzOi8vd3d3LmNsaW1hdGUtbGFiLWJvb2suYWMudWsvc3BpcmFscy9cbiAgICB9LFxuXG4gICAgZGlyZWN0aW9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ2NvdW50ZXJjbG9ja3dpc2UnLCAnY2xvY2t3aXNlJ10sXG4gICAgICAgIGRmbHQ6ICdjb3VudGVyY2xvY2t3aXNlJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGRpcmVjdGlvbiBjb3JyZXNwb25kaW5nIHRvIHBvc2l0aXZlIGFuZ2xlcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHJvdGF0aW9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbmdsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoYXQgc3RhcnQgcG9zaXRpb24gKGluIGRlZ3JlZXMpIG9mIHRoZSBhbmd1bGFyIGF4aXMnLFxuICAgICAgICAgICAgJ0J5IGRlZmF1bHQsIHBvbGFyIHN1YnBsb3RzIHdpdGggYGRpcmVjdGlvbmAgc2V0IHRvICpjb3VudGVyY2xvY2t3aXNlKicsXG4gICAgICAgICAgICAnZ2V0IGEgYHJvdGF0aW9uYCBvZiAqMConLFxuICAgICAgICAgICAgJ3doaWNoIGNvcnJlc3BvbmRzIHRvIGR1ZSBFYXN0IChsaWtlIHdoYXQgbWF0aGVtYXRpY2lhbnMgcHJlZmVyKS4nLFxuICAgICAgICAgICAgJ0luIHR1cm4sIHBvbGFyIHdpdGggYGRpcmVjdGlvbmAgc2V0IHRvICpjbG9ja3dpc2UqIGdldCBhIHJvdGF0aW9uIG9mICo5MConLFxuICAgICAgICAgICAgJ3doaWNoIGNvcnJlc3BvbmRzIHRvIGR1ZSBOb3J0aCAobGlrZSBvbiBhIGNvbXBhc3MpLCdcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgaG92ZXJmb3JtYXQ6IGF4ZXNBdHRycy5ob3ZlcmZvcm1hdCxcblxuICAgIHVpcmV2aXNpb246IHtcbiAgICAgICAgdmFsVHlwZTogJ2FueScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdub25lJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdDb250cm9scyBwZXJzaXN0ZW5jZSBvZiB1c2VyLWRyaXZlbiBjaGFuZ2VzIGluIGF4aXMgYHJvdGF0aW9uYC4nLFxuICAgICAgICAgICAgJ0RlZmF1bHRzIHRvIGBwb2xhcjxOPi51aXJldmlzaW9uYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGVkaXRUeXBlOiAnY2FsYydcbn07XG5cbmV4dGVuZEZsYXQoXG4gICAgYW5ndWxhckF4aXNBdHRycyxcblxuICAgIC8vIE4uQi4gYW5ndWxhciBncmlkIGxpbmVzIGFyZSBzdHJhaWdodCBsaW5lcyBmcm9tIGNpcmNsZSBjZW50ZXIgdG8gb3V0ZXIgYm91bmRcbiAgICAvLyB0aGUgYW5ndWxhciBsaW5lIGlzIGNpcmN1bGFyIGJvdW5kaW5nIHRoZSBwb2xhciBwbG90IGFyZWEuXG4gICAgYXhpc0xpbmVHcmlkQXR0cixcblxuICAgIC8vIE4uQi4gdGlja3N1ZmZpeCBkZWZhdWx0cyB0byAnwrAnIGZvciBhbmd1bGFyIGF4ZXMgd2l0aCBgdGhldGF1bml0OiAnZGVncmVlcydgXG4gICAgYXhpc1RpY2tBdHRyc1xuKTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgLy8gVE9ETyBmb3IgeC95L3pvb20gc3lzdGVtIGZvciBwYXBlci1iYXNlZCB6b29taW5nOlxuICAgIC8vIHg6IHt9LFxuICAgIC8vIHk6IHt9LFxuICAgIC8vIHpvb206IHt9LFxuXG4gICAgZG9tYWluOiBkb21haW5BdHRycyh7bmFtZTogJ3BvbGFyJywgZWRpdFR5cGU6ICdwbG90J30pLFxuXG4gICAgc2VjdG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgZWRpdFR5cGU6ICdwbG90J30sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIGVkaXRUeXBlOiAncGxvdCd9XG4gICAgICAgIF0sXG4gICAgICAgIGRmbHQ6IFswLCAzNjBdLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyBhbmd1bGFyIHNwYW4gb2YgdGhpcyBwb2xhciBzdWJwbG90IHdpdGggdHdvIGFuZ2xlcyAoaW4gZGVncmVlcykuJyxcbiAgICAgICAgICAgICdTZWN0b3IgYXJlIGFzc3VtZWQgdG8gYmUgc3Bhbm5lZCBpbiB0aGUgY291bnRlcmNsb2Nrd2lzZSBkaXJlY3Rpb24nLFxuICAgICAgICAgICAgJ3dpdGggKjAqIGNvcnJlc3BvbmRpbmcgdG8gcmlnaHRtb3N0IGxpbWl0IG9mIHRoZSBwb2xhciBzdWJwbG90LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGhvbGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgZnJhY3Rpb24gb2YgdGhlIHJhZGl1cyB0byBjdXQgb3V0IG9mIHRoZSBwb2xhciBzdWJwbG90LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgYmdjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZmx0OiBjb2xvckF0dHJzLmJhY2tncm91bmQsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBzdWJwbG90J1xuICAgIH0sXG5cbiAgICByYWRpYWxheGlzOiByYWRpYWxBeGlzQXR0cnMsXG4gICAgYW5ndWxhcmF4aXM6IGFuZ3VsYXJBeGlzQXR0cnMsXG5cbiAgICBncmlkc2hhcGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnY2lyY3VsYXInLCAnbGluZWFyJ10sXG4gICAgICAgIGRmbHQ6ICdjaXJjdWxhcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyBpZiB0aGUgcmFkaWFsIGF4aXMgZ3JpZCBsaW5lcyBhbmQgYW5ndWxhciBheGlzIGxpbmUgYXJlIGRyYXduJyxcbiAgICAgICAgICAgICdhcyAqY2lyY3VsYXIqIHNlY3RvcnMgb3IgYXMgKmxpbmVhciogKHBvbHlnb24pIHNlY3RvcnMuJyxcbiAgICAgICAgICAgICdIYXMgYW4gZWZmZWN0IG9ubHkgd2hlbiB0aGUgYW5ndWxhciBheGlzIGhhcyBgdHlwZWAgKmNhdGVnb3J5Ki4nLFxuICAgICAgICAgICAgJ05vdGUgdGhhdCBgcmFkaWFsYXhpcy5hbmdsZWAgaXMgc25hcHBlZCB0byB0aGUgYW5nbGUgb2YgdGhlIGNsb3Nlc3QnLFxuICAgICAgICAgICAgJ3ZlcnRleCB3aGVuIGBncmlkc2hhcGVgIGlzICpjaXJjdWxhcionLFxuICAgICAgICAgICAgJyhzbyB0aGF0IHJhZGlhbCBheGlzIHNjYWxlIGlzIHRoZSBzYW1lIGFzIHRoZSBkYXRhIHNjYWxlKS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIC8vIFRPRE8gbWF5YmU/XG4gICAgLy8gYW5ub3RhdGlvbnM6XG5cbiAgICB1aXJldmlzaW9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnbm9uZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQ29udHJvbHMgcGVyc2lzdGVuY2Ugb2YgdXNlci1kcml2ZW4gY2hhbmdlcyBpbiBheGlzIGF0dHJpYnV0ZXMsJyxcbiAgICAgICAgICAgICdpZiBub3Qgb3ZlcnJpZGRlbiBpbiB0aGUgaW5kaXZpZHVhbCBheGVzLicsXG4gICAgICAgICAgICAnRGVmYXVsdHMgdG8gYGxheW91dC51aXJldmlzaW9uYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGVkaXRUeXBlOiAnY2FsYydcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKTtcblxudmFyIGhhbmRsZVN1YnBsb3REZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3N1YnBsb3RfZGVmYXVsdHMnKTtcbnZhciBnZXRTdWJwbG90RGF0YSA9IHJlcXVpcmUoJy4uL2dldF9kYXRhJykuZ2V0U3VicGxvdERhdGE7XG5cbnZhciBoYW5kbGVUaWNrVmFsdWVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi90aWNrX3ZhbHVlX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlVGlja01hcmtEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi90aWNrX21hcmtfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVUaWNrTGFiZWxEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi90aWNrX2xhYmVsX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlQ2F0ZWdvcnlPcmRlckRlZmF1bHRzID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL2NhdGVnb3J5X29yZGVyX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlTGluZUdyaWREZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9saW5lX2dyaWRfZGVmYXVsdHMnKTtcbnZhciBhdXRvVHlwZSA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9heGlzX2F1dG90eXBlJyk7XG5cbnZhciBsYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpO1xudmFyIHNldENvbnZlcnQgPSByZXF1aXJlKCcuL3NldF9jb252ZXJ0Jyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbnZhciBheGlzTmFtZXMgPSBjb25zdGFudHMuYXhpc05hbWVzO1xuXG5mdW5jdGlvbiBoYW5kbGVEZWZhdWx0cyhjb250SW4sIGNvbnRPdXQsIGNvZXJjZSwgb3B0cykge1xuICAgIHZhciBiZ0NvbG9yID0gY29lcmNlKCdiZ2NvbG9yJyk7XG4gICAgb3B0cy5iZ0NvbG9yID0gQ29sb3IuY29tYmluZShiZ0NvbG9yLCBvcHRzLnBhcGVyX2JnY29sb3IpO1xuXG4gICAgdmFyIHNlY3RvciA9IGNvZXJjZSgnc2VjdG9yJyk7XG4gICAgY29lcmNlKCdob2xlJyk7XG5cbiAgICAvLyBjb3VsZCBvcHRpbWl6ZSwgc3VicGxvdERhdGEgaXMgbm90IGFsd2F5cyBuZWVkZWQhXG4gICAgdmFyIHN1YnBsb3REYXRhID0gZ2V0U3VicGxvdERhdGEob3B0cy5mdWxsRGF0YSwgY29uc3RhbnRzLm5hbWUsIG9wdHMuaWQpO1xuICAgIHZhciBsYXlvdXRPdXQgPSBvcHRzLmxheW91dE91dDtcbiAgICB2YXIgYXhOYW1lO1xuXG4gICAgZnVuY3Rpb24gY29lcmNlQXhpcyhhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBjb2VyY2UoYXhOYW1lICsgJy4nICsgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGF4aXNOYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBheE5hbWUgPSBheGlzTmFtZXNbaV07XG5cbiAgICAgICAgaWYoIUxpYi5pc1BsYWluT2JqZWN0KGNvbnRJbltheE5hbWVdKSkge1xuICAgICAgICAgICAgY29udEluW2F4TmFtZV0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBheEluID0gY29udEluW2F4TmFtZV07XG4gICAgICAgIHZhciBheE91dCA9IFRlbXBsYXRlLm5ld0NvbnRhaW5lcihjb250T3V0LCBheE5hbWUpO1xuICAgICAgICBheE91dC5faWQgPSBheE91dC5fbmFtZSA9IGF4TmFtZTtcbiAgICAgICAgYXhPdXQuX2F0dHIgPSBvcHRzLmlkICsgJy4nICsgYXhOYW1lO1xuICAgICAgICBheE91dC5fdHJhY2VJbmRpY2VzID0gc3VicGxvdERhdGEubWFwKGZ1bmN0aW9uKHQpIHsgcmV0dXJuIHQuX2V4cGFuZGVkSW5kZXg7IH0pO1xuXG4gICAgICAgIHZhciBkYXRhQXR0ciA9IGNvbnN0YW50cy5heGlzTmFtZTJkYXRhQXJyYXlbYXhOYW1lXTtcbiAgICAgICAgdmFyIGF4VHlwZSA9IGhhbmRsZUF4aXNUeXBlRGVmYXVsdHMoYXhJbiwgYXhPdXQsIGNvZXJjZUF4aXMsIHN1YnBsb3REYXRhLCBkYXRhQXR0cik7XG5cbiAgICAgICAgaGFuZGxlQ2F0ZWdvcnlPcmRlckRlZmF1bHRzKGF4SW4sIGF4T3V0LCBjb2VyY2VBeGlzLCB7XG4gICAgICAgICAgICBheERhdGE6IHN1YnBsb3REYXRhLFxuICAgICAgICAgICAgZGF0YUF0dHI6IGRhdGFBdHRyXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciB2aXNpYmxlID0gY29lcmNlQXhpcygndmlzaWJsZScpO1xuICAgICAgICBzZXRDb252ZXJ0KGF4T3V0LCBjb250T3V0LCBsYXlvdXRPdXQpO1xuXG4gICAgICAgIGNvZXJjZUF4aXMoJ3VpcmV2aXNpb24nLCBjb250T3V0LnVpcmV2aXNpb24pO1xuXG4gICAgICAgIHZhciBkZmx0Q29sb3I7XG4gICAgICAgIHZhciBkZmx0Rm9udENvbG9yO1xuXG4gICAgICAgIGlmKHZpc2libGUpIHtcbiAgICAgICAgICAgIGRmbHRDb2xvciA9IGNvZXJjZUF4aXMoJ2NvbG9yJyk7XG4gICAgICAgICAgICBkZmx0Rm9udENvbG9yID0gKGRmbHRDb2xvciA9PT0gYXhJbi5jb2xvcikgPyBkZmx0Q29sb3IgOiBvcHRzLmZvbnQuY29sb3I7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBXZSBkb24ndCB3YW50IHRvIG1ha2UgZG93bnN0cmVhbSBjb2RlIGNhbGwgYXguc2V0U2NhbGUsXG4gICAgICAgIC8vIGFzIGJvdGggcmFkaWFsIGFuZCBhbmd1bGFyIGF4ZXMgZG9uJ3QgaGF2ZSBhIHNldCBkb21haW4uXG4gICAgICAgIC8vIEZ1cnRoZXJtb3JlLCBhbmd1bGFyIGF4ZXMgZG9uJ3QgaGF2ZSBhIHNldCByYW5nZS5cbiAgICAgICAgLy9cbiAgICAgICAgLy8gTW9ja2VkIGRvbWFpbnMgYW5kIHJhbmdlcyBhcmUgc2V0IGJ5IHRoZSBwb2xhciBzdWJwbG90IGluc3RhbmNlcyxcbiAgICAgICAgLy8gYnV0IEF4ZXMuZmluZEV4dHJlbWVzIHVzZXMgdGhlIHNpZ24gb2YgX20gdG8gZGV0ZXJtaW5lIHdoaWNoIHBhZGRpbmcgdmFsdWVcbiAgICAgICAgLy8gdG8gdXNlLlxuICAgICAgICAvL1xuICAgICAgICAvLyBCeSBzZXR0aW5nLCBfbSB0byAxIGhlcmUsIHdlIG1ha2UgQXhlcy5maW5kRXh0cmVtZXMgdGhpbmsgdGhhdFxuICAgICAgICAvLyByYW5nZVsxXSA+IHJhbmdlWzBdLCBhbmQgdmljZS12ZXJzYSBmb3IgYGF1dG9yYW5nZTogJ3JldmVyc2VkJ2AgYmVsb3cuXG4gICAgICAgIGF4T3V0Ll9tID0gMTtcblxuICAgICAgICBzd2l0Y2goYXhOYW1lKSB7XG4gICAgICAgICAgICBjYXNlICdyYWRpYWxheGlzJzpcbiAgICAgICAgICAgICAgICB2YXIgYXV0b1JhbmdlID0gY29lcmNlQXhpcygnYXV0b3JhbmdlJywgIWF4T3V0LmlzVmFsaWRSYW5nZShheEluLnJhbmdlKSk7XG4gICAgICAgICAgICAgICAgYXhJbi5hdXRvcmFuZ2UgPSBhdXRvUmFuZ2U7XG4gICAgICAgICAgICAgICAgaWYoYXV0b1JhbmdlICYmIChheFR5cGUgPT09ICdsaW5lYXInIHx8IGF4VHlwZSA9PT0gJy0nKSkgY29lcmNlQXhpcygncmFuZ2Vtb2RlJyk7XG4gICAgICAgICAgICAgICAgaWYoYXV0b1JhbmdlID09PSAncmV2ZXJzZWQnKSBheE91dC5fbSA9IC0xO1xuXG4gICAgICAgICAgICAgICAgY29lcmNlQXhpcygncmFuZ2UnKTtcbiAgICAgICAgICAgICAgICBheE91dC5jbGVhblJhbmdlKCdyYW5nZScsIHtkZmx0UmFuZ2U6IFswLCAxXX0pO1xuXG4gICAgICAgICAgICAgICAgaWYodmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjb2VyY2VBeGlzKCdzaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIGNvZXJjZUF4aXMoJ2FuZ2xlJywgc2VjdG9yWzBdKTtcblxuICAgICAgICAgICAgICAgICAgICBjb2VyY2VBeGlzKCd0aXRsZS50ZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIExpYi5jb2VyY2VGb250KGNvZXJjZUF4aXMsICd0aXRsZS5mb250Jywge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmFtaWx5OiBvcHRzLmZvbnQuZmFtaWx5LFxuICAgICAgICAgICAgICAgICAgICAgICAgc2l6ZTogTWF0aC5yb3VuZChvcHRzLmZvbnQuc2l6ZSAqIDEuMiksXG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogZGZsdEZvbnRDb2xvclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2FuZ3VsYXJheGlzJzpcbiAgICAgICAgICAgICAgICAvLyBXZSBkbyBub3Qgc3VwcG9ydCAndHJ1ZScgZGF0ZSBhbmd1bGFyIGF4ZXMgeWV0LFxuICAgICAgICAgICAgICAgIC8vIHVzZXJzIGNhbiBzdGlsbCBwbG90IGRhdGVzIG9uIGFuZ3VsYXIgYXhlcyBieSBzZXR0aW5nXG4gICAgICAgICAgICAgICAgLy8gYGFuZ3VsYXJheGlzLnR5cGU6ICdjYXRlZ29yeSdgLlxuICAgICAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAgICAgLy8gSGVyZSwgaWYgYSBkYXRlIGFuZ3VsYXIgYXhlcyBpcyBkZXRlY3RlZCwgd2UgbWFrZVxuICAgICAgICAgICAgICAgIC8vIGFsbCBpdHMgY29ycmVzcG9uZGluZyB0cmFjZXMgaW52aXNpYmxlLCBzbyB0aGF0XG4gICAgICAgICAgICAgICAgLy8gd2hlbiB3ZSBkbyBhZGQgc3VwcG9ydCBmb3IgZGF0YSBhbmd1bGFyIGF4ZXMsIHRoZSBuZXdcbiAgICAgICAgICAgICAgICAvLyBiZWhhdmlvciB3b24ndCBjb25mbGljdCB3aXRoIGV4aXN0aW5nIGJlaGF2aW9yXG4gICAgICAgICAgICAgICAgaWYoYXhUeXBlID09PSAnZGF0ZScpIHtcbiAgICAgICAgICAgICAgICAgICAgTGliLmxvZygnUG9sYXIgcGxvdHMgZG8gbm90IHN1cHBvcnQgZGF0ZSBhbmd1bGFyIGF4ZXMgeWV0LicpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBzdWJwbG90RGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3VicGxvdERhdGFbal0udmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdHVybiB0aGlzIGludG8gYSAnZHVtbXknIGxpbmVhciBheGlzIHNvIHRoYXRcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHN1YnBsb3Qgc3RpbGwgcmVuZGVycyBva1xuICAgICAgICAgICAgICAgICAgICBheFR5cGUgPSBheEluLnR5cGUgPSBheE91dC50eXBlID0gJ2xpbmVhcic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoYXhUeXBlID09PSAnbGluZWFyJykge1xuICAgICAgICAgICAgICAgICAgICBjb2VyY2VBeGlzKCd0aGV0YXVuaXQnKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb2VyY2VBeGlzKCdwZXJpb2QnKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0aW9uID0gY29lcmNlQXhpcygnZGlyZWN0aW9uJyk7XG4gICAgICAgICAgICAgICAgY29lcmNlQXhpcygncm90YXRpb24nLCB7Y291bnRlcmNsb2Nrd2lzZTogMCwgY2xvY2t3aXNlOiA5MH1bZGlyZWN0aW9uXSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZih2aXNpYmxlKSB7XG4gICAgICAgICAgICBoYW5kbGVUaWNrVmFsdWVEZWZhdWx0cyhheEluLCBheE91dCwgY29lcmNlQXhpcywgYXhPdXQudHlwZSk7XG4gICAgICAgICAgICBoYW5kbGVUaWNrTGFiZWxEZWZhdWx0cyhheEluLCBheE91dCwgY29lcmNlQXhpcywgYXhPdXQudHlwZSwge1xuICAgICAgICAgICAgICAgIHRpY2tTdWZmaXhEZmx0OiBheE91dC50aGV0YXVuaXQgPT09ICdkZWdyZWVzJyA/ICfCsCcgOiB1bmRlZmluZWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaGFuZGxlVGlja01hcmtEZWZhdWx0cyhheEluLCBheE91dCwgY29lcmNlQXhpcywge291dGVyVGlja3M6IHRydWV9KTtcblxuICAgICAgICAgICAgdmFyIHNob3dUaWNrTGFiZWxzID0gY29lcmNlQXhpcygnc2hvd3RpY2tsYWJlbHMnKTtcbiAgICAgICAgICAgIGlmKHNob3dUaWNrTGFiZWxzKSB7XG4gICAgICAgICAgICAgICAgTGliLmNvZXJjZUZvbnQoY29lcmNlQXhpcywgJ3RpY2tmb250Jywge1xuICAgICAgICAgICAgICAgICAgICBmYW1pbHk6IG9wdHMuZm9udC5mYW1pbHksXG4gICAgICAgICAgICAgICAgICAgIHNpemU6IG9wdHMuZm9udC5zaXplLFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogZGZsdEZvbnRDb2xvclxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvZXJjZUF4aXMoJ3RpY2thbmdsZScpO1xuICAgICAgICAgICAgICAgIGNvZXJjZUF4aXMoJ3RpY2tmb3JtYXQnKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaGFuZGxlTGluZUdyaWREZWZhdWx0cyhheEluLCBheE91dCwgY29lcmNlQXhpcywge1xuICAgICAgICAgICAgICAgIGRmbHRDb2xvcjogZGZsdENvbG9yLFxuICAgICAgICAgICAgICAgIGJnQ29sb3I6IG9wdHMuYmdDb2xvcixcbiAgICAgICAgICAgICAgICAvLyBkZWZhdWx0IGdyaWQgY29sb3IgaXMgZGFya2VyIGhlcmUgKDYwJSwgdnMgY2FydGVzaWFuIGRlZmF1bHQgfjkxJSlcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlIHRoZSBncmlkIGlzIG5vdCBzcXVhcmUgc28gdGhlIGV5ZSBuZWVkcyBoZWF2aWVyIGN1ZXMgdG8gZm9sbG93XG4gICAgICAgICAgICAgICAgYmxlbmQ6IDYwLFxuICAgICAgICAgICAgICAgIHNob3dMaW5lOiB0cnVlLFxuICAgICAgICAgICAgICAgIHNob3dHcmlkOiB0cnVlLFxuICAgICAgICAgICAgICAgIG5vWmVyb0xpbmU6IHRydWUsXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlczogbGF5b3V0QXR0cmlidXRlc1theE5hbWVdXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgY29lcmNlQXhpcygnbGF5ZXInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGF4VHlwZSAhPT0gJ2NhdGVnb3J5JykgY29lcmNlQXhpcygnaG92ZXJmb3JtYXQnKTtcblxuICAgICAgICBheE91dC5faW5wdXQgPSBheEluO1xuICAgIH1cblxuICAgIGlmKGNvbnRPdXQuYW5ndWxhcmF4aXMudHlwZSA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICBjb2VyY2UoJ2dyaWRzaGFwZScpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaGFuZGxlQXhpc1R5cGVEZWZhdWx0cyhheEluLCBheE91dCwgY29lcmNlLCBzdWJwbG90RGF0YSwgZGF0YUF0dHIpIHtcbiAgICB2YXIgYXhUeXBlID0gY29lcmNlKCd0eXBlJyk7XG5cbiAgICBpZihheFR5cGUgPT09ICctJykge1xuICAgICAgICB2YXIgdHJhY2U7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHN1YnBsb3REYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihzdWJwbG90RGF0YVtpXS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgdHJhY2UgPSBzdWJwbG90RGF0YVtpXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHRyYWNlICYmIHRyYWNlW2RhdGFBdHRyXSkge1xuICAgICAgICAgICAgYXhPdXQudHlwZSA9IGF1dG9UeXBlKHRyYWNlW2RhdGFBdHRyXSwgJ2dyZWdvcmlhbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYXhPdXQudHlwZSA9PT0gJy0nKSB7XG4gICAgICAgICAgICBheE91dC50eXBlID0gJ2xpbmVhcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb3B5IGF1dG9UeXBlIGJhY2sgdG8gaW5wdXQgYXhpc1xuICAgICAgICAgICAgLy8gbm90ZSB0aGF0IGlmIHRoaXMgb2JqZWN0IGRpZG4ndCBleGlzdFxuICAgICAgICAgICAgLy8gaW4gdGhlIGlucHV0IGxheW91dCwgd2UgaGF2ZSB0byBwdXQgaXQgaW5cbiAgICAgICAgICAgIC8vIHRoaXMgaGFwcGVucyBpbiB0aGUgbWFpbiBzdXBwbHlEZWZhdWx0cyBmdW5jdGlvblxuICAgICAgICAgICAgYXhJbi50eXBlID0gYXhPdXQudHlwZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBheE91dC50eXBlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseUxheW91dERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhKSB7XG4gICAgaGFuZGxlU3VicGxvdERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhLCB7XG4gICAgICAgIHR5cGU6IGNvbnN0YW50cy5uYW1lLFxuICAgICAgICBhdHRyaWJ1dGVzOiBsYXlvdXRBdHRyaWJ1dGVzLFxuICAgICAgICBoYW5kbGVEZWZhdWx0czogaGFuZGxlRGVmYXVsdHMsXG4gICAgICAgIGZvbnQ6IGxheW91dE91dC5mb250LFxuICAgICAgICBwYXBlcl9iZ2NvbG9yOiBsYXlvdXRPdXQucGFwZXJfYmdjb2xvcixcbiAgICAgICAgZnVsbERhdGE6IGZ1bGxEYXRhLFxuICAgICAgICBsYXlvdXRPdXQ6IGxheW91dE91dFxuICAgIH0pO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciB0aW55Y29sb3IgPSByZXF1aXJlKCd0aW55Y29sb3IyJyk7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIFBsb3RzID0gcmVxdWlyZSgnLi4vcGxvdHMnKTtcbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBzZXRDb252ZXJ0Q2FydGVzaWFuID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL3NldF9jb252ZXJ0Jyk7XG52YXIgc2V0Q29udmVydFBvbGFyID0gcmVxdWlyZSgnLi9zZXRfY29udmVydCcpO1xudmFyIGRvQXV0b1JhbmdlID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL2F1dG9yYW5nZScpLmRvQXV0b1JhbmdlO1xudmFyIGRyYWdCb3ggPSByZXF1aXJlKCcuLi9jYXJ0ZXNpYW4vZHJhZ2JveCcpO1xudmFyIGRyYWdFbGVtZW50ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmFnZWxlbWVudCcpO1xudmFyIEZ4ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meCcpO1xudmFyIFRpdGxlcyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvdGl0bGVzJyk7XG52YXIgcHJlcFNlbGVjdCA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9zZWxlY3QnKS5wcmVwU2VsZWN0O1xudmFyIHNlbGVjdE9uQ2xpY2sgPSByZXF1aXJlKCcuLi9jYXJ0ZXNpYW4vc2VsZWN0Jykuc2VsZWN0T25DbGljaztcbnZhciBjbGVhclNlbGVjdCA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9zZWxlY3QnKS5jbGVhclNlbGVjdDtcbnZhciBzZXRDdXJzb3IgPSByZXF1aXJlKCcuLi8uLi9saWIvc2V0Y3Vyc29yJyk7XG52YXIgY2xlYXJHbENhbnZhc2VzID0gcmVxdWlyZSgnLi4vLi4vbGliL2NsZWFyX2dsX2NhbnZhc2VzJyk7XG52YXIgcmVkcmF3UmVnbFRyYWNlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL3N1YnJvdXRpbmVzJykucmVkcmF3UmVnbFRyYWNlcztcblxudmFyIE1JRF9TSElGVCA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9hbGlnbm1lbnQnKS5NSURfU0hJRlQ7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG5cbnZhciBfID0gTGliLl87XG52YXIgbW9kID0gTGliLm1vZDtcbnZhciBkZWcycmFkID0gTGliLmRlZzJyYWQ7XG52YXIgcmFkMmRlZyA9IExpYi5yYWQyZGVnO1xuXG5mdW5jdGlvbiBQb2xhcihnZCwgaWQpIHtcbiAgICB0aGlzLmlkID0gaWQ7XG4gICAgdGhpcy5nZCA9IGdkO1xuXG4gICAgdGhpcy5faGFzQ2xpcE9uQXhpc0ZhbHNlID0gbnVsbDtcbiAgICB0aGlzLnZhbmdsZXMgPSBudWxsO1xuICAgIHRoaXMucmFkaWFsQXhpc0FuZ2xlID0gbnVsbDtcbiAgICB0aGlzLnRyYWNlSGFzaCA9IHt9O1xuICAgIHRoaXMubGF5ZXJzID0ge307XG4gICAgdGhpcy5jbGlwUGF0aHMgPSB7fTtcbiAgICB0aGlzLmNsaXBJZHMgPSB7fTtcbiAgICB0aGlzLnZpZXdJbml0aWFsID0ge307XG5cbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBjbGlwSWRCYXNlID0gJ2NsaXAnICsgZnVsbExheW91dC5fdWlkICsgaWQ7XG5cbiAgICB0aGlzLmNsaXBJZHMuZm9yVHJhY2VzID0gY2xpcElkQmFzZSArICctZm9yLXRyYWNlcyc7XG4gICAgdGhpcy5jbGlwUGF0aHMuZm9yVHJhY2VzID0gZnVsbExheW91dC5fY2xpcHMuYXBwZW5kKCdjbGlwUGF0aCcpXG4gICAgICAgIC5hdHRyKCdpZCcsIHRoaXMuY2xpcElkcy5mb3JUcmFjZXMpO1xuICAgIHRoaXMuY2xpcFBhdGhzLmZvclRyYWNlcy5hcHBlbmQoJ3BhdGgnKTtcblxuICAgIHRoaXMuZnJhbWV3b3JrID0gZnVsbExheW91dC5fcG9sYXJsYXllci5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCBpZCk7XG5cbiAgICAvLyB1bmZvcnR1bmF0ZWx5LCB3ZSBoYXZlIHRvIGtlZXAgdHJhY2sgb2Ygc29tZSBheGlzIHRpY2sgc2V0dGluZ3NcbiAgICAvLyBhcyBwb2xhciBzdWJwbG90cyBkbyBub3QgaW1wbGVtZW50IHRoZSAndGlja3MnIGVkaXRUeXBlXG4gICAgdGhpcy5yYWRpYWxUaWNrTGF5b3V0ID0gbnVsbDtcbiAgICB0aGlzLmFuZ3VsYXJUaWNrTGF5b3V0ID0gbnVsbDtcbn1cblxudmFyIHByb3RvID0gUG9sYXIucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZVBvbGFyKGdkLCBpZCkge1xuICAgIHJldHVybiBuZXcgUG9sYXIoZ2QsIGlkKTtcbn07XG5cbnByb3RvLnBsb3QgPSBmdW5jdGlvbihwb2xhckNhbGNEYXRhLCBmdWxsTGF5b3V0KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgcG9sYXJMYXlvdXQgPSBmdWxsTGF5b3V0W190aGlzLmlkXTtcblxuICAgIF90aGlzLl9oYXNDbGlwT25BeGlzRmFsc2UgPSBmYWxzZTtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcG9sYXJDYWxjRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhY2UgPSBwb2xhckNhbGNEYXRhW2ldWzBdLnRyYWNlO1xuICAgICAgICBpZih0cmFjZS5jbGlwb25heGlzID09PSBmYWxzZSkge1xuICAgICAgICAgICAgX3RoaXMuX2hhc0NsaXBPbkF4aXNGYWxzZSA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIF90aGlzLnVwZGF0ZUxheWVycyhmdWxsTGF5b3V0LCBwb2xhckxheW91dCk7XG4gICAgX3RoaXMudXBkYXRlTGF5b3V0KGZ1bGxMYXlvdXQsIHBvbGFyTGF5b3V0KTtcbiAgICBQbG90cy5nZW5lcmFsVXBkYXRlUGVyVHJhY2VNb2R1bGUoX3RoaXMuZ2QsIF90aGlzLCBwb2xhckNhbGNEYXRhLCBwb2xhckxheW91dCk7XG4gICAgX3RoaXMudXBkYXRlRngoZnVsbExheW91dCwgcG9sYXJMYXlvdXQpO1xufTtcblxucHJvdG8udXBkYXRlTGF5ZXJzID0gZnVuY3Rpb24oZnVsbExheW91dCwgcG9sYXJMYXlvdXQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBsYXllcnMgPSBfdGhpcy5sYXllcnM7XG4gICAgdmFyIHJhZGlhbExheW91dCA9IHBvbGFyTGF5b3V0LnJhZGlhbGF4aXM7XG4gICAgdmFyIGFuZ3VsYXJMYXlvdXQgPSBwb2xhckxheW91dC5hbmd1bGFyYXhpcztcbiAgICB2YXIgbGF5ZXJOYW1lcyA9IGNvbnN0YW50cy5sYXllck5hbWVzO1xuXG4gICAgdmFyIGZyb250UGxvdEluZGV4ID0gbGF5ZXJOYW1lcy5pbmRleE9mKCdmcm9udHBsb3QnKTtcbiAgICB2YXIgbGF5ZXJEYXRhID0gbGF5ZXJOYW1lcy5zbGljZSgwLCBmcm9udFBsb3RJbmRleCk7XG4gICAgdmFyIGlzQW5ndWxhckF4aXNCZWxvd1RyYWNlcyA9IGFuZ3VsYXJMYXlvdXQubGF5ZXIgPT09ICdiZWxvdyB0cmFjZXMnO1xuICAgIHZhciBpc1JhZGlhbEF4aXNCZWxvd1RyYWNlcyA9IHJhZGlhbExheW91dC5sYXllciA9PT0gJ2JlbG93IHRyYWNlcyc7XG5cbiAgICBpZihpc0FuZ3VsYXJBeGlzQmVsb3dUcmFjZXMpIGxheWVyRGF0YS5wdXNoKCdhbmd1bGFyLWxpbmUnKTtcbiAgICBpZihpc1JhZGlhbEF4aXNCZWxvd1RyYWNlcykgbGF5ZXJEYXRhLnB1c2goJ3JhZGlhbC1saW5lJyk7XG4gICAgaWYoaXNBbmd1bGFyQXhpc0JlbG93VHJhY2VzKSBsYXllckRhdGEucHVzaCgnYW5ndWxhci1heGlzJyk7XG4gICAgaWYoaXNSYWRpYWxBeGlzQmVsb3dUcmFjZXMpIGxheWVyRGF0YS5wdXNoKCdyYWRpYWwtYXhpcycpO1xuXG4gICAgbGF5ZXJEYXRhLnB1c2goJ2Zyb250cGxvdCcpO1xuXG4gICAgaWYoIWlzQW5ndWxhckF4aXNCZWxvd1RyYWNlcykgbGF5ZXJEYXRhLnB1c2goJ2FuZ3VsYXItbGluZScpO1xuICAgIGlmKCFpc1JhZGlhbEF4aXNCZWxvd1RyYWNlcykgbGF5ZXJEYXRhLnB1c2goJ3JhZGlhbC1saW5lJyk7XG4gICAgaWYoIWlzQW5ndWxhckF4aXNCZWxvd1RyYWNlcykgbGF5ZXJEYXRhLnB1c2goJ2FuZ3VsYXItYXhpcycpO1xuICAgIGlmKCFpc1JhZGlhbEF4aXNCZWxvd1RyYWNlcykgbGF5ZXJEYXRhLnB1c2goJ3JhZGlhbC1heGlzJyk7XG5cbiAgICB2YXIgam9pbiA9IF90aGlzLmZyYW1ld29yay5zZWxlY3RBbGwoJy5wb2xhcnN1YmxheWVyJylcbiAgICAgICAgLmRhdGEobGF5ZXJEYXRhLCBTdHJpbmcpO1xuXG4gICAgam9pbi5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICdwb2xhcnN1YmxheWVyICcgKyBkO30pXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciBzZWwgPSBsYXllcnNbZF0gPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgICAgIHN3aXRjaChkKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvbnRwbG90JzpcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETyBhZGQgb3B0aW9uIHRvIHBsYWNlIGluICdiYWNrcGxvdCcgbGF5ZXI/P1xuICAgICAgICAgICAgICAgICAgICBzZWwuYXBwZW5kKCdnJykuY2xhc3NlZCgnYmFybGF5ZXInLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgc2VsLmFwcGVuZCgnZycpLmNsYXNzZWQoJ3NjYXR0ZXJsYXllcicsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdiYWNrcGxvdCc6XG4gICAgICAgICAgICAgICAgICAgIHNlbC5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdtYXBsYXllcicsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwbG90YmcnOlxuICAgICAgICAgICAgICAgICAgICBsYXllcnMuYmcgPSBzZWwuYXBwZW5kKCdwYXRoJyk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3JhZGlhbC1ncmlkJzpcbiAgICAgICAgICAgICAgICAgICAgc2VsLnN0eWxlKCdmaWxsJywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnYW5ndWxhci1ncmlkJzpcbiAgICAgICAgICAgICAgICAgICAgc2VsLnN0eWxlKCdmaWxsJywgJ25vbmUnKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncmFkaWFsLWxpbmUnOlxuICAgICAgICAgICAgICAgICAgICBzZWwuYXBwZW5kKCdsaW5lJykuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdhbmd1bGFyLWxpbmUnOlxuICAgICAgICAgICAgICAgICAgICBzZWwuYXBwZW5kKCdwYXRoJykuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICBqb2luLm9yZGVyKCk7XG59O1xuXG4vKiBQb2xhciBzdWJwbG90cyBqdWdnbGUgd2l0aCA2ICdheGlzIG9iamVjdHMnICghKSwgdGhlc2UgYXJlOlxuICpcbiAqIC0gcG9sYXJMYXlvdXQucmFkaWFsYXhpcyAoYWthIHJhZGlhbExheW91dCBpbiB0aGlzIGZpbGUpOlxuICogLSBwb2xhckxheW91dC5hbmd1bGFyYXhpcyAoYWthIGFuZ3VsYXJMYXlvdXQgaW4gdGhpcyBmaWxlKTpcbiAqICAgdXNlZCBmb3IgZGF0YSAtPiBjYWxjZGF0YSBjb252ZXJzaW9ucyAoYWthIGQyYykgZHVyaW5nIHRoZSBjYWxjIHN0ZXBcbiAqXG4gKiAtIHRoaXMucmFkaWFsQXhpc1xuICogICBleHRlbmRzIHBvbGFyTGF5b3V0LnJhZGlhbGF4aXMsIGFkZHMgbW9ja2VkICdkb21haW4nIGFuZFxuICogICBmZXcgb3RoZXIga2V5cyBpbiBvcmRlciB0byByZXVzZSBDYXJ0ZXNpYW4gZG9BdXRvUmFuZ2UgYW5kIHRoZSBBeGVzXG4gKiAgIGRyYXdpbmcgcm91dGluZXMuXG4gKiAgIHVzZWQgZm9yIGNhbGNkYXRhIC0+IGdlb21ldHJpYyBjb252ZXJzaW9ucyAoYWthIGMyZykgZHVyaW5nIHRoZSBwbG90IHN0ZXBcbiAqICAgKyBzZXRHZW9tZXRyeSBzZXR1cHMgYXguYzJnIGZvciBnaXZlbiBheC5yYW5nZVxuICogICArIHNldFNjYWxlIHNldHVwcyBheC5fbSxheC5fYiBmb3IgZ2l2ZW4gYXgucmFuZ2VcbiAqXG4gKiAtIHRoaXMuYW5ndWxhckF4aXNcbiAqICAgZXh0ZW5kcyBwb2xhckxheW91dC5hbmd1bGFyYXhpcywgYWRkcyBtb2NrZWQgJ3JhbmdlJyBhbmQgJ2RvbWFpbicgYW5kXG4gKiAgIGEgZmV3IG90aGVyIGtleXMgaW4gb3JkZXIgdG8gcmV1c2UgdGhlIEF4ZXMgZHJhd2luZyByb3V0aW5lcy5cbiAqICAgdXNlZCBmb3IgY2FsY2RhdGEgLT4gZ2VvbWV0cmljIGNvbnZlcnNpb25zIChha2EgYzJnKSBkdXJpbmcgdGhlIHBsb3Qgc3RlcFxuICogICArIHNldEdlb21ldHJ5IHNldHVwcyBheC5jMmcgZ2l2ZW4gYXgucm90YXRpb24sIGF4LmRpcmVjdGlvbiAmIGF4Ll9jYXRlZ29yaWVzLFxuICogICAgICAgICAgICAgICAgIGFuZCBtb2NrcyBheC5yYW5nZVxuICogICArIHNldFNjYWxlIHNldHVwcyBheC5fbSxheC5fYiB3aXRoIHRoYXQgbW9ja2VkIGF4LnJhbmdlXG4gKlxuICogLSB0aGlzLnhheGlzXG4gKiAtIHRoaXMueWF4aXNcbiAqICAgc2V0dXAgc28gdGhhdCBwb2xhciB0cmFjZXMgY2FuIHJldXNlIHBsb3QgbWV0aG9kcyBvZiBDYXJ0ZXNpYW4gdHJhY2VzXG4gKiAgIHdoaWNoIG1vc3RseSByZWx5IG9uIDJwaXhlbCBtZXRob2RzIChlLmcgYXguYzJwKVxuICovXG5wcm90by51cGRhdGVMYXlvdXQgPSBmdW5jdGlvbihmdWxsTGF5b3V0LCBwb2xhckxheW91dCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGxheWVycyA9IF90aGlzLmxheWVycztcbiAgICB2YXIgZ3MgPSBmdWxsTGF5b3V0Ll9zaXplO1xuXG4gICAgLy8gYXhpcyBhdHRyaWJ1dGVzXG4gICAgdmFyIHJhZGlhbExheW91dCA9IHBvbGFyTGF5b3V0LnJhZGlhbGF4aXM7XG4gICAgdmFyIGFuZ3VsYXJMYXlvdXQgPSBwb2xhckxheW91dC5hbmd1bGFyYXhpcztcbiAgICAvLyBsYXlvdXQgZG9tYWluc1xuICAgIHZhciB4RG9tYWluID0gcG9sYXJMYXlvdXQuZG9tYWluLng7XG4gICAgdmFyIHlEb21haW4gPSBwb2xhckxheW91dC5kb21haW4ueTtcbiAgICAvLyBvZmZzZXRzIGZyb20gcGFwZXIgZWRnZSB0byBsYXlvdXQgZG9tYWluIGJveFxuICAgIF90aGlzLnhPZmZzZXQgPSBncy5sICsgZ3MudyAqIHhEb21haW5bMF07XG4gICAgX3RoaXMueU9mZnNldCA9IGdzLnQgKyBncy5oICogKDEgLSB5RG9tYWluWzFdKTtcbiAgICAvLyBsZW5ndGhzIG9mIHRoZSBsYXlvdXQgZG9tYWluIGJveFxuICAgIHZhciB4TGVuZ3RoID0gX3RoaXMueExlbmd0aCA9IGdzLncgKiAoeERvbWFpblsxXSAtIHhEb21haW5bMF0pO1xuICAgIHZhciB5TGVuZ3RoID0gX3RoaXMueUxlbmd0aCA9IGdzLmggKiAoeURvbWFpblsxXSAtIHlEb21haW5bMF0pO1xuICAgIC8vIHNlY3RvciB0byBwbG90XG4gICAgdmFyIHNlY3RvciA9IHBvbGFyTGF5b3V0LnNlY3RvcjtcbiAgICBfdGhpcy5zZWN0b3JJblJhZCA9IHNlY3Rvci5tYXAoZGVnMnJhZCk7XG4gICAgdmFyIHNlY3RvckJCb3ggPSBfdGhpcy5zZWN0b3JCQm94ID0gY29tcHV0ZVNlY3RvckJCb3goc2VjdG9yKTtcbiAgICB2YXIgZHhTZWN0b3JCQm94ID0gc2VjdG9yQkJveFsyXSAtIHNlY3RvckJCb3hbMF07XG4gICAgdmFyIGR5U2VjdG9yQkJveCA9IHNlY3RvckJCb3hbM10gLSBzZWN0b3JCQm94WzFdO1xuICAgIC8vIGFzcGVjdCByYXRpb3NcbiAgICB2YXIgYXJEb21haW4gPSB5TGVuZ3RoIC8geExlbmd0aDtcbiAgICB2YXIgYXJTZWN0b3IgPSBNYXRoLmFicyhkeVNlY3RvckJCb3ggLyBkeFNlY3RvckJCb3gpO1xuICAgIC8vIGFjdHVhbCBsZW5ndGhzIGFuZCBkb21haW5zIG9mIHN1YnBsb3QgYm94XG4gICAgdmFyIHhMZW5ndGgyLCB5TGVuZ3RoMjtcbiAgICB2YXIgeERvbWFpbjIsIHlEb21haW4yO1xuICAgIHZhciBnYXA7XG4gICAgaWYoYXJEb21haW4gPiBhclNlY3Rvcikge1xuICAgICAgICB4TGVuZ3RoMiA9IHhMZW5ndGg7XG4gICAgICAgIHlMZW5ndGgyID0geExlbmd0aCAqIGFyU2VjdG9yO1xuICAgICAgICBnYXAgPSAoeUxlbmd0aCAtIHlMZW5ndGgyKSAvIGdzLmggLyAyO1xuICAgICAgICB4RG9tYWluMiA9IFt4RG9tYWluWzBdLCB4RG9tYWluWzFdXTtcbiAgICAgICAgeURvbWFpbjIgPSBbeURvbWFpblswXSArIGdhcCwgeURvbWFpblsxXSAtIGdhcF07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeExlbmd0aDIgPSB5TGVuZ3RoIC8gYXJTZWN0b3I7XG4gICAgICAgIHlMZW5ndGgyID0geUxlbmd0aDtcbiAgICAgICAgZ2FwID0gKHhMZW5ndGggLSB4TGVuZ3RoMikgLyBncy53IC8gMjtcbiAgICAgICAgeERvbWFpbjIgPSBbeERvbWFpblswXSArIGdhcCwgeERvbWFpblsxXSAtIGdhcF07XG4gICAgICAgIHlEb21haW4yID0gW3lEb21haW5bMF0sIHlEb21haW5bMV1dO1xuICAgIH1cbiAgICBfdGhpcy54TGVuZ3RoMiA9IHhMZW5ndGgyO1xuICAgIF90aGlzLnlMZW5ndGgyID0geUxlbmd0aDI7XG4gICAgX3RoaXMueERvbWFpbjIgPSB4RG9tYWluMjtcbiAgICBfdGhpcy55RG9tYWluMiA9IHlEb21haW4yO1xuICAgIC8vIGFjdHVhbCBvZmZzZXRzIGZyb20gcGFwZXIgZWRnZSB0byB0aGUgc3VicGxvdCBib3ggdG9wLWxlZnQgY29ybmVyXG4gICAgdmFyIHhPZmZzZXQyID0gX3RoaXMueE9mZnNldDIgPSBncy5sICsgZ3MudyAqIHhEb21haW4yWzBdO1xuICAgIHZhciB5T2Zmc2V0MiA9IF90aGlzLnlPZmZzZXQyID0gZ3MudCArIGdzLmggKiAoMSAtIHlEb21haW4yWzFdKTtcbiAgICAvLyBjaXJjbGUgcmFkaXVzIGluIHB4XG4gICAgdmFyIHJhZGl1cyA9IF90aGlzLnJhZGl1cyA9IHhMZW5ndGgyIC8gZHhTZWN0b3JCQm94O1xuICAgIC8vICdpbm5lcicgcmFkaXVzIGluIHB4ICh3aGVuIHBvbGFyLmhvbGUgaXMgc2V0KVxuICAgIHZhciBpbm5lclJhZGl1cyA9IF90aGlzLmlubmVyUmFkaXVzID0gcG9sYXJMYXlvdXQuaG9sZSAqIHJhZGl1cztcbiAgICAvLyBjaXJjbGUgY2VudGVyIHBvc2l0aW9uIGluIHB4XG4gICAgdmFyIGN4ID0gX3RoaXMuY3ggPSB4T2Zmc2V0MiAtIHJhZGl1cyAqIHNlY3RvckJCb3hbMF07XG4gICAgdmFyIGN5ID0gX3RoaXMuY3kgPSB5T2Zmc2V0MiArIHJhZGl1cyAqIHNlY3RvckJCb3hbM107XG4gICAgLy8gY2lyY2xlIGNlbnRlciBpbiB0aGUgY29vcmRpbmF0ZSBzeXN0ZW0gb2YgcGxvdCBhcmVhXG4gICAgdmFyIGN4eCA9IF90aGlzLmN4eCA9IGN4IC0geE9mZnNldDI7XG4gICAgdmFyIGN5eSA9IF90aGlzLmN5eSA9IGN5IC0geU9mZnNldDI7XG5cbiAgICBfdGhpcy5yYWRpYWxBeGlzID0gX3RoaXMubW9ja0F4aXMoZnVsbExheW91dCwgcG9sYXJMYXlvdXQsIHJhZGlhbExheW91dCwge1xuICAgICAgICAvLyBtYWtlIHRoaXMgYW4gJ3gnIGF4aXMgdG8gbWFrZSBwb3NpdGlvbmluZyAoZXNwZWNpYWxseSByb3RhdGlvbikgZWFzaWVyXG4gICAgICAgIF9pZDogJ3gnLFxuICAgICAgICAvLyBjb252ZXJ0IHRvICd4JyBheGlzIGVxdWl2YWxlbnRcbiAgICAgICAgc2lkZToge1xuICAgICAgICAgICAgY291bnRlcmNsb2Nrd2lzZTogJ3RvcCcsXG4gICAgICAgICAgICBjbG9ja3dpc2U6ICdib3R0b20nXG4gICAgICAgIH1bcmFkaWFsTGF5b3V0LnNpZGVdLFxuICAgICAgICAvLyBzcGFucyBsZW5ndGggMSByYWRpdXNcbiAgICAgICAgZG9tYWluOiBbaW5uZXJSYWRpdXMgLyBncy53LCByYWRpdXMgLyBncy53XVxuICAgIH0pO1xuXG4gICAgX3RoaXMuYW5ndWxhckF4aXMgPSBfdGhpcy5tb2NrQXhpcyhmdWxsTGF5b3V0LCBwb2xhckxheW91dCwgYW5ndWxhckxheW91dCwge1xuICAgICAgICBzaWRlOiAncmlnaHQnLFxuICAgICAgICAvLyB0byBnZXQgYXV0byBudGlja3MgcmlnaHRcbiAgICAgICAgZG9tYWluOiBbMCwgTWF0aC5QSV0sXG4gICAgICAgIC8vIGRvbid0IHBhc3MgdGhyb3VnaCBhdXRvcmFuZ2UgbG9naWNcbiAgICAgICAgYXV0b3JhbmdlOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgX3RoaXMuZG9BdXRvUmFuZ2UoZnVsbExheW91dCwgcG9sYXJMYXlvdXQpO1xuICAgIC8vIE4uQi4gdGhpcyBzZXRzIF90aGlzLnZhbmdsZXNcbiAgICBfdGhpcy51cGRhdGVBbmd1bGFyQXhpcyhmdWxsTGF5b3V0LCBwb2xhckxheW91dCk7XG4gICAgLy8gTi5CLiB0aGlzIHNldHMgX3RoaXMucmFkaWFsQXhpc0FuZ2xlXG4gICAgX3RoaXMudXBkYXRlUmFkaWFsQXhpcyhmdWxsTGF5b3V0LCBwb2xhckxheW91dCk7XG4gICAgX3RoaXMudXBkYXRlUmFkaWFsQXhpc1RpdGxlKGZ1bGxMYXlvdXQsIHBvbGFyTGF5b3V0KTtcblxuICAgIF90aGlzLnhheGlzID0gX3RoaXMubW9ja0NhcnRlc2lhbkF4aXMoZnVsbExheW91dCwgcG9sYXJMYXlvdXQsIHtcbiAgICAgICAgX2lkOiAneCcsXG4gICAgICAgIGRvbWFpbjogeERvbWFpbjJcbiAgICB9KTtcblxuICAgIF90aGlzLnlheGlzID0gX3RoaXMubW9ja0NhcnRlc2lhbkF4aXMoZnVsbExheW91dCwgcG9sYXJMYXlvdXQsIHtcbiAgICAgICAgX2lkOiAneScsXG4gICAgICAgIGRvbWFpbjogeURvbWFpbjJcbiAgICB9KTtcblxuICAgIHZhciBkUGF0aCA9IF90aGlzLnBhdGhTdWJwbG90KCk7XG5cbiAgICBfdGhpcy5jbGlwUGF0aHMuZm9yVHJhY2VzLnNlbGVjdCgncGF0aCcpXG4gICAgICAgIC5hdHRyKCdkJywgZFBhdGgpXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBzdHJUcmFuc2xhdGUoY3h4LCBjeXkpKTtcblxuICAgIGxheWVycy5mcm9udHBsb3RcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIHN0clRyYW5zbGF0ZSh4T2Zmc2V0MiwgeU9mZnNldDIpKVxuICAgICAgICAuY2FsbChEcmF3aW5nLnNldENsaXBVcmwsIF90aGlzLl9oYXNDbGlwT25BeGlzRmFsc2UgPyBudWxsIDogX3RoaXMuY2xpcElkcy5mb3JUcmFjZXMsIF90aGlzLmdkKTtcblxuICAgIGxheWVycy5iZ1xuICAgICAgICAuYXR0cignZCcsIGRQYXRoKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgc3RyVHJhbnNsYXRlKGN4LCBjeSkpXG4gICAgICAgIC5jYWxsKENvbG9yLmZpbGwsIHBvbGFyTGF5b3V0LmJnY29sb3IpO1xufTtcblxucHJvdG8ubW9ja0F4aXMgPSBmdW5jdGlvbihmdWxsTGF5b3V0LCBwb2xhckxheW91dCwgYXhMYXlvdXQsIG9wdHMpIHtcbiAgICB2YXIgYXggPSBMaWIuZXh0ZW5kRmxhdCh7fSwgYXhMYXlvdXQsIG9wdHMpO1xuICAgIHNldENvbnZlcnRQb2xhcihheCwgcG9sYXJMYXlvdXQsIGZ1bGxMYXlvdXQpO1xuICAgIHJldHVybiBheDtcbn07XG5cbnByb3RvLm1vY2tDYXJ0ZXNpYW5BeGlzID0gZnVuY3Rpb24oZnVsbExheW91dCwgcG9sYXJMYXlvdXQsIG9wdHMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBheElkID0gb3B0cy5faWQ7XG5cbiAgICB2YXIgYXggPSBMaWIuZXh0ZW5kRmxhdCh7dHlwZTogJ2xpbmVhcid9LCBvcHRzKTtcbiAgICBzZXRDb252ZXJ0Q2FydGVzaWFuKGF4LCBmdWxsTGF5b3V0KTtcblxuICAgIHZhciBiYm94SW5kaWNlcyA9IHtcbiAgICAgICAgeDogWzAsIDJdLFxuICAgICAgICB5OiBbMSwgM11cbiAgICB9O1xuXG4gICAgYXguc2V0UmFuZ2UgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlY3RvckJCb3ggPSBfdGhpcy5zZWN0b3JCQm94O1xuICAgICAgICB2YXIgaW5kID0gYmJveEluZGljZXNbYXhJZF07XG4gICAgICAgIHZhciBybCA9IF90aGlzLnJhZGlhbEF4aXMuX3JsO1xuICAgICAgICB2YXIgZHJsID0gKHJsWzFdIC0gcmxbMF0pIC8gKDEgLSBwb2xhckxheW91dC5ob2xlKTtcbiAgICAgICAgYXgucmFuZ2UgPSBbc2VjdG9yQkJveFtpbmRbMF1dICogZHJsLCBzZWN0b3JCQm94W2luZFsxXV0gKiBkcmxdO1xuICAgIH07XG5cbiAgICBheC5pc1B0V2l0aGluUmFuZ2UgPSBheElkID09PSAneCcgP1xuICAgICAgICBmdW5jdGlvbihkKSB7IHJldHVybiBfdGhpcy5pc1B0SW5zaWRlKGQpOyB9IDpcbiAgICAgICAgZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9O1xuXG4gICAgYXguc2V0UmFuZ2UoKTtcbiAgICBheC5zZXRTY2FsZSgpO1xuICAgIHJldHVybiBheDtcbn07XG5cbnByb3RvLmRvQXV0b1JhbmdlID0gZnVuY3Rpb24oZnVsbExheW91dCwgcG9sYXJMYXlvdXQpIHtcbiAgICB2YXIgZ2QgPSB0aGlzLmdkO1xuICAgIHZhciByYWRpYWxBeGlzID0gdGhpcy5yYWRpYWxBeGlzO1xuICAgIHZhciByYWRpYWxMYXlvdXQgPSBwb2xhckxheW91dC5yYWRpYWxheGlzO1xuXG4gICAgcmFkaWFsQXhpcy5zZXRTY2FsZSgpO1xuICAgIGRvQXV0b1JhbmdlKGdkLCByYWRpYWxBeGlzKTtcblxuICAgIHZhciBybmcgPSByYWRpYWxBeGlzLnJhbmdlO1xuICAgIHJhZGlhbExheW91dC5yYW5nZSA9IHJuZy5zbGljZSgpO1xuICAgIHJhZGlhbExheW91dC5faW5wdXQucmFuZ2UgPSBybmcuc2xpY2UoKTtcblxuICAgIHJhZGlhbEF4aXMuX3JsID0gW1xuICAgICAgICByYWRpYWxBeGlzLnIybChybmdbMF0sIG51bGwsICdncmVnb3JpYW4nKSxcbiAgICAgICAgcmFkaWFsQXhpcy5yMmwocm5nWzFdLCBudWxsLCAnZ3JlZ29yaWFuJylcbiAgICBdO1xufTtcblxucHJvdG8udXBkYXRlUmFkaWFsQXhpcyA9IGZ1bmN0aW9uKGZ1bGxMYXlvdXQsIHBvbGFyTGF5b3V0KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2QgPSBfdGhpcy5nZDtcbiAgICB2YXIgbGF5ZXJzID0gX3RoaXMubGF5ZXJzO1xuICAgIHZhciByYWRpdXMgPSBfdGhpcy5yYWRpdXM7XG4gICAgdmFyIGlubmVyUmFkaXVzID0gX3RoaXMuaW5uZXJSYWRpdXM7XG4gICAgdmFyIGN4ID0gX3RoaXMuY3g7XG4gICAgdmFyIGN5ID0gX3RoaXMuY3k7XG4gICAgdmFyIHJhZGlhbExheW91dCA9IHBvbGFyTGF5b3V0LnJhZGlhbGF4aXM7XG4gICAgdmFyIGEwID0gbW9kKHBvbGFyTGF5b3V0LnNlY3RvclswXSwgMzYwKTtcbiAgICB2YXIgYXggPSBfdGhpcy5yYWRpYWxBeGlzO1xuICAgIHZhciBoYXNSb29tRm9ySXQgPSBpbm5lclJhZGl1cyA8IHJhZGl1cztcblxuICAgIF90aGlzLmZpbGxWaWV3SW5pdGlhbEtleSgncmFkaWFsYXhpcy5hbmdsZScsIHJhZGlhbExheW91dC5hbmdsZSk7XG4gICAgX3RoaXMuZmlsbFZpZXdJbml0aWFsS2V5KCdyYWRpYWxheGlzLnJhbmdlJywgYXgucmFuZ2Uuc2xpY2UoKSk7XG5cbiAgICBheC5zZXRHZW9tZXRyeSgpO1xuXG4gICAgLy8gcm90YXRlIGF1dG8gdGljayBsYWJlbHMgYnkgMTgwIGlmIGluIHF1YWRyYW50IElJIGFuZCBJSUkgdG8gbWFrZSB0aGVtXG4gICAgLy8gcmVhZGFibGUgZnJvbSBsZWZ0LXRvLXJpZ2h0XG4gICAgLy9cbiAgICAvLyBUT0RPIHRyeSBtb3ZpbmcgZGVlcGVyIGluIEF4ZXMuZHJhd0xhYmVscyBmb3IgYmV0dGVyIHJlc3VsdHM/XG4gICAgaWYoYXgudGlja2FuZ2xlID09PSAnYXV0bycgJiYgKGEwID4gOTAgJiYgYTAgPD0gMjcwKSkge1xuICAgICAgICBheC50aWNrYW5nbGUgPSAxODA7XG4gICAgfVxuXG4gICAgLy8gZWFzaWVyIHRvIHNldCByb3RhdGUgYW5nbGUgd2l0aCBjdXN0b20gdHJhbnNsYXRlIGZ1bmN0aW9uXG4gICAgdmFyIHRyYW5zRm4gPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyAoYXgubDJwKGQueCkgKyBpbm5lclJhZGl1cykgKyAnLDApJztcbiAgICB9O1xuXG4gICAgLy8gc2V0IHNwZWNpYWwgZ3JpZCBwYXRoIGZ1bmN0aW9uXG4gICAgdmFyIGdyaWRQYXRoRm4gPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5wYXRoQXJjKGF4LnIycChkLngpICsgaW5uZXJSYWRpdXMpO1xuICAgIH07XG5cbiAgICB2YXIgbmV3VGlja0xheW91dCA9IHN0clRpY2tMYXlvdXQocmFkaWFsTGF5b3V0KTtcbiAgICBpZihfdGhpcy5yYWRpYWxUaWNrTGF5b3V0ICE9PSBuZXdUaWNrTGF5b3V0KSB7XG4gICAgICAgIGxheWVyc1sncmFkaWFsLWF4aXMnXS5zZWxlY3RBbGwoJy54dGljaycpLnJlbW92ZSgpO1xuICAgICAgICBfdGhpcy5yYWRpYWxUaWNrTGF5b3V0ID0gbmV3VGlja0xheW91dDtcbiAgICB9XG5cbiAgICBpZihoYXNSb29tRm9ySXQpIHtcbiAgICAgICAgYXguc2V0U2NhbGUoKTtcblxuICAgICAgICB2YXIgdmFscyA9IEF4ZXMuY2FsY1RpY2tzKGF4KTtcbiAgICAgICAgdmFyIHZhbHNDbGlwcGVkID0gQXhlcy5jbGlwRW5kcyhheCwgdmFscyk7XG4gICAgICAgIHZhciB0aWNrU2lnbiA9IEF4ZXMuZ2V0VGlja1NpZ25zKGF4KVsyXTtcblxuICAgICAgICBBeGVzLmRyYXdUaWNrcyhnZCwgYXgsIHtcbiAgICAgICAgICAgIHZhbHM6IHZhbHMsXG4gICAgICAgICAgICBsYXllcjogbGF5ZXJzWydyYWRpYWwtYXhpcyddLFxuICAgICAgICAgICAgcGF0aDogQXhlcy5tYWtlVGlja1BhdGgoYXgsIDAsIHRpY2tTaWduKSxcbiAgICAgICAgICAgIHRyYW5zRm46IHRyYW5zRm4sXG4gICAgICAgICAgICBjcmlzcDogZmFsc2VcbiAgICAgICAgfSk7XG5cbiAgICAgICAgQXhlcy5kcmF3R3JpZChnZCwgYXgsIHtcbiAgICAgICAgICAgIHZhbHM6IHZhbHNDbGlwcGVkLFxuICAgICAgICAgICAgbGF5ZXI6IGxheWVyc1sncmFkaWFsLWdyaWQnXSxcbiAgICAgICAgICAgIHBhdGg6IGdyaWRQYXRoRm4sXG4gICAgICAgICAgICB0cmFuc0ZuOiBMaWIubm9vcCxcbiAgICAgICAgICAgIGNyaXNwOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBBeGVzLmRyYXdMYWJlbHMoZ2QsIGF4LCB7XG4gICAgICAgICAgICB2YWxzOiB2YWxzLFxuICAgICAgICAgICAgbGF5ZXI6IGxheWVyc1sncmFkaWFsLWF4aXMnXSxcbiAgICAgICAgICAgIHRyYW5zRm46IHRyYW5zRm4sXG4gICAgICAgICAgICBsYWJlbEZuczogQXhlcy5tYWtlTGFiZWxGbnMoYXgsIDApXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIHN0YXNoICdhY3R1YWwnIHJhZGlhbCBheGlzIGFuZ2xlIGZvciBkcmFnIGhhbmRsZXJzIChpbiBkZWdyZWVzKVxuICAgIHZhciBhbmdsZSA9IF90aGlzLnJhZGlhbEF4aXNBbmdsZSA9IF90aGlzLnZhbmdsZXMgP1xuICAgICAgICByYWQyZGVnKHNuYXBUb1ZlcnRleEFuZ2xlKGRlZzJyYWQocmFkaWFsTGF5b3V0LmFuZ2xlKSwgX3RoaXMudmFuZ2xlcykpIDpcbiAgICAgICAgcmFkaWFsTGF5b3V0LmFuZ2xlO1xuXG4gICAgdmFyIHRMYXllciA9IHN0clRyYW5zbGF0ZShjeCwgY3kpO1xuICAgIHZhciB0TGF5ZXIyID0gdExheWVyICsgc3RyUm90YXRlKC1hbmdsZSk7XG5cbiAgICB1cGRhdGVFbGVtZW50KFxuICAgICAgICBsYXllcnNbJ3JhZGlhbC1heGlzJ10sXG4gICAgICAgIGhhc1Jvb21Gb3JJdCAmJiAocmFkaWFsTGF5b3V0LnNob3d0aWNrbGFiZWxzIHx8IHJhZGlhbExheW91dC50aWNrcyksXG4gICAgICAgIHt0cmFuc2Zvcm06IHRMYXllcjJ9XG4gICAgKTtcblxuICAgIHVwZGF0ZUVsZW1lbnQoXG4gICAgICAgIGxheWVyc1sncmFkaWFsLWdyaWQnXSxcbiAgICAgICAgaGFzUm9vbUZvckl0ICYmIHJhZGlhbExheW91dC5zaG93Z3JpZCxcbiAgICAgICAge3RyYW5zZm9ybTogdExheWVyfVxuICAgICk7XG5cbiAgICB1cGRhdGVFbGVtZW50KFxuICAgICAgICBsYXllcnNbJ3JhZGlhbC1saW5lJ10uc2VsZWN0KCdsaW5lJyksXG4gICAgICAgIGhhc1Jvb21Gb3JJdCAmJiByYWRpYWxMYXlvdXQuc2hvd2xpbmUsXG4gICAgICAgIHtcbiAgICAgICAgICAgIHgxOiBpbm5lclJhZGl1cyxcbiAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgeDI6IHJhZGl1cyxcbiAgICAgICAgICAgIHkyOiAwLFxuICAgICAgICAgICAgdHJhbnNmb3JtOiB0TGF5ZXIyXG4gICAgICAgIH1cbiAgICApXG4gICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIHJhZGlhbExheW91dC5saW5ld2lkdGgpXG4gICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCByYWRpYWxMYXlvdXQubGluZWNvbG9yKTtcbn07XG5cbnByb3RvLnVwZGF0ZVJhZGlhbEF4aXNUaXRsZSA9IGZ1bmN0aW9uKGZ1bGxMYXlvdXQsIHBvbGFyTGF5b3V0LCBfYW5nbGUpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBnZCA9IF90aGlzLmdkO1xuICAgIHZhciByYWRpdXMgPSBfdGhpcy5yYWRpdXM7XG4gICAgdmFyIGN4ID0gX3RoaXMuY3g7XG4gICAgdmFyIGN5ID0gX3RoaXMuY3k7XG4gICAgdmFyIHJhZGlhbExheW91dCA9IHBvbGFyTGF5b3V0LnJhZGlhbGF4aXM7XG4gICAgdmFyIHRpdGxlQ2xhc3MgPSBfdGhpcy5pZCArICd0aXRsZSc7XG5cbiAgICB2YXIgYW5nbGUgPSBfYW5nbGUgIT09IHVuZGVmaW5lZCA/IF9hbmdsZSA6IF90aGlzLnJhZGlhbEF4aXNBbmdsZTtcbiAgICB2YXIgYW5nbGVSYWQgPSBkZWcycmFkKGFuZ2xlKTtcbiAgICB2YXIgY29zYSA9IE1hdGguY29zKGFuZ2xlUmFkKTtcbiAgICB2YXIgc2luYSA9IE1hdGguc2luKGFuZ2xlUmFkKTtcblxuICAgIHZhciBwYWQgPSAwO1xuXG4gICAgLy8gSGludDogbm8gbmVlZCB0byBjaGVjayBpZiB0aGVyZSBpcyBpbiBmYWN0IGEgdGl0bGUudGV4dCBzZXRcbiAgICAvLyBiZWNhdXNlIGlmIHBsb3QgaXMgZWRpdGFibGUsIHBhZCBuZWVkcyB0byBiZSBjYWxjdWxhdGVkIGFueXdheXNcbiAgICAvLyB0byBwcm9wZXJseSBzaG93IHBsYWNlaG9sZGVyIHRleHQgd2hlbiB0aXRsZSBpcyBlbXB0eS5cbiAgICBpZihyYWRpYWxMYXlvdXQudGl0bGUpIHtcbiAgICAgICAgdmFyIGggPSBEcmF3aW5nLmJCb3goX3RoaXMubGF5ZXJzWydyYWRpYWwtYXhpcyddLm5vZGUoKSkuaGVpZ2h0O1xuICAgICAgICB2YXIgdHMgPSByYWRpYWxMYXlvdXQudGl0bGUuZm9udC5zaXplO1xuICAgICAgICBwYWQgPSByYWRpYWxMYXlvdXQuc2lkZSA9PT0gJ2NvdW50ZXJjbG9ja3dpc2UnID9cbiAgICAgICAgICAgIC1oIC0gdHMgKiAwLjQgOlxuICAgICAgICAgICAgaCArIHRzICogMC44O1xuICAgIH1cblxuICAgIF90aGlzLmxheWVyc1sncmFkaWFsLWF4aXMtdGl0bGUnXSA9IFRpdGxlcy5kcmF3KGdkLCB0aXRsZUNsYXNzLCB7XG4gICAgICAgIHByb3BDb250YWluZXI6IHJhZGlhbExheW91dCxcbiAgICAgICAgcHJvcE5hbWU6IF90aGlzLmlkICsgJy5yYWRpYWxheGlzLnRpdGxlJyxcbiAgICAgICAgcGxhY2Vob2xkZXI6IF8oZ2QsICdDbGljayB0byBlbnRlciByYWRpYWwgYXhpcyB0aXRsZScpLFxuICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICB4OiBjeCArIChyYWRpdXMgLyAyKSAqIGNvc2EgKyBwYWQgKiBzaW5hLFxuICAgICAgICAgICAgeTogY3kgLSAocmFkaXVzIC8gMikgKiBzaW5hICsgcGFkICogY29zYSxcbiAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnXG4gICAgICAgIH0sXG4gICAgICAgIHRyYW5zZm9ybToge3JvdGF0ZTogLWFuZ2xlfVxuICAgIH0pO1xufTtcblxucHJvdG8udXBkYXRlQW5ndWxhckF4aXMgPSBmdW5jdGlvbihmdWxsTGF5b3V0LCBwb2xhckxheW91dCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGdkID0gX3RoaXMuZ2Q7XG4gICAgdmFyIGxheWVycyA9IF90aGlzLmxheWVycztcbiAgICB2YXIgcmFkaXVzID0gX3RoaXMucmFkaXVzO1xuICAgIHZhciBpbm5lclJhZGl1cyA9IF90aGlzLmlubmVyUmFkaXVzO1xuICAgIHZhciBjeCA9IF90aGlzLmN4O1xuICAgIHZhciBjeSA9IF90aGlzLmN5O1xuICAgIHZhciBhbmd1bGFyTGF5b3V0ID0gcG9sYXJMYXlvdXQuYW5ndWxhcmF4aXM7XG4gICAgdmFyIGF4ID0gX3RoaXMuYW5ndWxhckF4aXM7XG5cbiAgICBfdGhpcy5maWxsVmlld0luaXRpYWxLZXkoJ2FuZ3VsYXJheGlzLnJvdGF0aW9uJywgYW5ndWxhckxheW91dC5yb3RhdGlvbik7XG5cbiAgICBheC5zZXRHZW9tZXRyeSgpO1xuICAgIGF4LnNldFNjYWxlKCk7XG5cbiAgICAvLyAndCdpY2sgdG8gJ2cnZW9tZXRyaWMgcmFkaWFucyBpcyB1c2VkIGFsbCBvdmVyIHRoZSBwbGFjZSBoZXJlXG4gICAgdmFyIHQyZyA9IGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGF4LnQyZyhkLngpOyB9O1xuXG4gICAgLy8gcnVuIHJhZDJkZWcgb24gdGljazAgYW5kIGRpdGNrIGZvciB0aGV0YXVuaXQ6ICdyYWRpYW5zJyBheGVzXG4gICAgaWYoYXgudHlwZSA9PT0gJ2xpbmVhcicgJiYgYXgudGhldGF1bml0ID09PSAncmFkaWFucycpIHtcbiAgICAgICAgYXgudGljazAgPSByYWQyZGVnKGF4LnRpY2swKTtcbiAgICAgICAgYXguZHRpY2sgPSByYWQyZGVnKGF4LmR0aWNrKTtcbiAgICB9XG5cbiAgICB2YXIgX3RyYW5zRm4gPSBmdW5jdGlvbihyYWQpIHtcbiAgICAgICAgcmV0dXJuIHN0clRyYW5zbGF0ZShjeCArIHJhZGl1cyAqIE1hdGguY29zKHJhZCksIGN5IC0gcmFkaXVzICogTWF0aC5zaW4ocmFkKSk7XG4gICAgfTtcblxuICAgIHZhciB0cmFuc0ZuID0gZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gX3RyYW5zRm4odDJnKGQpKTtcbiAgICB9O1xuXG4gICAgdmFyIHRyYW5zRm4yID0gZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgcmFkID0gdDJnKGQpO1xuICAgICAgICByZXR1cm4gX3RyYW5zRm4ocmFkKSArIHN0clJvdGF0ZSgtcmFkMmRlZyhyYWQpKTtcbiAgICB9O1xuXG4gICAgdmFyIGdyaWRQYXRoRm4gPSBmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciByYWQgPSB0MmcoZCk7XG4gICAgICAgIHZhciBjb3NSYWQgPSBNYXRoLmNvcyhyYWQpO1xuICAgICAgICB2YXIgc2luUmFkID0gTWF0aC5zaW4ocmFkKTtcbiAgICAgICAgcmV0dXJuICdNJyArIFtjeCArIGlubmVyUmFkaXVzICogY29zUmFkLCBjeSAtIGlubmVyUmFkaXVzICogc2luUmFkXSArXG4gICAgICAgICAgICAnTCcgKyBbY3ggKyByYWRpdXMgKiBjb3NSYWQsIGN5IC0gcmFkaXVzICogc2luUmFkXTtcbiAgICB9O1xuXG4gICAgdmFyIG91dCA9IEF4ZXMubWFrZUxhYmVsRm5zKGF4LCAwKTtcbiAgICB2YXIgbGFiZWxTdGFuZG9mZiA9IG91dC5sYWJlbFN0YW5kb2ZmO1xuICAgIHZhciBsYWJlbEZucyA9IHt9O1xuXG4gICAgbGFiZWxGbnMueEZuID0gZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgcmFkID0gdDJnKGQpO1xuICAgICAgICByZXR1cm4gTWF0aC5jb3MocmFkKSAqIGxhYmVsU3RhbmRvZmY7XG4gICAgfTtcblxuICAgIGxhYmVsRm5zLnlGbiA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHJhZCA9IHQyZyhkKTtcbiAgICAgICAgdmFyIGZmID0gTWF0aC5zaW4ocmFkKSA+IDAgPyAwLjIgOiAxO1xuICAgICAgICByZXR1cm4gLU1hdGguc2luKHJhZCkgKiAobGFiZWxTdGFuZG9mZiArIGQuZm9udFNpemUgKiBmZikgK1xuICAgICAgICAgICAgTWF0aC5hYnMoTWF0aC5jb3MocmFkKSkgKiAoZC5mb250U2l6ZSAqIE1JRF9TSElGVCk7XG4gICAgfTtcblxuICAgIGxhYmVsRm5zLmFuY2hvckZuID0gZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgcmFkID0gdDJnKGQpO1xuICAgICAgICB2YXIgY29zID0gTWF0aC5jb3MocmFkKTtcbiAgICAgICAgcmV0dXJuIE1hdGguYWJzKGNvcykgPCAwLjEgP1xuICAgICAgICAgICAgJ21pZGRsZScgOlxuICAgICAgICAgICAgKGNvcyA+IDAgPyAnc3RhcnQnIDogJ2VuZCcpO1xuICAgIH07XG5cbiAgICBsYWJlbEZucy5oZWlnaHRGbiA9IGZ1bmN0aW9uKGQsIGEsIGgpIHtcbiAgICAgICAgdmFyIHJhZCA9IHQyZyhkKTtcbiAgICAgICAgcmV0dXJuIC0wLjUgKiAoMSArIE1hdGguc2luKHJhZCkpICogaDtcbiAgICB9O1xuXG4gICAgdmFyIG5ld1RpY2tMYXlvdXQgPSBzdHJUaWNrTGF5b3V0KGFuZ3VsYXJMYXlvdXQpO1xuICAgIGlmKF90aGlzLmFuZ3VsYXJUaWNrTGF5b3V0ICE9PSBuZXdUaWNrTGF5b3V0KSB7XG4gICAgICAgIGxheWVyc1snYW5ndWxhci1heGlzJ10uc2VsZWN0QWxsKCcuJyArIGF4Ll9pZCArICd0aWNrJykucmVtb3ZlKCk7XG4gICAgICAgIF90aGlzLmFuZ3VsYXJUaWNrTGF5b3V0ID0gbmV3VGlja0xheW91dDtcbiAgICB9XG5cbiAgICB2YXIgdmFscyA9IEF4ZXMuY2FsY1RpY2tzKGF4KTtcblxuICAgIC8vIGFuZ2xlIG9mIHBvbHlnb24gdmVydGljZXMgaW4gZ2VvbWV0cmljIHJhZGlhbnMgKG51bGwgbWVhbnMgY2lyY2xlcylcbiAgICAvLyBUT0RPIHdoYXQgdG8gZG8gd2hlbiBheC5wZXJpb2QgPiBheC5fY2F0ZWdvcmllcyA/P1xuICAgIHZhciB2YW5nbGVzO1xuICAgIGlmKHBvbGFyTGF5b3V0LmdyaWRzaGFwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgICAgdmFuZ2xlcyA9IHZhbHMubWFwKHQyZyk7XG5cbiAgICAgICAgLy8gYXguX3ZhbHMgc2hvdWxkIGJlIGFsd2F5cyBvcmRlcmVkLCBtYWtlIHRoZW1cbiAgICAgICAgLy8gYWx3YXlzIHR1cm4gY291bnRlcmNsb2Nrd2lzZSBmb3IgY29udmVuaWVuY2UgaGVyZVxuICAgICAgICBpZihMaWIuYW5nbGVEZWx0YSh2YW5nbGVzWzBdLCB2YW5nbGVzWzFdKSA8IDApIHtcbiAgICAgICAgICAgIHZhbmdsZXMgPSB2YW5nbGVzLnNsaWNlKCkucmV2ZXJzZSgpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFuZ2xlcyA9IG51bGw7XG4gICAgfVxuICAgIF90aGlzLnZhbmdsZXMgPSB2YW5nbGVzO1xuXG4gICAgLy8gVXNlIHRpY2t2YWwgZmlsdGVyIGZvciBjYXRlZ29yeSBheGVzIGluc3RlYWQgb2YgdHdlYWtpbmdcbiAgICAvLyB0aGUgcmFuZ2Ugdy5yLnQgc2VjdG9yLCBzbyB0aGF0IHNlY3RvcnMgdGhhdCBjcm9zcyAzNjAgY2FuXG4gICAgLy8gc2hvdyBhbGwgdGhlaXIgdGlja3MuXG4gICAgaWYoYXgudHlwZSA9PT0gJ2NhdGVnb3J5Jykge1xuICAgICAgICB2YWxzID0gdmFscy5maWx0ZXIoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIExpYi5pc0FuZ2xlSW5zaWRlU2VjdG9yKHQyZyhkKSwgX3RoaXMuc2VjdG9ySW5SYWQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZihheC52aXNpYmxlKSB7XG4gICAgICAgIHZhciB0aWNrU2lnbiA9IGF4LnRpY2tzID09PSAnaW5zaWRlJyA/IC0xIDogMTtcbiAgICAgICAgdmFyIHBhZCA9IChheC5saW5ld2lkdGggfHwgMSkgLyAyO1xuXG4gICAgICAgIEF4ZXMuZHJhd1RpY2tzKGdkLCBheCwge1xuICAgICAgICAgICAgdmFsczogdmFscyxcbiAgICAgICAgICAgIGxheWVyOiBsYXllcnNbJ2FuZ3VsYXItYXhpcyddLFxuICAgICAgICAgICAgcGF0aDogJ00nICsgKHRpY2tTaWduICogcGFkKSArICcsMGgnICsgKHRpY2tTaWduICogYXgudGlja2xlbiksXG4gICAgICAgICAgICB0cmFuc0ZuOiB0cmFuc0ZuMixcbiAgICAgICAgICAgIGNyaXNwOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBBeGVzLmRyYXdHcmlkKGdkLCBheCwge1xuICAgICAgICAgICAgdmFsczogdmFscyxcbiAgICAgICAgICAgIGxheWVyOiBsYXllcnNbJ2FuZ3VsYXItZ3JpZCddLFxuICAgICAgICAgICAgcGF0aDogZ3JpZFBhdGhGbixcbiAgICAgICAgICAgIHRyYW5zRm46IExpYi5ub29wLFxuICAgICAgICAgICAgY3Jpc3A6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIEF4ZXMuZHJhd0xhYmVscyhnZCwgYXgsIHtcbiAgICAgICAgICAgIHZhbHM6IHZhbHMsXG4gICAgICAgICAgICBsYXllcjogbGF5ZXJzWydhbmd1bGFyLWF4aXMnXSxcbiAgICAgICAgICAgIHJlcG9zaXRpb25PblVwZGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIHRyYW5zRm46IHRyYW5zRm4sXG4gICAgICAgICAgICBsYWJlbEZuczogbGFiZWxGbnNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETyBtYXliZSB0d28gYXJjcyBpcyBiZXR0ZXIgaGVyZT9cbiAgICAvLyBtYXliZSBzcGxpdCBzdHlsZSBhdHRyaWJ1dGVzIGJldHdlZW4gaW5uZXIgYW5kIG91dGVyIGFuZ3VsYXIgYXhlcz9cblxuICAgIHVwZGF0ZUVsZW1lbnQobGF5ZXJzWydhbmd1bGFyLWxpbmUnXS5zZWxlY3QoJ3BhdGgnKSwgYW5ndWxhckxheW91dC5zaG93bGluZSwge1xuICAgICAgICBkOiBfdGhpcy5wYXRoU3VicGxvdCgpLFxuICAgICAgICB0cmFuc2Zvcm06IHN0clRyYW5zbGF0ZShjeCwgY3kpXG4gICAgfSlcbiAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgYW5ndWxhckxheW91dC5saW5ld2lkdGgpXG4gICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCBhbmd1bGFyTGF5b3V0LmxpbmVjb2xvcik7XG59O1xuXG5wcm90by51cGRhdGVGeCA9IGZ1bmN0aW9uKGZ1bGxMYXlvdXQsIHBvbGFyTGF5b3V0KSB7XG4gICAgaWYoIXRoaXMuZ2QuX2NvbnRleHQuc3RhdGljUGxvdCkge1xuICAgICAgICB0aGlzLnVwZGF0ZUFuZ3VsYXJEcmFnKGZ1bGxMYXlvdXQpO1xuICAgICAgICB0aGlzLnVwZGF0ZVJhZGlhbERyYWcoZnVsbExheW91dCwgcG9sYXJMYXlvdXQsIDApO1xuICAgICAgICB0aGlzLnVwZGF0ZVJhZGlhbERyYWcoZnVsbExheW91dCwgcG9sYXJMYXlvdXQsIDEpO1xuICAgICAgICB0aGlzLnVwZGF0ZU1haW5EcmFnKGZ1bGxMYXlvdXQpO1xuICAgIH1cbn07XG5cbnByb3RvLnVwZGF0ZU1haW5EcmFnID0gZnVuY3Rpb24oZnVsbExheW91dCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGdkID0gX3RoaXMuZ2Q7XG4gICAgdmFyIGxheWVycyA9IF90aGlzLmxheWVycztcbiAgICB2YXIgem9vbWxheWVyID0gZnVsbExheW91dC5fem9vbWxheWVyO1xuICAgIHZhciBNSU5aT09NID0gY29uc3RhbnRzLk1JTlpPT007XG4gICAgdmFyIE9GRkVER0UgPSBjb25zdGFudHMuT0ZGRURHRTtcbiAgICB2YXIgcmFkaXVzID0gX3RoaXMucmFkaXVzO1xuICAgIHZhciBpbm5lclJhZGl1cyA9IF90aGlzLmlubmVyUmFkaXVzO1xuICAgIHZhciBjeCA9IF90aGlzLmN4O1xuICAgIHZhciBjeSA9IF90aGlzLmN5O1xuICAgIHZhciBjeHggPSBfdGhpcy5jeHg7XG4gICAgdmFyIGN5eSA9IF90aGlzLmN5eTtcbiAgICB2YXIgc2VjdG9ySW5SYWQgPSBfdGhpcy5zZWN0b3JJblJhZDtcbiAgICB2YXIgdmFuZ2xlcyA9IF90aGlzLnZhbmdsZXM7XG4gICAgdmFyIHJhZGlhbEF4aXMgPSBfdGhpcy5yYWRpYWxBeGlzO1xuICAgIHZhciBjbGFtcFRpbnkgPSBoZWxwZXJzLmNsYW1wVGlueTtcbiAgICB2YXIgZmluZFhZYXRMZW5ndGggPSBoZWxwZXJzLmZpbmRYWWF0TGVuZ3RoO1xuICAgIHZhciBmaW5kRW5jbG9zaW5nVmVydGV4QW5nbGVzID0gaGVscGVycy5maW5kRW5jbG9zaW5nVmVydGV4QW5nbGVzO1xuICAgIHZhciBjaHcgPSBjb25zdGFudHMuY29ybmVySGFsZldpZHRoO1xuICAgIHZhciBjaGwgPSBjb25zdGFudHMuY29ybmVyTGVuIC8gMjtcblxuICAgIHZhciBtYWluRHJhZyA9IGRyYWdCb3gubWFrZURyYWdnZXIobGF5ZXJzLCAncGF0aCcsICdtYWluZHJhZycsICdjcm9zc2hhaXInKTtcblxuICAgIGQzLnNlbGVjdChtYWluRHJhZylcbiAgICAgICAgLmF0dHIoJ2QnLCBfdGhpcy5wYXRoU3VicGxvdCgpKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgc3RyVHJhbnNsYXRlKGN4LCBjeSkpO1xuXG4gICAgdmFyIGRyYWdPcHRzID0ge1xuICAgICAgICBlbGVtZW50OiBtYWluRHJhZyxcbiAgICAgICAgZ2Q6IGdkLFxuICAgICAgICBzdWJwbG90OiBfdGhpcy5pZCxcbiAgICAgICAgcGxvdGluZm86IHtcbiAgICAgICAgICAgIGlkOiBfdGhpcy5pZCxcbiAgICAgICAgICAgIHhheGlzOiBfdGhpcy54YXhpcyxcbiAgICAgICAgICAgIHlheGlzOiBfdGhpcy55YXhpc1xuICAgICAgICB9LFxuICAgICAgICB4YXhlczogW190aGlzLnhheGlzXSxcbiAgICAgICAgeWF4ZXM6IFtfdGhpcy55YXhpc11cbiAgICB9O1xuXG4gICAgLy8gbW91c2UgcHggcG9zaXRpb24gYXQgZHJhZyBzdGFydCAoMCksIG1vdmUgKDEpXG4gICAgdmFyIHgwLCB5MDtcbiAgICAvLyByYWRpYWwgZGlzdGFuY2UgZnJvbSBjaXJjbGUgY2VudGVyIGF0IGRyYWcgc3RhcnQgKDApLCBtb3ZlICgxKVxuICAgIHZhciByMCwgcjE7XG4gICAgLy8gem9vbWJveCBwZXJzaXN0ZW50IHF1YW50aXRpZXNcbiAgICB2YXIgcGF0aDAsIGRpbW1lZCwgbHVtO1xuICAgIC8vIHpvb21ib3gsIGNvcm5lcnMgZWxlbWVudHNcbiAgICB2YXIgemIsIGNvcm5lcnM7XG5cbiAgICBmdW5jdGlvbiBub3JtKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCh4ICogeCArIHkgKiB5KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB4eTJyKHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIG5vcm0oeCAtIGN4eCwgeSAtIGN5eSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24geHkyYSh4LCB5KSB7XG4gICAgICAgIHJldHVybiBNYXRoLmF0YW4yKGN5eSAtIHksIHggLSBjeHgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJhMnh5KHIsIGEpIHtcbiAgICAgICAgcmV0dXJuIFtyICogTWF0aC5jb3MoYSksIHIgKiBNYXRoLnNpbigtYSldO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhdGhDb3JuZXIociwgYSkge1xuICAgICAgICBpZihyID09PSAwKSByZXR1cm4gX3RoaXMucGF0aFNlY3RvcigyICogY2h3KTtcblxuICAgICAgICB2YXIgZGEgPSBjaGwgLyByO1xuICAgICAgICB2YXIgYW0gPSBhIC0gZGE7XG4gICAgICAgIHZhciBhcCA9IGEgKyBkYTtcbiAgICAgICAgdmFyIHJiID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ociwgcmFkaXVzKSk7XG4gICAgICAgIHZhciBybSA9IHJiIC0gY2h3O1xuICAgICAgICB2YXIgcnAgPSByYiArIGNodztcblxuICAgICAgICByZXR1cm4gJ00nICsgcmEyeHkocm0sIGFtKSArXG4gICAgICAgICAgICAnQScgKyBbcm0sIHJtXSArICcgMCwwLDAgJyArIHJhMnh5KHJtLCBhcCkgK1xuICAgICAgICAgICAgJ0wnICsgcmEyeHkocnAsIGFwKSArXG4gICAgICAgICAgICAnQScgKyBbcnAsIHJwXSArICcgMCwwLDEgJyArIHJhMnh5KHJwLCBhbSkgK1xuICAgICAgICAgICAgJ1onO1xuICAgIH1cblxuICAgIC8vICh4LHkpIGlzIHRoZSBwdCBhdCBtaWRkbGUgb2YgdGhlIHZhMCA8LT4gdmExIGVkZ2VcbiAgICAvL1xuICAgIC8vIC4uLiB3ZSBjb3VsZCBldmVudHVhbGx5IGFkZCBhbm90aGVyIG1vZGUgZm9yIGN1cnNvclxuICAgIC8vIGFuZ2xlcyAnY2xvc2UgdG8nIGVub3VnaCB0byBhIHBhcnRpY3VsYXIgdmVydGV4LlxuICAgIGZ1bmN0aW9uIHBhdGhDb3JuZXJGb3JQb2x5Z29ucyhyLCB2YTAsIHZhMSkge1xuICAgICAgICBpZihyID09PSAwKSByZXR1cm4gX3RoaXMucGF0aFNlY3RvcigyICogY2h3KTtcblxuICAgICAgICB2YXIgeHkwID0gcmEyeHkociwgdmEwKTtcbiAgICAgICAgdmFyIHh5MSA9IHJhMnh5KHIsIHZhMSk7XG4gICAgICAgIHZhciB4ID0gY2xhbXBUaW55KCh4eTBbMF0gKyB4eTFbMF0pIC8gMik7XG4gICAgICAgIHZhciB5ID0gY2xhbXBUaW55KCh4eTBbMV0gKyB4eTFbMV0pIC8gMik7XG4gICAgICAgIHZhciBpbm5lclB0cywgb3V0ZXJQdHM7XG5cbiAgICAgICAgaWYoeCAmJiB5KSB7XG4gICAgICAgICAgICB2YXIgbSA9IHkgLyB4O1xuICAgICAgICAgICAgdmFyIG1wZXJwID0gLTEgLyBtO1xuICAgICAgICAgICAgdmFyIG1pZFB0cyA9IGZpbmRYWWF0TGVuZ3RoKGNodywgbSwgeCwgeSk7XG4gICAgICAgICAgICBpbm5lclB0cyA9IGZpbmRYWWF0TGVuZ3RoKGNobCwgbXBlcnAsIG1pZFB0c1swXVswXSwgbWlkUHRzWzBdWzFdKTtcbiAgICAgICAgICAgIG91dGVyUHRzID0gZmluZFhZYXRMZW5ndGgoY2hsLCBtcGVycCwgbWlkUHRzWzFdWzBdLCBtaWRQdHNbMV1bMV0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGR4LCBkeTtcbiAgICAgICAgICAgIGlmKHkpIHtcbiAgICAgICAgICAgICAgICAvLyBob3Jpem9udGFsIGhhbmRsZXNcbiAgICAgICAgICAgICAgICBkeCA9IGNobDtcbiAgICAgICAgICAgICAgICBkeSA9IGNodztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgaGFuZGxlc1xuICAgICAgICAgICAgICAgIGR4ID0gY2h3O1xuICAgICAgICAgICAgICAgIGR5ID0gY2hsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW5uZXJQdHMgPSBbW3ggLSBkeCwgeSAtIGR5XSwgW3ggKyBkeCwgeSAtIGR5XV07XG4gICAgICAgICAgICBvdXRlclB0cyA9IFtbeCAtIGR4LCB5ICsgZHldLCBbeCArIGR4LCB5ICsgZHldXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnTScgKyBpbm5lclB0cy5qb2luKCdMJykgK1xuICAgICAgICAgICAgJ0wnICsgb3V0ZXJQdHMucmV2ZXJzZSgpLmpvaW4oJ0wnKSArICdaJztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6b29tUHJlcCgpIHtcbiAgICAgICAgcjAgPSBudWxsO1xuICAgICAgICByMSA9IG51bGw7XG4gICAgICAgIHBhdGgwID0gX3RoaXMucGF0aFN1YnBsb3QoKTtcbiAgICAgICAgZGltbWVkID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIHBvbGFyTGF5b3V0Tm93ID0gZ2QuX2Z1bGxMYXlvdXRbX3RoaXMuaWRdO1xuICAgICAgICBsdW0gPSB0aW55Y29sb3IocG9sYXJMYXlvdXROb3cuYmdjb2xvcikuZ2V0THVtaW5hbmNlKCk7XG5cbiAgICAgICAgemIgPSBkcmFnQm94Lm1ha2Vab29tYm94KHpvb21sYXllciwgbHVtLCBjeCwgY3ksIHBhdGgwKTtcbiAgICAgICAgemIuYXR0cignZmlsbC1ydWxlJywgJ2V2ZW5vZGQnKTtcbiAgICAgICAgY29ybmVycyA9IGRyYWdCb3gubWFrZUNvcm5lcnMoem9vbWxheWVyLCBjeCwgY3kpO1xuICAgICAgICBjbGVhclNlbGVjdChnZCk7XG4gICAgfVxuXG4gICAgLy8gTi5CLiB0aGlzIHNldHMgc2NvcGVkICdyMCcgYW5kICdyMSdcbiAgICAvLyByZXR1cm4gdHJ1ZSBpZiAndmFsaWQnIHpvb20gZGlzdGFuY2UsIGZhbHNlIG90aGVyd2lzZVxuICAgIGZ1bmN0aW9uIGNsYW1wQW5kU2V0UjBSMShycjAsIHJyMSkge1xuICAgICAgICBycjEgPSBNYXRoLm1heChNYXRoLm1pbihycjEsIHJhZGl1cyksIGlubmVyUmFkaXVzKTtcblxuICAgICAgICAvLyBzdGFydGluZyBvciBlbmRpbmcgZHJhZyBuZWFyIGNlbnRlciAob3V0ZXIgZWRnZSksXG4gICAgICAgIC8vIGNsYW1wcyByYWRpYWwgZGlzdGFuY2UgYXQgb3JpZ2luIChhdCByPXJhZGl1cylcbiAgICAgICAgaWYocnIwIDwgT0ZGRURHRSkgcnIwID0gMDtcbiAgICAgICAgZWxzZSBpZigocmFkaXVzIC0gcnIwKSA8IE9GRkVER0UpIHJyMCA9IHJhZGl1cztcbiAgICAgICAgZWxzZSBpZihycjEgPCBPRkZFREdFKSBycjEgPSAwO1xuICAgICAgICBlbHNlIGlmKChyYWRpdXMgLSBycjEpIDwgT0ZGRURHRSkgcnIxID0gcmFkaXVzO1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSByMCA8IHIxLFxuICAgICAgICAvLyB0byBnZXQgY29ycmVjdCBmaWxsIHBhdHRlcm4gaW4gcGF0aDEgYmVsb3dcbiAgICAgICAgaWYoTWF0aC5hYnMocnIxIC0gcnIwKSA+IE1JTlpPT00pIHtcbiAgICAgICAgICAgIGlmKHJyMCA8IHJyMSkge1xuICAgICAgICAgICAgICAgIHIwID0gcnIwO1xuICAgICAgICAgICAgICAgIHIxID0gcnIxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByMCA9IHJyMTtcbiAgICAgICAgICAgICAgICByMSA9IHJyMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcjAgPSBudWxsO1xuICAgICAgICAgICAgcjEgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwbHlab29tTW92ZShwYXRoMSwgY3BhdGgpIHtcbiAgICAgICAgcGF0aDEgPSBwYXRoMSB8fCBwYXRoMDtcbiAgICAgICAgY3BhdGggPSBjcGF0aCB8fCAnTTAsMFonO1xuXG4gICAgICAgIHpiLmF0dHIoJ2QnLCBwYXRoMSk7XG4gICAgICAgIGNvcm5lcnMuYXR0cignZCcsIGNwYXRoKTtcbiAgICAgICAgZHJhZ0JveC50cmFuc2l0aW9uWm9vbWJveCh6YiwgY29ybmVycywgZGltbWVkLCBsdW0pO1xuICAgICAgICBkaW1tZWQgPSB0cnVlO1xuXG4gICAgICAgIHZhciB1cGRhdGVPYmogPSB7fTtcbiAgICAgICAgY29tcHV0ZVpvb21VcGRhdGVzKHVwZGF0ZU9iaik7XG4gICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9yZWxheW91dGluZycsIHVwZGF0ZU9iaik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gem9vbU1vdmUoZHgsIGR5KSB7XG4gICAgICAgIHZhciB4MSA9IHgwICsgZHg7XG4gICAgICAgIHZhciB5MSA9IHkwICsgZHk7XG4gICAgICAgIHZhciBycjAgPSB4eTJyKHgwLCB5MCk7XG4gICAgICAgIHZhciBycjEgPSBNYXRoLm1pbih4eTJyKHgxLCB5MSksIHJhZGl1cyk7XG4gICAgICAgIHZhciBhMCA9IHh5MmEoeDAsIHkwKTtcbiAgICAgICAgdmFyIHBhdGgxO1xuICAgICAgICB2YXIgY3BhdGg7XG5cbiAgICAgICAgaWYoY2xhbXBBbmRTZXRSMFIxKHJyMCwgcnIxKSkge1xuICAgICAgICAgICAgcGF0aDEgPSBwYXRoMCArIF90aGlzLnBhdGhTZWN0b3IocjEpO1xuICAgICAgICAgICAgaWYocjApIHBhdGgxICs9IF90aGlzLnBhdGhTZWN0b3IocjApO1xuICAgICAgICAgICAgLy8ga2VlcCAnc3RhcnRpbmcnIGFuZ2xlXG4gICAgICAgICAgICBjcGF0aCA9IHBhdGhDb3JuZXIocjAsIGEwKSArIHBhdGhDb3JuZXIocjEsIGEwKTtcbiAgICAgICAgfVxuICAgICAgICBhcHBseVpvb21Nb3ZlKHBhdGgxLCBjcGF0aCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFBvbHlnb25SYWRpdXMoeCwgeSwgdmEwLCB2YTEpIHtcbiAgICAgICAgdmFyIHh5ID0gaGVscGVycy5maW5kSW50ZXJzZWN0aW9uWFkodmEwLCB2YTEsIHZhMCwgW3ggLSBjeHgsIGN5eSAtIHldKTtcbiAgICAgICAgcmV0dXJuIG5vcm0oeHlbMF0sIHh5WzFdKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6b29tTW92ZUZvclBvbHlnb25zKGR4LCBkeSkge1xuICAgICAgICB2YXIgeDEgPSB4MCArIGR4O1xuICAgICAgICB2YXIgeTEgPSB5MCArIGR5O1xuICAgICAgICB2YXIgYTAgPSB4eTJhKHgwLCB5MCk7XG4gICAgICAgIHZhciBhMSA9IHh5MmEoeDEsIHkxKTtcbiAgICAgICAgdmFyIHZhbmdsZXMwID0gZmluZEVuY2xvc2luZ1ZlcnRleEFuZ2xlcyhhMCwgdmFuZ2xlcyk7XG4gICAgICAgIHZhciB2YW5nbGVzMSA9IGZpbmRFbmNsb3NpbmdWZXJ0ZXhBbmdsZXMoYTEsIHZhbmdsZXMpO1xuICAgICAgICB2YXIgcnIwID0gZmluZFBvbHlnb25SYWRpdXMoeDAsIHkwLCB2YW5nbGVzMFswXSwgdmFuZ2xlczBbMV0pO1xuICAgICAgICB2YXIgcnIxID0gTWF0aC5taW4oZmluZFBvbHlnb25SYWRpdXMoeDEsIHkxLCB2YW5nbGVzMVswXSwgdmFuZ2xlczFbMV0pLCByYWRpdXMpO1xuICAgICAgICB2YXIgcGF0aDE7XG4gICAgICAgIHZhciBjcGF0aDtcblxuICAgICAgICBpZihjbGFtcEFuZFNldFIwUjEocnIwLCBycjEpKSB7XG4gICAgICAgICAgICBwYXRoMSA9IHBhdGgwICsgX3RoaXMucGF0aFNlY3RvcihyMSk7XG4gICAgICAgICAgICBpZihyMCkgcGF0aDEgKz0gX3RoaXMucGF0aFNlY3RvcihyMCk7XG4gICAgICAgICAgICAvLyBrZWVwICdzdGFydGluZycgYW5nbGUgaGVyZSB0b29cbiAgICAgICAgICAgIGNwYXRoID0gW1xuICAgICAgICAgICAgICAgIHBhdGhDb3JuZXJGb3JQb2x5Z29ucyhyMCwgdmFuZ2xlczBbMF0sIHZhbmdsZXMwWzFdKSxcbiAgICAgICAgICAgICAgICBwYXRoQ29ybmVyRm9yUG9seWdvbnMocjEsIHZhbmdsZXMwWzBdLCB2YW5nbGVzMFsxXSlcbiAgICAgICAgICAgIF0uam9pbignICcpO1xuICAgICAgICB9XG4gICAgICAgIGFwcGx5Wm9vbU1vdmUocGF0aDEsIGNwYXRoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6b29tRG9uZSgpIHtcbiAgICAgICAgZHJhZ0JveC5yZW1vdmVab29tYm94KGdkKTtcblxuICAgICAgICBpZihyMCA9PT0gbnVsbCB8fCByMSA9PT0gbnVsbCkgcmV0dXJuO1xuICAgICAgICB2YXIgdXBkYXRlT2JqID0ge307XG4gICAgICAgIGNvbXB1dGVab29tVXBkYXRlcyh1cGRhdGVPYmopO1xuXG4gICAgICAgIGRyYWdCb3guc2hvd0RvdWJsZUNsaWNrTm90aWZpZXIoZ2QpO1xuXG4gICAgICAgIFJlZ2lzdHJ5LmNhbGwoJ19ndWlSZWxheW91dCcsIGdkLCB1cGRhdGVPYmopO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVab29tVXBkYXRlcyh1cGRhdGUpIHtcbiAgICAgICAgdmFyIHJsID0gcmFkaWFsQXhpcy5fcmw7XG4gICAgICAgIHZhciBtID0gKHJsWzFdIC0gcmxbMF0pIC8gKDEgLSBpbm5lclJhZGl1cyAvIHJhZGl1cykgLyByYWRpdXM7XG4gICAgICAgIHZhciBuZXdSbmcgPSBbXG4gICAgICAgICAgICBybFswXSArIChyMCAtIGlubmVyUmFkaXVzKSAqIG0sXG4gICAgICAgICAgICBybFswXSArIChyMSAtIGlubmVyUmFkaXVzKSAqIG1cbiAgICAgICAgXTtcbiAgICAgICAgdXBkYXRlW190aGlzLmlkICsgJy5yYWRpYWxheGlzLnJhbmdlJ10gPSBuZXdSbmc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gem9vbUNsaWNrKG51bUNsaWNrcywgZXZ0KSB7XG4gICAgICAgIHZhciBjbGlja01vZGUgPSBnZC5fZnVsbExheW91dC5jbGlja21vZGU7XG5cbiAgICAgICAgZHJhZ0JveC5yZW1vdmVab29tYm94KGdkKTtcblxuICAgICAgICAvLyBUT0RPIGRvdWJsZSBvbmNlIHZzIHR3aWNlIGxvZ2ljIChhdXRvcmFuZ2UgdnMgZml4ZWQgcmFuZ2UpXG4gICAgICAgIGlmKG51bUNsaWNrcyA9PT0gMikge1xuICAgICAgICAgICAgdmFyIHVwZGF0ZU9iaiA9IHt9O1xuICAgICAgICAgICAgZm9yKHZhciBrIGluIF90aGlzLnZpZXdJbml0aWFsKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlT2JqW190aGlzLmlkICsgJy4nICsga10gPSBfdGhpcy52aWV3SW5pdGlhbFtrXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZ2QuZW1pdCgncGxvdGx5X2RvdWJsZWNsaWNrJywgbnVsbCk7XG4gICAgICAgICAgICBSZWdpc3RyeS5jYWxsKCdfZ3VpUmVsYXlvdXQnLCBnZCwgdXBkYXRlT2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNsaWNrTW9kZS5pbmRleE9mKCdzZWxlY3QnKSA+IC0xICYmIG51bUNsaWNrcyA9PT0gMSkge1xuICAgICAgICAgICAgc2VsZWN0T25DbGljayhldnQsIGdkLCBbX3RoaXMueGF4aXNdLCBbX3RoaXMueWF4aXNdLCBfdGhpcy5pZCwgZHJhZ09wdHMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2xpY2tNb2RlLmluZGV4T2YoJ2V2ZW50JykgPiAtMSkge1xuICAgICAgICAgICAgRnguY2xpY2soZ2QsIGV2dCwgX3RoaXMuaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhZ09wdHMucHJlcEZuID0gZnVuY3Rpb24oZXZ0LCBzdGFydFgsIHN0YXJ0WSkge1xuICAgICAgICB2YXIgZHJhZ01vZGVOb3cgPSBnZC5fZnVsbExheW91dC5kcmFnbW9kZTtcblxuICAgICAgICB2YXIgYmJveCA9IG1haW5EcmFnLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB4MCA9IHN0YXJ0WCAtIGJib3gubGVmdDtcbiAgICAgICAgeTAgPSBzdGFydFkgLSBiYm94LnRvcDtcblxuICAgICAgICAvLyBuZWVkIHRvIG9mZnNldCB4L3kgYXMgYmJveCBjZW50ZXIgZG9lcyBub3RcbiAgICAgICAgLy8gbWF0Y2ggb3JpZ2luIGZvciBhc3ltbWV0cmljIHBvbHlnb25zXG4gICAgICAgIGlmKHZhbmdsZXMpIHtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSBoZWxwZXJzLmZpbmRQb2x5Z29uT2Zmc2V0KHJhZGl1cywgc2VjdG9ySW5SYWRbMF0sIHNlY3RvckluUmFkWzFdLCB2YW5nbGVzKTtcbiAgICAgICAgICAgIHgwICs9IGN4eCArIG9mZnNldFswXTtcbiAgICAgICAgICAgIHkwICs9IGN5eSArIG9mZnNldFsxXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaChkcmFnTW9kZU5vdykge1xuICAgICAgICAgICAgY2FzZSAnem9vbSc6XG4gICAgICAgICAgICAgICAgaWYodmFuZ2xlcykge1xuICAgICAgICAgICAgICAgICAgICBkcmFnT3B0cy5tb3ZlRm4gPSB6b29tTW92ZUZvclBvbHlnb25zO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdPcHRzLm1vdmVGbiA9IHpvb21Nb3ZlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkcmFnT3B0cy5jbGlja0ZuID0gem9vbUNsaWNrO1xuICAgICAgICAgICAgICAgIGRyYWdPcHRzLmRvbmVGbiA9IHpvb21Eb25lO1xuICAgICAgICAgICAgICAgIHpvb21QcmVwKGV2dCwgc3RhcnRYLCBzdGFydFkpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnc2VsZWN0JzpcbiAgICAgICAgICAgIGNhc2UgJ2xhc3NvJzpcbiAgICAgICAgICAgICAgICBwcmVwU2VsZWN0KGV2dCwgc3RhcnRYLCBzdGFydFksIGRyYWdPcHRzLCBkcmFnTW9kZU5vdyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgbWFpbkRyYWcub25tb3VzZW1vdmUgPSBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgRnguaG92ZXIoZ2QsIGV2dCwgX3RoaXMuaWQpO1xuICAgICAgICBnZC5fZnVsbExheW91dC5fbGFzdGhvdmVyID0gbWFpbkRyYWc7XG4gICAgICAgIGdkLl9mdWxsTGF5b3V0Ll9ob3ZlcnN1YnBsb3QgPSBfdGhpcy5pZDtcbiAgICB9O1xuXG4gICAgbWFpbkRyYWcub25tb3VzZW91dCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBpZihnZC5fZHJhZ2dpbmcpIHJldHVybjtcbiAgICAgICAgZHJhZ0VsZW1lbnQudW5ob3ZlcihnZCwgZXZ0KTtcbiAgICB9O1xuXG4gICAgZHJhZ0VsZW1lbnQuaW5pdChkcmFnT3B0cyk7XG59O1xuXG5wcm90by51cGRhdGVSYWRpYWxEcmFnID0gZnVuY3Rpb24oZnVsbExheW91dCwgcG9sYXJMYXlvdXQsIHJuZ0luZGV4KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2QgPSBfdGhpcy5nZDtcbiAgICB2YXIgbGF5ZXJzID0gX3RoaXMubGF5ZXJzO1xuICAgIHZhciByYWRpdXMgPSBfdGhpcy5yYWRpdXM7XG4gICAgdmFyIGlubmVyUmFkaXVzID0gX3RoaXMuaW5uZXJSYWRpdXM7XG4gICAgdmFyIGN4ID0gX3RoaXMuY3g7XG4gICAgdmFyIGN5ID0gX3RoaXMuY3k7XG4gICAgdmFyIHJhZGlhbEF4aXMgPSBfdGhpcy5yYWRpYWxBeGlzO1xuICAgIHZhciBibCA9IGNvbnN0YW50cy5yYWRpYWxEcmFnQm94U2l6ZTtcbiAgICB2YXIgYmwyID0gYmwgLyAyO1xuXG4gICAgaWYoIXJhZGlhbEF4aXMudmlzaWJsZSkgcmV0dXJuO1xuXG4gICAgdmFyIGFuZ2xlMCA9IGRlZzJyYWQoX3RoaXMucmFkaWFsQXhpc0FuZ2xlKTtcbiAgICB2YXIgcmwgPSByYWRpYWxBeGlzLl9ybDtcbiAgICB2YXIgcmwwID0gcmxbMF07XG4gICAgdmFyIHJsMSA9IHJsWzFdO1xuICAgIHZhciByYmFzZSA9IHJsW3JuZ0luZGV4XTtcbiAgICB2YXIgbSA9IDAuNzUgKiAocmxbMV0gLSBybFswXSkgLyAoMSAtIHBvbGFyTGF5b3V0LmhvbGUpIC8gcmFkaXVzO1xuXG4gICAgdmFyIHR4LCB0eSwgY2xhc3NOYW1lO1xuICAgIGlmKHJuZ0luZGV4KSB7XG4gICAgICAgIHR4ID0gY3ggKyAocmFkaXVzICsgYmwyKSAqIE1hdGguY29zKGFuZ2xlMCk7XG4gICAgICAgIHR5ID0gY3kgLSAocmFkaXVzICsgYmwyKSAqIE1hdGguc2luKGFuZ2xlMCk7XG4gICAgICAgIGNsYXNzTmFtZSA9ICdyYWRpYWxkcmFnJztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB0aGUgJ2lubmVyJyBib3ggY2FuIGdldCBjYWxsZWQ6XG4gICAgICAgIC8vIC0gd2hlbiBwb2xhci5ob2xlPjBcbiAgICAgICAgLy8gLSB3aGVuIHBvbGFyLnNlY3RvciBpc24ndCBhIGZ1bGwgY2lyY2xlXG4gICAgICAgIC8vIG90aGVyd2lzZSBpdCBpcyBoaWRkZW4gYmVoaW5kIHRoZSBtYWluIGRyYWcuXG4gICAgICAgIHR4ID0gY3ggKyAoaW5uZXJSYWRpdXMgLSBibDIpICogTWF0aC5jb3MoYW5nbGUwKTtcbiAgICAgICAgdHkgPSBjeSAtIChpbm5lclJhZGl1cyAtIGJsMikgKiBNYXRoLnNpbihhbmdsZTApO1xuICAgICAgICBjbGFzc05hbWUgPSAncmFkaWFsZHJhZy1pbm5lcic7XG4gICAgfVxuXG4gICAgdmFyIHJhZGlhbERyYWcgPSBkcmFnQm94Lm1ha2VSZWN0RHJhZ2dlcihsYXllcnMsIGNsYXNzTmFtZSwgJ2Nyb3NzaGFpcicsIC1ibDIsIC1ibDIsIGJsLCBibCk7XG4gICAgdmFyIGRyYWdPcHRzID0ge2VsZW1lbnQ6IHJhZGlhbERyYWcsIGdkOiBnZH07XG5cbiAgICB1cGRhdGVFbGVtZW50KGQzLnNlbGVjdChyYWRpYWxEcmFnKSwgcmFkaWFsQXhpcy52aXNpYmxlICYmIGlubmVyUmFkaXVzIDwgcmFkaXVzLCB7XG4gICAgICAgIHRyYW5zZm9ybTogc3RyVHJhbnNsYXRlKHR4LCB0eSlcbiAgICB9KTtcblxuICAgIC8vIG1vdmUgZnVuY3Rpb24gKGVpdGhlciByb3RhdGUgb3IgcmUtcmFuZ2UgZmxhdm9yKVxuICAgIHZhciBtb3ZlRm4yO1xuICAgIC8vIHJvdGF0ZSBhbmdsZSBvbiBkb25lXG4gICAgdmFyIGFuZ2xlMTtcbiAgICAvLyByZS1yYW5nZSByYW5nZVsxXSAob3IgcmFuZ2VbMF0pIG9uIGRvbmVcbiAgICB2YXIgcnByaW1lO1xuXG4gICAgZnVuY3Rpb24gbW92ZUZuKGR4LCBkeSkge1xuICAgICAgICBpZihtb3ZlRm4yKSB7XG4gICAgICAgICAgICBtb3ZlRm4yKGR4LCBkeSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZHZlYyA9IFtkeCwgLWR5XTtcbiAgICAgICAgICAgIHZhciBydmVjID0gW01hdGguY29zKGFuZ2xlMCksIE1hdGguc2luKGFuZ2xlMCldO1xuICAgICAgICAgICAgdmFyIGNvbXAgPSBNYXRoLmFicyhMaWIuZG90KGR2ZWMsIHJ2ZWMpIC8gTWF0aC5zcXJ0KExpYi5kb3QoZHZlYywgZHZlYykpKTtcblxuICAgICAgICAgICAgLy8gbW9zdGx5IHBlcnBlbmRpY3VsYXIgbW90aW9ucyByb3RhdGUsXG4gICAgICAgICAgICAvLyBtb3N0bHkgcGFyYWxsZWwgbW90aW9ucyByZS1yYW5nZVxuICAgICAgICAgICAgaWYoIWlzTmFOKGNvbXApKSB7XG4gICAgICAgICAgICAgICAgbW92ZUZuMiA9IGNvbXAgPCAwLjUgPyByb3RhdGVNb3ZlIDogcmVyYW5nZU1vdmU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdXBkYXRlID0ge307XG4gICAgICAgIGNvbXB1dGVSYWRpYWxBeGlzVXBkYXRlcyh1cGRhdGUpO1xuICAgICAgICBnZC5lbWl0KCdwbG90bHlfcmVsYXlvdXRpbmcnLCB1cGRhdGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbXB1dGVSYWRpYWxBeGlzVXBkYXRlcyh1cGRhdGUpIHtcbiAgICAgICAgaWYoYW5nbGUxICE9PSBudWxsKSB7XG4gICAgICAgICAgICB1cGRhdGVbX3RoaXMuaWQgKyAnLnJhZGlhbGF4aXMuYW5nbGUnXSA9IGFuZ2xlMTtcbiAgICAgICAgfSBlbHNlIGlmKHJwcmltZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgdXBkYXRlW190aGlzLmlkICsgJy5yYWRpYWxheGlzLnJhbmdlWycgKyBybmdJbmRleCArICddJ10gPSBycHJpbWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb25lRm4oKSB7XG4gICAgICAgIGlmKGFuZ2xlMSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgUmVnaXN0cnkuY2FsbCgnX2d1aVJlbGF5b3V0JywgZ2QsIF90aGlzLmlkICsgJy5yYWRpYWxheGlzLmFuZ2xlJywgYW5nbGUxKTtcbiAgICAgICAgfSBlbHNlIGlmKHJwcmltZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgUmVnaXN0cnkuY2FsbCgnX2d1aVJlbGF5b3V0JywgZ2QsIF90aGlzLmlkICsgJy5yYWRpYWxheGlzLnJhbmdlWycgKyBybmdJbmRleCArICddJywgcnByaW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJvdGF0ZU1vdmUoZHgsIGR5KSB7XG4gICAgICAgIC8vIGRpc2FibGUgZm9yIGlubmVyIGRyYWcgYm94ZXNcbiAgICAgICAgaWYocm5nSW5kZXggPT09IDApIHJldHVybjtcblxuICAgICAgICB2YXIgeDEgPSB0eCArIGR4O1xuICAgICAgICB2YXIgeTEgPSB0eSArIGR5O1xuXG4gICAgICAgIGFuZ2xlMSA9IE1hdGguYXRhbjIoY3kgLSB5MSwgeDEgLSBjeCk7XG4gICAgICAgIGlmKF90aGlzLnZhbmdsZXMpIGFuZ2xlMSA9IHNuYXBUb1ZlcnRleEFuZ2xlKGFuZ2xlMSwgX3RoaXMudmFuZ2xlcyk7XG4gICAgICAgIGFuZ2xlMSA9IHJhZDJkZWcoYW5nbGUxKTtcblxuICAgICAgICB2YXIgdHJhbnNmb3JtID0gc3RyVHJhbnNsYXRlKGN4LCBjeSkgKyBzdHJSb3RhdGUoLWFuZ2xlMSk7XG4gICAgICAgIGxheWVyc1sncmFkaWFsLWF4aXMnXS5hdHRyKCd0cmFuc2Zvcm0nLCB0cmFuc2Zvcm0pO1xuICAgICAgICBsYXllcnNbJ3JhZGlhbC1saW5lJ10uc2VsZWN0KCdsaW5lJykuYXR0cigndHJhbnNmb3JtJywgdHJhbnNmb3JtKTtcblxuICAgICAgICB2YXIgZnVsbExheW91dE5vdyA9IF90aGlzLmdkLl9mdWxsTGF5b3V0O1xuICAgICAgICB2YXIgcG9sYXJMYXlvdXROb3cgPSBmdWxsTGF5b3V0Tm93W190aGlzLmlkXTtcbiAgICAgICAgX3RoaXMudXBkYXRlUmFkaWFsQXhpc1RpdGxlKGZ1bGxMYXlvdXROb3csIHBvbGFyTGF5b3V0Tm93LCBhbmdsZTEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcmFuZ2VNb3ZlKGR4LCBkeSkge1xuICAgICAgICAvLyBwcm9qZWN0IChkeCwgZHkpIHVudG8gdW5pdCByYWRpYWwgYXhpcyB2ZWN0b3JcbiAgICAgICAgdmFyIGRyID0gTGliLmRvdChbZHgsIC1keV0sIFtNYXRoLmNvcyhhbmdsZTApLCBNYXRoLnNpbihhbmdsZTApXSk7XG4gICAgICAgIHJwcmltZSA9IHJiYXNlIC0gbSAqIGRyO1xuXG4gICAgICAgIC8vIG1ha2Ugc3VyZSBycHJpbWUgZG9lcyBub3QgY2hhbmdlIHRoZSByYW5nZVswXSAtPiByYW5nZVsxXSBzaWduXG4gICAgICAgIGlmKChtID4gMCkgIT09IChybmdJbmRleCA/IHJwcmltZSA+IHJsMCA6IHJwcmltZSA8IHJsMSkpIHtcbiAgICAgICAgICAgIHJwcmltZSA9IG51bGw7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZnVsbExheW91dE5vdyA9IGdkLl9mdWxsTGF5b3V0O1xuICAgICAgICB2YXIgcG9sYXJMYXlvdXROb3cgPSBmdWxsTGF5b3V0Tm93W190aGlzLmlkXTtcblxuICAgICAgICAvLyB1cGRhdGUgcmFkaWFsIHJhbmdlIC0+IHVwZGF0ZSBjMmcgLT4gdXBkYXRlIF9tLF9iXG4gICAgICAgIHJhZGlhbEF4aXMucmFuZ2Vbcm5nSW5kZXhdID0gcnByaW1lO1xuICAgICAgICByYWRpYWxBeGlzLl9ybFtybmdJbmRleF0gPSBycHJpbWU7XG4gICAgICAgIF90aGlzLnVwZGF0ZVJhZGlhbEF4aXMoZnVsbExheW91dE5vdywgcG9sYXJMYXlvdXROb3cpO1xuXG4gICAgICAgIF90aGlzLnhheGlzLnNldFJhbmdlKCk7XG4gICAgICAgIF90aGlzLnhheGlzLnNldFNjYWxlKCk7XG4gICAgICAgIF90aGlzLnlheGlzLnNldFJhbmdlKCk7XG4gICAgICAgIF90aGlzLnlheGlzLnNldFNjYWxlKCk7XG5cbiAgICAgICAgdmFyIGhhc1JlZ2wgPSBmYWxzZTtcblxuICAgICAgICBmb3IodmFyIHRyYWNlVHlwZSBpbiBfdGhpcy50cmFjZUhhc2gpIHtcbiAgICAgICAgICAgIHZhciBtb2R1bGVDYWxjRGF0YSA9IF90aGlzLnRyYWNlSGFzaFt0cmFjZVR5cGVdO1xuICAgICAgICAgICAgdmFyIG1vZHVsZUNhbGNEYXRhVmlzaWJsZSA9IExpYi5maWx0ZXJWaXNpYmxlKG1vZHVsZUNhbGNEYXRhKTtcbiAgICAgICAgICAgIHZhciBfbW9kdWxlID0gbW9kdWxlQ2FsY0RhdGFbMF1bMF0udHJhY2UuX21vZHVsZTtcbiAgICAgICAgICAgIF9tb2R1bGUucGxvdChnZCwgX3RoaXMsIG1vZHVsZUNhbGNEYXRhVmlzaWJsZSwgcG9sYXJMYXlvdXROb3cpO1xuICAgICAgICAgICAgaWYoUmVnaXN0cnkudHJhY2VJcyh0cmFjZVR5cGUsICdnbCcpICYmIG1vZHVsZUNhbGNEYXRhVmlzaWJsZS5sZW5ndGgpIGhhc1JlZ2wgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaGFzUmVnbCkge1xuICAgICAgICAgICAgY2xlYXJHbENhbnZhc2VzKGdkKTtcbiAgICAgICAgICAgIHJlZHJhd1JlZ2xUcmFjZXMoZ2QpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZHJhZ09wdHMucHJlcEZuID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIG1vdmVGbjIgPSBudWxsO1xuICAgICAgICBhbmdsZTEgPSBudWxsO1xuICAgICAgICBycHJpbWUgPSBudWxsO1xuXG4gICAgICAgIGRyYWdPcHRzLm1vdmVGbiA9IG1vdmVGbjtcbiAgICAgICAgZHJhZ09wdHMuZG9uZUZuID0gZG9uZUZuO1xuXG4gICAgICAgIGNsZWFyU2VsZWN0KGdkKTtcbiAgICB9O1xuXG4gICAgZHJhZ09wdHMuY2xhbXBGbiA9IGZ1bmN0aW9uKGR4LCBkeSkge1xuICAgICAgICBpZihNYXRoLnNxcnQoZHggKiBkeCArIGR5ICogZHkpIDwgY29uc3RhbnRzLk1JTkRSQUcpIHtcbiAgICAgICAgICAgIGR4ID0gMDtcbiAgICAgICAgICAgIGR5ID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2R4LCBkeV07XG4gICAgfTtcblxuICAgIGRyYWdFbGVtZW50LmluaXQoZHJhZ09wdHMpO1xufTtcblxucHJvdG8udXBkYXRlQW5ndWxhckRyYWcgPSBmdW5jdGlvbihmdWxsTGF5b3V0KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2QgPSBfdGhpcy5nZDtcbiAgICB2YXIgbGF5ZXJzID0gX3RoaXMubGF5ZXJzO1xuICAgIHZhciByYWRpdXMgPSBfdGhpcy5yYWRpdXM7XG4gICAgdmFyIGFuZ3VsYXJBeGlzID0gX3RoaXMuYW5ndWxhckF4aXM7XG4gICAgdmFyIGN4ID0gX3RoaXMuY3g7XG4gICAgdmFyIGN5ID0gX3RoaXMuY3k7XG4gICAgdmFyIGN4eCA9IF90aGlzLmN4eDtcbiAgICB2YXIgY3l5ID0gX3RoaXMuY3l5O1xuICAgIHZhciBkYnMgPSBjb25zdGFudHMuYW5ndWxhckRyYWdCb3hTaXplO1xuXG4gICAgdmFyIGFuZ3VsYXJEcmFnID0gZHJhZ0JveC5tYWtlRHJhZ2dlcihsYXllcnMsICdwYXRoJywgJ2FuZ3VsYXJkcmFnJywgJ21vdmUnKTtcbiAgICB2YXIgZHJhZ09wdHMgPSB7ZWxlbWVudDogYW5ndWxhckRyYWcsIGdkOiBnZH07XG5cbiAgICBkMy5zZWxlY3QoYW5ndWxhckRyYWcpXG4gICAgICAgIC5hdHRyKCdkJywgX3RoaXMucGF0aEFubnVsdXMocmFkaXVzLCByYWRpdXMgKyBkYnMpKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgc3RyVHJhbnNsYXRlKGN4LCBjeSkpXG4gICAgICAgIC5jYWxsKHNldEN1cnNvciwgJ21vdmUnKTtcblxuICAgIGZ1bmN0aW9uIHh5MmEoeCwgeSkge1xuICAgICAgICByZXR1cm4gTWF0aC5hdGFuMihjeXkgKyBkYnMgLSB5LCB4IC0gY3h4IC0gZGJzKTtcbiAgICB9XG5cbiAgICAvLyBzY2F0dGVyIHRyYWNlLCBwb2ludHMgYW5kIHRleHRwb2ludHMgc2VsZWN0aW9uc1xuICAgIHZhciBzY2F0dGVyVHJhY2VzID0gbGF5ZXJzLmZyb250cGxvdC5zZWxlY3QoJy5zY2F0dGVybGF5ZXInKS5zZWxlY3RBbGwoJy50cmFjZScpO1xuICAgIHZhciBzY2F0dGVyUG9pbnRzID0gc2NhdHRlclRyYWNlcy5zZWxlY3RBbGwoJy5wb2ludCcpO1xuICAgIHZhciBzY2F0dGVyVGV4dFBvaW50cyA9IHNjYXR0ZXJUcmFjZXMuc2VsZWN0QWxsKCcudGV4dHBvaW50Jyk7XG5cbiAgICAvLyBtb3VzZSBweCBwb3NpdGlvbiBhdCBkcmFnIHN0YXJ0ICgwKSwgbW92ZSAoMSlcbiAgICB2YXIgeDAsIHkwO1xuICAgIC8vIGFuZ3VsYXIgYXhpcyBhbmdsZSByb3RhdGlvbiBhdCBkcmFnIHN0YXJ0ICgwKSwgbW92ZSAoMSlcbiAgICB2YXIgcm90MCwgcm90MTtcbiAgICAvLyBpbmR1Y2VkIHJhZGlhbCBheGlzIHJvdGF0aW9uIChvbmx5IHVzZWQgb24gcG9seWdvbiBncmlkcylcbiAgICB2YXIgcnJvdDE7XG4gICAgLy8gYW5nbGUgYWJvdXQgY2lyY2xlIGNlbnRlciBhdCBkcmFnIHN0YXJ0XG4gICAgdmFyIGEwO1xuXG4gICAgZnVuY3Rpb24gbW92ZUZuKGR4LCBkeSkge1xuICAgICAgICB2YXIgZnVsbExheW91dE5vdyA9IF90aGlzLmdkLl9mdWxsTGF5b3V0O1xuICAgICAgICB2YXIgcG9sYXJMYXlvdXROb3cgPSBmdWxsTGF5b3V0Tm93W190aGlzLmlkXTtcblxuICAgICAgICB2YXIgeDEgPSB4MCArIGR4O1xuICAgICAgICB2YXIgeTEgPSB5MCArIGR5O1xuICAgICAgICB2YXIgYTEgPSB4eTJhKHgxLCB5MSk7XG4gICAgICAgIHZhciBkYSA9IHJhZDJkZWcoYTEgLSBhMCk7XG4gICAgICAgIHJvdDEgPSByb3QwICsgZGE7XG5cbiAgICAgICAgbGF5ZXJzLmZyb250cGxvdC5hdHRyKCd0cmFuc2Zvcm0nLFxuICAgICAgICAgICAgc3RyVHJhbnNsYXRlKF90aGlzLnhPZmZzZXQyLCBfdGhpcy55T2Zmc2V0MikgKyBzdHJSb3RhdGUoWy1kYSwgY3h4LCBjeXldKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmKF90aGlzLnZhbmdsZXMpIHtcbiAgICAgICAgICAgIHJyb3QxID0gX3RoaXMucmFkaWFsQXhpc0FuZ2xlICsgZGE7XG5cbiAgICAgICAgICAgIHZhciB0cmFucyA9IHN0clRyYW5zbGF0ZShjeCwgY3kpICsgc3RyUm90YXRlKC1kYSk7XG4gICAgICAgICAgICB2YXIgdHJhbnMyID0gc3RyVHJhbnNsYXRlKGN4LCBjeSkgKyBzdHJSb3RhdGUoLXJyb3QxKTtcblxuICAgICAgICAgICAgbGF5ZXJzLmJnLmF0dHIoJ3RyYW5zZm9ybScsIHRyYW5zKTtcbiAgICAgICAgICAgIGxheWVyc1sncmFkaWFsLWdyaWQnXS5hdHRyKCd0cmFuc2Zvcm0nLCB0cmFucyk7XG4gICAgICAgICAgICBsYXllcnNbJ3JhZGlhbC1heGlzJ10uYXR0cigndHJhbnNmb3JtJywgdHJhbnMyKTtcbiAgICAgICAgICAgIGxheWVyc1sncmFkaWFsLWxpbmUnXS5zZWxlY3QoJ2xpbmUnKS5hdHRyKCd0cmFuc2Zvcm0nLCB0cmFuczIpO1xuICAgICAgICAgICAgX3RoaXMudXBkYXRlUmFkaWFsQXhpc1RpdGxlKGZ1bGxMYXlvdXROb3csIHBvbGFyTGF5b3V0Tm93LCBycm90MSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBfdGhpcy5jbGlwUGF0aHMuZm9yVHJhY2VzLnNlbGVjdCgncGF0aCcpLmF0dHIoJ3RyYW5zZm9ybScsXG4gICAgICAgICAgICAgICAgc3RyVHJhbnNsYXRlKGN4eCwgY3l5KSArIHN0clJvdGF0ZShkYSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyAndW4tcm90YXRlJyBtYXJrZXIgYW5kIHRleHQgcG9pbnRzXG4gICAgICAgIHNjYXR0ZXJQb2ludHMuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBzZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICB2YXIgeHkgPSBEcmF3aW5nLmdldFRyYW5zbGF0ZShzZWwpO1xuICAgICAgICAgICAgc2VsLmF0dHIoJ3RyYW5zZm9ybScsIHN0clRyYW5zbGF0ZSh4eS54LCB4eS55KSArIHN0clJvdGF0ZShbZGFdKSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzY2F0dGVyVGV4dFBvaW50cy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIHZhciB0eCA9IHNlbC5zZWxlY3QoJ3RleHQnKTtcbiAgICAgICAgICAgIHZhciB4eSA9IERyYXdpbmcuZ2V0VHJhbnNsYXRlKHNlbCk7XG4gICAgICAgICAgICAvLyBOLkIgcm90YXRlIC0+IHRyYW5zbGF0ZSBvcmRlcmluZyBtYXR0ZXJzXG4gICAgICAgICAgICBzZWwuYXR0cigndHJhbnNmb3JtJywgc3RyUm90YXRlKFtkYSwgdHguYXR0cigneCcpLCB0eC5hdHRyKCd5JyldKSArIHN0clRyYW5zbGF0ZSh4eS54LCB4eS55KSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIHVwZGF0ZSByb3RhdGlvbiAtPiByYW5nZSAtPiBfbSxfYlxuICAgICAgICBhbmd1bGFyQXhpcy5yb3RhdGlvbiA9IExpYi5tb2RIYWxmKHJvdDEsIDM2MCk7XG4gICAgICAgIF90aGlzLnVwZGF0ZUFuZ3VsYXJBeGlzKGZ1bGxMYXlvdXROb3csIHBvbGFyTGF5b3V0Tm93KTtcblxuICAgICAgICBpZihfdGhpcy5faGFzQ2xpcE9uQXhpc0ZhbHNlICYmICFMaWIuaXNGdWxsQ2lyY2xlKF90aGlzLnNlY3RvckluUmFkKSkge1xuICAgICAgICAgICAgc2NhdHRlclRyYWNlcy5jYWxsKERyYXdpbmcuaGlkZU91dHNpZGVSYW5nZVBvaW50cywgX3RoaXMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGhhc1JlZ2wgPSBmYWxzZTtcblxuICAgICAgICBmb3IodmFyIHRyYWNlVHlwZSBpbiBfdGhpcy50cmFjZUhhc2gpIHtcbiAgICAgICAgICAgIGlmKFJlZ2lzdHJ5LnRyYWNlSXModHJhY2VUeXBlLCAnZ2wnKSkge1xuICAgICAgICAgICAgICAgIHZhciBtb2R1bGVDYWxjRGF0YSA9IF90aGlzLnRyYWNlSGFzaFt0cmFjZVR5cGVdO1xuICAgICAgICAgICAgICAgIHZhciBtb2R1bGVDYWxjRGF0YVZpc2libGUgPSBMaWIuZmlsdGVyVmlzaWJsZShtb2R1bGVDYWxjRGF0YSk7XG4gICAgICAgICAgICAgICAgdmFyIF9tb2R1bGUgPSBtb2R1bGVDYWxjRGF0YVswXVswXS50cmFjZS5fbW9kdWxlO1xuICAgICAgICAgICAgICAgIF9tb2R1bGUucGxvdChnZCwgX3RoaXMsIG1vZHVsZUNhbGNEYXRhVmlzaWJsZSwgcG9sYXJMYXlvdXROb3cpO1xuICAgICAgICAgICAgICAgIGlmKG1vZHVsZUNhbGNEYXRhVmlzaWJsZS5sZW5ndGgpIGhhc1JlZ2wgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoaGFzUmVnbCkge1xuICAgICAgICAgICAgY2xlYXJHbENhbnZhc2VzKGdkKTtcbiAgICAgICAgICAgIHJlZHJhd1JlZ2xUcmFjZXMoZ2QpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHVwZGF0ZSA9IHt9O1xuICAgICAgICBjb21wdXRlUm90YXRpb25VcGRhdGVzKHVwZGF0ZSk7XG4gICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9yZWxheW91dGluZycsIHVwZGF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29tcHV0ZVJvdGF0aW9uVXBkYXRlcyh1cGRhdGVPYmopIHtcbiAgICAgICAgdXBkYXRlT2JqW190aGlzLmlkICsgJy5hbmd1bGFyYXhpcy5yb3RhdGlvbiddID0gcm90MTtcblxuICAgICAgICBpZihfdGhpcy52YW5nbGVzKSB7XG4gICAgICAgICAgICB1cGRhdGVPYmpbX3RoaXMuaWQgKyAnLnJhZGlhbGF4aXMuYW5nbGUnXSA9IHJyb3QxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9uZUZuKCkge1xuICAgICAgICBzY2F0dGVyVGV4dFBvaW50cy5zZWxlY3QoJ3RleHQnKS5hdHRyKCd0cmFuc2Zvcm0nLCBudWxsKTtcblxuICAgICAgICB2YXIgdXBkYXRlT2JqID0ge307XG4gICAgICAgIGNvbXB1dGVSb3RhdGlvblVwZGF0ZXModXBkYXRlT2JqKTtcbiAgICAgICAgUmVnaXN0cnkuY2FsbCgnX2d1aVJlbGF5b3V0JywgZ2QsIHVwZGF0ZU9iaik7XG4gICAgfVxuXG4gICAgZHJhZ09wdHMucHJlcEZuID0gZnVuY3Rpb24oZXZ0LCBzdGFydFgsIHN0YXJ0WSkge1xuICAgICAgICB2YXIgcG9sYXJMYXlvdXROb3cgPSBmdWxsTGF5b3V0W190aGlzLmlkXTtcbiAgICAgICAgcm90MCA9IHBvbGFyTGF5b3V0Tm93LmFuZ3VsYXJheGlzLnJvdGF0aW9uO1xuXG4gICAgICAgIHZhciBiYm94ID0gYW5ndWxhckRyYWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgIHgwID0gc3RhcnRYIC0gYmJveC5sZWZ0O1xuICAgICAgICB5MCA9IHN0YXJ0WSAtIGJib3gudG9wO1xuICAgICAgICBhMCA9IHh5MmEoeDAsIHkwKTtcblxuICAgICAgICBkcmFnT3B0cy5tb3ZlRm4gPSBtb3ZlRm47XG4gICAgICAgIGRyYWdPcHRzLmRvbmVGbiA9IGRvbmVGbjtcblxuICAgICAgICBjbGVhclNlbGVjdChnZCk7XG4gICAgfTtcblxuICAgIC8vIEkgZG9uJ3Qgd2hhdCB3ZSBzaG91bGQgZG8gaW4gdGhpcyBjYXNlLCBza2lwIHdlIG5vd1xuICAgIGlmKF90aGlzLnZhbmdsZXMgJiYgIUxpYi5pc0Z1bGxDaXJjbGUoX3RoaXMuc2VjdG9ySW5SYWQpKSB7XG4gICAgICAgIGRyYWdPcHRzLnByZXBGbiA9IExpYi5ub29wO1xuICAgICAgICBzZXRDdXJzb3IoZDMuc2VsZWN0KGFuZ3VsYXJEcmFnKSwgbnVsbCk7XG4gICAgfVxuXG4gICAgZHJhZ0VsZW1lbnQuaW5pdChkcmFnT3B0cyk7XG59O1xuXG5wcm90by5pc1B0SW5zaWRlID0gZnVuY3Rpb24oZCkge1xuICAgIHZhciBzZWN0b3JJblJhZCA9IHRoaXMuc2VjdG9ySW5SYWQ7XG4gICAgdmFyIHZhbmdsZXMgPSB0aGlzLnZhbmdsZXM7XG4gICAgdmFyIHRoZXRhZyA9IHRoaXMuYW5ndWxhckF4aXMuYzJnKGQudGhldGEpO1xuICAgIHZhciByYWRpYWxBeGlzID0gdGhpcy5yYWRpYWxBeGlzO1xuICAgIHZhciByID0gcmFkaWFsQXhpcy5jMmwoZC5yKTtcbiAgICB2YXIgcmwgPSByYWRpYWxBeGlzLl9ybDtcblxuICAgIHZhciBmbiA9IHZhbmdsZXMgPyBoZWxwZXJzLmlzUHRJbnNpZGVQb2x5Z29uIDogTGliLmlzUHRJbnNpZGVTZWN0b3I7XG4gICAgcmV0dXJuIGZuKHIsIHRoZXRhZywgcmwsIHNlY3RvckluUmFkLCB2YW5nbGVzKTtcbn07XG5cbnByb3RvLnBhdGhBcmMgPSBmdW5jdGlvbihyKSB7XG4gICAgdmFyIHNlY3RvckluUmFkID0gdGhpcy5zZWN0b3JJblJhZDtcbiAgICB2YXIgdmFuZ2xlcyA9IHRoaXMudmFuZ2xlcztcbiAgICB2YXIgZm4gPSB2YW5nbGVzID8gaGVscGVycy5wYXRoUG9seWdvbiA6IExpYi5wYXRoQXJjO1xuICAgIHJldHVybiBmbihyLCBzZWN0b3JJblJhZFswXSwgc2VjdG9ySW5SYWRbMV0sIHZhbmdsZXMpO1xufTtcblxucHJvdG8ucGF0aFNlY3RvciA9IGZ1bmN0aW9uKHIpIHtcbiAgICB2YXIgc2VjdG9ySW5SYWQgPSB0aGlzLnNlY3RvckluUmFkO1xuICAgIHZhciB2YW5nbGVzID0gdGhpcy52YW5nbGVzO1xuICAgIHZhciBmbiA9IHZhbmdsZXMgPyBoZWxwZXJzLnBhdGhQb2x5Z29uIDogTGliLnBhdGhTZWN0b3I7XG4gICAgcmV0dXJuIGZuKHIsIHNlY3RvckluUmFkWzBdLCBzZWN0b3JJblJhZFsxXSwgdmFuZ2xlcyk7XG59O1xuXG5wcm90by5wYXRoQW5udWx1cyA9IGZ1bmN0aW9uKHIwLCByMSkge1xuICAgIHZhciBzZWN0b3JJblJhZCA9IHRoaXMuc2VjdG9ySW5SYWQ7XG4gICAgdmFyIHZhbmdsZXMgPSB0aGlzLnZhbmdsZXM7XG4gICAgdmFyIGZuID0gdmFuZ2xlcyA/IGhlbHBlcnMucGF0aFBvbHlnb25Bbm51bHVzIDogTGliLnBhdGhBbm51bHVzO1xuICAgIHJldHVybiBmbihyMCwgcjEsIHNlY3RvckluUmFkWzBdLCBzZWN0b3JJblJhZFsxXSwgdmFuZ2xlcyk7XG59O1xuXG5wcm90by5wYXRoU3VicGxvdCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciByMCA9IHRoaXMuaW5uZXJSYWRpdXM7XG4gICAgdmFyIHIxID0gdGhpcy5yYWRpdXM7XG4gICAgcmV0dXJuIHIwID8gdGhpcy5wYXRoQW5udWx1cyhyMCwgcjEpIDogdGhpcy5wYXRoU2VjdG9yKHIxKTtcbn07XG5cbnByb3RvLmZpbGxWaWV3SW5pdGlhbEtleSA9IGZ1bmN0aW9uKGtleSwgdmFsKSB7XG4gICAgaWYoIShrZXkgaW4gdGhpcy52aWV3SW5pdGlhbCkpIHtcbiAgICAgICAgdGhpcy52aWV3SW5pdGlhbFtrZXldID0gdmFsO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHN0clRpY2tMYXlvdXQoYXhMYXlvdXQpIHtcbiAgICB2YXIgb3V0ID0gYXhMYXlvdXQudGlja3MgKyBTdHJpbmcoYXhMYXlvdXQudGlja2xlbikgKyBTdHJpbmcoYXhMYXlvdXQuc2hvd3RpY2tsYWJlbHMpO1xuICAgIGlmKCdzaWRlJyBpbiBheExheW91dCkgb3V0ICs9IGF4TGF5b3V0LnNpZGU7XG4gICAgcmV0dXJuIG91dDtcbn1cblxuLy8gRmluZHMgdGhlIGJvdW5kaW5nIGJveCBvZiBhIGdpdmVuIGNpcmNsZSBzZWN0b3IsXG4vLyBpbnNwaXJlZCBieSBodHRwczovL21hdGguc3RhY2tleGNoYW5nZS5jb20vcS8xODUyNzAzXG4vL1xuLy8gYXNzdW1lczpcbi8vIC0gc2VjdG9yWzBdIDwgc2VjdG9yWzFdXG4vLyAtIGNvdW50ZXJjbG9ja3dpc2Ugcm90YXRpb25cbmZ1bmN0aW9uIGNvbXB1dGVTZWN0b3JCQm94KHNlY3Rvcikge1xuICAgIHZhciBzMCA9IHNlY3RvclswXTtcbiAgICB2YXIgczEgPSBzZWN0b3JbMV07XG4gICAgdmFyIGFyYyA9IHMxIC0gczA7XG4gICAgdmFyIGEwID0gbW9kKHMwLCAzNjApO1xuICAgIHZhciBhMSA9IGEwICsgYXJjO1xuXG4gICAgdmFyIGF4MCA9IE1hdGguY29zKGRlZzJyYWQoYTApKTtcbiAgICB2YXIgYXkwID0gTWF0aC5zaW4oZGVnMnJhZChhMCkpO1xuICAgIHZhciBheDEgPSBNYXRoLmNvcyhkZWcycmFkKGExKSk7XG4gICAgdmFyIGF5MSA9IE1hdGguc2luKGRlZzJyYWQoYTEpKTtcblxuICAgIHZhciB4MCwgeTAsIHgxLCB5MTtcblxuICAgIGlmKChhMCA8PSA5MCAmJiBhMSA+PSA5MCkgfHwgKGEwID4gOTAgJiYgYTEgPj0gNDUwKSkge1xuICAgICAgICB5MSA9IDE7XG4gICAgfSBlbHNlIGlmKGF5MCA8PSAwICYmIGF5MSA8PSAwKSB7XG4gICAgICAgIHkxID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgICB5MSA9IE1hdGgubWF4KGF5MCwgYXkxKTtcbiAgICB9XG5cbiAgICBpZigoYTAgPD0gMTgwICYmIGExID49IDE4MCkgfHwgKGEwID4gMTgwICYmIGExID49IDU0MCkpIHtcbiAgICAgICAgeDAgPSAtMTtcbiAgICB9IGVsc2UgaWYoYXgwID49IDAgJiYgYXgxID49IDApIHtcbiAgICAgICAgeDAgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHgwID0gTWF0aC5taW4oYXgwLCBheDEpO1xuICAgIH1cblxuICAgIGlmKChhMCA8PSAyNzAgJiYgYTEgPj0gMjcwKSB8fCAoYTAgPiAyNzAgJiYgYTEgPj0gNjMwKSkge1xuICAgICAgICB5MCA9IC0xO1xuICAgIH0gZWxzZSBpZihheTAgPj0gMCAmJiBheTEgPj0gMCkge1xuICAgICAgICB5MCA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgeTAgPSBNYXRoLm1pbihheTAsIGF5MSk7XG4gICAgfVxuXG4gICAgaWYoYTEgPj0gMzYwKSB7XG4gICAgICAgIHgxID0gMTtcbiAgICB9IGVsc2UgaWYoYXgwIDw9IDAgJiYgYXgxIDw9IDApIHtcbiAgICAgICAgeDEgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHgxID0gTWF0aC5tYXgoYXgwLCBheDEpO1xuICAgIH1cblxuICAgIHJldHVybiBbeDAsIHkwLCB4MSwgeTFdO1xufVxuXG5mdW5jdGlvbiBzbmFwVG9WZXJ0ZXhBbmdsZShhLCB2YW5nbGVzKSB7XG4gICAgdmFyIGZuID0gZnVuY3Rpb24odikgeyByZXR1cm4gTGliLmFuZ2xlRGlzdChhLCB2KTsgfTtcbiAgICB2YXIgaW5kID0gTGliLmZpbmRJbmRleE9mTWluKHZhbmdsZXMsIGZuKTtcbiAgICByZXR1cm4gdmFuZ2xlc1tpbmRdO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVFbGVtZW50KHNlbCwgc2hvd0F0dHIsIGF0dHJzKSB7XG4gICAgaWYoc2hvd0F0dHIpIHtcbiAgICAgICAgc2VsLmF0dHIoJ2Rpc3BsYXknLCBudWxsKTtcbiAgICAgICAgc2VsLmF0dHIoYXR0cnMpO1xuICAgIH0gZWxzZSBpZihzZWwpIHtcbiAgICAgICAgc2VsLmF0dHIoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsO1xufVxuXG5mdW5jdGlvbiBzdHJUcmFuc2xhdGUoeCwgeSkge1xuICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyB4ICsgJywnICsgeSArICcpJztcbn1cblxuZnVuY3Rpb24gc3RyUm90YXRlKGFuZ2xlKSB7XG4gICAgcmV0dXJuICdyb3RhdGUoJyArIGFuZ2xlICsgJyknO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgc2V0Q29udmVydENhcnRlc2lhbiA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9zZXRfY29udmVydCcpO1xuXG52YXIgZGVnMnJhZCA9IExpYi5kZWcycmFkO1xudmFyIHJhZDJkZWcgPSBMaWIucmFkMmRlZztcblxuLyoqXG4gKiBzZXRDb252ZXJ0IGZvciBwb2xhciBheGVzIVxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBheFxuICogICBheGlzIGluIHF1ZXN0aW9uICh3b3JrcyBmb3IgYm90aCByYWRpYWwgYW5kIGFuZ3VsYXIgYXhlcylcbiAqIEBwYXJhbSB7b2JqZWN0fSBwb2xhckxheW91dFxuICogICBmdWxsIHBvbGFyIGxheW91dCBvZiB0aGUgc3VicGxvdCBhc3NvY2lhdGVkIHdpdGggJ2F4J1xuICogQHBhcmFtIHtvYmplY3R9IGZ1bGxMYXlvdXRcbiAqICAgZnVsbCBsYXlvdXRcbiAqXG4gKiBIZXJlLCByZXVzZSBzb21lIG9mIHRoZSBDYXJ0ZXNpYW4gc2V0Q29udmVydCBsb2dpYyxcbiAqIGJ1dCB3ZSBtdXN0IGV4dGVuZCBzb21lIG9mIGl0LCBhcyBib3RoIHJhZGlhbCBhbmQgYW5ndWxhciBheGVzXG4gKiBkb24ndCBoYXZlIGRvbWFpbnMgYW5kIGFuZ3VsYXIgYXhlcyBkb24ndCBoYXZlIF90cnVlXyByYW5nZXMuXG4gKlxuICogTW9yZW92ZXIsIHdlIGludHJvZHVjZSB0d28gbmV3IGNvb3JkaW5hdGUgc3lzdGVtczpcbiAqIC0gJ2cnIGZvciBnZW9tZXRyaWMgY29vcmRpbmF0ZXMgYW5kXG4gKiAtICd0JyBmb3IgYW5ndWxhciB0aWNrc1xuICpcbiAqIFJhZGlhbCBheGlzIGNvb3JkaW5hdGUgc3lzdGVtczpcbiAqIC0gZCwgYyBhbmQgbDogc2FtZSBhcyBmb3IgY2FydGVzaWFuIGF4ZXNcbiAqIC0gZzogbGlrZSBjYWxjZGF0YSBidXQgdHJhbnNsYXRlZCBhYm91dCBgcmFkaWFsYXhpcy5yYW5nZVswXWAgJiBgcG9sYXIuaG9sZWBcbiAqXG4gKiBBbmd1bGFyIGF4aXMgY29vcmRpbmF0ZSBzeXN0ZW1zOlxuICogLSBkOiBkYXRhLCBpbiB3aGF0ZXZlciBmb3JtIGl0J3MgcHJvdmlkZWRcbiAqIC0gYzogY2FsY2RhdGEsIHR1cm5lZCBpbnRvIHJhZGlhbnMgKGZvciBsaW5lYXIgYXhlcylcbiAqICAgICAgb3IgY2F0ZWdvcnkgaW5kaWNlcyAoY2F0ZWdvcnkgYXhlcylcbiAqIC0gdDogdGljayBjYWxjZGF0YSwganVzdCBsaWtlICdjJyBidXQgaW4gZGVncmVlcyBmb3IgbGluZWFyIGF4ZXNcbiAqIC0gZzogZ2VvbWV0cmljIGNhbGNkYXRhLCByYWRpYW5zIGNvb3JkaW5hdGVzIHRoYXQgdGFrZSBpbnRvIGFjY291bnRcbiAqICAgICAgYXhpcyByb3RhdGlvbiBhbmQgZGlyZWN0aW9uXG4gKlxuICogVGhlbiwgJ2cnZW9tZXRyaWMgZGF0YSBpcyByZWFkeSB0byBiZSBjb252ZXJ0ZWQgdG8gKHgseSkuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2V0Q29udmVydChheCwgcG9sYXJMYXlvdXQsIGZ1bGxMYXlvdXQpIHtcbiAgICBzZXRDb252ZXJ0Q2FydGVzaWFuKGF4LCBmdWxsTGF5b3V0KTtcblxuICAgIHN3aXRjaChheC5faWQpIHtcbiAgICAgICAgY2FzZSAneCc6XG4gICAgICAgIGNhc2UgJ3JhZGlhbGF4aXMnOlxuICAgICAgICAgICAgc2V0Q29udmVydFJhZGlhbChheCwgcG9sYXJMYXlvdXQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2FuZ3VsYXJheGlzJzpcbiAgICAgICAgICAgIHNldENvbnZlcnRBbmd1bGFyKGF4LCBwb2xhckxheW91dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG59O1xuXG5mdW5jdGlvbiBzZXRDb252ZXJ0UmFkaWFsKGF4LCBwb2xhckxheW91dCkge1xuICAgIHZhciBzdWJwbG90ID0gcG9sYXJMYXlvdXQuX3N1YnBsb3Q7XG5cbiAgICBheC5zZXRHZW9tZXRyeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgcmwwID0gYXguX3JsWzBdO1xuICAgICAgICB2YXIgcmwxID0gYXguX3JsWzFdO1xuXG4gICAgICAgIHZhciBiID0gc3VicGxvdC5pbm5lclJhZGl1cztcbiAgICAgICAgdmFyIG0gPSAoc3VicGxvdC5yYWRpdXMgLSBiKSAvIChybDEgLSBybDApO1xuICAgICAgICB2YXIgYjIgPSBiIC8gbTtcblxuICAgICAgICB2YXIgckZpbHRlciA9IHJsMCA+IHJsMSA/XG4gICAgICAgICAgICBmdW5jdGlvbih2KSB7IHJldHVybiB2IDw9IDA7IH0gOlxuICAgICAgICAgICAgZnVuY3Rpb24odikgeyByZXR1cm4gdiA+PSAwOyB9O1xuXG4gICAgICAgIGF4LmMyZyA9IGZ1bmN0aW9uKHYpIHtcbiAgICAgICAgICAgIHZhciByID0gYXguYzJsKHYpIC0gcmwwO1xuICAgICAgICAgICAgcmV0dXJuIChyRmlsdGVyKHIpID8gciA6IDApICsgYjI7XG4gICAgICAgIH07XG5cbiAgICAgICAgYXguZzJjID0gZnVuY3Rpb24odikge1xuICAgICAgICAgICAgcmV0dXJuIGF4LmwyYyh2ICsgcmwwIC0gYjIpO1xuICAgICAgICB9O1xuXG4gICAgICAgIGF4LmcycCA9IGZ1bmN0aW9uKHYpIHsgcmV0dXJuIHYgKiBtOyB9O1xuICAgICAgICBheC5jMnAgPSBmdW5jdGlvbih2KSB7IHJldHVybiBheC5nMnAoYXguYzJnKHYpKTsgfTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiB0b1JhZGlhbnModiwgdW5pdCkge1xuICAgIHJldHVybiB1bml0ID09PSAnZGVncmVlcycgPyBkZWcycmFkKHYpIDogdjtcbn1cblxuZnVuY3Rpb24gZnJvbVJhZGlhbnModiwgdW5pdCkge1xuICAgIHJldHVybiB1bml0ID09PSAnZGVncmVlcycgPyByYWQyZGVnKHYpIDogdjtcbn1cblxuZnVuY3Rpb24gc2V0Q29udmVydEFuZ3VsYXIoYXgsIHBvbGFyTGF5b3V0KSB7XG4gICAgdmFyIGF4VHlwZSA9IGF4LnR5cGU7XG5cbiAgICBpZihheFR5cGUgPT09ICdsaW5lYXInKSB7XG4gICAgICAgIHZhciBfZDJjID0gYXguZDJjO1xuICAgICAgICB2YXIgX2MyZCA9IGF4LmMyZDtcblxuICAgICAgICBheC5kMmMgPSBmdW5jdGlvbih2LCB1bml0KSB7IHJldHVybiB0b1JhZGlhbnMoX2QyYyh2KSwgdW5pdCk7IH07XG4gICAgICAgIGF4LmMyZCA9IGZ1bmN0aW9uKHYsIHVuaXQpIHsgcmV0dXJuIF9jMmQoZnJvbVJhZGlhbnModiwgdW5pdCkpOyB9O1xuICAgIH1cblxuICAgIC8vIG92ZXJyaWRlIG1ha2VDYWxjZGF0YSB0byBoYW5kbGUgdGhldGF1bml0IGFuZCBzcGVjaWFsIHRoZXRhMC9kdGhldGEgbG9naWNcbiAgICBheC5tYWtlQ2FsY2RhdGEgPSBmdW5jdGlvbih0cmFjZSwgY29vcmQpIHtcbiAgICAgICAgdmFyIGFycmF5SW4gPSB0cmFjZVtjb29yZF07XG4gICAgICAgIHZhciBsZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgICAgICB2YXIgYXJyYXlPdXQsIGk7XG5cbiAgICAgICAgdmFyIF9kMmMgPSBmdW5jdGlvbih2KSB7IHJldHVybiBheC5kMmModiwgdHJhY2UudGhldGF1bml0KTsgfTtcblxuICAgICAgICBpZihhcnJheUluKSB7XG4gICAgICAgICAgICBpZihMaWIuaXNUeXBlZEFycmF5KGFycmF5SW4pICYmIGF4VHlwZSA9PT0gJ2xpbmVhcicpIHtcbiAgICAgICAgICAgICAgICBpZihsZW4gPT09IGFycmF5SW4ubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheUluO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihhcnJheUluLnN1YmFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhcnJheUluLnN1YmFycmF5KDAsIGxlbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBhcnJheU91dCA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhcnJheU91dFtpXSA9IF9kMmMoYXJyYXlJbltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgY29vcmQwID0gY29vcmQgKyAnMCc7XG4gICAgICAgICAgICB2YXIgZGNvb3JkID0gJ2QnICsgY29vcmQ7XG4gICAgICAgICAgICB2YXIgdjAgPSAoY29vcmQwIGluIHRyYWNlKSA/IF9kMmModHJhY2VbY29vcmQwXSkgOiAwO1xuICAgICAgICAgICAgdmFyIGR2ID0gKHRyYWNlW2Rjb29yZF0pID8gX2QyYyh0cmFjZVtkY29vcmRdKSA6IChheC5wZXJpb2QgfHwgMiAqIE1hdGguUEkpIC8gbGVuO1xuXG4gICAgICAgICAgICBhcnJheU91dCA9IG5ldyBBcnJheShsZW4pO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhcnJheU91dFtpXSA9IHYwICsgaSAqIGR2O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGFycmF5T3V0O1xuICAgIH07XG5cbiAgICAvLyBOLkIuIHdlIG1vY2sgdGhlIGF4aXMgJ3JhbmdlJyBoZXJlXG4gICAgYXguc2V0R2VvbWV0cnkgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHNlY3RvciA9IHBvbGFyTGF5b3V0LnNlY3RvcjtcbiAgICAgICAgdmFyIHNlY3RvckluUmFkID0gc2VjdG9yLm1hcChkZWcycmFkKTtcbiAgICAgICAgdmFyIGRpciA9IHtjbG9ja3dpc2U6IC0xLCBjb3VudGVyY2xvY2t3aXNlOiAxfVtheC5kaXJlY3Rpb25dO1xuICAgICAgICB2YXIgcm90ID0gZGVnMnJhZChheC5yb3RhdGlvbik7XG5cbiAgICAgICAgdmFyIHJhZDJnID0gZnVuY3Rpb24odikgeyByZXR1cm4gZGlyICogdiArIHJvdDsgfTtcbiAgICAgICAgdmFyIGcycmFkID0gZnVuY3Rpb24odikgeyByZXR1cm4gKHYgLSByb3QpIC8gZGlyOyB9O1xuXG4gICAgICAgIHZhciByYWQyYywgYzJyYWQ7XG4gICAgICAgIHZhciByYWQydCwgdDJyYWQ7XG5cbiAgICAgICAgc3dpdGNoKGF4VHlwZSkge1xuICAgICAgICAgICAgY2FzZSAnbGluZWFyJzpcbiAgICAgICAgICAgICAgICBjMnJhZCA9IHJhZDJjID0gTGliLmlkZW50aXR5O1xuICAgICAgICAgICAgICAgIHQycmFkID0gZGVnMnJhZDtcbiAgICAgICAgICAgICAgICByYWQydCA9IHJhZDJkZWc7XG5cbiAgICAgICAgICAgICAgICAvLyBTZXQgdGhlIGFuZ3VsYXIgcmFuZ2UgaW4gZGVncmVlcyB0byBtYWtlIGF1dG8tdGljayBjb21wdXRhdGlvbiBjbGVhbmVyLFxuICAgICAgICAgICAgICAgIC8vIGNoYW5naW5nIHJvdGF0aW9uL2RpcmVjdGlvbiBzaG91bGQgbm90IGFmZmVjdCB0aGUgYW5ndWxhciB0aWNrIHZhbHVlLlxuICAgICAgICAgICAgICAgIGF4LnJhbmdlID0gTGliLmlzRnVsbENpcmNsZShzZWN0b3JJblJhZCkgP1xuICAgICAgICAgICAgICAgICAgICBbc2VjdG9yWzBdLCBzZWN0b3JbMF0gKyAzNjBdIDpcbiAgICAgICAgICAgICAgICAgICAgc2VjdG9ySW5SYWQubWFwKGcycmFkKS5tYXAocmFkMmRlZyk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2NhdGVnb3J5JzpcbiAgICAgICAgICAgICAgICB2YXIgY2F0TGVuID0gYXguX2NhdGVnb3JpZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciBfcGVyaW9kID0gYXgucGVyaW9kID8gTWF0aC5tYXgoYXgucGVyaW9kLCBjYXRMZW4pIDogY2F0TGVuO1xuXG4gICAgICAgICAgICAgICAgLy8gZmFsbGJhY2sgaW4gY2FzZSBhbGwgY2F0ZWdvcmllcyBoYXZlIGJlZW4gZmlsdGVyZWQgb3V0XG4gICAgICAgICAgICAgICAgaWYoX3BlcmlvZCA9PT0gMCkgX3BlcmlvZCA9IDE7XG5cbiAgICAgICAgICAgICAgICBjMnJhZCA9IHQycmFkID0gZnVuY3Rpb24odikgeyByZXR1cm4gdiAqIDIgKiBNYXRoLlBJIC8gX3BlcmlvZDsgfTtcbiAgICAgICAgICAgICAgICByYWQyYyA9IHJhZDJ0ID0gZnVuY3Rpb24odikgeyByZXR1cm4gdiAqIF9wZXJpb2QgLyBNYXRoLlBJIC8gMjsgfTtcblxuICAgICAgICAgICAgICAgIGF4LnJhbmdlID0gWzAsIF9wZXJpb2RdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgYXguYzJnID0gZnVuY3Rpb24odikgeyByZXR1cm4gcmFkMmcoYzJyYWQodikpOyB9O1xuICAgICAgICBheC5nMmMgPSBmdW5jdGlvbih2KSB7IHJldHVybiByYWQyYyhnMnJhZCh2KSk7IH07XG5cbiAgICAgICAgYXgudDJnID0gZnVuY3Rpb24odikgeyByZXR1cm4gcmFkMmcodDJyYWQodikpOyB9O1xuICAgICAgICBheC5nMnQgPSBmdW5jdGlvbih2KSB7IHJldHVybiByYWQydChnMnJhZCh2KSk7IH07XG4gICAgfTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgdGV4dHRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykudGV4dHRlbXBsYXRlQXR0cnM7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xudmFyIHNjYXR0ZXJBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXR0cmlidXRlcycpO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcbnZhciBsaW5lQXR0cnMgPSBzY2F0dGVyQXR0cnMubGluZTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9kZTogc2NhdHRlckF0dHJzLm1vZGUsXG5cbiAgICByOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSByYWRpYWwgY29vcmRpbmF0ZXMnXG4gICAgfSxcblxuICAgIHRoZXRhOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBhbmd1bGFyIGNvb3JkaW5hdGVzJ1xuICAgIH0sXG5cbiAgICByMDoge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0FsdGVybmF0ZSB0byBgcmAuJyxcbiAgICAgICAgICAgICdCdWlsZHMgYSBsaW5lYXIgc3BhY2Ugb2YgciBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ1VzZSB3aXRoIGBkcmAnLFxuICAgICAgICAgICAgJ3doZXJlIGByMGAgaXMgdGhlIHN0YXJ0aW5nIGNvb3JkaW5hdGUgYW5kIGBkcmAgdGhlIHN0ZXAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgZHI6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSByIGNvb3JkaW5hdGUgc3RlcC4nXG4gICAgfSxcblxuICAgIHRoZXRhMDoge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0FsdGVybmF0ZSB0byBgdGhldGFgLicsXG4gICAgICAgICAgICAnQnVpbGRzIGEgbGluZWFyIHNwYWNlIG9mIHRoZXRhIGNvb3JkaW5hdGVzLicsXG4gICAgICAgICAgICAnVXNlIHdpdGggYGR0aGV0YWAnLFxuICAgICAgICAgICAgJ3doZXJlIGB0aGV0YTBgIGlzIHRoZSBzdGFydGluZyBjb29yZGluYXRlIGFuZCBgZHRoZXRhYCB0aGUgc3RlcC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBkdGhldGE6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB0aGV0YSBjb29yZGluYXRlIHN0ZXAuJyxcbiAgICAgICAgICAgICdCeSBkZWZhdWx0LCB0aGUgYGR0aGV0YWAgc3RlcCBlcXVhbHMgdGhlIHN1YnBsb3RcXCdzIHBlcmlvZCBkaXZpZGVkJyxcbiAgICAgICAgICAgICdieSB0aGUgbGVuZ3RoIG9mIHRoZSBgcmAgY29vcmRpbmF0ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICB0aGV0YXVuaXQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsncmFkaWFucycsICdkZWdyZWVzJywgJ2dyYWRpYW5zJ10sXG4gICAgICAgIGRmbHQ6ICdkZWdyZWVzJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHVuaXQgb2YgaW5wdXQgKnRoZXRhKiB2YWx1ZXMuJyxcbiAgICAgICAgICAgICdIYXMgYW4gZWZmZWN0IG9ubHkgd2hlbiBvbiAqbGluZWFyKiBhbmd1bGFyIGF4ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICB0ZXh0OiBzY2F0dGVyQXR0cnMudGV4dCxcbiAgICB0ZXh0dGVtcGxhdGU6IHRleHR0ZW1wbGF0ZUF0dHJzKHtlZGl0VHlwZTogJ3Bsb3QnfSwge1xuICAgICAgICBrZXlzOiBbJ3InLCAndGhldGEnLCAndGV4dCddXG4gICAgfSksXG4gICAgaG92ZXJ0ZXh0OiBzY2F0dGVyQXR0cnMuaG92ZXJ0ZXh0LFxuXG4gICAgbGluZToge1xuICAgICAgICBjb2xvcjogbGluZUF0dHJzLmNvbG9yLFxuICAgICAgICB3aWR0aDogbGluZUF0dHJzLndpZHRoLFxuICAgICAgICBkYXNoOiBsaW5lQXR0cnMuZGFzaCxcbiAgICAgICAgc2hhcGU6IGV4dGVuZEZsYXQoe30sIGxpbmVBdHRycy5zaGFwZSwge1xuICAgICAgICAgICAgdmFsdWVzOiBbJ2xpbmVhcicsICdzcGxpbmUnXVxuICAgICAgICB9KSxcbiAgICAgICAgc21vb3RoaW5nOiBsaW5lQXR0cnMuc21vb3RoaW5nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcbiAgICBjb25uZWN0Z2Fwczogc2NhdHRlckF0dHJzLmNvbm5lY3RnYXBzLFxuXG4gICAgbWFya2VyOiBzY2F0dGVyQXR0cnMubWFya2VyLFxuICAgIGNsaXBvbmF4aXM6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5jbGlwb25heGlzLCB7ZGZsdDogZmFsc2V9KSxcblxuICAgIHRleHRwb3NpdGlvbjogc2NhdHRlckF0dHJzLnRleHRwb3NpdGlvbixcbiAgICB0ZXh0Zm9udDogc2NhdHRlckF0dHJzLnRleHRmb250LFxuXG4gICAgZmlsbDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLmZpbGwsIHtcbiAgICAgICAgdmFsdWVzOiBbJ25vbmUnLCAndG9zZWxmJywgJ3RvbmV4dCddLFxuICAgICAgICBkZmx0OiAnbm9uZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYXJlYSB0byBmaWxsIHdpdGggYSBzb2xpZCBjb2xvci4nLFxuICAgICAgICAgICAgJ1VzZSB3aXRoIGBmaWxsY29sb3JgIGlmIG5vdCAqbm9uZSouJyxcbiAgICAgICAgICAgICdzY2F0dGVycG9sYXIgaGFzIGEgc3Vic2V0IG9mIHRoZSBvcHRpb25zIGF2YWlsYWJsZSB0byBzY2F0dGVyLicsXG4gICAgICAgICAgICAnKnRvc2VsZiogY29ubmVjdHMgdGhlIGVuZHBvaW50cyBvZiB0aGUgdHJhY2UgKG9yIGVhY2ggc2VnbWVudCcsXG4gICAgICAgICAgICAnb2YgdGhlIHRyYWNlIGlmIGl0IGhhcyBnYXBzKSBpbnRvIGEgY2xvc2VkIHNoYXBlLicsXG4gICAgICAgICAgICAnKnRvbmV4dCogZmlsbHMgdGhlIHNwYWNlIGJldHdlZW4gdHdvIHRyYWNlcyBpZiBvbmUgY29tcGxldGVseScsXG4gICAgICAgICAgICAnZW5jbG9zZXMgdGhlIG90aGVyIChlZyBjb25zZWN1dGl2ZSBjb250b3VyIGxpbmVzKSwgYW5kIGJlaGF2ZXMgbGlrZScsXG4gICAgICAgICAgICAnKnRvc2VsZiogaWYgdGhlcmUgaXMgbm8gdHJhY2UgYmVmb3JlIGl0LiAqdG9uZXh0KiBzaG91bGQgbm90IGJlJyxcbiAgICAgICAgICAgICd1c2VkIGlmIG9uZSB0cmFjZSBkb2VzIG5vdCBlbmNsb3NlIHRoZSBvdGhlci4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgZmlsbGNvbG9yOiBzY2F0dGVyQXR0cnMuZmlsbGNvbG9yLFxuXG4gICAgLy8gVE9ETyBlcnJvciBiYXJzXG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NTk3NDg3LzQwNjg0OTJcbiAgICAvLyBlcnJvcl94IChlcnJvcl9yLCBlcnJvcl90aGV0YSlcbiAgICAvLyBlcnJvcl95XG5cbiAgICBob3ZlcmluZm86IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5ob3ZlcmluZm8sIHtcbiAgICAgICAgZmxhZ3M6IFsncicsICd0aGV0YScsICd0ZXh0JywgJ25hbWUnXVxuICAgIH0pLFxuICAgIGhvdmVyb246IHNjYXR0ZXJBdHRycy5ob3Zlcm9uLFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycygpLFxuXG4gICAgc2VsZWN0ZWQ6IHNjYXR0ZXJBdHRycy5zZWxlY3RlZCxcbiAgICB1bnNlbGVjdGVkOiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZFxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgaGFuZGxlTWFya2VyRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL21hcmtlcl9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUxpbmVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbGluZV9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUxpbmVTaGFwZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9saW5lX3NoYXBlX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlVGV4dERlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci90ZXh0X2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlRmlsbENvbG9yRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2ZpbGxjb2xvcl9kZWZhdWx0cycpO1xudmFyIFBUU19MSU5FU09OTFkgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NvbnN0YW50cycpLlBUU19MSU5FU09OTFk7XG5cbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbmZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGVuID0gaGFuZGxlUlRoZXRhRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcbiAgICBpZighbGVuKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgndGhldGF1bml0Jyk7XG4gICAgY29lcmNlKCdtb2RlJywgbGVuIDwgUFRTX0xJTkVTT05MWSA/ICdsaW5lcyttYXJrZXJzJyA6ICdsaW5lcycpO1xuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgaWYodHJhY2VPdXQuaG92ZXJvbiAhPT0gJ2ZpbGxzJykgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICBpZihzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZU91dCkpIHtcbiAgICAgICAgaGFuZGxlTGluZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlKTtcbiAgICAgICAgaGFuZGxlTGluZVNoYXBlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSk7XG4gICAgICAgIGNvZXJjZSgnY29ubmVjdGdhcHMnKTtcbiAgICB9XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlT3V0KSkge1xuICAgICAgICBoYW5kbGVNYXJrZXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSwge2dyYWRpZW50OiB0cnVlfSk7XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzVGV4dCh0cmFjZU91dCkpIHtcbiAgICAgICAgY29lcmNlKCd0ZXh0dGVtcGxhdGUnKTtcbiAgICAgICAgaGFuZGxlVGV4dERlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIGRmbHRIb3Zlck9uID0gW107XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlT3V0KSB8fCBzdWJUeXBlcy5oYXNUZXh0KHRyYWNlT3V0KSkge1xuICAgICAgICBjb2VyY2UoJ2NsaXBvbmF4aXMnKTtcbiAgICAgICAgY29lcmNlKCdtYXJrZXIubWF4ZGlzcGxheWVkJyk7XG4gICAgICAgIGRmbHRIb3Zlck9uLnB1c2goJ3BvaW50cycpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnZmlsbCcpO1xuXG4gICAgaWYodHJhY2VPdXQuZmlsbCAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGhhbmRsZUZpbGxDb2xvckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGNvZXJjZSk7XG4gICAgICAgIGlmKCFzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZU91dCkpIGhhbmRsZUxpbmVTaGFwZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UpO1xuICAgIH1cblxuICAgIGlmKHRyYWNlT3V0LmZpbGwgPT09ICd0b25leHQnIHx8IHRyYWNlT3V0LmZpbGwgPT09ICd0b3NlbGYnKSB7XG4gICAgICAgIGRmbHRIb3Zlck9uLnB1c2goJ2ZpbGxzJyk7XG4gICAgfVxuICAgIGNvZXJjZSgnaG92ZXJvbicsIGRmbHRIb3Zlck9uLmpvaW4oJysnKSB8fCAncG9pbnRzJyk7XG5cbiAgICBMaWIuY29lcmNlU2VsZWN0aW9uTWFya2VyT3BhY2l0eSh0cmFjZU91dCwgY29lcmNlKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlUlRoZXRhRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKSB7XG4gICAgdmFyIHIgPSBjb2VyY2UoJ3InKTtcbiAgICB2YXIgdGhldGEgPSBjb2VyY2UoJ3RoZXRhJyk7XG4gICAgdmFyIGxlbjtcblxuICAgIGlmKHIpIHtcbiAgICAgICAgaWYodGhldGEpIHtcbiAgICAgICAgICAgIGxlbiA9IE1hdGgubWluKHIubGVuZ3RoLCB0aGV0YS5sZW5ndGgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGVuID0gci5sZW5ndGg7XG4gICAgICAgICAgICBjb2VyY2UoJ3RoZXRhMCcpO1xuICAgICAgICAgICAgY29lcmNlKCdkdGhldGEnKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCF0aGV0YSkgcmV0dXJuIDA7XG4gICAgICAgIGxlbiA9IHRyYWNlT3V0LnRoZXRhLmxlbmd0aDtcbiAgICAgICAgY29lcmNlKCdyMCcpO1xuICAgICAgICBjb2VyY2UoJ2RyJyk7XG4gICAgfVxuXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IGxlbjtcbiAgICByZXR1cm4gbGVuO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBoYW5kbGVSVGhldGFEZWZhdWx0czogaGFuZGxlUlRoZXRhRGVmYXVsdHMsXG4gICAgc3VwcGx5RGVmYXVsdHM6IHN1cHBseURlZmF1bHRzXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ybWF0TGFiZWxzKGNkaSwgdHJhY2UsIGZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgbGFiZWxzID0ge307XG5cbiAgICB2YXIgc3VicGxvdCA9IGZ1bGxMYXlvdXRbdHJhY2Uuc3VicGxvdF0uX3N1YnBsb3Q7XG4gICAgdmFyIHJhZGlhbEF4aXM7XG4gICAgdmFyIGFuZ3VsYXJBeGlzO1xuXG4gICAgLy8gZm9yIHNjYXR0ZXJwb2xhcmdsIHRleHR0ZW1wbGF0ZSwgX3N1YnBsb3QgaXMgTk9UIGRlZmluZWQsIHRoaXMgdGFrZXMgcGFydCBkdXJpbmcgdGhlIGNvbnZlcnQgc3RlcFxuICAgIC8vIFRPRE8gd2Ugc2hvdWxkIGNvbnNpZGVyIG1vdmluZyB0aGUgdGV4dHRlbXBsYXRlIGZvcm1hdHRpbmcgbG9naWMgdG8gdGhlIHBsb3Qgc3RlcFxuICAgIGlmKCFzdWJwbG90KSB7XG4gICAgICAgIHN1YnBsb3QgPSBmdWxsTGF5b3V0W3RyYWNlLnN1YnBsb3RdO1xuICAgICAgICByYWRpYWxBeGlzID0gc3VicGxvdC5yYWRpYWxheGlzO1xuICAgICAgICBhbmd1bGFyQXhpcyA9IHN1YnBsb3QuYW5ndWxhcmF4aXM7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmFkaWFsQXhpcyA9IHN1YnBsb3QucmFkaWFsQXhpcztcbiAgICAgICAgYW5ndWxhckF4aXMgPSBzdWJwbG90LmFuZ3VsYXJBeGlzO1xuICAgIH1cblxuICAgIHZhciByVmFsID0gcmFkaWFsQXhpcy5jMmwoY2RpLnIpO1xuICAgIGxhYmVscy5yTGFiZWwgPSBBeGVzLnRpY2tUZXh0KHJhZGlhbEF4aXMsIHJWYWwsIHRydWUpLnRleHQ7XG5cbiAgICAvLyBOLkIgaGVyZSB0aGUgwrAgc2lnbiBpcyBwYXJ0IG9mIHRoZSBmb3JtYXR0ZWQgdmFsdWUgZm9yIHRoZXRhdW5pdDonZGVncmVlcydcbiAgICB2YXIgdGhldGFWYWwgPSBhbmd1bGFyQXhpcy50aGV0YXVuaXQgPT09ICdkZWdyZWVzJyA/IExpYi5yYWQyZGVnKGNkaS50aGV0YSkgOiBjZGkudGhldGE7XG4gICAgbGFiZWxzLnRoZXRhTGFiZWwgPSBBeGVzLnRpY2tUZXh0KGFuZ3VsYXJBeGlzLCB0aGV0YVZhbCwgdHJ1ZSkudGV4dDtcblxuICAgIHJldHVybiBsYWJlbHM7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NhdHRlckhvdmVyID0gcmVxdWlyZSgnLi4vc2NhdHRlci9ob3ZlcicpO1xuXG5mdW5jdGlvbiBob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwsIGhvdmVybW9kZSkge1xuICAgIHZhciBzY2F0dGVyUG9pbnREYXRhID0gc2NhdHRlckhvdmVyKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlKTtcbiAgICBpZighc2NhdHRlclBvaW50RGF0YSB8fCBzY2F0dGVyUG9pbnREYXRhWzBdLmluZGV4ID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgdmFyIG5ld1BvaW50RGF0YSA9IHNjYXR0ZXJQb2ludERhdGFbMF07XG5cbiAgICAvLyBob3ZlcmluZyBvbiBmaWxsIGNhc2VcbiAgICBpZihuZXdQb2ludERhdGEuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gc2NhdHRlclBvaW50RGF0YTtcbiAgICB9XG5cbiAgICB2YXIgc3VicGxvdCA9IHBvaW50RGF0YS5zdWJwbG90O1xuICAgIHZhciBjZGkgPSBuZXdQb2ludERhdGEuY2RbbmV3UG9pbnREYXRhLmluZGV4XTtcbiAgICB2YXIgdHJhY2UgPSBuZXdQb2ludERhdGEudHJhY2U7XG5cbiAgICBpZighc3VicGxvdC5pc1B0SW5zaWRlKGNkaSkpIHJldHVybjtcblxuICAgIG5ld1BvaW50RGF0YS54TGFiZWxWYWwgPSB1bmRlZmluZWQ7XG4gICAgbmV3UG9pbnREYXRhLnlMYWJlbFZhbCA9IHVuZGVmaW5lZDtcbiAgICBtYWtlSG92ZXJQb2ludFRleHQoY2RpLCB0cmFjZSwgc3VicGxvdCwgbmV3UG9pbnREYXRhKTtcbiAgICBuZXdQb2ludERhdGEuaG92ZXJ0ZW1wbGF0ZSA9IHRyYWNlLmhvdmVydGVtcGxhdGU7XG4gICAgcmV0dXJuIHNjYXR0ZXJQb2ludERhdGE7XG59XG5cbmZ1bmN0aW9uIG1ha2VIb3ZlclBvaW50VGV4dChjZGksIHRyYWNlLCBzdWJwbG90LCBwb2ludERhdGEpIHtcbiAgICB2YXIgcmFkaWFsQXhpcyA9IHN1YnBsb3QucmFkaWFsQXhpcztcbiAgICB2YXIgYW5ndWxhckF4aXMgPSBzdWJwbG90LmFuZ3VsYXJBeGlzO1xuICAgIHJhZGlhbEF4aXMuX2hvdmVydGl0bGUgPSAncic7XG4gICAgYW5ndWxhckF4aXMuX2hvdmVydGl0bGUgPSAnzrgnO1xuXG4gICAgdmFyIGZ1bGxMYXlvdXQgPSB7fTtcbiAgICBmdWxsTGF5b3V0W3RyYWNlLnN1YnBsb3RdID0ge19zdWJwbG90OiBzdWJwbG90fTtcbiAgICB2YXIgbGFiZWxzID0gdHJhY2UuX21vZHVsZS5mb3JtYXRMYWJlbHMoY2RpLCB0cmFjZSwgZnVsbExheW91dCk7XG4gICAgcG9pbnREYXRhLnJMYWJlbCA9IGxhYmVscy5yTGFiZWw7XG4gICAgcG9pbnREYXRhLnRoZXRhTGFiZWwgPSBsYWJlbHMudGhldGFMYWJlbDtcblxuICAgIHZhciBob3ZlcmluZm8gPSBjZGkuaGkgfHwgdHJhY2UuaG92ZXJpbmZvO1xuICAgIHZhciB0ZXh0ID0gW107XG4gICAgZnVuY3Rpb24gdGV4dFBhcnQoYXgsIHZhbCkge1xuICAgICAgICB0ZXh0LnB1c2goYXguX2hvdmVydGl0bGUgKyAnOiAnICsgdmFsKTtcbiAgICB9XG5cbiAgICBpZighdHJhY2UuaG92ZXJ0ZW1wbGF0ZSkge1xuICAgICAgICB2YXIgcGFydHMgPSBob3ZlcmluZm8uc3BsaXQoJysnKTtcblxuICAgICAgICBpZihwYXJ0cy5pbmRleE9mKCdhbGwnKSAhPT0gLTEpIHBhcnRzID0gWydyJywgJ3RoZXRhJywgJ3RleHQnXTtcbiAgICAgICAgaWYocGFydHMuaW5kZXhPZigncicpICE9PSAtMSkgdGV4dFBhcnQocmFkaWFsQXhpcywgcG9pbnREYXRhLnJMYWJlbCk7XG4gICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ3RoZXRhJykgIT09IC0xKSB0ZXh0UGFydChhbmd1bGFyQXhpcywgcG9pbnREYXRhLnRoZXRhTGFiZWwpO1xuXG4gICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ3RleHQnKSAhPT0gLTEgJiYgcG9pbnREYXRhLnRleHQpIHtcbiAgICAgICAgICAgIHRleHQucHVzaChwb2ludERhdGEudGV4dCk7XG4gICAgICAgICAgICBkZWxldGUgcG9pbnREYXRhLnRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICBwb2ludERhdGEuZXh0cmFUZXh0ID0gdGV4dC5qb2luKCc8YnI+Jyk7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBob3ZlclBvaW50czogaG92ZXJQb2ludHMsXG4gICAgbWFrZUhvdmVyUG9pbnRUZXh0OiBtYWtlSG92ZXJQb2ludFRleHRcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9