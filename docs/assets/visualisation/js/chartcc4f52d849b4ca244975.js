(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_scatterternary_js"],{

/***/ "./node_modules/plotly.js/lib/scatterternary.js":
/*!******************************************************!*\
  !*** ./node_modules/plotly.js/lib/scatterternary.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/scatterternary */ "./node_modules/plotly.js/src/traces/scatterternary/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/ternary/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/ternary/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var Ternary = __webpack_require__(/*! ./ternary */ "./node_modules/plotly.js/src/plots/ternary/ternary.js");

var getSubplotCalcData = __webpack_require__(/*! ../../plots/get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getSubplotCalcData;
var counterRegex = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").counterRegex;
var TERNARY = 'ternary';

exports.name = TERNARY;

var attr = exports.attr = 'subplot';

exports.idRoot = TERNARY;

exports.idRegex = exports.attrRegex = counterRegex(TERNARY);

var attributes = exports.attributes = {};
attributes[attr] = {
    valType: 'subplotid',
    role: 'info',
    dflt: 'ternary',
    editType: 'calc',
    description: [
        'Sets a reference between this trace\'s data coordinates and',
        'a ternary subplot.',
        'If *ternary* (the default value), the data refer to `layout.ternary`.',
        'If *ternary2*, the data refer to `layout.ternary2`, and so on.'
    ].join(' ')
};

exports.layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/ternary/layout_attributes.js");

exports.supplyLayoutDefaults = __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/plots/ternary/layout_defaults.js");

exports.plot = function plot(gd) {
    var fullLayout = gd._fullLayout;
    var calcData = gd.calcdata;
    var ternaryIds = fullLayout._subplots[TERNARY];

    for(var i = 0; i < ternaryIds.length; i++) {
        var ternaryId = ternaryIds[i];
        var ternaryCalcData = getSubplotCalcData(calcData, TERNARY, ternaryId);
        var ternary = fullLayout[ternaryId]._subplot;

        // If ternary is not instantiated, create one!
        if(!ternary) {
            ternary = new Ternary({
                id: ternaryId,
                graphDiv: gd,
                container: fullLayout._ternarylayer.node()
            },
                fullLayout
            );

            fullLayout[ternaryId]._subplot = ternary;
        }

        ternary.plot(ternaryCalcData, fullLayout, gd._promises);
    }
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var oldTernaryKeys = oldFullLayout._subplots[TERNARY] || [];

    for(var i = 0; i < oldTernaryKeys.length; i++) {
        var oldTernaryKey = oldTernaryKeys[i];
        var oldTernary = oldFullLayout[oldTernaryKey]._subplot;

        if(!newFullLayout[oldTernaryKey] && !!oldTernary) {
            oldTernary.plotContainer.remove();
            oldTernary.clipDef.remove();
            oldTernary.clipDefRelative.remove();
            oldTernary.layers['a-title'].remove();
            oldTernary.layers['b-title'].remove();
            oldTernary.layers['c-title'].remove();
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/ternary/layout_attributes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/ternary/layout_attributes.js ***!
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



var colorAttrs = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js");
var domainAttrs = __webpack_require__(/*! ../domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var axesAttrs = __webpack_require__(/*! ../cartesian/layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");

var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var ternaryAxesAttrs = {
    title: {
        text: axesAttrs.title.text,
        font: axesAttrs.title.font
        // TODO does standoff here make sense?
    },
    color: axesAttrs.color,
    // ticks
    tickmode: axesAttrs.tickmode,
    nticks: extendFlat({}, axesAttrs.nticks, {dflt: 6, min: 1}),
    tick0: axesAttrs.tick0,
    dtick: axesAttrs.dtick,
    tickvals: axesAttrs.tickvals,
    ticktext: axesAttrs.ticktext,
    ticks: axesAttrs.ticks,
    ticklen: axesAttrs.ticklen,
    tickwidth: axesAttrs.tickwidth,
    tickcolor: axesAttrs.tickcolor,
    showticklabels: axesAttrs.showticklabels,
    showtickprefix: axesAttrs.showtickprefix,
    tickprefix: axesAttrs.tickprefix,
    showticksuffix: axesAttrs.showticksuffix,
    ticksuffix: axesAttrs.ticksuffix,
    showexponent: axesAttrs.showexponent,
    exponentformat: axesAttrs.exponentformat,
    separatethousands: axesAttrs.separatethousands,
    tickfont: axesAttrs.tickfont,
    tickangle: axesAttrs.tickangle,
    tickformat: axesAttrs.tickformat,
    tickformatstops: axesAttrs.tickformatstops,
    hoverformat: axesAttrs.hoverformat,
    // lines and grids
    showline: extendFlat({}, axesAttrs.showline, {dflt: true}),
    linecolor: axesAttrs.linecolor,
    linewidth: axesAttrs.linewidth,
    showgrid: extendFlat({}, axesAttrs.showgrid, {dflt: true}),
    gridcolor: axesAttrs.gridcolor,
    gridwidth: axesAttrs.gridwidth,
    layer: axesAttrs.layer,
    // range
    min: {
        valType: 'number',
        dflt: 0,
        role: 'info',
        min: 0,
        description: [
            'The minimum value visible on this axis.',
            'The maximum is determined by the sum minus the minimum',
            'values of the other two axes. The full view corresponds to',
            'all the minima set to zero.'
        ].join(' ')
    },
    _deprecated: {
        title: axesAttrs._deprecated.title,
        titlefont: axesAttrs._deprecated.titlefont
    }
};

var attrs = module.exports = overrideAll({
    domain: domainAttrs({name: 'ternary'}),

    bgcolor: {
        valType: 'color',
        role: 'style',
        dflt: colorAttrs.background,
        description: 'Set the background color of the subplot'
    },
    sum: {
        valType: 'number',
        role: 'info',
        dflt: 1,
        min: 0,
        description: [
            'The number each triplet should sum to,',
            'and the maximum range of each axis'
        ].join(' ')
    },
    aaxis: ternaryAxesAttrs,
    baxis: ternaryAxesAttrs,
    caxis: ternaryAxesAttrs
}, 'plot', 'from-root');

// set uirevisions outside of `overrideAll` so we can get `editType: none`
attrs.uirevision = {
    valType: 'any',
    role: 'info',
    editType: 'none',
    description: [
        'Controls persistence of user-driven changes in axis `min` and `title`,',
        'if not overridden in the individual axes.',
        'Defaults to `layout.uirevision`.'
    ].join(' ')
};

attrs.aaxis.uirevision = attrs.baxis.uirevision = attrs.caxis.uirevision = {
    valType: 'any',
    role: 'info',
    editType: 'none',
    description: [
        'Controls persistence of user-driven changes in axis `min`,',
        'and `title` if in `editable: true` configuration.',
        'Defaults to `ternary<N>.uirevision`.'
    ].join(' ')
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/ternary/layout_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/ternary/layout_defaults.js ***!
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



var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Template = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var handleSubplotDefaults = __webpack_require__(/*! ../subplot_defaults */ "./node_modules/plotly.js/src/plots/subplot_defaults.js");
var handleTickLabelDefaults = __webpack_require__(/*! ../cartesian/tick_label_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_label_defaults.js");
var handleTickMarkDefaults = __webpack_require__(/*! ../cartesian/tick_mark_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_mark_defaults.js");
var handleTickValueDefaults = __webpack_require__(/*! ../cartesian/tick_value_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_value_defaults.js");
var handleLineGridDefaults = __webpack_require__(/*! ../cartesian/line_grid_defaults */ "./node_modules/plotly.js/src/plots/cartesian/line_grid_defaults.js");
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/ternary/layout_attributes.js");

var axesNames = ['aaxis', 'baxis', 'caxis'];

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut, fullData) {
    handleSubplotDefaults(layoutIn, layoutOut, fullData, {
        type: 'ternary',
        attributes: layoutAttributes,
        handleDefaults: handleTernaryDefaults,
        font: layoutOut.font,
        paper_bgcolor: layoutOut.paper_bgcolor
    });
};

function handleTernaryDefaults(ternaryLayoutIn, ternaryLayoutOut, coerce, options) {
    var bgColor = coerce('bgcolor');
    var sum = coerce('sum');
    options.bgColor = Color.combine(bgColor, options.paper_bgcolor);
    var axName, containerIn, containerOut;

    // TODO: allow most (if not all) axis attributes to be set
    // in the outer container and used as defaults in the individual axes?

    for(var j = 0; j < axesNames.length; j++) {
        axName = axesNames[j];
        containerIn = ternaryLayoutIn[axName] || {};
        containerOut = Template.newContainer(ternaryLayoutOut, axName);
        containerOut._name = axName;

        handleAxisDefaults(containerIn, containerOut, options, ternaryLayoutOut);
    }

    // if the min values contradict each other, set them all to default (0)
    // and delete *all* the inputs so the user doesn't get confused later by
    // changing one and having them all change.
    var aaxis = ternaryLayoutOut.aaxis;
    var baxis = ternaryLayoutOut.baxis;
    var caxis = ternaryLayoutOut.caxis;
    if(aaxis.min + baxis.min + caxis.min >= sum) {
        aaxis.min = 0;
        baxis.min = 0;
        caxis.min = 0;
        if(ternaryLayoutIn.aaxis) delete ternaryLayoutIn.aaxis.min;
        if(ternaryLayoutIn.baxis) delete ternaryLayoutIn.baxis.min;
        if(ternaryLayoutIn.caxis) delete ternaryLayoutIn.caxis.min;
    }
}

function handleAxisDefaults(containerIn, containerOut, options, ternaryLayoutOut) {
    var axAttrs = layoutAttributes[containerOut._name];

    function coerce(attr, dflt) {
        return Lib.coerce(containerIn, containerOut, axAttrs, attr, dflt);
    }

    coerce('uirevision', ternaryLayoutOut.uirevision);

    containerOut.type = 'linear'; // no other types allowed for ternary

    var dfltColor = coerce('color');
    // if axis.color was provided, use it for fonts too; otherwise,
    // inherit from global font color in case that was provided.
    var dfltFontColor = (dfltColor !== axAttrs.color.dflt) ? dfltColor : options.font.color;

    var axName = containerOut._name;
    var letterUpper = axName.charAt(0).toUpperCase();
    var dfltTitle = 'Component ' + letterUpper;

    var title = coerce('title.text', dfltTitle);
    containerOut._hovertitle = title === dfltTitle ? title : letterUpper;

    Lib.coerceFont(coerce, 'title.font', {
        family: options.font.family,
        size: Math.round(options.font.size * 1.2),
        color: dfltFontColor
    });

    // range is just set by 'min' - max is determined by the other axes mins
    coerce('min');

    handleTickValueDefaults(containerIn, containerOut, coerce, 'linear');
    handleTickLabelDefaults(containerIn, containerOut, coerce, 'linear', {});
    handleTickMarkDefaults(containerIn, containerOut, coerce,
        { outerTicks: true });

    var showTickLabels = coerce('showticklabels');
    if(showTickLabels) {
        Lib.coerceFont(coerce, 'tickfont', {
            family: options.font.family,
            size: options.font.size,
            color: dfltFontColor
        });
        coerce('tickangle');
        coerce('tickformat');
    }

    handleLineGridDefaults(containerIn, containerOut, coerce, {
        dfltColor: dfltColor,
        bgColor: options.bgColor,
        // default grid color is darker here (60%, vs cartesian default ~91%)
        // because the grid is not square so the eye needs heavier cues to follow
        blend: 60,
        showLine: true,
        showGrid: true,
        noZeroLine: true,
        attributes: axAttrs
    });

    coerce('hoverformat');
    coerce('layer');
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/ternary/ternary.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/ternary/ternary.js ***!
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




var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var _ = Lib._;
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var setConvert = __webpack_require__(/*! ../cartesian/set_convert */ "./node_modules/plotly.js/src/plots/cartesian/set_convert.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var Plots = __webpack_require__(/*! ../plots */ "./node_modules/plotly.js/src/plots/plots.js");
var Axes = __webpack_require__(/*! ../cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var dragElement = __webpack_require__(/*! ../../components/dragelement */ "./node_modules/plotly.js/src/components/dragelement/index.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var dragHelpers = __webpack_require__(/*! ../../components/dragelement/helpers */ "./node_modules/plotly.js/src/components/dragelement/helpers.js");
var freeMode = dragHelpers.freeMode;
var rectMode = dragHelpers.rectMode;
var Titles = __webpack_require__(/*! ../../components/titles */ "./node_modules/plotly.js/src/components/titles/index.js");
var prepSelect = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").prepSelect;
var selectOnClick = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").selectOnClick;
var clearSelect = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").clearSelect;
var clearSelectionsCache = __webpack_require__(/*! ../cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").clearSelectionsCache;
var constants = __webpack_require__(/*! ../cartesian/constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js");

function Ternary(options, fullLayout) {
    this.id = options.id;
    this.graphDiv = options.graphDiv;
    this.init(fullLayout);
    this.makeFramework(fullLayout);

    // unfortunately, we have to keep track of some axis tick settings
    // as ternary subplots do not implement the 'ticks' editType
    this.aTickLayout = null;
    this.bTickLayout = null;
    this.cTickLayout = null;
}

module.exports = Ternary;

var proto = Ternary.prototype;

proto.init = function(fullLayout) {
    this.container = fullLayout._ternarylayer;
    this.defs = fullLayout._defs;
    this.layoutId = fullLayout._uid;
    this.traceHash = {};
    this.layers = {};
};

proto.plot = function(ternaryCalcData, fullLayout) {
    var _this = this;
    var ternaryLayout = fullLayout[_this.id];
    var graphSize = fullLayout._size;

    _this._hasClipOnAxisFalse = false;
    for(var i = 0; i < ternaryCalcData.length; i++) {
        var trace = ternaryCalcData[i][0].trace;

        if(trace.cliponaxis === false) {
            _this._hasClipOnAxisFalse = true;
            break;
        }
    }

    _this.updateLayers(ternaryLayout);
    _this.adjustLayout(ternaryLayout, graphSize);
    Plots.generalUpdatePerTraceModule(_this.graphDiv, _this, ternaryCalcData, ternaryLayout);
    _this.layers.plotbg.select('path').call(Color.fill, ternaryLayout.bgcolor);
};

proto.makeFramework = function(fullLayout) {
    var _this = this;
    var gd = _this.graphDiv;
    var ternaryLayout = fullLayout[_this.id];

    var clipId = _this.clipId = 'clip' + _this.layoutId + _this.id;
    var clipIdRelative = _this.clipIdRelative = 'clip-relative' + _this.layoutId + _this.id;

    // clippath for this ternary subplot
    _this.clipDef = Lib.ensureSingleById(fullLayout._clips, 'clipPath', clipId, function(s) {
        s.append('path').attr('d', 'M0,0Z');
    });

    // 'relative' clippath (i.e. no translation) for this ternary subplot
    _this.clipDefRelative = Lib.ensureSingleById(fullLayout._clips, 'clipPath', clipIdRelative, function(s) {
        s.append('path').attr('d', 'M0,0Z');
    });

    // container for everything in this ternary subplot
    _this.plotContainer = Lib.ensureSingle(_this.container, 'g', _this.id);
    _this.updateLayers(ternaryLayout);

    Drawing.setClipUrl(_this.layers.backplot, clipId, gd);
    Drawing.setClipUrl(_this.layers.grids, clipId, gd);
};

proto.updateLayers = function(ternaryLayout) {
    var _this = this;
    var layers = _this.layers;

    // inside that container, we have one container for the data, and
    // one each for the three axes around it.

    var plotLayers = ['draglayer', 'plotbg', 'backplot', 'grids'];

    if(ternaryLayout.aaxis.layer === 'below traces') {
        plotLayers.push('aaxis', 'aline');
    }
    if(ternaryLayout.baxis.layer === 'below traces') {
        plotLayers.push('baxis', 'bline');
    }
    if(ternaryLayout.caxis.layer === 'below traces') {
        plotLayers.push('caxis', 'cline');
    }

    plotLayers.push('frontplot');

    if(ternaryLayout.aaxis.layer === 'above traces') {
        plotLayers.push('aaxis', 'aline');
    }
    if(ternaryLayout.baxis.layer === 'above traces') {
        plotLayers.push('baxis', 'bline');
    }
    if(ternaryLayout.caxis.layer === 'above traces') {
        plotLayers.push('caxis', 'cline');
    }

    var toplevel = _this.plotContainer.selectAll('g.toplevel')
        .data(plotLayers, String);

    var grids = ['agrid', 'bgrid', 'cgrid'];

    toplevel.enter().append('g')
        .attr('class', function(d) { return 'toplevel ' + d; })
        .each(function(d) {
            var s = d3.select(this);
            layers[d] = s;

            // containers for different trace types.
            // NOTE - this is different from cartesian, where all traces
            // are in front of grids. Here I'm putting maps behind the grids
            // so the grids will always be visible if they're requested.
            // Perhaps we want that for cartesian too?
            if(d === 'frontplot') {
                s.append('g').classed('scatterlayer', true);
            } else if(d === 'backplot') {
                s.append('g').classed('maplayer', true);
            } else if(d === 'plotbg') {
                s.append('path').attr('d', 'M0,0Z');
            } else if(d === 'aline' || d === 'bline' || d === 'cline') {
                s.append('path');
            } else if(d === 'grids') {
                grids.forEach(function(d) {
                    layers[d] = s.append('g').classed('grid ' + d, true);
                });
            }
        });

    toplevel.order();
};

var whRatio = Math.sqrt(4 / 3);

proto.adjustLayout = function(ternaryLayout, graphSize) {
    var _this = this;
    var domain = ternaryLayout.domain;
    var xDomainCenter = (domain.x[0] + domain.x[1]) / 2;
    var yDomainCenter = (domain.y[0] + domain.y[1]) / 2;
    var xDomain = domain.x[1] - domain.x[0];
    var yDomain = domain.y[1] - domain.y[0];
    var wmax = xDomain * graphSize.w;
    var hmax = yDomain * graphSize.h;
    var sum = ternaryLayout.sum;
    var amin = ternaryLayout.aaxis.min;
    var bmin = ternaryLayout.baxis.min;
    var cmin = ternaryLayout.caxis.min;

    var x0, y0, w, h, xDomainFinal, yDomainFinal;

    if(wmax > whRatio * hmax) {
        h = hmax;
        w = h * whRatio;
    } else {
        w = wmax;
        h = w / whRatio;
    }

    xDomainFinal = xDomain * w / wmax;
    yDomainFinal = yDomain * h / hmax;

    x0 = graphSize.l + graphSize.w * xDomainCenter - w / 2;
    y0 = graphSize.t + graphSize.h * (1 - yDomainCenter) - h / 2;

    _this.x0 = x0;
    _this.y0 = y0;
    _this.w = w;
    _this.h = h;
    _this.sum = sum;

    // set up the x and y axis objects we'll use to lay out the points
    _this.xaxis = {
        type: 'linear',
        range: [amin + 2 * cmin - sum, sum - amin - 2 * bmin],
        domain: [
            xDomainCenter - xDomainFinal / 2,
            xDomainCenter + xDomainFinal / 2
        ],
        _id: 'x'
    };
    setConvert(_this.xaxis, _this.graphDiv._fullLayout);
    _this.xaxis.setScale();
    _this.xaxis.isPtWithinRange = function(d) {
        return (
            d.a >= _this.aaxis.range[0] &&
            d.a <= _this.aaxis.range[1] &&
            d.b >= _this.baxis.range[1] &&
            d.b <= _this.baxis.range[0] &&
            d.c >= _this.caxis.range[1] &&
            d.c <= _this.caxis.range[0]
        );
    };

    _this.yaxis = {
        type: 'linear',
        range: [amin, sum - bmin - cmin],
        domain: [
            yDomainCenter - yDomainFinal / 2,
            yDomainCenter + yDomainFinal / 2
        ],
        _id: 'y'
    };
    setConvert(_this.yaxis, _this.graphDiv._fullLayout);
    _this.yaxis.setScale();
    _this.yaxis.isPtWithinRange = function() { return true; };

    // set up the modified axes for tick drawing
    var yDomain0 = _this.yaxis.domain[0];

    // aaxis goes up the left side. Set it up as a y axis, but with
    // fictitious angles and domain, but then rotate and translate
    // it into place at the end
    var aaxis = _this.aaxis = extendFlat({}, ternaryLayout.aaxis, {
        range: [amin, sum - bmin - cmin],
        side: 'left',
        // tickangle = 'auto' means 0 anyway for a y axis, need to coerce to 0 here
        // so we can shift by 30.
        tickangle: (+ternaryLayout.aaxis.tickangle || 0) - 30,
        domain: [yDomain0, yDomain0 + yDomainFinal * whRatio],
        anchor: 'free',
        position: 0,
        _id: 'y',
        _length: w
    });
    setConvert(aaxis, _this.graphDiv._fullLayout);
    aaxis.setScale();

    // baxis goes across the bottom (backward). We can set it up as an x axis
    // without any enclosing transformation.
    var baxis = _this.baxis = extendFlat({}, ternaryLayout.baxis, {
        range: [sum - amin - cmin, bmin],
        side: 'bottom',
        domain: _this.xaxis.domain,
        anchor: 'free',
        position: 0,
        _id: 'x',
        _length: w
    });
    setConvert(baxis, _this.graphDiv._fullLayout);
    baxis.setScale();

    // caxis goes down the right side. Set it up as a y axis, with
    // post-transformation similar to aaxis
    var caxis = _this.caxis = extendFlat({}, ternaryLayout.caxis, {
        range: [sum - amin - bmin, cmin],
        side: 'right',
        tickangle: (+ternaryLayout.caxis.tickangle || 0) + 30,
        domain: [yDomain0, yDomain0 + yDomainFinal * whRatio],
        anchor: 'free',
        position: 0,
        _id: 'y',
        _length: w
    });
    setConvert(caxis, _this.graphDiv._fullLayout);
    caxis.setScale();

    var triangleClip = 'M' + x0 + ',' + (y0 + h) + 'h' + w + 'l-' + (w / 2) + ',-' + h + 'Z';
    _this.clipDef.select('path').attr('d', triangleClip);
    _this.layers.plotbg.select('path').attr('d', triangleClip);

    var triangleClipRelative = 'M0,' + h + 'h' + w + 'l-' + (w / 2) + ',-' + h + 'Z';
    _this.clipDefRelative.select('path').attr('d', triangleClipRelative);

    var plotTransform = 'translate(' + x0 + ',' + y0 + ')';
    _this.plotContainer.selectAll('.scatterlayer,.maplayer')
        .attr('transform', plotTransform);

    _this.clipDefRelative.select('path').attr('transform', null);

    // TODO: shift axes to accommodate linewidth*sin(30) tick mark angle

    // TODO: there's probably an easier way to handle these translations/offsets now...
    var bTransform = 'translate(' + (x0 - baxis._offset) + ',' + (y0 + h) + ')';

    _this.layers.baxis.attr('transform', bTransform);
    _this.layers.bgrid.attr('transform', bTransform);

    var aTransform = 'translate(' + (x0 + w / 2) + ',' + y0 +
        ')rotate(30)translate(0,' + -aaxis._offset + ')';
    _this.layers.aaxis.attr('transform', aTransform);
    _this.layers.agrid.attr('transform', aTransform);

    var cTransform = 'translate(' + (x0 + w / 2) + ',' + y0 +
        ')rotate(-30)translate(0,' + -caxis._offset + ')';
    _this.layers.caxis.attr('transform', cTransform);
    _this.layers.cgrid.attr('transform', cTransform);

    _this.drawAxes(true);

    _this.layers.aline.select('path')
        .attr('d', aaxis.showline ?
            'M' + x0 + ',' + (y0 + h) + 'l' + (w / 2) + ',-' + h : 'M0,0')
        .call(Color.stroke, aaxis.linecolor || '#000')
        .style('stroke-width', (aaxis.linewidth || 0) + 'px');
    _this.layers.bline.select('path')
        .attr('d', baxis.showline ?
            'M' + x0 + ',' + (y0 + h) + 'h' + w : 'M0,0')
        .call(Color.stroke, baxis.linecolor || '#000')
        .style('stroke-width', (baxis.linewidth || 0) + 'px');
    _this.layers.cline.select('path')
        .attr('d', caxis.showline ?
            'M' + (x0 + w / 2) + ',' + y0 + 'l' + (w / 2) + ',' + h : 'M0,0')
        .call(Color.stroke, caxis.linecolor || '#000')
        .style('stroke-width', (caxis.linewidth || 0) + 'px');

    if(!_this.graphDiv._context.staticPlot) {
        _this.initInteractions();
    }

    Drawing.setClipUrl(
        _this.layers.frontplot,
        _this._hasClipOnAxisFalse ? null : _this.clipId,
        _this.graphDiv
    );
};

proto.drawAxes = function(doTitles) {
    var _this = this;
    var gd = _this.graphDiv;
    var titlesuffix = _this.id.substr(7) + 'title';
    var layers = _this.layers;
    var aaxis = _this.aaxis;
    var baxis = _this.baxis;
    var caxis = _this.caxis;

    _this.drawAx(aaxis);
    _this.drawAx(baxis);
    _this.drawAx(caxis);

    if(doTitles) {
        var apad = Math.max(aaxis.showticklabels ? aaxis.tickfont.size / 2 : 0,
            (caxis.showticklabels ? caxis.tickfont.size * 0.75 : 0) +
            (caxis.ticks === 'outside' ? caxis.ticklen * 0.87 : 0));
        var bpad = (baxis.showticklabels ? baxis.tickfont.size : 0) +
            (baxis.ticks === 'outside' ? baxis.ticklen : 0) + 3;

        layers['a-title'] = Titles.draw(gd, 'a' + titlesuffix, {
            propContainer: aaxis,
            propName: _this.id + '.aaxis.title',
            placeholder: _(gd, 'Click to enter Component A title'),
            attributes: {
                x: _this.x0 + _this.w / 2,
                y: _this.y0 - aaxis.title.font.size / 3 - apad,
                'text-anchor': 'middle'
            }
        });
        layers['b-title'] = Titles.draw(gd, 'b' + titlesuffix, {
            propContainer: baxis,
            propName: _this.id + '.baxis.title',
            placeholder: _(gd, 'Click to enter Component B title'),
            attributes: {
                x: _this.x0 - bpad,
                y: _this.y0 + _this.h + baxis.title.font.size * 0.83 + bpad,
                'text-anchor': 'middle'
            }
        });
        layers['c-title'] = Titles.draw(gd, 'c' + titlesuffix, {
            propContainer: caxis,
            propName: _this.id + '.caxis.title',
            placeholder: _(gd, 'Click to enter Component C title'),
            attributes: {
                x: _this.x0 + _this.w + bpad,
                y: _this.y0 + _this.h + caxis.title.font.size * 0.83 + bpad,
                'text-anchor': 'middle'
            }
        });
    }
};

proto.drawAx = function(ax) {
    var _this = this;
    var gd = _this.graphDiv;
    var axName = ax._name;
    var axLetter = axName.charAt(0);
    var axId = ax._id;
    var axLayer = _this.layers[axName];
    var counterAngle = 30;

    var stashKey = axLetter + 'tickLayout';
    var newTickLayout = strTickLayout(ax);
    if(_this[stashKey] !== newTickLayout) {
        axLayer.selectAll('.' + axId + 'tick').remove();
        _this[stashKey] = newTickLayout;
    }

    ax.setScale();

    var vals = Axes.calcTicks(ax);
    var valsClipped = Axes.clipEnds(ax, vals);
    var transFn = Axes.makeTransFn(ax);
    var tickSign = Axes.getTickSigns(ax)[2];

    var caRad = Lib.deg2rad(counterAngle);
    var pad = tickSign * (ax.linewidth || 1) / 2;
    var len = tickSign * ax.ticklen;
    var w = _this.w;
    var h = _this.h;

    var tickPath = axLetter === 'b' ?
        'M0,' + pad + 'l' + (Math.sin(caRad) * len) + ',' + (Math.cos(caRad) * len) :
        'M' + pad + ',0l' + (Math.cos(caRad) * len) + ',' + (-Math.sin(caRad) * len);

    var gridPath = {
        a: 'M0,0l' + h + ',-' + (w / 2),
        b: 'M0,0l-' + (w / 2) + ',-' + h,
        c: 'M0,0l-' + h + ',' + (w / 2)
    }[axLetter];

    Axes.drawTicks(gd, ax, {
        vals: ax.ticks === 'inside' ? valsClipped : vals,
        layer: axLayer,
        path: tickPath,
        transFn: transFn,
        crisp: false
    });

    Axes.drawGrid(gd, ax, {
        vals: valsClipped,
        layer: _this.layers[axLetter + 'grid'],
        path: gridPath,
        transFn: transFn,
        crisp: false
    });

    Axes.drawLabels(gd, ax, {
        vals: vals,
        layer: axLayer,
        transFn: transFn,
        labelFns: Axes.makeLabelFns(ax, 0, counterAngle)
    });
};

function strTickLayout(axLayout) {
    return axLayout.ticks + String(axLayout.ticklen) + String(axLayout.showticklabels);
}

// hard coded paths for zoom corners
// uses the same sizing as cartesian, length is MINZOOM/2, width is 3px
var CLEN = constants.MINZOOM / 2 + 0.87;
var BLPATH = 'm-0.87,.5h' + CLEN + 'v3h-' + (CLEN + 5.2) +
    'l' + (CLEN / 2 + 2.6) + ',-' + (CLEN * 0.87 + 4.5) +
    'l2.6,1.5l-' + (CLEN / 2) + ',' + (CLEN * 0.87) + 'Z';
var BRPATH = 'm0.87,.5h-' + CLEN + 'v3h' + (CLEN + 5.2) +
    'l-' + (CLEN / 2 + 2.6) + ',-' + (CLEN * 0.87 + 4.5) +
    'l-2.6,1.5l' + (CLEN / 2) + ',' + (CLEN * 0.87) + 'Z';
var TOPPATH = 'm0,1l' + (CLEN / 2) + ',' + (CLEN * 0.87) +
    'l2.6,-1.5l-' + (CLEN / 2 + 2.6) + ',-' + (CLEN * 0.87 + 4.5) +
    'l-' + (CLEN / 2 + 2.6) + ',' + (CLEN * 0.87 + 4.5) +
    'l2.6,1.5l' + (CLEN / 2) + ',-' + (CLEN * 0.87) + 'Z';
var STARTMARKER = 'm0.5,0.5h5v-2h-5v-5h-2v5h-5v2h5v5h2Z';

// I guess this could be shared with cartesian... but for now it's separate.
var SHOWZOOMOUTTIP = true;

proto.clearSelect = function() {
    clearSelectionsCache(this.dragOptions);
    clearSelect(this.dragOptions.gd);
};

proto.initInteractions = function() {
    var _this = this;
    var dragger = _this.layers.plotbg.select('path').node();
    var gd = _this.graphDiv;
    var zoomLayer = gd._fullLayout._zoomlayer;

    // use plotbg for the main interactions
    this.dragOptions = {
        element: dragger,
        gd: gd,
        plotinfo: {
            id: _this.id,
            domain: gd._fullLayout[_this.id].domain,
            xaxis: _this.xaxis,
            yaxis: _this.yaxis
        },
        subplot: _this.id,
        prepFn: function(e, startX, startY) {
            // these aren't available yet when initInteractions
            // is called
            _this.dragOptions.xaxes = [_this.xaxis];
            _this.dragOptions.yaxes = [_this.yaxis];

            var dragModeNow = _this.dragOptions.dragmode = gd._fullLayout.dragmode;

            if(freeMode(dragModeNow)) _this.dragOptions.minDrag = 1;
            else _this.dragOptions.minDrag = undefined;

            if(dragModeNow === 'zoom') {
                _this.dragOptions.moveFn = zoomMove;
                _this.dragOptions.clickFn = clickZoomPan;
                _this.dragOptions.doneFn = zoomDone;
                zoomPrep(e, startX, startY);
            } else if(dragModeNow === 'pan') {
                _this.dragOptions.moveFn = plotDrag;
                _this.dragOptions.clickFn = clickZoomPan;
                _this.dragOptions.doneFn = dragDone;
                panPrep();
                _this.clearSelect(gd);
            } else if(rectMode(dragModeNow) || freeMode(dragModeNow)) {
                prepSelect(e, startX, startY, _this.dragOptions, dragModeNow);
            }
        }
    };

    var x0, y0, mins0, span0, mins, lum, path0, dimmed, zb, corners;

    function makeUpdate(_mins) {
        var attrs = {};
        attrs[_this.id + '.aaxis.min'] = _mins.a;
        attrs[_this.id + '.baxis.min'] = _mins.b;
        attrs[_this.id + '.caxis.min'] = _mins.c;
        return attrs;
    }

    function clickZoomPan(numClicks, evt) {
        var clickMode = gd._fullLayout.clickmode;

        removeZoombox(gd);

        if(numClicks === 2) {
            gd.emit('plotly_doubleclick', null);
            Registry.call('_guiRelayout', gd, makeUpdate({a: 0, b: 0, c: 0}));
        }

        if(clickMode.indexOf('select') > -1 && numClicks === 1) {
            selectOnClick(evt, gd, [_this.xaxis], [_this.yaxis], _this.id, _this.dragOptions);
        }

        if(clickMode.indexOf('event') > -1) {
            Fx.click(gd, evt, _this.id);
        }
    }

    function zoomPrep(e, startX, startY) {
        var dragBBox = dragger.getBoundingClientRect();
        x0 = startX - dragBBox.left;
        y0 = startY - dragBBox.top;
        mins0 = {
            a: _this.aaxis.range[0],
            b: _this.baxis.range[1],
            c: _this.caxis.range[1]
        };
        mins = mins0;
        span0 = _this.aaxis.range[1] - mins0.a;
        lum = tinycolor(_this.graphDiv._fullLayout[_this.id].bgcolor).getLuminance();
        path0 = 'M0,' + _this.h + 'L' + (_this.w / 2) + ', 0L' + _this.w + ',' + _this.h + 'Z';
        dimmed = false;

        zb = zoomLayer.append('path')
            .attr('class', 'zoombox')
            .attr('transform', 'translate(' + _this.x0 + ', ' + _this.y0 + ')')
            .style({
                'fill': lum > 0.2 ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0)',
                'stroke-width': 0
            })
            .attr('d', path0);

        corners = zoomLayer.append('path')
            .attr('class', 'zoombox-corners')
            .attr('transform', 'translate(' + _this.x0 + ', ' + _this.y0 + ')')
            .style({
                fill: Color.background,
                stroke: Color.defaultLine,
                'stroke-width': 1,
                opacity: 0
            })
            .attr('d', 'M0,0Z');

        _this.clearSelect(gd);
    }

    function getAFrac(x, y) { return 1 - (y / _this.h); }
    function getBFrac(x, y) { return 1 - ((x + (_this.h - y) / Math.sqrt(3)) / _this.w); }
    function getCFrac(x, y) { return ((x - (_this.h - y) / Math.sqrt(3)) / _this.w); }

    function zoomMove(dx0, dy0) {
        var x1 = x0 + dx0;
        var y1 = y0 + dy0;
        var afrac = Math.max(0, Math.min(1, getAFrac(x0, y0), getAFrac(x1, y1)));
        var bfrac = Math.max(0, Math.min(1, getBFrac(x0, y0), getBFrac(x1, y1)));
        var cfrac = Math.max(0, Math.min(1, getCFrac(x0, y0), getCFrac(x1, y1)));
        var xLeft = ((afrac / 2) + cfrac) * _this.w;
        var xRight = (1 - (afrac / 2) - bfrac) * _this.w;
        var xCenter = (xLeft + xRight) / 2;
        var xSpan = xRight - xLeft;
        var yBottom = (1 - afrac) * _this.h;
        var yTop = yBottom - xSpan / whRatio;

        if(xSpan < constants.MINZOOM) {
            mins = mins0;
            zb.attr('d', path0);
            corners.attr('d', 'M0,0Z');
        } else {
            mins = {
                a: mins0.a + afrac * span0,
                b: mins0.b + bfrac * span0,
                c: mins0.c + cfrac * span0
            };
            zb.attr('d', path0 + 'M' + xLeft + ',' + yBottom +
                'H' + xRight + 'L' + xCenter + ',' + yTop +
                'L' + xLeft + ',' + yBottom + 'Z');
            corners.attr('d', 'M' + x0 + ',' + y0 + STARTMARKER +
                'M' + xLeft + ',' + yBottom + BLPATH +
                'M' + xRight + ',' + yBottom + BRPATH +
                'M' + xCenter + ',' + yTop + TOPPATH);
        }

        if(!dimmed) {
            zb.transition()
                .style('fill', lum > 0.2 ? 'rgba(0,0,0,0.4)' :
                    'rgba(255,255,255,0.3)')
                .duration(200);
            corners.transition()
                .style('opacity', 1)
                .duration(200);
            dimmed = true;
        }

        gd.emit('plotly_relayouting', makeUpdate(mins));
    }

    function zoomDone() {
        removeZoombox(gd);

        if(mins === mins0) return;

        Registry.call('_guiRelayout', gd, makeUpdate(mins));

        if(SHOWZOOMOUTTIP && gd.data && gd._context.showTips) {
            Lib.notifier(_(gd, 'Double-click to zoom back out'), 'long');
            SHOWZOOMOUTTIP = false;
        }
    }

    function panPrep() {
        mins0 = {
            a: _this.aaxis.range[0],
            b: _this.baxis.range[1],
            c: _this.caxis.range[1]
        };
        mins = mins0;
    }

    function plotDrag(dx, dy) {
        var dxScaled = dx / _this.xaxis._m;
        var dyScaled = dy / _this.yaxis._m;
        mins = {
            a: mins0.a - dyScaled,
            b: mins0.b + (dxScaled + dyScaled) / 2,
            c: mins0.c - (dxScaled - dyScaled) / 2
        };
        var minsorted = [mins.a, mins.b, mins.c].sort();
        var minindices = {
            a: minsorted.indexOf(mins.a),
            b: minsorted.indexOf(mins.b),
            c: minsorted.indexOf(mins.c)
        };
        if(minsorted[0] < 0) {
            if(minsorted[1] + minsorted[0] / 2 < 0) {
                minsorted[2] += minsorted[0] + minsorted[1];
                minsorted[0] = minsorted[1] = 0;
            } else {
                minsorted[2] += minsorted[0] / 2;
                minsorted[1] += minsorted[0] / 2;
                minsorted[0] = 0;
            }
            mins = {
                a: minsorted[minindices.a],
                b: minsorted[minindices.b],
                c: minsorted[minindices.c]
            };
            dy = (mins0.a - mins.a) * _this.yaxis._m;
            dx = (mins0.c - mins.c - mins0.b + mins.b) * _this.xaxis._m;
        }

        // move the data (translate, don't redraw)
        var plotTransform = 'translate(' + (_this.x0 + dx) + ',' + (_this.y0 + dy) + ')';
        _this.plotContainer.selectAll('.scatterlayer,.maplayer')
            .attr('transform', plotTransform);

        var plotTransform2 = 'translate(' + -dx + ',' + -dy + ')';
        _this.clipDefRelative.select('path').attr('transform', plotTransform2);

        // move the ticks
        _this.aaxis.range = [mins.a, _this.sum - mins.b - mins.c];
        _this.baxis.range = [_this.sum - mins.a - mins.c, mins.b];
        _this.caxis.range = [_this.sum - mins.a - mins.b, mins.c];

        _this.drawAxes(false);

        if(_this._hasClipOnAxisFalse) {
            _this.plotContainer
                .select('.scatterlayer').selectAll('.trace')
                .call(Drawing.hideOutsideRangePoints, _this);
        }

        gd.emit('plotly_relayouting', makeUpdate(mins));
    }

    function dragDone() {
        Registry.call('_guiRelayout', gd, makeUpdate(mins));
    }

    // finally, set up hover and click
    // these event handlers must already be set before dragElement.init
    // so it can stash them and override them.
    dragger.onmousemove = function(evt) {
        Fx.hover(gd, evt, _this.id);
        gd._fullLayout._lasthover = dragger;
        gd._fullLayout._hoversubplot = _this.id;
    };

    dragger.onmouseout = function(evt) {
        if(gd._dragging) return;

        dragElement.unhover(gd, evt);
    };

    dragElement.init(this.dragOptions);
};

function removeZoombox(gd) {
    d3.select(gd)
        .selectAll('.zoombox,.js-zoombox-backdrop,.js-zoombox-menu,.zoombox-corners')
        .remove();
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterternary/attributes.js":
/*!************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterternary/attributes.js ***!
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



var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;
var scatterAttrs = __webpack_require__(/*! ../scatter/attributes */ "./node_modules/plotly.js/src/traces/scatter/attributes.js");
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var dash = __webpack_require__(/*! ../../components/drawing/attributes */ "./node_modules/plotly.js/src/components/drawing/attributes.js").dash;

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

var scatterMarkerAttrs = scatterAttrs.marker;
var scatterLineAttrs = scatterAttrs.line;
var scatterMarkerLineAttrs = scatterMarkerAttrs.line;

module.exports = {
    a: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the quantity of component `a` in each data point.',
            'If `a`, `b`, and `c` are all provided, they need not be',
            'normalized, only the relative values matter. If only two',
            'arrays are provided they must be normalized to match',
            '`ternary<i>.sum`.'
        ].join(' ')
    },
    b: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the quantity of component `a` in each data point.',
            'If `a`, `b`, and `c` are all provided, they need not be',
            'normalized, only the relative values matter. If only two',
            'arrays are provided they must be normalized to match',
            '`ternary<i>.sum`.'
        ].join(' ')
    },
    c: {
        valType: 'data_array',
        editType: 'calc',
        description: [
            'Sets the quantity of component `a` in each data point.',
            'If `a`, `b`, and `c` are all provided, they need not be',
            'normalized, only the relative values matter. If only two',
            'arrays are provided they must be normalized to match',
            '`ternary<i>.sum`.'
        ].join(' ')
    },
    sum: {
        valType: 'number',
        role: 'info',
        dflt: 0,
        min: 0,
        editType: 'calc',
        description: [
            'The number each triplet should sum to,',
            'if only two of `a`, `b`, and `c` are provided.',
            'This overrides `ternary<i>.sum` to normalize this specific',
            'trace, but does not affect the values displayed on the axes.',
            '0 (or missing) means to use ternary<i>.sum'
        ].join(' ')
    },
    mode: extendFlat({}, scatterAttrs.mode, {dflt: 'markers'}),
    text: extendFlat({}, scatterAttrs.text, {
        description: [
            'Sets text elements associated with each (a,b,c) point.',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of strings, the items are mapped in order to the',
            'the data points in (a,b,c).',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    }),
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: ['a', 'b', 'c', 'text']
    }),
    hovertext: extendFlat({}, scatterAttrs.hovertext, {
        description: [
            'Sets hover text elements associated with each (a,b,c) point.',
            'If a single string, the same string appears over',
            'all the data points.',
            'If an array of strings, the items are mapped in order to the',
            'the data points in (a,b,c).',
            'To be seen, trace `hoverinfo` must contain a *text* flag.'
        ].join(' ')
    }),
    line: {
        color: scatterLineAttrs.color,
        width: scatterLineAttrs.width,
        dash: dash,
        shape: extendFlat({}, scatterLineAttrs.shape,
            {values: ['linear', 'spline']}),
        smoothing: scatterLineAttrs.smoothing,
        editType: 'calc'
    },
    connectgaps: scatterAttrs.connectgaps,
    cliponaxis: scatterAttrs.cliponaxis,
    fill: extendFlat({}, scatterAttrs.fill, {
        values: ['none', 'toself', 'tonext'],
        dflt: 'none',
        description: [
            'Sets the area to fill with a solid color.',
            'Use with `fillcolor` if not *none*.',
            'scatterternary has a subset of the options available to scatter.',
            '*toself* connects the endpoints of the trace (or each segment',
            'of the trace if it has gaps) into a closed shape.',
            '*tonext* fills the space between two traces if one completely',
            'encloses the other (eg consecutive contour lines), and behaves like',
            '*toself* if there is no trace before it. *tonext* should not be',
            'used if one trace does not enclose the other.'
        ].join(' ')
    }),
    fillcolor: scatterAttrs.fillcolor,
    marker: extendFlat({
        symbol: scatterMarkerAttrs.symbol,
        opacity: scatterMarkerAttrs.opacity,
        maxdisplayed: scatterMarkerAttrs.maxdisplayed,
        size: scatterMarkerAttrs.size,
        sizeref: scatterMarkerAttrs.sizeref,
        sizemin: scatterMarkerAttrs.sizemin,
        sizemode: scatterMarkerAttrs.sizemode,
        line: extendFlat({
            width: scatterMarkerLineAttrs.width,
            editType: 'calc'
        },
            colorScaleAttrs('marker.line')
        ),
        gradient: scatterMarkerAttrs.gradient,
        editType: 'calc'
    },
        colorScaleAttrs('marker')
    ),

    textfont: scatterAttrs.textfont,
    textposition: scatterAttrs.textposition,

    selected: scatterAttrs.selected,
    unselected: scatterAttrs.unselected,

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['a', 'b', 'c', 'text', 'name']
    }),
    hoveron: scatterAttrs.hoveron,
    hovertemplate: hovertemplateAttrs(),
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterternary/calc.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterternary/calc.js ***!
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




var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var calcColorscale = __webpack_require__(/*! ../scatter/colorscale_calc */ "./node_modules/plotly.js/src/traces/scatter/colorscale_calc.js");
var arraysToCalcdata = __webpack_require__(/*! ../scatter/arrays_to_calcdata */ "./node_modules/plotly.js/src/traces/scatter/arrays_to_calcdata.js");
var calcSelection = __webpack_require__(/*! ../scatter/calc_selection */ "./node_modules/plotly.js/src/traces/scatter/calc_selection.js");
var calcMarkerSize = __webpack_require__(/*! ../scatter/calc */ "./node_modules/plotly.js/src/traces/scatter/calc.js").calcMarkerSize;

var dataArrays = ['a', 'b', 'c'];
var arraysToFill = {a: ['b', 'c'], b: ['a', 'c'], c: ['a', 'b']};

module.exports = function calc(gd, trace) {
    var ternary = gd._fullLayout[trace.subplot];
    var displaySum = ternary.sum;
    var normSum = trace.sum || displaySum;
    var arrays = {a: trace.a, b: trace.b, c: trace.c};

    var i, j, dataArray, newArray, fillArray1, fillArray2;

    // fill in one missing component
    for(i = 0; i < dataArrays.length; i++) {
        dataArray = dataArrays[i];
        if(arrays[dataArray]) continue;

        fillArray1 = arrays[arraysToFill[dataArray][0]];
        fillArray2 = arrays[arraysToFill[dataArray][1]];
        newArray = new Array(fillArray1.length);
        for(j = 0; j < fillArray1.length; j++) {
            newArray[j] = normSum - fillArray1[j] - fillArray2[j];
        }
        arrays[dataArray] = newArray;
    }

    // make the calcdata array
    var serieslen = trace._length;
    var cd = new Array(serieslen);
    var a, b, c, norm, x, y;
    for(i = 0; i < serieslen; i++) {
        a = arrays.a[i];
        b = arrays.b[i];
        c = arrays.c[i];
        if(isNumeric(a) && isNumeric(b) && isNumeric(c)) {
            a = +a;
            b = +b;
            c = +c;
            norm = displaySum / (a + b + c);
            if(norm !== 1) {
                a *= norm;
                b *= norm;
                c *= norm;
            }
            // map a, b, c onto x and y where the full scale of y
            // is [0, sum], and x is [-sum, sum]
            // TODO: this makes `a` always the top, `b` the bottom left,
            // and `c` the bottom right. Do we want options to rearrange
            // these?
            y = a;
            x = c - b;
            cd[i] = {x: x, y: y, a: a, b: b, c: c};
        } else cd[i] = {x: false, y: false};
    }

    calcMarkerSize(trace, serieslen);
    calcColorscale(gd, trace);
    arraysToCalcdata(cd, trace);
    calcSelection(cd, trace);

    return cd;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterternary/defaults.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterternary/defaults.js ***!
  \**********************************************************************/
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

var constants = __webpack_require__(/*! ../scatter/constants */ "./node_modules/plotly.js/src/traces/scatter/constants.js");
var subTypes = __webpack_require__(/*! ../scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var handleMarkerDefaults = __webpack_require__(/*! ../scatter/marker_defaults */ "./node_modules/plotly.js/src/traces/scatter/marker_defaults.js");
var handleLineDefaults = __webpack_require__(/*! ../scatter/line_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_defaults.js");
var handleLineShapeDefaults = __webpack_require__(/*! ../scatter/line_shape_defaults */ "./node_modules/plotly.js/src/traces/scatter/line_shape_defaults.js");
var handleTextDefaults = __webpack_require__(/*! ../scatter/text_defaults */ "./node_modules/plotly.js/src/traces/scatter/text_defaults.js");
var handleFillColorDefaults = __webpack_require__(/*! ../scatter/fillcolor_defaults */ "./node_modules/plotly.js/src/traces/scatter/fillcolor_defaults.js");

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatterternary/attributes.js");


module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var a = coerce('a');
    var b = coerce('b');
    var c = coerce('c');
    var len;

    // allow any one array to be missing, len is the minimum length of those
    // present. Note that after coerce data_array's are either Arrays (which
    // are truthy even if empty) or undefined. As in scatter, an empty array
    // is different from undefined, because it can signify that this data is
    // not known yet but expected in the future
    if(a) {
        len = a.length;
        if(b) {
            len = Math.min(len, b.length);
            if(c) len = Math.min(len, c.length);
        } else if(c) len = Math.min(len, c.length);
        else len = 0;
    } else if(b && c) {
        len = Math.min(b.length, c.length);
    }

    if(!len) {
        traceOut.visible = false;
        return;
    }

    traceOut._length = len;

    coerce('sum');

    coerce('text');
    coerce('hovertext');
    if(traceOut.hoveron !== 'fills') coerce('hovertemplate');

    var defaultMode = len < constants.PTS_LINESONLY ? 'lines+markers' : 'lines';
    coerce('mode', defaultMode);

    if(subTypes.hasLines(traceOut)) {
        handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);
        handleLineShapeDefaults(traceIn, traceOut, coerce);
        coerce('connectgaps');
    }

    if(subTypes.hasMarkers(traceOut)) {
        handleMarkerDefaults(traceIn, traceOut, defaultColor, layout, coerce, {gradient: true});
    }

    if(subTypes.hasText(traceOut)) {
        coerce('texttemplate');
        handleTextDefaults(traceIn, traceOut, layout, coerce);
    }

    var dfltHoverOn = [];

    if(subTypes.hasMarkers(traceOut) || subTypes.hasText(traceOut)) {
        coerce('cliponaxis');
        coerce('marker.maxdisplayed');
        dfltHoverOn.push('points');
    }

    coerce('fill');
    if(traceOut.fill !== 'none') {
        handleFillColorDefaults(traceIn, traceOut, defaultColor, coerce);
        if(!subTypes.hasLines(traceOut)) handleLineShapeDefaults(traceIn, traceOut, coerce);
    }

    if(traceOut.fill === 'tonext' || traceOut.fill === 'toself') {
        dfltHoverOn.push('fills');
    }
    coerce('hoveron', dfltHoverOn.join('+') || 'points');

    Lib.coerceSelectionMarkerOpacity(traceOut, coerce);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterternary/event_data.js":
/*!************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterternary/event_data.js ***!
  \************************************************************************/
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
    if(pt.xa) out.xaxis = pt.xa;
    if(pt.ya) out.yaxis = pt.ya;

    if(cd[pointNumber]) {
        var cdi = cd[pointNumber];

        // N.B. These are the normalized coordinates.
        out.a = cdi.a;
        out.b = cdi.b;
        out.c = cdi.c;
    } else {
        // for fill-hover only
        out.a = pt.a;
        out.b = pt.b;
        out.c = pt.c;
    }

    return out;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterternary/format_labels.js":
/*!***************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterternary/format_labels.js ***!
  \***************************************************************************/
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
    labels.aLabel = Axes.tickText(subplot.aaxis, cdi.a, true).text;
    labels.bLabel = Axes.tickText(subplot.baxis, cdi.b, true).text;
    labels.cLabel = Axes.tickText(subplot.caxis, cdi.c, true).text;

    return labels;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterternary/hover.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterternary/hover.js ***!
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



var scatterHover = __webpack_require__(/*! ../scatter/hover */ "./node_modules/plotly.js/src/traces/scatter/hover.js");

module.exports = function hoverPoints(pointData, xval, yval, hovermode) {
    var scatterPointData = scatterHover(pointData, xval, yval, hovermode);
    if(!scatterPointData || scatterPointData[0].index === false) return;

    var newPointData = scatterPointData[0];

    // if hovering on a fill, we don't show any point data so the label is
    // unchanged from what scatter gives us - except that it needs to
    // be constrained to the trianglular plot area, not just the rectangular
    // area defined by the synthetic x and y axes
    // TODO: in some cases the vertical middle of the shape is not within
    // the triangular viewport at all, so the label can become disconnected
    // from the shape entirely. But calculating what portion of the shape
    // is actually visible, as constrained by the diagonal axis lines, is not
    // so easy and anyway we lost the information we would have needed to do
    // this inside scatterHover.
    if(newPointData.index === undefined) {
        var yFracUp = 1 - (newPointData.y0 / pointData.ya._length);
        var xLen = pointData.xa._length;
        var xMin = xLen * yFracUp / 2;
        var xMax = xLen - xMin;
        newPointData.x0 = Math.max(Math.min(newPointData.x0, xMax), xMin);
        newPointData.x1 = Math.max(Math.min(newPointData.x1, xMax), xMin);
        return scatterPointData;
    }

    var cdi = newPointData.cd[newPointData.index];
    var trace = newPointData.trace;
    var subplot = newPointData.subplot;

    newPointData.a = cdi.a;
    newPointData.b = cdi.b;
    newPointData.c = cdi.c;

    newPointData.xLabelVal = undefined;
    newPointData.yLabelVal = undefined;

    var fullLayout = {};
    fullLayout[trace.subplot] = {_subplot: subplot};
    var labels = trace._module.formatLabels(cdi, trace, fullLayout);
    newPointData.aLabel = labels.aLabel;
    newPointData.bLabel = labels.bLabel;
    newPointData.cLabel = labels.cLabel;

    var hoverinfo = cdi.hi || trace.hoverinfo;
    var text = [];
    function textPart(ax, val) {
        text.push(ax._hovertitle + ': ' + val);
    }
    if(!trace.hovertemplate) {
        var parts = hoverinfo.split('+');
        if(parts.indexOf('all') !== -1) parts = ['a', 'b', 'c'];
        if(parts.indexOf('a') !== -1) textPart(subplot.aaxis, newPointData.aLabel);
        if(parts.indexOf('b') !== -1) textPart(subplot.baxis, newPointData.bLabel);
        if(parts.indexOf('c') !== -1) textPart(subplot.caxis, newPointData.cLabel);
    }
    newPointData.extraText = text.join('<br>');
    newPointData.hovertemplate = trace.hovertemplate;
    return scatterPointData;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterternary/index.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterternary/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/scatterternary/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/scatterternary/defaults.js"),
    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),
    formatLabels: __webpack_require__(/*! ./format_labels */ "./node_modules/plotly.js/src/traces/scatterternary/format_labels.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/scatterternary/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/scatterternary/plot.js"),
    style: __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js").style,
    styleOnSelect: __webpack_require__(/*! ../scatter/style */ "./node_modules/plotly.js/src/traces/scatter/style.js").styleOnSelect,
    hoverPoints: __webpack_require__(/*! ./hover */ "./node_modules/plotly.js/src/traces/scatterternary/hover.js"),
    selectPoints: __webpack_require__(/*! ../scatter/select */ "./node_modules/plotly.js/src/traces/scatter/select.js"),
    eventData: __webpack_require__(/*! ./event_data */ "./node_modules/plotly.js/src/traces/scatterternary/event_data.js"),

    moduleType: 'trace',
    name: 'scatterternary',
    basePlotModule: __webpack_require__(/*! ../../plots/ternary */ "./node_modules/plotly.js/src/plots/ternary/index.js"),
    categories: ['ternary', 'symbols', 'showLegend', 'scatter-like'],
    meta: {
        hrName: 'scatter_ternary',
        description: [
            'Provides similar functionality to the *scatter* type but on a ternary phase diagram.',
            'The data is provided by at least two arrays out of `a`, `b`, `c` triplets.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/scatterternary/plot.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/scatterternary/plot.js ***!
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




var scatterPlot = __webpack_require__(/*! ../scatter/plot */ "./node_modules/plotly.js/src/traces/scatter/plot.js");

module.exports = function plot(gd, ternary, moduleCalcData) {
    var plotContainer = ternary.plotContainer;

    // remove all nodes inside the scatter layer
    plotContainer.select('.scatterlayer').selectAll('*').remove();

    // mimic cartesian plotinfo
    var plotinfo = {
        xaxis: ternary.xaxis,
        yaxis: ternary.yaxis,
        plot: plotContainer,
        layerClipId: ternary._hasClipOnAxisFalse ? ternary.clipIdRelative : null
    };

    var scatterLayer = ternary.layers.frontplot.select('g.scatterlayer');

    scatterPlot(gd, plotinfo, moduleCalcData, scatterLayer);
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvc2NhdHRlcnRlcm5hcnkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL3Rlcm5hcnkvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL3Rlcm5hcnkvbGF5b3V0X2F0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL3Rlcm5hcnkvbGF5b3V0X2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy90ZXJuYXJ5L3Rlcm5hcnkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVydGVybmFyeS9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcnRlcm5hcnkvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJ0ZXJuYXJ5L2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcnRlcm5hcnkvZXZlbnRfZGF0YS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJ0ZXJuYXJ5L2Zvcm1hdF9sYWJlbHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9zY2F0dGVydGVybmFyeS9ob3Zlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3NjYXR0ZXJ0ZXJuYXJ5L2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvc2NhdHRlcnRlcm5hcnkvcGxvdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYix1SUFBd0Q7Ozs7Ozs7Ozs7OztBQ1Z4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsY0FBYyxtQkFBTyxDQUFDLHdFQUFXOztBQUVqQyx5QkFBeUIsb0hBQWtEO0FBQzNFLG1CQUFtQiw4RkFBaUM7QUFDcEQ7O0FBRUEsWUFBWTs7QUFFWixXQUFXLFlBQVk7O0FBRXZCLGNBQWM7O0FBRWQsZUFBZSxHQUFHLGlCQUFpQjs7QUFFbkMsaUJBQWlCLGtCQUFrQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsNElBQXlEOztBQUV6RCw0SUFBMkQ7O0FBRTNELFlBQVk7QUFDWjtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHVCQUF1QjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsYUFBYTtBQUNiOztBQUVBLGtCQUFrQiwyQkFBMkI7QUFDN0M7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLHNHQUFtQztBQUM1RCxrQkFBa0IsK0ZBQStCO0FBQ2pELGdCQUFnQixtQkFBTyxDQUFDLHlHQUFnQzs7QUFFeEQsa0JBQWtCLHVIQUFnRDtBQUNsRSxpQkFBaUIsb0dBQXNDOztBQUV2RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QixxQkFBcUIsZ0JBQWdCO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHVCQUF1QixXQUFXO0FBQzdEO0FBQ0E7QUFDQSwyQkFBMkIsdUJBQXVCLFdBQVc7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx5QkFBeUIsZ0JBQWdCOztBQUV6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsc0ZBQXdCO0FBQzVDLGVBQWUsbUJBQU8sQ0FBQyw0RkFBOEI7QUFDckQsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3Qiw0QkFBNEIsbUJBQU8sQ0FBQyxtRkFBcUI7QUFDekQsOEJBQThCLG1CQUFPLENBQUMsNkdBQWtDO0FBQ3hFLDZCQUE2QixtQkFBTyxDQUFDLDJHQUFpQztBQUN0RSw4QkFBOEIsbUJBQU8sQ0FBQyw2R0FBa0M7QUFDeEUsNkJBQTZCLG1CQUFPLENBQUMsMkdBQWlDO0FBQ3RFLHVCQUF1QixtQkFBTyxDQUFDLDRGQUFxQjs7QUFFcEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLGtCQUFrQixzQkFBc0I7QUFDeEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsaUNBQWlDOztBQUVqQztBQUNBLHdEQUF3RDtBQUN4RDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0EsMkVBQTJFO0FBQzNFO0FBQ0EsU0FBUyxtQkFBbUI7O0FBRTVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDaklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsZ0JBQWdCLG1CQUFPLENBQUMsMERBQVk7O0FBRXBDLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDdkMsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCO0FBQ0EsWUFBWSxtQkFBTyxDQUFDLHNGQUF3QjtBQUM1QyxjQUFjLG1CQUFPLENBQUMsMEZBQTBCO0FBQ2hELGlCQUFpQixtQkFBTyxDQUFDLDZGQUEwQjtBQUNuRCxpQkFBaUIsb0dBQXNDO0FBQ3ZELFlBQVksbUJBQU8sQ0FBQyw2REFBVTtBQUM5QixXQUFXLG1CQUFPLENBQUMsK0VBQW1CO0FBQ3RDLGtCQUFrQixtQkFBTyxDQUFDLGtHQUE4QjtBQUN4RCxTQUFTLG1CQUFPLENBQUMsZ0ZBQXFCO0FBQ3RDLGtCQUFrQixtQkFBTyxDQUFDLDRHQUFzQztBQUNoRTtBQUNBO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLHdGQUF5QjtBQUM5QyxpQkFBaUIsbUhBQXlDO0FBQzFELG9CQUFvQixzSEFBNEM7QUFDaEUsa0JBQWtCLG9IQUEwQztBQUM1RCwyQkFBMkIsNkhBQW1EO0FBQzlFLGdCQUFnQixtQkFBTyxDQUFDLHlGQUF3Qjs7QUFFaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsNEJBQTRCO0FBQzlDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG9DQUFvQyx3QkFBd0IsRUFBRTtBQUM5RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLFNBQVM7O0FBRVQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsYUFBYTs7QUFFM0Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFD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QUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLGtCQUFrQixtQkFBTyxDQUFDLDRFQUFpQjs7QUFFM0M7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EiLCJmaWxlIjoiY2hhcnRjYzRmNTJkODQ5YjRjYTI0NDk3NS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL3NjYXR0ZXJ0ZXJuYXJ5Jyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFRlcm5hcnkgPSByZXF1aXJlKCcuL3Rlcm5hcnknKTtcblxudmFyIGdldFN1YnBsb3RDYWxjRGF0YSA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2dldF9kYXRhJykuZ2V0U3VicGxvdENhbGNEYXRhO1xudmFyIGNvdW50ZXJSZWdleCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLmNvdW50ZXJSZWdleDtcbnZhciBURVJOQVJZID0gJ3Rlcm5hcnknO1xuXG5leHBvcnRzLm5hbWUgPSBURVJOQVJZO1xuXG52YXIgYXR0ciA9IGV4cG9ydHMuYXR0ciA9ICdzdWJwbG90JztcblxuZXhwb3J0cy5pZFJvb3QgPSBURVJOQVJZO1xuXG5leHBvcnRzLmlkUmVnZXggPSBleHBvcnRzLmF0dHJSZWdleCA9IGNvdW50ZXJSZWdleChURVJOQVJZKTtcblxudmFyIGF0dHJpYnV0ZXMgPSBleHBvcnRzLmF0dHJpYnV0ZXMgPSB7fTtcbmF0dHJpYnV0ZXNbYXR0cl0gPSB7XG4gICAgdmFsVHlwZTogJ3N1YnBsb3RpZCcsXG4gICAgcm9sZTogJ2luZm8nLFxuICAgIGRmbHQ6ICd0ZXJuYXJ5JyxcbiAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICdTZXRzIGEgcmVmZXJlbmNlIGJldHdlZW4gdGhpcyB0cmFjZVxcJ3MgZGF0YSBjb29yZGluYXRlcyBhbmQnLFxuICAgICAgICAnYSB0ZXJuYXJ5IHN1YnBsb3QuJyxcbiAgICAgICAgJ0lmICp0ZXJuYXJ5KiAodGhlIGRlZmF1bHQgdmFsdWUpLCB0aGUgZGF0YSByZWZlciB0byBgbGF5b3V0LnRlcm5hcnlgLicsXG4gICAgICAgICdJZiAqdGVybmFyeTIqLCB0aGUgZGF0YSByZWZlciB0byBgbGF5b3V0LnRlcm5hcnkyYCwgYW5kIHNvIG9uLidcbiAgICBdLmpvaW4oJyAnKVxufTtcblxuZXhwb3J0cy5sYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpO1xuXG5leHBvcnRzLnN1cHBseUxheW91dERlZmF1bHRzID0gcmVxdWlyZSgnLi9sYXlvdXRfZGVmYXVsdHMnKTtcblxuZXhwb3J0cy5wbG90ID0gZnVuY3Rpb24gcGxvdChnZCkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGNhbGNEYXRhID0gZ2QuY2FsY2RhdGE7XG4gICAgdmFyIHRlcm5hcnlJZHMgPSBmdWxsTGF5b3V0Ll9zdWJwbG90c1tURVJOQVJZXTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXJuYXJ5SWRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB0ZXJuYXJ5SWQgPSB0ZXJuYXJ5SWRzW2ldO1xuICAgICAgICB2YXIgdGVybmFyeUNhbGNEYXRhID0gZ2V0U3VicGxvdENhbGNEYXRhKGNhbGNEYXRhLCBURVJOQVJZLCB0ZXJuYXJ5SWQpO1xuICAgICAgICB2YXIgdGVybmFyeSA9IGZ1bGxMYXlvdXRbdGVybmFyeUlkXS5fc3VicGxvdDtcblxuICAgICAgICAvLyBJZiB0ZXJuYXJ5IGlzIG5vdCBpbnN0YW50aWF0ZWQsIGNyZWF0ZSBvbmUhXG4gICAgICAgIGlmKCF0ZXJuYXJ5KSB7XG4gICAgICAgICAgICB0ZXJuYXJ5ID0gbmV3IFRlcm5hcnkoe1xuICAgICAgICAgICAgICAgIGlkOiB0ZXJuYXJ5SWQsXG4gICAgICAgICAgICAgICAgZ3JhcGhEaXY6IGdkLFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogZnVsbExheW91dC5fdGVybmFyeWxheWVyLm5vZGUoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmdWxsTGF5b3V0XG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBmdWxsTGF5b3V0W3Rlcm5hcnlJZF0uX3N1YnBsb3QgPSB0ZXJuYXJ5O1xuICAgICAgICB9XG5cbiAgICAgICAgdGVybmFyeS5wbG90KHRlcm5hcnlDYWxjRGF0YSwgZnVsbExheW91dCwgZ2QuX3Byb21pc2VzKTtcbiAgICB9XG59O1xuXG5leHBvcnRzLmNsZWFuID0gZnVuY3Rpb24obmV3RnVsbERhdGEsIG5ld0Z1bGxMYXlvdXQsIG9sZEZ1bGxEYXRhLCBvbGRGdWxsTGF5b3V0KSB7XG4gICAgdmFyIG9sZFRlcm5hcnlLZXlzID0gb2xkRnVsbExheW91dC5fc3VicGxvdHNbVEVSTkFSWV0gfHwgW107XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2xkVGVybmFyeUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIG9sZFRlcm5hcnlLZXkgPSBvbGRUZXJuYXJ5S2V5c1tpXTtcbiAgICAgICAgdmFyIG9sZFRlcm5hcnkgPSBvbGRGdWxsTGF5b3V0W29sZFRlcm5hcnlLZXldLl9zdWJwbG90O1xuXG4gICAgICAgIGlmKCFuZXdGdWxsTGF5b3V0W29sZFRlcm5hcnlLZXldICYmICEhb2xkVGVybmFyeSkge1xuICAgICAgICAgICAgb2xkVGVybmFyeS5wbG90Q29udGFpbmVyLnJlbW92ZSgpO1xuICAgICAgICAgICAgb2xkVGVybmFyeS5jbGlwRGVmLnJlbW92ZSgpO1xuICAgICAgICAgICAgb2xkVGVybmFyeS5jbGlwRGVmUmVsYXRpdmUucmVtb3ZlKCk7XG4gICAgICAgICAgICBvbGRUZXJuYXJ5LmxheWVyc1snYS10aXRsZSddLnJlbW92ZSgpO1xuICAgICAgICAgICAgb2xkVGVybmFyeS5sYXllcnNbJ2ItdGl0bGUnXS5yZW1vdmUoKTtcbiAgICAgICAgICAgIG9sZFRlcm5hcnkubGF5ZXJzWydjLXRpdGxlJ10ucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3JBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3IvYXR0cmlidXRlcycpO1xudmFyIGRvbWFpbkF0dHJzID0gcmVxdWlyZSgnLi4vZG9tYWluJykuYXR0cmlidXRlcztcbnZhciBheGVzQXR0cnMgPSByZXF1aXJlKCcuLi9jYXJ0ZXNpYW4vbGF5b3V0X2F0dHJpYnV0ZXMnKTtcblxudmFyIG92ZXJyaWRlQWxsID0gcmVxdWlyZSgnLi4vLi4vcGxvdF9hcGkvZWRpdF90eXBlcycpLm92ZXJyaWRlQWxsO1xudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxudmFyIHRlcm5hcnlBeGVzQXR0cnMgPSB7XG4gICAgdGl0bGU6IHtcbiAgICAgICAgdGV4dDogYXhlc0F0dHJzLnRpdGxlLnRleHQsXG4gICAgICAgIGZvbnQ6IGF4ZXNBdHRycy50aXRsZS5mb250XG4gICAgICAgIC8vIFRPRE8gZG9lcyBzdGFuZG9mZiBoZXJlIG1ha2Ugc2Vuc2U/XG4gICAgfSxcbiAgICBjb2xvcjogYXhlc0F0dHJzLmNvbG9yLFxuICAgIC8vIHRpY2tzXG4gICAgdGlja21vZGU6IGF4ZXNBdHRycy50aWNrbW9kZSxcbiAgICBudGlja3M6IGV4dGVuZEZsYXQoe30sIGF4ZXNBdHRycy5udGlja3MsIHtkZmx0OiA2LCBtaW46IDF9KSxcbiAgICB0aWNrMDogYXhlc0F0dHJzLnRpY2swLFxuICAgIGR0aWNrOiBheGVzQXR0cnMuZHRpY2ssXG4gICAgdGlja3ZhbHM6IGF4ZXNBdHRycy50aWNrdmFscyxcbiAgICB0aWNrdGV4dDogYXhlc0F0dHJzLnRpY2t0ZXh0LFxuICAgIHRpY2tzOiBheGVzQXR0cnMudGlja3MsXG4gICAgdGlja2xlbjogYXhlc0F0dHJzLnRpY2tsZW4sXG4gICAgdGlja3dpZHRoOiBheGVzQXR0cnMudGlja3dpZHRoLFxuICAgIHRpY2tjb2xvcjogYXhlc0F0dHJzLnRpY2tjb2xvcixcbiAgICBzaG93dGlja2xhYmVsczogYXhlc0F0dHJzLnNob3d0aWNrbGFiZWxzLFxuICAgIHNob3d0aWNrcHJlZml4OiBheGVzQXR0cnMuc2hvd3RpY2twcmVmaXgsXG4gICAgdGlja3ByZWZpeDogYXhlc0F0dHJzLnRpY2twcmVmaXgsXG4gICAgc2hvd3RpY2tzdWZmaXg6IGF4ZXNBdHRycy5zaG93dGlja3N1ZmZpeCxcbiAgICB0aWNrc3VmZml4OiBheGVzQXR0cnMudGlja3N1ZmZpeCxcbiAgICBzaG93ZXhwb25lbnQ6IGF4ZXNBdHRycy5zaG93ZXhwb25lbnQsXG4gICAgZXhwb25lbnRmb3JtYXQ6IGF4ZXNBdHRycy5leHBvbmVudGZvcm1hdCxcbiAgICBzZXBhcmF0ZXRob3VzYW5kczogYXhlc0F0dHJzLnNlcGFyYXRldGhvdXNhbmRzLFxuICAgIHRpY2tmb250OiBheGVzQXR0cnMudGlja2ZvbnQsXG4gICAgdGlja2FuZ2xlOiBheGVzQXR0cnMudGlja2FuZ2xlLFxuICAgIHRpY2tmb3JtYXQ6IGF4ZXNBdHRycy50aWNrZm9ybWF0LFxuICAgIHRpY2tmb3JtYXRzdG9wczogYXhlc0F0dHJzLnRpY2tmb3JtYXRzdG9wcyxcbiAgICBob3ZlcmZvcm1hdDogYXhlc0F0dHJzLmhvdmVyZm9ybWF0LFxuICAgIC8vIGxpbmVzIGFuZCBncmlkc1xuICAgIHNob3dsaW5lOiBleHRlbmRGbGF0KHt9LCBheGVzQXR0cnMuc2hvd2xpbmUsIHtkZmx0OiB0cnVlfSksXG4gICAgbGluZWNvbG9yOiBheGVzQXR0cnMubGluZWNvbG9yLFxuICAgIGxpbmV3aWR0aDogYXhlc0F0dHJzLmxpbmV3aWR0aCxcbiAgICBzaG93Z3JpZDogZXh0ZW5kRmxhdCh7fSwgYXhlc0F0dHJzLnNob3dncmlkLCB7ZGZsdDogdHJ1ZX0pLFxuICAgIGdyaWRjb2xvcjogYXhlc0F0dHJzLmdyaWRjb2xvcixcbiAgICBncmlkd2lkdGg6IGF4ZXNBdHRycy5ncmlkd2lkdGgsXG4gICAgbGF5ZXI6IGF4ZXNBdHRycy5sYXllcixcbiAgICAvLyByYW5nZVxuICAgIG1pbjoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIG1pbmltdW0gdmFsdWUgdmlzaWJsZSBvbiB0aGlzIGF4aXMuJyxcbiAgICAgICAgICAgICdUaGUgbWF4aW11bSBpcyBkZXRlcm1pbmVkIGJ5IHRoZSBzdW0gbWludXMgdGhlIG1pbmltdW0nLFxuICAgICAgICAgICAgJ3ZhbHVlcyBvZiB0aGUgb3RoZXIgdHdvIGF4ZXMuIFRoZSBmdWxsIHZpZXcgY29ycmVzcG9uZHMgdG8nLFxuICAgICAgICAgICAgJ2FsbCB0aGUgbWluaW1hIHNldCB0byB6ZXJvLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIF9kZXByZWNhdGVkOiB7XG4gICAgICAgIHRpdGxlOiBheGVzQXR0cnMuX2RlcHJlY2F0ZWQudGl0bGUsXG4gICAgICAgIHRpdGxlZm9udDogYXhlc0F0dHJzLl9kZXByZWNhdGVkLnRpdGxlZm9udFxuICAgIH1cbn07XG5cbnZhciBhdHRycyA9IG1vZHVsZS5leHBvcnRzID0gb3ZlcnJpZGVBbGwoe1xuICAgIGRvbWFpbjogZG9tYWluQXR0cnMoe25hbWU6ICd0ZXJuYXJ5J30pLFxuXG4gICAgYmdjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBkZmx0OiBjb2xvckF0dHJzLmJhY2tncm91bmQsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0IHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBzdWJwbG90J1xuICAgIH0sXG4gICAgc3VtOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgbnVtYmVyIGVhY2ggdHJpcGxldCBzaG91bGQgc3VtIHRvLCcsXG4gICAgICAgICAgICAnYW5kIHRoZSBtYXhpbXVtIHJhbmdlIG9mIGVhY2ggYXhpcydcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGFheGlzOiB0ZXJuYXJ5QXhlc0F0dHJzLFxuICAgIGJheGlzOiB0ZXJuYXJ5QXhlc0F0dHJzLFxuICAgIGNheGlzOiB0ZXJuYXJ5QXhlc0F0dHJzXG59LCAncGxvdCcsICdmcm9tLXJvb3QnKTtcblxuLy8gc2V0IHVpcmV2aXNpb25zIG91dHNpZGUgb2YgYG92ZXJyaWRlQWxsYCBzbyB3ZSBjYW4gZ2V0IGBlZGl0VHlwZTogbm9uZWBcbmF0dHJzLnVpcmV2aXNpb24gPSB7XG4gICAgdmFsVHlwZTogJ2FueScsXG4gICAgcm9sZTogJ2luZm8nLFxuICAgIGVkaXRUeXBlOiAnbm9uZScsXG4gICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgJ0NvbnRyb2xzIHBlcnNpc3RlbmNlIG9mIHVzZXItZHJpdmVuIGNoYW5nZXMgaW4gYXhpcyBgbWluYCBhbmQgYHRpdGxlYCwnLFxuICAgICAgICAnaWYgbm90IG92ZXJyaWRkZW4gaW4gdGhlIGluZGl2aWR1YWwgYXhlcy4nLFxuICAgICAgICAnRGVmYXVsdHMgdG8gYGxheW91dC51aXJldmlzaW9uYC4nXG4gICAgXS5qb2luKCcgJylcbn07XG5cbmF0dHJzLmFheGlzLnVpcmV2aXNpb24gPSBhdHRycy5iYXhpcy51aXJldmlzaW9uID0gYXR0cnMuY2F4aXMudWlyZXZpc2lvbiA9IHtcbiAgICB2YWxUeXBlOiAnYW55JyxcbiAgICByb2xlOiAnaW5mbycsXG4gICAgZWRpdFR5cGU6ICdub25lJyxcbiAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAnQ29udHJvbHMgcGVyc2lzdGVuY2Ugb2YgdXNlci1kcml2ZW4gY2hhbmdlcyBpbiBheGlzIGBtaW5gLCcsXG4gICAgICAgICdhbmQgYHRpdGxlYCBpZiBpbiBgZWRpdGFibGU6IHRydWVgIGNvbmZpZ3VyYXRpb24uJyxcbiAgICAgICAgJ0RlZmF1bHRzIHRvIGB0ZXJuYXJ5PE4+LnVpcmV2aXNpb25gLidcbiAgICBdLmpvaW4oJyAnKVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xudmFyIFRlbXBsYXRlID0gcmVxdWlyZSgnLi4vLi4vcGxvdF9hcGkvcGxvdF90ZW1wbGF0ZScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgaGFuZGxlU3VicGxvdERlZmF1bHRzID0gcmVxdWlyZSgnLi4vc3VicGxvdF9kZWZhdWx0cycpO1xudmFyIGhhbmRsZVRpY2tMYWJlbERlZmF1bHRzID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL3RpY2tfbGFiZWxfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVUaWNrTWFya0RlZmF1bHRzID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL3RpY2tfbWFya19kZWZhdWx0cycpO1xudmFyIGhhbmRsZVRpY2tWYWx1ZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL3RpY2tfdmFsdWVfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVMaW5lR3JpZERlZmF1bHRzID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL2xpbmVfZ3JpZF9kZWZhdWx0cycpO1xudmFyIGxheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG5cbnZhciBheGVzTmFtZXMgPSBbJ2FheGlzJywgJ2JheGlzJywgJ2NheGlzJ107XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5TGF5b3V0RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEpIHtcbiAgICBoYW5kbGVTdWJwbG90RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCwgZnVsbERhdGEsIHtcbiAgICAgICAgdHlwZTogJ3Rlcm5hcnknLFxuICAgICAgICBhdHRyaWJ1dGVzOiBsYXlvdXRBdHRyaWJ1dGVzLFxuICAgICAgICBoYW5kbGVEZWZhdWx0czogaGFuZGxlVGVybmFyeURlZmF1bHRzLFxuICAgICAgICBmb250OiBsYXlvdXRPdXQuZm9udCxcbiAgICAgICAgcGFwZXJfYmdjb2xvcjogbGF5b3V0T3V0LnBhcGVyX2JnY29sb3JcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIGhhbmRsZVRlcm5hcnlEZWZhdWx0cyh0ZXJuYXJ5TGF5b3V0SW4sIHRlcm5hcnlMYXlvdXRPdXQsIGNvZXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBiZ0NvbG9yID0gY29lcmNlKCdiZ2NvbG9yJyk7XG4gICAgdmFyIHN1bSA9IGNvZXJjZSgnc3VtJyk7XG4gICAgb3B0aW9ucy5iZ0NvbG9yID0gQ29sb3IuY29tYmluZShiZ0NvbG9yLCBvcHRpb25zLnBhcGVyX2JnY29sb3IpO1xuICAgIHZhciBheE5hbWUsIGNvbnRhaW5lckluLCBjb250YWluZXJPdXQ7XG5cbiAgICAvLyBUT0RPOiBhbGxvdyBtb3N0IChpZiBub3QgYWxsKSBheGlzIGF0dHJpYnV0ZXMgdG8gYmUgc2V0XG4gICAgLy8gaW4gdGhlIG91dGVyIGNvbnRhaW5lciBhbmQgdXNlZCBhcyBkZWZhdWx0cyBpbiB0aGUgaW5kaXZpZHVhbCBheGVzP1xuXG4gICAgZm9yKHZhciBqID0gMDsgaiA8IGF4ZXNOYW1lcy5sZW5ndGg7IGorKykge1xuICAgICAgICBheE5hbWUgPSBheGVzTmFtZXNbal07XG4gICAgICAgIGNvbnRhaW5lckluID0gdGVybmFyeUxheW91dEluW2F4TmFtZV0gfHwge307XG4gICAgICAgIGNvbnRhaW5lck91dCA9IFRlbXBsYXRlLm5ld0NvbnRhaW5lcih0ZXJuYXJ5TGF5b3V0T3V0LCBheE5hbWUpO1xuICAgICAgICBjb250YWluZXJPdXQuX25hbWUgPSBheE5hbWU7XG5cbiAgICAgICAgaGFuZGxlQXhpc0RlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIG9wdGlvbnMsIHRlcm5hcnlMYXlvdXRPdXQpO1xuICAgIH1cblxuICAgIC8vIGlmIHRoZSBtaW4gdmFsdWVzIGNvbnRyYWRpY3QgZWFjaCBvdGhlciwgc2V0IHRoZW0gYWxsIHRvIGRlZmF1bHQgKDApXG4gICAgLy8gYW5kIGRlbGV0ZSAqYWxsKiB0aGUgaW5wdXRzIHNvIHRoZSB1c2VyIGRvZXNuJ3QgZ2V0IGNvbmZ1c2VkIGxhdGVyIGJ5XG4gICAgLy8gY2hhbmdpbmcgb25lIGFuZCBoYXZpbmcgdGhlbSBhbGwgY2hhbmdlLlxuICAgIHZhciBhYXhpcyA9IHRlcm5hcnlMYXlvdXRPdXQuYWF4aXM7XG4gICAgdmFyIGJheGlzID0gdGVybmFyeUxheW91dE91dC5iYXhpcztcbiAgICB2YXIgY2F4aXMgPSB0ZXJuYXJ5TGF5b3V0T3V0LmNheGlzO1xuICAgIGlmKGFheGlzLm1pbiArIGJheGlzLm1pbiArIGNheGlzLm1pbiA+PSBzdW0pIHtcbiAgICAgICAgYWF4aXMubWluID0gMDtcbiAgICAgICAgYmF4aXMubWluID0gMDtcbiAgICAgICAgY2F4aXMubWluID0gMDtcbiAgICAgICAgaWYodGVybmFyeUxheW91dEluLmFheGlzKSBkZWxldGUgdGVybmFyeUxheW91dEluLmFheGlzLm1pbjtcbiAgICAgICAgaWYodGVybmFyeUxheW91dEluLmJheGlzKSBkZWxldGUgdGVybmFyeUxheW91dEluLmJheGlzLm1pbjtcbiAgICAgICAgaWYodGVybmFyeUxheW91dEluLmNheGlzKSBkZWxldGUgdGVybmFyeUxheW91dEluLmNheGlzLm1pbjtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGhhbmRsZUF4aXNEZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBvcHRpb25zLCB0ZXJuYXJ5TGF5b3V0T3V0KSB7XG4gICAgdmFyIGF4QXR0cnMgPSBsYXlvdXRBdHRyaWJ1dGVzW2NvbnRhaW5lck91dC5fbmFtZV07XG5cbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBheEF0dHJzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ3VpcmV2aXNpb24nLCB0ZXJuYXJ5TGF5b3V0T3V0LnVpcmV2aXNpb24pO1xuXG4gICAgY29udGFpbmVyT3V0LnR5cGUgPSAnbGluZWFyJzsgLy8gbm8gb3RoZXIgdHlwZXMgYWxsb3dlZCBmb3IgdGVybmFyeVxuXG4gICAgdmFyIGRmbHRDb2xvciA9IGNvZXJjZSgnY29sb3InKTtcbiAgICAvLyBpZiBheGlzLmNvbG9yIHdhcyBwcm92aWRlZCwgdXNlIGl0IGZvciBmb250cyB0b287IG90aGVyd2lzZSxcbiAgICAvLyBpbmhlcml0IGZyb20gZ2xvYmFsIGZvbnQgY29sb3IgaW4gY2FzZSB0aGF0IHdhcyBwcm92aWRlZC5cbiAgICB2YXIgZGZsdEZvbnRDb2xvciA9IChkZmx0Q29sb3IgIT09IGF4QXR0cnMuY29sb3IuZGZsdCkgPyBkZmx0Q29sb3IgOiBvcHRpb25zLmZvbnQuY29sb3I7XG5cbiAgICB2YXIgYXhOYW1lID0gY29udGFpbmVyT3V0Ll9uYW1lO1xuICAgIHZhciBsZXR0ZXJVcHBlciA9IGF4TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKTtcbiAgICB2YXIgZGZsdFRpdGxlID0gJ0NvbXBvbmVudCAnICsgbGV0dGVyVXBwZXI7XG5cbiAgICB2YXIgdGl0bGUgPSBjb2VyY2UoJ3RpdGxlLnRleHQnLCBkZmx0VGl0bGUpO1xuICAgIGNvbnRhaW5lck91dC5faG92ZXJ0aXRsZSA9IHRpdGxlID09PSBkZmx0VGl0bGUgPyB0aXRsZSA6IGxldHRlclVwcGVyO1xuXG4gICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAndGl0bGUuZm9udCcsIHtcbiAgICAgICAgZmFtaWx5OiBvcHRpb25zLmZvbnQuZmFtaWx5LFxuICAgICAgICBzaXplOiBNYXRoLnJvdW5kKG9wdGlvbnMuZm9udC5zaXplICogMS4yKSxcbiAgICAgICAgY29sb3I6IGRmbHRGb250Q29sb3JcbiAgICB9KTtcblxuICAgIC8vIHJhbmdlIGlzIGp1c3Qgc2V0IGJ5ICdtaW4nIC0gbWF4IGlzIGRldGVybWluZWQgYnkgdGhlIG90aGVyIGF4ZXMgbWluc1xuICAgIGNvZXJjZSgnbWluJyk7XG5cbiAgICBoYW5kbGVUaWNrVmFsdWVEZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBjb2VyY2UsICdsaW5lYXInKTtcbiAgICBoYW5kbGVUaWNrTGFiZWxEZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBjb2VyY2UsICdsaW5lYXInLCB7fSk7XG4gICAgaGFuZGxlVGlja01hcmtEZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBjb2VyY2UsXG4gICAgICAgIHsgb3V0ZXJUaWNrczogdHJ1ZSB9KTtcblxuICAgIHZhciBzaG93VGlja0xhYmVscyA9IGNvZXJjZSgnc2hvd3RpY2tsYWJlbHMnKTtcbiAgICBpZihzaG93VGlja0xhYmVscykge1xuICAgICAgICBMaWIuY29lcmNlRm9udChjb2VyY2UsICd0aWNrZm9udCcsIHtcbiAgICAgICAgICAgIGZhbWlseTogb3B0aW9ucy5mb250LmZhbWlseSxcbiAgICAgICAgICAgIHNpemU6IG9wdGlvbnMuZm9udC5zaXplLFxuICAgICAgICAgICAgY29sb3I6IGRmbHRGb250Q29sb3JcbiAgICAgICAgfSk7XG4gICAgICAgIGNvZXJjZSgndGlja2FuZ2xlJyk7XG4gICAgICAgIGNvZXJjZSgndGlja2Zvcm1hdCcpO1xuICAgIH1cblxuICAgIGhhbmRsZUxpbmVHcmlkRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCB7XG4gICAgICAgIGRmbHRDb2xvcjogZGZsdENvbG9yLFxuICAgICAgICBiZ0NvbG9yOiBvcHRpb25zLmJnQ29sb3IsXG4gICAgICAgIC8vIGRlZmF1bHQgZ3JpZCBjb2xvciBpcyBkYXJrZXIgaGVyZSAoNjAlLCB2cyBjYXJ0ZXNpYW4gZGVmYXVsdCB+OTElKVxuICAgICAgICAvLyBiZWNhdXNlIHRoZSBncmlkIGlzIG5vdCBzcXVhcmUgc28gdGhlIGV5ZSBuZWVkcyBoZWF2aWVyIGN1ZXMgdG8gZm9sbG93XG4gICAgICAgIGJsZW5kOiA2MCxcbiAgICAgICAgc2hvd0xpbmU6IHRydWUsXG4gICAgICAgIHNob3dHcmlkOiB0cnVlLFxuICAgICAgICBub1plcm9MaW5lOiB0cnVlLFxuICAgICAgICBhdHRyaWJ1dGVzOiBheEF0dHJzXG4gICAgfSk7XG5cbiAgICBjb2VyY2UoJ2hvdmVyZm9ybWF0Jyk7XG4gICAgY29lcmNlKCdsYXllcicpO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgdGlueWNvbG9yID0gcmVxdWlyZSgndGlueWNvbG9yMicpO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIF8gPSBMaWIuXztcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgc2V0Q29udmVydCA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9zZXRfY29udmVydCcpO1xudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBQbG90cyA9IHJlcXVpcmUoJy4uL3Bsb3RzJyk7XG52YXIgQXhlcyA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9heGVzJyk7XG52YXIgZHJhZ0VsZW1lbnQgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYWdlbGVtZW50Jyk7XG52YXIgRnggPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Z4Jyk7XG52YXIgZHJhZ0hlbHBlcnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYWdlbGVtZW50L2hlbHBlcnMnKTtcbnZhciBmcmVlTW9kZSA9IGRyYWdIZWxwZXJzLmZyZWVNb2RlO1xudmFyIHJlY3RNb2RlID0gZHJhZ0hlbHBlcnMucmVjdE1vZGU7XG52YXIgVGl0bGVzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy90aXRsZXMnKTtcbnZhciBwcmVwU2VsZWN0ID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL3NlbGVjdCcpLnByZXBTZWxlY3Q7XG52YXIgc2VsZWN0T25DbGljayA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9zZWxlY3QnKS5zZWxlY3RPbkNsaWNrO1xudmFyIGNsZWFyU2VsZWN0ID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL3NlbGVjdCcpLmNsZWFyU2VsZWN0O1xudmFyIGNsZWFyU2VsZWN0aW9uc0NhY2hlID0gcmVxdWlyZSgnLi4vY2FydGVzaWFuL3NlbGVjdCcpLmNsZWFyU2VsZWN0aW9uc0NhY2hlO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4uL2NhcnRlc2lhbi9jb25zdGFudHMnKTtcblxuZnVuY3Rpb24gVGVybmFyeShvcHRpb25zLCBmdWxsTGF5b3V0KSB7XG4gICAgdGhpcy5pZCA9IG9wdGlvbnMuaWQ7XG4gICAgdGhpcy5ncmFwaERpdiA9IG9wdGlvbnMuZ3JhcGhEaXY7XG4gICAgdGhpcy5pbml0KGZ1bGxMYXlvdXQpO1xuICAgIHRoaXMubWFrZUZyYW1ld29yayhmdWxsTGF5b3V0KTtcblxuICAgIC8vIHVuZm9ydHVuYXRlbHksIHdlIGhhdmUgdG8ga2VlcCB0cmFjayBvZiBzb21lIGF4aXMgdGljayBzZXR0aW5nc1xuICAgIC8vIGFzIHRlcm5hcnkgc3VicGxvdHMgZG8gbm90IGltcGxlbWVudCB0aGUgJ3RpY2tzJyBlZGl0VHlwZVxuICAgIHRoaXMuYVRpY2tMYXlvdXQgPSBudWxsO1xuICAgIHRoaXMuYlRpY2tMYXlvdXQgPSBudWxsO1xuICAgIHRoaXMuY1RpY2tMYXlvdXQgPSBudWxsO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFRlcm5hcnk7XG5cbnZhciBwcm90byA9IFRlcm5hcnkucHJvdG90eXBlO1xuXG5wcm90by5pbml0ID0gZnVuY3Rpb24oZnVsbExheW91dCkge1xuICAgIHRoaXMuY29udGFpbmVyID0gZnVsbExheW91dC5fdGVybmFyeWxheWVyO1xuICAgIHRoaXMuZGVmcyA9IGZ1bGxMYXlvdXQuX2RlZnM7XG4gICAgdGhpcy5sYXlvdXRJZCA9IGZ1bGxMYXlvdXQuX3VpZDtcbiAgICB0aGlzLnRyYWNlSGFzaCA9IHt9O1xuICAgIHRoaXMubGF5ZXJzID0ge307XG59O1xuXG5wcm90by5wbG90ID0gZnVuY3Rpb24odGVybmFyeUNhbGNEYXRhLCBmdWxsTGF5b3V0KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgdGVybmFyeUxheW91dCA9IGZ1bGxMYXlvdXRbX3RoaXMuaWRdO1xuICAgIHZhciBncmFwaFNpemUgPSBmdWxsTGF5b3V0Ll9zaXplO1xuXG4gICAgX3RoaXMuX2hhc0NsaXBPbkF4aXNGYWxzZSA9IGZhbHNlO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXJuYXJ5Q2FsY0RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYWNlID0gdGVybmFyeUNhbGNEYXRhW2ldWzBdLnRyYWNlO1xuXG4gICAgICAgIGlmKHRyYWNlLmNsaXBvbmF4aXMgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBfdGhpcy5faGFzQ2xpcE9uQXhpc0ZhbHNlID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgX3RoaXMudXBkYXRlTGF5ZXJzKHRlcm5hcnlMYXlvdXQpO1xuICAgIF90aGlzLmFkanVzdExheW91dCh0ZXJuYXJ5TGF5b3V0LCBncmFwaFNpemUpO1xuICAgIFBsb3RzLmdlbmVyYWxVcGRhdGVQZXJUcmFjZU1vZHVsZShfdGhpcy5ncmFwaERpdiwgX3RoaXMsIHRlcm5hcnlDYWxjRGF0YSwgdGVybmFyeUxheW91dCk7XG4gICAgX3RoaXMubGF5ZXJzLnBsb3RiZy5zZWxlY3QoJ3BhdGgnKS5jYWxsKENvbG9yLmZpbGwsIHRlcm5hcnlMYXlvdXQuYmdjb2xvcik7XG59O1xuXG5wcm90by5tYWtlRnJhbWV3b3JrID0gZnVuY3Rpb24oZnVsbExheW91dCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGdkID0gX3RoaXMuZ3JhcGhEaXY7XG4gICAgdmFyIHRlcm5hcnlMYXlvdXQgPSBmdWxsTGF5b3V0W190aGlzLmlkXTtcblxuICAgIHZhciBjbGlwSWQgPSBfdGhpcy5jbGlwSWQgPSAnY2xpcCcgKyBfdGhpcy5sYXlvdXRJZCArIF90aGlzLmlkO1xuICAgIHZhciBjbGlwSWRSZWxhdGl2ZSA9IF90aGlzLmNsaXBJZFJlbGF0aXZlID0gJ2NsaXAtcmVsYXRpdmUnICsgX3RoaXMubGF5b3V0SWQgKyBfdGhpcy5pZDtcblxuICAgIC8vIGNsaXBwYXRoIGZvciB0aGlzIHRlcm5hcnkgc3VicGxvdFxuICAgIF90aGlzLmNsaXBEZWYgPSBMaWIuZW5zdXJlU2luZ2xlQnlJZChmdWxsTGF5b3V0Ll9jbGlwcywgJ2NsaXBQYXRoJywgY2xpcElkLCBmdW5jdGlvbihzKSB7XG4gICAgICAgIHMuYXBwZW5kKCdwYXRoJykuYXR0cignZCcsICdNMCwwWicpO1xuICAgIH0pO1xuXG4gICAgLy8gJ3JlbGF0aXZlJyBjbGlwcGF0aCAoaS5lLiBubyB0cmFuc2xhdGlvbikgZm9yIHRoaXMgdGVybmFyeSBzdWJwbG90XG4gICAgX3RoaXMuY2xpcERlZlJlbGF0aXZlID0gTGliLmVuc3VyZVNpbmdsZUJ5SWQoZnVsbExheW91dC5fY2xpcHMsICdjbGlwUGF0aCcsIGNsaXBJZFJlbGF0aXZlLCBmdW5jdGlvbihzKSB7XG4gICAgICAgIHMuYXBwZW5kKCdwYXRoJykuYXR0cignZCcsICdNMCwwWicpO1xuICAgIH0pO1xuXG4gICAgLy8gY29udGFpbmVyIGZvciBldmVyeXRoaW5nIGluIHRoaXMgdGVybmFyeSBzdWJwbG90XG4gICAgX3RoaXMucGxvdENvbnRhaW5lciA9IExpYi5lbnN1cmVTaW5nbGUoX3RoaXMuY29udGFpbmVyLCAnZycsIF90aGlzLmlkKTtcbiAgICBfdGhpcy51cGRhdGVMYXllcnModGVybmFyeUxheW91dCk7XG5cbiAgICBEcmF3aW5nLnNldENsaXBVcmwoX3RoaXMubGF5ZXJzLmJhY2twbG90LCBjbGlwSWQsIGdkKTtcbiAgICBEcmF3aW5nLnNldENsaXBVcmwoX3RoaXMubGF5ZXJzLmdyaWRzLCBjbGlwSWQsIGdkKTtcbn07XG5cbnByb3RvLnVwZGF0ZUxheWVycyA9IGZ1bmN0aW9uKHRlcm5hcnlMYXlvdXQpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBsYXllcnMgPSBfdGhpcy5sYXllcnM7XG5cbiAgICAvLyBpbnNpZGUgdGhhdCBjb250YWluZXIsIHdlIGhhdmUgb25lIGNvbnRhaW5lciBmb3IgdGhlIGRhdGEsIGFuZFxuICAgIC8vIG9uZSBlYWNoIGZvciB0aGUgdGhyZWUgYXhlcyBhcm91bmQgaXQuXG5cbiAgICB2YXIgcGxvdExheWVycyA9IFsnZHJhZ2xheWVyJywgJ3Bsb3RiZycsICdiYWNrcGxvdCcsICdncmlkcyddO1xuXG4gICAgaWYodGVybmFyeUxheW91dC5hYXhpcy5sYXllciA9PT0gJ2JlbG93IHRyYWNlcycpIHtcbiAgICAgICAgcGxvdExheWVycy5wdXNoKCdhYXhpcycsICdhbGluZScpO1xuICAgIH1cbiAgICBpZih0ZXJuYXJ5TGF5b3V0LmJheGlzLmxheWVyID09PSAnYmVsb3cgdHJhY2VzJykge1xuICAgICAgICBwbG90TGF5ZXJzLnB1c2goJ2JheGlzJywgJ2JsaW5lJyk7XG4gICAgfVxuICAgIGlmKHRlcm5hcnlMYXlvdXQuY2F4aXMubGF5ZXIgPT09ICdiZWxvdyB0cmFjZXMnKSB7XG4gICAgICAgIHBsb3RMYXllcnMucHVzaCgnY2F4aXMnLCAnY2xpbmUnKTtcbiAgICB9XG5cbiAgICBwbG90TGF5ZXJzLnB1c2goJ2Zyb250cGxvdCcpO1xuXG4gICAgaWYodGVybmFyeUxheW91dC5hYXhpcy5sYXllciA9PT0gJ2Fib3ZlIHRyYWNlcycpIHtcbiAgICAgICAgcGxvdExheWVycy5wdXNoKCdhYXhpcycsICdhbGluZScpO1xuICAgIH1cbiAgICBpZih0ZXJuYXJ5TGF5b3V0LmJheGlzLmxheWVyID09PSAnYWJvdmUgdHJhY2VzJykge1xuICAgICAgICBwbG90TGF5ZXJzLnB1c2goJ2JheGlzJywgJ2JsaW5lJyk7XG4gICAgfVxuICAgIGlmKHRlcm5hcnlMYXlvdXQuY2F4aXMubGF5ZXIgPT09ICdhYm92ZSB0cmFjZXMnKSB7XG4gICAgICAgIHBsb3RMYXllcnMucHVzaCgnY2F4aXMnLCAnY2xpbmUnKTtcbiAgICB9XG5cbiAgICB2YXIgdG9wbGV2ZWwgPSBfdGhpcy5wbG90Q29udGFpbmVyLnNlbGVjdEFsbCgnZy50b3BsZXZlbCcpXG4gICAgICAgIC5kYXRhKHBsb3RMYXllcnMsIFN0cmluZyk7XG5cbiAgICB2YXIgZ3JpZHMgPSBbJ2FncmlkJywgJ2JncmlkJywgJ2NncmlkJ107XG5cbiAgICB0b3BsZXZlbC5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuICd0b3BsZXZlbCAnICsgZDsgfSlcbiAgICAgICAgLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHMgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICBsYXllcnNbZF0gPSBzO1xuXG4gICAgICAgICAgICAvLyBjb250YWluZXJzIGZvciBkaWZmZXJlbnQgdHJhY2UgdHlwZXMuXG4gICAgICAgICAgICAvLyBOT1RFIC0gdGhpcyBpcyBkaWZmZXJlbnQgZnJvbSBjYXJ0ZXNpYW4sIHdoZXJlIGFsbCB0cmFjZXNcbiAgICAgICAgICAgIC8vIGFyZSBpbiBmcm9udCBvZiBncmlkcy4gSGVyZSBJJ20gcHV0dGluZyBtYXBzIGJlaGluZCB0aGUgZ3JpZHNcbiAgICAgICAgICAgIC8vIHNvIHRoZSBncmlkcyB3aWxsIGFsd2F5cyBiZSB2aXNpYmxlIGlmIHRoZXkncmUgcmVxdWVzdGVkLlxuICAgICAgICAgICAgLy8gUGVyaGFwcyB3ZSB3YW50IHRoYXQgZm9yIGNhcnRlc2lhbiB0b28/XG4gICAgICAgICAgICBpZihkID09PSAnZnJvbnRwbG90Jykge1xuICAgICAgICAgICAgICAgIHMuYXBwZW5kKCdnJykuY2xhc3NlZCgnc2NhdHRlcmxheWVyJywgdHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoZCA9PT0gJ2JhY2twbG90Jykge1xuICAgICAgICAgICAgICAgIHMuYXBwZW5kKCdnJykuY2xhc3NlZCgnbWFwbGF5ZXInLCB0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihkID09PSAncGxvdGJnJykge1xuICAgICAgICAgICAgICAgIHMuYXBwZW5kKCdwYXRoJykuYXR0cignZCcsICdNMCwwWicpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGQgPT09ICdhbGluZScgfHwgZCA9PT0gJ2JsaW5lJyB8fCBkID09PSAnY2xpbmUnKSB7XG4gICAgICAgICAgICAgICAgcy5hcHBlbmQoJ3BhdGgnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihkID09PSAnZ3JpZHMnKSB7XG4gICAgICAgICAgICAgICAgZ3JpZHMuZm9yRWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyc1tkXSA9IHMuYXBwZW5kKCdnJykuY2xhc3NlZCgnZ3JpZCAnICsgZCwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgdG9wbGV2ZWwub3JkZXIoKTtcbn07XG5cbnZhciB3aFJhdGlvID0gTWF0aC5zcXJ0KDQgLyAzKTtcblxucHJvdG8uYWRqdXN0TGF5b3V0ID0gZnVuY3Rpb24odGVybmFyeUxheW91dCwgZ3JhcGhTaXplKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZG9tYWluID0gdGVybmFyeUxheW91dC5kb21haW47XG4gICAgdmFyIHhEb21haW5DZW50ZXIgPSAoZG9tYWluLnhbMF0gKyBkb21haW4ueFsxXSkgLyAyO1xuICAgIHZhciB5RG9tYWluQ2VudGVyID0gKGRvbWFpbi55WzBdICsgZG9tYWluLnlbMV0pIC8gMjtcbiAgICB2YXIgeERvbWFpbiA9IGRvbWFpbi54WzFdIC0gZG9tYWluLnhbMF07XG4gICAgdmFyIHlEb21haW4gPSBkb21haW4ueVsxXSAtIGRvbWFpbi55WzBdO1xuICAgIHZhciB3bWF4ID0geERvbWFpbiAqIGdyYXBoU2l6ZS53O1xuICAgIHZhciBobWF4ID0geURvbWFpbiAqIGdyYXBoU2l6ZS5oO1xuICAgIHZhciBzdW0gPSB0ZXJuYXJ5TGF5b3V0LnN1bTtcbiAgICB2YXIgYW1pbiA9IHRlcm5hcnlMYXlvdXQuYWF4aXMubWluO1xuICAgIHZhciBibWluID0gdGVybmFyeUxheW91dC5iYXhpcy5taW47XG4gICAgdmFyIGNtaW4gPSB0ZXJuYXJ5TGF5b3V0LmNheGlzLm1pbjtcblxuICAgIHZhciB4MCwgeTAsIHcsIGgsIHhEb21haW5GaW5hbCwgeURvbWFpbkZpbmFsO1xuXG4gICAgaWYod21heCA+IHdoUmF0aW8gKiBobWF4KSB7XG4gICAgICAgIGggPSBobWF4O1xuICAgICAgICB3ID0gaCAqIHdoUmF0aW87XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdyA9IHdtYXg7XG4gICAgICAgIGggPSB3IC8gd2hSYXRpbztcbiAgICB9XG5cbiAgICB4RG9tYWluRmluYWwgPSB4RG9tYWluICogdyAvIHdtYXg7XG4gICAgeURvbWFpbkZpbmFsID0geURvbWFpbiAqIGggLyBobWF4O1xuXG4gICAgeDAgPSBncmFwaFNpemUubCArIGdyYXBoU2l6ZS53ICogeERvbWFpbkNlbnRlciAtIHcgLyAyO1xuICAgIHkwID0gZ3JhcGhTaXplLnQgKyBncmFwaFNpemUuaCAqICgxIC0geURvbWFpbkNlbnRlcikgLSBoIC8gMjtcblxuICAgIF90aGlzLngwID0geDA7XG4gICAgX3RoaXMueTAgPSB5MDtcbiAgICBfdGhpcy53ID0gdztcbiAgICBfdGhpcy5oID0gaDtcbiAgICBfdGhpcy5zdW0gPSBzdW07XG5cbiAgICAvLyBzZXQgdXAgdGhlIHggYW5kIHkgYXhpcyBvYmplY3RzIHdlJ2xsIHVzZSB0byBsYXkgb3V0IHRoZSBwb2ludHNcbiAgICBfdGhpcy54YXhpcyA9IHtcbiAgICAgICAgdHlwZTogJ2xpbmVhcicsXG4gICAgICAgIHJhbmdlOiBbYW1pbiArIDIgKiBjbWluIC0gc3VtLCBzdW0gLSBhbWluIC0gMiAqIGJtaW5dLFxuICAgICAgICBkb21haW46IFtcbiAgICAgICAgICAgIHhEb21haW5DZW50ZXIgLSB4RG9tYWluRmluYWwgLyAyLFxuICAgICAgICAgICAgeERvbWFpbkNlbnRlciArIHhEb21haW5GaW5hbCAvIDJcbiAgICAgICAgXSxcbiAgICAgICAgX2lkOiAneCdcbiAgICB9O1xuICAgIHNldENvbnZlcnQoX3RoaXMueGF4aXMsIF90aGlzLmdyYXBoRGl2Ll9mdWxsTGF5b3V0KTtcbiAgICBfdGhpcy54YXhpcy5zZXRTY2FsZSgpO1xuICAgIF90aGlzLnhheGlzLmlzUHRXaXRoaW5SYW5nZSA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIGQuYSA+PSBfdGhpcy5hYXhpcy5yYW5nZVswXSAmJlxuICAgICAgICAgICAgZC5hIDw9IF90aGlzLmFheGlzLnJhbmdlWzFdICYmXG4gICAgICAgICAgICBkLmIgPj0gX3RoaXMuYmF4aXMucmFuZ2VbMV0gJiZcbiAgICAgICAgICAgIGQuYiA8PSBfdGhpcy5iYXhpcy5yYW5nZVswXSAmJlxuICAgICAgICAgICAgZC5jID49IF90aGlzLmNheGlzLnJhbmdlWzFdICYmXG4gICAgICAgICAgICBkLmMgPD0gX3RoaXMuY2F4aXMucmFuZ2VbMF1cbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgX3RoaXMueWF4aXMgPSB7XG4gICAgICAgIHR5cGU6ICdsaW5lYXInLFxuICAgICAgICByYW5nZTogW2FtaW4sIHN1bSAtIGJtaW4gLSBjbWluXSxcbiAgICAgICAgZG9tYWluOiBbXG4gICAgICAgICAgICB5RG9tYWluQ2VudGVyIC0geURvbWFpbkZpbmFsIC8gMixcbiAgICAgICAgICAgIHlEb21haW5DZW50ZXIgKyB5RG9tYWluRmluYWwgLyAyXG4gICAgICAgIF0sXG4gICAgICAgIF9pZDogJ3knXG4gICAgfTtcbiAgICBzZXRDb252ZXJ0KF90aGlzLnlheGlzLCBfdGhpcy5ncmFwaERpdi5fZnVsbExheW91dCk7XG4gICAgX3RoaXMueWF4aXMuc2V0U2NhbGUoKTtcbiAgICBfdGhpcy55YXhpcy5pc1B0V2l0aGluUmFuZ2UgPSBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH07XG5cbiAgICAvLyBzZXQgdXAgdGhlIG1vZGlmaWVkIGF4ZXMgZm9yIHRpY2sgZHJhd2luZ1xuICAgIHZhciB5RG9tYWluMCA9IF90aGlzLnlheGlzLmRvbWFpblswXTtcblxuICAgIC8vIGFheGlzIGdvZXMgdXAgdGhlIGxlZnQgc2lkZS4gU2V0IGl0IHVwIGFzIGEgeSBheGlzLCBidXQgd2l0aFxuICAgIC8vIGZpY3RpdGlvdXMgYW5nbGVzIGFuZCBkb21haW4sIGJ1dCB0aGVuIHJvdGF0ZSBhbmQgdHJhbnNsYXRlXG4gICAgLy8gaXQgaW50byBwbGFjZSBhdCB0aGUgZW5kXG4gICAgdmFyIGFheGlzID0gX3RoaXMuYWF4aXMgPSBleHRlbmRGbGF0KHt9LCB0ZXJuYXJ5TGF5b3V0LmFheGlzLCB7XG4gICAgICAgIHJhbmdlOiBbYW1pbiwgc3VtIC0gYm1pbiAtIGNtaW5dLFxuICAgICAgICBzaWRlOiAnbGVmdCcsXG4gICAgICAgIC8vIHRpY2thbmdsZSA9ICdhdXRvJyBtZWFucyAwIGFueXdheSBmb3IgYSB5IGF4aXMsIG5lZWQgdG8gY29lcmNlIHRvIDAgaGVyZVxuICAgICAgICAvLyBzbyB3ZSBjYW4gc2hpZnQgYnkgMzAuXG4gICAgICAgIHRpY2thbmdsZTogKCt0ZXJuYXJ5TGF5b3V0LmFheGlzLnRpY2thbmdsZSB8fCAwKSAtIDMwLFxuICAgICAgICBkb21haW46IFt5RG9tYWluMCwgeURvbWFpbjAgKyB5RG9tYWluRmluYWwgKiB3aFJhdGlvXSxcbiAgICAgICAgYW5jaG9yOiAnZnJlZScsXG4gICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICBfaWQ6ICd5JyxcbiAgICAgICAgX2xlbmd0aDogd1xuICAgIH0pO1xuICAgIHNldENvbnZlcnQoYWF4aXMsIF90aGlzLmdyYXBoRGl2Ll9mdWxsTGF5b3V0KTtcbiAgICBhYXhpcy5zZXRTY2FsZSgpO1xuXG4gICAgLy8gYmF4aXMgZ29lcyBhY3Jvc3MgdGhlIGJvdHRvbSAoYmFja3dhcmQpLiBXZSBjYW4gc2V0IGl0IHVwIGFzIGFuIHggYXhpc1xuICAgIC8vIHdpdGhvdXQgYW55IGVuY2xvc2luZyB0cmFuc2Zvcm1hdGlvbi5cbiAgICB2YXIgYmF4aXMgPSBfdGhpcy5iYXhpcyA9IGV4dGVuZEZsYXQoe30sIHRlcm5hcnlMYXlvdXQuYmF4aXMsIHtcbiAgICAgICAgcmFuZ2U6IFtzdW0gLSBhbWluIC0gY21pbiwgYm1pbl0sXG4gICAgICAgIHNpZGU6ICdib3R0b20nLFxuICAgICAgICBkb21haW46IF90aGlzLnhheGlzLmRvbWFpbixcbiAgICAgICAgYW5jaG9yOiAnZnJlZScsXG4gICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICBfaWQ6ICd4JyxcbiAgICAgICAgX2xlbmd0aDogd1xuICAgIH0pO1xuICAgIHNldENvbnZlcnQoYmF4aXMsIF90aGlzLmdyYXBoRGl2Ll9mdWxsTGF5b3V0KTtcbiAgICBiYXhpcy5zZXRTY2FsZSgpO1xuXG4gICAgLy8gY2F4aXMgZ29lcyBkb3duIHRoZSByaWdodCBzaWRlLiBTZXQgaXQgdXAgYXMgYSB5IGF4aXMsIHdpdGhcbiAgICAvLyBwb3N0LXRyYW5zZm9ybWF0aW9uIHNpbWlsYXIgdG8gYWF4aXNcbiAgICB2YXIgY2F4aXMgPSBfdGhpcy5jYXhpcyA9IGV4dGVuZEZsYXQoe30sIHRlcm5hcnlMYXlvdXQuY2F4aXMsIHtcbiAgICAgICAgcmFuZ2U6IFtzdW0gLSBhbWluIC0gYm1pbiwgY21pbl0sXG4gICAgICAgIHNpZGU6ICdyaWdodCcsXG4gICAgICAgIHRpY2thbmdsZTogKCt0ZXJuYXJ5TGF5b3V0LmNheGlzLnRpY2thbmdsZSB8fCAwKSArIDMwLFxuICAgICAgICBkb21haW46IFt5RG9tYWluMCwgeURvbWFpbjAgKyB5RG9tYWluRmluYWwgKiB3aFJhdGlvXSxcbiAgICAgICAgYW5jaG9yOiAnZnJlZScsXG4gICAgICAgIHBvc2l0aW9uOiAwLFxuICAgICAgICBfaWQ6ICd5JyxcbiAgICAgICAgX2xlbmd0aDogd1xuICAgIH0pO1xuICAgIHNldENvbnZlcnQoY2F4aXMsIF90aGlzLmdyYXBoRGl2Ll9mdWxsTGF5b3V0KTtcbiAgICBjYXhpcy5zZXRTY2FsZSgpO1xuXG4gICAgdmFyIHRyaWFuZ2xlQ2xpcCA9ICdNJyArIHgwICsgJywnICsgKHkwICsgaCkgKyAnaCcgKyB3ICsgJ2wtJyArICh3IC8gMikgKyAnLC0nICsgaCArICdaJztcbiAgICBfdGhpcy5jbGlwRGVmLnNlbGVjdCgncGF0aCcpLmF0dHIoJ2QnLCB0cmlhbmdsZUNsaXApO1xuICAgIF90aGlzLmxheWVycy5wbG90Ymcuc2VsZWN0KCdwYXRoJykuYXR0cignZCcsIHRyaWFuZ2xlQ2xpcCk7XG5cbiAgICB2YXIgdHJpYW5nbGVDbGlwUmVsYXRpdmUgPSAnTTAsJyArIGggKyAnaCcgKyB3ICsgJ2wtJyArICh3IC8gMikgKyAnLC0nICsgaCArICdaJztcbiAgICBfdGhpcy5jbGlwRGVmUmVsYXRpdmUuc2VsZWN0KCdwYXRoJykuYXR0cignZCcsIHRyaWFuZ2xlQ2xpcFJlbGF0aXZlKTtcblxuICAgIHZhciBwbG90VHJhbnNmb3JtID0gJ3RyYW5zbGF0ZSgnICsgeDAgKyAnLCcgKyB5MCArICcpJztcbiAgICBfdGhpcy5wbG90Q29udGFpbmVyLnNlbGVjdEFsbCgnLnNjYXR0ZXJsYXllciwubWFwbGF5ZXInKVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgcGxvdFRyYW5zZm9ybSk7XG5cbiAgICBfdGhpcy5jbGlwRGVmUmVsYXRpdmUuc2VsZWN0KCdwYXRoJykuYXR0cigndHJhbnNmb3JtJywgbnVsbCk7XG5cbiAgICAvLyBUT0RPOiBzaGlmdCBheGVzIHRvIGFjY29tbW9kYXRlIGxpbmV3aWR0aCpzaW4oMzApIHRpY2sgbWFyayBhbmdsZVxuXG4gICAgLy8gVE9ETzogdGhlcmUncyBwcm9iYWJseSBhbiBlYXNpZXIgd2F5IHRvIGhhbmRsZSB0aGVzZSB0cmFuc2xhdGlvbnMvb2Zmc2V0cyBub3cuLi5cbiAgICB2YXIgYlRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArICh4MCAtIGJheGlzLl9vZmZzZXQpICsgJywnICsgKHkwICsgaCkgKyAnKSc7XG5cbiAgICBfdGhpcy5sYXllcnMuYmF4aXMuYXR0cigndHJhbnNmb3JtJywgYlRyYW5zZm9ybSk7XG4gICAgX3RoaXMubGF5ZXJzLmJncmlkLmF0dHIoJ3RyYW5zZm9ybScsIGJUcmFuc2Zvcm0pO1xuXG4gICAgdmFyIGFUcmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAoeDAgKyB3IC8gMikgKyAnLCcgKyB5MCArXG4gICAgICAgICcpcm90YXRlKDMwKXRyYW5zbGF0ZSgwLCcgKyAtYWF4aXMuX29mZnNldCArICcpJztcbiAgICBfdGhpcy5sYXllcnMuYWF4aXMuYXR0cigndHJhbnNmb3JtJywgYVRyYW5zZm9ybSk7XG4gICAgX3RoaXMubGF5ZXJzLmFncmlkLmF0dHIoJ3RyYW5zZm9ybScsIGFUcmFuc2Zvcm0pO1xuXG4gICAgdmFyIGNUcmFuc2Zvcm0gPSAndHJhbnNsYXRlKCcgKyAoeDAgKyB3IC8gMikgKyAnLCcgKyB5MCArXG4gICAgICAgICcpcm90YXRlKC0zMCl0cmFuc2xhdGUoMCwnICsgLWNheGlzLl9vZmZzZXQgKyAnKSc7XG4gICAgX3RoaXMubGF5ZXJzLmNheGlzLmF0dHIoJ3RyYW5zZm9ybScsIGNUcmFuc2Zvcm0pO1xuICAgIF90aGlzLmxheWVycy5jZ3JpZC5hdHRyKCd0cmFuc2Zvcm0nLCBjVHJhbnNmb3JtKTtcblxuICAgIF90aGlzLmRyYXdBeGVzKHRydWUpO1xuXG4gICAgX3RoaXMubGF5ZXJzLmFsaW5lLnNlbGVjdCgncGF0aCcpXG4gICAgICAgIC5hdHRyKCdkJywgYWF4aXMuc2hvd2xpbmUgP1xuICAgICAgICAgICAgJ00nICsgeDAgKyAnLCcgKyAoeTAgKyBoKSArICdsJyArICh3IC8gMikgKyAnLC0nICsgaCA6ICdNMCwwJylcbiAgICAgICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCBhYXhpcy5saW5lY29sb3IgfHwgJyMwMDAnKVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIChhYXhpcy5saW5ld2lkdGggfHwgMCkgKyAncHgnKTtcbiAgICBfdGhpcy5sYXllcnMuYmxpbmUuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgLmF0dHIoJ2QnLCBiYXhpcy5zaG93bGluZSA/XG4gICAgICAgICAgICAnTScgKyB4MCArICcsJyArICh5MCArIGgpICsgJ2gnICsgdyA6ICdNMCwwJylcbiAgICAgICAgLmNhbGwoQ29sb3Iuc3Ryb2tlLCBiYXhpcy5saW5lY29sb3IgfHwgJyMwMDAnKVxuICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIChiYXhpcy5saW5ld2lkdGggfHwgMCkgKyAncHgnKTtcbiAgICBfdGhpcy5sYXllcnMuY2xpbmUuc2VsZWN0KCdwYXRoJylcbiAgICAgICAgLmF0dHIoJ2QnLCBjYXhpcy5zaG93bGluZSA/XG4gICAgICAgICAgICAnTScgKyAoeDAgKyB3IC8gMikgKyAnLCcgKyB5MCArICdsJyArICh3IC8gMikgKyAnLCcgKyBoIDogJ00wLDAnKVxuICAgICAgICAuY2FsbChDb2xvci5zdHJva2UsIGNheGlzLmxpbmVjb2xvciB8fCAnIzAwMCcpXG4gICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgKGNheGlzLmxpbmV3aWR0aCB8fCAwKSArICdweCcpO1xuXG4gICAgaWYoIV90aGlzLmdyYXBoRGl2Ll9jb250ZXh0LnN0YXRpY1Bsb3QpIHtcbiAgICAgICAgX3RoaXMuaW5pdEludGVyYWN0aW9ucygpO1xuICAgIH1cblxuICAgIERyYXdpbmcuc2V0Q2xpcFVybChcbiAgICAgICAgX3RoaXMubGF5ZXJzLmZyb250cGxvdCxcbiAgICAgICAgX3RoaXMuX2hhc0NsaXBPbkF4aXNGYWxzZSA/IG51bGwgOiBfdGhpcy5jbGlwSWQsXG4gICAgICAgIF90aGlzLmdyYXBoRGl2XG4gICAgKTtcbn07XG5cbnByb3RvLmRyYXdBeGVzID0gZnVuY3Rpb24oZG9UaXRsZXMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBnZCA9IF90aGlzLmdyYXBoRGl2O1xuICAgIHZhciB0aXRsZXN1ZmZpeCA9IF90aGlzLmlkLnN1YnN0cig3KSArICd0aXRsZSc7XG4gICAgdmFyIGxheWVycyA9IF90aGlzLmxheWVycztcbiAgICB2YXIgYWF4aXMgPSBfdGhpcy5hYXhpcztcbiAgICB2YXIgYmF4aXMgPSBfdGhpcy5iYXhpcztcbiAgICB2YXIgY2F4aXMgPSBfdGhpcy5jYXhpcztcblxuICAgIF90aGlzLmRyYXdBeChhYXhpcyk7XG4gICAgX3RoaXMuZHJhd0F4KGJheGlzKTtcbiAgICBfdGhpcy5kcmF3QXgoY2F4aXMpO1xuXG4gICAgaWYoZG9UaXRsZXMpIHtcbiAgICAgICAgdmFyIGFwYWQgPSBNYXRoLm1heChhYXhpcy5zaG93dGlja2xhYmVscyA/IGFheGlzLnRpY2tmb250LnNpemUgLyAyIDogMCxcbiAgICAgICAgICAgIChjYXhpcy5zaG93dGlja2xhYmVscyA/IGNheGlzLnRpY2tmb250LnNpemUgKiAwLjc1IDogMCkgK1xuICAgICAgICAgICAgKGNheGlzLnRpY2tzID09PSAnb3V0c2lkZScgPyBjYXhpcy50aWNrbGVuICogMC44NyA6IDApKTtcbiAgICAgICAgdmFyIGJwYWQgPSAoYmF4aXMuc2hvd3RpY2tsYWJlbHMgPyBiYXhpcy50aWNrZm9udC5zaXplIDogMCkgK1xuICAgICAgICAgICAgKGJheGlzLnRpY2tzID09PSAnb3V0c2lkZScgPyBiYXhpcy50aWNrbGVuIDogMCkgKyAzO1xuXG4gICAgICAgIGxheWVyc1snYS10aXRsZSddID0gVGl0bGVzLmRyYXcoZ2QsICdhJyArIHRpdGxlc3VmZml4LCB7XG4gICAgICAgICAgICBwcm9wQ29udGFpbmVyOiBhYXhpcyxcbiAgICAgICAgICAgIHByb3BOYW1lOiBfdGhpcy5pZCArICcuYWF4aXMudGl0bGUnLFxuICAgICAgICAgICAgcGxhY2Vob2xkZXI6IF8oZ2QsICdDbGljayB0byBlbnRlciBDb21wb25lbnQgQSB0aXRsZScpLFxuICAgICAgICAgICAgYXR0cmlidXRlczoge1xuICAgICAgICAgICAgICAgIHg6IF90aGlzLngwICsgX3RoaXMudyAvIDIsXG4gICAgICAgICAgICAgICAgeTogX3RoaXMueTAgLSBhYXhpcy50aXRsZS5mb250LnNpemUgLyAzIC0gYXBhZCxcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbWlkZGxlJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgbGF5ZXJzWydiLXRpdGxlJ10gPSBUaXRsZXMuZHJhdyhnZCwgJ2InICsgdGl0bGVzdWZmaXgsIHtcbiAgICAgICAgICAgIHByb3BDb250YWluZXI6IGJheGlzLFxuICAgICAgICAgICAgcHJvcE5hbWU6IF90aGlzLmlkICsgJy5iYXhpcy50aXRsZScsXG4gICAgICAgICAgICBwbGFjZWhvbGRlcjogXyhnZCwgJ0NsaWNrIHRvIGVudGVyIENvbXBvbmVudCBCIHRpdGxlJyksXG4gICAgICAgICAgICBhdHRyaWJ1dGVzOiB7XG4gICAgICAgICAgICAgICAgeDogX3RoaXMueDAgLSBicGFkLFxuICAgICAgICAgICAgICAgIHk6IF90aGlzLnkwICsgX3RoaXMuaCArIGJheGlzLnRpdGxlLmZvbnQuc2l6ZSAqIDAuODMgKyBicGFkLFxuICAgICAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBsYXllcnNbJ2MtdGl0bGUnXSA9IFRpdGxlcy5kcmF3KGdkLCAnYycgKyB0aXRsZXN1ZmZpeCwge1xuICAgICAgICAgICAgcHJvcENvbnRhaW5lcjogY2F4aXMsXG4gICAgICAgICAgICBwcm9wTmFtZTogX3RoaXMuaWQgKyAnLmNheGlzLnRpdGxlJyxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBfKGdkLCAnQ2xpY2sgdG8gZW50ZXIgQ29tcG9uZW50IEMgdGl0bGUnKSxcbiAgICAgICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICB4OiBfdGhpcy54MCArIF90aGlzLncgKyBicGFkLFxuICAgICAgICAgICAgICAgIHk6IF90aGlzLnkwICsgX3RoaXMuaCArIGNheGlzLnRpdGxlLmZvbnQuc2l6ZSAqIDAuODMgKyBicGFkLFxuICAgICAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6ICdtaWRkbGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5cbnByb3RvLmRyYXdBeCA9IGZ1bmN0aW9uKGF4KSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2QgPSBfdGhpcy5ncmFwaERpdjtcbiAgICB2YXIgYXhOYW1lID0gYXguX25hbWU7XG4gICAgdmFyIGF4TGV0dGVyID0gYXhOYW1lLmNoYXJBdCgwKTtcbiAgICB2YXIgYXhJZCA9IGF4Ll9pZDtcbiAgICB2YXIgYXhMYXllciA9IF90aGlzLmxheWVyc1theE5hbWVdO1xuICAgIHZhciBjb3VudGVyQW5nbGUgPSAzMDtcblxuICAgIHZhciBzdGFzaEtleSA9IGF4TGV0dGVyICsgJ3RpY2tMYXlvdXQnO1xuICAgIHZhciBuZXdUaWNrTGF5b3V0ID0gc3RyVGlja0xheW91dChheCk7XG4gICAgaWYoX3RoaXNbc3Rhc2hLZXldICE9PSBuZXdUaWNrTGF5b3V0KSB7XG4gICAgICAgIGF4TGF5ZXIuc2VsZWN0QWxsKCcuJyArIGF4SWQgKyAndGljaycpLnJlbW92ZSgpO1xuICAgICAgICBfdGhpc1tzdGFzaEtleV0gPSBuZXdUaWNrTGF5b3V0O1xuICAgIH1cblxuICAgIGF4LnNldFNjYWxlKCk7XG5cbiAgICB2YXIgdmFscyA9IEF4ZXMuY2FsY1RpY2tzKGF4KTtcbiAgICB2YXIgdmFsc0NsaXBwZWQgPSBBeGVzLmNsaXBFbmRzKGF4LCB2YWxzKTtcbiAgICB2YXIgdHJhbnNGbiA9IEF4ZXMubWFrZVRyYW5zRm4oYXgpO1xuICAgIHZhciB0aWNrU2lnbiA9IEF4ZXMuZ2V0VGlja1NpZ25zKGF4KVsyXTtcblxuICAgIHZhciBjYVJhZCA9IExpYi5kZWcycmFkKGNvdW50ZXJBbmdsZSk7XG4gICAgdmFyIHBhZCA9IHRpY2tTaWduICogKGF4LmxpbmV3aWR0aCB8fCAxKSAvIDI7XG4gICAgdmFyIGxlbiA9IHRpY2tTaWduICogYXgudGlja2xlbjtcbiAgICB2YXIgdyA9IF90aGlzLnc7XG4gICAgdmFyIGggPSBfdGhpcy5oO1xuXG4gICAgdmFyIHRpY2tQYXRoID0gYXhMZXR0ZXIgPT09ICdiJyA/XG4gICAgICAgICdNMCwnICsgcGFkICsgJ2wnICsgKE1hdGguc2luKGNhUmFkKSAqIGxlbikgKyAnLCcgKyAoTWF0aC5jb3MoY2FSYWQpICogbGVuKSA6XG4gICAgICAgICdNJyArIHBhZCArICcsMGwnICsgKE1hdGguY29zKGNhUmFkKSAqIGxlbikgKyAnLCcgKyAoLU1hdGguc2luKGNhUmFkKSAqIGxlbik7XG5cbiAgICB2YXIgZ3JpZFBhdGggPSB7XG4gICAgICAgIGE6ICdNMCwwbCcgKyBoICsgJywtJyArICh3IC8gMiksXG4gICAgICAgIGI6ICdNMCwwbC0nICsgKHcgLyAyKSArICcsLScgKyBoLFxuICAgICAgICBjOiAnTTAsMGwtJyArIGggKyAnLCcgKyAodyAvIDIpXG4gICAgfVtheExldHRlcl07XG5cbiAgICBBeGVzLmRyYXdUaWNrcyhnZCwgYXgsIHtcbiAgICAgICAgdmFsczogYXgudGlja3MgPT09ICdpbnNpZGUnID8gdmFsc0NsaXBwZWQgOiB2YWxzLFxuICAgICAgICBsYXllcjogYXhMYXllcixcbiAgICAgICAgcGF0aDogdGlja1BhdGgsXG4gICAgICAgIHRyYW5zRm46IHRyYW5zRm4sXG4gICAgICAgIGNyaXNwOiBmYWxzZVxuICAgIH0pO1xuXG4gICAgQXhlcy5kcmF3R3JpZChnZCwgYXgsIHtcbiAgICAgICAgdmFsczogdmFsc0NsaXBwZWQsXG4gICAgICAgIGxheWVyOiBfdGhpcy5sYXllcnNbYXhMZXR0ZXIgKyAnZ3JpZCddLFxuICAgICAgICBwYXRoOiBncmlkUGF0aCxcbiAgICAgICAgdHJhbnNGbjogdHJhbnNGbixcbiAgICAgICAgY3Jpc3A6IGZhbHNlXG4gICAgfSk7XG5cbiAgICBBeGVzLmRyYXdMYWJlbHMoZ2QsIGF4LCB7XG4gICAgICAgIHZhbHM6IHZhbHMsXG4gICAgICAgIGxheWVyOiBheExheWVyLFxuICAgICAgICB0cmFuc0ZuOiB0cmFuc0ZuLFxuICAgICAgICBsYWJlbEZuczogQXhlcy5tYWtlTGFiZWxGbnMoYXgsIDAsIGNvdW50ZXJBbmdsZSlcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHN0clRpY2tMYXlvdXQoYXhMYXlvdXQpIHtcbiAgICByZXR1cm4gYXhMYXlvdXQudGlja3MgKyBTdHJpbmcoYXhMYXlvdXQudGlja2xlbikgKyBTdHJpbmcoYXhMYXlvdXQuc2hvd3RpY2tsYWJlbHMpO1xufVxuXG4vLyBoYXJkIGNvZGVkIHBhdGhzIGZvciB6b29tIGNvcm5lcnNcbi8vIHVzZXMgdGhlIHNhbWUgc2l6aW5nIGFzIGNhcnRlc2lhbiwgbGVuZ3RoIGlzIE1JTlpPT00vMiwgd2lkdGggaXMgM3B4XG52YXIgQ0xFTiA9IGNvbnN0YW50cy5NSU5aT09NIC8gMiArIDAuODc7XG52YXIgQkxQQVRIID0gJ20tMC44NywuNWgnICsgQ0xFTiArICd2M2gtJyArIChDTEVOICsgNS4yKSArXG4gICAgJ2wnICsgKENMRU4gLyAyICsgMi42KSArICcsLScgKyAoQ0xFTiAqIDAuODcgKyA0LjUpICtcbiAgICAnbDIuNiwxLjVsLScgKyAoQ0xFTiAvIDIpICsgJywnICsgKENMRU4gKiAwLjg3KSArICdaJztcbnZhciBCUlBBVEggPSAnbTAuODcsLjVoLScgKyBDTEVOICsgJ3YzaCcgKyAoQ0xFTiArIDUuMikgK1xuICAgICdsLScgKyAoQ0xFTiAvIDIgKyAyLjYpICsgJywtJyArIChDTEVOICogMC44NyArIDQuNSkgK1xuICAgICdsLTIuNiwxLjVsJyArIChDTEVOIC8gMikgKyAnLCcgKyAoQ0xFTiAqIDAuODcpICsgJ1onO1xudmFyIFRPUFBBVEggPSAnbTAsMWwnICsgKENMRU4gLyAyKSArICcsJyArIChDTEVOICogMC44NykgK1xuICAgICdsMi42LC0xLjVsLScgKyAoQ0xFTiAvIDIgKyAyLjYpICsgJywtJyArIChDTEVOICogMC44NyArIDQuNSkgK1xuICAgICdsLScgKyAoQ0xFTiAvIDIgKyAyLjYpICsgJywnICsgKENMRU4gKiAwLjg3ICsgNC41KSArXG4gICAgJ2wyLjYsMS41bCcgKyAoQ0xFTiAvIDIpICsgJywtJyArIChDTEVOICogMC44NykgKyAnWic7XG52YXIgU1RBUlRNQVJLRVIgPSAnbTAuNSwwLjVoNXYtMmgtNXYtNWgtMnY1aC01djJoNXY1aDJaJztcblxuLy8gSSBndWVzcyB0aGlzIGNvdWxkIGJlIHNoYXJlZCB3aXRoIGNhcnRlc2lhbi4uLiBidXQgZm9yIG5vdyBpdCdzIHNlcGFyYXRlLlxudmFyIFNIT1daT09NT1VUVElQID0gdHJ1ZTtcblxucHJvdG8uY2xlYXJTZWxlY3QgPSBmdW5jdGlvbigpIHtcbiAgICBjbGVhclNlbGVjdGlvbnNDYWNoZSh0aGlzLmRyYWdPcHRpb25zKTtcbiAgICBjbGVhclNlbGVjdCh0aGlzLmRyYWdPcHRpb25zLmdkKTtcbn07XG5cbnByb3RvLmluaXRJbnRlcmFjdGlvbnMgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBkcmFnZ2VyID0gX3RoaXMubGF5ZXJzLnBsb3RiZy5zZWxlY3QoJ3BhdGgnKS5ub2RlKCk7XG4gICAgdmFyIGdkID0gX3RoaXMuZ3JhcGhEaXY7XG4gICAgdmFyIHpvb21MYXllciA9IGdkLl9mdWxsTGF5b3V0Ll96b29tbGF5ZXI7XG5cbiAgICAvLyB1c2UgcGxvdGJnIGZvciB0aGUgbWFpbiBpbnRlcmFjdGlvbnNcbiAgICB0aGlzLmRyYWdPcHRpb25zID0ge1xuICAgICAgICBlbGVtZW50OiBkcmFnZ2VyLFxuICAgICAgICBnZDogZ2QsXG4gICAgICAgIHBsb3RpbmZvOiB7XG4gICAgICAgICAgICBpZDogX3RoaXMuaWQsXG4gICAgICAgICAgICBkb21haW46IGdkLl9mdWxsTGF5b3V0W190aGlzLmlkXS5kb21haW4sXG4gICAgICAgICAgICB4YXhpczogX3RoaXMueGF4aXMsXG4gICAgICAgICAgICB5YXhpczogX3RoaXMueWF4aXNcbiAgICAgICAgfSxcbiAgICAgICAgc3VicGxvdDogX3RoaXMuaWQsXG4gICAgICAgIHByZXBGbjogZnVuY3Rpb24oZSwgc3RhcnRYLCBzdGFydFkpIHtcbiAgICAgICAgICAgIC8vIHRoZXNlIGFyZW4ndCBhdmFpbGFibGUgeWV0IHdoZW4gaW5pdEludGVyYWN0aW9uc1xuICAgICAgICAgICAgLy8gaXMgY2FsbGVkXG4gICAgICAgICAgICBfdGhpcy5kcmFnT3B0aW9ucy54YXhlcyA9IFtfdGhpcy54YXhpc107XG4gICAgICAgICAgICBfdGhpcy5kcmFnT3B0aW9ucy55YXhlcyA9IFtfdGhpcy55YXhpc107XG5cbiAgICAgICAgICAgIHZhciBkcmFnTW9kZU5vdyA9IF90aGlzLmRyYWdPcHRpb25zLmRyYWdtb2RlID0gZ2QuX2Z1bGxMYXlvdXQuZHJhZ21vZGU7XG5cbiAgICAgICAgICAgIGlmKGZyZWVNb2RlKGRyYWdNb2RlTm93KSkgX3RoaXMuZHJhZ09wdGlvbnMubWluRHJhZyA9IDE7XG4gICAgICAgICAgICBlbHNlIF90aGlzLmRyYWdPcHRpb25zLm1pbkRyYWcgPSB1bmRlZmluZWQ7XG5cbiAgICAgICAgICAgIGlmKGRyYWdNb2RlTm93ID09PSAnem9vbScpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5kcmFnT3B0aW9ucy5tb3ZlRm4gPSB6b29tTW92ZTtcbiAgICAgICAgICAgICAgICBfdGhpcy5kcmFnT3B0aW9ucy5jbGlja0ZuID0gY2xpY2tab29tUGFuO1xuICAgICAgICAgICAgICAgIF90aGlzLmRyYWdPcHRpb25zLmRvbmVGbiA9IHpvb21Eb25lO1xuICAgICAgICAgICAgICAgIHpvb21QcmVwKGUsIHN0YXJ0WCwgc3RhcnRZKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihkcmFnTW9kZU5vdyA9PT0gJ3BhbicpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5kcmFnT3B0aW9ucy5tb3ZlRm4gPSBwbG90RHJhZztcbiAgICAgICAgICAgICAgICBfdGhpcy5kcmFnT3B0aW9ucy5jbGlja0ZuID0gY2xpY2tab29tUGFuO1xuICAgICAgICAgICAgICAgIF90aGlzLmRyYWdPcHRpb25zLmRvbmVGbiA9IGRyYWdEb25lO1xuICAgICAgICAgICAgICAgIHBhblByZXAoKTtcbiAgICAgICAgICAgICAgICBfdGhpcy5jbGVhclNlbGVjdChnZCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYocmVjdE1vZGUoZHJhZ01vZGVOb3cpIHx8IGZyZWVNb2RlKGRyYWdNb2RlTm93KSkge1xuICAgICAgICAgICAgICAgIHByZXBTZWxlY3QoZSwgc3RhcnRYLCBzdGFydFksIF90aGlzLmRyYWdPcHRpb25zLCBkcmFnTW9kZU5vdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHgwLCB5MCwgbWluczAsIHNwYW4wLCBtaW5zLCBsdW0sIHBhdGgwLCBkaW1tZWQsIHpiLCBjb3JuZXJzO1xuXG4gICAgZnVuY3Rpb24gbWFrZVVwZGF0ZShfbWlucykge1xuICAgICAgICB2YXIgYXR0cnMgPSB7fTtcbiAgICAgICAgYXR0cnNbX3RoaXMuaWQgKyAnLmFheGlzLm1pbiddID0gX21pbnMuYTtcbiAgICAgICAgYXR0cnNbX3RoaXMuaWQgKyAnLmJheGlzLm1pbiddID0gX21pbnMuYjtcbiAgICAgICAgYXR0cnNbX3RoaXMuaWQgKyAnLmNheGlzLm1pbiddID0gX21pbnMuYztcbiAgICAgICAgcmV0dXJuIGF0dHJzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsaWNrWm9vbVBhbihudW1DbGlja3MsIGV2dCkge1xuICAgICAgICB2YXIgY2xpY2tNb2RlID0gZ2QuX2Z1bGxMYXlvdXQuY2xpY2ttb2RlO1xuXG4gICAgICAgIHJlbW92ZVpvb21ib3goZ2QpO1xuXG4gICAgICAgIGlmKG51bUNsaWNrcyA9PT0gMikge1xuICAgICAgICAgICAgZ2QuZW1pdCgncGxvdGx5X2RvdWJsZWNsaWNrJywgbnVsbCk7XG4gICAgICAgICAgICBSZWdpc3RyeS5jYWxsKCdfZ3VpUmVsYXlvdXQnLCBnZCwgbWFrZVVwZGF0ZSh7YTogMCwgYjogMCwgYzogMH0pKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGNsaWNrTW9kZS5pbmRleE9mKCdzZWxlY3QnKSA+IC0xICYmIG51bUNsaWNrcyA9PT0gMSkge1xuICAgICAgICAgICAgc2VsZWN0T25DbGljayhldnQsIGdkLCBbX3RoaXMueGF4aXNdLCBbX3RoaXMueWF4aXNdLCBfdGhpcy5pZCwgX3RoaXMuZHJhZ09wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoY2xpY2tNb2RlLmluZGV4T2YoJ2V2ZW50JykgPiAtMSkge1xuICAgICAgICAgICAgRnguY2xpY2soZ2QsIGV2dCwgX3RoaXMuaWQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gem9vbVByZXAoZSwgc3RhcnRYLCBzdGFydFkpIHtcbiAgICAgICAgdmFyIGRyYWdCQm94ID0gZHJhZ2dlci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgeDAgPSBzdGFydFggLSBkcmFnQkJveC5sZWZ0O1xuICAgICAgICB5MCA9IHN0YXJ0WSAtIGRyYWdCQm94LnRvcDtcbiAgICAgICAgbWluczAgPSB7XG4gICAgICAgICAgICBhOiBfdGhpcy5hYXhpcy5yYW5nZVswXSxcbiAgICAgICAgICAgIGI6IF90aGlzLmJheGlzLnJhbmdlWzFdLFxuICAgICAgICAgICAgYzogX3RoaXMuY2F4aXMucmFuZ2VbMV1cbiAgICAgICAgfTtcbiAgICAgICAgbWlucyA9IG1pbnMwO1xuICAgICAgICBzcGFuMCA9IF90aGlzLmFheGlzLnJhbmdlWzFdIC0gbWluczAuYTtcbiAgICAgICAgbHVtID0gdGlueWNvbG9yKF90aGlzLmdyYXBoRGl2Ll9mdWxsTGF5b3V0W190aGlzLmlkXS5iZ2NvbG9yKS5nZXRMdW1pbmFuY2UoKTtcbiAgICAgICAgcGF0aDAgPSAnTTAsJyArIF90aGlzLmggKyAnTCcgKyAoX3RoaXMudyAvIDIpICsgJywgMEwnICsgX3RoaXMudyArICcsJyArIF90aGlzLmggKyAnWic7XG4gICAgICAgIGRpbW1lZCA9IGZhbHNlO1xuXG4gICAgICAgIHpiID0gem9vbUxheWVyLmFwcGVuZCgncGF0aCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCAnem9vbWJveCcpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgX3RoaXMueDAgKyAnLCAnICsgX3RoaXMueTAgKyAnKScpXG4gICAgICAgICAgICAuc3R5bGUoe1xuICAgICAgICAgICAgICAgICdmaWxsJzogbHVtID4gMC4yID8gJ3JnYmEoMCwwLDAsMCknIDogJ3JnYmEoMjU1LDI1NSwyNTUsMCknLFxuICAgICAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCBwYXRoMCk7XG5cbiAgICAgICAgY29ybmVycyA9IHpvb21MYXllci5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3pvb21ib3gtY29ybmVycycpXG4gICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgX3RoaXMueDAgKyAnLCAnICsgX3RoaXMueTAgKyAnKScpXG4gICAgICAgICAgICAuc3R5bGUoe1xuICAgICAgICAgICAgICAgIGZpbGw6IENvbG9yLmJhY2tncm91bmQsXG4gICAgICAgICAgICAgICAgc3Ryb2tlOiBDb2xvci5kZWZhdWx0TGluZSxcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMSxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmF0dHIoJ2QnLCAnTTAsMFonKTtcblxuICAgICAgICBfdGhpcy5jbGVhclNlbGVjdChnZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QUZyYWMoeCwgeSkgeyByZXR1cm4gMSAtICh5IC8gX3RoaXMuaCk7IH1cbiAgICBmdW5jdGlvbiBnZXRCRnJhYyh4LCB5KSB7IHJldHVybiAxIC0gKCh4ICsgKF90aGlzLmggLSB5KSAvIE1hdGguc3FydCgzKSkgLyBfdGhpcy53KTsgfVxuICAgIGZ1bmN0aW9uIGdldENGcmFjKHgsIHkpIHsgcmV0dXJuICgoeCAtIChfdGhpcy5oIC0geSkgLyBNYXRoLnNxcnQoMykpIC8gX3RoaXMudyk7IH1cblxuICAgIGZ1bmN0aW9uIHpvb21Nb3ZlKGR4MCwgZHkwKSB7XG4gICAgICAgIHZhciB4MSA9IHgwICsgZHgwO1xuICAgICAgICB2YXIgeTEgPSB5MCArIGR5MDtcbiAgICAgICAgdmFyIGFmcmFjID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgZ2V0QUZyYWMoeDAsIHkwKSwgZ2V0QUZyYWMoeDEsIHkxKSkpO1xuICAgICAgICB2YXIgYmZyYWMgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBnZXRCRnJhYyh4MCwgeTApLCBnZXRCRnJhYyh4MSwgeTEpKSk7XG4gICAgICAgIHZhciBjZnJhYyA9IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIGdldENGcmFjKHgwLCB5MCksIGdldENGcmFjKHgxLCB5MSkpKTtcbiAgICAgICAgdmFyIHhMZWZ0ID0gKChhZnJhYyAvIDIpICsgY2ZyYWMpICogX3RoaXMudztcbiAgICAgICAgdmFyIHhSaWdodCA9ICgxIC0gKGFmcmFjIC8gMikgLSBiZnJhYykgKiBfdGhpcy53O1xuICAgICAgICB2YXIgeENlbnRlciA9ICh4TGVmdCArIHhSaWdodCkgLyAyO1xuICAgICAgICB2YXIgeFNwYW4gPSB4UmlnaHQgLSB4TGVmdDtcbiAgICAgICAgdmFyIHlCb3R0b20gPSAoMSAtIGFmcmFjKSAqIF90aGlzLmg7XG4gICAgICAgIHZhciB5VG9wID0geUJvdHRvbSAtIHhTcGFuIC8gd2hSYXRpbztcblxuICAgICAgICBpZih4U3BhbiA8IGNvbnN0YW50cy5NSU5aT09NKSB7XG4gICAgICAgICAgICBtaW5zID0gbWluczA7XG4gICAgICAgICAgICB6Yi5hdHRyKCdkJywgcGF0aDApO1xuICAgICAgICAgICAgY29ybmVycy5hdHRyKCdkJywgJ00wLDBaJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW5zID0ge1xuICAgICAgICAgICAgICAgIGE6IG1pbnMwLmEgKyBhZnJhYyAqIHNwYW4wLFxuICAgICAgICAgICAgICAgIGI6IG1pbnMwLmIgKyBiZnJhYyAqIHNwYW4wLFxuICAgICAgICAgICAgICAgIGM6IG1pbnMwLmMgKyBjZnJhYyAqIHNwYW4wXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgemIuYXR0cignZCcsIHBhdGgwICsgJ00nICsgeExlZnQgKyAnLCcgKyB5Qm90dG9tICtcbiAgICAgICAgICAgICAgICAnSCcgKyB4UmlnaHQgKyAnTCcgKyB4Q2VudGVyICsgJywnICsgeVRvcCArXG4gICAgICAgICAgICAgICAgJ0wnICsgeExlZnQgKyAnLCcgKyB5Qm90dG9tICsgJ1onKTtcbiAgICAgICAgICAgIGNvcm5lcnMuYXR0cignZCcsICdNJyArIHgwICsgJywnICsgeTAgKyBTVEFSVE1BUktFUiArXG4gICAgICAgICAgICAgICAgJ00nICsgeExlZnQgKyAnLCcgKyB5Qm90dG9tICsgQkxQQVRIICtcbiAgICAgICAgICAgICAgICAnTScgKyB4UmlnaHQgKyAnLCcgKyB5Qm90dG9tICsgQlJQQVRIICtcbiAgICAgICAgICAgICAgICAnTScgKyB4Q2VudGVyICsgJywnICsgeVRvcCArIFRPUFBBVEgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWRpbW1lZCkge1xuICAgICAgICAgICAgemIudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdmaWxsJywgbHVtID4gMC4yID8gJ3JnYmEoMCwwLDAsMC40KScgOlxuICAgICAgICAgICAgICAgICAgICAncmdiYSgyNTUsMjU1LDI1NSwwLjMpJylcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oMjAwKTtcbiAgICAgICAgICAgIGNvcm5lcnMudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSlcbiAgICAgICAgICAgICAgICAuZHVyYXRpb24oMjAwKTtcbiAgICAgICAgICAgIGRpbW1lZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBnZC5lbWl0KCdwbG90bHlfcmVsYXlvdXRpbmcnLCBtYWtlVXBkYXRlKG1pbnMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB6b29tRG9uZSgpIHtcbiAgICAgICAgcmVtb3ZlWm9vbWJveChnZCk7XG5cbiAgICAgICAgaWYobWlucyA9PT0gbWluczApIHJldHVybjtcblxuICAgICAgICBSZWdpc3RyeS5jYWxsKCdfZ3VpUmVsYXlvdXQnLCBnZCwgbWFrZVVwZGF0ZShtaW5zKSk7XG5cbiAgICAgICAgaWYoU0hPV1pPT01PVVRUSVAgJiYgZ2QuZGF0YSAmJiBnZC5fY29udGV4dC5zaG93VGlwcykge1xuICAgICAgICAgICAgTGliLm5vdGlmaWVyKF8oZ2QsICdEb3VibGUtY2xpY2sgdG8gem9vbSBiYWNrIG91dCcpLCAnbG9uZycpO1xuICAgICAgICAgICAgU0hPV1pPT01PVVRUSVAgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBhblByZXAoKSB7XG4gICAgICAgIG1pbnMwID0ge1xuICAgICAgICAgICAgYTogX3RoaXMuYWF4aXMucmFuZ2VbMF0sXG4gICAgICAgICAgICBiOiBfdGhpcy5iYXhpcy5yYW5nZVsxXSxcbiAgICAgICAgICAgIGM6IF90aGlzLmNheGlzLnJhbmdlWzFdXG4gICAgICAgIH07XG4gICAgICAgIG1pbnMgPSBtaW5zMDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwbG90RHJhZyhkeCwgZHkpIHtcbiAgICAgICAgdmFyIGR4U2NhbGVkID0gZHggLyBfdGhpcy54YXhpcy5fbTtcbiAgICAgICAgdmFyIGR5U2NhbGVkID0gZHkgLyBfdGhpcy55YXhpcy5fbTtcbiAgICAgICAgbWlucyA9IHtcbiAgICAgICAgICAgIGE6IG1pbnMwLmEgLSBkeVNjYWxlZCxcbiAgICAgICAgICAgIGI6IG1pbnMwLmIgKyAoZHhTY2FsZWQgKyBkeVNjYWxlZCkgLyAyLFxuICAgICAgICAgICAgYzogbWluczAuYyAtIChkeFNjYWxlZCAtIGR5U2NhbGVkKSAvIDJcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIG1pbnNvcnRlZCA9IFttaW5zLmEsIG1pbnMuYiwgbWlucy5jXS5zb3J0KCk7XG4gICAgICAgIHZhciBtaW5pbmRpY2VzID0ge1xuICAgICAgICAgICAgYTogbWluc29ydGVkLmluZGV4T2YobWlucy5hKSxcbiAgICAgICAgICAgIGI6IG1pbnNvcnRlZC5pbmRleE9mKG1pbnMuYiksXG4gICAgICAgICAgICBjOiBtaW5zb3J0ZWQuaW5kZXhPZihtaW5zLmMpXG4gICAgICAgIH07XG4gICAgICAgIGlmKG1pbnNvcnRlZFswXSA8IDApIHtcbiAgICAgICAgICAgIGlmKG1pbnNvcnRlZFsxXSArIG1pbnNvcnRlZFswXSAvIDIgPCAwKSB7XG4gICAgICAgICAgICAgICAgbWluc29ydGVkWzJdICs9IG1pbnNvcnRlZFswXSArIG1pbnNvcnRlZFsxXTtcbiAgICAgICAgICAgICAgICBtaW5zb3J0ZWRbMF0gPSBtaW5zb3J0ZWRbMV0gPSAwO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBtaW5zb3J0ZWRbMl0gKz0gbWluc29ydGVkWzBdIC8gMjtcbiAgICAgICAgICAgICAgICBtaW5zb3J0ZWRbMV0gKz0gbWluc29ydGVkWzBdIC8gMjtcbiAgICAgICAgICAgICAgICBtaW5zb3J0ZWRbMF0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWlucyA9IHtcbiAgICAgICAgICAgICAgICBhOiBtaW5zb3J0ZWRbbWluaW5kaWNlcy5hXSxcbiAgICAgICAgICAgICAgICBiOiBtaW5zb3J0ZWRbbWluaW5kaWNlcy5iXSxcbiAgICAgICAgICAgICAgICBjOiBtaW5zb3J0ZWRbbWluaW5kaWNlcy5jXVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGR5ID0gKG1pbnMwLmEgLSBtaW5zLmEpICogX3RoaXMueWF4aXMuX207XG4gICAgICAgICAgICBkeCA9IChtaW5zMC5jIC0gbWlucy5jIC0gbWluczAuYiArIG1pbnMuYikgKiBfdGhpcy54YXhpcy5fbTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1vdmUgdGhlIGRhdGEgKHRyYW5zbGF0ZSwgZG9uJ3QgcmVkcmF3KVxuICAgICAgICB2YXIgcGxvdFRyYW5zZm9ybSA9ICd0cmFuc2xhdGUoJyArIChfdGhpcy54MCArIGR4KSArICcsJyArIChfdGhpcy55MCArIGR5KSArICcpJztcbiAgICAgICAgX3RoaXMucGxvdENvbnRhaW5lci5zZWxlY3RBbGwoJy5zY2F0dGVybGF5ZXIsLm1hcGxheWVyJylcbiAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBwbG90VHJhbnNmb3JtKTtcblxuICAgICAgICB2YXIgcGxvdFRyYW5zZm9ybTIgPSAndHJhbnNsYXRlKCcgKyAtZHggKyAnLCcgKyAtZHkgKyAnKSc7XG4gICAgICAgIF90aGlzLmNsaXBEZWZSZWxhdGl2ZS5zZWxlY3QoJ3BhdGgnKS5hdHRyKCd0cmFuc2Zvcm0nLCBwbG90VHJhbnNmb3JtMik7XG5cbiAgICAgICAgLy8gbW92ZSB0aGUgdGlja3NcbiAgICAgICAgX3RoaXMuYWF4aXMucmFuZ2UgPSBbbWlucy5hLCBfdGhpcy5zdW0gLSBtaW5zLmIgLSBtaW5zLmNdO1xuICAgICAgICBfdGhpcy5iYXhpcy5yYW5nZSA9IFtfdGhpcy5zdW0gLSBtaW5zLmEgLSBtaW5zLmMsIG1pbnMuYl07XG4gICAgICAgIF90aGlzLmNheGlzLnJhbmdlID0gW190aGlzLnN1bSAtIG1pbnMuYSAtIG1pbnMuYiwgbWlucy5jXTtcblxuICAgICAgICBfdGhpcy5kcmF3QXhlcyhmYWxzZSk7XG5cbiAgICAgICAgaWYoX3RoaXMuX2hhc0NsaXBPbkF4aXNGYWxzZSkge1xuICAgICAgICAgICAgX3RoaXMucGxvdENvbnRhaW5lclxuICAgICAgICAgICAgICAgIC5zZWxlY3QoJy5zY2F0dGVybGF5ZXInKS5zZWxlY3RBbGwoJy50cmFjZScpXG4gICAgICAgICAgICAgICAgLmNhbGwoRHJhd2luZy5oaWRlT3V0c2lkZVJhbmdlUG9pbnRzLCBfdGhpcyk7XG4gICAgICAgIH1cblxuICAgICAgICBnZC5lbWl0KCdwbG90bHlfcmVsYXlvdXRpbmcnLCBtYWtlVXBkYXRlKG1pbnMpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkcmFnRG9uZSgpIHtcbiAgICAgICAgUmVnaXN0cnkuY2FsbCgnX2d1aVJlbGF5b3V0JywgZ2QsIG1ha2VVcGRhdGUobWlucykpO1xuICAgIH1cblxuICAgIC8vIGZpbmFsbHksIHNldCB1cCBob3ZlciBhbmQgY2xpY2tcbiAgICAvLyB0aGVzZSBldmVudCBoYW5kbGVycyBtdXN0IGFscmVhZHkgYmUgc2V0IGJlZm9yZSBkcmFnRWxlbWVudC5pbml0XG4gICAgLy8gc28gaXQgY2FuIHN0YXNoIHRoZW0gYW5kIG92ZXJyaWRlIHRoZW0uXG4gICAgZHJhZ2dlci5vbm1vdXNlbW92ZSA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBGeC5ob3ZlcihnZCwgZXZ0LCBfdGhpcy5pZCk7XG4gICAgICAgIGdkLl9mdWxsTGF5b3V0Ll9sYXN0aG92ZXIgPSBkcmFnZ2VyO1xuICAgICAgICBnZC5fZnVsbExheW91dC5faG92ZXJzdWJwbG90ID0gX3RoaXMuaWQ7XG4gICAgfTtcblxuICAgIGRyYWdnZXIub25tb3VzZW91dCA9IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBpZihnZC5fZHJhZ2dpbmcpIHJldHVybjtcblxuICAgICAgICBkcmFnRWxlbWVudC51bmhvdmVyKGdkLCBldnQpO1xuICAgIH07XG5cbiAgICBkcmFnRWxlbWVudC5pbml0KHRoaXMuZHJhZ09wdGlvbnMpO1xufTtcblxuZnVuY3Rpb24gcmVtb3ZlWm9vbWJveChnZCkge1xuICAgIGQzLnNlbGVjdChnZClcbiAgICAgICAgLnNlbGVjdEFsbCgnLnpvb21ib3gsLmpzLXpvb21ib3gtYmFja2Ryb3AsLmpzLXpvb21ib3gtbWVudSwuem9vbWJveC1jb3JuZXJzJylcbiAgICAgICAgLnJlbW92ZSgpO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaG92ZXJ0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLmhvdmVydGVtcGxhdGVBdHRycztcbnZhciB0ZXh0dGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS50ZXh0dGVtcGxhdGVBdHRycztcbnZhciBzY2F0dGVyQXR0cnMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2F0dHJpYnV0ZXMnKTtcbnZhciBiYXNlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9hdHRyaWJ1dGVzJyk7XG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBkYXNoID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nL2F0dHJpYnV0ZXMnKS5kYXNoO1xuXG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG52YXIgc2NhdHRlck1hcmtlckF0dHJzID0gc2NhdHRlckF0dHJzLm1hcmtlcjtcbnZhciBzY2F0dGVyTGluZUF0dHJzID0gc2NhdHRlckF0dHJzLmxpbmU7XG52YXIgc2NhdHRlck1hcmtlckxpbmVBdHRycyA9IHNjYXR0ZXJNYXJrZXJBdHRycy5saW5lO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBhOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBxdWFudGl0eSBvZiBjb21wb25lbnQgYGFgIGluIGVhY2ggZGF0YSBwb2ludC4nLFxuICAgICAgICAgICAgJ0lmIGBhYCwgYGJgLCBhbmQgYGNgIGFyZSBhbGwgcHJvdmlkZWQsIHRoZXkgbmVlZCBub3QgYmUnLFxuICAgICAgICAgICAgJ25vcm1hbGl6ZWQsIG9ubHkgdGhlIHJlbGF0aXZlIHZhbHVlcyBtYXR0ZXIuIElmIG9ubHkgdHdvJyxcbiAgICAgICAgICAgICdhcnJheXMgYXJlIHByb3ZpZGVkIHRoZXkgbXVzdCBiZSBub3JtYWxpemVkIHRvIG1hdGNoJyxcbiAgICAgICAgICAgICdgdGVybmFyeTxpPi5zdW1gLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGI6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHF1YW50aXR5IG9mIGNvbXBvbmVudCBgYWAgaW4gZWFjaCBkYXRhIHBvaW50LicsXG4gICAgICAgICAgICAnSWYgYGFgLCBgYmAsIGFuZCBgY2AgYXJlIGFsbCBwcm92aWRlZCwgdGhleSBuZWVkIG5vdCBiZScsXG4gICAgICAgICAgICAnbm9ybWFsaXplZCwgb25seSB0aGUgcmVsYXRpdmUgdmFsdWVzIG1hdHRlci4gSWYgb25seSB0d28nLFxuICAgICAgICAgICAgJ2FycmF5cyBhcmUgcHJvdmlkZWQgdGhleSBtdXN0IGJlIG5vcm1hbGl6ZWQgdG8gbWF0Y2gnLFxuICAgICAgICAgICAgJ2B0ZXJuYXJ5PGk+LnN1bWAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYzoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgcXVhbnRpdHkgb2YgY29tcG9uZW50IGBhYCBpbiBlYWNoIGRhdGEgcG9pbnQuJyxcbiAgICAgICAgICAgICdJZiBgYWAsIGBiYCwgYW5kIGBjYCBhcmUgYWxsIHByb3ZpZGVkLCB0aGV5IG5lZWQgbm90IGJlJyxcbiAgICAgICAgICAgICdub3JtYWxpemVkLCBvbmx5IHRoZSByZWxhdGl2ZSB2YWx1ZXMgbWF0dGVyLiBJZiBvbmx5IHR3bycsXG4gICAgICAgICAgICAnYXJyYXlzIGFyZSBwcm92aWRlZCB0aGV5IG11c3QgYmUgbm9ybWFsaXplZCB0byBtYXRjaCcsXG4gICAgICAgICAgICAnYHRlcm5hcnk8aT4uc3VtYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBzdW06IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1RoZSBudW1iZXIgZWFjaCB0cmlwbGV0IHNob3VsZCBzdW0gdG8sJyxcbiAgICAgICAgICAgICdpZiBvbmx5IHR3byBvZiBgYWAsIGBiYCwgYW5kIGBjYCBhcmUgcHJvdmlkZWQuJyxcbiAgICAgICAgICAgICdUaGlzIG92ZXJyaWRlcyBgdGVybmFyeTxpPi5zdW1gIHRvIG5vcm1hbGl6ZSB0aGlzIHNwZWNpZmljJyxcbiAgICAgICAgICAgICd0cmFjZSwgYnV0IGRvZXMgbm90IGFmZmVjdCB0aGUgdmFsdWVzIGRpc3BsYXllZCBvbiB0aGUgYXhlcy4nLFxuICAgICAgICAgICAgJzAgKG9yIG1pc3NpbmcpIG1lYW5zIHRvIHVzZSB0ZXJuYXJ5PGk+LnN1bSdcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIG1vZGU6IGV4dGVuZEZsYXQoe30sIHNjYXR0ZXJBdHRycy5tb2RlLCB7ZGZsdDogJ21hcmtlcnMnfSksXG4gICAgdGV4dDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLnRleHQsIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggKGEsYixjKSBwb2ludC4nLFxuICAgICAgICAgICAgJ0lmIGEgc2luZ2xlIHN0cmluZywgdGhlIHNhbWUgc3RyaW5nIGFwcGVhcnMgb3ZlcicsXG4gICAgICAgICAgICAnYWxsIHRoZSBkYXRhIHBvaW50cy4nLFxuICAgICAgICAgICAgJ0lmIGFuIGFycmF5IG9mIHN0cmluZ3MsIHRoZSBpdGVtcyBhcmUgbWFwcGVkIGluIG9yZGVyIHRvIHRoZScsXG4gICAgICAgICAgICAndGhlIGRhdGEgcG9pbnRzIGluIChhLGIsYykuJyxcbiAgICAgICAgICAgICdJZiB0cmFjZSBgaG92ZXJpbmZvYCBjb250YWlucyBhICp0ZXh0KiBmbGFnIGFuZCAqaG92ZXJ0ZXh0KiBpcyBub3Qgc2V0LCcsXG4gICAgICAgICAgICAndGhlc2UgZWxlbWVudHMgd2lsbCBiZSBzZWVuIGluIHRoZSBob3ZlciBsYWJlbHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIHRleHR0ZW1wbGF0ZTogdGV4dHRlbXBsYXRlQXR0cnMoe2VkaXRUeXBlOiAncGxvdCd9LCB7XG4gICAgICAgIGtleXM6IFsnYScsICdiJywgJ2MnLCAndGV4dCddXG4gICAgfSksXG4gICAgaG92ZXJ0ZXh0OiBleHRlbmRGbGF0KHt9LCBzY2F0dGVyQXR0cnMuaG92ZXJ0ZXh0LCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyBob3ZlciB0ZXh0IGVsZW1lbnRzIGFzc29jaWF0ZWQgd2l0aCBlYWNoIChhLGIsYykgcG9pbnQuJyxcbiAgICAgICAgICAgICdJZiBhIHNpbmdsZSBzdHJpbmcsIHRoZSBzYW1lIHN0cmluZyBhcHBlYXJzIG92ZXInLFxuICAgICAgICAgICAgJ2FsbCB0aGUgZGF0YSBwb2ludHMuJyxcbiAgICAgICAgICAgICdJZiBhbiBhcnJheSBvZiBzdHJpbmdzLCB0aGUgaXRlbXMgYXJlIG1hcHBlZCBpbiBvcmRlciB0byB0aGUnLFxuICAgICAgICAgICAgJ3RoZSBkYXRhIHBvaW50cyBpbiAoYSxiLGMpLicsXG4gICAgICAgICAgICAnVG8gYmUgc2VlbiwgdHJhY2UgYGhvdmVyaW5mb2AgbXVzdCBjb250YWluIGEgKnRleHQqIGZsYWcuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0pLFxuICAgIGxpbmU6IHtcbiAgICAgICAgY29sb3I6IHNjYXR0ZXJMaW5lQXR0cnMuY29sb3IsXG4gICAgICAgIHdpZHRoOiBzY2F0dGVyTGluZUF0dHJzLndpZHRoLFxuICAgICAgICBkYXNoOiBkYXNoLFxuICAgICAgICBzaGFwZTogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckxpbmVBdHRycy5zaGFwZSxcbiAgICAgICAgICAgIHt2YWx1ZXM6IFsnbGluZWFyJywgJ3NwbGluZSddfSksXG4gICAgICAgIHNtb290aGluZzogc2NhdHRlckxpbmVBdHRycy5zbW9vdGhpbmcsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICB9LFxuICAgIGNvbm5lY3RnYXBzOiBzY2F0dGVyQXR0cnMuY29ubmVjdGdhcHMsXG4gICAgY2xpcG9uYXhpczogc2NhdHRlckF0dHJzLmNsaXBvbmF4aXMsXG4gICAgZmlsbDogZXh0ZW5kRmxhdCh7fSwgc2NhdHRlckF0dHJzLmZpbGwsIHtcbiAgICAgICAgdmFsdWVzOiBbJ25vbmUnLCAndG9zZWxmJywgJ3RvbmV4dCddLFxuICAgICAgICBkZmx0OiAnbm9uZScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYXJlYSB0byBmaWxsIHdpdGggYSBzb2xpZCBjb2xvci4nLFxuICAgICAgICAgICAgJ1VzZSB3aXRoIGBmaWxsY29sb3JgIGlmIG5vdCAqbm9uZSouJyxcbiAgICAgICAgICAgICdzY2F0dGVydGVybmFyeSBoYXMgYSBzdWJzZXQgb2YgdGhlIG9wdGlvbnMgYXZhaWxhYmxlIHRvIHNjYXR0ZXIuJyxcbiAgICAgICAgICAgICcqdG9zZWxmKiBjb25uZWN0cyB0aGUgZW5kcG9pbnRzIG9mIHRoZSB0cmFjZSAob3IgZWFjaCBzZWdtZW50JyxcbiAgICAgICAgICAgICdvZiB0aGUgdHJhY2UgaWYgaXQgaGFzIGdhcHMpIGludG8gYSBjbG9zZWQgc2hhcGUuJyxcbiAgICAgICAgICAgICcqdG9uZXh0KiBmaWxscyB0aGUgc3BhY2UgYmV0d2VlbiB0d28gdHJhY2VzIGlmIG9uZSBjb21wbGV0ZWx5JyxcbiAgICAgICAgICAgICdlbmNsb3NlcyB0aGUgb3RoZXIgKGVnIGNvbnNlY3V0aXZlIGNvbnRvdXIgbGluZXMpLCBhbmQgYmVoYXZlcyBsaWtlJyxcbiAgICAgICAgICAgICcqdG9zZWxmKiBpZiB0aGVyZSBpcyBubyB0cmFjZSBiZWZvcmUgaXQuICp0b25leHQqIHNob3VsZCBub3QgYmUnLFxuICAgICAgICAgICAgJ3VzZWQgaWYgb25lIHRyYWNlIGRvZXMgbm90IGVuY2xvc2UgdGhlIG90aGVyLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcbiAgICBmaWxsY29sb3I6IHNjYXR0ZXJBdHRycy5maWxsY29sb3IsXG4gICAgbWFya2VyOiBleHRlbmRGbGF0KHtcbiAgICAgICAgc3ltYm9sOiBzY2F0dGVyTWFya2VyQXR0cnMuc3ltYm9sLFxuICAgICAgICBvcGFjaXR5OiBzY2F0dGVyTWFya2VyQXR0cnMub3BhY2l0eSxcbiAgICAgICAgbWF4ZGlzcGxheWVkOiBzY2F0dGVyTWFya2VyQXR0cnMubWF4ZGlzcGxheWVkLFxuICAgICAgICBzaXplOiBzY2F0dGVyTWFya2VyQXR0cnMuc2l6ZSxcbiAgICAgICAgc2l6ZXJlZjogc2NhdHRlck1hcmtlckF0dHJzLnNpemVyZWYsXG4gICAgICAgIHNpemVtaW46IHNjYXR0ZXJNYXJrZXJBdHRycy5zaXplbWluLFxuICAgICAgICBzaXplbW9kZTogc2NhdHRlck1hcmtlckF0dHJzLnNpemVtb2RlLFxuICAgICAgICBsaW5lOiBleHRlbmRGbGF0KHtcbiAgICAgICAgICAgIHdpZHRoOiBzY2F0dGVyTWFya2VyTGluZUF0dHJzLndpZHRoLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJ1xuICAgICAgICB9LFxuICAgICAgICAgICAgY29sb3JTY2FsZUF0dHJzKCdtYXJrZXIubGluZScpXG4gICAgICAgICksXG4gICAgICAgIGdyYWRpZW50OiBzY2F0dGVyTWFya2VyQXR0cnMuZ3JhZGllbnQsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICB9LFxuICAgICAgICBjb2xvclNjYWxlQXR0cnMoJ21hcmtlcicpXG4gICAgKSxcblxuICAgIHRleHRmb250OiBzY2F0dGVyQXR0cnMudGV4dGZvbnQsXG4gICAgdGV4dHBvc2l0aW9uOiBzY2F0dGVyQXR0cnMudGV4dHBvc2l0aW9uLFxuXG4gICAgc2VsZWN0ZWQ6IHNjYXR0ZXJBdHRycy5zZWxlY3RlZCxcbiAgICB1bnNlbGVjdGVkOiBzY2F0dGVyQXR0cnMudW5zZWxlY3RlZCxcblxuICAgIGhvdmVyaW5mbzogZXh0ZW5kRmxhdCh7fSwgYmFzZUF0dHJzLmhvdmVyaW5mbywge1xuICAgICAgICBmbGFnczogWydhJywgJ2InLCAnYycsICd0ZXh0JywgJ25hbWUnXVxuICAgIH0pLFxuICAgIGhvdmVyb246IHNjYXR0ZXJBdHRycy5ob3Zlcm9uLFxuICAgIGhvdmVydGVtcGxhdGU6IGhvdmVydGVtcGxhdGVBdHRycygpLFxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNOdW1lcmljID0gcmVxdWlyZSgnZmFzdC1pc251bWVyaWMnKTtcblxudmFyIGNhbGNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb2xvcnNjYWxlX2NhbGMnKTtcbnZhciBhcnJheXNUb0NhbGNkYXRhID0gcmVxdWlyZSgnLi4vc2NhdHRlci9hcnJheXNfdG9fY2FsY2RhdGEnKTtcbnZhciBjYWxjU2VsZWN0aW9uID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jYWxjX3NlbGVjdGlvbicpO1xudmFyIGNhbGNNYXJrZXJTaXplID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jYWxjJykuY2FsY01hcmtlclNpemU7XG5cbnZhciBkYXRhQXJyYXlzID0gWydhJywgJ2InLCAnYyddO1xudmFyIGFycmF5c1RvRmlsbCA9IHthOiBbJ2InLCAnYyddLCBiOiBbJ2EnLCAnYyddLCBjOiBbJ2EnLCAnYiddfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjYWxjKGdkLCB0cmFjZSkge1xuICAgIHZhciB0ZXJuYXJ5ID0gZ2QuX2Z1bGxMYXlvdXRbdHJhY2Uuc3VicGxvdF07XG4gICAgdmFyIGRpc3BsYXlTdW0gPSB0ZXJuYXJ5LnN1bTtcbiAgICB2YXIgbm9ybVN1bSA9IHRyYWNlLnN1bSB8fCBkaXNwbGF5U3VtO1xuICAgIHZhciBhcnJheXMgPSB7YTogdHJhY2UuYSwgYjogdHJhY2UuYiwgYzogdHJhY2UuY307XG5cbiAgICB2YXIgaSwgaiwgZGF0YUFycmF5LCBuZXdBcnJheSwgZmlsbEFycmF5MSwgZmlsbEFycmF5MjtcblxuICAgIC8vIGZpbGwgaW4gb25lIG1pc3NpbmcgY29tcG9uZW50XG4gICAgZm9yKGkgPSAwOyBpIDwgZGF0YUFycmF5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBkYXRhQXJyYXkgPSBkYXRhQXJyYXlzW2ldO1xuICAgICAgICBpZihhcnJheXNbZGF0YUFycmF5XSkgY29udGludWU7XG5cbiAgICAgICAgZmlsbEFycmF5MSA9IGFycmF5c1thcnJheXNUb0ZpbGxbZGF0YUFycmF5XVswXV07XG4gICAgICAgIGZpbGxBcnJheTIgPSBhcnJheXNbYXJyYXlzVG9GaWxsW2RhdGFBcnJheV1bMV1dO1xuICAgICAgICBuZXdBcnJheSA9IG5ldyBBcnJheShmaWxsQXJyYXkxLmxlbmd0aCk7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IGZpbGxBcnJheTEubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIG5ld0FycmF5W2pdID0gbm9ybVN1bSAtIGZpbGxBcnJheTFbal0gLSBmaWxsQXJyYXkyW2pdO1xuICAgICAgICB9XG4gICAgICAgIGFycmF5c1tkYXRhQXJyYXldID0gbmV3QXJyYXk7XG4gICAgfVxuXG4gICAgLy8gbWFrZSB0aGUgY2FsY2RhdGEgYXJyYXlcbiAgICB2YXIgc2VyaWVzbGVuID0gdHJhY2UuX2xlbmd0aDtcbiAgICB2YXIgY2QgPSBuZXcgQXJyYXkoc2VyaWVzbGVuKTtcbiAgICB2YXIgYSwgYiwgYywgbm9ybSwgeCwgeTtcbiAgICBmb3IoaSA9IDA7IGkgPCBzZXJpZXNsZW47IGkrKykge1xuICAgICAgICBhID0gYXJyYXlzLmFbaV07XG4gICAgICAgIGIgPSBhcnJheXMuYltpXTtcbiAgICAgICAgYyA9IGFycmF5cy5jW2ldO1xuICAgICAgICBpZihpc051bWVyaWMoYSkgJiYgaXNOdW1lcmljKGIpICYmIGlzTnVtZXJpYyhjKSkge1xuICAgICAgICAgICAgYSA9ICthO1xuICAgICAgICAgICAgYiA9ICtiO1xuICAgICAgICAgICAgYyA9ICtjO1xuICAgICAgICAgICAgbm9ybSA9IGRpc3BsYXlTdW0gLyAoYSArIGIgKyBjKTtcbiAgICAgICAgICAgIGlmKG5vcm0gIT09IDEpIHtcbiAgICAgICAgICAgICAgICBhICo9IG5vcm07XG4gICAgICAgICAgICAgICAgYiAqPSBub3JtO1xuICAgICAgICAgICAgICAgIGMgKj0gbm9ybTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8vIG1hcCBhLCBiLCBjIG9udG8geCBhbmQgeSB3aGVyZSB0aGUgZnVsbCBzY2FsZSBvZiB5XG4gICAgICAgICAgICAvLyBpcyBbMCwgc3VtXSwgYW5kIHggaXMgWy1zdW0sIHN1bV1cbiAgICAgICAgICAgIC8vIFRPRE86IHRoaXMgbWFrZXMgYGFgIGFsd2F5cyB0aGUgdG9wLCBgYmAgdGhlIGJvdHRvbSBsZWZ0LFxuICAgICAgICAgICAgLy8gYW5kIGBjYCB0aGUgYm90dG9tIHJpZ2h0LiBEbyB3ZSB3YW50IG9wdGlvbnMgdG8gcmVhcnJhbmdlXG4gICAgICAgICAgICAvLyB0aGVzZT9cbiAgICAgICAgICAgIHkgPSBhO1xuICAgICAgICAgICAgeCA9IGMgLSBiO1xuICAgICAgICAgICAgY2RbaV0gPSB7eDogeCwgeTogeSwgYTogYSwgYjogYiwgYzogY307XG4gICAgICAgIH0gZWxzZSBjZFtpXSA9IHt4OiBmYWxzZSwgeTogZmFsc2V9O1xuICAgIH1cblxuICAgIGNhbGNNYXJrZXJTaXplKHRyYWNlLCBzZXJpZXNsZW4pO1xuICAgIGNhbGNDb2xvcnNjYWxlKGdkLCB0cmFjZSk7XG4gICAgYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpO1xuICAgIGNhbGNTZWxlY3Rpb24oY2QsIHRyYWNlKTtcblxuICAgIHJldHVybiBjZDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG52YXIgY29uc3RhbnRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9jb25zdGFudHMnKTtcbnZhciBzdWJUeXBlcyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvc3VidHlwZXMnKTtcbnZhciBoYW5kbGVNYXJrZXJEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFya2VyX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlTGluZURlZmF1bHRzID0gcmVxdWlyZSgnLi4vc2NhdHRlci9saW5lX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlTGluZVNoYXBlRGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL2xpbmVfc2hhcGVfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVUZXh0RGVmYXVsdHMgPSByZXF1aXJlKCcuLi9zY2F0dGVyL3RleHRfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVGaWxsQ29sb3JEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL3NjYXR0ZXIvZmlsbGNvbG9yX2RlZmF1bHRzJyk7XG5cbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIGEgPSBjb2VyY2UoJ2EnKTtcbiAgICB2YXIgYiA9IGNvZXJjZSgnYicpO1xuICAgIHZhciBjID0gY29lcmNlKCdjJyk7XG4gICAgdmFyIGxlbjtcblxuICAgIC8vIGFsbG93IGFueSBvbmUgYXJyYXkgdG8gYmUgbWlzc2luZywgbGVuIGlzIHRoZSBtaW5pbXVtIGxlbmd0aCBvZiB0aG9zZVxuICAgIC8vIHByZXNlbnQuIE5vdGUgdGhhdCBhZnRlciBjb2VyY2UgZGF0YV9hcnJheSdzIGFyZSBlaXRoZXIgQXJyYXlzICh3aGljaFxuICAgIC8vIGFyZSB0cnV0aHkgZXZlbiBpZiBlbXB0eSkgb3IgdW5kZWZpbmVkLiBBcyBpbiBzY2F0dGVyLCBhbiBlbXB0eSBhcnJheVxuICAgIC8vIGlzIGRpZmZlcmVudCBmcm9tIHVuZGVmaW5lZCwgYmVjYXVzZSBpdCBjYW4gc2lnbmlmeSB0aGF0IHRoaXMgZGF0YSBpc1xuICAgIC8vIG5vdCBrbm93biB5ZXQgYnV0IGV4cGVjdGVkIGluIHRoZSBmdXR1cmVcbiAgICBpZihhKSB7XG4gICAgICAgIGxlbiA9IGEubGVuZ3RoO1xuICAgICAgICBpZihiKSB7XG4gICAgICAgICAgICBsZW4gPSBNYXRoLm1pbihsZW4sIGIubGVuZ3RoKTtcbiAgICAgICAgICAgIGlmKGMpIGxlbiA9IE1hdGgubWluKGxlbiwgYy5sZW5ndGgpO1xuICAgICAgICB9IGVsc2UgaWYoYykgbGVuID0gTWF0aC5taW4obGVuLCBjLmxlbmd0aCk7XG4gICAgICAgIGVsc2UgbGVuID0gMDtcbiAgICB9IGVsc2UgaWYoYiAmJiBjKSB7XG4gICAgICAgIGxlbiA9IE1hdGgubWluKGIubGVuZ3RoLCBjLmxlbmd0aCk7XG4gICAgfVxuXG4gICAgaWYoIWxlbikge1xuICAgICAgICB0cmFjZU91dC52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cmFjZU91dC5fbGVuZ3RoID0gbGVuO1xuXG4gICAgY29lcmNlKCdzdW0nKTtcblxuICAgIGNvZXJjZSgndGV4dCcpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZXh0Jyk7XG4gICAgaWYodHJhY2VPdXQuaG92ZXJvbiAhPT0gJ2ZpbGxzJykgY29lcmNlKCdob3ZlcnRlbXBsYXRlJyk7XG5cbiAgICB2YXIgZGVmYXVsdE1vZGUgPSBsZW4gPCBjb25zdGFudHMuUFRTX0xJTkVTT05MWSA/ICdsaW5lcyttYXJrZXJzJyA6ICdsaW5lcyc7XG4gICAgY29lcmNlKCdtb2RlJywgZGVmYXVsdE1vZGUpO1xuXG4gICAgaWYoc3ViVHlwZXMuaGFzTGluZXModHJhY2VPdXQpKSB7XG4gICAgICAgIGhhbmRsZUxpbmVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQsIGNvZXJjZSk7XG4gICAgICAgIGhhbmRsZUxpbmVTaGFwZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBjb2VyY2UpO1xuICAgICAgICBjb2VyY2UoJ2Nvbm5lY3RnYXBzJyk7XG4gICAgfVxuXG4gICAgaWYoc3ViVHlwZXMuaGFzTWFya2Vycyh0cmFjZU91dCkpIHtcbiAgICAgICAgaGFuZGxlTWFya2VyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UsIHtncmFkaWVudDogdHJ1ZX0pO1xuICAgIH1cblxuICAgIGlmKHN1YlR5cGVzLmhhc1RleHQodHJhY2VPdXQpKSB7XG4gICAgICAgIGNvZXJjZSgndGV4dHRlbXBsYXRlJyk7XG4gICAgICAgIGhhbmRsZVRleHREZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UpO1xuICAgIH1cblxuICAgIHZhciBkZmx0SG92ZXJPbiA9IFtdO1xuXG4gICAgaWYoc3ViVHlwZXMuaGFzTWFya2Vycyh0cmFjZU91dCkgfHwgc3ViVHlwZXMuaGFzVGV4dCh0cmFjZU91dCkpIHtcbiAgICAgICAgY29lcmNlKCdjbGlwb25heGlzJyk7XG4gICAgICAgIGNvZXJjZSgnbWFya2VyLm1heGRpc3BsYXllZCcpO1xuICAgICAgICBkZmx0SG92ZXJPbi5wdXNoKCdwb2ludHMnKTtcbiAgICB9XG5cbiAgICBjb2VyY2UoJ2ZpbGwnKTtcbiAgICBpZih0cmFjZU91dC5maWxsICE9PSAnbm9uZScpIHtcbiAgICAgICAgaGFuZGxlRmlsbENvbG9yRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgY29lcmNlKTtcbiAgICAgICAgaWYoIXN1YlR5cGVzLmhhc0xpbmVzKHRyYWNlT3V0KSkgaGFuZGxlTGluZVNoYXBlRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGNvZXJjZSk7XG4gICAgfVxuXG4gICAgaWYodHJhY2VPdXQuZmlsbCA9PT0gJ3RvbmV4dCcgfHwgdHJhY2VPdXQuZmlsbCA9PT0gJ3Rvc2VsZicpIHtcbiAgICAgICAgZGZsdEhvdmVyT24ucHVzaCgnZmlsbHMnKTtcbiAgICB9XG4gICAgY29lcmNlKCdob3Zlcm9uJywgZGZsdEhvdmVyT24uam9pbignKycpIHx8ICdwb2ludHMnKTtcblxuICAgIExpYi5jb2VyY2VTZWxlY3Rpb25NYXJrZXJPcGFjaXR5KHRyYWNlT3V0LCBjb2VyY2UpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBldmVudERhdGEob3V0LCBwdCwgdHJhY2UsIGNkLCBwb2ludE51bWJlcikge1xuICAgIGlmKHB0LnhhKSBvdXQueGF4aXMgPSBwdC54YTtcbiAgICBpZihwdC55YSkgb3V0LnlheGlzID0gcHQueWE7XG5cbiAgICBpZihjZFtwb2ludE51bWJlcl0pIHtcbiAgICAgICAgdmFyIGNkaSA9IGNkW3BvaW50TnVtYmVyXTtcblxuICAgICAgICAvLyBOLkIuIFRoZXNlIGFyZSB0aGUgbm9ybWFsaXplZCBjb29yZGluYXRlcy5cbiAgICAgICAgb3V0LmEgPSBjZGkuYTtcbiAgICAgICAgb3V0LmIgPSBjZGkuYjtcbiAgICAgICAgb3V0LmMgPSBjZGkuYztcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBmb3IgZmlsbC1ob3ZlciBvbmx5XG4gICAgICAgIG91dC5hID0gcHQuYTtcbiAgICAgICAgb3V0LmIgPSBwdC5iO1xuICAgICAgICBvdXQuYyA9IHB0LmM7XG4gICAgfVxuXG4gICAgcmV0dXJuIG91dDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBmb3JtYXRMYWJlbHMoY2RpLCB0cmFjZSwgZnVsbExheW91dCkge1xuICAgIHZhciBsYWJlbHMgPSB7fTtcblxuICAgIHZhciBzdWJwbG90ID0gZnVsbExheW91dFt0cmFjZS5zdWJwbG90XS5fc3VicGxvdDtcbiAgICBsYWJlbHMuYUxhYmVsID0gQXhlcy50aWNrVGV4dChzdWJwbG90LmFheGlzLCBjZGkuYSwgdHJ1ZSkudGV4dDtcbiAgICBsYWJlbHMuYkxhYmVsID0gQXhlcy50aWNrVGV4dChzdWJwbG90LmJheGlzLCBjZGkuYiwgdHJ1ZSkudGV4dDtcbiAgICBsYWJlbHMuY0xhYmVsID0gQXhlcy50aWNrVGV4dChzdWJwbG90LmNheGlzLCBjZGkuYywgdHJ1ZSkudGV4dDtcblxuICAgIHJldHVybiBsYWJlbHM7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgc2NhdHRlckhvdmVyID0gcmVxdWlyZSgnLi4vc2NhdHRlci9ob3ZlcicpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhvdmVyUG9pbnRzKHBvaW50RGF0YSwgeHZhbCwgeXZhbCwgaG92ZXJtb2RlKSB7XG4gICAgdmFyIHNjYXR0ZXJQb2ludERhdGEgPSBzY2F0dGVySG92ZXIocG9pbnREYXRhLCB4dmFsLCB5dmFsLCBob3Zlcm1vZGUpO1xuICAgIGlmKCFzY2F0dGVyUG9pbnREYXRhIHx8IHNjYXR0ZXJQb2ludERhdGFbMF0uaW5kZXggPT09IGZhbHNlKSByZXR1cm47XG5cbiAgICB2YXIgbmV3UG9pbnREYXRhID0gc2NhdHRlclBvaW50RGF0YVswXTtcblxuICAgIC8vIGlmIGhvdmVyaW5nIG9uIGEgZmlsbCwgd2UgZG9uJ3Qgc2hvdyBhbnkgcG9pbnQgZGF0YSBzbyB0aGUgbGFiZWwgaXNcbiAgICAvLyB1bmNoYW5nZWQgZnJvbSB3aGF0IHNjYXR0ZXIgZ2l2ZXMgdXMgLSBleGNlcHQgdGhhdCBpdCBuZWVkcyB0b1xuICAgIC8vIGJlIGNvbnN0cmFpbmVkIHRvIHRoZSB0cmlhbmdsdWxhciBwbG90IGFyZWEsIG5vdCBqdXN0IHRoZSByZWN0YW5ndWxhclxuICAgIC8vIGFyZWEgZGVmaW5lZCBieSB0aGUgc3ludGhldGljIHggYW5kIHkgYXhlc1xuICAgIC8vIFRPRE86IGluIHNvbWUgY2FzZXMgdGhlIHZlcnRpY2FsIG1pZGRsZSBvZiB0aGUgc2hhcGUgaXMgbm90IHdpdGhpblxuICAgIC8vIHRoZSB0cmlhbmd1bGFyIHZpZXdwb3J0IGF0IGFsbCwgc28gdGhlIGxhYmVsIGNhbiBiZWNvbWUgZGlzY29ubmVjdGVkXG4gICAgLy8gZnJvbSB0aGUgc2hhcGUgZW50aXJlbHkuIEJ1dCBjYWxjdWxhdGluZyB3aGF0IHBvcnRpb24gb2YgdGhlIHNoYXBlXG4gICAgLy8gaXMgYWN0dWFsbHkgdmlzaWJsZSwgYXMgY29uc3RyYWluZWQgYnkgdGhlIGRpYWdvbmFsIGF4aXMgbGluZXMsIGlzIG5vdFxuICAgIC8vIHNvIGVhc3kgYW5kIGFueXdheSB3ZSBsb3N0IHRoZSBpbmZvcm1hdGlvbiB3ZSB3b3VsZCBoYXZlIG5lZWRlZCB0byBkb1xuICAgIC8vIHRoaXMgaW5zaWRlIHNjYXR0ZXJIb3Zlci5cbiAgICBpZihuZXdQb2ludERhdGEuaW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB2YXIgeUZyYWNVcCA9IDEgLSAobmV3UG9pbnREYXRhLnkwIC8gcG9pbnREYXRhLnlhLl9sZW5ndGgpO1xuICAgICAgICB2YXIgeExlbiA9IHBvaW50RGF0YS54YS5fbGVuZ3RoO1xuICAgICAgICB2YXIgeE1pbiA9IHhMZW4gKiB5RnJhY1VwIC8gMjtcbiAgICAgICAgdmFyIHhNYXggPSB4TGVuIC0geE1pbjtcbiAgICAgICAgbmV3UG9pbnREYXRhLngwID0gTWF0aC5tYXgoTWF0aC5taW4obmV3UG9pbnREYXRhLngwLCB4TWF4KSwgeE1pbik7XG4gICAgICAgIG5ld1BvaW50RGF0YS54MSA9IE1hdGgubWF4KE1hdGgubWluKG5ld1BvaW50RGF0YS54MSwgeE1heCksIHhNaW4pO1xuICAgICAgICByZXR1cm4gc2NhdHRlclBvaW50RGF0YTtcbiAgICB9XG5cbiAgICB2YXIgY2RpID0gbmV3UG9pbnREYXRhLmNkW25ld1BvaW50RGF0YS5pbmRleF07XG4gICAgdmFyIHRyYWNlID0gbmV3UG9pbnREYXRhLnRyYWNlO1xuICAgIHZhciBzdWJwbG90ID0gbmV3UG9pbnREYXRhLnN1YnBsb3Q7XG5cbiAgICBuZXdQb2ludERhdGEuYSA9IGNkaS5hO1xuICAgIG5ld1BvaW50RGF0YS5iID0gY2RpLmI7XG4gICAgbmV3UG9pbnREYXRhLmMgPSBjZGkuYztcblxuICAgIG5ld1BvaW50RGF0YS54TGFiZWxWYWwgPSB1bmRlZmluZWQ7XG4gICAgbmV3UG9pbnREYXRhLnlMYWJlbFZhbCA9IHVuZGVmaW5lZDtcblxuICAgIHZhciBmdWxsTGF5b3V0ID0ge307XG4gICAgZnVsbExheW91dFt0cmFjZS5zdWJwbG90XSA9IHtfc3VicGxvdDogc3VicGxvdH07XG4gICAgdmFyIGxhYmVscyA9IHRyYWNlLl9tb2R1bGUuZm9ybWF0TGFiZWxzKGNkaSwgdHJhY2UsIGZ1bGxMYXlvdXQpO1xuICAgIG5ld1BvaW50RGF0YS5hTGFiZWwgPSBsYWJlbHMuYUxhYmVsO1xuICAgIG5ld1BvaW50RGF0YS5iTGFiZWwgPSBsYWJlbHMuYkxhYmVsO1xuICAgIG5ld1BvaW50RGF0YS5jTGFiZWwgPSBsYWJlbHMuY0xhYmVsO1xuXG4gICAgdmFyIGhvdmVyaW5mbyA9IGNkaS5oaSB8fCB0cmFjZS5ob3ZlcmluZm87XG4gICAgdmFyIHRleHQgPSBbXTtcbiAgICBmdW5jdGlvbiB0ZXh0UGFydChheCwgdmFsKSB7XG4gICAgICAgIHRleHQucHVzaChheC5faG92ZXJ0aXRsZSArICc6ICcgKyB2YWwpO1xuICAgIH1cbiAgICBpZighdHJhY2UuaG92ZXJ0ZW1wbGF0ZSkge1xuICAgICAgICB2YXIgcGFydHMgPSBob3ZlcmluZm8uc3BsaXQoJysnKTtcbiAgICAgICAgaWYocGFydHMuaW5kZXhPZignYWxsJykgIT09IC0xKSBwYXJ0cyA9IFsnYScsICdiJywgJ2MnXTtcbiAgICAgICAgaWYocGFydHMuaW5kZXhPZignYScpICE9PSAtMSkgdGV4dFBhcnQoc3VicGxvdC5hYXhpcywgbmV3UG9pbnREYXRhLmFMYWJlbCk7XG4gICAgICAgIGlmKHBhcnRzLmluZGV4T2YoJ2InKSAhPT0gLTEpIHRleHRQYXJ0KHN1YnBsb3QuYmF4aXMsIG5ld1BvaW50RGF0YS5iTGFiZWwpO1xuICAgICAgICBpZihwYXJ0cy5pbmRleE9mKCdjJykgIT09IC0xKSB0ZXh0UGFydChzdWJwbG90LmNheGlzLCBuZXdQb2ludERhdGEuY0xhYmVsKTtcbiAgICB9XG4gICAgbmV3UG9pbnREYXRhLmV4dHJhVGV4dCA9IHRleHQuam9pbignPGJyPicpO1xuICAgIG5ld1BvaW50RGF0YS5ob3ZlcnRlbXBsYXRlID0gdHJhY2UuaG92ZXJ0ZW1wbGF0ZTtcbiAgICByZXR1cm4gc2NhdHRlclBvaW50RGF0YTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFya2VyX2NvbG9yYmFyJyksXG4gICAgZm9ybWF0TGFiZWxzOiByZXF1aXJlKCcuL2Zvcm1hdF9sYWJlbHMnKSxcbiAgICBjYWxjOiByZXF1aXJlKCcuL2NhbGMnKSxcbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi4vc2NhdHRlci9zdHlsZScpLnN0eWxlLFxuICAgIHN0eWxlT25TZWxlY3Q6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvc3R5bGUnKS5zdHlsZU9uU2VsZWN0LFxuICAgIGhvdmVyUG9pbnRzOiByZXF1aXJlKCcuL2hvdmVyJyksXG4gICAgc2VsZWN0UG9pbnRzOiByZXF1aXJlKCcuLi9zY2F0dGVyL3NlbGVjdCcpLFxuICAgIGV2ZW50RGF0YTogcmVxdWlyZSgnLi9ldmVudF9kYXRhJyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdzY2F0dGVydGVybmFyeScsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3Rlcm5hcnknKSxcbiAgICBjYXRlZ29yaWVzOiBbJ3Rlcm5hcnknLCAnc3ltYm9scycsICdzaG93TGVnZW5kJywgJ3NjYXR0ZXItbGlrZSddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgaHJOYW1lOiAnc2NhdHRlcl90ZXJuYXJ5JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdQcm92aWRlcyBzaW1pbGFyIGZ1bmN0aW9uYWxpdHkgdG8gdGhlICpzY2F0dGVyKiB0eXBlIGJ1dCBvbiBhIHRlcm5hcnkgcGhhc2UgZGlhZ3JhbS4nLFxuICAgICAgICAgICAgJ1RoZSBkYXRhIGlzIHByb3ZpZGVkIGJ5IGF0IGxlYXN0IHR3byBhcnJheXMgb3V0IG9mIGBhYCwgYGJgLCBgY2AgdHJpcGxldHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIHNjYXR0ZXJQbG90ID0gcmVxdWlyZSgnLi4vc2NhdHRlci9wbG90Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGxvdChnZCwgdGVybmFyeSwgbW9kdWxlQ2FsY0RhdGEpIHtcbiAgICB2YXIgcGxvdENvbnRhaW5lciA9IHRlcm5hcnkucGxvdENvbnRhaW5lcjtcblxuICAgIC8vIHJlbW92ZSBhbGwgbm9kZXMgaW5zaWRlIHRoZSBzY2F0dGVyIGxheWVyXG4gICAgcGxvdENvbnRhaW5lci5zZWxlY3QoJy5zY2F0dGVybGF5ZXInKS5zZWxlY3RBbGwoJyonKS5yZW1vdmUoKTtcblxuICAgIC8vIG1pbWljIGNhcnRlc2lhbiBwbG90aW5mb1xuICAgIHZhciBwbG90aW5mbyA9IHtcbiAgICAgICAgeGF4aXM6IHRlcm5hcnkueGF4aXMsXG4gICAgICAgIHlheGlzOiB0ZXJuYXJ5LnlheGlzLFxuICAgICAgICBwbG90OiBwbG90Q29udGFpbmVyLFxuICAgICAgICBsYXllckNsaXBJZDogdGVybmFyeS5faGFzQ2xpcE9uQXhpc0ZhbHNlID8gdGVybmFyeS5jbGlwSWRSZWxhdGl2ZSA6IG51bGxcbiAgICB9O1xuXG4gICAgdmFyIHNjYXR0ZXJMYXllciA9IHRlcm5hcnkubGF5ZXJzLmZyb250cGxvdC5zZWxlY3QoJ2cuc2NhdHRlcmxheWVyJyk7XG5cbiAgICBzY2F0dGVyUGxvdChnZCwgcGxvdGluZm8sIG1vZHVsZUNhbGNEYXRhLCBzY2F0dGVyTGF5ZXIpO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=