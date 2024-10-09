(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_scattergeo_js"],{

/***/ "./node_modules/plotly.js/lib/scattergeo.js":
/*!**************************************************!*\
  !*** ./node_modules/plotly.js/lib/scattergeo.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/scattergeo */ "./node_modules/plotly.js/src/traces/scattergeo/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergeo/defaults.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/defaults.js ***!
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

var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var handleMarkerDefaults = __webpack_require__(/*! ../scatter/marker_defaults */ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js");
var handleLineDefaults = __webpack_require__(/*! ../scatter/line_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js");
var handleTextDefaults = __webpack_require__(/*! ../scatter/text_defaults */ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js");
var handleFillColorDefaults = __webpack_require__(/*! ../scatter/fillcolor_defaults */ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js");

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scattergeo/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var locations = coerce('locations');
    var len;

    if(locations && locations.length) {
        var geojson = coerce('geojson');
        var locationmodeDflt;
        if((typeof geojson === 'string' && geojson !== '') || Lib.isPlainObject(geojson)) {
            locationmodeDflt = 'geojson-id';
        }

        var locationMode = coerce('locationmode', locationmodeDflt);

        if(locationMode === 'geojson-id') {
            coerce('featureidkey');
        }

        len = locations.length;
    } else {
        var lon = coerce('lon') || [];
        var lat = coerce('lat') || [];
        len = Math.min(lon.length, lat.length);
    }

    if(!len) {
        traceOut.visible = false;
        return;
    }

    traceOut._length = len;

    coerce('text');
    coerce('hovertext');
    coerce('hovertemplate');
    coerce('mode');

    if(subTypes.hasLines(traceOut)) {
        handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);
        coerce('connectgaps');
    }

    if(subTypes.hasMarkers(traceOut)) {
        handleMarkerDefaults(traceIn, traceOut, defaultColor, layout, coerce, {gradient: true});
    }

    if(subTypes.hasText(traceOut)) {
        coerce('texttemplate');
        handleTextDefaults(traceIn, traceOut, layout, coerce);
    }

    coerce('fill');
    if(traceOut.fill !== 'none') {
        handleFillColorDefaults(traceIn, traceOut, defaultColor, coerce);
    }

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergeo/event_data.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/event_data.js ***!
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
    out.lon = pt.lon;
    out.lat = pt.lat;
    out.location = pt.loc ? pt.loc : null;

    // include feature properties from input geojson
    var cdi = cd[pointNumber];
    if(cdi.fIn && cdi.fIn.properties) {
        out.properties = cdi.fIn.properties;
    }

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergeo/format_labels.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/format_labels.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

module.exports = function formatLabels(cdi, trace, fullLayout) {
    var labels = {};

    var geo = fullLayout[trace.geo]._subplot;
    var ax = geo.mockAxis;
    var lonlat = cdi.lonlat;
    labels.lonLabel = Axes.tickText(ax, ax.c2l(lonlat[0]), true).text;
    labels.latLabel = Axes.tickText(ax, ax.c2l(lonlat[1]), true).text;

    return labels;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergeo/hover.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/hover.js ***!
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



var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

var getTraceColor = __webpack_require__(/*! ../scatter/get_trace_color */ "./node_modules/plotly.js/src/traces/scatter/get_trace_color.js");
var fillText = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").fillText;
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scattergeo/attributes.js");

module.exports = function hoverPoints(pointData, xval, yval) {
    var cd = pointData.cd;
    var trace = cd[0].trace;
    var xa = pointData.xa;
    var ya = pointData.ya;
    var geo = pointData.subplot;

    var isLonLatOverEdges = geo.projection.isLonLatOverEdges;
    var project = geo.project;

    function distFn(d) {
        var lonlat = d.lonlat;

        if(lonlat[0] === BADNUM) return Infinity;
        if(isLonLatOverEdges(lonlat)) return Infinity;

        var pt = project(lonlat);
        var px = project([xval, yval]);
        var dx = Math.abs(pt[0] - px[0]);
        var dy = Math.abs(pt[1] - px[1]);
        var rad = Math.max(3, d.mrc || 0);

        // N.B. d.mrc is the calculated marker radius
        // which is only set for trace with 'markers' mode.

        return Math.max(Math.sqrt(dx * dx + dy * dy) - rad, 1 - 3 / rad);
    }

    Fx.getClosest(cd, distFn, pointData);

    // skip the rest (for this trace) if we didn't find a close point
    if(pointData.index === false) return;

    var di = cd[pointData.index];
    var lonlat = di.lonlat;
    var pos = [xa.c2p(lonlat), ya.c2p(lonlat)];
    var rad = di.mrc || 1;

    pointData.x0 = pos[0] - rad;
    pointData.x1 = pos[0] + rad;
    pointData.y0 = pos[1] - rad;
    pointData.y1 = pos[1] + rad;

    pointData.loc = di.loc;
    pointData.lon = lonlat[0];
    pointData.lat = lonlat[1];

    var fullLayout = {};
    fullLayout[trace.geo] = {_subplot: geo};
    var labels = trace._module.formatLabels(di, trace, fullLayout);
    pointData.lonLabel = labels.lonLabel;
    pointData.latLabel = labels.latLabel;

    pointData.color = getTraceColor(trace, di);
    pointData.extraText = getExtraText(trace, di, pointData, cd[0].t.labels);
    pointData.hovertemplate = trace.hovertemplate;

    return [pointData];
};

function getExtraText(trace, pt, pointData, labels) {
    if(trace.hovertemplate) return;

    var hoverinfo = pt.hi || trace.hoverinfo;

    var parts = hoverinfo === 'all' ?
        attributes.hoverinfo.flags :
        hoverinfo.split('+');

    var hasLocation = parts.indexOf('location') !== -1 && Array.isArray(trace.locations);
    var hasLon = (parts.indexOf('lon') !== -1);
    var hasLat = (parts.indexOf('lat') !== -1);
    var hasText = (parts.indexOf('text') !== -1);
    var text = [];

    function format(val) { return val + '\u00B0'; }

    if(hasLocation) {
        text.push(pt.loc);
    } else if(hasLon && hasLat) {
        text.push('(' + format(pointData.lonLabel) + ', ' + format(pointData.latLabel) + ')');
    } else if(hasLon) {
        text.push(labels.lon + format(pointData.lonLabel));
    } else if(hasLat) {
        text.push(labels.lat + format(pointData.latLabel));
    }

    if(hasText) {
        fillText(pt, trace, text);
    }

    return text.join('<br>');
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergeo/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scattergeo/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/scattergeo/defaults.js"),
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    formatLabels: __webpack_require__(/*! ./format_labels */ "./node_modules/plotly.js/src/traces/scattergeo/format_labels.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/scattergeo/calc.js"),
    calcGeoJSON: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/scattergeo/plot.js").calcGeoJSON,
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/scattergeo/plot.js").plot,
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/scattergeo/style.js"),
    styleOnSelect: __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/scattergeo/hover.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/scattergeo/event_data.js"),
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/scattergeo/select.js"),

    moduleType: 'trace',
    name: 'scattergeo',
    basePlotModule: __webpack_require__(/*! ../../plots/geo */ "./node_modules/plotly.js/src/plots/geo/index.js"),
    categories: ['geo', 'symbols', 'showLegend', 'scatter-like'],
    meta: {
        hrName: 'scatter_geo',
        description: [
            'The data visualized as scatter point or lines on a geographic map',
            'is provided either by longitude/latitude pairs in `lon` and `lat`',
            'respectively or by geographic location IDs or names in `locations`.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergeo/plot.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/plot.js ***!
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
var getTopojsonFeatures = __webpack_require__(/*! ../../lib/topojson_utils */ "./node_modules/plotly.js/src/lib/topojson_utils.js").getTopojsonFeatures;
var geoJsonUtils = __webpack_require__(/*! ../../lib/geojson_utils */ "./node_modules/plotly.js/src/lib/geojson_utils.js");
var geoUtils = __webpack_require__(/*! ../../lib/geo_location_utils */ "./node_modules/plotly.js/src/lib/geo_location_utils.js");
var findExtremes = __webpack_require__(/*! ../../plots/cartesian/autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").findExtremes;
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

var calcMarkerSize = __webpack_require__(/*! ../scatter/calc */ "./node_modules/plotly.js/src/traces/scatter/calc.js").calcMarkerSize;
var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var style = __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/scattergeo/style.js");

function plot(gd, geo, calcData) {
    var scatterLayer = geo.layers.frontplot.select('.scatterlayer');
    var gTraces = Lib.makeTraceGroups(scatterLayer, calcData, 'trace scattergeo');

    function removeBADNUM(d, node) {
        if(d.lonlat[0] === BADNUM) {
            d3.select(node).remove();
        }
    }

    // TODO find a way to order the inner nodes on update
    gTraces.selectAll('*').remove();

    gTraces.each(function(calcTrace) {
        var s = d3.select(this);
        var trace = calcTrace[0].trace;

        if(subTypes.hasLines(trace) || trace.fill !== 'none') {
            var lineCoords = geoJsonUtils.calcTraceToLineCoords(calcTrace);

            var lineData = (trace.fill !== 'none') ?
                geoJsonUtils.makePolygon(lineCoords) :
                geoJsonUtils.makeLine(lineCoords);

            s.selectAll('path.js-line')
                .data([{geojson: lineData, trace: trace}])
              .enter().append('path')
                .classed('js-line', true)
                .style('stroke-miterlimit', 2);
        }

        if(subTypes.hasMarkers(trace)) {
            s.selectAll('path.point')
                .data(Lib.identity)
             .enter().append('path')
                .classed('point', true)
                .each(function(calcPt) { removeBADNUM(calcPt, this); });
        }

        if(subTypes.hasText(trace)) {
            s.selectAll('g')
                .data(Lib.identity)
              .enter().append('g')
                .append('text')
                .each(function(calcPt) { removeBADNUM(calcPt, this); });
        }

        // call style here within topojson request callback
        style(gd, calcTrace);
    });
}

function calcGeoJSON(calcTrace, fullLayout) {
    var trace = calcTrace[0].trace;
    var geoLayout = fullLayout[trace.geo];
    var geo = geoLayout._subplot;
    var len = trace._length;
    var i, calcPt;

    if(Array.isArray(trace.locations)) {
        var locationmode = trace.locationmode;
        var features = locationmode === 'geojson-id' ?
            geoUtils.extractTraceFeature(calcTrace) :
            getTopojsonFeatures(trace, geo.topojson);

        for(i = 0; i < len; i++) {
            calcPt = calcTrace[i];

            var feature = locationmode === 'geojson-id' ?
                calcPt.fOut :
                geoUtils.locationToFeature(locationmode, calcPt.loc, features);

            calcPt.lonlat = feature ? feature.properties.ct : [BADNUM, BADNUM];
        }
    }

    var opts = {padded: true};
    var lonArray;
    var latArray;

    if(geoLayout.fitbounds === 'geojson' && trace.locationmode === 'geojson-id') {
        var bboxGeojson = geoUtils.computeBbox(geoUtils.getTraceGeojson(trace));
        lonArray = [bboxGeojson[0], bboxGeojson[2]];
        latArray = [bboxGeojson[1], bboxGeojson[3]];
    } else {
        lonArray = new Array(len);
        latArray = new Array(len);
        for(i = 0; i < len; i++) {
            calcPt = calcTrace[i];
            lonArray[i] = calcPt.lonlat[0];
            latArray[i] = calcPt.lonlat[1];
        }

        opts.ppad = calcMarkerSize(trace, len);
    }

    trace._extremes.lon = findExtremes(geoLayout.lonaxis._ax, lonArray, opts);
    trace._extremes.lat = findExtremes(geoLayout.lataxis._ax, latArray, opts);
}

module.exports = {
    calcGeoJSON: calcGeoJSON,
    plot: plot
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattergeo/select.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/select.js ***!
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



var subtypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function selectPoints(searchInfo, selectionTester) {
    var cd = searchInfo.cd;
    var xa = searchInfo.xaxis;
    var ya = searchInfo.yaxis;
    var selection = [];
    var trace = cd[0].trace;

    var di, lonlat, x, y, i;

    var hasOnlyLines = (!subtypes.hasMarkers(trace) && !subtypes.hasText(trace));
    if(hasOnlyLines) return [];

    if(selectionTester === false) {
        for(i = 0; i < cd.length; i++) {
            cd[i].selected = 0;
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            di = cd[i];
            lonlat = di.lonlat;

            // some projection types can't handle BADNUMs
            if(lonlat[0] === BADNUM) continue;

            x = xa.c2p(lonlat);
            y = ya.c2p(lonlat);

            if(selectionTester.contains([x, y], null, i, searchInfo)) {
                selection.push({
                    pointNumber: i,
                    lon: lonlat[0],
                    lat: lonlat[1]
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

/***/ "./node_modules/plotly.js/src/traces/scattergeo/style.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattergeo/style.js ***!
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
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var scatterStyle = __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js");
var stylePoints = scatterStyle.stylePoints;
var styleText = scatterStyle.styleText;

module.exports = function style(gd, calcTrace) {
    if(calcTrace) styleTrace(gd, calcTrace);
};

function styleTrace(gd, calcTrace) {
    var trace = calcTrace[0].trace;
    var s = calcTrace[0].node3;

    s.style('opacity', calcTrace[0].trace.opacity);

    stylePoints(s, trace, gd);
    styleText(s, trace, gd);

    // this part is incompatible with Drawing.lineGroupStyle
    s.selectAll('path.js-line')
        .style('fill', 'none')
        .each(function(d) {
            var path = d3.select(this);
            var trace = d.trace;
            var line = trace.line || {};

            path.call(Color.stroke, line.color)
                .call(Drawing.dashLine, line.dash || '', line.width || 0);

            if(trace.fill !== 'none') {
                path.call(Color.fill, trace.fillcolor);
            }
        });
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc2NhdHRlcmdlby5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJnZW8vZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyZ2VvL2V2ZW50X2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyZ2VvL2Zvcm1hdF9sYWJlbHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVyZ2VvL2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcmdlby9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJnZW8vcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJnZW8vc2VsZWN0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcmdlby9zdHlsZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYiwrSEFBb0Q7Ozs7Ozs7Ozs7OztBQ1ZwRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMs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QUFDLG9GQUFxQjtBQUM1QyxhQUFhLGtIQUEyQzs7QUFFeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsZUFBZTtBQUNqQztBQUNBO0FBQ0EsS0FBSztBQUNMLGtCQUFrQixlQUFlO0FBQ2pDO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxtQ0FBSTtBQUNyQixjQUFjLG1CQUFPLENBQUMsMEZBQTBCO0FBQ2hELFlBQVksbUJBQU8sQ0FBQyxzRkFBd0I7O0FBRTVDLG1CQUFtQixtQkFBTyxDQUFDLDhFQUFrQjtBQUM3QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCIsImZpbGUiOiJjaGFydDY5NTVkZTkwM2FlZTgzNzc1YjcwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvc2NhdHRlcmdlbycpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBzdWJUeXBlcyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvc3VidHlwZXMnKTtcbnZhciBoYW5kbGVNYXJrZXJEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFya2VyX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlTGluZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9saW5lX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlVGV4dERlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci90ZXh0X2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlRmlsbENvbG9yRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2ZpbGxjb2xvcl9kZWZhdWx0cycpO1xuXG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbG9jYXRpb25zID0gY29lcmNlKCdsb2NhdGlvbnMnKTtcbiAgICB2YXIgbGVuO1xuXG4gICAgaWYobG9jYXRpb25zICYmIGxvY2F0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGdlb2pzb24gPSBjb2VyY2UoJ2dlb2pzb24nKTtcbiAgICAgICAgdmFyIGxvY2F0aW9ubW9kZURmbHQ7XG4gICAgICAgIGlmKCh0eXBlb2YgZ2VvanNvbiA9PT0gJ3N0cmluZycgJiYgZ2VvanNvbiAhPT0gJycpIHx8IExpYi5pc1BsYWluT2JqZWN0KGdlb2pzb24pKSB7XG4gICAgICAgICAgICBsb2NhdGlvbm1vZGVEZmx0ID0gJ2dlb2pzb24taWQnO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxvY2F0aW9uTW9kZSA9IGNvZXJjZSgnbG9jYXRpb25tb2RlJywgbG9jYXRpb25tb2RlRGZsdCk7XG5cbiAgICAgICAgaWYobG9jYXRpb25Nb2RlID09PSAnZ2VvanNvbi1pZCcpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnZmVhdHVyZWlka2V5Jyk7XG4gICAgICAgIH1cblxuICAgICAgICBsZW4gPSBsb2NhdGlvbnMubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBsb24gPSBjb2VyY2UoJ2xvbicpIHx8IFtdO1xuICAgICAgICB2YXIgbGF0ID0gY29lcmNlKCdsYXQnKSB8fCBbXTtcbiAgICAgICAgbGVuID0gTWF0aC5taW4obG9uLmxlbmd0aCwgbGF0Lmxlbmd0aCk7XG4gICAgfVxuXG4gICAgaWYoIWxlbikge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cmFjZU91dC5fbGVuZ3RoID0gbGVuO1xuXG4gICAgY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcbiAgICBjb2VyY2UoJ21vZGUnKTtcblxuICAgIGlmKHN1YlR5cGVzLmhhc0xpbmVzKHRyYWNlT3V0KSkge1xuICAgICAgICBoYW5kbGVMaW5lRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UpO1xuICAgICAgICBjb2VyY2UoJ2Nvbm5lY3RnYXBzJyk7XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzTWFya2Vycyh0cmFjZU91dCkpIHtcbiAgICAgICAgaGFuZGxlTWFya2VyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UsIHtncmFkaWVudDogdHJ1ZX0pO1xuICAgIH1cblxuICAgIGlmKHN1YlR5cGVzLmhhc1RleHQodHJhY2VPdXQpKSB7XG4gICAgICAgIGNvZXJjZSgndGV4dHRlbXBsYXRlJyk7XG4gICAgICAgIGhhbmRsZVRleHREZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuICAgIH1cblxuICAgIGNvZXJjZSgnZmlsbCcpO1xuICAgIGlmKHRyYWNlT3V0LmZpbGwgIT09ICdub25lJykge1xuICAgICAgICBoYW5kbGVGaWxsQ29sb3JEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBjb2VyY2UpO1xuICAgIH1cblxuICAgIExpYi5jb2VyY2VTZWxlY3Rpb25NYXJrZXJPcGFjaXR5KHRyYWNlT3V0LCBjb2VyY2UpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZXZlbnREYXRhKG91dCwgcHQsIHRyYWNlLCBjZCwgcG9pbnROdW1iZXIpIHtcbiAgICBvdXQubG9uID0gcHQubG9uO1xuICAgIG91dC5sYXQgPSBwdC5sYXQ7XG4gICAgb3V0LmxvY2F0aW9uID0gcHQubG9jID8gcHQubG9jIDogbnVsbDtcblxuICAgIC8vIGluY2x1ZGUgZmVhdHVyZSBwcm9wZXJ0aWVzIGZyb20gaW5wdXQgZ2VvanNvblxuICAgIHZhciBjZGkgPSBjZFtwb2ludE51bWJlcl07XG4gICAgaWYoY2RpLmZJbiAmJiBjZGkuZkluLnByb3BlcnRpZXMpIHtcbiAgICAgICAgb3V0LnByb3BlcnRpZXMgPSBjZGkuZkluLnByb3BlcnRpZXM7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JtYXRMYWJlbHMoY2RpLCB0cmFjZSwgZnVsbExheW91dCkge1xuICAgIHZhciBsYWJlbHMgPSB7fTtcblxuICAgIHZhciBnZW8gPSBmdWxsTGF5b3V0W3RyYWNlLmdlb10uX3N1YnBsb3Q7XG4gICAgdmFyIGF4ID0gZ2VvLm1vY2tBeGlzO1xuICAgIHZhciBsb25sYXQgPSBjZGkubG9ubGF0O1xuICAgIGxhYmVscy5sb25MYWJlbCA9IEF4ZXMudGlja1RleHQoYXgsIGF4LmMybChsb25sYXRbMF0pLCB0cnVlKS50ZXh0O1xuICAgIGxhYmVscy5sYXRMYWJlbCA9IEF4ZXMudGlja1RleHQoYXgsIGF4LmMybChsb25sYXRbMV0pLCB0cnVlKS50ZXh0O1xuXG4gICAgcmV0dXJuIGxhYmVscztcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBGeCA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngnKTtcbnZhciBCQUROVU0gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvbnVtZXJpY2FsJykuQkFETlVNO1xuXG52YXIgZ2V0VHJhY2VDb2xvciA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvZ2V0X3RyYWNlX2NvbG9yJyk7XG52YXIgZmlsbFRleHQgPSByZXF1aXJlKCcuLi8uLi9saWInKS5maWxsVGV4dDtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsKSB7XG4gICAgdmFyIGNkID0gcG9pbnREYXRhLmNkO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciB4YSA9IHBvaW50RGF0YS54YTtcbiAgICB2YXIgeWEgPSBwb2ludERhdGEueWE7XG4gICAgdmFyIGdlbyA9IHBvaW50RGF0YS5zdWJwbG90O1xuXG4gICAgdmFyIGlzTG9uTGF0T3ZlckVkZ2VzID0gZ2VvLnByb2plY3Rpb24uaXNMb25MYXRPdmVyRWRnZXM7XG4gICAgdmFyIHByb2plY3QgPSBnZW8ucHJvamVjdDtcblxuICAgIGZ1bmN0aW9uIGRpc3RGbihkKSB7XG4gICAgICAgIHZhciBsb25sYXQgPSBkLmxvbmxhdDtcblxuICAgICAgICBpZihsb25sYXRbMF0gPT09IEJBRE5VTSkgcmV0dXJuIEluZmluaXR5O1xuICAgICAgICBpZihpc0xvbkxhdE92ZXJFZGdlcyhsb25sYXQpKSByZXR1cm4gSW5maW5pdHk7XG5cbiAgICAgICAgdmFyIHB0ID0gcHJvamVjdChsb25sYXQpO1xuICAgICAgICB2YXIgcHggPSBwcm9qZWN0KFt4dmFsLCB5dmFsXSk7XG4gICAgICAgIHZhciBkeCA9IE1hdGguYWJzKHB0WzBdIC0gcHhbMF0pO1xuICAgICAgICB2YXIgZHkgPSBNYXRoLmFicyhwdFsxXSAtIHB4WzFdKTtcbiAgICAgICAgdmFyIHJhZCA9IE1hdGgubWF4KDMsIGQubXJjIHx8IDApO1xuXG4gICAgICAgIC8vIE4uQi4gZC5tcmMgaXMgdGhlIGNhbGN1bGF0ZWQgbWFya2VyIHJhZGl1c1xuICAgICAgICAvLyB3aGljaCBpcyBvbmx5IHNldCBmb3IgdHJhY2Ugd2l0aCAnbWFya2VycycgbW9kZS5cblxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KSAtIHJhZCwgMSAtIDMgLyByYWQpO1xuICAgIH1cblxuICAgIEZ4LmdldENsb3Nlc3QoY2QsIGRpc3RGbiwgcG9pbnREYXRhKTtcblxuICAgIC8vIHNraXAgdGhlIHJlc3QgKGZvciB0aGlzIHRyYWNlKSBpZiB3ZSBkaWRuJ3QgZmluZCBhIGNsb3NlIHBvaW50XG4gICAgaWYocG9pbnREYXRhLmluZGV4ID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgdmFyIGRpID0gY2RbcG9pbnREYXRhLmluZGV4XTtcbiAgICB2YXIgbG9ubGF0ID0gZGkubG9ubGF0O1xuICAgIHZhciBwb3MgPSBbeGEuYzJwKGxvbmxhdCksIHlhLmMycChsb25sYXQpXTtcbiAgICB2YXIgcmFkID0gZGkubXJjIHx8IDE7XG5cbiAgICBwb2ludERhdGEueDAgPSBwb3NbMF0gLSByYWQ7XG4gICAgcG9pbnREYXRhLngxID0gcG9zWzBdICsgcmFkO1xuICAgIHBvaW50RGF0YS55MCA9IHBvc1sxXSAtIHJhZDtcbiAgICBwb2ludERhdGEueTEgPSBwb3NbMV0gKyByYWQ7XG5cbiAgICBwb2ludERhdGEubG9jID0gZGkubG9jO1xuICAgIHBvaW50RGF0YS5sb24gPSBsb25sYXRbMF07XG4gICAgcG9pbnREYXRhLmxhdCA9IGxvbmxhdFsxXTtcblxuICAgIHZhciBmdWxsTGF5b3V0ID0ge307XG4gICAgZnVsbExheW91dFt0cmFjZS5nZW9dID0ge19zdWJwbG90OiBnZW99O1xuICAgIHZhciBsYWJlbHMgPSB0cmFjZS5fbW9kdWxlLmZvcm1hdExhYmVscyhkaSwgdHJhY2UsIGZ1bGxMYXlvdXQpO1xuICAgIHBvaW50RGF0YS5sb25MYWJlbCA9IGxhYmVscy5sb25MYWJlbDtcbiAgICBwb2ludERhdGEubGF0TGFiZWwgPSBsYWJlbHMubGF0TGFiZWw7XG5cbiAgICBwb2ludERhdGEuY29sb3IgPSBnZXRUcmFjZUNvbG9yKHRyYWNlLCBkaSk7XG4gICAgcG9pbnREYXRhLmV4dHJhVGV4dCA9IGdldEV4dHJhVGV4dCh0cmFjZSwgZGksIHBvaW50RGF0YSwgY2RbMF0udC5sYWJlbHMpO1xuICAgIHBvaW50RGF0YS5ob3ZlcnRlbXBsYXRlID0gdHJhY2UuaG92ZXJ0ZW1wbGF0ZTtcblxuICAgIHJldHVybiBbcG9pbnREYXRhXTtcbn07XG5cbmZ1bmN0aW9uIGdldEV4dHJhVGV4dCh0cmFjZSwgcHQsIHBvaW50RGF0YSwgbGFiZWxzKSB7XG4gICAgaWYodHJhY2UuaG92ZXJ0ZW1wbGF0ZSkgcmV0dXJuO1xuXG4gICAgdmFyIGhvdmVyaW5mbyA9IHB0LmhpIHx8IHRyYWNlLmhvdmVyaW5mbztcblxuICAgIHZhciBwYXJ0cyA9IGhvdmVyaW5mbyA9PT0gJ2FsbCcgP1xuICAgICAgICBhdHRyaWJ1dGVzLmhvdmVyaW5mby5mbGFncyA6XG4gICAgICAgIGhvdmVyaW5mby5zcGxpdCgnKycpO1xuXG4gICAgdmFyIGhhc0xvY2F0aW9uID0gcGFydHMuaW5kZXhPZignbG9jYXRpb24nKSAhPT0gLTEgJiYgQXJyYXkuaXNBcnJheSh0cmFjZS5sb2NhdGlvbnMpO1xuICAgIHZhciBoYXNMb24gPSAocGFydHMuaW5kZXhPZignbG9uJykgIT09IC0xKTtcbiAgICB2YXIgaGFzTGF0ID0gKHBhcnRzLmluZGV4T2YoJ2xhdCcpICE9PSAtMSk7XG4gICAgdmFyIGhhc1RleHQgPSAocGFydHMuaW5kZXhPZigndGV4dCcpICE9PSAtMSk7XG4gICAgdmFyIHRleHQgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdCh2YWwpIHsgcmV0dXJuIHZhbCArICdcXHUwMEIwJzsgfVxuXG4gICAgaWYoaGFzTG9jYXRpb24pIHtcbiAgICAgICAgdGV4dC5wdXNoKHB0LmxvYyk7XG4gICAgfSBlbHNlIGlmKGhhc0xvbiAmJiBoYXNMYXQpIHtcbiAgICAgICAgdGV4dC5wdXNoKCcoJyArIGZvcm1hdChwb2ludERhdGEubG9uTGFiZWwpICsgJywgJyArIGZvcm1hdChwb2ludERhdGEubGF0TGFiZWwpICsgJyknKTtcbiAgICB9IGVsc2UgaWYoaGFzTG9uKSB7XG4gICAgICAgIHRleHQucHVzaChsYWJlbHMubG9uICsgZm9ybWF0KHBvaW50RGF0YS5sb25MYWJlbCkpO1xuICAgIH0gZWxzZSBpZihoYXNMYXQpIHtcbiAgICAgICAgdGV4dC5wdXNoKGxhYmVscy5sYXQgKyBmb3JtYXQocG9pbnREYXRhLmxhdExhYmVsKSk7XG4gICAgfVxuXG4gICAgaWYoaGFzVGV4dCkge1xuICAgICAgICBmaWxsVGV4dChwdCwgdHJhY2UsIHRleHQpO1xuICAgIH1cblxuICAgIHJldHVybiB0ZXh0LmpvaW4oJzxicj4nKTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cmlidXRlczogcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyksXG4gICAgc3VwcGx5RGVmYXVsdHM6IHJlcXVpcmUoJy4vZGVmYXVsdHMnKSxcbiAgICBjb2xvcmJhcjogcmVxdWlyZSgnLi4vc2NhdHRlci9tYXJrZXJfY29sb3JiYXInKSxcbiAgICBmb3JtYXRMYWJlbHM6IHJlcXVpcmUoJy4vZm9ybWF0X2xhYmVscycpLFxuICAgIGNhbGM6IHJlcXVpcmUoJy4vY2FsYycpLFxuICAgIGNhbGNHZW9KU09OOiByZXF1aXJlKCcuL3Bsb3QnKS5jYWxjR2VvSlNPTixcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKS5wbG90LFxuICAgIHN0eWxlOiByZXF1aXJlKCcuL3N0eWxlJyksXG4gICAgc3R5bGVPblNlbGVjdDogcmVxdWlyZSgnLi4vc2NhdHRlci9zdHlsZScpLnN0eWxlT25TZWxlY3QsXG4gICAgaG92ZXJQb2ludHM6IHJlcXVpcmUoJy4vaG92ZXInKSxcbiAgICBldmVudERhdGE6IHJlcXVpcmUoJy4vZXZlbnRfZGF0YScpLFxuICAgIHNlbGVjdFBvaW50czogcmVxdWlyZSgnLi9zZWxlY3QnKSxcblxuICAgIG1vZHVsZVR5cGU6ICd0cmFjZScsXG4gICAgbmFtZTogJ3NjYXR0ZXJnZW8nLFxuICAgIGJhc2VQbG90TW9kdWxlOiByZXF1aXJlKCcuLi8uLi9wbG90cy9nZW8nKSxcbiAgICBjYXRlZ29yaWVzOiBbJ2dlbycsICdzeW1ib2xzJywgJ3Nob3dMZWdlbmQnLCAnc2NhdHRlci1saWtlJ10sXG4gICAgbWV0YToge1xuICAgICAgICBock5hbWU6ICdzY2F0dGVyX2dlbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIGRhdGEgdmlzdWFsaXplZCBhcyBzY2F0dGVyIHBvaW50IG9yIGxpbmVzIG9uIGEgZ2VvZ3JhcGhpYyBtYXAnLFxuICAgICAgICAgICAgJ2lzIHByb3ZpZGVkIGVpdGhlciBieSBsb25naXR1ZGUvbGF0aXR1ZGUgcGFpcnMgaW4gYGxvbmAgYW5kIGBsYXRgJyxcbiAgICAgICAgICAgICdyZXNwZWN0aXZlbHkgb3IgYnkgZ2VvZ3JhcGhpYyBsb2NhdGlvbiBJRHMgb3IgbmFtZXMgaW4gYGxvY2F0aW9uc2AuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBnZXRUb3BvanNvbkZlYXR1cmVzID0gcmVxdWlyZSgnLi4vLi4vbGliL3RvcG9qc29uX3V0aWxzJykuZ2V0VG9wb2pzb25GZWF0dXJlcztcbnZhciBnZW9Kc29uVXRpbHMgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2VvanNvbl91dGlscycpO1xudmFyIGdlb1V0aWxzID0gcmVxdWlyZSgnLi4vLi4vbGliL2dlb19sb2NhdGlvbl91dGlscycpO1xudmFyIGZpbmRFeHRyZW1lcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9hdXRvcmFuZ2UnKS5maW5kRXh0cmVtZXM7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxudmFyIGNhbGNNYXJrZXJTaXplID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jYWxjJykuY2FsY01hcmtlclNpemU7XG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgc3R5bGUgPSByZXF1aXJlKCcuL3N0eWxlJyk7XG5cbmZ1bmN0aW9uIHBsb3QoZ2QsIGdlbywgY2FsY0RhdGEpIHtcbiAgICB2YXIgc2NhdHRlckxheWVyID0gZ2VvLmxheWVycy5mcm9udHBsb3Quc2VsZWN0KCcuc2NhdHRlcmxheWVyJyk7XG4gICAgdmFyIGdUcmFjZXMgPSBMaWIubWFrZVRyYWNlR3JvdXBzKHNjYXR0ZXJMYXllciwgY2FsY0RhdGEsICd0cmFjZSBzY2F0dGVyZ2VvJyk7XG5cbiAgICBmdW5jdGlvbiByZW1vdmVCQUROVU0oZCwgbm9kZSkge1xuICAgICAgICBpZihkLmxvbmxhdFswXSA9PT0gQkFETlVNKSB7XG4gICAgICAgICAgICBkMy5zZWxlY3Qobm9kZSkucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBUT0RPIGZpbmQgYSB3YXkgdG8gb3JkZXIgdGhlIGlubmVyIG5vZGVzIG9uIHVwZGF0ZVxuICAgIGdUcmFjZXMuc2VsZWN0QWxsKCcqJykucmVtb3ZlKCk7XG5cbiAgICBnVHJhY2VzLmVhY2goZnVuY3Rpb24oY2FsY1RyYWNlKSB7XG4gICAgICAgIHZhciBzID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgdHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG5cbiAgICAgICAgaWYoc3ViVHlwZXMuaGFzTGluZXModHJhY2UpIHx8IHRyYWNlLmZpbGwgIT09ICdub25lJykge1xuICAgICAgICAgICAgdmFyIGxpbmVDb29yZHMgPSBnZW9Kc29uVXRpbHMuY2FsY1RyYWNlVG9MaW5lQ29vcmRzKGNhbGNUcmFjZSk7XG5cbiAgICAgICAgICAgIHZhciBsaW5lRGF0YSA9ICh0cmFjZS5maWxsICE9PSAnbm9uZScpID9cbiAgICAgICAgICAgICAgICBnZW9Kc29uVXRpbHMubWFrZVBvbHlnb24obGluZUNvb3JkcykgOlxuICAgICAgICAgICAgICAgIGdlb0pzb25VdGlscy5tYWtlTGluZShsaW5lQ29vcmRzKTtcblxuICAgICAgICAgICAgcy5zZWxlY3RBbGwoJ3BhdGguanMtbGluZScpXG4gICAgICAgICAgICAgICAgLmRhdGEoW3tnZW9qc29uOiBsaW5lRGF0YSwgdHJhY2U6IHRyYWNlfV0pXG4gICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2pzLWxpbmUnLCB0cnVlKVxuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLW1pdGVybGltaXQnLCAyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHN1YlR5cGVzLmhhc01hcmtlcnModHJhY2UpKSB7XG4gICAgICAgICAgICBzLnNlbGVjdEFsbCgncGF0aC5wb2ludCcpXG4gICAgICAgICAgICAgICAgLmRhdGEoTGliLmlkZW50aXR5KVxuICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3BvaW50JywgdHJ1ZSlcbiAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbihjYWxjUHQpIHsgcmVtb3ZlQkFETlVNKGNhbGNQdCwgdGhpcyk7IH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoc3ViVHlwZXMuaGFzVGV4dCh0cmFjZSkpIHtcbiAgICAgICAgICAgIHMuc2VsZWN0QWxsKCdnJylcbiAgICAgICAgICAgICAgICAuZGF0YShMaWIuaWRlbnRpdHkpXG4gICAgICAgICAgICAgIC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgICAgICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oY2FsY1B0KSB7IHJlbW92ZUJBRE5VTShjYWxjUHQsIHRoaXMpOyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNhbGwgc3R5bGUgaGVyZSB3aXRoaW4gdG9wb2pzb24gcmVxdWVzdCBjYWxsYmFja1xuICAgICAgICBzdHlsZShnZCwgY2FsY1RyYWNlKTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gY2FsY0dlb0pTT04oY2FsY1RyYWNlLCBmdWxsTGF5b3V0KSB7XG4gICAgdmFyIHRyYWNlID0gY2FsY1RyYWNlWzBdLnRyYWNlO1xuICAgIHZhciBnZW9MYXlvdXQgPSBmdWxsTGF5b3V0W3RyYWNlLmdlb107XG4gICAgdmFyIGdlbyA9IGdlb0xheW91dC5fc3VicGxvdDtcbiAgICB2YXIgbGVuID0gdHJhY2UuX2xlbmd0aDtcbiAgICB2YXIgaSwgY2FsY1B0O1xuXG4gICAgaWYoQXJyYXkuaXNBcnJheSh0cmFjZS5sb2NhdGlvbnMpKSB7XG4gICAgICAgIHZhciBsb2NhdGlvbm1vZGUgPSB0cmFjZS5sb2NhdGlvbm1vZGU7XG4gICAgICAgIHZhciBmZWF0dXJlcyA9IGxvY2F0aW9ubW9kZSA9PT0gJ2dlb2pzb24taWQnID9cbiAgICAgICAgICAgIGdlb1V0aWxzLmV4dHJhY3RUcmFjZUZlYXR1cmUoY2FsY1RyYWNlKSA6XG4gICAgICAgICAgICBnZXRUb3BvanNvbkZlYXR1cmVzKHRyYWNlLCBnZW8udG9wb2pzb24pO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjYWxjUHQgPSBjYWxjVHJhY2VbaV07XG5cbiAgICAgICAgICAgIHZhciBmZWF0dXJlID0gbG9jYXRpb25tb2RlID09PSAnZ2VvanNvbi1pZCcgP1xuICAgICAgICAgICAgICAgIGNhbGNQdC5mT3V0IDpcbiAgICAgICAgICAgICAgICBnZW9VdGlscy5sb2NhdGlvblRvRmVhdHVyZShsb2NhdGlvbm1vZGUsIGNhbGNQdC5sb2MsIGZlYXR1cmVzKTtcblxuICAgICAgICAgICAgY2FsY1B0LmxvbmxhdCA9IGZlYXR1cmUgPyBmZWF0dXJlLnByb3BlcnRpZXMuY3QgOiBbQkFETlVNLCBCQUROVU1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIG9wdHMgPSB7cGFkZGVkOiB0cnVlfTtcbiAgICB2YXIgbG9uQXJyYXk7XG4gICAgdmFyIGxhdEFycmF5O1xuXG4gICAgaWYoZ2VvTGF5b3V0LmZpdGJvdW5kcyA9PT0gJ2dlb2pzb24nICYmIHRyYWNlLmxvY2F0aW9ubW9kZSA9PT0gJ2dlb2pzb24taWQnKSB7XG4gICAgICAgIHZhciBiYm94R2VvanNvbiA9IGdlb1V0aWxzLmNvbXB1dGVCYm94KGdlb1V0aWxzLmdldFRyYWNlR2VvanNvbih0cmFjZSkpO1xuICAgICAgICBsb25BcnJheSA9IFtiYm94R2VvanNvblswXSwgYmJveEdlb2pzb25bMl1dO1xuICAgICAgICBsYXRBcnJheSA9IFtiYm94R2VvanNvblsxXSwgYmJveEdlb2pzb25bM11dO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvbkFycmF5ID0gbmV3IEFycmF5KGxlbik7XG4gICAgICAgIGxhdEFycmF5ID0gbmV3IEFycmF5KGxlbik7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICBjYWxjUHQgPSBjYWxjVHJhY2VbaV07XG4gICAgICAgICAgICBsb25BcnJheVtpXSA9IGNhbGNQdC5sb25sYXRbMF07XG4gICAgICAgICAgICBsYXRBcnJheVtpXSA9IGNhbGNQdC5sb25sYXRbMV07XG4gICAgICAgIH1cblxuICAgICAgICBvcHRzLnBwYWQgPSBjYWxjTWFya2VyU2l6ZSh0cmFjZSwgbGVuKTtcbiAgICB9XG5cbiAgICB0cmFjZS5fZXh0cmVtZXMubG9uID0gZmluZEV4dHJlbWVzKGdlb0xheW91dC5sb25heGlzLl9heCwgbG9uQXJyYXksIG9wdHMpO1xuICAgIHRyYWNlLl9leHRyZW1lcy5sYXQgPSBmaW5kRXh0cmVtZXMoZ2VvTGF5b3V0LmxhdGF4aXMuX2F4LCBsYXRBcnJheSwgb3B0cyk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGNhbGNHZW9KU09OOiBjYWxjR2VvSlNPTixcbiAgICBwbG90OiBwbG90XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc3VidHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgQkFETlVNID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkJBRE5VTTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZWxlY3RQb2ludHMoc2VhcmNoSW5mbywgc2VsZWN0aW9uVGVzdGVyKSB7XG4gICAgdmFyIGNkID0gc2VhcmNoSW5mby5jZDtcbiAgICB2YXIgeGEgPSBzZWFyY2hJbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHNlYXJjaEluZm8ueWF4aXM7XG4gICAgdmFyIHNlbGVjdGlvbiA9IFtdO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuXG4gICAgdmFyIGRpLCBsb25sYXQsIHgsIHksIGk7XG5cbiAgICB2YXIgaGFzT25seUxpbmVzID0gKCFzdWJ0eXBlcy5oYXNNYXJrZXJzKHRyYWNlKSAmJiAhc3VidHlwZXMuaGFzVGV4dCh0cmFjZSkpO1xuICAgIGlmKGhhc09ubHlMaW5lcykgcmV0dXJuIFtdO1xuXG4gICAgaWYoc2VsZWN0aW9uVGVzdGVyID09PSBmYWxzZSkge1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2RbaV0uc2VsZWN0ZWQgPSAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRpID0gY2RbaV07XG4gICAgICAgICAgICBsb25sYXQgPSBkaS5sb25sYXQ7XG5cbiAgICAgICAgICAgIC8vIHNvbWUgcHJvamVjdGlvbiB0eXBlcyBjYW4ndCBoYW5kbGUgQkFETlVNc1xuICAgICAgICAgICAgaWYobG9ubGF0WzBdID09PSBCQUROVU0pIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB4ID0geGEuYzJwKGxvbmxhdCk7XG4gICAgICAgICAgICB5ID0geWEuYzJwKGxvbmxhdCk7XG5cbiAgICAgICAgICAgIGlmKHNlbGVjdGlvblRlc3Rlci5jb250YWlucyhbeCwgeV0sIG51bGwsIGksIHNlYXJjaEluZm8pKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0aW9uLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBwb2ludE51bWJlcjogaSxcbiAgICAgICAgICAgICAgICAgICAgbG9uOiBsb25sYXRbMF0sXG4gICAgICAgICAgICAgICAgICAgIGxhdDogbG9ubGF0WzFdXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZGkuc2VsZWN0ZWQgPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkaS5zZWxlY3RlZCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG5cbnZhciBzY2F0dGVyU3R5bGUgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N0eWxlJyk7XG52YXIgc3R5bGVQb2ludHMgPSBzY2F0dGVyU3R5bGUuc3R5bGVQb2ludHM7XG52YXIgc3R5bGVUZXh0ID0gc2NhdHRlclN0eWxlLnN0eWxlVGV4dDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdHlsZShnZCwgY2FsY1RyYWNlKSB7XG4gICAgaWYoY2FsY1RyYWNlKSBzdHlsZVRyYWNlKGdkLCBjYWxjVHJhY2UpO1xufTtcblxuZnVuY3Rpb24gc3R5bGVUcmFjZShnZCwgY2FsY1RyYWNlKSB7XG4gICAgdmFyIHRyYWNlID0gY2FsY1RyYWNlWzBdLnRyYWNlO1xuICAgIHZhciBzID0gY2FsY1RyYWNlWzBdLm5vZGUzO1xuXG4gICAgcy5zdHlsZSgnb3BhY2l0eScsIGNhbGNUcmFjZVswXS50cmFjZS5vcGFjaXR5KTtcblxuICAgIHN0eWxlUG9pbnRzKHMsIHRyYWNlLCBnZCk7XG4gICAgc3R5bGVUZXh0KHMsIHRyYWNlLCBnZCk7XG5cbiAgICAvLyB0aGlzIHBhcnQgaXMgaW5jb21wYXRpYmxlIHdpdGggRHJhd2luZy5saW5lR3JvdXBTdHlsZVxuICAgIHMuc2VsZWN0QWxsKCdwYXRoLmpzLWxpbmUnKVxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciBwYXRoID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgdmFyIHRyYWNlID0gZC50cmFjZTtcbiAgICAgICAgICAgIHZhciBsaW5lID0gdHJhY2UubGluZSB8fCB7fTtcblxuICAgICAgICAgICAgcGF0aC5jYWxsKENvbG9yLnN0cm9rZSwgbGluZS5jb2xvcilcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLmRhc2hMaW5lLCBsaW5lLmRhc2ggfHwgJycsIGxpbmUud2lkdGggfHwgMCk7XG5cbiAgICAgICAgICAgIGlmKHRyYWNlLmZpbGwgIT09ICdub25lJykge1xuICAgICAgICAgICAgICAgIHBhdGguY2FsbChDb2xvci5maWxsLCB0cmFjZS5maWxsY29sb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=