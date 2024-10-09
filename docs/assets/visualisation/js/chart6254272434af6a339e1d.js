(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["node_modules_gl-mat4_fromQuat_js-node_modules_plotly_js_lib_volume_js-node_modules_plotly_js_-182290"],{

/***/ "./node_modules/gl-mat4/fromQuat.js":
/*!******************************************!*\
  !*** ./node_modules/gl-mat4/fromQuat.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

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

/***/ "./node_modules/plotly.js/src/plots/cartesian/type_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/type_defaults.js ***!
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



var traceIs = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js").traceIs;
var autoType = __webpack_require__(/*! ./axis_autotype */ "./node_modules/plotly.js/src/plots/cartesian/axis_autotype.js");

/*
 *  data: the plot data to use in choosing auto type
 *  name: axis object name (ie 'xaxis') if one should be stored
 */
module.exports = function handleTypeDefaults(containerIn, containerOut, coerce, options) {
    var axType = coerce('type', (options.splomStash || {}).type);

    if(axType === '-') {
        setAutoType(containerOut, options.data);

        if(containerOut.type === '-') {
            containerOut.type = 'linear';
        } else {
            // copy autoType back to input axis
            // note that if this object didn't exist
            // in the input layout, we have to put it in
            // this happens in the main supplyDefaults function
            containerIn.type = containerOut.type;
        }
    }
};

function setAutoType(ax, data) {
    // new logic: let people specify any type they want,
    // only autotype if type is '-'
    if(ax.type !== '-') return;

    var id = ax._id;
    var axLetter = id.charAt(0);
    var i;

    // support 3d
    if(id.indexOf('scene') !== -1) id = axLetter;

    var d0 = getFirstNonEmptyTrace(data, id, axLetter);
    if(!d0) return;

    // first check for histograms, as the count direction
    // should always default to a linear axis
    if(d0.type === 'histogram' &&
        axLetter === {v: 'y', h: 'x'}[d0.orientation || 'v']
    ) {
        ax.type = 'linear';
        return;
    }

    var calAttr = axLetter + 'calendar';
    var calendar = d0[calAttr];
    var opts = {noMultiCategory: !traceIs(d0, 'cartesian') || traceIs(d0, 'noMultiCategory')};

    // To not confuse 2D x/y used for per-box sample points for multicategory coordinates
    if(d0.type === 'box' && d0._hasPreCompStats &&
        axLetter === {h: 'x', v: 'y'}[d0.orientation || 'v']
    ) {
        opts.noMultiCategory = true;
    }

    // check all boxes on this x axis to see
    // if they're dates, numbers, or categories
    if(isBoxWithoutPositionCoords(d0, axLetter)) {
        var posLetter = getBoxPosLetter(d0);
        var boxPositions = [];

        for(i = 0; i < data.length; i++) {
            var trace = data[i];
            if(!traceIs(trace, 'box-violin') || (trace[axLetter + 'axis'] || axLetter) !== id) continue;

            if(trace[posLetter] !== undefined) boxPositions.push(trace[posLetter][0]);
            else if(trace.name !== undefined) boxPositions.push(trace.name);
            else boxPositions.push('text');

            if(trace[calAttr] !== calendar) calendar = undefined;
        }

        ax.type = autoType(boxPositions, calendar, opts);
    } else if(d0.type === 'splom') {
        var dimensions = d0.dimensions;
        var dim = dimensions[d0._axesDim[id]];
        if(dim.visible) ax.type = autoType(dim.values, calendar, opts);
    } else {
        ax.type = autoType(d0[axLetter] || [d0[axLetter + '0']], calendar, opts);
    }
}

function getFirstNonEmptyTrace(data, id, axLetter) {
    for(var i = 0; i < data.length; i++) {
        var trace = data[i];

        if(trace.type === 'splom' &&
                trace._length > 0 &&
                (trace['_' + axLetter + 'axes'] || {})[id]
        ) {
            return trace;
        }

        if((trace[axLetter + 'axis'] || axLetter) === id) {
            if(isBoxWithoutPositionCoords(trace, axLetter)) {
                return trace;
            } else if((trace[axLetter] || []).length || trace[axLetter + '0']) {
                return trace;
            }
        }
    }
}

function getBoxPosLetter(trace) {
    return {v: 'x', h: 'y'}[trace.orientation || 'v'];
}

function isBoxWithoutPositionCoords(trace, axLetter) {
    var posLetter = getBoxPosLetter(trace);
    var isBox = traceIs(trace, 'box-violin');
    var isCandlestick = traceIs(trace._fullInput || {}, 'candlestick');

    return (
        isBox &&
        !isCandlestick &&
        axLetter === posLetter &&
        trace[posLetter] === undefined &&
        trace[posLetter + '0'] === undefined
    );
}


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

/***/ "./node_modules/plotly.js/src/plots/gl3d/project.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl3d/project.js ***!
  \**********************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




function xformMatrix(m, v) {
    var out = [0, 0, 0, 0];
    var i, j;

    for(i = 0; i < 4; ++i) {
        for(j = 0; j < 4; ++j) {
            out[j] += m[4 * i + j] * v[i];
        }
    }

    return out;
}

function project(camera, v) {
    var p = xformMatrix(camera.projection,
        xformMatrix(camera.view,
        xformMatrix(camera.model, [v[0], v[1], v[2], 1])));
    return p;
}

module.exports = project;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/surface/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/surface/defaults.js ***!
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



var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/surface/attributes.js");

var MIN = 0.1; // Note: often we don't want the data cube to be disappeared

function createWave(n, minOpacity) {
    var arr = [];
    var steps = 32; // Max: 256
    for(var i = 0; i < steps; i++) {
        var u = i / (steps - 1);
        var v = minOpacity + (1 - minOpacity) * (1 - Math.pow(Math.sin(n * u * Math.PI), 2));
        arr.push([
            u,
            Math.max(0, Math.min(1, v))
        ]);
    }
    return arr;
}

function isValidScaleArray(scl) {
    var highestVal = 0;

    if(!Array.isArray(scl) || scl.length < 2) return false;

    if(!scl[0] || !scl[scl.length - 1]) return false;

    if(+scl[0][0] !== 0 || +scl[scl.length - 1][0] !== 1) return false;

    for(var i = 0; i < scl.length; i++) {
        var si = scl[i];

        if(si.length !== 2 || +si[0] < highestVal) {
            return false;
        }

        highestVal = +si[0];
    }

    return true;
}

function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    var i, j;

    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var x = coerce('x');
    var y = coerce('y');

    var z = coerce('z');
    if(!z || !z.length ||
       (x ? (x.length < 1) : false) ||
       (y ? (y.length < 1) : false)
    ) {
        traceOut.visible = false;
        return;
    }

    traceOut._xlength = (Array.isArray(x) && Lib.isArrayOrTypedArray(x[0])) ? z.length : z[0].length;
    traceOut._ylength = z.length;

    var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleTraceDefaults');
    handleCalendarDefaults(traceIn, traceOut, ['x', 'y', 'z'], layout);

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    // Coerce remaining properties
    [
        'lighting.ambient',
        'lighting.diffuse',
        'lighting.specular',
        'lighting.roughness',
        'lighting.fresnel',
        'lightposition.x',
        'lightposition.y',
        'lightposition.z',
        'hidesurface',
        'connectgaps',
        'opacity'
    ].forEach(function(x) { coerce(x); });

    var surfaceColor = coerce('surfacecolor');

    var dims = ['x', 'y', 'z'];
    for(i = 0; i < 3; ++i) {
        var contourDim = 'contours.' + dims[i];
        var show = coerce(contourDim + '.show');
        var highlight = coerce(contourDim + '.highlight');

        if(show || highlight) {
            for(j = 0; j < 3; ++j) {
                coerce(contourDim + '.project.' + dims[j]);
            }
        }

        if(show) {
            coerce(contourDim + '.color');
            coerce(contourDim + '.width');
            coerce(contourDim + '.usecolormap');
        }

        if(highlight) {
            coerce(contourDim + '.highlightcolor');
            coerce(contourDim + '.highlightwidth');
        }

        coerce(contourDim + '.start');
        coerce(contourDim + '.end');
        coerce(contourDim + '.size');
    }

    // backward compatibility block
    if(!surfaceColor) {
        mapLegacy(traceIn, 'zmin', 'cmin');
        mapLegacy(traceIn, 'zmax', 'cmax');
        mapLegacy(traceIn, 'zauto', 'cauto');
    }

    // TODO if contours.?.usecolormap are false and hidesurface is true
    // the colorbar shouldn't be shown by default

    colorscaleDefaults(
        traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'c'}
    );

    opacityscaleDefaults(traceIn, traceOut, layout, coerce);

    // disable 1D transforms - currently surface does NOT support column data like heatmap does
    // you can use mesh3d for this use case, but not surface
    traceOut._length = null;
}

function opacityscaleDefaults(traceIn, traceOut, layout, coerce) {
    var opacityscale = coerce('opacityscale');
    if(opacityscale === 'max') {
        traceOut.opacityscale = [[0, MIN], [1, 1]];
    } else if(opacityscale === 'min') {
        traceOut.opacityscale = [[0, 1], [1, MIN]];
    } else if(opacityscale === 'extremes') {
        traceOut.opacityscale = createWave(1, MIN);
    } else if(!isValidScaleArray(opacityscale)) {
        traceOut.opacityscale = undefined;
    }
}

function mapLegacy(traceIn, oldAttr, newAttr) {
    if(oldAttr in traceIn && !(newAttr in traceIn)) {
        traceIn[newAttr] = traceIn[oldAttr];
    }
}

module.exports = {
    supplyDefaults: supplyDefaults,
    opacityscaleDefaults: opacityscaleDefaults
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


/***/ }),

/***/ "?a259":
/*!************************!*\
  !*** buffer (ignored) ***!
  \************************/
/***/ (() => {

/* (ignored) */

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvZnJvbVF1YXQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvbGliL3ZvbHVtZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL3R5cGVfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2RvbWFpbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2wzZC9wcm9qZWN0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc3VyZmFjZS9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3ZvbHVtZS9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdm9sdW1lL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy92b2x1bWUvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy92b2x1bWUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS9pZ25vcmVkfC9ob21lL2FsZXgvZ2l0L0RJd2Vic2l0ZS1yZWRlc2lnbi9ub2RlX21vZHVsZXMvYmlnLXJhdC9ub2RlX21vZHVsZXMvYm4uanMvbGlifGJ1ZmZlciJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoi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Qyw4RUFBYztBQUN0QyxvQkFBb0IsbUJBQU8sQ0FBQywwRUFBWTtBQUN4QyxVQUFVLG1CQUFPLENBQUMsa0ZBQW9CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxVQUFVLG1CQUFPLENBQUMsd0VBQVc7O0FBRTdCO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQywwRUFBa0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDaENBLGUiLCJmaWxlIjoiY2hhcnQ2MjU0MjcyNDM0YWY2YTMzOWUxZC5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gZnJvbVF1YXQ7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hdHJpeCBmcm9tIGEgcXVhdGVybmlvbiByb3RhdGlvbi5cbiAqXG4gKiBAcGFyYW0ge21hdDR9IG91dCBtYXQ0IHJlY2VpdmluZyBvcGVyYXRpb24gcmVzdWx0XG4gKiBAcGFyYW0ge3F1YXQ0fSBxIFJvdGF0aW9uIHF1YXRlcm5pb25cbiAqIEByZXR1cm5zIHttYXQ0fSBvdXRcbiAqL1xuZnVuY3Rpb24gZnJvbVF1YXQob3V0LCBxKSB7XG4gICAgdmFyIHggPSBxWzBdLCB5ID0gcVsxXSwgeiA9IHFbMl0sIHcgPSBxWzNdLFxuICAgICAgICB4MiA9IHggKyB4LFxuICAgICAgICB5MiA9IHkgKyB5LFxuICAgICAgICB6MiA9IHogKyB6LFxuXG4gICAgICAgIHh4ID0geCAqIHgyLFxuICAgICAgICB5eCA9IHkgKiB4MixcbiAgICAgICAgeXkgPSB5ICogeTIsXG4gICAgICAgIHp4ID0geiAqIHgyLFxuICAgICAgICB6eSA9IHogKiB5MixcbiAgICAgICAgenogPSB6ICogejIsXG4gICAgICAgIHd4ID0gdyAqIHgyLFxuICAgICAgICB3eSA9IHcgKiB5MixcbiAgICAgICAgd3ogPSB3ICogejI7XG5cbiAgICBvdXRbMF0gPSAxIC0geXkgLSB6ejtcbiAgICBvdXRbMV0gPSB5eCArIHd6O1xuICAgIG91dFsyXSA9IHp4IC0gd3k7XG4gICAgb3V0WzNdID0gMDtcblxuICAgIG91dFs0XSA9IHl4IC0gd3o7XG4gICAgb3V0WzVdID0gMSAtIHh4IC0geno7XG4gICAgb3V0WzZdID0genkgKyB3eDtcbiAgICBvdXRbN10gPSAwO1xuXG4gICAgb3V0WzhdID0genggKyB3eTtcbiAgICBvdXRbOV0gPSB6eSAtIHd4O1xuICAgIG91dFsxMF0gPSAxIC0geHggLSB5eTtcbiAgICBvdXRbMTFdID0gMDtcblxuICAgIG91dFsxMl0gPSAwO1xuICAgIG91dFsxM10gPSAwO1xuICAgIG91dFsxNF0gPSAwO1xuICAgIG91dFsxNV0gPSAxO1xuXG4gICAgcmV0dXJuIG91dDtcbn07IiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvdm9sdW1lJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB0cmFjZUlzID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKS50cmFjZUlzO1xudmFyIGF1dG9UeXBlID0gcmVxdWlyZSgnLi9heGlzX2F1dG90eXBlJyk7XG5cbi8qXG4gKiAgZGF0YTogdGhlIHBsb3QgZGF0YSB0byB1c2UgaW4gY2hvb3NpbmcgYXV0byB0eXBlXG4gKiAgbmFtZTogYXhpcyBvYmplY3QgbmFtZSAoaWUgJ3hheGlzJykgaWYgb25lIHNob3VsZCBiZSBzdG9yZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVUeXBlRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIGF4VHlwZSA9IGNvZXJjZSgndHlwZScsIChvcHRpb25zLnNwbG9tU3Rhc2ggfHwge30pLnR5cGUpO1xuXG4gICAgaWYoYXhUeXBlID09PSAnLScpIHtcbiAgICAgICAgc2V0QXV0b1R5cGUoY29udGFpbmVyT3V0LCBvcHRpb25zLmRhdGEpO1xuXG4gICAgICAgIGlmKGNvbnRhaW5lck91dC50eXBlID09PSAnLScpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lck91dC50eXBlID0gJ2xpbmVhcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb3B5IGF1dG9UeXBlIGJhY2sgdG8gaW5wdXQgYXhpc1xuICAgICAgICAgICAgLy8gbm90ZSB0aGF0IGlmIHRoaXMgb2JqZWN0IGRpZG4ndCBleGlzdFxuICAgICAgICAgICAgLy8gaW4gdGhlIGlucHV0IGxheW91dCwgd2UgaGF2ZSB0byBwdXQgaXQgaW5cbiAgICAgICAgICAgIC8vIHRoaXMgaGFwcGVucyBpbiB0aGUgbWFpbiBzdXBwbHlEZWZhdWx0cyBmdW5jdGlvblxuICAgICAgICAgICAgY29udGFpbmVySW4udHlwZSA9IGNvbnRhaW5lck91dC50eXBlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gc2V0QXV0b1R5cGUoYXgsIGRhdGEpIHtcbiAgICAvLyBuZXcgbG9naWM6IGxldCBwZW9wbGUgc3BlY2lmeSBhbnkgdHlwZSB0aGV5IHdhbnQsXG4gICAgLy8gb25seSBhdXRvdHlwZSBpZiB0eXBlIGlzICctJ1xuICAgIGlmKGF4LnR5cGUgIT09ICctJykgcmV0dXJuO1xuXG4gICAgdmFyIGlkID0gYXguX2lkO1xuICAgIHZhciBheExldHRlciA9IGlkLmNoYXJBdCgwKTtcbiAgICB2YXIgaTtcblxuICAgIC8vIHN1cHBvcnQgM2RcbiAgICBpZihpZC5pbmRleE9mKCdzY2VuZScpICE9PSAtMSkgaWQgPSBheExldHRlcjtcblxuICAgIHZhciBkMCA9IGdldEZpcnN0Tm9uRW1wdHlUcmFjZShkYXRhLCBpZCwgYXhMZXR0ZXIpO1xuICAgIGlmKCFkMCkgcmV0dXJuO1xuXG4gICAgLy8gZmlyc3QgY2hlY2sgZm9yIGhpc3RvZ3JhbXMsIGFzIHRoZSBjb3VudCBkaXJlY3Rpb25cbiAgICAvLyBzaG91bGQgYWx3YXlzIGRlZmF1bHQgdG8gYSBsaW5lYXIgYXhpc1xuICAgIGlmKGQwLnR5cGUgPT09ICdoaXN0b2dyYW0nICYmXG4gICAgICAgIGF4TGV0dGVyID09PSB7djogJ3knLCBoOiAneCd9W2QwLm9yaWVudGF0aW9uIHx8ICd2J11cbiAgICApIHtcbiAgICAgICAgYXgudHlwZSA9ICdsaW5lYXInO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNhbEF0dHIgPSBheExldHRlciArICdjYWxlbmRhcic7XG4gICAgdmFyIGNhbGVuZGFyID0gZDBbY2FsQXR0cl07XG4gICAgdmFyIG9wdHMgPSB7bm9NdWx0aUNhdGVnb3J5OiAhdHJhY2VJcyhkMCwgJ2NhcnRlc2lhbicpIHx8IHRyYWNlSXMoZDAsICdub011bHRpQ2F0ZWdvcnknKX07XG5cbiAgICAvLyBUbyBub3QgY29uZnVzZSAyRCB4L3kgdXNlZCBmb3IgcGVyLWJveCBzYW1wbGUgcG9pbnRzIGZvciBtdWx0aWNhdGVnb3J5IGNvb3JkaW5hdGVzXG4gICAgaWYoZDAudHlwZSA9PT0gJ2JveCcgJiYgZDAuX2hhc1ByZUNvbXBTdGF0cyAmJlxuICAgICAgICBheExldHRlciA9PT0ge2g6ICd4JywgdjogJ3knfVtkMC5vcmllbnRhdGlvbiB8fCAndiddXG4gICAgKSB7XG4gICAgICAgIG9wdHMubm9NdWx0aUNhdGVnb3J5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBhbGwgYm94ZXMgb24gdGhpcyB4IGF4aXMgdG8gc2VlXG4gICAgLy8gaWYgdGhleSdyZSBkYXRlcywgbnVtYmVycywgb3IgY2F0ZWdvcmllc1xuICAgIGlmKGlzQm94V2l0aG91dFBvc2l0aW9uQ29vcmRzKGQwLCBheExldHRlcikpIHtcbiAgICAgICAgdmFyIHBvc0xldHRlciA9IGdldEJveFBvc0xldHRlcihkMCk7XG4gICAgICAgIHZhciBib3hQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2UgPSBkYXRhW2ldO1xuICAgICAgICAgICAgaWYoIXRyYWNlSXModHJhY2UsICdib3gtdmlvbGluJykgfHwgKHRyYWNlW2F4TGV0dGVyICsgJ2F4aXMnXSB8fCBheExldHRlcikgIT09IGlkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYodHJhY2VbcG9zTGV0dGVyXSAhPT0gdW5kZWZpbmVkKSBib3hQb3NpdGlvbnMucHVzaCh0cmFjZVtwb3NMZXR0ZXJdWzBdKTtcbiAgICAgICAgICAgIGVsc2UgaWYodHJhY2UubmFtZSAhPT0gdW5kZWZpbmVkKSBib3hQb3NpdGlvbnMucHVzaCh0cmFjZS5uYW1lKTtcbiAgICAgICAgICAgIGVsc2UgYm94UG9zaXRpb25zLnB1c2goJ3RleHQnKTtcblxuICAgICAgICAgICAgaWYodHJhY2VbY2FsQXR0cl0gIT09IGNhbGVuZGFyKSBjYWxlbmRhciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGF4LnR5cGUgPSBhdXRvVHlwZShib3hQb3NpdGlvbnMsIGNhbGVuZGFyLCBvcHRzKTtcbiAgICB9IGVsc2UgaWYoZDAudHlwZSA9PT0gJ3NwbG9tJykge1xuICAgICAgICB2YXIgZGltZW5zaW9ucyA9IGQwLmRpbWVuc2lvbnM7XG4gICAgICAgIHZhciBkaW0gPSBkaW1lbnNpb25zW2QwLl9heGVzRGltW2lkXV07XG4gICAgICAgIGlmKGRpbS52aXNpYmxlKSBheC50eXBlID0gYXV0b1R5cGUoZGltLnZhbHVlcywgY2FsZW5kYXIsIG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGF4LnR5cGUgPSBhdXRvVHlwZShkMFtheExldHRlcl0gfHwgW2QwW2F4TGV0dGVyICsgJzAnXV0sIGNhbGVuZGFyLCBvcHRzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpcnN0Tm9uRW1wdHlUcmFjZShkYXRhLCBpZCwgYXhMZXR0ZXIpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhY2UgPSBkYXRhW2ldO1xuXG4gICAgICAgIGlmKHRyYWNlLnR5cGUgPT09ICdzcGxvbScgJiZcbiAgICAgICAgICAgICAgICB0cmFjZS5fbGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICh0cmFjZVsnXycgKyBheExldHRlciArICdheGVzJ10gfHwge30pW2lkXVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCh0cmFjZVtheExldHRlciArICdheGlzJ10gfHwgYXhMZXR0ZXIpID09PSBpZCkge1xuICAgICAgICAgICAgaWYoaXNCb3hXaXRob3V0UG9zaXRpb25Db29yZHModHJhY2UsIGF4TGV0dGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZigodHJhY2VbYXhMZXR0ZXJdIHx8IFtdKS5sZW5ndGggfHwgdHJhY2VbYXhMZXR0ZXIgKyAnMCddKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRCb3hQb3NMZXR0ZXIodHJhY2UpIHtcbiAgICByZXR1cm4ge3Y6ICd4JywgaDogJ3knfVt0cmFjZS5vcmllbnRhdGlvbiB8fCAndiddO1xufVxuXG5mdW5jdGlvbiBpc0JveFdpdGhvdXRQb3NpdGlvbkNvb3Jkcyh0cmFjZSwgYXhMZXR0ZXIpIHtcbiAgICB2YXIgcG9zTGV0dGVyID0gZ2V0Qm94UG9zTGV0dGVyKHRyYWNlKTtcbiAgICB2YXIgaXNCb3ggPSB0cmFjZUlzKHRyYWNlLCAnYm94LXZpb2xpbicpO1xuICAgIHZhciBpc0NhbmRsZXN0aWNrID0gdHJhY2VJcyh0cmFjZS5fZnVsbElucHV0IHx8IHt9LCAnY2FuZGxlc3RpY2snKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIGlzQm94ICYmXG4gICAgICAgICFpc0NhbmRsZXN0aWNrICYmXG4gICAgICAgIGF4TGV0dGVyID09PSBwb3NMZXR0ZXIgJiZcbiAgICAgICAgdHJhY2VbcG9zTGV0dGVyXSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHRyYWNlW3Bvc0xldHRlciArICcwJ10gPT09IHVuZGVmaW5lZFxuICAgICk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbi8qKlxuICogTWFrZSBhIHh5IGRvbWFpbiBhdHRyaWJ1dGUgZ3JvdXBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0c1xuICogICBAcGFyYW0ge3N0cmluZ31cbiAqICAgICBvcHRzLm5hbWU6IG5hbWUgdG8gYmUgaW5zZXJ0ZWQgaW4gdGhlIGRlZmF1bHQgZGVzY3JpcHRpb25cbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMudHJhY2U6IHNldCB0byB0cnVlIGZvciB0cmFjZSBjb250YWluZXJzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMuZWRpdFR5cGU6IGVkaXRUeXBlIGZvciBhbGwgcGllY2VzXG4gKiAgIEBwYXJhbSB7Ym9vbGVhbn1cbiAqICAgICBvcHRzLm5vR3JpZENlbGw6IHNldCB0byB0cnVlIHRvIG9taXQgYHJvd2AgYW5kIGBjb2x1bW5gXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGV4dHJhXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIGV4dHJhLmRlc2NyaXB0aW9uOiBleHRyYSBkZXNjcmlwdGlvbi4gTi5CIHdlIHVzZVxuICogICAgIGEgc2VwYXJhdGUgZXh0cmEgY29udGFpbmVyIHRvIG1ha2UgaXQgY29tcGF0aWJsZSB3aXRoXG4gKiAgICAgdGhlIGNvbXByZXNzX2F0dHJpYnV0ZXMgdHJhbnNmb3JtLlxuICpcbiAqIEByZXR1cm4ge29iamVjdH0gYXR0cmlidXRlcyBvYmplY3QgY29udGFpbmluZyB7eCx5fSBhcyBzcGVjaWZpZWRcbiAqL1xuZXhwb3J0cy5hdHRyaWJ1dGVzID0gZnVuY3Rpb24ob3B0cywgZXh0cmEpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICBleHRyYSA9IGV4dHJhIHx8IHt9O1xuXG4gICAgdmFyIGJhc2UgPSB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgbWluOiAwLCBtYXg6IDEsIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlfVxuICAgICAgICBdLFxuICAgICAgICBkZmx0OiBbMCwgMV1cbiAgICB9O1xuXG4gICAgdmFyIG5hbWVQYXJ0ID0gb3B0cy5uYW1lID8gb3B0cy5uYW1lICsgJyAnIDogJyc7XG4gICAgdmFyIGNvbnRQYXJ0ID0gb3B0cy50cmFjZSA/ICd0cmFjZSAnIDogJ3N1YnBsb3QgJztcbiAgICB2YXIgZGVzY1BhcnQgPSBleHRyYS5kZXNjcmlwdGlvbiA/ICcgJyArIGV4dHJhLmRlc2NyaXB0aW9uIDogJyc7XG5cbiAgICB2YXIgb3V0ID0ge1xuICAgICAgICB4OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3Jpem9udGFsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICB5OiBleHRlbmRGbGF0KHt9LCBiYXNlLCB7XG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSB2ZXJ0aWNhbCBkb21haW4gb2YgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcoaW4gcGxvdCBmcmFjdGlvbikuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9KSxcbiAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGVcbiAgICB9O1xuXG4gICAgaWYoIW9wdHMubm9HcmlkQ2VsbCkge1xuICAgICAgICBvdXQucm93ID0ge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgZGZsdDogMCxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdGhlcmUgaXMgYSBsYXlvdXQgZ3JpZCwgdXNlIHRoZSBkb21haW4gJyxcbiAgICAgICAgICAgICAgICAnZm9yIHRoaXMgcm93IGluIHRoZSBncmlkIGZvciB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJy4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH07XG4gICAgICAgIG91dC5jb2x1bW4gPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyBjb2x1bW4gaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxuZXhwb3J0cy5kZWZhdWx0cyA9IGZ1bmN0aW9uKGNvbnRhaW5lck91dCwgbGF5b3V0LCBjb2VyY2UsIGRmbHREb21haW5zKSB7XG4gICAgdmFyIGRmbHRYID0gKGRmbHREb21haW5zICYmIGRmbHREb21haW5zLngpIHx8IFswLCAxXTtcbiAgICB2YXIgZGZsdFkgPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueSkgfHwgWzAsIDFdO1xuXG4gICAgdmFyIGdyaWQgPSBsYXlvdXQuZ3JpZDtcbiAgICBpZihncmlkKSB7XG4gICAgICAgIHZhciBjb2x1bW4gPSBjb2VyY2UoJ2RvbWFpbi5jb2x1bW4nKTtcbiAgICAgICAgaWYoY29sdW1uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKGNvbHVtbiA8IGdyaWQuY29sdW1ucykgZGZsdFggPSBncmlkLl9kb21haW5zLnhbY29sdW1uXTtcbiAgICAgICAgICAgIGVsc2UgZGVsZXRlIGNvbnRhaW5lck91dC5kb21haW4uY29sdW1uO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJvdyA9IGNvZXJjZSgnZG9tYWluLnJvdycpO1xuICAgICAgICBpZihyb3cgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYocm93IDwgZ3JpZC5yb3dzKSBkZmx0WSA9IGdyaWQuX2RvbWFpbnMueVtyb3ddO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5yb3c7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgnZG9tYWluLngnLCBkZmx0WCk7XG4gICAgdmFyIHkgPSBjb2VyY2UoJ2RvbWFpbi55JywgZGZsdFkpO1xuXG4gICAgLy8gZG9uJ3QgYWNjZXB0IGJhZCBpbnB1dCBkYXRhXG4gICAgaWYoISh4WzBdIDwgeFsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueCA9IGRmbHRYLnNsaWNlKCk7XG4gICAgaWYoISh5WzBdIDwgeVsxXSkpIGNvbnRhaW5lck91dC5kb21haW4ueSA9IGRmbHRZLnNsaWNlKCk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbmZ1bmN0aW9uIHhmb3JtTWF0cml4KG0sIHYpIHtcbiAgICB2YXIgb3V0ID0gWzAsIDAsIDAsIDBdO1xuICAgIHZhciBpLCBqO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgNDsgKytpKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IDQ7ICsraikge1xuICAgICAgICAgICAgb3V0W2pdICs9IG1bNCAqIGkgKyBqXSAqIHZbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufVxuXG5mdW5jdGlvbiBwcm9qZWN0KGNhbWVyYSwgdikge1xuICAgIHZhciBwID0geGZvcm1NYXRyaXgoY2FtZXJhLnByb2plY3Rpb24sXG4gICAgICAgIHhmb3JtTWF0cml4KGNhbWVyYS52aWV3LFxuICAgICAgICB4Zm9ybU1hdHJpeChjYW1lcmEubW9kZWwsIFt2WzBdLCB2WzFdLCB2WzJdLCAxXSkpKTtcbiAgICByZXR1cm4gcDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcm9qZWN0O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgY29sb3JzY2FsZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2RlZmF1bHRzJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG52YXIgTUlOID0gMC4xOyAvLyBOb3RlOiBvZnRlbiB3ZSBkb24ndCB3YW50IHRoZSBkYXRhIGN1YmUgdG8gYmUgZGlzYXBwZWFyZWRcblxuZnVuY3Rpb24gY3JlYXRlV2F2ZShuLCBtaW5PcGFjaXR5KSB7XG4gICAgdmFyIGFyciA9IFtdO1xuICAgIHZhciBzdGVwcyA9IDMyOyAvLyBNYXg6IDI1NlxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdGVwczsgaSsrKSB7XG4gICAgICAgIHZhciB1ID0gaSAvIChzdGVwcyAtIDEpO1xuICAgICAgICB2YXIgdiA9IG1pbk9wYWNpdHkgKyAoMSAtIG1pbk9wYWNpdHkpICogKDEgLSBNYXRoLnBvdyhNYXRoLnNpbihuICogdSAqIE1hdGguUEkpLCAyKSk7XG4gICAgICAgIGFyci5wdXNoKFtcbiAgICAgICAgICAgIHUsXG4gICAgICAgICAgICBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2KSlcbiAgICAgICAgXSk7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRTY2FsZUFycmF5KHNjbCkge1xuICAgIHZhciBoaWdoZXN0VmFsID0gMDtcblxuICAgIGlmKCFBcnJheS5pc0FycmF5KHNjbCkgfHwgc2NsLmxlbmd0aCA8IDIpIHJldHVybiBmYWxzZTtcblxuICAgIGlmKCFzY2xbMF0gfHwgIXNjbFtzY2wubGVuZ3RoIC0gMV0pIHJldHVybiBmYWxzZTtcblxuICAgIGlmKCtzY2xbMF1bMF0gIT09IDAgfHwgK3NjbFtzY2wubGVuZ3RoIC0gMV1bMF0gIT09IDEpIHJldHVybiBmYWxzZTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzY2wubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNpID0gc2NsW2ldO1xuXG4gICAgICAgIGlmKHNpLmxlbmd0aCAhPT0gMiB8fCArc2lbMF0gPCBoaWdoZXN0VmFsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICBoaWdoZXN0VmFsID0gK3NpWzBdO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICB2YXIgaSwgajtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgeCA9IGNvZXJjZSgneCcpO1xuICAgIHZhciB5ID0gY29lcmNlKCd5Jyk7XG5cbiAgICB2YXIgeiA9IGNvZXJjZSgneicpO1xuICAgIGlmKCF6IHx8ICF6Lmxlbmd0aCB8fFxuICAgICAgICh4ID8gKHgubGVuZ3RoIDwgMSkgOiBmYWxzZSkgfHxcbiAgICAgICAoeSA/ICh5Lmxlbmd0aCA8IDEpIDogZmFsc2UpXG4gICAgKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyYWNlT3V0Ll94bGVuZ3RoID0gKEFycmF5LmlzQXJyYXkoeCkgJiYgTGliLmlzQXJyYXlPclR5cGVkQXJyYXkoeFswXSkpID8gei5sZW5ndGggOiB6WzBdLmxlbmd0aDtcbiAgICB0cmFjZU91dC5feWxlbmd0aCA9IHoubGVuZ3RoO1xuXG4gICAgdmFyIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2NhbGVuZGFycycsICdoYW5kbGVUcmFjZURlZmF1bHRzJyk7XG4gICAgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgWyd4JywgJ3knLCAneiddLCBsYXlvdXQpO1xuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIC8vIENvZXJjZSByZW1haW5pbmcgcHJvcGVydGllc1xuICAgIFtcbiAgICAgICAgJ2xpZ2h0aW5nLmFtYmllbnQnLFxuICAgICAgICAnbGlnaHRpbmcuZGlmZnVzZScsXG4gICAgICAgICdsaWdodGluZy5zcGVjdWxhcicsXG4gICAgICAgICdsaWdodGluZy5yb3VnaG5lc3MnLFxuICAgICAgICAnbGlnaHRpbmcuZnJlc25lbCcsXG4gICAgICAgICdsaWdodHBvc2l0aW9uLngnLFxuICAgICAgICAnbGlnaHRwb3NpdGlvbi55JyxcbiAgICAgICAgJ2xpZ2h0cG9zaXRpb24ueicsXG4gICAgICAgICdoaWRlc3VyZmFjZScsXG4gICAgICAgICdjb25uZWN0Z2FwcycsXG4gICAgICAgICdvcGFjaXR5J1xuICAgIF0uZm9yRWFjaChmdW5jdGlvbih4KSB7IGNvZXJjZSh4KTsgfSk7XG5cbiAgICB2YXIgc3VyZmFjZUNvbG9yID0gY29lcmNlKCdzdXJmYWNlY29sb3InKTtcblxuICAgIHZhciBkaW1zID0gWyd4JywgJ3knLCAneiddO1xuICAgIGZvcihpID0gMDsgaSA8IDM7ICsraSkge1xuICAgICAgICB2YXIgY29udG91ckRpbSA9ICdjb250b3Vycy4nICsgZGltc1tpXTtcbiAgICAgICAgdmFyIHNob3cgPSBjb2VyY2UoY29udG91ckRpbSArICcuc2hvdycpO1xuICAgICAgICB2YXIgaGlnaGxpZ2h0ID0gY29lcmNlKGNvbnRvdXJEaW0gKyAnLmhpZ2hsaWdodCcpO1xuXG4gICAgICAgIGlmKHNob3cgfHwgaGlnaGxpZ2h0KSB7XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCAzOyArK2opIHtcbiAgICAgICAgICAgICAgICBjb2VyY2UoY29udG91ckRpbSArICcucHJvamVjdC4nICsgZGltc1tqXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihzaG93KSB7XG4gICAgICAgICAgICBjb2VyY2UoY29udG91ckRpbSArICcuY29sb3InKTtcbiAgICAgICAgICAgIGNvZXJjZShjb250b3VyRGltICsgJy53aWR0aCcpO1xuICAgICAgICAgICAgY29lcmNlKGNvbnRvdXJEaW0gKyAnLnVzZWNvbG9ybWFwJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihoaWdobGlnaHQpIHtcbiAgICAgICAgICAgIGNvZXJjZShjb250b3VyRGltICsgJy5oaWdobGlnaHRjb2xvcicpO1xuICAgICAgICAgICAgY29lcmNlKGNvbnRvdXJEaW0gKyAnLmhpZ2hsaWdodHdpZHRoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb2VyY2UoY29udG91ckRpbSArICcuc3RhcnQnKTtcbiAgICAgICAgY29lcmNlKGNvbnRvdXJEaW0gKyAnLmVuZCcpO1xuICAgICAgICBjb2VyY2UoY29udG91ckRpbSArICcuc2l6ZScpO1xuICAgIH1cblxuICAgIC8vIGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgYmxvY2tcbiAgICBpZighc3VyZmFjZUNvbG9yKSB7XG4gICAgICAgIG1hcExlZ2FjeSh0cmFjZUluLCAnem1pbicsICdjbWluJyk7XG4gICAgICAgIG1hcExlZ2FjeSh0cmFjZUluLCAnem1heCcsICdjbWF4Jyk7XG4gICAgICAgIG1hcExlZ2FjeSh0cmFjZUluLCAnemF1dG8nLCAnY2F1dG8nKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPIGlmIGNvbnRvdXJzLj8udXNlY29sb3JtYXAgYXJlIGZhbHNlIGFuZCBoaWRlc3VyZmFjZSBpcyB0cnVlXG4gICAgLy8gdGhlIGNvbG9yYmFyIHNob3VsZG4ndCBiZSBzaG93biBieSBkZWZhdWx0XG5cbiAgICBjb2xvcnNjYWxlRGVmYXVsdHMoXG4gICAgICAgIHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge3ByZWZpeDogJycsIGNMZXR0ZXI6ICdjJ31cbiAgICApO1xuXG4gICAgb3BhY2l0eXNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcblxuICAgIC8vIGRpc2FibGUgMUQgdHJhbnNmb3JtcyAtIGN1cnJlbnRseSBzdXJmYWNlIGRvZXMgTk9UIHN1cHBvcnQgY29sdW1uIGRhdGEgbGlrZSBoZWF0bWFwIGRvZXNcbiAgICAvLyB5b3UgY2FuIHVzZSBtZXNoM2QgZm9yIHRoaXMgdXNlIGNhc2UsIGJ1dCBub3Qgc3VyZmFjZVxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xufVxuXG5mdW5jdGlvbiBvcGFjaXR5c2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpIHtcbiAgICB2YXIgb3BhY2l0eXNjYWxlID0gY29lcmNlKCdvcGFjaXR5c2NhbGUnKTtcbiAgICBpZihvcGFjaXR5c2NhbGUgPT09ICdtYXgnKSB7XG4gICAgICAgIHRyYWNlT3V0Lm9wYWNpdHlzY2FsZSA9IFtbMCwgTUlOXSwgWzEsIDFdXTtcbiAgICB9IGVsc2UgaWYob3BhY2l0eXNjYWxlID09PSAnbWluJykge1xuICAgICAgICB0cmFjZU91dC5vcGFjaXR5c2NhbGUgPSBbWzAsIDFdLCBbMSwgTUlOXV07XG4gICAgfSBlbHNlIGlmKG9wYWNpdHlzY2FsZSA9PT0gJ2V4dHJlbWVzJykge1xuICAgICAgICB0cmFjZU91dC5vcGFjaXR5c2NhbGUgPSBjcmVhdGVXYXZlKDEsIE1JTik7XG4gICAgfSBlbHNlIGlmKCFpc1ZhbGlkU2NhbGVBcnJheShvcGFjaXR5c2NhbGUpKSB7XG4gICAgICAgIHRyYWNlT3V0Lm9wYWNpdHlzY2FsZSA9IHVuZGVmaW5lZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIG1hcExlZ2FjeSh0cmFjZUluLCBvbGRBdHRyLCBuZXdBdHRyKSB7XG4gICAgaWYob2xkQXR0ciBpbiB0cmFjZUluICYmICEobmV3QXR0ciBpbiB0cmFjZUluKSkge1xuICAgICAgICB0cmFjZUluW25ld0F0dHJdID0gdHJhY2VJbltvbGRBdHRyXTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN1cHBseURlZmF1bHRzOiBzdXBwbHlEZWZhdWx0cyxcbiAgICBvcGFjaXR5c2NhbGVEZWZhdWx0czogb3BhY2l0eXNjYWxlRGVmYXVsdHNcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvclNjYWxlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvYXR0cmlidXRlcycpO1xudmFyIGlzb3N1cmZhY2VBdHRycyA9IHJlcXVpcmUoJy4uL2lzb3N1cmZhY2UvYXR0cmlidXRlcycpO1xudmFyIHN1cmZhY2VBdHRycyA9IHJlcXVpcmUoJy4uL3N1cmZhY2UvYXR0cmlidXRlcycpO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBvdmVycmlkZUFsbCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL2VkaXRfdHlwZXMnKS5vdmVycmlkZUFsbDtcblxudmFyIGF0dHJzID0gbW9kdWxlLmV4cG9ydHMgPSBvdmVycmlkZUFsbChleHRlbmRGbGF0KHtcbiAgICB4OiBpc29zdXJmYWNlQXR0cnMueCxcbiAgICB5OiBpc29zdXJmYWNlQXR0cnMueSxcbiAgICB6OiBpc29zdXJmYWNlQXR0cnMueixcbiAgICB2YWx1ZTogaXNvc3VyZmFjZUF0dHJzLnZhbHVlLFxuICAgIGlzb21pbjogaXNvc3VyZmFjZUF0dHJzLmlzb21pbixcbiAgICBpc29tYXg6IGlzb3N1cmZhY2VBdHRycy5pc29tYXgsXG4gICAgc3VyZmFjZTogaXNvc3VyZmFjZUF0dHJzLnN1cmZhY2UsXG4gICAgc3BhY2VmcmFtZToge1xuICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0Rpc3BsYXlzL2hpZGVzIHRldHJhaGVkcm9uIHNoYXBlcyBiZXR3ZWVuIG1pbmltdW0gYW5kJyxcbiAgICAgICAgICAgICAgICAnbWF4aW11bSBpc28tdmFsdWVzLiBPZnRlbiB1c2VmdWwgd2hlbiBlaXRoZXIgY2FwcyBvcicsXG4gICAgICAgICAgICAgICAgJ3N1cmZhY2VzIGFyZSBkaXNhYmxlZCBvciBmaWxsZWQgd2l0aCB2YWx1ZXMgbGVzcyB0aGFuIDEuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgZmlsbDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgICAgZGZsdDogMSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGZpbGwgcmF0aW8gb2YgdGhlIGBzcGFjZWZyYW1lYCBlbGVtZW50cy4gVGhlIGRlZmF1bHQgZmlsbCB2YWx1ZScsXG4gICAgICAgICAgICAgICAgJ2lzIDEgbWVhbmluZyB0aGF0IHRoZXkgYXJlIGVudGlyZWx5IHNoYWRlZC4gQXBwbHlpbmcgYSBgZmlsbGAgcmF0aW8gbGVzcycsXG4gICAgICAgICAgICAgICAgJ3RoYW4gb25lIHdvdWxkIGFsbG93IHRoZSBjcmVhdGlvbiBvZiBvcGVuaW5ncyBwYXJhbGxlbCB0byB0aGUgZWRnZXMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBzbGljZXM6IGlzb3N1cmZhY2VBdHRycy5zbGljZXMsXG4gICAgY2FwczogaXNvc3VyZmFjZUF0dHJzLmNhcHMsXG4gICAgdGV4dDogaXNvc3VyZmFjZUF0dHJzLnRleHQsXG4gICAgaG92ZXJ0ZXh0OiBpc29zdXJmYWNlQXR0cnMuaG92ZXJ0ZXh0LFxuICAgIGhvdmVydGVtcGxhdGU6IGlzb3N1cmZhY2VBdHRycy5ob3ZlcnRlbXBsYXRlXG59LFxuXG5jb2xvclNjYWxlQXR0cnMoJycsIHtcbiAgICBjb2xvckF0dHI6ICdgdmFsdWVgJyxcbiAgICBzaG93U2NhbGVEZmx0OiB0cnVlLFxuICAgIGVkaXRUeXBlT3ZlcnJpZGU6ICdjYWxjJ1xufSksIHtcblxuICAgIGNvbG9yYmFyOiBpc29zdXJmYWNlQXR0cnMuY29sb3JiYXIsXG4gICAgb3BhY2l0eTogaXNvc3VyZmFjZUF0dHJzLm9wYWNpdHksXG4gICAgb3BhY2l0eXNjYWxlOiBzdXJmYWNlQXR0cnMub3BhY2l0eXNjYWxlLFxuXG4gICAgbGlnaHRwb3NpdGlvbjogaXNvc3VyZmFjZUF0dHJzLmxpZ2h0cG9zaXRpb24sXG4gICAgbGlnaHRpbmc6IGlzb3N1cmZhY2VBdHRycy5saWdodGluZyxcbiAgICBmbGF0c2hhZGluZzogaXNvc3VyZmFjZUF0dHJzLmZsYXRzaGFkaW5nLFxuICAgIGNvbnRvdXI6IGlzb3N1cmZhY2VBdHRycy5jb250b3VyLFxuXG4gICAgaG92ZXJpbmZvOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuaG92ZXJpbmZvKSxcbiAgICBzaG93bGVnZW5kOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuc2hvd2xlZ2VuZCwge2RmbHQ6IGZhbHNlfSlcbn0pLCAnY2FsYycsICduZXN0ZWQnKTtcblxuYXR0cnMueC5lZGl0VHlwZSA9IGF0dHJzLnkuZWRpdFR5cGUgPSBhdHRycy56LmVkaXRUeXBlID0gYXR0cnMudmFsdWUuZWRpdFR5cGUgPSAnY2FsYytjbGVhckF4aXNUeXBlcyc7XG5hdHRycy50cmFuc2Zvcm1zID0gdW5kZWZpbmVkO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY3JlYXRlTWVzaCA9IHJlcXVpcmUoJ2dsLW1lc2gzZCcpO1xuXG52YXIgcGFyc2VDb2xvclNjYWxlID0gcmVxdWlyZSgnLi4vLi4vbGliL2dsX2Zvcm1hdF9jb2xvcicpLnBhcnNlQ29sb3JTY2FsZTtcbnZhciBzdHIyUmdiYUFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliL3N0cjJyZ2JhcnJheScpO1xudmFyIGV4dHJhY3RPcHRzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJykuZXh0cmFjdE9wdHM7XG52YXIgemlwMyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dsM2QvemlwMycpO1xuXG52YXIgZmluZE5lYXJlc3RPbkF4aXMgPSByZXF1aXJlKCcuLi9pc29zdXJmYWNlL2NvbnZlcnQnKS5maW5kTmVhcmVzdE9uQXhpcztcbnZhciBnZW5lcmF0ZUlzb01lc2hlcyA9IHJlcXVpcmUoJy4uL2lzb3N1cmZhY2UvY29udmVydCcpLmdlbmVyYXRlSXNvTWVzaGVzO1xuXG5mdW5jdGlvbiBWb2x1bWVUcmFjZShzY2VuZSwgbWVzaCwgdWlkKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMudWlkID0gdWlkO1xuICAgIHRoaXMubWVzaCA9IG1lc2g7XG4gICAgdGhpcy5uYW1lID0gJyc7XG4gICAgdGhpcy5kYXRhID0gbnVsbDtcbiAgICB0aGlzLnNob3dDb250b3VyID0gZmFsc2U7XG59XG5cbnZhciBwcm90byA9IFZvbHVtZVRyYWNlLnByb3RvdHlwZTtcblxucHJvdG8uaGFuZGxlUGljayA9IGZ1bmN0aW9uKHNlbGVjdGlvbikge1xuICAgIGlmKHNlbGVjdGlvbi5vYmplY3QgPT09IHRoaXMubWVzaCkge1xuICAgICAgICB2YXIgcmF3SWQgPSBzZWxlY3Rpb24uZGF0YS5pbmRleDtcblxuICAgICAgICB2YXIgeCA9IHRoaXMuZGF0YS5fbWVzaFhbcmF3SWRdO1xuICAgICAgICB2YXIgeSA9IHRoaXMuZGF0YS5fbWVzaFlbcmF3SWRdO1xuICAgICAgICB2YXIgeiA9IHRoaXMuZGF0YS5fbWVzaFpbcmF3SWRdO1xuXG4gICAgICAgIHZhciBoZWlnaHQgPSB0aGlzLmRhdGEuX1lzLmxlbmd0aDtcbiAgICAgICAgdmFyIGRlcHRoID0gdGhpcy5kYXRhLl9acy5sZW5ndGg7XG5cbiAgICAgICAgdmFyIGkgPSBmaW5kTmVhcmVzdE9uQXhpcyh4LCB0aGlzLmRhdGEuX1hzKS5pZDtcbiAgICAgICAgdmFyIGogPSBmaW5kTmVhcmVzdE9uQXhpcyh5LCB0aGlzLmRhdGEuX1lzKS5pZDtcbiAgICAgICAgdmFyIGsgPSBmaW5kTmVhcmVzdE9uQXhpcyh6LCB0aGlzLmRhdGEuX1pzKS5pZDtcblxuICAgICAgICB2YXIgc2VsZWN0SW5kZXggPSBzZWxlY3Rpb24uaW5kZXggPSBrICsgZGVwdGggKiBqICsgZGVwdGggKiBoZWlnaHQgKiBpO1xuXG4gICAgICAgIHNlbGVjdGlvbi50cmFjZUNvb3JkaW5hdGUgPSBbXG4gICAgICAgICAgICB0aGlzLmRhdGEuX21lc2hYW3NlbGVjdEluZGV4XSxcbiAgICAgICAgICAgIHRoaXMuZGF0YS5fbWVzaFlbc2VsZWN0SW5kZXhdLFxuICAgICAgICAgICAgdGhpcy5kYXRhLl9tZXNoWltzZWxlY3RJbmRleF0sXG4gICAgICAgICAgICB0aGlzLmRhdGEuX3ZhbHVlW3NlbGVjdEluZGV4XVxuICAgICAgICBdO1xuXG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5kYXRhLmhvdmVydGV4dCB8fCB0aGlzLmRhdGEudGV4dDtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0ZXh0KSAmJiB0ZXh0W3NlbGVjdEluZGV4XSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24udGV4dExhYmVsID0gdGV4dFtzZWxlY3RJbmRleF07XG4gICAgICAgIH0gZWxzZSBpZih0ZXh0KSB7XG4gICAgICAgICAgICBzZWxlY3Rpb24udGV4dExhYmVsID0gdGV4dDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbn07XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKGRhdGEpIHtcbiAgICB2YXIgc2NlbmUgPSB0aGlzLnNjZW5lO1xuICAgIHZhciBsYXlvdXQgPSBzY2VuZS5mdWxsU2NlbmVMYXlvdXQ7XG5cbiAgICB0aGlzLmRhdGEgPSBnZW5lcmF0ZUlzb01lc2hlcyhkYXRhKTtcblxuICAgIC8vIFVucGFjayBwb3NpdGlvbiBkYXRhXG4gICAgZnVuY3Rpb24gdG9EYXRhQ29vcmRzKGF4aXMsIGNvb3JkLCBzY2FsZSwgY2FsZW5kYXIpIHtcbiAgICAgICAgcmV0dXJuIGNvb3JkLm1hcChmdW5jdGlvbih4KSB7XG4gICAgICAgICAgICByZXR1cm4gYXhpcy5kMmwoeCwgMCwgY2FsZW5kYXIpICogc2NhbGU7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBwb3NpdGlvbnMgPSB6aXAzKFxuICAgICAgICB0b0RhdGFDb29yZHMobGF5b3V0LnhheGlzLCBkYXRhLl9tZXNoWCwgc2NlbmUuZGF0YVNjYWxlWzBdLCBkYXRhLnhjYWxlbmRhciksXG4gICAgICAgIHRvRGF0YUNvb3JkcyhsYXlvdXQueWF4aXMsIGRhdGEuX21lc2hZLCBzY2VuZS5kYXRhU2NhbGVbMV0sIGRhdGEueWNhbGVuZGFyKSxcbiAgICAgICAgdG9EYXRhQ29vcmRzKGxheW91dC56YXhpcywgZGF0YS5fbWVzaFosIHNjZW5lLmRhdGFTY2FsZVsyXSwgZGF0YS56Y2FsZW5kYXIpKTtcblxuICAgIHZhciBjZWxscyA9IHppcDMoZGF0YS5fbWVzaEksIGRhdGEuX21lc2hKLCBkYXRhLl9tZXNoSyk7XG5cbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICBwb3NpdGlvbnM6IHBvc2l0aW9ucyxcbiAgICAgICAgY2VsbHM6IGNlbGxzLFxuICAgICAgICBsaWdodFBvc2l0aW9uOiBbZGF0YS5saWdodHBvc2l0aW9uLngsIGRhdGEubGlnaHRwb3NpdGlvbi55LCBkYXRhLmxpZ2h0cG9zaXRpb24uel0sXG4gICAgICAgIGFtYmllbnQ6IGRhdGEubGlnaHRpbmcuYW1iaWVudCxcbiAgICAgICAgZGlmZnVzZTogZGF0YS5saWdodGluZy5kaWZmdXNlLFxuICAgICAgICBzcGVjdWxhcjogZGF0YS5saWdodGluZy5zcGVjdWxhcixcbiAgICAgICAgcm91Z2huZXNzOiBkYXRhLmxpZ2h0aW5nLnJvdWdobmVzcyxcbiAgICAgICAgZnJlc25lbDogZGF0YS5saWdodGluZy5mcmVzbmVsLFxuICAgICAgICB2ZXJ0ZXhOb3JtYWxzRXBzaWxvbjogZGF0YS5saWdodGluZy52ZXJ0ZXhub3JtYWxzZXBzaWxvbixcbiAgICAgICAgZmFjZU5vcm1hbHNFcHNpbG9uOiBkYXRhLmxpZ2h0aW5nLmZhY2Vub3JtYWxzZXBzaWxvbixcbiAgICAgICAgb3BhY2l0eTogZGF0YS5vcGFjaXR5LFxuICAgICAgICBvcGFjaXR5c2NhbGU6IGRhdGEub3BhY2l0eXNjYWxlLFxuICAgICAgICBjb250b3VyRW5hYmxlOiBkYXRhLmNvbnRvdXIuc2hvdyxcbiAgICAgICAgY29udG91ckNvbG9yOiBzdHIyUmdiYUFycmF5KGRhdGEuY29udG91ci5jb2xvcikuc2xpY2UoMCwgMyksXG4gICAgICAgIGNvbnRvdXJXaWR0aDogZGF0YS5jb250b3VyLndpZHRoLFxuICAgICAgICB1c2VGYWNldE5vcm1hbHM6IGRhdGEuZmxhdHNoYWRpbmdcbiAgICB9O1xuXG4gICAgdmFyIGNPcHRzID0gZXh0cmFjdE9wdHMoZGF0YSk7XG4gICAgY29uZmlnLnZlcnRleEludGVuc2l0eSA9IGRhdGEuX21lc2hJbnRlbnNpdHk7XG4gICAgY29uZmlnLnZlcnRleEludGVuc2l0eUJvdW5kcyA9IFtjT3B0cy5taW4sIGNPcHRzLm1heF07XG4gICAgY29uZmlnLmNvbG9ybWFwID0gcGFyc2VDb2xvclNjYWxlKGRhdGEpO1xuXG4gICAgLy8gVXBkYXRlIG1lc2hcbiAgICB0aGlzLm1lc2gudXBkYXRlKGNvbmZpZyk7XG59O1xuXG5wcm90by5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zY2VuZS5nbHBsb3QucmVtb3ZlKHRoaXMubWVzaCk7XG4gICAgdGhpcy5tZXNoLmRpc3Bvc2UoKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVZvbHVtZVRyYWNlKHNjZW5lLCBkYXRhKSB7XG4gICAgdmFyIGdsID0gc2NlbmUuZ2xwbG90LmdsO1xuICAgIHZhciBtZXNoID0gY3JlYXRlTWVzaCh7Z2w6IGdsfSk7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBWb2x1bWVUcmFjZShzY2VuZSwgbWVzaCwgZGF0YS51aWQpO1xuXG4gICAgbWVzaC5fdHJhY2UgPSByZXN1bHQ7XG4gICAgcmVzdWx0LnVwZGF0ZShkYXRhKTtcbiAgICBzY2VuZS5nbHBsb3QuYWRkKG1lc2gpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVm9sdW1lVHJhY2U7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgc3VwcGx5SXNvRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9pc29zdXJmYWNlL2RlZmF1bHRzJykuc3VwcGx5SXNvRGVmYXVsdHM7XG52YXIgb3BhY2l0eXNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zdXJmYWNlL2RlZmF1bHRzJykub3BhY2l0eXNjYWxlRGVmYXVsdHM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHN1cHBseUlzb0RlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlKTtcblxuICAgIG9wYWNpdHlzY2FsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4uL2lzb3N1cmZhY2UvY2FsYycpLFxuICAgIGNvbG9yYmFyOiB7XG4gICAgICAgIG1pbjogJ2NtaW4nLFxuICAgICAgICBtYXg6ICdjbWF4J1xuICAgIH0sXG4gICAgcGxvdDogcmVxdWlyZSgnLi9jb252ZXJ0JyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICd2b2x1bWUnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9nbDNkJyksXG4gICAgY2F0ZWdvcmllczogWydnbDNkJywgJ3Nob3dMZWdlbmQnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRHJhd3Mgdm9sdW1lIHRyYWNlIGJldHdlZW4gaXNvLW1pbiBhbmQgaXNvLW1heCB2YWx1ZXMgd2l0aCBjb29yZGluYXRlcyBnaXZlbiBieScsXG4gICAgICAgICAgICAnZm91ciAxLWRpbWVuc2lvbmFsIGFycmF5cyBjb250YWluaW5nIHRoZSBgdmFsdWVgLCBgeGAsIGB5YCBhbmQgYHpgIG9mIGV2ZXJ5IHZlcnRleCcsXG4gICAgICAgICAgICAnb2YgYSB1bmlmb3JtIG9yIG5vbi11bmlmb3JtIDMtRCBncmlkLiBIb3Jpem9udGFsIG9yIHZlcnRpY2FsIHNsaWNlcywgY2FwcyBhcyB3ZWxsIGFzJyxcbiAgICAgICAgICAgICdzcGFjZWZyYW1lIGJldHdlZW4gaXNvLW1pbiBhbmQgaXNvLW1heCB2YWx1ZXMgY291bGQgYWxzbyBiZSBkcmF3biB1c2luZyB0aGlzIHRyYWNlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyogKGlnbm9yZWQpICovIl0sInNvdXJjZVJvb3QiOiIifQ==