(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_pointcloud_js"],{

/***/ "./node_modules/gl-pointcloud2d/lib/shader.js":
/*!****************************************************!*\
  !*** ./node_modules/gl-pointcloud2d/lib/shader.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")

exports.pointVertex       = glslify('./shader/point-vertex.glsl')
exports.pointFragment     = glslify('./shader/point-fragment.glsl')
exports.pickVertex        = glslify('./shader/pick-vertex.glsl')
exports.pickFragment      = glslify('./shader/pick-fragment.glsl')


/***/ }),

/***/ "./node_modules/gl-pointcloud2d/pointcloud2d.js":
/*!******************************************************!*\
  !*** ./node_modules/gl-pointcloud2d/pointcloud2d.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")

var pool = __webpack_require__(/*! typedarray-pool */ "./node_modules/typedarray-pool/pool.js")

var SHADERS = __webpack_require__(/*! ./lib/shader */ "./node_modules/gl-pointcloud2d/lib/shader.js")

module.exports = createPointcloud2D

function Pointcloud2D(plot, offsetBuffer, pickBuffer, shader, pickShader) {
  this.plot           = plot
  this.offsetBuffer   = offsetBuffer
  this.pickBuffer     = pickBuffer
  this.shader         = shader
  this.pickShader     = pickShader
  this.sizeMin        = 0.5
  this.sizeMinCap     = 2
  this.sizeMax        = 20
  this.areaRatio      = 1.0
  this.pointCount     = 0
  this.color          = [1, 0, 0, 1]
  this.borderColor    = [0, 0, 0, 1]
  this.blend          = false
  this.pickOffset     = 0
  this.points         = null
}

var proto = Pointcloud2D.prototype

proto.dispose = function() {
  this.shader.dispose()
  this.pickShader.dispose()
  this.offsetBuffer.dispose()
  this.pickBuffer.dispose()
  this.plot.removeObject(this)
}

proto.update = function(options) {

  var i

  options = options || {}

  function dflt(opt, value) {
    if(opt in options) {
      return options[opt]
    }
    return value
  }

  this.sizeMin      = dflt('sizeMin', 0.5)
  // this.sizeMinCap      = dflt('sizeMinCap', 2)
  this.sizeMax      = dflt('sizeMax', 20)
  this.color        = dflt('color', [1, 0, 0, 1]).slice()
  this.areaRatio    = dflt('areaRatio', 1)
  this.borderColor  = dflt('borderColor', [0, 0, 0, 1]).slice()
  this.blend        = dflt('blend', false)

  //Update point data

  // Attempt straight-through processing (STP) to avoid allocation and copy
  // TODO eventually abstract out STP logic, maybe into `pool` or a layer above
  var pointCount = options.positions.length >>> 1
  var dataStraightThrough = options.positions instanceof Float32Array
  var idStraightThrough = options.idToIndex instanceof Int32Array && options.idToIndex.length >= pointCount // permit larger to help reuse

  var data          = options.positions
  var packed        = dataStraightThrough ? data : pool.mallocFloat32(data.length)
  var packedId      = idStraightThrough ? options.idToIndex : pool.mallocInt32(pointCount)

  if(!dataStraightThrough) {
    packed.set(data)
  }

  if(!idStraightThrough) {
    packed.set(data)
    for(i = 0; i < pointCount; i++) {
      packedId[i] = i
    }
  }

  this.points       = data

  this.offsetBuffer.update(packed)
  this.pickBuffer.update(packedId)

  if(!dataStraightThrough) {
    pool.free(packed)
  }

  if(!idStraightThrough) {
    pool.free(packedId)
  }

  this.pointCount = pointCount
  this.pickOffset = 0
}

function count(points, dataBox) {
  var visiblePointCountEstimate = 0
  var length = points.length >>> 1
  var i
  for(i = 0; i < length; i++) {
    var x = points[i * 2]
    var y = points[i * 2 + 1]
    if(x >= dataBox[0] && x <= dataBox[2] && y >= dataBox[1] && y <= dataBox[3])
      visiblePointCountEstimate++
  }
  return visiblePointCountEstimate
}

proto.unifiedDraw = (function() {
  var MATRIX = [1, 0, 0,
                0, 1, 0,
                0, 0, 1]
  var PICK_VEC4 = [0, 0, 0, 0]
return function(pickOffset) {
  var pick = pickOffset !== void(0)

  var shader        = pick ? this.pickShader : this.shader
  var gl            = this.plot.gl
  var dataBox       = this.plot.dataBox

  if(this.pointCount === 0) {
    return pickOffset
  }

  var dataX   = dataBox[2] - dataBox[0]
  var dataY   = dataBox[3] - dataBox[1]

  var visiblePointCountEstimate = count(this.points, dataBox)
  var basicPointSize =  this.plot.pickPixelRatio * Math.max(Math.min(this.sizeMinCap, this.sizeMin), Math.min(this.sizeMax, this.sizeMax / Math.pow(visiblePointCountEstimate, 0.33333)))

  MATRIX[0] = 2.0 / dataX
  MATRIX[4] = 2.0 / dataY
  MATRIX[6] = -2.0 * dataBox[0] / dataX - 1.0
  MATRIX[7] = -2.0 * dataBox[1] / dataY - 1.0

  this.offsetBuffer.bind()

  shader.bind()
  shader.attributes.position.pointer()
  shader.uniforms.matrix      = MATRIX
  shader.uniforms.color       = this.color
  shader.uniforms.borderColor = this.borderColor
  shader.uniforms.pointCloud = basicPointSize < 5
  shader.uniforms.pointSize = basicPointSize
  shader.uniforms.centerFraction = Math.min(1, Math.max(0, Math.sqrt(1 - this.areaRatio)))

  if(pick) {

    PICK_VEC4[0] = ( pickOffset        & 0xff)
    PICK_VEC4[1] = ((pickOffset >> 8)  & 0xff)
    PICK_VEC4[2] = ((pickOffset >> 16) & 0xff)
    PICK_VEC4[3] = ((pickOffset >> 24) & 0xff)

    this.pickBuffer.bind()
    shader.attributes.pickId.pointer(gl.UNSIGNED_BYTE)
    shader.uniforms.pickOffset = PICK_VEC4
    this.pickOffset = pickOffset
  }

  // Worth switching these off, but we can't make assumptions about other
  // renderers, so let's restore it after each draw
  var blend = gl.getParameter(gl.BLEND)
  var dither = gl.getParameter(gl.DITHER)

  if(blend && !this.blend)
    gl.disable(gl.BLEND)
  if(dither)
    gl.disable(gl.DITHER)

  gl.drawArrays(gl.POINTS, 0, this.pointCount)

  if(blend && !this.blend)
    gl.enable(gl.BLEND)
  if(dither)
    gl.enable(gl.DITHER)

  return pickOffset + this.pointCount
}
})()

proto.draw = proto.unifiedDraw
proto.drawPick = proto.unifiedDraw

proto.pick = function(x, y, value) {
  var pickOffset = this.pickOffset
  var pointCount = this.pointCount
  if(value < pickOffset || value >= pickOffset + pointCount) {
    return null
  }
  var pointId = value - pickOffset
  var points = this.points
  return {
    object: this,
    pointId: pointId,
    dataCoord: [points[2 * pointId], points[2 * pointId + 1] ]
  }
}

function createPointcloud2D(plot, options) {
  var gl = plot.gl
  var buffer = createBuffer(gl)
  var pickBuffer = createBuffer(gl)
  var shader = createShader(gl, SHADERS.pointVertex, SHADERS.pointFragment)
  var pickShader = createShader(gl, SHADERS.pickVertex, SHADERS.pickFragment)

  var result = new Pointcloud2D(plot, buffer, pickBuffer, shader, pickShader)
  result.update(options)

  //Register with plot
  plot.addObject(result)

  return result
}


/***/ }),

/***/ "./node_modules/plotly.js/lib/pointcloud.js":
/*!**************************************************!*\
  !*** ./node_modules/plotly.js/lib/pointcloud.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/pointcloud */ "./node_modules/plotly.js/src/traces/pointcloud/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pointcloud/attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pointcloud/attributes.js ***!
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



var scatterglAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");

module.exports = {
    x: scatterglAttrs.x,
    y: scatterglAttrs.y,
    xy: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Faster alternative to specifying `x` and `y` separately.',
            'If supplied, it must be a typed `Float32Array` array that',
            'represents points such that `xy[i * 2] = x[i]` and `xy[i * 2 + 1] = y[i]`'
        ].join(' ')
    },
    indices: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'A sequential value, 0..n, supply it to avoid creating this array inside plotting.',
            'If specified, it must be a typed `Int32Array` array.',
            'Its length must be equal to or greater than the number of points.',
            'For the best performance and memory use, create one large `indices` typed array',
            'that is guaranteed to be at least as long as the largest number of points during',
            'use, and reuse it on each `Plotly.restyle()` call.'
        ].join(' ')
    },
    xbounds: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Specify `xbounds` in the shape of `[xMin, xMax] to avoid looping through',
            'the `xy` typed array. Use it in conjunction with `xy` and `ybounds` for the performance benefits.'
        ].join(' ')
    },
    ybounds: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Specify `ybounds` in the shape of `[yMin, yMax] to avoid looping through',
            'the `xy` typed array. Use it in conjunction with `xy` and `xbounds` for the performance benefits.'
        ].join(' ')
    },
    text: scatterglAttrs.text,
    marker: {
        color: {
            valType: 'color',
            arrayOk: false,
            role: 'style',
            editType: 'calc',
            description: [
                'Sets the marker fill color. It accepts a specific color.',
                'If the color is not fully opaque and there are hundreds of thousands',
                'of points, it may cause slower zooming and panning.'
            ].join('')
        },
        opacity: {
            valType: 'number',
            min: 0,
            max: 1,
            dflt: 1,
            arrayOk: false,
            role: 'style',
            editType: 'calc',
            description: [
                'Sets the marker opacity. The default value is `1` (fully opaque).',
                'If the markers are not fully opaque and there are hundreds of thousands',
                'of points, it may cause slower zooming and panning.',
                'Opacity fades the color even if `blend` is left on `false` even if there',
                'is no translucency effect in that case.'
            ].join(' ')
        },
        blend: {
            valType: 'boolean',
            dflt: null,
            role: 'style',
            editType: 'calc',
            description: [
                'Determines if colors are blended together for a translucency effect',
                'in case `opacity` is specified as a value less then `1`.',
                'Setting `blend` to `true` reduces zoom/pan',
                'speed if used with large numbers of points.'
            ].join(' ')
        },
        sizemin: {
            valType: 'number',
            min: 0.1,
            max: 2,
            dflt: 0.5,
            role: 'style',
            editType: 'calc',
            description: [
                'Sets the minimum size (in px) of the rendered marker points, effective when',
                'the `pointcloud` shows a million or more points.'
            ].join(' ')
        },
        sizemax: {
            valType: 'number',
            min: 0.1,
            dflt: 20,
            role: 'style',
            editType: 'calc',
            description: [
                'Sets the maximum size (in px) of the rendered marker points.',
                'Effective when the `pointcloud` shows only few points.'
            ].join(' ')
        },
        border: {
            color: {
                valType: 'color',
                arrayOk: false,
                role: 'style',
                editType: 'calc',
                description: [
                    'Sets the stroke color. It accepts a specific color.',
                    'If the color is not fully opaque and there are hundreds of thousands',
                    'of points, it may cause slower zooming and panning.'
                ].join(' ')
            },
            arearatio: {
                valType: 'number',
                min: 0,
                max: 1,
                dflt: 0,
                role: 'style',
                editType: 'calc',
                description: [
                    'Specifies what fraction of the marker area is covered with the',
                    'border.'
                ].join(' ')
            },
            editType: 'calc'
        },
        editType: 'calc'
    },
    transforms: undefined
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pointcloud/convert.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pointcloud/convert.js ***!
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



var createPointCloudRenderer = __webpack_require__(/*! gl-pointcloud2d */ "./node_modules/gl-pointcloud2d/pointcloud2d.js");

var str2RGBArray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");
var findExtremes = __webpack_require__(/*! ../../plots/cartesian/autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").findExtremes;
var getTraceColor = __webpack_require__(/*! ../scatter/get_trace_color */ "./node_modules/plotly.js/src/traces/scatter/get_trace_color.js");

function Pointcloud(scene, uid) {
    this.scene = scene;
    this.uid = uid;
    this.type = 'pointcloud';

    this.pickXData = [];
    this.pickYData = [];
    this.xData = [];
    this.yData = [];
    this.textLabels = [];
    this.color = 'rgb(0, 0, 0)';
    this.name = '';
    this.hoverinfo = 'all';

    this.idToIndex = new Int32Array(0);
    this.bounds = [0, 0, 0, 0];

    this.pointcloudOptions = {
        positions: new Float32Array(0),
        idToIndex: this.idToIndex,
        sizemin: 0.5,
        sizemax: 12,
        color: [0, 0, 0, 1],
        areaRatio: 1,
        borderColor: [0, 0, 0, 1]
    };
    this.pointcloud = createPointCloudRenderer(scene.glplot, this.pointcloudOptions);
    this.pointcloud._trace = this; // scene2d requires this prop
}

var proto = Pointcloud.prototype;

proto.handlePick = function(pickResult) {
    var index = this.idToIndex[pickResult.pointId];

    // prefer the readout from XY, if present
    return {
        trace: this,
        dataCoord: pickResult.dataCoord,
        traceCoord: this.pickXYData ?
            [this.pickXYData[index * 2], this.pickXYData[index * 2 + 1]] :
            [this.pickXData[index], this.pickYData[index]],
        textLabel: Array.isArray(this.textLabels) ?
            this.textLabels[index] :
            this.textLabels,
        color: this.color,
        name: this.name,
        pointIndex: index,
        hoverinfo: this.hoverinfo
    };
};

proto.update = function(options) {
    this.index = options.index;
    this.textLabels = options.text;
    this.name = options.name;
    this.hoverinfo = options.hoverinfo;
    this.bounds = [Infinity, Infinity, -Infinity, -Infinity];

    this.updateFast(options);

    this.color = getTraceColor(options, {});
};

proto.updateFast = function(options) {
    var x = this.xData = this.pickXData = options.x;
    var y = this.yData = this.pickYData = options.y;
    var xy = this.pickXYData = options.xy;

    var userBounds = options.xbounds && options.ybounds;
    var index = options.indices;

    var len;
    var idToIndex;
    var positions;
    var bounds = this.bounds;

    var xx, yy, i;

    if(xy) {
        positions = xy;

        // dividing xy.length by 2 and truncating to integer if xy.length was not even
        len = xy.length >>> 1;

        if(userBounds) {
            bounds[0] = options.xbounds[0];
            bounds[2] = options.xbounds[1];
            bounds[1] = options.ybounds[0];
            bounds[3] = options.ybounds[1];
        } else {
            for(i = 0; i < len; i++) {
                xx = positions[i * 2];
                yy = positions[i * 2 + 1];

                if(xx < bounds[0]) bounds[0] = xx;
                if(xx > bounds[2]) bounds[2] = xx;
                if(yy < bounds[1]) bounds[1] = yy;
                if(yy > bounds[3]) bounds[3] = yy;
            }
        }

        if(index) {
            idToIndex = index;
        } else {
            idToIndex = new Int32Array(len);

            for(i = 0; i < len; i++) {
                idToIndex[i] = i;
            }
        }
    } else {
        len = x.length;

        positions = new Float32Array(2 * len);
        idToIndex = new Int32Array(len);

        for(i = 0; i < len; i++) {
            xx = x[i];
            yy = y[i];

            idToIndex[i] = i;

            positions[i * 2] = xx;
            positions[i * 2 + 1] = yy;

            if(xx < bounds[0]) bounds[0] = xx;
            if(xx > bounds[2]) bounds[2] = xx;
            if(yy < bounds[1]) bounds[1] = yy;
            if(yy > bounds[3]) bounds[3] = yy;
        }
    }

    this.idToIndex = idToIndex;
    this.pointcloudOptions.idToIndex = idToIndex;

    this.pointcloudOptions.positions = positions;

    var markerColor = str2RGBArray(options.marker.color);
    var borderColor = str2RGBArray(options.marker.border.color);
    var opacity = options.opacity * options.marker.opacity;

    markerColor[3] *= opacity;
    this.pointcloudOptions.color = markerColor;

    // detect blending from the number of points, if undefined
    // because large data with blending hits performance
    var blend = options.marker.blend;
    if(blend === null) {
        var maxPoints = 100;
        blend = x.length < maxPoints || y.length < maxPoints;
    }
    this.pointcloudOptions.blend = blend;

    borderColor[3] *= opacity;
    this.pointcloudOptions.borderColor = borderColor;

    var markerSizeMin = options.marker.sizemin;
    var markerSizeMax = Math.max(options.marker.sizemax, options.marker.sizemin);
    this.pointcloudOptions.sizeMin = markerSizeMin;
    this.pointcloudOptions.sizeMax = markerSizeMax;
    this.pointcloudOptions.areaRatio = options.marker.border.arearatio;

    this.pointcloud.update(this.pointcloudOptions);

    // add item for autorange routine
    var xa = this.scene.xaxis;
    var ya = this.scene.yaxis;
    var pad = markerSizeMax / 2 || 0.5;
    options._extremes[xa._id] = findExtremes(xa, [bounds[0], bounds[2]], {ppad: pad});
    options._extremes[ya._id] = findExtremes(ya, [bounds[1], bounds[3]], {ppad: pad});
};

proto.dispose = function() {
    this.pointcloud.dispose();
};

function createPointcloud(scene, data) {
    var plot = new Pointcloud(scene, data.uid);
    plot.update(data);
    return plot;
}

module.exports = createPointcloud;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pointcloud/defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pointcloud/defaults.js ***!
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

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/pointcloud/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    coerce('x');
    coerce('y');

    coerce('xbounds');
    coerce('ybounds');

    if(traceIn.xy && traceIn.xy instanceof Float32Array) {
        traceOut.xy = traceIn.xy;
    }

    if(traceIn.indices && traceIn.indices instanceof Int32Array) {
        traceOut.indices = traceIn.indices;
    }

    coerce('text');
    coerce('marker.color', defaultColor);
    coerce('marker.opacity');
    coerce('marker.blend');
    coerce('marker.sizemin');
    coerce('marker.sizemax');
    coerce('marker.border.color', defaultColor);
    coerce('marker.border.arearatio');

    // disable 1D transforms - that would defeat the purpose of this trace type, performance!
    traceOut._length = null;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/pointcloud/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/pointcloud/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/pointcloud/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/pointcloud/defaults.js"),

    // reuse the Scatter3D 'dummy' calc step so that legends know what to do
    calc: __webpack_require__(/*! ../scatter3d/calc */ "./node_modules/plotly.js/src/traces/scatter3d/calc.js"),
    plot: __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/pointcloud/convert.js"),

    moduleType: 'trace',
    name: 'pointcloud',
    basePlotModule: __webpack_require__(/*! ../../plots/gl2d */ "./node_modules/plotly.js/src/plots/gl2d/index.js"),
    categories: ['gl', 'gl2d', 'showLegend'],
    meta: {
        description: [
            'The data visualized as a point cloud set in `x` and `y`',
            'using the WebGl plotting engine.'
        ].join(' ')
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXBvaW50Y2xvdWQyZC9saWIvc2hhZGVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtcG9pbnRjbG91ZDJkL3BvaW50Y2xvdWQyZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvcG9pbnRjbG91ZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BvaW50Y2xvdWQvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BvaW50Y2xvdWQvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BvaW50Y2xvdWQvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9wb2ludGNsb3VkL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUEsY0FBYyxtQkFBTyxDQUFDLGtEQUFTOztBQUUvQixtQkFBbUI7QUFDbkIscUJBQXFCO0FBQ3JCLGtCQUFrQjtBQUNsQixvQkFBb0I7Ozs7Ozs7Ozs7OztBQ0xSOztBQUVaLG1CQUFtQixtQkFBTyxDQUFDLG9EQUFXO0FBQ3RDLG1CQUFtQixtQkFBTyxDQUFDLHFEQUFXOztBQUV0QyxXQUFXLG1CQUFPLENBQUMsK0RBQWlCOztBQUVwQyxjQUFjLG1CQUFPLENBQUMsa0VBQWM7O0FBRXBDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLFlBQVk7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3pOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYiwrSEFBb0Q7Ozs7Ozs7Ozs7OztBQ1ZwRDtBQUNB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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7O0FDdk1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7O0FBRTdCLGlCQUFpQixtQkFBTyxDQUFDLGtGQUFjOztBQUV2QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMsa0ZBQWM7QUFDdEMsb0JBQW9CLG1CQUFPLENBQUMsOEVBQVk7O0FBRXhDO0FBQ0EsVUFBVSxtQkFBTyxDQUFDLGdGQUFtQjtBQUNyQyxVQUFVLG1CQUFPLENBQUMsNEVBQVc7O0FBRTdCO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQywwRUFBa0I7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDA4NDQzMmQ5MDIwYjhkMmNhZjA2LmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIGdsc2xpZnkgPSByZXF1aXJlKCdnbHNsaWZ5JylcblxuZXhwb3J0cy5wb2ludFZlcnRleCAgICAgICA9IGdsc2xpZnkoJy4vc2hhZGVyL3BvaW50LXZlcnRleC5nbHNsJylcbmV4cG9ydHMucG9pbnRGcmFnbWVudCAgICAgPSBnbHNsaWZ5KCcuL3NoYWRlci9wb2ludC1mcmFnbWVudC5nbHNsJylcbmV4cG9ydHMucGlja1ZlcnRleCAgICAgICAgPSBnbHNsaWZ5KCcuL3NoYWRlci9waWNrLXZlcnRleC5nbHNsJylcbmV4cG9ydHMucGlja0ZyYWdtZW50ICAgICAgPSBnbHNsaWZ5KCcuL3NoYWRlci9waWNrLWZyYWdtZW50Lmdsc2wnKVxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciBjcmVhdGVTaGFkZXIgPSByZXF1aXJlKCdnbC1zaGFkZXInKVxudmFyIGNyZWF0ZUJ1ZmZlciA9IHJlcXVpcmUoJ2dsLWJ1ZmZlcicpXG5cbnZhciBwb29sID0gcmVxdWlyZSgndHlwZWRhcnJheS1wb29sJylcblxudmFyIFNIQURFUlMgPSByZXF1aXJlKCcuL2xpYi9zaGFkZXInKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZVBvaW50Y2xvdWQyRFxuXG5mdW5jdGlvbiBQb2ludGNsb3VkMkQocGxvdCwgb2Zmc2V0QnVmZmVyLCBwaWNrQnVmZmVyLCBzaGFkZXIsIHBpY2tTaGFkZXIpIHtcbiAgdGhpcy5wbG90ICAgICAgICAgICA9IHBsb3RcbiAgdGhpcy5vZmZzZXRCdWZmZXIgICA9IG9mZnNldEJ1ZmZlclxuICB0aGlzLnBpY2tCdWZmZXIgICAgID0gcGlja0J1ZmZlclxuICB0aGlzLnNoYWRlciAgICAgICAgID0gc2hhZGVyXG4gIHRoaXMucGlja1NoYWRlciAgICAgPSBwaWNrU2hhZGVyXG4gIHRoaXMuc2l6ZU1pbiAgICAgICAgPSAwLjVcbiAgdGhpcy5zaXplTWluQ2FwICAgICA9IDJcbiAgdGhpcy5zaXplTWF4ICAgICAgICA9IDIwXG4gIHRoaXMuYXJlYVJhdGlvICAgICAgPSAxLjBcbiAgdGhpcy5wb2ludENvdW50ICAgICA9IDBcbiAgdGhpcy5jb2xvciAgICAgICAgICA9IFsxLCAwLCAwLCAxXVxuICB0aGlzLmJvcmRlckNvbG9yICAgID0gWzAsIDAsIDAsIDFdXG4gIHRoaXMuYmxlbmQgICAgICAgICAgPSBmYWxzZVxuICB0aGlzLnBpY2tPZmZzZXQgICAgID0gMFxuICB0aGlzLnBvaW50cyAgICAgICAgID0gbnVsbFxufVxuXG52YXIgcHJvdG8gPSBQb2ludGNsb3VkMkQucHJvdG90eXBlXG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5zaGFkZXIuZGlzcG9zZSgpXG4gIHRoaXMucGlja1NoYWRlci5kaXNwb3NlKClcbiAgdGhpcy5vZmZzZXRCdWZmZXIuZGlzcG9zZSgpXG4gIHRoaXMucGlja0J1ZmZlci5kaXNwb3NlKClcbiAgdGhpcy5wbG90LnJlbW92ZU9iamVjdCh0aGlzKVxufVxuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG5cbiAgdmFyIGlcblxuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIGZ1bmN0aW9uIGRmbHQob3B0LCB2YWx1ZSkge1xuICAgIGlmKG9wdCBpbiBvcHRpb25zKSB7XG4gICAgICByZXR1cm4gb3B0aW9uc1tvcHRdXG4gICAgfVxuICAgIHJldHVybiB2YWx1ZVxuICB9XG5cbiAgdGhpcy5zaXplTWluICAgICAgPSBkZmx0KCdzaXplTWluJywgMC41KVxuICAvLyB0aGlzLnNpemVNaW5DYXAgICAgICA9IGRmbHQoJ3NpemVNaW5DYXAnLCAyKVxuICB0aGlzLnNpemVNYXggICAgICA9IGRmbHQoJ3NpemVNYXgnLCAyMClcbiAgdGhpcy5jb2xvciAgICAgICAgPSBkZmx0KCdjb2xvcicsIFsxLCAwLCAwLCAxXSkuc2xpY2UoKVxuICB0aGlzLmFyZWFSYXRpbyAgICA9IGRmbHQoJ2FyZWFSYXRpbycsIDEpXG4gIHRoaXMuYm9yZGVyQ29sb3IgID0gZGZsdCgnYm9yZGVyQ29sb3InLCBbMCwgMCwgMCwgMV0pLnNsaWNlKClcbiAgdGhpcy5ibGVuZCAgICAgICAgPSBkZmx0KCdibGVuZCcsIGZhbHNlKVxuXG4gIC8vVXBkYXRlIHBvaW50IGRhdGFcblxuICAvLyBBdHRlbXB0IHN0cmFpZ2h0LXRocm91Z2ggcHJvY2Vzc2luZyAoU1RQKSB0byBhdm9pZCBhbGxvY2F0aW9uIGFuZCBjb3B5XG4gIC8vIFRPRE8gZXZlbnR1YWxseSBhYnN0cmFjdCBvdXQgU1RQIGxvZ2ljLCBtYXliZSBpbnRvIGBwb29sYCBvciBhIGxheWVyIGFib3ZlXG4gIHZhciBwb2ludENvdW50ID0gb3B0aW9ucy5wb3NpdGlvbnMubGVuZ3RoID4+PiAxXG4gIHZhciBkYXRhU3RyYWlnaHRUaHJvdWdoID0gb3B0aW9ucy5wb3NpdGlvbnMgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXlcbiAgdmFyIGlkU3RyYWlnaHRUaHJvdWdoID0gb3B0aW9ucy5pZFRvSW5kZXggaW5zdGFuY2VvZiBJbnQzMkFycmF5ICYmIG9wdGlvbnMuaWRUb0luZGV4Lmxlbmd0aCA+PSBwb2ludENvdW50IC8vIHBlcm1pdCBsYXJnZXIgdG8gaGVscCByZXVzZVxuXG4gIHZhciBkYXRhICAgICAgICAgID0gb3B0aW9ucy5wb3NpdGlvbnNcbiAgdmFyIHBhY2tlZCAgICAgICAgPSBkYXRhU3RyYWlnaHRUaHJvdWdoID8gZGF0YSA6IHBvb2wubWFsbG9jRmxvYXQzMihkYXRhLmxlbmd0aClcbiAgdmFyIHBhY2tlZElkICAgICAgPSBpZFN0cmFpZ2h0VGhyb3VnaCA/IG9wdGlvbnMuaWRUb0luZGV4IDogcG9vbC5tYWxsb2NJbnQzMihwb2ludENvdW50KVxuXG4gIGlmKCFkYXRhU3RyYWlnaHRUaHJvdWdoKSB7XG4gICAgcGFja2VkLnNldChkYXRhKVxuICB9XG5cbiAgaWYoIWlkU3RyYWlnaHRUaHJvdWdoKSB7XG4gICAgcGFja2VkLnNldChkYXRhKVxuICAgIGZvcihpID0gMDsgaSA8IHBvaW50Q291bnQ7IGkrKykge1xuICAgICAgcGFja2VkSWRbaV0gPSBpXG4gICAgfVxuICB9XG5cbiAgdGhpcy5wb2ludHMgICAgICAgPSBkYXRhXG5cbiAgdGhpcy5vZmZzZXRCdWZmZXIudXBkYXRlKHBhY2tlZClcbiAgdGhpcy5waWNrQnVmZmVyLnVwZGF0ZShwYWNrZWRJZClcblxuICBpZighZGF0YVN0cmFpZ2h0VGhyb3VnaCkge1xuICAgIHBvb2wuZnJlZShwYWNrZWQpXG4gIH1cblxuICBpZighaWRTdHJhaWdodFRocm91Z2gpIHtcbiAgICBwb29sLmZyZWUocGFja2VkSWQpXG4gIH1cblxuICB0aGlzLnBvaW50Q291bnQgPSBwb2ludENvdW50XG4gIHRoaXMucGlja09mZnNldCA9IDBcbn1cblxuZnVuY3Rpb24gY291bnQocG9pbnRzLCBkYXRhQm94KSB7XG4gIHZhciB2aXNpYmxlUG9pbnRDb3VudEVzdGltYXRlID0gMFxuICB2YXIgbGVuZ3RoID0gcG9pbnRzLmxlbmd0aCA+Pj4gMVxuICB2YXIgaVxuICBmb3IoaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIHZhciB4ID0gcG9pbnRzW2kgKiAyXVxuICAgIHZhciB5ID0gcG9pbnRzW2kgKiAyICsgMV1cbiAgICBpZih4ID49IGRhdGFCb3hbMF0gJiYgeCA8PSBkYXRhQm94WzJdICYmIHkgPj0gZGF0YUJveFsxXSAmJiB5IDw9IGRhdGFCb3hbM10pXG4gICAgICB2aXNpYmxlUG9pbnRDb3VudEVzdGltYXRlKytcbiAgfVxuICByZXR1cm4gdmlzaWJsZVBvaW50Q291bnRFc3RpbWF0ZVxufVxuXG5wcm90by51bmlmaWVkRHJhdyA9IChmdW5jdGlvbigpIHtcbiAgdmFyIE1BVFJJWCA9IFsxLCAwLCAwLFxuICAgICAgICAgICAgICAgIDAsIDEsIDAsXG4gICAgICAgICAgICAgICAgMCwgMCwgMV1cbiAgdmFyIFBJQ0tfVkVDNCA9IFswLCAwLCAwLCAwXVxucmV0dXJuIGZ1bmN0aW9uKHBpY2tPZmZzZXQpIHtcbiAgdmFyIHBpY2sgPSBwaWNrT2Zmc2V0ICE9PSB2b2lkKDApXG5cbiAgdmFyIHNoYWRlciAgICAgICAgPSBwaWNrID8gdGhpcy5waWNrU2hhZGVyIDogdGhpcy5zaGFkZXJcbiAgdmFyIGdsICAgICAgICAgICAgPSB0aGlzLnBsb3QuZ2xcbiAgdmFyIGRhdGFCb3ggICAgICAgPSB0aGlzLnBsb3QuZGF0YUJveFxuXG4gIGlmKHRoaXMucG9pbnRDb3VudCA9PT0gMCkge1xuICAgIHJldHVybiBwaWNrT2Zmc2V0XG4gIH1cblxuICB2YXIgZGF0YVggICA9IGRhdGFCb3hbMl0gLSBkYXRhQm94WzBdXG4gIHZhciBkYXRhWSAgID0gZGF0YUJveFszXSAtIGRhdGFCb3hbMV1cblxuICB2YXIgdmlzaWJsZVBvaW50Q291bnRFc3RpbWF0ZSA9IGNvdW50KHRoaXMucG9pbnRzLCBkYXRhQm94KVxuICB2YXIgYmFzaWNQb2ludFNpemUgPSAgdGhpcy5wbG90LnBpY2tQaXhlbFJhdGlvICogTWF0aC5tYXgoTWF0aC5taW4odGhpcy5zaXplTWluQ2FwLCB0aGlzLnNpemVNaW4pLCBNYXRoLm1pbih0aGlzLnNpemVNYXgsIHRoaXMuc2l6ZU1heCAvIE1hdGgucG93KHZpc2libGVQb2ludENvdW50RXN0aW1hdGUsIDAuMzMzMzMpKSlcblxuICBNQVRSSVhbMF0gPSAyLjAgLyBkYXRhWFxuICBNQVRSSVhbNF0gPSAyLjAgLyBkYXRhWVxuICBNQVRSSVhbNl0gPSAtMi4wICogZGF0YUJveFswXSAvIGRhdGFYIC0gMS4wXG4gIE1BVFJJWFs3XSA9IC0yLjAgKiBkYXRhQm94WzFdIC8gZGF0YVkgLSAxLjBcblxuICB0aGlzLm9mZnNldEJ1ZmZlci5iaW5kKClcblxuICBzaGFkZXIuYmluZCgpXG4gIHNoYWRlci5hdHRyaWJ1dGVzLnBvc2l0aW9uLnBvaW50ZXIoKVxuICBzaGFkZXIudW5pZm9ybXMubWF0cml4ICAgICAgPSBNQVRSSVhcbiAgc2hhZGVyLnVuaWZvcm1zLmNvbG9yICAgICAgID0gdGhpcy5jb2xvclxuICBzaGFkZXIudW5pZm9ybXMuYm9yZGVyQ29sb3IgPSB0aGlzLmJvcmRlckNvbG9yXG4gIHNoYWRlci51bmlmb3Jtcy5wb2ludENsb3VkID0gYmFzaWNQb2ludFNpemUgPCA1XG4gIHNoYWRlci51bmlmb3Jtcy5wb2ludFNpemUgPSBiYXNpY1BvaW50U2l6ZVxuICBzaGFkZXIudW5pZm9ybXMuY2VudGVyRnJhY3Rpb24gPSBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCBNYXRoLnNxcnQoMSAtIHRoaXMuYXJlYVJhdGlvKSkpXG5cbiAgaWYocGljaykge1xuXG4gICAgUElDS19WRUM0WzBdID0gKCBwaWNrT2Zmc2V0ICAgICAgICAmIDB4ZmYpXG4gICAgUElDS19WRUM0WzFdID0gKChwaWNrT2Zmc2V0ID4+IDgpICAmIDB4ZmYpXG4gICAgUElDS19WRUM0WzJdID0gKChwaWNrT2Zmc2V0ID4+IDE2KSAmIDB4ZmYpXG4gICAgUElDS19WRUM0WzNdID0gKChwaWNrT2Zmc2V0ID4+IDI0KSAmIDB4ZmYpXG5cbiAgICB0aGlzLnBpY2tCdWZmZXIuYmluZCgpXG4gICAgc2hhZGVyLmF0dHJpYnV0ZXMucGlja0lkLnBvaW50ZXIoZ2wuVU5TSUdORURfQllURSlcbiAgICBzaGFkZXIudW5pZm9ybXMucGlja09mZnNldCA9IFBJQ0tfVkVDNFxuICAgIHRoaXMucGlja09mZnNldCA9IHBpY2tPZmZzZXRcbiAgfVxuXG4gIC8vIFdvcnRoIHN3aXRjaGluZyB0aGVzZSBvZmYsIGJ1dCB3ZSBjYW4ndCBtYWtlIGFzc3VtcHRpb25zIGFib3V0IG90aGVyXG4gIC8vIHJlbmRlcmVycywgc28gbGV0J3MgcmVzdG9yZSBpdCBhZnRlciBlYWNoIGRyYXdcbiAgdmFyIGJsZW5kID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLkJMRU5EKVxuICB2YXIgZGl0aGVyID0gZ2wuZ2V0UGFyYW1ldGVyKGdsLkRJVEhFUilcblxuICBpZihibGVuZCAmJiAhdGhpcy5ibGVuZClcbiAgICBnbC5kaXNhYmxlKGdsLkJMRU5EKVxuICBpZihkaXRoZXIpXG4gICAgZ2wuZGlzYWJsZShnbC5ESVRIRVIpXG5cbiAgZ2wuZHJhd0FycmF5cyhnbC5QT0lOVFMsIDAsIHRoaXMucG9pbnRDb3VudClcblxuICBpZihibGVuZCAmJiAhdGhpcy5ibGVuZClcbiAgICBnbC5lbmFibGUoZ2wuQkxFTkQpXG4gIGlmKGRpdGhlcilcbiAgICBnbC5lbmFibGUoZ2wuRElUSEVSKVxuXG4gIHJldHVybiBwaWNrT2Zmc2V0ICsgdGhpcy5wb2ludENvdW50XG59XG59KSgpXG5cbnByb3RvLmRyYXcgPSBwcm90by51bmlmaWVkRHJhd1xucHJvdG8uZHJhd1BpY2sgPSBwcm90by51bmlmaWVkRHJhd1xuXG5wcm90by5waWNrID0gZnVuY3Rpb24oeCwgeSwgdmFsdWUpIHtcbiAgdmFyIHBpY2tPZmZzZXQgPSB0aGlzLnBpY2tPZmZzZXRcbiAgdmFyIHBvaW50Q291bnQgPSB0aGlzLnBvaW50Q291bnRcbiAgaWYodmFsdWUgPCBwaWNrT2Zmc2V0IHx8IHZhbHVlID49IHBpY2tPZmZzZXQgKyBwb2ludENvdW50KSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuICB2YXIgcG9pbnRJZCA9IHZhbHVlIC0gcGlja09mZnNldFxuICB2YXIgcG9pbnRzID0gdGhpcy5wb2ludHNcbiAgcmV0dXJuIHtcbiAgICBvYmplY3Q6IHRoaXMsXG4gICAgcG9pbnRJZDogcG9pbnRJZCxcbiAgICBkYXRhQ29vcmQ6IFtwb2ludHNbMiAqIHBvaW50SWRdLCBwb2ludHNbMiAqIHBvaW50SWQgKyAxXSBdXG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlUG9pbnRjbG91ZDJEKHBsb3QsIG9wdGlvbnMpIHtcbiAgdmFyIGdsID0gcGxvdC5nbFxuICB2YXIgYnVmZmVyID0gY3JlYXRlQnVmZmVyKGdsKVxuICB2YXIgcGlja0J1ZmZlciA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgU0hBREVSUy5wb2ludFZlcnRleCwgU0hBREVSUy5wb2ludEZyYWdtZW50KVxuICB2YXIgcGlja1NoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgU0hBREVSUy5waWNrVmVydGV4LCBTSEFERVJTLnBpY2tGcmFnbWVudClcblxuICB2YXIgcmVzdWx0ID0gbmV3IFBvaW50Y2xvdWQyRChwbG90LCBidWZmZXIsIHBpY2tCdWZmZXIsIHNoYWRlciwgcGlja1NoYWRlcilcbiAgcmVzdWx0LnVwZGF0ZShvcHRpb25zKVxuXG4gIC8vUmVnaXN0ZXIgd2l0aCBwbG90XG4gIHBsb3QuYWRkT2JqZWN0KHJlc3VsdClcblxuICByZXR1cm4gcmVzdWx0XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9wb2ludGNsb3VkJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBzY2F0dGVyZ2xBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB4OiBzY2F0dGVyZ2xBdHRycy54LFxuICAgIHk6IHNjYXR0ZXJnbEF0dHJzLnksXG4gICAgeHk6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0Zhc3RlciBhbHRlcm5hdGl2ZSB0byBzcGVjaWZ5aW5nIGB4YCBhbmQgYHlgIHNlcGFyYXRlbHkuJyxcbiAgICAgICAgICAgICdJZiBzdXBwbGllZCwgaXQgbXVzdCBiZSBhIHR5cGVkIGBGbG9hdDMyQXJyYXlgIGFycmF5IHRoYXQnLFxuICAgICAgICAgICAgJ3JlcHJlc2VudHMgcG9pbnRzIHN1Y2ggdGhhdCBgeHlbaSAqIDJdID0geFtpXWAgYW5kIGB4eVtpICogMiArIDFdID0geVtpXWAnXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBpbmRpY2VzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdBIHNlcXVlbnRpYWwgdmFsdWUsIDAuLm4sIHN1cHBseSBpdCB0byBhdm9pZCBjcmVhdGluZyB0aGlzIGFycmF5IGluc2lkZSBwbG90dGluZy4nLFxuICAgICAgICAgICAgJ0lmIHNwZWNpZmllZCwgaXQgbXVzdCBiZSBhIHR5cGVkIGBJbnQzMkFycmF5YCBhcnJheS4nLFxuICAgICAgICAgICAgJ0l0cyBsZW5ndGggbXVzdCBiZSBlcXVhbCB0byBvciBncmVhdGVyIHRoYW4gdGhlIG51bWJlciBvZiBwb2ludHMuJyxcbiAgICAgICAgICAgICdGb3IgdGhlIGJlc3QgcGVyZm9ybWFuY2UgYW5kIG1lbW9yeSB1c2UsIGNyZWF0ZSBvbmUgbGFyZ2UgYGluZGljZXNgIHR5cGVkIGFycmF5JyxcbiAgICAgICAgICAgICd0aGF0IGlzIGd1YXJhbnRlZWQgdG8gYmUgYXQgbGVhc3QgYXMgbG9uZyBhcyB0aGUgbGFyZ2VzdCBudW1iZXIgb2YgcG9pbnRzIGR1cmluZycsXG4gICAgICAgICAgICAndXNlLCBhbmQgcmV1c2UgaXQgb24gZWFjaCBgUGxvdGx5LnJlc3R5bGUoKWAgY2FsbC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB4Ym91bmRzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTcGVjaWZ5IGB4Ym91bmRzYCBpbiB0aGUgc2hhcGUgb2YgYFt4TWluLCB4TWF4XSB0byBhdm9pZCBsb29waW5nIHRocm91Z2gnLFxuICAgICAgICAgICAgJ3RoZSBgeHlgIHR5cGVkIGFycmF5LiBVc2UgaXQgaW4gY29uanVuY3Rpb24gd2l0aCBgeHlgIGFuZCBgeWJvdW5kc2AgZm9yIHRoZSBwZXJmb3JtYW5jZSBiZW5lZml0cy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5Ym91bmRzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTcGVjaWZ5IGB5Ym91bmRzYCBpbiB0aGUgc2hhcGUgb2YgYFt5TWluLCB5TWF4XSB0byBhdm9pZCBsb29waW5nIHRocm91Z2gnLFxuICAgICAgICAgICAgJ3RoZSBgeHlgIHR5cGVkIGFycmF5LiBVc2UgaXQgaW4gY29uanVuY3Rpb24gd2l0aCBgeHlgIGFuZCBgeGJvdW5kc2AgZm9yIHRoZSBwZXJmb3JtYW5jZSBiZW5lZml0cy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB0ZXh0OiBzY2F0dGVyZ2xBdHRycy50ZXh0LFxuICAgIG1hcmtlcjoge1xuICAgICAgICBjb2xvcjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgICAgIGFycmF5T2s6IGZhbHNlLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBtYXJrZXIgZmlsbCBjb2xvci4gSXQgYWNjZXB0cyBhIHNwZWNpZmljIGNvbG9yLicsXG4gICAgICAgICAgICAgICAgJ0lmIHRoZSBjb2xvciBpcyBub3QgZnVsbHkgb3BhcXVlIGFuZCB0aGVyZSBhcmUgaHVuZHJlZHMgb2YgdGhvdXNhbmRzJyxcbiAgICAgICAgICAgICAgICAnb2YgcG9pbnRzLCBpdCBtYXkgY2F1c2Ugc2xvd2VyIHpvb21pbmcgYW5kIHBhbm5pbmcuJ1xuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9LFxuICAgICAgICBvcGFjaXR5OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICAgIGRmbHQ6IDEsXG4gICAgICAgICAgICBhcnJheU9rOiBmYWxzZSxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgbWFya2VyIG9wYWNpdHkuIFRoZSBkZWZhdWx0IHZhbHVlIGlzIGAxYCAoZnVsbHkgb3BhcXVlKS4nLFxuICAgICAgICAgICAgICAgICdJZiB0aGUgbWFya2VycyBhcmUgbm90IGZ1bGx5IG9wYXF1ZSBhbmQgdGhlcmUgYXJlIGh1bmRyZWRzIG9mIHRob3VzYW5kcycsXG4gICAgICAgICAgICAgICAgJ29mIHBvaW50cywgaXQgbWF5IGNhdXNlIHNsb3dlciB6b29taW5nIGFuZCBwYW5uaW5nLicsXG4gICAgICAgICAgICAgICAgJ09wYWNpdHkgZmFkZXMgdGhlIGNvbG9yIGV2ZW4gaWYgYGJsZW5kYCBpcyBsZWZ0IG9uIGBmYWxzZWAgZXZlbiBpZiB0aGVyZScsXG4gICAgICAgICAgICAgICAgJ2lzIG5vIHRyYW5zbHVjZW5jeSBlZmZlY3QgaW4gdGhhdCBjYXNlLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGJsZW5kOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICBkZmx0OiBudWxsLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIGlmIGNvbG9ycyBhcmUgYmxlbmRlZCB0b2dldGhlciBmb3IgYSB0cmFuc2x1Y2VuY3kgZWZmZWN0JyxcbiAgICAgICAgICAgICAgICAnaW4gY2FzZSBgb3BhY2l0eWAgaXMgc3BlY2lmaWVkIGFzIGEgdmFsdWUgbGVzcyB0aGVuIGAxYC4nLFxuICAgICAgICAgICAgICAgICdTZXR0aW5nIGBibGVuZGAgdG8gYHRydWVgIHJlZHVjZXMgem9vbS9wYW4nLFxuICAgICAgICAgICAgICAgICdzcGVlZCBpZiB1c2VkIHdpdGggbGFyZ2UgbnVtYmVycyBvZiBwb2ludHMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZW1pbjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBtaW46IDAuMSxcbiAgICAgICAgICAgIG1heDogMixcbiAgICAgICAgICAgIGRmbHQ6IDAuNSxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgbWluaW11bSBzaXplIChpbiBweCkgb2YgdGhlIHJlbmRlcmVkIG1hcmtlciBwb2ludHMsIGVmZmVjdGl2ZSB3aGVuJyxcbiAgICAgICAgICAgICAgICAndGhlIGBwb2ludGNsb3VkYCBzaG93cyBhIG1pbGxpb24gb3IgbW9yZSBwb2ludHMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgc2l6ZW1heDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBtaW46IDAuMSxcbiAgICAgICAgICAgIGRmbHQ6IDIwLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBtYXhpbXVtIHNpemUgKGluIHB4KSBvZiB0aGUgcmVuZGVyZWQgbWFya2VyIHBvaW50cy4nLFxuICAgICAgICAgICAgICAgICdFZmZlY3RpdmUgd2hlbiB0aGUgYHBvaW50Y2xvdWRgIHNob3dzIG9ubHkgZmV3IHBvaW50cy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBib3JkZXI6IHtcbiAgICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgICAgICAgICBhcnJheU9rOiBmYWxzZSxcbiAgICAgICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIHN0cm9rZSBjb2xvci4gSXQgYWNjZXB0cyBhIHNwZWNpZmljIGNvbG9yLicsXG4gICAgICAgICAgICAgICAgICAgICdJZiB0aGUgY29sb3IgaXMgbm90IGZ1bGx5IG9wYXF1ZSBhbmQgdGhlcmUgYXJlIGh1bmRyZWRzIG9mIHRob3VzYW5kcycsXG4gICAgICAgICAgICAgICAgICAgICdvZiBwb2ludHMsIGl0IG1heSBjYXVzZSBzbG93ZXIgem9vbWluZyBhbmQgcGFubmluZy4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhcmVhcmF0aW86IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTcGVjaWZpZXMgd2hhdCBmcmFjdGlvbiBvZiB0aGUgbWFya2VyIGFyZWEgaXMgY292ZXJlZCB3aXRoIHRoZScsXG4gICAgICAgICAgICAgICAgICAgICdib3JkZXIuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcbiAgICB0cmFuc2Zvcm1zOiB1bmRlZmluZWRcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVQb2ludENsb3VkUmVuZGVyZXIgPSByZXF1aXJlKCdnbC1wb2ludGNsb3VkMmQnKTtcblxudmFyIHN0cjJSR0JBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zdHIycmdiYXJyYXknKTtcbnZhciBmaW5kRXh0cmVtZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXV0b3JhbmdlJykuZmluZEV4dHJlbWVzO1xudmFyIGdldFRyYWNlQ29sb3IgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2dldF90cmFjZV9jb2xvcicpO1xuXG5mdW5jdGlvbiBQb2ludGNsb3VkKHNjZW5lLCB1aWQpIHtcbiAgICB0aGlzLnNjZW5lID0gc2NlbmU7XG4gICAgdGhpcy51aWQgPSB1aWQ7XG4gICAgdGhpcy50eXBlID0gJ3BvaW50Y2xvdWQnO1xuXG4gICAgdGhpcy5waWNrWERhdGEgPSBbXTtcbiAgICB0aGlzLnBpY2tZRGF0YSA9IFtdO1xuICAgIHRoaXMueERhdGEgPSBbXTtcbiAgICB0aGlzLnlEYXRhID0gW107XG4gICAgdGhpcy50ZXh0TGFiZWxzID0gW107XG4gICAgdGhpcy5jb2xvciA9ICdyZ2IoMCwgMCwgMCknO1xuICAgIHRoaXMubmFtZSA9ICcnO1xuICAgIHRoaXMuaG92ZXJpbmZvID0gJ2FsbCc7XG5cbiAgICB0aGlzLmlkVG9JbmRleCA9IG5ldyBJbnQzMkFycmF5KDApO1xuICAgIHRoaXMuYm91bmRzID0gWzAsIDAsIDAsIDBdO1xuXG4gICAgdGhpcy5wb2ludGNsb3VkT3B0aW9ucyA9IHtcbiAgICAgICAgcG9zaXRpb25zOiBuZXcgRmxvYXQzMkFycmF5KDApLFxuICAgICAgICBpZFRvSW5kZXg6IHRoaXMuaWRUb0luZGV4LFxuICAgICAgICBzaXplbWluOiAwLjUsXG4gICAgICAgIHNpemVtYXg6IDEyLFxuICAgICAgICBjb2xvcjogWzAsIDAsIDAsIDFdLFxuICAgICAgICBhcmVhUmF0aW86IDEsXG4gICAgICAgIGJvcmRlckNvbG9yOiBbMCwgMCwgMCwgMV1cbiAgICB9O1xuICAgIHRoaXMucG9pbnRjbG91ZCA9IGNyZWF0ZVBvaW50Q2xvdWRSZW5kZXJlcihzY2VuZS5nbHBsb3QsIHRoaXMucG9pbnRjbG91ZE9wdGlvbnMpO1xuICAgIHRoaXMucG9pbnRjbG91ZC5fdHJhY2UgPSB0aGlzOyAvLyBzY2VuZTJkIHJlcXVpcmVzIHRoaXMgcHJvcFxufVxuXG52YXIgcHJvdG8gPSBQb2ludGNsb3VkLnByb3RvdHlwZTtcblxucHJvdG8uaGFuZGxlUGljayA9IGZ1bmN0aW9uKHBpY2tSZXN1bHQpIHtcbiAgICB2YXIgaW5kZXggPSB0aGlzLmlkVG9JbmRleFtwaWNrUmVzdWx0LnBvaW50SWRdO1xuXG4gICAgLy8gcHJlZmVyIHRoZSByZWFkb3V0IGZyb20gWFksIGlmIHByZXNlbnRcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFjZTogdGhpcyxcbiAgICAgICAgZGF0YUNvb3JkOiBwaWNrUmVzdWx0LmRhdGFDb29yZCxcbiAgICAgICAgdHJhY2VDb29yZDogdGhpcy5waWNrWFlEYXRhID9cbiAgICAgICAgICAgIFt0aGlzLnBpY2tYWURhdGFbaW5kZXggKiAyXSwgdGhpcy5waWNrWFlEYXRhW2luZGV4ICogMiArIDFdXSA6XG4gICAgICAgICAgICBbdGhpcy5waWNrWERhdGFbaW5kZXhdLCB0aGlzLnBpY2tZRGF0YVtpbmRleF1dLFxuICAgICAgICB0ZXh0TGFiZWw6IEFycmF5LmlzQXJyYXkodGhpcy50ZXh0TGFiZWxzKSA/XG4gICAgICAgICAgICB0aGlzLnRleHRMYWJlbHNbaW5kZXhdIDpcbiAgICAgICAgICAgIHRoaXMudGV4dExhYmVscyxcbiAgICAgICAgY29sb3I6IHRoaXMuY29sb3IsXG4gICAgICAgIG5hbWU6IHRoaXMubmFtZSxcbiAgICAgICAgcG9pbnRJbmRleDogaW5kZXgsXG4gICAgICAgIGhvdmVyaW5mbzogdGhpcy5ob3ZlcmluZm9cbiAgICB9O1xufTtcblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIHRoaXMuaW5kZXggPSBvcHRpb25zLmluZGV4O1xuICAgIHRoaXMudGV4dExhYmVscyA9IG9wdGlvbnMudGV4dDtcbiAgICB0aGlzLm5hbWUgPSBvcHRpb25zLm5hbWU7XG4gICAgdGhpcy5ob3ZlcmluZm8gPSBvcHRpb25zLmhvdmVyaW5mbztcbiAgICB0aGlzLmJvdW5kcyA9IFtJbmZpbml0eSwgSW5maW5pdHksIC1JbmZpbml0eSwgLUluZmluaXR5XTtcblxuICAgIHRoaXMudXBkYXRlRmFzdChvcHRpb25zKTtcblxuICAgIHRoaXMuY29sb3IgPSBnZXRUcmFjZUNvbG9yKG9wdGlvbnMsIHt9KTtcbn07XG5cbnByb3RvLnVwZGF0ZUZhc3QgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIHggPSB0aGlzLnhEYXRhID0gdGhpcy5waWNrWERhdGEgPSBvcHRpb25zLng7XG4gICAgdmFyIHkgPSB0aGlzLnlEYXRhID0gdGhpcy5waWNrWURhdGEgPSBvcHRpb25zLnk7XG4gICAgdmFyIHh5ID0gdGhpcy5waWNrWFlEYXRhID0gb3B0aW9ucy54eTtcblxuICAgIHZhciB1c2VyQm91bmRzID0gb3B0aW9ucy54Ym91bmRzICYmIG9wdGlvbnMueWJvdW5kcztcbiAgICB2YXIgaW5kZXggPSBvcHRpb25zLmluZGljZXM7XG5cbiAgICB2YXIgbGVuO1xuICAgIHZhciBpZFRvSW5kZXg7XG4gICAgdmFyIHBvc2l0aW9ucztcbiAgICB2YXIgYm91bmRzID0gdGhpcy5ib3VuZHM7XG5cbiAgICB2YXIgeHgsIHl5LCBpO1xuXG4gICAgaWYoeHkpIHtcbiAgICAgICAgcG9zaXRpb25zID0geHk7XG5cbiAgICAgICAgLy8gZGl2aWRpbmcgeHkubGVuZ3RoIGJ5IDIgYW5kIHRydW5jYXRpbmcgdG8gaW50ZWdlciBpZiB4eS5sZW5ndGggd2FzIG5vdCBldmVuXG4gICAgICAgIGxlbiA9IHh5Lmxlbmd0aCA+Pj4gMTtcblxuICAgICAgICBpZih1c2VyQm91bmRzKSB7XG4gICAgICAgICAgICBib3VuZHNbMF0gPSBvcHRpb25zLnhib3VuZHNbMF07XG4gICAgICAgICAgICBib3VuZHNbMl0gPSBvcHRpb25zLnhib3VuZHNbMV07XG4gICAgICAgICAgICBib3VuZHNbMV0gPSBvcHRpb25zLnlib3VuZHNbMF07XG4gICAgICAgICAgICBib3VuZHNbM10gPSBvcHRpb25zLnlib3VuZHNbMV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgICAgIHh4ID0gcG9zaXRpb25zW2kgKiAyXTtcbiAgICAgICAgICAgICAgICB5eSA9IHBvc2l0aW9uc1tpICogMiArIDFdO1xuXG4gICAgICAgICAgICAgICAgaWYoeHggPCBib3VuZHNbMF0pIGJvdW5kc1swXSA9IHh4O1xuICAgICAgICAgICAgICAgIGlmKHh4ID4gYm91bmRzWzJdKSBib3VuZHNbMl0gPSB4eDtcbiAgICAgICAgICAgICAgICBpZih5eSA8IGJvdW5kc1sxXSkgYm91bmRzWzFdID0geXk7XG4gICAgICAgICAgICAgICAgaWYoeXkgPiBib3VuZHNbM10pIGJvdW5kc1szXSA9IHl5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoaW5kZXgpIHtcbiAgICAgICAgICAgIGlkVG9JbmRleCA9IGluZGV4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWRUb0luZGV4ID0gbmV3IEludDMyQXJyYXkobGVuKTtcblxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZFRvSW5kZXhbaV0gPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVuID0geC5sZW5ndGg7XG5cbiAgICAgICAgcG9zaXRpb25zID0gbmV3IEZsb2F0MzJBcnJheSgyICogbGVuKTtcbiAgICAgICAgaWRUb0luZGV4ID0gbmV3IEludDMyQXJyYXkobGVuKTtcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgeHggPSB4W2ldO1xuICAgICAgICAgICAgeXkgPSB5W2ldO1xuXG4gICAgICAgICAgICBpZFRvSW5kZXhbaV0gPSBpO1xuXG4gICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDJdID0geHg7XG4gICAgICAgICAgICBwb3NpdGlvbnNbaSAqIDIgKyAxXSA9IHl5O1xuXG4gICAgICAgICAgICBpZih4eCA8IGJvdW5kc1swXSkgYm91bmRzWzBdID0geHg7XG4gICAgICAgICAgICBpZih4eCA+IGJvdW5kc1syXSkgYm91bmRzWzJdID0geHg7XG4gICAgICAgICAgICBpZih5eSA8IGJvdW5kc1sxXSkgYm91bmRzWzFdID0geXk7XG4gICAgICAgICAgICBpZih5eSA+IGJvdW5kc1szXSkgYm91bmRzWzNdID0geXk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLmlkVG9JbmRleCA9IGlkVG9JbmRleDtcbiAgICB0aGlzLnBvaW50Y2xvdWRPcHRpb25zLmlkVG9JbmRleCA9IGlkVG9JbmRleDtcblxuICAgIHRoaXMucG9pbnRjbG91ZE9wdGlvbnMucG9zaXRpb25zID0gcG9zaXRpb25zO1xuXG4gICAgdmFyIG1hcmtlckNvbG9yID0gc3RyMlJHQkFycmF5KG9wdGlvbnMubWFya2VyLmNvbG9yKTtcbiAgICB2YXIgYm9yZGVyQ29sb3IgPSBzdHIyUkdCQXJyYXkob3B0aW9ucy5tYXJrZXIuYm9yZGVyLmNvbG9yKTtcbiAgICB2YXIgb3BhY2l0eSA9IG9wdGlvbnMub3BhY2l0eSAqIG9wdGlvbnMubWFya2VyLm9wYWNpdHk7XG5cbiAgICBtYXJrZXJDb2xvclszXSAqPSBvcGFjaXR5O1xuICAgIHRoaXMucG9pbnRjbG91ZE9wdGlvbnMuY29sb3IgPSBtYXJrZXJDb2xvcjtcblxuICAgIC8vIGRldGVjdCBibGVuZGluZyBmcm9tIHRoZSBudW1iZXIgb2YgcG9pbnRzLCBpZiB1bmRlZmluZWRcbiAgICAvLyBiZWNhdXNlIGxhcmdlIGRhdGEgd2l0aCBibGVuZGluZyBoaXRzIHBlcmZvcm1hbmNlXG4gICAgdmFyIGJsZW5kID0gb3B0aW9ucy5tYXJrZXIuYmxlbmQ7XG4gICAgaWYoYmxlbmQgPT09IG51bGwpIHtcbiAgICAgICAgdmFyIG1heFBvaW50cyA9IDEwMDtcbiAgICAgICAgYmxlbmQgPSB4Lmxlbmd0aCA8IG1heFBvaW50cyB8fCB5Lmxlbmd0aCA8IG1heFBvaW50cztcbiAgICB9XG4gICAgdGhpcy5wb2ludGNsb3VkT3B0aW9ucy5ibGVuZCA9IGJsZW5kO1xuXG4gICAgYm9yZGVyQ29sb3JbM10gKj0gb3BhY2l0eTtcbiAgICB0aGlzLnBvaW50Y2xvdWRPcHRpb25zLmJvcmRlckNvbG9yID0gYm9yZGVyQ29sb3I7XG5cbiAgICB2YXIgbWFya2VyU2l6ZU1pbiA9IG9wdGlvbnMubWFya2VyLnNpemVtaW47XG4gICAgdmFyIG1hcmtlclNpemVNYXggPSBNYXRoLm1heChvcHRpb25zLm1hcmtlci5zaXplbWF4LCBvcHRpb25zLm1hcmtlci5zaXplbWluKTtcbiAgICB0aGlzLnBvaW50Y2xvdWRPcHRpb25zLnNpemVNaW4gPSBtYXJrZXJTaXplTWluO1xuICAgIHRoaXMucG9pbnRjbG91ZE9wdGlvbnMuc2l6ZU1heCA9IG1hcmtlclNpemVNYXg7XG4gICAgdGhpcy5wb2ludGNsb3VkT3B0aW9ucy5hcmVhUmF0aW8gPSBvcHRpb25zLm1hcmtlci5ib3JkZXIuYXJlYXJhdGlvO1xuXG4gICAgdGhpcy5wb2ludGNsb3VkLnVwZGF0ZSh0aGlzLnBvaW50Y2xvdWRPcHRpb25zKTtcblxuICAgIC8vIGFkZCBpdGVtIGZvciBhdXRvcmFuZ2Ugcm91dGluZVxuICAgIHZhciB4YSA9IHRoaXMuc2NlbmUueGF4aXM7XG4gICAgdmFyIHlhID0gdGhpcy5zY2VuZS55YXhpcztcbiAgICB2YXIgcGFkID0gbWFya2VyU2l6ZU1heCAvIDIgfHwgMC41O1xuICAgIG9wdGlvbnMuX2V4dHJlbWVzW3hhLl9pZF0gPSBmaW5kRXh0cmVtZXMoeGEsIFtib3VuZHNbMF0sIGJvdW5kc1syXV0sIHtwcGFkOiBwYWR9KTtcbiAgICBvcHRpb25zLl9leHRyZW1lc1t5YS5faWRdID0gZmluZEV4dHJlbWVzKHlhLCBbYm91bmRzWzFdLCBib3VuZHNbM11dLCB7cHBhZDogcGFkfSk7XG59O1xuXG5wcm90by5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wb2ludGNsb3VkLmRpc3Bvc2UoKTtcbn07XG5cbmZ1bmN0aW9uIGNyZWF0ZVBvaW50Y2xvdWQoc2NlbmUsIGRhdGEpIHtcbiAgICB2YXIgcGxvdCA9IG5ldyBQb2ludGNsb3VkKHNjZW5lLCBkYXRhLnVpZCk7XG4gICAgcGxvdC51cGRhdGUoZGF0YSk7XG4gICAgcmV0dXJuIHBsb3Q7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlUG9pbnRjbG91ZDtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvcikge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3gnKTtcbiAgICBjb2VyY2UoJ3knKTtcblxuICAgIGNvZXJjZSgneGJvdW5kcycpO1xuICAgIGNvZXJjZSgneWJvdW5kcycpO1xuXG4gICAgaWYodHJhY2VJbi54eSAmJiB0cmFjZUluLnh5IGluc3RhbmNlb2YgRmxvYXQzMkFycmF5KSB7XG4gICAgICAgIHRyYWNlT3V0Lnh5ID0gdHJhY2VJbi54eTtcbiAgICB9XG5cbiAgICBpZih0cmFjZUluLmluZGljZXMgJiYgdHJhY2VJbi5pbmRpY2VzIGluc3RhbmNlb2YgSW50MzJBcnJheSkge1xuICAgICAgICB0cmFjZU91dC5pbmRpY2VzID0gdHJhY2VJbi5pbmRpY2VzO1xuICAgIH1cblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnbWFya2VyLmNvbG9yJywgZGVmYXVsdENvbG9yKTtcbiAgICBjb2VyY2UoJ21hcmtlci5vcGFjaXR5Jyk7XG4gICAgY29lcmNlKCdtYXJrZXIuYmxlbmQnKTtcbiAgICBjb2VyY2UoJ21hcmtlci5zaXplbWluJyk7XG4gICAgY29lcmNlKCdtYXJrZXIuc2l6ZW1heCcpO1xuICAgIGNvZXJjZSgnbWFya2VyLmJvcmRlci5jb2xvcicsIGRlZmF1bHRDb2xvcik7XG4gICAgY29lcmNlKCdtYXJrZXIuYm9yZGVyLmFyZWFyYXRpbycpO1xuXG4gICAgLy8gZGlzYWJsZSAxRCB0cmFuc2Zvcm1zIC0gdGhhdCB3b3VsZCBkZWZlYXQgdGhlIHB1cnBvc2Ugb2YgdGhpcyB0cmFjZSB0eXBlLCBwZXJmb3JtYW5jZSFcbiAgICB0cmFjZU91dC5fbGVuZ3RoID0gbnVsbDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG5cbiAgICAvLyByZXVzZSB0aGUgU2NhdHRlcjNEICdkdW1teScgY2FsYyBzdGVwIHNvIHRoYXQgbGVnZW5kcyBrbm93IHdoYXQgdG8gZG9cbiAgICBjYWxjOiByZXF1aXJlKCcuLi9zY2F0dGVyM2QvY2FsYycpLFxuICAgIHBsb3Q6IHJlcXVpcmUoJy4vY29udmVydCcpLFxuXG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAncG9pbnRjbG91ZCcsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dsMmQnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2dsJywgJ2dsMmQnLCAnc2hvd0xlZ2VuZCddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgZGF0YSB2aXN1YWxpemVkIGFzIGEgcG9pbnQgY2xvdWQgc2V0IGluIGB4YCBhbmQgYHlgJyxcbiAgICAgICAgICAgICd1c2luZyB0aGUgV2ViR2wgcGxvdHRpbmcgZW5naW5lLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==