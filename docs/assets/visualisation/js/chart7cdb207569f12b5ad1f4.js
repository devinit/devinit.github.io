(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_plots_cartesian_select_js"],{

/***/ "./node_modules/plotly.js/src/components/modebar/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/modebar/index.js ***!
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




exports.manage = __webpack_require__(/*! ./manage */ "./node_modules/plotly.js/src/components/modebar/manage.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/components/modebar/manage.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/modebar/manage.js ***!
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




var axisIds = __webpack_require__(/*! ../../plots/cartesian/axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js");
var scatterSubTypes = __webpack_require__(/*! ../../traces/scatter/subtypes */ "./node_modules/plotly.js/src/traces/scatter/subtypes.js");
var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var isUnifiedHover = __webpack_require__(/*! ../fx/helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").isUnifiedHover;

var createModeBar = __webpack_require__(/*! ./modebar */ "./node_modules/plotly.js/src/components/modebar/modebar.js");
var modeBarButtons = __webpack_require__(/*! ./buttons */ "./node_modules/plotly.js/src/components/modebar/buttons.js");

/**
 * ModeBar wrapper around 'create' and 'update',
 * chooses buttons to pass to ModeBar constructor based on
 * plot type and plot config.
 *
 * @param {object} gd main plot object
 *
 */
module.exports = function manageModeBar(gd) {
    var fullLayout = gd._fullLayout;
    var context = gd._context;
    var modeBar = fullLayout._modeBar;

    if(!context.displayModeBar && !context.watermark) {
        if(modeBar) {
            modeBar.destroy();
            delete fullLayout._modeBar;
        }
        return;
    }

    if(!Array.isArray(context.modeBarButtonsToRemove)) {
        throw new Error([
            '*modeBarButtonsToRemove* configuration options',
            'must be an array.'
        ].join(' '));
    }

    if(!Array.isArray(context.modeBarButtonsToAdd)) {
        throw new Error([
            '*modeBarButtonsToAdd* configuration options',
            'must be an array.'
        ].join(' '));
    }

    var customButtons = context.modeBarButtons;
    var buttonGroups;

    if(Array.isArray(customButtons) && customButtons.length) {
        buttonGroups = fillCustomButton(customButtons);
    } else if(!context.displayModeBar && context.watermark) {
        buttonGroups = [];
    } else {
        buttonGroups = getButtonGroups(gd);
    }

    if(modeBar) modeBar.update(gd, buttonGroups);
    else fullLayout._modeBar = createModeBar(gd, buttonGroups);
};

var DRAW_MODES = [
    'drawline',
    'drawopenpath',
    'drawclosedpath',
    'drawcircle',
    'drawrect',
    'eraseshape'
];

// logic behind which buttons are displayed by default
function getButtonGroups(gd) {
    var fullLayout = gd._fullLayout;
    var fullData = gd._fullData;
    var context = gd._context;
    var buttonsToRemove = context.modeBarButtonsToRemove;
    var buttonsToAdd = context.modeBarButtonsToAdd;

    var hasCartesian = fullLayout._has('cartesian');
    var hasGL3D = fullLayout._has('gl3d');
    var hasGeo = fullLayout._has('geo');
    var hasPie = fullLayout._has('pie');
    var hasFunnelarea = fullLayout._has('funnelarea');
    var hasGL2D = fullLayout._has('gl2d');
    var hasTernary = fullLayout._has('ternary');
    var hasMapbox = fullLayout._has('mapbox');
    var hasPolar = fullLayout._has('polar');
    var hasSankey = fullLayout._has('sankey');
    var allAxesFixed = areAllAxesFixed(fullLayout);
    var hasUnifiedHoverLabel = isUnifiedHover(fullLayout.hovermode);

    var groups = [];

    function addGroup(newGroup) {
        if(!newGroup.length) return;

        var out = [];

        for(var i = 0; i < newGroup.length; i++) {
            var button = newGroup[i];
            if(buttonsToRemove.indexOf(button) !== -1) continue;
            out.push(modeBarButtons[button]);
        }

        groups.push(out);
    }

    // buttons common to all plot types
    var commonGroup = ['toImage'];
    if(context.showEditInChartStudio) commonGroup.push('editInChartStudio');
    else if(context.showSendToCloud) commonGroup.push('sendDataToCloud');
    addGroup(commonGroup);

    var zoomGroup = [];
    var hoverGroup = [];
    var resetGroup = [];
    var dragModeGroup = [];

    if((hasCartesian || hasGL2D || hasPie || hasFunnelarea || hasTernary) + hasGeo + hasGL3D + hasMapbox + hasPolar > 1) {
        // graphs with more than one plot types get 'union buttons'
        // which reset the view or toggle hover labels across all subplots.
        hoverGroup = ['toggleHover'];
        resetGroup = ['resetViews'];
    } else if(hasGeo) {
        zoomGroup = ['zoomInGeo', 'zoomOutGeo'];
        hoverGroup = ['hoverClosestGeo'];
        resetGroup = ['resetGeo'];
    } else if(hasGL3D) {
        hoverGroup = ['hoverClosest3d'];
        resetGroup = ['resetCameraDefault3d', 'resetCameraLastSave3d'];
    } else if(hasMapbox) {
        zoomGroup = ['zoomInMapbox', 'zoomOutMapbox'];
        hoverGroup = ['toggleHover'];
        resetGroup = ['resetViewMapbox'];
    } else if(hasGL2D) {
        hoverGroup = ['hoverClosestGl2d'];
    } else if(hasPie) {
        hoverGroup = ['hoverClosestPie'];
    } else if(hasSankey) {
        hoverGroup = ['hoverClosestCartesian', 'hoverCompareCartesian'];
        resetGroup = ['resetViewSankey'];
    } else { // hasPolar, hasTernary
        // always show at least one hover icon.
        hoverGroup = ['toggleHover'];
    }
    // if we have cartesian, allow switching between closest and compare
    // regardless of what other types are on the plot, since they'll all
    // just treat any truthy hovermode as 'closest'
    if(hasCartesian) {
        hoverGroup = ['toggleSpikelines', 'hoverClosestCartesian', 'hoverCompareCartesian'];
    }
    if(hasNoHover(fullData) || hasUnifiedHoverLabel) {
        hoverGroup = [];
    }

    if((hasCartesian || hasGL2D) && !allAxesFixed) {
        zoomGroup = ['zoomIn2d', 'zoomOut2d', 'autoScale2d'];
        if(resetGroup[0] !== 'resetViews') resetGroup = ['resetScale2d'];
    }

    if(hasGL3D) {
        dragModeGroup = ['zoom3d', 'pan3d', 'orbitRotation', 'tableRotation'];
    } else if(((hasCartesian || hasGL2D) && !allAxesFixed) || hasTernary) {
        dragModeGroup = ['zoom2d', 'pan2d'];
    } else if(hasMapbox || hasGeo) {
        dragModeGroup = ['pan2d'];
    } else if(hasPolar) {
        dragModeGroup = ['zoom2d'];
    }
    if(isSelectable(fullData)) {
        dragModeGroup.push('select2d', 'lasso2d');
    }

    // accept pre-defined buttons as string
    if(Array.isArray(buttonsToAdd)) {
        var newList = [];
        for(var i = 0; i < buttonsToAdd.length; i++) {
            var b = buttonsToAdd[i];
            if(typeof b === 'string') {
                if(DRAW_MODES.indexOf(b) !== -1) {
                    if(
                        fullLayout._has('mapbox') || // draw shapes in paper coordinate (could be improved in future to support data coordinate, when there is no pitch)
                        fullLayout._has('cartesian') // draw shapes in data coordinate
                    ) {
                        dragModeGroup.push(b);
                    }
                }
            } else newList.push(b);
        }
        buttonsToAdd = newList;
    }

    addGroup(dragModeGroup);
    addGroup(zoomGroup.concat(resetGroup));
    addGroup(hoverGroup);

    return appendButtonsToGroups(groups, buttonsToAdd);
}

function areAllAxesFixed(fullLayout) {
    var axList = axisIds.list({_fullLayout: fullLayout}, null, true);

    for(var i = 0; i < axList.length; i++) {
        if(!axList[i].fixedrange) {
            return false;
        }
    }

    return true;
}

// look for traces that support selection
// to be updated as we add more selectPoints handlers
function isSelectable(fullData) {
    var selectable = false;

    for(var i = 0; i < fullData.length; i++) {
        if(selectable) break;

        var trace = fullData[i];

        if(!trace._module || !trace._module.selectPoints) continue;

        if(Registry.traceIs(trace, 'scatter-like')) {
            if(scatterSubTypes.hasMarkers(trace) || scatterSubTypes.hasText(trace)) {
                selectable = true;
            }
        } else if(Registry.traceIs(trace, 'box-violin')) {
            if(trace.boxpoints === 'all' || trace.points === 'all') {
                selectable = true;
            }
        } else {
            // assume that in general if the trace module has selectPoints,
            // then it's selectable. Scatter is an exception to this because it must
            // have markers or text, not just be a scatter type.

            selectable = true;
        }
    }

    return selectable;
}

// check whether all trace are 'noHover'
function hasNoHover(fullData) {
    for(var i = 0; i < fullData.length; i++) {
        if(!Registry.traceIs(fullData[i], 'noHover')) return false;
    }
    return true;
}

function appendButtonsToGroups(groups, buttons) {
    if(buttons.length) {
        if(Array.isArray(buttons[0])) {
            for(var i = 0; i < buttons.length; i++) {
                groups.push(buttons[i]);
            }
        } else groups.push(buttons);
    }

    return groups;
}

// fill in custom buttons referring to default mode bar buttons
function fillCustomButton(customButtons) {
    for(var i = 0; i < customButtons.length; i++) {
        var buttonGroup = customButtons[i];

        for(var j = 0; j < buttonGroup.length; j++) {
            var button = buttonGroup[j];

            if(typeof button === 'string') {
                if(modeBarButtons[button] !== undefined) {
                    customButtons[i][j] = modeBarButtons[button];
                } else {
                    throw new Error([
                        '*modeBarButtons* configuration options',
                        'invalid button name'
                    ].join(' '));
                }
            }
        }
    }

    return customButtons;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/components/modebar/modebar.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/modebar/modebar.js ***!
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




var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Icons = __webpack_require__(/*! ../../fonts/ploticon */ "./node_modules/plotly.js/src/fonts/ploticon.js");
var Parser = new DOMParser();

/**
 * UI controller for interactive plots
 * @Class
 * @Param {object} opts
 * @Param {object} opts.buttons    nested arrays of grouped buttons config objects
 * @Param {object} opts.container  container div to append modeBar
 * @Param {object} opts.graphInfo  primary plot object containing data and layout
 */
function ModeBar(opts) {
    this.container = opts.container;
    this.element = document.createElement('div');

    this.update(opts.graphInfo, opts.buttons);

    this.container.appendChild(this.element);
}

var proto = ModeBar.prototype;

/**
 * Update modeBar (buttons and logo)
 *
 * @param {object} graphInfo  primary plot object containing data and layout
 * @param {array of arrays} buttons nested arrays of grouped buttons to initialize
 *
 */
proto.update = function(graphInfo, buttons) {
    this.graphInfo = graphInfo;

    var context = this.graphInfo._context;
    var fullLayout = this.graphInfo._fullLayout;
    var modeBarId = 'modebar-' + fullLayout._uid;

    this.element.setAttribute('id', modeBarId);
    this._uid = modeBarId;

    this.element.className = 'modebar';
    if(context.displayModeBar === 'hover') this.element.className += ' modebar--hover ease-bg';

    if(fullLayout.modebar.orientation === 'v') {
        this.element.className += ' vertical';
        buttons = buttons.reverse();
    }

    var style = fullLayout.modebar;
    var bgSelector = context.displayModeBar === 'hover' ? '.js-plotly-plot .plotly:hover ' : '';

    Lib.deleteRelatedStyleRule(modeBarId);
    Lib.addRelatedStyleRule(modeBarId, bgSelector + '#' + modeBarId + ' .modebar-group', 'background-color: ' + style.bgcolor);
    Lib.addRelatedStyleRule(modeBarId, '#' + modeBarId + ' .modebar-btn .icon path', 'fill: ' + style.color);
    Lib.addRelatedStyleRule(modeBarId, '#' + modeBarId + ' .modebar-btn:hover .icon path', 'fill: ' + style.activecolor);
    Lib.addRelatedStyleRule(modeBarId, '#' + modeBarId + ' .modebar-btn.active .icon path', 'fill: ' + style.activecolor);

    // if buttons or logo have changed, redraw modebar interior
    var needsNewButtons = !this.hasButtons(buttons);
    var needsNewLogo = (this.hasLogo !== context.displaylogo);
    var needsNewLocale = (this.locale !== context.locale);

    this.locale = context.locale;

    if(needsNewButtons || needsNewLogo || needsNewLocale) {
        this.removeAllButtons();

        this.updateButtons(buttons);

        if(context.watermark || context.displaylogo) {
            var logoGroup = this.getLogo();
            if(context.watermark) {
                logoGroup.className = logoGroup.className + ' watermark';
            }

            if(fullLayout.modebar.orientation === 'v') {
                this.element.insertBefore(logoGroup, this.element.childNodes[0]);
            } else {
                this.element.appendChild(logoGroup);
            }

            this.hasLogo = true;
        }
    }

    this.updateActiveButton();
};

proto.updateButtons = function(buttons) {
    var _this = this;

    this.buttons = buttons;
    this.buttonElements = [];
    this.buttonsNames = [];

    this.buttons.forEach(function(buttonGroup) {
        var group = _this.createGroup();

        buttonGroup.forEach(function(buttonConfig) {
            var buttonName = buttonConfig.name;
            if(!buttonName) {
                throw new Error('must provide button \'name\' in button config');
            }
            if(_this.buttonsNames.indexOf(buttonName) !== -1) {
                throw new Error('button name \'' + buttonName + '\' is taken');
            }
            _this.buttonsNames.push(buttonName);

            var button = _this.createButton(buttonConfig);
            _this.buttonElements.push(button);
            group.appendChild(button);
        });

        _this.element.appendChild(group);
    });
};

/**
 * Empty div for containing a group of buttons
 * @Return {HTMLelement}
 */
proto.createGroup = function() {
    var group = document.createElement('div');
    group.className = 'modebar-group';
    return group;
};

/**
 * Create a new button div and set constant and configurable attributes
 * @Param {object} config (see ./buttons.js for more info)
 * @Return {HTMLelement}
 */
proto.createButton = function(config) {
    var _this = this;
    var button = document.createElement('a');

    button.setAttribute('rel', 'tooltip');
    button.className = 'modebar-btn';

    var title = config.title;
    if(title === undefined) title = config.name;
    // for localization: allow title to be a callable that takes gd as arg
    else if(typeof title === 'function') title = title(this.graphInfo);

    if(title || title === 0) button.setAttribute('data-title', title);

    if(config.attr !== undefined) button.setAttribute('data-attr', config.attr);

    var val = config.val;
    if(val !== undefined) {
        if(typeof val === 'function') val = val(this.graphInfo);
        button.setAttribute('data-val', val);
    }

    var click = config.click;
    if(typeof click !== 'function') {
        throw new Error('must provide button \'click\' function in button config');
    } else {
        button.addEventListener('click', function(ev) {
            config.click(_this.graphInfo, ev);

            // only needed for 'hoverClosestGeo' which does not call relayout
            _this.updateActiveButton(ev.currentTarget);
        });
    }

    button.setAttribute('data-toggle', config.toggle || false);
    if(config.toggle) d3.select(button).classed('active', true);

    var icon = config.icon;
    if(typeof icon === 'function') {
        button.appendChild(icon());
    } else {
        button.appendChild(this.createIcon(icon || Icons.question));
    }
    button.setAttribute('data-gravity', config.gravity || 'n');

    return button;
};

/**
 * Add an icon to a button
 * @Param {object} thisIcon
 * @Param {number} thisIcon.width
 * @Param {string} thisIcon.path
 * @Param {string} thisIcon.color
 * @Return {HTMLelement}
 */
proto.createIcon = function(thisIcon) {
    var iconHeight = isNumeric(thisIcon.height) ?
        Number(thisIcon.height) :
        thisIcon.ascent - thisIcon.descent;
    var svgNS = 'http://www.w3.org/2000/svg';
    var icon;

    if(thisIcon.path) {
        icon = document.createElementNS(svgNS, 'svg');
        icon.setAttribute('viewBox', [0, 0, thisIcon.width, iconHeight].join(' '));
        icon.setAttribute('class', 'icon');

        var path = document.createElementNS(svgNS, 'path');
        path.setAttribute('d', thisIcon.path);

        if(thisIcon.transform) {
            path.setAttribute('transform', thisIcon.transform);
        } else if(thisIcon.ascent !== undefined) {
            // Legacy icon transform calculation
            path.setAttribute('transform', 'matrix(1 0 0 -1 0 ' + thisIcon.ascent + ')');
        }

        icon.appendChild(path);
    }

    if(thisIcon.svg) {
        var svgDoc = Parser.parseFromString(thisIcon.svg, 'application/xml');
        icon = svgDoc.childNodes[0];
    }

    icon.setAttribute('height', '1em');
    icon.setAttribute('width', '1em');

    return icon;
};

/**
 * Updates active button with attribute specified in layout
 * @Param {object} graphInfo plot object containing data and layout
 * @Return {HTMLelement}
 */
proto.updateActiveButton = function(buttonClicked) {
    var fullLayout = this.graphInfo._fullLayout;
    var dataAttrClicked = (buttonClicked !== undefined) ?
        buttonClicked.getAttribute('data-attr') :
        null;

    this.buttonElements.forEach(function(button) {
        var thisval = button.getAttribute('data-val') || true;
        var dataAttr = button.getAttribute('data-attr');
        var isToggleButton = (button.getAttribute('data-toggle') === 'true');
        var button3 = d3.select(button);

        // Use 'data-toggle' and 'buttonClicked' to toggle buttons
        // that have no one-to-one equivalent in fullLayout
        if(isToggleButton) {
            if(dataAttr === dataAttrClicked) {
                button3.classed('active', !button3.classed('active'));
            }
        } else {
            var val = (dataAttr === null) ?
                dataAttr :
                Lib.nestedProperty(fullLayout, dataAttr).get();

            button3.classed('active', val === thisval);
        }
    });
};

/**
 * Check if modeBar is configured as button configuration argument
 *
 * @Param {object} buttons 2d array of grouped button config objects
 * @Return {boolean}
 */
proto.hasButtons = function(buttons) {
    var currentButtons = this.buttons;

    if(!currentButtons) return false;

    if(buttons.length !== currentButtons.length) return false;

    for(var i = 0; i < buttons.length; ++i) {
        if(buttons[i].length !== currentButtons[i].length) return false;
        for(var j = 0; j < buttons[i].length; j++) {
            if(buttons[i][j].name !== currentButtons[i][j].name) return false;
        }
    }

    return true;
};

/**
 * @return {HTMLDivElement} The logo image wrapped in a group
 */
proto.getLogo = function() {
    var group = this.createGroup();
    var a = document.createElement('a');

    a.href = 'https://plotly.com/';
    a.target = '_blank';
    a.setAttribute('data-title', Lib._(this.graphInfo, 'Produced with Plotly'));
    a.className = 'modebar-btn plotlyjsicon modebar-btn--logo';

    a.appendChild(this.createIcon(Icons.newplotlylogo));

    group.appendChild(a);
    return group;
};

proto.removeAllButtons = function() {
    while(this.element.firstChild) {
        this.element.removeChild(this.element.firstChild);
    }

    this.hasLogo = false;
};

proto.destroy = function() {
    Lib.removeElement(this.container.querySelector('.modebar'));
    Lib.deleteRelatedStyleRule(this._uid);
};

function createModeBar(gd, buttons) {
    var fullLayout = gd._fullLayout;

    var modeBar = new ModeBar({
        graphInfo: gd,
        container: fullLayout._modebardiv.node(),
        buttons: buttons
    });

    if(fullLayout._privateplot) {
        d3.select(modeBar.element).append('span')
            .classed('badge-private float--left', true)
            .text('PRIVATE');
    }

    return modeBar;
}

module.exports = createModeBar;


/***/ }),

/***/ "./node_modules/plotly.js/src/lib/clear_gl_canvases.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/clear_gl_canvases.js ***!
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



/**
 * Clear gl frame (if any). This is a common pattern as
 * we usually set `preserveDrawingBuffer: true` during
 * gl context creation (e.g. via `reglUtils.prepare`).
 *
 * @param {DOM node or object} gd : graph div object
 */
module.exports = function clearGlCanvases(gd) {
    var fullLayout = gd._fullLayout;

    if(fullLayout._glcanvas && fullLayout._glcanvas.size()) {
        fullLayout._glcanvas.each(function(d) {
            if(d.regl) d.regl.clear({color: true, depth: true});
        });
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/lib/polygon.js":
/*!***************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/polygon.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var dot = __webpack_require__(/*! ./matrix */ "./node_modules/plotly.js/src/lib/matrix.js").dot;
var BADNUM = __webpack_require__(/*! ../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").BADNUM;

var polygon = module.exports = {};

/**
 * Turn an array of [x, y] pairs into a polygon object
 * that can test if points are inside it
 *
 * @param ptsIn Array of [x, y] pairs
 *
 * @returns polygon Object {xmin, xmax, ymin, ymax, pts, contains}
 *      (x|y)(min|max) are the bounding rect of the polygon
 *      pts is the original array, with the first pair repeated at the end
 *      contains is a function: (pt, omitFirstEdge)
 *          pt is the [x, y] pair to test
 *          omitFirstEdge truthy means points exactly on the first edge don't
 *              count. This is for use adding one polygon to another so we
 *              don't double-count the edge where they meet.
 *          returns boolean: is pt inside the polygon (including on its edges)
 */
polygon.tester = function tester(ptsIn) {
    var pts = ptsIn.slice();
    var xmin = pts[0][0];
    var xmax = xmin;
    var ymin = pts[0][1];
    var ymax = ymin;
    var i;

    pts.push(pts[0]);
    for(i = 1; i < pts.length; i++) {
        xmin = Math.min(xmin, pts[i][0]);
        xmax = Math.max(xmax, pts[i][0]);
        ymin = Math.min(ymin, pts[i][1]);
        ymax = Math.max(ymax, pts[i][1]);
    }

    // do we have a rectangle? Handle this here, so we can use the same
    // tester for the rectangular case without sacrificing speed

    var isRect = false;
    var rectFirstEdgeTest;

    if(pts.length === 5) {
        if(pts[0][0] === pts[1][0]) { // vert, horz, vert, horz
            if(pts[2][0] === pts[3][0] &&
                    pts[0][1] === pts[3][1] &&
                    pts[1][1] === pts[2][1]) {
                isRect = true;
                rectFirstEdgeTest = function(pt) { return pt[0] === pts[0][0]; };
            }
        } else if(pts[0][1] === pts[1][1]) { // horz, vert, horz, vert
            if(pts[2][1] === pts[3][1] &&
                    pts[0][0] === pts[3][0] &&
                    pts[1][0] === pts[2][0]) {
                isRect = true;
                rectFirstEdgeTest = function(pt) { return pt[1] === pts[0][1]; };
            }
        }
    }

    function rectContains(pt, omitFirstEdge) {
        var x = pt[0];
        var y = pt[1];

        if(x === BADNUM || x < xmin || x > xmax || y === BADNUM || y < ymin || y > ymax) {
            // pt is outside the bounding box of polygon
            return false;
        }
        if(omitFirstEdge && rectFirstEdgeTest(pt)) return false;

        return true;
    }

    function contains(pt, omitFirstEdge) {
        var x = pt[0];
        var y = pt[1];

        if(x === BADNUM || x < xmin || x > xmax || y === BADNUM || y < ymin || y > ymax) {
            // pt is outside the bounding box of polygon
            return false;
        }

        var imax = pts.length;
        var x1 = pts[0][0];
        var y1 = pts[0][1];
        var crossings = 0;
        var i;
        var x0;
        var y0;
        var xmini;
        var ycross;

        for(i = 1; i < imax; i++) {
            // find all crossings of a vertical line upward from pt with
            // polygon segments
            // crossings exactly at xmax don't count, unless the point is
            // exactly on the segment, then it counts as inside.
            x0 = x1;
            y0 = y1;
            x1 = pts[i][0];
            y1 = pts[i][1];
            xmini = Math.min(x0, x1);

            if(x < xmini || x > Math.max(x0, x1) || y > Math.max(y0, y1)) {
                // outside the bounding box of this segment, it's only a crossing
                // if it's below the box.

                continue;
            } else if(y < Math.min(y0, y1)) {
                // don't count the left-most point of the segment as a crossing
                // because we don't want to double-count adjacent crossings
                // UNLESS the polygon turns past vertical at exactly this x
                // Note that this is repeated below, but we can't factor it out
                // because
                if(x !== xmini) crossings++;
            } else {
                // inside the bounding box, check the actual line intercept

                // vertical segment - we know already that the point is exactly
                // on the segment, so mark the crossing as exactly at the point.
                if(x1 === x0) ycross = y;
                // any other angle
                else ycross = y0 + (x - x0) * (y1 - y0) / (x1 - x0);

                // exactly on the edge: counts as inside the polygon, unless it's the
                // first edge and we're omitting it.
                if(y === ycross) {
                    if(i === 1 && omitFirstEdge) return false;
                    return true;
                }

                if(y <= ycross && x !== xmini) crossings++;
            }
        }

        // if we've gotten this far, odd crossings means inside, even is outside
        return crossings % 2 === 1;
    }

    // detect if poly is degenerate
    var degenerate = true;
    var lastPt = pts[0];
    for(i = 1; i < pts.length; i++) {
        if(lastPt[0] !== pts[i][0] || lastPt[1] !== pts[i][1]) {
            degenerate = false;
            break;
        }
    }

    return {
        xmin: xmin,
        xmax: xmax,
        ymin: ymin,
        ymax: ymax,
        pts: pts,
        contains: isRect ? rectContains : contains,
        isRect: isRect,
        degenerate: degenerate
    };
};

/**
 * Test if a segment of a points array is bent or straight
 *
 * @param pts Array of [x, y] pairs
 * @param start the index of the proposed start of the straight section
 * @param end the index of the proposed end point
 * @param tolerance the max distance off the line connecting start and end
 *      before the line counts as bent
 * @returns boolean: true means this segment is bent, false means straight
 */
polygon.isSegmentBent = function isSegmentBent(pts, start, end, tolerance) {
    var startPt = pts[start];
    var segment = [pts[end][0] - startPt[0], pts[end][1] - startPt[1]];
    var segmentSquared = dot(segment, segment);
    var segmentLen = Math.sqrt(segmentSquared);
    var unitPerp = [-segment[1] / segmentLen, segment[0] / segmentLen];
    var i;
    var part;
    var partParallel;

    for(i = start + 1; i < end; i++) {
        part = [pts[i][0] - startPt[0], pts[i][1] - startPt[1]];
        partParallel = dot(part, segment);

        if(partParallel < 0 || partParallel > segmentSquared ||
            Math.abs(dot(part, unitPerp)) > tolerance) return true;
    }
    return false;
};

/**
 * Make a filtering polygon, to minimize the number of segments
 *
 * @param pts Array of [x, y] pairs (must start with at least 1 pair)
 * @param tolerance the maximum deviation from straight allowed for
 *      removing points to simplify the polygon
 *
 * @returns Object {addPt, raw, filtered}
 *      addPt is a function(pt: [x, y] pair) to add a raw point and
 *          continue filtering
 *      raw is all the input points
 *      filtered is the resulting filtered Array of [x, y] pairs
 */
polygon.filter = function filter(pts, tolerance) {
    var ptsFiltered = [pts[0]];
    var doneRawIndex = 0;
    var doneFilteredIndex = 0;

    function addPt(pt) {
        pts.push(pt);
        var prevFilterLen = ptsFiltered.length;
        var iLast = doneRawIndex;
        ptsFiltered.splice(doneFilteredIndex + 1);

        for(var i = iLast + 1; i < pts.length; i++) {
            if(i === pts.length - 1 || polygon.isSegmentBent(pts, iLast, i + 1, tolerance)) {
                ptsFiltered.push(pts[i]);
                if(ptsFiltered.length < prevFilterLen - 2) {
                    doneRawIndex = i;
                    doneFilteredIndex = ptsFiltered.length - 1;
                }
                iLast = i;
            }
        }
    }

    if(pts.length > 1) {
        var lastPt = pts.pop();
        addPt(lastPt);
    }

    return {
        addPt: addPt,
        raw: pts,
        filtered: ptsFiltered
    };
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plot_api/subroutines.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/plot_api/subroutines.js ***!
  \************************************************************/
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
var Registry = __webpack_require__(/*! ../registry */ "./node_modules/plotly.js/src/registry.js");
var Plots = __webpack_require__(/*! ../plots/plots */ "./node_modules/plotly.js/src/plots/plots.js");

var Lib = __webpack_require__(/*! ../lib */ "./node_modules/plotly.js/src/lib/index.js");
var clearGlCanvases = __webpack_require__(/*! ../lib/clear_gl_canvases */ "./node_modules/plotly.js/src/lib/clear_gl_canvases.js");

var Color = __webpack_require__(/*! ../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Drawing = __webpack_require__(/*! ../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Titles = __webpack_require__(/*! ../components/titles */ "./node_modules/plotly.js/src/components/titles/index.js");
var ModeBar = __webpack_require__(/*! ../components/modebar */ "./node_modules/plotly.js/src/components/modebar/index.js");

var Axes = __webpack_require__(/*! ../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var alignmentConstants = __webpack_require__(/*! ../constants/alignment */ "./node_modules/plotly.js/src/constants/alignment.js");
var axisConstraints = __webpack_require__(/*! ../plots/cartesian/constraints */ "./node_modules/plotly.js/src/plots/cartesian/constraints.js");
var enforceAxisConstraints = axisConstraints.enforce;
var cleanAxisConstraints = axisConstraints.clean;
var doAutoRange = __webpack_require__(/*! ../plots/cartesian/autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").doAutoRange;

var SVG_TEXT_ANCHOR_START = 'start';
var SVG_TEXT_ANCHOR_MIDDLE = 'middle';
var SVG_TEXT_ANCHOR_END = 'end';

exports.layoutStyles = function(gd) {
    return Lib.syncOrAsync([Plots.doAutoMargin, lsInner], gd);
};

function overlappingDomain(xDomain, yDomain, domains) {
    for(var i = 0; i < domains.length; i++) {
        var existingX = domains[i][0];
        var existingY = domains[i][1];

        if(existingX[0] >= xDomain[1] || existingX[1] <= xDomain[0]) {
            continue;
        }
        if(existingY[0] < yDomain[1] && existingY[1] > yDomain[0]) {
            return true;
        }
    }
    return false;
}

function lsInner(gd) {
    var fullLayout = gd._fullLayout;
    var gs = fullLayout._size;
    var pad = gs.p;
    var axList = Axes.list(gd, '', true);
    var i, subplot, plotinfo, ax, xa, ya;

    fullLayout._paperdiv.style({
        width: (gd._context.responsive && fullLayout.autosize && !gd._context._hasZeroWidth && !gd.layout.width) ? '100%' : fullLayout.width + 'px',
        height: (gd._context.responsive && fullLayout.autosize && !gd._context._hasZeroHeight && !gd.layout.height) ? '100%' : fullLayout.height + 'px'
    })
    .selectAll('.main-svg')
    .call(Drawing.setSize, fullLayout.width, fullLayout.height);
    gd._context.setBackground(gd, fullLayout.paper_bgcolor);

    exports.drawMainTitle(gd);
    ModeBar.manage(gd);

    // _has('cartesian') means SVG specifically, not GL2D - but GL2D
    // can still get here because it makes some of the SVG structure
    // for shared features like selections.
    if(!fullLayout._has('cartesian')) {
        return Plots.previousPromises(gd);
    }

    function getLinePosition(ax, counterAx, side) {
        var lwHalf = ax._lw / 2;

        if(ax._id.charAt(0) === 'x') {
            if(!counterAx) return gs.t + gs.h * (1 - (ax.position || 0)) + (lwHalf % 1);
            else if(side === 'top') return counterAx._offset - pad - lwHalf;
            return counterAx._offset + counterAx._length + pad + lwHalf;
        }

        if(!counterAx) return gs.l + gs.w * (ax.position || 0) + (lwHalf % 1);
        else if(side === 'right') return counterAx._offset + counterAx._length + pad + lwHalf;
        return counterAx._offset - pad - lwHalf;
    }

    // some preparation of axis position info
    for(i = 0; i < axList.length; i++) {
        ax = axList[i];

        var counterAx = ax._anchorAxis;

        // clear axis line positions, to be set in the subplot loop below
        ax._linepositions = {};

        // stash crispRounded linewidth so we don't need to pass gd all over the place
        ax._lw = Drawing.crispRound(gd, ax.linewidth, 1);

        // figure out the main axis line and main mirror line position.
        // it's easier to follow the logic if we handle these separately from
        // ax._linepositions, which are only used by mirror=allticks
        // for non-main-subplot ticks, and mirror=all(ticks)? for zero line
        // hiding logic
        ax._mainLinePosition = getLinePosition(ax, counterAx, ax.side);
        ax._mainMirrorPosition = (ax.mirror && counterAx) ?
            getLinePosition(ax, counterAx,
                alignmentConstants.OPPOSITE_SIDE[ax.side]) : null;
    }

    // figure out which backgrounds we need to draw,
    // and in which layers to put them
    var lowerBackgroundIDs = [];
    var backgroundIds = [];
    var lowerDomains = [];
    // no need to draw background when paper and plot color are the same color,
    // activate mode just for large splom (which benefit the most from this
    // optimization), but this could apply to all cartesian subplots.
    var noNeedForBg = (
        Color.opacity(fullLayout.paper_bgcolor) === 1 &&
        Color.opacity(fullLayout.plot_bgcolor) === 1 &&
        fullLayout.paper_bgcolor === fullLayout.plot_bgcolor
    );

    for(subplot in fullLayout._plots) {
        plotinfo = fullLayout._plots[subplot];

        if(plotinfo.mainplot) {
            // mainplot is a reference to the main plot this one is overlaid on
            // so if it exists, this is an overlaid plot and we don't need to
            // give it its own background
            if(plotinfo.bg) {
                plotinfo.bg.remove();
            }
            plotinfo.bg = undefined;
        } else {
            var xDomain = plotinfo.xaxis.domain;
            var yDomain = plotinfo.yaxis.domain;
            var plotgroup = plotinfo.plotgroup;

            if(overlappingDomain(xDomain, yDomain, lowerDomains)) {
                var pgNode = plotgroup.node();
                var plotgroupBg = plotinfo.bg = Lib.ensureSingle(plotgroup, 'rect', 'bg');
                pgNode.insertBefore(plotgroupBg.node(), pgNode.childNodes[0]);
                backgroundIds.push(subplot);
            } else {
                plotgroup.select('rect.bg').remove();
                lowerDomains.push([xDomain, yDomain]);
                if(!noNeedForBg) {
                    lowerBackgroundIDs.push(subplot);
                    backgroundIds.push(subplot);
                }
            }
        }
    }

    // now create all the lower-layer backgrounds at once now that
    // we have the list of subplots that need them
    var lowerBackgrounds = fullLayout._bgLayer.selectAll('.bg')
        .data(lowerBackgroundIDs);

    lowerBackgrounds.enter().append('rect')
        .classed('bg', true);

    lowerBackgrounds.exit().remove();

    lowerBackgrounds.each(function(subplot) {
        fullLayout._plots[subplot].bg = d3.select(this);
    });

    // style all backgrounds
    for(i = 0; i < backgroundIds.length; i++) {
        plotinfo = fullLayout._plots[backgroundIds[i]];
        xa = plotinfo.xaxis;
        ya = plotinfo.yaxis;

        if(plotinfo.bg) {
            plotinfo.bg
                .call(Drawing.setRect,
                    xa._offset - pad, ya._offset - pad,
                    xa._length + 2 * pad, ya._length + 2 * pad)
                .call(Color.fill, fullLayout.plot_bgcolor)
                .style('stroke-width', 0);
        }
    }

    if(!fullLayout._hasOnlyLargeSploms) {
        for(subplot in fullLayout._plots) {
            plotinfo = fullLayout._plots[subplot];
            xa = plotinfo.xaxis;
            ya = plotinfo.yaxis;

            // Clip so that data only shows up on the plot area.
            var clipId = plotinfo.clipId = 'clip' + fullLayout._uid + subplot + 'plot';

            var plotClip = Lib.ensureSingleById(fullLayout._clips, 'clipPath', clipId, function(s) {
                s.classed('plotclip', true)
                    .append('rect');
            });

            plotinfo.clipRect = plotClip.select('rect').attr({
                width: xa._length,
                height: ya._length
            });

            Drawing.setTranslate(plotinfo.plot, xa._offset, ya._offset);

            var plotClipId;
            var layerClipId;

            if(plotinfo._hasClipOnAxisFalse) {
                plotClipId = null;
                layerClipId = clipId;
            } else {
                plotClipId = clipId;
                layerClipId = null;
            }

            Drawing.setClipUrl(plotinfo.plot, plotClipId, gd);

            // stash layer clipId value (null or same as clipId)
            // to DRY up Drawing.setClipUrl calls on trace-module and trace layers
            // downstream
            plotinfo.layerClipId = layerClipId;
        }
    }

    var xLinesXLeft, xLinesXRight, xLinesYBottom, xLinesYTop,
        leftYLineWidth, rightYLineWidth;
    var yLinesYBottom, yLinesYTop, yLinesXLeft, yLinesXRight,
        connectYBottom, connectYTop;
    var extraSubplot;

    function xLinePath(y) {
        return 'M' + xLinesXLeft + ',' + y + 'H' + xLinesXRight;
    }

    function xLinePathFree(y) {
        return 'M' + xa._offset + ',' + y + 'h' + xa._length;
    }

    function yLinePath(x) {
        return 'M' + x + ',' + yLinesYTop + 'V' + yLinesYBottom;
    }

    function yLinePathFree(x) {
        return 'M' + x + ',' + ya._offset + 'v' + ya._length;
    }

    function mainPath(ax, pathFn, pathFnFree) {
        if(!ax.showline || subplot !== ax._mainSubplot) return '';
        if(!ax._anchorAxis) return pathFnFree(ax._mainLinePosition);
        var out = pathFn(ax._mainLinePosition);
        if(ax.mirror) out += pathFn(ax._mainMirrorPosition);
        return out;
    }

    for(subplot in fullLayout._plots) {
        plotinfo = fullLayout._plots[subplot];
        xa = plotinfo.xaxis;
        ya = plotinfo.yaxis;

        /*
         * x lines get longer where they meet y lines, to make a crisp corner.
         * The x lines get the padding (margin.pad) plus the y line width to
         * fill up the corner nicely. Free x lines are excluded - they always
         * span exactly the data area of the plot
         *
         *  | XXXXX
         *  | XXXXX
         *  |
         *  +------
         *     x1
         *    -----
         *     x2
         */
        var xPath = 'M0,0';
        if(shouldShowLinesOrTicks(xa, subplot)) {
            leftYLineWidth = findCounterAxisLineWidth(xa, 'left', ya, axList);
            xLinesXLeft = xa._offset - (leftYLineWidth ? (pad + leftYLineWidth) : 0);
            rightYLineWidth = findCounterAxisLineWidth(xa, 'right', ya, axList);
            xLinesXRight = xa._offset + xa._length + (rightYLineWidth ? (pad + rightYLineWidth) : 0);
            xLinesYBottom = getLinePosition(xa, ya, 'bottom');
            xLinesYTop = getLinePosition(xa, ya, 'top');

            // save axis line positions for extra ticks to reference
            // each subplot that gets ticks from "allticks" gets an entry:
            //    [left or bottom, right or top]
            extraSubplot = (!xa._anchorAxis || subplot !== xa._mainSubplot);
            if(extraSubplot && (xa.mirror === 'allticks' || xa.mirror === 'all')) {
                xa._linepositions[subplot] = [xLinesYBottom, xLinesYTop];
            }

            xPath = mainPath(xa, xLinePath, xLinePathFree);
            if(extraSubplot && xa.showline && (xa.mirror === 'all' || xa.mirror === 'allticks')) {
                xPath += xLinePath(xLinesYBottom) + xLinePath(xLinesYTop);
            }

            plotinfo.xlines
                .style('stroke-width', xa._lw + 'px')
                .call(Color.stroke, xa.showline ?
                    xa.linecolor : 'rgba(0,0,0,0)');
        }
        plotinfo.xlines.attr('d', xPath);

        /*
         * y lines that meet x axes get longer only by margin.pad, because
         * the x axes fill in the corner space. Free y axes, like free x axes,
         * always span exactly the data area of the plot
         *
         *   |   | XXXX
         * y2| y1| XXXX
         *   |   | XXXX
         *       |
         *       +-----
         */
        var yPath = 'M0,0';
        if(shouldShowLinesOrTicks(ya, subplot)) {
            connectYBottom = findCounterAxisLineWidth(ya, 'bottom', xa, axList);
            yLinesYBottom = ya._offset + ya._length + (connectYBottom ? pad : 0);
            connectYTop = findCounterAxisLineWidth(ya, 'top', xa, axList);
            yLinesYTop = ya._offset - (connectYTop ? pad : 0);
            yLinesXLeft = getLinePosition(ya, xa, 'left');
            yLinesXRight = getLinePosition(ya, xa, 'right');

            extraSubplot = (!ya._anchorAxis || subplot !== ya._mainSubplot);
            if(extraSubplot && (ya.mirror === 'allticks' || ya.mirror === 'all')) {
                ya._linepositions[subplot] = [yLinesXLeft, yLinesXRight];
            }

            yPath = mainPath(ya, yLinePath, yLinePathFree);
            if(extraSubplot && ya.showline && (ya.mirror === 'all' || ya.mirror === 'allticks')) {
                yPath += yLinePath(yLinesXLeft) + yLinePath(yLinesXRight);
            }

            plotinfo.ylines
                .style('stroke-width', ya._lw + 'px')
                .call(Color.stroke, ya.showline ?
                    ya.linecolor : 'rgba(0,0,0,0)');
        }
        plotinfo.ylines.attr('d', yPath);
    }

    Axes.makeClipPaths(gd);

    return Plots.previousPromises(gd);
}

function shouldShowLinesOrTicks(ax, subplot) {
    return (ax.ticks || ax.showline) &&
        (subplot === ax._mainSubplot || ax.mirror === 'all' || ax.mirror === 'allticks');
}

/*
 * should we draw a line on counterAx at this side of ax?
 * It's assumed that counterAx is known to overlay the subplot we're working on
 * but it may not be its main axis.
 */
function shouldShowLineThisSide(ax, side, counterAx) {
    // does counterAx get a line at all?
    if(!counterAx.showline || !counterAx._lw) return false;

    // are we drawing *all* lines for counterAx?
    if(counterAx.mirror === 'all' || counterAx.mirror === 'allticks') return true;

    var anchorAx = counterAx._anchorAxis;

    // is this a free axis? free axes can only have a subplot side-line with all(ticks)? mirroring
    if(!anchorAx) return false;

    // in order to handle cases where the user forgot to anchor this axis correctly
    // (because its default anchor has the same domain on the relevant end)
    // check whether the relevant position is the same.
    var sideIndex = alignmentConstants.FROM_BL[side];
    if(counterAx.side === side) {
        return anchorAx.domain[sideIndex] === ax.domain[sideIndex];
    }
    return counterAx.mirror && anchorAx.domain[1 - sideIndex] === ax.domain[1 - sideIndex];
}

/*
 * Is there another axis intersecting `side` end of `ax`?
 * First look at `counterAx` (the axis for this subplot),
 * then at all other potential counteraxes on or overlaying this subplot.
 * Take the line width from the first one that has a line.
 */
function findCounterAxisLineWidth(ax, side, counterAx, axList) {
    if(shouldShowLineThisSide(ax, side, counterAx)) {
        return counterAx._lw;
    }
    for(var i = 0; i < axList.length; i++) {
        var axi = axList[i];
        if(axi._mainAxis === counterAx._mainAxis && shouldShowLineThisSide(ax, side, axi)) {
            return axi._lw;
        }
    }
    return 0;
}

exports.drawMainTitle = function(gd) {
    var fullLayout = gd._fullLayout;

    var textAnchor = getMainTitleTextAnchor(fullLayout);
    var dy = getMainTitleDy(fullLayout);

    Titles.draw(gd, 'gtitle', {
        propContainer: fullLayout,
        propName: 'title.text',
        placeholder: fullLayout._dfltTitle.plot,
        attributes: {
            x: getMainTitleX(fullLayout, textAnchor),
            y: getMainTitleY(fullLayout, dy),
            'text-anchor': textAnchor,
            dy: dy
        }
    });
};

function getMainTitleX(fullLayout, textAnchor) {
    var title = fullLayout.title;
    var gs = fullLayout._size;
    var hPadShift = 0;

    if(textAnchor === SVG_TEXT_ANCHOR_START) {
        hPadShift = title.pad.l;
    } else if(textAnchor === SVG_TEXT_ANCHOR_END) {
        hPadShift = -title.pad.r;
    }

    switch(title.xref) {
        case 'paper':
            return gs.l + gs.w * title.x + hPadShift;
        case 'container':
        default:
            return fullLayout.width * title.x + hPadShift;
    }
}

function getMainTitleY(fullLayout, dy) {
    var title = fullLayout.title;
    var gs = fullLayout._size;
    var vPadShift = 0;

    if(dy === '0em' || !dy) {
        vPadShift = -title.pad.b;
    } else if(dy === alignmentConstants.CAP_SHIFT + 'em') {
        vPadShift = title.pad.t;
    }

    if(title.y === 'auto') {
        return gs.t / 2;
    } else {
        switch(title.yref) {
            case 'paper':
                return gs.t + gs.h - gs.h * title.y + vPadShift;
            case 'container':
            default:
                return fullLayout.height - fullLayout.height * title.y + vPadShift;
        }
    }
}

function getMainTitleTextAnchor(fullLayout) {
    var title = fullLayout.title;

    var textAnchor = SVG_TEXT_ANCHOR_MIDDLE;
    if(Lib.isRightAnchor(title)) {
        textAnchor = SVG_TEXT_ANCHOR_END;
    } else if(Lib.isLeftAnchor(title)) {
        textAnchor = SVG_TEXT_ANCHOR_START;
    }

    return textAnchor;
}

function getMainTitleDy(fullLayout) {
    var title = fullLayout.title;

    var dy = '0em';
    if(Lib.isTopAnchor(title)) {
        dy = alignmentConstants.CAP_SHIFT + 'em';
    } else if(Lib.isMiddleAnchor(title)) {
        dy = alignmentConstants.MID_SHIFT + 'em';
    }

    return dy;
}

exports.doTraceStyle = function(gd) {
    var calcdata = gd.calcdata;
    var editStyleCalls = [];
    var i;

    for(i = 0; i < calcdata.length; i++) {
        var cd = calcdata[i];
        var cd0 = cd[0] || {};
        var trace = cd0.trace || {};
        var _module = trace._module || {};

        // See if we need to do arraysToCalcdata
        // call it regardless of what change we made, in case
        // supplyDefaults brought in an array that was already
        // in gd.data but not in gd._fullData previously
        var arraysToCalcdata = _module.arraysToCalcdata;
        if(arraysToCalcdata) arraysToCalcdata(cd, trace);

        var editStyle = _module.editStyle;
        if(editStyle) editStyleCalls.push({fn: editStyle, cd0: cd0});
    }

    if(editStyleCalls.length) {
        for(i = 0; i < editStyleCalls.length; i++) {
            var edit = editStyleCalls[i];
            edit.fn(gd, edit.cd0);
        }
        clearGlCanvases(gd);
        exports.redrawReglTraces(gd);
    }

    Plots.style(gd);
    Registry.getComponentMethod('legend', 'draw')(gd);

    return Plots.previousPromises(gd);
};

exports.doColorBars = function(gd) {
    Registry.getComponentMethod('colorbar', 'draw')(gd);
    return Plots.previousPromises(gd);
};

// force plot() to redo the layout and replot with the modified layout
exports.layoutReplot = function(gd) {
    var layout = gd.layout;
    gd.layout = undefined;
    return Registry.call('plot', gd, '', layout);
};

exports.doLegend = function(gd) {
    Registry.getComponentMethod('legend', 'draw')(gd);
    return Plots.previousPromises(gd);
};

exports.doTicksRelayout = function(gd) {
    Axes.draw(gd, 'redraw');

    if(gd._fullLayout._hasOnlyLargeSploms) {
        Registry.subplotsRegistry.splom.updateGrid(gd);
        clearGlCanvases(gd);
        exports.redrawReglTraces(gd);
    }

    exports.drawMainTitle(gd);
    return Plots.previousPromises(gd);
};

exports.doModeBar = function(gd) {
    var fullLayout = gd._fullLayout;

    ModeBar.manage(gd);

    for(var i = 0; i < fullLayout._basePlotModules.length; i++) {
        var updateFx = fullLayout._basePlotModules[i].updateFx;
        if(updateFx) updateFx(gd);
    }

    return Plots.previousPromises(gd);
};

exports.doCamera = function(gd) {
    var fullLayout = gd._fullLayout;
    var sceneIds = fullLayout._subplots.gl3d;

    for(var i = 0; i < sceneIds.length; i++) {
        var sceneLayout = fullLayout[sceneIds[i]];
        var scene = sceneLayout._scene;

        scene.setViewport(sceneLayout);
    }
};

exports.drawData = function(gd) {
    var fullLayout = gd._fullLayout;

    clearGlCanvases(gd);

    // loop over the base plot modules present on graph
    var basePlotModules = fullLayout._basePlotModules;
    for(var i = 0; i < basePlotModules.length; i++) {
        basePlotModules[i].plot(gd);
    }

    exports.redrawReglTraces(gd);

    // styling separate from drawing
    Plots.style(gd);

    // draw components that can be drawn on axes,
    // and that do not push the margins
    Registry.getComponentMethod('shapes', 'draw')(gd);
    Registry.getComponentMethod('annotations', 'draw')(gd);
    Registry.getComponentMethod('images', 'draw')(gd);

    // Mark the first render as complete
    fullLayout._replotting = false;

    return Plots.previousPromises(gd);
};

// Draw (or redraw) all regl-based traces in one go,
// useful during drag and selection where buffers of targeted traces are updated,
// but all traces need to be redrawn following clearGlCanvases.
//
// Note that _module.plot for regl trace does NOT draw things
// on the canvas, they only update the buffers.
// Drawing is perform here.
//
// TODO try adding per-subplot option using gl.SCISSOR_TEST for
// non-overlaying, disjoint subplots.
//
// TODO try to include parcoords in here.
// https://github.com/plotly/plotly.js/issues/3069
exports.redrawReglTraces = function(gd) {
    var fullLayout = gd._fullLayout;

    if(fullLayout._has('regl')) {
        var fullData = gd._fullData;
        var cartesianIds = [];
        var polarIds = [];
        var i, sp;

        if(fullLayout._hasOnlyLargeSploms) {
            fullLayout._splomGrid.draw();
        }

        // N.B.
        // - Loop over fullData (not _splomScenes) to preserve splom trace-to-trace ordering
        // - Fill list if subplot ids (instead of fullLayout._subplots) to handle cases where all traces
        //   of a given module are `visible !== true`
        for(i = 0; i < fullData.length; i++) {
            var trace = fullData[i];

            if(trace.visible === true && trace._length !== 0) {
                if(trace.type === 'splom') {
                    fullLayout._splomScenes[trace.uid].draw();
                } else if(trace.type === 'scattergl') {
                    Lib.pushUnique(cartesianIds, trace.xaxis + trace.yaxis);
                } else if(trace.type === 'scatterpolargl') {
                    Lib.pushUnique(polarIds, trace.subplot);
                }
            }
        }

        for(i = 0; i < cartesianIds.length; i++) {
            sp = fullLayout._plots[cartesianIds[i]];
            if(sp._scene) sp._scene.draw();
        }

        for(i = 0; i < polarIds.length; i++) {
            sp = fullLayout[polarIds[i]]._subplot;
            if(sp._scene) sp._scene.draw();
        }
    }
};

exports.doAutoRangeAndConstraints = function(gd) {
    var fullLayout = gd._fullLayout;
    var axList = Axes.list(gd, '', true);
    var matchGroups = fullLayout._axisMatchGroups || [];
    var axLookup = {};
    var ax;
    var axRng;

    for(var i = 0; i < axList.length; i++) {
        ax = axList[i];
        cleanAxisConstraints(gd, ax);
        doAutoRange(gd, ax);
        axLookup[ax._id] = 1;
    }

    enforceAxisConstraints(gd);

    groupLoop:
    for(var j = 0; j < matchGroups.length; j++) {
        var group = matchGroups[j];
        var rng = null;
        var id;

        for(id in group) {
            ax = Axes.getFromId(gd, id);

            // skip over 'missing' axes which do not pass through doAutoRange
            if(!axLookup[ax._id]) continue;
            // if one axis has autorange false, we're done
            if(ax.autorange === false) continue groupLoop;

            axRng = Lib.simpleMap(ax.range, ax.r2l);
            if(rng) {
                if(rng[0] < rng[1]) {
                    rng[0] = Math.min(rng[0], axRng[0]);
                    rng[1] = Math.max(rng[1], axRng[1]);
                } else {
                    rng[0] = Math.max(rng[0], axRng[0]);
                    rng[1] = Math.min(rng[1], axRng[1]);
                }
            } else {
                rng = axRng;
            }
        }

        for(id in group) {
            ax = Axes.getFromId(gd, id);
            ax.range = Lib.simpleMap(rng, ax.l2r);
            ax._input.range = ax.range.slice();
            ax.setScale();
        }
    }
};

// An initial paint must be completed before these components can be
// correctly sized and the whole plot re-margined. fullLayout._replotting must
// be set to false before these will work properly.
exports.finalDraw = function(gd) {
    // TODO: rangesliders really belong in marginPushers but they need to be
    // drawn after data - can we at least get the margin pushing part separated
    // out and done earlier?
    Registry.getComponentMethod('rangeslider', 'draw')(gd);
    // TODO: rangeselector only needs to be here (in addition to drawMarginPushers)
    // because the margins need to be fully determined before we can call
    // autorange and update axis ranges (which rangeselector needs to know which
    // button is active). Can we break out its automargin step from its draw step?
    Registry.getComponentMethod('rangeselector', 'draw')(gd);
};

exports.drawMarginPushers = function(gd) {
    Registry.getComponentMethod('legend', 'draw')(gd);
    Registry.getComponentMethod('rangeselector', 'draw')(gd);
    Registry.getComponentMethod('sliders', 'draw')(gd);
    Registry.getComponentMethod('updatemenus', 'draw')(gd);
    Registry.getComponentMethod('colorbar', 'draw')(gd);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/constraints.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/constraints.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var id2name = __webpack_require__(/*! ./axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js").id2name;
var scaleZoom = __webpack_require__(/*! ./scale_zoom */ "./node_modules/plotly.js/src/plots/cartesian/scale_zoom.js");
var makePadFn = __webpack_require__(/*! ./autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").makePadFn;
var concatExtremes = __webpack_require__(/*! ./autorange */ "./node_modules/plotly.js/src/plots/cartesian/autorange.js").concatExtremes;

var ALMOST_EQUAL = __webpack_require__(/*! ../../constants/numerical */ "./node_modules/plotly.js/src/constants/numerical.js").ALMOST_EQUAL;
var FROM_BL = __webpack_require__(/*! ../../constants/alignment */ "./node_modules/plotly.js/src/constants/alignment.js").FROM_BL;

exports.handleConstraintDefaults = function(containerIn, containerOut, coerce, opts) {
    var allAxisIds = opts.allAxisIds;
    var layoutOut = opts.layoutOut;
    var scaleanchorDflt = opts.scaleanchorDflt;
    var constrainDflt = opts.constrainDflt;
    var constraintGroups = layoutOut._axisConstraintGroups;
    var matchGroups = layoutOut._axisMatchGroups;
    var axId = containerOut._id;
    var axLetter = axId.charAt(0);
    var splomStash = ((layoutOut._splomAxes || {})[axLetter] || {})[axId] || {};
    var thisID = containerOut._id;
    var letter = thisID.charAt(0);

    // coerce the constraint mechanics even if this axis has no scaleanchor
    // because it may be the anchor of another axis.
    var constrain = coerce('constrain', constrainDflt);
    Lib.coerce(containerIn, containerOut, {
        constraintoward: {
            valType: 'enumerated',
            values: letter === 'x' ? ['left', 'center', 'right'] : ['bottom', 'middle', 'top'],
            dflt: letter === 'x' ? 'center' : 'middle'
        }
    }, 'constraintoward');

    var matches, matchOpts;

    if((containerIn.matches || splomStash.matches) && !containerOut.fixedrange) {
        matchOpts = getConstraintOpts(matchGroups, thisID, allAxisIds, layoutOut);
        matches = Lib.coerce(containerIn, containerOut, {
            matches: {
                valType: 'enumerated',
                values: matchOpts.linkableAxes || [],
                dflt: splomStash.matches
            }
        }, 'matches');
    }

    // 'matches' wins over 'scaleanchor' (for now)
    var scaleanchor, scaleOpts;

    if(!matches &&
       !(containerOut.fixedrange && constrain !== 'domain') &&
       (containerIn.scaleanchor || scaleanchorDflt)
     ) {
        scaleOpts = getConstraintOpts(constraintGroups, thisID, allAxisIds, layoutOut, constrain);
        scaleanchor = Lib.coerce(containerIn, containerOut, {
            scaleanchor: {
                valType: 'enumerated',
                values: scaleOpts.linkableAxes || []
            }
        }, 'scaleanchor', scaleanchorDflt);
    }

    if(matches) {
        delete containerOut.constrain;
        updateConstraintGroups(matchGroups, matchOpts.thisGroup, thisID, matches, 1);
    } else if(allAxisIds.indexOf(containerIn.matches) !== -1) {
        Lib.warn('ignored ' + containerOut._name + '.matches: "' +
            containerIn.matches + '" to avoid either an infinite loop ' +
            'or because the target axis has fixed range.');
    }

    if(scaleanchor) {
        var scaleratio = coerce('scaleratio');

        // TODO: I suppose I could do attribute.min: Number.MIN_VALUE to avoid zero,
        // but that seems hacky. Better way to say "must be a positive number"?
        // Of course if you use several super-tiny values you could eventually
        // force a product of these to zero and all hell would break loose...
        // Likewise with super-huge values.
        if(!scaleratio) scaleratio = containerOut.scaleratio = 1;

        updateConstraintGroups(constraintGroups, scaleOpts.thisGroup, thisID, scaleanchor, scaleratio);
    } else if(allAxisIds.indexOf(containerIn.scaleanchor) !== -1) {
        Lib.warn('ignored ' + containerOut._name + '.scaleanchor: "' +
            containerIn.scaleanchor + '" to avoid either an infinite loop ' +
            'and possibly inconsistent scaleratios, or because the target ' +
            'axis has fixed range or this axis declares a *matches* constraint.');
    }
};

// If this axis is already part of a constraint group, we can't
// scaleanchor any other axis in that group, or we'd make a loop.
// Filter allAxisIds to enforce this, also matching axis types.
function getConstraintOpts(groups, thisID, allAxisIds, layoutOut, constrain) {
    var doesNotConstrainRange = constrain !== 'range';
    var thisType = layoutOut[id2name(thisID)].type;
    var i, j, idj, axj;

    var linkableAxes = [];
    for(j = 0; j < allAxisIds.length; j++) {
        idj = allAxisIds[j];
        if(idj === thisID) continue;

        axj = layoutOut[id2name(idj)];
        if(axj.type === thisType) {
            if(!axj.fixedrange) {
                linkableAxes.push(idj);
            } else if(doesNotConstrainRange && axj.anchor) {
                // allow domain constraints on subplots where
                // BOTH axes have fixedrange:true and constrain:domain
                var counterAxj = layoutOut[id2name(axj.anchor)];
                if(counterAxj.fixedrange) {
                    linkableAxes.push(idj);
                }
            }
        }
    }

    for(i = 0; i < groups.length; i++) {
        if(groups[i][thisID]) {
            var thisGroup = groups[i];

            var linkableAxesNoLoops = [];
            for(j = 0; j < linkableAxes.length; j++) {
                idj = linkableAxes[j];
                if(!thisGroup[idj]) linkableAxesNoLoops.push(idj);
            }
            return {linkableAxes: linkableAxesNoLoops, thisGroup: thisGroup};
        }
    }

    return {linkableAxes: linkableAxes, thisGroup: null};
}

/*
 * Add this axis to the axis constraint groups, which is the collection
 * of axes that are all constrained together on scale.
 *
 * constraintGroups: a list of objects. each object is
 * {axis_id: scale_within_group}, where scale_within_group is
 * only important relative to the rest of the group, and defines
 * the relative scales between all axes in the group
 *
 * thisGroup: the group the current axis is already in
 * thisID: the id if the current axis
 * scaleanchor: the id of the axis to scale it with
 * scaleratio: the ratio of this axis to the scaleanchor axis
 */
function updateConstraintGroups(constraintGroups, thisGroup, thisID, scaleanchor, scaleratio) {
    var i, j, groupi, keyj, thisGroupIndex;

    if(thisGroup === null) {
        thisGroup = {};
        thisGroup[thisID] = 1;
        thisGroupIndex = constraintGroups.length;
        constraintGroups.push(thisGroup);
    } else {
        thisGroupIndex = constraintGroups.indexOf(thisGroup);
    }

    var thisGroupKeys = Object.keys(thisGroup);

    // we know that this axis isn't in any other groups, but we don't know
    // about the scaleanchor axis. If it is, we need to merge the groups.
    for(i = 0; i < constraintGroups.length; i++) {
        groupi = constraintGroups[i];
        if(i !== thisGroupIndex && groupi[scaleanchor]) {
            var baseScale = groupi[scaleanchor];
            for(j = 0; j < thisGroupKeys.length; j++) {
                keyj = thisGroupKeys[j];
                groupi[keyj] = baseScale * scaleratio * thisGroup[keyj];
            }
            constraintGroups.splice(thisGroupIndex, 1);
            return;
        }
    }

    // otherwise, we insert the new scaleanchor axis as the base scale (1)
    // in its group, and scale the rest of the group to it
    if(scaleratio !== 1) {
        for(j = 0; j < thisGroupKeys.length; j++) {
            thisGroup[thisGroupKeys[j]] *= scaleratio;
        }
    }
    thisGroup[scaleanchor] = 1;
}

exports.enforce = function enforce(gd) {
    var fullLayout = gd._fullLayout;
    var constraintGroups = fullLayout._axisConstraintGroups || [];

    var i, j, axisID, ax, normScale, mode, factor;

    for(i = 0; i < constraintGroups.length; i++) {
        var group = constraintGroups[i];
        var axisIDs = Object.keys(group);

        var minScale = Infinity;
        var maxScale = 0;
        // mostly matchScale will be the same as minScale
        // ie we expand axis ranges to encompass *everything*
        // that's currently in any of their ranges, but during
        // autorange of a subset of axes we will ignore other
        // axes for this purpose.
        var matchScale = Infinity;
        var normScales = {};
        var axes = {};
        var hasAnyDomainConstraint = false;

        // find the (normalized) scale of each axis in the group
        for(j = 0; j < axisIDs.length; j++) {
            axisID = axisIDs[j];
            axes[axisID] = ax = fullLayout[id2name(axisID)];

            if(ax._inputDomain) ax.domain = ax._inputDomain.slice();
            else ax._inputDomain = ax.domain.slice();

            if(!ax._inputRange) ax._inputRange = ax.range.slice();

            // set axis scale here so we can use _m rather than
            // having to calculate it from length and range
            ax.setScale();

            // abs: inverted scales still satisfy the constraint
            normScales[axisID] = normScale = Math.abs(ax._m) / group[axisID];
            minScale = Math.min(minScale, normScale);
            if(ax.constrain === 'domain' || !ax._constraintShrinkable) {
                matchScale = Math.min(matchScale, normScale);
            }

            // this has served its purpose, so remove it
            delete ax._constraintShrinkable;
            maxScale = Math.max(maxScale, normScale);

            if(ax.constrain === 'domain') hasAnyDomainConstraint = true;
        }

        // Do we have a constraint mismatch? Give a small buffer for rounding errors
        if(minScale > ALMOST_EQUAL * maxScale && !hasAnyDomainConstraint) continue;

        // now increase any ranges we need to until all normalized scales are equal
        for(j = 0; j < axisIDs.length; j++) {
            axisID = axisIDs[j];
            normScale = normScales[axisID];
            ax = axes[axisID];
            mode = ax.constrain;

            // even if the scale didn't change, if we're shrinking domain
            // we need to recalculate in case `constraintoward` changed
            if(normScale !== matchScale || mode === 'domain') {
                factor = normScale / matchScale;

                if(mode === 'range') {
                    scaleZoom(ax, factor);
                } else {
                    // mode === 'domain'

                    var inputDomain = ax._inputDomain;
                    var domainShrunk = (ax.domain[1] - ax.domain[0]) /
                        (inputDomain[1] - inputDomain[0]);
                    var rangeShrunk = (ax.r2l(ax.range[1]) - ax.r2l(ax.range[0])) /
                        (ax.r2l(ax._inputRange[1]) - ax.r2l(ax._inputRange[0]));

                    factor /= domainShrunk;

                    if(factor * rangeShrunk < 1) {
                        // we've asked to magnify the axis more than we can just by
                        // enlarging the domain - so we need to constrict range
                        ax.domain = ax._input.domain = inputDomain.slice();
                        scaleZoom(ax, factor);
                        continue;
                    }

                    if(rangeShrunk < 1) {
                        // the range has previously been constricted by ^^, but we've
                        // switched to the domain-constricted regime, so reset range
                        ax.range = ax._input.range = ax._inputRange.slice();
                        factor *= rangeShrunk;
                    }

                    if(ax.autorange) {
                        /*
                         * range & factor may need to change because range was
                         * calculated for the larger scaling, so some pixel
                         * paddings may get cut off when we reduce the domain.
                         *
                         * This is easier than the regular autorange calculation
                         * because we already know the scaling `m`, but we still
                         * need to cut out impossible constraints (like
                         * annotations with super-long arrows). That's what
                         * outerMin/Max are for - if the expansion was going to
                         * go beyond the original domain, it must be impossible
                         */
                        var rl0 = ax.r2l(ax.range[0]);
                        var rl1 = ax.r2l(ax.range[1]);
                        var rangeCenter = (rl0 + rl1) / 2;
                        var rangeMin = rangeCenter;
                        var rangeMax = rangeCenter;
                        var halfRange = Math.abs(rl1 - rangeCenter);
                        // extra tiny bit for rounding errors, in case we actually
                        // *are* expanding to the full domain
                        var outerMin = rangeCenter - halfRange * factor * 1.0001;
                        var outerMax = rangeCenter + halfRange * factor * 1.0001;
                        var getPad = makePadFn(ax);

                        updateDomain(ax, factor);
                        var m = Math.abs(ax._m);
                        var extremes = concatExtremes(gd, ax);
                        var minArray = extremes.min;
                        var maxArray = extremes.max;
                        var newVal;
                        var k;

                        for(k = 0; k < minArray.length; k++) {
                            newVal = minArray[k].val - getPad(minArray[k]) / m;
                            if(newVal > outerMin && newVal < rangeMin) {
                                rangeMin = newVal;
                            }
                        }

                        for(k = 0; k < maxArray.length; k++) {
                            newVal = maxArray[k].val + getPad(maxArray[k]) / m;
                            if(newVal < outerMax && newVal > rangeMax) {
                                rangeMax = newVal;
                            }
                        }

                        var domainExpand = (rangeMax - rangeMin) / (2 * halfRange);
                        factor /= domainExpand;

                        rangeMin = ax.l2r(rangeMin);
                        rangeMax = ax.l2r(rangeMax);
                        ax.range = ax._input.range = (rl0 < rl1) ?
                            [rangeMin, rangeMax] : [rangeMax, rangeMin];
                    }

                    updateDomain(ax, factor);
                }
            }
        }
    }
};

// For use before autoranging, check if this axis was previously constrained
// by domain but no longer is
exports.clean = function clean(gd, ax) {
    if(ax._inputDomain) {
        var isConstrained = false;
        var axId = ax._id;
        var constraintGroups = gd._fullLayout._axisConstraintGroups;
        for(var j = 0; j < constraintGroups.length; j++) {
            if(constraintGroups[j][axId]) {
                isConstrained = true;
                break;
            }
        }
        if(!isConstrained || ax.constrain !== 'domain') {
            ax._input.domain = ax.domain = ax._inputDomain;
            delete ax._inputDomain;
        }
    }
};

function updateDomain(ax, factor) {
    var inputDomain = ax._inputDomain;
    var centerFraction = FROM_BL[ax.constraintoward];
    var center = inputDomain[0] + (inputDomain[1] - inputDomain[0]) * centerFraction;

    ax.domain = ax._input.domain = [
        center + (inputDomain[0] - center) / factor,
        center + (inputDomain[1] - center) / factor
    ];
    ax.setScale();
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/scale_zoom.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/scale_zoom.js ***!
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




var FROM_BL = __webpack_require__(/*! ../../constants/alignment */ "./node_modules/plotly.js/src/constants/alignment.js").FROM_BL;

module.exports = function scaleZoom(ax, factor, centerFraction) {
    if(centerFraction === undefined) {
        centerFraction = FROM_BL[ax.constraintoward || 'center'];
    }

    var rangeLinear = [ax.r2l(ax.range[0]), ax.r2l(ax.range[1])];
    var center = rangeLinear[0] + (rangeLinear[1] - rangeLinear[0]) * centerFraction;

    ax.range = ax._input.range = [
        ax.l2r(center + (rangeLinear[0] - center) * factor),
        ax.l2r(center + (rangeLinear[1] - center) * factor)
    ];
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/select.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/select.js ***!
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




var polybool = __webpack_require__(/*! polybooljs */ "./node_modules/polybooljs/index.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var dashStyle = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js").dashStyle;
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var makeEventData = __webpack_require__(/*! ../../components/fx/helpers */ "./node_modules/plotly.js/src/components/fx/helpers.js").makeEventData;
var dragHelpers = __webpack_require__(/*! ../../components/dragelement/helpers */ "./node_modules/plotly.js/src/components/dragelement/helpers.js");
var freeMode = dragHelpers.freeMode;
var rectMode = dragHelpers.rectMode;
var drawMode = dragHelpers.drawMode;
var openMode = dragHelpers.openMode;
var selectMode = dragHelpers.selectMode;

var displayOutlines = __webpack_require__(/*! ../../components/shapes/draw_newshape/display_outlines */ "./node_modules/plotly.js/src/components/shapes/draw_newshape/display_outlines.js");
var handleEllipse = __webpack_require__(/*! ../../components/shapes/draw_newshape/helpers */ "./node_modules/plotly.js/src/components/shapes/draw_newshape/helpers.js").handleEllipse;
var newShapes = __webpack_require__(/*! ../../components/shapes/draw_newshape/newshapes */ "./node_modules/plotly.js/src/components/shapes/draw_newshape/newshapes.js");

var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var polygon = __webpack_require__(/*! ../../lib/polygon */ "./node_modules/plotly.js/src/lib/polygon.js");
var throttle = __webpack_require__(/*! ../../lib/throttle */ "./node_modules/plotly.js/src/lib/throttle.js");
var getFromId = __webpack_require__(/*! ./axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js").getFromId;
var clearGlCanvases = __webpack_require__(/*! ../../lib/clear_gl_canvases */ "./node_modules/plotly.js/src/lib/clear_gl_canvases.js");

var redrawReglTraces = __webpack_require__(/*! ../../plot_api/subroutines */ "./node_modules/plotly.js/src/plot_api/subroutines.js").redrawReglTraces;

var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js");
var MINSELECT = constants.MINSELECT;

var filteredPolygon = polygon.filter;
var polygonTester = polygon.tester;

var clearSelect = __webpack_require__(/*! ./handle_outline */ "./node_modules/plotly.js/src/plots/cartesian/handle_outline.js").clearSelect;

var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/plots/cartesian/helpers.js");
var p2r = helpers.p2r;
var axValue = helpers.axValue;
var getTransform = helpers.getTransform;

function prepSelect(e, startX, startY, dragOptions, mode) {
    var isFreeMode = freeMode(mode);
    var isRectMode = rectMode(mode);
    var isOpenMode = openMode(mode);
    var isDrawMode = drawMode(mode);
    var isSelectMode = selectMode(mode);

    var isLine = mode === 'drawline';
    var isEllipse = mode === 'drawcircle';
    var isLineOrEllipse = isLine || isEllipse; // cases with two start & end positions

    var gd = dragOptions.gd;
    var fullLayout = gd._fullLayout;
    var zoomLayer = fullLayout._zoomlayer;
    var dragBBox = dragOptions.element.getBoundingClientRect();
    var plotinfo = dragOptions.plotinfo;
    var transform = getTransform(plotinfo);
    var x0 = startX - dragBBox.left;
    var y0 = startY - dragBBox.top;
    var x1 = x0;
    var y1 = y0;
    var path0 = 'M' + x0 + ',' + y0;
    var pw = dragOptions.xaxes[0]._length;
    var ph = dragOptions.yaxes[0]._length;
    var allAxes = dragOptions.xaxes.concat(dragOptions.yaxes);
    var subtract = e.altKey &&
        !(drawMode(mode) && isOpenMode);

    var filterPoly, selectionTester, mergedPolygons, currentPolygon;
    var i, searchInfo, eventData;

    coerceSelectionsCache(e, gd, dragOptions);

    if(isFreeMode) {
        filterPoly = filteredPolygon([[x0, y0]], constants.BENDPX);
    }

    var outlines = zoomLayer.selectAll('path.select-outline-' + plotinfo.id).data(isDrawMode ? [0] : [1, 2]);
    var drwStyle = fullLayout.newshape;

    outlines.enter()
        .append('path')
        .attr('class', function(d) { return 'select-outline select-outline-' + d + ' select-outline-' + plotinfo.id; })
        .style(isDrawMode ? {
            opacity: drwStyle.opacity / 2,
            fill: isOpenMode ? undefined : drwStyle.fillcolor,
            stroke: drwStyle.line.color,
            'stroke-dasharray': dashStyle(drwStyle.line.dash, drwStyle.line.width),
            'stroke-width': drwStyle.line.width + 'px'
        } : {})
        .attr('fill-rule', drwStyle.fillrule)
        .classed('cursor-move', isDrawMode ? true : false)
        .attr('transform', transform)
        .attr('d', path0 + 'Z');

    var corners = zoomLayer.append('path')
        .attr('class', 'zoombox-corners')
        .style({
            fill: Color.background,
            stroke: Color.defaultLine,
            'stroke-width': 1
        })
        .attr('transform', transform)
        .attr('d', 'M0,0Z');


    var throttleID = fullLayout._uid + constants.SELECTID;
    var selection = [];

    // find the traces to search for selection points
    var searchTraces = determineSearchTraces(gd, dragOptions.xaxes,
      dragOptions.yaxes, dragOptions.subplot);

    function ascending(a, b) { return a - b; }

    // allow subplots to override fillRangeItems routine
    var fillRangeItems;

    if(plotinfo.fillRangeItems) {
        fillRangeItems = plotinfo.fillRangeItems;
    } else {
        if(isRectMode) {
            fillRangeItems = function(eventData, poly) {
                var ranges = eventData.range = {};

                for(i = 0; i < allAxes.length; i++) {
                    var ax = allAxes[i];
                    var axLetter = ax._id.charAt(0);

                    ranges[ax._id] = [
                        p2r(ax, poly[axLetter + 'min']),
                        p2r(ax, poly[axLetter + 'max'])
                    ].sort(ascending);
                }
            };
        } else { // case of isFreeMode
            fillRangeItems = function(eventData, poly, filterPoly) {
                var dataPts = eventData.lassoPoints = {};

                for(i = 0; i < allAxes.length; i++) {
                    var ax = allAxes[i];
                    dataPts[ax._id] = filterPoly.filtered.map(axValue(ax));
                }
            };
        }
    }

    dragOptions.moveFn = function(dx0, dy0) {
        x1 = Math.max(0, Math.min(pw, dx0 + x0));
        y1 = Math.max(0, Math.min(ph, dy0 + y0));

        var dx = Math.abs(x1 - x0);
        var dy = Math.abs(y1 - y0);

        if(isRectMode) {
            var direction;
            var start, end;

            if(isSelectMode) {
                var q = fullLayout.selectdirection;

                if(q === 'any') {
                    if(dy < Math.min(dx * 0.6, MINSELECT)) {
                        direction = 'h';
                    } else if(dx < Math.min(dy * 0.6, MINSELECT)) {
                        direction = 'v';
                    } else {
                        direction = 'd';
                    }
                } else {
                    direction = q;
                }

                switch(direction) {
                    case 'h':
                        start = isEllipse ? ph / 2 : 0;
                        end = ph;
                        break;
                    case 'v':
                        start = isEllipse ? pw / 2 : 0;
                        end = pw;
                        break;
                }
            }

            if(isDrawMode) {
                switch(fullLayout.newshape.drawdirection) {
                    case 'vertical':
                        direction = 'h';
                        start = isEllipse ? ph / 2 : 0;
                        end = ph;
                        break;
                    case 'horizontal':
                        direction = 'v';
                        start = isEllipse ? pw / 2 : 0;
                        end = pw;
                        break;
                    case 'ortho':
                        if(dx < dy) {
                            direction = 'h';
                            start = y0;
                            end = y1;
                        } else {
                            direction = 'v';
                            start = x0;
                            end = x1;
                        }
                        break;
                    default: // i.e. case of 'diagonal'
                        direction = 'd';
                }
            }

            if(direction === 'h') {
                // horizontal motion
                currentPolygon = isLineOrEllipse ?
                    handleEllipse(isEllipse, [x1, start], [x1, end]) : // using x1 instead of x0 allows adjusting the line while drawing
                    [[x0, start], [x0, end], [x1, end], [x1, start]]; // make a vertical box

                currentPolygon.xmin = isLineOrEllipse ? x1 : Math.min(x0, x1);
                currentPolygon.xmax = isLineOrEllipse ? x1 : Math.max(x0, x1);
                currentPolygon.ymin = Math.min(start, end);
                currentPolygon.ymax = Math.max(start, end);
                // extras to guide users in keeping a straight selection
                corners.attr('d', 'M' + currentPolygon.xmin + ',' + (y0 - MINSELECT) +
                    'h-4v' + (2 * MINSELECT) + 'h4Z' +
                    'M' + (currentPolygon.xmax - 1) + ',' + (y0 - MINSELECT) +
                    'h4v' + (2 * MINSELECT) + 'h-4Z');
            } else if(direction === 'v') {
                // vertical motion
                currentPolygon = isLineOrEllipse ?
                    handleEllipse(isEllipse, [start, y1], [end, y1]) : // using y1 instead of y0 allows adjusting the line while drawing
                    [[start, y0], [start, y1], [end, y1], [end, y0]]; // make a horizontal box

                currentPolygon.xmin = Math.min(start, end);
                currentPolygon.xmax = Math.max(start, end);
                currentPolygon.ymin = isLineOrEllipse ? y1 : Math.min(y0, y1);
                currentPolygon.ymax = isLineOrEllipse ? y1 : Math.max(y0, y1);
                corners.attr('d', 'M' + (x0 - MINSELECT) + ',' + currentPolygon.ymin +
                    'v-4h' + (2 * MINSELECT) + 'v4Z' +
                    'M' + (x0 - MINSELECT) + ',' + (currentPolygon.ymax - 1) +
                    'v4h' + (2 * MINSELECT) + 'v-4Z');
            } else if(direction === 'd') {
                // diagonal motion
                currentPolygon = isLineOrEllipse ?
                    handleEllipse(isEllipse, [x0, y0], [x1, y1]) :
                    [[x0, y0], [x0, y1], [x1, y1], [x1, y0]];

                currentPolygon.xmin = Math.min(x0, x1);
                currentPolygon.xmax = Math.max(x0, x1);
                currentPolygon.ymin = Math.min(y0, y1);
                currentPolygon.ymax = Math.max(y0, y1);
                corners.attr('d', 'M0,0Z');
            }
        } else if(isFreeMode) {
            filterPoly.addPt([x1, y1]);
            currentPolygon = filterPoly.filtered;
        }

        // create outline & tester
        if(dragOptions.selectionDefs && dragOptions.selectionDefs.length) {
            mergedPolygons = mergePolygons(dragOptions.mergedPolygons, currentPolygon, subtract);
            currentPolygon.subtract = subtract;
            selectionTester = multiTester(dragOptions.selectionDefs.concat([currentPolygon]));
        } else {
            mergedPolygons = [currentPolygon];
            selectionTester = polygonTester(currentPolygon);
        }

        // display polygons on the screen
        displayOutlines(convertPoly(mergedPolygons, isOpenMode), outlines, dragOptions);

        if(isSelectMode) {
            throttle.throttle(
                throttleID,
                constants.SELECTDELAY,
                function() {
                    selection = [];

                    var thisSelection;
                    var traceSelections = [];
                    var traceSelection;
                    for(i = 0; i < searchTraces.length; i++) {
                        searchInfo = searchTraces[i];

                        traceSelection = searchInfo._module.selectPoints(searchInfo, selectionTester);
                        traceSelections.push(traceSelection);

                        thisSelection = fillSelectionItem(traceSelection, searchInfo);

                        if(selection.length) {
                            for(var j = 0; j < thisSelection.length; j++) {
                                selection.push(thisSelection[j]);
                            }
                        } else selection = thisSelection;
                    }

                    eventData = {points: selection};
                    updateSelectedState(gd, searchTraces, eventData);
                    fillRangeItems(eventData, currentPolygon, filterPoly);
                    dragOptions.gd.emit('plotly_selecting', eventData);
                }
            );
        }
    };

    dragOptions.clickFn = function(numClicks, evt) {
        corners.remove();

        if(gd._fullLayout._activeShapeIndex >= 0) {
            gd._fullLayout._deactivateShape(gd);
            return;
        }
        if(isDrawMode) return;

        var clickmode = fullLayout.clickmode;

        throttle.done(throttleID).then(function() {
            throttle.clear(throttleID);
            if(numClicks === 2) {
                // clear selection on doubleclick
                outlines.remove();
                for(i = 0; i < searchTraces.length; i++) {
                    searchInfo = searchTraces[i];
                    searchInfo._module.selectPoints(searchInfo, false);
                }

                updateSelectedState(gd, searchTraces);

                clearSelectionsCache(dragOptions);

                gd.emit('plotly_deselect', null);
            } else {
                if(clickmode.indexOf('select') > -1) {
                    selectOnClick(evt, gd, dragOptions.xaxes, dragOptions.yaxes,
                      dragOptions.subplot, dragOptions, outlines);
                }

                if(clickmode === 'event') {
                    // TODO: remove in v2 - this was probably never intended to work as it does,
                    // but in case anyone depends on it we don't want to break it now.
                    // Note that click-to-select introduced pre v2 also emitts proper
                    // event data when clickmode is having 'select' in its flag list.
                    gd.emit('plotly_selected', undefined);
                }
            }

            Fx.click(gd, evt);
        }).catch(Lib.error);
    };

    dragOptions.doneFn = function() {
        corners.remove();

        throttle.done(throttleID).then(function() {
            throttle.clear(throttleID);
            dragOptions.gd.emit('plotly_selected', eventData);

            if(currentPolygon && dragOptions.selectionDefs) {
                // save last polygons
                currentPolygon.subtract = subtract;
                dragOptions.selectionDefs.push(currentPolygon);

                // we have to keep reference to arrays container
                dragOptions.mergedPolygons.length = 0;
                [].push.apply(dragOptions.mergedPolygons, mergedPolygons);
            }

            if(dragOptions.doneFnCompleted) {
                dragOptions.doneFnCompleted(selection);
            }
        }).catch(Lib.error);

        if(isDrawMode) {
            clearSelectionsCache(dragOptions);
        }
    };
}

function selectOnClick(evt, gd, xAxes, yAxes, subplot, dragOptions, polygonOutlines) {
    var hoverData = gd._hoverdata;
    var fullLayout = gd._fullLayout;
    var clickmode = fullLayout.clickmode;
    var sendEvents = clickmode.indexOf('event') > -1;
    var selection = [];
    var searchTraces, searchInfo, currentSelectionDef, selectionTester, traceSelection;
    var thisTracesSelection, pointOrBinSelected, subtract, eventData, i;

    if(isHoverDataSet(hoverData)) {
        coerceSelectionsCache(evt, gd, dragOptions);
        searchTraces = determineSearchTraces(gd, xAxes, yAxes, subplot);
        var clickedPtInfo = extractClickedPtInfo(hoverData, searchTraces);
        var isBinnedTrace = clickedPtInfo.pointNumbers.length > 0;


        // Note: potentially costly operation isPointOrBinSelected is
        // called as late as possible through the use of an assignment
        // in an if condition.
        if(isBinnedTrace ?
            isOnlyThisBinSelected(searchTraces, clickedPtInfo) :
            isOnlyOnePointSelected(searchTraces) &&
                (pointOrBinSelected = isPointOrBinSelected(clickedPtInfo))) {
            if(polygonOutlines) polygonOutlines.remove();
            for(i = 0; i < searchTraces.length; i++) {
                searchInfo = searchTraces[i];
                searchInfo._module.selectPoints(searchInfo, false);
            }

            updateSelectedState(gd, searchTraces);

            clearSelectionsCache(dragOptions);

            if(sendEvents) {
                gd.emit('plotly_deselect', null);
            }
        } else {
            subtract = evt.shiftKey &&
              (pointOrBinSelected !== undefined ?
                pointOrBinSelected :
                isPointOrBinSelected(clickedPtInfo));
            currentSelectionDef = newPointSelectionDef(clickedPtInfo.pointNumber, clickedPtInfo.searchInfo, subtract);

            var allSelectionDefs = dragOptions.selectionDefs.concat([currentSelectionDef]);
            selectionTester = multiTester(allSelectionDefs);

            for(i = 0; i < searchTraces.length; i++) {
                traceSelection = searchTraces[i]._module.selectPoints(searchTraces[i], selectionTester);
                thisTracesSelection = fillSelectionItem(traceSelection, searchTraces[i]);

                if(selection.length) {
                    for(var j = 0; j < thisTracesSelection.length; j++) {
                        selection.push(thisTracesSelection[j]);
                    }
                } else selection = thisTracesSelection;
            }

            eventData = {points: selection};
            updateSelectedState(gd, searchTraces, eventData);

            if(currentSelectionDef && dragOptions) {
                dragOptions.selectionDefs.push(currentSelectionDef);
            }

            if(polygonOutlines) {
                var polygons = dragOptions.mergedPolygons;
                var isOpenMode = openMode(dragOptions.dragmode);

                // display polygons on the screen
                displayOutlines(convertPoly(polygons, isOpenMode), polygonOutlines, dragOptions);
            }

            if(sendEvents) {
                gd.emit('plotly_selected', eventData);
            }
        }
    }
}

/**
 * Constructs a new point selection definition object.
 */
function newPointSelectionDef(pointNumber, searchInfo, subtract) {
    return {
        pointNumber: pointNumber,
        searchInfo: searchInfo,
        subtract: subtract
    };
}

function isPointSelectionDef(o) {
    return 'pointNumber' in o && 'searchInfo' in o;
}

/*
 * Constructs a new point number tester.
 */
function newPointNumTester(pointSelectionDef) {
    return {
        xmin: 0,
        xmax: 0,
        ymin: 0,
        ymax: 0,
        pts: [],
        contains: function(pt, omitFirstEdge, pointNumber, searchInfo) {
            var idxWantedTrace = pointSelectionDef.searchInfo.cd[0].trace._expandedIndex;
            var idxActualTrace = searchInfo.cd[0].trace._expandedIndex;
            return idxActualTrace === idxWantedTrace &&
              pointNumber === pointSelectionDef.pointNumber;
        },
        isRect: false,
        degenerate: false,
        subtract: pointSelectionDef.subtract
    };
}

/**
 * Wraps multiple selection testers.
 *
 * @param {Array} list - An array of selection testers.
 *
 * @return a selection tester object with a contains function
 * that can be called to evaluate a point against all wrapped
 * selection testers that were passed in list.
 */
function multiTester(list) {
    var testers = [];
    var xmin = isPointSelectionDef(list[0]) ? 0 : list[0][0][0];
    var xmax = xmin;
    var ymin = isPointSelectionDef(list[0]) ? 0 : list[0][0][1];
    var ymax = ymin;

    for(var i = 0; i < list.length; i++) {
        if(isPointSelectionDef(list[i])) {
            testers.push(newPointNumTester(list[i]));
        } else {
            var tester = polygon.tester(list[i]);
            tester.subtract = list[i].subtract;
            testers.push(tester);
            xmin = Math.min(xmin, tester.xmin);
            xmax = Math.max(xmax, tester.xmax);
            ymin = Math.min(ymin, tester.ymin);
            ymax = Math.max(ymax, tester.ymax);
        }
    }

    /**
     * Tests if the given point is within this tester.
     *
     * @param {Array} pt - [0] is the x coordinate, [1] is the y coordinate of the point.
     * @param {*} arg - An optional parameter to pass down to wrapped testers.
     * @param {number} pointNumber - The point number of the point within the underlying data array.
     * @param {number} searchInfo - An object identifying the trace the point is contained in.
     *
     * @return {boolean} true if point is considered to be selected, false otherwise.
     */
    function contains(pt, arg, pointNumber, searchInfo) {
        var contained = false;
        for(var i = 0; i < testers.length; i++) {
            if(testers[i].contains(pt, arg, pointNumber, searchInfo)) {
                // if contained by subtract tester - exclude the point
                contained = testers[i].subtract === false;
            }
        }

        return contained;
    }

    return {
        xmin: xmin,
        xmax: xmax,
        ymin: ymin,
        ymax: ymax,
        pts: [],
        contains: contains,
        isRect: false,
        degenerate: false
    };
}

function coerceSelectionsCache(evt, gd, dragOptions) {
    gd._fullLayout._drawing = false;

    var fullLayout = gd._fullLayout;
    var plotinfo = dragOptions.plotinfo;
    var dragmode = dragOptions.dragmode;

    var selectingOnSameSubplot = (
        fullLayout._lastSelectedSubplot &&
        fullLayout._lastSelectedSubplot === plotinfo.id
    );

    var hasModifierKey = (evt.shiftKey || evt.altKey) &&
        !(drawMode(dragmode) && openMode(dragmode));

    if(selectingOnSameSubplot && hasModifierKey &&
      (plotinfo.selection && plotinfo.selection.selectionDefs) && !dragOptions.selectionDefs) {
        // take over selection definitions from prev mode, if any
        dragOptions.selectionDefs = plotinfo.selection.selectionDefs;
        dragOptions.mergedPolygons = plotinfo.selection.mergedPolygons;
    } else if(!hasModifierKey || !plotinfo.selection) {
        clearSelectionsCache(dragOptions);
    }

    // clear selection outline when selecting a different subplot
    if(!selectingOnSameSubplot) {
        clearSelect(gd);
        fullLayout._lastSelectedSubplot = plotinfo.id;
    }
}

function clearSelectionsCache(dragOptions) {
    var dragmode = dragOptions.dragmode;
    var plotinfo = dragOptions.plotinfo;

    var gd = dragOptions.gd;
    if(gd._fullLayout._activeShapeIndex >= 0) {
        gd._fullLayout._deactivateShape(gd);
    }

    if(drawMode(dragmode)) {
        var fullLayout = gd._fullLayout;
        var zoomLayer = fullLayout._zoomlayer;

        var outlines = zoomLayer.selectAll('.select-outline-' + plotinfo.id);
        if(outlines && gd._fullLayout._drawing) {
            // add shape
            var shapes = newShapes(outlines, dragOptions);
            if(shapes) {
                Registry.call('_guiRelayout', gd, {
                    shapes: shapes
                });
            }

            gd._fullLayout._drawing = false;
        }
    }

    plotinfo.selection = {};
    plotinfo.selection.selectionDefs = dragOptions.selectionDefs = [];
    plotinfo.selection.mergedPolygons = dragOptions.mergedPolygons = [];
}

function determineSearchTraces(gd, xAxes, yAxes, subplot) {
    var searchTraces = [];
    var xAxisIds = xAxes.map(function(ax) { return ax._id; });
    var yAxisIds = yAxes.map(function(ax) { return ax._id; });
    var cd, trace, i;

    for(i = 0; i < gd.calcdata.length; i++) {
        cd = gd.calcdata[i];
        trace = cd[0].trace;

        if(trace.visible !== true || !trace._module || !trace._module.selectPoints) continue;

        if(subplot && (trace.subplot === subplot || trace.geo === subplot)) {
            searchTraces.push(createSearchInfo(trace._module, cd, xAxes[0], yAxes[0]));
        } else if(
          trace.type === 'splom' &&
          // FIXME: make sure we don't have more than single axis for splom
          trace._xaxes[xAxisIds[0]] && trace._yaxes[yAxisIds[0]]
        ) {
            var info = createSearchInfo(trace._module, cd, xAxes[0], yAxes[0]);
            info.scene = gd._fullLayout._splomScenes[trace.uid];
            searchTraces.push(info);
        } else if(
          trace.type === 'sankey'
        ) {
            var sankeyInfo = createSearchInfo(trace._module, cd, xAxes[0], yAxes[0]);
            searchTraces.push(sankeyInfo);
        } else {
            if(xAxisIds.indexOf(trace.xaxis) === -1) continue;
            if(yAxisIds.indexOf(trace.yaxis) === -1) continue;

            searchTraces.push(createSearchInfo(trace._module, cd,
              getFromId(gd, trace.xaxis), getFromId(gd, trace.yaxis)));
        }
    }

    return searchTraces;

    function createSearchInfo(module, calcData, xaxis, yaxis) {
        return {
            _module: module,
            cd: calcData,
            xaxis: xaxis,
            yaxis: yaxis
        };
    }
}

function isHoverDataSet(hoverData) {
    return hoverData &&
      Array.isArray(hoverData) &&
      hoverData[0].hoverOnBox !== true;
}

function extractClickedPtInfo(hoverData, searchTraces) {
    var hoverDatum = hoverData[0];
    var pointNumber = -1;
    var pointNumbers = [];
    var searchInfo, i;

    for(i = 0; i < searchTraces.length; i++) {
        searchInfo = searchTraces[i];
        if(hoverDatum.fullData._expandedIndex === searchInfo.cd[0].trace._expandedIndex) {
            // Special case for box (and violin)
            if(hoverDatum.hoverOnBox === true) {
                break;
            }

            // Hint: in some traces like histogram, one graphical element
            // doesn't correspond to one particular data point, but to
            // bins of data points. Thus, hoverDatum can have a binNumber
            // property instead of pointNumber.
            if(hoverDatum.pointNumber !== undefined) {
                pointNumber = hoverDatum.pointNumber;
            } else if(hoverDatum.binNumber !== undefined) {
                pointNumber = hoverDatum.binNumber;
                pointNumbers = hoverDatum.pointNumbers;
            }

            break;
        }
    }

    return {
        pointNumber: pointNumber,
        pointNumbers: pointNumbers,
        searchInfo: searchInfo
    };
}

function isPointOrBinSelected(clickedPtInfo) {
    var trace = clickedPtInfo.searchInfo.cd[0].trace;
    var ptNum = clickedPtInfo.pointNumber;
    var ptNums = clickedPtInfo.pointNumbers;
    var ptNumsSet = ptNums.length > 0;

    // When pointsNumbers is set (e.g. histogram's binning),
    // it is assumed that when the first point of
    // a bin is selected, all others are as well
    var ptNumToTest = ptNumsSet ? ptNums[0] : ptNum;

    // TODO potential performance improvement
    // Primarily we need this function to determine if a click adds
    // or subtracts from a selection.
    // In cases `trace.selectedpoints` is a huge array, indexOf
    // might be slow. One remedy would be to introduce a hash somewhere.
    return trace.selectedpoints ? trace.selectedpoints.indexOf(ptNumToTest) > -1 : false;
}

function isOnlyThisBinSelected(searchTraces, clickedPtInfo) {
    var tracesWithSelectedPts = [];
    var searchInfo, trace, isSameTrace, i;

    for(i = 0; i < searchTraces.length; i++) {
        searchInfo = searchTraces[i];
        if(searchInfo.cd[0].trace.selectedpoints && searchInfo.cd[0].trace.selectedpoints.length > 0) {
            tracesWithSelectedPts.push(searchInfo);
        }
    }

    if(tracesWithSelectedPts.length === 1) {
        isSameTrace = tracesWithSelectedPts[0] === clickedPtInfo.searchInfo;
        if(isSameTrace) {
            trace = clickedPtInfo.searchInfo.cd[0].trace;
            if(trace.selectedpoints.length === clickedPtInfo.pointNumbers.length) {
                for(i = 0; i < clickedPtInfo.pointNumbers.length; i++) {
                    if(trace.selectedpoints.indexOf(clickedPtInfo.pointNumbers[i]) < 0) {
                        return false;
                    }
                }
                return true;
            }
        }
    }

    return false;
}

function isOnlyOnePointSelected(searchTraces) {
    var len = 0;
    var searchInfo, trace, i;

    for(i = 0; i < searchTraces.length; i++) {
        searchInfo = searchTraces[i];
        trace = searchInfo.cd[0].trace;
        if(trace.selectedpoints) {
            if(trace.selectedpoints.length > 1) return false;

            len += trace.selectedpoints.length;
            if(len > 1) return false;
        }
    }

    return len === 1;
}

function updateSelectedState(gd, searchTraces, eventData) {
    var i, searchInfo, cd, trace;

    // before anything else, update preGUI if necessary
    for(i = 0; i < searchTraces.length; i++) {
        var fullInputTrace = searchTraces[i].cd[0].trace._fullInput;
        var tracePreGUI = gd._fullLayout._tracePreGUI[fullInputTrace.uid] || {};
        if(tracePreGUI.selectedpoints === undefined) {
            tracePreGUI.selectedpoints = fullInputTrace._input.selectedpoints || null;
        }
    }

    if(eventData) {
        var pts = eventData.points || [];

        for(i = 0; i < searchTraces.length; i++) {
            trace = searchTraces[i].cd[0].trace;
            trace._input.selectedpoints = trace._fullInput.selectedpoints = [];
            if(trace._fullInput !== trace) trace.selectedpoints = [];
        }

        for(i = 0; i < pts.length; i++) {
            var pt = pts[i];
            var data = pt.data;
            var fullData = pt.fullData;

            if(pt.pointIndices) {
                [].push.apply(data.selectedpoints, pt.pointIndices);
                if(trace._fullInput !== trace) {
                    [].push.apply(fullData.selectedpoints, pt.pointIndices);
                }
            } else {
                data.selectedpoints.push(pt.pointIndex);
                if(trace._fullInput !== trace) {
                    fullData.selectedpoints.push(pt.pointIndex);
                }
            }
        }
    } else {
        for(i = 0; i < searchTraces.length; i++) {
            trace = searchTraces[i].cd[0].trace;
            delete trace.selectedpoints;
            delete trace._input.selectedpoints;
            if(trace._fullInput !== trace) {
                delete trace._fullInput.selectedpoints;
            }
        }
    }

    var hasRegl = false;

    for(i = 0; i < searchTraces.length; i++) {
        searchInfo = searchTraces[i];
        cd = searchInfo.cd;
        trace = cd[0].trace;

        if(Registry.traceIs(trace, 'regl')) {
            hasRegl = true;
        }

        var _module = searchInfo._module;
        var fn = _module.styleOnSelect || _module.style;
        if(fn) {
            fn(gd, cd, cd[0].node3);
            if(cd[0].nodeRangePlot3) fn(gd, cd, cd[0].nodeRangePlot3);
        }
    }

    if(hasRegl) {
        clearGlCanvases(gd);
        redrawReglTraces(gd);
    }
}

function mergePolygons(list, poly, subtract) {
    var res;

    if(subtract) {
        res = polybool.difference({
            regions: list,
            inverted: false
        }, {
            regions: [poly],
            inverted: false
        });

        return res.regions;
    }

    res = polybool.union({
        regions: list,
        inverted: false
    }, {
        regions: [poly],
        inverted: false
    });

    return res.regions;
}

function fillSelectionItem(selection, searchInfo) {
    if(Array.isArray(selection)) {
        var cd = searchInfo.cd;
        var trace = searchInfo.cd[0].trace;

        for(var i = 0; i < selection.length; i++) {
            selection[i] = makeEventData(selection[i], trace, cd);
        }
    }

    return selection;
}

function convertPoly(polygonsIn, isOpenMode) { // add M and L command to draft positions
    var polygonsOut = [];
    for(var i = 0; i < polygonsIn.length; i++) {
        polygonsOut[i] = [];
        for(var j = 0; j < polygonsIn[i].length; j++) {
            polygonsOut[i][j] = [];
            polygonsOut[i][j][0] = j ? 'L' : 'M';
            for(var k = 0; k < polygonsIn[i][j].length; k++) {
                polygonsOut[i][j].push(
                    polygonsIn[i][j][k]
                );
            }
        }

        if(!isOpenMode) {
            polygonsOut[i].push([
                'Z',
                polygonsOut[i][0][1], // initial x
                polygonsOut[i][0][2]  // initial y
            ]);
        }
    }

    return polygonsOut;
}

module.exports = {
    prepSelect: prepSelect,
    clearSelect: clearSelect,
    clearSelectionsCache: clearSelectionsCache,
    selectOnClick: selectOnClick
};


/***/ }),

/***/ "./node_modules/polybooljs/index.js":
/*!******************************************!*\
  !*** ./node_modules/polybooljs/index.js ***!
  \******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/*
 * @copyright 2016 Sean Connelly (@voidqk), http://syntheti.cc
 * @license MIT
 * @preserve Project Home: https://github.com/voidqk/polybooljs
 */

var BuildLog = __webpack_require__(/*! ./lib/build-log */ "./node_modules/polybooljs/lib/build-log.js");
var Epsilon = __webpack_require__(/*! ./lib/epsilon */ "./node_modules/polybooljs/lib/epsilon.js");
var Intersecter = __webpack_require__(/*! ./lib/intersecter */ "./node_modules/polybooljs/lib/intersecter.js");
var SegmentChainer = __webpack_require__(/*! ./lib/segment-chainer */ "./node_modules/polybooljs/lib/segment-chainer.js");
var SegmentSelector = __webpack_require__(/*! ./lib/segment-selector */ "./node_modules/polybooljs/lib/segment-selector.js");
var GeoJSON = __webpack_require__(/*! ./lib/geojson */ "./node_modules/polybooljs/lib/geojson.js");

var buildLog = false;
var epsilon = Epsilon();

var PolyBool;
PolyBool = {
	// getter/setter for buildLog
	buildLog: function(bl){
		if (bl === true)
			buildLog = BuildLog();
		else if (bl === false)
			buildLog = false;
		return buildLog === false ? false : buildLog.list;
	},
	// getter/setter for epsilon
	epsilon: function(v){
		return epsilon.epsilon(v);
	},

	// core API
	segments: function(poly){
		var i = Intersecter(true, epsilon, buildLog);
		poly.regions.forEach(i.addRegion);
		return {
			segments: i.calculate(poly.inverted),
			inverted: poly.inverted
		};
	},
	combine: function(segments1, segments2){
		var i3 = Intersecter(false, epsilon, buildLog);
		return {
			combined: i3.calculate(
				segments1.segments, segments1.inverted,
				segments2.segments, segments2.inverted
			),
			inverted1: segments1.inverted,
			inverted2: segments2.inverted
		};
	},
	selectUnion: function(combined){
		return {
			segments: SegmentSelector.union(combined.combined, buildLog),
			inverted: combined.inverted1 || combined.inverted2
		}
	},
	selectIntersect: function(combined){
		return {
			segments: SegmentSelector.intersect(combined.combined, buildLog),
			inverted: combined.inverted1 && combined.inverted2
		}
	},
	selectDifference: function(combined){
		return {
			segments: SegmentSelector.difference(combined.combined, buildLog),
			inverted: combined.inverted1 && !combined.inverted2
		}
	},
	selectDifferenceRev: function(combined){
		return {
			segments: SegmentSelector.differenceRev(combined.combined, buildLog),
			inverted: !combined.inverted1 && combined.inverted2
		}
	},
	selectXor: function(combined){
		return {
			segments: SegmentSelector.xor(combined.combined, buildLog),
			inverted: combined.inverted1 !== combined.inverted2
		}
	},
	polygon: function(segments){
		return {
			regions: SegmentChainer(segments.segments, epsilon, buildLog),
			inverted: segments.inverted
		};
	},

	// GeoJSON converters
	polygonFromGeoJSON: function(geojson){
		return GeoJSON.toPolygon(PolyBool, geojson);
	},
	polygonToGeoJSON: function(poly){
		return GeoJSON.fromPolygon(PolyBool, epsilon, poly);
	},

	// helper functions for common operations
	union: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectUnion);
	},
	intersect: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectIntersect);
	},
	difference: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectDifference);
	},
	differenceRev: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectDifferenceRev);
	},
	xor: function(poly1, poly2){
		return operate(poly1, poly2, PolyBool.selectXor);
	}
};

function operate(poly1, poly2, selector){
	var seg1 = PolyBool.segments(poly1);
	var seg2 = PolyBool.segments(poly2);
	var comb = PolyBool.combine(seg1, seg2);
	var seg3 = selector(comb);
	return PolyBool.polygon(seg3);
}

if (typeof window === 'object')
	window.PolyBool = PolyBool;

module.exports = PolyBool;


/***/ }),

/***/ "./node_modules/polybooljs/lib/build-log.js":
/*!**************************************************!*\
  !*** ./node_modules/polybooljs/lib/build-log.js ***!
  \**************************************************/
/***/ ((module) => {

// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// used strictly for logging the processing of the algorithm... only useful if you intend on
// looking under the covers (for pretty UI's or debugging)
//

function BuildLog(){
	var my;
	var nextSegmentId = 0;
	var curVert = false;

	function push(type, data){
		my.list.push({
			type: type,
			data: data ? JSON.parse(JSON.stringify(data)) : void 0
		});
		return my;
	}

	my = {
		list: [],
		segmentId: function(){
			return nextSegmentId++;
		},
		checkIntersection: function(seg1, seg2){
			return push('check', { seg1: seg1, seg2: seg2 });
		},
		segmentChop: function(seg, end){
			push('div_seg', { seg: seg, pt: end });
			return push('chop', { seg: seg, pt: end });
		},
		statusRemove: function(seg){
			return push('pop_seg', { seg: seg });
		},
		segmentUpdate: function(seg){
			return push('seg_update', { seg: seg });
		},
		segmentNew: function(seg, primary){
			return push('new_seg', { seg: seg, primary: primary });
		},
		segmentRemove: function(seg){
			return push('rem_seg', { seg: seg });
		},
		tempStatus: function(seg, above, below){
			return push('temp_status', { seg: seg, above: above, below: below });
		},
		rewind: function(seg){
			return push('rewind', { seg: seg });
		},
		status: function(seg, above, below){
			return push('status', { seg: seg, above: above, below: below });
		},
		vert: function(x){
			if (x === curVert)
				return my;
			curVert = x;
			return push('vert', { x: x });
		},
		log: function(data){
			if (typeof data !== 'string')
				data = JSON.stringify(data, false, '  ');
			return push('log', { txt: data });
		},
		reset: function(){
			return push('reset');
		},
		selected: function(segs){
			return push('selected', { segs: segs });
		},
		chainStart: function(seg){
			return push('chain_start', { seg: seg });
		},
		chainRemoveHead: function(index, pt){
			return push('chain_rem_head', { index: index, pt: pt });
		},
		chainRemoveTail: function(index, pt){
			return push('chain_rem_tail', { index: index, pt: pt });
		},
		chainNew: function(pt1, pt2){
			return push('chain_new', { pt1: pt1, pt2: pt2 });
		},
		chainMatch: function(index){
			return push('chain_match', { index: index });
		},
		chainClose: function(index){
			return push('chain_close', { index: index });
		},
		chainAddHead: function(index, pt){
			return push('chain_add_head', { index: index, pt: pt });
		},
		chainAddTail: function(index, pt){
			return push('chain_add_tail', { index: index, pt: pt, });
		},
		chainConnect: function(index1, index2){
			return push('chain_con', { index1: index1, index2: index2 });
		},
		chainReverse: function(index){
			return push('chain_rev', { index: index });
		},
		chainJoin: function(index1, index2){
			return push('chain_join', { index1: index1, index2: index2 });
		},
		done: function(){
			return push('done');
		}
	};
	return my;
}

module.exports = BuildLog;


/***/ }),

/***/ "./node_modules/polybooljs/lib/epsilon.js":
/*!************************************************!*\
  !*** ./node_modules/polybooljs/lib/epsilon.js ***!
  \************************************************/
/***/ ((module) => {

// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// provides the raw computation functions that takes epsilon into account
//
// zero is defined to be between (-epsilon, epsilon) exclusive
//

function Epsilon(eps){
	if (typeof eps !== 'number')
		eps = 0.0000000001; // sane default? sure why not
	var my = {
		epsilon: function(v){
			if (typeof v === 'number')
				eps = v;
			return eps;
		},
		pointAboveOrOnLine: function(pt, left, right){
			var Ax = left[0];
			var Ay = left[1];
			var Bx = right[0];
			var By = right[1];
			var Cx = pt[0];
			var Cy = pt[1];
			return (Bx - Ax) * (Cy - Ay) - (By - Ay) * (Cx - Ax) >= -eps;
		},
		pointBetween: function(p, left, right){
			// p must be collinear with left->right
			// returns false if p == left, p == right, or left == right
			var d_py_ly = p[1] - left[1];
			var d_rx_lx = right[0] - left[0];
			var d_px_lx = p[0] - left[0];
			var d_ry_ly = right[1] - left[1];

			var dot = d_px_lx * d_rx_lx + d_py_ly * d_ry_ly;
			// if `dot` is 0, then `p` == `left` or `left` == `right` (reject)
			// if `dot` is less than 0, then `p` is to the left of `left` (reject)
			if (dot < eps)
				return false;

			var sqlen = d_rx_lx * d_rx_lx + d_ry_ly * d_ry_ly;
			// if `dot` > `sqlen`, then `p` is to the right of `right` (reject)
			// therefore, if `dot - sqlen` is greater than 0, then `p` is to the right of `right` (reject)
			if (dot - sqlen > -eps)
				return false;

			return true;
		},
		pointsSameX: function(p1, p2){
			return Math.abs(p1[0] - p2[0]) < eps;
		},
		pointsSameY: function(p1, p2){
			return Math.abs(p1[1] - p2[1]) < eps;
		},
		pointsSame: function(p1, p2){
			return my.pointsSameX(p1, p2) && my.pointsSameY(p1, p2);
		},
		pointsCompare: function(p1, p2){
			// returns -1 if p1 is smaller, 1 if p2 is smaller, 0 if equal
			if (my.pointsSameX(p1, p2))
				return my.pointsSameY(p1, p2) ? 0 : (p1[1] < p2[1] ? -1 : 1);
			return p1[0] < p2[0] ? -1 : 1;
		},
		pointsCollinear: function(pt1, pt2, pt3){
			// does pt1->pt2->pt3 make a straight line?
			// essentially this is just checking to see if the slope(pt1->pt2) === slope(pt2->pt3)
			// if slopes are equal, then they must be collinear, because they share pt2
			var dx1 = pt1[0] - pt2[0];
			var dy1 = pt1[1] - pt2[1];
			var dx2 = pt2[0] - pt3[0];
			var dy2 = pt2[1] - pt3[1];
			return Math.abs(dx1 * dy2 - dx2 * dy1) < eps;
		},
		linesIntersect: function(a0, a1, b0, b1){
			// returns false if the lines are coincident (e.g., parallel or on top of each other)
			//
			// returns an object if the lines intersect:
			//   {
			//     pt: [x, y],    where the intersection point is at
			//     alongA: where intersection point is along A,
			//     alongB: where intersection point is along B
			//   }
			//
			//  alongA and alongB will each be one of: -2, -1, 0, 1, 2
			//
			//  with the following meaning:
			//
			//    -2   intersection point is before segment's first point
			//    -1   intersection point is directly on segment's first point
			//     0   intersection point is between segment's first and second points (exclusive)
			//     1   intersection point is directly on segment's second point
			//     2   intersection point is after segment's second point
			var adx = a1[0] - a0[0];
			var ady = a1[1] - a0[1];
			var bdx = b1[0] - b0[0];
			var bdy = b1[1] - b0[1];

			var axb = adx * bdy - ady * bdx;
			if (Math.abs(axb) < eps)
				return false; // lines are coincident

			var dx = a0[0] - b0[0];
			var dy = a0[1] - b0[1];

			var A = (bdx * dy - bdy * dx) / axb;
			var B = (adx * dy - ady * dx) / axb;

			var ret = {
				alongA: 0,
				alongB: 0,
				pt: [
					a0[0] + A * adx,
					a0[1] + A * ady
				]
			};

			// categorize where intersection point is along A and B

			if (A <= -eps)
				ret.alongA = -2;
			else if (A < eps)
				ret.alongA = -1;
			else if (A - 1 <= -eps)
				ret.alongA = 0;
			else if (A - 1 < eps)
				ret.alongA = 1;
			else
				ret.alongA = 2;

			if (B <= -eps)
				ret.alongB = -2;
			else if (B < eps)
				ret.alongB = -1;
			else if (B - 1 <= -eps)
				ret.alongB = 0;
			else if (B - 1 < eps)
				ret.alongB = 1;
			else
				ret.alongB = 2;

			return ret;
		},
		pointInsideRegion: function(pt, region){
			var x = pt[0];
			var y = pt[1];
			var last_x = region[region.length - 1][0];
			var last_y = region[region.length - 1][1];
			var inside = false;
			for (var i = 0; i < region.length; i++){
				var curr_x = region[i][0];
				var curr_y = region[i][1];

				// if y is between curr_y and last_y, and
				// x is to the right of the boundary created by the line
				if ((curr_y - y > eps) != (last_y - y > eps) &&
					(last_x - curr_x) * (y - curr_y) / (last_y - curr_y) + curr_x - x > eps)
					inside = !inside

				last_x = curr_x;
				last_y = curr_y;
			}
			return inside;
		}
	};
	return my;
}

module.exports = Epsilon;


/***/ }),

/***/ "./node_modules/polybooljs/lib/geojson.js":
/*!************************************************!*\
  !*** ./node_modules/polybooljs/lib/geojson.js ***!
  \************************************************/
/***/ ((module) => {

// (c) Copyright 2017, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// convert between PolyBool polygon format and GeoJSON formats (Polygon and MultiPolygon)
//

var GeoJSON = {
	// convert a GeoJSON object to a PolyBool polygon
	toPolygon: function(PolyBool, geojson){

		// converts list of LineString's to segments
		function GeoPoly(coords){
			// check for empty coords
			if (coords.length <= 0)
				return PolyBool.segments({ inverted: false, regions: [] });

			// convert LineString to segments
			function LineString(ls){
				// remove tail which should be the same as head
				var reg = ls.slice(0, ls.length - 1);
				return PolyBool.segments({ inverted: false, regions: [reg] });
			}

			// the first LineString is considered the outside
			var out = LineString(coords[0]);

			// the rest of the LineStrings are considered interior holes, so subtract them from the
			// current result
			for (var i = 1; i < coords.length; i++)
				out = PolyBool.selectDifference(PolyBool.combine(out, LineString(coords[i])));

			return out;
		}

		if (geojson.type === 'Polygon'){
			// single polygon, so just convert it and we're done
			return PolyBool.polygon(GeoPoly(geojson.coordinates));
		}
		else if (geojson.type === 'MultiPolygon'){
			// multiple polygons, so union all the polygons together
			var out = PolyBool.segments({ inverted: false, regions: [] });
			for (var i = 0; i < geojson.coordinates.length; i++)
				out = PolyBool.selectUnion(PolyBool.combine(out, GeoPoly(geojson.coordinates[i])));
			return PolyBool.polygon(out);
		}
		throw new Error('PolyBool: Cannot convert GeoJSON object to PolyBool polygon');
	},

	// convert a PolyBool polygon to a GeoJSON object
	fromPolygon: function(PolyBool, eps, poly){
		// make sure out polygon is clean
		poly = PolyBool.polygon(PolyBool.segments(poly));

		// test if r1 is inside r2
		function regionInsideRegion(r1, r2){
			// we're guaranteed no lines intersect (because the polygon is clean), but a vertex
			// could be on the edge -- so we just average pt[0] and pt[1] to produce a point on the
			// edge of the first line, which cannot be on an edge
			return eps.pointInsideRegion([
				(r1[0][0] + r1[1][0]) * 0.5,
				(r1[0][1] + r1[1][1]) * 0.5
			], r2);
		}

		// calculate inside heirarchy
		//
		//  _____________________   _______    roots -> A       -> F
		// |          A          | |   F   |            |          |
		// |  _______   _______  | |  ___  |            +-- B      +-- G
		// | |   B   | |   C   | | | |   | |            |   |
		// | |  ___  | |  ___  | | | |   | |            |   +-- D
		// | | | D | | | | E | | | | | G | |            |
		// | | |___| | | |___| | | | |   | |            +-- C
		// | |_______| |_______| | | |___| |                |
		// |_____________________| |_______|                +-- E

		function newNode(region){
			return {
				region: region,
				children: []
			};
		}

		var roots = newNode(null);

		function addChild(root, region){
			// first check if we're inside any children
			for (var i = 0; i < root.children.length; i++){
				var child = root.children[i];
				if (regionInsideRegion(region, child.region)){
					// we are, so insert inside them instead
					addChild(child, region);
					return;
				}
			}

			// not inside any children, so check to see if any children are inside us
			var node = newNode(region);
			for (var i = 0; i < root.children.length; i++){
				var child = root.children[i];
				if (regionInsideRegion(child.region, region)){
					// oops... move the child beneath us, and remove them from root
					node.children.push(child);
					root.children.splice(i, 1);
					i--;
				}
			}

			// now we can add ourselves
			root.children.push(node);
		}

		// add all regions to the root
		for (var i = 0; i < poly.regions.length; i++){
			var region = poly.regions[i];
			if (region.length < 3) // regions must have at least 3 points (sanity check)
				continue;
			addChild(roots, region);
		}

		// with our heirarchy, we can distinguish between exterior borders, and interior holes
		// the root nodes are exterior, children are interior, children's children are exterior,
		// children's children's children are interior, etc

		// while we're at it, exteriors are counter-clockwise, and interiors are clockwise

		function forceWinding(region, clockwise){
			// first, see if we're clockwise or counter-clockwise
			// https://en.wikipedia.org/wiki/Shoelace_formula
			var winding = 0;
			var last_x = region[region.length - 1][0];
			var last_y = region[region.length - 1][1];
			var copy = [];
			for (var i = 0; i < region.length; i++){
				var curr_x = region[i][0];
				var curr_y = region[i][1];
				copy.push([curr_x, curr_y]); // create a copy while we're at it
				winding += curr_y * last_x - curr_x * last_y;
				last_x = curr_x;
				last_y = curr_y;
			}
			// this assumes Cartesian coordinates (Y is positive going up)
			var isclockwise = winding < 0;
			if (isclockwise !== clockwise)
				copy.reverse();
			// while we're here, the last point must be the first point...
			copy.push([copy[0][0], copy[0][1]]);
			return copy;
		}

		var geopolys = [];

		function addExterior(node){
			var poly = [forceWinding(node.region, false)];
			geopolys.push(poly);
			// children of exteriors are interior
			for (var i = 0; i < node.children.length; i++)
				poly.push(getInterior(node.children[i]));
		}

		function getInterior(node){
			// children of interiors are exterior
			for (var i = 0; i < node.children.length; i++)
				addExterior(node.children[i]);
			// return the clockwise interior
			return forceWinding(node.region, true);
		}

		// root nodes are exterior
		for (var i = 0; i < roots.children.length; i++)
			addExterior(roots.children[i]);

		// lastly, construct the approrpriate GeoJSON object

		if (geopolys.length <= 0) // empty GeoJSON Polygon
			return { type: 'Polygon', coordinates: [] };
		if (geopolys.length == 1) // use a GeoJSON Polygon
			return { type: 'Polygon', coordinates: geopolys[0] };
		return { // otherwise, use a GeoJSON MultiPolygon
			type: 'MultiPolygon',
			coordinates: geopolys
		};
	}
};

module.exports = GeoJSON;


/***/ }),

/***/ "./node_modules/polybooljs/lib/intersecter.js":
/*!****************************************************!*\
  !*** ./node_modules/polybooljs/lib/intersecter.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// this is the core work-horse
//

var LinkedList = __webpack_require__(/*! ./linked-list */ "./node_modules/polybooljs/lib/linked-list.js");

function Intersecter(selfIntersection, eps, buildLog){
	// selfIntersection is true/false depending on the phase of the overall algorithm

	//
	// segment creation
	//

	function segmentNew(start, end){
		return {
			id: buildLog ? buildLog.segmentId() : -1,
			start: start,
			end: end,
			myFill: {
				above: null, // is there fill above us?
				below: null  // is there fill below us?
			},
			otherFill: null
		};
	}

	function segmentCopy(start, end, seg){
		return {
			id: buildLog ? buildLog.segmentId() : -1,
			start: start,
			end: end,
			myFill: {
				above: seg.myFill.above,
				below: seg.myFill.below
			},
			otherFill: null
		};
	}

	//
	// event logic
	//

	var event_root = LinkedList.create();

	function eventCompare(p1_isStart, p1_1, p1_2, p2_isStart, p2_1, p2_2){
		// compare the selected points first
		var comp = eps.pointsCompare(p1_1, p2_1);
		if (comp !== 0)
			return comp;
		// the selected points are the same

		if (eps.pointsSame(p1_2, p2_2)) // if the non-selected points are the same too...
			return 0; // then the segments are equal

		if (p1_isStart !== p2_isStart) // if one is a start and the other isn't...
			return p1_isStart ? 1 : -1; // favor the one that isn't the start

		// otherwise, we'll have to calculate which one is below the other manually
		return eps.pointAboveOrOnLine(p1_2,
			p2_isStart ? p2_1 : p2_2, // order matters
			p2_isStart ? p2_2 : p2_1
		) ? 1 : -1;
	}

	function eventAdd(ev, other_pt){
		event_root.insertBefore(ev, function(here){
			// should ev be inserted before here?
			var comp = eventCompare(
				ev  .isStart, ev  .pt,      other_pt,
				here.isStart, here.pt, here.other.pt
			);
			return comp < 0;
		});
	}

	function eventAddSegmentStart(seg, primary){
		var ev_start = LinkedList.node({
			isStart: true,
			pt: seg.start,
			seg: seg,
			primary: primary,
			other: null,
			status: null
		});
		eventAdd(ev_start, seg.end);
		return ev_start;
	}

	function eventAddSegmentEnd(ev_start, seg, primary){
		var ev_end = LinkedList.node({
			isStart: false,
			pt: seg.end,
			seg: seg,
			primary: primary,
			other: ev_start,
			status: null
		});
		ev_start.other = ev_end;
		eventAdd(ev_end, ev_start.pt);
	}

	function eventAddSegment(seg, primary){
		var ev_start = eventAddSegmentStart(seg, primary);
		eventAddSegmentEnd(ev_start, seg, primary);
		return ev_start;
	}

	function eventUpdateEnd(ev, end){
		// slides an end backwards
		//   (start)------------(end)    to:
		//   (start)---(end)

		if (buildLog)
			buildLog.segmentChop(ev.seg, end);

		ev.other.remove();
		ev.seg.end = end;
		ev.other.pt = end;
		eventAdd(ev.other, ev.pt);
	}

	function eventDivide(ev, pt){
		var ns = segmentCopy(pt, ev.seg.end, ev.seg);
		eventUpdateEnd(ev, pt);
		return eventAddSegment(ns, ev.primary);
	}

	function calculate(primaryPolyInverted, secondaryPolyInverted){
		// if selfIntersection is true then there is no secondary polygon, so that isn't used

		//
		// status logic
		//

		var status_root = LinkedList.create();

		function statusCompare(ev1, ev2){
			var a1 = ev1.seg.start;
			var a2 = ev1.seg.end;
			var b1 = ev2.seg.start;
			var b2 = ev2.seg.end;

			if (eps.pointsCollinear(a1, b1, b2)){
				if (eps.pointsCollinear(a2, b1, b2))
					return 1;//eventCompare(true, a1, a2, true, b1, b2);
				return eps.pointAboveOrOnLine(a2, b1, b2) ? 1 : -1;
			}
			return eps.pointAboveOrOnLine(a1, b1, b2) ? 1 : -1;
		}

		function statusFindSurrounding(ev){
			return status_root.findTransition(function(here){
				var comp = statusCompare(ev, here.ev);
				return comp > 0;
			});
		}

		function checkIntersection(ev1, ev2){
			// returns the segment equal to ev1, or false if nothing equal

			var seg1 = ev1.seg;
			var seg2 = ev2.seg;
			var a1 = seg1.start;
			var a2 = seg1.end;
			var b1 = seg2.start;
			var b2 = seg2.end;

			if (buildLog)
				buildLog.checkIntersection(seg1, seg2);

			var i = eps.linesIntersect(a1, a2, b1, b2);

			if (i === false){
				// segments are parallel or coincident

				// if points aren't collinear, then the segments are parallel, so no intersections
				if (!eps.pointsCollinear(a1, a2, b1))
					return false;
				// otherwise, segments are on top of each other somehow (aka coincident)

				if (eps.pointsSame(a1, b2) || eps.pointsSame(a2, b1))
					return false; // segments touch at endpoints... no intersection

				var a1_equ_b1 = eps.pointsSame(a1, b1);
				var a2_equ_b2 = eps.pointsSame(a2, b2);

				if (a1_equ_b1 && a2_equ_b2)
					return ev2; // segments are exactly equal

				var a1_between = !a1_equ_b1 && eps.pointBetween(a1, b1, b2);
				var a2_between = !a2_equ_b2 && eps.pointBetween(a2, b1, b2);

				// handy for debugging:
				// buildLog.log({
				//	a1_equ_b1: a1_equ_b1,
				//	a2_equ_b2: a2_equ_b2,
				//	a1_between: a1_between,
				//	a2_between: a2_between
				// });

				if (a1_equ_b1){
					if (a2_between){
						//  (a1)---(a2)
						//  (b1)----------(b2)
						eventDivide(ev2, a2);
					}
					else{
						//  (a1)----------(a2)
						//  (b1)---(b2)
						eventDivide(ev1, b2);
					}
					return ev2;
				}
				else if (a1_between){
					if (!a2_equ_b2){
						// make a2 equal to b2
						if (a2_between){
							//         (a1)---(a2)
							//  (b1)-----------------(b2)
							eventDivide(ev2, a2);
						}
						else{
							//         (a1)----------(a2)
							//  (b1)----------(b2)
							eventDivide(ev1, b2);
						}
					}

					//         (a1)---(a2)
					//  (b1)----------(b2)
					eventDivide(ev2, a1);
				}
			}
			else{
				// otherwise, lines intersect at i.pt, which may or may not be between the endpoints

				// is A divided between its endpoints? (exclusive)
				if (i.alongA === 0){
					if (i.alongB === -1) // yes, at exactly b1
						eventDivide(ev1, b1);
					else if (i.alongB === 0) // yes, somewhere between B's endpoints
						eventDivide(ev1, i.pt);
					else if (i.alongB === 1) // yes, at exactly b2
						eventDivide(ev1, b2);
				}

				// is B divided between its endpoints? (exclusive)
				if (i.alongB === 0){
					if (i.alongA === -1) // yes, at exactly a1
						eventDivide(ev2, a1);
					else if (i.alongA === 0) // yes, somewhere between A's endpoints (exclusive)
						eventDivide(ev2, i.pt);
					else if (i.alongA === 1) // yes, at exactly a2
						eventDivide(ev2, a2);
				}
			}
			return false;
		}

		//
		// main event loop
		//
		var segments = [];
		while (!event_root.isEmpty()){
			var ev = event_root.getHead();

			if (buildLog)
				buildLog.vert(ev.pt[0]);

			if (ev.isStart){

				if (buildLog)
					buildLog.segmentNew(ev.seg, ev.primary);

				var surrounding = statusFindSurrounding(ev);
				var above = surrounding.before ? surrounding.before.ev : null;
				var below = surrounding.after ? surrounding.after.ev : null;

				if (buildLog){
					buildLog.tempStatus(
						ev.seg,
						above ? above.seg : false,
						below ? below.seg : false
					);
				}

				function checkBothIntersections(){
					if (above){
						var eve = checkIntersection(ev, above);
						if (eve)
							return eve;
					}
					if (below)
						return checkIntersection(ev, below);
					return false;
				}

				var eve = checkBothIntersections();
				if (eve){
					// ev and eve are equal
					// we'll keep eve and throw away ev

					// merge ev.seg's fill information into eve.seg

					if (selfIntersection){
						var toggle; // are we a toggling edge?
						if (ev.seg.myFill.below === null)
							toggle = true;
						else
							toggle = ev.seg.myFill.above !== ev.seg.myFill.below;

						// merge two segments that belong to the same polygon
						// think of this as sandwiching two segments together, where `eve.seg` is
						// the bottom -- this will cause the above fill flag to toggle
						if (toggle)
							eve.seg.myFill.above = !eve.seg.myFill.above;
					}
					else{
						// merge two segments that belong to different polygons
						// each segment has distinct knowledge, so no special logic is needed
						// note that this can only happen once per segment in this phase, because we
						// are guaranteed that all self-intersections are gone
						eve.seg.otherFill = ev.seg.myFill;
					}

					if (buildLog)
						buildLog.segmentUpdate(eve.seg);

					ev.other.remove();
					ev.remove();
				}

				if (event_root.getHead() !== ev){
					// something was inserted before us in the event queue, so loop back around and
					// process it before continuing
					if (buildLog)
						buildLog.rewind(ev.seg);
					continue;
				}

				//
				// calculate fill flags
				//
				if (selfIntersection){
					var toggle; // are we a toggling edge?
					if (ev.seg.myFill.below === null) // if we are a new segment...
						toggle = true; // then we toggle
					else // we are a segment that has previous knowledge from a division
						toggle = ev.seg.myFill.above !== ev.seg.myFill.below; // calculate toggle

					// next, calculate whether we are filled below us
					if (!below){ // if nothing is below us...
						// we are filled below us if the polygon is inverted
						ev.seg.myFill.below = primaryPolyInverted;
					}
					else{
						// otherwise, we know the answer -- it's the same if whatever is below
						// us is filled above it
						ev.seg.myFill.below = below.seg.myFill.above;
					}

					// since now we know if we're filled below us, we can calculate whether
					// we're filled above us by applying toggle to whatever is below us
					if (toggle)
						ev.seg.myFill.above = !ev.seg.myFill.below;
					else
						ev.seg.myFill.above = ev.seg.myFill.below;
				}
				else{
					// now we fill in any missing transition information, since we are all-knowing
					// at this point

					if (ev.seg.otherFill === null){
						// if we don't have other information, then we need to figure out if we're
						// inside the other polygon
						var inside;
						if (!below){
							// if nothing is below us, then we're inside if the other polygon is
							// inverted
							inside =
								ev.primary ? secondaryPolyInverted : primaryPolyInverted;
						}
						else{ // otherwise, something is below us
							// so copy the below segment's other polygon's above
							if (ev.primary === below.primary)
								inside = below.seg.otherFill.above;
							else
								inside = below.seg.myFill.above;
						}
						ev.seg.otherFill = {
							above: inside,
							below: inside
						};
					}
				}

				if (buildLog){
					buildLog.status(
						ev.seg,
						above ? above.seg : false,
						below ? below.seg : false
					);
				}

				// insert the status and remember it for later removal
				ev.other.status = surrounding.insert(LinkedList.node({ ev: ev }));
			}
			else{
				var st = ev.status;

				if (st === null){
					throw new Error('PolyBool: Zero-length segment detected; your epsilon is ' +
						'probably too small or too large');
				}

				// removing the status will create two new adjacent edges, so we'll need to check
				// for those
				if (status_root.exists(st.prev) && status_root.exists(st.next))
					checkIntersection(st.prev.ev, st.next.ev);

				if (buildLog)
					buildLog.statusRemove(st.ev.seg);

				// remove the status
				st.remove();

				// if we've reached this point, we've calculated everything there is to know, so
				// save the segment for reporting
				if (!ev.primary){
					// make sure `seg.myFill` actually points to the primary polygon though
					var s = ev.seg.myFill;
					ev.seg.myFill = ev.seg.otherFill;
					ev.seg.otherFill = s;
				}
				segments.push(ev.seg);
			}

			// remove the event and continue
			event_root.getHead().remove();
		}

		if (buildLog)
			buildLog.done();

		return segments;
	}

	// return the appropriate API depending on what we're doing
	if (!selfIntersection){
		// performing combination of polygons, so only deal with already-processed segments
		return {
			calculate: function(segments1, inverted1, segments2, inverted2){
				// segmentsX come from the self-intersection API, or this API
				// invertedX is whether we treat that list of segments as an inverted polygon or not
				// returns segments that can be used for further operations
				segments1.forEach(function(seg){
					eventAddSegment(segmentCopy(seg.start, seg.end, seg), true);
				});
				segments2.forEach(function(seg){
					eventAddSegment(segmentCopy(seg.start, seg.end, seg), false);
				});
				return calculate(inverted1, inverted2);
			}
		};
	}

	// otherwise, performing self-intersection, so deal with regions
	return {
		addRegion: function(region){
			// regions are a list of points:
			//  [ [0, 0], [100, 0], [50, 100] ]
			// you can add multiple regions before running calculate
			var pt1;
			var pt2 = region[region.length - 1];
			for (var i = 0; i < region.length; i++){
				pt1 = pt2;
				pt2 = region[i];

				var forward = eps.pointsCompare(pt1, pt2);
				if (forward === 0) // points are equal, so we have a zero-length segment
					continue; // just skip it

				eventAddSegment(
					segmentNew(
						forward < 0 ? pt1 : pt2,
						forward < 0 ? pt2 : pt1
					),
					true
				);
			}
		},
		calculate: function(inverted){
			// is the polygon inverted?
			// returns segments
			return calculate(inverted, false);
		}
	};
}

module.exports = Intersecter;


/***/ }),

/***/ "./node_modules/polybooljs/lib/linked-list.js":
/*!****************************************************!*\
  !*** ./node_modules/polybooljs/lib/linked-list.js ***!
  \****************************************************/
/***/ ((module) => {

// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// simple linked list implementation that allows you to traverse down nodes and save positions
//

var LinkedList = {
	create: function(){
		var my = {
			root: { root: true, next: null },
			exists: function(node){
				if (node === null || node === my.root)
					return false;
				return true;
			},
			isEmpty: function(){
				return my.root.next === null;
			},
			getHead: function(){
				return my.root.next;
			},
			insertBefore: function(node, check){
				var last = my.root;
				var here = my.root.next;
				while (here !== null){
					if (check(here)){
						node.prev = here.prev;
						node.next = here;
						here.prev.next = node;
						here.prev = node;
						return;
					}
					last = here;
					here = here.next;
				}
				last.next = node;
				node.prev = last;
				node.next = null;
			},
			findTransition: function(check){
				var prev = my.root;
				var here = my.root.next;
				while (here !== null){
					if (check(here))
						break;
					prev = here;
					here = here.next;
				}
				return {
					before: prev === my.root ? null : prev,
					after: here,
					insert: function(node){
						node.prev = prev;
						node.next = here;
						prev.next = node;
						if (here !== null)
							here.prev = node;
						return node;
					}
				};
			}
		};
		return my;
	},
	node: function(data){
		data.prev = null;
		data.next = null;
		data.remove = function(){
			data.prev.next = data.next;
			if (data.next)
				data.next.prev = data.prev;
			data.prev = null;
			data.next = null;
		};
		return data;
	}
};

module.exports = LinkedList;


/***/ }),

/***/ "./node_modules/polybooljs/lib/segment-chainer.js":
/*!********************************************************!*\
  !*** ./node_modules/polybooljs/lib/segment-chainer.js ***!
  \********************************************************/
/***/ ((module) => {

// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// converts a list of segments into a list of regions, while also removing unnecessary verticies
//

function SegmentChainer(segments, eps, buildLog){
	var chains = [];
	var regions = [];

	segments.forEach(function(seg){
		var pt1 = seg.start;
		var pt2 = seg.end;
		if (eps.pointsSame(pt1, pt2)){
			console.warn('PolyBool: Warning: Zero-length segment detected; your epsilon is ' +
				'probably too small or too large');
			return;
		}

		if (buildLog)
			buildLog.chainStart(seg);

		// search for two chains that this segment matches
		var first_match = {
			index: 0,
			matches_head: false,
			matches_pt1: false
		};
		var second_match = {
			index: 0,
			matches_head: false,
			matches_pt1: false
		};
		var next_match = first_match;
		function setMatch(index, matches_head, matches_pt1){
			// return true if we've matched twice
			next_match.index = index;
			next_match.matches_head = matches_head;
			next_match.matches_pt1 = matches_pt1;
			if (next_match === first_match){
				next_match = second_match;
				return false;
			}
			next_match = null;
			return true; // we've matched twice, we're done here
		}
		for (var i = 0; i < chains.length; i++){
			var chain = chains[i];
			var head  = chain[0];
			var head2 = chain[1];
			var tail  = chain[chain.length - 1];
			var tail2 = chain[chain.length - 2];
			if (eps.pointsSame(head, pt1)){
				if (setMatch(i, true, true))
					break;
			}
			else if (eps.pointsSame(head, pt2)){
				if (setMatch(i, true, false))
					break;
			}
			else if (eps.pointsSame(tail, pt1)){
				if (setMatch(i, false, true))
					break;
			}
			else if (eps.pointsSame(tail, pt2)){
				if (setMatch(i, false, false))
					break;
			}
		}

		if (next_match === first_match){
			// we didn't match anything, so create a new chain
			chains.push([ pt1, pt2 ]);
			if (buildLog)
				buildLog.chainNew(pt1, pt2);
			return;
		}

		if (next_match === second_match){
			// we matched a single chain

			if (buildLog)
				buildLog.chainMatch(first_match.index);

			// add the other point to the apporpriate end, and check to see if we've closed the
			// chain into a loop

			var index = first_match.index;
			var pt = first_match.matches_pt1 ? pt2 : pt1; // if we matched pt1, then we add pt2, etc
			var addToHead = first_match.matches_head; // if we matched at head, then add to the head

			var chain = chains[index];
			var grow  = addToHead ? chain[0] : chain[chain.length - 1];
			var grow2 = addToHead ? chain[1] : chain[chain.length - 2];
			var oppo  = addToHead ? chain[chain.length - 1] : chain[0];
			var oppo2 = addToHead ? chain[chain.length - 2] : chain[1];

			if (eps.pointsCollinear(grow2, grow, pt)){
				// grow isn't needed because it's directly between grow2 and pt:
				// grow2 ---grow---> pt
				if (addToHead){
					if (buildLog)
						buildLog.chainRemoveHead(first_match.index, pt);
					chain.shift();
				}
				else{
					if (buildLog)
						buildLog.chainRemoveTail(first_match.index, pt);
					chain.pop();
				}
				grow = grow2; // old grow is gone... new grow is what grow2 was
			}

			if (eps.pointsSame(oppo, pt)){
				// we're closing the loop, so remove chain from chains
				chains.splice(index, 1);

				if (eps.pointsCollinear(oppo2, oppo, grow)){
					// oppo isn't needed because it's directly between oppo2 and grow:
					// oppo2 ---oppo--->grow
					if (addToHead){
						if (buildLog)
							buildLog.chainRemoveTail(first_match.index, grow);
						chain.pop();
					}
					else{
						if (buildLog)
							buildLog.chainRemoveHead(first_match.index, grow);
						chain.shift();
					}
				}

				if (buildLog)
					buildLog.chainClose(first_match.index);

				// we have a closed chain!
				regions.push(chain);
				return;
			}

			// not closing a loop, so just add it to the apporpriate side
			if (addToHead){
				if (buildLog)
					buildLog.chainAddHead(first_match.index, pt);
				chain.unshift(pt);
			}
			else{
				if (buildLog)
					buildLog.chainAddTail(first_match.index, pt);
				chain.push(pt);
			}
			return;
		}

		// otherwise, we matched two chains, so we need to combine those chains together

		function reverseChain(index){
			if (buildLog)
				buildLog.chainReverse(index);
			chains[index].reverse(); // gee, that's easy
		}

		function appendChain(index1, index2){
			// index1 gets index2 appended to it, and index2 is removed
			var chain1 = chains[index1];
			var chain2 = chains[index2];
			var tail  = chain1[chain1.length - 1];
			var tail2 = chain1[chain1.length - 2];
			var head  = chain2[0];
			var head2 = chain2[1];

			if (eps.pointsCollinear(tail2, tail, head)){
				// tail isn't needed because it's directly between tail2 and head
				// tail2 ---tail---> head
				if (buildLog)
					buildLog.chainRemoveTail(index1, tail);
				chain1.pop();
				tail = tail2; // old tail is gone... new tail is what tail2 was
			}

			if (eps.pointsCollinear(tail, head, head2)){
				// head isn't needed because it's directly between tail and head2
				// tail ---head---> head2
				if (buildLog)
					buildLog.chainRemoveHead(index2, head);
				chain2.shift();
			}

			if (buildLog)
				buildLog.chainJoin(index1, index2);
			chains[index1] = chain1.concat(chain2);
			chains.splice(index2, 1);
		}

		var F = first_match.index;
		var S = second_match.index;

		if (buildLog)
			buildLog.chainConnect(F, S);

		var reverseF = chains[F].length < chains[S].length; // reverse the shorter chain, if needed
		if (first_match.matches_head){
			if (second_match.matches_head){
				if (reverseF){
					// <<<< F <<<< --- >>>> S >>>>
					reverseChain(F);
					// >>>> F >>>> --- >>>> S >>>>
					appendChain(F, S);
				}
				else{
					// <<<< F <<<< --- >>>> S >>>>
					reverseChain(S);
					// <<<< F <<<< --- <<<< S <<<<   logically same as:
					// >>>> S >>>> --- >>>> F >>>>
					appendChain(S, F);
				}
			}
			else{
				// <<<< F <<<< --- <<<< S <<<<   logically same as:
				// >>>> S >>>> --- >>>> F >>>>
				appendChain(S, F);
			}
		}
		else{
			if (second_match.matches_head){
				// >>>> F >>>> --- >>>> S >>>>
				appendChain(F, S);
			}
			else{
				if (reverseF){
					// >>>> F >>>> --- <<<< S <<<<
					reverseChain(F);
					// <<<< F <<<< --- <<<< S <<<<   logically same as:
					// >>>> S >>>> --- >>>> F >>>>
					appendChain(S, F);
				}
				else{
					// >>>> F >>>> --- <<<< S <<<<
					reverseChain(S);
					// >>>> F >>>> --- >>>> S >>>>
					appendChain(F, S);
				}
			}
		}
	});

	return regions;
}

module.exports = SegmentChainer;


/***/ }),

/***/ "./node_modules/polybooljs/lib/segment-selector.js":
/*!*********************************************************!*\
  !*** ./node_modules/polybooljs/lib/segment-selector.js ***!
  \*********************************************************/
/***/ ((module) => {

// (c) Copyright 2016, Sean Connelly (@voidqk), http://syntheti.cc
// MIT License
// Project Home: https://github.com/voidqk/polybooljs

//
// filter a list of segments based on boolean operations
//

function select(segments, selection, buildLog){
	var result = [];
	segments.forEach(function(seg){
		var index =
			(seg.myFill.above ? 8 : 0) +
			(seg.myFill.below ? 4 : 0) +
			((seg.otherFill && seg.otherFill.above) ? 2 : 0) +
			((seg.otherFill && seg.otherFill.below) ? 1 : 0);
		if (selection[index] !== 0){
			// copy the segment to the results, while also calculating the fill status
			result.push({
				id: buildLog ? buildLog.segmentId() : -1,
				start: seg.start,
				end: seg.end,
				myFill: {
					above: selection[index] === 1, // 1 if filled above
					below: selection[index] === 2  // 2 if filled below
				},
				otherFill: null
			});
		}
	});

	if (buildLog)
		buildLog.selected(result);

	return result;
}

var SegmentSelector = {
	union: function(segments, buildLog){ // primary | secondary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   yes filled below    2
		//    0      0      1      0   =>   yes filled above    1
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   yes filled below    2
		//    0      1      0      1   =>   yes filled below    2
		//    0      1      1      0   =>   no                  0
		//    0      1      1      1   =>   no                  0
		//    1      0      0      0   =>   yes filled above    1
		//    1      0      0      1   =>   no                  0
		//    1      0      1      0   =>   yes filled above    1
		//    1      0      1      1   =>   no                  0
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   no                  0
		//    1      1      1      0   =>   no                  0
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 2, 1, 0,
			2, 2, 0, 0,
			1, 0, 1, 0,
			0, 0, 0, 0
		], buildLog);
	},
	intersect: function(segments, buildLog){ // primary & secondary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   no                  0
		//    0      0      1      0   =>   no                  0
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   no                  0
		//    0      1      0      1   =>   yes filled below    2
		//    0      1      1      0   =>   no                  0
		//    0      1      1      1   =>   yes filled below    2
		//    1      0      0      0   =>   no                  0
		//    1      0      0      1   =>   no                  0
		//    1      0      1      0   =>   yes filled above    1
		//    1      0      1      1   =>   yes filled above    1
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   yes filled below    2
		//    1      1      1      0   =>   yes filled above    1
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 0, 0, 0,
			0, 2, 0, 2,
			0, 0, 1, 1,
			0, 2, 1, 0
		], buildLog);
	},
	difference: function(segments, buildLog){ // primary - secondary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   no                  0
		//    0      0      1      0   =>   no                  0
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   yes filled below    2
		//    0      1      0      1   =>   no                  0
		//    0      1      1      0   =>   yes filled below    2
		//    0      1      1      1   =>   no                  0
		//    1      0      0      0   =>   yes filled above    1
		//    1      0      0      1   =>   yes filled above    1
		//    1      0      1      0   =>   no                  0
		//    1      0      1      1   =>   no                  0
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   yes filled above    1
		//    1      1      1      0   =>   yes filled below    2
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 0, 0, 0,
			2, 0, 2, 0,
			1, 1, 0, 0,
			0, 1, 2, 0
		], buildLog);
	},
	differenceRev: function(segments, buildLog){ // secondary - primary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   yes filled below    2
		//    0      0      1      0   =>   yes filled above    1
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   no                  0
		//    0      1      0      1   =>   no                  0
		//    0      1      1      0   =>   yes filled above    1
		//    0      1      1      1   =>   yes filled above    1
		//    1      0      0      0   =>   no                  0
		//    1      0      0      1   =>   yes filled below    2
		//    1      0      1      0   =>   no                  0
		//    1      0      1      1   =>   yes filled below    2
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   no                  0
		//    1      1      1      0   =>   no                  0
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 2, 1, 0,
			0, 0, 1, 1,
			0, 2, 0, 2,
			0, 0, 0, 0
		], buildLog);
	},
	xor: function(segments, buildLog){ // primary ^ secondary
		// above1 below1 above2 below2    Keep?               Value
		//    0      0      0      0   =>   no                  0
		//    0      0      0      1   =>   yes filled below    2
		//    0      0      1      0   =>   yes filled above    1
		//    0      0      1      1   =>   no                  0
		//    0      1      0      0   =>   yes filled below    2
		//    0      1      0      1   =>   no                  0
		//    0      1      1      0   =>   no                  0
		//    0      1      1      1   =>   yes filled above    1
		//    1      0      0      0   =>   yes filled above    1
		//    1      0      0      1   =>   no                  0
		//    1      0      1      0   =>   no                  0
		//    1      0      1      1   =>   yes filled below    2
		//    1      1      0      0   =>   no                  0
		//    1      1      0      1   =>   yes filled above    1
		//    1      1      1      0   =>   yes filled below    2
		//    1      1      1      1   =>   no                  0
		return select(segments, [
			0, 2, 1, 0,
			2, 0, 0, 1,
			1, 0, 0, 2,
			0, 1, 2, 0
		], buildLog);
	}
};

module.exports = SegmentSelector;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29tcG9uZW50cy9tb2RlYmFyL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL21vZGViYXIvbWFuYWdlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9jb21wb25lbnRzL21vZGViYXIvbW9kZWJhci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvbGliL2NsZWFyX2dsX2NhbnZhc2VzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9saWIvcG9seWdvbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdF9hcGkvc3Vicm91dGluZXMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2NhcnRlc2lhbi9jb25zdHJhaW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL3NjYWxlX3pvb20uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2NhcnRlc2lhbi9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wb2x5Ym9vbGpzL2luZGV4LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcG9seWJvb2xqcy9saWIvYnVpbGQtbG9nLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcG9seWJvb2xqcy9saWIvZXBzaWxvbi5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3BvbHlib29sanMvbGliL2dlb2pzb24uanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wb2x5Ym9vbGpzL2xpYi9pbnRlcnNlY3Rlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3BvbHlib29sanMvbGliL2xpbmtlZC1saXN0LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcG9seWJvb2xqcy9saWIvc2VnbWVudC1jaGFpbmVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcG9seWJvb2xqcy9saWIvc2VnbWVudC1zZWxlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR2E7O0FBRWIsaUhBQW9DOzs7Ozs7Ozs7Ozs7QUNYcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLGNBQWMsbUJBQU8sQ0FBQyxnR0FBZ0M7QUFDdEQsc0JBQXNCLG1CQUFPLENBQUMsOEZBQStCO0FBQzdELGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDdkMscUJBQXFCLGdIQUF1Qzs7QUFFNUQsb0JBQW9CLG1CQUFPLENBQUMsNkVBQVc7QUFDdkMscUJBQXFCLG1CQUFPLENBQUMsNkVBQVc7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FB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QTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNB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QTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxjQUFjLDBCQUEwQjtBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0IsbUJBQW1CO0FBQ3JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxxQkFBcUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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LG1FQUFlOztBQUV4QztBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBWTs7QUFFWjtBQUNBLDhCQUE4Qjs7QUFFOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esa0JBQWtCOztBQUVsQjtBQUNBOztBQUVBO0FBQ0EsZ0JBQWdCOztBQUVoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVE7O0FBRVI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQSwyREFBMkQ7O0FBRTNEO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMERBQTBELFNBQVM7QUFDbkU7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkRBQTZEO0FBQzdEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLG1CQUFtQjtBQUNyQztBQUNBOztBQUVBO0FBQ0E7QUFDQSxjQUFjOztBQUVkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7O0FDeGZBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVSx5QkFBeUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRUFBRTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7OztBQ2hGQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRTtBQUNqRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBLGlCQUFpQixtQkFBbUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxnREFBZ0Q7QUFDaEQsNENBQTRDOztBQUU1QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCO0FBQzNCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7QUMzUEE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsSUFBSTtBQUNKO0FBQ0EsRUFBRTs7QUFFRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxxQ0FBcUM7QUFDckM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRix5Q0FBeUM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRiwwQ0FBMEM7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRiw2Q0FBNkM7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7QUFDRixtQ0FBbUM7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEiLCJmaWxlIjoiY2hhcnQ3Y2RiMjA3NTY5ZjEyYjVhZDFmNC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLm1hbmFnZSA9IHJlcXVpcmUoJy4vbWFuYWdlJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGF4aXNJZHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhpc19pZHMnKTtcbnZhciBzY2F0dGVyU3ViVHlwZXMgPSByZXF1aXJlKCcuLi8uLi90cmFjZXMvc2NhdHRlci9zdWJ0eXBlcycpO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBpc1VuaWZpZWRIb3ZlciA9IHJlcXVpcmUoJy4uL2Z4L2hlbHBlcnMnKS5pc1VuaWZpZWRIb3ZlcjtcblxudmFyIGNyZWF0ZU1vZGVCYXIgPSByZXF1aXJlKCcuL21vZGViYXInKTtcbnZhciBtb2RlQmFyQnV0dG9ucyA9IHJlcXVpcmUoJy4vYnV0dG9ucycpO1xuXG4vKipcbiAqIE1vZGVCYXIgd3JhcHBlciBhcm91bmQgJ2NyZWF0ZScgYW5kICd1cGRhdGUnLFxuICogY2hvb3NlcyBidXR0b25zIHRvIHBhc3MgdG8gTW9kZUJhciBjb25zdHJ1Y3RvciBiYXNlZCBvblxuICogcGxvdCB0eXBlIGFuZCBwbG90IGNvbmZpZy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZ2QgbWFpbiBwbG90IG9iamVjdFxuICpcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBtYW5hZ2VNb2RlQmFyKGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgY29udGV4dCA9IGdkLl9jb250ZXh0O1xuICAgIHZhciBtb2RlQmFyID0gZnVsbExheW91dC5fbW9kZUJhcjtcblxuICAgIGlmKCFjb250ZXh0LmRpc3BsYXlNb2RlQmFyICYmICFjb250ZXh0LndhdGVybWFyaykge1xuICAgICAgICBpZihtb2RlQmFyKSB7XG4gICAgICAgICAgICBtb2RlQmFyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIGRlbGV0ZSBmdWxsTGF5b3V0Ll9tb2RlQmFyO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZighQXJyYXkuaXNBcnJheShjb250ZXh0Lm1vZGVCYXJCdXR0b25zVG9SZW1vdmUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihbXG4gICAgICAgICAgICAnKm1vZGVCYXJCdXR0b25zVG9SZW1vdmUqIGNvbmZpZ3VyYXRpb24gb3B0aW9ucycsXG4gICAgICAgICAgICAnbXVzdCBiZSBhbiBhcnJheS4nXG4gICAgICAgIF0uam9pbignICcpKTtcbiAgICB9XG5cbiAgICBpZighQXJyYXkuaXNBcnJheShjb250ZXh0Lm1vZGVCYXJCdXR0b25zVG9BZGQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihbXG4gICAgICAgICAgICAnKm1vZGVCYXJCdXR0b25zVG9BZGQqIGNvbmZpZ3VyYXRpb24gb3B0aW9ucycsXG4gICAgICAgICAgICAnbXVzdCBiZSBhbiBhcnJheS4nXG4gICAgICAgIF0uam9pbignICcpKTtcbiAgICB9XG5cbiAgICB2YXIgY3VzdG9tQnV0dG9ucyA9IGNvbnRleHQubW9kZUJhckJ1dHRvbnM7XG4gICAgdmFyIGJ1dHRvbkdyb3VwcztcblxuICAgIGlmKEFycmF5LmlzQXJyYXkoY3VzdG9tQnV0dG9ucykgJiYgY3VzdG9tQnV0dG9ucy5sZW5ndGgpIHtcbiAgICAgICAgYnV0dG9uR3JvdXBzID0gZmlsbEN1c3RvbUJ1dHRvbihjdXN0b21CdXR0b25zKTtcbiAgICB9IGVsc2UgaWYoIWNvbnRleHQuZGlzcGxheU1vZGVCYXIgJiYgY29udGV4dC53YXRlcm1hcmspIHtcbiAgICAgICAgYnV0dG9uR3JvdXBzID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uR3JvdXBzID0gZ2V0QnV0dG9uR3JvdXBzKGdkKTtcbiAgICB9XG5cbiAgICBpZihtb2RlQmFyKSBtb2RlQmFyLnVwZGF0ZShnZCwgYnV0dG9uR3JvdXBzKTtcbiAgICBlbHNlIGZ1bGxMYXlvdXQuX21vZGVCYXIgPSBjcmVhdGVNb2RlQmFyKGdkLCBidXR0b25Hcm91cHMpO1xufTtcblxudmFyIERSQVdfTU9ERVMgPSBbXG4gICAgJ2RyYXdsaW5lJyxcbiAgICAnZHJhd29wZW5wYXRoJyxcbiAgICAnZHJhd2Nsb3NlZHBhdGgnLFxuICAgICdkcmF3Y2lyY2xlJyxcbiAgICAnZHJhd3JlY3QnLFxuICAgICdlcmFzZXNoYXBlJ1xuXTtcblxuLy8gbG9naWMgYmVoaW5kIHdoaWNoIGJ1dHRvbnMgYXJlIGRpc3BsYXllZCBieSBkZWZhdWx0XG5mdW5jdGlvbiBnZXRCdXR0b25Hcm91cHMoZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBmdWxsRGF0YSA9IGdkLl9mdWxsRGF0YTtcbiAgICB2YXIgY29udGV4dCA9IGdkLl9jb250ZXh0O1xuICAgIHZhciBidXR0b25zVG9SZW1vdmUgPSBjb250ZXh0Lm1vZGVCYXJCdXR0b25zVG9SZW1vdmU7XG4gICAgdmFyIGJ1dHRvbnNUb0FkZCA9IGNvbnRleHQubW9kZUJhckJ1dHRvbnNUb0FkZDtcblxuICAgIHZhciBoYXNDYXJ0ZXNpYW4gPSBmdWxsTGF5b3V0Ll9oYXMoJ2NhcnRlc2lhbicpO1xuICAgIHZhciBoYXNHTDNEID0gZnVsbExheW91dC5faGFzKCdnbDNkJyk7XG4gICAgdmFyIGhhc0dlbyA9IGZ1bGxMYXlvdXQuX2hhcygnZ2VvJyk7XG4gICAgdmFyIGhhc1BpZSA9IGZ1bGxMYXlvdXQuX2hhcygncGllJyk7XG4gICAgdmFyIGhhc0Z1bm5lbGFyZWEgPSBmdWxsTGF5b3V0Ll9oYXMoJ2Z1bm5lbGFyZWEnKTtcbiAgICB2YXIgaGFzR0wyRCA9IGZ1bGxMYXlvdXQuX2hhcygnZ2wyZCcpO1xuICAgIHZhciBoYXNUZXJuYXJ5ID0gZnVsbExheW91dC5faGFzKCd0ZXJuYXJ5Jyk7XG4gICAgdmFyIGhhc01hcGJveCA9IGZ1bGxMYXlvdXQuX2hhcygnbWFwYm94Jyk7XG4gICAgdmFyIGhhc1BvbGFyID0gZnVsbExheW91dC5faGFzKCdwb2xhcicpO1xuICAgIHZhciBoYXNTYW5rZXkgPSBmdWxsTGF5b3V0Ll9oYXMoJ3NhbmtleScpO1xuICAgIHZhciBhbGxBeGVzRml4ZWQgPSBhcmVBbGxBeGVzRml4ZWQoZnVsbExheW91dCk7XG4gICAgdmFyIGhhc1VuaWZpZWRIb3ZlckxhYmVsID0gaXNVbmlmaWVkSG92ZXIoZnVsbExheW91dC5ob3Zlcm1vZGUpO1xuXG4gICAgdmFyIGdyb3VwcyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gYWRkR3JvdXAobmV3R3JvdXApIHtcbiAgICAgICAgaWYoIW5ld0dyb3VwLmxlbmd0aCkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBvdXQgPSBbXTtcblxuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgbmV3R3JvdXAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBidXR0b24gPSBuZXdHcm91cFtpXTtcbiAgICAgICAgICAgIGlmKGJ1dHRvbnNUb1JlbW92ZS5pbmRleE9mKGJ1dHRvbikgIT09IC0xKSBjb250aW51ZTtcbiAgICAgICAgICAgIG91dC5wdXNoKG1vZGVCYXJCdXR0b25zW2J1dHRvbl0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXBzLnB1c2gob3V0KTtcbiAgICB9XG5cbiAgICAvLyBidXR0b25zIGNvbW1vbiB0byBhbGwgcGxvdCB0eXBlc1xuICAgIHZhciBjb21tb25Hcm91cCA9IFsndG9JbWFnZSddO1xuICAgIGlmKGNvbnRleHQuc2hvd0VkaXRJbkNoYXJ0U3R1ZGlvKSBjb21tb25Hcm91cC5wdXNoKCdlZGl0SW5DaGFydFN0dWRpbycpO1xuICAgIGVsc2UgaWYoY29udGV4dC5zaG93U2VuZFRvQ2xvdWQpIGNvbW1vbkdyb3VwLnB1c2goJ3NlbmREYXRhVG9DbG91ZCcpO1xuICAgIGFkZEdyb3VwKGNvbW1vbkdyb3VwKTtcblxuICAgIHZhciB6b29tR3JvdXAgPSBbXTtcbiAgICB2YXIgaG92ZXJHcm91cCA9IFtdO1xuICAgIHZhciByZXNldEdyb3VwID0gW107XG4gICAgdmFyIGRyYWdNb2RlR3JvdXAgPSBbXTtcblxuICAgIGlmKChoYXNDYXJ0ZXNpYW4gfHwgaGFzR0wyRCB8fCBoYXNQaWUgfHwgaGFzRnVubmVsYXJlYSB8fCBoYXNUZXJuYXJ5KSArIGhhc0dlbyArIGhhc0dMM0QgKyBoYXNNYXBib3ggKyBoYXNQb2xhciA+IDEpIHtcbiAgICAgICAgLy8gZ3JhcGhzIHdpdGggbW9yZSB0aGFuIG9uZSBwbG90IHR5cGVzIGdldCAndW5pb24gYnV0dG9ucydcbiAgICAgICAgLy8gd2hpY2ggcmVzZXQgdGhlIHZpZXcgb3IgdG9nZ2xlIGhvdmVyIGxhYmVscyBhY3Jvc3MgYWxsIHN1YnBsb3RzLlxuICAgICAgICBob3Zlckdyb3VwID0gWyd0b2dnbGVIb3ZlciddO1xuICAgICAgICByZXNldEdyb3VwID0gWydyZXNldFZpZXdzJ107XG4gICAgfSBlbHNlIGlmKGhhc0dlbykge1xuICAgICAgICB6b29tR3JvdXAgPSBbJ3pvb21JbkdlbycsICd6b29tT3V0R2VvJ107XG4gICAgICAgIGhvdmVyR3JvdXAgPSBbJ2hvdmVyQ2xvc2VzdEdlbyddO1xuICAgICAgICByZXNldEdyb3VwID0gWydyZXNldEdlbyddO1xuICAgIH0gZWxzZSBpZihoYXNHTDNEKSB7XG4gICAgICAgIGhvdmVyR3JvdXAgPSBbJ2hvdmVyQ2xvc2VzdDNkJ107XG4gICAgICAgIHJlc2V0R3JvdXAgPSBbJ3Jlc2V0Q2FtZXJhRGVmYXVsdDNkJywgJ3Jlc2V0Q2FtZXJhTGFzdFNhdmUzZCddO1xuICAgIH0gZWxzZSBpZihoYXNNYXBib3gpIHtcbiAgICAgICAgem9vbUdyb3VwID0gWyd6b29tSW5NYXBib3gnLCAnem9vbU91dE1hcGJveCddO1xuICAgICAgICBob3Zlckdyb3VwID0gWyd0b2dnbGVIb3ZlciddO1xuICAgICAgICByZXNldEdyb3VwID0gWydyZXNldFZpZXdNYXBib3gnXTtcbiAgICB9IGVsc2UgaWYoaGFzR0wyRCkge1xuICAgICAgICBob3Zlckdyb3VwID0gWydob3ZlckNsb3Nlc3RHbDJkJ107XG4gICAgfSBlbHNlIGlmKGhhc1BpZSkge1xuICAgICAgICBob3Zlckdyb3VwID0gWydob3ZlckNsb3Nlc3RQaWUnXTtcbiAgICB9IGVsc2UgaWYoaGFzU2Fua2V5KSB7XG4gICAgICAgIGhvdmVyR3JvdXAgPSBbJ2hvdmVyQ2xvc2VzdENhcnRlc2lhbicsICdob3ZlckNvbXBhcmVDYXJ0ZXNpYW4nXTtcbiAgICAgICAgcmVzZXRHcm91cCA9IFsncmVzZXRWaWV3U2Fua2V5J107XG4gICAgfSBlbHNlIHsgLy8gaGFzUG9sYXIsIGhhc1Rlcm5hcnlcbiAgICAgICAgLy8gYWx3YXlzIHNob3cgYXQgbGVhc3Qgb25lIGhvdmVyIGljb24uXG4gICAgICAgIGhvdmVyR3JvdXAgPSBbJ3RvZ2dsZUhvdmVyJ107XG4gICAgfVxuICAgIC8vIGlmIHdlIGhhdmUgY2FydGVzaWFuLCBhbGxvdyBzd2l0Y2hpbmcgYmV0d2VlbiBjbG9zZXN0IGFuZCBjb21wYXJlXG4gICAgLy8gcmVnYXJkbGVzcyBvZiB3aGF0IG90aGVyIHR5cGVzIGFyZSBvbiB0aGUgcGxvdCwgc2luY2UgdGhleSdsbCBhbGxcbiAgICAvLyBqdXN0IHRyZWF0IGFueSB0cnV0aHkgaG92ZXJtb2RlIGFzICdjbG9zZXN0J1xuICAgIGlmKGhhc0NhcnRlc2lhbikge1xuICAgICAgICBob3Zlckdyb3VwID0gWyd0b2dnbGVTcGlrZWxpbmVzJywgJ2hvdmVyQ2xvc2VzdENhcnRlc2lhbicsICdob3ZlckNvbXBhcmVDYXJ0ZXNpYW4nXTtcbiAgICB9XG4gICAgaWYoaGFzTm9Ib3ZlcihmdWxsRGF0YSkgfHwgaGFzVW5pZmllZEhvdmVyTGFiZWwpIHtcbiAgICAgICAgaG92ZXJHcm91cCA9IFtdO1xuICAgIH1cblxuICAgIGlmKChoYXNDYXJ0ZXNpYW4gfHwgaGFzR0wyRCkgJiYgIWFsbEF4ZXNGaXhlZCkge1xuICAgICAgICB6b29tR3JvdXAgPSBbJ3pvb21JbjJkJywgJ3pvb21PdXQyZCcsICdhdXRvU2NhbGUyZCddO1xuICAgICAgICBpZihyZXNldEdyb3VwWzBdICE9PSAncmVzZXRWaWV3cycpIHJlc2V0R3JvdXAgPSBbJ3Jlc2V0U2NhbGUyZCddO1xuICAgIH1cblxuICAgIGlmKGhhc0dMM0QpIHtcbiAgICAgICAgZHJhZ01vZGVHcm91cCA9IFsnem9vbTNkJywgJ3BhbjNkJywgJ29yYml0Um90YXRpb24nLCAndGFibGVSb3RhdGlvbiddO1xuICAgIH0gZWxzZSBpZigoKGhhc0NhcnRlc2lhbiB8fCBoYXNHTDJEKSAmJiAhYWxsQXhlc0ZpeGVkKSB8fCBoYXNUZXJuYXJ5KSB7XG4gICAgICAgIGRyYWdNb2RlR3JvdXAgPSBbJ3pvb20yZCcsICdwYW4yZCddO1xuICAgIH0gZWxzZSBpZihoYXNNYXBib3ggfHwgaGFzR2VvKSB7XG4gICAgICAgIGRyYWdNb2RlR3JvdXAgPSBbJ3BhbjJkJ107XG4gICAgfSBlbHNlIGlmKGhhc1BvbGFyKSB7XG4gICAgICAgIGRyYWdNb2RlR3JvdXAgPSBbJ3pvb20yZCddO1xuICAgIH1cbiAgICBpZihpc1NlbGVjdGFibGUoZnVsbERhdGEpKSB7XG4gICAgICAgIGRyYWdNb2RlR3JvdXAucHVzaCgnc2VsZWN0MmQnLCAnbGFzc28yZCcpO1xuICAgIH1cblxuICAgIC8vIGFjY2VwdCBwcmUtZGVmaW5lZCBidXR0b25zIGFzIHN0cmluZ1xuICAgIGlmKEFycmF5LmlzQXJyYXkoYnV0dG9uc1RvQWRkKSkge1xuICAgICAgICB2YXIgbmV3TGlzdCA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYnV0dG9uc1RvQWRkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYiA9IGJ1dHRvbnNUb0FkZFtpXTtcbiAgICAgICAgICAgIGlmKHR5cGVvZiBiID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmKERSQVdfTU9ERVMuaW5kZXhPZihiKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgICAgICBmdWxsTGF5b3V0Ll9oYXMoJ21hcGJveCcpIHx8IC8vIGRyYXcgc2hhcGVzIGluIHBhcGVyIGNvb3JkaW5hdGUgKGNvdWxkIGJlIGltcHJvdmVkIGluIGZ1dHVyZSB0byBzdXBwb3J0IGRhdGEgY29vcmRpbmF0ZSwgd2hlbiB0aGVyZSBpcyBubyBwaXRjaClcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxMYXlvdXQuX2hhcygnY2FydGVzaWFuJykgLy8gZHJhdyBzaGFwZXMgaW4gZGF0YSBjb29yZGluYXRlXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhZ01vZGVHcm91cC5wdXNoKGIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIG5ld0xpc3QucHVzaChiKTtcbiAgICAgICAgfVxuICAgICAgICBidXR0b25zVG9BZGQgPSBuZXdMaXN0O1xuICAgIH1cblxuICAgIGFkZEdyb3VwKGRyYWdNb2RlR3JvdXApO1xuICAgIGFkZEdyb3VwKHpvb21Hcm91cC5jb25jYXQocmVzZXRHcm91cCkpO1xuICAgIGFkZEdyb3VwKGhvdmVyR3JvdXApO1xuXG4gICAgcmV0dXJuIGFwcGVuZEJ1dHRvbnNUb0dyb3Vwcyhncm91cHMsIGJ1dHRvbnNUb0FkZCk7XG59XG5cbmZ1bmN0aW9uIGFyZUFsbEF4ZXNGaXhlZChmdWxsTGF5b3V0KSB7XG4gICAgdmFyIGF4TGlzdCA9IGF4aXNJZHMubGlzdCh7X2Z1bGxMYXlvdXQ6IGZ1bGxMYXlvdXR9LCBudWxsLCB0cnVlKTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBheExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoIWF4TGlzdFtpXS5maXhlZHJhbmdlKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbn1cblxuLy8gbG9vayBmb3IgdHJhY2VzIHRoYXQgc3VwcG9ydCBzZWxlY3Rpb25cbi8vIHRvIGJlIHVwZGF0ZWQgYXMgd2UgYWRkIG1vcmUgc2VsZWN0UG9pbnRzIGhhbmRsZXJzXG5mdW5jdGlvbiBpc1NlbGVjdGFibGUoZnVsbERhdGEpIHtcbiAgICB2YXIgc2VsZWN0YWJsZSA9IGZhbHNlO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKHNlbGVjdGFibGUpIGJyZWFrO1xuXG4gICAgICAgIHZhciB0cmFjZSA9IGZ1bGxEYXRhW2ldO1xuXG4gICAgICAgIGlmKCF0cmFjZS5fbW9kdWxlIHx8ICF0cmFjZS5fbW9kdWxlLnNlbGVjdFBvaW50cykgY29udGludWU7XG5cbiAgICAgICAgaWYoUmVnaXN0cnkudHJhY2VJcyh0cmFjZSwgJ3NjYXR0ZXItbGlrZScpKSB7XG4gICAgICAgICAgICBpZihzY2F0dGVyU3ViVHlwZXMuaGFzTWFya2Vycyh0cmFjZSkgfHwgc2NhdHRlclN1YlR5cGVzLmhhc1RleHQodHJhY2UpKSB7XG4gICAgICAgICAgICAgICAgc2VsZWN0YWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihSZWdpc3RyeS50cmFjZUlzKHRyYWNlLCAnYm94LXZpb2xpbicpKSB7XG4gICAgICAgICAgICBpZih0cmFjZS5ib3hwb2ludHMgPT09ICdhbGwnIHx8IHRyYWNlLnBvaW50cyA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGFzc3VtZSB0aGF0IGluIGdlbmVyYWwgaWYgdGhlIHRyYWNlIG1vZHVsZSBoYXMgc2VsZWN0UG9pbnRzLFxuICAgICAgICAgICAgLy8gdGhlbiBpdCdzIHNlbGVjdGFibGUuIFNjYXR0ZXIgaXMgYW4gZXhjZXB0aW9uIHRvIHRoaXMgYmVjYXVzZSBpdCBtdXN0XG4gICAgICAgICAgICAvLyBoYXZlIG1hcmtlcnMgb3IgdGV4dCwgbm90IGp1c3QgYmUgYSBzY2F0dGVyIHR5cGUuXG5cbiAgICAgICAgICAgIHNlbGVjdGFibGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHNlbGVjdGFibGU7XG59XG5cbi8vIGNoZWNrIHdoZXRoZXIgYWxsIHRyYWNlIGFyZSAnbm9Ib3ZlcidcbmZ1bmN0aW9uIGhhc05vSG92ZXIoZnVsbERhdGEpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoIVJlZ2lzdHJ5LnRyYWNlSXMoZnVsbERhdGFbaV0sICdub0hvdmVyJykpIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGFwcGVuZEJ1dHRvbnNUb0dyb3Vwcyhncm91cHMsIGJ1dHRvbnMpIHtcbiAgICBpZihidXR0b25zLmxlbmd0aCkge1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KGJ1dHRvbnNbMF0pKSB7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGdyb3Vwcy5wdXNoKGJ1dHRvbnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgZ3JvdXBzLnB1c2goYnV0dG9ucyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGdyb3Vwcztcbn1cblxuLy8gZmlsbCBpbiBjdXN0b20gYnV0dG9ucyByZWZlcnJpbmcgdG8gZGVmYXVsdCBtb2RlIGJhciBidXR0b25zXG5mdW5jdGlvbiBmaWxsQ3VzdG9tQnV0dG9uKGN1c3RvbUJ1dHRvbnMpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgY3VzdG9tQnV0dG9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYnV0dG9uR3JvdXAgPSBjdXN0b21CdXR0b25zW2ldO1xuXG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBidXR0b25Hcm91cC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IGJ1dHRvbkdyb3VwW2pdO1xuXG4gICAgICAgICAgICBpZih0eXBlb2YgYnV0dG9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIGlmKG1vZGVCYXJCdXR0b25zW2J1dHRvbl0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBjdXN0b21CdXR0b25zW2ldW2pdID0gbW9kZUJhckJ1dHRvbnNbYnV0dG9uXTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgICAgICAgICAgICAgICAgICAgICAgJyptb2RlQmFyQnV0dG9ucyogY29uZmlndXJhdGlvbiBvcHRpb25zJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICdpbnZhbGlkIGJ1dHRvbiBuYW1lJ1xuICAgICAgICAgICAgICAgICAgICBdLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGN1c3RvbUJ1dHRvbnM7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgSWNvbnMgPSByZXF1aXJlKCcuLi8uLi9mb250cy9wbG90aWNvbicpO1xudmFyIFBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcblxuLyoqXG4gKiBVSSBjb250cm9sbGVyIGZvciBpbnRlcmFjdGl2ZSBwbG90c1xuICogQENsYXNzXG4gKiBAUGFyYW0ge29iamVjdH0gb3B0c1xuICogQFBhcmFtIHtvYmplY3R9IG9wdHMuYnV0dG9ucyAgICBuZXN0ZWQgYXJyYXlzIG9mIGdyb3VwZWQgYnV0dG9ucyBjb25maWcgb2JqZWN0c1xuICogQFBhcmFtIHtvYmplY3R9IG9wdHMuY29udGFpbmVyICBjb250YWluZXIgZGl2IHRvIGFwcGVuZCBtb2RlQmFyXG4gKiBAUGFyYW0ge29iamVjdH0gb3B0cy5ncmFwaEluZm8gIHByaW1hcnkgcGxvdCBvYmplY3QgY29udGFpbmluZyBkYXRhIGFuZCBsYXlvdXRcbiAqL1xuZnVuY3Rpb24gTW9kZUJhcihvcHRzKSB7XG4gICAgdGhpcy5jb250YWluZXIgPSBvcHRzLmNvbnRhaW5lcjtcbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHRoaXMudXBkYXRlKG9wdHMuZ3JhcGhJbmZvLCBvcHRzLmJ1dHRvbnMpO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQodGhpcy5lbGVtZW50KTtcbn1cblxudmFyIHByb3RvID0gTW9kZUJhci5wcm90b3R5cGU7XG5cbi8qKlxuICogVXBkYXRlIG1vZGVCYXIgKGJ1dHRvbnMgYW5kIGxvZ28pXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGdyYXBoSW5mbyAgcHJpbWFyeSBwbG90IG9iamVjdCBjb250YWluaW5nIGRhdGEgYW5kIGxheW91dFxuICogQHBhcmFtIHthcnJheSBvZiBhcnJheXN9IGJ1dHRvbnMgbmVzdGVkIGFycmF5cyBvZiBncm91cGVkIGJ1dHRvbnMgdG8gaW5pdGlhbGl6ZVxuICpcbiAqL1xucHJvdG8udXBkYXRlID0gZnVuY3Rpb24oZ3JhcGhJbmZvLCBidXR0b25zKSB7XG4gICAgdGhpcy5ncmFwaEluZm8gPSBncmFwaEluZm87XG5cbiAgICB2YXIgY29udGV4dCA9IHRoaXMuZ3JhcGhJbmZvLl9jb250ZXh0O1xuICAgIHZhciBmdWxsTGF5b3V0ID0gdGhpcy5ncmFwaEluZm8uX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIG1vZGVCYXJJZCA9ICdtb2RlYmFyLScgKyBmdWxsTGF5b3V0Ll91aWQ7XG5cbiAgICB0aGlzLmVsZW1lbnQuc2V0QXR0cmlidXRlKCdpZCcsIG1vZGVCYXJJZCk7XG4gICAgdGhpcy5fdWlkID0gbW9kZUJhcklkO1xuXG4gICAgdGhpcy5lbGVtZW50LmNsYXNzTmFtZSA9ICdtb2RlYmFyJztcbiAgICBpZihjb250ZXh0LmRpc3BsYXlNb2RlQmFyID09PSAnaG92ZXInKSB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lICs9ICcgbW9kZWJhci0taG92ZXIgZWFzZS1iZyc7XG5cbiAgICBpZihmdWxsTGF5b3V0Lm1vZGViYXIub3JpZW50YXRpb24gPT09ICd2Jykge1xuICAgICAgICB0aGlzLmVsZW1lbnQuY2xhc3NOYW1lICs9ICcgdmVydGljYWwnO1xuICAgICAgICBidXR0b25zID0gYnV0dG9ucy5yZXZlcnNlKCk7XG4gICAgfVxuXG4gICAgdmFyIHN0eWxlID0gZnVsbExheW91dC5tb2RlYmFyO1xuICAgIHZhciBiZ1NlbGVjdG9yID0gY29udGV4dC5kaXNwbGF5TW9kZUJhciA9PT0gJ2hvdmVyJyA/ICcuanMtcGxvdGx5LXBsb3QgLnBsb3RseTpob3ZlciAnIDogJyc7XG5cbiAgICBMaWIuZGVsZXRlUmVsYXRlZFN0eWxlUnVsZShtb2RlQmFySWQpO1xuICAgIExpYi5hZGRSZWxhdGVkU3R5bGVSdWxlKG1vZGVCYXJJZCwgYmdTZWxlY3RvciArICcjJyArIG1vZGVCYXJJZCArICcgLm1vZGViYXItZ3JvdXAnLCAnYmFja2dyb3VuZC1jb2xvcjogJyArIHN0eWxlLmJnY29sb3IpO1xuICAgIExpYi5hZGRSZWxhdGVkU3R5bGVSdWxlKG1vZGVCYXJJZCwgJyMnICsgbW9kZUJhcklkICsgJyAubW9kZWJhci1idG4gLmljb24gcGF0aCcsICdmaWxsOiAnICsgc3R5bGUuY29sb3IpO1xuICAgIExpYi5hZGRSZWxhdGVkU3R5bGVSdWxlKG1vZGVCYXJJZCwgJyMnICsgbW9kZUJhcklkICsgJyAubW9kZWJhci1idG46aG92ZXIgLmljb24gcGF0aCcsICdmaWxsOiAnICsgc3R5bGUuYWN0aXZlY29sb3IpO1xuICAgIExpYi5hZGRSZWxhdGVkU3R5bGVSdWxlKG1vZGVCYXJJZCwgJyMnICsgbW9kZUJhcklkICsgJyAubW9kZWJhci1idG4uYWN0aXZlIC5pY29uIHBhdGgnLCAnZmlsbDogJyArIHN0eWxlLmFjdGl2ZWNvbG9yKTtcblxuICAgIC8vIGlmIGJ1dHRvbnMgb3IgbG9nbyBoYXZlIGNoYW5nZWQsIHJlZHJhdyBtb2RlYmFyIGludGVyaW9yXG4gICAgdmFyIG5lZWRzTmV3QnV0dG9ucyA9ICF0aGlzLmhhc0J1dHRvbnMoYnV0dG9ucyk7XG4gICAgdmFyIG5lZWRzTmV3TG9nbyA9ICh0aGlzLmhhc0xvZ28gIT09IGNvbnRleHQuZGlzcGxheWxvZ28pO1xuICAgIHZhciBuZWVkc05ld0xvY2FsZSA9ICh0aGlzLmxvY2FsZSAhPT0gY29udGV4dC5sb2NhbGUpO1xuXG4gICAgdGhpcy5sb2NhbGUgPSBjb250ZXh0LmxvY2FsZTtcblxuICAgIGlmKG5lZWRzTmV3QnV0dG9ucyB8fCBuZWVkc05ld0xvZ28gfHwgbmVlZHNOZXdMb2NhbGUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBbGxCdXR0b25zKCk7XG5cbiAgICAgICAgdGhpcy51cGRhdGVCdXR0b25zKGJ1dHRvbnMpO1xuXG4gICAgICAgIGlmKGNvbnRleHQud2F0ZXJtYXJrIHx8IGNvbnRleHQuZGlzcGxheWxvZ28pIHtcbiAgICAgICAgICAgIHZhciBsb2dvR3JvdXAgPSB0aGlzLmdldExvZ28oKTtcbiAgICAgICAgICAgIGlmKGNvbnRleHQud2F0ZXJtYXJrKSB7XG4gICAgICAgICAgICAgICAgbG9nb0dyb3VwLmNsYXNzTmFtZSA9IGxvZ29Hcm91cC5jbGFzc05hbWUgKyAnIHdhdGVybWFyayc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGZ1bGxMYXlvdXQubW9kZWJhci5vcmllbnRhdGlvbiA9PT0gJ3YnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50Lmluc2VydEJlZm9yZShsb2dvR3JvdXAsIHRoaXMuZWxlbWVudC5jaGlsZE5vZGVzWzBdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKGxvZ29Hcm91cCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuaGFzTG9nbyA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUFjdGl2ZUJ1dHRvbigpO1xufTtcblxucHJvdG8udXBkYXRlQnV0dG9ucyA9IGZ1bmN0aW9uKGJ1dHRvbnMpIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy5idXR0b25zID0gYnV0dG9ucztcbiAgICB0aGlzLmJ1dHRvbkVsZW1lbnRzID0gW107XG4gICAgdGhpcy5idXR0b25zTmFtZXMgPSBbXTtcblxuICAgIHRoaXMuYnV0dG9ucy5mb3JFYWNoKGZ1bmN0aW9uKGJ1dHRvbkdyb3VwKSB7XG4gICAgICAgIHZhciBncm91cCA9IF90aGlzLmNyZWF0ZUdyb3VwKCk7XG5cbiAgICAgICAgYnV0dG9uR3JvdXAuZm9yRWFjaChmdW5jdGlvbihidXR0b25Db25maWcpIHtcbiAgICAgICAgICAgIHZhciBidXR0b25OYW1lID0gYnV0dG9uQ29uZmlnLm5hbWU7XG4gICAgICAgICAgICBpZighYnV0dG9uTmFtZSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbXVzdCBwcm92aWRlIGJ1dHRvbiBcXCduYW1lXFwnIGluIGJ1dHRvbiBjb25maWcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKF90aGlzLmJ1dHRvbnNOYW1lcy5pbmRleE9mKGJ1dHRvbk5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYnV0dG9uIG5hbWUgXFwnJyArIGJ1dHRvbk5hbWUgKyAnXFwnIGlzIHRha2VuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBfdGhpcy5idXR0b25zTmFtZXMucHVzaChidXR0b25OYW1lKTtcblxuICAgICAgICAgICAgdmFyIGJ1dHRvbiA9IF90aGlzLmNyZWF0ZUJ1dHRvbihidXR0b25Db25maWcpO1xuICAgICAgICAgICAgX3RoaXMuYnV0dG9uRWxlbWVudHMucHVzaChidXR0b24pO1xuICAgICAgICAgICAgZ3JvdXAuYXBwZW5kQ2hpbGQoYnV0dG9uKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgX3RoaXMuZWxlbWVudC5hcHBlbmRDaGlsZChncm91cCk7XG4gICAgfSk7XG59O1xuXG4vKipcbiAqIEVtcHR5IGRpdiBmb3IgY29udGFpbmluZyBhIGdyb3VwIG9mIGJ1dHRvbnNcbiAqIEBSZXR1cm4ge0hUTUxlbGVtZW50fVxuICovXG5wcm90by5jcmVhdGVHcm91cCA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBncm91cCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGdyb3VwLmNsYXNzTmFtZSA9ICdtb2RlYmFyLWdyb3VwJztcbiAgICByZXR1cm4gZ3JvdXA7XG59O1xuXG4vKipcbiAqIENyZWF0ZSBhIG5ldyBidXR0b24gZGl2IGFuZCBzZXQgY29uc3RhbnQgYW5kIGNvbmZpZ3VyYWJsZSBhdHRyaWJ1dGVzXG4gKiBAUGFyYW0ge29iamVjdH0gY29uZmlnIChzZWUgLi9idXR0b25zLmpzIGZvciBtb3JlIGluZm8pXG4gKiBAUmV0dXJuIHtIVE1MZWxlbWVudH1cbiAqL1xucHJvdG8uY3JlYXRlQnV0dG9uID0gZnVuY3Rpb24oY29uZmlnKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgYnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgncmVsJywgJ3Rvb2x0aXAnKTtcbiAgICBidXR0b24uY2xhc3NOYW1lID0gJ21vZGViYXItYnRuJztcblxuICAgIHZhciB0aXRsZSA9IGNvbmZpZy50aXRsZTtcbiAgICBpZih0aXRsZSA9PT0gdW5kZWZpbmVkKSB0aXRsZSA9IGNvbmZpZy5uYW1lO1xuICAgIC8vIGZvciBsb2NhbGl6YXRpb246IGFsbG93IHRpdGxlIHRvIGJlIGEgY2FsbGFibGUgdGhhdCB0YWtlcyBnZCBhcyBhcmdcbiAgICBlbHNlIGlmKHR5cGVvZiB0aXRsZSA9PT0gJ2Z1bmN0aW9uJykgdGl0bGUgPSB0aXRsZSh0aGlzLmdyYXBoSW5mbyk7XG5cbiAgICBpZih0aXRsZSB8fCB0aXRsZSA9PT0gMCkgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScsIHRpdGxlKTtcblxuICAgIGlmKGNvbmZpZy5hdHRyICE9PSB1bmRlZmluZWQpIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtYXR0cicsIGNvbmZpZy5hdHRyKTtcblxuICAgIHZhciB2YWwgPSBjb25maWcudmFsO1xuICAgIGlmKHZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGlmKHR5cGVvZiB2YWwgPT09ICdmdW5jdGlvbicpIHZhbCA9IHZhbCh0aGlzLmdyYXBoSW5mbyk7XG4gICAgICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtdmFsJywgdmFsKTtcbiAgICB9XG5cbiAgICB2YXIgY2xpY2sgPSBjb25maWcuY2xpY2s7XG4gICAgaWYodHlwZW9mIGNsaWNrICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbXVzdCBwcm92aWRlIGJ1dHRvbiBcXCdjbGlja1xcJyBmdW5jdGlvbiBpbiBidXR0b24gY29uZmlnJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXYpIHtcbiAgICAgICAgICAgIGNvbmZpZy5jbGljayhfdGhpcy5ncmFwaEluZm8sIGV2KTtcblxuICAgICAgICAgICAgLy8gb25seSBuZWVkZWQgZm9yICdob3ZlckNsb3Nlc3RHZW8nIHdoaWNoIGRvZXMgbm90IGNhbGwgcmVsYXlvdXRcbiAgICAgICAgICAgIF90aGlzLnVwZGF0ZUFjdGl2ZUJ1dHRvbihldi5jdXJyZW50VGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUnLCBjb25maWcudG9nZ2xlIHx8IGZhbHNlKTtcbiAgICBpZihjb25maWcudG9nZ2xlKSBkMy5zZWxlY3QoYnV0dG9uKS5jbGFzc2VkKCdhY3RpdmUnLCB0cnVlKTtcblxuICAgIHZhciBpY29uID0gY29uZmlnLmljb247XG4gICAgaWYodHlwZW9mIGljb24gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKGljb24oKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uLmFwcGVuZENoaWxkKHRoaXMuY3JlYXRlSWNvbihpY29uIHx8IEljb25zLnF1ZXN0aW9uKSk7XG4gICAgfVxuICAgIGJ1dHRvbi5zZXRBdHRyaWJ1dGUoJ2RhdGEtZ3Jhdml0eScsIGNvbmZpZy5ncmF2aXR5IHx8ICduJyk7XG5cbiAgICByZXR1cm4gYnV0dG9uO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gaWNvbiB0byBhIGJ1dHRvblxuICogQFBhcmFtIHtvYmplY3R9IHRoaXNJY29uXG4gKiBAUGFyYW0ge251bWJlcn0gdGhpc0ljb24ud2lkdGhcbiAqIEBQYXJhbSB7c3RyaW5nfSB0aGlzSWNvbi5wYXRoXG4gKiBAUGFyYW0ge3N0cmluZ30gdGhpc0ljb24uY29sb3JcbiAqIEBSZXR1cm4ge0hUTUxlbGVtZW50fVxuICovXG5wcm90by5jcmVhdGVJY29uID0gZnVuY3Rpb24odGhpc0ljb24pIHtcbiAgICB2YXIgaWNvbkhlaWdodCA9IGlzTnVtZXJpYyh0aGlzSWNvbi5oZWlnaHQpID9cbiAgICAgICAgTnVtYmVyKHRoaXNJY29uLmhlaWdodCkgOlxuICAgICAgICB0aGlzSWNvbi5hc2NlbnQgLSB0aGlzSWNvbi5kZXNjZW50O1xuICAgIHZhciBzdmdOUyA9ICdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Zyc7XG4gICAgdmFyIGljb247XG5cbiAgICBpZih0aGlzSWNvbi5wYXRoKSB7XG4gICAgICAgIGljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdzdmcnKTtcbiAgICAgICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCBbMCwgMCwgdGhpc0ljb24ud2lkdGgsIGljb25IZWlnaHRdLmpvaW4oJyAnKSk7XG4gICAgICAgIGljb24uc2V0QXR0cmlidXRlKCdjbGFzcycsICdpY29uJyk7XG5cbiAgICAgICAgdmFyIHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoc3ZnTlMsICdwYXRoJyk7XG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdkJywgdGhpc0ljb24ucGF0aCk7XG5cbiAgICAgICAgaWYodGhpc0ljb24udHJhbnNmb3JtKSB7XG4gICAgICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgndHJhbnNmb3JtJywgdGhpc0ljb24udHJhbnNmb3JtKTtcbiAgICAgICAgfSBlbHNlIGlmKHRoaXNJY29uLmFzY2VudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAvLyBMZWdhY3kgaWNvbiB0cmFuc2Zvcm0gY2FsY3VsYXRpb25cbiAgICAgICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCd0cmFuc2Zvcm0nLCAnbWF0cml4KDEgMCAwIC0xIDAgJyArIHRoaXNJY29uLmFzY2VudCArICcpJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpY29uLmFwcGVuZENoaWxkKHBhdGgpO1xuICAgIH1cblxuICAgIGlmKHRoaXNJY29uLnN2Zykge1xuICAgICAgICB2YXIgc3ZnRG9jID0gUGFyc2VyLnBhcnNlRnJvbVN0cmluZyh0aGlzSWNvbi5zdmcsICdhcHBsaWNhdGlvbi94bWwnKTtcbiAgICAgICAgaWNvbiA9IHN2Z0RvYy5jaGlsZE5vZGVzWzBdO1xuICAgIH1cblxuICAgIGljb24uc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMWVtJyk7XG4gICAgaWNvbi5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzFlbScpO1xuXG4gICAgcmV0dXJuIGljb247XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgYWN0aXZlIGJ1dHRvbiB3aXRoIGF0dHJpYnV0ZSBzcGVjaWZpZWQgaW4gbGF5b3V0XG4gKiBAUGFyYW0ge29iamVjdH0gZ3JhcGhJbmZvIHBsb3Qgb2JqZWN0IGNvbnRhaW5pbmcgZGF0YSBhbmQgbGF5b3V0XG4gKiBAUmV0dXJuIHtIVE1MZWxlbWVudH1cbiAqL1xucHJvdG8udXBkYXRlQWN0aXZlQnV0dG9uID0gZnVuY3Rpb24oYnV0dG9uQ2xpY2tlZCkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gdGhpcy5ncmFwaEluZm8uX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGRhdGFBdHRyQ2xpY2tlZCA9IChidXR0b25DbGlja2VkICE9PSB1bmRlZmluZWQpID9cbiAgICAgICAgYnV0dG9uQ2xpY2tlZC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXR0cicpIDpcbiAgICAgICAgbnVsbDtcblxuICAgIHRoaXMuYnV0dG9uRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbihidXR0b24pIHtcbiAgICAgICAgdmFyIHRoaXN2YWwgPSBidXR0b24uZ2V0QXR0cmlidXRlKCdkYXRhLXZhbCcpIHx8IHRydWU7XG4gICAgICAgIHZhciBkYXRhQXR0ciA9IGJ1dHRvbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtYXR0cicpO1xuICAgICAgICB2YXIgaXNUb2dnbGVCdXR0b24gPSAoYnV0dG9uLmdldEF0dHJpYnV0ZSgnZGF0YS10b2dnbGUnKSA9PT0gJ3RydWUnKTtcbiAgICAgICAgdmFyIGJ1dHRvbjMgPSBkMy5zZWxlY3QoYnV0dG9uKTtcblxuICAgICAgICAvLyBVc2UgJ2RhdGEtdG9nZ2xlJyBhbmQgJ2J1dHRvbkNsaWNrZWQnIHRvIHRvZ2dsZSBidXR0b25zXG4gICAgICAgIC8vIHRoYXQgaGF2ZSBubyBvbmUtdG8tb25lIGVxdWl2YWxlbnQgaW4gZnVsbExheW91dFxuICAgICAgICBpZihpc1RvZ2dsZUJ1dHRvbikge1xuICAgICAgICAgICAgaWYoZGF0YUF0dHIgPT09IGRhdGFBdHRyQ2xpY2tlZCkge1xuICAgICAgICAgICAgICAgIGJ1dHRvbjMuY2xhc3NlZCgnYWN0aXZlJywgIWJ1dHRvbjMuY2xhc3NlZCgnYWN0aXZlJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHZhbCA9IChkYXRhQXR0ciA9PT0gbnVsbCkgP1xuICAgICAgICAgICAgICAgIGRhdGFBdHRyIDpcbiAgICAgICAgICAgICAgICBMaWIubmVzdGVkUHJvcGVydHkoZnVsbExheW91dCwgZGF0YUF0dHIpLmdldCgpO1xuXG4gICAgICAgICAgICBidXR0b24zLmNsYXNzZWQoJ2FjdGl2ZScsIHZhbCA9PT0gdGhpc3ZhbCk7XG4gICAgICAgIH1cbiAgICB9KTtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgbW9kZUJhciBpcyBjb25maWd1cmVkIGFzIGJ1dHRvbiBjb25maWd1cmF0aW9uIGFyZ3VtZW50XG4gKlxuICogQFBhcmFtIHtvYmplY3R9IGJ1dHRvbnMgMmQgYXJyYXkgb2YgZ3JvdXBlZCBidXR0b24gY29uZmlnIG9iamVjdHNcbiAqIEBSZXR1cm4ge2Jvb2xlYW59XG4gKi9cbnByb3RvLmhhc0J1dHRvbnMgPSBmdW5jdGlvbihidXR0b25zKSB7XG4gICAgdmFyIGN1cnJlbnRCdXR0b25zID0gdGhpcy5idXR0b25zO1xuXG4gICAgaWYoIWN1cnJlbnRCdXR0b25zKSByZXR1cm4gZmFsc2U7XG5cbiAgICBpZihidXR0b25zLmxlbmd0aCAhPT0gY3VycmVudEJ1dHRvbnMubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgYnV0dG9ucy5sZW5ndGg7ICsraSkge1xuICAgICAgICBpZihidXR0b25zW2ldLmxlbmd0aCAhPT0gY3VycmVudEJ1dHRvbnNbaV0ubGVuZ3RoKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBidXR0b25zW2ldLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICBpZihidXR0b25zW2ldW2pdLm5hbWUgIT09IGN1cnJlbnRCdXR0b25zW2ldW2pdLm5hbWUpIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBAcmV0dXJuIHtIVE1MRGl2RWxlbWVudH0gVGhlIGxvZ28gaW1hZ2Ugd3JhcHBlZCBpbiBhIGdyb3VwXG4gKi9cbnByb3RvLmdldExvZ28gPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgZ3JvdXAgPSB0aGlzLmNyZWF0ZUdyb3VwKCk7XG4gICAgdmFyIGEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdhJyk7XG5cbiAgICBhLmhyZWYgPSAnaHR0cHM6Ly9wbG90bHkuY29tLyc7XG4gICAgYS50YXJnZXQgPSAnX2JsYW5rJztcbiAgICBhLnNldEF0dHJpYnV0ZSgnZGF0YS10aXRsZScsIExpYi5fKHRoaXMuZ3JhcGhJbmZvLCAnUHJvZHVjZWQgd2l0aCBQbG90bHknKSk7XG4gICAgYS5jbGFzc05hbWUgPSAnbW9kZWJhci1idG4gcGxvdGx5anNpY29uIG1vZGViYXItYnRuLS1sb2dvJztcblxuICAgIGEuYXBwZW5kQ2hpbGQodGhpcy5jcmVhdGVJY29uKEljb25zLm5ld3Bsb3RseWxvZ28pKTtcblxuICAgIGdyb3VwLmFwcGVuZENoaWxkKGEpO1xuICAgIHJldHVybiBncm91cDtcbn07XG5cbnByb3RvLnJlbW92ZUFsbEJ1dHRvbnMgPSBmdW5jdGlvbigpIHtcbiAgICB3aGlsZSh0aGlzLmVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgICB0aGlzLmVsZW1lbnQucmVtb3ZlQ2hpbGQodGhpcy5lbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIHRoaXMuaGFzTG9nbyA9IGZhbHNlO1xufTtcblxucHJvdG8uZGVzdHJveSA9IGZ1bmN0aW9uKCkge1xuICAgIExpYi5yZW1vdmVFbGVtZW50KHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5tb2RlYmFyJykpO1xuICAgIExpYi5kZWxldGVSZWxhdGVkU3R5bGVSdWxlKHRoaXMuX3VpZCk7XG59O1xuXG5mdW5jdGlvbiBjcmVhdGVNb2RlQmFyKGdkLCBidXR0b25zKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIHZhciBtb2RlQmFyID0gbmV3IE1vZGVCYXIoe1xuICAgICAgICBncmFwaEluZm86IGdkLFxuICAgICAgICBjb250YWluZXI6IGZ1bGxMYXlvdXQuX21vZGViYXJkaXYubm9kZSgpLFxuICAgICAgICBidXR0b25zOiBidXR0b25zXG4gICAgfSk7XG5cbiAgICBpZihmdWxsTGF5b3V0Ll9wcml2YXRlcGxvdCkge1xuICAgICAgICBkMy5zZWxlY3QobW9kZUJhci5lbGVtZW50KS5hcHBlbmQoJ3NwYW4nKVxuICAgICAgICAgICAgLmNsYXNzZWQoJ2JhZGdlLXByaXZhdGUgZmxvYXQtLWxlZnQnLCB0cnVlKVxuICAgICAgICAgICAgLnRleHQoJ1BSSVZBVEUnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbW9kZUJhcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGVNb2RlQmFyO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIENsZWFyIGdsIGZyYW1lIChpZiBhbnkpLiBUaGlzIGlzIGEgY29tbW9uIHBhdHRlcm4gYXNcbiAqIHdlIHVzdWFsbHkgc2V0IGBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IHRydWVgIGR1cmluZ1xuICogZ2wgY29udGV4dCBjcmVhdGlvbiAoZS5nLiB2aWEgYHJlZ2xVdGlscy5wcmVwYXJlYCkuXG4gKlxuICogQHBhcmFtIHtET00gbm9kZSBvciBvYmplY3R9IGdkIDogZ3JhcGggZGl2IG9iamVjdFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNsZWFyR2xDYW52YXNlcyhnZCkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG5cbiAgICBpZihmdWxsTGF5b3V0Ll9nbGNhbnZhcyAmJiBmdWxsTGF5b3V0Ll9nbGNhbnZhcy5zaXplKCkpIHtcbiAgICAgICAgZnVsbExheW91dC5fZ2xjYW52YXMuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICBpZihkLnJlZ2wpIGQucmVnbC5jbGVhcih7Y29sb3I6IHRydWUsIGRlcHRoOiB0cnVlfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGRvdCA9IHJlcXVpcmUoJy4vbWF0cml4JykuZG90O1xudmFyIEJBRE5VTSA9IHJlcXVpcmUoJy4uL2NvbnN0YW50cy9udW1lcmljYWwnKS5CQUROVU07XG5cbnZhciBwb2x5Z29uID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLyoqXG4gKiBUdXJuIGFuIGFycmF5IG9mIFt4LCB5XSBwYWlycyBpbnRvIGEgcG9seWdvbiBvYmplY3RcbiAqIHRoYXQgY2FuIHRlc3QgaWYgcG9pbnRzIGFyZSBpbnNpZGUgaXRcbiAqXG4gKiBAcGFyYW0gcHRzSW4gQXJyYXkgb2YgW3gsIHldIHBhaXJzXG4gKlxuICogQHJldHVybnMgcG9seWdvbiBPYmplY3Qge3htaW4sIHhtYXgsIHltaW4sIHltYXgsIHB0cywgY29udGFpbnN9XG4gKiAgICAgICh4fHkpKG1pbnxtYXgpIGFyZSB0aGUgYm91bmRpbmcgcmVjdCBvZiB0aGUgcG9seWdvblxuICogICAgICBwdHMgaXMgdGhlIG9yaWdpbmFsIGFycmF5LCB3aXRoIHRoZSBmaXJzdCBwYWlyIHJlcGVhdGVkIGF0IHRoZSBlbmRcbiAqICAgICAgY29udGFpbnMgaXMgYSBmdW5jdGlvbjogKHB0LCBvbWl0Rmlyc3RFZGdlKVxuICogICAgICAgICAgcHQgaXMgdGhlIFt4LCB5XSBwYWlyIHRvIHRlc3RcbiAqICAgICAgICAgIG9taXRGaXJzdEVkZ2UgdHJ1dGh5IG1lYW5zIHBvaW50cyBleGFjdGx5IG9uIHRoZSBmaXJzdCBlZGdlIGRvbid0XG4gKiAgICAgICAgICAgICAgY291bnQuIFRoaXMgaXMgZm9yIHVzZSBhZGRpbmcgb25lIHBvbHlnb24gdG8gYW5vdGhlciBzbyB3ZVxuICogICAgICAgICAgICAgIGRvbid0IGRvdWJsZS1jb3VudCB0aGUgZWRnZSB3aGVyZSB0aGV5IG1lZXQuXG4gKiAgICAgICAgICByZXR1cm5zIGJvb2xlYW46IGlzIHB0IGluc2lkZSB0aGUgcG9seWdvbiAoaW5jbHVkaW5nIG9uIGl0cyBlZGdlcylcbiAqL1xucG9seWdvbi50ZXN0ZXIgPSBmdW5jdGlvbiB0ZXN0ZXIocHRzSW4pIHtcbiAgICB2YXIgcHRzID0gcHRzSW4uc2xpY2UoKTtcbiAgICB2YXIgeG1pbiA9IHB0c1swXVswXTtcbiAgICB2YXIgeG1heCA9IHhtaW47XG4gICAgdmFyIHltaW4gPSBwdHNbMF1bMV07XG4gICAgdmFyIHltYXggPSB5bWluO1xuICAgIHZhciBpO1xuXG4gICAgcHRzLnB1c2gocHRzWzBdKTtcbiAgICBmb3IoaSA9IDE7IGkgPCBwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgeG1pbiA9IE1hdGgubWluKHhtaW4sIHB0c1tpXVswXSk7XG4gICAgICAgIHhtYXggPSBNYXRoLm1heCh4bWF4LCBwdHNbaV1bMF0pO1xuICAgICAgICB5bWluID0gTWF0aC5taW4oeW1pbiwgcHRzW2ldWzFdKTtcbiAgICAgICAgeW1heCA9IE1hdGgubWF4KHltYXgsIHB0c1tpXVsxXSk7XG4gICAgfVxuXG4gICAgLy8gZG8gd2UgaGF2ZSBhIHJlY3RhbmdsZT8gSGFuZGxlIHRoaXMgaGVyZSwgc28gd2UgY2FuIHVzZSB0aGUgc2FtZVxuICAgIC8vIHRlc3RlciBmb3IgdGhlIHJlY3Rhbmd1bGFyIGNhc2Ugd2l0aG91dCBzYWNyaWZpY2luZyBzcGVlZFxuXG4gICAgdmFyIGlzUmVjdCA9IGZhbHNlO1xuICAgIHZhciByZWN0Rmlyc3RFZGdlVGVzdDtcblxuICAgIGlmKHB0cy5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgaWYocHRzWzBdWzBdID09PSBwdHNbMV1bMF0pIHsgLy8gdmVydCwgaG9yeiwgdmVydCwgaG9yelxuICAgICAgICAgICAgaWYocHRzWzJdWzBdID09PSBwdHNbM11bMF0gJiZcbiAgICAgICAgICAgICAgICAgICAgcHRzWzBdWzFdID09PSBwdHNbM11bMV0gJiZcbiAgICAgICAgICAgICAgICAgICAgcHRzWzFdWzFdID09PSBwdHNbMl1bMV0pIHtcbiAgICAgICAgICAgICAgICBpc1JlY3QgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlY3RGaXJzdEVkZ2VUZXN0ID0gZnVuY3Rpb24ocHQpIHsgcmV0dXJuIHB0WzBdID09PSBwdHNbMF1bMF07IH07XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihwdHNbMF1bMV0gPT09IHB0c1sxXVsxXSkgeyAvLyBob3J6LCB2ZXJ0LCBob3J6LCB2ZXJ0XG4gICAgICAgICAgICBpZihwdHNbMl1bMV0gPT09IHB0c1szXVsxXSAmJlxuICAgICAgICAgICAgICAgICAgICBwdHNbMF1bMF0gPT09IHB0c1szXVswXSAmJlxuICAgICAgICAgICAgICAgICAgICBwdHNbMV1bMF0gPT09IHB0c1syXVswXSkge1xuICAgICAgICAgICAgICAgIGlzUmVjdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVjdEZpcnN0RWRnZVRlc3QgPSBmdW5jdGlvbihwdCkgeyByZXR1cm4gcHRbMV0gPT09IHB0c1swXVsxXTsgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlY3RDb250YWlucyhwdCwgb21pdEZpcnN0RWRnZSkge1xuICAgICAgICB2YXIgeCA9IHB0WzBdO1xuICAgICAgICB2YXIgeSA9IHB0WzFdO1xuXG4gICAgICAgIGlmKHggPT09IEJBRE5VTSB8fCB4IDwgeG1pbiB8fCB4ID4geG1heCB8fCB5ID09PSBCQUROVU0gfHwgeSA8IHltaW4gfHwgeSA+IHltYXgpIHtcbiAgICAgICAgICAgIC8vIHB0IGlzIG91dHNpZGUgdGhlIGJvdW5kaW5nIGJveCBvZiBwb2x5Z29uXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYob21pdEZpcnN0RWRnZSAmJiByZWN0Rmlyc3RFZGdlVGVzdChwdCkpIHJldHVybiBmYWxzZTtcblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb250YWlucyhwdCwgb21pdEZpcnN0RWRnZSkge1xuICAgICAgICB2YXIgeCA9IHB0WzBdO1xuICAgICAgICB2YXIgeSA9IHB0WzFdO1xuXG4gICAgICAgIGlmKHggPT09IEJBRE5VTSB8fCB4IDwgeG1pbiB8fCB4ID4geG1heCB8fCB5ID09PSBCQUROVU0gfHwgeSA8IHltaW4gfHwgeSA+IHltYXgpIHtcbiAgICAgICAgICAgIC8vIHB0IGlzIG91dHNpZGUgdGhlIGJvdW5kaW5nIGJveCBvZiBwb2x5Z29uXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW1heCA9IHB0cy5sZW5ndGg7XG4gICAgICAgIHZhciB4MSA9IHB0c1swXVswXTtcbiAgICAgICAgdmFyIHkxID0gcHRzWzBdWzFdO1xuICAgICAgICB2YXIgY3Jvc3NpbmdzID0gMDtcbiAgICAgICAgdmFyIGk7XG4gICAgICAgIHZhciB4MDtcbiAgICAgICAgdmFyIHkwO1xuICAgICAgICB2YXIgeG1pbmk7XG4gICAgICAgIHZhciB5Y3Jvc3M7XG5cbiAgICAgICAgZm9yKGkgPSAxOyBpIDwgaW1heDsgaSsrKSB7XG4gICAgICAgICAgICAvLyBmaW5kIGFsbCBjcm9zc2luZ3Mgb2YgYSB2ZXJ0aWNhbCBsaW5lIHVwd2FyZCBmcm9tIHB0IHdpdGhcbiAgICAgICAgICAgIC8vIHBvbHlnb24gc2VnbWVudHNcbiAgICAgICAgICAgIC8vIGNyb3NzaW5ncyBleGFjdGx5IGF0IHhtYXggZG9uJ3QgY291bnQsIHVubGVzcyB0aGUgcG9pbnQgaXNcbiAgICAgICAgICAgIC8vIGV4YWN0bHkgb24gdGhlIHNlZ21lbnQsIHRoZW4gaXQgY291bnRzIGFzIGluc2lkZS5cbiAgICAgICAgICAgIHgwID0geDE7XG4gICAgICAgICAgICB5MCA9IHkxO1xuICAgICAgICAgICAgeDEgPSBwdHNbaV1bMF07XG4gICAgICAgICAgICB5MSA9IHB0c1tpXVsxXTtcbiAgICAgICAgICAgIHhtaW5pID0gTWF0aC5taW4oeDAsIHgxKTtcblxuICAgICAgICAgICAgaWYoeCA8IHhtaW5pIHx8IHggPiBNYXRoLm1heCh4MCwgeDEpIHx8IHkgPiBNYXRoLm1heCh5MCwgeTEpKSB7XG4gICAgICAgICAgICAgICAgLy8gb3V0c2lkZSB0aGUgYm91bmRpbmcgYm94IG9mIHRoaXMgc2VnbWVudCwgaXQncyBvbmx5IGEgY3Jvc3NpbmdcbiAgICAgICAgICAgICAgICAvLyBpZiBpdCdzIGJlbG93IHRoZSBib3guXG5cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZih5IDwgTWF0aC5taW4oeTAsIHkxKSkge1xuICAgICAgICAgICAgICAgIC8vIGRvbid0IGNvdW50IHRoZSBsZWZ0LW1vc3QgcG9pbnQgb2YgdGhlIHNlZ21lbnQgYXMgYSBjcm9zc2luZ1xuICAgICAgICAgICAgICAgIC8vIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBkb3VibGUtY291bnQgYWRqYWNlbnQgY3Jvc3NpbmdzXG4gICAgICAgICAgICAgICAgLy8gVU5MRVNTIHRoZSBwb2x5Z29uIHR1cm5zIHBhc3QgdmVydGljYWwgYXQgZXhhY3RseSB0aGlzIHhcbiAgICAgICAgICAgICAgICAvLyBOb3RlIHRoYXQgdGhpcyBpcyByZXBlYXRlZCBiZWxvdywgYnV0IHdlIGNhbid0IGZhY3RvciBpdCBvdXRcbiAgICAgICAgICAgICAgICAvLyBiZWNhdXNlXG4gICAgICAgICAgICAgICAgaWYoeCAhPT0geG1pbmkpIGNyb3NzaW5ncysrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBpbnNpZGUgdGhlIGJvdW5kaW5nIGJveCwgY2hlY2sgdGhlIGFjdHVhbCBsaW5lIGludGVyY2VwdFxuXG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgc2VnbWVudCAtIHdlIGtub3cgYWxyZWFkeSB0aGF0IHRoZSBwb2ludCBpcyBleGFjdGx5XG4gICAgICAgICAgICAgICAgLy8gb24gdGhlIHNlZ21lbnQsIHNvIG1hcmsgdGhlIGNyb3NzaW5nIGFzIGV4YWN0bHkgYXQgdGhlIHBvaW50LlxuICAgICAgICAgICAgICAgIGlmKHgxID09PSB4MCkgeWNyb3NzID0geTtcbiAgICAgICAgICAgICAgICAvLyBhbnkgb3RoZXIgYW5nbGVcbiAgICAgICAgICAgICAgICBlbHNlIHljcm9zcyA9IHkwICsgKHggLSB4MCkgKiAoeTEgLSB5MCkgLyAoeDEgLSB4MCk7XG5cbiAgICAgICAgICAgICAgICAvLyBleGFjdGx5IG9uIHRoZSBlZGdlOiBjb3VudHMgYXMgaW5zaWRlIHRoZSBwb2x5Z29uLCB1bmxlc3MgaXQncyB0aGVcbiAgICAgICAgICAgICAgICAvLyBmaXJzdCBlZGdlIGFuZCB3ZSdyZSBvbWl0dGluZyBpdC5cbiAgICAgICAgICAgICAgICBpZih5ID09PSB5Y3Jvc3MpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoaSA9PT0gMSAmJiBvbWl0Rmlyc3RFZGdlKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKHkgPD0geWNyb3NzICYmIHggIT09IHhtaW5pKSBjcm9zc2luZ3MrKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIHdlJ3ZlIGdvdHRlbiB0aGlzIGZhciwgb2RkIGNyb3NzaW5ncyBtZWFucyBpbnNpZGUsIGV2ZW4gaXMgb3V0c2lkZVxuICAgICAgICByZXR1cm4gY3Jvc3NpbmdzICUgMiA9PT0gMTtcbiAgICB9XG5cbiAgICAvLyBkZXRlY3QgaWYgcG9seSBpcyBkZWdlbmVyYXRlXG4gICAgdmFyIGRlZ2VuZXJhdGUgPSB0cnVlO1xuICAgIHZhciBsYXN0UHQgPSBwdHNbMF07XG4gICAgZm9yKGkgPSAxOyBpIDwgcHRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKGxhc3RQdFswXSAhPT0gcHRzW2ldWzBdIHx8IGxhc3RQdFsxXSAhPT0gcHRzW2ldWzFdKSB7XG4gICAgICAgICAgICBkZWdlbmVyYXRlID0gZmFsc2U7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHhtaW46IHhtaW4sXG4gICAgICAgIHhtYXg6IHhtYXgsXG4gICAgICAgIHltaW46IHltaW4sXG4gICAgICAgIHltYXg6IHltYXgsXG4gICAgICAgIHB0czogcHRzLFxuICAgICAgICBjb250YWluczogaXNSZWN0ID8gcmVjdENvbnRhaW5zIDogY29udGFpbnMsXG4gICAgICAgIGlzUmVjdDogaXNSZWN0LFxuICAgICAgICBkZWdlbmVyYXRlOiBkZWdlbmVyYXRlXG4gICAgfTtcbn07XG5cbi8qKlxuICogVGVzdCBpZiBhIHNlZ21lbnQgb2YgYSBwb2ludHMgYXJyYXkgaXMgYmVudCBvciBzdHJhaWdodFxuICpcbiAqIEBwYXJhbSBwdHMgQXJyYXkgb2YgW3gsIHldIHBhaXJzXG4gKiBAcGFyYW0gc3RhcnQgdGhlIGluZGV4IG9mIHRoZSBwcm9wb3NlZCBzdGFydCBvZiB0aGUgc3RyYWlnaHQgc2VjdGlvblxuICogQHBhcmFtIGVuZCB0aGUgaW5kZXggb2YgdGhlIHByb3Bvc2VkIGVuZCBwb2ludFxuICogQHBhcmFtIHRvbGVyYW5jZSB0aGUgbWF4IGRpc3RhbmNlIG9mZiB0aGUgbGluZSBjb25uZWN0aW5nIHN0YXJ0IGFuZCBlbmRcbiAqICAgICAgYmVmb3JlIHRoZSBsaW5lIGNvdW50cyBhcyBiZW50XG4gKiBAcmV0dXJucyBib29sZWFuOiB0cnVlIG1lYW5zIHRoaXMgc2VnbWVudCBpcyBiZW50LCBmYWxzZSBtZWFucyBzdHJhaWdodFxuICovXG5wb2x5Z29uLmlzU2VnbWVudEJlbnQgPSBmdW5jdGlvbiBpc1NlZ21lbnRCZW50KHB0cywgc3RhcnQsIGVuZCwgdG9sZXJhbmNlKSB7XG4gICAgdmFyIHN0YXJ0UHQgPSBwdHNbc3RhcnRdO1xuICAgIHZhciBzZWdtZW50ID0gW3B0c1tlbmRdWzBdIC0gc3RhcnRQdFswXSwgcHRzW2VuZF1bMV0gLSBzdGFydFB0WzFdXTtcbiAgICB2YXIgc2VnbWVudFNxdWFyZWQgPSBkb3Qoc2VnbWVudCwgc2VnbWVudCk7XG4gICAgdmFyIHNlZ21lbnRMZW4gPSBNYXRoLnNxcnQoc2VnbWVudFNxdWFyZWQpO1xuICAgIHZhciB1bml0UGVycCA9IFstc2VnbWVudFsxXSAvIHNlZ21lbnRMZW4sIHNlZ21lbnRbMF0gLyBzZWdtZW50TGVuXTtcbiAgICB2YXIgaTtcbiAgICB2YXIgcGFydDtcbiAgICB2YXIgcGFydFBhcmFsbGVsO1xuXG4gICAgZm9yKGkgPSBzdGFydCArIDE7IGkgPCBlbmQ7IGkrKykge1xuICAgICAgICBwYXJ0ID0gW3B0c1tpXVswXSAtIHN0YXJ0UHRbMF0sIHB0c1tpXVsxXSAtIHN0YXJ0UHRbMV1dO1xuICAgICAgICBwYXJ0UGFyYWxsZWwgPSBkb3QocGFydCwgc2VnbWVudCk7XG5cbiAgICAgICAgaWYocGFydFBhcmFsbGVsIDwgMCB8fCBwYXJ0UGFyYWxsZWwgPiBzZWdtZW50U3F1YXJlZCB8fFxuICAgICAgICAgICAgTWF0aC5hYnMoZG90KHBhcnQsIHVuaXRQZXJwKSkgPiB0b2xlcmFuY2UpIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59O1xuXG4vKipcbiAqIE1ha2UgYSBmaWx0ZXJpbmcgcG9seWdvbiwgdG8gbWluaW1pemUgdGhlIG51bWJlciBvZiBzZWdtZW50c1xuICpcbiAqIEBwYXJhbSBwdHMgQXJyYXkgb2YgW3gsIHldIHBhaXJzIChtdXN0IHN0YXJ0IHdpdGggYXQgbGVhc3QgMSBwYWlyKVxuICogQHBhcmFtIHRvbGVyYW5jZSB0aGUgbWF4aW11bSBkZXZpYXRpb24gZnJvbSBzdHJhaWdodCBhbGxvd2VkIGZvclxuICogICAgICByZW1vdmluZyBwb2ludHMgdG8gc2ltcGxpZnkgdGhlIHBvbHlnb25cbiAqXG4gKiBAcmV0dXJucyBPYmplY3Qge2FkZFB0LCByYXcsIGZpbHRlcmVkfVxuICogICAgICBhZGRQdCBpcyBhIGZ1bmN0aW9uKHB0OiBbeCwgeV0gcGFpcikgdG8gYWRkIGEgcmF3IHBvaW50IGFuZFxuICogICAgICAgICAgY29udGludWUgZmlsdGVyaW5nXG4gKiAgICAgIHJhdyBpcyBhbGwgdGhlIGlucHV0IHBvaW50c1xuICogICAgICBmaWx0ZXJlZCBpcyB0aGUgcmVzdWx0aW5nIGZpbHRlcmVkIEFycmF5IG9mIFt4LCB5XSBwYWlyc1xuICovXG5wb2x5Z29uLmZpbHRlciA9IGZ1bmN0aW9uIGZpbHRlcihwdHMsIHRvbGVyYW5jZSkge1xuICAgIHZhciBwdHNGaWx0ZXJlZCA9IFtwdHNbMF1dO1xuICAgIHZhciBkb25lUmF3SW5kZXggPSAwO1xuICAgIHZhciBkb25lRmlsdGVyZWRJbmRleCA9IDA7XG5cbiAgICBmdW5jdGlvbiBhZGRQdChwdCkge1xuICAgICAgICBwdHMucHVzaChwdCk7XG4gICAgICAgIHZhciBwcmV2RmlsdGVyTGVuID0gcHRzRmlsdGVyZWQubGVuZ3RoO1xuICAgICAgICB2YXIgaUxhc3QgPSBkb25lUmF3SW5kZXg7XG4gICAgICAgIHB0c0ZpbHRlcmVkLnNwbGljZShkb25lRmlsdGVyZWRJbmRleCArIDEpO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IGlMYXN0ICsgMTsgaSA8IHB0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYoaSA9PT0gcHRzLmxlbmd0aCAtIDEgfHwgcG9seWdvbi5pc1NlZ21lbnRCZW50KHB0cywgaUxhc3QsIGkgKyAxLCB0b2xlcmFuY2UpKSB7XG4gICAgICAgICAgICAgICAgcHRzRmlsdGVyZWQucHVzaChwdHNbaV0pO1xuICAgICAgICAgICAgICAgIGlmKHB0c0ZpbHRlcmVkLmxlbmd0aCA8IHByZXZGaWx0ZXJMZW4gLSAyKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbmVSYXdJbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGRvbmVGaWx0ZXJlZEluZGV4ID0gcHRzRmlsdGVyZWQubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaUxhc3QgPSBpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYocHRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdmFyIGxhc3RQdCA9IHB0cy5wb3AoKTtcbiAgICAgICAgYWRkUHQobGFzdFB0KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBhZGRQdDogYWRkUHQsXG4gICAgICAgIHJhdzogcHRzLFxuICAgICAgICBmaWx0ZXJlZDogcHRzRmlsdGVyZWRcbiAgICB9O1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uL3JlZ2lzdHJ5Jyk7XG52YXIgUGxvdHMgPSByZXF1aXJlKCcuLi9wbG90cy9wbG90cycpO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vbGliJyk7XG52YXIgY2xlYXJHbENhbnZhc2VzID0gcmVxdWlyZSgnLi4vbGliL2NsZWFyX2dsX2NhbnZhc2VzJyk7XG5cbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29sb3InKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgVGl0bGVzID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy90aXRsZXMnKTtcbnZhciBNb2RlQmFyID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9tb2RlYmFyJyk7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBhbGlnbm1lbnRDb25zdGFudHMgPSByZXF1aXJlKCcuLi9jb25zdGFudHMvYWxpZ25tZW50Jyk7XG52YXIgYXhpc0NvbnN0cmFpbnRzID0gcmVxdWlyZSgnLi4vcGxvdHMvY2FydGVzaWFuL2NvbnN0cmFpbnRzJyk7XG52YXIgZW5mb3JjZUF4aXNDb25zdHJhaW50cyA9IGF4aXNDb25zdHJhaW50cy5lbmZvcmNlO1xudmFyIGNsZWFuQXhpc0NvbnN0cmFpbnRzID0gYXhpc0NvbnN0cmFpbnRzLmNsZWFuO1xudmFyIGRvQXV0b1JhbmdlID0gcmVxdWlyZSgnLi4vcGxvdHMvY2FydGVzaWFuL2F1dG9yYW5nZScpLmRvQXV0b1JhbmdlO1xuXG52YXIgU1ZHX1RFWFRfQU5DSE9SX1NUQVJUID0gJ3N0YXJ0JztcbnZhciBTVkdfVEVYVF9BTkNIT1JfTUlERExFID0gJ21pZGRsZSc7XG52YXIgU1ZHX1RFWFRfQU5DSE9SX0VORCA9ICdlbmQnO1xuXG5leHBvcnRzLmxheW91dFN0eWxlcyA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgcmV0dXJuIExpYi5zeW5jT3JBc3luYyhbUGxvdHMuZG9BdXRvTWFyZ2luLCBsc0lubmVyXSwgZ2QpO1xufTtcblxuZnVuY3Rpb24gb3ZlcmxhcHBpbmdEb21haW4oeERvbWFpbiwgeURvbWFpbiwgZG9tYWlucykge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkb21haW5zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBleGlzdGluZ1ggPSBkb21haW5zW2ldWzBdO1xuICAgICAgICB2YXIgZXhpc3RpbmdZID0gZG9tYWluc1tpXVsxXTtcblxuICAgICAgICBpZihleGlzdGluZ1hbMF0gPj0geERvbWFpblsxXSB8fCBleGlzdGluZ1hbMV0gPD0geERvbWFpblswXSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYoZXhpc3RpbmdZWzBdIDwgeURvbWFpblsxXSAmJiBleGlzdGluZ1lbMV0gPiB5RG9tYWluWzBdKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGxzSW5uZXIoZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBncyA9IGZ1bGxMYXlvdXQuX3NpemU7XG4gICAgdmFyIHBhZCA9IGdzLnA7XG4gICAgdmFyIGF4TGlzdCA9IEF4ZXMubGlzdChnZCwgJycsIHRydWUpO1xuICAgIHZhciBpLCBzdWJwbG90LCBwbG90aW5mbywgYXgsIHhhLCB5YTtcblxuICAgIGZ1bGxMYXlvdXQuX3BhcGVyZGl2LnN0eWxlKHtcbiAgICAgICAgd2lkdGg6IChnZC5fY29udGV4dC5yZXNwb25zaXZlICYmIGZ1bGxMYXlvdXQuYXV0b3NpemUgJiYgIWdkLl9jb250ZXh0Ll9oYXNaZXJvV2lkdGggJiYgIWdkLmxheW91dC53aWR0aCkgPyAnMTAwJScgOiBmdWxsTGF5b3V0LndpZHRoICsgJ3B4JyxcbiAgICAgICAgaGVpZ2h0OiAoZ2QuX2NvbnRleHQucmVzcG9uc2l2ZSAmJiBmdWxsTGF5b3V0LmF1dG9zaXplICYmICFnZC5fY29udGV4dC5faGFzWmVyb0hlaWdodCAmJiAhZ2QubGF5b3V0LmhlaWdodCkgPyAnMTAwJScgOiBmdWxsTGF5b3V0LmhlaWdodCArICdweCdcbiAgICB9KVxuICAgIC5zZWxlY3RBbGwoJy5tYWluLXN2ZycpXG4gICAgLmNhbGwoRHJhd2luZy5zZXRTaXplLCBmdWxsTGF5b3V0LndpZHRoLCBmdWxsTGF5b3V0LmhlaWdodCk7XG4gICAgZ2QuX2NvbnRleHQuc2V0QmFja2dyb3VuZChnZCwgZnVsbExheW91dC5wYXBlcl9iZ2NvbG9yKTtcblxuICAgIGV4cG9ydHMuZHJhd01haW5UaXRsZShnZCk7XG4gICAgTW9kZUJhci5tYW5hZ2UoZ2QpO1xuXG4gICAgLy8gX2hhcygnY2FydGVzaWFuJykgbWVhbnMgU1ZHIHNwZWNpZmljYWxseSwgbm90IEdMMkQgLSBidXQgR0wyRFxuICAgIC8vIGNhbiBzdGlsbCBnZXQgaGVyZSBiZWNhdXNlIGl0IG1ha2VzIHNvbWUgb2YgdGhlIFNWRyBzdHJ1Y3R1cmVcbiAgICAvLyBmb3Igc2hhcmVkIGZlYXR1cmVzIGxpa2Ugc2VsZWN0aW9ucy5cbiAgICBpZighZnVsbExheW91dC5faGFzKCdjYXJ0ZXNpYW4nKSkge1xuICAgICAgICByZXR1cm4gUGxvdHMucHJldmlvdXNQcm9taXNlcyhnZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0TGluZVBvc2l0aW9uKGF4LCBjb3VudGVyQXgsIHNpZGUpIHtcbiAgICAgICAgdmFyIGx3SGFsZiA9IGF4Ll9sdyAvIDI7XG5cbiAgICAgICAgaWYoYXguX2lkLmNoYXJBdCgwKSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICBpZighY291bnRlckF4KSByZXR1cm4gZ3MudCArIGdzLmggKiAoMSAtIChheC5wb3NpdGlvbiB8fCAwKSkgKyAobHdIYWxmICUgMSk7XG4gICAgICAgICAgICBlbHNlIGlmKHNpZGUgPT09ICd0b3AnKSByZXR1cm4gY291bnRlckF4Ll9vZmZzZXQgLSBwYWQgLSBsd0hhbGY7XG4gICAgICAgICAgICByZXR1cm4gY291bnRlckF4Ll9vZmZzZXQgKyBjb3VudGVyQXguX2xlbmd0aCArIHBhZCArIGx3SGFsZjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKCFjb3VudGVyQXgpIHJldHVybiBncy5sICsgZ3MudyAqIChheC5wb3NpdGlvbiB8fCAwKSArIChsd0hhbGYgJSAxKTtcbiAgICAgICAgZWxzZSBpZihzaWRlID09PSAncmlnaHQnKSByZXR1cm4gY291bnRlckF4Ll9vZmZzZXQgKyBjb3VudGVyQXguX2xlbmd0aCArIHBhZCArIGx3SGFsZjtcbiAgICAgICAgcmV0dXJuIGNvdW50ZXJBeC5fb2Zmc2V0IC0gcGFkIC0gbHdIYWxmO1xuICAgIH1cblxuICAgIC8vIHNvbWUgcHJlcGFyYXRpb24gb2YgYXhpcyBwb3NpdGlvbiBpbmZvXG4gICAgZm9yKGkgPSAwOyBpIDwgYXhMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGF4ID0gYXhMaXN0W2ldO1xuXG4gICAgICAgIHZhciBjb3VudGVyQXggPSBheC5fYW5jaG9yQXhpcztcblxuICAgICAgICAvLyBjbGVhciBheGlzIGxpbmUgcG9zaXRpb25zLCB0byBiZSBzZXQgaW4gdGhlIHN1YnBsb3QgbG9vcCBiZWxvd1xuICAgICAgICBheC5fbGluZXBvc2l0aW9ucyA9IHt9O1xuXG4gICAgICAgIC8vIHN0YXNoIGNyaXNwUm91bmRlZCBsaW5ld2lkdGggc28gd2UgZG9uJ3QgbmVlZCB0byBwYXNzIGdkIGFsbCBvdmVyIHRoZSBwbGFjZVxuICAgICAgICBheC5fbHcgPSBEcmF3aW5nLmNyaXNwUm91bmQoZ2QsIGF4LmxpbmV3aWR0aCwgMSk7XG5cbiAgICAgICAgLy8gZmlndXJlIG91dCB0aGUgbWFpbiBheGlzIGxpbmUgYW5kIG1haW4gbWlycm9yIGxpbmUgcG9zaXRpb24uXG4gICAgICAgIC8vIGl0J3MgZWFzaWVyIHRvIGZvbGxvdyB0aGUgbG9naWMgaWYgd2UgaGFuZGxlIHRoZXNlIHNlcGFyYXRlbHkgZnJvbVxuICAgICAgICAvLyBheC5fbGluZXBvc2l0aW9ucywgd2hpY2ggYXJlIG9ubHkgdXNlZCBieSBtaXJyb3I9YWxsdGlja3NcbiAgICAgICAgLy8gZm9yIG5vbi1tYWluLXN1YnBsb3QgdGlja3MsIGFuZCBtaXJyb3I9YWxsKHRpY2tzKT8gZm9yIHplcm8gbGluZVxuICAgICAgICAvLyBoaWRpbmcgbG9naWNcbiAgICAgICAgYXguX21haW5MaW5lUG9zaXRpb24gPSBnZXRMaW5lUG9zaXRpb24oYXgsIGNvdW50ZXJBeCwgYXguc2lkZSk7XG4gICAgICAgIGF4Ll9tYWluTWlycm9yUG9zaXRpb24gPSAoYXgubWlycm9yICYmIGNvdW50ZXJBeCkgP1xuICAgICAgICAgICAgZ2V0TGluZVBvc2l0aW9uKGF4LCBjb3VudGVyQXgsXG4gICAgICAgICAgICAgICAgYWxpZ25tZW50Q29uc3RhbnRzLk9QUE9TSVRFX1NJREVbYXguc2lkZV0pIDogbnVsbDtcbiAgICB9XG5cbiAgICAvLyBmaWd1cmUgb3V0IHdoaWNoIGJhY2tncm91bmRzIHdlIG5lZWQgdG8gZHJhdyxcbiAgICAvLyBhbmQgaW4gd2hpY2ggbGF5ZXJzIHRvIHB1dCB0aGVtXG4gICAgdmFyIGxvd2VyQmFja2dyb3VuZElEcyA9IFtdO1xuICAgIHZhciBiYWNrZ3JvdW5kSWRzID0gW107XG4gICAgdmFyIGxvd2VyRG9tYWlucyA9IFtdO1xuICAgIC8vIG5vIG5lZWQgdG8gZHJhdyBiYWNrZ3JvdW5kIHdoZW4gcGFwZXIgYW5kIHBsb3QgY29sb3IgYXJlIHRoZSBzYW1lIGNvbG9yLFxuICAgIC8vIGFjdGl2YXRlIG1vZGUganVzdCBmb3IgbGFyZ2Ugc3Bsb20gKHdoaWNoIGJlbmVmaXQgdGhlIG1vc3QgZnJvbSB0aGlzXG4gICAgLy8gb3B0aW1pemF0aW9uKSwgYnV0IHRoaXMgY291bGQgYXBwbHkgdG8gYWxsIGNhcnRlc2lhbiBzdWJwbG90cy5cbiAgICB2YXIgbm9OZWVkRm9yQmcgPSAoXG4gICAgICAgIENvbG9yLm9wYWNpdHkoZnVsbExheW91dC5wYXBlcl9iZ2NvbG9yKSA9PT0gMSAmJlxuICAgICAgICBDb2xvci5vcGFjaXR5KGZ1bGxMYXlvdXQucGxvdF9iZ2NvbG9yKSA9PT0gMSAmJlxuICAgICAgICBmdWxsTGF5b3V0LnBhcGVyX2JnY29sb3IgPT09IGZ1bGxMYXlvdXQucGxvdF9iZ2NvbG9yXG4gICAgKTtcblxuICAgIGZvcihzdWJwbG90IGluIGZ1bGxMYXlvdXQuX3Bsb3RzKSB7XG4gICAgICAgIHBsb3RpbmZvID0gZnVsbExheW91dC5fcGxvdHNbc3VicGxvdF07XG5cbiAgICAgICAgaWYocGxvdGluZm8ubWFpbnBsb3QpIHtcbiAgICAgICAgICAgIC8vIG1haW5wbG90IGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBtYWluIHBsb3QgdGhpcyBvbmUgaXMgb3ZlcmxhaWQgb25cbiAgICAgICAgICAgIC8vIHNvIGlmIGl0IGV4aXN0cywgdGhpcyBpcyBhbiBvdmVybGFpZCBwbG90IGFuZCB3ZSBkb24ndCBuZWVkIHRvXG4gICAgICAgICAgICAvLyBnaXZlIGl0IGl0cyBvd24gYmFja2dyb3VuZFxuICAgICAgICAgICAgaWYocGxvdGluZm8uYmcpIHtcbiAgICAgICAgICAgICAgICBwbG90aW5mby5iZy5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHBsb3RpbmZvLmJnID0gdW5kZWZpbmVkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHhEb21haW4gPSBwbG90aW5mby54YXhpcy5kb21haW47XG4gICAgICAgICAgICB2YXIgeURvbWFpbiA9IHBsb3RpbmZvLnlheGlzLmRvbWFpbjtcbiAgICAgICAgICAgIHZhciBwbG90Z3JvdXAgPSBwbG90aW5mby5wbG90Z3JvdXA7XG5cbiAgICAgICAgICAgIGlmKG92ZXJsYXBwaW5nRG9tYWluKHhEb21haW4sIHlEb21haW4sIGxvd2VyRG9tYWlucykpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGdOb2RlID0gcGxvdGdyb3VwLm5vZGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgcGxvdGdyb3VwQmcgPSBwbG90aW5mby5iZyA9IExpYi5lbnN1cmVTaW5nbGUocGxvdGdyb3VwLCAncmVjdCcsICdiZycpO1xuICAgICAgICAgICAgICAgIHBnTm9kZS5pbnNlcnRCZWZvcmUocGxvdGdyb3VwQmcubm9kZSgpLCBwZ05vZGUuY2hpbGROb2Rlc1swXSk7XG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZElkcy5wdXNoKHN1YnBsb3QpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwbG90Z3JvdXAuc2VsZWN0KCdyZWN0LmJnJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgbG93ZXJEb21haW5zLnB1c2goW3hEb21haW4sIHlEb21haW5dKTtcbiAgICAgICAgICAgICAgICBpZighbm9OZWVkRm9yQmcpIHtcbiAgICAgICAgICAgICAgICAgICAgbG93ZXJCYWNrZ3JvdW5kSURzLnB1c2goc3VicGxvdCk7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRJZHMucHVzaChzdWJwbG90KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBub3cgY3JlYXRlIGFsbCB0aGUgbG93ZXItbGF5ZXIgYmFja2dyb3VuZHMgYXQgb25jZSBub3cgdGhhdFxuICAgIC8vIHdlIGhhdmUgdGhlIGxpc3Qgb2Ygc3VicGxvdHMgdGhhdCBuZWVkIHRoZW1cbiAgICB2YXIgbG93ZXJCYWNrZ3JvdW5kcyA9IGZ1bGxMYXlvdXQuX2JnTGF5ZXIuc2VsZWN0QWxsKCcuYmcnKVxuICAgICAgICAuZGF0YShsb3dlckJhY2tncm91bmRJRHMpO1xuXG4gICAgbG93ZXJCYWNrZ3JvdW5kcy5lbnRlcigpLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5jbGFzc2VkKCdiZycsIHRydWUpO1xuXG4gICAgbG93ZXJCYWNrZ3JvdW5kcy5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICBsb3dlckJhY2tncm91bmRzLmVhY2goZnVuY3Rpb24oc3VicGxvdCkge1xuICAgICAgICBmdWxsTGF5b3V0Ll9wbG90c1tzdWJwbG90XS5iZyA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICB9KTtcblxuICAgIC8vIHN0eWxlIGFsbCBiYWNrZ3JvdW5kc1xuICAgIGZvcihpID0gMDsgaSA8IGJhY2tncm91bmRJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcGxvdGluZm8gPSBmdWxsTGF5b3V0Ll9wbG90c1tiYWNrZ3JvdW5kSWRzW2ldXTtcbiAgICAgICAgeGEgPSBwbG90aW5mby54YXhpcztcbiAgICAgICAgeWEgPSBwbG90aW5mby55YXhpcztcblxuICAgICAgICBpZihwbG90aW5mby5iZykge1xuICAgICAgICAgICAgcGxvdGluZm8uYmdcbiAgICAgICAgICAgICAgICAuY2FsbChEcmF3aW5nLnNldFJlY3QsXG4gICAgICAgICAgICAgICAgICAgIHhhLl9vZmZzZXQgLSBwYWQsIHlhLl9vZmZzZXQgLSBwYWQsXG4gICAgICAgICAgICAgICAgICAgIHhhLl9sZW5ndGggKyAyICogcGFkLCB5YS5fbGVuZ3RoICsgMiAqIHBhZClcbiAgICAgICAgICAgICAgICAuY2FsbChDb2xvci5maWxsLCBmdWxsTGF5b3V0LnBsb3RfYmdjb2xvcilcbiAgICAgICAgICAgICAgICAuc3R5bGUoJ3N0cm9rZS13aWR0aCcsIDApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYoIWZ1bGxMYXlvdXQuX2hhc09ubHlMYXJnZVNwbG9tcykge1xuICAgICAgICBmb3Ioc3VicGxvdCBpbiBmdWxsTGF5b3V0Ll9wbG90cykge1xuICAgICAgICAgICAgcGxvdGluZm8gPSBmdWxsTGF5b3V0Ll9wbG90c1tzdWJwbG90XTtcbiAgICAgICAgICAgIHhhID0gcGxvdGluZm8ueGF4aXM7XG4gICAgICAgICAgICB5YSA9IHBsb3RpbmZvLnlheGlzO1xuXG4gICAgICAgICAgICAvLyBDbGlwIHNvIHRoYXQgZGF0YSBvbmx5IHNob3dzIHVwIG9uIHRoZSBwbG90IGFyZWEuXG4gICAgICAgICAgICB2YXIgY2xpcElkID0gcGxvdGluZm8uY2xpcElkID0gJ2NsaXAnICsgZnVsbExheW91dC5fdWlkICsgc3VicGxvdCArICdwbG90JztcblxuICAgICAgICAgICAgdmFyIHBsb3RDbGlwID0gTGliLmVuc3VyZVNpbmdsZUJ5SWQoZnVsbExheW91dC5fY2xpcHMsICdjbGlwUGF0aCcsIGNsaXBJZCwgZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgICAgIHMuY2xhc3NlZCgncGxvdGNsaXAnLCB0cnVlKVxuICAgICAgICAgICAgICAgICAgICAuYXBwZW5kKCdyZWN0Jyk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgcGxvdGluZm8uY2xpcFJlY3QgPSBwbG90Q2xpcC5zZWxlY3QoJ3JlY3QnKS5hdHRyKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogeGEuX2xlbmd0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IHlhLl9sZW5ndGhcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBEcmF3aW5nLnNldFRyYW5zbGF0ZShwbG90aW5mby5wbG90LCB4YS5fb2Zmc2V0LCB5YS5fb2Zmc2V0KTtcblxuICAgICAgICAgICAgdmFyIHBsb3RDbGlwSWQ7XG4gICAgICAgICAgICB2YXIgbGF5ZXJDbGlwSWQ7XG5cbiAgICAgICAgICAgIGlmKHBsb3RpbmZvLl9oYXNDbGlwT25BeGlzRmFsc2UpIHtcbiAgICAgICAgICAgICAgICBwbG90Q2xpcElkID0gbnVsbDtcbiAgICAgICAgICAgICAgICBsYXllckNsaXBJZCA9IGNsaXBJZDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcGxvdENsaXBJZCA9IGNsaXBJZDtcbiAgICAgICAgICAgICAgICBsYXllckNsaXBJZCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIERyYXdpbmcuc2V0Q2xpcFVybChwbG90aW5mby5wbG90LCBwbG90Q2xpcElkLCBnZCk7XG5cbiAgICAgICAgICAgIC8vIHN0YXNoIGxheWVyIGNsaXBJZCB2YWx1ZSAobnVsbCBvciBzYW1lIGFzIGNsaXBJZClcbiAgICAgICAgICAgIC8vIHRvIERSWSB1cCBEcmF3aW5nLnNldENsaXBVcmwgY2FsbHMgb24gdHJhY2UtbW9kdWxlIGFuZCB0cmFjZSBsYXllcnNcbiAgICAgICAgICAgIC8vIGRvd25zdHJlYW1cbiAgICAgICAgICAgIHBsb3RpbmZvLmxheWVyQ2xpcElkID0gbGF5ZXJDbGlwSWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgeExpbmVzWExlZnQsIHhMaW5lc1hSaWdodCwgeExpbmVzWUJvdHRvbSwgeExpbmVzWVRvcCxcbiAgICAgICAgbGVmdFlMaW5lV2lkdGgsIHJpZ2h0WUxpbmVXaWR0aDtcbiAgICB2YXIgeUxpbmVzWUJvdHRvbSwgeUxpbmVzWVRvcCwgeUxpbmVzWExlZnQsIHlMaW5lc1hSaWdodCxcbiAgICAgICAgY29ubmVjdFlCb3R0b20sIGNvbm5lY3RZVG9wO1xuICAgIHZhciBleHRyYVN1YnBsb3Q7XG5cbiAgICBmdW5jdGlvbiB4TGluZVBhdGgoeSkge1xuICAgICAgICByZXR1cm4gJ00nICsgeExpbmVzWExlZnQgKyAnLCcgKyB5ICsgJ0gnICsgeExpbmVzWFJpZ2h0O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHhMaW5lUGF0aEZyZWUoeSkge1xuICAgICAgICByZXR1cm4gJ00nICsgeGEuX29mZnNldCArICcsJyArIHkgKyAnaCcgKyB4YS5fbGVuZ3RoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHlMaW5lUGF0aCh4KSB7XG4gICAgICAgIHJldHVybiAnTScgKyB4ICsgJywnICsgeUxpbmVzWVRvcCArICdWJyArIHlMaW5lc1lCb3R0b207XG4gICAgfVxuXG4gICAgZnVuY3Rpb24geUxpbmVQYXRoRnJlZSh4KSB7XG4gICAgICAgIHJldHVybiAnTScgKyB4ICsgJywnICsgeWEuX29mZnNldCArICd2JyArIHlhLl9sZW5ndGg7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gbWFpblBhdGgoYXgsIHBhdGhGbiwgcGF0aEZuRnJlZSkge1xuICAgICAgICBpZighYXguc2hvd2xpbmUgfHwgc3VicGxvdCAhPT0gYXguX21haW5TdWJwbG90KSByZXR1cm4gJyc7XG4gICAgICAgIGlmKCFheC5fYW5jaG9yQXhpcykgcmV0dXJuIHBhdGhGbkZyZWUoYXguX21haW5MaW5lUG9zaXRpb24pO1xuICAgICAgICB2YXIgb3V0ID0gcGF0aEZuKGF4Ll9tYWluTGluZVBvc2l0aW9uKTtcbiAgICAgICAgaWYoYXgubWlycm9yKSBvdXQgKz0gcGF0aEZuKGF4Ll9tYWluTWlycm9yUG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH1cblxuICAgIGZvcihzdWJwbG90IGluIGZ1bGxMYXlvdXQuX3Bsb3RzKSB7XG4gICAgICAgIHBsb3RpbmZvID0gZnVsbExheW91dC5fcGxvdHNbc3VicGxvdF07XG4gICAgICAgIHhhID0gcGxvdGluZm8ueGF4aXM7XG4gICAgICAgIHlhID0gcGxvdGluZm8ueWF4aXM7XG5cbiAgICAgICAgLypcbiAgICAgICAgICogeCBsaW5lcyBnZXQgbG9uZ2VyIHdoZXJlIHRoZXkgbWVldCB5IGxpbmVzLCB0byBtYWtlIGEgY3Jpc3AgY29ybmVyLlxuICAgICAgICAgKiBUaGUgeCBsaW5lcyBnZXQgdGhlIHBhZGRpbmcgKG1hcmdpbi5wYWQpIHBsdXMgdGhlIHkgbGluZSB3aWR0aCB0b1xuICAgICAgICAgKiBmaWxsIHVwIHRoZSBjb3JuZXIgbmljZWx5LiBGcmVlIHggbGluZXMgYXJlIGV4Y2x1ZGVkIC0gdGhleSBhbHdheXNcbiAgICAgICAgICogc3BhbiBleGFjdGx5IHRoZSBkYXRhIGFyZWEgb2YgdGhlIHBsb3RcbiAgICAgICAgICpcbiAgICAgICAgICogIHwgWFhYWFhcbiAgICAgICAgICogIHwgWFhYWFhcbiAgICAgICAgICogIHxcbiAgICAgICAgICogICstLS0tLS1cbiAgICAgICAgICogICAgIHgxXG4gICAgICAgICAqICAgIC0tLS0tXG4gICAgICAgICAqICAgICB4MlxuICAgICAgICAgKi9cbiAgICAgICAgdmFyIHhQYXRoID0gJ00wLDAnO1xuICAgICAgICBpZihzaG91bGRTaG93TGluZXNPclRpY2tzKHhhLCBzdWJwbG90KSkge1xuICAgICAgICAgICAgbGVmdFlMaW5lV2lkdGggPSBmaW5kQ291bnRlckF4aXNMaW5lV2lkdGgoeGEsICdsZWZ0JywgeWEsIGF4TGlzdCk7XG4gICAgICAgICAgICB4TGluZXNYTGVmdCA9IHhhLl9vZmZzZXQgLSAobGVmdFlMaW5lV2lkdGggPyAocGFkICsgbGVmdFlMaW5lV2lkdGgpIDogMCk7XG4gICAgICAgICAgICByaWdodFlMaW5lV2lkdGggPSBmaW5kQ291bnRlckF4aXNMaW5lV2lkdGgoeGEsICdyaWdodCcsIHlhLCBheExpc3QpO1xuICAgICAgICAgICAgeExpbmVzWFJpZ2h0ID0geGEuX29mZnNldCArIHhhLl9sZW5ndGggKyAocmlnaHRZTGluZVdpZHRoID8gKHBhZCArIHJpZ2h0WUxpbmVXaWR0aCkgOiAwKTtcbiAgICAgICAgICAgIHhMaW5lc1lCb3R0b20gPSBnZXRMaW5lUG9zaXRpb24oeGEsIHlhLCAnYm90dG9tJyk7XG4gICAgICAgICAgICB4TGluZXNZVG9wID0gZ2V0TGluZVBvc2l0aW9uKHhhLCB5YSwgJ3RvcCcpO1xuXG4gICAgICAgICAgICAvLyBzYXZlIGF4aXMgbGluZSBwb3NpdGlvbnMgZm9yIGV4dHJhIHRpY2tzIHRvIHJlZmVyZW5jZVxuICAgICAgICAgICAgLy8gZWFjaCBzdWJwbG90IHRoYXQgZ2V0cyB0aWNrcyBmcm9tIFwiYWxsdGlja3NcIiBnZXRzIGFuIGVudHJ5OlxuICAgICAgICAgICAgLy8gICAgW2xlZnQgb3IgYm90dG9tLCByaWdodCBvciB0b3BdXG4gICAgICAgICAgICBleHRyYVN1YnBsb3QgPSAoIXhhLl9hbmNob3JBeGlzIHx8IHN1YnBsb3QgIT09IHhhLl9tYWluU3VicGxvdCk7XG4gICAgICAgICAgICBpZihleHRyYVN1YnBsb3QgJiYgKHhhLm1pcnJvciA9PT0gJ2FsbHRpY2tzJyB8fCB4YS5taXJyb3IgPT09ICdhbGwnKSkge1xuICAgICAgICAgICAgICAgIHhhLl9saW5lcG9zaXRpb25zW3N1YnBsb3RdID0gW3hMaW5lc1lCb3R0b20sIHhMaW5lc1lUb3BdO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB4UGF0aCA9IG1haW5QYXRoKHhhLCB4TGluZVBhdGgsIHhMaW5lUGF0aEZyZWUpO1xuICAgICAgICAgICAgaWYoZXh0cmFTdWJwbG90ICYmIHhhLnNob3dsaW5lICYmICh4YS5taXJyb3IgPT09ICdhbGwnIHx8IHhhLm1pcnJvciA9PT0gJ2FsbHRpY2tzJykpIHtcbiAgICAgICAgICAgICAgICB4UGF0aCArPSB4TGluZVBhdGgoeExpbmVzWUJvdHRvbSkgKyB4TGluZVBhdGgoeExpbmVzWVRvcCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHBsb3RpbmZvLnhsaW5lc1xuICAgICAgICAgICAgICAgIC5zdHlsZSgnc3Ryb2tlLXdpZHRoJywgeGEuX2x3ICsgJ3B4JylcbiAgICAgICAgICAgICAgICAuY2FsbChDb2xvci5zdHJva2UsIHhhLnNob3dsaW5lID9cbiAgICAgICAgICAgICAgICAgICAgeGEubGluZWNvbG9yIDogJ3JnYmEoMCwwLDAsMCknKTtcbiAgICAgICAgfVxuICAgICAgICBwbG90aW5mby54bGluZXMuYXR0cignZCcsIHhQYXRoKTtcblxuICAgICAgICAvKlxuICAgICAgICAgKiB5IGxpbmVzIHRoYXQgbWVldCB4IGF4ZXMgZ2V0IGxvbmdlciBvbmx5IGJ5IG1hcmdpbi5wYWQsIGJlY2F1c2VcbiAgICAgICAgICogdGhlIHggYXhlcyBmaWxsIGluIHRoZSBjb3JuZXIgc3BhY2UuIEZyZWUgeSBheGVzLCBsaWtlIGZyZWUgeCBheGVzLFxuICAgICAgICAgKiBhbHdheXMgc3BhbiBleGFjdGx5IHRoZSBkYXRhIGFyZWEgb2YgdGhlIHBsb3RcbiAgICAgICAgICpcbiAgICAgICAgICogICB8ICAgfCBYWFhYXG4gICAgICAgICAqIHkyfCB5MXwgWFhYWFxuICAgICAgICAgKiAgIHwgICB8IFhYWFhcbiAgICAgICAgICogICAgICAgfFxuICAgICAgICAgKiAgICAgICArLS0tLS1cbiAgICAgICAgICovXG4gICAgICAgIHZhciB5UGF0aCA9ICdNMCwwJztcbiAgICAgICAgaWYoc2hvdWxkU2hvd0xpbmVzT3JUaWNrcyh5YSwgc3VicGxvdCkpIHtcbiAgICAgICAgICAgIGNvbm5lY3RZQm90dG9tID0gZmluZENvdW50ZXJBeGlzTGluZVdpZHRoKHlhLCAnYm90dG9tJywgeGEsIGF4TGlzdCk7XG4gICAgICAgICAgICB5TGluZXNZQm90dG9tID0geWEuX29mZnNldCArIHlhLl9sZW5ndGggKyAoY29ubmVjdFlCb3R0b20gPyBwYWQgOiAwKTtcbiAgICAgICAgICAgIGNvbm5lY3RZVG9wID0gZmluZENvdW50ZXJBeGlzTGluZVdpZHRoKHlhLCAndG9wJywgeGEsIGF4TGlzdCk7XG4gICAgICAgICAgICB5TGluZXNZVG9wID0geWEuX29mZnNldCAtIChjb25uZWN0WVRvcCA/IHBhZCA6IDApO1xuICAgICAgICAgICAgeUxpbmVzWExlZnQgPSBnZXRMaW5lUG9zaXRpb24oeWEsIHhhLCAnbGVmdCcpO1xuICAgICAgICAgICAgeUxpbmVzWFJpZ2h0ID0gZ2V0TGluZVBvc2l0aW9uKHlhLCB4YSwgJ3JpZ2h0Jyk7XG5cbiAgICAgICAgICAgIGV4dHJhU3VicGxvdCA9ICgheWEuX2FuY2hvckF4aXMgfHwgc3VicGxvdCAhPT0geWEuX21haW5TdWJwbG90KTtcbiAgICAgICAgICAgIGlmKGV4dHJhU3VicGxvdCAmJiAoeWEubWlycm9yID09PSAnYWxsdGlja3MnIHx8IHlhLm1pcnJvciA9PT0gJ2FsbCcpKSB7XG4gICAgICAgICAgICAgICAgeWEuX2xpbmVwb3NpdGlvbnNbc3VicGxvdF0gPSBbeUxpbmVzWExlZnQsIHlMaW5lc1hSaWdodF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHlQYXRoID0gbWFpblBhdGgoeWEsIHlMaW5lUGF0aCwgeUxpbmVQYXRoRnJlZSk7XG4gICAgICAgICAgICBpZihleHRyYVN1YnBsb3QgJiYgeWEuc2hvd2xpbmUgJiYgKHlhLm1pcnJvciA9PT0gJ2FsbCcgfHwgeWEubWlycm9yID09PSAnYWxsdGlja3MnKSkge1xuICAgICAgICAgICAgICAgIHlQYXRoICs9IHlMaW5lUGF0aCh5TGluZXNYTGVmdCkgKyB5TGluZVBhdGgoeUxpbmVzWFJpZ2h0KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcGxvdGluZm8ueWxpbmVzXG4gICAgICAgICAgICAgICAgLnN0eWxlKCdzdHJva2Utd2lkdGgnLCB5YS5fbHcgKyAncHgnKVxuICAgICAgICAgICAgICAgIC5jYWxsKENvbG9yLnN0cm9rZSwgeWEuc2hvd2xpbmUgP1xuICAgICAgICAgICAgICAgICAgICB5YS5saW5lY29sb3IgOiAncmdiYSgwLDAsMCwwKScpO1xuICAgICAgICB9XG4gICAgICAgIHBsb3RpbmZvLnlsaW5lcy5hdHRyKCdkJywgeVBhdGgpO1xuICAgIH1cblxuICAgIEF4ZXMubWFrZUNsaXBQYXRocyhnZCk7XG5cbiAgICByZXR1cm4gUGxvdHMucHJldmlvdXNQcm9taXNlcyhnZCk7XG59XG5cbmZ1bmN0aW9uIHNob3VsZFNob3dMaW5lc09yVGlja3MoYXgsIHN1YnBsb3QpIHtcbiAgICByZXR1cm4gKGF4LnRpY2tzIHx8IGF4LnNob3dsaW5lKSAmJlxuICAgICAgICAoc3VicGxvdCA9PT0gYXguX21haW5TdWJwbG90IHx8IGF4Lm1pcnJvciA9PT0gJ2FsbCcgfHwgYXgubWlycm9yID09PSAnYWxsdGlja3MnKTtcbn1cblxuLypcbiAqIHNob3VsZCB3ZSBkcmF3IGEgbGluZSBvbiBjb3VudGVyQXggYXQgdGhpcyBzaWRlIG9mIGF4P1xuICogSXQncyBhc3N1bWVkIHRoYXQgY291bnRlckF4IGlzIGtub3duIHRvIG92ZXJsYXkgdGhlIHN1YnBsb3Qgd2UncmUgd29ya2luZyBvblxuICogYnV0IGl0IG1heSBub3QgYmUgaXRzIG1haW4gYXhpcy5cbiAqL1xuZnVuY3Rpb24gc2hvdWxkU2hvd0xpbmVUaGlzU2lkZShheCwgc2lkZSwgY291bnRlckF4KSB7XG4gICAgLy8gZG9lcyBjb3VudGVyQXggZ2V0IGEgbGluZSBhdCBhbGw/XG4gICAgaWYoIWNvdW50ZXJBeC5zaG93bGluZSB8fCAhY291bnRlckF4Ll9sdykgcmV0dXJuIGZhbHNlO1xuXG4gICAgLy8gYXJlIHdlIGRyYXdpbmcgKmFsbCogbGluZXMgZm9yIGNvdW50ZXJBeD9cbiAgICBpZihjb3VudGVyQXgubWlycm9yID09PSAnYWxsJyB8fCBjb3VudGVyQXgubWlycm9yID09PSAnYWxsdGlja3MnKSByZXR1cm4gdHJ1ZTtcblxuICAgIHZhciBhbmNob3JBeCA9IGNvdW50ZXJBeC5fYW5jaG9yQXhpcztcblxuICAgIC8vIGlzIHRoaXMgYSBmcmVlIGF4aXM/IGZyZWUgYXhlcyBjYW4gb25seSBoYXZlIGEgc3VicGxvdCBzaWRlLWxpbmUgd2l0aCBhbGwodGlja3MpPyBtaXJyb3JpbmdcbiAgICBpZighYW5jaG9yQXgpIHJldHVybiBmYWxzZTtcblxuICAgIC8vIGluIG9yZGVyIHRvIGhhbmRsZSBjYXNlcyB3aGVyZSB0aGUgdXNlciBmb3Jnb3QgdG8gYW5jaG9yIHRoaXMgYXhpcyBjb3JyZWN0bHlcbiAgICAvLyAoYmVjYXVzZSBpdHMgZGVmYXVsdCBhbmNob3IgaGFzIHRoZSBzYW1lIGRvbWFpbiBvbiB0aGUgcmVsZXZhbnQgZW5kKVxuICAgIC8vIGNoZWNrIHdoZXRoZXIgdGhlIHJlbGV2YW50IHBvc2l0aW9uIGlzIHRoZSBzYW1lLlxuICAgIHZhciBzaWRlSW5kZXggPSBhbGlnbm1lbnRDb25zdGFudHMuRlJPTV9CTFtzaWRlXTtcbiAgICBpZihjb3VudGVyQXguc2lkZSA9PT0gc2lkZSkge1xuICAgICAgICByZXR1cm4gYW5jaG9yQXguZG9tYWluW3NpZGVJbmRleF0gPT09IGF4LmRvbWFpbltzaWRlSW5kZXhdO1xuICAgIH1cbiAgICByZXR1cm4gY291bnRlckF4Lm1pcnJvciAmJiBhbmNob3JBeC5kb21haW5bMSAtIHNpZGVJbmRleF0gPT09IGF4LmRvbWFpblsxIC0gc2lkZUluZGV4XTtcbn1cblxuLypcbiAqIElzIHRoZXJlIGFub3RoZXIgYXhpcyBpbnRlcnNlY3RpbmcgYHNpZGVgIGVuZCBvZiBgYXhgP1xuICogRmlyc3QgbG9vayBhdCBgY291bnRlckF4YCAodGhlIGF4aXMgZm9yIHRoaXMgc3VicGxvdCksXG4gKiB0aGVuIGF0IGFsbCBvdGhlciBwb3RlbnRpYWwgY291bnRlcmF4ZXMgb24gb3Igb3ZlcmxheWluZyB0aGlzIHN1YnBsb3QuXG4gKiBUYWtlIHRoZSBsaW5lIHdpZHRoIGZyb20gdGhlIGZpcnN0IG9uZSB0aGF0IGhhcyBhIGxpbmUuXG4gKi9cbmZ1bmN0aW9uIGZpbmRDb3VudGVyQXhpc0xpbmVXaWR0aChheCwgc2lkZSwgY291bnRlckF4LCBheExpc3QpIHtcbiAgICBpZihzaG91bGRTaG93TGluZVRoaXNTaWRlKGF4LCBzaWRlLCBjb3VudGVyQXgpKSB7XG4gICAgICAgIHJldHVybiBjb3VudGVyQXguX2x3O1xuICAgIH1cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgYXhMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBheGkgPSBheExpc3RbaV07XG4gICAgICAgIGlmKGF4aS5fbWFpbkF4aXMgPT09IGNvdW50ZXJBeC5fbWFpbkF4aXMgJiYgc2hvdWxkU2hvd0xpbmVUaGlzU2lkZShheCwgc2lkZSwgYXhpKSkge1xuICAgICAgICAgICAgcmV0dXJuIGF4aS5fbHc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG59XG5cbmV4cG9ydHMuZHJhd01haW5UaXRsZSA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIHZhciB0ZXh0QW5jaG9yID0gZ2V0TWFpblRpdGxlVGV4dEFuY2hvcihmdWxsTGF5b3V0KTtcbiAgICB2YXIgZHkgPSBnZXRNYWluVGl0bGVEeShmdWxsTGF5b3V0KTtcblxuICAgIFRpdGxlcy5kcmF3KGdkLCAnZ3RpdGxlJywge1xuICAgICAgICBwcm9wQ29udGFpbmVyOiBmdWxsTGF5b3V0LFxuICAgICAgICBwcm9wTmFtZTogJ3RpdGxlLnRleHQnLFxuICAgICAgICBwbGFjZWhvbGRlcjogZnVsbExheW91dC5fZGZsdFRpdGxlLnBsb3QsXG4gICAgICAgIGF0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgIHg6IGdldE1haW5UaXRsZVgoZnVsbExheW91dCwgdGV4dEFuY2hvciksXG4gICAgICAgICAgICB5OiBnZXRNYWluVGl0bGVZKGZ1bGxMYXlvdXQsIGR5KSxcbiAgICAgICAgICAgICd0ZXh0LWFuY2hvcic6IHRleHRBbmNob3IsXG4gICAgICAgICAgICBkeTogZHlcbiAgICAgICAgfVxuICAgIH0pO1xufTtcblxuZnVuY3Rpb24gZ2V0TWFpblRpdGxlWChmdWxsTGF5b3V0LCB0ZXh0QW5jaG9yKSB7XG4gICAgdmFyIHRpdGxlID0gZnVsbExheW91dC50aXRsZTtcbiAgICB2YXIgZ3MgPSBmdWxsTGF5b3V0Ll9zaXplO1xuICAgIHZhciBoUGFkU2hpZnQgPSAwO1xuXG4gICAgaWYodGV4dEFuY2hvciA9PT0gU1ZHX1RFWFRfQU5DSE9SX1NUQVJUKSB7XG4gICAgICAgIGhQYWRTaGlmdCA9IHRpdGxlLnBhZC5sO1xuICAgIH0gZWxzZSBpZih0ZXh0QW5jaG9yID09PSBTVkdfVEVYVF9BTkNIT1JfRU5EKSB7XG4gICAgICAgIGhQYWRTaGlmdCA9IC10aXRsZS5wYWQucjtcbiAgICB9XG5cbiAgICBzd2l0Y2godGl0bGUueHJlZikge1xuICAgICAgICBjYXNlICdwYXBlcic6XG4gICAgICAgICAgICByZXR1cm4gZ3MubCArIGdzLncgKiB0aXRsZS54ICsgaFBhZFNoaWZ0O1xuICAgICAgICBjYXNlICdjb250YWluZXInOlxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bGxMYXlvdXQud2lkdGggKiB0aXRsZS54ICsgaFBhZFNoaWZ0O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWFpblRpdGxlWShmdWxsTGF5b3V0LCBkeSkge1xuICAgIHZhciB0aXRsZSA9IGZ1bGxMYXlvdXQudGl0bGU7XG4gICAgdmFyIGdzID0gZnVsbExheW91dC5fc2l6ZTtcbiAgICB2YXIgdlBhZFNoaWZ0ID0gMDtcblxuICAgIGlmKGR5ID09PSAnMGVtJyB8fCAhZHkpIHtcbiAgICAgICAgdlBhZFNoaWZ0ID0gLXRpdGxlLnBhZC5iO1xuICAgIH0gZWxzZSBpZihkeSA9PT0gYWxpZ25tZW50Q29uc3RhbnRzLkNBUF9TSElGVCArICdlbScpIHtcbiAgICAgICAgdlBhZFNoaWZ0ID0gdGl0bGUucGFkLnQ7XG4gICAgfVxuXG4gICAgaWYodGl0bGUueSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIHJldHVybiBncy50IC8gMjtcbiAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2godGl0bGUueXJlZikge1xuICAgICAgICAgICAgY2FzZSAncGFwZXInOlxuICAgICAgICAgICAgICAgIHJldHVybiBncy50ICsgZ3MuaCAtIGdzLmggKiB0aXRsZS55ICsgdlBhZFNoaWZ0O1xuICAgICAgICAgICAgY2FzZSAnY29udGFpbmVyJzpcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZ1bGxMYXlvdXQuaGVpZ2h0IC0gZnVsbExheW91dC5oZWlnaHQgKiB0aXRsZS55ICsgdlBhZFNoaWZ0O1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBnZXRNYWluVGl0bGVUZXh0QW5jaG9yKGZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgdGl0bGUgPSBmdWxsTGF5b3V0LnRpdGxlO1xuXG4gICAgdmFyIHRleHRBbmNob3IgPSBTVkdfVEVYVF9BTkNIT1JfTUlERExFO1xuICAgIGlmKExpYi5pc1JpZ2h0QW5jaG9yKHRpdGxlKSkge1xuICAgICAgICB0ZXh0QW5jaG9yID0gU1ZHX1RFWFRfQU5DSE9SX0VORDtcbiAgICB9IGVsc2UgaWYoTGliLmlzTGVmdEFuY2hvcih0aXRsZSkpIHtcbiAgICAgICAgdGV4dEFuY2hvciA9IFNWR19URVhUX0FOQ0hPUl9TVEFSVDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGV4dEFuY2hvcjtcbn1cblxuZnVuY3Rpb24gZ2V0TWFpblRpdGxlRHkoZnVsbExheW91dCkge1xuICAgIHZhciB0aXRsZSA9IGZ1bGxMYXlvdXQudGl0bGU7XG5cbiAgICB2YXIgZHkgPSAnMGVtJztcbiAgICBpZihMaWIuaXNUb3BBbmNob3IodGl0bGUpKSB7XG4gICAgICAgIGR5ID0gYWxpZ25tZW50Q29uc3RhbnRzLkNBUF9TSElGVCArICdlbSc7XG4gICAgfSBlbHNlIGlmKExpYi5pc01pZGRsZUFuY2hvcih0aXRsZSkpIHtcbiAgICAgICAgZHkgPSBhbGlnbm1lbnRDb25zdGFudHMuTUlEX1NISUZUICsgJ2VtJztcbiAgICB9XG5cbiAgICByZXR1cm4gZHk7XG59XG5cbmV4cG9ydHMuZG9UcmFjZVN0eWxlID0gZnVuY3Rpb24oZ2QpIHtcbiAgICB2YXIgY2FsY2RhdGEgPSBnZC5jYWxjZGF0YTtcbiAgICB2YXIgZWRpdFN0eWxlQ2FsbHMgPSBbXTtcbiAgICB2YXIgaTtcblxuICAgIGZvcihpID0gMDsgaSA8IGNhbGNkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjZCA9IGNhbGNkYXRhW2ldO1xuICAgICAgICB2YXIgY2QwID0gY2RbMF0gfHwge307XG4gICAgICAgIHZhciB0cmFjZSA9IGNkMC50cmFjZSB8fCB7fTtcbiAgICAgICAgdmFyIF9tb2R1bGUgPSB0cmFjZS5fbW9kdWxlIHx8IHt9O1xuXG4gICAgICAgIC8vIFNlZSBpZiB3ZSBuZWVkIHRvIGRvIGFycmF5c1RvQ2FsY2RhdGFcbiAgICAgICAgLy8gY2FsbCBpdCByZWdhcmRsZXNzIG9mIHdoYXQgY2hhbmdlIHdlIG1hZGUsIGluIGNhc2VcbiAgICAgICAgLy8gc3VwcGx5RGVmYXVsdHMgYnJvdWdodCBpbiBhbiBhcnJheSB0aGF0IHdhcyBhbHJlYWR5XG4gICAgICAgIC8vIGluIGdkLmRhdGEgYnV0IG5vdCBpbiBnZC5fZnVsbERhdGEgcHJldmlvdXNseVxuICAgICAgICB2YXIgYXJyYXlzVG9DYWxjZGF0YSA9IF9tb2R1bGUuYXJyYXlzVG9DYWxjZGF0YTtcbiAgICAgICAgaWYoYXJyYXlzVG9DYWxjZGF0YSkgYXJyYXlzVG9DYWxjZGF0YShjZCwgdHJhY2UpO1xuXG4gICAgICAgIHZhciBlZGl0U3R5bGUgPSBfbW9kdWxlLmVkaXRTdHlsZTtcbiAgICAgICAgaWYoZWRpdFN0eWxlKSBlZGl0U3R5bGVDYWxscy5wdXNoKHtmbjogZWRpdFN0eWxlLCBjZDA6IGNkMH0pO1xuICAgIH1cblxuICAgIGlmKGVkaXRTdHlsZUNhbGxzLmxlbmd0aCkge1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBlZGl0U3R5bGVDYWxscy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGVkaXQgPSBlZGl0U3R5bGVDYWxsc1tpXTtcbiAgICAgICAgICAgIGVkaXQuZm4oZ2QsIGVkaXQuY2QwKTtcbiAgICAgICAgfVxuICAgICAgICBjbGVhckdsQ2FudmFzZXMoZ2QpO1xuICAgICAgICBleHBvcnRzLnJlZHJhd1JlZ2xUcmFjZXMoZ2QpO1xuICAgIH1cblxuICAgIFBsb3RzLnN0eWxlKGdkKTtcbiAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2xlZ2VuZCcsICdkcmF3JykoZ2QpO1xuXG4gICAgcmV0dXJuIFBsb3RzLnByZXZpb3VzUHJvbWlzZXMoZ2QpO1xufTtcblxuZXhwb3J0cy5kb0NvbG9yQmFycyA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdjb2xvcmJhcicsICdkcmF3JykoZ2QpO1xuICAgIHJldHVybiBQbG90cy5wcmV2aW91c1Byb21pc2VzKGdkKTtcbn07XG5cbi8vIGZvcmNlIHBsb3QoKSB0byByZWRvIHRoZSBsYXlvdXQgYW5kIHJlcGxvdCB3aXRoIHRoZSBtb2RpZmllZCBsYXlvdXRcbmV4cG9ydHMubGF5b3V0UmVwbG90ID0gZnVuY3Rpb24oZ2QpIHtcbiAgICB2YXIgbGF5b3V0ID0gZ2QubGF5b3V0O1xuICAgIGdkLmxheW91dCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm4gUmVnaXN0cnkuY2FsbCgncGxvdCcsIGdkLCAnJywgbGF5b3V0KTtcbn07XG5cbmV4cG9ydHMuZG9MZWdlbmQgPSBmdW5jdGlvbihnZCkge1xuICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnbGVnZW5kJywgJ2RyYXcnKShnZCk7XG4gICAgcmV0dXJuIFBsb3RzLnByZXZpb3VzUHJvbWlzZXMoZ2QpO1xufTtcblxuZXhwb3J0cy5kb1RpY2tzUmVsYXlvdXQgPSBmdW5jdGlvbihnZCkge1xuICAgIEF4ZXMuZHJhdyhnZCwgJ3JlZHJhdycpO1xuXG4gICAgaWYoZ2QuX2Z1bGxMYXlvdXQuX2hhc09ubHlMYXJnZVNwbG9tcykge1xuICAgICAgICBSZWdpc3RyeS5zdWJwbG90c1JlZ2lzdHJ5LnNwbG9tLnVwZGF0ZUdyaWQoZ2QpO1xuICAgICAgICBjbGVhckdsQ2FudmFzZXMoZ2QpO1xuICAgICAgICBleHBvcnRzLnJlZHJhd1JlZ2xUcmFjZXMoZ2QpO1xuICAgIH1cblxuICAgIGV4cG9ydHMuZHJhd01haW5UaXRsZShnZCk7XG4gICAgcmV0dXJuIFBsb3RzLnByZXZpb3VzUHJvbWlzZXMoZ2QpO1xufTtcblxuZXhwb3J0cy5kb01vZGVCYXIgPSBmdW5jdGlvbihnZCkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG5cbiAgICBNb2RlQmFyLm1hbmFnZShnZCk7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbExheW91dC5fYmFzZVBsb3RNb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciB1cGRhdGVGeCA9IGZ1bGxMYXlvdXQuX2Jhc2VQbG90TW9kdWxlc1tpXS51cGRhdGVGeDtcbiAgICAgICAgaWYodXBkYXRlRngpIHVwZGF0ZUZ4KGdkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gUGxvdHMucHJldmlvdXNQcm9taXNlcyhnZCk7XG59O1xuXG5leHBvcnRzLmRvQ2FtZXJhID0gZnVuY3Rpb24oZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBzY2VuZUlkcyA9IGZ1bGxMYXlvdXQuX3N1YnBsb3RzLmdsM2Q7XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgc2NlbmVJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNjZW5lTGF5b3V0ID0gZnVsbExheW91dFtzY2VuZUlkc1tpXV07XG4gICAgICAgIHZhciBzY2VuZSA9IHNjZW5lTGF5b3V0Ll9zY2VuZTtcblxuICAgICAgICBzY2VuZS5zZXRWaWV3cG9ydChzY2VuZUxheW91dCk7XG4gICAgfVxufTtcblxuZXhwb3J0cy5kcmF3RGF0YSA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIGNsZWFyR2xDYW52YXNlcyhnZCk7XG5cbiAgICAvLyBsb29wIG92ZXIgdGhlIGJhc2UgcGxvdCBtb2R1bGVzIHByZXNlbnQgb24gZ3JhcGhcbiAgICB2YXIgYmFzZVBsb3RNb2R1bGVzID0gZnVsbExheW91dC5fYmFzZVBsb3RNb2R1bGVzO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBiYXNlUGxvdE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYmFzZVBsb3RNb2R1bGVzW2ldLnBsb3QoZ2QpO1xuICAgIH1cblxuICAgIGV4cG9ydHMucmVkcmF3UmVnbFRyYWNlcyhnZCk7XG5cbiAgICAvLyBzdHlsaW5nIHNlcGFyYXRlIGZyb20gZHJhd2luZ1xuICAgIFBsb3RzLnN0eWxlKGdkKTtcblxuICAgIC8vIGRyYXcgY29tcG9uZW50cyB0aGF0IGNhbiBiZSBkcmF3biBvbiBheGVzLFxuICAgIC8vIGFuZCB0aGF0IGRvIG5vdCBwdXNoIHRoZSBtYXJnaW5zXG4gICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdzaGFwZXMnLCAnZHJhdycpKGdkKTtcbiAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Fubm90YXRpb25zJywgJ2RyYXcnKShnZCk7XG4gICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdpbWFnZXMnLCAnZHJhdycpKGdkKTtcblxuICAgIC8vIE1hcmsgdGhlIGZpcnN0IHJlbmRlciBhcyBjb21wbGV0ZVxuICAgIGZ1bGxMYXlvdXQuX3JlcGxvdHRpbmcgPSBmYWxzZTtcblxuICAgIHJldHVybiBQbG90cy5wcmV2aW91c1Byb21pc2VzKGdkKTtcbn07XG5cbi8vIERyYXcgKG9yIHJlZHJhdykgYWxsIHJlZ2wtYmFzZWQgdHJhY2VzIGluIG9uZSBnbyxcbi8vIHVzZWZ1bCBkdXJpbmcgZHJhZyBhbmQgc2VsZWN0aW9uIHdoZXJlIGJ1ZmZlcnMgb2YgdGFyZ2V0ZWQgdHJhY2VzIGFyZSB1cGRhdGVkLFxuLy8gYnV0IGFsbCB0cmFjZXMgbmVlZCB0byBiZSByZWRyYXduIGZvbGxvd2luZyBjbGVhckdsQ2FudmFzZXMuXG4vL1xuLy8gTm90ZSB0aGF0IF9tb2R1bGUucGxvdCBmb3IgcmVnbCB0cmFjZSBkb2VzIE5PVCBkcmF3IHRoaW5nc1xuLy8gb24gdGhlIGNhbnZhcywgdGhleSBvbmx5IHVwZGF0ZSB0aGUgYnVmZmVycy5cbi8vIERyYXdpbmcgaXMgcGVyZm9ybSBoZXJlLlxuLy9cbi8vIFRPRE8gdHJ5IGFkZGluZyBwZXItc3VicGxvdCBvcHRpb24gdXNpbmcgZ2wuU0NJU1NPUl9URVNUIGZvclxuLy8gbm9uLW92ZXJsYXlpbmcsIGRpc2pvaW50IHN1YnBsb3RzLlxuLy9cbi8vIFRPRE8gdHJ5IHRvIGluY2x1ZGUgcGFyY29vcmRzIGluIGhlcmUuXG4vLyBodHRwczovL2dpdGh1Yi5jb20vcGxvdGx5L3Bsb3RseS5qcy9pc3N1ZXMvMzA2OVxuZXhwb3J0cy5yZWRyYXdSZWdsVHJhY2VzID0gZnVuY3Rpb24oZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuXG4gICAgaWYoZnVsbExheW91dC5faGFzKCdyZWdsJykpIHtcbiAgICAgICAgdmFyIGZ1bGxEYXRhID0gZ2QuX2Z1bGxEYXRhO1xuICAgICAgICB2YXIgY2FydGVzaWFuSWRzID0gW107XG4gICAgICAgIHZhciBwb2xhcklkcyA9IFtdO1xuICAgICAgICB2YXIgaSwgc3A7XG5cbiAgICAgICAgaWYoZnVsbExheW91dC5faGFzT25seUxhcmdlU3Bsb21zKSB7XG4gICAgICAgICAgICBmdWxsTGF5b3V0Ll9zcGxvbUdyaWQuZHJhdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTi5CLlxuICAgICAgICAvLyAtIExvb3Agb3ZlciBmdWxsRGF0YSAobm90IF9zcGxvbVNjZW5lcykgdG8gcHJlc2VydmUgc3Bsb20gdHJhY2UtdG8tdHJhY2Ugb3JkZXJpbmdcbiAgICAgICAgLy8gLSBGaWxsIGxpc3QgaWYgc3VicGxvdCBpZHMgKGluc3RlYWQgb2YgZnVsbExheW91dC5fc3VicGxvdHMpIHRvIGhhbmRsZSBjYXNlcyB3aGVyZSBhbGwgdHJhY2VzXG4gICAgICAgIC8vICAgb2YgYSBnaXZlbiBtb2R1bGUgYXJlIGB2aXNpYmxlICE9PSB0cnVlYFxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBmdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRyYWNlID0gZnVsbERhdGFbaV07XG5cbiAgICAgICAgICAgIGlmKHRyYWNlLnZpc2libGUgPT09IHRydWUgJiYgdHJhY2UuX2xlbmd0aCAhPT0gMCkge1xuICAgICAgICAgICAgICAgIGlmKHRyYWNlLnR5cGUgPT09ICdzcGxvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgZnVsbExheW91dC5fc3Bsb21TY2VuZXNbdHJhY2UudWlkXS5kcmF3KCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRyYWNlLnR5cGUgPT09ICdzY2F0dGVyZ2wnKSB7XG4gICAgICAgICAgICAgICAgICAgIExpYi5wdXNoVW5pcXVlKGNhcnRlc2lhbklkcywgdHJhY2UueGF4aXMgKyB0cmFjZS55YXhpcyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKHRyYWNlLnR5cGUgPT09ICdzY2F0dGVycG9sYXJnbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgTGliLnB1c2hVbmlxdWUocG9sYXJJZHMsIHRyYWNlLnN1YnBsb3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZvcihpID0gMDsgaSA8IGNhcnRlc2lhbklkcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc3AgPSBmdWxsTGF5b3V0Ll9wbG90c1tjYXJ0ZXNpYW5JZHNbaV1dO1xuICAgICAgICAgICAgaWYoc3AuX3NjZW5lKSBzcC5fc2NlbmUuZHJhdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgcG9sYXJJZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHNwID0gZnVsbExheW91dFtwb2xhcklkc1tpXV0uX3N1YnBsb3Q7XG4gICAgICAgICAgICBpZihzcC5fc2NlbmUpIHNwLl9zY2VuZS5kcmF3KCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5leHBvcnRzLmRvQXV0b1JhbmdlQW5kQ29uc3RyYWludHMgPSBmdW5jdGlvbihnZCkge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGF4TGlzdCA9IEF4ZXMubGlzdChnZCwgJycsIHRydWUpO1xuICAgIHZhciBtYXRjaEdyb3VwcyA9IGZ1bGxMYXlvdXQuX2F4aXNNYXRjaEdyb3VwcyB8fCBbXTtcbiAgICB2YXIgYXhMb29rdXAgPSB7fTtcbiAgICB2YXIgYXg7XG4gICAgdmFyIGF4Um5nO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGF4TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICBheCA9IGF4TGlzdFtpXTtcbiAgICAgICAgY2xlYW5BeGlzQ29uc3RyYWludHMoZ2QsIGF4KTtcbiAgICAgICAgZG9BdXRvUmFuZ2UoZ2QsIGF4KTtcbiAgICAgICAgYXhMb29rdXBbYXguX2lkXSA9IDE7XG4gICAgfVxuXG4gICAgZW5mb3JjZUF4aXNDb25zdHJhaW50cyhnZCk7XG5cbiAgICBncm91cExvb3A6XG4gICAgZm9yKHZhciBqID0gMDsgaiA8IG1hdGNoR3JvdXBzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIHZhciBncm91cCA9IG1hdGNoR3JvdXBzW2pdO1xuICAgICAgICB2YXIgcm5nID0gbnVsbDtcbiAgICAgICAgdmFyIGlkO1xuXG4gICAgICAgIGZvcihpZCBpbiBncm91cCkge1xuICAgICAgICAgICAgYXggPSBBeGVzLmdldEZyb21JZChnZCwgaWQpO1xuXG4gICAgICAgICAgICAvLyBza2lwIG92ZXIgJ21pc3NpbmcnIGF4ZXMgd2hpY2ggZG8gbm90IHBhc3MgdGhyb3VnaCBkb0F1dG9SYW5nZVxuICAgICAgICAgICAgaWYoIWF4TG9va3VwW2F4Ll9pZF0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gaWYgb25lIGF4aXMgaGFzIGF1dG9yYW5nZSBmYWxzZSwgd2UncmUgZG9uZVxuICAgICAgICAgICAgaWYoYXguYXV0b3JhbmdlID09PSBmYWxzZSkgY29udGludWUgZ3JvdXBMb29wO1xuXG4gICAgICAgICAgICBheFJuZyA9IExpYi5zaW1wbGVNYXAoYXgucmFuZ2UsIGF4LnIybCk7XG4gICAgICAgICAgICBpZihybmcpIHtcbiAgICAgICAgICAgICAgICBpZihybmdbMF0gPCBybmdbMV0pIHtcbiAgICAgICAgICAgICAgICAgICAgcm5nWzBdID0gTWF0aC5taW4ocm5nWzBdLCBheFJuZ1swXSk7XG4gICAgICAgICAgICAgICAgICAgIHJuZ1sxXSA9IE1hdGgubWF4KHJuZ1sxXSwgYXhSbmdbMV0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJuZ1swXSA9IE1hdGgubWF4KHJuZ1swXSwgYXhSbmdbMF0pO1xuICAgICAgICAgICAgICAgICAgICBybmdbMV0gPSBNYXRoLm1pbihybmdbMV0sIGF4Um5nWzFdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJuZyA9IGF4Um5nO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZm9yKGlkIGluIGdyb3VwKSB7XG4gICAgICAgICAgICBheCA9IEF4ZXMuZ2V0RnJvbUlkKGdkLCBpZCk7XG4gICAgICAgICAgICBheC5yYW5nZSA9IExpYi5zaW1wbGVNYXAocm5nLCBheC5sMnIpO1xuICAgICAgICAgICAgYXguX2lucHV0LnJhbmdlID0gYXgucmFuZ2Uuc2xpY2UoKTtcbiAgICAgICAgICAgIGF4LnNldFNjYWxlKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG4vLyBBbiBpbml0aWFsIHBhaW50IG11c3QgYmUgY29tcGxldGVkIGJlZm9yZSB0aGVzZSBjb21wb25lbnRzIGNhbiBiZVxuLy8gY29ycmVjdGx5IHNpemVkIGFuZCB0aGUgd2hvbGUgcGxvdCByZS1tYXJnaW5lZC4gZnVsbExheW91dC5fcmVwbG90dGluZyBtdXN0XG4vLyBiZSBzZXQgdG8gZmFsc2UgYmVmb3JlIHRoZXNlIHdpbGwgd29yayBwcm9wZXJseS5cbmV4cG9ydHMuZmluYWxEcmF3ID0gZnVuY3Rpb24oZ2QpIHtcbiAgICAvLyBUT0RPOiByYW5nZXNsaWRlcnMgcmVhbGx5IGJlbG9uZyBpbiBtYXJnaW5QdXNoZXJzIGJ1dCB0aGV5IG5lZWQgdG8gYmVcbiAgICAvLyBkcmF3biBhZnRlciBkYXRhIC0gY2FuIHdlIGF0IGxlYXN0IGdldCB0aGUgbWFyZ2luIHB1c2hpbmcgcGFydCBzZXBhcmF0ZWRcbiAgICAvLyBvdXQgYW5kIGRvbmUgZWFybGllcj9cbiAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ3Jhbmdlc2xpZGVyJywgJ2RyYXcnKShnZCk7XG4gICAgLy8gVE9ETzogcmFuZ2VzZWxlY3RvciBvbmx5IG5lZWRzIHRvIGJlIGhlcmUgKGluIGFkZGl0aW9uIHRvIGRyYXdNYXJnaW5QdXNoZXJzKVxuICAgIC8vIGJlY2F1c2UgdGhlIG1hcmdpbnMgbmVlZCB0byBiZSBmdWxseSBkZXRlcm1pbmVkIGJlZm9yZSB3ZSBjYW4gY2FsbFxuICAgIC8vIGF1dG9yYW5nZSBhbmQgdXBkYXRlIGF4aXMgcmFuZ2VzICh3aGljaCByYW5nZXNlbGVjdG9yIG5lZWRzIHRvIGtub3cgd2hpY2hcbiAgICAvLyBidXR0b24gaXMgYWN0aXZlKS4gQ2FuIHdlIGJyZWFrIG91dCBpdHMgYXV0b21hcmdpbiBzdGVwIGZyb20gaXRzIGRyYXcgc3RlcD9cbiAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ3Jhbmdlc2VsZWN0b3InLCAnZHJhdycpKGdkKTtcbn07XG5cbmV4cG9ydHMuZHJhd01hcmdpblB1c2hlcnMgPSBmdW5jdGlvbihnZCkge1xuICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnbGVnZW5kJywgJ2RyYXcnKShnZCk7XG4gICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdyYW5nZXNlbGVjdG9yJywgJ2RyYXcnKShnZCk7XG4gICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdzbGlkZXJzJywgJ2RyYXcnKShnZCk7XG4gICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCd1cGRhdGVtZW51cycsICdkcmF3JykoZ2QpO1xuICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY29sb3JiYXInLCAnZHJhdycpKGdkKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBpZDJuYW1lID0gcmVxdWlyZSgnLi9heGlzX2lkcycpLmlkMm5hbWU7XG52YXIgc2NhbGVab29tID0gcmVxdWlyZSgnLi9zY2FsZV96b29tJyk7XG52YXIgbWFrZVBhZEZuID0gcmVxdWlyZSgnLi9hdXRvcmFuZ2UnKS5tYWtlUGFkRm47XG52YXIgY29uY2F0RXh0cmVtZXMgPSByZXF1aXJlKCcuL2F1dG9yYW5nZScpLmNvbmNhdEV4dHJlbWVzO1xuXG52YXIgQUxNT1NUX0VRVUFMID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL251bWVyaWNhbCcpLkFMTU9TVF9FUVVBTDtcbnZhciBGUk9NX0JMID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL2FsaWdubWVudCcpLkZST01fQkw7XG5cbmV4cG9ydHMuaGFuZGxlQ29uc3RyYWludERlZmF1bHRzID0gZnVuY3Rpb24oY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCBvcHRzKSB7XG4gICAgdmFyIGFsbEF4aXNJZHMgPSBvcHRzLmFsbEF4aXNJZHM7XG4gICAgdmFyIGxheW91dE91dCA9IG9wdHMubGF5b3V0T3V0O1xuICAgIHZhciBzY2FsZWFuY2hvckRmbHQgPSBvcHRzLnNjYWxlYW5jaG9yRGZsdDtcbiAgICB2YXIgY29uc3RyYWluRGZsdCA9IG9wdHMuY29uc3RyYWluRGZsdDtcbiAgICB2YXIgY29uc3RyYWludEdyb3VwcyA9IGxheW91dE91dC5fYXhpc0NvbnN0cmFpbnRHcm91cHM7XG4gICAgdmFyIG1hdGNoR3JvdXBzID0gbGF5b3V0T3V0Ll9heGlzTWF0Y2hHcm91cHM7XG4gICAgdmFyIGF4SWQgPSBjb250YWluZXJPdXQuX2lkO1xuICAgIHZhciBheExldHRlciA9IGF4SWQuY2hhckF0KDApO1xuICAgIHZhciBzcGxvbVN0YXNoID0gKChsYXlvdXRPdXQuX3NwbG9tQXhlcyB8fCB7fSlbYXhMZXR0ZXJdIHx8IHt9KVtheElkXSB8fCB7fTtcbiAgICB2YXIgdGhpc0lEID0gY29udGFpbmVyT3V0Ll9pZDtcbiAgICB2YXIgbGV0dGVyID0gdGhpc0lELmNoYXJBdCgwKTtcblxuICAgIC8vIGNvZXJjZSB0aGUgY29uc3RyYWludCBtZWNoYW5pY3MgZXZlbiBpZiB0aGlzIGF4aXMgaGFzIG5vIHNjYWxlYW5jaG9yXG4gICAgLy8gYmVjYXVzZSBpdCBtYXkgYmUgdGhlIGFuY2hvciBvZiBhbm90aGVyIGF4aXMuXG4gICAgdmFyIGNvbnN0cmFpbiA9IGNvZXJjZSgnY29uc3RyYWluJywgY29uc3RyYWluRGZsdCk7XG4gICAgTGliLmNvZXJjZShjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCB7XG4gICAgICAgIGNvbnN0cmFpbnRvd2FyZDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBsZXR0ZXIgPT09ICd4JyA/IFsnbGVmdCcsICdjZW50ZXInLCAncmlnaHQnXSA6IFsnYm90dG9tJywgJ21pZGRsZScsICd0b3AnXSxcbiAgICAgICAgICAgIGRmbHQ6IGxldHRlciA9PT0gJ3gnID8gJ2NlbnRlcicgOiAnbWlkZGxlJ1xuICAgICAgICB9XG4gICAgfSwgJ2NvbnN0cmFpbnRvd2FyZCcpO1xuXG4gICAgdmFyIG1hdGNoZXMsIG1hdGNoT3B0cztcblxuICAgIGlmKChjb250YWluZXJJbi5tYXRjaGVzIHx8IHNwbG9tU3Rhc2gubWF0Y2hlcykgJiYgIWNvbnRhaW5lck91dC5maXhlZHJhbmdlKSB7XG4gICAgICAgIG1hdGNoT3B0cyA9IGdldENvbnN0cmFpbnRPcHRzKG1hdGNoR3JvdXBzLCB0aGlzSUQsIGFsbEF4aXNJZHMsIGxheW91dE91dCk7XG4gICAgICAgIG1hdGNoZXMgPSBMaWIuY29lcmNlKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIHtcbiAgICAgICAgICAgIG1hdGNoZXM6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICAgICAgdmFsdWVzOiBtYXRjaE9wdHMubGlua2FibGVBeGVzIHx8IFtdLFxuICAgICAgICAgICAgICAgIGRmbHQ6IHNwbG9tU3Rhc2gubWF0Y2hlc1xuICAgICAgICAgICAgfVxuICAgICAgICB9LCAnbWF0Y2hlcycpO1xuICAgIH1cblxuICAgIC8vICdtYXRjaGVzJyB3aW5zIG92ZXIgJ3NjYWxlYW5jaG9yJyAoZm9yIG5vdylcbiAgICB2YXIgc2NhbGVhbmNob3IsIHNjYWxlT3B0cztcblxuICAgIGlmKCFtYXRjaGVzICYmXG4gICAgICAgIShjb250YWluZXJPdXQuZml4ZWRyYW5nZSAmJiBjb25zdHJhaW4gIT09ICdkb21haW4nKSAmJlxuICAgICAgIChjb250YWluZXJJbi5zY2FsZWFuY2hvciB8fCBzY2FsZWFuY2hvckRmbHQpXG4gICAgICkge1xuICAgICAgICBzY2FsZU9wdHMgPSBnZXRDb25zdHJhaW50T3B0cyhjb25zdHJhaW50R3JvdXBzLCB0aGlzSUQsIGFsbEF4aXNJZHMsIGxheW91dE91dCwgY29uc3RyYWluKTtcbiAgICAgICAgc2NhbGVhbmNob3IgPSBMaWIuY29lcmNlKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIHtcbiAgICAgICAgICAgIHNjYWxlYW5jaG9yOiB7XG4gICAgICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgICAgIHZhbHVlczogc2NhbGVPcHRzLmxpbmthYmxlQXhlcyB8fCBbXVxuICAgICAgICAgICAgfVxuICAgICAgICB9LCAnc2NhbGVhbmNob3InLCBzY2FsZWFuY2hvckRmbHQpO1xuICAgIH1cblxuICAgIGlmKG1hdGNoZXMpIHtcbiAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC5jb25zdHJhaW47XG4gICAgICAgIHVwZGF0ZUNvbnN0cmFpbnRHcm91cHMobWF0Y2hHcm91cHMsIG1hdGNoT3B0cy50aGlzR3JvdXAsIHRoaXNJRCwgbWF0Y2hlcywgMSk7XG4gICAgfSBlbHNlIGlmKGFsbEF4aXNJZHMuaW5kZXhPZihjb250YWluZXJJbi5tYXRjaGVzKSAhPT0gLTEpIHtcbiAgICAgICAgTGliLndhcm4oJ2lnbm9yZWQgJyArIGNvbnRhaW5lck91dC5fbmFtZSArICcubWF0Y2hlczogXCInICtcbiAgICAgICAgICAgIGNvbnRhaW5lckluLm1hdGNoZXMgKyAnXCIgdG8gYXZvaWQgZWl0aGVyIGFuIGluZmluaXRlIGxvb3AgJyArXG4gICAgICAgICAgICAnb3IgYmVjYXVzZSB0aGUgdGFyZ2V0IGF4aXMgaGFzIGZpeGVkIHJhbmdlLicpO1xuICAgIH1cblxuICAgIGlmKHNjYWxlYW5jaG9yKSB7XG4gICAgICAgIHZhciBzY2FsZXJhdGlvID0gY29lcmNlKCdzY2FsZXJhdGlvJyk7XG5cbiAgICAgICAgLy8gVE9ETzogSSBzdXBwb3NlIEkgY291bGQgZG8gYXR0cmlidXRlLm1pbjogTnVtYmVyLk1JTl9WQUxVRSB0byBhdm9pZCB6ZXJvLFxuICAgICAgICAvLyBidXQgdGhhdCBzZWVtcyBoYWNreS4gQmV0dGVyIHdheSB0byBzYXkgXCJtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyXCI/XG4gICAgICAgIC8vIE9mIGNvdXJzZSBpZiB5b3UgdXNlIHNldmVyYWwgc3VwZXItdGlueSB2YWx1ZXMgeW91IGNvdWxkIGV2ZW50dWFsbHlcbiAgICAgICAgLy8gZm9yY2UgYSBwcm9kdWN0IG9mIHRoZXNlIHRvIHplcm8gYW5kIGFsbCBoZWxsIHdvdWxkIGJyZWFrIGxvb3NlLi4uXG4gICAgICAgIC8vIExpa2V3aXNlIHdpdGggc3VwZXItaHVnZSB2YWx1ZXMuXG4gICAgICAgIGlmKCFzY2FsZXJhdGlvKSBzY2FsZXJhdGlvID0gY29udGFpbmVyT3V0LnNjYWxlcmF0aW8gPSAxO1xuXG4gICAgICAgIHVwZGF0ZUNvbnN0cmFpbnRHcm91cHMoY29uc3RyYWludEdyb3Vwcywgc2NhbGVPcHRzLnRoaXNHcm91cCwgdGhpc0lELCBzY2FsZWFuY2hvciwgc2NhbGVyYXRpbyk7XG4gICAgfSBlbHNlIGlmKGFsbEF4aXNJZHMuaW5kZXhPZihjb250YWluZXJJbi5zY2FsZWFuY2hvcikgIT09IC0xKSB7XG4gICAgICAgIExpYi53YXJuKCdpZ25vcmVkICcgKyBjb250YWluZXJPdXQuX25hbWUgKyAnLnNjYWxlYW5jaG9yOiBcIicgK1xuICAgICAgICAgICAgY29udGFpbmVySW4uc2NhbGVhbmNob3IgKyAnXCIgdG8gYXZvaWQgZWl0aGVyIGFuIGluZmluaXRlIGxvb3AgJyArXG4gICAgICAgICAgICAnYW5kIHBvc3NpYmx5IGluY29uc2lzdGVudCBzY2FsZXJhdGlvcywgb3IgYmVjYXVzZSB0aGUgdGFyZ2V0ICcgK1xuICAgICAgICAgICAgJ2F4aXMgaGFzIGZpeGVkIHJhbmdlIG9yIHRoaXMgYXhpcyBkZWNsYXJlcyBhICptYXRjaGVzKiBjb25zdHJhaW50LicpO1xuICAgIH1cbn07XG5cbi8vIElmIHRoaXMgYXhpcyBpcyBhbHJlYWR5IHBhcnQgb2YgYSBjb25zdHJhaW50IGdyb3VwLCB3ZSBjYW4ndFxuLy8gc2NhbGVhbmNob3IgYW55IG90aGVyIGF4aXMgaW4gdGhhdCBncm91cCwgb3Igd2UnZCBtYWtlIGEgbG9vcC5cbi8vIEZpbHRlciBhbGxBeGlzSWRzIHRvIGVuZm9yY2UgdGhpcywgYWxzbyBtYXRjaGluZyBheGlzIHR5cGVzLlxuZnVuY3Rpb24gZ2V0Q29uc3RyYWludE9wdHMoZ3JvdXBzLCB0aGlzSUQsIGFsbEF4aXNJZHMsIGxheW91dE91dCwgY29uc3RyYWluKSB7XG4gICAgdmFyIGRvZXNOb3RDb25zdHJhaW5SYW5nZSA9IGNvbnN0cmFpbiAhPT0gJ3JhbmdlJztcbiAgICB2YXIgdGhpc1R5cGUgPSBsYXlvdXRPdXRbaWQybmFtZSh0aGlzSUQpXS50eXBlO1xuICAgIHZhciBpLCBqLCBpZGosIGF4ajtcblxuICAgIHZhciBsaW5rYWJsZUF4ZXMgPSBbXTtcbiAgICBmb3IoaiA9IDA7IGogPCBhbGxBeGlzSWRzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgIGlkaiA9IGFsbEF4aXNJZHNbal07XG4gICAgICAgIGlmKGlkaiA9PT0gdGhpc0lEKSBjb250aW51ZTtcblxuICAgICAgICBheGogPSBsYXlvdXRPdXRbaWQybmFtZShpZGopXTtcbiAgICAgICAgaWYoYXhqLnR5cGUgPT09IHRoaXNUeXBlKSB7XG4gICAgICAgICAgICBpZighYXhqLmZpeGVkcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICBsaW5rYWJsZUF4ZXMucHVzaChpZGopO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGRvZXNOb3RDb25zdHJhaW5SYW5nZSAmJiBheGouYW5jaG9yKSB7XG4gICAgICAgICAgICAgICAgLy8gYWxsb3cgZG9tYWluIGNvbnN0cmFpbnRzIG9uIHN1YnBsb3RzIHdoZXJlXG4gICAgICAgICAgICAgICAgLy8gQk9USCBheGVzIGhhdmUgZml4ZWRyYW5nZTp0cnVlIGFuZCBjb25zdHJhaW46ZG9tYWluXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ZXJBeGogPSBsYXlvdXRPdXRbaWQybmFtZShheGouYW5jaG9yKV07XG4gICAgICAgICAgICAgICAgaWYoY291bnRlckF4ai5maXhlZHJhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmthYmxlQXhlcy5wdXNoKGlkaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGkgPSAwOyBpIDwgZ3JvdXBzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmKGdyb3Vwc1tpXVt0aGlzSURdKSB7XG4gICAgICAgICAgICB2YXIgdGhpc0dyb3VwID0gZ3JvdXBzW2ldO1xuXG4gICAgICAgICAgICB2YXIgbGlua2FibGVBeGVzTm9Mb29wcyA9IFtdO1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbGlua2FibGVBeGVzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWRqID0gbGlua2FibGVBeGVzW2pdO1xuICAgICAgICAgICAgICAgIGlmKCF0aGlzR3JvdXBbaWRqXSkgbGlua2FibGVBeGVzTm9Mb29wcy5wdXNoKGlkaik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge2xpbmthYmxlQXhlczogbGlua2FibGVBeGVzTm9Mb29wcywgdGhpc0dyb3VwOiB0aGlzR3JvdXB9O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtsaW5rYWJsZUF4ZXM6IGxpbmthYmxlQXhlcywgdGhpc0dyb3VwOiBudWxsfTtcbn1cblxuLypcbiAqIEFkZCB0aGlzIGF4aXMgdG8gdGhlIGF4aXMgY29uc3RyYWludCBncm91cHMsIHdoaWNoIGlzIHRoZSBjb2xsZWN0aW9uXG4gKiBvZiBheGVzIHRoYXQgYXJlIGFsbCBjb25zdHJhaW5lZCB0b2dldGhlciBvbiBzY2FsZS5cbiAqXG4gKiBjb25zdHJhaW50R3JvdXBzOiBhIGxpc3Qgb2Ygb2JqZWN0cy4gZWFjaCBvYmplY3QgaXNcbiAqIHtheGlzX2lkOiBzY2FsZV93aXRoaW5fZ3JvdXB9LCB3aGVyZSBzY2FsZV93aXRoaW5fZ3JvdXAgaXNcbiAqIG9ubHkgaW1wb3J0YW50IHJlbGF0aXZlIHRvIHRoZSByZXN0IG9mIHRoZSBncm91cCwgYW5kIGRlZmluZXNcbiAqIHRoZSByZWxhdGl2ZSBzY2FsZXMgYmV0d2VlbiBhbGwgYXhlcyBpbiB0aGUgZ3JvdXBcbiAqXG4gKiB0aGlzR3JvdXA6IHRoZSBncm91cCB0aGUgY3VycmVudCBheGlzIGlzIGFscmVhZHkgaW5cbiAqIHRoaXNJRDogdGhlIGlkIGlmIHRoZSBjdXJyZW50IGF4aXNcbiAqIHNjYWxlYW5jaG9yOiB0aGUgaWQgb2YgdGhlIGF4aXMgdG8gc2NhbGUgaXQgd2l0aFxuICogc2NhbGVyYXRpbzogdGhlIHJhdGlvIG9mIHRoaXMgYXhpcyB0byB0aGUgc2NhbGVhbmNob3IgYXhpc1xuICovXG5mdW5jdGlvbiB1cGRhdGVDb25zdHJhaW50R3JvdXBzKGNvbnN0cmFpbnRHcm91cHMsIHRoaXNHcm91cCwgdGhpc0lELCBzY2FsZWFuY2hvciwgc2NhbGVyYXRpbykge1xuICAgIHZhciBpLCBqLCBncm91cGksIGtleWosIHRoaXNHcm91cEluZGV4O1xuXG4gICAgaWYodGhpc0dyb3VwID09PSBudWxsKSB7XG4gICAgICAgIHRoaXNHcm91cCA9IHt9O1xuICAgICAgICB0aGlzR3JvdXBbdGhpc0lEXSA9IDE7XG4gICAgICAgIHRoaXNHcm91cEluZGV4ID0gY29uc3RyYWludEdyb3Vwcy5sZW5ndGg7XG4gICAgICAgIGNvbnN0cmFpbnRHcm91cHMucHVzaCh0aGlzR3JvdXApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXNHcm91cEluZGV4ID0gY29uc3RyYWludEdyb3Vwcy5pbmRleE9mKHRoaXNHcm91cCk7XG4gICAgfVxuXG4gICAgdmFyIHRoaXNHcm91cEtleXMgPSBPYmplY3Qua2V5cyh0aGlzR3JvdXApO1xuXG4gICAgLy8gd2Uga25vdyB0aGF0IHRoaXMgYXhpcyBpc24ndCBpbiBhbnkgb3RoZXIgZ3JvdXBzLCBidXQgd2UgZG9uJ3Qga25vd1xuICAgIC8vIGFib3V0IHRoZSBzY2FsZWFuY2hvciBheGlzLiBJZiBpdCBpcywgd2UgbmVlZCB0byBtZXJnZSB0aGUgZ3JvdXBzLlxuICAgIGZvcihpID0gMDsgaSA8IGNvbnN0cmFpbnRHcm91cHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ3JvdXBpID0gY29uc3RyYWludEdyb3Vwc1tpXTtcbiAgICAgICAgaWYoaSAhPT0gdGhpc0dyb3VwSW5kZXggJiYgZ3JvdXBpW3NjYWxlYW5jaG9yXSkge1xuICAgICAgICAgICAgdmFyIGJhc2VTY2FsZSA9IGdyb3VwaVtzY2FsZWFuY2hvcl07XG4gICAgICAgICAgICBmb3IoaiA9IDA7IGogPCB0aGlzR3JvdXBLZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAga2V5aiA9IHRoaXNHcm91cEtleXNbal07XG4gICAgICAgICAgICAgICAgZ3JvdXBpW2tleWpdID0gYmFzZVNjYWxlICogc2NhbGVyYXRpbyAqIHRoaXNHcm91cFtrZXlqXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0cmFpbnRHcm91cHMuc3BsaWNlKHRoaXNHcm91cEluZGV4LCAxKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG90aGVyd2lzZSwgd2UgaW5zZXJ0IHRoZSBuZXcgc2NhbGVhbmNob3IgYXhpcyBhcyB0aGUgYmFzZSBzY2FsZSAoMSlcbiAgICAvLyBpbiBpdHMgZ3JvdXAsIGFuZCBzY2FsZSB0aGUgcmVzdCBvZiB0aGUgZ3JvdXAgdG8gaXRcbiAgICBpZihzY2FsZXJhdGlvICE9PSAxKSB7XG4gICAgICAgIGZvcihqID0gMDsgaiA8IHRoaXNHcm91cEtleXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHRoaXNHcm91cFt0aGlzR3JvdXBLZXlzW2pdXSAqPSBzY2FsZXJhdGlvO1xuICAgICAgICB9XG4gICAgfVxuICAgIHRoaXNHcm91cFtzY2FsZWFuY2hvcl0gPSAxO1xufVxuXG5leHBvcnRzLmVuZm9yY2UgPSBmdW5jdGlvbiBlbmZvcmNlKGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICB2YXIgY29uc3RyYWludEdyb3VwcyA9IGZ1bGxMYXlvdXQuX2F4aXNDb25zdHJhaW50R3JvdXBzIHx8IFtdO1xuXG4gICAgdmFyIGksIGosIGF4aXNJRCwgYXgsIG5vcm1TY2FsZSwgbW9kZSwgZmFjdG9yO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgY29uc3RyYWludEdyb3Vwcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZ3JvdXAgPSBjb25zdHJhaW50R3JvdXBzW2ldO1xuICAgICAgICB2YXIgYXhpc0lEcyA9IE9iamVjdC5rZXlzKGdyb3VwKTtcblxuICAgICAgICB2YXIgbWluU2NhbGUgPSBJbmZpbml0eTtcbiAgICAgICAgdmFyIG1heFNjYWxlID0gMDtcbiAgICAgICAgLy8gbW9zdGx5IG1hdGNoU2NhbGUgd2lsbCBiZSB0aGUgc2FtZSBhcyBtaW5TY2FsZVxuICAgICAgICAvLyBpZSB3ZSBleHBhbmQgYXhpcyByYW5nZXMgdG8gZW5jb21wYXNzICpldmVyeXRoaW5nKlxuICAgICAgICAvLyB0aGF0J3MgY3VycmVudGx5IGluIGFueSBvZiB0aGVpciByYW5nZXMsIGJ1dCBkdXJpbmdcbiAgICAgICAgLy8gYXV0b3JhbmdlIG9mIGEgc3Vic2V0IG9mIGF4ZXMgd2Ugd2lsbCBpZ25vcmUgb3RoZXJcbiAgICAgICAgLy8gYXhlcyBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICB2YXIgbWF0Y2hTY2FsZSA9IEluZmluaXR5O1xuICAgICAgICB2YXIgbm9ybVNjYWxlcyA9IHt9O1xuICAgICAgICB2YXIgYXhlcyA9IHt9O1xuICAgICAgICB2YXIgaGFzQW55RG9tYWluQ29uc3RyYWludCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIGZpbmQgdGhlIChub3JtYWxpemVkKSBzY2FsZSBvZiBlYWNoIGF4aXMgaW4gdGhlIGdyb3VwXG4gICAgICAgIGZvcihqID0gMDsgaiA8IGF4aXNJRHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGF4aXNJRCA9IGF4aXNJRHNbal07XG4gICAgICAgICAgICBheGVzW2F4aXNJRF0gPSBheCA9IGZ1bGxMYXlvdXRbaWQybmFtZShheGlzSUQpXTtcblxuICAgICAgICAgICAgaWYoYXguX2lucHV0RG9tYWluKSBheC5kb21haW4gPSBheC5faW5wdXREb21haW4uc2xpY2UoKTtcbiAgICAgICAgICAgIGVsc2UgYXguX2lucHV0RG9tYWluID0gYXguZG9tYWluLnNsaWNlKCk7XG5cbiAgICAgICAgICAgIGlmKCFheC5faW5wdXRSYW5nZSkgYXguX2lucHV0UmFuZ2UgPSBheC5yYW5nZS5zbGljZSgpO1xuXG4gICAgICAgICAgICAvLyBzZXQgYXhpcyBzY2FsZSBoZXJlIHNvIHdlIGNhbiB1c2UgX20gcmF0aGVyIHRoYW5cbiAgICAgICAgICAgIC8vIGhhdmluZyB0byBjYWxjdWxhdGUgaXQgZnJvbSBsZW5ndGggYW5kIHJhbmdlXG4gICAgICAgICAgICBheC5zZXRTY2FsZSgpO1xuXG4gICAgICAgICAgICAvLyBhYnM6IGludmVydGVkIHNjYWxlcyBzdGlsbCBzYXRpc2Z5IHRoZSBjb25zdHJhaW50XG4gICAgICAgICAgICBub3JtU2NhbGVzW2F4aXNJRF0gPSBub3JtU2NhbGUgPSBNYXRoLmFicyhheC5fbSkgLyBncm91cFtheGlzSURdO1xuICAgICAgICAgICAgbWluU2NhbGUgPSBNYXRoLm1pbihtaW5TY2FsZSwgbm9ybVNjYWxlKTtcbiAgICAgICAgICAgIGlmKGF4LmNvbnN0cmFpbiA9PT0gJ2RvbWFpbicgfHwgIWF4Ll9jb25zdHJhaW50U2hyaW5rYWJsZSkge1xuICAgICAgICAgICAgICAgIG1hdGNoU2NhbGUgPSBNYXRoLm1pbihtYXRjaFNjYWxlLCBub3JtU2NhbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyB0aGlzIGhhcyBzZXJ2ZWQgaXRzIHB1cnBvc2UsIHNvIHJlbW92ZSBpdFxuICAgICAgICAgICAgZGVsZXRlIGF4Ll9jb25zdHJhaW50U2hyaW5rYWJsZTtcbiAgICAgICAgICAgIG1heFNjYWxlID0gTWF0aC5tYXgobWF4U2NhbGUsIG5vcm1TY2FsZSk7XG5cbiAgICAgICAgICAgIGlmKGF4LmNvbnN0cmFpbiA9PT0gJ2RvbWFpbicpIGhhc0FueURvbWFpbkNvbnN0cmFpbnQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRG8gd2UgaGF2ZSBhIGNvbnN0cmFpbnQgbWlzbWF0Y2g/IEdpdmUgYSBzbWFsbCBidWZmZXIgZm9yIHJvdW5kaW5nIGVycm9yc1xuICAgICAgICBpZihtaW5TY2FsZSA+IEFMTU9TVF9FUVVBTCAqIG1heFNjYWxlICYmICFoYXNBbnlEb21haW5Db25zdHJhaW50KSBjb250aW51ZTtcblxuICAgICAgICAvLyBub3cgaW5jcmVhc2UgYW55IHJhbmdlcyB3ZSBuZWVkIHRvIHVudGlsIGFsbCBub3JtYWxpemVkIHNjYWxlcyBhcmUgZXF1YWxcbiAgICAgICAgZm9yKGogPSAwOyBqIDwgYXhpc0lEcy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgYXhpc0lEID0gYXhpc0lEc1tqXTtcbiAgICAgICAgICAgIG5vcm1TY2FsZSA9IG5vcm1TY2FsZXNbYXhpc0lEXTtcbiAgICAgICAgICAgIGF4ID0gYXhlc1theGlzSURdO1xuICAgICAgICAgICAgbW9kZSA9IGF4LmNvbnN0cmFpbjtcblxuICAgICAgICAgICAgLy8gZXZlbiBpZiB0aGUgc2NhbGUgZGlkbid0IGNoYW5nZSwgaWYgd2UncmUgc2hyaW5raW5nIGRvbWFpblxuICAgICAgICAgICAgLy8gd2UgbmVlZCB0byByZWNhbGN1bGF0ZSBpbiBjYXNlIGBjb25zdHJhaW50b3dhcmRgIGNoYW5nZWRcbiAgICAgICAgICAgIGlmKG5vcm1TY2FsZSAhPT0gbWF0Y2hTY2FsZSB8fCBtb2RlID09PSAnZG9tYWluJykge1xuICAgICAgICAgICAgICAgIGZhY3RvciA9IG5vcm1TY2FsZSAvIG1hdGNoU2NhbGU7XG5cbiAgICAgICAgICAgICAgICBpZihtb2RlID09PSAncmFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjYWxlWm9vbShheCwgZmFjdG9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb2RlID09PSAnZG9tYWluJ1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbnB1dERvbWFpbiA9IGF4Ll9pbnB1dERvbWFpbjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRvbWFpblNocnVuayA9IChheC5kb21haW5bMV0gLSBheC5kb21haW5bMF0pIC9cbiAgICAgICAgICAgICAgICAgICAgICAgIChpbnB1dERvbWFpblsxXSAtIGlucHV0RG9tYWluWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJhbmdlU2hydW5rID0gKGF4LnIybChheC5yYW5nZVsxXSkgLSBheC5yMmwoYXgucmFuZ2VbMF0pKSAvXG4gICAgICAgICAgICAgICAgICAgICAgICAoYXgucjJsKGF4Ll9pbnB1dFJhbmdlWzFdKSAtIGF4LnIybChheC5faW5wdXRSYW5nZVswXSkpO1xuXG4gICAgICAgICAgICAgICAgICAgIGZhY3RvciAvPSBkb21haW5TaHJ1bms7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYoZmFjdG9yICogcmFuZ2VTaHJ1bmsgPCAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3ZSd2ZSBhc2tlZCB0byBtYWduaWZ5IHRoZSBheGlzIG1vcmUgdGhhbiB3ZSBjYW4ganVzdCBieVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZW5sYXJnaW5nIHRoZSBkb21haW4gLSBzbyB3ZSBuZWVkIHRvIGNvbnN0cmljdCByYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgYXguZG9tYWluID0gYXguX2lucHV0LmRvbWFpbiA9IGlucHV0RG9tYWluLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzY2FsZVpvb20oYXgsIGZhY3Rvcik7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmKHJhbmdlU2hydW5rIDwgMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhlIHJhbmdlIGhhcyBwcmV2aW91c2x5IGJlZW4gY29uc3RyaWN0ZWQgYnkgXl4sIGJ1dCB3ZSd2ZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3dpdGNoZWQgdG8gdGhlIGRvbWFpbi1jb25zdHJpY3RlZCByZWdpbWUsIHNvIHJlc2V0IHJhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICBheC5yYW5nZSA9IGF4Ll9pbnB1dC5yYW5nZSA9IGF4Ll9pbnB1dFJhbmdlLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYWN0b3IgKj0gcmFuZ2VTaHJ1bms7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZihheC5hdXRvcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiByYW5nZSAmIGZhY3RvciBtYXkgbmVlZCB0byBjaGFuZ2UgYmVjYXVzZSByYW5nZSB3YXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAqIGNhbGN1bGF0ZWQgZm9yIHRoZSBsYXJnZXIgc2NhbGluZywgc28gc29tZSBwaXhlbFxuICAgICAgICAgICAgICAgICAgICAgICAgICogcGFkZGluZ3MgbWF5IGdldCBjdXQgb2ZmIHdoZW4gd2UgcmVkdWNlIHRoZSBkb21haW4uXG4gICAgICAgICAgICAgICAgICAgICAgICAgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICogVGhpcyBpcyBlYXNpZXIgdGhhbiB0aGUgcmVndWxhciBhdXRvcmFuZ2UgY2FsY3VsYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAqIGJlY2F1c2Ugd2UgYWxyZWFkeSBrbm93IHRoZSBzY2FsaW5nIGBtYCwgYnV0IHdlIHN0aWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBuZWVkIHRvIGN1dCBvdXQgaW1wb3NzaWJsZSBjb25zdHJhaW50cyAobGlrZVxuICAgICAgICAgICAgICAgICAgICAgICAgICogYW5ub3RhdGlvbnMgd2l0aCBzdXBlci1sb25nIGFycm93cykuIFRoYXQncyB3aGF0XG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBvdXRlck1pbi9NYXggYXJlIGZvciAtIGlmIHRoZSBleHBhbnNpb24gd2FzIGdvaW5nIHRvXG4gICAgICAgICAgICAgICAgICAgICAgICAgKiBnbyBiZXlvbmQgdGhlIG9yaWdpbmFsIGRvbWFpbiwgaXQgbXVzdCBiZSBpbXBvc3NpYmxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBybDAgPSBheC5yMmwoYXgucmFuZ2VbMF0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJsMSA9IGF4LnIybChheC5yYW5nZVsxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2VDZW50ZXIgPSAocmwwICsgcmwxKSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmFuZ2VNaW4gPSByYW5nZUNlbnRlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciByYW5nZU1heCA9IHJhbmdlQ2VudGVyO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhbGZSYW5nZSA9IE1hdGguYWJzKHJsMSAtIHJhbmdlQ2VudGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGV4dHJhIHRpbnkgYml0IGZvciByb3VuZGluZyBlcnJvcnMsIGluIGNhc2Ugd2UgYWN0dWFsbHlcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vICphcmUqIGV4cGFuZGluZyB0byB0aGUgZnVsbCBkb21haW5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBvdXRlck1pbiA9IHJhbmdlQ2VudGVyIC0gaGFsZlJhbmdlICogZmFjdG9yICogMS4wMDAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG91dGVyTWF4ID0gcmFuZ2VDZW50ZXIgKyBoYWxmUmFuZ2UgKiBmYWN0b3IgKiAxLjAwMDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2V0UGFkID0gbWFrZVBhZEZuKGF4KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRG9tYWluKGF4LCBmYWN0b3IpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG0gPSBNYXRoLmFicyhheC5fbSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZXh0cmVtZXMgPSBjb25jYXRFeHRyZW1lcyhnZCwgYXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1pbkFycmF5ID0gZXh0cmVtZXMubWluO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG1heEFycmF5ID0gZXh0cmVtZXMubWF4O1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1ZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IoayA9IDA7IGsgPCBtaW5BcnJheS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZhbCA9IG1pbkFycmF5W2tdLnZhbCAtIGdldFBhZChtaW5BcnJheVtrXSkgLyBtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG5ld1ZhbCA+IG91dGVyTWluICYmIG5ld1ZhbCA8IHJhbmdlTWluKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJhbmdlTWluID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKGsgPSAwOyBrIDwgbWF4QXJyYXkubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWYWwgPSBtYXhBcnJheVtrXS52YWwgKyBnZXRQYWQobWF4QXJyYXlba10pIC8gbTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihuZXdWYWwgPCBvdXRlck1heCAmJiBuZXdWYWwgPiByYW5nZU1heCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByYW5nZU1heCA9IG5ld1ZhbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkb21haW5FeHBhbmQgPSAocmFuZ2VNYXggLSByYW5nZU1pbikgLyAoMiAqIGhhbGZSYW5nZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmYWN0b3IgLz0gZG9tYWluRXhwYW5kO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZU1pbiA9IGF4LmwycihyYW5nZU1pbik7XG4gICAgICAgICAgICAgICAgICAgICAgICByYW5nZU1heCA9IGF4LmwycihyYW5nZU1heCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBheC5yYW5nZSA9IGF4Ll9pbnB1dC5yYW5nZSA9IChybDAgPCBybDEpID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcmFuZ2VNaW4sIHJhbmdlTWF4XSA6IFtyYW5nZU1heCwgcmFuZ2VNaW5dO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlRG9tYWluKGF4LCBmYWN0b3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5cbi8vIEZvciB1c2UgYmVmb3JlIGF1dG9yYW5naW5nLCBjaGVjayBpZiB0aGlzIGF4aXMgd2FzIHByZXZpb3VzbHkgY29uc3RyYWluZWRcbi8vIGJ5IGRvbWFpbiBidXQgbm8gbG9uZ2VyIGlzXG5leHBvcnRzLmNsZWFuID0gZnVuY3Rpb24gY2xlYW4oZ2QsIGF4KSB7XG4gICAgaWYoYXguX2lucHV0RG9tYWluKSB7XG4gICAgICAgIHZhciBpc0NvbnN0cmFpbmVkID0gZmFsc2U7XG4gICAgICAgIHZhciBheElkID0gYXguX2lkO1xuICAgICAgICB2YXIgY29uc3RyYWludEdyb3VwcyA9IGdkLl9mdWxsTGF5b3V0Ll9heGlzQ29uc3RyYWludEdyb3VwcztcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGNvbnN0cmFpbnRHcm91cHMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIGlmKGNvbnN0cmFpbnRHcm91cHNbal1bYXhJZF0pIHtcbiAgICAgICAgICAgICAgICBpc0NvbnN0cmFpbmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighaXNDb25zdHJhaW5lZCB8fCBheC5jb25zdHJhaW4gIT09ICdkb21haW4nKSB7XG4gICAgICAgICAgICBheC5faW5wdXQuZG9tYWluID0gYXguZG9tYWluID0gYXguX2lucHV0RG9tYWluO1xuICAgICAgICAgICAgZGVsZXRlIGF4Ll9pbnB1dERvbWFpbjtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZURvbWFpbihheCwgZmFjdG9yKSB7XG4gICAgdmFyIGlucHV0RG9tYWluID0gYXguX2lucHV0RG9tYWluO1xuICAgIHZhciBjZW50ZXJGcmFjdGlvbiA9IEZST01fQkxbYXguY29uc3RyYWludG93YXJkXTtcbiAgICB2YXIgY2VudGVyID0gaW5wdXREb21haW5bMF0gKyAoaW5wdXREb21haW5bMV0gLSBpbnB1dERvbWFpblswXSkgKiBjZW50ZXJGcmFjdGlvbjtcblxuICAgIGF4LmRvbWFpbiA9IGF4Ll9pbnB1dC5kb21haW4gPSBbXG4gICAgICAgIGNlbnRlciArIChpbnB1dERvbWFpblswXSAtIGNlbnRlcikgLyBmYWN0b3IsXG4gICAgICAgIGNlbnRlciArIChpbnB1dERvbWFpblsxXSAtIGNlbnRlcikgLyBmYWN0b3JcbiAgICBdO1xuICAgIGF4LnNldFNjYWxlKCk7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIEZST01fQkwgPSByZXF1aXJlKCcuLi8uLi9jb25zdGFudHMvYWxpZ25tZW50JykuRlJPTV9CTDtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzY2FsZVpvb20oYXgsIGZhY3RvciwgY2VudGVyRnJhY3Rpb24pIHtcbiAgICBpZihjZW50ZXJGcmFjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNlbnRlckZyYWN0aW9uID0gRlJPTV9CTFtheC5jb25zdHJhaW50b3dhcmQgfHwgJ2NlbnRlciddO1xuICAgIH1cblxuICAgIHZhciByYW5nZUxpbmVhciA9IFtheC5yMmwoYXgucmFuZ2VbMF0pLCBheC5yMmwoYXgucmFuZ2VbMV0pXTtcbiAgICB2YXIgY2VudGVyID0gcmFuZ2VMaW5lYXJbMF0gKyAocmFuZ2VMaW5lYXJbMV0gLSByYW5nZUxpbmVhclswXSkgKiBjZW50ZXJGcmFjdGlvbjtcblxuICAgIGF4LnJhbmdlID0gYXguX2lucHV0LnJhbmdlID0gW1xuICAgICAgICBheC5sMnIoY2VudGVyICsgKHJhbmdlTGluZWFyWzBdIC0gY2VudGVyKSAqIGZhY3RvciksXG4gICAgICAgIGF4LmwycihjZW50ZXIgKyAocmFuZ2VMaW5lYXJbMV0gLSBjZW50ZXIpICogZmFjdG9yKVxuICAgIF07XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBwb2x5Ym9vbCA9IHJlcXVpcmUoJ3BvbHlib29sanMnKTtcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBkYXNoU3R5bGUgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKS5kYXNoU3R5bGU7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgRnggPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2Z4Jyk7XG52YXIgbWFrZUV2ZW50RGF0YSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvZngvaGVscGVycycpLm1ha2VFdmVudERhdGE7XG52YXIgZHJhZ0hlbHBlcnMgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYWdlbGVtZW50L2hlbHBlcnMnKTtcbnZhciBmcmVlTW9kZSA9IGRyYWdIZWxwZXJzLmZyZWVNb2RlO1xudmFyIHJlY3RNb2RlID0gZHJhZ0hlbHBlcnMucmVjdE1vZGU7XG52YXIgZHJhd01vZGUgPSBkcmFnSGVscGVycy5kcmF3TW9kZTtcbnZhciBvcGVuTW9kZSA9IGRyYWdIZWxwZXJzLm9wZW5Nb2RlO1xudmFyIHNlbGVjdE1vZGUgPSBkcmFnSGVscGVycy5zZWxlY3RNb2RlO1xuXG52YXIgZGlzcGxheU91dGxpbmVzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9zaGFwZXMvZHJhd19uZXdzaGFwZS9kaXNwbGF5X291dGxpbmVzJyk7XG52YXIgaGFuZGxlRWxsaXBzZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvc2hhcGVzL2RyYXdfbmV3c2hhcGUvaGVscGVycycpLmhhbmRsZUVsbGlwc2U7XG52YXIgbmV3U2hhcGVzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9zaGFwZXMvZHJhd19uZXdzaGFwZS9uZXdzaGFwZXMnKTtcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIHBvbHlnb24gPSByZXF1aXJlKCcuLi8uLi9saWIvcG9seWdvbicpO1xudmFyIHRocm90dGxlID0gcmVxdWlyZSgnLi4vLi4vbGliL3Rocm90dGxlJyk7XG52YXIgZ2V0RnJvbUlkID0gcmVxdWlyZSgnLi9heGlzX2lkcycpLmdldEZyb21JZDtcbnZhciBjbGVhckdsQ2FudmFzZXMgPSByZXF1aXJlKCcuLi8uLi9saWIvY2xlYXJfZ2xfY2FudmFzZXMnKTtcblxudmFyIHJlZHJhd1JlZ2xUcmFjZXMgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9zdWJyb3V0aW5lcycpLnJlZHJhd1JlZ2xUcmFjZXM7XG5cbnZhciBjb25zdGFudHMgPSByZXF1aXJlKCcuL2NvbnN0YW50cycpO1xudmFyIE1JTlNFTEVDVCA9IGNvbnN0YW50cy5NSU5TRUxFQ1Q7XG5cbnZhciBmaWx0ZXJlZFBvbHlnb24gPSBwb2x5Z29uLmZpbHRlcjtcbnZhciBwb2x5Z29uVGVzdGVyID0gcG9seWdvbi50ZXN0ZXI7XG5cbnZhciBjbGVhclNlbGVjdCA9IHJlcXVpcmUoJy4vaGFuZGxlX291dGxpbmUnKS5jbGVhclNlbGVjdDtcblxudmFyIGhlbHBlcnMgPSByZXF1aXJlKCcuL2hlbHBlcnMnKTtcbnZhciBwMnIgPSBoZWxwZXJzLnAycjtcbnZhciBheFZhbHVlID0gaGVscGVycy5heFZhbHVlO1xudmFyIGdldFRyYW5zZm9ybSA9IGhlbHBlcnMuZ2V0VHJhbnNmb3JtO1xuXG5mdW5jdGlvbiBwcmVwU2VsZWN0KGUsIHN0YXJ0WCwgc3RhcnRZLCBkcmFnT3B0aW9ucywgbW9kZSkge1xuICAgIHZhciBpc0ZyZWVNb2RlID0gZnJlZU1vZGUobW9kZSk7XG4gICAgdmFyIGlzUmVjdE1vZGUgPSByZWN0TW9kZShtb2RlKTtcbiAgICB2YXIgaXNPcGVuTW9kZSA9IG9wZW5Nb2RlKG1vZGUpO1xuICAgIHZhciBpc0RyYXdNb2RlID0gZHJhd01vZGUobW9kZSk7XG4gICAgdmFyIGlzU2VsZWN0TW9kZSA9IHNlbGVjdE1vZGUobW9kZSk7XG5cbiAgICB2YXIgaXNMaW5lID0gbW9kZSA9PT0gJ2RyYXdsaW5lJztcbiAgICB2YXIgaXNFbGxpcHNlID0gbW9kZSA9PT0gJ2RyYXdjaXJjbGUnO1xuICAgIHZhciBpc0xpbmVPckVsbGlwc2UgPSBpc0xpbmUgfHwgaXNFbGxpcHNlOyAvLyBjYXNlcyB3aXRoIHR3byBzdGFydCAmIGVuZCBwb3NpdGlvbnNcblxuICAgIHZhciBnZCA9IGRyYWdPcHRpb25zLmdkO1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIHpvb21MYXllciA9IGZ1bGxMYXlvdXQuX3pvb21sYXllcjtcbiAgICB2YXIgZHJhZ0JCb3ggPSBkcmFnT3B0aW9ucy5lbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHZhciBwbG90aW5mbyA9IGRyYWdPcHRpb25zLnBsb3RpbmZvO1xuICAgIHZhciB0cmFuc2Zvcm0gPSBnZXRUcmFuc2Zvcm0ocGxvdGluZm8pO1xuICAgIHZhciB4MCA9IHN0YXJ0WCAtIGRyYWdCQm94LmxlZnQ7XG4gICAgdmFyIHkwID0gc3RhcnRZIC0gZHJhZ0JCb3gudG9wO1xuICAgIHZhciB4MSA9IHgwO1xuICAgIHZhciB5MSA9IHkwO1xuICAgIHZhciBwYXRoMCA9ICdNJyArIHgwICsgJywnICsgeTA7XG4gICAgdmFyIHB3ID0gZHJhZ09wdGlvbnMueGF4ZXNbMF0uX2xlbmd0aDtcbiAgICB2YXIgcGggPSBkcmFnT3B0aW9ucy55YXhlc1swXS5fbGVuZ3RoO1xuICAgIHZhciBhbGxBeGVzID0gZHJhZ09wdGlvbnMueGF4ZXMuY29uY2F0KGRyYWdPcHRpb25zLnlheGVzKTtcbiAgICB2YXIgc3VidHJhY3QgPSBlLmFsdEtleSAmJlxuICAgICAgICAhKGRyYXdNb2RlKG1vZGUpICYmIGlzT3Blbk1vZGUpO1xuXG4gICAgdmFyIGZpbHRlclBvbHksIHNlbGVjdGlvblRlc3RlciwgbWVyZ2VkUG9seWdvbnMsIGN1cnJlbnRQb2x5Z29uO1xuICAgIHZhciBpLCBzZWFyY2hJbmZvLCBldmVudERhdGE7XG5cbiAgICBjb2VyY2VTZWxlY3Rpb25zQ2FjaGUoZSwgZ2QsIGRyYWdPcHRpb25zKTtcblxuICAgIGlmKGlzRnJlZU1vZGUpIHtcbiAgICAgICAgZmlsdGVyUG9seSA9IGZpbHRlcmVkUG9seWdvbihbW3gwLCB5MF1dLCBjb25zdGFudHMuQkVORFBYKTtcbiAgICB9XG5cbiAgICB2YXIgb3V0bGluZXMgPSB6b29tTGF5ZXIuc2VsZWN0QWxsKCdwYXRoLnNlbGVjdC1vdXRsaW5lLScgKyBwbG90aW5mby5pZCkuZGF0YShpc0RyYXdNb2RlID8gWzBdIDogWzEsIDJdKTtcbiAgICB2YXIgZHJ3U3R5bGUgPSBmdWxsTGF5b3V0Lm5ld3NoYXBlO1xuXG4gICAgb3V0bGluZXMuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gJ3NlbGVjdC1vdXRsaW5lIHNlbGVjdC1vdXRsaW5lLScgKyBkICsgJyBzZWxlY3Qtb3V0bGluZS0nICsgcGxvdGluZm8uaWQ7IH0pXG4gICAgICAgIC5zdHlsZShpc0RyYXdNb2RlID8ge1xuICAgICAgICAgICAgb3BhY2l0eTogZHJ3U3R5bGUub3BhY2l0eSAvIDIsXG4gICAgICAgICAgICBmaWxsOiBpc09wZW5Nb2RlID8gdW5kZWZpbmVkIDogZHJ3U3R5bGUuZmlsbGNvbG9yLFxuICAgICAgICAgICAgc3Ryb2tlOiBkcndTdHlsZS5saW5lLmNvbG9yLFxuICAgICAgICAgICAgJ3N0cm9rZS1kYXNoYXJyYXknOiBkYXNoU3R5bGUoZHJ3U3R5bGUubGluZS5kYXNoLCBkcndTdHlsZS5saW5lLndpZHRoKSxcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiBkcndTdHlsZS5saW5lLndpZHRoICsgJ3B4J1xuICAgICAgICB9IDoge30pXG4gICAgICAgIC5hdHRyKCdmaWxsLXJ1bGUnLCBkcndTdHlsZS5maWxscnVsZSlcbiAgICAgICAgLmNsYXNzZWQoJ2N1cnNvci1tb3ZlJywgaXNEcmF3TW9kZSA/IHRydWUgOiBmYWxzZSlcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybSlcbiAgICAgICAgLmF0dHIoJ2QnLCBwYXRoMCArICdaJyk7XG5cbiAgICB2YXIgY29ybmVycyA9IHpvb21MYXllci5hcHBlbmQoJ3BhdGgnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnem9vbWJveC1jb3JuZXJzJylcbiAgICAgICAgLnN0eWxlKHtcbiAgICAgICAgICAgIGZpbGw6IENvbG9yLmJhY2tncm91bmQsXG4gICAgICAgICAgICBzdHJva2U6IENvbG9yLmRlZmF1bHRMaW5lLFxuICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IDFcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIHRyYW5zZm9ybSlcbiAgICAgICAgLmF0dHIoJ2QnLCAnTTAsMFonKTtcblxuXG4gICAgdmFyIHRocm90dGxlSUQgPSBmdWxsTGF5b3V0Ll91aWQgKyBjb25zdGFudHMuU0VMRUNUSUQ7XG4gICAgdmFyIHNlbGVjdGlvbiA9IFtdO1xuXG4gICAgLy8gZmluZCB0aGUgdHJhY2VzIHRvIHNlYXJjaCBmb3Igc2VsZWN0aW9uIHBvaW50c1xuICAgIHZhciBzZWFyY2hUcmFjZXMgPSBkZXRlcm1pbmVTZWFyY2hUcmFjZXMoZ2QsIGRyYWdPcHRpb25zLnhheGVzLFxuICAgICAgZHJhZ09wdGlvbnMueWF4ZXMsIGRyYWdPcHRpb25zLnN1YnBsb3QpO1xuXG4gICAgZnVuY3Rpb24gYXNjZW5kaW5nKGEsIGIpIHsgcmV0dXJuIGEgLSBiOyB9XG5cbiAgICAvLyBhbGxvdyBzdWJwbG90cyB0byBvdmVycmlkZSBmaWxsUmFuZ2VJdGVtcyByb3V0aW5lXG4gICAgdmFyIGZpbGxSYW5nZUl0ZW1zO1xuXG4gICAgaWYocGxvdGluZm8uZmlsbFJhbmdlSXRlbXMpIHtcbiAgICAgICAgZmlsbFJhbmdlSXRlbXMgPSBwbG90aW5mby5maWxsUmFuZ2VJdGVtcztcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZihpc1JlY3RNb2RlKSB7XG4gICAgICAgICAgICBmaWxsUmFuZ2VJdGVtcyA9IGZ1bmN0aW9uKGV2ZW50RGF0YSwgcG9seSkge1xuICAgICAgICAgICAgICAgIHZhciByYW5nZXMgPSBldmVudERhdGEucmFuZ2UgPSB7fTtcblxuICAgICAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGFsbEF4ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF4ID0gYWxsQXhlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF4TGV0dGVyID0gYXguX2lkLmNoYXJBdCgwKTtcblxuICAgICAgICAgICAgICAgICAgICByYW5nZXNbYXguX2lkXSA9IFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHAycihheCwgcG9seVtheExldHRlciArICdtaW4nXSksXG4gICAgICAgICAgICAgICAgICAgICAgICBwMnIoYXgsIHBvbHlbYXhMZXR0ZXIgKyAnbWF4J10pXG4gICAgICAgICAgICAgICAgICAgIF0uc29ydChhc2NlbmRpbmcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7IC8vIGNhc2Ugb2YgaXNGcmVlTW9kZVxuICAgICAgICAgICAgZmlsbFJhbmdlSXRlbXMgPSBmdW5jdGlvbihldmVudERhdGEsIHBvbHksIGZpbHRlclBvbHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZGF0YVB0cyA9IGV2ZW50RGF0YS5sYXNzb1BvaW50cyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgYWxsQXhlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYXggPSBhbGxBeGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBkYXRhUHRzW2F4Ll9pZF0gPSBmaWx0ZXJQb2x5LmZpbHRlcmVkLm1hcChheFZhbHVlKGF4KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRyYWdPcHRpb25zLm1vdmVGbiA9IGZ1bmN0aW9uKGR4MCwgZHkwKSB7XG4gICAgICAgIHgxID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ocHcsIGR4MCArIHgwKSk7XG4gICAgICAgIHkxID0gTWF0aC5tYXgoMCwgTWF0aC5taW4ocGgsIGR5MCArIHkwKSk7XG5cbiAgICAgICAgdmFyIGR4ID0gTWF0aC5hYnMoeDEgLSB4MCk7XG4gICAgICAgIHZhciBkeSA9IE1hdGguYWJzKHkxIC0geTApO1xuXG4gICAgICAgIGlmKGlzUmVjdE1vZGUpIHtcbiAgICAgICAgICAgIHZhciBkaXJlY3Rpb247XG4gICAgICAgICAgICB2YXIgc3RhcnQsIGVuZDtcblxuICAgICAgICAgICAgaWYoaXNTZWxlY3RNb2RlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHEgPSBmdWxsTGF5b3V0LnNlbGVjdGRpcmVjdGlvbjtcblxuICAgICAgICAgICAgICAgIGlmKHEgPT09ICdhbnknKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGR5IDwgTWF0aC5taW4oZHggKiAwLjYsIE1JTlNFTEVDVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdoJztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmKGR4IDwgTWF0aC5taW4oZHkgKiAwLjYsIE1JTlNFTEVDVCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICd2JztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdkJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9IHE7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgc3dpdGNoKGRpcmVjdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdoJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gaXNFbGxpcHNlID8gcGggLyAyIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHBoO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3YnOlxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBpc0VsbGlwc2UgPyBwdyAvIDIgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gcHc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGlzRHJhd01vZGUpIHtcbiAgICAgICAgICAgICAgICBzd2l0Y2goZnVsbExheW91dC5uZXdzaGFwZS5kcmF3ZGlyZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3ZlcnRpY2FsJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdoJztcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YXJ0ID0gaXNFbGxpcHNlID8gcGggLyAyIDogMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHBoO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2hvcml6b250YWwnOlxuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ3YnO1xuICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSBpc0VsbGlwc2UgPyBwdyAvIDIgOiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5kID0gcHc7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnb3J0aG8nOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoZHggPCBkeSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiA9ICdoJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IHkwO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuZCA9IHkxO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gPSAndic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhcnQgPSB4MDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmQgPSB4MTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OiAvLyBpLmUuIGNhc2Ugb2YgJ2RpYWdvbmFsJ1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uID0gJ2QnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZGlyZWN0aW9uID09PSAnaCcpIHtcbiAgICAgICAgICAgICAgICAvLyBob3Jpem9udGFsIG1vdGlvblxuICAgICAgICAgICAgICAgIGN1cnJlbnRQb2x5Z29uID0gaXNMaW5lT3JFbGxpcHNlID9cbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRWxsaXBzZShpc0VsbGlwc2UsIFt4MSwgc3RhcnRdLCBbeDEsIGVuZF0pIDogLy8gdXNpbmcgeDEgaW5zdGVhZCBvZiB4MCBhbGxvd3MgYWRqdXN0aW5nIHRoZSBsaW5lIHdoaWxlIGRyYXdpbmdcbiAgICAgICAgICAgICAgICAgICAgW1t4MCwgc3RhcnRdLCBbeDAsIGVuZF0sIFt4MSwgZW5kXSwgW3gxLCBzdGFydF1dOyAvLyBtYWtlIGEgdmVydGljYWwgYm94XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50UG9seWdvbi54bWluID0gaXNMaW5lT3JFbGxpcHNlID8geDEgOiBNYXRoLm1pbih4MCwgeDEpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb2x5Z29uLnhtYXggPSBpc0xpbmVPckVsbGlwc2UgPyB4MSA6IE1hdGgubWF4KHgwLCB4MSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvbHlnb24ueW1pbiA9IE1hdGgubWluKHN0YXJ0LCBlbmQpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb2x5Z29uLnltYXggPSBNYXRoLm1heChzdGFydCwgZW5kKTtcbiAgICAgICAgICAgICAgICAvLyBleHRyYXMgdG8gZ3VpZGUgdXNlcnMgaW4ga2VlcGluZyBhIHN0cmFpZ2h0IHNlbGVjdGlvblxuICAgICAgICAgICAgICAgIGNvcm5lcnMuYXR0cignZCcsICdNJyArIGN1cnJlbnRQb2x5Z29uLnhtaW4gKyAnLCcgKyAoeTAgLSBNSU5TRUxFQ1QpICtcbiAgICAgICAgICAgICAgICAgICAgJ2gtNHYnICsgKDIgKiBNSU5TRUxFQ1QpICsgJ2g0WicgK1xuICAgICAgICAgICAgICAgICAgICAnTScgKyAoY3VycmVudFBvbHlnb24ueG1heCAtIDEpICsgJywnICsgKHkwIC0gTUlOU0VMRUNUKSArXG4gICAgICAgICAgICAgICAgICAgICdoNHYnICsgKDIgKiBNSU5TRUxFQ1QpICsgJ2gtNFonKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICd2Jykge1xuICAgICAgICAgICAgICAgIC8vIHZlcnRpY2FsIG1vdGlvblxuICAgICAgICAgICAgICAgIGN1cnJlbnRQb2x5Z29uID0gaXNMaW5lT3JFbGxpcHNlID9cbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRWxsaXBzZShpc0VsbGlwc2UsIFtzdGFydCwgeTFdLCBbZW5kLCB5MV0pIDogLy8gdXNpbmcgeTEgaW5zdGVhZCBvZiB5MCBhbGxvd3MgYWRqdXN0aW5nIHRoZSBsaW5lIHdoaWxlIGRyYXdpbmdcbiAgICAgICAgICAgICAgICAgICAgW1tzdGFydCwgeTBdLCBbc3RhcnQsIHkxXSwgW2VuZCwgeTFdLCBbZW5kLCB5MF1dOyAvLyBtYWtlIGEgaG9yaXpvbnRhbCBib3hcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRQb2x5Z29uLnhtaW4gPSBNYXRoLm1pbihzdGFydCwgZW5kKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9seWdvbi54bWF4ID0gTWF0aC5tYXgoc3RhcnQsIGVuZCk7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvbHlnb24ueW1pbiA9IGlzTGluZU9yRWxsaXBzZSA/IHkxIDogTWF0aC5taW4oeTAsIHkxKTtcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9seWdvbi55bWF4ID0gaXNMaW5lT3JFbGxpcHNlID8geTEgOiBNYXRoLm1heCh5MCwgeTEpO1xuICAgICAgICAgICAgICAgIGNvcm5lcnMuYXR0cignZCcsICdNJyArICh4MCAtIE1JTlNFTEVDVCkgKyAnLCcgKyBjdXJyZW50UG9seWdvbi55bWluICtcbiAgICAgICAgICAgICAgICAgICAgJ3YtNGgnICsgKDIgKiBNSU5TRUxFQ1QpICsgJ3Y0WicgK1xuICAgICAgICAgICAgICAgICAgICAnTScgKyAoeDAgLSBNSU5TRUxFQ1QpICsgJywnICsgKGN1cnJlbnRQb2x5Z29uLnltYXggLSAxKSArXG4gICAgICAgICAgICAgICAgICAgICd2NGgnICsgKDIgKiBNSU5TRUxFQ1QpICsgJ3YtNFonKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihkaXJlY3Rpb24gPT09ICdkJykge1xuICAgICAgICAgICAgICAgIC8vIGRpYWdvbmFsIG1vdGlvblxuICAgICAgICAgICAgICAgIGN1cnJlbnRQb2x5Z29uID0gaXNMaW5lT3JFbGxpcHNlID9cbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlRWxsaXBzZShpc0VsbGlwc2UsIFt4MCwgeTBdLCBbeDEsIHkxXSkgOlxuICAgICAgICAgICAgICAgICAgICBbW3gwLCB5MF0sIFt4MCwgeTFdLCBbeDEsIHkxXSwgW3gxLCB5MF1dO1xuXG4gICAgICAgICAgICAgICAgY3VycmVudFBvbHlnb24ueG1pbiA9IE1hdGgubWluKHgwLCB4MSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvbHlnb24ueG1heCA9IE1hdGgubWF4KHgwLCB4MSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvbHlnb24ueW1pbiA9IE1hdGgubWluKHkwLCB5MSk7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvbHlnb24ueW1heCA9IE1hdGgubWF4KHkwLCB5MSk7XG4gICAgICAgICAgICAgICAgY29ybmVycy5hdHRyKCdkJywgJ00wLDBaJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihpc0ZyZWVNb2RlKSB7XG4gICAgICAgICAgICBmaWx0ZXJQb2x5LmFkZFB0KFt4MSwgeTFdKTtcbiAgICAgICAgICAgIGN1cnJlbnRQb2x5Z29uID0gZmlsdGVyUG9seS5maWx0ZXJlZDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNyZWF0ZSBvdXRsaW5lICYgdGVzdGVyXG4gICAgICAgIGlmKGRyYWdPcHRpb25zLnNlbGVjdGlvbkRlZnMgJiYgZHJhZ09wdGlvbnMuc2VsZWN0aW9uRGVmcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1lcmdlZFBvbHlnb25zID0gbWVyZ2VQb2x5Z29ucyhkcmFnT3B0aW9ucy5tZXJnZWRQb2x5Z29ucywgY3VycmVudFBvbHlnb24sIHN1YnRyYWN0KTtcbiAgICAgICAgICAgIGN1cnJlbnRQb2x5Z29uLnN1YnRyYWN0ID0gc3VidHJhY3Q7XG4gICAgICAgICAgICBzZWxlY3Rpb25UZXN0ZXIgPSBtdWx0aVRlc3RlcihkcmFnT3B0aW9ucy5zZWxlY3Rpb25EZWZzLmNvbmNhdChbY3VycmVudFBvbHlnb25dKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXJnZWRQb2x5Z29ucyA9IFtjdXJyZW50UG9seWdvbl07XG4gICAgICAgICAgICBzZWxlY3Rpb25UZXN0ZXIgPSBwb2x5Z29uVGVzdGVyKGN1cnJlbnRQb2x5Z29uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGRpc3BsYXkgcG9seWdvbnMgb24gdGhlIHNjcmVlblxuICAgICAgICBkaXNwbGF5T3V0bGluZXMoY29udmVydFBvbHkobWVyZ2VkUG9seWdvbnMsIGlzT3Blbk1vZGUpLCBvdXRsaW5lcywgZHJhZ09wdGlvbnMpO1xuXG4gICAgICAgIGlmKGlzU2VsZWN0TW9kZSkge1xuICAgICAgICAgICAgdGhyb3R0bGUudGhyb3R0bGUoXG4gICAgICAgICAgICAgICAgdGhyb3R0bGVJRCxcbiAgICAgICAgICAgICAgICBjb25zdGFudHMuU0VMRUNUREVMQVksXG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbiA9IFtdO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlzU2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhY2VTZWxlY3Rpb25zID0gW107XG4gICAgICAgICAgICAgICAgICAgIHZhciB0cmFjZVNlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgc2VhcmNoVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hJbmZvID0gc2VhcmNoVHJhY2VzW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICB0cmFjZVNlbGVjdGlvbiA9IHNlYXJjaEluZm8uX21vZHVsZS5zZWxlY3RQb2ludHMoc2VhcmNoSW5mbywgc2VsZWN0aW9uVGVzdGVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlU2VsZWN0aW9ucy5wdXNoKHRyYWNlU2VsZWN0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpc1NlbGVjdGlvbiA9IGZpbGxTZWxlY3Rpb25JdGVtKHRyYWNlU2VsZWN0aW9uLCBzZWFyY2hJbmZvKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYoc2VsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCB0aGlzU2VsZWN0aW9uLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGlvbi5wdXNoKHRoaXNTZWxlY3Rpb25bal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBzZWxlY3Rpb24gPSB0aGlzU2VsZWN0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRhID0ge3BvaW50czogc2VsZWN0aW9ufTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRTdGF0ZShnZCwgc2VhcmNoVHJhY2VzLCBldmVudERhdGEpO1xuICAgICAgICAgICAgICAgICAgICBmaWxsUmFuZ2VJdGVtcyhldmVudERhdGEsIGN1cnJlbnRQb2x5Z29uLCBmaWx0ZXJQb2x5KTtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ09wdGlvbnMuZ2QuZW1pdCgncGxvdGx5X3NlbGVjdGluZycsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBkcmFnT3B0aW9ucy5jbGlja0ZuID0gZnVuY3Rpb24obnVtQ2xpY2tzLCBldnQpIHtcbiAgICAgICAgY29ybmVycy5yZW1vdmUoKTtcblxuICAgICAgICBpZihnZC5fZnVsbExheW91dC5fYWN0aXZlU2hhcGVJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICBnZC5fZnVsbExheW91dC5fZGVhY3RpdmF0ZVNoYXBlKGdkKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZihpc0RyYXdNb2RlKSByZXR1cm47XG5cbiAgICAgICAgdmFyIGNsaWNrbW9kZSA9IGZ1bGxMYXlvdXQuY2xpY2ttb2RlO1xuXG4gICAgICAgIHRocm90dGxlLmRvbmUodGhyb3R0bGVJRCkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRocm90dGxlLmNsZWFyKHRocm90dGxlSUQpO1xuICAgICAgICAgICAgaWYobnVtQ2xpY2tzID09PSAyKSB7XG4gICAgICAgICAgICAgICAgLy8gY2xlYXIgc2VsZWN0aW9uIG9uIGRvdWJsZWNsaWNrXG4gICAgICAgICAgICAgICAgb3V0bGluZXMucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgc2VhcmNoVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEluZm8gPSBzZWFyY2hUcmFjZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaEluZm8uX21vZHVsZS5zZWxlY3RQb2ludHMoc2VhcmNoSW5mbywgZmFsc2UpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkU3RhdGUoZ2QsIHNlYXJjaFRyYWNlcyk7XG5cbiAgICAgICAgICAgICAgICBjbGVhclNlbGVjdGlvbnNDYWNoZShkcmFnT3B0aW9ucyk7XG5cbiAgICAgICAgICAgICAgICBnZC5lbWl0KCdwbG90bHlfZGVzZWxlY3QnLCBudWxsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYoY2xpY2ttb2RlLmluZGV4T2YoJ3NlbGVjdCcpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0T25DbGljayhldnQsIGdkLCBkcmFnT3B0aW9ucy54YXhlcywgZHJhZ09wdGlvbnMueWF4ZXMsXG4gICAgICAgICAgICAgICAgICAgICAgZHJhZ09wdGlvbnMuc3VicGxvdCwgZHJhZ09wdGlvbnMsIG91dGxpbmVzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihjbGlja21vZGUgPT09ICdldmVudCcpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gVE9ETzogcmVtb3ZlIGluIHYyIC0gdGhpcyB3YXMgcHJvYmFibHkgbmV2ZXIgaW50ZW5kZWQgdG8gd29yayBhcyBpdCBkb2VzLFxuICAgICAgICAgICAgICAgICAgICAvLyBidXQgaW4gY2FzZSBhbnlvbmUgZGVwZW5kcyBvbiBpdCB3ZSBkb24ndCB3YW50IHRvIGJyZWFrIGl0IG5vdy5cbiAgICAgICAgICAgICAgICAgICAgLy8gTm90ZSB0aGF0IGNsaWNrLXRvLXNlbGVjdCBpbnRyb2R1Y2VkIHByZSB2MiBhbHNvIGVtaXR0cyBwcm9wZXJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXZlbnQgZGF0YSB3aGVuIGNsaWNrbW9kZSBpcyBoYXZpbmcgJ3NlbGVjdCcgaW4gaXRzIGZsYWcgbGlzdC5cbiAgICAgICAgICAgICAgICAgICAgZ2QuZW1pdCgncGxvdGx5X3NlbGVjdGVkJywgdW5kZWZpbmVkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIEZ4LmNsaWNrKGdkLCBldnQpO1xuICAgICAgICB9KS5jYXRjaChMaWIuZXJyb3IpO1xuICAgIH07XG5cbiAgICBkcmFnT3B0aW9ucy5kb25lRm4gPSBmdW5jdGlvbigpIHtcbiAgICAgICAgY29ybmVycy5yZW1vdmUoKTtcblxuICAgICAgICB0aHJvdHRsZS5kb25lKHRocm90dGxlSUQpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aHJvdHRsZS5jbGVhcih0aHJvdHRsZUlEKTtcbiAgICAgICAgICAgIGRyYWdPcHRpb25zLmdkLmVtaXQoJ3Bsb3RseV9zZWxlY3RlZCcsIGV2ZW50RGF0YSk7XG5cbiAgICAgICAgICAgIGlmKGN1cnJlbnRQb2x5Z29uICYmIGRyYWdPcHRpb25zLnNlbGVjdGlvbkRlZnMpIHtcbiAgICAgICAgICAgICAgICAvLyBzYXZlIGxhc3QgcG9seWdvbnNcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9seWdvbi5zdWJ0cmFjdCA9IHN1YnRyYWN0O1xuICAgICAgICAgICAgICAgIGRyYWdPcHRpb25zLnNlbGVjdGlvbkRlZnMucHVzaChjdXJyZW50UG9seWdvbik7XG5cbiAgICAgICAgICAgICAgICAvLyB3ZSBoYXZlIHRvIGtlZXAgcmVmZXJlbmNlIHRvIGFycmF5cyBjb250YWluZXJcbiAgICAgICAgICAgICAgICBkcmFnT3B0aW9ucy5tZXJnZWRQb2x5Z29ucy5sZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgIFtdLnB1c2guYXBwbHkoZHJhZ09wdGlvbnMubWVyZ2VkUG9seWdvbnMsIG1lcmdlZFBvbHlnb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoZHJhZ09wdGlvbnMuZG9uZUZuQ29tcGxldGVkKSB7XG4gICAgICAgICAgICAgICAgZHJhZ09wdGlvbnMuZG9uZUZuQ29tcGxldGVkKHNlbGVjdGlvbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pLmNhdGNoKExpYi5lcnJvcik7XG5cbiAgICAgICAgaWYoaXNEcmF3TW9kZSkge1xuICAgICAgICAgICAgY2xlYXJTZWxlY3Rpb25zQ2FjaGUoZHJhZ09wdGlvbnMpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0T25DbGljayhldnQsIGdkLCB4QXhlcywgeUF4ZXMsIHN1YnBsb3QsIGRyYWdPcHRpb25zLCBwb2x5Z29uT3V0bGluZXMpIHtcbiAgICB2YXIgaG92ZXJEYXRhID0gZ2QuX2hvdmVyZGF0YTtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBjbGlja21vZGUgPSBmdWxsTGF5b3V0LmNsaWNrbW9kZTtcbiAgICB2YXIgc2VuZEV2ZW50cyA9IGNsaWNrbW9kZS5pbmRleE9mKCdldmVudCcpID4gLTE7XG4gICAgdmFyIHNlbGVjdGlvbiA9IFtdO1xuICAgIHZhciBzZWFyY2hUcmFjZXMsIHNlYXJjaEluZm8sIGN1cnJlbnRTZWxlY3Rpb25EZWYsIHNlbGVjdGlvblRlc3RlciwgdHJhY2VTZWxlY3Rpb247XG4gICAgdmFyIHRoaXNUcmFjZXNTZWxlY3Rpb24sIHBvaW50T3JCaW5TZWxlY3RlZCwgc3VidHJhY3QsIGV2ZW50RGF0YSwgaTtcblxuICAgIGlmKGlzSG92ZXJEYXRhU2V0KGhvdmVyRGF0YSkpIHtcbiAgICAgICAgY29lcmNlU2VsZWN0aW9uc0NhY2hlKGV2dCwgZ2QsIGRyYWdPcHRpb25zKTtcbiAgICAgICAgc2VhcmNoVHJhY2VzID0gZGV0ZXJtaW5lU2VhcmNoVHJhY2VzKGdkLCB4QXhlcywgeUF4ZXMsIHN1YnBsb3QpO1xuICAgICAgICB2YXIgY2xpY2tlZFB0SW5mbyA9IGV4dHJhY3RDbGlja2VkUHRJbmZvKGhvdmVyRGF0YSwgc2VhcmNoVHJhY2VzKTtcbiAgICAgICAgdmFyIGlzQmlubmVkVHJhY2UgPSBjbGlja2VkUHRJbmZvLnBvaW50TnVtYmVycy5sZW5ndGggPiAwO1xuXG5cbiAgICAgICAgLy8gTm90ZTogcG90ZW50aWFsbHkgY29zdGx5IG9wZXJhdGlvbiBpc1BvaW50T3JCaW5TZWxlY3RlZCBpc1xuICAgICAgICAvLyBjYWxsZWQgYXMgbGF0ZSBhcyBwb3NzaWJsZSB0aHJvdWdoIHRoZSB1c2Ugb2YgYW4gYXNzaWdubWVudFxuICAgICAgICAvLyBpbiBhbiBpZiBjb25kaXRpb24uXG4gICAgICAgIGlmKGlzQmlubmVkVHJhY2UgP1xuICAgICAgICAgICAgaXNPbmx5VGhpc0JpblNlbGVjdGVkKHNlYXJjaFRyYWNlcywgY2xpY2tlZFB0SW5mbykgOlxuICAgICAgICAgICAgaXNPbmx5T25lUG9pbnRTZWxlY3RlZChzZWFyY2hUcmFjZXMpICYmXG4gICAgICAgICAgICAgICAgKHBvaW50T3JCaW5TZWxlY3RlZCA9IGlzUG9pbnRPckJpblNlbGVjdGVkKGNsaWNrZWRQdEluZm8pKSkge1xuICAgICAgICAgICAgaWYocG9seWdvbk91dGxpbmVzKSBwb2x5Z29uT3V0bGluZXMucmVtb3ZlKCk7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBzZWFyY2hUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBzZWFyY2hJbmZvID0gc2VhcmNoVHJhY2VzW2ldO1xuICAgICAgICAgICAgICAgIHNlYXJjaEluZm8uX21vZHVsZS5zZWxlY3RQb2ludHMoc2VhcmNoSW5mbywgZmFsc2UpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFN0YXRlKGdkLCBzZWFyY2hUcmFjZXMpO1xuXG4gICAgICAgICAgICBjbGVhclNlbGVjdGlvbnNDYWNoZShkcmFnT3B0aW9ucyk7XG5cbiAgICAgICAgICAgIGlmKHNlbmRFdmVudHMpIHtcbiAgICAgICAgICAgICAgICBnZC5lbWl0KCdwbG90bHlfZGVzZWxlY3QnLCBudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1YnRyYWN0ID0gZXZ0LnNoaWZ0S2V5ICYmXG4gICAgICAgICAgICAgIChwb2ludE9yQmluU2VsZWN0ZWQgIT09IHVuZGVmaW5lZCA/XG4gICAgICAgICAgICAgICAgcG9pbnRPckJpblNlbGVjdGVkIDpcbiAgICAgICAgICAgICAgICBpc1BvaW50T3JCaW5TZWxlY3RlZChjbGlja2VkUHRJbmZvKSk7XG4gICAgICAgICAgICBjdXJyZW50U2VsZWN0aW9uRGVmID0gbmV3UG9pbnRTZWxlY3Rpb25EZWYoY2xpY2tlZFB0SW5mby5wb2ludE51bWJlciwgY2xpY2tlZFB0SW5mby5zZWFyY2hJbmZvLCBzdWJ0cmFjdCk7XG5cbiAgICAgICAgICAgIHZhciBhbGxTZWxlY3Rpb25EZWZzID0gZHJhZ09wdGlvbnMuc2VsZWN0aW9uRGVmcy5jb25jYXQoW2N1cnJlbnRTZWxlY3Rpb25EZWZdKTtcbiAgICAgICAgICAgIHNlbGVjdGlvblRlc3RlciA9IG11bHRpVGVzdGVyKGFsbFNlbGVjdGlvbkRlZnMpO1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBzZWFyY2hUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0cmFjZVNlbGVjdGlvbiA9IHNlYXJjaFRyYWNlc1tpXS5fbW9kdWxlLnNlbGVjdFBvaW50cyhzZWFyY2hUcmFjZXNbaV0sIHNlbGVjdGlvblRlc3Rlcik7XG4gICAgICAgICAgICAgICAgdGhpc1RyYWNlc1NlbGVjdGlvbiA9IGZpbGxTZWxlY3Rpb25JdGVtKHRyYWNlU2VsZWN0aW9uLCBzZWFyY2hUcmFjZXNbaV0pO1xuXG4gICAgICAgICAgICAgICAgaWYoc2VsZWN0aW9uLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgdGhpc1RyYWNlc1NlbGVjdGlvbi5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0aW9uLnB1c2godGhpc1RyYWNlc1NlbGVjdGlvbltqXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Ugc2VsZWN0aW9uID0gdGhpc1RyYWNlc1NlbGVjdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgZXZlbnREYXRhID0ge3BvaW50czogc2VsZWN0aW9ufTtcbiAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkU3RhdGUoZ2QsIHNlYXJjaFRyYWNlcywgZXZlbnREYXRhKTtcblxuICAgICAgICAgICAgaWYoY3VycmVudFNlbGVjdGlvbkRlZiAmJiBkcmFnT3B0aW9ucykge1xuICAgICAgICAgICAgICAgIGRyYWdPcHRpb25zLnNlbGVjdGlvbkRlZnMucHVzaChjdXJyZW50U2VsZWN0aW9uRGVmKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYocG9seWdvbk91dGxpbmVzKSB7XG4gICAgICAgICAgICAgICAgdmFyIHBvbHlnb25zID0gZHJhZ09wdGlvbnMubWVyZ2VkUG9seWdvbnM7XG4gICAgICAgICAgICAgICAgdmFyIGlzT3Blbk1vZGUgPSBvcGVuTW9kZShkcmFnT3B0aW9ucy5kcmFnbW9kZSk7XG5cbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IHBvbHlnb25zIG9uIHRoZSBzY3JlZW5cbiAgICAgICAgICAgICAgICBkaXNwbGF5T3V0bGluZXMoY29udmVydFBvbHkocG9seWdvbnMsIGlzT3Blbk1vZGUpLCBwb2x5Z29uT3V0bGluZXMsIGRyYWdPcHRpb25zKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoc2VuZEV2ZW50cykge1xuICAgICAgICAgICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9zZWxlY3RlZCcsIGV2ZW50RGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQ29uc3RydWN0cyBhIG5ldyBwb2ludCBzZWxlY3Rpb24gZGVmaW5pdGlvbiBvYmplY3QuXG4gKi9cbmZ1bmN0aW9uIG5ld1BvaW50U2VsZWN0aW9uRGVmKHBvaW50TnVtYmVyLCBzZWFyY2hJbmZvLCBzdWJ0cmFjdCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHBvaW50TnVtYmVyOiBwb2ludE51bWJlcixcbiAgICAgICAgc2VhcmNoSW5mbzogc2VhcmNoSW5mbyxcbiAgICAgICAgc3VidHJhY3Q6IHN1YnRyYWN0XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gaXNQb2ludFNlbGVjdGlvbkRlZihvKSB7XG4gICAgcmV0dXJuICdwb2ludE51bWJlcicgaW4gbyAmJiAnc2VhcmNoSW5mbycgaW4gbztcbn1cblxuLypcbiAqIENvbnN0cnVjdHMgYSBuZXcgcG9pbnQgbnVtYmVyIHRlc3Rlci5cbiAqL1xuZnVuY3Rpb24gbmV3UG9pbnROdW1UZXN0ZXIocG9pbnRTZWxlY3Rpb25EZWYpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4bWluOiAwLFxuICAgICAgICB4bWF4OiAwLFxuICAgICAgICB5bWluOiAwLFxuICAgICAgICB5bWF4OiAwLFxuICAgICAgICBwdHM6IFtdLFxuICAgICAgICBjb250YWluczogZnVuY3Rpb24ocHQsIG9taXRGaXJzdEVkZ2UsIHBvaW50TnVtYmVyLCBzZWFyY2hJbmZvKSB7XG4gICAgICAgICAgICB2YXIgaWR4V2FudGVkVHJhY2UgPSBwb2ludFNlbGVjdGlvbkRlZi5zZWFyY2hJbmZvLmNkWzBdLnRyYWNlLl9leHBhbmRlZEluZGV4O1xuICAgICAgICAgICAgdmFyIGlkeEFjdHVhbFRyYWNlID0gc2VhcmNoSW5mby5jZFswXS50cmFjZS5fZXhwYW5kZWRJbmRleDtcbiAgICAgICAgICAgIHJldHVybiBpZHhBY3R1YWxUcmFjZSA9PT0gaWR4V2FudGVkVHJhY2UgJiZcbiAgICAgICAgICAgICAgcG9pbnROdW1iZXIgPT09IHBvaW50U2VsZWN0aW9uRGVmLnBvaW50TnVtYmVyO1xuICAgICAgICB9LFxuICAgICAgICBpc1JlY3Q6IGZhbHNlLFxuICAgICAgICBkZWdlbmVyYXRlOiBmYWxzZSxcbiAgICAgICAgc3VidHJhY3Q6IHBvaW50U2VsZWN0aW9uRGVmLnN1YnRyYWN0XG4gICAgfTtcbn1cblxuLyoqXG4gKiBXcmFwcyBtdWx0aXBsZSBzZWxlY3Rpb24gdGVzdGVycy5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSBsaXN0IC0gQW4gYXJyYXkgb2Ygc2VsZWN0aW9uIHRlc3RlcnMuXG4gKlxuICogQHJldHVybiBhIHNlbGVjdGlvbiB0ZXN0ZXIgb2JqZWN0IHdpdGggYSBjb250YWlucyBmdW5jdGlvblxuICogdGhhdCBjYW4gYmUgY2FsbGVkIHRvIGV2YWx1YXRlIGEgcG9pbnQgYWdhaW5zdCBhbGwgd3JhcHBlZFxuICogc2VsZWN0aW9uIHRlc3RlcnMgdGhhdCB3ZXJlIHBhc3NlZCBpbiBsaXN0LlxuICovXG5mdW5jdGlvbiBtdWx0aVRlc3RlcihsaXN0KSB7XG4gICAgdmFyIHRlc3RlcnMgPSBbXTtcbiAgICB2YXIgeG1pbiA9IGlzUG9pbnRTZWxlY3Rpb25EZWYobGlzdFswXSkgPyAwIDogbGlzdFswXVswXVswXTtcbiAgICB2YXIgeG1heCA9IHhtaW47XG4gICAgdmFyIHltaW4gPSBpc1BvaW50U2VsZWN0aW9uRGVmKGxpc3RbMF0pID8gMCA6IGxpc3RbMF1bMF1bMV07XG4gICAgdmFyIHltYXggPSB5bWluO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoaXNQb2ludFNlbGVjdGlvbkRlZihsaXN0W2ldKSkge1xuICAgICAgICAgICAgdGVzdGVycy5wdXNoKG5ld1BvaW50TnVtVGVzdGVyKGxpc3RbaV0pKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0ZXN0ZXIgPSBwb2x5Z29uLnRlc3RlcihsaXN0W2ldKTtcbiAgICAgICAgICAgIHRlc3Rlci5zdWJ0cmFjdCA9IGxpc3RbaV0uc3VidHJhY3Q7XG4gICAgICAgICAgICB0ZXN0ZXJzLnB1c2godGVzdGVyKTtcbiAgICAgICAgICAgIHhtaW4gPSBNYXRoLm1pbih4bWluLCB0ZXN0ZXIueG1pbik7XG4gICAgICAgICAgICB4bWF4ID0gTWF0aC5tYXgoeG1heCwgdGVzdGVyLnhtYXgpO1xuICAgICAgICAgICAgeW1pbiA9IE1hdGgubWluKHltaW4sIHRlc3Rlci55bWluKTtcbiAgICAgICAgICAgIHltYXggPSBNYXRoLm1heCh5bWF4LCB0ZXN0ZXIueW1heCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyBpZiB0aGUgZ2l2ZW4gcG9pbnQgaXMgd2l0aGluIHRoaXMgdGVzdGVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtBcnJheX0gcHQgLSBbMF0gaXMgdGhlIHggY29vcmRpbmF0ZSwgWzFdIGlzIHRoZSB5IGNvb3JkaW5hdGUgb2YgdGhlIHBvaW50LlxuICAgICAqIEBwYXJhbSB7Kn0gYXJnIC0gQW4gb3B0aW9uYWwgcGFyYW1ldGVyIHRvIHBhc3MgZG93biB0byB3cmFwcGVkIHRlc3RlcnMuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHBvaW50TnVtYmVyIC0gVGhlIHBvaW50IG51bWJlciBvZiB0aGUgcG9pbnQgd2l0aGluIHRoZSB1bmRlcmx5aW5nIGRhdGEgYXJyYXkuXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHNlYXJjaEluZm8gLSBBbiBvYmplY3QgaWRlbnRpZnlpbmcgdGhlIHRyYWNlIHRoZSBwb2ludCBpcyBjb250YWluZWQgaW4uXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSB0cnVlIGlmIHBvaW50IGlzIGNvbnNpZGVyZWQgdG8gYmUgc2VsZWN0ZWQsIGZhbHNlIG90aGVyd2lzZS5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBjb250YWlucyhwdCwgYXJnLCBwb2ludE51bWJlciwgc2VhcmNoSW5mbykge1xuICAgICAgICB2YXIgY29udGFpbmVkID0gZmFsc2U7XG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0ZXN0ZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZih0ZXN0ZXJzW2ldLmNvbnRhaW5zKHB0LCBhcmcsIHBvaW50TnVtYmVyLCBzZWFyY2hJbmZvKSkge1xuICAgICAgICAgICAgICAgIC8vIGlmIGNvbnRhaW5lZCBieSBzdWJ0cmFjdCB0ZXN0ZXIgLSBleGNsdWRlIHRoZSBwb2ludFxuICAgICAgICAgICAgICAgIGNvbnRhaW5lZCA9IHRlc3RlcnNbaV0uc3VidHJhY3QgPT09IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB4bWluOiB4bWluLFxuICAgICAgICB4bWF4OiB4bWF4LFxuICAgICAgICB5bWluOiB5bWluLFxuICAgICAgICB5bWF4OiB5bWF4LFxuICAgICAgICBwdHM6IFtdLFxuICAgICAgICBjb250YWluczogY29udGFpbnMsXG4gICAgICAgIGlzUmVjdDogZmFsc2UsXG4gICAgICAgIGRlZ2VuZXJhdGU6IGZhbHNlXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gY29lcmNlU2VsZWN0aW9uc0NhY2hlKGV2dCwgZ2QsIGRyYWdPcHRpb25zKSB7XG4gICAgZ2QuX2Z1bGxMYXlvdXQuX2RyYXdpbmcgPSBmYWxzZTtcblxuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIHBsb3RpbmZvID0gZHJhZ09wdGlvbnMucGxvdGluZm87XG4gICAgdmFyIGRyYWdtb2RlID0gZHJhZ09wdGlvbnMuZHJhZ21vZGU7XG5cbiAgICB2YXIgc2VsZWN0aW5nT25TYW1lU3VicGxvdCA9IChcbiAgICAgICAgZnVsbExheW91dC5fbGFzdFNlbGVjdGVkU3VicGxvdCAmJlxuICAgICAgICBmdWxsTGF5b3V0Ll9sYXN0U2VsZWN0ZWRTdWJwbG90ID09PSBwbG90aW5mby5pZFxuICAgICk7XG5cbiAgICB2YXIgaGFzTW9kaWZpZXJLZXkgPSAoZXZ0LnNoaWZ0S2V5IHx8IGV2dC5hbHRLZXkpICYmXG4gICAgICAgICEoZHJhd01vZGUoZHJhZ21vZGUpICYmIG9wZW5Nb2RlKGRyYWdtb2RlKSk7XG5cbiAgICBpZihzZWxlY3RpbmdPblNhbWVTdWJwbG90ICYmIGhhc01vZGlmaWVyS2V5ICYmXG4gICAgICAocGxvdGluZm8uc2VsZWN0aW9uICYmIHBsb3RpbmZvLnNlbGVjdGlvbi5zZWxlY3Rpb25EZWZzKSAmJiAhZHJhZ09wdGlvbnMuc2VsZWN0aW9uRGVmcykge1xuICAgICAgICAvLyB0YWtlIG92ZXIgc2VsZWN0aW9uIGRlZmluaXRpb25zIGZyb20gcHJldiBtb2RlLCBpZiBhbnlcbiAgICAgICAgZHJhZ09wdGlvbnMuc2VsZWN0aW9uRGVmcyA9IHBsb3RpbmZvLnNlbGVjdGlvbi5zZWxlY3Rpb25EZWZzO1xuICAgICAgICBkcmFnT3B0aW9ucy5tZXJnZWRQb2x5Z29ucyA9IHBsb3RpbmZvLnNlbGVjdGlvbi5tZXJnZWRQb2x5Z29ucztcbiAgICB9IGVsc2UgaWYoIWhhc01vZGlmaWVyS2V5IHx8ICFwbG90aW5mby5zZWxlY3Rpb24pIHtcbiAgICAgICAgY2xlYXJTZWxlY3Rpb25zQ2FjaGUoZHJhZ09wdGlvbnMpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIHNlbGVjdGlvbiBvdXRsaW5lIHdoZW4gc2VsZWN0aW5nIGEgZGlmZmVyZW50IHN1YnBsb3RcbiAgICBpZighc2VsZWN0aW5nT25TYW1lU3VicGxvdCkge1xuICAgICAgICBjbGVhclNlbGVjdChnZCk7XG4gICAgICAgIGZ1bGxMYXlvdXQuX2xhc3RTZWxlY3RlZFN1YnBsb3QgPSBwbG90aW5mby5pZDtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGNsZWFyU2VsZWN0aW9uc0NhY2hlKGRyYWdPcHRpb25zKSB7XG4gICAgdmFyIGRyYWdtb2RlID0gZHJhZ09wdGlvbnMuZHJhZ21vZGU7XG4gICAgdmFyIHBsb3RpbmZvID0gZHJhZ09wdGlvbnMucGxvdGluZm87XG5cbiAgICB2YXIgZ2QgPSBkcmFnT3B0aW9ucy5nZDtcbiAgICBpZihnZC5fZnVsbExheW91dC5fYWN0aXZlU2hhcGVJbmRleCA+PSAwKSB7XG4gICAgICAgIGdkLl9mdWxsTGF5b3V0Ll9kZWFjdGl2YXRlU2hhcGUoZ2QpO1xuICAgIH1cblxuICAgIGlmKGRyYXdNb2RlKGRyYWdtb2RlKSkge1xuICAgICAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgICAgICB2YXIgem9vbUxheWVyID0gZnVsbExheW91dC5fem9vbWxheWVyO1xuXG4gICAgICAgIHZhciBvdXRsaW5lcyA9IHpvb21MYXllci5zZWxlY3RBbGwoJy5zZWxlY3Qtb3V0bGluZS0nICsgcGxvdGluZm8uaWQpO1xuICAgICAgICBpZihvdXRsaW5lcyAmJiBnZC5fZnVsbExheW91dC5fZHJhd2luZykge1xuICAgICAgICAgICAgLy8gYWRkIHNoYXBlXG4gICAgICAgICAgICB2YXIgc2hhcGVzID0gbmV3U2hhcGVzKG91dGxpbmVzLCBkcmFnT3B0aW9ucyk7XG4gICAgICAgICAgICBpZihzaGFwZXMpIHtcbiAgICAgICAgICAgICAgICBSZWdpc3RyeS5jYWxsKCdfZ3VpUmVsYXlvdXQnLCBnZCwge1xuICAgICAgICAgICAgICAgICAgICBzaGFwZXM6IHNoYXBlc1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBnZC5fZnVsbExheW91dC5fZHJhd2luZyA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcGxvdGluZm8uc2VsZWN0aW9uID0ge307XG4gICAgcGxvdGluZm8uc2VsZWN0aW9uLnNlbGVjdGlvbkRlZnMgPSBkcmFnT3B0aW9ucy5zZWxlY3Rpb25EZWZzID0gW107XG4gICAgcGxvdGluZm8uc2VsZWN0aW9uLm1lcmdlZFBvbHlnb25zID0gZHJhZ09wdGlvbnMubWVyZ2VkUG9seWdvbnMgPSBbXTtcbn1cblxuZnVuY3Rpb24gZGV0ZXJtaW5lU2VhcmNoVHJhY2VzKGdkLCB4QXhlcywgeUF4ZXMsIHN1YnBsb3QpIHtcbiAgICB2YXIgc2VhcmNoVHJhY2VzID0gW107XG4gICAgdmFyIHhBeGlzSWRzID0geEF4ZXMubWFwKGZ1bmN0aW9uKGF4KSB7IHJldHVybiBheC5faWQ7IH0pO1xuICAgIHZhciB5QXhpc0lkcyA9IHlBeGVzLm1hcChmdW5jdGlvbihheCkgeyByZXR1cm4gYXguX2lkOyB9KTtcbiAgICB2YXIgY2QsIHRyYWNlLCBpO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgZ2QuY2FsY2RhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2QgPSBnZC5jYWxjZGF0YVtpXTtcbiAgICAgICAgdHJhY2UgPSBjZFswXS50cmFjZTtcblxuICAgICAgICBpZih0cmFjZS52aXNpYmxlICE9PSB0cnVlIHx8ICF0cmFjZS5fbW9kdWxlIHx8ICF0cmFjZS5fbW9kdWxlLnNlbGVjdFBvaW50cykgY29udGludWU7XG5cbiAgICAgICAgaWYoc3VicGxvdCAmJiAodHJhY2Uuc3VicGxvdCA9PT0gc3VicGxvdCB8fCB0cmFjZS5nZW8gPT09IHN1YnBsb3QpKSB7XG4gICAgICAgICAgICBzZWFyY2hUcmFjZXMucHVzaChjcmVhdGVTZWFyY2hJbmZvKHRyYWNlLl9tb2R1bGUsIGNkLCB4QXhlc1swXSwgeUF4ZXNbMF0pKTtcbiAgICAgICAgfSBlbHNlIGlmKFxuICAgICAgICAgIHRyYWNlLnR5cGUgPT09ICdzcGxvbScgJiZcbiAgICAgICAgICAvLyBGSVhNRTogbWFrZSBzdXJlIHdlIGRvbid0IGhhdmUgbW9yZSB0aGFuIHNpbmdsZSBheGlzIGZvciBzcGxvbVxuICAgICAgICAgIHRyYWNlLl94YXhlc1t4QXhpc0lkc1swXV0gJiYgdHJhY2UuX3lheGVzW3lBeGlzSWRzWzBdXVxuICAgICAgICApIHtcbiAgICAgICAgICAgIHZhciBpbmZvID0gY3JlYXRlU2VhcmNoSW5mbyh0cmFjZS5fbW9kdWxlLCBjZCwgeEF4ZXNbMF0sIHlBeGVzWzBdKTtcbiAgICAgICAgICAgIGluZm8uc2NlbmUgPSBnZC5fZnVsbExheW91dC5fc3Bsb21TY2VuZXNbdHJhY2UudWlkXTtcbiAgICAgICAgICAgIHNlYXJjaFRyYWNlcy5wdXNoKGluZm8pO1xuICAgICAgICB9IGVsc2UgaWYoXG4gICAgICAgICAgdHJhY2UudHlwZSA9PT0gJ3NhbmtleSdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB2YXIgc2Fua2V5SW5mbyA9IGNyZWF0ZVNlYXJjaEluZm8odHJhY2UuX21vZHVsZSwgY2QsIHhBeGVzWzBdLCB5QXhlc1swXSk7XG4gICAgICAgICAgICBzZWFyY2hUcmFjZXMucHVzaChzYW5rZXlJbmZvKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKHhBeGlzSWRzLmluZGV4T2YodHJhY2UueGF4aXMpID09PSAtMSkgY29udGludWU7XG4gICAgICAgICAgICBpZih5QXhpc0lkcy5pbmRleE9mKHRyYWNlLnlheGlzKSA9PT0gLTEpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBzZWFyY2hUcmFjZXMucHVzaChjcmVhdGVTZWFyY2hJbmZvKHRyYWNlLl9tb2R1bGUsIGNkLFxuICAgICAgICAgICAgICBnZXRGcm9tSWQoZ2QsIHRyYWNlLnhheGlzKSwgZ2V0RnJvbUlkKGdkLCB0cmFjZS55YXhpcykpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBzZWFyY2hUcmFjZXM7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVTZWFyY2hJbmZvKG1vZHVsZSwgY2FsY0RhdGEsIHhheGlzLCB5YXhpcykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgX21vZHVsZTogbW9kdWxlLFxuICAgICAgICAgICAgY2Q6IGNhbGNEYXRhLFxuICAgICAgICAgICAgeGF4aXM6IHhheGlzLFxuICAgICAgICAgICAgeWF4aXM6IHlheGlzXG4gICAgICAgIH07XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpc0hvdmVyRGF0YVNldChob3ZlckRhdGEpIHtcbiAgICByZXR1cm4gaG92ZXJEYXRhICYmXG4gICAgICBBcnJheS5pc0FycmF5KGhvdmVyRGF0YSkgJiZcbiAgICAgIGhvdmVyRGF0YVswXS5ob3Zlck9uQm94ICE9PSB0cnVlO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0Q2xpY2tlZFB0SW5mbyhob3ZlckRhdGEsIHNlYXJjaFRyYWNlcykge1xuICAgIHZhciBob3ZlckRhdHVtID0gaG92ZXJEYXRhWzBdO1xuICAgIHZhciBwb2ludE51bWJlciA9IC0xO1xuICAgIHZhciBwb2ludE51bWJlcnMgPSBbXTtcbiAgICB2YXIgc2VhcmNoSW5mbywgaTtcblxuICAgIGZvcihpID0gMDsgaSA8IHNlYXJjaFRyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBzZWFyY2hJbmZvID0gc2VhcmNoVHJhY2VzW2ldO1xuICAgICAgICBpZihob3ZlckRhdHVtLmZ1bGxEYXRhLl9leHBhbmRlZEluZGV4ID09PSBzZWFyY2hJbmZvLmNkWzBdLnRyYWNlLl9leHBhbmRlZEluZGV4KSB7XG4gICAgICAgICAgICAvLyBTcGVjaWFsIGNhc2UgZm9yIGJveCAoYW5kIHZpb2xpbilcbiAgICAgICAgICAgIGlmKGhvdmVyRGF0dW0uaG92ZXJPbkJveCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBIaW50OiBpbiBzb21lIHRyYWNlcyBsaWtlIGhpc3RvZ3JhbSwgb25lIGdyYXBoaWNhbCBlbGVtZW50XG4gICAgICAgICAgICAvLyBkb2Vzbid0IGNvcnJlc3BvbmQgdG8gb25lIHBhcnRpY3VsYXIgZGF0YSBwb2ludCwgYnV0IHRvXG4gICAgICAgICAgICAvLyBiaW5zIG9mIGRhdGEgcG9pbnRzLiBUaHVzLCBob3ZlckRhdHVtIGNhbiBoYXZlIGEgYmluTnVtYmVyXG4gICAgICAgICAgICAvLyBwcm9wZXJ0eSBpbnN0ZWFkIG9mIHBvaW50TnVtYmVyLlxuICAgICAgICAgICAgaWYoaG92ZXJEYXR1bS5wb2ludE51bWJlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcG9pbnROdW1iZXIgPSBob3ZlckRhdHVtLnBvaW50TnVtYmVyO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGhvdmVyRGF0dW0uYmluTnVtYmVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBwb2ludE51bWJlciA9IGhvdmVyRGF0dW0uYmluTnVtYmVyO1xuICAgICAgICAgICAgICAgIHBvaW50TnVtYmVycyA9IGhvdmVyRGF0dW0ucG9pbnROdW1iZXJzO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHBvaW50TnVtYmVyOiBwb2ludE51bWJlcixcbiAgICAgICAgcG9pbnROdW1iZXJzOiBwb2ludE51bWJlcnMsXG4gICAgICAgIHNlYXJjaEluZm86IHNlYXJjaEluZm9cbiAgICB9O1xufVxuXG5mdW5jdGlvbiBpc1BvaW50T3JCaW5TZWxlY3RlZChjbGlja2VkUHRJbmZvKSB7XG4gICAgdmFyIHRyYWNlID0gY2xpY2tlZFB0SW5mby5zZWFyY2hJbmZvLmNkWzBdLnRyYWNlO1xuICAgIHZhciBwdE51bSA9IGNsaWNrZWRQdEluZm8ucG9pbnROdW1iZXI7XG4gICAgdmFyIHB0TnVtcyA9IGNsaWNrZWRQdEluZm8ucG9pbnROdW1iZXJzO1xuICAgIHZhciBwdE51bXNTZXQgPSBwdE51bXMubGVuZ3RoID4gMDtcblxuICAgIC8vIFdoZW4gcG9pbnRzTnVtYmVycyBpcyBzZXQgKGUuZy4gaGlzdG9ncmFtJ3MgYmlubmluZyksXG4gICAgLy8gaXQgaXMgYXNzdW1lZCB0aGF0IHdoZW4gdGhlIGZpcnN0IHBvaW50IG9mXG4gICAgLy8gYSBiaW4gaXMgc2VsZWN0ZWQsIGFsbCBvdGhlcnMgYXJlIGFzIHdlbGxcbiAgICB2YXIgcHROdW1Ub1Rlc3QgPSBwdE51bXNTZXQgPyBwdE51bXNbMF0gOiBwdE51bTtcblxuICAgIC8vIFRPRE8gcG90ZW50aWFsIHBlcmZvcm1hbmNlIGltcHJvdmVtZW50XG4gICAgLy8gUHJpbWFyaWx5IHdlIG5lZWQgdGhpcyBmdW5jdGlvbiB0byBkZXRlcm1pbmUgaWYgYSBjbGljayBhZGRzXG4gICAgLy8gb3Igc3VidHJhY3RzIGZyb20gYSBzZWxlY3Rpb24uXG4gICAgLy8gSW4gY2FzZXMgYHRyYWNlLnNlbGVjdGVkcG9pbnRzYCBpcyBhIGh1Z2UgYXJyYXksIGluZGV4T2ZcbiAgICAvLyBtaWdodCBiZSBzbG93LiBPbmUgcmVtZWR5IHdvdWxkIGJlIHRvIGludHJvZHVjZSBhIGhhc2ggc29tZXdoZXJlLlxuICAgIHJldHVybiB0cmFjZS5zZWxlY3RlZHBvaW50cyA/IHRyYWNlLnNlbGVjdGVkcG9pbnRzLmluZGV4T2YocHROdW1Ub1Rlc3QpID4gLTEgOiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNPbmx5VGhpc0JpblNlbGVjdGVkKHNlYXJjaFRyYWNlcywgY2xpY2tlZFB0SW5mbykge1xuICAgIHZhciB0cmFjZXNXaXRoU2VsZWN0ZWRQdHMgPSBbXTtcbiAgICB2YXIgc2VhcmNoSW5mbywgdHJhY2UsIGlzU2FtZVRyYWNlLCBpO1xuXG4gICAgZm9yKGkgPSAwOyBpIDwgc2VhcmNoVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNlYXJjaEluZm8gPSBzZWFyY2hUcmFjZXNbaV07XG4gICAgICAgIGlmKHNlYXJjaEluZm8uY2RbMF0udHJhY2Uuc2VsZWN0ZWRwb2ludHMgJiYgc2VhcmNoSW5mby5jZFswXS50cmFjZS5zZWxlY3RlZHBvaW50cy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB0cmFjZXNXaXRoU2VsZWN0ZWRQdHMucHVzaChzZWFyY2hJbmZvKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKHRyYWNlc1dpdGhTZWxlY3RlZFB0cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaXNTYW1lVHJhY2UgPSB0cmFjZXNXaXRoU2VsZWN0ZWRQdHNbMF0gPT09IGNsaWNrZWRQdEluZm8uc2VhcmNoSW5mbztcbiAgICAgICAgaWYoaXNTYW1lVHJhY2UpIHtcbiAgICAgICAgICAgIHRyYWNlID0gY2xpY2tlZFB0SW5mby5zZWFyY2hJbmZvLmNkWzBdLnRyYWNlO1xuICAgICAgICAgICAgaWYodHJhY2Uuc2VsZWN0ZWRwb2ludHMubGVuZ3RoID09PSBjbGlja2VkUHRJbmZvLnBvaW50TnVtYmVycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBjbGlja2VkUHRJbmZvLnBvaW50TnVtYmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZih0cmFjZS5zZWxlY3RlZHBvaW50cy5pbmRleE9mKGNsaWNrZWRQdEluZm8ucG9pbnROdW1iZXJzW2ldKSA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNPbmx5T25lUG9pbnRTZWxlY3RlZChzZWFyY2hUcmFjZXMpIHtcbiAgICB2YXIgbGVuID0gMDtcbiAgICB2YXIgc2VhcmNoSW5mbywgdHJhY2UsIGk7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBzZWFyY2hUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2VhcmNoSW5mbyA9IHNlYXJjaFRyYWNlc1tpXTtcbiAgICAgICAgdHJhY2UgPSBzZWFyY2hJbmZvLmNkWzBdLnRyYWNlO1xuICAgICAgICBpZih0cmFjZS5zZWxlY3RlZHBvaW50cykge1xuICAgICAgICAgICAgaWYodHJhY2Uuc2VsZWN0ZWRwb2ludHMubGVuZ3RoID4gMSkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgICBsZW4gKz0gdHJhY2Uuc2VsZWN0ZWRwb2ludHMubGVuZ3RoO1xuICAgICAgICAgICAgaWYobGVuID4gMSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGxlbiA9PT0gMTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRTdGF0ZShnZCwgc2VhcmNoVHJhY2VzLCBldmVudERhdGEpIHtcbiAgICB2YXIgaSwgc2VhcmNoSW5mbywgY2QsIHRyYWNlO1xuXG4gICAgLy8gYmVmb3JlIGFueXRoaW5nIGVsc2UsIHVwZGF0ZSBwcmVHVUkgaWYgbmVjZXNzYXJ5XG4gICAgZm9yKGkgPSAwOyBpIDwgc2VhcmNoVHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBmdWxsSW5wdXRUcmFjZSA9IHNlYXJjaFRyYWNlc1tpXS5jZFswXS50cmFjZS5fZnVsbElucHV0O1xuICAgICAgICB2YXIgdHJhY2VQcmVHVUkgPSBnZC5fZnVsbExheW91dC5fdHJhY2VQcmVHVUlbZnVsbElucHV0VHJhY2UudWlkXSB8fCB7fTtcbiAgICAgICAgaWYodHJhY2VQcmVHVUkuc2VsZWN0ZWRwb2ludHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgdHJhY2VQcmVHVUkuc2VsZWN0ZWRwb2ludHMgPSBmdWxsSW5wdXRUcmFjZS5faW5wdXQuc2VsZWN0ZWRwb2ludHMgfHwgbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKGV2ZW50RGF0YSkge1xuICAgICAgICB2YXIgcHRzID0gZXZlbnREYXRhLnBvaW50cyB8fCBbXTtcblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBzZWFyY2hUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYWNlID0gc2VhcmNoVHJhY2VzW2ldLmNkWzBdLnRyYWNlO1xuICAgICAgICAgICAgdHJhY2UuX2lucHV0LnNlbGVjdGVkcG9pbnRzID0gdHJhY2UuX2Z1bGxJbnB1dC5zZWxlY3RlZHBvaW50cyA9IFtdO1xuICAgICAgICAgICAgaWYodHJhY2UuX2Z1bGxJbnB1dCAhPT0gdHJhY2UpIHRyYWNlLnNlbGVjdGVkcG9pbnRzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBwdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwdCA9IHB0c1tpXTtcbiAgICAgICAgICAgIHZhciBkYXRhID0gcHQuZGF0YTtcbiAgICAgICAgICAgIHZhciBmdWxsRGF0YSA9IHB0LmZ1bGxEYXRhO1xuXG4gICAgICAgICAgICBpZihwdC5wb2ludEluZGljZXMpIHtcbiAgICAgICAgICAgICAgICBbXS5wdXNoLmFwcGx5KGRhdGEuc2VsZWN0ZWRwb2ludHMsIHB0LnBvaW50SW5kaWNlcyk7XG4gICAgICAgICAgICAgICAgaWYodHJhY2UuX2Z1bGxJbnB1dCAhPT0gdHJhY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgW10ucHVzaC5hcHBseShmdWxsRGF0YS5zZWxlY3RlZHBvaW50cywgcHQucG9pbnRJbmRpY2VzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRhdGEuc2VsZWN0ZWRwb2ludHMucHVzaChwdC5wb2ludEluZGV4KTtcbiAgICAgICAgICAgICAgICBpZih0cmFjZS5fZnVsbElucHV0ICE9PSB0cmFjZSkge1xuICAgICAgICAgICAgICAgICAgICBmdWxsRGF0YS5zZWxlY3RlZHBvaW50cy5wdXNoKHB0LnBvaW50SW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IHNlYXJjaFRyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdHJhY2UgPSBzZWFyY2hUcmFjZXNbaV0uY2RbMF0udHJhY2U7XG4gICAgICAgICAgICBkZWxldGUgdHJhY2Uuc2VsZWN0ZWRwb2ludHM7XG4gICAgICAgICAgICBkZWxldGUgdHJhY2UuX2lucHV0LnNlbGVjdGVkcG9pbnRzO1xuICAgICAgICAgICAgaWYodHJhY2UuX2Z1bGxJbnB1dCAhPT0gdHJhY2UpIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdHJhY2UuX2Z1bGxJbnB1dC5zZWxlY3RlZHBvaW50cztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciBoYXNSZWdsID0gZmFsc2U7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBzZWFyY2hUcmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc2VhcmNoSW5mbyA9IHNlYXJjaFRyYWNlc1tpXTtcbiAgICAgICAgY2QgPSBzZWFyY2hJbmZvLmNkO1xuICAgICAgICB0cmFjZSA9IGNkWzBdLnRyYWNlO1xuXG4gICAgICAgIGlmKFJlZ2lzdHJ5LnRyYWNlSXModHJhY2UsICdyZWdsJykpIHtcbiAgICAgICAgICAgIGhhc1JlZ2wgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIF9tb2R1bGUgPSBzZWFyY2hJbmZvLl9tb2R1bGU7XG4gICAgICAgIHZhciBmbiA9IF9tb2R1bGUuc3R5bGVPblNlbGVjdCB8fCBfbW9kdWxlLnN0eWxlO1xuICAgICAgICBpZihmbikge1xuICAgICAgICAgICAgZm4oZ2QsIGNkLCBjZFswXS5ub2RlMyk7XG4gICAgICAgICAgICBpZihjZFswXS5ub2RlUmFuZ2VQbG90MykgZm4oZ2QsIGNkLCBjZFswXS5ub2RlUmFuZ2VQbG90Myk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihoYXNSZWdsKSB7XG4gICAgICAgIGNsZWFyR2xDYW52YXNlcyhnZCk7XG4gICAgICAgIHJlZHJhd1JlZ2xUcmFjZXMoZ2QpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gbWVyZ2VQb2x5Z29ucyhsaXN0LCBwb2x5LCBzdWJ0cmFjdCkge1xuICAgIHZhciByZXM7XG5cbiAgICBpZihzdWJ0cmFjdCkge1xuICAgICAgICByZXMgPSBwb2x5Ym9vbC5kaWZmZXJlbmNlKHtcbiAgICAgICAgICAgIHJlZ2lvbnM6IGxpc3QsXG4gICAgICAgICAgICBpbnZlcnRlZDogZmFsc2VcbiAgICAgICAgfSwge1xuICAgICAgICAgICAgcmVnaW9uczogW3BvbHldLFxuICAgICAgICAgICAgaW52ZXJ0ZWQ6IGZhbHNlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiByZXMucmVnaW9ucztcbiAgICB9XG5cbiAgICByZXMgPSBwb2x5Ym9vbC51bmlvbih7XG4gICAgICAgIHJlZ2lvbnM6IGxpc3QsXG4gICAgICAgIGludmVydGVkOiBmYWxzZVxuICAgIH0sIHtcbiAgICAgICAgcmVnaW9uczogW3BvbHldLFxuICAgICAgICBpbnZlcnRlZDogZmFsc2VcbiAgICB9KTtcblxuICAgIHJldHVybiByZXMucmVnaW9ucztcbn1cblxuZnVuY3Rpb24gZmlsbFNlbGVjdGlvbkl0ZW0oc2VsZWN0aW9uLCBzZWFyY2hJbmZvKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheShzZWxlY3Rpb24pKSB7XG4gICAgICAgIHZhciBjZCA9IHNlYXJjaEluZm8uY2Q7XG4gICAgICAgIHZhciB0cmFjZSA9IHNlYXJjaEluZm8uY2RbMF0udHJhY2U7XG5cbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNlbGVjdGlvbi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgc2VsZWN0aW9uW2ldID0gbWFrZUV2ZW50RGF0YShzZWxlY3Rpb25baV0sIHRyYWNlLCBjZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc2VsZWN0aW9uO1xufVxuXG5mdW5jdGlvbiBjb252ZXJ0UG9seShwb2x5Z29uc0luLCBpc09wZW5Nb2RlKSB7IC8vIGFkZCBNIGFuZCBMIGNvbW1hbmQgdG8gZHJhZnQgcG9zaXRpb25zXG4gICAgdmFyIHBvbHlnb25zT3V0ID0gW107XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHBvbHlnb25zSW4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcG9seWdvbnNPdXRbaV0gPSBbXTtcbiAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IHBvbHlnb25zSW5baV0ubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHBvbHlnb25zT3V0W2ldW2pdID0gW107XG4gICAgICAgICAgICBwb2x5Z29uc091dFtpXVtqXVswXSA9IGogPyAnTCcgOiAnTSc7XG4gICAgICAgICAgICBmb3IodmFyIGsgPSAwOyBrIDwgcG9seWdvbnNJbltpXVtqXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgIHBvbHlnb25zT3V0W2ldW2pdLnB1c2goXG4gICAgICAgICAgICAgICAgICAgIHBvbHlnb25zSW5baV1bal1ba11cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWlzT3Blbk1vZGUpIHtcbiAgICAgICAgICAgIHBvbHlnb25zT3V0W2ldLnB1c2goW1xuICAgICAgICAgICAgICAgICdaJyxcbiAgICAgICAgICAgICAgICBwb2x5Z29uc091dFtpXVswXVsxXSwgLy8gaW5pdGlhbCB4XG4gICAgICAgICAgICAgICAgcG9seWdvbnNPdXRbaV1bMF1bMl0gIC8vIGluaXRpYWwgeVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gcG9seWdvbnNPdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIHByZXBTZWxlY3Q6IHByZXBTZWxlY3QsXG4gICAgY2xlYXJTZWxlY3Q6IGNsZWFyU2VsZWN0LFxuICAgIGNsZWFyU2VsZWN0aW9uc0NhY2hlOiBjbGVhclNlbGVjdGlvbnNDYWNoZSxcbiAgICBzZWxlY3RPbkNsaWNrOiBzZWxlY3RPbkNsaWNrXG59O1xuIiwiLypcbiAqIEBjb3B5cmlnaHQgMjAxNiBTZWFuIENvbm5lbGx5IChAdm9pZHFrKSwgaHR0cDovL3N5bnRoZXRpLmNjXG4gKiBAbGljZW5zZSBNSVRcbiAqIEBwcmVzZXJ2ZSBQcm9qZWN0IEhvbWU6IGh0dHBzOi8vZ2l0aHViLmNvbS92b2lkcWsvcG9seWJvb2xqc1xuICovXG5cbnZhciBCdWlsZExvZyA9IHJlcXVpcmUoJy4vbGliL2J1aWxkLWxvZycpO1xudmFyIEVwc2lsb24gPSByZXF1aXJlKCcuL2xpYi9lcHNpbG9uJyk7XG52YXIgSW50ZXJzZWN0ZXIgPSByZXF1aXJlKCcuL2xpYi9pbnRlcnNlY3RlcicpO1xudmFyIFNlZ21lbnRDaGFpbmVyID0gcmVxdWlyZSgnLi9saWIvc2VnbWVudC1jaGFpbmVyJyk7XG52YXIgU2VnbWVudFNlbGVjdG9yID0gcmVxdWlyZSgnLi9saWIvc2VnbWVudC1zZWxlY3RvcicpO1xudmFyIEdlb0pTT04gPSByZXF1aXJlKCcuL2xpYi9nZW9qc29uJyk7XG5cbnZhciBidWlsZExvZyA9IGZhbHNlO1xudmFyIGVwc2lsb24gPSBFcHNpbG9uKCk7XG5cbnZhciBQb2x5Qm9vbDtcblBvbHlCb29sID0ge1xuXHQvLyBnZXR0ZXIvc2V0dGVyIGZvciBidWlsZExvZ1xuXHRidWlsZExvZzogZnVuY3Rpb24oYmwpe1xuXHRcdGlmIChibCA9PT0gdHJ1ZSlcblx0XHRcdGJ1aWxkTG9nID0gQnVpbGRMb2coKTtcblx0XHRlbHNlIGlmIChibCA9PT0gZmFsc2UpXG5cdFx0XHRidWlsZExvZyA9IGZhbHNlO1xuXHRcdHJldHVybiBidWlsZExvZyA9PT0gZmFsc2UgPyBmYWxzZSA6IGJ1aWxkTG9nLmxpc3Q7XG5cdH0sXG5cdC8vIGdldHRlci9zZXR0ZXIgZm9yIGVwc2lsb25cblx0ZXBzaWxvbjogZnVuY3Rpb24odil7XG5cdFx0cmV0dXJuIGVwc2lsb24uZXBzaWxvbih2KTtcblx0fSxcblxuXHQvLyBjb3JlIEFQSVxuXHRzZWdtZW50czogZnVuY3Rpb24ocG9seSl7XG5cdFx0dmFyIGkgPSBJbnRlcnNlY3Rlcih0cnVlLCBlcHNpbG9uLCBidWlsZExvZyk7XG5cdFx0cG9seS5yZWdpb25zLmZvckVhY2goaS5hZGRSZWdpb24pO1xuXHRcdHJldHVybiB7XG5cdFx0XHRzZWdtZW50czogaS5jYWxjdWxhdGUocG9seS5pbnZlcnRlZCksXG5cdFx0XHRpbnZlcnRlZDogcG9seS5pbnZlcnRlZFxuXHRcdH07XG5cdH0sXG5cdGNvbWJpbmU6IGZ1bmN0aW9uKHNlZ21lbnRzMSwgc2VnbWVudHMyKXtcblx0XHR2YXIgaTMgPSBJbnRlcnNlY3RlcihmYWxzZSwgZXBzaWxvbiwgYnVpbGRMb2cpO1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb21iaW5lZDogaTMuY2FsY3VsYXRlKFxuXHRcdFx0XHRzZWdtZW50czEuc2VnbWVudHMsIHNlZ21lbnRzMS5pbnZlcnRlZCxcblx0XHRcdFx0c2VnbWVudHMyLnNlZ21lbnRzLCBzZWdtZW50czIuaW52ZXJ0ZWRcblx0XHRcdCksXG5cdFx0XHRpbnZlcnRlZDE6IHNlZ21lbnRzMS5pbnZlcnRlZCxcblx0XHRcdGludmVydGVkMjogc2VnbWVudHMyLmludmVydGVkXG5cdFx0fTtcblx0fSxcblx0c2VsZWN0VW5pb246IGZ1bmN0aW9uKGNvbWJpbmVkKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2VnbWVudHM6IFNlZ21lbnRTZWxlY3Rvci51bmlvbihjb21iaW5lZC5jb21iaW5lZCwgYnVpbGRMb2cpLFxuXHRcdFx0aW52ZXJ0ZWQ6IGNvbWJpbmVkLmludmVydGVkMSB8fCBjb21iaW5lZC5pbnZlcnRlZDJcblx0XHR9XG5cdH0sXG5cdHNlbGVjdEludGVyc2VjdDogZnVuY3Rpb24oY29tYmluZWQpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRzZWdtZW50czogU2VnbWVudFNlbGVjdG9yLmludGVyc2VjdChjb21iaW5lZC5jb21iaW5lZCwgYnVpbGRMb2cpLFxuXHRcdFx0aW52ZXJ0ZWQ6IGNvbWJpbmVkLmludmVydGVkMSAmJiBjb21iaW5lZC5pbnZlcnRlZDJcblx0XHR9XG5cdH0sXG5cdHNlbGVjdERpZmZlcmVuY2U6IGZ1bmN0aW9uKGNvbWJpbmVkKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2VnbWVudHM6IFNlZ21lbnRTZWxlY3Rvci5kaWZmZXJlbmNlKGNvbWJpbmVkLmNvbWJpbmVkLCBidWlsZExvZyksXG5cdFx0XHRpbnZlcnRlZDogY29tYmluZWQuaW52ZXJ0ZWQxICYmICFjb21iaW5lZC5pbnZlcnRlZDJcblx0XHR9XG5cdH0sXG5cdHNlbGVjdERpZmZlcmVuY2VSZXY6IGZ1bmN0aW9uKGNvbWJpbmVkKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0c2VnbWVudHM6IFNlZ21lbnRTZWxlY3Rvci5kaWZmZXJlbmNlUmV2KGNvbWJpbmVkLmNvbWJpbmVkLCBidWlsZExvZyksXG5cdFx0XHRpbnZlcnRlZDogIWNvbWJpbmVkLmludmVydGVkMSAmJiBjb21iaW5lZC5pbnZlcnRlZDJcblx0XHR9XG5cdH0sXG5cdHNlbGVjdFhvcjogZnVuY3Rpb24oY29tYmluZWQpe1xuXHRcdHJldHVybiB7XG5cdFx0XHRzZWdtZW50czogU2VnbWVudFNlbGVjdG9yLnhvcihjb21iaW5lZC5jb21iaW5lZCwgYnVpbGRMb2cpLFxuXHRcdFx0aW52ZXJ0ZWQ6IGNvbWJpbmVkLmludmVydGVkMSAhPT0gY29tYmluZWQuaW52ZXJ0ZWQyXG5cdFx0fVxuXHR9LFxuXHRwb2x5Z29uOiBmdW5jdGlvbihzZWdtZW50cyl7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJlZ2lvbnM6IFNlZ21lbnRDaGFpbmVyKHNlZ21lbnRzLnNlZ21lbnRzLCBlcHNpbG9uLCBidWlsZExvZyksXG5cdFx0XHRpbnZlcnRlZDogc2VnbWVudHMuaW52ZXJ0ZWRcblx0XHR9O1xuXHR9LFxuXG5cdC8vIEdlb0pTT04gY29udmVydGVyc1xuXHRwb2x5Z29uRnJvbUdlb0pTT046IGZ1bmN0aW9uKGdlb2pzb24pe1xuXHRcdHJldHVybiBHZW9KU09OLnRvUG9seWdvbihQb2x5Qm9vbCwgZ2VvanNvbik7XG5cdH0sXG5cdHBvbHlnb25Ub0dlb0pTT046IGZ1bmN0aW9uKHBvbHkpe1xuXHRcdHJldHVybiBHZW9KU09OLmZyb21Qb2x5Z29uKFBvbHlCb29sLCBlcHNpbG9uLCBwb2x5KTtcblx0fSxcblxuXHQvLyBoZWxwZXIgZnVuY3Rpb25zIGZvciBjb21tb24gb3BlcmF0aW9uc1xuXHR1bmlvbjogZnVuY3Rpb24ocG9seTEsIHBvbHkyKXtcblx0XHRyZXR1cm4gb3BlcmF0ZShwb2x5MSwgcG9seTIsIFBvbHlCb29sLnNlbGVjdFVuaW9uKTtcblx0fSxcblx0aW50ZXJzZWN0OiBmdW5jdGlvbihwb2x5MSwgcG9seTIpe1xuXHRcdHJldHVybiBvcGVyYXRlKHBvbHkxLCBwb2x5MiwgUG9seUJvb2wuc2VsZWN0SW50ZXJzZWN0KTtcblx0fSxcblx0ZGlmZmVyZW5jZTogZnVuY3Rpb24ocG9seTEsIHBvbHkyKXtcblx0XHRyZXR1cm4gb3BlcmF0ZShwb2x5MSwgcG9seTIsIFBvbHlCb29sLnNlbGVjdERpZmZlcmVuY2UpO1xuXHR9LFxuXHRkaWZmZXJlbmNlUmV2OiBmdW5jdGlvbihwb2x5MSwgcG9seTIpe1xuXHRcdHJldHVybiBvcGVyYXRlKHBvbHkxLCBwb2x5MiwgUG9seUJvb2wuc2VsZWN0RGlmZmVyZW5jZVJldik7XG5cdH0sXG5cdHhvcjogZnVuY3Rpb24ocG9seTEsIHBvbHkyKXtcblx0XHRyZXR1cm4gb3BlcmF0ZShwb2x5MSwgcG9seTIsIFBvbHlCb29sLnNlbGVjdFhvcik7XG5cdH1cbn07XG5cbmZ1bmN0aW9uIG9wZXJhdGUocG9seTEsIHBvbHkyLCBzZWxlY3Rvcil7XG5cdHZhciBzZWcxID0gUG9seUJvb2wuc2VnbWVudHMocG9seTEpO1xuXHR2YXIgc2VnMiA9IFBvbHlCb29sLnNlZ21lbnRzKHBvbHkyKTtcblx0dmFyIGNvbWIgPSBQb2x5Qm9vbC5jb21iaW5lKHNlZzEsIHNlZzIpO1xuXHR2YXIgc2VnMyA9IHNlbGVjdG9yKGNvbWIpO1xuXHRyZXR1cm4gUG9seUJvb2wucG9seWdvbihzZWczKTtcbn1cblxuaWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKVxuXHR3aW5kb3cuUG9seUJvb2wgPSBQb2x5Qm9vbDtcblxubW9kdWxlLmV4cG9ydHMgPSBQb2x5Qm9vbDtcbiIsIi8vIChjKSBDb3B5cmlnaHQgMjAxNiwgU2VhbiBDb25uZWxseSAoQHZvaWRxayksIGh0dHA6Ly9zeW50aGV0aS5jY1xuLy8gTUlUIExpY2Vuc2Vcbi8vIFByb2plY3QgSG9tZTogaHR0cHM6Ly9naXRodWIuY29tL3ZvaWRxay9wb2x5Ym9vbGpzXG5cbi8vXG4vLyB1c2VkIHN0cmljdGx5IGZvciBsb2dnaW5nIHRoZSBwcm9jZXNzaW5nIG9mIHRoZSBhbGdvcml0aG0uLi4gb25seSB1c2VmdWwgaWYgeW91IGludGVuZCBvblxuLy8gbG9va2luZyB1bmRlciB0aGUgY292ZXJzIChmb3IgcHJldHR5IFVJJ3Mgb3IgZGVidWdnaW5nKVxuLy9cblxuZnVuY3Rpb24gQnVpbGRMb2coKXtcblx0dmFyIG15O1xuXHR2YXIgbmV4dFNlZ21lbnRJZCA9IDA7XG5cdHZhciBjdXJWZXJ0ID0gZmFsc2U7XG5cblx0ZnVuY3Rpb24gcHVzaCh0eXBlLCBkYXRhKXtcblx0XHRteS5saXN0LnB1c2goe1xuXHRcdFx0dHlwZTogdHlwZSxcblx0XHRcdGRhdGE6IGRhdGEgPyBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KGRhdGEpKSA6IHZvaWQgMFxuXHRcdH0pO1xuXHRcdHJldHVybiBteTtcblx0fVxuXG5cdG15ID0ge1xuXHRcdGxpc3Q6IFtdLFxuXHRcdHNlZ21lbnRJZDogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiBuZXh0U2VnbWVudElkKys7XG5cdFx0fSxcblx0XHRjaGVja0ludGVyc2VjdGlvbjogZnVuY3Rpb24oc2VnMSwgc2VnMil7XG5cdFx0XHRyZXR1cm4gcHVzaCgnY2hlY2snLCB7IHNlZzE6IHNlZzEsIHNlZzI6IHNlZzIgfSk7XG5cdFx0fSxcblx0XHRzZWdtZW50Q2hvcDogZnVuY3Rpb24oc2VnLCBlbmQpe1xuXHRcdFx0cHVzaCgnZGl2X3NlZycsIHsgc2VnOiBzZWcsIHB0OiBlbmQgfSk7XG5cdFx0XHRyZXR1cm4gcHVzaCgnY2hvcCcsIHsgc2VnOiBzZWcsIHB0OiBlbmQgfSk7XG5cdFx0fSxcblx0XHRzdGF0dXNSZW1vdmU6IGZ1bmN0aW9uKHNlZyl7XG5cdFx0XHRyZXR1cm4gcHVzaCgncG9wX3NlZycsIHsgc2VnOiBzZWcgfSk7XG5cdFx0fSxcblx0XHRzZWdtZW50VXBkYXRlOiBmdW5jdGlvbihzZWcpe1xuXHRcdFx0cmV0dXJuIHB1c2goJ3NlZ191cGRhdGUnLCB7IHNlZzogc2VnIH0pO1xuXHRcdH0sXG5cdFx0c2VnbWVudE5ldzogZnVuY3Rpb24oc2VnLCBwcmltYXJ5KXtcblx0XHRcdHJldHVybiBwdXNoKCduZXdfc2VnJywgeyBzZWc6IHNlZywgcHJpbWFyeTogcHJpbWFyeSB9KTtcblx0XHR9LFxuXHRcdHNlZ21lbnRSZW1vdmU6IGZ1bmN0aW9uKHNlZyl7XG5cdFx0XHRyZXR1cm4gcHVzaCgncmVtX3NlZycsIHsgc2VnOiBzZWcgfSk7XG5cdFx0fSxcblx0XHR0ZW1wU3RhdHVzOiBmdW5jdGlvbihzZWcsIGFib3ZlLCBiZWxvdyl7XG5cdFx0XHRyZXR1cm4gcHVzaCgndGVtcF9zdGF0dXMnLCB7IHNlZzogc2VnLCBhYm92ZTogYWJvdmUsIGJlbG93OiBiZWxvdyB9KTtcblx0XHR9LFxuXHRcdHJld2luZDogZnVuY3Rpb24oc2VnKXtcblx0XHRcdHJldHVybiBwdXNoKCdyZXdpbmQnLCB7IHNlZzogc2VnIH0pO1xuXHRcdH0sXG5cdFx0c3RhdHVzOiBmdW5jdGlvbihzZWcsIGFib3ZlLCBiZWxvdyl7XG5cdFx0XHRyZXR1cm4gcHVzaCgnc3RhdHVzJywgeyBzZWc6IHNlZywgYWJvdmU6IGFib3ZlLCBiZWxvdzogYmVsb3cgfSk7XG5cdFx0fSxcblx0XHR2ZXJ0OiBmdW5jdGlvbih4KXtcblx0XHRcdGlmICh4ID09PSBjdXJWZXJ0KVxuXHRcdFx0XHRyZXR1cm4gbXk7XG5cdFx0XHRjdXJWZXJ0ID0geDtcblx0XHRcdHJldHVybiBwdXNoKCd2ZXJ0JywgeyB4OiB4IH0pO1xuXHRcdH0sXG5cdFx0bG9nOiBmdW5jdGlvbihkYXRhKXtcblx0XHRcdGlmICh0eXBlb2YgZGF0YSAhPT0gJ3N0cmluZycpXG5cdFx0XHRcdGRhdGEgPSBKU09OLnN0cmluZ2lmeShkYXRhLCBmYWxzZSwgJyAgJyk7XG5cdFx0XHRyZXR1cm4gcHVzaCgnbG9nJywgeyB0eHQ6IGRhdGEgfSk7XG5cdFx0fSxcblx0XHRyZXNldDogZnVuY3Rpb24oKXtcblx0XHRcdHJldHVybiBwdXNoKCdyZXNldCcpO1xuXHRcdH0sXG5cdFx0c2VsZWN0ZWQ6IGZ1bmN0aW9uKHNlZ3Mpe1xuXHRcdFx0cmV0dXJuIHB1c2goJ3NlbGVjdGVkJywgeyBzZWdzOiBzZWdzIH0pO1xuXHRcdH0sXG5cdFx0Y2hhaW5TdGFydDogZnVuY3Rpb24oc2VnKXtcblx0XHRcdHJldHVybiBwdXNoKCdjaGFpbl9zdGFydCcsIHsgc2VnOiBzZWcgfSk7XG5cdFx0fSxcblx0XHRjaGFpblJlbW92ZUhlYWQ6IGZ1bmN0aW9uKGluZGV4LCBwdCl7XG5cdFx0XHRyZXR1cm4gcHVzaCgnY2hhaW5fcmVtX2hlYWQnLCB7IGluZGV4OiBpbmRleCwgcHQ6IHB0IH0pO1xuXHRcdH0sXG5cdFx0Y2hhaW5SZW1vdmVUYWlsOiBmdW5jdGlvbihpbmRleCwgcHQpe1xuXHRcdFx0cmV0dXJuIHB1c2goJ2NoYWluX3JlbV90YWlsJywgeyBpbmRleDogaW5kZXgsIHB0OiBwdCB9KTtcblx0XHR9LFxuXHRcdGNoYWluTmV3OiBmdW5jdGlvbihwdDEsIHB0Mil7XG5cdFx0XHRyZXR1cm4gcHVzaCgnY2hhaW5fbmV3JywgeyBwdDE6IHB0MSwgcHQyOiBwdDIgfSk7XG5cdFx0fSxcblx0XHRjaGFpbk1hdGNoOiBmdW5jdGlvbihpbmRleCl7XG5cdFx0XHRyZXR1cm4gcHVzaCgnY2hhaW5fbWF0Y2gnLCB7IGluZGV4OiBpbmRleCB9KTtcblx0XHR9LFxuXHRcdGNoYWluQ2xvc2U6IGZ1bmN0aW9uKGluZGV4KXtcblx0XHRcdHJldHVybiBwdXNoKCdjaGFpbl9jbG9zZScsIHsgaW5kZXg6IGluZGV4IH0pO1xuXHRcdH0sXG5cdFx0Y2hhaW5BZGRIZWFkOiBmdW5jdGlvbihpbmRleCwgcHQpe1xuXHRcdFx0cmV0dXJuIHB1c2goJ2NoYWluX2FkZF9oZWFkJywgeyBpbmRleDogaW5kZXgsIHB0OiBwdCB9KTtcblx0XHR9LFxuXHRcdGNoYWluQWRkVGFpbDogZnVuY3Rpb24oaW5kZXgsIHB0KXtcblx0XHRcdHJldHVybiBwdXNoKCdjaGFpbl9hZGRfdGFpbCcsIHsgaW5kZXg6IGluZGV4LCBwdDogcHQsIH0pO1xuXHRcdH0sXG5cdFx0Y2hhaW5Db25uZWN0OiBmdW5jdGlvbihpbmRleDEsIGluZGV4Mil7XG5cdFx0XHRyZXR1cm4gcHVzaCgnY2hhaW5fY29uJywgeyBpbmRleDE6IGluZGV4MSwgaW5kZXgyOiBpbmRleDIgfSk7XG5cdFx0fSxcblx0XHRjaGFpblJldmVyc2U6IGZ1bmN0aW9uKGluZGV4KXtcblx0XHRcdHJldHVybiBwdXNoKCdjaGFpbl9yZXYnLCB7IGluZGV4OiBpbmRleCB9KTtcblx0XHR9LFxuXHRcdGNoYWluSm9pbjogZnVuY3Rpb24oaW5kZXgxLCBpbmRleDIpe1xuXHRcdFx0cmV0dXJuIHB1c2goJ2NoYWluX2pvaW4nLCB7IGluZGV4MTogaW5kZXgxLCBpbmRleDI6IGluZGV4MiB9KTtcblx0XHR9LFxuXHRcdGRvbmU6IGZ1bmN0aW9uKCl7XG5cdFx0XHRyZXR1cm4gcHVzaCgnZG9uZScpO1xuXHRcdH1cblx0fTtcblx0cmV0dXJuIG15O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEJ1aWxkTG9nO1xuIiwiLy8gKGMpIENvcHlyaWdodCAyMDE2LCBTZWFuIENvbm5lbGx5IChAdm9pZHFrKSwgaHR0cDovL3N5bnRoZXRpLmNjXG4vLyBNSVQgTGljZW5zZVxuLy8gUHJvamVjdCBIb21lOiBodHRwczovL2dpdGh1Yi5jb20vdm9pZHFrL3BvbHlib29sanNcblxuLy9cbi8vIHByb3ZpZGVzIHRoZSByYXcgY29tcHV0YXRpb24gZnVuY3Rpb25zIHRoYXQgdGFrZXMgZXBzaWxvbiBpbnRvIGFjY291bnRcbi8vXG4vLyB6ZXJvIGlzIGRlZmluZWQgdG8gYmUgYmV0d2VlbiAoLWVwc2lsb24sIGVwc2lsb24pIGV4Y2x1c2l2ZVxuLy9cblxuZnVuY3Rpb24gRXBzaWxvbihlcHMpe1xuXHRpZiAodHlwZW9mIGVwcyAhPT0gJ251bWJlcicpXG5cdFx0ZXBzID0gMC4wMDAwMDAwMDAxOyAvLyBzYW5lIGRlZmF1bHQ/IHN1cmUgd2h5IG5vdFxuXHR2YXIgbXkgPSB7XG5cdFx0ZXBzaWxvbjogZnVuY3Rpb24odil7XG5cdFx0XHRpZiAodHlwZW9mIHYgPT09ICdudW1iZXInKVxuXHRcdFx0XHRlcHMgPSB2O1xuXHRcdFx0cmV0dXJuIGVwcztcblx0XHR9LFxuXHRcdHBvaW50QWJvdmVPck9uTGluZTogZnVuY3Rpb24ocHQsIGxlZnQsIHJpZ2h0KXtcblx0XHRcdHZhciBBeCA9IGxlZnRbMF07XG5cdFx0XHR2YXIgQXkgPSBsZWZ0WzFdO1xuXHRcdFx0dmFyIEJ4ID0gcmlnaHRbMF07XG5cdFx0XHR2YXIgQnkgPSByaWdodFsxXTtcblx0XHRcdHZhciBDeCA9IHB0WzBdO1xuXHRcdFx0dmFyIEN5ID0gcHRbMV07XG5cdFx0XHRyZXR1cm4gKEJ4IC0gQXgpICogKEN5IC0gQXkpIC0gKEJ5IC0gQXkpICogKEN4IC0gQXgpID49IC1lcHM7XG5cdFx0fSxcblx0XHRwb2ludEJldHdlZW46IGZ1bmN0aW9uKHAsIGxlZnQsIHJpZ2h0KXtcblx0XHRcdC8vIHAgbXVzdCBiZSBjb2xsaW5lYXIgd2l0aCBsZWZ0LT5yaWdodFxuXHRcdFx0Ly8gcmV0dXJucyBmYWxzZSBpZiBwID09IGxlZnQsIHAgPT0gcmlnaHQsIG9yIGxlZnQgPT0gcmlnaHRcblx0XHRcdHZhciBkX3B5X2x5ID0gcFsxXSAtIGxlZnRbMV07XG5cdFx0XHR2YXIgZF9yeF9seCA9IHJpZ2h0WzBdIC0gbGVmdFswXTtcblx0XHRcdHZhciBkX3B4X2x4ID0gcFswXSAtIGxlZnRbMF07XG5cdFx0XHR2YXIgZF9yeV9seSA9IHJpZ2h0WzFdIC0gbGVmdFsxXTtcblxuXHRcdFx0dmFyIGRvdCA9IGRfcHhfbHggKiBkX3J4X2x4ICsgZF9weV9seSAqIGRfcnlfbHk7XG5cdFx0XHQvLyBpZiBgZG90YCBpcyAwLCB0aGVuIGBwYCA9PSBgbGVmdGAgb3IgYGxlZnRgID09IGByaWdodGAgKHJlamVjdClcblx0XHRcdC8vIGlmIGBkb3RgIGlzIGxlc3MgdGhhbiAwLCB0aGVuIGBwYCBpcyB0byB0aGUgbGVmdCBvZiBgbGVmdGAgKHJlamVjdClcblx0XHRcdGlmIChkb3QgPCBlcHMpXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0dmFyIHNxbGVuID0gZF9yeF9seCAqIGRfcnhfbHggKyBkX3J5X2x5ICogZF9yeV9seTtcblx0XHRcdC8vIGlmIGBkb3RgID4gYHNxbGVuYCwgdGhlbiBgcGAgaXMgdG8gdGhlIHJpZ2h0IG9mIGByaWdodGAgKHJlamVjdClcblx0XHRcdC8vIHRoZXJlZm9yZSwgaWYgYGRvdCAtIHNxbGVuYCBpcyBncmVhdGVyIHRoYW4gMCwgdGhlbiBgcGAgaXMgdG8gdGhlIHJpZ2h0IG9mIGByaWdodGAgKHJlamVjdClcblx0XHRcdGlmIChkb3QgLSBzcWxlbiA+IC1lcHMpXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fSxcblx0XHRwb2ludHNTYW1lWDogZnVuY3Rpb24ocDEsIHAyKXtcblx0XHRcdHJldHVybiBNYXRoLmFicyhwMVswXSAtIHAyWzBdKSA8IGVwcztcblx0XHR9LFxuXHRcdHBvaW50c1NhbWVZOiBmdW5jdGlvbihwMSwgcDIpe1xuXHRcdFx0cmV0dXJuIE1hdGguYWJzKHAxWzFdIC0gcDJbMV0pIDwgZXBzO1xuXHRcdH0sXG5cdFx0cG9pbnRzU2FtZTogZnVuY3Rpb24ocDEsIHAyKXtcblx0XHRcdHJldHVybiBteS5wb2ludHNTYW1lWChwMSwgcDIpICYmIG15LnBvaW50c1NhbWVZKHAxLCBwMik7XG5cdFx0fSxcblx0XHRwb2ludHNDb21wYXJlOiBmdW5jdGlvbihwMSwgcDIpe1xuXHRcdFx0Ly8gcmV0dXJucyAtMSBpZiBwMSBpcyBzbWFsbGVyLCAxIGlmIHAyIGlzIHNtYWxsZXIsIDAgaWYgZXF1YWxcblx0XHRcdGlmIChteS5wb2ludHNTYW1lWChwMSwgcDIpKVxuXHRcdFx0XHRyZXR1cm4gbXkucG9pbnRzU2FtZVkocDEsIHAyKSA/IDAgOiAocDFbMV0gPCBwMlsxXSA/IC0xIDogMSk7XG5cdFx0XHRyZXR1cm4gcDFbMF0gPCBwMlswXSA/IC0xIDogMTtcblx0XHR9LFxuXHRcdHBvaW50c0NvbGxpbmVhcjogZnVuY3Rpb24ocHQxLCBwdDIsIHB0Myl7XG5cdFx0XHQvLyBkb2VzIHB0MS0+cHQyLT5wdDMgbWFrZSBhIHN0cmFpZ2h0IGxpbmU/XG5cdFx0XHQvLyBlc3NlbnRpYWxseSB0aGlzIGlzIGp1c3QgY2hlY2tpbmcgdG8gc2VlIGlmIHRoZSBzbG9wZShwdDEtPnB0MikgPT09IHNsb3BlKHB0Mi0+cHQzKVxuXHRcdFx0Ly8gaWYgc2xvcGVzIGFyZSBlcXVhbCwgdGhlbiB0aGV5IG11c3QgYmUgY29sbGluZWFyLCBiZWNhdXNlIHRoZXkgc2hhcmUgcHQyXG5cdFx0XHR2YXIgZHgxID0gcHQxWzBdIC0gcHQyWzBdO1xuXHRcdFx0dmFyIGR5MSA9IHB0MVsxXSAtIHB0MlsxXTtcblx0XHRcdHZhciBkeDIgPSBwdDJbMF0gLSBwdDNbMF07XG5cdFx0XHR2YXIgZHkyID0gcHQyWzFdIC0gcHQzWzFdO1xuXHRcdFx0cmV0dXJuIE1hdGguYWJzKGR4MSAqIGR5MiAtIGR4MiAqIGR5MSkgPCBlcHM7XG5cdFx0fSxcblx0XHRsaW5lc0ludGVyc2VjdDogZnVuY3Rpb24oYTAsIGExLCBiMCwgYjEpe1xuXHRcdFx0Ly8gcmV0dXJucyBmYWxzZSBpZiB0aGUgbGluZXMgYXJlIGNvaW5jaWRlbnQgKGUuZy4sIHBhcmFsbGVsIG9yIG9uIHRvcCBvZiBlYWNoIG90aGVyKVxuXHRcdFx0Ly9cblx0XHRcdC8vIHJldHVybnMgYW4gb2JqZWN0IGlmIHRoZSBsaW5lcyBpbnRlcnNlY3Q6XG5cdFx0XHQvLyAgIHtcblx0XHRcdC8vICAgICBwdDogW3gsIHldLCAgICB3aGVyZSB0aGUgaW50ZXJzZWN0aW9uIHBvaW50IGlzIGF0XG5cdFx0XHQvLyAgICAgYWxvbmdBOiB3aGVyZSBpbnRlcnNlY3Rpb24gcG9pbnQgaXMgYWxvbmcgQSxcblx0XHRcdC8vICAgICBhbG9uZ0I6IHdoZXJlIGludGVyc2VjdGlvbiBwb2ludCBpcyBhbG9uZyBCXG5cdFx0XHQvLyAgIH1cblx0XHRcdC8vXG5cdFx0XHQvLyAgYWxvbmdBIGFuZCBhbG9uZ0Igd2lsbCBlYWNoIGJlIG9uZSBvZjogLTIsIC0xLCAwLCAxLCAyXG5cdFx0XHQvL1xuXHRcdFx0Ly8gIHdpdGggdGhlIGZvbGxvd2luZyBtZWFuaW5nOlxuXHRcdFx0Ly9cblx0XHRcdC8vICAgIC0yICAgaW50ZXJzZWN0aW9uIHBvaW50IGlzIGJlZm9yZSBzZWdtZW50J3MgZmlyc3QgcG9pbnRcblx0XHRcdC8vICAgIC0xICAgaW50ZXJzZWN0aW9uIHBvaW50IGlzIGRpcmVjdGx5IG9uIHNlZ21lbnQncyBmaXJzdCBwb2ludFxuXHRcdFx0Ly8gICAgIDAgICBpbnRlcnNlY3Rpb24gcG9pbnQgaXMgYmV0d2VlbiBzZWdtZW50J3MgZmlyc3QgYW5kIHNlY29uZCBwb2ludHMgKGV4Y2x1c2l2ZSlcblx0XHRcdC8vICAgICAxICAgaW50ZXJzZWN0aW9uIHBvaW50IGlzIGRpcmVjdGx5IG9uIHNlZ21lbnQncyBzZWNvbmQgcG9pbnRcblx0XHRcdC8vICAgICAyICAgaW50ZXJzZWN0aW9uIHBvaW50IGlzIGFmdGVyIHNlZ21lbnQncyBzZWNvbmQgcG9pbnRcblx0XHRcdHZhciBhZHggPSBhMVswXSAtIGEwWzBdO1xuXHRcdFx0dmFyIGFkeSA9IGExWzFdIC0gYTBbMV07XG5cdFx0XHR2YXIgYmR4ID0gYjFbMF0gLSBiMFswXTtcblx0XHRcdHZhciBiZHkgPSBiMVsxXSAtIGIwWzFdO1xuXG5cdFx0XHR2YXIgYXhiID0gYWR4ICogYmR5IC0gYWR5ICogYmR4O1xuXHRcdFx0aWYgKE1hdGguYWJzKGF4YikgPCBlcHMpXG5cdFx0XHRcdHJldHVybiBmYWxzZTsgLy8gbGluZXMgYXJlIGNvaW5jaWRlbnRcblxuXHRcdFx0dmFyIGR4ID0gYTBbMF0gLSBiMFswXTtcblx0XHRcdHZhciBkeSA9IGEwWzFdIC0gYjBbMV07XG5cblx0XHRcdHZhciBBID0gKGJkeCAqIGR5IC0gYmR5ICogZHgpIC8gYXhiO1xuXHRcdFx0dmFyIEIgPSAoYWR4ICogZHkgLSBhZHkgKiBkeCkgLyBheGI7XG5cblx0XHRcdHZhciByZXQgPSB7XG5cdFx0XHRcdGFsb25nQTogMCxcblx0XHRcdFx0YWxvbmdCOiAwLFxuXHRcdFx0XHRwdDogW1xuXHRcdFx0XHRcdGEwWzBdICsgQSAqIGFkeCxcblx0XHRcdFx0XHRhMFsxXSArIEEgKiBhZHlcblx0XHRcdFx0XVxuXHRcdFx0fTtcblxuXHRcdFx0Ly8gY2F0ZWdvcml6ZSB3aGVyZSBpbnRlcnNlY3Rpb24gcG9pbnQgaXMgYWxvbmcgQSBhbmQgQlxuXG5cdFx0XHRpZiAoQSA8PSAtZXBzKVxuXHRcdFx0XHRyZXQuYWxvbmdBID0gLTI7XG5cdFx0XHRlbHNlIGlmIChBIDwgZXBzKVxuXHRcdFx0XHRyZXQuYWxvbmdBID0gLTE7XG5cdFx0XHRlbHNlIGlmIChBIC0gMSA8PSAtZXBzKVxuXHRcdFx0XHRyZXQuYWxvbmdBID0gMDtcblx0XHRcdGVsc2UgaWYgKEEgLSAxIDwgZXBzKVxuXHRcdFx0XHRyZXQuYWxvbmdBID0gMTtcblx0XHRcdGVsc2Vcblx0XHRcdFx0cmV0LmFsb25nQSA9IDI7XG5cblx0XHRcdGlmIChCIDw9IC1lcHMpXG5cdFx0XHRcdHJldC5hbG9uZ0IgPSAtMjtcblx0XHRcdGVsc2UgaWYgKEIgPCBlcHMpXG5cdFx0XHRcdHJldC5hbG9uZ0IgPSAtMTtcblx0XHRcdGVsc2UgaWYgKEIgLSAxIDw9IC1lcHMpXG5cdFx0XHRcdHJldC5hbG9uZ0IgPSAwO1xuXHRcdFx0ZWxzZSBpZiAoQiAtIDEgPCBlcHMpXG5cdFx0XHRcdHJldC5hbG9uZ0IgPSAxO1xuXHRcdFx0ZWxzZVxuXHRcdFx0XHRyZXQuYWxvbmdCID0gMjtcblxuXHRcdFx0cmV0dXJuIHJldDtcblx0XHR9LFxuXHRcdHBvaW50SW5zaWRlUmVnaW9uOiBmdW5jdGlvbihwdCwgcmVnaW9uKXtcblx0XHRcdHZhciB4ID0gcHRbMF07XG5cdFx0XHR2YXIgeSA9IHB0WzFdO1xuXHRcdFx0dmFyIGxhc3RfeCA9IHJlZ2lvbltyZWdpb24ubGVuZ3RoIC0gMV1bMF07XG5cdFx0XHR2YXIgbGFzdF95ID0gcmVnaW9uW3JlZ2lvbi5sZW5ndGggLSAxXVsxXTtcblx0XHRcdHZhciBpbnNpZGUgPSBmYWxzZTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaW9uLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0dmFyIGN1cnJfeCA9IHJlZ2lvbltpXVswXTtcblx0XHRcdFx0dmFyIGN1cnJfeSA9IHJlZ2lvbltpXVsxXTtcblxuXHRcdFx0XHQvLyBpZiB5IGlzIGJldHdlZW4gY3Vycl95IGFuZCBsYXN0X3ksIGFuZFxuXHRcdFx0XHQvLyB4IGlzIHRvIHRoZSByaWdodCBvZiB0aGUgYm91bmRhcnkgY3JlYXRlZCBieSB0aGUgbGluZVxuXHRcdFx0XHRpZiAoKGN1cnJfeSAtIHkgPiBlcHMpICE9IChsYXN0X3kgLSB5ID4gZXBzKSAmJlxuXHRcdFx0XHRcdChsYXN0X3ggLSBjdXJyX3gpICogKHkgLSBjdXJyX3kpIC8gKGxhc3RfeSAtIGN1cnJfeSkgKyBjdXJyX3ggLSB4ID4gZXBzKVxuXHRcdFx0XHRcdGluc2lkZSA9ICFpbnNpZGVcblxuXHRcdFx0XHRsYXN0X3ggPSBjdXJyX3g7XG5cdFx0XHRcdGxhc3RfeSA9IGN1cnJfeTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBpbnNpZGU7XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbXk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRXBzaWxvbjtcbiIsIi8vIChjKSBDb3B5cmlnaHQgMjAxNywgU2VhbiBDb25uZWxseSAoQHZvaWRxayksIGh0dHA6Ly9zeW50aGV0aS5jY1xuLy8gTUlUIExpY2Vuc2Vcbi8vIFByb2plY3QgSG9tZTogaHR0cHM6Ly9naXRodWIuY29tL3ZvaWRxay9wb2x5Ym9vbGpzXG5cbi8vXG4vLyBjb252ZXJ0IGJldHdlZW4gUG9seUJvb2wgcG9seWdvbiBmb3JtYXQgYW5kIEdlb0pTT04gZm9ybWF0cyAoUG9seWdvbiBhbmQgTXVsdGlQb2x5Z29uKVxuLy9cblxudmFyIEdlb0pTT04gPSB7XG5cdC8vIGNvbnZlcnQgYSBHZW9KU09OIG9iamVjdCB0byBhIFBvbHlCb29sIHBvbHlnb25cblx0dG9Qb2x5Z29uOiBmdW5jdGlvbihQb2x5Qm9vbCwgZ2VvanNvbil7XG5cblx0XHQvLyBjb252ZXJ0cyBsaXN0IG9mIExpbmVTdHJpbmcncyB0byBzZWdtZW50c1xuXHRcdGZ1bmN0aW9uIEdlb1BvbHkoY29vcmRzKXtcblx0XHRcdC8vIGNoZWNrIGZvciBlbXB0eSBjb29yZHNcblx0XHRcdGlmIChjb29yZHMubGVuZ3RoIDw9IDApXG5cdFx0XHRcdHJldHVybiBQb2x5Qm9vbC5zZWdtZW50cyh7IGludmVydGVkOiBmYWxzZSwgcmVnaW9uczogW10gfSk7XG5cblx0XHRcdC8vIGNvbnZlcnQgTGluZVN0cmluZyB0byBzZWdtZW50c1xuXHRcdFx0ZnVuY3Rpb24gTGluZVN0cmluZyhscyl7XG5cdFx0XHRcdC8vIHJlbW92ZSB0YWlsIHdoaWNoIHNob3VsZCBiZSB0aGUgc2FtZSBhcyBoZWFkXG5cdFx0XHRcdHZhciByZWcgPSBscy5zbGljZSgwLCBscy5sZW5ndGggLSAxKTtcblx0XHRcdFx0cmV0dXJuIFBvbHlCb29sLnNlZ21lbnRzKHsgaW52ZXJ0ZWQ6IGZhbHNlLCByZWdpb25zOiBbcmVnXSB9KTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gdGhlIGZpcnN0IExpbmVTdHJpbmcgaXMgY29uc2lkZXJlZCB0aGUgb3V0c2lkZVxuXHRcdFx0dmFyIG91dCA9IExpbmVTdHJpbmcoY29vcmRzWzBdKTtcblxuXHRcdFx0Ly8gdGhlIHJlc3Qgb2YgdGhlIExpbmVTdHJpbmdzIGFyZSBjb25zaWRlcmVkIGludGVyaW9yIGhvbGVzLCBzbyBzdWJ0cmFjdCB0aGVtIGZyb20gdGhlXG5cdFx0XHQvLyBjdXJyZW50IHJlc3VsdFxuXHRcdFx0Zm9yICh2YXIgaSA9IDE7IGkgPCBjb29yZHMubGVuZ3RoOyBpKyspXG5cdFx0XHRcdG91dCA9IFBvbHlCb29sLnNlbGVjdERpZmZlcmVuY2UoUG9seUJvb2wuY29tYmluZShvdXQsIExpbmVTdHJpbmcoY29vcmRzW2ldKSkpO1xuXG5cdFx0XHRyZXR1cm4gb3V0O1xuXHRcdH1cblxuXHRcdGlmIChnZW9qc29uLnR5cGUgPT09ICdQb2x5Z29uJyl7XG5cdFx0XHQvLyBzaW5nbGUgcG9seWdvbiwgc28ganVzdCBjb252ZXJ0IGl0IGFuZCB3ZSdyZSBkb25lXG5cdFx0XHRyZXR1cm4gUG9seUJvb2wucG9seWdvbihHZW9Qb2x5KGdlb2pzb24uY29vcmRpbmF0ZXMpKTtcblx0XHR9XG5cdFx0ZWxzZSBpZiAoZ2VvanNvbi50eXBlID09PSAnTXVsdGlQb2x5Z29uJyl7XG5cdFx0XHQvLyBtdWx0aXBsZSBwb2x5Z29ucywgc28gdW5pb24gYWxsIHRoZSBwb2x5Z29ucyB0b2dldGhlclxuXHRcdFx0dmFyIG91dCA9IFBvbHlCb29sLnNlZ21lbnRzKHsgaW52ZXJ0ZWQ6IGZhbHNlLCByZWdpb25zOiBbXSB9KTtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZ2VvanNvbi5jb29yZGluYXRlcy5sZW5ndGg7IGkrKylcblx0XHRcdFx0b3V0ID0gUG9seUJvb2wuc2VsZWN0VW5pb24oUG9seUJvb2wuY29tYmluZShvdXQsIEdlb1BvbHkoZ2VvanNvbi5jb29yZGluYXRlc1tpXSkpKTtcblx0XHRcdHJldHVybiBQb2x5Qm9vbC5wb2x5Z29uKG91dCk7XG5cdFx0fVxuXHRcdHRocm93IG5ldyBFcnJvcignUG9seUJvb2w6IENhbm5vdCBjb252ZXJ0IEdlb0pTT04gb2JqZWN0IHRvIFBvbHlCb29sIHBvbHlnb24nKTtcblx0fSxcblxuXHQvLyBjb252ZXJ0IGEgUG9seUJvb2wgcG9seWdvbiB0byBhIEdlb0pTT04gb2JqZWN0XG5cdGZyb21Qb2x5Z29uOiBmdW5jdGlvbihQb2x5Qm9vbCwgZXBzLCBwb2x5KXtcblx0XHQvLyBtYWtlIHN1cmUgb3V0IHBvbHlnb24gaXMgY2xlYW5cblx0XHRwb2x5ID0gUG9seUJvb2wucG9seWdvbihQb2x5Qm9vbC5zZWdtZW50cyhwb2x5KSk7XG5cblx0XHQvLyB0ZXN0IGlmIHIxIGlzIGluc2lkZSByMlxuXHRcdGZ1bmN0aW9uIHJlZ2lvbkluc2lkZVJlZ2lvbihyMSwgcjIpe1xuXHRcdFx0Ly8gd2UncmUgZ3VhcmFudGVlZCBubyBsaW5lcyBpbnRlcnNlY3QgKGJlY2F1c2UgdGhlIHBvbHlnb24gaXMgY2xlYW4pLCBidXQgYSB2ZXJ0ZXhcblx0XHRcdC8vIGNvdWxkIGJlIG9uIHRoZSBlZGdlIC0tIHNvIHdlIGp1c3QgYXZlcmFnZSBwdFswXSBhbmQgcHRbMV0gdG8gcHJvZHVjZSBhIHBvaW50IG9uIHRoZVxuXHRcdFx0Ly8gZWRnZSBvZiB0aGUgZmlyc3QgbGluZSwgd2hpY2ggY2Fubm90IGJlIG9uIGFuIGVkZ2Vcblx0XHRcdHJldHVybiBlcHMucG9pbnRJbnNpZGVSZWdpb24oW1xuXHRcdFx0XHQocjFbMF1bMF0gKyByMVsxXVswXSkgKiAwLjUsXG5cdFx0XHRcdChyMVswXVsxXSArIHIxWzFdWzFdKSAqIDAuNVxuXHRcdFx0XSwgcjIpO1xuXHRcdH1cblxuXHRcdC8vIGNhbGN1bGF0ZSBpbnNpZGUgaGVpcmFyY2h5XG5cdFx0Ly9cblx0XHQvLyAgX19fX19fX19fX19fX19fX19fX19fICAgX19fX19fXyAgICByb290cyAtPiBBICAgICAgIC0+IEZcblx0XHQvLyB8ICAgICAgICAgIEEgICAgICAgICAgfCB8ICAgRiAgIHwgICAgICAgICAgICB8ICAgICAgICAgIHxcblx0XHQvLyB8ICBfX19fX19fICAgX19fX19fXyAgfCB8ICBfX18gIHwgICAgICAgICAgICArLS0gQiAgICAgICstLSBHXG5cdFx0Ly8gfCB8ICAgQiAgIHwgfCAgIEMgICB8IHwgfCB8ICAgfCB8ICAgICAgICAgICAgfCAgIHxcblx0XHQvLyB8IHwgIF9fXyAgfCB8ICBfX18gIHwgfCB8IHwgICB8IHwgICAgICAgICAgICB8ICAgKy0tIERcblx0XHQvLyB8IHwgfCBEIHwgfCB8IHwgRSB8IHwgfCB8IHwgRyB8IHwgICAgICAgICAgICB8XG5cdFx0Ly8gfCB8IHxfX198IHwgfCB8X19ffCB8IHwgfCB8ICAgfCB8ICAgICAgICAgICAgKy0tIENcblx0XHQvLyB8IHxfX19fX19ffCB8X19fX19fX3wgfCB8IHxfX198IHwgICAgICAgICAgICAgICAgfFxuXHRcdC8vIHxfX19fX19fX19fX19fX19fX19fX198IHxfX19fX19ffCAgICAgICAgICAgICAgICArLS0gRVxuXG5cdFx0ZnVuY3Rpb24gbmV3Tm9kZShyZWdpb24pe1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0cmVnaW9uOiByZWdpb24sXG5cdFx0XHRcdGNoaWxkcmVuOiBbXVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHR2YXIgcm9vdHMgPSBuZXdOb2RlKG51bGwpO1xuXG5cdFx0ZnVuY3Rpb24gYWRkQ2hpbGQocm9vdCwgcmVnaW9uKXtcblx0XHRcdC8vIGZpcnN0IGNoZWNrIGlmIHdlJ3JlIGluc2lkZSBhbnkgY2hpbGRyZW5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcm9vdC5jaGlsZHJlbi5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHZhciBjaGlsZCA9IHJvb3QuY2hpbGRyZW5baV07XG5cdFx0XHRcdGlmIChyZWdpb25JbnNpZGVSZWdpb24ocmVnaW9uLCBjaGlsZC5yZWdpb24pKXtcblx0XHRcdFx0XHQvLyB3ZSBhcmUsIHNvIGluc2VydCBpbnNpZGUgdGhlbSBpbnN0ZWFkXG5cdFx0XHRcdFx0YWRkQ2hpbGQoY2hpbGQsIHJlZ2lvbik7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIG5vdCBpbnNpZGUgYW55IGNoaWxkcmVuLCBzbyBjaGVjayB0byBzZWUgaWYgYW55IGNoaWxkcmVuIGFyZSBpbnNpZGUgdXNcblx0XHRcdHZhciBub2RlID0gbmV3Tm9kZShyZWdpb24pO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByb290LmNoaWxkcmVuLmxlbmd0aDsgaSsrKXtcblx0XHRcdFx0dmFyIGNoaWxkID0gcm9vdC5jaGlsZHJlbltpXTtcblx0XHRcdFx0aWYgKHJlZ2lvbkluc2lkZVJlZ2lvbihjaGlsZC5yZWdpb24sIHJlZ2lvbikpe1xuXHRcdFx0XHRcdC8vIG9vcHMuLi4gbW92ZSB0aGUgY2hpbGQgYmVuZWF0aCB1cywgYW5kIHJlbW92ZSB0aGVtIGZyb20gcm9vdFxuXHRcdFx0XHRcdG5vZGUuY2hpbGRyZW4ucHVzaChjaGlsZCk7XG5cdFx0XHRcdFx0cm9vdC5jaGlsZHJlbi5zcGxpY2UoaSwgMSk7XG5cdFx0XHRcdFx0aS0tO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIG5vdyB3ZSBjYW4gYWRkIG91cnNlbHZlc1xuXHRcdFx0cm9vdC5jaGlsZHJlbi5wdXNoKG5vZGUpO1xuXHRcdH1cblxuXHRcdC8vIGFkZCBhbGwgcmVnaW9ucyB0byB0aGUgcm9vdFxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgcG9seS5yZWdpb25zLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciByZWdpb24gPSBwb2x5LnJlZ2lvbnNbaV07XG5cdFx0XHRpZiAocmVnaW9uLmxlbmd0aCA8IDMpIC8vIHJlZ2lvbnMgbXVzdCBoYXZlIGF0IGxlYXN0IDMgcG9pbnRzIChzYW5pdHkgY2hlY2spXG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0YWRkQ2hpbGQocm9vdHMsIHJlZ2lvbik7XG5cdFx0fVxuXG5cdFx0Ly8gd2l0aCBvdXIgaGVpcmFyY2h5LCB3ZSBjYW4gZGlzdGluZ3Vpc2ggYmV0d2VlbiBleHRlcmlvciBib3JkZXJzLCBhbmQgaW50ZXJpb3IgaG9sZXNcblx0XHQvLyB0aGUgcm9vdCBub2RlcyBhcmUgZXh0ZXJpb3IsIGNoaWxkcmVuIGFyZSBpbnRlcmlvciwgY2hpbGRyZW4ncyBjaGlsZHJlbiBhcmUgZXh0ZXJpb3IsXG5cdFx0Ly8gY2hpbGRyZW4ncyBjaGlsZHJlbidzIGNoaWxkcmVuIGFyZSBpbnRlcmlvciwgZXRjXG5cblx0XHQvLyB3aGlsZSB3ZSdyZSBhdCBpdCwgZXh0ZXJpb3JzIGFyZSBjb3VudGVyLWNsb2Nrd2lzZSwgYW5kIGludGVyaW9ycyBhcmUgY2xvY2t3aXNlXG5cblx0XHRmdW5jdGlvbiBmb3JjZVdpbmRpbmcocmVnaW9uLCBjbG9ja3dpc2Upe1xuXHRcdFx0Ly8gZmlyc3QsIHNlZSBpZiB3ZSdyZSBjbG9ja3dpc2Ugb3IgY291bnRlci1jbG9ja3dpc2Vcblx0XHRcdC8vIGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL1Nob2VsYWNlX2Zvcm11bGFcblx0XHRcdHZhciB3aW5kaW5nID0gMDtcblx0XHRcdHZhciBsYXN0X3ggPSByZWdpb25bcmVnaW9uLmxlbmd0aCAtIDFdWzBdO1xuXHRcdFx0dmFyIGxhc3RfeSA9IHJlZ2lvbltyZWdpb24ubGVuZ3RoIC0gMV1bMV07XG5cdFx0XHR2YXIgY29weSA9IFtdO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZWdpb24ubGVuZ3RoOyBpKyspe1xuXHRcdFx0XHR2YXIgY3Vycl94ID0gcmVnaW9uW2ldWzBdO1xuXHRcdFx0XHR2YXIgY3Vycl95ID0gcmVnaW9uW2ldWzFdO1xuXHRcdFx0XHRjb3B5LnB1c2goW2N1cnJfeCwgY3Vycl95XSk7IC8vIGNyZWF0ZSBhIGNvcHkgd2hpbGUgd2UncmUgYXQgaXRcblx0XHRcdFx0d2luZGluZyArPSBjdXJyX3kgKiBsYXN0X3ggLSBjdXJyX3ggKiBsYXN0X3k7XG5cdFx0XHRcdGxhc3RfeCA9IGN1cnJfeDtcblx0XHRcdFx0bGFzdF95ID0gY3Vycl95O1xuXHRcdFx0fVxuXHRcdFx0Ly8gdGhpcyBhc3N1bWVzIENhcnRlc2lhbiBjb29yZGluYXRlcyAoWSBpcyBwb3NpdGl2ZSBnb2luZyB1cClcblx0XHRcdHZhciBpc2Nsb2Nrd2lzZSA9IHdpbmRpbmcgPCAwO1xuXHRcdFx0aWYgKGlzY2xvY2t3aXNlICE9PSBjbG9ja3dpc2UpXG5cdFx0XHRcdGNvcHkucmV2ZXJzZSgpO1xuXHRcdFx0Ly8gd2hpbGUgd2UncmUgaGVyZSwgdGhlIGxhc3QgcG9pbnQgbXVzdCBiZSB0aGUgZmlyc3QgcG9pbnQuLi5cblx0XHRcdGNvcHkucHVzaChbY29weVswXVswXSwgY29weVswXVsxXV0pO1xuXHRcdFx0cmV0dXJuIGNvcHk7XG5cdFx0fVxuXG5cdFx0dmFyIGdlb3BvbHlzID0gW107XG5cblx0XHRmdW5jdGlvbiBhZGRFeHRlcmlvcihub2RlKXtcblx0XHRcdHZhciBwb2x5ID0gW2ZvcmNlV2luZGluZyhub2RlLnJlZ2lvbiwgZmFsc2UpXTtcblx0XHRcdGdlb3BvbHlzLnB1c2gocG9seSk7XG5cdFx0XHQvLyBjaGlsZHJlbiBvZiBleHRlcmlvcnMgYXJlIGludGVyaW9yXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG5cdFx0XHRcdHBvbHkucHVzaChnZXRJbnRlcmlvcihub2RlLmNoaWxkcmVuW2ldKSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gZ2V0SW50ZXJpb3Iobm9kZSl7XG5cdFx0XHQvLyBjaGlsZHJlbiBvZiBpbnRlcmlvcnMgYXJlIGV4dGVyaW9yXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspXG5cdFx0XHRcdGFkZEV4dGVyaW9yKG5vZGUuY2hpbGRyZW5baV0pO1xuXHRcdFx0Ly8gcmV0dXJuIHRoZSBjbG9ja3dpc2UgaW50ZXJpb3Jcblx0XHRcdHJldHVybiBmb3JjZVdpbmRpbmcobm9kZS5yZWdpb24sIHRydWUpO1xuXHRcdH1cblxuXHRcdC8vIHJvb3Qgbm9kZXMgYXJlIGV4dGVyaW9yXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCByb290cy5jaGlsZHJlbi5sZW5ndGg7IGkrKylcblx0XHRcdGFkZEV4dGVyaW9yKHJvb3RzLmNoaWxkcmVuW2ldKTtcblxuXHRcdC8vIGxhc3RseSwgY29uc3RydWN0IHRoZSBhcHByb3JwcmlhdGUgR2VvSlNPTiBvYmplY3RcblxuXHRcdGlmIChnZW9wb2x5cy5sZW5ndGggPD0gMCkgLy8gZW1wdHkgR2VvSlNPTiBQb2x5Z29uXG5cdFx0XHRyZXR1cm4geyB0eXBlOiAnUG9seWdvbicsIGNvb3JkaW5hdGVzOiBbXSB9O1xuXHRcdGlmIChnZW9wb2x5cy5sZW5ndGggPT0gMSkgLy8gdXNlIGEgR2VvSlNPTiBQb2x5Z29uXG5cdFx0XHRyZXR1cm4geyB0eXBlOiAnUG9seWdvbicsIGNvb3JkaW5hdGVzOiBnZW9wb2x5c1swXSB9O1xuXHRcdHJldHVybiB7IC8vIG90aGVyd2lzZSwgdXNlIGEgR2VvSlNPTiBNdWx0aVBvbHlnb25cblx0XHRcdHR5cGU6ICdNdWx0aVBvbHlnb24nLFxuXHRcdFx0Y29vcmRpbmF0ZXM6IGdlb3BvbHlzXG5cdFx0fTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBHZW9KU09OO1xuIiwiLy8gKGMpIENvcHlyaWdodCAyMDE2LCBTZWFuIENvbm5lbGx5IChAdm9pZHFrKSwgaHR0cDovL3N5bnRoZXRpLmNjXG4vLyBNSVQgTGljZW5zZVxuLy8gUHJvamVjdCBIb21lOiBodHRwczovL2dpdGh1Yi5jb20vdm9pZHFrL3BvbHlib29sanNcblxuLy9cbi8vIHRoaXMgaXMgdGhlIGNvcmUgd29yay1ob3JzZVxuLy9cblxudmFyIExpbmtlZExpc3QgPSByZXF1aXJlKCcuL2xpbmtlZC1saXN0Jyk7XG5cbmZ1bmN0aW9uIEludGVyc2VjdGVyKHNlbGZJbnRlcnNlY3Rpb24sIGVwcywgYnVpbGRMb2cpe1xuXHQvLyBzZWxmSW50ZXJzZWN0aW9uIGlzIHRydWUvZmFsc2UgZGVwZW5kaW5nIG9uIHRoZSBwaGFzZSBvZiB0aGUgb3ZlcmFsbCBhbGdvcml0aG1cblxuXHQvL1xuXHQvLyBzZWdtZW50IGNyZWF0aW9uXG5cdC8vXG5cblx0ZnVuY3Rpb24gc2VnbWVudE5ldyhzdGFydCwgZW5kKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aWQ6IGJ1aWxkTG9nID8gYnVpbGRMb2cuc2VnbWVudElkKCkgOiAtMSxcblx0XHRcdHN0YXJ0OiBzdGFydCxcblx0XHRcdGVuZDogZW5kLFxuXHRcdFx0bXlGaWxsOiB7XG5cdFx0XHRcdGFib3ZlOiBudWxsLCAvLyBpcyB0aGVyZSBmaWxsIGFib3ZlIHVzP1xuXHRcdFx0XHRiZWxvdzogbnVsbCAgLy8gaXMgdGhlcmUgZmlsbCBiZWxvdyB1cz9cblx0XHRcdH0sXG5cdFx0XHRvdGhlckZpbGw6IG51bGxcblx0XHR9O1xuXHR9XG5cblx0ZnVuY3Rpb24gc2VnbWVudENvcHkoc3RhcnQsIGVuZCwgc2VnKXtcblx0XHRyZXR1cm4ge1xuXHRcdFx0aWQ6IGJ1aWxkTG9nID8gYnVpbGRMb2cuc2VnbWVudElkKCkgOiAtMSxcblx0XHRcdHN0YXJ0OiBzdGFydCxcblx0XHRcdGVuZDogZW5kLFxuXHRcdFx0bXlGaWxsOiB7XG5cdFx0XHRcdGFib3ZlOiBzZWcubXlGaWxsLmFib3ZlLFxuXHRcdFx0XHRiZWxvdzogc2VnLm15RmlsbC5iZWxvd1xuXHRcdFx0fSxcblx0XHRcdG90aGVyRmlsbDogbnVsbFxuXHRcdH07XG5cdH1cblxuXHQvL1xuXHQvLyBldmVudCBsb2dpY1xuXHQvL1xuXG5cdHZhciBldmVudF9yb290ID0gTGlua2VkTGlzdC5jcmVhdGUoKTtcblxuXHRmdW5jdGlvbiBldmVudENvbXBhcmUocDFfaXNTdGFydCwgcDFfMSwgcDFfMiwgcDJfaXNTdGFydCwgcDJfMSwgcDJfMil7XG5cdFx0Ly8gY29tcGFyZSB0aGUgc2VsZWN0ZWQgcG9pbnRzIGZpcnN0XG5cdFx0dmFyIGNvbXAgPSBlcHMucG9pbnRzQ29tcGFyZShwMV8xLCBwMl8xKTtcblx0XHRpZiAoY29tcCAhPT0gMClcblx0XHRcdHJldHVybiBjb21wO1xuXHRcdC8vIHRoZSBzZWxlY3RlZCBwb2ludHMgYXJlIHRoZSBzYW1lXG5cblx0XHRpZiAoZXBzLnBvaW50c1NhbWUocDFfMiwgcDJfMikpIC8vIGlmIHRoZSBub24tc2VsZWN0ZWQgcG9pbnRzIGFyZSB0aGUgc2FtZSB0b28uLi5cblx0XHRcdHJldHVybiAwOyAvLyB0aGVuIHRoZSBzZWdtZW50cyBhcmUgZXF1YWxcblxuXHRcdGlmIChwMV9pc1N0YXJ0ICE9PSBwMl9pc1N0YXJ0KSAvLyBpZiBvbmUgaXMgYSBzdGFydCBhbmQgdGhlIG90aGVyIGlzbid0Li4uXG5cdFx0XHRyZXR1cm4gcDFfaXNTdGFydCA/IDEgOiAtMTsgLy8gZmF2b3IgdGhlIG9uZSB0aGF0IGlzbid0IHRoZSBzdGFydFxuXG5cdFx0Ly8gb3RoZXJ3aXNlLCB3ZSdsbCBoYXZlIHRvIGNhbGN1bGF0ZSB3aGljaCBvbmUgaXMgYmVsb3cgdGhlIG90aGVyIG1hbnVhbGx5XG5cdFx0cmV0dXJuIGVwcy5wb2ludEFib3ZlT3JPbkxpbmUocDFfMixcblx0XHRcdHAyX2lzU3RhcnQgPyBwMl8xIDogcDJfMiwgLy8gb3JkZXIgbWF0dGVyc1xuXHRcdFx0cDJfaXNTdGFydCA/IHAyXzIgOiBwMl8xXG5cdFx0KSA/IDEgOiAtMTtcblx0fVxuXG5cdGZ1bmN0aW9uIGV2ZW50QWRkKGV2LCBvdGhlcl9wdCl7XG5cdFx0ZXZlbnRfcm9vdC5pbnNlcnRCZWZvcmUoZXYsIGZ1bmN0aW9uKGhlcmUpe1xuXHRcdFx0Ly8gc2hvdWxkIGV2IGJlIGluc2VydGVkIGJlZm9yZSBoZXJlP1xuXHRcdFx0dmFyIGNvbXAgPSBldmVudENvbXBhcmUoXG5cdFx0XHRcdGV2ICAuaXNTdGFydCwgZXYgIC5wdCwgICAgICBvdGhlcl9wdCxcblx0XHRcdFx0aGVyZS5pc1N0YXJ0LCBoZXJlLnB0LCBoZXJlLm90aGVyLnB0XG5cdFx0XHQpO1xuXHRcdFx0cmV0dXJuIGNvbXAgPCAwO1xuXHRcdH0pO1xuXHR9XG5cblx0ZnVuY3Rpb24gZXZlbnRBZGRTZWdtZW50U3RhcnQoc2VnLCBwcmltYXJ5KXtcblx0XHR2YXIgZXZfc3RhcnQgPSBMaW5rZWRMaXN0Lm5vZGUoe1xuXHRcdFx0aXNTdGFydDogdHJ1ZSxcblx0XHRcdHB0OiBzZWcuc3RhcnQsXG5cdFx0XHRzZWc6IHNlZyxcblx0XHRcdHByaW1hcnk6IHByaW1hcnksXG5cdFx0XHRvdGhlcjogbnVsbCxcblx0XHRcdHN0YXR1czogbnVsbFxuXHRcdH0pO1xuXHRcdGV2ZW50QWRkKGV2X3N0YXJ0LCBzZWcuZW5kKTtcblx0XHRyZXR1cm4gZXZfc3RhcnQ7XG5cdH1cblxuXHRmdW5jdGlvbiBldmVudEFkZFNlZ21lbnRFbmQoZXZfc3RhcnQsIHNlZywgcHJpbWFyeSl7XG5cdFx0dmFyIGV2X2VuZCA9IExpbmtlZExpc3Qubm9kZSh7XG5cdFx0XHRpc1N0YXJ0OiBmYWxzZSxcblx0XHRcdHB0OiBzZWcuZW5kLFxuXHRcdFx0c2VnOiBzZWcsXG5cdFx0XHRwcmltYXJ5OiBwcmltYXJ5LFxuXHRcdFx0b3RoZXI6IGV2X3N0YXJ0LFxuXHRcdFx0c3RhdHVzOiBudWxsXG5cdFx0fSk7XG5cdFx0ZXZfc3RhcnQub3RoZXIgPSBldl9lbmQ7XG5cdFx0ZXZlbnRBZGQoZXZfZW5kLCBldl9zdGFydC5wdCk7XG5cdH1cblxuXHRmdW5jdGlvbiBldmVudEFkZFNlZ21lbnQoc2VnLCBwcmltYXJ5KXtcblx0XHR2YXIgZXZfc3RhcnQgPSBldmVudEFkZFNlZ21lbnRTdGFydChzZWcsIHByaW1hcnkpO1xuXHRcdGV2ZW50QWRkU2VnbWVudEVuZChldl9zdGFydCwgc2VnLCBwcmltYXJ5KTtcblx0XHRyZXR1cm4gZXZfc3RhcnQ7XG5cdH1cblxuXHRmdW5jdGlvbiBldmVudFVwZGF0ZUVuZChldiwgZW5kKXtcblx0XHQvLyBzbGlkZXMgYW4gZW5kIGJhY2t3YXJkc1xuXHRcdC8vICAgKHN0YXJ0KS0tLS0tLS0tLS0tLShlbmQpICAgIHRvOlxuXHRcdC8vICAgKHN0YXJ0KS0tLShlbmQpXG5cblx0XHRpZiAoYnVpbGRMb2cpXG5cdFx0XHRidWlsZExvZy5zZWdtZW50Q2hvcChldi5zZWcsIGVuZCk7XG5cblx0XHRldi5vdGhlci5yZW1vdmUoKTtcblx0XHRldi5zZWcuZW5kID0gZW5kO1xuXHRcdGV2Lm90aGVyLnB0ID0gZW5kO1xuXHRcdGV2ZW50QWRkKGV2Lm90aGVyLCBldi5wdCk7XG5cdH1cblxuXHRmdW5jdGlvbiBldmVudERpdmlkZShldiwgcHQpe1xuXHRcdHZhciBucyA9IHNlZ21lbnRDb3B5KHB0LCBldi5zZWcuZW5kLCBldi5zZWcpO1xuXHRcdGV2ZW50VXBkYXRlRW5kKGV2LCBwdCk7XG5cdFx0cmV0dXJuIGV2ZW50QWRkU2VnbWVudChucywgZXYucHJpbWFyeSk7XG5cdH1cblxuXHRmdW5jdGlvbiBjYWxjdWxhdGUocHJpbWFyeVBvbHlJbnZlcnRlZCwgc2Vjb25kYXJ5UG9seUludmVydGVkKXtcblx0XHQvLyBpZiBzZWxmSW50ZXJzZWN0aW9uIGlzIHRydWUgdGhlbiB0aGVyZSBpcyBubyBzZWNvbmRhcnkgcG9seWdvbiwgc28gdGhhdCBpc24ndCB1c2VkXG5cblx0XHQvL1xuXHRcdC8vIHN0YXR1cyBsb2dpY1xuXHRcdC8vXG5cblx0XHR2YXIgc3RhdHVzX3Jvb3QgPSBMaW5rZWRMaXN0LmNyZWF0ZSgpO1xuXG5cdFx0ZnVuY3Rpb24gc3RhdHVzQ29tcGFyZShldjEsIGV2Mil7XG5cdFx0XHR2YXIgYTEgPSBldjEuc2VnLnN0YXJ0O1xuXHRcdFx0dmFyIGEyID0gZXYxLnNlZy5lbmQ7XG5cdFx0XHR2YXIgYjEgPSBldjIuc2VnLnN0YXJ0O1xuXHRcdFx0dmFyIGIyID0gZXYyLnNlZy5lbmQ7XG5cblx0XHRcdGlmIChlcHMucG9pbnRzQ29sbGluZWFyKGExLCBiMSwgYjIpKXtcblx0XHRcdFx0aWYgKGVwcy5wb2ludHNDb2xsaW5lYXIoYTIsIGIxLCBiMikpXG5cdFx0XHRcdFx0cmV0dXJuIDE7Ly9ldmVudENvbXBhcmUodHJ1ZSwgYTEsIGEyLCB0cnVlLCBiMSwgYjIpO1xuXHRcdFx0XHRyZXR1cm4gZXBzLnBvaW50QWJvdmVPck9uTGluZShhMiwgYjEsIGIyKSA/IDEgOiAtMTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBlcHMucG9pbnRBYm92ZU9yT25MaW5lKGExLCBiMSwgYjIpID8gMSA6IC0xO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHN0YXR1c0ZpbmRTdXJyb3VuZGluZyhldil7XG5cdFx0XHRyZXR1cm4gc3RhdHVzX3Jvb3QuZmluZFRyYW5zaXRpb24oZnVuY3Rpb24oaGVyZSl7XG5cdFx0XHRcdHZhciBjb21wID0gc3RhdHVzQ29tcGFyZShldiwgaGVyZS5ldik7XG5cdFx0XHRcdHJldHVybiBjb21wID4gMDtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGNoZWNrSW50ZXJzZWN0aW9uKGV2MSwgZXYyKXtcblx0XHRcdC8vIHJldHVybnMgdGhlIHNlZ21lbnQgZXF1YWwgdG8gZXYxLCBvciBmYWxzZSBpZiBub3RoaW5nIGVxdWFsXG5cblx0XHRcdHZhciBzZWcxID0gZXYxLnNlZztcblx0XHRcdHZhciBzZWcyID0gZXYyLnNlZztcblx0XHRcdHZhciBhMSA9IHNlZzEuc3RhcnQ7XG5cdFx0XHR2YXIgYTIgPSBzZWcxLmVuZDtcblx0XHRcdHZhciBiMSA9IHNlZzIuc3RhcnQ7XG5cdFx0XHR2YXIgYjIgPSBzZWcyLmVuZDtcblxuXHRcdFx0aWYgKGJ1aWxkTG9nKVxuXHRcdFx0XHRidWlsZExvZy5jaGVja0ludGVyc2VjdGlvbihzZWcxLCBzZWcyKTtcblxuXHRcdFx0dmFyIGkgPSBlcHMubGluZXNJbnRlcnNlY3QoYTEsIGEyLCBiMSwgYjIpO1xuXG5cdFx0XHRpZiAoaSA9PT0gZmFsc2Upe1xuXHRcdFx0XHQvLyBzZWdtZW50cyBhcmUgcGFyYWxsZWwgb3IgY29pbmNpZGVudFxuXG5cdFx0XHRcdC8vIGlmIHBvaW50cyBhcmVuJ3QgY29sbGluZWFyLCB0aGVuIHRoZSBzZWdtZW50cyBhcmUgcGFyYWxsZWwsIHNvIG5vIGludGVyc2VjdGlvbnNcblx0XHRcdFx0aWYgKCFlcHMucG9pbnRzQ29sbGluZWFyKGExLCBhMiwgYjEpKVxuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0Ly8gb3RoZXJ3aXNlLCBzZWdtZW50cyBhcmUgb24gdG9wIG9mIGVhY2ggb3RoZXIgc29tZWhvdyAoYWthIGNvaW5jaWRlbnQpXG5cblx0XHRcdFx0aWYgKGVwcy5wb2ludHNTYW1lKGExLCBiMikgfHwgZXBzLnBvaW50c1NhbWUoYTIsIGIxKSlcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7IC8vIHNlZ21lbnRzIHRvdWNoIGF0IGVuZHBvaW50cy4uLiBubyBpbnRlcnNlY3Rpb25cblxuXHRcdFx0XHR2YXIgYTFfZXF1X2IxID0gZXBzLnBvaW50c1NhbWUoYTEsIGIxKTtcblx0XHRcdFx0dmFyIGEyX2VxdV9iMiA9IGVwcy5wb2ludHNTYW1lKGEyLCBiMik7XG5cblx0XHRcdFx0aWYgKGExX2VxdV9iMSAmJiBhMl9lcXVfYjIpXG5cdFx0XHRcdFx0cmV0dXJuIGV2MjsgLy8gc2VnbWVudHMgYXJlIGV4YWN0bHkgZXF1YWxcblxuXHRcdFx0XHR2YXIgYTFfYmV0d2VlbiA9ICFhMV9lcXVfYjEgJiYgZXBzLnBvaW50QmV0d2VlbihhMSwgYjEsIGIyKTtcblx0XHRcdFx0dmFyIGEyX2JldHdlZW4gPSAhYTJfZXF1X2IyICYmIGVwcy5wb2ludEJldHdlZW4oYTIsIGIxLCBiMik7XG5cblx0XHRcdFx0Ly8gaGFuZHkgZm9yIGRlYnVnZ2luZzpcblx0XHRcdFx0Ly8gYnVpbGRMb2cubG9nKHtcblx0XHRcdFx0Ly9cdGExX2VxdV9iMTogYTFfZXF1X2IxLFxuXHRcdFx0XHQvL1x0YTJfZXF1X2IyOiBhMl9lcXVfYjIsXG5cdFx0XHRcdC8vXHRhMV9iZXR3ZWVuOiBhMV9iZXR3ZWVuLFxuXHRcdFx0XHQvL1x0YTJfYmV0d2VlbjogYTJfYmV0d2VlblxuXHRcdFx0XHQvLyB9KTtcblxuXHRcdFx0XHRpZiAoYTFfZXF1X2IxKXtcblx0XHRcdFx0XHRpZiAoYTJfYmV0d2Vlbil7XG5cdFx0XHRcdFx0XHQvLyAgKGExKS0tLShhMilcblx0XHRcdFx0XHRcdC8vICAoYjEpLS0tLS0tLS0tLShiMilcblx0XHRcdFx0XHRcdGV2ZW50RGl2aWRlKGV2MiwgYTIpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0Ly8gIChhMSktLS0tLS0tLS0tKGEyKVxuXHRcdFx0XHRcdFx0Ly8gIChiMSktLS0oYjIpXG5cdFx0XHRcdFx0XHRldmVudERpdmlkZShldjEsIGIyKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0cmV0dXJuIGV2Mjtcblx0XHRcdFx0fVxuXHRcdFx0XHRlbHNlIGlmIChhMV9iZXR3ZWVuKXtcblx0XHRcdFx0XHRpZiAoIWEyX2VxdV9iMil7XG5cdFx0XHRcdFx0XHQvLyBtYWtlIGEyIGVxdWFsIHRvIGIyXG5cdFx0XHRcdFx0XHRpZiAoYTJfYmV0d2Vlbil7XG5cdFx0XHRcdFx0XHRcdC8vICAgICAgICAgKGExKS0tLShhMilcblx0XHRcdFx0XHRcdFx0Ly8gIChiMSktLS0tLS0tLS0tLS0tLS0tLShiMilcblx0XHRcdFx0XHRcdFx0ZXZlbnREaXZpZGUoZXYyLCBhMik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0XHQvLyAgICAgICAgIChhMSktLS0tLS0tLS0tKGEyKVxuXHRcdFx0XHRcdFx0XHQvLyAgKGIxKS0tLS0tLS0tLS0oYjIpXG5cdFx0XHRcdFx0XHRcdGV2ZW50RGl2aWRlKGV2MSwgYjIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vICAgICAgICAgKGExKS0tLShhMilcblx0XHRcdFx0XHQvLyAgKGIxKS0tLS0tLS0tLS0oYjIpXG5cdFx0XHRcdFx0ZXZlbnREaXZpZGUoZXYyLCBhMSk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdC8vIG90aGVyd2lzZSwgbGluZXMgaW50ZXJzZWN0IGF0IGkucHQsIHdoaWNoIG1heSBvciBtYXkgbm90IGJlIGJldHdlZW4gdGhlIGVuZHBvaW50c1xuXG5cdFx0XHRcdC8vIGlzIEEgZGl2aWRlZCBiZXR3ZWVuIGl0cyBlbmRwb2ludHM/IChleGNsdXNpdmUpXG5cdFx0XHRcdGlmIChpLmFsb25nQSA9PT0gMCl7XG5cdFx0XHRcdFx0aWYgKGkuYWxvbmdCID09PSAtMSkgLy8geWVzLCBhdCBleGFjdGx5IGIxXG5cdFx0XHRcdFx0XHRldmVudERpdmlkZShldjEsIGIxKTtcblx0XHRcdFx0XHRlbHNlIGlmIChpLmFsb25nQiA9PT0gMCkgLy8geWVzLCBzb21ld2hlcmUgYmV0d2VlbiBCJ3MgZW5kcG9pbnRzXG5cdFx0XHRcdFx0XHRldmVudERpdmlkZShldjEsIGkucHQpO1xuXHRcdFx0XHRcdGVsc2UgaWYgKGkuYWxvbmdCID09PSAxKSAvLyB5ZXMsIGF0IGV4YWN0bHkgYjJcblx0XHRcdFx0XHRcdGV2ZW50RGl2aWRlKGV2MSwgYjIpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Ly8gaXMgQiBkaXZpZGVkIGJldHdlZW4gaXRzIGVuZHBvaW50cz8gKGV4Y2x1c2l2ZSlcblx0XHRcdFx0aWYgKGkuYWxvbmdCID09PSAwKXtcblx0XHRcdFx0XHRpZiAoaS5hbG9uZ0EgPT09IC0xKSAvLyB5ZXMsIGF0IGV4YWN0bHkgYTFcblx0XHRcdFx0XHRcdGV2ZW50RGl2aWRlKGV2MiwgYTEpO1xuXHRcdFx0XHRcdGVsc2UgaWYgKGkuYWxvbmdBID09PSAwKSAvLyB5ZXMsIHNvbWV3aGVyZSBiZXR3ZWVuIEEncyBlbmRwb2ludHMgKGV4Y2x1c2l2ZSlcblx0XHRcdFx0XHRcdGV2ZW50RGl2aWRlKGV2MiwgaS5wdCk7XG5cdFx0XHRcdFx0ZWxzZSBpZiAoaS5hbG9uZ0EgPT09IDEpIC8vIHllcywgYXQgZXhhY3RseSBhMlxuXHRcdFx0XHRcdFx0ZXZlbnREaXZpZGUoZXYyLCBhMik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHQvL1xuXHRcdC8vIG1haW4gZXZlbnQgbG9vcFxuXHRcdC8vXG5cdFx0dmFyIHNlZ21lbnRzID0gW107XG5cdFx0d2hpbGUgKCFldmVudF9yb290LmlzRW1wdHkoKSl7XG5cdFx0XHR2YXIgZXYgPSBldmVudF9yb290LmdldEhlYWQoKTtcblxuXHRcdFx0aWYgKGJ1aWxkTG9nKVxuXHRcdFx0XHRidWlsZExvZy52ZXJ0KGV2LnB0WzBdKTtcblxuXHRcdFx0aWYgKGV2LmlzU3RhcnQpe1xuXG5cdFx0XHRcdGlmIChidWlsZExvZylcblx0XHRcdFx0XHRidWlsZExvZy5zZWdtZW50TmV3KGV2LnNlZywgZXYucHJpbWFyeSk7XG5cblx0XHRcdFx0dmFyIHN1cnJvdW5kaW5nID0gc3RhdHVzRmluZFN1cnJvdW5kaW5nKGV2KTtcblx0XHRcdFx0dmFyIGFib3ZlID0gc3Vycm91bmRpbmcuYmVmb3JlID8gc3Vycm91bmRpbmcuYmVmb3JlLmV2IDogbnVsbDtcblx0XHRcdFx0dmFyIGJlbG93ID0gc3Vycm91bmRpbmcuYWZ0ZXIgPyBzdXJyb3VuZGluZy5hZnRlci5ldiA6IG51bGw7XG5cblx0XHRcdFx0aWYgKGJ1aWxkTG9nKXtcblx0XHRcdFx0XHRidWlsZExvZy50ZW1wU3RhdHVzKFxuXHRcdFx0XHRcdFx0ZXYuc2VnLFxuXHRcdFx0XHRcdFx0YWJvdmUgPyBhYm92ZS5zZWcgOiBmYWxzZSxcblx0XHRcdFx0XHRcdGJlbG93ID8gYmVsb3cuc2VnIDogZmFsc2Vcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZnVuY3Rpb24gY2hlY2tCb3RoSW50ZXJzZWN0aW9ucygpe1xuXHRcdFx0XHRcdGlmIChhYm92ZSl7XG5cdFx0XHRcdFx0XHR2YXIgZXZlID0gY2hlY2tJbnRlcnNlY3Rpb24oZXYsIGFib3ZlKTtcblx0XHRcdFx0XHRcdGlmIChldmUpXG5cdFx0XHRcdFx0XHRcdHJldHVybiBldmU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChiZWxvdylcblx0XHRcdFx0XHRcdHJldHVybiBjaGVja0ludGVyc2VjdGlvbihldiwgYmVsb3cpO1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHZhciBldmUgPSBjaGVja0JvdGhJbnRlcnNlY3Rpb25zKCk7XG5cdFx0XHRcdGlmIChldmUpe1xuXHRcdFx0XHRcdC8vIGV2IGFuZCBldmUgYXJlIGVxdWFsXG5cdFx0XHRcdFx0Ly8gd2UnbGwga2VlcCBldmUgYW5kIHRocm93IGF3YXkgZXZcblxuXHRcdFx0XHRcdC8vIG1lcmdlIGV2LnNlZydzIGZpbGwgaW5mb3JtYXRpb24gaW50byBldmUuc2VnXG5cblx0XHRcdFx0XHRpZiAoc2VsZkludGVyc2VjdGlvbil7XG5cdFx0XHRcdFx0XHR2YXIgdG9nZ2xlOyAvLyBhcmUgd2UgYSB0b2dnbGluZyBlZGdlP1xuXHRcdFx0XHRcdFx0aWYgKGV2LnNlZy5teUZpbGwuYmVsb3cgPT09IG51bGwpXG5cdFx0XHRcdFx0XHRcdHRvZ2dsZSA9IHRydWU7XG5cdFx0XHRcdFx0XHRlbHNlXG5cdFx0XHRcdFx0XHRcdHRvZ2dsZSA9IGV2LnNlZy5teUZpbGwuYWJvdmUgIT09IGV2LnNlZy5teUZpbGwuYmVsb3c7XG5cblx0XHRcdFx0XHRcdC8vIG1lcmdlIHR3byBzZWdtZW50cyB0aGF0IGJlbG9uZyB0byB0aGUgc2FtZSBwb2x5Z29uXG5cdFx0XHRcdFx0XHQvLyB0aGluayBvZiB0aGlzIGFzIHNhbmR3aWNoaW5nIHR3byBzZWdtZW50cyB0b2dldGhlciwgd2hlcmUgYGV2ZS5zZWdgIGlzXG5cdFx0XHRcdFx0XHQvLyB0aGUgYm90dG9tIC0tIHRoaXMgd2lsbCBjYXVzZSB0aGUgYWJvdmUgZmlsbCBmbGFnIHRvIHRvZ2dsZVxuXHRcdFx0XHRcdFx0aWYgKHRvZ2dsZSlcblx0XHRcdFx0XHRcdFx0ZXZlLnNlZy5teUZpbGwuYWJvdmUgPSAhZXZlLnNlZy5teUZpbGwuYWJvdmU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHQvLyBtZXJnZSB0d28gc2VnbWVudHMgdGhhdCBiZWxvbmcgdG8gZGlmZmVyZW50IHBvbHlnb25zXG5cdFx0XHRcdFx0XHQvLyBlYWNoIHNlZ21lbnQgaGFzIGRpc3RpbmN0IGtub3dsZWRnZSwgc28gbm8gc3BlY2lhbCBsb2dpYyBpcyBuZWVkZWRcblx0XHRcdFx0XHRcdC8vIG5vdGUgdGhhdCB0aGlzIGNhbiBvbmx5IGhhcHBlbiBvbmNlIHBlciBzZWdtZW50IGluIHRoaXMgcGhhc2UsIGJlY2F1c2Ugd2Vcblx0XHRcdFx0XHRcdC8vIGFyZSBndWFyYW50ZWVkIHRoYXQgYWxsIHNlbGYtaW50ZXJzZWN0aW9ucyBhcmUgZ29uZVxuXHRcdFx0XHRcdFx0ZXZlLnNlZy5vdGhlckZpbGwgPSBldi5zZWcubXlGaWxsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChidWlsZExvZylcblx0XHRcdFx0XHRcdGJ1aWxkTG9nLnNlZ21lbnRVcGRhdGUoZXZlLnNlZyk7XG5cblx0XHRcdFx0XHRldi5vdGhlci5yZW1vdmUoKTtcblx0XHRcdFx0XHRldi5yZW1vdmUoKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChldmVudF9yb290LmdldEhlYWQoKSAhPT0gZXYpe1xuXHRcdFx0XHRcdC8vIHNvbWV0aGluZyB3YXMgaW5zZXJ0ZWQgYmVmb3JlIHVzIGluIHRoZSBldmVudCBxdWV1ZSwgc28gbG9vcCBiYWNrIGFyb3VuZCBhbmRcblx0XHRcdFx0XHQvLyBwcm9jZXNzIGl0IGJlZm9yZSBjb250aW51aW5nXG5cdFx0XHRcdFx0aWYgKGJ1aWxkTG9nKVxuXHRcdFx0XHRcdFx0YnVpbGRMb2cucmV3aW5kKGV2LnNlZyk7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvL1xuXHRcdFx0XHQvLyBjYWxjdWxhdGUgZmlsbCBmbGFnc1xuXHRcdFx0XHQvL1xuXHRcdFx0XHRpZiAoc2VsZkludGVyc2VjdGlvbil7XG5cdFx0XHRcdFx0dmFyIHRvZ2dsZTsgLy8gYXJlIHdlIGEgdG9nZ2xpbmcgZWRnZT9cblx0XHRcdFx0XHRpZiAoZXYuc2VnLm15RmlsbC5iZWxvdyA9PT0gbnVsbCkgLy8gaWYgd2UgYXJlIGEgbmV3IHNlZ21lbnQuLi5cblx0XHRcdFx0XHRcdHRvZ2dsZSA9IHRydWU7IC8vIHRoZW4gd2UgdG9nZ2xlXG5cdFx0XHRcdFx0ZWxzZSAvLyB3ZSBhcmUgYSBzZWdtZW50IHRoYXQgaGFzIHByZXZpb3VzIGtub3dsZWRnZSBmcm9tIGEgZGl2aXNpb25cblx0XHRcdFx0XHRcdHRvZ2dsZSA9IGV2LnNlZy5teUZpbGwuYWJvdmUgIT09IGV2LnNlZy5teUZpbGwuYmVsb3c7IC8vIGNhbGN1bGF0ZSB0b2dnbGVcblxuXHRcdFx0XHRcdC8vIG5leHQsIGNhbGN1bGF0ZSB3aGV0aGVyIHdlIGFyZSBmaWxsZWQgYmVsb3cgdXNcblx0XHRcdFx0XHRpZiAoIWJlbG93KXsgLy8gaWYgbm90aGluZyBpcyBiZWxvdyB1cy4uLlxuXHRcdFx0XHRcdFx0Ly8gd2UgYXJlIGZpbGxlZCBiZWxvdyB1cyBpZiB0aGUgcG9seWdvbiBpcyBpbnZlcnRlZFxuXHRcdFx0XHRcdFx0ZXYuc2VnLm15RmlsbC5iZWxvdyA9IHByaW1hcnlQb2x5SW52ZXJ0ZWQ7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0XHQvLyBvdGhlcndpc2UsIHdlIGtub3cgdGhlIGFuc3dlciAtLSBpdCdzIHRoZSBzYW1lIGlmIHdoYXRldmVyIGlzIGJlbG93XG5cdFx0XHRcdFx0XHQvLyB1cyBpcyBmaWxsZWQgYWJvdmUgaXRcblx0XHRcdFx0XHRcdGV2LnNlZy5teUZpbGwuYmVsb3cgPSBiZWxvdy5zZWcubXlGaWxsLmFib3ZlO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdC8vIHNpbmNlIG5vdyB3ZSBrbm93IGlmIHdlJ3JlIGZpbGxlZCBiZWxvdyB1cywgd2UgY2FuIGNhbGN1bGF0ZSB3aGV0aGVyXG5cdFx0XHRcdFx0Ly8gd2UncmUgZmlsbGVkIGFib3ZlIHVzIGJ5IGFwcGx5aW5nIHRvZ2dsZSB0byB3aGF0ZXZlciBpcyBiZWxvdyB1c1xuXHRcdFx0XHRcdGlmICh0b2dnbGUpXG5cdFx0XHRcdFx0XHRldi5zZWcubXlGaWxsLmFib3ZlID0gIWV2LnNlZy5teUZpbGwuYmVsb3c7XG5cdFx0XHRcdFx0ZWxzZVxuXHRcdFx0XHRcdFx0ZXYuc2VnLm15RmlsbC5hYm92ZSA9IGV2LnNlZy5teUZpbGwuYmVsb3c7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHQvLyBub3cgd2UgZmlsbCBpbiBhbnkgbWlzc2luZyB0cmFuc2l0aW9uIGluZm9ybWF0aW9uLCBzaW5jZSB3ZSBhcmUgYWxsLWtub3dpbmdcblx0XHRcdFx0XHQvLyBhdCB0aGlzIHBvaW50XG5cblx0XHRcdFx0XHRpZiAoZXYuc2VnLm90aGVyRmlsbCA9PT0gbnVsbCl7XG5cdFx0XHRcdFx0XHQvLyBpZiB3ZSBkb24ndCBoYXZlIG90aGVyIGluZm9ybWF0aW9uLCB0aGVuIHdlIG5lZWQgdG8gZmlndXJlIG91dCBpZiB3ZSdyZVxuXHRcdFx0XHRcdFx0Ly8gaW5zaWRlIHRoZSBvdGhlciBwb2x5Z29uXG5cdFx0XHRcdFx0XHR2YXIgaW5zaWRlO1xuXHRcdFx0XHRcdFx0aWYgKCFiZWxvdyl7XG5cdFx0XHRcdFx0XHRcdC8vIGlmIG5vdGhpbmcgaXMgYmVsb3cgdXMsIHRoZW4gd2UncmUgaW5zaWRlIGlmIHRoZSBvdGhlciBwb2x5Z29uIGlzXG5cdFx0XHRcdFx0XHRcdC8vIGludmVydGVkXG5cdFx0XHRcdFx0XHRcdGluc2lkZSA9XG5cdFx0XHRcdFx0XHRcdFx0ZXYucHJpbWFyeSA/IHNlY29uZGFyeVBvbHlJbnZlcnRlZCA6IHByaW1hcnlQb2x5SW52ZXJ0ZWQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRlbHNleyAvLyBvdGhlcndpc2UsIHNvbWV0aGluZyBpcyBiZWxvdyB1c1xuXHRcdFx0XHRcdFx0XHQvLyBzbyBjb3B5IHRoZSBiZWxvdyBzZWdtZW50J3Mgb3RoZXIgcG9seWdvbidzIGFib3ZlXG5cdFx0XHRcdFx0XHRcdGlmIChldi5wcmltYXJ5ID09PSBiZWxvdy5wcmltYXJ5KVxuXHRcdFx0XHRcdFx0XHRcdGluc2lkZSA9IGJlbG93LnNlZy5vdGhlckZpbGwuYWJvdmU7XG5cdFx0XHRcdFx0XHRcdGVsc2Vcblx0XHRcdFx0XHRcdFx0XHRpbnNpZGUgPSBiZWxvdy5zZWcubXlGaWxsLmFib3ZlO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0ZXYuc2VnLm90aGVyRmlsbCA9IHtcblx0XHRcdFx0XHRcdFx0YWJvdmU6IGluc2lkZSxcblx0XHRcdFx0XHRcdFx0YmVsb3c6IGluc2lkZVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYnVpbGRMb2cpe1xuXHRcdFx0XHRcdGJ1aWxkTG9nLnN0YXR1cyhcblx0XHRcdFx0XHRcdGV2LnNlZyxcblx0XHRcdFx0XHRcdGFib3ZlID8gYWJvdmUuc2VnIDogZmFsc2UsXG5cdFx0XHRcdFx0XHRiZWxvdyA/IGJlbG93LnNlZyA6IGZhbHNlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIGluc2VydCB0aGUgc3RhdHVzIGFuZCByZW1lbWJlciBpdCBmb3IgbGF0ZXIgcmVtb3ZhbFxuXHRcdFx0XHRldi5vdGhlci5zdGF0dXMgPSBzdXJyb3VuZGluZy5pbnNlcnQoTGlua2VkTGlzdC5ub2RlKHsgZXY6IGV2IH0pKTtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdHZhciBzdCA9IGV2LnN0YXR1cztcblxuXHRcdFx0XHRpZiAoc3QgPT09IG51bGwpe1xuXHRcdFx0XHRcdHRocm93IG5ldyBFcnJvcignUG9seUJvb2w6IFplcm8tbGVuZ3RoIHNlZ21lbnQgZGV0ZWN0ZWQ7IHlvdXIgZXBzaWxvbiBpcyAnICtcblx0XHRcdFx0XHRcdCdwcm9iYWJseSB0b28gc21hbGwgb3IgdG9vIGxhcmdlJyk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyByZW1vdmluZyB0aGUgc3RhdHVzIHdpbGwgY3JlYXRlIHR3byBuZXcgYWRqYWNlbnQgZWRnZXMsIHNvIHdlJ2xsIG5lZWQgdG8gY2hlY2tcblx0XHRcdFx0Ly8gZm9yIHRob3NlXG5cdFx0XHRcdGlmIChzdGF0dXNfcm9vdC5leGlzdHMoc3QucHJldikgJiYgc3RhdHVzX3Jvb3QuZXhpc3RzKHN0Lm5leHQpKVxuXHRcdFx0XHRcdGNoZWNrSW50ZXJzZWN0aW9uKHN0LnByZXYuZXYsIHN0Lm5leHQuZXYpO1xuXG5cdFx0XHRcdGlmIChidWlsZExvZylcblx0XHRcdFx0XHRidWlsZExvZy5zdGF0dXNSZW1vdmUoc3QuZXYuc2VnKTtcblxuXHRcdFx0XHQvLyByZW1vdmUgdGhlIHN0YXR1c1xuXHRcdFx0XHRzdC5yZW1vdmUoKTtcblxuXHRcdFx0XHQvLyBpZiB3ZSd2ZSByZWFjaGVkIHRoaXMgcG9pbnQsIHdlJ3ZlIGNhbGN1bGF0ZWQgZXZlcnl0aGluZyB0aGVyZSBpcyB0byBrbm93LCBzb1xuXHRcdFx0XHQvLyBzYXZlIHRoZSBzZWdtZW50IGZvciByZXBvcnRpbmdcblx0XHRcdFx0aWYgKCFldi5wcmltYXJ5KXtcblx0XHRcdFx0XHQvLyBtYWtlIHN1cmUgYHNlZy5teUZpbGxgIGFjdHVhbGx5IHBvaW50cyB0byB0aGUgcHJpbWFyeSBwb2x5Z29uIHRob3VnaFxuXHRcdFx0XHRcdHZhciBzID0gZXYuc2VnLm15RmlsbDtcblx0XHRcdFx0XHRldi5zZWcubXlGaWxsID0gZXYuc2VnLm90aGVyRmlsbDtcblx0XHRcdFx0XHRldi5zZWcub3RoZXJGaWxsID0gcztcblx0XHRcdFx0fVxuXHRcdFx0XHRzZWdtZW50cy5wdXNoKGV2LnNlZyk7XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlbW92ZSB0aGUgZXZlbnQgYW5kIGNvbnRpbnVlXG5cdFx0XHRldmVudF9yb290LmdldEhlYWQoKS5yZW1vdmUoKTtcblx0XHR9XG5cblx0XHRpZiAoYnVpbGRMb2cpXG5cdFx0XHRidWlsZExvZy5kb25lKCk7XG5cblx0XHRyZXR1cm4gc2VnbWVudHM7XG5cdH1cblxuXHQvLyByZXR1cm4gdGhlIGFwcHJvcHJpYXRlIEFQSSBkZXBlbmRpbmcgb24gd2hhdCB3ZSdyZSBkb2luZ1xuXHRpZiAoIXNlbGZJbnRlcnNlY3Rpb24pe1xuXHRcdC8vIHBlcmZvcm1pbmcgY29tYmluYXRpb24gb2YgcG9seWdvbnMsIHNvIG9ubHkgZGVhbCB3aXRoIGFscmVhZHktcHJvY2Vzc2VkIHNlZ21lbnRzXG5cdFx0cmV0dXJuIHtcblx0XHRcdGNhbGN1bGF0ZTogZnVuY3Rpb24oc2VnbWVudHMxLCBpbnZlcnRlZDEsIHNlZ21lbnRzMiwgaW52ZXJ0ZWQyKXtcblx0XHRcdFx0Ly8gc2VnbWVudHNYIGNvbWUgZnJvbSB0aGUgc2VsZi1pbnRlcnNlY3Rpb24gQVBJLCBvciB0aGlzIEFQSVxuXHRcdFx0XHQvLyBpbnZlcnRlZFggaXMgd2hldGhlciB3ZSB0cmVhdCB0aGF0IGxpc3Qgb2Ygc2VnbWVudHMgYXMgYW4gaW52ZXJ0ZWQgcG9seWdvbiBvciBub3Rcblx0XHRcdFx0Ly8gcmV0dXJucyBzZWdtZW50cyB0aGF0IGNhbiBiZSB1c2VkIGZvciBmdXJ0aGVyIG9wZXJhdGlvbnNcblx0XHRcdFx0c2VnbWVudHMxLmZvckVhY2goZnVuY3Rpb24oc2VnKXtcblx0XHRcdFx0XHRldmVudEFkZFNlZ21lbnQoc2VnbWVudENvcHkoc2VnLnN0YXJ0LCBzZWcuZW5kLCBzZWcpLCB0cnVlKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHNlZ21lbnRzMi5mb3JFYWNoKGZ1bmN0aW9uKHNlZyl7XG5cdFx0XHRcdFx0ZXZlbnRBZGRTZWdtZW50KHNlZ21lbnRDb3B5KHNlZy5zdGFydCwgc2VnLmVuZCwgc2VnKSwgZmFsc2UpO1xuXHRcdFx0XHR9KTtcblx0XHRcdFx0cmV0dXJuIGNhbGN1bGF0ZShpbnZlcnRlZDEsIGludmVydGVkMik7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxuXG5cdC8vIG90aGVyd2lzZSwgcGVyZm9ybWluZyBzZWxmLWludGVyc2VjdGlvbiwgc28gZGVhbCB3aXRoIHJlZ2lvbnNcblx0cmV0dXJuIHtcblx0XHRhZGRSZWdpb246IGZ1bmN0aW9uKHJlZ2lvbil7XG5cdFx0XHQvLyByZWdpb25zIGFyZSBhIGxpc3Qgb2YgcG9pbnRzOlxuXHRcdFx0Ly8gIFsgWzAsIDBdLCBbMTAwLCAwXSwgWzUwLCAxMDBdIF1cblx0XHRcdC8vIHlvdSBjYW4gYWRkIG11bHRpcGxlIHJlZ2lvbnMgYmVmb3JlIHJ1bm5pbmcgY2FsY3VsYXRlXG5cdFx0XHR2YXIgcHQxO1xuXHRcdFx0dmFyIHB0MiA9IHJlZ2lvbltyZWdpb24ubGVuZ3RoIC0gMV07XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHJlZ2lvbi5sZW5ndGg7IGkrKyl7XG5cdFx0XHRcdHB0MSA9IHB0Mjtcblx0XHRcdFx0cHQyID0gcmVnaW9uW2ldO1xuXG5cdFx0XHRcdHZhciBmb3J3YXJkID0gZXBzLnBvaW50c0NvbXBhcmUocHQxLCBwdDIpO1xuXHRcdFx0XHRpZiAoZm9yd2FyZCA9PT0gMCkgLy8gcG9pbnRzIGFyZSBlcXVhbCwgc28gd2UgaGF2ZSBhIHplcm8tbGVuZ3RoIHNlZ21lbnRcblx0XHRcdFx0XHRjb250aW51ZTsgLy8ganVzdCBza2lwIGl0XG5cblx0XHRcdFx0ZXZlbnRBZGRTZWdtZW50KFxuXHRcdFx0XHRcdHNlZ21lbnROZXcoXG5cdFx0XHRcdFx0XHRmb3J3YXJkIDwgMCA/IHB0MSA6IHB0Mixcblx0XHRcdFx0XHRcdGZvcndhcmQgPCAwID8gcHQyIDogcHQxXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHR0cnVlXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRjYWxjdWxhdGU6IGZ1bmN0aW9uKGludmVydGVkKXtcblx0XHRcdC8vIGlzIHRoZSBwb2x5Z29uIGludmVydGVkP1xuXHRcdFx0Ly8gcmV0dXJucyBzZWdtZW50c1xuXHRcdFx0cmV0dXJuIGNhbGN1bGF0ZShpbnZlcnRlZCwgZmFsc2UpO1xuXHRcdH1cblx0fTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBJbnRlcnNlY3RlcjtcbiIsIi8vIChjKSBDb3B5cmlnaHQgMjAxNiwgU2VhbiBDb25uZWxseSAoQHZvaWRxayksIGh0dHA6Ly9zeW50aGV0aS5jY1xuLy8gTUlUIExpY2Vuc2Vcbi8vIFByb2plY3QgSG9tZTogaHR0cHM6Ly9naXRodWIuY29tL3ZvaWRxay9wb2x5Ym9vbGpzXG5cbi8vXG4vLyBzaW1wbGUgbGlua2VkIGxpc3QgaW1wbGVtZW50YXRpb24gdGhhdCBhbGxvd3MgeW91IHRvIHRyYXZlcnNlIGRvd24gbm9kZXMgYW5kIHNhdmUgcG9zaXRpb25zXG4vL1xuXG52YXIgTGlua2VkTGlzdCA9IHtcblx0Y3JlYXRlOiBmdW5jdGlvbigpe1xuXHRcdHZhciBteSA9IHtcblx0XHRcdHJvb3Q6IHsgcm9vdDogdHJ1ZSwgbmV4dDogbnVsbCB9LFxuXHRcdFx0ZXhpc3RzOiBmdW5jdGlvbihub2RlKXtcblx0XHRcdFx0aWYgKG5vZGUgPT09IG51bGwgfHwgbm9kZSA9PT0gbXkucm9vdClcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0fSxcblx0XHRcdGlzRW1wdHk6IGZ1bmN0aW9uKCl7XG5cdFx0XHRcdHJldHVybiBteS5yb290Lm5leHQgPT09IG51bGw7XG5cdFx0XHR9LFxuXHRcdFx0Z2V0SGVhZDogZnVuY3Rpb24oKXtcblx0XHRcdFx0cmV0dXJuIG15LnJvb3QubmV4dDtcblx0XHRcdH0sXG5cdFx0XHRpbnNlcnRCZWZvcmU6IGZ1bmN0aW9uKG5vZGUsIGNoZWNrKXtcblx0XHRcdFx0dmFyIGxhc3QgPSBteS5yb290O1xuXHRcdFx0XHR2YXIgaGVyZSA9IG15LnJvb3QubmV4dDtcblx0XHRcdFx0d2hpbGUgKGhlcmUgIT09IG51bGwpe1xuXHRcdFx0XHRcdGlmIChjaGVjayhoZXJlKSl7XG5cdFx0XHRcdFx0XHRub2RlLnByZXYgPSBoZXJlLnByZXY7XG5cdFx0XHRcdFx0XHRub2RlLm5leHQgPSBoZXJlO1xuXHRcdFx0XHRcdFx0aGVyZS5wcmV2Lm5leHQgPSBub2RlO1xuXHRcdFx0XHRcdFx0aGVyZS5wcmV2ID0gbm9kZTtcblx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bGFzdCA9IGhlcmU7XG5cdFx0XHRcdFx0aGVyZSA9IGhlcmUubmV4dDtcblx0XHRcdFx0fVxuXHRcdFx0XHRsYXN0Lm5leHQgPSBub2RlO1xuXHRcdFx0XHRub2RlLnByZXYgPSBsYXN0O1xuXHRcdFx0XHRub2RlLm5leHQgPSBudWxsO1xuXHRcdFx0fSxcblx0XHRcdGZpbmRUcmFuc2l0aW9uOiBmdW5jdGlvbihjaGVjayl7XG5cdFx0XHRcdHZhciBwcmV2ID0gbXkucm9vdDtcblx0XHRcdFx0dmFyIGhlcmUgPSBteS5yb290Lm5leHQ7XG5cdFx0XHRcdHdoaWxlIChoZXJlICE9PSBudWxsKXtcblx0XHRcdFx0XHRpZiAoY2hlY2soaGVyZSkpXG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRwcmV2ID0gaGVyZTtcblx0XHRcdFx0XHRoZXJlID0gaGVyZS5uZXh0O1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0YmVmb3JlOiBwcmV2ID09PSBteS5yb290ID8gbnVsbCA6IHByZXYsXG5cdFx0XHRcdFx0YWZ0ZXI6IGhlcmUsXG5cdFx0XHRcdFx0aW5zZXJ0OiBmdW5jdGlvbihub2RlKXtcblx0XHRcdFx0XHRcdG5vZGUucHJldiA9IHByZXY7XG5cdFx0XHRcdFx0XHRub2RlLm5leHQgPSBoZXJlO1xuXHRcdFx0XHRcdFx0cHJldi5uZXh0ID0gbm9kZTtcblx0XHRcdFx0XHRcdGlmIChoZXJlICE9PSBudWxsKVxuXHRcdFx0XHRcdFx0XHRoZXJlLnByZXYgPSBub2RlO1xuXHRcdFx0XHRcdFx0cmV0dXJuIG5vZGU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0cmV0dXJuIG15O1xuXHR9LFxuXHRub2RlOiBmdW5jdGlvbihkYXRhKXtcblx0XHRkYXRhLnByZXYgPSBudWxsO1xuXHRcdGRhdGEubmV4dCA9IG51bGw7XG5cdFx0ZGF0YS5yZW1vdmUgPSBmdW5jdGlvbigpe1xuXHRcdFx0ZGF0YS5wcmV2Lm5leHQgPSBkYXRhLm5leHQ7XG5cdFx0XHRpZiAoZGF0YS5uZXh0KVxuXHRcdFx0XHRkYXRhLm5leHQucHJldiA9IGRhdGEucHJldjtcblx0XHRcdGRhdGEucHJldiA9IG51bGw7XG5cdFx0XHRkYXRhLm5leHQgPSBudWxsO1xuXHRcdH07XG5cdFx0cmV0dXJuIGRhdGE7XG5cdH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGlua2VkTGlzdDtcbiIsIi8vIChjKSBDb3B5cmlnaHQgMjAxNiwgU2VhbiBDb25uZWxseSAoQHZvaWRxayksIGh0dHA6Ly9zeW50aGV0aS5jY1xuLy8gTUlUIExpY2Vuc2Vcbi8vIFByb2plY3QgSG9tZTogaHR0cHM6Ly9naXRodWIuY29tL3ZvaWRxay9wb2x5Ym9vbGpzXG5cbi8vXG4vLyBjb252ZXJ0cyBhIGxpc3Qgb2Ygc2VnbWVudHMgaW50byBhIGxpc3Qgb2YgcmVnaW9ucywgd2hpbGUgYWxzbyByZW1vdmluZyB1bm5lY2Vzc2FyeSB2ZXJ0aWNpZXNcbi8vXG5cbmZ1bmN0aW9uIFNlZ21lbnRDaGFpbmVyKHNlZ21lbnRzLCBlcHMsIGJ1aWxkTG9nKXtcblx0dmFyIGNoYWlucyA9IFtdO1xuXHR2YXIgcmVnaW9ucyA9IFtdO1xuXG5cdHNlZ21lbnRzLmZvckVhY2goZnVuY3Rpb24oc2VnKXtcblx0XHR2YXIgcHQxID0gc2VnLnN0YXJ0O1xuXHRcdHZhciBwdDIgPSBzZWcuZW5kO1xuXHRcdGlmIChlcHMucG9pbnRzU2FtZShwdDEsIHB0Mikpe1xuXHRcdFx0Y29uc29sZS53YXJuKCdQb2x5Qm9vbDogV2FybmluZzogWmVyby1sZW5ndGggc2VnbWVudCBkZXRlY3RlZDsgeW91ciBlcHNpbG9uIGlzICcgK1xuXHRcdFx0XHQncHJvYmFibHkgdG9vIHNtYWxsIG9yIHRvbyBsYXJnZScpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChidWlsZExvZylcblx0XHRcdGJ1aWxkTG9nLmNoYWluU3RhcnQoc2VnKTtcblxuXHRcdC8vIHNlYXJjaCBmb3IgdHdvIGNoYWlucyB0aGF0IHRoaXMgc2VnbWVudCBtYXRjaGVzXG5cdFx0dmFyIGZpcnN0X21hdGNoID0ge1xuXHRcdFx0aW5kZXg6IDAsXG5cdFx0XHRtYXRjaGVzX2hlYWQ6IGZhbHNlLFxuXHRcdFx0bWF0Y2hlc19wdDE6IGZhbHNlXG5cdFx0fTtcblx0XHR2YXIgc2Vjb25kX21hdGNoID0ge1xuXHRcdFx0aW5kZXg6IDAsXG5cdFx0XHRtYXRjaGVzX2hlYWQ6IGZhbHNlLFxuXHRcdFx0bWF0Y2hlc19wdDE6IGZhbHNlXG5cdFx0fTtcblx0XHR2YXIgbmV4dF9tYXRjaCA9IGZpcnN0X21hdGNoO1xuXHRcdGZ1bmN0aW9uIHNldE1hdGNoKGluZGV4LCBtYXRjaGVzX2hlYWQsIG1hdGNoZXNfcHQxKXtcblx0XHRcdC8vIHJldHVybiB0cnVlIGlmIHdlJ3ZlIG1hdGNoZWQgdHdpY2Vcblx0XHRcdG5leHRfbWF0Y2guaW5kZXggPSBpbmRleDtcblx0XHRcdG5leHRfbWF0Y2gubWF0Y2hlc19oZWFkID0gbWF0Y2hlc19oZWFkO1xuXHRcdFx0bmV4dF9tYXRjaC5tYXRjaGVzX3B0MSA9IG1hdGNoZXNfcHQxO1xuXHRcdFx0aWYgKG5leHRfbWF0Y2ggPT09IGZpcnN0X21hdGNoKXtcblx0XHRcdFx0bmV4dF9tYXRjaCA9IHNlY29uZF9tYXRjaDtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdFx0bmV4dF9tYXRjaCA9IG51bGw7XG5cdFx0XHRyZXR1cm4gdHJ1ZTsgLy8gd2UndmUgbWF0Y2hlZCB0d2ljZSwgd2UncmUgZG9uZSBoZXJlXG5cdFx0fVxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hhaW5zLmxlbmd0aDsgaSsrKXtcblx0XHRcdHZhciBjaGFpbiA9IGNoYWluc1tpXTtcblx0XHRcdHZhciBoZWFkICA9IGNoYWluWzBdO1xuXHRcdFx0dmFyIGhlYWQyID0gY2hhaW5bMV07XG5cdFx0XHR2YXIgdGFpbCAgPSBjaGFpbltjaGFpbi5sZW5ndGggLSAxXTtcblx0XHRcdHZhciB0YWlsMiA9IGNoYWluW2NoYWluLmxlbmd0aCAtIDJdO1xuXHRcdFx0aWYgKGVwcy5wb2ludHNTYW1lKGhlYWQsIHB0MSkpe1xuXHRcdFx0XHRpZiAoc2V0TWF0Y2goaSwgdHJ1ZSwgdHJ1ZSkpXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChlcHMucG9pbnRzU2FtZShoZWFkLCBwdDIpKXtcblx0XHRcdFx0aWYgKHNldE1hdGNoKGksIHRydWUsIGZhbHNlKSlcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHRcdGVsc2UgaWYgKGVwcy5wb2ludHNTYW1lKHRhaWwsIHB0MSkpe1xuXHRcdFx0XHRpZiAoc2V0TWF0Y2goaSwgZmFsc2UsIHRydWUpKVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdFx0ZWxzZSBpZiAoZXBzLnBvaW50c1NhbWUodGFpbCwgcHQyKSl7XG5cdFx0XHRcdGlmIChzZXRNYXRjaChpLCBmYWxzZSwgZmFsc2UpKVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChuZXh0X21hdGNoID09PSBmaXJzdF9tYXRjaCl7XG5cdFx0XHQvLyB3ZSBkaWRuJ3QgbWF0Y2ggYW55dGhpbmcsIHNvIGNyZWF0ZSBhIG5ldyBjaGFpblxuXHRcdFx0Y2hhaW5zLnB1c2goWyBwdDEsIHB0MiBdKTtcblx0XHRcdGlmIChidWlsZExvZylcblx0XHRcdFx0YnVpbGRMb2cuY2hhaW5OZXcocHQxLCBwdDIpO1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGlmIChuZXh0X21hdGNoID09PSBzZWNvbmRfbWF0Y2gpe1xuXHRcdFx0Ly8gd2UgbWF0Y2hlZCBhIHNpbmdsZSBjaGFpblxuXG5cdFx0XHRpZiAoYnVpbGRMb2cpXG5cdFx0XHRcdGJ1aWxkTG9nLmNoYWluTWF0Y2goZmlyc3RfbWF0Y2guaW5kZXgpO1xuXG5cdFx0XHQvLyBhZGQgdGhlIG90aGVyIHBvaW50IHRvIHRoZSBhcHBvcnByaWF0ZSBlbmQsIGFuZCBjaGVjayB0byBzZWUgaWYgd2UndmUgY2xvc2VkIHRoZVxuXHRcdFx0Ly8gY2hhaW4gaW50byBhIGxvb3BcblxuXHRcdFx0dmFyIGluZGV4ID0gZmlyc3RfbWF0Y2guaW5kZXg7XG5cdFx0XHR2YXIgcHQgPSBmaXJzdF9tYXRjaC5tYXRjaGVzX3B0MSA/IHB0MiA6IHB0MTsgLy8gaWYgd2UgbWF0Y2hlZCBwdDEsIHRoZW4gd2UgYWRkIHB0MiwgZXRjXG5cdFx0XHR2YXIgYWRkVG9IZWFkID0gZmlyc3RfbWF0Y2gubWF0Y2hlc19oZWFkOyAvLyBpZiB3ZSBtYXRjaGVkIGF0IGhlYWQsIHRoZW4gYWRkIHRvIHRoZSBoZWFkXG5cblx0XHRcdHZhciBjaGFpbiA9IGNoYWluc1tpbmRleF07XG5cdFx0XHR2YXIgZ3JvdyAgPSBhZGRUb0hlYWQgPyBjaGFpblswXSA6IGNoYWluW2NoYWluLmxlbmd0aCAtIDFdO1xuXHRcdFx0dmFyIGdyb3cyID0gYWRkVG9IZWFkID8gY2hhaW5bMV0gOiBjaGFpbltjaGFpbi5sZW5ndGggLSAyXTtcblx0XHRcdHZhciBvcHBvICA9IGFkZFRvSGVhZCA/IGNoYWluW2NoYWluLmxlbmd0aCAtIDFdIDogY2hhaW5bMF07XG5cdFx0XHR2YXIgb3BwbzIgPSBhZGRUb0hlYWQgPyBjaGFpbltjaGFpbi5sZW5ndGggLSAyXSA6IGNoYWluWzFdO1xuXG5cdFx0XHRpZiAoZXBzLnBvaW50c0NvbGxpbmVhcihncm93MiwgZ3JvdywgcHQpKXtcblx0XHRcdFx0Ly8gZ3JvdyBpc24ndCBuZWVkZWQgYmVjYXVzZSBpdCdzIGRpcmVjdGx5IGJldHdlZW4gZ3JvdzIgYW5kIHB0OlxuXHRcdFx0XHQvLyBncm93MiAtLS1ncm93LS0tPiBwdFxuXHRcdFx0XHRpZiAoYWRkVG9IZWFkKXtcblx0XHRcdFx0XHRpZiAoYnVpbGRMb2cpXG5cdFx0XHRcdFx0XHRidWlsZExvZy5jaGFpblJlbW92ZUhlYWQoZmlyc3RfbWF0Y2guaW5kZXgsIHB0KTtcblx0XHRcdFx0XHRjaGFpbi5zaGlmdCgpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0aWYgKGJ1aWxkTG9nKVxuXHRcdFx0XHRcdFx0YnVpbGRMb2cuY2hhaW5SZW1vdmVUYWlsKGZpcnN0X21hdGNoLmluZGV4LCBwdCk7XG5cdFx0XHRcdFx0Y2hhaW4ucG9wKCk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Z3JvdyA9IGdyb3cyOyAvLyBvbGQgZ3JvdyBpcyBnb25lLi4uIG5ldyBncm93IGlzIHdoYXQgZ3JvdzIgd2FzXG5cdFx0XHR9XG5cblx0XHRcdGlmIChlcHMucG9pbnRzU2FtZShvcHBvLCBwdCkpe1xuXHRcdFx0XHQvLyB3ZSdyZSBjbG9zaW5nIHRoZSBsb29wLCBzbyByZW1vdmUgY2hhaW4gZnJvbSBjaGFpbnNcblx0XHRcdFx0Y2hhaW5zLnNwbGljZShpbmRleCwgMSk7XG5cblx0XHRcdFx0aWYgKGVwcy5wb2ludHNDb2xsaW5lYXIob3BwbzIsIG9wcG8sIGdyb3cpKXtcblx0XHRcdFx0XHQvLyBvcHBvIGlzbid0IG5lZWRlZCBiZWNhdXNlIGl0J3MgZGlyZWN0bHkgYmV0d2VlbiBvcHBvMiBhbmQgZ3Jvdzpcblx0XHRcdFx0XHQvLyBvcHBvMiAtLS1vcHBvLS0tPmdyb3dcblx0XHRcdFx0XHRpZiAoYWRkVG9IZWFkKXtcblx0XHRcdFx0XHRcdGlmIChidWlsZExvZylcblx0XHRcdFx0XHRcdFx0YnVpbGRMb2cuY2hhaW5SZW1vdmVUYWlsKGZpcnN0X21hdGNoLmluZGV4LCBncm93KTtcblx0XHRcdFx0XHRcdGNoYWluLnBvcCgpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRlbHNle1xuXHRcdFx0XHRcdFx0aWYgKGJ1aWxkTG9nKVxuXHRcdFx0XHRcdFx0XHRidWlsZExvZy5jaGFpblJlbW92ZUhlYWQoZmlyc3RfbWF0Y2guaW5kZXgsIGdyb3cpO1xuXHRcdFx0XHRcdFx0Y2hhaW4uc2hpZnQoKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAoYnVpbGRMb2cpXG5cdFx0XHRcdFx0YnVpbGRMb2cuY2hhaW5DbG9zZShmaXJzdF9tYXRjaC5pbmRleCk7XG5cblx0XHRcdFx0Ly8gd2UgaGF2ZSBhIGNsb3NlZCBjaGFpbiFcblx0XHRcdFx0cmVnaW9ucy5wdXNoKGNoYWluKTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBub3QgY2xvc2luZyBhIGxvb3AsIHNvIGp1c3QgYWRkIGl0IHRvIHRoZSBhcHBvcnByaWF0ZSBzaWRlXG5cdFx0XHRpZiAoYWRkVG9IZWFkKXtcblx0XHRcdFx0aWYgKGJ1aWxkTG9nKVxuXHRcdFx0XHRcdGJ1aWxkTG9nLmNoYWluQWRkSGVhZChmaXJzdF9tYXRjaC5pbmRleCwgcHQpO1xuXHRcdFx0XHRjaGFpbi51bnNoaWZ0KHB0KTtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdGlmIChidWlsZExvZylcblx0XHRcdFx0XHRidWlsZExvZy5jaGFpbkFkZFRhaWwoZmlyc3RfbWF0Y2guaW5kZXgsIHB0KTtcblx0XHRcdFx0Y2hhaW4ucHVzaChwdCk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXG5cdFx0Ly8gb3RoZXJ3aXNlLCB3ZSBtYXRjaGVkIHR3byBjaGFpbnMsIHNvIHdlIG5lZWQgdG8gY29tYmluZSB0aG9zZSBjaGFpbnMgdG9nZXRoZXJcblxuXHRcdGZ1bmN0aW9uIHJldmVyc2VDaGFpbihpbmRleCl7XG5cdFx0XHRpZiAoYnVpbGRMb2cpXG5cdFx0XHRcdGJ1aWxkTG9nLmNoYWluUmV2ZXJzZShpbmRleCk7XG5cdFx0XHRjaGFpbnNbaW5kZXhdLnJldmVyc2UoKTsgLy8gZ2VlLCB0aGF0J3MgZWFzeVxuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGFwcGVuZENoYWluKGluZGV4MSwgaW5kZXgyKXtcblx0XHRcdC8vIGluZGV4MSBnZXRzIGluZGV4MiBhcHBlbmRlZCB0byBpdCwgYW5kIGluZGV4MiBpcyByZW1vdmVkXG5cdFx0XHR2YXIgY2hhaW4xID0gY2hhaW5zW2luZGV4MV07XG5cdFx0XHR2YXIgY2hhaW4yID0gY2hhaW5zW2luZGV4Ml07XG5cdFx0XHR2YXIgdGFpbCAgPSBjaGFpbjFbY2hhaW4xLmxlbmd0aCAtIDFdO1xuXHRcdFx0dmFyIHRhaWwyID0gY2hhaW4xW2NoYWluMS5sZW5ndGggLSAyXTtcblx0XHRcdHZhciBoZWFkICA9IGNoYWluMlswXTtcblx0XHRcdHZhciBoZWFkMiA9IGNoYWluMlsxXTtcblxuXHRcdFx0aWYgKGVwcy5wb2ludHNDb2xsaW5lYXIodGFpbDIsIHRhaWwsIGhlYWQpKXtcblx0XHRcdFx0Ly8gdGFpbCBpc24ndCBuZWVkZWQgYmVjYXVzZSBpdCdzIGRpcmVjdGx5IGJldHdlZW4gdGFpbDIgYW5kIGhlYWRcblx0XHRcdFx0Ly8gdGFpbDIgLS0tdGFpbC0tLT4gaGVhZFxuXHRcdFx0XHRpZiAoYnVpbGRMb2cpXG5cdFx0XHRcdFx0YnVpbGRMb2cuY2hhaW5SZW1vdmVUYWlsKGluZGV4MSwgdGFpbCk7XG5cdFx0XHRcdGNoYWluMS5wb3AoKTtcblx0XHRcdFx0dGFpbCA9IHRhaWwyOyAvLyBvbGQgdGFpbCBpcyBnb25lLi4uIG5ldyB0YWlsIGlzIHdoYXQgdGFpbDIgd2FzXG5cdFx0XHR9XG5cblx0XHRcdGlmIChlcHMucG9pbnRzQ29sbGluZWFyKHRhaWwsIGhlYWQsIGhlYWQyKSl7XG5cdFx0XHRcdC8vIGhlYWQgaXNuJ3QgbmVlZGVkIGJlY2F1c2UgaXQncyBkaXJlY3RseSBiZXR3ZWVuIHRhaWwgYW5kIGhlYWQyXG5cdFx0XHRcdC8vIHRhaWwgLS0taGVhZC0tLT4gaGVhZDJcblx0XHRcdFx0aWYgKGJ1aWxkTG9nKVxuXHRcdFx0XHRcdGJ1aWxkTG9nLmNoYWluUmVtb3ZlSGVhZChpbmRleDIsIGhlYWQpO1xuXHRcdFx0XHRjaGFpbjIuc2hpZnQoKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGJ1aWxkTG9nKVxuXHRcdFx0XHRidWlsZExvZy5jaGFpbkpvaW4oaW5kZXgxLCBpbmRleDIpO1xuXHRcdFx0Y2hhaW5zW2luZGV4MV0gPSBjaGFpbjEuY29uY2F0KGNoYWluMik7XG5cdFx0XHRjaGFpbnMuc3BsaWNlKGluZGV4MiwgMSk7XG5cdFx0fVxuXG5cdFx0dmFyIEYgPSBmaXJzdF9tYXRjaC5pbmRleDtcblx0XHR2YXIgUyA9IHNlY29uZF9tYXRjaC5pbmRleDtcblxuXHRcdGlmIChidWlsZExvZylcblx0XHRcdGJ1aWxkTG9nLmNoYWluQ29ubmVjdChGLCBTKTtcblxuXHRcdHZhciByZXZlcnNlRiA9IGNoYWluc1tGXS5sZW5ndGggPCBjaGFpbnNbU10ubGVuZ3RoOyAvLyByZXZlcnNlIHRoZSBzaG9ydGVyIGNoYWluLCBpZiBuZWVkZWRcblx0XHRpZiAoZmlyc3RfbWF0Y2gubWF0Y2hlc19oZWFkKXtcblx0XHRcdGlmIChzZWNvbmRfbWF0Y2gubWF0Y2hlc19oZWFkKXtcblx0XHRcdFx0aWYgKHJldmVyc2VGKXtcblx0XHRcdFx0XHQvLyA8PDw8IEYgPDw8PCAtLS0gPj4+PiBTID4+Pj5cblx0XHRcdFx0XHRyZXZlcnNlQ2hhaW4oRik7XG5cdFx0XHRcdFx0Ly8gPj4+PiBGID4+Pj4gLS0tID4+Pj4gUyA+Pj4+XG5cdFx0XHRcdFx0YXBwZW5kQ2hhaW4oRiwgUyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0ZWxzZXtcblx0XHRcdFx0XHQvLyA8PDw8IEYgPDw8PCAtLS0gPj4+PiBTID4+Pj5cblx0XHRcdFx0XHRyZXZlcnNlQ2hhaW4oUyk7XG5cdFx0XHRcdFx0Ly8gPDw8PCBGIDw8PDwgLS0tIDw8PDwgUyA8PDw8ICAgbG9naWNhbGx5IHNhbWUgYXM6XG5cdFx0XHRcdFx0Ly8gPj4+PiBTID4+Pj4gLS0tID4+Pj4gRiA+Pj4+XG5cdFx0XHRcdFx0YXBwZW5kQ2hhaW4oUywgRik7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdC8vIDw8PDwgRiA8PDw8IC0tLSA8PDw8IFMgPDw8PCAgIGxvZ2ljYWxseSBzYW1lIGFzOlxuXHRcdFx0XHQvLyA+Pj4+IFMgPj4+PiAtLS0gPj4+PiBGID4+Pj5cblx0XHRcdFx0YXBwZW5kQ2hhaW4oUywgRik7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGVsc2V7XG5cdFx0XHRpZiAoc2Vjb25kX21hdGNoLm1hdGNoZXNfaGVhZCl7XG5cdFx0XHRcdC8vID4+Pj4gRiA+Pj4+IC0tLSA+Pj4+IFMgPj4+PlxuXHRcdFx0XHRhcHBlbmRDaGFpbihGLCBTKTtcblx0XHRcdH1cblx0XHRcdGVsc2V7XG5cdFx0XHRcdGlmIChyZXZlcnNlRil7XG5cdFx0XHRcdFx0Ly8gPj4+PiBGID4+Pj4gLS0tIDw8PDwgUyA8PDw8XG5cdFx0XHRcdFx0cmV2ZXJzZUNoYWluKEYpO1xuXHRcdFx0XHRcdC8vIDw8PDwgRiA8PDw8IC0tLSA8PDw8IFMgPDw8PCAgIGxvZ2ljYWxseSBzYW1lIGFzOlxuXHRcdFx0XHRcdC8vID4+Pj4gUyA+Pj4+IC0tLSA+Pj4+IEYgPj4+PlxuXHRcdFx0XHRcdGFwcGVuZENoYWluKFMsIEYpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGVsc2V7XG5cdFx0XHRcdFx0Ly8gPj4+PiBGID4+Pj4gLS0tIDw8PDwgUyA8PDw8XG5cdFx0XHRcdFx0cmV2ZXJzZUNoYWluKFMpO1xuXHRcdFx0XHRcdC8vID4+Pj4gRiA+Pj4+IC0tLSA+Pj4+IFMgPj4+PlxuXHRcdFx0XHRcdGFwcGVuZENoYWluKEYsIFMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gcmVnaW9ucztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTZWdtZW50Q2hhaW5lcjtcbiIsIi8vIChjKSBDb3B5cmlnaHQgMjAxNiwgU2VhbiBDb25uZWxseSAoQHZvaWRxayksIGh0dHA6Ly9zeW50aGV0aS5jY1xuLy8gTUlUIExpY2Vuc2Vcbi8vIFByb2plY3QgSG9tZTogaHR0cHM6Ly9naXRodWIuY29tL3ZvaWRxay9wb2x5Ym9vbGpzXG5cbi8vXG4vLyBmaWx0ZXIgYSBsaXN0IG9mIHNlZ21lbnRzIGJhc2VkIG9uIGJvb2xlYW4gb3BlcmF0aW9uc1xuLy9cblxuZnVuY3Rpb24gc2VsZWN0KHNlZ21lbnRzLCBzZWxlY3Rpb24sIGJ1aWxkTG9nKXtcblx0dmFyIHJlc3VsdCA9IFtdO1xuXHRzZWdtZW50cy5mb3JFYWNoKGZ1bmN0aW9uKHNlZyl7XG5cdFx0dmFyIGluZGV4ID1cblx0XHRcdChzZWcubXlGaWxsLmFib3ZlID8gOCA6IDApICtcblx0XHRcdChzZWcubXlGaWxsLmJlbG93ID8gNCA6IDApICtcblx0XHRcdCgoc2VnLm90aGVyRmlsbCAmJiBzZWcub3RoZXJGaWxsLmFib3ZlKSA/IDIgOiAwKSArXG5cdFx0XHQoKHNlZy5vdGhlckZpbGwgJiYgc2VnLm90aGVyRmlsbC5iZWxvdykgPyAxIDogMCk7XG5cdFx0aWYgKHNlbGVjdGlvbltpbmRleF0gIT09IDApe1xuXHRcdFx0Ly8gY29weSB0aGUgc2VnbWVudCB0byB0aGUgcmVzdWx0cywgd2hpbGUgYWxzbyBjYWxjdWxhdGluZyB0aGUgZmlsbCBzdGF0dXNcblx0XHRcdHJlc3VsdC5wdXNoKHtcblx0XHRcdFx0aWQ6IGJ1aWxkTG9nID8gYnVpbGRMb2cuc2VnbWVudElkKCkgOiAtMSxcblx0XHRcdFx0c3RhcnQ6IHNlZy5zdGFydCxcblx0XHRcdFx0ZW5kOiBzZWcuZW5kLFxuXHRcdFx0XHRteUZpbGw6IHtcblx0XHRcdFx0XHRhYm92ZTogc2VsZWN0aW9uW2luZGV4XSA9PT0gMSwgLy8gMSBpZiBmaWxsZWQgYWJvdmVcblx0XHRcdFx0XHRiZWxvdzogc2VsZWN0aW9uW2luZGV4XSA9PT0gMiAgLy8gMiBpZiBmaWxsZWQgYmVsb3dcblx0XHRcdFx0fSxcblx0XHRcdFx0b3RoZXJGaWxsOiBudWxsXG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXG5cdGlmIChidWlsZExvZylcblx0XHRidWlsZExvZy5zZWxlY3RlZChyZXN1bHQpO1xuXG5cdHJldHVybiByZXN1bHQ7XG59XG5cbnZhciBTZWdtZW50U2VsZWN0b3IgPSB7XG5cdHVuaW9uOiBmdW5jdGlvbihzZWdtZW50cywgYnVpbGRMb2cpeyAvLyBwcmltYXJ5IHwgc2Vjb25kYXJ5XG5cdFx0Ly8gYWJvdmUxIGJlbG93MSBhYm92ZTIgYmVsb3cyICAgIEtlZXA/ICAgICAgICAgICAgICAgVmFsdWVcblx0XHQvLyAgICAwICAgICAgMCAgICAgIDAgICAgICAwICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHQvLyAgICAwICAgICAgMCAgICAgIDAgICAgICAxICAgPT4gICB5ZXMgZmlsbGVkIGJlbG93ICAgIDJcblx0XHQvLyAgICAwICAgICAgMCAgICAgIDEgICAgICAwICAgPT4gICB5ZXMgZmlsbGVkIGFib3ZlICAgIDFcblx0XHQvLyAgICAwICAgICAgMCAgICAgIDEgICAgICAxICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHQvLyAgICAwICAgICAgMSAgICAgIDAgICAgICAwICAgPT4gICB5ZXMgZmlsbGVkIGJlbG93ICAgIDJcblx0XHQvLyAgICAwICAgICAgMSAgICAgIDAgICAgICAxICAgPT4gICB5ZXMgZmlsbGVkIGJlbG93ICAgIDJcblx0XHQvLyAgICAwICAgICAgMSAgICAgIDEgICAgICAwICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHQvLyAgICAwICAgICAgMSAgICAgIDEgICAgICAxICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHQvLyAgICAxICAgICAgMCAgICAgIDAgICAgICAwICAgPT4gICB5ZXMgZmlsbGVkIGFib3ZlICAgIDFcblx0XHQvLyAgICAxICAgICAgMCAgICAgIDAgICAgICAxICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHQvLyAgICAxICAgICAgMCAgICAgIDEgICAgICAwICAgPT4gICB5ZXMgZmlsbGVkIGFib3ZlICAgIDFcblx0XHQvLyAgICAxICAgICAgMCAgICAgIDEgICAgICAxICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHQvLyAgICAxICAgICAgMSAgICAgIDAgICAgICAwICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHQvLyAgICAxICAgICAgMSAgICAgIDAgICAgICAxICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHQvLyAgICAxICAgICAgMSAgICAgIDEgICAgICAwICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHQvLyAgICAxICAgICAgMSAgICAgIDEgICAgICAxICAgPT4gICBubyAgICAgICAgICAgICAgICAgIDBcblx0XHRyZXR1cm4gc2VsZWN0KHNlZ21lbnRzLCBbXG5cdFx0XHQwLCAyLCAxLCAwLFxuXHRcdFx0MiwgMiwgMCwgMCxcblx0XHRcdDEsIDAsIDEsIDAsXG5cdFx0XHQwLCAwLCAwLCAwXG5cdFx0XSwgYnVpbGRMb2cpO1xuXHR9LFxuXHRpbnRlcnNlY3Q6IGZ1bmN0aW9uKHNlZ21lbnRzLCBidWlsZExvZyl7IC8vIHByaW1hcnkgJiBzZWNvbmRhcnlcblx0XHQvLyBhYm92ZTEgYmVsb3cxIGFib3ZlMiBiZWxvdzIgICAgS2VlcD8gICAgICAgICAgICAgICBWYWx1ZVxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMCAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMSAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMSAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMCAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYmVsb3cgICAgMlxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMSAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMSAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYmVsb3cgICAgMlxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMCAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMSAgICAgIDAgICA9PiAgIHllcyBmaWxsZWQgYWJvdmUgICAgMVxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMSAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYWJvdmUgICAgMVxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMCAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYmVsb3cgICAgMlxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMSAgICAgIDAgICA9PiAgIHllcyBmaWxsZWQgYWJvdmUgICAgMVxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMSAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdHJldHVybiBzZWxlY3Qoc2VnbWVudHMsIFtcblx0XHRcdDAsIDAsIDAsIDAsXG5cdFx0XHQwLCAyLCAwLCAyLFxuXHRcdFx0MCwgMCwgMSwgMSxcblx0XHRcdDAsIDIsIDEsIDBcblx0XHRdLCBidWlsZExvZyk7XG5cdH0sXG5cdGRpZmZlcmVuY2U6IGZ1bmN0aW9uKHNlZ21lbnRzLCBidWlsZExvZyl7IC8vIHByaW1hcnkgLSBzZWNvbmRhcnlcblx0XHQvLyBhYm92ZTEgYmVsb3cxIGFib3ZlMiBiZWxvdzIgICAgS2VlcD8gICAgICAgICAgICAgICBWYWx1ZVxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMCAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMSAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMSAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMCAgICAgIDAgICA9PiAgIHllcyBmaWxsZWQgYmVsb3cgICAgMlxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMCAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMSAgICAgIDAgICA9PiAgIHllcyBmaWxsZWQgYmVsb3cgICAgMlxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMSAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMCAgICAgIDAgICA9PiAgIHllcyBmaWxsZWQgYWJvdmUgICAgMVxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMCAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYWJvdmUgICAgMVxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMSAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMSAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMCAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYWJvdmUgICAgMVxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMSAgICAgIDAgICA9PiAgIHllcyBmaWxsZWQgYmVsb3cgICAgMlxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMSAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdHJldHVybiBzZWxlY3Qoc2VnbWVudHMsIFtcblx0XHRcdDAsIDAsIDAsIDAsXG5cdFx0XHQyLCAwLCAyLCAwLFxuXHRcdFx0MSwgMSwgMCwgMCxcblx0XHRcdDAsIDEsIDIsIDBcblx0XHRdLCBidWlsZExvZyk7XG5cdH0sXG5cdGRpZmZlcmVuY2VSZXY6IGZ1bmN0aW9uKHNlZ21lbnRzLCBidWlsZExvZyl7IC8vIHNlY29uZGFyeSAtIHByaW1hcnlcblx0XHQvLyBhYm92ZTEgYmVsb3cxIGFib3ZlMiBiZWxvdzIgICAgS2VlcD8gICAgICAgICAgICAgICBWYWx1ZVxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMCAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYmVsb3cgICAgMlxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMSAgICAgIDAgICA9PiAgIHllcyBmaWxsZWQgYWJvdmUgICAgMVxuXHRcdC8vICAgIDAgICAgICAwICAgICAgMSAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMCAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMSAgICAgIDAgICA9PiAgIHllcyBmaWxsZWQgYWJvdmUgICAgMVxuXHRcdC8vICAgIDAgICAgICAxICAgICAgMSAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYWJvdmUgICAgMVxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMCAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYmVsb3cgICAgMlxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMSAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAwICAgICAgMSAgICAgIDEgICA9PiAgIHllcyBmaWxsZWQgYmVsb3cgICAgMlxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMCAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMCAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMSAgICAgIDAgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdC8vICAgIDEgICAgICAxICAgICAgMSAgICAgIDEgICA9PiAgIG5vICAgICAgICAgICAgICAgICAgMFxuXHRcdHJldHVybiBzZWxlY3Qoc2VnbWVudHMsIFtcblx0XHRcdDAsIDIsIDEsIDAsXG5cdFx0XHQwLCAwLCAxLCAxLFxuXHRcdFx0MCwgMiwgMCwgMixcblx0XHRcdDAsIDAsIDAsIDBcblx0XHRdLCBidWlsZExvZyk7XG5cdH0sXG5cdHhvcjogZnVuY3Rpb24oc2VnbWVudHMsIGJ1aWxkTG9nKXsgLy8gcHJpbWFyeSBeIHNlY29uZGFyeVxuXHRcdC8vIGFib3ZlMSBiZWxvdzEgYWJvdmUyIGJlbG93MiAgICBLZWVwPyAgICAgICAgICAgICAgIFZhbHVlXG5cdFx0Ly8gICAgMCAgICAgIDAgICAgICAwICAgICAgMCAgID0+ICAgbm8gICAgICAgICAgICAgICAgICAwXG5cdFx0Ly8gICAgMCAgICAgIDAgICAgICAwICAgICAgMSAgID0+ICAgeWVzIGZpbGxlZCBiZWxvdyAgICAyXG5cdFx0Ly8gICAgMCAgICAgIDAgICAgICAxICAgICAgMCAgID0+ICAgeWVzIGZpbGxlZCBhYm92ZSAgICAxXG5cdFx0Ly8gICAgMCAgICAgIDAgICAgICAxICAgICAgMSAgID0+ICAgbm8gICAgICAgICAgICAgICAgICAwXG5cdFx0Ly8gICAgMCAgICAgIDEgICAgICAwICAgICAgMCAgID0+ICAgeWVzIGZpbGxlZCBiZWxvdyAgICAyXG5cdFx0Ly8gICAgMCAgICAgIDEgICAgICAwICAgICAgMSAgID0+ICAgbm8gICAgICAgICAgICAgICAgICAwXG5cdFx0Ly8gICAgMCAgICAgIDEgICAgICAxICAgICAgMCAgID0+ICAgbm8gICAgICAgICAgICAgICAgICAwXG5cdFx0Ly8gICAgMCAgICAgIDEgICAgICAxICAgICAgMSAgID0+ICAgeWVzIGZpbGxlZCBhYm92ZSAgICAxXG5cdFx0Ly8gICAgMSAgICAgIDAgICAgICAwICAgICAgMCAgID0+ICAgeWVzIGZpbGxlZCBhYm92ZSAgICAxXG5cdFx0Ly8gICAgMSAgICAgIDAgICAgICAwICAgICAgMSAgID0+ICAgbm8gICAgICAgICAgICAgICAgICAwXG5cdFx0Ly8gICAgMSAgICAgIDAgICAgICAxICAgICAgMCAgID0+ICAgbm8gICAgICAgICAgICAgICAgICAwXG5cdFx0Ly8gICAgMSAgICAgIDAgICAgICAxICAgICAgMSAgID0+ICAgeWVzIGZpbGxlZCBiZWxvdyAgICAyXG5cdFx0Ly8gICAgMSAgICAgIDEgICAgICAwICAgICAgMCAgID0+ICAgbm8gICAgICAgICAgICAgICAgICAwXG5cdFx0Ly8gICAgMSAgICAgIDEgICAgICAwICAgICAgMSAgID0+ICAgeWVzIGZpbGxlZCBhYm92ZSAgICAxXG5cdFx0Ly8gICAgMSAgICAgIDEgICAgICAxICAgICAgMCAgID0+ICAgeWVzIGZpbGxlZCBiZWxvdyAgICAyXG5cdFx0Ly8gICAgMSAgICAgIDEgICAgICAxICAgICAgMSAgID0+ICAgbm8gICAgICAgICAgICAgICAgICAwXG5cdFx0cmV0dXJuIHNlbGVjdChzZWdtZW50cywgW1xuXHRcdFx0MCwgMiwgMSwgMCxcblx0XHRcdDIsIDAsIDAsIDEsXG5cdFx0XHQxLCAwLCAwLCAyLFxuXHRcdFx0MCwgMSwgMiwgMFxuXHRcdF0sIGJ1aWxkTG9nKTtcblx0fVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSBTZWdtZW50U2VsZWN0b3I7XG4iXSwic291cmNlUm9vdCI6IiJ9