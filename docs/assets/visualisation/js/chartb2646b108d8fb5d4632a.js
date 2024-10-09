(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_choroplethmapbox_js"],{

/***/ "./node_modules/plotly.js/lib/choroplethmapbox.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/lib/choroplethmapbox.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/choroplethmapbox */ "./node_modules/plotly.js/src/traces/choroplethmapbox/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choropleth/attributes.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choropleth/attributes.js ***!
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



var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var scatterGeoAttrs = __webpack_require__(/*! ../scattergeo/attributes */ "./node_modules/plotly.js/src/traces/scattergeo/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var defaultLine = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js").defaultLine;

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var scatterGeoMarkerLineAttrs = scatterGeoAttrs.marker.line;

module.exports = extendFlat({
    locations: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the coordinates via location IDs or names.',
            'See `locationmode` for more info.'
        ].join(' ')
    },
    locationmode: scatterGeoAttrs.locationmode,
    z: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the color values.'
    },
    geojson: extendFlat({}, scatterGeoAttrs.geojson, {
        description: [
            'Sets optional GeoJSON data associated with this trace.',
            'If not given, the features on the base map are used.',

            'It can be set as a valid GeoJSON object or as a URL string.',
            'Note that we only accept GeoJSONs of type *FeatureCollection* or *Feature*',
            'with geometries of type *Polygon* or *MultiPolygon*.'

            // TODO add topojson support with additional 'topojsonobject' attr?
            // https://github.com/topojson/topojson-specification/blob/master/README.md
        ].join(' ')
    }),
    featureidkey: scatterGeoAttrs.featureidkey,

    text: extendFlat({}, scatterGeoAttrs.text, {
        description: 'Sets the text elements associated with each location.'
    }),
    hovertext: extendFlat({}, scatterGeoAttrs.hovertext, {
        description: 'Same as `text`.'
    }),
    marker: {
        line: {
            color: extendFlat({}, scatterGeoMarkerLineAttrs.color, {dflt: defaultLine}),
            width: extendFlat({}, scatterGeoMarkerLineAttrs.width, {dflt: 1}),
            editType: 'calc'
        },
        opacity: {
            valType: 'number',
            arrayOk: true,
            min: 0,
            max: 1,
            dflt: 1,
            role: 'style',
            editType: 'style',
            description: 'Sets the opacity of the locations.'
        },
        editType: 'calc'
    },

    selected: {
        marker: {
            opacity: scatterGeoAttrs.selected.marker.opacity,
            editType: 'plot'
        },
        editType: 'plot'
    },
    unselected: {
        marker: {
            opacity: scatterGeoAttrs.unselected.marker.opacity,
            editType: 'plot'
        },
        editType: 'plot'
    },

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        editType: 'calc',
        flags: ['location', 'z', 'text', 'name']
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

/***/ "./node_modules/plotly.js/src/traces/choropleth/calc.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choropleth/calc.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");
var arraysToCalcdata = __webpack_require__(/*! ../scatter/arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");

function isNonBlankString(v) {
    return v && typeof v === 'string';
}

module.exports = function calc(gd, trace) {
    var len = trace._length;
    var calcTrace = new Array(len);

    var isValidLoc;

    if(trace.geojson) {
        isValidLoc = function(v) { return isNonBlankString(v) || isNumeric(v); };
    } else {
        isValidLoc = isNonBlankString;
    }

    for(var i = 0; i < len; i++) {
        var calcPt = calcTrace[i] = {};
        var loc = trace.locations[i];
        var z = trace.z[i];

        if(isValidLoc(loc) && isNumeric(z)) {
            calcPt.loc = loc;
            calcPt.z = z;
        } else {
            calcPt.loc = null;
            calcPt.z = BADNUM;
        }

        calcPt.index = i;
    }

    arraysToCalcdata(calcTrace, trace);
    colorscaleCalc(gd, trace, {
        vals: trace.z,
        containerStr: '',
        cLetter: 'z'
    });
    calcSelection(calcTrace, trace);

    return calcTrace;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choropleth/event_data.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choropleth/event_data.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function eventData(out, pt, trace, cd, pointNumber) {
    out.location = pt.location;
    out.z = pt.z;

    // include feature properties from input geojson
    var cdi = cd[pointNumber];
    if(cdi.fIn && cdi.fIn.properties) {
        out.properties = cdi.fIn.properties;
    }
    out.ct = cdi.ct;

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choropleth/hover.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choropleth/hover.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/choropleth/attributes.js");
var fillText = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").fillText;

module.exports = function hoverPoints(pointData, xval, yval) {
    var cd = pointData.cd;
    var trace = cd[0].trace;
    var geo = pointData.subplot;

    var pt, i, j, isInside;

    for(i = 0; i < cd.length; i++) {
        pt = cd[i];
        isInside = false;

        if(pt._polygons) {
            for(j = 0; j < pt._polygons.length; j++) {
                if(pt._polygons[j].contains([xval, yval])) {
                    isInside = !isInside;
                }
                // for polygons that cross antimeridian as xval is in [-180, 180]
                if(pt._polygons[j].contains([xval + 360, yval])) {
                    isInside = !isInside;
                }
            }

            if(isInside) break;
        }
    }

    if(!isInside || !pt) return;

    pointData.x0 = pointData.x1 = pointData.xa.c2p(pt.ct);
    pointData.y0 = pointData.y1 = pointData.ya.c2p(pt.ct);

    pointData.index = pt.index;
    pointData.location = pt.loc;
    pointData.z = pt.z;
    pointData.zLabel = Axes.tickText(geo.mockAxis, geo.mockAxis.c2l(pt.z), 'hover').text;
    pointData.hovertemplate = pt.hovertemplate;

    makeHoverInfo(pointData, trace, pt, geo.mockAxis);

    return [pointData];
};

function makeHoverInfo(pointData, trace, pt) {
    if(trace.hovertemplate) return;

    var hoverinfo = pt.hi || trace.hoverinfo;
    var loc = String(pt.loc);

    var parts = (hoverinfo === 'all') ?
        attributes.hoverinfo.flags :
        hoverinfo.split('+');

    var hasName = (parts.indexOf('name') !== -1);
    var hasLocation = (parts.indexOf('location') !== -1);
    var hasZ = (parts.indexOf('z') !== -1);
    var hasText = (parts.indexOf('text') !== -1);
    var hasIdAsNameLabel = !hasName && hasLocation;

    var text = [];

    if(hasIdAsNameLabel) {
        pointData.nameOverride = loc;
    } else {
        if(hasName) pointData.nameOverride = trace.name;
        if(hasLocation) text.push(loc);
    }

    if(hasZ) {
        text.push(pointData.zLabel);
    }
    if(hasText) {
        fillText(pt, trace, text);
    }

    pointData.extraText = text.join('<br>');
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choropleth/select.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choropleth/select.js ***!
  \****************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = function selectPoints(searchInfo, selectionTester) {
    var cd = searchInfo.cd;
    var xa = searchInfo.xaxis;
    var ya = searchInfo.yaxis;
    var selection = [];

    var i, di, ct, x, y;

    if(selectionTester === false) {
        for(i = 0; i < cd.length; i++) {
            cd[i].selected = 0;
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            di = cd[i];
            ct = di.ct;

            if(!ct) continue;

            x = xa.c2p(ct);
            y = ya.c2p(ct);

            if(selectionTester.contains([x, y], null, i, searchInfo)) {
                selection.push({
                    pointNumber: i,
                    lon: ct[0],
                    lat: ct[1]
                });
                di.selected = 1;
            } else {
                di.selected = 0;
            }
        }
    }

    return selection;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choroplethmapbox/attributes.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choroplethmapbox/attributes.js ***!
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



var choroplethAttrs = __webpack_require__(/*! ../choropleth/attributes */ "./node_modules/plotly.js/src/traces/choropleth/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = extendFlat({
    locations: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets which features found in *geojson* to plot using',
            'their feature `id` field.'
        ].join(' ')
    },

    // TODO
    // Maybe start with only one value (that we could name e.g. 'geojson-id'),
    // but eventually:
    // - we could also support for our own dist/topojson/*
    //   .. and locationmode: choroplethAttrs.locationmode,

    z: {
        valType: 'data_array',
        editType: 'calc',
        description: 'Sets the color values.'
    },

    // TODO maybe we could also set a "key" to dig out values out of the
    // GeoJSON feature `properties` fields?

    geojson: {
        valType: 'any',
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the GeoJSON data associated with this trace.',

            'It can be set as a valid GeoJSON object or as a URL string.',
            'Note that we only accept GeoJSONs of type *FeatureCollection* or *Feature*',
            'with geometries of type *Polygon* or *MultiPolygon*.'
        ].join(' ')
    },
    featureidkey: extendFlat({}, choroplethAttrs.featureidkey, {
        description: [
            'Sets the key in GeoJSON features which is used as id to match the items',
            'included in the `locations` array.',
            'Support nested property, for example *properties.name*.'
        ].join(' ')
    }),

    // TODO agree on name / behaviour
    //
    // 'below' is used currently for layout.mapbox.layers,
    // even though it's not very plotly-esque.
    //
    // Note also, that the mapbox-gl style don't all have the same layers,
    // see https://codepen.io/etpinard/pen/ydVMwM for full list
    below: {
        valType: 'string',
        role: 'info',
        editType: 'plot',
        description: [
            'Determines if the choropleth polygons will be inserted',
            'before the layer with the specified ID.',
            'By default, choroplethmapbox traces are placed above the water layers.',
            'If set to \'\',',
            'the layer will be inserted above every existing layer.'
        ].join(' ')
    },

    text: choroplethAttrs.text,
    hovertext: choroplethAttrs.hovertext,

    marker: {
        line: {
            color: extendFlat({}, choroplethAttrs.marker.line.color, {editType: 'plot'}),
            width: extendFlat({}, choroplethAttrs.marker.line.width, {editType: 'plot'}),
            editType: 'calc'
        },
        // TODO maybe having a dflt less than 1, together with `below:''` would be better?
        opacity: extendFlat({}, choroplethAttrs.marker.opacity, {editType: 'plot'}),
        editType: 'calc'
    },

    selected: {
        marker: {
            opacity: extendFlat({}, choroplethAttrs.selected.marker.opacity, {editType: 'plot'}),
            editType: 'plot'
        },
        editType: 'plot'
    },
    unselected: {
        marker: {
            opacity: extendFlat({}, choroplethAttrs.unselected.marker.opacity, {editType: 'plot'}),
            editType: 'plot'
        },
        editType: 'plot'
    },

    hoverinfo: choroplethAttrs.hoverinfo,
    hovertemplate: hovertemplateAttrs({}, {keys: ['properties']}),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false})
},

    colorScaleAttrs('', {
        cLetter: 'z',
        editTypeOverride: 'calc'
    })
);


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choroplethmapbox/convert.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choroplethmapbox/convert.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");

var makeBlank = __webpack_require__(/*! ../../lib/geojson_utils */ "./node_modules/plotly.js/src/lib/geojson_utils.js").makeBlank;
var geoUtils = __webpack_require__(/*! ../../lib/geo_location_utils */ "./node_modules/plotly.js/src/lib/geo_location_utils.js");

/* N.B.
 *
 * We fetch the GeoJSON files "ourselves" (during
 * mapbox.prototype.fetchMapData) where they are stored in a global object
 * named `PlotlyGeoAssets` (same as for topojson files in `geo` subplots).
 *
 * Mapbox does allow using URLs as geojson sources, but does NOT allow filtering
 * features by feature `id` that are not numbers (more info in:
 * https://github.com/mapbox/mapbox-gl-js/issues/8088).
 */

function convert(calcTrace) {
    var trace = calcTrace[0].trace;
    var isVisible = trace.visible === true && trace._length !== 0;

    var fill = {
        layout: {visibility: 'none'},
        paint: {}
    };

    var line = {
        layout: {visibility: 'none'},
        paint: {}
    };

    var opts = trace._opts = {
        fill: fill,
        line: line,
        geojson: makeBlank()
    };

    if(!isVisible) return opts;

    var features = geoUtils.extractTraceFeature(calcTrace);

    if(!features) return opts;

    var sclFunc = Colorscale.makeColorScaleFuncFromTrace(trace);
    var marker = trace.marker;
    var markerLine = marker.line || {};

    var opacityFn;
    if(Lib.isArrayOrTypedArray(marker.opacity)) {
        opacityFn = function(d) {
            var mo = d.mo;
            return isNumeric(mo) ? +Lib.constrain(mo, 0, 1) : 0;
        };
    }

    var lineColorFn;
    if(Lib.isArrayOrTypedArray(markerLine.color)) {
        lineColorFn = function(d) { return d.mlc; };
    }

    var lineWidthFn;
    if(Lib.isArrayOrTypedArray(markerLine.width)) {
        lineWidthFn = function(d) { return d.mlw; };
    }

    for(var i = 0; i < calcTrace.length; i++) {
        var cdi = calcTrace[i];
        var fOut = cdi.fOut;

        if(fOut) {
            var props = fOut.properties;
            props.fc = sclFunc(cdi.z);
            if(opacityFn) props.mo = opacityFn(cdi);
            if(lineColorFn) props.mlc = lineColorFn(cdi);
            if(lineWidthFn) props.mlw = lineWidthFn(cdi);
            cdi.ct = props.ct;
            cdi._polygons = geoUtils.feature2polygons(fOut);
        }
    }

    var opacitySetting = opacityFn ?
        {type: 'identity', property: 'mo'} :
        marker.opacity;

    Lib.extendFlat(fill.paint, {
        'fill-color': {type: 'identity', property: 'fc'},
        'fill-opacity': opacitySetting
    });

    Lib.extendFlat(line.paint, {
        'line-color': lineColorFn ?
            {type: 'identity', property: 'mlc'} :
            markerLine.color,
        'line-width': lineWidthFn ?
            {type: 'identity', property: 'mlw'} :
            markerLine.width,
        'line-opacity': opacitySetting
    });

    fill.layout.visibility = 'visible';
    line.layout.visibility = 'visible';

    opts.geojson = {type: 'FeatureCollection', features: features};

    convertOnSelect(calcTrace);

    return opts;
}

function convertOnSelect(calcTrace) {
    var trace = calcTrace[0].trace;
    var opts = trace._opts;
    var opacitySetting;

    if(trace.selectedpoints) {
        var fns = Drawing.makeSelectedPointStyleFns(trace);

        for(var i = 0; i < calcTrace.length; i++) {
            var cdi = calcTrace[i];
            if(cdi.fOut) {
                cdi.fOut.properties.mo2 = fns.selectedOpacityFn(cdi);
            }
        }

        opacitySetting = {type: 'identity', property: 'mo2'};
    } else {
        opacitySetting = Lib.isArrayOrTypedArray(trace.marker.opacity) ?
            {type: 'identity', property: 'mo'} :
            trace.marker.opacity;
    }

    Lib.extendFlat(opts.fill.paint, {'fill-opacity': opacitySetting});
    Lib.extendFlat(opts.line.paint, {'line-opacity': opacitySetting});

    return opts;
}

module.exports = {
    convert: convert,
    convertOnSelect: convertOnSelect
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choroplethmapbox/defaults.js":
/*!************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choroplethmapbox/defaults.js ***!
  \************************************************************************/
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
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/choroplethmapbox/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var locations = coerce('locations');
    var z = coerce('z');
    var geojson = coerce('geojson');

    if(!Lib.isArrayOrTypedArray(locations) || !locations.length ||
        !Lib.isArrayOrTypedArray(z) || !z.length ||
        !((typeof geojson === 'string' && geojson !== '') || Lib.isPlainObject(geojson))
    ) {
        traceOut.visible = false;
        return;
    }

    coerce('featureidkey');

    traceOut._length = Math.min(locations.length, z.length);

    coerce('below');

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');

    var mlw = coerce('marker.line.width');
    if(mlw) coerce('marker.line.color');
    coerce('marker.opacity');

    colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: '', cLetter: 'z'});

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choroplethmapbox/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choroplethmapbox/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/choroplethmapbox/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/choroplethmapbox/defaults.js"),
    colorbar: __webpack_require__(/*! ../heatmap/colorbar */ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js"),
    calc: __webpack_require__(/*! ../choropleth/calc */ "./node_modules/plotly.js/src/traces/choropleth/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/choroplethmapbox/plot.js"),
    hoverPoints: __webpack_require__(/*! ../choropleth/hover */ "./node_modules/plotly.js/src/traces/choropleth/hover.js"),
    eventData: __webpack_require__(/*! ../choropleth/event_data */ "./node_modules/plotly.js/src/traces/choropleth/event_data.js"),
    selectPoints: __webpack_require__(/*! ../choropleth/select */ "./node_modules/plotly.js/src/traces/choropleth/select.js"),

    styleOnSelect: function(_, cd) {
        if(cd) {
            var trace = cd[0].trace;
            trace._glTrace.updateOnSelect(cd);
        }
    },

    getBelow: function(trace, subplot) {
        var mapLayers = subplot.getMapLayers();

        // find layer just above top-most "water" layer
        // that is not a plotly layer
        for(var i = mapLayers.length - 2; i >= 0; i--) {
            var layerId = mapLayers[i].id;

            if(typeof layerId === 'string' &&
                layerId.indexOf('water') === 0
             ) {
                for(var j = i + 1; j < mapLayers.length; j++) {
                    layerId = mapLayers[j].id;

                    if(typeof layerId === 'string' &&
                        layerId.indexOf('plotly-') === -1
                    ) {
                        return layerId;
                    }
                }
            }
        }
    },

    moduleType: 'trace',
    name: 'choroplethmapbox',
    basePlotModule: __webpack_require__(/*! ../../plots/mapbox */ "./node_modules/plotly.js/src/plots/mapbox/index.js"),
    categories: ['mapbox', 'gl', 'noOpacity', 'showLegend'],
    meta: {
        hr_name: 'choropleth_mapbox',
        description: [
            'GeoJSON features to be filled are set in `geojson`',
            'The data that describes the choropleth value-to-color mapping',
            'is set in `locations` and `z`.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choroplethmapbox/plot.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choroplethmapbox/plot.js ***!
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



var convert = __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/choroplethmapbox/convert.js").convert;
var convertOnSelect = __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/choroplethmapbox/convert.js").convertOnSelect;
var LAYER_PREFIX = __webpack_require__(/*! ../../plots/mapbox/constants */ "./node_modules/plotly.js/src/plots/mapbox/constants.js").traceLayerPrefix;

function ChoroplethMapbox(subplot, uid) {
    this.type = 'choroplethmapbox';
    this.subplot = subplot;
    this.uid = uid;

    // N.B. fill and line layers share same source
    this.sourceId = 'source-' + uid;

    this.layerList = [
        ['fill', LAYER_PREFIX + uid + '-fill'],
        ['line', LAYER_PREFIX + uid + '-line']
    ];

    // previous 'below' value,
    // need this to update it properly
    this.below = null;
}

var proto = ChoroplethMapbox.prototype;

proto.update = function(calcTrace) {
    this._update(convert(calcTrace));
};

proto.updateOnSelect = function(calcTrace) {
    this._update(convertOnSelect(calcTrace));
};

proto._update = function(optsAll) {
    var subplot = this.subplot;
    var layerList = this.layerList;
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

module.exports = function createChoroplethMapbox(subplot, calcTrace) {
    var trace = calcTrace[0].trace;
    var choroplethMapbox = new ChoroplethMapbox(subplot, trace.uid);
    var sourceId = choroplethMapbox.sourceId;
    var optsAll = convert(calcTrace);
    var below = choroplethMapbox.below = subplot.belowLookup['trace-' + trace.uid];

    subplot.map.addSource(sourceId, {
        type: 'geojson',
        data: optsAll.geojson
    });

    choroplethMapbox._addLayers(optsAll, below);

    // link ref for quick update during selections
    calcTrace[0].trace._glTrace = choroplethMapbox;

    return choroplethMapbox;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/colorbar.js ***!
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



module.exports = {
    min: 'zmin',
    max: 'zmax'
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvY2hvcm9wbGV0aG1hcGJveC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGgvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGgvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGgvZXZlbnRfZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGgvaG92ZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jaG9yb3BsZXRoL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGhtYXBib3gvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGhtYXBib3gvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGhtYXBib3gvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jaG9yb3BsZXRobWFwYm94L2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2hvcm9wbGV0aG1hcGJveC9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGVhdG1hcC9jb2xvcmJhci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYiwySUFBMEQ7Ozs7Ozs7Ozs7OztBQ1YxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYix5QkFBeUIsMElBQTZEO0FBQ3RGLHNCQUFzQixtQkFBTyxDQUFDLDhGQUEwQjtBQUN4RCxzQkFBc0IsbUJBQU8sQ0FBQyxnSEFBd0M7QUFDdEUsZ0JBQWdCLG1CQUFPLENBQUMsZ0ZBQXdCO0FBQ2hELGtCQUFrQix1SUFBd0Q7O0FBRTFFLGlCQUFpQixvR0FBc0M7O0FBRXZEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCwwQkFBMEI7QUFDMUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUEsdUJBQXVCO0FBQ3ZCO0FBQ0EsS0FBSztBQUNMLDRCQUE0QjtBQUM1QjtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsZ0NBQWdDLG9DQUFvQyxrQkFBa0I7QUFDdEYsZ0NBQWdDLG9DQUFvQyxRQUFRO0FBQzVFO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLOztBQUVMLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0Es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QUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFDQUFxQyxRQUFRO0FBQzdDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0YjI2NDZiMTA4ZDhmYjVkNDYzMmEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9jaG9yb3BsZXRobWFwYm94Jyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIHNjYXR0ZXJHZW9BdHRycyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXJnZW8vYXR0cmlidXRlcycpO1xudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG52YXIgYmFzZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvYXR0cmlidXRlcycpO1xudmFyIGRlZmF1bHRMaW5lID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvci9hdHRyaWJ1dGVzJykuZGVmYXVsdExpbmU7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG5cbnZhciBzY2F0dGVyR2VvTWFya2VyTGluZUF0dHJzID0gc2NhdHRlckdlb0F0dHJzLm1hcmtlci5saW5lO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZEZsYXQoe1xuICAgIGxvY2F0aW9uczoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgY29vcmRpbmF0ZXMgdmlhIGxvY2F0aW9uIElEcyBvciBuYW1lcy4nLFxuICAgICAgICAgICAgJ1NlZSBgbG9jYXRpb25tb2RlYCBmb3IgbW9yZSBpbmZvLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGxvY2F0aW9ubW9kZTogc2NhdHRlckdlb0F0dHJzLmxvY2F0aW9ubW9kZSxcbiAgICB6OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBjb2xvciB2YWx1ZXMuJ1xuICAgIH0sXG4gICAgZ2VvanNvbjogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckdlb0F0dHJzLmdlb2pzb24sIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIG9wdGlvbmFsIEdlb0pTT04gZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyB0cmFjZS4nLFxuICAgICAgICAgICAgJ0lmIG5vdCBnaXZlbiwgdGhlIGZlYXR1cmVzIG9uIHRoZSBiYXNlIG1hcCBhcmUgdXNlZC4nLFxuXG4gICAgICAgICAgICAnSXQgY2FuIGJlIHNldCBhcyBhIHZhbGlkIEdlb0pTT04gb2JqZWN0IG9yIGFzIGEgVVJMIHN0cmluZy4nLFxuICAgICAgICAgICAgJ05vdGUgdGhhdCB3ZSBvbmx5IGFjY2VwdCBHZW9KU09OcyBvZiB0eXBlICpGZWF0dXJlQ29sbGVjdGlvbiogb3IgKkZlYXR1cmUqJyxcbiAgICAgICAgICAgICd3aXRoIGdlb21ldHJpZXMgb2YgdHlwZSAqUG9seWdvbiogb3IgKk11bHRpUG9seWdvbiouJ1xuXG4gICAgICAgICAgICAvLyBUT0RPIGFkZCB0b3BvanNvbiBzdXBwb3J0IHdpdGggYWRkaXRpb25hbCAndG9wb2pzb25vYmplY3QnIGF0dHI/XG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdG9wb2pzb24vdG9wb2pzb24tc3BlY2lmaWNhdGlvbi9ibG9iL21hc3Rlci9SRUFETUUubWRcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcbiAgICBmZWF0dXJlaWRrZXk6IHNjYXR0ZXJHZW9BdHRycy5mZWF0dXJlaWRrZXksXG5cbiAgICB0ZXh0OiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyR2VvQXR0cnMudGV4dCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggbG9jYXRpb24uJ1xuICAgIH0pLFxuICAgIGhvdmVydGV4dDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckdlb0F0dHJzLmhvdmVydGV4dCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NhbWUgYXMgYHRleHRgLidcbiAgICB9KSxcbiAgICBtYXJrZXI6IHtcbiAgICAgICAgbGluZToge1xuICAgICAgICAgICAgY29sb3I6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJHZW9NYXJrZXJMaW5lQXR0cnMuY29sb3IsIHtkZmx0OiBkZWZhdWx0TGluZX0pLFxuICAgICAgICAgICAgd2lkdGg6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJHZW9NYXJrZXJMaW5lQXR0cnMud2lkdGgsIHtkZmx0OiAxfSksXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgICAgIH0sXG4gICAgICAgIG9wYWNpdHk6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIG1heDogMSxcbiAgICAgICAgICAgIGRmbHQ6IDEsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIG9wYWNpdHkgb2YgdGhlIGxvY2F0aW9ucy4nXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICB9LFxuXG4gICAgc2VsZWN0ZWQ6IHtcbiAgICAgICAgbWFya2VyOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiBzY2F0dGVyR2VvQXR0cnMuc2VsZWN0ZWQubWFya2VyLm9wYWNpdHksXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICB9LFxuICAgIHVuc2VsZWN0ZWQ6IHtcbiAgICAgICAgbWFya2VyOiB7XG4gICAgICAgICAgICBvcGFjaXR5OiBzY2F0dGVyR2VvQXR0cnMudW5zZWxlY3RlZC5tYXJrZXIub3BhY2l0eSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgIH0sXG5cbiAgICBob3ZlcmluZm86IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5ob3ZlcmluZm8sIHtcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZmxhZ3M6IFsnbG9jYXRpb24nLCAneicsICd0ZXh0JywgJ25hbWUnXVxuICAgIH0pLFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycygpLFxuICAgIHNob3dsZWdlbmQ6IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5zaG93bGVnZW5kLCB7ZGZsdDogZmFsc2V9KVxufSxcblxuICAgIGNvbG9yU2NhbGVBdHRycygnJywge1xuICAgICAgICBjTGV0dGVyOiAneicsXG4gICAgICAgIGVkaXRUeXBlT3ZlcnJpZGU6ICdjYWxjJ1xuICAgIH0pXG4pO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcbnZhciBCQUROVU0gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvbnVtZXJpY2FsJykuQkFETlVNO1xuXG52YXIgY29sb3JzY2FsZUNhbGMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvY2FsYycpO1xudmFyIGFycmF5c1RvQ2FsY2RhdGEgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2FycmF5c190b19jYWxjZGF0YScpO1xudmFyIGNhbGNTZWxlY3Rpb24gPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NhbGNfc2VsZWN0aW9uJyk7XG5cbmZ1bmN0aW9uIGlzTm9uQmxhbmtTdHJpbmcodikge1xuICAgIHJldHVybiB2ICYmIHR5cGVvZiB2ID09PSAnc3RyaW5nJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBsZW4gPSB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciBjYWxjVHJhY2UgPSBuZXcgQXJyYXkobGVuKTtcblxuICAgIHZhciBpc1ZhbGlkTG9jO1xuXG4gICAgaWYodHJhY2UuZ2VvanNvbikge1xuICAgICAgICBpc1ZhbGlkTG9jID0gZnVuY3Rpb24odikgeyByZXR1cm4gaXNOb25CbGFua1N0cmluZyh2KSB8fCBpc051bWVyaWModik7IH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXNWYWxpZExvYyA9IGlzTm9uQmxhbmtTdHJpbmc7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBjYWxjUHQgPSBjYWxjVHJhY2VbaV0gPSB7fTtcbiAgICAgICAgdmFyIGxvYyA9IHRyYWNlLmxvY2F0aW9uc1tpXTtcbiAgICAgICAgdmFyIHogPSB0cmFjZS56W2ldO1xuXG4gICAgICAgIGlmKGlzVmFsaWRMb2MobG9jKSAmJiBpc051bWVyaWMoeikpIHtcbiAgICAgICAgICAgIGNhbGNQdC5sb2MgPSBsb2M7XG4gICAgICAgICAgICBjYWxjUHQueiA9IHo7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWxjUHQubG9jID0gbnVsbDtcbiAgICAgICAgICAgIGNhbGNQdC56ID0gQkFETlVNO1xuICAgICAgICB9XG5cbiAgICAgICAgY2FsY1B0LmluZGV4ID0gaTtcbiAgICB9XG5cbiAgICBhcnJheXNUb0NhbGNkYXRhKGNhbGNUcmFjZSwgdHJhY2UpO1xuICAgIGNvbG9yc2NhbGVDYWxjKGdkLCB0cmFjZSwge1xuICAgICAgICB2YWxzOiB0cmFjZS56LFxuICAgICAgICBjb250YWluZXJTdHI6ICcnLFxuICAgICAgICBjTGV0dGVyOiAneidcbiAgICB9KTtcbiAgICBjYWxjU2VsZWN0aW9uKGNhbGNUcmFjZSwgdHJhY2UpO1xuXG4gICAgcmV0dXJuIGNhbGNUcmFjZTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlbnREYXRhKG91dCwgcHQsIHRyYWNlLCBjZCwgcG9pbnROdW1iZXIpIHtcbiAgICBvdXQubG9jYXRpb24gPSBwdC5sb2NhdGlvbjtcbiAgICBvdXQueiA9IHB0Lno7XG5cbiAgICAvLyBpbmNsdWRlIGZlYXR1cmUgcHJvcGVydGllcyBmcm9tIGlucHV0IGdlb2pzb25cbiAgICB2YXIgY2RpID0gY2RbcG9pbnROdW1iZXJdO1xuICAgIGlmKGNkaS5mSW4gJiYgY2RpLmZJbi5wcm9wZXJ0aWVzKSB7XG4gICAgICAgIG91dC5wcm9wZXJ0aWVzID0gY2RpLmZJbi5wcm9wZXJ0aWVzO1xuICAgIH1cbiAgICBvdXQuY3QgPSBjZGkuY3Q7XG5cbiAgICByZXR1cm4gb3V0O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcbnZhciBmaWxsVGV4dCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmZpbGxUZXh0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCkge1xuICAgIHZhciBjZCA9IHBvaW50RGF0YS5jZDtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgZ2VvID0gcG9pbnREYXRhLnN1YnBsb3Q7XG5cbiAgICB2YXIgcHQsIGksIGosIGlzSW5zaWRlO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHQgPSBjZFtpXTtcbiAgICAgICAgaXNJbnNpZGUgPSBmYWxzZTtcblxuICAgICAgICBpZihwdC5fcG9seWdvbnMpIHtcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IHB0Ll9wb2x5Z29ucy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGlmKHB0Ll9wb2x5Z29uc1tqXS5jb250YWlucyhbeHZhbCwgeXZhbF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzSW5zaWRlID0gIWlzSW5zaWRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvLyBmb3IgcG9seWdvbnMgdGhhdCBjcm9zcyBhbnRpbWVyaWRpYW4gYXMgeHZhbCBpcyBpbiBbLTE4MCwgMTgwXVxuICAgICAgICAgICAgICAgIGlmKHB0Ll9wb2x5Z29uc1tqXS5jb250YWlucyhbeHZhbCArIDM2MCwgeXZhbF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIGlzSW5zaWRlID0gIWlzSW5zaWRlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoaXNJbnNpZGUpIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIWlzSW5zaWRlIHx8ICFwdCkgcmV0dXJuO1xuXG4gICAgcG9pbnREYXRhLngwID0gcG9pbnREYXRhLngxID0gcG9pbnREYXRhLnhhLmMycChwdC5jdCk7XG4gICAgcG9pbnREYXRhLnkwID0gcG9pbnREYXRhLnkxID0gcG9pbnREYXRhLnlhLmMycChwdC5jdCk7XG5cbiAgICBwb2ludERhdGEuaW5kZXggPSBwdC5pbmRleDtcbiAgICBwb2ludERhdGEubG9jYXRpb24gPSBwdC5sb2M7XG4gICAgcG9pbnREYXRhLnogPSBwdC56O1xuICAgIHBvaW50RGF0YS56TGFiZWwgPSBBeGVzLnRpY2tUZXh0KGdlby5tb2NrQXhpcywgZ2VvLm1vY2tBeGlzLmMybChwdC56KSwgJ2hvdmVyJykudGV4dDtcbiAgICBwb2ludERhdGEuaG92ZXJ0ZW1wbGF0ZSA9IHB0LmhvdmVydGVtcGxhdGU7XG5cbiAgICBtYWtlSG92ZXJJbmZvKHBvaW50RGF0YSwgdHJhY2UsIHB0LCBnZW8ubW9ja0F4aXMpO1xuXG4gICAgcmV0dXJuIFtwb2ludERhdGFdO1xufTtcblxuZnVuY3Rpb24gbWFrZUhvdmVySW5mbyhwb2ludERhdGEsIHRyYWNlLCBwdCkge1xuICAgIGlmKHRyYWNlLmhvdmVydGVtcGxhdGUpIHJldHVybjtcblxuICAgIHZhciBob3ZlcmluZm8gPSBwdC5oaSB8fCB0cmFjZS5ob3ZlcmluZm87XG4gICAgdmFyIGxvYyA9IFN0cmluZyhwdC5sb2MpO1xuXG4gICAgdmFyIHBhcnRzID0gKGhvdmVyaW5mbyA9PT0gJ2FsbCcpID9cbiAgICAgICAgYXR0cmlidXRlcy5ob3ZlcmluZm8uZmxhZ3MgOlxuICAgICAgICBob3ZlcmluZm8uc3BsaXQoJysnKTtcblxuICAgIHZhciBoYXNOYW1lID0gKHBhcnRzLmluZGV4T2YoJ25hbWUnKSAhPT0gLTEpO1xuICAgIHZhciBoYXNMb2NhdGlvbiA9IChwYXJ0cy5pbmRleE9mKCdsb2NhdGlvbicpICE9PSAtMSk7XG4gICAgdmFyIGhhc1ogPSAocGFydHMuaW5kZXhPZigneicpICE9PSAtMSk7XG4gICAgdmFyIGhhc1RleHQgPSAocGFydHMuaW5kZXhPZigndGV4dCcpICE9PSAtMSk7XG4gICAgdmFyIGhhc0lkQXNOYW1lTGFiZWwgPSAhaGFzTmFtZSAmJiBoYXNMb2NhdGlvbjtcblxuICAgIHZhciB0ZXh0ID0gW107XG5cbiAgICBpZihoYXNJZEFzTmFtZUxhYmVsKSB7XG4gICAgICAgIHBvaW50RGF0YS5uYW1lT3ZlcnJpZGUgPSBsb2M7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYoaGFzTmFtZSkgcG9pbnREYXRhLm5hbWVPdmVycmlkZSA9IHRyYWNlLm5hbWU7XG4gICAgICAgIGlmKGhhc0xvY2F0aW9uKSB0ZXh0LnB1c2gobG9jKTtcbiAgICB9XG5cbiAgICBpZihoYXNaKSB7XG4gICAgICAgIHRleHQucHVzaChwb2ludERhdGEuekxhYmVsKTtcbiAgICB9XG4gICAgaWYoaGFzVGV4dCkge1xuICAgICAgICBmaWxsVGV4dChwdCwgdHJhY2UsIHRleHQpO1xuICAgIH1cblxuICAgIHBvaW50RGF0YS5leHRyYVRleHQgPSB0ZXh0LmpvaW4oJzxicj4nKTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWxlY3RQb2ludHMoc2VhcmNoSW5mbywgc2VsZWN0aW9uVGVzdGVyKSB7XG4gICAgdmFyIGNkID0gc2VhcmNoSW5mby5jZDtcbiAgICB2YXIgeGEgPSBzZWFyY2hJbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHNlYXJjaEluZm8ueWF4aXM7XG4gICAgdmFyIHNlbGVjdGlvbiA9IFtdO1xuXG4gICAgdmFyIGksIGRpLCBjdCwgeCwgeTtcblxuICAgIGlmKHNlbGVjdGlvblRlc3RlciA9PT0gZmFsc2UpIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGNkW2ldLnNlbGVjdGVkID0gMDtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkaSA9IGNkW2ldO1xuICAgICAgICAgICAgY3QgPSBkaS5jdDtcblxuICAgICAgICAgICAgaWYoIWN0KSBjb250aW51ZTtcblxuICAgICAgICAgICAgeCA9IHhhLmMycChjdCk7XG4gICAgICAgICAgICB5ID0geWEuYzJwKGN0KTtcblxuICAgICAgICAgICAgaWYoc2VsZWN0aW9uVGVzdGVyLmNvbnRhaW5zKFt4LCB5XSwgbnVsbCwgaSwgc2VhcmNoSW5mbykpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24ucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIHBvaW50TnVtYmVyOiBpLFxuICAgICAgICAgICAgICAgICAgICBsb246IGN0WzBdLFxuICAgICAgICAgICAgICAgICAgICBsYXQ6IGN0WzFdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGkuc2VsZWN0ZWQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaS5zZWxlY3RlZCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNob3JvcGxldGhBdHRycyA9IHJlcXVpcmUoJy4uL2Nob3JvcGxldGgvYXR0cmlidXRlcycpO1xudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG52YXIgaG92ZXJ0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLmhvdmVydGVtcGxhdGVBdHRycztcbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGV4dGVuZEZsYXQoe1xuICAgIGxvY2F0aW9uczoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB3aGljaCBmZWF0dXJlcyBmb3VuZCBpbiAqZ2VvanNvbiogdG8gcGxvdCB1c2luZycsXG4gICAgICAgICAgICAndGhlaXIgZmVhdHVyZSBgaWRgIGZpZWxkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgLy8gVE9ET1xuICAgIC8vIE1heWJlIHN0YXJ0IHdpdGggb25seSBvbmUgdmFsdWUgKHRoYXQgd2UgY291bGQgbmFtZSBlLmcuICdnZW9qc29uLWlkJyksXG4gICAgLy8gYnV0IGV2ZW50dWFsbHk6XG4gICAgLy8gLSB3ZSBjb3VsZCBhbHNvIHN1cHBvcnQgZm9yIG91ciBvd24gZGlzdC90b3BvanNvbi8qXG4gICAgLy8gICAuLiBhbmQgbG9jYXRpb25tb2RlOiBjaG9yb3BsZXRoQXR0cnMubG9jYXRpb25tb2RlLFxuXG4gICAgejoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29sb3IgdmFsdWVzLidcbiAgICB9LFxuXG4gICAgLy8gVE9ETyBtYXliZSB3ZSBjb3VsZCBhbHNvIHNldCBhIFwia2V5XCIgdG8gZGlnIG91dCB2YWx1ZXMgb3V0IG9mIHRoZVxuICAgIC8vIEdlb0pTT04gZmVhdHVyZSBgcHJvcGVydGllc2AgZmllbGRzP1xuXG4gICAgZ2VvanNvbjoge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIEdlb0pTT04gZGF0YSBhc3NvY2lhdGVkIHdpdGggdGhpcyB0cmFjZS4nLFxuXG4gICAgICAgICAgICAnSXQgY2FuIGJlIHNldCBhcyBhIHZhbGlkIEdlb0pTT04gb2JqZWN0IG9yIGFzIGEgVVJMIHN0cmluZy4nLFxuICAgICAgICAgICAgJ05vdGUgdGhhdCB3ZSBvbmx5IGFjY2VwdCBHZW9KU09OcyBvZiB0eXBlICpGZWF0dXJlQ29sbGVjdGlvbiogb3IgKkZlYXR1cmUqJyxcbiAgICAgICAgICAgICd3aXRoIGdlb21ldHJpZXMgb2YgdHlwZSAqUG9seWdvbiogb3IgKk11bHRpUG9seWdvbiouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgZmVhdHVyZWlka2V5OiBleHRlbmRGbGF0KHt9LCBjaG9yb3BsZXRoQXR0cnMuZmVhdHVyZWlka2V5LCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUga2V5IGluIEdlb0pTT04gZmVhdHVyZXMgd2hpY2ggaXMgdXNlZCBhcyBpZCB0byBtYXRjaCB0aGUgaXRlbXMnLFxuICAgICAgICAgICAgJ2luY2x1ZGVkIGluIHRoZSBgbG9jYXRpb25zYCBhcnJheS4nLFxuICAgICAgICAgICAgJ1N1cHBvcnQgbmVzdGVkIHByb3BlcnR5LCBmb3IgZXhhbXBsZSAqcHJvcGVydGllcy5uYW1lKi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG5cbiAgICAvLyBUT0RPIGFncmVlIG9uIG5hbWUgLyBiZWhhdmlvdXJcbiAgICAvL1xuICAgIC8vICdiZWxvdycgaXMgdXNlZCBjdXJyZW50bHkgZm9yIGxheW91dC5tYXBib3gubGF5ZXJzLFxuICAgIC8vIGV2ZW4gdGhvdWdoIGl0J3Mgbm90IHZlcnkgcGxvdGx5LWVzcXVlLlxuICAgIC8vXG4gICAgLy8gTm90ZSBhbHNvLCB0aGF0IHRoZSBtYXBib3gtZ2wgc3R5bGUgZG9uJ3QgYWxsIGhhdmUgdGhlIHNhbWUgbGF5ZXJzLFxuICAgIC8vIHNlZSBodHRwczovL2NvZGVwZW4uaW8vZXRwaW5hcmQvcGVuL3lkVk13TSBmb3IgZnVsbCBsaXN0XG4gICAgYmVsb3c6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIGlmIHRoZSBjaG9yb3BsZXRoIHBvbHlnb25zIHdpbGwgYmUgaW5zZXJ0ZWQnLFxuICAgICAgICAgICAgJ2JlZm9yZSB0aGUgbGF5ZXIgd2l0aCB0aGUgc3BlY2lmaWVkIElELicsXG4gICAgICAgICAgICAnQnkgZGVmYXVsdCwgY2hvcm9wbGV0aG1hcGJveCB0cmFjZXMgYXJlIHBsYWNlZCBhYm92ZSB0aGUgd2F0ZXIgbGF5ZXJzLicsXG4gICAgICAgICAgICAnSWYgc2V0IHRvIFxcJ1xcJywnLFxuICAgICAgICAgICAgJ3RoZSBsYXllciB3aWxsIGJlIGluc2VydGVkIGFib3ZlIGV2ZXJ5IGV4aXN0aW5nIGxheWVyLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgdGV4dDogY2hvcm9wbGV0aEF0dHJzLnRleHQsXG4gICAgaG92ZXJ0ZXh0OiBjaG9yb3BsZXRoQXR0cnMuaG92ZXJ0ZXh0LFxuXG4gICAgbWFya2VyOiB7XG4gICAgICAgIGxpbmU6IHtcbiAgICAgICAgICAgIGNvbG9yOiBleHRlbmRGbGF0KHt9LCBjaG9yb3BsZXRoQXR0cnMubWFya2VyLmxpbmUuY29sb3IsIHtlZGl0VHlwZTogJ3Bsb3QnfSksXG4gICAgICAgICAgICB3aWR0aDogZXh0ZW5kRmxhdCh7fSwgY2hvcm9wbGV0aEF0dHJzLm1hcmtlci5saW5lLndpZHRoLCB7ZWRpdFR5cGU6ICdwbG90J30pLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgICAgICB9LFxuICAgICAgICAvLyBUT0RPIG1heWJlIGhhdmluZyBhIGRmbHQgbGVzcyB0aGFuIDEsIHRvZ2V0aGVyIHdpdGggYGJlbG93OicnYCB3b3VsZCBiZSBiZXR0ZXI/XG4gICAgICAgIG9wYWNpdHk6IGV4dGVuZEZsYXQoe30sIGNob3JvcGxldGhBdHRycy5tYXJrZXIub3BhY2l0eSwge2VkaXRUeXBlOiAncGxvdCd9KSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sXG5cbiAgICBzZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGV4dGVuZEZsYXQoe30sIGNob3JvcGxldGhBdHRycy5zZWxlY3RlZC5tYXJrZXIub3BhY2l0eSwge2VkaXRUeXBlOiAncGxvdCd9KSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgIH0sXG4gICAgdW5zZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IGV4dGVuZEZsYXQoe30sIGNob3JvcGxldGhBdHRycy51bnNlbGVjdGVkLm1hcmtlci5vcGFjaXR5LCB7ZWRpdFR5cGU6ICdwbG90J30pLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgfSxcblxuICAgIGhvdmVyaW5mbzogY2hvcm9wbGV0aEF0dHJzLmhvdmVyaW5mbyxcbiAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlQXR0cnMoe30sIHtrZXlzOiBbJ3Byb3BlcnRpZXMnXX0pLFxuICAgIHNob3dsZWdlbmQ6IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5zaG93bGVnZW5kLCB7ZGZsdDogZmFsc2V9KVxufSxcblxuICAgIGNvbG9yU2NhbGVBdHRycygnJywge1xuICAgICAgICBjTGV0dGVyOiAneicsXG4gICAgICAgIGVkaXRUeXBlT3ZlcnJpZGU6ICdjYWxjJ1xuICAgIH0pXG4pO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIENvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG5cbnZhciBtYWtlQmxhbmsgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2VvanNvbl91dGlscycpLm1ha2VCbGFuaztcbnZhciBnZW9VdGlscyA9IHJlcXVpcmUoJy4uLy4uL2xpYi9nZW9fbG9jYXRpb25fdXRpbHMnKTtcblxuLyogTi5CLlxuICpcbiAqIFdlIGZldGNoIHRoZSBHZW9KU09OIGZpbGVzIFwib3Vyc2VsdmVzXCIgKGR1cmluZ1xuICogbWFwYm94LnByb3RvdHlwZS5mZXRjaE1hcERhdGEpIHdoZXJlIHRoZXkgYXJlIHN0b3JlZCBpbiBhIGdsb2JhbCBvYmplY3RcbiAqIG5hbWVkIGBQbG90bHlHZW9Bc3NldHNgIChzYW1lIGFzIGZvciB0b3BvanNvbiBmaWxlcyBpbiBgZ2VvYCBzdWJwbG90cykuXG4gKlxuICogTWFwYm94IGRvZXMgYWxsb3cgdXNpbmcgVVJMcyBhcyBnZW9qc29uIHNvdXJjZXMsIGJ1dCBkb2VzIE5PVCBhbGxvdyBmaWx0ZXJpbmdcbiAqIGZlYXR1cmVzIGJ5IGZlYXR1cmUgYGlkYCB0aGF0IGFyZSBub3QgbnVtYmVycyAobW9yZSBpbmZvIGluOlxuICogaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvaXNzdWVzLzgwODgpLlxuICovXG5cbmZ1bmN0aW9uIGNvbnZlcnQoY2FsY1RyYWNlKSB7XG4gICAgdmFyIHRyYWNlID0gY2FsY1RyYWNlWzBdLnRyYWNlO1xuICAgIHZhciBpc1Zpc2libGUgPSB0cmFjZS52aXNpYmxlID09PSB0cnVlICYmIHRyYWNlLl9sZW5ndGggIT09IDA7XG5cbiAgICB2YXIgZmlsbCA9IHtcbiAgICAgICAgbGF5b3V0OiB7dmlzaWJpbGl0eTogJ25vbmUnfSxcbiAgICAgICAgcGFpbnQ6IHt9XG4gICAgfTtcblxuICAgIHZhciBsaW5lID0ge1xuICAgICAgICBsYXlvdXQ6IHt2aXNpYmlsaXR5OiAnbm9uZSd9LFxuICAgICAgICBwYWludDoge31cbiAgICB9O1xuXG4gICAgdmFyIG9wdHMgPSB0cmFjZS5fb3B0cyA9IHtcbiAgICAgICAgZmlsbDogZmlsbCxcbiAgICAgICAgbGluZTogbGluZSxcbiAgICAgICAgZ2VvanNvbjogbWFrZUJsYW5rKClcbiAgICB9O1xuXG4gICAgaWYoIWlzVmlzaWJsZSkgcmV0dXJuIG9wdHM7XG5cbiAgICB2YXIgZmVhdHVyZXMgPSBnZW9VdGlscy5leHRyYWN0VHJhY2VGZWF0dXJlKGNhbGNUcmFjZSk7XG5cbiAgICBpZighZmVhdHVyZXMpIHJldHVybiBvcHRzO1xuXG4gICAgdmFyIHNjbEZ1bmMgPSBDb2xvcnNjYWxlLm1ha2VDb2xvclNjYWxlRnVuY0Zyb21UcmFjZSh0cmFjZSk7XG4gICAgdmFyIG1hcmtlciA9IHRyYWNlLm1hcmtlcjtcbiAgICB2YXIgbWFya2VyTGluZSA9IG1hcmtlci5saW5lIHx8IHt9O1xuXG4gICAgdmFyIG9wYWNpdHlGbjtcbiAgICBpZihMaWIuaXNBcnJheU9yVHlwZWRBcnJheShtYXJrZXIub3BhY2l0eSkpIHtcbiAgICAgICAgb3BhY2l0eUZuID0gZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIG1vID0gZC5tbztcbiAgICAgICAgICAgIHJldHVybiBpc051bWVyaWMobW8pID8gK0xpYi5jb25zdHJhaW4obW8sIDAsIDEpIDogMDtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICB2YXIgbGluZUNvbG9yRm47XG4gICAgaWYoTGliLmlzQXJyYXlPclR5cGVkQXJyYXkobWFya2VyTGluZS5jb2xvcikpIHtcbiAgICAgICAgbGluZUNvbG9yRm4gPSBmdW5jdGlvbihkKSB7IHJldHVybiBkLm1sYzsgfTtcbiAgICB9XG5cbiAgICB2YXIgbGluZVdpZHRoRm47XG4gICAgaWYoTGliLmlzQXJyYXlPclR5cGVkQXJyYXkobWFya2VyTGluZS53aWR0aCkpIHtcbiAgICAgICAgbGluZVdpZHRoRm4gPSBmdW5jdGlvbihkKSB7IHJldHVybiBkLm1sdzsgfTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2FsY1RyYWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjZGkgPSBjYWxjVHJhY2VbaV07XG4gICAgICAgIHZhciBmT3V0ID0gY2RpLmZPdXQ7XG5cbiAgICAgICAgaWYoZk91dCkge1xuICAgICAgICAgICAgdmFyIHByb3BzID0gZk91dC5wcm9wZXJ0aWVzO1xuICAgICAgICAgICAgcHJvcHMuZmMgPSBzY2xGdW5jKGNkaS56KTtcbiAgICAgICAgICAgIGlmKG9wYWNpdHlGbikgcHJvcHMubW8gPSBvcGFjaXR5Rm4oY2RpKTtcbiAgICAgICAgICAgIGlmKGxpbmVDb2xvckZuKSBwcm9wcy5tbGMgPSBsaW5lQ29sb3JGbihjZGkpO1xuICAgICAgICAgICAgaWYobGluZVdpZHRoRm4pIHByb3BzLm1sdyA9IGxpbmVXaWR0aEZuKGNkaSk7XG4gICAgICAgICAgICBjZGkuY3QgPSBwcm9wcy5jdDtcbiAgICAgICAgICAgIGNkaS5fcG9seWdvbnMgPSBnZW9VdGlscy5mZWF0dXJlMnBvbHlnb25zKGZPdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG9wYWNpdHlTZXR0aW5nID0gb3BhY2l0eUZuID9cbiAgICAgICAge3R5cGU6ICdpZGVudGl0eScsIHByb3BlcnR5OiAnbW8nfSA6XG4gICAgICAgIG1hcmtlci5vcGFjaXR5O1xuXG4gICAgTGliLmV4dGVuZEZsYXQoZmlsbC5wYWludCwge1xuICAgICAgICAnZmlsbC1jb2xvcic6IHt0eXBlOiAnaWRlbnRpdHknLCBwcm9wZXJ0eTogJ2ZjJ30sXG4gICAgICAgICdmaWxsLW9wYWNpdHknOiBvcGFjaXR5U2V0dGluZ1xuICAgIH0pO1xuXG4gICAgTGliLmV4dGVuZEZsYXQobGluZS5wYWludCwge1xuICAgICAgICAnbGluZS1jb2xvcic6IGxpbmVDb2xvckZuID9cbiAgICAgICAgICAgIHt0eXBlOiAnaWRlbnRpdHknLCBwcm9wZXJ0eTogJ21sYyd9IDpcbiAgICAgICAgICAgIG1hcmtlckxpbmUuY29sb3IsXG4gICAgICAgICdsaW5lLXdpZHRoJzogbGluZVdpZHRoRm4gP1xuICAgICAgICAgICAge3R5cGU6ICdpZGVudGl0eScsIHByb3BlcnR5OiAnbWx3J30gOlxuICAgICAgICAgICAgbWFya2VyTGluZS53aWR0aCxcbiAgICAgICAgJ2xpbmUtb3BhY2l0eSc6IG9wYWNpdHlTZXR0aW5nXG4gICAgfSk7XG5cbiAgICBmaWxsLmxheW91dC52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgIGxpbmUubGF5b3V0LnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cbiAgICBvcHRzLmdlb2pzb24gPSB7dHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJywgZmVhdHVyZXM6IGZlYXR1cmVzfTtcblxuICAgIGNvbnZlcnRPblNlbGVjdChjYWxjVHJhY2UpO1xuXG4gICAgcmV0dXJuIG9wdHM7XG59XG5cbmZ1bmN0aW9uIGNvbnZlcnRPblNlbGVjdChjYWxjVHJhY2UpIHtcbiAgICB2YXIgdHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG4gICAgdmFyIG9wdHMgPSB0cmFjZS5fb3B0cztcbiAgICB2YXIgb3BhY2l0eVNldHRpbmc7XG5cbiAgICBpZih0cmFjZS5zZWxlY3RlZHBvaW50cykge1xuICAgICAgICB2YXIgZm5zID0gRHJhd2luZy5tYWtlU2VsZWN0ZWRQb2ludFN0eWxlRm5zKHRyYWNlKTtcblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgY2FsY1RyYWNlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgY2RpID0gY2FsY1RyYWNlW2ldO1xuICAgICAgICAgICAgaWYoY2RpLmZPdXQpIHtcbiAgICAgICAgICAgICAgICBjZGkuZk91dC5wcm9wZXJ0aWVzLm1vMiA9IGZucy5zZWxlY3RlZE9wYWNpdHlGbihjZGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgb3BhY2l0eVNldHRpbmcgPSB7dHlwZTogJ2lkZW50aXR5JywgcHJvcGVydHk6ICdtbzInfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBvcGFjaXR5U2V0dGluZyA9IExpYi5pc0FycmF5T3JUeXBlZEFycmF5KHRyYWNlLm1hcmtlci5vcGFjaXR5KSA/XG4gICAgICAgICAgICB7dHlwZTogJ2lkZW50aXR5JywgcHJvcGVydHk6ICdtbyd9IDpcbiAgICAgICAgICAgIHRyYWNlLm1hcmtlci5vcGFjaXR5O1xuICAgIH1cblxuICAgIExpYi5leHRlbmRGbGF0KG9wdHMuZmlsbC5wYWludCwgeydmaWxsLW9wYWNpdHknOiBvcGFjaXR5U2V0dGluZ30pO1xuICAgIExpYi5leHRlbmRGbGF0KG9wdHMubGluZS5wYWludCwgeydsaW5lLW9wYWNpdHknOiBvcGFjaXR5U2V0dGluZ30pO1xuXG4gICAgcmV0dXJuIG9wdHM7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNvbnZlcnQ6IGNvbnZlcnQsXG4gICAgY29udmVydE9uU2VsZWN0OiBjb252ZXJ0T25TZWxlY3Rcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUvZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBsb2NhdGlvbnMgPSBjb2VyY2UoJ2xvY2F0aW9ucycpO1xuICAgIHZhciB6ID0gY29lcmNlKCd6Jyk7XG4gICAgdmFyIGdlb2pzb24gPSBjb2VyY2UoJ2dlb2pzb24nKTtcblxuICAgIGlmKCFMaWIuaXNBcnJheU9yVHlwZWRBcnJheShsb2NhdGlvbnMpIHx8ICFsb2NhdGlvbnMubGVuZ3RoIHx8XG4gICAgICAgICFMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh6KSB8fCAhei5sZW5ndGggfHxcbiAgICAgICAgISgodHlwZW9mIGdlb2pzb24gPT09ICdzdHJpbmcnICYmIGdlb2pzb24gIT09ICcnKSB8fCBMaWIuaXNQbGFpbk9iamVjdChnZW9qc29uKSlcbiAgICApIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29lcmNlKCdmZWF0dXJlaWRrZXknKTtcblxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBNYXRoLm1pbihsb2NhdGlvbnMubGVuZ3RoLCB6Lmxlbmd0aCk7XG5cbiAgICBjb2VyY2UoJ2JlbG93Jyk7XG5cbiAgICBjb2VyY2UoJ3RleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuXG4gICAgdmFyIG1sdyA9IGNvZXJjZSgnbWFya2VyLmxpbmUud2lkdGgnKTtcbiAgICBpZihtbHcpIGNvZXJjZSgnbWFya2VyLmxpbmUuY29sb3InKTtcbiAgICBjb2VyY2UoJ21hcmtlci5vcGFjaXR5Jyk7XG5cbiAgICBjb2xvcnNjYWxlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlLCB7cHJlZml4OiAnJywgY0xldHRlcjogJ3onfSk7XG5cbiAgICBMaWIuY29lcmNlU2VsZWN0aW9uTWFya2VyT3BhY2l0eSh0cmFjZU91dCwgY29lcmNlKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL2hlYXRtYXAvY29sb3JiYXInKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuLi9jaG9yb3BsZXRoL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi4vY2hvcm9wbGV0aC9ob3ZlcicpLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi4vY2hvcm9wbGV0aC9ldmVudF9kYXRhJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuLi9jaG9yb3BsZXRoL3NlbGVjdCcpLFxuXG4gICAgc3R5bGVPblNlbGVjdDogZnVuY3Rpb24oXywgY2QpIHtcbiAgICAgICAgaWYoY2QpIHtcbiAgICAgICAgICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgICAgICAgICAgdHJhY2UuX2dsVHJhY2UudXBkYXRlT25TZWxlY3QoY2QpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGdldEJlbG93OiBmdW5jdGlvbih0cmFjZSwgc3VicGxvdCkge1xuICAgICAgICB2YXIgbWFwTGF5ZXJzID0gc3VicGxvdC5nZXRNYXBMYXllcnMoKTtcblxuICAgICAgICAvLyBmaW5kIGxheWVyIGp1c3QgYWJvdmUgdG9wLW1vc3QgXCJ3YXRlclwiIGxheWVyXG4gICAgICAgIC8vIHRoYXQgaXMgbm90IGEgcGxvdGx5IGxheWVyXG4gICAgICAgIGZvcih2YXIgaSA9IG1hcExheWVycy5sZW5ndGggLSAyOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgdmFyIGxheWVySWQgPSBtYXBMYXllcnNbaV0uaWQ7XG5cbiAgICAgICAgICAgIGlmKHR5cGVvZiBsYXllcklkID09PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgICAgIGxheWVySWQuaW5kZXhPZignd2F0ZXInKSA9PT0gMFxuICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IGkgKyAxOyBqIDwgbWFwTGF5ZXJzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVySWQgPSBtYXBMYXllcnNbal0uaWQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYodHlwZW9mIGxheWVySWQgPT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBsYXllcklkLmluZGV4T2YoJ3Bsb3RseS0nKSA9PT0gLTFcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbGF5ZXJJZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdjaG9yb3BsZXRobWFwYm94JyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvbWFwYm94JyksXG4gICAgY2F0ZWdvcmllczogWydtYXBib3gnLCAnZ2wnLCAnbm9PcGFjaXR5JywgJ3Nob3dMZWdlbmQnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGhyX25hbWU6ICdjaG9yb3BsZXRoX21hcGJveCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnR2VvSlNPTiBmZWF0dXJlcyB0byBiZSBmaWxsZWQgYXJlIHNldCBpbiBgZ2VvanNvbmAnLFxuICAgICAgICAgICAgJ1RoZSBkYXRhIHRoYXQgZGVzY3JpYmVzIHRoZSBjaG9yb3BsZXRoIHZhbHVlLXRvLWNvbG9yIG1hcHBpbmcnLFxuICAgICAgICAgICAgJ2lzIHNldCBpbiBgbG9jYXRpb25zYCBhbmQgYHpgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29udmVydCA9IHJlcXVpcmUoJy4vY29udmVydCcpLmNvbnZlcnQ7XG52YXIgY29udmVydE9uU2VsZWN0ID0gcmVxdWlyZSgnLi9jb252ZXJ0JykuY29udmVydE9uU2VsZWN0O1xudmFyIExBWUVSX1BSRUZJWCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL21hcGJveC9jb25zdGFudHMnKS50cmFjZUxheWVyUHJlZml4O1xuXG5mdW5jdGlvbiBDaG9yb3BsZXRoTWFwYm94KHN1YnBsb3QsIHVpZCkge1xuICAgIHRoaXMudHlwZSA9ICdjaG9yb3BsZXRobWFwYm94JztcbiAgICB0aGlzLnN1YnBsb3QgPSBzdWJwbG90O1xuICAgIHRoaXMudWlkID0gdWlkO1xuXG4gICAgLy8gTi5CLiBmaWxsIGFuZCBsaW5lIGxheWVycyBzaGFyZSBzYW1lIHNvdXJjZVxuICAgIHRoaXMuc291cmNlSWQgPSAnc291cmNlLScgKyB1aWQ7XG5cbiAgICB0aGlzLmxheWVyTGlzdCA9IFtcbiAgICAgICAgWydmaWxsJywgTEFZRVJfUFJFRklYICsgdWlkICsgJy1maWxsJ10sXG4gICAgICAgIFsnbGluZScsIExBWUVSX1BSRUZJWCArIHVpZCArICctbGluZSddXG4gICAgXTtcblxuICAgIC8vIHByZXZpb3VzICdiZWxvdycgdmFsdWUsXG4gICAgLy8gbmVlZCB0aGlzIHRvIHVwZGF0ZSBpdCBwcm9wZXJseVxuICAgIHRoaXMuYmVsb3cgPSBudWxsO1xufVxuXG52YXIgcHJvdG8gPSBDaG9yb3BsZXRoTWFwYm94LnByb3RvdHlwZTtcblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oY2FsY1RyYWNlKSB7XG4gICAgdGhpcy5fdXBkYXRlKGNvbnZlcnQoY2FsY1RyYWNlKSk7XG59O1xuXG5wcm90by51cGRhdGVPblNlbGVjdCA9IGZ1bmN0aW9uKGNhbGNUcmFjZSkge1xuICAgIHRoaXMuX3VwZGF0ZShjb252ZXJ0T25TZWxlY3QoY2FsY1RyYWNlKSk7XG59O1xuXG5wcm90by5fdXBkYXRlID0gZnVuY3Rpb24ob3B0c0FsbCkge1xuICAgIHZhciBzdWJwbG90ID0gdGhpcy5zdWJwbG90O1xuICAgIHZhciBsYXllckxpc3QgPSB0aGlzLmxheWVyTGlzdDtcbiAgICB2YXIgYmVsb3cgPSBzdWJwbG90LmJlbG93TG9va3VwWyd0cmFjZS0nICsgdGhpcy51aWRdO1xuXG4gICAgc3VicGxvdC5tYXBcbiAgICAgICAgLmdldFNvdXJjZSh0aGlzLnNvdXJjZUlkKVxuICAgICAgICAuc2V0RGF0YShvcHRzQWxsLmdlb2pzb24pO1xuXG4gICAgaWYoYmVsb3cgIT09IHRoaXMuYmVsb3cpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlTGF5ZXJzKCk7XG4gICAgICAgIHRoaXMuX2FkZExheWVycyhvcHRzQWxsLCBiZWxvdyk7XG4gICAgICAgIHRoaXMuYmVsb3cgPSBiZWxvdztcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGF5ZXJMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gbGF5ZXJMaXN0W2ldO1xuICAgICAgICB2YXIgayA9IGl0ZW1bMF07XG4gICAgICAgIHZhciBpZCA9IGl0ZW1bMV07XG4gICAgICAgIHZhciBvcHRzID0gb3B0c0FsbFtrXTtcblxuICAgICAgICBzdWJwbG90LnNldE9wdGlvbnMoaWQsICdzZXRMYXlvdXRQcm9wZXJ0eScsIG9wdHMubGF5b3V0KTtcblxuICAgICAgICBpZihvcHRzLmxheW91dC52aXNpYmlsaXR5ID09PSAndmlzaWJsZScpIHtcbiAgICAgICAgICAgIHN1YnBsb3Quc2V0T3B0aW9ucyhpZCwgJ3NldFBhaW50UHJvcGVydHknLCBvcHRzLnBhaW50KTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbnByb3RvLl9hZGRMYXllcnMgPSBmdW5jdGlvbihvcHRzQWxsLCBiZWxvdykge1xuICAgIHZhciBzdWJwbG90ID0gdGhpcy5zdWJwbG90O1xuICAgIHZhciBsYXllckxpc3QgPSB0aGlzLmxheWVyTGlzdDtcbiAgICB2YXIgc291cmNlSWQgPSB0aGlzLnNvdXJjZUlkO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxheWVyTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgaXRlbSA9IGxheWVyTGlzdFtpXTtcbiAgICAgICAgdmFyIGsgPSBpdGVtWzBdO1xuICAgICAgICB2YXIgb3B0cyA9IG9wdHNBbGxba107XG5cbiAgICAgICAgc3VicGxvdC5hZGRMYXllcih7XG4gICAgICAgICAgICB0eXBlOiBrLFxuICAgICAgICAgICAgaWQ6IGl0ZW1bMV0sXG4gICAgICAgICAgICBzb3VyY2U6IHNvdXJjZUlkLFxuICAgICAgICAgICAgbGF5b3V0OiBvcHRzLmxheW91dCxcbiAgICAgICAgICAgIHBhaW50OiBvcHRzLnBhaW50XG4gICAgICAgIH0sIGJlbG93KTtcbiAgICB9XG59O1xuXG5wcm90by5fcmVtb3ZlTGF5ZXJzID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuc3VicGxvdC5tYXA7XG4gICAgdmFyIGxheWVyTGlzdCA9IHRoaXMubGF5ZXJMaXN0O1xuXG4gICAgZm9yKHZhciBpID0gbGF5ZXJMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIG1hcC5yZW1vdmVMYXllcihsYXllckxpc3RbaV1bMV0pO1xuICAgIH1cbn07XG5cbnByb3RvLmRpc3Bvc2UgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgbWFwID0gdGhpcy5zdWJwbG90Lm1hcDtcbiAgICB0aGlzLl9yZW1vdmVMYXllcnMoKTtcbiAgICBtYXAucmVtb3ZlU291cmNlKHRoaXMuc291cmNlSWQpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjcmVhdGVDaG9yb3BsZXRoTWFwYm94KHN1YnBsb3QsIGNhbGNUcmFjZSkge1xuICAgIHZhciB0cmFjZSA9IGNhbGNUcmFjZVswXS50cmFjZTtcbiAgICB2YXIgY2hvcm9wbGV0aE1hcGJveCA9IG5ldyBDaG9yb3BsZXRoTWFwYm94KHN1YnBsb3QsIHRyYWNlLnVpZCk7XG4gICAgdmFyIHNvdXJjZUlkID0gY2hvcm9wbGV0aE1hcGJveC5zb3VyY2VJZDtcbiAgICB2YXIgb3B0c0FsbCA9IGNvbnZlcnQoY2FsY1RyYWNlKTtcbiAgICB2YXIgYmVsb3cgPSBjaG9yb3BsZXRoTWFwYm94LmJlbG93ID0gc3VicGxvdC5iZWxvd0xvb2t1cFsndHJhY2UtJyArIHRyYWNlLnVpZF07XG5cbiAgICBzdWJwbG90Lm1hcC5hZGRTb3VyY2Uoc291cmNlSWQsIHtcbiAgICAgICAgdHlwZTogJ2dlb2pzb24nLFxuICAgICAgICBkYXRhOiBvcHRzQWxsLmdlb2pzb25cbiAgICB9KTtcblxuICAgIGNob3JvcGxldGhNYXBib3guX2FkZExheWVycyhvcHRzQWxsLCBiZWxvdyk7XG5cbiAgICAvLyBsaW5rIHJlZiBmb3IgcXVpY2sgdXBkYXRlIGR1cmluZyBzZWxlY3Rpb25zXG4gICAgY2FsY1RyYWNlWzBdLnRyYWNlLl9nbFRyYWNlID0gY2hvcm9wbGV0aE1hcGJveDtcblxuICAgIHJldHVybiBjaG9yb3BsZXRoTWFwYm94O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbWluOiAnem1pbicsXG4gICAgbWF4OiAnem1heCdcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9