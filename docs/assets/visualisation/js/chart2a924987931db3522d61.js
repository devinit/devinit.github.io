(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_parcats_js"],{

/***/ "./node_modules/plotly.js/lib/parcats.js":
/*!***********************************************!*\
  !*** ./node_modules/plotly.js/lib/parcats.js ***!
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



module.exports = __webpack_require__(/*! ../src/traces/parcats */ "./node_modules/plotly.js/src/traces/parcats/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcats/attributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcats/attributes.js ***!
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



var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");
var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;

var line = extendFlat(
    {editType: 'calc'},
    colorScaleAttrs('line', {editTypeOverride: 'calc'}),
    {
        shape: {
            valType: 'enumerated',
            values: ['linear', 'hspline'],
            dflt: 'linear',
            role: 'info',
            editType: 'plot',
            description: [
                'Sets the shape of the paths.',
                'If `linear`, paths are composed of straight lines.',
                'If `hspline`, paths are composed of horizontal curved splines'
            ].join(' ')
        },

        hovertemplate: hovertemplateAttrs({
            editType: 'plot',
            arrayOk: false
        }, {
            keys: ['count', 'probability'],
            description: [
                'This value here applies when hovering over lines.'
            ].join(' ')
        })
    }
);

module.exports = {
    domain: domainAttrs({name: 'parcats', trace: true, editType: 'calc'}),

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo, {
        flags: ['count', 'probability'],
        editType: 'plot',
        arrayOk: false
    }),
    hoveron: {
        valType: 'enumerated',
        values: ['category', 'color', 'dimension'],
        dflt: 'category',
        role: 'info',
        editType: 'plot',
        description: [
            'Sets the hover interaction mode for the parcats diagram.',
            'If `category`, hover interaction take place per category.',
            'If `color`, hover interactions take place per color per category.',
            'If `dimension`, hover interactions take place across all categories per dimension.'
        ].join(' ')
    },
    hovertemplate: hovertemplateAttrs({
        editType: 'plot',
        arrayOk: false
    }, {
        keys: [
            'count', 'probability', 'category',
            'categorycount', 'colorcount', 'bandcolorcount'
        ],
        description: [
            'This value here applies when hovering over dimensions.',
            'Note tath `*categorycount`, *colorcount* and *bandcolorcount*',
            'are only available when `hoveron` contains the *color* flag'
        ].join(' ')
    }),

    arrangement: {
        valType: 'enumerated',
        values: ['perpendicular', 'freeform', 'fixed'],
        dflt: 'perpendicular',
        role: 'style',
        editType: 'plot',
        description: [
            'Sets the drag interaction mode for categories and dimensions.',
            'If `perpendicular`, the categories can only move along a line perpendicular to the paths.',
            'If `freeform`, the categories can freely move on the plane.',
            'If `fixed`, the categories and dimensions are stationary.'
        ].join(' ')
    },
    bundlecolors: {
        valType: 'boolean',
        dflt: true,
        role: 'info',
        editType: 'plot',
        description: 'Sort paths so that like colors are bundled together within each category.'
    },
    sortpaths: {
        valType: 'enumerated',
        values: ['forward', 'backward'],
        dflt: 'forward',
        role: 'info',
        editType: 'plot',
        description: [
            'Sets the path sorting algorithm.',
            'If `forward`, sort paths based on dimension categories from left to right.',
            'If `backward`, sort paths based on dimensions categories from right to left.'
        ].join(' ')
    },
    labelfont: fontAttrs({
        editType: 'calc',
        description: 'Sets the font for the `dimension` labels.'
    }),

    tickfont: fontAttrs({
        editType: 'calc',
        description: 'Sets the font for the `category` labels.'
    }),

    dimensions: {
        _isLinkedToArray: 'dimension',
        label: {
            valType: 'string',
            role: 'info',
            editType: 'calc',
            description: 'The shown name of the dimension.'
        },
        categoryorder: {
            valType: 'enumerated',
            values: [
                'trace', 'category ascending', 'category descending', 'array'
            ],
            dflt: 'trace',
            role: 'info',
            editType: 'calc',
            description: [
                'Specifies the ordering logic for the categories in the dimension.',
                'By default, plotly uses *trace*, which specifies the order that is present in the data supplied.',
                'Set `categoryorder` to *category ascending* or *category descending* if order should be determined by',
                'the alphanumerical order of the category names.',
                'Set `categoryorder` to *array* to derive the ordering from the attribute `categoryarray`. If a category',
                'is not found in the `categoryarray` array, the sorting behavior for that attribute will be identical to',
                'the *trace* mode. The unspecified categories will follow the categories in `categoryarray`.'
            ].join(' ')
        },
        categoryarray: {
            valType: 'data_array',
            role: 'info',
            editType: 'calc',
            description: [
                'Sets the order in which categories in this dimension appear.',
                'Only has an effect if `categoryorder` is set to *array*.',
                'Used with `categoryorder`.'
            ].join(' ')
        },
        ticktext: {
            valType: 'data_array',
            role: 'info',
            editType: 'calc',
            description: [
                'Sets alternative tick labels for the categories in this dimension.',
                'Only has an effect if `categoryorder` is set to *array*.',
                'Should be an array the same length as `categoryarray`',
                'Used with `categoryorder`.'
            ].join(' ')
        },
        values: {
            valType: 'data_array',
            role: 'info',
            dflt: [],
            editType: 'calc',
            description: [
                'Dimension values. `values[n]` represents the category value of the `n`th point in the dataset,',
                'therefore the `values` vector for all dimensions must be the same (longer vectors',
                'will be truncated).'
            ].join(' ')
        },
        displayindex: {
            valType: 'integer',
            role: 'info',
            editType: 'calc',
            description: [
                'The display index of dimension, from left to right, zero indexed, defaults to dimension',
                'index.'
            ].join(' ')
        },
        editType: 'calc',
        description: 'The dimensions (variables) of the parallel categories diagram.',
        visible: {
            valType: 'boolean',
            dflt: true,
            role: 'info',
            editType: 'calc',
            description: 'Shows the dimension when set to `true` (the default). Hides the dimension for `false`.'
        }
    },

    line: line,
    counts: {
        valType: 'number',
        min: 0,
        dflt: 1,
        arrayOk: true,
        role: 'info',
        editType: 'calc',
        description: [
            'The number of observations represented by each state. Defaults to 1 so that each state represents',
            'one observation'
        ].join(' ')
    },

    // Hide unsupported top-level properties from plot-schema
    customdata: undefined,
    hoverlabel: undefined,
    ids: undefined,
    legendgroup: undefined,
    opacity: undefined,
    selectedpoints: undefined,
    showlegend: undefined
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcats/base_plot.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcats/base_plot.js ***!
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



var getModuleCalcData = __webpack_require__(/*! ../../plots/get_data */ "./node_modules/plotly.js/src/plots/get_data.js").getModuleCalcData;
var parcatsPlot = __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/parcats/plot.js");

var PARCATS = 'parcats';
exports.name = PARCATS;

exports.plot = function(gd, traces, transitionOpts, makeOnCompleteCallback) {
    var cdModuleAndOthers = getModuleCalcData(gd.calcdata, PARCATS);

    if(cdModuleAndOthers.length) {
        var calcData = cdModuleAndOthers[0];
        parcatsPlot(gd, calcData, transitionOpts, makeOnCompleteCallback);
    }
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var hadTable = (oldFullLayout._has && oldFullLayout._has('parcats'));
    var hasTable = (newFullLayout._has && newFullLayout._has('parcats'));

    if(hadTable && !hasTable) {
        oldFullLayout._paperdiv.selectAll('.parcats').remove();
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcats/calc.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcats/calc.js ***!
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



// Requirements
// ============
var wrap = __webpack_require__(/*! ../../lib/gup */ "./node_modules/plotly.js/src/lib/gup.js").wrap;
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleCalc = __webpack_require__(/*! ../../components/colorscale/calc */ "./node_modules/plotly.js/src/components/colorscale/calc.js");
var filterUnique = __webpack_require__(/*! ../../lib/filter_unique.js */ "./node_modules/plotly.js/src/lib/filter_unique.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");

/**
 * Create a wrapped ParcatsModel object from trace
 *
 * Note: trace defaults have already been applied
 * @param {Object} gd
 * @param {Object} trace
 * @return {Array.<ParcatsModel>}
 */
module.exports = function calc(gd, trace) {
    var visibleDims = Lib.filterVisible(trace.dimensions);

    if(visibleDims.length === 0) return [];

    var uniqueInfoDims = visibleDims.map(function(dim) {
        var categoryValues;
        if(dim.categoryorder === 'trace') {
            // Use order of first occurrence in trace
            categoryValues = null;
        } else if(dim.categoryorder === 'array') {
            // Use categories specified in `categoryarray` first,
            // then add extra to the end in trace order
            categoryValues = dim.categoryarray;
        } else {
            // Get all categories up front so we can order them
            // Should we check for numbers as sort numerically?
            categoryValues = filterUnique(dim.values).sort();
            if(dim.categoryorder === 'category descending') {
                categoryValues = categoryValues.reverse();
            }
        }
        return getUniqueInfo(dim.values, categoryValues);
    });

    var counts,
        count,
        totalCount;
    if(Lib.isArrayOrTypedArray(trace.counts)) {
        counts = trace.counts;
    } else {
        counts = [trace.counts];
    }

    validateDimensionDisplayInds(visibleDims);

    visibleDims.forEach(function(dim, dimInd) {
        validateCategoryProperties(dim, uniqueInfoDims[dimInd]);
    });

    // Handle path colors
    // ------------------
    var line = trace.line;
    var markerColorscale;

    // Process colorscale
    if(line) {
        if(hasColorscale(trace, 'line')) {
            colorscaleCalc(gd, trace, {
                vals: trace.line.color,
                containerStr: 'line',
                cLetter: 'c'
            });
        }
        markerColorscale = Drawing.tryColorscale(line);
    } else {
        markerColorscale = Lib.identity;
    }

    // Build color generation function
    function getMarkerColorInfo(index) {
        var value, rawColor;
        if(Lib.isArrayOrTypedArray(line.color)) {
            value = line.color[index % line.color.length];
            rawColor = value;
        } else {
            value = line.color;
        }

        return {color: markerColorscale(value), rawColor: rawColor};
    }

    // Number of values and counts
    // ---------------------------
    var numValues = visibleDims[0].values.length;

    // Build path info
    // ---------------
    // Mapping from category inds to PathModel objects
    var pathModels = {};

    // Category inds array for each dimension
    var categoryIndsDims = uniqueInfoDims.map(function(di) {return di.inds;});

    // Initialize total count
    totalCount = 0;
    var valueInd;
    var d;

    for(valueInd = 0; valueInd < numValues; valueInd++) {
        // Category inds for this input value across dimensions
        var categoryIndsPath = [];
        for(d = 0; d < categoryIndsDims.length; d++) {
            categoryIndsPath.push(categoryIndsDims[d][valueInd]);
        }

        // Count
        count = counts[valueInd % counts.length];

        // Update total count
        totalCount += count;

        // Path color
        var pathColorInfo = getMarkerColorInfo(valueInd);

        // path key
        var pathKey = categoryIndsPath + '-' + pathColorInfo.rawColor;

        // Create / Update PathModel
        if(pathModels[pathKey] === undefined) {
            pathModels[pathKey] = createPathModel(categoryIndsPath,
                pathColorInfo.color,
                pathColorInfo.rawColor);
        }
        updatePathModel(pathModels[pathKey], valueInd, count);
    }

    var dimensionModels = visibleDims.map(function(di, i) {
        return createDimensionModel(i, di._index, di._displayindex, di.label, totalCount);
    });


    for(valueInd = 0; valueInd < numValues; valueInd++) {
        count = counts[valueInd % counts.length];

        for(d = 0; d < dimensionModels.length; d++) {
            var containerInd = dimensionModels[d].containerInd;
            var catInd = uniqueInfoDims[d].inds[valueInd];
            var cats = dimensionModels[d].categories;

            if(cats[catInd] === undefined) {
                var catValue = trace.dimensions[containerInd]._categoryarray[catInd];
                var catLabel = trace.dimensions[containerInd]._ticktext[catInd];
                cats[catInd] = createCategoryModel(d, catInd, catValue, catLabel);
            }

            updateCategoryModel(cats[catInd], valueInd, count);
        }
    }

    // Compute unique
    return wrap(createParcatsModel(dimensionModels, pathModels, totalCount));
};

// Models
// ======

// Parcats Model
// -------------
/**
 * @typedef {Object} ParcatsModel
 *  Object containing calculated information about a parcats trace
 *
 * @property {Array.<DimensionModel>} dimensions
 *  Array of dimension models
 * @property {Object.<string,PathModel>} paths
 *  Dictionary from category inds string (e.g. "1,2,1,1") to path model
 * @property {Number} maxCats
 *  The maximum number of categories of any dimension in the diagram
 * @property {Number} count
 *  Total number of input values
 * @property {Object} trace
 */

/**
 * Create and new ParcatsModel object
 * @param {Array.<DimensionModel>} dimensions
 * @param {Object.<string,PathModel>} paths
 * @param {Number} count
 * @return {ParcatsModel}
 */
function createParcatsModel(dimensions, paths, count) {
    var maxCats = dimensions
        .map(function(d) {return d.categories.length;})
        .reduce(function(v1, v2) {return Math.max(v1, v2);});
    return {dimensions: dimensions, paths: paths, trace: undefined, maxCats: maxCats, count: count};
}

// Dimension Model
// ---------------
/**
 * @typedef {Object} DimensionModel
 *  Object containing calculated information about a single dimension
 *
 * @property {Number} dimensionInd
 *  The index of this dimension among the *visible* dimensions
 * @property {Number} containerInd
 *  The index of this dimension in the original dimensions container,
 *  irrespective of dimension visibility
 * @property {Number} displayInd
 *  The display index of this dimension (where 0 is the left most dimension)
 * @property {String} dimensionLabel
 *  The label of this dimension
 * @property {Number} count
 *  Total number of input values
 * @property {Array.<CategoryModel>} categories
 * @property {Number|null} dragX
 *  The x position of dimension that is currently being dragged. null if not being dragged
 */

/**
 * Create and new DimensionModel object with an empty categories array
 * @param {Number} dimensionInd
 * @param {Number} containerInd
 * @param {Number} displayInd
 * @param {String} dimensionLabel
 * @param {Number} count
 *  Total number of input values
 * @return {DimensionModel}
 */
function createDimensionModel(dimensionInd, containerInd, displayInd, dimensionLabel, count) {
    return {
        dimensionInd: dimensionInd,
        containerInd: containerInd,
        displayInd: displayInd,
        dimensionLabel: dimensionLabel,
        count: count,
        categories: [],
        dragX: null
    };
}

// Category Model
// --------------
/**
 * @typedef {Object} CategoryModel
 *  Object containing calculated information about a single category.
 *
 * @property {Number} dimensionInd
 *  The index of this categories dimension
 * @property {Number} categoryInd
 *  The index of this category
 * @property {Number} displayInd
 *  The display index of this category (where 0 is the topmost category)
 * @property {String} categoryLabel
 *  The name of this category
 * @property categoryValue: Raw value of the category
 * @property {Array} valueInds
 *  Array of indices (into the original value array) of all samples in this category
 * @property {Number} count
 *  The number of elements from the original array in this path
 * @property {Number|null} dragY
 *  The y position of category that is currently being dragged. null if not being dragged
 */

/**
 * Create and return a new CategoryModel object
 * @param {Number} dimensionInd
 * @param {Number} categoryInd
 *  The display index of this category (where 0 is the topmost category)
 * @param {String} categoryValue
 * @param {String} categoryLabel
 * @return {CategoryModel}
 */
function createCategoryModel(dimensionInd, categoryInd, categoryValue, categoryLabel) {
    return {
        dimensionInd: dimensionInd,
        categoryInd: categoryInd,
        categoryValue: categoryValue,
        displayInd: categoryInd,
        categoryLabel: categoryLabel,
        valueInds: [],
        count: 0,
        dragY: null
    };
}

/**
 * Update a CategoryModel object with a new value index
 * Note: The calling parameter is modified in place.
 *
 * @param {CategoryModel} categoryModel
 * @param {Number} valueInd
 * @param {Number} count
 */
function updateCategoryModel(categoryModel, valueInd, count) {
    categoryModel.valueInds.push(valueInd);
    categoryModel.count += count;
}


// Path Model
// ----------
/**
 * @typedef {Object} PathModel
 *  Object containing calculated information about the samples in a path.
 *
 * @property {Array} categoryInds
 *  Array of category indices for each dimension (length `numDimensions`)
 * @param {String} pathColor
 *  Color of this path. (Note: Any colorscaling has already taken place)
 * @property {Array} valueInds
 *  Array of indices (into the original value array) of all samples in this path
 * @property {Number} count
 *  The number of elements from the original array in this path
 * @property {String} color
 *  The path's color (ass CSS color string)
 * @property rawColor
 *  The raw color value specified by the user. May be a CSS color string or a Number
 */

/**
 * Create and return a new PathModel object
 * @param {Array} categoryInds
 * @param color
 * @param rawColor
 * @return {PathModel}
 */
function createPathModel(categoryInds, color, rawColor) {
    return {
        categoryInds: categoryInds,
        color: color,
        rawColor: rawColor,
        valueInds: [],
        count: 0
    };
}

/**
 * Update a PathModel object with a new value index
 * Note: The calling parameter is modified in place.
 *
 * @param {PathModel} pathModel
 * @param {Number} valueInd
 * @param {Number} count
 */
function updatePathModel(pathModel, valueInd, count) {
    pathModel.valueInds.push(valueInd);
    pathModel.count += count;
}

// Unique calculations
// ===================
/**
 * @typedef {Object} UniqueInfo
 *  Object containing information about the unique values of an input array
 *
 * @property {Array} uniqueValues
 *  The unique values in the input array
 * @property {Array} uniqueCounts
 *  The number of times each entry in uniqueValues occurs in input array.
 *  This has the same length as `uniqueValues`
 * @property {Array} inds
 *  Indices into uniqueValues that would reproduce original input array
 */

/**
 * Compute unique value information for an array
 *
 * IMPORTANT: Note that values are considered unique
 * if their string representations are unique.
 *
 * @param {Array} values
 * @param {Array|undefined} uniqueValues
 *  Array of expected unique values. The uniqueValues property of the resulting UniqueInfo object will begin with
 *  these entries. Entries are included even if there are zero occurrences in the values array. Entries found in
 *  the values array that are not present in uniqueValues will be included at the end of the array in the
 *  UniqueInfo object.
 * @return {UniqueInfo}
 */
function getUniqueInfo(values, uniqueValues) {
    // Initialize uniqueValues if not specified
    if(uniqueValues === undefined || uniqueValues === null) {
        uniqueValues = [];
    } else {
        // Shallow copy so append below doesn't alter input array
        uniqueValues = uniqueValues.map(function(e) {return e;});
    }

    // Initialize Variables
    var uniqueValueCounts = {};
    var uniqueValueInds = {};
    var inds = [];

    // Initialize uniqueValueCounts and
    uniqueValues.forEach(function(uniqueVal, valInd) {
        uniqueValueCounts[uniqueVal] = 0;
        uniqueValueInds[uniqueVal] = valInd;
    });

    // Compute the necessary unique info in a single pass
    for(var i = 0; i < values.length; i++) {
        var item = values[i];
        var itemInd;

        if(uniqueValueCounts[item] === undefined) {
            // This item has a previously unseen value
            uniqueValueCounts[item] = 1;
            itemInd = uniqueValues.push(item) - 1;
            uniqueValueInds[item] = itemInd;
        } else {
            // Increment count for this item
            uniqueValueCounts[item]++;
            itemInd = uniqueValueInds[item];
        }
        inds.push(itemInd);
    }

    // Build UniqueInfo
    var uniqueCounts = uniqueValues.map(function(v) { return uniqueValueCounts[v]; });

    return {
        uniqueValues: uniqueValues,
        uniqueCounts: uniqueCounts,
        inds: inds
    };
}


/**
 * Validate the requested display order for the dimensions.
 * If the display order is a permutation of 0 through dimensions.length - 1, link to _displayindex
 * Otherwise, replace the display order with the dimension order
 * @param {Object} trace
 */
function validateDimensionDisplayInds(visibleDims) {
    var displayInds = visibleDims.map(function(d) { return d.displayindex; });
    var i;

    if(isRangePermutation(displayInds)) {
        for(i = 0; i < visibleDims.length; i++) {
            visibleDims[i]._displayindex = visibleDims[i].displayindex;
        }
    } else {
        for(i = 0; i < visibleDims.length; i++) {
            visibleDims[i]._displayindex = i;
        }
    }
}


/**
 * Update category properties based on the unique values found for this dimension
 * @param {Object} dim
 * @param {UniqueInfo} uniqueInfoDim
 */
function validateCategoryProperties(dim, uniqueInfoDim) {
    // Update categoryarray
    dim._categoryarray = uniqueInfoDim.uniqueValues;

    // Handle ticktext
    if(dim.ticktext === null || dim.ticktext === undefined) {
        dim._ticktext = [];
    } else {
        // Shallow copy to avoid modifying input array
        dim._ticktext = dim.ticktext.slice();
    }

    // Extend ticktext with elements from uniqueInfoDim.uniqueValues
    for(var i = dim._ticktext.length; i < uniqueInfoDim.uniqueValues.length; i++) {
        dim._ticktext.push(uniqueInfoDim.uniqueValues[i]);
    }
}

/**
 * Determine whether an array contains a permutation of the integers from 0 to the array's length - 1
 * @param {Array} inds
 * @return {boolean}
 */
function isRangePermutation(inds) {
    var indsSpecified = new Array(inds.length);

    for(var i = 0; i < inds.length; i++) {
        // Check for out of bounds
        if(inds[i] < 0 || inds[i] >= inds.length) {
            return false;
        }

        // Check for collisions with already specified index
        if(indsSpecified[inds[i]] !== undefined) {
            return false;
        }

        indsSpecified[inds[i]] = true;
    }

    // Nothing out of bounds and no collisions. We have a permutation
    return true;
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcats/defaults.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcats/defaults.js ***!
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
var hasColorscale = __webpack_require__(/*! ../../components/colorscale/helpers */ "./node_modules/plotly.js/src/components/colorscale/helpers.js").hasColorscale;
var colorscaleDefaults = __webpack_require__(/*! ../../components/colorscale/defaults */ "./node_modules/plotly.js/src/components/colorscale/defaults.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;
var handleArrayContainerDefaults = __webpack_require__(/*! ../../plots/array_container_defaults */ "./node_modules/plotly.js/src/plots/array_container_defaults.js");

var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/parcats/attributes.js");
var mergeLength = __webpack_require__(/*! ../parcoords/merge_length */ "./node_modules/plotly.js/src/traces/parcoords/merge_length.js");

function handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce) {
    coerce('line.shape');
    coerce('line.hovertemplate');

    var lineColor = coerce('line.color', layout.colorway[0]);
    if(hasColorscale(traceIn, 'line') && Lib.isArrayOrTypedArray(lineColor)) {
        if(lineColor.length) {
            coerce('line.colorscale');
            colorscaleDefaults(traceIn, traceOut, layout, coerce, {prefix: 'line.', cLetter: 'c'});
            return lineColor.length;
        } else {
            traceOut.line.color = defaultColor;
        }
    }
    return Infinity;
}

function dimensionDefaults(dimensionIn, dimensionOut) {
    function coerce(attr, dflt) {
        return Lib.coerce(dimensionIn, dimensionOut, attributes.dimensions, attr, dflt);
    }

    var values = coerce('values');
    var visible = coerce('visible');
    if(!(values && values.length)) {
        visible = dimensionOut.visible = false;
    }

    if(visible) {
        // Dimension level
        coerce('label');
        coerce('displayindex', dimensionOut._index);

        // Category level
        var arrayIn = dimensionIn.categoryarray;
        var isValidArray = (Array.isArray(arrayIn) && arrayIn.length > 0);

        var orderDefault;
        if(isValidArray) orderDefault = 'array';
        var order = coerce('categoryorder', orderDefault);

        // coerce 'categoryarray' only in array order case
        if(order === 'array') {
            coerce('categoryarray');
            coerce('ticktext');
        } else {
            delete dimensionIn.categoryarray;
            delete dimensionIn.ticktext;
        }

        // cannot set 'categoryorder' to 'array' with an invalid 'categoryarray'
        if(!isValidArray && order === 'array') {
            dimensionOut.categoryorder = 'trace';
        }
    }
}

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    var dimensions = handleArrayContainerDefaults(traceIn, traceOut, {
        name: 'dimensions',
        handleItemDefaults: dimensionDefaults
    });

    var len = handleLineDefaults(traceIn, traceOut, defaultColor, layout, coerce);

    handleDomainDefaults(traceOut, layout, coerce);

    if(!Array.isArray(dimensions) || !dimensions.length) {
        traceOut.visible = false;
    }

    mergeLength(traceOut, dimensions, 'values', len);

    coerce('hoveron');
    coerce('hovertemplate');
    coerce('arrangement');
    coerce('bundlecolors');
    coerce('sortpaths');
    coerce('counts');

    var labelfontDflt = {
        family: layout.font.family,
        size: Math.round(layout.font.size),
        color: layout.font.color
    };

    Lib.coerceFont(coerce, 'labelfont', labelfontDflt);

    var categoryfontDefault = {
        family: layout.font.family,
        size: Math.round(layout.font.size / 1.2),
        color: layout.font.color
    };

    Lib.coerceFont(coerce, 'tickfont', categoryfontDefault);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcats/index.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcats/index.js ***!
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
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/parcats/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/parcats/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/parcats/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/parcats/plot.js"),
    colorbar: {
        container: 'line',
        min: 'cmin',
        max: 'cmax'
    },

    moduleType: 'trace',
    name: 'parcats',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/parcats/base_plot.js"),
    categories: ['noOpacity'],
    meta: {
        description: [
            'Parallel categories diagram for multidimensional categorical data.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcats/parcats.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcats/parcats.js ***!
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
var Plotly = __webpack_require__(/*! ../../plot_api/plot_api */ "./node_modules/plotly.js/src/plot_api/plot_api.js");
var Fx = __webpack_require__(/*! ../../components/fx */ "./node_modules/plotly.js/src/components/fx/index.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");
var svgTextUtils = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");

function performPlot(parcatsModels, graphDiv, layout, svg) {
    var viewModels = parcatsModels.map(createParcatsViewModel.bind(0, graphDiv, layout));

    // Get (potentially empty) parcatslayer selection with bound data to single element array
    var layerSelection = svg.selectAll('g.parcatslayer').data([null]);

    // Initialize single parcatslayer group if it doesn't exist
    layerSelection.enter()
        .append('g')
        .attr('class', 'parcatslayer')
        .style('pointer-events', 'all');

    // Bind data to children of layerSelection and get reference to traceSelection
    var traceSelection = layerSelection
        .selectAll('g.trace.parcats')
        .data(viewModels, key);

    // Initialize group for each trace/dimensions
    var traceEnter = traceSelection.enter()
        .append('g')
        .attr('class', 'trace parcats');

    // Update properties for each trace
    traceSelection
        .attr('transform', function(d) {
            return 'translate(' + d.x + ', ' + d.y + ')';
        });

    // Initialize paths group
    traceEnter
        .append('g')
        .attr('class', 'paths');

    // Update paths transform
    var pathsSelection = traceSelection
        .select('g.paths');

    // Get paths selection
    var pathSelection = pathsSelection
        .selectAll('path.path')
        .data(function(d) {
            return d.paths;
        }, key);

    // Update existing path colors
    pathSelection
        .attr('fill', function(d) {
            return d.model.color;
        });

    // Create paths
    var pathSelectionEnter = pathSelection
        .enter()
        .append('path')
        .attr('class', 'path')
        .attr('stroke-opacity', 0)
        .attr('fill', function(d) {
            return d.model.color;
        })
        .attr('fill-opacity', 0);

    stylePathsNoHover(pathSelectionEnter);

    // Set path geometry
    pathSelection
        .attr('d', function(d) {
            return d.svgD;
        });

    // sort paths
    if(!pathSelectionEnter.empty()) {
        // Only sort paths if there has been a change.
        // Otherwise paths are already sorted or a hover operation may be in progress
        pathSelection.sort(compareRawColor);
    }

    // Remove any old paths
    pathSelection.exit().remove();

    // Path hover
    pathSelection
        .on('mouseover', mouseoverPath)
        .on('mouseout', mouseoutPath)
        .on('click', clickPath);

    // Initialize dimensions group
    traceEnter.append('g').attr('class', 'dimensions');

    // Update dimensions transform
    var dimensionsSelection = traceSelection
        .select('g.dimensions');

    // Get dimension selection
    var dimensionSelection = dimensionsSelection
        .selectAll('g.dimension')
        .data(function(d) {
            return d.dimensions;
        }, key);

    // Create dimension groups
    dimensionSelection.enter()
        .append('g')
        .attr('class', 'dimension');

    // Update dimension group transforms
    dimensionSelection.attr('transform', function(d) {
        return 'translate(' + d.x + ', 0)';
    });

    // Remove any old dimensions
    dimensionSelection.exit().remove();

    // Get category selection
    var categorySelection = dimensionSelection
        .selectAll('g.category')
        .data(function(d) {
            return d.categories;
        }, key);

    // Initialize category groups
    var categoryGroupEnterSelection = categorySelection
        .enter()
        .append('g')
        .attr('class', 'category');

    // Update category transforms
    categorySelection
        .attr('transform', function(d) {
            return 'translate(0, ' + d.y + ')';
        });


    // Initialize rectangle
    categoryGroupEnterSelection
        .append('rect')
        .attr('class', 'catrect')
        .attr('pointer-events', 'none');


    // Update rectangle
    categorySelection.select('rect.catrect')
        .attr('fill', 'none')
        .attr('width', function(d) {
            return d.width;
        })
        .attr('height', function(d) {
            return d.height;
        });

    styleCategoriesNoHover(categoryGroupEnterSelection);

    // Initialize color band rects
    var bandSelection = categorySelection
        .selectAll('rect.bandrect')
        .data(
            /** @param {CategoryViewModel} catViewModel*/
            function(catViewModel) {
                return catViewModel.bands;
            }, key);

    // Raise all update bands to the top so that fading enter/exit bands will be behind
    bandSelection.each(function() {Lib.raiseToTop(this);});

    // Update band color
    bandSelection
        .attr('fill', function(d) {
            return d.color;
        });

    var bandsSelectionEnter = bandSelection.enter()
        .append('rect')
        .attr('class', 'bandrect')
        .attr('stroke-opacity', 0)
        .attr('fill', function(d) {
            return d.color;
        })
        .attr('fill-opacity', 0);

    bandSelection
        .attr('fill', function(d) {
            return d.color;
        })
        .attr('width', function(d) {
            return d.width;
        })
        .attr('height', function(d) {
            return d.height;
        })
        .attr('y', function(d) {
            return d.y;
        })
        .attr('cursor',
            /** @param {CategoryBandViewModel} bandModel*/
            function(bandModel) {
                if(bandModel.parcatsViewModel.arrangement === 'fixed') {
                    return 'default';
                } else if(bandModel.parcatsViewModel.arrangement === 'perpendicular') {
                    return 'ns-resize';
                } else {
                    return 'move';
                }
            });

    styleBandsNoHover(bandsSelectionEnter);

    bandSelection.exit().remove();

    // Initialize category label
    categoryGroupEnterSelection
        .append('text')
        .attr('class', 'catlabel')
        .attr('pointer-events', 'none');

    var paperColor = graphDiv._fullLayout.paper_bgcolor;

    // Update category label
    categorySelection.select('text.catlabel')
        .attr('text-anchor',
            function(d) {
                if(catInRightDim(d)) {
                    // Place label to the right of category
                    return 'start';
                } else {
                    // Place label to the left of category
                    return 'end';
                }
            })
        .attr('alignment-baseline', 'middle')

        .style('text-shadow',
            paperColor + ' -1px  1px 2px, ' +
            paperColor + ' 1px  1px 2px, ' +
            paperColor + '  1px -1px 2px, ' +
            paperColor + ' -1px -1px 2px')
        .style('fill', 'rgb(0, 0, 0)')
        .attr('x',
            function(d) {
                if(catInRightDim(d)) {
                    // Place label to the right of category
                    return d.width + 5;
                } else {
                    // Place label to the left of category
                    return -5;
                }
            })
        .attr('y', function(d) {
            return d.height / 2;
        })
        .text(function(d) {
            return d.model.categoryLabel;
        })
        .each(
            /** @param {CategoryViewModel} catModel*/
            function(catModel) {
                Drawing.font(d3.select(this), catModel.parcatsViewModel.categorylabelfont);
                svgTextUtils.convertToTspans(d3.select(this), graphDiv);
            });

    // Initialize dimension label
    categoryGroupEnterSelection
        .append('text')
        .attr('class', 'dimlabel');

    // Update dimension label
    categorySelection.select('text.dimlabel')
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'baseline')
        .attr('cursor',
             /** @param {CategoryViewModel} catModel*/
            function(catModel) {
                if(catModel.parcatsViewModel.arrangement === 'fixed') {
                    return 'default';
                } else {
                    return 'ew-resize';
                }
            })
        .attr('x', function(d) {
            return d.width / 2;
        })
        .attr('y', -5)
        .text(function(d, i) {
            if(i === 0) {
                // Add dimension label above topmost category
                return d.parcatsViewModel.model.dimensions[d.model.dimensionInd].dimensionLabel;
            } else {
                return null;
            }
        })
        .each(
            /** @param {CategoryViewModel} catModel*/
            function(catModel) {
                Drawing.font(d3.select(this), catModel.parcatsViewModel.labelfont);
            });

    // Category hover
    // categorySelection.select('rect.catrect')
    categorySelection.selectAll('rect.bandrect')
        .on('mouseover', mouseoverCategoryBand)
        .on('mouseout', mouseoutCategory);

    // Remove unused categories
    categorySelection.exit().remove();

    // Setup drag
    dimensionSelection.call(d3.behavior.drag()
        .origin(function(d) {
            return {x: d.x, y: 0};
        })
        .on('dragstart', dragDimensionStart)
        .on('drag', dragDimension)
        .on('dragend', dragDimensionEnd));


    // Save off selections to view models
    traceSelection.each(function(d) {
        d.traceSelection = d3.select(this);
        d.pathSelection = d3.select(this).selectAll('g.paths').selectAll('path.path');
        d.dimensionSelection = d3.select(this).selectAll('g.dimensions').selectAll('g.dimension');
    });

    // Remove any orphan traces
    traceSelection.exit().remove();
}

/**
 * Create / update parcat traces
 *
 * @param {Object} graphDiv
 * @param {Object} svg
 * @param {Array.<ParcatsModel>} parcatsModels
 * @param {Layout} layout
 */
module.exports = function(graphDiv, svg, parcatsModels, layout) {
    performPlot(parcatsModels, graphDiv, layout, svg);
};

/**
 * Function the returns the key property of an object for use with as D3 join function
 * @param d
 */
function key(d) {
    return d.key;
}

 /** True if a category view model is in the right-most display dimension
  * @param {CategoryViewModel} d */
function catInRightDim(d) {
    var numDims = d.parcatsViewModel.dimensions.length;
    var leftDimInd = d.parcatsViewModel.dimensions[numDims - 1].model.dimensionInd;
    return d.model.dimensionInd === leftDimInd;
}

/**
 * @param {PathViewModel} a
 * @param {PathViewModel} b
 */
function compareRawColor(a, b) {
    if(a.model.rawColor > b.model.rawColor) {
        return 1;
    } else if(a.model.rawColor < b.model.rawColor) {
        return -1;
    } else {
        return 0;
    }
}

/**
 * Handle path mouseover
 * @param {PathViewModel} d
 */
function mouseoverPath(d) {
    if(!d.parcatsViewModel.dragDimension) {
        // We're not currently dragging

        if(d.parcatsViewModel.hoverinfoItems.indexOf('skip') === -1) {
            // hoverinfo is not skip, so we at least style the paths and emit interaction events

            // Raise path to top
            Lib.raiseToTop(this);

            stylePathsHover(d3.select(this));

            // Emit hover event
            var points = buildPointsArrayForPath(d);
            var constraints = buildConstraintsForPath(d);
            d.parcatsViewModel.graphDiv.emit('plotly_hover', {
                points: points, event: d3.event, constraints: constraints
            });

            // Handle hover label
            if(d.parcatsViewModel.hoverinfoItems.indexOf('none') === -1) {
                // hoverinfo is a combination of 'count' and 'probability'

                // Mouse
                var hoverX = d3.mouse(this)[0];

                // Label
                var gd = d.parcatsViewModel.graphDiv;
                var trace = d.parcatsViewModel.trace;
                var fullLayout = gd._fullLayout;
                var rootBBox = fullLayout._paperdiv.node().getBoundingClientRect();
                var graphDivBBox = d.parcatsViewModel.graphDiv.getBoundingClientRect();

                // Find path center in path coordinates
                var pathCenterX,
                    pathCenterY,
                    dimInd;

                for(dimInd = 0; dimInd < (d.leftXs.length - 1); dimInd++) {
                    if(d.leftXs[dimInd] + d.dimWidths[dimInd] - 2 <= hoverX && hoverX <= d.leftXs[dimInd + 1] + 2) {
                        var leftDim = d.parcatsViewModel.dimensions[dimInd];
                        var rightDim = d.parcatsViewModel.dimensions[dimInd + 1];
                        pathCenterX = (leftDim.x + leftDim.width + rightDim.x) / 2;
                        pathCenterY = (d.topYs[dimInd] + d.topYs[dimInd + 1] + d.height) / 2;
                        break;
                    }
                }

                // Find path center in root coordinates
                var hoverCenterX = d.parcatsViewModel.x + pathCenterX;
                var hoverCenterY = d.parcatsViewModel.y + pathCenterY;

                var textColor = tinycolor.mostReadable(d.model.color, ['black', 'white']);

                var count = d.model.count;
                var prob = count / d.parcatsViewModel.model.count;
                var labels = {
                    countLabel: count,
                    probabilityLabel: prob.toFixed(3)
                };

                // Build hover text
                var hovertextParts = [];
                if(d.parcatsViewModel.hoverinfoItems.indexOf('count') !== -1) {
                    hovertextParts.push(['Count:', labels.countLabel].join(' '));
                }
                if(d.parcatsViewModel.hoverinfoItems.indexOf('probability') !== -1) {
                    hovertextParts.push(['P:', labels.probabilityLabel].join(' '));
                }

                var hovertext = hovertextParts.join('<br>');
                var mouseX = d3.mouse(gd)[0];

                Fx.loneHover({
                    trace: trace,
                    x: hoverCenterX - rootBBox.left + graphDivBBox.left,
                    y: hoverCenterY - rootBBox.top + graphDivBBox.top,
                    text: hovertext,
                    color: d.model.color,
                    borderColor: 'black',
                    fontFamily: 'Monaco, "Courier New", monospace',
                    fontSize: 10,
                    fontColor: textColor,
                    idealAlign: mouseX < hoverCenterX ? 'right' : 'left',
                    hovertemplate: (trace.line || {}).hovertemplate,
                    hovertemplateLabels: labels,
                    eventData: [{
                        data: trace._input,
                        fullData: trace,
                        count: count,
                        probability: prob
                    }]
                }, {
                    container: fullLayout._hoverlayer.node(),
                    outerContainer: fullLayout._paper.node(),
                    gd: gd
                });
            }
        }
    }
}

/**
 * Handle path mouseout
 * @param {PathViewModel} d
 */
function mouseoutPath(d) {
    if(!d.parcatsViewModel.dragDimension) {
        // We're not currently dragging
        stylePathsNoHover(d3.select(this));

        // Remove and hover label
        Fx.loneUnhover(d.parcatsViewModel.graphDiv._fullLayout._hoverlayer.node());

        // Restore path order
        d.parcatsViewModel.pathSelection.sort(compareRawColor);

        // Emit unhover event
        if(d.parcatsViewModel.hoverinfoItems.indexOf('skip') === -1) {
            var points = buildPointsArrayForPath(d);
            var constraints = buildConstraintsForPath(d);
            d.parcatsViewModel.graphDiv.emit('plotly_unhover', {
                points: points, event: d3.event, constraints: constraints
            });
        }
    }
}

/**
 * Build array of point objects for a path
 *
 * For use in click/hover events
 * @param {PathViewModel} d
 */
function buildPointsArrayForPath(d) {
    var points = [];
    var curveNumber = getTraceIndex(d.parcatsViewModel);

    for(var i = 0; i < d.model.valueInds.length; i++) {
        var pointNumber = d.model.valueInds[i];
        points.push({
            curveNumber: curveNumber,
            pointNumber: pointNumber
        });
    }
    return points;
}

/**
 * Build constraints object for a path
 *
 * For use in click/hover events
 * @param {PathViewModel} d
 */
function buildConstraintsForPath(d) {
    var constraints = {};
    var dimensions = d.parcatsViewModel.model.dimensions;

    // dimensions
    for(var i = 0; i < dimensions.length; i++) {
        var dimension = dimensions[i];
        var category = dimension.categories[d.model.categoryInds[i]];
        constraints[dimension.containerInd] = category.categoryValue;
    }

    // color
    if(d.model.rawColor !== undefined) {
        constraints.color = d.model.rawColor;
    }
    return constraints;
}

/**
 * Handle path click
 * @param {PathViewModel} d
 */
function clickPath(d) {
    if(d.parcatsViewModel.hoverinfoItems.indexOf('skip') === -1) {
        // hoverinfo it's skip, so interaction events aren't disabled
        var points = buildPointsArrayForPath(d);
        var constraints = buildConstraintsForPath(d);
        d.parcatsViewModel.graphDiv.emit('plotly_click', {
            points: points, event: d3.event, constraints: constraints
        });
    }
}

function stylePathsNoHover(pathSelection) {
    pathSelection
        .attr('fill', function(d) {
            return d.model.color;
        })
        .attr('fill-opacity', 0.6)
        .attr('stroke', 'lightgray')
        .attr('stroke-width', 0.2)
        .attr('stroke-opacity', 1.0);
}

function stylePathsHover(pathSelection) {
    pathSelection
        .attr('fill-opacity', 0.8)
        .attr('stroke', function(d) {
            return tinycolor.mostReadable(d.model.color, ['black', 'white']);
        })
        .attr('stroke-width', 0.3);
}

function styleCategoryHover(categorySelection) {
    categorySelection
        .select('rect.catrect')
        .attr('stroke', 'black')
        .attr('stroke-width', 2.5);
}

function styleCategoriesNoHover(categorySelection) {
    categorySelection
        .select('rect.catrect')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1);
}

function styleBandsHover(bandsSelection) {
    bandsSelection
        .attr('stroke', 'black')
        .attr('stroke-width', 1.5);
}

function styleBandsNoHover(bandsSelection) {
    bandsSelection
        .attr('stroke', 'black')
        .attr('stroke-width', 0.2)
        .attr('stroke-opacity', 1.0)
        .attr('fill-opacity', 1.0);
}

/**
 * Return selection of all paths that pass through the specified category
 * @param {CategoryBandViewModel} catBandViewModel
 */
function selectPathsThroughCategoryBandColor(catBandViewModel) {
    var allPaths = catBandViewModel.parcatsViewModel.pathSelection;
    var dimInd = catBandViewModel.categoryViewModel.model.dimensionInd;
    var catInd = catBandViewModel.categoryViewModel.model.categoryInd;

    return allPaths
        .filter(
            /** @param {PathViewModel} pathViewModel */
            function(pathViewModel) {
                return pathViewModel.model.categoryInds[dimInd] === catInd &&
                    pathViewModel.model.color === catBandViewModel.color;
            });
}


/**
 * Perform hover styling for all paths that pass though the specified band element's category
 *
 * @param {HTMLElement} bandElement
 *  HTML element for band
 *
 */
function styleForCategoryHovermode(bandElement) {
    // Get all bands in the current category
    var bandSel = d3.select(bandElement.parentNode).selectAll('rect.bandrect');

    // Raise and style paths
    bandSel.each(function(bvm) {
        var paths = selectPathsThroughCategoryBandColor(bvm);
        stylePathsHover(paths);
        paths.each(function() {
            // Raise path to top
            Lib.raiseToTop(this);
        });
    });

    // Style category
    styleCategoryHover(d3.select(bandElement.parentNode));
}

/**
 * Perform hover styling for all paths that pass though the category of the specified band element and share the
 * same color
 *
 * @param {HTMLElement} bandElement
 *  HTML element for band
 *
 */
function styleForColorHovermode(bandElement) {
    var bandViewModel = d3.select(bandElement).datum();
    var catPaths = selectPathsThroughCategoryBandColor(bandViewModel);
    stylePathsHover(catPaths);
    catPaths.each(function() {
        // Raise path to top
        Lib.raiseToTop(this);
    });

    // Style category for drag
    d3.select(bandElement.parentNode)
        .selectAll('rect.bandrect')
        .filter(function(b) {return b.color === bandViewModel.color;})
        .each(function() {
            Lib.raiseToTop(this);
            styleBandsHover(d3.select(this));
        });
}


/**
 * @param {HTMLElement} bandElement
 *  HTML element for band
 * @param eventName
 *  Event name (plotly_hover or plotly_click)
 * @param event
 *  Mouse Event
 */
function emitPointsEventCategoryHovermode(bandElement, eventName, event) {
    // Get all bands in the current category
    var bandViewModel = d3.select(bandElement).datum();
    var categoryModel = bandViewModel.categoryViewModel.model;
    var gd = bandViewModel.parcatsViewModel.graphDiv;
    var bandSel = d3.select(bandElement.parentNode).selectAll('rect.bandrect');

    var points = [];
    bandSel.each(function(bvm) {
        var paths = selectPathsThroughCategoryBandColor(bvm);
        paths.each(function(pathViewModel) {
            // Extend points array
            Array.prototype.push.apply(points, buildPointsArrayForPath(pathViewModel));
        });
    });

    var constraints = {};
    constraints[categoryModel.dimensionInd] = categoryModel.categoryValue;
    gd.emit(eventName, {
        points: points, event: event, constraints: constraints
    });
}

/**
 * @param {HTMLElement} bandElement
 *  HTML element for band
 * @param eventName
 *  Event name (plotly_hover or plotly_click)
 * @param event
 *  Mouse Event
 */
function emitPointsEventColorHovermode(bandElement, eventName, event) {
    var bandViewModel = d3.select(bandElement).datum();
    var categoryModel = bandViewModel.categoryViewModel.model;
    var gd = bandViewModel.parcatsViewModel.graphDiv;
    var paths = selectPathsThroughCategoryBandColor(bandViewModel);

    var points = [];
    paths.each(function(pathViewModel) {
        // Extend points array
        Array.prototype.push.apply(points, buildPointsArrayForPath(pathViewModel));
    });

    var constraints = {};
    constraints[categoryModel.dimensionInd] = categoryModel.categoryValue;
    // color
    if(bandViewModel.rawColor !== undefined) {
        constraints.color = bandViewModel.rawColor;
    }
    gd.emit(eventName, {
        points: points, event: event, constraints: constraints
    });
}

/**
 * Create hover label for a band element's category (for use when hoveron === 'category')
 *
 * @param {ClientRect} rootBBox
 *  Client bounding box for root of figure
 * @param {HTMLElement} bandElement
 *  HTML element for band
 *
 */
function createHoverLabelForCategoryHovermode(rootBBox, bandElement) {
    // Selections
    var rectSelection = d3.select(bandElement.parentNode).select('rect.catrect');
    var rectBoundingBox = rectSelection.node().getBoundingClientRect();

    // Models
    /** @type {CategoryViewModel} */
    var catViewModel = rectSelection.datum();
    var parcatsViewModel = catViewModel.parcatsViewModel;
    var dimensionModel = parcatsViewModel.model.dimensions[catViewModel.model.dimensionInd];
    var trace = parcatsViewModel.trace;

    // Positions
    var hoverCenterY = rectBoundingBox.top + rectBoundingBox.height / 2;
    var hoverCenterX,
        hoverLabelIdealAlign;

    if(parcatsViewModel.dimensions.length > 1 &&
        dimensionModel.displayInd === parcatsViewModel.dimensions.length - 1) {
        // right most dimension
        hoverCenterX = rectBoundingBox.left;
        hoverLabelIdealAlign = 'left';
    } else {
        hoverCenterX = rectBoundingBox.left + rectBoundingBox.width;
        hoverLabelIdealAlign = 'right';
    }

    var count = catViewModel.model.count;
    var catLabel = catViewModel.model.categoryLabel;
    var prob = count / catViewModel.parcatsViewModel.model.count;
    var labels = {
        countLabel: count,
        categoryLabel: catLabel,
        probabilityLabel: prob.toFixed(3)
    };

    // Hover label text
    var hoverinfoParts = [];
    if(catViewModel.parcatsViewModel.hoverinfoItems.indexOf('count') !== -1) {
        hoverinfoParts.push(['Count:', labels.countLabel].join(' '));
    }
    if(catViewModel.parcatsViewModel.hoverinfoItems.indexOf('probability') !== -1) {
        hoverinfoParts.push(['P(' + labels.categoryLabel + '):', labels.probabilityLabel].join(' '));
    }

    var hovertext = hoverinfoParts.join('<br>');
    return {
        trace: trace,
        x: hoverCenterX - rootBBox.left,
        y: hoverCenterY - rootBBox.top,
        text: hovertext,
        color: 'lightgray',
        borderColor: 'black',
        fontFamily: 'Monaco, "Courier New", monospace',
        fontSize: 12,
        fontColor: 'black',
        idealAlign: hoverLabelIdealAlign,
        hovertemplate: trace.hovertemplate,
        hovertemplateLabels: labels,
        eventData: [{
            data: trace._input,
            fullData: trace,
            count: count,
            category: catLabel,
            probability: prob
        }]
    };
}

/**
 * Create hover label for a band element's category (for use when hoveron === 'category')
 *
 * @param {ClientRect} rootBBox
 *  Client bounding box for root of figure
 * @param {HTMLElement} bandElement
 *  HTML element for band
 *
 */
function createHoverLabelForDimensionHovermode(rootBBox, bandElement) {
    var allHoverlabels = [];

    d3.select(bandElement.parentNode.parentNode)
        .selectAll('g.category')
        .select('rect.catrect')
        .each(function() {
            var bandNode = this;
            allHoverlabels.push(createHoverLabelForCategoryHovermode(rootBBox, bandNode));
        });

    return allHoverlabels;
}

/**
 * Create hover labels for a band element's category (for use when hoveron === 'dimension')
 *
 * @param {ClientRect} rootBBox
 *  Client bounding box for root of figure
 * @param {HTMLElement} bandElement
 *  HTML element for band
 *
 */
function createHoverLabelForColorHovermode(rootBBox, bandElement) {
    var bandBoundingBox = bandElement.getBoundingClientRect();

    // Models
    /** @type {CategoryBandViewModel} */
    var bandViewModel = d3.select(bandElement).datum();
    var catViewModel = bandViewModel.categoryViewModel;
    var parcatsViewModel = catViewModel.parcatsViewModel;
    var dimensionModel = parcatsViewModel.model.dimensions[catViewModel.model.dimensionInd];
    var trace = parcatsViewModel.trace;

    // positions
    var hoverCenterY = bandBoundingBox.y + bandBoundingBox.height / 2;

    var hoverCenterX,
        hoverLabelIdealAlign;
    if(parcatsViewModel.dimensions.length > 1 &&
        dimensionModel.displayInd === parcatsViewModel.dimensions.length - 1) {
        // right most dimension
        hoverCenterX = bandBoundingBox.left;
        hoverLabelIdealAlign = 'left';
    } else {
        hoverCenterX = bandBoundingBox.left + bandBoundingBox.width;
        hoverLabelIdealAlign = 'right';
    }

    // Labels
    var catLabel = catViewModel.model.categoryLabel;

    // Counts
    var totalCount = bandViewModel.parcatsViewModel.model.count;

    var bandColorCount = 0;
    bandViewModel.categoryViewModel.bands.forEach(function(b) {
        if(b.color === bandViewModel.color) {
            bandColorCount += b.count;
        }
    });

    var catCount = catViewModel.model.count;

    var colorCount = 0;
    parcatsViewModel.pathSelection.each(
        /** @param {PathViewModel} pathViewModel */
        function(pathViewModel) {
            if(pathViewModel.model.color === bandViewModel.color) {
                colorCount += pathViewModel.model.count;
            }
        });

    var pColorAndCat = bandColorCount / totalCount;
    var pCatGivenColor = bandColorCount / colorCount;
    var pColorGivenCat = bandColorCount / catCount;

    var labels = {
        countLabel: totalCount,
        categoryLabel: catLabel,
        probabilityLabel: pColorAndCat.toFixed(3)
    };

    // Hover label text
    var hoverinfoParts = [];
    if(catViewModel.parcatsViewModel.hoverinfoItems.indexOf('count') !== -1) {
        hoverinfoParts.push(['Count:', labels.countLabel].join(' '));
    }
    if(catViewModel.parcatsViewModel.hoverinfoItems.indexOf('probability') !== -1) {
        hoverinfoParts.push('P(color ∩ ' + catLabel + '): ' + labels.probabilityLabel);
        hoverinfoParts.push('P(' + catLabel + ' | color): ' + pCatGivenColor.toFixed(3));
        hoverinfoParts.push('P(color | ' + catLabel + '): ' + pColorGivenCat.toFixed(3));
    }

    var hovertext = hoverinfoParts.join('<br>');

    // Compute text color
    var textColor = tinycolor.mostReadable(bandViewModel.color, ['black', 'white']);

    return {
        trace: trace,
        x: hoverCenterX - rootBBox.left,
        y: hoverCenterY - rootBBox.top,
        // name: 'NAME',
        text: hovertext,
        color: bandViewModel.color,
        borderColor: 'black',
        fontFamily: 'Monaco, "Courier New", monospace',
        fontColor: textColor,
        fontSize: 10,
        idealAlign: hoverLabelIdealAlign,
        hovertemplate: trace.hovertemplate,
        hovertemplateLabels: labels,
        eventData: [{
            data: trace._input,
            fullData: trace,
            category: catLabel,
            count: totalCount,
            probability: pColorAndCat,
            categorycount: catCount,
            colorcount: colorCount,
            bandcolorcount: bandColorCount
        }]
    };
}

/**
 * Handle dimension mouseover
 * @param {CategoryBandViewModel} bandViewModel
 */
function mouseoverCategoryBand(bandViewModel) {
    if(!bandViewModel.parcatsViewModel.dragDimension) {
        // We're not currently dragging

        if(bandViewModel.parcatsViewModel.hoverinfoItems.indexOf('skip') === -1) {
            // hoverinfo is not skip, so we at least style the bands and emit interaction events

            // Mouse
            var mouseY = d3.mouse(this)[1];
            if(mouseY < -1) {
                // Hover is above above the category rectangle (probably the dimension title text)
                return;
            }

            var gd = bandViewModel.parcatsViewModel.graphDiv;
            var fullLayout = gd._fullLayout;
            var rootBBox = fullLayout._paperdiv.node().getBoundingClientRect();
            var hoveron = bandViewModel.parcatsViewModel.hoveron;

            /** @type {HTMLElement} */
            var bandElement = this;

            // Handle style and events
            if(hoveron === 'color') {
                styleForColorHovermode(bandElement);
                emitPointsEventColorHovermode(bandElement, 'plotly_hover', d3.event);
            } else {
                styleForCategoryHovermode(bandElement);
                emitPointsEventCategoryHovermode(bandElement, 'plotly_hover', d3.event);
            }

            // Handle hover label
            if(bandViewModel.parcatsViewModel.hoverinfoItems.indexOf('none') === -1) {
                var hoverItems;
                if(hoveron === 'category') {
                    hoverItems = createHoverLabelForCategoryHovermode(rootBBox, bandElement);
                } else if(hoveron === 'color') {
                    hoverItems = createHoverLabelForColorHovermode(rootBBox, bandElement);
                } else if(hoveron === 'dimension') {
                    hoverItems = createHoverLabelForDimensionHovermode(rootBBox, bandElement);
                }

                if(hoverItems) {
                    Fx.loneHover(hoverItems, {
                        container: fullLayout._hoverlayer.node(),
                        outerContainer: fullLayout._paper.node(),
                        gd: gd
                    });
                }
            }
        }
    }
}


/**
 * Handle dimension mouseover
 * @param {CategoryBandViewModel} bandViewModel
 */
function mouseoutCategory(bandViewModel) {
    var parcatsViewModel = bandViewModel.parcatsViewModel;

    if(!parcatsViewModel.dragDimension) {
        // We're not dragging anything

        // Reset unhovered styles
        stylePathsNoHover(parcatsViewModel.pathSelection);
        styleCategoriesNoHover(parcatsViewModel.dimensionSelection.selectAll('g.category'));
        styleBandsNoHover(parcatsViewModel.dimensionSelection.selectAll('g.category').selectAll('rect.bandrect'));

        // Remove hover label
        Fx.loneUnhover(parcatsViewModel.graphDiv._fullLayout._hoverlayer.node());

        // Restore path order
        parcatsViewModel.pathSelection.sort(compareRawColor);

        // Emit unhover event
        if(parcatsViewModel.hoverinfoItems.indexOf('skip') === -1) {
            var hoveron = bandViewModel.parcatsViewModel.hoveron;
            var bandElement = this;

            // Handle style and events
            if(hoveron === 'color') {
                emitPointsEventColorHovermode(bandElement, 'plotly_unhover', d3.event);
            } else {
                emitPointsEventCategoryHovermode(bandElement, 'plotly_unhover', d3.event);
            }
        }
    }
}


/**
 * Handle dimension drag start
 * @param {DimensionViewModel} d
 */
function dragDimensionStart(d) {
    // Check if dragging is supported
    if(d.parcatsViewModel.arrangement === 'fixed') {
        return;
    }

    // Save off initial drag indexes for dimension
    d.dragDimensionDisplayInd = d.model.displayInd;
    d.initialDragDimensionDisplayInds = d.parcatsViewModel.model.dimensions.map(function(d) {return d.displayInd;});
    d.dragHasMoved = false;

    // Check for category hit
    d.dragCategoryDisplayInd = null;
    d3.select(this)
        .selectAll('g.category')
        .select('rect.catrect')
        .each(
            /** @param {CategoryViewModel} catViewModel */
            function(catViewModel) {
                var catMouseX = d3.mouse(this)[0];
                var catMouseY = d3.mouse(this)[1];


                if(-2 <= catMouseX && catMouseX <= catViewModel.width + 2 &&
                    -2 <= catMouseY && catMouseY <= catViewModel.height + 2) {
                    // Save off initial drag indexes for categories
                    d.dragCategoryDisplayInd = catViewModel.model.displayInd;
                    d.initialDragCategoryDisplayInds = d.model.categories.map(function(c) {
                        return c.displayInd;
                    });

                    // Initialize categories dragY to be the current y position
                    catViewModel.model.dragY = catViewModel.y;

                    // Raise category
                    Lib.raiseToTop(this.parentNode);

                    // Get band element
                    d3.select(this.parentNode)
                        .selectAll('rect.bandrect')
                        /** @param {CategoryBandViewModel} bandViewModel */
                        .each(function(bandViewModel) {
                            if(bandViewModel.y < catMouseY && catMouseY <= bandViewModel.y + bandViewModel.height) {
                                d.potentialClickBand = this;
                            }
                        });
                }
            });

    // Update toplevel drag dimension
    d.parcatsViewModel.dragDimension = d;

    // Remove hover label if any
    Fx.loneUnhover(d.parcatsViewModel.graphDiv._fullLayout._hoverlayer.node());
}

/**
 * Handle dimension drag
 * @param {DimensionViewModel} d
 */
function dragDimension(d) {
    // Check if dragging is supported
    if(d.parcatsViewModel.arrangement === 'fixed') {
        return;
    }

    d.dragHasMoved = true;

    if(d.dragDimensionDisplayInd === null) {
        return;
    }

    var dragDimInd = d.dragDimensionDisplayInd;
    var prevDimInd = dragDimInd - 1;
    var nextDimInd = dragDimInd + 1;

    var dragDimension = d.parcatsViewModel
        .dimensions[dragDimInd];

    // Update category
    if(d.dragCategoryDisplayInd !== null) {
        var dragCategory = dragDimension.categories[d.dragCategoryDisplayInd];

        // Update dragY by dy
        dragCategory.model.dragY += d3.event.dy;
        var categoryY = dragCategory.model.dragY;

        // Check for category drag swaps
        var catDisplayInd = dragCategory.model.displayInd;
        var dimCategoryViews = dragDimension.categories;

        var catAbove = dimCategoryViews[catDisplayInd - 1];
        var catBelow = dimCategoryViews[catDisplayInd + 1];

        // Check for overlap above
        if(catAbove !== undefined) {
            if(categoryY < (catAbove.y + catAbove.height / 2.0)) {
                // Swap display inds
                dragCategory.model.displayInd = catAbove.model.displayInd;
                catAbove.model.displayInd = catDisplayInd;
            }
        }

        if(catBelow !== undefined) {
            if((categoryY + dragCategory.height) > (catBelow.y + catBelow.height / 2.0)) {
                // Swap display inds
                dragCategory.model.displayInd = catBelow.model.displayInd;
                catBelow.model.displayInd = catDisplayInd;
            }
        }

        // Update category drag display index
        d.dragCategoryDisplayInd = dragCategory.model.displayInd;
    }

    // Update dimension position
    if(d.dragCategoryDisplayInd === null || d.parcatsViewModel.arrangement === 'freeform') {
        dragDimension.model.dragX = d3.event.x;

        // Check for dimension swaps
        var prevDimension = d.parcatsViewModel.dimensions[prevDimInd];
        var nextDimension = d.parcatsViewModel.dimensions[nextDimInd];

        if(prevDimension !== undefined) {
            if(dragDimension.model.dragX < (prevDimension.x + prevDimension.width)) {
                // Swap display inds
                dragDimension.model.displayInd = prevDimension.model.displayInd;
                prevDimension.model.displayInd = dragDimInd;
            }
        }

        if(nextDimension !== undefined) {
            if((dragDimension.model.dragX + dragDimension.width) > nextDimension.x) {
                // Swap display inds
                dragDimension.model.displayInd = nextDimension.model.displayInd;
                nextDimension.model.displayInd = d.dragDimensionDisplayInd;
            }
        }

        // Update drag display index
        d.dragDimensionDisplayInd = dragDimension.model.displayInd;
    }

    // Update view models
    updateDimensionViewModels(d.parcatsViewModel);
    updatePathViewModels(d.parcatsViewModel);

    // Update svg geometry
    updateSvgCategories(d.parcatsViewModel);
    updateSvgPaths(d.parcatsViewModel);
}


/**
 * Handle dimension drag end
 * @param {DimensionViewModel} d
 */
function dragDimensionEnd(d) {
    // Check if dragging is supported
    if(d.parcatsViewModel.arrangement === 'fixed') {
        return;
    }

    if(d.dragDimensionDisplayInd === null) {
        return;
    }

    d3.select(this).selectAll('text').attr('font-weight', 'normal');

    // Compute restyle command
    // -----------------------
    var restyleData = {};
    var traceInd = getTraceIndex(d.parcatsViewModel);

    // ### Handle dimension reordering ###
    var finalDragDimensionDisplayInds = d.parcatsViewModel.model.dimensions.map(function(d) {return d.displayInd;});
    var anyDimsReordered = d.initialDragDimensionDisplayInds.some(function(initDimDisplay, dimInd) {
        return initDimDisplay !== finalDragDimensionDisplayInds[dimInd];
    });

    if(anyDimsReordered) {
        finalDragDimensionDisplayInds.forEach(function(finalDimDisplay, dimInd) {
            var containerInd = d.parcatsViewModel.model.dimensions[dimInd].containerInd;
            restyleData['dimensions[' + containerInd + '].displayindex'] = finalDimDisplay;
        });
    }

    // ### Handle category reordering ###
    var anyCatsReordered = false;
    if(d.dragCategoryDisplayInd !== null) {
        var finalDragCategoryDisplayInds = d.model.categories.map(function(c) {
            return c.displayInd;
        });

        anyCatsReordered = d.initialDragCategoryDisplayInds.some(function(initCatDisplay, catInd) {
            return initCatDisplay !== finalDragCategoryDisplayInds[catInd];
        });

        if(anyCatsReordered) {
            // Sort a shallow copy of the category models by display index
            var sortedCategoryModels = d.model.categories.slice().sort(
                function(a, b) { return a.displayInd - b.displayInd; });

            // Get new categoryarray and ticktext values
            var newCategoryArray = sortedCategoryModels.map(function(v) { return v.categoryValue; });
            var newCategoryLabels = sortedCategoryModels.map(function(v) { return v.categoryLabel; });

            restyleData['dimensions[' + d.model.containerInd + '].categoryarray'] = [newCategoryArray];
            restyleData['dimensions[' + d.model.containerInd + '].ticktext'] = [newCategoryLabels];
            restyleData['dimensions[' + d.model.containerInd + '].categoryorder'] = 'array';
        }
    }

    // Handle potential click event
    // ----------------------------
    if(d.parcatsViewModel.hoverinfoItems.indexOf('skip') === -1) {
        if(!d.dragHasMoved && d.potentialClickBand) {
            if(d.parcatsViewModel.hoveron === 'color') {
                emitPointsEventColorHovermode(d.potentialClickBand, 'plotly_click', d3.event.sourceEvent);
            } else {
                emitPointsEventCategoryHovermode(d.potentialClickBand, 'plotly_click', d3.event.sourceEvent);
            }
        }
    }

    // Nullify drag states
    // -------------------
    d.model.dragX = null;
    if(d.dragCategoryDisplayInd !== null) {
        var dragCategory = d.parcatsViewModel
            .dimensions[d.dragDimensionDisplayInd]
            .categories[d.dragCategoryDisplayInd];

        dragCategory.model.dragY = null;
        d.dragCategoryDisplayInd = null;
    }

    d.dragDimensionDisplayInd = null;
    d.parcatsViewModel.dragDimension = null;
    d.dragHasMoved = null;
    d.potentialClickBand = null;

    // Update view models
    // ------------------
    updateDimensionViewModels(d.parcatsViewModel);
    updatePathViewModels(d.parcatsViewModel);

    // Perform transition
    // ------------------
    var transition = d3.transition()
        .duration(300)
        .ease('cubic-in-out');

    transition
        .each(function() {
            updateSvgCategories(d.parcatsViewModel, true);
            updateSvgPaths(d.parcatsViewModel, true);
        })
        .each('end', function() {
            if(anyDimsReordered || anyCatsReordered) {
                // Perform restyle if the order of categories or dimensions changed
                Plotly.restyle(d.parcatsViewModel.graphDiv, restyleData, [traceInd]);
            }
        });
}

/**
 *
 * @param {ParcatsViewModel} parcatsViewModel
 */
function getTraceIndex(parcatsViewModel) {
    var traceInd;
    var allTraces = parcatsViewModel.graphDiv._fullData;
    for(var i = 0; i < allTraces.length; i++) {
        if(parcatsViewModel.key === allTraces[i].uid) {
            traceInd = i;
            break;
        }
    }
    return traceInd;
}

/** Update the svg paths for view model
 * @param {ParcatsViewModel} parcatsViewModel
 * @param {boolean} hasTransition Whether to update element with transition
 */
function updateSvgPaths(parcatsViewModel, hasTransition) {
    if(hasTransition === undefined) {
        hasTransition = false;
    }

    function transition(selection) {
        return hasTransition ? selection.transition() : selection;
    }

    // Update binding
    parcatsViewModel.pathSelection.data(function(d) {
        return d.paths;
    }, key);

    // Update paths
    transition(parcatsViewModel.pathSelection).attr('d', function(d) {
        return d.svgD;
    });
}

/** Update the svg paths for view model
 * @param {ParcatsViewModel} parcatsViewModel
 * @param {boolean} hasTransition Whether to update element with transition
 */
function updateSvgCategories(parcatsViewModel, hasTransition) {
    if(hasTransition === undefined) {
        hasTransition = false;
    }

    function transition(selection) {
        return hasTransition ? selection.transition() : selection;
    }

    // Update binding
    parcatsViewModel.dimensionSelection
        .data(function(d) {
            return d.dimensions;
        }, key);

    var categorySelection = parcatsViewModel.dimensionSelection
        .selectAll('g.category')
        .data(function(d) {return d.categories;}, key);

    // Update dimension position
    transition(parcatsViewModel.dimensionSelection)
        .attr('transform', function(d) {
            return 'translate(' + d.x + ', 0)';
        });

    // Update category position
    transition(categorySelection)
        .attr('transform', function(d) {
            return 'translate(0, ' + d.y + ')';
        });

    var dimLabelSelection = categorySelection.select('.dimlabel');

    // ### Update dimension label
    // Only the top-most display category should have the dimension label
    dimLabelSelection
        .text(function(d, i) {
            if(i === 0) {
                // Add dimension label above topmost category
                return d.parcatsViewModel.model.dimensions[d.model.dimensionInd].dimensionLabel;
            } else {
                return null;
            }
        });

    // Update category label
    // Categories in the right-most display dimension have their labels on
    // the right, all others on the left
    var catLabelSelection = categorySelection.select('.catlabel');
    catLabelSelection
        .attr('text-anchor',
            function(d) {
                if(catInRightDim(d)) {
                    // Place label to the right of category
                    return 'start';
                } else {
                    // Place label to the left of category
                    return 'end';
                }
            })
        .attr('x',
            function(d) {
                if(catInRightDim(d)) {
                    // Place label to the right of category
                    return d.width + 5;
                } else {
                    // Place label to the left of category
                    return -5;
                }
            })
        .each(function(d) {
            // Update attriubutes of <tspan> elements
            var newX;
            var newAnchor;
            if(catInRightDim(d)) {
                // Place label to the right of category
                newX = d.width + 5;
                newAnchor = 'start';
            } else {
                // Place label to the left of category
                newX = -5;
                newAnchor = 'end';
            }
            d3.select(this)
                .selectAll('tspan')
                .attr('x', newX)
                .attr('text-anchor', newAnchor);
        });

    // Update bands
    // Initialize color band rects
    var bandSelection = categorySelection
        .selectAll('rect.bandrect')
        .data(
            /** @param {CategoryViewModel} catViewModel*/
            function(catViewModel) {
                return catViewModel.bands;
            }, key);

    var bandsSelectionEnter = bandSelection.enter()
        .append('rect')
        .attr('class', 'bandrect')
        .attr('cursor', 'move')
        .attr('stroke-opacity', 0)
        .attr('fill', function(d) {
            return d.color;
        })
        .attr('fill-opacity', 0);

    bandSelection
        .attr('fill', function(d) {
            return d.color;
        })
        .attr('width', function(d) {
            return d.width;
        })
        .attr('height', function(d) {
            return d.height;
        })
        .attr('y', function(d) {
            return d.y;
        });

    styleBandsNoHover(bandsSelectionEnter);

    // Raise bands to the top
    bandSelection.each(function() {Lib.raiseToTop(this);});

    // Remove unused bands
    bandSelection.exit().remove();
}

/**
 * Create a ParcatsViewModel traces
 * @param {Object} graphDiv
 *  Top-level graph div element
 * @param {Layout} layout
 *  SVG layout object
 * @param {Array.<ParcatsModel>} wrappedParcatsModel
 *  Wrapped ParcatsModel for this trace
 * @return {ParcatsViewModel}
 */
function createParcatsViewModel(graphDiv, layout, wrappedParcatsModel) {
    // Unwrap model
    var parcatsModel = wrappedParcatsModel[0];

    // Compute margin
    var margin = layout.margin || {l: 80, r: 80, t: 100, b: 80};

    // Compute pixel position/extents
    var trace = parcatsModel.trace;
    var domain = trace.domain;
    var figureWidth = layout.width;
    var figureHeight = layout.height;
    var traceWidth = Math.floor(figureWidth * (domain.x[1] - domain.x[0]));
    var traceHeight = Math.floor(figureHeight * (domain.y[1] - domain.y[0]));
    var traceX = domain.x[0] * figureWidth + margin.l;
    var traceY = layout.height - domain.y[1] * layout.height + margin.t;

    // Handle path shape
    // -----------------
    var pathShape = trace.line.shape;

    // Handle hover info
    // -----------------
    var hoverinfoItems;
    if(trace.hoverinfo === 'all') {
        hoverinfoItems = ['count', 'probability'];
    } else {
        hoverinfoItems = (trace.hoverinfo || '').split('+');
    }

    // Construct parcatsViewModel
    // --------------------------
    var parcatsViewModel = {
        trace: trace,
        key: trace.uid,
        model: parcatsModel,
        x: traceX,
        y: traceY,
        width: traceWidth,
        height: traceHeight,
        hoveron: trace.hoveron,
        hoverinfoItems: hoverinfoItems,
        arrangement: trace.arrangement,
        bundlecolors: trace.bundlecolors,
        sortpaths: trace.sortpaths,
        labelfont: trace.labelfont,
        categorylabelfont: trace.tickfont,
        pathShape: pathShape,
        dragDimension: null,
        margin: margin,
        paths: [],
        dimensions: [],
        graphDiv: graphDiv,
        traceSelection: null,
        pathSelection: null,
        dimensionSelection: null
    };

    // Update dimension view models if we have at least 1 dimension
    if(parcatsModel.dimensions) {
        updateDimensionViewModels(parcatsViewModel);

        // Update path view models if we have at least 2 dimensions
        updatePathViewModels(parcatsViewModel);
    }
    // Inside a categories view model
    return parcatsViewModel;
}

/**
 * Build the SVG string to represents a parallel categories path
 * @param {Array.<Number>} leftXPositions
 *  Array of the x positions of the left edge of each dimension (in display order)
 * @param {Array.<Number>} pathYs
 *  Array of the y positions of the top of the path at each dimension (in display order)
 * @param {Array.<Number>} dimWidths
 *  Array of the widths of each dimension in display order
 * @param {Number} pathHeight
 *  The height of the path in pixels
 * @param {Number} curvature
 *  The curvature factor for the path. 0 results in a straight line and values greater than zero result in curved paths
 * @return {string}
 */
function buildSvgPath(leftXPositions, pathYs, dimWidths, pathHeight, curvature) {
    // Compute the x midpoint of each path segment
    var xRefPoints1 = [];
    var xRefPoints2 = [];
    var refInterpolator;
    var d;

    for(d = 0; d < dimWidths.length - 1; d++) {
        refInterpolator = d3.interpolateNumber(dimWidths[d] + leftXPositions[d], leftXPositions[d + 1]);
        xRefPoints1.push(refInterpolator(curvature));
        xRefPoints2.push(refInterpolator(1 - curvature));
    }

    // Move to top of path on left edge of left-most category
    var svgD = 'M ' + leftXPositions[0] + ',' + pathYs[0];

    // Horizontal line to right edge
    svgD += 'l' + dimWidths[0] + ',0 ';

    // Horizontal line to right edge
    for(d = 1; d < dimWidths.length; d++) {
        // Curve to left edge of category
        svgD += 'C' + xRefPoints1[d - 1] + ',' + pathYs[d - 1] +
              ' ' + xRefPoints2[d - 1] + ',' + pathYs[d] +
              ' ' + leftXPositions[d] + ',' + pathYs[d];

        // svgD += 'L' + leftXPositions[d] + ',' + pathYs[d];

        // Horizontal line to right edge
        svgD += 'l' + dimWidths[d] + ',0 ';
    }

    // Line down
    svgD += 'l' + '0,' + pathHeight + ' ';

    // Line to left edge of right-most category
    svgD += 'l -' + dimWidths[dimWidths.length - 1] + ',0 ';

    for(d = dimWidths.length - 2; d >= 0; d--) {
        // Curve to right edge of category
        svgD += 'C' + xRefPoints2[d] + ',' + (pathYs[d + 1] + pathHeight) +
             ' ' + xRefPoints1[d] + ',' + (pathYs[d] + pathHeight) +
             ' ' + (leftXPositions[d] + dimWidths[d]) + ',' + (pathYs[d] + pathHeight);

        // svgD += 'L' + (leftXPositions[d] + dimWidths[d]) + ',' + (pathYs[d] + pathHeight);

        // Horizontal line to right edge
        svgD += 'l-' + dimWidths[d] + ',0 ';
    }

    // Close path
    svgD += 'Z';
    return svgD;
}

/**
 * Update the path view models based on the dimension view models in a ParcatsViewModel
 *
 * @param {ParcatsViewModel} parcatsViewModel
 *  View model for trace
 */
function updatePathViewModels(parcatsViewModel) {
    // Initialize an array of the y position of the top of the next path to be added to each category.
    //
    // nextYPositions[d][c] is the y position of the next path through category with index c of dimension with index d
    var dimensionViewModels = parcatsViewModel.dimensions;
    var parcatsModel = parcatsViewModel.model;
    var nextYPositions = dimensionViewModels.map(
        function(d) {
            return d.categories.map(
                function(c) {
                    return c.y;
                });
        });

    // Array from category index to category display index for each true dimension index
    var catToDisplayIndPerDim = parcatsViewModel.model.dimensions.map(
        function(d) {
            return d.categories.map(function(c) {return c.displayInd;});
        });

    // Array from true dimension index to dimension display index
    var dimToDisplayInd = parcatsViewModel.model.dimensions.map(function(d) {return d.displayInd;});
    var displayToDimInd = parcatsViewModel.dimensions.map(function(d) {return d.model.dimensionInd;});

    // Array of the x position of the left edge of the rectangles for each dimension
    var leftXPositions = dimensionViewModels.map(
        function(d) {
            return d.x;
        });

    // Compute dimension widths
    var dimWidths = dimensionViewModels.map(function(d) {return d.width;});

    // Build sorted Array of PathModel objects
    var pathModels = [];
    for(var p in parcatsModel.paths) {
        if(parcatsModel.paths.hasOwnProperty(p)) {
            pathModels.push(parcatsModel.paths[p]);
        }
    }

    // Compute category display inds to use for sorting paths
    function pathDisplayCategoryInds(pathModel) {
        var dimensionInds = pathModel.categoryInds.map(function(catInd, dimInd) {return catToDisplayIndPerDim[dimInd][catInd];});
        var displayInds = displayToDimInd.map(function(dimInd) {
            return dimensionInds[dimInd];
        });
        return displayInds;
    }

    // Sort in ascending order by display index array
    pathModels.sort(function(v1, v2) {
        // Build display inds for each path
        var sortArray1 = pathDisplayCategoryInds(v1);
        var sortArray2 = pathDisplayCategoryInds(v2);

        // Handle path sort order
        if(parcatsViewModel.sortpaths === 'backward') {
            sortArray1.reverse();
            sortArray2.reverse();
        }

        // Append the first value index of the path to break ties
        sortArray1.push(v1.valueInds[0]);
        sortArray2.push(v2.valueInds[0]);

        // Handle color bundling
        if(parcatsViewModel.bundlecolors) {
            // Prepend sort array with the raw color value
            sortArray1.unshift(v1.rawColor);
            sortArray2.unshift(v2.rawColor);
        }

        // colors equal, sort by display categories
        if(sortArray1 < sortArray2) {
            return -1;
        }
        if(sortArray1 > sortArray2) {
            return 1;
        }

        return 0;
    });

    // Create path models
    var pathViewModels = new Array(pathModels.length);
    var totalCount = dimensionViewModels[0].model.count;
    var totalHeight = dimensionViewModels[0].categories
        .map(function(c) { return c.height; })
        .reduce(function(v1, v2) { return v1 + v2; });


    for(var pathNumber = 0; pathNumber < pathModels.length; pathNumber++) {
        var pathModel = pathModels[pathNumber];

        var pathHeight;
        if(totalCount > 0) {
            pathHeight = totalHeight * (pathModel.count / totalCount);
        } else {
            pathHeight = 0;
        }

        // Build path y coords
        var pathYs = new Array(nextYPositions.length);
        for(var d = 0; d < pathModel.categoryInds.length; d++) {
            var catInd = pathModel.categoryInds[d];
            var catDisplayInd = catToDisplayIndPerDim[d][catInd];
            var dimDisplayInd = dimToDisplayInd[d];

            // Update next y position
            pathYs[dimDisplayInd] = nextYPositions[dimDisplayInd][catDisplayInd];
            nextYPositions[dimDisplayInd][catDisplayInd] += pathHeight;

            // Update category color information
            var catViewModle = parcatsViewModel.dimensions[dimDisplayInd].categories[catDisplayInd];
            var numBands = catViewModle.bands.length;
            var lastCatBand = catViewModle.bands[numBands - 1];

            if(lastCatBand === undefined || pathModel.rawColor !== lastCatBand.rawColor) {
                // Create a new band
                var bandY = lastCatBand === undefined ? 0 : lastCatBand.y + lastCatBand.height;
                catViewModle.bands.push({
                    key: bandY,
                    color: pathModel.color,
                    rawColor: pathModel.rawColor,
                    height: pathHeight,
                    width: catViewModle.width,
                    count: pathModel.count,
                    y: bandY,
                    categoryViewModel: catViewModle,
                    parcatsViewModel: parcatsViewModel
                });
            } else {
                // Extend current band
                var currentBand = catViewModle.bands[numBands - 1];
                currentBand.height += pathHeight;
                currentBand.count += pathModel.count;
            }
        }

        // build svg path
        var svgD;
        if(parcatsViewModel.pathShape === 'hspline') {
            svgD = buildSvgPath(leftXPositions, pathYs, dimWidths, pathHeight, 0.5);
        } else {
            svgD = buildSvgPath(leftXPositions, pathYs, dimWidths, pathHeight, 0);
        }

        pathViewModels[pathNumber] = {
            key: pathModel.valueInds[0],
            model: pathModel,
            height: pathHeight,
            leftXs: leftXPositions,
            topYs: pathYs,
            dimWidths: dimWidths,
            svgD: svgD,
            parcatsViewModel: parcatsViewModel
        };
    }

    parcatsViewModel.paths = pathViewModels;

 // * @property key
 // *  Unique key for this model
 // * @property {PathModel} model
 // *  Source path model
 // * @property {Number} height
 // *  Height of this path (pixels)
 // * @property {String} svgD
 // *  SVG path "d" attribute string
}

/**
 * Update the dimension view models based on the dimension models in a ParcatsViewModel
 *
 * @param {ParcatsViewModel} parcatsViewModel
 *  View model for trace
 */
function updateDimensionViewModels(parcatsViewModel) {
    // Compute dimension ordering
    var dimensionsIndInfo = parcatsViewModel.model.dimensions.map(function(d) {
        return {displayInd: d.displayInd, dimensionInd: d.dimensionInd};
    });

    dimensionsIndInfo.sort(function(a, b) {
        return a.displayInd - b.displayInd;
    });

    var dimensions = [];
    for(var displayInd in dimensionsIndInfo) {
        var dimensionInd = dimensionsIndInfo[displayInd].dimensionInd;
        var dimModel = parcatsViewModel.model.dimensions[dimensionInd];
        dimensions.push(createDimensionViewModel(parcatsViewModel, dimModel));
    }

    parcatsViewModel.dimensions = dimensions;
}

/**
 * Create a parcats DimensionViewModel
 *
 * @param {ParcatsViewModel} parcatsViewModel
 *  View model for trace
 * @param {DimensionModel} dimensionModel
 * @return {DimensionViewModel}
 */
function createDimensionViewModel(parcatsViewModel, dimensionModel) {
    // Compute dimension x position
    var categoryLabelPad = 40;
    var dimWidth = 16;
    var numDimensions = parcatsViewModel.model.dimensions.length;
    var displayInd = dimensionModel.displayInd;

    // Compute x coordinate values
    var dimDx;
    var dimX0;
    var dimX;

    if(numDimensions > 1) {
        dimDx = (parcatsViewModel.width - 2 * categoryLabelPad - dimWidth) / (numDimensions - 1);
    } else {
        dimDx = 0;
    }
    dimX0 = categoryLabelPad;
    dimX = dimX0 + dimDx * displayInd;

    // Compute categories
    var categories = [];
    var maxCats = parcatsViewModel.model.maxCats;
    var numCats = dimensionModel.categories.length;
    var catSpacing = 8;
    var totalCount = dimensionModel.count;
    var totalHeight = parcatsViewModel.height - catSpacing * (maxCats - 1);
    var nextCatHeight;
    var nextCatModel;
    var nextCat;
    var catInd;
    var catDisplayInd;

    // Compute starting Y offset
    var nextCatY = (maxCats - numCats) * catSpacing / 2.0;

    // Compute category ordering
    var categoryIndInfo = dimensionModel.categories.map(function(c) {
        return {displayInd: c.displayInd, categoryInd: c.categoryInd};
    });

    categoryIndInfo.sort(function(a, b) {
        return a.displayInd - b.displayInd;
    });

    for(catDisplayInd = 0; catDisplayInd < numCats; catDisplayInd++) {
        catInd = categoryIndInfo[catDisplayInd].categoryInd;
        nextCatModel = dimensionModel.categories[catInd];

        if(totalCount > 0) {
            nextCatHeight = (nextCatModel.count / totalCount) * totalHeight;
        } else {
            nextCatHeight = 0;
        }

        nextCat = {
            key: nextCatModel.valueInds[0],
            model: nextCatModel,
            width: dimWidth,
            height: nextCatHeight,
            y: nextCatModel.dragY !== null ? nextCatModel.dragY : nextCatY,
            bands: [],
            parcatsViewModel: parcatsViewModel
        };

        nextCatY = nextCatY + nextCatHeight + catSpacing;
        categories.push(nextCat);
    }

    return {
        key: dimensionModel.dimensionInd,
        x: dimensionModel.dragX !== null ? dimensionModel.dragX : dimX,
        y: 0,
        width: dimWidth,
        model: dimensionModel,
        categories: categories,
        parcatsViewModel: parcatsViewModel,
        dragCategoryDisplayInd: null,
        dragDimensionDisplayInd: null,
        initialDragDimensionDisplayInds: null,
        initialDragCategoryDisplayInds: null,
        dragHasMoved: null,
        potentialClickBand: null
    };
}

// JSDoc typedefs
// ==============
/**
 * @typedef {Object} Layout
 *  Object containing svg layout information
 *
 * @property {Number} width (pixels)
 *  Usable width for Figure (after margins are removed)
 * @property {Number} height (pixels)
 *  Usable height for Figure (after margins are removed)
 * @property {Margin} margin
 *  Margin around the Figure (pixels)
 */

/**
 * @typedef {Object} Margin
 *  Object containing padding information in pixels
 *
 * @property {Number} t
 *  Top margin
 * @property {Number} r
 *  Right margin
 * @property {Number} b
 *  Bottom margin
 * @property {Number} l
 *  Left margin
 */

/**
 * @typedef {Object} Font
 *  Object containing font information
 *
 * @property {Number} size: Font size
 * @property {String} color: Font color
 * @property {String} family: Font family
 */

/**
 * @typedef {Object} ParcatsViewModel
 *  Object containing calculated parcats view information
 *
 *  These are quantities that require Layout information to calculate
 * @property key
 *  Unique key for this model
 * @property {ParcatsModel} model
 *  Source parcats model
 * @property {Array.<DimensionViewModel>} dimensions
 *  Array of dimension view models
 * @property {Number} width
 *  Width for this trace (pixels)
 * @property {Number} height
 *  Height for this trace (pixels)
 * @property {Number} x
 *  X position of this trace with respect to the Figure (pixels)
 * @property {Number} y
 *  Y position of this trace with respect to the Figure (pixels)
 * @property {String} hoveron
 *  Hover interaction mode. One of: 'category', 'color', or 'dimension'
 * @property {Array.<String>} hoverinfoItems
 *  Info to display on hover. Array with a combination of 'counts' and/or 'probabilities', or 'none', or 'skip'
 * @property {String} arrangement
 *  Category arrangement. One of: 'perpendicular', 'freeform', or 'fixed'
 * @property {Boolean} bundlecolors
 *  Whether paths should be sorted so that like colors are bundled together as they pass through categories
 * @property {String} sortpaths
 *  If 'forward' then sort paths based on dimensions from left to right. If 'backward' sort based on dimensions
 *  from right to left
 * @property {Font} labelfont
 *  Font for the dimension labels
 * @property {Font} categorylabelfont
 *  Font for the category labels
 * @property {String} pathShape
 *  The shape of the paths. Either 'linear' or 'hspline'.
 * @property {DimensionViewModel|null} dragDimension
 *  Dimension currently being dragged. Null if no drag in progress
 * @property {Margin} margin
 *  Margin around the Figure
 * @property {Object} graphDiv
 *  Top-level graph div element
 * @property {Object} traceSelection
 *  D3 selection of this view models trace group element
 * @property {Object} pathSelection
 *  D3 selection of this view models path elements
 * @property {Object} dimensionSelection
 *  D3 selection of this view models dimension group element
 */

/**
 * @typedef {Object} DimensionViewModel
 *  Object containing calculated parcats dimension view information
 *
 *  These are quantities that require Layout information to calculate
 * @property key
 *  Unique key for this model
 * @property {DimensionModel} model
 *  Source dimension model
 * @property {Number} x
 *  X position of the center of this dimension with respect to the Figure (pixels)
 * @property {Number} y
 *  Y position of the top of this dimension with respect to the Figure (pixels)
 * @property {Number} width
 *  Width of categories in this dimension (pixels)
 * @property {ParcatsViewModel} parcatsViewModel
 *  The parent trace's view model
 * @property {Array.<CategoryViewModel>} categories
 *  Dimensions category view models
 * @property {Number|null} dragCategoryDisplayInd
 *  Display index of category currently being dragged. null if no category is being dragged
 * @property {Number|null} dragDimensionDisplayInd
 *  Display index of the dimension being dragged. null if no dimension is being dragged
 * @property {Array.<Number>|null} initialDragDimensionDisplayInds
 *  Dimensions display indexes at the beginning of the current drag. null if no dimension is being dragged
 * @property {Array.<Number>|null} initialDragCategoryDisplayInds
 *  Category display indexes for the at the beginning of the current drag. null if no category is being dragged
 * @property {HTMLElement} potentialClickBand
 *  Band under mouse when current drag began. If no drag movement takes place then a click will be emitted for this
 *  band. Null if not drag in progress.
 * @property {Boolean} dragHasMoved
 *  True if there is an active drag and the drag has moved. If drag doesn't move before being ended then
 *  this may be interpreted as a click. Null if no drag in progress
 */

/**
 * @typedef {Object} CategoryViewModel
 *  Object containing calculated parcats category view information
 *
 *  These are quantities that require Layout information to calculate
 * @property key
 *  Unique key for this model
 * @property {CategoryModel} model
 *  Source category model
 * @property {Number} width
 *  Width for this category (pixels)
 * @property {Number} height
 *  Height for this category (pixels)
 * @property {Number} y
 *  Y position of this cateogry with respect to the Figure (pixels)
 * @property {Array.<CategoryBandViewModel>} bands
 *  Array of color bands inside the category
 * @property {ParcatsViewModel} parcatsViewModel
 *  The parent trace's view model
 */

/**
 * @typedef {Object} CategoryBandViewModel
 *  Object containing calculated category band information. A category band is a region inside a category covering
 *  paths of a single color
 *
 * @property key
 *  Unique key for this model
 * @property color
 *  Band color
 * @property rawColor
 *  Raw color value for band
 * @property {Number} width
 *  Band width
 * @property {Number} height
 *  Band height
 * @property {Number} y
 *  Y position of top of the band with respect to the category
 * @property {Number} count
 *  The number of samples represented by the band
 * @property {CategoryViewModel} categoryViewModel
 *  The parent categorie's view model
 * @property {ParcatsViewModel} parcatsViewModel
 *  The parent trace's view model
 */

/**
 * @typedef {Object} PathViewModel
 *  Object containing calculated parcats path view information
 *
 *  These are quantities that require Layout information to calculate
 * @property key
 *  Unique key for this model
 * @property {PathModel} model
 *  Source path model
 * @property {Number} height
 *  Height of this path (pixels)
 * @property {Array.<Number>} leftXs
 *  The x position of the left edge of each display dimension
 * @property {Array.<Number>} topYs
 *  The y position of the top of the path for each display dimension
 * @property {Array.<Number>} dimWidths
 *  The width of each display dimension
 * @property {String} svgD
 *  SVG path "d" attribute string
 * @property {ParcatsViewModel} parcatsViewModel
 *  The parent trace's view model
 */


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/parcats/plot.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/parcats/plot.js ***!
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




var parcats = __webpack_require__(/*! ./parcats */ "./node_modules/plotly.js/src/traces/parcats/parcats.js");

/**
 * Create / update parcat traces
 *
 * @param {Object} graphDiv
 * @param {Array.<ParcatsModel>} parcatsModels
 */
module.exports = function plot(graphDiv, parcatsModels, transitionOpts, makeOnCompleteCallback) {
    var fullLayout = graphDiv._fullLayout;
    var svg = fullLayout._paper;
    var size = fullLayout._size;

    parcats(
        graphDiv,
        svg,
        parcatsModels,
        {
            width: size.w,
            height: size.h,
            margin: {
                t: size.t,
                r: size.r,
                b: size.b,
                l: size.l
            }
        },
        transitionOpts,
        makeOnCompleteCallback
    );
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvcGFyY2F0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BhcmNhdHMvYXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BhcmNhdHMvYmFzZV9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGFyY2F0cy9jYWxjLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvcGFyY2F0cy9kZWZhdWx0cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3BhcmNhdHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9wYXJjYXRzL3BhcmNhdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy9wYXJjYXRzL3Bsb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIseUhBQWlEOzs7Ozs7Ozs7Ozs7QUNWakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUJBQWlCLG9HQUFzQztBQUN2RCxnQkFBZ0IsbUJBQU8sQ0FBQyxnRkFBd0I7QUFDaEQsZ0JBQWdCLG1CQUFPLENBQUMsMEZBQTZCO0FBQ3JELHNCQUFzQixtQkFBTyxDQUFDLGdIQUF3QztBQUN0RSx5QkFBeUIsMElB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QUFZO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsZUFBZSxrQkFBa0I7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEI7QUFDQSxXQUFXLFlBQVk7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxXQUFXO0FBQ3RCO0FBQ0EsV0FBVyxZQUFZO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxlQUFlLHNCQUFzQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7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QSxjQUFjLGlCQUFpQjtBQUMvQjtBQUNBOztBQUVBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLFVBQVU7QUFDeEI7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQSxjQUFjLGVBQWU7QUFDN0I7QUFDQSxjQUFjLGVBQWU7QUFDN0I7QUFDQSxjQUFjLGVBQWU7QUFDN0I7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQSxjQUFjLGlCQUFpQjtBQUMvQjtBQUNBOzs7Ozs7Ozs7Ozs7QUNwbUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOzs7QUFHYixjQUFjLG1CQUFPLENBQUMseUVBQVc7O0FBRWpDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixXQUFXLHFCQUFxQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImNoYXJ0MmE5MjQ5ODc5MzFkYjM1MjJkNjEuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi4vc3JjL3RyYWNlcy9wYXJjYXRzJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBleHRlbmRGbGF0ID0gcmVxdWlyZSgnLi4vLi4vbGliL2V4dGVuZCcpLmV4dGVuZEZsYXQ7XG52YXIgYmFzZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvYXR0cmlidXRlcycpO1xudmFyIGZvbnRBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2ZvbnRfYXR0cmlidXRlcycpO1xudmFyIGNvbG9yU2NhbGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9hdHRyaWJ1dGVzJyk7XG52YXIgaG92ZXJ0ZW1wbGF0ZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvdGVtcGxhdGVfYXR0cmlidXRlcycpLmhvdmVydGVtcGxhdGVBdHRycztcbnZhciBkb21haW5BdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2RvbWFpbicpLmF0dHJpYnV0ZXM7XG5cbnZhciBsaW5lID0gZXh0ZW5kRmxhdChcbiAgICB7ZWRpdFR5cGU6ICdjYWxjJ30sXG4gICAgY29sb3JTY2FsZUF0dHJzKCdsaW5lJywge2VkaXRUeXBlT3ZlcnJpZGU6ICdjYWxjJ30pLFxuICAgIHtcbiAgICAgICAgc2hhcGU6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogWydsaW5lYXInLCAnaHNwbGluZSddLFxuICAgICAgICAgICAgZGZsdDogJ2xpbmVhcicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgc2hhcGUgb2YgdGhlIHBhdGhzLicsXG4gICAgICAgICAgICAgICAgJ0lmIGBsaW5lYXJgLCBwYXRocyBhcmUgY29tcG9zZWQgb2Ygc3RyYWlnaHQgbGluZXMuJyxcbiAgICAgICAgICAgICAgICAnSWYgYGhzcGxpbmVgLCBwYXRocyBhcmUgY29tcG9zZWQgb2YgaG9yaXpvbnRhbCBjdXJ2ZWQgc3BsaW5lcydcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG5cbiAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKHtcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAgICBhcnJheU9rOiBmYWxzZVxuICAgICAgICB9LCB7XG4gICAgICAgICAgICBrZXlzOiBbJ2NvdW50JywgJ3Byb2JhYmlsaXR5J10sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdUaGlzIHZhbHVlIGhlcmUgYXBwbGllcyB3aGVuIGhvdmVyaW5nIG92ZXIgbGluZXMuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSlcbiAgICB9XG4pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBkb21haW46IGRvbWFpbkF0dHJzKHtuYW1lOiAncGFyY2F0cycsIHRyYWNlOiB0cnVlLCBlZGl0VHlwZTogJ2NhbGMnfSksXG5cbiAgICBob3ZlcmluZm86IGV4dGVuZEZsYXQoe30sIGJhc2VBdHRycy5ob3ZlcmluZm8sIHtcbiAgICAgICAgZmxhZ3M6IFsnY291bnQnLCAncHJvYmFiaWxpdHknXSxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgYXJyYXlPazogZmFsc2VcbiAgICB9KSxcbiAgICBob3Zlcm9uOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ2NhdGVnb3J5JywgJ2NvbG9yJywgJ2RpbWVuc2lvbiddLFxuICAgICAgICBkZmx0OiAnY2F0ZWdvcnknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgaG92ZXIgaW50ZXJhY3Rpb24gbW9kZSBmb3IgdGhlIHBhcmNhdHMgZGlhZ3JhbS4nLFxuICAgICAgICAgICAgJ0lmIGBjYXRlZ29yeWAsIGhvdmVyIGludGVyYWN0aW9uIHRha2UgcGxhY2UgcGVyIGNhdGVnb3J5LicsXG4gICAgICAgICAgICAnSWYgYGNvbG9yYCwgaG92ZXIgaW50ZXJhY3Rpb25zIHRha2UgcGxhY2UgcGVyIGNvbG9yIHBlciBjYXRlZ29yeS4nLFxuICAgICAgICAgICAgJ0lmIGBkaW1lbnNpb25gLCBob3ZlciBpbnRlcmFjdGlvbnMgdGFrZSBwbGFjZSBhY3Jvc3MgYWxsIGNhdGVnb3JpZXMgcGVyIGRpbWVuc2lvbi4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlQXR0cnMoe1xuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBhcnJheU9rOiBmYWxzZVxuICAgIH0sIHtcbiAgICAgICAga2V5czogW1xuICAgICAgICAgICAgJ2NvdW50JywgJ3Byb2JhYmlsaXR5JywgJ2NhdGVnb3J5JyxcbiAgICAgICAgICAgICdjYXRlZ29yeWNvdW50JywgJ2NvbG9yY291bnQnLCAnYmFuZGNvbG9yY291bnQnXG4gICAgICAgIF0sXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhpcyB2YWx1ZSBoZXJlIGFwcGxpZXMgd2hlbiBob3ZlcmluZyBvdmVyIGRpbWVuc2lvbnMuJyxcbiAgICAgICAgICAgICdOb3RlIHRhdGggYCpjYXRlZ29yeWNvdW50YCwgKmNvbG9yY291bnQqIGFuZCAqYmFuZGNvbG9yY291bnQqJyxcbiAgICAgICAgICAgICdhcmUgb25seSBhdmFpbGFibGUgd2hlbiBgaG92ZXJvbmAgY29udGFpbnMgdGhlICpjb2xvciogZmxhZydcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcblxuICAgIGFycmFuZ2VtZW50OiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ3BlcnBlbmRpY3VsYXInLCAnZnJlZWZvcm0nLCAnZml4ZWQnXSxcbiAgICAgICAgZGZsdDogJ3BlcnBlbmRpY3VsYXInLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGRyYWcgaW50ZXJhY3Rpb24gbW9kZSBmb3IgY2F0ZWdvcmllcyBhbmQgZGltZW5zaW9ucy4nLFxuICAgICAgICAgICAgJ0lmIGBwZXJwZW5kaWN1bGFyYCwgdGhlIGNhdGVnb3JpZXMgY2FuIG9ubHkgbW92ZSBhbG9uZyBhIGxpbmUgcGVycGVuZGljdWxhciB0byB0aGUgcGF0aHMuJyxcbiAgICAgICAgICAgICdJZiBgZnJlZWZvcm1gLCB0aGUgY2F0ZWdvcmllcyBjYW4gZnJlZWx5IG1vdmUgb24gdGhlIHBsYW5lLicsXG4gICAgICAgICAgICAnSWYgYGZpeGVkYCwgdGhlIGNhdGVnb3JpZXMgYW5kIGRpbWVuc2lvbnMgYXJlIHN0YXRpb25hcnkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYnVuZGxlY29sb3JzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NvcnQgcGF0aHMgc28gdGhhdCBsaWtlIGNvbG9ycyBhcmUgYnVuZGxlZCB0b2dldGhlciB3aXRoaW4gZWFjaCBjYXRlZ29yeS4nXG4gICAgfSxcbiAgICBzb3J0cGF0aHM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnZm9yd2FyZCcsICdiYWNrd2FyZCddLFxuICAgICAgICBkZmx0OiAnZm9yd2FyZCcsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBwYXRoIHNvcnRpbmcgYWxnb3JpdGhtLicsXG4gICAgICAgICAgICAnSWYgYGZvcndhcmRgLCBzb3J0IHBhdGhzIGJhc2VkIG9uIGRpbWVuc2lvbiBjYXRlZ29yaWVzIGZyb20gbGVmdCB0byByaWdodC4nLFxuICAgICAgICAgICAgJ0lmIGBiYWNrd2FyZGAsIHNvcnQgcGF0aHMgYmFzZWQgb24gZGltZW5zaW9ucyBjYXRlZ29yaWVzIGZyb20gcmlnaHQgdG8gbGVmdC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBsYWJlbGZvbnQ6IGZvbnRBdHRycyh7XG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZm9udCBmb3IgdGhlIGBkaW1lbnNpb25gIGxhYmVscy4nXG4gICAgfSksXG5cbiAgICB0aWNrZm9udDogZm9udEF0dHJzKHtcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBmb250IGZvciB0aGUgYGNhdGVnb3J5YCBsYWJlbHMuJ1xuICAgIH0pLFxuXG4gICAgZGltZW5zaW9uczoge1xuICAgICAgICBfaXNMaW5rZWRUb0FycmF5OiAnZGltZW5zaW9uJyxcbiAgICAgICAgbGFiZWw6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnVGhlIHNob3duIG5hbWUgb2YgdGhlIGRpbWVuc2lvbi4nXG4gICAgICAgIH0sXG4gICAgICAgIGNhdGVnb3J5b3JkZXI6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgICAgICd0cmFjZScsICdjYXRlZ29yeSBhc2NlbmRpbmcnLCAnY2F0ZWdvcnkgZGVzY2VuZGluZycsICdhcnJheSdcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBkZmx0OiAndHJhY2UnLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NwZWNpZmllcyB0aGUgb3JkZXJpbmcgbG9naWMgZm9yIHRoZSBjYXRlZ29yaWVzIGluIHRoZSBkaW1lbnNpb24uJyxcbiAgICAgICAgICAgICAgICAnQnkgZGVmYXVsdCwgcGxvdGx5IHVzZXMgKnRyYWNlKiwgd2hpY2ggc3BlY2lmaWVzIHRoZSBvcmRlciB0aGF0IGlzIHByZXNlbnQgaW4gdGhlIGRhdGEgc3VwcGxpZWQuJyxcbiAgICAgICAgICAgICAgICAnU2V0IGBjYXRlZ29yeW9yZGVyYCB0byAqY2F0ZWdvcnkgYXNjZW5kaW5nKiBvciAqY2F0ZWdvcnkgZGVzY2VuZGluZyogaWYgb3JkZXIgc2hvdWxkIGJlIGRldGVybWluZWQgYnknLFxuICAgICAgICAgICAgICAgICd0aGUgYWxwaGFudW1lcmljYWwgb3JkZXIgb2YgdGhlIGNhdGVnb3J5IG5hbWVzLicsXG4gICAgICAgICAgICAgICAgJ1NldCBgY2F0ZWdvcnlvcmRlcmAgdG8gKmFycmF5KiB0byBkZXJpdmUgdGhlIG9yZGVyaW5nIGZyb20gdGhlIGF0dHJpYnV0ZSBgY2F0ZWdvcnlhcnJheWAuIElmIGEgY2F0ZWdvcnknLFxuICAgICAgICAgICAgICAgICdpcyBub3QgZm91bmQgaW4gdGhlIGBjYXRlZ29yeWFycmF5YCBhcnJheSwgdGhlIHNvcnRpbmcgYmVoYXZpb3IgZm9yIHRoYXQgYXR0cmlidXRlIHdpbGwgYmUgaWRlbnRpY2FsIHRvJyxcbiAgICAgICAgICAgICAgICAndGhlICp0cmFjZSogbW9kZS4gVGhlIHVuc3BlY2lmaWVkIGNhdGVnb3JpZXMgd2lsbCBmb2xsb3cgdGhlIGNhdGVnb3JpZXMgaW4gYGNhdGVnb3J5YXJyYXlgLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGNhdGVnb3J5YXJyYXk6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBvcmRlciBpbiB3aGljaCBjYXRlZ29yaWVzIGluIHRoaXMgZGltZW5zaW9uIGFwcGVhci4nLFxuICAgICAgICAgICAgICAgICdPbmx5IGhhcyBhbiBlZmZlY3QgaWYgYGNhdGVnb3J5b3JkZXJgIGlzIHNldCB0byAqYXJyYXkqLicsXG4gICAgICAgICAgICAgICAgJ1VzZWQgd2l0aCBgY2F0ZWdvcnlvcmRlcmAuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgdGlja3RleHQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIGFsdGVybmF0aXZlIHRpY2sgbGFiZWxzIGZvciB0aGUgY2F0ZWdvcmllcyBpbiB0aGlzIGRpbWVuc2lvbi4nLFxuICAgICAgICAgICAgICAgICdPbmx5IGhhcyBhbiBlZmZlY3QgaWYgYGNhdGVnb3J5b3JkZXJgIGlzIHNldCB0byAqYXJyYXkqLicsXG4gICAgICAgICAgICAgICAgJ1Nob3VsZCBiZSBhbiBhcnJheSB0aGUgc2FtZSBsZW5ndGggYXMgYGNhdGVnb3J5YXJyYXlgJyxcbiAgICAgICAgICAgICAgICAnVXNlZCB3aXRoIGBjYXRlZ29yeW9yZGVyYC4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IFtdLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0RpbWVuc2lvbiB2YWx1ZXMuIGB2YWx1ZXNbbl1gIHJlcHJlc2VudHMgdGhlIGNhdGVnb3J5IHZhbHVlIG9mIHRoZSBgbmB0aCBwb2ludCBpbiB0aGUgZGF0YXNldCwnLFxuICAgICAgICAgICAgICAgICd0aGVyZWZvcmUgdGhlIGB2YWx1ZXNgIHZlY3RvciBmb3IgYWxsIGRpbWVuc2lvbnMgbXVzdCBiZSB0aGUgc2FtZSAobG9uZ2VyIHZlY3RvcnMnLFxuICAgICAgICAgICAgICAgICd3aWxsIGJlIHRydW5jYXRlZCkuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgZGlzcGxheWluZGV4OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnVGhlIGRpc3BsYXkgaW5kZXggb2YgZGltZW5zaW9uLCBmcm9tIGxlZnQgdG8gcmlnaHQsIHplcm8gaW5kZXhlZCwgZGVmYXVsdHMgdG8gZGltZW5zaW9uJyxcbiAgICAgICAgICAgICAgICAnaW5kZXguJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgZGltZW5zaW9ucyAodmFyaWFibGVzKSBvZiB0aGUgcGFyYWxsZWwgY2F0ZWdvcmllcyBkaWFncmFtLicsXG4gICAgICAgIHZpc2libGU6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTaG93cyB0aGUgZGltZW5zaW9uIHdoZW4gc2V0IHRvIGB0cnVlYCAodGhlIGRlZmF1bHQpLiBIaWRlcyB0aGUgZGltZW5zaW9uIGZvciBgZmFsc2VgLidcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBsaW5lOiBsaW5lLFxuICAgIGNvdW50czoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBkZmx0OiAxLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIG51bWJlciBvZiBvYnNlcnZhdGlvbnMgcmVwcmVzZW50ZWQgYnkgZWFjaCBzdGF0ZS4gRGVmYXVsdHMgdG8gMSBzbyB0aGF0IGVhY2ggc3RhdGUgcmVwcmVzZW50cycsXG4gICAgICAgICAgICAnb25lIG9ic2VydmF0aW9uJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICAvLyBIaWRlIHVuc3VwcG9ydGVkIHRvcC1sZXZlbCBwcm9wZXJ0aWVzIGZyb20gcGxvdC1zY2hlbWFcbiAgICBjdXN0b21kYXRhOiB1bmRlZmluZWQsXG4gICAgaG92ZXJsYWJlbDogdW5kZWZpbmVkLFxuICAgIGlkczogdW5kZWZpbmVkLFxuICAgIGxlZ2VuZGdyb3VwOiB1bmRlZmluZWQsXG4gICAgb3BhY2l0eTogdW5kZWZpbmVkLFxuICAgIHNlbGVjdGVkcG9pbnRzOiB1bmRlZmluZWQsXG4gICAgc2hvd2xlZ2VuZDogdW5kZWZpbmVkXG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZ2V0TW9kdWxlQ2FsY0RhdGEgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9nZXRfZGF0YScpLmdldE1vZHVsZUNhbGNEYXRhO1xudmFyIHBhcmNhdHNQbG90ID0gcmVxdWlyZSgnLi9wbG90Jyk7XG5cbnZhciBQQVJDQVRTID0gJ3BhcmNhdHMnO1xuZXhwb3J0cy5uYW1lID0gUEFSQ0FUUztcblxuZXhwb3J0cy5wbG90ID0gZnVuY3Rpb24oZ2QsIHRyYWNlcywgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spIHtcbiAgICB2YXIgY2RNb2R1bGVBbmRPdGhlcnMgPSBnZXRNb2R1bGVDYWxjRGF0YShnZC5jYWxjZGF0YSwgUEFSQ0FUUyk7XG5cbiAgICBpZihjZE1vZHVsZUFuZE90aGVycy5sZW5ndGgpIHtcbiAgICAgICAgdmFyIGNhbGNEYXRhID0gY2RNb2R1bGVBbmRPdGhlcnNbMF07XG4gICAgICAgIHBhcmNhdHNQbG90KGdkLCBjYWxjRGF0YSwgdHJhbnNpdGlvbk9wdHMsIG1ha2VPbkNvbXBsZXRlQ2FsbGJhY2spO1xuICAgIH1cbn07XG5cbmV4cG9ydHMuY2xlYW4gPSBmdW5jdGlvbihuZXdGdWxsRGF0YSwgbmV3RnVsbExheW91dCwgb2xkRnVsbERhdGEsIG9sZEZ1bGxMYXlvdXQpIHtcbiAgICB2YXIgaGFkVGFibGUgPSAob2xkRnVsbExheW91dC5faGFzICYmIG9sZEZ1bGxMYXlvdXQuX2hhcygncGFyY2F0cycpKTtcbiAgICB2YXIgaGFzVGFibGUgPSAobmV3RnVsbExheW91dC5faGFzICYmIG5ld0Z1bGxMYXlvdXQuX2hhcygncGFyY2F0cycpKTtcblxuICAgIGlmKGhhZFRhYmxlICYmICFoYXNUYWJsZSkge1xuICAgICAgICBvbGRGdWxsTGF5b3V0Ll9wYXBlcmRpdi5zZWxlY3RBbGwoJy5wYXJjYXRzJykucmVtb3ZlKCk7XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gUmVxdWlyZW1lbnRzXG4vLyA9PT09PT09PT09PT1cbnZhciB3cmFwID0gcmVxdWlyZSgnLi4vLi4vbGliL2d1cCcpLndyYXA7XG52YXIgaGFzQ29sb3JzY2FsZSA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9oZWxwZXJzJykuaGFzQ29sb3JzY2FsZTtcbnZhciBjb2xvcnNjYWxlQ2FsYyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9jYWxjJyk7XG52YXIgZmlsdGVyVW5pcXVlID0gcmVxdWlyZSgnLi4vLi4vbGliL2ZpbHRlcl91bmlxdWUuanMnKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgd3JhcHBlZCBQYXJjYXRzTW9kZWwgb2JqZWN0IGZyb20gdHJhY2VcbiAqXG4gKiBOb3RlOiB0cmFjZSBkZWZhdWx0cyBoYXZlIGFscmVhZHkgYmVlbiBhcHBsaWVkXG4gKiBAcGFyYW0ge09iamVjdH0gZ2RcbiAqIEBwYXJhbSB7T2JqZWN0fSB0cmFjZVxuICogQHJldHVybiB7QXJyYXkuPFBhcmNhdHNNb2RlbD59XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgdmlzaWJsZURpbXMgPSBMaWIuZmlsdGVyVmlzaWJsZSh0cmFjZS5kaW1lbnNpb25zKTtcblxuICAgIGlmKHZpc2libGVEaW1zLmxlbmd0aCA9PT0gMCkgcmV0dXJuIFtdO1xuXG4gICAgdmFyIHVuaXF1ZUluZm9EaW1zID0gdmlzaWJsZURpbXMubWFwKGZ1bmN0aW9uKGRpbSkge1xuICAgICAgICB2YXIgY2F0ZWdvcnlWYWx1ZXM7XG4gICAgICAgIGlmKGRpbS5jYXRlZ29yeW9yZGVyID09PSAndHJhY2UnKSB7XG4gICAgICAgICAgICAvLyBVc2Ugb3JkZXIgb2YgZmlyc3Qgb2NjdXJyZW5jZSBpbiB0cmFjZVxuICAgICAgICAgICAgY2F0ZWdvcnlWYWx1ZXMgPSBudWxsO1xuICAgICAgICB9IGVsc2UgaWYoZGltLmNhdGVnb3J5b3JkZXIgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgIC8vIFVzZSBjYXRlZ29yaWVzIHNwZWNpZmllZCBpbiBgY2F0ZWdvcnlhcnJheWAgZmlyc3QsXG4gICAgICAgICAgICAvLyB0aGVuIGFkZCBleHRyYSB0byB0aGUgZW5kIGluIHRyYWNlIG9yZGVyXG4gICAgICAgICAgICBjYXRlZ29yeVZhbHVlcyA9IGRpbS5jYXRlZ29yeWFycmF5O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gR2V0IGFsbCBjYXRlZ29yaWVzIHVwIGZyb250IHNvIHdlIGNhbiBvcmRlciB0aGVtXG4gICAgICAgICAgICAvLyBTaG91bGQgd2UgY2hlY2sgZm9yIG51bWJlcnMgYXMgc29ydCBudW1lcmljYWxseT9cbiAgICAgICAgICAgIGNhdGVnb3J5VmFsdWVzID0gZmlsdGVyVW5pcXVlKGRpbS52YWx1ZXMpLnNvcnQoKTtcbiAgICAgICAgICAgIGlmKGRpbS5jYXRlZ29yeW9yZGVyID09PSAnY2F0ZWdvcnkgZGVzY2VuZGluZycpIHtcbiAgICAgICAgICAgICAgICBjYXRlZ29yeVZhbHVlcyA9IGNhdGVnb3J5VmFsdWVzLnJldmVyc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ2V0VW5pcXVlSW5mbyhkaW0udmFsdWVzLCBjYXRlZ29yeVZhbHVlcyk7XG4gICAgfSk7XG5cbiAgICB2YXIgY291bnRzLFxuICAgICAgICBjb3VudCxcbiAgICAgICAgdG90YWxDb3VudDtcbiAgICBpZihMaWIuaXNBcnJheU9yVHlwZWRBcnJheSh0cmFjZS5jb3VudHMpKSB7XG4gICAgICAgIGNvdW50cyA9IHRyYWNlLmNvdW50cztcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb3VudHMgPSBbdHJhY2UuY291bnRzXTtcbiAgICB9XG5cbiAgICB2YWxpZGF0ZURpbWVuc2lvbkRpc3BsYXlJbmRzKHZpc2libGVEaW1zKTtcblxuICAgIHZpc2libGVEaW1zLmZvckVhY2goZnVuY3Rpb24oZGltLCBkaW1JbmQpIHtcbiAgICAgICAgdmFsaWRhdGVDYXRlZ29yeVByb3BlcnRpZXMoZGltLCB1bmlxdWVJbmZvRGltc1tkaW1JbmRdKTtcbiAgICB9KTtcblxuICAgIC8vIEhhbmRsZSBwYXRoIGNvbG9yc1xuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBsaW5lID0gdHJhY2UubGluZTtcbiAgICB2YXIgbWFya2VyQ29sb3JzY2FsZTtcblxuICAgIC8vIFByb2Nlc3MgY29sb3JzY2FsZVxuICAgIGlmKGxpbmUpIHtcbiAgICAgICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZSwgJ2xpbmUnKSkge1xuICAgICAgICAgICAgY29sb3JzY2FsZUNhbGMoZ2QsIHRyYWNlLCB7XG4gICAgICAgICAgICAgICAgdmFsczogdHJhY2UubGluZS5jb2xvcixcbiAgICAgICAgICAgICAgICBjb250YWluZXJTdHI6ICdsaW5lJyxcbiAgICAgICAgICAgICAgICBjTGV0dGVyOiAnYydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIG1hcmtlckNvbG9yc2NhbGUgPSBEcmF3aW5nLnRyeUNvbG9yc2NhbGUobGluZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbWFya2VyQ29sb3JzY2FsZSA9IExpYi5pZGVudGl0eTtcbiAgICB9XG5cbiAgICAvLyBCdWlsZCBjb2xvciBnZW5lcmF0aW9uIGZ1bmN0aW9uXG4gICAgZnVuY3Rpb24gZ2V0TWFya2VyQ29sb3JJbmZvKGluZGV4KSB7XG4gICAgICAgIHZhciB2YWx1ZSwgcmF3Q29sb3I7XG4gICAgICAgIGlmKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KGxpbmUuY29sb3IpKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IGxpbmUuY29sb3JbaW5kZXggJSBsaW5lLmNvbG9yLmxlbmd0aF07XG4gICAgICAgICAgICByYXdDb2xvciA9IHZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSBsaW5lLmNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtjb2xvcjogbWFya2VyQ29sb3JzY2FsZSh2YWx1ZSksIHJhd0NvbG9yOiByYXdDb2xvcn07XG4gICAgfVxuXG4gICAgLy8gTnVtYmVyIG9mIHZhbHVlcyBhbmQgY291bnRzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIG51bVZhbHVlcyA9IHZpc2libGVEaW1zWzBdLnZhbHVlcy5sZW5ndGg7XG5cbiAgICAvLyBCdWlsZCBwYXRoIGluZm9cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS1cbiAgICAvLyBNYXBwaW5nIGZyb20gY2F0ZWdvcnkgaW5kcyB0byBQYXRoTW9kZWwgb2JqZWN0c1xuICAgIHZhciBwYXRoTW9kZWxzID0ge307XG5cbiAgICAvLyBDYXRlZ29yeSBpbmRzIGFycmF5IGZvciBlYWNoIGRpbWVuc2lvblxuICAgIHZhciBjYXRlZ29yeUluZHNEaW1zID0gdW5pcXVlSW5mb0RpbXMubWFwKGZ1bmN0aW9uKGRpKSB7cmV0dXJuIGRpLmluZHM7fSk7XG5cbiAgICAvLyBJbml0aWFsaXplIHRvdGFsIGNvdW50XG4gICAgdG90YWxDb3VudCA9IDA7XG4gICAgdmFyIHZhbHVlSW5kO1xuICAgIHZhciBkO1xuXG4gICAgZm9yKHZhbHVlSW5kID0gMDsgdmFsdWVJbmQgPCBudW1WYWx1ZXM7IHZhbHVlSW5kKyspIHtcbiAgICAgICAgLy8gQ2F0ZWdvcnkgaW5kcyBmb3IgdGhpcyBpbnB1dCB2YWx1ZSBhY3Jvc3MgZGltZW5zaW9uc1xuICAgICAgICB2YXIgY2F0ZWdvcnlJbmRzUGF0aCA9IFtdO1xuICAgICAgICBmb3IoZCA9IDA7IGQgPCBjYXRlZ29yeUluZHNEaW1zLmxlbmd0aDsgZCsrKSB7XG4gICAgICAgICAgICBjYXRlZ29yeUluZHNQYXRoLnB1c2goY2F0ZWdvcnlJbmRzRGltc1tkXVt2YWx1ZUluZF0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ291bnRcbiAgICAgICAgY291bnQgPSBjb3VudHNbdmFsdWVJbmQgJSBjb3VudHMubGVuZ3RoXTtcblxuICAgICAgICAvLyBVcGRhdGUgdG90YWwgY291bnRcbiAgICAgICAgdG90YWxDb3VudCArPSBjb3VudDtcblxuICAgICAgICAvLyBQYXRoIGNvbG9yXG4gICAgICAgIHZhciBwYXRoQ29sb3JJbmZvID0gZ2V0TWFya2VyQ29sb3JJbmZvKHZhbHVlSW5kKTtcblxuICAgICAgICAvLyBwYXRoIGtleVxuICAgICAgICB2YXIgcGF0aEtleSA9IGNhdGVnb3J5SW5kc1BhdGggKyAnLScgKyBwYXRoQ29sb3JJbmZvLnJhd0NvbG9yO1xuXG4gICAgICAgIC8vIENyZWF0ZSAvIFVwZGF0ZSBQYXRoTW9kZWxcbiAgICAgICAgaWYocGF0aE1vZGVsc1twYXRoS2V5XSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBwYXRoTW9kZWxzW3BhdGhLZXldID0gY3JlYXRlUGF0aE1vZGVsKGNhdGVnb3J5SW5kc1BhdGgsXG4gICAgICAgICAgICAgICAgcGF0aENvbG9ySW5mby5jb2xvcixcbiAgICAgICAgICAgICAgICBwYXRoQ29sb3JJbmZvLnJhd0NvbG9yKTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVQYXRoTW9kZWwocGF0aE1vZGVsc1twYXRoS2V5XSwgdmFsdWVJbmQsIGNvdW50KTtcbiAgICB9XG5cbiAgICB2YXIgZGltZW5zaW9uTW9kZWxzID0gdmlzaWJsZURpbXMubWFwKGZ1bmN0aW9uKGRpLCBpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVEaW1lbnNpb25Nb2RlbChpLCBkaS5faW5kZXgsIGRpLl9kaXNwbGF5aW5kZXgsIGRpLmxhYmVsLCB0b3RhbENvdW50KTtcbiAgICB9KTtcblxuXG4gICAgZm9yKHZhbHVlSW5kID0gMDsgdmFsdWVJbmQgPCBudW1WYWx1ZXM7IHZhbHVlSW5kKyspIHtcbiAgICAgICAgY291bnQgPSBjb3VudHNbdmFsdWVJbmQgJSBjb3VudHMubGVuZ3RoXTtcblxuICAgICAgICBmb3IoZCA9IDA7IGQgPCBkaW1lbnNpb25Nb2RlbHMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgICAgIHZhciBjb250YWluZXJJbmQgPSBkaW1lbnNpb25Nb2RlbHNbZF0uY29udGFpbmVySW5kO1xuICAgICAgICAgICAgdmFyIGNhdEluZCA9IHVuaXF1ZUluZm9EaW1zW2RdLmluZHNbdmFsdWVJbmRdO1xuICAgICAgICAgICAgdmFyIGNhdHMgPSBkaW1lbnNpb25Nb2RlbHNbZF0uY2F0ZWdvcmllcztcblxuICAgICAgICAgICAgaWYoY2F0c1tjYXRJbmRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgY2F0VmFsdWUgPSB0cmFjZS5kaW1lbnNpb25zW2NvbnRhaW5lckluZF0uX2NhdGVnb3J5YXJyYXlbY2F0SW5kXTtcbiAgICAgICAgICAgICAgICB2YXIgY2F0TGFiZWwgPSB0cmFjZS5kaW1lbnNpb25zW2NvbnRhaW5lckluZF0uX3RpY2t0ZXh0W2NhdEluZF07XG4gICAgICAgICAgICAgICAgY2F0c1tjYXRJbmRdID0gY3JlYXRlQ2F0ZWdvcnlNb2RlbChkLCBjYXRJbmQsIGNhdFZhbHVlLCBjYXRMYWJlbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVwZGF0ZUNhdGVnb3J5TW9kZWwoY2F0c1tjYXRJbmRdLCB2YWx1ZUluZCwgY291bnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ29tcHV0ZSB1bmlxdWVcbiAgICByZXR1cm4gd3JhcChjcmVhdGVQYXJjYXRzTW9kZWwoZGltZW5zaW9uTW9kZWxzLCBwYXRoTW9kZWxzLCB0b3RhbENvdW50KSk7XG59O1xuXG4vLyBNb2RlbHNcbi8vID09PT09PVxuXG4vLyBQYXJjYXRzIE1vZGVsXG4vLyAtLS0tLS0tLS0tLS0tXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhcmNhdHNNb2RlbFxuICogIE9iamVjdCBjb250YWluaW5nIGNhbGN1bGF0ZWQgaW5mb3JtYXRpb24gYWJvdXQgYSBwYXJjYXRzIHRyYWNlXG4gKlxuICogQHByb3BlcnR5IHtBcnJheS48RGltZW5zaW9uTW9kZWw+fSBkaW1lbnNpb25zXG4gKiAgQXJyYXkgb2YgZGltZW5zaW9uIG1vZGVsc1xuICogQHByb3BlcnR5IHtPYmplY3QuPHN0cmluZyxQYXRoTW9kZWw+fSBwYXRoc1xuICogIERpY3Rpb25hcnkgZnJvbSBjYXRlZ29yeSBpbmRzIHN0cmluZyAoZS5nLiBcIjEsMiwxLDFcIikgdG8gcGF0aCBtb2RlbFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IG1heENhdHNcbiAqICBUaGUgbWF4aW11bSBudW1iZXIgb2YgY2F0ZWdvcmllcyBvZiBhbnkgZGltZW5zaW9uIGluIHRoZSBkaWFncmFtXG4gKiBAcHJvcGVydHkge051bWJlcn0gY291bnRcbiAqICBUb3RhbCBudW1iZXIgb2YgaW5wdXQgdmFsdWVzXG4gKiBAcHJvcGVydHkge09iamVjdH0gdHJhY2VcbiAqL1xuXG4vKipcbiAqIENyZWF0ZSBhbmQgbmV3IFBhcmNhdHNNb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7QXJyYXkuPERpbWVuc2lvbk1vZGVsPn0gZGltZW5zaW9uc1xuICogQHBhcmFtIHtPYmplY3QuPHN0cmluZyxQYXRoTW9kZWw+fSBwYXRoc1xuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKiBAcmV0dXJuIHtQYXJjYXRzTW9kZWx9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVBhcmNhdHNNb2RlbChkaW1lbnNpb25zLCBwYXRocywgY291bnQpIHtcbiAgICB2YXIgbWF4Q2F0cyA9IGRpbWVuc2lvbnNcbiAgICAgICAgLm1hcChmdW5jdGlvbihkKSB7cmV0dXJuIGQuY2F0ZWdvcmllcy5sZW5ndGg7fSlcbiAgICAgICAgLnJlZHVjZShmdW5jdGlvbih2MSwgdjIpIHtyZXR1cm4gTWF0aC5tYXgodjEsIHYyKTt9KTtcbiAgICByZXR1cm4ge2RpbWVuc2lvbnM6IGRpbWVuc2lvbnMsIHBhdGhzOiBwYXRocywgdHJhY2U6IHVuZGVmaW5lZCwgbWF4Q2F0czogbWF4Q2F0cywgY291bnQ6IGNvdW50fTtcbn1cblxuLy8gRGltZW5zaW9uIE1vZGVsXG4vLyAtLS0tLS0tLS0tLS0tLS1cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gRGltZW5zaW9uTW9kZWxcbiAqICBPYmplY3QgY29udGFpbmluZyBjYWxjdWxhdGVkIGluZm9ybWF0aW9uIGFib3V0IGEgc2luZ2xlIGRpbWVuc2lvblxuICpcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaW1lbnNpb25JbmRcbiAqICBUaGUgaW5kZXggb2YgdGhpcyBkaW1lbnNpb24gYW1vbmcgdGhlICp2aXNpYmxlKiBkaW1lbnNpb25zXG4gKiBAcHJvcGVydHkge051bWJlcn0gY29udGFpbmVySW5kXG4gKiAgVGhlIGluZGV4IG9mIHRoaXMgZGltZW5zaW9uIGluIHRoZSBvcmlnaW5hbCBkaW1lbnNpb25zIGNvbnRhaW5lcixcbiAqICBpcnJlc3BlY3RpdmUgb2YgZGltZW5zaW9uIHZpc2liaWxpdHlcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBkaXNwbGF5SW5kXG4gKiAgVGhlIGRpc3BsYXkgaW5kZXggb2YgdGhpcyBkaW1lbnNpb24gKHdoZXJlIDAgaXMgdGhlIGxlZnQgbW9zdCBkaW1lbnNpb24pXG4gKiBAcHJvcGVydHkge1N0cmluZ30gZGltZW5zaW9uTGFiZWxcbiAqICBUaGUgbGFiZWwgb2YgdGhpcyBkaW1lbnNpb25cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBjb3VudFxuICogIFRvdGFsIG51bWJlciBvZiBpbnB1dCB2YWx1ZXNcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPENhdGVnb3J5TW9kZWw+fSBjYXRlZ29yaWVzXG4gKiBAcHJvcGVydHkge051bWJlcnxudWxsfSBkcmFnWFxuICogIFRoZSB4IHBvc2l0aW9uIG9mIGRpbWVuc2lvbiB0aGF0IGlzIGN1cnJlbnRseSBiZWluZyBkcmFnZ2VkLiBudWxsIGlmIG5vdCBiZWluZyBkcmFnZ2VkXG4gKi9cblxuLyoqXG4gKiBDcmVhdGUgYW5kIG5ldyBEaW1lbnNpb25Nb2RlbCBvYmplY3Qgd2l0aCBhbiBlbXB0eSBjYXRlZ29yaWVzIGFycmF5XG4gKiBAcGFyYW0ge051bWJlcn0gZGltZW5zaW9uSW5kXG4gKiBAcGFyYW0ge051bWJlcn0gY29udGFpbmVySW5kXG4gKiBAcGFyYW0ge051bWJlcn0gZGlzcGxheUluZFxuICogQHBhcmFtIHtTdHJpbmd9IGRpbWVuc2lvbkxhYmVsXG4gKiBAcGFyYW0ge051bWJlcn0gY291bnRcbiAqICBUb3RhbCBudW1iZXIgb2YgaW5wdXQgdmFsdWVzXG4gKiBAcmV0dXJuIHtEaW1lbnNpb25Nb2RlbH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlRGltZW5zaW9uTW9kZWwoZGltZW5zaW9uSW5kLCBjb250YWluZXJJbmQsIGRpc3BsYXlJbmQsIGRpbWVuc2lvbkxhYmVsLCBjb3VudCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpbWVuc2lvbkluZDogZGltZW5zaW9uSW5kLFxuICAgICAgICBjb250YWluZXJJbmQ6IGNvbnRhaW5lckluZCxcbiAgICAgICAgZGlzcGxheUluZDogZGlzcGxheUluZCxcbiAgICAgICAgZGltZW5zaW9uTGFiZWw6IGRpbWVuc2lvbkxhYmVsLFxuICAgICAgICBjb3VudDogY291bnQsXG4gICAgICAgIGNhdGVnb3JpZXM6IFtdLFxuICAgICAgICBkcmFnWDogbnVsbFxuICAgIH07XG59XG5cbi8vIENhdGVnb3J5IE1vZGVsXG4vLyAtLS0tLS0tLS0tLS0tLVxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBDYXRlZ29yeU1vZGVsXG4gKiAgT2JqZWN0IGNvbnRhaW5pbmcgY2FsY3VsYXRlZCBpbmZvcm1hdGlvbiBhYm91dCBhIHNpbmdsZSBjYXRlZ29yeS5cbiAqXG4gKiBAcHJvcGVydHkge051bWJlcn0gZGltZW5zaW9uSW5kXG4gKiAgVGhlIGluZGV4IG9mIHRoaXMgY2F0ZWdvcmllcyBkaW1lbnNpb25cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBjYXRlZ29yeUluZFxuICogIFRoZSBpbmRleCBvZiB0aGlzIGNhdGVnb3J5XG4gKiBAcHJvcGVydHkge051bWJlcn0gZGlzcGxheUluZFxuICogIFRoZSBkaXNwbGF5IGluZGV4IG9mIHRoaXMgY2F0ZWdvcnkgKHdoZXJlIDAgaXMgdGhlIHRvcG1vc3QgY2F0ZWdvcnkpXG4gKiBAcHJvcGVydHkge1N0cmluZ30gY2F0ZWdvcnlMYWJlbFxuICogIFRoZSBuYW1lIG9mIHRoaXMgY2F0ZWdvcnlcbiAqIEBwcm9wZXJ0eSBjYXRlZ29yeVZhbHVlOiBSYXcgdmFsdWUgb2YgdGhlIGNhdGVnb3J5XG4gKiBAcHJvcGVydHkge0FycmF5fSB2YWx1ZUluZHNcbiAqICBBcnJheSBvZiBpbmRpY2VzIChpbnRvIHRoZSBvcmlnaW5hbCB2YWx1ZSBhcnJheSkgb2YgYWxsIHNhbXBsZXMgaW4gdGhpcyBjYXRlZ29yeVxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGNvdW50XG4gKiAgVGhlIG51bWJlciBvZiBlbGVtZW50cyBmcm9tIHRoZSBvcmlnaW5hbCBhcnJheSBpbiB0aGlzIHBhdGhcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfG51bGx9IGRyYWdZXG4gKiAgVGhlIHkgcG9zaXRpb24gb2YgY2F0ZWdvcnkgdGhhdCBpcyBjdXJyZW50bHkgYmVpbmcgZHJhZ2dlZC4gbnVsbCBpZiBub3QgYmVpbmcgZHJhZ2dlZFxuICovXG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgQ2F0ZWdvcnlNb2RlbCBvYmplY3RcbiAqIEBwYXJhbSB7TnVtYmVyfSBkaW1lbnNpb25JbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBjYXRlZ29yeUluZFxuICogIFRoZSBkaXNwbGF5IGluZGV4IG9mIHRoaXMgY2F0ZWdvcnkgKHdoZXJlIDAgaXMgdGhlIHRvcG1vc3QgY2F0ZWdvcnkpXG4gKiBAcGFyYW0ge1N0cmluZ30gY2F0ZWdvcnlWYWx1ZVxuICogQHBhcmFtIHtTdHJpbmd9IGNhdGVnb3J5TGFiZWxcbiAqIEByZXR1cm4ge0NhdGVnb3J5TW9kZWx9XG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhdGVnb3J5TW9kZWwoZGltZW5zaW9uSW5kLCBjYXRlZ29yeUluZCwgY2F0ZWdvcnlWYWx1ZSwgY2F0ZWdvcnlMYWJlbCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIGRpbWVuc2lvbkluZDogZGltZW5zaW9uSW5kLFxuICAgICAgICBjYXRlZ29yeUluZDogY2F0ZWdvcnlJbmQsXG4gICAgICAgIGNhdGVnb3J5VmFsdWU6IGNhdGVnb3J5VmFsdWUsXG4gICAgICAgIGRpc3BsYXlJbmQ6IGNhdGVnb3J5SW5kLFxuICAgICAgICBjYXRlZ29yeUxhYmVsOiBjYXRlZ29yeUxhYmVsLFxuICAgICAgICB2YWx1ZUluZHM6IFtdLFxuICAgICAgICBjb3VudDogMCxcbiAgICAgICAgZHJhZ1k6IG51bGxcbiAgICB9O1xufVxuXG4vKipcbiAqIFVwZGF0ZSBhIENhdGVnb3J5TW9kZWwgb2JqZWN0IHdpdGggYSBuZXcgdmFsdWUgaW5kZXhcbiAqIE5vdGU6IFRoZSBjYWxsaW5nIHBhcmFtZXRlciBpcyBtb2RpZmllZCBpbiBwbGFjZS5cbiAqXG4gKiBAcGFyYW0ge0NhdGVnb3J5TW9kZWx9IGNhdGVnb3J5TW9kZWxcbiAqIEBwYXJhbSB7TnVtYmVyfSB2YWx1ZUluZFxuICogQHBhcmFtIHtOdW1iZXJ9IGNvdW50XG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZUNhdGVnb3J5TW9kZWwoY2F0ZWdvcnlNb2RlbCwgdmFsdWVJbmQsIGNvdW50KSB7XG4gICAgY2F0ZWdvcnlNb2RlbC52YWx1ZUluZHMucHVzaCh2YWx1ZUluZCk7XG4gICAgY2F0ZWdvcnlNb2RlbC5jb3VudCArPSBjb3VudDtcbn1cblxuXG4vLyBQYXRoIE1vZGVsXG4vLyAtLS0tLS0tLS0tXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IFBhdGhNb2RlbFxuICogIE9iamVjdCBjb250YWluaW5nIGNhbGN1bGF0ZWQgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHNhbXBsZXMgaW4gYSBwYXRoLlxuICpcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IGNhdGVnb3J5SW5kc1xuICogIEFycmF5IG9mIGNhdGVnb3J5IGluZGljZXMgZm9yIGVhY2ggZGltZW5zaW9uIChsZW5ndGggYG51bURpbWVuc2lvbnNgKVxuICogQHBhcmFtIHtTdHJpbmd9IHBhdGhDb2xvclxuICogIENvbG9yIG9mIHRoaXMgcGF0aC4gKE5vdGU6IEFueSBjb2xvcnNjYWxpbmcgaGFzIGFscmVhZHkgdGFrZW4gcGxhY2UpXG4gKiBAcHJvcGVydHkge0FycmF5fSB2YWx1ZUluZHNcbiAqICBBcnJheSBvZiBpbmRpY2VzIChpbnRvIHRoZSBvcmlnaW5hbCB2YWx1ZSBhcnJheSkgb2YgYWxsIHNhbXBsZXMgaW4gdGhpcyBwYXRoXG4gKiBAcHJvcGVydHkge051bWJlcn0gY291bnRcbiAqICBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIGZyb20gdGhlIG9yaWdpbmFsIGFycmF5IGluIHRoaXMgcGF0aFxuICogQHByb3BlcnR5IHtTdHJpbmd9IGNvbG9yXG4gKiAgVGhlIHBhdGgncyBjb2xvciAoYXNzIENTUyBjb2xvciBzdHJpbmcpXG4gKiBAcHJvcGVydHkgcmF3Q29sb3JcbiAqICBUaGUgcmF3IGNvbG9yIHZhbHVlIHNwZWNpZmllZCBieSB0aGUgdXNlci4gTWF5IGJlIGEgQ1NTIGNvbG9yIHN0cmluZyBvciBhIE51bWJlclxuICovXG5cbi8qKlxuICogQ3JlYXRlIGFuZCByZXR1cm4gYSBuZXcgUGF0aE1vZGVsIG9iamVjdFxuICogQHBhcmFtIHtBcnJheX0gY2F0ZWdvcnlJbmRzXG4gKiBAcGFyYW0gY29sb3JcbiAqIEBwYXJhbSByYXdDb2xvclxuICogQHJldHVybiB7UGF0aE1vZGVsfVxuICovXG5mdW5jdGlvbiBjcmVhdGVQYXRoTW9kZWwoY2F0ZWdvcnlJbmRzLCBjb2xvciwgcmF3Q29sb3IpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBjYXRlZ29yeUluZHM6IGNhdGVnb3J5SW5kcyxcbiAgICAgICAgY29sb3I6IGNvbG9yLFxuICAgICAgICByYXdDb2xvcjogcmF3Q29sb3IsXG4gICAgICAgIHZhbHVlSW5kczogW10sXG4gICAgICAgIGNvdW50OiAwXG4gICAgfTtcbn1cblxuLyoqXG4gKiBVcGRhdGUgYSBQYXRoTW9kZWwgb2JqZWN0IHdpdGggYSBuZXcgdmFsdWUgaW5kZXhcbiAqIE5vdGU6IFRoZSBjYWxsaW5nIHBhcmFtZXRlciBpcyBtb2RpZmllZCBpbiBwbGFjZS5cbiAqXG4gKiBAcGFyYW0ge1BhdGhNb2RlbH0gcGF0aE1vZGVsXG4gKiBAcGFyYW0ge051bWJlcn0gdmFsdWVJbmRcbiAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudFxuICovXG5mdW5jdGlvbiB1cGRhdGVQYXRoTW9kZWwocGF0aE1vZGVsLCB2YWx1ZUluZCwgY291bnQpIHtcbiAgICBwYXRoTW9kZWwudmFsdWVJbmRzLnB1c2godmFsdWVJbmQpO1xuICAgIHBhdGhNb2RlbC5jb3VudCArPSBjb3VudDtcbn1cblxuLy8gVW5pcXVlIGNhbGN1bGF0aW9uc1xuLy8gPT09PT09PT09PT09PT09PT09PVxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBVbmlxdWVJbmZvXG4gKiAgT2JqZWN0IGNvbnRhaW5pbmcgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHVuaXF1ZSB2YWx1ZXMgb2YgYW4gaW5wdXQgYXJyYXlcbiAqXG4gKiBAcHJvcGVydHkge0FycmF5fSB1bmlxdWVWYWx1ZXNcbiAqICBUaGUgdW5pcXVlIHZhbHVlcyBpbiB0aGUgaW5wdXQgYXJyYXlcbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IHVuaXF1ZUNvdW50c1xuICogIFRoZSBudW1iZXIgb2YgdGltZXMgZWFjaCBlbnRyeSBpbiB1bmlxdWVWYWx1ZXMgb2NjdXJzIGluIGlucHV0IGFycmF5LlxuICogIFRoaXMgaGFzIHRoZSBzYW1lIGxlbmd0aCBhcyBgdW5pcXVlVmFsdWVzYFxuICogQHByb3BlcnR5IHtBcnJheX0gaW5kc1xuICogIEluZGljZXMgaW50byB1bmlxdWVWYWx1ZXMgdGhhdCB3b3VsZCByZXByb2R1Y2Ugb3JpZ2luYWwgaW5wdXQgYXJyYXlcbiAqL1xuXG4vKipcbiAqIENvbXB1dGUgdW5pcXVlIHZhbHVlIGluZm9ybWF0aW9uIGZvciBhbiBhcnJheVxuICpcbiAqIElNUE9SVEFOVDogTm90ZSB0aGF0IHZhbHVlcyBhcmUgY29uc2lkZXJlZCB1bmlxdWVcbiAqIGlmIHRoZWlyIHN0cmluZyByZXByZXNlbnRhdGlvbnMgYXJlIHVuaXF1ZS5cbiAqXG4gKiBAcGFyYW0ge0FycmF5fSB2YWx1ZXNcbiAqIEBwYXJhbSB7QXJyYXl8dW5kZWZpbmVkfSB1bmlxdWVWYWx1ZXNcbiAqICBBcnJheSBvZiBleHBlY3RlZCB1bmlxdWUgdmFsdWVzLiBUaGUgdW5pcXVlVmFsdWVzIHByb3BlcnR5IG9mIHRoZSByZXN1bHRpbmcgVW5pcXVlSW5mbyBvYmplY3Qgd2lsbCBiZWdpbiB3aXRoXG4gKiAgdGhlc2UgZW50cmllcy4gRW50cmllcyBhcmUgaW5jbHVkZWQgZXZlbiBpZiB0aGVyZSBhcmUgemVybyBvY2N1cnJlbmNlcyBpbiB0aGUgdmFsdWVzIGFycmF5LiBFbnRyaWVzIGZvdW5kIGluXG4gKiAgdGhlIHZhbHVlcyBhcnJheSB0aGF0IGFyZSBub3QgcHJlc2VudCBpbiB1bmlxdWVWYWx1ZXMgd2lsbCBiZSBpbmNsdWRlZCBhdCB0aGUgZW5kIG9mIHRoZSBhcnJheSBpbiB0aGVcbiAqICBVbmlxdWVJbmZvIG9iamVjdC5cbiAqIEByZXR1cm4ge1VuaXF1ZUluZm99XG4gKi9cbmZ1bmN0aW9uIGdldFVuaXF1ZUluZm8odmFsdWVzLCB1bmlxdWVWYWx1ZXMpIHtcbiAgICAvLyBJbml0aWFsaXplIHVuaXF1ZVZhbHVlcyBpZiBub3Qgc3BlY2lmaWVkXG4gICAgaWYodW5pcXVlVmFsdWVzID09PSB1bmRlZmluZWQgfHwgdW5pcXVlVmFsdWVzID09PSBudWxsKSB7XG4gICAgICAgIHVuaXF1ZVZhbHVlcyA9IFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFNoYWxsb3cgY29weSBzbyBhcHBlbmQgYmVsb3cgZG9lc24ndCBhbHRlciBpbnB1dCBhcnJheVxuICAgICAgICB1bmlxdWVWYWx1ZXMgPSB1bmlxdWVWYWx1ZXMubWFwKGZ1bmN0aW9uKGUpIHtyZXR1cm4gZTt9KTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIFZhcmlhYmxlc1xuICAgIHZhciB1bmlxdWVWYWx1ZUNvdW50cyA9IHt9O1xuICAgIHZhciB1bmlxdWVWYWx1ZUluZHMgPSB7fTtcbiAgICB2YXIgaW5kcyA9IFtdO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB1bmlxdWVWYWx1ZUNvdW50cyBhbmRcbiAgICB1bmlxdWVWYWx1ZXMuZm9yRWFjaChmdW5jdGlvbih1bmlxdWVWYWwsIHZhbEluZCkge1xuICAgICAgICB1bmlxdWVWYWx1ZUNvdW50c1t1bmlxdWVWYWxdID0gMDtcbiAgICAgICAgdW5pcXVlVmFsdWVJbmRzW3VuaXF1ZVZhbF0gPSB2YWxJbmQ7XG4gICAgfSk7XG5cbiAgICAvLyBDb21wdXRlIHRoZSBuZWNlc3NhcnkgdW5pcXVlIGluZm8gaW4gYSBzaW5nbGUgcGFzc1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGl0ZW0gPSB2YWx1ZXNbaV07XG4gICAgICAgIHZhciBpdGVtSW5kO1xuXG4gICAgICAgIGlmKHVuaXF1ZVZhbHVlQ291bnRzW2l0ZW1dID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXRlbSBoYXMgYSBwcmV2aW91c2x5IHVuc2VlbiB2YWx1ZVxuICAgICAgICAgICAgdW5pcXVlVmFsdWVDb3VudHNbaXRlbV0gPSAxO1xuICAgICAgICAgICAgaXRlbUluZCA9IHVuaXF1ZVZhbHVlcy5wdXNoKGl0ZW0pIC0gMTtcbiAgICAgICAgICAgIHVuaXF1ZVZhbHVlSW5kc1tpdGVtXSA9IGl0ZW1JbmQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBJbmNyZW1lbnQgY291bnQgZm9yIHRoaXMgaXRlbVxuICAgICAgICAgICAgdW5pcXVlVmFsdWVDb3VudHNbaXRlbV0rKztcbiAgICAgICAgICAgIGl0ZW1JbmQgPSB1bmlxdWVWYWx1ZUluZHNbaXRlbV07XG4gICAgICAgIH1cbiAgICAgICAgaW5kcy5wdXNoKGl0ZW1JbmQpO1xuICAgIH1cblxuICAgIC8vIEJ1aWxkIFVuaXF1ZUluZm9cbiAgICB2YXIgdW5pcXVlQ291bnRzID0gdW5pcXVlVmFsdWVzLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiB1bmlxdWVWYWx1ZUNvdW50c1t2XTsgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICB1bmlxdWVWYWx1ZXM6IHVuaXF1ZVZhbHVlcyxcbiAgICAgICAgdW5pcXVlQ291bnRzOiB1bmlxdWVDb3VudHMsXG4gICAgICAgIGluZHM6IGluZHNcbiAgICB9O1xufVxuXG5cbi8qKlxuICogVmFsaWRhdGUgdGhlIHJlcXVlc3RlZCBkaXNwbGF5IG9yZGVyIGZvciB0aGUgZGltZW5zaW9ucy5cbiAqIElmIHRoZSBkaXNwbGF5IG9yZGVyIGlzIGEgcGVybXV0YXRpb24gb2YgMCB0aHJvdWdoIGRpbWVuc2lvbnMubGVuZ3RoIC0gMSwgbGluayB0byBfZGlzcGxheWluZGV4XG4gKiBPdGhlcndpc2UsIHJlcGxhY2UgdGhlIGRpc3BsYXkgb3JkZXIgd2l0aCB0aGUgZGltZW5zaW9uIG9yZGVyXG4gKiBAcGFyYW0ge09iamVjdH0gdHJhY2VcbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVEaW1lbnNpb25EaXNwbGF5SW5kcyh2aXNpYmxlRGltcykge1xuICAgIHZhciBkaXNwbGF5SW5kcyA9IHZpc2libGVEaW1zLm1hcChmdW5jdGlvbihkKSB7IHJldHVybiBkLmRpc3BsYXlpbmRleDsgfSk7XG4gICAgdmFyIGk7XG5cbiAgICBpZihpc1JhbmdlUGVybXV0YXRpb24oZGlzcGxheUluZHMpKSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IHZpc2libGVEaW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2aXNpYmxlRGltc1tpXS5fZGlzcGxheWluZGV4ID0gdmlzaWJsZURpbXNbaV0uZGlzcGxheWluZGV4O1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgdmlzaWJsZURpbXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZpc2libGVEaW1zW2ldLl9kaXNwbGF5aW5kZXggPSBpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKlxuICogVXBkYXRlIGNhdGVnb3J5IHByb3BlcnRpZXMgYmFzZWQgb24gdGhlIHVuaXF1ZSB2YWx1ZXMgZm91bmQgZm9yIHRoaXMgZGltZW5zaW9uXG4gKiBAcGFyYW0ge09iamVjdH0gZGltXG4gKiBAcGFyYW0ge1VuaXF1ZUluZm99IHVuaXF1ZUluZm9EaW1cbiAqL1xuZnVuY3Rpb24gdmFsaWRhdGVDYXRlZ29yeVByb3BlcnRpZXMoZGltLCB1bmlxdWVJbmZvRGltKSB7XG4gICAgLy8gVXBkYXRlIGNhdGVnb3J5YXJyYXlcbiAgICBkaW0uX2NhdGVnb3J5YXJyYXkgPSB1bmlxdWVJbmZvRGltLnVuaXF1ZVZhbHVlcztcblxuICAgIC8vIEhhbmRsZSB0aWNrdGV4dFxuICAgIGlmKGRpbS50aWNrdGV4dCA9PT0gbnVsbCB8fCBkaW0udGlja3RleHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkaW0uX3RpY2t0ZXh0ID0gW107XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gU2hhbGxvdyBjb3B5IHRvIGF2b2lkIG1vZGlmeWluZyBpbnB1dCBhcnJheVxuICAgICAgICBkaW0uX3RpY2t0ZXh0ID0gZGltLnRpY2t0ZXh0LnNsaWNlKCk7XG4gICAgfVxuXG4gICAgLy8gRXh0ZW5kIHRpY2t0ZXh0IHdpdGggZWxlbWVudHMgZnJvbSB1bmlxdWVJbmZvRGltLnVuaXF1ZVZhbHVlc1xuICAgIGZvcih2YXIgaSA9IGRpbS5fdGlja3RleHQubGVuZ3RoOyBpIDwgdW5pcXVlSW5mb0RpbS51bmlxdWVWYWx1ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZGltLl90aWNrdGV4dC5wdXNoKHVuaXF1ZUluZm9EaW0udW5pcXVlVmFsdWVzW2ldKTtcbiAgICB9XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIHdoZXRoZXIgYW4gYXJyYXkgY29udGFpbnMgYSBwZXJtdXRhdGlvbiBvZiB0aGUgaW50ZWdlcnMgZnJvbSAwIHRvIHRoZSBhcnJheSdzIGxlbmd0aCAtIDFcbiAqIEBwYXJhbSB7QXJyYXl9IGluZHNcbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGlzUmFuZ2VQZXJtdXRhdGlvbihpbmRzKSB7XG4gICAgdmFyIGluZHNTcGVjaWZpZWQgPSBuZXcgQXJyYXkoaW5kcy5sZW5ndGgpO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGluZHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIG91dCBvZiBib3VuZHNcbiAgICAgICAgaWYoaW5kc1tpXSA8IDAgfHwgaW5kc1tpXSA+PSBpbmRzLmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIGNvbGxpc2lvbnMgd2l0aCBhbHJlYWR5IHNwZWNpZmllZCBpbmRleFxuICAgICAgICBpZihpbmRzU3BlY2lmaWVkW2luZHNbaV1dICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGluZHNTcGVjaWZpZWRbaW5kc1tpXV0gPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIE5vdGhpbmcgb3V0IG9mIGJvdW5kcyBhbmQgbm8gY29sbGlzaW9ucy4gV2UgaGF2ZSBhIHBlcm11dGF0aW9uXG4gICAgcmV0dXJuIHRydWU7XG59XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBoYXNDb2xvcnNjYWxlID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2hlbHBlcnMnKS5oYXNDb2xvcnNjYWxlO1xudmFyIGNvbG9yc2NhbGVEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvY29sb3JzY2FsZS9kZWZhdWx0cycpO1xudmFyIGhhbmRsZURvbWFpbkRlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZG9tYWluJykuZGVmYXVsdHM7XG52YXIgaGFuZGxlQXJyYXlDb250YWluZXJEZWZhdWx0cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2FycmF5X2NvbnRhaW5lcl9kZWZhdWx0cycpO1xuXG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xudmFyIG1lcmdlTGVuZ3RoID0gcmVxdWlyZSgnLi4vcGFyY29vcmRzL21lcmdlX2xlbmd0aCcpO1xuXG5mdW5jdGlvbiBoYW5kbGVMaW5lRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIGRlZmF1bHRDb2xvciwgbGF5b3V0LCBjb2VyY2UpIHtcbiAgICBjb2VyY2UoJ2xpbmUuc2hhcGUnKTtcbiAgICBjb2VyY2UoJ2xpbmUuaG92ZXJ0ZW1wbGF0ZScpO1xuXG4gICAgdmFyIGxpbmVDb2xvciA9IGNvZXJjZSgnbGluZS5jb2xvcicsIGxheW91dC5jb2xvcndheVswXSk7XG4gICAgaWYoaGFzQ29sb3JzY2FsZSh0cmFjZUluLCAnbGluZScpICYmIExpYi5pc0FycmF5T3JUeXBlZEFycmF5KGxpbmVDb2xvcikpIHtcbiAgICAgICAgaWYobGluZUNvbG9yLmxlbmd0aCkge1xuICAgICAgICAgICAgY29lcmNlKCdsaW5lLmNvbG9yc2NhbGUnKTtcbiAgICAgICAgICAgIGNvbG9yc2NhbGVEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgbGF5b3V0LCBjb2VyY2UsIHtwcmVmaXg6ICdsaW5lLicsIGNMZXR0ZXI6ICdjJ30pO1xuICAgICAgICAgICAgcmV0dXJuIGxpbmVDb2xvci5sZW5ndGg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0cmFjZU91dC5saW5lLmNvbG9yID0gZGVmYXVsdENvbG9yO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBJbmZpbml0eTtcbn1cblxuZnVuY3Rpb24gZGltZW5zaW9uRGVmYXVsdHMoZGltZW5zaW9uSW4sIGRpbWVuc2lvbk91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGRpbWVuc2lvbkluLCBkaW1lbnNpb25PdXQsIGF0dHJpYnV0ZXMuZGltZW5zaW9ucywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IGNvZXJjZSgndmFsdWVzJyk7XG4gICAgdmFyIHZpc2libGUgPSBjb2VyY2UoJ3Zpc2libGUnKTtcbiAgICBpZighKHZhbHVlcyAmJiB2YWx1ZXMubGVuZ3RoKSkge1xuICAgICAgICB2aXNpYmxlID0gZGltZW5zaW9uT3V0LnZpc2libGUgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZih2aXNpYmxlKSB7XG4gICAgICAgIC8vIERpbWVuc2lvbiBsZXZlbFxuICAgICAgICBjb2VyY2UoJ2xhYmVsJyk7XG4gICAgICAgIGNvZXJjZSgnZGlzcGxheWluZGV4JywgZGltZW5zaW9uT3V0Ll9pbmRleCk7XG5cbiAgICAgICAgLy8gQ2F0ZWdvcnkgbGV2ZWxcbiAgICAgICAgdmFyIGFycmF5SW4gPSBkaW1lbnNpb25Jbi5jYXRlZ29yeWFycmF5O1xuICAgICAgICB2YXIgaXNWYWxpZEFycmF5ID0gKEFycmF5LmlzQXJyYXkoYXJyYXlJbikgJiYgYXJyYXlJbi5sZW5ndGggPiAwKTtcblxuICAgICAgICB2YXIgb3JkZXJEZWZhdWx0O1xuICAgICAgICBpZihpc1ZhbGlkQXJyYXkpIG9yZGVyRGVmYXVsdCA9ICdhcnJheSc7XG4gICAgICAgIHZhciBvcmRlciA9IGNvZXJjZSgnY2F0ZWdvcnlvcmRlcicsIG9yZGVyRGVmYXVsdCk7XG5cbiAgICAgICAgLy8gY29lcmNlICdjYXRlZ29yeWFycmF5JyBvbmx5IGluIGFycmF5IG9yZGVyIGNhc2VcbiAgICAgICAgaWYob3JkZXIgPT09ICdhcnJheScpIHtcbiAgICAgICAgICAgIGNvZXJjZSgnY2F0ZWdvcnlhcnJheScpO1xuICAgICAgICAgICAgY29lcmNlKCd0aWNrdGV4dCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIGRpbWVuc2lvbkluLmNhdGVnb3J5YXJyYXk7XG4gICAgICAgICAgICBkZWxldGUgZGltZW5zaW9uSW4udGlja3RleHQ7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjYW5ub3Qgc2V0ICdjYXRlZ29yeW9yZGVyJyB0byAnYXJyYXknIHdpdGggYW4gaW52YWxpZCAnY2F0ZWdvcnlhcnJheSdcbiAgICAgICAgaWYoIWlzVmFsaWRBcnJheSAmJiBvcmRlciA9PT0gJ2FycmF5Jykge1xuICAgICAgICAgICAgZGltZW5zaW9uT3V0LmNhdGVnb3J5b3JkZXIgPSAndHJhY2UnO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN1cHBseURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCkge1xuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKHRyYWNlSW4sIHRyYWNlT3V0LCBhdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgZGltZW5zaW9ucyA9IGhhbmRsZUFycmF5Q29udGFpbmVyRGVmYXVsdHModHJhY2VJbiwgdHJhY2VPdXQsIHtcbiAgICAgICAgbmFtZTogJ2RpbWVuc2lvbnMnLFxuICAgICAgICBoYW5kbGVJdGVtRGVmYXVsdHM6IGRpbWVuc2lvbkRlZmF1bHRzXG4gICAgfSk7XG5cbiAgICB2YXIgbGVuID0gaGFuZGxlTGluZURlZmF1bHRzKHRyYWNlSW4sIHRyYWNlT3V0LCBkZWZhdWx0Q29sb3IsIGxheW91dCwgY29lcmNlKTtcblxuICAgIGhhbmRsZURvbWFpbkRlZmF1bHRzKHRyYWNlT3V0LCBsYXlvdXQsIGNvZXJjZSk7XG5cbiAgICBpZighQXJyYXkuaXNBcnJheShkaW1lbnNpb25zKSB8fCAhZGltZW5zaW9ucy5sZW5ndGgpIHtcbiAgICAgICAgdHJhY2VPdXQudmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG1lcmdlTGVuZ3RoKHRyYWNlT3V0LCBkaW1lbnNpb25zLCAndmFsdWVzJywgbGVuKTtcblxuICAgIGNvZXJjZSgnaG92ZXJvbicpO1xuICAgIGNvZXJjZSgnaG92ZXJ0ZW1wbGF0ZScpO1xuICAgIGNvZXJjZSgnYXJyYW5nZW1lbnQnKTtcbiAgICBjb2VyY2UoJ2J1bmRsZWNvbG9ycycpO1xuICAgIGNvZXJjZSgnc29ydHBhdGhzJyk7XG4gICAgY29lcmNlKCdjb3VudHMnKTtcblxuICAgIHZhciBsYWJlbGZvbnREZmx0ID0ge1xuICAgICAgICBmYW1pbHk6IGxheW91dC5mb250LmZhbWlseSxcbiAgICAgICAgc2l6ZTogTWF0aC5yb3VuZChsYXlvdXQuZm9udC5zaXplKSxcbiAgICAgICAgY29sb3I6IGxheW91dC5mb250LmNvbG9yXG4gICAgfTtcblxuICAgIExpYi5jb2VyY2VGb250KGNvZXJjZSwgJ2xhYmVsZm9udCcsIGxhYmVsZm9udERmbHQpO1xuXG4gICAgdmFyIGNhdGVnb3J5Zm9udERlZmF1bHQgPSB7XG4gICAgICAgIGZhbWlseTogbGF5b3V0LmZvbnQuZmFtaWx5LFxuICAgICAgICBzaXplOiBNYXRoLnJvdW5kKGxheW91dC5mb250LnNpemUgLyAxLjIpLFxuICAgICAgICBjb2xvcjogbGF5b3V0LmZvbnQuY29sb3JcbiAgICB9O1xuXG4gICAgTGliLmNvZXJjZUZvbnQoY29lcmNlLCAndGlja2ZvbnQnLCBjYXRlZ29yeWZvbnREZWZhdWx0KTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJyksXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JyksXG4gICAgY29sb3JiYXI6IHtcbiAgICAgICAgY29udGFpbmVyOiAnbGluZScsXG4gICAgICAgIG1pbjogJ2NtaW4nLFxuICAgICAgICBtYXg6ICdjbWF4J1xuICAgIH0sXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICdwYXJjYXRzJyxcbiAgICBiYXNlUGxvdE1vZHVsZTogcmVxdWlyZSgnLi9iYXNlX3Bsb3QnKSxcbiAgICBjYXRlZ29yaWVzOiBbJ25vT3BhY2l0eSddLFxuICAgIG1ldGE6IHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdQYXJhbGxlbCBjYXRlZ29yaWVzIGRpYWdyYW0gZm9yIG11bHRpZGltZW5zaW9uYWwgY2F0ZWdvcmljYWwgZGF0YS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBQbG90bHkgPSByZXF1aXJlKCcuLi8uLi9wbG90X2FwaS9wbG90X2FwaScpO1xudmFyIEZ4ID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9meCcpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciB0aW55Y29sb3IgPSByZXF1aXJlKCd0aW55Y29sb3IyJyk7XG52YXIgc3ZnVGV4dFV0aWxzID0gcmVxdWlyZSgnLi4vLi4vbGliL3N2Z190ZXh0X3V0aWxzJyk7XG5cbmZ1bmN0aW9uIHBlcmZvcm1QbG90KHBhcmNhdHNNb2RlbHMsIGdyYXBoRGl2LCBsYXlvdXQsIHN2Zykge1xuICAgIHZhciB2aWV3TW9kZWxzID0gcGFyY2F0c01vZGVscy5tYXAoY3JlYXRlUGFyY2F0c1ZpZXdNb2RlbC5iaW5kKDAsIGdyYXBoRGl2LCBsYXlvdXQpKTtcblxuICAgIC8vIEdldCAocG90ZW50aWFsbHkgZW1wdHkpIHBhcmNhdHNsYXllciBzZWxlY3Rpb24gd2l0aCBib3VuZCBkYXRhIHRvIHNpbmdsZSBlbGVtZW50IGFycmF5XG4gICAgdmFyIGxheWVyU2VsZWN0aW9uID0gc3ZnLnNlbGVjdEFsbCgnZy5wYXJjYXRzbGF5ZXInKS5kYXRhKFtudWxsXSk7XG5cbiAgICAvLyBJbml0aWFsaXplIHNpbmdsZSBwYXJjYXRzbGF5ZXIgZ3JvdXAgaWYgaXQgZG9lc24ndCBleGlzdFxuICAgIGxheWVyU2VsZWN0aW9uLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdwYXJjYXRzbGF5ZXInKVxuICAgICAgICAuc3R5bGUoJ3BvaW50ZXItZXZlbnRzJywgJ2FsbCcpO1xuXG4gICAgLy8gQmluZCBkYXRhIHRvIGNoaWxkcmVuIG9mIGxheWVyU2VsZWN0aW9uIGFuZCBnZXQgcmVmZXJlbmNlIHRvIHRyYWNlU2VsZWN0aW9uXG4gICAgdmFyIHRyYWNlU2VsZWN0aW9uID0gbGF5ZXJTZWxlY3Rpb25cbiAgICAgICAgLnNlbGVjdEFsbCgnZy50cmFjZS5wYXJjYXRzJylcbiAgICAgICAgLmRhdGEodmlld01vZGVscywga2V5KTtcblxuICAgIC8vIEluaXRpYWxpemUgZ3JvdXAgZm9yIGVhY2ggdHJhY2UvZGltZW5zaW9uc1xuICAgIHZhciB0cmFjZUVudGVyID0gdHJhY2VTZWxlY3Rpb24uZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3RyYWNlIHBhcmNhdHMnKTtcblxuICAgIC8vIFVwZGF0ZSBwcm9wZXJ0aWVzIGZvciBlYWNoIHRyYWNlXG4gICAgdHJhY2VTZWxlY3Rpb25cbiAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCAnICsgZC55ICsgJyknO1xuICAgICAgICB9KTtcblxuICAgIC8vIEluaXRpYWxpemUgcGF0aHMgZ3JvdXBcbiAgICB0cmFjZUVudGVyXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAncGF0aHMnKTtcblxuICAgIC8vIFVwZGF0ZSBwYXRocyB0cmFuc2Zvcm1cbiAgICB2YXIgcGF0aHNTZWxlY3Rpb24gPSB0cmFjZVNlbGVjdGlvblxuICAgICAgICAuc2VsZWN0KCdnLnBhdGhzJyk7XG5cbiAgICAvLyBHZXQgcGF0aHMgc2VsZWN0aW9uXG4gICAgdmFyIHBhdGhTZWxlY3Rpb24gPSBwYXRoc1NlbGVjdGlvblxuICAgICAgICAuc2VsZWN0QWxsKCdwYXRoLnBhdGgnKVxuICAgICAgICAuZGF0YShmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5wYXRocztcbiAgICAgICAgfSwga2V5KTtcblxuICAgIC8vIFVwZGF0ZSBleGlzdGluZyBwYXRoIGNvbG9yc1xuICAgIHBhdGhTZWxlY3Rpb25cbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5tb2RlbC5jb2xvcjtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBDcmVhdGUgcGF0aHNcbiAgICB2YXIgcGF0aFNlbGVjdGlvbkVudGVyID0gcGF0aFNlbGVjdGlvblxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdwYXRoJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ3BhdGgnKVxuICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCAwKVxuICAgICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLm1vZGVsLmNvbG9yO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignZmlsbC1vcGFjaXR5JywgMCk7XG5cbiAgICBzdHlsZVBhdGhzTm9Ib3ZlcihwYXRoU2VsZWN0aW9uRW50ZXIpO1xuXG4gICAgLy8gU2V0IHBhdGggZ2VvbWV0cnlcbiAgICBwYXRoU2VsZWN0aW9uXG4gICAgICAgIC5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuc3ZnRDtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBzb3J0IHBhdGhzXG4gICAgaWYoIXBhdGhTZWxlY3Rpb25FbnRlci5lbXB0eSgpKSB7XG4gICAgICAgIC8vIE9ubHkgc29ydCBwYXRocyBpZiB0aGVyZSBoYXMgYmVlbiBhIGNoYW5nZS5cbiAgICAgICAgLy8gT3RoZXJ3aXNlIHBhdGhzIGFyZSBhbHJlYWR5IHNvcnRlZCBvciBhIGhvdmVyIG9wZXJhdGlvbiBtYXkgYmUgaW4gcHJvZ3Jlc3NcbiAgICAgICAgcGF0aFNlbGVjdGlvbi5zb3J0KGNvbXBhcmVSYXdDb2xvcik7XG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSBvbGQgcGF0aHNcbiAgICBwYXRoU2VsZWN0aW9uLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIC8vIFBhdGggaG92ZXJcbiAgICBwYXRoU2VsZWN0aW9uXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgbW91c2VvdmVyUGF0aClcbiAgICAgICAgLm9uKCdtb3VzZW91dCcsIG1vdXNlb3V0UGF0aClcbiAgICAgICAgLm9uKCdjbGljaycsIGNsaWNrUGF0aCk7XG5cbiAgICAvLyBJbml0aWFsaXplIGRpbWVuc2lvbnMgZ3JvdXBcbiAgICB0cmFjZUVudGVyLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ2RpbWVuc2lvbnMnKTtcblxuICAgIC8vIFVwZGF0ZSBkaW1lbnNpb25zIHRyYW5zZm9ybVxuICAgIHZhciBkaW1lbnNpb25zU2VsZWN0aW9uID0gdHJhY2VTZWxlY3Rpb25cbiAgICAgICAgLnNlbGVjdCgnZy5kaW1lbnNpb25zJyk7XG5cbiAgICAvLyBHZXQgZGltZW5zaW9uIHNlbGVjdGlvblxuICAgIHZhciBkaW1lbnNpb25TZWxlY3Rpb24gPSBkaW1lbnNpb25zU2VsZWN0aW9uXG4gICAgICAgIC5zZWxlY3RBbGwoJ2cuZGltZW5zaW9uJylcbiAgICAgICAgLmRhdGEoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuZGltZW5zaW9ucztcbiAgICAgICAgfSwga2V5KTtcblxuICAgIC8vIENyZWF0ZSBkaW1lbnNpb24gZ3JvdXBzXG4gICAgZGltZW5zaW9uU2VsZWN0aW9uLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdkaW1lbnNpb24nKTtcblxuICAgIC8vIFVwZGF0ZSBkaW1lbnNpb24gZ3JvdXAgdHJhbnNmb3Jtc1xuICAgIGRpbWVuc2lvblNlbGVjdGlvbi5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnLCAwKSc7XG4gICAgfSk7XG5cbiAgICAvLyBSZW1vdmUgYW55IG9sZCBkaW1lbnNpb25zXG4gICAgZGltZW5zaW9uU2VsZWN0aW9uLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIC8vIEdldCBjYXRlZ29yeSBzZWxlY3Rpb25cbiAgICB2YXIgY2F0ZWdvcnlTZWxlY3Rpb24gPSBkaW1lbnNpb25TZWxlY3Rpb25cbiAgICAgICAgLnNlbGVjdEFsbCgnZy5jYXRlZ29yeScpXG4gICAgICAgIC5kYXRhKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNhdGVnb3JpZXM7XG4gICAgICAgIH0sIGtleSk7XG5cbiAgICAvLyBJbml0aWFsaXplIGNhdGVnb3J5IGdyb3Vwc1xuICAgIHZhciBjYXRlZ29yeUdyb3VwRW50ZXJTZWxlY3Rpb24gPSBjYXRlZ29yeVNlbGVjdGlvblxuICAgICAgICAuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2NhdGVnb3J5Jyk7XG5cbiAgICAvLyBVcGRhdGUgY2F0ZWdvcnkgdHJhbnNmb3Jtc1xuICAgIGNhdGVnb3J5U2VsZWN0aW9uXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAnICsgZC55ICsgJyknO1xuICAgICAgICB9KTtcblxuXG4gICAgLy8gSW5pdGlhbGl6ZSByZWN0YW5nbGVcbiAgICBjYXRlZ29yeUdyb3VwRW50ZXJTZWxlY3Rpb25cbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjYXRyZWN0JylcbiAgICAgICAgLmF0dHIoJ3BvaW50ZXItZXZlbnRzJywgJ25vbmUnKTtcblxuXG4gICAgLy8gVXBkYXRlIHJlY3RhbmdsZVxuICAgIGNhdGVnb3J5U2VsZWN0aW9uLnNlbGVjdCgncmVjdC5jYXRyZWN0JylcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLndpZHRoO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignaGVpZ2h0JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuaGVpZ2h0O1xuICAgICAgICB9KTtcblxuICAgIHN0eWxlQ2F0ZWdvcmllc05vSG92ZXIoY2F0ZWdvcnlHcm91cEVudGVyU2VsZWN0aW9uKTtcblxuICAgIC8vIEluaXRpYWxpemUgY29sb3IgYmFuZCByZWN0c1xuICAgIHZhciBiYW5kU2VsZWN0aW9uID0gY2F0ZWdvcnlTZWxlY3Rpb25cbiAgICAgICAgLnNlbGVjdEFsbCgncmVjdC5iYW5kcmVjdCcpXG4gICAgICAgIC5kYXRhKFxuICAgICAgICAgICAgLyoqIEBwYXJhbSB7Q2F0ZWdvcnlWaWV3TW9kZWx9IGNhdFZpZXdNb2RlbCovXG4gICAgICAgICAgICBmdW5jdGlvbihjYXRWaWV3TW9kZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2F0Vmlld01vZGVsLmJhbmRzO1xuICAgICAgICAgICAgfSwga2V5KTtcblxuICAgIC8vIFJhaXNlIGFsbCB1cGRhdGUgYmFuZHMgdG8gdGhlIHRvcCBzbyB0aGF0IGZhZGluZyBlbnRlci9leGl0IGJhbmRzIHdpbGwgYmUgYmVoaW5kXG4gICAgYmFuZFNlbGVjdGlvbi5lYWNoKGZ1bmN0aW9uKCkge0xpYi5yYWlzZVRvVG9wKHRoaXMpO30pO1xuXG4gICAgLy8gVXBkYXRlIGJhbmQgY29sb3JcbiAgICBiYW5kU2VsZWN0aW9uXG4gICAgICAgIC5hdHRyKCdmaWxsJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuY29sb3I7XG4gICAgICAgIH0pO1xuXG4gICAgdmFyIGJhbmRzU2VsZWN0aW9uRW50ZXIgPSBiYW5kU2VsZWN0aW9uLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdiYW5kcmVjdCcpXG4gICAgICAgIC5hdHRyKCdzdHJva2Utb3BhY2l0eScsIDApXG4gICAgICAgIC5hdHRyKCdmaWxsJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuY29sb3I7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwKTtcblxuICAgIGJhbmRTZWxlY3Rpb25cbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5jb2xvcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQud2lkdGg7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5oZWlnaHQ7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQueTtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2N1cnNvcicsXG4gICAgICAgICAgICAvKiogQHBhcmFtIHtDYXRlZ29yeUJhbmRWaWV3TW9kZWx9IGJhbmRNb2RlbCovXG4gICAgICAgICAgICBmdW5jdGlvbihiYW5kTW9kZWwpIHtcbiAgICAgICAgICAgICAgICBpZihiYW5kTW9kZWwucGFyY2F0c1ZpZXdNb2RlbC5hcnJhbmdlbWVudCA9PT0gJ2ZpeGVkJykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2RlZmF1bHQnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihiYW5kTW9kZWwucGFyY2F0c1ZpZXdNb2RlbC5hcnJhbmdlbWVudCA9PT0gJ3BlcnBlbmRpY3VsYXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnbnMtcmVzaXplJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ21vdmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgc3R5bGVCYW5kc05vSG92ZXIoYmFuZHNTZWxlY3Rpb25FbnRlcik7XG5cbiAgICBiYW5kU2VsZWN0aW9uLmV4aXQoKS5yZW1vdmUoKTtcblxuICAgIC8vIEluaXRpYWxpemUgY2F0ZWdvcnkgbGFiZWxcbiAgICBjYXRlZ29yeUdyb3VwRW50ZXJTZWxlY3Rpb25cbiAgICAgICAgLmFwcGVuZCgndGV4dCcpXG4gICAgICAgIC5hdHRyKCdjbGFzcycsICdjYXRsYWJlbCcpXG4gICAgICAgIC5hdHRyKCdwb2ludGVyLWV2ZW50cycsICdub25lJyk7XG5cbiAgICB2YXIgcGFwZXJDb2xvciA9IGdyYXBoRGl2Ll9mdWxsTGF5b3V0LnBhcGVyX2JnY29sb3I7XG5cbiAgICAvLyBVcGRhdGUgY2F0ZWdvcnkgbGFiZWxcbiAgICBjYXRlZ29yeVNlbGVjdGlvbi5zZWxlY3QoJ3RleHQuY2F0bGFiZWwnKVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLFxuICAgICAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGNhdEluUmlnaHREaW0oZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGxhY2UgbGFiZWwgdG8gdGhlIHJpZ2h0IG9mIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBsYWNlIGxhYmVsIHRvIHRoZSBsZWZ0IG9mIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAuYXR0cignYWxpZ25tZW50LWJhc2VsaW5lJywgJ21pZGRsZScpXG5cbiAgICAgICAgLnN0eWxlKCd0ZXh0LXNoYWRvdycsXG4gICAgICAgICAgICBwYXBlckNvbG9yICsgJyAtMXB4ICAxcHggMnB4LCAnICtcbiAgICAgICAgICAgIHBhcGVyQ29sb3IgKyAnIDFweCAgMXB4IDJweCwgJyArXG4gICAgICAgICAgICBwYXBlckNvbG9yICsgJyAgMXB4IC0xcHggMnB4LCAnICtcbiAgICAgICAgICAgIHBhcGVyQ29sb3IgKyAnIC0xcHggLTFweCAycHgnKVxuICAgICAgICAuc3R5bGUoJ2ZpbGwnLCAncmdiKDAsIDAsIDApJylcbiAgICAgICAgLmF0dHIoJ3gnLFxuICAgICAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGNhdEluUmlnaHREaW0oZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGxhY2UgbGFiZWwgdG8gdGhlIHJpZ2h0IG9mIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLndpZHRoICsgNTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBQbGFjZSBsYWJlbCB0byB0aGUgbGVmdCBvZiBjYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5oZWlnaHQgLyAyO1xuICAgICAgICB9KVxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5tb2RlbC5jYXRlZ29yeUxhYmVsO1xuICAgICAgICB9KVxuICAgICAgICAuZWFjaChcbiAgICAgICAgICAgIC8qKiBAcGFyYW0ge0NhdGVnb3J5Vmlld01vZGVsfSBjYXRNb2RlbCovXG4gICAgICAgICAgICBmdW5jdGlvbihjYXRNb2RlbCkge1xuICAgICAgICAgICAgICAgIERyYXdpbmcuZm9udChkMy5zZWxlY3QodGhpcyksIGNhdE1vZGVsLnBhcmNhdHNWaWV3TW9kZWwuY2F0ZWdvcnlsYWJlbGZvbnQpO1xuICAgICAgICAgICAgICAgIHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMoZDMuc2VsZWN0KHRoaXMpLCBncmFwaERpdik7XG4gICAgICAgICAgICB9KTtcblxuICAgIC8vIEluaXRpYWxpemUgZGltZW5zaW9uIGxhYmVsXG4gICAgY2F0ZWdvcnlHcm91cEVudGVyU2VsZWN0aW9uXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnZGltbGFiZWwnKTtcblxuICAgIC8vIFVwZGF0ZSBkaW1lbnNpb24gbGFiZWxcbiAgICBjYXRlZ29yeVNlbGVjdGlvbi5zZWxlY3QoJ3RleHQuZGltbGFiZWwnKVxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCAnbWlkZGxlJylcbiAgICAgICAgLmF0dHIoJ2FsaWdubWVudC1iYXNlbGluZScsICdiYXNlbGluZScpXG4gICAgICAgIC5hdHRyKCdjdXJzb3InLFxuICAgICAgICAgICAgIC8qKiBAcGFyYW0ge0NhdGVnb3J5Vmlld01vZGVsfSBjYXRNb2RlbCovXG4gICAgICAgICAgICBmdW5jdGlvbihjYXRNb2RlbCkge1xuICAgICAgICAgICAgICAgIGlmKGNhdE1vZGVsLnBhcmNhdHNWaWV3TW9kZWwuYXJyYW5nZW1lbnQgPT09ICdmaXhlZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2V3LXJlc2l6ZSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC53aWR0aCAvIDI7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd5JywgLTUpXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgIGlmKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgZGltZW5zaW9uIGxhYmVsIGFib3ZlIHRvcG1vc3QgY2F0ZWdvcnlcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXJjYXRzVmlld01vZGVsLm1vZGVsLmRpbWVuc2lvbnNbZC5tb2RlbC5kaW1lbnNpb25JbmRdLmRpbWVuc2lvbkxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICAgICAgLmVhY2goXG4gICAgICAgICAgICAvKiogQHBhcmFtIHtDYXRlZ29yeVZpZXdNb2RlbH0gY2F0TW9kZWwqL1xuICAgICAgICAgICAgZnVuY3Rpb24oY2F0TW9kZWwpIHtcbiAgICAgICAgICAgICAgICBEcmF3aW5nLmZvbnQoZDMuc2VsZWN0KHRoaXMpLCBjYXRNb2RlbC5wYXJjYXRzVmlld01vZGVsLmxhYmVsZm9udCk7XG4gICAgICAgICAgICB9KTtcblxuICAgIC8vIENhdGVnb3J5IGhvdmVyXG4gICAgLy8gY2F0ZWdvcnlTZWxlY3Rpb24uc2VsZWN0KCdyZWN0LmNhdHJlY3QnKVxuICAgIGNhdGVnb3J5U2VsZWN0aW9uLnNlbGVjdEFsbCgncmVjdC5iYW5kcmVjdCcpXG4gICAgICAgIC5vbignbW91c2VvdmVyJywgbW91c2VvdmVyQ2F0ZWdvcnlCYW5kKVxuICAgICAgICAub24oJ21vdXNlb3V0JywgbW91c2VvdXRDYXRlZ29yeSk7XG5cbiAgICAvLyBSZW1vdmUgdW51c2VkIGNhdGVnb3JpZXNcbiAgICBjYXRlZ29yeVNlbGVjdGlvbi5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICAvLyBTZXR1cCBkcmFnXG4gICAgZGltZW5zaW9uU2VsZWN0aW9uLmNhbGwoZDMuYmVoYXZpb3IuZHJhZygpXG4gICAgICAgIC5vcmlnaW4oZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIHt4OiBkLngsIHk6IDB9O1xuICAgICAgICB9KVxuICAgICAgICAub24oJ2RyYWdzdGFydCcsIGRyYWdEaW1lbnNpb25TdGFydClcbiAgICAgICAgLm9uKCdkcmFnJywgZHJhZ0RpbWVuc2lvbilcbiAgICAgICAgLm9uKCdkcmFnZW5kJywgZHJhZ0RpbWVuc2lvbkVuZCkpO1xuXG5cbiAgICAvLyBTYXZlIG9mZiBzZWxlY3Rpb25zIHRvIHZpZXcgbW9kZWxzXG4gICAgdHJhY2VTZWxlY3Rpb24uZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgIGQudHJhY2VTZWxlY3Rpb24gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgIGQucGF0aFNlbGVjdGlvbiA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ2cucGF0aHMnKS5zZWxlY3RBbGwoJ3BhdGgucGF0aCcpO1xuICAgICAgICBkLmRpbWVuc2lvblNlbGVjdGlvbiA9IGQzLnNlbGVjdCh0aGlzKS5zZWxlY3RBbGwoJ2cuZGltZW5zaW9ucycpLnNlbGVjdEFsbCgnZy5kaW1lbnNpb24nKTtcbiAgICB9KTtcblxuICAgIC8vIFJlbW92ZSBhbnkgb3JwaGFuIHRyYWNlc1xuICAgIHRyYWNlU2VsZWN0aW9uLmV4aXQoKS5yZW1vdmUoKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgLyB1cGRhdGUgcGFyY2F0IHRyYWNlc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBncmFwaERpdlxuICogQHBhcmFtIHtPYmplY3R9IHN2Z1xuICogQHBhcmFtIHtBcnJheS48UGFyY2F0c01vZGVsPn0gcGFyY2F0c01vZGVsc1xuICogQHBhcmFtIHtMYXlvdXR9IGxheW91dFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGdyYXBoRGl2LCBzdmcsIHBhcmNhdHNNb2RlbHMsIGxheW91dCkge1xuICAgIHBlcmZvcm1QbG90KHBhcmNhdHNNb2RlbHMsIGdyYXBoRGl2LCBsYXlvdXQsIHN2Zyk7XG59O1xuXG4vKipcbiAqIEZ1bmN0aW9uIHRoZSByZXR1cm5zIHRoZSBrZXkgcHJvcGVydHkgb2YgYW4gb2JqZWN0IGZvciB1c2Ugd2l0aCBhcyBEMyBqb2luIGZ1bmN0aW9uXG4gKiBAcGFyYW0gZFxuICovXG5mdW5jdGlvbiBrZXkoZCkge1xuICAgIHJldHVybiBkLmtleTtcbn1cblxuIC8qKiBUcnVlIGlmIGEgY2F0ZWdvcnkgdmlldyBtb2RlbCBpcyBpbiB0aGUgcmlnaHQtbW9zdCBkaXNwbGF5IGRpbWVuc2lvblxuICAqIEBwYXJhbSB7Q2F0ZWdvcnlWaWV3TW9kZWx9IGQgKi9cbmZ1bmN0aW9uIGNhdEluUmlnaHREaW0oZCkge1xuICAgIHZhciBudW1EaW1zID0gZC5wYXJjYXRzVmlld01vZGVsLmRpbWVuc2lvbnMubGVuZ3RoO1xuICAgIHZhciBsZWZ0RGltSW5kID0gZC5wYXJjYXRzVmlld01vZGVsLmRpbWVuc2lvbnNbbnVtRGltcyAtIDFdLm1vZGVsLmRpbWVuc2lvbkluZDtcbiAgICByZXR1cm4gZC5tb2RlbC5kaW1lbnNpb25JbmQgPT09IGxlZnREaW1JbmQ7XG59XG5cbi8qKlxuICogQHBhcmFtIHtQYXRoVmlld01vZGVsfSBhXG4gKiBAcGFyYW0ge1BhdGhWaWV3TW9kZWx9IGJcbiAqL1xuZnVuY3Rpb24gY29tcGFyZVJhd0NvbG9yKGEsIGIpIHtcbiAgICBpZihhLm1vZGVsLnJhd0NvbG9yID4gYi5tb2RlbC5yYXdDb2xvcikge1xuICAgICAgICByZXR1cm4gMTtcbiAgICB9IGVsc2UgaWYoYS5tb2RlbC5yYXdDb2xvciA8IGIubW9kZWwucmF3Q29sb3IpIHtcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbn1cblxuLyoqXG4gKiBIYW5kbGUgcGF0aCBtb3VzZW92ZXJcbiAqIEBwYXJhbSB7UGF0aFZpZXdNb2RlbH0gZFxuICovXG5mdW5jdGlvbiBtb3VzZW92ZXJQYXRoKGQpIHtcbiAgICBpZighZC5wYXJjYXRzVmlld01vZGVsLmRyYWdEaW1lbnNpb24pIHtcbiAgICAgICAgLy8gV2UncmUgbm90IGN1cnJlbnRseSBkcmFnZ2luZ1xuXG4gICAgICAgIGlmKGQucGFyY2F0c1ZpZXdNb2RlbC5ob3ZlcmluZm9JdGVtcy5pbmRleE9mKCdza2lwJykgPT09IC0xKSB7XG4gICAgICAgICAgICAvLyBob3ZlcmluZm8gaXMgbm90IHNraXAsIHNvIHdlIGF0IGxlYXN0IHN0eWxlIHRoZSBwYXRocyBhbmQgZW1pdCBpbnRlcmFjdGlvbiBldmVudHNcblxuICAgICAgICAgICAgLy8gUmFpc2UgcGF0aCB0byB0b3BcbiAgICAgICAgICAgIExpYi5yYWlzZVRvVG9wKHRoaXMpO1xuXG4gICAgICAgICAgICBzdHlsZVBhdGhzSG92ZXIoZDMuc2VsZWN0KHRoaXMpKTtcblxuICAgICAgICAgICAgLy8gRW1pdCBob3ZlciBldmVudFxuICAgICAgICAgICAgdmFyIHBvaW50cyA9IGJ1aWxkUG9pbnRzQXJyYXlGb3JQYXRoKGQpO1xuICAgICAgICAgICAgdmFyIGNvbnN0cmFpbnRzID0gYnVpbGRDb25zdHJhaW50c0ZvclBhdGgoZCk7XG4gICAgICAgICAgICBkLnBhcmNhdHNWaWV3TW9kZWwuZ3JhcGhEaXYuZW1pdCgncGxvdGx5X2hvdmVyJywge1xuICAgICAgICAgICAgICAgIHBvaW50czogcG9pbnRzLCBldmVudDogZDMuZXZlbnQsIGNvbnN0cmFpbnRzOiBjb25zdHJhaW50c1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBob3ZlciBsYWJlbFxuICAgICAgICAgICAgaWYoZC5wYXJjYXRzVmlld01vZGVsLmhvdmVyaW5mb0l0ZW1zLmluZGV4T2YoJ25vbmUnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBob3ZlcmluZm8gaXMgYSBjb21iaW5hdGlvbiBvZiAnY291bnQnIGFuZCAncHJvYmFiaWxpdHknXG5cbiAgICAgICAgICAgICAgICAvLyBNb3VzZVxuICAgICAgICAgICAgICAgIHZhciBob3ZlclggPSBkMy5tb3VzZSh0aGlzKVswXTtcblxuICAgICAgICAgICAgICAgIC8vIExhYmVsXG4gICAgICAgICAgICAgICAgdmFyIGdkID0gZC5wYXJjYXRzVmlld01vZGVsLmdyYXBoRGl2O1xuICAgICAgICAgICAgICAgIHZhciB0cmFjZSA9IGQucGFyY2F0c1ZpZXdNb2RlbC50cmFjZTtcbiAgICAgICAgICAgICAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgICAgICAgICAgICAgIHZhciByb290QkJveCA9IGZ1bGxMYXlvdXQuX3BhcGVyZGl2Lm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICB2YXIgZ3JhcGhEaXZCQm94ID0gZC5wYXJjYXRzVmlld01vZGVsLmdyYXBoRGl2LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgICAgICAgICAgLy8gRmluZCBwYXRoIGNlbnRlciBpbiBwYXRoIGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgdmFyIHBhdGhDZW50ZXJYLFxuICAgICAgICAgICAgICAgICAgICBwYXRoQ2VudGVyWSxcbiAgICAgICAgICAgICAgICAgICAgZGltSW5kO1xuXG4gICAgICAgICAgICAgICAgZm9yKGRpbUluZCA9IDA7IGRpbUluZCA8IChkLmxlZnRYcy5sZW5ndGggLSAxKTsgZGltSW5kKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoZC5sZWZ0WHNbZGltSW5kXSArIGQuZGltV2lkdGhzW2RpbUluZF0gLSAyIDw9IGhvdmVyWCAmJiBob3ZlclggPD0gZC5sZWZ0WHNbZGltSW5kICsgMV0gKyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGVmdERpbSA9IGQucGFyY2F0c1ZpZXdNb2RlbC5kaW1lbnNpb25zW2RpbUluZF07XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcmlnaHREaW0gPSBkLnBhcmNhdHNWaWV3TW9kZWwuZGltZW5zaW9uc1tkaW1JbmQgKyAxXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhdGhDZW50ZXJYID0gKGxlZnREaW0ueCArIGxlZnREaW0ud2lkdGggKyByaWdodERpbS54KSAvIDI7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXRoQ2VudGVyWSA9IChkLnRvcFlzW2RpbUluZF0gKyBkLnRvcFlzW2RpbUluZCArIDFdICsgZC5oZWlnaHQpIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gRmluZCBwYXRoIGNlbnRlciBpbiByb290IGNvb3JkaW5hdGVzXG4gICAgICAgICAgICAgICAgdmFyIGhvdmVyQ2VudGVyWCA9IGQucGFyY2F0c1ZpZXdNb2RlbC54ICsgcGF0aENlbnRlclg7XG4gICAgICAgICAgICAgICAgdmFyIGhvdmVyQ2VudGVyWSA9IGQucGFyY2F0c1ZpZXdNb2RlbC55ICsgcGF0aENlbnRlclk7XG5cbiAgICAgICAgICAgICAgICB2YXIgdGV4dENvbG9yID0gdGlueWNvbG9yLm1vc3RSZWFkYWJsZShkLm1vZGVsLmNvbG9yLCBbJ2JsYWNrJywgJ3doaXRlJ10pO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gZC5tb2RlbC5jb3VudDtcbiAgICAgICAgICAgICAgICB2YXIgcHJvYiA9IGNvdW50IC8gZC5wYXJjYXRzVmlld01vZGVsLm1vZGVsLmNvdW50O1xuICAgICAgICAgICAgICAgIHZhciBsYWJlbHMgPSB7XG4gICAgICAgICAgICAgICAgICAgIGNvdW50TGFiZWw6IGNvdW50LFxuICAgICAgICAgICAgICAgICAgICBwcm9iYWJpbGl0eUxhYmVsOiBwcm9iLnRvRml4ZWQoMylcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgLy8gQnVpbGQgaG92ZXIgdGV4dFxuICAgICAgICAgICAgICAgIHZhciBob3ZlcnRleHRQYXJ0cyA9IFtdO1xuICAgICAgICAgICAgICAgIGlmKGQucGFyY2F0c1ZpZXdNb2RlbC5ob3ZlcmluZm9JdGVtcy5pbmRleE9mKCdjb3VudCcpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBob3ZlcnRleHRQYXJ0cy5wdXNoKFsnQ291bnQ6JywgbGFiZWxzLmNvdW50TGFiZWxdLmpvaW4oJyAnKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmKGQucGFyY2F0c1ZpZXdNb2RlbC5ob3ZlcmluZm9JdGVtcy5pbmRleE9mKCdwcm9iYWJpbGl0eScpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBob3ZlcnRleHRQYXJ0cy5wdXNoKFsnUDonLCBsYWJlbHMucHJvYmFiaWxpdHlMYWJlbF0uam9pbignICcpKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgaG92ZXJ0ZXh0ID0gaG92ZXJ0ZXh0UGFydHMuam9pbignPGJyPicpO1xuICAgICAgICAgICAgICAgIHZhciBtb3VzZVggPSBkMy5tb3VzZShnZClbMF07XG5cbiAgICAgICAgICAgICAgICBGeC5sb25lSG92ZXIoe1xuICAgICAgICAgICAgICAgICAgICB0cmFjZTogdHJhY2UsXG4gICAgICAgICAgICAgICAgICAgIHg6IGhvdmVyQ2VudGVyWCAtIHJvb3RCQm94LmxlZnQgKyBncmFwaERpdkJCb3gubGVmdCxcbiAgICAgICAgICAgICAgICAgICAgeTogaG92ZXJDZW50ZXJZIC0gcm9vdEJCb3gudG9wICsgZ3JhcGhEaXZCQm94LnRvcCxcbiAgICAgICAgICAgICAgICAgICAgdGV4dDogaG92ZXJ0ZXh0LFxuICAgICAgICAgICAgICAgICAgICBjb2xvcjogZC5tb2RlbC5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgYm9yZGVyQ29sb3I6ICdibGFjaycsXG4gICAgICAgICAgICAgICAgICAgIGZvbnRGYW1pbHk6ICdNb25hY28sIFwiQ291cmllciBOZXdcIiwgbW9ub3NwYWNlJyxcbiAgICAgICAgICAgICAgICAgICAgZm9udFNpemU6IDEwLFxuICAgICAgICAgICAgICAgICAgICBmb250Q29sb3I6IHRleHRDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgaWRlYWxBbGlnbjogbW91c2VYIDwgaG92ZXJDZW50ZXJYID8gJ3JpZ2h0JyA6ICdsZWZ0JyxcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogKHRyYWNlLmxpbmUgfHwge30pLmhvdmVydGVtcGxhdGUsXG4gICAgICAgICAgICAgICAgICAgIGhvdmVydGVtcGxhdGVMYWJlbHM6IGxhYmVscyxcbiAgICAgICAgICAgICAgICAgICAgZXZlbnREYXRhOiBbe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdHJhY2UuX2lucHV0LFxuICAgICAgICAgICAgICAgICAgICAgICAgZnVsbERhdGE6IHRyYWNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgY291bnQ6IGNvdW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvYmFiaWxpdHk6IHByb2JcbiAgICAgICAgICAgICAgICAgICAgfV1cbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogZnVsbExheW91dC5faG92ZXJsYXllci5ub2RlKCksXG4gICAgICAgICAgICAgICAgICAgIG91dGVyQ29udGFpbmVyOiBmdWxsTGF5b3V0Ll9wYXBlci5ub2RlKCksXG4gICAgICAgICAgICAgICAgICAgIGdkOiBnZFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG4vKipcbiAqIEhhbmRsZSBwYXRoIG1vdXNlb3V0XG4gKiBAcGFyYW0ge1BhdGhWaWV3TW9kZWx9IGRcbiAqL1xuZnVuY3Rpb24gbW91c2VvdXRQYXRoKGQpIHtcbiAgICBpZighZC5wYXJjYXRzVmlld01vZGVsLmRyYWdEaW1lbnNpb24pIHtcbiAgICAgICAgLy8gV2UncmUgbm90IGN1cnJlbnRseSBkcmFnZ2luZ1xuICAgICAgICBzdHlsZVBhdGhzTm9Ib3ZlcihkMy5zZWxlY3QodGhpcykpO1xuXG4gICAgICAgIC8vIFJlbW92ZSBhbmQgaG92ZXIgbGFiZWxcbiAgICAgICAgRngubG9uZVVuaG92ZXIoZC5wYXJjYXRzVmlld01vZGVsLmdyYXBoRGl2Ll9mdWxsTGF5b3V0Ll9ob3ZlcmxheWVyLm5vZGUoKSk7XG5cbiAgICAgICAgLy8gUmVzdG9yZSBwYXRoIG9yZGVyXG4gICAgICAgIGQucGFyY2F0c1ZpZXdNb2RlbC5wYXRoU2VsZWN0aW9uLnNvcnQoY29tcGFyZVJhd0NvbG9yKTtcblxuICAgICAgICAvLyBFbWl0IHVuaG92ZXIgZXZlbnRcbiAgICAgICAgaWYoZC5wYXJjYXRzVmlld01vZGVsLmhvdmVyaW5mb0l0ZW1zLmluZGV4T2YoJ3NraXAnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHZhciBwb2ludHMgPSBidWlsZFBvaW50c0FycmF5Rm9yUGF0aChkKTtcbiAgICAgICAgICAgIHZhciBjb25zdHJhaW50cyA9IGJ1aWxkQ29uc3RyYWludHNGb3JQYXRoKGQpO1xuICAgICAgICAgICAgZC5wYXJjYXRzVmlld01vZGVsLmdyYXBoRGl2LmVtaXQoJ3Bsb3RseV91bmhvdmVyJywge1xuICAgICAgICAgICAgICAgIHBvaW50czogcG9pbnRzLCBldmVudDogZDMuZXZlbnQsIGNvbnN0cmFpbnRzOiBjb25zdHJhaW50c1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogQnVpbGQgYXJyYXkgb2YgcG9pbnQgb2JqZWN0cyBmb3IgYSBwYXRoXG4gKlxuICogRm9yIHVzZSBpbiBjbGljay9ob3ZlciBldmVudHNcbiAqIEBwYXJhbSB7UGF0aFZpZXdNb2RlbH0gZFxuICovXG5mdW5jdGlvbiBidWlsZFBvaW50c0FycmF5Rm9yUGF0aChkKSB7XG4gICAgdmFyIHBvaW50cyA9IFtdO1xuICAgIHZhciBjdXJ2ZU51bWJlciA9IGdldFRyYWNlSW5kZXgoZC5wYXJjYXRzVmlld01vZGVsKTtcblxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBkLm1vZGVsLnZhbHVlSW5kcy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcG9pbnROdW1iZXIgPSBkLm1vZGVsLnZhbHVlSW5kc1tpXTtcbiAgICAgICAgcG9pbnRzLnB1c2goe1xuICAgICAgICAgICAgY3VydmVOdW1iZXI6IGN1cnZlTnVtYmVyLFxuICAgICAgICAgICAgcG9pbnROdW1iZXI6IHBvaW50TnVtYmVyXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gcG9pbnRzO1xufVxuXG4vKipcbiAqIEJ1aWxkIGNvbnN0cmFpbnRzIG9iamVjdCBmb3IgYSBwYXRoXG4gKlxuICogRm9yIHVzZSBpbiBjbGljay9ob3ZlciBldmVudHNcbiAqIEBwYXJhbSB7UGF0aFZpZXdNb2RlbH0gZFxuICovXG5mdW5jdGlvbiBidWlsZENvbnN0cmFpbnRzRm9yUGF0aChkKSB7XG4gICAgdmFyIGNvbnN0cmFpbnRzID0ge307XG4gICAgdmFyIGRpbWVuc2lvbnMgPSBkLnBhcmNhdHNWaWV3TW9kZWwubW9kZWwuZGltZW5zaW9ucztcblxuICAgIC8vIGRpbWVuc2lvbnNcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGltZW5zaW9ucy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZGltZW5zaW9uID0gZGltZW5zaW9uc1tpXTtcbiAgICAgICAgdmFyIGNhdGVnb3J5ID0gZGltZW5zaW9uLmNhdGVnb3JpZXNbZC5tb2RlbC5jYXRlZ29yeUluZHNbaV1dO1xuICAgICAgICBjb25zdHJhaW50c1tkaW1lbnNpb24uY29udGFpbmVySW5kXSA9IGNhdGVnb3J5LmNhdGVnb3J5VmFsdWU7XG4gICAgfVxuXG4gICAgLy8gY29sb3JcbiAgICBpZihkLm1vZGVsLnJhd0NvbG9yICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29uc3RyYWludHMuY29sb3IgPSBkLm1vZGVsLnJhd0NvbG9yO1xuICAgIH1cbiAgICByZXR1cm4gY29uc3RyYWludHM7XG59XG5cbi8qKlxuICogSGFuZGxlIHBhdGggY2xpY2tcbiAqIEBwYXJhbSB7UGF0aFZpZXdNb2RlbH0gZFxuICovXG5mdW5jdGlvbiBjbGlja1BhdGgoZCkge1xuICAgIGlmKGQucGFyY2F0c1ZpZXdNb2RlbC5ob3ZlcmluZm9JdGVtcy5pbmRleE9mKCdza2lwJykgPT09IC0xKSB7XG4gICAgICAgIC8vIGhvdmVyaW5mbyBpdCdzIHNraXAsIHNvIGludGVyYWN0aW9uIGV2ZW50cyBhcmVuJ3QgZGlzYWJsZWRcbiAgICAgICAgdmFyIHBvaW50cyA9IGJ1aWxkUG9pbnRzQXJyYXlGb3JQYXRoKGQpO1xuICAgICAgICB2YXIgY29uc3RyYWludHMgPSBidWlsZENvbnN0cmFpbnRzRm9yUGF0aChkKTtcbiAgICAgICAgZC5wYXJjYXRzVmlld01vZGVsLmdyYXBoRGl2LmVtaXQoJ3Bsb3RseV9jbGljaycsIHtcbiAgICAgICAgICAgIHBvaW50czogcG9pbnRzLCBldmVudDogZDMuZXZlbnQsIGNvbnN0cmFpbnRzOiBjb25zdHJhaW50c1xuICAgICAgICB9KTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHN0eWxlUGF0aHNOb0hvdmVyKHBhdGhTZWxlY3Rpb24pIHtcbiAgICBwYXRoU2VsZWN0aW9uXG4gICAgICAgIC5hdHRyKCdmaWxsJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQubW9kZWwuY29sb3I7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjYpXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCAnbGlnaHRncmF5JylcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIDAuMilcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgMS4wKTtcbn1cblxuZnVuY3Rpb24gc3R5bGVQYXRoc0hvdmVyKHBhdGhTZWxlY3Rpb24pIHtcbiAgICBwYXRoU2VsZWN0aW9uXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAwLjgpXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGlueWNvbG9yLm1vc3RSZWFkYWJsZShkLm1vZGVsLmNvbG9yLCBbJ2JsYWNrJywgJ3doaXRlJ10pO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMC4zKTtcbn1cblxuZnVuY3Rpb24gc3R5bGVDYXRlZ29yeUhvdmVyKGNhdGVnb3J5U2VsZWN0aW9uKSB7XG4gICAgY2F0ZWdvcnlTZWxlY3Rpb25cbiAgICAgICAgLnNlbGVjdCgncmVjdC5jYXRyZWN0JylcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdibGFjaycpXG4gICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAyLjUpO1xufVxuXG5mdW5jdGlvbiBzdHlsZUNhdGVnb3JpZXNOb0hvdmVyKGNhdGVnb3J5U2VsZWN0aW9uKSB7XG4gICAgY2F0ZWdvcnlTZWxlY3Rpb25cbiAgICAgICAgLnNlbGVjdCgncmVjdC5jYXRyZWN0JylcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdibGFjaycpXG4gICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAxKVxuICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCAxKTtcbn1cblxuZnVuY3Rpb24gc3R5bGVCYW5kc0hvdmVyKGJhbmRzU2VsZWN0aW9uKSB7XG4gICAgYmFuZHNTZWxlY3Rpb25cbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdibGFjaycpXG4gICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCAxLjUpO1xufVxuXG5mdW5jdGlvbiBzdHlsZUJhbmRzTm9Ib3ZlcihiYW5kc1NlbGVjdGlvbikge1xuICAgIGJhbmRzU2VsZWN0aW9uXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCAnYmxhY2snKVxuICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgMC4yKVxuICAgICAgICAuYXR0cignc3Ryb2tlLW9wYWNpdHknLCAxLjApXG4gICAgICAgIC5hdHRyKCdmaWxsLW9wYWNpdHknLCAxLjApO1xufVxuXG4vKipcbiAqIFJldHVybiBzZWxlY3Rpb24gb2YgYWxsIHBhdGhzIHRoYXQgcGFzcyB0aHJvdWdoIHRoZSBzcGVjaWZpZWQgY2F0ZWdvcnlcbiAqIEBwYXJhbSB7Q2F0ZWdvcnlCYW5kVmlld01vZGVsfSBjYXRCYW5kVmlld01vZGVsXG4gKi9cbmZ1bmN0aW9uIHNlbGVjdFBhdGhzVGhyb3VnaENhdGVnb3J5QmFuZENvbG9yKGNhdEJhbmRWaWV3TW9kZWwpIHtcbiAgICB2YXIgYWxsUGF0aHMgPSBjYXRCYW5kVmlld01vZGVsLnBhcmNhdHNWaWV3TW9kZWwucGF0aFNlbGVjdGlvbjtcbiAgICB2YXIgZGltSW5kID0gY2F0QmFuZFZpZXdNb2RlbC5jYXRlZ29yeVZpZXdNb2RlbC5tb2RlbC5kaW1lbnNpb25JbmQ7XG4gICAgdmFyIGNhdEluZCA9IGNhdEJhbmRWaWV3TW9kZWwuY2F0ZWdvcnlWaWV3TW9kZWwubW9kZWwuY2F0ZWdvcnlJbmQ7XG5cbiAgICByZXR1cm4gYWxsUGF0aHNcbiAgICAgICAgLmZpbHRlcihcbiAgICAgICAgICAgIC8qKiBAcGFyYW0ge1BhdGhWaWV3TW9kZWx9IHBhdGhWaWV3TW9kZWwgKi9cbiAgICAgICAgICAgIGZ1bmN0aW9uKHBhdGhWaWV3TW9kZWwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aFZpZXdNb2RlbC5tb2RlbC5jYXRlZ29yeUluZHNbZGltSW5kXSA9PT0gY2F0SW5kICYmXG4gICAgICAgICAgICAgICAgICAgIHBhdGhWaWV3TW9kZWwubW9kZWwuY29sb3IgPT09IGNhdEJhbmRWaWV3TW9kZWwuY29sb3I7XG4gICAgICAgICAgICB9KTtcbn1cblxuXG4vKipcbiAqIFBlcmZvcm0gaG92ZXIgc3R5bGluZyBmb3IgYWxsIHBhdGhzIHRoYXQgcGFzcyB0aG91Z2ggdGhlIHNwZWNpZmllZCBiYW5kIGVsZW1lbnQncyBjYXRlZ29yeVxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJhbmRFbGVtZW50XG4gKiAgSFRNTCBlbGVtZW50IGZvciBiYW5kXG4gKlxuICovXG5mdW5jdGlvbiBzdHlsZUZvckNhdGVnb3J5SG92ZXJtb2RlKGJhbmRFbGVtZW50KSB7XG4gICAgLy8gR2V0IGFsbCBiYW5kcyBpbiB0aGUgY3VycmVudCBjYXRlZ29yeVxuICAgIHZhciBiYW5kU2VsID0gZDMuc2VsZWN0KGJhbmRFbGVtZW50LnBhcmVudE5vZGUpLnNlbGVjdEFsbCgncmVjdC5iYW5kcmVjdCcpO1xuXG4gICAgLy8gUmFpc2UgYW5kIHN0eWxlIHBhdGhzXG4gICAgYmFuZFNlbC5lYWNoKGZ1bmN0aW9uKGJ2bSkge1xuICAgICAgICB2YXIgcGF0aHMgPSBzZWxlY3RQYXRoc1Rocm91Z2hDYXRlZ29yeUJhbmRDb2xvcihidm0pO1xuICAgICAgICBzdHlsZVBhdGhzSG92ZXIocGF0aHMpO1xuICAgICAgICBwYXRocy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gUmFpc2UgcGF0aCB0byB0b3BcbiAgICAgICAgICAgIExpYi5yYWlzZVRvVG9wKHRoaXMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIFN0eWxlIGNhdGVnb3J5XG4gICAgc3R5bGVDYXRlZ29yeUhvdmVyKGQzLnNlbGVjdChiYW5kRWxlbWVudC5wYXJlbnROb2RlKSk7XG59XG5cbi8qKlxuICogUGVyZm9ybSBob3ZlciBzdHlsaW5nIGZvciBhbGwgcGF0aHMgdGhhdCBwYXNzIHRob3VnaCB0aGUgY2F0ZWdvcnkgb2YgdGhlIHNwZWNpZmllZCBiYW5kIGVsZW1lbnQgYW5kIHNoYXJlIHRoZVxuICogc2FtZSBjb2xvclxuICpcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJhbmRFbGVtZW50XG4gKiAgSFRNTCBlbGVtZW50IGZvciBiYW5kXG4gKlxuICovXG5mdW5jdGlvbiBzdHlsZUZvckNvbG9ySG92ZXJtb2RlKGJhbmRFbGVtZW50KSB7XG4gICAgdmFyIGJhbmRWaWV3TW9kZWwgPSBkMy5zZWxlY3QoYmFuZEVsZW1lbnQpLmRhdHVtKCk7XG4gICAgdmFyIGNhdFBhdGhzID0gc2VsZWN0UGF0aHNUaHJvdWdoQ2F0ZWdvcnlCYW5kQ29sb3IoYmFuZFZpZXdNb2RlbCk7XG4gICAgc3R5bGVQYXRoc0hvdmVyKGNhdFBhdGhzKTtcbiAgICBjYXRQYXRocy5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBSYWlzZSBwYXRoIHRvIHRvcFxuICAgICAgICBMaWIucmFpc2VUb1RvcCh0aGlzKTtcbiAgICB9KTtcblxuICAgIC8vIFN0eWxlIGNhdGVnb3J5IGZvciBkcmFnXG4gICAgZDMuc2VsZWN0KGJhbmRFbGVtZW50LnBhcmVudE5vZGUpXG4gICAgICAgIC5zZWxlY3RBbGwoJ3JlY3QuYmFuZHJlY3QnKVxuICAgICAgICAuZmlsdGVyKGZ1bmN0aW9uKGIpIHtyZXR1cm4gYi5jb2xvciA9PT0gYmFuZFZpZXdNb2RlbC5jb2xvcjt9KVxuICAgICAgICAuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIExpYi5yYWlzZVRvVG9wKHRoaXMpO1xuICAgICAgICAgICAgc3R5bGVCYW5kc0hvdmVyKGQzLnNlbGVjdCh0aGlzKSk7XG4gICAgICAgIH0pO1xufVxuXG5cbi8qKlxuICogQHBhcmFtIHtIVE1MRWxlbWVudH0gYmFuZEVsZW1lbnRcbiAqICBIVE1MIGVsZW1lbnQgZm9yIGJhbmRcbiAqIEBwYXJhbSBldmVudE5hbWVcbiAqICBFdmVudCBuYW1lIChwbG90bHlfaG92ZXIgb3IgcGxvdGx5X2NsaWNrKVxuICogQHBhcmFtIGV2ZW50XG4gKiAgTW91c2UgRXZlbnRcbiAqL1xuZnVuY3Rpb24gZW1pdFBvaW50c0V2ZW50Q2F0ZWdvcnlIb3Zlcm1vZGUoYmFuZEVsZW1lbnQsIGV2ZW50TmFtZSwgZXZlbnQpIHtcbiAgICAvLyBHZXQgYWxsIGJhbmRzIGluIHRoZSBjdXJyZW50IGNhdGVnb3J5XG4gICAgdmFyIGJhbmRWaWV3TW9kZWwgPSBkMy5zZWxlY3QoYmFuZEVsZW1lbnQpLmRhdHVtKCk7XG4gICAgdmFyIGNhdGVnb3J5TW9kZWwgPSBiYW5kVmlld01vZGVsLmNhdGVnb3J5Vmlld01vZGVsLm1vZGVsO1xuICAgIHZhciBnZCA9IGJhbmRWaWV3TW9kZWwucGFyY2F0c1ZpZXdNb2RlbC5ncmFwaERpdjtcbiAgICB2YXIgYmFuZFNlbCA9IGQzLnNlbGVjdChiYW5kRWxlbWVudC5wYXJlbnROb2RlKS5zZWxlY3RBbGwoJ3JlY3QuYmFuZHJlY3QnKTtcblxuICAgIHZhciBwb2ludHMgPSBbXTtcbiAgICBiYW5kU2VsLmVhY2goZnVuY3Rpb24oYnZtKSB7XG4gICAgICAgIHZhciBwYXRocyA9IHNlbGVjdFBhdGhzVGhyb3VnaENhdGVnb3J5QmFuZENvbG9yKGJ2bSk7XG4gICAgICAgIHBhdGhzLmVhY2goZnVuY3Rpb24ocGF0aFZpZXdNb2RlbCkge1xuICAgICAgICAgICAgLy8gRXh0ZW5kIHBvaW50cyBhcnJheVxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocG9pbnRzLCBidWlsZFBvaW50c0FycmF5Rm9yUGF0aChwYXRoVmlld01vZGVsKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgdmFyIGNvbnN0cmFpbnRzID0ge307XG4gICAgY29uc3RyYWludHNbY2F0ZWdvcnlNb2RlbC5kaW1lbnNpb25JbmRdID0gY2F0ZWdvcnlNb2RlbC5jYXRlZ29yeVZhbHVlO1xuICAgIGdkLmVtaXQoZXZlbnROYW1lLCB7XG4gICAgICAgIHBvaW50czogcG9pbnRzLCBldmVudDogZXZlbnQsIGNvbnN0cmFpbnRzOiBjb25zdHJhaW50c1xuICAgIH0pO1xufVxuXG4vKipcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJhbmRFbGVtZW50XG4gKiAgSFRNTCBlbGVtZW50IGZvciBiYW5kXG4gKiBAcGFyYW0gZXZlbnROYW1lXG4gKiAgRXZlbnQgbmFtZSAocGxvdGx5X2hvdmVyIG9yIHBsb3RseV9jbGljaylcbiAqIEBwYXJhbSBldmVudFxuICogIE1vdXNlIEV2ZW50XG4gKi9cbmZ1bmN0aW9uIGVtaXRQb2ludHNFdmVudENvbG9ySG92ZXJtb2RlKGJhbmRFbGVtZW50LCBldmVudE5hbWUsIGV2ZW50KSB7XG4gICAgdmFyIGJhbmRWaWV3TW9kZWwgPSBkMy5zZWxlY3QoYmFuZEVsZW1lbnQpLmRhdHVtKCk7XG4gICAgdmFyIGNhdGVnb3J5TW9kZWwgPSBiYW5kVmlld01vZGVsLmNhdGVnb3J5Vmlld01vZGVsLm1vZGVsO1xuICAgIHZhciBnZCA9IGJhbmRWaWV3TW9kZWwucGFyY2F0c1ZpZXdNb2RlbC5ncmFwaERpdjtcbiAgICB2YXIgcGF0aHMgPSBzZWxlY3RQYXRoc1Rocm91Z2hDYXRlZ29yeUJhbmRDb2xvcihiYW5kVmlld01vZGVsKTtcblxuICAgIHZhciBwb2ludHMgPSBbXTtcbiAgICBwYXRocy5lYWNoKGZ1bmN0aW9uKHBhdGhWaWV3TW9kZWwpIHtcbiAgICAgICAgLy8gRXh0ZW5kIHBvaW50cyBhcnJheVxuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShwb2ludHMsIGJ1aWxkUG9pbnRzQXJyYXlGb3JQYXRoKHBhdGhWaWV3TW9kZWwpKTtcbiAgICB9KTtcblxuICAgIHZhciBjb25zdHJhaW50cyA9IHt9O1xuICAgIGNvbnN0cmFpbnRzW2NhdGVnb3J5TW9kZWwuZGltZW5zaW9uSW5kXSA9IGNhdGVnb3J5TW9kZWwuY2F0ZWdvcnlWYWx1ZTtcbiAgICAvLyBjb2xvclxuICAgIGlmKGJhbmRWaWV3TW9kZWwucmF3Q29sb3IgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdHJhaW50cy5jb2xvciA9IGJhbmRWaWV3TW9kZWwucmF3Q29sb3I7XG4gICAgfVxuICAgIGdkLmVtaXQoZXZlbnROYW1lLCB7XG4gICAgICAgIHBvaW50czogcG9pbnRzLCBldmVudDogZXZlbnQsIGNvbnN0cmFpbnRzOiBjb25zdHJhaW50c1xuICAgIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBob3ZlciBsYWJlbCBmb3IgYSBiYW5kIGVsZW1lbnQncyBjYXRlZ29yeSAoZm9yIHVzZSB3aGVuIGhvdmVyb24gPT09ICdjYXRlZ29yeScpXG4gKlxuICogQHBhcmFtIHtDbGllbnRSZWN0fSByb290QkJveFxuICogIENsaWVudCBib3VuZGluZyBib3ggZm9yIHJvb3Qgb2YgZmlndXJlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBiYW5kRWxlbWVudFxuICogIEhUTUwgZWxlbWVudCBmb3IgYmFuZFxuICpcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSG92ZXJMYWJlbEZvckNhdGVnb3J5SG92ZXJtb2RlKHJvb3RCQm94LCBiYW5kRWxlbWVudCkge1xuICAgIC8vIFNlbGVjdGlvbnNcbiAgICB2YXIgcmVjdFNlbGVjdGlvbiA9IGQzLnNlbGVjdChiYW5kRWxlbWVudC5wYXJlbnROb2RlKS5zZWxlY3QoJ3JlY3QuY2F0cmVjdCcpO1xuICAgIHZhciByZWN0Qm91bmRpbmdCb3ggPSByZWN0U2VsZWN0aW9uLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIE1vZGVsc1xuICAgIC8qKiBAdHlwZSB7Q2F0ZWdvcnlWaWV3TW9kZWx9ICovXG4gICAgdmFyIGNhdFZpZXdNb2RlbCA9IHJlY3RTZWxlY3Rpb24uZGF0dW0oKTtcbiAgICB2YXIgcGFyY2F0c1ZpZXdNb2RlbCA9IGNhdFZpZXdNb2RlbC5wYXJjYXRzVmlld01vZGVsO1xuICAgIHZhciBkaW1lbnNpb25Nb2RlbCA9IHBhcmNhdHNWaWV3TW9kZWwubW9kZWwuZGltZW5zaW9uc1tjYXRWaWV3TW9kZWwubW9kZWwuZGltZW5zaW9uSW5kXTtcbiAgICB2YXIgdHJhY2UgPSBwYXJjYXRzVmlld01vZGVsLnRyYWNlO1xuXG4gICAgLy8gUG9zaXRpb25zXG4gICAgdmFyIGhvdmVyQ2VudGVyWSA9IHJlY3RCb3VuZGluZ0JveC50b3AgKyByZWN0Qm91bmRpbmdCb3guaGVpZ2h0IC8gMjtcbiAgICB2YXIgaG92ZXJDZW50ZXJYLFxuICAgICAgICBob3ZlckxhYmVsSWRlYWxBbGlnbjtcblxuICAgIGlmKHBhcmNhdHNWaWV3TW9kZWwuZGltZW5zaW9ucy5sZW5ndGggPiAxICYmXG4gICAgICAgIGRpbWVuc2lvbk1vZGVsLmRpc3BsYXlJbmQgPT09IHBhcmNhdHNWaWV3TW9kZWwuZGltZW5zaW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgIC8vIHJpZ2h0IG1vc3QgZGltZW5zaW9uXG4gICAgICAgIGhvdmVyQ2VudGVyWCA9IHJlY3RCb3VuZGluZ0JveC5sZWZ0O1xuICAgICAgICBob3ZlckxhYmVsSWRlYWxBbGlnbiA9ICdsZWZ0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBob3ZlckNlbnRlclggPSByZWN0Qm91bmRpbmdCb3gubGVmdCArIHJlY3RCb3VuZGluZ0JveC53aWR0aDtcbiAgICAgICAgaG92ZXJMYWJlbElkZWFsQWxpZ24gPSAncmlnaHQnO1xuICAgIH1cblxuICAgIHZhciBjb3VudCA9IGNhdFZpZXdNb2RlbC5tb2RlbC5jb3VudDtcbiAgICB2YXIgY2F0TGFiZWwgPSBjYXRWaWV3TW9kZWwubW9kZWwuY2F0ZWdvcnlMYWJlbDtcbiAgICB2YXIgcHJvYiA9IGNvdW50IC8gY2F0Vmlld01vZGVsLnBhcmNhdHNWaWV3TW9kZWwubW9kZWwuY291bnQ7XG4gICAgdmFyIGxhYmVscyA9IHtcbiAgICAgICAgY291bnRMYWJlbDogY291bnQsXG4gICAgICAgIGNhdGVnb3J5TGFiZWw6IGNhdExhYmVsLFxuICAgICAgICBwcm9iYWJpbGl0eUxhYmVsOiBwcm9iLnRvRml4ZWQoMylcbiAgICB9O1xuXG4gICAgLy8gSG92ZXIgbGFiZWwgdGV4dFxuICAgIHZhciBob3ZlcmluZm9QYXJ0cyA9IFtdO1xuICAgIGlmKGNhdFZpZXdNb2RlbC5wYXJjYXRzVmlld01vZGVsLmhvdmVyaW5mb0l0ZW1zLmluZGV4T2YoJ2NvdW50JykgIT09IC0xKSB7XG4gICAgICAgIGhvdmVyaW5mb1BhcnRzLnB1c2goWydDb3VudDonLCBsYWJlbHMuY291bnRMYWJlbF0uam9pbignICcpKTtcbiAgICB9XG4gICAgaWYoY2F0Vmlld01vZGVsLnBhcmNhdHNWaWV3TW9kZWwuaG92ZXJpbmZvSXRlbXMuaW5kZXhPZigncHJvYmFiaWxpdHknKSAhPT0gLTEpIHtcbiAgICAgICAgaG92ZXJpbmZvUGFydHMucHVzaChbJ1AoJyArIGxhYmVscy5jYXRlZ29yeUxhYmVsICsgJyk6JywgbGFiZWxzLnByb2JhYmlsaXR5TGFiZWxdLmpvaW4oJyAnKSk7XG4gICAgfVxuXG4gICAgdmFyIGhvdmVydGV4dCA9IGhvdmVyaW5mb1BhcnRzLmpvaW4oJzxicj4nKTtcbiAgICByZXR1cm4ge1xuICAgICAgICB0cmFjZTogdHJhY2UsXG4gICAgICAgIHg6IGhvdmVyQ2VudGVyWCAtIHJvb3RCQm94LmxlZnQsXG4gICAgICAgIHk6IGhvdmVyQ2VudGVyWSAtIHJvb3RCQm94LnRvcCxcbiAgICAgICAgdGV4dDogaG92ZXJ0ZXh0LFxuICAgICAgICBjb2xvcjogJ2xpZ2h0Z3JheScsXG4gICAgICAgIGJvcmRlckNvbG9yOiAnYmxhY2snLFxuICAgICAgICBmb250RmFtaWx5OiAnTW9uYWNvLCBcIkNvdXJpZXIgTmV3XCIsIG1vbm9zcGFjZScsXG4gICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgZm9udENvbG9yOiAnYmxhY2snLFxuICAgICAgICBpZGVhbEFsaWduOiBob3ZlckxhYmVsSWRlYWxBbGlnbixcbiAgICAgICAgaG92ZXJ0ZW1wbGF0ZTogdHJhY2UuaG92ZXJ0ZW1wbGF0ZSxcbiAgICAgICAgaG92ZXJ0ZW1wbGF0ZUxhYmVsczogbGFiZWxzLFxuICAgICAgICBldmVudERhdGE6IFt7XG4gICAgICAgICAgICBkYXRhOiB0cmFjZS5faW5wdXQsXG4gICAgICAgICAgICBmdWxsRGF0YTogdHJhY2UsXG4gICAgICAgICAgICBjb3VudDogY291bnQsXG4gICAgICAgICAgICBjYXRlZ29yeTogY2F0TGFiZWwsXG4gICAgICAgICAgICBwcm9iYWJpbGl0eTogcHJvYlxuICAgICAgICB9XVxuICAgIH07XG59XG5cbi8qKlxuICogQ3JlYXRlIGhvdmVyIGxhYmVsIGZvciBhIGJhbmQgZWxlbWVudCdzIGNhdGVnb3J5IChmb3IgdXNlIHdoZW4gaG92ZXJvbiA9PT0gJ2NhdGVnb3J5JylcbiAqXG4gKiBAcGFyYW0ge0NsaWVudFJlY3R9IHJvb3RCQm94XG4gKiAgQ2xpZW50IGJvdW5kaW5nIGJveCBmb3Igcm9vdCBvZiBmaWd1cmVcbiAqIEBwYXJhbSB7SFRNTEVsZW1lbnR9IGJhbmRFbGVtZW50XG4gKiAgSFRNTCBlbGVtZW50IGZvciBiYW5kXG4gKlxuICovXG5mdW5jdGlvbiBjcmVhdGVIb3ZlckxhYmVsRm9yRGltZW5zaW9uSG92ZXJtb2RlKHJvb3RCQm94LCBiYW5kRWxlbWVudCkge1xuICAgIHZhciBhbGxIb3ZlcmxhYmVscyA9IFtdO1xuXG4gICAgZDMuc2VsZWN0KGJhbmRFbGVtZW50LnBhcmVudE5vZGUucGFyZW50Tm9kZSlcbiAgICAgICAgLnNlbGVjdEFsbCgnZy5jYXRlZ29yeScpXG4gICAgICAgIC5zZWxlY3QoJ3JlY3QuY2F0cmVjdCcpXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGJhbmROb2RlID0gdGhpcztcbiAgICAgICAgICAgIGFsbEhvdmVybGFiZWxzLnB1c2goY3JlYXRlSG92ZXJMYWJlbEZvckNhdGVnb3J5SG92ZXJtb2RlKHJvb3RCQm94LCBiYW5kTm9kZSkpO1xuICAgICAgICB9KTtcblxuICAgIHJldHVybiBhbGxIb3ZlcmxhYmVscztcbn1cblxuLyoqXG4gKiBDcmVhdGUgaG92ZXIgbGFiZWxzIGZvciBhIGJhbmQgZWxlbWVudCdzIGNhdGVnb3J5IChmb3IgdXNlIHdoZW4gaG92ZXJvbiA9PT0gJ2RpbWVuc2lvbicpXG4gKlxuICogQHBhcmFtIHtDbGllbnRSZWN0fSByb290QkJveFxuICogIENsaWVudCBib3VuZGluZyBib3ggZm9yIHJvb3Qgb2YgZmlndXJlXG4gKiBAcGFyYW0ge0hUTUxFbGVtZW50fSBiYW5kRWxlbWVudFxuICogIEhUTUwgZWxlbWVudCBmb3IgYmFuZFxuICpcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSG92ZXJMYWJlbEZvckNvbG9ySG92ZXJtb2RlKHJvb3RCQm94LCBiYW5kRWxlbWVudCkge1xuICAgIHZhciBiYW5kQm91bmRpbmdCb3ggPSBiYW5kRWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIC8vIE1vZGVsc1xuICAgIC8qKiBAdHlwZSB7Q2F0ZWdvcnlCYW5kVmlld01vZGVsfSAqL1xuICAgIHZhciBiYW5kVmlld01vZGVsID0gZDMuc2VsZWN0KGJhbmRFbGVtZW50KS5kYXR1bSgpO1xuICAgIHZhciBjYXRWaWV3TW9kZWwgPSBiYW5kVmlld01vZGVsLmNhdGVnb3J5Vmlld01vZGVsO1xuICAgIHZhciBwYXJjYXRzVmlld01vZGVsID0gY2F0Vmlld01vZGVsLnBhcmNhdHNWaWV3TW9kZWw7XG4gICAgdmFyIGRpbWVuc2lvbk1vZGVsID0gcGFyY2F0c1ZpZXdNb2RlbC5tb2RlbC5kaW1lbnNpb25zW2NhdFZpZXdNb2RlbC5tb2RlbC5kaW1lbnNpb25JbmRdO1xuICAgIHZhciB0cmFjZSA9IHBhcmNhdHNWaWV3TW9kZWwudHJhY2U7XG5cbiAgICAvLyBwb3NpdGlvbnNcbiAgICB2YXIgaG92ZXJDZW50ZXJZID0gYmFuZEJvdW5kaW5nQm94LnkgKyBiYW5kQm91bmRpbmdCb3guaGVpZ2h0IC8gMjtcblxuICAgIHZhciBob3ZlckNlbnRlclgsXG4gICAgICAgIGhvdmVyTGFiZWxJZGVhbEFsaWduO1xuICAgIGlmKHBhcmNhdHNWaWV3TW9kZWwuZGltZW5zaW9ucy5sZW5ndGggPiAxICYmXG4gICAgICAgIGRpbWVuc2lvbk1vZGVsLmRpc3BsYXlJbmQgPT09IHBhcmNhdHNWaWV3TW9kZWwuZGltZW5zaW9ucy5sZW5ndGggLSAxKSB7XG4gICAgICAgIC8vIHJpZ2h0IG1vc3QgZGltZW5zaW9uXG4gICAgICAgIGhvdmVyQ2VudGVyWCA9IGJhbmRCb3VuZGluZ0JveC5sZWZ0O1xuICAgICAgICBob3ZlckxhYmVsSWRlYWxBbGlnbiA9ICdsZWZ0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBob3ZlckNlbnRlclggPSBiYW5kQm91bmRpbmdCb3gubGVmdCArIGJhbmRCb3VuZGluZ0JveC53aWR0aDtcbiAgICAgICAgaG92ZXJMYWJlbElkZWFsQWxpZ24gPSAncmlnaHQnO1xuICAgIH1cblxuICAgIC8vIExhYmVsc1xuICAgIHZhciBjYXRMYWJlbCA9IGNhdFZpZXdNb2RlbC5tb2RlbC5jYXRlZ29yeUxhYmVsO1xuXG4gICAgLy8gQ291bnRzXG4gICAgdmFyIHRvdGFsQ291bnQgPSBiYW5kVmlld01vZGVsLnBhcmNhdHNWaWV3TW9kZWwubW9kZWwuY291bnQ7XG5cbiAgICB2YXIgYmFuZENvbG9yQ291bnQgPSAwO1xuICAgIGJhbmRWaWV3TW9kZWwuY2F0ZWdvcnlWaWV3TW9kZWwuYmFuZHMuZm9yRWFjaChmdW5jdGlvbihiKSB7XG4gICAgICAgIGlmKGIuY29sb3IgPT09IGJhbmRWaWV3TW9kZWwuY29sb3IpIHtcbiAgICAgICAgICAgIGJhbmRDb2xvckNvdW50ICs9IGIuY291bnQ7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBjYXRDb3VudCA9IGNhdFZpZXdNb2RlbC5tb2RlbC5jb3VudDtcblxuICAgIHZhciBjb2xvckNvdW50ID0gMDtcbiAgICBwYXJjYXRzVmlld01vZGVsLnBhdGhTZWxlY3Rpb24uZWFjaChcbiAgICAgICAgLyoqIEBwYXJhbSB7UGF0aFZpZXdNb2RlbH0gcGF0aFZpZXdNb2RlbCAqL1xuICAgICAgICBmdW5jdGlvbihwYXRoVmlld01vZGVsKSB7XG4gICAgICAgICAgICBpZihwYXRoVmlld01vZGVsLm1vZGVsLmNvbG9yID09PSBiYW5kVmlld01vZGVsLmNvbG9yKSB7XG4gICAgICAgICAgICAgICAgY29sb3JDb3VudCArPSBwYXRoVmlld01vZGVsLm1vZGVsLmNvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgIHZhciBwQ29sb3JBbmRDYXQgPSBiYW5kQ29sb3JDb3VudCAvIHRvdGFsQ291bnQ7XG4gICAgdmFyIHBDYXRHaXZlbkNvbG9yID0gYmFuZENvbG9yQ291bnQgLyBjb2xvckNvdW50O1xuICAgIHZhciBwQ29sb3JHaXZlbkNhdCA9IGJhbmRDb2xvckNvdW50IC8gY2F0Q291bnQ7XG5cbiAgICB2YXIgbGFiZWxzID0ge1xuICAgICAgICBjb3VudExhYmVsOiB0b3RhbENvdW50LFxuICAgICAgICBjYXRlZ29yeUxhYmVsOiBjYXRMYWJlbCxcbiAgICAgICAgcHJvYmFiaWxpdHlMYWJlbDogcENvbG9yQW5kQ2F0LnRvRml4ZWQoMylcbiAgICB9O1xuXG4gICAgLy8gSG92ZXIgbGFiZWwgdGV4dFxuICAgIHZhciBob3ZlcmluZm9QYXJ0cyA9IFtdO1xuICAgIGlmKGNhdFZpZXdNb2RlbC5wYXJjYXRzVmlld01vZGVsLmhvdmVyaW5mb0l0ZW1zLmluZGV4T2YoJ2NvdW50JykgIT09IC0xKSB7XG4gICAgICAgIGhvdmVyaW5mb1BhcnRzLnB1c2goWydDb3VudDonLCBsYWJlbHMuY291bnRMYWJlbF0uam9pbignICcpKTtcbiAgICB9XG4gICAgaWYoY2F0Vmlld01vZGVsLnBhcmNhdHNWaWV3TW9kZWwuaG92ZXJpbmZvSXRlbXMuaW5kZXhPZigncHJvYmFiaWxpdHknKSAhPT0gLTEpIHtcbiAgICAgICAgaG92ZXJpbmZvUGFydHMucHVzaCgnUChjb2xvciDiiKkgJyArIGNhdExhYmVsICsgJyk6ICcgKyBsYWJlbHMucHJvYmFiaWxpdHlMYWJlbCk7XG4gICAgICAgIGhvdmVyaW5mb1BhcnRzLnB1c2goJ1AoJyArIGNhdExhYmVsICsgJyB8IGNvbG9yKTogJyArIHBDYXRHaXZlbkNvbG9yLnRvRml4ZWQoMykpO1xuICAgICAgICBob3ZlcmluZm9QYXJ0cy5wdXNoKCdQKGNvbG9yIHwgJyArIGNhdExhYmVsICsgJyk6ICcgKyBwQ29sb3JHaXZlbkNhdC50b0ZpeGVkKDMpKTtcbiAgICB9XG5cbiAgICB2YXIgaG92ZXJ0ZXh0ID0gaG92ZXJpbmZvUGFydHMuam9pbignPGJyPicpO1xuXG4gICAgLy8gQ29tcHV0ZSB0ZXh0IGNvbG9yXG4gICAgdmFyIHRleHRDb2xvciA9IHRpbnljb2xvci5tb3N0UmVhZGFibGUoYmFuZFZpZXdNb2RlbC5jb2xvciwgWydibGFjaycsICd3aGl0ZSddKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHRyYWNlOiB0cmFjZSxcbiAgICAgICAgeDogaG92ZXJDZW50ZXJYIC0gcm9vdEJCb3gubGVmdCxcbiAgICAgICAgeTogaG92ZXJDZW50ZXJZIC0gcm9vdEJCb3gudG9wLFxuICAgICAgICAvLyBuYW1lOiAnTkFNRScsXG4gICAgICAgIHRleHQ6IGhvdmVydGV4dCxcbiAgICAgICAgY29sb3I6IGJhbmRWaWV3TW9kZWwuY29sb3IsXG4gICAgICAgIGJvcmRlckNvbG9yOiAnYmxhY2snLFxuICAgICAgICBmb250RmFtaWx5OiAnTW9uYWNvLCBcIkNvdXJpZXIgTmV3XCIsIG1vbm9zcGFjZScsXG4gICAgICAgIGZvbnRDb2xvcjogdGV4dENvbG9yLFxuICAgICAgICBmb250U2l6ZTogMTAsXG4gICAgICAgIGlkZWFsQWxpZ246IGhvdmVyTGFiZWxJZGVhbEFsaWduLFxuICAgICAgICBob3ZlcnRlbXBsYXRlOiB0cmFjZS5ob3ZlcnRlbXBsYXRlLFxuICAgICAgICBob3ZlcnRlbXBsYXRlTGFiZWxzOiBsYWJlbHMsXG4gICAgICAgIGV2ZW50RGF0YTogW3tcbiAgICAgICAgICAgIGRhdGE6IHRyYWNlLl9pbnB1dCxcbiAgICAgICAgICAgIGZ1bGxEYXRhOiB0cmFjZSxcbiAgICAgICAgICAgIGNhdGVnb3J5OiBjYXRMYWJlbCxcbiAgICAgICAgICAgIGNvdW50OiB0b3RhbENvdW50LFxuICAgICAgICAgICAgcHJvYmFiaWxpdHk6IHBDb2xvckFuZENhdCxcbiAgICAgICAgICAgIGNhdGVnb3J5Y291bnQ6IGNhdENvdW50LFxuICAgICAgICAgICAgY29sb3Jjb3VudDogY29sb3JDb3VudCxcbiAgICAgICAgICAgIGJhbmRjb2xvcmNvdW50OiBiYW5kQ29sb3JDb3VudFxuICAgICAgICB9XVxuICAgIH07XG59XG5cbi8qKlxuICogSGFuZGxlIGRpbWVuc2lvbiBtb3VzZW92ZXJcbiAqIEBwYXJhbSB7Q2F0ZWdvcnlCYW5kVmlld01vZGVsfSBiYW5kVmlld01vZGVsXG4gKi9cbmZ1bmN0aW9uIG1vdXNlb3ZlckNhdGVnb3J5QmFuZChiYW5kVmlld01vZGVsKSB7XG4gICAgaWYoIWJhbmRWaWV3TW9kZWwucGFyY2F0c1ZpZXdNb2RlbC5kcmFnRGltZW5zaW9uKSB7XG4gICAgICAgIC8vIFdlJ3JlIG5vdCBjdXJyZW50bHkgZHJhZ2dpbmdcblxuICAgICAgICBpZihiYW5kVmlld01vZGVsLnBhcmNhdHNWaWV3TW9kZWwuaG92ZXJpbmZvSXRlbXMuaW5kZXhPZignc2tpcCcpID09PSAtMSkge1xuICAgICAgICAgICAgLy8gaG92ZXJpbmZvIGlzIG5vdCBza2lwLCBzbyB3ZSBhdCBsZWFzdCBzdHlsZSB0aGUgYmFuZHMgYW5kIGVtaXQgaW50ZXJhY3Rpb24gZXZlbnRzXG5cbiAgICAgICAgICAgIC8vIE1vdXNlXG4gICAgICAgICAgICB2YXIgbW91c2VZID0gZDMubW91c2UodGhpcylbMV07XG4gICAgICAgICAgICBpZihtb3VzZVkgPCAtMSkge1xuICAgICAgICAgICAgICAgIC8vIEhvdmVyIGlzIGFib3ZlIGFib3ZlIHRoZSBjYXRlZ29yeSByZWN0YW5nbGUgKHByb2JhYmx5IHRoZSBkaW1lbnNpb24gdGl0bGUgdGV4dClcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBnZCA9IGJhbmRWaWV3TW9kZWwucGFyY2F0c1ZpZXdNb2RlbC5ncmFwaERpdjtcbiAgICAgICAgICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgICAgICAgICB2YXIgcm9vdEJCb3ggPSBmdWxsTGF5b3V0Ll9wYXBlcmRpdi5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICB2YXIgaG92ZXJvbiA9IGJhbmRWaWV3TW9kZWwucGFyY2F0c1ZpZXdNb2RlbC5ob3Zlcm9uO1xuXG4gICAgICAgICAgICAvKiogQHR5cGUge0hUTUxFbGVtZW50fSAqL1xuICAgICAgICAgICAgdmFyIGJhbmRFbGVtZW50ID0gdGhpcztcblxuICAgICAgICAgICAgLy8gSGFuZGxlIHN0eWxlIGFuZCBldmVudHNcbiAgICAgICAgICAgIGlmKGhvdmVyb24gPT09ICdjb2xvcicpIHtcbiAgICAgICAgICAgICAgICBzdHlsZUZvckNvbG9ySG92ZXJtb2RlKGJhbmRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBlbWl0UG9pbnRzRXZlbnRDb2xvckhvdmVybW9kZShiYW5kRWxlbWVudCwgJ3Bsb3RseV9ob3ZlcicsIGQzLmV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3R5bGVGb3JDYXRlZ29yeUhvdmVybW9kZShiYW5kRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgZW1pdFBvaW50c0V2ZW50Q2F0ZWdvcnlIb3Zlcm1vZGUoYmFuZEVsZW1lbnQsICdwbG90bHlfaG92ZXInLCBkMy5ldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSBob3ZlciBsYWJlbFxuICAgICAgICAgICAgaWYoYmFuZFZpZXdNb2RlbC5wYXJjYXRzVmlld01vZGVsLmhvdmVyaW5mb0l0ZW1zLmluZGV4T2YoJ25vbmUnKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB2YXIgaG92ZXJJdGVtcztcbiAgICAgICAgICAgICAgICBpZihob3Zlcm9uID09PSAnY2F0ZWdvcnknKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdmVySXRlbXMgPSBjcmVhdGVIb3ZlckxhYmVsRm9yQ2F0ZWdvcnlIb3Zlcm1vZGUocm9vdEJCb3gsIGJhbmRFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYoaG92ZXJvbiA9PT0gJ2NvbG9yJykge1xuICAgICAgICAgICAgICAgICAgICBob3Zlckl0ZW1zID0gY3JlYXRlSG92ZXJMYWJlbEZvckNvbG9ySG92ZXJtb2RlKHJvb3RCQm94LCBiYW5kRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKGhvdmVyb24gPT09ICdkaW1lbnNpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIGhvdmVySXRlbXMgPSBjcmVhdGVIb3ZlckxhYmVsRm9yRGltZW5zaW9uSG92ZXJtb2RlKHJvb3RCQm94LCBiYW5kRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYoaG92ZXJJdGVtcykge1xuICAgICAgICAgICAgICAgICAgICBGeC5sb25lSG92ZXIoaG92ZXJJdGVtcywge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGFpbmVyOiBmdWxsTGF5b3V0Ll9ob3ZlcmxheWVyLm5vZGUoKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG91dGVyQ29udGFpbmVyOiBmdWxsTGF5b3V0Ll9wYXBlci5ub2RlKCksXG4gICAgICAgICAgICAgICAgICAgICAgICBnZDogZ2RcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKlxuICogSGFuZGxlIGRpbWVuc2lvbiBtb3VzZW92ZXJcbiAqIEBwYXJhbSB7Q2F0ZWdvcnlCYW5kVmlld01vZGVsfSBiYW5kVmlld01vZGVsXG4gKi9cbmZ1bmN0aW9uIG1vdXNlb3V0Q2F0ZWdvcnkoYmFuZFZpZXdNb2RlbCkge1xuICAgIHZhciBwYXJjYXRzVmlld01vZGVsID0gYmFuZFZpZXdNb2RlbC5wYXJjYXRzVmlld01vZGVsO1xuXG4gICAgaWYoIXBhcmNhdHNWaWV3TW9kZWwuZHJhZ0RpbWVuc2lvbikge1xuICAgICAgICAvLyBXZSdyZSBub3QgZHJhZ2dpbmcgYW55dGhpbmdcblxuICAgICAgICAvLyBSZXNldCB1bmhvdmVyZWQgc3R5bGVzXG4gICAgICAgIHN0eWxlUGF0aHNOb0hvdmVyKHBhcmNhdHNWaWV3TW9kZWwucGF0aFNlbGVjdGlvbik7XG4gICAgICAgIHN0eWxlQ2F0ZWdvcmllc05vSG92ZXIocGFyY2F0c1ZpZXdNb2RlbC5kaW1lbnNpb25TZWxlY3Rpb24uc2VsZWN0QWxsKCdnLmNhdGVnb3J5JykpO1xuICAgICAgICBzdHlsZUJhbmRzTm9Ib3ZlcihwYXJjYXRzVmlld01vZGVsLmRpbWVuc2lvblNlbGVjdGlvbi5zZWxlY3RBbGwoJ2cuY2F0ZWdvcnknKS5zZWxlY3RBbGwoJ3JlY3QuYmFuZHJlY3QnKSk7XG5cbiAgICAgICAgLy8gUmVtb3ZlIGhvdmVyIGxhYmVsXG4gICAgICAgIEZ4LmxvbmVVbmhvdmVyKHBhcmNhdHNWaWV3TW9kZWwuZ3JhcGhEaXYuX2Z1bGxMYXlvdXQuX2hvdmVybGF5ZXIubm9kZSgpKTtcblxuICAgICAgICAvLyBSZXN0b3JlIHBhdGggb3JkZXJcbiAgICAgICAgcGFyY2F0c1ZpZXdNb2RlbC5wYXRoU2VsZWN0aW9uLnNvcnQoY29tcGFyZVJhd0NvbG9yKTtcblxuICAgICAgICAvLyBFbWl0IHVuaG92ZXIgZXZlbnRcbiAgICAgICAgaWYocGFyY2F0c1ZpZXdNb2RlbC5ob3ZlcmluZm9JdGVtcy5pbmRleE9mKCdza2lwJykgPT09IC0xKSB7XG4gICAgICAgICAgICB2YXIgaG92ZXJvbiA9IGJhbmRWaWV3TW9kZWwucGFyY2F0c1ZpZXdNb2RlbC5ob3Zlcm9uO1xuICAgICAgICAgICAgdmFyIGJhbmRFbGVtZW50ID0gdGhpcztcblxuICAgICAgICAgICAgLy8gSGFuZGxlIHN0eWxlIGFuZCBldmVudHNcbiAgICAgICAgICAgIGlmKGhvdmVyb24gPT09ICdjb2xvcicpIHtcbiAgICAgICAgICAgICAgICBlbWl0UG9pbnRzRXZlbnRDb2xvckhvdmVybW9kZShiYW5kRWxlbWVudCwgJ3Bsb3RseV91bmhvdmVyJywgZDMuZXZlbnQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbWl0UG9pbnRzRXZlbnRDYXRlZ29yeUhvdmVybW9kZShiYW5kRWxlbWVudCwgJ3Bsb3RseV91bmhvdmVyJywgZDMuZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufVxuXG5cbi8qKlxuICogSGFuZGxlIGRpbWVuc2lvbiBkcmFnIHN0YXJ0XG4gKiBAcGFyYW0ge0RpbWVuc2lvblZpZXdNb2RlbH0gZFxuICovXG5mdW5jdGlvbiBkcmFnRGltZW5zaW9uU3RhcnQoZCkge1xuICAgIC8vIENoZWNrIGlmIGRyYWdnaW5nIGlzIHN1cHBvcnRlZFxuICAgIGlmKGQucGFyY2F0c1ZpZXdNb2RlbC5hcnJhbmdlbWVudCA9PT0gJ2ZpeGVkJykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gU2F2ZSBvZmYgaW5pdGlhbCBkcmFnIGluZGV4ZXMgZm9yIGRpbWVuc2lvblxuICAgIGQuZHJhZ0RpbWVuc2lvbkRpc3BsYXlJbmQgPSBkLm1vZGVsLmRpc3BsYXlJbmQ7XG4gICAgZC5pbml0aWFsRHJhZ0RpbWVuc2lvbkRpc3BsYXlJbmRzID0gZC5wYXJjYXRzVmlld01vZGVsLm1vZGVsLmRpbWVuc2lvbnMubWFwKGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5kaXNwbGF5SW5kO30pO1xuICAgIGQuZHJhZ0hhc01vdmVkID0gZmFsc2U7XG5cbiAgICAvLyBDaGVjayBmb3IgY2F0ZWdvcnkgaGl0XG4gICAgZC5kcmFnQ2F0ZWdvcnlEaXNwbGF5SW5kID0gbnVsbDtcbiAgICBkMy5zZWxlY3QodGhpcylcbiAgICAgICAgLnNlbGVjdEFsbCgnZy5jYXRlZ29yeScpXG4gICAgICAgIC5zZWxlY3QoJ3JlY3QuY2F0cmVjdCcpXG4gICAgICAgIC5lYWNoKFxuICAgICAgICAgICAgLyoqIEBwYXJhbSB7Q2F0ZWdvcnlWaWV3TW9kZWx9IGNhdFZpZXdNb2RlbCAqL1xuICAgICAgICAgICAgZnVuY3Rpb24oY2F0Vmlld01vZGVsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNhdE1vdXNlWCA9IGQzLm1vdXNlKHRoaXMpWzBdO1xuICAgICAgICAgICAgICAgIHZhciBjYXRNb3VzZVkgPSBkMy5tb3VzZSh0aGlzKVsxXTtcblxuXG4gICAgICAgICAgICAgICAgaWYoLTIgPD0gY2F0TW91c2VYICYmIGNhdE1vdXNlWCA8PSBjYXRWaWV3TW9kZWwud2lkdGggKyAyICYmXG4gICAgICAgICAgICAgICAgICAgIC0yIDw9IGNhdE1vdXNlWSAmJiBjYXRNb3VzZVkgPD0gY2F0Vmlld01vZGVsLmhlaWdodCArIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gU2F2ZSBvZmYgaW5pdGlhbCBkcmFnIGluZGV4ZXMgZm9yIGNhdGVnb3JpZXNcbiAgICAgICAgICAgICAgICAgICAgZC5kcmFnQ2F0ZWdvcnlEaXNwbGF5SW5kID0gY2F0Vmlld01vZGVsLm1vZGVsLmRpc3BsYXlJbmQ7XG4gICAgICAgICAgICAgICAgICAgIGQuaW5pdGlhbERyYWdDYXRlZ29yeURpc3BsYXlJbmRzID0gZC5tb2RlbC5jYXRlZ29yaWVzLm1hcChmdW5jdGlvbihjKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYy5kaXNwbGF5SW5kO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBJbml0aWFsaXplIGNhdGVnb3JpZXMgZHJhZ1kgdG8gYmUgdGhlIGN1cnJlbnQgeSBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBjYXRWaWV3TW9kZWwubW9kZWwuZHJhZ1kgPSBjYXRWaWV3TW9kZWwueTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBSYWlzZSBjYXRlZ29yeVxuICAgICAgICAgICAgICAgICAgICBMaWIucmFpc2VUb1RvcCh0aGlzLnBhcmVudE5vZGUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEdldCBiYW5kIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSlcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3JlY3QuYmFuZHJlY3QnKVxuICAgICAgICAgICAgICAgICAgICAgICAgLyoqIEBwYXJhbSB7Q2F0ZWdvcnlCYW5kVmlld01vZGVsfSBiYW5kVmlld01vZGVsICovXG4gICAgICAgICAgICAgICAgICAgICAgICAuZWFjaChmdW5jdGlvbihiYW5kVmlld01vZGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoYmFuZFZpZXdNb2RlbC55IDwgY2F0TW91c2VZICYmIGNhdE1vdXNlWSA8PSBiYW5kVmlld01vZGVsLnkgKyBiYW5kVmlld01vZGVsLmhlaWdodCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLnBvdGVudGlhbENsaWNrQmFuZCA9IHRoaXM7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgdG9wbGV2ZWwgZHJhZyBkaW1lbnNpb25cbiAgICBkLnBhcmNhdHNWaWV3TW9kZWwuZHJhZ0RpbWVuc2lvbiA9IGQ7XG5cbiAgICAvLyBSZW1vdmUgaG92ZXIgbGFiZWwgaWYgYW55XG4gICAgRngubG9uZVVuaG92ZXIoZC5wYXJjYXRzVmlld01vZGVsLmdyYXBoRGl2Ll9mdWxsTGF5b3V0Ll9ob3ZlcmxheWVyLm5vZGUoKSk7XG59XG5cbi8qKlxuICogSGFuZGxlIGRpbWVuc2lvbiBkcmFnXG4gKiBAcGFyYW0ge0RpbWVuc2lvblZpZXdNb2RlbH0gZFxuICovXG5mdW5jdGlvbiBkcmFnRGltZW5zaW9uKGQpIHtcbiAgICAvLyBDaGVjayBpZiBkcmFnZ2luZyBpcyBzdXBwb3J0ZWRcbiAgICBpZihkLnBhcmNhdHNWaWV3TW9kZWwuYXJyYW5nZW1lbnQgPT09ICdmaXhlZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGQuZHJhZ0hhc01vdmVkID0gdHJ1ZTtcblxuICAgIGlmKGQuZHJhZ0RpbWVuc2lvbkRpc3BsYXlJbmQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBkcmFnRGltSW5kID0gZC5kcmFnRGltZW5zaW9uRGlzcGxheUluZDtcbiAgICB2YXIgcHJldkRpbUluZCA9IGRyYWdEaW1JbmQgLSAxO1xuICAgIHZhciBuZXh0RGltSW5kID0gZHJhZ0RpbUluZCArIDE7XG5cbiAgICB2YXIgZHJhZ0RpbWVuc2lvbiA9IGQucGFyY2F0c1ZpZXdNb2RlbFxuICAgICAgICAuZGltZW5zaW9uc1tkcmFnRGltSW5kXTtcblxuICAgIC8vIFVwZGF0ZSBjYXRlZ29yeVxuICAgIGlmKGQuZHJhZ0NhdGVnb3J5RGlzcGxheUluZCAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJhZ0NhdGVnb3J5ID0gZHJhZ0RpbWVuc2lvbi5jYXRlZ29yaWVzW2QuZHJhZ0NhdGVnb3J5RGlzcGxheUluZF07XG5cbiAgICAgICAgLy8gVXBkYXRlIGRyYWdZIGJ5IGR5XG4gICAgICAgIGRyYWdDYXRlZ29yeS5tb2RlbC5kcmFnWSArPSBkMy5ldmVudC5keTtcbiAgICAgICAgdmFyIGNhdGVnb3J5WSA9IGRyYWdDYXRlZ29yeS5tb2RlbC5kcmFnWTtcblxuICAgICAgICAvLyBDaGVjayBmb3IgY2F0ZWdvcnkgZHJhZyBzd2Fwc1xuICAgICAgICB2YXIgY2F0RGlzcGxheUluZCA9IGRyYWdDYXRlZ29yeS5tb2RlbC5kaXNwbGF5SW5kO1xuICAgICAgICB2YXIgZGltQ2F0ZWdvcnlWaWV3cyA9IGRyYWdEaW1lbnNpb24uY2F0ZWdvcmllcztcblxuICAgICAgICB2YXIgY2F0QWJvdmUgPSBkaW1DYXRlZ29yeVZpZXdzW2NhdERpc3BsYXlJbmQgLSAxXTtcbiAgICAgICAgdmFyIGNhdEJlbG93ID0gZGltQ2F0ZWdvcnlWaWV3c1tjYXREaXNwbGF5SW5kICsgMV07XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIG92ZXJsYXAgYWJvdmVcbiAgICAgICAgaWYoY2F0QWJvdmUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoY2F0ZWdvcnlZIDwgKGNhdEFib3ZlLnkgKyBjYXRBYm92ZS5oZWlnaHQgLyAyLjApKSB7XG4gICAgICAgICAgICAgICAgLy8gU3dhcCBkaXNwbGF5IGluZHNcbiAgICAgICAgICAgICAgICBkcmFnQ2F0ZWdvcnkubW9kZWwuZGlzcGxheUluZCA9IGNhdEFib3ZlLm1vZGVsLmRpc3BsYXlJbmQ7XG4gICAgICAgICAgICAgICAgY2F0QWJvdmUubW9kZWwuZGlzcGxheUluZCA9IGNhdERpc3BsYXlJbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihjYXRCZWxvdyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZigoY2F0ZWdvcnlZICsgZHJhZ0NhdGVnb3J5LmhlaWdodCkgPiAoY2F0QmVsb3cueSArIGNhdEJlbG93LmhlaWdodCAvIDIuMCkpIHtcbiAgICAgICAgICAgICAgICAvLyBTd2FwIGRpc3BsYXkgaW5kc1xuICAgICAgICAgICAgICAgIGRyYWdDYXRlZ29yeS5tb2RlbC5kaXNwbGF5SW5kID0gY2F0QmVsb3cubW9kZWwuZGlzcGxheUluZDtcbiAgICAgICAgICAgICAgICBjYXRCZWxvdy5tb2RlbC5kaXNwbGF5SW5kID0gY2F0RGlzcGxheUluZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFVwZGF0ZSBjYXRlZ29yeSBkcmFnIGRpc3BsYXkgaW5kZXhcbiAgICAgICAgZC5kcmFnQ2F0ZWdvcnlEaXNwbGF5SW5kID0gZHJhZ0NhdGVnb3J5Lm1vZGVsLmRpc3BsYXlJbmQ7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIGRpbWVuc2lvbiBwb3NpdGlvblxuICAgIGlmKGQuZHJhZ0NhdGVnb3J5RGlzcGxheUluZCA9PT0gbnVsbCB8fCBkLnBhcmNhdHNWaWV3TW9kZWwuYXJyYW5nZW1lbnQgPT09ICdmcmVlZm9ybScpIHtcbiAgICAgICAgZHJhZ0RpbWVuc2lvbi5tb2RlbC5kcmFnWCA9IGQzLmV2ZW50Lng7XG5cbiAgICAgICAgLy8gQ2hlY2sgZm9yIGRpbWVuc2lvbiBzd2Fwc1xuICAgICAgICB2YXIgcHJldkRpbWVuc2lvbiA9IGQucGFyY2F0c1ZpZXdNb2RlbC5kaW1lbnNpb25zW3ByZXZEaW1JbmRdO1xuICAgICAgICB2YXIgbmV4dERpbWVuc2lvbiA9IGQucGFyY2F0c1ZpZXdNb2RlbC5kaW1lbnNpb25zW25leHREaW1JbmRdO1xuXG4gICAgICAgIGlmKHByZXZEaW1lbnNpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoZHJhZ0RpbWVuc2lvbi5tb2RlbC5kcmFnWCA8IChwcmV2RGltZW5zaW9uLnggKyBwcmV2RGltZW5zaW9uLndpZHRoKSkge1xuICAgICAgICAgICAgICAgIC8vIFN3YXAgZGlzcGxheSBpbmRzXG4gICAgICAgICAgICAgICAgZHJhZ0RpbWVuc2lvbi5tb2RlbC5kaXNwbGF5SW5kID0gcHJldkRpbWVuc2lvbi5tb2RlbC5kaXNwbGF5SW5kO1xuICAgICAgICAgICAgICAgIHByZXZEaW1lbnNpb24ubW9kZWwuZGlzcGxheUluZCA9IGRyYWdEaW1JbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihuZXh0RGltZW5zaW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmKChkcmFnRGltZW5zaW9uLm1vZGVsLmRyYWdYICsgZHJhZ0RpbWVuc2lvbi53aWR0aCkgPiBuZXh0RGltZW5zaW9uLngpIHtcbiAgICAgICAgICAgICAgICAvLyBTd2FwIGRpc3BsYXkgaW5kc1xuICAgICAgICAgICAgICAgIGRyYWdEaW1lbnNpb24ubW9kZWwuZGlzcGxheUluZCA9IG5leHREaW1lbnNpb24ubW9kZWwuZGlzcGxheUluZDtcbiAgICAgICAgICAgICAgICBuZXh0RGltZW5zaW9uLm1vZGVsLmRpc3BsYXlJbmQgPSBkLmRyYWdEaW1lbnNpb25EaXNwbGF5SW5kO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVXBkYXRlIGRyYWcgZGlzcGxheSBpbmRleFxuICAgICAgICBkLmRyYWdEaW1lbnNpb25EaXNwbGF5SW5kID0gZHJhZ0RpbWVuc2lvbi5tb2RlbC5kaXNwbGF5SW5kO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSB2aWV3IG1vZGVsc1xuICAgIHVwZGF0ZURpbWVuc2lvblZpZXdNb2RlbHMoZC5wYXJjYXRzVmlld01vZGVsKTtcbiAgICB1cGRhdGVQYXRoVmlld01vZGVscyhkLnBhcmNhdHNWaWV3TW9kZWwpO1xuXG4gICAgLy8gVXBkYXRlIHN2ZyBnZW9tZXRyeVxuICAgIHVwZGF0ZVN2Z0NhdGVnb3JpZXMoZC5wYXJjYXRzVmlld01vZGVsKTtcbiAgICB1cGRhdGVTdmdQYXRocyhkLnBhcmNhdHNWaWV3TW9kZWwpO1xufVxuXG5cbi8qKlxuICogSGFuZGxlIGRpbWVuc2lvbiBkcmFnIGVuZFxuICogQHBhcmFtIHtEaW1lbnNpb25WaWV3TW9kZWx9IGRcbiAqL1xuZnVuY3Rpb24gZHJhZ0RpbWVuc2lvbkVuZChkKSB7XG4gICAgLy8gQ2hlY2sgaWYgZHJhZ2dpbmcgaXMgc3VwcG9ydGVkXG4gICAgaWYoZC5wYXJjYXRzVmlld01vZGVsLmFycmFuZ2VtZW50ID09PSAnZml4ZWQnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZihkLmRyYWdEaW1lbnNpb25EaXNwbGF5SW5kID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCd0ZXh0JykuYXR0cignZm9udC13ZWlnaHQnLCAnbm9ybWFsJyk7XG5cbiAgICAvLyBDb21wdXRlIHJlc3R5bGUgY29tbWFuZFxuICAgIC8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdmFyIHJlc3R5bGVEYXRhID0ge307XG4gICAgdmFyIHRyYWNlSW5kID0gZ2V0VHJhY2VJbmRleChkLnBhcmNhdHNWaWV3TW9kZWwpO1xuXG4gICAgLy8gIyMjIEhhbmRsZSBkaW1lbnNpb24gcmVvcmRlcmluZyAjIyNcbiAgICB2YXIgZmluYWxEcmFnRGltZW5zaW9uRGlzcGxheUluZHMgPSBkLnBhcmNhdHNWaWV3TW9kZWwubW9kZWwuZGltZW5zaW9ucy5tYXAoZnVuY3Rpb24oZCkge3JldHVybiBkLmRpc3BsYXlJbmQ7fSk7XG4gICAgdmFyIGFueURpbXNSZW9yZGVyZWQgPSBkLmluaXRpYWxEcmFnRGltZW5zaW9uRGlzcGxheUluZHMuc29tZShmdW5jdGlvbihpbml0RGltRGlzcGxheSwgZGltSW5kKSB7XG4gICAgICAgIHJldHVybiBpbml0RGltRGlzcGxheSAhPT0gZmluYWxEcmFnRGltZW5zaW9uRGlzcGxheUluZHNbZGltSW5kXTtcbiAgICB9KTtcblxuICAgIGlmKGFueURpbXNSZW9yZGVyZWQpIHtcbiAgICAgICAgZmluYWxEcmFnRGltZW5zaW9uRGlzcGxheUluZHMuZm9yRWFjaChmdW5jdGlvbihmaW5hbERpbURpc3BsYXksIGRpbUluZCkge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lckluZCA9IGQucGFyY2F0c1ZpZXdNb2RlbC5tb2RlbC5kaW1lbnNpb25zW2RpbUluZF0uY29udGFpbmVySW5kO1xuICAgICAgICAgICAgcmVzdHlsZURhdGFbJ2RpbWVuc2lvbnNbJyArIGNvbnRhaW5lckluZCArICddLmRpc3BsYXlpbmRleCddID0gZmluYWxEaW1EaXNwbGF5O1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyAjIyMgSGFuZGxlIGNhdGVnb3J5IHJlb3JkZXJpbmcgIyMjXG4gICAgdmFyIGFueUNhdHNSZW9yZGVyZWQgPSBmYWxzZTtcbiAgICBpZihkLmRyYWdDYXRlZ29yeURpc3BsYXlJbmQgIT09IG51bGwpIHtcbiAgICAgICAgdmFyIGZpbmFsRHJhZ0NhdGVnb3J5RGlzcGxheUluZHMgPSBkLm1vZGVsLmNhdGVnb3JpZXMubWFwKGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgIHJldHVybiBjLmRpc3BsYXlJbmQ7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFueUNhdHNSZW9yZGVyZWQgPSBkLmluaXRpYWxEcmFnQ2F0ZWdvcnlEaXNwbGF5SW5kcy5zb21lKGZ1bmN0aW9uKGluaXRDYXREaXNwbGF5LCBjYXRJbmQpIHtcbiAgICAgICAgICAgIHJldHVybiBpbml0Q2F0RGlzcGxheSAhPT0gZmluYWxEcmFnQ2F0ZWdvcnlEaXNwbGF5SW5kc1tjYXRJbmRdO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZihhbnlDYXRzUmVvcmRlcmVkKSB7XG4gICAgICAgICAgICAvLyBTb3J0IGEgc2hhbGxvdyBjb3B5IG9mIHRoZSBjYXRlZ29yeSBtb2RlbHMgYnkgZGlzcGxheSBpbmRleFxuICAgICAgICAgICAgdmFyIHNvcnRlZENhdGVnb3J5TW9kZWxzID0gZC5tb2RlbC5jYXRlZ29yaWVzLnNsaWNlKCkuc29ydChcbiAgICAgICAgICAgICAgICBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhLmRpc3BsYXlJbmQgLSBiLmRpc3BsYXlJbmQ7IH0pO1xuXG4gICAgICAgICAgICAvLyBHZXQgbmV3IGNhdGVnb3J5YXJyYXkgYW5kIHRpY2t0ZXh0IHZhbHVlc1xuICAgICAgICAgICAgdmFyIG5ld0NhdGVnb3J5QXJyYXkgPSBzb3J0ZWRDYXRlZ29yeU1vZGVscy5tYXAoZnVuY3Rpb24odikgeyByZXR1cm4gdi5jYXRlZ29yeVZhbHVlOyB9KTtcbiAgICAgICAgICAgIHZhciBuZXdDYXRlZ29yeUxhYmVscyA9IHNvcnRlZENhdGVnb3J5TW9kZWxzLm1hcChmdW5jdGlvbih2KSB7IHJldHVybiB2LmNhdGVnb3J5TGFiZWw7IH0pO1xuXG4gICAgICAgICAgICByZXN0eWxlRGF0YVsnZGltZW5zaW9uc1snICsgZC5tb2RlbC5jb250YWluZXJJbmQgKyAnXS5jYXRlZ29yeWFycmF5J10gPSBbbmV3Q2F0ZWdvcnlBcnJheV07XG4gICAgICAgICAgICByZXN0eWxlRGF0YVsnZGltZW5zaW9uc1snICsgZC5tb2RlbC5jb250YWluZXJJbmQgKyAnXS50aWNrdGV4dCddID0gW25ld0NhdGVnb3J5TGFiZWxzXTtcbiAgICAgICAgICAgIHJlc3R5bGVEYXRhWydkaW1lbnNpb25zWycgKyBkLm1vZGVsLmNvbnRhaW5lckluZCArICddLmNhdGVnb3J5b3JkZXInXSA9ICdhcnJheSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcG90ZW50aWFsIGNsaWNrIGV2ZW50XG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGlmKGQucGFyY2F0c1ZpZXdNb2RlbC5ob3ZlcmluZm9JdGVtcy5pbmRleE9mKCdza2lwJykgPT09IC0xKSB7XG4gICAgICAgIGlmKCFkLmRyYWdIYXNNb3ZlZCAmJiBkLnBvdGVudGlhbENsaWNrQmFuZCkge1xuICAgICAgICAgICAgaWYoZC5wYXJjYXRzVmlld01vZGVsLmhvdmVyb24gPT09ICdjb2xvcicpIHtcbiAgICAgICAgICAgICAgICBlbWl0UG9pbnRzRXZlbnRDb2xvckhvdmVybW9kZShkLnBvdGVudGlhbENsaWNrQmFuZCwgJ3Bsb3RseV9jbGljaycsIGQzLmV2ZW50LnNvdXJjZUV2ZW50KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZW1pdFBvaW50c0V2ZW50Q2F0ZWdvcnlIb3Zlcm1vZGUoZC5wb3RlbnRpYWxDbGlja0JhbmQsICdwbG90bHlfY2xpY2snLCBkMy5ldmVudC5zb3VyY2VFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOdWxsaWZ5IGRyYWcgc3RhdGVzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGQubW9kZWwuZHJhZ1ggPSBudWxsO1xuICAgIGlmKGQuZHJhZ0NhdGVnb3J5RGlzcGxheUluZCAhPT0gbnVsbCkge1xuICAgICAgICB2YXIgZHJhZ0NhdGVnb3J5ID0gZC5wYXJjYXRzVmlld01vZGVsXG4gICAgICAgICAgICAuZGltZW5zaW9uc1tkLmRyYWdEaW1lbnNpb25EaXNwbGF5SW5kXVxuICAgICAgICAgICAgLmNhdGVnb3JpZXNbZC5kcmFnQ2F0ZWdvcnlEaXNwbGF5SW5kXTtcblxuICAgICAgICBkcmFnQ2F0ZWdvcnkubW9kZWwuZHJhZ1kgPSBudWxsO1xuICAgICAgICBkLmRyYWdDYXRlZ29yeURpc3BsYXlJbmQgPSBudWxsO1xuICAgIH1cblxuICAgIGQuZHJhZ0RpbWVuc2lvbkRpc3BsYXlJbmQgPSBudWxsO1xuICAgIGQucGFyY2F0c1ZpZXdNb2RlbC5kcmFnRGltZW5zaW9uID0gbnVsbDtcbiAgICBkLmRyYWdIYXNNb3ZlZCA9IG51bGw7XG4gICAgZC5wb3RlbnRpYWxDbGlja0JhbmQgPSBudWxsO1xuXG4gICAgLy8gVXBkYXRlIHZpZXcgbW9kZWxzXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tXG4gICAgdXBkYXRlRGltZW5zaW9uVmlld01vZGVscyhkLnBhcmNhdHNWaWV3TW9kZWwpO1xuICAgIHVwZGF0ZVBhdGhWaWV3TW9kZWxzKGQucGFyY2F0c1ZpZXdNb2RlbCk7XG5cbiAgICAvLyBQZXJmb3JtIHRyYW5zaXRpb25cbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgdHJhbnNpdGlvbiA9IGQzLnRyYW5zaXRpb24oKVxuICAgICAgICAuZHVyYXRpb24oMzAwKVxuICAgICAgICAuZWFzZSgnY3ViaWMtaW4tb3V0Jyk7XG5cbiAgICB0cmFuc2l0aW9uXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdXBkYXRlU3ZnQ2F0ZWdvcmllcyhkLnBhcmNhdHNWaWV3TW9kZWwsIHRydWUpO1xuICAgICAgICAgICAgdXBkYXRlU3ZnUGF0aHMoZC5wYXJjYXRzVmlld01vZGVsLCB0cnVlKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmVhY2goJ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoYW55RGltc1Jlb3JkZXJlZCB8fCBhbnlDYXRzUmVvcmRlcmVkKSB7XG4gICAgICAgICAgICAgICAgLy8gUGVyZm9ybSByZXN0eWxlIGlmIHRoZSBvcmRlciBvZiBjYXRlZ29yaWVzIG9yIGRpbWVuc2lvbnMgY2hhbmdlZFxuICAgICAgICAgICAgICAgIFBsb3RseS5yZXN0eWxlKGQucGFyY2F0c1ZpZXdNb2RlbC5ncmFwaERpdiwgcmVzdHlsZURhdGEsIFt0cmFjZUluZF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtQYXJjYXRzVmlld01vZGVsfSBwYXJjYXRzVmlld01vZGVsXG4gKi9cbmZ1bmN0aW9uIGdldFRyYWNlSW5kZXgocGFyY2F0c1ZpZXdNb2RlbCkge1xuICAgIHZhciB0cmFjZUluZDtcbiAgICB2YXIgYWxsVHJhY2VzID0gcGFyY2F0c1ZpZXdNb2RlbC5ncmFwaERpdi5fZnVsbERhdGE7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGFsbFRyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihwYXJjYXRzVmlld01vZGVsLmtleSA9PT0gYWxsVHJhY2VzW2ldLnVpZCkge1xuICAgICAgICAgICAgdHJhY2VJbmQgPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRyYWNlSW5kO1xufVxuXG4vKiogVXBkYXRlIHRoZSBzdmcgcGF0aHMgZm9yIHZpZXcgbW9kZWxcbiAqIEBwYXJhbSB7UGFyY2F0c1ZpZXdNb2RlbH0gcGFyY2F0c1ZpZXdNb2RlbFxuICogQHBhcmFtIHtib29sZWFufSBoYXNUcmFuc2l0aW9uIFdoZXRoZXIgdG8gdXBkYXRlIGVsZW1lbnQgd2l0aCB0cmFuc2l0aW9uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVN2Z1BhdGhzKHBhcmNhdHNWaWV3TW9kZWwsIGhhc1RyYW5zaXRpb24pIHtcbiAgICBpZihoYXNUcmFuc2l0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaGFzVHJhbnNpdGlvbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zaXRpb24oc2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiBoYXNUcmFuc2l0aW9uID8gc2VsZWN0aW9uLnRyYW5zaXRpb24oKSA6IHNlbGVjdGlvbjtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgYmluZGluZ1xuICAgIHBhcmNhdHNWaWV3TW9kZWwucGF0aFNlbGVjdGlvbi5kYXRhKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGQucGF0aHM7XG4gICAgfSwga2V5KTtcblxuICAgIC8vIFVwZGF0ZSBwYXRoc1xuICAgIHRyYW5zaXRpb24ocGFyY2F0c1ZpZXdNb2RlbC5wYXRoU2VsZWN0aW9uKS5hdHRyKCdkJywgZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4gZC5zdmdEO1xuICAgIH0pO1xufVxuXG4vKiogVXBkYXRlIHRoZSBzdmcgcGF0aHMgZm9yIHZpZXcgbW9kZWxcbiAqIEBwYXJhbSB7UGFyY2F0c1ZpZXdNb2RlbH0gcGFyY2F0c1ZpZXdNb2RlbFxuICogQHBhcmFtIHtib29sZWFufSBoYXNUcmFuc2l0aW9uIFdoZXRoZXIgdG8gdXBkYXRlIGVsZW1lbnQgd2l0aCB0cmFuc2l0aW9uXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVN2Z0NhdGVnb3JpZXMocGFyY2F0c1ZpZXdNb2RlbCwgaGFzVHJhbnNpdGlvbikge1xuICAgIGlmKGhhc1RyYW5zaXRpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBoYXNUcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNpdGlvbihzZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIGhhc1RyYW5zaXRpb24gPyBzZWxlY3Rpb24udHJhbnNpdGlvbigpIDogc2VsZWN0aW9uO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBiaW5kaW5nXG4gICAgcGFyY2F0c1ZpZXdNb2RlbC5kaW1lbnNpb25TZWxlY3Rpb25cbiAgICAgICAgLmRhdGEoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuZGltZW5zaW9ucztcbiAgICAgICAgfSwga2V5KTtcblxuICAgIHZhciBjYXRlZ29yeVNlbGVjdGlvbiA9IHBhcmNhdHNWaWV3TW9kZWwuZGltZW5zaW9uU2VsZWN0aW9uXG4gICAgICAgIC5zZWxlY3RBbGwoJ2cuY2F0ZWdvcnknKVxuICAgICAgICAuZGF0YShmdW5jdGlvbihkKSB7cmV0dXJuIGQuY2F0ZWdvcmllczt9LCBrZXkpO1xuXG4gICAgLy8gVXBkYXRlIGRpbWVuc2lvbiBwb3NpdGlvblxuICAgIHRyYW5zaXRpb24ocGFyY2F0c1ZpZXdNb2RlbC5kaW1lbnNpb25TZWxlY3Rpb24pXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJywgMCknO1xuICAgICAgICB9KTtcblxuICAgIC8vIFVwZGF0ZSBjYXRlZ29yeSBwb3NpdGlvblxuICAgIHRyYW5zaXRpb24oY2F0ZWdvcnlTZWxlY3Rpb24pXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgwLCAnICsgZC55ICsgJyknO1xuICAgICAgICB9KTtcblxuICAgIHZhciBkaW1MYWJlbFNlbGVjdGlvbiA9IGNhdGVnb3J5U2VsZWN0aW9uLnNlbGVjdCgnLmRpbWxhYmVsJyk7XG5cbiAgICAvLyAjIyMgVXBkYXRlIGRpbWVuc2lvbiBsYWJlbFxuICAgIC8vIE9ubHkgdGhlIHRvcC1tb3N0IGRpc3BsYXkgY2F0ZWdvcnkgc2hvdWxkIGhhdmUgdGhlIGRpbWVuc2lvbiBsYWJlbFxuICAgIGRpbUxhYmVsU2VsZWN0aW9uXG4gICAgICAgIC50ZXh0KGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgIGlmKGkgPT09IDApIHtcbiAgICAgICAgICAgICAgICAvLyBBZGQgZGltZW5zaW9uIGxhYmVsIGFib3ZlIHRvcG1vc3QgY2F0ZWdvcnlcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5wYXJjYXRzVmlld01vZGVsLm1vZGVsLmRpbWVuc2lvbnNbZC5tb2RlbC5kaW1lbnNpb25JbmRdLmRpbWVuc2lvbkxhYmVsO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgY2F0ZWdvcnkgbGFiZWxcbiAgICAvLyBDYXRlZ29yaWVzIGluIHRoZSByaWdodC1tb3N0IGRpc3BsYXkgZGltZW5zaW9uIGhhdmUgdGhlaXIgbGFiZWxzIG9uXG4gICAgLy8gdGhlIHJpZ2h0LCBhbGwgb3RoZXJzIG9uIHRoZSBsZWZ0XG4gICAgdmFyIGNhdExhYmVsU2VsZWN0aW9uID0gY2F0ZWdvcnlTZWxlY3Rpb24uc2VsZWN0KCcuY2F0bGFiZWwnKTtcbiAgICBjYXRMYWJlbFNlbGVjdGlvblxuICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLFxuICAgICAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGNhdEluUmlnaHREaW0oZCkpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gUGxhY2UgbGFiZWwgdG8gdGhlIHJpZ2h0IG9mIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnc3RhcnQnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBsYWNlIGxhYmVsIHRvIHRoZSBsZWZ0IG9mIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnZW5kJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAuYXR0cigneCcsXG4gICAgICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgaWYoY2F0SW5SaWdodERpbShkKSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBQbGFjZSBsYWJlbCB0byB0aGUgcmlnaHQgb2YgY2F0ZWdvcnlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQud2lkdGggKyA1O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFBsYWNlIGxhYmVsIHRvIHRoZSBsZWZ0IG9mIGNhdGVnb3J5XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtNTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAvLyBVcGRhdGUgYXR0cml1YnV0ZXMgb2YgPHRzcGFuPiBlbGVtZW50c1xuICAgICAgICAgICAgdmFyIG5ld1g7XG4gICAgICAgICAgICB2YXIgbmV3QW5jaG9yO1xuICAgICAgICAgICAgaWYoY2F0SW5SaWdodERpbShkKSkge1xuICAgICAgICAgICAgICAgIC8vIFBsYWNlIGxhYmVsIHRvIHRoZSByaWdodCBvZiBjYXRlZ29yeVxuICAgICAgICAgICAgICAgIG5ld1ggPSBkLndpZHRoICsgNTtcbiAgICAgICAgICAgICAgICBuZXdBbmNob3IgPSAnc3RhcnQnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBQbGFjZSBsYWJlbCB0byB0aGUgbGVmdCBvZiBjYXRlZ29yeVxuICAgICAgICAgICAgICAgIG5ld1ggPSAtNTtcbiAgICAgICAgICAgICAgICBuZXdBbmNob3IgPSAnZW5kJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKVxuICAgICAgICAgICAgICAgIC5zZWxlY3RBbGwoJ3RzcGFuJylcbiAgICAgICAgICAgICAgICAuYXR0cigneCcsIG5ld1gpXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3RleHQtYW5jaG9yJywgbmV3QW5jaG9yKTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgYmFuZHNcbiAgICAvLyBJbml0aWFsaXplIGNvbG9yIGJhbmQgcmVjdHNcbiAgICB2YXIgYmFuZFNlbGVjdGlvbiA9IGNhdGVnb3J5U2VsZWN0aW9uXG4gICAgICAgIC5zZWxlY3RBbGwoJ3JlY3QuYmFuZHJlY3QnKVxuICAgICAgICAuZGF0YShcbiAgICAgICAgICAgIC8qKiBAcGFyYW0ge0NhdGVnb3J5Vmlld01vZGVsfSBjYXRWaWV3TW9kZWwqL1xuICAgICAgICAgICAgZnVuY3Rpb24oY2F0Vmlld01vZGVsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNhdFZpZXdNb2RlbC5iYW5kcztcbiAgICAgICAgICAgIH0sIGtleSk7XG5cbiAgICB2YXIgYmFuZHNTZWxlY3Rpb25FbnRlciA9IGJhbmRTZWxlY3Rpb24uZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgJ2JhbmRyZWN0JylcbiAgICAgICAgLmF0dHIoJ2N1cnNvcicsICdtb3ZlJylcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgMClcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5jb2xvcjtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2ZpbGwtb3BhY2l0eScsIDApO1xuXG4gICAgYmFuZFNlbGVjdGlvblxuICAgICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNvbG9yO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cignd2lkdGgnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC53aWR0aDtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmhlaWdodDtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC55O1xuICAgICAgICB9KTtcblxuICAgIHN0eWxlQmFuZHNOb0hvdmVyKGJhbmRzU2VsZWN0aW9uRW50ZXIpO1xuXG4gICAgLy8gUmFpc2UgYmFuZHMgdG8gdGhlIHRvcFxuICAgIGJhbmRTZWxlY3Rpb24uZWFjaChmdW5jdGlvbigpIHtMaWIucmFpc2VUb1RvcCh0aGlzKTt9KTtcblxuICAgIC8vIFJlbW92ZSB1bnVzZWQgYmFuZHNcbiAgICBiYW5kU2VsZWN0aW9uLmV4aXQoKS5yZW1vdmUoKTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBQYXJjYXRzVmlld01vZGVsIHRyYWNlc1xuICogQHBhcmFtIHtPYmplY3R9IGdyYXBoRGl2XG4gKiAgVG9wLWxldmVsIGdyYXBoIGRpdiBlbGVtZW50XG4gKiBAcGFyYW0ge0xheW91dH0gbGF5b3V0XG4gKiAgU1ZHIGxheW91dCBvYmplY3RcbiAqIEBwYXJhbSB7QXJyYXkuPFBhcmNhdHNNb2RlbD59IHdyYXBwZWRQYXJjYXRzTW9kZWxcbiAqICBXcmFwcGVkIFBhcmNhdHNNb2RlbCBmb3IgdGhpcyB0cmFjZVxuICogQHJldHVybiB7UGFyY2F0c1ZpZXdNb2RlbH1cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUGFyY2F0c1ZpZXdNb2RlbChncmFwaERpdiwgbGF5b3V0LCB3cmFwcGVkUGFyY2F0c01vZGVsKSB7XG4gICAgLy8gVW53cmFwIG1vZGVsXG4gICAgdmFyIHBhcmNhdHNNb2RlbCA9IHdyYXBwZWRQYXJjYXRzTW9kZWxbMF07XG5cbiAgICAvLyBDb21wdXRlIG1hcmdpblxuICAgIHZhciBtYXJnaW4gPSBsYXlvdXQubWFyZ2luIHx8IHtsOiA4MCwgcjogODAsIHQ6IDEwMCwgYjogODB9O1xuXG4gICAgLy8gQ29tcHV0ZSBwaXhlbCBwb3NpdGlvbi9leHRlbnRzXG4gICAgdmFyIHRyYWNlID0gcGFyY2F0c01vZGVsLnRyYWNlO1xuICAgIHZhciBkb21haW4gPSB0cmFjZS5kb21haW47XG4gICAgdmFyIGZpZ3VyZVdpZHRoID0gbGF5b3V0LndpZHRoO1xuICAgIHZhciBmaWd1cmVIZWlnaHQgPSBsYXlvdXQuaGVpZ2h0O1xuICAgIHZhciB0cmFjZVdpZHRoID0gTWF0aC5mbG9vcihmaWd1cmVXaWR0aCAqIChkb21haW4ueFsxXSAtIGRvbWFpbi54WzBdKSk7XG4gICAgdmFyIHRyYWNlSGVpZ2h0ID0gTWF0aC5mbG9vcihmaWd1cmVIZWlnaHQgKiAoZG9tYWluLnlbMV0gLSBkb21haW4ueVswXSkpO1xuICAgIHZhciB0cmFjZVggPSBkb21haW4ueFswXSAqIGZpZ3VyZVdpZHRoICsgbWFyZ2luLmw7XG4gICAgdmFyIHRyYWNlWSA9IGxheW91dC5oZWlnaHQgLSBkb21haW4ueVsxXSAqIGxheW91dC5oZWlnaHQgKyBtYXJnaW4udDtcblxuICAgIC8vIEhhbmRsZSBwYXRoIHNoYXBlXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgcGF0aFNoYXBlID0gdHJhY2UubGluZS5zaGFwZTtcblxuICAgIC8vIEhhbmRsZSBob3ZlciBpbmZvXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS1cbiAgICB2YXIgaG92ZXJpbmZvSXRlbXM7XG4gICAgaWYodHJhY2UuaG92ZXJpbmZvID09PSAnYWxsJykge1xuICAgICAgICBob3ZlcmluZm9JdGVtcyA9IFsnY291bnQnLCAncHJvYmFiaWxpdHknXTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBob3ZlcmluZm9JdGVtcyA9ICh0cmFjZS5ob3ZlcmluZm8gfHwgJycpLnNwbGl0KCcrJyk7XG4gICAgfVxuXG4gICAgLy8gQ29uc3RydWN0IHBhcmNhdHNWaWV3TW9kZWxcbiAgICAvLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIHZhciBwYXJjYXRzVmlld01vZGVsID0ge1xuICAgICAgICB0cmFjZTogdHJhY2UsXG4gICAgICAgIGtleTogdHJhY2UudWlkLFxuICAgICAgICBtb2RlbDogcGFyY2F0c01vZGVsLFxuICAgICAgICB4OiB0cmFjZVgsXG4gICAgICAgIHk6IHRyYWNlWSxcbiAgICAgICAgd2lkdGg6IHRyYWNlV2lkdGgsXG4gICAgICAgIGhlaWdodDogdHJhY2VIZWlnaHQsXG4gICAgICAgIGhvdmVyb246IHRyYWNlLmhvdmVyb24sXG4gICAgICAgIGhvdmVyaW5mb0l0ZW1zOiBob3ZlcmluZm9JdGVtcyxcbiAgICAgICAgYXJyYW5nZW1lbnQ6IHRyYWNlLmFycmFuZ2VtZW50LFxuICAgICAgICBidW5kbGVjb2xvcnM6IHRyYWNlLmJ1bmRsZWNvbG9ycyxcbiAgICAgICAgc29ydHBhdGhzOiB0cmFjZS5zb3J0cGF0aHMsXG4gICAgICAgIGxhYmVsZm9udDogdHJhY2UubGFiZWxmb250LFxuICAgICAgICBjYXRlZ29yeWxhYmVsZm9udDogdHJhY2UudGlja2ZvbnQsXG4gICAgICAgIHBhdGhTaGFwZTogcGF0aFNoYXBlLFxuICAgICAgICBkcmFnRGltZW5zaW9uOiBudWxsLFxuICAgICAgICBtYXJnaW46IG1hcmdpbixcbiAgICAgICAgcGF0aHM6IFtdLFxuICAgICAgICBkaW1lbnNpb25zOiBbXSxcbiAgICAgICAgZ3JhcGhEaXY6IGdyYXBoRGl2LFxuICAgICAgICB0cmFjZVNlbGVjdGlvbjogbnVsbCxcbiAgICAgICAgcGF0aFNlbGVjdGlvbjogbnVsbCxcbiAgICAgICAgZGltZW5zaW9uU2VsZWN0aW9uOiBudWxsXG4gICAgfTtcblxuICAgIC8vIFVwZGF0ZSBkaW1lbnNpb24gdmlldyBtb2RlbHMgaWYgd2UgaGF2ZSBhdCBsZWFzdCAxIGRpbWVuc2lvblxuICAgIGlmKHBhcmNhdHNNb2RlbC5kaW1lbnNpb25zKSB7XG4gICAgICAgIHVwZGF0ZURpbWVuc2lvblZpZXdNb2RlbHMocGFyY2F0c1ZpZXdNb2RlbCk7XG5cbiAgICAgICAgLy8gVXBkYXRlIHBhdGggdmlldyBtb2RlbHMgaWYgd2UgaGF2ZSBhdCBsZWFzdCAyIGRpbWVuc2lvbnNcbiAgICAgICAgdXBkYXRlUGF0aFZpZXdNb2RlbHMocGFyY2F0c1ZpZXdNb2RlbCk7XG4gICAgfVxuICAgIC8vIEluc2lkZSBhIGNhdGVnb3JpZXMgdmlldyBtb2RlbFxuICAgIHJldHVybiBwYXJjYXRzVmlld01vZGVsO1xufVxuXG4vKipcbiAqIEJ1aWxkIHRoZSBTVkcgc3RyaW5nIHRvIHJlcHJlc2VudHMgYSBwYXJhbGxlbCBjYXRlZ29yaWVzIHBhdGhcbiAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IGxlZnRYUG9zaXRpb25zXG4gKiAgQXJyYXkgb2YgdGhlIHggcG9zaXRpb25zIG9mIHRoZSBsZWZ0IGVkZ2Ugb2YgZWFjaCBkaW1lbnNpb24gKGluIGRpc3BsYXkgb3JkZXIpXG4gKiBAcGFyYW0ge0FycmF5LjxOdW1iZXI+fSBwYXRoWXNcbiAqICBBcnJheSBvZiB0aGUgeSBwb3NpdGlvbnMgb2YgdGhlIHRvcCBvZiB0aGUgcGF0aCBhdCBlYWNoIGRpbWVuc2lvbiAoaW4gZGlzcGxheSBvcmRlcilcbiAqIEBwYXJhbSB7QXJyYXkuPE51bWJlcj59IGRpbVdpZHRoc1xuICogIEFycmF5IG9mIHRoZSB3aWR0aHMgb2YgZWFjaCBkaW1lbnNpb24gaW4gZGlzcGxheSBvcmRlclxuICogQHBhcmFtIHtOdW1iZXJ9IHBhdGhIZWlnaHRcbiAqICBUaGUgaGVpZ2h0IG9mIHRoZSBwYXRoIGluIHBpeGVsc1xuICogQHBhcmFtIHtOdW1iZXJ9IGN1cnZhdHVyZVxuICogIFRoZSBjdXJ2YXR1cmUgZmFjdG9yIGZvciB0aGUgcGF0aC4gMCByZXN1bHRzIGluIGEgc3RyYWlnaHQgbGluZSBhbmQgdmFsdWVzIGdyZWF0ZXIgdGhhbiB6ZXJvIHJlc3VsdCBpbiBjdXJ2ZWQgcGF0aHNcbiAqIEByZXR1cm4ge3N0cmluZ31cbiAqL1xuZnVuY3Rpb24gYnVpbGRTdmdQYXRoKGxlZnRYUG9zaXRpb25zLCBwYXRoWXMsIGRpbVdpZHRocywgcGF0aEhlaWdodCwgY3VydmF0dXJlKSB7XG4gICAgLy8gQ29tcHV0ZSB0aGUgeCBtaWRwb2ludCBvZiBlYWNoIHBhdGggc2VnbWVudFxuICAgIHZhciB4UmVmUG9pbnRzMSA9IFtdO1xuICAgIHZhciB4UmVmUG9pbnRzMiA9IFtdO1xuICAgIHZhciByZWZJbnRlcnBvbGF0b3I7XG4gICAgdmFyIGQ7XG5cbiAgICBmb3IoZCA9IDA7IGQgPCBkaW1XaWR0aHMubGVuZ3RoIC0gMTsgZCsrKSB7XG4gICAgICAgIHJlZkludGVycG9sYXRvciA9IGQzLmludGVycG9sYXRlTnVtYmVyKGRpbVdpZHRoc1tkXSArIGxlZnRYUG9zaXRpb25zW2RdLCBsZWZ0WFBvc2l0aW9uc1tkICsgMV0pO1xuICAgICAgICB4UmVmUG9pbnRzMS5wdXNoKHJlZkludGVycG9sYXRvcihjdXJ2YXR1cmUpKTtcbiAgICAgICAgeFJlZlBvaW50czIucHVzaChyZWZJbnRlcnBvbGF0b3IoMSAtIGN1cnZhdHVyZSkpO1xuICAgIH1cblxuICAgIC8vIE1vdmUgdG8gdG9wIG9mIHBhdGggb24gbGVmdCBlZGdlIG9mIGxlZnQtbW9zdCBjYXRlZ29yeVxuICAgIHZhciBzdmdEID0gJ00gJyArIGxlZnRYUG9zaXRpb25zWzBdICsgJywnICsgcGF0aFlzWzBdO1xuXG4gICAgLy8gSG9yaXpvbnRhbCBsaW5lIHRvIHJpZ2h0IGVkZ2VcbiAgICBzdmdEICs9ICdsJyArIGRpbVdpZHRoc1swXSArICcsMCAnO1xuXG4gICAgLy8gSG9yaXpvbnRhbCBsaW5lIHRvIHJpZ2h0IGVkZ2VcbiAgICBmb3IoZCA9IDE7IGQgPCBkaW1XaWR0aHMubGVuZ3RoOyBkKyspIHtcbiAgICAgICAgLy8gQ3VydmUgdG8gbGVmdCBlZGdlIG9mIGNhdGVnb3J5XG4gICAgICAgIHN2Z0QgKz0gJ0MnICsgeFJlZlBvaW50czFbZCAtIDFdICsgJywnICsgcGF0aFlzW2QgLSAxXSArXG4gICAgICAgICAgICAgICcgJyArIHhSZWZQb2ludHMyW2QgLSAxXSArICcsJyArIHBhdGhZc1tkXSArXG4gICAgICAgICAgICAgICcgJyArIGxlZnRYUG9zaXRpb25zW2RdICsgJywnICsgcGF0aFlzW2RdO1xuXG4gICAgICAgIC8vIHN2Z0QgKz0gJ0wnICsgbGVmdFhQb3NpdGlvbnNbZF0gKyAnLCcgKyBwYXRoWXNbZF07XG5cbiAgICAgICAgLy8gSG9yaXpvbnRhbCBsaW5lIHRvIHJpZ2h0IGVkZ2VcbiAgICAgICAgc3ZnRCArPSAnbCcgKyBkaW1XaWR0aHNbZF0gKyAnLDAgJztcbiAgICB9XG5cbiAgICAvLyBMaW5lIGRvd25cbiAgICBzdmdEICs9ICdsJyArICcwLCcgKyBwYXRoSGVpZ2h0ICsgJyAnO1xuXG4gICAgLy8gTGluZSB0byBsZWZ0IGVkZ2Ugb2YgcmlnaHQtbW9zdCBjYXRlZ29yeVxuICAgIHN2Z0QgKz0gJ2wgLScgKyBkaW1XaWR0aHNbZGltV2lkdGhzLmxlbmd0aCAtIDFdICsgJywwICc7XG5cbiAgICBmb3IoZCA9IGRpbVdpZHRocy5sZW5ndGggLSAyOyBkID49IDA7IGQtLSkge1xuICAgICAgICAvLyBDdXJ2ZSB0byByaWdodCBlZGdlIG9mIGNhdGVnb3J5XG4gICAgICAgIHN2Z0QgKz0gJ0MnICsgeFJlZlBvaW50czJbZF0gKyAnLCcgKyAocGF0aFlzW2QgKyAxXSArIHBhdGhIZWlnaHQpICtcbiAgICAgICAgICAgICAnICcgKyB4UmVmUG9pbnRzMVtkXSArICcsJyArIChwYXRoWXNbZF0gKyBwYXRoSGVpZ2h0KSArXG4gICAgICAgICAgICAgJyAnICsgKGxlZnRYUG9zaXRpb25zW2RdICsgZGltV2lkdGhzW2RdKSArICcsJyArIChwYXRoWXNbZF0gKyBwYXRoSGVpZ2h0KTtcblxuICAgICAgICAvLyBzdmdEICs9ICdMJyArIChsZWZ0WFBvc2l0aW9uc1tkXSArIGRpbVdpZHRoc1tkXSkgKyAnLCcgKyAocGF0aFlzW2RdICsgcGF0aEhlaWdodCk7XG5cbiAgICAgICAgLy8gSG9yaXpvbnRhbCBsaW5lIHRvIHJpZ2h0IGVkZ2VcbiAgICAgICAgc3ZnRCArPSAnbC0nICsgZGltV2lkdGhzW2RdICsgJywwICc7XG4gICAgfVxuXG4gICAgLy8gQ2xvc2UgcGF0aFxuICAgIHN2Z0QgKz0gJ1onO1xuICAgIHJldHVybiBzdmdEO1xufVxuXG4vKipcbiAqIFVwZGF0ZSB0aGUgcGF0aCB2aWV3IG1vZGVscyBiYXNlZCBvbiB0aGUgZGltZW5zaW9uIHZpZXcgbW9kZWxzIGluIGEgUGFyY2F0c1ZpZXdNb2RlbFxuICpcbiAqIEBwYXJhbSB7UGFyY2F0c1ZpZXdNb2RlbH0gcGFyY2F0c1ZpZXdNb2RlbFxuICogIFZpZXcgbW9kZWwgZm9yIHRyYWNlXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVBhdGhWaWV3TW9kZWxzKHBhcmNhdHNWaWV3TW9kZWwpIHtcbiAgICAvLyBJbml0aWFsaXplIGFuIGFycmF5IG9mIHRoZSB5IHBvc2l0aW9uIG9mIHRoZSB0b3Agb2YgdGhlIG5leHQgcGF0aCB0byBiZSBhZGRlZCB0byBlYWNoIGNhdGVnb3J5LlxuICAgIC8vXG4gICAgLy8gbmV4dFlQb3NpdGlvbnNbZF1bY10gaXMgdGhlIHkgcG9zaXRpb24gb2YgdGhlIG5leHQgcGF0aCB0aHJvdWdoIGNhdGVnb3J5IHdpdGggaW5kZXggYyBvZiBkaW1lbnNpb24gd2l0aCBpbmRleCBkXG4gICAgdmFyIGRpbWVuc2lvblZpZXdNb2RlbHMgPSBwYXJjYXRzVmlld01vZGVsLmRpbWVuc2lvbnM7XG4gICAgdmFyIHBhcmNhdHNNb2RlbCA9IHBhcmNhdHNWaWV3TW9kZWwubW9kZWw7XG4gICAgdmFyIG5leHRZUG9zaXRpb25zID0gZGltZW5zaW9uVmlld01vZGVscy5tYXAoXG4gICAgICAgIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNhdGVnb3JpZXMubWFwKFxuICAgICAgICAgICAgICAgIGZ1bmN0aW9uKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGMueTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBBcnJheSBmcm9tIGNhdGVnb3J5IGluZGV4IHRvIGNhdGVnb3J5IGRpc3BsYXkgaW5kZXggZm9yIGVhY2ggdHJ1ZSBkaW1lbnNpb24gaW5kZXhcbiAgICB2YXIgY2F0VG9EaXNwbGF5SW5kUGVyRGltID0gcGFyY2F0c1ZpZXdNb2RlbC5tb2RlbC5kaW1lbnNpb25zLm1hcChcbiAgICAgICAgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuY2F0ZWdvcmllcy5tYXAoZnVuY3Rpb24oYykge3JldHVybiBjLmRpc3BsYXlJbmQ7fSk7XG4gICAgICAgIH0pO1xuXG4gICAgLy8gQXJyYXkgZnJvbSB0cnVlIGRpbWVuc2lvbiBpbmRleCB0byBkaW1lbnNpb24gZGlzcGxheSBpbmRleFxuICAgIHZhciBkaW1Ub0Rpc3BsYXlJbmQgPSBwYXJjYXRzVmlld01vZGVsLm1vZGVsLmRpbWVuc2lvbnMubWFwKGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5kaXNwbGF5SW5kO30pO1xuICAgIHZhciBkaXNwbGF5VG9EaW1JbmQgPSBwYXJjYXRzVmlld01vZGVsLmRpbWVuc2lvbnMubWFwKGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5tb2RlbC5kaW1lbnNpb25JbmQ7fSk7XG5cbiAgICAvLyBBcnJheSBvZiB0aGUgeCBwb3NpdGlvbiBvZiB0aGUgbGVmdCBlZGdlIG9mIHRoZSByZWN0YW5nbGVzIGZvciBlYWNoIGRpbWVuc2lvblxuICAgIHZhciBsZWZ0WFBvc2l0aW9ucyA9IGRpbWVuc2lvblZpZXdNb2RlbHMubWFwKFxuICAgICAgICBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC54O1xuICAgICAgICB9KTtcblxuICAgIC8vIENvbXB1dGUgZGltZW5zaW9uIHdpZHRoc1xuICAgIHZhciBkaW1XaWR0aHMgPSBkaW1lbnNpb25WaWV3TW9kZWxzLm1hcChmdW5jdGlvbihkKSB7cmV0dXJuIGQud2lkdGg7fSk7XG5cbiAgICAvLyBCdWlsZCBzb3J0ZWQgQXJyYXkgb2YgUGF0aE1vZGVsIG9iamVjdHNcbiAgICB2YXIgcGF0aE1vZGVscyA9IFtdO1xuICAgIGZvcih2YXIgcCBpbiBwYXJjYXRzTW9kZWwucGF0aHMpIHtcbiAgICAgICAgaWYocGFyY2F0c01vZGVsLnBhdGhzLmhhc093blByb3BlcnR5KHApKSB7XG4gICAgICAgICAgICBwYXRoTW9kZWxzLnB1c2gocGFyY2F0c01vZGVsLnBhdGhzW3BdKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIENvbXB1dGUgY2F0ZWdvcnkgZGlzcGxheSBpbmRzIHRvIHVzZSBmb3Igc29ydGluZyBwYXRoc1xuICAgIGZ1bmN0aW9uIHBhdGhEaXNwbGF5Q2F0ZWdvcnlJbmRzKHBhdGhNb2RlbCkge1xuICAgICAgICB2YXIgZGltZW5zaW9uSW5kcyA9IHBhdGhNb2RlbC5jYXRlZ29yeUluZHMubWFwKGZ1bmN0aW9uKGNhdEluZCwgZGltSW5kKSB7cmV0dXJuIGNhdFRvRGlzcGxheUluZFBlckRpbVtkaW1JbmRdW2NhdEluZF07fSk7XG4gICAgICAgIHZhciBkaXNwbGF5SW5kcyA9IGRpc3BsYXlUb0RpbUluZC5tYXAoZnVuY3Rpb24oZGltSW5kKSB7XG4gICAgICAgICAgICByZXR1cm4gZGltZW5zaW9uSW5kc1tkaW1JbmRdO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGRpc3BsYXlJbmRzO1xuICAgIH1cblxuICAgIC8vIFNvcnQgaW4gYXNjZW5kaW5nIG9yZGVyIGJ5IGRpc3BsYXkgaW5kZXggYXJyYXlcbiAgICBwYXRoTW9kZWxzLnNvcnQoZnVuY3Rpb24odjEsIHYyKSB7XG4gICAgICAgIC8vIEJ1aWxkIGRpc3BsYXkgaW5kcyBmb3IgZWFjaCBwYXRoXG4gICAgICAgIHZhciBzb3J0QXJyYXkxID0gcGF0aERpc3BsYXlDYXRlZ29yeUluZHModjEpO1xuICAgICAgICB2YXIgc29ydEFycmF5MiA9IHBhdGhEaXNwbGF5Q2F0ZWdvcnlJbmRzKHYyKTtcblxuICAgICAgICAvLyBIYW5kbGUgcGF0aCBzb3J0IG9yZGVyXG4gICAgICAgIGlmKHBhcmNhdHNWaWV3TW9kZWwuc29ydHBhdGhzID09PSAnYmFja3dhcmQnKSB7XG4gICAgICAgICAgICBzb3J0QXJyYXkxLnJldmVyc2UoKTtcbiAgICAgICAgICAgIHNvcnRBcnJheTIucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQXBwZW5kIHRoZSBmaXJzdCB2YWx1ZSBpbmRleCBvZiB0aGUgcGF0aCB0byBicmVhayB0aWVzXG4gICAgICAgIHNvcnRBcnJheTEucHVzaCh2MS52YWx1ZUluZHNbMF0pO1xuICAgICAgICBzb3J0QXJyYXkyLnB1c2godjIudmFsdWVJbmRzWzBdKTtcblxuICAgICAgICAvLyBIYW5kbGUgY29sb3IgYnVuZGxpbmdcbiAgICAgICAgaWYocGFyY2F0c1ZpZXdNb2RlbC5idW5kbGVjb2xvcnMpIHtcbiAgICAgICAgICAgIC8vIFByZXBlbmQgc29ydCBhcnJheSB3aXRoIHRoZSByYXcgY29sb3IgdmFsdWVcbiAgICAgICAgICAgIHNvcnRBcnJheTEudW5zaGlmdCh2MS5yYXdDb2xvcik7XG4gICAgICAgICAgICBzb3J0QXJyYXkyLnVuc2hpZnQodjIucmF3Q29sb3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY29sb3JzIGVxdWFsLCBzb3J0IGJ5IGRpc3BsYXkgY2F0ZWdvcmllc1xuICAgICAgICBpZihzb3J0QXJyYXkxIDwgc29ydEFycmF5Mikge1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIGlmKHNvcnRBcnJheTEgPiBzb3J0QXJyYXkyKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAwO1xuICAgIH0pO1xuXG4gICAgLy8gQ3JlYXRlIHBhdGggbW9kZWxzXG4gICAgdmFyIHBhdGhWaWV3TW9kZWxzID0gbmV3IEFycmF5KHBhdGhNb2RlbHMubGVuZ3RoKTtcbiAgICB2YXIgdG90YWxDb3VudCA9IGRpbWVuc2lvblZpZXdNb2RlbHNbMF0ubW9kZWwuY291bnQ7XG4gICAgdmFyIHRvdGFsSGVpZ2h0ID0gZGltZW5zaW9uVmlld01vZGVsc1swXS5jYXRlZ29yaWVzXG4gICAgICAgIC5tYXAoZnVuY3Rpb24oYykgeyByZXR1cm4gYy5oZWlnaHQ7IH0pXG4gICAgICAgIC5yZWR1Y2UoZnVuY3Rpb24odjEsIHYyKSB7IHJldHVybiB2MSArIHYyOyB9KTtcblxuXG4gICAgZm9yKHZhciBwYXRoTnVtYmVyID0gMDsgcGF0aE51bWJlciA8IHBhdGhNb2RlbHMubGVuZ3RoOyBwYXRoTnVtYmVyKyspIHtcbiAgICAgICAgdmFyIHBhdGhNb2RlbCA9IHBhdGhNb2RlbHNbcGF0aE51bWJlcl07XG5cbiAgICAgICAgdmFyIHBhdGhIZWlnaHQ7XG4gICAgICAgIGlmKHRvdGFsQ291bnQgPiAwKSB7XG4gICAgICAgICAgICBwYXRoSGVpZ2h0ID0gdG90YWxIZWlnaHQgKiAocGF0aE1vZGVsLmNvdW50IC8gdG90YWxDb3VudCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYXRoSGVpZ2h0ID0gMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEJ1aWxkIHBhdGggeSBjb29yZHNcbiAgICAgICAgdmFyIHBhdGhZcyA9IG5ldyBBcnJheShuZXh0WVBvc2l0aW9ucy5sZW5ndGgpO1xuICAgICAgICBmb3IodmFyIGQgPSAwOyBkIDwgcGF0aE1vZGVsLmNhdGVnb3J5SW5kcy5sZW5ndGg7IGQrKykge1xuICAgICAgICAgICAgdmFyIGNhdEluZCA9IHBhdGhNb2RlbC5jYXRlZ29yeUluZHNbZF07XG4gICAgICAgICAgICB2YXIgY2F0RGlzcGxheUluZCA9IGNhdFRvRGlzcGxheUluZFBlckRpbVtkXVtjYXRJbmRdO1xuICAgICAgICAgICAgdmFyIGRpbURpc3BsYXlJbmQgPSBkaW1Ub0Rpc3BsYXlJbmRbZF07XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBuZXh0IHkgcG9zaXRpb25cbiAgICAgICAgICAgIHBhdGhZc1tkaW1EaXNwbGF5SW5kXSA9IG5leHRZUG9zaXRpb25zW2RpbURpc3BsYXlJbmRdW2NhdERpc3BsYXlJbmRdO1xuICAgICAgICAgICAgbmV4dFlQb3NpdGlvbnNbZGltRGlzcGxheUluZF1bY2F0RGlzcGxheUluZF0gKz0gcGF0aEhlaWdodDtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIGNhdGVnb3J5IGNvbG9yIGluZm9ybWF0aW9uXG4gICAgICAgICAgICB2YXIgY2F0Vmlld01vZGxlID0gcGFyY2F0c1ZpZXdNb2RlbC5kaW1lbnNpb25zW2RpbURpc3BsYXlJbmRdLmNhdGVnb3JpZXNbY2F0RGlzcGxheUluZF07XG4gICAgICAgICAgICB2YXIgbnVtQmFuZHMgPSBjYXRWaWV3TW9kbGUuYmFuZHMubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGxhc3RDYXRCYW5kID0gY2F0Vmlld01vZGxlLmJhbmRzW251bUJhbmRzIC0gMV07XG5cbiAgICAgICAgICAgIGlmKGxhc3RDYXRCYW5kID09PSB1bmRlZmluZWQgfHwgcGF0aE1vZGVsLnJhd0NvbG9yICE9PSBsYXN0Q2F0QmFuZC5yYXdDb2xvcikge1xuICAgICAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyBiYW5kXG4gICAgICAgICAgICAgICAgdmFyIGJhbmRZID0gbGFzdENhdEJhbmQgPT09IHVuZGVmaW5lZCA/IDAgOiBsYXN0Q2F0QmFuZC55ICsgbGFzdENhdEJhbmQuaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGNhdFZpZXdNb2RsZS5iYW5kcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAga2V5OiBiYW5kWSxcbiAgICAgICAgICAgICAgICAgICAgY29sb3I6IHBhdGhNb2RlbC5jb2xvcixcbiAgICAgICAgICAgICAgICAgICAgcmF3Q29sb3I6IHBhdGhNb2RlbC5yYXdDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBwYXRoSGVpZ2h0LFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogY2F0Vmlld01vZGxlLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICBjb3VudDogcGF0aE1vZGVsLmNvdW50LFxuICAgICAgICAgICAgICAgICAgICB5OiBiYW5kWSxcbiAgICAgICAgICAgICAgICAgICAgY2F0ZWdvcnlWaWV3TW9kZWw6IGNhdFZpZXdNb2RsZSxcbiAgICAgICAgICAgICAgICAgICAgcGFyY2F0c1ZpZXdNb2RlbDogcGFyY2F0c1ZpZXdNb2RlbFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBFeHRlbmQgY3VycmVudCBiYW5kXG4gICAgICAgICAgICAgICAgdmFyIGN1cnJlbnRCYW5kID0gY2F0Vmlld01vZGxlLmJhbmRzW251bUJhbmRzIC0gMV07XG4gICAgICAgICAgICAgICAgY3VycmVudEJhbmQuaGVpZ2h0ICs9IHBhdGhIZWlnaHQ7XG4gICAgICAgICAgICAgICAgY3VycmVudEJhbmQuY291bnQgKz0gcGF0aE1vZGVsLmNvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gYnVpbGQgc3ZnIHBhdGhcbiAgICAgICAgdmFyIHN2Z0Q7XG4gICAgICAgIGlmKHBhcmNhdHNWaWV3TW9kZWwucGF0aFNoYXBlID09PSAnaHNwbGluZScpIHtcbiAgICAgICAgICAgIHN2Z0QgPSBidWlsZFN2Z1BhdGgobGVmdFhQb3NpdGlvbnMsIHBhdGhZcywgZGltV2lkdGhzLCBwYXRoSGVpZ2h0LCAwLjUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3ZnRCA9IGJ1aWxkU3ZnUGF0aChsZWZ0WFBvc2l0aW9ucywgcGF0aFlzLCBkaW1XaWR0aHMsIHBhdGhIZWlnaHQsIDApO1xuICAgICAgICB9XG5cbiAgICAgICAgcGF0aFZpZXdNb2RlbHNbcGF0aE51bWJlcl0gPSB7XG4gICAgICAgICAgICBrZXk6IHBhdGhNb2RlbC52YWx1ZUluZHNbMF0sXG4gICAgICAgICAgICBtb2RlbDogcGF0aE1vZGVsLFxuICAgICAgICAgICAgaGVpZ2h0OiBwYXRoSGVpZ2h0LFxuICAgICAgICAgICAgbGVmdFhzOiBsZWZ0WFBvc2l0aW9ucyxcbiAgICAgICAgICAgIHRvcFlzOiBwYXRoWXMsXG4gICAgICAgICAgICBkaW1XaWR0aHM6IGRpbVdpZHRocyxcbiAgICAgICAgICAgIHN2Z0Q6IHN2Z0QsXG4gICAgICAgICAgICBwYXJjYXRzVmlld01vZGVsOiBwYXJjYXRzVmlld01vZGVsXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcGFyY2F0c1ZpZXdNb2RlbC5wYXRocyA9IHBhdGhWaWV3TW9kZWxzO1xuXG4gLy8gKiBAcHJvcGVydHkga2V5XG4gLy8gKiAgVW5pcXVlIGtleSBmb3IgdGhpcyBtb2RlbFxuIC8vICogQHByb3BlcnR5IHtQYXRoTW9kZWx9IG1vZGVsXG4gLy8gKiAgU291cmNlIHBhdGggbW9kZWxcbiAvLyAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBoZWlnaHRcbiAvLyAqICBIZWlnaHQgb2YgdGhpcyBwYXRoIChwaXhlbHMpXG4gLy8gKiBAcHJvcGVydHkge1N0cmluZ30gc3ZnRFxuIC8vICogIFNWRyBwYXRoIFwiZFwiIGF0dHJpYnV0ZSBzdHJpbmdcbn1cblxuLyoqXG4gKiBVcGRhdGUgdGhlIGRpbWVuc2lvbiB2aWV3IG1vZGVscyBiYXNlZCBvbiB0aGUgZGltZW5zaW9uIG1vZGVscyBpbiBhIFBhcmNhdHNWaWV3TW9kZWxcbiAqXG4gKiBAcGFyYW0ge1BhcmNhdHNWaWV3TW9kZWx9IHBhcmNhdHNWaWV3TW9kZWxcbiAqICBWaWV3IG1vZGVsIGZvciB0cmFjZVxuICovXG5mdW5jdGlvbiB1cGRhdGVEaW1lbnNpb25WaWV3TW9kZWxzKHBhcmNhdHNWaWV3TW9kZWwpIHtcbiAgICAvLyBDb21wdXRlIGRpbWVuc2lvbiBvcmRlcmluZ1xuICAgIHZhciBkaW1lbnNpb25zSW5kSW5mbyA9IHBhcmNhdHNWaWV3TW9kZWwubW9kZWwuZGltZW5zaW9ucy5tYXAoZnVuY3Rpb24oZCkge1xuICAgICAgICByZXR1cm4ge2Rpc3BsYXlJbmQ6IGQuZGlzcGxheUluZCwgZGltZW5zaW9uSW5kOiBkLmRpbWVuc2lvbkluZH07XG4gICAgfSk7XG5cbiAgICBkaW1lbnNpb25zSW5kSW5mby5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEuZGlzcGxheUluZCAtIGIuZGlzcGxheUluZDtcbiAgICB9KTtcblxuICAgIHZhciBkaW1lbnNpb25zID0gW107XG4gICAgZm9yKHZhciBkaXNwbGF5SW5kIGluIGRpbWVuc2lvbnNJbmRJbmZvKSB7XG4gICAgICAgIHZhciBkaW1lbnNpb25JbmQgPSBkaW1lbnNpb25zSW5kSW5mb1tkaXNwbGF5SW5kXS5kaW1lbnNpb25JbmQ7XG4gICAgICAgIHZhciBkaW1Nb2RlbCA9IHBhcmNhdHNWaWV3TW9kZWwubW9kZWwuZGltZW5zaW9uc1tkaW1lbnNpb25JbmRdO1xuICAgICAgICBkaW1lbnNpb25zLnB1c2goY3JlYXRlRGltZW5zaW9uVmlld01vZGVsKHBhcmNhdHNWaWV3TW9kZWwsIGRpbU1vZGVsKSk7XG4gICAgfVxuXG4gICAgcGFyY2F0c1ZpZXdNb2RlbC5kaW1lbnNpb25zID0gZGltZW5zaW9ucztcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBwYXJjYXRzIERpbWVuc2lvblZpZXdNb2RlbFxuICpcbiAqIEBwYXJhbSB7UGFyY2F0c1ZpZXdNb2RlbH0gcGFyY2F0c1ZpZXdNb2RlbFxuICogIFZpZXcgbW9kZWwgZm9yIHRyYWNlXG4gKiBAcGFyYW0ge0RpbWVuc2lvbk1vZGVsfSBkaW1lbnNpb25Nb2RlbFxuICogQHJldHVybiB7RGltZW5zaW9uVmlld01vZGVsfVxuICovXG5mdW5jdGlvbiBjcmVhdGVEaW1lbnNpb25WaWV3TW9kZWwocGFyY2F0c1ZpZXdNb2RlbCwgZGltZW5zaW9uTW9kZWwpIHtcbiAgICAvLyBDb21wdXRlIGRpbWVuc2lvbiB4IHBvc2l0aW9uXG4gICAgdmFyIGNhdGVnb3J5TGFiZWxQYWQgPSA0MDtcbiAgICB2YXIgZGltV2lkdGggPSAxNjtcbiAgICB2YXIgbnVtRGltZW5zaW9ucyA9IHBhcmNhdHNWaWV3TW9kZWwubW9kZWwuZGltZW5zaW9ucy5sZW5ndGg7XG4gICAgdmFyIGRpc3BsYXlJbmQgPSBkaW1lbnNpb25Nb2RlbC5kaXNwbGF5SW5kO1xuXG4gICAgLy8gQ29tcHV0ZSB4IGNvb3JkaW5hdGUgdmFsdWVzXG4gICAgdmFyIGRpbUR4O1xuICAgIHZhciBkaW1YMDtcbiAgICB2YXIgZGltWDtcblxuICAgIGlmKG51bURpbWVuc2lvbnMgPiAxKSB7XG4gICAgICAgIGRpbUR4ID0gKHBhcmNhdHNWaWV3TW9kZWwud2lkdGggLSAyICogY2F0ZWdvcnlMYWJlbFBhZCAtIGRpbVdpZHRoKSAvIChudW1EaW1lbnNpb25zIC0gMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgZGltRHggPSAwO1xuICAgIH1cbiAgICBkaW1YMCA9IGNhdGVnb3J5TGFiZWxQYWQ7XG4gICAgZGltWCA9IGRpbVgwICsgZGltRHggKiBkaXNwbGF5SW5kO1xuXG4gICAgLy8gQ29tcHV0ZSBjYXRlZ29yaWVzXG4gICAgdmFyIGNhdGVnb3JpZXMgPSBbXTtcbiAgICB2YXIgbWF4Q2F0cyA9IHBhcmNhdHNWaWV3TW9kZWwubW9kZWwubWF4Q2F0cztcbiAgICB2YXIgbnVtQ2F0cyA9IGRpbWVuc2lvbk1vZGVsLmNhdGVnb3JpZXMubGVuZ3RoO1xuICAgIHZhciBjYXRTcGFjaW5nID0gODtcbiAgICB2YXIgdG90YWxDb3VudCA9IGRpbWVuc2lvbk1vZGVsLmNvdW50O1xuICAgIHZhciB0b3RhbEhlaWdodCA9IHBhcmNhdHNWaWV3TW9kZWwuaGVpZ2h0IC0gY2F0U3BhY2luZyAqIChtYXhDYXRzIC0gMSk7XG4gICAgdmFyIG5leHRDYXRIZWlnaHQ7XG4gICAgdmFyIG5leHRDYXRNb2RlbDtcbiAgICB2YXIgbmV4dENhdDtcbiAgICB2YXIgY2F0SW5kO1xuICAgIHZhciBjYXREaXNwbGF5SW5kO1xuXG4gICAgLy8gQ29tcHV0ZSBzdGFydGluZyBZIG9mZnNldFxuICAgIHZhciBuZXh0Q2F0WSA9IChtYXhDYXRzIC0gbnVtQ2F0cykgKiBjYXRTcGFjaW5nIC8gMi4wO1xuXG4gICAgLy8gQ29tcHV0ZSBjYXRlZ29yeSBvcmRlcmluZ1xuICAgIHZhciBjYXRlZ29yeUluZEluZm8gPSBkaW1lbnNpb25Nb2RlbC5jYXRlZ29yaWVzLm1hcChmdW5jdGlvbihjKSB7XG4gICAgICAgIHJldHVybiB7ZGlzcGxheUluZDogYy5kaXNwbGF5SW5kLCBjYXRlZ29yeUluZDogYy5jYXRlZ29yeUluZH07XG4gICAgfSk7XG5cbiAgICBjYXRlZ29yeUluZEluZm8uc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLmRpc3BsYXlJbmQgLSBiLmRpc3BsYXlJbmQ7XG4gICAgfSk7XG5cbiAgICBmb3IoY2F0RGlzcGxheUluZCA9IDA7IGNhdERpc3BsYXlJbmQgPCBudW1DYXRzOyBjYXREaXNwbGF5SW5kKyspIHtcbiAgICAgICAgY2F0SW5kID0gY2F0ZWdvcnlJbmRJbmZvW2NhdERpc3BsYXlJbmRdLmNhdGVnb3J5SW5kO1xuICAgICAgICBuZXh0Q2F0TW9kZWwgPSBkaW1lbnNpb25Nb2RlbC5jYXRlZ29yaWVzW2NhdEluZF07XG5cbiAgICAgICAgaWYodG90YWxDb3VudCA+IDApIHtcbiAgICAgICAgICAgIG5leHRDYXRIZWlnaHQgPSAobmV4dENhdE1vZGVsLmNvdW50IC8gdG90YWxDb3VudCkgKiB0b3RhbEhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5leHRDYXRIZWlnaHQgPSAwO1xuICAgICAgICB9XG5cbiAgICAgICAgbmV4dENhdCA9IHtcbiAgICAgICAgICAgIGtleTogbmV4dENhdE1vZGVsLnZhbHVlSW5kc1swXSxcbiAgICAgICAgICAgIG1vZGVsOiBuZXh0Q2F0TW9kZWwsXG4gICAgICAgICAgICB3aWR0aDogZGltV2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IG5leHRDYXRIZWlnaHQsXG4gICAgICAgICAgICB5OiBuZXh0Q2F0TW9kZWwuZHJhZ1kgIT09IG51bGwgPyBuZXh0Q2F0TW9kZWwuZHJhZ1kgOiBuZXh0Q2F0WSxcbiAgICAgICAgICAgIGJhbmRzOiBbXSxcbiAgICAgICAgICAgIHBhcmNhdHNWaWV3TW9kZWw6IHBhcmNhdHNWaWV3TW9kZWxcbiAgICAgICAgfTtcblxuICAgICAgICBuZXh0Q2F0WSA9IG5leHRDYXRZICsgbmV4dENhdEhlaWdodCArIGNhdFNwYWNpbmc7XG4gICAgICAgIGNhdGVnb3JpZXMucHVzaChuZXh0Q2F0KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBrZXk6IGRpbWVuc2lvbk1vZGVsLmRpbWVuc2lvbkluZCxcbiAgICAgICAgeDogZGltZW5zaW9uTW9kZWwuZHJhZ1ggIT09IG51bGwgPyBkaW1lbnNpb25Nb2RlbC5kcmFnWCA6IGRpbVgsXG4gICAgICAgIHk6IDAsXG4gICAgICAgIHdpZHRoOiBkaW1XaWR0aCxcbiAgICAgICAgbW9kZWw6IGRpbWVuc2lvbk1vZGVsLFxuICAgICAgICBjYXRlZ29yaWVzOiBjYXRlZ29yaWVzLFxuICAgICAgICBwYXJjYXRzVmlld01vZGVsOiBwYXJjYXRzVmlld01vZGVsLFxuICAgICAgICBkcmFnQ2F0ZWdvcnlEaXNwbGF5SW5kOiBudWxsLFxuICAgICAgICBkcmFnRGltZW5zaW9uRGlzcGxheUluZDogbnVsbCxcbiAgICAgICAgaW5pdGlhbERyYWdEaW1lbnNpb25EaXNwbGF5SW5kczogbnVsbCxcbiAgICAgICAgaW5pdGlhbERyYWdDYXRlZ29yeURpc3BsYXlJbmRzOiBudWxsLFxuICAgICAgICBkcmFnSGFzTW92ZWQ6IG51bGwsXG4gICAgICAgIHBvdGVudGlhbENsaWNrQmFuZDogbnVsbFxuICAgIH07XG59XG5cbi8vIEpTRG9jIHR5cGVkZWZzXG4vLyA9PT09PT09PT09PT09PVxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBMYXlvdXRcbiAqICBPYmplY3QgY29udGFpbmluZyBzdmcgbGF5b3V0IGluZm9ybWF0aW9uXG4gKlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoIChwaXhlbHMpXG4gKiAgVXNhYmxlIHdpZHRoIGZvciBGaWd1cmUgKGFmdGVyIG1hcmdpbnMgYXJlIHJlbW92ZWQpXG4gKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0IChwaXhlbHMpXG4gKiAgVXNhYmxlIGhlaWdodCBmb3IgRmlndXJlIChhZnRlciBtYXJnaW5zIGFyZSByZW1vdmVkKVxuICogQHByb3BlcnR5IHtNYXJnaW59IG1hcmdpblxuICogIE1hcmdpbiBhcm91bmQgdGhlIEZpZ3VyZSAocGl4ZWxzKVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gTWFyZ2luXG4gKiAgT2JqZWN0IGNvbnRhaW5pbmcgcGFkZGluZyBpbmZvcm1hdGlvbiBpbiBwaXhlbHNcbiAqXG4gKiBAcHJvcGVydHkge051bWJlcn0gdFxuICogIFRvcCBtYXJnaW5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSByXG4gKiAgUmlnaHQgbWFyZ2luXG4gKiBAcHJvcGVydHkge051bWJlcn0gYlxuICogIEJvdHRvbSBtYXJnaW5cbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBsXG4gKiAgTGVmdCBtYXJnaW5cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEZvbnRcbiAqICBPYmplY3QgY29udGFpbmluZyBmb250IGluZm9ybWF0aW9uXG4gKlxuICogQHByb3BlcnR5IHtOdW1iZXJ9IHNpemU6IEZvbnQgc2l6ZVxuICogQHByb3BlcnR5IHtTdHJpbmd9IGNvbG9yOiBGb250IGNvbG9yXG4gKiBAcHJvcGVydHkge1N0cmluZ30gZmFtaWx5OiBGb250IGZhbWlseVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUGFyY2F0c1ZpZXdNb2RlbFxuICogIE9iamVjdCBjb250YWluaW5nIGNhbGN1bGF0ZWQgcGFyY2F0cyB2aWV3IGluZm9ybWF0aW9uXG4gKlxuICogIFRoZXNlIGFyZSBxdWFudGl0aWVzIHRoYXQgcmVxdWlyZSBMYXlvdXQgaW5mb3JtYXRpb24gdG8gY2FsY3VsYXRlXG4gKiBAcHJvcGVydHkga2V5XG4gKiAgVW5pcXVlIGtleSBmb3IgdGhpcyBtb2RlbFxuICogQHByb3BlcnR5IHtQYXJjYXRzTW9kZWx9IG1vZGVsXG4gKiAgU291cmNlIHBhcmNhdHMgbW9kZWxcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPERpbWVuc2lvblZpZXdNb2RlbD59IGRpbWVuc2lvbnNcbiAqICBBcnJheSBvZiBkaW1lbnNpb24gdmlldyBtb2RlbHNcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxuICogIFdpZHRoIGZvciB0aGlzIHRyYWNlIChwaXhlbHMpXG4gKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0XG4gKiAgSGVpZ2h0IGZvciB0aGlzIHRyYWNlIChwaXhlbHMpXG4gKiBAcHJvcGVydHkge051bWJlcn0geFxuICogIFggcG9zaXRpb24gb2YgdGhpcyB0cmFjZSB3aXRoIHJlc3BlY3QgdG8gdGhlIEZpZ3VyZSAocGl4ZWxzKVxuICogQHByb3BlcnR5IHtOdW1iZXJ9IHlcbiAqICBZIHBvc2l0aW9uIG9mIHRoaXMgdHJhY2Ugd2l0aCByZXNwZWN0IHRvIHRoZSBGaWd1cmUgKHBpeGVscylcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBob3Zlcm9uXG4gKiAgSG92ZXIgaW50ZXJhY3Rpb24gbW9kZS4gT25lIG9mOiAnY2F0ZWdvcnknLCAnY29sb3InLCBvciAnZGltZW5zaW9uJ1xuICogQHByb3BlcnR5IHtBcnJheS48U3RyaW5nPn0gaG92ZXJpbmZvSXRlbXNcbiAqICBJbmZvIHRvIGRpc3BsYXkgb24gaG92ZXIuIEFycmF5IHdpdGggYSBjb21iaW5hdGlvbiBvZiAnY291bnRzJyBhbmQvb3IgJ3Byb2JhYmlsaXRpZXMnLCBvciAnbm9uZScsIG9yICdza2lwJ1xuICogQHByb3BlcnR5IHtTdHJpbmd9IGFycmFuZ2VtZW50XG4gKiAgQ2F0ZWdvcnkgYXJyYW5nZW1lbnQuIE9uZSBvZjogJ3BlcnBlbmRpY3VsYXInLCAnZnJlZWZvcm0nLCBvciAnZml4ZWQnXG4gKiBAcHJvcGVydHkge0Jvb2xlYW59IGJ1bmRsZWNvbG9yc1xuICogIFdoZXRoZXIgcGF0aHMgc2hvdWxkIGJlIHNvcnRlZCBzbyB0aGF0IGxpa2UgY29sb3JzIGFyZSBidW5kbGVkIHRvZ2V0aGVyIGFzIHRoZXkgcGFzcyB0aHJvdWdoIGNhdGVnb3JpZXNcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBzb3J0cGF0aHNcbiAqICBJZiAnZm9yd2FyZCcgdGhlbiBzb3J0IHBhdGhzIGJhc2VkIG9uIGRpbWVuc2lvbnMgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBJZiAnYmFja3dhcmQnIHNvcnQgYmFzZWQgb24gZGltZW5zaW9uc1xuICogIGZyb20gcmlnaHQgdG8gbGVmdFxuICogQHByb3BlcnR5IHtGb250fSBsYWJlbGZvbnRcbiAqICBGb250IGZvciB0aGUgZGltZW5zaW9uIGxhYmVsc1xuICogQHByb3BlcnR5IHtGb250fSBjYXRlZ29yeWxhYmVsZm9udFxuICogIEZvbnQgZm9yIHRoZSBjYXRlZ29yeSBsYWJlbHNcbiAqIEBwcm9wZXJ0eSB7U3RyaW5nfSBwYXRoU2hhcGVcbiAqICBUaGUgc2hhcGUgb2YgdGhlIHBhdGhzLiBFaXRoZXIgJ2xpbmVhcicgb3IgJ2hzcGxpbmUnLlxuICogQHByb3BlcnR5IHtEaW1lbnNpb25WaWV3TW9kZWx8bnVsbH0gZHJhZ0RpbWVuc2lvblxuICogIERpbWVuc2lvbiBjdXJyZW50bHkgYmVpbmcgZHJhZ2dlZC4gTnVsbCBpZiBubyBkcmFnIGluIHByb2dyZXNzXG4gKiBAcHJvcGVydHkge01hcmdpbn0gbWFyZ2luXG4gKiAgTWFyZ2luIGFyb3VuZCB0aGUgRmlndXJlXG4gKiBAcHJvcGVydHkge09iamVjdH0gZ3JhcGhEaXZcbiAqICBUb3AtbGV2ZWwgZ3JhcGggZGl2IGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSB0cmFjZVNlbGVjdGlvblxuICogIEQzIHNlbGVjdGlvbiBvZiB0aGlzIHZpZXcgbW9kZWxzIHRyYWNlIGdyb3VwIGVsZW1lbnRcbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBwYXRoU2VsZWN0aW9uXG4gKiAgRDMgc2VsZWN0aW9uIG9mIHRoaXMgdmlldyBtb2RlbHMgcGF0aCBlbGVtZW50c1xuICogQHByb3BlcnR5IHtPYmplY3R9IGRpbWVuc2lvblNlbGVjdGlvblxuICogIEQzIHNlbGVjdGlvbiBvZiB0aGlzIHZpZXcgbW9kZWxzIGRpbWVuc2lvbiBncm91cCBlbGVtZW50XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7T2JqZWN0fSBEaW1lbnNpb25WaWV3TW9kZWxcbiAqICBPYmplY3QgY29udGFpbmluZyBjYWxjdWxhdGVkIHBhcmNhdHMgZGltZW5zaW9uIHZpZXcgaW5mb3JtYXRpb25cbiAqXG4gKiAgVGhlc2UgYXJlIHF1YW50aXRpZXMgdGhhdCByZXF1aXJlIExheW91dCBpbmZvcm1hdGlvbiB0byBjYWxjdWxhdGVcbiAqIEBwcm9wZXJ0eSBrZXlcbiAqICBVbmlxdWUga2V5IGZvciB0aGlzIG1vZGVsXG4gKiBAcHJvcGVydHkge0RpbWVuc2lvbk1vZGVsfSBtb2RlbFxuICogIFNvdXJjZSBkaW1lbnNpb24gbW9kZWxcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB4XG4gKiAgWCBwb3NpdGlvbiBvZiB0aGUgY2VudGVyIG9mIHRoaXMgZGltZW5zaW9uIHdpdGggcmVzcGVjdCB0byB0aGUgRmlndXJlIChwaXhlbHMpXG4gKiBAcHJvcGVydHkge051bWJlcn0geVxuICogIFkgcG9zaXRpb24gb2YgdGhlIHRvcCBvZiB0aGlzIGRpbWVuc2lvbiB3aXRoIHJlc3BlY3QgdG8gdGhlIEZpZ3VyZSAocGl4ZWxzKVxuICogQHByb3BlcnR5IHtOdW1iZXJ9IHdpZHRoXG4gKiAgV2lkdGggb2YgY2F0ZWdvcmllcyBpbiB0aGlzIGRpbWVuc2lvbiAocGl4ZWxzKVxuICogQHByb3BlcnR5IHtQYXJjYXRzVmlld01vZGVsfSBwYXJjYXRzVmlld01vZGVsXG4gKiAgVGhlIHBhcmVudCB0cmFjZSdzIHZpZXcgbW9kZWxcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPENhdGVnb3J5Vmlld01vZGVsPn0gY2F0ZWdvcmllc1xuICogIERpbWVuc2lvbnMgY2F0ZWdvcnkgdmlldyBtb2RlbHNcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfG51bGx9IGRyYWdDYXRlZ29yeURpc3BsYXlJbmRcbiAqICBEaXNwbGF5IGluZGV4IG9mIGNhdGVnb3J5IGN1cnJlbnRseSBiZWluZyBkcmFnZ2VkLiBudWxsIGlmIG5vIGNhdGVnb3J5IGlzIGJlaW5nIGRyYWdnZWRcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfG51bGx9IGRyYWdEaW1lbnNpb25EaXNwbGF5SW5kXG4gKiAgRGlzcGxheSBpbmRleCBvZiB0aGUgZGltZW5zaW9uIGJlaW5nIGRyYWdnZWQuIG51bGwgaWYgbm8gZGltZW5zaW9uIGlzIGJlaW5nIGRyYWdnZWRcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPE51bWJlcj58bnVsbH0gaW5pdGlhbERyYWdEaW1lbnNpb25EaXNwbGF5SW5kc1xuICogIERpbWVuc2lvbnMgZGlzcGxheSBpbmRleGVzIGF0IHRoZSBiZWdpbm5pbmcgb2YgdGhlIGN1cnJlbnQgZHJhZy4gbnVsbCBpZiBubyBkaW1lbnNpb24gaXMgYmVpbmcgZHJhZ2dlZFxuICogQHByb3BlcnR5IHtBcnJheS48TnVtYmVyPnxudWxsfSBpbml0aWFsRHJhZ0NhdGVnb3J5RGlzcGxheUluZHNcbiAqICBDYXRlZ29yeSBkaXNwbGF5IGluZGV4ZXMgZm9yIHRoZSBhdCB0aGUgYmVnaW5uaW5nIG9mIHRoZSBjdXJyZW50IGRyYWcuIG51bGwgaWYgbm8gY2F0ZWdvcnkgaXMgYmVpbmcgZHJhZ2dlZFxuICogQHByb3BlcnR5IHtIVE1MRWxlbWVudH0gcG90ZW50aWFsQ2xpY2tCYW5kXG4gKiAgQmFuZCB1bmRlciBtb3VzZSB3aGVuIGN1cnJlbnQgZHJhZyBiZWdhbi4gSWYgbm8gZHJhZyBtb3ZlbWVudCB0YWtlcyBwbGFjZSB0aGVuIGEgY2xpY2sgd2lsbCBiZSBlbWl0dGVkIGZvciB0aGlzXG4gKiAgYmFuZC4gTnVsbCBpZiBub3QgZHJhZyBpbiBwcm9ncmVzcy5cbiAqIEBwcm9wZXJ0eSB7Qm9vbGVhbn0gZHJhZ0hhc01vdmVkXG4gKiAgVHJ1ZSBpZiB0aGVyZSBpcyBhbiBhY3RpdmUgZHJhZyBhbmQgdGhlIGRyYWcgaGFzIG1vdmVkLiBJZiBkcmFnIGRvZXNuJ3QgbW92ZSBiZWZvcmUgYmVpbmcgZW5kZWQgdGhlblxuICogIHRoaXMgbWF5IGJlIGludGVycHJldGVkIGFzIGEgY2xpY2suIE51bGwgaWYgbm8gZHJhZyBpbiBwcm9ncmVzc1xuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ2F0ZWdvcnlWaWV3TW9kZWxcbiAqICBPYmplY3QgY29udGFpbmluZyBjYWxjdWxhdGVkIHBhcmNhdHMgY2F0ZWdvcnkgdmlldyBpbmZvcm1hdGlvblxuICpcbiAqICBUaGVzZSBhcmUgcXVhbnRpdGllcyB0aGF0IHJlcXVpcmUgTGF5b3V0IGluZm9ybWF0aW9uIHRvIGNhbGN1bGF0ZVxuICogQHByb3BlcnR5IGtleVxuICogIFVuaXF1ZSBrZXkgZm9yIHRoaXMgbW9kZWxcbiAqIEBwcm9wZXJ0eSB7Q2F0ZWdvcnlNb2RlbH0gbW9kZWxcbiAqICBTb3VyY2UgY2F0ZWdvcnkgbW9kZWxcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxuICogIFdpZHRoIGZvciB0aGlzIGNhdGVnb3J5IChwaXhlbHMpXG4gKiBAcHJvcGVydHkge051bWJlcn0gaGVpZ2h0XG4gKiAgSGVpZ2h0IGZvciB0aGlzIGNhdGVnb3J5IChwaXhlbHMpXG4gKiBAcHJvcGVydHkge051bWJlcn0geVxuICogIFkgcG9zaXRpb24gb2YgdGhpcyBjYXRlb2dyeSB3aXRoIHJlc3BlY3QgdG8gdGhlIEZpZ3VyZSAocGl4ZWxzKVxuICogQHByb3BlcnR5IHtBcnJheS48Q2F0ZWdvcnlCYW5kVmlld01vZGVsPn0gYmFuZHNcbiAqICBBcnJheSBvZiBjb2xvciBiYW5kcyBpbnNpZGUgdGhlIGNhdGVnb3J5XG4gKiBAcHJvcGVydHkge1BhcmNhdHNWaWV3TW9kZWx9IHBhcmNhdHNWaWV3TW9kZWxcbiAqICBUaGUgcGFyZW50IHRyYWNlJ3MgdmlldyBtb2RlbFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gQ2F0ZWdvcnlCYW5kVmlld01vZGVsXG4gKiAgT2JqZWN0IGNvbnRhaW5pbmcgY2FsY3VsYXRlZCBjYXRlZ29yeSBiYW5kIGluZm9ybWF0aW9uLiBBIGNhdGVnb3J5IGJhbmQgaXMgYSByZWdpb24gaW5zaWRlIGEgY2F0ZWdvcnkgY292ZXJpbmdcbiAqICBwYXRocyBvZiBhIHNpbmdsZSBjb2xvclxuICpcbiAqIEBwcm9wZXJ0eSBrZXlcbiAqICBVbmlxdWUga2V5IGZvciB0aGlzIG1vZGVsXG4gKiBAcHJvcGVydHkgY29sb3JcbiAqICBCYW5kIGNvbG9yXG4gKiBAcHJvcGVydHkgcmF3Q29sb3JcbiAqICBSYXcgY29sb3IgdmFsdWUgZm9yIGJhbmRcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSB3aWR0aFxuICogIEJhbmQgd2lkdGhcbiAqIEBwcm9wZXJ0eSB7TnVtYmVyfSBoZWlnaHRcbiAqICBCYW5kIGhlaWdodFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IHlcbiAqICBZIHBvc2l0aW9uIG9mIHRvcCBvZiB0aGUgYmFuZCB3aXRoIHJlc3BlY3QgdG8gdGhlIGNhdGVnb3J5XG4gKiBAcHJvcGVydHkge051bWJlcn0gY291bnRcbiAqICBUaGUgbnVtYmVyIG9mIHNhbXBsZXMgcmVwcmVzZW50ZWQgYnkgdGhlIGJhbmRcbiAqIEBwcm9wZXJ0eSB7Q2F0ZWdvcnlWaWV3TW9kZWx9IGNhdGVnb3J5Vmlld01vZGVsXG4gKiAgVGhlIHBhcmVudCBjYXRlZ29yaWUncyB2aWV3IG1vZGVsXG4gKiBAcHJvcGVydHkge1BhcmNhdHNWaWV3TW9kZWx9IHBhcmNhdHNWaWV3TW9kZWxcbiAqICBUaGUgcGFyZW50IHRyYWNlJ3MgdmlldyBtb2RlbFxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge09iamVjdH0gUGF0aFZpZXdNb2RlbFxuICogIE9iamVjdCBjb250YWluaW5nIGNhbGN1bGF0ZWQgcGFyY2F0cyBwYXRoIHZpZXcgaW5mb3JtYXRpb25cbiAqXG4gKiAgVGhlc2UgYXJlIHF1YW50aXRpZXMgdGhhdCByZXF1aXJlIExheW91dCBpbmZvcm1hdGlvbiB0byBjYWxjdWxhdGVcbiAqIEBwcm9wZXJ0eSBrZXlcbiAqICBVbmlxdWUga2V5IGZvciB0aGlzIG1vZGVsXG4gKiBAcHJvcGVydHkge1BhdGhNb2RlbH0gbW9kZWxcbiAqICBTb3VyY2UgcGF0aCBtb2RlbFxuICogQHByb3BlcnR5IHtOdW1iZXJ9IGhlaWdodFxuICogIEhlaWdodCBvZiB0aGlzIHBhdGggKHBpeGVscylcbiAqIEBwcm9wZXJ0eSB7QXJyYXkuPE51bWJlcj59IGxlZnRYc1xuICogIFRoZSB4IHBvc2l0aW9uIG9mIHRoZSBsZWZ0IGVkZ2Ugb2YgZWFjaCBkaXNwbGF5IGRpbWVuc2lvblxuICogQHByb3BlcnR5IHtBcnJheS48TnVtYmVyPn0gdG9wWXNcbiAqICBUaGUgeSBwb3NpdGlvbiBvZiB0aGUgdG9wIG9mIHRoZSBwYXRoIGZvciBlYWNoIGRpc3BsYXkgZGltZW5zaW9uXG4gKiBAcHJvcGVydHkge0FycmF5LjxOdW1iZXI+fSBkaW1XaWR0aHNcbiAqICBUaGUgd2lkdGggb2YgZWFjaCBkaXNwbGF5IGRpbWVuc2lvblxuICogQHByb3BlcnR5IHtTdHJpbmd9IHN2Z0RcbiAqICBTVkcgcGF0aCBcImRcIiBhdHRyaWJ1dGUgc3RyaW5nXG4gKiBAcHJvcGVydHkge1BhcmNhdHNWaWV3TW9kZWx9IHBhcmNhdHNWaWV3TW9kZWxcbiAqICBUaGUgcGFyZW50IHRyYWNlJ3MgdmlldyBtb2RlbFxuICovXG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cblxudmFyIHBhcmNhdHMgPSByZXF1aXJlKCcuL3BhcmNhdHMnKTtcblxuLyoqXG4gKiBDcmVhdGUgLyB1cGRhdGUgcGFyY2F0IHRyYWNlc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBncmFwaERpdlxuICogQHBhcmFtIHtBcnJheS48UGFyY2F0c01vZGVsPn0gcGFyY2F0c01vZGVsc1xuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHBsb3QoZ3JhcGhEaXYsIHBhcmNhdHNNb2RlbHMsIHRyYW5zaXRpb25PcHRzLCBtYWtlT25Db21wbGV0ZUNhbGxiYWNrKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBncmFwaERpdi5fZnVsbExheW91dDtcbiAgICB2YXIgc3ZnID0gZnVsbExheW91dC5fcGFwZXI7XG4gICAgdmFyIHNpemUgPSBmdWxsTGF5b3V0Ll9zaXplO1xuXG4gICAgcGFyY2F0cyhcbiAgICAgICAgZ3JhcGhEaXYsXG4gICAgICAgIHN2ZyxcbiAgICAgICAgcGFyY2F0c01vZGVscyxcbiAgICAgICAge1xuICAgICAgICAgICAgd2lkdGg6IHNpemUudyxcbiAgICAgICAgICAgIGhlaWdodDogc2l6ZS5oLFxuICAgICAgICAgICAgbWFyZ2luOiB7XG4gICAgICAgICAgICAgICAgdDogc2l6ZS50LFxuICAgICAgICAgICAgICAgIHI6IHNpemUucixcbiAgICAgICAgICAgICAgICBiOiBzaXplLmIsXG4gICAgICAgICAgICAgICAgbDogc2l6ZS5sXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRyYW5zaXRpb25PcHRzLFxuICAgICAgICBtYWtlT25Db21wbGV0ZUNhbGxiYWNrXG4gICAgKTtcbn07XG4iXSwic291cmNlUm9vdCI6IiJ9