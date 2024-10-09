(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_plots_gl2d_index_js"],{

/***/ "./node_modules/gl-plot2d/lib/box.js":
/*!*******************************************!*\
  !*** ./node_modules/gl-plot2d/lib/box.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createBoxes

var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")

var shaders = __webpack_require__(/*! ./shaders */ "./node_modules/gl-plot2d/lib/shaders.js")

function Boxes(plot, vbo, shader) {
  this.plot   = plot
  this.vbo    = vbo
  this.shader = shader
}

var proto = Boxes.prototype

proto.bind = function() {
  var shader = this.shader
  this.vbo.bind()
  this.shader.bind()
  shader.attributes.coord.pointer()
  shader.uniforms.screenBox = this.plot.screenBox
}

proto.drawBox = (function() {
  var lo = [0,0]
  var hi = [0,0]
  return function(loX, loY, hiX, hiY, color) {
    var plot       = this.plot
    var shader     = this.shader
    var gl         = plot.gl

    lo[0] = loX
    lo[1] = loY
    hi[0] = hiX
    hi[1] = hiY

    shader.uniforms.lo     = lo
    shader.uniforms.hi     = hi
    shader.uniforms.color  = color

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}())

proto.dispose = function() {
  this.vbo.dispose()
  this.shader.dispose()
}

function createBoxes(plot) {
  var gl  = plot.gl
  var vbo = createBuffer(gl, [
    0,0,
    0,1,
    1,0,
    1,1])
  var shader  = createShader(gl, shaders.boxVert, shaders.lineFrag)
  return new Boxes(plot, vbo, shader)
}


/***/ }),

/***/ "./node_modules/gl-plot2d/lib/grid.js":
/*!********************************************!*\
  !*** ./node_modules/gl-plot2d/lib/grid.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createGrid

var createBuffer  = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createShader  = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var bsearch       = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")
var shaders       = __webpack_require__(/*! ./shaders */ "./node_modules/gl-plot2d/lib/shaders.js")

function Grid(plot, vbo, shader, tickShader) {
  this.plot   = plot
  this.vbo    = vbo
  this.shader = shader
  this.tickShader = tickShader
  this.ticks  = [[], []]
}

function compareTickNum(a, b) {
  return a - b
}

var proto = Grid.prototype

proto.draw = (function() {

  var DATA_SHIFT = [0,0]
  var DATA_SCALE = [0,0]
  var DATA_AXIS  = [0,0]

  return function() {
    var plot       = this.plot
    var vbo        = this.vbo
    var shader     = this.shader
    var ticks      = this.ticks
    var gl         = plot.gl
    var bounds     = plot._tickBounds
    var dataBox    = plot.dataBox
    var viewPixels = plot.viewBox
    var lineWidth  = plot.gridLineWidth
    var gridColor  = plot.gridLineColor
    var gridEnable = plot.gridLineEnable
    var pixelRatio = plot.pixelRatio

    for(var i=0; i<2; ++i) {
      var lo = bounds[i]
      var hi = bounds[i+2]
      var boundScale = hi - lo
      var dataCenter  = 0.5 * (dataBox[i+2] + dataBox[i])
      var dataWidth   = dataBox[i+2] - dataBox[i]
      DATA_SCALE[i] = 2.0 * boundScale / dataWidth
      DATA_SHIFT[i] = 2.0 * (lo - dataCenter) / dataWidth
    }

    shader.bind()
    vbo.bind()
    shader.attributes.dataCoord.pointer()
    shader.uniforms.dataShift = DATA_SHIFT
    shader.uniforms.dataScale = DATA_SCALE

    var offset = 0
    for(var i=0; i<2; ++i) {
      DATA_AXIS[0] = DATA_AXIS[1] = 0
      DATA_AXIS[i] = 1
      shader.uniforms.dataAxis  = DATA_AXIS
      shader.uniforms.lineWidth = lineWidth[i] / (viewPixels[i+2] - viewPixels[i]) * pixelRatio
      shader.uniforms.color     = gridColor[i]

      var size = ticks[i].length * 6
      if(gridEnable[i] && size) {
        gl.drawArrays(gl.TRIANGLES, offset, size)
      }
      offset += size
    }
  }
})()

proto.drawTickMarks = (function() {
  var DATA_SHIFT = [0,0]
  var DATA_SCALE = [0,0]
  var X_AXIS     = [1,0]
  var Y_AXIS     = [0,1]
  var SCR_OFFSET = [0,0]
  var TICK_SCALE = [0,0]

  return function() {
    var plot       = this.plot
    var vbo        = this.vbo
    var shader     = this.tickShader
    var ticks      = this.ticks
    var gl         = plot.gl
    var bounds     = plot._tickBounds
    var dataBox    = plot.dataBox
    var viewBox    = plot.viewBox
    var pixelRatio = plot.pixelRatio
    var screenBox  = plot.screenBox

    var screenWidth  = screenBox[2] - screenBox[0]
    var screenHeight = screenBox[3] - screenBox[1]
    var viewWidth    = viewBox[2]   - viewBox[0]
    var viewHeight   = viewBox[3]   - viewBox[1]

    for(var i=0; i<2; ++i) {
      var lo = bounds[i]
      var hi = bounds[i+2]
      var boundScale = hi - lo
      var dataCenter  = 0.5 * (dataBox[i+2] + dataBox[i])
      var dataWidth   = (dataBox[i+2] - dataBox[i])
      DATA_SCALE[i] = 2.0 * boundScale / dataWidth
      DATA_SHIFT[i] = 2.0 * (lo - dataCenter) / dataWidth
    }

    DATA_SCALE[0] *= viewWidth / screenWidth
    DATA_SHIFT[0] *= viewWidth / screenWidth

    DATA_SCALE[1] *= viewHeight / screenHeight
    DATA_SHIFT[1] *= viewHeight / screenHeight

    shader.bind()
    vbo.bind()

    shader.attributes.dataCoord.pointer()

    var uniforms = shader.uniforms
    uniforms.dataShift = DATA_SHIFT
    uniforms.dataScale = DATA_SCALE

    var tickMarkLength = plot.tickMarkLength
    var tickMarkWidth  = plot.tickMarkWidth
    var tickMarkColor  = plot.tickMarkColor

    var xTicksOffset = 0
    var yTicksOffset = ticks[0].length * 6

    var xStart = Math.min(bsearch.ge(ticks[0], (dataBox[0] - bounds[0]) / (bounds[2] - bounds[0]), compareTickNum), ticks[0].length)
    var xEnd   = Math.min(bsearch.gt(ticks[0], (dataBox[2] - bounds[0]) / (bounds[2] - bounds[0]), compareTickNum), ticks[0].length)
    var xOffset = xTicksOffset + 6 * xStart
    var xCount  = 6 * Math.max(0, xEnd - xStart)

    var yStart = Math.min(bsearch.ge(ticks[1], (dataBox[1] - bounds[1]) / (bounds[3] - bounds[1]), compareTickNum), ticks[1].length)
    var yEnd   = Math.min(bsearch.gt(ticks[1], (dataBox[3] - bounds[1]) / (bounds[3] - bounds[1]), compareTickNum), ticks[1].length)
    var yOffset = yTicksOffset + 6 * yStart
    var yCount  = 6 * Math.max(0, yEnd - yStart)

    SCR_OFFSET[0]         = 2.0 * (viewBox[0] - tickMarkLength[1]) / screenWidth - 1.0
    SCR_OFFSET[1]         = (viewBox[3] + viewBox[1]) / screenHeight - 1.0
    TICK_SCALE[0]         = tickMarkLength[1] * pixelRatio / screenWidth
    TICK_SCALE[1]         = tickMarkWidth[1]  * pixelRatio / screenHeight

    if(yCount) {
      uniforms.color        = tickMarkColor[1]
      uniforms.tickScale    = TICK_SCALE
      uniforms.dataAxis     = Y_AXIS
      uniforms.screenOffset = SCR_OFFSET
      gl.drawArrays(gl.TRIANGLES, yOffset, yCount)
    }

    SCR_OFFSET[0]         = (viewBox[2] + viewBox[0]) / screenWidth - 1.0
    SCR_OFFSET[1]         = 2.0 * (viewBox[1] - tickMarkLength[0]) / screenHeight - 1.0
    TICK_SCALE[0]         = tickMarkWidth[0]  * pixelRatio / screenWidth
    TICK_SCALE[1]         = tickMarkLength[0] * pixelRatio / screenHeight

    if(xCount) {
      uniforms.color        = tickMarkColor[0]
      uniforms.tickScale    = TICK_SCALE
      uniforms.dataAxis     = X_AXIS
      uniforms.screenOffset = SCR_OFFSET
      gl.drawArrays(gl.TRIANGLES, xOffset, xCount)
    }

    SCR_OFFSET[0]         = 2.0 * (viewBox[2] + tickMarkLength[3]) / screenWidth - 1.0
    SCR_OFFSET[1]         = (viewBox[3] + viewBox[1]) / screenHeight - 1.0
    TICK_SCALE[0]         = tickMarkLength[3] * pixelRatio / screenWidth
    TICK_SCALE[1]         = tickMarkWidth[3]  * pixelRatio / screenHeight

    if(yCount) {
      uniforms.color        = tickMarkColor[3]
      uniforms.tickScale    = TICK_SCALE
      uniforms.dataAxis     = Y_AXIS
      uniforms.screenOffset = SCR_OFFSET
      gl.drawArrays(gl.TRIANGLES, yOffset, yCount)
    }

    SCR_OFFSET[0]         = (viewBox[2] + viewBox[0]) / screenWidth - 1.0
    SCR_OFFSET[1]         = 2.0 * (viewBox[3] + tickMarkLength[2]) / screenHeight - 1.0
    TICK_SCALE[0]         = tickMarkWidth[2]  * pixelRatio / screenWidth
    TICK_SCALE[1]         = tickMarkLength[2] * pixelRatio / screenHeight

    if(xCount) {
      uniforms.color        = tickMarkColor[2]
      uniforms.tickScale    = TICK_SCALE
      uniforms.dataAxis     = X_AXIS
      uniforms.screenOffset = SCR_OFFSET
      gl.drawArrays(gl.TRIANGLES, xOffset, xCount)
    }
  }
})()

proto.update = (function() {
  var OFFSET_X = [1,  1, -1, -1,  1, -1]
  var OFFSET_Y = [1, -1,  1,  1, -1, -1]

  return function(options) {
    var ticks  = options.ticks
    var bounds = options.bounds
    var data   = new Float32Array(6 * 3 * (ticks[0].length + ticks[1].length))

    var zeroLineEnable = this.plot.zeroLineEnable

    var ptr    = 0
    var gridTicks = [[], []]
    for(var dim=0; dim<2; ++dim) {
      var localTicks = gridTicks[dim]
      var axisTicks = ticks[dim]
      var lo = bounds[dim]
      var hi = bounds[dim+2]
      for(var i=0; i<axisTicks.length; ++i) {
        var x = (axisTicks[i].x - lo) / (hi - lo)
        localTicks.push(x)
        for(var j=0; j<6; ++j) {
          data[ptr++] = x
          data[ptr++] = OFFSET_X[j]
          data[ptr++] = OFFSET_Y[j]
        }
      }
    }

    this.ticks = gridTicks
    this.vbo.update(data)
  }
})()

proto.dispose = function() {
  this.vbo.dispose()
  this.shader.dispose()
  this.tickShader.dispose()
}

function createGrid(plot) {
  var gl     = plot.gl
  var vbo    = createBuffer(gl)
  var shader = createShader(gl, shaders.gridVert, shaders.gridFrag)
  var tickShader = createShader(gl, shaders.tickVert, shaders.gridFrag)
  var grid   = new Grid(plot, vbo, shader, tickShader)
  return grid
}


/***/ }),

/***/ "./node_modules/gl-plot2d/lib/line.js":
/*!********************************************!*\
  !*** ./node_modules/gl-plot2d/lib/line.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createLines

var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")

var shaders = __webpack_require__(/*! ./shaders */ "./node_modules/gl-plot2d/lib/shaders.js")

function Lines(plot, vbo, shader) {
  this.plot   = plot
  this.vbo    = vbo
  this.shader = shader
}

var proto = Lines.prototype

proto.bind = function() {
  var shader = this.shader
  this.vbo.bind()
  this.shader.bind()
  shader.attributes.coord.pointer()
  shader.uniforms.screenBox = this.plot.screenBox
}

proto.drawLine = (function() {
  var start = [0,0]
  var end   = [0,0]
  return function(startX, startY, endX, endY, width, color) {
    var plot       = this.plot
    var shader     = this.shader
    var gl         = plot.gl

    start[0] = startX
    start[1] = startY
    end[0]   = endX
    end[1]   = endY

    shader.uniforms.start  = start
    shader.uniforms.end    = end
    shader.uniforms.width  = width * plot.pixelRatio
    shader.uniforms.color  = color

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
}())

proto.dispose = function() {
  this.vbo.dispose()
  this.shader.dispose()
}

function createLines(plot) {
  var gl  = plot.gl
  var vbo = createBuffer(gl, [
    -1,-1,
    -1,1,
    1,-1,
    1,1])
  var shader  = createShader(gl, shaders.lineVert, shaders.lineFrag)
  var lines   = new Lines(plot, vbo, shader)
  return lines
}


/***/ }),

/***/ "./node_modules/gl-plot2d/lib/shaders.js":
/*!***********************************************!*\
  !*** ./node_modules/gl-plot2d/lib/shaders.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")

var FRAGMENT = glslify('./shaders/fragment.glsl')

module.exports = {
  lineVert: glslify('./shaders/line-vertex.glsl'),
  lineFrag: FRAGMENT,
  textVert: glslify('./shaders/text-vertex.glsl'),
  textFrag: FRAGMENT,
  gridVert: glslify('./shaders/grid-vertex.glsl'),
  gridFrag: FRAGMENT,
  boxVert:  glslify('./shaders/box-vertex.glsl'),
  tickVert: glslify('./shaders/tick-vertex.glsl')
}


/***/ }),

/***/ "./node_modules/gl-plot2d/lib/text.js":
/*!********************************************!*\
  !*** ./node_modules/gl-plot2d/lib/text.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createTextElements

var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")
var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var getText      = __webpack_require__(/*! text-cache */ "./node_modules/text-cache/textcache.js")
var bsearch      = __webpack_require__(/*! binary-search-bounds */ "./node_modules/binary-search-bounds/search-bounds.js")
var shaders      = __webpack_require__(/*! ./shaders */ "./node_modules/gl-plot2d/lib/shaders.js")

function TextElements(plot, vbo, shader) {
  this.plot         = plot
  this.vbo          = vbo
  this.shader       = shader
  this.tickOffset   = [[],[]]
  this.tickX        = [[],[]]
  this.labelOffset  = [0,0]
  this.labelCount   = [0,0]
}

var proto = TextElements.prototype

proto.drawTicks = (function() {
  var DATA_AXIS = [0,0]
  var SCREEN_OFFSET = [0,0]
  var ZERO_2 = [0,0]

  return function(axis) {
    var plot        = this.plot
    var shader      = this.shader
    var tickX       = this.tickX[axis]
    var tickOffset  = this.tickOffset[axis]
    var gl          = plot.gl
    var viewBox     = plot.viewBox
    var dataBox     = plot.dataBox
    var screenBox   = plot.screenBox
    var pixelRatio  = plot.pixelRatio
    var tickEnable  = plot.tickEnable
    var tickPad     = plot.tickPad
    var textColor   = plot.tickColor
    var textAngle   = plot.tickAngle
    // todo check if this should be used (now unused)
    // var tickLength  = plot.tickMarkLength

    var labelEnable = plot.labelEnable
    var labelPad    = plot.labelPad
    var labelColor  = plot.labelColor
    var labelAngle  = plot.labelAngle
    var labelOffset = this.labelOffset[axis]
    var labelCount  = this.labelCount[axis]

    var start = bsearch.lt(tickX, dataBox[axis])
    var end   = bsearch.le(tickX, dataBox[axis+2])

    DATA_AXIS[0]    = DATA_AXIS[1] = 0
    DATA_AXIS[axis] = 1

    SCREEN_OFFSET[axis] = (viewBox[2+axis] + viewBox[axis]) / (screenBox[2+axis] - screenBox[axis]) - 1.0

    var screenScale = 2.0 / screenBox[2+(axis^1)] - screenBox[axis^1]

    SCREEN_OFFSET[axis^1] = screenScale * viewBox[axis^1] - 1.0
    if(tickEnable[axis]) {
      SCREEN_OFFSET[axis^1] -= screenScale * pixelRatio * tickPad[axis]
      if(start < end && tickOffset[end] > tickOffset[start]) {
        shader.uniforms.dataAxis     = DATA_AXIS
        shader.uniforms.screenOffset = SCREEN_OFFSET
        shader.uniforms.color        = textColor[axis]
        shader.uniforms.angle        = textAngle[axis]
        gl.drawArrays(
          gl.TRIANGLES,
          tickOffset[start],
          tickOffset[end] - tickOffset[start])
      }
    }
    if(labelEnable[axis] && labelCount) {
      SCREEN_OFFSET[axis^1] -= screenScale * pixelRatio * labelPad[axis]
      shader.uniforms.dataAxis     = ZERO_2
      shader.uniforms.screenOffset = SCREEN_OFFSET
      shader.uniforms.color        = labelColor[axis]
      shader.uniforms.angle        = labelAngle[axis]
      gl.drawArrays(
        gl.TRIANGLES,
        labelOffset,
        labelCount)
    }

    SCREEN_OFFSET[axis^1] = screenScale * viewBox[2+(axis^1)] - 1.0
    if(tickEnable[axis+2]) {
      SCREEN_OFFSET[axis^1] += screenScale * pixelRatio * tickPad[axis+2]
      if(start < end && tickOffset[end] > tickOffset[start]) {
        shader.uniforms.dataAxis     = DATA_AXIS
        shader.uniforms.screenOffset = SCREEN_OFFSET
        shader.uniforms.color        = textColor[axis+2]
        shader.uniforms.angle        = textAngle[axis+2]
        gl.drawArrays(
          gl.TRIANGLES,
          tickOffset[start],
          tickOffset[end] - tickOffset[start])
      }
    }
    if(labelEnable[axis+2] && labelCount) {
      SCREEN_OFFSET[axis^1] += screenScale * pixelRatio * labelPad[axis+2]
      shader.uniforms.dataAxis     = ZERO_2
      shader.uniforms.screenOffset = SCREEN_OFFSET
      shader.uniforms.color        = labelColor[axis+2]
      shader.uniforms.angle        = labelAngle[axis+2]
      gl.drawArrays(
        gl.TRIANGLES,
        labelOffset,
        labelCount)
    }

  }
})()

proto.drawTitle = (function() {
  var DATA_AXIS = [0,0]
  var SCREEN_OFFSET = [0,0]

  return function() {
    var plot        = this.plot
    var shader      = this.shader
    var gl          = plot.gl
    var screenBox   = plot.screenBox
    var titleCenter = plot.titleCenter
    var titleAngle  = plot.titleAngle
    var titleColor  = plot.titleColor
    var pixelRatio  = plot.pixelRatio

    if(!this.titleCount) {
      return
    }

    for(var i=0; i<2; ++i) {
      SCREEN_OFFSET[i] = 2.0 * (titleCenter[i]*pixelRatio - screenBox[i]) /
        (screenBox[2+i] - screenBox[i]) - 1
    }

    shader.bind()
    shader.uniforms.dataAxis      = DATA_AXIS
    shader.uniforms.screenOffset  = SCREEN_OFFSET
    shader.uniforms.angle         = titleAngle
    shader.uniforms.color         = titleColor

    gl.drawArrays(gl.TRIANGLES, this.titleOffset, this.titleCount)
  }
})()

proto.bind = (function() {
  var DATA_SHIFT = [0,0]
  var DATA_SCALE = [0,0]
  var TEXT_SCALE = [0,0]

  return function() {
    var plot      = this.plot
    var shader    = this.shader
    var bounds    = plot._tickBounds
    var dataBox   = plot.dataBox
    var screenBox = plot.screenBox
    var viewBox   = plot.viewBox

    shader.bind()

    //Set up coordinate scaling uniforms
    for(var i=0; i<2; ++i) {

      var lo = bounds[i]
      var hi = bounds[i+2]
      var boundScale = hi - lo
      var dataCenter  = 0.5 * (dataBox[i+2] + dataBox[i])
      var dataWidth   = (dataBox[i+2] - dataBox[i])

      var viewLo = viewBox[i]
      var viewHi = viewBox[i+2]
      var viewScale = viewHi - viewLo
      var screenLo = screenBox[i]
      var screenHi = screenBox[i+2]
      var screenScale = screenHi - screenLo

      DATA_SCALE[i] = 2.0 * boundScale / dataWidth * viewScale / screenScale
      DATA_SHIFT[i] = 2.0 * (lo - dataCenter) / dataWidth * viewScale / screenScale
    }

    TEXT_SCALE[1] = 2.0 * plot.pixelRatio / (screenBox[3] - screenBox[1])
    TEXT_SCALE[0] = TEXT_SCALE[1] * (screenBox[3] - screenBox[1]) / (screenBox[2] - screenBox[0])

    shader.uniforms.dataScale = DATA_SCALE
    shader.uniforms.dataShift = DATA_SHIFT
    shader.uniforms.textScale = TEXT_SCALE

    //Set attributes
    this.vbo.bind()
    shader.attributes.textCoordinate.pointer()
  }
})()

proto.update = function(options) {
  var vertices  = []
  var axesTicks = options.ticks
  var bounds    = options.bounds
  var i, j, k, data, scale, dimension

  for(dimension=0; dimension<2; ++dimension) {
    var offsets = [Math.floor(vertices.length/3)], tickX = [-Infinity]

    //Copy vertices over to buffer
    var ticks = axesTicks[dimension]
    for(i=0; i<ticks.length; ++i) {
      var tick  = ticks[i]
      var x     = tick.x
      var text  = tick.text
      var font  = tick.font || 'sans-serif'
      scale = (tick.fontSize || 12)

      var coordScale = 1.0 / (bounds[dimension+2] - bounds[dimension])
      var coordShift = bounds[dimension]

      var rows = text.split('\n')
      for(var r = 0; r < rows.length; r++) {
        data = getText(font, rows[r]).data
        for (j = 0; j < data.length; j += 2) {
          vertices.push(
              data[j] * scale,
              -data[j + 1] * scale - r * scale * 1.2,
              (x - coordShift) * coordScale)
        }
      }

      offsets.push(Math.floor(vertices.length/3))
      tickX.push(x)
    }

    this.tickOffset[dimension] = offsets
    this.tickX[dimension] = tickX
  }

  //Add labels
  for(dimension=0; dimension<2; ++dimension) {
    this.labelOffset[dimension] = Math.floor(vertices.length/3)

    data  = getText(options.labelFont[dimension], options.labels[dimension], { textAlign: 'center' }).data
    scale = options.labelSize[dimension]
    for(i=0; i<data.length; i+=2) {
      vertices.push(data[i]*scale, -data[i+1]*scale, 0)
    }

    this.labelCount[dimension] =
      Math.floor(vertices.length/3) - this.labelOffset[dimension]
  }

  //Add title
  this.titleOffset = Math.floor(vertices.length/3)
  data = getText(options.titleFont, options.title).data
  scale = options.titleSize
  for(i=0; i<data.length; i+=2) {
    vertices.push(data[i]*scale, -data[i+1]*scale, 0)
  }
  this.titleCount = Math.floor(vertices.length/3) - this.titleOffset

  //Upload new vertices
  this.vbo.update(vertices)
}

proto.dispose = function() {
  this.vbo.dispose()
  this.shader.dispose()
}

function createTextElements(plot) {
  var gl = plot.gl
  var vbo = createBuffer(gl)
  var shader = createShader(gl, shaders.textVert, shaders.textFrag)
  var text = new TextElements(plot, vbo, shader)
  return text
}


/***/ }),

/***/ "./node_modules/gl-plot2d/plot.js":
/*!****************************************!*\
  !*** ./node_modules/gl-plot2d/plot.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = createGLPlot2D

var createPick = __webpack_require__(/*! gl-select-static */ "./node_modules/gl-select-static/select.js")

var createGrid = __webpack_require__(/*! ./lib/grid */ "./node_modules/gl-plot2d/lib/grid.js")
var createText = __webpack_require__(/*! ./lib/text */ "./node_modules/gl-plot2d/lib/text.js")
var createLine = __webpack_require__(/*! ./lib/line */ "./node_modules/gl-plot2d/lib/line.js")
var createBox  = __webpack_require__(/*! ./lib/box */ "./node_modules/gl-plot2d/lib/box.js")

function GLPlot2D(gl, pickBuffer) {
  this.gl               = gl
  this.pickBuffer       = pickBuffer

  this.screenBox        = [0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight]
  this.viewBox          = [0, 0, 0, 0]
  this.dataBox          = [-10, -10, 10, 10]

  this.gridLineEnable   = [true,true]
  this.gridLineWidth    = [1,1]
  this.gridLineColor    = [[0,0,0,1],
                           [0,0,0,1]]

  this.pixelRatio       = 1

  this.tickMarkLength   = [0,0,0,0]
  this.tickMarkWidth    = [0,0,0,0]
  this.tickMarkColor    = [[0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1]]

  this.tickPad          = [15,15,15,15]
  this.tickAngle        = [0,0,0,0]
  this.tickEnable       = [true,true,true,true]
  this.tickColor        = [[0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1]]

  this.labelPad         = [15,15,15,15]
  this.labelAngle       = [0,Math.PI/2,0,3.0*Math.PI/2]
  this.labelEnable      = [true,true,true,true]
  this.labelColor       = [[0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1]]

  this.titleCenter      = [0,0]
  this.titleEnable      = true
  this.titleAngle       = 0
  this.titleColor       = [0,0,0,1]

  this.borderColor      = [0,0,0,0]
  this.backgroundColor  = [0,0,0,0]

  this.zeroLineEnable   = [true, true]
  this.zeroLineWidth    = [4, 4]
  this.zeroLineColor    = [[0, 0, 0, 1],[0, 0, 0, 1]]

  this.borderLineEnable = [true,true,true,true]
  this.borderLineWidth  = [2,2,2,2]
  this.borderLineColor  = [[0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1]]

  //Drawing parameters
  this.grid             = null
  this.text             = null
  this.line             = null
  this.box              = null
  this.objects          = []
  this.overlays         = []

  this._tickBounds      = [Infinity, Infinity, -Infinity, -Infinity]

  this.static = false

  this.dirty        = false
  this.pickDirty    = false
  this.pickDelay    = 120
  this.pickRadius   = 10
  this._pickTimeout = null
  this._drawPick    = this.drawPick.bind(this)

  this._depthCounter = 0
}

var proto = GLPlot2D.prototype

proto.setDirty = function() {
  this.dirty = this.pickDirty = true
}

proto.setOverlayDirty = function() {
  this.dirty = true
}

proto.nextDepthValue = function() {
  return (this._depthCounter++) / 65536.0
}

function lerp(a, b, t) {
  var s = 0.5 * (t + 1.0)
  return Math.floor((1.0-s)*a + s*b)|0
}

proto.draw = (function() {
var TICK_MARK_BOX = [0,0,0,0]
return function() {
  var gl         = this.gl
  var screenBox  = this.screenBox
  var viewPixels = this.viewBox
  var dataBox    = this.dataBox
  var pixelRatio = this.pixelRatio
  var grid       = this.grid
  var line       = this.line
  var text       = this.text
  var objects    = this.objects

  this._depthCounter = 0

  if(this.pickDirty) {
    if(this._pickTimeout) {
      clearTimeout(this._pickTimeout)
    }
    this.pickDirty = false
    this._pickTimeout = setTimeout(this._drawPick, this.pickDelay)
  }

  if(!this.dirty) {
    return
  }
  this.dirty = false

  gl.bindFramebuffer(gl.FRAMEBUFFER, null)

  //Turn on scissor
  gl.enable(gl.SCISSOR_TEST)

  //Turn off depth buffer
  gl.disable(gl.DEPTH_TEST)
  gl.depthFunc(gl.LESS)
  gl.depthMask(false)

  //Configure premultiplied alpha blending
  gl.enable(gl.BLEND)
  gl.blendEquation(gl.FUNC_ADD, gl.FUNC_ADD);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  //Draw border
  if (this.borderColor) {
    gl.scissor(
      screenBox[0],
      screenBox[1],
      screenBox[2]-screenBox[0],
      screenBox[3]-screenBox[1])
    var borderColor = this.borderColor
    gl.clearColor(
      borderColor[0]*borderColor[3],
      borderColor[1]*borderColor[3],
      borderColor[2]*borderColor[3],
      borderColor[3])
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
  }

  //Draw center pane
  gl.scissor(
    viewPixels[0],
    viewPixels[1],
    viewPixels[2]-viewPixels[0],
    viewPixels[3]-viewPixels[1])
  gl.viewport(
    viewPixels[0],
    viewPixels[1],
    viewPixels[2]-viewPixels[0],
    viewPixels[3]-viewPixels[1])
  var backgroundColor = this.backgroundColor
  gl.clearColor(
    backgroundColor[0]*backgroundColor[3],
    backgroundColor[1]*backgroundColor[3],
    backgroundColor[2]*backgroundColor[3],
    backgroundColor[3])
  gl.clear(gl.COLOR_BUFFER_BIT)

  //Draw grid
  grid.draw()

  //Draw zero lines separately
  var zeroLineEnable = this.zeroLineEnable
  var zeroLineColor  = this.zeroLineColor
  var zeroLineWidth  = this.zeroLineWidth
  if(zeroLineEnable[0] || zeroLineEnable[1]) {
    line.bind()
    for(var i=0; i<2; ++i) {
      if(!zeroLineEnable[i] ||
        !(dataBox[i] <= 0 && dataBox[i+2] >= 0)) {
        continue
      }

      var zeroIntercept = screenBox[i] -
        dataBox[i] * (screenBox[i+2] - screenBox[i]) / (dataBox[i+2] - dataBox[i])

      if(i === 0) {
        line.drawLine(
          zeroIntercept, screenBox[1], zeroIntercept, screenBox[3],
          zeroLineWidth[i],
          zeroLineColor[i])
      } else {
        line.drawLine(
          screenBox[0], zeroIntercept, screenBox[2], zeroIntercept,
          zeroLineWidth[i],
          zeroLineColor[i])
      }
    }
  }

  //Draw traces
  for(var i=0; i<objects.length; ++i) {
    objects[i].draw()
  }

  //Return viewport to default
  gl.viewport(
    screenBox[0],
    screenBox[1],
    screenBox[2]-screenBox[0],
    screenBox[3]-screenBox[1])
  gl.scissor(
    screenBox[0],
    screenBox[1],
    screenBox[2]-screenBox[0],
    screenBox[3]-screenBox[1])

  //Draw tick marks
  this.grid.drawTickMarks()

  //Draw line elements
  line.bind()

  //Draw border lines
  var borderLineEnable = this.borderLineEnable
  var borderLineWidth  = this.borderLineWidth
  var borderLineColor  = this.borderLineColor
  if(borderLineEnable[1]) {
    line.drawLine(
      viewPixels[0], viewPixels[1] - 0.5*borderLineWidth[1]*pixelRatio,
      viewPixels[0], viewPixels[3] + 0.5*borderLineWidth[3]*pixelRatio,
      borderLineWidth[1], borderLineColor[1])
  }
  if(borderLineEnable[0]) {
    line.drawLine(
      viewPixels[0] - 0.5*borderLineWidth[0]*pixelRatio, viewPixels[1],
      viewPixels[2] + 0.5*borderLineWidth[2]*pixelRatio, viewPixels[1],
      borderLineWidth[0], borderLineColor[0])
  }
  if(borderLineEnable[3]) {
    line.drawLine(
      viewPixels[2], viewPixels[1] - 0.5*borderLineWidth[1]*pixelRatio,
      viewPixels[2], viewPixels[3] + 0.5*borderLineWidth[3]*pixelRatio,
      borderLineWidth[3], borderLineColor[3])
  }
  if(borderLineEnable[2]) {
    line.drawLine(
      viewPixels[0] - 0.5*borderLineWidth[0]*pixelRatio, viewPixels[3],
      viewPixels[2] + 0.5*borderLineWidth[2]*pixelRatio, viewPixels[3],
      borderLineWidth[2], borderLineColor[2])
  }

  //Draw text elements
  text.bind()
  for(var i=0; i<2; ++i) {
    text.drawTicks(i)
  }
  if(this.titleEnable) {
    text.drawTitle()
  }

  //Draw other overlay elements (select boxes, etc.)
  var overlays = this.overlays
  for(var i=0; i<overlays.length; ++i) {
    overlays[i].draw()
  }

  //Turn off scissor test
  gl.disable(gl.SCISSOR_TEST)
  gl.disable(gl.BLEND)
  gl.depthMask(true)
}
})()

proto.drawPick = (function() {

return function() {
  if (this.static) return;

  var pickBuffer = this.pickBuffer
  var gl = this.gl

  this._pickTimeout = null
  pickBuffer.begin()

  var pickOffset = 1
  var objects = this.objects
  for(var i=0; i<objects.length; ++i) {
    pickOffset = objects[i].drawPick(pickOffset)
  }

  pickBuffer.end()
}
})()

proto.pick = (function() {
return function(x, y) {
  if (this.static) return;

  var pixelRatio     = this.pixelRatio
  var pickPixelRatio = this.pickPixelRatio
  var viewBox        = this.viewBox

  var scrX = Math.round((x - viewBox[0] / pixelRatio) * pickPixelRatio)|0
  var scrY = Math.round((y - viewBox[1] / pixelRatio) * pickPixelRatio)|0

  var pickResult = this.pickBuffer.query(scrX, scrY, this.pickRadius)
  if(!pickResult) {
    return null
  }

  var pickValue = pickResult.id +
    (pickResult.value[0]<<8)  +
    (pickResult.value[1]<<16) +
    (pickResult.value[2]<<24)

  var objects = this.objects
  for(var i=0; i<objects.length; ++i) {
    var result = objects[i].pick(scrX, scrY, pickValue)
    if(result) {
      return result
    }
  }

  return null
}
})()

function deepClone(array) {
  var result = array.slice()
  for(var i=0; i<result.length; ++i) {
    result[i] = result[i].slice()
  }
  return result
}

function compareTicks(a, b) {
  return a.x - b.x
}

proto.setScreenBox = function(nbox) {
  var screenBox = this.screenBox
  var pixelRatio = this.pixelRatio

  screenBox[0] = Math.round(nbox[0] * pixelRatio) | 0
  screenBox[1] = Math.round(nbox[1] * pixelRatio) | 0
  screenBox[2] = Math.round(nbox[2] * pixelRatio) | 0
  screenBox[3] = Math.round(nbox[3] * pixelRatio) | 0

  this.setDirty()
}

proto.setDataBox = function(nbox) {
  var dataBox = this.dataBox

  var different =
    dataBox[0] !== nbox[0] ||
    dataBox[1] !== nbox[1] ||
    dataBox[2] !== nbox[2] ||
    dataBox[3] !== nbox[3]

  if(different) {
    dataBox[0] = nbox[0]
    dataBox[1] = nbox[1]
    dataBox[2] = nbox[2]
    dataBox[3] = nbox[3]

    this.setDirty()
  }
}

proto.setViewBox = function(nbox) {
  var pixelRatio = this.pixelRatio
  var viewBox = this.viewBox

  viewBox[0] = Math.round(nbox[0] * pixelRatio)|0
  viewBox[1] = Math.round(nbox[1] * pixelRatio)|0
  viewBox[2] = Math.round(nbox[2] * pixelRatio)|0
  viewBox[3] = Math.round(nbox[3] * pixelRatio)|0

  var pickPixelRatio = this.pickPixelRatio
  this.pickBuffer.shape = [
    Math.round((nbox[2] - nbox[0]) * pickPixelRatio)|0,
    Math.round((nbox[3] - nbox[1]) * pickPixelRatio)|0 ]

  this.setDirty()
}

proto.update = function(options) {
  options = options || {}

  var gl = this.gl

  this.pixelRatio      = options.pixelRatio || 1

  var pixelRatio       = this.pixelRatio
  this.pickPixelRatio  = Math.max(pixelRatio, 1)

  this.setScreenBox(options.screenBox ||
    [0, 0, gl.drawingBufferWidth/pixelRatio, gl.drawingBufferHeight/pixelRatio])

  var screenBox = this.screenBox
  this.setViewBox(options.viewBox ||
    [0.125*(this.screenBox[2]-this.screenBox[0])/pixelRatio,
     0.125*(this.screenBox[3]-this.screenBox[1])/pixelRatio,
     0.875*(this.screenBox[2]-this.screenBox[0])/pixelRatio,
     0.875*(this.screenBox[3]-this.screenBox[1])/pixelRatio])

  var viewBox = this.viewBox
  var aspectRatio = (viewBox[2] - viewBox[0]) / (viewBox[3] - viewBox[1])
  this.setDataBox(options.dataBox || [-10, -10/aspectRatio, 10, 10/aspectRatio])

  this.borderColor     = options.borderColor !== false ? (options.borderColor || [0,0,0,0]).slice() : false
  this.backgroundColor = (options.backgroundColor || [0,0,0,0]).slice()

  this.gridLineEnable  = (options.gridLineEnable || [true,true]).slice()
  this.gridLineWidth   = (options.gridLineWidth || [1,1]).slice()
  this.gridLineColor   = deepClone(options.gridLineColor ||
    [[0.5,0.5,0.5,1],[0.5,0.5,0.5,1]])

  this.zeroLineEnable   = (options.zeroLineEnable || [true, true]).slice()
  this.zeroLineWidth    = (options.zeroLineWidth || [4, 4]).slice()
  this.zeroLineColor    = deepClone(options.zeroLineColor ||
    [[0, 0, 0, 1],[0, 0, 0, 1]])

  this.tickMarkLength   = (options.tickMarkLength || [0,0,0,0]).slice()
  this.tickMarkWidth    = (options.tickMarkWidth || [0,0,0,0]).slice()
  this.tickMarkColor    = deepClone(options.tickMarkColor ||
    [[0,0,0,1],[0,0,0,1],[0,0,0,1],[0,0,0,1]])

  this.titleCenter      = (options.titleCenter || [
    0.5*(viewBox[0]+viewBox[2])/pixelRatio,(viewBox[3]+120)/pixelRatio]).slice()
  this.titleEnable      = !('titleEnable' in options) || !!options.titleEnable
  this.titleAngle       = options.titleAngle || 0
  this.titleColor       = (options.titleColor || [0,0,0,1]).slice()

  this.labelPad         = (options.labelPad || [15,15,15,15]).slice()
  this.labelAngle       = (options.labelAngle ||
    [0,Math.PI/2,0,3.0*Math.PI/2]).slice()
  this.labelEnable      = (options.labelEnable || [true,true,true,true]).slice()
  this.labelColor       = deepClone(options.labelColor ||
    [[0,0,0,1],[0,0,0,1],[0,0,0,1],[0,0,0,1]])

  this.tickPad         = (options.tickPad || [15,15,15,15]).slice()
  this.tickAngle       = (options.tickAngle || [0,0,0,0]).slice()
  this.tickEnable      = (options.tickEnable || [true,true,true,true]).slice()
  this.tickColor       = deepClone(options.tickColor ||
    [[0,0,0,1],[0,0,0,1],[0,0,0,1],[0,0,0,1]])

  this.borderLineEnable = (options.borderLineEnable ||
                            [true,true,true,true]).slice()
  this.borderLineWidth  = (options.borderLineWidth || [2,2,2,2]).slice()
  this.borderLineColor  = deepClone(options.borderLineColor ||
                          [[0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1],
                           [0,0,0,1]])

  var ticks = options.ticks || [ [], [] ]

  //Compute bounds on ticks
  var bounds = this._tickBounds
  bounds[0] = bounds[1] =  Infinity
  bounds[2] = bounds[3] = -Infinity
  for(var i=0; i<2; ++i) {
    var axisTicks = ticks[i].slice(0)
    if(axisTicks.length === 0) {
      continue
    }
    axisTicks.sort(compareTicks)
    bounds[i]   = Math.min(bounds[i], axisTicks[0].x)
    bounds[i+2] = Math.max(bounds[i+2], axisTicks[axisTicks.length-1].x)
  }

  //Update grid
  this.grid.update({
    bounds: bounds,
    ticks:  ticks
  })

  //Update text
  this.text.update({
    bounds:     bounds,
    ticks:      ticks,
    labels:     options.labels    || ['x', 'y'],
    labelSize:  options.labelSize || [12,12],
    labelFont:  options.labelFont || ['sans-serif', 'sans-serif'],
    title:      options.title     || '',
    titleSize:  options.titleSize || 18,
    titleFont:  options.titleFont || 'sans-serif'
  })

  this.static = !!options.static;

  this.setDirty()
}

proto.dispose = function() {
  this.box.dispose()
  this.grid.dispose()
  this.text.dispose()
  this.line.dispose()
  for(var i=this.objects.length-1; i>=0; --i) {
    this.objects[i].dispose()
  }
  this.objects.length = 0
  for(var i=this.overlays.length-1; i>=0; --i) {
    this.overlays[i].dispose()
  }
  this.overlays.length = 0

  this.gl = null
}

proto.addObject = function(object) {
  if(this.objects.indexOf(object) < 0) {
    this.objects.push(object)
    this.setDirty()
  }
}

proto.removeObject = function(object) {
  var objects = this.objects
  for(var i=0; i<objects.length; ++i) {
    if(objects[i] === object) {
      objects.splice(i,1)
      this.setDirty()
      break
    }
  }
}

proto.addOverlay = function(object) {
  if(this.overlays.indexOf(object) < 0) {
    this.overlays.push(object)
    this.setOverlayDirty()
  }
}

proto.removeOverlay = function(object) {
  var objects = this.overlays
  for(var i=0; i<objects.length; ++i) {
    if(objects[i] === object) {
      objects.splice(i,1)
      this.setOverlayDirty()
      break
    }
  }
}

function createGLPlot2D(options) {
  var gl = options.gl
  var pickBuffer = createPick(gl, [
    gl.drawingBufferWidth, gl.drawingBufferHeight])
  var plot = new GLPlot2D(gl, pickBuffer)
  plot.grid = createGrid(plot)
  plot.text = createText(plot)
  plot.line = createLine(plot)
  plot.box  = createBox(plot)
  plot.update(options)
  return plot
}


/***/ }),

/***/ "./node_modules/gl-select-box/lib/shaders.js":
/*!***************************************************!*\
  !*** ./node_modules/gl-select-box/lib/shaders.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var glslify = __webpack_require__(/*! glslify */ "./node_modules/glslify/browser.js")

exports.boxVertex = glslify('./shaders/box-vertex.glsl')
exports.boxFragment = glslify('./shaders/box-fragment.glsl')


/***/ }),

/***/ "./node_modules/gl-select-box/selectbox.js":
/*!*************************************************!*\
  !*** ./node_modules/gl-select-box/selectbox.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createShader = __webpack_require__(/*! gl-shader */ "./node_modules/gl-shader/index.js")
var createBuffer = __webpack_require__(/*! gl-buffer */ "./node_modules/gl-buffer/buffer.js")

var SHADERS = __webpack_require__(/*! ./lib/shaders */ "./node_modules/gl-select-box/lib/shaders.js")

module.exports = createSelectBox

function SelectBox(plot, boxBuffer, boxShader) {
  this.plot = plot
  this.boxBuffer = boxBuffer
  this.boxShader = boxShader

  this.enabled = true

  this.selectBox = [Infinity,Infinity,-Infinity,-Infinity]

  this.borderColor = [0,0,0,1]
  this.innerFill   = false
  this.innerColor  = [0,0,0,0.25]
  this.outerFill   = true
  this.outerColor  = [0,0,0,0.5]
  this.borderWidth = 10
}

var proto = SelectBox.prototype

proto.draw = function() {
  if(!this.enabled) {
    return
  }

  var plot         = this.plot
  var selectBox    = this.selectBox
  var lineWidth    = this.borderWidth

  var innerFill    = this.innerFill
  var innerColor   = this.innerColor
  var outerFill    = this.outerFill
  var outerColor   = this.outerColor
  var borderColor  = this.borderColor

  var boxes        = plot.box
  var screenBox    = plot.screenBox
  var dataBox      = plot.dataBox
  var viewBox      = plot.viewBox
  var pixelRatio   = plot.pixelRatio

  //Map select box into pixel coordinates
  var loX = (selectBox[0]-dataBox[0])*(viewBox[2]-viewBox[0])/(dataBox[2]-dataBox[0])+viewBox[0]
  var loY = (selectBox[1]-dataBox[1])*(viewBox[3]-viewBox[1])/(dataBox[3]-dataBox[1])+viewBox[1]
  var hiX = (selectBox[2]-dataBox[0])*(viewBox[2]-viewBox[0])/(dataBox[2]-dataBox[0])+viewBox[0]
  var hiY = (selectBox[3]-dataBox[1])*(viewBox[3]-viewBox[1])/(dataBox[3]-dataBox[1])+viewBox[1]

  loX = Math.max(loX, viewBox[0])
  loY = Math.max(loY, viewBox[1])
  hiX = Math.min(hiX, viewBox[2])
  hiY = Math.min(hiY, viewBox[3])

  if(hiX < loX || hiY < loY) {
    return
  }

  boxes.bind()

  //Draw box
  var screenWidth  = screenBox[2] - screenBox[0]
  var screenHeight = screenBox[3] - screenBox[1]

  if(this.outerFill) {
    boxes.drawBox(0, 0, screenWidth, loY, outerColor)
    boxes.drawBox(0, loY, loX, hiY, outerColor)
    boxes.drawBox(0, hiY, screenWidth, screenHeight, outerColor)
    boxes.drawBox(hiX, loY, screenWidth, hiY, outerColor)
  }

  if(this.innerFill) {
    boxes.drawBox(loX, loY, hiX, hiY, innerColor)
  }

  //Draw border
  if(lineWidth > 0) {

    //Draw border
    var w = lineWidth * pixelRatio
    boxes.drawBox(loX-w, loY-w, hiX+w, loY+w, borderColor)
    boxes.drawBox(loX-w, hiY-w, hiX+w, hiY+w, borderColor)
    boxes.drawBox(loX-w, loY-w, loX+w, hiY+w, borderColor)
    boxes.drawBox(hiX-w, loY-w, hiX+w, hiY+w, borderColor)
  }
}

proto.update = function(options) {
  options = options || {}

  this.innerFill    = !!options.innerFill
  this.outerFill    = !!options.outerFill
  this.innerColor   = (options.innerColor   || [0,0,0,0.5]).slice()
  this.outerColor   = (options.outerColor   || [0,0,0,0.5]).slice()
  this.borderColor  = (options.borderColor || [0,0,0,1]).slice()
  this.borderWidth  = options.borderWidth || 0
  this.selectBox    = (options.selectBox || this.selectBox).slice()
}

proto.dispose = function() {
  this.boxBuffer.dispose()
  this.boxShader.dispose()
  this.plot.removeOverlay(this)
}

function createSelectBox(plot, options) {
  var gl = plot.gl
  var buffer = createBuffer(gl, [
    0, 0,
    0, 1,
    1, 0,
    1, 1 ])
  var shader = createShader(gl, SHADERS.boxVertex, SHADERS.boxFragment)
  var selectBox = new SelectBox(plot, buffer, shader)
  selectBox.update(options)
  plot.addOverlay(selectBox)
  return selectBox
}


/***/ }),

/***/ "./node_modules/gl-spikes2d/spikes.js":
/*!********************************************!*\
  !*** ./node_modules/gl-spikes2d/spikes.js ***!
  \********************************************/
/***/ ((module) => {

"use strict";


module.exports = createSpikes2D

function GLSpikes2D(plot) {
  this.plot = plot
  this.enable = [true, true, false, false]
  this.width  = [1, 1, 1, 1]
  this.color  = [[0,0,0,1],
                 [0,0,0,1],
                 [0,0,0,1],
                 [0,0,0,1]]
  this.center = [Infinity, Infinity]
}

var proto = GLSpikes2D.prototype

proto.update = function(options) {
  options = options || {}
  this.enable = (options.enable || [true,true,false,false]).slice()
  this.width  = (options.width || [1,1,1,1]).slice()
  this.color  = (options.color || [
                  [0,0,0,1],
                  [0,0,0,1],
                  [0,0,0,1],
                  [0,0,0,1]]).map(function(x) { return x.slice() })
  this.center = (options.center || [Infinity,Infinity]).slice()
  this.plot.setOverlayDirty()
}

proto.draw = function() {
  var spikeEnable = this.enable
  var spikeWidth  = this.width
  var spikeColor  = this.color
  var spikeCenter = this.center
  var plot        = this.plot
  var line        = plot.line

  var dataBox     = plot.dataBox
  var viewPixels  = plot.viewBox

  line.bind()

  if(dataBox[0] <= spikeCenter[0] && spikeCenter[0] <= dataBox[2] &&
     dataBox[1] <= spikeCenter[1] && spikeCenter[1] <= dataBox[3]) {

    var centerX = viewPixels[0] + (spikeCenter[0] - dataBox[0]) / (dataBox[2] - dataBox[0]) * (viewPixels[2] - viewPixels[0])
    var centerY = viewPixels[1] + (spikeCenter[1] - dataBox[1]) / (dataBox[3] - dataBox[1]) * (viewPixels[3] - viewPixels[1])

    if(spikeEnable[0]) {
     line.drawLine(
       centerX, centerY,
       viewPixels[0], centerY,
       spikeWidth[0], spikeColor[0])
    }
    if(spikeEnable[1]) {
     line.drawLine(
       centerX, centerY,
       centerX, viewPixels[1],
       spikeWidth[1], spikeColor[1])
    }
    if(spikeEnable[2]) {
      line.drawLine(
        centerX, centerY,
        viewPixels[2], centerY,
        spikeWidth[2], spikeColor[2])
    }
    if(spikeEnable[3]) {
      line.drawLine(
        centerX, centerY,
        centerX, viewPixels[3],
        spikeWidth[3], spikeColor[3])
    }
  }
}

proto.dispose = function() {
  this.plot.removeOverlay(this)
}

function createSpikes2D(plot, options) {
  var spikes = new GLSpikes2D(plot)
  spikes.update(options)
  plot.addOverlay(spikes)
  return spikes
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl2d/camera.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl2d/camera.js ***!
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




var mouseChange = __webpack_require__(/*! mouse-change */ "./node_modules/mouse-change/mouse-listen.js");
var mouseWheel = __webpack_require__(/*! mouse-wheel */ "./node_modules/mouse-wheel/wheel.js");
var mouseOffset = __webpack_require__(/*! mouse-event-offset */ "./node_modules/mouse-event-offset/index.js");
var cartesianConstants = __webpack_require__(/*! ../cartesian/constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js");
var hasPassive = __webpack_require__(/*! has-passive-events */ "./node_modules/has-passive-events/index.js");

module.exports = createCamera;

function Camera2D(element, plot) {
    this.element = element;
    this.plot = plot;
    this.mouseListener = null;
    this.wheelListener = null;
    this.lastInputTime = Date.now();
    this.lastPos = [0, 0];
    this.boxEnabled = false;
    this.boxInited = false;
    this.boxStart = [0, 0];
    this.boxEnd = [0, 0];
    this.dragStart = [0, 0];
}


function createCamera(scene) {
    var element = scene.mouseContainer;
    var plot = scene.glplot;
    var result = new Camera2D(element, plot);

    function unSetAutoRange() {
        scene.xaxis.autorange = false;
        scene.yaxis.autorange = false;
    }

    function getSubplotConstraint() {
        // note: this assumes we only have one x and one y axis on this subplot
        // when this constraint is lifted this block won't make sense
        var constraints = scene.graphDiv._fullLayout._axisConstraintGroups;
        var xaId = scene.xaxis._id;
        var yaId = scene.yaxis._id;
        for(var i = 0; i < constraints.length; i++) {
            if(constraints[i][xaId] !== -1) {
                if(constraints[i][yaId] !== -1) return true;
                break;
            }
        }
        return false;
    }

    result.mouseListener = mouseChange(element, handleInteraction);

    // enable simple touch interactions
    element.addEventListener('touchstart', function(ev) {
        var xy = mouseOffset(ev.changedTouches[0], element);
        handleInteraction(0, xy[0], xy[1]);
        handleInteraction(1, xy[0], xy[1]);

        ev.preventDefault();
    }, hasPassive ? {passive: false} : false);
    element.addEventListener('touchmove', function(ev) {
        ev.preventDefault();
        var xy = mouseOffset(ev.changedTouches[0], element);
        handleInteraction(1, xy[0], xy[1]);

        ev.preventDefault();
    }, hasPassive ? {passive: false} : false);
    element.addEventListener('touchend', function(ev) {
        handleInteraction(0, result.lastPos[0], result.lastPos[1]);

        ev.preventDefault();
    }, hasPassive ? {passive: false} : false);

    function handleInteraction(buttons, x, y) {
        var dataBox = scene.calcDataBox();
        var viewBox = plot.viewBox;

        var lastX = result.lastPos[0];
        var lastY = result.lastPos[1];

        var MINDRAG = cartesianConstants.MINDRAG * plot.pixelRatio;
        var MINZOOM = cartesianConstants.MINZOOM * plot.pixelRatio;

        var dx, dy;

        x *= plot.pixelRatio;
        y *= plot.pixelRatio;

        // mouseChange gives y about top; convert to about bottom
        y = (viewBox[3] - viewBox[1]) - y;

        function updateRange(i0, start, end) {
            var range0 = Math.min(start, end);
            var range1 = Math.max(start, end);

            if(range0 !== range1) {
                dataBox[i0] = range0;
                dataBox[i0 + 2] = range1;
                result.dataBox = dataBox;
                scene.setRanges(dataBox);
            } else {
                scene.selectBox.selectBox = [0, 0, 1, 1];
                scene.glplot.setDirty();
            }
        }

        switch(scene.fullLayout.dragmode) {
            case 'zoom':
                if(buttons) {
                    var dataX = x /
                            (viewBox[2] - viewBox[0]) * (dataBox[2] - dataBox[0]) +
                        dataBox[0];
                    var dataY = y /
                            (viewBox[3] - viewBox[1]) * (dataBox[3] - dataBox[1]) +
                        dataBox[1];

                    if(!result.boxInited) {
                        result.boxStart[0] = dataX;
                        result.boxStart[1] = dataY;
                        result.dragStart[0] = x;
                        result.dragStart[1] = y;
                    }

                    result.boxEnd[0] = dataX;
                    result.boxEnd[1] = dataY;

                    // we need to mark the box as initialized right away
                    // so that we can tell the start and end points apart
                    result.boxInited = true;

                    // but don't actually enable the box until the cursor moves
                    if(!result.boxEnabled && (
                        result.boxStart[0] !== result.boxEnd[0] ||
                        result.boxStart[1] !== result.boxEnd[1])
                    ) {
                        result.boxEnabled = true;
                    }

                    // constrain aspect ratio if the axes require it
                    var smallDx = Math.abs(result.dragStart[0] - x) < MINZOOM;
                    var smallDy = Math.abs(result.dragStart[1] - y) < MINZOOM;
                    if(getSubplotConstraint() && !(smallDx && smallDy)) {
                        dx = result.boxEnd[0] - result.boxStart[0];
                        dy = result.boxEnd[1] - result.boxStart[1];
                        var dydx = (dataBox[3] - dataBox[1]) / (dataBox[2] - dataBox[0]);

                        if(Math.abs(dx * dydx) > Math.abs(dy)) {
                            result.boxEnd[1] = result.boxStart[1] +
                                Math.abs(dx) * dydx * (dy >= 0 ? 1 : -1);

                            // gl-select-box clips to the plot area bounds,
                            // which breaks the axis constraint, so don't allow
                            // this box to go out of bounds
                            if(result.boxEnd[1] < dataBox[1]) {
                                result.boxEnd[1] = dataBox[1];
                                result.boxEnd[0] = result.boxStart[0] +
                                    (dataBox[1] - result.boxStart[1]) / Math.abs(dydx);
                            } else if(result.boxEnd[1] > dataBox[3]) {
                                result.boxEnd[1] = dataBox[3];
                                result.boxEnd[0] = result.boxStart[0] +
                                    (dataBox[3] - result.boxStart[1]) / Math.abs(dydx);
                            }
                        } else {
                            result.boxEnd[0] = result.boxStart[0] +
                                Math.abs(dy) / dydx * (dx >= 0 ? 1 : -1);

                            if(result.boxEnd[0] < dataBox[0]) {
                                result.boxEnd[0] = dataBox[0];
                                result.boxEnd[1] = result.boxStart[1] +
                                    (dataBox[0] - result.boxStart[0]) * Math.abs(dydx);
                            } else if(result.boxEnd[0] > dataBox[2]) {
                                result.boxEnd[0] = dataBox[2];
                                result.boxEnd[1] = result.boxStart[1] +
                                    (dataBox[2] - result.boxStart[0]) * Math.abs(dydx);
                            }
                        }
                    } else {
                        // otherwise clamp small changes to the origin so we get 1D zoom

                        if(smallDx) result.boxEnd[0] = result.boxStart[0];
                        if(smallDy) result.boxEnd[1] = result.boxStart[1];
                    }
                } else if(result.boxEnabled) {
                    dx = result.boxStart[0] !== result.boxEnd[0];
                    dy = result.boxStart[1] !== result.boxEnd[1];
                    if(dx || dy) {
                        if(dx) {
                            updateRange(0, result.boxStart[0], result.boxEnd[0]);
                            scene.xaxis.autorange = false;
                        }
                        if(dy) {
                            updateRange(1, result.boxStart[1], result.boxEnd[1]);
                            scene.yaxis.autorange = false;
                        }
                        scene.relayoutCallback();
                    } else {
                        scene.glplot.setDirty();
                    }
                    result.boxEnabled = false;
                    result.boxInited = false;
                } else if(result.boxInited) {
                    // if box was inited but button released then - reset the box

                    result.boxInited = false;
                }
                break;

            case 'pan':
                result.boxEnabled = false;
                result.boxInited = false;

                if(buttons) {
                    if(!result.panning) {
                        result.dragStart[0] = x;
                        result.dragStart[1] = y;
                    }

                    if(Math.abs(result.dragStart[0] - x) < MINDRAG) x = result.dragStart[0];
                    if(Math.abs(result.dragStart[1] - y) < MINDRAG) y = result.dragStart[1];

                    dx = (lastX - x) * (dataBox[2] - dataBox[0]) /
                        (plot.viewBox[2] - plot.viewBox[0]);
                    dy = (lastY - y) * (dataBox[3] - dataBox[1]) /
                        (plot.viewBox[3] - plot.viewBox[1]);

                    dataBox[0] += dx;
                    dataBox[2] += dx;
                    dataBox[1] += dy;
                    dataBox[3] += dy;

                    scene.setRanges(dataBox);

                    result.panning = true;
                    result.lastInputTime = Date.now();
                    unSetAutoRange();
                    scene.cameraChanged();
                    scene.handleAnnotations();
                } else if(result.panning) {
                    result.panning = false;
                    scene.relayoutCallback();
                }
                break;
        }

        result.lastPos[0] = x;
        result.lastPos[1] = y;
    }

    result.wheelListener = mouseWheel(element, function(dx, dy) {
        if(!scene.scrollZoom) return false;

        var dataBox = scene.calcDataBox();
        var viewBox = plot.viewBox;

        var lastX = result.lastPos[0];
        var lastY = result.lastPos[1];

        var scale = Math.exp(5.0 * dy / (viewBox[3] - viewBox[1]));

        var cx = lastX /
                (viewBox[2] - viewBox[0]) * (dataBox[2] - dataBox[0]) +
            dataBox[0];
        var cy = lastY /
                (viewBox[3] - viewBox[1]) * (dataBox[3] - dataBox[1]) +
            dataBox[1];

        dataBox[0] = (dataBox[0] - cx) * scale + cx;
        dataBox[2] = (dataBox[2] - cx) * scale + cx;
        dataBox[1] = (dataBox[1] - cy) * scale + cy;
        dataBox[3] = (dataBox[3] - cy) * scale + cy;

        scene.setRanges(dataBox);

        result.lastInputTime = Date.now();
        unSetAutoRange();
        scene.cameraChanged();
        scene.handleAnnotations();
        scene.relayoutCallback();

        return true;
    }, true);

    return result;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl2d/convert.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl2d/convert.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var Axes = __webpack_require__(/*! ../cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

var str2RGBArray = __webpack_require__(/*! ../../lib/str2rgbarray */ "./node_modules/plotly.js/src/lib/str2rgbarray.js");

function Axes2DOptions(scene) {
    this.scene = scene;
    this.gl = scene.gl;
    this.pixelRatio = scene.pixelRatio;

    this.screenBox = [0, 0, 1, 1];
    this.viewBox = [0, 0, 1, 1];
    this.dataBox = [-1, -1, 1, 1];

    this.borderLineEnable = [false, false, false, false];
    this.borderLineWidth = [1, 1, 1, 1];
    this.borderLineColor = [
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1]
    ];

    this.ticks = [[], []];
    this.tickEnable = [true, true, false, false];
    this.tickPad = [15, 15, 15, 15];
    this.tickAngle = [0, 0, 0, 0];
    this.tickColor = [
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1]
    ];
    this.tickMarkLength = [0, 0, 0, 0];
    this.tickMarkWidth = [0, 0, 0, 0];
    this.tickMarkColor = [
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1]
    ];

    this.labels = ['x', 'y'];
    this.labelEnable = [true, true, false, false];
    this.labelAngle = [0, Math.PI / 2, 0, 3.0 * Math.PI / 2];
    this.labelPad = [15, 15, 15, 15];
    this.labelSize = [12, 12];
    this.labelFont = ['sans-serif', 'sans-serif'];
    this.labelColor = [
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1],
        [0, 0, 0, 1]
    ];

    this.title = '';
    this.titleEnable = true;
    this.titleCenter = [0, 0, 0, 0];
    this.titleAngle = 0;
    this.titleColor = [0, 0, 0, 1];
    this.titleFont = 'sans-serif';
    this.titleSize = 18;

    this.gridLineEnable = [true, true];
    this.gridLineColor = [
        [0, 0, 0, 0.5],
        [0, 0, 0, 0.5]
    ];
    this.gridLineWidth = [1, 1];

    this.zeroLineEnable = [true, true];
    this.zeroLineWidth = [1, 1];
    this.zeroLineColor = [
        [0, 0, 0, 1],
        [0, 0, 0, 1]
    ];

    this.borderColor = [0, 0, 0, 0];
    this.backgroundColor = [0, 0, 0, 0];

    this.static = this.scene.staticPlot;
}

var proto = Axes2DOptions.prototype;

var AXES = ['xaxis', 'yaxis'];

proto.merge = function(options) {
    // titles are rendered in SVG
    this.titleEnable = false;
    this.backgroundColor = str2RGBArray(options.plot_bgcolor);

    var axisName, ax, axTitle, axMirror;
    var hasAxisInDfltPos, hasAxisInAltrPos, hasSharedAxis, mirrorLines, mirrorTicks;
    var i, j;

    for(i = 0; i < 2; ++i) {
        axisName = AXES[i];
        var axisLetter = axisName.charAt(0);

        // get options relevant to this subplot,
        // '_name' is e.g. xaxis, xaxis2, yaxis, yaxis4 ...
        ax = options[this.scene[axisName]._name];

        axTitle = ax.title.text === this.scene.fullLayout._dfltTitle[axisLetter] ? '' : ax.title.text;

        for(j = 0; j <= 2; j += 2) {
            this.labelEnable[i + j] = false;
            this.labels[i + j] = axTitle;
            this.labelColor[i + j] = str2RGBArray(ax.title.font.color);
            this.labelFont[i + j] = ax.title.font.family;
            this.labelSize[i + j] = ax.title.font.size;
            this.labelPad[i + j] = this.getLabelPad(axisName, ax);

            this.tickEnable[i + j] = false;
            this.tickColor[i + j] = str2RGBArray((ax.tickfont || {}).color);
            this.tickAngle[i + j] = (ax.tickangle === 'auto') ?
                0 :
                Math.PI * -ax.tickangle / 180;
            this.tickPad[i + j] = this.getTickPad(ax);

            this.tickMarkLength[i + j] = 0;
            this.tickMarkWidth[i + j] = ax.tickwidth || 0;
            this.tickMarkColor[i + j] = str2RGBArray(ax.tickcolor);

            this.borderLineEnable[i + j] = false;
            this.borderLineColor[i + j] = str2RGBArray(ax.linecolor);
            this.borderLineWidth[i + j] = ax.linewidth || 0;
        }

        hasSharedAxis = this.hasSharedAxis(ax);
        hasAxisInDfltPos = this.hasAxisInDfltPos(axisName, ax) && !hasSharedAxis;
        hasAxisInAltrPos = this.hasAxisInAltrPos(axisName, ax) && !hasSharedAxis;

        axMirror = ax.mirror || false;
        mirrorLines = hasSharedAxis ?
            (String(axMirror).indexOf('all') !== -1) :  // 'all' or 'allticks'
            !!axMirror;                                 // all but false
        mirrorTicks = hasSharedAxis ?
            (axMirror === 'allticks') :
            (String(axMirror).indexOf('ticks') !== -1); // 'ticks' or 'allticks'

        // Axis titles and tick labels can only appear of one side of the scene
        //  and are never show on subplots that share existing axes.

        if(hasAxisInDfltPos) this.labelEnable[i] = true;
        else if(hasAxisInAltrPos) this.labelEnable[i + 2] = true;

        if(hasAxisInDfltPos) this.tickEnable[i] = ax.showticklabels;
        else if(hasAxisInAltrPos) this.tickEnable[i + 2] = ax.showticklabels;

        // Grid lines and ticks can appear on both sides of the scene
        //  and can appear on subplot that share existing axes via `ax.mirror`.

        if(hasAxisInDfltPos || mirrorLines) this.borderLineEnable[i] = ax.showline;
        if(hasAxisInAltrPos || mirrorLines) this.borderLineEnable[i + 2] = ax.showline;

        if(hasAxisInDfltPos || mirrorTicks) this.tickMarkLength[i] = this.getTickMarkLength(ax);
        if(hasAxisInAltrPos || mirrorTicks) this.tickMarkLength[i + 2] = this.getTickMarkLength(ax);

        this.gridLineEnable[i] = ax.showgrid;
        this.gridLineColor[i] = str2RGBArray(ax.gridcolor);
        this.gridLineWidth[i] = ax.gridwidth;

        this.zeroLineEnable[i] = ax.zeroline;
        this.zeroLineColor[i] = str2RGBArray(ax.zerolinecolor);
        this.zeroLineWidth[i] = ax.zerolinewidth;
    }
};

// is an axis shared with an already-drawn subplot ?
proto.hasSharedAxis = function(ax) {
    var scene = this.scene;
    var subplotIds = scene.fullLayout._subplots.gl2d;
    var list = Axes.findSubplotsWithAxis(subplotIds, ax);

    // if index === 0, then the subplot is already drawn as subplots
    // are drawn in order.
    return (list.indexOf(scene.id) !== 0);
};

// has an axis in default position (i.e. bottom/left) ?
proto.hasAxisInDfltPos = function(axisName, ax) {
    var axSide = ax.side;

    if(axisName === 'xaxis') return (axSide === 'bottom');
    else if(axisName === 'yaxis') return (axSide === 'left');
};

// has an axis in alternate position (i.e. top/right) ?
proto.hasAxisInAltrPos = function(axisName, ax) {
    var axSide = ax.side;

    if(axisName === 'xaxis') return (axSide === 'top');
    else if(axisName === 'yaxis') return (axSide === 'right');
};

proto.getLabelPad = function(axisName, ax) {
    var offsetBase = 1.5;
    var fontSize = ax.title.font.size;
    var showticklabels = ax.showticklabels;

    if(axisName === 'xaxis') {
        return (ax.side === 'top') ?
            -10 + fontSize * (offsetBase + (showticklabels ? 1 : 0)) :
            -10 + fontSize * (offsetBase + (showticklabels ? 0.5 : 0));
    } else if(axisName === 'yaxis') {
        return (ax.side === 'right') ?
            10 + fontSize * (offsetBase + (showticklabels ? 1 : 0.5)) :
            10 + fontSize * (offsetBase + (showticklabels ? 0.5 : 0));
    }
};

proto.getTickPad = function(ax) {
    return (ax.ticks === 'outside') ? 10 + ax.ticklen : 15;
};

proto.getTickMarkLength = function(ax) {
    if(!ax.ticks) return 0;

    var ticklen = ax.ticklen;

    return (ax.ticks === 'inside') ? -ticklen : ticklen;
};


function createAxes2D(scene) {
    return new Axes2DOptions(scene);
}

module.exports = createAxes2D;


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl2d/index.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl2d/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var Scene2D = __webpack_require__(/*! ./scene2d */ "./node_modules/plotly.js/src/plots/gl2d/scene2d.js");
var layoutGlobalAttrs = __webpack_require__(/*! ../layout_attributes */ "./node_modules/plotly.js/src/plots/layout_attributes.js");
var xmlnsNamespaces = __webpack_require__(/*! ../../constants/xmlns_namespaces */ "./node_modules/plotly.js/src/constants/xmlns_namespaces.js");
var constants = __webpack_require__(/*! ../cartesian/constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js");
var Cartesian = __webpack_require__(/*! ../cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js");
var fxAttrs = __webpack_require__(/*! ../../components/fx/layout_attributes */ "./node_modules/plotly.js/src/components/fx/layout_attributes.js");
var getSubplotData = __webpack_require__(/*! ../get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getSubplotData;

exports.name = 'gl2d';

exports.attr = ['xaxis', 'yaxis'];

exports.idRoot = ['x', 'y'];

exports.idRegex = constants.idRegex;

exports.attrRegex = constants.attrRegex;

exports.attributes = __webpack_require__(/*! ../cartesian/attributes */ "./node_modules/plotly.js/src/plots/cartesian/attributes.js");

exports.supplyLayoutDefaults = function(layoutIn, layoutOut, fullData) {
    if(!layoutOut._has('cartesian')) {
        Cartesian.supplyLayoutDefaults(layoutIn, layoutOut, fullData);
    }
};

// gl2d uses svg axis attributes verbatim, but overrides editType
// this could potentially be just `layoutAttributes` but it would
// still need special handling somewhere to give it precedence over
// the svg version when both are in use on one plot
exports.layoutAttrOverrides = overrideAll(Cartesian.layoutAttributes, 'plot', 'from-root');

// similar overrides for base plot attributes (and those added by components)
exports.baseLayoutAttrOverrides = overrideAll({
    plot_bgcolor: layoutGlobalAttrs.plot_bgcolor,
    hoverlabel: fxAttrs.hoverlabel
    // dragmode needs calc but only when transitioning TO lasso or select
    // so for now it's left inside _relayout
    // dragmode: fxAttrs.dragmode
}, 'plot', 'nested');

exports.plot = function plot(gd) {
    var fullLayout = gd._fullLayout;
    var fullData = gd._fullData;
    var subplotIds = fullLayout._subplots.gl2d;

    for(var i = 0; i < subplotIds.length; i++) {
        var subplotId = subplotIds[i];
        var subplotObj = fullLayout._plots[subplotId];
        var fullSubplotData = getSubplotData(fullData, 'gl2d', subplotId);

        // ref. to corresp. Scene instance
        var scene = subplotObj._scene2d;

        // If Scene is not instantiated, create one!
        if(scene === undefined) {
            scene = new Scene2D({
                id: subplotId,
                graphDiv: gd,
                container: gd.querySelector('.gl-container'),
                staticPlot: gd._context.staticPlot,
                plotGlPixelRatio: gd._context.plotGlPixelRatio
            },
                fullLayout
            );

            // set ref to Scene instance
            subplotObj._scene2d = scene;
        }

        scene.plot(fullSubplotData, gd.calcdata, fullLayout, gd.layout);
    }
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var oldSceneKeys = oldFullLayout._subplots.gl2d || [];

    for(var i = 0; i < oldSceneKeys.length; i++) {
        var id = oldSceneKeys[i];
        var oldSubplot = oldFullLayout._plots[id];

        // old subplot wasn't gl2d; nothing to do
        if(!oldSubplot._scene2d) continue;

        // if no traces are present, delete gl2d subplot
        var subplotData = getSubplotData(newFullData, 'gl2d', id);
        if(subplotData.length === 0) {
            oldSubplot._scene2d.destroy();
            delete oldFullLayout._plots[id];
        }
    }

    // since we use cartesian interactions, do cartesian clean
    Cartesian.clean.apply(this, arguments);
};

exports.drawFramework = function(gd) {
    if(!gd._context.staticPlot) {
        Cartesian.drawFramework(gd);
    }
};

exports.toSVG = function(gd) {
    var fullLayout = gd._fullLayout;
    var subplotIds = fullLayout._subplots.gl2d;

    for(var i = 0; i < subplotIds.length; i++) {
        var subplot = fullLayout._plots[subplotIds[i]];
        var scene = subplot._scene2d;

        var imageData = scene.toImage('png');
        var image = fullLayout._glimages.append('svg:image');

        image.attr({
            xmlns: xmlnsNamespaces.svg,
            'xlink:href': imageData,
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            preserveAspectRatio: 'none'
        });

        scene.destroy();
    }
};

exports.updateFx = function(gd) {
    var fullLayout = gd._fullLayout;
    var subplotIds = fullLayout._subplots.gl2d;

    for(var i = 0; i < subplotIds.length; i++) {
        var subplotObj = fullLayout._plots[subplotIds[i]]._scene2d;
        subplotObj.updateFx(fullLayout.dragmode);
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/gl2d/scene2d.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/gl2d/scene2d.js ***!
  \**********************************************************/
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
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");

var createPlot2D = __webpack_require__(/*! gl-plot2d */ "./node_modules/gl-plot2d/plot.js");
var createSpikes = __webpack_require__(/*! gl-spikes2d */ "./node_modules/gl-spikes2d/spikes.js");
var createSelectBox = __webpack_require__(/*! gl-select-box */ "./node_modules/gl-select-box/selectbox.js");
var getContext = __webpack_require__(/*! webgl-context */ "./node_modules/webgl-context/index.js");

var createOptions = __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/plots/gl2d/convert.js");
var createCamera = __webpack_require__(/*! ./camera */ "./node_modules/plotly.js/src/plots/gl2d/camera.js");
var showNoWebGlMsg = __webpack_require__(/*! ../../lib/show_no_webgl_msg */ "./node_modules/plotly.js/src/lib/show_no_webgl_msg.js");
var axisConstraints = __webpack_require__(/*! ../cartesian/constraints */ "./node_modules/plotly.js/src/plots/cartesian/constraints.js");
var enforceAxisConstraints = axisConstraints.enforce;
var cleanAxisConstraints = axisConstraints.clean;
var doAutoRange = __webpack_require__(/*! ../cartesian/autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").doAutoRange;

var dragHelpers = __webpack_require__(/*! ../../components/dragelement/helpers */ "./node_modules/plotly.js/src/components/dragelement/helpers.js");
var drawMode = dragHelpers.drawMode;
var selectMode = dragHelpers.selectMode;

var AXES = ['xaxis', 'yaxis'];
var STATIC_CANVAS, STATIC_CONTEXT;

var SUBPLOT_PATTERN = __webpack_require__(/*! ../cartesian/constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js").SUBPLOT_PATTERN;


function Scene2D(options, fullLayout) {
    this.container = options.container;
    this.graphDiv = options.graphDiv;
    this.pixelRatio = options.plotGlPixelRatio || window.devicePixelRatio;
    this.id = options.id;
    this.staticPlot = !!options.staticPlot;
    this.scrollZoom = this.graphDiv._context._scrollZoom.cartesian;

    this.fullData = null;
    this.updateRefs(fullLayout);

    this.makeFramework();
    if(this.stopped) return;

    // update options
    this.glplotOptions = createOptions(this);
    this.glplotOptions.merge(fullLayout);

    // create the plot
    this.glplot = createPlot2D(this.glplotOptions);

    // create camera
    this.camera = createCamera(this);

    // trace set
    this.traces = {};

    // create axes spikes
    this.spikes = createSpikes(this.glplot);

    this.selectBox = createSelectBox(this.glplot, {
        innerFill: false,
        outerFill: true
    });

    // last button state
    this.lastButtonState = 0;

    // last pick result
    this.pickResult = null;

    // is the mouse over the plot?
    // it's OK if this says true when it's not, so long as
    // when we get a mouseout we set it to false before handling
    this.isMouseOver = true;

    // flag to stop render loop
    this.stopped = false;

    // redraw the plot
    this.redraw = this.draw.bind(this);
    this.redraw();
}

module.exports = Scene2D;

var proto = Scene2D.prototype;

proto.makeFramework = function() {
    // create canvas and gl context
    if(this.staticPlot) {
        if(!STATIC_CONTEXT) {
            STATIC_CANVAS = document.createElement('canvas');

            STATIC_CONTEXT = getContext({
                canvas: STATIC_CANVAS,
                preserveDrawingBuffer: false,
                premultipliedAlpha: true,
                antialias: true
            });

            if(!STATIC_CONTEXT) {
                throw new Error('Error creating static canvas/context for image server');
            }
        }

        this.canvas = STATIC_CANVAS;
        this.gl = STATIC_CONTEXT;
    } else {
        var liveCanvas = this.container.querySelector('.gl-canvas-focus');

        var gl = getContext({
            canvas: liveCanvas,
            preserveDrawingBuffer: true,
            premultipliedAlpha: true
        });

        if(!gl) {
            showNoWebGlMsg(this);
            this.stopped = true;
            return;
        }

        this.canvas = liveCanvas;
        this.gl = gl;
    }

    // position the canvas
    var canvas = this.canvas;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0px';
    canvas.style.left = '0px';
    canvas.style['pointer-events'] = 'none';

    this.updateSize(canvas);

    // disabling user select on the canvas
    // sanitizes double-clicks interactions
    // ref: https://github.com/plotly/plotly.js/issues/744
    canvas.className += ' user-select-none';

    // create SVG container for hover text
    var svgContainer = this.svgContainer = document.createElementNS(
        'http://www.w3.org/2000/svg',
        'svg');
    svgContainer.style.position = 'absolute';
    svgContainer.style.top = svgContainer.style.left = '0px';
    svgContainer.style.width = svgContainer.style.height = '100%';
    svgContainer.style['z-index'] = 20;
    svgContainer.style['pointer-events'] = 'none';

    // create div to catch the mouse event
    var mouseContainer = this.mouseContainer = document.createElement('div');
    mouseContainer.style.position = 'absolute';
    mouseContainer.style['pointer-events'] = 'auto';

    this.pickCanvas = this.container.querySelector('.gl-canvas-pick');


    // append canvas, hover svg and mouse div to container
    var container = this.container;
    container.appendChild(svgContainer);
    container.appendChild(mouseContainer);

    var self = this;
    mouseContainer.addEventListener('mouseout', function() {
        self.isMouseOver = false;
        self.unhover();
    });
    mouseContainer.addEventListener('mouseover', function() {
        self.isMouseOver = true;
    });
};

proto.toImage = function(format) {
    if(!format) format = 'png';

    this.stopped = true;

    if(this.staticPlot) this.container.appendChild(STATIC_CANVAS);

    // update canvas size
    this.updateSize(this.canvas);


    // grab context and yank out pixels
    var gl = this.glplot.gl;
    var w = gl.drawingBufferWidth;
    var h = gl.drawingBufferHeight;

    // force redraw
    gl.clearColor(1, 1, 1, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    this.glplot.setDirty();
    this.glplot.draw();

    gl.bindFramebuffer(gl.FRAMEBUFFER, null);

    var pixels = new Uint8Array(w * h * 4);
    gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, pixels);

    // flip pixels
    for(var j = 0, k = h - 1; j < k; ++j, --k) {
        for(var i = 0; i < w; ++i) {
            for(var l = 0; l < 4; ++l) {
                var tmp = pixels[4 * (w * j + i) + l];
                pixels[4 * (w * j + i) + l] = pixels[4 * (w * k + i) + l];
                pixels[4 * (w * k + i) + l] = tmp;
            }
        }
    }

    var canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext('2d');
    var imageData = context.createImageData(w, h);
    imageData.data.set(pixels);
    context.putImageData(imageData, 0, 0);

    var dataURL;

    switch(format) {
        case 'jpeg':
            dataURL = canvas.toDataURL('image/jpeg');
            break;
        case 'webp':
            dataURL = canvas.toDataURL('image/webp');
            break;
        default:
            dataURL = canvas.toDataURL('image/png');
    }

    if(this.staticPlot) this.container.removeChild(STATIC_CANVAS);

    return dataURL;
};

proto.updateSize = function(canvas) {
    if(!canvas) canvas = this.canvas;

    var pixelRatio = this.pixelRatio;
    var fullLayout = this.fullLayout;

    var width = fullLayout.width;
    var height = fullLayout.height;
    var pixelWidth = Math.ceil(pixelRatio * width) |0;
    var pixelHeight = Math.ceil(pixelRatio * height) |0;

    // check for resize
    if(canvas.width !== pixelWidth || canvas.height !== pixelHeight) {
        canvas.width = pixelWidth;
        canvas.height = pixelHeight;
    }

    return canvas;
};

proto.computeTickMarks = function() {
    this.xaxis.setScale();
    this.yaxis.setScale();

    var nextTicks = [
        Axes.calcTicks(this.xaxis),
        Axes.calcTicks(this.yaxis)
    ];

    for(var j = 0; j < 2; ++j) {
        for(var i = 0; i < nextTicks[j].length; ++i) {
            // coercing tick value (may not be a string) to a string
            nextTicks[j][i].text = nextTicks[j][i].text + '';
        }
    }

    return nextTicks;
};

function compareTicks(a, b) {
    for(var i = 0; i < 2; ++i) {
        var aticks = a[i];
        var bticks = b[i];

        if(aticks.length !== bticks.length) return true;

        for(var j = 0; j < aticks.length; ++j) {
            if(aticks[j].x !== bticks[j].x) return true;
        }
    }

    return false;
}

proto.updateRefs = function(newFullLayout) {
    this.fullLayout = newFullLayout;

    var spmatch = this.id.match(SUBPLOT_PATTERN);
    var xaxisName = 'xaxis' + spmatch[1];
    var yaxisName = 'yaxis' + spmatch[2];

    this.xaxis = this.fullLayout[xaxisName];
    this.yaxis = this.fullLayout[yaxisName];
};

proto.relayoutCallback = function() {
    var graphDiv = this.graphDiv;
    var xaxis = this.xaxis;
    var yaxis = this.yaxis;
    var layout = graphDiv.layout;

    // make a meaningful value to be passed on to possible 'plotly_relayout' subscriber(s)
    var update = {};
    var xrange = update[xaxis._name + '.range'] = xaxis.range.slice();
    var yrange = update[yaxis._name + '.range'] = yaxis.range.slice();
    update[xaxis._name + '.autorange'] = xaxis.autorange;
    update[yaxis._name + '.autorange'] = yaxis.autorange;

    Registry.call('_storeDirectGUIEdit', graphDiv.layout, graphDiv._fullLayout._preGUI, update);

    // update the input layout
    var xaIn = layout[xaxis._name];
    xaIn.range = xrange;
    xaIn.autorange = xaxis.autorange;

    var yaIn = layout[yaxis._name];
    yaIn.range = yrange;
    yaIn.autorange = yaxis.autorange;

    // lastInputTime helps determine which one is the latest input (if async)
    update.lastInputTime = this.camera.lastInputTime;
    graphDiv.emit('plotly_relayout', update);
};

proto.cameraChanged = function() {
    var camera = this.camera;

    this.glplot.setDataBox(this.calcDataBox());

    var nextTicks = this.computeTickMarks();
    var curTicks = this.glplotOptions.ticks;

    if(compareTicks(nextTicks, curTicks)) {
        this.glplotOptions.ticks = nextTicks;
        this.glplotOptions.dataBox = camera.dataBox;
        this.glplot.update(this.glplotOptions);
        this.handleAnnotations();
    }
};

proto.handleAnnotations = function() {
    var gd = this.graphDiv;
    var annotations = this.fullLayout.annotations;

    for(var i = 0; i < annotations.length; i++) {
        var ann = annotations[i];

        if(ann.xref === this.xaxis._id && ann.yref === this.yaxis._id) {
            Registry.getComponentMethod('annotations', 'drawOne')(gd, i);
        }
    }
};

proto.destroy = function() {
    if(!this.glplot) return;

    var traces = this.traces;

    if(traces) {
        Object.keys(traces).map(function(key) {
            traces[key].dispose();
            delete traces[key];
        });
    }

    this.glplot.dispose();

    this.container.removeChild(this.svgContainer);
    this.container.removeChild(this.mouseContainer);

    this.fullData = null;
    this.glplot = null;
    this.stopped = true;
    this.camera.mouseListener.enabled = false;
    this.mouseContainer.removeEventListener('wheel', this.camera.wheelListener);
    this.camera = null;
};

proto.plot = function(fullData, calcData, fullLayout) {
    var glplot = this.glplot;

    this.updateRefs(fullLayout);
    this.xaxis.clearCalc();
    this.yaxis.clearCalc();
    this.updateTraces(fullData, calcData);
    this.updateFx(fullLayout.dragmode);

    var width = fullLayout.width;
    var height = fullLayout.height;

    this.updateSize(this.canvas);

    var options = this.glplotOptions;
    options.merge(fullLayout);
    options.screenBox = [0, 0, width, height];

    var mockGraphDiv = {_fullLayout: {
        _axisConstraintGroups: this.graphDiv._fullLayout._axisConstraintGroups,
        xaxis: this.xaxis,
        yaxis: this.yaxis
    }};

    cleanAxisConstraints(mockGraphDiv, this.xaxis);
    cleanAxisConstraints(mockGraphDiv, this.yaxis);

    var size = fullLayout._size;
    var domainX = this.xaxis.domain;
    var domainY = this.yaxis.domain;

    options.viewBox = [
        size.l + domainX[0] * size.w,
        size.b + domainY[0] * size.h,
        (width - size.r) - (1 - domainX[1]) * size.w,
        (height - size.t) - (1 - domainY[1]) * size.h
    ];

    this.mouseContainer.style.width = size.w * (domainX[1] - domainX[0]) + 'px';
    this.mouseContainer.style.height = size.h * (domainY[1] - domainY[0]) + 'px';
    this.mouseContainer.height = size.h * (domainY[1] - domainY[0]);
    this.mouseContainer.style.left = size.l + domainX[0] * size.w + 'px';
    this.mouseContainer.style.top = size.t + (1 - domainY[1]) * size.h + 'px';

    var ax, i;

    for(i = 0; i < 2; ++i) {
        ax = this[AXES[i]];
        ax._length = options.viewBox[i + 2] - options.viewBox[i];

        doAutoRange(this.graphDiv, ax);
        ax.setScale();
    }

    enforceAxisConstraints(mockGraphDiv);

    options.ticks = this.computeTickMarks();

    options.dataBox = this.calcDataBox();

    options.merge(fullLayout);
    glplot.update(options);

    // force redraw so that promise is returned when rendering is completed
    this.glplot.draw();
};

proto.calcDataBox = function() {
    var xaxis = this.xaxis;
    var yaxis = this.yaxis;
    var xrange = xaxis.range;
    var yrange = yaxis.range;
    var xr2l = xaxis.r2l;
    var yr2l = yaxis.r2l;

    return [xr2l(xrange[0]), yr2l(yrange[0]), xr2l(xrange[1]), yr2l(yrange[1])];
};

proto.setRanges = function(dataBox) {
    var xaxis = this.xaxis;
    var yaxis = this.yaxis;
    var xl2r = xaxis.l2r;
    var yl2r = yaxis.l2r;

    xaxis.range = [xl2r(dataBox[0]), xl2r(dataBox[2])];
    yaxis.range = [yl2r(dataBox[1]), yl2r(dataBox[3])];
};

proto.updateTraces = function(fullData, calcData) {
    var traceIds = Object.keys(this.traces);
    var i, j, fullTrace;

    this.fullData = fullData;

    // remove empty traces
    traceIdLoop:
    for(i = 0; i < traceIds.length; i++) {
        var oldUid = traceIds[i];
        var oldTrace = this.traces[oldUid];

        for(j = 0; j < fullData.length; j++) {
            fullTrace = fullData[j];

            if(fullTrace.uid === oldUid && fullTrace.type === oldTrace.type) {
                continue traceIdLoop;
            }
        }

        oldTrace.dispose();
        delete this.traces[oldUid];
    }

    // update / create trace objects
    for(i = 0; i < fullData.length; i++) {
        fullTrace = fullData[i];
        var calcTrace = calcData[i];
        var traceObj = this.traces[fullTrace.uid];

        if(traceObj) traceObj.update(fullTrace, calcTrace);
        else {
            traceObj = fullTrace._module.plot(this, fullTrace, calcTrace);
            this.traces[fullTrace.uid] = traceObj;
        }
    }

    // order object per traces
    this.glplot.objects.sort(function(a, b) {
        return a._trace.index - b._trace.index;
    });
};

proto.updateFx = function(dragmode) {
    // switch to svg interactions in lasso/select mode & shape drawing
    if(selectMode(dragmode) || drawMode(dragmode)) {
        this.pickCanvas.style['pointer-events'] = 'none';
        this.mouseContainer.style['pointer-events'] = 'none';
    } else {
        this.pickCanvas.style['pointer-events'] = 'auto';
        this.mouseContainer.style['pointer-events'] = 'auto';
    }

    // set proper cursor
    if(dragmode === 'pan') {
        this.mouseContainer.style.cursor = 'move';
    } else if(dragmode === 'zoom') {
        this.mouseContainer.style.cursor = 'crosshair';
    } else {
        this.mouseContainer.style.cursor = null;
    }
};

proto.emitPointAction = function(nextSelection, eventType) {
    var uid = nextSelection.trace.uid;
    var ptNumber = nextSelection.pointIndex;
    var trace;

    for(var i = 0; i < this.fullData.length; i++) {
        if(this.fullData[i].uid === uid) {
            trace = this.fullData[i];
        }
    }

    var pointData = {
        x: nextSelection.traceCoord[0],
        y: nextSelection.traceCoord[1],
        curveNumber: trace.index,
        pointNumber: ptNumber,
        data: trace._input,
        fullData: this.fullData,
        xaxis: this.xaxis,
        yaxis: this.yaxis
    };

    Fx.appendArrayPointValue(pointData, trace, ptNumber);

    this.graphDiv.emit(eventType, {points: [pointData]});
};

proto.draw = function() {
    if(this.stopped) return;

    requestAnimationFrame(this.redraw);

    var glplot = this.glplot;
    var camera = this.camera;
    var mouseListener = camera.mouseListener;
    var mouseUp = this.lastButtonState === 1 && mouseListener.buttons === 0;
    var fullLayout = this.fullLayout;

    this.lastButtonState = mouseListener.buttons;

    this.cameraChanged();

    var x = mouseListener.x * glplot.pixelRatio;
    var y = this.canvas.height - glplot.pixelRatio * mouseListener.y;

    var result;

    if(camera.boxEnabled && fullLayout.dragmode === 'zoom') {
        this.selectBox.enabled = true;

        var selectBox = this.selectBox.selectBox = [
            Math.min(camera.boxStart[0], camera.boxEnd[0]),
            Math.min(camera.boxStart[1], camera.boxEnd[1]),
            Math.max(camera.boxStart[0], camera.boxEnd[0]),
            Math.max(camera.boxStart[1], camera.boxEnd[1])
        ];

        // 1D zoom
        for(var i = 0; i < 2; i++) {
            if(camera.boxStart[i] === camera.boxEnd[i]) {
                selectBox[i] = glplot.dataBox[i];
                selectBox[i + 2] = glplot.dataBox[i + 2];
            }
        }

        glplot.setDirty();
    } else if(!camera.panning && this.isMouseOver) {
        this.selectBox.enabled = false;

        var size = fullLayout._size;
        var domainX = this.xaxis.domain;
        var domainY = this.yaxis.domain;

        result = glplot.pick(
            (x / glplot.pixelRatio) + size.l + domainX[0] * size.w,
            (y / glplot.pixelRatio) - (size.t + (1 - domainY[1]) * size.h)
        );

        var nextSelection = result && result.object._trace.handlePick(result);

        if(nextSelection && mouseUp) {
            this.emitPointAction(nextSelection, 'plotly_click');
        }

        if(result && result.object._trace.hoverinfo !== 'skip' && fullLayout.hovermode) {
            if(nextSelection && (
                !this.lastPickResult ||
                this.lastPickResult.traceUid !== nextSelection.trace.uid ||
                this.lastPickResult.dataCoord[0] !== nextSelection.dataCoord[0] ||
                this.lastPickResult.dataCoord[1] !== nextSelection.dataCoord[1])
            ) {
                var selection = nextSelection;

                this.lastPickResult = {
                    traceUid: nextSelection.trace ? nextSelection.trace.uid : null,
                    dataCoord: nextSelection.dataCoord.slice()
                };
                this.spikes.update({ center: result.dataCoord });

                selection.screenCoord = [
                    ((glplot.viewBox[2] - glplot.viewBox[0]) *
                    (result.dataCoord[0] - glplot.dataBox[0]) /
                        (glplot.dataBox[2] - glplot.dataBox[0]) + glplot.viewBox[0]) /
                            glplot.pixelRatio,
                    (this.canvas.height - (glplot.viewBox[3] - glplot.viewBox[1]) *
                    (result.dataCoord[1] - glplot.dataBox[1]) /
                        (glplot.dataBox[3] - glplot.dataBox[1]) - glplot.viewBox[1]) /
                            glplot.pixelRatio
                ];

                // this needs to happen before the next block that deletes traceCoord data
                // also it's important to copy, otherwise data is lost by the time event data is read
                this.emitPointAction(nextSelection, 'plotly_hover');

                var trace = this.fullData[selection.trace.index] || {};
                var ptNumber = selection.pointIndex;
                var hoverinfo = Fx.castHoverinfo(trace, fullLayout, ptNumber);

                if(hoverinfo && hoverinfo !== 'all') {
                    var parts = hoverinfo.split('+');
                    if(parts.indexOf('x') === -1) selection.traceCoord[0] = undefined;
                    if(parts.indexOf('y') === -1) selection.traceCoord[1] = undefined;
                    if(parts.indexOf('z') === -1) selection.traceCoord[2] = undefined;
                    if(parts.indexOf('text') === -1) selection.textLabel = undefined;
                    if(parts.indexOf('name') === -1) selection.name = undefined;
                }

                Fx.loneHover({
                    x: selection.screenCoord[0],
                    y: selection.screenCoord[1],
                    xLabel: this.hoverFormatter('xaxis', selection.traceCoord[0]),
                    yLabel: this.hoverFormatter('yaxis', selection.traceCoord[1]),
                    zLabel: selection.traceCoord[2],
                    text: selection.textLabel,
                    name: selection.name,
                    color: Fx.castHoverOption(trace, ptNumber, 'bgcolor') || selection.color,
                    borderColor: Fx.castHoverOption(trace, ptNumber, 'bordercolor'),
                    fontFamily: Fx.castHoverOption(trace, ptNumber, 'font.family'),
                    fontSize: Fx.castHoverOption(trace, ptNumber, 'font.size'),
                    fontColor: Fx.castHoverOption(trace, ptNumber, 'font.color'),
                    nameLength: Fx.castHoverOption(trace, ptNumber, 'namelength'),
                    textAlign: Fx.castHoverOption(trace, ptNumber, 'align')
                }, {
                    container: this.svgContainer,
                    gd: this.graphDiv
                });
            }
        }
    }

    // Remove hover effects if we're not over a point OR
    // if we're zooming or panning (in which case result is not set)
    if(!result) {
        this.unhover();
    }

    glplot.draw();
};

proto.unhover = function() {
    if(this.lastPickResult) {
        this.spikes.update({});
        this.lastPickResult = null;
        this.graphDiv.emit('plotly_unhover');
        Fx.loneUnhover(this.svgContainer);
    }
};

proto.hoverFormatter = function(axisName, val) {
    if(val === undefined) return undefined;

    var axis = this[axisName];
    return Axes.tickText(axis, axis.c2l(val), 'hover').text;
};


/***/ }),

/***/ "./node_modules/text-cache/textcache.js":
/*!**********************************************!*\
  !*** ./node_modules/text-cache/textcache.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


module.exports = textGet

var vectorizeText = __webpack_require__(/*! vectorize-text */ "./node_modules/vectorize-text/index.js")

var globals = window || process.global || {}
var __TEXT_CACHE  = globals.__TEXT_CACHE || {}
globals.__TEXT_CACHE = {}

function unwrap(mesh) {
  var cells     = mesh.cells
  var positions = mesh.positions
  var data      = new Float32Array(cells.length * 6)
  var ptr       = 0
  var shapeX    = 0
  for(var i=0; i<cells.length; ++i) {
    var tri = cells[i]
    for(var j=0; j<3; ++j) {
      var point = positions[tri[j]]
      data[ptr++] = point[0]
      data[ptr++] = point[1] + 1.4
      shapeX      = Math.max(point[0], shapeX)
    }
  }
  return {
    data:  data,
    shape: shapeX
  }
}

function textGet(font, text, opts) {
  var opts = opts || {}
  var fontcache = __TEXT_CACHE[font]
  if(!fontcache) {
    fontcache = __TEXT_CACHE[font] = {
      ' ': {
        data:   new Float32Array(0),
        shape: 0.2
      }
    }
  }
  var mesh = fontcache[text]
  if(!mesh) {
    if(text.length <= 1 || !/\d/.test(text)) {
      mesh = fontcache[text] = unwrap(vectorizeText(text, {
        triangles:     true,
        font:          font,
        textAlign:     opts.textAlign || 'left',
        textBaseline:  'alphabetic',
        styletags: {
            breaklines: true,
                 bolds: true,
               italics: true,
            subscripts: true,
          superscripts: true
        }
      }))
    } else {
      var parts = text.split(/(\d|\s)/)
      var buffer = new Array(parts.length)
      var bufferSize = 0
      var shapeX = 0
      for(var i=0; i<parts.length; ++i) {
        buffer[i] = textGet(font, parts[i])
        bufferSize += buffer[i].data.length
        shapeX += buffer[i].shape
        if(i>0) {
          shapeX += 0.02
        }
      }

      var data = new Float32Array(bufferSize)
      var ptr     = 0
      var xOffset = -0.5 * shapeX
      for(var i=0; i<buffer.length; ++i) {
        var bdata = buffer[i].data
        for(var j=0; j<bdata.length; j+=2) {
          data[ptr++] = bdata[j] + xOffset
          data[ptr++] = bdata[j+1]
        }
        xOffset += buffer[i].shape + 0.02
      }

      mesh = fontcache[text] = {
        data:  data,
        shape: shapeX
      }
    }
  }

   return mesh
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLXBsb3QyZC9saWIvYm94LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtcGxvdDJkL2xpYi9ncmlkLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtcGxvdDJkL2xpYi9saW5lLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtcGxvdDJkL2xpYi9zaGFkZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtcGxvdDJkL2xpYi90ZXh0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtcGxvdDJkL3Bsb3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1zZWxlY3QtYm94L2xpYi9zaGFkZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZ2wtc2VsZWN0LWJveC9zZWxlY3Rib3guanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9nbC1zcGlrZXMyZC9zcGlrZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2dsMmQvY2FtZXJhLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9nbDJkL2NvbnZlcnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2dsMmQvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2dsMmQvc2NlbmUyZC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3RleHQtY2FjaGUvdGV4dGNhY2hlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFZOztBQUVaOztBQUVBLG1CQUFtQixtQkFBTyxDQUFDLHFEQUFXO0FBQ3RDLG1CQUFtQixtQkFBTyxDQUFDLG9EQUFXOztBQUV0QyxjQUFjLG1CQUFPLENBQUMsMERBQVc7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1RFk7O0FBRVo7O0FBRUEsb0JBQW9CLG1CQUFPLENBQUMscURBQVc7QUFDdkMsb0JBQW9CLG1CQUFPLENBQUMsb0RBQVc7QUFDdkMsb0JBQW9CLG1CQUFPLENBQUMsa0ZBQXNCO0FBQ2xELG9CQUFvQixtQkFBTyxDQUFDLDBEQUFXOztBQUV2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZ0JBQWdCLEtBQUs7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixvQkFBb0I7QUFDdEM7QUFDQTtBQUNBLG9CQUFvQixLQUFLO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDcFBZOztBQUVaOztBQUVBLG1CQUFtQixtQkFBTyxDQUFDLHFEQUFXO0FBQ3RDLG1CQUFtQixtQkFBTyxDQUFDLG9EQUFXOztBQUV0QyxjQUFjLG1CQUFPLENBQUMsMERBQVc7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDOURZOztBQUVaLGNBQWMsbUJBQU8sQ0FBQyxrREFBUzs7QUFFL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2ZZOztBQUVaOztBQUVBLG1CQUFtQixtQkFBTyxDQUFDLHFEQUFXO0FBQ3RDLG1CQUFtQixtQkFBTyxDQUFDLG9EQUFXO0FBQ3RDLG1CQUFtQixtQkFBTyxDQUFDLDBEQUFZO0FBQ3ZDLG1CQUFtQixtQkFBTyxDQUFDLGtGQUFzQjtBQUNqRCxtQkFBbUIsbUJBQU8sQ0FBQywwREFBVzs7QUFFdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsZ0JBQWdCLEtBQUs7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsYUFBYTtBQUMvQjs7QUFFQTtBQUNBO0FBQ0EsWUFBWSxnQkFBZ0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsYUFBYTtBQUMvQjs7QUFFQSw4RUFBOEUsc0JBQXNCO0FBQ3BHO0FBQ0EsWUFBWSxlQUFlO0FBQzNCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVSxlQUFlO0FBQ3pCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ25SWTs7QUFFWjs7QUFFQSxpQkFBaUIsbUJBQU8sQ0FBQyxtRUFBa0I7O0FBRTNDLGlCQUFpQixtQkFBTyxDQUFDLHdEQUFZO0FBQ3JDLGlCQUFpQixtQkFBTyxDQUFDLHdEQUFZO0FBQ3JDLGlCQUFpQixtQkFBTyxDQUFDLHdEQUFZO0FBQ3JDLGlCQUFpQixtQkFBTyxDQUFDLHNEQUFXOztBQUVwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixLQUFLO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsa0JBQWtCO0FBQ2hDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLG1CQUFtQjtBQUNqQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLGtCQUFrQjtBQUNoQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsa0JBQWtCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBLGNBQWMsaUJBQWlCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsS0FBSztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0NBQWtDLE1BQU07QUFDeEM7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLE1BQU07QUFDekM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjLGtCQUFrQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FB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O0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QixPQUFPO0FBQ3BDLHNCQUFzQixPQUFPO0FBQzdCLDBCQUEwQixPQUFPO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FB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QkFBZ0I7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSIsImZpbGUiOiJjaGFydGE4Y2JlNzhhNDA1OWMwY2NhMDFhLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQm94ZXNcblxudmFyIGNyZWF0ZUJ1ZmZlciA9IHJlcXVpcmUoJ2dsLWJ1ZmZlcicpXG52YXIgY3JlYXRlU2hhZGVyID0gcmVxdWlyZSgnZ2wtc2hhZGVyJylcblxudmFyIHNoYWRlcnMgPSByZXF1aXJlKCcuL3NoYWRlcnMnKVxuXG5mdW5jdGlvbiBCb3hlcyhwbG90LCB2Ym8sIHNoYWRlcikge1xuICB0aGlzLnBsb3QgICA9IHBsb3RcbiAgdGhpcy52Ym8gICAgPSB2Ym9cbiAgdGhpcy5zaGFkZXIgPSBzaGFkZXJcbn1cblxudmFyIHByb3RvID0gQm94ZXMucHJvdG90eXBlXG5cbnByb3RvLmJpbmQgPSBmdW5jdGlvbigpIHtcbiAgdmFyIHNoYWRlciA9IHRoaXMuc2hhZGVyXG4gIHRoaXMudmJvLmJpbmQoKVxuICB0aGlzLnNoYWRlci5iaW5kKClcbiAgc2hhZGVyLmF0dHJpYnV0ZXMuY29vcmQucG9pbnRlcigpXG4gIHNoYWRlci51bmlmb3Jtcy5zY3JlZW5Cb3ggPSB0aGlzLnBsb3Quc2NyZWVuQm94XG59XG5cbnByb3RvLmRyYXdCb3ggPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBsbyA9IFswLDBdXG4gIHZhciBoaSA9IFswLDBdXG4gIHJldHVybiBmdW5jdGlvbihsb1gsIGxvWSwgaGlYLCBoaVksIGNvbG9yKSB7XG4gICAgdmFyIHBsb3QgICAgICAgPSB0aGlzLnBsb3RcbiAgICB2YXIgc2hhZGVyICAgICA9IHRoaXMuc2hhZGVyXG4gICAgdmFyIGdsICAgICAgICAgPSBwbG90LmdsXG5cbiAgICBsb1swXSA9IGxvWFxuICAgIGxvWzFdID0gbG9ZXG4gICAgaGlbMF0gPSBoaVhcbiAgICBoaVsxXSA9IGhpWVxuXG4gICAgc2hhZGVyLnVuaWZvcm1zLmxvICAgICA9IGxvXG4gICAgc2hhZGVyLnVuaWZvcm1zLmhpICAgICA9IGhpXG4gICAgc2hhZGVyLnVuaWZvcm1zLmNvbG9yICA9IGNvbG9yXG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KVxuICB9XG59KCkpXG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy52Ym8uZGlzcG9zZSgpXG4gIHRoaXMuc2hhZGVyLmRpc3Bvc2UoKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVCb3hlcyhwbG90KSB7XG4gIHZhciBnbCAgPSBwbG90LmdsXG4gIHZhciB2Ym8gPSBjcmVhdGVCdWZmZXIoZ2wsIFtcbiAgICAwLDAsXG4gICAgMCwxLFxuICAgIDEsMCxcbiAgICAxLDFdKVxuICB2YXIgc2hhZGVyICA9IGNyZWF0ZVNoYWRlcihnbCwgc2hhZGVycy5ib3hWZXJ0LCBzaGFkZXJzLmxpbmVGcmFnKVxuICByZXR1cm4gbmV3IEJveGVzKHBsb3QsIHZibywgc2hhZGVyKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlR3JpZFxuXG52YXIgY3JlYXRlQnVmZmVyICA9IHJlcXVpcmUoJ2dsLWJ1ZmZlcicpXG52YXIgY3JlYXRlU2hhZGVyICA9IHJlcXVpcmUoJ2dsLXNoYWRlcicpXG52YXIgYnNlYXJjaCAgICAgICA9IHJlcXVpcmUoJ2JpbmFyeS1zZWFyY2gtYm91bmRzJylcbnZhciBzaGFkZXJzICAgICAgID0gcmVxdWlyZSgnLi9zaGFkZXJzJylcblxuZnVuY3Rpb24gR3JpZChwbG90LCB2Ym8sIHNoYWRlciwgdGlja1NoYWRlcikge1xuICB0aGlzLnBsb3QgICA9IHBsb3RcbiAgdGhpcy52Ym8gICAgPSB2Ym9cbiAgdGhpcy5zaGFkZXIgPSBzaGFkZXJcbiAgdGhpcy50aWNrU2hhZGVyID0gdGlja1NoYWRlclxuICB0aGlzLnRpY2tzICA9IFtbXSwgW11dXG59XG5cbmZ1bmN0aW9uIGNvbXBhcmVUaWNrTnVtKGEsIGIpIHtcbiAgcmV0dXJuIGEgLSBiXG59XG5cbnZhciBwcm90byA9IEdyaWQucHJvdG90eXBlXG5cbnByb3RvLmRyYXcgPSAoZnVuY3Rpb24oKSB7XG5cbiAgdmFyIERBVEFfU0hJRlQgPSBbMCwwXVxuICB2YXIgREFUQV9TQ0FMRSA9IFswLDBdXG4gIHZhciBEQVRBX0FYSVMgID0gWzAsMF1cblxuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBsb3QgICAgICAgPSB0aGlzLnBsb3RcbiAgICB2YXIgdmJvICAgICAgICA9IHRoaXMudmJvXG4gICAgdmFyIHNoYWRlciAgICAgPSB0aGlzLnNoYWRlclxuICAgIHZhciB0aWNrcyAgICAgID0gdGhpcy50aWNrc1xuICAgIHZhciBnbCAgICAgICAgID0gcGxvdC5nbFxuICAgIHZhciBib3VuZHMgICAgID0gcGxvdC5fdGlja0JvdW5kc1xuICAgIHZhciBkYXRhQm94ICAgID0gcGxvdC5kYXRhQm94XG4gICAgdmFyIHZpZXdQaXhlbHMgPSBwbG90LnZpZXdCb3hcbiAgICB2YXIgbGluZVdpZHRoICA9IHBsb3QuZ3JpZExpbmVXaWR0aFxuICAgIHZhciBncmlkQ29sb3IgID0gcGxvdC5ncmlkTGluZUNvbG9yXG4gICAgdmFyIGdyaWRFbmFibGUgPSBwbG90LmdyaWRMaW5lRW5hYmxlXG4gICAgdmFyIHBpeGVsUmF0aW8gPSBwbG90LnBpeGVsUmF0aW9cblxuICAgIGZvcih2YXIgaT0wOyBpPDI7ICsraSkge1xuICAgICAgdmFyIGxvID0gYm91bmRzW2ldXG4gICAgICB2YXIgaGkgPSBib3VuZHNbaSsyXVxuICAgICAgdmFyIGJvdW5kU2NhbGUgPSBoaSAtIGxvXG4gICAgICB2YXIgZGF0YUNlbnRlciAgPSAwLjUgKiAoZGF0YUJveFtpKzJdICsgZGF0YUJveFtpXSlcbiAgICAgIHZhciBkYXRhV2lkdGggICA9IGRhdGFCb3hbaSsyXSAtIGRhdGFCb3hbaV1cbiAgICAgIERBVEFfU0NBTEVbaV0gPSAyLjAgKiBib3VuZFNjYWxlIC8gZGF0YVdpZHRoXG4gICAgICBEQVRBX1NISUZUW2ldID0gMi4wICogKGxvIC0gZGF0YUNlbnRlcikgLyBkYXRhV2lkdGhcbiAgICB9XG5cbiAgICBzaGFkZXIuYmluZCgpXG4gICAgdmJvLmJpbmQoKVxuICAgIHNoYWRlci5hdHRyaWJ1dGVzLmRhdGFDb29yZC5wb2ludGVyKClcbiAgICBzaGFkZXIudW5pZm9ybXMuZGF0YVNoaWZ0ID0gREFUQV9TSElGVFxuICAgIHNoYWRlci51bmlmb3Jtcy5kYXRhU2NhbGUgPSBEQVRBX1NDQUxFXG5cbiAgICB2YXIgb2Zmc2V0ID0gMFxuICAgIGZvcih2YXIgaT0wOyBpPDI7ICsraSkge1xuICAgICAgREFUQV9BWElTWzBdID0gREFUQV9BWElTWzFdID0gMFxuICAgICAgREFUQV9BWElTW2ldID0gMVxuICAgICAgc2hhZGVyLnVuaWZvcm1zLmRhdGFBeGlzICA9IERBVEFfQVhJU1xuICAgICAgc2hhZGVyLnVuaWZvcm1zLmxpbmVXaWR0aCA9IGxpbmVXaWR0aFtpXSAvICh2aWV3UGl4ZWxzW2krMl0gLSB2aWV3UGl4ZWxzW2ldKSAqIHBpeGVsUmF0aW9cbiAgICAgIHNoYWRlci51bmlmb3Jtcy5jb2xvciAgICAgPSBncmlkQ29sb3JbaV1cblxuICAgICAgdmFyIHNpemUgPSB0aWNrc1tpXS5sZW5ndGggKiA2XG4gICAgICBpZihncmlkRW5hYmxlW2ldICYmIHNpemUpIHtcbiAgICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIG9mZnNldCwgc2l6ZSlcbiAgICAgIH1cbiAgICAgIG9mZnNldCArPSBzaXplXG4gICAgfVxuICB9XG59KSgpXG5cbnByb3RvLmRyYXdUaWNrTWFya3MgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBEQVRBX1NISUZUID0gWzAsMF1cbiAgdmFyIERBVEFfU0NBTEUgPSBbMCwwXVxuICB2YXIgWF9BWElTICAgICA9IFsxLDBdXG4gIHZhciBZX0FYSVMgICAgID0gWzAsMV1cbiAgdmFyIFNDUl9PRkZTRVQgPSBbMCwwXVxuICB2YXIgVElDS19TQ0FMRSA9IFswLDBdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBwbG90ICAgICAgID0gdGhpcy5wbG90XG4gICAgdmFyIHZibyAgICAgICAgPSB0aGlzLnZib1xuICAgIHZhciBzaGFkZXIgICAgID0gdGhpcy50aWNrU2hhZGVyXG4gICAgdmFyIHRpY2tzICAgICAgPSB0aGlzLnRpY2tzXG4gICAgdmFyIGdsICAgICAgICAgPSBwbG90LmdsXG4gICAgdmFyIGJvdW5kcyAgICAgPSBwbG90Ll90aWNrQm91bmRzXG4gICAgdmFyIGRhdGFCb3ggICAgPSBwbG90LmRhdGFCb3hcbiAgICB2YXIgdmlld0JveCAgICA9IHBsb3Qudmlld0JveFxuICAgIHZhciBwaXhlbFJhdGlvID0gcGxvdC5waXhlbFJhdGlvXG4gICAgdmFyIHNjcmVlbkJveCAgPSBwbG90LnNjcmVlbkJveFxuXG4gICAgdmFyIHNjcmVlbldpZHRoICA9IHNjcmVlbkJveFsyXSAtIHNjcmVlbkJveFswXVxuICAgIHZhciBzY3JlZW5IZWlnaHQgPSBzY3JlZW5Cb3hbM10gLSBzY3JlZW5Cb3hbMV1cbiAgICB2YXIgdmlld1dpZHRoICAgID0gdmlld0JveFsyXSAgIC0gdmlld0JveFswXVxuICAgIHZhciB2aWV3SGVpZ2h0ICAgPSB2aWV3Qm94WzNdICAgLSB2aWV3Qm94WzFdXG5cbiAgICBmb3IodmFyIGk9MDsgaTwyOyArK2kpIHtcbiAgICAgIHZhciBsbyA9IGJvdW5kc1tpXVxuICAgICAgdmFyIGhpID0gYm91bmRzW2krMl1cbiAgICAgIHZhciBib3VuZFNjYWxlID0gaGkgLSBsb1xuICAgICAgdmFyIGRhdGFDZW50ZXIgID0gMC41ICogKGRhdGFCb3hbaSsyXSArIGRhdGFCb3hbaV0pXG4gICAgICB2YXIgZGF0YVdpZHRoICAgPSAoZGF0YUJveFtpKzJdIC0gZGF0YUJveFtpXSlcbiAgICAgIERBVEFfU0NBTEVbaV0gPSAyLjAgKiBib3VuZFNjYWxlIC8gZGF0YVdpZHRoXG4gICAgICBEQVRBX1NISUZUW2ldID0gMi4wICogKGxvIC0gZGF0YUNlbnRlcikgLyBkYXRhV2lkdGhcbiAgICB9XG5cbiAgICBEQVRBX1NDQUxFWzBdICo9IHZpZXdXaWR0aCAvIHNjcmVlbldpZHRoXG4gICAgREFUQV9TSElGVFswXSAqPSB2aWV3V2lkdGggLyBzY3JlZW5XaWR0aFxuXG4gICAgREFUQV9TQ0FMRVsxXSAqPSB2aWV3SGVpZ2h0IC8gc2NyZWVuSGVpZ2h0XG4gICAgREFUQV9TSElGVFsxXSAqPSB2aWV3SGVpZ2h0IC8gc2NyZWVuSGVpZ2h0XG5cbiAgICBzaGFkZXIuYmluZCgpXG4gICAgdmJvLmJpbmQoKVxuXG4gICAgc2hhZGVyLmF0dHJpYnV0ZXMuZGF0YUNvb3JkLnBvaW50ZXIoKVxuXG4gICAgdmFyIHVuaWZvcm1zID0gc2hhZGVyLnVuaWZvcm1zXG4gICAgdW5pZm9ybXMuZGF0YVNoaWZ0ID0gREFUQV9TSElGVFxuICAgIHVuaWZvcm1zLmRhdGFTY2FsZSA9IERBVEFfU0NBTEVcblxuICAgIHZhciB0aWNrTWFya0xlbmd0aCA9IHBsb3QudGlja01hcmtMZW5ndGhcbiAgICB2YXIgdGlja01hcmtXaWR0aCAgPSBwbG90LnRpY2tNYXJrV2lkdGhcbiAgICB2YXIgdGlja01hcmtDb2xvciAgPSBwbG90LnRpY2tNYXJrQ29sb3JcblxuICAgIHZhciB4VGlja3NPZmZzZXQgPSAwXG4gICAgdmFyIHlUaWNrc09mZnNldCA9IHRpY2tzWzBdLmxlbmd0aCAqIDZcblxuICAgIHZhciB4U3RhcnQgPSBNYXRoLm1pbihic2VhcmNoLmdlKHRpY2tzWzBdLCAoZGF0YUJveFswXSAtIGJvdW5kc1swXSkgLyAoYm91bmRzWzJdIC0gYm91bmRzWzBdKSwgY29tcGFyZVRpY2tOdW0pLCB0aWNrc1swXS5sZW5ndGgpXG4gICAgdmFyIHhFbmQgICA9IE1hdGgubWluKGJzZWFyY2guZ3QodGlja3NbMF0sIChkYXRhQm94WzJdIC0gYm91bmRzWzBdKSAvIChib3VuZHNbMl0gLSBib3VuZHNbMF0pLCBjb21wYXJlVGlja051bSksIHRpY2tzWzBdLmxlbmd0aClcbiAgICB2YXIgeE9mZnNldCA9IHhUaWNrc09mZnNldCArIDYgKiB4U3RhcnRcbiAgICB2YXIgeENvdW50ICA9IDYgKiBNYXRoLm1heCgwLCB4RW5kIC0geFN0YXJ0KVxuXG4gICAgdmFyIHlTdGFydCA9IE1hdGgubWluKGJzZWFyY2guZ2UodGlja3NbMV0sIChkYXRhQm94WzFdIC0gYm91bmRzWzFdKSAvIChib3VuZHNbM10gLSBib3VuZHNbMV0pLCBjb21wYXJlVGlja051bSksIHRpY2tzWzFdLmxlbmd0aClcbiAgICB2YXIgeUVuZCAgID0gTWF0aC5taW4oYnNlYXJjaC5ndCh0aWNrc1sxXSwgKGRhdGFCb3hbM10gLSBib3VuZHNbMV0pIC8gKGJvdW5kc1szXSAtIGJvdW5kc1sxXSksIGNvbXBhcmVUaWNrTnVtKSwgdGlja3NbMV0ubGVuZ3RoKVxuICAgIHZhciB5T2Zmc2V0ID0geVRpY2tzT2Zmc2V0ICsgNiAqIHlTdGFydFxuICAgIHZhciB5Q291bnQgID0gNiAqIE1hdGgubWF4KDAsIHlFbmQgLSB5U3RhcnQpXG5cbiAgICBTQ1JfT0ZGU0VUWzBdICAgICAgICAgPSAyLjAgKiAodmlld0JveFswXSAtIHRpY2tNYXJrTGVuZ3RoWzFdKSAvIHNjcmVlbldpZHRoIC0gMS4wXG4gICAgU0NSX09GRlNFVFsxXSAgICAgICAgID0gKHZpZXdCb3hbM10gKyB2aWV3Qm94WzFdKSAvIHNjcmVlbkhlaWdodCAtIDEuMFxuICAgIFRJQ0tfU0NBTEVbMF0gICAgICAgICA9IHRpY2tNYXJrTGVuZ3RoWzFdICogcGl4ZWxSYXRpbyAvIHNjcmVlbldpZHRoXG4gICAgVElDS19TQ0FMRVsxXSAgICAgICAgID0gdGlja01hcmtXaWR0aFsxXSAgKiBwaXhlbFJhdGlvIC8gc2NyZWVuSGVpZ2h0XG5cbiAgICBpZih5Q291bnQpIHtcbiAgICAgIHVuaWZvcm1zLmNvbG9yICAgICAgICA9IHRpY2tNYXJrQ29sb3JbMV1cbiAgICAgIHVuaWZvcm1zLnRpY2tTY2FsZSAgICA9IFRJQ0tfU0NBTEVcbiAgICAgIHVuaWZvcm1zLmRhdGFBeGlzICAgICA9IFlfQVhJU1xuICAgICAgdW5pZm9ybXMuc2NyZWVuT2Zmc2V0ID0gU0NSX09GRlNFVFxuICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIHlPZmZzZXQsIHlDb3VudClcbiAgICB9XG5cbiAgICBTQ1JfT0ZGU0VUWzBdICAgICAgICAgPSAodmlld0JveFsyXSArIHZpZXdCb3hbMF0pIC8gc2NyZWVuV2lkdGggLSAxLjBcbiAgICBTQ1JfT0ZGU0VUWzFdICAgICAgICAgPSAyLjAgKiAodmlld0JveFsxXSAtIHRpY2tNYXJrTGVuZ3RoWzBdKSAvIHNjcmVlbkhlaWdodCAtIDEuMFxuICAgIFRJQ0tfU0NBTEVbMF0gICAgICAgICA9IHRpY2tNYXJrV2lkdGhbMF0gICogcGl4ZWxSYXRpbyAvIHNjcmVlbldpZHRoXG4gICAgVElDS19TQ0FMRVsxXSAgICAgICAgID0gdGlja01hcmtMZW5ndGhbMF0gKiBwaXhlbFJhdGlvIC8gc2NyZWVuSGVpZ2h0XG5cbiAgICBpZih4Q291bnQpIHtcbiAgICAgIHVuaWZvcm1zLmNvbG9yICAgICAgICA9IHRpY2tNYXJrQ29sb3JbMF1cbiAgICAgIHVuaWZvcm1zLnRpY2tTY2FsZSAgICA9IFRJQ0tfU0NBTEVcbiAgICAgIHVuaWZvcm1zLmRhdGFBeGlzICAgICA9IFhfQVhJU1xuICAgICAgdW5pZm9ybXMuc2NyZWVuT2Zmc2V0ID0gU0NSX09GRlNFVFxuICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIHhPZmZzZXQsIHhDb3VudClcbiAgICB9XG5cbiAgICBTQ1JfT0ZGU0VUWzBdICAgICAgICAgPSAyLjAgKiAodmlld0JveFsyXSArIHRpY2tNYXJrTGVuZ3RoWzNdKSAvIHNjcmVlbldpZHRoIC0gMS4wXG4gICAgU0NSX09GRlNFVFsxXSAgICAgICAgID0gKHZpZXdCb3hbM10gKyB2aWV3Qm94WzFdKSAvIHNjcmVlbkhlaWdodCAtIDEuMFxuICAgIFRJQ0tfU0NBTEVbMF0gICAgICAgICA9IHRpY2tNYXJrTGVuZ3RoWzNdICogcGl4ZWxSYXRpbyAvIHNjcmVlbldpZHRoXG4gICAgVElDS19TQ0FMRVsxXSAgICAgICAgID0gdGlja01hcmtXaWR0aFszXSAgKiBwaXhlbFJhdGlvIC8gc2NyZWVuSGVpZ2h0XG5cbiAgICBpZih5Q291bnQpIHtcbiAgICAgIHVuaWZvcm1zLmNvbG9yICAgICAgICA9IHRpY2tNYXJrQ29sb3JbM11cbiAgICAgIHVuaWZvcm1zLnRpY2tTY2FsZSAgICA9IFRJQ0tfU0NBTEVcbiAgICAgIHVuaWZvcm1zLmRhdGFBeGlzICAgICA9IFlfQVhJU1xuICAgICAgdW5pZm9ybXMuc2NyZWVuT2Zmc2V0ID0gU0NSX09GRlNFVFxuICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIHlPZmZzZXQsIHlDb3VudClcbiAgICB9XG5cbiAgICBTQ1JfT0ZGU0VUWzBdICAgICAgICAgPSAodmlld0JveFsyXSArIHZpZXdCb3hbMF0pIC8gc2NyZWVuV2lkdGggLSAxLjBcbiAgICBTQ1JfT0ZGU0VUWzFdICAgICAgICAgPSAyLjAgKiAodmlld0JveFszXSArIHRpY2tNYXJrTGVuZ3RoWzJdKSAvIHNjcmVlbkhlaWdodCAtIDEuMFxuICAgIFRJQ0tfU0NBTEVbMF0gICAgICAgICA9IHRpY2tNYXJrV2lkdGhbMl0gICogcGl4ZWxSYXRpbyAvIHNjcmVlbldpZHRoXG4gICAgVElDS19TQ0FMRVsxXSAgICAgICAgID0gdGlja01hcmtMZW5ndGhbMl0gKiBwaXhlbFJhdGlvIC8gc2NyZWVuSGVpZ2h0XG5cbiAgICBpZih4Q291bnQpIHtcbiAgICAgIHVuaWZvcm1zLmNvbG9yICAgICAgICA9IHRpY2tNYXJrQ29sb3JbMl1cbiAgICAgIHVuaWZvcm1zLnRpY2tTY2FsZSAgICA9IFRJQ0tfU0NBTEVcbiAgICAgIHVuaWZvcm1zLmRhdGFBeGlzICAgICA9IFhfQVhJU1xuICAgICAgdW5pZm9ybXMuc2NyZWVuT2Zmc2V0ID0gU0NSX09GRlNFVFxuICAgICAgZ2wuZHJhd0FycmF5cyhnbC5UUklBTkdMRVMsIHhPZmZzZXQsIHhDb3VudClcbiAgICB9XG4gIH1cbn0pKClcblxucHJvdG8udXBkYXRlID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgT0ZGU0VUX1ggPSBbMSwgIDEsIC0xLCAtMSwgIDEsIC0xXVxuICB2YXIgT0ZGU0VUX1kgPSBbMSwgLTEsICAxLCAgMSwgLTEsIC0xXVxuXG4gIHJldHVybiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgdmFyIHRpY2tzICA9IG9wdGlvbnMudGlja3NcbiAgICB2YXIgYm91bmRzID0gb3B0aW9ucy5ib3VuZHNcbiAgICB2YXIgZGF0YSAgID0gbmV3IEZsb2F0MzJBcnJheSg2ICogMyAqICh0aWNrc1swXS5sZW5ndGggKyB0aWNrc1sxXS5sZW5ndGgpKVxuXG4gICAgdmFyIHplcm9MaW5lRW5hYmxlID0gdGhpcy5wbG90Lnplcm9MaW5lRW5hYmxlXG5cbiAgICB2YXIgcHRyICAgID0gMFxuICAgIHZhciBncmlkVGlja3MgPSBbW10sIFtdXVxuICAgIGZvcih2YXIgZGltPTA7IGRpbTwyOyArK2RpbSkge1xuICAgICAgdmFyIGxvY2FsVGlja3MgPSBncmlkVGlja3NbZGltXVxuICAgICAgdmFyIGF4aXNUaWNrcyA9IHRpY2tzW2RpbV1cbiAgICAgIHZhciBsbyA9IGJvdW5kc1tkaW1dXG4gICAgICB2YXIgaGkgPSBib3VuZHNbZGltKzJdXG4gICAgICBmb3IodmFyIGk9MDsgaTxheGlzVGlja3MubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHggPSAoYXhpc1RpY2tzW2ldLnggLSBsbykgLyAoaGkgLSBsbylcbiAgICAgICAgbG9jYWxUaWNrcy5wdXNoKHgpXG4gICAgICAgIGZvcih2YXIgaj0wOyBqPDY7ICsraikge1xuICAgICAgICAgIGRhdGFbcHRyKytdID0geFxuICAgICAgICAgIGRhdGFbcHRyKytdID0gT0ZGU0VUX1hbal1cbiAgICAgICAgICBkYXRhW3B0cisrXSA9IE9GRlNFVF9ZW2pdXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnRpY2tzID0gZ3JpZFRpY2tzXG4gICAgdGhpcy52Ym8udXBkYXRlKGRhdGEpXG4gIH1cbn0pKClcblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZiby5kaXNwb3NlKClcbiAgdGhpcy5zaGFkZXIuZGlzcG9zZSgpXG4gIHRoaXMudGlja1NoYWRlci5kaXNwb3NlKClcbn1cblxuZnVuY3Rpb24gY3JlYXRlR3JpZChwbG90KSB7XG4gIHZhciBnbCAgICAgPSBwbG90LmdsXG4gIHZhciB2Ym8gICAgPSBjcmVhdGVCdWZmZXIoZ2wpXG4gIHZhciBzaGFkZXIgPSBjcmVhdGVTaGFkZXIoZ2wsIHNoYWRlcnMuZ3JpZFZlcnQsIHNoYWRlcnMuZ3JpZEZyYWcpXG4gIHZhciB0aWNrU2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBzaGFkZXJzLnRpY2tWZXJ0LCBzaGFkZXJzLmdyaWRGcmFnKVxuICB2YXIgZ3JpZCAgID0gbmV3IEdyaWQocGxvdCwgdmJvLCBzaGFkZXIsIHRpY2tTaGFkZXIpXG4gIHJldHVybiBncmlkXG59XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVMaW5lc1xuXG52YXIgY3JlYXRlQnVmZmVyID0gcmVxdWlyZSgnZ2wtYnVmZmVyJylcbnZhciBjcmVhdGVTaGFkZXIgPSByZXF1aXJlKCdnbC1zaGFkZXInKVxuXG52YXIgc2hhZGVycyA9IHJlcXVpcmUoJy4vc2hhZGVycycpXG5cbmZ1bmN0aW9uIExpbmVzKHBsb3QsIHZibywgc2hhZGVyKSB7XG4gIHRoaXMucGxvdCAgID0gcGxvdFxuICB0aGlzLnZibyAgICA9IHZib1xuICB0aGlzLnNoYWRlciA9IHNoYWRlclxufVxuXG52YXIgcHJvdG8gPSBMaW5lcy5wcm90b3R5cGVcblxucHJvdG8uYmluZCA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc2hhZGVyID0gdGhpcy5zaGFkZXJcbiAgdGhpcy52Ym8uYmluZCgpXG4gIHRoaXMuc2hhZGVyLmJpbmQoKVxuICBzaGFkZXIuYXR0cmlidXRlcy5jb29yZC5wb2ludGVyKClcbiAgc2hhZGVyLnVuaWZvcm1zLnNjcmVlbkJveCA9IHRoaXMucGxvdC5zY3JlZW5Cb3hcbn1cblxucHJvdG8uZHJhd0xpbmUgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBzdGFydCA9IFswLDBdXG4gIHZhciBlbmQgICA9IFswLDBdXG4gIHJldHVybiBmdW5jdGlvbihzdGFydFgsIHN0YXJ0WSwgZW5kWCwgZW5kWSwgd2lkdGgsIGNvbG9yKSB7XG4gICAgdmFyIHBsb3QgICAgICAgPSB0aGlzLnBsb3RcbiAgICB2YXIgc2hhZGVyICAgICA9IHRoaXMuc2hhZGVyXG4gICAgdmFyIGdsICAgICAgICAgPSBwbG90LmdsXG5cbiAgICBzdGFydFswXSA9IHN0YXJ0WFxuICAgIHN0YXJ0WzFdID0gc3RhcnRZXG4gICAgZW5kWzBdICAgPSBlbmRYXG4gICAgZW5kWzFdICAgPSBlbmRZXG5cbiAgICBzaGFkZXIudW5pZm9ybXMuc3RhcnQgID0gc3RhcnRcbiAgICBzaGFkZXIudW5pZm9ybXMuZW5kICAgID0gZW5kXG4gICAgc2hhZGVyLnVuaWZvcm1zLndpZHRoICA9IHdpZHRoICogcGxvdC5waXhlbFJhdGlvXG4gICAgc2hhZGVyLnVuaWZvcm1zLmNvbG9yICA9IGNvbG9yXG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFX1NUUklQLCAwLCA0KVxuICB9XG59KCkpXG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy52Ym8uZGlzcG9zZSgpXG4gIHRoaXMuc2hhZGVyLmRpc3Bvc2UoKVxufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5lcyhwbG90KSB7XG4gIHZhciBnbCAgPSBwbG90LmdsXG4gIHZhciB2Ym8gPSBjcmVhdGVCdWZmZXIoZ2wsIFtcbiAgICAtMSwtMSxcbiAgICAtMSwxLFxuICAgIDEsLTEsXG4gICAgMSwxXSlcbiAgdmFyIHNoYWRlciAgPSBjcmVhdGVTaGFkZXIoZ2wsIHNoYWRlcnMubGluZVZlcnQsIHNoYWRlcnMubGluZUZyYWcpXG4gIHZhciBsaW5lcyAgID0gbmV3IExpbmVzKHBsb3QsIHZibywgc2hhZGVyKVxuICByZXR1cm4gbGluZXNcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZ2xzbGlmeSA9IHJlcXVpcmUoJ2dsc2xpZnknKVxuXG52YXIgRlJBR01FTlQgPSBnbHNsaWZ5KCcuL3NoYWRlcnMvZnJhZ21lbnQuZ2xzbCcpXG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBsaW5lVmVydDogZ2xzbGlmeSgnLi9zaGFkZXJzL2xpbmUtdmVydGV4Lmdsc2wnKSxcbiAgbGluZUZyYWc6IEZSQUdNRU5ULFxuICB0ZXh0VmVydDogZ2xzbGlmeSgnLi9zaGFkZXJzL3RleHQtdmVydGV4Lmdsc2wnKSxcbiAgdGV4dEZyYWc6IEZSQUdNRU5ULFxuICBncmlkVmVydDogZ2xzbGlmeSgnLi9zaGFkZXJzL2dyaWQtdmVydGV4Lmdsc2wnKSxcbiAgZ3JpZEZyYWc6IEZSQUdNRU5ULFxuICBib3hWZXJ0OiAgZ2xzbGlmeSgnLi9zaGFkZXJzL2JveC12ZXJ0ZXguZ2xzbCcpLFxuICB0aWNrVmVydDogZ2xzbGlmeSgnLi9zaGFkZXJzL3RpY2stdmVydGV4Lmdsc2wnKVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlVGV4dEVsZW1lbnRzXG5cbnZhciBjcmVhdGVCdWZmZXIgPSByZXF1aXJlKCdnbC1idWZmZXInKVxudmFyIGNyZWF0ZVNoYWRlciA9IHJlcXVpcmUoJ2dsLXNoYWRlcicpXG52YXIgZ2V0VGV4dCAgICAgID0gcmVxdWlyZSgndGV4dC1jYWNoZScpXG52YXIgYnNlYXJjaCAgICAgID0gcmVxdWlyZSgnYmluYXJ5LXNlYXJjaC1ib3VuZHMnKVxudmFyIHNoYWRlcnMgICAgICA9IHJlcXVpcmUoJy4vc2hhZGVycycpXG5cbmZ1bmN0aW9uIFRleHRFbGVtZW50cyhwbG90LCB2Ym8sIHNoYWRlcikge1xuICB0aGlzLnBsb3QgICAgICAgICA9IHBsb3RcbiAgdGhpcy52Ym8gICAgICAgICAgPSB2Ym9cbiAgdGhpcy5zaGFkZXIgICAgICAgPSBzaGFkZXJcbiAgdGhpcy50aWNrT2Zmc2V0ICAgPSBbW10sW11dXG4gIHRoaXMudGlja1ggICAgICAgID0gW1tdLFtdXVxuICB0aGlzLmxhYmVsT2Zmc2V0ICA9IFswLDBdXG4gIHRoaXMubGFiZWxDb3VudCAgID0gWzAsMF1cbn1cblxudmFyIHByb3RvID0gVGV4dEVsZW1lbnRzLnByb3RvdHlwZVxuXG5wcm90by5kcmF3VGlja3MgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBEQVRBX0FYSVMgPSBbMCwwXVxuICB2YXIgU0NSRUVOX09GRlNFVCA9IFswLDBdXG4gIHZhciBaRVJPXzIgPSBbMCwwXVxuXG4gIHJldHVybiBmdW5jdGlvbihheGlzKSB7XG4gICAgdmFyIHBsb3QgICAgICAgID0gdGhpcy5wbG90XG4gICAgdmFyIHNoYWRlciAgICAgID0gdGhpcy5zaGFkZXJcbiAgICB2YXIgdGlja1ggICAgICAgPSB0aGlzLnRpY2tYW2F4aXNdXG4gICAgdmFyIHRpY2tPZmZzZXQgID0gdGhpcy50aWNrT2Zmc2V0W2F4aXNdXG4gICAgdmFyIGdsICAgICAgICAgID0gcGxvdC5nbFxuICAgIHZhciB2aWV3Qm94ICAgICA9IHBsb3Qudmlld0JveFxuICAgIHZhciBkYXRhQm94ICAgICA9IHBsb3QuZGF0YUJveFxuICAgIHZhciBzY3JlZW5Cb3ggICA9IHBsb3Quc2NyZWVuQm94XG4gICAgdmFyIHBpeGVsUmF0aW8gID0gcGxvdC5waXhlbFJhdGlvXG4gICAgdmFyIHRpY2tFbmFibGUgID0gcGxvdC50aWNrRW5hYmxlXG4gICAgdmFyIHRpY2tQYWQgICAgID0gcGxvdC50aWNrUGFkXG4gICAgdmFyIHRleHRDb2xvciAgID0gcGxvdC50aWNrQ29sb3JcbiAgICB2YXIgdGV4dEFuZ2xlICAgPSBwbG90LnRpY2tBbmdsZVxuICAgIC8vIHRvZG8gY2hlY2sgaWYgdGhpcyBzaG91bGQgYmUgdXNlZCAobm93IHVudXNlZClcbiAgICAvLyB2YXIgdGlja0xlbmd0aCAgPSBwbG90LnRpY2tNYXJrTGVuZ3RoXG5cbiAgICB2YXIgbGFiZWxFbmFibGUgPSBwbG90LmxhYmVsRW5hYmxlXG4gICAgdmFyIGxhYmVsUGFkICAgID0gcGxvdC5sYWJlbFBhZFxuICAgIHZhciBsYWJlbENvbG9yICA9IHBsb3QubGFiZWxDb2xvclxuICAgIHZhciBsYWJlbEFuZ2xlICA9IHBsb3QubGFiZWxBbmdsZVxuICAgIHZhciBsYWJlbE9mZnNldCA9IHRoaXMubGFiZWxPZmZzZXRbYXhpc11cbiAgICB2YXIgbGFiZWxDb3VudCAgPSB0aGlzLmxhYmVsQ291bnRbYXhpc11cblxuICAgIHZhciBzdGFydCA9IGJzZWFyY2gubHQodGlja1gsIGRhdGFCb3hbYXhpc10pXG4gICAgdmFyIGVuZCAgID0gYnNlYXJjaC5sZSh0aWNrWCwgZGF0YUJveFtheGlzKzJdKVxuXG4gICAgREFUQV9BWElTWzBdICAgID0gREFUQV9BWElTWzFdID0gMFxuICAgIERBVEFfQVhJU1theGlzXSA9IDFcblxuICAgIFNDUkVFTl9PRkZTRVRbYXhpc10gPSAodmlld0JveFsyK2F4aXNdICsgdmlld0JveFtheGlzXSkgLyAoc2NyZWVuQm94WzIrYXhpc10gLSBzY3JlZW5Cb3hbYXhpc10pIC0gMS4wXG5cbiAgICB2YXIgc2NyZWVuU2NhbGUgPSAyLjAgLyBzY3JlZW5Cb3hbMisoYXhpc14xKV0gLSBzY3JlZW5Cb3hbYXhpc14xXVxuXG4gICAgU0NSRUVOX09GRlNFVFtheGlzXjFdID0gc2NyZWVuU2NhbGUgKiB2aWV3Qm94W2F4aXNeMV0gLSAxLjBcbiAgICBpZih0aWNrRW5hYmxlW2F4aXNdKSB7XG4gICAgICBTQ1JFRU5fT0ZGU0VUW2F4aXNeMV0gLT0gc2NyZWVuU2NhbGUgKiBwaXhlbFJhdGlvICogdGlja1BhZFtheGlzXVxuICAgICAgaWYoc3RhcnQgPCBlbmQgJiYgdGlja09mZnNldFtlbmRdID4gdGlja09mZnNldFtzdGFydF0pIHtcbiAgICAgICAgc2hhZGVyLnVuaWZvcm1zLmRhdGFBeGlzICAgICA9IERBVEFfQVhJU1xuICAgICAgICBzaGFkZXIudW5pZm9ybXMuc2NyZWVuT2Zmc2V0ID0gU0NSRUVOX09GRlNFVFxuICAgICAgICBzaGFkZXIudW5pZm9ybXMuY29sb3IgICAgICAgID0gdGV4dENvbG9yW2F4aXNdXG4gICAgICAgIHNoYWRlci51bmlmb3Jtcy5hbmdsZSAgICAgICAgPSB0ZXh0QW5nbGVbYXhpc11cbiAgICAgICAgZ2wuZHJhd0FycmF5cyhcbiAgICAgICAgICBnbC5UUklBTkdMRVMsXG4gICAgICAgICAgdGlja09mZnNldFtzdGFydF0sXG4gICAgICAgICAgdGlja09mZnNldFtlbmRdIC0gdGlja09mZnNldFtzdGFydF0pXG4gICAgICB9XG4gICAgfVxuICAgIGlmKGxhYmVsRW5hYmxlW2F4aXNdICYmIGxhYmVsQ291bnQpIHtcbiAgICAgIFNDUkVFTl9PRkZTRVRbYXhpc14xXSAtPSBzY3JlZW5TY2FsZSAqIHBpeGVsUmF0aW8gKiBsYWJlbFBhZFtheGlzXVxuICAgICAgc2hhZGVyLnVuaWZvcm1zLmRhdGFBeGlzICAgICA9IFpFUk9fMlxuICAgICAgc2hhZGVyLnVuaWZvcm1zLnNjcmVlbk9mZnNldCA9IFNDUkVFTl9PRkZTRVRcbiAgICAgIHNoYWRlci51bmlmb3Jtcy5jb2xvciAgICAgICAgPSBsYWJlbENvbG9yW2F4aXNdXG4gICAgICBzaGFkZXIudW5pZm9ybXMuYW5nbGUgICAgICAgID0gbGFiZWxBbmdsZVtheGlzXVxuICAgICAgZ2wuZHJhd0FycmF5cyhcbiAgICAgICAgZ2wuVFJJQU5HTEVTLFxuICAgICAgICBsYWJlbE9mZnNldCxcbiAgICAgICAgbGFiZWxDb3VudClcbiAgICB9XG5cbiAgICBTQ1JFRU5fT0ZGU0VUW2F4aXNeMV0gPSBzY3JlZW5TY2FsZSAqIHZpZXdCb3hbMisoYXhpc14xKV0gLSAxLjBcbiAgICBpZih0aWNrRW5hYmxlW2F4aXMrMl0pIHtcbiAgICAgIFNDUkVFTl9PRkZTRVRbYXhpc14xXSArPSBzY3JlZW5TY2FsZSAqIHBpeGVsUmF0aW8gKiB0aWNrUGFkW2F4aXMrMl1cbiAgICAgIGlmKHN0YXJ0IDwgZW5kICYmIHRpY2tPZmZzZXRbZW5kXSA+IHRpY2tPZmZzZXRbc3RhcnRdKSB7XG4gICAgICAgIHNoYWRlci51bmlmb3Jtcy5kYXRhQXhpcyAgICAgPSBEQVRBX0FYSVNcbiAgICAgICAgc2hhZGVyLnVuaWZvcm1zLnNjcmVlbk9mZnNldCA9IFNDUkVFTl9PRkZTRVRcbiAgICAgICAgc2hhZGVyLnVuaWZvcm1zLmNvbG9yICAgICAgICA9IHRleHRDb2xvcltheGlzKzJdXG4gICAgICAgIHNoYWRlci51bmlmb3Jtcy5hbmdsZSAgICAgICAgPSB0ZXh0QW5nbGVbYXhpcysyXVxuICAgICAgICBnbC5kcmF3QXJyYXlzKFxuICAgICAgICAgIGdsLlRSSUFOR0xFUyxcbiAgICAgICAgICB0aWNrT2Zmc2V0W3N0YXJ0XSxcbiAgICAgICAgICB0aWNrT2Zmc2V0W2VuZF0gLSB0aWNrT2Zmc2V0W3N0YXJ0XSlcbiAgICAgIH1cbiAgICB9XG4gICAgaWYobGFiZWxFbmFibGVbYXhpcysyXSAmJiBsYWJlbENvdW50KSB7XG4gICAgICBTQ1JFRU5fT0ZGU0VUW2F4aXNeMV0gKz0gc2NyZWVuU2NhbGUgKiBwaXhlbFJhdGlvICogbGFiZWxQYWRbYXhpcysyXVxuICAgICAgc2hhZGVyLnVuaWZvcm1zLmRhdGFBeGlzICAgICA9IFpFUk9fMlxuICAgICAgc2hhZGVyLnVuaWZvcm1zLnNjcmVlbk9mZnNldCA9IFNDUkVFTl9PRkZTRVRcbiAgICAgIHNoYWRlci51bmlmb3Jtcy5jb2xvciAgICAgICAgPSBsYWJlbENvbG9yW2F4aXMrMl1cbiAgICAgIHNoYWRlci51bmlmb3Jtcy5hbmdsZSAgICAgICAgPSBsYWJlbEFuZ2xlW2F4aXMrMl1cbiAgICAgIGdsLmRyYXdBcnJheXMoXG4gICAgICAgIGdsLlRSSUFOR0xFUyxcbiAgICAgICAgbGFiZWxPZmZzZXQsXG4gICAgICAgIGxhYmVsQ291bnQpXG4gICAgfVxuXG4gIH1cbn0pKClcblxucHJvdG8uZHJhd1RpdGxlID0gKGZ1bmN0aW9uKCkge1xuICB2YXIgREFUQV9BWElTID0gWzAsMF1cbiAgdmFyIFNDUkVFTl9PRkZTRVQgPSBbMCwwXVxuXG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgcGxvdCAgICAgICAgPSB0aGlzLnBsb3RcbiAgICB2YXIgc2hhZGVyICAgICAgPSB0aGlzLnNoYWRlclxuICAgIHZhciBnbCAgICAgICAgICA9IHBsb3QuZ2xcbiAgICB2YXIgc2NyZWVuQm94ICAgPSBwbG90LnNjcmVlbkJveFxuICAgIHZhciB0aXRsZUNlbnRlciA9IHBsb3QudGl0bGVDZW50ZXJcbiAgICB2YXIgdGl0bGVBbmdsZSAgPSBwbG90LnRpdGxlQW5nbGVcbiAgICB2YXIgdGl0bGVDb2xvciAgPSBwbG90LnRpdGxlQ29sb3JcbiAgICB2YXIgcGl4ZWxSYXRpbyAgPSBwbG90LnBpeGVsUmF0aW9cblxuICAgIGlmKCF0aGlzLnRpdGxlQ291bnQpIHtcbiAgICAgIHJldHVyblxuICAgIH1cblxuICAgIGZvcih2YXIgaT0wOyBpPDI7ICsraSkge1xuICAgICAgU0NSRUVOX09GRlNFVFtpXSA9IDIuMCAqICh0aXRsZUNlbnRlcltpXSpwaXhlbFJhdGlvIC0gc2NyZWVuQm94W2ldKSAvXG4gICAgICAgIChzY3JlZW5Cb3hbMitpXSAtIHNjcmVlbkJveFtpXSkgLSAxXG4gICAgfVxuXG4gICAgc2hhZGVyLmJpbmQoKVxuICAgIHNoYWRlci51bmlmb3Jtcy5kYXRhQXhpcyAgICAgID0gREFUQV9BWElTXG4gICAgc2hhZGVyLnVuaWZvcm1zLnNjcmVlbk9mZnNldCAgPSBTQ1JFRU5fT0ZGU0VUXG4gICAgc2hhZGVyLnVuaWZvcm1zLmFuZ2xlICAgICAgICAgPSB0aXRsZUFuZ2xlXG4gICAgc2hhZGVyLnVuaWZvcm1zLmNvbG9yICAgICAgICAgPSB0aXRsZUNvbG9yXG5cbiAgICBnbC5kcmF3QXJyYXlzKGdsLlRSSUFOR0xFUywgdGhpcy50aXRsZU9mZnNldCwgdGhpcy50aXRsZUNvdW50KVxuICB9XG59KSgpXG5cbnByb3RvLmJpbmQgPSAoZnVuY3Rpb24oKSB7XG4gIHZhciBEQVRBX1NISUZUID0gWzAsMF1cbiAgdmFyIERBVEFfU0NBTEUgPSBbMCwwXVxuICB2YXIgVEVYVF9TQ0FMRSA9IFswLDBdXG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBwbG90ICAgICAgPSB0aGlzLnBsb3RcbiAgICB2YXIgc2hhZGVyICAgID0gdGhpcy5zaGFkZXJcbiAgICB2YXIgYm91bmRzICAgID0gcGxvdC5fdGlja0JvdW5kc1xuICAgIHZhciBkYXRhQm94ICAgPSBwbG90LmRhdGFCb3hcbiAgICB2YXIgc2NyZWVuQm94ID0gcGxvdC5zY3JlZW5Cb3hcbiAgICB2YXIgdmlld0JveCAgID0gcGxvdC52aWV3Qm94XG5cbiAgICBzaGFkZXIuYmluZCgpXG5cbiAgICAvL1NldCB1cCBjb29yZGluYXRlIHNjYWxpbmcgdW5pZm9ybXNcbiAgICBmb3IodmFyIGk9MDsgaTwyOyArK2kpIHtcblxuICAgICAgdmFyIGxvID0gYm91bmRzW2ldXG4gICAgICB2YXIgaGkgPSBib3VuZHNbaSsyXVxuICAgICAgdmFyIGJvdW5kU2NhbGUgPSBoaSAtIGxvXG4gICAgICB2YXIgZGF0YUNlbnRlciAgPSAwLjUgKiAoZGF0YUJveFtpKzJdICsgZGF0YUJveFtpXSlcbiAgICAgIHZhciBkYXRhV2lkdGggICA9IChkYXRhQm94W2krMl0gLSBkYXRhQm94W2ldKVxuXG4gICAgICB2YXIgdmlld0xvID0gdmlld0JveFtpXVxuICAgICAgdmFyIHZpZXdIaSA9IHZpZXdCb3hbaSsyXVxuICAgICAgdmFyIHZpZXdTY2FsZSA9IHZpZXdIaSAtIHZpZXdMb1xuICAgICAgdmFyIHNjcmVlbkxvID0gc2NyZWVuQm94W2ldXG4gICAgICB2YXIgc2NyZWVuSGkgPSBzY3JlZW5Cb3hbaSsyXVxuICAgICAgdmFyIHNjcmVlblNjYWxlID0gc2NyZWVuSGkgLSBzY3JlZW5Mb1xuXG4gICAgICBEQVRBX1NDQUxFW2ldID0gMi4wICogYm91bmRTY2FsZSAvIGRhdGFXaWR0aCAqIHZpZXdTY2FsZSAvIHNjcmVlblNjYWxlXG4gICAgICBEQVRBX1NISUZUW2ldID0gMi4wICogKGxvIC0gZGF0YUNlbnRlcikgLyBkYXRhV2lkdGggKiB2aWV3U2NhbGUgLyBzY3JlZW5TY2FsZVxuICAgIH1cblxuICAgIFRFWFRfU0NBTEVbMV0gPSAyLjAgKiBwbG90LnBpeGVsUmF0aW8gLyAoc2NyZWVuQm94WzNdIC0gc2NyZWVuQm94WzFdKVxuICAgIFRFWFRfU0NBTEVbMF0gPSBURVhUX1NDQUxFWzFdICogKHNjcmVlbkJveFszXSAtIHNjcmVlbkJveFsxXSkgLyAoc2NyZWVuQm94WzJdIC0gc2NyZWVuQm94WzBdKVxuXG4gICAgc2hhZGVyLnVuaWZvcm1zLmRhdGFTY2FsZSA9IERBVEFfU0NBTEVcbiAgICBzaGFkZXIudW5pZm9ybXMuZGF0YVNoaWZ0ID0gREFUQV9TSElGVFxuICAgIHNoYWRlci51bmlmb3Jtcy50ZXh0U2NhbGUgPSBURVhUX1NDQUxFXG5cbiAgICAvL1NldCBhdHRyaWJ1dGVzXG4gICAgdGhpcy52Ym8uYmluZCgpXG4gICAgc2hhZGVyLmF0dHJpYnV0ZXMudGV4dENvb3JkaW5hdGUucG9pbnRlcigpXG4gIH1cbn0pKClcblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB2YXIgdmVydGljZXMgID0gW11cbiAgdmFyIGF4ZXNUaWNrcyA9IG9wdGlvbnMudGlja3NcbiAgdmFyIGJvdW5kcyAgICA9IG9wdGlvbnMuYm91bmRzXG4gIHZhciBpLCBqLCBrLCBkYXRhLCBzY2FsZSwgZGltZW5zaW9uXG5cbiAgZm9yKGRpbWVuc2lvbj0wOyBkaW1lbnNpb248MjsgKytkaW1lbnNpb24pIHtcbiAgICB2YXIgb2Zmc2V0cyA9IFtNYXRoLmZsb29yKHZlcnRpY2VzLmxlbmd0aC8zKV0sIHRpY2tYID0gWy1JbmZpbml0eV1cblxuICAgIC8vQ29weSB2ZXJ0aWNlcyBvdmVyIHRvIGJ1ZmZlclxuICAgIHZhciB0aWNrcyA9IGF4ZXNUaWNrc1tkaW1lbnNpb25dXG4gICAgZm9yKGk9MDsgaTx0aWNrcy5sZW5ndGg7ICsraSkge1xuICAgICAgdmFyIHRpY2sgID0gdGlja3NbaV1cbiAgICAgIHZhciB4ICAgICA9IHRpY2sueFxuICAgICAgdmFyIHRleHQgID0gdGljay50ZXh0XG4gICAgICB2YXIgZm9udCAgPSB0aWNrLmZvbnQgfHwgJ3NhbnMtc2VyaWYnXG4gICAgICBzY2FsZSA9ICh0aWNrLmZvbnRTaXplIHx8IDEyKVxuXG4gICAgICB2YXIgY29vcmRTY2FsZSA9IDEuMCAvIChib3VuZHNbZGltZW5zaW9uKzJdIC0gYm91bmRzW2RpbWVuc2lvbl0pXG4gICAgICB2YXIgY29vcmRTaGlmdCA9IGJvdW5kc1tkaW1lbnNpb25dXG5cbiAgICAgIHZhciByb3dzID0gdGV4dC5zcGxpdCgnXFxuJylcbiAgICAgIGZvcih2YXIgciA9IDA7IHIgPCByb3dzLmxlbmd0aDsgcisrKSB7XG4gICAgICAgIGRhdGEgPSBnZXRUZXh0KGZvbnQsIHJvd3Nbcl0pLmRhdGFcbiAgICAgICAgZm9yIChqID0gMDsgaiA8IGRhdGEubGVuZ3RoOyBqICs9IDIpIHtcbiAgICAgICAgICB2ZXJ0aWNlcy5wdXNoKFxuICAgICAgICAgICAgICBkYXRhW2pdICogc2NhbGUsXG4gICAgICAgICAgICAgIC1kYXRhW2ogKyAxXSAqIHNjYWxlIC0gciAqIHNjYWxlICogMS4yLFxuICAgICAgICAgICAgICAoeCAtIGNvb3JkU2hpZnQpICogY29vcmRTY2FsZSlcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBvZmZzZXRzLnB1c2goTWF0aC5mbG9vcih2ZXJ0aWNlcy5sZW5ndGgvMykpXG4gICAgICB0aWNrWC5wdXNoKHgpXG4gICAgfVxuXG4gICAgdGhpcy50aWNrT2Zmc2V0W2RpbWVuc2lvbl0gPSBvZmZzZXRzXG4gICAgdGhpcy50aWNrWFtkaW1lbnNpb25dID0gdGlja1hcbiAgfVxuXG4gIC8vQWRkIGxhYmVsc1xuICBmb3IoZGltZW5zaW9uPTA7IGRpbWVuc2lvbjwyOyArK2RpbWVuc2lvbikge1xuICAgIHRoaXMubGFiZWxPZmZzZXRbZGltZW5zaW9uXSA9IE1hdGguZmxvb3IodmVydGljZXMubGVuZ3RoLzMpXG5cbiAgICBkYXRhICA9IGdldFRleHQob3B0aW9ucy5sYWJlbEZvbnRbZGltZW5zaW9uXSwgb3B0aW9ucy5sYWJlbHNbZGltZW5zaW9uXSwgeyB0ZXh0QWxpZ246ICdjZW50ZXInIH0pLmRhdGFcbiAgICBzY2FsZSA9IG9wdGlvbnMubGFiZWxTaXplW2RpbWVuc2lvbl1cbiAgICBmb3IoaT0wOyBpPGRhdGEubGVuZ3RoOyBpKz0yKSB7XG4gICAgICB2ZXJ0aWNlcy5wdXNoKGRhdGFbaV0qc2NhbGUsIC1kYXRhW2krMV0qc2NhbGUsIDApXG4gICAgfVxuXG4gICAgdGhpcy5sYWJlbENvdW50W2RpbWVuc2lvbl0gPVxuICAgICAgTWF0aC5mbG9vcih2ZXJ0aWNlcy5sZW5ndGgvMykgLSB0aGlzLmxhYmVsT2Zmc2V0W2RpbWVuc2lvbl1cbiAgfVxuXG4gIC8vQWRkIHRpdGxlXG4gIHRoaXMudGl0bGVPZmZzZXQgPSBNYXRoLmZsb29yKHZlcnRpY2VzLmxlbmd0aC8zKVxuICBkYXRhID0gZ2V0VGV4dChvcHRpb25zLnRpdGxlRm9udCwgb3B0aW9ucy50aXRsZSkuZGF0YVxuICBzY2FsZSA9IG9wdGlvbnMudGl0bGVTaXplXG4gIGZvcihpPTA7IGk8ZGF0YS5sZW5ndGg7IGkrPTIpIHtcbiAgICB2ZXJ0aWNlcy5wdXNoKGRhdGFbaV0qc2NhbGUsIC1kYXRhW2krMV0qc2NhbGUsIDApXG4gIH1cbiAgdGhpcy50aXRsZUNvdW50ID0gTWF0aC5mbG9vcih2ZXJ0aWNlcy5sZW5ndGgvMykgLSB0aGlzLnRpdGxlT2Zmc2V0XG5cbiAgLy9VcGxvYWQgbmV3IHZlcnRpY2VzXG4gIHRoaXMudmJvLnVwZGF0ZSh2ZXJ0aWNlcylcbn1cblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnZiby5kaXNwb3NlKClcbiAgdGhpcy5zaGFkZXIuZGlzcG9zZSgpXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50cyhwbG90KSB7XG4gIHZhciBnbCA9IHBsb3QuZ2xcbiAgdmFyIHZibyA9IGNyZWF0ZUJ1ZmZlcihnbClcbiAgdmFyIHNoYWRlciA9IGNyZWF0ZVNoYWRlcihnbCwgc2hhZGVycy50ZXh0VmVydCwgc2hhZGVycy50ZXh0RnJhZylcbiAgdmFyIHRleHQgPSBuZXcgVGV4dEVsZW1lbnRzKHBsb3QsIHZibywgc2hhZGVyKVxuICByZXR1cm4gdGV4dFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlR0xQbG90MkRcblxudmFyIGNyZWF0ZVBpY2sgPSByZXF1aXJlKCdnbC1zZWxlY3Qtc3RhdGljJylcblxudmFyIGNyZWF0ZUdyaWQgPSByZXF1aXJlKCcuL2xpYi9ncmlkJylcbnZhciBjcmVhdGVUZXh0ID0gcmVxdWlyZSgnLi9saWIvdGV4dCcpXG52YXIgY3JlYXRlTGluZSA9IHJlcXVpcmUoJy4vbGliL2xpbmUnKVxudmFyIGNyZWF0ZUJveCAgPSByZXF1aXJlKCcuL2xpYi9ib3gnKVxuXG5mdW5jdGlvbiBHTFBsb3QyRChnbCwgcGlja0J1ZmZlcikge1xuICB0aGlzLmdsICAgICAgICAgICAgICAgPSBnbFxuICB0aGlzLnBpY2tCdWZmZXIgICAgICAgPSBwaWNrQnVmZmVyXG5cbiAgdGhpcy5zY3JlZW5Cb3ggICAgICAgID0gWzAsIDAsIGdsLmRyYXdpbmdCdWZmZXJXaWR0aCwgZ2wuZHJhd2luZ0J1ZmZlckhlaWdodF1cbiAgdGhpcy52aWV3Qm94ICAgICAgICAgID0gWzAsIDAsIDAsIDBdXG4gIHRoaXMuZGF0YUJveCAgICAgICAgICA9IFstMTAsIC0xMCwgMTAsIDEwXVxuXG4gIHRoaXMuZ3JpZExpbmVFbmFibGUgICA9IFt0cnVlLHRydWVdXG4gIHRoaXMuZ3JpZExpbmVXaWR0aCAgICA9IFsxLDFdXG4gIHRoaXMuZ3JpZExpbmVDb2xvciAgICA9IFtbMCwwLDAsMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbMCwwLDAsMV1dXG5cbiAgdGhpcy5waXhlbFJhdGlvICAgICAgID0gMVxuXG4gIHRoaXMudGlja01hcmtMZW5ndGggICA9IFswLDAsMCwwXVxuICB0aGlzLnRpY2tNYXJrV2lkdGggICAgPSBbMCwwLDAsMF1cbiAgdGhpcy50aWNrTWFya0NvbG9yICAgID0gW1swLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFswLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFswLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFswLDAsMCwxXV1cblxuICB0aGlzLnRpY2tQYWQgICAgICAgICAgPSBbMTUsMTUsMTUsMTVdXG4gIHRoaXMudGlja0FuZ2xlICAgICAgICA9IFswLDAsMCwwXVxuICB0aGlzLnRpY2tFbmFibGUgICAgICAgPSBbdHJ1ZSx0cnVlLHRydWUsdHJ1ZV1cbiAgdGhpcy50aWNrQ29sb3IgICAgICAgID0gW1swLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFswLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFswLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIFswLDAsMCwxXV1cblxuICB0aGlzLmxhYmVsUGFkICAgICAgICAgPSBbMTUsMTUsMTUsMTVdXG4gIHRoaXMubGFiZWxBbmdsZSAgICAgICA9IFswLE1hdGguUEkvMiwwLDMuMCpNYXRoLlBJLzJdXG4gIHRoaXMubGFiZWxFbmFibGUgICAgICA9IFt0cnVlLHRydWUsdHJ1ZSx0cnVlXVxuICB0aGlzLmxhYmVsQ29sb3IgICAgICAgPSBbWzAsMCwwLDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgWzAsMCwwLDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgWzAsMCwwLDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgWzAsMCwwLDFdXVxuXG4gIHRoaXMudGl0bGVDZW50ZXIgICAgICA9IFswLDBdXG4gIHRoaXMudGl0bGVFbmFibGUgICAgICA9IHRydWVcbiAgdGhpcy50aXRsZUFuZ2xlICAgICAgID0gMFxuICB0aGlzLnRpdGxlQ29sb3IgICAgICAgPSBbMCwwLDAsMV1cblxuICB0aGlzLmJvcmRlckNvbG9yICAgICAgPSBbMCwwLDAsMF1cbiAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgID0gWzAsMCwwLDBdXG5cbiAgdGhpcy56ZXJvTGluZUVuYWJsZSAgID0gW3RydWUsIHRydWVdXG4gIHRoaXMuemVyb0xpbmVXaWR0aCAgICA9IFs0LCA0XVxuICB0aGlzLnplcm9MaW5lQ29sb3IgICAgPSBbWzAsIDAsIDAsIDFdLFswLCAwLCAwLCAxXV1cblxuICB0aGlzLmJvcmRlckxpbmVFbmFibGUgPSBbdHJ1ZSx0cnVlLHRydWUsdHJ1ZV1cbiAgdGhpcy5ib3JkZXJMaW5lV2lkdGggID0gWzIsMiwyLDJdXG4gIHRoaXMuYm9yZGVyTGluZUNvbG9yICA9IFtbMCwwLDAsMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbMCwwLDAsMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbMCwwLDAsMV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBbMCwwLDAsMV1dXG5cbiAgLy9EcmF3aW5nIHBhcmFtZXRlcnNcbiAgdGhpcy5ncmlkICAgICAgICAgICAgID0gbnVsbFxuICB0aGlzLnRleHQgICAgICAgICAgICAgPSBudWxsXG4gIHRoaXMubGluZSAgICAgICAgICAgICA9IG51bGxcbiAgdGhpcy5ib3ggICAgICAgICAgICAgID0gbnVsbFxuICB0aGlzLm9iamVjdHMgICAgICAgICAgPSBbXVxuICB0aGlzLm92ZXJsYXlzICAgICAgICAgPSBbXVxuXG4gIHRoaXMuX3RpY2tCb3VuZHMgICAgICA9IFtJbmZpbml0eSwgSW5maW5pdHksIC1JbmZpbml0eSwgLUluZmluaXR5XVxuXG4gIHRoaXMuc3RhdGljID0gZmFsc2VcblxuICB0aGlzLmRpcnR5ICAgICAgICA9IGZhbHNlXG4gIHRoaXMucGlja0RpcnR5ICAgID0gZmFsc2VcbiAgdGhpcy5waWNrRGVsYXkgICAgPSAxMjBcbiAgdGhpcy5waWNrUmFkaXVzICAgPSAxMFxuICB0aGlzLl9waWNrVGltZW91dCA9IG51bGxcbiAgdGhpcy5fZHJhd1BpY2sgICAgPSB0aGlzLmRyYXdQaWNrLmJpbmQodGhpcylcblxuICB0aGlzLl9kZXB0aENvdW50ZXIgPSAwXG59XG5cbnZhciBwcm90byA9IEdMUGxvdDJELnByb3RvdHlwZVxuXG5wcm90by5zZXREaXJ0eSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpcnR5ID0gdGhpcy5waWNrRGlydHkgPSB0cnVlXG59XG5cbnByb3RvLnNldE92ZXJsYXlEaXJ0eSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLmRpcnR5ID0gdHJ1ZVxufVxuXG5wcm90by5uZXh0RGVwdGhWYWx1ZSA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gKHRoaXMuX2RlcHRoQ291bnRlcisrKSAvIDY1NTM2LjBcbn1cblxuZnVuY3Rpb24gbGVycChhLCBiLCB0KSB7XG4gIHZhciBzID0gMC41ICogKHQgKyAxLjApXG4gIHJldHVybiBNYXRoLmZsb29yKCgxLjAtcykqYSArIHMqYil8MFxufVxuXG5wcm90by5kcmF3ID0gKGZ1bmN0aW9uKCkge1xudmFyIFRJQ0tfTUFSS19CT1ggPSBbMCwwLDAsMF1cbnJldHVybiBmdW5jdGlvbigpIHtcbiAgdmFyIGdsICAgICAgICAgPSB0aGlzLmdsXG4gIHZhciBzY3JlZW5Cb3ggID0gdGhpcy5zY3JlZW5Cb3hcbiAgdmFyIHZpZXdQaXhlbHMgPSB0aGlzLnZpZXdCb3hcbiAgdmFyIGRhdGFCb3ggICAgPSB0aGlzLmRhdGFCb3hcbiAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLnBpeGVsUmF0aW9cbiAgdmFyIGdyaWQgICAgICAgPSB0aGlzLmdyaWRcbiAgdmFyIGxpbmUgICAgICAgPSB0aGlzLmxpbmVcbiAgdmFyIHRleHQgICAgICAgPSB0aGlzLnRleHRcbiAgdmFyIG9iamVjdHMgICAgPSB0aGlzLm9iamVjdHNcblxuICB0aGlzLl9kZXB0aENvdW50ZXIgPSAwXG5cbiAgaWYodGhpcy5waWNrRGlydHkpIHtcbiAgICBpZih0aGlzLl9waWNrVGltZW91dCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuX3BpY2tUaW1lb3V0KVxuICAgIH1cbiAgICB0aGlzLnBpY2tEaXJ0eSA9IGZhbHNlXG4gICAgdGhpcy5fcGlja1RpbWVvdXQgPSBzZXRUaW1lb3V0KHRoaXMuX2RyYXdQaWNrLCB0aGlzLnBpY2tEZWxheSlcbiAgfVxuXG4gIGlmKCF0aGlzLmRpcnR5KSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgdGhpcy5kaXJ0eSA9IGZhbHNlXG5cbiAgZ2wuYmluZEZyYW1lYnVmZmVyKGdsLkZSQU1FQlVGRkVSLCBudWxsKVxuXG4gIC8vVHVybiBvbiBzY2lzc29yXG4gIGdsLmVuYWJsZShnbC5TQ0lTU09SX1RFU1QpXG5cbiAgLy9UdXJuIG9mZiBkZXB0aCBidWZmZXJcbiAgZ2wuZGlzYWJsZShnbC5ERVBUSF9URVNUKVxuICBnbC5kZXB0aEZ1bmMoZ2wuTEVTUylcbiAgZ2wuZGVwdGhNYXNrKGZhbHNlKVxuXG4gIC8vQ29uZmlndXJlIHByZW11bHRpcGxpZWQgYWxwaGEgYmxlbmRpbmdcbiAgZ2wuZW5hYmxlKGdsLkJMRU5EKVxuICBnbC5ibGVuZEVxdWF0aW9uKGdsLkZVTkNfQURELCBnbC5GVU5DX0FERCk7XG4gIGdsLmJsZW5kRnVuYyhnbC5PTkUsIGdsLk9ORV9NSU5VU19TUkNfQUxQSEEpO1xuXG4gIC8vRHJhdyBib3JkZXJcbiAgaWYgKHRoaXMuYm9yZGVyQ29sb3IpIHtcbiAgICBnbC5zY2lzc29yKFxuICAgICAgc2NyZWVuQm94WzBdLFxuICAgICAgc2NyZWVuQm94WzFdLFxuICAgICAgc2NyZWVuQm94WzJdLXNjcmVlbkJveFswXSxcbiAgICAgIHNjcmVlbkJveFszXS1zY3JlZW5Cb3hbMV0pXG4gICAgdmFyIGJvcmRlckNvbG9yID0gdGhpcy5ib3JkZXJDb2xvclxuICAgIGdsLmNsZWFyQ29sb3IoXG4gICAgICBib3JkZXJDb2xvclswXSpib3JkZXJDb2xvclszXSxcbiAgICAgIGJvcmRlckNvbG9yWzFdKmJvcmRlckNvbG9yWzNdLFxuICAgICAgYm9yZGVyQ29sb3JbMl0qYm9yZGVyQ29sb3JbM10sXG4gICAgICBib3JkZXJDb2xvclszXSlcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVClcbiAgfVxuXG4gIC8vRHJhdyBjZW50ZXIgcGFuZVxuICBnbC5zY2lzc29yKFxuICAgIHZpZXdQaXhlbHNbMF0sXG4gICAgdmlld1BpeGVsc1sxXSxcbiAgICB2aWV3UGl4ZWxzWzJdLXZpZXdQaXhlbHNbMF0sXG4gICAgdmlld1BpeGVsc1szXS12aWV3UGl4ZWxzWzFdKVxuICBnbC52aWV3cG9ydChcbiAgICB2aWV3UGl4ZWxzWzBdLFxuICAgIHZpZXdQaXhlbHNbMV0sXG4gICAgdmlld1BpeGVsc1syXS12aWV3UGl4ZWxzWzBdLFxuICAgIHZpZXdQaXhlbHNbM10tdmlld1BpeGVsc1sxXSlcbiAgdmFyIGJhY2tncm91bmRDb2xvciA9IHRoaXMuYmFja2dyb3VuZENvbG9yXG4gIGdsLmNsZWFyQ29sb3IoXG4gICAgYmFja2dyb3VuZENvbG9yWzBdKmJhY2tncm91bmRDb2xvclszXSxcbiAgICBiYWNrZ3JvdW5kQ29sb3JbMV0qYmFja2dyb3VuZENvbG9yWzNdLFxuICAgIGJhY2tncm91bmRDb2xvclsyXSpiYWNrZ3JvdW5kQ29sb3JbM10sXG4gICAgYmFja2dyb3VuZENvbG9yWzNdKVxuICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUKVxuXG4gIC8vRHJhdyBncmlkXG4gIGdyaWQuZHJhdygpXG5cbiAgLy9EcmF3IHplcm8gbGluZXMgc2VwYXJhdGVseVxuICB2YXIgemVyb0xpbmVFbmFibGUgPSB0aGlzLnplcm9MaW5lRW5hYmxlXG4gIHZhciB6ZXJvTGluZUNvbG9yICA9IHRoaXMuemVyb0xpbmVDb2xvclxuICB2YXIgemVyb0xpbmVXaWR0aCAgPSB0aGlzLnplcm9MaW5lV2lkdGhcbiAgaWYoemVyb0xpbmVFbmFibGVbMF0gfHwgemVyb0xpbmVFbmFibGVbMV0pIHtcbiAgICBsaW5lLmJpbmQoKVxuICAgIGZvcih2YXIgaT0wOyBpPDI7ICsraSkge1xuICAgICAgaWYoIXplcm9MaW5lRW5hYmxlW2ldIHx8XG4gICAgICAgICEoZGF0YUJveFtpXSA8PSAwICYmIGRhdGFCb3hbaSsyXSA+PSAwKSkge1xuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICB2YXIgemVyb0ludGVyY2VwdCA9IHNjcmVlbkJveFtpXSAtXG4gICAgICAgIGRhdGFCb3hbaV0gKiAoc2NyZWVuQm94W2krMl0gLSBzY3JlZW5Cb3hbaV0pIC8gKGRhdGFCb3hbaSsyXSAtIGRhdGFCb3hbaV0pXG5cbiAgICAgIGlmKGkgPT09IDApIHtcbiAgICAgICAgbGluZS5kcmF3TGluZShcbiAgICAgICAgICB6ZXJvSW50ZXJjZXB0LCBzY3JlZW5Cb3hbMV0sIHplcm9JbnRlcmNlcHQsIHNjcmVlbkJveFszXSxcbiAgICAgICAgICB6ZXJvTGluZVdpZHRoW2ldLFxuICAgICAgICAgIHplcm9MaW5lQ29sb3JbaV0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5lLmRyYXdMaW5lKFxuICAgICAgICAgIHNjcmVlbkJveFswXSwgemVyb0ludGVyY2VwdCwgc2NyZWVuQm94WzJdLCB6ZXJvSW50ZXJjZXB0LFxuICAgICAgICAgIHplcm9MaW5lV2lkdGhbaV0sXG4gICAgICAgICAgemVyb0xpbmVDb2xvcltpXSlcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvL0RyYXcgdHJhY2VzXG4gIGZvcih2YXIgaT0wOyBpPG9iamVjdHMubGVuZ3RoOyArK2kpIHtcbiAgICBvYmplY3RzW2ldLmRyYXcoKVxuICB9XG5cbiAgLy9SZXR1cm4gdmlld3BvcnQgdG8gZGVmYXVsdFxuICBnbC52aWV3cG9ydChcbiAgICBzY3JlZW5Cb3hbMF0sXG4gICAgc2NyZWVuQm94WzFdLFxuICAgIHNjcmVlbkJveFsyXS1zY3JlZW5Cb3hbMF0sXG4gICAgc2NyZWVuQm94WzNdLXNjcmVlbkJveFsxXSlcbiAgZ2wuc2Npc3NvcihcbiAgICBzY3JlZW5Cb3hbMF0sXG4gICAgc2NyZWVuQm94WzFdLFxuICAgIHNjcmVlbkJveFsyXS1zY3JlZW5Cb3hbMF0sXG4gICAgc2NyZWVuQm94WzNdLXNjcmVlbkJveFsxXSlcblxuICAvL0RyYXcgdGljayBtYXJrc1xuICB0aGlzLmdyaWQuZHJhd1RpY2tNYXJrcygpXG5cbiAgLy9EcmF3IGxpbmUgZWxlbWVudHNcbiAgbGluZS5iaW5kKClcblxuICAvL0RyYXcgYm9yZGVyIGxpbmVzXG4gIHZhciBib3JkZXJMaW5lRW5hYmxlID0gdGhpcy5ib3JkZXJMaW5lRW5hYmxlXG4gIHZhciBib3JkZXJMaW5lV2lkdGggID0gdGhpcy5ib3JkZXJMaW5lV2lkdGhcbiAgdmFyIGJvcmRlckxpbmVDb2xvciAgPSB0aGlzLmJvcmRlckxpbmVDb2xvclxuICBpZihib3JkZXJMaW5lRW5hYmxlWzFdKSB7XG4gICAgbGluZS5kcmF3TGluZShcbiAgICAgIHZpZXdQaXhlbHNbMF0sIHZpZXdQaXhlbHNbMV0gLSAwLjUqYm9yZGVyTGluZVdpZHRoWzFdKnBpeGVsUmF0aW8sXG4gICAgICB2aWV3UGl4ZWxzWzBdLCB2aWV3UGl4ZWxzWzNdICsgMC41KmJvcmRlckxpbmVXaWR0aFszXSpwaXhlbFJhdGlvLFxuICAgICAgYm9yZGVyTGluZVdpZHRoWzFdLCBib3JkZXJMaW5lQ29sb3JbMV0pXG4gIH1cbiAgaWYoYm9yZGVyTGluZUVuYWJsZVswXSkge1xuICAgIGxpbmUuZHJhd0xpbmUoXG4gICAgICB2aWV3UGl4ZWxzWzBdIC0gMC41KmJvcmRlckxpbmVXaWR0aFswXSpwaXhlbFJhdGlvLCB2aWV3UGl4ZWxzWzFdLFxuICAgICAgdmlld1BpeGVsc1syXSArIDAuNSpib3JkZXJMaW5lV2lkdGhbMl0qcGl4ZWxSYXRpbywgdmlld1BpeGVsc1sxXSxcbiAgICAgIGJvcmRlckxpbmVXaWR0aFswXSwgYm9yZGVyTGluZUNvbG9yWzBdKVxuICB9XG4gIGlmKGJvcmRlckxpbmVFbmFibGVbM10pIHtcbiAgICBsaW5lLmRyYXdMaW5lKFxuICAgICAgdmlld1BpeGVsc1syXSwgdmlld1BpeGVsc1sxXSAtIDAuNSpib3JkZXJMaW5lV2lkdGhbMV0qcGl4ZWxSYXRpbyxcbiAgICAgIHZpZXdQaXhlbHNbMl0sIHZpZXdQaXhlbHNbM10gKyAwLjUqYm9yZGVyTGluZVdpZHRoWzNdKnBpeGVsUmF0aW8sXG4gICAgICBib3JkZXJMaW5lV2lkdGhbM10sIGJvcmRlckxpbmVDb2xvclszXSlcbiAgfVxuICBpZihib3JkZXJMaW5lRW5hYmxlWzJdKSB7XG4gICAgbGluZS5kcmF3TGluZShcbiAgICAgIHZpZXdQaXhlbHNbMF0gLSAwLjUqYm9yZGVyTGluZVdpZHRoWzBdKnBpeGVsUmF0aW8sIHZpZXdQaXhlbHNbM10sXG4gICAgICB2aWV3UGl4ZWxzWzJdICsgMC41KmJvcmRlckxpbmVXaWR0aFsyXSpwaXhlbFJhdGlvLCB2aWV3UGl4ZWxzWzNdLFxuICAgICAgYm9yZGVyTGluZVdpZHRoWzJdLCBib3JkZXJMaW5lQ29sb3JbMl0pXG4gIH1cblxuICAvL0RyYXcgdGV4dCBlbGVtZW50c1xuICB0ZXh0LmJpbmQoKVxuICBmb3IodmFyIGk9MDsgaTwyOyArK2kpIHtcbiAgICB0ZXh0LmRyYXdUaWNrcyhpKVxuICB9XG4gIGlmKHRoaXMudGl0bGVFbmFibGUpIHtcbiAgICB0ZXh0LmRyYXdUaXRsZSgpXG4gIH1cblxuICAvL0RyYXcgb3RoZXIgb3ZlcmxheSBlbGVtZW50cyAoc2VsZWN0IGJveGVzLCBldGMuKVxuICB2YXIgb3ZlcmxheXMgPSB0aGlzLm92ZXJsYXlzXG4gIGZvcih2YXIgaT0wOyBpPG92ZXJsYXlzLmxlbmd0aDsgKytpKSB7XG4gICAgb3ZlcmxheXNbaV0uZHJhdygpXG4gIH1cblxuICAvL1R1cm4gb2ZmIHNjaXNzb3IgdGVzdFxuICBnbC5kaXNhYmxlKGdsLlNDSVNTT1JfVEVTVClcbiAgZ2wuZGlzYWJsZShnbC5CTEVORClcbiAgZ2wuZGVwdGhNYXNrKHRydWUpXG59XG59KSgpXG5cbnByb3RvLmRyYXdQaWNrID0gKGZ1bmN0aW9uKCkge1xuXG5yZXR1cm4gZnVuY3Rpb24oKSB7XG4gIGlmICh0aGlzLnN0YXRpYykgcmV0dXJuO1xuXG4gIHZhciBwaWNrQnVmZmVyID0gdGhpcy5waWNrQnVmZmVyXG4gIHZhciBnbCA9IHRoaXMuZ2xcblxuICB0aGlzLl9waWNrVGltZW91dCA9IG51bGxcbiAgcGlja0J1ZmZlci5iZWdpbigpXG5cbiAgdmFyIHBpY2tPZmZzZXQgPSAxXG4gIHZhciBvYmplY3RzID0gdGhpcy5vYmplY3RzXG4gIGZvcih2YXIgaT0wOyBpPG9iamVjdHMubGVuZ3RoOyArK2kpIHtcbiAgICBwaWNrT2Zmc2V0ID0gb2JqZWN0c1tpXS5kcmF3UGljayhwaWNrT2Zmc2V0KVxuICB9XG5cbiAgcGlja0J1ZmZlci5lbmQoKVxufVxufSkoKVxuXG5wcm90by5waWNrID0gKGZ1bmN0aW9uKCkge1xucmV0dXJuIGZ1bmN0aW9uKHgsIHkpIHtcbiAgaWYgKHRoaXMuc3RhdGljKSByZXR1cm47XG5cbiAgdmFyIHBpeGVsUmF0aW8gICAgID0gdGhpcy5waXhlbFJhdGlvXG4gIHZhciBwaWNrUGl4ZWxSYXRpbyA9IHRoaXMucGlja1BpeGVsUmF0aW9cbiAgdmFyIHZpZXdCb3ggICAgICAgID0gdGhpcy52aWV3Qm94XG5cbiAgdmFyIHNjclggPSBNYXRoLnJvdW5kKCh4IC0gdmlld0JveFswXSAvIHBpeGVsUmF0aW8pICogcGlja1BpeGVsUmF0aW8pfDBcbiAgdmFyIHNjclkgPSBNYXRoLnJvdW5kKCh5IC0gdmlld0JveFsxXSAvIHBpeGVsUmF0aW8pICogcGlja1BpeGVsUmF0aW8pfDBcblxuICB2YXIgcGlja1Jlc3VsdCA9IHRoaXMucGlja0J1ZmZlci5xdWVyeShzY3JYLCBzY3JZLCB0aGlzLnBpY2tSYWRpdXMpXG4gIGlmKCFwaWNrUmVzdWx0KSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHZhciBwaWNrVmFsdWUgPSBwaWNrUmVzdWx0LmlkICtcbiAgICAocGlja1Jlc3VsdC52YWx1ZVswXTw8OCkgICtcbiAgICAocGlja1Jlc3VsdC52YWx1ZVsxXTw8MTYpICtcbiAgICAocGlja1Jlc3VsdC52YWx1ZVsyXTw8MjQpXG5cbiAgdmFyIG9iamVjdHMgPSB0aGlzLm9iamVjdHNcbiAgZm9yKHZhciBpPTA7IGk8b2JqZWN0cy5sZW5ndGg7ICsraSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RzW2ldLnBpY2soc2NyWCwgc2NyWSwgcGlja1ZhbHVlKVxuICAgIGlmKHJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdFxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsXG59XG59KSgpXG5cbmZ1bmN0aW9uIGRlZXBDbG9uZShhcnJheSkge1xuICB2YXIgcmVzdWx0ID0gYXJyYXkuc2xpY2UoKVxuICBmb3IodmFyIGk9MDsgaTxyZXN1bHQubGVuZ3RoOyArK2kpIHtcbiAgICByZXN1bHRbaV0gPSByZXN1bHRbaV0uc2xpY2UoKVxuICB9XG4gIHJldHVybiByZXN1bHRcbn1cblxuZnVuY3Rpb24gY29tcGFyZVRpY2tzKGEsIGIpIHtcbiAgcmV0dXJuIGEueCAtIGIueFxufVxuXG5wcm90by5zZXRTY3JlZW5Cb3ggPSBmdW5jdGlvbihuYm94KSB7XG4gIHZhciBzY3JlZW5Cb3ggPSB0aGlzLnNjcmVlbkJveFxuICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMucGl4ZWxSYXRpb1xuXG4gIHNjcmVlbkJveFswXSA9IE1hdGgucm91bmQobmJveFswXSAqIHBpeGVsUmF0aW8pIHwgMFxuICBzY3JlZW5Cb3hbMV0gPSBNYXRoLnJvdW5kKG5ib3hbMV0gKiBwaXhlbFJhdGlvKSB8IDBcbiAgc2NyZWVuQm94WzJdID0gTWF0aC5yb3VuZChuYm94WzJdICogcGl4ZWxSYXRpbykgfCAwXG4gIHNjcmVlbkJveFszXSA9IE1hdGgucm91bmQobmJveFszXSAqIHBpeGVsUmF0aW8pIHwgMFxuXG4gIHRoaXMuc2V0RGlydHkoKVxufVxuXG5wcm90by5zZXREYXRhQm94ID0gZnVuY3Rpb24obmJveCkge1xuICB2YXIgZGF0YUJveCA9IHRoaXMuZGF0YUJveFxuXG4gIHZhciBkaWZmZXJlbnQgPVxuICAgIGRhdGFCb3hbMF0gIT09IG5ib3hbMF0gfHxcbiAgICBkYXRhQm94WzFdICE9PSBuYm94WzFdIHx8XG4gICAgZGF0YUJveFsyXSAhPT0gbmJveFsyXSB8fFxuICAgIGRhdGFCb3hbM10gIT09IG5ib3hbM11cblxuICBpZihkaWZmZXJlbnQpIHtcbiAgICBkYXRhQm94WzBdID0gbmJveFswXVxuICAgIGRhdGFCb3hbMV0gPSBuYm94WzFdXG4gICAgZGF0YUJveFsyXSA9IG5ib3hbMl1cbiAgICBkYXRhQm94WzNdID0gbmJveFszXVxuXG4gICAgdGhpcy5zZXREaXJ0eSgpXG4gIH1cbn1cblxucHJvdG8uc2V0Vmlld0JveCA9IGZ1bmN0aW9uKG5ib3gpIHtcbiAgdmFyIHBpeGVsUmF0aW8gPSB0aGlzLnBpeGVsUmF0aW9cbiAgdmFyIHZpZXdCb3ggPSB0aGlzLnZpZXdCb3hcblxuICB2aWV3Qm94WzBdID0gTWF0aC5yb3VuZChuYm94WzBdICogcGl4ZWxSYXRpbyl8MFxuICB2aWV3Qm94WzFdID0gTWF0aC5yb3VuZChuYm94WzFdICogcGl4ZWxSYXRpbyl8MFxuICB2aWV3Qm94WzJdID0gTWF0aC5yb3VuZChuYm94WzJdICogcGl4ZWxSYXRpbyl8MFxuICB2aWV3Qm94WzNdID0gTWF0aC5yb3VuZChuYm94WzNdICogcGl4ZWxSYXRpbyl8MFxuXG4gIHZhciBwaWNrUGl4ZWxSYXRpbyA9IHRoaXMucGlja1BpeGVsUmF0aW9cbiAgdGhpcy5waWNrQnVmZmVyLnNoYXBlID0gW1xuICAgIE1hdGgucm91bmQoKG5ib3hbMl0gLSBuYm94WzBdKSAqIHBpY2tQaXhlbFJhdGlvKXwwLFxuICAgIE1hdGgucm91bmQoKG5ib3hbM10gLSBuYm94WzFdKSAqIHBpY2tQaXhlbFJhdGlvKXwwIF1cblxuICB0aGlzLnNldERpcnR5KClcbn1cblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuXG4gIHZhciBnbCA9IHRoaXMuZ2xcblxuICB0aGlzLnBpeGVsUmF0aW8gICAgICA9IG9wdGlvbnMucGl4ZWxSYXRpbyB8fCAxXG5cbiAgdmFyIHBpeGVsUmF0aW8gICAgICAgPSB0aGlzLnBpeGVsUmF0aW9cbiAgdGhpcy5waWNrUGl4ZWxSYXRpbyAgPSBNYXRoLm1heChwaXhlbFJhdGlvLCAxKVxuXG4gIHRoaXMuc2V0U2NyZWVuQm94KG9wdGlvbnMuc2NyZWVuQm94IHx8XG4gICAgWzAsIDAsIGdsLmRyYXdpbmdCdWZmZXJXaWR0aC9waXhlbFJhdGlvLCBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0L3BpeGVsUmF0aW9dKVxuXG4gIHZhciBzY3JlZW5Cb3ggPSB0aGlzLnNjcmVlbkJveFxuICB0aGlzLnNldFZpZXdCb3gob3B0aW9ucy52aWV3Qm94IHx8XG4gICAgWzAuMTI1Kih0aGlzLnNjcmVlbkJveFsyXS10aGlzLnNjcmVlbkJveFswXSkvcGl4ZWxSYXRpbyxcbiAgICAgMC4xMjUqKHRoaXMuc2NyZWVuQm94WzNdLXRoaXMuc2NyZWVuQm94WzFdKS9waXhlbFJhdGlvLFxuICAgICAwLjg3NSoodGhpcy5zY3JlZW5Cb3hbMl0tdGhpcy5zY3JlZW5Cb3hbMF0pL3BpeGVsUmF0aW8sXG4gICAgIDAuODc1Kih0aGlzLnNjcmVlbkJveFszXS10aGlzLnNjcmVlbkJveFsxXSkvcGl4ZWxSYXRpb10pXG5cbiAgdmFyIHZpZXdCb3ggPSB0aGlzLnZpZXdCb3hcbiAgdmFyIGFzcGVjdFJhdGlvID0gKHZpZXdCb3hbMl0gLSB2aWV3Qm94WzBdKSAvICh2aWV3Qm94WzNdIC0gdmlld0JveFsxXSlcbiAgdGhpcy5zZXREYXRhQm94KG9wdGlvbnMuZGF0YUJveCB8fCBbLTEwLCAtMTAvYXNwZWN0UmF0aW8sIDEwLCAxMC9hc3BlY3RSYXRpb10pXG5cbiAgdGhpcy5ib3JkZXJDb2xvciAgICAgPSBvcHRpb25zLmJvcmRlckNvbG9yICE9PSBmYWxzZSA/IChvcHRpb25zLmJvcmRlckNvbG9yIHx8IFswLDAsMCwwXSkuc2xpY2UoKSA6IGZhbHNlXG4gIHRoaXMuYmFja2dyb3VuZENvbG9yID0gKG9wdGlvbnMuYmFja2dyb3VuZENvbG9yIHx8IFswLDAsMCwwXSkuc2xpY2UoKVxuXG4gIHRoaXMuZ3JpZExpbmVFbmFibGUgID0gKG9wdGlvbnMuZ3JpZExpbmVFbmFibGUgfHwgW3RydWUsdHJ1ZV0pLnNsaWNlKClcbiAgdGhpcy5ncmlkTGluZVdpZHRoICAgPSAob3B0aW9ucy5ncmlkTGluZVdpZHRoIHx8IFsxLDFdKS5zbGljZSgpXG4gIHRoaXMuZ3JpZExpbmVDb2xvciAgID0gZGVlcENsb25lKG9wdGlvbnMuZ3JpZExpbmVDb2xvciB8fFxuICAgIFtbMC41LDAuNSwwLjUsMV0sWzAuNSwwLjUsMC41LDFdXSlcblxuICB0aGlzLnplcm9MaW5lRW5hYmxlICAgPSAob3B0aW9ucy56ZXJvTGluZUVuYWJsZSB8fCBbdHJ1ZSwgdHJ1ZV0pLnNsaWNlKClcbiAgdGhpcy56ZXJvTGluZVdpZHRoICAgID0gKG9wdGlvbnMuemVyb0xpbmVXaWR0aCB8fCBbNCwgNF0pLnNsaWNlKClcbiAgdGhpcy56ZXJvTGluZUNvbG9yICAgID0gZGVlcENsb25lKG9wdGlvbnMuemVyb0xpbmVDb2xvciB8fFxuICAgIFtbMCwgMCwgMCwgMV0sWzAsIDAsIDAsIDFdXSlcblxuICB0aGlzLnRpY2tNYXJrTGVuZ3RoICAgPSAob3B0aW9ucy50aWNrTWFya0xlbmd0aCB8fCBbMCwwLDAsMF0pLnNsaWNlKClcbiAgdGhpcy50aWNrTWFya1dpZHRoICAgID0gKG9wdGlvbnMudGlja01hcmtXaWR0aCB8fCBbMCwwLDAsMF0pLnNsaWNlKClcbiAgdGhpcy50aWNrTWFya0NvbG9yICAgID0gZGVlcENsb25lKG9wdGlvbnMudGlja01hcmtDb2xvciB8fFxuICAgIFtbMCwwLDAsMV0sWzAsMCwwLDFdLFswLDAsMCwxXSxbMCwwLDAsMV1dKVxuXG4gIHRoaXMudGl0bGVDZW50ZXIgICAgICA9IChvcHRpb25zLnRpdGxlQ2VudGVyIHx8IFtcbiAgICAwLjUqKHZpZXdCb3hbMF0rdmlld0JveFsyXSkvcGl4ZWxSYXRpbywodmlld0JveFszXSsxMjApL3BpeGVsUmF0aW9dKS5zbGljZSgpXG4gIHRoaXMudGl0bGVFbmFibGUgICAgICA9ICEoJ3RpdGxlRW5hYmxlJyBpbiBvcHRpb25zKSB8fCAhIW9wdGlvbnMudGl0bGVFbmFibGVcbiAgdGhpcy50aXRsZUFuZ2xlICAgICAgID0gb3B0aW9ucy50aXRsZUFuZ2xlIHx8IDBcbiAgdGhpcy50aXRsZUNvbG9yICAgICAgID0gKG9wdGlvbnMudGl0bGVDb2xvciB8fCBbMCwwLDAsMV0pLnNsaWNlKClcblxuICB0aGlzLmxhYmVsUGFkICAgICAgICAgPSAob3B0aW9ucy5sYWJlbFBhZCB8fCBbMTUsMTUsMTUsMTVdKS5zbGljZSgpXG4gIHRoaXMubGFiZWxBbmdsZSAgICAgICA9IChvcHRpb25zLmxhYmVsQW5nbGUgfHxcbiAgICBbMCxNYXRoLlBJLzIsMCwzLjAqTWF0aC5QSS8yXSkuc2xpY2UoKVxuICB0aGlzLmxhYmVsRW5hYmxlICAgICAgPSAob3B0aW9ucy5sYWJlbEVuYWJsZSB8fCBbdHJ1ZSx0cnVlLHRydWUsdHJ1ZV0pLnNsaWNlKClcbiAgdGhpcy5sYWJlbENvbG9yICAgICAgID0gZGVlcENsb25lKG9wdGlvbnMubGFiZWxDb2xvciB8fFxuICAgIFtbMCwwLDAsMV0sWzAsMCwwLDFdLFswLDAsMCwxXSxbMCwwLDAsMV1dKVxuXG4gIHRoaXMudGlja1BhZCAgICAgICAgID0gKG9wdGlvbnMudGlja1BhZCB8fCBbMTUsMTUsMTUsMTVdKS5zbGljZSgpXG4gIHRoaXMudGlja0FuZ2xlICAgICAgID0gKG9wdGlvbnMudGlja0FuZ2xlIHx8IFswLDAsMCwwXSkuc2xpY2UoKVxuICB0aGlzLnRpY2tFbmFibGUgICAgICA9IChvcHRpb25zLnRpY2tFbmFibGUgfHwgW3RydWUsdHJ1ZSx0cnVlLHRydWVdKS5zbGljZSgpXG4gIHRoaXMudGlja0NvbG9yICAgICAgID0gZGVlcENsb25lKG9wdGlvbnMudGlja0NvbG9yIHx8XG4gICAgW1swLDAsMCwxXSxbMCwwLDAsMV0sWzAsMCwwLDFdLFswLDAsMCwxXV0pXG5cbiAgdGhpcy5ib3JkZXJMaW5lRW5hYmxlID0gKG9wdGlvbnMuYm9yZGVyTGluZUVuYWJsZSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0cnVlLHRydWUsdHJ1ZSx0cnVlXSkuc2xpY2UoKVxuICB0aGlzLmJvcmRlckxpbmVXaWR0aCAgPSAob3B0aW9ucy5ib3JkZXJMaW5lV2lkdGggfHwgWzIsMiwyLDJdKS5zbGljZSgpXG4gIHRoaXMuYm9yZGVyTGluZUNvbG9yICA9IGRlZXBDbG9uZShvcHRpb25zLmJvcmRlckxpbmVDb2xvciB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICBbWzAsMCwwLDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgWzAsMCwwLDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgWzAsMCwwLDFdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgWzAsMCwwLDFdXSlcblxuICB2YXIgdGlja3MgPSBvcHRpb25zLnRpY2tzIHx8IFsgW10sIFtdIF1cblxuICAvL0NvbXB1dGUgYm91bmRzIG9uIHRpY2tzXG4gIHZhciBib3VuZHMgPSB0aGlzLl90aWNrQm91bmRzXG4gIGJvdW5kc1swXSA9IGJvdW5kc1sxXSA9ICBJbmZpbml0eVxuICBib3VuZHNbMl0gPSBib3VuZHNbM10gPSAtSW5maW5pdHlcbiAgZm9yKHZhciBpPTA7IGk8MjsgKytpKSB7XG4gICAgdmFyIGF4aXNUaWNrcyA9IHRpY2tzW2ldLnNsaWNlKDApXG4gICAgaWYoYXhpc1RpY2tzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY29udGludWVcbiAgICB9XG4gICAgYXhpc1RpY2tzLnNvcnQoY29tcGFyZVRpY2tzKVxuICAgIGJvdW5kc1tpXSAgID0gTWF0aC5taW4oYm91bmRzW2ldLCBheGlzVGlja3NbMF0ueClcbiAgICBib3VuZHNbaSsyXSA9IE1hdGgubWF4KGJvdW5kc1tpKzJdLCBheGlzVGlja3NbYXhpc1RpY2tzLmxlbmd0aC0xXS54KVxuICB9XG5cbiAgLy9VcGRhdGUgZ3JpZFxuICB0aGlzLmdyaWQudXBkYXRlKHtcbiAgICBib3VuZHM6IGJvdW5kcyxcbiAgICB0aWNrczogIHRpY2tzXG4gIH0pXG5cbiAgLy9VcGRhdGUgdGV4dFxuICB0aGlzLnRleHQudXBkYXRlKHtcbiAgICBib3VuZHM6ICAgICBib3VuZHMsXG4gICAgdGlja3M6ICAgICAgdGlja3MsXG4gICAgbGFiZWxzOiAgICAgb3B0aW9ucy5sYWJlbHMgICAgfHwgWyd4JywgJ3knXSxcbiAgICBsYWJlbFNpemU6ICBvcHRpb25zLmxhYmVsU2l6ZSB8fCBbMTIsMTJdLFxuICAgIGxhYmVsRm9udDogIG9wdGlvbnMubGFiZWxGb250IHx8IFsnc2Fucy1zZXJpZicsICdzYW5zLXNlcmlmJ10sXG4gICAgdGl0bGU6ICAgICAgb3B0aW9ucy50aXRsZSAgICAgfHwgJycsXG4gICAgdGl0bGVTaXplOiAgb3B0aW9ucy50aXRsZVNpemUgfHwgMTgsXG4gICAgdGl0bGVGb250OiAgb3B0aW9ucy50aXRsZUZvbnQgfHwgJ3NhbnMtc2VyaWYnXG4gIH0pXG5cbiAgdGhpcy5zdGF0aWMgPSAhIW9wdGlvbnMuc3RhdGljO1xuXG4gIHRoaXMuc2V0RGlydHkoKVxufVxuXG5wcm90by5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYm94LmRpc3Bvc2UoKVxuICB0aGlzLmdyaWQuZGlzcG9zZSgpXG4gIHRoaXMudGV4dC5kaXNwb3NlKClcbiAgdGhpcy5saW5lLmRpc3Bvc2UoKVxuICBmb3IodmFyIGk9dGhpcy5vYmplY3RzLmxlbmd0aC0xOyBpPj0wOyAtLWkpIHtcbiAgICB0aGlzLm9iamVjdHNbaV0uZGlzcG9zZSgpXG4gIH1cbiAgdGhpcy5vYmplY3RzLmxlbmd0aCA9IDBcbiAgZm9yKHZhciBpPXRoaXMub3ZlcmxheXMubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuICAgIHRoaXMub3ZlcmxheXNbaV0uZGlzcG9zZSgpXG4gIH1cbiAgdGhpcy5vdmVybGF5cy5sZW5ndGggPSAwXG5cbiAgdGhpcy5nbCA9IG51bGxcbn1cblxucHJvdG8uYWRkT2JqZWN0ID0gZnVuY3Rpb24ob2JqZWN0KSB7XG4gIGlmKHRoaXMub2JqZWN0cy5pbmRleE9mKG9iamVjdCkgPCAwKSB7XG4gICAgdGhpcy5vYmplY3RzLnB1c2gob2JqZWN0KVxuICAgIHRoaXMuc2V0RGlydHkoKVxuICB9XG59XG5cbnByb3RvLnJlbW92ZU9iamVjdCA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgb2JqZWN0cyA9IHRoaXMub2JqZWN0c1xuICBmb3IodmFyIGk9MDsgaTxvYmplY3RzLmxlbmd0aDsgKytpKSB7XG4gICAgaWYob2JqZWN0c1tpXSA9PT0gb2JqZWN0KSB7XG4gICAgICBvYmplY3RzLnNwbGljZShpLDEpXG4gICAgICB0aGlzLnNldERpcnR5KClcbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG59XG5cbnByb3RvLmFkZE92ZXJsYXkgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgaWYodGhpcy5vdmVybGF5cy5pbmRleE9mKG9iamVjdCkgPCAwKSB7XG4gICAgdGhpcy5vdmVybGF5cy5wdXNoKG9iamVjdClcbiAgICB0aGlzLnNldE92ZXJsYXlEaXJ0eSgpXG4gIH1cbn1cblxucHJvdG8ucmVtb3ZlT3ZlcmxheSA9IGZ1bmN0aW9uKG9iamVjdCkge1xuICB2YXIgb2JqZWN0cyA9IHRoaXMub3ZlcmxheXNcbiAgZm9yKHZhciBpPTA7IGk8b2JqZWN0cy5sZW5ndGg7ICsraSkge1xuICAgIGlmKG9iamVjdHNbaV0gPT09IG9iamVjdCkge1xuICAgICAgb2JqZWN0cy5zcGxpY2UoaSwxKVxuICAgICAgdGhpcy5zZXRPdmVybGF5RGlydHkoKVxuICAgICAgYnJlYWtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlR0xQbG90MkQob3B0aW9ucykge1xuICB2YXIgZ2wgPSBvcHRpb25zLmdsXG4gIHZhciBwaWNrQnVmZmVyID0gY3JlYXRlUGljayhnbCwgW1xuICAgIGdsLmRyYXdpbmdCdWZmZXJXaWR0aCwgZ2wuZHJhd2luZ0J1ZmZlckhlaWdodF0pXG4gIHZhciBwbG90ID0gbmV3IEdMUGxvdDJEKGdsLCBwaWNrQnVmZmVyKVxuICBwbG90LmdyaWQgPSBjcmVhdGVHcmlkKHBsb3QpXG4gIHBsb3QudGV4dCA9IGNyZWF0ZVRleHQocGxvdClcbiAgcGxvdC5saW5lID0gY3JlYXRlTGluZShwbG90KVxuICBwbG90LmJveCAgPSBjcmVhdGVCb3gocGxvdClcbiAgcGxvdC51cGRhdGUob3B0aW9ucylcbiAgcmV0dXJuIHBsb3Rcbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgZ2xzbGlmeSA9IHJlcXVpcmUoJ2dsc2xpZnknKVxuXG5leHBvcnRzLmJveFZlcnRleCA9IGdsc2xpZnkoJy4vc2hhZGVycy9ib3gtdmVydGV4Lmdsc2wnKVxuZXhwb3J0cy5ib3hGcmFnbWVudCA9IGdsc2xpZnkoJy4vc2hhZGVycy9ib3gtZnJhZ21lbnQuZ2xzbCcpXG4iLCIndXNlIHN0cmljdCdcblxudmFyIGNyZWF0ZVNoYWRlciA9IHJlcXVpcmUoJ2dsLXNoYWRlcicpXG52YXIgY3JlYXRlQnVmZmVyID0gcmVxdWlyZSgnZ2wtYnVmZmVyJylcblxudmFyIFNIQURFUlMgPSByZXF1aXJlKCcuL2xpYi9zaGFkZXJzJylcblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVTZWxlY3RCb3hcblxuZnVuY3Rpb24gU2VsZWN0Qm94KHBsb3QsIGJveEJ1ZmZlciwgYm94U2hhZGVyKSB7XG4gIHRoaXMucGxvdCA9IHBsb3RcbiAgdGhpcy5ib3hCdWZmZXIgPSBib3hCdWZmZXJcbiAgdGhpcy5ib3hTaGFkZXIgPSBib3hTaGFkZXJcblxuICB0aGlzLmVuYWJsZWQgPSB0cnVlXG5cbiAgdGhpcy5zZWxlY3RCb3ggPSBbSW5maW5pdHksSW5maW5pdHksLUluZmluaXR5LC1JbmZpbml0eV1cblxuICB0aGlzLmJvcmRlckNvbG9yID0gWzAsMCwwLDFdXG4gIHRoaXMuaW5uZXJGaWxsICAgPSBmYWxzZVxuICB0aGlzLmlubmVyQ29sb3IgID0gWzAsMCwwLDAuMjVdXG4gIHRoaXMub3V0ZXJGaWxsICAgPSB0cnVlXG4gIHRoaXMub3V0ZXJDb2xvciAgPSBbMCwwLDAsMC41XVxuICB0aGlzLmJvcmRlcldpZHRoID0gMTBcbn1cblxudmFyIHByb3RvID0gU2VsZWN0Qm94LnByb3RvdHlwZVxuXG5wcm90by5kcmF3ID0gZnVuY3Rpb24oKSB7XG4gIGlmKCF0aGlzLmVuYWJsZWQpIHtcbiAgICByZXR1cm5cbiAgfVxuXG4gIHZhciBwbG90ICAgICAgICAgPSB0aGlzLnBsb3RcbiAgdmFyIHNlbGVjdEJveCAgICA9IHRoaXMuc2VsZWN0Qm94XG4gIHZhciBsaW5lV2lkdGggICAgPSB0aGlzLmJvcmRlcldpZHRoXG5cbiAgdmFyIGlubmVyRmlsbCAgICA9IHRoaXMuaW5uZXJGaWxsXG4gIHZhciBpbm5lckNvbG9yICAgPSB0aGlzLmlubmVyQ29sb3JcbiAgdmFyIG91dGVyRmlsbCAgICA9IHRoaXMub3V0ZXJGaWxsXG4gIHZhciBvdXRlckNvbG9yICAgPSB0aGlzLm91dGVyQ29sb3JcbiAgdmFyIGJvcmRlckNvbG9yICA9IHRoaXMuYm9yZGVyQ29sb3JcblxuICB2YXIgYm94ZXMgICAgICAgID0gcGxvdC5ib3hcbiAgdmFyIHNjcmVlbkJveCAgICA9IHBsb3Quc2NyZWVuQm94XG4gIHZhciBkYXRhQm94ICAgICAgPSBwbG90LmRhdGFCb3hcbiAgdmFyIHZpZXdCb3ggICAgICA9IHBsb3Qudmlld0JveFxuICB2YXIgcGl4ZWxSYXRpbyAgID0gcGxvdC5waXhlbFJhdGlvXG5cbiAgLy9NYXAgc2VsZWN0IGJveCBpbnRvIHBpeGVsIGNvb3JkaW5hdGVzXG4gIHZhciBsb1ggPSAoc2VsZWN0Qm94WzBdLWRhdGFCb3hbMF0pKih2aWV3Qm94WzJdLXZpZXdCb3hbMF0pLyhkYXRhQm94WzJdLWRhdGFCb3hbMF0pK3ZpZXdCb3hbMF1cbiAgdmFyIGxvWSA9IChzZWxlY3RCb3hbMV0tZGF0YUJveFsxXSkqKHZpZXdCb3hbM10tdmlld0JveFsxXSkvKGRhdGFCb3hbM10tZGF0YUJveFsxXSkrdmlld0JveFsxXVxuICB2YXIgaGlYID0gKHNlbGVjdEJveFsyXS1kYXRhQm94WzBdKSoodmlld0JveFsyXS12aWV3Qm94WzBdKS8oZGF0YUJveFsyXS1kYXRhQm94WzBdKSt2aWV3Qm94WzBdXG4gIHZhciBoaVkgPSAoc2VsZWN0Qm94WzNdLWRhdGFCb3hbMV0pKih2aWV3Qm94WzNdLXZpZXdCb3hbMV0pLyhkYXRhQm94WzNdLWRhdGFCb3hbMV0pK3ZpZXdCb3hbMV1cblxuICBsb1ggPSBNYXRoLm1heChsb1gsIHZpZXdCb3hbMF0pXG4gIGxvWSA9IE1hdGgubWF4KGxvWSwgdmlld0JveFsxXSlcbiAgaGlYID0gTWF0aC5taW4oaGlYLCB2aWV3Qm94WzJdKVxuICBoaVkgPSBNYXRoLm1pbihoaVksIHZpZXdCb3hbM10pXG5cbiAgaWYoaGlYIDwgbG9YIHx8IGhpWSA8IGxvWSkge1xuICAgIHJldHVyblxuICB9XG5cbiAgYm94ZXMuYmluZCgpXG5cbiAgLy9EcmF3IGJveFxuICB2YXIgc2NyZWVuV2lkdGggID0gc2NyZWVuQm94WzJdIC0gc2NyZWVuQm94WzBdXG4gIHZhciBzY3JlZW5IZWlnaHQgPSBzY3JlZW5Cb3hbM10gLSBzY3JlZW5Cb3hbMV1cblxuICBpZih0aGlzLm91dGVyRmlsbCkge1xuICAgIGJveGVzLmRyYXdCb3goMCwgMCwgc2NyZWVuV2lkdGgsIGxvWSwgb3V0ZXJDb2xvcilcbiAgICBib3hlcy5kcmF3Qm94KDAsIGxvWSwgbG9YLCBoaVksIG91dGVyQ29sb3IpXG4gICAgYm94ZXMuZHJhd0JveCgwLCBoaVksIHNjcmVlbldpZHRoLCBzY3JlZW5IZWlnaHQsIG91dGVyQ29sb3IpXG4gICAgYm94ZXMuZHJhd0JveChoaVgsIGxvWSwgc2NyZWVuV2lkdGgsIGhpWSwgb3V0ZXJDb2xvcilcbiAgfVxuXG4gIGlmKHRoaXMuaW5uZXJGaWxsKSB7XG4gICAgYm94ZXMuZHJhd0JveChsb1gsIGxvWSwgaGlYLCBoaVksIGlubmVyQ29sb3IpXG4gIH1cblxuICAvL0RyYXcgYm9yZGVyXG4gIGlmKGxpbmVXaWR0aCA+IDApIHtcblxuICAgIC8vRHJhdyBib3JkZXJcbiAgICB2YXIgdyA9IGxpbmVXaWR0aCAqIHBpeGVsUmF0aW9cbiAgICBib3hlcy5kcmF3Qm94KGxvWC13LCBsb1ktdywgaGlYK3csIGxvWSt3LCBib3JkZXJDb2xvcilcbiAgICBib3hlcy5kcmF3Qm94KGxvWC13LCBoaVktdywgaGlYK3csIGhpWSt3LCBib3JkZXJDb2xvcilcbiAgICBib3hlcy5kcmF3Qm94KGxvWC13LCBsb1ktdywgbG9YK3csIGhpWSt3LCBib3JkZXJDb2xvcilcbiAgICBib3hlcy5kcmF3Qm94KGhpWC13LCBsb1ktdywgaGlYK3csIGhpWSt3LCBib3JkZXJDb2xvcilcbiAgfVxufVxuXG5wcm90by51cGRhdGUgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9XG5cbiAgdGhpcy5pbm5lckZpbGwgICAgPSAhIW9wdGlvbnMuaW5uZXJGaWxsXG4gIHRoaXMub3V0ZXJGaWxsICAgID0gISFvcHRpb25zLm91dGVyRmlsbFxuICB0aGlzLmlubmVyQ29sb3IgICA9IChvcHRpb25zLmlubmVyQ29sb3IgICB8fCBbMCwwLDAsMC41XSkuc2xpY2UoKVxuICB0aGlzLm91dGVyQ29sb3IgICA9IChvcHRpb25zLm91dGVyQ29sb3IgICB8fCBbMCwwLDAsMC41XSkuc2xpY2UoKVxuICB0aGlzLmJvcmRlckNvbG9yICA9IChvcHRpb25zLmJvcmRlckNvbG9yIHx8IFswLDAsMCwxXSkuc2xpY2UoKVxuICB0aGlzLmJvcmRlcldpZHRoICA9IG9wdGlvbnMuYm9yZGVyV2lkdGggfHwgMFxuICB0aGlzLnNlbGVjdEJveCAgICA9IChvcHRpb25zLnNlbGVjdEJveCB8fCB0aGlzLnNlbGVjdEJveCkuc2xpY2UoKVxufVxuXG5wcm90by5kaXNwb3NlID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuYm94QnVmZmVyLmRpc3Bvc2UoKVxuICB0aGlzLmJveFNoYWRlci5kaXNwb3NlKClcbiAgdGhpcy5wbG90LnJlbW92ZU92ZXJsYXkodGhpcylcbn1cblxuZnVuY3Rpb24gY3JlYXRlU2VsZWN0Qm94KHBsb3QsIG9wdGlvbnMpIHtcbiAgdmFyIGdsID0gcGxvdC5nbFxuICB2YXIgYnVmZmVyID0gY3JlYXRlQnVmZmVyKGdsLCBbXG4gICAgMCwgMCxcbiAgICAwLCAxLFxuICAgIDEsIDAsXG4gICAgMSwgMSBdKVxuICB2YXIgc2hhZGVyID0gY3JlYXRlU2hhZGVyKGdsLCBTSEFERVJTLmJveFZlcnRleCwgU0hBREVSUy5ib3hGcmFnbWVudClcbiAgdmFyIHNlbGVjdEJveCA9IG5ldyBTZWxlY3RCb3gocGxvdCwgYnVmZmVyLCBzaGFkZXIpXG4gIHNlbGVjdEJveC51cGRhdGUob3B0aW9ucylcbiAgcGxvdC5hZGRPdmVybGF5KHNlbGVjdEJveClcbiAgcmV0dXJuIHNlbGVjdEJveFxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlU3Bpa2VzMkRcblxuZnVuY3Rpb24gR0xTcGlrZXMyRChwbG90KSB7XG4gIHRoaXMucGxvdCA9IHBsb3RcbiAgdGhpcy5lbmFibGUgPSBbdHJ1ZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlXVxuICB0aGlzLndpZHRoICA9IFsxLCAxLCAxLCAxXVxuICB0aGlzLmNvbG9yICA9IFtbMCwwLDAsMV0sXG4gICAgICAgICAgICAgICAgIFswLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgWzAsMCwwLDFdLFxuICAgICAgICAgICAgICAgICBbMCwwLDAsMV1dXG4gIHRoaXMuY2VudGVyID0gW0luZmluaXR5LCBJbmZpbml0eV1cbn1cblxudmFyIHByb3RvID0gR0xTcGlrZXMyRC5wcm90b3R5cGVcblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fVxuICB0aGlzLmVuYWJsZSA9IChvcHRpb25zLmVuYWJsZSB8fCBbdHJ1ZSx0cnVlLGZhbHNlLGZhbHNlXSkuc2xpY2UoKVxuICB0aGlzLndpZHRoICA9IChvcHRpb25zLndpZHRoIHx8IFsxLDEsMSwxXSkuc2xpY2UoKVxuICB0aGlzLmNvbG9yICA9IChvcHRpb25zLmNvbG9yIHx8IFtcbiAgICAgICAgICAgICAgICAgIFswLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgIFswLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgIFswLDAsMCwxXSxcbiAgICAgICAgICAgICAgICAgIFswLDAsMCwxXV0pLm1hcChmdW5jdGlvbih4KSB7IHJldHVybiB4LnNsaWNlKCkgfSlcbiAgdGhpcy5jZW50ZXIgPSAob3B0aW9ucy5jZW50ZXIgfHwgW0luZmluaXR5LEluZmluaXR5XSkuc2xpY2UoKVxuICB0aGlzLnBsb3Quc2V0T3ZlcmxheURpcnR5KClcbn1cblxucHJvdG8uZHJhdyA9IGZ1bmN0aW9uKCkge1xuICB2YXIgc3Bpa2VFbmFibGUgPSB0aGlzLmVuYWJsZVxuICB2YXIgc3Bpa2VXaWR0aCAgPSB0aGlzLndpZHRoXG4gIHZhciBzcGlrZUNvbG9yICA9IHRoaXMuY29sb3JcbiAgdmFyIHNwaWtlQ2VudGVyID0gdGhpcy5jZW50ZXJcbiAgdmFyIHBsb3QgICAgICAgID0gdGhpcy5wbG90XG4gIHZhciBsaW5lICAgICAgICA9IHBsb3QubGluZVxuXG4gIHZhciBkYXRhQm94ICAgICA9IHBsb3QuZGF0YUJveFxuICB2YXIgdmlld1BpeGVscyAgPSBwbG90LnZpZXdCb3hcblxuICBsaW5lLmJpbmQoKVxuXG4gIGlmKGRhdGFCb3hbMF0gPD0gc3Bpa2VDZW50ZXJbMF0gJiYgc3Bpa2VDZW50ZXJbMF0gPD0gZGF0YUJveFsyXSAmJlxuICAgICBkYXRhQm94WzFdIDw9IHNwaWtlQ2VudGVyWzFdICYmIHNwaWtlQ2VudGVyWzFdIDw9IGRhdGFCb3hbM10pIHtcblxuICAgIHZhciBjZW50ZXJYID0gdmlld1BpeGVsc1swXSArIChzcGlrZUNlbnRlclswXSAtIGRhdGFCb3hbMF0pIC8gKGRhdGFCb3hbMl0gLSBkYXRhQm94WzBdKSAqICh2aWV3UGl4ZWxzWzJdIC0gdmlld1BpeGVsc1swXSlcbiAgICB2YXIgY2VudGVyWSA9IHZpZXdQaXhlbHNbMV0gKyAoc3Bpa2VDZW50ZXJbMV0gLSBkYXRhQm94WzFdKSAvIChkYXRhQm94WzNdIC0gZGF0YUJveFsxXSkgKiAodmlld1BpeGVsc1szXSAtIHZpZXdQaXhlbHNbMV0pXG5cbiAgICBpZihzcGlrZUVuYWJsZVswXSkge1xuICAgICBsaW5lLmRyYXdMaW5lKFxuICAgICAgIGNlbnRlclgsIGNlbnRlclksXG4gICAgICAgdmlld1BpeGVsc1swXSwgY2VudGVyWSxcbiAgICAgICBzcGlrZVdpZHRoWzBdLCBzcGlrZUNvbG9yWzBdKVxuICAgIH1cbiAgICBpZihzcGlrZUVuYWJsZVsxXSkge1xuICAgICBsaW5lLmRyYXdMaW5lKFxuICAgICAgIGNlbnRlclgsIGNlbnRlclksXG4gICAgICAgY2VudGVyWCwgdmlld1BpeGVsc1sxXSxcbiAgICAgICBzcGlrZVdpZHRoWzFdLCBzcGlrZUNvbG9yWzFdKVxuICAgIH1cbiAgICBpZihzcGlrZUVuYWJsZVsyXSkge1xuICAgICAgbGluZS5kcmF3TGluZShcbiAgICAgICAgY2VudGVyWCwgY2VudGVyWSxcbiAgICAgICAgdmlld1BpeGVsc1syXSwgY2VudGVyWSxcbiAgICAgICAgc3Bpa2VXaWR0aFsyXSwgc3Bpa2VDb2xvclsyXSlcbiAgICB9XG4gICAgaWYoc3Bpa2VFbmFibGVbM10pIHtcbiAgICAgIGxpbmUuZHJhd0xpbmUoXG4gICAgICAgIGNlbnRlclgsIGNlbnRlclksXG4gICAgICAgIGNlbnRlclgsIHZpZXdQaXhlbHNbM10sXG4gICAgICAgIHNwaWtlV2lkdGhbM10sIHNwaWtlQ29sb3JbM10pXG4gICAgfVxuICB9XG59XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5wbG90LnJlbW92ZU92ZXJsYXkodGhpcylcbn1cblxuZnVuY3Rpb24gY3JlYXRlU3Bpa2VzMkQocGxvdCwgb3B0aW9ucykge1xuICB2YXIgc3Bpa2VzID0gbmV3IEdMU3Bpa2VzMkQocGxvdClcbiAgc3Bpa2VzLnVwZGF0ZShvcHRpb25zKVxuICBwbG90LmFkZE92ZXJsYXkoc3Bpa2VzKVxuICByZXR1cm4gc3Bpa2VzXG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIG1vdXNlQ2hhbmdlID0gcmVxdWlyZSgnbW91c2UtY2hhbmdlJyk7XG52YXIgbW91c2VXaGVlbCA9IHJlcXVpcmUoJ21vdXNlLXdoZWVsJyk7XG52YXIgbW91c2VPZmZzZXQgPSByZXF1aXJlKCdtb3VzZS1ldmVudC1vZmZzZXQnKTtcbnZhciBjYXJ0ZXNpYW5Db25zdGFudHMgPSByZXF1aXJlKCcuLi9jYXJ0ZXNpYW4vY29uc3RhbnRzJyk7XG52YXIgaGFzUGFzc2l2ZSA9IHJlcXVpcmUoJ2hhcy1wYXNzaXZlLWV2ZW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUNhbWVyYTtcblxuZnVuY3Rpb24gQ2FtZXJhMkQoZWxlbWVudCwgcGxvdCkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgdGhpcy5wbG90ID0gcGxvdDtcbiAgICB0aGlzLm1vdXNlTGlzdGVuZXIgPSBudWxsO1xuICAgIHRoaXMud2hlZWxMaXN0ZW5lciA9IG51bGw7XG4gICAgdGhpcy5sYXN0SW5wdXRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICB0aGlzLmxhc3RQb3MgPSBbMCwgMF07XG4gICAgdGhpcy5ib3hFbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5ib3hJbml0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmJveFN0YXJ0ID0gWzAsIDBdO1xuICAgIHRoaXMuYm94RW5kID0gWzAsIDBdO1xuICAgIHRoaXMuZHJhZ1N0YXJ0ID0gWzAsIDBdO1xufVxuXG5cbmZ1bmN0aW9uIGNyZWF0ZUNhbWVyYShzY2VuZSkge1xuICAgIHZhciBlbGVtZW50ID0gc2NlbmUubW91c2VDb250YWluZXI7XG4gICAgdmFyIHBsb3QgPSBzY2VuZS5nbHBsb3Q7XG4gICAgdmFyIHJlc3VsdCA9IG5ldyBDYW1lcmEyRChlbGVtZW50LCBwbG90KTtcblxuICAgIGZ1bmN0aW9uIHVuU2V0QXV0b1JhbmdlKCkge1xuICAgICAgICBzY2VuZS54YXhpcy5hdXRvcmFuZ2UgPSBmYWxzZTtcbiAgICAgICAgc2NlbmUueWF4aXMuYXV0b3JhbmdlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U3VicGxvdENvbnN0cmFpbnQoKSB7XG4gICAgICAgIC8vIG5vdGU6IHRoaXMgYXNzdW1lcyB3ZSBvbmx5IGhhdmUgb25lIHggYW5kIG9uZSB5IGF4aXMgb24gdGhpcyBzdWJwbG90XG4gICAgICAgIC8vIHdoZW4gdGhpcyBjb25zdHJhaW50IGlzIGxpZnRlZCB0aGlzIGJsb2NrIHdvbid0IG1ha2Ugc2Vuc2VcbiAgICAgICAgdmFyIGNvbnN0cmFpbnRzID0gc2NlbmUuZ3JhcGhEaXYuX2Z1bGxMYXlvdXQuX2F4aXNDb25zdHJhaW50R3JvdXBzO1xuICAgICAgICB2YXIgeGFJZCA9IHNjZW5lLnhheGlzLl9pZDtcbiAgICAgICAgdmFyIHlhSWQgPSBzY2VuZS55YXhpcy5faWQ7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjb25zdHJhaW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoY29uc3RyYWludHNbaV1beGFJZF0gIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgaWYoY29uc3RyYWludHNbaV1beWFJZF0gIT09IC0xKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVzdWx0Lm1vdXNlTGlzdGVuZXIgPSBtb3VzZUNoYW5nZShlbGVtZW50LCBoYW5kbGVJbnRlcmFjdGlvbik7XG5cbiAgICAvLyBlbmFibGUgc2ltcGxlIHRvdWNoIGludGVyYWN0aW9uc1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIHZhciB4eSA9IG1vdXNlT2Zmc2V0KGV2LmNoYW5nZWRUb3VjaGVzWzBdLCBlbGVtZW50KTtcbiAgICAgICAgaGFuZGxlSW50ZXJhY3Rpb24oMCwgeHlbMF0sIHh5WzFdKTtcbiAgICAgICAgaGFuZGxlSW50ZXJhY3Rpb24oMSwgeHlbMF0sIHh5WzFdKTtcblxuICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH0sIGhhc1Bhc3NpdmUgPyB7cGFzc2l2ZTogZmFsc2V9IDogZmFsc2UpO1xuICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHh5ID0gbW91c2VPZmZzZXQoZXYuY2hhbmdlZFRvdWNoZXNbMF0sIGVsZW1lbnQpO1xuICAgICAgICBoYW5kbGVJbnRlcmFjdGlvbigxLCB4eVswXSwgeHlbMV0pO1xuXG4gICAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfSwgaGFzUGFzc2l2ZSA/IHtwYXNzaXZlOiBmYWxzZX0gOiBmYWxzZSk7XG4gICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIGZ1bmN0aW9uKGV2KSB7XG4gICAgICAgIGhhbmRsZUludGVyYWN0aW9uKDAsIHJlc3VsdC5sYXN0UG9zWzBdLCByZXN1bHQubGFzdFBvc1sxXSk7XG5cbiAgICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICB9LCBoYXNQYXNzaXZlID8ge3Bhc3NpdmU6IGZhbHNlfSA6IGZhbHNlKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZUludGVyYWN0aW9uKGJ1dHRvbnMsIHgsIHkpIHtcbiAgICAgICAgdmFyIGRhdGFCb3ggPSBzY2VuZS5jYWxjRGF0YUJveCgpO1xuICAgICAgICB2YXIgdmlld0JveCA9IHBsb3Qudmlld0JveDtcblxuICAgICAgICB2YXIgbGFzdFggPSByZXN1bHQubGFzdFBvc1swXTtcbiAgICAgICAgdmFyIGxhc3RZID0gcmVzdWx0Lmxhc3RQb3NbMV07XG5cbiAgICAgICAgdmFyIE1JTkRSQUcgPSBjYXJ0ZXNpYW5Db25zdGFudHMuTUlORFJBRyAqIHBsb3QucGl4ZWxSYXRpbztcbiAgICAgICAgdmFyIE1JTlpPT00gPSBjYXJ0ZXNpYW5Db25zdGFudHMuTUlOWk9PTSAqIHBsb3QucGl4ZWxSYXRpbztcblxuICAgICAgICB2YXIgZHgsIGR5O1xuXG4gICAgICAgIHggKj0gcGxvdC5waXhlbFJhdGlvO1xuICAgICAgICB5ICo9IHBsb3QucGl4ZWxSYXRpbztcblxuICAgICAgICAvLyBtb3VzZUNoYW5nZSBnaXZlcyB5IGFib3V0IHRvcDsgY29udmVydCB0byBhYm91dCBib3R0b21cbiAgICAgICAgeSA9ICh2aWV3Qm94WzNdIC0gdmlld0JveFsxXSkgLSB5O1xuXG4gICAgICAgIGZ1bmN0aW9uIHVwZGF0ZVJhbmdlKGkwLCBzdGFydCwgZW5kKSB7XG4gICAgICAgICAgICB2YXIgcmFuZ2UwID0gTWF0aC5taW4oc3RhcnQsIGVuZCk7XG4gICAgICAgICAgICB2YXIgcmFuZ2UxID0gTWF0aC5tYXgoc3RhcnQsIGVuZCk7XG5cbiAgICAgICAgICAgIGlmKHJhbmdlMCAhPT0gcmFuZ2UxKSB7XG4gICAgICAgICAgICAgICAgZGF0YUJveFtpMF0gPSByYW5nZTA7XG4gICAgICAgICAgICAgICAgZGF0YUJveFtpMCArIDJdID0gcmFuZ2UxO1xuICAgICAgICAgICAgICAgIHJlc3VsdC5kYXRhQm94ID0gZGF0YUJveDtcbiAgICAgICAgICAgICAgICBzY2VuZS5zZXRSYW5nZXMoZGF0YUJveCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHNjZW5lLnNlbGVjdEJveC5zZWxlY3RCb3ggPSBbMCwgMCwgMSwgMV07XG4gICAgICAgICAgICAgICAgc2NlbmUuZ2xwbG90LnNldERpcnR5KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBzd2l0Y2goc2NlbmUuZnVsbExheW91dC5kcmFnbW9kZSkge1xuICAgICAgICAgICAgY2FzZSAnem9vbSc6XG4gICAgICAgICAgICAgICAgaWYoYnV0dG9ucykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YVggPSB4IC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmlld0JveFsyXSAtIHZpZXdCb3hbMF0pICogKGRhdGFCb3hbMl0gLSBkYXRhQm94WzBdKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQm94WzBdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGF0YVkgPSB5IC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAodmlld0JveFszXSAtIHZpZXdCb3hbMV0pICogKGRhdGFCb3hbM10gLSBkYXRhQm94WzFdKSArXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhQm94WzFdO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmKCFyZXN1bHQuYm94SW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm94U3RhcnRbMF0gPSBkYXRhWDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3hTdGFydFsxXSA9IGRhdGFZO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRyYWdTdGFydFswXSA9IHg7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuZHJhZ1N0YXJ0WzFdID0geTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3hFbmRbMF0gPSBkYXRhWDtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveEVuZFsxXSA9IGRhdGFZO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHdlIG5lZWQgdG8gbWFyayB0aGUgYm94IGFzIGluaXRpYWxpemVkIHJpZ2h0IGF3YXlcbiAgICAgICAgICAgICAgICAgICAgLy8gc28gdGhhdCB3ZSBjYW4gdGVsbCB0aGUgc3RhcnQgYW5kIGVuZCBwb2ludHMgYXBhcnRcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveEluaXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gYnV0IGRvbid0IGFjdHVhbGx5IGVuYWJsZSB0aGUgYm94IHVudGlsIHRoZSBjdXJzb3IgbW92ZXNcbiAgICAgICAgICAgICAgICAgICAgaWYoIXJlc3VsdC5ib3hFbmFibGVkICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3hTdGFydFswXSAhPT0gcmVzdWx0LmJveEVuZFswXSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveFN0YXJ0WzFdICE9PSByZXN1bHQuYm94RW5kWzFdKVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3hFbmFibGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0cmFpbiBhc3BlY3QgcmF0aW8gaWYgdGhlIGF4ZXMgcmVxdWlyZSBpdFxuICAgICAgICAgICAgICAgICAgICB2YXIgc21hbGxEeCA9IE1hdGguYWJzKHJlc3VsdC5kcmFnU3RhcnRbMF0gLSB4KSA8IE1JTlpPT007XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbWFsbER5ID0gTWF0aC5hYnMocmVzdWx0LmRyYWdTdGFydFsxXSAtIHkpIDwgTUlOWk9PTTtcbiAgICAgICAgICAgICAgICAgICAgaWYoZ2V0U3VicGxvdENvbnN0cmFpbnQoKSAmJiAhKHNtYWxsRHggJiYgc21hbGxEeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR4ID0gcmVzdWx0LmJveEVuZFswXSAtIHJlc3VsdC5ib3hTdGFydFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGR5ID0gcmVzdWx0LmJveEVuZFsxXSAtIHJlc3VsdC5ib3hTdGFydFsxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkeWR4ID0gKGRhdGFCb3hbM10gLSBkYXRhQm94WzFdKSAvIChkYXRhQm94WzJdIC0gZGF0YUJveFswXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKE1hdGguYWJzKGR4ICogZHlkeCkgPiBNYXRoLmFicyhkeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm94RW5kWzFdID0gcmVzdWx0LmJveFN0YXJ0WzFdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgTWF0aC5hYnMoZHgpICogZHlkeCAqIChkeSA+PSAwID8gMSA6IC0xKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGdsLXNlbGVjdC1ib3ggY2xpcHMgdG8gdGhlIHBsb3QgYXJlYSBib3VuZHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gd2hpY2ggYnJlYWtzIHRoZSBheGlzIGNvbnN0cmFpbnQsIHNvIGRvbid0IGFsbG93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhpcyBib3ggdG8gZ28gb3V0IG9mIGJvdW5kc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlc3VsdC5ib3hFbmRbMV0gPCBkYXRhQm94WzFdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3hFbmRbMV0gPSBkYXRhQm94WzFdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm94RW5kWzBdID0gcmVzdWx0LmJveFN0YXJ0WzBdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhQm94WzFdIC0gcmVzdWx0LmJveFN0YXJ0WzFdKSAvIE1hdGguYWJzKGR5ZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZihyZXN1bHQuYm94RW5kWzFdID4gZGF0YUJveFszXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm94RW5kWzFdID0gZGF0YUJveFszXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveEVuZFswXSA9IHJlc3VsdC5ib3hTdGFydFswXSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGF0YUJveFszXSAtIHJlc3VsdC5ib3hTdGFydFsxXSkgLyBNYXRoLmFicyhkeWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3hFbmRbMF0gPSByZXN1bHQuYm94U3RhcnRbMF0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNYXRoLmFicyhkeSkgLyBkeWR4ICogKGR4ID49IDAgPyAxIDogLTEpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYocmVzdWx0LmJveEVuZFswXSA8IGRhdGFCb3hbMF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveEVuZFswXSA9IGRhdGFCb3hbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3hFbmRbMV0gPSByZXN1bHQuYm94U3RhcnRbMV0gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRhdGFCb3hbMF0gLSByZXN1bHQuYm94U3RhcnRbMF0pICogTWF0aC5hYnMoZHlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlc3VsdC5ib3hFbmRbMF0gPiBkYXRhQm94WzJdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5ib3hFbmRbMF0gPSBkYXRhQm94WzJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm94RW5kWzFdID0gcmVzdWx0LmJveFN0YXJ0WzFdICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkYXRhQm94WzJdIC0gcmVzdWx0LmJveFN0YXJ0WzBdKSAqIE1hdGguYWJzKGR5ZHgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG90aGVyd2lzZSBjbGFtcCBzbWFsbCBjaGFuZ2VzIHRvIHRoZSBvcmlnaW4gc28gd2UgZ2V0IDFEIHpvb21cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc21hbGxEeCkgcmVzdWx0LmJveEVuZFswXSA9IHJlc3VsdC5ib3hTdGFydFswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHNtYWxsRHkpIHJlc3VsdC5ib3hFbmRbMV0gPSByZXN1bHQuYm94U3RhcnRbMV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYocmVzdWx0LmJveEVuYWJsZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgZHggPSByZXN1bHQuYm94U3RhcnRbMF0gIT09IHJlc3VsdC5ib3hFbmRbMF07XG4gICAgICAgICAgICAgICAgICAgIGR5ID0gcmVzdWx0LmJveFN0YXJ0WzFdICE9PSByZXN1bHQuYm94RW5kWzFdO1xuICAgICAgICAgICAgICAgICAgICBpZihkeCB8fCBkeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZHgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVSYW5nZSgwLCByZXN1bHQuYm94U3RhcnRbMF0sIHJlc3VsdC5ib3hFbmRbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLnhheGlzLmF1dG9yYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZHkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVSYW5nZSgxLCByZXN1bHQuYm94U3RhcnRbMV0sIHJlc3VsdC5ib3hFbmRbMV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lLnlheGlzLmF1dG9yYW5nZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUucmVsYXlvdXRDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmUuZ2xwbG90LnNldERpcnR5KCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveEVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmJveEluaXRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihyZXN1bHQuYm94SW5pdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIGJveCB3YXMgaW5pdGVkIGJ1dCBidXR0b24gcmVsZWFzZWQgdGhlbiAtIHJlc2V0IHRoZSBib3hcblxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuYm94SW5pdGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdwYW4nOlxuICAgICAgICAgICAgICAgIHJlc3VsdC5ib3hFbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmVzdWx0LmJveEluaXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYoYnV0dG9ucykge1xuICAgICAgICAgICAgICAgICAgICBpZighcmVzdWx0LnBhbm5pbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5kcmFnU3RhcnRbMF0gPSB4O1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmRyYWdTdGFydFsxXSA9IHk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihNYXRoLmFicyhyZXN1bHQuZHJhZ1N0YXJ0WzBdIC0geCkgPCBNSU5EUkFHKSB4ID0gcmVzdWx0LmRyYWdTdGFydFswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYoTWF0aC5hYnMocmVzdWx0LmRyYWdTdGFydFsxXSAtIHkpIDwgTUlORFJBRykgeSA9IHJlc3VsdC5kcmFnU3RhcnRbMV07XG5cbiAgICAgICAgICAgICAgICAgICAgZHggPSAobGFzdFggLSB4KSAqIChkYXRhQm94WzJdIC0gZGF0YUJveFswXSkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgKHBsb3Qudmlld0JveFsyXSAtIHBsb3Qudmlld0JveFswXSk7XG4gICAgICAgICAgICAgICAgICAgIGR5ID0gKGxhc3RZIC0geSkgKiAoZGF0YUJveFszXSAtIGRhdGFCb3hbMV0pIC9cbiAgICAgICAgICAgICAgICAgICAgICAgIChwbG90LnZpZXdCb3hbM10gLSBwbG90LnZpZXdCb3hbMV0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGRhdGFCb3hbMF0gKz0gZHg7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFCb3hbMl0gKz0gZHg7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFCb3hbMV0gKz0gZHk7XG4gICAgICAgICAgICAgICAgICAgIGRhdGFCb3hbM10gKz0gZHk7XG5cbiAgICAgICAgICAgICAgICAgICAgc2NlbmUuc2V0UmFuZ2VzKGRhdGFCb3gpO1xuXG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wYW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0Lmxhc3RJbnB1dFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICAgICAgICAgICAgICB1blNldEF1dG9SYW5nZSgpO1xuICAgICAgICAgICAgICAgICAgICBzY2VuZS5jYW1lcmFDaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLmhhbmRsZUFubm90YXRpb25zKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHJlc3VsdC5wYW5uaW5nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wYW5uaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHNjZW5lLnJlbGF5b3V0Q2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICByZXN1bHQubGFzdFBvc1swXSA9IHg7XG4gICAgICAgIHJlc3VsdC5sYXN0UG9zWzFdID0geTtcbiAgICB9XG5cbiAgICByZXN1bHQud2hlZWxMaXN0ZW5lciA9IG1vdXNlV2hlZWwoZWxlbWVudCwgZnVuY3Rpb24oZHgsIGR5KSB7XG4gICAgICAgIGlmKCFzY2VuZS5zY3JvbGxab29tKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgdmFyIGRhdGFCb3ggPSBzY2VuZS5jYWxjRGF0YUJveCgpO1xuICAgICAgICB2YXIgdmlld0JveCA9IHBsb3Qudmlld0JveDtcblxuICAgICAgICB2YXIgbGFzdFggPSByZXN1bHQubGFzdFBvc1swXTtcbiAgICAgICAgdmFyIGxhc3RZID0gcmVzdWx0Lmxhc3RQb3NbMV07XG5cbiAgICAgICAgdmFyIHNjYWxlID0gTWF0aC5leHAoNS4wICogZHkgLyAodmlld0JveFszXSAtIHZpZXdCb3hbMV0pKTtcblxuICAgICAgICB2YXIgY3ggPSBsYXN0WCAvXG4gICAgICAgICAgICAgICAgKHZpZXdCb3hbMl0gLSB2aWV3Qm94WzBdKSAqIChkYXRhQm94WzJdIC0gZGF0YUJveFswXSkgK1xuICAgICAgICAgICAgZGF0YUJveFswXTtcbiAgICAgICAgdmFyIGN5ID0gbGFzdFkgL1xuICAgICAgICAgICAgICAgICh2aWV3Qm94WzNdIC0gdmlld0JveFsxXSkgKiAoZGF0YUJveFszXSAtIGRhdGFCb3hbMV0pICtcbiAgICAgICAgICAgIGRhdGFCb3hbMV07XG5cbiAgICAgICAgZGF0YUJveFswXSA9IChkYXRhQm94WzBdIC0gY3gpICogc2NhbGUgKyBjeDtcbiAgICAgICAgZGF0YUJveFsyXSA9IChkYXRhQm94WzJdIC0gY3gpICogc2NhbGUgKyBjeDtcbiAgICAgICAgZGF0YUJveFsxXSA9IChkYXRhQm94WzFdIC0gY3kpICogc2NhbGUgKyBjeTtcbiAgICAgICAgZGF0YUJveFszXSA9IChkYXRhQm94WzNdIC0gY3kpICogc2NhbGUgKyBjeTtcblxuICAgICAgICBzY2VuZS5zZXRSYW5nZXMoZGF0YUJveCk7XG5cbiAgICAgICAgcmVzdWx0Lmxhc3RJbnB1dFRpbWUgPSBEYXRlLm5vdygpO1xuICAgICAgICB1blNldEF1dG9SYW5nZSgpO1xuICAgICAgICBzY2VuZS5jYW1lcmFDaGFuZ2VkKCk7XG4gICAgICAgIHNjZW5lLmhhbmRsZUFubm90YXRpb25zKCk7XG4gICAgICAgIHNjZW5lLnJlbGF5b3V0Q2FsbGJhY2soKTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LCB0cnVlKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi9jYXJ0ZXNpYW4vYXhlcycpO1xuXG52YXIgc3RyMlJHQkFycmF5ID0gcmVxdWlyZSgnLi4vLi4vbGliL3N0cjJyZ2JhcnJheScpO1xuXG5mdW5jdGlvbiBBeGVzMkRPcHRpb25zKHNjZW5lKSB7XG4gICAgdGhpcy5zY2VuZSA9IHNjZW5lO1xuICAgIHRoaXMuZ2wgPSBzY2VuZS5nbDtcbiAgICB0aGlzLnBpeGVsUmF0aW8gPSBzY2VuZS5waXhlbFJhdGlvO1xuXG4gICAgdGhpcy5zY3JlZW5Cb3ggPSBbMCwgMCwgMSwgMV07XG4gICAgdGhpcy52aWV3Qm94ID0gWzAsIDAsIDEsIDFdO1xuICAgIHRoaXMuZGF0YUJveCA9IFstMSwgLTEsIDEsIDFdO1xuXG4gICAgdGhpcy5ib3JkZXJMaW5lRW5hYmxlID0gW2ZhbHNlLCBmYWxzZSwgZmFsc2UsIGZhbHNlXTtcbiAgICB0aGlzLmJvcmRlckxpbmVXaWR0aCA9IFsxLCAxLCAxLCAxXTtcbiAgICB0aGlzLmJvcmRlckxpbmVDb2xvciA9IFtcbiAgICAgICAgWzAsIDAsIDAsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDFdXG4gICAgXTtcblxuICAgIHRoaXMudGlja3MgPSBbW10sIFtdXTtcbiAgICB0aGlzLnRpY2tFbmFibGUgPSBbdHJ1ZSwgdHJ1ZSwgZmFsc2UsIGZhbHNlXTtcbiAgICB0aGlzLnRpY2tQYWQgPSBbMTUsIDE1LCAxNSwgMTVdO1xuICAgIHRoaXMudGlja0FuZ2xlID0gWzAsIDAsIDAsIDBdO1xuICAgIHRoaXMudGlja0NvbG9yID0gW1xuICAgICAgICBbMCwgMCwgMCwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMV1cbiAgICBdO1xuICAgIHRoaXMudGlja01hcmtMZW5ndGggPSBbMCwgMCwgMCwgMF07XG4gICAgdGhpcy50aWNrTWFya1dpZHRoID0gWzAsIDAsIDAsIDBdO1xuICAgIHRoaXMudGlja01hcmtDb2xvciA9IFtcbiAgICAgICAgWzAsIDAsIDAsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDFdXG4gICAgXTtcblxuICAgIHRoaXMubGFiZWxzID0gWyd4JywgJ3knXTtcbiAgICB0aGlzLmxhYmVsRW5hYmxlID0gW3RydWUsIHRydWUsIGZhbHNlLCBmYWxzZV07XG4gICAgdGhpcy5sYWJlbEFuZ2xlID0gWzAsIE1hdGguUEkgLyAyLCAwLCAzLjAgKiBNYXRoLlBJIC8gMl07XG4gICAgdGhpcy5sYWJlbFBhZCA9IFsxNSwgMTUsIDE1LCAxNV07XG4gICAgdGhpcy5sYWJlbFNpemUgPSBbMTIsIDEyXTtcbiAgICB0aGlzLmxhYmVsRm9udCA9IFsnc2Fucy1zZXJpZicsICdzYW5zLXNlcmlmJ107XG4gICAgdGhpcy5sYWJlbENvbG9yID0gW1xuICAgICAgICBbMCwgMCwgMCwgMV0sXG4gICAgICAgIFswLCAwLCAwLCAxXSxcbiAgICAgICAgWzAsIDAsIDAsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMV1cbiAgICBdO1xuXG4gICAgdGhpcy50aXRsZSA9ICcnO1xuICAgIHRoaXMudGl0bGVFbmFibGUgPSB0cnVlO1xuICAgIHRoaXMudGl0bGVDZW50ZXIgPSBbMCwgMCwgMCwgMF07XG4gICAgdGhpcy50aXRsZUFuZ2xlID0gMDtcbiAgICB0aGlzLnRpdGxlQ29sb3IgPSBbMCwgMCwgMCwgMV07XG4gICAgdGhpcy50aXRsZUZvbnQgPSAnc2Fucy1zZXJpZic7XG4gICAgdGhpcy50aXRsZVNpemUgPSAxODtcblxuICAgIHRoaXMuZ3JpZExpbmVFbmFibGUgPSBbdHJ1ZSwgdHJ1ZV07XG4gICAgdGhpcy5ncmlkTGluZUNvbG9yID0gW1xuICAgICAgICBbMCwgMCwgMCwgMC41XSxcbiAgICAgICAgWzAsIDAsIDAsIDAuNV1cbiAgICBdO1xuICAgIHRoaXMuZ3JpZExpbmVXaWR0aCA9IFsxLCAxXTtcblxuICAgIHRoaXMuemVyb0xpbmVFbmFibGUgPSBbdHJ1ZSwgdHJ1ZV07XG4gICAgdGhpcy56ZXJvTGluZVdpZHRoID0gWzEsIDFdO1xuICAgIHRoaXMuemVyb0xpbmVDb2xvciA9IFtcbiAgICAgICAgWzAsIDAsIDAsIDFdLFxuICAgICAgICBbMCwgMCwgMCwgMV1cbiAgICBdO1xuXG4gICAgdGhpcy5ib3JkZXJDb2xvciA9IFswLCAwLCAwLCAwXTtcbiAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9IFswLCAwLCAwLCAwXTtcblxuICAgIHRoaXMuc3RhdGljID0gdGhpcy5zY2VuZS5zdGF0aWNQbG90O1xufVxuXG52YXIgcHJvdG8gPSBBeGVzMkRPcHRpb25zLnByb3RvdHlwZTtcblxudmFyIEFYRVMgPSBbJ3hheGlzJywgJ3lheGlzJ107XG5cbnByb3RvLm1lcmdlID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgIC8vIHRpdGxlcyBhcmUgcmVuZGVyZWQgaW4gU1ZHXG4gICAgdGhpcy50aXRsZUVuYWJsZSA9IGZhbHNlO1xuICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gc3RyMlJHQkFycmF5KG9wdGlvbnMucGxvdF9iZ2NvbG9yKTtcblxuICAgIHZhciBheGlzTmFtZSwgYXgsIGF4VGl0bGUsIGF4TWlycm9yO1xuICAgIHZhciBoYXNBeGlzSW5EZmx0UG9zLCBoYXNBeGlzSW5BbHRyUG9zLCBoYXNTaGFyZWRBeGlzLCBtaXJyb3JMaW5lcywgbWlycm9yVGlja3M7XG4gICAgdmFyIGksIGo7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCAyOyArK2kpIHtcbiAgICAgICAgYXhpc05hbWUgPSBBWEVTW2ldO1xuICAgICAgICB2YXIgYXhpc0xldHRlciA9IGF4aXNOYW1lLmNoYXJBdCgwKTtcblxuICAgICAgICAvLyBnZXQgb3B0aW9ucyByZWxldmFudCB0byB0aGlzIHN1YnBsb3QsXG4gICAgICAgIC8vICdfbmFtZScgaXMgZS5nLiB4YXhpcywgeGF4aXMyLCB5YXhpcywgeWF4aXM0IC4uLlxuICAgICAgICBheCA9IG9wdGlvbnNbdGhpcy5zY2VuZVtheGlzTmFtZV0uX25hbWVdO1xuXG4gICAgICAgIGF4VGl0bGUgPSBheC50aXRsZS50ZXh0ID09PSB0aGlzLnNjZW5lLmZ1bGxMYXlvdXQuX2RmbHRUaXRsZVtheGlzTGV0dGVyXSA/ICcnIDogYXgudGl0bGUudGV4dDtcblxuICAgICAgICBmb3IoaiA9IDA7IGogPD0gMjsgaiArPSAyKSB7XG4gICAgICAgICAgICB0aGlzLmxhYmVsRW5hYmxlW2kgKyBqXSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5sYWJlbHNbaSArIGpdID0gYXhUaXRsZTtcbiAgICAgICAgICAgIHRoaXMubGFiZWxDb2xvcltpICsgal0gPSBzdHIyUkdCQXJyYXkoYXgudGl0bGUuZm9udC5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLmxhYmVsRm9udFtpICsgal0gPSBheC50aXRsZS5mb250LmZhbWlseTtcbiAgICAgICAgICAgIHRoaXMubGFiZWxTaXplW2kgKyBqXSA9IGF4LnRpdGxlLmZvbnQuc2l6ZTtcbiAgICAgICAgICAgIHRoaXMubGFiZWxQYWRbaSArIGpdID0gdGhpcy5nZXRMYWJlbFBhZChheGlzTmFtZSwgYXgpO1xuXG4gICAgICAgICAgICB0aGlzLnRpY2tFbmFibGVbaSArIGpdID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRpY2tDb2xvcltpICsgal0gPSBzdHIyUkdCQXJyYXkoKGF4LnRpY2tmb250IHx8IHt9KS5jb2xvcik7XG4gICAgICAgICAgICB0aGlzLnRpY2tBbmdsZVtpICsgal0gPSAoYXgudGlja2FuZ2xlID09PSAnYXV0bycpID9cbiAgICAgICAgICAgICAgICAwIDpcbiAgICAgICAgICAgICAgICBNYXRoLlBJICogLWF4LnRpY2thbmdsZSAvIDE4MDtcbiAgICAgICAgICAgIHRoaXMudGlja1BhZFtpICsgal0gPSB0aGlzLmdldFRpY2tQYWQoYXgpO1xuXG4gICAgICAgICAgICB0aGlzLnRpY2tNYXJrTGVuZ3RoW2kgKyBqXSA9IDA7XG4gICAgICAgICAgICB0aGlzLnRpY2tNYXJrV2lkdGhbaSArIGpdID0gYXgudGlja3dpZHRoIHx8IDA7XG4gICAgICAgICAgICB0aGlzLnRpY2tNYXJrQ29sb3JbaSArIGpdID0gc3RyMlJHQkFycmF5KGF4LnRpY2tjb2xvcik7XG5cbiAgICAgICAgICAgIHRoaXMuYm9yZGVyTGluZUVuYWJsZVtpICsgal0gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuYm9yZGVyTGluZUNvbG9yW2kgKyBqXSA9IHN0cjJSR0JBcnJheShheC5saW5lY29sb3IpO1xuICAgICAgICAgICAgdGhpcy5ib3JkZXJMaW5lV2lkdGhbaSArIGpdID0gYXgubGluZXdpZHRoIHx8IDA7XG4gICAgICAgIH1cblxuICAgICAgICBoYXNTaGFyZWRBeGlzID0gdGhpcy5oYXNTaGFyZWRBeGlzKGF4KTtcbiAgICAgICAgaGFzQXhpc0luRGZsdFBvcyA9IHRoaXMuaGFzQXhpc0luRGZsdFBvcyhheGlzTmFtZSwgYXgpICYmICFoYXNTaGFyZWRBeGlzO1xuICAgICAgICBoYXNBeGlzSW5BbHRyUG9zID0gdGhpcy5oYXNBeGlzSW5BbHRyUG9zKGF4aXNOYW1lLCBheCkgJiYgIWhhc1NoYXJlZEF4aXM7XG5cbiAgICAgICAgYXhNaXJyb3IgPSBheC5taXJyb3IgfHwgZmFsc2U7XG4gICAgICAgIG1pcnJvckxpbmVzID0gaGFzU2hhcmVkQXhpcyA/XG4gICAgICAgICAgICAoU3RyaW5nKGF4TWlycm9yKS5pbmRleE9mKCdhbGwnKSAhPT0gLTEpIDogIC8vICdhbGwnIG9yICdhbGx0aWNrcydcbiAgICAgICAgICAgICEhYXhNaXJyb3I7ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gYWxsIGJ1dCBmYWxzZVxuICAgICAgICBtaXJyb3JUaWNrcyA9IGhhc1NoYXJlZEF4aXMgP1xuICAgICAgICAgICAgKGF4TWlycm9yID09PSAnYWxsdGlja3MnKSA6XG4gICAgICAgICAgICAoU3RyaW5nKGF4TWlycm9yKS5pbmRleE9mKCd0aWNrcycpICE9PSAtMSk7IC8vICd0aWNrcycgb3IgJ2FsbHRpY2tzJ1xuXG4gICAgICAgIC8vIEF4aXMgdGl0bGVzIGFuZCB0aWNrIGxhYmVscyBjYW4gb25seSBhcHBlYXIgb2Ygb25lIHNpZGUgb2YgdGhlIHNjZW5lXG4gICAgICAgIC8vICBhbmQgYXJlIG5ldmVyIHNob3cgb24gc3VicGxvdHMgdGhhdCBzaGFyZSBleGlzdGluZyBheGVzLlxuXG4gICAgICAgIGlmKGhhc0F4aXNJbkRmbHRQb3MpIHRoaXMubGFiZWxFbmFibGVbaV0gPSB0cnVlO1xuICAgICAgICBlbHNlIGlmKGhhc0F4aXNJbkFsdHJQb3MpIHRoaXMubGFiZWxFbmFibGVbaSArIDJdID0gdHJ1ZTtcblxuICAgICAgICBpZihoYXNBeGlzSW5EZmx0UG9zKSB0aGlzLnRpY2tFbmFibGVbaV0gPSBheC5zaG93dGlja2xhYmVscztcbiAgICAgICAgZWxzZSBpZihoYXNBeGlzSW5BbHRyUG9zKSB0aGlzLnRpY2tFbmFibGVbaSArIDJdID0gYXguc2hvd3RpY2tsYWJlbHM7XG5cbiAgICAgICAgLy8gR3JpZCBsaW5lcyBhbmQgdGlja3MgY2FuIGFwcGVhciBvbiBib3RoIHNpZGVzIG9mIHRoZSBzY2VuZVxuICAgICAgICAvLyAgYW5kIGNhbiBhcHBlYXIgb24gc3VicGxvdCB0aGF0IHNoYXJlIGV4aXN0aW5nIGF4ZXMgdmlhIGBheC5taXJyb3JgLlxuXG4gICAgICAgIGlmKGhhc0F4aXNJbkRmbHRQb3MgfHwgbWlycm9yTGluZXMpIHRoaXMuYm9yZGVyTGluZUVuYWJsZVtpXSA9IGF4LnNob3dsaW5lO1xuICAgICAgICBpZihoYXNBeGlzSW5BbHRyUG9zIHx8IG1pcnJvckxpbmVzKSB0aGlzLmJvcmRlckxpbmVFbmFibGVbaSArIDJdID0gYXguc2hvd2xpbmU7XG5cbiAgICAgICAgaWYoaGFzQXhpc0luRGZsdFBvcyB8fCBtaXJyb3JUaWNrcykgdGhpcy50aWNrTWFya0xlbmd0aFtpXSA9IHRoaXMuZ2V0VGlja01hcmtMZW5ndGgoYXgpO1xuICAgICAgICBpZihoYXNBeGlzSW5BbHRyUG9zIHx8IG1pcnJvclRpY2tzKSB0aGlzLnRpY2tNYXJrTGVuZ3RoW2kgKyAyXSA9IHRoaXMuZ2V0VGlja01hcmtMZW5ndGgoYXgpO1xuXG4gICAgICAgIHRoaXMuZ3JpZExpbmVFbmFibGVbaV0gPSBheC5zaG93Z3JpZDtcbiAgICAgICAgdGhpcy5ncmlkTGluZUNvbG9yW2ldID0gc3RyMlJHQkFycmF5KGF4LmdyaWRjb2xvcik7XG4gICAgICAgIHRoaXMuZ3JpZExpbmVXaWR0aFtpXSA9IGF4LmdyaWR3aWR0aDtcblxuICAgICAgICB0aGlzLnplcm9MaW5lRW5hYmxlW2ldID0gYXguemVyb2xpbmU7XG4gICAgICAgIHRoaXMuemVyb0xpbmVDb2xvcltpXSA9IHN0cjJSR0JBcnJheShheC56ZXJvbGluZWNvbG9yKTtcbiAgICAgICAgdGhpcy56ZXJvTGluZVdpZHRoW2ldID0gYXguemVyb2xpbmV3aWR0aDtcbiAgICB9XG59O1xuXG4vLyBpcyBhbiBheGlzIHNoYXJlZCB3aXRoIGFuIGFscmVhZHktZHJhd24gc3VicGxvdCA/XG5wcm90by5oYXNTaGFyZWRBeGlzID0gZnVuY3Rpb24oYXgpIHtcbiAgICB2YXIgc2NlbmUgPSB0aGlzLnNjZW5lO1xuICAgIHZhciBzdWJwbG90SWRzID0gc2NlbmUuZnVsbExheW91dC5fc3VicGxvdHMuZ2wyZDtcbiAgICB2YXIgbGlzdCA9IEF4ZXMuZmluZFN1YnBsb3RzV2l0aEF4aXMoc3VicGxvdElkcywgYXgpO1xuXG4gICAgLy8gaWYgaW5kZXggPT09IDAsIHRoZW4gdGhlIHN1YnBsb3QgaXMgYWxyZWFkeSBkcmF3biBhcyBzdWJwbG90c1xuICAgIC8vIGFyZSBkcmF3biBpbiBvcmRlci5cbiAgICByZXR1cm4gKGxpc3QuaW5kZXhPZihzY2VuZS5pZCkgIT09IDApO1xufTtcblxuLy8gaGFzIGFuIGF4aXMgaW4gZGVmYXVsdCBwb3NpdGlvbiAoaS5lLiBib3R0b20vbGVmdCkgP1xucHJvdG8uaGFzQXhpc0luRGZsdFBvcyA9IGZ1bmN0aW9uKGF4aXNOYW1lLCBheCkge1xuICAgIHZhciBheFNpZGUgPSBheC5zaWRlO1xuXG4gICAgaWYoYXhpc05hbWUgPT09ICd4YXhpcycpIHJldHVybiAoYXhTaWRlID09PSAnYm90dG9tJyk7XG4gICAgZWxzZSBpZihheGlzTmFtZSA9PT0gJ3lheGlzJykgcmV0dXJuIChheFNpZGUgPT09ICdsZWZ0Jyk7XG59O1xuXG4vLyBoYXMgYW4gYXhpcyBpbiBhbHRlcm5hdGUgcG9zaXRpb24gKGkuZS4gdG9wL3JpZ2h0KSA/XG5wcm90by5oYXNBeGlzSW5BbHRyUG9zID0gZnVuY3Rpb24oYXhpc05hbWUsIGF4KSB7XG4gICAgdmFyIGF4U2lkZSA9IGF4LnNpZGU7XG5cbiAgICBpZihheGlzTmFtZSA9PT0gJ3hheGlzJykgcmV0dXJuIChheFNpZGUgPT09ICd0b3AnKTtcbiAgICBlbHNlIGlmKGF4aXNOYW1lID09PSAneWF4aXMnKSByZXR1cm4gKGF4U2lkZSA9PT0gJ3JpZ2h0Jyk7XG59O1xuXG5wcm90by5nZXRMYWJlbFBhZCA9IGZ1bmN0aW9uKGF4aXNOYW1lLCBheCkge1xuICAgIHZhciBvZmZzZXRCYXNlID0gMS41O1xuICAgIHZhciBmb250U2l6ZSA9IGF4LnRpdGxlLmZvbnQuc2l6ZTtcbiAgICB2YXIgc2hvd3RpY2tsYWJlbHMgPSBheC5zaG93dGlja2xhYmVscztcblxuICAgIGlmKGF4aXNOYW1lID09PSAneGF4aXMnKSB7XG4gICAgICAgIHJldHVybiAoYXguc2lkZSA9PT0gJ3RvcCcpID9cbiAgICAgICAgICAgIC0xMCArIGZvbnRTaXplICogKG9mZnNldEJhc2UgKyAoc2hvd3RpY2tsYWJlbHMgPyAxIDogMCkpIDpcbiAgICAgICAgICAgIC0xMCArIGZvbnRTaXplICogKG9mZnNldEJhc2UgKyAoc2hvd3RpY2tsYWJlbHMgPyAwLjUgOiAwKSk7XG4gICAgfSBlbHNlIGlmKGF4aXNOYW1lID09PSAneWF4aXMnKSB7XG4gICAgICAgIHJldHVybiAoYXguc2lkZSA9PT0gJ3JpZ2h0JykgP1xuICAgICAgICAgICAgMTAgKyBmb250U2l6ZSAqIChvZmZzZXRCYXNlICsgKHNob3d0aWNrbGFiZWxzID8gMSA6IDAuNSkpIDpcbiAgICAgICAgICAgIDEwICsgZm9udFNpemUgKiAob2Zmc2V0QmFzZSArIChzaG93dGlja2xhYmVscyA/IDAuNSA6IDApKTtcbiAgICB9XG59O1xuXG5wcm90by5nZXRUaWNrUGFkID0gZnVuY3Rpb24oYXgpIHtcbiAgICByZXR1cm4gKGF4LnRpY2tzID09PSAnb3V0c2lkZScpID8gMTAgKyBheC50aWNrbGVuIDogMTU7XG59O1xuXG5wcm90by5nZXRUaWNrTWFya0xlbmd0aCA9IGZ1bmN0aW9uKGF4KSB7XG4gICAgaWYoIWF4LnRpY2tzKSByZXR1cm4gMDtcblxuICAgIHZhciB0aWNrbGVuID0gYXgudGlja2xlbjtcblxuICAgIHJldHVybiAoYXgudGlja3MgPT09ICdpbnNpZGUnKSA/IC10aWNrbGVuIDogdGlja2xlbjtcbn07XG5cblxuZnVuY3Rpb24gY3JlYXRlQXhlczJEKHNjZW5lKSB7XG4gICAgcmV0dXJuIG5ldyBBeGVzMkRPcHRpb25zKHNjZW5lKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVBeGVzMkQ7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIG92ZXJyaWRlQWxsID0gcmVxdWlyZSgnLi4vLi4vcGxvdF9hcGkvZWRpdF90eXBlcycpLm92ZXJyaWRlQWxsO1xuXG52YXIgU2NlbmUyRCA9IHJlcXVpcmUoJy4vc2NlbmUyZCcpO1xudmFyIGxheW91dEdsb2JhbEF0dHJzID0gcmVxdWlyZSgnLi4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcbnZhciB4bWxuc05hbWVzcGFjZXMgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMveG1sbnNfbmFtZXNwYWNlcycpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9jb25zdGFudHMnKTtcbnZhciBDYXJ0ZXNpYW4gPSByZXF1aXJlKCcuLi9jYXJ0ZXNpYW4nKTtcbnZhciBmeEF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meC9sYXlvdXRfYXR0cmlidXRlcycpO1xudmFyIGdldFN1YnBsb3REYXRhID0gcmVxdWlyZSgnLi4vZ2V0X2RhdGEnKS5nZXRTdWJwbG90RGF0YTtcblxuZXhwb3J0cy5uYW1lID0gJ2dsMmQnO1xuXG5leHBvcnRzLmF0dHIgPSBbJ3hheGlzJywgJ3lheGlzJ107XG5cbmV4cG9ydHMuaWRSb290ID0gWyd4JywgJ3knXTtcblxuZXhwb3J0cy5pZFJlZ2V4ID0gY29uc3RhbnRzLmlkUmVnZXg7XG5cbmV4cG9ydHMuYXR0clJlZ2V4ID0gY29uc3RhbnRzLmF0dHJSZWdleDtcblxuZXhwb3J0cy5hdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL2F0dHJpYnV0ZXMnKTtcblxuZXhwb3J0cy5zdXBwbHlMYXlvdXREZWZhdWx0cyA9IGZ1bmN0aW9uKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhKSB7XG4gICAgaWYoIWxheW91dE91dC5faGFzKCdjYXJ0ZXNpYW4nKSkge1xuICAgICAgICBDYXJ0ZXNpYW4uc3VwcGx5TGF5b3V0RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEpO1xuICAgIH1cbn07XG5cbi8vIGdsMmQgdXNlcyBzdmcgYXhpcyBhdHRyaWJ1dGVzIHZlcmJhdGltLCBidXQgb3ZlcnJpZGVzIGVkaXRUeXBlXG4vLyB0aGlzIGNvdWxkIHBvdGVudGlhbGx5IGJlIGp1c3QgYGxheW91dEF0dHJpYnV0ZXNgIGJ1dCBpdCB3b3VsZFxuLy8gc3RpbGwgbmVlZCBzcGVjaWFsIGhhbmRsaW5nIHNvbWV3aGVyZSB0byBnaXZlIGl0IHByZWNlZGVuY2Ugb3ZlclxuLy8gdGhlIHN2ZyB2ZXJzaW9uIHdoZW4gYm90aCBhcmUgaW4gdXNlIG9uIG9uZSBwbG90XG5leHBvcnRzLmxheW91dEF0dHJPdmVycmlkZXMgPSBvdmVycmlkZUFsbChDYXJ0ZXNpYW4ubGF5b3V0QXR0cmlidXRlcywgJ3Bsb3QnLCAnZnJvbS1yb290Jyk7XG5cbi8vIHNpbWlsYXIgb3ZlcnJpZGVzIGZvciBiYXNlIHBsb3QgYXR0cmlidXRlcyAoYW5kIHRob3NlIGFkZGVkIGJ5IGNvbXBvbmVudHMpXG5leHBvcnRzLmJhc2VMYXlvdXRBdHRyT3ZlcnJpZGVzID0gb3ZlcnJpZGVBbGwoe1xuICAgIHBsb3RfYmdjb2xvcjogbGF5b3V0R2xvYmFsQXR0cnMucGxvdF9iZ2NvbG9yLFxuICAgIGhvdmVybGFiZWw6IGZ4QXR0cnMuaG92ZXJsYWJlbFxuICAgIC8vIGRyYWdtb2RlIG5lZWRzIGNhbGMgYnV0IG9ubHkgd2hlbiB0cmFuc2l0aW9uaW5nIFRPIGxhc3NvIG9yIHNlbGVjdFxuICAgIC8vIHNvIGZvciBub3cgaXQncyBsZWZ0IGluc2lkZSBfcmVsYXlvdXRcbiAgICAvLyBkcmFnbW9kZTogZnhBdHRycy5kcmFnbW9kZVxufSwgJ3Bsb3QnLCAnbmVzdGVkJyk7XG5cbmV4cG9ydHMucGxvdCA9IGZ1bmN0aW9uIHBsb3QoZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBmdWxsRGF0YSA9IGdkLl9mdWxsRGF0YTtcbiAgICB2YXIgc3VicGxvdElkcyA9IGZ1bGxMYXlvdXQuX3N1YnBsb3RzLmdsMmQ7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VicGxvdElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc3VicGxvdElkID0gc3VicGxvdElkc1tpXTtcbiAgICAgICAgdmFyIHN1YnBsb3RPYmogPSBmdWxsTGF5b3V0Ll9wbG90c1tzdWJwbG90SWRdO1xuICAgICAgICB2YXIgZnVsbFN1YnBsb3REYXRhID0gZ2V0U3VicGxvdERhdGEoZnVsbERhdGEsICdnbDJkJywgc3VicGxvdElkKTtcblxuICAgICAgICAvLyByZWYuIHRvIGNvcnJlc3AuIFNjZW5lIGluc3RhbmNlXG4gICAgICAgIHZhciBzY2VuZSA9IHN1YnBsb3RPYmouX3NjZW5lMmQ7XG5cbiAgICAgICAgLy8gSWYgU2NlbmUgaXMgbm90IGluc3RhbnRpYXRlZCwgY3JlYXRlIG9uZSFcbiAgICAgICAgaWYoc2NlbmUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2NlbmUgPSBuZXcgU2NlbmUyRCh7XG4gICAgICAgICAgICAgICAgaWQ6IHN1YnBsb3RJZCxcbiAgICAgICAgICAgICAgICBncmFwaERpdjogZ2QsXG4gICAgICAgICAgICAgICAgY29udGFpbmVyOiBnZC5xdWVyeVNlbGVjdG9yKCcuZ2wtY29udGFpbmVyJyksXG4gICAgICAgICAgICAgICAgc3RhdGljUGxvdDogZ2QuX2NvbnRleHQuc3RhdGljUGxvdCxcbiAgICAgICAgICAgICAgICBwbG90R2xQaXhlbFJhdGlvOiBnZC5fY29udGV4dC5wbG90R2xQaXhlbFJhdGlvXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZ1bGxMYXlvdXRcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIHNldCByZWYgdG8gU2NlbmUgaW5zdGFuY2VcbiAgICAgICAgICAgIHN1YnBsb3RPYmouX3NjZW5lMmQgPSBzY2VuZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNjZW5lLnBsb3QoZnVsbFN1YnBsb3REYXRhLCBnZC5jYWxjZGF0YSwgZnVsbExheW91dCwgZ2QubGF5b3V0KTtcbiAgICB9XG59O1xuXG5leHBvcnRzLmNsZWFuID0gZnVuY3Rpb24obmV3RnVsbERhdGEsIG5ld0Z1bGxMYXlvdXQsIG9sZEZ1bGxEYXRhLCBvbGRGdWxsTGF5b3V0KSB7XG4gICAgdmFyIG9sZFNjZW5lS2V5cyA9IG9sZEZ1bGxMYXlvdXQuX3N1YnBsb3RzLmdsMmQgfHwgW107XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2xkU2NlbmVLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpZCA9IG9sZFNjZW5lS2V5c1tpXTtcbiAgICAgICAgdmFyIG9sZFN1YnBsb3QgPSBvbGRGdWxsTGF5b3V0Ll9wbG90c1tpZF07XG5cbiAgICAgICAgLy8gb2xkIHN1YnBsb3Qgd2Fzbid0IGdsMmQ7IG5vdGhpbmcgdG8gZG9cbiAgICAgICAgaWYoIW9sZFN1YnBsb3QuX3NjZW5lMmQpIGNvbnRpbnVlO1xuXG4gICAgICAgIC8vIGlmIG5vIHRyYWNlcyBhcmUgcHJlc2VudCwgZGVsZXRlIGdsMmQgc3VicGxvdFxuICAgICAgICB2YXIgc3VicGxvdERhdGEgPSBnZXRTdWJwbG90RGF0YShuZXdGdWxsRGF0YSwgJ2dsMmQnLCBpZCk7XG4gICAgICAgIGlmKHN1YnBsb3REYXRhLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgb2xkU3VicGxvdC5fc2NlbmUyZC5kZXN0cm95KCk7XG4gICAgICAgICAgICBkZWxldGUgb2xkRnVsbExheW91dC5fcGxvdHNbaWRdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2luY2Ugd2UgdXNlIGNhcnRlc2lhbiBpbnRlcmFjdGlvbnMsIGRvIGNhcnRlc2lhbiBjbGVhblxuICAgIENhcnRlc2lhbi5jbGVhbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblxuZXhwb3J0cy5kcmF3RnJhbWV3b3JrID0gZnVuY3Rpb24oZ2QpIHtcbiAgICBpZighZ2QuX2NvbnRleHQuc3RhdGljUGxvdCkge1xuICAgICAgICBDYXJ0ZXNpYW4uZHJhd0ZyYW1ld29yayhnZCk7XG4gICAgfVxufTtcblxuZXhwb3J0cy50b1NWRyA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgc3VicGxvdElkcyA9IGZ1bGxMYXlvdXQuX3N1YnBsb3RzLmdsMmQ7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VicGxvdElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc3VicGxvdCA9IGZ1bGxMYXlvdXQuX3Bsb3RzW3N1YnBsb3RJZHNbaV1dO1xuICAgICAgICB2YXIgc2NlbmUgPSBzdWJwbG90Ll9zY2VuZTJkO1xuXG4gICAgICAgIHZhciBpbWFnZURhdGEgPSBzY2VuZS50b0ltYWdlKCdwbmcnKTtcbiAgICAgICAgdmFyIGltYWdlID0gZnVsbExheW91dC5fZ2xpbWFnZXMuYXBwZW5kKCdzdmc6aW1hZ2UnKTtcblxuICAgICAgICBpbWFnZS5hdHRyKHtcbiAgICAgICAgICAgIHhtbG5zOiB4bWxuc05hbWVzcGFjZXMuc3ZnLFxuICAgICAgICAgICAgJ3hsaW5rOmhyZWYnOiBpbWFnZURhdGEsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICAgICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgICAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW86ICdub25lJ1xuICAgICAgICB9KTtcblxuICAgICAgICBzY2VuZS5kZXN0cm95KCk7XG4gICAgfVxufTtcblxuZXhwb3J0cy51cGRhdGVGeCA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgc3VicGxvdElkcyA9IGZ1bGxMYXlvdXQuX3N1YnBsb3RzLmdsMmQ7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc3VicGxvdElkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgc3VicGxvdE9iaiA9IGZ1bGxMYXlvdXQuX3Bsb3RzW3N1YnBsb3RJZHNbaV1dLl9zY2VuZTJkO1xuICAgICAgICBzdWJwbG90T2JqLnVwZGF0ZUZ4KGZ1bGxMYXlvdXQuZHJhZ21vZGUpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBGeCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngnKTtcblxudmFyIGNyZWF0ZVBsb3QyRCA9IHJlcXVpcmUoJ2dsLXBsb3QyZCcpO1xudmFyIGNyZWF0ZVNwaWtlcyA9IHJlcXVpcmUoJ2dsLXNwaWtlczJkJyk7XG52YXIgY3JlYXRlU2VsZWN0Qm94ID0gcmVxdWlyZSgnZ2wtc2VsZWN0LWJveCcpO1xudmFyIGdldENvbnRleHQgPSByZXF1aXJlKCd3ZWJnbC1jb250ZXh0Jyk7XG5cbnZhciBjcmVhdGVPcHRpb25zID0gcmVxdWlyZSgnLi9jb252ZXJ0Jyk7XG52YXIgY3JlYXRlQ2FtZXJhID0gcmVxdWlyZSgnLi9jYW1lcmEnKTtcbnZhciBzaG93Tm9XZWJHbE1zZyA9IHJlcXVpcmUoJy4uLy4uL2xpYi9zaG93X25vX3dlYmdsX21zZycpO1xudmFyIGF4aXNDb25zdHJhaW50cyA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9jb25zdHJhaW50cycpO1xudmFyIGVuZm9yY2VBeGlzQ29uc3RyYWludHMgPSBheGlzQ29uc3RyYWludHMuZW5mb3JjZTtcbnZhciBjbGVhbkF4aXNDb25zdHJhaW50cyA9IGF4aXNDb25zdHJhaW50cy5jbGVhbjtcbnZhciBkb0F1dG9SYW5nZSA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9hdXRvcmFuZ2UnKS5kb0F1dG9SYW5nZTtcblxudmFyIGRyYWdIZWxwZXJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmFnZWxlbWVudC9oZWxwZXJzJyk7XG52YXIgZHJhd01vZGUgPSBkcmFnSGVscGVycy5kcmF3TW9kZTtcbnZhciBzZWxlY3RNb2RlID0gZHJhZ0hlbHBlcnMuc2VsZWN0TW9kZTtcblxudmFyIEFYRVMgPSBbJ3hheGlzJywgJ3lheGlzJ107XG52YXIgU1RBVElDX0NBTlZBUywgU1RBVElDX0NPTlRFWFQ7XG5cbnZhciBTVUJQTE9UX1BBVFRFUk4gPSByZXF1aXJlKCcuLi9jYXJ0ZXNpYW4vY29uc3RhbnRzJykuU1VCUExPVF9QQVRURVJOO1xuXG5cbmZ1bmN0aW9uIFNjZW5lMkQob3B0aW9ucywgZnVsbExheW91dCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gb3B0aW9ucy5jb250YWluZXI7XG4gICAgdGhpcy5ncmFwaERpdiA9IG9wdGlvbnMuZ3JhcGhEaXY7XG4gICAgdGhpcy5waXhlbFJhdGlvID0gb3B0aW9ucy5wbG90R2xQaXhlbFJhdGlvIHx8IHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvO1xuICAgIHRoaXMuaWQgPSBvcHRpb25zLmlkO1xuICAgIHRoaXMuc3RhdGljUGxvdCA9ICEhb3B0aW9ucy5zdGF0aWNQbG90O1xuICAgIHRoaXMuc2Nyb2xsWm9vbSA9IHRoaXMuZ3JhcGhEaXYuX2NvbnRleHQuX3Njcm9sbFpvb20uY2FydGVzaWFuO1xuXG4gICAgdGhpcy5mdWxsRGF0YSA9IG51bGw7XG4gICAgdGhpcy51cGRhdGVSZWZzKGZ1bGxMYXlvdXQpO1xuXG4gICAgdGhpcy5tYWtlRnJhbWV3b3JrKCk7XG4gICAgaWYodGhpcy5zdG9wcGVkKSByZXR1cm47XG5cbiAgICAvLyB1cGRhdGUgb3B0aW9uc1xuICAgIHRoaXMuZ2xwbG90T3B0aW9ucyA9IGNyZWF0ZU9wdGlvbnModGhpcyk7XG4gICAgdGhpcy5nbHBsb3RPcHRpb25zLm1lcmdlKGZ1bGxMYXlvdXQpO1xuXG4gICAgLy8gY3JlYXRlIHRoZSBwbG90XG4gICAgdGhpcy5nbHBsb3QgPSBjcmVhdGVQbG90MkQodGhpcy5nbHBsb3RPcHRpb25zKTtcblxuICAgIC8vIGNyZWF0ZSBjYW1lcmFcbiAgICB0aGlzLmNhbWVyYSA9IGNyZWF0ZUNhbWVyYSh0aGlzKTtcblxuICAgIC8vIHRyYWNlIHNldFxuICAgIHRoaXMudHJhY2VzID0ge307XG5cbiAgICAvLyBjcmVhdGUgYXhlcyBzcGlrZXNcbiAgICB0aGlzLnNwaWtlcyA9IGNyZWF0ZVNwaWtlcyh0aGlzLmdscGxvdCk7XG5cbiAgICB0aGlzLnNlbGVjdEJveCA9IGNyZWF0ZVNlbGVjdEJveCh0aGlzLmdscGxvdCwge1xuICAgICAgICBpbm5lckZpbGw6IGZhbHNlLFxuICAgICAgICBvdXRlckZpbGw6IHRydWVcbiAgICB9KTtcblxuICAgIC8vIGxhc3QgYnV0dG9uIHN0YXRlXG4gICAgdGhpcy5sYXN0QnV0dG9uU3RhdGUgPSAwO1xuXG4gICAgLy8gbGFzdCBwaWNrIHJlc3VsdFxuICAgIHRoaXMucGlja1Jlc3VsdCA9IG51bGw7XG5cbiAgICAvLyBpcyB0aGUgbW91c2Ugb3ZlciB0aGUgcGxvdD9cbiAgICAvLyBpdCdzIE9LIGlmIHRoaXMgc2F5cyB0cnVlIHdoZW4gaXQncyBub3QsIHNvIGxvbmcgYXNcbiAgICAvLyB3aGVuIHdlIGdldCBhIG1vdXNlb3V0IHdlIHNldCBpdCB0byBmYWxzZSBiZWZvcmUgaGFuZGxpbmdcbiAgICB0aGlzLmlzTW91c2VPdmVyID0gdHJ1ZTtcblxuICAgIC8vIGZsYWcgdG8gc3RvcCByZW5kZXIgbG9vcFxuICAgIHRoaXMuc3RvcHBlZCA9IGZhbHNlO1xuXG4gICAgLy8gcmVkcmF3IHRoZSBwbG90XG4gICAgdGhpcy5yZWRyYXcgPSB0aGlzLmRyYXcuYmluZCh0aGlzKTtcbiAgICB0aGlzLnJlZHJhdygpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjZW5lMkQ7XG5cbnZhciBwcm90byA9IFNjZW5lMkQucHJvdG90eXBlO1xuXG5wcm90by5tYWtlRnJhbWV3b3JrID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gY3JlYXRlIGNhbnZhcyBhbmQgZ2wgY29udGV4dFxuICAgIGlmKHRoaXMuc3RhdGljUGxvdCkge1xuICAgICAgICBpZighU1RBVElDX0NPTlRFWFQpIHtcbiAgICAgICAgICAgIFNUQVRJQ19DQU5WQVMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcblxuICAgICAgICAgICAgU1RBVElDX0NPTlRFWFQgPSBnZXRDb250ZXh0KHtcbiAgICAgICAgICAgICAgICBjYW52YXM6IFNUQVRJQ19DQU5WQVMsXG4gICAgICAgICAgICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IHRydWUsXG4gICAgICAgICAgICAgICAgYW50aWFsaWFzOiB0cnVlXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYoIVNUQVRJQ19DT05URVhUKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBjcmVhdGluZyBzdGF0aWMgY2FudmFzL2NvbnRleHQgZm9yIGltYWdlIHNlcnZlcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jYW52YXMgPSBTVEFUSUNfQ0FOVkFTO1xuICAgICAgICB0aGlzLmdsID0gU1RBVElDX0NPTlRFWFQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIGxpdmVDYW52YXMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuZ2wtY2FudmFzLWZvY3VzJyk7XG5cbiAgICAgICAgdmFyIGdsID0gZ2V0Q29udGV4dCh7XG4gICAgICAgICAgICBjYW52YXM6IGxpdmVDYW52YXMsXG4gICAgICAgICAgICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWUsXG4gICAgICAgICAgICBwcmVtdWx0aXBsaWVkQWxwaGE6IHRydWVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoIWdsKSB7XG4gICAgICAgICAgICBzaG93Tm9XZWJHbE1zZyh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNhbnZhcyA9IGxpdmVDYW52YXM7XG4gICAgICAgIHRoaXMuZ2wgPSBnbDtcbiAgICB9XG5cbiAgICAvLyBwb3NpdGlvbiB0aGUgY2FudmFzXG4gICAgdmFyIGNhbnZhcyA9IHRoaXMuY2FudmFzO1xuXG4gICAgY2FudmFzLnN0eWxlLndpZHRoID0gJzEwMCUnO1xuICAgIGNhbnZhcy5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgY2FudmFzLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICBjYW52YXMuc3R5bGUudG9wID0gJzBweCc7XG4gICAgY2FudmFzLnN0eWxlLmxlZnQgPSAnMHB4JztcbiAgICBjYW52YXMuc3R5bGVbJ3BvaW50ZXItZXZlbnRzJ10gPSAnbm9uZSc7XG5cbiAgICB0aGlzLnVwZGF0ZVNpemUoY2FudmFzKTtcblxuICAgIC8vIGRpc2FibGluZyB1c2VyIHNlbGVjdCBvbiB0aGUgY2FudmFzXG4gICAgLy8gc2FuaXRpemVzIGRvdWJsZS1jbGlja3MgaW50ZXJhY3Rpb25zXG4gICAgLy8gcmVmOiBodHRwczovL2dpdGh1Yi5jb20vcGxvdGx5L3Bsb3RseS5qcy9pc3N1ZXMvNzQ0XG4gICAgY2FudmFzLmNsYXNzTmFtZSArPSAnIHVzZXItc2VsZWN0LW5vbmUnO1xuXG4gICAgLy8gY3JlYXRlIFNWRyBjb250YWluZXIgZm9yIGhvdmVyIHRleHRcbiAgICB2YXIgc3ZnQ29udGFpbmVyID0gdGhpcy5zdmdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXG4gICAgICAgICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsXG4gICAgICAgICdzdmcnKTtcbiAgICBzdmdDb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS50b3AgPSBzdmdDb250YWluZXIuc3R5bGUubGVmdCA9ICcwcHgnO1xuICAgIHN2Z0NvbnRhaW5lci5zdHlsZS53aWR0aCA9IHN2Z0NvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSAnMTAwJSc7XG4gICAgc3ZnQ29udGFpbmVyLnN0eWxlWyd6LWluZGV4J10gPSAyMDtcbiAgICBzdmdDb250YWluZXIuc3R5bGVbJ3BvaW50ZXItZXZlbnRzJ10gPSAnbm9uZSc7XG5cbiAgICAvLyBjcmVhdGUgZGl2IHRvIGNhdGNoIHRoZSBtb3VzZSBldmVudFxuICAgIHZhciBtb3VzZUNvbnRhaW5lciA9IHRoaXMubW91c2VDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBtb3VzZUNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbiA9ICdhYnNvbHV0ZSc7XG4gICAgbW91c2VDb250YWluZXIuc3R5bGVbJ3BvaW50ZXItZXZlbnRzJ10gPSAnYXV0byc7XG5cbiAgICB0aGlzLnBpY2tDYW52YXMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuZ2wtY2FudmFzLXBpY2snKTtcblxuXG4gICAgLy8gYXBwZW5kIGNhbnZhcywgaG92ZXIgc3ZnIGFuZCBtb3VzZSBkaXYgdG8gY29udGFpbmVyXG4gICAgdmFyIGNvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdmdDb250YWluZXIpO1xuICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZChtb3VzZUNvbnRhaW5lcik7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgbW91c2VDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5pc01vdXNlT3ZlciA9IGZhbHNlO1xuICAgICAgICBzZWxmLnVuaG92ZXIoKTtcbiAgICB9KTtcbiAgICBtb3VzZUNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBmdW5jdGlvbigpIHtcbiAgICAgICAgc2VsZi5pc01vdXNlT3ZlciA9IHRydWU7XG4gICAgfSk7XG59O1xuXG5wcm90by50b0ltYWdlID0gZnVuY3Rpb24oZm9ybWF0KSB7XG4gICAgaWYoIWZvcm1hdCkgZm9ybWF0ID0gJ3BuZyc7XG5cbiAgICB0aGlzLnN0b3BwZWQgPSB0cnVlO1xuXG4gICAgaWYodGhpcy5zdGF0aWNQbG90KSB0aGlzLmNvbnRhaW5lci5hcHBlbmRDaGlsZChTVEFUSUNfQ0FOVkFTKTtcblxuICAgIC8vIHVwZGF0ZSBjYW52YXMgc2l6ZVxuICAgIHRoaXMudXBkYXRlU2l6ZSh0aGlzLmNhbnZhcyk7XG5cblxuICAgIC8vIGdyYWIgY29udGV4dCBhbmQgeWFuayBvdXQgcGl4ZWxzXG4gICAgdmFyIGdsID0gdGhpcy5nbHBsb3QuZ2w7XG4gICAgdmFyIHcgPSBnbC5kcmF3aW5nQnVmZmVyV2lkdGg7XG4gICAgdmFyIGggPSBnbC5kcmF3aW5nQnVmZmVySGVpZ2h0O1xuXG4gICAgLy8gZm9yY2UgcmVkcmF3XG4gICAgZ2wuY2xlYXJDb2xvcigxLCAxLCAxLCAwKTtcbiAgICBnbC5jbGVhcihnbC5DT0xPUl9CVUZGRVJfQklUIHwgZ2wuREVQVEhfQlVGRkVSX0JJVCk7XG4gICAgdGhpcy5nbHBsb3Quc2V0RGlydHkoKTtcbiAgICB0aGlzLmdscGxvdC5kcmF3KCk7XG5cbiAgICBnbC5iaW5kRnJhbWVidWZmZXIoZ2wuRlJBTUVCVUZGRVIsIG51bGwpO1xuXG4gICAgdmFyIHBpeGVscyA9IG5ldyBVaW50OEFycmF5KHcgKiBoICogNCk7XG4gICAgZ2wucmVhZFBpeGVscygwLCAwLCB3LCBoLCBnbC5SR0JBLCBnbC5VTlNJR05FRF9CWVRFLCBwaXhlbHMpO1xuXG4gICAgLy8gZmxpcCBwaXhlbHNcbiAgICBmb3IodmFyIGogPSAwLCBrID0gaCAtIDE7IGogPCBrOyArK2osIC0taykge1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdzsgKytpKSB7XG4gICAgICAgICAgICBmb3IodmFyIGwgPSAwOyBsIDwgNDsgKytsKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRtcCA9IHBpeGVsc1s0ICogKHcgKiBqICsgaSkgKyBsXTtcbiAgICAgICAgICAgICAgICBwaXhlbHNbNCAqICh3ICogaiArIGkpICsgbF0gPSBwaXhlbHNbNCAqICh3ICogayArIGkpICsgbF07XG4gICAgICAgICAgICAgICAgcGl4ZWxzWzQgKiAodyAqIGsgKyBpKSArIGxdID0gdG1wO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIGNhbnZhcy53aWR0aCA9IHc7XG4gICAgY2FudmFzLmhlaWdodCA9IGg7XG5cbiAgICB2YXIgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHZhciBpbWFnZURhdGEgPSBjb250ZXh0LmNyZWF0ZUltYWdlRGF0YSh3LCBoKTtcbiAgICBpbWFnZURhdGEuZGF0YS5zZXQocGl4ZWxzKTtcbiAgICBjb250ZXh0LnB1dEltYWdlRGF0YShpbWFnZURhdGEsIDAsIDApO1xuXG4gICAgdmFyIGRhdGFVUkw7XG5cbiAgICBzd2l0Y2goZm9ybWF0KSB7XG4gICAgICAgIGNhc2UgJ2pwZWcnOlxuICAgICAgICAgICAgZGF0YVVSTCA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL2pwZWcnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd3ZWJwJzpcbiAgICAgICAgICAgIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS93ZWJwJyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGRhdGFVUkwgPSBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgICB9XG5cbiAgICBpZih0aGlzLnN0YXRpY1Bsb3QpIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKFNUQVRJQ19DQU5WQVMpO1xuXG4gICAgcmV0dXJuIGRhdGFVUkw7XG59O1xuXG5wcm90by51cGRhdGVTaXplID0gZnVuY3Rpb24oY2FudmFzKSB7XG4gICAgaWYoIWNhbnZhcykgY2FudmFzID0gdGhpcy5jYW52YXM7XG5cbiAgICB2YXIgcGl4ZWxSYXRpbyA9IHRoaXMucGl4ZWxSYXRpbztcbiAgICB2YXIgZnVsbExheW91dCA9IHRoaXMuZnVsbExheW91dDtcblxuICAgIHZhciB3aWR0aCA9IGZ1bGxMYXlvdXQud2lkdGg7XG4gICAgdmFyIGhlaWdodCA9IGZ1bGxMYXlvdXQuaGVpZ2h0O1xuICAgIHZhciBwaXhlbFdpZHRoID0gTWF0aC5jZWlsKHBpeGVsUmF0aW8gKiB3aWR0aCkgfDA7XG4gICAgdmFyIHBpeGVsSGVpZ2h0ID0gTWF0aC5jZWlsKHBpeGVsUmF0aW8gKiBoZWlnaHQpIHwwO1xuXG4gICAgLy8gY2hlY2sgZm9yIHJlc2l6ZVxuICAgIGlmKGNhbnZhcy53aWR0aCAhPT0gcGl4ZWxXaWR0aCB8fCBjYW52YXMuaGVpZ2h0ICE9PSBwaXhlbEhlaWdodCkge1xuICAgICAgICBjYW52YXMud2lkdGggPSBwaXhlbFdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gcGl4ZWxIZWlnaHQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbnZhcztcbn07XG5cbnByb3RvLmNvbXB1dGVUaWNrTWFya3MgPSBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnhheGlzLnNldFNjYWxlKCk7XG4gICAgdGhpcy55YXhpcy5zZXRTY2FsZSgpO1xuXG4gICAgdmFyIG5leHRUaWNrcyA9IFtcbiAgICAgICAgQXhlcy5jYWxjVGlja3ModGhpcy54YXhpcyksXG4gICAgICAgIEF4ZXMuY2FsY1RpY2tzKHRoaXMueWF4aXMpXG4gICAgXTtcblxuICAgIGZvcih2YXIgaiA9IDA7IGogPCAyOyArK2opIHtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG5leHRUaWNrc1tqXS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgLy8gY29lcmNpbmcgdGljayB2YWx1ZSAobWF5IG5vdCBiZSBhIHN0cmluZykgdG8gYSBzdHJpbmdcbiAgICAgICAgICAgIG5leHRUaWNrc1tqXVtpXS50ZXh0ID0gbmV4dFRpY2tzW2pdW2ldLnRleHQgKyAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBuZXh0VGlja3M7XG59O1xuXG5mdW5jdGlvbiBjb21wYXJlVGlja3MoYSwgYikge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCAyOyArK2kpIHtcbiAgICAgICAgdmFyIGF0aWNrcyA9IGFbaV07XG4gICAgICAgIHZhciBidGlja3MgPSBiW2ldO1xuXG4gICAgICAgIGlmKGF0aWNrcy5sZW5ndGggIT09IGJ0aWNrcy5sZW5ndGgpIHJldHVybiB0cnVlO1xuXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBhdGlja3MubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgIGlmKGF0aWNrc1tqXS54ICE9PSBidGlja3Nbal0ueCkgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbnByb3RvLnVwZGF0ZVJlZnMgPSBmdW5jdGlvbihuZXdGdWxsTGF5b3V0KSB7XG4gICAgdGhpcy5mdWxsTGF5b3V0ID0gbmV3RnVsbExheW91dDtcblxuICAgIHZhciBzcG1hdGNoID0gdGhpcy5pZC5tYXRjaChTVUJQTE9UX1BBVFRFUk4pO1xuICAgIHZhciB4YXhpc05hbWUgPSAneGF4aXMnICsgc3BtYXRjaFsxXTtcbiAgICB2YXIgeWF4aXNOYW1lID0gJ3lheGlzJyArIHNwbWF0Y2hbMl07XG5cbiAgICB0aGlzLnhheGlzID0gdGhpcy5mdWxsTGF5b3V0W3hheGlzTmFtZV07XG4gICAgdGhpcy55YXhpcyA9IHRoaXMuZnVsbExheW91dFt5YXhpc05hbWVdO1xufTtcblxucHJvdG8ucmVsYXlvdXRDYWxsYmFjayA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBncmFwaERpdiA9IHRoaXMuZ3JhcGhEaXY7XG4gICAgdmFyIHhheGlzID0gdGhpcy54YXhpcztcbiAgICB2YXIgeWF4aXMgPSB0aGlzLnlheGlzO1xuICAgIHZhciBsYXlvdXQgPSBncmFwaERpdi5sYXlvdXQ7XG5cbiAgICAvLyBtYWtlIGEgbWVhbmluZ2Z1bCB2YWx1ZSB0byBiZSBwYXNzZWQgb24gdG8gcG9zc2libGUgJ3Bsb3RseV9yZWxheW91dCcgc3Vic2NyaWJlcihzKVxuICAgIHZhciB1cGRhdGUgPSB7fTtcbiAgICB2YXIgeHJhbmdlID0gdXBkYXRlW3hheGlzLl9uYW1lICsgJy5yYW5nZSddID0geGF4aXMucmFuZ2Uuc2xpY2UoKTtcbiAgICB2YXIgeXJhbmdlID0gdXBkYXRlW3lheGlzLl9uYW1lICsgJy5yYW5nZSddID0geWF4aXMucmFuZ2Uuc2xpY2UoKTtcbiAgICB1cGRhdGVbeGF4aXMuX25hbWUgKyAnLmF1dG9yYW5nZSddID0geGF4aXMuYXV0b3JhbmdlO1xuICAgIHVwZGF0ZVt5YXhpcy5fbmFtZSArICcuYXV0b3JhbmdlJ10gPSB5YXhpcy5hdXRvcmFuZ2U7XG5cbiAgICBSZWdpc3RyeS5jYWxsKCdfc3RvcmVEaXJlY3RHVUlFZGl0JywgZ3JhcGhEaXYubGF5b3V0LCBncmFwaERpdi5fZnVsbExheW91dC5fcHJlR1VJLCB1cGRhdGUpO1xuXG4gICAgLy8gdXBkYXRlIHRoZSBpbnB1dCBsYXlvdXRcbiAgICB2YXIgeGFJbiA9IGxheW91dFt4YXhpcy5fbmFtZV07XG4gICAgeGFJbi5yYW5nZSA9IHhyYW5nZTtcbiAgICB4YUluLmF1dG9yYW5nZSA9IHhheGlzLmF1dG9yYW5nZTtcblxuICAgIHZhciB5YUluID0gbGF5b3V0W3lheGlzLl9uYW1lXTtcbiAgICB5YUluLnJhbmdlID0geXJhbmdlO1xuICAgIHlhSW4uYXV0b3JhbmdlID0geWF4aXMuYXV0b3JhbmdlO1xuXG4gICAgLy8gbGFzdElucHV0VGltZSBoZWxwcyBkZXRlcm1pbmUgd2hpY2ggb25lIGlzIHRoZSBsYXRlc3QgaW5wdXQgKGlmIGFzeW5jKVxuICAgIHVwZGF0ZS5sYXN0SW5wdXRUaW1lID0gdGhpcy5jYW1lcmEubGFzdElucHV0VGltZTtcbiAgICBncmFwaERpdi5lbWl0KCdwbG90bHlfcmVsYXlvdXQnLCB1cGRhdGUpO1xufTtcblxucHJvdG8uY2FtZXJhQ2hhbmdlZCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjYW1lcmEgPSB0aGlzLmNhbWVyYTtcblxuICAgIHRoaXMuZ2xwbG90LnNldERhdGFCb3godGhpcy5jYWxjRGF0YUJveCgpKTtcblxuICAgIHZhciBuZXh0VGlja3MgPSB0aGlzLmNvbXB1dGVUaWNrTWFya3MoKTtcbiAgICB2YXIgY3VyVGlja3MgPSB0aGlzLmdscGxvdE9wdGlvbnMudGlja3M7XG5cbiAgICBpZihjb21wYXJlVGlja3MobmV4dFRpY2tzLCBjdXJUaWNrcykpIHtcbiAgICAgICAgdGhpcy5nbHBsb3RPcHRpb25zLnRpY2tzID0gbmV4dFRpY2tzO1xuICAgICAgICB0aGlzLmdscGxvdE9wdGlvbnMuZGF0YUJveCA9IGNhbWVyYS5kYXRhQm94O1xuICAgICAgICB0aGlzLmdscGxvdC51cGRhdGUodGhpcy5nbHBsb3RPcHRpb25zKTtcbiAgICAgICAgdGhpcy5oYW5kbGVBbm5vdGF0aW9ucygpO1xuICAgIH1cbn07XG5cbnByb3RvLmhhbmRsZUFubm90YXRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGdkID0gdGhpcy5ncmFwaERpdjtcbiAgICB2YXIgYW5ub3RhdGlvbnMgPSB0aGlzLmZ1bGxMYXlvdXQuYW5ub3RhdGlvbnM7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgYW5ub3RhdGlvbnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFubiA9IGFubm90YXRpb25zW2ldO1xuXG4gICAgICAgIGlmKGFubi54cmVmID09PSB0aGlzLnhheGlzLl9pZCAmJiBhbm4ueXJlZiA9PT0gdGhpcy55YXhpcy5faWQpIHtcbiAgICAgICAgICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnYW5ub3RhdGlvbnMnLCAnZHJhd09uZScpKGdkLCBpKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnByb3RvLmRlc3Ryb3kgPSBmdW5jdGlvbigpIHtcbiAgICBpZighdGhpcy5nbHBsb3QpIHJldHVybjtcblxuICAgIHZhciB0cmFjZXMgPSB0aGlzLnRyYWNlcztcblxuICAgIGlmKHRyYWNlcykge1xuICAgICAgICBPYmplY3Qua2V5cyh0cmFjZXMpLm1hcChmdW5jdGlvbihrZXkpIHtcbiAgICAgICAgICAgIHRyYWNlc1trZXldLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIGRlbGV0ZSB0cmFjZXNba2V5XTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5nbHBsb3QuZGlzcG9zZSgpO1xuXG4gICAgdGhpcy5jb250YWluZXIucmVtb3ZlQ2hpbGQodGhpcy5zdmdDb250YWluZXIpO1xuICAgIHRoaXMuY29udGFpbmVyLnJlbW92ZUNoaWxkKHRoaXMubW91c2VDb250YWluZXIpO1xuXG4gICAgdGhpcy5mdWxsRGF0YSA9IG51bGw7XG4gICAgdGhpcy5nbHBsb3QgPSBudWxsO1xuICAgIHRoaXMuc3RvcHBlZCA9IHRydWU7XG4gICAgdGhpcy5jYW1lcmEubW91c2VMaXN0ZW5lci5lbmFibGVkID0gZmFsc2U7XG4gICAgdGhpcy5tb3VzZUNvbnRhaW5lci5yZW1vdmVFdmVudExpc3RlbmVyKCd3aGVlbCcsIHRoaXMuY2FtZXJhLndoZWVsTGlzdGVuZXIpO1xuICAgIHRoaXMuY2FtZXJhID0gbnVsbDtcbn07XG5cbnByb3RvLnBsb3QgPSBmdW5jdGlvbihmdWxsRGF0YSwgY2FsY0RhdGEsIGZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgZ2xwbG90ID0gdGhpcy5nbHBsb3Q7XG5cbiAgICB0aGlzLnVwZGF0ZVJlZnMoZnVsbExheW91dCk7XG4gICAgdGhpcy54YXhpcy5jbGVhckNhbGMoKTtcbiAgICB0aGlzLnlheGlzLmNsZWFyQ2FsYygpO1xuICAgIHRoaXMudXBkYXRlVHJhY2VzKGZ1bGxEYXRhLCBjYWxjRGF0YSk7XG4gICAgdGhpcy51cGRhdGVGeChmdWxsTGF5b3V0LmRyYWdtb2RlKTtcblxuICAgIHZhciB3aWR0aCA9IGZ1bGxMYXlvdXQud2lkdGg7XG4gICAgdmFyIGhlaWdodCA9IGZ1bGxMYXlvdXQuaGVpZ2h0O1xuXG4gICAgdGhpcy51cGRhdGVTaXplKHRoaXMuY2FudmFzKTtcblxuICAgIHZhciBvcHRpb25zID0gdGhpcy5nbHBsb3RPcHRpb25zO1xuICAgIG9wdGlvbnMubWVyZ2UoZnVsbExheW91dCk7XG4gICAgb3B0aW9ucy5zY3JlZW5Cb3ggPSBbMCwgMCwgd2lkdGgsIGhlaWdodF07XG5cbiAgICB2YXIgbW9ja0dyYXBoRGl2ID0ge19mdWxsTGF5b3V0OiB7XG4gICAgICAgIF9heGlzQ29uc3RyYWludEdyb3VwczogdGhpcy5ncmFwaERpdi5fZnVsbExheW91dC5fYXhpc0NvbnN0cmFpbnRHcm91cHMsXG4gICAgICAgIHhheGlzOiB0aGlzLnhheGlzLFxuICAgICAgICB5YXhpczogdGhpcy55YXhpc1xuICAgIH19O1xuXG4gICAgY2xlYW5BeGlzQ29uc3RyYWludHMobW9ja0dyYXBoRGl2LCB0aGlzLnhheGlzKTtcbiAgICBjbGVhbkF4aXNDb25zdHJhaW50cyhtb2NrR3JhcGhEaXYsIHRoaXMueWF4aXMpO1xuXG4gICAgdmFyIHNpemUgPSBmdWxsTGF5b3V0Ll9zaXplO1xuICAgIHZhciBkb21haW5YID0gdGhpcy54YXhpcy5kb21haW47XG4gICAgdmFyIGRvbWFpblkgPSB0aGlzLnlheGlzLmRvbWFpbjtcblxuICAgIG9wdGlvbnMudmlld0JveCA9IFtcbiAgICAgICAgc2l6ZS5sICsgZG9tYWluWFswXSAqIHNpemUudyxcbiAgICAgICAgc2l6ZS5iICsgZG9tYWluWVswXSAqIHNpemUuaCxcbiAgICAgICAgKHdpZHRoIC0gc2l6ZS5yKSAtICgxIC0gZG9tYWluWFsxXSkgKiBzaXplLncsXG4gICAgICAgIChoZWlnaHQgLSBzaXplLnQpIC0gKDEgLSBkb21haW5ZWzFdKSAqIHNpemUuaFxuICAgIF07XG5cbiAgICB0aGlzLm1vdXNlQ29udGFpbmVyLnN0eWxlLndpZHRoID0gc2l6ZS53ICogKGRvbWFpblhbMV0gLSBkb21haW5YWzBdKSArICdweCc7XG4gICAgdGhpcy5tb3VzZUNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBzaXplLmggKiAoZG9tYWluWVsxXSAtIGRvbWFpbllbMF0pICsgJ3B4JztcbiAgICB0aGlzLm1vdXNlQ29udGFpbmVyLmhlaWdodCA9IHNpemUuaCAqIChkb21haW5ZWzFdIC0gZG9tYWluWVswXSk7XG4gICAgdGhpcy5tb3VzZUNvbnRhaW5lci5zdHlsZS5sZWZ0ID0gc2l6ZS5sICsgZG9tYWluWFswXSAqIHNpemUudyArICdweCc7XG4gICAgdGhpcy5tb3VzZUNvbnRhaW5lci5zdHlsZS50b3AgPSBzaXplLnQgKyAoMSAtIGRvbWFpbllbMV0pICogc2l6ZS5oICsgJ3B4JztcblxuICAgIHZhciBheCwgaTtcblxuICAgIGZvcihpID0gMDsgaSA8IDI7ICsraSkge1xuICAgICAgICBheCA9IHRoaXNbQVhFU1tpXV07XG4gICAgICAgIGF4Ll9sZW5ndGggPSBvcHRpb25zLnZpZXdCb3hbaSArIDJdIC0gb3B0aW9ucy52aWV3Qm94W2ldO1xuXG4gICAgICAgIGRvQXV0b1JhbmdlKHRoaXMuZ3JhcGhEaXYsIGF4KTtcbiAgICAgICAgYXguc2V0U2NhbGUoKTtcbiAgICB9XG5cbiAgICBlbmZvcmNlQXhpc0NvbnN0cmFpbnRzKG1vY2tHcmFwaERpdik7XG5cbiAgICBvcHRpb25zLnRpY2tzID0gdGhpcy5jb21wdXRlVGlja01hcmtzKCk7XG5cbiAgICBvcHRpb25zLmRhdGFCb3ggPSB0aGlzLmNhbGNEYXRhQm94KCk7XG5cbiAgICBvcHRpb25zLm1lcmdlKGZ1bGxMYXlvdXQpO1xuICAgIGdscGxvdC51cGRhdGUob3B0aW9ucyk7XG5cbiAgICAvLyBmb3JjZSByZWRyYXcgc28gdGhhdCBwcm9taXNlIGlzIHJldHVybmVkIHdoZW4gcmVuZGVyaW5nIGlzIGNvbXBsZXRlZFxuICAgIHRoaXMuZ2xwbG90LmRyYXcoKTtcbn07XG5cbnByb3RvLmNhbGNEYXRhQm94ID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHhheGlzID0gdGhpcy54YXhpcztcbiAgICB2YXIgeWF4aXMgPSB0aGlzLnlheGlzO1xuICAgIHZhciB4cmFuZ2UgPSB4YXhpcy5yYW5nZTtcbiAgICB2YXIgeXJhbmdlID0geWF4aXMucmFuZ2U7XG4gICAgdmFyIHhyMmwgPSB4YXhpcy5yMmw7XG4gICAgdmFyIHlyMmwgPSB5YXhpcy5yMmw7XG5cbiAgICByZXR1cm4gW3hyMmwoeHJhbmdlWzBdKSwgeXIybCh5cmFuZ2VbMF0pLCB4cjJsKHhyYW5nZVsxXSksIHlyMmwoeXJhbmdlWzFdKV07XG59O1xuXG5wcm90by5zZXRSYW5nZXMgPSBmdW5jdGlvbihkYXRhQm94KSB7XG4gICAgdmFyIHhheGlzID0gdGhpcy54YXhpcztcbiAgICB2YXIgeWF4aXMgPSB0aGlzLnlheGlzO1xuICAgIHZhciB4bDJyID0geGF4aXMubDJyO1xuICAgIHZhciB5bDJyID0geWF4aXMubDJyO1xuXG4gICAgeGF4aXMucmFuZ2UgPSBbeGwycihkYXRhQm94WzBdKSwgeGwycihkYXRhQm94WzJdKV07XG4gICAgeWF4aXMucmFuZ2UgPSBbeWwycihkYXRhQm94WzFdKSwgeWwycihkYXRhQm94WzNdKV07XG59O1xuXG5wcm90by51cGRhdGVUcmFjZXMgPSBmdW5jdGlvbihmdWxsRGF0YSwgY2FsY0RhdGEpIHtcbiAgICB2YXIgdHJhY2VJZHMgPSBPYmplY3Qua2V5cyh0aGlzLnRyYWNlcyk7XG4gICAgdmFyIGksIGosIGZ1bGxUcmFjZTtcblxuICAgIHRoaXMuZnVsbERhdGEgPSBmdWxsRGF0YTtcblxuICAgIC8vIHJlbW92ZSBlbXB0eSB0cmFjZXNcbiAgICB0cmFjZUlkTG9vcDpcbiAgICBmb3IoaSA9IDA7IGkgPCB0cmFjZUlkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgb2xkVWlkID0gdHJhY2VJZHNbaV07XG4gICAgICAgIHZhciBvbGRUcmFjZSA9IHRoaXMudHJhY2VzW29sZFVpZF07XG5cbiAgICAgICAgZm9yKGogPSAwOyBqIDwgZnVsbERhdGEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGZ1bGxUcmFjZSA9IGZ1bGxEYXRhW2pdO1xuXG4gICAgICAgICAgICBpZihmdWxsVHJhY2UudWlkID09PSBvbGRVaWQgJiYgZnVsbFRyYWNlLnR5cGUgPT09IG9sZFRyYWNlLnR5cGUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZSB0cmFjZUlkTG9vcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG9sZFRyYWNlLmRpc3Bvc2UoKTtcbiAgICAgICAgZGVsZXRlIHRoaXMudHJhY2VzW29sZFVpZF07XG4gICAgfVxuXG4gICAgLy8gdXBkYXRlIC8gY3JlYXRlIHRyYWNlIG9iamVjdHNcbiAgICBmb3IoaSA9IDA7IGkgPCBmdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBmdWxsVHJhY2UgPSBmdWxsRGF0YVtpXTtcbiAgICAgICAgdmFyIGNhbGNUcmFjZSA9IGNhbGNEYXRhW2ldO1xuICAgICAgICB2YXIgdHJhY2VPYmogPSB0aGlzLnRyYWNlc1tmdWxsVHJhY2UudWlkXTtcblxuICAgICAgICBpZih0cmFjZU9iaikgdHJhY2VPYmoudXBkYXRlKGZ1bGxUcmFjZSwgY2FsY1RyYWNlKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0cmFjZU9iaiA9IGZ1bGxUcmFjZS5fbW9kdWxlLnBsb3QodGhpcywgZnVsbFRyYWNlLCBjYWxjVHJhY2UpO1xuICAgICAgICAgICAgdGhpcy50cmFjZXNbZnVsbFRyYWNlLnVpZF0gPSB0cmFjZU9iajtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG9yZGVyIG9iamVjdCBwZXIgdHJhY2VzXG4gICAgdGhpcy5nbHBsb3Qub2JqZWN0cy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuX3RyYWNlLmluZGV4IC0gYi5fdHJhY2UuaW5kZXg7XG4gICAgfSk7XG59O1xuXG5wcm90by51cGRhdGVGeCA9IGZ1bmN0aW9uKGRyYWdtb2RlKSB7XG4gICAgLy8gc3dpdGNoIHRvIHN2ZyBpbnRlcmFjdGlvbnMgaW4gbGFzc28vc2VsZWN0IG1vZGUgJiBzaGFwZSBkcmF3aW5nXG4gICAgaWYoc2VsZWN0TW9kZShkcmFnbW9kZSkgfHwgZHJhd01vZGUoZHJhZ21vZGUpKSB7XG4gICAgICAgIHRoaXMucGlja0NhbnZhcy5zdHlsZVsncG9pbnRlci1ldmVudHMnXSA9ICdub25lJztcbiAgICAgICAgdGhpcy5tb3VzZUNvbnRhaW5lci5zdHlsZVsncG9pbnRlci1ldmVudHMnXSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBpY2tDYW52YXMuc3R5bGVbJ3BvaW50ZXItZXZlbnRzJ10gPSAnYXV0byc7XG4gICAgICAgIHRoaXMubW91c2VDb250YWluZXIuc3R5bGVbJ3BvaW50ZXItZXZlbnRzJ10gPSAnYXV0byc7XG4gICAgfVxuXG4gICAgLy8gc2V0IHByb3BlciBjdXJzb3JcbiAgICBpZihkcmFnbW9kZSA9PT0gJ3BhbicpIHtcbiAgICAgICAgdGhpcy5tb3VzZUNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gICAgfSBlbHNlIGlmKGRyYWdtb2RlID09PSAnem9vbScpIHtcbiAgICAgICAgdGhpcy5tb3VzZUNvbnRhaW5lci5zdHlsZS5jdXJzb3IgPSAnY3Jvc3NoYWlyJztcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vdXNlQ29udGFpbmVyLnN0eWxlLmN1cnNvciA9IG51bGw7XG4gICAgfVxufTtcblxucHJvdG8uZW1pdFBvaW50QWN0aW9uID0gZnVuY3Rpb24obmV4dFNlbGVjdGlvbiwgZXZlbnRUeXBlKSB7XG4gICAgdmFyIHVpZCA9IG5leHRTZWxlY3Rpb24udHJhY2UudWlkO1xuICAgIHZhciBwdE51bWJlciA9IG5leHRTZWxlY3Rpb24ucG9pbnRJbmRleDtcbiAgICB2YXIgdHJhY2U7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgdGhpcy5mdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZih0aGlzLmZ1bGxEYXRhW2ldLnVpZCA9PT0gdWlkKSB7XG4gICAgICAgICAgICB0cmFjZSA9IHRoaXMuZnVsbERhdGFbaV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgcG9pbnREYXRhID0ge1xuICAgICAgICB4OiBuZXh0U2VsZWN0aW9uLnRyYWNlQ29vcmRbMF0sXG4gICAgICAgIHk6IG5leHRTZWxlY3Rpb24udHJhY2VDb29yZFsxXSxcbiAgICAgICAgY3VydmVOdW1iZXI6IHRyYWNlLmluZGV4LFxuICAgICAgICBwb2ludE51bWJlcjogcHROdW1iZXIsXG4gICAgICAgIGRhdGE6IHRyYWNlLl9pbnB1dCxcbiAgICAgICAgZnVsbERhdGE6IHRoaXMuZnVsbERhdGEsXG4gICAgICAgIHhheGlzOiB0aGlzLnhheGlzLFxuICAgICAgICB5YXhpczogdGhpcy55YXhpc1xuICAgIH07XG5cbiAgICBGeC5hcHBlbmRBcnJheVBvaW50VmFsdWUocG9pbnREYXRhLCB0cmFjZSwgcHROdW1iZXIpO1xuXG4gICAgdGhpcy5ncmFwaERpdi5lbWl0KGV2ZW50VHlwZSwge3BvaW50czogW3BvaW50RGF0YV19KTtcbn07XG5cbnByb3RvLmRyYXcgPSBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLnN0b3BwZWQpIHJldHVybjtcblxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLnJlZHJhdyk7XG5cbiAgICB2YXIgZ2xwbG90ID0gdGhpcy5nbHBsb3Q7XG4gICAgdmFyIGNhbWVyYSA9IHRoaXMuY2FtZXJhO1xuICAgIHZhciBtb3VzZUxpc3RlbmVyID0gY2FtZXJhLm1vdXNlTGlzdGVuZXI7XG4gICAgdmFyIG1vdXNlVXAgPSB0aGlzLmxhc3RCdXR0b25TdGF0ZSA9PT0gMSAmJiBtb3VzZUxpc3RlbmVyLmJ1dHRvbnMgPT09IDA7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSB0aGlzLmZ1bGxMYXlvdXQ7XG5cbiAgICB0aGlzLmxhc3RCdXR0b25TdGF0ZSA9IG1vdXNlTGlzdGVuZXIuYnV0dG9ucztcblxuICAgIHRoaXMuY2FtZXJhQ2hhbmdlZCgpO1xuXG4gICAgdmFyIHggPSBtb3VzZUxpc3RlbmVyLnggKiBnbHBsb3QucGl4ZWxSYXRpbztcbiAgICB2YXIgeSA9IHRoaXMuY2FudmFzLmhlaWdodCAtIGdscGxvdC5waXhlbFJhdGlvICogbW91c2VMaXN0ZW5lci55O1xuXG4gICAgdmFyIHJlc3VsdDtcblxuICAgIGlmKGNhbWVyYS5ib3hFbmFibGVkICYmIGZ1bGxMYXlvdXQuZHJhZ21vZGUgPT09ICd6b29tJykge1xuICAgICAgICB0aGlzLnNlbGVjdEJveC5lbmFibGVkID0gdHJ1ZTtcblxuICAgICAgICB2YXIgc2VsZWN0Qm94ID0gdGhpcy5zZWxlY3RCb3guc2VsZWN0Qm94ID0gW1xuICAgICAgICAgICAgTWF0aC5taW4oY2FtZXJhLmJveFN0YXJ0WzBdLCBjYW1lcmEuYm94RW5kWzBdKSxcbiAgICAgICAgICAgIE1hdGgubWluKGNhbWVyYS5ib3hTdGFydFsxXSwgY2FtZXJhLmJveEVuZFsxXSksXG4gICAgICAgICAgICBNYXRoLm1heChjYW1lcmEuYm94U3RhcnRbMF0sIGNhbWVyYS5ib3hFbmRbMF0pLFxuICAgICAgICAgICAgTWF0aC5tYXgoY2FtZXJhLmJveFN0YXJ0WzFdLCBjYW1lcmEuYm94RW5kWzFdKVxuICAgICAgICBdO1xuXG4gICAgICAgIC8vIDFEIHpvb21cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IDI7IGkrKykge1xuICAgICAgICAgICAgaWYoY2FtZXJhLmJveFN0YXJ0W2ldID09PSBjYW1lcmEuYm94RW5kW2ldKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0Qm94W2ldID0gZ2xwbG90LmRhdGFCb3hbaV07XG4gICAgICAgICAgICAgICAgc2VsZWN0Qm94W2kgKyAyXSA9IGdscGxvdC5kYXRhQm94W2kgKyAyXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGdscGxvdC5zZXREaXJ0eSgpO1xuICAgIH0gZWxzZSBpZighY2FtZXJhLnBhbm5pbmcgJiYgdGhpcy5pc01vdXNlT3Zlcikge1xuICAgICAgICB0aGlzLnNlbGVjdEJveC5lbmFibGVkID0gZmFsc2U7XG5cbiAgICAgICAgdmFyIHNpemUgPSBmdWxsTGF5b3V0Ll9zaXplO1xuICAgICAgICB2YXIgZG9tYWluWCA9IHRoaXMueGF4aXMuZG9tYWluO1xuICAgICAgICB2YXIgZG9tYWluWSA9IHRoaXMueWF4aXMuZG9tYWluO1xuXG4gICAgICAgIHJlc3VsdCA9IGdscGxvdC5waWNrKFxuICAgICAgICAgICAgKHggLyBnbHBsb3QucGl4ZWxSYXRpbykgKyBzaXplLmwgKyBkb21haW5YWzBdICogc2l6ZS53LFxuICAgICAgICAgICAgKHkgLyBnbHBsb3QucGl4ZWxSYXRpbykgLSAoc2l6ZS50ICsgKDEgLSBkb21haW5ZWzFdKSAqIHNpemUuaClcbiAgICAgICAgKTtcblxuICAgICAgICB2YXIgbmV4dFNlbGVjdGlvbiA9IHJlc3VsdCAmJiByZXN1bHQub2JqZWN0Ll90cmFjZS5oYW5kbGVQaWNrKHJlc3VsdCk7XG5cbiAgICAgICAgaWYobmV4dFNlbGVjdGlvbiAmJiBtb3VzZVVwKSB7XG4gICAgICAgICAgICB0aGlzLmVtaXRQb2ludEFjdGlvbihuZXh0U2VsZWN0aW9uLCAncGxvdGx5X2NsaWNrJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihyZXN1bHQgJiYgcmVzdWx0Lm9iamVjdC5fdHJhY2UuaG92ZXJpbmZvICE9PSAnc2tpcCcgJiYgZnVsbExheW91dC5ob3Zlcm1vZGUpIHtcbiAgICAgICAgICAgIGlmKG5leHRTZWxlY3Rpb24gJiYgKFxuICAgICAgICAgICAgICAgICF0aGlzLmxhc3RQaWNrUmVzdWx0IHx8XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0UGlja1Jlc3VsdC50cmFjZVVpZCAhPT0gbmV4dFNlbGVjdGlvbi50cmFjZS51aWQgfHxcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQaWNrUmVzdWx0LmRhdGFDb29yZFswXSAhPT0gbmV4dFNlbGVjdGlvbi5kYXRhQ29vcmRbMF0gfHxcbiAgICAgICAgICAgICAgICB0aGlzLmxhc3RQaWNrUmVzdWx0LmRhdGFDb29yZFsxXSAhPT0gbmV4dFNlbGVjdGlvbi5kYXRhQ29vcmRbMV0pXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gbmV4dFNlbGVjdGlvbjtcblxuICAgICAgICAgICAgICAgIHRoaXMubGFzdFBpY2tSZXN1bHQgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNlVWlkOiBuZXh0U2VsZWN0aW9uLnRyYWNlID8gbmV4dFNlbGVjdGlvbi50cmFjZS51aWQgOiBudWxsLFxuICAgICAgICAgICAgICAgICAgICBkYXRhQ29vcmQ6IG5leHRTZWxlY3Rpb24uZGF0YUNvb3JkLnNsaWNlKClcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHRoaXMuc3Bpa2VzLnVwZGF0ZSh7IGNlbnRlcjogcmVzdWx0LmRhdGFDb29yZCB9KTtcblxuICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5zY3JlZW5Db29yZCA9IFtcbiAgICAgICAgICAgICAgICAgICAgKChnbHBsb3Qudmlld0JveFsyXSAtIGdscGxvdC52aWV3Qm94WzBdKSAqXG4gICAgICAgICAgICAgICAgICAgIChyZXN1bHQuZGF0YUNvb3JkWzBdIC0gZ2xwbG90LmRhdGFCb3hbMF0pIC9cbiAgICAgICAgICAgICAgICAgICAgICAgIChnbHBsb3QuZGF0YUJveFsyXSAtIGdscGxvdC5kYXRhQm94WzBdKSArIGdscGxvdC52aWV3Qm94WzBdKSAvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xwbG90LnBpeGVsUmF0aW8sXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLmNhbnZhcy5oZWlnaHQgLSAoZ2xwbG90LnZpZXdCb3hbM10gLSBnbHBsb3Qudmlld0JveFsxXSkgKlxuICAgICAgICAgICAgICAgICAgICAocmVzdWx0LmRhdGFDb29yZFsxXSAtIGdscGxvdC5kYXRhQm94WzFdKSAvXG4gICAgICAgICAgICAgICAgICAgICAgICAoZ2xwbG90LmRhdGFCb3hbM10gLSBnbHBsb3QuZGF0YUJveFsxXSkgLSBnbHBsb3Qudmlld0JveFsxXSkgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdscGxvdC5waXhlbFJhdGlvXG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIC8vIHRoaXMgbmVlZHMgdG8gaGFwcGVuIGJlZm9yZSB0aGUgbmV4dCBibG9jayB0aGF0IGRlbGV0ZXMgdHJhY2VDb29yZCBkYXRhXG4gICAgICAgICAgICAgICAgLy8gYWxzbyBpdCdzIGltcG9ydGFudCB0byBjb3B5LCBvdGhlcndpc2UgZGF0YSBpcyBsb3N0IGJ5IHRoZSB0aW1lIGV2ZW50IGRhdGEgaXMgcmVhZFxuICAgICAgICAgICAgICAgIHRoaXMuZW1pdFBvaW50QWN0aW9uKG5leHRTZWxlY3Rpb24sICdwbG90bHlfaG92ZXInKTtcblxuICAgICAgICAgICAgICAgIHZhciB0cmFjZSA9IHRoaXMuZnVsbERhdGFbc2VsZWN0aW9uLnRyYWNlLmluZGV4XSB8fCB7fTtcbiAgICAgICAgICAgICAgICB2YXIgcHROdW1iZXIgPSBzZWxlY3Rpb24ucG9pbnRJbmRleDtcbiAgICAgICAgICAgICAgICB2YXIgaG92ZXJpbmZvID0gRnguY2FzdEhvdmVyaW5mbyh0cmFjZSwgZnVsbExheW91dCwgcHROdW1iZXIpO1xuXG4gICAgICAgICAgICAgICAgaWYoaG92ZXJpbmZvICYmIGhvdmVyaW5mbyAhPT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBhcnRzID0gaG92ZXJpbmZvLnNwbGl0KCcrJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ3gnKSA9PT0gLTEpIHNlbGVjdGlvbi50cmFjZUNvb3JkWzBdID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgICAgICBpZihwYXJ0cy5pbmRleE9mKCd5JykgPT09IC0xKSBzZWxlY3Rpb24udHJhY2VDb29yZFsxXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgaWYocGFydHMuaW5kZXhPZigneicpID09PSAtMSkgc2VsZWN0aW9uLnRyYWNlQ29vcmRbMl0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ3RleHQnKSA9PT0gLTEpIHNlbGVjdGlvbi50ZXh0TGFiZWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICAgICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ25hbWUnKSA9PT0gLTEpIHNlbGVjdGlvbi5uYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIEZ4LmxvbmVIb3Zlcih7XG4gICAgICAgICAgICAgICAgICAgIHg6IHNlbGVjdGlvbi5zY3JlZW5Db29yZFswXSxcbiAgICAgICAgICAgICAgICAgICAgeTogc2VsZWN0aW9uLnNjcmVlbkNvb3JkWzFdLFxuICAgICAgICAgICAgICAgICAgICB4TGFiZWw6IHRoaXMuaG92ZXJGb3JtYXR0ZXIoJ3hheGlzJywgc2VsZWN0aW9uLnRyYWNlQ29vcmRbMF0pLFxuICAgICAgICAgICAgICAgICAgICB5TGFiZWw6IHRoaXMuaG92ZXJGb3JtYXR0ZXIoJ3lheGlzJywgc2VsZWN0aW9uLnRyYWNlQ29vcmRbMV0pLFxuICAgICAgICAgICAgICAgICAgICB6TGFiZWw6IHNlbGVjdGlvbi50cmFjZUNvb3JkWzJdLFxuICAgICAgICAgICAgICAgICAgICB0ZXh0OiBzZWxlY3Rpb24udGV4dExhYmVsLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBzZWxlY3Rpb24ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IEZ4LmNhc3RIb3Zlck9wdGlvbih0cmFjZSwgcHROdW1iZXIsICdiZ2NvbG9yJykgfHwgc2VsZWN0aW9uLmNvbG9yLFxuICAgICAgICAgICAgICAgICAgICBib3JkZXJDb2xvcjogRnguY2FzdEhvdmVyT3B0aW9uKHRyYWNlLCBwdE51bWJlciwgJ2JvcmRlcmNvbG9yJyksXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6IEZ4LmNhc3RIb3Zlck9wdGlvbih0cmFjZSwgcHROdW1iZXIsICdmb250LmZhbWlseScpLFxuICAgICAgICAgICAgICAgICAgICBmb250U2l6ZTogRnguY2FzdEhvdmVyT3B0aW9uKHRyYWNlLCBwdE51bWJlciwgJ2ZvbnQuc2l6ZScpLFxuICAgICAgICAgICAgICAgICAgICBmb250Q29sb3I6IEZ4LmNhc3RIb3Zlck9wdGlvbih0cmFjZSwgcHROdW1iZXIsICdmb250LmNvbG9yJyksXG4gICAgICAgICAgICAgICAgICAgIG5hbWVMZW5ndGg6IEZ4LmNhc3RIb3Zlck9wdGlvbih0cmFjZSwgcHROdW1iZXIsICduYW1lbGVuZ3RoJyksXG4gICAgICAgICAgICAgICAgICAgIHRleHRBbGlnbjogRnguY2FzdEhvdmVyT3B0aW9uKHRyYWNlLCBwdE51bWJlciwgJ2FsaWduJylcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogdGhpcy5zdmdDb250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgIGdkOiB0aGlzLmdyYXBoRGl2XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmUgaG92ZXIgZWZmZWN0cyBpZiB3ZSdyZSBub3Qgb3ZlciBhIHBvaW50IE9SXG4gICAgLy8gaWYgd2UncmUgem9vbWluZyBvciBwYW5uaW5nIChpbiB3aGljaCBjYXNlIHJlc3VsdCBpcyBub3Qgc2V0KVxuICAgIGlmKCFyZXN1bHQpIHtcbiAgICAgICAgdGhpcy51bmhvdmVyKCk7XG4gICAgfVxuXG4gICAgZ2xwbG90LmRyYXcoKTtcbn07XG5cbnByb3RvLnVuaG92ZXIgPSBmdW5jdGlvbigpIHtcbiAgICBpZih0aGlzLmxhc3RQaWNrUmVzdWx0KSB7XG4gICAgICAgIHRoaXMuc3Bpa2VzLnVwZGF0ZSh7fSk7XG4gICAgICAgIHRoaXMubGFzdFBpY2tSZXN1bHQgPSBudWxsO1xuICAgICAgICB0aGlzLmdyYXBoRGl2LmVtaXQoJ3Bsb3RseV91bmhvdmVyJyk7XG4gICAgICAgIEZ4LmxvbmVVbmhvdmVyKHRoaXMuc3ZnQ29udGFpbmVyKTtcbiAgICB9XG59O1xuXG5wcm90by5ob3ZlckZvcm1hdHRlciA9IGZ1bmN0aW9uKGF4aXNOYW1lLCB2YWwpIHtcbiAgICBpZih2YWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuIHVuZGVmaW5lZDtcblxuICAgIHZhciBheGlzID0gdGhpc1theGlzTmFtZV07XG4gICAgcmV0dXJuIEF4ZXMudGlja1RleHQoYXhpcywgYXhpcy5jMmwodmFsKSwgJ2hvdmVyJykudGV4dDtcbn07XG4iLCIndXNlIHN0cmljdCdcblxubW9kdWxlLmV4cG9ydHMgPSB0ZXh0R2V0XG5cbnZhciB2ZWN0b3JpemVUZXh0ID0gcmVxdWlyZSgndmVjdG9yaXplLXRleHQnKVxuXG52YXIgZ2xvYmFscyA9IHdpbmRvdyB8fCBwcm9jZXNzLmdsb2JhbCB8fCB7fVxudmFyIF9fVEVYVF9DQUNIRSAgPSBnbG9iYWxzLl9fVEVYVF9DQUNIRSB8fCB7fVxuZ2xvYmFscy5fX1RFWFRfQ0FDSEUgPSB7fVxuXG5mdW5jdGlvbiB1bndyYXAobWVzaCkge1xuICB2YXIgY2VsbHMgICAgID0gbWVzaC5jZWxsc1xuICB2YXIgcG9zaXRpb25zID0gbWVzaC5wb3NpdGlvbnNcbiAgdmFyIGRhdGEgICAgICA9IG5ldyBGbG9hdDMyQXJyYXkoY2VsbHMubGVuZ3RoICogNilcbiAgdmFyIHB0ciAgICAgICA9IDBcbiAgdmFyIHNoYXBlWCAgICA9IDBcbiAgZm9yKHZhciBpPTA7IGk8Y2VsbHMubGVuZ3RoOyArK2kpIHtcbiAgICB2YXIgdHJpID0gY2VsbHNbaV1cbiAgICBmb3IodmFyIGo9MDsgajwzOyArK2opIHtcbiAgICAgIHZhciBwb2ludCA9IHBvc2l0aW9uc1t0cmlbal1dXG4gICAgICBkYXRhW3B0cisrXSA9IHBvaW50WzBdXG4gICAgICBkYXRhW3B0cisrXSA9IHBvaW50WzFdICsgMS40XG4gICAgICBzaGFwZVggICAgICA9IE1hdGgubWF4KHBvaW50WzBdLCBzaGFwZVgpXG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgZGF0YTogIGRhdGEsXG4gICAgc2hhcGU6IHNoYXBlWFxuICB9XG59XG5cbmZ1bmN0aW9uIHRleHRHZXQoZm9udCwgdGV4dCwgb3B0cykge1xuICB2YXIgb3B0cyA9IG9wdHMgfHwge31cbiAgdmFyIGZvbnRjYWNoZSA9IF9fVEVYVF9DQUNIRVtmb250XVxuICBpZighZm9udGNhY2hlKSB7XG4gICAgZm9udGNhY2hlID0gX19URVhUX0NBQ0hFW2ZvbnRdID0ge1xuICAgICAgJyAnOiB7XG4gICAgICAgIGRhdGE6ICAgbmV3IEZsb2F0MzJBcnJheSgwKSxcbiAgICAgICAgc2hhcGU6IDAuMlxuICAgICAgfVxuICAgIH1cbiAgfVxuICB2YXIgbWVzaCA9IGZvbnRjYWNoZVt0ZXh0XVxuICBpZighbWVzaCkge1xuICAgIGlmKHRleHQubGVuZ3RoIDw9IDEgfHwgIS9cXGQvLnRlc3QodGV4dCkpIHtcbiAgICAgIG1lc2ggPSBmb250Y2FjaGVbdGV4dF0gPSB1bndyYXAodmVjdG9yaXplVGV4dCh0ZXh0LCB7XG4gICAgICAgIHRyaWFuZ2xlczogICAgIHRydWUsXG4gICAgICAgIGZvbnQ6ICAgICAgICAgIGZvbnQsXG4gICAgICAgIHRleHRBbGlnbjogICAgIG9wdHMudGV4dEFsaWduIHx8ICdsZWZ0JyxcbiAgICAgICAgdGV4dEJhc2VsaW5lOiAgJ2FscGhhYmV0aWMnLFxuICAgICAgICBzdHlsZXRhZ3M6IHtcbiAgICAgICAgICAgIGJyZWFrbGluZXM6IHRydWUsXG4gICAgICAgICAgICAgICAgIGJvbGRzOiB0cnVlLFxuICAgICAgICAgICAgICAgaXRhbGljczogdHJ1ZSxcbiAgICAgICAgICAgIHN1YnNjcmlwdHM6IHRydWUsXG4gICAgICAgICAgc3VwZXJzY3JpcHRzOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIH0pKVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgcGFydHMgPSB0ZXh0LnNwbGl0KC8oXFxkfFxccykvKVxuICAgICAgdmFyIGJ1ZmZlciA9IG5ldyBBcnJheShwYXJ0cy5sZW5ndGgpXG4gICAgICB2YXIgYnVmZmVyU2l6ZSA9IDBcbiAgICAgIHZhciBzaGFwZVggPSAwXG4gICAgICBmb3IodmFyIGk9MDsgaTxwYXJ0cy5sZW5ndGg7ICsraSkge1xuICAgICAgICBidWZmZXJbaV0gPSB0ZXh0R2V0KGZvbnQsIHBhcnRzW2ldKVxuICAgICAgICBidWZmZXJTaXplICs9IGJ1ZmZlcltpXS5kYXRhLmxlbmd0aFxuICAgICAgICBzaGFwZVggKz0gYnVmZmVyW2ldLnNoYXBlXG4gICAgICAgIGlmKGk+MCkge1xuICAgICAgICAgIHNoYXBlWCArPSAwLjAyXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdmFyIGRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KGJ1ZmZlclNpemUpXG4gICAgICB2YXIgcHRyICAgICA9IDBcbiAgICAgIHZhciB4T2Zmc2V0ID0gLTAuNSAqIHNoYXBlWFxuICAgICAgZm9yKHZhciBpPTA7IGk8YnVmZmVyLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBiZGF0YSA9IGJ1ZmZlcltpXS5kYXRhXG4gICAgICAgIGZvcih2YXIgaj0wOyBqPGJkYXRhLmxlbmd0aDsgais9Mikge1xuICAgICAgICAgIGRhdGFbcHRyKytdID0gYmRhdGFbal0gKyB4T2Zmc2V0XG4gICAgICAgICAgZGF0YVtwdHIrK10gPSBiZGF0YVtqKzFdXG4gICAgICAgIH1cbiAgICAgICAgeE9mZnNldCArPSBidWZmZXJbaV0uc2hhcGUgKyAwLjAyXG4gICAgICB9XG5cbiAgICAgIG1lc2ggPSBmb250Y2FjaGVbdGV4dF0gPSB7XG4gICAgICAgIGRhdGE6ICBkYXRhLFxuICAgICAgICBzaGFwZTogc2hhcGVYXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgIHJldHVybiBtZXNoXG59XG4iXSwic291cmNlUm9vdCI6IiJ9