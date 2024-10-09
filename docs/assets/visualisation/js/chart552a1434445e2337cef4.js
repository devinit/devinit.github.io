(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_scattermapbox_js"],{

/***/ "./node_modules/plotly.js/lib/scattermapbox.js":
/*!*****************************************************!*\
  !*** ./node_modules/plotly.js/lib/scattermapbox.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/scattermapbox */ "./node_modules/plotly.js/src/traces/scattermapbox/index.js");


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


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/attributes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/attributes.js ***!
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



var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;
var scatterGeoAttrs = __webpack_require__(/*! ../scattergeo/attributes */ "./node_modules/plotly.js/src/traces/scattergeo/attributes.js");
var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var mapboxAttrs = __webpack_require__(/*! ../../plots/mapbox/layout_attributes */ "./node_modules/plotly.js/src/plots/mapbox/layout_attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var lineAttrs = scatterGeoAttrs.line;
var markerAttrs = scatterGeoAttrs.marker;

module.exports = overrideAll({
    lon: scatterGeoAttrs.lon,
    lat: scatterGeoAttrs.lat,

    // locations
    // locationmode

    mode: extendFlat({}, scatterAttrs.mode, {
        dflt: 'markers',
        description: [
            'Determines the drawing mode for this scatter trace.',
            'If the provided `mode` includes *text* then the `text` elements',
            'appear at the coordinates. Otherwise, the `text` elements',
            'appear on hover.'
        ].join(' ')
    }),

    text: extendFlat({}, scatterAttrs.text, {
        description: [
            'Sets text elements associated with each (lon,lat) pair',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (lon,lat) coordinates.',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    }),
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: ['lat', 'lon', 'text']
    }),
    hovertext: extendFlat({}, scatterAttrs.hovertext, {
        description: [
            'Sets hover text elements associated with each (lon,lat) pair',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s (lon,lat) coordinates.',
            'To be seen, trace `hoverinfo` must contain a *text* flag.'
        ].join(' ')
    }),

    line: {
        color: lineAttrs.color,
        width: lineAttrs.width

        // TODO
        // dash: dash
    },

    connectgaps: scatterAttrs.connectgaps,

    marker: extendFlat({
        symbol: {
            valType: 'string',
            dflt: 'circle',
            role: 'style',
            arrayOk: true,
            description: [
                'Sets the marker symbol.',
                'Full list: https://www.mapbox.com/maki-icons/',
                'Note that the array `marker.color` and `marker.size`',
                'are only available for *circle* symbols.'
            ].join(' ')
        },
        angle: {
            valType: 'number',
            dflt: 'auto',
            role: 'style',
            arrayOk: true,
            description: [
                'Sets the marker orientation from true North, in degrees clockwise.',
                'When using the *auto* default, no rotation would be applied',
                'in perspective views which is different from using a zero angle.'
            ].join(' ')
        },
        allowoverlap: {
            valType: 'boolean',
            dflt: false,
            role: 'style',
            description: [
                'Flag to draw all symbols, even if they overlap.'
            ].join(' ')
        },
        opacity: markerAttrs.opacity,
        size: markerAttrs.size,
        sizeref: markerAttrs.sizeref,
        sizemin: markerAttrs.sizemin,
        sizemode: markerAttrs.sizemode
    },
        colorScaleAttrs('marker')
        // line
    ),

    fill: scatterGeoAttrs.fill,
    fillcolor: scatterAttrs.fillcolor,

    textfont: mapboxAttrs.layers.symbol.textfont,
    textposition: mapboxAttrs.layers.symbol.textposition,

    below: {
        valType: 'string',
        role: 'info',
        description: [
            'Determines if this scattermapbox trace\'s layers are to be inserted',
            'before the layer with the specified ID.',
            'By default, scattermapbox layers are inserted',
            'above all the base layers.',
            'To place the scattermapbox layers above every other layer, set `below` to *\'\'*.'
        ].join(' ')
    },

    selected: {
        marker: scatterAttrs.selected.marker
    },
    unselected: {
        marker: scatterAttrs.unselected.marker
    },

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['lon', 'lat', 'text', 'name']
    }),
    hovertemplate: hovertemplateAttrs(),
}, 'calc', 'nested');


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/convert.js":
/*!********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/convert.js ***!
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
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;
var geoJsonUtils = __webpack_require__(/*! ../../lib/geojson_utils */ "./node_modules/plotly.js/src/lib/geojson_utils.js");

var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var makeBubbleSizeFn = __webpack_require__(/*! ../scatter/make_bubble_size_func */ "./node_modules/plotly.js/src/traces/scatter/make_bubble_size_func.js");
var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var convertTextOpts = __webpack_require__(/*! ../../plots/mapbox/convert_text_opts */ "./node_modules/plotly.js/src/plots/mapbox/convert_text_opts.js");
var appendArrayPointValue = __webpack_require__(/*! ../../components/fx/helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").appendArrayPointValue;

var NEWLINES = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js").NEWLINES;
var BR_TAG_ALL = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js").BR_TAG_ALL;

module.exports = function convert(gd, calcTrace) {
    var trace = calcTrace[0].trace;

    var isVisible = (trace.visible === true && trace._length !== 0);
    var hasFill = (trace.fill !== 'none');
    var hasLines = subTypes.hasLines(trace);
    var hasMarkers = subTypes.hasMarkers(trace);
    var hasText = subTypes.hasText(trace);
    var hasCircles = (hasMarkers && trace.marker.symbol === 'circle');
    var hasSymbols = (hasMarkers && trace.marker.symbol !== 'circle');

    var fill = initContainer();
    var line = initContainer();
    var circle = initContainer();
    var symbol = initContainer();

    var opts = {
        fill: fill,
        line: line,
        circle: circle,
        symbol: symbol
    };

    // early return if not visible or placeholder
    if(!isVisible) return opts;

    // fill layer and line layer use the same coords
    var lineCoords;
    if(hasFill || hasLines) {
        lineCoords = geoJsonUtils.calcTraceToLineCoords(calcTrace);
    }

    if(hasFill) {
        fill.geojson = geoJsonUtils.makePolygon(lineCoords);
        fill.layout.visibility = 'visible';

        Lib.extendFlat(fill.paint, {
            'fill-color': trace.fillcolor
        });
    }

    if(hasLines) {
        line.geojson = geoJsonUtils.makeLine(lineCoords);
        line.layout.visibility = 'visible';

        Lib.extendFlat(line.paint, {
            'line-width': trace.line.width,
            'line-color': trace.line.color,
            'line-opacity': trace.opacity
        });

        // TODO convert line.dash into line-dasharray
    }

    if(hasCircles) {
        var circleOpts = makeCircleOpts(calcTrace);
        circle.geojson = circleOpts.geojson;
        circle.layout.visibility = 'visible';

        Lib.extendFlat(circle.paint, {
            'circle-color': circleOpts.mcc,
            'circle-radius': circleOpts.mrc,
            'circle-opacity': circleOpts.mo
        });
    }

    if(hasSymbols || hasText) {
        symbol.geojson = makeSymbolGeoJSON(calcTrace, gd);

        Lib.extendFlat(symbol.layout, {
            visibility: 'visible',
            'icon-image': '{symbol}-15',
            'text-field': '{text}'
        });

        if(hasSymbols) {
            Lib.extendFlat(symbol.layout, {
                'icon-size': trace.marker.size / 10
            });

            if('angle' in trace.marker && trace.marker.angle !== 'auto') {
                Lib.extendFlat(symbol.layout, {
                // unfortunately cant use {angle} do to this issue:
                // https://github.com/mapbox/mapbox-gl-js/issues/873
                    'icon-rotate': {
                        type: 'identity', property: 'angle'
                    },
                    'icon-rotation-alignment': 'map'
                });
            }

            symbol.layout['icon-allow-overlap'] = trace.marker.allowoverlap;

            Lib.extendFlat(symbol.paint, {
                'icon-opacity': trace.opacity * trace.marker.opacity,

                // TODO does not work ??
                'icon-color': trace.marker.color
            });
        }

        if(hasText) {
            var iconSize = (trace.marker || {}).size;
            var textOpts = convertTextOpts(trace.textposition, iconSize);

            // all data-driven below !!

            Lib.extendFlat(symbol.layout, {
                'text-size': trace.textfont.size,
                'text-anchor': textOpts.anchor,
                'text-offset': textOpts.offset

                // TODO font family
                // 'text-font': symbol.textfont.family.split(', '),
            });

            Lib.extendFlat(symbol.paint, {
                'text-color': trace.textfont.color,
                'text-opacity': trace.opacity
            });
        }
    }

    return opts;
};

function initContainer() {
    return {
        geojson: geoJsonUtils.makeBlank(),
        layout: { visibility: 'none' },
        paint: {}
    };
}

function makeCircleOpts(calcTrace) {
    var trace = calcTrace[0].trace;
    var marker = trace.marker;
    var selectedpoints = trace.selectedpoints;
    var arrayColor = Lib.isArrayOrTypedArray(marker.color);
    var arraySize = Lib.isArrayOrTypedArray(marker.size);
    var arrayOpacity = Lib.isArrayOrTypedArray(marker.opacity);
    var i;

    function addTraceOpacity(o) { return trace.opacity * o; }

    function size2radius(s) { return s / 2; }

    var colorFn;
    if(arrayColor) {
        if(Colorscale.hasColorscale(trace, 'marker')) {
            colorFn = Colorscale.makeColorScaleFuncFromTrace(marker);
        } else {
            colorFn = Lib.identity;
        }
    }

    var sizeFn;
    if(arraySize) {
        sizeFn = makeBubbleSizeFn(trace);
    }

    var opacityFn;
    if(arrayOpacity) {
        opacityFn = function(mo) {
            var mo2 = isNumeric(mo) ? +Lib.constrain(mo, 0, 1) : 0;
            return addTraceOpacity(mo2);
        };
    }

    var features = [];
    for(i = 0; i < calcTrace.length; i++) {
        var calcPt = calcTrace[i];
        var lonlat = calcPt.lonlat;

        if(isBADNUM(lonlat)) continue;

        var props = {};
        if(colorFn) props.mcc = calcPt.mcc = colorFn(calcPt.mc);
        if(sizeFn) props.mrc = calcPt.mrc = sizeFn(calcPt.ms);
        if(opacityFn) props.mo = opacityFn(calcPt.mo);
        if(selectedpoints) props.selected = calcPt.selected || 0;

        features.push({
            type: 'Feature',
            geometry: {type: 'Point', coordinates: lonlat},
            properties: props
        });
    }

    var fns;
    if(selectedpoints) {
        fns = Drawing.makeSelectedPointStyleFns(trace);

        for(i = 0; i < features.length; i++) {
            var d = features[i].properties;

            if(fns.selectedOpacityFn) {
                d.mo = addTraceOpacity(fns.selectedOpacityFn(d));
            }
            if(fns.selectedColorFn) {
                d.mcc = fns.selectedColorFn(d);
            }
            if(fns.selectedSizeFn) {
                d.mrc = fns.selectedSizeFn(d);
            }
        }
    }

    return {
        geojson: {type: 'FeatureCollection', features: features},
        mcc: arrayColor || (fns && fns.selectedColorFn) ?
            {type: 'identity', property: 'mcc'} :
            marker.color,
        mrc: arraySize || (fns && fns.selectedSizeFn) ?
            {type: 'identity', property: 'mrc'} :
            size2radius(marker.size),
        mo: arrayOpacity || (fns && fns.selectedOpacityFn) ?
            {type: 'identity', property: 'mo'} :
            addTraceOpacity(marker.opacity)
    };
}

function makeSymbolGeoJSON(calcTrace, gd) {
    var fullLayout = gd._fullLayout;
    var trace = calcTrace[0].trace;

    var marker = trace.marker || {};
    var symbol = marker.symbol;
    var angle = marker.angle;

    var fillSymbol = (symbol !== 'circle') ?
        getFillFunc(symbol) :
        blankFillFunc;

    var fillAngle = (angle !== 'auto') ?
        getFillFunc(angle, true) :
        blankFillFunc;

    var fillText = subTypes.hasText(trace) ?
        getFillFunc(trace.text) :
        blankFillFunc;


    var features = [];

    for(var i = 0; i < calcTrace.length; i++) {
        var calcPt = calcTrace[i];

        if(isBADNUM(calcPt.lonlat)) continue;

        var texttemplate = trace.texttemplate;
        var text;

        if(texttemplate) {
            var tt = Array.isArray(texttemplate) ? (texttemplate[i] || '') : texttemplate;
            var labels = trace._module.formatLabels(calcPt, trace, fullLayout);
            var pointValues = {};
            appendArrayPointValue(pointValues, trace, calcPt.i);
            var meta = trace._meta || {};
            text = Lib.texttemplateString(tt, labels, fullLayout._d3locale, pointValues, calcPt, meta);
        } else {
            text = fillText(i);
        }

        if(text) {
            text = text.replace(NEWLINES, '').replace(BR_TAG_ALL, '\n');
        }

        features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: calcPt.lonlat
            },
            properties: {
                symbol: fillSymbol(i),
                angle: fillAngle(i),
                text: text
            }
        });
    }

    return {
        type: 'FeatureCollection',
        features: features
    };
}

function getFillFunc(attr, numeric) {
    if(Lib.isArrayOrTypedArray(attr)) {
        if(numeric) {
            return function(i) { return isNumeric(attr[i]) ? +attr[i] : 0; };
        }
        return function(i) { return attr[i]; };
    } else if(attr) {
        return function() { return attr; };
    } else {
        return blankFillFunc;
    }
}

function blankFillFunc() { return ''; }

// only need to check lon (OR lat)
function isBADNUM(lonlat) {
    return lonlat[0] === BADNUM;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/defaults.js ***!
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

var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var handleMarkerDefaults = __webpack_require__(/*! ../scatter/marker_defaults */ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js");
var handleLineDefaults = __webpack_require__(/*! ../scatter/line_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js");
var handleTextDefaults = __webpack_require__(/*! ../scatter/text_defaults */ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js");
var handleFillColorDefaults = __webpack_require__(/*! ../scatter/fillcolor_defaults */ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scattermapbox/attributes.js");

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var len = handleLonLatDefaults(traceIn, traceOut, coerce);
    if(!len) {
        traceOut.visible = false;
        return;
    }

    coerce('text');
    coerce('texttemplate');
    coerce('hovertext');
    coerce('hovertemplate');
    coerce('mode');
    coerce('below');

    if(subTypes.hasLines(traceOut)) {
        handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce, {noDash: true});
        coerce('connectgaps');
    }

    if(subTypes.hasMarkers(traceOut)) {
        handleMarkerDefaults(traceIn, traceOut, defaultColor, layout, coerce, {noLine: true});

        coerce('marker.allowoverlap');
        coerce('marker.angle');

        // array marker.size and marker.color are only supported with circles
        var marker = traceOut.marker;
        if(marker.symbol !== 'circle') {
            if(Lib.isArrayOrTypedArray(marker.size)) marker.size = marker.size[0];
            if(Lib.isArrayOrTypedArray(marker.color)) marker.color = marker.color[0];
        }
    }

    if(subTypes.hasText(traceOut)) {
        handleTextDefaults(traceIn, traceOut, layout, coerce, {noSelect: true});
    }

    coerce('fill');
    if(traceOut.fill !== 'none') {
        handleFillColorDefaults(traceIn, traceOut, defaultColor, coerce);
    }

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
};

function handleLonLatDefaults(traceIn, traceOut, coerce) {
    var lon = coerce('lon') || [];
    var lat = coerce('lat') || [];
    var len = Math.min(lon.length, lat.length);
    traceOut._length = len;

    return len;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/event_data.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/event_data.js ***!
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

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/format_labels.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/format_labels.js ***!
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



var Axes = __webpack_require__(/*! ../../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

module.exports = function formatLabels(cdi, trace, fullLayout) {
    var labels = {};

    var subplot = fullLayout[trace.subplot]._subplot;
    var ax = subplot.mockAxis;

    var lonlat = cdi.lonlat;
    labels.lonLabel = Axes.tickText(ax, ax.c2l(lonlat[0]), true).text;
    labels.latLabel = Axes.tickText(ax, ax.c2l(lonlat[1]), true).text;

    return labels;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/hover.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/hover.js ***!
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




var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var getTraceColor = __webpack_require__(/*! ../scatter/get_trace_color */ "./node_modules/plotly.js/src/traces/scatter/get_trace_color.js");
var fillText = Lib.fillText;
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function hoverPoints(pointData, xval, yval) {
    var cd = pointData.cd;
    var trace = cd[0].trace;
    var xa = pointData.xa;
    var ya = pointData.ya;
    var subplot = pointData.subplot;

    // compute winding number about [-180, 180] globe
    var winding = (xval >= 0) ?
        Math.floor((xval + 180) / 360) :
        Math.ceil((xval - 180) / 360);

    // shift longitude to [-180, 180] to determine closest point
    var lonShift = winding * 360;
    var xval2 = xval - lonShift;

    function distFn(d) {
        var lonlat = d.lonlat;
        if(lonlat[0] === BADNUM) return Infinity;

        var lon = Lib.modHalf(lonlat[0], 360);
        var lat = lonlat[1];
        var pt = subplot.project([lon, lat]);
        var dx = pt.x - xa.c2p([xval2, lat]);
        var dy = pt.y - ya.c2p([lon, yval]);
        var rad = Math.max(3, d.mrc || 0);

        return Math.max(Math.sqrt(dx * dx + dy * dy) - rad, 1 - 3 / rad);
    }

    Fx.getClosest(cd, distFn, pointData);

    // skip the rest (for this trace) if we didn't find a close point
    if(pointData.index === false) return;

    var di = cd[pointData.index];
    var lonlat = di.lonlat;
    var lonlatShifted = [Lib.modHalf(lonlat[0], 360) + lonShift, lonlat[1]];

    // shift labels back to original winded globe
    var xc = xa.c2p(lonlatShifted);
    var yc = ya.c2p(lonlatShifted);
    var rad = di.mrc || 1;

    pointData.x0 = xc - rad;
    pointData.x1 = xc + rad;
    pointData.y0 = yc - rad;
    pointData.y1 = yc + rad;

    var fullLayout = {};
    fullLayout[trace.subplot] = {_subplot: subplot};
    var labels = trace._module.formatLabels(di, trace, fullLayout);
    pointData.lonLabel = labels.lonLabel;
    pointData.latLabel = labels.latLabel;

    pointData.color = getTraceColor(trace, di);
    pointData.extraText = getExtraText(trace, di, cd[0].t.labels);
    pointData.hovertemplate = trace.hovertemplate;

    return [pointData];
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

    // TODO should we use a mock axis to format hover?
    // If so, we'll need to make precision be zoom-level dependent
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
        fillText(di, trace, text);
    }

    return text.join('<br>');
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/index.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scattermapbox/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/scattermapbox/defaults.js"),
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    formatLabels: __webpack_require__(/*! ./format_labels */ "./node_modules/plotly.js/src/traces/scattermapbox/format_labels.js"),
    calc: __webpack_require__(/*! ../scattergeo/calc */ "./node_modules/plotly.js/src/traces/scattergeo/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/scattermapbox/plot.js"),
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/scattermapbox/hover.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/scattermapbox/event_data.js"),
    selectPoints: __webpack_require__(/*! ./select */ "./node_modules/plotly.js/src/traces/scattermapbox/select.js"),

    styleOnSelect: function(_, cd) {
        if(cd) {
            var trace = cd[0].trace;
            trace._glTrace.update(cd);
        }
    },

    moduleType: 'trace',
    name: 'scattermapbox',
    basePlotModule: __webpack_require__(/*! ../../plots/mapbox */ "./node_modules/plotly.js/src/plots/mapbox/index.js"),
    categories: ['mapbox', 'gl', 'symbols', 'showLegend', 'scatter-like'],
    meta: {
        hrName: 'scatter_mapbox',
        description: [
            'The data visualized as scatter point, lines or marker symbols',
            'on a Mapbox GL geographic map',
            'is provided by longitude/latitude pairs in `lon` and `lat`.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/plot.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/plot.js ***!
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



var convert = __webpack_require__(/*! ./convert */ "./node_modules/plotly.js/src/traces/scattermapbox/convert.js");
var LAYER_PREFIX = __webpack_require__(/*! ../../plots/mapbox/constants */ "./node_modules/plotly.js/src/plots/mapbox/constants.js").traceLayerPrefix;
var ORDER = ['fill', 'line', 'circle', 'symbol'];

function ScatterMapbox(subplot, uid) {
    this.type = 'scattermapbox';
    this.subplot = subplot;
    this.uid = uid;

    this.sourceIds = {
        fill: 'source-' + uid + '-fill',
        line: 'source-' + uid + '-line',
        circle: 'source-' + uid + '-circle',
        symbol: 'source-' + uid + '-symbol'
    };

    this.layerIds = {
        fill: LAYER_PREFIX + uid + '-fill',
        line: LAYER_PREFIX + uid + '-line',
        circle: LAYER_PREFIX + uid + '-circle',
        symbol: LAYER_PREFIX + uid + '-symbol'
    };

    // We could merge the 'fill' source with the 'line' source and
    // the 'circle' source with the 'symbol' source if ever having
    // for up-to 4 sources per 'scattermapbox' traces becomes a problem.

    // previous 'below' value,
    // need this to update it properly
    this.below = null;
}

var proto = ScatterMapbox.prototype;

proto.addSource = function(k, opts) {
    this.subplot.map.addSource(this.sourceIds[k], {
        type: 'geojson',
        data: opts.geojson
    });
};

proto.setSourceData = function(k, opts) {
    this.subplot.map
        .getSource(this.sourceIds[k])
        .setData(opts.geojson);
};

proto.addLayer = function(k, opts, below) {
    this.subplot.addLayer({
        type: k,
        id: this.layerIds[k],
        source: this.sourceIds[k],
        layout: opts.layout,
        paint: opts.paint
    }, below);
};

proto.update = function update(calcTrace) {
    var subplot = this.subplot;
    var map = subplot.map;
    var optsAll = convert(subplot.gd, calcTrace);
    var below = subplot.belowLookup['trace-' + this.uid];
    var i, k, opts;

    if(below !== this.below) {
        for(i = ORDER.length - 1; i >= 0; i--) {
            k = ORDER[i];
            map.removeLayer(this.layerIds[k]);
        }
        for(i = 0; i < ORDER.length; i++) {
            k = ORDER[i];
            opts = optsAll[k];
            this.addLayer(k, opts, below);
        }
        this.below = below;
    }

    for(i = 0; i < ORDER.length; i++) {
        k = ORDER[i];
        opts = optsAll[k];

        subplot.setOptions(this.layerIds[k], 'setLayoutProperty', opts.layout);

        if(opts.layout.visibility === 'visible') {
            this.setSourceData(k, opts);
            subplot.setOptions(this.layerIds[k], 'setPaintProperty', opts.paint);
        }
    }

    // link ref for quick update during selections
    calcTrace[0].trace._glTrace = this;
};

proto.dispose = function dispose() {
    var map = this.subplot.map;

    for(var i = ORDER.length - 1; i >= 0; i--) {
        var k = ORDER[i];
        map.removeLayer(this.layerIds[k]);
        map.removeSource(this.sourceIds[k]);
    }
};

module.exports = function createScatterMapbox(subplot, calcTrace) {
    var trace = calcTrace[0].trace;
    var scatterMapbox = new ScatterMapbox(subplot, trace.uid);
    var optsAll = convert(subplot.gd, calcTrace);
    var below = scatterMapbox.below = subplot.belowLookup['trace-' + trace.uid];

    for(var i = 0; i < ORDER.length; i++) {
        var k = ORDER[i];
        var opts = optsAll[k];
        scatterMapbox.addSource(k, opts);
        scatterMapbox.addLayer(k, opts, below);
    }

    // link ref for quick update during selections
    calcTrace[0].trace._glTrace = scatterMapbox;

    return scatterMapbox;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scattermapbox/select.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scattermapbox/select.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var subtypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var BADNUM = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

module.exports = function selectPoints(searchInfo, selectionTester) {
    var cd = searchInfo.cd;
    var xa = searchInfo.xaxis;
    var ya = searchInfo.yaxis;
    var selection = [];
    var trace = cd[0].trace;
    var i;

    if(!subtypes.hasMarkers(trace)) return [];

    if(selectionTester === false) {
        for(i = 0; i < cd.length; i++) {
            cd[i].selected = 0;
        }
    } else {
        for(i = 0; i < cd.length; i++) {
            var di = cd[i];
            var lonlat = di.lonlat;

            if(lonlat[0] !== BADNUM) {
                var lonlat2 = [Lib.modHalf(lonlat[0], 360), lonlat[1]];
                var xy = [xa.c2p(lonlat2), ya.c2p(lonlat2)];

                if(selectionTester.contains(xy, null, i, searchInfo)) {
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
    }

    return selection;
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc2NhdHRlcm1hcGJveC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJnZW8vY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJtYXBib3gvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJtYXBib3gvY29udmVydC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJtYXBib3gvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVybWFwYm94L2V2ZW50X2RhdGEuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVybWFwYm94L2Zvcm1hdF9sYWJlbHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVybWFwYm94L2hvdmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcm1hcGJveC9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJtYXBib3gvcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMv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LGVBQWU7QUFDakM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ1NTJhMTQzNDQ0NWUyMzM3Y2VmNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL3NjYXR0ZXJtYXBib3gnKTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcbnZhciBCQUROVU0gPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvbnVtZXJpY2FsJykuQkFETlVNO1xuXG52YXIgY2FsY01hcmtlckNvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NvbG9yc2NhbGVfY2FsYycpO1xudmFyIGFycmF5c1RvQ2FsY2RhdGEgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2FycmF5c190b19jYWxjZGF0YScpO1xudmFyIGNhbGNTZWxlY3Rpb24gPSByZXF1aXJlKCcuLi9zY2F0dGVyL2NhbGNfc2VsZWN0aW9uJyk7XG5cbnZhciBfID0gcmVxdWlyZSgnLi4vLi4vbGliJykuXztcblxuZnVuY3Rpb24gaXNOb25CbGFua1N0cmluZyh2KSB7XG4gICAgcmV0dXJuIHYgJiYgdHlwZW9mIHYgPT09ICdzdHJpbmcnO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNhbGMoZ2QsIHRyYWNlKSB7XG4gICAgdmFyIGhhc0xvY2F0aW9uRGF0YSA9IEFycmF5LmlzQXJyYXkodHJhY2UubG9jYXRpb25zKTtcbiAgICB2YXIgbGVuID0gaGFzTG9jYXRpb25EYXRhID8gdHJhY2UubG9jYXRpb25zLmxlbmd0aCA6IHRyYWNlLl9sZW5ndGg7XG4gICAgdmFyIGNhbGNUcmFjZSA9IG5ldyBBcnJheShsZW4pO1xuXG4gICAgdmFyIGlzVmFsaWRMb2M7XG4gICAgaWYodHJhY2UuZ2VvanNvbikge1xuICAgICAgICBpc1ZhbGlkTG9jID0gZnVuY3Rpb24odikgeyByZXR1cm4gaXNOb25CbGFua1N0cmluZyh2KSB8fCBpc051bWVyaWModik7IH07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaXNWYWxpZExvYyA9IGlzTm9uQmxhbmtTdHJpbmc7XG4gICAgfVxuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBjYWxjUHQgPSBjYWxjVHJhY2VbaV0gPSB7fTtcblxuICAgICAgICBpZihoYXNMb2NhdGlvbkRhdGEpIHtcbiAgICAgICAgICAgIHZhciBsb2MgPSB0cmFjZS5sb2NhdGlvbnNbaV07XG4gICAgICAgICAgICBjYWxjUHQubG9jID0gaXNWYWxpZExvYyhsb2MpID8gbG9jIDogbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsb24gPSB0cmFjZS5sb25baV07XG4gICAgICAgICAgICB2YXIgbGF0ID0gdHJhY2UubGF0W2ldO1xuXG4gICAgICAgICAgICBpZihpc051bWVyaWMobG9uKSAmJiBpc051bWVyaWMobGF0KSkgY2FsY1B0LmxvbmxhdCA9IFsrbG9uLCArbGF0XTtcbiAgICAgICAgICAgIGVsc2UgY2FsY1B0LmxvbmxhdCA9IFtCQUROVU0sIEJBRE5VTV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBhcnJheXNUb0NhbGNkYXRhKGNhbGNUcmFjZSwgdHJhY2UpO1xuICAgIGNhbGNNYXJrZXJDb2xvcnNjYWxlKGdkLCB0cmFjZSk7XG4gICAgY2FsY1NlbGVjdGlvbihjYWxjVHJhY2UsIHRyYWNlKTtcblxuICAgIGlmKGxlbikge1xuICAgICAgICBjYWxjVHJhY2VbMF0udCA9IHtcbiAgICAgICAgICAgIGxhYmVsczoge1xuICAgICAgICAgICAgICAgIGxhdDogXyhnZCwgJ2xhdDonKSArICcgJyxcbiAgICAgICAgICAgICAgICBsb246IF8oZ2QsICdsb246JykgKyAnICdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2FsY1RyYWNlO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgdGV4dHRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykudGV4dHRlbXBsYXRlQXR0cnM7XG52YXIgc2NhdHRlckdlb0F0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlcmdlby9hdHRyaWJ1dGVzJyk7XG52YXIgc2NhdHRlckF0dHJzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hdHRyaWJ1dGVzJyk7XG52YXIgbWFwYm94QXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9tYXBib3gvbGF5b3V0X2F0dHJpYnV0ZXMnKTtcbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBvdmVycmlkZUFsbCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL2VkaXRfdHlwZXMnKS5vdmVycmlkZUFsbDtcblxudmFyIGxpbmVBdHRycyA9IHNjYXR0ZXJHZW9BdHRycy5saW5lO1xudmFyIG1hcmtlckF0dHJzID0gc2NhdHRlckdlb0F0dHJzLm1hcmtlcjtcblxubW9kdWxlLmV4cG9ydHMgPSBvdmVycmlkZUFsbCh7XG4gICAgbG9uOiBzY2F0dGVyR2VvQXR0cnMubG9uLFxuICAgIGxhdDogc2NhdHRlckdlb0F0dHJzLmxhdCxcblxuICAgIC8vIGxvY2F0aW9uc1xuICAgIC8vIGxvY2F0aW9ubW9kZVxuXG4gICAgbW9kZTogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLm1vZGUsIHtcbiAgICAgICAgZGZsdDogJ21hcmtlcnMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgdGhlIGRyYXdpbmcgbW9kZSBmb3IgdGhpcyBzY2F0dGVyIHRyYWNlLicsXG4gICAgICAgICAgICAnSWYgdGhlIHByb3ZpZGVkIGBtb2RlYCBpbmNsdWRlcyAqdGV4dCogdGhlbiB0aGUgYHRleHRgIGVsZW1lbnRzJyxcbiAgICAgICAgICAgICdhcHBlYXIgYXQgdGhlIGNvb3JkaW5hdGVzLiBPdGhlcndpc2UsIHRoZSBgdGV4dGAgZWxlbWVudHMnLFxuICAgICAgICAgICAgJ2FwcGVhciBvbiBob3Zlci4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG5cbiAgICB0ZXh0OiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMudGV4dCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGV4dCBlbGVtZW50cyBhc3NvY2lhdGVkIHdpdGggZWFjaCAobG9uLGxhdCkgcGFpcicsXG4gICAgICAgICAgICAnSWYgYSBzaW5nbGUgc3RyaW5nLCB0aGUgc2FtZSBzdHJpbmcgYXBwZWFycyBvdmVyJyxcbiAgICAgICAgICAgICdhbGwgdGhlIGRhdGEgcG9pbnRzLicsXG4gICAgICAgICAgICAnSWYgYW4gYXJyYXkgb2Ygc3RyaW5nLCB0aGUgaXRlbXMgYXJlIG1hcHBlZCBpbiBvcmRlciB0byB0aGUnLFxuICAgICAgICAgICAgJ3RoaXMgdHJhY2VcXCdzIChsb24sbGF0KSBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ0lmIHRyYWNlIGBob3ZlcmluZm9gIGNvbnRhaW5zIGEgKnRleHQqIGZsYWcgYW5kICpob3ZlcnRleHQqIGlzIG5vdCBzZXQsJyxcbiAgICAgICAgICAgICd0aGVzZSBlbGVtZW50cyB3aWxsIGJlIHNlZW4gaW4gdGhlIGhvdmVyIGxhYmVscy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdwbG90J30sIHtcbiAgICAgICAga2V5czogWydsYXQnLCAnbG9uJywgJ3RleHQnXVxuICAgIH0pLFxuICAgIGhvdmVydGV4dDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLmhvdmVydGV4dCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgaG92ZXIgdGV4dCBlbGVtZW50cyBhc3NvY2lhdGVkIHdpdGggZWFjaCAobG9uLGxhdCkgcGFpcicsXG4gICAgICAgICAgICAnSWYgYSBzaW5nbGUgc3RyaW5nLCB0aGUgc2FtZSBzdHJpbmcgYXBwZWFycyBvdmVyJyxcbiAgICAgICAgICAgICdhbGwgdGhlIGRhdGEgcG9pbnRzLicsXG4gICAgICAgICAgICAnSWYgYW4gYXJyYXkgb2Ygc3RyaW5nLCB0aGUgaXRlbXMgYXJlIG1hcHBlZCBpbiBvcmRlciB0byB0aGUnLFxuICAgICAgICAgICAgJ3RoaXMgdHJhY2VcXCdzIChsb24sbGF0KSBjb29yZGluYXRlcy4nLFxuICAgICAgICAgICAgJ1RvIGJlIHNlZW4sIHRyYWNlIGBob3ZlcmluZm9gIG11c3QgY29udGFpbiBhICp0ZXh0KiBmbGFnLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcblxuICAgIGxpbmU6IHtcbiAgICAgICAgY29sb3I6IGxpbmVBdHRycy5jb2xvcixcbiAgICAgICAgd2lkdGg6IGxpbmVBdHRycy53aWR0aFxuXG4gICAgICAgIC8vIFRPRE9cbiAgICAgICAgLy8gZGFzaDogZGFzaFxuICAgIH0sXG5cbiAgICBjb25uZWN0Z2Fwczogc2NhdHRlckF0dHJzLmNvbm5lY3RnYXBzLFxuXG4gICAgbWFya2VyOiBleHRlbmRGbGF0KHtcbiAgICAgICAgc3ltYm9sOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIGRmbHQ6ICdjaXJjbGUnLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBtYXJrZXIgc3ltYm9sLicsXG4gICAgICAgICAgICAgICAgJ0Z1bGwgbGlzdDogaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYWtpLWljb25zLycsXG4gICAgICAgICAgICAgICAgJ05vdGUgdGhhdCB0aGUgYXJyYXkgYG1hcmtlci5jb2xvcmAgYW5kIGBtYXJrZXIuc2l6ZWAnLFxuICAgICAgICAgICAgICAgICdhcmUgb25seSBhdmFpbGFibGUgZm9yICpjaXJjbGUqIHN5bWJvbHMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgYW5nbGU6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgZGZsdDogJ2F1dG8nLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBtYXJrZXIgb3JpZW50YXRpb24gZnJvbSB0cnVlIE5vcnRoLCBpbiBkZWdyZWVzIGNsb2Nrd2lzZS4nLFxuICAgICAgICAgICAgICAgICdXaGVuIHVzaW5nIHRoZSAqYXV0byogZGVmYXVsdCwgbm8gcm90YXRpb24gd291bGQgYmUgYXBwbGllZCcsXG4gICAgICAgICAgICAgICAgJ2luIHBlcnNwZWN0aXZlIHZpZXdzIHdoaWNoIGlzIGRpZmZlcmVudCBmcm9tIHVzaW5nIGEgemVybyBhbmdsZS4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBhbGxvd292ZXJsYXA6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0ZsYWcgdG8gZHJhdyBhbGwgc3ltYm9scywgZXZlbiBpZiB0aGV5IG92ZXJsYXAuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgb3BhY2l0eTogbWFya2VyQXR0cnMub3BhY2l0eSxcbiAgICAgICAgc2l6ZTogbWFya2VyQXR0cnMuc2l6ZSxcbiAgICAgICAgc2l6ZXJlZjogbWFya2VyQXR0cnMuc2l6ZXJlZixcbiAgICAgICAgc2l6ZW1pbjogbWFya2VyQXR0cnMuc2l6ZW1pbixcbiAgICAgICAgc2l6ZW1vZGU6IG1hcmtlckF0dHJzLnNpemVtb2RlXG4gICAgfSxcbiAgICAgICAgY29sb3JTY2FsZUF0dHJzKCdtYXJrZXInKVxuICAgICAgICAvLyBsaW5lXG4gICAgKSxcblxuICAgIGZpbGw6IHNjYXR0ZXJHZW9BdHRycy5maWxsLFxuICAgIGZpbGxjb2xvcjogc2NhdHRlckF0dHJzLmZpbGxjb2xvcixcblxuICAgIHRleHRmb250OiBtYXBib3hBdHRycy5sYXllcnMuc3ltYm9sLnRleHRmb250LFxuICAgIHRleHRwb3NpdGlvbjogbWFwYm94QXR0cnMubGF5ZXJzLnN5bWJvbC50ZXh0cG9zaXRpb24sXG5cbiAgICBiZWxvdzoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgaWYgdGhpcyBzY2F0dGVybWFwYm94IHRyYWNlXFwncyBsYXllcnMgYXJlIHRvIGJlIGluc2VydGVkJyxcbiAgICAgICAgICAgICdiZWZvcmUgdGhlIGxheWVyIHdpdGggdGhlIHNwZWNpZmllZCBJRC4nLFxuICAgICAgICAgICAgJ0J5IGRlZmF1bHQsIHNjYXR0ZXJtYXBib3ggbGF5ZXJzIGFyZSBpbnNlcnRlZCcsXG4gICAgICAgICAgICAnYWJvdmUgYWxsIHRoZSBiYXNlIGxheWVycy4nLFxuICAgICAgICAgICAgJ1RvIHBsYWNlIHRoZSBzY2F0dGVybWFwYm94IGxheWVycyBhYm92ZSBldmVyeSBvdGhlciBsYXllciwgc2V0IGBiZWxvd2AgdG8gKlxcJ1xcJyouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBzZWxlY3RlZDoge1xuICAgICAgICBtYXJrZXI6IHNjYXR0ZXJBdHRycy5zZWxlY3RlZC5tYXJrZXJcbiAgICB9LFxuICAgIHVuc2VsZWN0ZWQ6IHtcbiAgICAgICAgbWFya2VyOiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZC5tYXJrZXJcbiAgICB9LFxuXG4gICAgaG92ZXJpbmZvOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuaG92ZXJpbmZvLCB7XG4gICAgICAgIGZsYWdzOiBbJ2xvbicsICdsYXQnLCAndGV4dCcsICduYW1lJ11cbiAgICB9KSxcbiAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlQXR0cnMoKSxcbn0sICdjYWxjJywgJ25lc3RlZCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG52YXIgZ2VvSnNvblV0aWxzID0gcmVxdWlyZSgnLi4vLi4vbGliL2dlb2pzb25fdXRpbHMnKTtcblxudmFyIENvbG9yc2NhbGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgbWFrZUJ1YmJsZVNpemVGbiA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFrZV9idWJibGVfc2l6ZV9mdW5jJyk7XG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgY29udmVydFRleHRPcHRzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvbWFwYm94L2NvbnZlcnRfdGV4dF9vcHRzJyk7XG52YXIgYXBwZW5kQXJyYXlQb2ludFZhbHVlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meC9oZWxwZXJzJykuYXBwZW5kQXJyYXlQb2ludFZhbHVlO1xuXG52YXIgTkVXTElORVMgPSByZXF1aXJlKCcuLi8uLi9saWIvc3ZnX3RleHRfdXRpbHMnKS5ORVdMSU5FUztcbnZhciBCUl9UQUdfQUxMID0gcmVxdWlyZSgnLi4vLi4vbGliL3N2Z190ZXh0X3V0aWxzJykuQlJfVEFHX0FMTDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb252ZXJ0KGdkLCBjYWxjVHJhY2UpIHtcbiAgICB2YXIgdHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG5cbiAgICB2YXIgaXNWaXNpYmxlID0gKHRyYWNlLnZpc2libGUgPT09IHRydWUgJiYgdHJhY2UuX2xlbmd0aCAhPT0gMCk7XG4gICAgdmFyIGhhc0ZpbGwgPSAodHJhY2UuZmlsbCAhPT0gJ25vbmUnKTtcbiAgICB2YXIgaGFzTGluZXMgPSBzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZSk7XG4gICAgdmFyIGhhc01hcmtlcnMgPSBzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlKTtcbiAgICB2YXIgaGFzVGV4dCA9IHN1YlR5cGVzLmhhc1RleHQodHJhY2UpO1xuICAgIHZhciBoYXNDaXJjbGVzID0gKGhhc01hcmtlcnMgJiYgdHJhY2UubWFya2VyLnN5bWJvbCA9PT0gJ2NpcmNsZScpO1xuICAgIHZhciBoYXNTeW1ib2xzID0gKGhhc01hcmtlcnMgJiYgdHJhY2UubWFya2VyLnN5bWJvbCAhPT0gJ2NpcmNsZScpO1xuXG4gICAgdmFyIGZpbGwgPSBpbml0Q29udGFpbmVyKCk7XG4gICAgdmFyIGxpbmUgPSBpbml0Q29udGFpbmVyKCk7XG4gICAgdmFyIGNpcmNsZSA9IGluaXRDb250YWluZXIoKTtcbiAgICB2YXIgc3ltYm9sID0gaW5pdENvbnRhaW5lcigpO1xuXG4gICAgdmFyIG9wdHMgPSB7XG4gICAgICAgIGZpbGw6IGZpbGwsXG4gICAgICAgIGxpbmU6IGxpbmUsXG4gICAgICAgIGNpcmNsZTogY2lyY2xlLFxuICAgICAgICBzeW1ib2w6IHN5bWJvbFxuICAgIH07XG5cbiAgICAvLyBlYXJseSByZXR1cm4gaWYgbm90IHZpc2libGUgb3IgcGxhY2Vob2xkZXJcbiAgICBpZighaXNWaXNpYmxlKSByZXR1cm4gb3B0cztcblxuICAgIC8vIGZpbGwgbGF5ZXIgYW5kIGxpbmUgbGF5ZXIgdXNlIHRoZSBzYW1lIGNvb3Jkc1xuICAgIHZhciBsaW5lQ29vcmRzO1xuICAgIGlmKGhhc0ZpbGwgfHwgaGFzTGluZXMpIHtcbiAgICAgICAgbGluZUNvb3JkcyA9IGdlb0pzb25VdGlscy5jYWxjVHJhY2VUb0xpbmVDb29yZHMoY2FsY1RyYWNlKTtcbiAgICB9XG5cbiAgICBpZihoYXNGaWxsKSB7XG4gICAgICAgIGZpbGwuZ2VvanNvbiA9IGdlb0pzb25VdGlscy5tYWtlUG9seWdvbihsaW5lQ29vcmRzKTtcbiAgICAgICAgZmlsbC5sYXlvdXQudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcblxuICAgICAgICBMaWIuZXh0ZW5kRmxhdChmaWxsLnBhaW50LCB7XG4gICAgICAgICAgICAnZmlsbC1jb2xvcic6IHRyYWNlLmZpbGxjb2xvclxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZihoYXNMaW5lcykge1xuICAgICAgICBsaW5lLmdlb2pzb24gPSBnZW9Kc29uVXRpbHMubWFrZUxpbmUobGluZUNvb3Jkcyk7XG4gICAgICAgIGxpbmUubGF5b3V0LnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cbiAgICAgICAgTGliLmV4dGVuZEZsYXQobGluZS5wYWludCwge1xuICAgICAgICAgICAgJ2xpbmUtd2lkdGgnOiB0cmFjZS5saW5lLndpZHRoLFxuICAgICAgICAgICAgJ2xpbmUtY29sb3InOiB0cmFjZS5saW5lLmNvbG9yLFxuICAgICAgICAgICAgJ2xpbmUtb3BhY2l0eSc6IHRyYWNlLm9wYWNpdHlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gVE9ETyBjb252ZXJ0IGxpbmUuZGFzaCBpbnRvIGxpbmUtZGFzaGFycmF5XG4gICAgfVxuXG4gICAgaWYoaGFzQ2lyY2xlcykge1xuICAgICAgICB2YXIgY2lyY2xlT3B0cyA9IG1ha2VDaXJjbGVPcHRzKGNhbGNUcmFjZSk7XG4gICAgICAgIGNpcmNsZS5nZW9qc29uID0gY2lyY2xlT3B0cy5nZW9qc29uO1xuICAgICAgICBjaXJjbGUubGF5b3V0LnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG5cbiAgICAgICAgTGliLmV4dGVuZEZsYXQoY2lyY2xlLnBhaW50LCB7XG4gICAgICAgICAgICAnY2lyY2xlLWNvbG9yJzogY2lyY2xlT3B0cy5tY2MsXG4gICAgICAgICAgICAnY2lyY2xlLXJhZGl1cyc6IGNpcmNsZU9wdHMubXJjLFxuICAgICAgICAgICAgJ2NpcmNsZS1vcGFjaXR5JzogY2lyY2xlT3B0cy5tb1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpZihoYXNTeW1ib2xzIHx8IGhhc1RleHQpIHtcbiAgICAgICAgc3ltYm9sLmdlb2pzb24gPSBtYWtlU3ltYm9sR2VvSlNPTihjYWxjVHJhY2UsIGdkKTtcblxuICAgICAgICBMaWIuZXh0ZW5kRmxhdChzeW1ib2wubGF5b3V0LCB7XG4gICAgICAgICAgICB2aXNpYmlsaXR5OiAndmlzaWJsZScsXG4gICAgICAgICAgICAnaWNvbi1pbWFnZSc6ICd7c3ltYm9sfS0xNScsXG4gICAgICAgICAgICAndGV4dC1maWVsZCc6ICd7dGV4dH0nXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKGhhc1N5bWJvbHMpIHtcbiAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KHN5bWJvbC5sYXlvdXQsIHtcbiAgICAgICAgICAgICAgICAnaWNvbi1zaXplJzogdHJhY2UubWFya2VyLnNpemUgLyAxMFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmKCdhbmdsZScgaW4gdHJhY2UubWFya2VyICYmIHRyYWNlLm1hcmtlci5hbmdsZSAhPT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgTGliLmV4dGVuZEZsYXQoc3ltYm9sLmxheW91dCwge1xuICAgICAgICAgICAgICAgIC8vIHVuZm9ydHVuYXRlbHkgY2FudCB1c2Uge2FuZ2xlfSBkbyB0byB0aGlzIGlzc3VlOlxuICAgICAgICAgICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LWdsLWpzL2lzc3Vlcy84NzNcbiAgICAgICAgICAgICAgICAgICAgJ2ljb24tcm90YXRlJzoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2lkZW50aXR5JywgcHJvcGVydHk6ICdhbmdsZSdcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ2ljb24tcm90YXRpb24tYWxpZ25tZW50JzogJ21hcCdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgc3ltYm9sLmxheW91dFsnaWNvbi1hbGxvdy1vdmVybGFwJ10gPSB0cmFjZS5tYXJrZXIuYWxsb3dvdmVybGFwO1xuXG4gICAgICAgICAgICBMaWIuZXh0ZW5kRmxhdChzeW1ib2wucGFpbnQsIHtcbiAgICAgICAgICAgICAgICAnaWNvbi1vcGFjaXR5JzogdHJhY2Uub3BhY2l0eSAqIHRyYWNlLm1hcmtlci5vcGFjaXR5LFxuXG4gICAgICAgICAgICAgICAgLy8gVE9ETyBkb2VzIG5vdCB3b3JrID8/XG4gICAgICAgICAgICAgICAgJ2ljb24tY29sb3InOiB0cmFjZS5tYXJrZXIuY29sb3JcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoaGFzVGV4dCkge1xuICAgICAgICAgICAgdmFyIGljb25TaXplID0gKHRyYWNlLm1hcmtlciB8fCB7fSkuc2l6ZTtcbiAgICAgICAgICAgIHZhciB0ZXh0T3B0cyA9IGNvbnZlcnRUZXh0T3B0cyh0cmFjZS50ZXh0cG9zaXRpb24sIGljb25TaXplKTtcblxuICAgICAgICAgICAgLy8gYWxsIGRhdGEtZHJpdmVuIGJlbG93ICEhXG5cbiAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KHN5bWJvbC5sYXlvdXQsIHtcbiAgICAgICAgICAgICAgICAndGV4dC1zaXplJzogdHJhY2UudGV4dGZvbnQuc2l6ZSxcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiB0ZXh0T3B0cy5hbmNob3IsXG4gICAgICAgICAgICAgICAgJ3RleHQtb2Zmc2V0JzogdGV4dE9wdHMub2Zmc2V0XG5cbiAgICAgICAgICAgICAgICAvLyBUT0RPIGZvbnQgZmFtaWx5XG4gICAgICAgICAgICAgICAgLy8gJ3RleHQtZm9udCc6IHN5bWJvbC50ZXh0Zm9udC5mYW1pbHkuc3BsaXQoJywgJyksXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgTGliLmV4dGVuZEZsYXQoc3ltYm9sLnBhaW50LCB7XG4gICAgICAgICAgICAgICAgJ3RleHQtY29sb3InOiB0cmFjZS50ZXh0Zm9udC5jb2xvcixcbiAgICAgICAgICAgICAgICAndGV4dC1vcGFjaXR5JzogdHJhY2Uub3BhY2l0eVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb3B0cztcbn07XG5cbmZ1bmN0aW9uIGluaXRDb250YWluZXIoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2VvanNvbjogZ2VvSnNvblV0aWxzLm1ha2VCbGFuaygpLFxuICAgICAgICBsYXlvdXQ6IHsgdmlzaWJpbGl0eTogJ25vbmUnIH0sXG4gICAgICAgIHBhaW50OiB7fVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VDaXJjbGVPcHRzKGNhbGNUcmFjZSkge1xuICAgIHZhciB0cmFjZSA9IGNhbGNUcmFjZVswXS50cmFjZTtcbiAgICB2YXIgbWFya2VyID0gdHJhY2UubWFya2VyO1xuICAgIHZhciBzZWxlY3RlZHBvaW50cyA9IHRyYWNlLnNlbGVjdGVkcG9pbnRzO1xuICAgIHZhciBhcnJheUNvbG9yID0gTGliLmlzQXJyYXlPclR5cGVkQXJyYXkobWFya2VyLmNvbG9yKTtcbiAgICB2YXIgYXJyYXlTaXplID0gTGliLmlzQXJyYXlPclR5cGVkQXJyYXkobWFya2VyLnNpemUpO1xuICAgIHZhciBhcnJheU9wYWNpdHkgPSBMaWIuaXNBcnJheU9yVHlwZWRBcnJheShtYXJrZXIub3BhY2l0eSk7XG4gICAgdmFyIGk7XG5cbiAgICBmdW5jdGlvbiBhZGRUcmFjZU9wYWNpdHkobykgeyByZXR1cm4gdHJhY2Uub3BhY2l0eSAqIG87IH1cblxuICAgIGZ1bmN0aW9uIHNpemUycmFkaXVzKHMpIHsgcmV0dXJuIHMgLyAyOyB9XG5cbiAgICB2YXIgY29sb3JGbjtcbiAgICBpZihhcnJheUNvbG9yKSB7XG4gICAgICAgIGlmKENvbG9yc2NhbGUuaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ21hcmtlcicpKSB7XG4gICAgICAgICAgICBjb2xvckZuID0gQ29sb3JzY2FsZS5tYWtlQ29sb3JTY2FsZUZ1bmNGcm9tVHJhY2UobWFya2VyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbG9yRm4gPSBMaWIuaWRlbnRpdHk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgc2l6ZUZuO1xuICAgIGlmKGFycmF5U2l6ZSkge1xuICAgICAgICBzaXplRm4gPSBtYWtlQnViYmxlU2l6ZUZuKHRyYWNlKTtcbiAgICB9XG5cbiAgICB2YXIgb3BhY2l0eUZuO1xuICAgIGlmKGFycmF5T3BhY2l0eSkge1xuICAgICAgICBvcGFjaXR5Rm4gPSBmdW5jdGlvbihtbykge1xuICAgICAgICAgICAgdmFyIG1vMiA9IGlzTnVtZXJpYyhtbykgPyArTGliLmNvbnN0cmFpbihtbywgMCwgMSkgOiAwO1xuICAgICAgICAgICAgcmV0dXJuIGFkZFRyYWNlT3BhY2l0eShtbzIpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBmZWF0dXJlcyA9IFtdO1xuICAgIGZvcihpID0gMDsgaSA8IGNhbGNUcmFjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2FsY1B0ID0gY2FsY1RyYWNlW2ldO1xuICAgICAgICB2YXIgbG9ubGF0ID0gY2FsY1B0LmxvbmxhdDtcblxuICAgICAgICBpZihpc0JBRE5VTShsb25sYXQpKSBjb250aW51ZTtcblxuICAgICAgICB2YXIgcHJvcHMgPSB7fTtcbiAgICAgICAgaWYoY29sb3JGbikgcHJvcHMubWNjID0gY2FsY1B0Lm1jYyA9IGNvbG9yRm4oY2FsY1B0Lm1jKTtcbiAgICAgICAgaWYoc2l6ZUZuKSBwcm9wcy5tcmMgPSBjYWxjUHQubXJjID0gc2l6ZUZuKGNhbGNQdC5tcyk7XG4gICAgICAgIGlmKG9wYWNpdHlGbikgcHJvcHMubW8gPSBvcGFjaXR5Rm4oY2FsY1B0Lm1vKTtcbiAgICAgICAgaWYoc2VsZWN0ZWRwb2ludHMpIHByb3BzLnNlbGVjdGVkID0gY2FsY1B0LnNlbGVjdGVkIHx8IDA7XG5cbiAgICAgICAgZmVhdHVyZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICAgICAgICBnZW9tZXRyeToge3R5cGU6ICdQb2ludCcsIGNvb3JkaW5hdGVzOiBsb25sYXR9LFxuICAgICAgICAgICAgcHJvcGVydGllczogcHJvcHNcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIGZucztcbiAgICBpZihzZWxlY3RlZHBvaW50cykge1xuICAgICAgICBmbnMgPSBEcmF3aW5nLm1ha2VTZWxlY3RlZFBvaW50U3R5bGVGbnModHJhY2UpO1xuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGZlYXR1cmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZCA9IGZlYXR1cmVzW2ldLnByb3BlcnRpZXM7XG5cbiAgICAgICAgICAgIGlmKGZucy5zZWxlY3RlZE9wYWNpdHlGbikge1xuICAgICAgICAgICAgICAgIGQubW8gPSBhZGRUcmFjZU9wYWNpdHkoZm5zLnNlbGVjdGVkT3BhY2l0eUZuKGQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGZucy5zZWxlY3RlZENvbG9yRm4pIHtcbiAgICAgICAgICAgICAgICBkLm1jYyA9IGZucy5zZWxlY3RlZENvbG9yRm4oZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihmbnMuc2VsZWN0ZWRTaXplRm4pIHtcbiAgICAgICAgICAgICAgICBkLm1yYyA9IGZucy5zZWxlY3RlZFNpemVGbihkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGdlb2pzb246IHt0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLCBmZWF0dXJlczogZmVhdHVyZXN9LFxuICAgICAgICBtY2M6IGFycmF5Q29sb3IgfHwgKGZucyAmJiBmbnMuc2VsZWN0ZWRDb2xvckZuKSA/XG4gICAgICAgICAgICB7dHlwZTogJ2lkZW50aXR5JywgcHJvcGVydHk6ICdtY2MnfSA6XG4gICAgICAgICAgICBtYXJrZXIuY29sb3IsXG4gICAgICAgIG1yYzogYXJyYXlTaXplIHx8IChmbnMgJiYgZm5zLnNlbGVjdGVkU2l6ZUZuKSA/XG4gICAgICAgICAgICB7dHlwZTogJ2lkZW50aXR5JywgcHJvcGVydHk6ICdtcmMnfSA6XG4gICAgICAgICAgICBzaXplMnJhZGl1cyhtYXJrZXIuc2l6ZSksXG4gICAgICAgIG1vOiBhcnJheU9wYWNpdHkgfHwgKGZucyAmJiBmbnMuc2VsZWN0ZWRPcGFjaXR5Rm4pID9cbiAgICAgICAgICAgIHt0eXBlOiAnaWRlbnRpdHknLCBwcm9wZXJ0eTogJ21vJ30gOlxuICAgICAgICAgICAgYWRkVHJhY2VPcGFjaXR5KG1hcmtlci5vcGFjaXR5KVxuICAgIH07XG59XG5cbmZ1bmN0aW9uIG1ha2VTeW1ib2xHZW9KU09OKGNhbGNUcmFjZSwgZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciB0cmFjZSA9IGNhbGNUcmFjZVswXS50cmFjZTtcblxuICAgIHZhciBtYXJrZXIgPSB0cmFjZS5tYXJrZXIgfHwge307XG4gICAgdmFyIHN5bWJvbCA9IG1hcmtlci5zeW1ib2w7XG4gICAgdmFyIGFuZ2xlID0gbWFya2VyLmFuZ2xlO1xuXG4gICAgdmFyIGZpbGxTeW1ib2wgPSAoc3ltYm9sICE9PSAnY2lyY2xlJykgP1xuICAgICAgICBnZXRGaWxsRnVuYyhzeW1ib2wpIDpcbiAgICAgICAgYmxhbmtGaWxsRnVuYztcblxuICAgIHZhciBmaWxsQW5nbGUgPSAoYW5nbGUgIT09ICdhdXRvJykgP1xuICAgICAgICBnZXRGaWxsRnVuYyhhbmdsZSwgdHJ1ZSkgOlxuICAgICAgICBibGFua0ZpbGxGdW5jO1xuXG4gICAgdmFyIGZpbGxUZXh0ID0gc3ViVHlwZXMuaGFzVGV4dCh0cmFjZSkgP1xuICAgICAgICBnZXRGaWxsRnVuYyh0cmFjZS50ZXh0KSA6XG4gICAgICAgIGJsYW5rRmlsbEZ1bmM7XG5cblxuICAgIHZhciBmZWF0dXJlcyA9IFtdO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGNhbGNUcmFjZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2FsY1B0ID0gY2FsY1RyYWNlW2ldO1xuXG4gICAgICAgIGlmKGlzQkFETlVNKGNhbGNQdC5sb25sYXQpKSBjb250aW51ZTtcblxuICAgICAgICB2YXIgdGV4dHRlbXBsYXRlID0gdHJhY2UudGV4dHRlbXBsYXRlO1xuICAgICAgICB2YXIgdGV4dDtcblxuICAgICAgICBpZih0ZXh0dGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHZhciB0dCA9IEFycmF5LmlzQXJyYXkodGV4dHRlbXBsYXRlKSA/ICh0ZXh0dGVtcGxhdGVbaV0gfHwgJycpIDogdGV4dHRlbXBsYXRlO1xuICAgICAgICAgICAgdmFyIGxhYmVscyA9IHRyYWNlLl9tb2R1bGUuZm9ybWF0TGFiZWxzKGNhbGNQdCwgdHJhY2UsIGZ1bGxMYXlvdXQpO1xuICAgICAgICAgICAgdmFyIHBvaW50VmFsdWVzID0ge307XG4gICAgICAgICAgICBhcHBlbmRBcnJheVBvaW50VmFsdWUocG9pbnRWYWx1ZXMsIHRyYWNlLCBjYWxjUHQuaSk7XG4gICAgICAgICAgICB2YXIgbWV0YSA9IHRyYWNlLl9tZXRhIHx8IHt9O1xuICAgICAgICAgICAgdGV4dCA9IExpYi50ZXh0dGVtcGxhdGVTdHJpbmcodHQsIGxhYmVscywgZnVsbExheW91dC5fZDNsb2NhbGUsIHBvaW50VmFsdWVzLCBjYWxjUHQsIG1ldGEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGV4dCA9IGZpbGxUZXh0KGkpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodGV4dCkge1xuICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZShORVdMSU5FUywgJycpLnJlcGxhY2UoQlJfVEFHX0FMTCwgJ1xcbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgZmVhdHVyZXMucHVzaCh7XG4gICAgICAgICAgICB0eXBlOiAnRmVhdHVyZScsXG4gICAgICAgICAgICBnZW9tZXRyeToge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQb2ludCcsXG4gICAgICAgICAgICAgICAgY29vcmRpbmF0ZXM6IGNhbGNQdC5sb25sYXRcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiB7XG4gICAgICAgICAgICAgICAgc3ltYm9sOiBmaWxsU3ltYm9sKGkpLFxuICAgICAgICAgICAgICAgIGFuZ2xlOiBmaWxsQW5nbGUoaSksXG4gICAgICAgICAgICAgICAgdGV4dDogdGV4dFxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgICAgICBmZWF0dXJlczogZmVhdHVyZXNcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBnZXRGaWxsRnVuYyhhdHRyLCBudW1lcmljKSB7XG4gICAgaWYoTGliLmlzQXJyYXlPclR5cGVkQXJyYXkoYXR0cikpIHtcbiAgICAgICAgaWYobnVtZXJpYykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKGkpIHsgcmV0dXJuIGlzTnVtZXJpYyhhdHRyW2ldKSA/ICthdHRyW2ldIDogMDsgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaSkgeyByZXR1cm4gYXR0cltpXTsgfTtcbiAgICB9IGVsc2UgaWYoYXR0cikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oKSB7IHJldHVybiBhdHRyOyB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBibGFua0ZpbGxGdW5jO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gYmxhbmtGaWxsRnVuYygpIHsgcmV0dXJuICcnOyB9XG5cbi8vIG9ubHkgbmVlZCB0byBjaGVjayBsb24gKE9SIGxhdClcbmZ1bmN0aW9uIGlzQkFETlVNKGxvbmxhdCkge1xuICAgIHJldHVybiBsb25sYXRbMF0gPT09IEJBRE5VTTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgc3ViVHlwZXMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3N1YnR5cGVzJyk7XG52YXIgaGFuZGxlTWFya2VyRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL21hcmtlcl9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUxpbmVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbGluZV9kZWZhdWx0cycpO1xudmFyIGhhbmRsZVRleHREZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvdGV4dF9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUZpbGxDb2xvckRlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9maWxsY29sb3JfZGVmYXVsdHMnKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5RGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0KSB7XG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VJbiwgdHJhY2VPdXQsIGF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSBoYW5kbGVMb25MYXREZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlKTtcbiAgICBpZighbGVuKSB7XG4gICAgICAgIHRyYWNlT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgndGV4dHRlbXBsYXRlJyk7XG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcbiAgICBjb2VyY2UoJ21vZGUnKTtcbiAgICBjb2VyY2UoJ2JlbG93Jyk7XG5cbiAgICBpZihzdWJUeXBlcy5oYXNMaW5lcyh0cmFjZU91dCkpIHtcbiAgICAgICAgaGFuZGxlTGluZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlLCB7bm9EYXNoOiB0cnVlfSk7XG4gICAgICAgIGNvZXJjZSgnY29ubmVjdGdhcHMnKTtcbiAgICB9XG5cbiAgICBpZihzdWJUeXBlcy5oYXNNYXJrZXJzKHRyYWNlT3V0KSkge1xuICAgICAgICBoYW5kbGVNYXJrZXJEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSwge25vTGluZTogdHJ1ZX0pO1xuXG4gICAgICAgIGNvZXJjZSgnbWFya2VyLmFsbG93b3ZlcmxhcCcpO1xuICAgICAgICBjb2VyY2UoJ21hcmtlci5hbmdsZScpO1xuXG4gICAgICAgIC8vIGFycmF5IG1hcmtlci5zaXplIGFuZCBtYXJrZXIuY29sb3IgYXJlIG9ubHkgc3VwcG9ydGVkIHdpdGggY2lyY2xlc1xuICAgICAgICB2YXIgbWFya2VyID0gdHJhY2VPdXQubWFya2VyO1xuICAgICAgICBpZihtYXJrZXIuc3ltYm9sICE9PSAnY2lyY2xlJykge1xuICAgICAgICAgICAgaWYoTGliLmlzQXJyYXlPclR5cGVkQXJyYXkobWFya2VyLnNpemUpKSBtYXJrZXIuc2l6ZSA9IG1hcmtlci5zaXplWzBdO1xuICAgICAgICAgICAgaWYoTGliLmlzQXJyYXlPclR5cGVkQXJyYXkobWFya2VyLmNvbG9yKSkgbWFya2VyLmNvbG9yID0gbWFya2VyLmNvbG9yWzBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzVGV4dCh0cmFjZU91dCkpIHtcbiAgICAgICAgaGFuZGxlVGV4dERlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge25vU2VsZWN0OiB0cnVlfSk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdmaWxsJyk7XG4gICAgaWYodHJhY2VPdXQuZmlsbCAhPT0gJ25vbmUnKSB7XG4gICAgICAgIGhhbmRsZUZpbGxDb2xvckRlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGNvZXJjZSk7XG4gICAgfVxuXG4gICAgTGliLmNvZXJjZVNlbGVjdGlvbk1hcmtlck9wYWNpdHkodHJhY2VPdXQsIGNvZXJjZSk7XG59O1xuXG5mdW5jdGlvbiBoYW5kbGVMb25MYXREZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgY29lcmNlKSB7XG4gICAgdmFyIGxvbiA9IGNvZXJjZSgnbG9uJykgfHwgW107XG4gICAgdmFyIGxhdCA9IGNvZXJjZSgnbGF0JykgfHwgW107XG4gICAgdmFyIGxlbiA9IE1hdGgubWluKGxvbi5sZW5ndGgsIGxhdC5sZW5ndGgpO1xuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBsZW47XG5cbiAgICByZXR1cm4gbGVuO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBldmVudERhdGEob3V0LCBwdCkge1xuICAgIG91dC5sb24gPSBwdC5sb247XG4gICAgb3V0LmxhdCA9IHB0LmxhdDtcblxuICAgIHJldHVybiBvdXQ7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9heGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZm9ybWF0TGFiZWxzKGNkaSwgdHJhY2UsIGZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgbGFiZWxzID0ge307XG5cbiAgICB2YXIgc3VicGxvdCA9IGZ1bGxMYXlvdXRbdHJhY2Uuc3VicGxvdF0uX3N1YnBsb3Q7XG4gICAgdmFyIGF4ID0gc3VicGxvdC5tb2NrQXhpcztcblxuICAgIHZhciBsb25sYXQgPSBjZGkubG9ubGF0O1xuICAgIGxhYmVscy5sb25MYWJlbCA9IEF4ZXMudGlja1RleHQoYXgsIGF4LmMybChsb25sYXRbMF0pLCB0cnVlKS50ZXh0O1xuICAgIGxhYmVscy5sYXRMYWJlbCA9IEF4ZXMudGlja1RleHQoYXgsIGF4LmMybChsb25sYXRbMV0pLCB0cnVlKS50ZXh0O1xuXG4gICAgcmV0dXJuIGxhYmVscztcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEZ4ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meCcpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGdldFRyYWNlQ29sb3IgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2dldF90cmFjZV9jb2xvcicpO1xudmFyIGZpbGxUZXh0ID0gTGliLmZpbGxUZXh0O1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaG92ZXJQb2ludHMocG9pbnREYXRhLCB4dmFsLCB5dmFsKSB7XG4gICAgdmFyIGNkID0gcG9pbnREYXRhLmNkO1xuICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgIHZhciB4YSA9IHBvaW50RGF0YS54YTtcbiAgICB2YXIgeWEgPSBwb2ludERhdGEueWE7XG4gICAgdmFyIHN1YnBsb3QgPSBwb2ludERhdGEuc3VicGxvdDtcblxuICAgIC8vIGNvbXB1dGUgd2luZGluZyBudW1iZXIgYWJvdXQgWy0xODAsIDE4MF0gZ2xvYmVcbiAgICB2YXIgd2luZGluZyA9ICh4dmFsID49IDApID9cbiAgICAgICAgTWF0aC5mbG9vcigoeHZhbCArIDE4MCkgLyAzNjApIDpcbiAgICAgICAgTWF0aC5jZWlsKCh4dmFsIC0gMTgwKSAvIDM2MCk7XG5cbiAgICAvLyBzaGlmdCBsb25naXR1ZGUgdG8gWy0xODAsIDE4MF0gdG8gZGV0ZXJtaW5lIGNsb3Nlc3QgcG9pbnRcbiAgICB2YXIgbG9uU2hpZnQgPSB3aW5kaW5nICogMzYwO1xuICAgIHZhciB4dmFsMiA9IHh2YWwgLSBsb25TaGlmdDtcblxuICAgIGZ1bmN0aW9uIGRpc3RGbihkKSB7XG4gICAgICAgIHZhciBsb25sYXQgPSBkLmxvbmxhdDtcbiAgICAgICAgaWYobG9ubGF0WzBdID09PSBCQUROVU0pIHJldHVybiBJbmZpbml0eTtcblxuICAgICAgICB2YXIgbG9uID0gTGliLm1vZEhhbGYobG9ubGF0WzBdLCAzNjApO1xuICAgICAgICB2YXIgbGF0ID0gbG9ubGF0WzFdO1xuICAgICAgICB2YXIgcHQgPSBzdWJwbG90LnByb2plY3QoW2xvbiwgbGF0XSk7XG4gICAgICAgIHZhciBkeCA9IHB0LnggLSB4YS5jMnAoW3h2YWwyLCBsYXRdKTtcbiAgICAgICAgdmFyIGR5ID0gcHQueSAtIHlhLmMycChbbG9uLCB5dmFsXSk7XG4gICAgICAgIHZhciByYWQgPSBNYXRoLm1heCgzLCBkLm1yYyB8fCAwKTtcblxuICAgICAgICByZXR1cm4gTWF0aC5tYXgoTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KSAtIHJhZCwgMSAtIDMgLyByYWQpO1xuICAgIH1cblxuICAgIEZ4LmdldENsb3Nlc3QoY2QsIGRpc3RGbiwgcG9pbnREYXRhKTtcblxuICAgIC8vIHNraXAgdGhlIHJlc3QgKGZvciB0aGlzIHRyYWNlKSBpZiB3ZSBkaWRuJ3QgZmluZCBhIGNsb3NlIHBvaW50XG4gICAgaWYocG9pbnREYXRhLmluZGV4ID09PSBmYWxzZSkgcmV0dXJuO1xuXG4gICAgdmFyIGRpID0gY2RbcG9pbnREYXRhLmluZGV4XTtcbiAgICB2YXIgbG9ubGF0ID0gZGkubG9ubGF0O1xuICAgIHZhciBsb25sYXRTaGlmdGVkID0gW0xpYi5tb2RIYWxmKGxvbmxhdFswXSwgMzYwKSArIGxvblNoaWZ0LCBsb25sYXRbMV1dO1xuXG4gICAgLy8gc2hpZnQgbGFiZWxzIGJhY2sgdG8gb3JpZ2luYWwgd2luZGVkIGdsb2JlXG4gICAgdmFyIHhjID0geGEuYzJwKGxvbmxhdFNoaWZ0ZWQpO1xuICAgIHZhciB5YyA9IHlhLmMycChsb25sYXRTaGlmdGVkKTtcbiAgICB2YXIgcmFkID0gZGkubXJjIHx8IDE7XG5cbiAgICBwb2ludERhdGEueDAgPSB4YyAtIHJhZDtcbiAgICBwb2ludERhdGEueDEgPSB4YyArIHJhZDtcbiAgICBwb2ludERhdGEueTAgPSB5YyAtIHJhZDtcbiAgICBwb2ludERhdGEueTEgPSB5YyArIHJhZDtcblxuICAgIHZhciBmdWxsTGF5b3V0ID0ge307XG4gICAgZnVsbExheW91dFt0cmFjZS5zdWJwbG90XSA9IHtfc3VicGxvdDogc3VicGxvdH07XG4gICAgdmFyIGxhYmVscyA9IHRyYWNlLl9tb2R1bGUuZm9ybWF0TGFiZWxzKGRpLCB0cmFjZSwgZnVsbExheW91dCk7XG4gICAgcG9pbnREYXRhLmxvbkxhYmVsID0gbGFiZWxzLmxvbkxhYmVsO1xuICAgIHBvaW50RGF0YS5sYXRMYWJlbCA9IGxhYmVscy5sYXRMYWJlbDtcblxuICAgIHBvaW50RGF0YS5jb2xvciA9IGdldFRyYWNlQ29sb3IodHJhY2UsIGRpKTtcbiAgICBwb2ludERhdGEuZXh0cmFUZXh0ID0gZ2V0RXh0cmFUZXh0KHRyYWNlLCBkaSwgY2RbMF0udC5sYWJlbHMpO1xuICAgIHBvaW50RGF0YS5ob3ZlcnRlbXBsYXRlID0gdHJhY2UuaG92ZXJ0ZW1wbGF0ZTtcblxuICAgIHJldHVybiBbcG9pbnREYXRhXTtcbn07XG5cbmZ1bmN0aW9uIGdldEV4dHJhVGV4dCh0cmFjZSwgZGksIGxhYmVscykge1xuICAgIGlmKHRyYWNlLmhvdmVydGVtcGxhdGUpIHJldHVybjtcblxuICAgIHZhciBob3ZlcmluZm8gPSBkaS5oaSB8fCB0cmFjZS5ob3ZlcmluZm87XG4gICAgdmFyIHBhcnRzID0gaG92ZXJpbmZvLnNwbGl0KCcrJyk7XG4gICAgdmFyIGlzQWxsID0gcGFydHMuaW5kZXhPZignYWxsJykgIT09IC0xO1xuICAgIHZhciBoYXNMb24gPSBwYXJ0cy5pbmRleE9mKCdsb24nKSAhPT0gLTE7XG4gICAgdmFyIGhhc0xhdCA9IHBhcnRzLmluZGV4T2YoJ2xhdCcpICE9PSAtMTtcbiAgICB2YXIgbG9ubGF0ID0gZGkubG9ubGF0O1xuICAgIHZhciB0ZXh0ID0gW107XG5cbiAgICAvLyBUT0RPIHNob3VsZCB3ZSB1c2UgYSBtb2NrIGF4aXMgdG8gZm9ybWF0IGhvdmVyP1xuICAgIC8vIElmIHNvLCB3ZSdsbCBuZWVkIHRvIG1ha2UgcHJlY2lzaW9uIGJlIHpvb20tbGV2ZWwgZGVwZW5kZW50XG4gICAgZnVuY3Rpb24gZm9ybWF0KHYpIHtcbiAgICAgICAgcmV0dXJuIHYgKyAnXFx1MDBCMCc7XG4gICAgfVxuXG4gICAgaWYoaXNBbGwgfHwgKGhhc0xvbiAmJiBoYXNMYXQpKSB7XG4gICAgICAgIHRleHQucHVzaCgnKCcgKyBmb3JtYXQobG9ubGF0WzBdKSArICcsICcgKyBmb3JtYXQobG9ubGF0WzFdKSArICcpJyk7XG4gICAgfSBlbHNlIGlmKGhhc0xvbikge1xuICAgICAgICB0ZXh0LnB1c2gobGFiZWxzLmxvbiArIGZvcm1hdChsb25sYXRbMF0pKTtcbiAgICB9IGVsc2UgaWYoaGFzTGF0KSB7XG4gICAgICAgIHRleHQucHVzaChsYWJlbHMubGF0ICsgZm9ybWF0KGxvbmxhdFsxXSkpO1xuICAgIH1cblxuICAgIGlmKGlzQWxsIHx8IHBhcnRzLmluZGV4T2YoJ3RleHQnKSAhPT0gLTEpIHtcbiAgICAgICAgZmlsbFRleHQoZGksIHRyYWNlLCB0ZXh0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dC5qb2luKCc8YnI+Jyk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFya2VyX2NvbG9yYmFyJyksXG4gICAgZm9ybWF0TGFiZWxzOiByZXF1aXJlKCcuL2Zvcm1hdF9sYWJlbHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuLi9zY2F0dGVyZ2VvL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBob3ZlclBvaW50czogcmVxdWlyZSgnLi9ob3ZlcicpLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi9ldmVudF9kYXRhJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuL3NlbGVjdCcpLFxuXG4gICAgc3R5bGVPblNlbGVjdDogZnVuY3Rpb24oXywgY2QpIHtcbiAgICAgICAgaWYoY2QpIHtcbiAgICAgICAgICAgIHZhciB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuICAgICAgICAgICAgdHJhY2UuX2dsVHJhY2UudXBkYXRlKGNkKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdzY2F0dGVybWFwYm94JyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi4vLi4vcGxvdHMvbWFwYm94JyksXG4gICAgY2F0ZWdvcmllczogWydtYXBib3gnLCAnZ2wnLCAnc3ltYm9scycsICdzaG93TGVnZW5kJywgJ3NjYXR0ZXItbGlrZSddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgaHJOYW1lOiAnc2NhdHRlcl9tYXBib3gnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBkYXRhIHZpc3VhbGl6ZWQgYXMgc2NhdHRlciBwb2ludCwgbGluZXMgb3IgbWFya2VyIHN5bWJvbHMnLFxuICAgICAgICAgICAgJ29uIGEgTWFwYm94IEdMIGdlb2dyYXBoaWMgbWFwJyxcbiAgICAgICAgICAgICdpcyBwcm92aWRlZCBieSBsb25naXR1ZGUvbGF0aXR1ZGUgcGFpcnMgaW4gYGxvbmAgYW5kIGBsYXRgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29udmVydCA9IHJlcXVpcmUoJy4vY29udmVydCcpO1xudmFyIExBWUVSX1BSRUZJWCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL21hcGJveC9jb25zdGFudHMnKS50cmFjZUxheWVyUHJlZml4O1xudmFyIE9SREVSID0gWydmaWxsJywgJ2xpbmUnLCAnY2lyY2xlJywgJ3N5bWJvbCddO1xuXG5mdW5jdGlvbiBTY2F0dGVyTWFwYm94KHN1YnBsb3QsIHVpZCkge1xuICAgIHRoaXMudHlwZSA9ICdzY2F0dGVybWFwYm94JztcbiAgICB0aGlzLnN1YnBsb3QgPSBzdWJwbG90O1xuICAgIHRoaXMudWlkID0gdWlkO1xuXG4gICAgdGhpcy5zb3VyY2VJZHMgPSB7XG4gICAgICAgIGZpbGw6ICdzb3VyY2UtJyArIHVpZCArICctZmlsbCcsXG4gICAgICAgIGxpbmU6ICdzb3VyY2UtJyArIHVpZCArICctbGluZScsXG4gICAgICAgIGNpcmNsZTogJ3NvdXJjZS0nICsgdWlkICsgJy1jaXJjbGUnLFxuICAgICAgICBzeW1ib2w6ICdzb3VyY2UtJyArIHVpZCArICctc3ltYm9sJ1xuICAgIH07XG5cbiAgICB0aGlzLmxheWVySWRzID0ge1xuICAgICAgICBmaWxsOiBMQVlFUl9QUkVGSVggKyB1aWQgKyAnLWZpbGwnLFxuICAgICAgICBsaW5lOiBMQVlFUl9QUkVGSVggKyB1aWQgKyAnLWxpbmUnLFxuICAgICAgICBjaXJjbGU6IExBWUVSX1BSRUZJWCArIHVpZCArICctY2lyY2xlJyxcbiAgICAgICAgc3ltYm9sOiBMQVlFUl9QUkVGSVggKyB1aWQgKyAnLXN5bWJvbCdcbiAgICB9O1xuXG4gICAgLy8gV2UgY291bGQgbWVyZ2UgdGhlICdmaWxsJyBzb3VyY2Ugd2l0aCB0aGUgJ2xpbmUnIHNvdXJjZSBhbmRcbiAgICAvLyB0aGUgJ2NpcmNsZScgc291cmNlIHdpdGggdGhlICdzeW1ib2wnIHNvdXJjZSBpZiBldmVyIGhhdmluZ1xuICAgIC8vIGZvciB1cC10byA0IHNvdXJjZXMgcGVyICdzY2F0dGVybWFwYm94JyB0cmFjZXMgYmVjb21lcyBhIHByb2JsZW0uXG5cbiAgICAvLyBwcmV2aW91cyAnYmVsb3cnIHZhbHVlLFxuICAgIC8vIG5lZWQgdGhpcyB0byB1cGRhdGUgaXQgcHJvcGVybHlcbiAgICB0aGlzLmJlbG93ID0gbnVsbDtcbn1cblxudmFyIHByb3RvID0gU2NhdHRlck1hcGJveC5wcm90b3R5cGU7XG5cbnByb3RvLmFkZFNvdXJjZSA9IGZ1bmN0aW9uKGssIG9wdHMpIHtcbiAgICB0aGlzLnN1YnBsb3QubWFwLmFkZFNvdXJjZSh0aGlzLnNvdXJjZUlkc1trXSwge1xuICAgICAgICB0eXBlOiAnZ2VvanNvbicsXG4gICAgICAgIGRhdGE6IG9wdHMuZ2VvanNvblxuICAgIH0pO1xufTtcblxucHJvdG8uc2V0U291cmNlRGF0YSA9IGZ1bmN0aW9uKGssIG9wdHMpIHtcbiAgICB0aGlzLnN1YnBsb3QubWFwXG4gICAgICAgIC5nZXRTb3VyY2UodGhpcy5zb3VyY2VJZHNba10pXG4gICAgICAgIC5zZXREYXRhKG9wdHMuZ2VvanNvbik7XG59O1xuXG5wcm90by5hZGRMYXllciA9IGZ1bmN0aW9uKGssIG9wdHMsIGJlbG93KSB7XG4gICAgdGhpcy5zdWJwbG90LmFkZExheWVyKHtcbiAgICAgICAgdHlwZTogayxcbiAgICAgICAgaWQ6IHRoaXMubGF5ZXJJZHNba10sXG4gICAgICAgIHNvdXJjZTogdGhpcy5zb3VyY2VJZHNba10sXG4gICAgICAgIGxheW91dDogb3B0cy5sYXlvdXQsXG4gICAgICAgIHBhaW50OiBvcHRzLnBhaW50XG4gICAgfSwgYmVsb3cpO1xufTtcblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24gdXBkYXRlKGNhbGNUcmFjZSkge1xuICAgIHZhciBzdWJwbG90ID0gdGhpcy5zdWJwbG90O1xuICAgIHZhciBtYXAgPSBzdWJwbG90Lm1hcDtcbiAgICB2YXIgb3B0c0FsbCA9IGNvbnZlcnQoc3VicGxvdC5nZCwgY2FsY1RyYWNlKTtcbiAgICB2YXIgYmVsb3cgPSBzdWJwbG90LmJlbG93TG9va3VwWyd0cmFjZS0nICsgdGhpcy51aWRdO1xuICAgIHZhciBpLCBrLCBvcHRzO1xuXG4gICAgaWYoYmVsb3cgIT09IHRoaXMuYmVsb3cpIHtcbiAgICAgICAgZm9yKGkgPSBPUkRFUi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICAgICAgayA9IE9SREVSW2ldO1xuICAgICAgICAgICAgbWFwLnJlbW92ZUxheWVyKHRoaXMubGF5ZXJJZHNba10pO1xuICAgICAgICB9XG4gICAgICAgIGZvcihpID0gMDsgaSA8IE9SREVSLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrID0gT1JERVJbaV07XG4gICAgICAgICAgICBvcHRzID0gb3B0c0FsbFtrXTtcbiAgICAgICAgICAgIHRoaXMuYWRkTGF5ZXIoaywgb3B0cywgYmVsb3cpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuYmVsb3cgPSBiZWxvdztcbiAgICB9XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBPUkRFUi5sZW5ndGg7IGkrKykge1xuICAgICAgICBrID0gT1JERVJbaV07XG4gICAgICAgIG9wdHMgPSBvcHRzQWxsW2tdO1xuXG4gICAgICAgIHN1YnBsb3Quc2V0T3B0aW9ucyh0aGlzLmxheWVySWRzW2tdLCAnc2V0TGF5b3V0UHJvcGVydHknLCBvcHRzLmxheW91dCk7XG5cbiAgICAgICAgaWYob3B0cy5sYXlvdXQudmlzaWJpbGl0eSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFNvdXJjZURhdGEoaywgb3B0cyk7XG4gICAgICAgICAgICBzdWJwbG90LnNldE9wdGlvbnModGhpcy5sYXllcklkc1trXSwgJ3NldFBhaW50UHJvcGVydHknLCBvcHRzLnBhaW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGxpbmsgcmVmIGZvciBxdWljayB1cGRhdGUgZHVyaW5nIHNlbGVjdGlvbnNcbiAgICBjYWxjVHJhY2VbMF0udHJhY2UuX2dsVHJhY2UgPSB0aGlzO1xufTtcblxucHJvdG8uZGlzcG9zZSA9IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgdmFyIG1hcCA9IHRoaXMuc3VicGxvdC5tYXA7XG5cbiAgICBmb3IodmFyIGkgPSBPUkRFUi5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB2YXIgayA9IE9SREVSW2ldO1xuICAgICAgICBtYXAucmVtb3ZlTGF5ZXIodGhpcy5sYXllcklkc1trXSk7XG4gICAgICAgIG1hcC5yZW1vdmVTb3VyY2UodGhpcy5zb3VyY2VJZHNba10pO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3JlYXRlU2NhdHRlck1hcGJveChzdWJwbG90LCBjYWxjVHJhY2UpIHtcbiAgICB2YXIgdHJhY2UgPSBjYWxjVHJhY2VbMF0udHJhY2U7XG4gICAgdmFyIHNjYXR0ZXJNYXBib3ggPSBuZXcgU2NhdHRlck1hcGJveChzdWJwbG90LCB0cmFjZS51aWQpO1xuICAgIHZhciBvcHRzQWxsID0gY29udmVydChzdWJwbG90LmdkLCBjYWxjVHJhY2UpO1xuICAgIHZhciBiZWxvdyA9IHNjYXR0ZXJNYXBib3guYmVsb3cgPSBzdWJwbG90LmJlbG93TG9va3VwWyd0cmFjZS0nICsgdHJhY2UudWlkXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBPUkRFUi5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgayA9IE9SREVSW2ldO1xuICAgICAgICB2YXIgb3B0cyA9IG9wdHNBbGxba107XG4gICAgICAgIHNjYXR0ZXJNYXBib3guYWRkU291cmNlKGssIG9wdHMpO1xuICAgICAgICBzY2F0dGVyTWFwYm94LmFkZExheWVyKGssIG9wdHMsIGJlbG93KTtcbiAgICB9XG5cbiAgICAvLyBsaW5rIHJlZiBmb3IgcXVpY2sgdXBkYXRlIGR1cmluZyBzZWxlY3Rpb25zXG4gICAgY2FsY1RyYWNlWzBdLnRyYWNlLl9nbFRyYWNlID0gc2NhdHRlck1hcGJveDtcblxuICAgIHJldHVybiBzY2F0dGVyTWFwYm94O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHN1YnR5cGVzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9zdWJ0eXBlcycpO1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc2VsZWN0UG9pbnRzKHNlYXJjaEluZm8sIHNlbGVjdGlvblRlc3Rlcikge1xuICAgIHZhciBjZCA9IHNlYXJjaEluZm8uY2Q7XG4gICAgdmFyIHhhID0gc2VhcmNoSW5mby54YXhpcztcbiAgICB2YXIgeWEgPSBzZWFyY2hJbmZvLnlheGlzO1xuICAgIHZhciBzZWxlY3Rpb24gPSBbXTtcbiAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcbiAgICB2YXIgaTtcblxuICAgIGlmKCFzdWJ0eXBlcy5oYXNNYXJrZXJzKHRyYWNlKSkgcmV0dXJuIFtdO1xuXG4gICAgaWYoc2VsZWN0aW9uVGVzdGVyID09PSBmYWxzZSkge1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBjZC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2RbaV0uc2VsZWN0ZWQgPSAwO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBkaSA9IGNkW2ldO1xuICAgICAgICAgICAgdmFyIGxvbmxhdCA9IGRpLmxvbmxhdDtcblxuICAgICAgICAgICAgaWYobG9ubGF0WzBdICE9PSBCQUROVU0pIHtcbiAgICAgICAgICAgICAgICB2YXIgbG9ubGF0MiA9IFtMaWIubW9kSGFsZihsb25sYXRbMF0sIDM2MCksIGxvbmxhdFsxXV07XG4gICAgICAgICAgICAgICAgdmFyIHh5ID0gW3hhLmMycChsb25sYXQyKSwgeWEuYzJwKGxvbmxhdDIpXTtcblxuICAgICAgICAgICAgICAgIGlmKHNlbGVjdGlvblRlc3Rlci5jb250YWlucyh4eSwgbnVsbCwgaSwgc2VhcmNoSW5mbykpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgcG9pbnROdW1iZXI6IGksXG4gICAgICAgICAgICAgICAgICAgICAgICBsb246IGxvbmxhdFswXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhdDogbG9ubGF0WzFdXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBkaS5zZWxlY3RlZCA9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGkuc2VsZWN0ZWQgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWxlY3Rpb247XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==