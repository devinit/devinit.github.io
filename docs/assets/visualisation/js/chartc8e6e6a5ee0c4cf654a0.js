(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_plots_cartesian_index_js"],{

/***/ "./node_modules/plotly.js/src/plots/cartesian/attributes.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/attributes.js ***!
  \******************************************************************/
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
    xaxis: {
        valType: 'subplotid',
        role: 'info',
        dflt: 'x',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets a reference between this trace\'s x coordinates and',
            'a 2D cartesian x axis.',
            'If *x* (the default value), the x coordinates refer to',
            '`layout.xaxis`.',
            'If *x2*, the x coordinates refer to `layout.xaxis2`, and so on.'
        ].join(' ')
    },
    yaxis: {
        valType: 'subplotid',
        role: 'info',
        dflt: 'y',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets a reference between this trace\'s y coordinates and',
            'a 2D cartesian y axis.',
            'If *y* (the default value), the y coordinates refer to',
            '`layout.yaxis`.',
            'If *y2*, the y coordinates refer to `layout.yaxis2`, and so on.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Plots = __webpack_require__(/*! ../plots */ "./node_modules/plotly.js/src/plots/plots.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");

var getModuleCalcData = __webpack_require__(/*! ../get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getModuleCalcData;
var axisIds = __webpack_require__(/*! ./axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js");
var xmlnsNamespaces = __webpack_require__(/*! ../../constants/xmlns_namespaces */ "./node_modules/plotly.js/src/constants/xmlns_namespaces.js");

var ensureSingle = Lib.ensureSingle;

function ensureSingleAndAddDatum(parent, nodeType, className) {
    return Lib.ensureSingle(parent, nodeType, className, function(s) {
        s.datum(className);
    });
}

exports.name = 'cartesian';

exports.attr = ['xaxis', 'yaxis'];

exports.idRoot = ['x', 'y'];

exports.idRegex = constants.idRegex;

exports.attrRegex = constants.attrRegex;

exports.attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/plots/cartesian/attributes.js");

exports.layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");

exports.supplyLayoutDefaults = __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/plots/cartesian/layout_defaults.js");

exports.transitionAxes = __webpack_require__(/*! ./transition_axes */ "./node_modules/plotly.js/src/plots/cartesian/transition_axes.js");

exports.finalizeSubplots = function(layoutIn, layoutOut) {
    var subplots = layoutOut._subplots;
    var xList = subplots.xaxis;
    var yList = subplots.yaxis;
    var spSVG = subplots.cartesian;
    var spAll = spSVG.concat(subplots.gl2d || []);
    var allX = {};
    var allY = {};
    var i, xi, yi;

    for(i = 0; i < spAll.length; i++) {
        var parts = spAll[i].split('y');
        allX[parts[0]] = 1;
        allY['y' + parts[1]] = 1;
    }

    // check for x axes with no subplot, and make one from the anchor of that x axis
    for(i = 0; i < xList.length; i++) {
        xi = xList[i];
        if(!allX[xi]) {
            yi = (layoutIn[axisIds.id2name(xi)] || {}).anchor;
            if(!constants.idRegex.y.test(yi)) yi = 'y';
            spSVG.push(xi + yi);
            spAll.push(xi + yi);

            if(!allY[yi]) {
                allY[yi] = 1;
                Lib.pushUnique(yList, yi);
            }
        }
    }

    // same for y axes with no subplot
    for(i = 0; i < yList.length; i++) {
        yi = yList[i];
        if(!allY[yi]) {
            xi = (layoutIn[axisIds.id2name(yi)] || {}).anchor;
            if(!constants.idRegex.x.test(xi)) xi = 'x';
            spSVG.push(xi + yi);
            spAll.push(xi + yi);

            if(!allX[xi]) {
                allX[xi] = 1;
                Lib.pushUnique(xList, xi);
            }
        }
    }

    // finally, if we've gotten here we're supposed to show cartesian...
    // so if there are NO subplots at all, make one from the first
    // x & y axes in the input layout
    if(!spAll.length) {
        xi = '';
        yi = '';
        for(var ki in layoutIn) {
            if(constants.attrRegex.test(ki)) {
                var axLetter = ki.charAt(0);
                if(axLetter === 'x') {
                    if(!xi || (+ki.substr(5) < +xi.substr(5))) {
                        xi = ki;
                    }
                } else if(!yi || (+ki.substr(5) < +yi.substr(5))) {
                    yi = ki;
                }
            }
        }
        xi = xi ? axisIds.name2id(xi) : 'x';
        yi = yi ? axisIds.name2id(yi) : 'y';
        xList.push(xi);
        yList.push(yi);
        spSVG.push(xi + yi);
    }
};

/**
 * Cartesian.plot
 *
 * @param {DOM div | object} gd
 * @param {array (optional)} traces
 *  array of traces indices to plot
 *  if undefined, plots all cartesian traces,
 * @param {object} (optional) transitionOpts
 *  transition option object
 * @param {function} (optional) makeOnCompleteCallback
 *  transition make callback function from Plots.transition
 */
exports.plot = function(gd, traces, transitionOpts, makeOnCompleteCallback) {
    var fullLayout = gd._fullLayout;
    var subplots = fullLayout._subplots.cartesian;
    var calcdata = gd.calcdata;
    var i;

    if(!Array.isArray(traces)) {
        // If traces is not provided, then it's a complete replot and missing
        // traces are removed
        traces = [];
        for(i = 0; i < calcdata.length; i++) traces.push(i);
    }

    for(i = 0; i < subplots.length; i++) {
        var subplot = subplots[i];
        var subplotInfo = fullLayout._plots[subplot];

        // Get all calcdata for this subplot:
        var cdSubplot = [];
        var pcd;

        for(var j = 0; j < calcdata.length; j++) {
            var cd = calcdata[j];
            var trace = cd[0].trace;

            // Skip trace if whitelist provided and it's not whitelisted:
            // if (Array.isArray(traces) && traces.indexOf(i) === -1) continue;
            if(trace.xaxis + trace.yaxis === subplot) {
                // XXX: Should trace carpet dependencies. Only replot all carpet plots if the carpet
                // axis has actually changed:
                //
                // If this trace is specifically requested, add it to the list:
                if(traces.indexOf(trace.index) !== -1 || trace.carpet) {
                    // Okay, so example: traces 0, 1, and 2 have fill = tonext. You animate
                    // traces 0 and 2. Trace 1 also needs to be updated, otherwise its fill
                    // is outdated. So this retroactively adds the previous trace if the
                    // traces are interdependent.
                    if(
                        pcd &&
                        pcd[0].trace.xaxis + pcd[0].trace.yaxis === subplot &&
                        ['tonextx', 'tonexty', 'tonext'].indexOf(trace.fill) !== -1 &&
                        cdSubplot.indexOf(pcd) === -1
                    ) {
                        cdSubplot.push(pcd);
                    }

                    cdSubplot.push(cd);
                }

                // Track the previous trace on this subplot for the retroactive-add step
                // above:
                pcd = cd;
            }
        }

        plotOne(gd, subplotInfo, cdSubplot, transitionOpts, makeOnCompleteCallback);
    }
};

function plotOne(gd, plotinfo, cdSubplot, transitionOpts, makeOnCompleteCallback) {
    var traceLayerClasses = constants.traceLayerClasses;
    var fullLayout = gd._fullLayout;
    var modules = fullLayout._modules;
    var _module, cdModuleAndOthers, cdModule;

    var layerData = [];
    var zoomScaleQueryParts = [];

    for(var i = 0; i < modules.length; i++) {
        _module = modules[i];
        var name = _module.name;
        var categories = Registry.modules[name].categories;

        if(categories.svg) {
            var className = (_module.layerName || name + 'layer');
            var plotMethod = _module.plot;

            // plot all visible traces of this type on this subplot at once
            cdModuleAndOthers = getModuleCalcData(cdSubplot, plotMethod);
            cdModule = cdModuleAndOthers[0];
            // don't need to search the found traces again - in fact we need to NOT
            // so that if two modules share the same plotter we don't double-plot
            cdSubplot = cdModuleAndOthers[1];

            if(cdModule.length) {
                layerData.push({
                    i: traceLayerClasses.indexOf(className),
                    className: className,
                    plotMethod: plotMethod,
                    cdModule: cdModule
                });
            }

            if(categories.zoomScale) {
                zoomScaleQueryParts.push('.' + className);
            }
        }
    }

    layerData.sort(function(a, b) { return a.i - b.i; });

    var layers = plotinfo.plot.selectAll('g.mlayer')
        .data(layerData, function(d) { return d.className; });

    layers.enter().append('g')
        .attr('class', function(d) { return d.className; })
        .classed('mlayer', true)
        .classed('rangeplot', plotinfo.isRangePlot);

    layers.exit().remove();

    layers.order();

    layers.each(function(d) {
        var sel = d3.select(this);
        var className = d.className;

        d.plotMethod(
            gd, plotinfo, d.cdModule, sel,
            transitionOpts, makeOnCompleteCallback
        );

        // layers that allow `cliponaxis: false`
        if(constants.clipOnAxisFalseQuery.indexOf('.' + className) === -1) {
            Drawing.setClipUrl(sel, plotinfo.layerClipId, gd);
        }
    });

    // call Scattergl.plot separately
    if(fullLayout._has('scattergl')) {
        _module = Registry.getModule('scattergl');
        cdModule = getModuleCalcData(cdSubplot, _module)[0];
        _module.plot(gd, plotinfo, cdModule);
    }

    // stash "hot" selections for faster interaction on drag and scroll
    if(!gd._context.staticPlot) {
        if(plotinfo._hasClipOnAxisFalse) {
            plotinfo.clipOnAxisFalseTraces = plotinfo.plot
                .selectAll(constants.clipOnAxisFalseQuery.join(','))
                .selectAll('.trace');
        }

        if(zoomScaleQueryParts.length) {
            var traces = plotinfo.plot
                .selectAll(zoomScaleQueryParts.join(','))
                .selectAll('.trace');

            plotinfo.zoomScalePts = traces.selectAll('path.point');
            plotinfo.zoomScaleTxt = traces.selectAll('.textpoint');
        }
    }
}

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var oldPlots = oldFullLayout._plots || {};
    var newPlots = newFullLayout._plots || {};
    var oldSubplotList = oldFullLayout._subplots || {};
    var plotinfo;
    var i, k;

    // when going from a large splom graph to something else,
    // we need to clear <g subplot> so that the new cartesian subplot
    // can have the correct layer ordering
    if(oldFullLayout._hasOnlyLargeSploms && !newFullLayout._hasOnlyLargeSploms) {
        for(k in oldPlots) {
            plotinfo = oldPlots[k];
            if(plotinfo.plotgroup) plotinfo.plotgroup.remove();
        }
    }

    var hadGl = (oldFullLayout._has && oldFullLayout._has('gl'));
    var hasGl = (newFullLayout._has && newFullLayout._has('gl'));

    if(hadGl && !hasGl) {
        for(k in oldPlots) {
            plotinfo = oldPlots[k];
            if(plotinfo._scene) plotinfo._scene.destroy();
        }
    }

    // delete any titles we don't need anymore
    // check if axis list has changed, and if so clear old titles
    if(oldSubplotList.xaxis && oldSubplotList.yaxis) {
        var oldAxIDs = axisIds.listIds({_fullLayout: oldFullLayout});
        for(i = 0; i < oldAxIDs.length; i++) {
            var oldAxId = oldAxIDs[i];
            if(!newFullLayout[axisIds.id2name(oldAxId)]) {
                oldFullLayout._infolayer.selectAll('.g-' + oldAxId + 'title').remove();
            }
        }
    }

    var hadCartesian = (oldFullLayout._has && oldFullLayout._has('cartesian'));
    var hasCartesian = (newFullLayout._has && newFullLayout._has('cartesian'));

    if(hadCartesian && !hasCartesian) {
        // if we've gotten rid of all cartesian traces, remove all the subplot svg items

        purgeSubplotLayers(oldFullLayout._cartesianlayer.selectAll('.subplot'), oldFullLayout);
        oldFullLayout._defs.selectAll('.axesclip').remove();
        delete oldFullLayout._axisConstraintGroups;
    } else if(oldSubplotList.cartesian) {
        // otherwise look for subplots we need to remove

        for(i = 0; i < oldSubplotList.cartesian.length; i++) {
            var oldSubplotId = oldSubplotList.cartesian[i];
            if(!newPlots[oldSubplotId]) {
                var selector = '.' + oldSubplotId + ',.' + oldSubplotId + '-x,.' + oldSubplotId + '-y';
                oldFullLayout._cartesianlayer.selectAll(selector).remove();
                removeSubplotExtras(oldSubplotId, oldFullLayout);
            }
        }
    }
};

exports.drawFramework = function(gd) {
    var fullLayout = gd._fullLayout;
    var subplotData = makeSubplotData(gd);

    var subplotLayers = fullLayout._cartesianlayer.selectAll('.subplot')
        .data(subplotData, String);

    subplotLayers.enter().append('g')
        .attr('class', function(d) { return 'subplot ' + d[0]; });

    subplotLayers.order();

    subplotLayers.exit()
        .call(purgeSubplotLayers, fullLayout);

    subplotLayers.each(function(d) {
        var id = d[0];
        var plotinfo = fullLayout._plots[id];

        plotinfo.plotgroup = d3.select(this);
        makeSubplotLayer(gd, plotinfo);

        // make separate drag layers for each subplot,
        // but append them to paper rather than the plot groups,
        // so they end up on top of the rest
        plotinfo.draglayer = ensureSingle(fullLayout._draggers, 'g', id);
    });
};

exports.rangePlot = function(gd, plotinfo, cdSubplot) {
    makeSubplotLayer(gd, plotinfo);
    plotOne(gd, plotinfo, cdSubplot);
    Plots.style(gd);
};

function makeSubplotData(gd) {
    var fullLayout = gd._fullLayout;
    var ids = fullLayout._subplots.cartesian;
    var len = ids.length;
    var i, j, id, plotinfo, xa, ya;

    // split 'regular' and 'overlaying' subplots
    var regulars = [];
    var overlays = [];

    for(i = 0; i < len; i++) {
        id = ids[i];
        plotinfo = fullLayout._plots[id];
        xa = plotinfo.xaxis;
        ya = plotinfo.yaxis;

        var xa2 = xa._mainAxis;
        var ya2 = ya._mainAxis;
        var mainplot = xa2._id + ya2._id;
        var mainplotinfo = fullLayout._plots[mainplot];
        plotinfo.overlays = [];

        if(mainplot !== id && mainplotinfo) {
            plotinfo.mainplot = mainplot;
            plotinfo.mainplotinfo = mainplotinfo;
            overlays.push(id);
        } else {
            plotinfo.mainplot = undefined;
            plotinfo.mainPlotinfo = undefined;
            regulars.push(id);
        }
    }

    // fill in list of overlaying subplots in 'main plot'
    for(i = 0; i < overlays.length; i++) {
        id = overlays[i];
        plotinfo = fullLayout._plots[id];
        plotinfo.mainplotinfo.overlays.push(plotinfo);
    }

    // put 'regular' subplot data before 'overlaying'
    var subplotIds = regulars.concat(overlays);
    var subplotData = new Array(len);

    for(i = 0; i < len; i++) {
        id = subplotIds[i];
        plotinfo = fullLayout._plots[id];
        xa = plotinfo.xaxis;
        ya = plotinfo.yaxis;

        // use info about axis layer and overlaying pattern
        // to clean what need to be cleaned up in exit selection
        var d = [id, xa.layer, ya.layer, xa.overlaying || '', ya.overlaying || ''];
        for(j = 0; j < plotinfo.overlays.length; j++) {
            d.push(plotinfo.overlays[j].id);
        }
        subplotData[i] = d;
    }

    return subplotData;
}

function makeSubplotLayer(gd, plotinfo) {
    var plotgroup = plotinfo.plotgroup;
    var id = plotinfo.id;
    var xLayer = constants.layerValue2layerClass[plotinfo.xaxis.layer];
    var yLayer = constants.layerValue2layerClass[plotinfo.yaxis.layer];
    var hasOnlyLargeSploms = gd._fullLayout._hasOnlyLargeSploms;

    if(!plotinfo.mainplot) {
        if(hasOnlyLargeSploms) {
            // TODO could do even better
            // - we don't need plot (but we would have to mock it in lsInner
            //   and other places
            // - we don't (x|y)lines and (x|y)axislayer for most subplots
            //   usually just the bottom x and left y axes.
            plotinfo.xlines = ensureSingle(plotgroup, 'path', 'xlines-above');
            plotinfo.ylines = ensureSingle(plotgroup, 'path', 'ylines-above');
            plotinfo.xaxislayer = ensureSingle(plotgroup, 'g', 'xaxislayer-above');
            plotinfo.yaxislayer = ensureSingle(plotgroup, 'g', 'yaxislayer-above');
        } else {
            var backLayer = ensureSingle(plotgroup, 'g', 'layer-subplot');
            plotinfo.shapelayer = ensureSingle(backLayer, 'g', 'shapelayer');
            plotinfo.imagelayer = ensureSingle(backLayer, 'g', 'imagelayer');

            plotinfo.gridlayer = ensureSingle(plotgroup, 'g', 'gridlayer');
            plotinfo.zerolinelayer = ensureSingle(plotgroup, 'g', 'zerolinelayer');

            ensureSingle(plotgroup, 'path', 'xlines-below');
            ensureSingle(plotgroup, 'path', 'ylines-below');
            plotinfo.overlinesBelow = ensureSingle(plotgroup, 'g', 'overlines-below');

            ensureSingle(plotgroup, 'g', 'xaxislayer-below');
            ensureSingle(plotgroup, 'g', 'yaxislayer-below');
            plotinfo.overaxesBelow = ensureSingle(plotgroup, 'g', 'overaxes-below');

            plotinfo.plot = ensureSingle(plotgroup, 'g', 'plot');
            plotinfo.overplot = ensureSingle(plotgroup, 'g', 'overplot');

            plotinfo.xlines = ensureSingle(plotgroup, 'path', 'xlines-above');
            plotinfo.ylines = ensureSingle(plotgroup, 'path', 'ylines-above');
            plotinfo.overlinesAbove = ensureSingle(plotgroup, 'g', 'overlines-above');

            ensureSingle(plotgroup, 'g', 'xaxislayer-above');
            ensureSingle(plotgroup, 'g', 'yaxislayer-above');
            plotinfo.overaxesAbove = ensureSingle(plotgroup, 'g', 'overaxes-above');

            // set refs to correct layers as determined by 'axis.layer'
            plotinfo.xlines = plotgroup.select('.xlines-' + xLayer);
            plotinfo.ylines = plotgroup.select('.ylines-' + yLayer);
            plotinfo.xaxislayer = plotgroup.select('.xaxislayer-' + xLayer);
            plotinfo.yaxislayer = plotgroup.select('.yaxislayer-' + yLayer);
        }
    } else {
        var mainplotinfo = plotinfo.mainplotinfo;
        var mainplotgroup = mainplotinfo.plotgroup;
        var xId = id + '-x';
        var yId = id + '-y';

        // now make the components of overlaid subplots
        // overlays don't have backgrounds, and append all
        // their other components to the corresponding
        // extra groups of their main plots.

        plotinfo.gridlayer = mainplotinfo.gridlayer;
        plotinfo.zerolinelayer = mainplotinfo.zerolinelayer;

        ensureSingle(mainplotinfo.overlinesBelow, 'path', xId);
        ensureSingle(mainplotinfo.overlinesBelow, 'path', yId);
        ensureSingle(mainplotinfo.overaxesBelow, 'g', xId);
        ensureSingle(mainplotinfo.overaxesBelow, 'g', yId);

        plotinfo.plot = ensureSingle(mainplotinfo.overplot, 'g', id);

        ensureSingle(mainplotinfo.overlinesAbove, 'path', xId);
        ensureSingle(mainplotinfo.overlinesAbove, 'path', yId);
        ensureSingle(mainplotinfo.overaxesAbove, 'g', xId);
        ensureSingle(mainplotinfo.overaxesAbove, 'g', yId);

        // set refs to correct layers as determined by 'abovetraces'
        plotinfo.xlines = mainplotgroup.select('.overlines-' + xLayer).select('.' + xId);
        plotinfo.ylines = mainplotgroup.select('.overlines-' + yLayer).select('.' + yId);
        plotinfo.xaxislayer = mainplotgroup.select('.overaxes-' + xLayer).select('.' + xId);
        plotinfo.yaxislayer = mainplotgroup.select('.overaxes-' + yLayer).select('.' + yId);
    }

    // common attributes for all subplots, overlays or not

    if(!hasOnlyLargeSploms) {
        ensureSingleAndAddDatum(plotinfo.gridlayer, 'g', plotinfo.xaxis._id);
        ensureSingleAndAddDatum(plotinfo.gridlayer, 'g', plotinfo.yaxis._id);
        plotinfo.gridlayer.selectAll('g')
            .map(function(d) { return d[0]; })
            .sort(axisIds.idSort);
    }

    plotinfo.xlines
        .style('fill', 'none')
        .classed('crisp', true);

    plotinfo.ylines
        .style('fill', 'none')
        .classed('crisp', true);
}

function purgeSubplotLayers(layers, fullLayout) {
    if(!layers) return;

    var overlayIdsToRemove = {};

    layers.each(function(d) {
        var id = d[0];
        var plotgroup = d3.select(this);

        plotgroup.remove();
        removeSubplotExtras(id, fullLayout);
        overlayIdsToRemove[id] = true;

        // do not remove individual axis <clipPath>s here
        // as other subplots may need them
    });

    // must remove overlaid subplot trace layers 'manually'

    for(var k in fullLayout._plots) {
        var subplotInfo = fullLayout._plots[k];
        var overlays = subplotInfo.overlays || [];

        for(var j = 0; j < overlays.length; j++) {
            var overlayInfo = overlays[j];

            if(overlayIdsToRemove[overlayInfo.id]) {
                overlayInfo.plot.selectAll('.trace').remove();
            }
        }
    }
}

function removeSubplotExtras(subplotId, fullLayout) {
    fullLayout._draggers.selectAll('g.' + subplotId).remove();
    fullLayout._defs.select('#clip' + fullLayout._uid + subplotId + 'plot').remove();
}

exports.toSVG = function(gd) {
    var imageRoot = gd._fullLayout._glimages;
    var root = d3.select(gd).selectAll('.svg-container');
    var canvases = root.filter(function(d, i) {return i === root.size() - 1;})
        .selectAll('.gl-canvas-context, .gl-canvas-focus');

    function canvasToImage() {
        var canvas = this;
        var imageData = canvas.toDataURL('image/png');
        var image = imageRoot.append('svg:image');

        image.attr({
            xmlns: xmlnsNamespaces.svg,
            'xlink:href': imageData,
            preserveAspectRatio: 'none',
            x: 0,
            y: 0,
            width: canvas.width,
            height: canvas.height
        });
    }

    canvases.each(canvasToImage);
};

exports.updateFx = __webpack_require__(/*! ./graph_interact */ "./node_modules/plotly.js/src/plots/cartesian/graph_interact.js").updateFx;


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/layout_defaults.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/layout_defaults.js ***!
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




var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var isUnifiedHover = __webpack_require__(/*! ../../components/fx/helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").isUnifiedHover;
var handleHoverModeDefaults = __webpack_require__(/*! ../../components/fx/hovermode_defaults */ "./node_modules/plotly.js/src/components/fx/hovermode_defaults.js");
var Template = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");
var basePlotLayoutAttributes = __webpack_require__(/*! ../layout_attributes */ "./node_modules/plotly.js/src/plots/layout_attributes.js");

var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");
var handleTypeDefaults = __webpack_require__(/*! ./type_defaults */ "./node_modules/plotly.js/src/plots/cartesian/type_defaults.js");
var handleAxisDefaults = __webpack_require__(/*! ./axis_defaults */ "./node_modules/plotly.js/src/plots/cartesian/axis_defaults.js");
var handleConstraintDefaults = __webpack_require__(/*! ./constraints */ "./node_modules/plotly.js/src/plots/cartesian/constraints.js").handleConstraintDefaults;
var handlePositionDefaults = __webpack_require__(/*! ./position_defaults */ "./node_modules/plotly.js/src/plots/cartesian/position_defaults.js");

var axisIds = __webpack_require__(/*! ./axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js");
var id2name = axisIds.id2name;
var name2id = axisIds.name2id;

var AX_ID_PATTERN = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js").AX_ID_PATTERN;

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var traceIs = Registry.traceIs;
var getComponentMethod = Registry.getComponentMethod;

function appendList(cont, k, item) {
    if(Array.isArray(cont[k])) cont[k].push(item);
    else cont[k] = [item];
}

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut, fullData) {
    var ax2traces = {};
    var xaMayHide = {};
    var yaMayHide = {};
    var xaMustDisplay = {};
    var yaMustDisplay = {};
    var yaMustNotReverse = {};
    var yaMayReverse = {};
    var axHasImage = {};
    var outerTicks = {};
    var noGrids = {};
    var i, j;

    // look for axes in the data
    for(i = 0; i < fullData.length; i++) {
        var trace = fullData[i];
        if(!traceIs(trace, 'cartesian') && !traceIs(trace, 'gl2d')) continue;

        var xaName;
        if(trace.xaxis) {
            xaName = id2name(trace.xaxis);
            appendList(ax2traces, xaName, trace);
        } else if(trace.xaxes) {
            for(j = 0; j < trace.xaxes.length; j++) {
                appendList(ax2traces, id2name(trace.xaxes[j]), trace);
            }
        }

        var yaName;
        if(trace.yaxis) {
            yaName = id2name(trace.yaxis);
            appendList(ax2traces, yaName, trace);
        } else if(trace.yaxes) {
            for(j = 0; j < trace.yaxes.length; j++) {
                appendList(ax2traces, id2name(trace.yaxes[j]), trace);
            }
        }

        // logic for funnels
        if(trace.type === 'funnel') {
            if(trace.orientation === 'h') {
                if(xaName) xaMayHide[xaName] = true;
                if(yaName) yaMayReverse[yaName] = true;
            } else {
                if(yaName) yaMayHide[yaName] = true;
            }
        } else if(trace.type === 'image') {
            if(yaName) axHasImage[yaName] = true;
            if(xaName) axHasImage[xaName] = true;
        } else {
            if(yaName) {
                yaMustDisplay[yaName] = true;
                yaMustNotReverse[yaName] = true;
            }

            if(!traceIs(trace, 'carpet') || (trace.type === 'carpet' && !trace._cheater)) {
                if(xaName) xaMustDisplay[xaName] = true;
            }
        }

        // Two things trigger axis visibility:
        // 1. is not carpet
        // 2. carpet that's not cheater

        // The above check for definitely-not-cheater is not adequate. This
        // second list tracks which axes *could* be a cheater so that the
        // full condition triggering hiding is:
        //   *could* be a cheater and *is not definitely visible*
        if(trace.type === 'carpet' && trace._cheater) {
            if(xaName) xaMayHide[xaName] = true;
        }

        // check for default formatting tweaks
        if(traceIs(trace, '2dMap')) {
            outerTicks[xaName] = true;
            outerTicks[yaName] = true;
        }

        if(traceIs(trace, 'oriented')) {
            var positionAxis = trace.orientation === 'h' ? yaName : xaName;
            noGrids[positionAxis] = true;
        }
    }

    var subplots = layoutOut._subplots;
    var xIds = subplots.xaxis;
    var yIds = subplots.yaxis;
    var xNames = Lib.simpleMap(xIds, id2name);
    var yNames = Lib.simpleMap(yIds, id2name);
    var axNames = xNames.concat(yNames);

    // plot_bgcolor only makes sense if there's a (2D) plot!
    // TODO: bgcolor for each subplot, to inherit from the main one
    var plotBgColor = Color.background;
    if(xIds.length && yIds.length) {
        plotBgColor = Lib.coerce(layoutIn, layoutOut, basePlotLayoutAttributes, 'plot_bgcolor');
    }

    var bgColor = Color.combine(plotBgColor, layoutOut.paper_bgcolor);

    // name of single axis (e.g. 'xaxis', 'yaxis2')
    var axName;
    // id of single axis (e.g. 'y', 'x5')
    var axId;
    // 'x' or 'y'
    var axLetter;
    // input layout axis container
    var axLayoutIn;
    // full layout axis container
    var axLayoutOut;

    function newAxLayoutOut() {
        var traces = ax2traces[axName] || [];
        axLayoutOut._traceIndices = traces.map(function(t) { return t._expandedIndex; });
        axLayoutOut._annIndices = [];
        axLayoutOut._shapeIndices = [];
        axLayoutOut._imgIndices = [];
        axLayoutOut._subplotsWith = [];
        axLayoutOut._counterAxes = [];
        axLayoutOut._name = axLayoutOut._attr = axName;
        axLayoutOut._id = axId;
    }

    function coerce(attr, dflt) {
        return Lib.coerce(axLayoutIn, axLayoutOut, layoutAttributes, attr, dflt);
    }

    function coerce2(attr, dflt) {
        return Lib.coerce2(axLayoutIn, axLayoutOut, layoutAttributes, attr, dflt);
    }

    function getCounterAxes(axLetter) {
        return (axLetter === 'x') ? yIds : xIds;
    }

    function getOverlayableAxes(axLetter, axName) {
        var list = (axLetter === 'x') ? xNames : yNames;
        var out = [];

        for(var j = 0; j < list.length; j++) {
            var axName2 = list[j];

            if(axName2 !== axName && !(layoutIn[axName2] || {}).overlaying) {
                out.push(name2id(axName2));
            }
        }

        return out;
    }

    // list of available counter axis names
    var counterAxes = {x: getCounterAxes('x'), y: getCounterAxes('y')};
    // list of all x AND y axis ids
    var allAxisIds = counterAxes.x.concat(counterAxes.y);
    // lookup and list of axis ids that axes in axNames have a reference to,
    // even though they are missing from allAxisIds
    var missingMatchedAxisIdsLookup = {};
    var missingMatchedAxisIds = [];

    // fill in 'missing' axis lookup when an axis is set to match an axis
    // not part of the allAxisIds list, save axis type so that we can propagate
    // it to the missing axes
    function addMissingMatchedAxis() {
        var matchesIn = axLayoutIn.matches;
        if(AX_ID_PATTERN.test(matchesIn) && allAxisIds.indexOf(matchesIn) === -1) {
            missingMatchedAxisIdsLookup[matchesIn] = axLayoutIn.type;
            missingMatchedAxisIds = Object.keys(missingMatchedAxisIdsLookup);
        }
    }

    var hovermode = handleHoverModeDefaults(layoutIn, layoutOut, fullData);
    var unifiedHover = isUnifiedHover(hovermode);

    // first pass creates the containers, determines types, and handles most of the settings
    for(i = 0; i < axNames.length; i++) {
        axName = axNames[i];
        axId = name2id(axName);
        axLetter = axName.charAt(0);

        if(!Lib.isPlainObject(layoutIn[axName])) {
            layoutIn[axName] = {};
        }

        axLayoutIn = layoutIn[axName];
        axLayoutOut = Template.newContainer(layoutOut, axName, axLetter + 'axis');
        newAxLayoutOut();

        var visibleDflt =
            (axLetter === 'x' && !xaMustDisplay[axName] && xaMayHide[axName]) ||
            (axLetter === 'y' && !yaMustDisplay[axName] && yaMayHide[axName]);

        var reverseDflt =
            (axLetter === 'y' &&
              (
                (!yaMustNotReverse[axName] && yaMayReverse[axName]) ||
                axHasImage[axName]
              ));

        var defaultOptions = {
            letter: axLetter,
            font: layoutOut.font,
            outerTicks: outerTicks[axName],
            showGrid: !noGrids[axName],
            data: ax2traces[axName] || [],
            bgColor: bgColor,
            calendar: layoutOut.calendar,
            automargin: true,
            visibleDflt: visibleDflt,
            reverseDflt: reverseDflt,
            splomStash: ((layoutOut._splomAxes || {})[axLetter] || {})[axId]
        };

        coerce('uirevision', layoutOut.uirevision);

        handleTypeDefaults(axLayoutIn, axLayoutOut, coerce, defaultOptions);
        handleAxisDefaults(axLayoutIn, axLayoutOut, coerce, defaultOptions, layoutOut);

        var unifiedSpike = unifiedHover && axLetter === hovermode.charAt(0);
        var spikecolor = coerce2('spikecolor', unifiedHover ? axLayoutOut.color : undefined);
        var spikethickness = coerce2('spikethickness', unifiedHover ? 1.5 : undefined);
        var spikedash = coerce2('spikedash', unifiedHover ? 'dot' : undefined);
        var spikemode = coerce2('spikemode', unifiedHover ? 'across' : undefined);
        var spikesnap = coerce2('spikesnap', unifiedHover ? 'hovered data' : undefined);
        var showSpikes = coerce('showspikes', !!unifiedSpike || !!spikecolor || !!spikethickness || !!spikedash || !!spikemode || !!spikesnap);

        if(!showSpikes) {
            delete axLayoutOut.spikecolor;
            delete axLayoutOut.spikethickness;
            delete axLayoutOut.spikedash;
            delete axLayoutOut.spikemode;
            delete axLayoutOut.spikesnap;
        }

        handlePositionDefaults(axLayoutIn, axLayoutOut, coerce, {
            letter: axLetter,
            counterAxes: counterAxes[axLetter],
            overlayableAxes: getOverlayableAxes(axLetter, axName),
            grid: layoutOut.grid
        });

        coerce('title.standoff');

        addMissingMatchedAxis();

        axLayoutOut._input = axLayoutIn;
    }

    // coerce the 'missing' axes
    i = 0;
    while(i < missingMatchedAxisIds.length) {
        axId = missingMatchedAxisIds[i++];
        axName = id2name(axId);
        axLetter = axName.charAt(0);

        if(!Lib.isPlainObject(layoutIn[axName])) {
            layoutIn[axName] = {};
        }

        axLayoutIn = layoutIn[axName];
        axLayoutOut = Template.newContainer(layoutOut, axName, axLetter + 'axis');
        newAxLayoutOut();

        var defaultOptions2 = {
            letter: axLetter,
            font: layoutOut.font,
            outerTicks: outerTicks[axName],
            showGrid: !noGrids[axName],
            data: [],
            bgColor: bgColor,
            calendar: layoutOut.calendar,
            automargin: true,
            visibleDflt: false,
            reverseDflt: false,
            splomStash: ((layoutOut._splomAxes || {})[axLetter] || {})[axId]
        };

        coerce('uirevision', layoutOut.uirevision);

        axLayoutOut.type = missingMatchedAxisIdsLookup[axId] || 'linear';

        handleAxisDefaults(axLayoutIn, axLayoutOut, coerce, defaultOptions2, layoutOut);

        handlePositionDefaults(axLayoutIn, axLayoutOut, coerce, {
            letter: axLetter,
            counterAxes: counterAxes[axLetter],
            overlayableAxes: getOverlayableAxes(axLetter, axName),
            grid: layoutOut.grid
        });

        coerce('fixedrange');

        addMissingMatchedAxis();

        axLayoutOut._input = axLayoutIn;
    }

    // quick second pass for range slider and selector defaults
    var rangeSliderDefaults = getComponentMethod('rangeslider', 'handleDefaults');
    var rangeSelectorDefaults = getComponentMethod('rangeselector', 'handleDefaults');

    for(i = 0; i < xNames.length; i++) {
        axName = xNames[i];
        axLayoutIn = layoutIn[axName];
        axLayoutOut = layoutOut[axName];

        rangeSliderDefaults(layoutIn, layoutOut, axName);

        if(axLayoutOut.type === 'date') {
            rangeSelectorDefaults(
                axLayoutIn,
                axLayoutOut,
                layoutOut,
                yNames,
                axLayoutOut.calendar
            );
        }

        coerce('fixedrange');
    }

    for(i = 0; i < yNames.length; i++) {
        axName = yNames[i];
        axLayoutIn = layoutIn[axName];
        axLayoutOut = layoutOut[axName];

        var anchoredAxis = layoutOut[id2name(axLayoutOut.anchor)];

        var fixedRangeDflt = getComponentMethod('rangeslider', 'isVisible')(anchoredAxis);

        coerce('fixedrange', fixedRangeDflt);
    }

    // Finally, handle scale constraints and matching axes.
    //
    // We need to do this after all axes have coerced both `type`
    // (so we link only axes of the same type) and
    // `fixedrange` (so we can avoid linking from OR TO a fixed axis).

    // sets of axes linked by `scaleanchor` along with the scaleratios compounded
    // together, populated in handleConstraintDefaults
    var constraintGroups = layoutOut._axisConstraintGroups = [];
    // similar to _axisConstraintGroups, but for matching axes
    var matchGroups = layoutOut._axisMatchGroups = [];
    // make sure to include 'missing' axes here
    var allAxisIdsIncludingMissing = allAxisIds.concat(missingMatchedAxisIds);
    var axNamesIncludingMissing = axNames.concat(Lib.simpleMap(missingMatchedAxisIds, id2name));

    for(i = 0; i < axNamesIncludingMissing.length; i++) {
        axName = axNamesIncludingMissing[i];
        axLetter = axName.charAt(0);
        axLayoutIn = layoutIn[axName];
        axLayoutOut = layoutOut[axName];

        var scaleanchorDflt;
        if(axLetter === 'y' && !axLayoutIn.hasOwnProperty('scaleanchor') && axHasImage[axName]) {
            scaleanchorDflt = axLayoutOut.anchor;
        } else {
            scaleanchorDflt = undefined;
        }

        var constrainDflt;
        if(!axLayoutIn.hasOwnProperty('constrain') && axHasImage[axName]) {
            constrainDflt = 'domain';
        } else {
            constrainDflt = undefined;
        }

        handleConstraintDefaults(axLayoutIn, axLayoutOut, coerce, {
            allAxisIds: allAxisIdsIncludingMissing,
            layoutOut: layoutOut,
            scaleanchorDflt: scaleanchorDflt,
            constrainDflt: constrainDflt
        });
    }

    for(i = 0; i < matchGroups.length; i++) {
        var group = matchGroups[i];
        var rng = null;
        var autorange = null;

        // find 'matching' range attrs
        for(axId in group) {
            axLayoutOut = layoutOut[id2name(axId)];
            if(!axLayoutOut.matches) {
                rng = axLayoutOut.range;
                autorange = axLayoutOut.autorange;
            }
        }
        // if `ax.matches` values are reciprocal,
        // pick values of first axis in group
        if(rng === null || autorange === null) {
            for(axId in group) {
                axLayoutOut = layoutOut[id2name(axId)];
                rng = axLayoutOut.range;
                autorange = axLayoutOut.autorange;
                break;
            }
        }
        // apply matching range attrs
        for(axId in group) {
            axLayoutOut = layoutOut[id2name(axId)];
            if(axLayoutOut.matches) {
                axLayoutOut.range = rng.slice();
                axLayoutOut.autorange = autorange;
            }
            axLayoutOut._matchGroup = group;
        }

        // remove matching axis from scaleanchor constraint groups (for now)
        if(constraintGroups.length) {
            for(axId in group) {
                for(j = 0; j < constraintGroups.length; j++) {
                    var group2 = constraintGroups[j];
                    for(var axId2 in group2) {
                        if(axId === axId2) {
                            Lib.warn('Axis ' + axId2 + ' is set with both ' +
                                'a *scaleanchor* and *matches* constraint; ' +
                                'ignoring the scale constraint.');

                            delete group2[axId2];
                            if(Object.keys(group2).length < 2) {
                                constraintGroups.splice(j, 1);
                            }
                        }
                    }
                }
            }
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/position_defaults.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/position_defaults.js ***!
  \*************************************************************************/
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


module.exports = function handlePositionDefaults(containerIn, containerOut, coerce, options) {
    var counterAxes = options.counterAxes || [];
    var overlayableAxes = options.overlayableAxes || [];
    var letter = options.letter;
    var grid = options.grid;

    var dfltAnchor, dfltDomain, dfltSide, dfltPosition;

    if(grid) {
        dfltDomain = grid._domains[letter][grid._axisMap[containerOut._id]];
        dfltAnchor = grid._anchors[containerOut._id];
        if(dfltDomain) {
            dfltSide = grid[letter + 'side'].split(' ')[0];
            dfltPosition = grid.domain[letter][dfltSide === 'right' || dfltSide === 'top' ? 1 : 0];
        }
    }

    // Even if there's a grid, this axis may not be in it - fall back on non-grid defaults
    dfltDomain = dfltDomain || [0, 1];
    dfltAnchor = dfltAnchor || (isNumeric(containerIn.position) ? 'free' : (counterAxes[0] || 'free'));
    dfltSide = dfltSide || (letter === 'x' ? 'bottom' : 'left');
    dfltPosition = dfltPosition || 0;

    var anchor = Lib.coerce(containerIn, containerOut, {
        anchor: {
            valType: 'enumerated',
            values: ['free'].concat(counterAxes),
            dflt: dfltAnchor
        }
    }, 'anchor');

    if(anchor === 'free') coerce('position', dfltPosition);

    Lib.coerce(containerIn, containerOut, {
        side: {
            valType: 'enumerated',
            values: letter === 'x' ? ['bottom', 'top'] : ['left', 'right'],
            dflt: dfltSide
        }
    }, 'side');

    var overlaying = false;
    if(overlayableAxes.length) {
        overlaying = Lib.coerce(containerIn, containerOut, {
            overlaying: {
                valType: 'enumerated',
                values: [false].concat(overlayableAxes),
                dflt: false
            }
        }, 'overlaying');
    }

    if(!overlaying) {
        // TODO: right now I'm copying this domain over to overlaying axes
        // in ax.setscale()... but this means we still need (imperfect) logic
        // in the axes popover to hide domain for the overlaying axis.
        // perhaps I should make a private version _domain that all axes get???
        var domain = coerce('domain', dfltDomain);

        // according to https://www.npmjs.com/package/canvas-size
        // the minimum value of max canvas width across browsers and devices is 4096
        // which applied in the calculation below:
        if(domain[0] > domain[1] - 1 / 4096) containerOut.domain = dfltDomain;
        Lib.noneOrAll(containerIn.domain, containerOut.domain, dfltDomain);
    }

    coerce('layer');

    return containerOut;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/transition_axes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/transition_axes.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Axes = __webpack_require__(/*! ./axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");

/**
 * transitionAxes
 *
 * transition axes from one set of ranges to another, using a svg
 * transformations, similar to during panning.
 *
 * @param {DOM element | object} gd
 * @param {array} edits : array of 'edits', each item with
 * - plotinfo {object} subplot object
 * - xr0 {array} initial x-range
 * - xr1 {array} end x-range
 * - yr0 {array} initial y-range
 * - yr1 {array} end y-range
 * @param {object} transitionOpts
 * @param {function} makeOnCompleteCallback
 */
module.exports = function transitionAxes(gd, edits, transitionOpts, makeOnCompleteCallback) {
    var fullLayout = gd._fullLayout;

    // special case for redraw:false Plotly.animate that relies on this
    // to update axis-referenced layout components
    if(edits.length === 0) {
        Axes.redrawComponents(gd);
        return;
    }

    function unsetSubplotTransform(subplot) {
        var xa = subplot.xaxis;
        var ya = subplot.yaxis;

        fullLayout._defs.select('#' + subplot.clipId + '> rect')
            .call(Drawing.setTranslate, 0, 0)
            .call(Drawing.setScale, 1, 1);

        subplot.plot
            .call(Drawing.setTranslate, xa._offset, ya._offset)
            .call(Drawing.setScale, 1, 1);

        var traceGroups = subplot.plot.selectAll('.scatterlayer .trace');

        // This is specifically directed at scatter traces, applying an inverse
        // scale to individual points to counteract the scale of the trace
        // as a whole:
        traceGroups.selectAll('.point')
            .call(Drawing.setPointGroupScale, 1, 1);
        traceGroups.selectAll('.textpoint')
            .call(Drawing.setTextPointsScale, 1, 1);
        traceGroups
            .call(Drawing.hideOutsideRangePoints, subplot);
    }

    function updateSubplot(edit, progress) {
        var plotinfo = edit.plotinfo;
        var xa = plotinfo.xaxis;
        var ya = plotinfo.yaxis;
        var xlen = xa._length;
        var ylen = ya._length;
        var editX = !!edit.xr1;
        var editY = !!edit.yr1;
        var viewBox = [];

        if(editX) {
            var xr0 = Lib.simpleMap(edit.xr0, xa.r2l);
            var xr1 = Lib.simpleMap(edit.xr1, xa.r2l);
            var dx0 = xr0[1] - xr0[0];
            var dx1 = xr1[1] - xr1[0];
            viewBox[0] = (xr0[0] * (1 - progress) + progress * xr1[0] - xr0[0]) / (xr0[1] - xr0[0]) * xlen;
            viewBox[2] = xlen * ((1 - progress) + progress * dx1 / dx0);
            xa.range[0] = xa.l2r(xr0[0] * (1 - progress) + progress * xr1[0]);
            xa.range[1] = xa.l2r(xr0[1] * (1 - progress) + progress * xr1[1]);
        } else {
            viewBox[0] = 0;
            viewBox[2] = xlen;
        }

        if(editY) {
            var yr0 = Lib.simpleMap(edit.yr0, ya.r2l);
            var yr1 = Lib.simpleMap(edit.yr1, ya.r2l);
            var dy0 = yr0[1] - yr0[0];
            var dy1 = yr1[1] - yr1[0];
            viewBox[1] = (yr0[1] * (1 - progress) + progress * yr1[1] - yr0[1]) / (yr0[0] - yr0[1]) * ylen;
            viewBox[3] = ylen * ((1 - progress) + progress * dy1 / dy0);
            ya.range[0] = xa.l2r(yr0[0] * (1 - progress) + progress * yr1[0]);
            ya.range[1] = ya.l2r(yr0[1] * (1 - progress) + progress * yr1[1]);
        } else {
            viewBox[1] = 0;
            viewBox[3] = ylen;
        }

        Axes.drawOne(gd, xa, {skipTitle: true});
        Axes.drawOne(gd, ya, {skipTitle: true});
        Axes.redrawComponents(gd, [xa._id, ya._id]);

        var xScaleFactor = editX ? xlen / viewBox[2] : 1;
        var yScaleFactor = editY ? ylen / viewBox[3] : 1;
        var clipDx = editX ? viewBox[0] : 0;
        var clipDy = editY ? viewBox[1] : 0;
        var fracDx = editX ? (viewBox[0] / viewBox[2] * xlen) : 0;
        var fracDy = editY ? (viewBox[1] / viewBox[3] * ylen) : 0;
        var plotDx = xa._offset - fracDx;
        var plotDy = ya._offset - fracDy;

        plotinfo.clipRect
            .call(Drawing.setTranslate, clipDx, clipDy)
            .call(Drawing.setScale, 1 / xScaleFactor, 1 / yScaleFactor);

        plotinfo.plot
            .call(Drawing.setTranslate, plotDx, plotDy)
            .call(Drawing.setScale, xScaleFactor, yScaleFactor);

        // apply an inverse scale to individual points to counteract
        // the scale of the trace group.
        Drawing.setPointGroupScale(plotinfo.zoomScalePts, 1 / xScaleFactor, 1 / yScaleFactor);
        Drawing.setTextPointsScale(plotinfo.zoomScaleTxt, 1 / xScaleFactor, 1 / yScaleFactor);
    }

    var onComplete;
    if(makeOnCompleteCallback) {
        // This module makes the choice whether or not it notifies Plotly.transition
        // about completion:
        onComplete = makeOnCompleteCallback();
    }

    function transitionComplete() {
        var aobj = {};

        for(var i = 0; i < edits.length; i++) {
            var edit = edits[i];
            var xa = edit.plotinfo.xaxis;
            var ya = edit.plotinfo.yaxis;
            if(edit.xr1) aobj[xa._name + '.range'] = edit.xr1.slice();
            if(edit.yr1) aobj[ya._name + '.range'] = edit.yr1.slice();
        }

        // Signal that this transition has completed:
        onComplete && onComplete();

        return Registry.call('relayout', gd, aobj).then(function() {
            for(var i = 0; i < edits.length; i++) {
                unsetSubplotTransform(edits[i].plotinfo);
            }
        });
    }

    function transitionInterrupt() {
        var aobj = {};

        for(var i = 0; i < edits.length; i++) {
            var edit = edits[i];
            var xa = edit.plotinfo.xaxis;
            var ya = edit.plotinfo.yaxis;
            if(edit.xr0) aobj[xa._name + '.range'] = edit.xr0.slice();
            if(edit.yr0) aobj[ya._name + '.range'] = edit.yr0.slice();
        }

        return Registry.call('relayout', gd, aobj).then(function() {
            for(var i = 0; i < edits.length; i++) {
                unsetSubplotTransform(edits[i].plotinfo);
            }
        });
    }

    var t1, t2, raf;
    var easeFn = d3.ease(transitionOpts.easing);

    gd._transitionData._interruptCallbacks.push(function() {
        window.cancelAnimationFrame(raf);
        raf = null;
        return transitionInterrupt();
    });

    function doFrame() {
        t2 = Date.now();

        var tInterp = Math.min(1, (t2 - t1) / transitionOpts.duration);
        var progress = easeFn(tInterp);

        for(var i = 0; i < edits.length; i++) {
            updateSubplot(edits[i], progress);
        }

        if(t2 - t1 > transitionOpts.duration) {
            transitionComplete();
            raf = window.cancelAnimationFrame(doFrame);
        } else {
            raf = window.requestAnimationFrame(doFrame);
        }
    }

    t1 = Date.now();
    raf = window.requestAnimationFrame(doFrame);

    return Promise.resolve();
};


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


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2NhcnRlc2lhbi9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL2xheW91dF9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL3Bvc2l0aW9uX2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9jYXJ0ZXNpYW4vdHJhbnNpdGlvbl9heGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9jYXJ0ZXNpYW4vdHlwZV9kZWZhdWx0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7O0FBR2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7O0FBRXJCLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDdkMsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLFlB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RUE7QUFDQTs7QUFFQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLGNBQWMsb0JBQW9CO0FBQ2xDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9EQUFvRCxpQkFBaUI7QUFDckU7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvREFBb0QsaUJBQWlCO0FBQ3JFOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGNBQWMsbUJBQW1CO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxjQUFjLG1CQUFtQjtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtB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O0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQzs7QUFFQTtBQUNBO0FBQ0EscURBQXFEO0FBQ3JEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVksZUFBZTtBQUMzQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnRjOGU2ZTZhNWVlMGM0Y2Y2NTRhMC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB4YXhpczoge1xuICAgICAgICB2YWxUeXBlOiAnc3VicGxvdGlkJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAneCcsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYytjbGVhckF4aXNUeXBlcycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyBhIHJlZmVyZW5jZSBiZXR3ZWVuIHRoaXMgdHJhY2VcXCdzIHggY29vcmRpbmF0ZXMgYW5kJyxcbiAgICAgICAgICAgICdhIDJEIGNhcnRlc2lhbiB4IGF4aXMuJyxcbiAgICAgICAgICAgICdJZiAqeCogKHRoZSBkZWZhdWx0IHZhbHVlKSwgdGhlIHggY29vcmRpbmF0ZXMgcmVmZXIgdG8nLFxuICAgICAgICAgICAgJ2BsYXlvdXQueGF4aXNgLicsXG4gICAgICAgICAgICAnSWYgKngyKiwgdGhlIHggY29vcmRpbmF0ZXMgcmVmZXIgdG8gYGxheW91dC54YXhpczJgLCBhbmQgc28gb24uJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeWF4aXM6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N1YnBsb3RpZCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogJ3knLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrY2xlYXJBeGlzVHlwZXMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgYSByZWZlcmVuY2UgYmV0d2VlbiB0aGlzIHRyYWNlXFwncyB5IGNvb3JkaW5hdGVzIGFuZCcsXG4gICAgICAgICAgICAnYSAyRCBjYXJ0ZXNpYW4geSBheGlzLicsXG4gICAgICAgICAgICAnSWYgKnkqICh0aGUgZGVmYXVsdCB2YWx1ZSksIHRoZSB5IGNvb3JkaW5hdGVzIHJlZmVyIHRvJyxcbiAgICAgICAgICAgICdgbGF5b3V0LnlheGlzYC4nLFxuICAgICAgICAgICAgJ0lmICp5MiosIHRoZSB5IGNvb3JkaW5hdGVzIHJlZmVyIHRvIGBsYXlvdXQueWF4aXMyYCwgYW5kIHNvIG9uLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgUGxvdHMgPSByZXF1aXJlKCcuLi9wbG90cycpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcblxudmFyIGdldE1vZHVsZUNhbGNEYXRhID0gcmVxdWlyZSgnLi4vZ2V0X2RhdGEnKS5nZXRNb2R1bGVDYWxjRGF0YTtcbnZhciBheGlzSWRzID0gcmVxdWlyZSgnLi9heGlzX2lkcycpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgeG1sbnNOYW1lc3BhY2VzID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL3htbG5zX25hbWVzcGFjZXMnKTtcblxudmFyIGVuc3VyZVNpbmdsZSA9IExpYi5lbnN1cmVTaW5nbGU7XG5cbmZ1bmN0aW9uIGVuc3VyZVNpbmdsZUFuZEFkZERhdHVtKHBhcmVudCwgbm9kZVR5cGUsIGNsYXNzTmFtZSkge1xuICAgIHJldHVybiBMaWIuZW5zdXJlU2luZ2xlKHBhcmVudCwgbm9kZVR5cGUsIGNsYXNzTmFtZSwgZnVuY3Rpb24ocykge1xuICAgICAgICBzLmRhdHVtKGNsYXNzTmFtZSk7XG4gICAgfSk7XG59XG5cbmV4cG9ydHMubmFtZSA9ICdjYXJ0ZXNpYW4nO1xuXG5leHBvcnRzLmF0dHIgPSBbJ3hheGlzJywgJ3lheGlzJ107XG5cbmV4cG9ydHMuaWRSb290ID0gWyd4JywgJ3knXTtcblxuZXhwb3J0cy5pZFJlZ2V4ID0gY29uc3RhbnRzLmlkUmVnZXg7XG5cbmV4cG9ydHMuYXR0clJlZ2V4ID0gY29uc3RhbnRzLmF0dHJSZWdleDtcblxuZXhwb3J0cy5hdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cbmV4cG9ydHMubGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxuZXhwb3J0cy5zdXBwbHlMYXlvdXREZWZhdWx0cyA9IHJlcXVpcmUoJy4vbGF5b3V0X2RlZmF1bHRzJyk7XG5cbmV4cG9ydHMudHJhbnNpdGlvbkF4ZXMgPSByZXF1aXJlKCcuL3RyYW5zaXRpb25fYXhlcycpO1xuXG5leHBvcnRzLmZpbmFsaXplU3VicGxvdHMgPSBmdW5jdGlvbihsYXlvdXRJbiwgbGF5b3V0T3V0KSB7XG4gICAgdmFyIHN1YnBsb3RzID0gbGF5b3V0T3V0Ll9zdWJwbG90cztcbiAgICB2YXIgeExpc3QgPSBzdWJwbG90cy54YXhpcztcbiAgICB2YXIgeUxpc3QgPSBzdWJwbG90cy55YXhpcztcbiAgICB2YXIgc3BTVkcgPSBzdWJwbG90cy5jYXJ0ZXNpYW47XG4gICAgdmFyIHNwQWxsID0gc3BTVkcuY29uY2F0KHN1YnBsb3RzLmdsMmQgfHwgW10pO1xuICAgIHZhciBhbGxYID0ge307XG4gICAgdmFyIGFsbFkgPSB7fTtcbiAgICB2YXIgaSwgeGksIHlpO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgc3BBbGwubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBhcnRzID0gc3BBbGxbaV0uc3BsaXQoJ3knKTtcbiAgICAgICAgYWxsWFtwYXJ0c1swXV0gPSAxO1xuICAgICAgICBhbGxZWyd5JyArIHBhcnRzWzFdXSA9IDE7XG4gICAgfVxuXG4gICAgLy8gY2hlY2sgZm9yIHggYXhlcyB3aXRoIG5vIHN1YnBsb3QsIGFuZCBtYWtlIG9uZSBmcm9tIHRoZSBhbmNob3Igb2YgdGhhdCB4IGF4aXNcbiAgICBmb3IoaSA9IDA7IGkgPCB4TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB4aSA9IHhMaXN0W2ldO1xuICAgICAgICBpZighYWxsWFt4aV0pIHtcbiAgICAgICAgICAgIHlpID0gKGxheW91dEluW2F4aXNJZHMuaWQybmFtZSh4aSldIHx8IHt9KS5hbmNob3I7XG4gICAgICAgICAgICBpZighY29uc3RhbnRzLmlkUmVnZXgueS50ZXN0KHlpKSkgeWkgPSAneSc7XG4gICAgICAgICAgICBzcFNWRy5wdXNoKHhpICsgeWkpO1xuICAgICAgICAgICAgc3BBbGwucHVzaCh4aSArIHlpKTtcblxuICAgICAgICAgICAgaWYoIWFsbFlbeWldKSB7XG4gICAgICAgICAgICAgICAgYWxsWVt5aV0gPSAxO1xuICAgICAgICAgICAgICAgIExpYi5wdXNoVW5pcXVlKHlMaXN0LCB5aSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzYW1lIGZvciB5IGF4ZXMgd2l0aCBubyBzdWJwbG90XG4gICAgZm9yKGkgPSAwOyBpIDwgeUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgeWkgPSB5TGlzdFtpXTtcbiAgICAgICAgaWYoIWFsbFlbeWldKSB7XG4gICAgICAgICAgICB4aSA9IChsYXlvdXRJbltheGlzSWRzLmlkMm5hbWUoeWkpXSB8fCB7fSkuYW5jaG9yO1xuICAgICAgICAgICAgaWYoIWNvbnN0YW50cy5pZFJlZ2V4LngudGVzdCh4aSkpIHhpID0gJ3gnO1xuICAgICAgICAgICAgc3BTVkcucHVzaCh4aSArIHlpKTtcbiAgICAgICAgICAgIHNwQWxsLnB1c2goeGkgKyB5aSk7XG5cbiAgICAgICAgICAgIGlmKCFhbGxYW3hpXSkge1xuICAgICAgICAgICAgICAgIGFsbFhbeGldID0gMTtcbiAgICAgICAgICAgICAgICBMaWIucHVzaFVuaXF1ZSh4TGlzdCwgeGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZmluYWxseSwgaWYgd2UndmUgZ290dGVuIGhlcmUgd2UncmUgc3VwcG9zZWQgdG8gc2hvdyBjYXJ0ZXNpYW4uLi5cbiAgICAvLyBzbyBpZiB0aGVyZSBhcmUgTk8gc3VicGxvdHMgYXQgYWxsLCBtYWtlIG9uZSBmcm9tIHRoZSBmaXJzdFxuICAgIC8vIHggJiB5IGF4ZXMgaW4gdGhlIGlucHV0IGxheW91dFxuICAgIGlmKCFzcEFsbC5sZW5ndGgpIHtcbiAgICAgICAgeGkgPSAnJztcbiAgICAgICAgeWkgPSAnJztcbiAgICAgICAgZm9yKHZhciBraSBpbiBsYXlvdXRJbikge1xuICAgICAgICAgICAgaWYoY29uc3RhbnRzLmF0dHJSZWdleC50ZXN0KGtpKSkge1xuICAgICAgICAgICAgICAgIHZhciBheExldHRlciA9IGtpLmNoYXJBdCgwKTtcbiAgICAgICAgICAgICAgICBpZihheExldHRlciA9PT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKCF4aSB8fCAoK2tpLnN1YnN0cig1KSA8ICt4aS5zdWJzdHIoNSkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aSA9IGtpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKCF5aSB8fCAoK2tpLnN1YnN0cig1KSA8ICt5aS5zdWJzdHIoNSkpKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpID0ga2k7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHhpID0geGkgPyBheGlzSWRzLm5hbWUyaWQoeGkpIDogJ3gnO1xuICAgICAgICB5aSA9IHlpID8gYXhpc0lkcy5uYW1lMmlkKHlpKSA6ICd5JztcbiAgICAgICAgeExpc3QucHVzaCh4aSk7XG4gICAgICAgIHlMaXN0LnB1c2goeWkpO1xuICAgICAgICBzcFNWRy5wdXNoKHhpICsgeWkpO1xuICAgIH1cbn07XG5cbi8qKlxuICogQ2FydGVzaWFuLnBsb3RcbiAqXG4gKiBAcGFyYW0ge0RPTSBkaXYgfCBvYmplY3R9IGdkXG4gKiBAcGFyYW0ge2FycmF5IChvcHRpb25hbCl9IHRyYWNlc1xuICogIGFycmF5IG9mIHRyYWNlcyBpbmRpY2VzIHRvIHBsb3RcbiAqICBpZiB1bmRlZmluZWQsIHBsb3RzIGFsbCBjYXJ0ZXNpYW4gdHJhY2VzLFxuICogQHBhcmFtIHtvYmplY3R9IChvcHRpb25hbCkgdHJhbnNpdGlvbk9wdHNcbiAqICB0cmFuc2l0aW9uIG9wdGlvbiBvYmplY3RcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IChvcHRpb25hbCkgbWFrZU9uQ29tcGxldGVDYWxsYmFja1xuICogIHRyYW5zaXRpb24gbWFrZSBjYWxsYmFjayBmdW5jdGlvbiBmcm9tIFBsb3RzLnRyYW5zaXRpb25cbiAqL1xuZXhwb3J0cy5wbG90ID0gZnVuY3Rpb24oZ2QsIHRyYWNlcywgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBzdWJwbG90cyA9IGZ1bGxMYXlvdXQuX3N1YnBsb3RzLmNhcnRlc2lhbjtcbiAgICB2YXIgY2FsY2RhdGEgPSBnZC5jYWxjZGF0YTtcbiAgICB2YXIgaTtcblxuICAgIGlmKCFBcnJheS5pc0FycmF5KHRyYWNlcykpIHtcbiAgICAgICAgLy8gSWYgdHJhY2VzIGlzIG5vdCBwcm92aWRlZCwgdGhlbiBpdCdzIGEgY29tcGxldGUgcmVwbG90IGFuZCBtaXNzaW5nXG4gICAgICAgIC8vIHRyYWNlcyBhcmUgcmVtb3ZlZFxuICAgICAgICB0cmFjZXMgPSBbXTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY2FsY2RhdGEubGVuZ3RoOyBpKyspIHRyYWNlcy5wdXNoKGkpO1xuICAgIH1cblxuICAgIGZvcihpID0gMDsgaSA8IHN1YnBsb3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBzdWJwbG90ID0gc3VicGxvdHNbaV07XG4gICAgICAgIHZhciBzdWJwbG90SW5mbyA9IGZ1bGxMYXlvdXQuX3Bsb3RzW3N1YnBsb3RdO1xuXG4gICAgICAgIC8vIEdldCBhbGwgY2FsY2RhdGEgZm9yIHRoaXMgc3VicGxvdDpcbiAgICAgICAgdmFyIGNkU3VicGxvdCA9IFtdO1xuICAgICAgICB2YXIgcGNkO1xuXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBjYWxjZGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGNkID0gY2FsY2RhdGFbal07XG4gICAgICAgICAgICB2YXIgdHJhY2UgPSBjZFswXS50cmFjZTtcblxuICAgICAgICAgICAgLy8gU2tpcCB0cmFjZSBpZiB3aGl0ZWxpc3QgcHJvdmlkZWQgYW5kIGl0J3Mgbm90IHdoaXRlbGlzdGVkOlxuICAgICAgICAgICAgLy8gaWYgKEFycmF5LmlzQXJyYXkodHJhY2VzKSAmJiB0cmFjZXMuaW5kZXhPZihpKSA9PT0gLTEpIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYodHJhY2UueGF4aXMgKyB0cmFjZS55YXhpcyA9PT0gc3VicGxvdCkge1xuICAgICAgICAgICAgICAgIC8vIFhYWDogU2hvdWxkIHRyYWNlIGNhcnBldCBkZXBlbmRlbmNpZXMuIE9ubHkgcmVwbG90IGFsbCBjYXJwZXQgcGxvdHMgaWYgdGhlIGNhcnBldFxuICAgICAgICAgICAgICAgIC8vIGF4aXMgaGFzIGFjdHVhbGx5IGNoYW5nZWQ6XG4gICAgICAgICAgICAgICAgLy9cbiAgICAgICAgICAgICAgICAvLyBJZiB0aGlzIHRyYWNlIGlzIHNwZWNpZmljYWxseSByZXF1ZXN0ZWQsIGFkZCBpdCB0byB0aGUgbGlzdDpcbiAgICAgICAgICAgICAgICBpZih0cmFjZXMuaW5kZXhPZih0cmFjZS5pbmRleCkgIT09IC0xIHx8IHRyYWNlLmNhcnBldCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBPa2F5LCBzbyBleGFtcGxlOiB0cmFjZXMgMCwgMSwgYW5kIDIgaGF2ZSBmaWxsID0gdG9uZXh0LiBZb3UgYW5pbWF0ZVxuICAgICAgICAgICAgICAgICAgICAvLyB0cmFjZXMgMCBhbmQgMi4gVHJhY2UgMSBhbHNvIG5lZWRzIHRvIGJlIHVwZGF0ZWQsIG90aGVyd2lzZSBpdHMgZmlsbFxuICAgICAgICAgICAgICAgICAgICAvLyBpcyBvdXRkYXRlZC4gU28gdGhpcyByZXRyb2FjdGl2ZWx5IGFkZHMgdGhlIHByZXZpb3VzIHRyYWNlIGlmIHRoZVxuICAgICAgICAgICAgICAgICAgICAvLyB0cmFjZXMgYXJlIGludGVyZGVwZW5kZW50LlxuICAgICAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgICAgIHBjZCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgcGNkWzBdLnRyYWNlLnhheGlzICsgcGNkWzBdLnRyYWNlLnlheGlzID09PSBzdWJwbG90ICYmXG4gICAgICAgICAgICAgICAgICAgICAgICBbJ3RvbmV4dHgnLCAndG9uZXh0eScsICd0b25leHQnXS5pbmRleE9mKHRyYWNlLmZpbGwpICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgY2RTdWJwbG90LmluZGV4T2YocGNkKSA9PT0gLTFcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjZFN1YnBsb3QucHVzaChwY2QpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgY2RTdWJwbG90LnB1c2goY2QpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIFRyYWNrIHRoZSBwcmV2aW91cyB0cmFjZSBvbiB0aGlzIHN1YnBsb3QgZm9yIHRoZSByZXRyb2FjdGl2ZS1hZGQgc3RlcFxuICAgICAgICAgICAgICAgIC8vIGFib3ZlOlxuICAgICAgICAgICAgICAgIHBjZCA9IGNkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcGxvdE9uZShnZCwgc3VicGxvdEluZm8sIGNkU3VicGxvdCwgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spO1xuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHBsb3RPbmUoZ2QsIHBsb3RpbmZvLCBjZFN1YnBsb3QsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgdmFyIHRyYWNlTGF5ZXJDbGFzc2VzID0gY29uc3RhbnRzLnRyYWNlTGF5ZXJDbGFzc2VzO1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIG1vZHVsZXMgPSBmdWxsTGF5b3V0Ll9tb2R1bGVzO1xuICAgIHZhciBfbW9kdWxlLCBjZE1vZHVsZUFuZE90aGVycywgY2RNb2R1bGU7XG5cbiAgICB2YXIgbGF5ZXJEYXRhID0gW107XG4gICAgdmFyIHpvb21TY2FsZVF1ZXJ5UGFydHMgPSBbXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIF9tb2R1bGUgPSBtb2R1bGVzW2ldO1xuICAgICAgICB2YXIgbmFtZSA9IF9tb2R1bGUubmFtZTtcbiAgICAgICAgdmFyIGNhdGVnb3JpZXMgPSBSZWdpc3RyeS5tb2R1bGVzW25hbWVdLmNhdGVnb3JpZXM7XG5cbiAgICAgICAgaWYoY2F0ZWdvcmllcy5zdmcpIHtcbiAgICAgICAgICAgIHZhciBjbGFzc05hbWUgPSAoX21vZHVsZS5sYXllck5hbWUgfHwgbmFtZSArICdsYXllcicpO1xuICAgICAgICAgICAgdmFyIHBsb3RNZXRob2QgPSBfbW9kdWxlLnBsb3Q7XG5cbiAgICAgICAgICAgIC8vIHBsb3QgYWxsIHZpc2libGUgdHJhY2VzIG9mIHRoaXMgdHlwZSBvbiB0aGlzIHN1YnBsb3QgYXQgb25jZVxuICAgICAgICAgICAgY2RNb2R1bGVBbmRPdGhlcnMgPSBnZXRNb2R1bGVDYWxjRGF0YShjZFN1YnBsb3QsIHBsb3RNZXRob2QpO1xuICAgICAgICAgICAgY2RNb2R1bGUgPSBjZE1vZHVsZUFuZE90aGVyc1swXTtcbiAgICAgICAgICAgIC8vIGRvbid0IG5lZWQgdG8gc2VhcmNoIHRoZSBmb3VuZCB0cmFjZXMgYWdhaW4gLSBpbiBmYWN0IHdlIG5lZWQgdG8gTk9UXG4gICAgICAgICAgICAvLyBzbyB0aGF0IGlmIHR3byBtb2R1bGVzIHNoYXJlIHRoZSBzYW1lIHBsb3R0ZXIgd2UgZG9uJ3QgZG91YmxlLXBsb3RcbiAgICAgICAgICAgIGNkU3VicGxvdCA9IGNkTW9kdWxlQW5kT3RoZXJzWzFdO1xuXG4gICAgICAgICAgICBpZihjZE1vZHVsZS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBsYXllckRhdGEucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgIGk6IHRyYWNlTGF5ZXJDbGFzc2VzLmluZGV4T2YoY2xhc3NOYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOiBjbGFzc05hbWUsXG4gICAgICAgICAgICAgICAgICAgIHBsb3RNZXRob2Q6IHBsb3RNZXRob2QsXG4gICAgICAgICAgICAgICAgICAgIGNkTW9kdWxlOiBjZE1vZHVsZVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihjYXRlZ29yaWVzLnpvb21TY2FsZSkge1xuICAgICAgICAgICAgICAgIHpvb21TY2FsZVF1ZXJ5UGFydHMucHVzaCgnLicgKyBjbGFzc05hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbGF5ZXJEYXRhLnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gYS5pIC0gYi5pOyB9KTtcblxuICAgIHZhciBsYXllcnMgPSBwbG90aW5mby5wbG90LnNlbGVjdEFsbCgnZy5tbGF5ZXInKVxuICAgICAgICAuZGF0YShsYXllckRhdGEsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuY2xhc3NOYW1lOyB9KTtcblxuICAgIGxheWVycy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQuY2xhc3NOYW1lOyB9KVxuICAgICAgICAuY2xhc3NlZCgnbWxheWVyJywgdHJ1ZSlcbiAgICAgICAgLmNsYXNzZWQoJ3JhbmdlcGxvdCcsIHBsb3RpbmZvLmlzUmFuZ2VQbG90KTtcblxuICAgIGxheWVycy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICBsYXllcnMub3JkZXIoKTtcblxuICAgIGxheWVycy5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHNlbCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IGQuY2xhc3NOYW1lO1xuXG4gICAgICAgIGQucGxvdE1ldGhvZChcbiAgICAgICAgICAgIGdkLCBwbG90aW5mbywgZC5jZE1vZHVsZSwgc2VsLFxuICAgICAgICAgICAgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2tcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBsYXllcnMgdGhhdCBhbGxvdyBgY2xpcG9uYXhpczogZmFsc2VgXG4gICAgICAgIGlmKGNvbnN0YW50cy5jbGlwT25BeGlzRmFsc2VRdWVyeS5pbmRleE9mKCcuJyArIGNsYXNzTmFtZSkgPT09IC0xKSB7XG4gICAgICAgICAgICBEcmF3aW5nLnNldENsaXBVcmwoc2VsLCBwbG90aW5mby5sYXllckNsaXBJZCwgZ2QpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBjYWxsIFNjYXR0ZXJnbC5wbG90IHNlcGFyYXRlbHlcbiAgICBpZihmdWxsTGF5b3V0Ll9oYXMoJ3NjYXR0ZXJnbCcpKSB7XG4gICAgICAgIF9tb2R1bGUgPSBSZWdpc3RyeS5nZXRNb2R1bGUoJ3NjYXR0ZXJnbCcpO1xuICAgICAgICBjZE1vZHVsZSA9IGdldE1vZHVsZUNhbGNEYXRhKGNkU3VicGxvdCwgX21vZHVsZSlbMF07XG4gICAgICAgIF9tb2R1bGUucGxvdChnZCwgcGxvdGluZm8sIGNkTW9kdWxlKTtcbiAgICB9XG5cbiAgICAvLyBzdGFzaCBcImhvdFwiIHNlbGVjdGlvbnMgZm9yIGZhc3RlciBpbnRlcmFjdGlvbiBvbiBkcmFnIGFuZCBzY3JvbGxcbiAgICBpZighZ2QuX2NvbnRleHQuc3RhdGljUGxvdCkge1xuICAgICAgICBpZihwbG90aW5mby5faGFzQ2xpcE9uQXhpc0ZhbHNlKSB7XG4gICAgICAgICAgICBwbG90aW5mby5jbGlwT25BeGlzRmFsc2VUcmFjZXMgPSBwbG90aW5mby5wbG90XG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbChjb25zdGFudHMuY2xpcE9uQXhpc0ZhbHNlUXVlcnkuam9pbignLCcpKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJy50cmFjZScpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoem9vbVNjYWxlUXVlcnlQYXJ0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHZhciB0cmFjZXMgPSBwbG90aW5mby5wbG90XG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCh6b29tU2NhbGVRdWVyeVBhcnRzLmpvaW4oJywnKSlcbiAgICAgICAgICAgICAgICAuc2VsZWN0QWxsKCcudHJhY2UnKTtcblxuICAgICAgICAgICAgcGxvdGluZm8uem9vbVNjYWxlUHRzID0gdHJhY2VzLnNlbGVjdEFsbCgncGF0aC5wb2ludCcpO1xuICAgICAgICAgICAgcGxvdGluZm8uem9vbVNjYWxlVHh0ID0gdHJhY2VzLnNlbGVjdEFsbCgnLnRleHRwb2ludCcpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnRzLmNsZWFuID0gZnVuY3Rpb24obmV3RnVsbERhdGEsIG5ld0Z1bGxMYXlvdXQsIG9sZEZ1bGxEYXRhLCBvbGRGdWxsTGF5b3V0KSB7XG4gICAgdmFyIG9sZFBsb3RzID0gb2xkRnVsbExheW91dC5fcGxvdHMgfHwge307XG4gICAgdmFyIG5ld1Bsb3RzID0gbmV3RnVsbExheW91dC5fcGxvdHMgfHwge307XG4gICAgdmFyIG9sZFN1YnBsb3RMaXN0ID0gb2xkRnVsbExheW91dC5fc3VicGxvdHMgfHwge307XG4gICAgdmFyIHBsb3RpbmZvO1xuICAgIHZhciBpLCBrO1xuXG4gICAgLy8gd2hlbiBnb2luZyBmcm9tIGEgbGFyZ2Ugc3Bsb20gZ3JhcGggdG8gc29tZXRoaW5nIGVsc2UsXG4gICAgLy8gd2UgbmVlZCB0byBjbGVhciA8ZyBzdWJwbG90PiBzbyB0aGF0IHRoZSBuZXcgY2FydGVzaWFuIHN1YnBsb3RcbiAgICAvLyBjYW4gaGF2ZSB0aGUgY29ycmVjdCBsYXllciBvcmRlcmluZ1xuICAgIGlmKG9sZEZ1bGxMYXlvdXQuX2hhc09ubHlMYXJnZVNwbG9tcyAmJiAhbmV3RnVsbExheW91dC5faGFzT25seUxhcmdlU3Bsb21zKSB7XG4gICAgICAgIGZvcihrIGluIG9sZFBsb3RzKSB7XG4gICAgICAgICAgICBwbG90aW5mbyA9IG9sZFBsb3RzW2tdO1xuICAgICAgICAgICAgaWYocGxvdGluZm8ucGxvdGdyb3VwKSBwbG90aW5mby5wbG90Z3JvdXAucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgaGFkR2wgPSAob2xkRnVsbExheW91dC5faGFzICYmIG9sZEZ1bGxMYXlvdXQuX2hhcygnZ2wnKSk7XG4gICAgdmFyIGhhc0dsID0gKG5ld0Z1bGxMYXlvdXQuX2hhcyAmJiBuZXdGdWxsTGF5b3V0Ll9oYXMoJ2dsJykpO1xuXG4gICAgaWYoaGFkR2wgJiYgIWhhc0dsKSB7XG4gICAgICAgIGZvcihrIGluIG9sZFBsb3RzKSB7XG4gICAgICAgICAgICBwbG90aW5mbyA9IG9sZFBsb3RzW2tdO1xuICAgICAgICAgICAgaWYocGxvdGluZm8uX3NjZW5lKSBwbG90aW5mby5fc2NlbmUuZGVzdHJveSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZGVsZXRlIGFueSB0aXRsZXMgd2UgZG9uJ3QgbmVlZCBhbnltb3JlXG4gICAgLy8gY2hlY2sgaWYgYXhpcyBsaXN0IGhhcyBjaGFuZ2VkLCBhbmQgaWYgc28gY2xlYXIgb2xkIHRpdGxlc1xuICAgIGlmKG9sZFN1YnBsb3RMaXN0LnhheGlzICYmIG9sZFN1YnBsb3RMaXN0LnlheGlzKSB7XG4gICAgICAgIHZhciBvbGRBeElEcyA9IGF4aXNJZHMubGlzdElkcyh7X2Z1bGxMYXlvdXQ6IG9sZEZ1bGxMYXlvdXR9KTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgb2xkQXhJRHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBvbGRBeElkID0gb2xkQXhJRHNbaV07XG4gICAgICAgICAgICBpZighbmV3RnVsbExheW91dFtheGlzSWRzLmlkMm5hbWUob2xkQXhJZCldKSB7XG4gICAgICAgICAgICAgICAgb2xkRnVsbExheW91dC5faW5mb2xheWVyLnNlbGVjdEFsbCgnLmctJyArIG9sZEF4SWQgKyAndGl0bGUnKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYWRDYXJ0ZXNpYW4gPSAob2xkRnVsbExheW91dC5faGFzICYmIG9sZEZ1bGxMYXlvdXQuX2hhcygnY2FydGVzaWFuJykpO1xuICAgIHZhciBoYXNDYXJ0ZXNpYW4gPSAobmV3RnVsbExheW91dC5faGFzICYmIG5ld0Z1bGxMYXlvdXQuX2hhcygnY2FydGVzaWFuJykpO1xuXG4gICAgaWYoaGFkQ2FydGVzaWFuICYmICFoYXNDYXJ0ZXNpYW4pIHtcbiAgICAgICAgLy8gaWYgd2UndmUgZ290dGVuIHJpZCBvZiBhbGwgY2FydGVzaWFuIHRyYWNlcywgcmVtb3ZlIGFsbCB0aGUgc3VicGxvdCBzdmcgaXRlbXNcblxuICAgICAgICBwdXJnZVN1YnBsb3RMYXllcnMob2xkRnVsbExheW91dC5fY2FydGVzaWFubGF5ZXIuc2VsZWN0QWxsKCcuc3VicGxvdCcpLCBvbGRGdWxsTGF5b3V0KTtcbiAgICAgICAgb2xkRnVsbExheW91dC5fZGVmcy5zZWxlY3RBbGwoJy5heGVzY2xpcCcpLnJlbW92ZSgpO1xuICAgICAgICBkZWxldGUgb2xkRnVsbExheW91dC5fYXhpc0NvbnN0cmFpbnRHcm91cHM7XG4gICAgfSBlbHNlIGlmKG9sZFN1YnBsb3RMaXN0LmNhcnRlc2lhbikge1xuICAgICAgICAvLyBvdGhlcndpc2UgbG9vayBmb3Igc3VicGxvdHMgd2UgbmVlZCB0byByZW1vdmVcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBvbGRTdWJwbG90TGlzdC5jYXJ0ZXNpYW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBvbGRTdWJwbG90SWQgPSBvbGRTdWJwbG90TGlzdC5jYXJ0ZXNpYW5baV07XG4gICAgICAgICAgICBpZighbmV3UGxvdHNbb2xkU3VicGxvdElkXSkge1xuICAgICAgICAgICAgICAgIHZhciBzZWxlY3RvciA9ICcuJyArIG9sZFN1YnBsb3RJZCArICcsLicgKyBvbGRTdWJwbG90SWQgKyAnLXgsLicgKyBvbGRTdWJwbG90SWQgKyAnLXknO1xuICAgICAgICAgICAgICAgIG9sZEZ1bGxMYXlvdXQuX2NhcnRlc2lhbmxheWVyLnNlbGVjdEFsbChzZWxlY3RvcikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgcmVtb3ZlU3VicGxvdEV4dHJhcyhvbGRTdWJwbG90SWQsIG9sZEZ1bGxMYXlvdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0cy5kcmF3RnJhbWV3b3JrID0gZnVuY3Rpb24oZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBzdWJwbG90RGF0YSA9IG1ha2VTdWJwbG90RGF0YShnZCk7XG5cbiAgICB2YXIgc3VicGxvdExheWVycyA9IGZ1bGxMYXlvdXQuX2NhcnRlc2lhbmxheWVyLnNlbGVjdEFsbCgnLnN1YnBsb3QnKVxuICAgICAgICAuZGF0YShzdWJwbG90RGF0YSwgU3RyaW5nKTtcblxuICAgIHN1YnBsb3RMYXllcnMuZW50ZXIoKS5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7IHJldHVybiAnc3VicGxvdCAnICsgZFswXTsgfSk7XG5cbiAgICBzdWJwbG90TGF5ZXJzLm9yZGVyKCk7XG5cbiAgICBzdWJwbG90TGF5ZXJzLmV4aXQoKVxuICAgICAgICAuY2FsbChwdXJnZVN1YnBsb3RMYXllcnMsIGZ1bGxMYXlvdXQpO1xuXG4gICAgc3VicGxvdExheWVycy5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIGlkID0gZFswXTtcbiAgICAgICAgdmFyIHBsb3RpbmZvID0gZnVsbExheW91dC5fcGxvdHNbaWRdO1xuXG4gICAgICAgIHBsb3RpbmZvLnBsb3Rncm91cCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgbWFrZVN1YnBsb3RMYXllcihnZCwgcGxvdGluZm8pO1xuXG4gICAgICAgIC8vIG1ha2Ugc2VwYXJhdGUgZHJhZyBsYXllcnMgZm9yIGVhY2ggc3VicGxvdCxcbiAgICAgICAgLy8gYnV0IGFwcGVuZCB0aGVtIHRvIHBhcGVyIHJhdGhlciB0aGFuIHRoZSBwbG90IGdyb3VwcyxcbiAgICAgICAgLy8gc28gdGhleSBlbmQgdXAgb24gdG9wIG9mIHRoZSByZXN0XG4gICAgICAgIHBsb3RpbmZvLmRyYWdsYXllciA9IGVuc3VyZVNpbmdsZShmdWxsTGF5b3V0Ll9kcmFnZ2VycywgJ2cnLCBpZCk7XG4gICAgfSk7XG59O1xuXG5leHBvcnRzLnJhbmdlUGxvdCA9IGZ1bmN0aW9uKGdkLCBwbG90aW5mbywgY2RTdWJwbG90KSB7XG4gICAgbWFrZVN1YnBsb3RMYXllcihnZCwgcGxvdGluZm8pO1xuICAgIHBsb3RPbmUoZ2QsIHBsb3RpbmZvLCBjZFN1YnBsb3QpO1xuICAgIFBsb3RzLnN0eWxlKGdkKTtcbn07XG5cbmZ1bmN0aW9uIG1ha2VTdWJwbG90RGF0YShnZCkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGlkcyA9IGZ1bGxMYXlvdXQuX3N1YnBsb3RzLmNhcnRlc2lhbjtcbiAgICB2YXIgbGVuID0gaWRzLmxlbmd0aDtcbiAgICB2YXIgaSwgaiwgaWQsIHBsb3RpbmZvLCB4YSwgeWE7XG5cbiAgICAvLyBzcGxpdCAncmVndWxhcicgYW5kICdvdmVybGF5aW5nJyBzdWJwbG90c1xuICAgIHZhciByZWd1bGFycyA9IFtdO1xuICAgIHZhciBvdmVybGF5cyA9IFtdO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWQgPSBpZHNbaV07XG4gICAgICAgIHBsb3RpbmZvID0gZnVsbExheW91dC5fcGxvdHNbaWRdO1xuICAgICAgICB4YSA9IHBsb3RpbmZvLnhheGlzO1xuICAgICAgICB5YSA9IHBsb3RpbmZvLnlheGlzO1xuXG4gICAgICAgIHZhciB4YTIgPSB4YS5fbWFpbkF4aXM7XG4gICAgICAgIHZhciB5YTIgPSB5YS5fbWFpbkF4aXM7XG4gICAgICAgIHZhciBtYWlucGxvdCA9IHhhMi5faWQgKyB5YTIuX2lkO1xuICAgICAgICB2YXIgbWFpbnBsb3RpbmZvID0gZnVsbExheW91dC5fcGxvdHNbbWFpbnBsb3RdO1xuICAgICAgICBwbG90aW5mby5vdmVybGF5cyA9IFtdO1xuXG4gICAgICAgIGlmKG1haW5wbG90ICE9PSBpZCAmJiBtYWlucGxvdGluZm8pIHtcbiAgICAgICAgICAgIHBsb3RpbmZvLm1haW5wbG90ID0gbWFpbnBsb3Q7XG4gICAgICAgICAgICBwbG90aW5mby5tYWlucGxvdGluZm8gPSBtYWlucGxvdGluZm87XG4gICAgICAgICAgICBvdmVybGF5cy5wdXNoKGlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBsb3RpbmZvLm1haW5wbG90ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcGxvdGluZm8ubWFpblBsb3RpbmZvID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgcmVndWxhcnMucHVzaChpZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBmaWxsIGluIGxpc3Qgb2Ygb3ZlcmxheWluZyBzdWJwbG90cyBpbiAnbWFpbiBwbG90J1xuICAgIGZvcihpID0gMDsgaSA8IG92ZXJsYXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlkID0gb3ZlcmxheXNbaV07XG4gICAgICAgIHBsb3RpbmZvID0gZnVsbExheW91dC5fcGxvdHNbaWRdO1xuICAgICAgICBwbG90aW5mby5tYWlucGxvdGluZm8ub3ZlcmxheXMucHVzaChwbG90aW5mbyk7XG4gICAgfVxuXG4gICAgLy8gcHV0ICdyZWd1bGFyJyBzdWJwbG90IGRhdGEgYmVmb3JlICdvdmVybGF5aW5nJ1xuICAgIHZhciBzdWJwbG90SWRzID0gcmVndWxhcnMuY29uY2F0KG92ZXJsYXlzKTtcbiAgICB2YXIgc3VicGxvdERhdGEgPSBuZXcgQXJyYXkobGVuKTtcblxuICAgIGZvcihpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlkID0gc3VicGxvdElkc1tpXTtcbiAgICAgICAgcGxvdGluZm8gPSBmdWxsTGF5b3V0Ll9wbG90c1tpZF07XG4gICAgICAgIHhhID0gcGxvdGluZm8ueGF4aXM7XG4gICAgICAgIHlhID0gcGxvdGluZm8ueWF4aXM7XG5cbiAgICAgICAgLy8gdXNlIGluZm8gYWJvdXQgYXhpcyBsYXllciBhbmQgb3ZlcmxheWluZyBwYXR0ZXJuXG4gICAgICAgIC8vIHRvIGNsZWFuIHdoYXQgbmVlZCB0byBiZSBjbGVhbmVkIHVwIGluIGV4aXQgc2VsZWN0aW9uXG4gICAgICAgIHZhciBkID0gW2lkLCB4YS5sYXllciwgeWEubGF5ZXIsIHhhLm92ZXJsYXlpbmcgfHwgJycsIHlhLm92ZXJsYXlpbmcgfHwgJyddO1xuICAgICAgICBmb3IoaiA9IDA7IGogPCBwbG90aW5mby5vdmVybGF5cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgZC5wdXNoKHBsb3RpbmZvLm92ZXJsYXlzW2pdLmlkKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJwbG90RGF0YVtpXSA9IGQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHN1YnBsb3REYXRhO1xufVxuXG5mdW5jdGlvbiBtYWtlU3VicGxvdExheWVyKGdkLCBwbG90aW5mbykge1xuICAgIHZhciBwbG90Z3JvdXAgPSBwbG90aW5mby5wbG90Z3JvdXA7XG4gICAgdmFyIGlkID0gcGxvdGluZm8uaWQ7XG4gICAgdmFyIHhMYXllciA9IGNvbnN0YW50cy5sYXllclZhbHVlMmxheWVyQ2xhc3NbcGxvdGluZm8ueGF4aXMubGF5ZXJdO1xuICAgIHZhciB5TGF5ZXIgPSBjb25zdGFudHMubGF5ZXJWYWx1ZTJsYXllckNsYXNzW3Bsb3RpbmZvLnlheGlzLmxheWVyXTtcbiAgICB2YXIgaGFzT25seUxhcmdlU3Bsb21zID0gZ2QuX2Z1bGxMYXlvdXQuX2hhc09ubHlMYXJnZVNwbG9tcztcblxuICAgIGlmKCFwbG90aW5mby5tYWlucGxvdCkge1xuICAgICAgICBpZihoYXNPbmx5TGFyZ2VTcGxvbXMpIHtcbiAgICAgICAgICAgIC8vIFRPRE8gY291bGQgZG8gZXZlbiBiZXR0ZXJcbiAgICAgICAgICAgIC8vIC0gd2UgZG9uJ3QgbmVlZCBwbG90IChidXQgd2Ugd291bGQgaGF2ZSB0byBtb2NrIGl0IGluIGxzSW5uZXJcbiAgICAgICAgICAgIC8vICAgYW5kIG90aGVyIHBsYWNlc1xuICAgICAgICAgICAgLy8gLSB3ZSBkb24ndCAoeHx5KWxpbmVzIGFuZCAoeHx5KWF4aXNsYXllciBmb3IgbW9zdCBzdWJwbG90c1xuICAgICAgICAgICAgLy8gICB1c3VhbGx5IGp1c3QgdGhlIGJvdHRvbSB4IGFuZCBsZWZ0IHkgYXhlcy5cbiAgICAgICAgICAgIHBsb3RpbmZvLnhsaW5lcyA9IGVuc3VyZVNpbmdsZShwbG90Z3JvdXAsICdwYXRoJywgJ3hsaW5lcy1hYm92ZScpO1xuICAgICAgICAgICAgcGxvdGluZm8ueWxpbmVzID0gZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ3BhdGgnLCAneWxpbmVzLWFib3ZlJyk7XG4gICAgICAgICAgICBwbG90aW5mby54YXhpc2xheWVyID0gZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ2cnLCAneGF4aXNsYXllci1hYm92ZScpO1xuICAgICAgICAgICAgcGxvdGluZm8ueWF4aXNsYXllciA9IGVuc3VyZVNpbmdsZShwbG90Z3JvdXAsICdnJywgJ3lheGlzbGF5ZXItYWJvdmUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBiYWNrTGF5ZXIgPSBlbnN1cmVTaW5nbGUocGxvdGdyb3VwLCAnZycsICdsYXllci1zdWJwbG90Jyk7XG4gICAgICAgICAgICBwbG90aW5mby5zaGFwZWxheWVyID0gZW5zdXJlU2luZ2xlKGJhY2tMYXllciwgJ2cnLCAnc2hhcGVsYXllcicpO1xuICAgICAgICAgICAgcGxvdGluZm8uaW1hZ2VsYXllciA9IGVuc3VyZVNpbmdsZShiYWNrTGF5ZXIsICdnJywgJ2ltYWdlbGF5ZXInKTtcblxuICAgICAgICAgICAgcGxvdGluZm8uZ3JpZGxheWVyID0gZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ2cnLCAnZ3JpZGxheWVyJyk7XG4gICAgICAgICAgICBwbG90aW5mby56ZXJvbGluZWxheWVyID0gZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ2cnLCAnemVyb2xpbmVsYXllcicpO1xuXG4gICAgICAgICAgICBlbnN1cmVTaW5nbGUocGxvdGdyb3VwLCAncGF0aCcsICd4bGluZXMtYmVsb3cnKTtcbiAgICAgICAgICAgIGVuc3VyZVNpbmdsZShwbG90Z3JvdXAsICdwYXRoJywgJ3lsaW5lcy1iZWxvdycpO1xuICAgICAgICAgICAgcGxvdGluZm8ub3ZlcmxpbmVzQmVsb3cgPSBlbnN1cmVTaW5nbGUocGxvdGdyb3VwLCAnZycsICdvdmVybGluZXMtYmVsb3cnKTtcblxuICAgICAgICAgICAgZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ2cnLCAneGF4aXNsYXllci1iZWxvdycpO1xuICAgICAgICAgICAgZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ2cnLCAneWF4aXNsYXllci1iZWxvdycpO1xuICAgICAgICAgICAgcGxvdGluZm8ub3ZlcmF4ZXNCZWxvdyA9IGVuc3VyZVNpbmdsZShwbG90Z3JvdXAsICdnJywgJ292ZXJheGVzLWJlbG93Jyk7XG5cbiAgICAgICAgICAgIHBsb3RpbmZvLnBsb3QgPSBlbnN1cmVTaW5nbGUocGxvdGdyb3VwLCAnZycsICdwbG90Jyk7XG4gICAgICAgICAgICBwbG90aW5mby5vdmVycGxvdCA9IGVuc3VyZVNpbmdsZShwbG90Z3JvdXAsICdnJywgJ292ZXJwbG90Jyk7XG5cbiAgICAgICAgICAgIHBsb3RpbmZvLnhsaW5lcyA9IGVuc3VyZVNpbmdsZShwbG90Z3JvdXAsICdwYXRoJywgJ3hsaW5lcy1hYm92ZScpO1xuICAgICAgICAgICAgcGxvdGluZm8ueWxpbmVzID0gZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ3BhdGgnLCAneWxpbmVzLWFib3ZlJyk7XG4gICAgICAgICAgICBwbG90aW5mby5vdmVybGluZXNBYm92ZSA9IGVuc3VyZVNpbmdsZShwbG90Z3JvdXAsICdnJywgJ292ZXJsaW5lcy1hYm92ZScpO1xuXG4gICAgICAgICAgICBlbnN1cmVTaW5nbGUocGxvdGdyb3VwLCAnZycsICd4YXhpc2xheWVyLWFib3ZlJyk7XG4gICAgICAgICAgICBlbnN1cmVTaW5nbGUocGxvdGdyb3VwLCAnZycsICd5YXhpc2xheWVyLWFib3ZlJyk7XG4gICAgICAgICAgICBwbG90aW5mby5vdmVyYXhlc0Fib3ZlID0gZW5zdXJlU2luZ2xlKHBsb3Rncm91cCwgJ2cnLCAnb3ZlcmF4ZXMtYWJvdmUnKTtcblxuICAgICAgICAgICAgLy8gc2V0IHJlZnMgdG8gY29ycmVjdCBsYXllcnMgYXMgZGV0ZXJtaW5lZCBieSAnYXhpcy5sYXllcidcbiAgICAgICAgICAgIHBsb3RpbmZvLnhsaW5lcyA9IHBsb3Rncm91cC5zZWxlY3QoJy54bGluZXMtJyArIHhMYXllcik7XG4gICAgICAgICAgICBwbG90aW5mby55bGluZXMgPSBwbG90Z3JvdXAuc2VsZWN0KCcueWxpbmVzLScgKyB5TGF5ZXIpO1xuICAgICAgICAgICAgcGxvdGluZm8ueGF4aXNsYXllciA9IHBsb3Rncm91cC5zZWxlY3QoJy54YXhpc2xheWVyLScgKyB4TGF5ZXIpO1xuICAgICAgICAgICAgcGxvdGluZm8ueWF4aXNsYXllciA9IHBsb3Rncm91cC5zZWxlY3QoJy55YXhpc2xheWVyLScgKyB5TGF5ZXIpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFyIG1haW5wbG90aW5mbyA9IHBsb3RpbmZvLm1haW5wbG90aW5mbztcbiAgICAgICAgdmFyIG1haW5wbG90Z3JvdXAgPSBtYWlucGxvdGluZm8ucGxvdGdyb3VwO1xuICAgICAgICB2YXIgeElkID0gaWQgKyAnLXgnO1xuICAgICAgICB2YXIgeUlkID0gaWQgKyAnLXknO1xuXG4gICAgICAgIC8vIG5vdyBtYWtlIHRoZSBjb21wb25lbnRzIG9mIG92ZXJsYWlkIHN1YnBsb3RzXG4gICAgICAgIC8vIG92ZXJsYXlzIGRvbid0IGhhdmUgYmFja2dyb3VuZHMsIGFuZCBhcHBlbmQgYWxsXG4gICAgICAgIC8vIHRoZWlyIG90aGVyIGNvbXBvbmVudHMgdG8gdGhlIGNvcnJlc3BvbmRpbmdcbiAgICAgICAgLy8gZXh0cmEgZ3JvdXBzIG9mIHRoZWlyIG1haW4gcGxvdHMuXG5cbiAgICAgICAgcGxvdGluZm8uZ3JpZGxheWVyID0gbWFpbnBsb3RpbmZvLmdyaWRsYXllcjtcbiAgICAgICAgcGxvdGluZm8uemVyb2xpbmVsYXllciA9IG1haW5wbG90aW5mby56ZXJvbGluZWxheWVyO1xuXG4gICAgICAgIGVuc3VyZVNpbmdsZShtYWlucGxvdGluZm8ub3ZlcmxpbmVzQmVsb3csICdwYXRoJywgeElkKTtcbiAgICAgICAgZW5zdXJlU2luZ2xlKG1haW5wbG90aW5mby5vdmVybGluZXNCZWxvdywgJ3BhdGgnLCB5SWQpO1xuICAgICAgICBlbnN1cmVTaW5nbGUobWFpbnBsb3RpbmZvLm92ZXJheGVzQmVsb3csICdnJywgeElkKTtcbiAgICAgICAgZW5zdXJlU2luZ2xlKG1haW5wbG90aW5mby5vdmVyYXhlc0JlbG93LCAnZycsIHlJZCk7XG5cbiAgICAgICAgcGxvdGluZm8ucGxvdCA9IGVuc3VyZVNpbmdsZShtYWlucGxvdGluZm8ub3ZlcnBsb3QsICdnJywgaWQpO1xuXG4gICAgICAgIGVuc3VyZVNpbmdsZShtYWlucGxvdGluZm8ub3ZlcmxpbmVzQWJvdmUsICdwYXRoJywgeElkKTtcbiAgICAgICAgZW5zdXJlU2luZ2xlKG1haW5wbG90aW5mby5vdmVybGluZXNBYm92ZSwgJ3BhdGgnLCB5SWQpO1xuICAgICAgICBlbnN1cmVTaW5nbGUobWFpbnBsb3RpbmZvLm92ZXJheGVzQWJvdmUsICdnJywgeElkKTtcbiAgICAgICAgZW5zdXJlU2luZ2xlKG1haW5wbG90aW5mby5vdmVyYXhlc0Fib3ZlLCAnZycsIHlJZCk7XG5cbiAgICAgICAgLy8gc2V0IHJlZnMgdG8gY29ycmVjdCBsYXllcnMgYXMgZGV0ZXJtaW5lZCBieSAnYWJvdmV0cmFjZXMnXG4gICAgICAgIHBsb3RpbmZvLnhsaW5lcyA9IG1haW5wbG90Z3JvdXAuc2VsZWN0KCcub3ZlcmxpbmVzLScgKyB4TGF5ZXIpLnNlbGVjdCgnLicgKyB4SWQpO1xuICAgICAgICBwbG90aW5mby55bGluZXMgPSBtYWlucGxvdGdyb3VwLnNlbGVjdCgnLm92ZXJsaW5lcy0nICsgeUxheWVyKS5zZWxlY3QoJy4nICsgeUlkKTtcbiAgICAgICAgcGxvdGluZm8ueGF4aXNsYXllciA9IG1haW5wbG90Z3JvdXAuc2VsZWN0KCcub3ZlcmF4ZXMtJyArIHhMYXllcikuc2VsZWN0KCcuJyArIHhJZCk7XG4gICAgICAgIHBsb3RpbmZvLnlheGlzbGF5ZXIgPSBtYWlucGxvdGdyb3VwLnNlbGVjdCgnLm92ZXJheGVzLScgKyB5TGF5ZXIpLnNlbGVjdCgnLicgKyB5SWQpO1xuICAgIH1cblxuICAgIC8vIGNvbW1vbiBhdHRyaWJ1dGVzIGZvciBhbGwgc3VicGxvdHMsIG92ZXJsYXlzIG9yIG5vdFxuXG4gICAgaWYoIWhhc09ubHlMYXJnZVNwbG9tcykge1xuICAgICAgICBlbnN1cmVTaW5nbGVBbmRBZGREYXR1bShwbG90aW5mby5ncmlkbGF5ZXIsICdnJywgcGxvdGluZm8ueGF4aXMuX2lkKTtcbiAgICAgICAgZW5zdXJlU2luZ2xlQW5kQWRkRGF0dW0ocGxvdGluZm8uZ3JpZGxheWVyLCAnZycsIHBsb3RpbmZvLnlheGlzLl9pZCk7XG4gICAgICAgIHBsb3RpbmZvLmdyaWRsYXllci5zZWxlY3RBbGwoJ2cnKVxuICAgICAgICAgICAgLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkWzBdOyB9KVxuICAgICAgICAgICAgLnNvcnQoYXhpc0lkcy5pZFNvcnQpO1xuICAgIH1cblxuICAgIHBsb3RpbmZvLnhsaW5lc1xuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgIC5jbGFzc2VkKCdjcmlzcCcsIHRydWUpO1xuXG4gICAgcGxvdGluZm8ueWxpbmVzXG4gICAgICAgIC5zdHlsZSgnZmlsbCcsICdub25lJylcbiAgICAgICAgLmNsYXNzZWQoJ2NyaXNwJywgdHJ1ZSk7XG59XG5cbmZ1bmN0aW9uIHB1cmdlU3VicGxvdExheWVycyhsYXllcnMsIGZ1bGxMYXlvdXQpIHtcbiAgICBpZighbGF5ZXJzKSByZXR1cm47XG5cbiAgICB2YXIgb3ZlcmxheUlkc1RvUmVtb3ZlID0ge307XG5cbiAgICBsYXllcnMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIHZhciBpZCA9IGRbMF07XG4gICAgICAgIHZhciBwbG90Z3JvdXAgPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgcGxvdGdyb3VwLnJlbW92ZSgpO1xuICAgICAgICByZW1vdmVTdWJwbG90RXh0cmFzKGlkLCBmdWxsTGF5b3V0KTtcbiAgICAgICAgb3ZlcmxheUlkc1RvUmVtb3ZlW2lkXSA9IHRydWU7XG5cbiAgICAgICAgLy8gZG8gbm90IHJlbW92ZSBpbmRpdmlkdWFsIGF4aXMgPGNsaXBQYXRoPnMgaGVyZVxuICAgICAgICAvLyBhcyBvdGhlciBzdWJwbG90cyBtYXkgbmVlZCB0aGVtXG4gICAgfSk7XG5cbiAgICAvLyBtdXN0IHJlbW92ZSBvdmVybGFpZCBzdWJwbG90IHRyYWNlIGxheWVycyAnbWFudWFsbHknXG5cbiAgICBmb3IodmFyIGsgaW4gZnVsbExheW91dC5fcGxvdHMpIHtcbiAgICAgICAgdmFyIHN1YnBsb3RJbmZvID0gZnVsbExheW91dC5fcGxvdHNba107XG4gICAgICAgIHZhciBvdmVybGF5cyA9IHN1YnBsb3RJbmZvLm92ZXJsYXlzIHx8IFtdO1xuXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBvdmVybGF5cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIG92ZXJsYXlJbmZvID0gb3ZlcmxheXNbal07XG5cbiAgICAgICAgICAgIGlmKG92ZXJsYXlJZHNUb1JlbW92ZVtvdmVybGF5SW5mby5pZF0pIHtcbiAgICAgICAgICAgICAgICBvdmVybGF5SW5mby5wbG90LnNlbGVjdEFsbCgnLnRyYWNlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN1YnBsb3RFeHRyYXMoc3VicGxvdElkLCBmdWxsTGF5b3V0KSB7XG4gICAgZnVsbExheW91dC5fZHJhZ2dlcnMuc2VsZWN0QWxsKCdnLicgKyBzdWJwbG90SWQpLnJlbW92ZSgpO1xuICAgIGZ1bGxMYXlvdXQuX2RlZnMuc2VsZWN0KCcjY2xpcCcgKyBmdWxsTGF5b3V0Ll91aWQgKyBzdWJwbG90SWQgKyAncGxvdCcpLnJlbW92ZSgpO1xufVxuXG5leHBvcnRzLnRvU1ZHID0gZnVuY3Rpb24oZ2QpIHtcbiAgICB2YXIgaW1hZ2VSb290ID0gZ2QuX2Z1bGxMYXlvdXQuX2dsaW1hZ2VzO1xuICAgIHZhciByb290ID0gZDMuc2VsZWN0KGdkKS5zZWxlY3RBbGwoJy5zdmctY29udGFpbmVyJyk7XG4gICAgdmFyIGNhbnZhc2VzID0gcm9vdC5maWx0ZXIoZnVuY3Rpb24oZCwgaSkge3JldHVybiBpID09PSByb290LnNpemUoKSAtIDE7fSlcbiAgICAgICAgLnNlbGVjdEFsbCgnLmdsLWNhbnZhcy1jb250ZXh0LCAuZ2wtY2FudmFzLWZvY3VzJyk7XG5cbiAgICBmdW5jdGlvbiBjYW52YXNUb0ltYWdlKCkge1xuICAgICAgICB2YXIgY2FudmFzID0gdGhpcztcbiAgICAgICAgdmFyIGltYWdlRGF0YSA9IGNhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICAgICAgICB2YXIgaW1hZ2UgPSBpbWFnZVJvb3QuYXBwZW5kKCdzdmc6aW1hZ2UnKTtcblxuICAgICAgICBpbWFnZS5hdHRyKHtcbiAgICAgICAgICAgIHhtbG5zOiB4bWxuc05hbWVzcGFjZXMuc3ZnLFxuICAgICAgICAgICAgJ3hsaW5rOmhyZWYnOiBpbWFnZURhdGEsXG4gICAgICAgICAgICBwcmVzZXJ2ZUFzcGVjdFJhdGlvOiAnbm9uZScsXG4gICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgeTogMCxcbiAgICAgICAgICAgIHdpZHRoOiBjYW52YXMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGNhbnZhcy5oZWlnaHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgY2FudmFzZXMuZWFjaChjYW52YXNUb0ltYWdlKTtcbn07XG5cbmV4cG9ydHMudXBkYXRlRnggPSByZXF1aXJlKCcuL2dyYXBoX2ludGVyYWN0JykudXBkYXRlRng7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIGlzVW5pZmllZEhvdmVyID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meC9oZWxwZXJzJykuaXNVbmlmaWVkSG92ZXI7XG52YXIgaGFuZGxlSG92ZXJNb2RlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Z4L2hvdmVybW9kZV9kZWZhdWx0cycpO1xudmFyIFRlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vcGxvdF9hcGkvcGxvdF90ZW1wbGF0ZScpO1xudmFyIGJhc2VQbG90TGF5b3V0QXR0cmlidXRlcyA9IHJlcXVpcmUoJy4uL2xheW91dF9hdHRyaWJ1dGVzJyk7XG5cbnZhciBsYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpO1xudmFyIGhhbmRsZVR5cGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4vdHlwZV9kZWZhdWx0cycpO1xudmFyIGhhbmRsZUF4aXNEZWZhdWx0cyA9IHJlcXVpcmUoJy4vYXhpc19kZWZhdWx0cycpO1xudmFyIGhhbmRsZUNvbnN0cmFpbnREZWZhdWx0cyA9IHJlcXVpcmUoJy4vY29uc3RyYWludHMnKS5oYW5kbGVDb25zdHJhaW50RGVmYXVsdHM7XG52YXIgaGFuZGxlUG9zaXRpb25EZWZhdWx0cyA9IHJlcXVpcmUoJy4vcG9zaXRpb25fZGVmYXVsdHMnKTtcblxudmFyIGF4aXNJZHMgPSByZXF1aXJlKCcuL2F4aXNfaWRzJyk7XG52YXIgaWQybmFtZSA9IGF4aXNJZHMuaWQybmFtZTtcbnZhciBuYW1lMmlkID0gYXhpc0lkcy5uYW1lMmlkO1xuXG52YXIgQVhfSURfUEFUVEVSTiA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJykuQVhfSURfUEFUVEVSTjtcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciB0cmFjZUlzID0gUmVnaXN0cnkudHJhY2VJcztcbnZhciBnZXRDb21wb25lbnRNZXRob2QgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2Q7XG5cbmZ1bmN0aW9uIGFwcGVuZExpc3QoY29udCwgaywgaXRlbSkge1xuICAgIGlmKEFycmF5LmlzQXJyYXkoY29udFtrXSkpIGNvbnRba10ucHVzaChpdGVtKTtcbiAgICBlbHNlIGNvbnRba10gPSBbaXRlbV07XG59XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5TGF5b3V0RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEpIHtcbiAgICB2YXIgYXgydHJhY2VzID0ge307XG4gICAgdmFyIHhhTWF5SGlkZSA9IHt9O1xuICAgIHZhciB5YU1heUhpZGUgPSB7fTtcbiAgICB2YXIgeGFNdXN0RGlzcGxheSA9IHt9O1xuICAgIHZhciB5YU11c3REaXNwbGF5ID0ge307XG4gICAgdmFyIHlhTXVzdE5vdFJldmVyc2UgPSB7fTtcbiAgICB2YXIgeWFNYXlSZXZlcnNlID0ge307XG4gICAgdmFyIGF4SGFzSW1hZ2UgPSB7fTtcbiAgICB2YXIgb3V0ZXJUaWNrcyA9IHt9O1xuICAgIHZhciBub0dyaWRzID0ge307XG4gICAgdmFyIGksIGo7XG5cbiAgICAvLyBsb29rIGZvciBheGVzIGluIHRoZSBkYXRhXG4gICAgZm9yKGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZnVsbERhdGFbaV07XG4gICAgICAgIGlmKCF0cmFjZUlzKHRyYWNlLCAnY2FydGVzaWFuJykgJiYgIXRyYWNlSXModHJhY2UsICdnbDJkJykpIGNvbnRpbnVlO1xuXG4gICAgICAgIHZhciB4YU5hbWU7XG4gICAgICAgIGlmKHRyYWNlLnhheGlzKSB7XG4gICAgICAgICAgICB4YU5hbWUgPSBpZDJuYW1lKHRyYWNlLnhheGlzKTtcbiAgICAgICAgICAgIGFwcGVuZExpc3QoYXgydHJhY2VzLCB4YU5hbWUsIHRyYWNlKTtcbiAgICAgICAgfSBlbHNlIGlmKHRyYWNlLnhheGVzKSB7XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCB0cmFjZS54YXhlcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIGFwcGVuZExpc3QoYXgydHJhY2VzLCBpZDJuYW1lKHRyYWNlLnhheGVzW2pdKSwgdHJhY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHlhTmFtZTtcbiAgICAgICAgaWYodHJhY2UueWF4aXMpIHtcbiAgICAgICAgICAgIHlhTmFtZSA9IGlkMm5hbWUodHJhY2UueWF4aXMpO1xuICAgICAgICAgICAgYXBwZW5kTGlzdChheDJ0cmFjZXMsIHlhTmFtZSwgdHJhY2UpO1xuICAgICAgICB9IGVsc2UgaWYodHJhY2UueWF4ZXMpIHtcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IHRyYWNlLnlheGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgYXBwZW5kTGlzdChheDJ0cmFjZXMsIGlkMm5hbWUodHJhY2UueWF4ZXNbal0pLCB0cmFjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBsb2dpYyBmb3IgZnVubmVsc1xuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnZnVubmVsJykge1xuICAgICAgICAgICAgaWYodHJhY2Uub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICAgICAgICAgIGlmKHhhTmFtZSkgeGFNYXlIaWRlW3hhTmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmKHlhTmFtZSkgeWFNYXlSZXZlcnNlW3lhTmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZih5YU5hbWUpIHlhTWF5SGlkZVt5YU5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKHRyYWNlLnR5cGUgPT09ICdpbWFnZScpIHtcbiAgICAgICAgICAgIGlmKHlhTmFtZSkgYXhIYXNJbWFnZVt5YU5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmKHhhTmFtZSkgYXhIYXNJbWFnZVt4YU5hbWVdID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHlhTmFtZSkge1xuICAgICAgICAgICAgICAgIHlhTXVzdERpc3BsYXlbeWFOYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgeWFNdXN0Tm90UmV2ZXJzZVt5YU5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoIXRyYWNlSXModHJhY2UsICdjYXJwZXQnKSB8fCAodHJhY2UudHlwZSA9PT0gJ2NhcnBldCcgJiYgIXRyYWNlLl9jaGVhdGVyKSkge1xuICAgICAgICAgICAgICAgIGlmKHhhTmFtZSkgeGFNdXN0RGlzcGxheVt4YU5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFR3byB0aGluZ3MgdHJpZ2dlciBheGlzIHZpc2liaWxpdHk6XG4gICAgICAgIC8vIDEuIGlzIG5vdCBjYXJwZXRcbiAgICAgICAgLy8gMi4gY2FycGV0IHRoYXQncyBub3QgY2hlYXRlclxuXG4gICAgICAgIC8vIFRoZSBhYm92ZSBjaGVjayBmb3IgZGVmaW5pdGVseS1ub3QtY2hlYXRlciBpcyBub3QgYWRlcXVhdGUuIFRoaXNcbiAgICAgICAgLy8gc2Vjb25kIGxpc3QgdHJhY2tzIHdoaWNoIGF4ZXMgKmNvdWxkKiBiZSBhIGNoZWF0ZXIgc28gdGhhdCB0aGVcbiAgICAgICAgLy8gZnVsbCBjb25kaXRpb24gdHJpZ2dlcmluZyBoaWRpbmcgaXM6XG4gICAgICAgIC8vICAgKmNvdWxkKiBiZSBhIGNoZWF0ZXIgYW5kICppcyBub3QgZGVmaW5pdGVseSB2aXNpYmxlKlxuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnY2FycGV0JyAmJiB0cmFjZS5fY2hlYXRlcikge1xuICAgICAgICAgICAgaWYoeGFOYW1lKSB4YU1heUhpZGVbeGFOYW1lXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgZGVmYXVsdCBmb3JtYXR0aW5nIHR3ZWFrc1xuICAgICAgICBpZih0cmFjZUlzKHRyYWNlLCAnMmRNYXAnKSkge1xuICAgICAgICAgICAgb3V0ZXJUaWNrc1t4YU5hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgIG91dGVyVGlja3NbeWFOYW1lXSA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZih0cmFjZUlzKHRyYWNlLCAnb3JpZW50ZWQnKSkge1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uQXhpcyA9IHRyYWNlLm9yaWVudGF0aW9uID09PSAnaCcgPyB5YU5hbWUgOiB4YU5hbWU7XG4gICAgICAgICAgICBub0dyaWRzW3Bvc2l0aW9uQXhpc10gPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHN1YnBsb3RzID0gbGF5b3V0T3V0Ll9zdWJwbG90cztcbiAgICB2YXIgeElkcyA9IHN1YnBsb3RzLnhheGlzO1xuICAgIHZhciB5SWRzID0gc3VicGxvdHMueWF4aXM7XG4gICAgdmFyIHhOYW1lcyA9IExpYi5zaW1wbGVNYXAoeElkcywgaWQybmFtZSk7XG4gICAgdmFyIHlOYW1lcyA9IExpYi5zaW1wbGVNYXAoeUlkcywgaWQybmFtZSk7XG4gICAgdmFyIGF4TmFtZXMgPSB4TmFtZXMuY29uY2F0KHlOYW1lcyk7XG5cbiAgICAvLyBwbG90X2JnY29sb3Igb25seSBtYWtlcyBzZW5zZSBpZiB0aGVyZSdzIGEgKDJEKSBwbG90IVxuICAgIC8vIFRPRE86IGJnY29sb3IgZm9yIGVhY2ggc3VicGxvdCwgdG8gaW5oZXJpdCBmcm9tIHRoZSBtYWluIG9uZVxuICAgIHZhciBwbG90QmdDb2xvciA9IENvbG9yLmJhY2tncm91bmQ7XG4gICAgaWYoeElkcy5sZW5ndGggJiYgeUlkcy5sZW5ndGgpIHtcbiAgICAgICAgcGxvdEJnQ29sb3IgPSBMaWIuY29lcmNlKGxheW91dEluLCBsYXlvdXRPdXQsIGJhc2VQbG90TGF5b3V0QXR0cmlidXRlcywgJ3Bsb3RfYmdjb2xvcicpO1xuICAgIH1cblxuICAgIHZhciBiZ0NvbG9yID0gQ29sb3IuY29tYmluZShwbG90QmdDb2xvciwgbGF5b3V0T3V0LnBhcGVyX2JnY29sb3IpO1xuXG4gICAgLy8gbmFtZSBvZiBzaW5nbGUgYXhpcyAoZS5nLiAneGF4aXMnLCAneWF4aXMyJylcbiAgICB2YXIgYXhOYW1lO1xuICAgIC8vIGlkIG9mIHNpbmdsZSBheGlzIChlLmcuICd5JywgJ3g1JylcbiAgICB2YXIgYXhJZDtcbiAgICAvLyAneCcgb3IgJ3knXG4gICAgdmFyIGF4TGV0dGVyO1xuICAgIC8vIGlucHV0IGxheW91dCBheGlzIGNvbnRhaW5lclxuICAgIHZhciBheExheW91dEluO1xuICAgIC8vIGZ1bGwgbGF5b3V0IGF4aXMgY29udGFpbmVyXG4gICAgdmFyIGF4TGF5b3V0T3V0O1xuXG4gICAgZnVuY3Rpb24gbmV3QXhMYXlvdXRPdXQoKSB7XG4gICAgICAgIHZhciB0cmFjZXMgPSBheDJ0cmFjZXNbYXhOYW1lXSB8fCBbXTtcbiAgICAgICAgYXhMYXlvdXRPdXQuX3RyYWNlSW5kaWNlcyA9IHRyYWNlcy5tYXAoZnVuY3Rpb24odCkgeyByZXR1cm4gdC5fZXhwYW5kZWRJbmRleDsgfSk7XG4gICAgICAgIGF4TGF5b3V0T3V0Ll9hbm5JbmRpY2VzID0gW107XG4gICAgICAgIGF4TGF5b3V0T3V0Ll9zaGFwZUluZGljZXMgPSBbXTtcbiAgICAgICAgYXhMYXlvdXRPdXQuX2ltZ0luZGljZXMgPSBbXTtcbiAgICAgICAgYXhMYXlvdXRPdXQuX3N1YnBsb3RzV2l0aCA9IFtdO1xuICAgICAgICBheExheW91dE91dC5fY291bnRlckF4ZXMgPSBbXTtcbiAgICAgICAgYXhMYXlvdXRPdXQuX25hbWUgPSBheExheW91dE91dC5fYXR0ciA9IGF4TmFtZTtcbiAgICAgICAgYXhMYXlvdXRPdXQuX2lkID0gYXhJZDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShheExheW91dEluLCBheExheW91dE91dCwgbGF5b3V0QXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29lcmNlMihhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlMihheExheW91dEluLCBheExheW91dE91dCwgbGF5b3V0QXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Q291bnRlckF4ZXMoYXhMZXR0ZXIpIHtcbiAgICAgICAgcmV0dXJuIChheExldHRlciA9PT0gJ3gnKSA/IHlJZHMgOiB4SWRzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE92ZXJsYXlhYmxlQXhlcyhheExldHRlciwgYXhOYW1lKSB7XG4gICAgICAgIHZhciBsaXN0ID0gKGF4TGV0dGVyID09PSAneCcpID8geE5hbWVzIDogeU5hbWVzO1xuICAgICAgICB2YXIgb3V0ID0gW107XG5cbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGxpc3QubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBheE5hbWUyID0gbGlzdFtqXTtcblxuICAgICAgICAgICAgaWYoYXhOYW1lMiAhPT0gYXhOYW1lICYmICEobGF5b3V0SW5bYXhOYW1lMl0gfHwge30pLm92ZXJsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICBvdXQucHVzaChuYW1lMmlkKGF4TmFtZTIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfVxuXG4gICAgLy8gbGlzdCBvZiBhdmFpbGFibGUgY291bnRlciBheGlzIG5hbWVzXG4gICAgdmFyIGNvdW50ZXJBeGVzID0ge3g6IGdldENvdW50ZXJBeGVzKCd4JyksIHk6IGdldENvdW50ZXJBeGVzKCd5Jyl9O1xuICAgIC8vIGxpc3Qgb2YgYWxsIHggQU5EIHkgYXhpcyBpZHNcbiAgICB2YXIgYWxsQXhpc0lkcyA9IGNvdW50ZXJBeGVzLnguY29uY2F0KGNvdW50ZXJBeGVzLnkpO1xuICAgIC8vIGxvb2t1cCBhbmQgbGlzdCBvZiBheGlzIGlkcyB0aGF0IGF4ZXMgaW4gYXhOYW1lcyBoYXZlIGEgcmVmZXJlbmNlIHRvLFxuICAgIC8vIGV2ZW4gdGhvdWdoIHRoZXkgYXJlIG1pc3NpbmcgZnJvbSBhbGxBeGlzSWRzXG4gICAgdmFyIG1pc3NpbmdNYXRjaGVkQXhpc0lkc0xvb2t1cCA9IHt9O1xuICAgIHZhciBtaXNzaW5nTWF0Y2hlZEF4aXNJZHMgPSBbXTtcblxuICAgIC8vIGZpbGwgaW4gJ21pc3NpbmcnIGF4aXMgbG9va3VwIHdoZW4gYW4gYXhpcyBpcyBzZXQgdG8gbWF0Y2ggYW4gYXhpc1xuICAgIC8vIG5vdCBwYXJ0IG9mIHRoZSBhbGxBeGlzSWRzIGxpc3QsIHNhdmUgYXhpcyB0eXBlIHNvIHRoYXQgd2UgY2FuIHByb3BhZ2F0ZVxuICAgIC8vIGl0IHRvIHRoZSBtaXNzaW5nIGF4ZXNcbiAgICBmdW5jdGlvbiBhZGRNaXNzaW5nTWF0Y2hlZEF4aXMoKSB7XG4gICAgICAgIHZhciBtYXRjaGVzSW4gPSBheExheW91dEluLm1hdGNoZXM7XG4gICAgICAgIGlmKEFYX0lEX1BBVFRFUk4udGVzdChtYXRjaGVzSW4pICYmIGFsbEF4aXNJZHMuaW5kZXhPZihtYXRjaGVzSW4pID09PSAtMSkge1xuICAgICAgICAgICAgbWlzc2luZ01hdGNoZWRBeGlzSWRzTG9va3VwW21hdGNoZXNJbl0gPSBheExheW91dEluLnR5cGU7XG4gICAgICAgICAgICBtaXNzaW5nTWF0Y2hlZEF4aXNJZHMgPSBPYmplY3Qua2V5cyhtaXNzaW5nTWF0Y2hlZEF4aXNJZHNMb29rdXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGhvdmVybW9kZSA9IGhhbmRsZUhvdmVyTW9kZURlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGZ1bGxEYXRhKTtcbiAgICB2YXIgdW5pZmllZEhvdmVyID0gaXNVbmlmaWVkSG92ZXIoaG92ZXJtb2RlKTtcblxuICAgIC8vIGZpcnN0IHBhc3MgY3JlYXRlcyB0aGUgY29udGFpbmVycywgZGV0ZXJtaW5lcyB0eXBlcywgYW5kIGhhbmRsZXMgbW9zdCBvZiB0aGUgc2V0dGluZ3NcbiAgICBmb3IoaSA9IDA7IGkgPCBheE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGF4TmFtZSA9IGF4TmFtZXNbaV07XG4gICAgICAgIGF4SWQgPSBuYW1lMmlkKGF4TmFtZSk7XG4gICAgICAgIGF4TGV0dGVyID0gYXhOYW1lLmNoYXJBdCgwKTtcblxuICAgICAgICBpZighTGliLmlzUGxhaW5PYmplY3QobGF5b3V0SW5bYXhOYW1lXSkpIHtcbiAgICAgICAgICAgIGxheW91dEluW2F4TmFtZV0gPSB7fTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF4TGF5b3V0SW4gPSBsYXlvdXRJbltheE5hbWVdO1xuICAgICAgICBheExheW91dE91dCA9IFRlbXBsYXRlLm5ld0NvbnRhaW5lcihsYXlvdXRPdXQsIGF4TmFtZSwgYXhMZXR0ZXIgKyAnYXhpcycpO1xuICAgICAgICBuZXdBeExheW91dE91dCgpO1xuXG4gICAgICAgIHZhciB2aXNpYmxlRGZsdCA9XG4gICAgICAgICAgICAoYXhMZXR0ZXIgPT09ICd4JyAmJiAheGFNdXN0RGlzcGxheVtheE5hbWVdICYmIHhhTWF5SGlkZVtheE5hbWVdKSB8fFxuICAgICAgICAgICAgKGF4TGV0dGVyID09PSAneScgJiYgIXlhTXVzdERpc3BsYXlbYXhOYW1lXSAmJiB5YU1heUhpZGVbYXhOYW1lXSk7XG5cbiAgICAgICAgdmFyIHJldmVyc2VEZmx0ID1cbiAgICAgICAgICAgIChheExldHRlciA9PT0gJ3knICYmXG4gICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICAoIXlhTXVzdE5vdFJldmVyc2VbYXhOYW1lXSAmJiB5YU1heVJldmVyc2VbYXhOYW1lXSkgfHxcbiAgICAgICAgICAgICAgICBheEhhc0ltYWdlW2F4TmFtZV1cbiAgICAgICAgICAgICAgKSk7XG5cbiAgICAgICAgdmFyIGRlZmF1bHRPcHRpb25zID0ge1xuICAgICAgICAgICAgbGV0dGVyOiBheExldHRlcixcbiAgICAgICAgICAgIGZvbnQ6IGxheW91dE91dC5mb250LFxuICAgICAgICAgICAgb3V0ZXJUaWNrczogb3V0ZXJUaWNrc1theE5hbWVdLFxuICAgICAgICAgICAgc2hvd0dyaWQ6ICFub0dyaWRzW2F4TmFtZV0sXG4gICAgICAgICAgICBkYXRhOiBheDJ0cmFjZXNbYXhOYW1lXSB8fCBbXSxcbiAgICAgICAgICAgIGJnQ29sb3I6IGJnQ29sb3IsXG4gICAgICAgICAgICBjYWxlbmRhcjogbGF5b3V0T3V0LmNhbGVuZGFyLFxuICAgICAgICAgICAgYXV0b21hcmdpbjogdHJ1ZSxcbiAgICAgICAgICAgIHZpc2libGVEZmx0OiB2aXNpYmxlRGZsdCxcbiAgICAgICAgICAgIHJldmVyc2VEZmx0OiByZXZlcnNlRGZsdCxcbiAgICAgICAgICAgIHNwbG9tU3Rhc2g6ICgobGF5b3V0T3V0Ll9zcGxvbUF4ZXMgfHwge30pW2F4TGV0dGVyXSB8fCB7fSlbYXhJZF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb2VyY2UoJ3VpcmV2aXNpb24nLCBsYXlvdXRPdXQudWlyZXZpc2lvbik7XG5cbiAgICAgICAgaGFuZGxlVHlwZURlZmF1bHRzKGF4TGF5b3V0SW4sIGF4TGF5b3V0T3V0LCBjb2VyY2UsIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgaGFuZGxlQXhpc0RlZmF1bHRzKGF4TGF5b3V0SW4sIGF4TGF5b3V0T3V0LCBjb2VyY2UsIGRlZmF1bHRPcHRpb25zLCBsYXlvdXRPdXQpO1xuXG4gICAgICAgIHZhciB1bmlmaWVkU3Bpa2UgPSB1bmlmaWVkSG92ZXIgJiYgYXhMZXR0ZXIgPT09IGhvdmVybW9kZS5jaGFyQXQoMCk7XG4gICAgICAgIHZhciBzcGlrZWNvbG9yID0gY29lcmNlMignc3Bpa2Vjb2xvcicsIHVuaWZpZWRIb3ZlciA/IGF4TGF5b3V0T3V0LmNvbG9yIDogdW5kZWZpbmVkKTtcbiAgICAgICAgdmFyIHNwaWtldGhpY2tuZXNzID0gY29lcmNlMignc3Bpa2V0aGlja25lc3MnLCB1bmlmaWVkSG92ZXIgPyAxLjUgOiB1bmRlZmluZWQpO1xuICAgICAgICB2YXIgc3Bpa2VkYXNoID0gY29lcmNlMignc3Bpa2VkYXNoJywgdW5pZmllZEhvdmVyID8gJ2RvdCcgOiB1bmRlZmluZWQpO1xuICAgICAgICB2YXIgc3Bpa2Vtb2RlID0gY29lcmNlMignc3Bpa2Vtb2RlJywgdW5pZmllZEhvdmVyID8gJ2Fjcm9zcycgOiB1bmRlZmluZWQpO1xuICAgICAgICB2YXIgc3Bpa2VzbmFwID0gY29lcmNlMignc3Bpa2VzbmFwJywgdW5pZmllZEhvdmVyID8gJ2hvdmVyZWQgZGF0YScgOiB1bmRlZmluZWQpO1xuICAgICAgICB2YXIgc2hvd1NwaWtlcyA9IGNvZXJjZSgnc2hvd3NwaWtlcycsICEhdW5pZmllZFNwaWtlIHx8ICEhc3Bpa2Vjb2xvciB8fCAhIXNwaWtldGhpY2tuZXNzIHx8ICEhc3Bpa2VkYXNoIHx8ICEhc3Bpa2Vtb2RlIHx8ICEhc3Bpa2VzbmFwKTtcblxuICAgICAgICBpZighc2hvd1NwaWtlcykge1xuICAgICAgICAgICAgZGVsZXRlIGF4TGF5b3V0T3V0LnNwaWtlY29sb3I7XG4gICAgICAgICAgICBkZWxldGUgYXhMYXlvdXRPdXQuc3Bpa2V0aGlja25lc3M7XG4gICAgICAgICAgICBkZWxldGUgYXhMYXlvdXRPdXQuc3Bpa2VkYXNoO1xuICAgICAgICAgICAgZGVsZXRlIGF4TGF5b3V0T3V0LnNwaWtlbW9kZTtcbiAgICAgICAgICAgIGRlbGV0ZSBheExheW91dE91dC5zcGlrZXNuYXA7XG4gICAgICAgIH1cblxuICAgICAgICBoYW5kbGVQb3NpdGlvbkRlZmF1bHRzKGF4TGF5b3V0SW4sIGF4TGF5b3V0T3V0LCBjb2VyY2UsIHtcbiAgICAgICAgICAgIGxldHRlcjogYXhMZXR0ZXIsXG4gICAgICAgICAgICBjb3VudGVyQXhlczogY291bnRlckF4ZXNbYXhMZXR0ZXJdLFxuICAgICAgICAgICAgb3ZlcmxheWFibGVBeGVzOiBnZXRPdmVybGF5YWJsZUF4ZXMoYXhMZXR0ZXIsIGF4TmFtZSksXG4gICAgICAgICAgICBncmlkOiBsYXlvdXRPdXQuZ3JpZFxuICAgICAgICB9KTtcblxuICAgICAgICBjb2VyY2UoJ3RpdGxlLnN0YW5kb2ZmJyk7XG5cbiAgICAgICAgYWRkTWlzc2luZ01hdGNoZWRBeGlzKCk7XG5cbiAgICAgICAgYXhMYXlvdXRPdXQuX2lucHV0ID0gYXhMYXlvdXRJbjtcbiAgICB9XG5cbiAgICAvLyBjb2VyY2UgdGhlICdtaXNzaW5nJyBheGVzXG4gICAgaSA9IDA7XG4gICAgd2hpbGUoaSA8IG1pc3NpbmdNYXRjaGVkQXhpc0lkcy5sZW5ndGgpIHtcbiAgICAgICAgYXhJZCA9IG1pc3NpbmdNYXRjaGVkQXhpc0lkc1tpKytdO1xuICAgICAgICBheE5hbWUgPSBpZDJuYW1lKGF4SWQpO1xuICAgICAgICBheExldHRlciA9IGF4TmFtZS5jaGFyQXQoMCk7XG5cbiAgICAgICAgaWYoIUxpYi5pc1BsYWluT2JqZWN0KGxheW91dEluW2F4TmFtZV0pKSB7XG4gICAgICAgICAgICBsYXlvdXRJbltheE5hbWVdID0ge307XG4gICAgICAgIH1cblxuICAgICAgICBheExheW91dEluID0gbGF5b3V0SW5bYXhOYW1lXTtcbiAgICAgICAgYXhMYXlvdXRPdXQgPSBUZW1wbGF0ZS5uZXdDb250YWluZXIobGF5b3V0T3V0LCBheE5hbWUsIGF4TGV0dGVyICsgJ2F4aXMnKTtcbiAgICAgICAgbmV3QXhMYXlvdXRPdXQoKTtcblxuICAgICAgICB2YXIgZGVmYXVsdE9wdGlvbnMyID0ge1xuICAgICAgICAgICAgbGV0dGVyOiBheExldHRlcixcbiAgICAgICAgICAgIGZvbnQ6IGxheW91dE91dC5mb250LFxuICAgICAgICAgICAgb3V0ZXJUaWNrczogb3V0ZXJUaWNrc1theE5hbWVdLFxuICAgICAgICAgICAgc2hvd0dyaWQ6ICFub0dyaWRzW2F4TmFtZV0sXG4gICAgICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgICAgIGJnQ29sb3I6IGJnQ29sb3IsXG4gICAgICAgICAgICBjYWxlbmRhcjogbGF5b3V0T3V0LmNhbGVuZGFyLFxuICAgICAgICAgICAgYXV0b21hcmdpbjogdHJ1ZSxcbiAgICAgICAgICAgIHZpc2libGVEZmx0OiBmYWxzZSxcbiAgICAgICAgICAgIHJldmVyc2VEZmx0OiBmYWxzZSxcbiAgICAgICAgICAgIHNwbG9tU3Rhc2g6ICgobGF5b3V0T3V0Ll9zcGxvbUF4ZXMgfHwge30pW2F4TGV0dGVyXSB8fCB7fSlbYXhJZF1cbiAgICAgICAgfTtcblxuICAgICAgICBjb2VyY2UoJ3VpcmV2aXNpb24nLCBsYXlvdXRPdXQudWlyZXZpc2lvbik7XG5cbiAgICAgICAgYXhMYXlvdXRPdXQudHlwZSA9IG1pc3NpbmdNYXRjaGVkQXhpc0lkc0xvb2t1cFtheElkXSB8fCAnbGluZWFyJztcblxuICAgICAgICBoYW5kbGVBeGlzRGVmYXVsdHMoYXhMYXlvdXRJbiwgYXhMYXlvdXRPdXQsIGNvZXJjZSwgZGVmYXVsdE9wdGlvbnMyLCBsYXlvdXRPdXQpO1xuXG4gICAgICAgIGhhbmRsZVBvc2l0aW9uRGVmYXVsdHMoYXhMYXlvdXRJbiwgYXhMYXlvdXRPdXQsIGNvZXJjZSwge1xuICAgICAgICAgICAgbGV0dGVyOiBheExldHRlcixcbiAgICAgICAgICAgIGNvdW50ZXJBeGVzOiBjb3VudGVyQXhlc1theExldHRlcl0sXG4gICAgICAgICAgICBvdmVybGF5YWJsZUF4ZXM6IGdldE92ZXJsYXlhYmxlQXhlcyhheExldHRlciwgYXhOYW1lKSxcbiAgICAgICAgICAgIGdyaWQ6IGxheW91dE91dC5ncmlkXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvZXJjZSgnZml4ZWRyYW5nZScpO1xuXG4gICAgICAgIGFkZE1pc3NpbmdNYXRjaGVkQXhpcygpO1xuXG4gICAgICAgIGF4TGF5b3V0T3V0Ll9pbnB1dCA9IGF4TGF5b3V0SW47XG4gICAgfVxuXG4gICAgLy8gcXVpY2sgc2Vjb25kIHBhc3MgZm9yIHJhbmdlIHNsaWRlciBhbmQgc2VsZWN0b3IgZGVmYXVsdHNcbiAgICB2YXIgcmFuZ2VTbGlkZXJEZWZhdWx0cyA9IGdldENvbXBvbmVudE1ldGhvZCgncmFuZ2VzbGlkZXInLCAnaGFuZGxlRGVmYXVsdHMnKTtcbiAgICB2YXIgcmFuZ2VTZWxlY3RvckRlZmF1bHRzID0gZ2V0Q29tcG9uZW50TWV0aG9kKCdyYW5nZXNlbGVjdG9yJywgJ2hhbmRsZURlZmF1bHRzJyk7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCB4TmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXhOYW1lID0geE5hbWVzW2ldO1xuICAgICAgICBheExheW91dEluID0gbGF5b3V0SW5bYXhOYW1lXTtcbiAgICAgICAgYXhMYXlvdXRPdXQgPSBsYXlvdXRPdXRbYXhOYW1lXTtcblxuICAgICAgICByYW5nZVNsaWRlckRlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQsIGF4TmFtZSk7XG5cbiAgICAgICAgaWYoYXhMYXlvdXRPdXQudHlwZSA9PT0gJ2RhdGUnKSB7XG4gICAgICAgICAgICByYW5nZVNlbGVjdG9yRGVmYXVsdHMoXG4gICAgICAgICAgICAgICAgYXhMYXlvdXRJbixcbiAgICAgICAgICAgICAgICBheExheW91dE91dCxcbiAgICAgICAgICAgICAgICBsYXlvdXRPdXQsXG4gICAgICAgICAgICAgICAgeU5hbWVzLFxuICAgICAgICAgICAgICAgIGF4TGF5b3V0T3V0LmNhbGVuZGFyXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29lcmNlKCdmaXhlZHJhbmdlJyk7XG4gICAgfVxuXG4gICAgZm9yKGkgPSAwOyBpIDwgeU5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGF4TmFtZSA9IHlOYW1lc1tpXTtcbiAgICAgICAgYXhMYXlvdXRJbiA9IGxheW91dEluW2F4TmFtZV07XG4gICAgICAgIGF4TGF5b3V0T3V0ID0gbGF5b3V0T3V0W2F4TmFtZV07XG5cbiAgICAgICAgdmFyIGFuY2hvcmVkQXhpcyA9IGxheW91dE91dFtpZDJuYW1lKGF4TGF5b3V0T3V0LmFuY2hvcildO1xuXG4gICAgICAgIHZhciBmaXhlZFJhbmdlRGZsdCA9IGdldENvbXBvbmVudE1ldGhvZCgncmFuZ2VzbGlkZXInLCAnaXNWaXNpYmxlJykoYW5jaG9yZWRBeGlzKTtcblxuICAgICAgICBjb2VyY2UoJ2ZpeGVkcmFuZ2UnLCBmaXhlZFJhbmdlRGZsdCk7XG4gICAgfVxuXG4gICAgLy8gRmluYWxseSwgaGFuZGxlIHNjYWxlIGNvbnN0cmFpbnRzIGFuZCBtYXRjaGluZyBheGVzLlxuICAgIC8vXG4gICAgLy8gV2UgbmVlZCB0byBkbyB0aGlzIGFmdGVyIGFsbCBheGVzIGhhdmUgY29lcmNlZCBib3RoIGB0eXBlYFxuICAgIC8vIChzbyB3ZSBsaW5rIG9ubHkgYXhlcyBvZiB0aGUgc2FtZSB0eXBlKSBhbmRcbiAgICAvLyBgZml4ZWRyYW5nZWAgKHNvIHdlIGNhbiBhdm9pZCBsaW5raW5nIGZyb20gT1IgVE8gYSBmaXhlZCBheGlzKS5cblxuICAgIC8vIHNldHMgb2YgYXhlcyBsaW5rZWQgYnkgYHNjYWxlYW5jaG9yYCBhbG9uZyB3aXRoIHRoZSBzY2FsZXJhdGlvcyBjb21wb3VuZGVkXG4gICAgLy8gdG9nZXRoZXIsIHBvcHVsYXRlZCBpbiBoYW5kbGVDb25zdHJhaW50RGVmYXVsdHNcbiAgICB2YXIgY29uc3RyYWludEdyb3VwcyA9IGxheW91dE91dC5fYXhpc0NvbnN0cmFpbnRHcm91cHMgPSBbXTtcbiAgICAvLyBzaW1pbGFyIHRvIF9heGlzQ29uc3RyYWludEdyb3VwcywgYnV0IGZvciBtYXRjaGluZyBheGVzXG4gICAgdmFyIG1hdGNoR3JvdXBzID0gbGF5b3V0T3V0Ll9heGlzTWF0Y2hHcm91cHMgPSBbXTtcbiAgICAvLyBtYWtlIHN1cmUgdG8gaW5jbHVkZSAnbWlzc2luZycgYXhlcyBoZXJlXG4gICAgdmFyIGFsbEF4aXNJZHNJbmNsdWRpbmdNaXNzaW5nID0gYWxsQXhpc0lkcy5jb25jYXQobWlzc2luZ01hdGNoZWRBeGlzSWRzKTtcbiAgICB2YXIgYXhOYW1lc0luY2x1ZGluZ01pc3NpbmcgPSBheE5hbWVzLmNvbmNhdChMaWIuc2ltcGxlTWFwKG1pc3NpbmdNYXRjaGVkQXhpc0lkcywgaWQybmFtZSkpO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgYXhOYW1lc0luY2x1ZGluZ01pc3NpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXhOYW1lID0gYXhOYW1lc0luY2x1ZGluZ01pc3NpbmdbaV07XG4gICAgICAgIGF4TGV0dGVyID0gYXhOYW1lLmNoYXJBdCgwKTtcbiAgICAgICAgYXhMYXlvdXRJbiA9IGxheW91dEluW2F4TmFtZV07XG4gICAgICAgIGF4TGF5b3V0T3V0ID0gbGF5b3V0T3V0W2F4TmFtZV07XG5cbiAgICAgICAgdmFyIHNjYWxlYW5jaG9yRGZsdDtcbiAgICAgICAgaWYoYXhMZXR0ZXIgPT09ICd5JyAmJiAhYXhMYXlvdXRJbi5oYXNPd25Qcm9wZXJ0eSgnc2NhbGVhbmNob3InKSAmJiBheEhhc0ltYWdlW2F4TmFtZV0pIHtcbiAgICAgICAgICAgIHNjYWxlYW5jaG9yRGZsdCA9IGF4TGF5b3V0T3V0LmFuY2hvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNjYWxlYW5jaG9yRGZsdCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjb25zdHJhaW5EZmx0O1xuICAgICAgICBpZighYXhMYXlvdXRJbi5oYXNPd25Qcm9wZXJ0eSgnY29uc3RyYWluJykgJiYgYXhIYXNJbWFnZVtheE5hbWVdKSB7XG4gICAgICAgICAgICBjb25zdHJhaW5EZmx0ID0gJ2RvbWFpbic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdHJhaW5EZmx0ID0gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgaGFuZGxlQ29uc3RyYWludERlZmF1bHRzKGF4TGF5b3V0SW4sIGF4TGF5b3V0T3V0LCBjb2VyY2UsIHtcbiAgICAgICAgICAgIGFsbEF4aXNJZHM6IGFsbEF4aXNJZHNJbmNsdWRpbmdNaXNzaW5nLFxuICAgICAgICAgICAgbGF5b3V0T3V0OiBsYXlvdXRPdXQsXG4gICAgICAgICAgICBzY2FsZWFuY2hvckRmbHQ6IHNjYWxlYW5jaG9yRGZsdCxcbiAgICAgICAgICAgIGNvbnN0cmFpbkRmbHQ6IGNvbnN0cmFpbkRmbHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZm9yKGkgPSAwOyBpIDwgbWF0Y2hHcm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGdyb3VwID0gbWF0Y2hHcm91cHNbaV07XG4gICAgICAgIHZhciBybmcgPSBudWxsO1xuICAgICAgICB2YXIgYXV0b3JhbmdlID0gbnVsbDtcblxuICAgICAgICAvLyBmaW5kICdtYXRjaGluZycgcmFuZ2UgYXR0cnNcbiAgICAgICAgZm9yKGF4SWQgaW4gZ3JvdXApIHtcbiAgICAgICAgICAgIGF4TGF5b3V0T3V0ID0gbGF5b3V0T3V0W2lkMm5hbWUoYXhJZCldO1xuICAgICAgICAgICAgaWYoIWF4TGF5b3V0T3V0Lm1hdGNoZXMpIHtcbiAgICAgICAgICAgICAgICBybmcgPSBheExheW91dE91dC5yYW5nZTtcbiAgICAgICAgICAgICAgICBhdXRvcmFuZ2UgPSBheExheW91dE91dC5hdXRvcmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gaWYgYGF4Lm1hdGNoZXNgIHZhbHVlcyBhcmUgcmVjaXByb2NhbCxcbiAgICAgICAgLy8gcGljayB2YWx1ZXMgb2YgZmlyc3QgYXhpcyBpbiBncm91cFxuICAgICAgICBpZihybmcgPT09IG51bGwgfHwgYXV0b3JhbmdlID09PSBudWxsKSB7XG4gICAgICAgICAgICBmb3IoYXhJZCBpbiBncm91cCkge1xuICAgICAgICAgICAgICAgIGF4TGF5b3V0T3V0ID0gbGF5b3V0T3V0W2lkMm5hbWUoYXhJZCldO1xuICAgICAgICAgICAgICAgIHJuZyA9IGF4TGF5b3V0T3V0LnJhbmdlO1xuICAgICAgICAgICAgICAgIGF1dG9yYW5nZSA9IGF4TGF5b3V0T3V0LmF1dG9yYW5nZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBhcHBseSBtYXRjaGluZyByYW5nZSBhdHRyc1xuICAgICAgICBmb3IoYXhJZCBpbiBncm91cCkge1xuICAgICAgICAgICAgYXhMYXlvdXRPdXQgPSBsYXlvdXRPdXRbaWQybmFtZShheElkKV07XG4gICAgICAgICAgICBpZihheExheW91dE91dC5tYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgYXhMYXlvdXRPdXQucmFuZ2UgPSBybmcuc2xpY2UoKTtcbiAgICAgICAgICAgICAgICBheExheW91dE91dC5hdXRvcmFuZ2UgPSBhdXRvcmFuZ2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBheExheW91dE91dC5fbWF0Y2hHcm91cCA9IGdyb3VwO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcmVtb3ZlIG1hdGNoaW5nIGF4aXMgZnJvbSBzY2FsZWFuY2hvciBjb25zdHJhaW50IGdyb3VwcyAoZm9yIG5vdylcbiAgICAgICAgaWYoY29uc3RyYWludEdyb3Vwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGZvcihheElkIGluIGdyb3VwKSB7XG4gICAgICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgY29uc3RyYWludEdyb3Vwcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ3JvdXAyID0gY29uc3RyYWludEdyb3Vwc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBheElkMiBpbiBncm91cDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGF4SWQgPT09IGF4SWQyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgTGliLndhcm4oJ0F4aXMgJyArIGF4SWQyICsgJyBpcyBzZXQgd2l0aCBib3RoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnYSAqc2NhbGVhbmNob3IqIGFuZCAqbWF0Y2hlcyogY29uc3RyYWludDsgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdpZ25vcmluZyB0aGUgc2NhbGUgY29uc3RyYWludC4nKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBncm91cDJbYXhJZDJdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKE9iamVjdC5rZXlzKGdyb3VwMikubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdHJhaW50R3JvdXBzLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVQb3NpdGlvbkRlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGNvZXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBjb3VudGVyQXhlcyA9IG9wdGlvbnMuY291bnRlckF4ZXMgfHwgW107XG4gICAgdmFyIG92ZXJsYXlhYmxlQXhlcyA9IG9wdGlvbnMub3ZlcmxheWFibGVBeGVzIHx8IFtdO1xuICAgIHZhciBsZXR0ZXIgPSBvcHRpb25zLmxldHRlcjtcbiAgICB2YXIgZ3JpZCA9IG9wdGlvbnMuZ3JpZDtcblxuICAgIHZhciBkZmx0QW5jaG9yLCBkZmx0RG9tYWluLCBkZmx0U2lkZSwgZGZsdFBvc2l0aW9uO1xuXG4gICAgaWYoZ3JpZCkge1xuICAgICAgICBkZmx0RG9tYWluID0gZ3JpZC5fZG9tYWluc1tsZXR0ZXJdW2dyaWQuX2F4aXNNYXBbY29udGFpbmVyT3V0Ll9pZF1dO1xuICAgICAgICBkZmx0QW5jaG9yID0gZ3JpZC5fYW5jaG9yc1tjb250YWluZXJPdXQuX2lkXTtcbiAgICAgICAgaWYoZGZsdERvbWFpbikge1xuICAgICAgICAgICAgZGZsdFNpZGUgPSBncmlkW2xldHRlciArICdzaWRlJ10uc3BsaXQoJyAnKVswXTtcbiAgICAgICAgICAgIGRmbHRQb3NpdGlvbiA9IGdyaWQuZG9tYWluW2xldHRlcl1bZGZsdFNpZGUgPT09ICdyaWdodCcgfHwgZGZsdFNpZGUgPT09ICd0b3AnID8gMSA6IDBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gRXZlbiBpZiB0aGVyZSdzIGEgZ3JpZCwgdGhpcyBheGlzIG1heSBub3QgYmUgaW4gaXQgLSBmYWxsIGJhY2sgb24gbm9uLWdyaWQgZGVmYXVsdHNcbiAgICBkZmx0RG9tYWluID0gZGZsdERvbWFpbiB8fCBbMCwgMV07XG4gICAgZGZsdEFuY2hvciA9IGRmbHRBbmNob3IgfHwgKGlzTnVtZXJpYyhjb250YWluZXJJbi5wb3NpdGlvbikgPyAnZnJlZScgOiAoY291bnRlckF4ZXNbMF0gfHwgJ2ZyZWUnKSk7XG4gICAgZGZsdFNpZGUgPSBkZmx0U2lkZSB8fCAobGV0dGVyID09PSAneCcgPyAnYm90dG9tJyA6ICdsZWZ0Jyk7XG4gICAgZGZsdFBvc2l0aW9uID0gZGZsdFBvc2l0aW9uIHx8IDA7XG5cbiAgICB2YXIgYW5jaG9yID0gTGliLmNvZXJjZShjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCB7XG4gICAgICAgIGFuY2hvcjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ2ZyZWUnXS5jb25jYXQoY291bnRlckF4ZXMpLFxuICAgICAgICAgICAgZGZsdDogZGZsdEFuY2hvclxuICAgICAgICB9XG4gICAgfSwgJ2FuY2hvcicpO1xuXG4gICAgaWYoYW5jaG9yID09PSAnZnJlZScpIGNvZXJjZSgncG9zaXRpb24nLCBkZmx0UG9zaXRpb24pO1xuXG4gICAgTGliLmNvZXJjZShjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCB7XG4gICAgICAgIHNpZGU6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogbGV0dGVyID09PSAneCcgPyBbJ2JvdHRvbScsICd0b3AnXSA6IFsnbGVmdCcsICdyaWdodCddLFxuICAgICAgICAgICAgZGZsdDogZGZsdFNpZGVcbiAgICAgICAgfVxuICAgIH0sICdzaWRlJyk7XG5cbiAgICB2YXIgb3ZlcmxheWluZyA9IGZhbHNlO1xuICAgIGlmKG92ZXJsYXlhYmxlQXhlcy5sZW5ndGgpIHtcbiAgICAgICAgb3ZlcmxheWluZyA9IExpYi5jb2VyY2UoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwge1xuICAgICAgICAgICAgb3ZlcmxheWluZzoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgICAgICB2YWx1ZXM6IFtmYWxzZV0uY29uY2F0KG92ZXJsYXlhYmxlQXhlcyksXG4gICAgICAgICAgICAgICAgZGZsdDogZmFsc2VcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSwgJ292ZXJsYXlpbmcnKTtcbiAgICB9XG5cbiAgICBpZighb3ZlcmxheWluZykge1xuICAgICAgICAvLyBUT0RPOiByaWdodCBub3cgSSdtIGNvcHlpbmcgdGhpcyBkb21haW4gb3ZlciB0byBvdmVybGF5aW5nIGF4ZXNcbiAgICAgICAgLy8gaW4gYXguc2V0c2NhbGUoKS4uLiBidXQgdGhpcyBtZWFucyB3ZSBzdGlsbCBuZWVkIChpbXBlcmZlY3QpIGxvZ2ljXG4gICAgICAgIC8vIGluIHRoZSBheGVzIHBvcG92ZXIgdG8gaGlkZSBkb21haW4gZm9yIHRoZSBvdmVybGF5aW5nIGF4aXMuXG4gICAgICAgIC8vIHBlcmhhcHMgSSBzaG91bGQgbWFrZSBhIHByaXZhdGUgdmVyc2lvbiBfZG9tYWluIHRoYXQgYWxsIGF4ZXMgZ2V0Pz8/XG4gICAgICAgIHZhciBkb21haW4gPSBjb2VyY2UoJ2RvbWFpbicsIGRmbHREb21haW4pO1xuXG4gICAgICAgIC8vIGFjY29yZGluZyB0byBodHRwczovL3d3dy5ucG1qcy5jb20vcGFja2FnZS9jYW52YXMtc2l6ZVxuICAgICAgICAvLyB0aGUgbWluaW11bSB2YWx1ZSBvZiBtYXggY2FudmFzIHdpZHRoIGFjcm9zcyBicm93c2VycyBhbmQgZGV2aWNlcyBpcyA0MDk2XG4gICAgICAgIC8vIHdoaWNoIGFwcGxpZWQgaW4gdGhlIGNhbGN1bGF0aW9uIGJlbG93OlxuICAgICAgICBpZihkb21haW5bMF0gPiBkb21haW5bMV0gLSAxIC8gNDA5NikgY29udGFpbmVyT3V0LmRvbWFpbiA9IGRmbHREb21haW47XG4gICAgICAgIExpYi5ub25lT3JBbGwoY29udGFpbmVySW4uZG9tYWluLCBjb250YWluZXJPdXQuZG9tYWluLCBkZmx0RG9tYWluKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2xheWVyJyk7XG5cbiAgICByZXR1cm4gY29udGFpbmVyT3V0O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgQXhlcyA9IHJlcXVpcmUoJy4vYXhlcycpO1xuXG4vKipcbiAqIHRyYW5zaXRpb25BeGVzXG4gKlxuICogdHJhbnNpdGlvbiBheGVzIGZyb20gb25lIHNldCBvZiByYW5nZXMgdG8gYW5vdGhlciwgdXNpbmcgYSBzdmdcbiAqIHRyYW5zZm9ybWF0aW9ucywgc2ltaWxhciB0byBkdXJpbmcgcGFubmluZy5cbiAqXG4gKiBAcGFyYW0ge0RPTSBlbGVtZW50IHwgb2JqZWN0fSBnZFxuICogQHBhcmFtIHthcnJheX0gZWRpdHMgOiBhcnJheSBvZiAnZWRpdHMnLCBlYWNoIGl0ZW0gd2l0aFxuICogLSBwbG90aW5mbyB7b2JqZWN0fSBzdWJwbG90IG9iamVjdFxuICogLSB4cjAge2FycmF5fSBpbml0aWFsIHgtcmFuZ2VcbiAqIC0geHIxIHthcnJheX0gZW5kIHgtcmFuZ2VcbiAqIC0geXIwIHthcnJheX0gaW5pdGlhbCB5LXJhbmdlXG4gKiAtIHlyMSB7YXJyYXl9IGVuZCB5LXJhbmdlXG4gKiBAcGFyYW0ge29iamVjdH0gdHJhbnNpdGlvbk9wdHNcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2tcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0cmFuc2l0aW9uQXhlcyhnZCwgZWRpdHMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIC8vIHNwZWNpYWwgY2FzZSBmb3IgcmVkcmF3OmZhbHNlIFBsb3RseS5hbmltYXRlIHRoYXQgcmVsaWVzIG9uIHRoaXNcbiAgICAvLyB0byB1cGRhdGUgYXhpcy1yZWZlcmVuY2VkIGxheW91dCBjb21wb25lbnRzXG4gICAgaWYoZWRpdHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIEF4ZXMucmVkcmF3Q29tcG9uZW50cyhnZCk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB1bnNldFN1YnBsb3RUcmFuc2Zvcm0oc3VicGxvdCkge1xuICAgICAgICB2YXIgeGEgPSBzdWJwbG90LnhheGlzO1xuICAgICAgICB2YXIgeWEgPSBzdWJwbG90LnlheGlzO1xuXG4gICAgICAgIGZ1bGxMYXlvdXQuX2RlZnMuc2VsZWN0KCcjJyArIHN1YnBsb3QuY2xpcElkICsgJz4gcmVjdCcpXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFRyYW5zbGF0ZSwgMCwgMClcbiAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuc2V0U2NhbGUsIDEsIDEpO1xuXG4gICAgICAgIHN1YnBsb3QucGxvdFxuICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5zZXRUcmFuc2xhdGUsIHhhLl9vZmZzZXQsIHlhLl9vZmZzZXQpXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFNjYWxlLCAxLCAxKTtcblxuICAgICAgICB2YXIgdHJhY2VHcm91cHMgPSBzdWJwbG90LnBsb3Quc2VsZWN0QWxsKCcuc2NhdHRlcmxheWVyIC50cmFjZScpO1xuXG4gICAgICAgIC8vIFRoaXMgaXMgc3BlY2lmaWNhbGx5IGRpcmVjdGVkIGF0IHNjYXR0ZXIgdHJhY2VzLCBhcHBseWluZyBhbiBpbnZlcnNlXG4gICAgICAgIC8vIHNjYWxlIHRvIGluZGl2aWR1YWwgcG9pbnRzIHRvIGNvdW50ZXJhY3QgdGhlIHNjYWxlIG9mIHRoZSB0cmFjZVxuICAgICAgICAvLyBhcyBhIHdob2xlOlxuICAgICAgICB0cmFjZUdyb3Vwcy5zZWxlY3RBbGwoJy5wb2ludCcpXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFBvaW50R3JvdXBTY2FsZSwgMSwgMSk7XG4gICAgICAgIHRyYWNlR3JvdXBzLnNlbGVjdEFsbCgnLnRleHRwb2ludCcpXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFRleHRQb2ludHNTY2FsZSwgMSwgMSk7XG4gICAgICAgIHRyYWNlR3JvdXBzXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLmhpZGVPdXRzaWRlUmFuZ2VQb2ludHMsIHN1YnBsb3QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN1YnBsb3QoZWRpdCwgcHJvZ3Jlc3MpIHtcbiAgICAgICAgdmFyIHBsb3RpbmZvID0gZWRpdC5wbG90aW5mbztcbiAgICAgICAgdmFyIHhhID0gcGxvdGluZm8ueGF4aXM7XG4gICAgICAgIHZhciB5YSA9IHBsb3RpbmZvLnlheGlzO1xuICAgICAgICB2YXIgeGxlbiA9IHhhLl9sZW5ndGg7XG4gICAgICAgIHZhciB5bGVuID0geWEuX2xlbmd0aDtcbiAgICAgICAgdmFyIGVkaXRYID0gISFlZGl0LnhyMTtcbiAgICAgICAgdmFyIGVkaXRZID0gISFlZGl0LnlyMTtcbiAgICAgICAgdmFyIHZpZXdCb3ggPSBbXTtcblxuICAgICAgICBpZihlZGl0WCkge1xuICAgICAgICAgICAgdmFyIHhyMCA9IExpYi5zaW1wbGVNYXAoZWRpdC54cjAsIHhhLnIybCk7XG4gICAgICAgICAgICB2YXIgeHIxID0gTGliLnNpbXBsZU1hcChlZGl0LnhyMSwgeGEucjJsKTtcbiAgICAgICAgICAgIHZhciBkeDAgPSB4cjBbMV0gLSB4cjBbMF07XG4gICAgICAgICAgICB2YXIgZHgxID0geHIxWzFdIC0geHIxWzBdO1xuICAgICAgICAgICAgdmlld0JveFswXSA9ICh4cjBbMF0gKiAoMSAtIHByb2dyZXNzKSArIHByb2dyZXNzICogeHIxWzBdIC0geHIwWzBdKSAvICh4cjBbMV0gLSB4cjBbMF0pICogeGxlbjtcbiAgICAgICAgICAgIHZpZXdCb3hbMl0gPSB4bGVuICogKCgxIC0gcHJvZ3Jlc3MpICsgcHJvZ3Jlc3MgKiBkeDEgLyBkeDApO1xuICAgICAgICAgICAgeGEucmFuZ2VbMF0gPSB4YS5sMnIoeHIwWzBdICogKDEgLSBwcm9ncmVzcykgKyBwcm9ncmVzcyAqIHhyMVswXSk7XG4gICAgICAgICAgICB4YS5yYW5nZVsxXSA9IHhhLmwycih4cjBbMV0gKiAoMSAtIHByb2dyZXNzKSArIHByb2dyZXNzICogeHIxWzFdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXdCb3hbMF0gPSAwO1xuICAgICAgICAgICAgdmlld0JveFsyXSA9IHhsZW47XG4gICAgICAgIH1cblxuICAgICAgICBpZihlZGl0WSkge1xuICAgICAgICAgICAgdmFyIHlyMCA9IExpYi5zaW1wbGVNYXAoZWRpdC55cjAsIHlhLnIybCk7XG4gICAgICAgICAgICB2YXIgeXIxID0gTGliLnNpbXBsZU1hcChlZGl0LnlyMSwgeWEucjJsKTtcbiAgICAgICAgICAgIHZhciBkeTAgPSB5cjBbMV0gLSB5cjBbMF07XG4gICAgICAgICAgICB2YXIgZHkxID0geXIxWzFdIC0geXIxWzBdO1xuICAgICAgICAgICAgdmlld0JveFsxXSA9ICh5cjBbMV0gKiAoMSAtIHByb2dyZXNzKSArIHByb2dyZXNzICogeXIxWzFdIC0geXIwWzFdKSAvICh5cjBbMF0gLSB5cjBbMV0pICogeWxlbjtcbiAgICAgICAgICAgIHZpZXdCb3hbM10gPSB5bGVuICogKCgxIC0gcHJvZ3Jlc3MpICsgcHJvZ3Jlc3MgKiBkeTEgLyBkeTApO1xuICAgICAgICAgICAgeWEucmFuZ2VbMF0gPSB4YS5sMnIoeXIwWzBdICogKDEgLSBwcm9ncmVzcykgKyBwcm9ncmVzcyAqIHlyMVswXSk7XG4gICAgICAgICAgICB5YS5yYW5nZVsxXSA9IHlhLmwycih5cjBbMV0gKiAoMSAtIHByb2dyZXNzKSArIHByb2dyZXNzICogeXIxWzFdKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZpZXdCb3hbMV0gPSAwO1xuICAgICAgICAgICAgdmlld0JveFszXSA9IHlsZW47XG4gICAgICAgIH1cblxuICAgICAgICBBeGVzLmRyYXdPbmUoZ2QsIHhhLCB7c2tpcFRpdGxlOiB0cnVlfSk7XG4gICAgICAgIEF4ZXMuZHJhd09uZShnZCwgeWEsIHtza2lwVGl0bGU6IHRydWV9KTtcbiAgICAgICAgQXhlcy5yZWRyYXdDb21wb25lbnRzKGdkLCBbeGEuX2lkLCB5YS5faWRdKTtcblxuICAgICAgICB2YXIgeFNjYWxlRmFjdG9yID0gZWRpdFggPyB4bGVuIC8gdmlld0JveFsyXSA6IDE7XG4gICAgICAgIHZhciB5U2NhbGVGYWN0b3IgPSBlZGl0WSA/IHlsZW4gLyB2aWV3Qm94WzNdIDogMTtcbiAgICAgICAgdmFyIGNsaXBEeCA9IGVkaXRYID8gdmlld0JveFswXSA6IDA7XG4gICAgICAgIHZhciBjbGlwRHkgPSBlZGl0WSA/IHZpZXdCb3hbMV0gOiAwO1xuICAgICAgICB2YXIgZnJhY0R4ID0gZWRpdFggPyAodmlld0JveFswXSAvIHZpZXdCb3hbMl0gKiB4bGVuKSA6IDA7XG4gICAgICAgIHZhciBmcmFjRHkgPSBlZGl0WSA/ICh2aWV3Qm94WzFdIC8gdmlld0JveFszXSAqIHlsZW4pIDogMDtcbiAgICAgICAgdmFyIHBsb3REeCA9IHhhLl9vZmZzZXQgLSBmcmFjRHg7XG4gICAgICAgIHZhciBwbG90RHkgPSB5YS5fb2Zmc2V0IC0gZnJhY0R5O1xuXG4gICAgICAgIHBsb3RpbmZvLmNsaXBSZWN0XG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFRyYW5zbGF0ZSwgY2xpcER4LCBjbGlwRHkpXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFNjYWxlLCAxIC8geFNjYWxlRmFjdG9yLCAxIC8geVNjYWxlRmFjdG9yKTtcblxuICAgICAgICBwbG90aW5mby5wbG90XG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFRyYW5zbGF0ZSwgcGxvdER4LCBwbG90RHkpXG4gICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFNjYWxlLCB4U2NhbGVGYWN0b3IsIHlTY2FsZUZhY3Rvcik7XG5cbiAgICAgICAgLy8gYXBwbHkgYW4gaW52ZXJzZSBzY2FsZSB0byBpbmRpdmlkdWFsIHBvaW50cyB0byBjb3VudGVyYWN0XG4gICAgICAgIC8vIHRoZSBzY2FsZSBvZiB0aGUgdHJhY2UgZ3JvdXAuXG4gICAgICAgIERyYXdpbmcuc2V0UG9pbnRHcm91cFNjYWxlKHBsb3RpbmZvLnpvb21TY2FsZVB0cywgMSAvIHhTY2FsZUZhY3RvciwgMSAvIHlTY2FsZUZhY3Rvcik7XG4gICAgICAgIERyYXdpbmcuc2V0VGV4dFBvaW50c1NjYWxlKHBsb3RpbmZvLnpvb21TY2FsZVR4dCwgMSAvIHhTY2FsZUZhY3RvciwgMSAvIHlTY2FsZUZhY3Rvcik7XG4gICAgfVxuXG4gICAgdmFyIG9uQ29tcGxldGU7XG4gICAgaWYobWFrZU9uQ29tcGxldGVDYWxsYmFjaykge1xuICAgICAgICAvLyBUaGlzIG1vZHVsZSBtYWtlcyB0aGUgY2hvaWNlIHdoZXRoZXIgb3Igbm90IGl0IG5vdGlmaWVzIFBsb3RseS50cmFuc2l0aW9uXG4gICAgICAgIC8vIGFib3V0IGNvbXBsZXRpb246XG4gICAgICAgIG9uQ29tcGxldGUgPSBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbkNvbXBsZXRlKCkge1xuICAgICAgICB2YXIgYW9iaiA9IHt9O1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlZGl0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVkaXQgPSBlZGl0c1tpXTtcbiAgICAgICAgICAgIHZhciB4YSA9IGVkaXQucGxvdGluZm8ueGF4aXM7XG4gICAgICAgICAgICB2YXIgeWEgPSBlZGl0LnBsb3RpbmZvLnlheGlzO1xuICAgICAgICAgICAgaWYoZWRpdC54cjEpIGFvYmpbeGEuX25hbWUgKyAnLnJhbmdlJ10gPSBlZGl0LnhyMS5zbGljZSgpO1xuICAgICAgICAgICAgaWYoZWRpdC55cjEpIGFvYmpbeWEuX25hbWUgKyAnLnJhbmdlJ10gPSBlZGl0LnlyMS5zbGljZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gU2lnbmFsIHRoYXQgdGhpcyB0cmFuc2l0aW9uIGhhcyBjb21wbGV0ZWQ6XG4gICAgICAgIG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZSgpO1xuXG4gICAgICAgIHJldHVybiBSZWdpc3RyeS5jYWxsKCdyZWxheW91dCcsIGdkLCBhb2JqKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVkaXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdW5zZXRTdWJwbG90VHJhbnNmb3JtKGVkaXRzW2ldLnBsb3RpbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbkludGVycnVwdCgpIHtcbiAgICAgICAgdmFyIGFvYmogPSB7fTtcblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZWRpdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlZGl0ID0gZWRpdHNbaV07XG4gICAgICAgICAgICB2YXIgeGEgPSBlZGl0LnBsb3RpbmZvLnhheGlzO1xuICAgICAgICAgICAgdmFyIHlhID0gZWRpdC5wbG90aW5mby55YXhpcztcbiAgICAgICAgICAgIGlmKGVkaXQueHIwKSBhb2JqW3hhLl9uYW1lICsgJy5yYW5nZSddID0gZWRpdC54cjAuc2xpY2UoKTtcbiAgICAgICAgICAgIGlmKGVkaXQueXIwKSBhb2JqW3lhLl9uYW1lICsgJy5yYW5nZSddID0gZWRpdC55cjAuc2xpY2UoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBSZWdpc3RyeS5jYWxsKCdyZWxheW91dCcsIGdkLCBhb2JqKS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGVkaXRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdW5zZXRTdWJwbG90VHJhbnNmb3JtKGVkaXRzW2ldLnBsb3RpbmZvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdmFyIHQxLCB0MiwgcmFmO1xuICAgIHZhciBlYXNlRm4gPSBkMy5lYXNlKHRyYW5zaXRpb25PcHRzLmVhc2luZyk7XG5cbiAgICBnZC5fdHJhbnNpdGlvbkRhdGEuX2ludGVycnVwdENhbGxiYWNrcy5wdXNoKGZ1bmN0aW9uKCkge1xuICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICAgICAgcmFmID0gbnVsbDtcbiAgICAgICAgcmV0dXJuIHRyYW5zaXRpb25JbnRlcnJ1cHQoKTtcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGRvRnJhbWUoKSB7XG4gICAgICAgIHQyID0gRGF0ZS5ub3coKTtcblxuICAgICAgICB2YXIgdEludGVycCA9IE1hdGgubWluKDEsICh0MiAtIHQxKSAvIHRyYW5zaXRpb25PcHRzLmR1cmF0aW9uKTtcbiAgICAgICAgdmFyIHByb2dyZXNzID0gZWFzZUZuKHRJbnRlcnApO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBlZGl0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdXBkYXRlU3VicGxvdChlZGl0c1tpXSwgcHJvZ3Jlc3MpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYodDIgLSB0MSA+IHRyYW5zaXRpb25PcHRzLmR1cmF0aW9uKSB7XG4gICAgICAgICAgICB0cmFuc2l0aW9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgIHJhZiA9IHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShkb0ZyYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJhZiA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZG9GcmFtZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0MSA9IERhdGUubm93KCk7XG4gICAgcmFmID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkb0ZyYW1lKTtcblxuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB0cmFjZUlzID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKS50cmFjZUlzO1xudmFyIGF1dG9UeXBlID0gcmVxdWlyZSgnLi9heGlzX2F1dG90eXBlJyk7XG5cbi8qXG4gKiAgZGF0YTogdGhlIHBsb3QgZGF0YSB0byB1c2UgaW4gY2hvb3NpbmcgYXV0byB0eXBlXG4gKiAgbmFtZTogYXhpcyBvYmplY3QgbmFtZSAoaWUgJ3hheGlzJykgaWYgb25lIHNob3VsZCBiZSBzdG9yZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBoYW5kbGVUeXBlRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCBvcHRpb25zKSB7XG4gICAgdmFyIGF4VHlwZSA9IGNvZXJjZSgndHlwZScsIChvcHRpb25zLnNwbG9tU3Rhc2ggfHwge30pLnR5cGUpO1xuXG4gICAgaWYoYXhUeXBlID09PSAnLScpIHtcbiAgICAgICAgc2V0QXV0b1R5cGUoY29udGFpbmVyT3V0LCBvcHRpb25zLmRhdGEpO1xuXG4gICAgICAgIGlmKGNvbnRhaW5lck91dC50eXBlID09PSAnLScpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lck91dC50eXBlID0gJ2xpbmVhcic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBjb3B5IGF1dG9UeXBlIGJhY2sgdG8gaW5wdXQgYXhpc1xuICAgICAgICAgICAgLy8gbm90ZSB0aGF0IGlmIHRoaXMgb2JqZWN0IGRpZG4ndCBleGlzdFxuICAgICAgICAgICAgLy8gaW4gdGhlIGlucHV0IGxheW91dCwgd2UgaGF2ZSB0byBwdXQgaXQgaW5cbiAgICAgICAgICAgIC8vIHRoaXMgaGFwcGVucyBpbiB0aGUgbWFpbiBzdXBwbHlEZWZhdWx0cyBmdW5jdGlvblxuICAgICAgICAgICAgY29udGFpbmVySW4udHlwZSA9IGNvbnRhaW5lck91dC50eXBlO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZnVuY3Rpb24gc2V0QXV0b1R5cGUoYXgsIGRhdGEpIHtcbiAgICAvLyBuZXcgbG9naWM6IGxldCBwZW9wbGUgc3BlY2lmeSBhbnkgdHlwZSB0aGV5IHdhbnQsXG4gICAgLy8gb25seSBhdXRvdHlwZSBpZiB0eXBlIGlzICctJ1xuICAgIGlmKGF4LnR5cGUgIT09ICctJykgcmV0dXJuO1xuXG4gICAgdmFyIGlkID0gYXguX2lkO1xuICAgIHZhciBheExldHRlciA9IGlkLmNoYXJBdCgwKTtcbiAgICB2YXIgaTtcblxuICAgIC8vIHN1cHBvcnQgM2RcbiAgICBpZihpZC5pbmRleE9mKCdzY2VuZScpICE9PSAtMSkgaWQgPSBheExldHRlcjtcblxuICAgIHZhciBkMCA9IGdldEZpcnN0Tm9uRW1wdHlUcmFjZShkYXRhLCBpZCwgYXhMZXR0ZXIpO1xuICAgIGlmKCFkMCkgcmV0dXJuO1xuXG4gICAgLy8gZmlyc3QgY2hlY2sgZm9yIGhpc3RvZ3JhbXMsIGFzIHRoZSBjb3VudCBkaXJlY3Rpb25cbiAgICAvLyBzaG91bGQgYWx3YXlzIGRlZmF1bHQgdG8gYSBsaW5lYXIgYXhpc1xuICAgIGlmKGQwLnR5cGUgPT09ICdoaXN0b2dyYW0nICYmXG4gICAgICAgIGF4TGV0dGVyID09PSB7djogJ3knLCBoOiAneCd9W2QwLm9yaWVudGF0aW9uIHx8ICd2J11cbiAgICApIHtcbiAgICAgICAgYXgudHlwZSA9ICdsaW5lYXInO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGNhbEF0dHIgPSBheExldHRlciArICdjYWxlbmRhcic7XG4gICAgdmFyIGNhbGVuZGFyID0gZDBbY2FsQXR0cl07XG4gICAgdmFyIG9wdHMgPSB7bm9NdWx0aUNhdGVnb3J5OiAhdHJhY2VJcyhkMCwgJ2NhcnRlc2lhbicpIHx8IHRyYWNlSXMoZDAsICdub011bHRpQ2F0ZWdvcnknKX07XG5cbiAgICAvLyBUbyBub3QgY29uZnVzZSAyRCB4L3kgdXNlZCBmb3IgcGVyLWJveCBzYW1wbGUgcG9pbnRzIGZvciBtdWx0aWNhdGVnb3J5IGNvb3JkaW5hdGVzXG4gICAgaWYoZDAudHlwZSA9PT0gJ2JveCcgJiYgZDAuX2hhc1ByZUNvbXBTdGF0cyAmJlxuICAgICAgICBheExldHRlciA9PT0ge2g6ICd4JywgdjogJ3knfVtkMC5vcmllbnRhdGlvbiB8fCAndiddXG4gICAgKSB7XG4gICAgICAgIG9wdHMubm9NdWx0aUNhdGVnb3J5ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBjaGVjayBhbGwgYm94ZXMgb24gdGhpcyB4IGF4aXMgdG8gc2VlXG4gICAgLy8gaWYgdGhleSdyZSBkYXRlcywgbnVtYmVycywgb3IgY2F0ZWdvcmllc1xuICAgIGlmKGlzQm94V2l0aG91dFBvc2l0aW9uQ29vcmRzKGQwLCBheExldHRlcikpIHtcbiAgICAgICAgdmFyIHBvc0xldHRlciA9IGdldEJveFBvc0xldHRlcihkMCk7XG4gICAgICAgIHZhciBib3hQb3NpdGlvbnMgPSBbXTtcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2UgPSBkYXRhW2ldO1xuICAgICAgICAgICAgaWYoIXRyYWNlSXModHJhY2UsICdib3gtdmlvbGluJykgfHwgKHRyYWNlW2F4TGV0dGVyICsgJ2F4aXMnXSB8fCBheExldHRlcikgIT09IGlkKSBjb250aW51ZTtcblxuICAgICAgICAgICAgaWYodHJhY2VbcG9zTGV0dGVyXSAhPT0gdW5kZWZpbmVkKSBib3hQb3NpdGlvbnMucHVzaCh0cmFjZVtwb3NMZXR0ZXJdWzBdKTtcbiAgICAgICAgICAgIGVsc2UgaWYodHJhY2UubmFtZSAhPT0gdW5kZWZpbmVkKSBib3hQb3NpdGlvbnMucHVzaCh0cmFjZS5uYW1lKTtcbiAgICAgICAgICAgIGVsc2UgYm94UG9zaXRpb25zLnB1c2goJ3RleHQnKTtcblxuICAgICAgICAgICAgaWYodHJhY2VbY2FsQXR0cl0gIT09IGNhbGVuZGFyKSBjYWxlbmRhciA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGF4LnR5cGUgPSBhdXRvVHlwZShib3hQb3NpdGlvbnMsIGNhbGVuZGFyLCBvcHRzKTtcbiAgICB9IGVsc2UgaWYoZDAudHlwZSA9PT0gJ3NwbG9tJykge1xuICAgICAgICB2YXIgZGltZW5zaW9ucyA9IGQwLmRpbWVuc2lvbnM7XG4gICAgICAgIHZhciBkaW0gPSBkaW1lbnNpb25zW2QwLl9heGVzRGltW2lkXV07XG4gICAgICAgIGlmKGRpbS52aXNpYmxlKSBheC50eXBlID0gYXV0b1R5cGUoZGltLnZhbHVlcywgY2FsZW5kYXIsIG9wdHMpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGF4LnR5cGUgPSBhdXRvVHlwZShkMFtheExldHRlcl0gfHwgW2QwW2F4TGV0dGVyICsgJzAnXV0sIGNhbGVuZGFyLCBvcHRzKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpcnN0Tm9uRW1wdHlUcmFjZShkYXRhLCBpZCwgYXhMZXR0ZXIpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgdHJhY2UgPSBkYXRhW2ldO1xuXG4gICAgICAgIGlmKHRyYWNlLnR5cGUgPT09ICdzcGxvbScgJiZcbiAgICAgICAgICAgICAgICB0cmFjZS5fbGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICAgICh0cmFjZVsnXycgKyBheExldHRlciArICdheGVzJ10gfHwge30pW2lkXVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFjZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCh0cmFjZVtheExldHRlciArICdheGlzJ10gfHwgYXhMZXR0ZXIpID09PSBpZCkge1xuICAgICAgICAgICAgaWYoaXNCb3hXaXRob3V0UG9zaXRpb25Db29yZHModHJhY2UsIGF4TGV0dGVyKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZigodHJhY2VbYXhMZXR0ZXJdIHx8IFtdKS5sZW5ndGggfHwgdHJhY2VbYXhMZXR0ZXIgKyAnMCddKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyYWNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRCb3hQb3NMZXR0ZXIodHJhY2UpIHtcbiAgICByZXR1cm4ge3Y6ICd4JywgaDogJ3knfVt0cmFjZS5vcmllbnRhdGlvbiB8fCAndiddO1xufVxuXG5mdW5jdGlvbiBpc0JveFdpdGhvdXRQb3NpdGlvbkNvb3Jkcyh0cmFjZSwgYXhMZXR0ZXIpIHtcbiAgICB2YXIgcG9zTGV0dGVyID0gZ2V0Qm94UG9zTGV0dGVyKHRyYWNlKTtcbiAgICB2YXIgaXNCb3ggPSB0cmFjZUlzKHRyYWNlLCAnYm94LXZpb2xpbicpO1xuICAgIHZhciBpc0NhbmRsZXN0aWNrID0gdHJhY2VJcyh0cmFjZS5fZnVsbElucHV0IHx8IHt9LCAnY2FuZGxlc3RpY2snKTtcblxuICAgIHJldHVybiAoXG4gICAgICAgIGlzQm94ICYmXG4gICAgICAgICFpc0NhbmRsZXN0aWNrICYmXG4gICAgICAgIGF4TGV0dGVyID09PSBwb3NMZXR0ZXIgJiZcbiAgICAgICAgdHJhY2VbcG9zTGV0dGVyXSA9PT0gdW5kZWZpbmVkICYmXG4gICAgICAgIHRyYWNlW3Bvc0xldHRlciArICcwJ10gPT09IHVuZGVmaW5lZFxuICAgICk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9