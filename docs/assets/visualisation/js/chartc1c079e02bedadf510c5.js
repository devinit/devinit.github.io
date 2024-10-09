(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_index-geo_js-node_modules_plotly_js_src_lib_geojson_utils_-5d9384"],{

/***/ "./node_modules/plotly.js/lib/choropleth.js":
/*!**************************************************!*\
  !*** ./node_modules/plotly.js/lib/choropleth.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/choropleth */ "./node_modules/plotly.js/src/traces/choropleth/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/lib/index-geo.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/lib/index-geo.js ***!
  \*************************************************/
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
    __webpack_require__(/*! ./scattergeo */ "./node_modules/plotly.js/lib/scattergeo.js"),
    __webpack_require__(/*! ./choropleth */ "./node_modules/plotly.js/lib/choropleth.js")
]);

module.exports = Plotly;


/***/ }),

/***/ "./node_modules/plotly.js/src/lib/geojson_utils.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/geojson_utils.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var BADNUM = __webpack_require__(/*! ../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

/**
 * Convert calcTrace to GeoJSON 'MultiLineString' coordinate arrays
 *
 * @param {object} calcTrace
 *  gd.calcdata item.
 *  Note that calcTrace[i].lonlat is assumed to be defined
 *
 * @return {array}
 *  return line coords array (or array of arrays)
 *
 */
exports.calcTraceToLineCoords = function(calcTrace) {
    var trace = calcTrace[0].trace;
    var connectgaps = trace.connectgaps;

    var coords = [];
    var lineString = [];

    for(var i = 0; i < calcTrace.length; i++) {
        var calcPt = calcTrace[i];
        var lonlat = calcPt.lonlat;

        if(lonlat[0] !== BADNUM) {
            lineString.push(lonlat);
        } else if(!connectgaps && lineString.length > 0) {
            coords.push(lineString);
            lineString = [];
        }
    }

    if(lineString.length > 0) {
        coords.push(lineString);
    }

    return coords;
};


/**
 * Make line ('LineString' or 'MultiLineString') GeoJSON
 *
 * @param {array} coords
 *  results form calcTraceToLineCoords
 * @return {object} out
 *  GeoJSON object
 *
 */
exports.makeLine = function(coords) {
    if(coords.length === 1) {
        return {
            type: 'LineString',
            coordinates: coords[0]
        };
    } else {
        return {
            type: 'MultiLineString',
            coordinates: coords
        };
    }
};

/**
 * Make polygon ('Polygon' or 'MultiPolygon') GeoJSON
 *
 * @param {array} coords
 *  results form calcTraceToLineCoords
 * @return {object} out
 *  GeoJSON object
 */
exports.makePolygon = function(coords) {
    if(coords.length === 1) {
        return {
            type: 'Polygon',
            coordinates: coords
        };
    } else {
        var _coords = new Array(coords.length);

        for(var i = 0; i < coords.length; i++) {
            _coords[i] = [coords[i]];
        }

        return {
            type: 'MultiPolygon',
            coordinates: _coords
        };
    }
};

/**
 * Make blank GeoJSON
 *
 * @return {object}
 *  Blank GeoJSON object
 *
 */
exports.makeBlank = function() {
    return {
        type: 'Point',
        coordinates: []
    };
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/subplot_defaults.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/subplot_defaults.js ***!
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




var Lib = __webpack_require__(/*! ../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Template = __webpack_require__(/*! ../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");
var handleDomainDefaults = __webpack_require__(/*! ./domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;


/**
 * Find and supply defaults to all subplots of a given type
 * This handles subplots that are contained within one container - so
 * gl3d, geo, ternary... but not 2d axes which have separate x and y axes
 * finds subplots, coerces their `domain` attributes, then calls the
 * given handleDefaults function to fill in everything else.
 *
 * layoutIn: the complete user-supplied input layout
 * layoutOut: the complete finished layout
 * fullData: the finished data array, used only to find subplots
 * opts: {
 *  type: subplot type string
 *  attributes: subplot attributes object
 *  partition: 'x' or 'y', which direction to divide domain space by default
 *      (default 'x', ie side-by-side subplots)
 *      TODO: this option is only here because 3D and geo made opposite
 *      choices in this regard previously and I didn't want to change it.
 *      Instead we should do:
 *      - something consistent
 *      - something more square (4 cuts 2x2, 5/6 cuts 2x3, etc.)
 *      - something that includes all subplot types in one arrangement,
 *        now that we can have them together!
 *  handleDefaults: function of (subplotLayoutIn, subplotLayoutOut, coerce, opts)
 *      this opts object is passed through to handleDefaults, so attach any
 *      additional items needed by this function here as well
 * }
 */
module.exports = function handleSubplotDefaults(layoutIn, layoutOut, fullData, opts) {
    var subplotType = opts.type;
    var subplotAttributes = opts.attributes;
    var handleDefaults = opts.handleDefaults;
    var partition = opts.partition || 'x';

    var ids = layoutOut._subplots[subplotType];
    var idsLength = ids.length;

    var baseId = idsLength && ids[0].replace(/\d+$/, '');

    var subplotLayoutIn, subplotLayoutOut;

    function coerce(attr, dflt) {
        return Lib.coerce(subplotLayoutIn, subplotLayoutOut, subplotAttributes, attr, dflt);
    }

    for(var i = 0; i < idsLength; i++) {
        var id = ids[i];

        // ternary traces get a layout ternary for free!
        if(layoutIn[id]) subplotLayoutIn = layoutIn[id];
        else subplotLayoutIn = layoutIn[id] = {};

        subplotLayoutOut = Template.newContainer(layoutOut, id, baseId);

        // All subplot containers get a `uirevision` inheriting from the base.
        // Currently all subplots containers have some user interaction
        // attributes, but if we ever add one that doesn't, we would need an
        // option to skip this step.
        coerce('uirevision', layoutOut.uirevision);

        var dfltDomains = {};
        dfltDomains[partition] = [i / idsLength, (i + 1) / idsLength];
        handleDomainDefaults(subplotLayoutOut, layoutOut, coerce, dfltDomains);

        opts.id = id;
        handleDefaults(subplotLayoutIn, subplotLayoutOut, coerce, opts);
    }
};


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

/***/ "./node_modules/plotly.js/src/traces/choropleth/defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choropleth/defaults.js ***!
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
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/choropleth/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var locations = coerce('locations');
    var z = coerce('z');

    if(!(locations && locations.length && Lib.isArrayOrTypedArray(z) && z.length)) {
        traceOut.visible = false;
        return;
    }

    traceOut._length = Math.min(locations.length, z.length);

    var geojson = coerce('geojson');

    var locationmodeDflt;
    if((typeof geojson === 'string' && geojson !== '') || Lib.isPlainObject(geojson)) {
        locationmodeDflt = 'geojson-id';
    }

    var locationMode = coerce('locationmode', locationmodeDflt);

    if(locationMode === 'geojson-id') {
        coerce('featureidkey');
    }

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

/***/ "./node_modules/plotly.js/src/traces/choropleth/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choropleth/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/choropleth/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/choropleth/defaults.js"),
    colorbar: __webpack_require__(/*! ../heatmap/colorbar */ "./node_modules/plotly.js/src/traces/heatmap/colorbar.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/choropleth/calc.js"),
    calcGeoJSON: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/choropleth/plot.js").calcGeoJSON,
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/choropleth/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/choropleth/style.js").style,
    styleOnSelect: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/choropleth/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/choropleth/hover.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/choropleth/event_data.js"),
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/choropleth/select.js"),

    moduleType: 'trace',
    name: 'choropleth',
    basePlotModule: __webpack_require__(/*! ../../plots/geo */ "./node_modules/plotly.js/src/plots/geo/index.js"),
    categories: ['geo', 'noOpacity', 'showLegend'],
    meta: {
        description: [
            'The data that describes the choropleth value-to-color mapping',
            'is set in `z`.',
            'The geographic locations corresponding to each value in `z`',
            'are set in `locations`.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/choropleth/plot.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choropleth/plot.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var geoUtils = __webpack_require__(/*! ../../lib/geo_location_utils */ "./node_modules/plotly.js/src/lib/geo_location_utils.js");
var getTopojsonFeatures = __webpack_require__(/*! ../../lib/topojson_utils */ "./node_modules/plotly.js/src/lib/topojson_utils.js").getTopojsonFeatures;
var findExtremes = __webpack_require__(/*! ../../plots/cartesian/autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").findExtremes;

var style = __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/choropleth/style.js").style;

function plot(gd, geo, calcData) {
    var choroplethLayer = geo.layers.backplot.select('.choroplethlayer');

    Lib.makeTraceGroups(choroplethLayer, calcData, 'trace choropleth').each(function(calcTrace) {
        var sel = d3.select(this);

        var paths = sel.selectAll('path.choroplethlocation')
            .data(Lib.identity);

        paths.enter().append('path')
            .classed('choroplethlocation', true);

        paths.exit().remove();

        // call style here within topojson request callback
        style(gd, calcTrace);
    });
}

function calcGeoJSON(calcTrace, fullLayout) {
    var trace = calcTrace[0].trace;
    var geoLayout = fullLayout[trace.geo];
    var geo = geoLayout._subplot;
    var locationmode = trace.locationmode;
    var len = trace._length;

    var features = locationmode === 'geojson-id' ?
        geoUtils.extractTraceFeature(calcTrace) :
        getTopojsonFeatures(trace, geo.topojson);

    var lonArray = [];
    var latArray = [];

    for(var i = 0; i < len; i++) {
        var calcPt = calcTrace[i];
        var feature = locationmode === 'geojson-id' ?
            calcPt.fOut :
            geoUtils.locationToFeature(locationmode, calcPt.loc, features);

        if(feature) {
            calcPt.geojson = feature;
            calcPt.ct = feature.properties.ct;
            calcPt._polygons = geoUtils.feature2polygons(feature);

            var bboxFeature = geoUtils.computeBbox(feature);
            lonArray.push(bboxFeature[0], bboxFeature[2]);
            latArray.push(bboxFeature[1], bboxFeature[3]);
        } else {
            calcPt.geojson = null;
        }
    }

    if(geoLayout.fitbounds === 'geojson' && locationmode === 'geojson-id') {
        var bboxGeojson = geoUtils.computeBbox(geoUtils.getTraceGeojson(trace));
        lonArray = [bboxGeojson[0], bboxGeojson[2]];
        latArray = [bboxGeojson[1], bboxGeojson[3]];
    }

    var opts = {padded: true};
    trace._extremes.lon = findExtremes(geoLayout.lonaxis._ax, lonArray, opts);
    trace._extremes.lat = findExtremes(geoLayout.lataxis._ax, latArray, opts);
}

module.exports = {
    calcGeoJSON: calcGeoJSON,
    plot: plot
};


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

/***/ "./node_modules/plotly.js/src/traces/choropleth/style.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/choropleth/style.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");

function style(gd, calcTrace) {
    if(calcTrace) styleTrace(gd, calcTrace);
}

function styleTrace(gd, calcTrace) {
    var trace = calcTrace[0].trace;
    var s = calcTrace[0].node3;
    var locs = s.selectAll('.choroplethlocation');
    var marker = trace.marker || {};
    var markerLine = marker.line || {};

    var sclFunc = Colorscale.makeColorScaleFuncFromTrace(trace);

    locs.each(function(d) {
        d3.select(this)
            .attr('fill', sclFunc(d.z))
            .call(Color.stroke, d.mlc || markerLine.color)
            .call(Drawing.dashLine, '', d.mlw || markerLine.width || 0)
            .style('opacity', marker.opacity);
    });

    Drawing.selectedPointStyle(locs, trace, gd);
}

function styleOnSelect(gd, calcTrace) {
    var s = calcTrace[0].node3;
    var trace = calcTrace[0].trace;

    if(trace.selectedpoints) {
        Drawing.selectedPointStyle(s.selectAll('.choroplethlocation'), trace, gd);
    } else {
        styleTrace(gd, calcTrace);
    }
}

module.exports = {
    style: style,
    styleOnSelect: styleOnSelect
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

/***/ "./node_modules/plotly.js/src/traces/scattergeo/calc.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/calc.js ***!
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

var calcMarkerColorscale = __webpack_require__(/*! ../scatter/colorscale_calc */ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js");
var arraysToCalcdata = __webpack_require__(/*! ../scatter/arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");

var _ = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js")._;

function isNonBlankString(v) {
    return v && typeof v === 'string';
}

module.exports = function calc(gd, trace) {
    var hasLocationData = Array.isArray(trace.locations);
    var len = hasLocationData ? trace.locations.length : trace._length;
    var calcTrace = new Array(len);

    var isValidLoc;
    if(trace.geojson) {
        isValidLoc = function(v) { return isNonBlankString(v) || isNumeric(v); };
    } else {
        isValidLoc = isNonBlankString;
    }

    for(var i = 0; i < len; i++) {
        var calcPt = calcTrace[i] = {};

        if(hasLocationData) {
            var loc = trace.locations[i];
            calcPt.loc = isValidLoc(loc) ? loc : null;
        } else {
            var lon = trace.lon[i];
            var lat = trace.lat[i];

            if(isNumeric(lon) && isNumeric(lat)) calcPt.lonlat = [+lon, +lat];
            else calcPt.lonlat = [BADNUM, BADNUM];
        }
    }

    arraysToCalcdata(calcTrace, trace);
    calcMarkerColorscale(gd, trace);
    calcSelection(calcTrace, trace);

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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvY2hvcm9wbGV0aC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvaW5kZXgtZ2VvLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9saWIvZ2VvanNvbl91dGlscy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvc3VicGxvdF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGgvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGgvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGgvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jaG9yb3BsZXRoL2V2ZW50X2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9jaG9yb3BsZXRoL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2hvcm9wbGV0aC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGgvcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2Nob3JvcGxldGgvc2VsZWN0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvY2hvcm9wbGV0aC9zdHlsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvY29sb3JiYXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyL3h5X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcmdlby9jYWxjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLCtIQUFvRDs7Ozs7Ozs7Ozs7O0FDVnBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGFBQWEsbUJBQU8sQ0FBQyxvREFBUTs7QUFFN0I7QUFDQSxJQUFJLG1CQUFPLENBQUMsZ0VBQWM7QUFDMUIsSUFBSSxtQkFBTyxDQUFDLGdFQUFjO0FBQzFCOztBQUVBOzs7Ozs7Ozs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLGFBQWEsK0dBQXdDOztBQUVyRDtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBLDZCQUE2QjtBQUM3QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHNCQUFzQjtBQUN4QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw4REFBZ0I7QUFDeEMsYUFBYSxrSEFBMkM7O0FBRXhELDJCQUEyQixtQkFBTyxDQUFDLGtHQUE0QjtBQUMvRCx1QkFBdUIsbUJBQU8sQ0FBQyx3R0FBK0I7QUFDOUQsb0JBQW9CLG1CQUFPLENBQUMsZ0dBQTJCOztBQUV2RCxRQUFRLG1GQUFzQjs7QUFFOUI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxrQ0FBa0MsNENBQTRDO0FBQzlFLEtBQUs7QUFDTDtBQUNBOztBQUVBLGtCQUFrQixTQUFTO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoiY2hhcnRjMWMwNzllMDJiZWRhZGY1MTBjNS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL2Nob3JvcGxldGgnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFBsb3RseSA9IHJlcXVpcmUoJy4vY29yZScpO1xuXG5QbG90bHkucmVnaXN0ZXIoW1xuICAgIHJlcXVpcmUoJy4vc2NhdHRlcmdlbycpLFxuICAgIHJlcXVpcmUoJy4vY2hvcm9wbGV0aCcpXG5dKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQbG90bHk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbi8qKlxuICogQ29udmVydCBjYWxjVHJhY2UgdG8gR2VvSlNPTiAnTXVsdGlMaW5lU3RyaW5nJyBjb29yZGluYXRlIGFycmF5c1xuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjYWxjVHJhY2VcbiAqICBnZC5jYWxjZGF0YSBpdGVtLlxuICogIE5vdGUgdGhhdCBjYWxjVHJhY2VbaV0ubG9ubGF0IGlzIGFzc3VtZWQgdG8gYmUgZGVmaW5lZFxuICpcbiAqIEByZXR1cm4ge2FycmF5fVxuICogIHJldHVybiBsaW5lIGNvb3JkcyBhcnJheSAob3IgYXJyYXkgb2YgYXJyYXlzKVxuICpcbiAqL1xuZXhwb3J0cy5jYWxjVHJhY2VUb0xpbmVDb29yZHMgPSBmdW5jdGlvbihjYWxjVHJhY2UpIHtcbiAgICB2YXIgdHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG4gICAgdmFyIGNvbm5lY3RnYXBzID0gdHJhY2UuY29ubmVjdGdhcHM7XG5cbiAgICB2YXIgY29vcmRzID0gW107XG4gICAgdmFyIGxpbmVTdHJpbmcgPSBbXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjYWxjVHJhY2UubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGNhbGNQdCA9IGNhbGNUcmFjZVtpXTtcbiAgICAgICAgdmFyIGxvbmxhdCA9IGNhbGNQdC5sb25sYXQ7XG5cbiAgICAgICAgaWYobG9ubGF0WzBdICE9PSBCQUROVU0pIHtcbiAgICAgICAgICAgIGxpbmVTdHJpbmcucHVzaChsb25sYXQpO1xuICAgICAgICB9IGVsc2UgaWYoIWNvbm5lY3RnYXBzICYmIGxpbmVTdHJpbmcubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29vcmRzLnB1c2gobGluZVN0cmluZyk7XG4gICAgICAgICAgICBsaW5lU3RyaW5nID0gW107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihsaW5lU3RyaW5nLmxlbmd0aCA+IDApIHtcbiAgICAgICAgY29vcmRzLnB1c2gobGluZVN0cmluZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvb3Jkcztcbn07XG5cblxuLyoqXG4gKiBNYWtlIGxpbmUgKCdMaW5lU3RyaW5nJyBvciAnTXVsdGlMaW5lU3RyaW5nJykgR2VvSlNPTlxuICpcbiAqIEBwYXJhbSB7YXJyYXl9IGNvb3Jkc1xuICogIHJlc3VsdHMgZm9ybSBjYWxjVHJhY2VUb0xpbmVDb29yZHNcbiAqIEByZXR1cm4ge29iamVjdH0gb3V0XG4gKiAgR2VvSlNPTiBvYmplY3RcbiAqXG4gKi9cbmV4cG9ydHMubWFrZUxpbmUgPSBmdW5jdGlvbihjb29yZHMpIHtcbiAgICBpZihjb29yZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnTGluZVN0cmluZycsXG4gICAgICAgICAgICBjb29yZGluYXRlczogY29vcmRzWzBdXG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdNdWx0aUxpbmVTdHJpbmcnLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNvb3Jkc1xuICAgICAgICB9O1xuICAgIH1cbn07XG5cbi8qKlxuICogTWFrZSBwb2x5Z29uICgnUG9seWdvbicgb3IgJ011bHRpUG9seWdvbicpIEdlb0pTT05cbiAqXG4gKiBAcGFyYW0ge2FycmF5fSBjb29yZHNcbiAqICByZXN1bHRzIGZvcm0gY2FsY1RyYWNlVG9MaW5lQ29vcmRzXG4gKiBAcmV0dXJuIHtvYmplY3R9IG91dFxuICogIEdlb0pTT04gb2JqZWN0XG4gKi9cbmV4cG9ydHMubWFrZVBvbHlnb24gPSBmdW5jdGlvbihjb29yZHMpIHtcbiAgICBpZihjb29yZHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgICAgICBjb29yZGluYXRlczogY29vcmRzXG4gICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIF9jb29yZHMgPSBuZXcgQXJyYXkoY29vcmRzLmxlbmd0aCk7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGNvb3Jkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgX2Nvb3Jkc1tpXSA9IFtjb29yZHNbaV1dO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHR5cGU6ICdNdWx0aVBvbHlnb24nLFxuICAgICAgICAgICAgY29vcmRpbmF0ZXM6IF9jb29yZHNcbiAgICAgICAgfTtcbiAgICB9XG59O1xuXG4vKipcbiAqIE1ha2UgYmxhbmsgR2VvSlNPTlxuICpcbiAqIEByZXR1cm4ge29iamVjdH1cbiAqICBCbGFuayBHZW9KU09OIG9iamVjdFxuICpcbiAqL1xuZXhwb3J0cy5tYWtlQmxhbmsgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnUG9pbnQnLFxuICAgICAgICBjb29yZGluYXRlczogW11cbiAgICB9O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vbGliJyk7XG52YXIgVGVtcGxhdGUgPSByZXF1aXJlKCcuLi9wbG90X2FwaS9wbG90X3RlbXBsYXRlJyk7XG52YXIgaGFuZGxlRG9tYWluRGVmYXVsdHMgPSByZXF1aXJlKCcuL2RvbWFpbicpLmRlZmF1bHRzO1xuXG5cbi8qKlxuICogRmluZCBhbmQgc3VwcGx5IGRlZmF1bHRzIHRvIGFsbCBzdWJwbG90cyBvZiBhIGdpdmVuIHR5cGVcbiAqIFRoaXMgaGFuZGxlcyBzdWJwbG90cyB0aGF0IGFyZSBjb250YWluZWQgd2l0aGluIG9uZSBjb250YWluZXIgLSBzb1xuICogZ2wzZCwgZ2VvLCB0ZXJuYXJ5Li4uIGJ1dCBub3QgMmQgYXhlcyB3aGljaCBoYXZlIHNlcGFyYXRlIHggYW5kIHkgYXhlc1xuICogZmluZHMgc3VicGxvdHMsIGNvZXJjZXMgdGhlaXIgYGRvbWFpbmAgYXR0cmlidXRlcywgdGhlbiBjYWxscyB0aGVcbiAqIGdpdmVuIGhhbmRsZURlZmF1bHRzIGZ1bmN0aW9uIHRvIGZpbGwgaW4gZXZlcnl0aGluZyBlbHNlLlxuICpcbiAqIGxheW91dEluOiB0aGUgY29tcGxldGUgdXNlci1zdXBwbGllZCBpbnB1dCBsYXlvdXRcbiAqIGxheW91dE91dDogdGhlIGNvbXBsZXRlIGZpbmlzaGVkIGxheW91dFxuICogZnVsbERhdGE6IHRoZSBmaW5pc2hlZCBkYXRhIGFycmF5LCB1c2VkIG9ubHkgdG8gZmluZCBzdWJwbG90c1xuICogb3B0czoge1xuICogIHR5cGU6IHN1YnBsb3QgdHlwZSBzdHJpbmdcbiAqICBhdHRyaWJ1dGVzOiBzdWJwbG90IGF0dHJpYnV0ZXMgb2JqZWN0XG4gKiAgcGFydGl0aW9uOiAneCcgb3IgJ3knLCB3aGljaCBkaXJlY3Rpb24gdG8gZGl2aWRlIGRvbWFpbiBzcGFjZSBieSBkZWZhdWx0XG4gKiAgICAgIChkZWZhdWx0ICd4JywgaWUgc2lkZS1ieS1zaWRlIHN1YnBsb3RzKVxuICogICAgICBUT0RPOiB0aGlzIG9wdGlvbiBpcyBvbmx5IGhlcmUgYmVjYXVzZSAzRCBhbmQgZ2VvIG1hZGUgb3Bwb3NpdGVcbiAqICAgICAgY2hvaWNlcyBpbiB0aGlzIHJlZ2FyZCBwcmV2aW91c2x5IGFuZCBJIGRpZG4ndCB3YW50IHRvIGNoYW5nZSBpdC5cbiAqICAgICAgSW5zdGVhZCB3ZSBzaG91bGQgZG86XG4gKiAgICAgIC0gc29tZXRoaW5nIGNvbnNpc3RlbnRcbiAqICAgICAgLSBzb21ldGhpbmcgbW9yZSBzcXVhcmUgKDQgY3V0cyAyeDIsIDUvNiBjdXRzIDJ4MywgZXRjLilcbiAqICAgICAgLSBzb21ldGhpbmcgdGhhdCBpbmNsdWRlcyBhbGwgc3VicGxvdCB0eXBlcyBpbiBvbmUgYXJyYW5nZW1lbnQsXG4gKiAgICAgICAgbm93IHRoYXQgd2UgY2FuIGhhdmUgdGhlbSB0b2dldGhlciFcbiAqICBoYW5kbGVEZWZhdWx0czogZnVuY3Rpb24gb2YgKHN1YnBsb3RMYXlvdXRJbiwgc3VicGxvdExheW91dE91dCwgY29lcmNlLCBvcHRzKVxuICogICAgICB0aGlzIG9wdHMgb2JqZWN0IGlzIHBhc3NlZCB0aHJvdWdoIHRvIGhhbmRsZURlZmF1bHRzLCBzbyBhdHRhY2ggYW55XG4gKiAgICAgIGFkZGl0aW9uYWwgaXRlbXMgbmVlZGVkIGJ5IHRoaXMgZnVuY3Rpb24gaGVyZSBhcyB3ZWxsXG4gKiB9XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlU3VicGxvdERlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhLCBvcHRzKSB7XG4gICAgdmFyIHN1YnBsb3RUeXBlID0gb3B0cy50eXBlO1xuICAgIHZhciBzdWJwbG90QXR0cmlidXRlcyA9IG9wdHMuYXR0cmlidXRlcztcbiAgICB2YXIgaGFuZGxlRGVmYXVsdHMgPSBvcHRzLmhhbmRsZURlZmF1bHRzO1xuICAgIHZhciBwYXJ0aXRpb24gPSBvcHRzLnBhcnRpdGlvbiB8fCAneCc7XG5cbiAgICB2YXIgaWRzID0gbGF5b3V0T3V0Ll9zdWJwbG90c1tzdWJwbG90VHlwZV07XG4gICAgdmFyIGlkc0xlbmd0aCA9IGlkcy5sZW5ndGg7XG5cbiAgICB2YXIgYmFzZUlkID0gaWRzTGVuZ3RoICYmIGlkc1swXS5yZXBsYWNlKC9cXGQrJC8sICcnKTtcblxuICAgIHZhciBzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQ7XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIHN1YnBsb3RBdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgaWRzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGlkID0gaWRzW2ldO1xuXG4gICAgICAgIC8vIHRlcm5hcnkgdHJhY2VzIGdldCBhIGxheW91dCB0ZXJuYXJ5IGZvciBmcmVlIVxuICAgICAgICBpZihsYXlvdXRJbltpZF0pIHN1YnBsb3RMYXlvdXRJbiA9IGxheW91dEluW2lkXTtcbiAgICAgICAgZWxzZSBzdWJwbG90TGF5b3V0SW4gPSBsYXlvdXRJbltpZF0gPSB7fTtcblxuICAgICAgICBzdWJwbG90TGF5b3V0T3V0ID0gVGVtcGxhdGUubmV3Q29udGFpbmVyKGxheW91dE91dCwgaWQsIGJhc2VJZCk7XG5cbiAgICAgICAgLy8gQWxsIHN1YnBsb3QgY29udGFpbmVycyBnZXQgYSBgdWlyZXZpc2lvbmAgaW5oZXJpdGluZyBmcm9tIHRoZSBiYXNlLlxuICAgICAgICAvLyBDdXJyZW50bHkgYWxsIHN1YnBsb3RzIGNvbnRhaW5lcnMgaGF2ZSBzb21lIHVzZXIgaW50ZXJhY3Rpb25cbiAgICAgICAgLy8gYXR0cmlidXRlcywgYnV0IGlmIHdlIGV2ZXIgYWRkIG9uZSB0aGF0IGRvZXNuJ3QsIHdlIHdvdWxkIG5lZWQgYW5cbiAgICAgICAgLy8gb3B0aW9uIHRvIHNraXAgdGhpcyBzdGVwLlxuICAgICAgICBjb2VyY2UoJ3VpcmV2aXNpb24nLCBsYXlvdXRPdXQudWlyZXZpc2lvbik7XG5cbiAgICAgICAgdmFyIGRmbHREb21haW5zID0ge307XG4gICAgICAgIGRmbHREb21haW5zW3BhcnRpdGlvbl0gPSBbaSAvIGlkc0xlbmd0aCwgKGkgKyAxKSAvIGlkc0xlbmd0aF07XG4gICAgICAgIGhhbmRsZURvbWFpbkRlZmF1bHRzKHN1YnBsb3RMYXlvdXRPdXQsIGxheW91dE91dCwgY29lcmNlLCBkZmx0RG9tYWlucyk7XG5cbiAgICAgICAgb3B0cy5pZCA9IGlkO1xuICAgICAgICBoYW5kbGVEZWZhdWx0cyhzdWJwbG90TGF5b3V0SW4sIHN1YnBsb3RMYXlvdXRPdXQsIGNvZXJjZSwgb3B0cyk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgc2NhdHRlckdlb0F0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlcmdlby9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG52YXIgZGVmYXVsdExpbmUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yL2F0dHJpYnV0ZXMnKS5kZWZhdWx0TGluZTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxudmFyIHNjYXR0ZXJHZW9NYXJrZXJMaW5lQXR0cnMgPSBzY2F0dGVyR2VvQXR0cnMubWFya2VyLmxpbmU7XG5cbm1vZHVsZS5leHBvcnRzID0gZXh0ZW5kRmxhdCh7XG4gICAgbG9jYXRpb25zOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBjb29yZGluYXRlcyB2aWEgbG9jYXRpb24gSURzIG9yIG5hbWVzLicsXG4gICAgICAgICAgICAnU2VlIGBsb2NhdGlvbm1vZGVgIGZvciBtb3JlIGluZm8uJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgbG9jYXRpb25tb2RlOiBzY2F0dGVyR2VvQXR0cnMubG9jYXRpb25tb2RlLFxuICAgIHo6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGNvbG9yIHZhbHVlcy4nXG4gICAgfSxcbiAgICBnZW9qc29uOiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyR2VvQXR0cnMuZ2VvanNvbiwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgb3B0aW9uYWwgR2VvSlNPTiBkYXRhIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHRyYWNlLicsXG4gICAgICAgICAgICAnSWYgbm90IGdpdmVuLCB0aGUgZmVhdHVyZXMgb24gdGhlIGJhc2UgbWFwIGFyZSB1c2VkLicsXG5cbiAgICAgICAgICAgICdJdCBjYW4gYmUgc2V0IGFzIGEgdmFsaWQgR2VvSlNPTiBvYmplY3Qgb3IgYXMgYSBVUkwgc3RyaW5nLicsXG4gICAgICAgICAgICAnTm90ZSB0aGF0IHdlIG9ubHkgYWNjZXB0IEdlb0pTT05zIG9mIHR5cGUgKkZlYXR1cmVDb2xsZWN0aW9uKiBvciAqRmVhdHVyZSonLFxuICAgICAgICAgICAgJ3dpdGggZ2VvbWV0cmllcyBvZiB0eXBlICpQb2x5Z29uKiBvciAqTXVsdGlQb2x5Z29uKi4nXG5cbiAgICAgICAgICAgIC8vIFRPRE8gYWRkIHRvcG9qc29uIHN1cHBvcnQgd2l0aCBhZGRpdGlvbmFsICd0b3BvanNvbm9iamVjdCcgYXR0cj9cbiAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS90b3BvanNvbi90b3BvanNvbi1zcGVjaWZpY2F0aW9uL2Jsb2IvbWFzdGVyL1JFQURNRS5tZFxuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIGZlYXR1cmVpZGtleTogc2NhdHRlckdlb0F0dHJzLmZlYXR1cmVpZGtleSxcblxuICAgIHRleHQ6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJHZW9BdHRycy50ZXh0LCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgdGV4dCBlbGVtZW50cyBhc3NvY2lhdGVkIHdpdGggZWFjaCBsb2NhdGlvbi4nXG4gICAgfSksXG4gICAgaG92ZXJ0ZXh0OiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyR2VvQXR0cnMuaG92ZXJ0ZXh0LCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2FtZSBhcyBgdGV4dGAuJ1xuICAgIH0pLFxuICAgIG1hcmtlcjoge1xuICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgICBjb2xvcjogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckdlb01hcmtlckxpbmVBdHRycy5jb2xvciwge2RmbHQ6IGRlZmF1bHRMaW5lfSksXG4gICAgICAgICAgICB3aWR0aDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckdlb01hcmtlckxpbmVBdHRycy53aWR0aCwge2RmbHQ6IDF9KSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICAgICAgfSxcbiAgICAgICAgb3BhY2l0eToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiAxLFxuICAgICAgICAgICAgZGZsdDogMSxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgbG9jYXRpb25zLidcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgIH0sXG5cbiAgICBzZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IHNjYXR0ZXJHZW9BdHRycy5zZWxlY3RlZC5tYXJrZXIub3BhY2l0eSxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCdcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgIH0sXG4gICAgdW5zZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHtcbiAgICAgICAgICAgIG9wYWNpdHk6IHNjYXR0ZXJHZW9BdHRycy51bnNlbGVjdGVkLm1hcmtlci5vcGFjaXR5LFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90J1xuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnXG4gICAgfSxcblxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbywge1xuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBmbGFnczogWydsb2NhdGlvbicsICd6JywgJ3RleHQnLCAnbmFtZSddXG4gICAgfSksXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKCksXG4gICAgc2hvd2xlZ2VuZDogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLnNob3dsZWdlbmQsIHtkZmx0OiBmYWxzZX0pXG59LFxuXG4gICAgY29sb3JTY2FsZUF0dHJzKCcnLCB7XG4gICAgICAgIGNMZXR0ZXI6ICd6JyxcbiAgICAgICAgZWRpdFR5cGVPdmVycmlkZTogJ2NhbGMnXG4gICAgfSlcbik7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbnZhciBjb2xvcnNjYWxlQ2FsYyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9jYWxjJyk7XG52YXIgYXJyYXlzVG9DYWxjZGF0YSA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvYXJyYXlzX3RvX2NhbGNkYXRhJyk7XG52YXIgY2FsY1NlbGVjdGlvbiA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvY2FsY19zZWxlY3Rpb24nKTtcblxuZnVuY3Rpb24gaXNOb25CbGFua1N0cmluZyh2KSB7XG4gICAgcmV0dXJuIHYgJiYgdHlwZW9mIHYgPT09ICdzdHJpbmcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIGxlbiA9IHRyYWNlLl9sZW5ndGg7XG4gICAgdmFyIGNhbGNUcmFjZSA9IG5ldyBBcnJheShsZW4pO1xuXG4gICAgdmFyIGlzVmFsaWRMb2M7XG5cbiAgICBpZih0cmFjZS5nZW9qc29uKSB7XG4gICAgICAgIGlzVmFsaWRMb2MgPSBmdW5jdGlvbih2KSB7IHJldHVybiBpc05vbkJsYW5rU3RyaW5nKHYpIHx8IGlzTnVtZXJpYyh2KTsgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpc1ZhbGlkTG9jID0gaXNOb25CbGFua1N0cmluZztcbiAgICB9XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGNhbGNQdCA9IGNhbGNUcmFjZVtpXSA9IHt9O1xuICAgICAgICB2YXIgbG9jID0gdHJhY2UubG9jYXRpb25zW2ldO1xuICAgICAgICB2YXIgeiA9IHRyYWNlLnpbaV07XG5cbiAgICAgICAgaWYoaXNWYWxpZExvYyhsb2MpICYmIGlzTnVtZXJpYyh6KSkge1xuICAgICAgICAgICAgY2FsY1B0LmxvYyA9IGxvYztcbiAgICAgICAgICAgIGNhbGNQdC56ID0gejtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGNQdC5sb2MgPSBudWxsO1xuICAgICAgICAgICAgY2FsY1B0LnogPSBCQUROVU07XG4gICAgICAgIH1cblxuICAgICAgICBjYWxjUHQuaW5kZXggPSBpO1xuICAgIH1cblxuICAgIGFycmF5c1RvQ2FsY2RhdGEoY2FsY1RyYWNlLCB0cmFjZSk7XG4gICAgY29sb3JzY2FsZUNhbGMoZ2QsIHRyYWNlLCB7XG4gICAgICAgIHZhbHM6IHRyYWNlLnosXG4gICAgICAgIGNvbnRhaW5lclN0cjogJycsXG4gICAgICAgIGNMZXR0ZXI6ICd6J1xuICAgIH0pO1xuICAgIGNhbGNTZWxlY3Rpb24oY2FsY1RyYWNlLCB0cmFjZSk7XG5cbiAgICByZXR1cm4gY2FsY1RyYWNlO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGNvbG9yc2NhbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9kZWZhdWx0cycpO1xudmFyIGF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2F0dHJpYnV0ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIGxvY2F0aW9ucyA9IGNvZXJjZSgnbG9jYXRpb25zJyk7XG4gICAgdmFyIHogPSBjb2VyY2UoJ3onKTtcblxuICAgIGlmKCEobG9jYXRpb25zICYmIGxvY2F0aW9ucy5sZW5ndGggJiYgTGliLmlzQXJyYXlPclR5cGVkQXJyYXkoeikgJiYgei5sZW5ndGgpKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBNYXRoLm1pbihsb2NhdGlvbnMubGVuZ3RoLCB6Lmxlbmd0aCk7XG5cbiAgICB2YXIgZ2VvanNvbiA9IGNvZXJjZSgnZ2VvanNvbicpO1xuXG4gICAgdmFyIGxvY2F0aW9ubW9kZURmbHQ7XG4gICAgaWYoKHR5cGVvZiBnZW9qc29uID09PSAnc3RyaW5nJyAmJiBnZW9qc29uICE9PSAnJykgfHwgTGliLmlzUGxhaW5PYmplY3QoZ2VvanNvbikpIHtcbiAgICAgICAgbG9jYXRpb25tb2RlRGZsdCA9ICdnZW9qc29uLWlkJztcbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25Nb2RlID0gY29lcmNlKCdsb2NhdGlvbm1vZGUnLCBsb2NhdGlvbm1vZGVEZmx0KTtcblxuICAgIGlmKGxvY2F0aW9uTW9kZSA9PT0gJ2dlb2pzb24taWQnKSB7XG4gICAgICAgIGNvZXJjZSgnZmVhdHVyZWlka2V5Jyk7XG4gICAgfVxuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIHZhciBtbHcgPSBjb2VyY2UoJ21hcmtlci5saW5lLndpZHRoJyk7XG4gICAgaWYobWx3KSBjb2VyY2UoJ21hcmtlci5saW5lLmNvbG9yJyk7XG4gICAgY29lcmNlKCdtYXJrZXIub3BhY2l0eScpO1xuXG4gICAgY29sb3JzY2FsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge3ByZWZpeDogJycsIGNMZXR0ZXI6ICd6J30pO1xuXG4gICAgTGliLmNvZXJjZVNlbGVjdGlvbk1hcmtlck9wYWNpdHkodHJhY2VPdXQsIGNvZXJjZSk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGV2ZW50RGF0YShvdXQsIHB0LCB0cmFjZSwgY2QsIHBvaW50TnVtYmVyKSB7XG4gICAgb3V0LmxvY2F0aW9uID0gcHQubG9jYXRpb247XG4gICAgb3V0LnogPSBwdC56O1xuXG4gICAgLy8gaW5jbHVkZSBmZWF0dXJlIHByb3BlcnRpZXMgZnJvbSBpbnB1dCBnZW9qc29uXG4gICAgdmFyIGNkaSA9IGNkW3BvaW50TnVtYmVyXTtcbiAgICBpZihjZGkuZkluICYmIGNkaS5mSW4ucHJvcGVydGllcykge1xuICAgICAgICBvdXQucHJvcGVydGllcyA9IGNkaS5mSW4ucHJvcGVydGllcztcbiAgICB9XG4gICAgb3V0LmN0ID0gY2RpLmN0O1xuXG4gICAgcmV0dXJuIG91dDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgZmlsbFRleHQgPSByZXF1aXJlKCcuLi8uLi9saWInKS5maWxsVGV4dDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBob3ZlclBvaW50cyhwb2ludERhdGEsIHh2YWwsIHl2YWwpIHtcbiAgICB2YXIgY2QgPSBwb2ludERhdGEuY2Q7XG4gICAgdmFyIHRyYWNlID0gY2RbMF0udHJhY2U7XG4gICAgdmFyIGdlbyA9IHBvaW50RGF0YS5zdWJwbG90O1xuXG4gICAgdmFyIHB0LCBpLCBqLCBpc0luc2lkZTtcblxuICAgIGZvcihpID0gMDsgaSA8IGNkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHB0ID0gY2RbaV07XG4gICAgICAgIGlzSW5zaWRlID0gZmFsc2U7XG5cbiAgICAgICAgaWYocHQuX3BvbHlnb25zKSB7XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBwdC5fcG9seWdvbnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZihwdC5fcG9seWdvbnNbal0uY29udGFpbnMoW3h2YWwsIHl2YWxdKSkge1xuICAgICAgICAgICAgICAgICAgICBpc0luc2lkZSA9ICFpc0luc2lkZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZm9yIHBvbHlnb25zIHRoYXQgY3Jvc3MgYW50aW1lcmlkaWFuIGFzIHh2YWwgaXMgaW4gWy0xODAsIDE4MF1cbiAgICAgICAgICAgICAgICBpZihwdC5fcG9seWdvbnNbal0uY29udGFpbnMoW3h2YWwgKyAzNjAsIHl2YWxdKSkge1xuICAgICAgICAgICAgICAgICAgICBpc0luc2lkZSA9ICFpc0luc2lkZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGlzSW5zaWRlKSBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKCFpc0luc2lkZSB8fCAhcHQpIHJldHVybjtcblxuICAgIHBvaW50RGF0YS54MCA9IHBvaW50RGF0YS54MSA9IHBvaW50RGF0YS54YS5jMnAocHQuY3QpO1xuICAgIHBvaW50RGF0YS55MCA9IHBvaW50RGF0YS55MSA9IHBvaW50RGF0YS55YS5jMnAocHQuY3QpO1xuXG4gICAgcG9pbnREYXRhLmluZGV4ID0gcHQuaW5kZXg7XG4gICAgcG9pbnREYXRhLmxvY2F0aW9uID0gcHQubG9jO1xuICAgIHBvaW50RGF0YS56ID0gcHQuejtcbiAgICBwb2ludERhdGEuekxhYmVsID0gQXhlcy50aWNrVGV4dChnZW8ubW9ja0F4aXMsIGdlby5tb2NrQXhpcy5jMmwocHQueiksICdob3ZlcicpLnRleHQ7XG4gICAgcG9pbnREYXRhLmhvdmVydGVtcGxhdGUgPSBwdC5ob3ZlcnRlbXBsYXRlO1xuXG4gICAgbWFrZUhvdmVySW5mbyhwb2ludERhdGEsIHRyYWNlLCBwdCwgZ2VvLm1vY2tBeGlzKTtcblxuICAgIHJldHVybiBbcG9pbnREYXRhXTtcbn07XG5cbmZ1bmN0aW9uIG1ha2VIb3ZlckluZm8ocG9pbnREYXRhLCB0cmFjZSwgcHQpIHtcbiAgICBpZih0cmFjZS5ob3ZlcnRlbXBsYXRlKSByZXR1cm47XG5cbiAgICB2YXIgaG92ZXJpbmZvID0gcHQuaGkgfHwgdHJhY2UuaG92ZXJpbmZvO1xuICAgIHZhciBsb2MgPSBTdHJpbmcocHQubG9jKTtcblxuICAgIHZhciBwYXJ0cyA9IChob3ZlcmluZm8gPT09ICdhbGwnKSA/XG4gICAgICAgIGF0dHJpYnV0ZXMuaG92ZXJpbmZvLmZsYWdzIDpcbiAgICAgICAgaG92ZXJpbmZvLnNwbGl0KCcrJyk7XG5cbiAgICB2YXIgaGFzTmFtZSA9IChwYXJ0cy5pbmRleE9mKCduYW1lJykgIT09IC0xKTtcbiAgICB2YXIgaGFzTG9jYXRpb24gPSAocGFydHMuaW5kZXhPZignbG9jYXRpb24nKSAhPT0gLTEpO1xuICAgIHZhciBoYXNaID0gKHBhcnRzLmluZGV4T2YoJ3onKSAhPT0gLTEpO1xuICAgIHZhciBoYXNUZXh0ID0gKHBhcnRzLmluZGV4T2YoJ3RleHQnKSAhPT0gLTEpO1xuICAgIHZhciBoYXNJZEFzTmFtZUxhYmVsID0gIWhhc05hbWUgJiYgaGFzTG9jYXRpb247XG5cbiAgICB2YXIgdGV4dCA9IFtdO1xuXG4gICAgaWYoaGFzSWRBc05hbWVMYWJlbCkge1xuICAgICAgICBwb2ludERhdGEubmFtZU92ZXJyaWRlID0gbG9jO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGhhc05hbWUpIHBvaW50RGF0YS5uYW1lT3ZlcnJpZGUgPSB0cmFjZS5uYW1lO1xuICAgICAgICBpZihoYXNMb2NhdGlvbikgdGV4dC5wdXNoKGxvYyk7XG4gICAgfVxuXG4gICAgaWYoaGFzWikge1xuICAgICAgICB0ZXh0LnB1c2gocG9pbnREYXRhLnpMYWJlbCk7XG4gICAgfVxuICAgIGlmKGhhc1RleHQpIHtcbiAgICAgICAgZmlsbFRleHQocHQsIHRyYWNlLCB0ZXh0KTtcbiAgICB9XG5cbiAgICBwb2ludERhdGEuZXh0cmFUZXh0ID0gdGV4dC5qb2luKCc8YnI+Jyk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL2hlYXRtYXAvY29sb3JiYXInKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBjYWxjR2VvSlNPTjogcmVxdWlyZSgnLi9wbG90JykuY2FsY0dlb0pTT04sXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JykucGxvdCxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlLFxuICAgIHN0eWxlT25TZWxlY3Q6IHJlcXVpcmUoJy4vc3R5bGUnKS5zdHlsZU9uU2VsZWN0LFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJyksXG4gICAgZXZlbnREYXRhOiByZXF1aXJlKCcuL2V2ZW50X2RhdGEnKSxcbiAgICBzZWxlY3RQb2ludHM6IHJlcXVpcmUoJy4vc2VsZWN0JyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdjaG9yb3BsZXRoJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvZ2VvJyksXG4gICAgY2F0ZWdvcmllczogWydnZW8nLCAnbm9PcGFjaXR5JywgJ3Nob3dMZWdlbmQnXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIGRhdGEgdGhhdCBkZXNjcmliZXMgdGhlIGNob3JvcGxldGggdmFsdWUtdG8tY29sb3IgbWFwcGluZycsXG4gICAgICAgICAgICAnaXMgc2V0IGluIGB6YC4nLFxuICAgICAgICAgICAgJ1RoZSBnZW9ncmFwaGljIGxvY2F0aW9ucyBjb3JyZXNwb25kaW5nIHRvIGVhY2ggdmFsdWUgaW4gYHpgJyxcbiAgICAgICAgICAgICdhcmUgc2V0IGluIGBsb2NhdGlvbnNgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgZ2VvVXRpbHMgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2VvX2xvY2F0aW9uX3V0aWxzJyk7XG52YXIgZ2V0VG9wb2pzb25GZWF0dXJlcyA9IHJlcXVpcmUoJy4uLy4uL2xpYi90b3BvanNvbl91dGlscycpLmdldFRvcG9qc29uRmVhdHVyZXM7XG52YXIgZmluZEV4dHJlbWVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F1dG9yYW5nZScpLmZpbmRFeHRyZW1lcztcblxudmFyIHN0eWxlID0gcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlO1xuXG5mdW5jdGlvbiBwbG90KGdkLCBnZW8sIGNhbGNEYXRhKSB7XG4gICAgdmFyIGNob3JvcGxldGhMYXllciA9IGdlby5sYXllcnMuYmFja3Bsb3Quc2VsZWN0KCcuY2hvcm9wbGV0aGxheWVyJyk7XG5cbiAgICBMaWIubWFrZVRyYWNlR3JvdXBzKGNob3JvcGxldGhMYXllciwgY2FsY0RhdGEsICd0cmFjZSBjaG9yb3BsZXRoJykuZWFjaChmdW5jdGlvbihjYWxjVHJhY2UpIHtcbiAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICB2YXIgcGF0aHMgPSBzZWwuc2VsZWN0QWxsKCdwYXRoLmNob3JvcGxldGhsb2NhdGlvbicpXG4gICAgICAgICAgICAuZGF0YShMaWIuaWRlbnRpdHkpO1xuXG4gICAgICAgIHBhdGhzLmVudGVyKCkuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgIC5jbGFzc2VkKCdjaG9yb3BsZXRobG9jYXRpb24nLCB0cnVlKTtcblxuICAgICAgICBwYXRocy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAgICAgLy8gY2FsbCBzdHlsZSBoZXJlIHdpdGhpbiB0b3BvanNvbiByZXF1ZXN0IGNhbGxiYWNrXG4gICAgICAgIHN0eWxlKGdkLCBjYWxjVHJhY2UpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjYWxjR2VvSlNPTihjYWxjVHJhY2UsIGZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgdHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG4gICAgdmFyIGdlb0xheW91dCA9IGZ1bGxMYXlvdXRbdHJhY2UuZ2VvXTtcbiAgICB2YXIgZ2VvID0gZ2VvTGF5b3V0Ll9zdWJwbG90O1xuICAgIHZhciBsb2NhdGlvbm1vZGUgPSB0cmFjZS5sb2NhdGlvbm1vZGU7XG4gICAgdmFyIGxlbiA9IHRyYWNlLl9sZW5ndGg7XG5cbiAgICB2YXIgZmVhdHVyZXMgPSBsb2NhdGlvbm1vZGUgPT09ICdnZW9qc29uLWlkJyA/XG4gICAgICAgIGdlb1V0aWxzLmV4dHJhY3RUcmFjZUZlYXR1cmUoY2FsY1RyYWNlKSA6XG4gICAgICAgIGdldFRvcG9qc29uRmVhdHVyZXModHJhY2UsIGdlby50b3BvanNvbik7XG5cbiAgICB2YXIgbG9uQXJyYXkgPSBbXTtcbiAgICB2YXIgbGF0QXJyYXkgPSBbXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgY2FsY1B0ID0gY2FsY1RyYWNlW2ldO1xuICAgICAgICB2YXIgZmVhdHVyZSA9IGxvY2F0aW9ubW9kZSA9PT0gJ2dlb2pzb24taWQnID9cbiAgICAgICAgICAgIGNhbGNQdC5mT3V0IDpcbiAgICAgICAgICAgIGdlb1V0aWxzLmxvY2F0aW9uVG9GZWF0dXJlKGxvY2F0aW9ubW9kZSwgY2FsY1B0LmxvYywgZmVhdHVyZXMpO1xuXG4gICAgICAgIGlmKGZlYXR1cmUpIHtcbiAgICAgICAgICAgIGNhbGNQdC5nZW9qc29uID0gZmVhdHVyZTtcbiAgICAgICAgICAgIGNhbGNQdC5jdCA9IGZlYXR1cmUucHJvcGVydGllcy5jdDtcbiAgICAgICAgICAgIGNhbGNQdC5fcG9seWdvbnMgPSBnZW9VdGlscy5mZWF0dXJlMnBvbHlnb25zKGZlYXR1cmUpO1xuXG4gICAgICAgICAgICB2YXIgYmJveEZlYXR1cmUgPSBnZW9VdGlscy5jb21wdXRlQmJveChmZWF0dXJlKTtcbiAgICAgICAgICAgIGxvbkFycmF5LnB1c2goYmJveEZlYXR1cmVbMF0sIGJib3hGZWF0dXJlWzJdKTtcbiAgICAgICAgICAgIGxhdEFycmF5LnB1c2goYmJveEZlYXR1cmVbMV0sIGJib3hGZWF0dXJlWzNdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhbGNQdC5nZW9qc29uID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKGdlb0xheW91dC5maXRib3VuZHMgPT09ICdnZW9qc29uJyAmJiBsb2NhdGlvbm1vZGUgPT09ICdnZW9qc29uLWlkJykge1xuICAgICAgICB2YXIgYmJveEdlb2pzb24gPSBnZW9VdGlscy5jb21wdXRlQmJveChnZW9VdGlscy5nZXRUcmFjZUdlb2pzb24odHJhY2UpKTtcbiAgICAgICAgbG9uQXJyYXkgPSBbYmJveEdlb2pzb25bMF0sIGJib3hHZW9qc29uWzJdXTtcbiAgICAgICAgbGF0QXJyYXkgPSBbYmJveEdlb2pzb25bMV0sIGJib3hHZW9qc29uWzNdXTtcbiAgICB9XG5cbiAgICB2YXIgb3B0cyA9IHtwYWRkZWQ6IHRydWV9O1xuICAgIHRyYWNlLl9leHRyZW1lcy5sb24gPSBmaW5kRXh0cmVtZXMoZ2VvTGF5b3V0LmxvbmF4aXMuX2F4LCBsb25BcnJheSwgb3B0cyk7XG4gICAgdHJhY2UuX2V4dHJlbWVzLmxhdCA9IGZpbmRFeHRyZW1lcyhnZW9MYXlvdXQubGF0YXhpcy5fYXgsIGxhdEFycmF5LCBvcHRzKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2FsY0dlb0pTT046IGNhbGNHZW9KU09OLFxuICAgIHBsb3Q6IHBsb3Rcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0UG9pbnRzKHNlYXJjaEluZm8sIHNlbGVjdGlvblRlc3Rlcikge1xuICAgIHZhciBjZCA9IHNlYXJjaEluZm8uY2Q7XG4gICAgdmFyIHhhID0gc2VhcmNoSW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBzZWFyY2hJbmZvLnlheGlzO1xuICAgIHZhciBzZWxlY3Rpb24gPSBbXTtcblxuICAgIHZhciBpLCBkaSwgY3QsIHgsIHk7XG5cbiAgICBpZihzZWxlY3Rpb25UZXN0ZXIgPT09IGZhbHNlKSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjZFtpXS5zZWxlY3RlZCA9IDA7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZGkgPSBjZFtpXTtcbiAgICAgICAgICAgIGN0ID0gZGkuY3Q7XG5cbiAgICAgICAgICAgIGlmKCFjdCkgY29udGludWU7XG5cbiAgICAgICAgICAgIHggPSB4YS5jMnAoY3QpO1xuICAgICAgICAgICAgeSA9IHlhLmMycChjdCk7XG5cbiAgICAgICAgICAgIGlmKHNlbGVjdGlvblRlc3Rlci5jb250YWlucyhbeCwgeV0sIG51bGwsIGksIHNlYXJjaEluZm8pKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBwb2ludE51bWJlcjogaSxcbiAgICAgICAgICAgICAgICAgICAgbG9uOiBjdFswXSxcbiAgICAgICAgICAgICAgICAgICAgbGF0OiBjdFsxXVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRpLnNlbGVjdGVkID0gMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGkuc2VsZWN0ZWQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgRHJhd2luZyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZHJhd2luZycpO1xudmFyIENvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKTtcblxuZnVuY3Rpb24gc3R5bGUoZ2QsIGNhbGNUcmFjZSkge1xuICAgIGlmKGNhbGNUcmFjZSkgc3R5bGVUcmFjZShnZCwgY2FsY1RyYWNlKTtcbn1cblxuZnVuY3Rpb24gc3R5bGVUcmFjZShnZCwgY2FsY1RyYWNlKSB7XG4gICAgdmFyIHRyYWNlID0gY2FsY1RyYWNlWzBdLnRyYWNlO1xuICAgIHZhciBzID0gY2FsY1RyYWNlWzBdLm5vZGUzO1xuICAgIHZhciBsb2NzID0gcy5zZWxlY3RBbGwoJy5jaG9yb3BsZXRobG9jYXRpb24nKTtcbiAgICB2YXIgbWFya2VyID0gdHJhY2UubWFya2VyIHx8IHt9O1xuICAgIHZhciBtYXJrZXJMaW5lID0gbWFya2VyLmxpbmUgfHwge307XG5cbiAgICB2YXIgc2NsRnVuYyA9IENvbG9yc2NhbGUubWFrZUNvbG9yU2NhbGVGdW5jRnJvbVRyYWNlKHRyYWNlKTtcblxuICAgIGxvY3MuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgLmF0dHIoJ2ZpbGwnLCBzY2xGdW5jKGQueikpXG4gICAgICAgICAgICAuY2FsbChDb2xvci5zdHJva2UsIGQubWxjIHx8IG1hcmtlckxpbmUuY29sb3IpXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLmRhc2hMaW5lLCAnJywgZC5tbHcgfHwgbWFya2VyTGluZS53aWR0aCB8fCAwKVxuICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgbWFya2VyLm9wYWNpdHkpO1xuICAgIH0pO1xuXG4gICAgRHJhd2luZy5zZWxlY3RlZFBvaW50U3R5bGUobG9jcywgdHJhY2UsIGdkKTtcbn1cblxuZnVuY3Rpb24gc3R5bGVPblNlbGVjdChnZCwgY2FsY1RyYWNlKSB7XG4gICAgdmFyIHMgPSBjYWxjVHJhY2VbMF0ubm9kZTM7XG4gICAgdmFyIHRyYWNlID0gY2FsY1RyYWNlWzBdLnRyYWNlO1xuXG4gICAgaWYodHJhY2Uuc2VsZWN0ZWRwb2ludHMpIHtcbiAgICAgICAgRHJhd2luZy5zZWxlY3RlZFBvaW50U3R5bGUocy5zZWxlY3RBbGwoJy5jaG9yb3BsZXRobG9jYXRpb24nKSwgdHJhY2UsIGdkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzdHlsZVRyYWNlKGdkLCBjYWxjVHJhY2UpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgc3R5bGU6IHN0eWxlLFxuICAgIHN0eWxlT25TZWxlY3Q6IHN0eWxlT25TZWxlY3Rcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1pbjogJ3ptaW4nLFxuICAgIG1heDogJ3ptYXgnXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZVhZRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGxheW91dCwgY29lcmNlKSB7XG4gICAgdmFyIHggPSBjb2VyY2UoJ3gnKTtcbiAgICB2YXIgeSA9IGNvZXJjZSgneScpO1xuICAgIHZhciBsZW47XG5cbiAgICB2YXIgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY2FsZW5kYXJzJywgJ2hhbmRsZVRyYWNlRGVmYXVsdHMnKTtcbiAgICBoYW5kbGVDYWxlbmRhckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBbJ3gnLCAneSddLCBsYXlvdXQpO1xuXG4gICAgaWYoeCkge1xuICAgICAgICB2YXIgeGxlbiA9IExpYi5taW5Sb3dMZW5ndGgoeCk7XG4gICAgICAgIGlmKHkpIHtcbiAgICAgICAgICAgIGxlbiA9IE1hdGgubWluKHhsZW4sIExpYi5taW5Sb3dMZW5ndGgoeSkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGVuID0geGxlbjtcbiAgICAgICAgICAgIGNvZXJjZSgneTAnKTtcbiAgICAgICAgICAgIGNvZXJjZSgnZHknKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKCF5KSByZXR1cm4gMDtcblxuICAgICAgICBsZW4gPSBMaWIubWluUm93TGVuZ3RoKHkpO1xuICAgICAgICBjb2VyY2UoJ3gwJyk7XG4gICAgICAgIGNvZXJjZSgnZHgnKTtcbiAgICB9XG5cbiAgICB0cmFjZU91dC5fbGVuZ3RoID0gbGVuO1xuXG4gICAgcmV0dXJuIGxlbjtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxudmFyIGNhbGNNYXJrZXJDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMnKTtcbnZhciBhcnJheXNUb0NhbGNkYXRhID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hcnJheXNfdG9fY2FsY2RhdGEnKTtcbnZhciBjYWxjU2VsZWN0aW9uID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jYWxjX3NlbGVjdGlvbicpO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLl87XG5cbmZ1bmN0aW9uIGlzTm9uQmxhbmtTdHJpbmcodikge1xuICAgIHJldHVybiB2ICYmIHR5cGVvZiB2ID09PSAnc3RyaW5nJztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciBoYXNMb2NhdGlvbkRhdGEgPSBBcnJheS5pc0FycmF5KHRyYWNlLmxvY2F0aW9ucyk7XG4gICAgdmFyIGxlbiA9IGhhc0xvY2F0aW9uRGF0YSA/IHRyYWNlLmxvY2F0aW9ucy5sZW5ndGggOiB0cmFjZS5fbGVuZ3RoO1xuICAgIHZhciBjYWxjVHJhY2UgPSBuZXcgQXJyYXkobGVuKTtcblxuICAgIHZhciBpc1ZhbGlkTG9jO1xuICAgIGlmKHRyYWNlLmdlb2pzb24pIHtcbiAgICAgICAgaXNWYWxpZExvYyA9IGZ1bmN0aW9uKHYpIHsgcmV0dXJuIGlzTm9uQmxhbmtTdHJpbmcodikgfHwgaXNOdW1lcmljKHYpOyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlzVmFsaWRMb2MgPSBpc05vbkJsYW5rU3RyaW5nO1xuICAgIH1cblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgY2FsY1B0ID0gY2FsY1RyYWNlW2ldID0ge307XG5cbiAgICAgICAgaWYoaGFzTG9jYXRpb25EYXRhKSB7XG4gICAgICAgICAgICB2YXIgbG9jID0gdHJhY2UubG9jYXRpb25zW2ldO1xuICAgICAgICAgICAgY2FsY1B0LmxvYyA9IGlzVmFsaWRMb2MobG9jKSA/IGxvYyA6IG51bGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgbG9uID0gdHJhY2UubG9uW2ldO1xuICAgICAgICAgICAgdmFyIGxhdCA9IHRyYWNlLmxhdFtpXTtcblxuICAgICAgICAgICAgaWYoaXNOdW1lcmljKGxvbikgJiYgaXNOdW1lcmljKGxhdCkpIGNhbGNQdC5sb25sYXQgPSBbK2xvbiwgK2xhdF07XG4gICAgICAgICAgICBlbHNlIGNhbGNQdC5sb25sYXQgPSBbQkFETlVNLCBCQUROVU1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXJyYXlzVG9DYWxjZGF0YShjYWxjVHJhY2UsIHRyYWNlKTtcbiAgICBjYWxjTWFya2VyQ29sb3JzY2FsZShnZCwgdHJhY2UpO1xuICAgIGNhbGNTZWxlY3Rpb24oY2FsY1RyYWNlLCB0cmFjZSk7XG5cbiAgICBpZihsZW4pIHtcbiAgICAgICAgY2FsY1RyYWNlWzBdLnQgPSB7XG4gICAgICAgICAgICBsYWJlbHM6IHtcbiAgICAgICAgICAgICAgICBsYXQ6IF8oZ2QsICdsYXQ6JykgKyAnICcsXG4gICAgICAgICAgICAgICAgbG9uOiBfKGdkLCAnbG9uOicpICsgJyAnXG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIGNhbGNUcmFjZTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9