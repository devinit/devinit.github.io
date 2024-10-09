(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_treemap_js"],{

/***/ "./node_modules/plotly.js/lib/treemap.js":
/*!***********************************************!*\
  !*** ./node_modules/plotly.js/lib/treemap.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/treemap */ "./node_modules/plotly.js/src/traces/treemap/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/attributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/attributes.js ***!
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



var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var texttemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").texttemplateAttrs;

var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var pieAttrs = __webpack_require__(/*! ../pie/attributes */ "./node_modules/plotly.js/src/traces/pie/attributes.js");
var sunburstAttrs = __webpack_require__(/*! ../sunburst/attributes */ "./node_modules/plotly.js/src/traces/sunburst/attributes.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/treemap/constants.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = {
    labels: sunburstAttrs.labels,
    parents: sunburstAttrs.parents,

    values: sunburstAttrs.values,
    branchvalues: sunburstAttrs.branchvalues,
    count: sunburstAttrs.count,

    level: sunburstAttrs.level,
    maxdepth: sunburstAttrs.maxdepth,

    tiling: {
        packing: {
            valType: 'enumerated',
            values: [
                'squarify',
                'binary',
                'dice',
                'slice',
                'slice-dice',
                'dice-slice'
            ],
            dflt: 'squarify',
            role: 'info',
            editType: 'plot',
            description: [
                'Determines d3 treemap solver.',
                'For more info please refer to https://github.com/d3/d3-hierarchy#treemap-tiling'
            ].join(' ')
        },

        squarifyratio: {
            valType: 'number',
            role: 'info',
            min: 1,
            dflt: 1,
            editType: 'plot',
            description: [
                'When using *squarify* `packing` algorithm, according to https://github.com/d3/d3-hierarchy/blob/master/README.md#squarify_ratio',
                'this option specifies the desired aspect ratio of the generated rectangles.',
                'The ratio must be specified as a number greater than or equal to one.',
                'Note that the orientation of the generated rectangles (tall or wide)',
                'is not implied by the ratio; for example, a ratio of two will attempt',
                'to produce a mixture of rectangles whose width:height ratio is either 2:1 or 1:2.',
                'When using *squarify*, unlike d3 which uses the Golden Ratio i.e. 1.618034,',
                'Plotly applies 1 to increase squares in treemap layouts.'
            ].join(' ')
        },

        flip: {
            valType: 'flaglist',
            role: 'info',
            flags: [
                'x',
                'y'
            ],
            dflt: '',
            editType: 'plot',
            description: [
                'Determines if the positions obtained from solver are flipped on each axis.'
            ].join(' ')
        },

        pad: {
            valType: 'number',
            role: 'style',
            min: 0,
            dflt: 3,
            editType: 'plot',
            description: [
                'Sets the inner padding (in px).'
            ].join(' ')
        },

        editType: 'calc',
    },

    marker: extendFlat({
        pad: {
            t: {
                valType: 'number',
                role: 'style',
                min: 0,
                editType: 'plot',
                description: [
                    'Sets the padding form the top (in px).'
                ].join(' ')
            },
            l: {
                valType: 'number',
                role: 'style',
                min: 0,
                editType: 'plot',
                description: [
                    'Sets the padding form the left (in px).'
                ].join(' ')
            },
            r: {
                valType: 'number',
                role: 'style',
                min: 0,
                editType: 'plot',
                description: [
                    'Sets the padding form the right (in px).'
                ].join(' ')
            },
            b: {
                valType: 'number',
                role: 'style',
                min: 0,
                editType: 'plot',
                description: [
                    'Sets the padding form the bottom (in px).'
                ].join(' ')
            },

            editType: 'calc'
        },

        colors: sunburstAttrs.marker.colors,

        depthfade: {
            valType: 'enumerated',
            values: [true, false, 'reversed'],
            editType: 'style',
            role: 'style',
            description: [
                'Determines if the sector colors are faded towards',
                'the background from the leaves up to the headers.',
                'This option is unavailable when a `colorscale` is present,',
                'defaults to false when `marker.colors` is set,',
                'but otherwise defaults to true.',
                'When set to *reversed*, the fading direction is inverted,',
                'that is the top elements within hierarchy are drawn with fully saturated colors',
                'while the leaves are faded towards the background color.'
            ].join(' ')
        },

        line: sunburstAttrs.marker.line,

        editType: 'calc'
    },
        colorScaleAttrs('marker', {
            colorAttr: 'colors',
            anim: false // TODO: set to anim: true?
        })
    ),

    pathbar: {
        visible: {
            valType: 'boolean',
            dflt: true,
            role: 'info',
            editType: 'plot',
            description: [
                'Determines if the path bar is drawn',
                'i.e. outside the trace `domain` and',
                'with one pixel gap.'
            ].join(' ')
        },

        side: {
            valType: 'enumerated',
            values: [
                'top',
                'bottom'
            ],
            dflt: 'top',
            role: 'info',
            editType: 'plot',
            description: [
                'Determines on which side of the the treemap the',
                '`pathbar` should be presented.'
            ].join(' ')
        },

        edgeshape: {
            valType: 'enumerated',
            values: [
                '>',
                '<',
                '|',
                '/',
                '\\'
            ],
            dflt: '>',
            role: 'style',
            editType: 'plot',
            description: [
                'Determines which shape is used for edges between `barpath` labels.'
            ].join(' ')
        },

        thickness: {
            valType: 'number',
            min: 12,
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the thickness of `pathbar` (in px). If not specified the `pathbar.textfont.size` is used',
                'with 3 pixles extra padding on each side.'
            ].join(' ')
        },

        textfont: extendFlat({}, pieAttrs.textfont, {
            description: 'Sets the font used inside `pathbar`.'
        }),

        editType: 'calc'
    },

    text: pieAttrs.text,
    textinfo: sunburstAttrs.textinfo,
    // TODO: incorporate `label` and `value` in the eventData
    texttemplate: texttemplateAttrs({editType: 'plot'}, {
        keys: constants.eventDataKeys.concat(['label', 'value'])
    }),

    hovertext: pieAttrs.hovertext,
    hoverinfo: sunburstAttrs.hoverinfo,
    hovertemplate: hovertemplateAttrs({}, {
        keys: constants.eventDataKeys
    }),

    textfont: pieAttrs.textfont,
    insidetextfont: pieAttrs.insidetextfont,
    outsidetextfont: extendFlat({}, pieAttrs.outsidetextfont, {
        description: [
            'Sets the font used for `textinfo` lying outside the sector.',
            'This option refers to the root of the hierarchy',
            'presented on top left corner of a treemap graph.',
            'Please note that if a hierarchy has multiple root nodes,',
            'this option won\'t have any effect and `insidetextfont` would be used.'
        ].join(' ')
    }),

    textposition: {
        valType: 'enumerated',
        values: [
            'top left', 'top center', 'top right',
            'middle left', 'middle center', 'middle right',
            'bottom left', 'bottom center', 'bottom right'
        ],
        dflt: 'top left',
        role: 'style',
        editType: 'plot',
        description: [
            'Sets the positions of the `text` elements.'
        ].join(' ')
    },

    domain: domainAttrs({name: 'treemap', trace: true, editType: 'calc'}),
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/base_plot.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/base_plot.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var plots = __webpack_require__(/*! ../../plots/plots */ "./node_modules/plotly.js/src/plots/plots.js");

exports.name = 'treemap';

exports.plot = function(gd, traces, transitionOpts, makeOnCompleteCallback) {
    plots.plotBasePlot(exports.name, gd, traces, transitionOpts, makeOnCompleteCallback);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    plots.cleanBasePlot(exports.name, newFullData, newFullLayout, oldFullData, oldFullLayout);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/calc.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/calc.js ***!
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



var calc = __webpack_require__(/*! ../sunburst/calc */ "./node_modules/plotly.js/src/traces/sunburst/calc.js");

exports.calc = function(gd, trace) {
    return calc.calc(gd, trace);
};

exports.crossTraceCalc = function(gd) {
    return calc._runCrossTraceCalc('treemap', gd);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/constants.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/constants.js ***!
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



module.exports = {
    CLICK_TRANSITION_TIME: 750,
    CLICK_TRANSITION_EASING: 'poly',
    eventDataKeys: [
        // string
        'currentPath',
        'root',
        'entry',
        // no need to add 'parent' here

        // percentages i.e. ratios
        'percentRoot',
        'percentEntry',
        'percentParent'
    ],
    gapWithPathbar: 1 // i.e. one pixel
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/treemap/attributes.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;
var handleText = __webpack_require__(/*! ../bar/defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").handleText;
var TEXTPAD = __webpack_require__(/*! ../bar/constants */ "./node_modules/plotly.js/src/traces/bar/constants.js").TEXTPAD;

var Colorscale = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js");
var hasColorscale = Colorscale.hasColorscale;
var colorscaleDefaults = Colorscale.handleDefaults;

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var labels = coerce('labels');
    var parents = coerce('parents');

    if(!labels || !labels.length || !parents || !parents.length) {
        traceOut.visible = false;
        return;
    }

    var vals = coerce('values');
    if(vals && vals.length) {
        coerce('branchvalues');
    } else {
        coerce('count');
    }

    coerce('level');
    coerce('maxdepth');

    var packing = coerce('tiling.packing');
    if(packing === 'squarify') {
        coerce('tiling.squarifyratio');
    }

    coerce('tiling.flip');
    coerce('tiling.pad');

    var text = coerce('text');
    coerce('texttemplate');
    if(!traceOut.texttemplate) coerce('textinfo', Array.isArray(text) ? 'text+label' : 'label');

    coerce('hovertext');
    coerce('hovertemplate');

    var hasPathbar = coerce('pathbar.visible');

    var textposition = 'auto';
    handleText(traceIn, traceOut, layout, coerce, textposition, {
        hasPathbar: hasPathbar,
        moduleHasSelected: false,
        moduleHasUnselected: false,
        moduleHasConstrain: false,
        moduleHasCliponaxis: false,
        moduleHasTextangle: false,
        moduleHasInsideanchor: false
    });
    coerce('textposition');
    var bottomText = traceOut.textposition.indexOf('bottom') !== -1;

    var lineWidth = coerce('marker.line.width');
    if(lineWidth) coerce('marker.line.color', layout.paper_bgcolor);

    var colors = coerce('marker.colors');
    var withColorscale = traceOut._hasColorscale = (
        hasColorscale(traceIn, 'marker', 'colors') ||
        (traceIn.marker || {}).coloraxis // N.B. special logic to consider "values" colorscales
    );
    if(withColorscale) {
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'marker.', cLetter: 'c'});
    } else {
        coerce('marker.depthfade', !(colors || []).length);
    }

    var headerSize = traceOut.textfont.size * 2;

    coerce('marker.pad.t', bottomText ? headerSize / 4 : headerSize);
    coerce('marker.pad.l', headerSize / 4);
    coerce('marker.pad.r', headerSize / 4);
    coerce('marker.pad.b', bottomText ? headerSize : headerSize / 4);

    if(withColorscale) {
        colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'marker.', cLetter: 'c'});
    }

    traceOut._hovered = {
        marker: {
            line: {
                width: 2,
                color: Color.contrast(layout.paper_bgcolor)
            }
        }
    };

    if(hasPathbar) {
        // This works even for multi-line labels as treemap pathbar trim out line breaks
        coerce('pathbar.thickness', traceOut.pathbar.textfont.size + 2 * TEXTPAD);

        coerce('pathbar.side');
        coerce('pathbar.edgeshape');
    }

    handleDomainDefaults(traceOut, layout, coerce);

    // do not support transforms for now
    traceOut._length = null;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/draw_ancestors.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/draw_ancestors.js ***!
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



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");

var partition = __webpack_require__(/*! ./partition */ "./node_modules/plotly.js/src/traces/treemap/partition.js");
var styleOne = __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/treemap/style.js").styleOne;
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/treemap/constants.js");
var helpers = __webpack_require__(/*! ../sunburst/helpers */ "./node_modules/plotly.js/src/traces/sunburst/helpers.js");
var attachFxHandlers = __webpack_require__(/*! ../sunburst/fx */ "./node_modules/plotly.js/src/traces/sunburst/fx.js");

var onPathbar = true; // for Ancestors

module.exports = function drawAncestors(gd, cd, entry, slices, opts) {
    var barDifY = opts.barDifY;
    var width = opts.width;
    var height = opts.height;
    var viewX = opts.viewX;
    var viewY = opts.viewY;
    var pathSlice = opts.pathSlice;
    var toMoveInsideSlice = opts.toMoveInsideSlice;
    var strTransform = opts.strTransform;
    var hasTransition = opts.hasTransition;
    var handleSlicesExit = opts.handleSlicesExit;
    var makeUpdateSliceInterpolator = opts.makeUpdateSliceInterpolator;
    var makeUpdateTextInterpolator = opts.makeUpdateTextInterpolator;
    var refRect = {};

    var fullLayout = gd._fullLayout;
    var cd0 = cd[0];
    var trace = cd0.trace;
    var hierarchy = cd0.hierarchy;

    var eachWidth = width / trace._entryDepth;

    var pathIds = helpers.listPath(entry.data, 'id');

    var sliceData = partition(hierarchy.copy(), [width, height], {
        packing: 'dice',
        pad: {
            inner: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    }).descendants();

    // edit slices that show up on graph
    sliceData = sliceData.filter(function(pt) {
        var level = pathIds.indexOf(pt.data.id);
        if(level === -1) return false;

        pt.x0 = eachWidth * level;
        pt.x1 = eachWidth * (level + 1);
        pt.y0 = barDifY;
        pt.y1 = barDifY + height;

        pt.onPathbar = true;

        return true;
    });

    sliceData.reverse();

    slices = slices.data(sliceData, helpers.getPtId);

    slices.enter().append('g')
        .classed('pathbar', true);

    handleSlicesExit(slices, onPathbar, refRect, [width, height], pathSlice);

    slices.order();

    var updateSlices = slices;
    if(hasTransition) {
        updateSlices = updateSlices.transition().each('end', function() {
            // N.B. gd._transitioning is (still) *true* by the time
            // transition updates get here
            var sliceTop = d3.select(this);
            helpers.setSliceCursor(sliceTop, gd, {
                hideOnRoot: false,
                hideOnLeaves: false,
                isTransitioning: false
            });
        });
    }

    updateSlices.each(function(pt) {
        pt._hoverX = viewX(pt.x1 - Math.min(width, height) / 2);
        pt._hoverY = viewY(pt.y1 - height / 2);

        var sliceTop = d3.select(this);

        var slicePath = Lib.ensureSingle(sliceTop, 'path', 'surface', function(s) {
            s.style('pointer-events', 'all');
        });

        if(hasTransition) {
            slicePath.transition().attrTween('d', function(pt2) {
                var interp = makeUpdateSliceInterpolator(pt2, onPathbar, refRect, [width, height]);
                return function(t) { return pathSlice(interp(t)); };
            });
        } else {
            slicePath.attr('d', pathSlice);
        }

        sliceTop
            .call(attachFxHandlers, entry, gd, cd, {
                styleOne: styleOne,
                eventDataKeys: constants.eventDataKeys,
                transitionTime: constants.CLICK_TRANSITION_TIME,
                transitionEasing: constants.CLICK_TRANSITION_EASING
            })
            .call(helpers.setSliceCursor, gd, {
                hideOnRoot: false,
                hideOnLeaves: false,
                isTransitioning: gd._transitioning
            });

        slicePath.call(styleOne, pt, trace, {
            hovered: false
        });

        pt._text = (helpers.getPtLabel(pt) || '').split('<br>').join(' ') || '';

        var sliceTextGroup = Lib.ensureSingle(sliceTop, 'g', 'slicetext');
        var sliceText = Lib.ensureSingle(sliceTextGroup, 'text', '', function(s) {
            // prohibit tex interpretation until we can handle
            // tex and regular text together
            s.attr('data-notex', 1);
        });

        var font = Lib.ensureUniformFontSize(gd, helpers.determineTextFont(trace, pt, fullLayout.font, {
            onPathbar: true
        }));

        sliceText.text(pt._text || ' ') // use one space character instead of a blank string to avoid jumps during transition
            .classed('slicetext', true)
            .attr('text-anchor', 'start')
            .call(Drawing.font, font)
            .call(svgTextUtils.convertToTspans, gd);

        pt.textBB = Drawing.bBox(sliceText.node());
        pt.transform = toMoveInsideSlice(pt, {
            fontSize: font.size,
            onPathbar: true
        });
        pt.transform.fontSize = font.size;

        if(hasTransition) {
            sliceText.transition().attrTween('transform', function(pt2) {
                var interp = makeUpdateTextInterpolator(pt2, onPathbar, refRect, [width, height]);
                return function(t) { return strTransform(interp(t)); };
            });
        } else {
            sliceText.attr('transform', strTransform(pt));
        }
    });
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/draw_descendants.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/draw_descendants.js ***!
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
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");

var partition = __webpack_require__(/*! ./partition */ "./node_modules/plotly.js/src/traces/treemap/partition.js");
var styleOne = __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/treemap/style.js").styleOne;
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/treemap/constants.js");
var helpers = __webpack_require__(/*! ../sunburst/helpers */ "./node_modules/plotly.js/src/traces/sunburst/helpers.js");
var attachFxHandlers = __webpack_require__(/*! ../sunburst/fx */ "./node_modules/plotly.js/src/traces/sunburst/fx.js");
var formatSliceLabel = __webpack_require__(/*! ../sunburst/plot */ "./node_modules/plotly.js/src/traces/sunburst/plot.js").formatSliceLabel;

var onPathbar = false; // for Descendants

module.exports = function drawDescendants(gd, cd, entry, slices, opts) {
    var width = opts.width;
    var height = opts.height;
    var viewX = opts.viewX;
    var viewY = opts.viewY;
    var pathSlice = opts.pathSlice;
    var toMoveInsideSlice = opts.toMoveInsideSlice;
    var strTransform = opts.strTransform;
    var hasTransition = opts.hasTransition;
    var handleSlicesExit = opts.handleSlicesExit;
    var makeUpdateSliceInterpolator = opts.makeUpdateSliceInterpolator;
    var makeUpdateTextInterpolator = opts.makeUpdateTextInterpolator;
    var prevEntry = opts.prevEntry;
    var refRect = {};

    var fullLayout = gd._fullLayout;
    var cd0 = cd[0];
    var trace = cd0.trace;

    var hasLeft = trace.textposition.indexOf('left') !== -1;
    var hasRight = trace.textposition.indexOf('right') !== -1;
    var hasBottom = trace.textposition.indexOf('bottom') !== -1;

    var noRoomForHeader = (!hasBottom && !trace.marker.pad.t) || (hasBottom && !trace.marker.pad.b);

    // N.B. slice data isn't the calcdata,
    // grab corresponding calcdata item in sliceData[i].data.data
    var allData = partition(entry, [width, height], {
        packing: trace.tiling.packing,
        squarifyratio: trace.tiling.squarifyratio,
        flipX: trace.tiling.flip.indexOf('x') > -1,
        flipY: trace.tiling.flip.indexOf('y') > -1,
        pad: {
            inner: trace.tiling.pad,
            top: trace.marker.pad.t,
            left: trace.marker.pad.l,
            right: trace.marker.pad.r,
            bottom: trace.marker.pad.b,
        }
    });

    var sliceData = allData.descendants();

    var minVisibleDepth = Infinity;
    var maxVisibleDepth = -Infinity;
    sliceData.forEach(function(pt) {
        var depth = pt.depth;
        if(depth >= trace._maxDepth) {
            // hide slices that won't show up on graph
            pt.x0 = pt.x1 = (pt.x0 + pt.x1) / 2;
            pt.y0 = pt.y1 = (pt.y0 + pt.y1) / 2;
        } else {
            minVisibleDepth = Math.min(minVisibleDepth, depth);
            maxVisibleDepth = Math.max(maxVisibleDepth, depth);
        }
    });

    slices = slices.data(sliceData, helpers.getPtId);

    trace._maxVisibleLayers = isFinite(maxVisibleDepth) ? maxVisibleDepth - minVisibleDepth + 1 : 0;

    slices.enter().append('g')
        .classed('slice', true);

    handleSlicesExit(slices, onPathbar, refRect, [width, height], pathSlice);

    slices.order();

    // next coords of previous entry
    var nextOfPrevEntry = null;
    if(hasTransition && prevEntry) {
        var prevEntryId = helpers.getPtId(prevEntry);
        slices.each(function(pt) {
            if(nextOfPrevEntry === null && (helpers.getPtId(pt) === prevEntryId)) {
                nextOfPrevEntry = {
                    x0: pt.x0,
                    x1: pt.x1,
                    y0: pt.y0,
                    y1: pt.y1
                };
            }
        });
    }

    var getRefRect = function() {
        return nextOfPrevEntry || {
            x0: 0,
            x1: width,
            y0: 0,
            y1: height
        };
    };

    var updateSlices = slices;
    if(hasTransition) {
        updateSlices = updateSlices.transition().each('end', function() {
            // N.B. gd._transitioning is (still) *true* by the time
            // transition updates get here
            var sliceTop = d3.select(this);
            helpers.setSliceCursor(sliceTop, gd, {
                hideOnRoot: true,
                hideOnLeaves: false,
                isTransitioning: false
            });
        });
    }

    updateSlices.each(function(pt) {
        var isHeader = helpers.isHeader(pt, trace);

        pt._hoverX = viewX(pt.x1 - trace.marker.pad.r),
        pt._hoverY = hasBottom ?
                viewY(pt.y1 - trace.marker.pad.b / 2) :
                viewY(pt.y0 + trace.marker.pad.t / 2);

        var sliceTop = d3.select(this);

        var slicePath = Lib.ensureSingle(sliceTop, 'path', 'surface', function(s) {
            s.style('pointer-events', 'all');
        });

        if(hasTransition) {
            slicePath.transition().attrTween('d', function(pt2) {
                var interp = makeUpdateSliceInterpolator(pt2, onPathbar, getRefRect(), [width, height]);
                return function(t) { return pathSlice(interp(t)); };
            });
        } else {
            slicePath.attr('d', pathSlice);
        }

        sliceTop
            .call(attachFxHandlers, entry, gd, cd, {
                styleOne: styleOne,
                eventDataKeys: constants.eventDataKeys,
                transitionTime: constants.CLICK_TRANSITION_TIME,
                transitionEasing: constants.CLICK_TRANSITION_EASING
            })
            .call(helpers.setSliceCursor, gd, { isTransitioning: gd._transitioning });

        slicePath.call(styleOne, pt, trace, {
            hovered: false
        });

        if(pt.x0 === pt.x1 || pt.y0 === pt.y1) {
            pt._text = '';
        } else {
            if(isHeader) {
                pt._text = noRoomForHeader ? '' : helpers.getPtLabel(pt) || '';
            } else {
                pt._text = formatSliceLabel(pt, entry, trace, cd, fullLayout) || '';
            }
        }

        var sliceTextGroup = Lib.ensureSingle(sliceTop, 'g', 'slicetext');
        var sliceText = Lib.ensureSingle(sliceTextGroup, 'text', '', function(s) {
            // prohibit tex interpretation until we can handle
            // tex and regular text together
            s.attr('data-notex', 1);
        });

        var font = Lib.ensureUniformFontSize(gd, helpers.determineTextFont(trace, pt, fullLayout.font));

        sliceText.text(pt._text || ' ') // use one space character instead of a blank string to avoid jumps during transition
            .classed('slicetext', true)
            .attr('text-anchor', hasRight ? 'end' : (hasLeft || isHeader) ? 'start' : 'middle')
            .call(Drawing.font, font)
            .call(svgTextUtils.convertToTspans, gd);

        pt.textBB = Drawing.bBox(sliceText.node());
        pt.transform = toMoveInsideSlice(pt, {
            fontSize: font.size,
            isHeader: isHeader
        });
        pt.transform.fontSize = font.size;

        if(hasTransition) {
            sliceText.transition().attrTween('transform', function(pt2) {
                var interp = makeUpdateTextInterpolator(pt2, onPathbar, getRefRect(), [width, height]);
                return function(t) { return strTransform(interp(t)); };
            });
        } else {
            sliceText.attr('transform', strTransform(pt));
        }
    });

    return nextOfPrevEntry;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/index.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/index.js ***!
  \************************************************************/
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
    moduleType: 'trace',
    name: 'treemap',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/treemap/base_plot.js"),
    categories: [],
    animatable: true,

    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/treemap/attributes.js"),
    layoutAttributes: __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/treemap/layout_attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/treemap/defaults.js"),
    supplyLayoutDefaults: __webpack_require__(/*! ./layout_defaults */ "./node_modules/plotly.js/src/traces/treemap/layout_defaults.js"),

    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/treemap/calc.js").calc,
    crossTraceCalc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/treemap/calc.js").crossTraceCalc,

    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/treemap/plot.js"),
    style: __webpack_require__(/*! ./style */ "./node_modules/plotly.js/src/traces/treemap/style.js").style,

    colorbar: __webpack_require__(/*! ../scatter/marker_colorbar */ "./node_modules/plotly.js/src/traces/scatter/marker_colorbar.js"),

    meta: {
        description: [
            'Visualize hierarchal data from leaves (and/or outer branches) towards root',
            'with rectangles. The treemap sectors are determined by the entries in',
            '*labels* or *ids* and in *parents*.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/layout_attributes.js":
/*!************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/layout_attributes.js ***!
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



module.exports = {
    treemapcolorway: {
        valType: 'colorlist',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the default treemap slice colors. Defaults to the main',
            '`colorway` used for trace colors. If you specify a new',
            'list here it can still be extended with lighter and darker',
            'colors, see `extendtreemapcolors`.'
        ].join(' ')
    },
    extendtreemapcolors: {
        valType: 'boolean',
        dflt: true,
        role: 'style',
        editType: 'calc',
        description: [
            'If `true`, the treemap slice colors (whether given by `treemapcolorway` or',
            'inherited from `colorway`) will be extended to three times its',
            'original length by first repeating every color 20% lighter then',
            'each color 20% darker. This is intended to reduce the likelihood',
            'of reusing the same color when you have many slices, but you can',
            'set `false` to disable.',
            'Colors provided in the trace, using `marker.colors`, are never',
            'extended.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/layout_defaults.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/layout_defaults.js ***!
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
var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/traces/treemap/layout_attributes.js");

module.exports = function supplyLayoutDefaults(layoutIn, layoutOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(layoutIn, layoutOut, layoutAttributes, attr, dflt);
    }
    coerce('treemapcolorway', layoutOut.colorway);
    coerce('extendtreemapcolors');
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/partition.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/partition.js ***!
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



var d3Hierarchy = __webpack_require__(/*! d3-hierarchy */ "./node_modules/d3-hierarchy/src/index.js");

module.exports = function partition(entry, size, opts) {
    var flipX = opts.flipX;
    var flipY = opts.flipY;
    var swapXY = opts.packing === 'dice-slice';

    var top = opts.pad[flipY ? 'bottom' : 'top'];
    var left = opts.pad[flipX ? 'right' : 'left'];
    var right = opts.pad[flipX ? 'left' : 'right'];
    var bottom = opts.pad[flipY ? 'top' : 'bottom'];

    var tmp;
    if(swapXY) {
        tmp = left;
        left = top;
        top = tmp;

        tmp = right;
        right = bottom;
        bottom = tmp;
    }

    var result = d3Hierarchy
        .treemap()
        .tile(getTilingMethod(opts.packing, opts.squarifyratio))
        .paddingInner(opts.pad.inner)
        .paddingLeft(left)
        .paddingRight(right)
        .paddingTop(top)
        .paddingBottom(bottom)
        .size(
            swapXY ? [size[1], size[0]] : size
        )(entry);

    if(swapXY || flipX || flipY) {
        flipTree(result, size, {
            swapXY: swapXY,
            flipX: flipX,
            flipY: flipY
        });
    }
    return result;
};

function getTilingMethod(key, squarifyratio) {
    switch(key) {
        case 'squarify':
            return d3Hierarchy.treemapSquarify.ratio(squarifyratio);
        case 'binary':
            return d3Hierarchy.treemapBinary;
        case 'dice':
            return d3Hierarchy.treemapDice;
        case 'slice':
            return d3Hierarchy.treemapSlice;
        default: // i.e. 'slice-dice' | 'dice-slice'
            return d3Hierarchy.treemapSliceDice;
    }
}

function flipTree(node, size, opts) {
    var tmp;

    if(opts.swapXY) {
        // swap x0 and y0
        tmp = node.x0;
        node.x0 = node.y0;
        node.y0 = tmp;

        // swap x1 and y1
        tmp = node.x1;
        node.x1 = node.y1;
        node.y1 = tmp;
    }

    if(opts.flipX) {
        tmp = node.x0;
        node.x0 = size[0] - node.x1;
        node.x1 = size[0] - tmp;
    }

    if(opts.flipY) {
        tmp = node.y0;
        node.y0 = size[1] - node.y1;
        node.y1 = size[1] - tmp;
    }

    var children = node.children;
    if(children) {
        for(var i = 0; i < children.length; i++) {
            flipTree(children[i], size, opts);
        }
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/plot.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/plot.js ***!
  \***********************************************************/
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

var helpers = __webpack_require__(/*! ../sunburst/helpers */ "./node_modules/plotly.js/src/traces/sunburst/helpers.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var TEXTPAD = __webpack_require__(/*! ../bar/constants */ "./node_modules/plotly.js/src/traces/bar/constants.js").TEXTPAD;
var barPlot = __webpack_require__(/*! ../bar/plot */ "./node_modules/plotly.js/src/traces/bar/plot.js");
var toMoveInsideBar = barPlot.toMoveInsideBar;
var uniformText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js");
var recordMinTextSize = uniformText.recordMinTextSize;
var clearMinTextSize = uniformText.clearMinTextSize;
var resizeText = __webpack_require__(/*! ../bar/style */ "./node_modules/plotly.js/src/traces/bar/style.js").resizeText;
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/treemap/constants.js");
var drawDescendants = __webpack_require__(/*! ./draw_descendants */ "./node_modules/plotly.js/src/traces/treemap/draw_descendants.js");
var drawAncestors = __webpack_require__(/*! ./draw_ancestors */ "./node_modules/plotly.js/src/traces/treemap/draw_ancestors.js");

module.exports = function(gd, cdmodule, transitionOpts, makeOnCompleteCallback) {
    var fullLayout = gd._fullLayout;
    var layer = fullLayout._treemaplayer;
    var join, onComplete;

    // If transition config is provided, then it is only a partial replot and traces not
    // updated are removed.
    var isFullReplot = !transitionOpts;

    clearMinTextSize('treemap', fullLayout);

    join = layer.selectAll('g.trace.treemap')
        .data(cdmodule, function(cd) { return cd[0].trace.uid; });

    join.enter().append('g')
        .classed('trace', true)
        .classed('treemap', true);

    join.order();

    if(!fullLayout.uniformtext.mode && helpers.hasTransition(transitionOpts)) {
        if(makeOnCompleteCallback) {
            // If it was passed a callback to register completion, make a callback. If
            // this is created, then it must be executed on completion, otherwise the
            // pos-transition redraw will not execute:
            onComplete = makeOnCompleteCallback();
        }

        var transition = d3.transition()
            .duration(transitionOpts.duration)
            .ease(transitionOpts.easing)
            .each('end', function() { onComplete && onComplete(); })
            .each('interrupt', function() { onComplete && onComplete(); });

        transition.each(function() {
            // Must run the selection again since otherwise enters/updates get grouped together
            // and these get executed out of order. Except we need them in order!
            layer.selectAll('g.trace').each(function(cd) {
                plotOne(gd, cd, this, transitionOpts);
            });
        });
    } else {
        join.each(function(cd) {
            plotOne(gd, cd, this, transitionOpts);
        });

        if(fullLayout.uniformtext.mode) {
            resizeText(gd, fullLayout._treemaplayer.selectAll('.trace'), 'treemap');
        }
    }

    if(isFullReplot) {
        join.exit().remove();
    }
};

function getKey(pt) {
    return helpers.isHierarchyRoot(pt) ?
        '' : // don't use the dummyId
        helpers.getPtId(pt);
}

function plotOne(gd, cd, element, transitionOpts) {
    var fullLayout = gd._fullLayout;
    var cd0 = cd[0];
    var trace = cd0.trace;
    var hierarchy = cd0.hierarchy;
    var entry = helpers.findEntryWithLevel(hierarchy, trace.level);

    var gTrace = d3.select(element);
    var selAncestors = gTrace.selectAll('g.pathbar');
    var selDescendants = gTrace.selectAll('g.slice');

    if(!entry) {
        selAncestors.remove();
        selDescendants.remove();
        return;
    }

    var isRoot = helpers.isHierarchyRoot(entry);
    var hasTransition = !fullLayout.uniformtext.mode && helpers.hasTransition(transitionOpts);

    var maxDepth = helpers.getMaxDepth(trace);
    var hasVisibleDepth = function(pt) {
        return pt.data.depth - entry.data.depth < maxDepth;
    };

    var gs = fullLayout._size;
    var domain = trace.domain;

    var vpw = gs.w * (domain.x[1] - domain.x[0]);
    var vph = gs.h * (domain.y[1] - domain.y[0]);
    var barW = vpw;
    var barH = trace.pathbar.thickness;
    var barPad = trace.marker.line.width + constants.gapWithPathbar;
    var barDifY = !trace.pathbar.visible ? 0 :
        trace.pathbar.side.indexOf('bottom') > -1 ? vph + barPad : -(barH + barPad);

    var pathbarOrigin = {
        x0: barW, // slide to the right
        x1: barW,
        y0: barDifY,
        y1: barDifY + barH
    };

    var findClosestEdge = function(pt, ref, size) {
        var e = trace.tiling.pad;
        var isLeftOfRect = function(x) { return x - e <= ref.x0; };
        var isRightOfRect = function(x) { return x + e >= ref.x1; };
        var isBottomOfRect = function(y) { return y - e <= ref.y0; };
        var isTopOfRect = function(y) { return y + e >= ref.y1; };

        return {
            x0: isLeftOfRect(pt.x0 - e) ? 0 : isRightOfRect(pt.x0 - e) ? size[0] : pt.x0,
            x1: isLeftOfRect(pt.x1 + e) ? 0 : isRightOfRect(pt.x1 + e) ? size[0] : pt.x1,
            y0: isBottomOfRect(pt.y0 - e) ? 0 : isTopOfRect(pt.y0 - e) ? size[1] : pt.y0,
            y1: isBottomOfRect(pt.y1 + e) ? 0 : isTopOfRect(pt.y1 + e) ? size[1] : pt.y1
        };
    };

    // stash of 'previous' position data used by tweening functions
    var prevEntry = null;
    var prevLookupPathbar = {};
    var prevLookupSlices = {};
    var nextOfPrevEntry = null;
    var getPrev = function(pt, onPathbar) {
        return onPathbar ?
            prevLookupPathbar[getKey(pt)] :
            prevLookupSlices[getKey(pt)];
    };

    var getOrigin = function(pt, onPathbar, refRect, size) {
        if(onPathbar) {
            return prevLookupPathbar[getKey(hierarchy)] || pathbarOrigin;
        } else {
            var ref = prevLookupSlices[trace.level] || refRect;

            if(hasVisibleDepth(pt)) { // case of an empty object - happens when maxdepth is set
                return findClosestEdge(pt, ref, size);
            }
        }
        return {};
    };

    // N.B. handle multiple-root special case
    if(cd0.hasMultipleRoots && isRoot) {
        maxDepth++;
    }

    trace._maxDepth = maxDepth;
    trace._backgroundColor = fullLayout.paper_bgcolor;
    trace._entryDepth = entry.data.depth;
    trace._atRootLevel = isRoot;

    var cenX = -vpw / 2 + gs.l + gs.w * (domain.x[1] + domain.x[0]) / 2;
    var cenY = -vph / 2 + gs.t + gs.h * (1 - (domain.y[1] + domain.y[0]) / 2);

    var viewMapX = function(x) { return cenX + x; };
    var viewMapY = function(y) { return cenY + y; };

    var barY0 = viewMapY(0);
    var barX0 = viewMapX(0);

    var viewBarX = function(x) { return barX0 + x; };
    var viewBarY = function(y) { return barY0 + y; };

    function pos(x, y) {
        return x + ',' + y;
    }

    var xStart = viewBarX(0);
    var limitX0 = function(p) { p.x = Math.max(xStart, p.x); };

    var edgeshape = trace.pathbar.edgeshape;

    // pathbar(directory) path generation fn
    var pathAncestor = function(d) {
        var _x0 = viewBarX(Math.max(Math.min(d.x0, d.x0), 0));
        var _x1 = viewBarX(Math.min(Math.max(d.x1, d.x1), barW));
        var _y0 = viewBarY(d.y0);
        var _y1 = viewBarY(d.y1);

        var halfH = barH / 2;

        var pL = {};
        var pR = {};

        pL.x = _x0;
        pR.x = _x1;

        pL.y = pR.y = (_y0 + _y1) / 2;

        var pA = {x: _x0, y: _y0};
        var pB = {x: _x1, y: _y0};
        var pC = {x: _x1, y: _y1};
        var pD = {x: _x0, y: _y1};

        if(edgeshape === '>') {
            pA.x -= halfH;
            pB.x -= halfH;
            pC.x -= halfH;
            pD.x -= halfH;
        } else if(edgeshape === '/') {
            pC.x -= halfH;
            pD.x -= halfH;
            pL.x -= halfH / 2;
            pR.x -= halfH / 2;
        } else if(edgeshape === '\\') {
            pA.x -= halfH;
            pB.x -= halfH;
            pL.x -= halfH / 2;
            pR.x -= halfH / 2;
        } else if(edgeshape === '<') {
            pL.x -= halfH;
            pR.x -= halfH;
        }

        limitX0(pA);
        limitX0(pD);
        limitX0(pL);

        limitX0(pB);
        limitX0(pC);
        limitX0(pR);

        return (
           'M' + pos(pA.x, pA.y) +
           'L' + pos(pB.x, pB.y) +
           'L' + pos(pR.x, pR.y) +
           'L' + pos(pC.x, pC.y) +
           'L' + pos(pD.x, pD.y) +
           'L' + pos(pL.x, pL.y) +
           'Z'
        );
    };

    // slice path generation fn
    var pathDescendant = function(d) {
        var _x0 = viewMapX(d.x0);
        var _x1 = viewMapX(d.x1);
        var _y0 = viewMapY(d.y0);
        var _y1 = viewMapY(d.y1);

        var dx = _x1 - _x0;
        var dy = _y1 - _y0;
        if(!dx || !dy) return '';

        var FILLET = 0; // TODO: may expose this constant

        var r = (
            dx > 2 * FILLET &&
            dy > 2 * FILLET
        ) ? FILLET : 0;

        var arc = function(rx, ry) { return r ? 'a' + pos(r, r) + ' 0 0 1 ' + pos(rx, ry) : ''; };

        return (
           'M' + pos(_x0, _y0 + r) +
           arc(r, -r) +
           'L' + pos(_x1 - r, _y0) +
           arc(r, r) +
           'L' + pos(_x1, _y1 - r) +
           arc(-r, r) +
           'L' + pos(_x0 + r, _y1) +
           arc(-r, -r) + 'Z'
        );
    };

    var toMoveInsideSlice = function(pt, opts) {
        var x0 = pt.x0;
        var x1 = pt.x1;
        var y0 = pt.y0;
        var y1 = pt.y1;
        var textBB = pt.textBB;

        var hasFlag = function(f) { return trace.textposition.indexOf(f) !== -1; };

        var hasBottom = hasFlag('bottom');
        var hasTop = hasFlag('top') || (opts.isHeader && !hasBottom);

        var anchor =
            hasTop ? 'start' :
            hasBottom ? 'end' : 'middle';

        var hasRight = hasFlag('right');
        var hasLeft = hasFlag('left') || opts.onPathbar;

        var leftToRight =
            hasLeft ? -1 :
            hasRight ? 1 : 0;

        var pad = trace.marker.pad;
        if(opts.isHeader) {
            x0 += pad.l - TEXTPAD;
            x1 -= pad.r - TEXTPAD;
            if(x0 >= x1) {
                var mid = (x0 + x1) / 2;
                x0 = mid;
                x1 = mid;
            }

            // limit the drawing area for headers
            var limY;
            if(hasBottom) {
                limY = y1 - pad.b;
                if(y0 < limY && limY < y1) y0 = limY;
            } else {
                limY = y0 + pad.t;
                if(y0 < limY && limY < y1) y1 = limY;
            }
        }

        // position the text relative to the slice
        var transform = toMoveInsideBar(x0, x1, y0, y1, textBB, {
            isHorizontal: false,
            constrained: true,
            angle: 0,
            anchor: anchor,
            leftToRight: leftToRight
        });
        transform.fontSize = opts.fontSize;

        transform.targetX = viewMapX(transform.targetX);
        transform.targetY = viewMapY(transform.targetY);

        if(isNaN(transform.targetX) || isNaN(transform.targetY)) {
            return {};
        }

        if(x0 !== x1 && y0 !== y1) {
            recordMinTextSize(trace.type, transform, fullLayout);
        }

        return {
            scale: transform.scale,
            rotate: transform.rotate,
            textX: transform.textX,
            textY: transform.textY,
            anchorX: transform.anchorX,
            anchorY: transform.anchorY,
            targetX: transform.targetX,
            targetY: transform.targetY
        };
    };

    var interpFromParent = function(pt, onPathbar) {
        var parentPrev;
        var i = 0;
        var Q = pt;
        while(!parentPrev && i < maxDepth) { // loop to find a parent/grandParent on the previous graph
            i++;
            Q = Q.parent;
            if(Q) {
                parentPrev = getPrev(Q, onPathbar);
            } else i = maxDepth;
        }
        return parentPrev || {};
    };

    var makeExitSliceInterpolator = function(pt, onPathbar, refRect, size) {
        var prev = getPrev(pt, onPathbar);
        var next;

        if(onPathbar) {
            next = pathbarOrigin;
        } else {
            var entryPrev = getPrev(entry, onPathbar);
            if(entryPrev) {
                // 'entryPrev' is here has the previous coordinates of the entry
                // node, which corresponds to the last "clicked" node when zooming in
                next = findClosestEdge(pt, entryPrev, size);
            } else {
                // this happens when maxdepth is set, when leaves must
                // be removed and the entry is new (i.e. does not have a 'prev' object)
                next = {};
            }
        }

        return d3.interpolate(prev, next);
    };

    var makeUpdateSliceInterpolator = function(pt, onPathbar, refRect, size) {
        var prev0 = getPrev(pt, onPathbar);
        var prev;

        if(prev0) {
            // if pt already on graph, this is easy
            prev = prev0;
        } else {
            // for new pts:
            if(onPathbar) {
                prev = pathbarOrigin;
            } else {
                if(prevEntry) {
                    // if trace was visible before
                    if(pt.parent) {
                        var ref = nextOfPrevEntry || refRect;

                        if(ref && !onPathbar) {
                            prev = findClosestEdge(pt, ref, size);
                        } else {
                            // if new leaf (when maxdepth is set),
                            // grow it from its parent node
                            prev = {};
                            Lib.extendFlat(prev, interpFromParent(pt, onPathbar));
                        }
                    } else {
                        prev = pt;
                    }
                } else {
                    prev = {};
                }
            }
        }

        return d3.interpolate(prev, {
            x0: pt.x0,
            x1: pt.x1,
            y0: pt.y0,
            y1: pt.y1
        });
    };

    var makeUpdateTextInterpolator = function(pt, onPathbar, refRect, size) {
        var prev0 = getPrev(pt, onPathbar);
        var prev = {};
        var origin = getOrigin(pt, onPathbar, refRect, size);

        Lib.extendFlat(prev, {
            transform: toMoveInsideSlice({
                x0: origin.x0,
                x1: origin.x1,
                y0: origin.y0,
                y1: origin.y1,
                textBB: pt.textBB,
                _text: pt._text
            }, {
                isHeader: helpers.isHeader(pt, trace)
            })
        });

        if(prev0) {
            // if pt already on graph, this is easy
            prev = prev0;
        } else {
            // for new pts:
            if(pt.parent) {
                Lib.extendFlat(prev, interpFromParent(pt, onPathbar));
            }
        }

        var transform = pt.transform;
        if(pt.x0 !== pt.x1 && pt.y0 !== pt.y1) {
            recordMinTextSize(trace.type, transform, fullLayout);
        }

        return d3.interpolate(prev, {
            transform: {
                scale: transform.scale,
                rotate: transform.rotate,
                textX: transform.textX,
                textY: transform.textY,
                anchorX: transform.anchorX,
                anchorY: transform.anchorY,
                targetX: transform.targetX,
                targetY: transform.targetY
            }
        });
    };

    var handleSlicesExit = function(slices, onPathbar, refRect, size, pathSlice) {
        var width = size[0];
        var height = size[1];

        if(hasTransition) {
            slices.exit().transition()
                .each(function() {
                    var sliceTop = d3.select(this);

                    var slicePath = sliceTop.select('path.surface');
                    slicePath.transition().attrTween('d', function(pt2) {
                        var interp = makeExitSliceInterpolator(pt2, onPathbar, refRect, [width, height]);
                        return function(t) { return pathSlice(interp(t)); };
                    });

                    var sliceTextGroup = sliceTop.select('g.slicetext');
                    sliceTextGroup.attr('opacity', 0);
                })
                .remove();
        } else {
            slices.exit().remove();
        }
    };

    var strTransform = function(d) {
        var transform = d.transform;

        if(d.x0 !== d.x1 && d.y0 !== d.y1) {
            recordMinTextSize(trace.type, transform, fullLayout);
        }

        return Lib.getTextTransform({
            textX: transform.textX,
            textY: transform.textY,
            anchorX: transform.anchorX,
            anchorY: transform.anchorY,
            targetX: transform.targetX,
            targetY: transform.targetY,
            scale: transform.scale,
            rotate: transform.rotate
        });
    };

    if(hasTransition) {
        // Important: do this before binding new sliceData!

        selAncestors.each(function(pt) {
            prevLookupPathbar[getKey(pt)] = {
                x0: pt.x0,
                x1: pt.x1,
                y0: pt.y0,
                y1: pt.y1
            };

            if(pt.transform) {
                prevLookupPathbar[getKey(pt)].transform = {
                    textX: pt.transform.textX,
                    textY: pt.transform.textY,
                    anchorX: pt.transform.anchorX,
                    anchorY: pt.transform.anchorY,
                    targetX: pt.transform.targetX,
                    targetY: pt.transform.targetY,
                    scale: pt.transform.scale,
                    rotate: pt.transform.rotate
                };
            }
        });

        selDescendants.each(function(pt) {
            prevLookupSlices[getKey(pt)] = {
                x0: pt.x0,
                x1: pt.x1,
                y0: pt.y0,
                y1: pt.y1
            };

            if(pt.transform) {
                prevLookupSlices[getKey(pt)].transform = {
                    textX: pt.transform.textX,
                    textY: pt.transform.textY,
                    anchorX: pt.transform.anchorX,
                    anchorY: pt.transform.anchorY,
                    targetX: pt.transform.targetX,
                    targetY: pt.transform.targetY,
                    scale: pt.transform.scale,
                    rotate: pt.transform.rotate
                };
            }

            if(!prevEntry && helpers.isEntry(pt)) {
                prevEntry = pt;
            }
        });
    }

    nextOfPrevEntry = drawDescendants(gd, cd, entry, selDescendants, {
        width: vpw,
        height: vph,

        viewX: viewMapX,
        viewY: viewMapY,

        pathSlice: pathDescendant,
        toMoveInsideSlice: toMoveInsideSlice,

        prevEntry: prevEntry,
        makeUpdateSliceInterpolator: makeUpdateSliceInterpolator,
        makeUpdateTextInterpolator: makeUpdateTextInterpolator,

        handleSlicesExit: handleSlicesExit,
        hasTransition: hasTransition,
        strTransform: strTransform
    });

    if(trace.pathbar.visible) {
        drawAncestors(gd, cd, entry, selAncestors, {
            barDifY: barDifY,
            width: barW,
            height: barH,

            viewX: viewBarX,
            viewY: viewBarY,

            pathSlice: pathAncestor,
            toMoveInsideSlice: toMoveInsideSlice,

            makeUpdateSliceInterpolator: makeUpdateSliceInterpolator,
            makeUpdateTextInterpolator: makeUpdateTextInterpolator,

            handleSlicesExit: handleSlicesExit,
            hasTransition: hasTransition,
            strTransform: strTransform
        });
    } else {
        selAncestors.remove();
    }
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/treemap/style.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/treemap/style.js ***!
  \************************************************************/
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
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var helpers = __webpack_require__(/*! ../sunburst/helpers */ "./node_modules/plotly.js/src/traces/sunburst/helpers.js");
var resizeText = __webpack_require__(/*! ../bar/uniform_text */ "./node_modules/plotly.js/src/traces/bar/uniform_text.js").resizeText;

function style(gd) {
    var s = gd._fullLayout._treemaplayer.selectAll('.trace');
    resizeText(gd, s, 'treemap');

    s.each(function(cd) {
        var gTrace = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;

        gTrace.style('opacity', trace.opacity);

        gTrace.selectAll('path.surface').each(function(pt) {
            d3.select(this).call(styleOne, pt, trace, {
                hovered: false
            });
        });
    });
}

function styleOne(s, pt, trace, opts) {
    var hovered = (opts || {}).hovered;
    var cdi = pt.data.data;
    var ptNumber = cdi.i;
    var lineColor;
    var lineWidth;
    var fillColor = cdi.color;
    var isRoot = helpers.isHierarchyRoot(pt);
    var opacity = 1;

    if(hovered) {
        lineColor = trace._hovered.marker.line.color;
        lineWidth = trace._hovered.marker.line.width;
    } else {
        if(isRoot && fillColor === 'rgba(0,0,0,0)') {
            opacity = 0;
            lineColor = 'rgba(0,0,0,0)';
            lineWidth = 0;
        } else {
            lineColor = Lib.castOption(trace, ptNumber, 'marker.line.color') || Color.defaultLine;
            lineWidth = Lib.castOption(trace, ptNumber, 'marker.line.width') || 0;

            if(!trace._hasColorscale && !pt.onPathbar) {
                var depthfade = trace.marker.depthfade;
                if(depthfade) {
                    var fadedColor = Color.combine(Color.addOpacity(trace._backgroundColor, 0.75), fillColor);
                    var n;

                    if(depthfade === true) {
                        var maxDepth = helpers.getMaxDepth(trace);
                        if(isFinite(maxDepth)) {
                            if(helpers.isLeaf(pt)) {
                                n = 0;
                            } else {
                                n = (trace._maxVisibleLayers) - (pt.data.depth - trace._entryDepth);
                            }
                        } else {
                            n = pt.data.height + 1;
                        }
                    } else { // i.e. case of depthfade === 'reversed'
                        n = pt.data.depth - trace._entryDepth;
                        if(!trace._atRootLevel) n++;
                    }

                    if(n > 0) {
                        for(var i = 0; i < n; i++) {
                            var ratio = 0.5 * i / n;
                            fillColor = Color.combine(Color.addOpacity(fadedColor, ratio), fillColor);
                        }
                    }
                }
            }
        }
    }

    s.style('stroke-width', lineWidth)
        .call(Color.fill, fillColor)
        .call(Color.stroke, lineColor)
        .style('opacity', opacity);
}

module.exports = {
    style: style,
    styleOne: styleOne
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvdHJlZW1hcC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3RyZWVtYXAvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3RyZWVtYXAvYmFzZV9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdHJlZW1hcC9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdHJlZW1hcC9jb25zdGFudHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy90cmVlbWFwL2RlZmF1bHRzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdHJlZW1hcC9kcmF3X2FuY2VzdG9ycy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3RyZWVtYXAvZHJhd19kZXNjZW5kYW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3RyZWVtYXAvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy90cmVlbWFwL2xheW91dF9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdHJlZW1hcC9sYXlvdXRfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy90cmVlbWFwL3BhcnRpdGlvbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3RyZWVtYXAvcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3RyZWVtYXAvc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIseUhBQWlEOzs7Ozs7Ozs7Ozs7QUNWakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIseUJBQXlCLDBJQUE2RDtBQUN0Rix3QkFBd0IseUlBQTREOztBQUVwRixzQkFBc0IsbUJBQU8sQ0FBQyxnSEFBd0M7QUFDdEUsa0JBQWtCLHdHQUF3QztBQUMxRCxlQUFlLG1CQUFPLENBQUMsZ0ZBQW1CO0FBQzFDLG9CQUFvQixtQkFBTyxDQUFDLDBGQUF3QjtBQUNwRCxnQkFBZ0IsbUJBQU8sQ0FBQyw2RUFBYTtBQUNyQyxpQkFBaUIsb0dBQXNDOztBQUV2RDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBLFNBQVM7O0FBRVQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDs7QUFFQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVCwrQkFBK0I7QUFDL0I7QUFDQSxTQUFTOztBQUVUO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsaUJBQWlCO0FBQ3REO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0Esa0NBQWtDO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwseUJBQXlCLCtDQUErQztBQUN4RTs7Ozs7Ozs7Ozs7O0FDaFJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxzRUFBbUI7O0FBRXZDLFlBQVk7O0FBRVosWUFBWTtBQUNaO0FBQ0E7O0FBRUEsYUFBYTtBQUNiO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixXQUFXLG1CQUFPLENBQUMsOEVBQWtCOztBQUVyQyxZQUFZO0FBQ1o7QUFDQTs7QUFFQSxzQkFBc0I7QUFDdEI7QUFDQTs7Ozs7Ozs7Ozs7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixpQkFBaUIsbUJBQU8sQ0FBQywrRUFBYztBQUN2QyxZQUFZLG1CQUFPLENBQUMsc0ZBQXdCO0FBQzVDLDJCQUEyQixzR0FBc0M7QUFDakUsaUJBQWlCLDRHQUFxQztBQUN0RCxjQUFjLDJHQUFtQzs7QUFFakQsaUJBQWlCLG1CQUFPLENBQUMsZ0dBQTZCO0FBQ3REO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLCtEQUErRCxnQ0FBZ0M7QUFDL0YsS0FBSztBQUNMO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrREFBK0QsZ0NBQWdDO0FBQy9GOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGNBQWMsbUJBQU8sQ0FBQywwRkFBMEI7QUFDaEQsbUJBQW1CLG1CQUFPLENBQUMsb0ZBQTBCOztBQUVyRCxnQkFBZ0IsbUJBQU8sQ0FBQyw2RUFBYTtBQUNyQyxlQUFlLG1HQUEyQjtBQUMxQyxnQkFBZ0IsbUJBQU8sQ0FBQyw2RUFBYTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsb0ZBQXFCO0FBQzNDLHVCQUF1QixtQkFBTyxDQUFDLDBFQUFnQjs7QUFFL0MscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQSxvQ0FBb0MsNkJBQTZCO0FBQ2pFLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGdDQUFnQztBQUNwRSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7Ozs7Ozs7Ozs7OztBQ3pLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixTQUFTLG1CQUFPLENBQUMsbUNBQUk7QUFDckIsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGNBQWMsbUJBQU8sQ0FBQywwRkFBMEI7QUFDaEQsbUJBQW1CLG1CQUFPLENBQUMsb0ZBQTBCOztBQUVyRCxnQkFBZ0IsbUJBQU8sQ0FBQyw2RUFBYTtBQUNyQyxlQUFlLG1HQUEyQjtBQUMxQyxnQkFBZ0IsbUJBQU8sQ0FBQyw2RUFBYTtBQUNyQyxjQUFjLG1CQUFPLENBQUMsb0ZBQXFCO0FBQzNDLHVCQUF1QixtQkFBTyxDQUFDLDBFQUFnQjtBQUMvQyx1QkFBdUIsb0hBQTRDOztBQUVuRSxzQkFBc0I7O0FBRXRCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyw2QkFBNkI7QUFDakUsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYiwrQ0FBK0MscUNBQXFDOztBQUVwRjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DLGdDQUFnQztBQUNwRSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsbUJBQU8sQ0FBQyw2RUFBYTtBQUN6QztBQUNBOztBQUVBLGdCQUFnQixtQkFBTyxDQUFDLCtFQUFjO0FBQ3RDLHNCQUFzQixtQkFBTyxDQUFDLDZGQUFxQjtBQUNuRCxvQkFBb0IsbUJBQU8sQ0FBQywyRUFBWTtBQUN4QywwQkFBMEIsbUJBQU8sQ0FBQyx5RkFBbUI7O0FBRXJELFVBQVUsNkZBQXNCO0FBQ2hDLG9CQUFvQix1R0FBZ0M7O0FBRXBELFVBQVUsbUJBQU8sQ0FBQyxtRUFBUTtBQUMxQixXQUFXLGdHQUF3Qjs7QUFFbkMsY0FBYyxtQkFBTyxDQUFDLGtHQUE0Qjs7QUFFbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3Qix1QkFBdUIsbUJBQU8sQ0FBQyw2RkFBcUI7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsa0JBQWtCLG1CQUFPLENBQUMsOERBQWM7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLHFCQUFxQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7O0FDdkdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxtQ0FBSTs7QUFFckIsY0FBYyxtQkFBTyxDQUFDLG9GQUFxQjs7QUFFM0MsVUFBVSxtQkFBTyxDQUFDLDREQUFXO0FBQzdCLGNBQWMsMkdBQW1DO0FBQ2pELGNBQWMsbUJBQU8sQ0FBQyxvRUFBYTtBQUNuQztBQUNBLGtCQUFrQixtQkFBTyxDQUFDLG9GQUFxQjtBQUMvQztBQUNBO0FBQ0EsaUJBQWlCLHNHQUFrQztBQUNuRCxnQkFBZ0IsbUJBQU8sQ0FBQyw2RUFBYTtBQUNyQyxzQkFBc0IsbUJBQU8sQ0FBQywyRkFBb0I7QUFDbEQsb0JBQW9CLG1CQUFPLENBQUMsdUZBQWtCOztBQUU5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxzQ0FBc0Msd0JBQXdCLEVBQUU7O0FBRWhFO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBcUMsNEJBQTRCLEVBQUU7QUFDbkUsMkNBQTJDLDRCQUE0QixFQUFFOztBQUV6RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLHdCQUF3QjtBQUNoRSx5Q0FBeUMsd0JBQXdCO0FBQ2pFLDBDQUEwQyx3QkFBd0I7QUFDbEUsdUNBQXVDLHdCQUF3Qjs7QUFFL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsZ0NBQWdDLGlCQUFpQjtBQUNqRCxnQ0FBZ0MsaUJBQWlCOztBQUVqRDtBQUNBOztBQUVBLGdDQUFnQyxrQkFBa0I7QUFDbEQsZ0NBQWdDLGtCQUFrQjs7QUFFbEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLDZCQUE2Qjs7QUFFNUQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQSxrQkFBa0I7QUFDbEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixrQkFBa0I7O0FBRWxCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSx1QkFBdUI7O0FBRXZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9DQUFvQywyREFBMkQ7O0FBRS9GO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG1DQUFtQyw2Q0FBNkM7O0FBRWhGO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtB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NzFmYTQ0YTdmLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4uL3NyYy90cmFjZXMvdHJlZW1hcCcpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaG92ZXJ0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLmhvdmVydGVtcGxhdGVBdHRycztcbnZhciB0ZXh0dGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS50ZXh0dGVtcGxhdGVBdHRycztcblxudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG52YXIgZG9tYWluQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9kb21haW4nKS5hdHRyaWJ1dGVzO1xudmFyIHBpZUF0dHJzID0gcmVxdWlyZSgnLi4vcGllL2F0dHJpYnV0ZXMnKTtcbnZhciBzdW5idXJzdEF0dHJzID0gcmVxdWlyZSgnLi4vc3VuYnVyc3QvYXR0cmlidXRlcycpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBsYWJlbHM6IHN1bmJ1cnN0QXR0cnMubGFiZWxzLFxuICAgIHBhcmVudHM6IHN1bmJ1cnN0QXR0cnMucGFyZW50cyxcblxuICAgIHZhbHVlczogc3VuYnVyc3RBdHRycy52YWx1ZXMsXG4gICAgYnJhbmNodmFsdWVzOiBzdW5idXJzdEF0dHJzLmJyYW5jaHZhbHVlcyxcbiAgICBjb3VudDogc3VuYnVyc3RBdHRycy5jb3VudCxcblxuICAgIGxldmVsOiBzdW5idXJzdEF0dHJzLmxldmVsLFxuICAgIG1heGRlcHRoOiBzdW5idXJzdEF0dHJzLm1heGRlcHRoLFxuXG4gICAgdGlsaW5nOiB7XG4gICAgICAgIHBhY2tpbmc6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgICAgICdzcXVhcmlmeScsXG4gICAgICAgICAgICAgICAgJ2JpbmFyeScsXG4gICAgICAgICAgICAgICAgJ2RpY2UnLFxuICAgICAgICAgICAgICAgICdzbGljZScsXG4gICAgICAgICAgICAgICAgJ3NsaWNlLWRpY2UnLFxuICAgICAgICAgICAgICAgICdkaWNlLXNsaWNlJ1xuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIGRmbHQ6ICdzcXVhcmlmeScsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnRGV0ZXJtaW5lcyBkMyB0cmVlbWFwIHNvbHZlci4nLFxuICAgICAgICAgICAgICAgICdGb3IgbW9yZSBpbmZvIHBsZWFzZSByZWZlciB0byBodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtaGllcmFyY2h5I3RyZWVtYXAtdGlsaW5nJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcblxuICAgICAgICBzcXVhcmlmeXJhdGlvOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIG1pbjogMSxcbiAgICAgICAgICAgIGRmbHQ6IDEsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnV2hlbiB1c2luZyAqc3F1YXJpZnkqIGBwYWNraW5nYCBhbGdvcml0aG0sIGFjY29yZGluZyB0byBodHRwczovL2dpdGh1Yi5jb20vZDMvZDMtaGllcmFyY2h5L2Jsb2IvbWFzdGVyL1JFQURNRS5tZCNzcXVhcmlmeV9yYXRpbycsXG4gICAgICAgICAgICAgICAgJ3RoaXMgb3B0aW9uIHNwZWNpZmllcyB0aGUgZGVzaXJlZCBhc3BlY3QgcmF0aW8gb2YgdGhlIGdlbmVyYXRlZCByZWN0YW5nbGVzLicsXG4gICAgICAgICAgICAgICAgJ1RoZSByYXRpbyBtdXN0IGJlIHNwZWNpZmllZCBhcyBhIG51bWJlciBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gb25lLicsXG4gICAgICAgICAgICAgICAgJ05vdGUgdGhhdCB0aGUgb3JpZW50YXRpb24gb2YgdGhlIGdlbmVyYXRlZCByZWN0YW5nbGVzICh0YWxsIG9yIHdpZGUpJyxcbiAgICAgICAgICAgICAgICAnaXMgbm90IGltcGxpZWQgYnkgdGhlIHJhdGlvOyBmb3IgZXhhbXBsZSwgYSByYXRpbyBvZiB0d28gd2lsbCBhdHRlbXB0JyxcbiAgICAgICAgICAgICAgICAndG8gcHJvZHVjZSBhIG1peHR1cmUgb2YgcmVjdGFuZ2xlcyB3aG9zZSB3aWR0aDpoZWlnaHQgcmF0aW8gaXMgZWl0aGVyIDI6MSBvciAxOjIuJyxcbiAgICAgICAgICAgICAgICAnV2hlbiB1c2luZyAqc3F1YXJpZnkqLCB1bmxpa2UgZDMgd2hpY2ggdXNlcyB0aGUgR29sZGVuIFJhdGlvIGkuZS4gMS42MTgwMzQsJyxcbiAgICAgICAgICAgICAgICAnUGxvdGx5IGFwcGxpZXMgMSB0byBpbmNyZWFzZSBzcXVhcmVzIGluIHRyZWVtYXAgbGF5b3V0cy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuXG4gICAgICAgIGZsaXA6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdmbGFnbGlzdCcsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBmbGFnczogW1xuICAgICAgICAgICAgICAgICd4JyxcbiAgICAgICAgICAgICAgICAneSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIGlmIHRoZSBwb3NpdGlvbnMgb2J0YWluZWQgZnJvbSBzb2x2ZXIgYXJlIGZsaXBwZWQgb24gZWFjaCBheGlzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG5cbiAgICAgICAgcGFkOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAzLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGlubmVyIHBhZGRpbmcgKGluIHB4KS4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgfSxcblxuICAgIG1hcmtlcjogZXh0ZW5kRmxhdCh7XG4gICAgICAgIHBhZDoge1xuICAgICAgICAgICAgdDoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIHBhZGRpbmcgZm9ybSB0aGUgdG9wIChpbiBweCkuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbDoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIHBhZGRpbmcgZm9ybSB0aGUgbGVmdCAoaW4gcHgpLidcbiAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHI6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSBwYWRkaW5nIGZvcm0gdGhlIHJpZ2h0IChpbiBweCkuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYjoge1xuICAgICAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAgICAgJ1NldHMgdGhlIHBhZGRpbmcgZm9ybSB0aGUgYm90dG9tIChpbiBweCkuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgICAgIH0sXG5cbiAgICAgICAgY29sb3JzOiBzdW5idXJzdEF0dHJzLm1hcmtlci5jb2xvcnMsXG5cbiAgICAgICAgZGVwdGhmYWRlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICB2YWx1ZXM6IFt0cnVlLCBmYWxzZSwgJ3JldmVyc2VkJ10sXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIGlmIHRoZSBzZWN0b3IgY29sb3JzIGFyZSBmYWRlZCB0b3dhcmRzJyxcbiAgICAgICAgICAgICAgICAndGhlIGJhY2tncm91bmQgZnJvbSB0aGUgbGVhdmVzIHVwIHRvIHRoZSBoZWFkZXJzLicsXG4gICAgICAgICAgICAgICAgJ1RoaXMgb3B0aW9uIGlzIHVuYXZhaWxhYmxlIHdoZW4gYSBgY29sb3JzY2FsZWAgaXMgcHJlc2VudCwnLFxuICAgICAgICAgICAgICAgICdkZWZhdWx0cyB0byBmYWxzZSB3aGVuIGBtYXJrZXIuY29sb3JzYCBpcyBzZXQsJyxcbiAgICAgICAgICAgICAgICAnYnV0IG90aGVyd2lzZSBkZWZhdWx0cyB0byB0cnVlLicsXG4gICAgICAgICAgICAgICAgJ1doZW4gc2V0IHRvICpyZXZlcnNlZCosIHRoZSBmYWRpbmcgZGlyZWN0aW9uIGlzIGludmVydGVkLCcsXG4gICAgICAgICAgICAgICAgJ3RoYXQgaXMgdGhlIHRvcCBlbGVtZW50cyB3aXRoaW4gaGllcmFyY2h5IGFyZSBkcmF3biB3aXRoIGZ1bGx5IHNhdHVyYXRlZCBjb2xvcnMnLFxuICAgICAgICAgICAgICAgICd3aGlsZSB0aGUgbGVhdmVzIGFyZSBmYWRlZCB0b3dhcmRzIHRoZSBiYWNrZ3JvdW5kIGNvbG9yLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG5cbiAgICAgICAgbGluZTogc3VuYnVyc3RBdHRycy5tYXJrZXIubGluZSxcblxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcbiAgICAgICAgY29sb3JTY2FsZUF0dHJzKCdtYXJrZXInLCB7XG4gICAgICAgICAgICBjb2xvckF0dHI6ICdjb2xvcnMnLFxuICAgICAgICAgICAgYW5pbTogZmFsc2UgLy8gVE9ETzogc2V0IHRvIGFuaW06IHRydWU/XG4gICAgICAgIH0pXG4gICAgKSxcblxuICAgIHBhdGhiYXI6IHtcbiAgICAgICAgdmlzaWJsZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIGlmIHRoZSBwYXRoIGJhciBpcyBkcmF3bicsXG4gICAgICAgICAgICAgICAgJ2kuZS4gb3V0c2lkZSB0aGUgdHJhY2UgYGRvbWFpbmAgYW5kJyxcbiAgICAgICAgICAgICAgICAnd2l0aCBvbmUgcGl4ZWwgZ2FwLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG5cbiAgICAgICAgc2lkZToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbXG4gICAgICAgICAgICAgICAgJ3RvcCcsXG4gICAgICAgICAgICAgICAgJ2JvdHRvbSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZmx0OiAndG9wJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIG9uIHdoaWNoIHNpZGUgb2YgdGhlIHRoZSB0cmVlbWFwIHRoZScsXG4gICAgICAgICAgICAgICAgJ2BwYXRoYmFyYCBzaG91bGQgYmUgcHJlc2VudGVkLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG5cbiAgICAgICAgZWRnZXNoYXBlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICB2YWx1ZXM6IFtcbiAgICAgICAgICAgICAgICAnPicsXG4gICAgICAgICAgICAgICAgJzwnLFxuICAgICAgICAgICAgICAgICd8JyxcbiAgICAgICAgICAgICAgICAnLycsXG4gICAgICAgICAgICAgICAgJ1xcXFwnXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZGZsdDogJz4nLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdEZXRlcm1pbmVzIHdoaWNoIHNoYXBlIGlzIHVzZWQgZm9yIGVkZ2VzIGJldHdlZW4gYGJhcnBhdGhgIGxhYmVscy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuXG4gICAgICAgIHRoaWNrbmVzczoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBtaW46IDEyLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHRoaWNrbmVzcyBvZiBgcGF0aGJhcmAgKGluIHB4KS4gSWYgbm90IHNwZWNpZmllZCB0aGUgYHBhdGhiYXIudGV4dGZvbnQuc2l6ZWAgaXMgdXNlZCcsXG4gICAgICAgICAgICAgICAgJ3dpdGggMyBwaXhsZXMgZXh0cmEgcGFkZGluZyBvbiBlYWNoIHNpZGUuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcblxuICAgICAgICB0ZXh0Zm9udDogZXh0ZW5kRmxhdCh7fSwgcGllQXR0cnMudGV4dGZvbnQsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZm9udCB1c2VkIGluc2lkZSBgcGF0aGJhcmAuJ1xuICAgICAgICB9KSxcblxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfSxcblxuICAgIHRleHQ6IHBpZUF0dHJzLnRleHQsXG4gICAgdGV4dGluZm86IHN1bmJ1cnN0QXR0cnMudGV4dGluZm8sXG4gICAgLy8gVE9ETzogaW5jb3Jwb3JhdGUgYGxhYmVsYCBhbmQgYHZhbHVlYCBpbiB0aGUgZXZlbnREYXRhXG4gICAgdGV4dHRlbXBsYXRlOiB0ZXh0dGVtcGxhdGVBdHRycyh7ZWRpdFR5cGU6ICdwbG90J30sIHtcbiAgICAgICAga2V5czogY29uc3RhbnRzLmV2ZW50RGF0YUtleXMuY29uY2F0KFsnbGFiZWwnLCAndmFsdWUnXSlcbiAgICB9KSxcblxuICAgIGhvdmVydGV4dDogcGllQXR0cnMuaG92ZXJ0ZXh0LFxuICAgIGhvdmVyaW5mbzogc3VuYnVyc3RBdHRycy5ob3ZlcmluZm8sXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHt9LCB7XG4gICAgICAgIGtleXM6IGNvbnN0YW50cy5ldmVudERhdGFLZXlzXG4gICAgfSksXG5cbiAgICB0ZXh0Zm9udDogcGllQXR0cnMudGV4dGZvbnQsXG4gICAgaW5zaWRldGV4dGZvbnQ6IHBpZUF0dHJzLmluc2lkZXRleHRmb250LFxuICAgIG91dHNpZGV0ZXh0Zm9udDogZXh0ZW5kRmxhdCh7fSwgcGllQXR0cnMub3V0c2lkZXRleHRmb250LCB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgZm9udCB1c2VkIGZvciBgdGV4dGluZm9gIGx5aW5nIG91dHNpZGUgdGhlIHNlY3Rvci4nLFxuICAgICAgICAgICAgJ1RoaXMgb3B0aW9uIHJlZmVycyB0byB0aGUgcm9vdCBvZiB0aGUgaGllcmFyY2h5JyxcbiAgICAgICAgICAgICdwcmVzZW50ZWQgb24gdG9wIGxlZnQgY29ybmVyIG9mIGEgdHJlZW1hcCBncmFwaC4nLFxuICAgICAgICAgICAgJ1BsZWFzZSBub3RlIHRoYXQgaWYgYSBoaWVyYXJjaHkgaGFzIG11bHRpcGxlIHJvb3Qgbm9kZXMsJyxcbiAgICAgICAgICAgICd0aGlzIG9wdGlvbiB3b25cXCd0IGhhdmUgYW55IGVmZmVjdCBhbmQgYGluc2lkZXRleHRmb250YCB3b3VsZCBiZSB1c2VkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcblxuICAgIHRleHRwb3NpdGlvbjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgJ3RvcCBsZWZ0JywgJ3RvcCBjZW50ZXInLCAndG9wIHJpZ2h0JyxcbiAgICAgICAgICAgICdtaWRkbGUgbGVmdCcsICdtaWRkbGUgY2VudGVyJywgJ21pZGRsZSByaWdodCcsXG4gICAgICAgICAgICAnYm90dG9tIGxlZnQnLCAnYm90dG9tIGNlbnRlcicsICdib3R0b20gcmlnaHQnXG4gICAgICAgIF0sXG4gICAgICAgIGRmbHQ6ICd0b3AgbGVmdCcsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgcG9zaXRpb25zIG9mIHRoZSBgdGV4dGAgZWxlbWVudHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBkb21haW46IGRvbWFpbkF0dHJzKHtuYW1lOiAndHJlZW1hcCcsIHRyYWNlOiB0cnVlLCBlZGl0VHlwZTogJ2NhbGMnfSksXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgcGxvdHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9wbG90cycpO1xuXG5leHBvcnRzLm5hbWUgPSAndHJlZW1hcCc7XG5cbmV4cG9ydHMucGxvdCA9IGZ1bmN0aW9uKGdkLCB0cmFjZXMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgcGxvdHMucGxvdEJhc2VQbG90KGV4cG9ydHMubmFtZSwgZ2QsIHRyYWNlcywgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spO1xufTtcblxuZXhwb3J0cy5jbGVhbiA9IGZ1bmN0aW9uKG5ld0Z1bGxEYXRhLCBuZXdGdWxsTGF5b3V0LCBvbGRGdWxsRGF0YSwgb2xkRnVsbExheW91dCkge1xuICAgIHBsb3RzLmNsZWFuQmFzZVBsb3QoZXhwb3J0cy5uYW1lLCBuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGNhbGMgPSByZXF1aXJlKCcuLi9zdW5idXJzdC9jYWxjJyk7XG5cbmV4cG9ydHMuY2FsYyA9IGZ1bmN0aW9uKGdkLCB0cmFjZSkge1xuICAgIHJldHVybiBjYWxjLmNhbGMoZ2QsIHRyYWNlKTtcbn07XG5cbmV4cG9ydHMuY3Jvc3NUcmFjZUNhbGMgPSBmdW5jdGlvbihnZCkge1xuICAgIHJldHVybiBjYWxjLl9ydW5Dcm9zc1RyYWNlQ2FsYygndHJlZW1hcCcsIGdkKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIENMSUNLX1RSQU5TSVRJT05fVElNRTogNzUwLFxuICAgIENMSUNLX1RSQU5TSVRJT05fRUFTSU5HOiAncG9seScsXG4gICAgZXZlbnREYXRhS2V5czogW1xuICAgICAgICAvLyBzdHJpbmdcbiAgICAgICAgJ2N1cnJlbnRQYXRoJyxcbiAgICAgICAgJ3Jvb3QnLFxuICAgICAgICAnZW50cnknLFxuICAgICAgICAvLyBubyBuZWVkIHRvIGFkZCAncGFyZW50JyBoZXJlXG5cbiAgICAgICAgLy8gcGVyY2VudGFnZXMgaS5lLiByYXRpb3NcbiAgICAgICAgJ3BlcmNlbnRSb290JyxcbiAgICAgICAgJ3BlcmNlbnRFbnRyeScsXG4gICAgICAgICdwZXJjZW50UGFyZW50J1xuICAgIF0sXG4gICAgZ2FwV2l0aFBhdGhiYXI6IDEgLy8gaS5lLiBvbmUgcGl4ZWxcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBhdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9hdHRyaWJ1dGVzJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgaGFuZGxlRG9tYWluRGVmYXVsdHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9kb21haW4nKS5kZWZhdWx0cztcbnZhciBoYW5kbGVUZXh0ID0gcmVxdWlyZSgnLi4vYmFyL2RlZmF1bHRzJykuaGFuZGxlVGV4dDtcbnZhciBURVhUUEFEID0gcmVxdWlyZSgnLi4vYmFyL2NvbnN0YW50cycpLlRFWFRQQUQ7XG5cbnZhciBDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlJyk7XG52YXIgaGFzQ29sb3JzY2FsZSA9IENvbG9yc2NhbGUuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlRGVmYXVsdHMgPSBDb2xvcnNjYWxlLmhhbmRsZURlZmF1bHRzO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGFiZWxzID0gY29lcmNlKCdsYWJlbHMnKTtcbiAgICB2YXIgcGFyZW50cyA9IGNvZXJjZSgncGFyZW50cycpO1xuXG4gICAgaWYoIWxhYmVscyB8fCAhbGFiZWxzLmxlbmd0aCB8fCAhcGFyZW50cyB8fCAhcGFyZW50cy5sZW5ndGgpIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIHZhbHMgPSBjb2VyY2UoJ3ZhbHVlcycpO1xuICAgIGlmKHZhbHMgJiYgdmFscy5sZW5ndGgpIHtcbiAgICAgICAgY29lcmNlKCdicmFuY2h2YWx1ZXMnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb2VyY2UoJ2NvdW50Jyk7XG4gICAgfVxuXG4gICAgY29lcmNlKCdsZXZlbCcpO1xuICAgIGNvZXJjZSgnbWF4ZGVwdGgnKTtcblxuICAgIHZhciBwYWNraW5nID0gY29lcmNlKCd0aWxpbmcucGFja2luZycpO1xuICAgIGlmKHBhY2tpbmcgPT09ICdzcXVhcmlmeScpIHtcbiAgICAgICAgY29lcmNlKCd0aWxpbmcuc3F1YXJpZnlyYXRpbycpO1xuICAgIH1cblxuICAgIGNvZXJjZSgndGlsaW5nLmZsaXAnKTtcbiAgICBjb2VyY2UoJ3RpbGluZy5wYWQnKTtcblxuICAgIHZhciB0ZXh0ID0gY29lcmNlKCd0ZXh0Jyk7XG4gICAgY29lcmNlKCd0ZXh0dGVtcGxhdGUnKTtcbiAgICBpZighdHJhY2VPdXQudGV4dHRlbXBsYXRlKSBjb2VyY2UoJ3RleHRpbmZvJywgQXJyYXkuaXNBcnJheSh0ZXh0KSA/ICd0ZXh0K2xhYmVsJyA6ICdsYWJlbCcpO1xuXG4gICAgY29lcmNlKCdob3ZlcnRleHQnKTtcbiAgICBjb2VyY2UoJ2hvdmVydGVtcGxhdGUnKTtcblxuICAgIHZhciBoYXNQYXRoYmFyID0gY29lcmNlKCdwYXRoYmFyLnZpc2libGUnKTtcblxuICAgIHZhciB0ZXh0cG9zaXRpb24gPSAnYXV0byc7XG4gICAgaGFuZGxlVGV4dCh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHRleHRwb3NpdGlvbiwge1xuICAgICAgICBoYXNQYXRoYmFyOiBoYXNQYXRoYmFyLFxuICAgICAgICBtb2R1bGVIYXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgIG1vZHVsZUhhc1Vuc2VsZWN0ZWQ6IGZhbHNlLFxuICAgICAgICBtb2R1bGVIYXNDb25zdHJhaW46IGZhbHNlLFxuICAgICAgICBtb2R1bGVIYXNDbGlwb25heGlzOiBmYWxzZSxcbiAgICAgICAgbW9kdWxlSGFzVGV4dGFuZ2xlOiBmYWxzZSxcbiAgICAgICAgbW9kdWxlSGFzSW5zaWRlYW5jaG9yOiBmYWxzZVxuICAgIH0pO1xuICAgIGNvZXJjZSgndGV4dHBvc2l0aW9uJyk7XG4gICAgdmFyIGJvdHRvbVRleHQgPSB0cmFjZU91dC50ZXh0cG9zaXRpb24uaW5kZXhPZignYm90dG9tJykgIT09IC0xO1xuXG4gICAgdmFyIGxpbmVXaWR0aCA9IGNvZXJjZSgnbWFya2VyLmxpbmUud2lkdGgnKTtcbiAgICBpZihsaW5lV2lkdGgpIGNvZXJjZSgnbWFya2VyLmxpbmUuY29sb3InLCBsYXlvdXQucGFwZXJfYmdjb2xvcik7XG5cbiAgICB2YXIgY29sb3JzID0gY29lcmNlKCdtYXJrZXIuY29sb3JzJyk7XG4gICAgdmFyIHdpdGhDb2xvcnNjYWxlID0gdHJhY2VPdXQuX2hhc0NvbG9yc2NhbGUgPSAoXG4gICAgICAgIGhhc0NvbG9yc2NhbGUodHJhY2VJbiwgJ21hcmtlcicsICdjb2xvcnMnKSB8fFxuICAgICAgICAodHJhY2VJbi5tYXJrZXIgfHwge30pLmNvbG9yYXhpcyAvLyBOLkIuIHNwZWNpYWwgbG9naWMgdG8gY29uc2lkZXIgXCJ2YWx1ZXNcIiBjb2xvcnNjYWxlc1xuICAgICk7XG4gICAgaWYod2l0aENvbG9yc2NhbGUpIHtcbiAgICAgICAgY29sb3JzY2FsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge3ByZWZpeDogJ21hcmtlci4nLCBjTGV0dGVyOiAnYyd9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb2VyY2UoJ21hcmtlci5kZXB0aGZhZGUnLCAhKGNvbG9ycyB8fCBbXSkubGVuZ3RoKTtcbiAgICB9XG5cbiAgICB2YXIgaGVhZGVyU2l6ZSA9IHRyYWNlT3V0LnRleHRmb250LnNpemUgKiAyO1xuXG4gICAgY29lcmNlKCdtYXJrZXIucGFkLnQnLCBib3R0b21UZXh0ID8gaGVhZGVyU2l6ZSAvIDQgOiBoZWFkZXJTaXplKTtcbiAgICBjb2VyY2UoJ21hcmtlci5wYWQubCcsIGhlYWRlclNpemUgLyA0KTtcbiAgICBjb2VyY2UoJ21hcmtlci5wYWQucicsIGhlYWRlclNpemUgLyA0KTtcbiAgICBjb2VyY2UoJ21hcmtlci5wYWQuYicsIGJvdHRvbVRleHQgPyBoZWFkZXJTaXplIDogaGVhZGVyU2l6ZSAvIDQpO1xuXG4gICAgaWYod2l0aENvbG9yc2NhbGUpIHtcbiAgICAgICAgY29sb3JzY2FsZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSwge3ByZWZpeDogJ21hcmtlci4nLCBjTGV0dGVyOiAnYyd9KTtcbiAgICB9XG5cbiAgICB0cmFjZU91dC5faG92ZXJlZCA9IHtcbiAgICAgICAgbWFya2VyOiB7XG4gICAgICAgICAgICBsaW5lOiB7XG4gICAgICAgICAgICAgICAgd2lkdGg6IDIsXG4gICAgICAgICAgICAgICAgY29sb3I6IENvbG9yLmNvbnRyYXN0KGxheW91dC5wYXBlcl9iZ2NvbG9yKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGlmKGhhc1BhdGhiYXIpIHtcbiAgICAgICAgLy8gVGhpcyB3b3JrcyBldmVuIGZvciBtdWx0aS1saW5lIGxhYmVscyBhcyB0cmVlbWFwIHBhdGhiYXIgdHJpbSBvdXQgbGluZSBicmVha3NcbiAgICAgICAgY29lcmNlKCdwYXRoYmFyLnRoaWNrbmVzcycsIHRyYWNlT3V0LnBhdGhiYXIudGV4dGZvbnQuc2l6ZSArIDIgKiBURVhUUEFEKTtcblxuICAgICAgICBjb2VyY2UoJ3BhdGhiYXIuc2lkZScpO1xuICAgICAgICBjb2VyY2UoJ3BhdGhiYXIuZWRnZXNoYXBlJyk7XG4gICAgfVxuXG4gICAgaGFuZGxlRG9tYWluRGVmYXVsdHModHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcblxuICAgIC8vIGRvIG5vdCBzdXBwb3J0IHRyYW5zZm9ybXMgZm9yIG5vd1xuICAgIHRyYWNlT3V0Ll9sZW5ndGggPSBudWxsO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgc3ZnVGV4dFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vbGliL3N2Z190ZXh0X3V0aWxzJyk7XG5cbnZhciBwYXJ0aXRpb24gPSByZXF1aXJlKCcuL3BhcnRpdGlvbicpO1xudmFyIHN0eWxlT25lID0gcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlT25lO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4uL3N1bmJ1cnN0L2hlbHBlcnMnKTtcbnZhciBhdHRhY2hGeEhhbmRsZXJzID0gcmVxdWlyZSgnLi4vc3VuYnVyc3QvZngnKTtcblxudmFyIG9uUGF0aGJhciA9IHRydWU7IC8vIGZvciBBbmNlc3RvcnNcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkcmF3QW5jZXN0b3JzKGdkLCBjZCwgZW50cnksIHNsaWNlcywgb3B0cykge1xuICAgIHZhciBiYXJEaWZZID0gb3B0cy5iYXJEaWZZO1xuICAgIHZhciB3aWR0aCA9IG9wdHMud2lkdGg7XG4gICAgdmFyIGhlaWdodCA9IG9wdHMuaGVpZ2h0O1xuICAgIHZhciB2aWV3WCA9IG9wdHMudmlld1g7XG4gICAgdmFyIHZpZXdZID0gb3B0cy52aWV3WTtcbiAgICB2YXIgcGF0aFNsaWNlID0gb3B0cy5wYXRoU2xpY2U7XG4gICAgdmFyIHRvTW92ZUluc2lkZVNsaWNlID0gb3B0cy50b01vdmVJbnNpZGVTbGljZTtcbiAgICB2YXIgc3RyVHJhbnNmb3JtID0gb3B0cy5zdHJUcmFuc2Zvcm07XG4gICAgdmFyIGhhc1RyYW5zaXRpb24gPSBvcHRzLmhhc1RyYW5zaXRpb247XG4gICAgdmFyIGhhbmRsZVNsaWNlc0V4aXQgPSBvcHRzLmhhbmRsZVNsaWNlc0V4aXQ7XG4gICAgdmFyIG1ha2VVcGRhdGVTbGljZUludGVycG9sYXRvciA9IG9wdHMubWFrZVVwZGF0ZVNsaWNlSW50ZXJwb2xhdG9yO1xuICAgIHZhciBtYWtlVXBkYXRlVGV4dEludGVycG9sYXRvciA9IG9wdHMubWFrZVVwZGF0ZVRleHRJbnRlcnBvbGF0b3I7XG4gICAgdmFyIHJlZlJlY3QgPSB7fTtcblxuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGNkMCA9IGNkWzBdO1xuICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcbiAgICB2YXIgaGllcmFyY2h5ID0gY2QwLmhpZXJhcmNoeTtcblxuICAgIHZhciBlYWNoV2lkdGggPSB3aWR0aCAvIHRyYWNlLl9lbnRyeURlcHRoO1xuXG4gICAgdmFyIHBhdGhJZHMgPSBoZWxwZXJzLmxpc3RQYXRoKGVudHJ5LmRhdGEsICdpZCcpO1xuXG4gICAgdmFyIHNsaWNlRGF0YSA9IHBhcnRpdGlvbihoaWVyYXJjaHkuY29weSgpLCBbd2lkdGgsIGhlaWdodF0sIHtcbiAgICAgICAgcGFja2luZzogJ2RpY2UnLFxuICAgICAgICBwYWQ6IHtcbiAgICAgICAgICAgIGlubmVyOiAwLFxuICAgICAgICAgICAgdG9wOiAwLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgYm90dG9tOiAwXG4gICAgICAgIH1cbiAgICB9KS5kZXNjZW5kYW50cygpO1xuXG4gICAgLy8gZWRpdCBzbGljZXMgdGhhdCBzaG93IHVwIG9uIGdyYXBoXG4gICAgc2xpY2VEYXRhID0gc2xpY2VEYXRhLmZpbHRlcihmdW5jdGlvbihwdCkge1xuICAgICAgICB2YXIgbGV2ZWwgPSBwYXRoSWRzLmluZGV4T2YocHQuZGF0YS5pZCk7XG4gICAgICAgIGlmKGxldmVsID09PSAtMSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHB0LngwID0gZWFjaFdpZHRoICogbGV2ZWw7XG4gICAgICAgIHB0LngxID0gZWFjaFdpZHRoICogKGxldmVsICsgMSk7XG4gICAgICAgIHB0LnkwID0gYmFyRGlmWTtcbiAgICAgICAgcHQueTEgPSBiYXJEaWZZICsgaGVpZ2h0O1xuXG4gICAgICAgIHB0Lm9uUGF0aGJhciA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG5cbiAgICBzbGljZURhdGEucmV2ZXJzZSgpO1xuXG4gICAgc2xpY2VzID0gc2xpY2VzLmRhdGEoc2xpY2VEYXRhLCBoZWxwZXJzLmdldFB0SWQpO1xuXG4gICAgc2xpY2VzLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ3BhdGhiYXInLCB0cnVlKTtcblxuICAgIGhhbmRsZVNsaWNlc0V4aXQoc2xpY2VzLCBvblBhdGhiYXIsIHJlZlJlY3QsIFt3aWR0aCwgaGVpZ2h0XSwgcGF0aFNsaWNlKTtcblxuICAgIHNsaWNlcy5vcmRlcigpO1xuXG4gICAgdmFyIHVwZGF0ZVNsaWNlcyA9IHNsaWNlcztcbiAgICBpZihoYXNUcmFuc2l0aW9uKSB7XG4gICAgICAgIHVwZGF0ZVNsaWNlcyA9IHVwZGF0ZVNsaWNlcy50cmFuc2l0aW9uKCkuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBOLkIuIGdkLl90cmFuc2l0aW9uaW5nIGlzIChzdGlsbCkgKnRydWUqIGJ5IHRoZSB0aW1lXG4gICAgICAgICAgICAvLyB0cmFuc2l0aW9uIHVwZGF0ZXMgZ2V0IGhlcmVcbiAgICAgICAgICAgIHZhciBzbGljZVRvcCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIGhlbHBlcnMuc2V0U2xpY2VDdXJzb3Ioc2xpY2VUb3AsIGdkLCB7XG4gICAgICAgICAgICAgICAgaGlkZU9uUm9vdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGlkZU9uTGVhdmVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc1RyYW5zaXRpb25pbmc6IGZhbHNlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgdXBkYXRlU2xpY2VzLmVhY2goZnVuY3Rpb24ocHQpIHtcbiAgICAgICAgcHQuX2hvdmVyWCA9IHZpZXdYKHB0LngxIC0gTWF0aC5taW4od2lkdGgsIGhlaWdodCkgLyAyKTtcbiAgICAgICAgcHQuX2hvdmVyWSA9IHZpZXdZKHB0LnkxIC0gaGVpZ2h0IC8gMik7XG5cbiAgICAgICAgdmFyIHNsaWNlVG9wID0gZDMuc2VsZWN0KHRoaXMpO1xuXG4gICAgICAgIHZhciBzbGljZVBhdGggPSBMaWIuZW5zdXJlU2luZ2xlKHNsaWNlVG9wLCAncGF0aCcsICdzdXJmYWNlJywgZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgcy5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnYWxsJyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKGhhc1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIHNsaWNlUGF0aC50cmFuc2l0aW9uKCkuYXR0clR3ZWVuKCdkJywgZnVuY3Rpb24ocHQyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGludGVycCA9IG1ha2VVcGRhdGVTbGljZUludGVycG9sYXRvcihwdDIsIG9uUGF0aGJhciwgcmVmUmVjdCwgW3dpZHRoLCBoZWlnaHRdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gcGF0aFNsaWNlKGludGVycCh0KSk7IH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWNlUGF0aC5hdHRyKCdkJywgcGF0aFNsaWNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNsaWNlVG9wXG4gICAgICAgICAgICAuY2FsbChhdHRhY2hGeEhhbmRsZXJzLCBlbnRyeSwgZ2QsIGNkLCB7XG4gICAgICAgICAgICAgICAgc3R5bGVPbmU6IHN0eWxlT25lLFxuICAgICAgICAgICAgICAgIGV2ZW50RGF0YUtleXM6IGNvbnN0YW50cy5ldmVudERhdGFLZXlzLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25UaW1lOiBjb25zdGFudHMuQ0xJQ0tfVFJBTlNJVElPTl9USU1FLFxuICAgICAgICAgICAgICAgIHRyYW5zaXRpb25FYXNpbmc6IGNvbnN0YW50cy5DTElDS19UUkFOU0lUSU9OX0VBU0lOR1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5jYWxsKGhlbHBlcnMuc2V0U2xpY2VDdXJzb3IsIGdkLCB7XG4gICAgICAgICAgICAgICAgaGlkZU9uUm9vdDogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGlkZU9uTGVhdmVzOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBpc1RyYW5zaXRpb25pbmc6IGdkLl90cmFuc2l0aW9uaW5nXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICBzbGljZVBhdGguY2FsbChzdHlsZU9uZSwgcHQsIHRyYWNlLCB7XG4gICAgICAgICAgICBob3ZlcmVkOiBmYWxzZVxuICAgICAgICB9KTtcblxuICAgICAgICBwdC5fdGV4dCA9IChoZWxwZXJzLmdldFB0TGFiZWwocHQpIHx8ICcnKS5zcGxpdCgnPGJyPicpLmpvaW4oJyAnKSB8fCAnJztcblxuICAgICAgICB2YXIgc2xpY2VUZXh0R3JvdXAgPSBMaWIuZW5zdXJlU2luZ2xlKHNsaWNlVG9wLCAnZycsICdzbGljZXRleHQnKTtcbiAgICAgICAgdmFyIHNsaWNlVGV4dCA9IExpYi5lbnN1cmVTaW5nbGUoc2xpY2VUZXh0R3JvdXAsICd0ZXh0JywgJycsIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgIC8vIHByb2hpYml0IHRleCBpbnRlcnByZXRhdGlvbiB1bnRpbCB3ZSBjYW4gaGFuZGxlXG4gICAgICAgICAgICAvLyB0ZXggYW5kIHJlZ3VsYXIgdGV4dCB0b2dldGhlclxuICAgICAgICAgICAgcy5hdHRyKCdkYXRhLW5vdGV4JywgMSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhciBmb250ID0gTGliLmVuc3VyZVVuaWZvcm1Gb250U2l6ZShnZCwgaGVscGVycy5kZXRlcm1pbmVUZXh0Rm9udCh0cmFjZSwgcHQsIGZ1bGxMYXlvdXQuZm9udCwge1xuICAgICAgICAgICAgb25QYXRoYmFyOiB0cnVlXG4gICAgICAgIH0pKTtcblxuICAgICAgICBzbGljZVRleHQudGV4dChwdC5fdGV4dCB8fCAnICcpIC8vIHVzZSBvbmUgc3BhY2UgY2hhcmFjdGVyIGluc3RlYWQgb2YgYSBibGFuayBzdHJpbmcgdG8gYXZvaWQganVtcHMgZHVyaW5nIHRyYW5zaXRpb25cbiAgICAgICAgICAgIC5jbGFzc2VkKCdzbGljZXRleHQnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgJ3N0YXJ0JylcbiAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgZm9udClcbiAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcblxuICAgICAgICBwdC50ZXh0QkIgPSBEcmF3aW5nLmJCb3goc2xpY2VUZXh0Lm5vZGUoKSk7XG4gICAgICAgIHB0LnRyYW5zZm9ybSA9IHRvTW92ZUluc2lkZVNsaWNlKHB0LCB7XG4gICAgICAgICAgICBmb250U2l6ZTogZm9udC5zaXplLFxuICAgICAgICAgICAgb25QYXRoYmFyOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBwdC50cmFuc2Zvcm0uZm9udFNpemUgPSBmb250LnNpemU7XG5cbiAgICAgICAgaWYoaGFzVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgc2xpY2VUZXh0LnRyYW5zaXRpb24oKS5hdHRyVHdlZW4oJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKHB0Mikge1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcnAgPSBtYWtlVXBkYXRlVGV4dEludGVycG9sYXRvcihwdDIsIG9uUGF0aGJhciwgcmVmUmVjdCwgW3dpZHRoLCBoZWlnaHRdKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24odCkgeyByZXR1cm4gc3RyVHJhbnNmb3JtKGludGVycCh0KSk7IH07XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWNlVGV4dC5hdHRyKCd0cmFuc2Zvcm0nLCBzdHJUcmFuc2Zvcm0ocHQpKTtcbiAgICAgICAgfVxuICAgIH0pO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgc3ZnVGV4dFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vbGliL3N2Z190ZXh0X3V0aWxzJyk7XG5cbnZhciBwYXJ0aXRpb24gPSByZXF1aXJlKCcuL3BhcnRpdGlvbicpO1xudmFyIHN0eWxlT25lID0gcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlT25lO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4uL3N1bmJ1cnN0L2hlbHBlcnMnKTtcbnZhciBhdHRhY2hGeEhhbmRsZXJzID0gcmVxdWlyZSgnLi4vc3VuYnVyc3QvZngnKTtcbnZhciBmb3JtYXRTbGljZUxhYmVsID0gcmVxdWlyZSgnLi4vc3VuYnVyc3QvcGxvdCcpLmZvcm1hdFNsaWNlTGFiZWw7XG5cbnZhciBvblBhdGhiYXIgPSBmYWxzZTsgLy8gZm9yIERlc2NlbmRhbnRzXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gZHJhd0Rlc2NlbmRhbnRzKGdkLCBjZCwgZW50cnksIHNsaWNlcywgb3B0cykge1xuICAgIHZhciB3aWR0aCA9IG9wdHMud2lkdGg7XG4gICAgdmFyIGhlaWdodCA9IG9wdHMuaGVpZ2h0O1xuICAgIHZhciB2aWV3WCA9IG9wdHMudmlld1g7XG4gICAgdmFyIHZpZXdZID0gb3B0cy52aWV3WTtcbiAgICB2YXIgcGF0aFNsaWNlID0gb3B0cy5wYXRoU2xpY2U7XG4gICAgdmFyIHRvTW92ZUluc2lkZVNsaWNlID0gb3B0cy50b01vdmVJbnNpZGVTbGljZTtcbiAgICB2YXIgc3RyVHJhbnNmb3JtID0gb3B0cy5zdHJUcmFuc2Zvcm07XG4gICAgdmFyIGhhc1RyYW5zaXRpb24gPSBvcHRzLmhhc1RyYW5zaXRpb247XG4gICAgdmFyIGhhbmRsZVNsaWNlc0V4aXQgPSBvcHRzLmhhbmRsZVNsaWNlc0V4aXQ7XG4gICAgdmFyIG1ha2VVcGRhdGVTbGljZUludGVycG9sYXRvciA9IG9wdHMubWFrZVVwZGF0ZVNsaWNlSW50ZXJwb2xhdG9yO1xuICAgIHZhciBtYWtlVXBkYXRlVGV4dEludGVycG9sYXRvciA9IG9wdHMubWFrZVVwZGF0ZVRleHRJbnRlcnBvbGF0b3I7XG4gICAgdmFyIHByZXZFbnRyeSA9IG9wdHMucHJldkVudHJ5O1xuICAgIHZhciByZWZSZWN0ID0ge307XG5cbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBjZDAgPSBjZFswXTtcbiAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG5cbiAgICB2YXIgaGFzTGVmdCA9IHRyYWNlLnRleHRwb3NpdGlvbi5pbmRleE9mKCdsZWZ0JykgIT09IC0xO1xuICAgIHZhciBoYXNSaWdodCA9IHRyYWNlLnRleHRwb3NpdGlvbi5pbmRleE9mKCdyaWdodCcpICE9PSAtMTtcbiAgICB2YXIgaGFzQm90dG9tID0gdHJhY2UudGV4dHBvc2l0aW9uLmluZGV4T2YoJ2JvdHRvbScpICE9PSAtMTtcblxuICAgIHZhciBub1Jvb21Gb3JIZWFkZXIgPSAoIWhhc0JvdHRvbSAmJiAhdHJhY2UubWFya2VyLnBhZC50KSB8fCAoaGFzQm90dG9tICYmICF0cmFjZS5tYXJrZXIucGFkLmIpO1xuXG4gICAgLy8gTi5CLiBzbGljZSBkYXRhIGlzbid0IHRoZSBjYWxjZGF0YSxcbiAgICAvLyBncmFiIGNvcnJlc3BvbmRpbmcgY2FsY2RhdGEgaXRlbSBpbiBzbGljZURhdGFbaV0uZGF0YS5kYXRhXG4gICAgdmFyIGFsbERhdGEgPSBwYXJ0aXRpb24oZW50cnksIFt3aWR0aCwgaGVpZ2h0XSwge1xuICAgICAgICBwYWNraW5nOiB0cmFjZS50aWxpbmcucGFja2luZyxcbiAgICAgICAgc3F1YXJpZnlyYXRpbzogdHJhY2UudGlsaW5nLnNxdWFyaWZ5cmF0aW8sXG4gICAgICAgIGZsaXBYOiB0cmFjZS50aWxpbmcuZmxpcC5pbmRleE9mKCd4JykgPiAtMSxcbiAgICAgICAgZmxpcFk6IHRyYWNlLnRpbGluZy5mbGlwLmluZGV4T2YoJ3knKSA+IC0xLFxuICAgICAgICBwYWQ6IHtcbiAgICAgICAgICAgIGlubmVyOiB0cmFjZS50aWxpbmcucGFkLFxuICAgICAgICAgICAgdG9wOiB0cmFjZS5tYXJrZXIucGFkLnQsXG4gICAgICAgICAgICBsZWZ0OiB0cmFjZS5tYXJrZXIucGFkLmwsXG4gICAgICAgICAgICByaWdodDogdHJhY2UubWFya2VyLnBhZC5yLFxuICAgICAgICAgICAgYm90dG9tOiB0cmFjZS5tYXJrZXIucGFkLmIsXG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBzbGljZURhdGEgPSBhbGxEYXRhLmRlc2NlbmRhbnRzKCk7XG5cbiAgICB2YXIgbWluVmlzaWJsZURlcHRoID0gSW5maW5pdHk7XG4gICAgdmFyIG1heFZpc2libGVEZXB0aCA9IC1JbmZpbml0eTtcbiAgICBzbGljZURhdGEuZm9yRWFjaChmdW5jdGlvbihwdCkge1xuICAgICAgICB2YXIgZGVwdGggPSBwdC5kZXB0aDtcbiAgICAgICAgaWYoZGVwdGggPj0gdHJhY2UuX21heERlcHRoKSB7XG4gICAgICAgICAgICAvLyBoaWRlIHNsaWNlcyB0aGF0IHdvbid0IHNob3cgdXAgb24gZ3JhcGhcbiAgICAgICAgICAgIHB0LngwID0gcHQueDEgPSAocHQueDAgKyBwdC54MSkgLyAyO1xuICAgICAgICAgICAgcHQueTAgPSBwdC55MSA9IChwdC55MCArIHB0LnkxKSAvIDI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtaW5WaXNpYmxlRGVwdGggPSBNYXRoLm1pbihtaW5WaXNpYmxlRGVwdGgsIGRlcHRoKTtcbiAgICAgICAgICAgIG1heFZpc2libGVEZXB0aCA9IE1hdGgubWF4KG1heFZpc2libGVEZXB0aCwgZGVwdGgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBzbGljZXMgPSBzbGljZXMuZGF0YShzbGljZURhdGEsIGhlbHBlcnMuZ2V0UHRJZCk7XG5cbiAgICB0cmFjZS5fbWF4VmlzaWJsZUxheWVycyA9IGlzRmluaXRlKG1heFZpc2libGVEZXB0aCkgPyBtYXhWaXNpYmxlRGVwdGggLSBtaW5WaXNpYmxlRGVwdGggKyAxIDogMDtcblxuICAgIHNsaWNlcy5lbnRlcigpLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKCdzbGljZScsIHRydWUpO1xuXG4gICAgaGFuZGxlU2xpY2VzRXhpdChzbGljZXMsIG9uUGF0aGJhciwgcmVmUmVjdCwgW3dpZHRoLCBoZWlnaHRdLCBwYXRoU2xpY2UpO1xuXG4gICAgc2xpY2VzLm9yZGVyKCk7XG5cbiAgICAvLyBuZXh0IGNvb3JkcyBvZiBwcmV2aW91cyBlbnRyeVxuICAgIHZhciBuZXh0T2ZQcmV2RW50cnkgPSBudWxsO1xuICAgIGlmKGhhc1RyYW5zaXRpb24gJiYgcHJldkVudHJ5KSB7XG4gICAgICAgIHZhciBwcmV2RW50cnlJZCA9IGhlbHBlcnMuZ2V0UHRJZChwcmV2RW50cnkpO1xuICAgICAgICBzbGljZXMuZWFjaChmdW5jdGlvbihwdCkge1xuICAgICAgICAgICAgaWYobmV4dE9mUHJldkVudHJ5ID09PSBudWxsICYmIChoZWxwZXJzLmdldFB0SWQocHQpID09PSBwcmV2RW50cnlJZCkpIHtcbiAgICAgICAgICAgICAgICBuZXh0T2ZQcmV2RW50cnkgPSB7XG4gICAgICAgICAgICAgICAgICAgIHgwOiBwdC54MCxcbiAgICAgICAgICAgICAgICAgICAgeDE6IHB0LngxLFxuICAgICAgICAgICAgICAgICAgICB5MDogcHQueTAsXG4gICAgICAgICAgICAgICAgICAgIHkxOiBwdC55MVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHZhciBnZXRSZWZSZWN0ID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBuZXh0T2ZQcmV2RW50cnkgfHwge1xuICAgICAgICAgICAgeDA6IDAsXG4gICAgICAgICAgICB4MTogd2lkdGgsXG4gICAgICAgICAgICB5MDogMCxcbiAgICAgICAgICAgIHkxOiBoZWlnaHRcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIHVwZGF0ZVNsaWNlcyA9IHNsaWNlcztcbiAgICBpZihoYXNUcmFuc2l0aW9uKSB7XG4gICAgICAgIHVwZGF0ZVNsaWNlcyA9IHVwZGF0ZVNsaWNlcy50cmFuc2l0aW9uKCkuZWFjaCgnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBOLkIuIGdkLl90cmFuc2l0aW9uaW5nIGlzIChzdGlsbCkgKnRydWUqIGJ5IHRoZSB0aW1lXG4gICAgICAgICAgICAvLyB0cmFuc2l0aW9uIHVwZGF0ZXMgZ2V0IGhlcmVcbiAgICAgICAgICAgIHZhciBzbGljZVRvcCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgIGhlbHBlcnMuc2V0U2xpY2VDdXJzb3Ioc2xpY2VUb3AsIGdkLCB7XG4gICAgICAgICAgICAgICAgaGlkZU9uUm9vdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoaWRlT25MZWF2ZXM6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGlzVHJhbnNpdGlvbmluZzogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVTbGljZXMuZWFjaChmdW5jdGlvbihwdCkge1xuICAgICAgICB2YXIgaXNIZWFkZXIgPSBoZWxwZXJzLmlzSGVhZGVyKHB0LCB0cmFjZSk7XG5cbiAgICAgICAgcHQuX2hvdmVyWCA9IHZpZXdYKHB0LngxIC0gdHJhY2UubWFya2VyLnBhZC5yKSxcbiAgICAgICAgcHQuX2hvdmVyWSA9IGhhc0JvdHRvbSA/XG4gICAgICAgICAgICAgICAgdmlld1kocHQueTEgLSB0cmFjZS5tYXJrZXIucGFkLmIgLyAyKSA6XG4gICAgICAgICAgICAgICAgdmlld1kocHQueTAgKyB0cmFjZS5tYXJrZXIucGFkLnQgLyAyKTtcblxuICAgICAgICB2YXIgc2xpY2VUb3AgPSBkMy5zZWxlY3QodGhpcyk7XG5cbiAgICAgICAgdmFyIHNsaWNlUGF0aCA9IExpYi5lbnN1cmVTaW5nbGUoc2xpY2VUb3AsICdwYXRoJywgJ3N1cmZhY2UnLCBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICBzLnN0eWxlKCdwb2ludGVyLWV2ZW50cycsICdhbGwnKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoaGFzVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgc2xpY2VQYXRoLnRyYW5zaXRpb24oKS5hdHRyVHdlZW4oJ2QnLCBmdW5jdGlvbihwdDIpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW50ZXJwID0gbWFrZVVwZGF0ZVNsaWNlSW50ZXJwb2xhdG9yKHB0Miwgb25QYXRoYmFyLCBnZXRSZWZSZWN0KCksIFt3aWR0aCwgaGVpZ2h0XSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIHBhdGhTbGljZShpbnRlcnAodCkpOyB9O1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzbGljZVBhdGguYXR0cignZCcsIHBhdGhTbGljZSk7XG4gICAgICAgIH1cblxuICAgICAgICBzbGljZVRvcFxuICAgICAgICAgICAgLmNhbGwoYXR0YWNoRnhIYW5kbGVycywgZW50cnksIGdkLCBjZCwge1xuICAgICAgICAgICAgICAgIHN0eWxlT25lOiBzdHlsZU9uZSxcbiAgICAgICAgICAgICAgICBldmVudERhdGFLZXlzOiBjb25zdGFudHMuZXZlbnREYXRhS2V5cyxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uVGltZTogY29uc3RhbnRzLkNMSUNLX1RSQU5TSVRJT05fVElNRSxcbiAgICAgICAgICAgICAgICB0cmFuc2l0aW9uRWFzaW5nOiBjb25zdGFudHMuQ0xJQ0tfVFJBTlNJVElPTl9FQVNJTkdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuY2FsbChoZWxwZXJzLnNldFNsaWNlQ3Vyc29yLCBnZCwgeyBpc1RyYW5zaXRpb25pbmc6IGdkLl90cmFuc2l0aW9uaW5nIH0pO1xuXG4gICAgICAgIHNsaWNlUGF0aC5jYWxsKHN0eWxlT25lLCBwdCwgdHJhY2UsIHtcbiAgICAgICAgICAgIGhvdmVyZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHB0LngwID09PSBwdC54MSB8fCBwdC55MCA9PT0gcHQueTEpIHtcbiAgICAgICAgICAgIHB0Ll90ZXh0ID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZihpc0hlYWRlcikge1xuICAgICAgICAgICAgICAgIHB0Ll90ZXh0ID0gbm9Sb29tRm9ySGVhZGVyID8gJycgOiBoZWxwZXJzLmdldFB0TGFiZWwocHQpIHx8ICcnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwdC5fdGV4dCA9IGZvcm1hdFNsaWNlTGFiZWwocHQsIGVudHJ5LCB0cmFjZSwgY2QsIGZ1bGxMYXlvdXQpIHx8ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHNsaWNlVGV4dEdyb3VwID0gTGliLmVuc3VyZVNpbmdsZShzbGljZVRvcCwgJ2cnLCAnc2xpY2V0ZXh0Jyk7XG4gICAgICAgIHZhciBzbGljZVRleHQgPSBMaWIuZW5zdXJlU2luZ2xlKHNsaWNlVGV4dEdyb3VwLCAndGV4dCcsICcnLCBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICAvLyBwcm9oaWJpdCB0ZXggaW50ZXJwcmV0YXRpb24gdW50aWwgd2UgY2FuIGhhbmRsZVxuICAgICAgICAgICAgLy8gdGV4IGFuZCByZWd1bGFyIHRleHQgdG9nZXRoZXJcbiAgICAgICAgICAgIHMuYXR0cignZGF0YS1ub3RleCcsIDEpO1xuICAgICAgICB9KTtcblxuICAgICAgICB2YXIgZm9udCA9IExpYi5lbnN1cmVVbmlmb3JtRm9udFNpemUoZ2QsIGhlbHBlcnMuZGV0ZXJtaW5lVGV4dEZvbnQodHJhY2UsIHB0LCBmdWxsTGF5b3V0LmZvbnQpKTtcblxuICAgICAgICBzbGljZVRleHQudGV4dChwdC5fdGV4dCB8fCAnICcpIC8vIHVzZSBvbmUgc3BhY2UgY2hhcmFjdGVyIGluc3RlYWQgb2YgYSBibGFuayBzdHJpbmcgdG8gYXZvaWQganVtcHMgZHVyaW5nIHRyYW5zaXRpb25cbiAgICAgICAgICAgIC5jbGFzc2VkKCdzbGljZXRleHQnLCB0cnVlKVxuICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgaGFzUmlnaHQgPyAnZW5kJyA6IChoYXNMZWZ0IHx8IGlzSGVhZGVyKSA/ICdzdGFydCcgOiAnbWlkZGxlJylcbiAgICAgICAgICAgIC5jYWxsKERyYXdpbmcuZm9udCwgZm9udClcbiAgICAgICAgICAgIC5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcblxuICAgICAgICBwdC50ZXh0QkIgPSBEcmF3aW5nLmJCb3goc2xpY2VUZXh0Lm5vZGUoKSk7XG4gICAgICAgIHB0LnRyYW5zZm9ybSA9IHRvTW92ZUluc2lkZVNsaWNlKHB0LCB7XG4gICAgICAgICAgICBmb250U2l6ZTogZm9udC5zaXplLFxuICAgICAgICAgICAgaXNIZWFkZXI6IGlzSGVhZGVyXG4gICAgICAgIH0pO1xuICAgICAgICBwdC50cmFuc2Zvcm0uZm9udFNpemUgPSBmb250LnNpemU7XG5cbiAgICAgICAgaWYoaGFzVHJhbnNpdGlvbikge1xuICAgICAgICAgICAgc2xpY2VUZXh0LnRyYW5zaXRpb24oKS5hdHRyVHdlZW4oJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKHB0Mikge1xuICAgICAgICAgICAgICAgIHZhciBpbnRlcnAgPSBtYWtlVXBkYXRlVGV4dEludGVycG9sYXRvcihwdDIsIG9uUGF0aGJhciwgZ2V0UmVmUmVjdCgpLCBbd2lkdGgsIGhlaWdodF0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbih0KSB7IHJldHVybiBzdHJUcmFuc2Zvcm0oaW50ZXJwKHQpKTsgfTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2xpY2VUZXh0LmF0dHIoJ3RyYW5zZm9ybScsIHN0clRyYW5zZm9ybShwdCkpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbmV4dE9mUHJldkVudHJ5O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgbW9kdWxlVHlwZTogJ3RyYWNlJyxcbiAgICBuYW1lOiAndHJlZW1hcCcsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4vYmFzZV9wbG90JyksXG4gICAgY2F0ZWdvcmllczogW10sXG4gICAgYW5pbWF0YWJsZTogdHJ1ZSxcblxuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIGxheW91dEF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vbGF5b3V0X2F0dHJpYnV0ZXMnKSxcbiAgICBzdXBwbHlEZWZhdWx0czogcmVxdWlyZSgnLi9kZWZhdWx0cycpLFxuICAgIHN1cHBseUxheW91dERlZmF1bHRzOiByZXF1aXJlKCcuL2xheW91dF9kZWZhdWx0cycpLFxuXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY2FsYyxcbiAgICBjcm9zc1RyYWNlQ2FsYzogcmVxdWlyZSgnLi9jYWxjJykuY3Jvc3NUcmFjZUNhbGMsXG5cbiAgICBwbG90OiByZXF1aXJlKCcuL3Bsb3QnKSxcbiAgICBzdHlsZTogcmVxdWlyZSgnLi9zdHlsZScpLnN0eWxlLFxuXG4gICAgY29sb3JiYXI6IHJlcXVpcmUoJy4uL3NjYXR0ZXIvbWFya2VyX2NvbG9yYmFyJyksXG5cbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVmlzdWFsaXplIGhpZXJhcmNoYWwgZGF0YSBmcm9tIGxlYXZlcyAoYW5kL29yIG91dGVyIGJyYW5jaGVzKSB0b3dhcmRzIHJvb3QnLFxuICAgICAgICAgICAgJ3dpdGggcmVjdGFuZ2xlcy4gVGhlIHRyZWVtYXAgc2VjdG9ycyBhcmUgZGV0ZXJtaW5lZCBieSB0aGUgZW50cmllcyBpbicsXG4gICAgICAgICAgICAnKmxhYmVscyogb3IgKmlkcyogYW5kIGluICpwYXJlbnRzKi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdHJlZW1hcGNvbG9yd2F5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdjb2xvcmxpc3QnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGRlZmF1bHQgdHJlZW1hcCBzbGljZSBjb2xvcnMuIERlZmF1bHRzIHRvIHRoZSBtYWluJyxcbiAgICAgICAgICAgICdgY29sb3J3YXlgIHVzZWQgZm9yIHRyYWNlIGNvbG9ycy4gSWYgeW91IHNwZWNpZnkgYSBuZXcnLFxuICAgICAgICAgICAgJ2xpc3QgaGVyZSBpdCBjYW4gc3RpbGwgYmUgZXh0ZW5kZWQgd2l0aCBsaWdodGVyIGFuZCBkYXJrZXInLFxuICAgICAgICAgICAgJ2NvbG9ycywgc2VlIGBleHRlbmR0cmVlbWFwY29sb3JzYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBleHRlbmR0cmVlbWFwY29sb3JzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdJZiBgdHJ1ZWAsIHRoZSB0cmVlbWFwIHNsaWNlIGNvbG9ycyAod2hldGhlciBnaXZlbiBieSBgdHJlZW1hcGNvbG9yd2F5YCBvcicsXG4gICAgICAgICAgICAnaW5oZXJpdGVkIGZyb20gYGNvbG9yd2F5YCkgd2lsbCBiZSBleHRlbmRlZCB0byB0aHJlZSB0aW1lcyBpdHMnLFxuICAgICAgICAgICAgJ29yaWdpbmFsIGxlbmd0aCBieSBmaXJzdCByZXBlYXRpbmcgZXZlcnkgY29sb3IgMjAlIGxpZ2h0ZXIgdGhlbicsXG4gICAgICAgICAgICAnZWFjaCBjb2xvciAyMCUgZGFya2VyLiBUaGlzIGlzIGludGVuZGVkIHRvIHJlZHVjZSB0aGUgbGlrZWxpaG9vZCcsXG4gICAgICAgICAgICAnb2YgcmV1c2luZyB0aGUgc2FtZSBjb2xvciB3aGVuIHlvdSBoYXZlIG1hbnkgc2xpY2VzLCBidXQgeW91IGNhbicsXG4gICAgICAgICAgICAnc2V0IGBmYWxzZWAgdG8gZGlzYWJsZS4nLFxuICAgICAgICAgICAgJ0NvbG9ycyBwcm92aWRlZCBpbiB0aGUgdHJhY2UsIHVzaW5nIGBtYXJrZXIuY29sb3JzYCwgYXJlIG5ldmVyJyxcbiAgICAgICAgICAgICdleHRlbmRlZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGxheW91dEF0dHJpYnV0ZXMgPSByZXF1aXJlKCcuL2xheW91dF9hdHRyaWJ1dGVzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3VwcGx5TGF5b3V0RGVmYXVsdHMobGF5b3V0SW4sIGxheW91dE91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGxheW91dEluLCBsYXlvdXRPdXQsIGxheW91dEF0dHJpYnV0ZXMsIGF0dHIsIGRmbHQpO1xuICAgIH1cbiAgICBjb2VyY2UoJ3RyZWVtYXBjb2xvcndheScsIGxheW91dE91dC5jb2xvcndheSk7XG4gICAgY29lcmNlKCdleHRlbmR0cmVlbWFwY29sb3JzJyk7XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDNIaWVyYXJjaHkgPSByZXF1aXJlKCdkMy1oaWVyYXJjaHknKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJ0aXRpb24oZW50cnksIHNpemUsIG9wdHMpIHtcbiAgICB2YXIgZmxpcFggPSBvcHRzLmZsaXBYO1xuICAgIHZhciBmbGlwWSA9IG9wdHMuZmxpcFk7XG4gICAgdmFyIHN3YXBYWSA9IG9wdHMucGFja2luZyA9PT0gJ2RpY2Utc2xpY2UnO1xuXG4gICAgdmFyIHRvcCA9IG9wdHMucGFkW2ZsaXBZID8gJ2JvdHRvbScgOiAndG9wJ107XG4gICAgdmFyIGxlZnQgPSBvcHRzLnBhZFtmbGlwWCA/ICdyaWdodCcgOiAnbGVmdCddO1xuICAgIHZhciByaWdodCA9IG9wdHMucGFkW2ZsaXBYID8gJ2xlZnQnIDogJ3JpZ2h0J107XG4gICAgdmFyIGJvdHRvbSA9IG9wdHMucGFkW2ZsaXBZID8gJ3RvcCcgOiAnYm90dG9tJ107XG5cbiAgICB2YXIgdG1wO1xuICAgIGlmKHN3YXBYWSkge1xuICAgICAgICB0bXAgPSBsZWZ0O1xuICAgICAgICBsZWZ0ID0gdG9wO1xuICAgICAgICB0b3AgPSB0bXA7XG5cbiAgICAgICAgdG1wID0gcmlnaHQ7XG4gICAgICAgIHJpZ2h0ID0gYm90dG9tO1xuICAgICAgICBib3R0b20gPSB0bXA7XG4gICAgfVxuXG4gICAgdmFyIHJlc3VsdCA9IGQzSGllcmFyY2h5XG4gICAgICAgIC50cmVlbWFwKClcbiAgICAgICAgLnRpbGUoZ2V0VGlsaW5nTWV0aG9kKG9wdHMucGFja2luZywgb3B0cy5zcXVhcmlmeXJhdGlvKSlcbiAgICAgICAgLnBhZGRpbmdJbm5lcihvcHRzLnBhZC5pbm5lcilcbiAgICAgICAgLnBhZGRpbmdMZWZ0KGxlZnQpXG4gICAgICAgIC5wYWRkaW5nUmlnaHQocmlnaHQpXG4gICAgICAgIC5wYWRkaW5nVG9wKHRvcClcbiAgICAgICAgLnBhZGRpbmdCb3R0b20oYm90dG9tKVxuICAgICAgICAuc2l6ZShcbiAgICAgICAgICAgIHN3YXBYWSA/IFtzaXplWzFdLCBzaXplWzBdXSA6IHNpemVcbiAgICAgICAgKShlbnRyeSk7XG5cbiAgICBpZihzd2FwWFkgfHwgZmxpcFggfHwgZmxpcFkpIHtcbiAgICAgICAgZmxpcFRyZWUocmVzdWx0LCBzaXplLCB7XG4gICAgICAgICAgICBzd2FwWFk6IHN3YXBYWSxcbiAgICAgICAgICAgIGZsaXBYOiBmbGlwWCxcbiAgICAgICAgICAgIGZsaXBZOiBmbGlwWVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmZ1bmN0aW9uIGdldFRpbGluZ01ldGhvZChrZXksIHNxdWFyaWZ5cmF0aW8pIHtcbiAgICBzd2l0Y2goa2V5KSB7XG4gICAgICAgIGNhc2UgJ3NxdWFyaWZ5JzpcbiAgICAgICAgICAgIHJldHVybiBkM0hpZXJhcmNoeS50cmVlbWFwU3F1YXJpZnkucmF0aW8oc3F1YXJpZnlyYXRpbyk7XG4gICAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgICAgICByZXR1cm4gZDNIaWVyYXJjaHkudHJlZW1hcEJpbmFyeTtcbiAgICAgICAgY2FzZSAnZGljZSc6XG4gICAgICAgICAgICByZXR1cm4gZDNIaWVyYXJjaHkudHJlZW1hcERpY2U7XG4gICAgICAgIGNhc2UgJ3NsaWNlJzpcbiAgICAgICAgICAgIHJldHVybiBkM0hpZXJhcmNoeS50cmVlbWFwU2xpY2U7XG4gICAgICAgIGRlZmF1bHQ6IC8vIGkuZS4gJ3NsaWNlLWRpY2UnIHwgJ2RpY2Utc2xpY2UnXG4gICAgICAgICAgICByZXR1cm4gZDNIaWVyYXJjaHkudHJlZW1hcFNsaWNlRGljZTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZsaXBUcmVlKG5vZGUsIHNpemUsIG9wdHMpIHtcbiAgICB2YXIgdG1wO1xuXG4gICAgaWYob3B0cy5zd2FwWFkpIHtcbiAgICAgICAgLy8gc3dhcCB4MCBhbmQgeTBcbiAgICAgICAgdG1wID0gbm9kZS54MDtcbiAgICAgICAgbm9kZS54MCA9IG5vZGUueTA7XG4gICAgICAgIG5vZGUueTAgPSB0bXA7XG5cbiAgICAgICAgLy8gc3dhcCB4MSBhbmQgeTFcbiAgICAgICAgdG1wID0gbm9kZS54MTtcbiAgICAgICAgbm9kZS54MSA9IG5vZGUueTE7XG4gICAgICAgIG5vZGUueTEgPSB0bXA7XG4gICAgfVxuXG4gICAgaWYob3B0cy5mbGlwWCkge1xuICAgICAgICB0bXAgPSBub2RlLngwO1xuICAgICAgICBub2RlLngwID0gc2l6ZVswXSAtIG5vZGUueDE7XG4gICAgICAgIG5vZGUueDEgPSBzaXplWzBdIC0gdG1wO1xuICAgIH1cblxuICAgIGlmKG9wdHMuZmxpcFkpIHtcbiAgICAgICAgdG1wID0gbm9kZS55MDtcbiAgICAgICAgbm9kZS55MCA9IHNpemVbMV0gLSBub2RlLnkxO1xuICAgICAgICBub2RlLnkxID0gc2l6ZVsxXSAtIHRtcDtcbiAgICB9XG5cbiAgICB2YXIgY2hpbGRyZW4gPSBub2RlLmNoaWxkcmVuO1xuICAgIGlmKGNoaWxkcmVuKSB7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZmxpcFRyZWUoY2hpbGRyZW5baV0sIHNpemUsIG9wdHMpO1xuICAgICAgICB9XG4gICAgfVxufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4uL3N1bmJ1cnN0L2hlbHBlcnMnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIFRFWFRQQUQgPSByZXF1aXJlKCcuLi9iYXIvY29uc3RhbnRzJykuVEVYVFBBRDtcbnZhciBiYXJQbG90ID0gcmVxdWlyZSgnLi4vYmFyL3Bsb3QnKTtcbnZhciB0b01vdmVJbnNpZGVCYXIgPSBiYXJQbG90LnRvTW92ZUluc2lkZUJhcjtcbnZhciB1bmlmb3JtVGV4dCA9IHJlcXVpcmUoJy4uL2Jhci91bmlmb3JtX3RleHQnKTtcbnZhciByZWNvcmRNaW5UZXh0U2l6ZSA9IHVuaWZvcm1UZXh0LnJlY29yZE1pblRleHRTaXplO1xudmFyIGNsZWFyTWluVGV4dFNpemUgPSB1bmlmb3JtVGV4dC5jbGVhck1pblRleHRTaXplO1xudmFyIHJlc2l6ZVRleHQgPSByZXF1aXJlKCcuLi9iYXIvc3R5bGUnKS5yZXNpemVUZXh0O1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgZHJhd0Rlc2NlbmRhbnRzID0gcmVxdWlyZSgnLi9kcmF3X2Rlc2NlbmRhbnRzJyk7XG52YXIgZHJhd0FuY2VzdG9ycyA9IHJlcXVpcmUoJy4vZHJhd19hbmNlc3RvcnMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihnZCwgY2Rtb2R1bGUsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgbGF5ZXIgPSBmdWxsTGF5b3V0Ll90cmVlbWFwbGF5ZXI7XG4gICAgdmFyIGpvaW4sIG9uQ29tcGxldGU7XG5cbiAgICAvLyBJZiB0cmFuc2l0aW9uIGNvbmZpZyBpcyBwcm92aWRlZCwgdGhlbiBpdCBpcyBvbmx5IGEgcGFydGlhbCByZXBsb3QgYW5kIHRyYWNlcyBub3RcbiAgICAvLyB1cGRhdGVkIGFyZSByZW1vdmVkLlxuICAgIHZhciBpc0Z1bGxSZXBsb3QgPSAhdHJhbnNpdGlvbk9wdHM7XG5cbiAgICBjbGVhck1pblRleHRTaXplKCd0cmVlbWFwJywgZnVsbExheW91dCk7XG5cbiAgICBqb2luID0gbGF5ZXIuc2VsZWN0QWxsKCdnLnRyYWNlLnRyZWVtYXAnKVxuICAgICAgICAuZGF0YShjZG1vZHVsZSwgZnVuY3Rpb24oY2QpIHsgcmV0dXJuIGNkWzBdLnRyYWNlLnVpZDsgfSk7XG5cbiAgICBqb2luLmVudGVyKCkuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ3RyYWNlJywgdHJ1ZSlcbiAgICAgICAgLmNsYXNzZWQoJ3RyZWVtYXAnLCB0cnVlKTtcblxuICAgIGpvaW4ub3JkZXIoKTtcblxuICAgIGlmKCFmdWxsTGF5b3V0LnVuaWZvcm10ZXh0Lm1vZGUgJiYgaGVscGVycy5oYXNUcmFuc2l0aW9uKHRyYW5zaXRpb25PcHRzKSkge1xuICAgICAgICBpZihtYWtlT25Db21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgICAgICAgICAvLyBJZiBpdCB3YXMgcGFzc2VkIGEgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgY29tcGxldGlvbiwgbWFrZSBhIGNhbGxiYWNrLiBJZlxuICAgICAgICAgICAgLy8gdGhpcyBpcyBjcmVhdGVkLCB0aGVuIGl0IG11c3QgYmUgZXhlY3V0ZWQgb24gY29tcGxldGlvbiwgb3RoZXJ3aXNlIHRoZVxuICAgICAgICAgICAgLy8gcG9zLXRyYW5zaXRpb24gcmVkcmF3IHdpbGwgbm90IGV4ZWN1dGU6XG4gICAgICAgICAgICBvbkNvbXBsZXRlID0gbWFrZU9uQ29tcGxldGVDYWxsYmFjaygpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHRyYW5zaXRpb24gPSBkMy50cmFuc2l0aW9uKClcbiAgICAgICAgICAgIC5kdXJhdGlvbih0cmFuc2l0aW9uT3B0cy5kdXJhdGlvbilcbiAgICAgICAgICAgIC5lYXNlKHRyYW5zaXRpb25PcHRzLmVhc2luZylcbiAgICAgICAgICAgIC5lYWNoKCdlbmQnLCBmdW5jdGlvbigpIHsgb25Db21wbGV0ZSAmJiBvbkNvbXBsZXRlKCk7IH0pXG4gICAgICAgICAgICAuZWFjaCgnaW50ZXJydXB0JywgZnVuY3Rpb24oKSB7IG9uQ29tcGxldGUgJiYgb25Db21wbGV0ZSgpOyB9KTtcblxuICAgICAgICB0cmFuc2l0aW9uLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBNdXN0IHJ1biB0aGUgc2VsZWN0aW9uIGFnYWluIHNpbmNlIG90aGVyd2lzZSBlbnRlcnMvdXBkYXRlcyBnZXQgZ3JvdXBlZCB0b2dldGhlclxuICAgICAgICAgICAgLy8gYW5kIHRoZXNlIGdldCBleGVjdXRlZCBvdXQgb2Ygb3JkZXIuIEV4Y2VwdCB3ZSBuZWVkIHRoZW0gaW4gb3JkZXIhXG4gICAgICAgICAgICBsYXllci5zZWxlY3RBbGwoJ2cudHJhY2UnKS5lYWNoKGZ1bmN0aW9uKGNkKSB7XG4gICAgICAgICAgICAgICAgcGxvdE9uZShnZCwgY2QsIHRoaXMsIHRyYW5zaXRpb25PcHRzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBqb2luLmVhY2goZnVuY3Rpb24oY2QpIHtcbiAgICAgICAgICAgIHBsb3RPbmUoZ2QsIGNkLCB0aGlzLCB0cmFuc2l0aW9uT3B0cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKGZ1bGxMYXlvdXQudW5pZm9ybXRleHQubW9kZSkge1xuICAgICAgICAgICAgcmVzaXplVGV4dChnZCwgZnVsbExheW91dC5fdHJlZW1hcGxheWVyLnNlbGVjdEFsbCgnLnRyYWNlJyksICd0cmVlbWFwJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihpc0Z1bGxSZXBsb3QpIHtcbiAgICAgICAgam9pbi5leGl0KCkucmVtb3ZlKCk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gZ2V0S2V5KHB0KSB7XG4gICAgcmV0dXJuIGhlbHBlcnMuaXNIaWVyYXJjaHlSb290KHB0KSA/XG4gICAgICAgICcnIDogLy8gZG9uJ3QgdXNlIHRoZSBkdW1teUlkXG4gICAgICAgIGhlbHBlcnMuZ2V0UHRJZChwdCk7XG59XG5cbmZ1bmN0aW9uIHBsb3RPbmUoZ2QsIGNkLCBlbGVtZW50LCB0cmFuc2l0aW9uT3B0cykge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGNkMCA9IGNkWzBdO1xuICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcbiAgICB2YXIgaGllcmFyY2h5ID0gY2QwLmhpZXJhcmNoeTtcbiAgICB2YXIgZW50cnkgPSBoZWxwZXJzLmZpbmRFbnRyeVdpdGhMZXZlbChoaWVyYXJjaHksIHRyYWNlLmxldmVsKTtcblxuICAgIHZhciBnVHJhY2UgPSBkMy5zZWxlY3QoZWxlbWVudCk7XG4gICAgdmFyIHNlbEFuY2VzdG9ycyA9IGdUcmFjZS5zZWxlY3RBbGwoJ2cucGF0aGJhcicpO1xuICAgIHZhciBzZWxEZXNjZW5kYW50cyA9IGdUcmFjZS5zZWxlY3RBbGwoJ2cuc2xpY2UnKTtcblxuICAgIGlmKCFlbnRyeSkge1xuICAgICAgICBzZWxBbmNlc3RvcnMucmVtb3ZlKCk7XG4gICAgICAgIHNlbERlc2NlbmRhbnRzLnJlbW92ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIGlzUm9vdCA9IGhlbHBlcnMuaXNIaWVyYXJjaHlSb290KGVudHJ5KTtcbiAgICB2YXIgaGFzVHJhbnNpdGlvbiA9ICFmdWxsTGF5b3V0LnVuaWZvcm10ZXh0Lm1vZGUgJiYgaGVscGVycy5oYXNUcmFuc2l0aW9uKHRyYW5zaXRpb25PcHRzKTtcblxuICAgIHZhciBtYXhEZXB0aCA9IGhlbHBlcnMuZ2V0TWF4RGVwdGgodHJhY2UpO1xuICAgIHZhciBoYXNWaXNpYmxlRGVwdGggPSBmdW5jdGlvbihwdCkge1xuICAgICAgICByZXR1cm4gcHQuZGF0YS5kZXB0aCAtIGVudHJ5LmRhdGEuZGVwdGggPCBtYXhEZXB0aDtcbiAgICB9O1xuXG4gICAgdmFyIGdzID0gZnVsbExheW91dC5fc2l6ZTtcbiAgICB2YXIgZG9tYWluID0gdHJhY2UuZG9tYWluO1xuXG4gICAgdmFyIHZwdyA9IGdzLncgKiAoZG9tYWluLnhbMV0gLSBkb21haW4ueFswXSk7XG4gICAgdmFyIHZwaCA9IGdzLmggKiAoZG9tYWluLnlbMV0gLSBkb21haW4ueVswXSk7XG4gICAgdmFyIGJhclcgPSB2cHc7XG4gICAgdmFyIGJhckggPSB0cmFjZS5wYXRoYmFyLnRoaWNrbmVzcztcbiAgICB2YXIgYmFyUGFkID0gdHJhY2UubWFya2VyLmxpbmUud2lkdGggKyBjb25zdGFudHMuZ2FwV2l0aFBhdGhiYXI7XG4gICAgdmFyIGJhckRpZlkgPSAhdHJhY2UucGF0aGJhci52aXNpYmxlID8gMCA6XG4gICAgICAgIHRyYWNlLnBhdGhiYXIuc2lkZS5pbmRleE9mKCdib3R0b20nKSA+IC0xID8gdnBoICsgYmFyUGFkIDogLShiYXJIICsgYmFyUGFkKTtcblxuICAgIHZhciBwYXRoYmFyT3JpZ2luID0ge1xuICAgICAgICB4MDogYmFyVywgLy8gc2xpZGUgdG8gdGhlIHJpZ2h0XG4gICAgICAgIHgxOiBiYXJXLFxuICAgICAgICB5MDogYmFyRGlmWSxcbiAgICAgICAgeTE6IGJhckRpZlkgKyBiYXJIXG4gICAgfTtcblxuICAgIHZhciBmaW5kQ2xvc2VzdEVkZ2UgPSBmdW5jdGlvbihwdCwgcmVmLCBzaXplKSB7XG4gICAgICAgIHZhciBlID0gdHJhY2UudGlsaW5nLnBhZDtcbiAgICAgICAgdmFyIGlzTGVmdE9mUmVjdCA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggLSBlIDw9IHJlZi54MDsgfTtcbiAgICAgICAgdmFyIGlzUmlnaHRPZlJlY3QgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4ICsgZSA+PSByZWYueDE7IH07XG4gICAgICAgIHZhciBpc0JvdHRvbU9mUmVjdCA9IGZ1bmN0aW9uKHkpIHsgcmV0dXJuIHkgLSBlIDw9IHJlZi55MDsgfTtcbiAgICAgICAgdmFyIGlzVG9wT2ZSZWN0ID0gZnVuY3Rpb24oeSkgeyByZXR1cm4geSArIGUgPj0gcmVmLnkxOyB9O1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB4MDogaXNMZWZ0T2ZSZWN0KHB0LngwIC0gZSkgPyAwIDogaXNSaWdodE9mUmVjdChwdC54MCAtIGUpID8gc2l6ZVswXSA6IHB0LngwLFxuICAgICAgICAgICAgeDE6IGlzTGVmdE9mUmVjdChwdC54MSArIGUpID8gMCA6IGlzUmlnaHRPZlJlY3QocHQueDEgKyBlKSA/IHNpemVbMF0gOiBwdC54MSxcbiAgICAgICAgICAgIHkwOiBpc0JvdHRvbU9mUmVjdChwdC55MCAtIGUpID8gMCA6IGlzVG9wT2ZSZWN0KHB0LnkwIC0gZSkgPyBzaXplWzFdIDogcHQueTAsXG4gICAgICAgICAgICB5MTogaXNCb3R0b21PZlJlY3QocHQueTEgKyBlKSA/IDAgOiBpc1RvcE9mUmVjdChwdC55MSArIGUpID8gc2l6ZVsxXSA6IHB0LnkxXG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIHN0YXNoIG9mICdwcmV2aW91cycgcG9zaXRpb24gZGF0YSB1c2VkIGJ5IHR3ZWVuaW5nIGZ1bmN0aW9uc1xuICAgIHZhciBwcmV2RW50cnkgPSBudWxsO1xuICAgIHZhciBwcmV2TG9va3VwUGF0aGJhciA9IHt9O1xuICAgIHZhciBwcmV2TG9va3VwU2xpY2VzID0ge307XG4gICAgdmFyIG5leHRPZlByZXZFbnRyeSA9IG51bGw7XG4gICAgdmFyIGdldFByZXYgPSBmdW5jdGlvbihwdCwgb25QYXRoYmFyKSB7XG4gICAgICAgIHJldHVybiBvblBhdGhiYXIgP1xuICAgICAgICAgICAgcHJldkxvb2t1cFBhdGhiYXJbZ2V0S2V5KHB0KV0gOlxuICAgICAgICAgICAgcHJldkxvb2t1cFNsaWNlc1tnZXRLZXkocHQpXTtcbiAgICB9O1xuXG4gICAgdmFyIGdldE9yaWdpbiA9IGZ1bmN0aW9uKHB0LCBvblBhdGhiYXIsIHJlZlJlY3QsIHNpemUpIHtcbiAgICAgICAgaWYob25QYXRoYmFyKSB7XG4gICAgICAgICAgICByZXR1cm4gcHJldkxvb2t1cFBhdGhiYXJbZ2V0S2V5KGhpZXJhcmNoeSldIHx8IHBhdGhiYXJPcmlnaW47XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcmVmID0gcHJldkxvb2t1cFNsaWNlc1t0cmFjZS5sZXZlbF0gfHwgcmVmUmVjdDtcblxuICAgICAgICAgICAgaWYoaGFzVmlzaWJsZURlcHRoKHB0KSkgeyAvLyBjYXNlIG9mIGFuIGVtcHR5IG9iamVjdCAtIGhhcHBlbnMgd2hlbiBtYXhkZXB0aCBpcyBzZXRcbiAgICAgICAgICAgICAgICByZXR1cm4gZmluZENsb3Nlc3RFZGdlKHB0LCByZWYsIHNpemUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9O1xuXG4gICAgLy8gTi5CLiBoYW5kbGUgbXVsdGlwbGUtcm9vdCBzcGVjaWFsIGNhc2VcbiAgICBpZihjZDAuaGFzTXVsdGlwbGVSb290cyAmJiBpc1Jvb3QpIHtcbiAgICAgICAgbWF4RGVwdGgrKztcbiAgICB9XG5cbiAgICB0cmFjZS5fbWF4RGVwdGggPSBtYXhEZXB0aDtcbiAgICB0cmFjZS5fYmFja2dyb3VuZENvbG9yID0gZnVsbExheW91dC5wYXBlcl9iZ2NvbG9yO1xuICAgIHRyYWNlLl9lbnRyeURlcHRoID0gZW50cnkuZGF0YS5kZXB0aDtcbiAgICB0cmFjZS5fYXRSb290TGV2ZWwgPSBpc1Jvb3Q7XG5cbiAgICB2YXIgY2VuWCA9IC12cHcgLyAyICsgZ3MubCArIGdzLncgKiAoZG9tYWluLnhbMV0gKyBkb21haW4ueFswXSkgLyAyO1xuICAgIHZhciBjZW5ZID0gLXZwaCAvIDIgKyBncy50ICsgZ3MuaCAqICgxIC0gKGRvbWFpbi55WzFdICsgZG9tYWluLnlbMF0pIC8gMik7XG5cbiAgICB2YXIgdmlld01hcFggPSBmdW5jdGlvbih4KSB7IHJldHVybiBjZW5YICsgeDsgfTtcbiAgICB2YXIgdmlld01hcFkgPSBmdW5jdGlvbih5KSB7IHJldHVybiBjZW5ZICsgeTsgfTtcblxuICAgIHZhciBiYXJZMCA9IHZpZXdNYXBZKDApO1xuICAgIHZhciBiYXJYMCA9IHZpZXdNYXBYKDApO1xuXG4gICAgdmFyIHZpZXdCYXJYID0gZnVuY3Rpb24oeCkgeyByZXR1cm4gYmFyWDAgKyB4OyB9O1xuICAgIHZhciB2aWV3QmFyWSA9IGZ1bmN0aW9uKHkpIHsgcmV0dXJuIGJhclkwICsgeTsgfTtcblxuICAgIGZ1bmN0aW9uIHBvcyh4LCB5KSB7XG4gICAgICAgIHJldHVybiB4ICsgJywnICsgeTtcbiAgICB9XG5cbiAgICB2YXIgeFN0YXJ0ID0gdmlld0JhclgoMCk7XG4gICAgdmFyIGxpbWl0WDAgPSBmdW5jdGlvbihwKSB7IHAueCA9IE1hdGgubWF4KHhTdGFydCwgcC54KTsgfTtcblxuICAgIHZhciBlZGdlc2hhcGUgPSB0cmFjZS5wYXRoYmFyLmVkZ2VzaGFwZTtcblxuICAgIC8vIHBhdGhiYXIoZGlyZWN0b3J5KSBwYXRoIGdlbmVyYXRpb24gZm5cbiAgICB2YXIgcGF0aEFuY2VzdG9yID0gZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgX3gwID0gdmlld0JhclgoTWF0aC5tYXgoTWF0aC5taW4oZC54MCwgZC54MCksIDApKTtcbiAgICAgICAgdmFyIF94MSA9IHZpZXdCYXJYKE1hdGgubWluKE1hdGgubWF4KGQueDEsIGQueDEpLCBiYXJXKSk7XG4gICAgICAgIHZhciBfeTAgPSB2aWV3QmFyWShkLnkwKTtcbiAgICAgICAgdmFyIF95MSA9IHZpZXdCYXJZKGQueTEpO1xuXG4gICAgICAgIHZhciBoYWxmSCA9IGJhckggLyAyO1xuXG4gICAgICAgIHZhciBwTCA9IHt9O1xuICAgICAgICB2YXIgcFIgPSB7fTtcblxuICAgICAgICBwTC54ID0gX3gwO1xuICAgICAgICBwUi54ID0gX3gxO1xuXG4gICAgICAgIHBMLnkgPSBwUi55ID0gKF95MCArIF95MSkgLyAyO1xuXG4gICAgICAgIHZhciBwQSA9IHt4OiBfeDAsIHk6IF95MH07XG4gICAgICAgIHZhciBwQiA9IHt4OiBfeDEsIHk6IF95MH07XG4gICAgICAgIHZhciBwQyA9IHt4OiBfeDEsIHk6IF95MX07XG4gICAgICAgIHZhciBwRCA9IHt4OiBfeDAsIHk6IF95MX07XG5cbiAgICAgICAgaWYoZWRnZXNoYXBlID09PSAnPicpIHtcbiAgICAgICAgICAgIHBBLnggLT0gaGFsZkg7XG4gICAgICAgICAgICBwQi54IC09IGhhbGZIO1xuICAgICAgICAgICAgcEMueCAtPSBoYWxmSDtcbiAgICAgICAgICAgIHBELnggLT0gaGFsZkg7XG4gICAgICAgIH0gZWxzZSBpZihlZGdlc2hhcGUgPT09ICcvJykge1xuICAgICAgICAgICAgcEMueCAtPSBoYWxmSDtcbiAgICAgICAgICAgIHBELnggLT0gaGFsZkg7XG4gICAgICAgICAgICBwTC54IC09IGhhbGZIIC8gMjtcbiAgICAgICAgICAgIHBSLnggLT0gaGFsZkggLyAyO1xuICAgICAgICB9IGVsc2UgaWYoZWRnZXNoYXBlID09PSAnXFxcXCcpIHtcbiAgICAgICAgICAgIHBBLnggLT0gaGFsZkg7XG4gICAgICAgICAgICBwQi54IC09IGhhbGZIO1xuICAgICAgICAgICAgcEwueCAtPSBoYWxmSCAvIDI7XG4gICAgICAgICAgICBwUi54IC09IGhhbGZIIC8gMjtcbiAgICAgICAgfSBlbHNlIGlmKGVkZ2VzaGFwZSA9PT0gJzwnKSB7XG4gICAgICAgICAgICBwTC54IC09IGhhbGZIO1xuICAgICAgICAgICAgcFIueCAtPSBoYWxmSDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxpbWl0WDAocEEpO1xuICAgICAgICBsaW1pdFgwKHBEKTtcbiAgICAgICAgbGltaXRYMChwTCk7XG5cbiAgICAgICAgbGltaXRYMChwQik7XG4gICAgICAgIGxpbWl0WDAocEMpO1xuICAgICAgICBsaW1pdFgwKHBSKTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAnTScgKyBwb3MocEEueCwgcEEueSkgK1xuICAgICAgICAgICAnTCcgKyBwb3MocEIueCwgcEIueSkgK1xuICAgICAgICAgICAnTCcgKyBwb3MocFIueCwgcFIueSkgK1xuICAgICAgICAgICAnTCcgKyBwb3MocEMueCwgcEMueSkgK1xuICAgICAgICAgICAnTCcgKyBwb3MocEQueCwgcEQueSkgK1xuICAgICAgICAgICAnTCcgKyBwb3MocEwueCwgcEwueSkgK1xuICAgICAgICAgICAnWidcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gc2xpY2UgcGF0aCBnZW5lcmF0aW9uIGZuXG4gICAgdmFyIHBhdGhEZXNjZW5kYW50ID0gZnVuY3Rpb24oZCkge1xuICAgICAgICB2YXIgX3gwID0gdmlld01hcFgoZC54MCk7XG4gICAgICAgIHZhciBfeDEgPSB2aWV3TWFwWChkLngxKTtcbiAgICAgICAgdmFyIF95MCA9IHZpZXdNYXBZKGQueTApO1xuICAgICAgICB2YXIgX3kxID0gdmlld01hcFkoZC55MSk7XG5cbiAgICAgICAgdmFyIGR4ID0gX3gxIC0gX3gwO1xuICAgICAgICB2YXIgZHkgPSBfeTEgLSBfeTA7XG4gICAgICAgIGlmKCFkeCB8fCAhZHkpIHJldHVybiAnJztcblxuICAgICAgICB2YXIgRklMTEVUID0gMDsgLy8gVE9ETzogbWF5IGV4cG9zZSB0aGlzIGNvbnN0YW50XG5cbiAgICAgICAgdmFyIHIgPSAoXG4gICAgICAgICAgICBkeCA+IDIgKiBGSUxMRVQgJiZcbiAgICAgICAgICAgIGR5ID4gMiAqIEZJTExFVFxuICAgICAgICApID8gRklMTEVUIDogMDtcblxuICAgICAgICB2YXIgYXJjID0gZnVuY3Rpb24ocngsIHJ5KSB7IHJldHVybiByID8gJ2EnICsgcG9zKHIsIHIpICsgJyAwIDAgMSAnICsgcG9zKHJ4LCByeSkgOiAnJzsgfTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAnTScgKyBwb3MoX3gwLCBfeTAgKyByKSArXG4gICAgICAgICAgIGFyYyhyLCAtcikgK1xuICAgICAgICAgICAnTCcgKyBwb3MoX3gxIC0gciwgX3kwKSArXG4gICAgICAgICAgIGFyYyhyLCByKSArXG4gICAgICAgICAgICdMJyArIHBvcyhfeDEsIF95MSAtIHIpICtcbiAgICAgICAgICAgYXJjKC1yLCByKSArXG4gICAgICAgICAgICdMJyArIHBvcyhfeDAgKyByLCBfeTEpICtcbiAgICAgICAgICAgYXJjKC1yLCAtcikgKyAnWidcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgdmFyIHRvTW92ZUluc2lkZVNsaWNlID0gZnVuY3Rpb24ocHQsIG9wdHMpIHtcbiAgICAgICAgdmFyIHgwID0gcHQueDA7XG4gICAgICAgIHZhciB4MSA9IHB0LngxO1xuICAgICAgICB2YXIgeTAgPSBwdC55MDtcbiAgICAgICAgdmFyIHkxID0gcHQueTE7XG4gICAgICAgIHZhciB0ZXh0QkIgPSBwdC50ZXh0QkI7XG5cbiAgICAgICAgdmFyIGhhc0ZsYWcgPSBmdW5jdGlvbihmKSB7IHJldHVybiB0cmFjZS50ZXh0cG9zaXRpb24uaW5kZXhPZihmKSAhPT0gLTE7IH07XG5cbiAgICAgICAgdmFyIGhhc0JvdHRvbSA9IGhhc0ZsYWcoJ2JvdHRvbScpO1xuICAgICAgICB2YXIgaGFzVG9wID0gaGFzRmxhZygndG9wJykgfHwgKG9wdHMuaXNIZWFkZXIgJiYgIWhhc0JvdHRvbSk7XG5cbiAgICAgICAgdmFyIGFuY2hvciA9XG4gICAgICAgICAgICBoYXNUb3AgPyAnc3RhcnQnIDpcbiAgICAgICAgICAgIGhhc0JvdHRvbSA/ICdlbmQnIDogJ21pZGRsZSc7XG5cbiAgICAgICAgdmFyIGhhc1JpZ2h0ID0gaGFzRmxhZygncmlnaHQnKTtcbiAgICAgICAgdmFyIGhhc0xlZnQgPSBoYXNGbGFnKCdsZWZ0JykgfHwgb3B0cy5vblBhdGhiYXI7XG5cbiAgICAgICAgdmFyIGxlZnRUb1JpZ2h0ID1cbiAgICAgICAgICAgIGhhc0xlZnQgPyAtMSA6XG4gICAgICAgICAgICBoYXNSaWdodCA/IDEgOiAwO1xuXG4gICAgICAgIHZhciBwYWQgPSB0cmFjZS5tYXJrZXIucGFkO1xuICAgICAgICBpZihvcHRzLmlzSGVhZGVyKSB7XG4gICAgICAgICAgICB4MCArPSBwYWQubCAtIFRFWFRQQUQ7XG4gICAgICAgICAgICB4MSAtPSBwYWQuciAtIFRFWFRQQUQ7XG4gICAgICAgICAgICBpZih4MCA+PSB4MSkge1xuICAgICAgICAgICAgICAgIHZhciBtaWQgPSAoeDAgKyB4MSkgLyAyO1xuICAgICAgICAgICAgICAgIHgwID0gbWlkO1xuICAgICAgICAgICAgICAgIHgxID0gbWlkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBsaW1pdCB0aGUgZHJhd2luZyBhcmVhIGZvciBoZWFkZXJzXG4gICAgICAgICAgICB2YXIgbGltWTtcbiAgICAgICAgICAgIGlmKGhhc0JvdHRvbSkge1xuICAgICAgICAgICAgICAgIGxpbVkgPSB5MSAtIHBhZC5iO1xuICAgICAgICAgICAgICAgIGlmKHkwIDwgbGltWSAmJiBsaW1ZIDwgeTEpIHkwID0gbGltWTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbGltWSA9IHkwICsgcGFkLnQ7XG4gICAgICAgICAgICAgICAgaWYoeTAgPCBsaW1ZICYmIGxpbVkgPCB5MSkgeTEgPSBsaW1ZO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcG9zaXRpb24gdGhlIHRleHQgcmVsYXRpdmUgdG8gdGhlIHNsaWNlXG4gICAgICAgIHZhciB0cmFuc2Zvcm0gPSB0b01vdmVJbnNpZGVCYXIoeDAsIHgxLCB5MCwgeTEsIHRleHRCQiwge1xuICAgICAgICAgICAgaXNIb3Jpem9udGFsOiBmYWxzZSxcbiAgICAgICAgICAgIGNvbnN0cmFpbmVkOiB0cnVlLFxuICAgICAgICAgICAgYW5nbGU6IDAsXG4gICAgICAgICAgICBhbmNob3I6IGFuY2hvcixcbiAgICAgICAgICAgIGxlZnRUb1JpZ2h0OiBsZWZ0VG9SaWdodFxuICAgICAgICB9KTtcbiAgICAgICAgdHJhbnNmb3JtLmZvbnRTaXplID0gb3B0cy5mb250U2l6ZTtcblxuICAgICAgICB0cmFuc2Zvcm0udGFyZ2V0WCA9IHZpZXdNYXBYKHRyYW5zZm9ybS50YXJnZXRYKTtcbiAgICAgICAgdHJhbnNmb3JtLnRhcmdldFkgPSB2aWV3TWFwWSh0cmFuc2Zvcm0udGFyZ2V0WSk7XG5cbiAgICAgICAgaWYoaXNOYU4odHJhbnNmb3JtLnRhcmdldFgpIHx8IGlzTmFOKHRyYW5zZm9ybS50YXJnZXRZKSkge1xuICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoeDAgIT09IHgxICYmIHkwICE9PSB5MSkge1xuICAgICAgICAgICAgcmVjb3JkTWluVGV4dFNpemUodHJhY2UudHlwZSwgdHJhbnNmb3JtLCBmdWxsTGF5b3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzY2FsZTogdHJhbnNmb3JtLnNjYWxlLFxuICAgICAgICAgICAgcm90YXRlOiB0cmFuc2Zvcm0ucm90YXRlLFxuICAgICAgICAgICAgdGV4dFg6IHRyYW5zZm9ybS50ZXh0WCxcbiAgICAgICAgICAgIHRleHRZOiB0cmFuc2Zvcm0udGV4dFksXG4gICAgICAgICAgICBhbmNob3JYOiB0cmFuc2Zvcm0uYW5jaG9yWCxcbiAgICAgICAgICAgIGFuY2hvclk6IHRyYW5zZm9ybS5hbmNob3JZLFxuICAgICAgICAgICAgdGFyZ2V0WDogdHJhbnNmb3JtLnRhcmdldFgsXG4gICAgICAgICAgICB0YXJnZXRZOiB0cmFuc2Zvcm0udGFyZ2V0WVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICB2YXIgaW50ZXJwRnJvbVBhcmVudCA9IGZ1bmN0aW9uKHB0LCBvblBhdGhiYXIpIHtcbiAgICAgICAgdmFyIHBhcmVudFByZXY7XG4gICAgICAgIHZhciBpID0gMDtcbiAgICAgICAgdmFyIFEgPSBwdDtcbiAgICAgICAgd2hpbGUoIXBhcmVudFByZXYgJiYgaSA8IG1heERlcHRoKSB7IC8vIGxvb3AgdG8gZmluZCBhIHBhcmVudC9ncmFuZFBhcmVudCBvbiB0aGUgcHJldmlvdXMgZ3JhcGhcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgICAgIFEgPSBRLnBhcmVudDtcbiAgICAgICAgICAgIGlmKFEpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRQcmV2ID0gZ2V0UHJldihRLCBvblBhdGhiYXIpO1xuICAgICAgICAgICAgfSBlbHNlIGkgPSBtYXhEZXB0aDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyZW50UHJldiB8fCB7fTtcbiAgICB9O1xuXG4gICAgdmFyIG1ha2VFeGl0U2xpY2VJbnRlcnBvbGF0b3IgPSBmdW5jdGlvbihwdCwgb25QYXRoYmFyLCByZWZSZWN0LCBzaXplKSB7XG4gICAgICAgIHZhciBwcmV2ID0gZ2V0UHJldihwdCwgb25QYXRoYmFyKTtcbiAgICAgICAgdmFyIG5leHQ7XG5cbiAgICAgICAgaWYob25QYXRoYmFyKSB7XG4gICAgICAgICAgICBuZXh0ID0gcGF0aGJhck9yaWdpbjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBlbnRyeVByZXYgPSBnZXRQcmV2KGVudHJ5LCBvblBhdGhiYXIpO1xuICAgICAgICAgICAgaWYoZW50cnlQcmV2KSB7XG4gICAgICAgICAgICAgICAgLy8gJ2VudHJ5UHJldicgaXMgaGVyZSBoYXMgdGhlIHByZXZpb3VzIGNvb3JkaW5hdGVzIG9mIHRoZSBlbnRyeVxuICAgICAgICAgICAgICAgIC8vIG5vZGUsIHdoaWNoIGNvcnJlc3BvbmRzIHRvIHRoZSBsYXN0IFwiY2xpY2tlZFwiIG5vZGUgd2hlbiB6b29taW5nIGluXG4gICAgICAgICAgICAgICAgbmV4dCA9IGZpbmRDbG9zZXN0RWRnZShwdCwgZW50cnlQcmV2LCBzaXplKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdGhpcyBoYXBwZW5zIHdoZW4gbWF4ZGVwdGggaXMgc2V0LCB3aGVuIGxlYXZlcyBtdXN0XG4gICAgICAgICAgICAgICAgLy8gYmUgcmVtb3ZlZCBhbmQgdGhlIGVudHJ5IGlzIG5ldyAoaS5lLiBkb2VzIG5vdCBoYXZlIGEgJ3ByZXYnIG9iamVjdClcbiAgICAgICAgICAgICAgICBuZXh0ID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZDMuaW50ZXJwb2xhdGUocHJldiwgbmV4dCk7XG4gICAgfTtcblxuICAgIHZhciBtYWtlVXBkYXRlU2xpY2VJbnRlcnBvbGF0b3IgPSBmdW5jdGlvbihwdCwgb25QYXRoYmFyLCByZWZSZWN0LCBzaXplKSB7XG4gICAgICAgIHZhciBwcmV2MCA9IGdldFByZXYocHQsIG9uUGF0aGJhcik7XG4gICAgICAgIHZhciBwcmV2O1xuXG4gICAgICAgIGlmKHByZXYwKSB7XG4gICAgICAgICAgICAvLyBpZiBwdCBhbHJlYWR5IG9uIGdyYXBoLCB0aGlzIGlzIGVhc3lcbiAgICAgICAgICAgIHByZXYgPSBwcmV2MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGZvciBuZXcgcHRzOlxuICAgICAgICAgICAgaWYob25QYXRoYmFyKSB7XG4gICAgICAgICAgICAgICAgcHJldiA9IHBhdGhiYXJPcmlnaW47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmKHByZXZFbnRyeSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiB0cmFjZSB3YXMgdmlzaWJsZSBiZWZvcmVcbiAgICAgICAgICAgICAgICAgICAgaWYocHQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmVmID0gbmV4dE9mUHJldkVudHJ5IHx8IHJlZlJlY3Q7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHJlZiAmJiAhb25QYXRoYmFyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldiA9IGZpbmRDbG9zZXN0RWRnZShwdCwgcmVmLCBzaXplKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgbmV3IGxlYWYgKHdoZW4gbWF4ZGVwdGggaXMgc2V0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBncm93IGl0IGZyb20gaXRzIHBhcmVudCBub2RlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldiA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KHByZXYsIGludGVycEZyb21QYXJlbnQocHQsIG9uUGF0aGJhcikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldiA9IHB0O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldiA9IHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkMy5pbnRlcnBvbGF0ZShwcmV2LCB7XG4gICAgICAgICAgICB4MDogcHQueDAsXG4gICAgICAgICAgICB4MTogcHQueDEsXG4gICAgICAgICAgICB5MDogcHQueTAsXG4gICAgICAgICAgICB5MTogcHQueTFcbiAgICAgICAgfSk7XG4gICAgfTtcblxuICAgIHZhciBtYWtlVXBkYXRlVGV4dEludGVycG9sYXRvciA9IGZ1bmN0aW9uKHB0LCBvblBhdGhiYXIsIHJlZlJlY3QsIHNpemUpIHtcbiAgICAgICAgdmFyIHByZXYwID0gZ2V0UHJldihwdCwgb25QYXRoYmFyKTtcbiAgICAgICAgdmFyIHByZXYgPSB7fTtcbiAgICAgICAgdmFyIG9yaWdpbiA9IGdldE9yaWdpbihwdCwgb25QYXRoYmFyLCByZWZSZWN0LCBzaXplKTtcblxuICAgICAgICBMaWIuZXh0ZW5kRmxhdChwcmV2LCB7XG4gICAgICAgICAgICB0cmFuc2Zvcm06IHRvTW92ZUluc2lkZVNsaWNlKHtcbiAgICAgICAgICAgICAgICB4MDogb3JpZ2luLngwLFxuICAgICAgICAgICAgICAgIHgxOiBvcmlnaW4ueDEsXG4gICAgICAgICAgICAgICAgeTA6IG9yaWdpbi55MCxcbiAgICAgICAgICAgICAgICB5MTogb3JpZ2luLnkxLFxuICAgICAgICAgICAgICAgIHRleHRCQjogcHQudGV4dEJCLFxuICAgICAgICAgICAgICAgIF90ZXh0OiBwdC5fdGV4dFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGlzSGVhZGVyOiBoZWxwZXJzLmlzSGVhZGVyKHB0LCB0cmFjZSlcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmKHByZXYwKSB7XG4gICAgICAgICAgICAvLyBpZiBwdCBhbHJlYWR5IG9uIGdyYXBoLCB0aGlzIGlzIGVhc3lcbiAgICAgICAgICAgIHByZXYgPSBwcmV2MDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGZvciBuZXcgcHRzOlxuICAgICAgICAgICAgaWYocHQucGFyZW50KSB7XG4gICAgICAgICAgICAgICAgTGliLmV4dGVuZEZsYXQocHJldiwgaW50ZXJwRnJvbVBhcmVudChwdCwgb25QYXRoYmFyKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgdHJhbnNmb3JtID0gcHQudHJhbnNmb3JtO1xuICAgICAgICBpZihwdC54MCAhPT0gcHQueDEgJiYgcHQueTAgIT09IHB0LnkxKSB7XG4gICAgICAgICAgICByZWNvcmRNaW5UZXh0U2l6ZSh0cmFjZS50eXBlLCB0cmFuc2Zvcm0sIGZ1bGxMYXlvdXQpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGQzLmludGVycG9sYXRlKHByZXYsIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybToge1xuICAgICAgICAgICAgICAgIHNjYWxlOiB0cmFuc2Zvcm0uc2NhbGUsXG4gICAgICAgICAgICAgICAgcm90YXRlOiB0cmFuc2Zvcm0ucm90YXRlLFxuICAgICAgICAgICAgICAgIHRleHRYOiB0cmFuc2Zvcm0udGV4dFgsXG4gICAgICAgICAgICAgICAgdGV4dFk6IHRyYW5zZm9ybS50ZXh0WSxcbiAgICAgICAgICAgICAgICBhbmNob3JYOiB0cmFuc2Zvcm0uYW5jaG9yWCxcbiAgICAgICAgICAgICAgICBhbmNob3JZOiB0cmFuc2Zvcm0uYW5jaG9yWSxcbiAgICAgICAgICAgICAgICB0YXJnZXRYOiB0cmFuc2Zvcm0udGFyZ2V0WCxcbiAgICAgICAgICAgICAgICB0YXJnZXRZOiB0cmFuc2Zvcm0udGFyZ2V0WVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgdmFyIGhhbmRsZVNsaWNlc0V4aXQgPSBmdW5jdGlvbihzbGljZXMsIG9uUGF0aGJhciwgcmVmUmVjdCwgc2l6ZSwgcGF0aFNsaWNlKSB7XG4gICAgICAgIHZhciB3aWR0aCA9IHNpemVbMF07XG4gICAgICAgIHZhciBoZWlnaHQgPSBzaXplWzFdO1xuXG4gICAgICAgIGlmKGhhc1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAgIHNsaWNlcy5leGl0KCkudHJhbnNpdGlvbigpXG4gICAgICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzbGljZVRvcCA9IGQzLnNlbGVjdCh0aGlzKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpY2VQYXRoID0gc2xpY2VUb3Auc2VsZWN0KCdwYXRoLnN1cmZhY2UnKTtcbiAgICAgICAgICAgICAgICAgICAgc2xpY2VQYXRoLnRyYW5zaXRpb24oKS5hdHRyVHdlZW4oJ2QnLCBmdW5jdGlvbihwdDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBpbnRlcnAgPSBtYWtlRXhpdFNsaWNlSW50ZXJwb2xhdG9yKHB0Miwgb25QYXRoYmFyLCByZWZSZWN0LCBbd2lkdGgsIGhlaWdodF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKHQpIHsgcmV0dXJuIHBhdGhTbGljZShpbnRlcnAodCkpOyB9O1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgc2xpY2VUZXh0R3JvdXAgPSBzbGljZVRvcC5zZWxlY3QoJ2cuc2xpY2V0ZXh0Jyk7XG4gICAgICAgICAgICAgICAgICAgIHNsaWNlVGV4dEdyb3VwLmF0dHIoJ29wYWNpdHknLCAwKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5yZW1vdmUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNsaWNlcy5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIHN0clRyYW5zZm9ybSA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IGQudHJhbnNmb3JtO1xuXG4gICAgICAgIGlmKGQueDAgIT09IGQueDEgJiYgZC55MCAhPT0gZC55MSkge1xuICAgICAgICAgICAgcmVjb3JkTWluVGV4dFNpemUodHJhY2UudHlwZSwgdHJhbnNmb3JtLCBmdWxsTGF5b3V0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBMaWIuZ2V0VGV4dFRyYW5zZm9ybSh7XG4gICAgICAgICAgICB0ZXh0WDogdHJhbnNmb3JtLnRleHRYLFxuICAgICAgICAgICAgdGV4dFk6IHRyYW5zZm9ybS50ZXh0WSxcbiAgICAgICAgICAgIGFuY2hvclg6IHRyYW5zZm9ybS5hbmNob3JYLFxuICAgICAgICAgICAgYW5jaG9yWTogdHJhbnNmb3JtLmFuY2hvclksXG4gICAgICAgICAgICB0YXJnZXRYOiB0cmFuc2Zvcm0udGFyZ2V0WCxcbiAgICAgICAgICAgIHRhcmdldFk6IHRyYW5zZm9ybS50YXJnZXRZLFxuICAgICAgICAgICAgc2NhbGU6IHRyYW5zZm9ybS5zY2FsZSxcbiAgICAgICAgICAgIHJvdGF0ZTogdHJhbnNmb3JtLnJvdGF0ZVxuICAgICAgICB9KTtcbiAgICB9O1xuXG4gICAgaWYoaGFzVHJhbnNpdGlvbikge1xuICAgICAgICAvLyBJbXBvcnRhbnQ6IGRvIHRoaXMgYmVmb3JlIGJpbmRpbmcgbmV3IHNsaWNlRGF0YSFcblxuICAgICAgICBzZWxBbmNlc3RvcnMuZWFjaChmdW5jdGlvbihwdCkge1xuICAgICAgICAgICAgcHJldkxvb2t1cFBhdGhiYXJbZ2V0S2V5KHB0KV0gPSB7XG4gICAgICAgICAgICAgICAgeDA6IHB0LngwLFxuICAgICAgICAgICAgICAgIHgxOiBwdC54MSxcbiAgICAgICAgICAgICAgICB5MDogcHQueTAsXG4gICAgICAgICAgICAgICAgeTE6IHB0LnkxXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZihwdC50cmFuc2Zvcm0pIHtcbiAgICAgICAgICAgICAgICBwcmV2TG9va3VwUGF0aGJhcltnZXRLZXkocHQpXS50cmFuc2Zvcm0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRYOiBwdC50cmFuc2Zvcm0udGV4dFgsXG4gICAgICAgICAgICAgICAgICAgIHRleHRZOiBwdC50cmFuc2Zvcm0udGV4dFksXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvclg6IHB0LnRyYW5zZm9ybS5hbmNob3JYLFxuICAgICAgICAgICAgICAgICAgICBhbmNob3JZOiBwdC50cmFuc2Zvcm0uYW5jaG9yWSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WDogcHQudHJhbnNmb3JtLnRhcmdldFgsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFk6IHB0LnRyYW5zZm9ybS50YXJnZXRZLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogcHQudHJhbnNmb3JtLnNjYWxlLFxuICAgICAgICAgICAgICAgICAgICByb3RhdGU6IHB0LnRyYW5zZm9ybS5yb3RhdGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBzZWxEZXNjZW5kYW50cy5lYWNoKGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgICAgICBwcmV2TG9va3VwU2xpY2VzW2dldEtleShwdCldID0ge1xuICAgICAgICAgICAgICAgIHgwOiBwdC54MCxcbiAgICAgICAgICAgICAgICB4MTogcHQueDEsXG4gICAgICAgICAgICAgICAgeTA6IHB0LnkwLFxuICAgICAgICAgICAgICAgIHkxOiBwdC55MVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgaWYocHQudHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgcHJldkxvb2t1cFNsaWNlc1tnZXRLZXkocHQpXS50cmFuc2Zvcm0gPSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRYOiBwdC50cmFuc2Zvcm0udGV4dFgsXG4gICAgICAgICAgICAgICAgICAgIHRleHRZOiBwdC50cmFuc2Zvcm0udGV4dFksXG4gICAgICAgICAgICAgICAgICAgIGFuY2hvclg6IHB0LnRyYW5zZm9ybS5hbmNob3JYLFxuICAgICAgICAgICAgICAgICAgICBhbmNob3JZOiBwdC50cmFuc2Zvcm0uYW5jaG9yWSxcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0WDogcHQudHJhbnNmb3JtLnRhcmdldFgsXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFk6IHB0LnRyYW5zZm9ybS50YXJnZXRZLFxuICAgICAgICAgICAgICAgICAgICBzY2FsZTogcHQudHJhbnNmb3JtLnNjYWxlLFxuICAgICAgICAgICAgICAgICAgICByb3RhdGU6IHB0LnRyYW5zZm9ybS5yb3RhdGVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZighcHJldkVudHJ5ICYmIGhlbHBlcnMuaXNFbnRyeShwdCkpIHtcbiAgICAgICAgICAgICAgICBwcmV2RW50cnkgPSBwdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmV4dE9mUHJldkVudHJ5ID0gZHJhd0Rlc2NlbmRhbnRzKGdkLCBjZCwgZW50cnksIHNlbERlc2NlbmRhbnRzLCB7XG4gICAgICAgIHdpZHRoOiB2cHcsXG4gICAgICAgIGhlaWdodDogdnBoLFxuXG4gICAgICAgIHZpZXdYOiB2aWV3TWFwWCxcbiAgICAgICAgdmlld1k6IHZpZXdNYXBZLFxuXG4gICAgICAgIHBhdGhTbGljZTogcGF0aERlc2NlbmRhbnQsXG4gICAgICAgIHRvTW92ZUluc2lkZVNsaWNlOiB0b01vdmVJbnNpZGVTbGljZSxcblxuICAgICAgICBwcmV2RW50cnk6IHByZXZFbnRyeSxcbiAgICAgICAgbWFrZVVwZGF0ZVNsaWNlSW50ZXJwb2xhdG9yOiBtYWtlVXBkYXRlU2xpY2VJbnRlcnBvbGF0b3IsXG4gICAgICAgIG1ha2VVcGRhdGVUZXh0SW50ZXJwb2xhdG9yOiBtYWtlVXBkYXRlVGV4dEludGVycG9sYXRvcixcblxuICAgICAgICBoYW5kbGVTbGljZXNFeGl0OiBoYW5kbGVTbGljZXNFeGl0LFxuICAgICAgICBoYXNUcmFuc2l0aW9uOiBoYXNUcmFuc2l0aW9uLFxuICAgICAgICBzdHJUcmFuc2Zvcm06IHN0clRyYW5zZm9ybVxuICAgIH0pO1xuXG4gICAgaWYodHJhY2UucGF0aGJhci52aXNpYmxlKSB7XG4gICAgICAgIGRyYXdBbmNlc3RvcnMoZ2QsIGNkLCBlbnRyeSwgc2VsQW5jZXN0b3JzLCB7XG4gICAgICAgICAgICBiYXJEaWZZOiBiYXJEaWZZLFxuICAgICAgICAgICAgd2lkdGg6IGJhclcsXG4gICAgICAgICAgICBoZWlnaHQ6IGJhckgsXG5cbiAgICAgICAgICAgIHZpZXdYOiB2aWV3QmFyWCxcbiAgICAgICAgICAgIHZpZXdZOiB2aWV3QmFyWSxcblxuICAgICAgICAgICAgcGF0aFNsaWNlOiBwYXRoQW5jZXN0b3IsXG4gICAgICAgICAgICB0b01vdmVJbnNpZGVTbGljZTogdG9Nb3ZlSW5zaWRlU2xpY2UsXG5cbiAgICAgICAgICAgIG1ha2VVcGRhdGVTbGljZUludGVycG9sYXRvcjogbWFrZVVwZGF0ZVNsaWNlSW50ZXJwb2xhdG9yLFxuICAgICAgICAgICAgbWFrZVVwZGF0ZVRleHRJbnRlcnBvbGF0b3I6IG1ha2VVcGRhdGVUZXh0SW50ZXJwb2xhdG9yLFxuXG4gICAgICAgICAgICBoYW5kbGVTbGljZXNFeGl0OiBoYW5kbGVTbGljZXNFeGl0LFxuICAgICAgICAgICAgaGFzVHJhbnNpdGlvbjogaGFzVHJhbnNpdGlvbixcbiAgICAgICAgICAgIHN0clRyYW5zZm9ybTogc3RyVHJhbnNmb3JtXG4gICAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbEFuY2VzdG9ycy5yZW1vdmUoKTtcbiAgICB9XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgaGVscGVycyA9IHJlcXVpcmUoJy4uL3N1bmJ1cnN0L2hlbHBlcnMnKTtcbnZhciByZXNpemVUZXh0ID0gcmVxdWlyZSgnLi4vYmFyL3VuaWZvcm1fdGV4dCcpLnJlc2l6ZVRleHQ7XG5cbmZ1bmN0aW9uIHN0eWxlKGdkKSB7XG4gICAgdmFyIHMgPSBnZC5fZnVsbExheW91dC5fdHJlZW1hcGxheWVyLnNlbGVjdEFsbCgnLnRyYWNlJyk7XG4gICAgcmVzaXplVGV4dChnZCwgcywgJ3RyZWVtYXAnKTtcblxuICAgIHMuZWFjaChmdW5jdGlvbihjZCkge1xuICAgICAgICB2YXIgZ1RyYWNlID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICB2YXIgY2QwID0gY2RbMF07XG4gICAgICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZTtcblxuICAgICAgICBnVHJhY2Uuc3R5bGUoJ29wYWNpdHknLCB0cmFjZS5vcGFjaXR5KTtcblxuICAgICAgICBnVHJhY2Uuc2VsZWN0QWxsKCdwYXRoLnN1cmZhY2UnKS5lYWNoKGZ1bmN0aW9uKHB0KSB7XG4gICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2FsbChzdHlsZU9uZSwgcHQsIHRyYWNlLCB7XG4gICAgICAgICAgICAgICAgaG92ZXJlZDogZmFsc2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gc3R5bGVPbmUocywgcHQsIHRyYWNlLCBvcHRzKSB7XG4gICAgdmFyIGhvdmVyZWQgPSAob3B0cyB8fCB7fSkuaG92ZXJlZDtcbiAgICB2YXIgY2RpID0gcHQuZGF0YS5kYXRhO1xuICAgIHZhciBwdE51bWJlciA9IGNkaS5pO1xuICAgIHZhciBsaW5lQ29sb3I7XG4gICAgdmFyIGxpbmVXaWR0aDtcbiAgICB2YXIgZmlsbENvbG9yID0gY2RpLmNvbG9yO1xuICAgIHZhciBpc1Jvb3QgPSBoZWxwZXJzLmlzSGllcmFyY2h5Um9vdChwdCk7XG4gICAgdmFyIG9wYWNpdHkgPSAxO1xuXG4gICAgaWYoaG92ZXJlZCkge1xuICAgICAgICBsaW5lQ29sb3IgPSB0cmFjZS5faG92ZXJlZC5tYXJrZXIubGluZS5jb2xvcjtcbiAgICAgICAgbGluZVdpZHRoID0gdHJhY2UuX2hvdmVyZWQubWFya2VyLmxpbmUud2lkdGg7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYoaXNSb290ICYmIGZpbGxDb2xvciA9PT0gJ3JnYmEoMCwwLDAsMCknKSB7XG4gICAgICAgICAgICBvcGFjaXR5ID0gMDtcbiAgICAgICAgICAgIGxpbmVDb2xvciA9ICdyZ2JhKDAsMCwwLDApJztcbiAgICAgICAgICAgIGxpbmVXaWR0aCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsaW5lQ29sb3IgPSBMaWIuY2FzdE9wdGlvbih0cmFjZSwgcHROdW1iZXIsICdtYXJrZXIubGluZS5jb2xvcicpIHx8IENvbG9yLmRlZmF1bHRMaW5lO1xuICAgICAgICAgICAgbGluZVdpZHRoID0gTGliLmNhc3RPcHRpb24odHJhY2UsIHB0TnVtYmVyLCAnbWFya2VyLmxpbmUud2lkdGgnKSB8fCAwO1xuXG4gICAgICAgICAgICBpZighdHJhY2UuX2hhc0NvbG9yc2NhbGUgJiYgIXB0Lm9uUGF0aGJhcikge1xuICAgICAgICAgICAgICAgIHZhciBkZXB0aGZhZGUgPSB0cmFjZS5tYXJrZXIuZGVwdGhmYWRlO1xuICAgICAgICAgICAgICAgIGlmKGRlcHRoZmFkZSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZmFkZWRDb2xvciA9IENvbG9yLmNvbWJpbmUoQ29sb3IuYWRkT3BhY2l0eSh0cmFjZS5fYmFja2dyb3VuZENvbG9yLCAwLjc1KSwgZmlsbENvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG47XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZGVwdGhmYWRlID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbWF4RGVwdGggPSBoZWxwZXJzLmdldE1heERlcHRoKHRyYWNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKGlzRmluaXRlKG1heERlcHRoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKGhlbHBlcnMuaXNMZWFmKHB0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuID0gKHRyYWNlLl9tYXhWaXNpYmxlTGF5ZXJzKSAtIChwdC5kYXRhLmRlcHRoIC0gdHJhY2UuX2VudHJ5RGVwdGgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbiA9IHB0LmRhdGEuaGVpZ2h0ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgLy8gaS5lLiBjYXNlIG9mIGRlcHRoZmFkZSA9PT0gJ3JldmVyc2VkJ1xuICAgICAgICAgICAgICAgICAgICAgICAgbiA9IHB0LmRhdGEuZGVwdGggLSB0cmFjZS5fZW50cnlEZXB0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCF0cmFjZS5fYXRSb290TGV2ZWwpIG4rKztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKG4gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJhdGlvID0gMC41ICogaSAvIG47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsbENvbG9yID0gQ29sb3IuY29tYmluZShDb2xvci5hZGRPcGFjaXR5KGZhZGVkQ29sb3IsIHJhdGlvKSwgZmlsbENvbG9yKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHMuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIGxpbmVXaWR0aClcbiAgICAgICAgLmNhbGwoQ29sb3IuZmlsbCwgZmlsbENvbG9yKVxuICAgICAgICAuY2FsbChDb2xvci5zdHJva2UsIGxpbmVDb2xvcilcbiAgICAgICAgLnN0eWxlKCdvcGFjaXR5Jywgb3BhY2l0eSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHN0eWxlOiBzdHlsZSxcbiAgICBzdHlsZU9uZTogc3R5bGVPbmVcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9