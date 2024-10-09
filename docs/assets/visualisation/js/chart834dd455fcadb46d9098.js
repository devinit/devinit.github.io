(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_plots_cartesian_axis_defaults_js"],{

/***/ "./node_modules/plotly.js/src/plots/cartesian/axis_defaults.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/axis_defaults.js ***!
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



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

var handleArrayContainerDefaults = __webpack_require__(/*! ../array_container_defaults */ "./node_modules/plotly.js/src/plots/array_container_defaults.js");

var layoutAttributes = __webpack_require__(/*! ./layout_attributes */ "./node_modules/plotly.js/src/plots/cartesian/layout_attributes.js");
var handleTickValueDefaults = __webpack_require__(/*! ./tick_value_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_value_defaults.js");
var handleTickMarkDefaults = __webpack_require__(/*! ./tick_mark_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_mark_defaults.js");
var handleTickLabelDefaults = __webpack_require__(/*! ./tick_label_defaults */ "./node_modules/plotly.js/src/plots/cartesian/tick_label_defaults.js");
var handleCategoryOrderDefaults = __webpack_require__(/*! ./category_order_defaults */ "./node_modules/plotly.js/src/plots/cartesian/category_order_defaults.js");
var handleLineGridDefaults = __webpack_require__(/*! ./line_grid_defaults */ "./node_modules/plotly.js/src/plots/cartesian/line_grid_defaults.js");
var setConvert = __webpack_require__(/*! ./set_convert */ "./node_modules/plotly.js/src/plots/cartesian/set_convert.js");

var DAY_OF_WEEK = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js").WEEKDAY_PATTERN;
var HOUR = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js").HOUR_PATTERN;

/**
 * options: object containing:
 *
 *  letter: 'x' or 'y'
 *  title: name of the axis (ie 'Colorbar') to go in default title
 *  font: the default font to inherit
 *  outerTicks: boolean, should ticks default to outside?
 *  showGrid: boolean, should gridlines be shown by default?
 *  noHover: boolean, this axis doesn't support hover effects?
 *  noTickson: boolean, this axis doesn't support 'tickson'
 *  data: the plot data, used to manage categories
 *  bgColor: the plot background color, to calculate default gridline colors
 *  calendar:
 *  splomStash:
 *  visibleDflt: boolean
 *  reverseDflt: boolean
 *  automargin: boolean
 */
module.exports = function handleAxisDefaults(containerIn, containerOut, coerce, options, layoutOut) {
    var letter = options.letter;
    var font = options.font || {};
    var splomStash = options.splomStash || {};

    var visible = coerce('visible', !options.visibleDflt);

    var axTemplate = containerOut._template || {};
    var axType = containerOut.type || axTemplate.type || '-';

    if(axType === 'date') {
        var handleCalendarDefaults = Registry.getComponentMethod('calendars', 'handleDefaults');
        handleCalendarDefaults(containerIn, containerOut, 'calendar', options.calendar);
    }

    setConvert(containerOut, layoutOut);

    var autorangeDflt = !containerOut.isValidRange(containerIn.range);
    if(autorangeDflt && options.reverseDflt) autorangeDflt = 'reversed';
    var autoRange = coerce('autorange', autorangeDflt);
    if(autoRange && (axType === 'linear' || axType === '-')) coerce('rangemode');

    coerce('range');
    containerOut.cleanRange();

    handleCategoryOrderDefaults(containerIn, containerOut, coerce, options);

    if(axType !== 'category' && !options.noHover) coerce('hoverformat');

    var dfltColor = coerce('color');
    // if axis.color was provided, use it for fonts too; otherwise,
    // inherit from global font color in case that was provided.
    // Compare to dflt rather than to containerIn, so we can provide color via
    // template too.
    var dfltFontColor = (dfltColor !== layoutAttributes.color.dflt) ? dfltColor : font.color;
    // try to get default title from splom trace, fallback to graph-wide value
    var dfltTitle = splomStash.label || layoutOut._dfltTitle[letter];

    handleTickLabelDefaults(containerIn, containerOut, coerce, axType, options, {pass: 1});
    if(!visible) return containerOut;

    coerce('title.text', dfltTitle);
    Lib.coerceFont(coerce, 'title.font', {
        family: font.family,
        size: Math.round(font.size * 1.2),
        color: dfltFontColor
    });

    handleTickValueDefaults(containerIn, containerOut, coerce, axType);
    handleTickLabelDefaults(containerIn, containerOut, coerce, axType, options, {pass: 2});
    handleTickMarkDefaults(containerIn, containerOut, coerce, options);
    handleLineGridDefaults(containerIn, containerOut, coerce, {
        dfltColor: dfltColor,
        bgColor: options.bgColor,
        showGrid: options.showGrid,
        attributes: layoutAttributes
    });

    if(containerOut.showline || containerOut.ticks) coerce('mirror');

    if(options.automargin) coerce('automargin');

    var isMultiCategory = axType === 'multicategory';

    if(!options.noTickson &&
        (axType === 'category' || isMultiCategory) &&
        (containerOut.ticks || containerOut.showgrid)
    ) {
        var ticksonDflt;
        if(isMultiCategory) ticksonDflt = 'boundaries';
        coerce('tickson', ticksonDflt);
    }

    if(isMultiCategory) {
        var showDividers = coerce('showdividers');
        if(showDividers) {
            coerce('dividercolor');
            coerce('dividerwidth');
        }
    }

    if(axType === 'date') {
        handleArrayContainerDefaults(containerIn, containerOut, {
            name: 'rangebreaks',
            inclusionAttr: 'enabled',
            handleItemDefaults: rangebreaksDefaults
        });

        if(!containerOut.rangebreaks.length) {
            delete containerOut.rangebreaks;
        } else {
            for(var k = 0; k < containerOut.rangebreaks.length; k++) {
                if(containerOut.rangebreaks[k].pattern === DAY_OF_WEEK) {
                    containerOut._hasDayOfWeekBreaks = true;
                    break;
                }
            }

            setConvert(containerOut, layoutOut);

            if(layoutOut._has('scattergl') || layoutOut._has('splom')) {
                for(var i = 0; i < options.data.length; i++) {
                    var trace = options.data[i];
                    if(trace.type === 'scattergl' || trace.type === 'splom') {
                        trace.visible = false;
                        Lib.warn(trace.type +
                            ' traces do not work on axes with rangebreaks.' +
                            ' Setting trace ' + trace.index + ' to `visible: false`.');
                    }
                }
            }
        }
    }

    return containerOut;
};

function rangebreaksDefaults(itemIn, itemOut, containerOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(itemIn, itemOut, layoutAttributes.rangebreaks, attr, dflt);
    }

    var enabled = coerce('enabled');

    if(enabled) {
        var bnds = coerce('bounds');
        if(bnds && bnds.length >= 2) {
            var dfltPattern = '';
            var i, q;
            if(bnds.length === 2) {
                for(i = 0; i < 2; i++) {
                    q = indexOfDay(bnds[i]);
                    if(q) {
                        dfltPattern = DAY_OF_WEEK;
                        break;
                    }
                }
            }
            var pattern = coerce('pattern', dfltPattern);
            if(pattern === DAY_OF_WEEK) {
                for(i = 0; i < 2; i++) {
                    q = indexOfDay(bnds[i]);
                    if(q) {
                        // convert to integers i.e 'Sunday' --> 0
                        itemOut.bounds[i] = bnds[i] = q - 1;
                    }
                }
            }
            if(pattern) {
                // ensure types and ranges
                for(i = 0; i < 2; i++) {
                    q = bnds[i];
                    switch(pattern) {
                        case DAY_OF_WEEK :
                            if(!isNumeric(q)) {
                                itemOut.enabled = false;
                                return;
                            }
                            q = +q;

                            if(
                                q !== Math.floor(q) || // don't accept fractional days for mow
                                q < 0 || q >= 7
                            ) {
                                itemOut.enabled = false;
                                return;
                            }
                            // use number
                            itemOut.bounds[i] = bnds[i] = q;
                            break;

                        case HOUR :
                            if(!isNumeric(q)) {
                                itemOut.enabled = false;
                                return;
                            }
                            q = +q;

                            if(q < 0 || q > 24) { // accept 24
                                itemOut.enabled = false;
                                return;
                            }
                            // use number
                            itemOut.bounds[i] = bnds[i] = q;
                            break;
                    }
                }
            }

            if(containerOut.autorange === false) {
                var rng = containerOut.range;

                // if bounds are bigger than the (set) range, disable break
                if(rng[0] < rng[1]) {
                    if(bnds[0] < rng[0] && bnds[1] > rng[1]) {
                        itemOut.enabled = false;
                        return;
                    }
                } else if(bnds[0] > rng[0] && bnds[1] < rng[1]) {
                    itemOut.enabled = false;
                    return;
                }
            }
        } else {
            var values = coerce('values');

            if(values && values.length) {
                coerce('dvalue');
            } else {
                itemOut.enabled = false;
                return;
            }
        }
    }
}

// these numbers are one more than what bounds would be mapped to
var dayStrToNum = {
    sun: 1,
    mon: 2,
    tue: 3,
    wed: 4,
    thu: 5,
    fri: 6,
    sat: 7
};

function indexOfDay(v) {
    if(typeof v !== 'string') return;
    return dayStrToNum[
        v.substr(0, 3).toLowerCase()
    ];
}


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/category_order_defaults.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/category_order_defaults.js ***!
  \*******************************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



function findCategories(ax, opts) {
    var dataAttr = opts.dataAttr || ax._id.charAt(0);
    var lookup = {};
    var axData;
    var i, j;

    if(opts.axData) {
        // non-x/y case
        axData = opts.axData;
    } else {
        // x/y case
        axData = [];
        for(i = 0; i < opts.data.length; i++) {
            var trace = opts.data[i];
            if(trace[dataAttr + 'axis'] === ax._id) {
                axData.push(trace);
            }
        }
    }

    for(i = 0; i < axData.length; i++) {
        var vals = axData[i][dataAttr];
        for(j = 0; j < vals.length; j++) {
            var v = vals[j];
            if(v !== null && v !== undefined) {
                lookup[v] = 1;
            }
        }
    }

    return Object.keys(lookup);
}

/**
 * Fills in category* default and initial categories.
 *
 * @param {object} containerIn : input axis object
 * @param {object} containerOut : full axis object
 * @param {function} coerce : Lib.coerce fn wrapper
 * @param {object} opts :
 *   - data {array} : (full) data trace
 * OR
 *   - axData {array} : (full) data associated with axis being coerced here
 *   - dataAttr {string} : attribute name corresponding to coordinate array
 */
module.exports = function handleCategoryOrderDefaults(containerIn, containerOut, coerce, opts) {
    if(containerOut.type !== 'category') return;

    var arrayIn = containerIn.categoryarray;
    var isValidArray = (Array.isArray(arrayIn) && arrayIn.length > 0);

    // override default 'categoryorder' value when non-empty array is supplied
    var orderDefault;
    if(isValidArray) orderDefault = 'array';

    var order = coerce('categoryorder', orderDefault);
    var array;

    // coerce 'categoryarray' only in array order case
    if(order === 'array') {
        array = coerce('categoryarray');
    }

    // cannot set 'categoryorder' to 'array' with an invalid 'categoryarray'
    if(!isValidArray && order === 'array') {
        order = containerOut.categoryorder = 'trace';
    }

    // set up things for makeCalcdata
    if(order === 'trace') {
        containerOut._initialCategories = [];
    } else if(order === 'array') {
        containerOut._initialCategories = array.slice();
    } else {
        array = findCategories(containerOut, opts).sort();
        if(order === 'category ascending') {
            containerOut._initialCategories = array;
        } else if(order === 'category descending') {
            containerOut._initialCategories = array.reverse();
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/cartesian/line_grid_defaults.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/cartesian/line_grid_defaults.js ***!
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



var colorMix = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js").mix;
var lightFraction = __webpack_require__(/*! ../../components/color/attributes */ "./node_modules/plotly.js/src/components/color/attributes.js").lightFraction;
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

/**
 * @param {object} opts :
 *   - dfltColor {string} : default axis color
 *   - bgColor {string} : combined subplot bg color
 *   - blend {number, optional} : blend percentage (to compute dflt grid color)
 *   - showLine {boolean} : show line by default
 *   - showGrid {boolean} : show grid by default
 *   - noZeroLine {boolean} : don't coerce zeroline* attributes
 *   - attributes {object} : attribute object associated with input containers
 */
module.exports = function handleLineGridDefaults(containerIn, containerOut, coerce, opts) {
    opts = opts || {};

    var dfltColor = opts.dfltColor;

    function coerce2(attr, dflt) {
        return Lib.coerce2(containerIn, containerOut, opts.attributes, attr, dflt);
    }

    var lineColor = coerce2('linecolor', dfltColor);
    var lineWidth = coerce2('linewidth');
    var showLine = coerce('showline', opts.showLine || !!lineColor || !!lineWidth);

    if(!showLine) {
        delete containerOut.linecolor;
        delete containerOut.linewidth;
    }

    var gridColorDflt = colorMix(dfltColor, opts.bgColor, opts.blend || lightFraction).toRgbString();
    var gridColor = coerce2('gridcolor', gridColorDflt);
    var gridWidth = coerce2('gridwidth');
    var showGridLines = coerce('showgrid', opts.showGrid || !!gridColor || !!gridWidth);

    if(!showGridLines) {
        delete containerOut.gridcolor;
        delete containerOut.gridwidth;
    }

    if(!opts.noZeroLine) {
        var zeroLineColor = coerce2('zerolinecolor', dfltColor);
        var zeroLineWidth = coerce2('zerolinewidth');
        var showZeroLine = coerce('zeroline', opts.showGrid || !!zeroLineColor || !!zeroLineWidth);

        if(!showZeroLine) {
            delete containerOut.zerolinecolor;
            delete containerOut.zerolinewidth;
        }
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL2F4aXNfZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL2NhcnRlc2lhbi9jYXRlZ29yeV9vcmRlcl9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvY2FydGVzaWFuL2xpbmVfZ3JpZF9kZWZhdWx0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyw4REFBZ0I7O0FBRXhDLGVBQWUsbUJBQU8sQ0FBQyxnRUFBZ0I7QUFDdkMsVUFBVSxtQkFBTyxDQUFDLDREQUFXOztBQUU3QixtQ0FBbUMsbUJBQU8sQ0FBQyxtR0FBNkI7O0FBRXhFLHVCQUF1QixtQkFBTyxDQUFDLDhGQUFxQjtBQUNwRCw4QkFBOEIsbUJBQU8sQ0FBQyxrR0FBdUI7QUFDN0QsNkJBQTZCLG1CQUFPLENBQUMsZ0dBQXNCO0FBQzNELDhCQUE4QixtQkFBTyxDQUFDLGtHQUF1QjtBQUM3RCxrQ0FBa0MsbUJBQU8sQ0FBQywwR0FBMkI7QUFDckUsNkJBQTZCLG1CQUFPLENBQUMsZ0dBQXNCO0FBQzNELGlCQUFpQixtQkFBTyxDQUFDLGtGQUFlOztBQUV4QyxrQkFBa0IsbUhBQXNDO0FBQ3hELFdBQVcsZ0hBQW1DOztBQUU5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVB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QUFXOztBQUU3QjtBQUNBLFdBQVcsT0FBTztBQUNsQixrQkFBa0IsT0FBTztBQUN6QixnQkFBZ0IsT0FBTztBQUN2QixjQUFjLGlCQUFpQjtBQUMvQixpQkFBaUIsUUFBUTtBQUN6QixpQkFBaUIsUUFBUTtBQUN6QixtQkFBbUIsUUFBUTtBQUMzQixtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQ4MzRkZDQ1NWZjYWRiNDZkOTA5OC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uLy4uL3JlZ2lzdHJ5Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbnZhciBoYW5kbGVBcnJheUNvbnRhaW5lckRlZmF1bHRzID0gcmVxdWlyZSgnLi4vYXJyYXlfY29udGFpbmVyX2RlZmF1bHRzJyk7XG5cbnZhciBsYXlvdXRBdHRyaWJ1dGVzID0gcmVxdWlyZSgnLi9sYXlvdXRfYXR0cmlidXRlcycpO1xudmFyIGhhbmRsZVRpY2tWYWx1ZURlZmF1bHRzID0gcmVxdWlyZSgnLi90aWNrX3ZhbHVlX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlVGlja01hcmtEZWZhdWx0cyA9IHJlcXVpcmUoJy4vdGlja19tYXJrX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlVGlja0xhYmVsRGVmYXVsdHMgPSByZXF1aXJlKCcuL3RpY2tfbGFiZWxfZGVmYXVsdHMnKTtcbnZhciBoYW5kbGVDYXRlZ29yeU9yZGVyRGVmYXVsdHMgPSByZXF1aXJlKCcuL2NhdGVnb3J5X29yZGVyX2RlZmF1bHRzJyk7XG52YXIgaGFuZGxlTGluZUdyaWREZWZhdWx0cyA9IHJlcXVpcmUoJy4vbGluZV9ncmlkX2RlZmF1bHRzJyk7XG52YXIgc2V0Q29udmVydCA9IHJlcXVpcmUoJy4vc2V0X2NvbnZlcnQnKTtcblxudmFyIERBWV9PRl9XRUVLID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKS5XRUVLREFZX1BBVFRFUk47XG52YXIgSE9VUiA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJykuSE9VUl9QQVRURVJOO1xuXG4vKipcbiAqIG9wdGlvbnM6IG9iamVjdCBjb250YWluaW5nOlxuICpcbiAqICBsZXR0ZXI6ICd4JyBvciAneSdcbiAqICB0aXRsZTogbmFtZSBvZiB0aGUgYXhpcyAoaWUgJ0NvbG9yYmFyJykgdG8gZ28gaW4gZGVmYXVsdCB0aXRsZVxuICogIGZvbnQ6IHRoZSBkZWZhdWx0IGZvbnQgdG8gaW5oZXJpdFxuICogIG91dGVyVGlja3M6IGJvb2xlYW4sIHNob3VsZCB0aWNrcyBkZWZhdWx0IHRvIG91dHNpZGU/XG4gKiAgc2hvd0dyaWQ6IGJvb2xlYW4sIHNob3VsZCBncmlkbGluZXMgYmUgc2hvd24gYnkgZGVmYXVsdD9cbiAqICBub0hvdmVyOiBib29sZWFuLCB0aGlzIGF4aXMgZG9lc24ndCBzdXBwb3J0IGhvdmVyIGVmZmVjdHM/XG4gKiAgbm9UaWNrc29uOiBib29sZWFuLCB0aGlzIGF4aXMgZG9lc24ndCBzdXBwb3J0ICd0aWNrc29uJ1xuICogIGRhdGE6IHRoZSBwbG90IGRhdGEsIHVzZWQgdG8gbWFuYWdlIGNhdGVnb3JpZXNcbiAqICBiZ0NvbG9yOiB0aGUgcGxvdCBiYWNrZ3JvdW5kIGNvbG9yLCB0byBjYWxjdWxhdGUgZGVmYXVsdCBncmlkbGluZSBjb2xvcnNcbiAqICBjYWxlbmRhcjpcbiAqICBzcGxvbVN0YXNoOlxuICogIHZpc2libGVEZmx0OiBib29sZWFuXG4gKiAgcmV2ZXJzZURmbHQ6IGJvb2xlYW5cbiAqICBhdXRvbWFyZ2luOiBib29sZWFuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlQXhpc0RlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGNvZXJjZSwgb3B0aW9ucywgbGF5b3V0T3V0KSB7XG4gICAgdmFyIGxldHRlciA9IG9wdGlvbnMubGV0dGVyO1xuICAgIHZhciBmb250ID0gb3B0aW9ucy5mb250IHx8IHt9O1xuICAgIHZhciBzcGxvbVN0YXNoID0gb3B0aW9ucy5zcGxvbVN0YXNoIHx8IHt9O1xuXG4gICAgdmFyIHZpc2libGUgPSBjb2VyY2UoJ3Zpc2libGUnLCAhb3B0aW9ucy52aXNpYmxlRGZsdCk7XG5cbiAgICB2YXIgYXhUZW1wbGF0ZSA9IGNvbnRhaW5lck91dC5fdGVtcGxhdGUgfHwge307XG4gICAgdmFyIGF4VHlwZSA9IGNvbnRhaW5lck91dC50eXBlIHx8IGF4VGVtcGxhdGUudHlwZSB8fCAnLSc7XG5cbiAgICBpZihheFR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICB2YXIgaGFuZGxlQ2FsZW5kYXJEZWZhdWx0cyA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgnY2FsZW5kYXJzJywgJ2hhbmRsZURlZmF1bHRzJyk7XG4gICAgICAgIGhhbmRsZUNhbGVuZGFyRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgJ2NhbGVuZGFyJywgb3B0aW9ucy5jYWxlbmRhcik7XG4gICAgfVxuXG4gICAgc2V0Q29udmVydChjb250YWluZXJPdXQsIGxheW91dE91dCk7XG5cbiAgICB2YXIgYXV0b3JhbmdlRGZsdCA9ICFjb250YWluZXJPdXQuaXNWYWxpZFJhbmdlKGNvbnRhaW5lckluLnJhbmdlKTtcbiAgICBpZihhdXRvcmFuZ2VEZmx0ICYmIG9wdGlvbnMucmV2ZXJzZURmbHQpIGF1dG9yYW5nZURmbHQgPSAncmV2ZXJzZWQnO1xuICAgIHZhciBhdXRvUmFuZ2UgPSBjb2VyY2UoJ2F1dG9yYW5nZScsIGF1dG9yYW5nZURmbHQpO1xuICAgIGlmKGF1dG9SYW5nZSAmJiAoYXhUeXBlID09PSAnbGluZWFyJyB8fCBheFR5cGUgPT09ICctJykpIGNvZXJjZSgncmFuZ2Vtb2RlJyk7XG5cbiAgICBjb2VyY2UoJ3JhbmdlJyk7XG4gICAgY29udGFpbmVyT3V0LmNsZWFuUmFuZ2UoKTtcblxuICAgIGhhbmRsZUNhdGVnb3J5T3JkZXJEZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBjb2VyY2UsIG9wdGlvbnMpO1xuXG4gICAgaWYoYXhUeXBlICE9PSAnY2F0ZWdvcnknICYmICFvcHRpb25zLm5vSG92ZXIpIGNvZXJjZSgnaG92ZXJmb3JtYXQnKTtcblxuICAgIHZhciBkZmx0Q29sb3IgPSBjb2VyY2UoJ2NvbG9yJyk7XG4gICAgLy8gaWYgYXhpcy5jb2xvciB3YXMgcHJvdmlkZWQsIHVzZSBpdCBmb3IgZm9udHMgdG9vOyBvdGhlcndpc2UsXG4gICAgLy8gaW5oZXJpdCBmcm9tIGdsb2JhbCBmb250IGNvbG9yIGluIGNhc2UgdGhhdCB3YXMgcHJvdmlkZWQuXG4gICAgLy8gQ29tcGFyZSB0byBkZmx0IHJhdGhlciB0aGFuIHRvIGNvbnRhaW5lckluLCBzbyB3ZSBjYW4gcHJvdmlkZSBjb2xvciB2aWFcbiAgICAvLyB0ZW1wbGF0ZSB0b28uXG4gICAgdmFyIGRmbHRGb250Q29sb3IgPSAoZGZsdENvbG9yICE9PSBsYXlvdXRBdHRyaWJ1dGVzLmNvbG9yLmRmbHQpID8gZGZsdENvbG9yIDogZm9udC5jb2xvcjtcbiAgICAvLyB0cnkgdG8gZ2V0IGRlZmF1bHQgdGl0bGUgZnJvbSBzcGxvbSB0cmFjZSwgZmFsbGJhY2sgdG8gZ3JhcGgtd2lkZSB2YWx1ZVxuICAgIHZhciBkZmx0VGl0bGUgPSBzcGxvbVN0YXNoLmxhYmVsIHx8IGxheW91dE91dC5fZGZsdFRpdGxlW2xldHRlcl07XG5cbiAgICBoYW5kbGVUaWNrTGFiZWxEZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBjb2VyY2UsIGF4VHlwZSwgb3B0aW9ucywge3Bhc3M6IDF9KTtcbiAgICBpZighdmlzaWJsZSkgcmV0dXJuIGNvbnRhaW5lck91dDtcblxuICAgIGNvZXJjZSgndGl0bGUudGV4dCcsIGRmbHRUaXRsZSk7XG4gICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAndGl0bGUuZm9udCcsIHtcbiAgICAgICAgZmFtaWx5OiBmb250LmZhbWlseSxcbiAgICAgICAgc2l6ZTogTWF0aC5yb3VuZChmb250LnNpemUgKiAxLjIpLFxuICAgICAgICBjb2xvcjogZGZsdEZvbnRDb2xvclxuICAgIH0pO1xuXG4gICAgaGFuZGxlVGlja1ZhbHVlRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCBheFR5cGUpO1xuICAgIGhhbmRsZVRpY2tMYWJlbERlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGNvZXJjZSwgYXhUeXBlLCBvcHRpb25zLCB7cGFzczogMn0pO1xuICAgIGhhbmRsZVRpY2tNYXJrRGVmYXVsdHMoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgY29lcmNlLCBvcHRpb25zKTtcbiAgICBoYW5kbGVMaW5lR3JpZERlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIGNvZXJjZSwge1xuICAgICAgICBkZmx0Q29sb3I6IGRmbHRDb2xvcixcbiAgICAgICAgYmdDb2xvcjogb3B0aW9ucy5iZ0NvbG9yLFxuICAgICAgICBzaG93R3JpZDogb3B0aW9ucy5zaG93R3JpZCxcbiAgICAgICAgYXR0cmlidXRlczogbGF5b3V0QXR0cmlidXRlc1xuICAgIH0pO1xuXG4gICAgaWYoY29udGFpbmVyT3V0LnNob3dsaW5lIHx8IGNvbnRhaW5lck91dC50aWNrcykgY29lcmNlKCdtaXJyb3InKTtcblxuICAgIGlmKG9wdGlvbnMuYXV0b21hcmdpbikgY29lcmNlKCdhdXRvbWFyZ2luJyk7XG5cbiAgICB2YXIgaXNNdWx0aUNhdGVnb3J5ID0gYXhUeXBlID09PSAnbXVsdGljYXRlZ29yeSc7XG5cbiAgICBpZighb3B0aW9ucy5ub1RpY2tzb24gJiZcbiAgICAgICAgKGF4VHlwZSA9PT0gJ2NhdGVnb3J5JyB8fCBpc011bHRpQ2F0ZWdvcnkpICYmXG4gICAgICAgIChjb250YWluZXJPdXQudGlja3MgfHwgY29udGFpbmVyT3V0LnNob3dncmlkKVxuICAgICkge1xuICAgICAgICB2YXIgdGlja3NvbkRmbHQ7XG4gICAgICAgIGlmKGlzTXVsdGlDYXRlZ29yeSkgdGlja3NvbkRmbHQgPSAnYm91bmRhcmllcyc7XG4gICAgICAgIGNvZXJjZSgndGlja3NvbicsIHRpY2tzb25EZmx0KTtcbiAgICB9XG5cbiAgICBpZihpc011bHRpQ2F0ZWdvcnkpIHtcbiAgICAgICAgdmFyIHNob3dEaXZpZGVycyA9IGNvZXJjZSgnc2hvd2RpdmlkZXJzJyk7XG4gICAgICAgIGlmKHNob3dEaXZpZGVycykge1xuICAgICAgICAgICAgY29lcmNlKCdkaXZpZGVyY29sb3InKTtcbiAgICAgICAgICAgIGNvZXJjZSgnZGl2aWRlcndpZHRoJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihheFR5cGUgPT09ICdkYXRlJykge1xuICAgICAgICBoYW5kbGVBcnJheUNvbnRhaW5lckRlZmF1bHRzKGNvbnRhaW5lckluLCBjb250YWluZXJPdXQsIHtcbiAgICAgICAgICAgIG5hbWU6ICdyYW5nZWJyZWFrcycsXG4gICAgICAgICAgICBpbmNsdXNpb25BdHRyOiAnZW5hYmxlZCcsXG4gICAgICAgICAgICBoYW5kbGVJdGVtRGVmYXVsdHM6IHJhbmdlYnJlYWtzRGVmYXVsdHNcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYoIWNvbnRhaW5lck91dC5yYW5nZWJyZWFrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQucmFuZ2VicmVha3M7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IodmFyIGsgPSAwOyBrIDwgY29udGFpbmVyT3V0LnJhbmdlYnJlYWtzLmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICAgICAgaWYoY29udGFpbmVyT3V0LnJhbmdlYnJlYWtzW2tdLnBhdHRlcm4gPT09IERBWV9PRl9XRUVLKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lck91dC5faGFzRGF5T2ZXZWVrQnJlYWtzID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBzZXRDb252ZXJ0KGNvbnRhaW5lck91dCwgbGF5b3V0T3V0KTtcblxuICAgICAgICAgICAgaWYobGF5b3V0T3V0Ll9oYXMoJ3NjYXR0ZXJnbCcpIHx8IGxheW91dE91dC5faGFzKCdzcGxvbScpKSB7XG4gICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG9wdGlvbnMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdHJhY2UgPSBvcHRpb25zLmRhdGFbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmKHRyYWNlLnR5cGUgPT09ICdzY2F0dGVyZ2wnIHx8IHRyYWNlLnR5cGUgPT09ICdzcGxvbScpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYWNlLnZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIExpYi53YXJuKHRyYWNlLnR5cGUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICcgdHJhY2VzIGRvIG5vdCB3b3JrIG9uIGF4ZXMgd2l0aCByYW5nZWJyZWFrcy4nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAnIFNldHRpbmcgdHJhY2UgJyArIHRyYWNlLmluZGV4ICsgJyB0byBgdmlzaWJsZTogZmFsc2VgLicpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbnRhaW5lck91dDtcbn07XG5cbmZ1bmN0aW9uIHJhbmdlYnJlYWtzRGVmYXVsdHMoaXRlbUluLCBpdGVtT3V0LCBjb250YWluZXJPdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZShpdGVtSW4sIGl0ZW1PdXQsIGxheW91dEF0dHJpYnV0ZXMucmFuZ2VicmVha3MsIGF0dHIsIGRmbHQpO1xuICAgIH1cblxuICAgIHZhciBlbmFibGVkID0gY29lcmNlKCdlbmFibGVkJyk7XG5cbiAgICBpZihlbmFibGVkKSB7XG4gICAgICAgIHZhciBibmRzID0gY29lcmNlKCdib3VuZHMnKTtcbiAgICAgICAgaWYoYm5kcyAmJiBibmRzLmxlbmd0aCA+PSAyKSB7XG4gICAgICAgICAgICB2YXIgZGZsdFBhdHRlcm4gPSAnJztcbiAgICAgICAgICAgIHZhciBpLCBxO1xuICAgICAgICAgICAgaWYoYm5kcy5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcSA9IGluZGV4T2ZEYXkoYm5kc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRmbHRQYXR0ZXJuID0gREFZX09GX1dFRUs7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwYXR0ZXJuID0gY29lcmNlKCdwYXR0ZXJuJywgZGZsdFBhdHRlcm4pO1xuICAgICAgICAgICAgaWYocGF0dGVybiA9PT0gREFZX09GX1dFRUspIHtcbiAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcSA9IGluZGV4T2ZEYXkoYm5kc1tpXSk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnZlcnQgdG8gaW50ZWdlcnMgaS5lICdTdW5kYXknIC0tPiAwXG4gICAgICAgICAgICAgICAgICAgICAgICBpdGVtT3V0LmJvdW5kc1tpXSA9IGJuZHNbaV0gPSBxIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKHBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICAvLyBlbnN1cmUgdHlwZXMgYW5kIHJhbmdlc1xuICAgICAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IDI7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBxID0gYm5kc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoKHBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgREFZX09GX1dFRUsgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFpc051bWVyaWMocSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU91dC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcSA9ICtxO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHEgIT09IE1hdGguZmxvb3IocSkgfHwgLy8gZG9uJ3QgYWNjZXB0IGZyYWN0aW9uYWwgZGF5cyBmb3IgbW93XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHEgPCAwIHx8IHEgPj0gN1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtT3V0LmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyB1c2UgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU91dC5ib3VuZHNbaV0gPSBibmRzW2ldID0gcTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBIT1VSIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighaXNOdW1lcmljKHEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1PdXQuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHEgPSArcTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKHEgPCAwIHx8IHEgPiAyNCkgeyAvLyBhY2NlcHQgMjRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU91dC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gdXNlIG51bWJlclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW1PdXQuYm91bmRzW2ldID0gYm5kc1tpXSA9IHE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGNvbnRhaW5lck91dC5hdXRvcmFuZ2UgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJuZyA9IGNvbnRhaW5lck91dC5yYW5nZTtcblxuICAgICAgICAgICAgICAgIC8vIGlmIGJvdW5kcyBhcmUgYmlnZ2VyIHRoYW4gdGhlIChzZXQpIHJhbmdlLCBkaXNhYmxlIGJyZWFrXG4gICAgICAgICAgICAgICAgaWYocm5nWzBdIDwgcm5nWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKGJuZHNbMF0gPCBybmdbMF0gJiYgYm5kc1sxXSA+IHJuZ1sxXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaXRlbU91dC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoYm5kc1swXSA+IHJuZ1swXSAmJiBibmRzWzFdIDwgcm5nWzFdKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW1PdXQuZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHZhbHVlcyA9IGNvZXJjZSgndmFsdWVzJyk7XG5cbiAgICAgICAgICAgIGlmKHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgY29lcmNlKCdkdmFsdWUnKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaXRlbU91dC5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vLyB0aGVzZSBudW1iZXJzIGFyZSBvbmUgbW9yZSB0aGFuIHdoYXQgYm91bmRzIHdvdWxkIGJlIG1hcHBlZCB0b1xudmFyIGRheVN0clRvTnVtID0ge1xuICAgIHN1bjogMSxcbiAgICBtb246IDIsXG4gICAgdHVlOiAzLFxuICAgIHdlZDogNCxcbiAgICB0aHU6IDUsXG4gICAgZnJpOiA2LFxuICAgIHNhdDogN1xufTtcblxuZnVuY3Rpb24gaW5kZXhPZkRheSh2KSB7XG4gICAgaWYodHlwZW9mIHYgIT09ICdzdHJpbmcnKSByZXR1cm47XG4gICAgcmV0dXJuIGRheVN0clRvTnVtW1xuICAgICAgICB2LnN1YnN0cigwLCAzKS50b0xvd2VyQ2FzZSgpXG4gICAgXTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gZmluZENhdGVnb3JpZXMoYXgsIG9wdHMpIHtcbiAgICB2YXIgZGF0YUF0dHIgPSBvcHRzLmRhdGFBdHRyIHx8IGF4Ll9pZC5jaGFyQXQoMCk7XG4gICAgdmFyIGxvb2t1cCA9IHt9O1xuICAgIHZhciBheERhdGE7XG4gICAgdmFyIGksIGo7XG5cbiAgICBpZihvcHRzLmF4RGF0YSkge1xuICAgICAgICAvLyBub24teC95IGNhc2VcbiAgICAgICAgYXhEYXRhID0gb3B0cy5heERhdGE7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8geC95IGNhc2VcbiAgICAgICAgYXhEYXRhID0gW107XG4gICAgICAgIGZvcihpID0gMDsgaSA8IG9wdHMuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHRyYWNlID0gb3B0cy5kYXRhW2ldO1xuICAgICAgICAgICAgaWYodHJhY2VbZGF0YUF0dHIgKyAnYXhpcyddID09PSBheC5faWQpIHtcbiAgICAgICAgICAgICAgICBheERhdGEucHVzaCh0cmFjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBheERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHZhbHMgPSBheERhdGFbaV1bZGF0YUF0dHJdO1xuICAgICAgICBmb3IoaiA9IDA7IGogPCB2YWxzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB2YXIgdiA9IHZhbHNbal07XG4gICAgICAgICAgICBpZih2ICE9PSBudWxsICYmIHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGxvb2t1cFt2XSA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMobG9va3VwKTtcbn1cblxuLyoqXG4gKiBGaWxscyBpbiBjYXRlZ29yeSogZGVmYXVsdCBhbmQgaW5pdGlhbCBjYXRlZ29yaWVzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBjb250YWluZXJJbiA6IGlucHV0IGF4aXMgb2JqZWN0XG4gKiBAcGFyYW0ge29iamVjdH0gY29udGFpbmVyT3V0IDogZnVsbCBheGlzIG9iamVjdFxuICogQHBhcmFtIHtmdW5jdGlvbn0gY29lcmNlIDogTGliLmNvZXJjZSBmbiB3cmFwcGVyXG4gKiBAcGFyYW0ge29iamVjdH0gb3B0cyA6XG4gKiAgIC0gZGF0YSB7YXJyYXl9IDogKGZ1bGwpIGRhdGEgdHJhY2VcbiAqIE9SXG4gKiAgIC0gYXhEYXRhIHthcnJheX0gOiAoZnVsbCkgZGF0YSBhc3NvY2lhdGVkIHdpdGggYXhpcyBiZWluZyBjb2VyY2VkIGhlcmVcbiAqICAgLSBkYXRhQXR0ciB7c3RyaW5nfSA6IGF0dHJpYnV0ZSBuYW1lIGNvcnJlc3BvbmRpbmcgdG8gY29vcmRpbmF0ZSBhcnJheVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGhhbmRsZUNhdGVnb3J5T3JkZXJEZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBjb2VyY2UsIG9wdHMpIHtcbiAgICBpZihjb250YWluZXJPdXQudHlwZSAhPT0gJ2NhdGVnb3J5JykgcmV0dXJuO1xuXG4gICAgdmFyIGFycmF5SW4gPSBjb250YWluZXJJbi5jYXRlZ29yeWFycmF5O1xuICAgIHZhciBpc1ZhbGlkQXJyYXkgPSAoQXJyYXkuaXNBcnJheShhcnJheUluKSAmJiBhcnJheUluLmxlbmd0aCA+IDApO1xuXG4gICAgLy8gb3ZlcnJpZGUgZGVmYXVsdCAnY2F0ZWdvcnlvcmRlcicgdmFsdWUgd2hlbiBub24tZW1wdHkgYXJyYXkgaXMgc3VwcGxpZWRcbiAgICB2YXIgb3JkZXJEZWZhdWx0O1xuICAgIGlmKGlzVmFsaWRBcnJheSkgb3JkZXJEZWZhdWx0ID0gJ2FycmF5JztcblxuICAgIHZhciBvcmRlciA9IGNvZXJjZSgnY2F0ZWdvcnlvcmRlcicsIG9yZGVyRGVmYXVsdCk7XG4gICAgdmFyIGFycmF5O1xuXG4gICAgLy8gY29lcmNlICdjYXRlZ29yeWFycmF5JyBvbmx5IGluIGFycmF5IG9yZGVyIGNhc2VcbiAgICBpZihvcmRlciA9PT0gJ2FycmF5Jykge1xuICAgICAgICBhcnJheSA9IGNvZXJjZSgnY2F0ZWdvcnlhcnJheScpO1xuICAgIH1cblxuICAgIC8vIGNhbm5vdCBzZXQgJ2NhdGVnb3J5b3JkZXInIHRvICdhcnJheScgd2l0aCBhbiBpbnZhbGlkICdjYXRlZ29yeWFycmF5J1xuICAgIGlmKCFpc1ZhbGlkQXJyYXkgJiYgb3JkZXIgPT09ICdhcnJheScpIHtcbiAgICAgICAgb3JkZXIgPSBjb250YWluZXJPdXQuY2F0ZWdvcnlvcmRlciA9ICd0cmFjZSc7XG4gICAgfVxuXG4gICAgLy8gc2V0IHVwIHRoaW5ncyBmb3IgbWFrZUNhbGNkYXRhXG4gICAgaWYob3JkZXIgPT09ICd0cmFjZScpIHtcbiAgICAgICAgY29udGFpbmVyT3V0Ll9pbml0aWFsQ2F0ZWdvcmllcyA9IFtdO1xuICAgIH0gZWxzZSBpZihvcmRlciA9PT0gJ2FycmF5Jykge1xuICAgICAgICBjb250YWluZXJPdXQuX2luaXRpYWxDYXRlZ29yaWVzID0gYXJyYXkuc2xpY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheSA9IGZpbmRDYXRlZ29yaWVzKGNvbnRhaW5lck91dCwgb3B0cykuc29ydCgpO1xuICAgICAgICBpZihvcmRlciA9PT0gJ2NhdGVnb3J5IGFzY2VuZGluZycpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lck91dC5faW5pdGlhbENhdGVnb3JpZXMgPSBhcnJheTtcbiAgICAgICAgfSBlbHNlIGlmKG9yZGVyID09PSAnY2F0ZWdvcnkgZGVzY2VuZGluZycpIHtcbiAgICAgICAgICAgIGNvbnRhaW5lck91dC5faW5pdGlhbENhdGVnb3JpZXMgPSBhcnJheS5yZXZlcnNlKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgY29sb3JNaXggPSByZXF1aXJlKCd0aW55Y29sb3IyJykubWl4O1xudmFyIGxpZ2h0RnJhY3Rpb24gPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yL2F0dHJpYnV0ZXMnKS5saWdodEZyYWN0aW9uO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xuXG4vKipcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzIDpcbiAqICAgLSBkZmx0Q29sb3Ige3N0cmluZ30gOiBkZWZhdWx0IGF4aXMgY29sb3JcbiAqICAgLSBiZ0NvbG9yIHtzdHJpbmd9IDogY29tYmluZWQgc3VicGxvdCBiZyBjb2xvclxuICogICAtIGJsZW5kIHtudW1iZXIsIG9wdGlvbmFsfSA6IGJsZW5kIHBlcmNlbnRhZ2UgKHRvIGNvbXB1dGUgZGZsdCBncmlkIGNvbG9yKVxuICogICAtIHNob3dMaW5lIHtib29sZWFufSA6IHNob3cgbGluZSBieSBkZWZhdWx0XG4gKiAgIC0gc2hvd0dyaWQge2Jvb2xlYW59IDogc2hvdyBncmlkIGJ5IGRlZmF1bHRcbiAqICAgLSBub1plcm9MaW5lIHtib29sZWFufSA6IGRvbid0IGNvZXJjZSB6ZXJvbGluZSogYXR0cmlidXRlc1xuICogICAtIGF0dHJpYnV0ZXMge29iamVjdH0gOiBhdHRyaWJ1dGUgb2JqZWN0IGFzc29jaWF0ZWQgd2l0aCBpbnB1dCBjb250YWluZXJzXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaGFuZGxlTGluZUdyaWREZWZhdWx0cyhjb250YWluZXJJbiwgY29udGFpbmVyT3V0LCBjb2VyY2UsIG9wdHMpIHtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcblxuICAgIHZhciBkZmx0Q29sb3IgPSBvcHRzLmRmbHRDb2xvcjtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZTIoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZTIoY29udGFpbmVySW4sIGNvbnRhaW5lck91dCwgb3B0cy5hdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgbGluZUNvbG9yID0gY29lcmNlMignbGluZWNvbG9yJywgZGZsdENvbG9yKTtcbiAgICB2YXIgbGluZVdpZHRoID0gY29lcmNlMignbGluZXdpZHRoJyk7XG4gICAgdmFyIHNob3dMaW5lID0gY29lcmNlKCdzaG93bGluZScsIG9wdHMuc2hvd0xpbmUgfHwgISFsaW5lQ29sb3IgfHwgISFsaW5lV2lkdGgpO1xuXG4gICAgaWYoIXNob3dMaW5lKSB7XG4gICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQubGluZWNvbG9yO1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LmxpbmV3aWR0aDtcbiAgICB9XG5cbiAgICB2YXIgZ3JpZENvbG9yRGZsdCA9IGNvbG9yTWl4KGRmbHRDb2xvciwgb3B0cy5iZ0NvbG9yLCBvcHRzLmJsZW5kIHx8IGxpZ2h0RnJhY3Rpb24pLnRvUmdiU3RyaW5nKCk7XG4gICAgdmFyIGdyaWRDb2xvciA9IGNvZXJjZTIoJ2dyaWRjb2xvcicsIGdyaWRDb2xvckRmbHQpO1xuICAgIHZhciBncmlkV2lkdGggPSBjb2VyY2UyKCdncmlkd2lkdGgnKTtcbiAgICB2YXIgc2hvd0dyaWRMaW5lcyA9IGNvZXJjZSgnc2hvd2dyaWQnLCBvcHRzLnNob3dHcmlkIHx8ICEhZ3JpZENvbG9yIHx8ICEhZ3JpZFdpZHRoKTtcblxuICAgIGlmKCFzaG93R3JpZExpbmVzKSB7XG4gICAgICAgIGRlbGV0ZSBjb250YWluZXJPdXQuZ3JpZGNvbG9yO1xuICAgICAgICBkZWxldGUgY29udGFpbmVyT3V0LmdyaWR3aWR0aDtcbiAgICB9XG5cbiAgICBpZighb3B0cy5ub1plcm9MaW5lKSB7XG4gICAgICAgIHZhciB6ZXJvTGluZUNvbG9yID0gY29lcmNlMignemVyb2xpbmVjb2xvcicsIGRmbHRDb2xvcik7XG4gICAgICAgIHZhciB6ZXJvTGluZVdpZHRoID0gY29lcmNlMignemVyb2xpbmV3aWR0aCcpO1xuICAgICAgICB2YXIgc2hvd1plcm9MaW5lID0gY29lcmNlKCd6ZXJvbGluZScsIG9wdHMuc2hvd0dyaWQgfHwgISF6ZXJvTGluZUNvbG9yIHx8ICEhemVyb0xpbmVXaWR0aCk7XG5cbiAgICAgICAgaWYoIXNob3daZXJvTGluZSkge1xuICAgICAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC56ZXJvbGluZWNvbG9yO1xuICAgICAgICAgICAgZGVsZXRlIGNvbnRhaW5lck91dC56ZXJvbGluZXdpZHRoO1xuICAgICAgICB9XG4gICAgfVxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=