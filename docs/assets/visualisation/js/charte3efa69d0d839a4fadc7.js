(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_index-gl3d_js-node_modules_plotly_js_src_traces_heatmap_fi-36f38a"],{

/***/ "./node_modules/plotly.js/lib/index-gl3d.js":
/*!**************************************************!*\
  !*** ./node_modules/plotly.js/lib/index-gl3d.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Plotly = __webpack_require__(/*! ./core */ "./node_modules/plotly.js/lib/core.js");

Plotly.register([
    __webpack_require__(/*! ./scatter3d */ "./node_modules/plotly.js/lib/scatter3d.js"),
    __webpack_require__(/*! ./surface */ "./node_modules/plotly.js/lib/surface.js"),
    __webpack_require__(/*! ./mesh3d */ "./node_modules/plotly.js/lib/mesh3d.js"),
    __webpack_require__(/*! ./isosurface */ "./node_modules/plotly.js/lib/isosurface.js"),
    __webpack_require__(/*! ./volume */ "./node_modules/plotly.js/lib/volume.js"),
    __webpack_require__(/*! ./cone */ "./node_modules/plotly.js/lib/cone.js"),
    __webpack_require__(/*! ./streamtube */ "./node_modules/plotly.js/lib/streamtube.js")
]);

module.exports = Plotly;


/***/ }),

/***/ "./node_modules/plotly.js/lib/isosurface.js":
/*!**************************************************!*\
  !*** ./node_modules/plotly.js/lib/isosurface.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/isosurface */ "./node_modules/plotly.js/src/traces/isosurface/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/volume.js":
/*!**********************************************!*\
  !*** ./node_modules/plotly.js/lib/volume.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/volume */ "./node_modules/plotly.js/src/traces/volume/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/find_empties.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/find_empties.js ***!
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



var maxRowLength = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").maxRowLength;

/* Return a list of empty points in 2D array z
 * each empty point z[i][j] gives an array [i, j, neighborCount]
 * neighborCount is the count of 4 nearest neighbors that DO exist
 * this is to give us an order of points to evaluate for interpolation.
 * if no neighbors exist, we iteratively look for neighbors that HAVE
 * neighbors, and add a fractional neighborCount
 */
module.exports = function findEmpties(z) {
    var empties = [];
    var neighborHash = {};
    var noNeighborList = [];
    var nextRow = z[0];
    var row = [];
    var blank = [0, 0, 0];
    var rowLength = maxRowLength(z);
    var prevRow;
    var i;
    var j;
    var thisPt;
    var p;
    var neighborCount;
    var newNeighborHash;
    var foundNewNeighbors;

    for(i = 0; i < z.length; i++) {
        prevRow = row;
        row = nextRow;
        nextRow = z[i + 1] || [];
        for(j = 0; j < rowLength; j++) {
            if(row[j] === undefined) {
                neighborCount = (row[j - 1] !== undefined ? 1 : 0) +
                    (row[j + 1] !== undefined ? 1 : 0) +
                    (prevRow[j] !== undefined ? 1 : 0) +
                    (nextRow[j] !== undefined ? 1 : 0);

                if(neighborCount) {
                    // for this purpose, don't count off-the-edge points
                    // as undefined neighbors
                    if(i === 0) neighborCount++;
                    if(j === 0) neighborCount++;
                    if(i === z.length - 1) neighborCount++;
                    if(j === row.length - 1) neighborCount++;

                    // if all neighbors that could exist do, we don't
                    // need this for finding farther neighbors
                    if(neighborCount < 4) {
                        neighborHash[[i, j]] = [i, j, neighborCount];
                    }

                    empties.push([i, j, neighborCount]);
                } else noNeighborList.push([i, j]);
            }
        }
    }

    while(noNeighborList.length) {
        newNeighborHash = {};
        foundNewNeighbors = false;

        // look for cells that now have neighbors but didn't before
        for(p = noNeighborList.length - 1; p >= 0; p--) {
            thisPt = noNeighborList[p];
            i = thisPt[0];
            j = thisPt[1];

            neighborCount = ((neighborHash[[i - 1, j]] || blank)[2] +
                (neighborHash[[i + 1, j]] || blank)[2] +
                (neighborHash[[i, j - 1]] || blank)[2] +
                (neighborHash[[i, j + 1]] || blank)[2]) / 20;

            if(neighborCount) {
                newNeighborHash[thisPt] = [i, j, neighborCount];
                noNeighborList.splice(p, 1);
                foundNewNeighbors = true;
            }
        }

        if(!foundNewNeighbors) {
            throw 'findEmpties iterated with no new neighbors';
        }

        // put these new cells into the main neighbor list
        for(thisPt in newNeighborHash) {
            neighborHash[thisPt] = newNeighborHash[thisPt];
            empties.push(newNeighborHash[thisPt]);
        }
    }

    // sort the full list in descending order of neighbor count
    return empties.sort(function(a, b) { return b[2] - a[2]; });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/interp2d.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/interp2d.js ***!
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

var INTERPTHRESHOLD = 1e-2;
var NEIGHBORSHIFTS = [[-1, 0], [1, 0], [0, -1], [0, 1]];

function correctionOvershoot(maxFractionalChange) {
    // start with less overshoot, until we know it's converging,
    // then ramp up the overshoot for faster convergence
    return 0.5 - 0.25 * Math.min(1, maxFractionalChange * 0.5);
}

/*
 * interp2d: Fill in missing data from a 2D array using an iterative
 *   poisson equation solver with zero-derivative BC at edges.
 *   Amazingly, this just amounts to repeatedly averaging all the existing
 *   nearest neighbors, at least if we don't take x/y scaling into account,
 *   which is the right approach here where x and y may not even have the
 *   same units.
 *
 * @param {array of arrays} z
 *      The 2D array to fill in. Will be mutated here. Assumed to already be
 *      cleaned, so all entries are numbers except gaps, which are `undefined`.
 * @param {array of arrays} emptyPoints
 *      Each entry [i, j, neighborCount] for empty points z[i][j] and the number
 *      of neighbors that are *not* missing. Assumed to be sorted from most to
 *      least neighbors, as produced by heatmap/find_empties.
 */
module.exports = function interp2d(z, emptyPoints) {
    var maxFractionalChange = 1;
    var i;

    // one pass to fill in a starting value for all the empties
    iterateInterp2d(z, emptyPoints);

    // we're don't need to iterate lone empties - remove them
    for(i = 0; i < emptyPoints.length; i++) {
        if(emptyPoints[i][2] < 4) break;
    }
    // but don't remove these points from the original array,
    // we'll use them for masking, so make a copy.
    emptyPoints = emptyPoints.slice(i);

    for(i = 0; i < 100 && maxFractionalChange > INTERPTHRESHOLD; i++) {
        maxFractionalChange = iterateInterp2d(z, emptyPoints,
            correctionOvershoot(maxFractionalChange));
    }
    if(maxFractionalChange > INTERPTHRESHOLD) {
        Lib.log('interp2d didn\'t converge quickly', maxFractionalChange);
    }

    return z;
};

function iterateInterp2d(z, emptyPoints, overshoot) {
    var maxFractionalChange = 0;
    var thisPt;
    var i;
    var j;
    var p;
    var q;
    var neighborShift;
    var neighborRow;
    var neighborVal;
    var neighborCount;
    var neighborSum;
    var initialVal;
    var minNeighbor;
    var maxNeighbor;

    for(p = 0; p < emptyPoints.length; p++) {
        thisPt = emptyPoints[p];
        i = thisPt[0];
        j = thisPt[1];
        initialVal = z[i][j];
        neighborSum = 0;
        neighborCount = 0;

        for(q = 0; q < 4; q++) {
            neighborShift = NEIGHBORSHIFTS[q];
            neighborRow = z[i + neighborShift[0]];
            if(!neighborRow) continue;
            neighborVal = neighborRow[j + neighborShift[1]];
            if(neighborVal !== undefined) {
                if(neighborSum === 0) {
                    minNeighbor = maxNeighbor = neighborVal;
                } else {
                    minNeighbor = Math.min(minNeighbor, neighborVal);
                    maxNeighbor = Math.max(maxNeighbor, neighborVal);
                }
                neighborCount++;
                neighborSum += neighborVal;
            }
        }

        if(neighborCount === 0) {
            throw 'iterateInterp2d order is wrong: no defined neighbors';
        }

        // this is the laplace equation interpolation:
        // each point is just the average of its neighbors
        // note that this ignores differential x/y scaling
        // which I think is the right approach, since we
        // don't know what that scaling means
        z[i][j] = neighborSum / neighborCount;

        if(initialVal === undefined) {
            if(neighborCount < 4) maxFractionalChange = 1;
        } else {
            // we can make large empty regions converge faster
            // if we overshoot the change vs the previous value
            z[i][j] = (1 + overshoot) * z[i][j] - overshoot * initialVal;

            if(maxNeighbor > minNeighbor) {
                maxFractionalChange = Math.max(maxFractionalChange,
                    Math.abs(z[i][j] - initialVal) / (maxNeighbor - minNeighbor));
            }
        }
    }

    return maxFractionalChange;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/isosurface/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/isosurface/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/isosurface/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/isosurface/defaults.js").supplyDefaults,
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/isosurface/calc.js"),
    colorbar: {
        min: 'cmin',
        max: 'cmax'
    },
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/isosurface/convert.js").createIsosurfaceTrace,

    moduleType: 'trace',
    name: 'isosurface',
    basePlotModule: __webpack_require__(/*! ../../plots/gl3d */ "./node_modules/plotly.js/src/plots/gl3d/index.js"),
    categories: ['gl3d', 'showLegend'],
    meta: {
        description: [
            'Draws isosurfaces between iso-min and iso-max values with coordinates given by',
            'four 1-dimensional arrays containing the `value`, `x`, `y` and `z` of every vertex',
            'of a uniform or non-uniform 3-D grid. Horizontal or vertical slices, caps as well as',
            'spaceframe between iso-min and iso-max values could also be drawn using this trace.'
        ].join(' ')
    }
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


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/volume/attributes.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/volume/attributes.js ***!
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



var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var isosurfaceAttrs = __webpack_require__(/*! ../isosurface/attributes */ "./node_modules/plotly.js/src/traces/isosurface/attributes.js");
var surfaceAttrs = __webpack_require__(/*! ../surface/attributes */ "./node_modules/plotly.js/src/traces/surface/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var attrs = module.exports = overrideAll(extendFlat({
    x: isosurfaceAttrs.x,
    y: isosurfaceAttrs.y,
    z: isosurfaceAttrs.z,
    value: isosurfaceAttrs.value,
    isomin: isosurfaceAttrs.isomin,
    isomax: isosurfaceAttrs.isomax,
    surface: isosurfaceAttrs.surface,
    spaceframe: {
        show: {
            valType: 'boolean',
            role: 'info',
            dflt: false,
            description: [
                'Displays/hides tetrahedron shapes between minimum and',
                'maximum iso-values. Often useful when either caps or',
                'surfaces are disabled or filled with values less than 1.'
            ].join(' ')
        },
        fill: {
            valType: 'number',
            role: 'style',
            min: 0,
            max: 1,
            dflt: 1,
            description: [
                'Sets the fill ratio of the `spaceframe` elements. The default fill value',
                'is 1 meaning that they are entirely shaded. Applying a `fill` ratio less',
                'than one would allow the creation of openings parallel to the edges.'
            ].join(' ')
        }
    },

    slices: isosurfaceAttrs.slices,
    caps: isosurfaceAttrs.caps,
    text: isosurfaceAttrs.text,
    hovertext: isosurfaceAttrs.hovertext,
    hovertemplate: isosurfaceAttrs.hovertemplate
},

colorScaleAttrs('', {
    colorAttr: '`value`',
    showScaleDflt: true,
    editTypeOverride: 'calc'
}), {

    colorbar: isosurfaceAttrs.colorbar,
    opacity: isosurfaceAttrs.opacity,
    opacityscale: surfaceAttrs.opacityscale,

    lightposition: isosurfaceAttrs.lightposition,
    lighting: isosurfaceAttrs.lighting,
    flatshading: isosurfaceAttrs.flatshading,
    contour: isosurfaceAttrs.contour,

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
}), 'calc', 'nested');

attrs.x.editType = attrs.y.editType = attrs.z.editType = attrs.value.editType = 'calc+clearAxisTypes';
attrs.transforms = undefined;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/volume/convert.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/volume/convert.js ***!
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



var createMesh = __webpack_require__(/*! gl-mesh3d */ "./node_modules/gl-mesh3d/mesh.js");

var parseColorScale = __webpack_require__(/*! ../../lib/gl_format_color */ "./node_modules/plotly.js/src/lib/gl_format_color.js").parseColorScale;
var str2RgbaArray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");
var extractOpts = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").extractOpts;
var zip3 = __webpack_require__(/*! ../../plots/gl3d/zip3 */ "./node_modules/plotly.js/src/plots/gl3d/zip3.js");

var findNearestOnAxis = __webpack_require__(/*! ../isosurface/convert */ "./node_modules/plotly.js/src/traces/isosurface/convert.js").findNearestOnAxis;
var generateIsoMeshes = __webpack_require__(/*! ../isosurface/convert */ "./node_modules/plotly.js/src/traces/isosurface/convert.js").generateIsoMeshes;

function VolumeTrace(scene, mesh, uid) {
    this.scene = scene;
    this.uid = uid;
    this.mesh = mesh;
    this.name = '';
    this.data = null;
    this.showContour = false;
}

var proto = VolumeTrace.prototype;

proto.handlePick = function(selection) {
    if(selection.object === this.mesh) {
        var rawId = selection.data.index;

        var x = this.data._meshX[rawId];
        var y = this.data._meshY[rawId];
        var z = this.data._meshZ[rawId];

        var height = this.data._Ys.length;
        var depth = this.data._Zs.length;

        var i = findNearestOnAxis(x, this.data._Xs).id;
        var j = findNearestOnAxis(y, this.data._Ys).id;
        var k = findNearestOnAxis(z, this.data._Zs).id;

        var selectIndex = selection.index = k + depth * j + depth * height * i;

        selection.traceCoordinate = [
            this.data._meshX[selectIndex],
            this.data._meshY[selectIndex],
            this.data._meshZ[selectIndex],
            this.data._value[selectIndex]
        ];

        var text = this.data.hovertext || this.data.text;
        if(Array.isArray(text) && text[selectIndex] !== undefined) {
            selection.textLabel = text[selectIndex];
        } else if(text) {
            selection.textLabel = text;
        }

        return true;
    }
};

proto.update = function(data) {
    var scene = this.scene;
    var layout = scene.fullSceneLayout;

    this.data = generateIsoMeshes(data);

    // Unpack position data
    function toDataCoords(axis, coord, scale, calendar) {
        return coord.map(function(x) {
            return axis.d2l(x, 0, calendar) * scale;
        });
    }

    var positions = zip3(
        toDataCoords(layout.xaxis, data._meshX, scene.dataScale[0], data.xcalendar),
        toDataCoords(layout.yaxis, data._meshY, scene.dataScale[1], data.ycalendar),
        toDataCoords(layout.zaxis, data._meshZ, scene.dataScale[2], data.zcalendar));

    var cells = zip3(data._meshI, data._meshJ, data._meshK);

    var config = {
        positions: positions,
        cells: cells,
        lightPosition: [data.lightposition.x, data.lightposition.y, data.lightposition.z],
        ambient: data.lighting.ambient,
        diffuse: data.lighting.diffuse,
        specular: data.lighting.specular,
        roughness: data.lighting.roughness,
        fresnel: data.lighting.fresnel,
        vertexNormalsEpsilon: data.lighting.vertexnormalsepsilon,
        faceNormalsEpsilon: data.lighting.facenormalsepsilon,
        opacity: data.opacity,
        opacityscale: data.opacityscale,
        contourEnable: data.contour.show,
        contourColor: str2RgbaArray(data.contour.color).slice(0, 3),
        contourWidth: data.contour.width,
        useFacetNormals: data.flatshading
    };

    var cOpts = extractOpts(data);
    config.vertexIntensity = data._meshIntensity;
    config.vertexIntensityBounds = [cOpts.min, cOpts.max];
    config.colormap = parseColorScale(data);

    // Update mesh
    this.mesh.update(config);
};

proto.dispose = function() {
    this.scene.glplot.remove(this.mesh);
    this.mesh.dispose();
};

function createVolumeTrace(scene, data) {
    var gl = scene.glplot.gl;
    var mesh = createMesh({gl: gl});
    var result = new VolumeTrace(scene, mesh, data.uid);

    mesh._trace = result;
    result.update(data);
    scene.glplot.add(mesh);
    return result;
}

module.exports = createVolumeTrace;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/volume/defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/volume/defaults.js ***!
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
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/volume/attributes.js");
var supplyIsoDefaults = __webpack_require__(/*! ../isosurface/defaults */ "./node_modules/plotly.js/src/traces/isosurface/defaults.js").supplyIsoDefaults;
var opacityscaleDefaults = __webpack_require__(/*! ../surface/defaults */ "./node_modules/plotly.js/src/traces/surface/defaults.js").opacityscaleDefaults;

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    supplyIsoDefaults(traceIn, traceOut, defaultColor, layout, coerce);

    opacityscaleDefaults(traceIn, traceOut, layout, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/volume/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/volume/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/volume/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/volume/defaults.js"),
    calc: __webpack_require__(/*! ../isosurface/calc */ "./node_modules/plotly.js/src/traces/isosurface/calc.js"),
    colorbar: {
        min: 'cmin',
        max: 'cmax'
    },
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/volume/convert.js"),

    moduleType: 'trace',
    name: 'volume',
    basePlotModule: __webpack_require__(/*! ../../plots/gl3d */ "./node_modules/plotly.js/src/plots/gl3d/index.js"),
    categories: ['gl3d', 'showLegend'],
    meta: {
        description: [
            'Draws volume trace between iso-min and iso-max values with coordinates given by',
            'four 1-dimensional arrays containing the `value`, `x`, `y` and `z` of every vertex',
            'of a uniform or non-uniform 3-D grid. Horizontal or vertical slices, caps as well as',
            'spaceframe between iso-min and iso-max values could also be drawn using this trace.'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaW5kZXgtZ2wzZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaXNvc3VyZmFjZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvdm9sdW1lLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9maW5kX2VtcHRpZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9oZWF0bWFwL2ludGVycDJkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaXNvc3VyZmFjZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXIveHlfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy92b2x1bWUvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3ZvbHVtZS9jb252ZXJ0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdm9sdW1lL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdm9sdW1lL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtB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LDhIQUFtRDs7QUFFOUU7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMsOEVBQWM7QUFDdEMsb0JBQW9CLG1CQUFPLENBQUMsMEVBQVk7QUFDeEMsVUFBVSxtQkFBTyxDQUFDLGtGQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsVUFBVSxtQkFBTyxDQUFDLHdFQUFXOztBQUU3QjtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMEVBQWtCO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0ZTNlZmE2OWQwZDgzOWE0ZmFkYzcuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQbG90bHkgPSByZXF1aXJlKCcuL2NvcmUnKTtcblxuUGxvdGx5LnJlZ2lzdGVyKFtcbiAgICByZXF1aXJlKCcuL3NjYXR0ZXIzZCcpLFxuICAgIHJlcXVpcmUoJy4vc3VyZmFjZScpLFxuICAgIHJlcXVpcmUoJy4vbWVzaDNkJyksXG4gICAgcmVxdWlyZSgnLi9pc29zdXJmYWNlJyksXG4gICAgcmVxdWlyZSgnLi92b2x1bWUnKSxcbiAgICByZXF1aXJlKCcuL2NvbmUnKSxcbiAgICByZXF1aXJlKCcuL3N0cmVhbXR1YmUnKVxuXSk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGxvdGx5O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvaXNvc3VyZmFjZScpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvdm9sdW1lJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBtYXhSb3dMZW5ndGggPSByZXF1aXJlKCcuLi8uLi9saWInKS5tYXhSb3dMZW5ndGg7XG5cbi8qIFJldHVybiBhIGxpc3Qgb2YgZW1wdHkgcG9pbnRzIGluIDJEIGFycmF5IHpcbiAqIGVhY2ggZW1wdHkgcG9pbnQgeltpXVtqXSBnaXZlcyBhbiBhcnJheSBbaSwgaiwgbmVpZ2hib3JDb3VudF1cbiAqIG5laWdoYm9yQ291bnQgaXMgdGhlIGNvdW50IG9mIDQgbmVhcmVzdCBuZWlnaGJvcnMgdGhhdCBETyBleGlzdFxuICogdGhpcyBpcyB0byBnaXZlIHVzIGFuIG9yZGVyIG9mIHBvaW50cyB0byBldmFsdWF0ZSBmb3IgaW50ZXJwb2xhdGlvbi5cbiAqIGlmIG5vIG5laWdoYm9ycyBleGlzdCwgd2UgaXRlcmF0aXZlbHkgbG9vayBmb3IgbmVpZ2hib3JzIHRoYXQgSEFWRVxuICogbmVpZ2hib3JzLCBhbmQgYWRkIGEgZnJhY3Rpb25hbCBuZWlnaGJvckNvdW50XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZmluZEVtcHRpZXMoeikge1xuICAgIHZhciBlbXB0aWVzID0gW107XG4gICAgdmFyIG5laWdoYm9ySGFzaCA9IHt9O1xuICAgIHZhciBub05laWdoYm9yTGlzdCA9IFtdO1xuICAgIHZhciBuZXh0Um93ID0gelswXTtcbiAgICB2YXIgcm93ID0gW107XG4gICAgdmFyIGJsYW5rID0gWzAsIDAsIDBdO1xuICAgIHZhciByb3dMZW5ndGggPSBtYXhSb3dMZW5ndGgoeik7XG4gICAgdmFyIHByZXZSb3c7XG4gICAgdmFyIGk7XG4gICAgdmFyIGo7XG4gICAgdmFyIHRoaXNQdDtcbiAgICB2YXIgcDtcbiAgICB2YXIgbmVpZ2hib3JDb3VudDtcbiAgICB2YXIgbmV3TmVpZ2hib3JIYXNoO1xuICAgIHZhciBmb3VuZE5ld05laWdoYm9ycztcblxuICAgIGZvcihpID0gMDsgaSA8IHoubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJldlJvdyA9IHJvdztcbiAgICAgICAgcm93ID0gbmV4dFJvdztcbiAgICAgICAgbmV4dFJvdyA9IHpbaSArIDFdIHx8IFtdO1xuICAgICAgICBmb3IoaiA9IDA7IGogPCByb3dMZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYocm93W2pdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBuZWlnaGJvckNvdW50ID0gKHJvd1tqIC0gMV0gIT09IHVuZGVmaW5lZCA/IDEgOiAwKSArXG4gICAgICAgICAgICAgICAgICAgIChyb3dbaiArIDFdICE9PSB1bmRlZmluZWQgPyAxIDogMCkgK1xuICAgICAgICAgICAgICAgICAgICAocHJldlJvd1tqXSAhPT0gdW5kZWZpbmVkID8gMSA6IDApICtcbiAgICAgICAgICAgICAgICAgICAgKG5leHRSb3dbal0gIT09IHVuZGVmaW5lZCA/IDEgOiAwKTtcblxuICAgICAgICAgICAgICAgIGlmKG5laWdoYm9yQ291bnQpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yIHRoaXMgcHVycG9zZSwgZG9uJ3QgY291bnQgb2ZmLXRoZS1lZGdlIHBvaW50c1xuICAgICAgICAgICAgICAgICAgICAvLyBhcyB1bmRlZmluZWQgbmVpZ2hib3JzXG4gICAgICAgICAgICAgICAgICAgIGlmKGkgPT09IDApIG5laWdoYm9yQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgaWYoaiA9PT0gMCkgbmVpZ2hib3JDb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICBpZihpID09PSB6Lmxlbmd0aCAtIDEpIG5laWdoYm9yQ291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgaWYoaiA9PT0gcm93Lmxlbmd0aCAtIDEpIG5laWdoYm9yQ291bnQrKztcblxuICAgICAgICAgICAgICAgICAgICAvLyBpZiBhbGwgbmVpZ2hib3JzIHRoYXQgY291bGQgZXhpc3QgZG8sIHdlIGRvbid0XG4gICAgICAgICAgICAgICAgICAgIC8vIG5lZWQgdGhpcyBmb3IgZmluZGluZyBmYXJ0aGVyIG5laWdoYm9yc1xuICAgICAgICAgICAgICAgICAgICBpZihuZWlnaGJvckNvdW50IDwgNCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmVpZ2hib3JIYXNoW1tpLCBqXV0gPSBbaSwgaiwgbmVpZ2hib3JDb3VudF07XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBlbXB0aWVzLnB1c2goW2ksIGosIG5laWdoYm9yQ291bnRdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Ugbm9OZWlnaGJvckxpc3QucHVzaChbaSwgal0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUobm9OZWlnaGJvckxpc3QubGVuZ3RoKSB7XG4gICAgICAgIG5ld05laWdoYm9ySGFzaCA9IHt9O1xuICAgICAgICBmb3VuZE5ld05laWdoYm9ycyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGxvb2sgZm9yIGNlbGxzIHRoYXQgbm93IGhhdmUgbmVpZ2hib3JzIGJ1dCBkaWRuJ3QgYmVmb3JlXG4gICAgICAgIGZvcihwID0gbm9OZWlnaGJvckxpc3QubGVuZ3RoIC0gMTsgcCA+PSAwOyBwLS0pIHtcbiAgICAgICAgICAgIHRoaXNQdCA9IG5vTmVpZ2hib3JMaXN0W3BdO1xuICAgICAgICAgICAgaSA9IHRoaXNQdFswXTtcbiAgICAgICAgICAgIGogPSB0aGlzUHRbMV07XG5cbiAgICAgICAgICAgIG5laWdoYm9yQ291bnQgPSAoKG5laWdoYm9ySGFzaFtbaSAtIDEsIGpdXSB8fCBibGFuaylbMl0gK1xuICAgICAgICAgICAgICAgIChuZWlnaGJvckhhc2hbW2kgKyAxLCBqXV0gfHwgYmxhbmspWzJdICtcbiAgICAgICAgICAgICAgICAobmVpZ2hib3JIYXNoW1tpLCBqIC0gMV1dIHx8IGJsYW5rKVsyXSArXG4gICAgICAgICAgICAgICAgKG5laWdoYm9ySGFzaFtbaSwgaiArIDFdXSB8fCBibGFuaylbMl0pIC8gMjA7XG5cbiAgICAgICAgICAgIGlmKG5laWdoYm9yQ291bnQpIHtcbiAgICAgICAgICAgICAgICBuZXdOZWlnaGJvckhhc2hbdGhpc1B0XSA9IFtpLCBqLCBuZWlnaGJvckNvdW50XTtcbiAgICAgICAgICAgICAgICBub05laWdoYm9yTGlzdC5zcGxpY2UocCwgMSk7XG4gICAgICAgICAgICAgICAgZm91bmROZXdOZWlnaGJvcnMgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWZvdW5kTmV3TmVpZ2hib3JzKSB7XG4gICAgICAgICAgICB0aHJvdyAnZmluZEVtcHRpZXMgaXRlcmF0ZWQgd2l0aCBubyBuZXcgbmVpZ2hib3JzJztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHB1dCB0aGVzZSBuZXcgY2VsbHMgaW50byB0aGUgbWFpbiBuZWlnaGJvciBsaXN0XG4gICAgICAgIGZvcih0aGlzUHQgaW4gbmV3TmVpZ2hib3JIYXNoKSB7XG4gICAgICAgICAgICBuZWlnaGJvckhhc2hbdGhpc1B0XSA9IG5ld05laWdoYm9ySGFzaFt0aGlzUHRdO1xuICAgICAgICAgICAgZW1wdGllcy5wdXNoKG5ld05laWdoYm9ySGFzaFt0aGlzUHRdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHNvcnQgdGhlIGZ1bGwgbGlzdCBpbiBkZXNjZW5kaW5nIG9yZGVyIG9mIG5laWdoYm9yIGNvdW50XG4gICAgcmV0dXJuIGVtcHRpZXMuc29ydChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBiWzJdIC0gYVsyXTsgfSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBJTlRFUlBUSFJFU0hPTEQgPSAxZS0yO1xudmFyIE5FSUdIQk9SU0hJRlRTID0gW1stMSwgMF0sIFsxLCAwXSwgWzAsIC0xXSwgWzAsIDFdXTtcblxuZnVuY3Rpb24gY29ycmVjdGlvbk92ZXJzaG9vdChtYXhGcmFjdGlvbmFsQ2hhbmdlKSB7XG4gICAgLy8gc3RhcnQgd2l0aCBsZXNzIG92ZXJzaG9vdCwgdW50aWwgd2Uga25vdyBpdCdzIGNvbnZlcmdpbmcsXG4gICAgLy8gdGhlbiByYW1wIHVwIHRoZSBvdmVyc2hvb3QgZm9yIGZhc3RlciBjb252ZXJnZW5jZVxuICAgIHJldHVybiAwLjUgLSAwLjI1ICogTWF0aC5taW4oMSwgbWF4RnJhY3Rpb25hbENoYW5nZSAqIDAuNSk7XG59XG5cbi8qXG4gKiBpbnRlcnAyZDogRmlsbCBpbiBtaXNzaW5nIGRhdGEgZnJvbSBhIDJEIGFycmF5IHVzaW5nIGFuIGl0ZXJhdGl2ZVxuICogICBwb2lzc29uIGVxdWF0aW9uIHNvbHZlciB3aXRoIHplcm8tZGVyaXZhdGl2ZSBCQyBhdCBlZGdlcy5cbiAqICAgQW1hemluZ2x5LCB0aGlzIGp1c3QgYW1vdW50cyB0byByZXBlYXRlZGx5IGF2ZXJhZ2luZyBhbGwgdGhlIGV4aXN0aW5nXG4gKiAgIG5lYXJlc3QgbmVpZ2hib3JzLCBhdCBsZWFzdCBpZiB3ZSBkb24ndCB0YWtlIHgveSBzY2FsaW5nIGludG8gYWNjb3VudCxcbiAqICAgd2hpY2ggaXMgdGhlIHJpZ2h0IGFwcHJvYWNoIGhlcmUgd2hlcmUgeCBhbmQgeSBtYXkgbm90IGV2ZW4gaGF2ZSB0aGVcbiAqICAgc2FtZSB1bml0cy5cbiAqXG4gKiBAcGFyYW0ge2FycmF5IG9mIGFycmF5c30gelxuICogICAgICBUaGUgMkQgYXJyYXkgdG8gZmlsbCBpbi4gV2lsbCBiZSBtdXRhdGVkIGhlcmUuIEFzc3VtZWQgdG8gYWxyZWFkeSBiZVxuICogICAgICBjbGVhbmVkLCBzbyBhbGwgZW50cmllcyBhcmUgbnVtYmVycyBleGNlcHQgZ2Fwcywgd2hpY2ggYXJlIGB1bmRlZmluZWRgLlxuICogQHBhcmFtIHthcnJheSBvZiBhcnJheXN9IGVtcHR5UG9pbnRzXG4gKiAgICAgIEVhY2ggZW50cnkgW2ksIGosIG5laWdoYm9yQ291bnRdIGZvciBlbXB0eSBwb2ludHMgeltpXVtqXSBhbmQgdGhlIG51bWJlclxuICogICAgICBvZiBuZWlnaGJvcnMgdGhhdCBhcmUgKm5vdCogbWlzc2luZy4gQXNzdW1lZCB0byBiZSBzb3J0ZWQgZnJvbSBtb3N0IHRvXG4gKiAgICAgIGxlYXN0IG5laWdoYm9ycywgYXMgcHJvZHVjZWQgYnkgaGVhdG1hcC9maW5kX2VtcHRpZXMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaW50ZXJwMmQoeiwgZW1wdHlQb2ludHMpIHtcbiAgICB2YXIgbWF4RnJhY3Rpb25hbENoYW5nZSA9IDE7XG4gICAgdmFyIGk7XG5cbiAgICAvLyBvbmUgcGFzcyB0byBmaWxsIGluIGEgc3RhcnRpbmcgdmFsdWUgZm9yIGFsbCB0aGUgZW1wdGllc1xuICAgIGl0ZXJhdGVJbnRlcnAyZCh6LCBlbXB0eVBvaW50cyk7XG5cbiAgICAvLyB3ZSdyZSBkb24ndCBuZWVkIHRvIGl0ZXJhdGUgbG9uZSBlbXB0aWVzIC0gcmVtb3ZlIHRoZW1cbiAgICBmb3IoaSA9IDA7IGkgPCBlbXB0eVBvaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihlbXB0eVBvaW50c1tpXVsyXSA8IDQpIGJyZWFrO1xuICAgIH1cbiAgICAvLyBidXQgZG9uJ3QgcmVtb3ZlIHRoZXNlIHBvaW50cyBmcm9tIHRoZSBvcmlnaW5hbCBhcnJheSxcbiAgICAvLyB3ZSdsbCB1c2UgdGhlbSBmb3IgbWFza2luZywgc28gbWFrZSBhIGNvcHkuXG4gICAgZW1wdHlQb2ludHMgPSBlbXB0eVBvaW50cy5zbGljZShpKTtcblxuICAgIGZvcihpID0gMDsgaSA8IDEwMCAmJiBtYXhGcmFjdGlvbmFsQ2hhbmdlID4gSU5URVJQVEhSRVNIT0xEOyBpKyspIHtcbiAgICAgICAgbWF4RnJhY3Rpb25hbENoYW5nZSA9IGl0ZXJhdGVJbnRlcnAyZCh6LCBlbXB0eVBvaW50cyxcbiAgICAgICAgICAgIGNvcnJlY3Rpb25PdmVyc2hvb3QobWF4RnJhY3Rpb25hbENoYW5nZSkpO1xuICAgIH1cbiAgICBpZihtYXhGcmFjdGlvbmFsQ2hhbmdlID4gSU5URVJQVEhSRVNIT0xEKSB7XG4gICAgICAgIExpYi5sb2coJ2ludGVycDJkIGRpZG5cXCd0IGNvbnZlcmdlIHF1aWNrbHknLCBtYXhGcmFjdGlvbmFsQ2hhbmdlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gejtcbn07XG5cbmZ1bmN0aW9uIGl0ZXJhdGVJbnRlcnAyZCh6LCBlbXB0eVBvaW50cywgb3ZlcnNob290KSB7XG4gICAgdmFyIG1heEZyYWN0aW9uYWxDaGFuZ2UgPSAwO1xuICAgIHZhciB0aGlzUHQ7XG4gICAgdmFyIGk7XG4gICAgdmFyIGo7XG4gICAgdmFyIHA7XG4gICAgdmFyIHE7XG4gICAgdmFyIG5laWdoYm9yU2hpZnQ7XG4gICAgdmFyIG5laWdoYm9yUm93O1xuICAgIHZhciBuZWlnaGJvclZhbDtcbiAgICB2YXIgbmVpZ2hib3JDb3VudDtcbiAgICB2YXIgbmVpZ2hib3JTdW07XG4gICAgdmFyIGluaXRpYWxWYWw7XG4gICAgdmFyIG1pbk5laWdoYm9yO1xuICAgIHZhciBtYXhOZWlnaGJvcjtcblxuICAgIGZvcihwID0gMDsgcCA8IGVtcHR5UG9pbnRzLmxlbmd0aDsgcCsrKSB7XG4gICAgICAgIHRoaXNQdCA9IGVtcHR5UG9pbnRzW3BdO1xuICAgICAgICBpID0gdGhpc1B0WzBdO1xuICAgICAgICBqID0gdGhpc1B0WzFdO1xuICAgICAgICBpbml0aWFsVmFsID0geltpXVtqXTtcbiAgICAgICAgbmVpZ2hib3JTdW0gPSAwO1xuICAgICAgICBuZWlnaGJvckNvdW50ID0gMDtcblxuICAgICAgICBmb3IocSA9IDA7IHEgPCA0OyBxKyspIHtcbiAgICAgICAgICAgIG5laWdoYm9yU2hpZnQgPSBORUlHSEJPUlNISUZUU1txXTtcbiAgICAgICAgICAgIG5laWdoYm9yUm93ID0geltpICsgbmVpZ2hib3JTaGlmdFswXV07XG4gICAgICAgICAgICBpZighbmVpZ2hib3JSb3cpIGNvbnRpbnVlO1xuICAgICAgICAgICAgbmVpZ2hib3JWYWwgPSBuZWlnaGJvclJvd1tqICsgbmVpZ2hib3JTaGlmdFsxXV07XG4gICAgICAgICAgICBpZihuZWlnaGJvclZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYobmVpZ2hib3JTdW0gPT09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbWluTmVpZ2hib3IgPSBtYXhOZWlnaGJvciA9IG5laWdoYm9yVmFsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1pbk5laWdoYm9yID0gTWF0aC5taW4obWluTmVpZ2hib3IsIG5laWdoYm9yVmFsKTtcbiAgICAgICAgICAgICAgICAgICAgbWF4TmVpZ2hib3IgPSBNYXRoLm1heChtYXhOZWlnaGJvciwgbmVpZ2hib3JWYWwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuZWlnaGJvckNvdW50Kys7XG4gICAgICAgICAgICAgICAgbmVpZ2hib3JTdW0gKz0gbmVpZ2hib3JWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihuZWlnaGJvckNvdW50ID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyAnaXRlcmF0ZUludGVycDJkIG9yZGVyIGlzIHdyb25nOiBubyBkZWZpbmVkIG5laWdoYm9ycyc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0aGlzIGlzIHRoZSBsYXBsYWNlIGVxdWF0aW9uIGludGVycG9sYXRpb246XG4gICAgICAgIC8vIGVhY2ggcG9pbnQgaXMganVzdCB0aGUgYXZlcmFnZSBvZiBpdHMgbmVpZ2hib3JzXG4gICAgICAgIC8vIG5vdGUgdGhhdCB0aGlzIGlnbm9yZXMgZGlmZmVyZW50aWFsIHgveSBzY2FsaW5nXG4gICAgICAgIC8vIHdoaWNoIEkgdGhpbmsgaXMgdGhlIHJpZ2h0IGFwcHJvYWNoLCBzaW5jZSB3ZVxuICAgICAgICAvLyBkb24ndCBrbm93IHdoYXQgdGhhdCBzY2FsaW5nIG1lYW5zXG4gICAgICAgIHpbaV1bal0gPSBuZWlnaGJvclN1bSAvIG5laWdoYm9yQ291bnQ7XG5cbiAgICAgICAgaWYoaW5pdGlhbFZhbCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihuZWlnaGJvckNvdW50IDwgNCkgbWF4RnJhY3Rpb25hbENoYW5nZSA9IDE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyB3ZSBjYW4gbWFrZSBsYXJnZSBlbXB0eSByZWdpb25zIGNvbnZlcmdlIGZhc3RlclxuICAgICAgICAgICAgLy8gaWYgd2Ugb3ZlcnNob290IHRoZSBjaGFuZ2UgdnMgdGhlIHByZXZpb3VzIHZhbHVlXG4gICAgICAgICAgICB6W2ldW2pdID0gKDEgKyBvdmVyc2hvb3QpICogeltpXVtqXSAtIG92ZXJzaG9vdCAqIGluaXRpYWxWYWw7XG5cbiAgICAgICAgICAgIGlmKG1heE5laWdoYm9yID4gbWluTmVpZ2hib3IpIHtcbiAgICAgICAgICAgICAgICBtYXhGcmFjdGlvbmFsQ2hhbmdlID0gTWF0aC5tYXgobWF4RnJhY3Rpb25hbENoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoeltpXVtqXSAtIGluaXRpYWxWYWwpIC8gKG1heE5laWdoYm9yIC0gbWluTmVpZ2hib3IpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBtYXhGcmFjdGlvbmFsQ2hhbmdlO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLnN1cHBseURlZmF1bHRzLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIGNvbG9yYmFyOiB7XG4gICAgICAgIG1pbjogJ2NtaW4nLFxuICAgICAgICBtYXg6ICdjbWF4J1xuICAgIH0sXG4gICAgcGxvdDogcmVxdWlyZSgnLi9jb252ZXJ0JykuY3JlYXRlSXNvc3VyZmFjZVRyYWNlLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAnaXNvc3VyZmFjZScsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dsM2QnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2dsM2QnLCAnc2hvd0xlZ2VuZCddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEcmF3cyBpc29zdXJmYWNlcyBiZXR3ZWVuIGlzby1taW4gYW5kIGlzby1tYXggdmFsdWVzIHdpdGggY29vcmRpbmF0ZXMgZ2l2ZW4gYnknLFxuICAgICAgICAgICAgJ2ZvdXIgMS1kaW1lbnNpb25hbCBhcnJheXMgY29udGFpbmluZyB0aGUgYHZhbHVlYCwgYHhgLCBgeWAgYW5kIGB6YCBvZiBldmVyeSB2ZXJ0ZXgnLFxuICAgICAgICAgICAgJ29mIGEgdW5pZm9ybSBvciBub24tdW5pZm9ybSAzLUQgZ3JpZC4gSG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBzbGljZXMsIGNhcHMgYXMgd2VsbCBhcycsXG4gICAgICAgICAgICAnc3BhY2VmcmFtZSBiZXR3ZWVuIGlzby1taW4gYW5kIGlzby1tYXggdmFsdWVzIGNvdWxkIGFsc28gYmUgZHJhd24gdXNpbmcgdGhpcyB0cmFjZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVYWURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSkge1xuICAgIHZhciB4ID0gY29lcmNlKCd4Jyk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ3knKTtcbiAgICB2YXIgbGVuO1xuXG4gICAgdmFyIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2NhbGVuZGFycycsICdoYW5kbGVUcmFjZURlZmF1bHRzJyk7XG4gICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgWyd4JywgJ3knXSwgbGF5b3V0KTtcblxuICAgIGlmKHgpIHtcbiAgICAgICAgdmFyIHhsZW4gPSBMaWIubWluUm93TGVuZ3RoKHgpO1xuICAgICAgICBpZih5KSB7XG4gICAgICAgICAgICBsZW4gPSBNYXRoLm1pbih4bGVuLCBMaWIubWluUm93TGVuZ3RoKHkpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxlbiA9IHhsZW47XG4gICAgICAgICAgICBjb2VyY2UoJ3kwJyk7XG4gICAgICAgICAgICBjb2VyY2UoJ2R5Jyk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBpZigheSkgcmV0dXJuIDA7XG5cbiAgICAgICAgbGVuID0gTGliLm1pblJvd0xlbmd0aCh5KTtcbiAgICAgICAgY29lcmNlKCd4MCcpO1xuICAgICAgICBjb2VyY2UoJ2R4Jyk7XG4gICAgfVxuXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IGxlbjtcblxuICAgIHJldHVybiBsZW47XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBpc29zdXJmYWNlQXR0cnMgPSByZXF1aXJlKCcuLi9pc29zdXJmYWNlL2F0dHJpYnV0ZXMnKTtcbnZhciBzdXJmYWNlQXR0cnMgPSByZXF1aXJlKCcuLi9zdXJmYWNlL2F0dHJpYnV0ZXMnKTtcbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG52YXIgb3ZlcnJpZGVBbGwgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9lZGl0X3R5cGVzJykub3ZlcnJpZGVBbGw7XG5cbnZhciBhdHRycyA9IG1vZHVsZS5leHBvcnRzID0gb3ZlcnJpZGVBbGwoZXh0ZW5kRmxhdCh7XG4gICAgeDogaXNvc3VyZmFjZUF0dHJzLngsXG4gICAgeTogaXNvc3VyZmFjZUF0dHJzLnksXG4gICAgejogaXNvc3VyZmFjZUF0dHJzLnosXG4gICAgdmFsdWU6IGlzb3N1cmZhY2VBdHRycy52YWx1ZSxcbiAgICBpc29taW46IGlzb3N1cmZhY2VBdHRycy5pc29taW4sXG4gICAgaXNvbWF4OiBpc29zdXJmYWNlQXR0cnMuaXNvbWF4LFxuICAgIHN1cmZhY2U6IGlzb3N1cmZhY2VBdHRycy5zdXJmYWNlLFxuICAgIHNwYWNlZnJhbWU6IHtcbiAgICAgICAgc2hvdzoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogZmFsc2UsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEaXNwbGF5cy9oaWRlcyB0ZXRyYWhlZHJvbiBzaGFwZXMgYmV0d2VlbiBtaW5pbXVtIGFuZCcsXG4gICAgICAgICAgICAgICAgJ21heGltdW0gaXNvLXZhbHVlcy4gT2Z0ZW4gdXNlZnVsIHdoZW4gZWl0aGVyIGNhcHMgb3InLFxuICAgICAgICAgICAgICAgICdzdXJmYWNlcyBhcmUgZGlzYWJsZWQgb3IgZmlsbGVkIHdpdGggdmFsdWVzIGxlc3MgdGhhbiAxLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGZpbGw6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICAgIGRmbHQ6IDEsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBmaWxsIHJhdGlvIG9mIHRoZSBgc3BhY2VmcmFtZWAgZWxlbWVudHMuIFRoZSBkZWZhdWx0IGZpbGwgdmFsdWUnLFxuICAgICAgICAgICAgICAgICdpcyAxIG1lYW5pbmcgdGhhdCB0aGV5IGFyZSBlbnRpcmVseSBzaGFkZWQuIEFwcGx5aW5nIGEgYGZpbGxgIHJhdGlvIGxlc3MnLFxuICAgICAgICAgICAgICAgICd0aGFuIG9uZSB3b3VsZCBhbGxvdyB0aGUgY3JlYXRpb24gb2Ygb3BlbmluZ3MgcGFyYWxsZWwgdG8gdGhlIGVkZ2VzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgc2xpY2VzOiBpc29zdXJmYWNlQXR0cnMuc2xpY2VzLFxuICAgIGNhcHM6IGlzb3N1cmZhY2VBdHRycy5jYXBzLFxuICAgIHRleHQ6IGlzb3N1cmZhY2VBdHRycy50ZXh0LFxuICAgIGhvdmVydGV4dDogaXNvc3VyZmFjZUF0dHJzLmhvdmVydGV4dCxcbiAgICBob3ZlcnRlbXBsYXRlOiBpc29zdXJmYWNlQXR0cnMuaG92ZXJ0ZW1wbGF0ZVxufSxcblxuY29sb3JTY2FsZUF0dHJzKCcnLCB7XG4gICAgY29sb3JBdHRyOiAnYHZhbHVlYCcsXG4gICAgc2hvd1NjYWxlRGZsdDogdHJ1ZSxcbiAgICBlZGl0VHlwZU92ZXJyaWRlOiAnY2FsYydcbn0pLCB7XG5cbiAgICBjb2xvcmJhcjogaXNvc3VyZmFjZUF0dHJzLmNvbG9yYmFyLFxuICAgIG9wYWNpdHk6IGlzb3N1cmZhY2VBdHRycy5vcGFjaXR5LFxuICAgIG9wYWNpdHlzY2FsZTogc3VyZmFjZUF0dHJzLm9wYWNpdHlzY2FsZSxcblxuICAgIGxpZ2h0cG9zaXRpb246IGlzb3N1cmZhY2VBdHRycy5saWdodHBvc2l0aW9uLFxuICAgIGxpZ2h0aW5nOiBpc29zdXJmYWNlQXR0cnMubGlnaHRpbmcsXG4gICAgZmxhdHNoYWRpbmc6IGlzb3N1cmZhY2VBdHRycy5mbGF0c2hhZGluZyxcbiAgICBjb250b3VyOiBpc29zdXJmYWNlQXR0cnMuY29udG91cixcblxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbyksXG4gICAgc2hvd2xlZ2VuZDogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLnNob3dsZWdlbmQsIHtkZmx0OiBmYWxzZX0pXG59KSwgJ2NhbGMnLCAnbmVzdGVkJyk7XG5cbmF0dHJzLnguZWRpdFR5cGUgPSBhdHRycy55LmVkaXRUeXBlID0gYXR0cnMuei5lZGl0VHlwZSA9IGF0dHJzLnZhbHVlLmVkaXRUeXBlID0gJ2NhbGMrY2xlYXJBeGlzVHlwZXMnO1xuYXR0cnMudHJhbnNmb3JtcyA9IHVuZGVmaW5lZDtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNyZWF0ZU1lc2ggPSByZXF1aXJlKCdnbC1tZXNoM2QnKTtcblxudmFyIHBhcnNlQ29sb3JTY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9nbF9mb3JtYXRfY29sb3InKS5wYXJzZUNvbG9yU2NhbGU7XG52YXIgc3RyMlJnYmFBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zdHIycmdiYXJyYXknKTtcbnZhciBleHRyYWN0T3B0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZScpLmV4dHJhY3RPcHRzO1xudmFyIHppcDMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9nbDNkL3ppcDMnKTtcblxudmFyIGZpbmROZWFyZXN0T25BeGlzID0gcmVxdWlyZSgnLi4vaXNvc3VyZmFjZS9jb252ZXJ0JykuZmluZE5lYXJlc3RPbkF4aXM7XG52YXIgZ2VuZXJhdGVJc29NZXNoZXMgPSByZXF1aXJlKCcuLi9pc29zdXJmYWNlL2NvbnZlcnQnKS5nZW5lcmF0ZUlzb01lc2hlcztcblxuZnVuY3Rpb24gVm9sdW1lVHJhY2Uoc2NlbmUsIG1lc2gsIHVpZCkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnVpZCA9IHVpZDtcbiAgICB0aGlzLm1lc2ggPSBtZXNoO1xuICAgIHRoaXMubmFtZSA9ICcnO1xuICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gICAgdGhpcy5zaG93Q29udG91ciA9IGZhbHNlO1xufVxuXG52YXIgcHJvdG8gPSBWb2x1bWVUcmFjZS5wcm90b3R5cGU7XG5cbnByb3RvLmhhbmRsZVBpY2sgPSBmdW5jdGlvbihzZWxlY3Rpb24pIHtcbiAgICBpZihzZWxlY3Rpb24ub2JqZWN0ID09PSB0aGlzLm1lc2gpIHtcbiAgICAgICAgdmFyIHJhd0lkID0gc2VsZWN0aW9uLmRhdGEuaW5kZXg7XG5cbiAgICAgICAgdmFyIHggPSB0aGlzLmRhdGEuX21lc2hYW3Jhd0lkXTtcbiAgICAgICAgdmFyIHkgPSB0aGlzLmRhdGEuX21lc2hZW3Jhd0lkXTtcbiAgICAgICAgdmFyIHogPSB0aGlzLmRhdGEuX21lc2haW3Jhd0lkXTtcblxuICAgICAgICB2YXIgaGVpZ2h0ID0gdGhpcy5kYXRhLl9Zcy5sZW5ndGg7XG4gICAgICAgIHZhciBkZXB0aCA9IHRoaXMuZGF0YS5fWnMubGVuZ3RoO1xuXG4gICAgICAgIHZhciBpID0gZmluZE5lYXJlc3RPbkF4aXMoeCwgdGhpcy5kYXRhLl9YcykuaWQ7XG4gICAgICAgIHZhciBqID0gZmluZE5lYXJlc3RPbkF4aXMoeSwgdGhpcy5kYXRhLl9ZcykuaWQ7XG4gICAgICAgIHZhciBrID0gZmluZE5lYXJlc3RPbkF4aXMoeiwgdGhpcy5kYXRhLl9acykuaWQ7XG5cbiAgICAgICAgdmFyIHNlbGVjdEluZGV4ID0gc2VsZWN0aW9uLmluZGV4ID0gayArIGRlcHRoICogaiArIGRlcHRoICogaGVpZ2h0ICogaTtcblxuICAgICAgICBzZWxlY3Rpb24udHJhY2VDb29yZGluYXRlID0gW1xuICAgICAgICAgICAgdGhpcy5kYXRhLl9tZXNoWFtzZWxlY3RJbmRleF0sXG4gICAgICAgICAgICB0aGlzLmRhdGEuX21lc2hZW3NlbGVjdEluZGV4XSxcbiAgICAgICAgICAgIHRoaXMuZGF0YS5fbWVzaFpbc2VsZWN0SW5kZXhdLFxuICAgICAgICAgICAgdGhpcy5kYXRhLl92YWx1ZVtzZWxlY3RJbmRleF1cbiAgICAgICAgXTtcblxuICAgICAgICB2YXIgdGV4dCA9IHRoaXMuZGF0YS5ob3ZlcnRleHQgfHwgdGhpcy5kYXRhLnRleHQ7XG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkodGV4dCkgJiYgdGV4dFtzZWxlY3RJbmRleF0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uLnRleHRMYWJlbCA9IHRleHRbc2VsZWN0SW5kZXhdO1xuICAgICAgICB9IGVsc2UgaWYodGV4dCkge1xuICAgICAgICAgICAgc2VsZWN0aW9uLnRleHRMYWJlbCA9IHRleHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG59O1xuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgdmFyIHNjZW5lID0gdGhpcy5zY2VuZTtcbiAgICB2YXIgbGF5b3V0ID0gc2NlbmUuZnVsbFNjZW5lTGF5b3V0O1xuXG4gICAgdGhpcy5kYXRhID0gZ2VuZXJhdGVJc29NZXNoZXMoZGF0YSk7XG5cbiAgICAvLyBVbnBhY2sgcG9zaXRpb24gZGF0YVxuICAgIGZ1bmN0aW9uIHRvRGF0YUNvb3JkcyhheGlzLCBjb29yZCwgc2NhbGUsIGNhbGVuZGFyKSB7XG4gICAgICAgIHJldHVybiBjb29yZC5tYXAoZnVuY3Rpb24oeCkge1xuICAgICAgICAgICAgcmV0dXJuIGF4aXMuZDJsKHgsIDAsIGNhbGVuZGFyKSAqIHNjYWxlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB2YXIgcG9zaXRpb25zID0gemlwMyhcbiAgICAgICAgdG9EYXRhQ29vcmRzKGxheW91dC54YXhpcywgZGF0YS5fbWVzaFgsIHNjZW5lLmRhdGFTY2FsZVswXSwgZGF0YS54Y2FsZW5kYXIpLFxuICAgICAgICB0b0RhdGFDb29yZHMobGF5b3V0LnlheGlzLCBkYXRhLl9tZXNoWSwgc2NlbmUuZGF0YVNjYWxlWzFdLCBkYXRhLnljYWxlbmRhciksXG4gICAgICAgIHRvRGF0YUNvb3JkcyhsYXlvdXQuemF4aXMsIGRhdGEuX21lc2haLCBzY2VuZS5kYXRhU2NhbGVbMl0sIGRhdGEuemNhbGVuZGFyKSk7XG5cbiAgICB2YXIgY2VsbHMgPSB6aXAzKGRhdGEuX21lc2hJLCBkYXRhLl9tZXNoSiwgZGF0YS5fbWVzaEspO1xuXG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgcG9zaXRpb25zOiBwb3NpdGlvbnMsXG4gICAgICAgIGNlbGxzOiBjZWxscyxcbiAgICAgICAgbGlnaHRQb3NpdGlvbjogW2RhdGEubGlnaHRwb3NpdGlvbi54LCBkYXRhLmxpZ2h0cG9zaXRpb24ueSwgZGF0YS5saWdodHBvc2l0aW9uLnpdLFxuICAgICAgICBhbWJpZW50OiBkYXRhLmxpZ2h0aW5nLmFtYmllbnQsXG4gICAgICAgIGRpZmZ1c2U6IGRhdGEubGlnaHRpbmcuZGlmZnVzZSxcbiAgICAgICAgc3BlY3VsYXI6IGRhdGEubGlnaHRpbmcuc3BlY3VsYXIsXG4gICAgICAgIHJvdWdobmVzczogZGF0YS5saWdodGluZy5yb3VnaG5lc3MsXG4gICAgICAgIGZyZXNuZWw6IGRhdGEubGlnaHRpbmcuZnJlc25lbCxcbiAgICAgICAgdmVydGV4Tm9ybWFsc0Vwc2lsb246IGRhdGEubGlnaHRpbmcudmVydGV4bm9ybWFsc2Vwc2lsb24sXG4gICAgICAgIGZhY2VOb3JtYWxzRXBzaWxvbjogZGF0YS5saWdodGluZy5mYWNlbm9ybWFsc2Vwc2lsb24sXG4gICAgICAgIG9wYWNpdHk6IGRhdGEub3BhY2l0eSxcbiAgICAgICAgb3BhY2l0eXNjYWxlOiBkYXRhLm9wYWNpdHlzY2FsZSxcbiAgICAgICAgY29udG91ckVuYWJsZTogZGF0YS5jb250b3VyLnNob3csXG4gICAgICAgIGNvbnRvdXJDb2xvcjogc3RyMlJnYmFBcnJheShkYXRhLmNvbnRvdXIuY29sb3IpLnNsaWNlKDAsIDMpLFxuICAgICAgICBjb250b3VyV2lkdGg6IGRhdGEuY29udG91ci53aWR0aCxcbiAgICAgICAgdXNlRmFjZXROb3JtYWxzOiBkYXRhLmZsYXRzaGFkaW5nXG4gICAgfTtcblxuICAgIHZhciBjT3B0cyA9IGV4dHJhY3RPcHRzKGRhdGEpO1xuICAgIGNvbmZpZy52ZXJ0ZXhJbnRlbnNpdHkgPSBkYXRhLl9tZXNoSW50ZW5zaXR5O1xuICAgIGNvbmZpZy52ZXJ0ZXhJbnRlbnNpdHlCb3VuZHMgPSBbY09wdHMubWluLCBjT3B0cy5tYXhdO1xuICAgIGNvbmZpZy5jb2xvcm1hcCA9IHBhcnNlQ29sb3JTY2FsZShkYXRhKTtcblxuICAgIC8vIFVwZGF0ZSBtZXNoXG4gICAgdGhpcy5tZXNoLnVwZGF0ZShjb25maWcpO1xufTtcblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2NlbmUuZ2xwbG90LnJlbW92ZSh0aGlzLm1lc2gpO1xuICAgIHRoaXMubWVzaC5kaXNwb3NlKCk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVWb2x1bWVUcmFjZShzY2VuZSwgZGF0YSkge1xuICAgIHZhciBnbCA9IHNjZW5lLmdscGxvdC5nbDtcbiAgICB2YXIgbWVzaCA9IGNyZWF0ZU1lc2goe2dsOiBnbH0pO1xuICAgIHZhciByZXN1bHQgPSBuZXcgVm9sdW1lVHJhY2Uoc2NlbmUsIG1lc2gsIGRhdGEudWlkKTtcblxuICAgIG1lc2guX3RyYWNlID0gcmVzdWx0O1xuICAgIHJlc3VsdC51cGRhdGUoZGF0YSk7XG4gICAgc2NlbmUuZ2xwbG90LmFkZChtZXNoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVZvbHVtZVRyYWNlO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xudmFyIHN1cHBseUlzb0RlZmF1bHRzID0gcmVxdWlyZSgnLi4vaXNvc3VyZmFjZS9kZWZhdWx0cycpLnN1cHBseUlzb0RlZmF1bHRzO1xudmFyIG9wYWNpdHlzY2FsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vc3VyZmFjZS9kZWZhdWx0cycpLm9wYWNpdHlzY2FsZURlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBzdXBwbHlJc29EZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSk7XG5cbiAgICBvcGFjaXR5c2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuLi9pc29zdXJmYWNlL2NhbGMnKSxcbiAgICBjb2xvcmJhcjoge1xuICAgICAgICBtaW46ICdjbWluJyxcbiAgICAgICAgbWF4OiAnY21heCdcbiAgICB9LFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vY29udmVydCcpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAndm9sdW1lJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvZ2wzZCcpLFxuICAgIGNhdGVnb3JpZXM6IFsnZ2wzZCcsICdzaG93TGVnZW5kJ10sXG4gICAgbWV0YToge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RyYXdzIHZvbHVtZSB0cmFjZSBiZXR3ZWVuIGlzby1taW4gYW5kIGlzby1tYXggdmFsdWVzIHdpdGggY29vcmRpbmF0ZXMgZ2l2ZW4gYnknLFxuICAgICAgICAgICAgJ2ZvdXIgMS1kaW1lbnNpb25hbCBhcnJheXMgY29udGFpbmluZyB0aGUgYHZhbHVlYCwgYHhgLCBgeWAgYW5kIGB6YCBvZiBldmVyeSB2ZXJ0ZXgnLFxuICAgICAgICAgICAgJ29mIGEgdW5pZm9ybSBvciBub24tdW5pZm9ybSAzLUQgZ3JpZC4gSG9yaXpvbnRhbCBvciB2ZXJ0aWNhbCBzbGljZXMsIGNhcHMgYXMgd2VsbCBhcycsXG4gICAgICAgICAgICAnc3BhY2VmcmFtZSBiZXR3ZWVuIGlzby1taW4gYW5kIGlzby1tYXggdmFsdWVzIGNvdWxkIGFsc28gYmUgZHJhd24gdXNpbmcgdGhpcyB0cmFjZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=