(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_plots_geo_index_js"],{

/***/ "./node_modules/plotly.js/src/lib/topojson_utils.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/topojson_utils.js ***!
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



var topojsonUtils = module.exports = {};

var locationmodeToLayer = __webpack_require__(/*! ../plots/geo/constants */ "./node_modules/plotly.js/src/plots/geo/constants.js").locationmodeToLayer;
var topojsonFeature = __webpack_require__(/*! topojson-client */ "./node_modules/topojson-client/src/index.js").feature;

topojsonUtils.getTopojsonName = function(geoLayout) {
    return [
        geoLayout.scope.replace(/ /g, '-'), '_',
        geoLayout.resolution.toString(), 'm'
    ].join('');
};

topojsonUtils.getTopojsonPath = function(topojsonURL, topojsonName) {
    return topojsonURL + topojsonName + '.json';
};

topojsonUtils.getTopojsonFeatures = function(trace, topojson) {
    var layer = locationmodeToLayer[trace.locationmode];
    var obj = topojson.objects[layer];

    return topojsonFeature(topojson, obj).features;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/geo/constants.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/geo/constants.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



// projection names to d3 function name
exports.projNames = {
    // d3.geo.projection
    'equirectangular': 'equirectangular',
    'mercator': 'mercator',
    'orthographic': 'orthographic',
    'natural earth': 'naturalEarth',
    'kavrayskiy7': 'kavrayskiy7',
    'miller': 'miller',
    'robinson': 'robinson',
    'eckert4': 'eckert4',
    'azimuthal equal area': 'azimuthalEqualArea',
    'azimuthal equidistant': 'azimuthalEquidistant',
    'conic equal area': 'conicEqualArea',
    'conic conformal': 'conicConformal',
    'conic equidistant': 'conicEquidistant',
    'gnomonic': 'gnomonic',
    'stereographic': 'stereographic',
    'mollweide': 'mollweide',
    'hammer': 'hammer',
    'transverse mercator': 'transverseMercator',
    'albers usa': 'albersUsa',
    'winkel tripel': 'winkel3',
    'aitoff': 'aitoff',
    'sinusoidal': 'sinusoidal'
};

// name of the axes
exports.axesNames = ['lonaxis', 'lataxis'];

// max longitudinal angular span (EXPERIMENTAL)
exports.lonaxisSpan = {
    'orthographic': 180,
    'azimuthal equal area': 360,
    'azimuthal equidistant': 360,
    'conic conformal': 180,
    'gnomonic': 160,
    'stereographic': 180,
    'transverse mercator': 180,
    '*': 360
};

// max latitudinal angular span (EXPERIMENTAL)
exports.lataxisSpan = {
    'conic conformal': 150,
    'stereographic': 179.5,
    '*': 180
};

// defaults for each scope
exports.scopeDefaults = {
    world: {
        lonaxisRange: [-180, 180],
        lataxisRange: [-90, 90],
        projType: 'equirectangular',
        projRotate: [0, 0, 0]
    },
    usa: {
        lonaxisRange: [-180, -50],
        lataxisRange: [15, 80],
        projType: 'albers usa'
    },
    europe: {
        lonaxisRange: [-30, 60],
        lataxisRange: [30, 85],
        projType: 'conic conformal',
        projRotate: [15, 0, 0],
        projParallels: [0, 60]
    },
    asia: {
        lonaxisRange: [22, 160],
        lataxisRange: [-15, 55],
        projType: 'mercator',
        projRotate: [0, 0, 0]
    },
    africa: {
        lonaxisRange: [-30, 60],
        lataxisRange: [-40, 40],
        projType: 'mercator',
        projRotate: [0, 0, 0]
    },
    'north america': {
        lonaxisRange: [-180, -45],
        lataxisRange: [5, 85],
        projType: 'conic conformal',
        projRotate: [-100, 0, 0],
        projParallels: [29.5, 45.5]
    },
    'south america': {
        lonaxisRange: [-100, -30],
        lataxisRange: [-60, 15],
        projType: 'mercator',
        projRotate: [0, 0, 0]
    }
};

// angular pad to avoid rounding error around clip angles
exports.clipPad = 1e-3;

// map projection precision
exports.precision = 0.1;

// default land and water fill colors
exports.landColor = '#F0DC82';
exports.waterColor = '#3399FF';

// locationmode to layer name
exports.locationmodeToLayer = {
    'ISO-3': 'countries',
    'USA-states': 'subunits',
    'country names': 'countries'
};

// SVG element for a sphere (use to frame maps)
exports.sphereSVG = {type: 'Sphere'};

// N.B. base layer names must be the same as in the topojson files

// base layer with a fill color
exports.fillLayers = {
    ocean: 1,
    land: 1,
    lakes: 1
};

// base layer with a only a line color
exports.lineLayers = {
    subunits: 1,
    countries: 1,
    coastlines: 1,
    rivers: 1,
    frame: 1
};

exports.layers = [
    'bg',
    'ocean', 'land', 'lakes',
    'subunits', 'countries', 'coastlines', 'rivers',
    'lataxis', 'lonaxis', 'frame',
    'backplot',
    'frontplot'
];

exports.layersForChoropleth = [
    'bg',
    'ocean', 'land',
    'subunits', 'countries', 'coastlines',
    'lataxis', 'lonaxis', 'frame',
    'backplot',
    'rivers', 'lakes',
    'frontplot'
];

exports.layerNameToAdjective = {
    ocean: 'ocean',
    land: 'land',
    lakes: 'lake',
    subunits: 'subunit',
    countries: 'country',
    coastlines: 'coastline',
    rivers: 'river',
    frame: 'frame'
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/geo/geo.js":
/*!*****************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/geo/geo.js ***!
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



/* global PlotlyGeoAssets:false */

var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Plots = __webpack_require__(/*! ../plots */ "./node_modules/plotly.js/src/plots/plots.js");
var Axes = __webpack_require__(/*! ../cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var getAutoRange = __webpack_require__(/*! ../cartesian/autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").getAutoRange;
var dragElement = __webpack_require__(/*! ../../components/dragelement */ "./node_modules/plotly.js/src/components/dragelement/index.js");
var prepSelect = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").prepSelect;
var clearSelect = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").clearSelect;
var selectOnClick = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").selectOnClick;

var createGeoZoom = __webpack_require__(/*! ./zoom */ "./node_modules/plotly.js/src/plots/geo/zoom.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/geo/constants.js");

var geoUtils = __webpack_require__(/*! ../../lib/geo_location_utils */ "./node_modules/plotly.js/src/lib/geo_location_utils.js");
var topojsonUtils = __webpack_require__(/*! ../../lib/topojson_utils */ "./node_modules/plotly.js/src/lib/topojson_utils.js");
var topojsonFeature = __webpack_require__(/*! topojson-client */ "./node_modules/topojson-client/src/index.js").feature;

__webpack_require__(/*! ./projections */ "./node_modules/plotly.js/src/plots/geo/projections.js")(d3);

function Geo(opts) {
    this.id = opts.id;
    this.graphDiv = opts.graphDiv;
    this.container = opts.container;
    this.topojsonURL = opts.topojsonURL;
    this.isStatic = opts.staticPlot;

    this.topojsonName = null;
    this.topojson = null;

    this.projection = null;
    this.scope = null;
    this.viewInitial = null;
    this.fitScale = null;
    this.bounds = null;
    this.midPt = null;

    this.hasChoropleth = false;
    this.traceHash = {};

    this.layers = {};
    this.basePaths = {};
    this.dataPaths = {};
    this.dataPoints = {};

    this.clipDef = null;
    this.clipRect = null;
    this.bgRect = null;

    this.makeFramework();
}

var proto = Geo.prototype;

module.exports = function createGeo(opts) {
    return new Geo(opts);
};

proto.plot = function(geoCalcData, fullLayout, promises) {
    var _this = this;
    var geoLayout = fullLayout[this.id];
    var geoPromises = [];

    var needsTopojson = false;
    for(var k in constants.layerNameToAdjective) {
        if(k !== 'frame' && geoLayout['show' + k]) {
            needsTopojson = true;
            break;
        }
    }
    for(var i = 0; i < geoCalcData.length; i++) {
        if(geoCalcData[0][0].trace.locationmode) {
            needsTopojson = true;
            break;
        }
    }

    if(needsTopojson) {
        var topojsonNameNew = topojsonUtils.getTopojsonName(geoLayout);
        if(_this.topojson === null || topojsonNameNew !== _this.topojsonName) {
            _this.topojsonName = topojsonNameNew;

            if(PlotlyGeoAssets.topojson[_this.topojsonName] === undefined) {
                geoPromises.push(_this.fetchTopojson());
            }
        }
    }

    geoPromises = geoPromises.concat(geoUtils.fetchTraceGeoData(geoCalcData));

    promises.push(new Promise(function(resolve, reject) {
        Promise.all(geoPromises).then(function() {
            _this.topojson = PlotlyGeoAssets.topojson[_this.topojsonName];
            _this.update(geoCalcData, fullLayout);
            resolve();
        })
        .catch(reject);
    }));
};

proto.fetchTopojson = function() {
    var _this = this;
    var topojsonPath = topojsonUtils.getTopojsonPath(_this.topojsonURL, _this.topojsonName);

    return new Promise(function(resolve, reject) {
        d3.json(topojsonPath, function(err, topojson) {
            if(err) {
                if(err.status === 404) {
                    return reject(new Error([
                        'plotly.js could not find topojson file at',
                        topojsonPath, '.',
                        'Make sure the *topojsonURL* plot config option',
                        'is set properly.'
                    ].join(' ')));
                } else {
                    return reject(new Error([
                        'unexpected error while fetching topojson file at',
                        topojsonPath
                    ].join(' ')));
                }
            }

            PlotlyGeoAssets.topojson[_this.topojsonName] = topojson;
            resolve();
        });
    });
};

proto.update = function(geoCalcData, fullLayout) {
    var geoLayout = fullLayout[this.id];

    // important: maps with choropleth traces have a different layer order
    this.hasChoropleth = false;

    for(var i = 0; i < geoCalcData.length; i++) {
        var calcTrace = geoCalcData[i];
        var trace = calcTrace[0].trace;

        if(trace.type === 'choropleth') {
            this.hasChoropleth = true;
        }
        if(trace.visible === true && trace._length > 0) {
            trace._module.calcGeoJSON(calcTrace, fullLayout);
        }
    }

    var hasInvalidBounds = this.updateProjection(geoCalcData, fullLayout);
    if(hasInvalidBounds) return;

    if(!this.viewInitial || this.scope !== geoLayout.scope) {
        this.saveViewInitial(geoLayout);
    }
    this.scope = geoLayout.scope;

    this.updateBaseLayers(fullLayout, geoLayout);
    this.updateDims(fullLayout, geoLayout);
    this.updateFx(fullLayout, geoLayout);

    Plots.generalUpdatePerTraceModule(this.graphDiv, this, geoCalcData, geoLayout);

    var scatterLayer = this.layers.frontplot.select('.scatterlayer');
    this.dataPoints.point = scatterLayer.selectAll('.point');
    this.dataPoints.text = scatterLayer.selectAll('text');
    this.dataPaths.line = scatterLayer.selectAll('.js-line');

    var choroplethLayer = this.layers.backplot.select('.choroplethlayer');
    this.dataPaths.choropleth = choroplethLayer.selectAll('path');

    this.render();
};

proto.updateProjection = function(geoCalcData, fullLayout) {
    var gd = this.graphDiv;
    var geoLayout = fullLayout[this.id];
    var gs = fullLayout._size;
    var domain = geoLayout.domain;
    var projLayout = geoLayout.projection;

    var lonaxis = geoLayout.lonaxis;
    var lataxis = geoLayout.lataxis;
    var axLon = lonaxis._ax;
    var axLat = lataxis._ax;

    var projection = this.projection = getProjection(geoLayout);

    // setup subplot extent [[x0,y0], [x1,y1]]
    var extent = [[
        gs.l + gs.w * domain.x[0],
        gs.t + gs.h * (1 - domain.y[1])
    ], [
        gs.l + gs.w * domain.x[1],
        gs.t + gs.h * (1 - domain.y[0])
    ]];

    var center = geoLayout.center || {};
    var rotation = projLayout.rotation || {};
    var lonaxisRange = lonaxis.range || [];
    var lataxisRange = lataxis.range || [];

    if(geoLayout.fitbounds) {
        axLon._length = extent[1][0] - extent[0][0];
        axLat._length = extent[1][1] - extent[0][1];
        axLon.range = getAutoRange(gd, axLon);
        axLat.range = getAutoRange(gd, axLat);

        var midLon = (axLon.range[0] + axLon.range[1]) / 2;
        var midLat = (axLat.range[0] + axLat.range[1]) / 2;

        if(geoLayout._isScoped) {
            center = {lon: midLon, lat: midLat};
        } else if(geoLayout._isClipped) {
            center = {lon: midLon, lat: midLat};
            rotation = {lon: midLon, lat: midLat, roll: rotation.roll};

            var projType = projLayout.type;
            var lonHalfSpan = (constants.lonaxisSpan[projType] / 2) || 180;
            var latHalfSpan = (constants.lataxisSpan[projType] / 2) || 180;

            lonaxisRange = [midLon - lonHalfSpan, midLon + lonHalfSpan];
            lataxisRange = [midLat - latHalfSpan, midLat + latHalfSpan];
        } else {
            center = {lon: midLon, lat: midLat};
            rotation = {lon: midLon, lat: rotation.lat, roll: rotation.roll};
        }
    }

    // set 'pre-fit' projection
    projection
        .center([center.lon - rotation.lon, center.lat - rotation.lat])
        .rotate([-rotation.lon, -rotation.lat, rotation.roll])
        .parallels(projLayout.parallels);

    // fit projection 'scale' and 'translate' to set lon/lat ranges
    var rangeBox = makeRangeBox(lonaxisRange, lataxisRange);
    projection.fitExtent(extent, rangeBox);

    var b = this.bounds = projection.getBounds(rangeBox);
    var s = this.fitScale = projection.scale();
    var t = projection.translate();

    if(
        !isFinite(b[0][0]) || !isFinite(b[0][1]) ||
        !isFinite(b[1][0]) || !isFinite(b[1][1]) ||
        isNaN(t[0]) || isNaN(t[0])
    ) {
        var attrToUnset = ['fitbounds', 'projection.rotation', 'center', 'lonaxis.range', 'lataxis.range'];
        var msg = 'Invalid geo settings, relayout\'ing to default view.';
        var updateObj = {};

        // clear all attributes that could cause invalid bounds,
        // clear viewInitial to update reset-view behavior

        for(var i = 0; i < attrToUnset.length; i++) {
            updateObj[this.id + '.' + attrToUnset[i]] = null;
        }

        this.viewInitial = null;

        Lib.warn(msg);
        gd._promises.push(Registry.call('relayout', gd, updateObj));
        return msg;
    }

    if(geoLayout.fitbounds) {
        var b2 = projection.getBounds(makeRangeBox(axLon.range, axLat.range));
        var k2 = Math.min(
            (b[1][0] - b[0][0]) / (b2[1][0] - b2[0][0]),
            (b[1][1] - b[0][1]) / (b2[1][1] - b2[0][1])
        );

        if(isFinite(k2)) {
            projection.scale(k2 * s);
        } else {
            Lib.warn('Something went wrong during' + this.id + 'fitbounds computations.');
        }
    } else {
        // adjust projection to user setting
        projection.scale(projLayout.scale * s);
    }

    // px coordinates of view mid-point,
    // useful to update `geo.center` after interactions
    var midPt = this.midPt = [
        (b[0][0] + b[1][0]) / 2,
        (b[0][1] + b[1][1]) / 2
    ];

    projection
        .translate([t[0] + (midPt[0] - t[0]), t[1] + (midPt[1] - t[1])])
        .clipExtent(b);

    // the 'albers usa' projection does not expose a 'center' method
    // so here's this hack to make it respond to 'geoLayout.center'
    if(geoLayout._isAlbersUsa) {
        var centerPx = projection([center.lon, center.lat]);
        var tt = projection.translate();

        projection.translate([
            tt[0] - (centerPx[0] - tt[0]),
            tt[1] - (centerPx[1] - tt[1])
        ]);
    }
};

proto.updateBaseLayers = function(fullLayout, geoLayout) {
    var _this = this;
    var topojson = _this.topojson;
    var layers = _this.layers;
    var basePaths = _this.basePaths;

    function isAxisLayer(d) {
        return (d === 'lonaxis' || d === 'lataxis');
    }

    function isLineLayer(d) {
        return Boolean(constants.lineLayers[d]);
    }

    function isFillLayer(d) {
        return Boolean(constants.fillLayers[d]);
    }

    var allLayers = this.hasChoropleth ?
        constants.layersForChoropleth :
        constants.layers;

    var layerData = allLayers.filter(function(d) {
        return (isLineLayer(d) || isFillLayer(d)) ? geoLayout['show' + d] :
            isAxisLayer(d) ? geoLayout[d].showgrid :
            true;
    });

    var join = _this.framework.selectAll('.layer')
        .data(layerData, String);

    join.exit().each(function(d) {
        delete layers[d];
        delete basePaths[d];
        d3.select(this).remove();
    });

    join.enter().append('g')
        .attr('class', function(d) { return 'layer ' + d; })
        .each(function(d) {
            var layer = layers[d] = d3.select(this);

            if(d === 'bg') {
                _this.bgRect = layer.append('rect')
                    .style('pointer-events', 'all');
            } else if(isAxisLayer(d)) {
                basePaths[d] = layer.append('path')
                    .style('fill', 'none');
            } else if(d === 'backplot') {
                layer.append('g')
                    .classed('choroplethlayer', true);
            } else if(d === 'frontplot') {
                layer.append('g')
                    .classed('scatterlayer', true);
            } else if(isLineLayer(d)) {
                basePaths[d] = layer.append('path')
                    .style('fill', 'none')
                    .style('stroke-miterlimit', 2);
            } else if(isFillLayer(d)) {
                basePaths[d] = layer.append('path')
                    .style('stroke', 'none');
            }
        });

    join.order();

    join.each(function(d) {
        var path = basePaths[d];
        var adj = constants.layerNameToAdjective[d];

        if(d === 'frame') {
            path.datum(constants.sphereSVG);
        } else if(isLineLayer(d) || isFillLayer(d)) {
            path.datum(topojsonFeature(topojson, topojson.objects[d]));
        } else if(isAxisLayer(d)) {
            path.datum(makeGraticule(d, geoLayout, fullLayout))
                .call(Color.stroke, geoLayout[d].gridcolor)
                .call(Drawing.dashLine, '', geoLayout[d].gridwidth);
        }

        if(isLineLayer(d)) {
            path.call(Color.stroke, geoLayout[adj + 'color'])
                .call(Drawing.dashLine, '', geoLayout[adj + 'width']);
        } else if(isFillLayer(d)) {
            path.call(Color.fill, geoLayout[adj + 'color']);
        }
    });
};

proto.updateDims = function(fullLayout, geoLayout) {
    var b = this.bounds;
    var hFrameWidth = (geoLayout.framewidth || 0) / 2;

    var l = b[0][0] - hFrameWidth;
    var t = b[0][1] - hFrameWidth;
    var w = b[1][0] - l + hFrameWidth;
    var h = b[1][1] - t + hFrameWidth;

    Drawing.setRect(this.clipRect, l, t, w, h);

    this.bgRect
        .call(Drawing.setRect, l, t, w, h)
        .call(Color.fill, geoLayout.bgcolor);

    this.xaxis._offset = l;
    this.xaxis._length = w;

    this.yaxis._offset = t;
    this.yaxis._length = h;
};

proto.updateFx = function(fullLayout, geoLayout) {
    var _this = this;
    var gd = _this.graphDiv;
    var bgRect = _this.bgRect;
    var dragMode = fullLayout.dragmode;
    var clickMode = fullLayout.clickmode;

    if(_this.isStatic) return;

    function zoomReset() {
        var viewInitial = _this.viewInitial;
        var updateObj = {};

        for(var k in viewInitial) {
            updateObj[_this.id + '.' + k] = viewInitial[k];
        }

        Registry.call('_guiRelayout', gd, updateObj);
        gd.emit('plotly_doubleclick', null);
    }

    function invert(lonlat) {
        return _this.projection.invert([
            lonlat[0] + _this.xaxis._offset,
            lonlat[1] + _this.yaxis._offset
        ]);
    }

    var fillRangeItems;

    if(dragMode === 'select') {
        fillRangeItems = function(eventData, poly) {
            var ranges = eventData.range = {};
            ranges[_this.id] = [
                invert([poly.xmin, poly.ymin]),
                invert([poly.xmax, poly.ymax])
            ];
        };
    } else if(dragMode === 'lasso') {
        fillRangeItems = function(eventData, poly, pts) {
            var dataPts = eventData.lassoPoints = {};
            dataPts[_this.id] = pts.filtered.map(invert);
        };
    }

    // Note: dragOptions is needed to be declared for all dragmodes because
    // it's the object that holds persistent selection state.
    var dragOptions = {
        element: _this.bgRect.node(),
        gd: gd,
        plotinfo: {
            id: _this.id,
            xaxis: _this.xaxis,
            yaxis: _this.yaxis,
            fillRangeItems: fillRangeItems
        },
        xaxes: [_this.xaxis],
        yaxes: [_this.yaxis],
        subplot: _this.id,
        clickFn: function(numClicks) {
            if(numClicks === 2) {
                clearSelect(gd);
            }
        }
    };

    if(dragMode === 'pan') {
        bgRect.node().onmousedown = null;
        bgRect.call(createGeoZoom(_this, geoLayout));
        bgRect.on('dblclick.zoom', zoomReset);
        if(!gd._context._scrollZoom.geo) {
            bgRect.on('wheel.zoom', null);
        }
    } else if(dragMode === 'select' || dragMode === 'lasso') {
        bgRect.on('.zoom', null);

        dragOptions.prepFn = function(e, startX, startY) {
            prepSelect(e, startX, startY, dragOptions, dragMode);
        };

        dragElement.init(dragOptions);
    }

    bgRect.on('mousemove', function() {
        var lonlat = _this.projection.invert(d3.mouse(this));

        if(!lonlat || isNaN(lonlat[0]) || isNaN(lonlat[1])) {
            return dragElement.unhover(gd, d3.event);
        }

        _this.xaxis.p2c = function() { return lonlat[0]; };
        _this.yaxis.p2c = function() { return lonlat[1]; };

        Fx.hover(gd, d3.event, _this.id);
    });

    bgRect.on('mouseout', function() {
        if(gd._dragging) return;
        dragElement.unhover(gd, d3.event);
    });

    bgRect.on('click', function() {
        // For select and lasso the dragElement is handling clicks
        if(dragMode !== 'select' && dragMode !== 'lasso') {
            if(clickMode.indexOf('select') > -1) {
                selectOnClick(d3.event, gd, [_this.xaxis], [_this.yaxis],
                  _this.id, dragOptions);
            }

            if(clickMode.indexOf('event') > -1) {
                // TODO: like pie and mapbox, this doesn't support right-click
                // actually this one is worse, as right-click starts a pan, or leaves
                // select in a weird state.
                // Also, only tangentially related, we should cancel hover during pan
                Fx.click(gd, d3.event);
            }
        }
    });
};

proto.makeFramework = function() {
    var _this = this;
    var gd = _this.graphDiv;
    var fullLayout = gd._fullLayout;
    var clipId = 'clip' + fullLayout._uid + _this.id;

    _this.clipDef = fullLayout._clips.append('clipPath')
        .attr('id', clipId);

    _this.clipRect = _this.clipDef.append('rect');

    _this.framework = d3.select(_this.container).append('g')
        .attr('class', 'geo ' + _this.id)
        .call(Drawing.setClipUrl, clipId, gd);

    // sane lonlat to px
    _this.project = function(v) {
        var px = _this.projection(v);
        return px ?
            [px[0] - _this.xaxis._offset, px[1] - _this.yaxis._offset] :
            [null, null];
    };

    _this.xaxis = {
        _id: 'x',
        c2p: function(v) { return _this.project(v)[0]; }
    };

    _this.yaxis = {
        _id: 'y',
        c2p: function(v) { return _this.project(v)[1]; }
    };

    // mock axis for hover formatting
    _this.mockAxis = {
        type: 'linear',
        showexponent: 'all',
        exponentformat: 'B'
    };
    Axes.setConvert(_this.mockAxis, fullLayout);
};

proto.saveViewInitial = function(geoLayout) {
    var center = geoLayout.center || {};
    var projLayout = geoLayout.projection;
    var rotation = projLayout.rotation || {};

    this.viewInitial = {
        'fitbounds': geoLayout.fitbounds,
        'projection.scale': projLayout.scale
    };

    var extra;
    if(geoLayout._isScoped) {
        extra = {
            'center.lon': center.lon,
            'center.lat': center.lat,
        };
    } else if(geoLayout._isClipped) {
        extra = {
            'projection.rotation.lon': rotation.lon,
            'projection.rotation.lat': rotation.lat
        };
    } else {
        extra = {
            'center.lon': center.lon,
            'center.lat': center.lat,
            'projection.rotation.lon': rotation.lon
        };
    }

    Lib.extendFlat(this.viewInitial, extra);
};

// [hot code path] (re)draw all paths which depend on the projection
proto.render = function() {
    var projection = this.projection;
    var pathFn = projection.getPath();
    var k;

    function translatePoints(d) {
        var lonlatPx = projection(d.lonlat);
        return lonlatPx ?
            'translate(' + lonlatPx[0] + ',' + lonlatPx[1] + ')' :
             null;
    }

    function hideShowPoints(d) {
        return projection.isLonLatOverEdges(d.lonlat) ? 'none' : null;
    }

    for(k in this.basePaths) {
        this.basePaths[k].attr('d', pathFn);
    }

    for(k in this.dataPaths) {
        this.dataPaths[k].attr('d', function(d) { return pathFn(d.geojson); });
    }

    for(k in this.dataPoints) {
        this.dataPoints[k]
            .attr('display', hideShowPoints)
            .attr('transform', translatePoints);
    }
};

// Helper that wraps d3.geo[/* projection name /*]() which:
//
// - adds 'fitExtent' (available in d3 v4)
// - adds 'getPath', 'getBounds' convenience methods
// - scopes logic related to 'clipAngle'
// - adds 'isLonLatOverEdges' method
// - sets projection precision
// - sets methods that aren't always defined depending
//   on the projection type to a dummy 'd3-esque' function,
//
// This wrapper alleviates subsequent code of (many) annoying if-statements.
function getProjection(geoLayout) {
    var projLayout = geoLayout.projection;
    var projType = projLayout.type;

    var projection = d3.geo[constants.projNames[projType]]();

    var clipAngle = geoLayout._isClipped ?
        constants.lonaxisSpan[projType] / 2 :
        null;

    var methods = ['center', 'rotate', 'parallels', 'clipExtent'];
    var dummyFn = function(_) { return _ ? projection : []; };

    for(var i = 0; i < methods.length; i++) {
        var m = methods[i];
        if(typeof projection[m] !== 'function') {
            projection[m] = dummyFn;
        }
    }

    projection.isLonLatOverEdges = function(lonlat) {
        if(projection(lonlat) === null) {
            return true;
        }

        if(clipAngle) {
            var r = projection.rotate();
            var angle = d3.geo.distance(lonlat, [-r[0], -r[1]]);
            var maxAngle = clipAngle * Math.PI / 180;
            return angle > maxAngle;
        } else {
            return false;
        }
    };

    projection.getPath = function() {
        return d3.geo.path().projection(projection);
    };

    projection.getBounds = function(object) {
        return projection.getPath().bounds(object);
    };

    // adapted from d3 v4:
    // https://github.com/d3/d3-geo/blob/master/src/projection/fit.js
    projection.fitExtent = function(extent, object) {
        var w = extent[1][0] - extent[0][0];
        var h = extent[1][1] - extent[0][1];
        var clip = projection.clipExtent && projection.clipExtent();

        projection
            .scale(150)
            .translate([0, 0]);

        if(clip) projection.clipExtent(null);

        var b = projection.getBounds(object);
        var k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1]));
        var x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2;
        var y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;

        if(clip) projection.clipExtent(clip);

        return projection
            .scale(k * 150)
            .translate([x, y]);
    };

    projection.precision(constants.precision);

    if(clipAngle) {
        projection.clipAngle(clipAngle - constants.clipPad);
    }

    return projection;
}

function makeGraticule(axisName, geoLayout, fullLayout) {
    // equivalent to the d3 "ε"
    var epsilon = 1e-6;
    // same as the geoGraticule default
    var precision = 2.5;

    var axLayout = geoLayout[axisName];
    var scopeDefaults = constants.scopeDefaults[geoLayout.scope];
    var rng;
    var oppRng;
    var coordFn;

    if(axisName === 'lonaxis') {
        rng = scopeDefaults.lonaxisRange;
        oppRng = scopeDefaults.lataxisRange;
        coordFn = function(v, l) { return [v, l]; };
    } else if(axisName === 'lataxis') {
        rng = scopeDefaults.lataxisRange;
        oppRng = scopeDefaults.lonaxisRange;
        coordFn = function(v, l) { return [l, v]; };
    }

    var dummyAx = {
        type: 'linear',
        range: [rng[0], rng[1] - epsilon],
        tick0: axLayout.tick0,
        dtick: axLayout.dtick
    };

    Axes.setConvert(dummyAx, fullLayout);
    var vals = Axes.calcTicks(dummyAx);

    // remove duplicate on antimeridian
    if(!geoLayout.isScoped && axisName === 'lonaxis') {
        vals.pop();
    }

    var len = vals.length;
    var coords = new Array(len);

    for(var i = 0; i < len; i++) {
        var v = vals[i].x;
        var line = coords[i] = [];
        for(var l = oppRng[0]; l < oppRng[1] + precision; l += precision) {
            line.push(coordFn(v, l));
        }
    }

    return {
        type: 'MultiLineString',
        coordinates: coords
    };
}

// Returns polygon GeoJSON corresponding to lon/lat range box
// with well-defined direction
//
// Note that clipPad padding is added around range to avoid aliasing.
function makeRangeBox(lon, lat) {
    var clipPad = constants.clipPad;
    var lon0 = lon[0] + clipPad;
    var lon1 = lon[1] - clipPad;
    var lat0 = lat[0] + clipPad;
    var lat1 = lat[1] - clipPad;

    // to cross antimeridian w/o ambiguity
    if(lon0 > 0 && lon1 < 0) lon1 += 360;

    var dlon4 = (lon1 - lon0) / 4;

    return {
        type: 'Polygon',
        coordinates: [[
            [lon0, lat0],
            [lon0, lat1],
            [lon0 + dlon4, lat1],
            [lon0 + 2 * dlon4, lat1],
            [lon0 + 3 * dlon4, lat1],
            [lon1, lat1],
            [lon1, lat0],
            [lon1 - dlon4, lat0],
            [lon1 - 2 * dlon4, lat0],
            [lon1 - 3 * dlon4, lat0],
            [lon0, lat0]
        ]]
    };
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/geo/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/geo/index.js ***!
  \*******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var getSubplotCalcData = __webpack_require__(/*! ../../plots/get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getSubplotCalcData;
var counterRegex = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").counterRegex;

var createGeo = __webpack_require__(/*! ./geo */ "./node_modules/plotly.js/src/plots/geo/geo.js");

var GEO = 'geo';
var counter = counterRegex(GEO);

var attributes = {};
attributes[GEO] = {
    valType: 'subplotid',
    role: 'info',
    dflt: GEO,
    editType: 'calc',
    description: [
        'Sets a reference between this trace\'s geospatial coordinates and',
        'a geographic map.',
        'If *geo* (the default value), the geospatial coordinates refer to',
        '`layout.geo`.',
        'If *geo2*, the geospatial coordinates refer to `layout.geo2`,',
        'and so on.'
    ].join(' ')
};

function plotGeo(gd) {
    var fullLayout = gd._fullLayout;
    var calcData = gd.calcdata;
    var geoIds = fullLayout._subplots[GEO];

    for(var i = 0; i < geoIds.length; i++) {
        var geoId = geoIds[i];
        var geoCalcData = getSubplotCalcData(calcData, GEO, geoId);
        var geoLayout = fullLayout[geoId];
        var geo = geoLayout._subplot;

        if(!geo) {
            geo = createGeo({
                id: geoId,
                graphDiv: gd,
                container: fullLayout._geolayer.node(),
                topojsonURL: gd._context.topojsonURL,
                staticPlot: gd._context.staticPlot
            });

            fullLayout[geoId]._subplot = geo;
        }

        geo.plot(geoCalcData, fullLayout, gd._promises);
    }
}

function clean(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var oldGeoKeys = oldFullLayout._subplots[GEO] || [];

    for(var i = 0; i < oldGeoKeys.length; i++) {
        var oldGeoKey = oldGeoKeys[i];
        var oldGeo = oldFullLayout[oldGeoKey]._subplot;

        if(!newFullLayout[oldGeoKey] && !!oldGeo) {
            oldGeo.framework.remove();
            oldGeo.clipDef.remove();
        }
    }
}

function updateFx(gd) {
    var fullLayout = gd._fullLayout;
    var subplotIds = fullLayout._subplots[GEO];

    for(var i = 0; i < subplotIds.length; i++) {
        var subplotLayout = fullLayout[subplotIds[i]];
        var subplotObj = subplotLayout._subplot;
        subplotObj.updateFx(fullLayout, subplotLayout);
    }
}

module.exports = {
    attr: GEO,
    name: GEO,
    idRoot: GEO,
    idRegex: counter,
    attrRegex: counter,
    attributes: attributes,
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/geo/layout_attributes.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/plots/geo/layout_defaults.js"),
    plot: plotGeo,
    updateFx: updateFx,
    clean: clean
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/geo/layout_attributes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/geo/layout_attributes.js ***!
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



var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");
var domainAttrs = __webpack_require__(/*! ../domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/geo/constants.js");
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

var geoAxesAttrs = {
    range: {
        valType: 'info_array',
        role: 'info',
        items: [
            {valType: 'number'},
            {valType: 'number'}
        ],
        description: [
            'Sets the range of this axis (in degrees),',
            'sets the map\'s clipped coordinates.'
        ].join(' ')
    },
    showgrid: {
        valType: 'boolean',
        role: 'info',
        dflt: false,
        description: 'Sets whether or not graticule are shown on the map.'
    },
    tick0: {
        valType: 'number',
        role: 'info',
        dflt: 0,
        description: [
            'Sets the graticule\'s starting tick longitude/latitude.'
        ].join(' ')
    },
    dtick: {
        valType: 'number',
        role: 'info',
        description: [
            'Sets the graticule\'s longitude/latitude tick step.'
        ].join(' ')
    },
    gridcolor: {
        valType: 'color',
        role: 'style',
        dflt: colorAttrs.lightLine,
        description: [
            'Sets the graticule\'s stroke color.'
        ].join(' ')
    },
    gridwidth: {
        valType: 'number',
        role: 'style',
        min: 0,
        dflt: 1,
        description: [
            'Sets the graticule\'s stroke width (in px).'
        ].join(' ')
    }
};

var attrs = module.exports = overrideAll({
    domain: domainAttrs({name: 'geo'}, {
        description: [
            'Note that geo subplots are constrained by domain.',
            'In general, when `projection.scale` is set to 1.',
            'a map will fit either its x or y domain, but not both.'
        ].join(' ')
    }),

    fitbounds: {
        valType: 'enumerated',
        values: [false, 'locations', 'geojson'],
        dflt: false,
        role: 'info',
        editType: 'plot',
        description: [
            'Determines if this subplot\'s view settings are auto-computed to fit trace data.',

            'On scoped maps, setting `fitbounds` leads to `center.lon` and `center.lat` getting auto-filled.',

            'On maps with a non-clipped projection, setting `fitbounds` leads to `center.lon`, `center.lat`,',
            'and `projection.rotation.lon` getting auto-filled.',

            'On maps with a clipped projection, setting `fitbounds` leads to `center.lon`, `center.lat`,',
            '`projection.rotation.lon`, `projection.rotation.lat`, `lonaxis.range` and `lonaxis.range`',
            'getting auto-filled.',

            // TODO we should auto-fill `projection.parallels` for maps
            // with conic projection, but how?

            'If *locations*, only the trace\'s visible locations are considered in the `fitbounds` computations.',
            'If *geojson*, the entire trace input `geojson` (if provided) is considered in the `fitbounds` computations,',
            'Defaults to *false*.'
        ].join(' ')
    },

    resolution: {
        valType: 'enumerated',
        values: [110, 50],
        role: 'info',
        dflt: 110,
        coerceNumber: true,
        description: [
            'Sets the resolution of the base layers.',
            'The values have units of km/mm',
            'e.g. 110 corresponds to a scale ratio of 1:110,000,000.'
        ].join(' ')
    },
    scope: {
        valType: 'enumerated',
        role: 'info',
        values: Object.keys(constants.scopeDefaults),
        dflt: 'world',
        description: 'Set the scope of the map.'
    },
    projection: {
        type: {
            valType: 'enumerated',
            role: 'info',
            values: Object.keys(constants.projNames),
            description: 'Sets the projection type.'
        },
        rotation: {
            lon: {
                valType: 'number',
                role: 'info',
                description: [
                    'Rotates the map along parallels',
                    '(in degrees East).',
                    'Defaults to the center of the `lonaxis.range` values.'
                ].join(' ')
            },
            lat: {
                valType: 'number',
                role: 'info',
                description: [
                    'Rotates the map along meridians',
                    '(in degrees North).'
                ].join(' ')
            },
            roll: {
                valType: 'number',
                role: 'info',
                description: [
                    'Roll the map (in degrees)',
                    'For example, a roll of *180* makes the map appear upside down.'
                ].join(' ')
            }
        },
        parallels: {
            valType: 'info_array',
            role: 'info',
            items: [
                {valType: 'number'},
                {valType: 'number'}
            ],
            description: [
                'For conic projection types only.',
                'Sets the parallels (tangent, secant)',
                'where the cone intersects the sphere.'
            ].join(' ')
        },
        scale: {
            valType: 'number',
            role: 'info',
            min: 0,
            dflt: 1,
            description: [
                'Zooms in or out on the map view.',
                'A scale of *1* corresponds to the largest zoom level',
                'that fits the map\'s lon and lat ranges. '
            ].join(' ')
        },
    },
    center: {
        lon: {
            valType: 'number',
            role: 'info',
            description: [
                'Sets the longitude of the map\'s center.',
                'By default, the map\'s longitude center lies at the middle of the longitude range',
                'for scoped projection and above `projection.rotation.lon` otherwise.'
            ].join(' ')
        },
        lat: {
            valType: 'number',
            role: 'info',
            description: [
                'Sets the latitude of the map\'s center.',
                'For all projection types, the map\'s latitude center lies',
                'at the middle of the latitude range by default.'
            ].join(' ')
        }
    },
    visible: {
        valType: 'boolean',
        role: 'info',
        dflt: true,
        description: 'Sets the default visibility of the base layers.'
    },
    showcoastlines: {
        valType: 'boolean',
        role: 'info',
        description: 'Sets whether or not the coastlines are drawn.'
    },
    coastlinecolor: {
        valType: 'color',
        role: 'style',
        dflt: colorAttrs.defaultLine,
        description: 'Sets the coastline color.'
    },
    coastlinewidth: {
        valType: 'number',
        role: 'style',
        min: 0,
        dflt: 1,
        description: 'Sets the coastline stroke width (in px).'
    },
    showland: {
        valType: 'boolean',
        role: 'info',
        dflt: false,
        description: 'Sets whether or not land masses are filled in color.'
    },
    landcolor: {
        valType: 'color',
        role: 'style',
        dflt: constants.landColor,
        description: 'Sets the land mass color.'
    },
    showocean: {
        valType: 'boolean',
        role: 'info',
        dflt: false,
        description: 'Sets whether or not oceans are filled in color.'
    },
    oceancolor: {
        valType: 'color',
        role: 'style',
        dflt: constants.waterColor,
        description: 'Sets the ocean color'
    },
    showlakes: {
        valType: 'boolean',
        role: 'info',
        dflt: false,
        description: 'Sets whether or not lakes are drawn.'
    },
    lakecolor: {
        valType: 'color',
        role: 'style',
        dflt: constants.waterColor,
        description: 'Sets the color of the lakes.'
    },
    showrivers: {
        valType: 'boolean',
        role: 'info',
        dflt: false,
        description: 'Sets whether or not rivers are drawn.'
    },
    rivercolor: {
        valType: 'color',
        role: 'style',
        dflt: constants.waterColor,
        description: 'Sets color of the rivers.'
    },
    riverwidth: {
        valType: 'number',
        role: 'style',
        min: 0,
        dflt: 1,
        description: 'Sets the stroke width (in px) of the rivers.'
    },
    showcountries: {
        valType: 'boolean',
        role: 'info',
        description: 'Sets whether or not country boundaries are drawn.'
    },
    countrycolor: {
        valType: 'color',
        role: 'style',
        dflt: colorAttrs.defaultLine,
        description: 'Sets line color of the country boundaries.'
    },
    countrywidth: {
        valType: 'number',
        role: 'style',
        min: 0,
        dflt: 1,
        description: 'Sets line width (in px) of the country boundaries.'
    },
    showsubunits: {
        valType: 'boolean',
        role: 'info',
        description: [
            'Sets whether or not boundaries of subunits within countries',
            '(e.g. states, provinces) are drawn.'
        ].join(' ')
    },
    subunitcolor: {
        valType: 'color',
        role: 'style',
        dflt: colorAttrs.defaultLine,
        description: 'Sets the color of the subunits boundaries.'
    },
    subunitwidth: {
        valType: 'number',
        role: 'style',
        min: 0,
        dflt: 1,
        description: 'Sets the stroke width (in px) of the subunits boundaries.'
    },
    showframe: {
        valType: 'boolean',
        role: 'info',
        description: 'Sets whether or not a frame is drawn around the map.'
    },
    framecolor: {
        valType: 'color',
        role: 'style',
        dflt: colorAttrs.defaultLine,
        description: 'Sets the color the frame.'
    },
    framewidth: {
        valType: 'number',
        role: 'style',
        min: 0,
        dflt: 1,
        description: 'Sets the stroke width (in px) of the frame.'
    },
    bgcolor: {
        valType: 'color',
        role: 'style',
        dflt: colorAttrs.background,
        description: 'Set the background color of the map'
    },
    lonaxis: geoAxesAttrs,
    lataxis: geoAxesAttrs
}, 'plot', 'from-root');

// set uirevision outside of overrideAll so it can be `editType: 'none'`
attrs.uirevision = {
    valType: 'any',
    role: 'info',
    editType: 'none',
    description: [
        'Controls persistence of user-driven changes in the view',
        '(projection and center). Defaults to `layout.uirevision`.'
    ].join(' ')
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/geo/layout_defaults.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/geo/layout_defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var handleSubplotDefaults = __webpack_require__(/*! ../subplot_defaults */ "./node_modules/plotly.js/src/plots/subplot_defaults.js");
var getSubplotData = __webpack_require__(/*! ../get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getSubplotData;

var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/geo/constants.js");
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/geo/layout_attributes.js");

var axesNames = constants.axesNames;

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut, fullData) {
    handleSubplotDefaults(layoutIn, layoutOut, fullData, {
        type: 'geo',
        attributes: layoutAttributes,
        handleDefaults: handleGeoDefaults,
        fullData: fullData,
        partition: 'y'
    });
};

function handleGeoDefaults(geoLayoutIn, geoLayoutOut, coerce, opts) {
    var subplotData = getSubplotData(opts.fullData, 'geo', opts.id);
    var traceIndices = subplotData.map(function(t) { return t._expandedIndex; });

    var resolution = coerce('resolution');
    var scope = coerce('scope');
    var scopeParams = constants.scopeDefaults[scope];

    var projType = coerce('projection.type', scopeParams.projType);
    var isAlbersUsa = geoLayoutOut._isAlbersUsa = projType === 'albers usa';

    // no other scopes are allowed for 'albers usa' projection
    if(isAlbersUsa) scope = geoLayoutOut.scope = 'usa';

    var isScoped = geoLayoutOut._isScoped = (scope !== 'world');
    var isConic = geoLayoutOut._isConic = projType.indexOf('conic') !== -1;
    var isClipped = geoLayoutOut._isClipped = !!constants.lonaxisSpan[projType];

    if(geoLayoutIn.visible === false) {
        // should override template.layout.geo.show* - see issue 4482

        // make a copy
        var newTemplate = Lib.extendDeep({}, geoLayoutOut._template);

        // override show*
        newTemplate.showcoastlines = false;
        newTemplate.showcountries = false;
        newTemplate.showframe = false;
        newTemplate.showlakes = false;
        newTemplate.showland = false;
        newTemplate.showocean = false;
        newTemplate.showrivers = false;
        newTemplate.showsubunits = false;
        if(newTemplate.lonaxis) newTemplate.lonaxis.showgrid = false;
        if(newTemplate.lataxis) newTemplate.lataxis.showgrid = false;

        // set ref to copy
        geoLayoutOut._template = newTemplate;
    }
    var visible = coerce('visible');

    var show;
    for(var i = 0; i < axesNames.length; i++) {
        var axisName = axesNames[i];
        var dtickDflt = [30, 10][i];
        var rangeDflt;

        if(isScoped) {
            rangeDflt = scopeParams[axisName + 'Range'];
        } else {
            var dfltSpans = constants[axisName + 'Span'];
            var hSpan = (dfltSpans[projType] || dfltSpans['*']) / 2;
            var rot = coerce(
                'projection.rotation.' + axisName.substr(0, 3),
                scopeParams.projRotate[i]
            );
            rangeDflt = [rot - hSpan, rot + hSpan];
        }

        var range = coerce(axisName + '.range', rangeDflt);
        coerce(axisName + '.tick0');
        coerce(axisName + '.dtick', dtickDflt);

        show = coerce(axisName + '.showgrid', !visible ? false : undefined);
        if(show) {
            coerce(axisName + '.gridcolor');
            coerce(axisName + '.gridwidth');
        }

        // mock axis for autorange computations
        geoLayoutOut[axisName]._ax = {
            type: 'linear',
            _id: axisName.slice(0, 3),
            _traceIndices: traceIndices,
            setScale: Lib.identity,
            c2l: Lib.identity,
            r2l: Lib.identity,
            autorange: true,
            range: range.slice(),
            _m: 1,
            _input: {}
        };
    }

    var lonRange = geoLayoutOut.lonaxis.range;
    var latRange = geoLayoutOut.lataxis.range;

    // to cross antimeridian w/o ambiguity
    var lon0 = lonRange[0];
    var lon1 = lonRange[1];
    if(lon0 > 0 && lon1 < 0) lon1 += 360;

    var centerLon = (lon0 + lon1) / 2;
    var projLon;

    if(!isAlbersUsa) {
        var dfltProjRotate = isScoped ? scopeParams.projRotate : [centerLon, 0, 0];

        projLon = coerce('projection.rotation.lon', dfltProjRotate[0]);
        coerce('projection.rotation.lat', dfltProjRotate[1]);
        coerce('projection.rotation.roll', dfltProjRotate[2]);

        show = coerce('showcoastlines', !isScoped && visible);
        if(show) {
            coerce('coastlinecolor');
            coerce('coastlinewidth');
        }

        show = coerce('showocean', !visible ? false : undefined);
        if(show) coerce('oceancolor');
    }

    var centerLonDflt;
    var centerLatDflt;

    if(isAlbersUsa) {
        // 'albers usa' does not have a 'center',
        // these values were found using via:
        //   projection.invert([geoLayout.center.lon, geoLayoutIn.center.lat])
        centerLonDflt = -96.6;
        centerLatDflt = 38.7;
    } else {
        centerLonDflt = isScoped ? centerLon : projLon;
        centerLatDflt = (latRange[0] + latRange[1]) / 2;
    }

    coerce('center.lon', centerLonDflt);
    coerce('center.lat', centerLatDflt);

    if(isConic) {
        var dfltProjParallels = scopeParams.projParallels || [0, 60];
        coerce('projection.parallels', dfltProjParallels);
    }

    coerce('projection.scale');

    show = coerce('showland', !visible ? false : undefined);
    if(show) coerce('landcolor');

    show = coerce('showlakes', !visible ? false : undefined);
    if(show) coerce('lakecolor');

    show = coerce('showrivers', !visible ? false : undefined);
    if(show) {
        coerce('rivercolor');
        coerce('riverwidth');
    }

    show = coerce('showcountries', isScoped && scope !== 'usa' && visible);
    if(show) {
        coerce('countrycolor');
        coerce('countrywidth');
    }

    if(scope === 'usa' || (scope === 'north america' && resolution === 50)) {
        // Only works for:
        //   USA states at 110m
        //   USA states + Canada provinces at 50m
        coerce('showsubunits', visible);
        coerce('subunitcolor');
        coerce('subunitwidth');
    }

    if(!isScoped) {
        // Does not work in non-world scopes
        show = coerce('showframe', visible);
        if(show) {
            coerce('framecolor');
            coerce('framewidth');
        }
    }

    coerce('bgcolor');

    var fitBounds = coerce('fitbounds');

    // clear attributes that will get auto-filled later
    if(fitBounds) {
        delete geoLayoutOut.projection.scale;

        if(isScoped) {
            delete geoLayoutOut.center.lon;
            delete geoLayoutOut.center.lat;
        } else if(isClipped) {
            delete geoLayoutOut.center.lon;
            delete geoLayoutOut.center.lat;
            delete geoLayoutOut.projection.rotation.lon;
            delete geoLayoutOut.projection.rotation.lat;
            delete geoLayoutOut.lonaxis.range;
            delete geoLayoutOut.lataxis.range;
        } else {
            delete geoLayoutOut.center.lon;
            delete geoLayoutOut.center.lat;
            delete geoLayoutOut.projection.rotation.lon;
        }
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/geo/projections.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/geo/projections.js ***!
  \*************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

/*
 * Generated by https://github.com/etpinard/d3-geo-projection-picker
 *
 * which is hand-picks projection from https://github.com/d3/d3-geo-projection
 *
 * into a CommonJS require-able module.
 */



/* eslint-disable */

function addProjectionsToD3(d3) {
  d3.geo.project = function(object, projection) {
    var stream = projection.stream;
    if (!stream) throw new Error("not yet supported");
    return (object && d3_geo_projectObjectType.hasOwnProperty(object.type) ? d3_geo_projectObjectType[object.type] : d3_geo_projectGeometry)(object, stream);
  };
  function d3_geo_projectFeature(object, stream) {
    return {
      type: "Feature",
      id: object.id,
      properties: object.properties,
      geometry: d3_geo_projectGeometry(object.geometry, stream)
    };
  }
  function d3_geo_projectGeometry(geometry, stream) {
    if (!geometry) return null;
    if (geometry.type === "GeometryCollection") return {
      type: "GeometryCollection",
      geometries: object.geometries.map(function(geometry) {
        return d3_geo_projectGeometry(geometry, stream);
      })
    };
    if (!d3_geo_projectGeometryType.hasOwnProperty(geometry.type)) return null;
    var sink = d3_geo_projectGeometryType[geometry.type];
    d3.geo.stream(geometry, stream(sink));
    return sink.result();
  }
  var d3_geo_projectObjectType = {
    Feature: d3_geo_projectFeature,
    FeatureCollection: function(object, stream) {
      return {
        type: "FeatureCollection",
        features: object.features.map(function(feature) {
          return d3_geo_projectFeature(feature, stream);
        })
      };
    }
  };
  var d3_geo_projectPoints = [], d3_geo_projectLines = [];
  var d3_geo_projectPoint = {
    point: function(x, y) {
      d3_geo_projectPoints.push([ x, y ]);
    },
    result: function() {
      var result = !d3_geo_projectPoints.length ? null : d3_geo_projectPoints.length < 2 ? {
        type: "Point",
        coordinates: d3_geo_projectPoints[0]
      } : {
        type: "MultiPoint",
        coordinates: d3_geo_projectPoints
      };
      d3_geo_projectPoints = [];
      return result;
    }
  };
  var d3_geo_projectLine = {
    lineStart: d3_geo_projectNoop,
    point: function(x, y) {
      d3_geo_projectPoints.push([ x, y ]);
    },
    lineEnd: function() {
      if (d3_geo_projectPoints.length) d3_geo_projectLines.push(d3_geo_projectPoints),
      d3_geo_projectPoints = [];
    },
    result: function() {
      var result = !d3_geo_projectLines.length ? null : d3_geo_projectLines.length < 2 ? {
        type: "LineString",
        coordinates: d3_geo_projectLines[0]
      } : {
        type: "MultiLineString",
        coordinates: d3_geo_projectLines
      };
      d3_geo_projectLines = [];
      return result;
    }
  };
  var d3_geo_projectPolygon = {
    polygonStart: d3_geo_projectNoop,
    lineStart: d3_geo_projectNoop,
    point: function(x, y) {
      d3_geo_projectPoints.push([ x, y ]);
    },
    lineEnd: function() {
      var n = d3_geo_projectPoints.length;
      if (n) {
        do d3_geo_projectPoints.push(d3_geo_projectPoints[0].slice()); while (++n < 4);
        d3_geo_projectLines.push(d3_geo_projectPoints), d3_geo_projectPoints = [];
      }
    },
    polygonEnd: d3_geo_projectNoop,
    result: function() {
      if (!d3_geo_projectLines.length) return null;
      var polygons = [], holes = [];
      d3_geo_projectLines.forEach(function(ring) {
        if (d3_geo_projectClockwise(ring)) polygons.push([ ring ]); else holes.push(ring);
      });
      holes.forEach(function(hole) {
        var point = hole[0];
        polygons.some(function(polygon) {
          if (d3_geo_projectContains(polygon[0], point)) {
            polygon.push(hole);
            return true;
          }
        }) || polygons.push([ hole ]);
      });
      d3_geo_projectLines = [];
      return !polygons.length ? null : polygons.length > 1 ? {
        type: "MultiPolygon",
        coordinates: polygons
      } : {
        type: "Polygon",
        coordinates: polygons[0]
      };
    }
  };
  var d3_geo_projectGeometryType = {
    Point: d3_geo_projectPoint,
    MultiPoint: d3_geo_projectPoint,
    LineString: d3_geo_projectLine,
    MultiLineString: d3_geo_projectLine,
    Polygon: d3_geo_projectPolygon,
    MultiPolygon: d3_geo_projectPolygon,
    Sphere: d3_geo_projectPolygon
  };
  function d3_geo_projectNoop() {}
  function d3_geo_projectClockwise(ring) {
    if ((n = ring.length) < 4) return false;
    var i = 0, n, area = ring[n - 1][1] * ring[0][0] - ring[n - 1][0] * ring[0][1];
    while (++i < n) area += ring[i - 1][1] * ring[i][0] - ring[i - 1][0] * ring[i][1];
    return area <= 0;
  }
  function d3_geo_projectContains(ring, point) {
    var x = point[0], y = point[1], contains = false;
    for (var i = 0, n = ring.length, j = n - 1; i < n; j = i++) {
      var pi = ring[i], xi = pi[0], yi = pi[1], pj = ring[j], xj = pj[0], yj = pj[1];
      if (yi > y ^ yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) contains = !contains;
    }
    return contains;
  }
  var ε = 1e-6, ε2 = ε * ε, π = Math.PI, halfπ = π / 2, sqrtπ = Math.sqrt(π), radians = π / 180, degrees = 180 / π;
  function sinci(x) {
    return x ? x / Math.sin(x) : 1;
  }
  function sgn(x) {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
  }
  function asin(x) {
    return x > 1 ? halfπ : x < -1 ? -halfπ : Math.asin(x);
  }
  function acos(x) {
    return x > 1 ? 0 : x < -1 ? π : Math.acos(x);
  }
  function asqrt(x) {
    return x > 0 ? Math.sqrt(x) : 0;
  }
  var projection = d3.geo.projection, projectionMutator = d3.geo.projectionMutator;
  d3.geo.interrupt = function(project) {
    var lobes = [ [ [ [ -π, 0 ], [ 0, halfπ ], [ π, 0 ] ] ], [ [ [ -π, 0 ], [ 0, -halfπ ], [ π, 0 ] ] ] ];
    var bounds;
    function forward(λ, φ) {
      var sign = φ < 0 ? -1 : +1, hemilobes = lobes[+(φ < 0)];
      for (var i = 0, n = hemilobes.length - 1; i < n && λ > hemilobes[i][2][0]; ++i) ;
      var coordinates = project(λ - hemilobes[i][1][0], φ);
      coordinates[0] += project(hemilobes[i][1][0], sign * φ > sign * hemilobes[i][0][1] ? hemilobes[i][0][1] : φ)[0];
      return coordinates;
    }
    function reset() {
      bounds = lobes.map(function(hemilobes) {
        return hemilobes.map(function(lobe) {
          var x0 = project(lobe[0][0], lobe[0][1])[0], x1 = project(lobe[2][0], lobe[2][1])[0], y0 = project(lobe[1][0], lobe[0][1])[1], y1 = project(lobe[1][0], lobe[1][1])[1], t;
          if (y0 > y1) t = y0, y0 = y1, y1 = t;
          return [ [ x0, y0 ], [ x1, y1 ] ];
        });
      });
    }
    if (project.invert) forward.invert = function(x, y) {
      var hemibounds = bounds[+(y < 0)], hemilobes = lobes[+(y < 0)];
      for (var i = 0, n = hemibounds.length; i < n; ++i) {
        var b = hemibounds[i];
        if (b[0][0] <= x && x < b[1][0] && b[0][1] <= y && y < b[1][1]) {
          var coordinates = project.invert(x - project(hemilobes[i][1][0], 0)[0], y);
          coordinates[0] += hemilobes[i][1][0];
          return pointEqual(forward(coordinates[0], coordinates[1]), [ x, y ]) ? coordinates : null;
        }
      }
    };
    var projection = d3.geo.projection(forward), stream_ = projection.stream;
    projection.stream = function(stream) {
      var rotate = projection.rotate(), rotateStream = stream_(stream), sphereStream = (projection.rotate([ 0, 0 ]),
      stream_(stream));
      projection.rotate(rotate);
      rotateStream.sphere = function() {
        d3.geo.stream(sphere(), sphereStream);
      };
      return rotateStream;
    };
    projection.lobes = function(_) {
      if (!arguments.length) return lobes.map(function(lobes) {
        return lobes.map(function(lobe) {
          return [ [ lobe[0][0] * 180 / π, lobe[0][1] * 180 / π ], [ lobe[1][0] * 180 / π, lobe[1][1] * 180 / π ], [ lobe[2][0] * 180 / π, lobe[2][1] * 180 / π ] ];
        });
      });
      lobes = _.map(function(lobes) {
        return lobes.map(function(lobe) {
          return [ [ lobe[0][0] * π / 180, lobe[0][1] * π / 180 ], [ lobe[1][0] * π / 180, lobe[1][1] * π / 180 ], [ lobe[2][0] * π / 180, lobe[2][1] * π / 180 ] ];
        });
      });
      reset();
      return projection;
    };
    function sphere() {
      var ε = 1e-6, coordinates = [];
      for (var i = 0, n = lobes[0].length; i < n; ++i) {
        var lobe = lobes[0][i], λ0 = lobe[0][0] * 180 / π, φ0 = lobe[0][1] * 180 / π, φ1 = lobe[1][1] * 180 / π, λ2 = lobe[2][0] * 180 / π, φ2 = lobe[2][1] * 180 / π;
        coordinates.push(resample([ [ λ0 + ε, φ0 + ε ], [ λ0 + ε, φ1 - ε ], [ λ2 - ε, φ1 - ε ], [ λ2 - ε, φ2 + ε ] ], 30));
      }
      for (var i = lobes[1].length - 1; i >= 0; --i) {
        var lobe = lobes[1][i], λ0 = lobe[0][0] * 180 / π, φ0 = lobe[0][1] * 180 / π, φ1 = lobe[1][1] * 180 / π, λ2 = lobe[2][0] * 180 / π, φ2 = lobe[2][1] * 180 / π;
        coordinates.push(resample([ [ λ2 - ε, φ2 - ε ], [ λ2 - ε, φ1 + ε ], [ λ0 + ε, φ1 + ε ], [ λ0 + ε, φ0 - ε ] ], 30));
      }
      return {
        type: "Polygon",
        coordinates: [ d3.merge(coordinates) ]
      };
    }
    function resample(coordinates, m) {
      var i = -1, n = coordinates.length, p0 = coordinates[0], p1, dx, dy, resampled = [];
      while (++i < n) {
        p1 = coordinates[i];
        dx = (p1[0] - p0[0]) / m;
        dy = (p1[1] - p0[1]) / m;
        for (var j = 0; j < m; ++j) resampled.push([ p0[0] + j * dx, p0[1] + j * dy ]);
        p0 = p1;
      }
      resampled.push(p1);
      return resampled;
    }
    function pointEqual(a, b) {
      return Math.abs(a[0] - b[0]) < ε && Math.abs(a[1] - b[1]) < ε;
    }
    return projection;
  };
  function eckert4(λ, φ) {
    var k = (2 + halfπ) * Math.sin(φ);
    φ /= 2;
    for (var i = 0, δ = Infinity; i < 10 && Math.abs(δ) > ε; i++) {
      var cosφ = Math.cos(φ);
      φ -= δ = (φ + Math.sin(φ) * (cosφ + 2) - k) / (2 * cosφ * (1 + cosφ));
    }
    return [ 2 / Math.sqrt(π * (4 + π)) * λ * (1 + Math.cos(φ)), 2 * Math.sqrt(π / (4 + π)) * Math.sin(φ) ];
  }
  eckert4.invert = function(x, y) {
    var A = .5 * y * Math.sqrt((4 + π) / π), k = asin(A), c = Math.cos(k);
    return [ x / (2 / Math.sqrt(π * (4 + π)) * (1 + c)), asin((k + A * (c + 2)) / (2 + halfπ)) ];
  };
  (d3.geo.eckert4 = function() {
    return projection(eckert4);
  }).raw = eckert4;
  var hammerAzimuthalEqualArea = d3.geo.azimuthalEqualArea.raw;
  function hammer(A, B) {
    if (arguments.length < 2) B = A;
    if (B === 1) return hammerAzimuthalEqualArea;
    if (B === Infinity) return hammerQuarticAuthalic;
    function forward(λ, φ) {
      var coordinates = hammerAzimuthalEqualArea(λ / B, φ);
      coordinates[0] *= A;
      return coordinates;
    }
    forward.invert = function(x, y) {
      var coordinates = hammerAzimuthalEqualArea.invert(x / A, y);
      coordinates[0] *= B;
      return coordinates;
    };
    return forward;
  }
  function hammerProjection() {
    var B = 2, m = projectionMutator(hammer), p = m(B);
    p.coefficient = function(_) {
      if (!arguments.length) return B;
      return m(B = +_);
    };
    return p;
  }
  function hammerQuarticAuthalic(λ, φ) {
    return [ λ * Math.cos(φ) / Math.cos(φ /= 2), 2 * Math.sin(φ) ];
  }
  hammerQuarticAuthalic.invert = function(x, y) {
    var φ = 2 * asin(y / 2);
    return [ x * Math.cos(φ / 2) / Math.cos(φ), φ ];
  };
  (d3.geo.hammer = hammerProjection).raw = hammer;
  function kavrayskiy7(λ, φ) {
    return [ 3 * λ / (2 * π) * Math.sqrt(π * π / 3 - φ * φ), φ ];
  }
  kavrayskiy7.invert = function(x, y) {
    return [ 2 / 3 * π * x / Math.sqrt(π * π / 3 - y * y), y ];
  };
  (d3.geo.kavrayskiy7 = function() {
    return projection(kavrayskiy7);
  }).raw = kavrayskiy7;
  function miller(λ, φ) {
    return [ λ, 1.25 * Math.log(Math.tan(π / 4 + .4 * φ)) ];
  }
  miller.invert = function(x, y) {
    return [ x, 2.5 * Math.atan(Math.exp(.8 * y)) - .625 * π ];
  };
  (d3.geo.miller = function() {
    return projection(miller);
  }).raw = miller;
  function mollweideBromleyθ(Cp) {
    return function(θ) {
      var Cpsinθ = Cp * Math.sin(θ), i = 30, δ;
      do θ -= δ = (θ + Math.sin(θ) - Cpsinθ) / (1 + Math.cos(θ)); while (Math.abs(δ) > ε && --i > 0);
      return θ / 2;
    };
  }
  function mollweideBromley(Cx, Cy, Cp) {
    var θ = mollweideBromleyθ(Cp);
    function forward(λ, φ) {
      return [ Cx * λ * Math.cos(φ = θ(φ)), Cy * Math.sin(φ) ];
    }
    forward.invert = function(x, y) {
      var θ = asin(y / Cy);
      return [ x / (Cx * Math.cos(θ)), asin((2 * θ + Math.sin(2 * θ)) / Cp) ];
    };
    return forward;
  }
  var mollweideθ = mollweideBromleyθ(π), mollweide = mollweideBromley(Math.SQRT2 / halfπ, Math.SQRT2, π);
  (d3.geo.mollweide = function() {
    return projection(mollweide);
  }).raw = mollweide;
  function naturalEarth(λ, φ) {
    var φ2 = φ * φ, φ4 = φ2 * φ2;
    return [ λ * (.8707 - .131979 * φ2 + φ4 * (-.013791 + φ4 * (.003971 * φ2 - .001529 * φ4))), φ * (1.007226 + φ2 * (.015085 + φ4 * (-.044475 + .028874 * φ2 - .005916 * φ4))) ];
  }
  naturalEarth.invert = function(x, y) {
    var φ = y, i = 25, δ;
    do {
      var φ2 = φ * φ, φ4 = φ2 * φ2;
      φ -= δ = (φ * (1.007226 + φ2 * (.015085 + φ4 * (-.044475 + .028874 * φ2 - .005916 * φ4))) - y) / (1.007226 + φ2 * (.015085 * 3 + φ4 * (-.044475 * 7 + .028874 * 9 * φ2 - .005916 * 11 * φ4)));
    } while (Math.abs(δ) > ε && --i > 0);
    return [ x / (.8707 + (φ2 = φ * φ) * (-.131979 + φ2 * (-.013791 + φ2 * φ2 * φ2 * (.003971 - .001529 * φ2)))), φ ];
  };
  (d3.geo.naturalEarth = function() {
    return projection(naturalEarth);
  }).raw = naturalEarth;
  var robinsonConstants = [ [ .9986, -.062 ], [ 1, 0 ], [ .9986, .062 ], [ .9954, .124 ], [ .99, .186 ], [ .9822, .248 ], [ .973, .31 ], [ .96, .372 ], [ .9427, .434 ], [ .9216, .4958 ], [ .8962, .5571 ], [ .8679, .6176 ], [ .835, .6769 ], [ .7986, .7346 ], [ .7597, .7903 ], [ .7186, .8435 ], [ .6732, .8936 ], [ .6213, .9394 ], [ .5722, .9761 ], [ .5322, 1 ] ];
  robinsonConstants.forEach(function(d) {
    d[1] *= 1.0144;
  });
  function robinson(λ, φ) {
    var i = Math.min(18, Math.abs(φ) * 36 / π), i0 = Math.floor(i), di = i - i0, ax = (k = robinsonConstants[i0])[0], ay = k[1], bx = (k = robinsonConstants[++i0])[0], by = k[1], cx = (k = robinsonConstants[Math.min(19, ++i0)])[0], cy = k[1], k;
    return [ λ * (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2), (φ > 0 ? halfπ : -halfπ) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2) ];
  }
  robinson.invert = function(x, y) {
    var yy = y / halfπ, φ = yy * 90, i = Math.min(18, Math.abs(φ / 5)), i0 = Math.max(0, Math.floor(i));
    do {
      var ay = robinsonConstants[i0][1], by = robinsonConstants[i0 + 1][1], cy = robinsonConstants[Math.min(19, i0 + 2)][1], u = cy - ay, v = cy - 2 * by + ay, t = 2 * (Math.abs(yy) - by) / u, c = v / u, di = t * (1 - c * t * (1 - 2 * c * t));
      if (di >= 0 || i0 === 1) {
        φ = (y >= 0 ? 5 : -5) * (di + i);
        var j = 50, δ;
        do {
          i = Math.min(18, Math.abs(φ) / 5);
          i0 = Math.floor(i);
          di = i - i0;
          ay = robinsonConstants[i0][1];
          by = robinsonConstants[i0 + 1][1];
          cy = robinsonConstants[Math.min(19, i0 + 2)][1];
          φ -= (δ = (y >= 0 ? halfπ : -halfπ) * (by + di * (cy - ay) / 2 + di * di * (cy - 2 * by + ay) / 2) - y) * degrees;
        } while (Math.abs(δ) > ε2 && --j > 0);
        break;
      }
    } while (--i0 >= 0);
    var ax = robinsonConstants[i0][0], bx = robinsonConstants[i0 + 1][0], cx = robinsonConstants[Math.min(19, i0 + 2)][0];
    return [ x / (bx + di * (cx - ax) / 2 + di * di * (cx - 2 * bx + ax) / 2), φ * radians ];
  };
  (d3.geo.robinson = function() {
    return projection(robinson);
  }).raw = robinson;
  function sinusoidal(λ, φ) {
    return [ λ * Math.cos(φ), φ ];
  }
  sinusoidal.invert = function(x, y) {
    return [ x / Math.cos(y), y ];
  };
  (d3.geo.sinusoidal = function() {
    return projection(sinusoidal);
  }).raw = sinusoidal;
  function aitoff(λ, φ) {
    var cosφ = Math.cos(φ), sinciα = sinci(acos(cosφ * Math.cos(λ /= 2)));
    return [ 2 * cosφ * Math.sin(λ) * sinciα, Math.sin(φ) * sinciα ];
  }
  aitoff.invert = function(x, y) {
    if (x * x + 4 * y * y > π * π + ε) return;
    var λ = x, φ = y, i = 25;
    do {
      var sinλ = Math.sin(λ), sinλ_2 = Math.sin(λ / 2), cosλ_2 = Math.cos(λ / 2), sinφ = Math.sin(φ), cosφ = Math.cos(φ), sin_2φ = Math.sin(2 * φ), sin2φ = sinφ * sinφ, cos2φ = cosφ * cosφ, sin2λ_2 = sinλ_2 * sinλ_2, C = 1 - cos2φ * cosλ_2 * cosλ_2, E = C ? acos(cosφ * cosλ_2) * Math.sqrt(F = 1 / C) : F = 0, F, fx = 2 * E * cosφ * sinλ_2 - x, fy = E * sinφ - y, δxδλ = F * (cos2φ * sin2λ_2 + E * cosφ * cosλ_2 * sin2φ), δxδφ = F * (.5 * sinλ * sin_2φ - E * 2 * sinφ * sinλ_2), δyδλ = F * .25 * (sin_2φ * sinλ_2 - E * sinφ * cos2φ * sinλ), δyδφ = F * (sin2φ * cosλ_2 + E * sin2λ_2 * cosφ), denominator = δxδφ * δyδλ - δyδφ * δxδλ;
      if (!denominator) break;
      var δλ = (fy * δxδφ - fx * δyδφ) / denominator, δφ = (fx * δyδλ - fy * δxδλ) / denominator;
      λ -= δλ, φ -= δφ;
    } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);
    return [ λ, φ ];
  };
  (d3.geo.aitoff = function() {
    return projection(aitoff);
  }).raw = aitoff;
  function winkel3(λ, φ) {
    var coordinates = aitoff(λ, φ);
    return [ (coordinates[0] + λ / halfπ) / 2, (coordinates[1] + φ) / 2 ];
  }
  winkel3.invert = function(x, y) {
    var λ = x, φ = y, i = 25;
    do {
      var cosφ = Math.cos(φ), sinφ = Math.sin(φ), sin_2φ = Math.sin(2 * φ), sin2φ = sinφ * sinφ, cos2φ = cosφ * cosφ, sinλ = Math.sin(λ), cosλ_2 = Math.cos(λ / 2), sinλ_2 = Math.sin(λ / 2), sin2λ_2 = sinλ_2 * sinλ_2, C = 1 - cos2φ * cosλ_2 * cosλ_2, E = C ? acos(cosφ * cosλ_2) * Math.sqrt(F = 1 / C) : F = 0, F, fx = .5 * (2 * E * cosφ * sinλ_2 + λ / halfπ) - x, fy = .5 * (E * sinφ + φ) - y, δxδλ = .5 * F * (cos2φ * sin2λ_2 + E * cosφ * cosλ_2 * sin2φ) + .5 / halfπ, δxδφ = F * (sinλ * sin_2φ / 4 - E * sinφ * sinλ_2), δyδλ = .125 * F * (sin_2φ * sinλ_2 - E * sinφ * cos2φ * sinλ), δyδφ = .5 * F * (sin2φ * cosλ_2 + E * sin2λ_2 * cosφ) + .5, denominator = δxδφ * δyδλ - δyδφ * δxδλ, δλ = (fy * δxδφ - fx * δyδφ) / denominator, δφ = (fx * δyδλ - fy * δxδλ) / denominator;
      λ -= δλ, φ -= δφ;
    } while ((Math.abs(δλ) > ε || Math.abs(δφ) > ε) && --i > 0);
    return [ λ, φ ];
  };
  (d3.geo.winkel3 = function() {
    return projection(winkel3);
  }).raw = winkel3;
}

module.exports = addProjectionsToD3;


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/geo/zoom.js":
/*!******************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/geo/zoom.js ***!
  \******************************************************/
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
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");

var radians = Math.PI / 180;
var degrees = 180 / Math.PI;
var zoomstartStyle = {cursor: 'pointer'};
var zoomendStyle = {cursor: 'auto'};

function createGeoZoom(geo, geoLayout) {
    var projection = geo.projection;
    var zoomConstructor;

    if(geoLayout._isScoped) {
        zoomConstructor = zoomScoped;
    } else if(geoLayout._isClipped) {
        zoomConstructor = zoomClipped;
    } else {
        zoomConstructor = zoomNonClipped;
    }

    // TODO add a conic-specific zoom

    return zoomConstructor(geo, projection);
}

module.exports = createGeoZoom;

// common to all zoom types
function initZoom(geo, projection) {
    return d3.behavior.zoom()
        .translate(projection.translate())
        .scale(projection.scale());
}

// sync zoom updates with user & full layout
function sync(geo, projection, cb) {
    var id = geo.id;
    var gd = geo.graphDiv;
    var layout = gd.layout;
    var userOpts = layout[id];
    var fullLayout = gd._fullLayout;
    var fullOpts = fullLayout[id];

    var preGUI = {};
    var eventData = {};

    function set(propStr, val) {
        preGUI[id + '.' + propStr] = Lib.nestedProperty(userOpts, propStr).get();
        Registry.call('_storeDirectGUIEdit', layout, fullLayout._preGUI, preGUI);

        var fullNp = Lib.nestedProperty(fullOpts, propStr);
        if(fullNp.get() !== val) {
            fullNp.set(val);
            Lib.nestedProperty(userOpts, propStr).set(val);
            eventData[id + '.' + propStr] = val;
        }
    }

    cb(set);
    set('projection.scale', projection.scale() / geo.fitScale);
    set('fitbounds', false);
    gd.emit('plotly_relayout', eventData);
}

// zoom for scoped projections
function zoomScoped(geo, projection) {
    var zoom = initZoom(geo, projection);

    function handleZoomstart() {
        d3.select(this).style(zoomstartStyle);
    }

    function handleZoom() {
        projection
            .scale(d3.event.scale)
            .translate(d3.event.translate);
        geo.render();

        var center = projection.invert(geo.midPt);
        geo.graphDiv.emit('plotly_relayouting', {
            'geo.projection.scale': projection.scale() / geo.fitScale,
            'geo.center.lon': center[0],
            'geo.center.lat': center[1]
        });
    }

    function syncCb(set) {
        var center = projection.invert(geo.midPt);

        set('center.lon', center[0]);
        set('center.lat', center[1]);
    }

    function handleZoomend() {
        d3.select(this).style(zoomendStyle);
        sync(geo, projection, syncCb);
    }

    zoom
        .on('zoomstart', handleZoomstart)
        .on('zoom', handleZoom)
        .on('zoomend', handleZoomend);

    return zoom;
}

// zoom for non-clipped projections
function zoomNonClipped(geo, projection) {
    var zoom = initZoom(geo, projection);

    var INSIDETOLORANCEPXS = 2;

    var mouse0, rotate0, translate0, lastRotate, zoomPoint,
        mouse1, rotate1, point1, didZoom;

    function position(x) { return projection.invert(x); }

    function outside(x) {
        var pos = position(x);
        if(!pos) return true;

        var pt = projection(pos);
        return (
            Math.abs(pt[0] - x[0]) > INSIDETOLORANCEPXS ||
            Math.abs(pt[1] - x[1]) > INSIDETOLORANCEPXS
        );
    }

    function handleZoomstart() {
        d3.select(this).style(zoomstartStyle);

        mouse0 = d3.mouse(this);
        rotate0 = projection.rotate();
        translate0 = projection.translate();
        lastRotate = rotate0;
        zoomPoint = position(mouse0);
    }

    function handleZoom() {
        mouse1 = d3.mouse(this);

        if(outside(mouse0)) {
            zoom.scale(projection.scale());
            zoom.translate(projection.translate());
            return;
        }

        projection.scale(d3.event.scale);
        projection.translate([translate0[0], d3.event.translate[1]]);

        if(!zoomPoint) {
            mouse0 = mouse1;
            zoomPoint = position(mouse0);
        } else if(position(mouse1)) {
            point1 = position(mouse1);
            rotate1 = [lastRotate[0] + (point1[0] - zoomPoint[0]), rotate0[1], rotate0[2]];
            projection.rotate(rotate1);
            lastRotate = rotate1;
        }

        didZoom = true;
        geo.render();

        var rotate = projection.rotate();
        var center = projection.invert(geo.midPt);
        geo.graphDiv.emit('plotly_relayouting', {
            'geo.projection.scale': projection.scale() / geo.fitScale,
            'geo.center.lon': center[0],
            'geo.center.lat': center[1],
            'geo.projection.rotation.lon': -rotate[0]
        });
    }

    function handleZoomend() {
        d3.select(this).style(zoomendStyle);
        if(didZoom) sync(geo, projection, syncCb);
    }

    function syncCb(set) {
        var rotate = projection.rotate();
        var center = projection.invert(geo.midPt);

        set('projection.rotation.lon', -rotate[0]);
        set('center.lon', center[0]);
        set('center.lat', center[1]);
    }

    zoom
        .on('zoomstart', handleZoomstart)
        .on('zoom', handleZoom)
        .on('zoomend', handleZoomend);

    return zoom;
}

// zoom for clipped projections
// inspired by https://www.jasondavies.com/maps/d3.geo.zoom.js
function zoomClipped(geo, projection) {
    var view = {r: projection.rotate(), k: projection.scale()};
    var zoom = initZoom(geo, projection);
    var event = d3eventDispatch(zoom, 'zoomstart', 'zoom', 'zoomend');
    var zooming = 0;
    var zoomOn = zoom.on;

    var zoomPoint;

    zoom.on('zoomstart', function() {
        d3.select(this).style(zoomstartStyle);

        var mouse0 = d3.mouse(this);
        var rotate0 = projection.rotate();
        var lastRotate = rotate0;
        var translate0 = projection.translate();
        var q = quaternionFromEuler(rotate0);

        zoomPoint = position(projection, mouse0);

        zoomOn.call(zoom, 'zoom', function() {
            var mouse1 = d3.mouse(this);

            projection.scale(view.k = d3.event.scale);

            if(!zoomPoint) {
                // if no zoomPoint, the mouse wasn't over the actual geography yet
                // maybe this point is the start... we'll find out next time!
                mouse0 = mouse1;
                zoomPoint = position(projection, mouse0);
            } else if(position(projection, mouse1)) {
                // check if the point is on the map
                // if not, don't do anything new but scale
                // if it is, then we can assume between will exist below
                // so we don't need the 'bank' function, whatever that is.

                // go back to original projection temporarily
                // except for scale... that's kind of independent?
                projection
                    .rotate(rotate0)
                    .translate(translate0);

                // calculate the new params
                var point1 = position(projection, mouse1);
                var between = rotateBetween(zoomPoint, point1);
                var newEuler = eulerFromQuaternion(multiply(q, between));
                var rotateAngles = view.r = unRoll(newEuler, zoomPoint, lastRotate);

                if(!isFinite(rotateAngles[0]) || !isFinite(rotateAngles[1]) ||
                   !isFinite(rotateAngles[2])) {
                    rotateAngles = lastRotate;
                }

                // update the projection
                projection.rotate(rotateAngles);
                lastRotate = rotateAngles;
            }

            zoomed(event.of(this, arguments));
        });

        zoomstarted(event.of(this, arguments));
    })
    .on('zoomend', function() {
        d3.select(this).style(zoomendStyle);
        zoomOn.call(zoom, 'zoom', null);
        zoomended(event.of(this, arguments));
        sync(geo, projection, syncCb);
    })
    .on('zoom.redraw', function() {
        geo.render();

        var _rotate = projection.rotate();
        geo.graphDiv.emit('plotly_relayouting', {
            'geo.projection.scale': projection.scale() / geo.fitScale,
            'geo.projection.rotation.lon': -_rotate[0],
            'geo.projection.rotation.lat': -_rotate[1]
        });
    });

    function zoomstarted(dispatch) {
        if(!zooming++) dispatch({type: 'zoomstart'});
    }

    function zoomed(dispatch) {
        dispatch({type: 'zoom'});
    }

    function zoomended(dispatch) {
        if(!--zooming) dispatch({type: 'zoomend'});
    }

    function syncCb(set) {
        var _rotate = projection.rotate();
        set('projection.rotation.lon', -_rotate[0]);
        set('projection.rotation.lat', -_rotate[1]);
    }

    return d3.rebind(zoom, event, 'on');
}

// -- helper functions for zoomClipped

function position(projection, point) {
    var spherical = projection.invert(point);
    return spherical && isFinite(spherical[0]) && isFinite(spherical[1]) && cartesian(spherical);
}

function quaternionFromEuler(euler) {
    var lambda = 0.5 * euler[0] * radians;
    var phi = 0.5 * euler[1] * radians;
    var gamma = 0.5 * euler[2] * radians;
    var sinLambda = Math.sin(lambda);
    var cosLambda = Math.cos(lambda);
    var sinPhi = Math.sin(phi);
    var cosPhi = Math.cos(phi);
    var sinGamma = Math.sin(gamma);
    var cosGamma = Math.cos(gamma);
    return [
        cosLambda * cosPhi * cosGamma + sinLambda * sinPhi * sinGamma,
        sinLambda * cosPhi * cosGamma - cosLambda * sinPhi * sinGamma,
        cosLambda * sinPhi * cosGamma + sinLambda * cosPhi * sinGamma,
        cosLambda * cosPhi * sinGamma - sinLambda * sinPhi * cosGamma
    ];
}

function multiply(a, b) {
    var a0 = a[0];
    var a1 = a[1];
    var a2 = a[2];
    var a3 = a[3];
    var b0 = b[0];
    var b1 = b[1];
    var b2 = b[2];
    var b3 = b[3];
    return [
        a0 * b0 - a1 * b1 - a2 * b2 - a3 * b3,
        a0 * b1 + a1 * b0 + a2 * b3 - a3 * b2,
        a0 * b2 - a1 * b3 + a2 * b0 + a3 * b1,
        a0 * b3 + a1 * b2 - a2 * b1 + a3 * b0
    ];
}

function rotateBetween(a, b) {
    if(!a || !b) return;
    var axis = cross(a, b);
    var norm = Math.sqrt(dot(axis, axis));
    var halfgamma = 0.5 * Math.acos(Math.max(-1, Math.min(1, dot(a, b))));
    var k = Math.sin(halfgamma) / norm;
    return norm && [Math.cos(halfgamma), axis[2] * k, -axis[1] * k, axis[0] * k];
}

// input:
//   rotateAngles: a calculated set of Euler angles
//   pt: a point (cartesian in 3-space) to keep fixed
//   roll0: an initial roll, to be preserved
// output:
//   a set of Euler angles that preserve the projection of pt
//     but set roll (output[2]) equal to roll0
//     note that this doesn't depend on the particular projection,
//     just on the rotation angles
function unRoll(rotateAngles, pt, lastRotate) {
    // calculate the fixed point transformed by these Euler angles
    // but with the desired roll undone
    var ptRotated = rotateCartesian(pt, 2, rotateAngles[0]);
    ptRotated = rotateCartesian(ptRotated, 1, rotateAngles[1]);
    ptRotated = rotateCartesian(ptRotated, 0, rotateAngles[2] - lastRotate[2]);

    var x = pt[0];
    var y = pt[1];
    var z = pt[2];
    var f = ptRotated[0];
    var g = ptRotated[1];
    var h = ptRotated[2];

    // the following essentially solves:
    // ptRotated = rotateCartesian(rotateCartesian(pt, 2, newYaw), 1, newPitch)
    // for newYaw and newPitch, as best it can
    var theta = Math.atan2(y, x) * degrees;
    var a = Math.sqrt(x * x + y * y);
    var b;
    var newYaw1;

    if(Math.abs(g) > a) {
        newYaw1 = (g > 0 ? 90 : -90) - theta;
        b = 0;
    } else {
        newYaw1 = Math.asin(g / a) * degrees - theta;
        b = Math.sqrt(a * a - g * g);
    }

    var newYaw2 = 180 - newYaw1 - 2 * theta;
    var newPitch1 = (Math.atan2(h, f) - Math.atan2(z, b)) * degrees;
    var newPitch2 = (Math.atan2(h, f) - Math.atan2(z, -b)) * degrees;

    // which is closest to lastRotate[0,1]: newYaw/Pitch or newYaw2/Pitch2?
    var dist1 = angleDistance(lastRotate[0], lastRotate[1], newYaw1, newPitch1);
    var dist2 = angleDistance(lastRotate[0], lastRotate[1], newYaw2, newPitch2);

    if(dist1 <= dist2) return [newYaw1, newPitch1, lastRotate[2]];
    else return [newYaw2, newPitch2, lastRotate[2]];
}

function angleDistance(yaw0, pitch0, yaw1, pitch1) {
    var dYaw = angleMod(yaw1 - yaw0);
    var dPitch = angleMod(pitch1 - pitch0);
    return Math.sqrt(dYaw * dYaw + dPitch * dPitch);
}

// reduce an angle in degrees to [-180,180]
function angleMod(angle) {
    return (angle % 360 + 540) % 360 - 180;
}

// rotate a cartesian vector
// axis is 0 (x), 1 (y), or 2 (z)
// angle is in degrees
function rotateCartesian(vector, axis, angle) {
    var angleRads = angle * radians;
    var vectorOut = vector.slice();
    var ax1 = (axis === 0) ? 1 : 0;
    var ax2 = (axis === 2) ? 1 : 2;
    var cosa = Math.cos(angleRads);
    var sina = Math.sin(angleRads);

    vectorOut[ax1] = vector[ax1] * cosa - vector[ax2] * sina;
    vectorOut[ax2] = vector[ax2] * cosa + vector[ax1] * sina;

    return vectorOut;
}
function eulerFromQuaternion(q) {
    return [
        Math.atan2(2 * (q[0] * q[1] + q[2] * q[3]), 1 - 2 * (q[1] * q[1] + q[2] * q[2])) * degrees,
        Math.asin(Math.max(-1, Math.min(1, 2 * (q[0] * q[2] - q[3] * q[1])))) * degrees,
        Math.atan2(2 * (q[0] * q[3] + q[1] * q[2]), 1 - 2 * (q[2] * q[2] + q[3] * q[3])) * degrees
    ];
}

function cartesian(spherical) {
    var lambda = spherical[0] * radians;
    var phi = spherical[1] * radians;
    var cosPhi = Math.cos(phi);
    return [
        cosPhi * Math.cos(lambda),
        cosPhi * Math.sin(lambda),
        Math.sin(phi)
    ];
}

function dot(a, b) {
    var s = 0;
    for(var i = 0, n = a.length; i < n; ++i) s += a[i] * b[i];
    return s;
}

function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]
    ];
}

// Like d3.dispatch, but for custom events abstracting native UI events. These
// events have a target component (such as a brush), a target element (such as
// the svg:g element containing the brush) and the standard arguments `d` (the
// target element's data) and `i` (the selection index of the target element).
function d3eventDispatch(target) {
    var i = 0;
    var n = arguments.length;
    var argumentz = [];

    while(++i < n) argumentz.push(arguments[i]);

    var dispatch = d3.dispatch.apply(null, argumentz);

    // Creates a dispatch context for the specified `thiz` (typically, the target
    // DOM element that received the source event) and `argumentz` (typically, the
    // data `d` and index `i` of the target element). The returned function can be
    // used to dispatch an event to any registered listeners; the function takes a
    // single argument as input, being the event to dispatch. The event must have
    // a "type" attribute which corresponds to a type registered in the
    // constructor. This context will automatically populate the "sourceEvent" and
    // "target" attributes of the event, as well as setting the `d3.event` global
    // for the duration of the notification.
    dispatch.of = function(thiz, argumentz) {
        return function(e1) {
            var e0;
            try {
                e0 = e1.sourceEvent = d3.event;
                e1.target = target;
                d3.event = e1;
                dispatch[e1.type].apply(thiz, argumentz);
            } finally {
                d3.event = e0;
            }
        };
    };

    return dispatch;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/bbox.js":
/*!**************************************************!*\
  !*** ./node_modules/topojson-client/src/bbox.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transform.js */ "./node_modules/topojson-client/src/transform.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology) {
  var t = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__.default)(topology.transform), key,
      x0 = Infinity, y0 = x0, x1 = -x0, y1 = -x0;

  function bboxPoint(p) {
    p = t(p);
    if (p[0] < x0) x0 = p[0];
    if (p[0] > x1) x1 = p[0];
    if (p[1] < y0) y0 = p[1];
    if (p[1] > y1) y1 = p[1];
  }

  function bboxGeometry(o) {
    switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(bboxGeometry); break;
      case "Point": bboxPoint(o.coordinates); break;
      case "MultiPoint": o.coordinates.forEach(bboxPoint); break;
    }
  }

  topology.arcs.forEach(function(arc) {
    var i = -1, n = arc.length, p;
    while (++i < n) {
      p = t(arc[i], i);
      if (p[0] < x0) x0 = p[0];
      if (p[0] > x1) x1 = p[0];
      if (p[1] < y0) y0 = p[1];
      if (p[1] > y1) y1 = p[1];
    }
  });

  for (key in topology.objects) {
    bboxGeometry(topology.objects[key]);
  }

  return [x0, y0, x1, y1];
}


/***/ }),

/***/ "./node_modules/topojson-client/src/bisect.js":
/*!****************************************************!*\
  !*** ./node_modules/topojson-client/src/bisect.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, x) {
  var lo = 0, hi = a.length;
  while (lo < hi) {
    var mid = lo + hi >>> 1;
    if (a[mid] < x) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/feature.js":
/*!*****************************************************!*\
  !*** ./node_modules/topojson-client/src/feature.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "object": () => (/* binding */ object)
/* harmony export */ });
/* harmony import */ var _reverse_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./reverse.js */ "./node_modules/topojson-client/src/reverse.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ "./node_modules/topojson-client/src/transform.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology, o) {
  if (typeof o === "string") o = topology.objects[o];
  return o.type === "GeometryCollection"
      ? {type: "FeatureCollection", features: o.geometries.map(function(o) { return feature(topology, o); })}
      : feature(topology, o);
}

function feature(topology, o) {
  var id = o.id,
      bbox = o.bbox,
      properties = o.properties == null ? {} : o.properties,
      geometry = object(topology, o);
  return id == null && bbox == null ? {type: "Feature", properties: properties, geometry: geometry}
      : bbox == null ? {type: "Feature", id: id, properties: properties, geometry: geometry}
      : {type: "Feature", id: id, bbox: bbox, properties: properties, geometry: geometry};
}

function object(topology, o) {
  var transformPoint = (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__.default)(topology.transform),
      arcs = topology.arcs;

  function arc(i, points) {
    if (points.length) points.pop();
    for (var a = arcs[i < 0 ? ~i : i], k = 0, n = a.length; k < n; ++k) {
      points.push(transformPoint(a[k], k));
    }
    if (i < 0) (0,_reverse_js__WEBPACK_IMPORTED_MODULE_0__.default)(points, n);
  }

  function point(p) {
    return transformPoint(p);
  }

  function line(arcs) {
    var points = [];
    for (var i = 0, n = arcs.length; i < n; ++i) arc(arcs[i], points);
    if (points.length < 2) points.push(points[0]); // This should never happen per the specification.
    return points;
  }

  function ring(arcs) {
    var points = line(arcs);
    while (points.length < 4) points.push(points[0]); // This may happen if an arc has only two points.
    return points;
  }

  function polygon(arcs) {
    return arcs.map(ring);
  }

  function geometry(o) {
    var type = o.type, coordinates;
    switch (type) {
      case "GeometryCollection": return {type: type, geometries: o.geometries.map(geometry)};
      case "Point": coordinates = point(o.coordinates); break;
      case "MultiPoint": coordinates = o.coordinates.map(point); break;
      case "LineString": coordinates = line(o.arcs); break;
      case "MultiLineString": coordinates = o.arcs.map(line); break;
      case "Polygon": coordinates = polygon(o.arcs); break;
      case "MultiPolygon": coordinates = o.arcs.map(polygon); break;
      default: return null;
    }
    return {type: type, coordinates: coordinates};
  }

  return geometry(o);
}


/***/ }),

/***/ "./node_modules/topojson-client/src/identity.js":
/*!******************************************************!*\
  !*** ./node_modules/topojson-client/src/identity.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return x;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/index.js":
/*!***************************************************!*\
  !*** ./node_modules/topojson-client/src/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bbox": () => (/* reexport safe */ _bbox_js__WEBPACK_IMPORTED_MODULE_0__.default),
/* harmony export */   "feature": () => (/* reexport safe */ _feature_js__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "mesh": () => (/* reexport safe */ _mesh_js__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "meshArcs": () => (/* reexport safe */ _mesh_js__WEBPACK_IMPORTED_MODULE_2__.meshArcs),
/* harmony export */   "merge": () => (/* reexport safe */ _merge_js__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "mergeArcs": () => (/* reexport safe */ _merge_js__WEBPACK_IMPORTED_MODULE_3__.mergeArcs),
/* harmony export */   "neighbors": () => (/* reexport safe */ _neighbors_js__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "quantize": () => (/* reexport safe */ _quantize_js__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "transform": () => (/* reexport safe */ _transform_js__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "untransform": () => (/* reexport safe */ _untransform_js__WEBPACK_IMPORTED_MODULE_7__.default)
/* harmony export */ });
/* harmony import */ var _bbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bbox.js */ "./node_modules/topojson-client/src/bbox.js");
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./feature.js */ "./node_modules/topojson-client/src/feature.js");
/* harmony import */ var _mesh_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mesh.js */ "./node_modules/topojson-client/src/mesh.js");
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./merge.js */ "./node_modules/topojson-client/src/merge.js");
/* harmony import */ var _neighbors_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./neighbors.js */ "./node_modules/topojson-client/src/neighbors.js");
/* harmony import */ var _quantize_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quantize.js */ "./node_modules/topojson-client/src/quantize.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transform.js */ "./node_modules/topojson-client/src/transform.js");
/* harmony import */ var _untransform_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./untransform.js */ "./node_modules/topojson-client/src/untransform.js");










/***/ }),

/***/ "./node_modules/topojson-client/src/merge.js":
/*!***************************************************!*\
  !*** ./node_modules/topojson-client/src/merge.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mergeArcs": () => (/* binding */ mergeArcs)
/* harmony export */ });
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./node_modules/topojson-client/src/feature.js");
/* harmony import */ var _stitch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stitch.js */ "./node_modules/topojson-client/src/stitch.js");



function planarRingArea(ring) {
  var i = -1, n = ring.length, a, b = ring[n - 1], area = 0;
  while (++i < n) a = b, b = ring[i], area += a[0] * b[1] - a[1] * b[0];
  return Math.abs(area); // Note: doubled area!
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology) {
  return (0,_feature_js__WEBPACK_IMPORTED_MODULE_0__.object)(topology, mergeArcs.apply(this, arguments));
}

function mergeArcs(topology, objects) {
  var polygonsByArc = {},
      polygons = [],
      groups = [];

  objects.forEach(geometry);

  function geometry(o) {
    switch (o.type) {
      case "GeometryCollection": o.geometries.forEach(geometry); break;
      case "Polygon": extract(o.arcs); break;
      case "MultiPolygon": o.arcs.forEach(extract); break;
    }
  }

  function extract(polygon) {
    polygon.forEach(function(ring) {
      ring.forEach(function(arc) {
        (polygonsByArc[arc = arc < 0 ? ~arc : arc] || (polygonsByArc[arc] = [])).push(polygon);
      });
    });
    polygons.push(polygon);
  }

  function area(ring) {
    return planarRingArea((0,_feature_js__WEBPACK_IMPORTED_MODULE_0__.object)(topology, {type: "Polygon", arcs: [ring]}).coordinates[0]);
  }

  polygons.forEach(function(polygon) {
    if (!polygon._) {
      var group = [],
          neighbors = [polygon];
      polygon._ = 1;
      groups.push(group);
      while (polygon = neighbors.pop()) {
        group.push(polygon);
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            polygonsByArc[arc < 0 ? ~arc : arc].forEach(function(polygon) {
              if (!polygon._) {
                polygon._ = 1;
                neighbors.push(polygon);
              }
            });
          });
        });
      }
    }
  });

  polygons.forEach(function(polygon) {
    delete polygon._;
  });

  return {
    type: "MultiPolygon",
    arcs: groups.map(function(polygons) {
      var arcs = [], n;

      // Extract the exterior (unique) arcs.
      polygons.forEach(function(polygon) {
        polygon.forEach(function(ring) {
          ring.forEach(function(arc) {
            if (polygonsByArc[arc < 0 ? ~arc : arc].length < 2) {
              arcs.push(arc);
            }
          });
        });
      });

      // Stitch the arcs into one or more rings.
      arcs = (0,_stitch_js__WEBPACK_IMPORTED_MODULE_1__.default)(topology, arcs);

      // If more than one ring is returned,
      // at most one of these rings can be the exterior;
      // choose the one with the greatest absolute area.
      if ((n = arcs.length) > 1) {
        for (var i = 1, k = area(arcs[0]), ki, t; i < n; ++i) {
          if ((ki = area(arcs[i])) > k) {
            t = arcs[0], arcs[0] = arcs[i], arcs[i] = t, k = ki;
          }
        }
      }

      return arcs;
    }).filter(function(arcs) {
      return arcs.length > 0;
    })
  };
}


/***/ }),

/***/ "./node_modules/topojson-client/src/mesh.js":
/*!**************************************************!*\
  !*** ./node_modules/topojson-client/src/mesh.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "meshArcs": () => (/* binding */ meshArcs)
/* harmony export */ });
/* harmony import */ var _feature_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./feature.js */ "./node_modules/topojson-client/src/feature.js");
/* harmony import */ var _stitch_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./stitch.js */ "./node_modules/topojson-client/src/stitch.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology) {
  return (0,_feature_js__WEBPACK_IMPORTED_MODULE_0__.object)(topology, meshArcs.apply(this, arguments));
}

function meshArcs(topology, object, filter) {
  var arcs, i, n;
  if (arguments.length > 1) arcs = extractArcs(topology, object, filter);
  else for (i = 0, arcs = new Array(n = topology.arcs.length); i < n; ++i) arcs[i] = i;
  return {type: "MultiLineString", arcs: (0,_stitch_js__WEBPACK_IMPORTED_MODULE_1__.default)(topology, arcs)};
}

function extractArcs(topology, object, filter) {
  var arcs = [],
      geomsByArc = [],
      geom;

  function extract0(i) {
    var j = i < 0 ? ~i : i;
    (geomsByArc[j] || (geomsByArc[j] = [])).push({i: i, g: geom});
  }

  function extract1(arcs) {
    arcs.forEach(extract0);
  }

  function extract2(arcs) {
    arcs.forEach(extract1);
  }

  function extract3(arcs) {
    arcs.forEach(extract2);
  }

  function geometry(o) {
    switch (geom = o, o.type) {
      case "GeometryCollection": o.geometries.forEach(geometry); break;
      case "LineString": extract1(o.arcs); break;
      case "MultiLineString": case "Polygon": extract2(o.arcs); break;
      case "MultiPolygon": extract3(o.arcs); break;
    }
  }

  geometry(object);

  geomsByArc.forEach(filter == null
      ? function(geoms) { arcs.push(geoms[0].i); }
      : function(geoms) { if (filter(geoms[0].g, geoms[geoms.length - 1].g)) arcs.push(geoms[0].i); });

  return arcs;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/neighbors.js":
/*!*******************************************************!*\
  !*** ./node_modules/topojson-client/src/neighbors.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bisect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bisect.js */ "./node_modules/topojson-client/src/bisect.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(objects) {
  var indexesByArc = {}, // arc index -> array of object indexes
      neighbors = objects.map(function() { return []; });

  function line(arcs, i) {
    arcs.forEach(function(a) {
      if (a < 0) a = ~a;
      var o = indexesByArc[a];
      if (o) o.push(i);
      else indexesByArc[a] = [i];
    });
  }

  function polygon(arcs, i) {
    arcs.forEach(function(arc) { line(arc, i); });
  }

  function geometry(o, i) {
    if (o.type === "GeometryCollection") o.geometries.forEach(function(o) { geometry(o, i); });
    else if (o.type in geometryType) geometryType[o.type](o.arcs, i);
  }

  var geometryType = {
    LineString: line,
    MultiLineString: polygon,
    Polygon: polygon,
    MultiPolygon: function(arcs, i) { arcs.forEach(function(arc) { polygon(arc, i); }); }
  };

  objects.forEach(geometry);

  for (var i in indexesByArc) {
    for (var indexes = indexesByArc[i], m = indexes.length, j = 0; j < m; ++j) {
      for (var k = j + 1; k < m; ++k) {
        var ij = indexes[j], ik = indexes[k], n;
        if ((n = neighbors[ij])[i = (0,_bisect_js__WEBPACK_IMPORTED_MODULE_0__.default)(n, ik)] !== ik) n.splice(i, 0, ik);
        if ((n = neighbors[ik])[i = (0,_bisect_js__WEBPACK_IMPORTED_MODULE_0__.default)(n, ij)] !== ij) n.splice(i, 0, ij);
      }
    }
  }

  return neighbors;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/quantize.js":
/*!******************************************************!*\
  !*** ./node_modules/topojson-client/src/quantize.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _bbox_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bbox.js */ "./node_modules/topojson-client/src/bbox.js");
/* harmony import */ var _untransform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./untransform.js */ "./node_modules/topojson-client/src/untransform.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology, transform) {
  if (topology.transform) throw new Error("already quantized");

  if (!transform || !transform.scale) {
    if (!((n = Math.floor(transform)) >= 2)) throw new Error("n must be ≥2");
    box = topology.bbox || (0,_bbox_js__WEBPACK_IMPORTED_MODULE_0__.default)(topology);
    var x0 = box[0], y0 = box[1], x1 = box[2], y1 = box[3], n;
    transform = {scale: [x1 - x0 ? (x1 - x0) / (n - 1) : 1, y1 - y0 ? (y1 - y0) / (n - 1) : 1], translate: [x0, y0]};
  } else {
    box = topology.bbox;
  }

  var t = (0,_untransform_js__WEBPACK_IMPORTED_MODULE_1__.default)(transform), box, key, inputs = topology.objects, outputs = {};

  function quantizePoint(point) {
    return t(point);
  }

  function quantizeGeometry(input) {
    var output;
    switch (input.type) {
      case "GeometryCollection": output = {type: "GeometryCollection", geometries: input.geometries.map(quantizeGeometry)}; break;
      case "Point": output = {type: "Point", coordinates: quantizePoint(input.coordinates)}; break;
      case "MultiPoint": output = {type: "MultiPoint", coordinates: input.coordinates.map(quantizePoint)}; break;
      default: return input;
    }
    if (input.id != null) output.id = input.id;
    if (input.bbox != null) output.bbox = input.bbox;
    if (input.properties != null) output.properties = input.properties;
    return output;
  }

  function quantizeArc(input) {
    var i = 0, j = 1, n = input.length, p, output = new Array(n); // pessimistic
    output[0] = t(input[0], 0);
    while (++i < n) if ((p = t(input[i], i))[0] || p[1]) output[j++] = p; // non-coincident points
    if (j === 1) output[j++] = [0, 0]; // an arc must have at least two points
    output.length = j;
    return output;
  }

  for (key in inputs) outputs[key] = quantizeGeometry(inputs[key]);

  return {
    type: "Topology",
    bbox: box,
    transform: transform,
    objects: outputs,
    arcs: topology.arcs.map(quantizeArc)
  };
}


/***/ }),

/***/ "./node_modules/topojson-client/src/reverse.js":
/*!*****************************************************!*\
  !*** ./node_modules/topojson-client/src/reverse.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(array, n) {
  var t, j = array.length, i = j - n;
  while (i < --j) t = array[i], array[i++] = array[j], array[j] = t;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/stitch.js":
/*!****************************************************!*\
  !*** ./node_modules/topojson-client/src/stitch.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(topology, arcs) {
  var stitchedArcs = {},
      fragmentByStart = {},
      fragmentByEnd = {},
      fragments = [],
      emptyIndex = -1;

  // Stitch empty arcs first, since they may be subsumed by other arcs.
  arcs.forEach(function(i, j) {
    var arc = topology.arcs[i < 0 ? ~i : i], t;
    if (arc.length < 3 && !arc[1][0] && !arc[1][1]) {
      t = arcs[++emptyIndex], arcs[emptyIndex] = i, arcs[j] = t;
    }
  });

  arcs.forEach(function(i) {
    var e = ends(i),
        start = e[0],
        end = e[1],
        f, g;

    if (f = fragmentByEnd[start]) {
      delete fragmentByEnd[f.end];
      f.push(i);
      f.end = end;
      if (g = fragmentByStart[end]) {
        delete fragmentByStart[g.start];
        var fg = g === f ? f : f.concat(g);
        fragmentByStart[fg.start = f.start] = fragmentByEnd[fg.end = g.end] = fg;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else if (f = fragmentByStart[end]) {
      delete fragmentByStart[f.start];
      f.unshift(i);
      f.start = start;
      if (g = fragmentByEnd[start]) {
        delete fragmentByEnd[g.end];
        var gf = g === f ? f : g.concat(f);
        fragmentByStart[gf.start = g.start] = fragmentByEnd[gf.end = f.end] = gf;
      } else {
        fragmentByStart[f.start] = fragmentByEnd[f.end] = f;
      }
    } else {
      f = [i];
      fragmentByStart[f.start = start] = fragmentByEnd[f.end = end] = f;
    }
  });

  function ends(i) {
    var arc = topology.arcs[i < 0 ? ~i : i], p0 = arc[0], p1;
    if (topology.transform) p1 = [0, 0], arc.forEach(function(dp) { p1[0] += dp[0], p1[1] += dp[1]; });
    else p1 = arc[arc.length - 1];
    return i < 0 ? [p1, p0] : [p0, p1];
  }

  function flush(fragmentByEnd, fragmentByStart) {
    for (var k in fragmentByEnd) {
      var f = fragmentByEnd[k];
      delete fragmentByStart[f.start];
      delete f.start;
      delete f.end;
      f.forEach(function(i) { stitchedArcs[i < 0 ? ~i : i] = 1; });
      fragments.push(f);
    }
  }

  flush(fragmentByEnd, fragmentByStart);
  flush(fragmentByStart, fragmentByEnd);
  arcs.forEach(function(i) { if (!stitchedArcs[i < 0 ? ~i : i]) fragments.push([i]); });

  return fragments;
}


/***/ }),

/***/ "./node_modules/topojson-client/src/transform.js":
/*!*******************************************************!*\
  !*** ./node_modules/topojson-client/src/transform.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/topojson-client/src/identity.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(transform) {
  if (transform == null) return _identity_js__WEBPACK_IMPORTED_MODULE_0__.default;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2, n = input.length, output = new Array(n);
    output[0] = (x0 += input[0]) * kx + dx;
    output[1] = (y0 += input[1]) * ky + dy;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
}


/***/ }),

/***/ "./node_modules/topojson-client/src/untransform.js":
/*!*********************************************************!*\
  !*** ./node_modules/topojson-client/src/untransform.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./identity.js */ "./node_modules/topojson-client/src/identity.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(transform) {
  if (transform == null) return _identity_js__WEBPACK_IMPORTED_MODULE_0__.default;
  var x0,
      y0,
      kx = transform.scale[0],
      ky = transform.scale[1],
      dx = transform.translate[0],
      dy = transform.translate[1];
  return function(input, i) {
    if (!i) x0 = y0 = 0;
    var j = 2,
        n = input.length,
        output = new Array(n),
        x1 = Math.round((input[0] - dx) / kx),
        y1 = Math.round((input[1] - dy) / ky);
    output[0] = x1 - x0, x0 = x1;
    output[1] = y1 - y0, y0 = y1;
    while (j < n) output[j] = input[j], ++j;
    return output;
  };
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvbGliL3RvcG9qc29uX3V0aWxzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9nZW8vY29uc3RhbnRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9nZW8vZ2VvLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9nZW8vaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2dlby9sYXlvdXRfYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2VvL2xheW91dF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZ2VvL3Byb2plY3Rpb25zLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9nZW8vem9vbS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvYmJveC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvYmlzZWN0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9mZWF0dXJlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy90b3BvanNvbi1jbGllbnQvc3JjL21lcmdlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9tZXNoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9uZWlnaGJvcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy90b3BvanNvbi1jbGllbnQvc3JjL3F1YW50aXplLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9yZXZlcnNlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvdG9wb2pzb24tY2xpZW50L3NyYy9zdGl0Y2guanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy90b3BvanNvbi1jbGllbnQvc3JjL3RyYW5zZm9ybS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3RvcG9qc29uLWNsaWVudC9zcmMvdW50cmFuc2Zvcm0uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUEsMEJBQTBCLDRIQUFxRDtBQUMvRSxzQkFBc0IsaUdBQWtDOztBQUV4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWU7O0FBRWY7QUFDQSxpQkFBaUI7O0FBRWpCO0FBQ0EsaUJBQWlCO0FBQ2pCLGtCQUFrQjs7QUFFbEI7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsSUFBSTs7QUFFckI7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1S0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7O0FBRUEsU0FBUyxtQkFBTyxDQUFDLG1DQUFJOztBQUVyQixlQUFlLG1CQUFPLENBQUMsZ0VBQWdCO0FBQ3ZDLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixZQUFZLG1CQUFPLENBQUMsc0ZBQXdCO0FBQzVDLGNBQWMsbUJBQU8sQ0FBQywwRkFBMEI7QUFDaEQsU0FBUyxtQkFBTyxDQUFDLGdGQUFxQjtBQUN0QyxZQUFZLG1CQUFPLENBQUMsNkRBQVU7QUFDOUIsV0FBVyxtQkFBTyxDQUFDLCtFQUFtQjtBQUN0QyxtQkFBbUIsMkhBQThDO0FBQ2pFLGtCQUFrQixtQkFBTyxDQUFDLGtHQUE4QjtBQUN4RCxpQkFBaUIsbUhBQXlDO0FBQzFELGtCQUFrQixvSEFBMEM7QUFDNUQsb0JBQW9CLHNIQUE0Qzs7QUFFaEUsb0JBQW9CLG1CQUFPLENBQUMsOERBQVE7QUFDcEMsZ0JBQWdCLG1CQUFPLENBQUMsd0VBQWE7O0FBRXJDLGVBQWUsbUJBQU8sQ0FBQyw0RkFBOEI7QUFDckQsb0JBQW9CLG1CQUFPLENBQUMsb0ZBQTBCO0FBQ3RELHNCQUFzQixpR0FBa0M7O0FBRXhELG1CQUFPLENBQUMsNEVBQWU7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQix3QkFBd0I7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0I7QUFDdEIsU0FBUztBQUNULHNCQUFzQjtBQUN0Qix3QkFBd0I7O0FBRXhCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULHNCQUFzQjtBQUN0Qix3QkFBd0I7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNCQUFzQix3QkFBd0I7QUFDOUM7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLG9DQUFvQyxxQkFBcUIsRUFBRTtBQUMzRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxzQ0FBc0Msa0JBQWtCO0FBQ3hELHNDQUFzQyxrQkFBa0I7O0FBRXhEO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLDRCQUE0QjtBQUN0RDs7QUFFQTtBQUNBO0FBQ0EsMEJBQTBCLDRCQUE0QjtBQUN0RDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaURBQWlELDBCQUEwQixFQUFFO0FBQzdFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLCtCQUErQiw0QkFBNEI7O0FBRTNELGtCQUFrQixvQkFBb0I7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQyxlQUFlO0FBQ2pELEtBQUs7QUFDTDtBQUNBO0FBQ0Esa0NBQWtDLGVBQWU7QUFDakQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsU0FBUztBQUMzQjtBQUNBO0FBQ0EsOEJBQThCLDJCQUEyQjtBQUN6RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQy96QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIseUJBQXlCLG9IQUFrRDtBQUMzRSxtQkFBbUIsOEZBQWlDOztBQUVwRCxnQkFBZ0IsbUJBQU8sQ0FBQyw0REFBTzs7QUFFL0I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQkFBa0IsdUJBQXVCO0FBQ3pDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0IsdUJBQXVCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsbUJBQU8sQ0FBQyx3RkFBcUI7QUFDbkQsMEJBQTBCLG1CQUFPLENBQUMsb0ZBQW1CO0FBQ3JEO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUJBQWlCLG1CQUFPLENBQUMsc0dBQW1DO0FBQzVELGtCQUFrQiwrRkFBK0I7QUFDakQsZ0JBQWdCLG1CQUFPLENBQUMsd0VBQWE7QUFDckMsa0JBQWtCLHVIQUFnRDs7QUFFbEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsa0JBQWtCO0FBQy9CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EseUJBQXlCLFlBQVk7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsa0JBQWtCO0FBQ25DLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3JXQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixVQUFVLG1CQUFPLENBQUMsNERBQVc7QUFDN0IsNEJBQTRCLG1CQUFPLENBQUMsbUZBQXFCO0FBQ3pELHFCQUFxQix1R0FBcUM7O0FBRTFELGdCQUFnQixtQkFBTyxDQUFDLHdFQUFhO0FBQ3JDLHVCQUF1QixtQkFBTyxDQUFDLHdGQUFxQjs7QUFFcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBLG9EQUFvRCx5QkFBeUIsRUFBRTs7QUFFL0U7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDJDQUEyQzs7QUFFM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2pPQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxzRUFBc0U7QUFDdEU7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FO0FBQ25FLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxPQUFPO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxpQ0FBaUM7QUFDaEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxPQUFPO0FBQ25EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLE9BQU87QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsMkJBQTJCO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTs7Ozs7Ozs7Ozs7O0FDM2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7O0FBRXZDO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEIsb0JBQW9COztBQUVwQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLDBCQUEwQiw2QkFBNkI7O0FBRXZEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTOztBQUVUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7O0FBRUw7QUFDQSxpQ0FBaUMsa0JBQWtCO0FBQ25EOztBQUVBO0FBQ0Esa0JBQWtCLGFBQWE7QUFDL0I7O0FBRUE7QUFDQSxpQ0FBaUMsZ0JBQWdCO0FBQ2pEOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdDQUFnQyxPQUFPO0FBQ3ZDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2REFBNkQ7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3ZnVDOztBQUV2Qyw2QkFBZSxvQ0FBUztBQUN4QixVQUFVLHNEQUFTO0FBQ25COztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvRUFBb0U7QUFDcEUsNkNBQTZDO0FBQzdDLDBEQUEwRDtBQUMxRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0Q0EsNkJBQWUsb0NBQVM7QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ1JtQztBQUNJOztBQUV2Qyw2QkFBZSxvQ0FBUztBQUN4QjtBQUNBO0FBQ0EsU0FBUyxtRUFBbUUsNkJBQTZCLEVBQUU7QUFDM0c7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSx1Q0FBdUM7QUFDdkMsd0JBQXdCO0FBQ3hCLFNBQVM7QUFDVDs7QUFFTztBQUNQLHVCQUF1QixzREFBUztBQUNoQzs7QUFFQTtBQUNBO0FBQ0EsMkRBQTJELE9BQU87QUFDbEU7QUFDQTtBQUNBLGVBQWUsb0RBQU87QUFDdEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQyxrREFBa0Q7QUFDbEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6Qyx1REFBdUQ7QUFDdkQsZ0VBQWdFO0FBQ2hFLG9EQUFvRDtBQUNwRCw2REFBNkQ7QUFDN0Qsb0RBQW9EO0FBQ3BELDZEQUE2RDtBQUM3RDtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyRUEsNkJBQWUsb0NBQVM7QUFDeEI7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDRjBDO0FBQ007QUFDSTtBQUNHO0FBQ0g7QUFDRjtBQUNFO0FBQ0k7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNQcEI7QUFDSDs7QUFFakM7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCOztBQUVBLDZCQUFlLG9DQUFTO0FBQ3hCLFNBQVMsbURBQU07QUFDZjs7QUFFTztBQUNQLHdCQUF3QjtBQUN4QjtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxnRUFBZ0U7QUFDaEUsc0NBQXNDO0FBQ3RDLG1EQUFtRDtBQUNuRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCLG1EQUFNLFlBQVksOEJBQThCO0FBQzFFOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0EsYUFBYSxtREFBTTs7QUFFbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsT0FBTztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN0R29DO0FBQ0g7O0FBRWpDLDZCQUFlLG9DQUFTO0FBQ3hCLFNBQVMsbURBQU07QUFDZjs7QUFFTztBQUNQO0FBQ0E7QUFDQSw4REFBOEQsT0FBTztBQUNyRSxVQUFVLCtCQUErQixtREFBTTtBQUMvQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtELGNBQWM7QUFDaEU7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGdFQUFnRTtBQUNoRSwwQ0FBMEM7QUFDMUMsK0RBQStEO0FBQy9ELDRDQUE0QztBQUM1QztBQUNBOztBQUVBOztBQUVBO0FBQ0EseUJBQXlCLHVCQUF1QjtBQUNoRCx5QkFBeUIsMEVBQTBFLEVBQUU7O0FBRXJHO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDcERpQzs7QUFFakMsNkJBQWUsb0NBQVM7QUFDeEIsdUJBQXVCO0FBQ3ZCLDBDQUEwQyxXQUFXLEVBQUU7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLGdDQUFnQyxjQUFjLEVBQUU7QUFDaEQ7O0FBRUE7QUFDQSwyRUFBMkUsZ0JBQWdCLEVBQUU7QUFDN0Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQyw2QkFBNkIsaUJBQWlCLEVBQUUsRUFBRTtBQUN2Rjs7QUFFQTs7QUFFQTtBQUNBLGtFQUFrRSxPQUFPO0FBQ3pFLHlCQUF5QixPQUFPO0FBQ2hDO0FBQ0Esb0NBQW9DLG1EQUFNO0FBQzFDLG9DQUFvQyxtREFBTTtBQUMxQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUM2QjtBQUNjOztBQUUzQyw2QkFBZSxvQ0FBUztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0EsMkJBQTJCLGlEQUFJO0FBQy9CO0FBQ0EsaUJBQWlCO0FBQ2pCLEdBQUc7QUFDSDtBQUNBOztBQUVBLFVBQVUsd0RBQVc7O0FBRXJCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsZ0ZBQWdGO0FBQzNILDhCQUE4Qiw4REFBOEQ7QUFDNUYsbUNBQW1DLHVFQUF1RTtBQUMxRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBLHlFQUF5RTtBQUN6RSxzQ0FBc0M7QUFDdEM7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7QUNyREEsNkJBQWUsb0NBQVM7QUFDeEI7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDSEEsNkJBQWUsb0NBQVM7QUFDeEIsdUJBQXVCO0FBQ3ZCLDBCQUEwQjtBQUMxQix3QkFBd0I7QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0EsbUVBQW1FLGdDQUFnQyxFQUFFO0FBQ3JHO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsa0NBQWtDLEVBQUU7QUFDakU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSw0QkFBNEIsd0RBQXdELEVBQUU7O0FBRXRGO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEVxQzs7QUFFckMsNkJBQWUsb0NBQVM7QUFDeEIsZ0NBQWdDLGlEQUFRO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNsQnFDOztBQUVyQyw2QkFBZSxvQ0FBUztBQUN4QixnQ0FBZ0MsaURBQVE7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ1OTlkYjA3YjBhN2UwOGJjYzNhMi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHRvcG9qc29uVXRpbHMgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG52YXIgbG9jYXRpb25tb2RlVG9MYXllciA9IHJlcXVpcmUoJy4uL3Bsb3RzL2dlby9jb25zdGFudHMnKS5sb2NhdGlvbm1vZGVUb0xheWVyO1xudmFyIHRvcG9qc29uRmVhdHVyZSA9IHJlcXVpcmUoJ3RvcG9qc29uLWNsaWVudCcpLmZlYXR1cmU7XG5cbnRvcG9qc29uVXRpbHMuZ2V0VG9wb2pzb25OYW1lID0gZnVuY3Rpb24oZ2VvTGF5b3V0KSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgZ2VvTGF5b3V0LnNjb3BlLnJlcGxhY2UoLyAvZywgJy0nKSwgJ18nLFxuICAgICAgICBnZW9MYXlvdXQucmVzb2x1dGlvbi50b1N0cmluZygpLCAnbSdcbiAgICBdLmpvaW4oJycpO1xufTtcblxudG9wb2pzb25VdGlscy5nZXRUb3BvanNvblBhdGggPSBmdW5jdGlvbih0b3BvanNvblVSTCwgdG9wb2pzb25OYW1lKSB7XG4gICAgcmV0dXJuIHRvcG9qc29uVVJMICsgdG9wb2pzb25OYW1lICsgJy5qc29uJztcbn07XG5cbnRvcG9qc29uVXRpbHMuZ2V0VG9wb2pzb25GZWF0dXJlcyA9IGZ1bmN0aW9uKHRyYWNlLCB0b3BvanNvbikge1xuICAgIHZhciBsYXllciA9IGxvY2F0aW9ubW9kZVRvTGF5ZXJbdHJhY2UubG9jYXRpb25tb2RlXTtcbiAgICB2YXIgb2JqID0gdG9wb2pzb24ub2JqZWN0c1tsYXllcl07XG5cbiAgICByZXR1cm4gdG9wb2pzb25GZWF0dXJlKHRvcG9qc29uLCBvYmopLmZlYXR1cmVzO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gcHJvamVjdGlvbiBuYW1lcyB0byBkMyBmdW5jdGlvbiBuYW1lXG5leHBvcnRzLnByb2pOYW1lcyA9IHtcbiAgICAvLyBkMy5nZW8ucHJvamVjdGlvblxuICAgICdlcXVpcmVjdGFuZ3VsYXInOiAnZXF1aXJlY3Rhbmd1bGFyJyxcbiAgICAnbWVyY2F0b3InOiAnbWVyY2F0b3InLFxuICAgICdvcnRob2dyYXBoaWMnOiAnb3J0aG9ncmFwaGljJyxcbiAgICAnbmF0dXJhbCBlYXJ0aCc6ICduYXR1cmFsRWFydGgnLFxuICAgICdrYXZyYXlza2l5Nyc6ICdrYXZyYXlza2l5NycsXG4gICAgJ21pbGxlcic6ICdtaWxsZXInLFxuICAgICdyb2JpbnNvbic6ICdyb2JpbnNvbicsXG4gICAgJ2Vja2VydDQnOiAnZWNrZXJ0NCcsXG4gICAgJ2F6aW11dGhhbCBlcXVhbCBhcmVhJzogJ2F6aW11dGhhbEVxdWFsQXJlYScsXG4gICAgJ2F6aW11dGhhbCBlcXVpZGlzdGFudCc6ICdhemltdXRoYWxFcXVpZGlzdGFudCcsXG4gICAgJ2NvbmljIGVxdWFsIGFyZWEnOiAnY29uaWNFcXVhbEFyZWEnLFxuICAgICdjb25pYyBjb25mb3JtYWwnOiAnY29uaWNDb25mb3JtYWwnLFxuICAgICdjb25pYyBlcXVpZGlzdGFudCc6ICdjb25pY0VxdWlkaXN0YW50JyxcbiAgICAnZ25vbW9uaWMnOiAnZ25vbW9uaWMnLFxuICAgICdzdGVyZW9ncmFwaGljJzogJ3N0ZXJlb2dyYXBoaWMnLFxuICAgICdtb2xsd2VpZGUnOiAnbW9sbHdlaWRlJyxcbiAgICAnaGFtbWVyJzogJ2hhbW1lcicsXG4gICAgJ3RyYW5zdmVyc2UgbWVyY2F0b3InOiAndHJhbnN2ZXJzZU1lcmNhdG9yJyxcbiAgICAnYWxiZXJzIHVzYSc6ICdhbGJlcnNVc2EnLFxuICAgICd3aW5rZWwgdHJpcGVsJzogJ3dpbmtlbDMnLFxuICAgICdhaXRvZmYnOiAnYWl0b2ZmJyxcbiAgICAnc2ludXNvaWRhbCc6ICdzaW51c29pZGFsJ1xufTtcblxuLy8gbmFtZSBvZiB0aGUgYXhlc1xuZXhwb3J0cy5heGVzTmFtZXMgPSBbJ2xvbmF4aXMnLCAnbGF0YXhpcyddO1xuXG4vLyBtYXggbG9uZ2l0dWRpbmFsIGFuZ3VsYXIgc3BhbiAoRVhQRVJJTUVOVEFMKVxuZXhwb3J0cy5sb25heGlzU3BhbiA9IHtcbiAgICAnb3J0aG9ncmFwaGljJzogMTgwLFxuICAgICdhemltdXRoYWwgZXF1YWwgYXJlYSc6IDM2MCxcbiAgICAnYXppbXV0aGFsIGVxdWlkaXN0YW50JzogMzYwLFxuICAgICdjb25pYyBjb25mb3JtYWwnOiAxODAsXG4gICAgJ2dub21vbmljJzogMTYwLFxuICAgICdzdGVyZW9ncmFwaGljJzogMTgwLFxuICAgICd0cmFuc3ZlcnNlIG1lcmNhdG9yJzogMTgwLFxuICAgICcqJzogMzYwXG59O1xuXG4vLyBtYXggbGF0aXR1ZGluYWwgYW5ndWxhciBzcGFuIChFWFBFUklNRU5UQUwpXG5leHBvcnRzLmxhdGF4aXNTcGFuID0ge1xuICAgICdjb25pYyBjb25mb3JtYWwnOiAxNTAsXG4gICAgJ3N0ZXJlb2dyYXBoaWMnOiAxNzkuNSxcbiAgICAnKic6IDE4MFxufTtcblxuLy8gZGVmYXVsdHMgZm9yIGVhY2ggc2NvcGVcbmV4cG9ydHMuc2NvcGVEZWZhdWx0cyA9IHtcbiAgICB3b3JsZDoge1xuICAgICAgICBsb25heGlzUmFuZ2U6IFstMTgwLCAxODBdLFxuICAgICAgICBsYXRheGlzUmFuZ2U6IFstOTAsIDkwXSxcbiAgICAgICAgcHJvalR5cGU6ICdlcXVpcmVjdGFuZ3VsYXInLFxuICAgICAgICBwcm9qUm90YXRlOiBbMCwgMCwgMF1cbiAgICB9LFxuICAgIHVzYToge1xuICAgICAgICBsb25heGlzUmFuZ2U6IFstMTgwLCAtNTBdLFxuICAgICAgICBsYXRheGlzUmFuZ2U6IFsxNSwgODBdLFxuICAgICAgICBwcm9qVHlwZTogJ2FsYmVycyB1c2EnXG4gICAgfSxcbiAgICBldXJvcGU6IHtcbiAgICAgICAgbG9uYXhpc1JhbmdlOiBbLTMwLCA2MF0sXG4gICAgICAgIGxhdGF4aXNSYW5nZTogWzMwLCA4NV0sXG4gICAgICAgIHByb2pUeXBlOiAnY29uaWMgY29uZm9ybWFsJyxcbiAgICAgICAgcHJvalJvdGF0ZTogWzE1LCAwLCAwXSxcbiAgICAgICAgcHJvalBhcmFsbGVsczogWzAsIDYwXVxuICAgIH0sXG4gICAgYXNpYToge1xuICAgICAgICBsb25heGlzUmFuZ2U6IFsyMiwgMTYwXSxcbiAgICAgICAgbGF0YXhpc1JhbmdlOiBbLTE1LCA1NV0sXG4gICAgICAgIHByb2pUeXBlOiAnbWVyY2F0b3InLFxuICAgICAgICBwcm9qUm90YXRlOiBbMCwgMCwgMF1cbiAgICB9LFxuICAgIGFmcmljYToge1xuICAgICAgICBsb25heGlzUmFuZ2U6IFstMzAsIDYwXSxcbiAgICAgICAgbGF0YXhpc1JhbmdlOiBbLTQwLCA0MF0sXG4gICAgICAgIHByb2pUeXBlOiAnbWVyY2F0b3InLFxuICAgICAgICBwcm9qUm90YXRlOiBbMCwgMCwgMF1cbiAgICB9LFxuICAgICdub3J0aCBhbWVyaWNhJzoge1xuICAgICAgICBsb25heGlzUmFuZ2U6IFstMTgwLCAtNDVdLFxuICAgICAgICBsYXRheGlzUmFuZ2U6IFs1LCA4NV0sXG4gICAgICAgIHByb2pUeXBlOiAnY29uaWMgY29uZm9ybWFsJyxcbiAgICAgICAgcHJvalJvdGF0ZTogWy0xMDAsIDAsIDBdLFxuICAgICAgICBwcm9qUGFyYWxsZWxzOiBbMjkuNSwgNDUuNV1cbiAgICB9LFxuICAgICdzb3V0aCBhbWVyaWNhJzoge1xuICAgICAgICBsb25heGlzUmFuZ2U6IFstMTAwLCAtMzBdLFxuICAgICAgICBsYXRheGlzUmFuZ2U6IFstNjAsIDE1XSxcbiAgICAgICAgcHJvalR5cGU6ICdtZXJjYXRvcicsXG4gICAgICAgIHByb2pSb3RhdGU6IFswLCAwLCAwXVxuICAgIH1cbn07XG5cbi8vIGFuZ3VsYXIgcGFkIHRvIGF2b2lkIHJvdW5kaW5nIGVycm9yIGFyb3VuZCBjbGlwIGFuZ2xlc1xuZXhwb3J0cy5jbGlwUGFkID0gMWUtMztcblxuLy8gbWFwIHByb2plY3Rpb24gcHJlY2lzaW9uXG5leHBvcnRzLnByZWNpc2lvbiA9IDAuMTtcblxuLy8gZGVmYXVsdCBsYW5kIGFuZCB3YXRlciBmaWxsIGNvbG9yc1xuZXhwb3J0cy5sYW5kQ29sb3IgPSAnI0YwREM4Mic7XG5leHBvcnRzLndhdGVyQ29sb3IgPSAnIzMzOTlGRic7XG5cbi8vIGxvY2F0aW9ubW9kZSB0byBsYXllciBuYW1lXG5leHBvcnRzLmxvY2F0aW9ubW9kZVRvTGF5ZXIgPSB7XG4gICAgJ0lTTy0zJzogJ2NvdW50cmllcycsXG4gICAgJ1VTQS1zdGF0ZXMnOiAnc3VidW5pdHMnLFxuICAgICdjb3VudHJ5IG5hbWVzJzogJ2NvdW50cmllcydcbn07XG5cbi8vIFNWRyBlbGVtZW50IGZvciBhIHNwaGVyZSAodXNlIHRvIGZyYW1lIG1hcHMpXG5leHBvcnRzLnNwaGVyZVNWRyA9IHt0eXBlOiAnU3BoZXJlJ307XG5cbi8vIE4uQi4gYmFzZSBsYXllciBuYW1lcyBtdXN0IGJlIHRoZSBzYW1lIGFzIGluIHRoZSB0b3BvanNvbiBmaWxlc1xuXG4vLyBiYXNlIGxheWVyIHdpdGggYSBmaWxsIGNvbG9yXG5leHBvcnRzLmZpbGxMYXllcnMgPSB7XG4gICAgb2NlYW46IDEsXG4gICAgbGFuZDogMSxcbiAgICBsYWtlczogMVxufTtcblxuLy8gYmFzZSBsYXllciB3aXRoIGEgb25seSBhIGxpbmUgY29sb3JcbmV4cG9ydHMubGluZUxheWVycyA9IHtcbiAgICBzdWJ1bml0czogMSxcbiAgICBjb3VudHJpZXM6IDEsXG4gICAgY29hc3RsaW5lczogMSxcbiAgICByaXZlcnM6IDEsXG4gICAgZnJhbWU6IDFcbn07XG5cbmV4cG9ydHMubGF5ZXJzID0gW1xuICAgICdiZycsXG4gICAgJ29jZWFuJywgJ2xhbmQnLCAnbGFrZXMnLFxuICAgICdzdWJ1bml0cycsICdjb3VudHJpZXMnLCAnY29hc3RsaW5lcycsICdyaXZlcnMnLFxuICAgICdsYXRheGlzJywgJ2xvbmF4aXMnLCAnZnJhbWUnLFxuICAgICdiYWNrcGxvdCcsXG4gICAgJ2Zyb250cGxvdCdcbl07XG5cbmV4cG9ydHMubGF5ZXJzRm9yQ2hvcm9wbGV0aCA9IFtcbiAgICAnYmcnLFxuICAgICdvY2VhbicsICdsYW5kJyxcbiAgICAnc3VidW5pdHMnLCAnY291bnRyaWVzJywgJ2NvYXN0bGluZXMnLFxuICAgICdsYXRheGlzJywgJ2xvbmF4aXMnLCAnZnJhbWUnLFxuICAgICdiYWNrcGxvdCcsXG4gICAgJ3JpdmVycycsICdsYWtlcycsXG4gICAgJ2Zyb250cGxvdCdcbl07XG5cbmV4cG9ydHMubGF5ZXJOYW1lVG9BZGplY3RpdmUgPSB7XG4gICAgb2NlYW46ICdvY2VhbicsXG4gICAgbGFuZDogJ2xhbmQnLFxuICAgIGxha2VzOiAnbGFrZScsXG4gICAgc3VidW5pdHM6ICdzdWJ1bml0JyxcbiAgICBjb3VudHJpZXM6ICdjb3VudHJ5JyxcbiAgICBjb2FzdGxpbmVzOiAnY29hc3RsaW5lJyxcbiAgICByaXZlcnM6ICdyaXZlcicsXG4gICAgZnJhbWU6ICdmcmFtZSdcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8qIGdsb2JhbCBQbG90bHlHZW9Bc3NldHM6ZmFsc2UgKi9cblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgRnggPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Z4Jyk7XG52YXIgUGxvdHMgPSByZXF1aXJlKCcuLi9wbG90cycpO1xudmFyIEF4ZXMgPSByZXF1aXJlKCcuLi9jYXJ0ZXNpYW4vYXhlcycpO1xudmFyIGdldEF1dG9SYW5nZSA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9hdXRvcmFuZ2UnKS5nZXRBdXRvUmFuZ2U7XG52YXIgZHJhZ0VsZW1lbnQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYWdlbGVtZW50Jyk7XG52YXIgcHJlcFNlbGVjdCA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9zZWxlY3QnKS5wcmVwU2VsZWN0O1xudmFyIGNsZWFyU2VsZWN0ID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL3NlbGVjdCcpLmNsZWFyU2VsZWN0O1xudmFyIHNlbGVjdE9uQ2xpY2sgPSByZXF1aXJlKCcuLi9jYXJ0ZXNpYW4vc2VsZWN0Jykuc2VsZWN0T25DbGljaztcblxudmFyIGNyZWF0ZUdlb1pvb20gPSByZXF1aXJlKCcuL3pvb20nKTtcbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xuXG52YXIgZ2VvVXRpbHMgPSByZXF1aXJlKCcuLi8uLi9saWIvZ2VvX2xvY2F0aW9uX3V0aWxzJyk7XG52YXIgdG9wb2pzb25VdGlscyA9IHJlcXVpcmUoJy4uLy4uL2xpYi90b3BvanNvbl91dGlscycpO1xudmFyIHRvcG9qc29uRmVhdHVyZSA9IHJlcXVpcmUoJ3RvcG9qc29uLWNsaWVudCcpLmZlYXR1cmU7XG5cbnJlcXVpcmUoJy4vcHJvamVjdGlvbnMnKShkMyk7XG5cbmZ1bmN0aW9uIEdlbyhvcHRzKSB7XG4gICAgdGhpcy5pZCA9IG9wdHMuaWQ7XG4gICAgdGhpcy5ncmFwaERpdiA9IG9wdHMuZ3JhcGhEaXY7XG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRzLmNvbnRhaW5lcjtcbiAgICB0aGlzLnRvcG9qc29uVVJMID0gb3B0cy50b3BvanNvblVSTDtcbiAgICB0aGlzLmlzU3RhdGljID0gb3B0cy5zdGF0aWNQbG90O1xuXG4gICAgdGhpcy50b3BvanNvbk5hbWUgPSBudWxsO1xuICAgIHRoaXMudG9wb2pzb24gPSBudWxsO1xuXG4gICAgdGhpcy5wcm9qZWN0aW9uID0gbnVsbDtcbiAgICB0aGlzLnNjb3BlID0gbnVsbDtcbiAgICB0aGlzLnZpZXdJbml0aWFsID0gbnVsbDtcbiAgICB0aGlzLmZpdFNjYWxlID0gbnVsbDtcbiAgICB0aGlzLmJvdW5kcyA9IG51bGw7XG4gICAgdGhpcy5taWRQdCA9IG51bGw7XG5cbiAgICB0aGlzLmhhc0Nob3JvcGxldGggPSBmYWxzZTtcbiAgICB0aGlzLnRyYWNlSGFzaCA9IHt9O1xuXG4gICAgdGhpcy5sYXllcnMgPSB7fTtcbiAgICB0aGlzLmJhc2VQYXRocyA9IHt9O1xuICAgIHRoaXMuZGF0YVBhdGhzID0ge307XG4gICAgdGhpcy5kYXRhUG9pbnRzID0ge307XG5cbiAgICB0aGlzLmNsaXBEZWYgPSBudWxsO1xuICAgIHRoaXMuY2xpcFJlY3QgPSBudWxsO1xuICAgIHRoaXMuYmdSZWN0ID0gbnVsbDtcblxuICAgIHRoaXMubWFrZUZyYW1ld29yaygpO1xufVxuXG52YXIgcHJvdG8gPSBHZW8ucHJvdG90eXBlO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUdlbyhvcHRzKSB7XG4gICAgcmV0dXJuIG5ldyBHZW8ob3B0cyk7XG59O1xuXG5wcm90by5wbG90ID0gZnVuY3Rpb24oZ2VvQ2FsY0RhdGEsIGZ1bGxMYXlvdXQsIHByb21pc2VzKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2VvTGF5b3V0ID0gZnVsbExheW91dFt0aGlzLmlkXTtcbiAgICB2YXIgZ2VvUHJvbWlzZXMgPSBbXTtcblxuICAgIHZhciBuZWVkc1RvcG9qc29uID0gZmFsc2U7XG4gICAgZm9yKHZhciBrIGluIGNvbnN0YW50cy5sYXllck5hbWVUb0FkamVjdGl2ZSkge1xuICAgICAgICBpZihrICE9PSAnZnJhbWUnICYmIGdlb0xheW91dFsnc2hvdycgKyBrXSkge1xuICAgICAgICAgICAgbmVlZHNUb3BvanNvbiA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZ2VvQ2FsY0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoZ2VvQ2FsY0RhdGFbMF1bMF0udHJhY2UubG9jYXRpb25tb2RlKSB7XG4gICAgICAgICAgICBuZWVkc1RvcG9qc29uID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYobmVlZHNUb3BvanNvbikge1xuICAgICAgICB2YXIgdG9wb2pzb25OYW1lTmV3ID0gdG9wb2pzb25VdGlscy5nZXRUb3BvanNvbk5hbWUoZ2VvTGF5b3V0KTtcbiAgICAgICAgaWYoX3RoaXMudG9wb2pzb24gPT09IG51bGwgfHwgdG9wb2pzb25OYW1lTmV3ICE9PSBfdGhpcy50b3BvanNvbk5hbWUpIHtcbiAgICAgICAgICAgIF90aGlzLnRvcG9qc29uTmFtZSA9IHRvcG9qc29uTmFtZU5ldztcblxuICAgICAgICAgICAgaWYoUGxvdGx5R2VvQXNzZXRzLnRvcG9qc29uW190aGlzLnRvcG9qc29uTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGdlb1Byb21pc2VzLnB1c2goX3RoaXMuZmV0Y2hUb3BvanNvbigpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlb1Byb21pc2VzID0gZ2VvUHJvbWlzZXMuY29uY2F0KGdlb1V0aWxzLmZldGNoVHJhY2VHZW9EYXRhKGdlb0NhbGNEYXRhKSk7XG5cbiAgICBwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBQcm9taXNlLmFsbChnZW9Qcm9taXNlcykudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIF90aGlzLnRvcG9qc29uID0gUGxvdGx5R2VvQXNzZXRzLnRvcG9qc29uW190aGlzLnRvcG9qc29uTmFtZV07XG4gICAgICAgICAgICBfdGhpcy51cGRhdGUoZ2VvQ2FsY0RhdGEsIGZ1bGxMYXlvdXQpO1xuICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICB9KVxuICAgICAgICAuY2F0Y2gocmVqZWN0KTtcbiAgICB9KSk7XG59O1xuXG5wcm90by5mZXRjaFRvcG9qc29uID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgdG9wb2pzb25QYXRoID0gdG9wb2pzb25VdGlscy5nZXRUb3BvanNvblBhdGgoX3RoaXMudG9wb2pzb25VUkwsIF90aGlzLnRvcG9qc29uTmFtZSk7XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGQzLmpzb24odG9wb2pzb25QYXRoLCBmdW5jdGlvbihlcnIsIHRvcG9qc29uKSB7XG4gICAgICAgICAgICBpZihlcnIpIHtcbiAgICAgICAgICAgICAgICBpZihlcnIuc3RhdHVzID09PSA0MDQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3Bsb3RseS5qcyBjb3VsZCBub3QgZmluZCB0b3BvanNvbiBmaWxlIGF0JyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvcG9qc29uUGF0aCwgJy4nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ01ha2Ugc3VyZSB0aGUgKnRvcG9qc29uVVJMKiBwbG90IGNvbmZpZyBvcHRpb24nLFxuICAgICAgICAgICAgICAgICAgICAgICAgJ2lzIHNldCBwcm9wZXJseS4nXG4gICAgICAgICAgICAgICAgICAgIF0uam9pbignICcpKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlamVjdChuZXcgRXJyb3IoW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ3VuZXhwZWN0ZWQgZXJyb3Igd2hpbGUgZmV0Y2hpbmcgdG9wb2pzb24gZmlsZSBhdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICB0b3BvanNvblBhdGhcbiAgICAgICAgICAgICAgICAgICAgXS5qb2luKCcgJykpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIFBsb3RseUdlb0Fzc2V0cy50b3BvanNvbltfdGhpcy50b3BvanNvbk5hbWVdID0gdG9wb2pzb247XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xufTtcblxucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oZ2VvQ2FsY0RhdGEsIGZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgZ2VvTGF5b3V0ID0gZnVsbExheW91dFt0aGlzLmlkXTtcblxuICAgIC8vIGltcG9ydGFudDogbWFwcyB3aXRoIGNob3JvcGxldGggdHJhY2VzIGhhdmUgYSBkaWZmZXJlbnQgbGF5ZXIgb3JkZXJcbiAgICB0aGlzLmhhc0Nob3JvcGxldGggPSBmYWxzZTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBnZW9DYWxjRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgY2FsY1RyYWNlID0gZ2VvQ2FsY0RhdGFbaV07XG4gICAgICAgIHZhciB0cmFjZSA9IGNhbGNUcmFjZVswXS50cmFjZTtcblxuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnY2hvcm9wbGV0aCcpIHtcbiAgICAgICAgICAgIHRoaXMuaGFzQ2hvcm9wbGV0aCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYodHJhY2UudmlzaWJsZSA9PT0gdHJ1ZSAmJiB0cmFjZS5fbGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdHJhY2UuX21vZHVsZS5jYWxjR2VvSlNPTihjYWxjVHJhY2UsIGZ1bGxMYXlvdXQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhhc0ludmFsaWRCb3VuZHMgPSB0aGlzLnVwZGF0ZVByb2plY3Rpb24oZ2VvQ2FsY0RhdGEsIGZ1bGxMYXlvdXQpO1xuICAgIGlmKGhhc0ludmFsaWRCb3VuZHMpIHJldHVybjtcblxuICAgIGlmKCF0aGlzLnZpZXdJbml0aWFsIHx8IHRoaXMuc2NvcGUgIT09IGdlb0xheW91dC5zY29wZSkge1xuICAgICAgICB0aGlzLnNhdmVWaWV3SW5pdGlhbChnZW9MYXlvdXQpO1xuICAgIH1cbiAgICB0aGlzLnNjb3BlID0gZ2VvTGF5b3V0LnNjb3BlO1xuXG4gICAgdGhpcy51cGRhdGVCYXNlTGF5ZXJzKGZ1bGxMYXlvdXQsIGdlb0xheW91dCk7XG4gICAgdGhpcy51cGRhdGVEaW1zKGZ1bGxMYXlvdXQsIGdlb0xheW91dCk7XG4gICAgdGhpcy51cGRhdGVGeChmdWxsTGF5b3V0LCBnZW9MYXlvdXQpO1xuXG4gICAgUGxvdHMuZ2VuZXJhbFVwZGF0ZVBlclRyYWNlTW9kdWxlKHRoaXMuZ3JhcGhEaXYsIHRoaXMsIGdlb0NhbGNEYXRhLCBnZW9MYXlvdXQpO1xuXG4gICAgdmFyIHNjYXR0ZXJMYXllciA9IHRoaXMubGF5ZXJzLmZyb250cGxvdC5zZWxlY3QoJy5zY2F0dGVybGF5ZXInKTtcbiAgICB0aGlzLmRhdGFQb2ludHMucG9pbnQgPSBzY2F0dGVyTGF5ZXIuc2VsZWN0QWxsKCcucG9pbnQnKTtcbiAgICB0aGlzLmRhdGFQb2ludHMudGV4dCA9IHNjYXR0ZXJMYXllci5zZWxlY3RBbGwoJ3RleHQnKTtcbiAgICB0aGlzLmRhdGFQYXRocy5saW5lID0gc2NhdHRlckxheWVyLnNlbGVjdEFsbCgnLmpzLWxpbmUnKTtcblxuICAgIHZhciBjaG9yb3BsZXRoTGF5ZXIgPSB0aGlzLmxheWVycy5iYWNrcGxvdC5zZWxlY3QoJy5jaG9yb3BsZXRobGF5ZXInKTtcbiAgICB0aGlzLmRhdGFQYXRocy5jaG9yb3BsZXRoID0gY2hvcm9wbGV0aExheWVyLnNlbGVjdEFsbCgncGF0aCcpO1xuXG4gICAgdGhpcy5yZW5kZXIoKTtcbn07XG5cbnByb3RvLnVwZGF0ZVByb2plY3Rpb24gPSBmdW5jdGlvbihnZW9DYWxjRGF0YSwgZnVsbExheW91dCkge1xuICAgIHZhciBnZCA9IHRoaXMuZ3JhcGhEaXY7XG4gICAgdmFyIGdlb0xheW91dCA9IGZ1bGxMYXlvdXRbdGhpcy5pZF07XG4gICAgdmFyIGdzID0gZnVsbExheW91dC5fc2l6ZTtcbiAgICB2YXIgZG9tYWluID0gZ2VvTGF5b3V0LmRvbWFpbjtcbiAgICB2YXIgcHJvakxheW91dCA9IGdlb0xheW91dC5wcm9qZWN0aW9uO1xuXG4gICAgdmFyIGxvbmF4aXMgPSBnZW9MYXlvdXQubG9uYXhpcztcbiAgICB2YXIgbGF0YXhpcyA9IGdlb0xheW91dC5sYXRheGlzO1xuICAgIHZhciBheExvbiA9IGxvbmF4aXMuX2F4O1xuICAgIHZhciBheExhdCA9IGxhdGF4aXMuX2F4O1xuXG4gICAgdmFyIHByb2plY3Rpb24gPSB0aGlzLnByb2plY3Rpb24gPSBnZXRQcm9qZWN0aW9uKGdlb0xheW91dCk7XG5cbiAgICAvLyBzZXR1cCBzdWJwbG90IGV4dGVudCBbW3gwLHkwXSwgW3gxLHkxXV1cbiAgICB2YXIgZXh0ZW50ID0gW1tcbiAgICAgICAgZ3MubCArIGdzLncgKiBkb21haW4ueFswXSxcbiAgICAgICAgZ3MudCArIGdzLmggKiAoMSAtIGRvbWFpbi55WzFdKVxuICAgIF0sIFtcbiAgICAgICAgZ3MubCArIGdzLncgKiBkb21haW4ueFsxXSxcbiAgICAgICAgZ3MudCArIGdzLmggKiAoMSAtIGRvbWFpbi55WzBdKVxuICAgIF1dO1xuXG4gICAgdmFyIGNlbnRlciA9IGdlb0xheW91dC5jZW50ZXIgfHwge307XG4gICAgdmFyIHJvdGF0aW9uID0gcHJvakxheW91dC5yb3RhdGlvbiB8fCB7fTtcbiAgICB2YXIgbG9uYXhpc1JhbmdlID0gbG9uYXhpcy5yYW5nZSB8fCBbXTtcbiAgICB2YXIgbGF0YXhpc1JhbmdlID0gbGF0YXhpcy5yYW5nZSB8fCBbXTtcblxuICAgIGlmKGdlb0xheW91dC5maXRib3VuZHMpIHtcbiAgICAgICAgYXhMb24uX2xlbmd0aCA9IGV4dGVudFsxXVswXSAtIGV4dGVudFswXVswXTtcbiAgICAgICAgYXhMYXQuX2xlbmd0aCA9IGV4dGVudFsxXVsxXSAtIGV4dGVudFswXVsxXTtcbiAgICAgICAgYXhMb24ucmFuZ2UgPSBnZXRBdXRvUmFuZ2UoZ2QsIGF4TG9uKTtcbiAgICAgICAgYXhMYXQucmFuZ2UgPSBnZXRBdXRvUmFuZ2UoZ2QsIGF4TGF0KTtcblxuICAgICAgICB2YXIgbWlkTG9uID0gKGF4TG9uLnJhbmdlWzBdICsgYXhMb24ucmFuZ2VbMV0pIC8gMjtcbiAgICAgICAgdmFyIG1pZExhdCA9IChheExhdC5yYW5nZVswXSArIGF4TGF0LnJhbmdlWzFdKSAvIDI7XG5cbiAgICAgICAgaWYoZ2VvTGF5b3V0Ll9pc1Njb3BlZCkge1xuICAgICAgICAgICAgY2VudGVyID0ge2xvbjogbWlkTG9uLCBsYXQ6IG1pZExhdH07XG4gICAgICAgIH0gZWxzZSBpZihnZW9MYXlvdXQuX2lzQ2xpcHBlZCkge1xuICAgICAgICAgICAgY2VudGVyID0ge2xvbjogbWlkTG9uLCBsYXQ6IG1pZExhdH07XG4gICAgICAgICAgICByb3RhdGlvbiA9IHtsb246IG1pZExvbiwgbGF0OiBtaWRMYXQsIHJvbGw6IHJvdGF0aW9uLnJvbGx9O1xuXG4gICAgICAgICAgICB2YXIgcHJvalR5cGUgPSBwcm9qTGF5b3V0LnR5cGU7XG4gICAgICAgICAgICB2YXIgbG9uSGFsZlNwYW4gPSAoY29uc3RhbnRzLmxvbmF4aXNTcGFuW3Byb2pUeXBlXSAvIDIpIHx8IDE4MDtcbiAgICAgICAgICAgIHZhciBsYXRIYWxmU3BhbiA9IChjb25zdGFudHMubGF0YXhpc1NwYW5bcHJvalR5cGVdIC8gMikgfHwgMTgwO1xuXG4gICAgICAgICAgICBsb25heGlzUmFuZ2UgPSBbbWlkTG9uIC0gbG9uSGFsZlNwYW4sIG1pZExvbiArIGxvbkhhbGZTcGFuXTtcbiAgICAgICAgICAgIGxhdGF4aXNSYW5nZSA9IFttaWRMYXQgLSBsYXRIYWxmU3BhbiwgbWlkTGF0ICsgbGF0SGFsZlNwYW5dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2VudGVyID0ge2xvbjogbWlkTG9uLCBsYXQ6IG1pZExhdH07XG4gICAgICAgICAgICByb3RhdGlvbiA9IHtsb246IG1pZExvbiwgbGF0OiByb3RhdGlvbi5sYXQsIHJvbGw6IHJvdGF0aW9uLnJvbGx9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gc2V0ICdwcmUtZml0JyBwcm9qZWN0aW9uXG4gICAgcHJvamVjdGlvblxuICAgICAgICAuY2VudGVyKFtjZW50ZXIubG9uIC0gcm90YXRpb24ubG9uLCBjZW50ZXIubGF0IC0gcm90YXRpb24ubGF0XSlcbiAgICAgICAgLnJvdGF0ZShbLXJvdGF0aW9uLmxvbiwgLXJvdGF0aW9uLmxhdCwgcm90YXRpb24ucm9sbF0pXG4gICAgICAgIC5wYXJhbGxlbHMocHJvakxheW91dC5wYXJhbGxlbHMpO1xuXG4gICAgLy8gZml0IHByb2plY3Rpb24gJ3NjYWxlJyBhbmQgJ3RyYW5zbGF0ZScgdG8gc2V0IGxvbi9sYXQgcmFuZ2VzXG4gICAgdmFyIHJhbmdlQm94ID0gbWFrZVJhbmdlQm94KGxvbmF4aXNSYW5nZSwgbGF0YXhpc1JhbmdlKTtcbiAgICBwcm9qZWN0aW9uLmZpdEV4dGVudChleHRlbnQsIHJhbmdlQm94KTtcblxuICAgIHZhciBiID0gdGhpcy5ib3VuZHMgPSBwcm9qZWN0aW9uLmdldEJvdW5kcyhyYW5nZUJveCk7XG4gICAgdmFyIHMgPSB0aGlzLmZpdFNjYWxlID0gcHJvamVjdGlvbi5zY2FsZSgpO1xuICAgIHZhciB0ID0gcHJvamVjdGlvbi50cmFuc2xhdGUoKTtcblxuICAgIGlmKFxuICAgICAgICAhaXNGaW5pdGUoYlswXVswXSkgfHwgIWlzRmluaXRlKGJbMF1bMV0pIHx8XG4gICAgICAgICFpc0Zpbml0ZShiWzFdWzBdKSB8fCAhaXNGaW5pdGUoYlsxXVsxXSkgfHxcbiAgICAgICAgaXNOYU4odFswXSkgfHwgaXNOYU4odFswXSlcbiAgICApIHtcbiAgICAgICAgdmFyIGF0dHJUb1Vuc2V0ID0gWydmaXRib3VuZHMnLCAncHJvamVjdGlvbi5yb3RhdGlvbicsICdjZW50ZXInLCAnbG9uYXhpcy5yYW5nZScsICdsYXRheGlzLnJhbmdlJ107XG4gICAgICAgIHZhciBtc2cgPSAnSW52YWxpZCBnZW8gc2V0dGluZ3MsIHJlbGF5b3V0XFwnaW5nIHRvIGRlZmF1bHQgdmlldy4nO1xuICAgICAgICB2YXIgdXBkYXRlT2JqID0ge307XG5cbiAgICAgICAgLy8gY2xlYXIgYWxsIGF0dHJpYnV0ZXMgdGhhdCBjb3VsZCBjYXVzZSBpbnZhbGlkIGJvdW5kcyxcbiAgICAgICAgLy8gY2xlYXIgdmlld0luaXRpYWwgdG8gdXBkYXRlIHJlc2V0LXZpZXcgYmVoYXZpb3JcblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXR0clRvVW5zZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHVwZGF0ZU9ialt0aGlzLmlkICsgJy4nICsgYXR0clRvVW5zZXRbaV1dID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudmlld0luaXRpYWwgPSBudWxsO1xuXG4gICAgICAgIExpYi53YXJuKG1zZyk7XG4gICAgICAgIGdkLl9wcm9taXNlcy5wdXNoKFJlZ2lzdHJ5LmNhbGwoJ3JlbGF5b3V0JywgZ2QsIHVwZGF0ZU9iaikpO1xuICAgICAgICByZXR1cm4gbXNnO1xuICAgIH1cblxuICAgIGlmKGdlb0xheW91dC5maXRib3VuZHMpIHtcbiAgICAgICAgdmFyIGIyID0gcHJvamVjdGlvbi5nZXRCb3VuZHMobWFrZVJhbmdlQm94KGF4TG9uLnJhbmdlLCBheExhdC5yYW5nZSkpO1xuICAgICAgICB2YXIgazIgPSBNYXRoLm1pbihcbiAgICAgICAgICAgIChiWzFdWzBdIC0gYlswXVswXSkgLyAoYjJbMV1bMF0gLSBiMlswXVswXSksXG4gICAgICAgICAgICAoYlsxXVsxXSAtIGJbMF1bMV0pIC8gKGIyWzFdWzFdIC0gYjJbMF1bMV0pXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYoaXNGaW5pdGUoazIpKSB7XG4gICAgICAgICAgICBwcm9qZWN0aW9uLnNjYWxlKGsyICogcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBMaWIud2FybignU29tZXRoaW5nIHdlbnQgd3JvbmcgZHVyaW5nJyArIHRoaXMuaWQgKyAnZml0Ym91bmRzIGNvbXB1dGF0aW9ucy4nKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGFkanVzdCBwcm9qZWN0aW9uIHRvIHVzZXIgc2V0dGluZ1xuICAgICAgICBwcm9qZWN0aW9uLnNjYWxlKHByb2pMYXlvdXQuc2NhbGUgKiBzKTtcbiAgICB9XG5cbiAgICAvLyBweCBjb29yZGluYXRlcyBvZiB2aWV3IG1pZC1wb2ludCxcbiAgICAvLyB1c2VmdWwgdG8gdXBkYXRlIGBnZW8uY2VudGVyYCBhZnRlciBpbnRlcmFjdGlvbnNcbiAgICB2YXIgbWlkUHQgPSB0aGlzLm1pZFB0ID0gW1xuICAgICAgICAoYlswXVswXSArIGJbMV1bMF0pIC8gMixcbiAgICAgICAgKGJbMF1bMV0gKyBiWzFdWzFdKSAvIDJcbiAgICBdO1xuXG4gICAgcHJvamVjdGlvblxuICAgICAgICAudHJhbnNsYXRlKFt0WzBdICsgKG1pZFB0WzBdIC0gdFswXSksIHRbMV0gKyAobWlkUHRbMV0gLSB0WzFdKV0pXG4gICAgICAgIC5jbGlwRXh0ZW50KGIpO1xuXG4gICAgLy8gdGhlICdhbGJlcnMgdXNhJyBwcm9qZWN0aW9uIGRvZXMgbm90IGV4cG9zZSBhICdjZW50ZXInIG1ldGhvZFxuICAgIC8vIHNvIGhlcmUncyB0aGlzIGhhY2sgdG8gbWFrZSBpdCByZXNwb25kIHRvICdnZW9MYXlvdXQuY2VudGVyJ1xuICAgIGlmKGdlb0xheW91dC5faXNBbGJlcnNVc2EpIHtcbiAgICAgICAgdmFyIGNlbnRlclB4ID0gcHJvamVjdGlvbihbY2VudGVyLmxvbiwgY2VudGVyLmxhdF0pO1xuICAgICAgICB2YXIgdHQgPSBwcm9qZWN0aW9uLnRyYW5zbGF0ZSgpO1xuXG4gICAgICAgIHByb2plY3Rpb24udHJhbnNsYXRlKFtcbiAgICAgICAgICAgIHR0WzBdIC0gKGNlbnRlclB4WzBdIC0gdHRbMF0pLFxuICAgICAgICAgICAgdHRbMV0gLSAoY2VudGVyUHhbMV0gLSB0dFsxXSlcbiAgICAgICAgXSk7XG4gICAgfVxufTtcblxucHJvdG8udXBkYXRlQmFzZUxheWVycyA9IGZ1bmN0aW9uKGZ1bGxMYXlvdXQsIGdlb0xheW91dCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIHRvcG9qc29uID0gX3RoaXMudG9wb2pzb247XG4gICAgdmFyIGxheWVycyA9IF90aGlzLmxheWVycztcbiAgICB2YXIgYmFzZVBhdGhzID0gX3RoaXMuYmFzZVBhdGhzO1xuXG4gICAgZnVuY3Rpb24gaXNBeGlzTGF5ZXIoZCkge1xuICAgICAgICByZXR1cm4gKGQgPT09ICdsb25heGlzJyB8fCBkID09PSAnbGF0YXhpcycpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzTGluZUxheWVyKGQpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oY29uc3RhbnRzLmxpbmVMYXllcnNbZF0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGlzRmlsbExheWVyKGQpIHtcbiAgICAgICAgcmV0dXJuIEJvb2xlYW4oY29uc3RhbnRzLmZpbGxMYXllcnNbZF0pO1xuICAgIH1cblxuICAgIHZhciBhbGxMYXllcnMgPSB0aGlzLmhhc0Nob3JvcGxldGggP1xuICAgICAgICBjb25zdGFudHMubGF5ZXJzRm9yQ2hvcm9wbGV0aCA6XG4gICAgICAgIGNvbnN0YW50cy5sYXllcnM7XG5cbiAgICB2YXIgbGF5ZXJEYXRhID0gYWxsTGF5ZXJzLmZpbHRlcihmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAoaXNMaW5lTGF5ZXIoZCkgfHwgaXNGaWxsTGF5ZXIoZCkpID8gZ2VvTGF5b3V0WydzaG93JyArIGRdIDpcbiAgICAgICAgICAgIGlzQXhpc0xheWVyKGQpID8gZ2VvTGF5b3V0W2RdLnNob3dncmlkIDpcbiAgICAgICAgICAgIHRydWU7XG4gICAgfSk7XG5cbiAgICB2YXIgam9pbiA9IF90aGlzLmZyYW1ld29yay5zZWxlY3RBbGwoJy5sYXllcicpXG4gICAgICAgIC5kYXRhKGxheWVyRGF0YSwgU3RyaW5nKTtcblxuICAgIGpvaW4uZXhpdCgpLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICBkZWxldGUgbGF5ZXJzW2RdO1xuICAgICAgICBkZWxldGUgYmFzZVBhdGhzW2RdO1xuICAgICAgICBkMy5zZWxlY3QodGhpcykucmVtb3ZlKCk7XG4gICAgfSk7XG5cbiAgICBqb2luLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gJ2xheWVyICcgKyBkOyB9KVxuICAgICAgICAuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSBsYXllcnNbZF0gPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgICAgIGlmKGQgPT09ICdiZycpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5iZ1JlY3QgPSBsYXllci5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGlzQXhpc0xheWVyKGQpKSB7XG4gICAgICAgICAgICAgICAgYmFzZVBhdGhzW2RdID0gbGF5ZXIuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihkID09PSAnYmFja3Bsb3QnKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ2Nob3JvcGxldGhsYXllcicsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGQgPT09ICdmcm9udHBsb3QnKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIuYXBwZW5kKCdnJylcbiAgICAgICAgICAgICAgICAgICAgLmNsYXNzZWQoJ3NjYXR0ZXJsYXllcicsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGlzTGluZUxheWVyKGQpKSB7XG4gICAgICAgICAgICAgICAgYmFzZVBhdGhzW2RdID0gbGF5ZXIuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgJ25vbmUnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS1taXRlcmxpbWl0JywgMik7XG4gICAgICAgICAgICB9IGVsc2UgaWYoaXNGaWxsTGF5ZXIoZCkpIHtcbiAgICAgICAgICAgICAgICBiYXNlUGF0aHNbZF0gPSBsYXllci5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZScsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgam9pbi5vcmRlcigpO1xuXG4gICAgam9pbi5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHBhdGggPSBiYXNlUGF0aHNbZF07XG4gICAgICAgIHZhciBhZGogPSBjb25zdGFudHMubGF5ZXJOYW1lVG9BZGplY3RpdmVbZF07XG5cbiAgICAgICAgaWYoZCA9PT0gJ2ZyYW1lJykge1xuICAgICAgICAgICAgcGF0aC5kYXR1bShjb25zdGFudHMuc3BoZXJlU1ZHKTtcbiAgICAgICAgfSBlbHNlIGlmKGlzTGluZUxheWVyKGQpIHx8IGlzRmlsbExheWVyKGQpKSB7XG4gICAgICAgICAgICBwYXRoLmRhdHVtKHRvcG9qc29uRmVhdHVyZSh0b3BvanNvbiwgdG9wb2pzb24ub2JqZWN0c1tkXSkpO1xuICAgICAgICB9IGVsc2UgaWYoaXNBeGlzTGF5ZXIoZCkpIHtcbiAgICAgICAgICAgIHBhdGguZGF0dW0obWFrZUdyYXRpY3VsZShkLCBnZW9MYXlvdXQsIGZ1bGxMYXlvdXQpKVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgZ2VvTGF5b3V0W2RdLmdyaWRjb2xvcilcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLmRhc2hMaW5lLCAnJywgZ2VvTGF5b3V0W2RdLmdyaWR3aWR0aCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihpc0xpbmVMYXllcihkKSkge1xuICAgICAgICAgICAgcGF0aC5jYWxsKENvbG9yLnN0cm9rZSwgZ2VvTGF5b3V0W2FkaiArICdjb2xvciddKVxuICAgICAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZGFzaExpbmUsICcnLCBnZW9MYXlvdXRbYWRqICsgJ3dpZHRoJ10pO1xuICAgICAgICB9IGVsc2UgaWYoaXNGaWxsTGF5ZXIoZCkpIHtcbiAgICAgICAgICAgIHBhdGguY2FsbChDb2xvci5maWxsLCBnZW9MYXlvdXRbYWRqICsgJ2NvbG9yJ10pO1xuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5wcm90by51cGRhdGVEaW1zID0gZnVuY3Rpb24oZnVsbExheW91dCwgZ2VvTGF5b3V0KSB7XG4gICAgdmFyIGIgPSB0aGlzLmJvdW5kcztcbiAgICB2YXIgaEZyYW1lV2lkdGggPSAoZ2VvTGF5b3V0LmZyYW1ld2lkdGggfHwgMCkgLyAyO1xuXG4gICAgdmFyIGwgPSBiWzBdWzBdIC0gaEZyYW1lV2lkdGg7XG4gICAgdmFyIHQgPSBiWzBdWzFdIC0gaEZyYW1lV2lkdGg7XG4gICAgdmFyIHcgPSBiWzFdWzBdIC0gbCArIGhGcmFtZVdpZHRoO1xuICAgIHZhciBoID0gYlsxXVsxXSAtIHQgKyBoRnJhbWVXaWR0aDtcblxuICAgIERyYXdpbmcuc2V0UmVjdCh0aGlzLmNsaXBSZWN0LCBsLCB0LCB3LCBoKTtcblxuICAgIHRoaXMuYmdSZWN0XG4gICAgICAgIC5jYWxsKERyYXdpbmcuc2V0UmVjdCwgbCwgdCwgdywgaClcbiAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgZ2VvTGF5b3V0LmJnY29sb3IpO1xuXG4gICAgdGhpcy54YXhpcy5fb2Zmc2V0ID0gbDtcbiAgICB0aGlzLnhheGlzLl9sZW5ndGggPSB3O1xuXG4gICAgdGhpcy55YXhpcy5fb2Zmc2V0ID0gdDtcbiAgICB0aGlzLnlheGlzLl9sZW5ndGggPSBoO1xufTtcblxucHJvdG8udXBkYXRlRnggPSBmdW5jdGlvbihmdWxsTGF5b3V0LCBnZW9MYXlvdXQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBnZCA9IF90aGlzLmdyYXBoRGl2O1xuICAgIHZhciBiZ1JlY3QgPSBfdGhpcy5iZ1JlY3Q7XG4gICAgdmFyIGRyYWdNb2RlID0gZnVsbExheW91dC5kcmFnbW9kZTtcbiAgICB2YXIgY2xpY2tNb2RlID0gZnVsbExheW91dC5jbGlja21vZGU7XG5cbiAgICBpZihfdGhpcy5pc1N0YXRpYykgcmV0dXJuO1xuXG4gICAgZnVuY3Rpb24gem9vbVJlc2V0KCkge1xuICAgICAgICB2YXIgdmlld0luaXRpYWwgPSBfdGhpcy52aWV3SW5pdGlhbDtcbiAgICAgICAgdmFyIHVwZGF0ZU9iaiA9IHt9O1xuXG4gICAgICAgIGZvcih2YXIgayBpbiB2aWV3SW5pdGlhbCkge1xuICAgICAgICAgICAgdXBkYXRlT2JqW190aGlzLmlkICsgJy4nICsga10gPSB2aWV3SW5pdGlhbFtrXTtcbiAgICAgICAgfVxuXG4gICAgICAgIFJlZ2lzdHJ5LmNhbGwoJ19ndWlSZWxheW91dCcsIGdkLCB1cGRhdGVPYmopO1xuICAgICAgICBnZC5lbWl0KCdwbG90bHlfZG91YmxlY2xpY2snLCBudWxsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnZlcnQobG9ubGF0KSB7XG4gICAgICAgIHJldHVybiBfdGhpcy5wcm9qZWN0aW9uLmludmVydChbXG4gICAgICAgICAgICBsb25sYXRbMF0gKyBfdGhpcy54YXhpcy5fb2Zmc2V0LFxuICAgICAgICAgICAgbG9ubGF0WzFdICsgX3RoaXMueWF4aXMuX29mZnNldFxuICAgICAgICBdKTtcbiAgICB9XG5cbiAgICB2YXIgZmlsbFJhbmdlSXRlbXM7XG5cbiAgICBpZihkcmFnTW9kZSA9PT0gJ3NlbGVjdCcpIHtcbiAgICAgICAgZmlsbFJhbmdlSXRlbXMgPSBmdW5jdGlvbihldmVudERhdGEsIHBvbHkpIHtcbiAgICAgICAgICAgIHZhciByYW5nZXMgPSBldmVudERhdGEucmFuZ2UgPSB7fTtcbiAgICAgICAgICAgIHJhbmdlc1tfdGhpcy5pZF0gPSBbXG4gICAgICAgICAgICAgICAgaW52ZXJ0KFtwb2x5LnhtaW4sIHBvbHkueW1pbl0pLFxuICAgICAgICAgICAgICAgIGludmVydChbcG9seS54bWF4LCBwb2x5LnltYXhdKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYoZHJhZ01vZGUgPT09ICdsYXNzbycpIHtcbiAgICAgICAgZmlsbFJhbmdlSXRlbXMgPSBmdW5jdGlvbihldmVudERhdGEsIHBvbHksIHB0cykge1xuICAgICAgICAgICAgdmFyIGRhdGFQdHMgPSBldmVudERhdGEubGFzc29Qb2ludHMgPSB7fTtcbiAgICAgICAgICAgIGRhdGFQdHNbX3RoaXMuaWRdID0gcHRzLmZpbHRlcmVkLm1hcChpbnZlcnQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIE5vdGU6IGRyYWdPcHRpb25zIGlzIG5lZWRlZCB0byBiZSBkZWNsYXJlZCBmb3IgYWxsIGRyYWdtb2RlcyBiZWNhdXNlXG4gICAgLy8gaXQncyB0aGUgb2JqZWN0IHRoYXQgaG9sZHMgcGVyc2lzdGVudCBzZWxlY3Rpb24gc3RhdGUuXG4gICAgdmFyIGRyYWdPcHRpb25zID0ge1xuICAgICAgICBlbGVtZW50OiBfdGhpcy5iZ1JlY3Qubm9kZSgpLFxuICAgICAgICBnZDogZ2QsXG4gICAgICAgIHBsb3RpbmZvOiB7XG4gICAgICAgICAgICBpZDogX3RoaXMuaWQsXG4gICAgICAgICAgICB4YXhpczogX3RoaXMueGF4aXMsXG4gICAgICAgICAgICB5YXhpczogX3RoaXMueWF4aXMsXG4gICAgICAgICAgICBmaWxsUmFuZ2VJdGVtczogZmlsbFJhbmdlSXRlbXNcbiAgICAgICAgfSxcbiAgICAgICAgeGF4ZXM6IFtfdGhpcy54YXhpc10sXG4gICAgICAgIHlheGVzOiBbX3RoaXMueWF4aXNdLFxuICAgICAgICBzdWJwbG90OiBfdGhpcy5pZCxcbiAgICAgICAgY2xpY2tGbjogZnVuY3Rpb24obnVtQ2xpY2tzKSB7XG4gICAgICAgICAgICBpZihudW1DbGlja3MgPT09IDIpIHtcbiAgICAgICAgICAgICAgICBjbGVhclNlbGVjdChnZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgaWYoZHJhZ01vZGUgPT09ICdwYW4nKSB7XG4gICAgICAgIGJnUmVjdC5ub2RlKCkub25tb3VzZWRvd24gPSBudWxsO1xuICAgICAgICBiZ1JlY3QuY2FsbChjcmVhdGVHZW9ab29tKF90aGlzLCBnZW9MYXlvdXQpKTtcbiAgICAgICAgYmdSZWN0Lm9uKCdkYmxjbGljay56b29tJywgem9vbVJlc2V0KTtcbiAgICAgICAgaWYoIWdkLl9jb250ZXh0Ll9zY3JvbGxab29tLmdlbykge1xuICAgICAgICAgICAgYmdSZWN0Lm9uKCd3aGVlbC56b29tJywgbnVsbCk7XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYoZHJhZ01vZGUgPT09ICdzZWxlY3QnIHx8IGRyYWdNb2RlID09PSAnbGFzc28nKSB7XG4gICAgICAgIGJnUmVjdC5vbignLnpvb20nLCBudWxsKTtcblxuICAgICAgICBkcmFnT3B0aW9ucy5wcmVwRm4gPSBmdW5jdGlvbihlLCBzdGFydFgsIHN0YXJ0WSkge1xuICAgICAgICAgICAgcHJlcFNlbGVjdChlLCBzdGFydFgsIHN0YXJ0WSwgZHJhZ09wdGlvbnMsIGRyYWdNb2RlKTtcbiAgICAgICAgfTtcblxuICAgICAgICBkcmFnRWxlbWVudC5pbml0KGRyYWdPcHRpb25zKTtcbiAgICB9XG5cbiAgICBiZ1JlY3Qub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgbG9ubGF0ID0gX3RoaXMucHJvamVjdGlvbi5pbnZlcnQoZDMubW91c2UodGhpcykpO1xuXG4gICAgICAgIGlmKCFsb25sYXQgfHwgaXNOYU4obG9ubGF0WzBdKSB8fCBpc05hTihsb25sYXRbMV0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZHJhZ0VsZW1lbnQudW5ob3ZlcihnZCwgZDMuZXZlbnQpO1xuICAgICAgICB9XG5cbiAgICAgICAgX3RoaXMueGF4aXMucDJjID0gZnVuY3Rpb24oKSB7IHJldHVybiBsb25sYXRbMF07IH07XG4gICAgICAgIF90aGlzLnlheGlzLnAyYyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gbG9ubGF0WzFdOyB9O1xuXG4gICAgICAgIEZ4LmhvdmVyKGdkLCBkMy5ldmVudCwgX3RoaXMuaWQpO1xuICAgIH0pO1xuXG4gICAgYmdSZWN0Lm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICBpZihnZC5fZHJhZ2dpbmcpIHJldHVybjtcbiAgICAgICAgZHJhZ0VsZW1lbnQudW5ob3ZlcihnZCwgZDMuZXZlbnQpO1xuICAgIH0pO1xuXG4gICAgYmdSZWN0Lm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBGb3Igc2VsZWN0IGFuZCBsYXNzbyB0aGUgZHJhZ0VsZW1lbnQgaXMgaGFuZGxpbmcgY2xpY2tzXG4gICAgICAgIGlmKGRyYWdNb2RlICE9PSAnc2VsZWN0JyAmJiBkcmFnTW9kZSAhPT0gJ2xhc3NvJykge1xuICAgICAgICAgICAgaWYoY2xpY2tNb2RlLmluZGV4T2YoJ3NlbGVjdCcpID4gLTEpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RPbkNsaWNrKGQzLmV2ZW50LCBnZCwgW190aGlzLnhheGlzXSwgW190aGlzLnlheGlzXSxcbiAgICAgICAgICAgICAgICAgIF90aGlzLmlkLCBkcmFnT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGNsaWNrTW9kZS5pbmRleE9mKCdldmVudCcpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBsaWtlIHBpZSBhbmQgbWFwYm94LCB0aGlzIGRvZXNuJ3Qgc3VwcG9ydCByaWdodC1jbGlja1xuICAgICAgICAgICAgICAgIC8vIGFjdHVhbGx5IHRoaXMgb25lIGlzIHdvcnNlLCBhcyByaWdodC1jbGljayBzdGFydHMgYSBwYW4sIG9yIGxlYXZlc1xuICAgICAgICAgICAgICAgIC8vIHNlbGVjdCBpbiBhIHdlaXJkIHN0YXRlLlxuICAgICAgICAgICAgICAgIC8vIEFsc28sIG9ubHkgdGFuZ2VudGlhbGx5IHJlbGF0ZWQsIHdlIHNob3VsZCBjYW5jZWwgaG92ZXIgZHVyaW5nIHBhblxuICAgICAgICAgICAgICAgIEZ4LmNsaWNrKGdkLCBkMy5ldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbnByb3RvLm1ha2VGcmFtZXdvcmsgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBnZCA9IF90aGlzLmdyYXBoRGl2O1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGNsaXBJZCA9ICdjbGlwJyArIGZ1bGxMYXlvdXQuX3VpZCArIF90aGlzLmlkO1xuXG4gICAgX3RoaXMuY2xpcERlZiA9IGZ1bGxMYXlvdXQuX2NsaXBzLmFwcGVuZCgnY2xpcFBhdGgnKVxuICAgICAgICAuYXR0cignaWQnLCBjbGlwSWQpO1xuXG4gICAgX3RoaXMuY2xpcFJlY3QgPSBfdGhpcy5jbGlwRGVmLmFwcGVuZCgncmVjdCcpO1xuXG4gICAgX3RoaXMuZnJhbWV3b3JrID0gZDMuc2VsZWN0KF90aGlzLmNvbnRhaW5lcikuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2dlbyAnICsgX3RoaXMuaWQpXG4gICAgICAgIC5jYWxsKERyYXdpbmcuc2V0Q2xpcFVybCwgY2xpcElkLCBnZCk7XG5cbiAgICAvLyBzYW5lIGxvbmxhdCB0byBweFxuICAgIF90aGlzLnByb2plY3QgPSBmdW5jdGlvbih2KSB7XG4gICAgICAgIHZhciBweCA9IF90aGlzLnByb2plY3Rpb24odik7XG4gICAgICAgIHJldHVybiBweCA/XG4gICAgICAgICAgICBbcHhbMF0gLSBfdGhpcy54YXhpcy5fb2Zmc2V0LCBweFsxXSAtIF90aGlzLnlheGlzLl9vZmZzZXRdIDpcbiAgICAgICAgICAgIFtudWxsLCBudWxsXTtcbiAgICB9O1xuXG4gICAgX3RoaXMueGF4aXMgPSB7XG4gICAgICAgIF9pZDogJ3gnLFxuICAgICAgICBjMnA6IGZ1bmN0aW9uKHYpIHsgcmV0dXJuIF90aGlzLnByb2plY3QodilbMF07IH1cbiAgICB9O1xuXG4gICAgX3RoaXMueWF4aXMgPSB7XG4gICAgICAgIF9pZDogJ3knLFxuICAgICAgICBjMnA6IGZ1bmN0aW9uKHYpIHsgcmV0dXJuIF90aGlzLnByb2plY3QodilbMV07IH1cbiAgICB9O1xuXG4gICAgLy8gbW9jayBheGlzIGZvciBob3ZlciBmb3JtYXR0aW5nXG4gICAgX3RoaXMubW9ja0F4aXMgPSB7XG4gICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICBzaG93ZXhwb25lbnQ6ICdhbGwnLFxuICAgICAgICBleHBvbmVudGZvcm1hdDogJ0InXG4gICAgfTtcbiAgICBBeGVzLnNldENvbnZlcnQoX3RoaXMubW9ja0F4aXMsIGZ1bGxMYXlvdXQpO1xufTtcblxucHJvdG8uc2F2ZVZpZXdJbml0aWFsID0gZnVuY3Rpb24oZ2VvTGF5b3V0KSB7XG4gICAgdmFyIGNlbnRlciA9IGdlb0xheW91dC5jZW50ZXIgfHwge307XG4gICAgdmFyIHByb2pMYXlvdXQgPSBnZW9MYXlvdXQucHJvamVjdGlvbjtcbiAgICB2YXIgcm90YXRpb24gPSBwcm9qTGF5b3V0LnJvdGF0aW9uIHx8IHt9O1xuXG4gICAgdGhpcy52aWV3SW5pdGlhbCA9IHtcbiAgICAgICAgJ2ZpdGJvdW5kcyc6IGdlb0xheW91dC5maXRib3VuZHMsXG4gICAgICAgICdwcm9qZWN0aW9uLnNjYWxlJzogcHJvakxheW91dC5zY2FsZVxuICAgIH07XG5cbiAgICB2YXIgZXh0cmE7XG4gICAgaWYoZ2VvTGF5b3V0Ll9pc1Njb3BlZCkge1xuICAgICAgICBleHRyYSA9IHtcbiAgICAgICAgICAgICdjZW50ZXIubG9uJzogY2VudGVyLmxvbixcbiAgICAgICAgICAgICdjZW50ZXIubGF0JzogY2VudGVyLmxhdCxcbiAgICAgICAgfTtcbiAgICB9IGVsc2UgaWYoZ2VvTGF5b3V0Ll9pc0NsaXBwZWQpIHtcbiAgICAgICAgZXh0cmEgPSB7XG4gICAgICAgICAgICAncHJvamVjdGlvbi5yb3RhdGlvbi5sb24nOiByb3RhdGlvbi5sb24sXG4gICAgICAgICAgICAncHJvamVjdGlvbi5yb3RhdGlvbi5sYXQnOiByb3RhdGlvbi5sYXRcbiAgICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBleHRyYSA9IHtcbiAgICAgICAgICAgICdjZW50ZXIubG9uJzogY2VudGVyLmxvbixcbiAgICAgICAgICAgICdjZW50ZXIubGF0JzogY2VudGVyLmxhdCxcbiAgICAgICAgICAgICdwcm9qZWN0aW9uLnJvdGF0aW9uLmxvbic6IHJvdGF0aW9uLmxvblxuICAgICAgICB9O1xuICAgIH1cblxuICAgIExpYi5leHRlbmRGbGF0KHRoaXMudmlld0luaXRpYWwsIGV4dHJhKTtcbn07XG5cbi8vIFtob3QgY29kZSBwYXRoXSAocmUpZHJhdyBhbGwgcGF0aHMgd2hpY2ggZGVwZW5kIG9uIHRoZSBwcm9qZWN0aW9uXG5wcm90by5yZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgcHJvamVjdGlvbiA9IHRoaXMucHJvamVjdGlvbjtcbiAgICB2YXIgcGF0aEZuID0gcHJvamVjdGlvbi5nZXRQYXRoKCk7XG4gICAgdmFyIGs7XG5cbiAgICBmdW5jdGlvbiB0cmFuc2xhdGVQb2ludHMoZCkge1xuICAgICAgICB2YXIgbG9ubGF0UHggPSBwcm9qZWN0aW9uKGQubG9ubGF0KTtcbiAgICAgICAgcmV0dXJuIGxvbmxhdFB4ID9cbiAgICAgICAgICAgICd0cmFuc2xhdGUoJyArIGxvbmxhdFB4WzBdICsgJywnICsgbG9ubGF0UHhbMV0gKyAnKScgOlxuICAgICAgICAgICAgIG51bGw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGlkZVNob3dQb2ludHMoZCkge1xuICAgICAgICByZXR1cm4gcHJvamVjdGlvbi5pc0xvbkxhdE92ZXJFZGdlcyhkLmxvbmxhdCkgPyAnbm9uZScgOiBudWxsO1xuICAgIH1cblxuICAgIGZvcihrIGluIHRoaXMuYmFzZVBhdGhzKSB7XG4gICAgICAgIHRoaXMuYmFzZVBhdGhzW2tdLmF0dHIoJ2QnLCBwYXRoRm4pO1xuICAgIH1cblxuICAgIGZvcihrIGluIHRoaXMuZGF0YVBhdGhzKSB7XG4gICAgICAgIHRoaXMuZGF0YVBhdGhzW2tdLmF0dHIoJ2QnLCBmdW5jdGlvbihkKSB7IHJldHVybiBwYXRoRm4oZC5nZW9qc29uKTsgfSk7XG4gICAgfVxuXG4gICAgZm9yKGsgaW4gdGhpcy5kYXRhUG9pbnRzKSB7XG4gICAgICAgIHRoaXMuZGF0YVBvaW50c1trXVxuICAgICAgICAgICAgLmF0dHIoJ2Rpc3BsYXknLCBoaWRlU2hvd1BvaW50cylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCB0cmFuc2xhdGVQb2ludHMpO1xuICAgIH1cbn07XG5cbi8vIEhlbHBlciB0aGF0IHdyYXBzIGQzLmdlb1svKiBwcm9qZWN0aW9uIG5hbWUgLypdKCkgd2hpY2g6XG4vL1xuLy8gLSBhZGRzICdmaXRFeHRlbnQnIChhdmFpbGFibGUgaW4gZDMgdjQpXG4vLyAtIGFkZHMgJ2dldFBhdGgnLCAnZ2V0Qm91bmRzJyBjb252ZW5pZW5jZSBtZXRob2RzXG4vLyAtIHNjb3BlcyBsb2dpYyByZWxhdGVkIHRvICdjbGlwQW5nbGUnXG4vLyAtIGFkZHMgJ2lzTG9uTGF0T3ZlckVkZ2VzJyBtZXRob2Rcbi8vIC0gc2V0cyBwcm9qZWN0aW9uIHByZWNpc2lvblxuLy8gLSBzZXRzIG1ldGhvZHMgdGhhdCBhcmVuJ3QgYWx3YXlzIGRlZmluZWQgZGVwZW5kaW5nXG4vLyAgIG9uIHRoZSBwcm9qZWN0aW9uIHR5cGUgdG8gYSBkdW1teSAnZDMtZXNxdWUnIGZ1bmN0aW9uLFxuLy9cbi8vIFRoaXMgd3JhcHBlciBhbGxldmlhdGVzIHN1YnNlcXVlbnQgY29kZSBvZiAobWFueSkgYW5ub3lpbmcgaWYtc3RhdGVtZW50cy5cbmZ1bmN0aW9uIGdldFByb2plY3Rpb24oZ2VvTGF5b3V0KSB7XG4gICAgdmFyIHByb2pMYXlvdXQgPSBnZW9MYXlvdXQucHJvamVjdGlvbjtcbiAgICB2YXIgcHJvalR5cGUgPSBwcm9qTGF5b3V0LnR5cGU7XG5cbiAgICB2YXIgcHJvamVjdGlvbiA9IGQzLmdlb1tjb25zdGFudHMucHJvak5hbWVzW3Byb2pUeXBlXV0oKTtcblxuICAgIHZhciBjbGlwQW5nbGUgPSBnZW9MYXlvdXQuX2lzQ2xpcHBlZCA/XG4gICAgICAgIGNvbnN0YW50cy5sb25heGlzU3Bhbltwcm9qVHlwZV0gLyAyIDpcbiAgICAgICAgbnVsbDtcblxuICAgIHZhciBtZXRob2RzID0gWydjZW50ZXInLCAncm90YXRlJywgJ3BhcmFsbGVscycsICdjbGlwRXh0ZW50J107XG4gICAgdmFyIGR1bW15Rm4gPSBmdW5jdGlvbihfKSB7IHJldHVybiBfID8gcHJvamVjdGlvbiA6IFtdOyB9O1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IG1ldGhvZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG0gPSBtZXRob2RzW2ldO1xuICAgICAgICBpZih0eXBlb2YgcHJvamVjdGlvblttXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcHJvamVjdGlvblttXSA9IGR1bW15Rm47XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9qZWN0aW9uLmlzTG9uTGF0T3ZlckVkZ2VzID0gZnVuY3Rpb24obG9ubGF0KSB7XG4gICAgICAgIGlmKHByb2plY3Rpb24obG9ubGF0KSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihjbGlwQW5nbGUpIHtcbiAgICAgICAgICAgIHZhciByID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcbiAgICAgICAgICAgIHZhciBhbmdsZSA9IGQzLmdlby5kaXN0YW5jZShsb25sYXQsIFstclswXSwgLXJbMV1dKTtcbiAgICAgICAgICAgIHZhciBtYXhBbmdsZSA9IGNsaXBBbmdsZSAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgICAgICByZXR1cm4gYW5nbGUgPiBtYXhBbmdsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcm9qZWN0aW9uLmdldFBhdGggPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGQzLmdlby5wYXRoKCkucHJvamVjdGlvbihwcm9qZWN0aW9uKTtcbiAgICB9O1xuXG4gICAgcHJvamVjdGlvbi5nZXRCb3VuZHMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICAgICAgcmV0dXJuIHByb2plY3Rpb24uZ2V0UGF0aCgpLmJvdW5kcyhvYmplY3QpO1xuICAgIH07XG5cbiAgICAvLyBhZGFwdGVkIGZyb20gZDMgdjQ6XG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWdlby9ibG9iL21hc3Rlci9zcmMvcHJvamVjdGlvbi9maXQuanNcbiAgICBwcm9qZWN0aW9uLmZpdEV4dGVudCA9IGZ1bmN0aW9uKGV4dGVudCwgb2JqZWN0KSB7XG4gICAgICAgIHZhciB3ID0gZXh0ZW50WzFdWzBdIC0gZXh0ZW50WzBdWzBdO1xuICAgICAgICB2YXIgaCA9IGV4dGVudFsxXVsxXSAtIGV4dGVudFswXVsxXTtcbiAgICAgICAgdmFyIGNsaXAgPSBwcm9qZWN0aW9uLmNsaXBFeHRlbnQgJiYgcHJvamVjdGlvbi5jbGlwRXh0ZW50KCk7XG5cbiAgICAgICAgcHJvamVjdGlvblxuICAgICAgICAgICAgLnNjYWxlKDE1MClcbiAgICAgICAgICAgIC50cmFuc2xhdGUoWzAsIDBdKTtcblxuICAgICAgICBpZihjbGlwKSBwcm9qZWN0aW9uLmNsaXBFeHRlbnQobnVsbCk7XG5cbiAgICAgICAgdmFyIGIgPSBwcm9qZWN0aW9uLmdldEJvdW5kcyhvYmplY3QpO1xuICAgICAgICB2YXIgayA9IE1hdGgubWluKHcgLyAoYlsxXVswXSAtIGJbMF1bMF0pLCBoIC8gKGJbMV1bMV0gLSBiWzBdWzFdKSk7XG4gICAgICAgIHZhciB4ID0gK2V4dGVudFswXVswXSArICh3IC0gayAqIChiWzFdWzBdICsgYlswXVswXSkpIC8gMjtcbiAgICAgICAgdmFyIHkgPSArZXh0ZW50WzBdWzFdICsgKGggLSBrICogKGJbMV1bMV0gKyBiWzBdWzFdKSkgLyAyO1xuXG4gICAgICAgIGlmKGNsaXApIHByb2plY3Rpb24uY2xpcEV4dGVudChjbGlwKTtcblxuICAgICAgICByZXR1cm4gcHJvamVjdGlvblxuICAgICAgICAgICAgLnNjYWxlKGsgKiAxNTApXG4gICAgICAgICAgICAudHJhbnNsYXRlKFt4LCB5XSk7XG4gICAgfTtcblxuICAgIHByb2plY3Rpb24ucHJlY2lzaW9uKGNvbnN0YW50cy5wcmVjaXNpb24pO1xuXG4gICAgaWYoY2xpcEFuZ2xlKSB7XG4gICAgICAgIHByb2plY3Rpb24uY2xpcEFuZ2xlKGNsaXBBbmdsZSAtIGNvbnN0YW50cy5jbGlwUGFkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvamVjdGlvbjtcbn1cblxuZnVuY3Rpb24gbWFrZUdyYXRpY3VsZShheGlzTmFtZSwgZ2VvTGF5b3V0LCBmdWxsTGF5b3V0KSB7XG4gICAgLy8gZXF1aXZhbGVudCB0byB0aGUgZDMgXCLOtVwiXG4gICAgdmFyIGVwc2lsb24gPSAxZS02O1xuICAgIC8vIHNhbWUgYXMgdGhlIGdlb0dyYXRpY3VsZSBkZWZhdWx0XG4gICAgdmFyIHByZWNpc2lvbiA9IDIuNTtcblxuICAgIHZhciBheExheW91dCA9IGdlb0xheW91dFtheGlzTmFtZV07XG4gICAgdmFyIHNjb3BlRGVmYXVsdHMgPSBjb25zdGFudHMuc2NvcGVEZWZhdWx0c1tnZW9MYXlvdXQuc2NvcGVdO1xuICAgIHZhciBybmc7XG4gICAgdmFyIG9wcFJuZztcbiAgICB2YXIgY29vcmRGbjtcblxuICAgIGlmKGF4aXNOYW1lID09PSAnbG9uYXhpcycpIHtcbiAgICAgICAgcm5nID0gc2NvcGVEZWZhdWx0cy5sb25heGlzUmFuZ2U7XG4gICAgICAgIG9wcFJuZyA9IHNjb3BlRGVmYXVsdHMubGF0YXhpc1JhbmdlO1xuICAgICAgICBjb29yZEZuID0gZnVuY3Rpb24odiwgbCkgeyByZXR1cm4gW3YsIGxdOyB9O1xuICAgIH0gZWxzZSBpZihheGlzTmFtZSA9PT0gJ2xhdGF4aXMnKSB7XG4gICAgICAgIHJuZyA9IHNjb3BlRGVmYXVsdHMubGF0YXhpc1JhbmdlO1xuICAgICAgICBvcHBSbmcgPSBzY29wZURlZmF1bHRzLmxvbmF4aXNSYW5nZTtcbiAgICAgICAgY29vcmRGbiA9IGZ1bmN0aW9uKHYsIGwpIHsgcmV0dXJuIFtsLCB2XTsgfTtcbiAgICB9XG5cbiAgICB2YXIgZHVtbXlBeCA9IHtcbiAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgIHJhbmdlOiBbcm5nWzBdLCBybmdbMV0gLSBlcHNpbG9uXSxcbiAgICAgICAgdGljazA6IGF4TGF5b3V0LnRpY2swLFxuICAgICAgICBkdGljazogYXhMYXlvdXQuZHRpY2tcbiAgICB9O1xuXG4gICAgQXhlcy5zZXRDb252ZXJ0KGR1bW15QXgsIGZ1bGxMYXlvdXQpO1xuICAgIHZhciB2YWxzID0gQXhlcy5jYWxjVGlja3MoZHVtbXlBeCk7XG5cbiAgICAvLyByZW1vdmUgZHVwbGljYXRlIG9uIGFudGltZXJpZGlhblxuICAgIGlmKCFnZW9MYXlvdXQuaXNTY29wZWQgJiYgYXhpc05hbWUgPT09ICdsb25heGlzJykge1xuICAgICAgICB2YWxzLnBvcCgpO1xuICAgIH1cblxuICAgIHZhciBsZW4gPSB2YWxzLmxlbmd0aDtcbiAgICB2YXIgY29vcmRzID0gbmV3IEFycmF5KGxlbik7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgdmFyIHYgPSB2YWxzW2ldLng7XG4gICAgICAgIHZhciBsaW5lID0gY29vcmRzW2ldID0gW107XG4gICAgICAgIGZvcih2YXIgbCA9IG9wcFJuZ1swXTsgbCA8IG9wcFJuZ1sxXSArIHByZWNpc2lvbjsgbCArPSBwcmVjaXNpb24pIHtcbiAgICAgICAgICAgIGxpbmUucHVzaChjb29yZEZuKHYsIGwpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHR5cGU6ICdNdWx0aUxpbmVTdHJpbmcnLFxuICAgICAgICBjb29yZGluYXRlczogY29vcmRzXG4gICAgfTtcbn1cblxuLy8gUmV0dXJucyBwb2x5Z29uIEdlb0pTT04gY29ycmVzcG9uZGluZyB0byBsb24vbGF0IHJhbmdlIGJveFxuLy8gd2l0aCB3ZWxsLWRlZmluZWQgZGlyZWN0aW9uXG4vL1xuLy8gTm90ZSB0aGF0IGNsaXBQYWQgcGFkZGluZyBpcyBhZGRlZCBhcm91bmQgcmFuZ2UgdG8gYXZvaWQgYWxpYXNpbmcuXG5mdW5jdGlvbiBtYWtlUmFuZ2VCb3gobG9uLCBsYXQpIHtcbiAgICB2YXIgY2xpcFBhZCA9IGNvbnN0YW50cy5jbGlwUGFkO1xuICAgIHZhciBsb24wID0gbG9uWzBdICsgY2xpcFBhZDtcbiAgICB2YXIgbG9uMSA9IGxvblsxXSAtIGNsaXBQYWQ7XG4gICAgdmFyIGxhdDAgPSBsYXRbMF0gKyBjbGlwUGFkO1xuICAgIHZhciBsYXQxID0gbGF0WzFdIC0gY2xpcFBhZDtcblxuICAgIC8vIHRvIGNyb3NzIGFudGltZXJpZGlhbiB3L28gYW1iaWd1aXR5XG4gICAgaWYobG9uMCA+IDAgJiYgbG9uMSA8IDApIGxvbjEgKz0gMzYwO1xuXG4gICAgdmFyIGRsb240ID0gKGxvbjEgLSBsb24wKSAvIDQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiAnUG9seWdvbicsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbW1xuICAgICAgICAgICAgW2xvbjAsIGxhdDBdLFxuICAgICAgICAgICAgW2xvbjAsIGxhdDFdLFxuICAgICAgICAgICAgW2xvbjAgKyBkbG9uNCwgbGF0MV0sXG4gICAgICAgICAgICBbbG9uMCArIDIgKiBkbG9uNCwgbGF0MV0sXG4gICAgICAgICAgICBbbG9uMCArIDMgKiBkbG9uNCwgbGF0MV0sXG4gICAgICAgICAgICBbbG9uMSwgbGF0MV0sXG4gICAgICAgICAgICBbbG9uMSwgbGF0MF0sXG4gICAgICAgICAgICBbbG9uMSAtIGRsb240LCBsYXQwXSxcbiAgICAgICAgICAgIFtsb24xIC0gMiAqIGRsb240LCBsYXQwXSxcbiAgICAgICAgICAgIFtsb24xIC0gMyAqIGRsb240LCBsYXQwXSxcbiAgICAgICAgICAgIFtsb24wLCBsYXQwXVxuICAgICAgICBdXVxuICAgIH07XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBnZXRTdWJwbG90Q2FsY0RhdGEgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9nZXRfZGF0YScpLmdldFN1YnBsb3RDYWxjRGF0YTtcbnZhciBjb3VudGVyUmVnZXggPSByZXF1aXJlKCcuLi8uLi9saWInKS5jb3VudGVyUmVnZXg7XG5cbnZhciBjcmVhdGVHZW8gPSByZXF1aXJlKCcuL2dlbycpO1xuXG52YXIgR0VPID0gJ2dlbyc7XG52YXIgY291bnRlciA9IGNvdW50ZXJSZWdleChHRU8pO1xuXG52YXIgYXR0cmlidXRlcyA9IHt9O1xuYXR0cmlidXRlc1tHRU9dID0ge1xuICAgIHZhbFR5cGU6ICdzdWJwbG90aWQnLFxuICAgIHJvbGU6ICdpbmZvJyxcbiAgICBkZmx0OiBHRU8sXG4gICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAnU2V0cyBhIHJlZmVyZW5jZSBiZXR3ZWVuIHRoaXMgdHJhY2VcXCdzIGdlb3NwYXRpYWwgY29vcmRpbmF0ZXMgYW5kJyxcbiAgICAgICAgJ2EgZ2VvZ3JhcGhpYyBtYXAuJyxcbiAgICAgICAgJ0lmICpnZW8qICh0aGUgZGVmYXVsdCB2YWx1ZSksIHRoZSBnZW9zcGF0aWFsIGNvb3JkaW5hdGVzIHJlZmVyIHRvJyxcbiAgICAgICAgJ2BsYXlvdXQuZ2VvYC4nLFxuICAgICAgICAnSWYgKmdlbzIqLCB0aGUgZ2Vvc3BhdGlhbCBjb29yZGluYXRlcyByZWZlciB0byBgbGF5b3V0LmdlbzJgLCcsXG4gICAgICAgICdhbmQgc28gb24uJ1xuICAgIF0uam9pbignICcpXG59O1xuXG5mdW5jdGlvbiBwbG90R2VvKGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgY2FsY0RhdGEgPSBnZC5jYWxjZGF0YTtcbiAgICB2YXIgZ2VvSWRzID0gZnVsbExheW91dC5fc3VicGxvdHNbR0VPXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBnZW9JZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGdlb0lkID0gZ2VvSWRzW2ldO1xuICAgICAgICB2YXIgZ2VvQ2FsY0RhdGEgPSBnZXRTdWJwbG90Q2FsY0RhdGEoY2FsY0RhdGEsIEdFTywgZ2VvSWQpO1xuICAgICAgICB2YXIgZ2VvTGF5b3V0ID0gZnVsbExheW91dFtnZW9JZF07XG4gICAgICAgIHZhciBnZW8gPSBnZW9MYXlvdXQuX3N1YnBsb3Q7XG5cbiAgICAgICAgaWYoIWdlbykge1xuICAgICAgICAgICAgZ2VvID0gY3JlYXRlR2VvKHtcbiAgICAgICAgICAgICAgICBpZDogZ2VvSWQsXG4gICAgICAgICAgICAgICAgZ3JhcGhEaXY6IGdkLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogZnVsbExheW91dC5fZ2VvbGF5ZXIubm9kZSgpLFxuICAgICAgICAgICAgICAgIHRvcG9qc29uVVJMOiBnZC5fY29udGV4dC50b3BvanNvblVSTCxcbiAgICAgICAgICAgICAgICBzdGF0aWNQbG90OiBnZC5fY29udGV4dC5zdGF0aWNQbG90XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZnVsbExheW91dFtnZW9JZF0uX3N1YnBsb3QgPSBnZW87XG4gICAgICAgIH1cblxuICAgICAgICBnZW8ucGxvdChnZW9DYWxjRGF0YSwgZnVsbExheW91dCwgZ2QuX3Byb21pc2VzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFuKG5ld0Z1bGxEYXRhLCBuZXdGdWxsTGF5b3V0LCBvbGRGdWxsRGF0YSwgb2xkRnVsbExheW91dCkge1xuICAgIHZhciBvbGRHZW9LZXlzID0gb2xkRnVsbExheW91dC5fc3VicGxvdHNbR0VPXSB8fCBbXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBvbGRHZW9LZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBvbGRHZW9LZXkgPSBvbGRHZW9LZXlzW2ldO1xuICAgICAgICB2YXIgb2xkR2VvID0gb2xkRnVsbExheW91dFtvbGRHZW9LZXldLl9zdWJwbG90O1xuXG4gICAgICAgIGlmKCFuZXdGdWxsTGF5b3V0W29sZEdlb0tleV0gJiYgISFvbGRHZW8pIHtcbiAgICAgICAgICAgIG9sZEdlby5mcmFtZXdvcmsucmVtb3ZlKCk7XG4gICAgICAgICAgICBvbGRHZW8uY2xpcERlZi5yZW1vdmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlRngoZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBzdWJwbG90SWRzID0gZnVsbExheW91dC5fc3VicGxvdHNbR0VPXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBzdWJwbG90SWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzdWJwbG90TGF5b3V0ID0gZnVsbExheW91dFtzdWJwbG90SWRzW2ldXTtcbiAgICAgICAgdmFyIHN1YnBsb3RPYmogPSBzdWJwbG90TGF5b3V0Ll9zdWJwbG90O1xuICAgICAgICBzdWJwbG90T2JqLnVwZGF0ZUZ4KGZ1bGxMYXlvdXQsIHN1YnBsb3RMYXlvdXQpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXR0cjogR0VPLFxuICAgIG5hbWU6IEdFTyxcbiAgICBpZFJvb3Q6IEdFTyxcbiAgICBpZFJlZ2V4OiBjb3VudGVyLFxuICAgIGF0dHJSZWdleDogY291bnRlcixcbiAgICBhdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlMYXlvdXREZWZhdWx0czogcmVxdWlyZSgnLi9sYXlvdXRfZGVmYXVsdHMnKSxcbiAgICBwbG90OiBwbG90R2VvLFxuICAgIHVwZGF0ZUZ4OiB1cGRhdGVGeCxcbiAgICBjbGVhbjogY2xlYW5cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjb2xvckF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvci9hdHRyaWJ1dGVzJyk7XG52YXIgZG9tYWluQXR0cnMgPSByZXF1aXJlKCcuLi9kb21haW4nKS5hdHRyaWJ1dGVzO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgb3ZlcnJpZGVBbGwgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9lZGl0X3R5cGVzJykub3ZlcnJpZGVBbGw7XG5cbnZhciBnZW9BeGVzQXR0cnMgPSB7XG4gICAgcmFuZ2U6IHtcbiAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7dmFsVHlwZTogJ251bWJlcid9LFxuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInfVxuICAgICAgICBdLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHJhbmdlIG9mIHRoaXMgYXhpcyAoaW4gZGVncmVlcyksJyxcbiAgICAgICAgICAgICdzZXRzIHRoZSBtYXBcXCdzIGNsaXBwZWQgY29vcmRpbmF0ZXMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgc2hvd2dyaWQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgd2hldGhlciBvciBub3QgZ3JhdGljdWxlIGFyZSBzaG93biBvbiB0aGUgbWFwLidcbiAgICB9LFxuICAgIHRpY2swOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6IDAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgZ3JhdGljdWxlXFwncyBzdGFydGluZyB0aWNrIGxvbmdpdHVkZS9sYXRpdHVkZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBkdGljazoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGdyYXRpY3VsZVxcJ3MgbG9uZ2l0dWRlL2xhdGl0dWRlIHRpY2sgc3RlcC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBncmlkY29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGZsdDogY29sb3JBdHRycy5saWdodExpbmUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgZ3JhdGljdWxlXFwncyBzdHJva2UgY29sb3IuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgZ3JpZHdpZHRoOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgZ3JhdGljdWxlXFwncyBzdHJva2Ugd2lkdGggKGluIHB4KS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcblxudmFyIGF0dHJzID0gbW9kdWxlLmV4cG9ydHMgPSBvdmVycmlkZUFsbCh7XG4gICAgZG9tYWluOiBkb21haW5BdHRycyh7bmFtZTogJ2dlbyd9LCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnTm90ZSB0aGF0IGdlbyBzdWJwbG90cyBhcmUgY29uc3RyYWluZWQgYnkgZG9tYWluLicsXG4gICAgICAgICAgICAnSW4gZ2VuZXJhbCwgd2hlbiBgcHJvamVjdGlvbi5zY2FsZWAgaXMgc2V0IHRvIDEuJyxcbiAgICAgICAgICAgICdhIG1hcCB3aWxsIGZpdCBlaXRoZXIgaXRzIHggb3IgeSBkb21haW4sIGJ1dCBub3QgYm90aC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG5cbiAgICBmaXRib3VuZHM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFtmYWxzZSwgJ2xvY2F0aW9ucycsICdnZW9qc29uJ10sXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyBpZiB0aGlzIHN1YnBsb3RcXCdzIHZpZXcgc2V0dGluZ3MgYXJlIGF1dG8tY29tcHV0ZWQgdG8gZml0IHRyYWNlIGRhdGEuJyxcblxuICAgICAgICAgICAgJ09uIHNjb3BlZCBtYXBzLCBzZXR0aW5nIGBmaXRib3VuZHNgIGxlYWRzIHRvIGBjZW50ZXIubG9uYCBhbmQgYGNlbnRlci5sYXRgIGdldHRpbmcgYXV0by1maWxsZWQuJyxcblxuICAgICAgICAgICAgJ09uIG1hcHMgd2l0aCBhIG5vbi1jbGlwcGVkIHByb2plY3Rpb24sIHNldHRpbmcgYGZpdGJvdW5kc2AgbGVhZHMgdG8gYGNlbnRlci5sb25gLCBgY2VudGVyLmxhdGAsJyxcbiAgICAgICAgICAgICdhbmQgYHByb2plY3Rpb24ucm90YXRpb24ubG9uYCBnZXR0aW5nIGF1dG8tZmlsbGVkLicsXG5cbiAgICAgICAgICAgICdPbiBtYXBzIHdpdGggYSBjbGlwcGVkIHByb2plY3Rpb24sIHNldHRpbmcgYGZpdGJvdW5kc2AgbGVhZHMgdG8gYGNlbnRlci5sb25gLCBgY2VudGVyLmxhdGAsJyxcbiAgICAgICAgICAgICdgcHJvamVjdGlvbi5yb3RhdGlvbi5sb25gLCBgcHJvamVjdGlvbi5yb3RhdGlvbi5sYXRgLCBgbG9uYXhpcy5yYW5nZWAgYW5kIGBsb25heGlzLnJhbmdlYCcsXG4gICAgICAgICAgICAnZ2V0dGluZyBhdXRvLWZpbGxlZC4nLFxuXG4gICAgICAgICAgICAvLyBUT0RPIHdlIHNob3VsZCBhdXRvLWZpbGwgYHByb2plY3Rpb24ucGFyYWxsZWxzYCBmb3IgbWFwc1xuICAgICAgICAgICAgLy8gd2l0aCBjb25pYyBwcm9qZWN0aW9uLCBidXQgaG93P1xuXG4gICAgICAgICAgICAnSWYgKmxvY2F0aW9ucyosIG9ubHkgdGhlIHRyYWNlXFwncyB2aXNpYmxlIGxvY2F0aW9ucyBhcmUgY29uc2lkZXJlZCBpbiB0aGUgYGZpdGJvdW5kc2AgY29tcHV0YXRpb25zLicsXG4gICAgICAgICAgICAnSWYgKmdlb2pzb24qLCB0aGUgZW50aXJlIHRyYWNlIGlucHV0IGBnZW9qc29uYCAoaWYgcHJvdmlkZWQpIGlzIGNvbnNpZGVyZWQgaW4gdGhlIGBmaXRib3VuZHNgIGNvbXB1dGF0aW9ucywnLFxuICAgICAgICAgICAgJ0RlZmF1bHRzIHRvICpmYWxzZSouJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICByZXNvbHV0aW9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbMTEwLCA1MF0sXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogMTEwLFxuICAgICAgICBjb2VyY2VOdW1iZXI6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgcmVzb2x1dGlvbiBvZiB0aGUgYmFzZSBsYXllcnMuJyxcbiAgICAgICAgICAgICdUaGUgdmFsdWVzIGhhdmUgdW5pdHMgb2Yga20vbW0nLFxuICAgICAgICAgICAgJ2UuZy4gMTEwIGNvcnJlc3BvbmRzIHRvIGEgc2NhbGUgcmF0aW8gb2YgMToxMTAsMDAwLDAwMC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBzY29wZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgdmFsdWVzOiBPYmplY3Qua2V5cyhjb25zdGFudHMuc2NvcGVEZWZhdWx0cyksXG4gICAgICAgIGRmbHQ6ICd3b3JsZCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0IHRoZSBzY29wZSBvZiB0aGUgbWFwLidcbiAgICB9LFxuICAgIHByb2plY3Rpb246IHtcbiAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgdmFsdWVzOiBPYmplY3Qua2V5cyhjb25zdGFudHMucHJvak5hbWVzKSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgcHJvamVjdGlvbiB0eXBlLidcbiAgICAgICAgfSxcbiAgICAgICAgcm90YXRpb246IHtcbiAgICAgICAgICAgIGxvbjoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICAgICAnUm90YXRlcyB0aGUgbWFwIGFsb25nIHBhcmFsbGVscycsXG4gICAgICAgICAgICAgICAgICAgICcoaW4gZGVncmVlcyBFYXN0KS4nLFxuICAgICAgICAgICAgICAgICAgICAnRGVmYXVsdHMgdG8gdGhlIGNlbnRlciBvZiB0aGUgYGxvbmF4aXMucmFuZ2VgIHZhbHVlcy4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYXQ6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1JvdGF0ZXMgdGhlIG1hcCBhbG9uZyBtZXJpZGlhbnMnLFxuICAgICAgICAgICAgICAgICAgICAnKGluIGRlZ3JlZXMgTm9ydGgpLidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJvbGw6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1JvbGwgdGhlIG1hcCAoaW4gZGVncmVlcyknLFxuICAgICAgICAgICAgICAgICAgICAnRm9yIGV4YW1wbGUsIGEgcm9sbCBvZiAqMTgwKiBtYWtlcyB0aGUgbWFwIGFwcGVhciB1cHNpZGUgZG93bi4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgcGFyYWxsZWxzOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW5mb19hcnJheScsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgICAgIHt2YWxUeXBlOiAnbnVtYmVyJ30sXG4gICAgICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInfVxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0ZvciBjb25pYyBwcm9qZWN0aW9uIHR5cGVzIG9ubHkuJyxcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgcGFyYWxsZWxzICh0YW5nZW50LCBzZWNhbnQpJyxcbiAgICAgICAgICAgICAgICAnd2hlcmUgdGhlIGNvbmUgaW50ZXJzZWN0cyB0aGUgc3BoZXJlLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHNjYWxlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDEsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdab29tcyBpbiBvciBvdXQgb24gdGhlIG1hcCB2aWV3LicsXG4gICAgICAgICAgICAgICAgJ0Egc2NhbGUgb2YgKjEqIGNvcnJlc3BvbmRzIHRvIHRoZSBsYXJnZXN0IHpvb20gbGV2ZWwnLFxuICAgICAgICAgICAgICAgICd0aGF0IGZpdHMgdGhlIG1hcFxcJ3MgbG9uIGFuZCBsYXQgcmFuZ2VzLiAnXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgIH0sXG4gICAgY2VudGVyOiB7XG4gICAgICAgIGxvbjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBsb25naXR1ZGUgb2YgdGhlIG1hcFxcJ3MgY2VudGVyLicsXG4gICAgICAgICAgICAgICAgJ0J5IGRlZmF1bHQsIHRoZSBtYXBcXCdzIGxvbmdpdHVkZSBjZW50ZXIgbGllcyBhdCB0aGUgbWlkZGxlIG9mIHRoZSBsb25naXR1ZGUgcmFuZ2UnLFxuICAgICAgICAgICAgICAgICdmb3Igc2NvcGVkIHByb2plY3Rpb24gYW5kIGFib3ZlIGBwcm9qZWN0aW9uLnJvdGF0aW9uLmxvbmAgb3RoZXJ3aXNlLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGxhdDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBsYXRpdHVkZSBvZiB0aGUgbWFwXFwncyBjZW50ZXIuJyxcbiAgICAgICAgICAgICAgICAnRm9yIGFsbCBwcm9qZWN0aW9uIHR5cGVzLCB0aGUgbWFwXFwncyBsYXRpdHVkZSBjZW50ZXIgbGllcycsXG4gICAgICAgICAgICAgICAgJ2F0IHRoZSBtaWRkbGUgb2YgdGhlIGxhdGl0dWRlIHJhbmdlIGJ5IGRlZmF1bHQuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdmlzaWJsZToge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBkZWZhdWx0IHZpc2liaWxpdHkgb2YgdGhlIGJhc2UgbGF5ZXJzLidcbiAgICB9LFxuICAgIHNob3djb2FzdGxpbmVzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgd2hldGhlciBvciBub3QgdGhlIGNvYXN0bGluZXMgYXJlIGRyYXduLidcbiAgICB9LFxuICAgIGNvYXN0bGluZWNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRmbHQ6IGNvbG9yQXR0cnMuZGVmYXVsdExpbmUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29hc3RsaW5lIGNvbG9yLidcbiAgICB9LFxuICAgIGNvYXN0bGluZXdpZHRoOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29hc3RsaW5lIHN0cm9rZSB3aWR0aCAoaW4gcHgpLidcbiAgICB9LFxuICAgIHNob3dsYW5kOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHdoZXRoZXIgb3Igbm90IGxhbmQgbWFzc2VzIGFyZSBmaWxsZWQgaW4gY29sb3IuJ1xuICAgIH0sXG4gICAgbGFuZGNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRmbHQ6IGNvbnN0YW50cy5sYW5kQ29sb3IsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgbGFuZCBtYXNzIGNvbG9yLidcbiAgICB9LFxuICAgIHNob3dvY2Vhbjoge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogZmFsc2UsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB3aGV0aGVyIG9yIG5vdCBvY2VhbnMgYXJlIGZpbGxlZCBpbiBjb2xvci4nXG4gICAgfSxcbiAgICBvY2VhbmNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRmbHQ6IGNvbnN0YW50cy53YXRlckNvbG9yLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIG9jZWFuIGNvbG9yJ1xuICAgIH0sXG4gICAgc2hvd2xha2VzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHdoZXRoZXIgb3Igbm90IGxha2VzIGFyZSBkcmF3bi4nXG4gICAgfSxcbiAgICBsYWtlY29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGZsdDogY29uc3RhbnRzLndhdGVyQ29sb3IsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29sb3Igb2YgdGhlIGxha2VzLidcbiAgICB9LFxuICAgIHNob3dyaXZlcnM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgd2hldGhlciBvciBub3Qgcml2ZXJzIGFyZSBkcmF3bi4nXG4gICAgfSxcbiAgICByaXZlcmNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRmbHQ6IGNvbnN0YW50cy53YXRlckNvbG9yLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgY29sb3Igb2YgdGhlIHJpdmVycy4nXG4gICAgfSxcbiAgICByaXZlcndpZHRoOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgc3Ryb2tlIHdpZHRoIChpbiBweCkgb2YgdGhlIHJpdmVycy4nXG4gICAgfSxcbiAgICBzaG93Y291bnRyaWVzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgd2hldGhlciBvciBub3QgY291bnRyeSBib3VuZGFyaWVzIGFyZSBkcmF3bi4nXG4gICAgfSxcbiAgICBjb3VudHJ5Y29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGZsdDogY29sb3JBdHRycy5kZWZhdWx0TGluZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIGxpbmUgY29sb3Igb2YgdGhlIGNvdW50cnkgYm91bmRhcmllcy4nXG4gICAgfSxcbiAgICBjb3VudHJ5d2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIGxpbmUgd2lkdGggKGluIHB4KSBvZiB0aGUgY291bnRyeSBib3VuZGFyaWVzLidcbiAgICB9LFxuICAgIHNob3dzdWJ1bml0czoge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHdoZXRoZXIgb3Igbm90IGJvdW5kYXJpZXMgb2Ygc3VidW5pdHMgd2l0aGluIGNvdW50cmllcycsXG4gICAgICAgICAgICAnKGUuZy4gc3RhdGVzLCBwcm92aW5jZXMpIGFyZSBkcmF3bi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBzdWJ1bml0Y29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGZsdDogY29sb3JBdHRycy5kZWZhdWx0TGluZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgc3VidW5pdHMgYm91bmRhcmllcy4nXG4gICAgfSxcbiAgICBzdWJ1bml0d2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBzdHJva2Ugd2lkdGggKGluIHB4KSBvZiB0aGUgc3VidW5pdHMgYm91bmRhcmllcy4nXG4gICAgfSxcbiAgICBzaG93ZnJhbWU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB3aGV0aGVyIG9yIG5vdCBhIGZyYW1lIGlzIGRyYXduIGFyb3VuZCB0aGUgbWFwLidcbiAgICB9LFxuICAgIGZyYW1lY29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGZsdDogY29sb3JBdHRycy5kZWZhdWx0TGluZSxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBjb2xvciB0aGUgZnJhbWUuJ1xuICAgIH0sXG4gICAgZnJhbWV3aWR0aDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBkZmx0OiAxLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHN0cm9rZSB3aWR0aCAoaW4gcHgpIG9mIHRoZSBmcmFtZS4nXG4gICAgfSxcbiAgICBiZ2NvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGRmbHQ6IGNvbG9yQXR0cnMuYmFja2dyb3VuZCxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXQgdGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1hcCdcbiAgICB9LFxuICAgIGxvbmF4aXM6IGdlb0F4ZXNBdHRycyxcbiAgICBsYXRheGlzOiBnZW9BeGVzQXR0cnNcbn0sICdwbG90JywgJ2Zyb20tcm9vdCcpO1xuXG4vLyBzZXQgdWlyZXZpc2lvbiBvdXRzaWRlIG9mIG92ZXJyaWRlQWxsIHNvIGl0IGNhbiBiZSBgZWRpdFR5cGU6ICdub25lJ2BcbmF0dHJzLnVpcmV2aXNpb24gPSB7XG4gICAgdmFsVHlwZTogJ2FueScsXG4gICAgcm9sZTogJ2luZm8nLFxuICAgIGVkaXRUeXBlOiAnbm9uZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgJ0NvbnRyb2xzIHBlcnNpc3RlbmNlIG9mIHVzZXItZHJpdmVuIGNoYW5nZXMgaW4gdGhlIHZpZXcnLFxuICAgICAgICAnKHByb2plY3Rpb24gYW5kIGNlbnRlcikuIERlZmF1bHRzIHRvIGBsYXlvdXQudWlyZXZpc2lvbmAuJ1xuICAgIF0uam9pbignICcpXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgaGFuZGxlU3VicGxvdERlZmF1bHRzID0gcmVxdWlyZSgnLi4vc3VicGxvdF9kZWZhdWx0cycpO1xudmFyIGdldFN1YnBsb3REYXRhID0gcmVxdWlyZSgnLi4vZ2V0X2RhdGEnKS5nZXRTdWJwbG90RGF0YTtcblxudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgbGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxudmFyIGF4ZXNOYW1lcyA9IGNvbnN0YW50cy5heGVzTmFtZXM7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5TGF5b3V0RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEpIHtcbiAgICBoYW5kbGVTdWJwbG90RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEsIHtcbiAgICAgICAgdHlwZTogJ2dlbycsXG4gICAgICAgIGF0dHJpYnV0ZXM6IGxheW91dEF0dHJpYnV0ZXMsXG4gICAgICAgIGhhbmRsZURlZmF1bHRzOiBoYW5kbGVHZW9EZWZhdWx0cyxcbiAgICAgICAgZnVsbERhdGE6IGZ1bGxEYXRhLFxuICAgICAgICBwYXJ0aXRpb246ICd5J1xuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gaGFuZGxlR2VvRGVmYXVsdHMoZ2VvTGF5b3V0SW4sIGdlb0xheW91dE91dCwgY29lcmNlLCBvcHRzKSB7XG4gICAgdmFyIHN1YnBsb3REYXRhID0gZ2V0U3VicGxvdERhdGEob3B0cy5mdWxsRGF0YSwgJ2dlbycsIG9wdHMuaWQpO1xuICAgIHZhciB0cmFjZUluZGljZXMgPSBzdWJwbG90RGF0YS5tYXAoZnVuY3Rpb24odCkgeyByZXR1cm4gdC5fZXhwYW5kZWRJbmRleDsgfSk7XG5cbiAgICB2YXIgcmVzb2x1dGlvbiA9IGNvZXJjZSgncmVzb2x1dGlvbicpO1xuICAgIHZhciBzY29wZSA9IGNvZXJjZSgnc2NvcGUnKTtcbiAgICB2YXIgc2NvcGVQYXJhbXMgPSBjb25zdGFudHMuc2NvcGVEZWZhdWx0c1tzY29wZV07XG5cbiAgICB2YXIgcHJvalR5cGUgPSBjb2VyY2UoJ3Byb2plY3Rpb24udHlwZScsIHNjb3BlUGFyYW1zLnByb2pUeXBlKTtcbiAgICB2YXIgaXNBbGJlcnNVc2EgPSBnZW9MYXlvdXRPdXQuX2lzQWxiZXJzVXNhID0gcHJvalR5cGUgPT09ICdhbGJlcnMgdXNhJztcblxuICAgIC8vIG5vIG90aGVyIHNjb3BlcyBhcmUgYWxsb3dlZCBmb3IgJ2FsYmVycyB1c2EnIHByb2plY3Rpb25cbiAgICBpZihpc0FsYmVyc1VzYSkgc2NvcGUgPSBnZW9MYXlvdXRPdXQuc2NvcGUgPSAndXNhJztcblxuICAgIHZhciBpc1Njb3BlZCA9IGdlb0xheW91dE91dC5faXNTY29wZWQgPSAoc2NvcGUgIT09ICd3b3JsZCcpO1xuICAgIHZhciBpc0NvbmljID0gZ2VvTGF5b3V0T3V0Ll9pc0NvbmljID0gcHJvalR5cGUuaW5kZXhPZignY29uaWMnKSAhPT0gLTE7XG4gICAgdmFyIGlzQ2xpcHBlZCA9IGdlb0xheW91dE91dC5faXNDbGlwcGVkID0gISFjb25zdGFudHMubG9uYXhpc1NwYW5bcHJvalR5cGVdO1xuXG4gICAgaWYoZ2VvTGF5b3V0SW4udmlzaWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gc2hvdWxkIG92ZXJyaWRlIHRlbXBsYXRlLmxheW91dC5nZW8uc2hvdyogLSBzZWUgaXNzdWUgNDQ4MlxuXG4gICAgICAgIC8vIG1ha2UgYSBjb3B5XG4gICAgICAgIHZhciBuZXdUZW1wbGF0ZSA9IExpYi5leHRlbmREZWVwKHt9LCBnZW9MYXlvdXRPdXQuX3RlbXBsYXRlKTtcblxuICAgICAgICAvLyBvdmVycmlkZSBzaG93KlxuICAgICAgICBuZXdUZW1wbGF0ZS5zaG93Y29hc3RsaW5lcyA9IGZhbHNlO1xuICAgICAgICBuZXdUZW1wbGF0ZS5zaG93Y291bnRyaWVzID0gZmFsc2U7XG4gICAgICAgIG5ld1RlbXBsYXRlLnNob3dmcmFtZSA9IGZhbHNlO1xuICAgICAgICBuZXdUZW1wbGF0ZS5zaG93bGFrZXMgPSBmYWxzZTtcbiAgICAgICAgbmV3VGVtcGxhdGUuc2hvd2xhbmQgPSBmYWxzZTtcbiAgICAgICAgbmV3VGVtcGxhdGUuc2hvd29jZWFuID0gZmFsc2U7XG4gICAgICAgIG5ld1RlbXBsYXRlLnNob3dyaXZlcnMgPSBmYWxzZTtcbiAgICAgICAgbmV3VGVtcGxhdGUuc2hvd3N1YnVuaXRzID0gZmFsc2U7XG4gICAgICAgIGlmKG5ld1RlbXBsYXRlLmxvbmF4aXMpIG5ld1RlbXBsYXRlLmxvbmF4aXMuc2hvd2dyaWQgPSBmYWxzZTtcbiAgICAgICAgaWYobmV3VGVtcGxhdGUubGF0YXhpcykgbmV3VGVtcGxhdGUubGF0YXhpcy5zaG93Z3JpZCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHNldCByZWYgdG8gY29weVxuICAgICAgICBnZW9MYXlvdXRPdXQuX3RlbXBsYXRlID0gbmV3VGVtcGxhdGU7XG4gICAgfVxuICAgIHZhciB2aXNpYmxlID0gY29lcmNlKCd2aXNpYmxlJyk7XG5cbiAgICB2YXIgc2hvdztcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXhlc05hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBheGlzTmFtZSA9IGF4ZXNOYW1lc1tpXTtcbiAgICAgICAgdmFyIGR0aWNrRGZsdCA9IFszMCwgMTBdW2ldO1xuICAgICAgICB2YXIgcmFuZ2VEZmx0O1xuXG4gICAgICAgIGlmKGlzU2NvcGVkKSB7XG4gICAgICAgICAgICByYW5nZURmbHQgPSBzY29wZVBhcmFtc1theGlzTmFtZSArICdSYW5nZSddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGRmbHRTcGFucyA9IGNvbnN0YW50c1theGlzTmFtZSArICdTcGFuJ107XG4gICAgICAgICAgICB2YXIgaFNwYW4gPSAoZGZsdFNwYW5zW3Byb2pUeXBlXSB8fCBkZmx0U3BhbnNbJyonXSkgLyAyO1xuICAgICAgICAgICAgdmFyIHJvdCA9IGNvZXJjZShcbiAgICAgICAgICAgICAgICAncHJvamVjdGlvbi5yb3RhdGlvbi4nICsgYXhpc05hbWUuc3Vic3RyKDAsIDMpLFxuICAgICAgICAgICAgICAgIHNjb3BlUGFyYW1zLnByb2pSb3RhdGVbaV1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByYW5nZURmbHQgPSBbcm90IC0gaFNwYW4sIHJvdCArIGhTcGFuXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByYW5nZSA9IGNvZXJjZShheGlzTmFtZSArICcucmFuZ2UnLCByYW5nZURmbHQpO1xuICAgICAgICBjb2VyY2UoYXhpc05hbWUgKyAnLnRpY2swJyk7XG4gICAgICAgIGNvZXJjZShheGlzTmFtZSArICcuZHRpY2snLCBkdGlja0RmbHQpO1xuXG4gICAgICAgIHNob3cgPSBjb2VyY2UoYXhpc05hbWUgKyAnLnNob3dncmlkJywgIXZpc2libGUgPyBmYWxzZSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIGlmKHNob3cpIHtcbiAgICAgICAgICAgIGNvZXJjZShheGlzTmFtZSArICcuZ3JpZGNvbG9yJyk7XG4gICAgICAgICAgICBjb2VyY2UoYXhpc05hbWUgKyAnLmdyaWR3aWR0aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbW9jayBheGlzIGZvciBhdXRvcmFuZ2UgY29tcHV0YXRpb25zXG4gICAgICAgIGdlb0xheW91dE91dFtheGlzTmFtZV0uX2F4ID0ge1xuICAgICAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgICAgICBfaWQ6IGF4aXNOYW1lLnNsaWNlKDAsIDMpLFxuICAgICAgICAgICAgX3RyYWNlSW5kaWNlczogdHJhY2VJbmRpY2VzLFxuICAgICAgICAgICAgc2V0U2NhbGU6IExpYi5pZGVudGl0eSxcbiAgICAgICAgICAgIGMybDogTGliLmlkZW50aXR5LFxuICAgICAgICAgICAgcjJsOiBMaWIuaWRlbnRpdHksXG4gICAgICAgICAgICBhdXRvcmFuZ2U6IHRydWUsXG4gICAgICAgICAgICByYW5nZTogcmFuZ2Uuc2xpY2UoKSxcbiAgICAgICAgICAgIF9tOiAxLFxuICAgICAgICAgICAgX2lucHV0OiB7fVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHZhciBsb25SYW5nZSA9IGdlb0xheW91dE91dC5sb25heGlzLnJhbmdlO1xuICAgIHZhciBsYXRSYW5nZSA9IGdlb0xheW91dE91dC5sYXRheGlzLnJhbmdlO1xuXG4gICAgLy8gdG8gY3Jvc3MgYW50aW1lcmlkaWFuIHcvbyBhbWJpZ3VpdHlcbiAgICB2YXIgbG9uMCA9IGxvblJhbmdlWzBdO1xuICAgIHZhciBsb24xID0gbG9uUmFuZ2VbMV07XG4gICAgaWYobG9uMCA+IDAgJiYgbG9uMSA8IDApIGxvbjEgKz0gMzYwO1xuXG4gICAgdmFyIGNlbnRlckxvbiA9IChsb24wICsgbG9uMSkgLyAyO1xuICAgIHZhciBwcm9qTG9uO1xuXG4gICAgaWYoIWlzQWxiZXJzVXNhKSB7XG4gICAgICAgIHZhciBkZmx0UHJvalJvdGF0ZSA9IGlzU2NvcGVkID8gc2NvcGVQYXJhbXMucHJvalJvdGF0ZSA6IFtjZW50ZXJMb24sIDAsIDBdO1xuXG4gICAgICAgIHByb2pMb24gPSBjb2VyY2UoJ3Byb2plY3Rpb24ucm90YXRpb24ubG9uJywgZGZsdFByb2pSb3RhdGVbMF0pO1xuICAgICAgICBjb2VyY2UoJ3Byb2plY3Rpb24ucm90YXRpb24ubGF0JywgZGZsdFByb2pSb3RhdGVbMV0pO1xuICAgICAgICBjb2VyY2UoJ3Byb2plY3Rpb24ucm90YXRpb24ucm9sbCcsIGRmbHRQcm9qUm90YXRlWzJdKTtcblxuICAgICAgICBzaG93ID0gY29lcmNlKCdzaG93Y29hc3RsaW5lcycsICFpc1Njb3BlZCAmJiB2aXNpYmxlKTtcbiAgICAgICAgaWYoc2hvdykge1xuICAgICAgICAgICAgY29lcmNlKCdjb2FzdGxpbmVjb2xvcicpO1xuICAgICAgICAgICAgY29lcmNlKCdjb2FzdGxpbmV3aWR0aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgc2hvdyA9IGNvZXJjZSgnc2hvd29jZWFuJywgIXZpc2libGUgPyBmYWxzZSA6IHVuZGVmaW5lZCk7XG4gICAgICAgIGlmKHNob3cpIGNvZXJjZSgnb2NlYW5jb2xvcicpO1xuICAgIH1cblxuICAgIHZhciBjZW50ZXJMb25EZmx0O1xuICAgIHZhciBjZW50ZXJMYXREZmx0O1xuXG4gICAgaWYoaXNBbGJlcnNVc2EpIHtcbiAgICAgICAgLy8gJ2FsYmVycyB1c2EnIGRvZXMgbm90IGhhdmUgYSAnY2VudGVyJyxcbiAgICAgICAgLy8gdGhlc2UgdmFsdWVzIHdlcmUgZm91bmQgdXNpbmcgdmlhOlxuICAgICAgICAvLyAgIHByb2plY3Rpb24uaW52ZXJ0KFtnZW9MYXlvdXQuY2VudGVyLmxvbiwgZ2VvTGF5b3V0SW4uY2VudGVyLmxhdF0pXG4gICAgICAgIGNlbnRlckxvbkRmbHQgPSAtOTYuNjtcbiAgICAgICAgY2VudGVyTGF0RGZsdCA9IDM4Ljc7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY2VudGVyTG9uRGZsdCA9IGlzU2NvcGVkID8gY2VudGVyTG9uIDogcHJvakxvbjtcbiAgICAgICAgY2VudGVyTGF0RGZsdCA9IChsYXRSYW5nZVswXSArIGxhdFJhbmdlWzFdKSAvIDI7XG4gICAgfVxuXG4gICAgY29lcmNlKCdjZW50ZXIubG9uJywgY2VudGVyTG9uRGZsdCk7XG4gICAgY29lcmNlKCdjZW50ZXIubGF0JywgY2VudGVyTGF0RGZsdCk7XG5cbiAgICBpZihpc0NvbmljKSB7XG4gICAgICAgIHZhciBkZmx0UHJvalBhcmFsbGVscyA9IHNjb3BlUGFyYW1zLnByb2pQYXJhbGxlbHMgfHwgWzAsIDYwXTtcbiAgICAgICAgY29lcmNlKCdwcm9qZWN0aW9uLnBhcmFsbGVscycsIGRmbHRQcm9qUGFyYWxsZWxzKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3Byb2plY3Rpb24uc2NhbGUnKTtcblxuICAgIHNob3cgPSBjb2VyY2UoJ3Nob3dsYW5kJywgIXZpc2libGUgPyBmYWxzZSA6IHVuZGVmaW5lZCk7XG4gICAgaWYoc2hvdykgY29lcmNlKCdsYW5kY29sb3InKTtcblxuICAgIHNob3cgPSBjb2VyY2UoJ3Nob3dsYWtlcycsICF2aXNpYmxlID8gZmFsc2UgOiB1bmRlZmluZWQpO1xuICAgIGlmKHNob3cpIGNvZXJjZSgnbGFrZWNvbG9yJyk7XG5cbiAgICBzaG93ID0gY29lcmNlKCdzaG93cml2ZXJzJywgIXZpc2libGUgPyBmYWxzZSA6IHVuZGVmaW5lZCk7XG4gICAgaWYoc2hvdykge1xuICAgICAgICBjb2VyY2UoJ3JpdmVyY29sb3InKTtcbiAgICAgICAgY29lcmNlKCdyaXZlcndpZHRoJyk7XG4gICAgfVxuXG4gICAgc2hvdyA9IGNvZXJjZSgnc2hvd2NvdW50cmllcycsIGlzU2NvcGVkICYmIHNjb3BlICE9PSAndXNhJyAmJiB2aXNpYmxlKTtcbiAgICBpZihzaG93KSB7XG4gICAgICAgIGNvZXJjZSgnY291bnRyeWNvbG9yJyk7XG4gICAgICAgIGNvZXJjZSgnY291bnRyeXdpZHRoJyk7XG4gICAgfVxuXG4gICAgaWYoc2NvcGUgPT09ICd1c2EnIHx8IChzY29wZSA9PT0gJ25vcnRoIGFtZXJpY2EnICYmIHJlc29sdXRpb24gPT09IDUwKSkge1xuICAgICAgICAvLyBPbmx5IHdvcmtzIGZvcjpcbiAgICAgICAgLy8gICBVU0Egc3RhdGVzIGF0IDExMG1cbiAgICAgICAgLy8gICBVU0Egc3RhdGVzICsgQ2FuYWRhIHByb3ZpbmNlcyBhdCA1MG1cbiAgICAgICAgY29lcmNlKCdzaG93c3VidW5pdHMnLCB2aXNpYmxlKTtcbiAgICAgICAgY29lcmNlKCdzdWJ1bml0Y29sb3InKTtcbiAgICAgICAgY29lcmNlKCdzdWJ1bml0d2lkdGgnKTtcbiAgICB9XG5cbiAgICBpZighaXNTY29wZWQpIHtcbiAgICAgICAgLy8gRG9lcyBub3Qgd29yayBpbiBub24td29ybGQgc2NvcGVzXG4gICAgICAgIHNob3cgPSBjb2VyY2UoJ3Nob3dmcmFtZScsIHZpc2libGUpO1xuICAgICAgICBpZihzaG93KSB7XG4gICAgICAgICAgICBjb2VyY2UoJ2ZyYW1lY29sb3InKTtcbiAgICAgICAgICAgIGNvZXJjZSgnZnJhbWV3aWR0aCcpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29lcmNlKCdiZ2NvbG9yJyk7XG5cbiAgICB2YXIgZml0Qm91bmRzID0gY29lcmNlKCdmaXRib3VuZHMnKTtcblxuICAgIC8vIGNsZWFyIGF0dHJpYnV0ZXMgdGhhdCB3aWxsIGdldCBhdXRvLWZpbGxlZCBsYXRlclxuICAgIGlmKGZpdEJvdW5kcykge1xuICAgICAgICBkZWxldGUgZ2VvTGF5b3V0T3V0LnByb2plY3Rpb24uc2NhbGU7XG5cbiAgICAgICAgaWYoaXNTY29wZWQpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBnZW9MYXlvdXRPdXQuY2VudGVyLmxvbjtcbiAgICAgICAgICAgIGRlbGV0ZSBnZW9MYXlvdXRPdXQuY2VudGVyLmxhdDtcbiAgICAgICAgfSBlbHNlIGlmKGlzQ2xpcHBlZCkge1xuICAgICAgICAgICAgZGVsZXRlIGdlb0xheW91dE91dC5jZW50ZXIubG9uO1xuICAgICAgICAgICAgZGVsZXRlIGdlb0xheW91dE91dC5jZW50ZXIubGF0O1xuICAgICAgICAgICAgZGVsZXRlIGdlb0xheW91dE91dC5wcm9qZWN0aW9uLnJvdGF0aW9uLmxvbjtcbiAgICAgICAgICAgIGRlbGV0ZSBnZW9MYXlvdXRPdXQucHJvamVjdGlvbi5yb3RhdGlvbi5sYXQ7XG4gICAgICAgICAgICBkZWxldGUgZ2VvTGF5b3V0T3V0LmxvbmF4aXMucmFuZ2U7XG4gICAgICAgICAgICBkZWxldGUgZ2VvTGF5b3V0T3V0LmxhdGF4aXMucmFuZ2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWxldGUgZ2VvTGF5b3V0T3V0LmNlbnRlci5sb247XG4gICAgICAgICAgICBkZWxldGUgZ2VvTGF5b3V0T3V0LmNlbnRlci5sYXQ7XG4gICAgICAgICAgICBkZWxldGUgZ2VvTGF5b3V0T3V0LnByb2plY3Rpb24ucm90YXRpb24ubG9uO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuLypcbiAqIEdlbmVyYXRlZCBieSBodHRwczovL2dpdGh1Yi5jb20vZXRwaW5hcmQvZDMtZ2VvLXByb2plY3Rpb24tcGlja2VyXG4gKlxuICogd2hpY2ggaXMgaGFuZC1waWNrcyBwcm9qZWN0aW9uIGZyb20gaHR0cHM6Ly9naXRodWIuY29tL2QzL2QzLWdlby1wcm9qZWN0aW9uXG4gKlxuICogaW50byBhIENvbW1vbkpTIHJlcXVpcmUtYWJsZSBtb2R1bGUuXG4gKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKiBlc2xpbnQtZGlzYWJsZSAqL1xuXG5mdW5jdGlvbiBhZGRQcm9qZWN0aW9uc1RvRDMoZDMpIHtcbiAgZDMuZ2VvLnByb2plY3QgPSBmdW5jdGlvbihvYmplY3QsIHByb2plY3Rpb24pIHtcbiAgICB2YXIgc3RyZWFtID0gcHJvamVjdGlvbi5zdHJlYW07XG4gICAgaWYgKCFzdHJlYW0pIHRocm93IG5ldyBFcnJvcihcIm5vdCB5ZXQgc3VwcG9ydGVkXCIpO1xuICAgIHJldHVybiAob2JqZWN0ICYmIGQzX2dlb19wcm9qZWN0T2JqZWN0VHlwZS5oYXNPd25Qcm9wZXJ0eShvYmplY3QudHlwZSkgPyBkM19nZW9fcHJvamVjdE9iamVjdFR5cGVbb2JqZWN0LnR5cGVdIDogZDNfZ2VvX3Byb2plY3RHZW9tZXRyeSkob2JqZWN0LCBzdHJlYW0pO1xuICB9O1xuICBmdW5jdGlvbiBkM19nZW9fcHJvamVjdEZlYXR1cmUob2JqZWN0LCBzdHJlYW0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogXCJGZWF0dXJlXCIsXG4gICAgICBpZDogb2JqZWN0LmlkLFxuICAgICAgcHJvcGVydGllczogb2JqZWN0LnByb3BlcnRpZXMsXG4gICAgICBnZW9tZXRyeTogZDNfZ2VvX3Byb2plY3RHZW9tZXRyeShvYmplY3QuZ2VvbWV0cnksIHN0cmVhbSlcbiAgICB9O1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wcm9qZWN0R2VvbWV0cnkoZ2VvbWV0cnksIHN0cmVhbSkge1xuICAgIGlmICghZ2VvbWV0cnkpIHJldHVybiBudWxsO1xuICAgIGlmIChnZW9tZXRyeS50eXBlID09PSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiKSByZXR1cm4ge1xuICAgICAgdHlwZTogXCJHZW9tZXRyeUNvbGxlY3Rpb25cIixcbiAgICAgIGdlb21ldHJpZXM6IG9iamVjdC5nZW9tZXRyaWVzLm1hcChmdW5jdGlvbihnZW9tZXRyeSkge1xuICAgICAgICByZXR1cm4gZDNfZ2VvX3Byb2plY3RHZW9tZXRyeShnZW9tZXRyeSwgc3RyZWFtKTtcbiAgICAgIH0pXG4gICAgfTtcbiAgICBpZiAoIWQzX2dlb19wcm9qZWN0R2VvbWV0cnlUeXBlLmhhc093blByb3BlcnR5KGdlb21ldHJ5LnR5cGUpKSByZXR1cm4gbnVsbDtcbiAgICB2YXIgc2luayA9IGQzX2dlb19wcm9qZWN0R2VvbWV0cnlUeXBlW2dlb21ldHJ5LnR5cGVdO1xuICAgIGQzLmdlby5zdHJlYW0oZ2VvbWV0cnksIHN0cmVhbShzaW5rKSk7XG4gICAgcmV0dXJuIHNpbmsucmVzdWx0KCk7XG4gIH1cbiAgdmFyIGQzX2dlb19wcm9qZWN0T2JqZWN0VHlwZSA9IHtcbiAgICBGZWF0dXJlOiBkM19nZW9fcHJvamVjdEZlYXR1cmUsXG4gICAgRmVhdHVyZUNvbGxlY3Rpb246IGZ1bmN0aW9uKG9iamVjdCwgc3RyZWFtKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBcIkZlYXR1cmVDb2xsZWN0aW9uXCIsXG4gICAgICAgIGZlYXR1cmVzOiBvYmplY3QuZmVhdHVyZXMubWFwKGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgICByZXR1cm4gZDNfZ2VvX3Byb2plY3RGZWF0dXJlKGZlYXR1cmUsIHN0cmVhbSk7XG4gICAgICAgIH0pXG4gICAgICB9O1xuICAgIH1cbiAgfTtcbiAgdmFyIGQzX2dlb19wcm9qZWN0UG9pbnRzID0gW10sIGQzX2dlb19wcm9qZWN0TGluZXMgPSBbXTtcbiAgdmFyIGQzX2dlb19wcm9qZWN0UG9pbnQgPSB7XG4gICAgcG9pbnQ6IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIGQzX2dlb19wcm9qZWN0UG9pbnRzLnB1c2goWyB4LCB5IF0pO1xuICAgIH0sXG4gICAgcmVzdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciByZXN1bHQgPSAhZDNfZ2VvX3Byb2plY3RQb2ludHMubGVuZ3RoID8gbnVsbCA6IGQzX2dlb19wcm9qZWN0UG9pbnRzLmxlbmd0aCA8IDIgPyB7XG4gICAgICAgIHR5cGU6IFwiUG9pbnRcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGQzX2dlb19wcm9qZWN0UG9pbnRzWzBdXG4gICAgICB9IDoge1xuICAgICAgICB0eXBlOiBcIk11bHRpUG9pbnRcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGQzX2dlb19wcm9qZWN0UG9pbnRzXG4gICAgICB9O1xuICAgICAgZDNfZ2VvX3Byb2plY3RQb2ludHMgPSBbXTtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9O1xuICB2YXIgZDNfZ2VvX3Byb2plY3RMaW5lID0ge1xuICAgIGxpbmVTdGFydDogZDNfZ2VvX3Byb2plY3ROb29wLFxuICAgIHBvaW50OiBmdW5jdGlvbih4LCB5KSB7XG4gICAgICBkM19nZW9fcHJvamVjdFBvaW50cy5wdXNoKFsgeCwgeSBdKTtcbiAgICB9LFxuICAgIGxpbmVFbmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKGQzX2dlb19wcm9qZWN0UG9pbnRzLmxlbmd0aCkgZDNfZ2VvX3Byb2plY3RMaW5lcy5wdXNoKGQzX2dlb19wcm9qZWN0UG9pbnRzKSxcbiAgICAgIGQzX2dlb19wcm9qZWN0UG9pbnRzID0gW107XG4gICAgfSxcbiAgICByZXN1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHJlc3VsdCA9ICFkM19nZW9fcHJvamVjdExpbmVzLmxlbmd0aCA/IG51bGwgOiBkM19nZW9fcHJvamVjdExpbmVzLmxlbmd0aCA8IDIgPyB7XG4gICAgICAgIHR5cGU6IFwiTGluZVN0cmluZ1wiLFxuICAgICAgICBjb29yZGluYXRlczogZDNfZ2VvX3Byb2plY3RMaW5lc1swXVxuICAgICAgfSA6IHtcbiAgICAgICAgdHlwZTogXCJNdWx0aUxpbmVTdHJpbmdcIixcbiAgICAgICAgY29vcmRpbmF0ZXM6IGQzX2dlb19wcm9qZWN0TGluZXNcbiAgICAgIH07XG4gICAgICBkM19nZW9fcHJvamVjdExpbmVzID0gW107XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfTtcbiAgdmFyIGQzX2dlb19wcm9qZWN0UG9seWdvbiA9IHtcbiAgICBwb2x5Z29uU3RhcnQ6IGQzX2dlb19wcm9qZWN0Tm9vcCxcbiAgICBsaW5lU3RhcnQ6IGQzX2dlb19wcm9qZWN0Tm9vcCxcbiAgICBwb2ludDogZnVuY3Rpb24oeCwgeSkge1xuICAgICAgZDNfZ2VvX3Byb2plY3RQb2ludHMucHVzaChbIHgsIHkgXSk7XG4gICAgfSxcbiAgICBsaW5lRW5kOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBuID0gZDNfZ2VvX3Byb2plY3RQb2ludHMubGVuZ3RoO1xuICAgICAgaWYgKG4pIHtcbiAgICAgICAgZG8gZDNfZ2VvX3Byb2plY3RQb2ludHMucHVzaChkM19nZW9fcHJvamVjdFBvaW50c1swXS5zbGljZSgpKTsgd2hpbGUgKCsrbiA8IDQpO1xuICAgICAgICBkM19nZW9fcHJvamVjdExpbmVzLnB1c2goZDNfZ2VvX3Byb2plY3RQb2ludHMpLCBkM19nZW9fcHJvamVjdFBvaW50cyA9IFtdO1xuICAgICAgfVxuICAgIH0sXG4gICAgcG9seWdvbkVuZDogZDNfZ2VvX3Byb2plY3ROb29wLFxuICAgIHJlc3VsdDogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAoIWQzX2dlb19wcm9qZWN0TGluZXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcbiAgICAgIHZhciBwb2x5Z29ucyA9IFtdLCBob2xlcyA9IFtdO1xuICAgICAgZDNfZ2VvX3Byb2plY3RMaW5lcy5mb3JFYWNoKGZ1bmN0aW9uKHJpbmcpIHtcbiAgICAgICAgaWYgKGQzX2dlb19wcm9qZWN0Q2xvY2t3aXNlKHJpbmcpKSBwb2x5Z29ucy5wdXNoKFsgcmluZyBdKTsgZWxzZSBob2xlcy5wdXNoKHJpbmcpO1xuICAgICAgfSk7XG4gICAgICBob2xlcy5mb3JFYWNoKGZ1bmN0aW9uKGhvbGUpIHtcbiAgICAgICAgdmFyIHBvaW50ID0gaG9sZVswXTtcbiAgICAgICAgcG9seWdvbnMuc29tZShmdW5jdGlvbihwb2x5Z29uKSB7XG4gICAgICAgICAgaWYgKGQzX2dlb19wcm9qZWN0Q29udGFpbnMocG9seWdvblswXSwgcG9pbnQpKSB7XG4gICAgICAgICAgICBwb2x5Z29uLnB1c2goaG9sZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pIHx8IHBvbHlnb25zLnB1c2goWyBob2xlIF0pO1xuICAgICAgfSk7XG4gICAgICBkM19nZW9fcHJvamVjdExpbmVzID0gW107XG4gICAgICByZXR1cm4gIXBvbHlnb25zLmxlbmd0aCA/IG51bGwgOiBwb2x5Z29ucy5sZW5ndGggPiAxID8ge1xuICAgICAgICB0eXBlOiBcIk11bHRpUG9seWdvblwiLFxuICAgICAgICBjb29yZGluYXRlczogcG9seWdvbnNcbiAgICAgIH0gOiB7XG4gICAgICAgIHR5cGU6IFwiUG9seWdvblwiLFxuICAgICAgICBjb29yZGluYXRlczogcG9seWdvbnNbMF1cbiAgICAgIH07XG4gICAgfVxuICB9O1xuICB2YXIgZDNfZ2VvX3Byb2plY3RHZW9tZXRyeVR5cGUgPSB7XG4gICAgUG9pbnQ6IGQzX2dlb19wcm9qZWN0UG9pbnQsXG4gICAgTXVsdGlQb2ludDogZDNfZ2VvX3Byb2plY3RQb2ludCxcbiAgICBMaW5lU3RyaW5nOiBkM19nZW9fcHJvamVjdExpbmUsXG4gICAgTXVsdGlMaW5lU3RyaW5nOiBkM19nZW9fcHJvamVjdExpbmUsXG4gICAgUG9seWdvbjogZDNfZ2VvX3Byb2plY3RQb2x5Z29uLFxuICAgIE11bHRpUG9seWdvbjogZDNfZ2VvX3Byb2plY3RQb2x5Z29uLFxuICAgIFNwaGVyZTogZDNfZ2VvX3Byb2plY3RQb2x5Z29uXG4gIH07XG4gIGZ1bmN0aW9uIGQzX2dlb19wcm9qZWN0Tm9vcCgpIHt9XG4gIGZ1bmN0aW9uIGQzX2dlb19wcm9qZWN0Q2xvY2t3aXNlKHJpbmcpIHtcbiAgICBpZiAoKG4gPSByaW5nLmxlbmd0aCkgPCA0KSByZXR1cm4gZmFsc2U7XG4gICAgdmFyIGkgPSAwLCBuLCBhcmVhID0gcmluZ1tuIC0gMV1bMV0gKiByaW5nWzBdWzBdIC0gcmluZ1tuIC0gMV1bMF0gKiByaW5nWzBdWzFdO1xuICAgIHdoaWxlICgrK2kgPCBuKSBhcmVhICs9IHJpbmdbaSAtIDFdWzFdICogcmluZ1tpXVswXSAtIHJpbmdbaSAtIDFdWzBdICogcmluZ1tpXVsxXTtcbiAgICByZXR1cm4gYXJlYSA8PSAwO1xuICB9XG4gIGZ1bmN0aW9uIGQzX2dlb19wcm9qZWN0Q29udGFpbnMocmluZywgcG9pbnQpIHtcbiAgICB2YXIgeCA9IHBvaW50WzBdLCB5ID0gcG9pbnRbMV0sIGNvbnRhaW5zID0gZmFsc2U7XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSByaW5nLmxlbmd0aCwgaiA9IG4gLSAxOyBpIDwgbjsgaiA9IGkrKykge1xuICAgICAgdmFyIHBpID0gcmluZ1tpXSwgeGkgPSBwaVswXSwgeWkgPSBwaVsxXSwgcGogPSByaW5nW2pdLCB4aiA9IHBqWzBdLCB5aiA9IHBqWzFdO1xuICAgICAgaWYgKHlpID4geSBeIHlqID4geSAmJiB4IDwgKHhqIC0geGkpICogKHkgLSB5aSkgLyAoeWogLSB5aSkgKyB4aSkgY29udGFpbnMgPSAhY29udGFpbnM7XG4gICAgfVxuICAgIHJldHVybiBjb250YWlucztcbiAgfVxuICB2YXIgzrUgPSAxZS02LCDOtTIgPSDOtSAqIM61LCDPgCA9IE1hdGguUEksIGhhbGbPgCA9IM+AIC8gMiwgc3FydM+AID0gTWF0aC5zcXJ0KM+AKSwgcmFkaWFucyA9IM+AIC8gMTgwLCBkZWdyZWVzID0gMTgwIC8gz4A7XG4gIGZ1bmN0aW9uIHNpbmNpKHgpIHtcbiAgICByZXR1cm4geCA/IHggLyBNYXRoLnNpbih4KSA6IDE7XG4gIH1cbiAgZnVuY3Rpb24gc2duKHgpIHtcbiAgICByZXR1cm4geCA+IDAgPyAxIDogeCA8IDAgPyAtMSA6IDA7XG4gIH1cbiAgZnVuY3Rpb24gYXNpbih4KSB7XG4gICAgcmV0dXJuIHggPiAxID8gaGFsZs+AIDogeCA8IC0xID8gLWhhbGbPgCA6IE1hdGguYXNpbih4KTtcbiAgfVxuICBmdW5jdGlvbiBhY29zKHgpIHtcbiAgICByZXR1cm4geCA+IDEgPyAwIDogeCA8IC0xID8gz4AgOiBNYXRoLmFjb3MoeCk7XG4gIH1cbiAgZnVuY3Rpb24gYXNxcnQoeCkge1xuICAgIHJldHVybiB4ID4gMCA/IE1hdGguc3FydCh4KSA6IDA7XG4gIH1cbiAgdmFyIHByb2plY3Rpb24gPSBkMy5nZW8ucHJvamVjdGlvbiwgcHJvamVjdGlvbk11dGF0b3IgPSBkMy5nZW8ucHJvamVjdGlvbk11dGF0b3I7XG4gIGQzLmdlby5pbnRlcnJ1cHQgPSBmdW5jdGlvbihwcm9qZWN0KSB7XG4gICAgdmFyIGxvYmVzID0gWyBbIFsgWyAtz4AsIDAgXSwgWyAwLCBoYWxmz4AgXSwgWyDPgCwgMCBdIF0gXSwgWyBbIFsgLc+ALCAwIF0sIFsgMCwgLWhhbGbPgCBdLCBbIM+ALCAwIF0gXSBdIF07XG4gICAgdmFyIGJvdW5kcztcbiAgICBmdW5jdGlvbiBmb3J3YXJkKM67LCDPhikge1xuICAgICAgdmFyIHNpZ24gPSDPhiA8IDAgPyAtMSA6ICsxLCBoZW1pbG9iZXMgPSBsb2Jlc1srKM+GIDwgMCldO1xuICAgICAgZm9yICh2YXIgaSA9IDAsIG4gPSBoZW1pbG9iZXMubGVuZ3RoIC0gMTsgaSA8IG4gJiYgzrsgPiBoZW1pbG9iZXNbaV1bMl1bMF07ICsraSkgO1xuICAgICAgdmFyIGNvb3JkaW5hdGVzID0gcHJvamVjdCjOuyAtIGhlbWlsb2Jlc1tpXVsxXVswXSwgz4YpO1xuICAgICAgY29vcmRpbmF0ZXNbMF0gKz0gcHJvamVjdChoZW1pbG9iZXNbaV1bMV1bMF0sIHNpZ24gKiDPhiA+IHNpZ24gKiBoZW1pbG9iZXNbaV1bMF1bMV0gPyBoZW1pbG9iZXNbaV1bMF1bMV0gOiDPhilbMF07XG4gICAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgYm91bmRzID0gbG9iZXMubWFwKGZ1bmN0aW9uKGhlbWlsb2Jlcykge1xuICAgICAgICByZXR1cm4gaGVtaWxvYmVzLm1hcChmdW5jdGlvbihsb2JlKSB7XG4gICAgICAgICAgdmFyIHgwID0gcHJvamVjdChsb2JlWzBdWzBdLCBsb2JlWzBdWzFdKVswXSwgeDEgPSBwcm9qZWN0KGxvYmVbMl1bMF0sIGxvYmVbMl1bMV0pWzBdLCB5MCA9IHByb2plY3QobG9iZVsxXVswXSwgbG9iZVswXVsxXSlbMV0sIHkxID0gcHJvamVjdChsb2JlWzFdWzBdLCBsb2JlWzFdWzFdKVsxXSwgdDtcbiAgICAgICAgICBpZiAoeTAgPiB5MSkgdCA9IHkwLCB5MCA9IHkxLCB5MSA9IHQ7XG4gICAgICAgICAgcmV0dXJuIFsgWyB4MCwgeTAgXSwgWyB4MSwgeTEgXSBdO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAocHJvamVjdC5pbnZlcnQpIGZvcndhcmQuaW52ZXJ0ID0gZnVuY3Rpb24oeCwgeSkge1xuICAgICAgdmFyIGhlbWlib3VuZHMgPSBib3VuZHNbKyh5IDwgMCldLCBoZW1pbG9iZXMgPSBsb2Jlc1srKHkgPCAwKV07XG4gICAgICBmb3IgKHZhciBpID0gMCwgbiA9IGhlbWlib3VuZHMubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIHZhciBiID0gaGVtaWJvdW5kc1tpXTtcbiAgICAgICAgaWYgKGJbMF1bMF0gPD0geCAmJiB4IDwgYlsxXVswXSAmJiBiWzBdWzFdIDw9IHkgJiYgeSA8IGJbMV1bMV0pIHtcbiAgICAgICAgICB2YXIgY29vcmRpbmF0ZXMgPSBwcm9qZWN0LmludmVydCh4IC0gcHJvamVjdChoZW1pbG9iZXNbaV1bMV1bMF0sIDApWzBdLCB5KTtcbiAgICAgICAgICBjb29yZGluYXRlc1swXSArPSBoZW1pbG9iZXNbaV1bMV1bMF07XG4gICAgICAgICAgcmV0dXJuIHBvaW50RXF1YWwoZm9yd2FyZChjb29yZGluYXRlc1swXSwgY29vcmRpbmF0ZXNbMV0pLCBbIHgsIHkgXSkgPyBjb29yZGluYXRlcyA6IG51bGw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBwcm9qZWN0aW9uID0gZDMuZ2VvLnByb2plY3Rpb24oZm9yd2FyZCksIHN0cmVhbV8gPSBwcm9qZWN0aW9uLnN0cmVhbTtcbiAgICBwcm9qZWN0aW9uLnN0cmVhbSA9IGZ1bmN0aW9uKHN0cmVhbSkge1xuICAgICAgdmFyIHJvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCksIHJvdGF0ZVN0cmVhbSA9IHN0cmVhbV8oc3RyZWFtKSwgc3BoZXJlU3RyZWFtID0gKHByb2plY3Rpb24ucm90YXRlKFsgMCwgMCBdKSxcbiAgICAgIHN0cmVhbV8oc3RyZWFtKSk7XG4gICAgICBwcm9qZWN0aW9uLnJvdGF0ZShyb3RhdGUpO1xuICAgICAgcm90YXRlU3RyZWFtLnNwaGVyZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBkMy5nZW8uc3RyZWFtKHNwaGVyZSgpLCBzcGhlcmVTdHJlYW0pO1xuICAgICAgfTtcbiAgICAgIHJldHVybiByb3RhdGVTdHJlYW07XG4gICAgfTtcbiAgICBwcm9qZWN0aW9uLmxvYmVzID0gZnVuY3Rpb24oXykge1xuICAgICAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gbG9iZXMubWFwKGZ1bmN0aW9uKGxvYmVzKSB7XG4gICAgICAgIHJldHVybiBsb2Jlcy5tYXAoZnVuY3Rpb24obG9iZSkge1xuICAgICAgICAgIHJldHVybiBbIFsgbG9iZVswXVswXSAqIDE4MCAvIM+ALCBsb2JlWzBdWzFdICogMTgwIC8gz4AgXSwgWyBsb2JlWzFdWzBdICogMTgwIC8gz4AsIGxvYmVbMV1bMV0gKiAxODAgLyDPgCBdLCBbIGxvYmVbMl1bMF0gKiAxODAgLyDPgCwgbG9iZVsyXVsxXSAqIDE4MCAvIM+AIF0gXTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGxvYmVzID0gXy5tYXAoZnVuY3Rpb24obG9iZXMpIHtcbiAgICAgICAgcmV0dXJuIGxvYmVzLm1hcChmdW5jdGlvbihsb2JlKSB7XG4gICAgICAgICAgcmV0dXJuIFsgWyBsb2JlWzBdWzBdICogz4AgLyAxODAsIGxvYmVbMF1bMV0gKiDPgCAvIDE4MCBdLCBbIGxvYmVbMV1bMF0gKiDPgCAvIDE4MCwgbG9iZVsxXVsxXSAqIM+AIC8gMTgwIF0sIFsgbG9iZVsyXVswXSAqIM+AIC8gMTgwLCBsb2JlWzJdWzFdICogz4AgLyAxODAgXSBdO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgcmVzZXQoKTtcbiAgICAgIHJldHVybiBwcm9qZWN0aW9uO1xuICAgIH07XG4gICAgZnVuY3Rpb24gc3BoZXJlKCkge1xuICAgICAgdmFyIM61ID0gMWUtNiwgY29vcmRpbmF0ZXMgPSBbXTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gbG9iZXNbMF0ubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIHZhciBsb2JlID0gbG9iZXNbMF1baV0sIM67MCA9IGxvYmVbMF1bMF0gKiAxODAgLyDPgCwgz4YwID0gbG9iZVswXVsxXSAqIDE4MCAvIM+ALCDPhjEgPSBsb2JlWzFdWzFdICogMTgwIC8gz4AsIM67MiA9IGxvYmVbMl1bMF0gKiAxODAgLyDPgCwgz4YyID0gbG9iZVsyXVsxXSAqIDE4MCAvIM+AO1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHJlc2FtcGxlKFsgWyDOuzAgKyDOtSwgz4YwICsgzrUgXSwgWyDOuzAgKyDOtSwgz4YxIC0gzrUgXSwgWyDOuzIgLSDOtSwgz4YxIC0gzrUgXSwgWyDOuzIgLSDOtSwgz4YyICsgzrUgXSBdLCAzMCkpO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IGxvYmVzWzFdLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBsb2JlID0gbG9iZXNbMV1baV0sIM67MCA9IGxvYmVbMF1bMF0gKiAxODAgLyDPgCwgz4YwID0gbG9iZVswXVsxXSAqIDE4MCAvIM+ALCDPhjEgPSBsb2JlWzFdWzFdICogMTgwIC8gz4AsIM67MiA9IGxvYmVbMl1bMF0gKiAxODAgLyDPgCwgz4YyID0gbG9iZVsyXVsxXSAqIDE4MCAvIM+AO1xuICAgICAgICBjb29yZGluYXRlcy5wdXNoKHJlc2FtcGxlKFsgWyDOuzIgLSDOtSwgz4YyIC0gzrUgXSwgWyDOuzIgLSDOtSwgz4YxICsgzrUgXSwgWyDOuzAgKyDOtSwgz4YxICsgzrUgXSwgWyDOuzAgKyDOtSwgz4YwIC0gzrUgXSBdLCAzMCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHlwZTogXCJQb2x5Z29uXCIsXG4gICAgICAgIGNvb3JkaW5hdGVzOiBbIGQzLm1lcmdlKGNvb3JkaW5hdGVzKSBdXG4gICAgICB9O1xuICAgIH1cbiAgICBmdW5jdGlvbiByZXNhbXBsZShjb29yZGluYXRlcywgbSkge1xuICAgICAgdmFyIGkgPSAtMSwgbiA9IGNvb3JkaW5hdGVzLmxlbmd0aCwgcDAgPSBjb29yZGluYXRlc1swXSwgcDEsIGR4LCBkeSwgcmVzYW1wbGVkID0gW107XG4gICAgICB3aGlsZSAoKytpIDwgbikge1xuICAgICAgICBwMSA9IGNvb3JkaW5hdGVzW2ldO1xuICAgICAgICBkeCA9IChwMVswXSAtIHAwWzBdKSAvIG07XG4gICAgICAgIGR5ID0gKHAxWzFdIC0gcDBbMV0pIC8gbTtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBtOyArK2opIHJlc2FtcGxlZC5wdXNoKFsgcDBbMF0gKyBqICogZHgsIHAwWzFdICsgaiAqIGR5IF0pO1xuICAgICAgICBwMCA9IHAxO1xuICAgICAgfVxuICAgICAgcmVzYW1wbGVkLnB1c2gocDEpO1xuICAgICAgcmV0dXJuIHJlc2FtcGxlZDtcbiAgICB9XG4gICAgZnVuY3Rpb24gcG9pbnRFcXVhbChhLCBiKSB7XG4gICAgICByZXR1cm4gTWF0aC5hYnMoYVswXSAtIGJbMF0pIDwgzrUgJiYgTWF0aC5hYnMoYVsxXSAtIGJbMV0pIDwgzrU7XG4gICAgfVxuICAgIHJldHVybiBwcm9qZWN0aW9uO1xuICB9O1xuICBmdW5jdGlvbiBlY2tlcnQ0KM67LCDPhikge1xuICAgIHZhciBrID0gKDIgKyBoYWxmz4ApICogTWF0aC5zaW4oz4YpO1xuICAgIM+GIC89IDI7XG4gICAgZm9yICh2YXIgaSA9IDAsIM60ID0gSW5maW5pdHk7IGkgPCAxMCAmJiBNYXRoLmFicyjOtCkgPiDOtTsgaSsrKSB7XG4gICAgICB2YXIgY29zz4YgPSBNYXRoLmNvcyjPhik7XG4gICAgICDPhiAtPSDOtCA9ICjPhiArIE1hdGguc2luKM+GKSAqIChjb3PPhiArIDIpIC0gaykgLyAoMiAqIGNvc8+GICogKDEgKyBjb3PPhikpO1xuICAgIH1cbiAgICByZXR1cm4gWyAyIC8gTWF0aC5zcXJ0KM+AICogKDQgKyDPgCkpICogzrsgKiAoMSArIE1hdGguY29zKM+GKSksIDIgKiBNYXRoLnNxcnQoz4AgLyAoNCArIM+AKSkgKiBNYXRoLnNpbijPhikgXTtcbiAgfVxuICBlY2tlcnQ0LmludmVydCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgQSA9IC41ICogeSAqIE1hdGguc3FydCgoNCArIM+AKSAvIM+AKSwgayA9IGFzaW4oQSksIGMgPSBNYXRoLmNvcyhrKTtcbiAgICByZXR1cm4gWyB4IC8gKDIgLyBNYXRoLnNxcnQoz4AgKiAoNCArIM+AKSkgKiAoMSArIGMpKSwgYXNpbigoayArIEEgKiAoYyArIDIpKSAvICgyICsgaGFsZs+AKSkgXTtcbiAgfTtcbiAgKGQzLmdlby5lY2tlcnQ0ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHByb2plY3Rpb24oZWNrZXJ0NCk7XG4gIH0pLnJhdyA9IGVja2VydDQ7XG4gIHZhciBoYW1tZXJBemltdXRoYWxFcXVhbEFyZWEgPSBkMy5nZW8uYXppbXV0aGFsRXF1YWxBcmVhLnJhdztcbiAgZnVuY3Rpb24gaGFtbWVyKEEsIEIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIEIgPSBBO1xuICAgIGlmIChCID09PSAxKSByZXR1cm4gaGFtbWVyQXppbXV0aGFsRXF1YWxBcmVhO1xuICAgIGlmIChCID09PSBJbmZpbml0eSkgcmV0dXJuIGhhbW1lclF1YXJ0aWNBdXRoYWxpYztcbiAgICBmdW5jdGlvbiBmb3J3YXJkKM67LCDPhikge1xuICAgICAgdmFyIGNvb3JkaW5hdGVzID0gaGFtbWVyQXppbXV0aGFsRXF1YWxBcmVhKM67IC8gQiwgz4YpO1xuICAgICAgY29vcmRpbmF0ZXNbMF0gKj0gQTtcbiAgICAgIHJldHVybiBjb29yZGluYXRlcztcbiAgICB9XG4gICAgZm9yd2FyZC5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgICB2YXIgY29vcmRpbmF0ZXMgPSBoYW1tZXJBemltdXRoYWxFcXVhbEFyZWEuaW52ZXJ0KHggLyBBLCB5KTtcbiAgICAgIGNvb3JkaW5hdGVzWzBdICo9IEI7XG4gICAgICByZXR1cm4gY29vcmRpbmF0ZXM7XG4gICAgfTtcbiAgICByZXR1cm4gZm9yd2FyZDtcbiAgfVxuICBmdW5jdGlvbiBoYW1tZXJQcm9qZWN0aW9uKCkge1xuICAgIHZhciBCID0gMiwgbSA9IHByb2plY3Rpb25NdXRhdG9yKGhhbW1lciksIHAgPSBtKEIpO1xuICAgIHAuY29lZmZpY2llbnQgPSBmdW5jdGlvbihfKSB7XG4gICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBCO1xuICAgICAgcmV0dXJuIG0oQiA9ICtfKTtcbiAgICB9O1xuICAgIHJldHVybiBwO1xuICB9XG4gIGZ1bmN0aW9uIGhhbW1lclF1YXJ0aWNBdXRoYWxpYyjOuywgz4YpIHtcbiAgICByZXR1cm4gWyDOuyAqIE1hdGguY29zKM+GKSAvIE1hdGguY29zKM+GIC89IDIpLCAyICogTWF0aC5zaW4oz4YpIF07XG4gIH1cbiAgaGFtbWVyUXVhcnRpY0F1dGhhbGljLmludmVydCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgz4YgPSAyICogYXNpbih5IC8gMik7XG4gICAgcmV0dXJuIFsgeCAqIE1hdGguY29zKM+GIC8gMikgLyBNYXRoLmNvcyjPhiksIM+GIF07XG4gIH07XG4gIChkMy5nZW8uaGFtbWVyID0gaGFtbWVyUHJvamVjdGlvbikucmF3ID0gaGFtbWVyO1xuICBmdW5jdGlvbiBrYXZyYXlza2l5NyjOuywgz4YpIHtcbiAgICByZXR1cm4gWyAzICogzrsgLyAoMiAqIM+AKSAqIE1hdGguc3FydCjPgCAqIM+AIC8gMyAtIM+GICogz4YpLCDPhiBdO1xuICB9XG4gIGthdnJheXNraXk3LmludmVydCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4gWyAyIC8gMyAqIM+AICogeCAvIE1hdGguc3FydCjPgCAqIM+AIC8gMyAtIHkgKiB5KSwgeSBdO1xuICB9O1xuICAoZDMuZ2VvLmthdnJheXNraXk3ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHByb2plY3Rpb24oa2F2cmF5c2tpeTcpO1xuICB9KS5yYXcgPSBrYXZyYXlza2l5NztcbiAgZnVuY3Rpb24gbWlsbGVyKM67LCDPhikge1xuICAgIHJldHVybiBbIM67LCAxLjI1ICogTWF0aC5sb2coTWF0aC50YW4oz4AgLyA0ICsgLjQgKiDPhikpIF07XG4gIH1cbiAgbWlsbGVyLmludmVydCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICByZXR1cm4gWyB4LCAyLjUgKiBNYXRoLmF0YW4oTWF0aC5leHAoLjggKiB5KSkgLSAuNjI1ICogz4AgXTtcbiAgfTtcbiAgKGQzLmdlby5taWxsZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcHJvamVjdGlvbihtaWxsZXIpO1xuICB9KS5yYXcgPSBtaWxsZXI7XG4gIGZ1bmN0aW9uIG1vbGx3ZWlkZUJyb21sZXnOuChDcCkge1xuICAgIHJldHVybiBmdW5jdGlvbijOuCkge1xuICAgICAgdmFyIENwc2luzrggPSBDcCAqIE1hdGguc2luKM64KSwgaSA9IDMwLCDOtDtcbiAgICAgIGRvIM64IC09IM60ID0gKM64ICsgTWF0aC5zaW4ozrgpIC0gQ3BzaW7OuCkgLyAoMSArIE1hdGguY29zKM64KSk7IHdoaWxlIChNYXRoLmFicyjOtCkgPiDOtSAmJiAtLWkgPiAwKTtcbiAgICAgIHJldHVybiDOuCAvIDI7XG4gICAgfTtcbiAgfVxuICBmdW5jdGlvbiBtb2xsd2VpZGVCcm9tbGV5KEN4LCBDeSwgQ3ApIHtcbiAgICB2YXIgzrggPSBtb2xsd2VpZGVCcm9tbGV5zrgoQ3ApO1xuICAgIGZ1bmN0aW9uIGZvcndhcmQozrssIM+GKSB7XG4gICAgICByZXR1cm4gWyBDeCAqIM67ICogTWF0aC5jb3Moz4YgPSDOuCjPhikpLCBDeSAqIE1hdGguc2luKM+GKSBdO1xuICAgIH1cbiAgICBmb3J3YXJkLmludmVydCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICAgIHZhciDOuCA9IGFzaW4oeSAvIEN5KTtcbiAgICAgIHJldHVybiBbIHggLyAoQ3ggKiBNYXRoLmNvcyjOuCkpLCBhc2luKCgyICogzrggKyBNYXRoLnNpbigyICogzrgpKSAvIENwKSBdO1xuICAgIH07XG4gICAgcmV0dXJuIGZvcndhcmQ7XG4gIH1cbiAgdmFyIG1vbGx3ZWlkZc64ID0gbW9sbHdlaWRlQnJvbWxlec64KM+AKSwgbW9sbHdlaWRlID0gbW9sbHdlaWRlQnJvbWxleShNYXRoLlNRUlQyIC8gaGFsZs+ALCBNYXRoLlNRUlQyLCDPgCk7XG4gIChkMy5nZW8ubW9sbHdlaWRlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHByb2plY3Rpb24obW9sbHdlaWRlKTtcbiAgfSkucmF3ID0gbW9sbHdlaWRlO1xuICBmdW5jdGlvbiBuYXR1cmFsRWFydGgozrssIM+GKSB7XG4gICAgdmFyIM+GMiA9IM+GICogz4YsIM+GNCA9IM+GMiAqIM+GMjtcbiAgICByZXR1cm4gWyDOuyAqICguODcwNyAtIC4xMzE5NzkgKiDPhjIgKyDPhjQgKiAoLS4wMTM3OTEgKyDPhjQgKiAoLjAwMzk3MSAqIM+GMiAtIC4wMDE1MjkgKiDPhjQpKSksIM+GICogKDEuMDA3MjI2ICsgz4YyICogKC4wMTUwODUgKyDPhjQgKiAoLS4wNDQ0NzUgKyAuMDI4ODc0ICogz4YyIC0gLjAwNTkxNiAqIM+GNCkpKSBdO1xuICB9XG4gIG5hdHVyYWxFYXJ0aC5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIM+GID0geSwgaSA9IDI1LCDOtDtcbiAgICBkbyB7XG4gICAgICB2YXIgz4YyID0gz4YgKiDPhiwgz4Y0ID0gz4YyICogz4YyO1xuICAgICAgz4YgLT0gzrQgPSAoz4YgKiAoMS4wMDcyMjYgKyDPhjIgKiAoLjAxNTA4NSArIM+GNCAqICgtLjA0NDQ3NSArIC4wMjg4NzQgKiDPhjIgLSAuMDA1OTE2ICogz4Y0KSkpIC0geSkgLyAoMS4wMDcyMjYgKyDPhjIgKiAoLjAxNTA4NSAqIDMgKyDPhjQgKiAoLS4wNDQ0NzUgKiA3ICsgLjAyODg3NCAqIDkgKiDPhjIgLSAuMDA1OTE2ICogMTEgKiDPhjQpKSk7XG4gICAgfSB3aGlsZSAoTWF0aC5hYnMozrQpID4gzrUgJiYgLS1pID4gMCk7XG4gICAgcmV0dXJuIFsgeCAvICguODcwNyArICjPhjIgPSDPhiAqIM+GKSAqICgtLjEzMTk3OSArIM+GMiAqICgtLjAxMzc5MSArIM+GMiAqIM+GMiAqIM+GMiAqICguMDAzOTcxIC0gLjAwMTUyOSAqIM+GMikpKSksIM+GIF07XG4gIH07XG4gIChkMy5nZW8ubmF0dXJhbEVhcnRoID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHByb2plY3Rpb24obmF0dXJhbEVhcnRoKTtcbiAgfSkucmF3ID0gbmF0dXJhbEVhcnRoO1xuICB2YXIgcm9iaW5zb25Db25zdGFudHMgPSBbIFsgLjk5ODYsIC0uMDYyIF0sIFsgMSwgMCBdLCBbIC45OTg2LCAuMDYyIF0sIFsgLjk5NTQsIC4xMjQgXSwgWyAuOTksIC4xODYgXSwgWyAuOTgyMiwgLjI0OCBdLCBbIC45NzMsIC4zMSBdLCBbIC45NiwgLjM3MiBdLCBbIC45NDI3LCAuNDM0IF0sIFsgLjkyMTYsIC40OTU4IF0sIFsgLjg5NjIsIC41NTcxIF0sIFsgLjg2NzksIC42MTc2IF0sIFsgLjgzNSwgLjY3NjkgXSwgWyAuNzk4NiwgLjczNDYgXSwgWyAuNzU5NywgLjc5MDMgXSwgWyAuNzE4NiwgLjg0MzUgXSwgWyAuNjczMiwgLjg5MzYgXSwgWyAuNjIxMywgLjkzOTQgXSwgWyAuNTcyMiwgLjk3NjEgXSwgWyAuNTMyMiwgMSBdIF07XG4gIHJvYmluc29uQ29uc3RhbnRzLmZvckVhY2goZnVuY3Rpb24oZCkge1xuICAgIGRbMV0gKj0gMS4wMTQ0O1xuICB9KTtcbiAgZnVuY3Rpb24gcm9iaW5zb24ozrssIM+GKSB7XG4gICAgdmFyIGkgPSBNYXRoLm1pbigxOCwgTWF0aC5hYnMoz4YpICogMzYgLyDPgCksIGkwID0gTWF0aC5mbG9vcihpKSwgZGkgPSBpIC0gaTAsIGF4ID0gKGsgPSByb2JpbnNvbkNvbnN0YW50c1tpMF0pWzBdLCBheSA9IGtbMV0sIGJ4ID0gKGsgPSByb2JpbnNvbkNvbnN0YW50c1srK2kwXSlbMF0sIGJ5ID0ga1sxXSwgY3ggPSAoayA9IHJvYmluc29uQ29uc3RhbnRzW01hdGgubWluKDE5LCArK2kwKV0pWzBdLCBjeSA9IGtbMV0sIGs7XG4gICAgcmV0dXJuIFsgzrsgKiAoYnggKyBkaSAqIChjeCAtIGF4KSAvIDIgKyBkaSAqIGRpICogKGN4IC0gMiAqIGJ4ICsgYXgpIC8gMiksICjPhiA+IDAgPyBoYWxmz4AgOiAtaGFsZs+AKSAqIChieSArIGRpICogKGN5IC0gYXkpIC8gMiArIGRpICogZGkgKiAoY3kgLSAyICogYnkgKyBheSkgLyAyKSBdO1xuICB9XG4gIHJvYmluc29uLmludmVydCA9IGZ1bmN0aW9uKHgsIHkpIHtcbiAgICB2YXIgeXkgPSB5IC8gaGFsZs+ALCDPhiA9IHl5ICogOTAsIGkgPSBNYXRoLm1pbigxOCwgTWF0aC5hYnMoz4YgLyA1KSksIGkwID0gTWF0aC5tYXgoMCwgTWF0aC5mbG9vcihpKSk7XG4gICAgZG8ge1xuICAgICAgdmFyIGF5ID0gcm9iaW5zb25Db25zdGFudHNbaTBdWzFdLCBieSA9IHJvYmluc29uQ29uc3RhbnRzW2kwICsgMV1bMV0sIGN5ID0gcm9iaW5zb25Db25zdGFudHNbTWF0aC5taW4oMTksIGkwICsgMildWzFdLCB1ID0gY3kgLSBheSwgdiA9IGN5IC0gMiAqIGJ5ICsgYXksIHQgPSAyICogKE1hdGguYWJzKHl5KSAtIGJ5KSAvIHUsIGMgPSB2IC8gdSwgZGkgPSB0ICogKDEgLSBjICogdCAqICgxIC0gMiAqIGMgKiB0KSk7XG4gICAgICBpZiAoZGkgPj0gMCB8fCBpMCA9PT0gMSkge1xuICAgICAgICDPhiA9ICh5ID49IDAgPyA1IDogLTUpICogKGRpICsgaSk7XG4gICAgICAgIHZhciBqID0gNTAsIM60O1xuICAgICAgICBkbyB7XG4gICAgICAgICAgaSA9IE1hdGgubWluKDE4LCBNYXRoLmFicyjPhikgLyA1KTtcbiAgICAgICAgICBpMCA9IE1hdGguZmxvb3IoaSk7XG4gICAgICAgICAgZGkgPSBpIC0gaTA7XG4gICAgICAgICAgYXkgPSByb2JpbnNvbkNvbnN0YW50c1tpMF1bMV07XG4gICAgICAgICAgYnkgPSByb2JpbnNvbkNvbnN0YW50c1tpMCArIDFdWzFdO1xuICAgICAgICAgIGN5ID0gcm9iaW5zb25Db25zdGFudHNbTWF0aC5taW4oMTksIGkwICsgMildWzFdO1xuICAgICAgICAgIM+GIC09ICjOtCA9ICh5ID49IDAgPyBoYWxmz4AgOiAtaGFsZs+AKSAqIChieSArIGRpICogKGN5IC0gYXkpIC8gMiArIGRpICogZGkgKiAoY3kgLSAyICogYnkgKyBheSkgLyAyKSAtIHkpICogZGVncmVlcztcbiAgICAgICAgfSB3aGlsZSAoTWF0aC5hYnMozrQpID4gzrUyICYmIC0taiA+IDApO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IHdoaWxlICgtLWkwID49IDApO1xuICAgIHZhciBheCA9IHJvYmluc29uQ29uc3RhbnRzW2kwXVswXSwgYnggPSByb2JpbnNvbkNvbnN0YW50c1tpMCArIDFdWzBdLCBjeCA9IHJvYmluc29uQ29uc3RhbnRzW01hdGgubWluKDE5LCBpMCArIDIpXVswXTtcbiAgICByZXR1cm4gWyB4IC8gKGJ4ICsgZGkgKiAoY3ggLSBheCkgLyAyICsgZGkgKiBkaSAqIChjeCAtIDIgKiBieCArIGF4KSAvIDIpLCDPhiAqIHJhZGlhbnMgXTtcbiAgfTtcbiAgKGQzLmdlby5yb2JpbnNvbiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwcm9qZWN0aW9uKHJvYmluc29uKTtcbiAgfSkucmF3ID0gcm9iaW5zb247XG4gIGZ1bmN0aW9uIHNpbnVzb2lkYWwozrssIM+GKSB7XG4gICAgcmV0dXJuIFsgzrsgKiBNYXRoLmNvcyjPhiksIM+GIF07XG4gIH1cbiAgc2ludXNvaWRhbC5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgcmV0dXJuIFsgeCAvIE1hdGguY29zKHkpLCB5IF07XG4gIH07XG4gIChkMy5nZW8uc2ludXNvaWRhbCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwcm9qZWN0aW9uKHNpbnVzb2lkYWwpO1xuICB9KS5yYXcgPSBzaW51c29pZGFsO1xuICBmdW5jdGlvbiBhaXRvZmYozrssIM+GKSB7XG4gICAgdmFyIGNvc8+GID0gTWF0aC5jb3Moz4YpLCBzaW5jac6xID0gc2luY2koYWNvcyhjb3PPhiAqIE1hdGguY29zKM67IC89IDIpKSk7XG4gICAgcmV0dXJuIFsgMiAqIGNvc8+GICogTWF0aC5zaW4ozrspICogc2luY2nOsSwgTWF0aC5zaW4oz4YpICogc2luY2nOsSBdO1xuICB9XG4gIGFpdG9mZi5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgaWYgKHggKiB4ICsgNCAqIHkgKiB5ID4gz4AgKiDPgCArIM61KSByZXR1cm47XG4gICAgdmFyIM67ID0geCwgz4YgPSB5LCBpID0gMjU7XG4gICAgZG8ge1xuICAgICAgdmFyIHNpbs67ID0gTWF0aC5zaW4ozrspLCBzaW7Ou18yID0gTWF0aC5zaW4ozrsgLyAyKSwgY29zzrtfMiA9IE1hdGguY29zKM67IC8gMiksIHNpbs+GID0gTWF0aC5zaW4oz4YpLCBjb3PPhiA9IE1hdGguY29zKM+GKSwgc2luXzLPhiA9IE1hdGguc2luKDIgKiDPhiksIHNpbjLPhiA9IHNpbs+GICogc2luz4YsIGNvczLPhiA9IGNvc8+GICogY29zz4YsIHNpbjLOu18yID0gc2luzrtfMiAqIHNpbs67XzIsIEMgPSAxIC0gY29zMs+GICogY29zzrtfMiAqIGNvc867XzIsIEUgPSBDID8gYWNvcyhjb3PPhiAqIGNvc867XzIpICogTWF0aC5zcXJ0KEYgPSAxIC8gQykgOiBGID0gMCwgRiwgZnggPSAyICogRSAqIGNvc8+GICogc2luzrtfMiAtIHgsIGZ5ID0gRSAqIHNpbs+GIC0geSwgzrR4zrTOuyA9IEYgKiAoY29zMs+GICogc2luMs67XzIgKyBFICogY29zz4YgKiBjb3POu18yICogc2luMs+GKSwgzrR4zrTPhiA9IEYgKiAoLjUgKiBzaW7OuyAqIHNpbl8yz4YgLSBFICogMiAqIHNpbs+GICogc2luzrtfMiksIM60ec60zrsgPSBGICogLjI1ICogKHNpbl8yz4YgKiBzaW7Ou18yIC0gRSAqIHNpbs+GICogY29zMs+GICogc2luzrspLCDOtHnOtM+GID0gRiAqIChzaW4yz4YgKiBjb3POu18yICsgRSAqIHNpbjLOu18yICogY29zz4YpLCBkZW5vbWluYXRvciA9IM60eM60z4YgKiDOtHnOtM67IC0gzrR5zrTPhiAqIM60eM60zrs7XG4gICAgICBpZiAoIWRlbm9taW5hdG9yKSBicmVhaztcbiAgICAgIHZhciDOtM67ID0gKGZ5ICogzrR4zrTPhiAtIGZ4ICogzrR5zrTPhikgLyBkZW5vbWluYXRvciwgzrTPhiA9IChmeCAqIM60ec60zrsgLSBmeSAqIM60eM60zrspIC8gZGVub21pbmF0b3I7XG4gICAgICDOuyAtPSDOtM67LCDPhiAtPSDOtM+GO1xuICAgIH0gd2hpbGUgKChNYXRoLmFicyjOtM67KSA+IM61IHx8IE1hdGguYWJzKM60z4YpID4gzrUpICYmIC0taSA+IDApO1xuICAgIHJldHVybiBbIM67LCDPhiBdO1xuICB9O1xuICAoZDMuZ2VvLmFpdG9mZiA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwcm9qZWN0aW9uKGFpdG9mZik7XG4gIH0pLnJhdyA9IGFpdG9mZjtcbiAgZnVuY3Rpb24gd2lua2VsMyjOuywgz4YpIHtcbiAgICB2YXIgY29vcmRpbmF0ZXMgPSBhaXRvZmYozrssIM+GKTtcbiAgICByZXR1cm4gWyAoY29vcmRpbmF0ZXNbMF0gKyDOuyAvIGhhbGbPgCkgLyAyLCAoY29vcmRpbmF0ZXNbMV0gKyDPhikgLyAyIF07XG4gIH1cbiAgd2lua2VsMy5pbnZlcnQgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgdmFyIM67ID0geCwgz4YgPSB5LCBpID0gMjU7XG4gICAgZG8ge1xuICAgICAgdmFyIGNvc8+GID0gTWF0aC5jb3Moz4YpLCBzaW7PhiA9IE1hdGguc2luKM+GKSwgc2luXzLPhiA9IE1hdGguc2luKDIgKiDPhiksIHNpbjLPhiA9IHNpbs+GICogc2luz4YsIGNvczLPhiA9IGNvc8+GICogY29zz4YsIHNpbs67ID0gTWF0aC5zaW4ozrspLCBjb3POu18yID0gTWF0aC5jb3MozrsgLyAyKSwgc2luzrtfMiA9IE1hdGguc2luKM67IC8gMiksIHNpbjLOu18yID0gc2luzrtfMiAqIHNpbs67XzIsIEMgPSAxIC0gY29zMs+GICogY29zzrtfMiAqIGNvc867XzIsIEUgPSBDID8gYWNvcyhjb3PPhiAqIGNvc867XzIpICogTWF0aC5zcXJ0KEYgPSAxIC8gQykgOiBGID0gMCwgRiwgZnggPSAuNSAqICgyICogRSAqIGNvc8+GICogc2luzrtfMiArIM67IC8gaGFsZs+AKSAtIHgsIGZ5ID0gLjUgKiAoRSAqIHNpbs+GICsgz4YpIC0geSwgzrR4zrTOuyA9IC41ICogRiAqIChjb3Myz4YgKiBzaW4yzrtfMiArIEUgKiBjb3PPhiAqIGNvc867XzIgKiBzaW4yz4YpICsgLjUgLyBoYWxmz4AsIM60eM60z4YgPSBGICogKHNpbs67ICogc2luXzLPhiAvIDQgLSBFICogc2luz4YgKiBzaW7Ou18yKSwgzrR5zrTOuyA9IC4xMjUgKiBGICogKHNpbl8yz4YgKiBzaW7Ou18yIC0gRSAqIHNpbs+GICogY29zMs+GICogc2luzrspLCDOtHnOtM+GID0gLjUgKiBGICogKHNpbjLPhiAqIGNvc867XzIgKyBFICogc2luMs67XzIgKiBjb3PPhikgKyAuNSwgZGVub21pbmF0b3IgPSDOtHjOtM+GICogzrR5zrTOuyAtIM60ec60z4YgKiDOtHjOtM67LCDOtM67ID0gKGZ5ICogzrR4zrTPhiAtIGZ4ICogzrR5zrTPhikgLyBkZW5vbWluYXRvciwgzrTPhiA9IChmeCAqIM60ec60zrsgLSBmeSAqIM60eM60zrspIC8gZGVub21pbmF0b3I7XG4gICAgICDOuyAtPSDOtM67LCDPhiAtPSDOtM+GO1xuICAgIH0gd2hpbGUgKChNYXRoLmFicyjOtM67KSA+IM61IHx8IE1hdGguYWJzKM60z4YpID4gzrUpICYmIC0taSA+IDApO1xuICAgIHJldHVybiBbIM67LCDPhiBdO1xuICB9O1xuICAoZDMuZ2VvLndpbmtlbDMgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcHJvamVjdGlvbih3aW5rZWwzKTtcbiAgfSkucmF3ID0gd2lua2VsMztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBhZGRQcm9qZWN0aW9uc1RvRDM7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG5cbnZhciByYWRpYW5zID0gTWF0aC5QSSAvIDE4MDtcbnZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcbnZhciB6b29tc3RhcnRTdHlsZSA9IHtjdXJzb3I6ICdwb2ludGVyJ307XG52YXIgem9vbWVuZFN0eWxlID0ge2N1cnNvcjogJ2F1dG8nfTtcblxuZnVuY3Rpb24gY3JlYXRlR2VvWm9vbShnZW8sIGdlb0xheW91dCkge1xuICAgIHZhciBwcm9qZWN0aW9uID0gZ2VvLnByb2plY3Rpb247XG4gICAgdmFyIHpvb21Db25zdHJ1Y3RvcjtcblxuICAgIGlmKGdlb0xheW91dC5faXNTY29wZWQpIHtcbiAgICAgICAgem9vbUNvbnN0cnVjdG9yID0gem9vbVNjb3BlZDtcbiAgICB9IGVsc2UgaWYoZ2VvTGF5b3V0Ll9pc0NsaXBwZWQpIHtcbiAgICAgICAgem9vbUNvbnN0cnVjdG9yID0gem9vbUNsaXBwZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgem9vbUNvbnN0cnVjdG9yID0gem9vbU5vbkNsaXBwZWQ7XG4gICAgfVxuXG4gICAgLy8gVE9ETyBhZGQgYSBjb25pYy1zcGVjaWZpYyB6b29tXG5cbiAgICByZXR1cm4gem9vbUNvbnN0cnVjdG9yKGdlbywgcHJvamVjdGlvbik7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlR2VvWm9vbTtcblxuLy8gY29tbW9uIHRvIGFsbCB6b29tIHR5cGVzXG5mdW5jdGlvbiBpbml0Wm9vbShnZW8sIHByb2plY3Rpb24pIHtcbiAgICByZXR1cm4gZDMuYmVoYXZpb3Iuem9vbSgpXG4gICAgICAgIC50cmFuc2xhdGUocHJvamVjdGlvbi50cmFuc2xhdGUoKSlcbiAgICAgICAgLnNjYWxlKHByb2plY3Rpb24uc2NhbGUoKSk7XG59XG5cbi8vIHN5bmMgem9vbSB1cGRhdGVzIHdpdGggdXNlciAmIGZ1bGwgbGF5b3V0XG5mdW5jdGlvbiBzeW5jKGdlbywgcHJvamVjdGlvbiwgY2IpIHtcbiAgICB2YXIgaWQgPSBnZW8uaWQ7XG4gICAgdmFyIGdkID0gZ2VvLmdyYXBoRGl2O1xuICAgIHZhciBsYXlvdXQgPSBnZC5sYXlvdXQ7XG4gICAgdmFyIHVzZXJPcHRzID0gbGF5b3V0W2lkXTtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBmdWxsT3B0cyA9IGZ1bGxMYXlvdXRbaWRdO1xuXG4gICAgdmFyIHByZUdVSSA9IHt9O1xuICAgIHZhciBldmVudERhdGEgPSB7fTtcblxuICAgIGZ1bmN0aW9uIHNldChwcm9wU3RyLCB2YWwpIHtcbiAgICAgICAgcHJlR1VJW2lkICsgJy4nICsgcHJvcFN0cl0gPSBMaWIubmVzdGVkUHJvcGVydHkodXNlck9wdHMsIHByb3BTdHIpLmdldCgpO1xuICAgICAgICBSZWdpc3RyeS5jYWxsKCdfc3RvcmVEaXJlY3RHVUlFZGl0JywgbGF5b3V0LCBmdWxsTGF5b3V0Ll9wcmVHVUksIHByZUdVSSk7XG5cbiAgICAgICAgdmFyIGZ1bGxOcCA9IExpYi5uZXN0ZWRQcm9wZXJ0eShmdWxsT3B0cywgcHJvcFN0cik7XG4gICAgICAgIGlmKGZ1bGxOcC5nZXQoKSAhPT0gdmFsKSB7XG4gICAgICAgICAgICBmdWxsTnAuc2V0KHZhbCk7XG4gICAgICAgICAgICBMaWIubmVzdGVkUHJvcGVydHkodXNlck9wdHMsIHByb3BTdHIpLnNldCh2YWwpO1xuICAgICAgICAgICAgZXZlbnREYXRhW2lkICsgJy4nICsgcHJvcFN0cl0gPSB2YWw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjYihzZXQpO1xuICAgIHNldCgncHJvamVjdGlvbi5zY2FsZScsIHByb2plY3Rpb24uc2NhbGUoKSAvIGdlby5maXRTY2FsZSk7XG4gICAgc2V0KCdmaXRib3VuZHMnLCBmYWxzZSk7XG4gICAgZ2QuZW1pdCgncGxvdGx5X3JlbGF5b3V0JywgZXZlbnREYXRhKTtcbn1cblxuLy8gem9vbSBmb3Igc2NvcGVkIHByb2plY3Rpb25zXG5mdW5jdGlvbiB6b29tU2NvcGVkKGdlbywgcHJvamVjdGlvbikge1xuICAgIHZhciB6b29tID0gaW5pdFpvb20oZ2VvLCBwcm9qZWN0aW9uKTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZVpvb21zdGFydCgpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKHpvb21zdGFydFN0eWxlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVab29tKCkge1xuICAgICAgICBwcm9qZWN0aW9uXG4gICAgICAgICAgICAuc2NhbGUoZDMuZXZlbnQuc2NhbGUpXG4gICAgICAgICAgICAudHJhbnNsYXRlKGQzLmV2ZW50LnRyYW5zbGF0ZSk7XG4gICAgICAgIGdlby5yZW5kZXIoKTtcblxuICAgICAgICB2YXIgY2VudGVyID0gcHJvamVjdGlvbi5pbnZlcnQoZ2VvLm1pZFB0KTtcbiAgICAgICAgZ2VvLmdyYXBoRGl2LmVtaXQoJ3Bsb3RseV9yZWxheW91dGluZycsIHtcbiAgICAgICAgICAgICdnZW8ucHJvamVjdGlvbi5zY2FsZSc6IHByb2plY3Rpb24uc2NhbGUoKSAvIGdlby5maXRTY2FsZSxcbiAgICAgICAgICAgICdnZW8uY2VudGVyLmxvbic6IGNlbnRlclswXSxcbiAgICAgICAgICAgICdnZW8uY2VudGVyLmxhdCc6IGNlbnRlclsxXVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzeW5jQ2Ioc2V0KSB7XG4gICAgICAgIHZhciBjZW50ZXIgPSBwcm9qZWN0aW9uLmludmVydChnZW8ubWlkUHQpO1xuXG4gICAgICAgIHNldCgnY2VudGVyLmxvbicsIGNlbnRlclswXSk7XG4gICAgICAgIHNldCgnY2VudGVyLmxhdCcsIGNlbnRlclsxXSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaGFuZGxlWm9vbWVuZCgpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKHpvb21lbmRTdHlsZSk7XG4gICAgICAgIHN5bmMoZ2VvLCBwcm9qZWN0aW9uLCBzeW5jQ2IpO1xuICAgIH1cblxuICAgIHpvb21cbiAgICAgICAgLm9uKCd6b29tc3RhcnQnLCBoYW5kbGVab29tc3RhcnQpXG4gICAgICAgIC5vbignem9vbScsIGhhbmRsZVpvb20pXG4gICAgICAgIC5vbignem9vbWVuZCcsIGhhbmRsZVpvb21lbmQpO1xuXG4gICAgcmV0dXJuIHpvb207XG59XG5cbi8vIHpvb20gZm9yIG5vbi1jbGlwcGVkIHByb2plY3Rpb25zXG5mdW5jdGlvbiB6b29tTm9uQ2xpcHBlZChnZW8sIHByb2plY3Rpb24pIHtcbiAgICB2YXIgem9vbSA9IGluaXRab29tKGdlbywgcHJvamVjdGlvbik7XG5cbiAgICB2YXIgSU5TSURFVE9MT1JBTkNFUFhTID0gMjtcblxuICAgIHZhciBtb3VzZTAsIHJvdGF0ZTAsIHRyYW5zbGF0ZTAsIGxhc3RSb3RhdGUsIHpvb21Qb2ludCxcbiAgICAgICAgbW91c2UxLCByb3RhdGUxLCBwb2ludDEsIGRpZFpvb207XG5cbiAgICBmdW5jdGlvbiBwb3NpdGlvbih4KSB7IHJldHVybiBwcm9qZWN0aW9uLmludmVydCh4KTsgfVxuXG4gICAgZnVuY3Rpb24gb3V0c2lkZSh4KSB7XG4gICAgICAgIHZhciBwb3MgPSBwb3NpdGlvbih4KTtcbiAgICAgICAgaWYoIXBvcykgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgdmFyIHB0ID0gcHJvamVjdGlvbihwb3MpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgTWF0aC5hYnMocHRbMF0gLSB4WzBdKSA+IElOU0lERVRPTE9SQU5DRVBYUyB8fFxuICAgICAgICAgICAgTWF0aC5hYnMocHRbMV0gLSB4WzFdKSA+IElOU0lERVRPTE9SQU5DRVBYU1xuICAgICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVpvb21zdGFydCgpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKHpvb21zdGFydFN0eWxlKTtcblxuICAgICAgICBtb3VzZTAgPSBkMy5tb3VzZSh0aGlzKTtcbiAgICAgICAgcm90YXRlMCA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgIHRyYW5zbGF0ZTAgPSBwcm9qZWN0aW9uLnRyYW5zbGF0ZSgpO1xuICAgICAgICBsYXN0Um90YXRlID0gcm90YXRlMDtcbiAgICAgICAgem9vbVBvaW50ID0gcG9zaXRpb24obW91c2UwKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVab29tKCkge1xuICAgICAgICBtb3VzZTEgPSBkMy5tb3VzZSh0aGlzKTtcblxuICAgICAgICBpZihvdXRzaWRlKG1vdXNlMCkpIHtcbiAgICAgICAgICAgIHpvb20uc2NhbGUocHJvamVjdGlvbi5zY2FsZSgpKTtcbiAgICAgICAgICAgIHpvb20udHJhbnNsYXRlKHByb2plY3Rpb24udHJhbnNsYXRlKCkpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvamVjdGlvbi5zY2FsZShkMy5ldmVudC5zY2FsZSk7XG4gICAgICAgIHByb2plY3Rpb24udHJhbnNsYXRlKFt0cmFuc2xhdGUwWzBdLCBkMy5ldmVudC50cmFuc2xhdGVbMV1dKTtcblxuICAgICAgICBpZighem9vbVBvaW50KSB7XG4gICAgICAgICAgICBtb3VzZTAgPSBtb3VzZTE7XG4gICAgICAgICAgICB6b29tUG9pbnQgPSBwb3NpdGlvbihtb3VzZTApO1xuICAgICAgICB9IGVsc2UgaWYocG9zaXRpb24obW91c2UxKSkge1xuICAgICAgICAgICAgcG9pbnQxID0gcG9zaXRpb24obW91c2UxKTtcbiAgICAgICAgICAgIHJvdGF0ZTEgPSBbbGFzdFJvdGF0ZVswXSArIChwb2ludDFbMF0gLSB6b29tUG9pbnRbMF0pLCByb3RhdGUwWzFdLCByb3RhdGUwWzJdXTtcbiAgICAgICAgICAgIHByb2plY3Rpb24ucm90YXRlKHJvdGF0ZTEpO1xuICAgICAgICAgICAgbGFzdFJvdGF0ZSA9IHJvdGF0ZTE7XG4gICAgICAgIH1cblxuICAgICAgICBkaWRab29tID0gdHJ1ZTtcbiAgICAgICAgZ2VvLnJlbmRlcigpO1xuXG4gICAgICAgIHZhciByb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuICAgICAgICB2YXIgY2VudGVyID0gcHJvamVjdGlvbi5pbnZlcnQoZ2VvLm1pZFB0KTtcbiAgICAgICAgZ2VvLmdyYXBoRGl2LmVtaXQoJ3Bsb3RseV9yZWxheW91dGluZycsIHtcbiAgICAgICAgICAgICdnZW8ucHJvamVjdGlvbi5zY2FsZSc6IHByb2plY3Rpb24uc2NhbGUoKSAvIGdlby5maXRTY2FsZSxcbiAgICAgICAgICAgICdnZW8uY2VudGVyLmxvbic6IGNlbnRlclswXSxcbiAgICAgICAgICAgICdnZW8uY2VudGVyLmxhdCc6IGNlbnRlclsxXSxcbiAgICAgICAgICAgICdnZW8ucHJvamVjdGlvbi5yb3RhdGlvbi5sb24nOiAtcm90YXRlWzBdXG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGhhbmRsZVpvb21lbmQoKSB7XG4gICAgICAgIGQzLnNlbGVjdCh0aGlzKS5zdHlsZSh6b29tZW5kU3R5bGUpO1xuICAgICAgICBpZihkaWRab29tKSBzeW5jKGdlbywgcHJvamVjdGlvbiwgc3luY0NiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzeW5jQ2Ioc2V0KSB7XG4gICAgICAgIHZhciByb3RhdGUgPSBwcm9qZWN0aW9uLnJvdGF0ZSgpO1xuICAgICAgICB2YXIgY2VudGVyID0gcHJvamVjdGlvbi5pbnZlcnQoZ2VvLm1pZFB0KTtcblxuICAgICAgICBzZXQoJ3Byb2plY3Rpb24ucm90YXRpb24ubG9uJywgLXJvdGF0ZVswXSk7XG4gICAgICAgIHNldCgnY2VudGVyLmxvbicsIGNlbnRlclswXSk7XG4gICAgICAgIHNldCgnY2VudGVyLmxhdCcsIGNlbnRlclsxXSk7XG4gICAgfVxuXG4gICAgem9vbVxuICAgICAgICAub24oJ3pvb21zdGFydCcsIGhhbmRsZVpvb21zdGFydClcbiAgICAgICAgLm9uKCd6b29tJywgaGFuZGxlWm9vbSlcbiAgICAgICAgLm9uKCd6b29tZW5kJywgaGFuZGxlWm9vbWVuZCk7XG5cbiAgICByZXR1cm4gem9vbTtcbn1cblxuLy8gem9vbSBmb3IgY2xpcHBlZCBwcm9qZWN0aW9uc1xuLy8gaW5zcGlyZWQgYnkgaHR0cHM6Ly93d3cuamFzb25kYXZpZXMuY29tL21hcHMvZDMuZ2VvLnpvb20uanNcbmZ1bmN0aW9uIHpvb21DbGlwcGVkKGdlbywgcHJvamVjdGlvbikge1xuICAgIHZhciB2aWV3ID0ge3I6IHByb2plY3Rpb24ucm90YXRlKCksIGs6IHByb2plY3Rpb24uc2NhbGUoKX07XG4gICAgdmFyIHpvb20gPSBpbml0Wm9vbShnZW8sIHByb2plY3Rpb24pO1xuICAgIHZhciBldmVudCA9IGQzZXZlbnREaXNwYXRjaCh6b29tLCAnem9vbXN0YXJ0JywgJ3pvb20nLCAnem9vbWVuZCcpO1xuICAgIHZhciB6b29taW5nID0gMDtcbiAgICB2YXIgem9vbU9uID0gem9vbS5vbjtcblxuICAgIHZhciB6b29tUG9pbnQ7XG5cbiAgICB6b29tLm9uKCd6b29tc3RhcnQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKHpvb21zdGFydFN0eWxlKTtcblxuICAgICAgICB2YXIgbW91c2UwID0gZDMubW91c2UodGhpcyk7XG4gICAgICAgIHZhciByb3RhdGUwID0gcHJvamVjdGlvbi5yb3RhdGUoKTtcbiAgICAgICAgdmFyIGxhc3RSb3RhdGUgPSByb3RhdGUwO1xuICAgICAgICB2YXIgdHJhbnNsYXRlMCA9IHByb2plY3Rpb24udHJhbnNsYXRlKCk7XG4gICAgICAgIHZhciBxID0gcXVhdGVybmlvbkZyb21FdWxlcihyb3RhdGUwKTtcblxuICAgICAgICB6b29tUG9pbnQgPSBwb3NpdGlvbihwcm9qZWN0aW9uLCBtb3VzZTApO1xuXG4gICAgICAgIHpvb21Pbi5jYWxsKHpvb20sICd6b29tJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbW91c2UxID0gZDMubW91c2UodGhpcyk7XG5cbiAgICAgICAgICAgIHByb2plY3Rpb24uc2NhbGUodmlldy5rID0gZDMuZXZlbnQuc2NhbGUpO1xuXG4gICAgICAgICAgICBpZighem9vbVBvaW50KSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gem9vbVBvaW50LCB0aGUgbW91c2Ugd2Fzbid0IG92ZXIgdGhlIGFjdHVhbCBnZW9ncmFwaHkgeWV0XG4gICAgICAgICAgICAgICAgLy8gbWF5YmUgdGhpcyBwb2ludCBpcyB0aGUgc3RhcnQuLi4gd2UnbGwgZmluZCBvdXQgbmV4dCB0aW1lIVxuICAgICAgICAgICAgICAgIG1vdXNlMCA9IG1vdXNlMTtcbiAgICAgICAgICAgICAgICB6b29tUG9pbnQgPSBwb3NpdGlvbihwcm9qZWN0aW9uLCBtb3VzZTApO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHBvc2l0aW9uKHByb2plY3Rpb24sIG1vdXNlMSkpIHtcbiAgICAgICAgICAgICAgICAvLyBjaGVjayBpZiB0aGUgcG9pbnQgaXMgb24gdGhlIG1hcFxuICAgICAgICAgICAgICAgIC8vIGlmIG5vdCwgZG9uJ3QgZG8gYW55dGhpbmcgbmV3IGJ1dCBzY2FsZVxuICAgICAgICAgICAgICAgIC8vIGlmIGl0IGlzLCB0aGVuIHdlIGNhbiBhc3N1bWUgYmV0d2VlbiB3aWxsIGV4aXN0IGJlbG93XG4gICAgICAgICAgICAgICAgLy8gc28gd2UgZG9uJ3QgbmVlZCB0aGUgJ2JhbmsnIGZ1bmN0aW9uLCB3aGF0ZXZlciB0aGF0IGlzLlxuXG4gICAgICAgICAgICAgICAgLy8gZ28gYmFjayB0byBvcmlnaW5hbCBwcm9qZWN0aW9uIHRlbXBvcmFyaWx5XG4gICAgICAgICAgICAgICAgLy8gZXhjZXB0IGZvciBzY2FsZS4uLiB0aGF0J3Mga2luZCBvZiBpbmRlcGVuZGVudD9cbiAgICAgICAgICAgICAgICBwcm9qZWN0aW9uXG4gICAgICAgICAgICAgICAgICAgIC5yb3RhdGUocm90YXRlMClcbiAgICAgICAgICAgICAgICAgICAgLnRyYW5zbGF0ZSh0cmFuc2xhdGUwKTtcblxuICAgICAgICAgICAgICAgIC8vIGNhbGN1bGF0ZSB0aGUgbmV3IHBhcmFtc1xuICAgICAgICAgICAgICAgIHZhciBwb2ludDEgPSBwb3NpdGlvbihwcm9qZWN0aW9uLCBtb3VzZTEpO1xuICAgICAgICAgICAgICAgIHZhciBiZXR3ZWVuID0gcm90YXRlQmV0d2Vlbih6b29tUG9pbnQsIHBvaW50MSk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld0V1bGVyID0gZXVsZXJGcm9tUXVhdGVybmlvbihtdWx0aXBseShxLCBiZXR3ZWVuKSk7XG4gICAgICAgICAgICAgICAgdmFyIHJvdGF0ZUFuZ2xlcyA9IHZpZXcuciA9IHVuUm9sbChuZXdFdWxlciwgem9vbVBvaW50LCBsYXN0Um90YXRlKTtcblxuICAgICAgICAgICAgICAgIGlmKCFpc0Zpbml0ZShyb3RhdGVBbmdsZXNbMF0pIHx8ICFpc0Zpbml0ZShyb3RhdGVBbmdsZXNbMV0pIHx8XG4gICAgICAgICAgICAgICAgICAgIWlzRmluaXRlKHJvdGF0ZUFuZ2xlc1syXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcm90YXRlQW5nbGVzID0gbGFzdFJvdGF0ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHByb2plY3Rpb25cbiAgICAgICAgICAgICAgICBwcm9qZWN0aW9uLnJvdGF0ZShyb3RhdGVBbmdsZXMpO1xuICAgICAgICAgICAgICAgIGxhc3RSb3RhdGUgPSByb3RhdGVBbmdsZXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHpvb21lZChldmVudC5vZih0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgem9vbXN0YXJ0ZWQoZXZlbnQub2YodGhpcywgYXJndW1lbnRzKSk7XG4gICAgfSlcbiAgICAub24oJ3pvb21lbmQnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnN0eWxlKHpvb21lbmRTdHlsZSk7XG4gICAgICAgIHpvb21Pbi5jYWxsKHpvb20sICd6b29tJywgbnVsbCk7XG4gICAgICAgIHpvb21lbmRlZChldmVudC5vZih0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgICAgc3luYyhnZW8sIHByb2plY3Rpb24sIHN5bmNDYik7XG4gICAgfSlcbiAgICAub24oJ3pvb20ucmVkcmF3JywgZnVuY3Rpb24oKSB7XG4gICAgICAgIGdlby5yZW5kZXIoKTtcblxuICAgICAgICB2YXIgX3JvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgIGdlby5ncmFwaERpdi5lbWl0KCdwbG90bHlfcmVsYXlvdXRpbmcnLCB7XG4gICAgICAgICAgICAnZ2VvLnByb2plY3Rpb24uc2NhbGUnOiBwcm9qZWN0aW9uLnNjYWxlKCkgLyBnZW8uZml0U2NhbGUsXG4gICAgICAgICAgICAnZ2VvLnByb2plY3Rpb24ucm90YXRpb24ubG9uJzogLV9yb3RhdGVbMF0sXG4gICAgICAgICAgICAnZ2VvLnByb2plY3Rpb24ucm90YXRpb24ubGF0JzogLV9yb3RhdGVbMV1cbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiB6b29tc3RhcnRlZChkaXNwYXRjaCkge1xuICAgICAgICBpZighem9vbWluZysrKSBkaXNwYXRjaCh7dHlwZTogJ3pvb21zdGFydCd9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6b29tZWQoZGlzcGF0Y2gpIHtcbiAgICAgICAgZGlzcGF0Y2goe3R5cGU6ICd6b29tJ30pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHpvb21lbmRlZChkaXNwYXRjaCkge1xuICAgICAgICBpZighLS16b29taW5nKSBkaXNwYXRjaCh7dHlwZTogJ3pvb21lbmQnfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3luY0NiKHNldCkge1xuICAgICAgICB2YXIgX3JvdGF0ZSA9IHByb2plY3Rpb24ucm90YXRlKCk7XG4gICAgICAgIHNldCgncHJvamVjdGlvbi5yb3RhdGlvbi5sb24nLCAtX3JvdGF0ZVswXSk7XG4gICAgICAgIHNldCgncHJvamVjdGlvbi5yb3RhdGlvbi5sYXQnLCAtX3JvdGF0ZVsxXSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGQzLnJlYmluZCh6b29tLCBldmVudCwgJ29uJyk7XG59XG5cbi8vIC0tIGhlbHBlciBmdW5jdGlvbnMgZm9yIHpvb21DbGlwcGVkXG5cbmZ1bmN0aW9uIHBvc2l0aW9uKHByb2plY3Rpb24sIHBvaW50KSB7XG4gICAgdmFyIHNwaGVyaWNhbCA9IHByb2plY3Rpb24uaW52ZXJ0KHBvaW50KTtcbiAgICByZXR1cm4gc3BoZXJpY2FsICYmIGlzRmluaXRlKHNwaGVyaWNhbFswXSkgJiYgaXNGaW5pdGUoc3BoZXJpY2FsWzFdKSAmJiBjYXJ0ZXNpYW4oc3BoZXJpY2FsKTtcbn1cblxuZnVuY3Rpb24gcXVhdGVybmlvbkZyb21FdWxlcihldWxlcikge1xuICAgIHZhciBsYW1iZGEgPSAwLjUgKiBldWxlclswXSAqIHJhZGlhbnM7XG4gICAgdmFyIHBoaSA9IDAuNSAqIGV1bGVyWzFdICogcmFkaWFucztcbiAgICB2YXIgZ2FtbWEgPSAwLjUgKiBldWxlclsyXSAqIHJhZGlhbnM7XG4gICAgdmFyIHNpbkxhbWJkYSA9IE1hdGguc2luKGxhbWJkYSk7XG4gICAgdmFyIGNvc0xhbWJkYSA9IE1hdGguY29zKGxhbWJkYSk7XG4gICAgdmFyIHNpblBoaSA9IE1hdGguc2luKHBoaSk7XG4gICAgdmFyIGNvc1BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgdmFyIHNpbkdhbW1hID0gTWF0aC5zaW4oZ2FtbWEpO1xuICAgIHZhciBjb3NHYW1tYSA9IE1hdGguY29zKGdhbW1hKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBjb3NMYW1iZGEgKiBjb3NQaGkgKiBjb3NHYW1tYSArIHNpbkxhbWJkYSAqIHNpblBoaSAqIHNpbkdhbW1hLFxuICAgICAgICBzaW5MYW1iZGEgKiBjb3NQaGkgKiBjb3NHYW1tYSAtIGNvc0xhbWJkYSAqIHNpblBoaSAqIHNpbkdhbW1hLFxuICAgICAgICBjb3NMYW1iZGEgKiBzaW5QaGkgKiBjb3NHYW1tYSArIHNpbkxhbWJkYSAqIGNvc1BoaSAqIHNpbkdhbW1hLFxuICAgICAgICBjb3NMYW1iZGEgKiBjb3NQaGkgKiBzaW5HYW1tYSAtIHNpbkxhbWJkYSAqIHNpblBoaSAqIGNvc0dhbW1hXG4gICAgXTtcbn1cblxuZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikge1xuICAgIHZhciBhMCA9IGFbMF07XG4gICAgdmFyIGExID0gYVsxXTtcbiAgICB2YXIgYTIgPSBhWzJdO1xuICAgIHZhciBhMyA9IGFbM107XG4gICAgdmFyIGIwID0gYlswXTtcbiAgICB2YXIgYjEgPSBiWzFdO1xuICAgIHZhciBiMiA9IGJbMl07XG4gICAgdmFyIGIzID0gYlszXTtcbiAgICByZXR1cm4gW1xuICAgICAgICBhMCAqIGIwIC0gYTEgKiBiMSAtIGEyICogYjIgLSBhMyAqIGIzLFxuICAgICAgICBhMCAqIGIxICsgYTEgKiBiMCArIGEyICogYjMgLSBhMyAqIGIyLFxuICAgICAgICBhMCAqIGIyIC0gYTEgKiBiMyArIGEyICogYjAgKyBhMyAqIGIxLFxuICAgICAgICBhMCAqIGIzICsgYTEgKiBiMiAtIGEyICogYjEgKyBhMyAqIGIwXG4gICAgXTtcbn1cblxuZnVuY3Rpb24gcm90YXRlQmV0d2VlbihhLCBiKSB7XG4gICAgaWYoIWEgfHwgIWIpIHJldHVybjtcbiAgICB2YXIgYXhpcyA9IGNyb3NzKGEsIGIpO1xuICAgIHZhciBub3JtID0gTWF0aC5zcXJ0KGRvdChheGlzLCBheGlzKSk7XG4gICAgdmFyIGhhbGZnYW1tYSA9IDAuNSAqIE1hdGguYWNvcyhNYXRoLm1heCgtMSwgTWF0aC5taW4oMSwgZG90KGEsIGIpKSkpO1xuICAgIHZhciBrID0gTWF0aC5zaW4oaGFsZmdhbW1hKSAvIG5vcm07XG4gICAgcmV0dXJuIG5vcm0gJiYgW01hdGguY29zKGhhbGZnYW1tYSksIGF4aXNbMl0gKiBrLCAtYXhpc1sxXSAqIGssIGF4aXNbMF0gKiBrXTtcbn1cblxuLy8gaW5wdXQ6XG4vLyAgIHJvdGF0ZUFuZ2xlczogYSBjYWxjdWxhdGVkIHNldCBvZiBFdWxlciBhbmdsZXNcbi8vICAgcHQ6IGEgcG9pbnQgKGNhcnRlc2lhbiBpbiAzLXNwYWNlKSB0byBrZWVwIGZpeGVkXG4vLyAgIHJvbGwwOiBhbiBpbml0aWFsIHJvbGwsIHRvIGJlIHByZXNlcnZlZFxuLy8gb3V0cHV0OlxuLy8gICBhIHNldCBvZiBFdWxlciBhbmdsZXMgdGhhdCBwcmVzZXJ2ZSB0aGUgcHJvamVjdGlvbiBvZiBwdFxuLy8gICAgIGJ1dCBzZXQgcm9sbCAob3V0cHV0WzJdKSBlcXVhbCB0byByb2xsMFxuLy8gICAgIG5vdGUgdGhhdCB0aGlzIGRvZXNuJ3QgZGVwZW5kIG9uIHRoZSBwYXJ0aWN1bGFyIHByb2plY3Rpb24sXG4vLyAgICAganVzdCBvbiB0aGUgcm90YXRpb24gYW5nbGVzXG5mdW5jdGlvbiB1blJvbGwocm90YXRlQW5nbGVzLCBwdCwgbGFzdFJvdGF0ZSkge1xuICAgIC8vIGNhbGN1bGF0ZSB0aGUgZml4ZWQgcG9pbnQgdHJhbnNmb3JtZWQgYnkgdGhlc2UgRXVsZXIgYW5nbGVzXG4gICAgLy8gYnV0IHdpdGggdGhlIGRlc2lyZWQgcm9sbCB1bmRvbmVcbiAgICB2YXIgcHRSb3RhdGVkID0gcm90YXRlQ2FydGVzaWFuKHB0LCAyLCByb3RhdGVBbmdsZXNbMF0pO1xuICAgIHB0Um90YXRlZCA9IHJvdGF0ZUNhcnRlc2lhbihwdFJvdGF0ZWQsIDEsIHJvdGF0ZUFuZ2xlc1sxXSk7XG4gICAgcHRSb3RhdGVkID0gcm90YXRlQ2FydGVzaWFuKHB0Um90YXRlZCwgMCwgcm90YXRlQW5nbGVzWzJdIC0gbGFzdFJvdGF0ZVsyXSk7XG5cbiAgICB2YXIgeCA9IHB0WzBdO1xuICAgIHZhciB5ID0gcHRbMV07XG4gICAgdmFyIHogPSBwdFsyXTtcbiAgICB2YXIgZiA9IHB0Um90YXRlZFswXTtcbiAgICB2YXIgZyA9IHB0Um90YXRlZFsxXTtcbiAgICB2YXIgaCA9IHB0Um90YXRlZFsyXTtcblxuICAgIC8vIHRoZSBmb2xsb3dpbmcgZXNzZW50aWFsbHkgc29sdmVzOlxuICAgIC8vIHB0Um90YXRlZCA9IHJvdGF0ZUNhcnRlc2lhbihyb3RhdGVDYXJ0ZXNpYW4ocHQsIDIsIG5ld1lhdyksIDEsIG5ld1BpdGNoKVxuICAgIC8vIGZvciBuZXdZYXcgYW5kIG5ld1BpdGNoLCBhcyBiZXN0IGl0IGNhblxuICAgIHZhciB0aGV0YSA9IE1hdGguYXRhbjIoeSwgeCkgKiBkZWdyZWVzO1xuICAgIHZhciBhID0gTWF0aC5zcXJ0KHggKiB4ICsgeSAqIHkpO1xuICAgIHZhciBiO1xuICAgIHZhciBuZXdZYXcxO1xuXG4gICAgaWYoTWF0aC5hYnMoZykgPiBhKSB7XG4gICAgICAgIG5ld1lhdzEgPSAoZyA+IDAgPyA5MCA6IC05MCkgLSB0aGV0YTtcbiAgICAgICAgYiA9IDA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbmV3WWF3MSA9IE1hdGguYXNpbihnIC8gYSkgKiBkZWdyZWVzIC0gdGhldGE7XG4gICAgICAgIGIgPSBNYXRoLnNxcnQoYSAqIGEgLSBnICogZyk7XG4gICAgfVxuXG4gICAgdmFyIG5ld1lhdzIgPSAxODAgLSBuZXdZYXcxIC0gMiAqIHRoZXRhO1xuICAgIHZhciBuZXdQaXRjaDEgPSAoTWF0aC5hdGFuMihoLCBmKSAtIE1hdGguYXRhbjIoeiwgYikpICogZGVncmVlcztcbiAgICB2YXIgbmV3UGl0Y2gyID0gKE1hdGguYXRhbjIoaCwgZikgLSBNYXRoLmF0YW4yKHosIC1iKSkgKiBkZWdyZWVzO1xuXG4gICAgLy8gd2hpY2ggaXMgY2xvc2VzdCB0byBsYXN0Um90YXRlWzAsMV06IG5ld1lhdy9QaXRjaCBvciBuZXdZYXcyL1BpdGNoMj9cbiAgICB2YXIgZGlzdDEgPSBhbmdsZURpc3RhbmNlKGxhc3RSb3RhdGVbMF0sIGxhc3RSb3RhdGVbMV0sIG5ld1lhdzEsIG5ld1BpdGNoMSk7XG4gICAgdmFyIGRpc3QyID0gYW5nbGVEaXN0YW5jZShsYXN0Um90YXRlWzBdLCBsYXN0Um90YXRlWzFdLCBuZXdZYXcyLCBuZXdQaXRjaDIpO1xuXG4gICAgaWYoZGlzdDEgPD0gZGlzdDIpIHJldHVybiBbbmV3WWF3MSwgbmV3UGl0Y2gxLCBsYXN0Um90YXRlWzJdXTtcbiAgICBlbHNlIHJldHVybiBbbmV3WWF3MiwgbmV3UGl0Y2gyLCBsYXN0Um90YXRlWzJdXTtcbn1cblxuZnVuY3Rpb24gYW5nbGVEaXN0YW5jZSh5YXcwLCBwaXRjaDAsIHlhdzEsIHBpdGNoMSkge1xuICAgIHZhciBkWWF3ID0gYW5nbGVNb2QoeWF3MSAtIHlhdzApO1xuICAgIHZhciBkUGl0Y2ggPSBhbmdsZU1vZChwaXRjaDEgLSBwaXRjaDApO1xuICAgIHJldHVybiBNYXRoLnNxcnQoZFlhdyAqIGRZYXcgKyBkUGl0Y2ggKiBkUGl0Y2gpO1xufVxuXG4vLyByZWR1Y2UgYW4gYW5nbGUgaW4gZGVncmVlcyB0byBbLTE4MCwxODBdXG5mdW5jdGlvbiBhbmdsZU1vZChhbmdsZSkge1xuICAgIHJldHVybiAoYW5nbGUgJSAzNjAgKyA1NDApICUgMzYwIC0gMTgwO1xufVxuXG4vLyByb3RhdGUgYSBjYXJ0ZXNpYW4gdmVjdG9yXG4vLyBheGlzIGlzIDAgKHgpLCAxICh5KSwgb3IgMiAoeilcbi8vIGFuZ2xlIGlzIGluIGRlZ3JlZXNcbmZ1bmN0aW9uIHJvdGF0ZUNhcnRlc2lhbih2ZWN0b3IsIGF4aXMsIGFuZ2xlKSB7XG4gICAgdmFyIGFuZ2xlUmFkcyA9IGFuZ2xlICogcmFkaWFucztcbiAgICB2YXIgdmVjdG9yT3V0ID0gdmVjdG9yLnNsaWNlKCk7XG4gICAgdmFyIGF4MSA9IChheGlzID09PSAwKSA/IDEgOiAwO1xuICAgIHZhciBheDIgPSAoYXhpcyA9PT0gMikgPyAxIDogMjtcbiAgICB2YXIgY29zYSA9IE1hdGguY29zKGFuZ2xlUmFkcyk7XG4gICAgdmFyIHNpbmEgPSBNYXRoLnNpbihhbmdsZVJhZHMpO1xuXG4gICAgdmVjdG9yT3V0W2F4MV0gPSB2ZWN0b3JbYXgxXSAqIGNvc2EgLSB2ZWN0b3JbYXgyXSAqIHNpbmE7XG4gICAgdmVjdG9yT3V0W2F4Ml0gPSB2ZWN0b3JbYXgyXSAqIGNvc2EgKyB2ZWN0b3JbYXgxXSAqIHNpbmE7XG5cbiAgICByZXR1cm4gdmVjdG9yT3V0O1xufVxuZnVuY3Rpb24gZXVsZXJGcm9tUXVhdGVybmlvbihxKSB7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgTWF0aC5hdGFuMigyICogKHFbMF0gKiBxWzFdICsgcVsyXSAqIHFbM10pLCAxIC0gMiAqIChxWzFdICogcVsxXSArIHFbMl0gKiBxWzJdKSkgKiBkZWdyZWVzLFxuICAgICAgICBNYXRoLmFzaW4oTWF0aC5tYXgoLTEsIE1hdGgubWluKDEsIDIgKiAocVswXSAqIHFbMl0gLSBxWzNdICogcVsxXSkpKSkgKiBkZWdyZWVzLFxuICAgICAgICBNYXRoLmF0YW4yKDIgKiAocVswXSAqIHFbM10gKyBxWzFdICogcVsyXSksIDEgLSAyICogKHFbMl0gKiBxWzJdICsgcVszXSAqIHFbM10pKSAqIGRlZ3JlZXNcbiAgICBdO1xufVxuXG5mdW5jdGlvbiBjYXJ0ZXNpYW4oc3BoZXJpY2FsKSB7XG4gICAgdmFyIGxhbWJkYSA9IHNwaGVyaWNhbFswXSAqIHJhZGlhbnM7XG4gICAgdmFyIHBoaSA9IHNwaGVyaWNhbFsxXSAqIHJhZGlhbnM7XG4gICAgdmFyIGNvc1BoaSA9IE1hdGguY29zKHBoaSk7XG4gICAgcmV0dXJuIFtcbiAgICAgICAgY29zUGhpICogTWF0aC5jb3MobGFtYmRhKSxcbiAgICAgICAgY29zUGhpICogTWF0aC5zaW4obGFtYmRhKSxcbiAgICAgICAgTWF0aC5zaW4ocGhpKVxuICAgIF07XG59XG5cbmZ1bmN0aW9uIGRvdChhLCBiKSB7XG4gICAgdmFyIHMgPSAwO1xuICAgIGZvcih2YXIgaSA9IDAsIG4gPSBhLmxlbmd0aDsgaSA8IG47ICsraSkgcyArPSBhW2ldICogYltpXTtcbiAgICByZXR1cm4gcztcbn1cblxuZnVuY3Rpb24gY3Jvc3MoYSwgYikge1xuICAgIHJldHVybiBbXG4gICAgICAgIGFbMV0gKiBiWzJdIC0gYVsyXSAqIGJbMV0sXG4gICAgICAgIGFbMl0gKiBiWzBdIC0gYVswXSAqIGJbMl0sXG4gICAgICAgIGFbMF0gKiBiWzFdIC0gYVsxXSAqIGJbMF1cbiAgICBdO1xufVxuXG4vLyBMaWtlIGQzLmRpc3BhdGNoLCBidXQgZm9yIGN1c3RvbSBldmVudHMgYWJzdHJhY3RpbmcgbmF0aXZlIFVJIGV2ZW50cy4gVGhlc2Vcbi8vIGV2ZW50cyBoYXZlIGEgdGFyZ2V0IGNvbXBvbmVudCAoc3VjaCBhcyBhIGJydXNoKSwgYSB0YXJnZXQgZWxlbWVudCAoc3VjaCBhc1xuLy8gdGhlIHN2ZzpnIGVsZW1lbnQgY29udGFpbmluZyB0aGUgYnJ1c2gpIGFuZCB0aGUgc3RhbmRhcmQgYXJndW1lbnRzIGBkYCAodGhlXG4vLyB0YXJnZXQgZWxlbWVudCdzIGRhdGEpIGFuZCBgaWAgKHRoZSBzZWxlY3Rpb24gaW5kZXggb2YgdGhlIHRhcmdldCBlbGVtZW50KS5cbmZ1bmN0aW9uIGQzZXZlbnREaXNwYXRjaCh0YXJnZXQpIHtcbiAgICB2YXIgaSA9IDA7XG4gICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgIHZhciBhcmd1bWVudHogPSBbXTtcblxuICAgIHdoaWxlKCsraSA8IG4pIGFyZ3VtZW50ei5wdXNoKGFyZ3VtZW50c1tpXSk7XG5cbiAgICB2YXIgZGlzcGF0Y2ggPSBkMy5kaXNwYXRjaC5hcHBseShudWxsLCBhcmd1bWVudHopO1xuXG4gICAgLy8gQ3JlYXRlcyBhIGRpc3BhdGNoIGNvbnRleHQgZm9yIHRoZSBzcGVjaWZpZWQgYHRoaXpgICh0eXBpY2FsbHksIHRoZSB0YXJnZXRcbiAgICAvLyBET00gZWxlbWVudCB0aGF0IHJlY2VpdmVkIHRoZSBzb3VyY2UgZXZlbnQpIGFuZCBgYXJndW1lbnR6YCAodHlwaWNhbGx5LCB0aGVcbiAgICAvLyBkYXRhIGBkYCBhbmQgaW5kZXggYGlgIG9mIHRoZSB0YXJnZXQgZWxlbWVudCkuIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBjYW4gYmVcbiAgICAvLyB1c2VkIHRvIGRpc3BhdGNoIGFuIGV2ZW50IHRvIGFueSByZWdpc3RlcmVkIGxpc3RlbmVyczsgdGhlIGZ1bmN0aW9uIHRha2VzIGFcbiAgICAvLyBzaW5nbGUgYXJndW1lbnQgYXMgaW5wdXQsIGJlaW5nIHRoZSBldmVudCB0byBkaXNwYXRjaC4gVGhlIGV2ZW50IG11c3QgaGF2ZVxuICAgIC8vIGEgXCJ0eXBlXCIgYXR0cmlidXRlIHdoaWNoIGNvcnJlc3BvbmRzIHRvIGEgdHlwZSByZWdpc3RlcmVkIGluIHRoZVxuICAgIC8vIGNvbnN0cnVjdG9yLiBUaGlzIGNvbnRleHQgd2lsbCBhdXRvbWF0aWNhbGx5IHBvcHVsYXRlIHRoZSBcInNvdXJjZUV2ZW50XCIgYW5kXG4gICAgLy8gXCJ0YXJnZXRcIiBhdHRyaWJ1dGVzIG9mIHRoZSBldmVudCwgYXMgd2VsbCBhcyBzZXR0aW5nIHRoZSBgZDMuZXZlbnRgIGdsb2JhbFxuICAgIC8vIGZvciB0aGUgZHVyYXRpb24gb2YgdGhlIG5vdGlmaWNhdGlvbi5cbiAgICBkaXNwYXRjaC5vZiA9IGZ1bmN0aW9uKHRoaXosIGFyZ3VtZW50eikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oZTEpIHtcbiAgICAgICAgICAgIHZhciBlMDtcbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgZTAgPSBlMS5zb3VyY2VFdmVudCA9IGQzLmV2ZW50O1xuICAgICAgICAgICAgICAgIGUxLnRhcmdldCA9IHRhcmdldDtcbiAgICAgICAgICAgICAgICBkMy5ldmVudCA9IGUxO1xuICAgICAgICAgICAgICAgIGRpc3BhdGNoW2UxLnR5cGVdLmFwcGx5KHRoaXosIGFyZ3VtZW50eik7XG4gICAgICAgICAgICB9IGZpbmFsbHkge1xuICAgICAgICAgICAgICAgIGQzLmV2ZW50ID0gZTA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHJldHVybiBkaXNwYXRjaDtcbn1cbiIsImltcG9ydCB0cmFuc2Zvcm0gZnJvbSBcIi4vdHJhbnNmb3JtLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRvcG9sb2d5KSB7XG4gIHZhciB0ID0gdHJhbnNmb3JtKHRvcG9sb2d5LnRyYW5zZm9ybSksIGtleSxcbiAgICAgIHgwID0gSW5maW5pdHksIHkwID0geDAsIHgxID0gLXgwLCB5MSA9IC14MDtcblxuICBmdW5jdGlvbiBiYm94UG9pbnQocCkge1xuICAgIHAgPSB0KHApO1xuICAgIGlmIChwWzBdIDwgeDApIHgwID0gcFswXTtcbiAgICBpZiAocFswXSA+IHgxKSB4MSA9IHBbMF07XG4gICAgaWYgKHBbMV0gPCB5MCkgeTAgPSBwWzFdO1xuICAgIGlmIChwWzFdID4geTEpIHkxID0gcFsxXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJib3hHZW9tZXRyeShvKSB7XG4gICAgc3dpdGNoIChvLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjogby5nZW9tZXRyaWVzLmZvckVhY2goYmJveEdlb21ldHJ5KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiUG9pbnRcIjogYmJveFBvaW50KG8uY29vcmRpbmF0ZXMpOyBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6IG8uY29vcmRpbmF0ZXMuZm9yRWFjaChiYm94UG9pbnQpOyBicmVhaztcbiAgICB9XG4gIH1cblxuICB0b3BvbG9neS5hcmNzLmZvckVhY2goZnVuY3Rpb24oYXJjKSB7XG4gICAgdmFyIGkgPSAtMSwgbiA9IGFyYy5sZW5ndGgsIHA7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIHAgPSB0KGFyY1tpXSwgaSk7XG4gICAgICBpZiAocFswXSA8IHgwKSB4MCA9IHBbMF07XG4gICAgICBpZiAocFswXSA+IHgxKSB4MSA9IHBbMF07XG4gICAgICBpZiAocFsxXSA8IHkwKSB5MCA9IHBbMV07XG4gICAgICBpZiAocFsxXSA+IHkxKSB5MSA9IHBbMV07XG4gICAgfVxuICB9KTtcblxuICBmb3IgKGtleSBpbiB0b3BvbG9neS5vYmplY3RzKSB7XG4gICAgYmJveEdlb21ldHJ5KHRvcG9sb2d5Lm9iamVjdHNba2V5XSk7XG4gIH1cblxuICByZXR1cm4gW3gwLCB5MCwgeDEsIHkxXTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIHgpIHtcbiAgdmFyIGxvID0gMCwgaGkgPSBhLmxlbmd0aDtcbiAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICB2YXIgbWlkID0gbG8gKyBoaSA+Pj4gMTtcbiAgICBpZiAoYVttaWRdIDwgeCkgbG8gPSBtaWQgKyAxO1xuICAgIGVsc2UgaGkgPSBtaWQ7XG4gIH1cbiAgcmV0dXJuIGxvO1xufVxuIiwiaW1wb3J0IHJldmVyc2UgZnJvbSBcIi4vcmV2ZXJzZS5qc1wiO1xuaW1wb3J0IHRyYW5zZm9ybSBmcm9tIFwiLi90cmFuc2Zvcm0uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odG9wb2xvZ3ksIG8pIHtcbiAgaWYgKHR5cGVvZiBvID09PSBcInN0cmluZ1wiKSBvID0gdG9wb2xvZ3kub2JqZWN0c1tvXTtcbiAgcmV0dXJuIG8udHlwZSA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIlxuICAgICAgPyB7dHlwZTogXCJGZWF0dXJlQ29sbGVjdGlvblwiLCBmZWF0dXJlczogby5nZW9tZXRyaWVzLm1hcChmdW5jdGlvbihvKSB7IHJldHVybiBmZWF0dXJlKHRvcG9sb2d5LCBvKTsgfSl9XG4gICAgICA6IGZlYXR1cmUodG9wb2xvZ3ksIG8pO1xufVxuXG5mdW5jdGlvbiBmZWF0dXJlKHRvcG9sb2d5LCBvKSB7XG4gIHZhciBpZCA9IG8uaWQsXG4gICAgICBiYm94ID0gby5iYm94LFxuICAgICAgcHJvcGVydGllcyA9IG8ucHJvcGVydGllcyA9PSBudWxsID8ge30gOiBvLnByb3BlcnRpZXMsXG4gICAgICBnZW9tZXRyeSA9IG9iamVjdCh0b3BvbG9neSwgbyk7XG4gIHJldHVybiBpZCA9PSBudWxsICYmIGJib3ggPT0gbnVsbCA/IHt0eXBlOiBcIkZlYXR1cmVcIiwgcHJvcGVydGllczogcHJvcGVydGllcywgZ2VvbWV0cnk6IGdlb21ldHJ5fVxuICAgICAgOiBiYm94ID09IG51bGwgPyB7dHlwZTogXCJGZWF0dXJlXCIsIGlkOiBpZCwgcHJvcGVydGllczogcHJvcGVydGllcywgZ2VvbWV0cnk6IGdlb21ldHJ5fVxuICAgICAgOiB7dHlwZTogXCJGZWF0dXJlXCIsIGlkOiBpZCwgYmJveDogYmJveCwgcHJvcGVydGllczogcHJvcGVydGllcywgZ2VvbWV0cnk6IGdlb21ldHJ5fTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9iamVjdCh0b3BvbG9neSwgbykge1xuICB2YXIgdHJhbnNmb3JtUG9pbnQgPSB0cmFuc2Zvcm0odG9wb2xvZ3kudHJhbnNmb3JtKSxcbiAgICAgIGFyY3MgPSB0b3BvbG9neS5hcmNzO1xuXG4gIGZ1bmN0aW9uIGFyYyhpLCBwb2ludHMpIHtcbiAgICBpZiAocG9pbnRzLmxlbmd0aCkgcG9pbnRzLnBvcCgpO1xuICAgIGZvciAodmFyIGEgPSBhcmNzW2kgPCAwID8gfmkgOiBpXSwgayA9IDAsIG4gPSBhLmxlbmd0aDsgayA8IG47ICsraykge1xuICAgICAgcG9pbnRzLnB1c2godHJhbnNmb3JtUG9pbnQoYVtrXSwgaykpO1xuICAgIH1cbiAgICBpZiAoaSA8IDApIHJldmVyc2UocG9pbnRzLCBuKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBvaW50KHApIHtcbiAgICByZXR1cm4gdHJhbnNmb3JtUG9pbnQocCk7XG4gIH1cblxuICBmdW5jdGlvbiBsaW5lKGFyY3MpIHtcbiAgICB2YXIgcG9pbnRzID0gW107XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSBhcmNzLmxlbmd0aDsgaSA8IG47ICsraSkgYXJjKGFyY3NbaV0sIHBvaW50cyk7XG4gICAgaWYgKHBvaW50cy5sZW5ndGggPCAyKSBwb2ludHMucHVzaChwb2ludHNbMF0pOyAvLyBUaGlzIHNob3VsZCBuZXZlciBoYXBwZW4gcGVyIHRoZSBzcGVjaWZpY2F0aW9uLlxuICAgIHJldHVybiBwb2ludHM7XG4gIH1cblxuICBmdW5jdGlvbiByaW5nKGFyY3MpIHtcbiAgICB2YXIgcG9pbnRzID0gbGluZShhcmNzKTtcbiAgICB3aGlsZSAocG9pbnRzLmxlbmd0aCA8IDQpIHBvaW50cy5wdXNoKHBvaW50c1swXSk7IC8vIFRoaXMgbWF5IGhhcHBlbiBpZiBhbiBhcmMgaGFzIG9ubHkgdHdvIHBvaW50cy5cbiAgICByZXR1cm4gcG9pbnRzO1xuICB9XG5cbiAgZnVuY3Rpb24gcG9seWdvbihhcmNzKSB7XG4gICAgcmV0dXJuIGFyY3MubWFwKHJpbmcpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2VvbWV0cnkobykge1xuICAgIHZhciB0eXBlID0gby50eXBlLCBjb29yZGluYXRlcztcbiAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgIGNhc2UgXCJHZW9tZXRyeUNvbGxlY3Rpb25cIjogcmV0dXJuIHt0eXBlOiB0eXBlLCBnZW9tZXRyaWVzOiBvLmdlb21ldHJpZXMubWFwKGdlb21ldHJ5KX07XG4gICAgICBjYXNlIFwiUG9pbnRcIjogY29vcmRpbmF0ZXMgPSBwb2ludChvLmNvb3JkaW5hdGVzKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlQb2ludFwiOiBjb29yZGluYXRlcyA9IG8uY29vcmRpbmF0ZXMubWFwKHBvaW50KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOiBjb29yZGluYXRlcyA9IGxpbmUoby5hcmNzKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlMaW5lU3RyaW5nXCI6IGNvb3JkaW5hdGVzID0gby5hcmNzLm1hcChsaW5lKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiUG9seWdvblwiOiBjb29yZGluYXRlcyA9IHBvbHlnb24oby5hcmNzKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6IGNvb3JkaW5hdGVzID0gby5hcmNzLm1hcChwb2x5Z29uKTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHt0eXBlOiB0eXBlLCBjb29yZGluYXRlczogY29vcmRpbmF0ZXN9O1xuICB9XG5cbiAgcmV0dXJuIGdlb21ldHJ5KG8pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4geDtcbn1cbiIsImV4cG9ydCB7ZGVmYXVsdCBhcyBiYm94fSBmcm9tIFwiLi9iYm94LmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgZmVhdHVyZX0gZnJvbSBcIi4vZmVhdHVyZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1lc2gsIG1lc2hBcmNzfSBmcm9tIFwiLi9tZXNoLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgbWVyZ2UsIG1lcmdlQXJjc30gZnJvbSBcIi4vbWVyZ2UuanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBuZWlnaGJvcnN9IGZyb20gXCIuL25laWdoYm9ycy5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHF1YW50aXplfSBmcm9tIFwiLi9xdWFudGl6ZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRyYW5zZm9ybX0gZnJvbSBcIi4vdHJhbnNmb3JtLmpzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdW50cmFuc2Zvcm19IGZyb20gXCIuL3VudHJhbnNmb3JtLmpzXCI7XG4iLCJpbXBvcnQge29iamVjdH0gZnJvbSBcIi4vZmVhdHVyZS5qc1wiO1xuaW1wb3J0IHN0aXRjaCBmcm9tIFwiLi9zdGl0Y2guanNcIjtcblxuZnVuY3Rpb24gcGxhbmFyUmluZ0FyZWEocmluZykge1xuICB2YXIgaSA9IC0xLCBuID0gcmluZy5sZW5ndGgsIGEsIGIgPSByaW5nW24gLSAxXSwgYXJlYSA9IDA7XG4gIHdoaWxlICgrK2kgPCBuKSBhID0gYiwgYiA9IHJpbmdbaV0sIGFyZWEgKz0gYVswXSAqIGJbMV0gLSBhWzFdICogYlswXTtcbiAgcmV0dXJuIE1hdGguYWJzKGFyZWEpOyAvLyBOb3RlOiBkb3VibGVkIGFyZWEhXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRvcG9sb2d5KSB7XG4gIHJldHVybiBvYmplY3QodG9wb2xvZ3ksIG1lcmdlQXJjcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1lcmdlQXJjcyh0b3BvbG9neSwgb2JqZWN0cykge1xuICB2YXIgcG9seWdvbnNCeUFyYyA9IHt9LFxuICAgICAgcG9seWdvbnMgPSBbXSxcbiAgICAgIGdyb3VwcyA9IFtdO1xuXG4gIG9iamVjdHMuZm9yRWFjaChnZW9tZXRyeSk7XG5cbiAgZnVuY3Rpb24gZ2VvbWV0cnkobykge1xuICAgIHN3aXRjaCAoby50eXBlKSB7XG4gICAgICBjYXNlIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI6IG8uZ2VvbWV0cmllcy5mb3JFYWNoKGdlb21ldHJ5KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiUG9seWdvblwiOiBleHRyYWN0KG8uYXJjcyk7IGJyZWFrO1xuICAgICAgY2FzZSBcIk11bHRpUG9seWdvblwiOiBvLmFyY3MuZm9yRWFjaChleHRyYWN0KTsgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0cmFjdChwb2x5Z29uKSB7XG4gICAgcG9seWdvbi5mb3JFYWNoKGZ1bmN0aW9uKHJpbmcpIHtcbiAgICAgIHJpbmcuZm9yRWFjaChmdW5jdGlvbihhcmMpIHtcbiAgICAgICAgKHBvbHlnb25zQnlBcmNbYXJjID0gYXJjIDwgMCA/IH5hcmMgOiBhcmNdIHx8IChwb2x5Z29uc0J5QXJjW2FyY10gPSBbXSkpLnB1c2gocG9seWdvbik7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBwb2x5Z29ucy5wdXNoKHBvbHlnb24pO1xuICB9XG5cbiAgZnVuY3Rpb24gYXJlYShyaW5nKSB7XG4gICAgcmV0dXJuIHBsYW5hclJpbmdBcmVhKG9iamVjdCh0b3BvbG9neSwge3R5cGU6IFwiUG9seWdvblwiLCBhcmNzOiBbcmluZ119KS5jb29yZGluYXRlc1swXSk7XG4gIH1cblxuICBwb2x5Z29ucy5mb3JFYWNoKGZ1bmN0aW9uKHBvbHlnb24pIHtcbiAgICBpZiAoIXBvbHlnb24uXykge1xuICAgICAgdmFyIGdyb3VwID0gW10sXG4gICAgICAgICAgbmVpZ2hib3JzID0gW3BvbHlnb25dO1xuICAgICAgcG9seWdvbi5fID0gMTtcbiAgICAgIGdyb3Vwcy5wdXNoKGdyb3VwKTtcbiAgICAgIHdoaWxlIChwb2x5Z29uID0gbmVpZ2hib3JzLnBvcCgpKSB7XG4gICAgICAgIGdyb3VwLnB1c2gocG9seWdvbik7XG4gICAgICAgIHBvbHlnb24uZm9yRWFjaChmdW5jdGlvbihyaW5nKSB7XG4gICAgICAgICAgcmluZy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykge1xuICAgICAgICAgICAgcG9seWdvbnNCeUFyY1thcmMgPCAwID8gfmFyYyA6IGFyY10uZm9yRWFjaChmdW5jdGlvbihwb2x5Z29uKSB7XG4gICAgICAgICAgICAgIGlmICghcG9seWdvbi5fKSB7XG4gICAgICAgICAgICAgICAgcG9seWdvbi5fID0gMTtcbiAgICAgICAgICAgICAgICBuZWlnaGJvcnMucHVzaChwb2x5Z29uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcG9seWdvbnMuZm9yRWFjaChmdW5jdGlvbihwb2x5Z29uKSB7XG4gICAgZGVsZXRlIHBvbHlnb24uXztcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBcIk11bHRpUG9seWdvblwiLFxuICAgIGFyY3M6IGdyb3Vwcy5tYXAoZnVuY3Rpb24ocG9seWdvbnMpIHtcbiAgICAgIHZhciBhcmNzID0gW10sIG47XG5cbiAgICAgIC8vIEV4dHJhY3QgdGhlIGV4dGVyaW9yICh1bmlxdWUpIGFyY3MuXG4gICAgICBwb2x5Z29ucy5mb3JFYWNoKGZ1bmN0aW9uKHBvbHlnb24pIHtcbiAgICAgICAgcG9seWdvbi5mb3JFYWNoKGZ1bmN0aW9uKHJpbmcpIHtcbiAgICAgICAgICByaW5nLmZvckVhY2goZnVuY3Rpb24oYXJjKSB7XG4gICAgICAgICAgICBpZiAocG9seWdvbnNCeUFyY1thcmMgPCAwID8gfmFyYyA6IGFyY10ubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICBhcmNzLnB1c2goYXJjKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gU3RpdGNoIHRoZSBhcmNzIGludG8gb25lIG9yIG1vcmUgcmluZ3MuXG4gICAgICBhcmNzID0gc3RpdGNoKHRvcG9sb2d5LCBhcmNzKTtcblxuICAgICAgLy8gSWYgbW9yZSB0aGFuIG9uZSByaW5nIGlzIHJldHVybmVkLFxuICAgICAgLy8gYXQgbW9zdCBvbmUgb2YgdGhlc2UgcmluZ3MgY2FuIGJlIHRoZSBleHRlcmlvcjtcbiAgICAgIC8vIGNob29zZSB0aGUgb25lIHdpdGggdGhlIGdyZWF0ZXN0IGFic29sdXRlIGFyZWEuXG4gICAgICBpZiAoKG4gPSBhcmNzLmxlbmd0aCkgPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxLCBrID0gYXJlYShhcmNzWzBdKSwga2ksIHQ7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgICBpZiAoKGtpID0gYXJlYShhcmNzW2ldKSkgPiBrKSB7XG4gICAgICAgICAgICB0ID0gYXJjc1swXSwgYXJjc1swXSA9IGFyY3NbaV0sIGFyY3NbaV0gPSB0LCBrID0ga2k7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhcmNzO1xuICAgIH0pLmZpbHRlcihmdW5jdGlvbihhcmNzKSB7XG4gICAgICByZXR1cm4gYXJjcy5sZW5ndGggPiAwO1xuICAgIH0pXG4gIH07XG59XG4iLCJpbXBvcnQge29iamVjdH0gZnJvbSBcIi4vZmVhdHVyZS5qc1wiO1xuaW1wb3J0IHN0aXRjaCBmcm9tIFwiLi9zdGl0Y2guanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odG9wb2xvZ3kpIHtcbiAgcmV0dXJuIG9iamVjdCh0b3BvbG9neSwgbWVzaEFyY3MuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBtZXNoQXJjcyh0b3BvbG9neSwgb2JqZWN0LCBmaWx0ZXIpIHtcbiAgdmFyIGFyY3MsIGksIG47XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkgYXJjcyA9IGV4dHJhY3RBcmNzKHRvcG9sb2d5LCBvYmplY3QsIGZpbHRlcik7XG4gIGVsc2UgZm9yIChpID0gMCwgYXJjcyA9IG5ldyBBcnJheShuID0gdG9wb2xvZ3kuYXJjcy5sZW5ndGgpOyBpIDwgbjsgKytpKSBhcmNzW2ldID0gaTtcbiAgcmV0dXJuIHt0eXBlOiBcIk11bHRpTGluZVN0cmluZ1wiLCBhcmNzOiBzdGl0Y2godG9wb2xvZ3ksIGFyY3MpfTtcbn1cblxuZnVuY3Rpb24gZXh0cmFjdEFyY3ModG9wb2xvZ3ksIG9iamVjdCwgZmlsdGVyKSB7XG4gIHZhciBhcmNzID0gW10sXG4gICAgICBnZW9tc0J5QXJjID0gW10sXG4gICAgICBnZW9tO1xuXG4gIGZ1bmN0aW9uIGV4dHJhY3QwKGkpIHtcbiAgICB2YXIgaiA9IGkgPCAwID8gfmkgOiBpO1xuICAgIChnZW9tc0J5QXJjW2pdIHx8IChnZW9tc0J5QXJjW2pdID0gW10pKS5wdXNoKHtpOiBpLCBnOiBnZW9tfSk7XG4gIH1cblxuICBmdW5jdGlvbiBleHRyYWN0MShhcmNzKSB7XG4gICAgYXJjcy5mb3JFYWNoKGV4dHJhY3QwKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dHJhY3QyKGFyY3MpIHtcbiAgICBhcmNzLmZvckVhY2goZXh0cmFjdDEpO1xuICB9XG5cbiAgZnVuY3Rpb24gZXh0cmFjdDMoYXJjcykge1xuICAgIGFyY3MuZm9yRWFjaChleHRyYWN0Mik7XG4gIH1cblxuICBmdW5jdGlvbiBnZW9tZXRyeShvKSB7XG4gICAgc3dpdGNoIChnZW9tID0gbywgby50eXBlKSB7XG4gICAgICBjYXNlIFwiR2VvbWV0cnlDb2xsZWN0aW9uXCI6IG8uZ2VvbWV0cmllcy5mb3JFYWNoKGdlb21ldHJ5KTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTGluZVN0cmluZ1wiOiBleHRyYWN0MShvLmFyY3MpOyBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aUxpbmVTdHJpbmdcIjogY2FzZSBcIlBvbHlnb25cIjogZXh0cmFjdDIoby5hcmNzKTsgYnJlYWs7XG4gICAgICBjYXNlIFwiTXVsdGlQb2x5Z29uXCI6IGV4dHJhY3QzKG8uYXJjcyk7IGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIGdlb21ldHJ5KG9iamVjdCk7XG5cbiAgZ2VvbXNCeUFyYy5mb3JFYWNoKGZpbHRlciA9PSBudWxsXG4gICAgICA/IGZ1bmN0aW9uKGdlb21zKSB7IGFyY3MucHVzaChnZW9tc1swXS5pKTsgfVxuICAgICAgOiBmdW5jdGlvbihnZW9tcykgeyBpZiAoZmlsdGVyKGdlb21zWzBdLmcsIGdlb21zW2dlb21zLmxlbmd0aCAtIDFdLmcpKSBhcmNzLnB1c2goZ2VvbXNbMF0uaSk7IH0pO1xuXG4gIHJldHVybiBhcmNzO1xufVxuIiwiaW1wb3J0IGJpc2VjdCBmcm9tIFwiLi9iaXNlY3QuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob2JqZWN0cykge1xuICB2YXIgaW5kZXhlc0J5QXJjID0ge30sIC8vIGFyYyBpbmRleCAtPiBhcnJheSBvZiBvYmplY3QgaW5kZXhlc1xuICAgICAgbmVpZ2hib3JzID0gb2JqZWN0cy5tYXAoZnVuY3Rpb24oKSB7IHJldHVybiBbXTsgfSk7XG5cbiAgZnVuY3Rpb24gbGluZShhcmNzLCBpKSB7XG4gICAgYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcbiAgICAgIGlmIChhIDwgMCkgYSA9IH5hO1xuICAgICAgdmFyIG8gPSBpbmRleGVzQnlBcmNbYV07XG4gICAgICBpZiAobykgby5wdXNoKGkpO1xuICAgICAgZWxzZSBpbmRleGVzQnlBcmNbYV0gPSBbaV07XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBwb2x5Z29uKGFyY3MsIGkpIHtcbiAgICBhcmNzLmZvckVhY2goZnVuY3Rpb24oYXJjKSB7IGxpbmUoYXJjLCBpKTsgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZW9tZXRyeShvLCBpKSB7XG4gICAgaWYgKG8udHlwZSA9PT0gXCJHZW9tZXRyeUNvbGxlY3Rpb25cIikgby5nZW9tZXRyaWVzLmZvckVhY2goZnVuY3Rpb24obykgeyBnZW9tZXRyeShvLCBpKTsgfSk7XG4gICAgZWxzZSBpZiAoby50eXBlIGluIGdlb21ldHJ5VHlwZSkgZ2VvbWV0cnlUeXBlW28udHlwZV0oby5hcmNzLCBpKTtcbiAgfVxuXG4gIHZhciBnZW9tZXRyeVR5cGUgPSB7XG4gICAgTGluZVN0cmluZzogbGluZSxcbiAgICBNdWx0aUxpbmVTdHJpbmc6IHBvbHlnb24sXG4gICAgUG9seWdvbjogcG9seWdvbixcbiAgICBNdWx0aVBvbHlnb246IGZ1bmN0aW9uKGFyY3MsIGkpIHsgYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGFyYykgeyBwb2x5Z29uKGFyYywgaSk7IH0pOyB9XG4gIH07XG5cbiAgb2JqZWN0cy5mb3JFYWNoKGdlb21ldHJ5KTtcblxuICBmb3IgKHZhciBpIGluIGluZGV4ZXNCeUFyYykge1xuICAgIGZvciAodmFyIGluZGV4ZXMgPSBpbmRleGVzQnlBcmNbaV0sIG0gPSBpbmRleGVzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICAgIGZvciAodmFyIGsgPSBqICsgMTsgayA8IG07ICsraykge1xuICAgICAgICB2YXIgaWogPSBpbmRleGVzW2pdLCBpayA9IGluZGV4ZXNba10sIG47XG4gICAgICAgIGlmICgobiA9IG5laWdoYm9yc1tpal0pW2kgPSBiaXNlY3QobiwgaWspXSAhPT0gaWspIG4uc3BsaWNlKGksIDAsIGlrKTtcbiAgICAgICAgaWYgKChuID0gbmVpZ2hib3JzW2lrXSlbaSA9IGJpc2VjdChuLCBpaildICE9PSBpaikgbi5zcGxpY2UoaSwgMCwgaWopO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZWlnaGJvcnM7XG59XG4iLCJpbXBvcnQgYmJveCBmcm9tIFwiLi9iYm94LmpzXCI7XG5pbXBvcnQgdW50cmFuc2Zvcm0gZnJvbSBcIi4vdW50cmFuc2Zvcm0uanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odG9wb2xvZ3ksIHRyYW5zZm9ybSkge1xuICBpZiAodG9wb2xvZ3kudHJhbnNmb3JtKSB0aHJvdyBuZXcgRXJyb3IoXCJhbHJlYWR5IHF1YW50aXplZFwiKTtcblxuICBpZiAoIXRyYW5zZm9ybSB8fCAhdHJhbnNmb3JtLnNjYWxlKSB7XG4gICAgaWYgKCEoKG4gPSBNYXRoLmZsb29yKHRyYW5zZm9ybSkpID49IDIpKSB0aHJvdyBuZXcgRXJyb3IoXCJuIG11c3QgYmUg4omlMlwiKTtcbiAgICBib3ggPSB0b3BvbG9neS5iYm94IHx8IGJib3godG9wb2xvZ3kpO1xuICAgIHZhciB4MCA9IGJveFswXSwgeTAgPSBib3hbMV0sIHgxID0gYm94WzJdLCB5MSA9IGJveFszXSwgbjtcbiAgICB0cmFuc2Zvcm0gPSB7c2NhbGU6IFt4MSAtIHgwID8gKHgxIC0geDApIC8gKG4gLSAxKSA6IDEsIHkxIC0geTAgPyAoeTEgLSB5MCkgLyAobiAtIDEpIDogMV0sIHRyYW5zbGF0ZTogW3gwLCB5MF19O1xuICB9IGVsc2Uge1xuICAgIGJveCA9IHRvcG9sb2d5LmJib3g7XG4gIH1cblxuICB2YXIgdCA9IHVudHJhbnNmb3JtKHRyYW5zZm9ybSksIGJveCwga2V5LCBpbnB1dHMgPSB0b3BvbG9neS5vYmplY3RzLCBvdXRwdXRzID0ge307XG5cbiAgZnVuY3Rpb24gcXVhbnRpemVQb2ludChwb2ludCkge1xuICAgIHJldHVybiB0KHBvaW50KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHF1YW50aXplR2VvbWV0cnkoaW5wdXQpIHtcbiAgICB2YXIgb3V0cHV0O1xuICAgIHN3aXRjaCAoaW5wdXQudHlwZSkge1xuICAgICAgY2FzZSBcIkdlb21ldHJ5Q29sbGVjdGlvblwiOiBvdXRwdXQgPSB7dHlwZTogXCJHZW9tZXRyeUNvbGxlY3Rpb25cIiwgZ2VvbWV0cmllczogaW5wdXQuZ2VvbWV0cmllcy5tYXAocXVhbnRpemVHZW9tZXRyeSl9OyBicmVhaztcbiAgICAgIGNhc2UgXCJQb2ludFwiOiBvdXRwdXQgPSB7dHlwZTogXCJQb2ludFwiLCBjb29yZGluYXRlczogcXVhbnRpemVQb2ludChpbnB1dC5jb29yZGluYXRlcyl9OyBicmVhaztcbiAgICAgIGNhc2UgXCJNdWx0aVBvaW50XCI6IG91dHB1dCA9IHt0eXBlOiBcIk11bHRpUG9pbnRcIiwgY29vcmRpbmF0ZXM6IGlucHV0LmNvb3JkaW5hdGVzLm1hcChxdWFudGl6ZVBvaW50KX07IGJyZWFrO1xuICAgICAgZGVmYXVsdDogcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICBpZiAoaW5wdXQuaWQgIT0gbnVsbCkgb3V0cHV0LmlkID0gaW5wdXQuaWQ7XG4gICAgaWYgKGlucHV0LmJib3ggIT0gbnVsbCkgb3V0cHV0LmJib3ggPSBpbnB1dC5iYm94O1xuICAgIGlmIChpbnB1dC5wcm9wZXJ0aWVzICE9IG51bGwpIG91dHB1dC5wcm9wZXJ0aWVzID0gaW5wdXQucHJvcGVydGllcztcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9XG5cbiAgZnVuY3Rpb24gcXVhbnRpemVBcmMoaW5wdXQpIHtcbiAgICB2YXIgaSA9IDAsIGogPSAxLCBuID0gaW5wdXQubGVuZ3RoLCBwLCBvdXRwdXQgPSBuZXcgQXJyYXkobik7IC8vIHBlc3NpbWlzdGljXG4gICAgb3V0cHV0WzBdID0gdChpbnB1dFswXSwgMCk7XG4gICAgd2hpbGUgKCsraSA8IG4pIGlmICgocCA9IHQoaW5wdXRbaV0sIGkpKVswXSB8fCBwWzFdKSBvdXRwdXRbaisrXSA9IHA7IC8vIG5vbi1jb2luY2lkZW50IHBvaW50c1xuICAgIGlmIChqID09PSAxKSBvdXRwdXRbaisrXSA9IFswLCAwXTsgLy8gYW4gYXJjIG11c3QgaGF2ZSBhdCBsZWFzdCB0d28gcG9pbnRzXG4gICAgb3V0cHV0Lmxlbmd0aCA9IGo7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfVxuXG4gIGZvciAoa2V5IGluIGlucHV0cykgb3V0cHV0c1trZXldID0gcXVhbnRpemVHZW9tZXRyeShpbnB1dHNba2V5XSk7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBcIlRvcG9sb2d5XCIsXG4gICAgYmJveDogYm94LFxuICAgIHRyYW5zZm9ybTogdHJhbnNmb3JtLFxuICAgIG9iamVjdHM6IG91dHB1dHMsXG4gICAgYXJjczogdG9wb2xvZ3kuYXJjcy5tYXAocXVhbnRpemVBcmMpXG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhcnJheSwgbikge1xuICB2YXIgdCwgaiA9IGFycmF5Lmxlbmd0aCwgaSA9IGogLSBuO1xuICB3aGlsZSAoaSA8IC0taikgdCA9IGFycmF5W2ldLCBhcnJheVtpKytdID0gYXJyYXlbal0sIGFycmF5W2pdID0gdDtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRvcG9sb2d5LCBhcmNzKSB7XG4gIHZhciBzdGl0Y2hlZEFyY3MgPSB7fSxcbiAgICAgIGZyYWdtZW50QnlTdGFydCA9IHt9LFxuICAgICAgZnJhZ21lbnRCeUVuZCA9IHt9LFxuICAgICAgZnJhZ21lbnRzID0gW10sXG4gICAgICBlbXB0eUluZGV4ID0gLTE7XG5cbiAgLy8gU3RpdGNoIGVtcHR5IGFyY3MgZmlyc3QsIHNpbmNlIHRoZXkgbWF5IGJlIHN1YnN1bWVkIGJ5IG90aGVyIGFyY3MuXG4gIGFyY3MuZm9yRWFjaChmdW5jdGlvbihpLCBqKSB7XG4gICAgdmFyIGFyYyA9IHRvcG9sb2d5LmFyY3NbaSA8IDAgPyB+aSA6IGldLCB0O1xuICAgIGlmIChhcmMubGVuZ3RoIDwgMyAmJiAhYXJjWzFdWzBdICYmICFhcmNbMV1bMV0pIHtcbiAgICAgIHQgPSBhcmNzWysrZW1wdHlJbmRleF0sIGFyY3NbZW1wdHlJbmRleF0gPSBpLCBhcmNzW2pdID0gdDtcbiAgICB9XG4gIH0pO1xuXG4gIGFyY3MuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgdmFyIGUgPSBlbmRzKGkpLFxuICAgICAgICBzdGFydCA9IGVbMF0sXG4gICAgICAgIGVuZCA9IGVbMV0sXG4gICAgICAgIGYsIGc7XG5cbiAgICBpZiAoZiA9IGZyYWdtZW50QnlFbmRbc3RhcnRdKSB7XG4gICAgICBkZWxldGUgZnJhZ21lbnRCeUVuZFtmLmVuZF07XG4gICAgICBmLnB1c2goaSk7XG4gICAgICBmLmVuZCA9IGVuZDtcbiAgICAgIGlmIChnID0gZnJhZ21lbnRCeVN0YXJ0W2VuZF0pIHtcbiAgICAgICAgZGVsZXRlIGZyYWdtZW50QnlTdGFydFtnLnN0YXJ0XTtcbiAgICAgICAgdmFyIGZnID0gZyA9PT0gZiA/IGYgOiBmLmNvbmNhdChnKTtcbiAgICAgICAgZnJhZ21lbnRCeVN0YXJ0W2ZnLnN0YXJ0ID0gZi5zdGFydF0gPSBmcmFnbWVudEJ5RW5kW2ZnLmVuZCA9IGcuZW5kXSA9IGZnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnJhZ21lbnRCeVN0YXJ0W2Yuc3RhcnRdID0gZnJhZ21lbnRCeUVuZFtmLmVuZF0gPSBmO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZiA9IGZyYWdtZW50QnlTdGFydFtlbmRdKSB7XG4gICAgICBkZWxldGUgZnJhZ21lbnRCeVN0YXJ0W2Yuc3RhcnRdO1xuICAgICAgZi51bnNoaWZ0KGkpO1xuICAgICAgZi5zdGFydCA9IHN0YXJ0O1xuICAgICAgaWYgKGcgPSBmcmFnbWVudEJ5RW5kW3N0YXJ0XSkge1xuICAgICAgICBkZWxldGUgZnJhZ21lbnRCeUVuZFtnLmVuZF07XG4gICAgICAgIHZhciBnZiA9IGcgPT09IGYgPyBmIDogZy5jb25jYXQoZik7XG4gICAgICAgIGZyYWdtZW50QnlTdGFydFtnZi5zdGFydCA9IGcuc3RhcnRdID0gZnJhZ21lbnRCeUVuZFtnZi5lbmQgPSBmLmVuZF0gPSBnZjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyYWdtZW50QnlTdGFydFtmLnN0YXJ0XSA9IGZyYWdtZW50QnlFbmRbZi5lbmRdID0gZjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZiA9IFtpXTtcbiAgICAgIGZyYWdtZW50QnlTdGFydFtmLnN0YXJ0ID0gc3RhcnRdID0gZnJhZ21lbnRCeUVuZFtmLmVuZCA9IGVuZF0gPSBmO1xuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gZW5kcyhpKSB7XG4gICAgdmFyIGFyYyA9IHRvcG9sb2d5LmFyY3NbaSA8IDAgPyB+aSA6IGldLCBwMCA9IGFyY1swXSwgcDE7XG4gICAgaWYgKHRvcG9sb2d5LnRyYW5zZm9ybSkgcDEgPSBbMCwgMF0sIGFyYy5mb3JFYWNoKGZ1bmN0aW9uKGRwKSB7IHAxWzBdICs9IGRwWzBdLCBwMVsxXSArPSBkcFsxXTsgfSk7XG4gICAgZWxzZSBwMSA9IGFyY1thcmMubGVuZ3RoIC0gMV07XG4gICAgcmV0dXJuIGkgPCAwID8gW3AxLCBwMF0gOiBbcDAsIHAxXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGZsdXNoKGZyYWdtZW50QnlFbmQsIGZyYWdtZW50QnlTdGFydCkge1xuICAgIGZvciAodmFyIGsgaW4gZnJhZ21lbnRCeUVuZCkge1xuICAgICAgdmFyIGYgPSBmcmFnbWVudEJ5RW5kW2tdO1xuICAgICAgZGVsZXRlIGZyYWdtZW50QnlTdGFydFtmLnN0YXJ0XTtcbiAgICAgIGRlbGV0ZSBmLnN0YXJ0O1xuICAgICAgZGVsZXRlIGYuZW5kO1xuICAgICAgZi5mb3JFYWNoKGZ1bmN0aW9uKGkpIHsgc3RpdGNoZWRBcmNzW2kgPCAwID8gfmkgOiBpXSA9IDE7IH0pO1xuICAgICAgZnJhZ21lbnRzLnB1c2goZik7XG4gICAgfVxuICB9XG5cbiAgZmx1c2goZnJhZ21lbnRCeUVuZCwgZnJhZ21lbnRCeVN0YXJ0KTtcbiAgZmx1c2goZnJhZ21lbnRCeVN0YXJ0LCBmcmFnbWVudEJ5RW5kKTtcbiAgYXJjcy5mb3JFYWNoKGZ1bmN0aW9uKGkpIHsgaWYgKCFzdGl0Y2hlZEFyY3NbaSA8IDAgPyB+aSA6IGldKSBmcmFnbWVudHMucHVzaChbaV0pOyB9KTtcblxuICByZXR1cm4gZnJhZ21lbnRzO1xufVxuIiwiaW1wb3J0IGlkZW50aXR5IGZyb20gXCIuL2lkZW50aXR5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRyYW5zZm9ybSkge1xuICBpZiAodHJhbnNmb3JtID09IG51bGwpIHJldHVybiBpZGVudGl0eTtcbiAgdmFyIHgwLFxuICAgICAgeTAsXG4gICAgICBreCA9IHRyYW5zZm9ybS5zY2FsZVswXSxcbiAgICAgIGt5ID0gdHJhbnNmb3JtLnNjYWxlWzFdLFxuICAgICAgZHggPSB0cmFuc2Zvcm0udHJhbnNsYXRlWzBdLFxuICAgICAgZHkgPSB0cmFuc2Zvcm0udHJhbnNsYXRlWzFdO1xuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQsIGkpIHtcbiAgICBpZiAoIWkpIHgwID0geTAgPSAwO1xuICAgIHZhciBqID0gMiwgbiA9IGlucHV0Lmxlbmd0aCwgb3V0cHV0ID0gbmV3IEFycmF5KG4pO1xuICAgIG91dHB1dFswXSA9ICh4MCArPSBpbnB1dFswXSkgKiBreCArIGR4O1xuICAgIG91dHB1dFsxXSA9ICh5MCArPSBpbnB1dFsxXSkgKiBreSArIGR5O1xuICAgIHdoaWxlIChqIDwgbikgb3V0cHV0W2pdID0gaW5wdXRbal0sICsrajtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xufVxuIiwiaW1wb3J0IGlkZW50aXR5IGZyb20gXCIuL2lkZW50aXR5LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHRyYW5zZm9ybSkge1xuICBpZiAodHJhbnNmb3JtID09IG51bGwpIHJldHVybiBpZGVudGl0eTtcbiAgdmFyIHgwLFxuICAgICAgeTAsXG4gICAgICBreCA9IHRyYW5zZm9ybS5zY2FsZVswXSxcbiAgICAgIGt5ID0gdHJhbnNmb3JtLnNjYWxlWzFdLFxuICAgICAgZHggPSB0cmFuc2Zvcm0udHJhbnNsYXRlWzBdLFxuICAgICAgZHkgPSB0cmFuc2Zvcm0udHJhbnNsYXRlWzFdO1xuICByZXR1cm4gZnVuY3Rpb24oaW5wdXQsIGkpIHtcbiAgICBpZiAoIWkpIHgwID0geTAgPSAwO1xuICAgIHZhciBqID0gMixcbiAgICAgICAgbiA9IGlucHV0Lmxlbmd0aCxcbiAgICAgICAgb3V0cHV0ID0gbmV3IEFycmF5KG4pLFxuICAgICAgICB4MSA9IE1hdGgucm91bmQoKGlucHV0WzBdIC0gZHgpIC8ga3gpLFxuICAgICAgICB5MSA9IE1hdGgucm91bmQoKGlucHV0WzFdIC0gZHkpIC8ga3kpO1xuICAgIG91dHB1dFswXSA9IHgxIC0geDAsIHgwID0geDE7XG4gICAgb3V0cHV0WzFdID0geTEgLSB5MCwgeTAgPSB5MTtcbiAgICB3aGlsZSAoaiA8IG4pIG91dHB1dFtqXSA9IGlucHV0W2pdLCArK2o7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=