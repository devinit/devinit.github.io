(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_isosurface_calc_js-node_modules_plotly_js_src_trace-da3771"],{

/***/ "./node_modules/plotly.js/src/traces/isosurface/attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/isosurface/attributes.js ***!
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



var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var meshAttrs = __webpack_require__(/*! ../mesh3d/attributes */ "./node_modules/plotly.js/src/traces/mesh3d/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

function makeSliceAttr(axLetter) {
    return {
        show: {
            valType: 'boolean',
            role: 'info',
            dflt: false,
            description: [
                'Determines whether or not slice planes about the', axLetter,
                'dimension are drawn.'
            ].join(' ')
        },
        locations: {
            valType: 'data_array',
            dflt: [],
            role: 'info',
            description: [
                'Specifies the location(s) of slices on the axis.',
                'When not specified slices would be created for',
                'all points of the axis', axLetter, 'except start and end.'
            ].join(' ')
        },
        fill: {
            valType: 'number',
            role: 'style',
            min: 0,
            max: 1,
            dflt: 1,
            description: [
                'Sets the fill ratio of the `slices`. The default fill value of the',
                '`slices` is 1 meaning that they are entirely shaded. On the other hand',
                'Applying a `fill` ratio less than one would allow the creation of',
                'openings parallel to the edges.'
            ].join(' ')
        }
    };
}

function makeCapAttr(axLetter) {
    return {
        show: {
            valType: 'boolean',
            role: 'info',
            dflt: true,
            description: [
                'Sets the fill ratio of the `slices`. The default fill value of the', axLetter,
                '`slices` is 1 meaning that they are entirely shaded. On the other hand',
                'Applying a `fill` ratio less than one would allow the creation of',
                'openings parallel to the edges.'
            ].join(' ')
        },
        fill: {
            valType: 'number',
            role: 'style',
            min: 0,
            max: 1,
            dflt: 1,
            description: [
                'Sets the fill ratio of the `caps`. The default fill value of the',
                '`caps` is 1 meaning that they are entirely shaded. On the other hand',
                'Applying a `fill` ratio less than one would allow the creation of',
                'openings parallel to the edges.'
            ].join(' ')
        }
    };
}

var attrs = module.exports = overrideAll(extendFlat({
    x: {
        valType: 'data_array',
        role: 'info',
        description: [
            'Sets the X coordinates of the vertices on X axis.'
        ].join(' ')
    },
    y: {
        valType: 'data_array',
        role: 'info',
        description: [
            'Sets the Y coordinates of the vertices on Y axis.'
        ].join(' ')
    },
    z: {
        valType: 'data_array',
        role: 'info',
        description: [
            'Sets the Z coordinates of the vertices on Z axis.'
        ].join(' ')
    },
    value: {
        valType: 'data_array',
        role: 'info',
        description: [
            'Sets the 4th dimension (value) of the vertices.'
        ].join(' ')
    },
    isomin: {
        valType: 'number',
        role: 'info',
        description: [
            'Sets the minimum boundary for iso-surface plot.'
        ].join(' ')
    },
    isomax: {
        valType: 'number',
        role: 'info',
        description: [
            'Sets the maximum boundary for iso-surface plot.'
        ].join(' ')
    },

    surface: {
        show: {
            valType: 'boolean',
            role: 'info',
            dflt: true,
            description: [
                'Hides/displays surfaces between minimum and maximum iso-values.'
            ].join(' ')
        },
        count: {
            valType: 'integer',
            role: 'info',
            dflt: 2,
            min: 1,
            description: [
                'Sets the number of iso-surfaces between minimum and maximum iso-values.',
                'By default this value is 2 meaning that only minimum and maximum surfaces',
                'would be drawn.'
            ].join(' ')
        },
        fill: {
            valType: 'number',
            role: 'style',
            min: 0,
            max: 1,
            dflt: 1,
            description: [
                'Sets the fill ratio of the iso-surface. The default fill value of the',
                'surface is 1 meaning that they are entirely shaded. On the other hand',
                'Applying a `fill` ratio less than one would allow the creation of',
                'openings parallel to the edges.'
            ].join(' ')
        },
        pattern: {
            valType: 'flaglist',
            flags: ['A', 'B', 'C', 'D', 'E'],
            extras: ['all', 'odd', 'even'],
            dflt: 'all',
            role: 'style',
            description: [
                'Sets the surface pattern of the iso-surface 3-D sections. The default pattern of',
                'the surface is `all` meaning that the rest of surface elements would be shaded.',
                'The check options (either 1 or 2) could be used to draw half of the squares',
                'on the surface. Using various combinations of capital `A`, `B`, `C`, `D` and `E`',
                'may also be used to reduce the number of triangles on the iso-surfaces and',
                'creating other patterns of interest.'
            ].join(' ')
        }
    },

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
            dflt: 0.15,
            description: [
                'Sets the fill ratio of the `spaceframe` elements. The default fill value',
                'is 0.15 meaning that only 15% of the area of every faces of tetras would be',
                'shaded. Applying a greater `fill` ratio would allow the creation of stronger',
                'elements or could be sued to have entirely closed areas (in case of using 1).'
            ].join(' ')
        }
    },

    slices: {
        x: makeSliceAttr('x'),
        y: makeSliceAttr('y'),
        z: makeSliceAttr('z')
    },

    caps: {
        x: makeCapAttr('x'),
        y: makeCapAttr('y'),
        z: makeCapAttr('z')
    },

    text: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        description: [
            'Sets the text elements associated with the vertices.',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    },
    hovertext: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        description: 'Same as `text`.'
    },
    hovertemplate: hovertemplateAttrs(),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
},

colorScaleAttrs('', {
    colorAttr: '`value`',
    showScaleDflt: true,
    editTypeOverride: 'calc'
}), {
    opacity: meshAttrs.opacity,
    lightposition: meshAttrs.lightposition,
    lighting: meshAttrs.lighting,
    flatshading: meshAttrs.flatshading,
    contour: meshAttrs.contour,

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo)
}), 'calc', 'nested');

// required defaults to speed up surface normal calculations
attrs.flatshading.dflt = true; attrs.lighting.facenormalsepsilon.dflt = 0;

attrs.x.editType = attrs.y.editType = attrs.z.editType = attrs.value.editType = 'calc+clearAxisTypes';
attrs.transforms = undefined;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/isosurface/calc.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/isosurface/calc.js ***!
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



var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");
var processGrid = __webpack_require__(/*! ../streamtube/calc */ "./node_modules/plotly.js/src/traces/streamtube/calc.js").processGrid;
var filter = __webpack_require__(/*! ../streamtube/calc */ "./node_modules/plotly.js/src/traces/streamtube/calc.js").filter;

module.exports = function calc(gd, trace) {
    trace._len = Math.min(
        trace.x.length,
        trace.y.length,
        trace.z.length,
        trace.value.length
    );

    trace._x = filter(trace.x, trace._len);
    trace._y = filter(trace.y, trace._len);
    trace._z = filter(trace.z, trace._len);
    trace._value = filter(trace.value, trace._len);

    var grid = processGrid(trace);
    trace._gridFill = grid.fill;
    trace._Xs = grid.Xs;
    trace._Ys = grid.Ys;
    trace._Zs = grid.Zs;
    trace._len = grid.len;

    var min = Infinity;
    var max = -Infinity;
    for(var i = 0; i < trace._len; i++) {
        var v = trace._value[i];
        min = Math.min(min, v);
        max = Math.max(max, v);
    }

    trace._minValues = min;
    trace._maxValues = max;
    trace._vMin = (trace.isomin === undefined || trace.isomin === null) ? min : trace.isomin;
    trace._vMax = (trace.isomax === undefined || trace.isomin === null) ? max : trace.isomax;

    colorscaleCalc(gd, trace, {
        vals: [trace._vMin, trace._vMax],
        containerStr: '',
        cLetter: 'c'
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/isosurface/convert.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/isosurface/convert.js ***!
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



var createMesh = __webpack_require__(/*! gl-mesh3d */ "./node_modules/gl-mesh3d/mesh.js");
var parseColorScale = __webpack_require__(/*! ../../lib/gl_format_color */ "./node_modules/plotly.js/src/lib/gl_format_color.js").parseColorScale;
var str2RgbaArray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");
var extractOpts = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").extractOpts;
var zip3 = __webpack_require__(/*! ../../plots/gl3d/zip3 */ "./node_modules/plotly.js/src/plots/gl3d/zip3.js");

var findNearestOnAxis = function(w, arr) {
    for(var q = arr.length - 1; q > 0; q--) {
        var min = Math.min(arr[q], arr[q - 1]);
        var max = Math.max(arr[q], arr[q - 1]);
        if(max > min && min < w && w <= max) {
            return {
                id: q,
                distRatio: (max - w) / (max - min)
            };
        }
    }
    return {
        id: 0,
        distRatio: 0
    };
};

function IsosurfaceTrace(scene, mesh, uid) {
    this.scene = scene;
    this.uid = uid;
    this.mesh = mesh;
    this.name = '';
    this.data = null;
    this.showContour = false;
}

var proto = IsosurfaceTrace.prototype;

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

var GRID_TYPES = ['xyz', 'xzy', 'yxz', 'yzx', 'zxy', 'zyx'];

function generateIsoMeshes(data) {
    data._meshI = [];
    data._meshJ = [];
    data._meshK = [];

    var showSurface = data.surface.show;
    var showSpaceframe = data.spaceframe.show;

    var surfaceFill = data.surface.fill;
    var spaceframeFill = data.spaceframe.fill;

    var drawingSurface = false;
    var drawingSpaceframe = false;

    var numFaces = 0;
    var numVertices;
    var beginVertextLength;

    var Xs = data._Xs;
    var Ys = data._Ys;
    var Zs = data._Zs;

    var width = Xs.length;
    var height = Ys.length;
    var depth = Zs.length;

    var filled = GRID_TYPES.indexOf(data._gridFill.replace(/-/g, '').replace(/\+/g, ''));

    var getIndex = function(i, j, k) {
        switch(filled) {
            case 5: // 'zyx'
                return k + depth * j + depth * height * i;
            case 4: // 'zxy'
                return k + depth * i + depth * width * j;
            case 3: // 'yzx'
                return j + height * k + height * depth * i;
            case 2: // 'yxz'
                return j + height * i + height * width * k;
            case 1: // 'xzy'
                return i + width * k + width * depth * j;
            default: // case 0: // 'xyz'
                return i + width * j + width * height * k;
        }
    };

    var minValues = data._minValues;
    var maxValues = data._maxValues;

    var vMin = data._vMin;
    var vMax = data._vMax;

    var allXs;
    var allYs;
    var allZs;
    var allVs;

    function findVertexId(x, y, z) {
        // could be used to find the vertex id of previously generated vertex within the group

        var len = allVs.length;
        for(var f = beginVertextLength; f < len; f++) {
            if(
                x === allXs[f] &&
                y === allYs[f] &&
                z === allZs[f]
            ) {
                return f;
            }
        }
        return -1;
    }

    function beginGroup() {
        beginVertextLength = numVertices;
    }

    function emptyVertices() {
        allXs = [];
        allYs = [];
        allZs = [];
        allVs = [];
        numVertices = 0;

        beginGroup();
    }

    function addVertex(x, y, z, v) {
        allXs.push(x);
        allYs.push(y);
        allZs.push(z);
        allVs.push(v);
        numVertices++;

        return numVertices - 1;
    }

    function addFace(a, b, c) {
        data._meshI.push(a);
        data._meshJ.push(b);
        data._meshK.push(c);
        numFaces++;

        return numFaces - 1;
    }

    function getCenter(A, B, C) {
        var M = [];
        for(var i = 0; i < A.length; i++) {
            M[i] = (A[i] + B[i] + C[i]) / 3.0;
        }
        return M;
    }

    function getBetween(A, B, r) {
        var M = [];
        for(var i = 0; i < A.length; i++) {
            M[i] = A[i] * (1 - r) + r * B[i];
        }
        return M;
    }

    var activeFill;
    function setFill(fill) {
        activeFill = fill;
    }

    function createOpenTri(xyzv, abc) {
        var A = xyzv[0];
        var B = xyzv[1];
        var C = xyzv[2];
        var G = getCenter(A, B, C);

        var r = Math.sqrt(1 - activeFill);
        var p1 = getBetween(G, A, r);
        var p2 = getBetween(G, B, r);
        var p3 = getBetween(G, C, r);

        var a = abc[0];
        var b = abc[1];
        var c = abc[2];

        return {
            xyzv: [
                [A, B, p2], [p2, p1, A],
                [B, C, p3], [p3, p2, B],
                [C, A, p1], [p1, p3, C]
            ],
            abc: [
                [a, b, -1], [-1, -1, a],
                [b, c, -1], [-1, -1, b],
                [c, a, -1], [-1, -1, c]
            ]
        };
    }

    function styleIncludes(style, char) {
        if(style === 'all' || style === null) return true;
        return (style.indexOf(char) > -1);
    }

    function mapValue(style, value) {
        if(style === null) return value;
        return style;
    }

    function drawTri(style, xyzv, abc) {
        beginGroup();

        var allXYZVs = [xyzv];
        var allABCs = [abc];
        if(activeFill >= 1) {
            allXYZVs = [xyzv];
            allABCs = [abc];
        } else if(activeFill > 0) {
            var openTri = createOpenTri(xyzv, abc);
            allXYZVs = openTri.xyzv;
            allABCs = openTri.abc;
        }

        for(var f = 0; f < allXYZVs.length; f++) {
            xyzv = allXYZVs[f];
            abc = allABCs[f];

            var pnts = [];
            for(var i = 0; i < 3; i++) {
                var x = xyzv[i][0];
                var y = xyzv[i][1];
                var z = xyzv[i][2];
                var v = xyzv[i][3];

                var id = (abc[i] > -1) ? abc[i] : findVertexId(x, y, z);
                if(id > -1) {
                    pnts[i] = id;
                } else {
                    pnts[i] = addVertex(x, y, z, mapValue(style, v));
                }
            }

            addFace(pnts[0], pnts[1], pnts[2]);
        }
    }

    function drawQuad(style, xyzv, abcd) {
        var makeTri = function(i, j, k) {
            drawTri(style, [xyzv[i], xyzv[j], xyzv[k]], [abcd[i], abcd[j], abcd[k]]);
        };

        makeTri(0, 1, 2);
        makeTri(2, 3, 0);
    }

    function drawTetra(style, xyzv, abcd) {
        var makeTri = function(i, j, k) {
            drawTri(style, [xyzv[i], xyzv[j], xyzv[k]], [abcd[i], abcd[j], abcd[k]]);
        };

        makeTri(0, 1, 2);
        makeTri(3, 0, 1);
        makeTri(2, 3, 0);
        makeTri(1, 2, 3);
    }

    function calcIntersection(pointOut, pointIn, min, max) {
        var value = pointOut[3];

        if(value < min) value = min;
        if(value > max) value = max;

        var ratio = (pointOut[3] - value) / (pointOut[3] - pointIn[3] + 0.000000001); // we had to add this error to force solve the tiny caps

        var result = [];
        for(var s = 0; s < 4; s++) {
            result[s] = (1 - ratio) * pointOut[s] + ratio * pointIn[s];
        }
        return result;
    }

    function inRange(value, min, max) {
        return (
            value >= min &&
            value <= max
        );
    }

    function almostInFinalRange(value) {
        var vErr = 0.001 * (vMax - vMin);
        return (
            value >= vMin - vErr &&
            value <= vMax + vErr
        );
    }

    function getXYZV(indecies) {
        var xyzv = [];
        for(var q = 0; q < 4; q++) {
            var index = indecies[q];
            xyzv.push(
                [
                    data._x[index],
                    data._y[index],
                    data._z[index],
                    data._value[index]
                ]
            );
        }

        return xyzv;
    }

    var MAX_PASS = 3;

    function tryCreateTri(style, xyzv, abc, min, max, nPass) {
        if(!nPass) nPass = 1;

        abc = [-1, -1, -1]; // Note: for the moment we override indices
        // to run faster! But it is possible to comment this line
        // to reduce the number of vertices.

        var result = false;

        var ok = [
            inRange(xyzv[0][3], min, max),
            inRange(xyzv[1][3], min, max),
            inRange(xyzv[2][3], min, max)
        ];

        if(!ok[0] && !ok[1] && !ok[2]) {
            return false;
        }

        var tryDrawTri = function(style, xyzv, abc) {
            if( // we check here if the points are in `real` iso-min/max range
                almostInFinalRange(xyzv[0][3]) &&
                almostInFinalRange(xyzv[1][3]) &&
                almostInFinalRange(xyzv[2][3])
            ) {
                drawTri(style, xyzv, abc);
                return true;
            } else if(nPass < MAX_PASS) {
                return tryCreateTri(style, xyzv, abc, vMin, vMax, ++nPass); // i.e. second pass using actual vMin vMax bounds
            }
            return false;
        };

        if(ok[0] && ok[1] && ok[2]) {
            return tryDrawTri(style, xyzv, abc) || result;
        }

        var interpolated = false;

        [
            [0, 1, 2],
            [2, 0, 1],
            [1, 2, 0]
        ].forEach(function(e) {
            if(ok[e[0]] && ok[e[1]] && !ok[e[2]]) {
                var A = xyzv[e[0]];
                var B = xyzv[e[1]];
                var C = xyzv[e[2]];

                var p1 = calcIntersection(C, A, min, max);
                var p2 = calcIntersection(C, B, min, max);

                result = tryDrawTri(style, [p2, p1, A], [-1, -1, abc[e[0]]]) || result;
                result = tryDrawTri(style, [A, B, p2], [abc[e[0]], abc[e[1]], -1]) || result;

                interpolated = true;
            }
        });
        if(interpolated) return result;

        [
            [0, 1, 2],
            [1, 2, 0],
            [2, 0, 1]
        ].forEach(function(e) {
            if(ok[e[0]] && !ok[e[1]] && !ok[e[2]]) {
                var A = xyzv[e[0]];
                var B = xyzv[e[1]];
                var C = xyzv[e[2]];

                var p1 = calcIntersection(B, A, min, max);
                var p2 = calcIntersection(C, A, min, max);

                result = tryDrawTri(style, [p2, p1, A], [-1, -1, abc[e[0]]]) || result;

                interpolated = true;
            }
        });
        return result;
    }

    function tryCreateTetra(style, abcd, min, max) {
        var result = false;

        var xyzv = getXYZV(abcd);

        var ok = [
            inRange(xyzv[0][3], min, max),
            inRange(xyzv[1][3], min, max),
            inRange(xyzv[2][3], min, max),
            inRange(xyzv[3][3], min, max)
        ];

        if(!ok[0] && !ok[1] && !ok[2] && !ok[3]) {
            return result;
        }

        if(ok[0] && ok[1] && ok[2] && ok[3]) {
            if(drawingSpaceframe) {
                result = drawTetra(style, xyzv, abcd) || result;
            }
            return result;
        }

        var interpolated = false;

        [
            [0, 1, 2, 3],
            [3, 0, 1, 2],
            [2, 3, 0, 1],
            [1, 2, 3, 0]
        ].forEach(function(e) {
            if(ok[e[0]] && ok[e[1]] && ok[e[2]] && !ok[e[3]]) {
                var A = xyzv[e[0]];
                var B = xyzv[e[1]];
                var C = xyzv[e[2]];
                var D = xyzv[e[3]];

                if(drawingSpaceframe) {
                    result = drawTri(style, [A, B, C], [abcd[e[0]], abcd[e[1]], abcd[e[2]]]) || result;
                } else {
                    var p1 = calcIntersection(D, A, min, max);
                    var p2 = calcIntersection(D, B, min, max);
                    var p3 = calcIntersection(D, C, min, max);

                    result = drawTri(null, [p1, p2, p3], [-1, -1, -1]) || result;
                }

                interpolated = true;
            }
        });
        if(interpolated) return result;

        [
            [0, 1, 2, 3],
            [1, 2, 3, 0],
            [2, 3, 0, 1],
            [3, 0, 1, 2],
            [0, 2, 3, 1],
            [1, 3, 2, 0]
        ].forEach(function(e) {
            if(ok[e[0]] && ok[e[1]] && !ok[e[2]] && !ok[e[3]]) {
                var A = xyzv[e[0]];
                var B = xyzv[e[1]];
                var C = xyzv[e[2]];
                var D = xyzv[e[3]];

                var p1 = calcIntersection(C, A, min, max);
                var p2 = calcIntersection(C, B, min, max);
                var p3 = calcIntersection(D, B, min, max);
                var p4 = calcIntersection(D, A, min, max);

                if(drawingSpaceframe) {
                    result = drawTri(style, [A, p4, p1], [abcd[e[0]], -1, -1]) || result;
                    result = drawTri(style, [B, p2, p3], [abcd[e[1]], -1, -1]) || result;
                } else {
                    result = drawQuad(null, [p1, p2, p3, p4], [-1, -1, -1, -1]) || result;
                }

                interpolated = true;
            }
        });
        if(interpolated) return result;

        [
            [0, 1, 2, 3],
            [1, 2, 3, 0],
            [2, 3, 0, 1],
            [3, 0, 1, 2]
        ].forEach(function(e) {
            if(ok[e[0]] && !ok[e[1]] && !ok[e[2]] && !ok[e[3]]) {
                var A = xyzv[e[0]];
                var B = xyzv[e[1]];
                var C = xyzv[e[2]];
                var D = xyzv[e[3]];

                var p1 = calcIntersection(B, A, min, max);
                var p2 = calcIntersection(C, A, min, max);
                var p3 = calcIntersection(D, A, min, max);

                if(drawingSpaceframe) {
                    result = drawTri(style, [A, p1, p2], [abcd[e[0]], -1, -1]) || result;
                    result = drawTri(style, [A, p2, p3], [abcd[e[0]], -1, -1]) || result;
                    result = drawTri(style, [A, p3, p1], [abcd[e[0]], -1, -1]) || result;
                } else {
                    result = drawTri(null, [p1, p2, p3], [-1, -1, -1]) || result;
                }

                interpolated = true;
            }
        });
        return result;
    }

    function addCube(style, p000, p001, p010, p011, p100, p101, p110, p111, min, max) {
        var result = false;

        if(drawingSurface) {
            if(styleIncludes(style, 'A')) {
                result = tryCreateTetra(null, [p000, p001, p010, p100], min, max) || result;
            }
            if(styleIncludes(style, 'B')) {
                result = tryCreateTetra(null, [p001, p010, p011, p111], min, max) || result;
            }
            if(styleIncludes(style, 'C')) {
                result = tryCreateTetra(null, [p001, p100, p101, p111], min, max) || result;
            }
            if(styleIncludes(style, 'D')) {
                result = tryCreateTetra(null, [p010, p100, p110, p111], min, max) || result;
            }
            if(styleIncludes(style, 'E')) {
                result = tryCreateTetra(null, [p001, p010, p100, p111], min, max) || result;
            }
        }

        if(drawingSpaceframe) {
            result = tryCreateTetra(style, [p001, p010, p100, p111], min, max) || result;
        }

        return result;
    }

    function addRect(style, a, b, c, d, min, max, previousResult) {
        return [
            (previousResult[0] === true) ? true :
            tryCreateTri(style, getXYZV([a, b, c]), [a, b, c], min, max),
            (previousResult[1] === true) ? true :
            tryCreateTri(style, getXYZV([c, d, a]), [c, d, a], min, max)
        ];
    }

    function begin2dCell(style, p00, p01, p10, p11, min, max, isEven, previousResult) {
        // used to create caps and/or slices on exact axis points
        if(isEven) {
            return addRect(style, p00, p01, p11, p10, min, max, previousResult);
        } else {
            return addRect(style, p01, p11, p10, p00, min, max, previousResult);
        }
    }

    function beginSection(style, i, j, k, min, max, distRatios) {
        // used to create slices between axis points

        var result = false;
        var A, B, C, D;

        var makeSection = function() {
            result = tryCreateTri(style, [A, B, C], [-1, -1, -1], min, max) || result;
            result = tryCreateTri(style, [C, D, A], [-1, -1, -1], min, max) || result;
        };

        var rX = distRatios[0];
        var rY = distRatios[1];
        var rZ = distRatios[2];

        if(rX) {
            A = getBetween(getXYZV([getIndex(i, j - 0, k - 0)])[0], getXYZV([getIndex(i - 1, j - 0, k - 0)])[0], rX);
            B = getBetween(getXYZV([getIndex(i, j - 0, k - 1)])[0], getXYZV([getIndex(i - 1, j - 0, k - 1)])[0], rX);
            C = getBetween(getXYZV([getIndex(i, j - 1, k - 1)])[0], getXYZV([getIndex(i - 1, j - 1, k - 1)])[0], rX);
            D = getBetween(getXYZV([getIndex(i, j - 1, k - 0)])[0], getXYZV([getIndex(i - 1, j - 1, k - 0)])[0], rX);
            makeSection();
        }

        if(rY) {
            A = getBetween(getXYZV([getIndex(i - 0, j, k - 0)])[0], getXYZV([getIndex(i - 0, j - 1, k - 0)])[0], rY);
            B = getBetween(getXYZV([getIndex(i - 0, j, k - 1)])[0], getXYZV([getIndex(i - 0, j - 1, k - 1)])[0], rY);
            C = getBetween(getXYZV([getIndex(i - 1, j, k - 1)])[0], getXYZV([getIndex(i - 1, j - 1, k - 1)])[0], rY);
            D = getBetween(getXYZV([getIndex(i - 1, j, k - 0)])[0], getXYZV([getIndex(i - 1, j - 1, k - 0)])[0], rY);
            makeSection();
        }

        if(rZ) {
            A = getBetween(getXYZV([getIndex(i - 0, j - 0, k)])[0], getXYZV([getIndex(i - 0, j - 0, k - 1)])[0], rZ);
            B = getBetween(getXYZV([getIndex(i - 0, j - 1, k)])[0], getXYZV([getIndex(i - 0, j - 1, k - 1)])[0], rZ);
            C = getBetween(getXYZV([getIndex(i - 1, j - 1, k)])[0], getXYZV([getIndex(i - 1, j - 1, k - 1)])[0], rZ);
            D = getBetween(getXYZV([getIndex(i - 1, j - 0, k)])[0], getXYZV([getIndex(i - 1, j - 0, k - 1)])[0], rZ);
            makeSection();
        }

        return result;
    }

    function begin3dCell(style, p000, p001, p010, p011, p100, p101, p110, p111, min, max, isEven) {
        // used to create spaceframe and/or iso-surfaces

        var cellStyle = style;
        if(isEven) {
            if(drawingSurface && style === 'even') cellStyle = null;
            return addCube(cellStyle, p000, p001, p010, p011, p100, p101, p110, p111, min, max);
        } else {
            if(drawingSurface && style === 'odd') cellStyle = null;
            return addCube(cellStyle, p111, p110, p101, p100, p011, p010, p001, p000, min, max);
        }
    }

    function draw2dX(style, items, min, max, previousResult) {
        var result = [];
        var n = 0;
        for(var q = 0; q < items.length; q++) {
            var i = items[q];
            for(var k = 1; k < depth; k++) {
                for(var j = 1; j < height; j++) {
                    result.push(
                        begin2dCell(style,
                            getIndex(i, j - 1, k - 1),
                            getIndex(i, j - 1, k),
                            getIndex(i, j, k - 1),
                            getIndex(i, j, k),
                            min,
                            max,
                            (i + j + k) % 2,
                            (previousResult && previousResult[n]) ? previousResult[n] : []
                        )
                    );
                    n++;
                }
            }
        }
        return result;
    }

    function draw2dY(style, items, min, max, previousResult) {
        var result = [];
        var n = 0;
        for(var q = 0; q < items.length; q++) {
            var j = items[q];
            for(var i = 1; i < width; i++) {
                for(var k = 1; k < depth; k++) {
                    result.push(
                        begin2dCell(style,
                            getIndex(i - 1, j, k - 1),
                            getIndex(i, j, k - 1),
                            getIndex(i - 1, j, k),
                            getIndex(i, j, k),
                            min,
                            max,
                            (i + j + k) % 2,
                            (previousResult && previousResult[n]) ? previousResult[n] : []
                        )
                    );
                    n++;
                }
            }
        }
        return result;
    }

    function draw2dZ(style, items, min, max, previousResult) {
        var result = [];
        var n = 0;
        for(var q = 0; q < items.length; q++) {
            var k = items[q];
            for(var j = 1; j < height; j++) {
                for(var i = 1; i < width; i++) {
                    result.push(
                        begin2dCell(style,
                            getIndex(i - 1, j - 1, k),
                            getIndex(i - 1, j, k),
                            getIndex(i, j - 1, k),
                            getIndex(i, j, k),
                            min,
                            max,
                            (i + j + k) % 2,
                            (previousResult && previousResult[n]) ? previousResult[n] : []
                        )
                    );
                    n++;
                }
            }
        }
        return result;
    }

    function draw3d(style, min, max) {
        for(var k = 1; k < depth; k++) {
            for(var j = 1; j < height; j++) {
                for(var i = 1; i < width; i++) {
                    begin3dCell(style,
                        getIndex(i - 1, j - 1, k - 1),
                        getIndex(i - 1, j - 1, k),
                        getIndex(i - 1, j, k - 1),
                        getIndex(i - 1, j, k),
                        getIndex(i, j - 1, k - 1),
                        getIndex(i, j - 1, k),
                        getIndex(i, j, k - 1),
                        getIndex(i, j, k),
                        min,
                        max,
                        (i + j + k) % 2
                    );
                }
            }
        }
    }

    function drawSpaceframe(style, min, max) {
        drawingSpaceframe = true;
        draw3d(style, min, max);
        drawingSpaceframe = false;
    }

    function drawSurface(style, min, max) {
        drawingSurface = true;
        draw3d(style, min, max);
        drawingSurface = false;
    }

    function drawSectionX(style, items, min, max, distRatios, previousResult) {
        var result = [];
        var n = 0;
        for(var q = 0; q < items.length; q++) {
            var i = items[q];
            for(var k = 1; k < depth; k++) {
                for(var j = 1; j < height; j++) {
                    result.push(
                        beginSection(style, i, j, k, min, max, distRatios[q],
                            (previousResult && previousResult[n]) ? previousResult[n] : []
                        )
                    );
                    n++;
                }
            }
        }
        return result;
    }

    function drawSectionY(style, items, min, max, distRatios, previousResult) {
        var result = [];
        var n = 0;
        for(var q = 0; q < items.length; q++) {
            var j = items[q];
            for(var i = 1; i < width; i++) {
                for(var k = 1; k < depth; k++) {
                    result.push(
                        beginSection(style, i, j, k, min, max, distRatios[q],
                            (previousResult && previousResult[n]) ? previousResult[n] : []
                        )
                    );
                    n++;
                }
            }
        }
        return result;
    }

    function drawSectionZ(style, items, min, max, distRatios, previousResult) {
        var result = [];
        var n = 0;
        for(var q = 0; q < items.length; q++) {
            var k = items[q];
            for(var j = 1; j < height; j++) {
                for(var i = 1; i < width; i++) {
                    result.push(
                        beginSection(style, i, j, k, min, max, distRatios[q],
                            (previousResult && previousResult[n]) ? previousResult[n] : []
                        )
                    );
                    n++;
                }
            }
        }
        return result;
    }

    function createRange(a, b) {
        var range = [];
        for(var q = a; q < b; q++) {
            range.push(q);
        }
        return range;
    }

    function insertGridPoints() {
        for(var i = 0; i < width; i++) {
            for(var j = 0; j < height; j++) {
                for(var k = 0; k < depth; k++) {
                    var index = getIndex(i, j, k);
                    addVertex(
                        data._x[index],
                        data._y[index],
                        data._z[index],
                        data._value[index]
                    );
                }
            }
        }
    }

    function drawAll() {
        emptyVertices();

        // insert grid points
        insertGridPoints();

        var activeStyle = null;

        // draw spaceframes
        if(showSpaceframe && spaceframeFill) {
            setFill(spaceframeFill);

            drawSpaceframe(activeStyle, vMin, vMax);
        }

        // draw iso-surfaces
        if(showSurface && surfaceFill) {
            setFill(surfaceFill);

            var surfacePattern = data.surface.pattern;
            var surfaceCount = data.surface.count;
            for(var q = 0; q < surfaceCount; q++) {
                var ratio = (surfaceCount === 1) ? 0.5 : q / (surfaceCount - 1);
                var level = (1 - ratio) * vMin + ratio * vMax;

                var d1 = Math.abs(level - minValues);
                var d2 = Math.abs(level - maxValues);
                var ranges = (d1 > d2) ?
                    [minValues, level] :
                    [level, maxValues];

                drawSurface(surfacePattern, ranges[0], ranges[1]);
            }
        }

        var setupMinMax = [
            [ Math.min(vMin, maxValues), Math.max(vMin, maxValues) ],
            [ Math.min(minValues, vMax), Math.max(minValues, vMax) ]
        ];

        ['x', 'y', 'z'].forEach(function(e) {
            var preRes = [];
            for(var s = 0; s < setupMinMax.length; s++) {
                var count = 0;

                var activeMin = setupMinMax[s][0];
                var activeMax = setupMinMax[s][1];

                // draw slices
                var slice = data.slices[e];
                if(slice.show && slice.fill) {
                    setFill(slice.fill);

                    var exactIndices = [];
                    var ceilIndices = [];
                    var distRatios = [];
                    if(slice.locations.length) {
                        for(var q = 0; q < slice.locations.length; q++) {
                            var near = findNearestOnAxis(
                                slice.locations[q],
                                (e === 'x') ? Xs :
                                (e === 'y') ? Ys : Zs
                            );

                            if(near.distRatio === 0) {
                                exactIndices.push(near.id);
                            } else if(near.id > 0) {
                                ceilIndices.push(near.id);
                                if(e === 'x') {
                                    distRatios.push([near.distRatio, 0, 0]);
                                } else if(e === 'y') {
                                    distRatios.push([0, near.distRatio, 0]);
                                } else {
                                    distRatios.push([0, 0, near.distRatio]);
                                }
                            }
                        }
                    } else {
                        if(e === 'x') {
                            exactIndices = createRange(1, width - 1);
                        } else if(e === 'y') {
                            exactIndices = createRange(1, height - 1);
                        } else {
                            exactIndices = createRange(1, depth - 1);
                        }
                    }

                    if(ceilIndices.length > 0) {
                        if(e === 'x') {
                            preRes[count] = drawSectionX(activeStyle, ceilIndices, activeMin, activeMax, distRatios, preRes[count]);
                        } else if(e === 'y') {
                            preRes[count] = drawSectionY(activeStyle, ceilIndices, activeMin, activeMax, distRatios, preRes[count]);
                        } else {
                            preRes[count] = drawSectionZ(activeStyle, ceilIndices, activeMin, activeMax, distRatios, preRes[count]);
                        }
                        count++;
                    }

                    if(exactIndices.length > 0) {
                        if(e === 'x') {
                            preRes[count] = draw2dX(activeStyle, exactIndices, activeMin, activeMax, preRes[count]);
                        } else if(e === 'y') {
                            preRes[count] = draw2dY(activeStyle, exactIndices, activeMin, activeMax, preRes[count]);
                        } else {
                            preRes[count] = draw2dZ(activeStyle, exactIndices, activeMin, activeMax, preRes[count]);
                        }
                        count++;
                    }
                }

                // draw caps
                var cap = data.caps[e];
                if(cap.show && cap.fill) {
                    setFill(cap.fill);
                    if(e === 'x') {
                        preRes[count] = draw2dX(activeStyle, [0, width - 1], activeMin, activeMax, preRes[count]);
                    } else if(e === 'y') {
                        preRes[count] = draw2dY(activeStyle, [0, height - 1], activeMin, activeMax, preRes[count]);
                    } else {
                        preRes[count] = draw2dZ(activeStyle, [0, depth - 1], activeMin, activeMax, preRes[count]);
                    }
                    count++;
                }
            }
        });

        // remove vertices arrays (i.e. grid points) in case no face was created.
        if(numFaces === 0) {
            emptyVertices();
        }

        data._meshX = allXs;
        data._meshY = allYs;
        data._meshZ = allZs;
        data._meshIntensity = allVs;

        data._Xs = Xs;
        data._Ys = Ys;
        data._Zs = Zs;
    }

    drawAll();

    return data;
}

function createIsosurfaceTrace(scene, data) {
    var gl = scene.glplot.gl;
    var mesh = createMesh({gl: gl});
    var result = new IsosurfaceTrace(scene, mesh, data.uid);

    mesh._trace = result;
    result.update(data);
    scene.glplot.add(mesh);
    return result;
}

module.exports = {
    findNearestOnAxis: findNearestOnAxis,
    generateIsoMeshes: generateIsoMeshes,
    createIsosurfaceTrace: createIsosurfaceTrace,
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/isosurface/defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/isosurface/defaults.js ***!
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
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/isosurface/attributes.js");
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    supplyIsoDefaults(traceIn, traceOut, defaultColor, layout, coerce);
}

function supplyIsoDefaults(traceIn, traceOut, defaultColor, layout, coerce) {
    var isomin = coerce('isomin');
    var isomax = coerce('isomax');

    if(isomax !== undefined && isomax !== null &&
        isomin !== undefined && isomin !== null &&
         isomin > isomax) {
        // applying default values in this case:
        traceOut.isomin = null;
        traceOut.isomax = null;
    }

    var x = coerce('x');
    var y = coerce('y');
    var z = coerce('z');
    var value = coerce('value');

    if(
        !x || !x.length ||
        !y || !y.length ||
        !z || !z.length ||
        !value || !value.length
    ) {
        traceOut.visible = false;
        return;
    }

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y', 'z'], layout);

    ['x', 'y', 'z'].forEach(function(dim) {
        var capDim = 'caps.' + dim;
        var showCap = coerce(capDim + '.show');
        if(showCap) {
            coerce(capDim + '.fill');
        }

        var sliceDim = 'slices.' + dim;
        var showSlice = coerce(sliceDim + '.show');
        if(showSlice) {
            coerce(sliceDim + '.fill');
            coerce(sliceDim + '.locations');
        }
    });

    var showSpaceframe = coerce('spaceframe.show');
    if(showSpaceframe) {
        coerce('spaceframe.fill');
    }

    var showSurface = coerce('surface.show');
    if(showSurface) {
        coerce('surface.count');
        coerce('surface.fill');
        coerce('surface.pattern');
    }

    var showContour = coerce('contour.show');
    if(showContour) {
        coerce('contour.color');
        coerce('contour.width');
    }

    // Coerce remaining properties
    [
        'text',
        'hovertext',
        'hovertemplate',
        'lighting.ambient',
        'lighting.diffuse',
        'lighting.specular',
        'lighting.roughness',
        'lighting.fresnel',
        'lighting.vertexnormalsepsilon',
        'lighting.facenormalsepsilon',
        'lightposition.x',
        'lightposition.y',
        'lightposition.z',
        'flatshading',
        'opacity'
    ].forEach(function(x) { coerce(x); });

    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'c'});

    // disable 1D transforms (for now)
    traceOut._length = null;
}

module.exports = {
    supplyDefaults: supplyDefaults,
    supplyIsoDefaults: supplyIsoDefaults
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2lzb3N1cmZhY2UvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2lzb3N1cmZhY2UvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2lzb3N1cmZhY2UvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2lzb3N1cmZhY2UvZGVmYXVsdHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsc0JBQXNCLG1CQUFPLENBQUMsZ0hBQXdDO0FBQ3RFLHlCQUF5QiwwSUFBNkQ7QUFDdEYsZ0JBQWdCLG1CQUFPLENBQUMsc0ZBQXNCO0FBQzlDLGdCQUFnQixtQkFBTyxDQUFDLGdGQUF3Qjs7QUFFaEQsaUJBQWlCLG9HQUFzQztBQUN2RCxrQkFBa0IsdUhBQWdEOztBQUVsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSw2QkFBNkIseUJBQXlCLFlBQVk7QUFDbEUsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDRCQUE0QjtBQUM1QixDQUFDOztBQUVEO0FBQ0EsOEJBQThCOztBQUU5QjtBQUNBOzs7Ozs7Ozs7Ozs7QUNoUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIscUJBQXFCLG1CQUFPLENBQUMsb0dBQWtDO0FBQy9ELGtCQUFrQixtSEFBeUM7QUFDM0QsYUFBYSw4R0FBb0M7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLG1EQUFXO0FBQ3BDLHNCQUFzQiwySEFBb0Q7QUFDMUUsb0JBQW9CLG1CQUFPLENBQUMsZ0ZBQXdCO0FBQ3BELGtCQUFrQixpSUFBa0Q7QUFDcEUsV0FBVyxtQkFBTyxDQUFDLDhFQUF1Qjs7QUFFMUM7QUFDQSwrQkFBK0IsT0FBTztBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixjQUFjO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLE9BQU87QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFGQUFxRjs7QUFFckY7QUFDQSxzQkFBc0IsT0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLDJFQUEyRTtBQUMzRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0Isa0JBQWtCO0FBQ3hDO0FBQ0EsMEJBQTBCLFdBQVc7QUFDckMsOEJBQThCLFlBQVk7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQSwwQkFBMEIsV0FBVztBQUNyQyw4QkFBOEIsV0FBVztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGtCQUFrQjtBQUN4QztBQUNBLDBCQUEwQixZQUFZO0FBQ3RDLDhCQUE4QixXQUFXO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixXQUFXO0FBQ2pDLDBCQUEwQixZQUFZO0FBQ3RDLDhCQUE4QixXQUFXO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQSwwQkFBMEIsV0FBVztBQUNyQyw4QkFBOEIsWUFBWTtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQSwwQkFBMEIsV0FBVztBQUNyQyw4QkFBOEIsV0FBVztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixrQkFBa0I7QUFDeEM7QUFDQSwwQkFBMEIsWUFBWTtBQUN0Qyw4QkFBOEIsV0FBVztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsT0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHNCQUFzQixXQUFXO0FBQ2pDLDBCQUEwQixZQUFZO0FBQ3RDLDhCQUE4QixXQUFXO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLGtCQUFrQjtBQUM1QztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQkFBMEIsd0JBQXdCO0FBQ2xEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsNEJBQTRCO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsT0FBTztBQUNsQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQzdoQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDdkMsaUJBQWlCLG1CQUFPLENBQUMsa0ZBQWM7QUFDdkMseUJBQXlCLG1CQUFPLENBQUMsNEdBQXNDOztBQUV2RTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLFdBQVcsRUFBRTs7QUFFeEMsMkRBQTJELHlCQUF5Qjs7QUFFcEY7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0MzZmYzk2NzkxMjBlYzA2MTk3ZDkuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvclNjYWxlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvYXR0cmlidXRlcycpO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgbWVzaEF0dHJzID0gcmVxdWlyZSgnLi4vbWVzaDNkL2F0dHJpYnV0ZXMnKTtcbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG52YXIgb3ZlcnJpZGVBbGwgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9lZGl0X3R5cGVzJykub3ZlcnJpZGVBbGw7XG5cbmZ1bmN0aW9uIG1ha2VTbGljZUF0dHIoYXhMZXR0ZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3Qgc2xpY2UgcGxhbmVzIGFib3V0IHRoZScsIGF4TGV0dGVyLFxuICAgICAgICAgICAgICAgICdkaW1lbnNpb24gYXJlIGRyYXduLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGxvY2F0aW9uczoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgZGZsdDogW10sXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTcGVjaWZpZXMgdGhlIGxvY2F0aW9uKHMpIG9mIHNsaWNlcyBvbiB0aGUgYXhpcy4nLFxuICAgICAgICAgICAgICAgICdXaGVuIG5vdCBzcGVjaWZpZWQgc2xpY2VzIHdvdWxkIGJlIGNyZWF0ZWQgZm9yJyxcbiAgICAgICAgICAgICAgICAnYWxsIHBvaW50cyBvZiB0aGUgYXhpcycsIGF4TGV0dGVyLCAnZXhjZXB0IHN0YXJ0IGFuZCBlbmQuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgICAgZGZsdDogMSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGZpbGwgcmF0aW8gb2YgdGhlIGBzbGljZXNgLiBUaGUgZGVmYXVsdCBmaWxsIHZhbHVlIG9mIHRoZScsXG4gICAgICAgICAgICAgICAgJ2BzbGljZXNgIGlzIDEgbWVhbmluZyB0aGF0IHRoZXkgYXJlIGVudGlyZWx5IHNoYWRlZC4gT24gdGhlIG90aGVyIGhhbmQnLFxuICAgICAgICAgICAgICAgICdBcHBseWluZyBhIGBmaWxsYCByYXRpbyBsZXNzIHRoYW4gb25lIHdvdWxkIGFsbG93IHRoZSBjcmVhdGlvbiBvZicsXG4gICAgICAgICAgICAgICAgJ29wZW5pbmdzIHBhcmFsbGVsIHRvIHRoZSBlZGdlcy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gbWFrZUNhcEF0dHIoYXhMZXR0ZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZmx0OiB0cnVlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgZmlsbCByYXRpbyBvZiB0aGUgYHNsaWNlc2AuIFRoZSBkZWZhdWx0IGZpbGwgdmFsdWUgb2YgdGhlJywgYXhMZXR0ZXIsXG4gICAgICAgICAgICAgICAgJ2BzbGljZXNgIGlzIDEgbWVhbmluZyB0aGF0IHRoZXkgYXJlIGVudGlyZWx5IHNoYWRlZC4gT24gdGhlIG90aGVyIGhhbmQnLFxuICAgICAgICAgICAgICAgICdBcHBseWluZyBhIGBmaWxsYCByYXRpbyBsZXNzIHRoYW4gb25lIHdvdWxkIGFsbG93IHRoZSBjcmVhdGlvbiBvZicsXG4gICAgICAgICAgICAgICAgJ29wZW5pbmdzIHBhcmFsbGVsIHRvIHRoZSBlZGdlcy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBmaWxsOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEsXG4gICAgICAgICAgICBkZmx0OiAxLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgZmlsbCByYXRpbyBvZiB0aGUgYGNhcHNgLiBUaGUgZGVmYXVsdCBmaWxsIHZhbHVlIG9mIHRoZScsXG4gICAgICAgICAgICAgICAgJ2BjYXBzYCBpcyAxIG1lYW5pbmcgdGhhdCB0aGV5IGFyZSBlbnRpcmVseSBzaGFkZWQuIE9uIHRoZSBvdGhlciBoYW5kJyxcbiAgICAgICAgICAgICAgICAnQXBwbHlpbmcgYSBgZmlsbGAgcmF0aW8gbGVzcyB0aGFuIG9uZSB3b3VsZCBhbGxvdyB0aGUgY3JlYXRpb24gb2YnLFxuICAgICAgICAgICAgICAgICdvcGVuaW5ncyBwYXJhbGxlbCB0byB0aGUgZWRnZXMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfVxuICAgIH07XG59XG5cbnZhciBhdHRycyA9IG1vZHVsZS5leHBvcnRzID0gb3ZlcnJpZGVBbGwoZXh0ZW5kRmxhdCh7XG4gICAgeDoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBYIGNvb3JkaW5hdGVzIG9mIHRoZSB2ZXJ0aWNlcyBvbiBYIGF4aXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeToge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBZIGNvb3JkaW5hdGVzIG9mIHRoZSB2ZXJ0aWNlcyBvbiBZIGF4aXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgejoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBaIGNvb3JkaW5hdGVzIG9mIHRoZSB2ZXJ0aWNlcyBvbiBaIGF4aXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgdmFsdWU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgNHRoIGRpbWVuc2lvbiAodmFsdWUpIG9mIHRoZSB2ZXJ0aWNlcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBpc29taW46IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBtaW5pbXVtIGJvdW5kYXJ5IGZvciBpc28tc3VyZmFjZSBwbG90LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGlzb21heDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIG1heGltdW0gYm91bmRhcnkgZm9yIGlzby1zdXJmYWNlIHBsb3QuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBzdXJmYWNlOiB7XG4gICAgICAgIHNob3c6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdIaWRlcy9kaXNwbGF5cyBzdXJmYWNlcyBiZXR3ZWVuIG1pbmltdW0gYW5kIG1heGltdW0gaXNvLXZhbHVlcy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBjb3VudDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogMixcbiAgICAgICAgICAgIG1pbjogMSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIG51bWJlciBvZiBpc28tc3VyZmFjZXMgYmV0d2VlbiBtaW5pbXVtIGFuZCBtYXhpbXVtIGlzby12YWx1ZXMuJyxcbiAgICAgICAgICAgICAgICAnQnkgZGVmYXVsdCB0aGlzIHZhbHVlIGlzIDIgbWVhbmluZyB0aGF0IG9ubHkgbWluaW11bSBhbmQgbWF4aW11bSBzdXJmYWNlcycsXG4gICAgICAgICAgICAgICAgJ3dvdWxkIGJlIGRyYXduLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGZpbGw6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICAgIGRmbHQ6IDEsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBmaWxsIHJhdGlvIG9mIHRoZSBpc28tc3VyZmFjZS4gVGhlIGRlZmF1bHQgZmlsbCB2YWx1ZSBvZiB0aGUnLFxuICAgICAgICAgICAgICAgICdzdXJmYWNlIGlzIDEgbWVhbmluZyB0aGF0IHRoZXkgYXJlIGVudGlyZWx5IHNoYWRlZC4gT24gdGhlIG90aGVyIGhhbmQnLFxuICAgICAgICAgICAgICAgICdBcHBseWluZyBhIGBmaWxsYCByYXRpbyBsZXNzIHRoYW4gb25lIHdvdWxkIGFsbG93IHRoZSBjcmVhdGlvbiBvZicsXG4gICAgICAgICAgICAgICAgJ29wZW5pbmdzIHBhcmFsbGVsIHRvIHRoZSBlZGdlcy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBwYXR0ZXJuOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZmxhZ2xpc3QnLFxuICAgICAgICAgICAgZmxhZ3M6IFsnQScsICdCJywgJ0MnLCAnRCcsICdFJ10sXG4gICAgICAgICAgICBleHRyYXM6IFsnYWxsJywgJ29kZCcsICdldmVuJ10sXG4gICAgICAgICAgICBkZmx0OiAnYWxsJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBzdXJmYWNlIHBhdHRlcm4gb2YgdGhlIGlzby1zdXJmYWNlIDMtRCBzZWN0aW9ucy4gVGhlIGRlZmF1bHQgcGF0dGVybiBvZicsXG4gICAgICAgICAgICAgICAgJ3RoZSBzdXJmYWNlIGlzIGBhbGxgIG1lYW5pbmcgdGhhdCB0aGUgcmVzdCBvZiBzdXJmYWNlIGVsZW1lbnRzIHdvdWxkIGJlIHNoYWRlZC4nLFxuICAgICAgICAgICAgICAgICdUaGUgY2hlY2sgb3B0aW9ucyAoZWl0aGVyIDEgb3IgMikgY291bGQgYmUgdXNlZCB0byBkcmF3IGhhbGYgb2YgdGhlIHNxdWFyZXMnLFxuICAgICAgICAgICAgICAgICdvbiB0aGUgc3VyZmFjZS4gVXNpbmcgdmFyaW91cyBjb21iaW5hdGlvbnMgb2YgY2FwaXRhbCBgQWAsIGBCYCwgYENgLCBgRGAgYW5kIGBFYCcsXG4gICAgICAgICAgICAgICAgJ21heSBhbHNvIGJlIHVzZWQgdG8gcmVkdWNlIHRoZSBudW1iZXIgb2YgdHJpYW5nbGVzIG9uIHRoZSBpc28tc3VyZmFjZXMgYW5kJyxcbiAgICAgICAgICAgICAgICAnY3JlYXRpbmcgb3RoZXIgcGF0dGVybnMgb2YgaW50ZXJlc3QuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzcGFjZWZyYW1lOiB7XG4gICAgICAgIHNob3c6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGlzcGxheXMvaGlkZXMgdGV0cmFoZWRyb24gc2hhcGVzIGJldHdlZW4gbWluaW11bSBhbmQnLFxuICAgICAgICAgICAgICAgICdtYXhpbXVtIGlzby12YWx1ZXMuIE9mdGVuIHVzZWZ1bCB3aGVuIGVpdGhlciBjYXBzIG9yJyxcbiAgICAgICAgICAgICAgICAnc3VyZmFjZXMgYXJlIGRpc2FibGVkIG9yIGZpbGxlZCB3aXRoIHZhbHVlcyBsZXNzIHRoYW4gMS4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBmaWxsOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBtYXg6IDEsXG4gICAgICAgICAgICBkZmx0OiAwLjE1LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgZmlsbCByYXRpbyBvZiB0aGUgYHNwYWNlZnJhbWVgIGVsZW1lbnRzLiBUaGUgZGVmYXVsdCBmaWxsIHZhbHVlJyxcbiAgICAgICAgICAgICAgICAnaXMgMC4xNSBtZWFuaW5nIHRoYXQgb25seSAxNSUgb2YgdGhlIGFyZWEgb2YgZXZlcnkgZmFjZXMgb2YgdGV0cmFzIHdvdWxkIGJlJyxcbiAgICAgICAgICAgICAgICAnc2hhZGVkLiBBcHBseWluZyBhIGdyZWF0ZXIgYGZpbGxgIHJhdGlvIHdvdWxkIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBzdHJvbmdlcicsXG4gICAgICAgICAgICAgICAgJ2VsZW1lbnRzIG9yIGNvdWxkIGJlIHN1ZWQgdG8gaGF2ZSBlbnRpcmVseSBjbG9zZWQgYXJlYXMgKGluIGNhc2Ugb2YgdXNpbmcgMSkuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzbGljZXM6IHtcbiAgICAgICAgeDogbWFrZVNsaWNlQXR0cigneCcpLFxuICAgICAgICB5OiBtYWtlU2xpY2VBdHRyKCd5JyksXG4gICAgICAgIHo6IG1ha2VTbGljZUF0dHIoJ3onKVxuICAgIH0sXG5cbiAgICBjYXBzOiB7XG4gICAgICAgIHg6IG1ha2VDYXBBdHRyKCd4JyksXG4gICAgICAgIHk6IG1ha2VDYXBBdHRyKCd5JyksXG4gICAgICAgIHo6IG1ha2VDYXBBdHRyKCd6JylcbiAgICB9LFxuXG4gICAgdGV4dDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB0ZXh0IGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCB0aGUgdmVydGljZXMuJyxcbiAgICAgICAgICAgICdJZiB0cmFjZSBgaG92ZXJpbmZvYCBjb250YWlucyBhICp0ZXh0KiBmbGFnIGFuZCAqaG92ZXJ0ZXh0KiBpcyBub3Qgc2V0LCcsXG4gICAgICAgICAgICAndGhlc2UgZWxlbWVudHMgd2lsbCBiZSBzZWVuIGluIHRoZSBob3ZlciBsYWJlbHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgaG92ZXJ0ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NhbWUgYXMgYHRleHRgLidcbiAgICB9LFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycygpLFxuICAgIHNob3dsZWdlbmQ6IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5zaG93bGVnZW5kLCB7ZGZsdDogZmFsc2V9KVxufSxcblxuY29sb3JTY2FsZUF0dHJzKCcnLCB7XG4gICAgY29sb3JBdHRyOiAnYHZhbHVlYCcsXG4gICAgc2hvd1NjYWxlRGZsdDogdHJ1ZSxcbiAgICBlZGl0VHlwZU92ZXJyaWRlOiAnY2FsYydcbn0pLCB7XG4gICAgb3BhY2l0eTogbWVzaEF0dHJzLm9wYWNpdHksXG4gICAgbGlnaHRwb3NpdGlvbjogbWVzaEF0dHJzLmxpZ2h0cG9zaXRpb24sXG4gICAgbGlnaHRpbmc6IG1lc2hBdHRycy5saWdodGluZyxcbiAgICBmbGF0c2hhZGluZzogbWVzaEF0dHJzLmZsYXRzaGFkaW5nLFxuICAgIGNvbnRvdXI6IG1lc2hBdHRycy5jb250b3VyLFxuXG4gICAgaG92ZXJpbmZvOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuaG92ZXJpbmZvKVxufSksICdjYWxjJywgJ25lc3RlZCcpO1xuXG4vLyByZXF1aXJlZCBkZWZhdWx0cyB0byBzcGVlZCB1cCBzdXJmYWNlIG5vcm1hbCBjYWxjdWxhdGlvbnNcbmF0dHJzLmZsYXRzaGFkaW5nLmRmbHQgPSB0cnVlOyBhdHRycy5saWdodGluZy5mYWNlbm9ybWFsc2Vwc2lsb24uZGZsdCA9IDA7XG5cbmF0dHJzLnguZWRpdFR5cGUgPSBhdHRycy55LmVkaXRUeXBlID0gYXR0cnMuei5lZGl0VHlwZSA9IGF0dHJzLnZhbHVlLmVkaXRUeXBlID0gJ2NhbGMrY2xlYXJBeGlzVHlwZXMnO1xuYXR0cnMudHJhbnNmb3JtcyA9IHVuZGVmaW5lZDtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNvbG9yc2NhbGVDYWxjID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2NhbGMnKTtcbnZhciBwcm9jZXNzR3JpZCA9IHJlcXVpcmUoJy4uL3N0cmVhbXR1YmUvY2FsYycpLnByb2Nlc3NHcmlkO1xudmFyIGZpbHRlciA9IHJlcXVpcmUoJy4uL3N0cmVhbXR1YmUvY2FsYycpLmZpbHRlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHRyYWNlLl9sZW4gPSBNYXRoLm1pbihcbiAgICAgICAgdHJhY2UueC5sZW5ndGgsXG4gICAgICAgIHRyYWNlLnkubGVuZ3RoLFxuICAgICAgICB0cmFjZS56Lmxlbmd0aCxcbiAgICAgICAgdHJhY2UudmFsdWUubGVuZ3RoXG4gICAgKTtcblxuICAgIHRyYWNlLl94ID0gZmlsdGVyKHRyYWNlLngsIHRyYWNlLl9sZW4pO1xuICAgIHRyYWNlLl95ID0gZmlsdGVyKHRyYWNlLnksIHRyYWNlLl9sZW4pO1xuICAgIHRyYWNlLl96ID0gZmlsdGVyKHRyYWNlLnosIHRyYWNlLl9sZW4pO1xuICAgIHRyYWNlLl92YWx1ZSA9IGZpbHRlcih0cmFjZS52YWx1ZSwgdHJhY2UuX2xlbik7XG5cbiAgICB2YXIgZ3JpZCA9IHByb2Nlc3NHcmlkKHRyYWNlKTtcbiAgICB0cmFjZS5fZ3JpZEZpbGwgPSBncmlkLmZpbGw7XG4gICAgdHJhY2UuX1hzID0gZ3JpZC5YcztcbiAgICB0cmFjZS5fWXMgPSBncmlkLllzO1xuICAgIHRyYWNlLl9acyA9IGdyaWQuWnM7XG4gICAgdHJhY2UuX2xlbiA9IGdyaWQubGVuO1xuXG4gICAgdmFyIG1pbiA9IEluZmluaXR5O1xuICAgIHZhciBtYXggPSAtSW5maW5pdHk7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHRyYWNlLl9sZW47IGkrKykge1xuICAgICAgICB2YXIgdiA9IHRyYWNlLl92YWx1ZVtpXTtcbiAgICAgICAgbWluID0gTWF0aC5taW4obWluLCB2KTtcbiAgICAgICAgbWF4ID0gTWF0aC5tYXgobWF4LCB2KTtcbiAgICB9XG5cbiAgICB0cmFjZS5fbWluVmFsdWVzID0gbWluO1xuICAgIHRyYWNlLl9tYXhWYWx1ZXMgPSBtYXg7XG4gICAgdHJhY2UuX3ZNaW4gPSAodHJhY2UuaXNvbWluID09PSB1bmRlZmluZWQgfHwgdHJhY2UuaXNvbWluID09PSBudWxsKSA/IG1pbiA6IHRyYWNlLmlzb21pbjtcbiAgICB0cmFjZS5fdk1heCA9ICh0cmFjZS5pc29tYXggPT09IHVuZGVmaW5lZCB8fCB0cmFjZS5pc29taW4gPT09IG51bGwpID8gbWF4IDogdHJhY2UuaXNvbWF4O1xuXG4gICAgY29sb3JzY2FsZUNhbGMoZ2QsIHRyYWNlLCB7XG4gICAgICAgIHZhbHM6IFt0cmFjZS5fdk1pbiwgdHJhY2UuX3ZNYXhdLFxuICAgICAgICBjb250YWluZXJTdHI6ICcnLFxuICAgICAgICBjTGV0dGVyOiAnYydcbiAgICB9KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVNZXNoID0gcmVxdWlyZSgnZ2wtbWVzaDNkJyk7XG52YXIgcGFyc2VDb2xvclNjYWxlID0gcmVxdWlyZSgnLi4vLi4vbGliL2dsX2Zvcm1hdF9jb2xvcicpLnBhcnNlQ29sb3JTY2FsZTtcbnZhciBzdHIyUmdiYUFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliL3N0cjJyZ2JhcnJheScpO1xudmFyIGV4dHJhY3RPcHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJykuZXh0cmFjdE9wdHM7XG52YXIgemlwMyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dsM2QvemlwMycpO1xuXG52YXIgZmluZE5lYXJlc3RPbkF4aXMgPSBmdW5jdGlvbih3LCBhcnIpIHtcbiAgICBmb3IodmFyIHEgPSBhcnIubGVuZ3RoIC0gMTsgcSA+IDA7IHEtLSkge1xuICAgICAgICB2YXIgbWluID0gTWF0aC5taW4oYXJyW3FdLCBhcnJbcSAtIDFdKTtcbiAgICAgICAgdmFyIG1heCA9IE1hdGgubWF4KGFycltxXSwgYXJyW3EgLSAxXSk7XG4gICAgICAgIGlmKG1heCA+IG1pbiAmJiBtaW4gPCB3ICYmIHcgPD0gbWF4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIGlkOiBxLFxuICAgICAgICAgICAgICAgIGRpc3RSYXRpbzogKG1heCAtIHcpIC8gKG1heCAtIG1pbilcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IDAsXG4gICAgICAgIGRpc3RSYXRpbzogMFxuICAgIH07XG59O1xuXG5mdW5jdGlvbiBJc29zdXJmYWNlVHJhY2Uoc2NlbmUsIG1lc2gsIHVpZCkge1xuICAgIHRoaXMuc2NlbmUgPSBzY2VuZTtcbiAgICB0aGlzLnVpZCA9IHVpZDtcbiAgICB0aGlzLm1lc2ggPSBtZXNoO1xuICAgIHRoaXMubmFtZSA9ICcnO1xuICAgIHRoaXMuZGF0YSA9IG51bGw7XG4gICAgdGhpcy5zaG93Q29udG91ciA9IGZhbHNlO1xufVxuXG52YXIgcHJvdG8gPSBJc29zdXJmYWNlVHJhY2UucHJvdG90eXBlO1xuXG5wcm90by5oYW5kbGVQaWNrID0gZnVuY3Rpb24oc2VsZWN0aW9uKSB7XG4gICAgaWYoc2VsZWN0aW9uLm9iamVjdCA9PT0gdGhpcy5tZXNoKSB7XG4gICAgICAgIHZhciByYXdJZCA9IHNlbGVjdGlvbi5kYXRhLmluZGV4O1xuXG4gICAgICAgIHZhciB4ID0gdGhpcy5kYXRhLl9tZXNoWFtyYXdJZF07XG4gICAgICAgIHZhciB5ID0gdGhpcy5kYXRhLl9tZXNoWVtyYXdJZF07XG4gICAgICAgIHZhciB6ID0gdGhpcy5kYXRhLl9tZXNoWltyYXdJZF07XG5cbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuZGF0YS5fWXMubGVuZ3RoO1xuICAgICAgICB2YXIgZGVwdGggPSB0aGlzLmRhdGEuX1pzLmxlbmd0aDtcblxuICAgICAgICB2YXIgaSA9IGZpbmROZWFyZXN0T25BeGlzKHgsIHRoaXMuZGF0YS5fWHMpLmlkO1xuICAgICAgICB2YXIgaiA9IGZpbmROZWFyZXN0T25BeGlzKHksIHRoaXMuZGF0YS5fWXMpLmlkO1xuICAgICAgICB2YXIgayA9IGZpbmROZWFyZXN0T25BeGlzKHosIHRoaXMuZGF0YS5fWnMpLmlkO1xuXG4gICAgICAgIHZhciBzZWxlY3RJbmRleCA9IHNlbGVjdGlvbi5pbmRleCA9IGsgKyBkZXB0aCAqIGogKyBkZXB0aCAqIGhlaWdodCAqIGk7XG5cbiAgICAgICAgc2VsZWN0aW9uLnRyYWNlQ29vcmRpbmF0ZSA9IFtcbiAgICAgICAgICAgIHRoaXMuZGF0YS5fbWVzaFhbc2VsZWN0SW5kZXhdLFxuICAgICAgICAgICAgdGhpcy5kYXRhLl9tZXNoWVtzZWxlY3RJbmRleF0sXG4gICAgICAgICAgICB0aGlzLmRhdGEuX21lc2haW3NlbGVjdEluZGV4XSxcbiAgICAgICAgICAgIHRoaXMuZGF0YS5fdmFsdWVbc2VsZWN0SW5kZXhdXG4gICAgICAgIF07XG5cbiAgICAgICAgdmFyIHRleHQgPSB0aGlzLmRhdGEuaG92ZXJ0ZXh0IHx8IHRoaXMuZGF0YS50ZXh0O1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KHRleHQpICYmIHRleHRbc2VsZWN0SW5kZXhdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi50ZXh0TGFiZWwgPSB0ZXh0W3NlbGVjdEluZGV4XTtcbiAgICAgICAgfSBlbHNlIGlmKHRleHQpIHtcbiAgICAgICAgICAgIHNlbGVjdGlvbi50ZXh0TGFiZWwgPSB0ZXh0O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxufTtcblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIHZhciBzY2VuZSA9IHRoaXMuc2NlbmU7XG4gICAgdmFyIGxheW91dCA9IHNjZW5lLmZ1bGxTY2VuZUxheW91dDtcblxuICAgIHRoaXMuZGF0YSA9IGdlbmVyYXRlSXNvTWVzaGVzKGRhdGEpO1xuXG4gICAgLy8gVW5wYWNrIHBvc2l0aW9uIGRhdGFcbiAgICBmdW5jdGlvbiB0b0RhdGFDb29yZHMoYXhpcywgY29vcmQsIHNjYWxlLCBjYWxlbmRhcikge1xuICAgICAgICByZXR1cm4gY29vcmQubWFwKGZ1bmN0aW9uKHgpIHtcbiAgICAgICAgICAgIHJldHVybiBheGlzLmQybCh4LCAwLCBjYWxlbmRhcikgKiBzY2FsZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHBvc2l0aW9ucyA9IHppcDMoXG4gICAgICAgIHRvRGF0YUNvb3JkcyhsYXlvdXQueGF4aXMsIGRhdGEuX21lc2hYLCBzY2VuZS5kYXRhU2NhbGVbMF0sIGRhdGEueGNhbGVuZGFyKSxcbiAgICAgICAgdG9EYXRhQ29vcmRzKGxheW91dC55YXhpcywgZGF0YS5fbWVzaFksIHNjZW5lLmRhdGFTY2FsZVsxXSwgZGF0YS55Y2FsZW5kYXIpLFxuICAgICAgICB0b0RhdGFDb29yZHMobGF5b3V0LnpheGlzLCBkYXRhLl9tZXNoWiwgc2NlbmUuZGF0YVNjYWxlWzJdLCBkYXRhLnpjYWxlbmRhcikpO1xuXG4gICAgdmFyIGNlbGxzID0gemlwMyhkYXRhLl9tZXNoSSwgZGF0YS5fbWVzaEosIGRhdGEuX21lc2hLKTtcblxuICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgIHBvc2l0aW9uczogcG9zaXRpb25zLFxuICAgICAgICBjZWxsczogY2VsbHMsXG4gICAgICAgIGxpZ2h0UG9zaXRpb246IFtkYXRhLmxpZ2h0cG9zaXRpb24ueCwgZGF0YS5saWdodHBvc2l0aW9uLnksIGRhdGEubGlnaHRwb3NpdGlvbi56XSxcbiAgICAgICAgYW1iaWVudDogZGF0YS5saWdodGluZy5hbWJpZW50LFxuICAgICAgICBkaWZmdXNlOiBkYXRhLmxpZ2h0aW5nLmRpZmZ1c2UsXG4gICAgICAgIHNwZWN1bGFyOiBkYXRhLmxpZ2h0aW5nLnNwZWN1bGFyLFxuICAgICAgICByb3VnaG5lc3M6IGRhdGEubGlnaHRpbmcucm91Z2huZXNzLFxuICAgICAgICBmcmVzbmVsOiBkYXRhLmxpZ2h0aW5nLmZyZXNuZWwsXG4gICAgICAgIHZlcnRleE5vcm1hbHNFcHNpbG9uOiBkYXRhLmxpZ2h0aW5nLnZlcnRleG5vcm1hbHNlcHNpbG9uLFxuICAgICAgICBmYWNlTm9ybWFsc0Vwc2lsb246IGRhdGEubGlnaHRpbmcuZmFjZW5vcm1hbHNlcHNpbG9uLFxuICAgICAgICBvcGFjaXR5OiBkYXRhLm9wYWNpdHksXG4gICAgICAgIGNvbnRvdXJFbmFibGU6IGRhdGEuY29udG91ci5zaG93LFxuICAgICAgICBjb250b3VyQ29sb3I6IHN0cjJSZ2JhQXJyYXkoZGF0YS5jb250b3VyLmNvbG9yKS5zbGljZSgwLCAzKSxcbiAgICAgICAgY29udG91cldpZHRoOiBkYXRhLmNvbnRvdXIud2lkdGgsXG4gICAgICAgIHVzZUZhY2V0Tm9ybWFsczogZGF0YS5mbGF0c2hhZGluZ1xuICAgIH07XG5cbiAgICB2YXIgY09wdHMgPSBleHRyYWN0T3B0cyhkYXRhKTtcbiAgICBjb25maWcudmVydGV4SW50ZW5zaXR5ID0gZGF0YS5fbWVzaEludGVuc2l0eTtcbiAgICBjb25maWcudmVydGV4SW50ZW5zaXR5Qm91bmRzID0gW2NPcHRzLm1pbiwgY09wdHMubWF4XTtcbiAgICBjb25maWcuY29sb3JtYXAgPSBwYXJzZUNvbG9yU2NhbGUoZGF0YSk7XG5cbiAgICAvLyBVcGRhdGUgbWVzaFxuICAgIHRoaXMubWVzaC51cGRhdGUoY29uZmlnKTtcbn07XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNjZW5lLmdscGxvdC5yZW1vdmUodGhpcy5tZXNoKTtcbiAgICB0aGlzLm1lc2guZGlzcG9zZSgpO1xufTtcblxudmFyIEdSSURfVFlQRVMgPSBbJ3h5eicsICd4enknLCAneXh6JywgJ3l6eCcsICd6eHknLCAnenl4J107XG5cbmZ1bmN0aW9uIGdlbmVyYXRlSXNvTWVzaGVzKGRhdGEpIHtcbiAgICBkYXRhLl9tZXNoSSA9IFtdO1xuICAgIGRhdGEuX21lc2hKID0gW107XG4gICAgZGF0YS5fbWVzaEsgPSBbXTtcblxuICAgIHZhciBzaG93U3VyZmFjZSA9IGRhdGEuc3VyZmFjZS5zaG93O1xuICAgIHZhciBzaG93U3BhY2VmcmFtZSA9IGRhdGEuc3BhY2VmcmFtZS5zaG93O1xuXG4gICAgdmFyIHN1cmZhY2VGaWxsID0gZGF0YS5zdXJmYWNlLmZpbGw7XG4gICAgdmFyIHNwYWNlZnJhbWVGaWxsID0gZGF0YS5zcGFjZWZyYW1lLmZpbGw7XG5cbiAgICB2YXIgZHJhd2luZ1N1cmZhY2UgPSBmYWxzZTtcbiAgICB2YXIgZHJhd2luZ1NwYWNlZnJhbWUgPSBmYWxzZTtcblxuICAgIHZhciBudW1GYWNlcyA9IDA7XG4gICAgdmFyIG51bVZlcnRpY2VzO1xuICAgIHZhciBiZWdpblZlcnRleHRMZW5ndGg7XG5cbiAgICB2YXIgWHMgPSBkYXRhLl9YcztcbiAgICB2YXIgWXMgPSBkYXRhLl9ZcztcbiAgICB2YXIgWnMgPSBkYXRhLl9acztcblxuICAgIHZhciB3aWR0aCA9IFhzLmxlbmd0aDtcbiAgICB2YXIgaGVpZ2h0ID0gWXMubGVuZ3RoO1xuICAgIHZhciBkZXB0aCA9IFpzLmxlbmd0aDtcblxuICAgIHZhciBmaWxsZWQgPSBHUklEX1RZUEVTLmluZGV4T2YoZGF0YS5fZ3JpZEZpbGwucmVwbGFjZSgvLS9nLCAnJykucmVwbGFjZSgvXFwrL2csICcnKSk7XG5cbiAgICB2YXIgZ2V0SW5kZXggPSBmdW5jdGlvbihpLCBqLCBrKSB7XG4gICAgICAgIHN3aXRjaChmaWxsZWQpIHtcbiAgICAgICAgICAgIGNhc2UgNTogLy8gJ3p5eCdcbiAgICAgICAgICAgICAgICByZXR1cm4gayArIGRlcHRoICogaiArIGRlcHRoICogaGVpZ2h0ICogaTtcbiAgICAgICAgICAgIGNhc2UgNDogLy8gJ3p4eSdcbiAgICAgICAgICAgICAgICByZXR1cm4gayArIGRlcHRoICogaSArIGRlcHRoICogd2lkdGggKiBqO1xuICAgICAgICAgICAgY2FzZSAzOiAvLyAneXp4J1xuICAgICAgICAgICAgICAgIHJldHVybiBqICsgaGVpZ2h0ICogayArIGhlaWdodCAqIGRlcHRoICogaTtcbiAgICAgICAgICAgIGNhc2UgMjogLy8gJ3l4eidcbiAgICAgICAgICAgICAgICByZXR1cm4gaiArIGhlaWdodCAqIGkgKyBoZWlnaHQgKiB3aWR0aCAqIGs7XG4gICAgICAgICAgICBjYXNlIDE6IC8vICd4enknXG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgKyB3aWR0aCAqIGsgKyB3aWR0aCAqIGRlcHRoICogajtcbiAgICAgICAgICAgIGRlZmF1bHQ6IC8vIGNhc2UgMDogLy8gJ3h5eidcbiAgICAgICAgICAgICAgICByZXR1cm4gaSArIHdpZHRoICogaiArIHdpZHRoICogaGVpZ2h0ICogaztcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgbWluVmFsdWVzID0gZGF0YS5fbWluVmFsdWVzO1xuICAgIHZhciBtYXhWYWx1ZXMgPSBkYXRhLl9tYXhWYWx1ZXM7XG5cbiAgICB2YXIgdk1pbiA9IGRhdGEuX3ZNaW47XG4gICAgdmFyIHZNYXggPSBkYXRhLl92TWF4O1xuXG4gICAgdmFyIGFsbFhzO1xuICAgIHZhciBhbGxZcztcbiAgICB2YXIgYWxsWnM7XG4gICAgdmFyIGFsbFZzO1xuXG4gICAgZnVuY3Rpb24gZmluZFZlcnRleElkKHgsIHksIHopIHtcbiAgICAgICAgLy8gY291bGQgYmUgdXNlZCB0byBmaW5kIHRoZSB2ZXJ0ZXggaWQgb2YgcHJldmlvdXNseSBnZW5lcmF0ZWQgdmVydGV4IHdpdGhpbiB0aGUgZ3JvdXBcblxuICAgICAgICB2YXIgbGVuID0gYWxsVnMubGVuZ3RoO1xuICAgICAgICBmb3IodmFyIGYgPSBiZWdpblZlcnRleHRMZW5ndGg7IGYgPCBsZW47IGYrKykge1xuICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgeCA9PT0gYWxsWHNbZl0gJiZcbiAgICAgICAgICAgICAgICB5ID09PSBhbGxZc1tmXSAmJlxuICAgICAgICAgICAgICAgIHogPT09IGFsbFpzW2ZdXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmVnaW5Hcm91cCgpIHtcbiAgICAgICAgYmVnaW5WZXJ0ZXh0TGVuZ3RoID0gbnVtVmVydGljZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZW1wdHlWZXJ0aWNlcygpIHtcbiAgICAgICAgYWxsWHMgPSBbXTtcbiAgICAgICAgYWxsWXMgPSBbXTtcbiAgICAgICAgYWxsWnMgPSBbXTtcbiAgICAgICAgYWxsVnMgPSBbXTtcbiAgICAgICAgbnVtVmVydGljZXMgPSAwO1xuXG4gICAgICAgIGJlZ2luR3JvdXAoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRWZXJ0ZXgoeCwgeSwgeiwgdikge1xuICAgICAgICBhbGxYcy5wdXNoKHgpO1xuICAgICAgICBhbGxZcy5wdXNoKHkpO1xuICAgICAgICBhbGxacy5wdXNoKHopO1xuICAgICAgICBhbGxWcy5wdXNoKHYpO1xuICAgICAgICBudW1WZXJ0aWNlcysrO1xuXG4gICAgICAgIHJldHVybiBudW1WZXJ0aWNlcyAtIDE7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkRmFjZShhLCBiLCBjKSB7XG4gICAgICAgIGRhdGEuX21lc2hJLnB1c2goYSk7XG4gICAgICAgIGRhdGEuX21lc2hKLnB1c2goYik7XG4gICAgICAgIGRhdGEuX21lc2hLLnB1c2goYyk7XG4gICAgICAgIG51bUZhY2VzKys7XG5cbiAgICAgICAgcmV0dXJuIG51bUZhY2VzIC0gMTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRDZW50ZXIoQSwgQiwgQykge1xuICAgICAgICB2YXIgTSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgQS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgTVtpXSA9IChBW2ldICsgQltpXSArIENbaV0pIC8gMy4wO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBNO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEJldHdlZW4oQSwgQiwgcikge1xuICAgICAgICB2YXIgTSA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgQS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgTVtpXSA9IEFbaV0gKiAoMSAtIHIpICsgciAqIEJbaV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE07XG4gICAgfVxuXG4gICAgdmFyIGFjdGl2ZUZpbGw7XG4gICAgZnVuY3Rpb24gc2V0RmlsbChmaWxsKSB7XG4gICAgICAgIGFjdGl2ZUZpbGwgPSBmaWxsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZU9wZW5UcmkoeHl6diwgYWJjKSB7XG4gICAgICAgIHZhciBBID0geHl6dlswXTtcbiAgICAgICAgdmFyIEIgPSB4eXp2WzFdO1xuICAgICAgICB2YXIgQyA9IHh5enZbMl07XG4gICAgICAgIHZhciBHID0gZ2V0Q2VudGVyKEEsIEIsIEMpO1xuXG4gICAgICAgIHZhciByID0gTWF0aC5zcXJ0KDEgLSBhY3RpdmVGaWxsKTtcbiAgICAgICAgdmFyIHAxID0gZ2V0QmV0d2VlbihHLCBBLCByKTtcbiAgICAgICAgdmFyIHAyID0gZ2V0QmV0d2VlbihHLCBCLCByKTtcbiAgICAgICAgdmFyIHAzID0gZ2V0QmV0d2VlbihHLCBDLCByKTtcblxuICAgICAgICB2YXIgYSA9IGFiY1swXTtcbiAgICAgICAgdmFyIGIgPSBhYmNbMV07XG4gICAgICAgIHZhciBjID0gYWJjWzJdO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4eXp2OiBbXG4gICAgICAgICAgICAgICAgW0EsIEIsIHAyXSwgW3AyLCBwMSwgQV0sXG4gICAgICAgICAgICAgICAgW0IsIEMsIHAzXSwgW3AzLCBwMiwgQl0sXG4gICAgICAgICAgICAgICAgW0MsIEEsIHAxXSwgW3AxLCBwMywgQ11cbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhYmM6IFtcbiAgICAgICAgICAgICAgICBbYSwgYiwgLTFdLCBbLTEsIC0xLCBhXSxcbiAgICAgICAgICAgICAgICBbYiwgYywgLTFdLCBbLTEsIC0xLCBiXSxcbiAgICAgICAgICAgICAgICBbYywgYSwgLTFdLCBbLTEsIC0xLCBjXVxuICAgICAgICAgICAgXVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0eWxlSW5jbHVkZXMoc3R5bGUsIGNoYXIpIHtcbiAgICAgICAgaWYoc3R5bGUgPT09ICdhbGwnIHx8IHN0eWxlID09PSBudWxsKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIChzdHlsZS5pbmRleE9mKGNoYXIpID4gLTEpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG1hcFZhbHVlKHN0eWxlLCB2YWx1ZSkge1xuICAgICAgICBpZihzdHlsZSA9PT0gbnVsbCkgcmV0dXJuIHZhbHVlO1xuICAgICAgICByZXR1cm4gc3R5bGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhd1RyaShzdHlsZSwgeHl6diwgYWJjKSB7XG4gICAgICAgIGJlZ2luR3JvdXAoKTtcblxuICAgICAgICB2YXIgYWxsWFlaVnMgPSBbeHl6dl07XG4gICAgICAgIHZhciBhbGxBQkNzID0gW2FiY107XG4gICAgICAgIGlmKGFjdGl2ZUZpbGwgPj0gMSkge1xuICAgICAgICAgICAgYWxsWFlaVnMgPSBbeHl6dl07XG4gICAgICAgICAgICBhbGxBQkNzID0gW2FiY107XG4gICAgICAgIH0gZWxzZSBpZihhY3RpdmVGaWxsID4gMCkge1xuICAgICAgICAgICAgdmFyIG9wZW5UcmkgPSBjcmVhdGVPcGVuVHJpKHh5enYsIGFiYyk7XG4gICAgICAgICAgICBhbGxYWVpWcyA9IG9wZW5UcmkueHl6djtcbiAgICAgICAgICAgIGFsbEFCQ3MgPSBvcGVuVHJpLmFiYztcbiAgICAgICAgfVxuXG4gICAgICAgIGZvcih2YXIgZiA9IDA7IGYgPCBhbGxYWVpWcy5sZW5ndGg7IGYrKykge1xuICAgICAgICAgICAgeHl6diA9IGFsbFhZWlZzW2ZdO1xuICAgICAgICAgICAgYWJjID0gYWxsQUJDc1tmXTtcblxuICAgICAgICAgICAgdmFyIHBudHMgPSBbXTtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IHh5enZbaV1bMF07XG4gICAgICAgICAgICAgICAgdmFyIHkgPSB4eXp2W2ldWzFdO1xuICAgICAgICAgICAgICAgIHZhciB6ID0geHl6dltpXVsyXTtcbiAgICAgICAgICAgICAgICB2YXIgdiA9IHh5enZbaV1bM107XG5cbiAgICAgICAgICAgICAgICB2YXIgaWQgPSAoYWJjW2ldID4gLTEpID8gYWJjW2ldIDogZmluZFZlcnRleElkKHgsIHksIHopO1xuICAgICAgICAgICAgICAgIGlmKGlkID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgcG50c1tpXSA9IGlkO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBudHNbaV0gPSBhZGRWZXJ0ZXgoeCwgeSwgeiwgbWFwVmFsdWUoc3R5bGUsIHYpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGFkZEZhY2UocG50c1swXSwgcG50c1sxXSwgcG50c1syXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3UXVhZChzdHlsZSwgeHl6diwgYWJjZCkge1xuICAgICAgICB2YXIgbWFrZVRyaSA9IGZ1bmN0aW9uKGksIGosIGspIHtcbiAgICAgICAgICAgIGRyYXdUcmkoc3R5bGUsIFt4eXp2W2ldLCB4eXp2W2pdLCB4eXp2W2tdXSwgW2FiY2RbaV0sIGFiY2Rbal0sIGFiY2Rba11dKTtcbiAgICAgICAgfTtcblxuICAgICAgICBtYWtlVHJpKDAsIDEsIDIpO1xuICAgICAgICBtYWtlVHJpKDIsIDMsIDApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdUZXRyYShzdHlsZSwgeHl6diwgYWJjZCkge1xuICAgICAgICB2YXIgbWFrZVRyaSA9IGZ1bmN0aW9uKGksIGosIGspIHtcbiAgICAgICAgICAgIGRyYXdUcmkoc3R5bGUsIFt4eXp2W2ldLCB4eXp2W2pdLCB4eXp2W2tdXSwgW2FiY2RbaV0sIGFiY2Rbal0sIGFiY2Rba11dKTtcbiAgICAgICAgfTtcblxuICAgICAgICBtYWtlVHJpKDAsIDEsIDIpO1xuICAgICAgICBtYWtlVHJpKDMsIDAsIDEpO1xuICAgICAgICBtYWtlVHJpKDIsIDMsIDApO1xuICAgICAgICBtYWtlVHJpKDEsIDIsIDMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhbGNJbnRlcnNlY3Rpb24ocG9pbnRPdXQsIHBvaW50SW4sIG1pbiwgbWF4KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHBvaW50T3V0WzNdO1xuXG4gICAgICAgIGlmKHZhbHVlIDwgbWluKSB2YWx1ZSA9IG1pbjtcbiAgICAgICAgaWYodmFsdWUgPiBtYXgpIHZhbHVlID0gbWF4O1xuXG4gICAgICAgIHZhciByYXRpbyA9IChwb2ludE91dFszXSAtIHZhbHVlKSAvIChwb2ludE91dFszXSAtIHBvaW50SW5bM10gKyAwLjAwMDAwMDAwMSk7IC8vIHdlIGhhZCB0byBhZGQgdGhpcyBlcnJvciB0byBmb3JjZSBzb2x2ZSB0aGUgdGlueSBjYXBzXG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICBmb3IodmFyIHMgPSAwOyBzIDwgNDsgcysrKSB7XG4gICAgICAgICAgICByZXN1bHRbc10gPSAoMSAtIHJhdGlvKSAqIHBvaW50T3V0W3NdICsgcmF0aW8gKiBwb2ludEluW3NdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5SYW5nZSh2YWx1ZSwgbWluLCBtYXgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHZhbHVlID49IG1pbiAmJlxuICAgICAgICAgICAgdmFsdWUgPD0gbWF4XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWxtb3N0SW5GaW5hbFJhbmdlKHZhbHVlKSB7XG4gICAgICAgIHZhciB2RXJyID0gMC4wMDEgKiAodk1heCAtIHZNaW4pO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdmFsdWUgPj0gdk1pbiAtIHZFcnIgJiZcbiAgICAgICAgICAgIHZhbHVlIDw9IHZNYXggKyB2RXJyXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0WFlaVihpbmRlY2llcykge1xuICAgICAgICB2YXIgeHl6diA9IFtdO1xuICAgICAgICBmb3IodmFyIHEgPSAwOyBxIDwgNDsgcSsrKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBpbmRlY2llc1txXTtcbiAgICAgICAgICAgIHh5enYucHVzaChcbiAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuX3hbaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICBkYXRhLl95W2luZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YS5feltpbmRleF0sXG4gICAgICAgICAgICAgICAgICAgIGRhdGEuX3ZhbHVlW2luZGV4XVxuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geHl6djtcbiAgICB9XG5cbiAgICB2YXIgTUFYX1BBU1MgPSAzO1xuXG4gICAgZnVuY3Rpb24gdHJ5Q3JlYXRlVHJpKHN0eWxlLCB4eXp2LCBhYmMsIG1pbiwgbWF4LCBuUGFzcykge1xuICAgICAgICBpZighblBhc3MpIG5QYXNzID0gMTtcblxuICAgICAgICBhYmMgPSBbLTEsIC0xLCAtMV07IC8vIE5vdGU6IGZvciB0aGUgbW9tZW50IHdlIG92ZXJyaWRlIGluZGljZXNcbiAgICAgICAgLy8gdG8gcnVuIGZhc3RlciEgQnV0IGl0IGlzIHBvc3NpYmxlIHRvIGNvbW1lbnQgdGhpcyBsaW5lXG4gICAgICAgIC8vIHRvIHJlZHVjZSB0aGUgbnVtYmVyIG9mIHZlcnRpY2VzLlxuXG4gICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICB2YXIgb2sgPSBbXG4gICAgICAgICAgICBpblJhbmdlKHh5enZbMF1bM10sIG1pbiwgbWF4KSxcbiAgICAgICAgICAgIGluUmFuZ2UoeHl6dlsxXVszXSwgbWluLCBtYXgpLFxuICAgICAgICAgICAgaW5SYW5nZSh4eXp2WzJdWzNdLCBtaW4sIG1heClcbiAgICAgICAgXTtcblxuICAgICAgICBpZighb2tbMF0gJiYgIW9rWzFdICYmICFva1syXSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRyeURyYXdUcmkgPSBmdW5jdGlvbihzdHlsZSwgeHl6diwgYWJjKSB7XG4gICAgICAgICAgICBpZiggLy8gd2UgY2hlY2sgaGVyZSBpZiB0aGUgcG9pbnRzIGFyZSBpbiBgcmVhbGAgaXNvLW1pbi9tYXggcmFuZ2VcbiAgICAgICAgICAgICAgICBhbG1vc3RJbkZpbmFsUmFuZ2UoeHl6dlswXVszXSkgJiZcbiAgICAgICAgICAgICAgICBhbG1vc3RJbkZpbmFsUmFuZ2UoeHl6dlsxXVszXSkgJiZcbiAgICAgICAgICAgICAgICBhbG1vc3RJbkZpbmFsUmFuZ2UoeHl6dlsyXVszXSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGRyYXdUcmkoc3R5bGUsIHh5enYsIGFiYyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYoblBhc3MgPCBNQVhfUEFTUykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnlDcmVhdGVUcmkoc3R5bGUsIHh5enYsIGFiYywgdk1pbiwgdk1heCwgKytuUGFzcyk7IC8vIGkuZS4gc2Vjb25kIHBhc3MgdXNpbmcgYWN0dWFsIHZNaW4gdk1heCBib3VuZHNcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfTtcblxuICAgICAgICBpZihva1swXSAmJiBva1sxXSAmJiBva1syXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRyeURyYXdUcmkoc3R5bGUsIHh5enYsIGFiYykgfHwgcmVzdWx0O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGludGVycG9sYXRlZCA9IGZhbHNlO1xuXG4gICAgICAgIFtcbiAgICAgICAgICAgIFswLCAxLCAyXSxcbiAgICAgICAgICAgIFsyLCAwLCAxXSxcbiAgICAgICAgICAgIFsxLCAyLCAwXVxuICAgICAgICBdLmZvckVhY2goZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYob2tbZVswXV0gJiYgb2tbZVsxXV0gJiYgIW9rW2VbMl1dKSB7XG4gICAgICAgICAgICAgICAgdmFyIEEgPSB4eXp2W2VbMF1dO1xuICAgICAgICAgICAgICAgIHZhciBCID0geHl6dltlWzFdXTtcbiAgICAgICAgICAgICAgICB2YXIgQyA9IHh5enZbZVsyXV07XG5cbiAgICAgICAgICAgICAgICB2YXIgcDEgPSBjYWxjSW50ZXJzZWN0aW9uKEMsIEEsIG1pbiwgbWF4KTtcbiAgICAgICAgICAgICAgICB2YXIgcDIgPSBjYWxjSW50ZXJzZWN0aW9uKEMsIEIsIG1pbiwgbWF4KTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURyYXdUcmkoc3R5bGUsIFtwMiwgcDEsIEFdLCBbLTEsIC0xLCBhYmNbZVswXV1dKSB8fCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5RHJhd1RyaShzdHlsZSwgW0EsIEIsIHAyXSwgW2FiY1tlWzBdXSwgYWJjW2VbMV1dLCAtMV0pIHx8IHJlc3VsdDtcblxuICAgICAgICAgICAgICAgIGludGVycG9sYXRlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZihpbnRlcnBvbGF0ZWQpIHJldHVybiByZXN1bHQ7XG5cbiAgICAgICAgW1xuICAgICAgICAgICAgWzAsIDEsIDJdLFxuICAgICAgICAgICAgWzEsIDIsIDBdLFxuICAgICAgICAgICAgWzIsIDAsIDFdXG4gICAgICAgIF0uZm9yRWFjaChmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZihva1tlWzBdXSAmJiAhb2tbZVsxXV0gJiYgIW9rW2VbMl1dKSB7XG4gICAgICAgICAgICAgICAgdmFyIEEgPSB4eXp2W2VbMF1dO1xuICAgICAgICAgICAgICAgIHZhciBCID0geHl6dltlWzFdXTtcbiAgICAgICAgICAgICAgICB2YXIgQyA9IHh5enZbZVsyXV07XG5cbiAgICAgICAgICAgICAgICB2YXIgcDEgPSBjYWxjSW50ZXJzZWN0aW9uKEIsIEEsIG1pbiwgbWF4KTtcbiAgICAgICAgICAgICAgICB2YXIgcDIgPSBjYWxjSW50ZXJzZWN0aW9uKEMsIEEsIG1pbiwgbWF4KTtcblxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeURyYXdUcmkoc3R5bGUsIFtwMiwgcDEsIEFdLCBbLTEsIC0xLCBhYmNbZVswXV1dKSB8fCByZXN1bHQ7XG5cbiAgICAgICAgICAgICAgICBpbnRlcnBvbGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cnlDcmVhdGVUZXRyYShzdHlsZSwgYWJjZCwgbWluLCBtYXgpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAgIHZhciB4eXp2ID0gZ2V0WFlaVihhYmNkKTtcblxuICAgICAgICB2YXIgb2sgPSBbXG4gICAgICAgICAgICBpblJhbmdlKHh5enZbMF1bM10sIG1pbiwgbWF4KSxcbiAgICAgICAgICAgIGluUmFuZ2UoeHl6dlsxXVszXSwgbWluLCBtYXgpLFxuICAgICAgICAgICAgaW5SYW5nZSh4eXp2WzJdWzNdLCBtaW4sIG1heCksXG4gICAgICAgICAgICBpblJhbmdlKHh5enZbM11bM10sIG1pbiwgbWF4KVxuICAgICAgICBdO1xuXG4gICAgICAgIGlmKCFva1swXSAmJiAhb2tbMV0gJiYgIW9rWzJdICYmICFva1szXSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9rWzBdICYmIG9rWzFdICYmIG9rWzJdICYmIG9rWzNdKSB7XG4gICAgICAgICAgICBpZihkcmF3aW5nU3BhY2VmcmFtZSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRyYXdUZXRyYShzdHlsZSwgeHl6diwgYWJjZCkgfHwgcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBpbnRlcnBvbGF0ZWQgPSBmYWxzZTtcblxuICAgICAgICBbXG4gICAgICAgICAgICBbMCwgMSwgMiwgM10sXG4gICAgICAgICAgICBbMywgMCwgMSwgMl0sXG4gICAgICAgICAgICBbMiwgMywgMCwgMV0sXG4gICAgICAgICAgICBbMSwgMiwgMywgMF1cbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmKG9rW2VbMF1dICYmIG9rW2VbMV1dICYmIG9rW2VbMl1dICYmICFva1tlWzNdXSkge1xuICAgICAgICAgICAgICAgIHZhciBBID0geHl6dltlWzBdXTtcbiAgICAgICAgICAgICAgICB2YXIgQiA9IHh5enZbZVsxXV07XG4gICAgICAgICAgICAgICAgdmFyIEMgPSB4eXp2W2VbMl1dO1xuICAgICAgICAgICAgICAgIHZhciBEID0geHl6dltlWzNdXTtcblxuICAgICAgICAgICAgICAgIGlmKGRyYXdpbmdTcGFjZWZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRyYXdUcmkoc3R5bGUsIFtBLCBCLCBDXSwgW2FiY2RbZVswXV0sIGFiY2RbZVsxXV0sIGFiY2RbZVsyXV1dKSB8fCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHAxID0gY2FsY0ludGVyc2VjdGlvbihELCBBLCBtaW4sIG1heCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBwMiA9IGNhbGNJbnRlcnNlY3Rpb24oRCwgQiwgbWluLCBtYXgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcDMgPSBjYWxjSW50ZXJzZWN0aW9uKEQsIEMsIG1pbiwgbWF4KTtcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBkcmF3VHJpKG51bGwsIFtwMSwgcDIsIHAzXSwgWy0xLCAtMSwgLTFdKSB8fCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGludGVycG9sYXRlZCkgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICBbXG4gICAgICAgICAgICBbMCwgMSwgMiwgM10sXG4gICAgICAgICAgICBbMSwgMiwgMywgMF0sXG4gICAgICAgICAgICBbMiwgMywgMCwgMV0sXG4gICAgICAgICAgICBbMywgMCwgMSwgMl0sXG4gICAgICAgICAgICBbMCwgMiwgMywgMV0sXG4gICAgICAgICAgICBbMSwgMywgMiwgMF1cbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmKG9rW2VbMF1dICYmIG9rW2VbMV1dICYmICFva1tlWzJdXSAmJiAhb2tbZVszXV0pIHtcbiAgICAgICAgICAgICAgICB2YXIgQSA9IHh5enZbZVswXV07XG4gICAgICAgICAgICAgICAgdmFyIEIgPSB4eXp2W2VbMV1dO1xuICAgICAgICAgICAgICAgIHZhciBDID0geHl6dltlWzJdXTtcbiAgICAgICAgICAgICAgICB2YXIgRCA9IHh5enZbZVszXV07XG5cbiAgICAgICAgICAgICAgICB2YXIgcDEgPSBjYWxjSW50ZXJzZWN0aW9uKEMsIEEsIG1pbiwgbWF4KTtcbiAgICAgICAgICAgICAgICB2YXIgcDIgPSBjYWxjSW50ZXJzZWN0aW9uKEMsIEIsIG1pbiwgbWF4KTtcbiAgICAgICAgICAgICAgICB2YXIgcDMgPSBjYWxjSW50ZXJzZWN0aW9uKEQsIEIsIG1pbiwgbWF4KTtcbiAgICAgICAgICAgICAgICB2YXIgcDQgPSBjYWxjSW50ZXJzZWN0aW9uKEQsIEEsIG1pbiwgbWF4KTtcblxuICAgICAgICAgICAgICAgIGlmKGRyYXdpbmdTcGFjZWZyYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRyYXdUcmkoc3R5bGUsIFtBLCBwNCwgcDFdLCBbYWJjZFtlWzBdXSwgLTEsIC0xXSkgfHwgcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBkcmF3VHJpKHN0eWxlLCBbQiwgcDIsIHAzXSwgW2FiY2RbZVsxXV0sIC0xLCAtMV0pIHx8IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBkcmF3UXVhZChudWxsLCBbcDEsIHAyLCBwMywgcDRdLCBbLTEsIC0xLCAtMSwgLTFdKSB8fCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaW50ZXJwb2xhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmKGludGVycG9sYXRlZCkgcmV0dXJuIHJlc3VsdDtcblxuICAgICAgICBbXG4gICAgICAgICAgICBbMCwgMSwgMiwgM10sXG4gICAgICAgICAgICBbMSwgMiwgMywgMF0sXG4gICAgICAgICAgICBbMiwgMywgMCwgMV0sXG4gICAgICAgICAgICBbMywgMCwgMSwgMl1cbiAgICAgICAgXS5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmKG9rW2VbMF1dICYmICFva1tlWzFdXSAmJiAhb2tbZVsyXV0gJiYgIW9rW2VbM11dKSB7XG4gICAgICAgICAgICAgICAgdmFyIEEgPSB4eXp2W2VbMF1dO1xuICAgICAgICAgICAgICAgIHZhciBCID0geHl6dltlWzFdXTtcbiAgICAgICAgICAgICAgICB2YXIgQyA9IHh5enZbZVsyXV07XG4gICAgICAgICAgICAgICAgdmFyIEQgPSB4eXp2W2VbM11dO1xuXG4gICAgICAgICAgICAgICAgdmFyIHAxID0gY2FsY0ludGVyc2VjdGlvbihCLCBBLCBtaW4sIG1heCk7XG4gICAgICAgICAgICAgICAgdmFyIHAyID0gY2FsY0ludGVyc2VjdGlvbihDLCBBLCBtaW4sIG1heCk7XG4gICAgICAgICAgICAgICAgdmFyIHAzID0gY2FsY0ludGVyc2VjdGlvbihELCBBLCBtaW4sIG1heCk7XG5cbiAgICAgICAgICAgICAgICBpZihkcmF3aW5nU3BhY2VmcmFtZSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBkcmF3VHJpKHN0eWxlLCBbQSwgcDEsIHAyXSwgW2FiY2RbZVswXV0sIC0xLCAtMV0pIHx8IHJlc3VsdDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gZHJhd1RyaShzdHlsZSwgW0EsIHAyLCBwM10sIFthYmNkW2VbMF1dLCAtMSwgLTFdKSB8fCByZXN1bHQ7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRyYXdUcmkoc3R5bGUsIFtBLCBwMywgcDFdLCBbYWJjZFtlWzBdXSwgLTEsIC0xXSkgfHwgcmVzdWx0O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGRyYXdUcmkobnVsbCwgW3AxLCBwMiwgcDNdLCBbLTEsIC0xLCAtMV0pIHx8IHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpbnRlcnBvbGF0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRDdWJlKHN0eWxlLCBwMDAwLCBwMDAxLCBwMDEwLCBwMDExLCBwMTAwLCBwMTAxLCBwMTEwLCBwMTExLCBtaW4sIG1heCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgaWYoZHJhd2luZ1N1cmZhY2UpIHtcbiAgICAgICAgICAgIGlmKHN0eWxlSW5jbHVkZXMoc3R5bGUsICdBJykpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnlDcmVhdGVUZXRyYShudWxsLCBbcDAwMCwgcDAwMSwgcDAxMCwgcDEwMF0sIG1pbiwgbWF4KSB8fCByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihzdHlsZUluY2x1ZGVzKHN0eWxlLCAnQicpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5Q3JlYXRlVGV0cmEobnVsbCwgW3AwMDEsIHAwMTAsIHAwMTEsIHAxMTFdLCBtaW4sIG1heCkgfHwgcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoc3R5bGVJbmNsdWRlcyhzdHlsZSwgJ0MnKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRyeUNyZWF0ZVRldHJhKG51bGwsIFtwMDAxLCBwMTAwLCBwMTAxLCBwMTExXSwgbWluLCBtYXgpIHx8IHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHN0eWxlSW5jbHVkZXMoc3R5bGUsICdEJykpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnlDcmVhdGVUZXRyYShudWxsLCBbcDAxMCwgcDEwMCwgcDExMCwgcDExMV0sIG1pbiwgbWF4KSB8fCByZXN1bHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihzdHlsZUluY2x1ZGVzKHN0eWxlLCAnRScpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gdHJ5Q3JlYXRlVGV0cmEobnVsbCwgW3AwMDEsIHAwMTAsIHAxMDAsIHAxMTFdLCBtaW4sIG1heCkgfHwgcmVzdWx0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoZHJhd2luZ1NwYWNlZnJhbWUpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRyeUNyZWF0ZVRldHJhKHN0eWxlLCBbcDAwMSwgcDAxMCwgcDEwMCwgcDExMV0sIG1pbiwgbWF4KSB8fCByZXN1bHQ7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFJlY3Qoc3R5bGUsIGEsIGIsIGMsIGQsIG1pbiwgbWF4LCBwcmV2aW91c1Jlc3VsdCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgKHByZXZpb3VzUmVzdWx0WzBdID09PSB0cnVlKSA/IHRydWUgOlxuICAgICAgICAgICAgdHJ5Q3JlYXRlVHJpKHN0eWxlLCBnZXRYWVpWKFthLCBiLCBjXSksIFthLCBiLCBjXSwgbWluLCBtYXgpLFxuICAgICAgICAgICAgKHByZXZpb3VzUmVzdWx0WzFdID09PSB0cnVlKSA/IHRydWUgOlxuICAgICAgICAgICAgdHJ5Q3JlYXRlVHJpKHN0eWxlLCBnZXRYWVpWKFtjLCBkLCBhXSksIFtjLCBkLCBhXSwgbWluLCBtYXgpXG4gICAgICAgIF07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmVnaW4yZENlbGwoc3R5bGUsIHAwMCwgcDAxLCBwMTAsIHAxMSwgbWluLCBtYXgsIGlzRXZlbiwgcHJldmlvdXNSZXN1bHQpIHtcbiAgICAgICAgLy8gdXNlZCB0byBjcmVhdGUgY2FwcyBhbmQvb3Igc2xpY2VzIG9uIGV4YWN0IGF4aXMgcG9pbnRzXG4gICAgICAgIGlmKGlzRXZlbikge1xuICAgICAgICAgICAgcmV0dXJuIGFkZFJlY3Qoc3R5bGUsIHAwMCwgcDAxLCBwMTEsIHAxMCwgbWluLCBtYXgsIHByZXZpb3VzUmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBhZGRSZWN0KHN0eWxlLCBwMDEsIHAxMSwgcDEwLCBwMDAsIG1pbiwgbWF4LCBwcmV2aW91c1Jlc3VsdCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiZWdpblNlY3Rpb24oc3R5bGUsIGksIGosIGssIG1pbiwgbWF4LCBkaXN0UmF0aW9zKSB7XG4gICAgICAgIC8vIHVzZWQgdG8gY3JlYXRlIHNsaWNlcyBiZXR3ZWVuIGF4aXMgcG9pbnRzXG5cbiAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB2YXIgQSwgQiwgQywgRDtcblxuICAgICAgICB2YXIgbWFrZVNlY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJlc3VsdCA9IHRyeUNyZWF0ZVRyaShzdHlsZSwgW0EsIEIsIENdLCBbLTEsIC0xLCAtMV0sIG1pbiwgbWF4KSB8fCByZXN1bHQ7XG4gICAgICAgICAgICByZXN1bHQgPSB0cnlDcmVhdGVUcmkoc3R5bGUsIFtDLCBELCBBXSwgWy0xLCAtMSwgLTFdLCBtaW4sIG1heCkgfHwgcmVzdWx0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciByWCA9IGRpc3RSYXRpb3NbMF07XG4gICAgICAgIHZhciByWSA9IGRpc3RSYXRpb3NbMV07XG4gICAgICAgIHZhciByWiA9IGRpc3RSYXRpb3NbMl07XG5cbiAgICAgICAgaWYoclgpIHtcbiAgICAgICAgICAgIEEgPSBnZXRCZXR3ZWVuKGdldFhZWlYoW2dldEluZGV4KGksIGogLSAwLCBrIC0gMCldKVswXSwgZ2V0WFlaVihbZ2V0SW5kZXgoaSAtIDEsIGogLSAwLCBrIC0gMCldKVswXSwgclgpO1xuICAgICAgICAgICAgQiA9IGdldEJldHdlZW4oZ2V0WFlaVihbZ2V0SW5kZXgoaSwgaiAtIDAsIGsgLSAxKV0pWzBdLCBnZXRYWVpWKFtnZXRJbmRleChpIC0gMSwgaiAtIDAsIGsgLSAxKV0pWzBdLCByWCk7XG4gICAgICAgICAgICBDID0gZ2V0QmV0d2VlbihnZXRYWVpWKFtnZXRJbmRleChpLCBqIC0gMSwgayAtIDEpXSlbMF0sIGdldFhZWlYoW2dldEluZGV4KGkgLSAxLCBqIC0gMSwgayAtIDEpXSlbMF0sIHJYKTtcbiAgICAgICAgICAgIEQgPSBnZXRCZXR3ZWVuKGdldFhZWlYoW2dldEluZGV4KGksIGogLSAxLCBrIC0gMCldKVswXSwgZ2V0WFlaVihbZ2V0SW5kZXgoaSAtIDEsIGogLSAxLCBrIC0gMCldKVswXSwgclgpO1xuICAgICAgICAgICAgbWFrZVNlY3Rpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHJZKSB7XG4gICAgICAgICAgICBBID0gZ2V0QmV0d2VlbihnZXRYWVpWKFtnZXRJbmRleChpIC0gMCwgaiwgayAtIDApXSlbMF0sIGdldFhZWlYoW2dldEluZGV4KGkgLSAwLCBqIC0gMSwgayAtIDApXSlbMF0sIHJZKTtcbiAgICAgICAgICAgIEIgPSBnZXRCZXR3ZWVuKGdldFhZWlYoW2dldEluZGV4KGkgLSAwLCBqLCBrIC0gMSldKVswXSwgZ2V0WFlaVihbZ2V0SW5kZXgoaSAtIDAsIGogLSAxLCBrIC0gMSldKVswXSwgclkpO1xuICAgICAgICAgICAgQyA9IGdldEJldHdlZW4oZ2V0WFlaVihbZ2V0SW5kZXgoaSAtIDEsIGosIGsgLSAxKV0pWzBdLCBnZXRYWVpWKFtnZXRJbmRleChpIC0gMSwgaiAtIDEsIGsgLSAxKV0pWzBdLCByWSk7XG4gICAgICAgICAgICBEID0gZ2V0QmV0d2VlbihnZXRYWVpWKFtnZXRJbmRleChpIC0gMSwgaiwgayAtIDApXSlbMF0sIGdldFhZWlYoW2dldEluZGV4KGkgLSAxLCBqIC0gMSwgayAtIDApXSlbMF0sIHJZKTtcbiAgICAgICAgICAgIG1ha2VTZWN0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihyWikge1xuICAgICAgICAgICAgQSA9IGdldEJldHdlZW4oZ2V0WFlaVihbZ2V0SW5kZXgoaSAtIDAsIGogLSAwLCBrKV0pWzBdLCBnZXRYWVpWKFtnZXRJbmRleChpIC0gMCwgaiAtIDAsIGsgLSAxKV0pWzBdLCByWik7XG4gICAgICAgICAgICBCID0gZ2V0QmV0d2VlbihnZXRYWVpWKFtnZXRJbmRleChpIC0gMCwgaiAtIDEsIGspXSlbMF0sIGdldFhZWlYoW2dldEluZGV4KGkgLSAwLCBqIC0gMSwgayAtIDEpXSlbMF0sIHJaKTtcbiAgICAgICAgICAgIEMgPSBnZXRCZXR3ZWVuKGdldFhZWlYoW2dldEluZGV4KGkgLSAxLCBqIC0gMSwgayldKVswXSwgZ2V0WFlaVihbZ2V0SW5kZXgoaSAtIDEsIGogLSAxLCBrIC0gMSldKVswXSwgclopO1xuICAgICAgICAgICAgRCA9IGdldEJldHdlZW4oZ2V0WFlaVihbZ2V0SW5kZXgoaSAtIDEsIGogLSAwLCBrKV0pWzBdLCBnZXRYWVpWKFtnZXRJbmRleChpIC0gMSwgaiAtIDAsIGsgLSAxKV0pWzBdLCByWik7XG4gICAgICAgICAgICBtYWtlU2VjdGlvbigpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiZWdpbjNkQ2VsbChzdHlsZSwgcDAwMCwgcDAwMSwgcDAxMCwgcDAxMSwgcDEwMCwgcDEwMSwgcDExMCwgcDExMSwgbWluLCBtYXgsIGlzRXZlbikge1xuICAgICAgICAvLyB1c2VkIHRvIGNyZWF0ZSBzcGFjZWZyYW1lIGFuZC9vciBpc28tc3VyZmFjZXNcblxuICAgICAgICB2YXIgY2VsbFN0eWxlID0gc3R5bGU7XG4gICAgICAgIGlmKGlzRXZlbikge1xuICAgICAgICAgICAgaWYoZHJhd2luZ1N1cmZhY2UgJiYgc3R5bGUgPT09ICdldmVuJykgY2VsbFN0eWxlID0gbnVsbDtcbiAgICAgICAgICAgIHJldHVybiBhZGRDdWJlKGNlbGxTdHlsZSwgcDAwMCwgcDAwMSwgcDAxMCwgcDAxMSwgcDEwMCwgcDEwMSwgcDExMCwgcDExMSwgbWluLCBtYXgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYoZHJhd2luZ1N1cmZhY2UgJiYgc3R5bGUgPT09ICdvZGQnKSBjZWxsU3R5bGUgPSBudWxsO1xuICAgICAgICAgICAgcmV0dXJuIGFkZEN1YmUoY2VsbFN0eWxlLCBwMTExLCBwMTEwLCBwMTAxLCBwMTAwLCBwMDExLCBwMDEwLCBwMDAxLCBwMDAwLCBtaW4sIG1heCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3MmRYKHN0eWxlLCBpdGVtcywgbWluLCBtYXgsIHByZXZpb3VzUmVzdWx0KSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgdmFyIG4gPSAwO1xuICAgICAgICBmb3IodmFyIHEgPSAwOyBxIDwgaXRlbXMubGVuZ3RoOyBxKyspIHtcbiAgICAgICAgICAgIHZhciBpID0gaXRlbXNbcV07XG4gICAgICAgICAgICBmb3IodmFyIGsgPSAxOyBrIDwgZGVwdGg7IGsrKykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luMmRDZWxsKHN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEluZGV4KGksIGogLSAxLCBrIC0gMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SW5kZXgoaSwgaiAtIDEsIGspLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEluZGV4KGksIGosIGsgLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJbmRleChpLCBqLCBrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpICsgaiArIGspICUgMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJldmlvdXNSZXN1bHQgJiYgcHJldmlvdXNSZXN1bHRbbl0pID8gcHJldmlvdXNSZXN1bHRbbl0gOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhdzJkWShzdHlsZSwgaXRlbXMsIG1pbiwgbWF4LCBwcmV2aW91c1Jlc3VsdCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBuID0gMDtcbiAgICAgICAgZm9yKHZhciBxID0gMDsgcSA8IGl0ZW1zLmxlbmd0aDsgcSsrKSB7XG4gICAgICAgICAgICB2YXIgaiA9IGl0ZW1zW3FdO1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMTsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGsgPSAxOyBrIDwgZGVwdGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHQucHVzaChcbiAgICAgICAgICAgICAgICAgICAgICAgIGJlZ2luMmRDZWxsKHN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEluZGV4KGkgLSAxLCBqLCBrIC0gMSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SW5kZXgoaSwgaiwgayAtIDEpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEluZGV4KGkgLSAxLCBqLCBrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJbmRleChpLCBqLCBrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWF4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChpICsgaiArIGspICUgMixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJldmlvdXNSZXN1bHQgJiYgcHJldmlvdXNSZXN1bHRbbl0pID8gcHJldmlvdXNSZXN1bHRbbl0gOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZHJhdzJkWihzdHlsZSwgaXRlbXMsIG1pbiwgbWF4LCBwcmV2aW91c1Jlc3VsdCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBuID0gMDtcbiAgICAgICAgZm9yKHZhciBxID0gMDsgcSA8IGl0ZW1zLmxlbmd0aDsgcSsrKSB7XG4gICAgICAgICAgICB2YXIgayA9IGl0ZW1zW3FdO1xuICAgICAgICAgICAgZm9yKHZhciBqID0gMTsgaiA8IGhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMTsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpbjJkQ2VsbChzdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJbmRleChpIC0gMSwgaiAtIDEsIGspLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEluZGV4KGkgLSAxLCBqLCBrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRJbmRleChpLCBqIC0gMSwgayksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SW5kZXgoaSwgaiwgayksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoaSArIGogKyBrKSAlIDIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKHByZXZpb3VzUmVzdWx0ICYmIHByZXZpb3VzUmVzdWx0W25dKSA/IHByZXZpb3VzUmVzdWx0W25dIDogW11cbiAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgbisrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXczZChzdHlsZSwgbWluLCBtYXgpIHtcbiAgICAgICAgZm9yKHZhciBrID0gMTsgayA8IGRlcHRoOyBrKyspIHtcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGJlZ2luM2RDZWxsKHN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SW5kZXgoaSAtIDEsIGogLSAxLCBrIC0gMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJbmRleChpIC0gMSwgaiAtIDEsIGspLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SW5kZXgoaSAtIDEsIGosIGsgLSAxKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEluZGV4KGkgLSAxLCBqLCBrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldEluZGV4KGksIGogLSAxLCBrIC0gMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJbmRleChpLCBqIC0gMSwgayksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJbmRleChpLCBqLCBrIC0gMSksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRJbmRleChpLCBqLCBrKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heCxcbiAgICAgICAgICAgICAgICAgICAgICAgIChpICsgaiArIGspICUgMlxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdTcGFjZWZyYW1lKHN0eWxlLCBtaW4sIG1heCkge1xuICAgICAgICBkcmF3aW5nU3BhY2VmcmFtZSA9IHRydWU7XG4gICAgICAgIGRyYXczZChzdHlsZSwgbWluLCBtYXgpO1xuICAgICAgICBkcmF3aW5nU3BhY2VmcmFtZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdTdXJmYWNlKHN0eWxlLCBtaW4sIG1heCkge1xuICAgICAgICBkcmF3aW5nU3VyZmFjZSA9IHRydWU7XG4gICAgICAgIGRyYXczZChzdHlsZSwgbWluLCBtYXgpO1xuICAgICAgICBkcmF3aW5nU3VyZmFjZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRyYXdTZWN0aW9uWChzdHlsZSwgaXRlbXMsIG1pbiwgbWF4LCBkaXN0UmF0aW9zLCBwcmV2aW91c1Jlc3VsdCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBuID0gMDtcbiAgICAgICAgZm9yKHZhciBxID0gMDsgcSA8IGl0ZW1zLmxlbmd0aDsgcSsrKSB7XG4gICAgICAgICAgICB2YXIgaSA9IGl0ZW1zW3FdO1xuICAgICAgICAgICAgZm9yKHZhciBrID0gMTsgayA8IGRlcHRoOyBrKyspIHtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAxOyBqIDwgaGVpZ2h0OyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpblNlY3Rpb24oc3R5bGUsIGksIGosIGssIG1pbiwgbWF4LCBkaXN0UmF0aW9zW3FdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcmV2aW91c1Jlc3VsdCAmJiBwcmV2aW91c1Jlc3VsdFtuXSkgPyBwcmV2aW91c1Jlc3VsdFtuXSA6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3U2VjdGlvblkoc3R5bGUsIGl0ZW1zLCBtaW4sIG1heCwgZGlzdFJhdGlvcywgcHJldmlvdXNSZXN1bHQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB2YXIgbiA9IDA7XG4gICAgICAgIGZvcih2YXIgcSA9IDA7IHEgPCBpdGVtcy5sZW5ndGg7IHErKykge1xuICAgICAgICAgICAgdmFyIGogPSBpdGVtc1txXTtcbiAgICAgICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBrID0gMTsgayA8IGRlcHRoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goXG4gICAgICAgICAgICAgICAgICAgICAgICBiZWdpblNlY3Rpb24oc3R5bGUsIGksIGosIGssIG1pbiwgbWF4LCBkaXN0UmF0aW9zW3FdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChwcmV2aW91c1Jlc3VsdCAmJiBwcmV2aW91c1Jlc3VsdFtuXSkgPyBwcmV2aW91c1Jlc3VsdFtuXSA6IFtdXG4gICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3U2VjdGlvblooc3R5bGUsIGl0ZW1zLCBtaW4sIG1heCwgZGlzdFJhdGlvcywgcHJldmlvdXNSZXN1bHQpIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB2YXIgbiA9IDA7XG4gICAgICAgIGZvcih2YXIgcSA9IDA7IHEgPCBpdGVtcy5sZW5ndGg7IHErKykge1xuICAgICAgICAgICAgdmFyIGsgPSBpdGVtc1txXTtcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaSA9IDE7IGkgPCB3aWR0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKFxuICAgICAgICAgICAgICAgICAgICAgICAgYmVnaW5TZWN0aW9uKHN0eWxlLCBpLCBqLCBrLCBtaW4sIG1heCwgZGlzdFJhdGlvc1txXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAocHJldmlvdXNSZXN1bHQgJiYgcHJldmlvdXNSZXN1bHRbbl0pID8gcHJldmlvdXNSZXN1bHRbbl0gOiBbXVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUmFuZ2UoYSwgYikge1xuICAgICAgICB2YXIgcmFuZ2UgPSBbXTtcbiAgICAgICAgZm9yKHZhciBxID0gYTsgcSA8IGI7IHErKykge1xuICAgICAgICAgICAgcmFuZ2UucHVzaChxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmFuZ2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zZXJ0R3JpZFBvaW50cygpIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBoZWlnaHQ7IGorKykge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgayA9IDA7IGsgPCBkZXB0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IGdldEluZGV4KGksIGosIGspO1xuICAgICAgICAgICAgICAgICAgICBhZGRWZXJ0ZXgoXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLl94W2luZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGEuX3lbaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YS5feltpbmRleF0sXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhLl92YWx1ZVtpbmRleF1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmF3QWxsKCkge1xuICAgICAgICBlbXB0eVZlcnRpY2VzKCk7XG5cbiAgICAgICAgLy8gaW5zZXJ0IGdyaWQgcG9pbnRzXG4gICAgICAgIGluc2VydEdyaWRQb2ludHMoKTtcblxuICAgICAgICB2YXIgYWN0aXZlU3R5bGUgPSBudWxsO1xuXG4gICAgICAgIC8vIGRyYXcgc3BhY2VmcmFtZXNcbiAgICAgICAgaWYoc2hvd1NwYWNlZnJhbWUgJiYgc3BhY2VmcmFtZUZpbGwpIHtcbiAgICAgICAgICAgIHNldEZpbGwoc3BhY2VmcmFtZUZpbGwpO1xuXG4gICAgICAgICAgICBkcmF3U3BhY2VmcmFtZShhY3RpdmVTdHlsZSwgdk1pbiwgdk1heCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBkcmF3IGlzby1zdXJmYWNlc1xuICAgICAgICBpZihzaG93U3VyZmFjZSAmJiBzdXJmYWNlRmlsbCkge1xuICAgICAgICAgICAgc2V0RmlsbChzdXJmYWNlRmlsbCk7XG5cbiAgICAgICAgICAgIHZhciBzdXJmYWNlUGF0dGVybiA9IGRhdGEuc3VyZmFjZS5wYXR0ZXJuO1xuICAgICAgICAgICAgdmFyIHN1cmZhY2VDb3VudCA9IGRhdGEuc3VyZmFjZS5jb3VudDtcbiAgICAgICAgICAgIGZvcih2YXIgcSA9IDA7IHEgPCBzdXJmYWNlQ291bnQ7IHErKykge1xuICAgICAgICAgICAgICAgIHZhciByYXRpbyA9IChzdXJmYWNlQ291bnQgPT09IDEpID8gMC41IDogcSAvIChzdXJmYWNlQ291bnQgLSAxKTtcbiAgICAgICAgICAgICAgICB2YXIgbGV2ZWwgPSAoMSAtIHJhdGlvKSAqIHZNaW4gKyByYXRpbyAqIHZNYXg7XG5cbiAgICAgICAgICAgICAgICB2YXIgZDEgPSBNYXRoLmFicyhsZXZlbCAtIG1pblZhbHVlcyk7XG4gICAgICAgICAgICAgICAgdmFyIGQyID0gTWF0aC5hYnMobGV2ZWwgLSBtYXhWYWx1ZXMpO1xuICAgICAgICAgICAgICAgIHZhciByYW5nZXMgPSAoZDEgPiBkMikgP1xuICAgICAgICAgICAgICAgICAgICBbbWluVmFsdWVzLCBsZXZlbF0gOlxuICAgICAgICAgICAgICAgICAgICBbbGV2ZWwsIG1heFZhbHVlc107XG5cbiAgICAgICAgICAgICAgICBkcmF3U3VyZmFjZShzdXJmYWNlUGF0dGVybiwgcmFuZ2VzWzBdLCByYW5nZXNbMV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNldHVwTWluTWF4ID0gW1xuICAgICAgICAgICAgWyBNYXRoLm1pbih2TWluLCBtYXhWYWx1ZXMpLCBNYXRoLm1heCh2TWluLCBtYXhWYWx1ZXMpIF0sXG4gICAgICAgICAgICBbIE1hdGgubWluKG1pblZhbHVlcywgdk1heCksIE1hdGgubWF4KG1pblZhbHVlcywgdk1heCkgXVxuICAgICAgICBdO1xuXG4gICAgICAgIFsneCcsICd5JywgJ3onXS5mb3JFYWNoKGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIHZhciBwcmVSZXMgPSBbXTtcbiAgICAgICAgICAgIGZvcih2YXIgcyA9IDA7IHMgPCBzZXR1cE1pbk1heC5sZW5ndGg7IHMrKykge1xuICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XG5cbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlTWluID0gc2V0dXBNaW5NYXhbc11bMF07XG4gICAgICAgICAgICAgICAgdmFyIGFjdGl2ZU1heCA9IHNldHVwTWluTWF4W3NdWzFdO1xuXG4gICAgICAgICAgICAgICAgLy8gZHJhdyBzbGljZXNcbiAgICAgICAgICAgICAgICB2YXIgc2xpY2UgPSBkYXRhLnNsaWNlc1tlXTtcbiAgICAgICAgICAgICAgICBpZihzbGljZS5zaG93ICYmIHNsaWNlLmZpbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RmlsbChzbGljZS5maWxsKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgZXhhY3RJbmRpY2VzID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciBjZWlsSW5kaWNlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGlzdFJhdGlvcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgICBpZihzbGljZS5sb2NhdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIHEgPSAwOyBxIDwgc2xpY2UubG9jYXRpb25zLmxlbmd0aDsgcSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5lYXIgPSBmaW5kTmVhcmVzdE9uQXhpcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpY2UubG9jYXRpb25zW3FdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZSA9PT0gJ3gnKSA/IFhzIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGUgPT09ICd5JykgPyBZcyA6IFpzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5lYXIuZGlzdFJhdGlvID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4YWN0SW5kaWNlcy5wdXNoKG5lYXIuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihuZWFyLmlkID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjZWlsSW5kaWNlcy5wdXNoKG5lYXIuaWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihlID09PSAneCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3RSYXRpb3MucHVzaChbbmVhci5kaXN0UmF0aW8sIDAsIDBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGUgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdFJhdGlvcy5wdXNoKFswLCBuZWFyLmRpc3RSYXRpbywgMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlzdFJhdGlvcy5wdXNoKFswLCAwLCBuZWFyLmRpc3RSYXRpb10pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhhY3RJbmRpY2VzID0gY3JlYXRlUmFuZ2UoMSwgd2lkdGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlID09PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBleGFjdEluZGljZXMgPSBjcmVhdGVSYW5nZSgxLCBoZWlnaHQgLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhhY3RJbmRpY2VzID0gY3JlYXRlUmFuZ2UoMSwgZGVwdGggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKGNlaWxJbmRpY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGUgPT09ICd4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVJlc1tjb3VudF0gPSBkcmF3U2VjdGlvblgoYWN0aXZlU3R5bGUsIGNlaWxJbmRpY2VzLCBhY3RpdmVNaW4sIGFjdGl2ZU1heCwgZGlzdFJhdGlvcywgcHJlUmVzW2NvdW50XSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYoZSA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlUmVzW2NvdW50XSA9IGRyYXdTZWN0aW9uWShhY3RpdmVTdHlsZSwgY2VpbEluZGljZXMsIGFjdGl2ZU1pbiwgYWN0aXZlTWF4LCBkaXN0UmF0aW9zLCBwcmVSZXNbY291bnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlUmVzW2NvdW50XSA9IGRyYXdTZWN0aW9uWihhY3RpdmVTdHlsZSwgY2VpbEluZGljZXMsIGFjdGl2ZU1pbiwgYWN0aXZlTWF4LCBkaXN0UmF0aW9zLCBwcmVSZXNbY291bnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihleGFjdEluZGljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlUmVzW2NvdW50XSA9IGRyYXcyZFgoYWN0aXZlU3R5bGUsIGV4YWN0SW5kaWNlcywgYWN0aXZlTWluLCBhY3RpdmVNYXgsIHByZVJlc1tjb3VudF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGUgPT09ICd5Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZVJlc1tjb3VudF0gPSBkcmF3MmRZKGFjdGl2ZVN0eWxlLCBleGFjdEluZGljZXMsIGFjdGl2ZU1pbiwgYWN0aXZlTWF4LCBwcmVSZXNbY291bnRdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJlUmVzW2NvdW50XSA9IGRyYXcyZFooYWN0aXZlU3R5bGUsIGV4YWN0SW5kaWNlcywgYWN0aXZlTWluLCBhY3RpdmVNYXgsIHByZVJlc1tjb3VudF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGRyYXcgY2Fwc1xuICAgICAgICAgICAgICAgIHZhciBjYXAgPSBkYXRhLmNhcHNbZV07XG4gICAgICAgICAgICAgICAgaWYoY2FwLnNob3cgJiYgY2FwLmZpbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0RmlsbChjYXAuZmlsbCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKGUgPT09ICd4Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJlUmVzW2NvdW50XSA9IGRyYXcyZFgoYWN0aXZlU3R5bGUsIFswLCB3aWR0aCAtIDFdLCBhY3RpdmVNaW4sIGFjdGl2ZU1heCwgcHJlUmVzW2NvdW50XSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihlID09PSAneScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVJlc1tjb3VudF0gPSBkcmF3MmRZKGFjdGl2ZVN0eWxlLCBbMCwgaGVpZ2h0IC0gMV0sIGFjdGl2ZU1pbiwgYWN0aXZlTWF4LCBwcmVSZXNbY291bnRdKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZVJlc1tjb3VudF0gPSBkcmF3MmRaKGFjdGl2ZVN0eWxlLCBbMCwgZGVwdGggLSAxXSwgYWN0aXZlTWluLCBhY3RpdmVNYXgsIHByZVJlc1tjb3VudF0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyByZW1vdmUgdmVydGljZXMgYXJyYXlzIChpLmUuIGdyaWQgcG9pbnRzKSBpbiBjYXNlIG5vIGZhY2Ugd2FzIGNyZWF0ZWQuXG4gICAgICAgIGlmKG51bUZhY2VzID09PSAwKSB7XG4gICAgICAgICAgICBlbXB0eVZlcnRpY2VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBkYXRhLl9tZXNoWCA9IGFsbFhzO1xuICAgICAgICBkYXRhLl9tZXNoWSA9IGFsbFlzO1xuICAgICAgICBkYXRhLl9tZXNoWiA9IGFsbFpzO1xuICAgICAgICBkYXRhLl9tZXNoSW50ZW5zaXR5ID0gYWxsVnM7XG5cbiAgICAgICAgZGF0YS5fWHMgPSBYcztcbiAgICAgICAgZGF0YS5fWXMgPSBZcztcbiAgICAgICAgZGF0YS5fWnMgPSBacztcbiAgICB9XG5cbiAgICBkcmF3QWxsKCk7XG5cbiAgICByZXR1cm4gZGF0YTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlSXNvc3VyZmFjZVRyYWNlKHNjZW5lLCBkYXRhKSB7XG4gICAgdmFyIGdsID0gc2NlbmUuZ2xwbG90LmdsO1xuICAgIHZhciBtZXNoID0gY3JlYXRlTWVzaCh7Z2w6IGdsfSk7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBJc29zdXJmYWNlVHJhY2Uoc2NlbmUsIG1lc2gsIGRhdGEudWlkKTtcblxuICAgIG1lc2guX3RyYWNlID0gcmVzdWx0O1xuICAgIHJlc3VsdC51cGRhdGUoZGF0YSk7XG4gICAgc2NlbmUuZ2xwbG90LmFkZChtZXNoKTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmaW5kTmVhcmVzdE9uQXhpczogZmluZE5lYXJlc3RPbkF4aXMsXG4gICAgZ2VuZXJhdGVJc29NZXNoZXM6IGdlbmVyYXRlSXNvTWVzaGVzLFxuICAgIGNyZWF0ZUlzb3N1cmZhY2VUcmFjZTogY3JlYXRlSXNvc3VyZmFjZVRyYWNlLFxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JzY2FsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2RlZmF1bHRzJyk7XG5cbmZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBzdXBwbHlJc29EZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSk7XG59XG5cbmZ1bmN0aW9uIHN1cHBseUlzb0RlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlKSB7XG4gICAgdmFyIGlzb21pbiA9IGNvZXJjZSgnaXNvbWluJyk7XG4gICAgdmFyIGlzb21heCA9IGNvZXJjZSgnaXNvbWF4Jyk7XG5cbiAgICBpZihpc29tYXggIT09IHVuZGVmaW5lZCAmJiBpc29tYXggIT09IG51bGwgJiZcbiAgICAgICAgaXNvbWluICE9PSB1bmRlZmluZWQgJiYgaXNvbWluICE9PSBudWxsICYmXG4gICAgICAgICBpc29taW4gPiBpc29tYXgpIHtcbiAgICAgICAgLy8gYXBwbHlpbmcgZGVmYXVsdCB2YWx1ZXMgaW4gdGhpcyBjYXNlOlxuICAgICAgICB0cmFjZU91dC5pc29taW4gPSBudWxsO1xuICAgICAgICB0cmFjZU91dC5pc29tYXggPSBudWxsO1xuICAgIH1cblxuICAgIHZhciB4ID0gY29lcmNlKCd4Jyk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ3knKTtcbiAgICB2YXIgeiA9IGNvZXJjZSgneicpO1xuICAgIHZhciB2YWx1ZSA9IGNvZXJjZSgndmFsdWUnKTtcblxuICAgIGlmKFxuICAgICAgICAheCB8fCAheC5sZW5ndGggfHxcbiAgICAgICAgIXkgfHwgIXkubGVuZ3RoIHx8XG4gICAgICAgICF6IHx8ICF6Lmxlbmd0aCB8fFxuICAgICAgICAhdmFsdWUgfHwgIXZhbHVlLmxlbmd0aFxuICAgICkge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY2FsZW5kYXJzJywgJ2hhbmRsZVRyYWNlRGVmYXVsdHMnKTtcbiAgICBoYW5kbGVDYWxlbmRhckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBbJ3gnLCAneScsICd6J10sIGxheW91dCk7XG5cbiAgICBbJ3gnLCAneScsICd6J10uZm9yRWFjaChmdW5jdGlvbihkaW0pIHtcbiAgICAgICAgdmFyIGNhcERpbSA9ICdjYXBzLicgKyBkaW07XG4gICAgICAgIHZhciBzaG93Q2FwID0gY29lcmNlKGNhcERpbSArICcuc2hvdycpO1xuICAgICAgICBpZihzaG93Q2FwKSB7XG4gICAgICAgICAgICBjb2VyY2UoY2FwRGltICsgJy5maWxsJyk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2xpY2VEaW0gPSAnc2xpY2VzLicgKyBkaW07XG4gICAgICAgIHZhciBzaG93U2xpY2UgPSBjb2VyY2Uoc2xpY2VEaW0gKyAnLnNob3cnKTtcbiAgICAgICAgaWYoc2hvd1NsaWNlKSB7XG4gICAgICAgICAgICBjb2VyY2Uoc2xpY2VEaW0gKyAnLmZpbGwnKTtcbiAgICAgICAgICAgIGNvZXJjZShzbGljZURpbSArICcubG9jYXRpb25zJyk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBzaG93U3BhY2VmcmFtZSA9IGNvZXJjZSgnc3BhY2VmcmFtZS5zaG93Jyk7XG4gICAgaWYoc2hvd1NwYWNlZnJhbWUpIHtcbiAgICAgICAgY29lcmNlKCdzcGFjZWZyYW1lLmZpbGwnKTtcbiAgICB9XG5cbiAgICB2YXIgc2hvd1N1cmZhY2UgPSBjb2VyY2UoJ3N1cmZhY2Uuc2hvdycpO1xuICAgIGlmKHNob3dTdXJmYWNlKSB7XG4gICAgICAgIGNvZXJjZSgnc3VyZmFjZS5jb3VudCcpO1xuICAgICAgICBjb2VyY2UoJ3N1cmZhY2UuZmlsbCcpO1xuICAgICAgICBjb2VyY2UoJ3N1cmZhY2UucGF0dGVybicpO1xuICAgIH1cblxuICAgIHZhciBzaG93Q29udG91ciA9IGNvZXJjZSgnY29udG91ci5zaG93Jyk7XG4gICAgaWYoc2hvd0NvbnRvdXIpIHtcbiAgICAgICAgY29lcmNlKCdjb250b3VyLmNvbG9yJyk7XG4gICAgICAgIGNvZXJjZSgnY29udG91ci53aWR0aCcpO1xuICAgIH1cblxuICAgIC8vIENvZXJjZSByZW1haW5pbmcgcHJvcGVydGllc1xuICAgIFtcbiAgICAgICAgJ3RleHQnLFxuICAgICAgICAnaG92ZXJ0ZXh0JyxcbiAgICAgICAgJ2hvdmVydGVtcGxhdGUnLFxuICAgICAgICAnbGlnaHRpbmcuYW1iaWVudCcsXG4gICAgICAgICdsaWdodGluZy5kaWZmdXNlJyxcbiAgICAgICAgJ2xpZ2h0aW5nLnNwZWN1bGFyJyxcbiAgICAgICAgJ2xpZ2h0aW5nLnJvdWdobmVzcycsXG4gICAgICAgICdsaWdodGluZy5mcmVzbmVsJyxcbiAgICAgICAgJ2xpZ2h0aW5nLnZlcnRleG5vcm1hbHNlcHNpbG9uJyxcbiAgICAgICAgJ2xpZ2h0aW5nLmZhY2Vub3JtYWxzZXBzaWxvbicsXG4gICAgICAgICdsaWdodHBvc2l0aW9uLngnLFxuICAgICAgICAnbGlnaHRwb3NpdGlvbi55JyxcbiAgICAgICAgJ2xpZ2h0cG9zaXRpb24ueicsXG4gICAgICAgICdmbGF0c2hhZGluZycsXG4gICAgICAgICdvcGFjaXR5J1xuICAgIF0uZm9yRWFjaChmdW5jdGlvbih4KSB7IGNvZXJjZSh4KTsgfSk7XG5cbiAgICBjb2xvcnNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnJywgY0xldHRlcjogJ2MnfSk7XG5cbiAgICAvLyBkaXNhYmxlIDFEIHRyYW5zZm9ybXMgKGZvciBub3cpXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IG51bGw7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN1cHBseURlZmF1bHRzOiBzdXBwbHlEZWZhdWx0cyxcbiAgICBzdXBwbHlJc29EZWZhdWx0czogc3VwcGx5SXNvRGVmYXVsdHNcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9