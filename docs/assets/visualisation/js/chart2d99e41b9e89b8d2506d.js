(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_image_js"],{

/***/ "./node_modules/plotly.js/lib/image.js":
/*!*********************************************!*\
  !*** ./node_modules/plotly.js/lib/image.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/image */ "./node_modules/plotly.js/src/traces/image/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/image/attributes.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/image/attributes.js ***!
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



var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var colormodel = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/image/constants.js").colormodel;

var cm = ['rgb', 'rgba', 'hsl', 'hsla'];
var zminDesc = [];
var zmaxDesc = [];
for(var i = 0; i < cm.length; i++) {
    zminDesc.push('For the `' + cm[i] + '` colormodel, it is [' + colormodel[cm[i]].min.join(', ') + '].');
    zmaxDesc.push('For the `' + cm[i] + '` colormodel, it is [' + colormodel[cm[i]].max.join(', ') + '].');
}

module.exports = extendFlat({
    z: {
        valType: 'data_array',
        role: 'info',
        editType: 'calc',
        description: [
            'A 2-dimensional array in which each element is an array of 3 or 4 numbers representing a color.',
        ].join(' ')
    },
    colormodel: {
        valType: 'enumerated',
        values: cm,
        dflt: 'rgb',
        role: 'info',
        editType: 'calc',
        description: 'Color model used to map the numerical color components described in `z` into colors.'
    },
    zmin: {
        valType: 'info_array',
        items: [
            {valType: 'number', editType: 'calc'},
            {valType: 'number', editType: 'calc'},
            {valType: 'number', editType: 'calc'},
            {valType: 'number', editType: 'calc'}
        ],
        role: 'info',
        editType: 'calc',
        description: [
            'Array defining the lower bound for each color component.',
            'Note that the default value will depend on the colormodel.',
            zminDesc.join(' ')
        ].join(' ')
    },
    zmax: {
        valType: 'info_array',
        items: [
            {valType: 'number', editType: 'calc'},
            {valType: 'number', editType: 'calc'},
            {valType: 'number', editType: 'calc'},
            {valType: 'number', editType: 'calc'}
        ],
        role: 'info',
        editType: 'calc',
        description: [
            'Array defining the higher bound for each color component.',
            'Note that the default value will depend on the colormodel.',
            zmaxDesc.join(' ')
        ].join(' ')
    },
    x0: {
        valType: 'any',
        dflt: 0,
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: 'Set the image\'s x position.'
    },
    y0: {
        valType: 'any',
        dflt: 0,
        role: 'info',
        editType: 'calc+clearAxisTypes',
        description: 'Set the image\'s y position.'
    },
    dx: {
        valType: 'number',
        dflt: 1,
        role: 'info',
        editType: 'calc',
        description: 'Set the pixel\'s horizontal size.'
    },
    dy: {
        valType: 'number',
        dflt: 1,
        role: 'info',
        editType: 'calc',
        description: 'Set the pixel\'s vertical size'
    },
    text: {
        valType: 'data_array',
        editType: 'plot',
        description: 'Sets the text elements associated with each z value.'
    },
    hovertext: {
        valType: 'data_array',
        editType: 'plot',
        description: 'Same as `text`.'
    },
    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['x', 'y', 'z', 'color', 'name', 'text'],
        dflt: 'x+y+z+text+name'
    }),
    hovertemplate: hovertemplateAttrs({}, {
        keys: ['z', 'color', 'colormodel']
    }),

    transforms: undefined
});


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/image/calc.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/image/calc.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/image/constants.js");
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var maxRowLength = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").maxRowLength;

module.exports = function calc(gd, trace) {
    var xa = Axes.getFromId(gd, trace.xaxis || 'x');
    var ya = Axes.getFromId(gd, trace.yaxis || 'y');

    var x0 = xa.d2c(trace.x0) - trace.dx / 2;
    var y0 = ya.d2c(trace.y0) - trace.dy / 2;
    var h = trace.z.length;
    var w = maxRowLength(trace.z);

    // Set axis range
    var i;
    var xrange = [x0, x0 + w * trace.dx];
    var yrange = [y0, y0 + h * trace.dy];
    if(xa && xa.type === 'log') for(i = 0; i < w; i++) xrange.push(x0 + i * trace.dx);
    if(ya && ya.type === 'log') for(i = 0; i < h; i++) yrange.push(y0 + i * trace.dy);
    trace._extremes[xa._id] = Axes.findExtremes(xa, xrange);
    trace._extremes[ya._id] = Axes.findExtremes(ya, yrange);
    trace._scaler = makeScaler(trace);

    var cd0 = {
        x0: x0,
        y0: y0,
        z: trace.z,
        w: w,
        h: h
    };
    return [cd0];
};

function scale(zero, ratio, min, max) {
    return function(c) {
        return Lib.constrain((c - zero) * ratio, min, max);
    };
}

function constrain(min, max) {
    return function(c) { return Lib.constrain(c, min, max);};
}

// Generate a function to scale color components according to zmin/zmax and the colormodel
function makeScaler(trace) {
    var colormodel = trace.colormodel;
    var n = colormodel.length;
    var cr = constants.colormodel[colormodel];

    trace._sArray = [];
    // Loop over all color components
    for(var k = 0; k < n; k++) {
        if(cr.min[k] !== trace.zmin[k] || cr.max[k] !== trace.zmax[k]) {
            trace._sArray.push(scale(
                trace.zmin[k],
                (cr.max[k] - cr.min[k]) / (trace.zmax[k] - trace.zmin[k]),
                cr.min[k],
                cr.max[k]
            ));
        } else {
            trace._sArray.push(constrain(cr.min[k], cr.max[k]));
        }
    }

    return function(pixel) {
        var c = pixel.slice(0, n);
        for(var k = 0; k < n; k++) {
            var ck = c[k];
            if(!isNumeric(ck)) return false;
            c[k] = trace._sArray[k](ck);
        }
        return c;
    };
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/image/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/image/constants.js ***!
  \**************************************************************/
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
    colormodel: {
        rgb: {
            min: [0, 0, 0],
            max: [255, 255, 255],
            fmt: function(c) {return c.slice(0, 3);},
            suffix: ['', '', '']
        },
        rgba: {
            min: [0, 0, 0, 0],
            max: [255, 255, 255, 1],
            fmt: function(c) {return c.slice(0, 4);},
            suffix: ['', '', '', '']
        },
        hsl: {
            min: [0, 0, 0],
            max: [360, 100, 100],
            fmt: function(c) {
                var p = c.slice(0, 3);
                p[1] = p[1] + '%';
                p[2] = p[2] + '%';
                return p;
            },
            suffix: ['°', '%', '%']
        },
        hsla: {
            min: [0, 0, 0, 0],
            max: [360, 100, 100, 1],
            fmt: function(c) {
                var p = c.slice(0, 4);
                p[1] = p[1] + '%';
                p[2] = p[2] + '%';
                return p;
            },
            suffix: ['°', '%', '%', '']
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/image/defaults.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/image/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/image/attributes.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/image/constants.js");

module.exports = function supplyDefaults(traceIn, traceOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }
    var z = coerce('z');
    if(z === undefined || !z.length || !z[0] || !z[0].length) {
        traceOut.visible = false;
        return;
    }

    coerce('x0');
    coerce('y0');
    coerce('dx');
    coerce('dy');
    var colormodel = coerce('colormodel');

    coerce('zmin', constants.colormodel[colormodel].min);
    coerce('zmax', constants.colormodel[colormodel].max);

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    traceOut._length = null;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/image/event_data.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/image/event_data.js ***!
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



module.exports = function eventData(out, pt) {
    if('xVal' in pt) out.x = pt.xVal;
    if('yVal' in pt) out.y = pt.yVal;
    if(pt.xa) out.xaxis = pt.xa;
    if(pt.ya) out.yaxis = pt.ya;
    out.color = pt.color;
    out.colormodel = pt.trace.colormodel;
    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/image/hover.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/image/hover.js ***!
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



var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/image/constants.js");

module.exports = function hoverPoints(pointData, xval, yval) {
    var cd0 = pointData.cd[0];
    var trace = cd0.trace;
    var xa = pointData.xa;
    var ya = pointData.ya;

    // Return early if not on image
    if(Fx.inbox(xval - cd0.x0, xval - (cd0.x0 + cd0.w * trace.dx), 0) > 0 ||
            Fx.inbox(yval - cd0.y0, yval - (cd0.y0 + cd0.h * trace.dy), 0) > 0) {
        return;
    }

    // Find nearest pixel's index
    var nx = Math.floor((xval - cd0.x0) / trace.dx);
    var ny = Math.floor(Math.abs(yval - cd0.y0) / trace.dy);

    // return early if pixel is undefined
    if(!cd0.z[ny][nx]) return;

    var hoverinfo = cd0.hi || trace.hoverinfo;
    var fmtColor;
    if(hoverinfo) {
        var parts = hoverinfo.split('+');
        if(parts.indexOf('all') !== -1) parts = ['color'];
        if(parts.indexOf('color') !== -1) fmtColor = true;
    }

    var colormodel = trace.colormodel;
    var dims = colormodel.length;
    var c = trace._scaler(cd0.z[ny][nx]);
    var s = constants.colormodel[colormodel].suffix;

    var colorstring = [];
    if(trace.hovertemplate || fmtColor) {
        colorstring.push('[' + [c[0] + s[0], c[1] + s[1], c[2] + s[2]].join(', '));
        if(dims === 4) colorstring.push(', ' + c[3] + s[3]);
        colorstring.push(']');
        colorstring = colorstring.join('');
        pointData.extraText = colormodel.toUpperCase() + ': ' + colorstring;
    }

    var text;
    if(Array.isArray(trace.hovertext) && Array.isArray(trace.hovertext[ny])) {
        text = trace.hovertext[ny][nx];
    } else if(Array.isArray(trace.text) && Array.isArray(trace.text[ny])) {
        text = trace.text[ny][nx];
    }

    // TODO: for color model with 3 dims, display something useful for hovertemplate `%{color[3]}`
    var py = ya.c2p(cd0.y0 + (ny + 0.5) * trace.dy);
    var xVal = cd0.x0 + (nx + 0.5) * trace.dx;
    var yVal = cd0.y0 + (ny + 0.5) * trace.dy;
    var zLabel = '[' + cd0.z[ny][nx].slice(0, trace.colormodel.length).join(', ') + ']';
    return [Lib.extendFlat(pointData, {
        index: [ny, nx],
        x0: xa.c2p(cd0.x0 + nx * trace.dx),
        x1: xa.c2p(cd0.x0 + (nx + 1) * trace.dx),
        y0: py,
        y1: py,
        color: c,
        xVal: xVal,
        xLabelVal: xVal,
        yVal: yVal,
        yLabelVal: yVal,
        zLabelVal: zLabel,
        text: text,
        hovertemplateLabels: {
            'zLabel': zLabel,
            'colorLabel': colorstring,
            'color[0]Label': c[0] + s[0],
            'color[1]Label': c[1] + s[1],
            'color[2]Label': c[2] + s[2],
            'color[3]Label': c[3] + s[3]
        }
    })];
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/image/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/image/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/image/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/image/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/image/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/image/plot.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/image/style.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/image/hover.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/image/event_data.js"),

    moduleType: 'trace',
    name: 'image',
    basePlotModule: __webpack_require__(/*! ../../plots/cartesian */ "./node_modules/plotly.js/src/plots/cartesian/index.js"),
    categories: ['cartesian', 'svg', '2dMap', 'noSortingByValue'],
    animatable: false,
    meta: {
        description: [
            'Display an image, i.e. data on a 2D regular raster.',
            'By default, when an image is displayed in a subplot,',
            'its y axis will be reversed (ie. `autorange: \'reversed\'`),',
            'constrained to the domain (ie. `constrain: \'domain\'`)',
            'and it will have the same scale as its x axis (ie. `scaleanchor: \'x\,`)',
            'in order for pixels to be rendered as squares.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/image/plot.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/image/plot.js ***!
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
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var xmlnsNamespaces = __webpack_require__(/*! ../../constants/xmlns_namespaces */ "./node_modules/plotly.js/src/constants/xmlns_namespaces.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/image/constants.js");

module.exports = function plot(gd, plotinfo, cdimage, imageLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    Lib.makeTraceGroups(imageLayer, cdimage, 'im').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;

        var z = cd0.z;
        var x0 = cd0.x0;
        var y0 = cd0.y0;
        var w = cd0.w;
        var h = cd0.h;
        var dx = trace.dx;
        var dy = trace.dy;

        var left, right, temp, top, bottom, i;
        // in case of log of a negative
        i = 0;
        while(left === undefined && i < w) {
            left = xa.c2p(x0 + i * dx);
            i++;
        }
        i = w;
        while(right === undefined && i > 0) {
            right = xa.c2p(x0 + i * dx);
            i--;
        }
        i = 0;
        while(top === undefined && i < h) {
            top = ya.c2p(y0 + i * dy);
            i++;
        }
        i = h;
        while(bottom === undefined && i > 0) {
            bottom = ya.c2p(y0 + i * dy);
            i--;
        }

        if(right < left) {
            temp = right;
            right = left;
            left = temp;
        }

        if(bottom < top) {
            temp = top;
            top = bottom;
            bottom = temp;
        }

        // Reduce image size when zoomed in to save memory
        var extra = 0.5; // half the axis size
        left = Math.max(-extra * xa._length, left);
        right = Math.min((1 + extra) * xa._length, right);
        top = Math.max(-extra * ya._length, top);
        bottom = Math.min((1 + extra) * ya._length, bottom);
        var imageWidth = Math.round(right - left);
        var imageHeight = Math.round(bottom - top);

        // if image is entirely off-screen, don't even draw it
        var isOffScreen = (imageWidth <= 0 || imageHeight <= 0);
        if(isOffScreen) {
            var noImage = plotGroup.selectAll('image').data([]);
            noImage.exit().remove();
            return;
        }

        // Draw each pixel
        var canvas = document.createElement('canvas');
        canvas.width = imageWidth;
        canvas.height = imageHeight;
        var context = canvas.getContext('2d');

        var ipx = function(i) {return Lib.constrain(Math.round(xa.c2p(x0 + i * dx) - left), 0, imageWidth);};
        var jpx = function(j) {return Lib.constrain(Math.round(ya.c2p(y0 + j * dy) - top), 0, imageHeight);};

        var fmt = constants.colormodel[trace.colormodel].fmt;
        var c;
        for(i = 0; i < cd0.w; i++) {
            var ipx0 = ipx(i); var ipx1 = ipx(i + 1);
            if(ipx1 === ipx0 || isNaN(ipx1) || isNaN(ipx0)) continue;
            for(var j = 0; j < cd0.h; j++) {
                var jpx0 = jpx(j); var jpx1 = jpx(j + 1);
                if(jpx1 === jpx0 || isNaN(jpx1) || isNaN(jpx0) || !z[j][i]) continue;
                c = trace._scaler(z[j][i]);
                if(c) {
                    context.fillStyle = trace.colormodel + '(' + fmt(c).join(',') + ')';
                } else {
                    // Return a transparent pixel
                    context.fillStyle = 'rgba(0,0,0,0)';
                }
                context.fillRect(ipx0, jpx0, ipx1 - ipx0, jpx1 - jpx0);
            }
        }

        var image3 = plotGroup.selectAll('image')
            .data(cd);

        image3.enter().append('svg:image').attr({
            xmlns: xmlnsNamespaces.svg,
            preserveAspectRatio: 'none'
        });

        image3.attr({
            height: imageHeight,
            width: imageWidth,
            x: left,
            y: top,
            'xlink:href': canvas.toDataURL('image/png')
        });
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/image/style.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/image/style.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

module.exports = function style(gd) {
    d3.select(gd).selectAll('.im image')
        .style('opacity', function(d) {
            return d.trace.opacity;
        });
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9pbWFnZS9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaW1hZ2UvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2ltYWdlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2ltYWdlL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaW1hZ2UvZXZlbnRfZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2ltYWdlL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaW1hZ2UvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9pbWFnZS9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaW1hZ2Uvc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIscUhBQStDOzs7Ozs7Ozs7Ozs7QUNWL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7QUNoSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsU0FBUyxtQkFBTyxDQUFDLG1DQUFJOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCIsImZpbGUiOiJjaGFydDJkOTllNDFiOWU4OWI4ZDI1MDZkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvaW1hZ2UnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBjb2xvcm1vZGVsID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKS5jb2xvcm1vZGVsO1xuXG52YXIgY20gPSBbJ3JnYicsICdyZ2JhJywgJ2hzbCcsICdoc2xhJ107XG52YXIgem1pbkRlc2MgPSBbXTtcbnZhciB6bWF4RGVzYyA9IFtdO1xuZm9yKHZhciBpID0gMDsgaSA8IGNtLmxlbmd0aDsgaSsrKSB7XG4gICAgem1pbkRlc2MucHVzaCgnRm9yIHRoZSBgJyArIGNtW2ldICsgJ2AgY29sb3Jtb2RlbCwgaXQgaXMgWycgKyBjb2xvcm1vZGVsW2NtW2ldXS5taW4uam9pbignLCAnKSArICddLicpO1xuICAgIHptYXhEZXNjLnB1c2goJ0ZvciB0aGUgYCcgKyBjbVtpXSArICdgIGNvbG9ybW9kZWwsIGl0IGlzIFsnICsgY29sb3Jtb2RlbFtjbVtpXV0ubWF4LmpvaW4oJywgJykgKyAnXS4nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmRGbGF0KHtcbiAgICB6OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0EgMi1kaW1lbnNpb25hbCBhcnJheSBpbiB3aGljaCBlYWNoIGVsZW1lbnQgaXMgYW4gYXJyYXkgb2YgMyBvciA0IG51bWJlcnMgcmVwcmVzZW50aW5nIGEgY29sb3IuJyxcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGNvbG9ybW9kZWw6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IGNtLFxuICAgICAgICBkZmx0OiAncmdiJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0NvbG9yIG1vZGVsIHVzZWQgdG8gbWFwIHRoZSBudW1lcmljYWwgY29sb3IgY29tcG9uZW50cyBkZXNjcmliZWQgaW4gYHpgIGludG8gY29sb3JzLidcbiAgICB9LFxuICAgIHptaW46IHtcbiAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBlZGl0VHlwZTogJ2NhbGMnfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgZWRpdFR5cGU6ICdjYWxjJ30sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIGVkaXRUeXBlOiAnY2FsYyd9LFxuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBlZGl0VHlwZTogJ2NhbGMnfVxuICAgICAgICBdLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnQXJyYXkgZGVmaW5pbmcgdGhlIGxvd2VyIGJvdW5kIGZvciBlYWNoIGNvbG9yIGNvbXBvbmVudC4nLFxuICAgICAgICAgICAgJ05vdGUgdGhhdCB0aGUgZGVmYXVsdCB2YWx1ZSB3aWxsIGRlcGVuZCBvbiB0aGUgY29sb3Jtb2RlbC4nLFxuICAgICAgICAgICAgem1pbkRlc2Muam9pbignICcpXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB6bWF4OiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgZWRpdFR5cGU6ICdjYWxjJ30sXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcicsIGVkaXRUeXBlOiAnY2FsYyd9LFxuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBlZGl0VHlwZTogJ2NhbGMnfSxcbiAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJywgZWRpdFR5cGU6ICdjYWxjJ31cbiAgICAgICAgXSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0FycmF5IGRlZmluaW5nIHRoZSBoaWdoZXIgYm91bmQgZm9yIGVhY2ggY29sb3IgY29tcG9uZW50LicsXG4gICAgICAgICAgICAnTm90ZSB0aGF0IHRoZSBkZWZhdWx0IHZhbHVlIHdpbGwgZGVwZW5kIG9uIHRoZSBjb2xvcm1vZGVsLicsXG4gICAgICAgICAgICB6bWF4RGVzYy5qb2luKCcgJylcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHgwOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0IHRoZSBpbWFnZVxcJ3MgeCBwb3NpdGlvbi4nXG4gICAgfSxcbiAgICB5MDoge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldCB0aGUgaW1hZ2VcXCdzIHkgcG9zaXRpb24uJ1xuICAgIH0sXG4gICAgZHg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXQgdGhlIHBpeGVsXFwncyBob3Jpem9udGFsIHNpemUuJ1xuICAgIH0sXG4gICAgZHk6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXQgdGhlIHBpeGVsXFwncyB2ZXJ0aWNhbCBzaXplJ1xuICAgIH0sXG4gICAgdGV4dDoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgdGV4dCBlbGVtZW50cyBhc3NvY2lhdGVkIHdpdGggZWFjaCB6IHZhbHVlLidcbiAgICB9LFxuICAgIGhvdmVydGV4dDoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2FtZSBhcyBgdGV4dGAuJ1xuICAgIH0sXG4gICAgaG92ZXJpbmZvOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuaG92ZXJpbmZvLCB7XG4gICAgICAgIGZsYWdzOiBbJ3gnLCAneScsICd6JywgJ2NvbG9yJywgJ25hbWUnLCAndGV4dCddLFxuICAgICAgICBkZmx0OiAneCt5K3ordGV4dCtuYW1lJ1xuICAgIH0pLFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycyh7fSwge1xuICAgICAgICBrZXlzOiBbJ3onLCAnY29sb3InLCAnY29sb3Jtb2RlbCddXG4gICAgfSksXG5cbiAgICB0cmFuc2Zvcm1zOiB1bmRlZmluZWRcbn0pO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIG1heFJvd0xlbmd0aCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLm1heFJvd0xlbmd0aDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciB4YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS54YXhpcyB8fCAneCcpO1xuICAgIHZhciB5YSA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCB0cmFjZS55YXhpcyB8fCAneScpO1xuXG4gICAgdmFyIHgwID0geGEuZDJjKHRyYWNlLngwKSAtIHRyYWNlLmR4IC8gMjtcbiAgICB2YXIgeTAgPSB5YS5kMmModHJhY2UueTApIC0gdHJhY2UuZHkgLyAyO1xuICAgIHZhciBoID0gdHJhY2Uuei5sZW5ndGg7XG4gICAgdmFyIHcgPSBtYXhSb3dMZW5ndGgodHJhY2Uueik7XG5cbiAgICAvLyBTZXQgYXhpcyByYW5nZVxuICAgIHZhciBpO1xuICAgIHZhciB4cmFuZ2UgPSBbeDAsIHgwICsgdyAqIHRyYWNlLmR4XTtcbiAgICB2YXIgeXJhbmdlID0gW3kwLCB5MCArIGggKiB0cmFjZS5keV07XG4gICAgaWYoeGEgJiYgeGEudHlwZSA9PT0gJ2xvZycpIGZvcihpID0gMDsgaSA8IHc7IGkrKykgeHJhbmdlLnB1c2goeDAgKyBpICogdHJhY2UuZHgpO1xuICAgIGlmKHlhICYmIHlhLnR5cGUgPT09ICdsb2cnKSBmb3IoaSA9IDA7IGkgPCBoOyBpKyspIHlyYW5nZS5wdXNoKHkwICsgaSAqIHRyYWNlLmR5KTtcbiAgICB0cmFjZS5fZXh0cmVtZXNbeGEuX2lkXSA9IEF4ZXMuZmluZEV4dHJlbWVzKHhhLCB4cmFuZ2UpO1xuICAgIHRyYWNlLl9leHRyZW1lc1t5YS5faWRdID0gQXhlcy5maW5kRXh0cmVtZXMoeWEsIHlyYW5nZSk7XG4gICAgdHJhY2UuX3NjYWxlciA9IG1ha2VTY2FsZXIodHJhY2UpO1xuXG4gICAgdmFyIGNkMCA9IHtcbiAgICAgICAgeDA6IHgwLFxuICAgICAgICB5MDogeTAsXG4gICAgICAgIHo6IHRyYWNlLnosXG4gICAgICAgIHc6IHcsXG4gICAgICAgIGg6IGhcbiAgICB9O1xuICAgIHJldHVybiBbY2QwXTtcbn07XG5cbmZ1bmN0aW9uIHNjYWxlKHplcm8sIHJhdGlvLCBtaW4sIG1heCkge1xuICAgIHJldHVybiBmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiBMaWIuY29uc3RyYWluKChjIC0gemVybykgKiByYXRpbywgbWluLCBtYXgpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGNvbnN0cmFpbihtaW4sIG1heCkge1xuICAgIHJldHVybiBmdW5jdGlvbihjKSB7IHJldHVybiBMaWIuY29uc3RyYWluKGMsIG1pbiwgbWF4KTt9O1xufVxuXG4vLyBHZW5lcmF0ZSBhIGZ1bmN0aW9uIHRvIHNjYWxlIGNvbG9yIGNvbXBvbmVudHMgYWNjb3JkaW5nIHRvIHptaW4vem1heCBhbmQgdGhlIGNvbG9ybW9kZWxcbmZ1bmN0aW9uIG1ha2VTY2FsZXIodHJhY2UpIHtcbiAgICB2YXIgY29sb3Jtb2RlbCA9IHRyYWNlLmNvbG9ybW9kZWw7XG4gICAgdmFyIG4gPSBjb2xvcm1vZGVsLmxlbmd0aDtcbiAgICB2YXIgY3IgPSBjb25zdGFudHMuY29sb3Jtb2RlbFtjb2xvcm1vZGVsXTtcblxuICAgIHRyYWNlLl9zQXJyYXkgPSBbXTtcbiAgICAvLyBMb29wIG92ZXIgYWxsIGNvbG9yIGNvbXBvbmVudHNcbiAgICBmb3IodmFyIGsgPSAwOyBrIDwgbjsgaysrKSB7XG4gICAgICAgIGlmKGNyLm1pbltrXSAhPT0gdHJhY2Uuem1pbltrXSB8fCBjci5tYXhba10gIT09IHRyYWNlLnptYXhba10pIHtcbiAgICAgICAgICAgIHRyYWNlLl9zQXJyYXkucHVzaChzY2FsZShcbiAgICAgICAgICAgICAgICB0cmFjZS56bWluW2tdLFxuICAgICAgICAgICAgICAgIChjci5tYXhba10gLSBjci5taW5ba10pIC8gKHRyYWNlLnptYXhba10gLSB0cmFjZS56bWluW2tdKSxcbiAgICAgICAgICAgICAgICBjci5taW5ba10sXG4gICAgICAgICAgICAgICAgY3IubWF4W2tdXG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRyYWNlLl9zQXJyYXkucHVzaChjb25zdHJhaW4oY3IubWluW2tdLCBjci5tYXhba10pKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmdW5jdGlvbihwaXhlbCkge1xuICAgICAgICB2YXIgYyA9IHBpeGVsLnNsaWNlKDAsIG4pO1xuICAgICAgICBmb3IodmFyIGsgPSAwOyBrIDwgbjsgaysrKSB7XG4gICAgICAgICAgICB2YXIgY2sgPSBjW2tdO1xuICAgICAgICAgICAgaWYoIWlzTnVtZXJpYyhjaykpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIGNba10gPSB0cmFjZS5fc0FycmF5W2tdKGNrKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYztcbiAgICB9O1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBjb2xvcm1vZGVsOiB7XG4gICAgICAgIHJnYjoge1xuICAgICAgICAgICAgbWluOiBbMCwgMCwgMF0sXG4gICAgICAgICAgICBtYXg6IFsyNTUsIDI1NSwgMjU1XSxcbiAgICAgICAgICAgIGZtdDogZnVuY3Rpb24oYykge3JldHVybiBjLnNsaWNlKDAsIDMpO30sXG4gICAgICAgICAgICBzdWZmaXg6IFsnJywgJycsICcnXVxuICAgICAgICB9LFxuICAgICAgICByZ2JhOiB7XG4gICAgICAgICAgICBtaW46IFswLCAwLCAwLCAwXSxcbiAgICAgICAgICAgIG1heDogWzI1NSwgMjU1LCAyNTUsIDFdLFxuICAgICAgICAgICAgZm10OiBmdW5jdGlvbihjKSB7cmV0dXJuIGMuc2xpY2UoMCwgNCk7fSxcbiAgICAgICAgICAgIHN1ZmZpeDogWycnLCAnJywgJycsICcnXVxuICAgICAgICB9LFxuICAgICAgICBoc2w6IHtcbiAgICAgICAgICAgIG1pbjogWzAsIDAsIDBdLFxuICAgICAgICAgICAgbWF4OiBbMzYwLCAxMDAsIDEwMF0sXG4gICAgICAgICAgICBmbXQ6IGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGMuc2xpY2UoMCwgMyk7XG4gICAgICAgICAgICAgICAgcFsxXSA9IHBbMV0gKyAnJSc7XG4gICAgICAgICAgICAgICAgcFsyXSA9IHBbMl0gKyAnJSc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VmZml4OiBbJ8KwJywgJyUnLCAnJSddXG4gICAgICAgIH0sXG4gICAgICAgIGhzbGE6IHtcbiAgICAgICAgICAgIG1pbjogWzAsIDAsIDAsIDBdLFxuICAgICAgICAgICAgbWF4OiBbMzYwLCAxMDAsIDEwMCwgMV0sXG4gICAgICAgICAgICBmbXQ6IGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IGMuc2xpY2UoMCwgNCk7XG4gICAgICAgICAgICAgICAgcFsxXSA9IHBbMV0gKyAnJSc7XG4gICAgICAgICAgICAgICAgcFsyXSA9IHBbMl0gKyAnJSc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VmZml4OiBbJ8KwJywgJyUnLCAnJScsICcnXVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cbiAgICB2YXIgeiA9IGNvZXJjZSgneicpO1xuICAgIGlmKHogPT09IHVuZGVmaW5lZCB8fCAhei5sZW5ndGggfHwgIXpbMF0gfHwgIXpbMF0ubGVuZ3RoKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgneDAnKTtcbiAgICBjb2VyY2UoJ3kwJyk7XG4gICAgY29lcmNlKCdkeCcpO1xuICAgIGNvZXJjZSgnZHknKTtcbiAgICB2YXIgY29sb3Jtb2RlbCA9IGNvZXJjZSgnY29sb3Jtb2RlbCcpO1xuXG4gICAgY29lcmNlKCd6bWluJywgY29uc3RhbnRzLmNvbG9ybW9kZWxbY29sb3Jtb2RlbF0ubWluKTtcbiAgICBjb2VyY2UoJ3ptYXgnLCBjb25zdGFudHMuY29sb3Jtb2RlbFtjb2xvcm1vZGVsXS5tYXgpO1xuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBldmVudERhdGEob3V0LCBwdCkge1xuICAgIGlmKCd4VmFsJyBpbiBwdCkgb3V0LnggPSBwdC54VmFsO1xuICAgIGlmKCd5VmFsJyBpbiBwdCkgb3V0LnkgPSBwdC55VmFsO1xuICAgIGlmKHB0LnhhKSBvdXQueGF4aXMgPSBwdC54YTtcbiAgICBpZihwdC55YSkgb3V0LnlheGlzID0gcHQueWE7XG4gICAgb3V0LmNvbG9yID0gcHQuY29sb3I7XG4gICAgb3V0LmNvbG9ybW9kZWwgPSBwdC50cmFjZS5jb2xvcm1vZGVsO1xuICAgIHJldHVybiBvdXQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgRnggPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Z4Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwpIHtcbiAgICB2YXIgY2QwID0gcG9pbnREYXRhLmNkWzBdO1xuICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcbiAgICB2YXIgeGEgPSBwb2ludERhdGEueGE7XG4gICAgdmFyIHlhID0gcG9pbnREYXRhLnlhO1xuXG4gICAgLy8gUmV0dXJuIGVhcmx5IGlmIG5vdCBvbiBpbWFnZVxuICAgIGlmKEZ4LmluYm94KHh2YWwgLSBjZDAueDAsIHh2YWwgLSAoY2QwLngwICsgY2QwLncgKiB0cmFjZS5keCksIDApID4gMCB8fFxuICAgICAgICAgICAgRnguaW5ib3goeXZhbCAtIGNkMC55MCwgeXZhbCAtIChjZDAueTAgKyBjZDAuaCAqIHRyYWNlLmR5KSwgMCkgPiAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBGaW5kIG5lYXJlc3QgcGl4ZWwncyBpbmRleFxuICAgIHZhciBueCA9IE1hdGguZmxvb3IoKHh2YWwgLSBjZDAueDApIC8gdHJhY2UuZHgpO1xuICAgIHZhciBueSA9IE1hdGguZmxvb3IoTWF0aC5hYnMoeXZhbCAtIGNkMC55MCkgLyB0cmFjZS5keSk7XG5cbiAgICAvLyByZXR1cm4gZWFybHkgaWYgcGl4ZWwgaXMgdW5kZWZpbmVkXG4gICAgaWYoIWNkMC56W255XVtueF0pIHJldHVybjtcblxuICAgIHZhciBob3ZlcmluZm8gPSBjZDAuaGkgfHwgdHJhY2UuaG92ZXJpbmZvO1xuICAgIHZhciBmbXRDb2xvcjtcbiAgICBpZihob3ZlcmluZm8pIHtcbiAgICAgICAgdmFyIHBhcnRzID0gaG92ZXJpbmZvLnNwbGl0KCcrJyk7XG4gICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ2FsbCcpICE9PSAtMSkgcGFydHMgPSBbJ2NvbG9yJ107XG4gICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ2NvbG9yJykgIT09IC0xKSBmbXRDb2xvciA9IHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGNvbG9ybW9kZWwgPSB0cmFjZS5jb2xvcm1vZGVsO1xuICAgIHZhciBkaW1zID0gY29sb3Jtb2RlbC5sZW5ndGg7XG4gICAgdmFyIGMgPSB0cmFjZS5fc2NhbGVyKGNkMC56W255XVtueF0pO1xuICAgIHZhciBzID0gY29uc3RhbnRzLmNvbG9ybW9kZWxbY29sb3Jtb2RlbF0uc3VmZml4O1xuXG4gICAgdmFyIGNvbG9yc3RyaW5nID0gW107XG4gICAgaWYodHJhY2UuaG92ZXJ0ZW1wbGF0ZSB8fCBmbXRDb2xvcikge1xuICAgICAgICBjb2xvcnN0cmluZy5wdXNoKCdbJyArIFtjWzBdICsgc1swXSwgY1sxXSArIHNbMV0sIGNbMl0gKyBzWzJdXS5qb2luKCcsICcpKTtcbiAgICAgICAgaWYoZGltcyA9PT0gNCkgY29sb3JzdHJpbmcucHVzaCgnLCAnICsgY1szXSArIHNbM10pO1xuICAgICAgICBjb2xvcnN0cmluZy5wdXNoKCddJyk7XG4gICAgICAgIGNvbG9yc3RyaW5nID0gY29sb3JzdHJpbmcuam9pbignJyk7XG4gICAgICAgIHBvaW50RGF0YS5leHRyYVRleHQgPSBjb2xvcm1vZGVsLnRvVXBwZXJDYXNlKCkgKyAnOiAnICsgY29sb3JzdHJpbmc7XG4gICAgfVxuXG4gICAgdmFyIHRleHQ7XG4gICAgaWYoQXJyYXkuaXNBcnJheSh0cmFjZS5ob3ZlcnRleHQpICYmIEFycmF5LmlzQXJyYXkodHJhY2UuaG92ZXJ0ZXh0W255XSkpIHtcbiAgICAgICAgdGV4dCA9IHRyYWNlLmhvdmVydGV4dFtueV1bbnhdO1xuICAgIH0gZWxzZSBpZihBcnJheS5pc0FycmF5KHRyYWNlLnRleHQpICYmIEFycmF5LmlzQXJyYXkodHJhY2UudGV4dFtueV0pKSB7XG4gICAgICAgIHRleHQgPSB0cmFjZS50ZXh0W255XVtueF07XG4gICAgfVxuXG4gICAgLy8gVE9ETzogZm9yIGNvbG9yIG1vZGVsIHdpdGggMyBkaW1zLCBkaXNwbGF5IHNvbWV0aGluZyB1c2VmdWwgZm9yIGhvdmVydGVtcGxhdGUgYCV7Y29sb3JbM119YFxuICAgIHZhciBweSA9IHlhLmMycChjZDAueTAgKyAobnkgKyAwLjUpICogdHJhY2UuZHkpO1xuICAgIHZhciB4VmFsID0gY2QwLngwICsgKG54ICsgMC41KSAqIHRyYWNlLmR4O1xuICAgIHZhciB5VmFsID0gY2QwLnkwICsgKG55ICsgMC41KSAqIHRyYWNlLmR5O1xuICAgIHZhciB6TGFiZWwgPSAnWycgKyBjZDAueltueV1bbnhdLnNsaWNlKDAsIHRyYWNlLmNvbG9ybW9kZWwubGVuZ3RoKS5qb2luKCcsICcpICsgJ10nO1xuICAgIHJldHVybiBbTGliLmV4dGVuZEZsYXQocG9pbnREYXRhLCB7XG4gICAgICAgIGluZGV4OiBbbnksIG54XSxcbiAgICAgICAgeDA6IHhhLmMycChjZDAueDAgKyBueCAqIHRyYWNlLmR4KSxcbiAgICAgICAgeDE6IHhhLmMycChjZDAueDAgKyAobnggKyAxKSAqIHRyYWNlLmR4KSxcbiAgICAgICAgeTA6IHB5LFxuICAgICAgICB5MTogcHksXG4gICAgICAgIGNvbG9yOiBjLFxuICAgICAgICB4VmFsOiB4VmFsLFxuICAgICAgICB4TGFiZWxWYWw6IHhWYWwsXG4gICAgICAgIHlWYWw6IHlWYWwsXG4gICAgICAgIHlMYWJlbFZhbDogeVZhbCxcbiAgICAgICAgekxhYmVsVmFsOiB6TGFiZWwsXG4gICAgICAgIHRleHQ6IHRleHQsXG4gICAgICAgIGhvdmVydGVtcGxhdGVMYWJlbHM6IHtcbiAgICAgICAgICAgICd6TGFiZWwnOiB6TGFiZWwsXG4gICAgICAgICAgICAnY29sb3JMYWJlbCc6IGNvbG9yc3RyaW5nLFxuICAgICAgICAgICAgJ2NvbG9yWzBdTGFiZWwnOiBjWzBdICsgc1swXSxcbiAgICAgICAgICAgICdjb2xvclsxXUxhYmVsJzogY1sxXSArIHNbMV0sXG4gICAgICAgICAgICAnY29sb3JbMl1MYWJlbCc6IGNbMl0gKyBzWzJdLFxuICAgICAgICAgICAgJ2NvbG9yWzNdTGFiZWwnOiBjWzNdICsgc1szXVxuICAgICAgICB9XG4gICAgfSldO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJyksXG4gICAgZXZlbnREYXRhOiByZXF1aXJlKCcuL2V2ZW50X2RhdGEnKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ2ltYWdlJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuJyksXG4gICAgY2F0ZWdvcmllczogWydjYXJ0ZXNpYW4nLCAnc3ZnJywgJzJkTWFwJywgJ25vU29ydGluZ0J5VmFsdWUnXSxcbiAgICBhbmltYXRhYmxlOiBmYWxzZSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGlzcGxheSBhbiBpbWFnZSwgaS5lLiBkYXRhIG9uIGEgMkQgcmVndWxhciByYXN0ZXIuJyxcbiAgICAgICAgICAgICdCeSBkZWZhdWx0LCB3aGVuIGFuIGltYWdlIGlzIGRpc3BsYXllZCBpbiBhIHN1YnBsb3QsJyxcbiAgICAgICAgICAgICdpdHMgeSBheGlzIHdpbGwgYmUgcmV2ZXJzZWQgKGllLiBgYXV0b3JhbmdlOiBcXCdyZXZlcnNlZFxcJ2ApLCcsXG4gICAgICAgICAgICAnY29uc3RyYWluZWQgdG8gdGhlIGRvbWFpbiAoaWUuIGBjb25zdHJhaW46IFxcJ2RvbWFpblxcJ2ApJyxcbiAgICAgICAgICAgICdhbmQgaXQgd2lsbCBoYXZlIHRoZSBzYW1lIHNjYWxlIGFzIGl0cyB4IGF4aXMgKGllLiBgc2NhbGVhbmNob3I6IFxcJ3hcXCxgKScsXG4gICAgICAgICAgICAnaW4gb3JkZXIgZm9yIHBpeGVscyB0byBiZSByZW5kZXJlZCBhcyBzcXVhcmVzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHhtbG5zTmFtZXNwYWNlcyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy94bWxuc19uYW1lc3BhY2VzJyk7XG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwbG90KGdkLCBwbG90aW5mbywgY2RpbWFnZSwgaW1hZ2VMYXllcikge1xuICAgIHZhciB4YSA9IHBsb3RpbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHBsb3RpbmZvLnlheGlzO1xuXG4gICAgTGliLm1ha2VUcmFjZUdyb3VwcyhpbWFnZUxheWVyLCBjZGltYWdlLCAnaW0nKS5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgIHZhciBwbG90R3JvdXAgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICAgICAgdmFyIHRyYWNlID0gY2QwLnRyYWNlO1xuXG4gICAgICAgIHZhciB6ID0gY2QwLno7XG4gICAgICAgIHZhciB4MCA9IGNkMC54MDtcbiAgICAgICAgdmFyIHkwID0gY2QwLnkwO1xuICAgICAgICB2YXIgdyA9IGNkMC53O1xuICAgICAgICB2YXIgaCA9IGNkMC5oO1xuICAgICAgICB2YXIgZHggPSB0cmFjZS5keDtcbiAgICAgICAgdmFyIGR5ID0gdHJhY2UuZHk7XG5cbiAgICAgICAgdmFyIGxlZnQsIHJpZ2h0LCB0ZW1wLCB0b3AsIGJvdHRvbSwgaTtcbiAgICAgICAgLy8gaW4gY2FzZSBvZiBsb2cgb2YgYSBuZWdhdGl2ZVxuICAgICAgICBpID0gMDtcbiAgICAgICAgd2hpbGUobGVmdCA9PT0gdW5kZWZpbmVkICYmIGkgPCB3KSB7XG4gICAgICAgICAgICBsZWZ0ID0geGEuYzJwKHgwICsgaSAqIGR4KTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBpID0gdztcbiAgICAgICAgd2hpbGUocmlnaHQgPT09IHVuZGVmaW5lZCAmJiBpID4gMCkge1xuICAgICAgICAgICAgcmlnaHQgPSB4YS5jMnAoeDAgKyBpICogZHgpO1xuICAgICAgICAgICAgaS0tO1xuICAgICAgICB9XG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSh0b3AgPT09IHVuZGVmaW5lZCAmJiBpIDwgaCkge1xuICAgICAgICAgICAgdG9wID0geWEuYzJwKHkwICsgaSAqIGR5KTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBpID0gaDtcbiAgICAgICAgd2hpbGUoYm90dG9tID09PSB1bmRlZmluZWQgJiYgaSA+IDApIHtcbiAgICAgICAgICAgIGJvdHRvbSA9IHlhLmMycCh5MCArIGkgKiBkeSk7XG4gICAgICAgICAgICBpLS07XG4gICAgICAgIH1cblxuICAgICAgICBpZihyaWdodCA8IGxlZnQpIHtcbiAgICAgICAgICAgIHRlbXAgPSByaWdodDtcbiAgICAgICAgICAgIHJpZ2h0ID0gbGVmdDtcbiAgICAgICAgICAgIGxlZnQgPSB0ZW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYm90dG9tIDwgdG9wKSB7XG4gICAgICAgICAgICB0ZW1wID0gdG9wO1xuICAgICAgICAgICAgdG9wID0gYm90dG9tO1xuICAgICAgICAgICAgYm90dG9tID0gdGVtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJlZHVjZSBpbWFnZSBzaXplIHdoZW4gem9vbWVkIGluIHRvIHNhdmUgbWVtb3J5XG4gICAgICAgIHZhciBleHRyYSA9IDAuNTsgLy8gaGFsZiB0aGUgYXhpcyBzaXplXG4gICAgICAgIGxlZnQgPSBNYXRoLm1heCgtZXh0cmEgKiB4YS5fbGVuZ3RoLCBsZWZ0KTtcbiAgICAgICAgcmlnaHQgPSBNYXRoLm1pbigoMSArIGV4dHJhKSAqIHhhLl9sZW5ndGgsIHJpZ2h0KTtcbiAgICAgICAgdG9wID0gTWF0aC5tYXgoLWV4dHJhICogeWEuX2xlbmd0aCwgdG9wKTtcbiAgICAgICAgYm90dG9tID0gTWF0aC5taW4oKDEgKyBleHRyYSkgKiB5YS5fbGVuZ3RoLCBib3R0b20pO1xuICAgICAgICB2YXIgaW1hZ2VXaWR0aCA9IE1hdGgucm91bmQocmlnaHQgLSBsZWZ0KTtcbiAgICAgICAgdmFyIGltYWdlSGVpZ2h0ID0gTWF0aC5yb3VuZChib3R0b20gLSB0b3ApO1xuXG4gICAgICAgIC8vIGlmIGltYWdlIGlzIGVudGlyZWx5IG9mZi1zY3JlZW4sIGRvbid0IGV2ZW4gZHJhdyBpdFxuICAgICAgICB2YXIgaXNPZmZTY3JlZW4gPSAoaW1hZ2VXaWR0aCA8PSAwIHx8IGltYWdlSGVpZ2h0IDw9IDApO1xuICAgICAgICBpZihpc09mZlNjcmVlbikge1xuICAgICAgICAgICAgdmFyIG5vSW1hZ2UgPSBwbG90R3JvdXAuc2VsZWN0QWxsKCdpbWFnZScpLmRhdGEoW10pO1xuICAgICAgICAgICAgbm9JbWFnZS5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBEcmF3IGVhY2ggcGl4ZWxcbiAgICAgICAgdmFyIGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBjYW52YXMud2lkdGggPSBpbWFnZVdpZHRoO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2VIZWlnaHQ7XG4gICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdmFyIGlweCA9IGZ1bmN0aW9uKGkpIHtyZXR1cm4gTGliLmNvbnN0cmFpbihNYXRoLnJvdW5kKHhhLmMycCh4MCArIGkgKiBkeCkgLSBsZWZ0KSwgMCwgaW1hZ2VXaWR0aCk7fTtcbiAgICAgICAgdmFyIGpweCA9IGZ1bmN0aW9uKGopIHtyZXR1cm4gTGliLmNvbnN0cmFpbihNYXRoLnJvdW5kKHlhLmMycCh5MCArIGogKiBkeSkgLSB0b3ApLCAwLCBpbWFnZUhlaWdodCk7fTtcblxuICAgICAgICB2YXIgZm10ID0gY29uc3RhbnRzLmNvbG9ybW9kZWxbdHJhY2UuY29sb3Jtb2RlbF0uZm10O1xuICAgICAgICB2YXIgYztcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2QwLnc7IGkrKykge1xuICAgICAgICAgICAgdmFyIGlweDAgPSBpcHgoaSk7IHZhciBpcHgxID0gaXB4KGkgKyAxKTtcbiAgICAgICAgICAgIGlmKGlweDEgPT09IGlweDAgfHwgaXNOYU4oaXB4MSkgfHwgaXNOYU4oaXB4MCkpIGNvbnRpbnVlO1xuICAgICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGNkMC5oOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIganB4MCA9IGpweChqKTsgdmFyIGpweDEgPSBqcHgoaiArIDEpO1xuICAgICAgICAgICAgICAgIGlmKGpweDEgPT09IGpweDAgfHwgaXNOYU4oanB4MSkgfHwgaXNOYU4oanB4MCkgfHwgIXpbal1baV0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGMgPSB0cmFjZS5fc2NhbGVyKHpbal1baV0pO1xuICAgICAgICAgICAgICAgIGlmKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGV4dC5maWxsU3R5bGUgPSB0cmFjZS5jb2xvcm1vZGVsICsgJygnICsgZm10KGMpLmpvaW4oJywnKSArICcpJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBSZXR1cm4gYSB0cmFuc3BhcmVudCBwaXhlbFxuICAgICAgICAgICAgICAgICAgICBjb250ZXh0LmZpbGxTdHlsZSA9ICdyZ2JhKDAsMCwwLDApJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY29udGV4dC5maWxsUmVjdChpcHgwLCBqcHgwLCBpcHgxIC0gaXB4MCwganB4MSAtIGpweDApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGltYWdlMyA9IHBsb3RHcm91cC5zZWxlY3RBbGwoJ2ltYWdlJylcbiAgICAgICAgICAgIC5kYXRhKGNkKTtcblxuICAgICAgICBpbWFnZTMuZW50ZXIoKS5hcHBlbmQoJ3N2ZzppbWFnZScpLmF0dHIoe1xuICAgICAgICAgICAgeG1sbnM6IHhtbG5zTmFtZXNwYWNlcy5zdmcsXG4gICAgICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiAnbm9uZSdcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaW1hZ2UzLmF0dHIoe1xuICAgICAgICAgICAgaGVpZ2h0OiBpbWFnZUhlaWdodCxcbiAgICAgICAgICAgIHdpZHRoOiBpbWFnZVdpZHRoLFxuICAgICAgICAgICAgeDogbGVmdCxcbiAgICAgICAgICAgIHk6IHRvcCxcbiAgICAgICAgICAgICd4bGluazpocmVmJzogY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJylcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0eWxlKGdkKSB7XG4gICAgZDMuc2VsZWN0KGdkKS5zZWxlY3RBbGwoJy5pbSBpbWFnZScpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnRyYWNlLm9wYWNpdHk7XG4gICAgICAgIH0pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=