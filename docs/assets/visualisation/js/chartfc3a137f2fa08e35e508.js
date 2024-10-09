(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_densitymapbox_js"],{

/***/ "./node_modules/plotly.js/lib/densitymapbox.js":
/*!*****************************************************!*\
  !*** ./node_modules/plotly.js/lib/densitymapbox.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/densitymapbox */ "./node_modules/plotly.js/src/traces/densitymapbox/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/densitymapbox/attributes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/densitymapbox/attributes.js ***!
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



var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var scatterMapboxAttrs = __webpack_require__(/*! ../scattermapbox/attributes */ "./node_modules/plotly.js/src/traces/scattermapbox/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

/*
 * - https://docs.mapbox.com/help/tutorials/make-a-heatmap-with-mapbox-gl-js/
 * - https://docs.mapbox.com/mapbox-gl-js/example/heatmap-layer/
 * - https://docs.mapbox.com/mapbox-gl-js/style-spec/#layers-heatmap
 * - https://blog.mapbox.com/introducing-heatmaps-in-mapbox-gl-js-71355ada9e6c
 *
 * Gotchas:
 * - https://github.com/mapbox/mapbox-gl-js/issues/6463
 * - https://github.com/mapbox/mapbox-gl-js/issues/6112
 */

/*
 *
 * In mathematical terms, Mapbox GL heatmaps are a bivariate (2D) kernel density
 * estimation with a Gaussian kernel. It means that each data point has an area
 * of “influence” around it (called a kernel) where the numerical value of
 * influence (which we call density) decreases as you go further from the point.
 * If we sum density values of all points in every pixel of the screen, we get a
 * combined density value which we then map to a heatmap color.
 *
 */

module.exports = extendFlat({
    lon: scatterMapboxAttrs.lon,
    lat: scatterMapboxAttrs.lat,

    z: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the points\' weight.',
            'For example, a value of 10 would be equivalent to having 10 points of weight 1',
            'in the same spot'
        ].join(' ')
    },

    radius: {
        valType: 'number',
        role: 'info',
        editType: 'plot',
        arrayOk: true,
        min: 1,
        dflt: 30,
        description: [
            'Sets the radius of influence of one `lon` / `lat` point in pixels.',
            'Increasing the value makes the densitymapbox trace smoother, but less detailed.'
        ].join(' ')
    },

    below: {
        valType: 'string',
        role: 'info',
        editType: 'plot',
        description: [
            'Determines if the densitymapbox trace will be inserted',
            'before the layer with the specified ID.',
            'By default, densitymapbox traces are placed below the first',
            'layer of type symbol',
            'If set to \'\',',
            'the layer will be inserted above every existing layer.'
        ].join(' ')
    },

    text: scatterMapboxAttrs.text,
    hovertext: scatterMapboxAttrs.hovertext,

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['lon', 'lat', 'z', 'text', 'name']
    }),
    hovertemplate: hovertemplateAttrs(),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
},
    colorScaleAttrs('', {
        cLetter: 'z',
        editTypeOverride: 'calc'
    })
);


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/densitymapbox/calc.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/densitymapbox/calc.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var isArrayOrTypedArray = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").isArrayOrTypedArray;
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");
var _ = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js")._;

module.exports = function calc(gd, trace) {
    var len = trace._length;
    var calcTrace = new Array(len);
    var z = trace.z;
    var hasZ = isArrayOrTypedArray(z) && z.length;

    for(var i = 0; i < len; i++) {
        var cdi = calcTrace[i] = {};

        var lon = trace.lon[i];
        var lat = trace.lat[i];

        cdi.lonlat = isNumeric(lon) && isNumeric(lat) ?
            [+lon, +lat] :
            [BADNUM, BADNUM];

        if(hasZ) {
            var zi = z[i];
            cdi.z = isNumeric(zi) ? zi : BADNUM;
        }
    }

    colorscaleCalc(gd, trace, {
        vals: hasZ ? z : [0, 1],
        containerStr: '',
        cLetter: 'z'
    });

    if(len) {
        calcTrace[0].t = {
            labels: {
                lat: _(gd, 'lat:') + ' ',
                lon: _(gd, 'lon:') + ' '
            }
        };
    }

    return calcTrace;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/densitymapbox/convert.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/densitymapbox/convert.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");

var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;
var makeBlank = __webpack_require__(/*! ../../lib/geojson_utils */ "./node_modules/plotly.js/src/lib/geojson_utils.js").makeBlank;

module.exports = function convert(calcTrace) {
    var trace = calcTrace[0].trace;
    var isVisible = (trace.visible === true && trace._length !== 0);

    var heatmap = {
        layout: {visibility: 'none'},
        paint: {}
    };

    var opts = trace._opts = {
        heatmap: heatmap,
        geojson: makeBlank()
    };

    // early return if not visible or placeholder
    if(!isVisible) return opts;

    var features = [];
    var i;

    var z = trace.z;
    var radius = trace.radius;
    var hasZ = Lib.isArrayOrTypedArray(z) && z.length;
    var hasArrayRadius = Lib.isArrayOrTypedArray(radius);

    for(i = 0; i < calcTrace.length; i++) {
        var cdi = calcTrace[i];
        var lonlat = cdi.lonlat;

        if(lonlat[0] !== BADNUM) {
            var props = {};

            if(hasZ) {
                var zi = cdi.z;
                props.z = zi !== BADNUM ? zi : 0;
            }
            if(hasArrayRadius) {
                props.r = (isNumeric(radius[i]) && radius[i] > 0) ? +radius[i] : 0;
            }

            features.push({
                type: 'Feature',
                geometry: {type: 'Point', coordinates: lonlat},
                properties: props
            });
        }
    }

    var cOpts = Colorscale.extractOpts(trace);
    var scl = cOpts.reversescale ?
        Colorscale.flipScale(cOpts.colorscale) :
        cOpts.colorscale;

    // Add alpha channel to first colorscale step.
    // If not, we would essentially color the entire map.
    // See https://docs.mapbox.com/mapbox-gl-js/example/heatmap-layer/
    var scl01 = scl[0][1];
    var color0 = Color.opacity(scl01) < 1 ? scl01 : Color.addOpacity(scl01, 0);

    var heatmapColor = [
        'interpolate', ['linear'],
        ['heatmap-density'],
        0, color0
    ];
    for(i = 1; i < scl.length; i++) {
        heatmapColor.push(scl[i][0], scl[i][1]);
    }

    // Those "weights" have to be in [0, 1], we can do this either:
    // - as here using a mapbox-gl expression
    // - or, scale the 'z' property in the feature loop
    var zExp = [
        'interpolate', ['linear'],
        ['get', 'z'],
        cOpts.min, 0,
        cOpts.max, 1
    ];

    Lib.extendFlat(opts.heatmap.paint, {
        'heatmap-weight': hasZ ? zExp : 1 / (cOpts.max - cOpts.min),

        'heatmap-color': heatmapColor,

        'heatmap-radius': hasArrayRadius ?
            {type: 'identity', property: 'r'} :
            trace.radius,

        'heatmap-opacity': trace.opacity
    });

    opts.geojson = {type: 'FeatureCollection', features: features};
    opts.heatmap.layout.visibility = 'visible';

    return opts;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/densitymapbox/defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/densitymapbox/defaults.js ***!
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
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/densitymapbox/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var lon = coerce('lon') || [];
    var lat = coerce('lat') || [];

    var len = Math.min(lon.length, lat.length);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    traceOut._length = len;

    coerce('z');
    coerce('radius');
    coerce('below');

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'z'});
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/densitymapbox/event_data.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/densitymapbox/event_data.js ***!
  \***********************************************************************/
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
    out.lon = pt.lon;
    out.lat = pt.lat;
    out.z = pt.z;
    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/densitymapbox/hover.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/densitymapbox/hover.js ***!
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
var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var scatterMapboxHoverPoints = __webpack_require__(/*! ../scattermapbox/hover */ "./node_modules/plotly.js/src/traces/scattermapbox/hover.js");

module.exports = function hoverPoints(pointData, xval, yval) {
    var pts = scatterMapboxHoverPoints(pointData, xval, yval);
    if(!pts) return;

    var newPointData = pts[0];
    var cd = newPointData.cd;
    var trace = cd[0].trace;
    var di = cd[newPointData.index];

    // let Fx.hover pick the color
    delete newPointData.color;

    if('z' in di) {
        var ax = newPointData.subplot.mockAxis;
        newPointData.z = di.z;
        newPointData.zLabel = Axes.tickText(ax, ax.c2l(di.z), 'hover').text;
    }

    newPointData.extraText = getExtraText(trace, di, cd[0].t.labels);

    return [newPointData];
};

function getExtraText(trace, di, labels) {
    if(trace.hovertemplate) return;

    var hoverinfo = di.hi || trace.hoverinfo;
    var parts = hoverinfo.split('+');
    var isAll = parts.indexOf('all') !== -1;
    var hasLon = parts.indexOf('lon') !== -1;
    var hasLat = parts.indexOf('lat') !== -1;
    var lonlat = di.lonlat;
    var text = [];

    function format(v) {
        return v + '\u00B0';
    }

    if(isAll || (hasLon && hasLat)) {
        text.push('(' + format(lonlat[0]) + ', ' + format(lonlat[1]) + ')');
    } else if(hasLon) {
        text.push(labels.lon + format(lonlat[0]));
    } else if(hasLat) {
        text.push(labels.lat + format(lonlat[1]));
    }

    if(isAll || parts.indexOf('text') !== -1) {
        Lib.fillText(di, trace, text);
    }

    return text.join('<br>');
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/densitymapbox/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/densitymapbox/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/densitymapbox/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/densitymapbox/defaults.js"),
    colorbar: __webpack_require__(/*! ../heatmap/colorbar */ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js"),
    formatLabels: __webpack_require__(/*! ../scattermapbox/format_labels */ "./node_modules/plotly.js/src/traces/scattermapbox/format_labels.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/densitymapbox/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/densitymapbox/plot.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/densitymapbox/hover.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/densitymapbox/event_data.js"),

    getBelow: function(trace, subplot) {
        var mapLayers = subplot.getMapLayers();

        // find first layer with `type: 'symbol'`,
        // that is not a plotly layer
        for(var i = 0; i < mapLayers.length; i++) {
            var layer = mapLayers[i];
            var layerId = layer.id;
            if(layer.type === 'symbol' &&
                typeof layerId === 'string' && layerId.indexOf('plotly-') === -1
            ) {
                return layerId;
            }
        }
    },

    moduleType: 'trace',
    name: 'densitymapbox',
    basePlotModule: __webpack_require__(/*! ../../plots/mapbox */ "./node_modules/plotly.js/src/plots/mapbox/index.js"),
    categories: ['mapbox', 'gl', 'showLegend'],
    meta: {
        hr_name: 'density_mapbox',
        description: [
            'Draws a bivariate kernel density estimation with a Gaussian kernel',
            'from `lon` and `lat` coordinates and optional `z` values using a colorscale.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/densitymapbox/plot.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/densitymapbox/plot.js ***!
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



var convert = __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/densitymapbox/convert.js");
var LAYER_PREFIX = __webpack_require__(/*! ../../plots/mapbox/constants */ "./node_modules/plotly.js/src/plots/mapbox/constants.js").traceLayerPrefix;

function DensityMapbox(subplot, uid) {
    this.type = 'densitymapbox';
    this.subplot = subplot;
    this.uid = uid;

    this.sourceId = 'source-' + uid;

    this.layerList = [
        ['heatmap', LAYER_PREFIX + uid + '-heatmap']
    ];

    // previous 'below' value,
    // need this to update it properly
    this.below = null;
}

var proto = DensityMapbox.prototype;

proto.update = function(calcTrace) {
    var subplot = this.subplot;
    var layerList = this.layerList;
    var optsAll = convert(calcTrace);
    var below = subplot.belowLookup['trace-' + this.uid];

    subplot.map
        .getSource(this.sourceId)
        .setData(optsAll.geojson);

    if(below !== this.below) {
        this._removeLayers();
        this._addLayers(optsAll, below);
        this.below = below;
    }

    for(var i = 0; i < layerList.length; i++) {
        var item = layerList[i];
        var k = item[0];
        var id = item[1];
        var opts = optsAll[k];

        subplot.setOptions(id, 'setLayoutProperty', opts.layout);

        if(opts.layout.visibility === 'visible') {
            subplot.setOptions(id, 'setPaintProperty', opts.paint);
        }
    }
};

proto._addLayers = function(optsAll, below) {
    var subplot = this.subplot;
    var layerList = this.layerList;
    var sourceId = this.sourceId;

    for(var i = 0; i < layerList.length; i++) {
        var item = layerList[i];
        var k = item[0];
        var opts = optsAll[k];

        subplot.addLayer({
            type: k,
            id: item[1],
            source: sourceId,
            layout: opts.layout,
            paint: opts.paint
        }, below);
    }
};

proto._removeLayers = function() {
    var map = this.subplot.map;
    var layerList = this.layerList;

    for(var i = layerList.length - 1; i >= 0; i--) {
        map.removeLayer(layerList[i][1]);
    }
};

proto.dispose = function() {
    var map = this.subplot.map;
    this._removeLayers();
    map.removeSource(this.sourceId);
};

module.exports = function createDensityMapbox(subplot, calcTrace) {
    var trace = calcTrace[0].trace;
    var densityMapbox = new DensityMapbox(subplot, trace.uid);
    var sourceId = densityMapbox.sourceId;
    var optsAll = convert(calcTrace);
    var below = densityMapbox.below = subplot.belowLookup['trace-' + trace.uid];

    subplot.map.addSource(sourceId, {
        type: 'geojson',
        data: optsAll.geojson
    });

    densityMapbox._addLayers(optsAll, below);

    return densityMapbox;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvZGVuc2l0eW1hcGJveC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2RlbnNpdHltYXBib3gvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2RlbnNpdHltYXBib3gvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2RlbnNpdHltYXBib3gvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2RlbnNpdHltYXBib3gvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9kZW5zaXR5bWFwYm94L2V2ZW50X2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9kZW5zaXR5bWFwYm94L2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvZGVuc2l0eW1hcGJveC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2RlbnNpdHltYXBib3gvcGxvdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixxSUFBdUQ7Ozs7Ozs7Ozs7OztBQ1Z2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixzQkFBc0IsbUJBQU8sQ0FBQyxnSEFBd0M7QUFDdEUseUJBQXlCLDBJQUE2RDtBQUN0RixnQkFBZ0IsbUJBQU8sQ0FBQyxnRkFBd0I7QUFDaEQseUJBQXlCLG1CQUFPLENBQUMsb0dBQTZCOztBQUU5RCxpQkFBaUIsb0dBQXNDOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBLDRCQUE0QjtBQUM1QjtBQUNBLEtBQUs7QUFDTDtBQUNBLDZCQUE2Qix5QkFBeUIsWUFBWTtBQUNsRSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsZ0JBQWdCLG1CQUFPLENBQUMsOERBQWdCOztBQUV4QywwQkFBMEIscUdBQXdDO0FBQ2xFLGFBQWEsa0hBQTJDOztBQUV4RCxxQkFBcUIsbUJBQU8sQ0FBQyxvR0FBa0M7QUFDL0QsUUFBUSxtRkFBc0I7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLFNBQVM7QUFDM0I7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUN4REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsZ0JBQWdCLG1CQUFPLENBQUMsOERBQWdCOztBQUV4QyxVQUFVLG1CQUFPLENBQUMsNERBQVc7QUFDN0IsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxpQkFBaUIsbUJBQU8sQ0FBQyxnR0FBNkI7O0FBRXRELGFBQWEsa0hBQTJDO0FBQ3hELGdCQUFnQixpSEFBNEM7O0FBRTVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxzQkFBc0I7QUFDcEM7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwyQkFBMkIsbUNBQW1DO0FBQzlEO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxnQkFBZ0I7QUFDOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLGFBQWEsZ0NBQWdDO0FBQzdDOztBQUVBO0FBQ0EsS0FBSzs7QUFFTCxvQkFBb0I7QUFDcEI7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDakhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3Qix5QkFBeUIsbUJBQU8sQ0FBQyw0R0FBc0M7QUFDdkUsaUJBQWlCLG1CQUFPLENBQUMscUZBQWM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLDJEQUEyRCx5QkFBeUI7QUFDcEY7Ozs7Ozs7Ozs7OztBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixXQUFXLG1CQUFPLENBQUMsd0ZBQTRCO0FBQy9DLCtCQUErQixtQkFBTyxDQUFDLDBGQUF3Qjs7QUFFL0Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0EsZ0JBQWdCLG1CQUFPLENBQUMscUZBQWM7QUFDdEMsb0JBQW9CLG1CQUFPLENBQUMsaUZBQVk7QUFDeEMsY0FBYyxtQkFBTyxDQUFDLG9GQUFxQjtBQUMzQyxrQkFBa0IsbUJBQU8sQ0FBQywwR0FBZ0M7QUFDMUQsVUFBVSxtQkFBTyxDQUFDLHlFQUFRO0FBQzFCLFVBQVUsbUJBQU8sQ0FBQyx5RUFBUTtBQUMxQixpQkFBaUIsbUJBQU8sQ0FBQywyRUFBUztBQUNsQyxlQUFlLG1CQUFPLENBQUMscUZBQWM7O0FBRXJDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHNCQUFzQixzQkFBc0I7QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLG9CQUFvQixtQkFBTyxDQUFDLDhFQUFvQjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQy9DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixjQUFjLG1CQUFPLENBQUMsK0VBQVc7QUFDakMsbUJBQW1CLGtJQUF3RDs7QUFFM0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUMsUUFBUTtBQUM3QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBIiwiZmlsZSI6ImNoYXJ0ZmMzYTEzN2YyZmEwOGUzNWU1MDguanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9kZW5zaXR5bWFwYm94Jyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvclNjYWxlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvYXR0cmlidXRlcycpO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgYmFzZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvYXR0cmlidXRlcycpO1xudmFyIHNjYXR0ZXJNYXBib3hBdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXJtYXBib3gvYXR0cmlidXRlcycpO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG4vKlxuICogLSBodHRwczovL2RvY3MubWFwYm94LmNvbS9oZWxwL3R1dG9yaWFscy9tYWtlLWEtaGVhdG1hcC13aXRoLW1hcGJveC1nbC1qcy9cbiAqIC0gaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2V4YW1wbGUvaGVhdG1hcC1sYXllci9cbiAqIC0gaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL3N0eWxlLXNwZWMvI2xheWVycy1oZWF0bWFwXG4gKiAtIGh0dHBzOi8vYmxvZy5tYXBib3guY29tL2ludHJvZHVjaW5nLWhlYXRtYXBzLWluLW1hcGJveC1nbC1qcy03MTM1NWFkYTllNmNcbiAqXG4gKiBHb3RjaGFzOlxuICogLSBodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC1nbC1qcy9pc3N1ZXMvNjQ2M1xuICogLSBodHRwczovL2dpdGh1Yi5jb20vbWFwYm94L21hcGJveC1nbC1qcy9pc3N1ZXMvNjExMlxuICovXG5cbi8qXG4gKlxuICogSW4gbWF0aGVtYXRpY2FsIHRlcm1zLCBNYXBib3ggR0wgaGVhdG1hcHMgYXJlIGEgYml2YXJpYXRlICgyRCkga2VybmVsIGRlbnNpdHlcbiAqIGVzdGltYXRpb24gd2l0aCBhIEdhdXNzaWFuIGtlcm5lbC4gSXQgbWVhbnMgdGhhdCBlYWNoIGRhdGEgcG9pbnQgaGFzIGFuIGFyZWFcbiAqIG9mIOKAnGluZmx1ZW5jZeKAnSBhcm91bmQgaXQgKGNhbGxlZCBhIGtlcm5lbCkgd2hlcmUgdGhlIG51bWVyaWNhbCB2YWx1ZSBvZlxuICogaW5mbHVlbmNlICh3aGljaCB3ZSBjYWxsIGRlbnNpdHkpIGRlY3JlYXNlcyBhcyB5b3UgZ28gZnVydGhlciBmcm9tIHRoZSBwb2ludC5cbiAqIElmIHdlIHN1bSBkZW5zaXR5IHZhbHVlcyBvZiBhbGwgcG9pbnRzIGluIGV2ZXJ5IHBpeGVsIG9mIHRoZSBzY3JlZW4sIHdlIGdldCBhXG4gKiBjb21iaW5lZCBkZW5zaXR5IHZhbHVlIHdoaWNoIHdlIHRoZW4gbWFwIHRvIGEgaGVhdG1hcCBjb2xvci5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBleHRlbmRGbGF0KHtcbiAgICBsb246IHNjYXR0ZXJNYXBib3hBdHRycy5sb24sXG4gICAgbGF0OiBzY2F0dGVyTWFwYm94QXR0cnMubGF0LFxuXG4gICAgejoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgcG9pbnRzXFwnIHdlaWdodC4nLFxuICAgICAgICAgICAgJ0ZvciBleGFtcGxlLCBhIHZhbHVlIG9mIDEwIHdvdWxkIGJlIGVxdWl2YWxlbnQgdG8gaGF2aW5nIDEwIHBvaW50cyBvZiB3ZWlnaHQgMScsXG4gICAgICAgICAgICAnaW4gdGhlIHNhbWUgc3BvdCdcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgcmFkaXVzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgZGZsdDogMzAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgcmFkaXVzIG9mIGluZmx1ZW5jZSBvZiBvbmUgYGxvbmAgLyBgbGF0YCBwb2ludCBpbiBwaXhlbHMuJyxcbiAgICAgICAgICAgICdJbmNyZWFzaW5nIHRoZSB2YWx1ZSBtYWtlcyB0aGUgZGVuc2l0eW1hcGJveCB0cmFjZSBzbW9vdGhlciwgYnV0IGxlc3MgZGV0YWlsZWQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBiZWxvdzoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaWYgdGhlIGRlbnNpdHltYXBib3ggdHJhY2Ugd2lsbCBiZSBpbnNlcnRlZCcsXG4gICAgICAgICAgICAnYmVmb3JlIHRoZSBsYXllciB3aXRoIHRoZSBzcGVjaWZpZWQgSUQuJyxcbiAgICAgICAgICAgICdCeSBkZWZhdWx0LCBkZW5zaXR5bWFwYm94IHRyYWNlcyBhcmUgcGxhY2VkIGJlbG93IHRoZSBmaXJzdCcsXG4gICAgICAgICAgICAnbGF5ZXIgb2YgdHlwZSBzeW1ib2wnLFxuICAgICAgICAgICAgJ0lmIHNldCB0byBcXCdcXCcsJyxcbiAgICAgICAgICAgICd0aGUgbGF5ZXIgd2lsbCBiZSBpbnNlcnRlZCBhYm92ZSBldmVyeSBleGlzdGluZyBsYXllci4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHRleHQ6IHNjYXR0ZXJNYXBib3hBdHRycy50ZXh0LFxuICAgIGhvdmVydGV4dDogc2NhdHRlck1hcGJveEF0dHJzLmhvdmVydGV4dCxcblxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbywge1xuICAgICAgICBmbGFnczogWydsb24nLCAnbGF0JywgJ3onLCAndGV4dCcsICduYW1lJ11cbiAgICB9KSxcbiAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlQXR0cnMoKSxcbiAgICBzaG93bGVnZW5kOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuc2hvd2xlZ2VuZCwge2RmbHQ6IGZhbHNlfSlcbn0sXG4gICAgY29sb3JTY2FsZUF0dHJzKCcnLCB7XG4gICAgICAgIGNMZXR0ZXI6ICd6JyxcbiAgICAgICAgZWRpdFR5cGVPdmVycmlkZTogJ2NhbGMnXG4gICAgfSlcbik7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xuXG52YXIgaXNBcnJheU9yVHlwZWRBcnJheSA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmlzQXJyYXlPclR5cGVkQXJyYXk7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxudmFyIGNvbG9yc2NhbGVDYWxjID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2NhbGMnKTtcbnZhciBfID0gcmVxdWlyZSgnLi4vLi4vbGliJykuXztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBsZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciBjYWxjVHJhY2UgPSBuZXcgQXJyYXkobGVuKTtcbiAgICB2YXIgeiA9IHRyYWNlLno7XG4gICAgdmFyIGhhc1ogPSBpc0FycmF5T3JUeXBlZEFycmF5KHopICYmIHoubGVuZ3RoO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBjZGkgPSBjYWxjVHJhY2VbaV0gPSB7fTtcblxuICAgICAgICB2YXIgbG9uID0gdHJhY2UubG9uW2ldO1xuICAgICAgICB2YXIgbGF0ID0gdHJhY2UubGF0W2ldO1xuXG4gICAgICAgIGNkaS5sb25sYXQgPSBpc051bWVyaWMobG9uKSAmJiBpc051bWVyaWMobGF0KSA/XG4gICAgICAgICAgICBbK2xvbiwgK2xhdF0gOlxuICAgICAgICAgICAgW0JBRE5VTSwgQkFETlVNXTtcblxuICAgICAgICBpZihoYXNaKSB7XG4gICAgICAgICAgICB2YXIgemkgPSB6W2ldO1xuICAgICAgICAgICAgY2RpLnogPSBpc051bWVyaWMoemkpID8gemkgOiBCQUROVU07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2xvcnNjYWxlQ2FsYyhnZCwgdHJhY2UsIHtcbiAgICAgICAgdmFsczogaGFzWiA/IHogOiBbMCwgMV0sXG4gICAgICAgIGNvbnRhaW5lclN0cjogJycsXG4gICAgICAgIGNMZXR0ZXI6ICd6J1xuICAgIH0pO1xuXG4gICAgaWYobGVuKSB7XG4gICAgICAgIGNhbGNUcmFjZVswXS50ID0ge1xuICAgICAgICAgICAgbGFiZWxzOiB7XG4gICAgICAgICAgICAgICAgbGF0OiBfKGdkLCAnbGF0OicpICsgJyAnLFxuICAgICAgICAgICAgICAgIGxvbjogXyhnZCwgJ2xvbjonKSArICcgJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBjYWxjVHJhY2U7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIENvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKTtcblxudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG52YXIgbWFrZUJsYW5rID0gcmVxdWlyZSgnLi4vLi4vbGliL2dlb2pzb25fdXRpbHMnKS5tYWtlQmxhbms7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29udmVydChjYWxjVHJhY2UpIHtcbiAgICB2YXIgdHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG4gICAgdmFyIGlzVmlzaWJsZSA9ICh0cmFjZS52aXNpYmxlID09PSB0cnVlICYmIHRyYWNlLl9sZW5ndGggIT09IDApO1xuXG4gICAgdmFyIGhlYXRtYXAgPSB7XG4gICAgICAgIGxheW91dDoge3Zpc2liaWxpdHk6ICdub25lJ30sXG4gICAgICAgIHBhaW50OiB7fVxuICAgIH07XG5cbiAgICB2YXIgb3B0cyA9IHRyYWNlLl9vcHRzID0ge1xuICAgICAgICBoZWF0bWFwOiBoZWF0bWFwLFxuICAgICAgICBnZW9qc29uOiBtYWtlQmxhbmsoKVxuICAgIH07XG5cbiAgICAvLyBlYXJseSByZXR1cm4gaWYgbm90IHZpc2libGUgb3IgcGxhY2Vob2xkZXJcbiAgICBpZighaXNWaXNpYmxlKSByZXR1cm4gb3B0cztcblxuICAgIHZhciBmZWF0dXJlcyA9IFtdO1xuICAgIHZhciBpO1xuXG4gICAgdmFyIHogPSB0cmFjZS56O1xuICAgIHZhciByYWRpdXMgPSB0cmFjZS5yYWRpdXM7XG4gICAgdmFyIGhhc1ogPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh6KSAmJiB6Lmxlbmd0aDtcbiAgICB2YXIgaGFzQXJyYXlSYWRpdXMgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShyYWRpdXMpO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgY2FsY1RyYWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjZGkgPSBjYWxjVHJhY2VbaV07XG4gICAgICAgIHZhciBsb25sYXQgPSBjZGkubG9ubGF0O1xuXG4gICAgICAgIGlmKGxvbmxhdFswXSAhPT0gQkFETlVNKSB7XG4gICAgICAgICAgICB2YXIgcHJvcHMgPSB7fTtcblxuICAgICAgICAgICAgaWYoaGFzWikge1xuICAgICAgICAgICAgICAgIHZhciB6aSA9IGNkaS56O1xuICAgICAgICAgICAgICAgIHByb3BzLnogPSB6aSAhPT0gQkFETlVNID8gemkgOiAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYoaGFzQXJyYXlSYWRpdXMpIHtcbiAgICAgICAgICAgICAgICBwcm9wcy5yID0gKGlzTnVtZXJpYyhyYWRpdXNbaV0pICYmIHJhZGl1c1tpXSA+IDApID8gK3JhZGl1c1tpXSA6IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZlYXR1cmVzLnB1c2goe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlJyxcbiAgICAgICAgICAgICAgICBnZW9tZXRyeToge3R5cGU6ICdQb2ludCcsIGNvb3JkaW5hdGVzOiBsb25sYXR9LFxuICAgICAgICAgICAgICAgIHByb3BlcnRpZXM6IHByb3BzXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBjT3B0cyA9IENvbG9yc2NhbGUuZXh0cmFjdE9wdHModHJhY2UpO1xuICAgIHZhciBzY2wgPSBjT3B0cy5yZXZlcnNlc2NhbGUgP1xuICAgICAgICBDb2xvcnNjYWxlLmZsaXBTY2FsZShjT3B0cy5jb2xvcnNjYWxlKSA6XG4gICAgICAgIGNPcHRzLmNvbG9yc2NhbGU7XG5cbiAgICAvLyBBZGQgYWxwaGEgY2hhbm5lbCB0byBmaXJzdCBjb2xvcnNjYWxlIHN0ZXAuXG4gICAgLy8gSWYgbm90LCB3ZSB3b3VsZCBlc3NlbnRpYWxseSBjb2xvciB0aGUgZW50aXJlIG1hcC5cbiAgICAvLyBTZWUgaHR0cHM6Ly9kb2NzLm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2V4YW1wbGUvaGVhdG1hcC1sYXllci9cbiAgICB2YXIgc2NsMDEgPSBzY2xbMF1bMV07XG4gICAgdmFyIGNvbG9yMCA9IENvbG9yLm9wYWNpdHkoc2NsMDEpIDwgMSA/IHNjbDAxIDogQ29sb3IuYWRkT3BhY2l0eShzY2wwMSwgMCk7XG5cbiAgICB2YXIgaGVhdG1hcENvbG9yID0gW1xuICAgICAgICAnaW50ZXJwb2xhdGUnLCBbJ2xpbmVhciddLFxuICAgICAgICBbJ2hlYXRtYXAtZGVuc2l0eSddLFxuICAgICAgICAwLCBjb2xvcjBcbiAgICBdO1xuICAgIGZvcihpID0gMTsgaSA8IHNjbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBoZWF0bWFwQ29sb3IucHVzaChzY2xbaV1bMF0sIHNjbFtpXVsxXSk7XG4gICAgfVxuXG4gICAgLy8gVGhvc2UgXCJ3ZWlnaHRzXCIgaGF2ZSB0byBiZSBpbiBbMCwgMV0sIHdlIGNhbiBkbyB0aGlzIGVpdGhlcjpcbiAgICAvLyAtIGFzIGhlcmUgdXNpbmcgYSBtYXBib3gtZ2wgZXhwcmVzc2lvblxuICAgIC8vIC0gb3IsIHNjYWxlIHRoZSAneicgcHJvcGVydHkgaW4gdGhlIGZlYXR1cmUgbG9vcFxuICAgIHZhciB6RXhwID0gW1xuICAgICAgICAnaW50ZXJwb2xhdGUnLCBbJ2xpbmVhciddLFxuICAgICAgICBbJ2dldCcsICd6J10sXG4gICAgICAgIGNPcHRzLm1pbiwgMCxcbiAgICAgICAgY09wdHMubWF4LCAxXG4gICAgXTtcblxuICAgIExpYi5leHRlbmRGbGF0KG9wdHMuaGVhdG1hcC5wYWludCwge1xuICAgICAgICAnaGVhdG1hcC13ZWlnaHQnOiBoYXNaID8gekV4cCA6IDEgLyAoY09wdHMubWF4IC0gY09wdHMubWluKSxcblxuICAgICAgICAnaGVhdG1hcC1jb2xvcic6IGhlYXRtYXBDb2xvcixcblxuICAgICAgICAnaGVhdG1hcC1yYWRpdXMnOiBoYXNBcnJheVJhZGl1cyA/XG4gICAgICAgICAgICB7dHlwZTogJ2lkZW50aXR5JywgcHJvcGVydHk6ICdyJ30gOlxuICAgICAgICAgICAgdHJhY2UucmFkaXVzLFxuXG4gICAgICAgICdoZWF0bWFwLW9wYWNpdHknOiB0cmFjZS5vcGFjaXR5XG4gICAgfSk7XG5cbiAgICBvcHRzLmdlb2pzb24gPSB7dHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJywgZmVhdHVyZXM6IGZlYXR1cmVzfTtcbiAgICBvcHRzLmhlYXRtYXAubGF5b3V0LnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cbiAgICByZXR1cm4gb3B0cztcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBsb24gPSBjb2VyY2UoJ2xvbicpIHx8IFtdO1xuICAgIHZhciBsYXQgPSBjb2VyY2UoJ2xhdCcpIHx8IFtdO1xuXG4gICAgdmFyIGxlbiA9IE1hdGgubWluKGxvbi5sZW5ndGgsIGxhdC5sZW5ndGgpO1xuICAgIGlmKCFsZW4pIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJhY2VPdXQuX2xlbmd0aCA9IGxlbjtcblxuICAgIGNvZXJjZSgneicpO1xuICAgIGNvZXJjZSgncmFkaXVzJyk7XG4gICAgY29lcmNlKCdiZWxvdycpO1xuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICcnLCBjTGV0dGVyOiAneid9KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlbnREYXRhKG91dCwgcHQpIHtcbiAgICBvdXQubG9uID0gcHQubG9uO1xuICAgIG91dC5sYXQgPSBwdC5sYXQ7XG4gICAgb3V0LnogPSBwdC56O1xuICAgIHJldHVybiBvdXQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG52YXIgc2NhdHRlck1hcGJveEhvdmVyUG9pbnRzID0gcmVxdWlyZSgnLi4vc2NhdHRlcm1hcGJveC9ob3ZlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCkge1xuICAgIHZhciBwdHMgPSBzY2F0dGVyTWFwYm94SG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsKTtcbiAgICBpZighcHRzKSByZXR1cm47XG5cbiAgICB2YXIgbmV3UG9pbnREYXRhID0gcHRzWzBdO1xuICAgIHZhciBjZCA9IG5ld1BvaW50RGF0YS5jZDtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgZGkgPSBjZFtuZXdQb2ludERhdGEuaW5kZXhdO1xuXG4gICAgLy8gbGV0IEZ4LmhvdmVyIHBpY2sgdGhlIGNvbG9yXG4gICAgZGVsZXRlIG5ld1BvaW50RGF0YS5jb2xvcjtcblxuICAgIGlmKCd6JyBpbiBkaSkge1xuICAgICAgICB2YXIgYXggPSBuZXdQb2ludERhdGEuc3VicGxvdC5tb2NrQXhpcztcbiAgICAgICAgbmV3UG9pbnREYXRhLnogPSBkaS56O1xuICAgICAgICBuZXdQb2ludERhdGEuekxhYmVsID0gQXhlcy50aWNrVGV4dChheCwgYXguYzJsKGRpLnopLCAnaG92ZXInKS50ZXh0O1xuICAgIH1cblxuICAgIG5ld1BvaW50RGF0YS5leHRyYVRleHQgPSBnZXRFeHRyYVRleHQodHJhY2UsIGRpLCBjZFswXS50LmxhYmVscyk7XG5cbiAgICByZXR1cm4gW25ld1BvaW50RGF0YV07XG59O1xuXG5mdW5jdGlvbiBnZXRFeHRyYVRleHQodHJhY2UsIGRpLCBsYWJlbHMpIHtcbiAgICBpZih0cmFjZS5ob3ZlcnRlbXBsYXRlKSByZXR1cm47XG5cbiAgICB2YXIgaG92ZXJpbmZvID0gZGkuaGkgfHwgdHJhY2UuaG92ZXJpbmZvO1xuICAgIHZhciBwYXJ0cyA9IGhvdmVyaW5mby5zcGxpdCgnKycpO1xuICAgIHZhciBpc0FsbCA9IHBhcnRzLmluZGV4T2YoJ2FsbCcpICE9PSAtMTtcbiAgICB2YXIgaGFzTG9uID0gcGFydHMuaW5kZXhPZignbG9uJykgIT09IC0xO1xuICAgIHZhciBoYXNMYXQgPSBwYXJ0cy5pbmRleE9mKCdsYXQnKSAhPT0gLTE7XG4gICAgdmFyIGxvbmxhdCA9IGRpLmxvbmxhdDtcbiAgICB2YXIgdGV4dCA9IFtdO1xuXG4gICAgZnVuY3Rpb24gZm9ybWF0KHYpIHtcbiAgICAgICAgcmV0dXJuIHYgKyAnXFx1MDBCMCc7XG4gICAgfVxuXG4gICAgaWYoaXNBbGwgfHwgKGhhc0xvbiAmJiBoYXNMYXQpKSB7XG4gICAgICAgIHRleHQucHVzaCgnKCcgKyBmb3JtYXQobG9ubGF0WzBdKSArICcsICcgKyBmb3JtYXQobG9ubGF0WzFdKSArICcpJyk7XG4gICAgfSBlbHNlIGlmKGhhc0xvbikge1xuICAgICAgICB0ZXh0LnB1c2gobGFiZWxzLmxvbiArIGZvcm1hdChsb25sYXRbMF0pKTtcbiAgICB9IGVsc2UgaWYoaGFzTGF0KSB7XG4gICAgICAgIHRleHQucHVzaChsYWJlbHMubGF0ICsgZm9ybWF0KGxvbmxhdFsxXSkpO1xuICAgIH1cblxuICAgIGlmKGlzQWxsIHx8IHBhcnRzLmluZGV4T2YoJ3RleHQnKSAhPT0gLTEpIHtcbiAgICAgICAgTGliLmZpbGxUZXh0KGRpLCB0cmFjZSwgdGV4dCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRleHQuam9pbignPGJyPicpO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhdHRyaWJ1dGVzOiByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIGNvbG9yYmFyOiByZXF1aXJlKCcuLi9oZWF0bWFwL2NvbG9yYmFyJyksXG4gICAgZm9ybWF0TGFiZWxzOiByZXF1aXJlKCcuLi9zY2F0dGVybWFwYm94L2Zvcm1hdF9sYWJlbHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi9ldmVudF9kYXRhJyksXG5cbiAgICBnZXRCZWxvdzogZnVuY3Rpb24odHJhY2UsIHN1YnBsb3QpIHtcbiAgICAgICAgdmFyIG1hcExheWVycyA9IHN1YnBsb3QuZ2V0TWFwTGF5ZXJzKCk7XG5cbiAgICAgICAgLy8gZmluZCBmaXJzdCBsYXllciB3aXRoIGB0eXBlOiAnc3ltYm9sJ2AsXG4gICAgICAgIC8vIHRoYXQgaXMgbm90IGEgcGxvdGx5IGxheWVyXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtYXBMYXllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBsYXllciA9IG1hcExheWVyc1tpXTtcbiAgICAgICAgICAgIHZhciBsYXllcklkID0gbGF5ZXIuaWQ7XG4gICAgICAgICAgICBpZihsYXllci50eXBlID09PSAnc3ltYm9sJyAmJlxuICAgICAgICAgICAgICAgIHR5cGVvZiBsYXllcklkID09PSAnc3RyaW5nJyAmJiBsYXllcklkLmluZGV4T2YoJ3Bsb3RseS0nKSA9PT0gLTFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBsYXllcklkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ2RlbnNpdHltYXBib3gnLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9tYXBib3gnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ21hcGJveCcsICdnbCcsICdzaG93TGVnZW5kJ10sXG4gICAgbWV0YToge1xuICAgICAgICBocl9uYW1lOiAnZGVuc2l0eV9tYXBib3gnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RyYXdzIGEgYml2YXJpYXRlIGtlcm5lbCBkZW5zaXR5IGVzdGltYXRpb24gd2l0aCBhIEdhdXNzaWFuIGtlcm5lbCcsXG4gICAgICAgICAgICAnZnJvbSBgbG9uYCBhbmQgYGxhdGAgY29vcmRpbmF0ZXMgYW5kIG9wdGlvbmFsIGB6YCB2YWx1ZXMgdXNpbmcgYSBjb2xvcnNjYWxlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29udmVydCA9IHJlcXVpcmUoJy4vY29udmVydCcpO1xudmFyIExBWUVSX1BSRUZJWCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL21hcGJveC9jb25zdGFudHMnKS50cmFjZUxheWVyUHJlZml4O1xuXG5mdW5jdGlvbiBEZW5zaXR5TWFwYm94KHN1YnBsb3QsIHVpZCkge1xuICAgIHRoaXMudHlwZSA9ICdkZW5zaXR5bWFwYm94JztcbiAgICB0aGlzLnN1YnBsb3QgPSBzdWJwbG90O1xuICAgIHRoaXMudWlkID0gdWlkO1xuXG4gICAgdGhpcy5zb3VyY2VJZCA9ICdzb3VyY2UtJyArIHVpZDtcblxuICAgIHRoaXMubGF5ZXJMaXN0ID0gW1xuICAgICAgICBbJ2hlYXRtYXAnLCBMQVlFUl9QUkVGSVggKyB1aWQgKyAnLWhlYXRtYXAnXVxuICAgIF07XG5cbiAgICAvLyBwcmV2aW91cyAnYmVsb3cnIHZhbHVlLFxuICAgIC8vIG5lZWQgdGhpcyB0byB1cGRhdGUgaXQgcHJvcGVybHlcbiAgICB0aGlzLmJlbG93ID0gbnVsbDtcbn1cblxudmFyIHByb3RvID0gRGVuc2l0eU1hcGJveC5wcm90b3R5cGU7XG5cbnByb3RvLnVwZGF0ZSA9IGZ1bmN0aW9uKGNhbGNUcmFjZSkge1xuICAgIHZhciBzdWJwbG90ID0gdGhpcy5zdWJwbG90O1xuICAgIHZhciBsYXllckxpc3QgPSB0aGlzLmxheWVyTGlzdDtcbiAgICB2YXIgb3B0c0FsbCA9IGNvbnZlcnQoY2FsY1RyYWNlKTtcbiAgICB2YXIgYmVsb3cgPSBzdWJwbG90LmJlbG93TG9va3VwWyd0cmFjZS0nICsgdGhpcy51aWRdO1xuXG4gICAgc3VicGxvdC5tYXBcbiAgICAgICAgLmdldFNvdXJjZSh0aGlzLnNvdXJjZUlkKVxuICAgICAgICAuc2V0RGF0YShvcHRzQWxsLmdlb2pzb24pO1xuXG4gICAgaWYoYmVsb3cgIT09IHRoaXMuYmVsb3cpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlTGF5ZXJzKCk7XG4gICAgICAgIHRoaXMuX2FkZExheWVycyhvcHRzQWxsLCBiZWxvdyk7XG4gICAgICAgIHRoaXMuYmVsb3cgPSBiZWxvdztcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGF5ZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gbGF5ZXJMaXN0W2ldO1xuICAgICAgICB2YXIgayA9IGl0ZW1bMF07XG4gICAgICAgIHZhciBpZCA9IGl0ZW1bMV07XG4gICAgICAgIHZhciBvcHRzID0gb3B0c0FsbFtrXTtcblxuICAgICAgICBzdWJwbG90LnNldE9wdGlvbnMoaWQsICdzZXRMYXlvdXRQcm9wZXJ0eScsIG9wdHMubGF5b3V0KTtcblxuICAgICAgICBpZihvcHRzLmxheW91dC52aXNpYmlsaXR5ID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgIHN1YnBsb3Quc2V0T3B0aW9ucyhpZCwgJ3NldFBhaW50UHJvcGVydHknLCBvcHRzLnBhaW50KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnByb3RvLl9hZGRMYXllcnMgPSBmdW5jdGlvbihvcHRzQWxsLCBiZWxvdykge1xuICAgIHZhciBzdWJwbG90ID0gdGhpcy5zdWJwbG90O1xuICAgIHZhciBsYXllckxpc3QgPSB0aGlzLmxheWVyTGlzdDtcbiAgICB2YXIgc291cmNlSWQgPSB0aGlzLnNvdXJjZUlkO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxheWVyTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGxheWVyTGlzdFtpXTtcbiAgICAgICAgdmFyIGsgPSBpdGVtWzBdO1xuICAgICAgICB2YXIgb3B0cyA9IG9wdHNBbGxba107XG5cbiAgICAgICAgc3VicGxvdC5hZGRMYXllcih7XG4gICAgICAgICAgICB0eXBlOiBrLFxuICAgICAgICAgICAgaWQ6IGl0ZW1bMV0sXG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZUlkLFxuICAgICAgICAgICAgbGF5b3V0OiBvcHRzLmxheW91dCxcbiAgICAgICAgICAgIHBhaW50OiBvcHRzLnBhaW50XG4gICAgICAgIH0sIGJlbG93KTtcbiAgICB9XG59O1xuXG5wcm90by5fcmVtb3ZlTGF5ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuc3VicGxvdC5tYXA7XG4gICAgdmFyIGxheWVyTGlzdCA9IHRoaXMubGF5ZXJMaXN0O1xuXG4gICAgZm9yKHZhciBpID0gbGF5ZXJMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIG1hcC5yZW1vdmVMYXllcihsYXllckxpc3RbaV1bMV0pO1xuICAgIH1cbn07XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5zdWJwbG90Lm1hcDtcbiAgICB0aGlzLl9yZW1vdmVMYXllcnMoKTtcbiAgICBtYXAucmVtb3ZlU291cmNlKHRoaXMuc291cmNlSWQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVEZW5zaXR5TWFwYm94KHN1YnBsb3QsIGNhbGNUcmFjZSkge1xuICAgIHZhciB0cmFjZSA9IGNhbGNUcmFjZVswXS50cmFjZTtcbiAgICB2YXIgZGVuc2l0eU1hcGJveCA9IG5ldyBEZW5zaXR5TWFwYm94KHN1YnBsb3QsIHRyYWNlLnVpZCk7XG4gICAgdmFyIHNvdXJjZUlkID0gZGVuc2l0eU1hcGJveC5zb3VyY2VJZDtcbiAgICB2YXIgb3B0c0FsbCA9IGNvbnZlcnQoY2FsY1RyYWNlKTtcbiAgICB2YXIgYmVsb3cgPSBkZW5zaXR5TWFwYm94LmJlbG93ID0gc3VicGxvdC5iZWxvd0xvb2t1cFsndHJhY2UtJyArIHRyYWNlLnVpZF07XG5cbiAgICBzdWJwbG90Lm1hcC5hZGRTb3VyY2Uoc291cmNlSWQsIHtcbiAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICBkYXRhOiBvcHRzQWxsLmdlb2pzb25cbiAgICB9KTtcblxuICAgIGRlbnNpdHlNYXBib3guX2FkZExheWVycyhvcHRzQWxsLCBiZWxvdyk7XG5cbiAgICByZXR1cm4gZGVuc2l0eU1hcGJveDtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9