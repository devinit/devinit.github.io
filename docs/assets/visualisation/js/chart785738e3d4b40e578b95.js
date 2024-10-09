(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_lib_table_js"],{

/***/ "./node_modules/plotly.js/lib/table.js":
/*!*********************************************!*\
  !*** ./node_modules/plotly.js/lib/table.js ***!
  \*********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



module.exports = __webpack_require__(/*! ../src/traces/table */ "./node_modules/plotly.js/src/traces/table/index.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/table/attributes.js":
/*!***************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/table/attributes.js ***!
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



var annAttrs = __webpack_require__(/*! ../../components/annotations/attributes */ "./node_modules/plotly.js/src/components/annotations/attributes.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;
var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;

var FORMAT_LINK = __webpack_require__(/*! ../../constants/docs */ "./node_modules/plotly.js/src/constants/docs.js").FORMAT_LINK;

var attrs = module.exports = overrideAll({
    domain: domainAttrs({name: 'table', trace: true}),

    columnwidth: {
        valType: 'number',
        arrayOk: true,
        dflt: null,
        role: 'style',
        description: [
            'The width of columns expressed as a ratio. Columns fill the available width',
            'in proportion of their specified column widths.'
        ].join(' ')
    },

    columnorder: {
        valType: 'data_array',
        role: 'info',
        description: [
            'Specifies the rendered order of the data columns; for example, a value `2` at position `0`',
            'means that column index `0` in the data will be rendered as the',
            'third column, as columns have an index base of zero.'
        ].join(' ')
    },

    header: {

        values: {
            valType: 'data_array',
            role: 'info',
            dflt: [],
            description: [
                'Header cell values. `values[m][n]` represents the value of the `n`th point in column `m`,',
                'therefore the `values[m]` vector length for all columns must be the same (longer vectors',
                'will be truncated). Each value must be a finite number or a string.'
            ].join(' ')
        },

        format: {
            valType: 'data_array',
            role: 'info',
            dflt: [],
            description: [
                'Sets the cell value formatting rule using d3 formatting mini-language',
                'which is similar to those of Python. See',
                FORMAT_LINK
            ].join(' ')
        },

        prefix: {
            valType: 'string',
            arrayOk: true,
            dflt: null,
            role: 'style',
            description: 'Prefix for cell values.'
        },

        suffix: {
            valType: 'string',
            arrayOk: true,
            dflt: null,
            role: 'style',
            description: 'Suffix for cell values.'
        },

        height: {
            valType: 'number',
            dflt: 28,
            role: 'style',
            description: 'The height of cells.'
        },

        align: extendFlat({}, annAttrs.align, {arrayOk: true}),

        line: {
            width: {
                valType: 'number',
                arrayOk: true,
                dflt: 1,
                role: 'style'
            },
            color: {
                valType: 'color',
                arrayOk: true,
                dflt: 'grey',
                role: 'style'
            }
        },

        fill: {
            color: {
                valType: 'color',
                arrayOk: true,
                dflt: 'white',
                role: 'style',
                description: [
                    'Sets the cell fill color. It accepts either a specific color',
                    ' or an array of colors or a 2D array of colors.'
                ].join('')
            }
        },

        font: extendFlat({}, fontAttrs({arrayOk: true}))
    },

    cells: {

        values: {
            valType: 'data_array',
            role: 'info',
            dflt: [],
            description: [
                'Cell values. `values[m][n]` represents the value of the `n`th point in column `m`,',
                'therefore the `values[m]` vector length for all columns must be the same (longer vectors',
                'will be truncated). Each value must be a finite number or a string.'
            ].join(' ')
        },

        format: {
            valType: 'data_array',
            role: 'info',
            dflt: [],
            description: [
                'Sets the cell value formatting rule using d3 formatting mini-language',
                'which is similar to those of Python. See',
                FORMAT_LINK
            ].join(' ')
        },

        prefix: {
            valType: 'string',
            arrayOk: true,
            dflt: null,
            role: 'style',
            description: 'Prefix for cell values.'
        },

        suffix: {
            valType: 'string',
            arrayOk: true,
            dflt: null,
            role: 'style',
            description: 'Suffix for cell values.'
        },

        height: {
            valType: 'number',
            dflt: 20,
            role: 'style',
            description: 'The height of cells.'
        },

        align: extendFlat({}, annAttrs.align, {arrayOk: true}),

        line: {
            width: {
                valType: 'number',
                arrayOk: true,
                dflt: 1,
                role: 'style'
            },
            color: {
                valType: 'color',
                arrayOk: true,
                dflt: 'grey',
                role: 'style'
            }
        },

        fill: {
            color: {
                valType: 'color',
                arrayOk: true,
                role: 'style',
                dflt: 'white',
                description: [
                    'Sets the cell fill color. It accepts either a specific color',
                    ' or an array of colors or a 2D array of colors.'
                ].join('')
            }
        },

        font: extendFlat({}, fontAttrs({arrayOk: true}))
    }
}, 'calc', 'from-root');
attrs.transforms = undefined;


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/table/base_plot.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/table/base_plot.js ***!
  \**************************************************************/
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
var tablePlot = __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/table/plot.js");

var TABLE = 'table';

exports.name = TABLE;

exports.plot = function(gd) {
    var calcData = getModuleCalcData(gd.calcdata, TABLE)[0];
    if(calcData.length) tablePlot(gd, calcData);
};

exports.clean = function(newFullData, newFullLayout, oldFullData, oldFullLayout) {
    var hadTable = (oldFullLayout._has && oldFullLayout._has(TABLE));
    var hasTable = (newFullLayout._has && newFullLayout._has(TABLE));

    if(hadTable && !hasTable) {
        oldFullLayout._paperdiv.selectAll('.table').remove();
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/table/calc.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/table/calc.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var wrap = __webpack_require__(/*! ../../lib/gup */ "./node_modules/plotly.js/src/lib/gup.js").wrap;

module.exports = function calc() {
    // we don't actually need to include the trace here, since that will be added
    // by Plots.doCalcdata, and that's all we actually need later.
    return wrap({});
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/table/constants.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/table/constants.js ***!
  \**************************************************************/
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
    cellPad: 8,
    columnExtentOffset: 10,
    columnTitleOffset: 28,
    emptyHeaderHeight: 16,
    latexCheck: /^\$.*\$$/,
    goldenRatio: 1.618,
    lineBreaker: '<br>',
    maxDimensionCount: 60,
    overdrag: 45,
    releaseTransitionDuration: 120,
    releaseTransitionEase: 'cubic-out',
    scrollbarCaptureWidth: 18,
    scrollbarHideDelay: 1000,
    scrollbarHideDuration: 1000,
    scrollbarOffset: 5,
    scrollbarWidth: 8,
    transitionDuration: 100,
    transitionEase: 'cubic-out',
    uplift: 5,
    wrapSpacer: ' ',
    wrapSplitCharacter: ' ',
    cn: {
        // general class names
        table: 'table',
        tableControlView: 'table-control-view',
        scrollBackground: 'scroll-background',
        yColumn: 'y-column',
        columnBlock: 'column-block',
        scrollAreaClip: 'scroll-area-clip',
        scrollAreaClipRect: 'scroll-area-clip-rect',
        columnBoundary: 'column-boundary',
        columnBoundaryClippath: 'column-boundary-clippath',
        columnBoundaryRect: 'column-boundary-rect',
        columnCells: 'column-cells',
        columnCell: 'column-cell',
        cellRect: 'cell-rect',
        cellText: 'cell-text',
        cellTextHolder: 'cell-text-holder',

        // scroll related class names
        scrollbarKit: 'scrollbar-kit',
        scrollbar: 'scrollbar',
        scrollbarSlider: 'scrollbar-slider',
        scrollbarGlyph: 'scrollbar-glyph',
        scrollbarCaptureZone: 'scrollbar-capture-zone'
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/table/data_preparation_helper.js":
/*!****************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/table/data_preparation_helper.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var c = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/table/constants.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");

// pure functions, don't alter but passes on `gd` and parts of `trace` without deep copying
module.exports = function calc(gd, trace) {
    var cellsValues = squareStringMatrix(trace.cells.values);
    var slicer = function(a) {
        return a.slice(trace.header.values.length, a.length);
    };
    var headerValuesIn = squareStringMatrix(trace.header.values);
    if(headerValuesIn.length && !headerValuesIn[0].length) {
        headerValuesIn[0] = [''];
        headerValuesIn = squareStringMatrix(headerValuesIn);
    }
    var headerValues = headerValuesIn
        .concat(slicer(cellsValues).map(function() {
            return emptyStrings((headerValuesIn[0] || ['']).length);
        }));

    var domain = trace.domain;
    var groupWidth = Math.floor(gd._fullLayout._size.w * (domain.x[1] - domain.x[0]));
    var groupHeight = Math.floor(gd._fullLayout._size.h * (domain.y[1] - domain.y[0]));
    var headerRowHeights = trace.header.values.length ?
        headerValues[0].map(function() { return trace.header.height; }) :
        [c.emptyHeaderHeight];
    var rowHeights = cellsValues.length ? cellsValues[0].map(function() { return trace.cells.height; }) : [];
    var headerHeight = headerRowHeights.reduce(sum, 0);
    var scrollHeight = groupHeight - headerHeight;
    var minimumFillHeight = scrollHeight + c.uplift;
    var anchorToRowBlock = makeAnchorToRowBlock(rowHeights, minimumFillHeight);
    var anchorToHeaderRowBlock = makeAnchorToRowBlock(headerRowHeights, headerHeight);
    var headerRowBlocks = makeRowBlock(anchorToHeaderRowBlock, []);
    var rowBlocks = makeRowBlock(anchorToRowBlock, headerRowBlocks);
    var uniqueKeys = {};
    var columnOrder = trace._fullInput.columnorder.concat(slicer(cellsValues.map(function(d, i) {return i;})));
    var columnWidths = headerValues.map(function(d, i) {
        var value = Array.isArray(trace.columnwidth) ?
            trace.columnwidth[Math.min(i, trace.columnwidth.length - 1)] :
            trace.columnwidth;
        return isNumeric(value) ? Number(value) : 1;
    });
    var totalColumnWidths = columnWidths.reduce(sum, 0);

    // fit columns in the available vertical space as there's no vertical scrolling now
    columnWidths = columnWidths.map(function(d) { return d / totalColumnWidths * groupWidth; });

    var maxLineWidth = Math.max(arrayMax(trace.header.line.width), arrayMax(trace.cells.line.width));

    var calcdata = {
        // include staticPlot in the key so if it changes we delete and redraw
        key: trace.uid + gd._context.staticPlot,
        translateX: domain.x[0] * gd._fullLayout._size.w,
        translateY: gd._fullLayout._size.h * (1 - domain.y[1]),
        size: gd._fullLayout._size,
        width: groupWidth,
        maxLineWidth: maxLineWidth,
        height: groupHeight,
        columnOrder: columnOrder, // will be mutated on column move, todo use in callback
        groupHeight: groupHeight,
        rowBlocks: rowBlocks,
        headerRowBlocks: headerRowBlocks,
        scrollY: 0, // will be mutated on scroll
        cells: extendFlat({}, trace.cells, {values: cellsValues}),
        headerCells: extendFlat({}, trace.header, {values: headerValues}),
        gdColumns: headerValues.map(function(d) {return d[0];}),
        gdColumnsOriginalOrder: headerValues.map(function(d) {return d[0];}),
        prevPages: [0, 0],
        scrollbarState: {scrollbarScrollInProgress: false},
        columns: headerValues.map(function(label, i) {
            var foundKey = uniqueKeys[label];
            uniqueKeys[label] = (foundKey || 0) + 1;
            var key = label + '__' + uniqueKeys[label];
            return {
                key: key,
                label: label,
                specIndex: i,
                xIndex: columnOrder[i],
                xScale: xScale,
                x: undefined, // initialized below
                calcdata: undefined, // initialized below
                columnWidth: columnWidths[i]
            };
        })
    };

    calcdata.columns.forEach(function(col) {
        col.calcdata = calcdata;
        col.x = xScale(col);
    });

    return calcdata;
};

function arrayMax(maybeArray) {
    if(Array.isArray(maybeArray)) {
        var max = 0;
        for(var i = 0; i < maybeArray.length; i++) {
            max = Math.max(max, arrayMax(maybeArray[i]));
        }
        return max;
    }
    return maybeArray;
}

function sum(a, b) { return a + b; }

// fill matrix in place to equal lengths
// and ensure it's uniformly 2D
function squareStringMatrix(matrixIn) {
    var matrix = matrixIn.slice();
    var minLen = Infinity;
    var maxLen = 0;
    var i;
    for(i = 0; i < matrix.length; i++) {
        if(!Array.isArray(matrix[i])) matrix[i] = [matrix[i]];
        minLen = Math.min(minLen, matrix[i].length);
        maxLen = Math.max(maxLen, matrix[i].length);
    }

    if(minLen !== maxLen) {
        for(i = 0; i < matrix.length; i++) {
            var padLen = maxLen - matrix[i].length;
            if(padLen) matrix[i] = matrix[i].concat(emptyStrings(padLen));
        }
    }
    return matrix;
}

function emptyStrings(len) {
    var padArray = new Array(len);
    for(var j = 0; j < len; j++) padArray[j] = '';
    return padArray;
}

function xScale(d) {
    return d.calcdata.columns.reduce(function(prev, next) {
        return next.xIndex < d.xIndex ? prev + next.columnWidth : prev;
    }, 0);
}

function makeRowBlock(anchorToRowBlock, auxiliary) {
    var blockAnchorKeys = Object.keys(anchorToRowBlock);
    return blockAnchorKeys.map(function(k) {return extendFlat({}, anchorToRowBlock[k], {auxiliaryBlocks: auxiliary});});
}

function makeAnchorToRowBlock(rowHeights, minimumFillHeight) {
    var anchorToRowBlock = {};
    var currentRowHeight;
    var currentAnchor = 0;
    var currentBlockHeight = 0;
    var currentBlock = makeIdentity();
    var currentFirstRowIndex = 0;
    var blockCounter = 0;
    for(var i = 0; i < rowHeights.length; i++) {
        currentRowHeight = rowHeights[i];
        currentBlock.rows.push({
            rowIndex: i,
            rowHeight: currentRowHeight
        });
        currentBlockHeight += currentRowHeight;
        if(currentBlockHeight >= minimumFillHeight || i === rowHeights.length - 1) {
            anchorToRowBlock[currentAnchor] = currentBlock;
            currentBlock.key = blockCounter++;
            currentBlock.firstRowIndex = currentFirstRowIndex;
            currentBlock.lastRowIndex = i;
            currentBlock = makeIdentity();
            currentAnchor += currentBlockHeight;
            currentFirstRowIndex = i + 1;
            currentBlockHeight = 0;
        }
    }

    return anchorToRowBlock;
}

function makeIdentity() {
    return {
        firstRowIndex: null,
        lastRowIndex: null,
        rows: []
    };
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/table/data_split_helpers.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/table/data_split_helpers.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

// pure functions, don't alter but passes on `gd` and parts of `trace` without deep copying

exports.splitToPanels = function(d) {
    var prevPages = [0, 0];
    var headerPanel = extendFlat({}, d, {
        key: 'header',
        type: 'header',
        page: 0,
        prevPages: prevPages,
        currentRepaint: [null, null],
        dragHandle: true,
        values: d.calcdata.headerCells.values[d.specIndex],
        rowBlocks: d.calcdata.headerRowBlocks,
        calcdata: extendFlat({}, d.calcdata, {cells: d.calcdata.headerCells})
    });
    var revolverPanel1 = extendFlat({}, d, {
        key: 'cells1',
        type: 'cells',
        page: 0,
        prevPages: prevPages,
        currentRepaint: [null, null],
        dragHandle: false,
        values: d.calcdata.cells.values[d.specIndex],
        rowBlocks: d.calcdata.rowBlocks
    });
    var revolverPanel2 = extendFlat({}, d, {
        key: 'cells2',
        type: 'cells',
        page: 1,
        prevPages: prevPages,
        currentRepaint: [null, null],
        dragHandle: false,
        values: d.calcdata.cells.values[d.specIndex],
        rowBlocks: d.calcdata.rowBlocks
    });
    // order due to SVG using painter's algo:
    return [revolverPanel1, revolverPanel2, headerPanel];
};

exports.splitToCells = function(d) {
    var fromTo = rowFromTo(d);
    return (d.values || []).slice(fromTo[0], fromTo[1]).map(function(v, i) {
        // By keeping identical key, a DOM node removal, creation and addition is spared, important when visible
        // grid has a lot of elements (quadratic with xcol/ycol count).
        // But it has to be busted when `svgUtil.convertToTspans` is used as it reshapes cell subtrees asynchronously,
        // and by that time the user may have scrolled away, resulting in stale overwrites. The real solution will be
        // to turn `svgUtil.convertToTspans` into a cancelable request, in which case no key busting is needed.
        var buster = (typeof v === 'string') && v.match(/[<$&> ]/) ? '_keybuster_' + Math.random() : '';
        return {
            // keyWithinBlock: /*fromTo[0] + */i, // optimized future version - no busting
            // keyWithinBlock: fromTo[0] + i, // initial always-unoptimized version - janky scrolling with 5+ columns
            keyWithinBlock: i + buster, // current compromise: regular content is very fast; async content is possible
            key: fromTo[0] + i,
            column: d,
            calcdata: d.calcdata,
            page: d.page,
            rowBlocks: d.rowBlocks,
            value: v
        };
    });
};

function rowFromTo(d) {
    var rowBlock = d.rowBlocks[d.page];
    // fixme rowBlock truthiness check is due to ugly hack of placing 2nd panel as d.page = -1
    var rowFrom = rowBlock ? rowBlock.rows[0].rowIndex : 0;
    var rowTo = rowBlock ? rowFrom + rowBlock.rows.length : 0;
    return [rowFrom, rowTo];
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/table/defaults.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/table/defaults.js ***!
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



var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var attributes = __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/table/attributes.js");
var handleDomainDefaults = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").defaults;

function defaultColumnOrder(traceOut, coerce) {
    var specifiedColumnOrder = traceOut.columnorder || [];
    var commonLength = traceOut.header.values.length;
    var truncated = specifiedColumnOrder.slice(0, commonLength);
    var sorted = truncated.slice().sort(function(a, b) {return a - b;});
    var oneStepped = truncated.map(function(d) {return sorted.indexOf(d);});
    for(var i = oneStepped.length; i < commonLength; i++) {
        oneStepped.push(i);
    }
    coerce('columnorder', oneStepped);
}

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    handleDomainDefaults(traceOut, layout, coerce);

    coerce('columnwidth');

    coerce('header.values');
    coerce('header.format');
    coerce('header.align');

    coerce('header.prefix');
    coerce('header.suffix');
    coerce('header.height');
    coerce('header.line.width');
    coerce('header.line.color');
    coerce('header.fill.color');
    Lib.coerceFont(coerce, 'header.font', Lib.extendFlat({}, layout.font));

    defaultColumnOrder(traceOut, coerce);

    coerce('cells.values');
    coerce('cells.format');
    coerce('cells.align');
    coerce('cells.prefix');
    coerce('cells.suffix');
    coerce('cells.height');
    coerce('cells.line.width');
    coerce('cells.line.color');
    coerce('cells.fill.color');
    Lib.coerceFont(coerce, 'cells.font', Lib.extendFlat({}, layout.font));

    // disable 1D transforms
    traceOut._length = null;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/table/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/table/index.js ***!
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



module.exports = {
    attributes: __webpack_require__(/*! ./attributes */ "./node_modules/plotly.js/src/traces/table/attributes.js"),
    supplyDefaults: __webpack_require__(/*! ./defaults */ "./node_modules/plotly.js/src/traces/table/defaults.js"),
    calc: __webpack_require__(/*! ./calc */ "./node_modules/plotly.js/src/traces/table/calc.js"),
    plot: __webpack_require__(/*! ./plot */ "./node_modules/plotly.js/src/traces/table/plot.js"),

    moduleType: 'trace',
    name: 'table',
    basePlotModule: __webpack_require__(/*! ./base_plot */ "./node_modules/plotly.js/src/traces/table/base_plot.js"),
    categories: ['noOpacity'],
    meta: {
        description: [
            'Table view for detailed data viewing.',
            'The data are arranged in a grid of rows and columns.',
            'Most styling can be specified for columns, rows or individual cells.',
            'Table is using a column-major order, ie. the grid is represented as a vector of column vectors.'
        ].join(' ')
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/table/plot.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/table/plot.js ***!
  \*********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var c = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/table/constants.js");
var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var gup = __webpack_require__(/*! ../../lib/gup */ "./node_modules/plotly.js/src/lib/gup.js");
var Drawing = __webpack_require__(/*! ../../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var svgUtil = __webpack_require__(/*! ../../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var raiseToTop = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").raiseToTop;
var cancelEeaseColumn = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js").cancelTransition;
var prepareData = __webpack_require__(/*! ./data_preparation_helper */ "./node_modules/plotly.js/src/traces/table/data_preparation_helper.js");
var splitData = __webpack_require__(/*! ./data_split_helpers */ "./node_modules/plotly.js/src/traces/table/data_split_helpers.js");
var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

module.exports = function plot(gd, wrappedTraceHolders) {
    var dynamic = !gd._context.staticPlot;

    var table = gd._fullLayout._paper.selectAll('.' + c.cn.table)
        .data(wrappedTraceHolders.map(function(wrappedTraceHolder) {
            var traceHolder = gup.unwrap(wrappedTraceHolder);
            var trace = traceHolder.trace;
            return prepareData(gd, trace);
        }), gup.keyFun);

    table.exit().remove();

    table.enter()
        .append('g')
        .classed(c.cn.table, true)
        .attr('overflow', 'visible')
        .style('box-sizing', 'content-box')
        .style('position', 'absolute')
        .style('left', 0)
        .style('overflow', 'visible')
        .style('shape-rendering', 'crispEdges')
        .style('pointer-events', 'all');

    table
        .attr('width', function(d) {return d.width + d.size.l + d.size.r;})
        .attr('height', function(d) {return d.height + d.size.t + d.size.b;})
        .attr('transform', function(d) {
            return 'translate(' + d.translateX + ',' + d.translateY + ')';
        });

    var tableControlView = table.selectAll('.' + c.cn.tableControlView)
        .data(gup.repeat, gup.keyFun);

    var cvEnter = tableControlView.enter()
        .append('g')
        .classed(c.cn.tableControlView, true)
        .style('box-sizing', 'content-box');
    if(dynamic) {
        cvEnter
            .on('mousemove', function(d) {
                tableControlView
                    .filter(function(dd) {return d === dd;})
                    .call(renderScrollbarKit, gd);
            })
            .on('mousewheel', function(d) {
                if(d.scrollbarState.wheeling) return;
                d.scrollbarState.wheeling = true;
                var newY = d.scrollY + d3.event.deltaY;
                var noChange = makeDragRow(gd, tableControlView, null, newY)(d);
                if(!noChange) {
                    d3.event.stopPropagation();
                    d3.event.preventDefault();
                }
                d.scrollbarState.wheeling = false;
            })
            .call(renderScrollbarKit, gd, true);
    }

    tableControlView
        .attr('transform', function(d) {return 'translate(' + d.size.l + ' ' + d.size.t + ')';});

    // scrollBackground merely ensures that mouse events are captured even on crazy fast scrollwheeling
    // otherwise rendering glitches may occur
    var scrollBackground = tableControlView.selectAll('.' + c.cn.scrollBackground)
        .data(gup.repeat, gup.keyFun);

    scrollBackground.enter()
        .append('rect')
        .classed(c.cn.scrollBackground, true)
        .attr('fill', 'none');

    scrollBackground
        .attr('width', function(d) {return d.width;})
        .attr('height', function(d) {return d.height;});

    tableControlView.each(function(d) {
        Drawing.setClipUrl(d3.select(this), scrollAreaBottomClipKey(gd, d), gd);
    });

    var yColumn = tableControlView.selectAll('.' + c.cn.yColumn)
        .data(function(vm) {return vm.columns;}, gup.keyFun);

    yColumn.enter()
        .append('g')
        .classed(c.cn.yColumn, true);

    yColumn.exit().remove();

    yColumn.attr('transform', function(d) {return 'translate(' + d.x + ' 0)';});

    if(dynamic) {
        yColumn.call(d3.behavior.drag()
            .origin(function(d) {
                var movedColumn = d3.select(this);
                easeColumn(movedColumn, d, -c.uplift);
                raiseToTop(this);
                d.calcdata.columnDragInProgress = true;
                renderScrollbarKit(tableControlView.filter(function(dd) {return d.calcdata.key === dd.key;}), gd);
                return d;
            })
            .on('drag', function(d) {
                var movedColumn = d3.select(this);
                var getter = function(dd) {return (d === dd ? d3.event.x : dd.x) + dd.columnWidth / 2;};
                d.x = Math.max(-c.overdrag, Math.min(d.calcdata.width + c.overdrag - d.columnWidth, d3.event.x));

                var sortableColumns = flatData(yColumn).filter(function(dd) {return dd.calcdata.key === d.calcdata.key;});
                var newOrder = sortableColumns.sort(function(a, b) {return getter(a) - getter(b);});
                newOrder.forEach(function(dd, i) {
                    dd.xIndex = i;
                    dd.x = d === dd ? dd.x : dd.xScale(dd);
                });

                yColumn.filter(function(dd) {return d !== dd;})
                    .transition()
                    .ease(c.transitionEase)
                    .duration(c.transitionDuration)
                    .attr('transform', function(d) {return 'translate(' + d.x + ' 0)';});
                movedColumn
                    .call(cancelEeaseColumn)
                    .attr('transform', 'translate(' + d.x + ' -' + c.uplift + ' )');
            })
            .on('dragend', function(d) {
                var movedColumn = d3.select(this);
                var p = d.calcdata;
                d.x = d.xScale(d);
                d.calcdata.columnDragInProgress = false;
                easeColumn(movedColumn, d, 0);
                columnMoved(gd, p, p.columns.map(function(dd) {return dd.xIndex;}));
            })
        );
    }

    yColumn.each(function(d) {
        Drawing.setClipUrl(d3.select(this), columnBoundaryClipKey(gd, d), gd);
    });

    var columnBlock = yColumn.selectAll('.' + c.cn.columnBlock)
        .data(splitData.splitToPanels, gup.keyFun);

    columnBlock.enter()
        .append('g')
        .classed(c.cn.columnBlock, true)
        .attr('id', function(d) {return d.key;});

    columnBlock
        .style('cursor', function(d) {
            return d.dragHandle ? 'ew-resize' : d.calcdata.scrollbarState.barWiggleRoom ? 'ns-resize' : 'default';
        });

    var headerColumnBlock = columnBlock.filter(headerBlock);
    var cellsColumnBlock = columnBlock.filter(cellsBlock);

    if(dynamic) {
        cellsColumnBlock.call(d3.behavior.drag()
            .origin(function(d) {
                d3.event.stopPropagation();
                return d;
            })
            .on('drag', makeDragRow(gd, tableControlView, -1))
            .on('dragend', function() {
                // fixme emit plotly notification
            })
        );
    }

    // initial rendering: header is rendered first, as it may may have async LaTeX (show header first)
    // but blocks are _entered_ the way they are due to painter's algo (header on top)
    renderColumnCellTree(gd, tableControlView, headerColumnBlock, columnBlock);
    renderColumnCellTree(gd, tableControlView, cellsColumnBlock, columnBlock);

    var scrollAreaClip = tableControlView.selectAll('.' + c.cn.scrollAreaClip)
        .data(gup.repeat, gup.keyFun);

    scrollAreaClip.enter()
        .append('clipPath')
        .classed(c.cn.scrollAreaClip, true)
        .attr('id', function(d) {return scrollAreaBottomClipKey(gd, d);});

    var scrollAreaClipRect = scrollAreaClip.selectAll('.' + c.cn.scrollAreaClipRect)
        .data(gup.repeat, gup.keyFun);

    scrollAreaClipRect.enter()
        .append('rect')
        .classed(c.cn.scrollAreaClipRect, true)
        .attr('x', -c.overdrag)
        .attr('y', -c.uplift)
        .attr('fill', 'none');

    scrollAreaClipRect
        .attr('width', function(d) {return d.width + 2 * c.overdrag;})
        .attr('height', function(d) {return d.height + c.uplift;});

    var columnBoundary = yColumn.selectAll('.' + c.cn.columnBoundary)
        .data(gup.repeat, gup.keyFun);

    columnBoundary.enter()
        .append('g')
        .classed(c.cn.columnBoundary, true);

    var columnBoundaryClippath = yColumn.selectAll('.' + c.cn.columnBoundaryClippath)
        .data(gup.repeat, gup.keyFun);

    // SVG spec doesn't mandate wrapping into a <defs> and doesn't seem to cause a speed difference
    columnBoundaryClippath.enter()
        .append('clipPath')
        .classed(c.cn.columnBoundaryClippath, true);

    columnBoundaryClippath
        .attr('id', function(d) {return columnBoundaryClipKey(gd, d);});

    var columnBoundaryRect = columnBoundaryClippath.selectAll('.' + c.cn.columnBoundaryRect)
        .data(gup.repeat, gup.keyFun);

    columnBoundaryRect.enter()
        .append('rect')
        .classed(c.cn.columnBoundaryRect, true)
        .attr('fill', 'none');

    columnBoundaryRect
        .attr('width', function(d) { return d.columnWidth + 2 * roundHalfWidth(d); })
        .attr('height', function(d) {return d.calcdata.height + 2 * roundHalfWidth(d) + c.uplift;})
        .attr('x', function(d) { return -roundHalfWidth(d); })
        .attr('y', function(d) { return -roundHalfWidth(d); });

    updateBlockYPosition(null, cellsColumnBlock, tableControlView);
};

function roundHalfWidth(d) {
    return Math.ceil(d.calcdata.maxLineWidth / 2);
}

function scrollAreaBottomClipKey(gd, d) {
    return 'clip' + gd._fullLayout._uid + '_scrollAreaBottomClip_' + d.key;
}

function columnBoundaryClipKey(gd, d) {
    return 'clip' + gd._fullLayout._uid + '_columnBoundaryClippath_' + d.calcdata.key + '_' + d.specIndex;
}

function flatData(selection) {
    return [].concat.apply([], selection.map(function(g) {return g;}))
        .map(function(g) {return g.__data__;});
}

function renderScrollbarKit(tableControlView, gd, bypassVisibleBar) {
    function calcTotalHeight(d) {
        var blocks = d.rowBlocks;
        return firstRowAnchor(blocks, blocks.length - 1) + (blocks.length ? rowsHeight(blocks[blocks.length - 1], Infinity) : 1);
    }

    var scrollbarKit = tableControlView.selectAll('.' + c.cn.scrollbarKit)
        .data(gup.repeat, gup.keyFun);

    scrollbarKit.enter()
        .append('g')
        .classed(c.cn.scrollbarKit, true)
        .style('shape-rendering', 'geometricPrecision');

    scrollbarKit
        .each(function(d) {
            var s = d.scrollbarState;
            s.totalHeight = calcTotalHeight(d);
            s.scrollableAreaHeight = d.groupHeight - headerHeight(d);
            s.currentlyVisibleHeight = Math.min(s.totalHeight, s.scrollableAreaHeight);
            s.ratio = s.currentlyVisibleHeight / s.totalHeight;
            s.barLength = Math.max(s.ratio * s.currentlyVisibleHeight, c.goldenRatio * c.scrollbarWidth);
            s.barWiggleRoom = s.currentlyVisibleHeight - s.barLength;
            s.wiggleRoom = Math.max(0, s.totalHeight - s.scrollableAreaHeight);
            s.topY = s.barWiggleRoom === 0 ? 0 : (d.scrollY / s.wiggleRoom) * s.barWiggleRoom;
            s.bottomY = s.topY + s.barLength;
            s.dragMultiplier = s.wiggleRoom / s.barWiggleRoom;
        })
        .attr('transform', function(d) {
            var xPosition = d.width + c.scrollbarWidth / 2 + c.scrollbarOffset;
            return 'translate(' + xPosition + ' ' + headerHeight(d) + ')';
        });

    var scrollbar = scrollbarKit.selectAll('.' + c.cn.scrollbar)
        .data(gup.repeat, gup.keyFun);

    scrollbar.enter()
        .append('g')
        .classed(c.cn.scrollbar, true);

    var scrollbarSlider = scrollbar.selectAll('.' + c.cn.scrollbarSlider)
        .data(gup.repeat, gup.keyFun);

    scrollbarSlider.enter()
        .append('g')
        .classed(c.cn.scrollbarSlider, true);

    scrollbarSlider
        .attr('transform', function(d) {
            return 'translate(0 ' + (d.scrollbarState.topY || 0) + ')';
        });

    var scrollbarGlyph = scrollbarSlider.selectAll('.' + c.cn.scrollbarGlyph)
        .data(gup.repeat, gup.keyFun);

    scrollbarGlyph.enter()
        .append('line')
        .classed(c.cn.scrollbarGlyph, true)
        .attr('stroke', 'black')
        .attr('stroke-width', c.scrollbarWidth)
        .attr('stroke-linecap', 'round')
        .attr('y1', c.scrollbarWidth / 2);

    scrollbarGlyph
        .attr('y2', function(d) {
            return d.scrollbarState.barLength - c.scrollbarWidth / 2;
        })
        .attr('stroke-opacity', function(d) {
            return d.columnDragInProgress || !d.scrollbarState.barWiggleRoom || bypassVisibleBar ? 0 : 0.4;
        });

    // cancel transition: possible pending (also, delayed) transition
    scrollbarGlyph
        .transition().delay(0).duration(0);

    scrollbarGlyph
        .transition().delay(c.scrollbarHideDelay).duration(c.scrollbarHideDuration)
        .attr('stroke-opacity', 0);

    var scrollbarCaptureZone = scrollbar.selectAll('.' + c.cn.scrollbarCaptureZone)
        .data(gup.repeat, gup.keyFun);

    scrollbarCaptureZone.enter()
        .append('line')
        .classed(c.cn.scrollbarCaptureZone, true)
        .attr('stroke', 'white')
        .attr('stroke-opacity', 0.01) // some browser might get rid of a 0 opacity element
        .attr('stroke-width', c.scrollbarCaptureWidth)
        .attr('stroke-linecap', 'butt')
        .attr('y1', 0)
        .on('mousedown', function(d) {
            var y = d3.event.y;
            var bbox = this.getBoundingClientRect();
            var s = d.scrollbarState;
            var pixelVal = y - bbox.top;
            var inverseScale = d3.scale.linear().domain([0, s.scrollableAreaHeight]).range([0, s.totalHeight]).clamp(true);
            if(!(s.topY <= pixelVal && pixelVal <= s.bottomY)) {
                makeDragRow(gd, tableControlView, null, inverseScale(pixelVal - s.barLength / 2))(d);
            }
        })
        .call(d3.behavior.drag()
            .origin(function(d) {
                d3.event.stopPropagation();
                d.scrollbarState.scrollbarScrollInProgress = true;
                return d;
            })
            .on('drag', makeDragRow(gd, tableControlView))
            .on('dragend', function() {
                // fixme emit Plotly event
            })
        );

    scrollbarCaptureZone
        .attr('y2', function(d) {
            return d.scrollbarState.scrollableAreaHeight;
        });

    // Remove scroll glyph and capture zone on static plots
    // as they don't render properly when converted to PDF
    // in the Chrome PDF viewer
    // https://github.com/plotly/streambed/issues/11618
    if(gd._context.staticPlot) {
        scrollbarGlyph.remove();
        scrollbarCaptureZone.remove();
    }
}

function renderColumnCellTree(gd, tableControlView, columnBlock, allColumnBlock) {
    // fixme this perf hotspot
    // this is performance critical code as scrolling calls it on every revolver switch
    // it appears sufficiently fast but there are plenty of low-hanging fruits for performance optimization

    var columnCells = renderColumnCells(columnBlock);

    var columnCell = renderColumnCell(columnCells);

    supplyStylingValues(columnCell);

    var cellRect = renderCellRect(columnCell);

    sizeAndStyleRect(cellRect);

    var cellTextHolder = renderCellTextHolder(columnCell);

    var cellText = renderCellText(cellTextHolder);

    setFont(cellText);
    populateCellText(cellText, tableControlView, allColumnBlock, gd);

    // doing this at the end when text, and text stlying are set
    setCellHeightAndPositionY(columnCell);
}

function renderColumnCells(columnBlock) {
    var columnCells = columnBlock.selectAll('.' + c.cn.columnCells)
        .data(gup.repeat, gup.keyFun);

    columnCells.enter()
        .append('g')
        .classed(c.cn.columnCells, true);

    columnCells.exit()
        .remove();

    return columnCells;
}

function renderColumnCell(columnCells) {
    var columnCell = columnCells.selectAll('.' + c.cn.columnCell)
        .data(splitData.splitToCells, function(d) {return d.keyWithinBlock;});

    columnCell.enter()
        .append('g')
        .classed(c.cn.columnCell, true);

    columnCell.exit()
        .remove();

    return columnCell;
}

function renderCellRect(columnCell) {
    var cellRect = columnCell.selectAll('.' + c.cn.cellRect)
        .data(gup.repeat, function(d) {return d.keyWithinBlock;});

    cellRect.enter()
        .append('rect')
        .classed(c.cn.cellRect, true);

    return cellRect;
}

function renderCellText(cellTextHolder) {
    var cellText = cellTextHolder.selectAll('.' + c.cn.cellText)
        .data(gup.repeat, function(d) {return d.keyWithinBlock;});

    cellText.enter()
        .append('text')
        .classed(c.cn.cellText, true)
        .style('cursor', function() {return 'auto';})
        .on('mousedown', function() {d3.event.stopPropagation();});

    return cellText;
}

function renderCellTextHolder(columnCell) {
    var cellTextHolder = columnCell.selectAll('.' + c.cn.cellTextHolder)
        .data(gup.repeat, function(d) {return d.keyWithinBlock;});

    cellTextHolder.enter()
        .append('g')
        .classed(c.cn.cellTextHolder, true)
        .style('shape-rendering', 'geometricPrecision');

    return cellTextHolder;
}

function supplyStylingValues(columnCell) {
    columnCell
        .each(function(d, i) {
            var spec = d.calcdata.cells.font;
            var col = d.column.specIndex;
            var font = {
                size: gridPick(spec.size, col, i),
                color: gridPick(spec.color, col, i),
                family: gridPick(spec.family, col, i)
            };
            d.rowNumber = d.key;
            d.align = gridPick(d.calcdata.cells.align, col, i);
            d.cellBorderWidth = gridPick(d.calcdata.cells.line.width, col, i);
            d.font = font;
        });
}

function setFont(cellText) {
    cellText
        .each(function(d) {
            Drawing.font(d3.select(this), d.font);
        });
}

function sizeAndStyleRect(cellRect) {
    cellRect
        .attr('width', function(d) {return d.column.columnWidth;})
        .attr('stroke-width', function(d) {return d.cellBorderWidth;})
        .each(function(d) {
            var atomicSelection = d3.select(this);
            Color.stroke(atomicSelection, gridPick(d.calcdata.cells.line.color, d.column.specIndex, d.rowNumber));
            Color.fill(atomicSelection, gridPick(d.calcdata.cells.fill.color, d.column.specIndex, d.rowNumber));
        });
}

function populateCellText(cellText, tableControlView, allColumnBlock, gd) {
    cellText
        .text(function(d) {
            var col = d.column.specIndex;
            var row = d.rowNumber;

            var userSuppliedContent = d.value;
            var stringSupplied = (typeof userSuppliedContent === 'string');
            var hasBreaks = stringSupplied && userSuppliedContent.match(/<br>/i);
            var userBrokenText = !stringSupplied || hasBreaks;
            d.mayHaveMarkup = stringSupplied && userSuppliedContent.match(/[<&>]/);

            var latex = isLatex(userSuppliedContent);
            d.latex = latex;

            var prefix = latex ? '' : gridPick(d.calcdata.cells.prefix, col, row) || '';
            var suffix = latex ? '' : gridPick(d.calcdata.cells.suffix, col, row) || '';
            var format = latex ? null : gridPick(d.calcdata.cells.format, col, row) || null;

            var prefixSuffixedText = prefix + (format ? d3.format(format)(d.value) : d.value) + suffix;

            var hasWrapSplitCharacter;
            d.wrappingNeeded = !d.wrapped && !userBrokenText && !latex && (hasWrapSplitCharacter = hasWrapCharacter(prefixSuffixedText));
            d.cellHeightMayIncrease = hasBreaks || latex || d.mayHaveMarkup || (hasWrapSplitCharacter === void(0) ? hasWrapCharacter(prefixSuffixedText) : hasWrapSplitCharacter);
            d.needsConvertToTspans = d.mayHaveMarkup || d.wrappingNeeded || d.latex;

            var textToRender;
            if(d.wrappingNeeded) {
                var hrefPreservedText = c.wrapSplitCharacter === ' ' ? prefixSuffixedText.replace(/<a href=/ig, '<a_href=') : prefixSuffixedText;
                var fragments = hrefPreservedText.split(c.wrapSplitCharacter);
                var hrefRestoredFragments = c.wrapSplitCharacter === ' ' ? fragments.map(function(frag) {return frag.replace(/<a_href=/ig, '<a href=');}) : fragments;
                d.fragments = hrefRestoredFragments.map(function(f) {return {text: f, width: null};});
                d.fragments.push({fragment: c.wrapSpacer, width: null});
                textToRender = hrefRestoredFragments.join(c.lineBreaker) + c.lineBreaker + c.wrapSpacer;
            } else {
                delete d.fragments;
                textToRender = prefixSuffixedText;
            }

            return textToRender;
        })
        .attr('dy', function(d) {
            return d.needsConvertToTspans ? 0 : '0.75em';
        })
        .each(function(d) {
            var element = this;
            var selection = d3.select(element);

            // finalize what's in the DOM

            var renderCallback = d.wrappingNeeded ? wrapTextMaker : updateYPositionMaker;
            if(d.needsConvertToTspans) {
                svgUtil.convertToTspans(selection, gd, renderCallback(allColumnBlock, element, tableControlView, gd, d));
            } else {
                d3.select(element.parentNode)
                    // basic cell adjustment - compliance with `cellPad`
                    .attr('transform', function(d) {return 'translate(' + xPosition(d) + ' ' + c.cellPad + ')';})
                    .attr('text-anchor', function(d) {
                        return ({
                            left: 'start',
                            center: 'middle',
                            right: 'end'
                        })[d.align];
                    });
            }
        });
}

function isLatex(content) {
    return typeof content === 'string' && content.match(c.latexCheck);
}

function hasWrapCharacter(text) {return text.indexOf(c.wrapSplitCharacter) !== -1;}

function columnMoved(gd, calcdata, indices) {
    var o = calcdata.gdColumnsOriginalOrder;
    calcdata.gdColumns.sort(function(a, b) {
        return indices[o.indexOf(a)] - indices[o.indexOf(b)];
    });

    calcdata.columnorder = indices;

    // TODO: there's no data here, but also this reordering is not reflected
    // in gd.data or even gd._fullData.
    // For now I will not attempt to persist this in _preGUI
    gd.emit('plotly_restyle');
}

function gridPick(spec, col, row) {
    if(Array.isArray(spec)) {
        var column = spec[Math.min(col, spec.length - 1)];
        if(Array.isArray(column)) {
            return column[Math.min(row, column.length - 1)];
        } else {
            return column;
        }
    } else {
        return spec;
    }
}

function easeColumn(selection, d, y) {
    selection
        .transition()
        .ease(c.releaseTransitionEase)
        .duration(c.releaseTransitionDuration)
        .attr('transform', 'translate(' + d.x + ' ' + y + ')');
}

function cellsBlock(d) {return d.type === 'cells';}
function headerBlock(d) {return d.type === 'header';}

/**
 * Revolver panel and cell contents layouting
 */

function headerHeight(d) {
    var headerBlocks = d.rowBlocks.length ? d.rowBlocks[0].auxiliaryBlocks : [];
    return headerBlocks.reduce(function(p, n) {return p + rowsHeight(n, Infinity);}, 0);
}

function findPagesAndCacheHeights(blocks, scrollY, scrollHeight) {
    var pages = [];
    var pTop = 0;

    for(var blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
        var block = blocks[blockIndex];
        var blockRows = block.rows;
        var rowsHeight = 0;
        for(var i = 0; i < blockRows.length; i++) {
            rowsHeight += blockRows[i].rowHeight;
        }

        // caching allRowsHeight on the block - it's safe as this function is always called from within the code part
        // that handles increases to row heights
        block.allRowsHeight = rowsHeight;

        var pBottom = pTop + rowsHeight;
        var windowTop = scrollY;
        var windowBottom = windowTop + scrollHeight;
        if(windowTop < pBottom && windowBottom > pTop) {
            pages.push(blockIndex);
        }
        pTop += rowsHeight;

        // consider this nice final optimization; put it in `for` condition - caveat, currently the
        // block.allRowsHeight relies on being invalidated, so enabling this opt may not be safe
        // if(pages.length > 1) break;
    }

    return pages;
}

function updateBlockYPosition(gd, cellsColumnBlock, tableControlView) {
    var d = flatData(cellsColumnBlock)[0];
    if(d === undefined) return;
    var blocks = d.rowBlocks;
    var calcdata = d.calcdata;

    var bottom = firstRowAnchor(blocks, blocks.length);
    var scrollHeight = d.calcdata.groupHeight - headerHeight(d);
    var scrollY = calcdata.scrollY = Math.max(0, Math.min(bottom - scrollHeight, calcdata.scrollY));

    var pages = findPagesAndCacheHeights(blocks, scrollY, scrollHeight);
    if(pages.length === 1) {
        if(pages[0] === blocks.length - 1) {
            pages.unshift(pages[0] - 1);
        } else {
            pages.push(pages[0] + 1);
        }
    }

    // make phased out page jump by 2 while leaving stationary page intact
    if(pages[0] % 2) {
        pages.reverse();
    }

    cellsColumnBlock
        .each(function(d, i) {
            // these values will also be needed when a block is translated again due to growing cell height
            d.page = pages[i];
            d.scrollY = scrollY;
        });

    cellsColumnBlock
        .attr('transform', function(d) {
            var yTranslate = firstRowAnchor(d.rowBlocks, d.page) - d.scrollY;
            return 'translate(0 ' + yTranslate + ')';
        });

    // conditionally rerendering panel 0 and 1
    if(gd) {
        conditionalPanelRerender(gd, tableControlView, cellsColumnBlock, pages, d.prevPages, d, 0);
        conditionalPanelRerender(gd, tableControlView, cellsColumnBlock, pages, d.prevPages, d, 1);
        renderScrollbarKit(tableControlView, gd);
    }
}

function makeDragRow(gd, allTableControlView, optionalMultiplier, optionalPosition) {
    return function dragRow(eventD) {
        // may come from whichever DOM event target: drag, wheel, bar... eventD corresponds to event target
        var d = eventD.calcdata ? eventD.calcdata : eventD;
        var tableControlView = allTableControlView.filter(function(dd) {return d.key === dd.key;});
        var multiplier = optionalMultiplier || d.scrollbarState.dragMultiplier;

        var initialScrollY = d.scrollY;

        d.scrollY = optionalPosition === void(0) ? d.scrollY + multiplier * d3.event.dy : optionalPosition;
        var cellsColumnBlock = tableControlView.selectAll('.' + c.cn.yColumn).selectAll('.' + c.cn.columnBlock).filter(cellsBlock);
        updateBlockYPosition(gd, cellsColumnBlock, tableControlView);

        // return false if we've "used" the scroll, ie it did something,
        // so the event shouldn't bubble (if appropriate)
        return d.scrollY === initialScrollY;
    };
}

function conditionalPanelRerender(gd, tableControlView, cellsColumnBlock, pages, prevPages, d, revolverIndex) {
    var shouldComponentUpdate = pages[revolverIndex] !== prevPages[revolverIndex];
    if(shouldComponentUpdate) {
        clearTimeout(d.currentRepaint[revolverIndex]);
        d.currentRepaint[revolverIndex] = setTimeout(function() {
            // setTimeout might lag rendering but yields a smoother scroll, because fast scrolling makes
            // some repaints invisible ie. wasteful (DOM work blocks the main thread)
            var toRerender = cellsColumnBlock.filter(function(d, i) {return i === revolverIndex && pages[i] !== prevPages[i];});
            renderColumnCellTree(gd, tableControlView, toRerender, cellsColumnBlock);
            prevPages[revolverIndex] = pages[revolverIndex];
        });
    }
}

function wrapTextMaker(columnBlock, element, tableControlView, gd) {
    return function wrapText() {
        var cellTextHolder = d3.select(element.parentNode);
        cellTextHolder
            .each(function(d) {
                var fragments = d.fragments;
                cellTextHolder.selectAll('tspan.line').each(function(dd, i) {
                    fragments[i].width = this.getComputedTextLength();
                });
                // last element is only for measuring the separator character, so it's ignored:
                var separatorLength = fragments[fragments.length - 1].width;
                var rest = fragments.slice(0, -1);
                var currentRow = [];
                var currentAddition, currentAdditionLength;
                var currentRowLength = 0;
                var rowLengthLimit = d.column.columnWidth - 2 * c.cellPad;
                d.value = '';
                while(rest.length) {
                    currentAddition = rest.shift();
                    currentAdditionLength = currentAddition.width + separatorLength;
                    if(currentRowLength + currentAdditionLength > rowLengthLimit) {
                        d.value += currentRow.join(c.wrapSpacer) + c.lineBreaker;
                        currentRow = [];
                        currentRowLength = 0;
                    }
                    currentRow.push(currentAddition.text);
                    currentRowLength += currentAdditionLength;
                }
                if(currentRowLength) {
                    d.value += currentRow.join(c.wrapSpacer);
                }
                d.wrapped = true;
            });

        // the pre-wrapped text was rendered only for the text measurements
        cellTextHolder.selectAll('tspan.line').remove();

        // resupply text, now wrapped
        populateCellText(cellTextHolder.select('.' + c.cn.cellText), tableControlView, columnBlock, gd);
        d3.select(element.parentNode.parentNode).call(setCellHeightAndPositionY);
    };
}

function updateYPositionMaker(columnBlock, element, tableControlView, gd, d) {
    return function updateYPosition() {
        if(d.settledY) return;
        var cellTextHolder = d3.select(element.parentNode);
        var l = getBlock(d);
        var rowIndex = d.key - l.firstRowIndex;

        var declaredRowHeight = l.rows[rowIndex].rowHeight;

        var requiredHeight = d.cellHeightMayIncrease ? element.parentNode.getBoundingClientRect().height + 2 * c.cellPad : declaredRowHeight;

        var finalHeight = Math.max(requiredHeight, declaredRowHeight);
        var increase = finalHeight - l.rows[rowIndex].rowHeight;

        if(increase) {
            // current row height increased
            l.rows[rowIndex].rowHeight = finalHeight;

            columnBlock
                .selectAll('.' + c.cn.columnCell)
                .call(setCellHeightAndPositionY);

            updateBlockYPosition(null, columnBlock.filter(cellsBlock), 0);

            // if d.column.type === 'header', then the scrollbar has to be pushed downward to the scrollable area
            // if d.column.type === 'cells', it can still be relevant if total scrolling content height is less than the
            //                               scrollable window, as increases to row heights may need scrollbar updates
            renderScrollbarKit(tableControlView, gd, true);
        }

        cellTextHolder
            .attr('transform', function() {
                // this code block is only invoked for items where d.cellHeightMayIncrease is truthy
                var element = this;
                var columnCellElement = element.parentNode;
                var box = columnCellElement.getBoundingClientRect();
                var rectBox = d3.select(element.parentNode).select('.' + c.cn.cellRect).node().getBoundingClientRect();
                var currentTransform = element.transform.baseVal.consolidate();
                var yPosition = rectBox.top - box.top + (currentTransform ? currentTransform.matrix.f : c.cellPad);
                return 'translate(' + xPosition(d, d3.select(element.parentNode).select('.' + c.cn.cellTextHolder).node().getBoundingClientRect().width) + ' ' + yPosition + ')';
            });

        d.settledY = true;
    };
}

function xPosition(d, optionalWidth) {
    switch(d.align) {
        case 'left': return c.cellPad;
        case 'right': return d.column.columnWidth - (optionalWidth || 0) - c.cellPad;
        case 'center': return (d.column.columnWidth - (optionalWidth || 0)) / 2;
        default: return c.cellPad;
    }
}

function setCellHeightAndPositionY(columnCell) {
    columnCell
        .attr('transform', function(d) {
            var headerHeight = d.rowBlocks[0].auxiliaryBlocks.reduce(function(p, n) {return p + rowsHeight(n, Infinity);}, 0);
            var l = getBlock(d);
            var rowAnchor = rowsHeight(l, d.key);
            var yOffset = rowAnchor + headerHeight;
            return 'translate(0 ' + yOffset + ')';
        })
        .selectAll('.' + c.cn.cellRect)
        .attr('height', function(d) {return getRow(getBlock(d), d.key).rowHeight;});
}

function firstRowAnchor(blocks, page) {
    var total = 0;
    for(var i = page - 1; i >= 0; i--) {
        total += allRowsHeight(blocks[i]);
    }
    return total;
}

function rowsHeight(rowBlock, key) {
    var total = 0;
    for(var i = 0; i < rowBlock.rows.length && rowBlock.rows[i].rowIndex < key; i++) {
        total += rowBlock.rows[i].rowHeight;
    }
    return total;
}

function allRowsHeight(rowBlock) {
    var cached = rowBlock.allRowsHeight;

    if(cached !== void(0)) {
        return cached;
    }

    var total = 0;
    for(var i = 0; i < rowBlock.rows.length; i++) {
        total += rowBlock.rows[i].rowHeight;
    }
    rowBlock.allRowsHeight = total;

    return total;
}

function getBlock(d) {return d.rowBlocks[d.page];}
function getRow(l, i) {return l.rows[i - l.firstRowIndex];}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9saWIvdGFibGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy90YWJsZS9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdGFibGUvYmFzZV9wbG90LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdGFibGUvY2FsYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3RhYmxlL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3RhYmxlL2RhdGFfcHJlcGFyYXRpb25faGVscGVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdGFibGUvZGF0YV9zcGxpdF9oZWxwZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvdGFibGUvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3RyYWNlcy90YWJsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3RhYmxlL3Bsb3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIscUhBQStDOzs7Ozs7Ozs7Ozs7QUNWL0M7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O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsaURBQWlEO0FBQ2pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0UseUJBQXlCO0FBQ2pHOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLHlEQUF5RDtBQUM5SDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTs7QUFFYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxxRkFBcUYsb0NBQW9DO0FBQ3pIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUNBQXFDLDZDQUE2QztBQUNsRjs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCLFFBQVE7QUFDakM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGtCQUFrQiw2REFBNkQ7QUFDL0U7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsMEJBQTBCO0FBQzVDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLHNCQUFzQjtBQUN0Qix1QkFBdUIiLCJmaWxlIjoiY2hhcnQ3ODU3MzhlM2Q0YjQwZTU3OGI5NS5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuLi9zcmMvdHJhY2VzL3RhYmxlJyk7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBhbm5BdHRycyA9IHJlcXVpcmUoJy4uLy4uL2NvbXBvbmVudHMvYW5ub3RhdGlvbnMvYXR0cmlidXRlcycpO1xudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBvdmVycmlkZUFsbCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL2VkaXRfdHlwZXMnKS5vdmVycmlkZUFsbDtcbnZhciBmb250QXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9mb250X2F0dHJpYnV0ZXMnKTtcbnZhciBkb21haW5BdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2RvbWFpbicpLmF0dHJpYnV0ZXM7XG5cbnZhciBGT1JNQVRfTElOSyA9IHJlcXVpcmUoJy4uLy4uL2NvbnN0YW50cy9kb2NzJykuRk9STUFUX0xJTks7XG5cbnZhciBhdHRycyA9IG1vZHVsZS5leHBvcnRzID0gb3ZlcnJpZGVBbGwoe1xuICAgIGRvbWFpbjogZG9tYWluQXR0cnMoe25hbWU6ICd0YWJsZScsIHRyYWNlOiB0cnVlfSksXG5cbiAgICBjb2x1bW53aWR0aDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgd2lkdGggb2YgY29sdW1ucyBleHByZXNzZWQgYXMgYSByYXRpby4gQ29sdW1ucyBmaWxsIHRoZSBhdmFpbGFibGUgd2lkdGgnLFxuICAgICAgICAgICAgJ2luIHByb3BvcnRpb24gb2YgdGhlaXIgc3BlY2lmaWVkIGNvbHVtbiB3aWR0aHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBjb2x1bW5vcmRlcjoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTcGVjaWZpZXMgdGhlIHJlbmRlcmVkIG9yZGVyIG9mIHRoZSBkYXRhIGNvbHVtbnM7IGZvciBleGFtcGxlLCBhIHZhbHVlIGAyYCBhdCBwb3NpdGlvbiBgMGAnLFxuICAgICAgICAgICAgJ21lYW5zIHRoYXQgY29sdW1uIGluZGV4IGAwYCBpbiB0aGUgZGF0YSB3aWxsIGJlIHJlbmRlcmVkIGFzIHRoZScsXG4gICAgICAgICAgICAndGhpcmQgY29sdW1uLCBhcyBjb2x1bW5zIGhhdmUgYW4gaW5kZXggYmFzZSBvZiB6ZXJvLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgaGVhZGVyOiB7XG5cbiAgICAgICAgdmFsdWVzOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZmx0OiBbXSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0hlYWRlciBjZWxsIHZhbHVlcy4gYHZhbHVlc1ttXVtuXWAgcmVwcmVzZW50cyB0aGUgdmFsdWUgb2YgdGhlIGBuYHRoIHBvaW50IGluIGNvbHVtbiBgbWAsJyxcbiAgICAgICAgICAgICAgICAndGhlcmVmb3JlIHRoZSBgdmFsdWVzW21dYCB2ZWN0b3IgbGVuZ3RoIGZvciBhbGwgY29sdW1ucyBtdXN0IGJlIHRoZSBzYW1lIChsb25nZXIgdmVjdG9ycycsXG4gICAgICAgICAgICAgICAgJ3dpbGwgYmUgdHJ1bmNhdGVkKS4gRWFjaCB2YWx1ZSBtdXN0IGJlIGEgZmluaXRlIG51bWJlciBvciBhIHN0cmluZy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuXG4gICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogW10sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjZWxsIHZhbHVlIGZvcm1hdHRpbmcgcnVsZSB1c2luZyBkMyBmb3JtYXR0aW5nIG1pbmktbGFuZ3VhZ2UnLFxuICAgICAgICAgICAgICAgICd3aGljaCBpcyBzaW1pbGFyIHRvIHRob3NlIG9mIFB5dGhvbi4gU2VlJyxcbiAgICAgICAgICAgICAgICBGT1JNQVRfTElOS1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcblxuICAgICAgICBwcmVmaXg6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdQcmVmaXggZm9yIGNlbGwgdmFsdWVzLidcbiAgICAgICAgfSxcblxuICAgICAgICBzdWZmaXg6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTdWZmaXggZm9yIGNlbGwgdmFsdWVzLidcbiAgICAgICAgfSxcblxuICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgZGZsdDogMjgsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgaGVpZ2h0IG9mIGNlbGxzLidcbiAgICAgICAgfSxcblxuICAgICAgICBhbGlnbjogZXh0ZW5kRmxhdCh7fSwgYW5uQXR0cnMuYWxpZ24sIHthcnJheU9rOiB0cnVlfSksXG5cbiAgICAgICAgbGluZToge1xuICAgICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRmbHQ6IDEsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3N0eWxlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRmbHQ6ICdncmV5JyxcbiAgICAgICAgICAgICAgICByb2xlOiAnc3R5bGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmlsbDoge1xuICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgICAgICAgICAgZGZsdDogJ3doaXRlJyxcbiAgICAgICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjZWxsIGZpbGwgY29sb3IuIEl0IGFjY2VwdHMgZWl0aGVyIGEgc3BlY2lmaWMgY29sb3InLFxuICAgICAgICAgICAgICAgICAgICAnIG9yIGFuIGFycmF5IG9mIGNvbG9ycyBvciBhIDJEIGFycmF5IG9mIGNvbG9ycy4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZvbnQ6IGV4dGVuZEZsYXQoe30sIGZvbnRBdHRycyh7YXJyYXlPazogdHJ1ZX0pKVxuICAgIH0sXG5cbiAgICBjZWxsczoge1xuXG4gICAgICAgIHZhbHVlczoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogW10sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdDZWxsIHZhbHVlcy4gYHZhbHVlc1ttXVtuXWAgcmVwcmVzZW50cyB0aGUgdmFsdWUgb2YgdGhlIGBuYHRoIHBvaW50IGluIGNvbHVtbiBgbWAsJyxcbiAgICAgICAgICAgICAgICAndGhlcmVmb3JlIHRoZSBgdmFsdWVzW21dYCB2ZWN0b3IgbGVuZ3RoIGZvciBhbGwgY29sdW1ucyBtdXN0IGJlIHRoZSBzYW1lIChsb25nZXIgdmVjdG9ycycsXG4gICAgICAgICAgICAgICAgJ3dpbGwgYmUgdHJ1bmNhdGVkKS4gRWFjaCB2YWx1ZSBtdXN0IGJlIGEgZmluaXRlIG51bWJlciBvciBhIHN0cmluZy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuXG4gICAgICAgIGZvcm1hdDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogW10sXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjZWxsIHZhbHVlIGZvcm1hdHRpbmcgcnVsZSB1c2luZyBkMyBmb3JtYXR0aW5nIG1pbmktbGFuZ3VhZ2UnLFxuICAgICAgICAgICAgICAgICd3aGljaCBpcyBzaW1pbGFyIHRvIHRob3NlIG9mIFB5dGhvbi4gU2VlJyxcbiAgICAgICAgICAgICAgICBGT1JNQVRfTElOS1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcblxuICAgICAgICBwcmVmaXg6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdQcmVmaXggZm9yIGNlbGwgdmFsdWVzLidcbiAgICAgICAgfSxcblxuICAgICAgICBzdWZmaXg6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICAgICAgYXJyYXlPazogdHJ1ZSxcbiAgICAgICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTdWZmaXggZm9yIGNlbGwgdmFsdWVzLidcbiAgICAgICAgfSxcblxuICAgICAgICBoZWlnaHQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgZGZsdDogMjAsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdUaGUgaGVpZ2h0IG9mIGNlbGxzLidcbiAgICAgICAgfSxcblxuICAgICAgICBhbGlnbjogZXh0ZW5kRmxhdCh7fSwgYW5uQXR0cnMuYWxpZ24sIHthcnJheU9rOiB0cnVlfSksXG5cbiAgICAgICAgbGluZToge1xuICAgICAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRmbHQ6IDEsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3N0eWxlJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbG9yOiB7XG4gICAgICAgICAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRmbHQ6ICdncmV5JyxcbiAgICAgICAgICAgICAgICByb2xlOiAnc3R5bGUnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgZmlsbDoge1xuICAgICAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICAgICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgICAgICBkZmx0OiAnd2hpdGUnLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgICAgICdTZXRzIHRoZSBjZWxsIGZpbGwgY29sb3IuIEl0IGFjY2VwdHMgZWl0aGVyIGEgc3BlY2lmaWMgY29sb3InLFxuICAgICAgICAgICAgICAgICAgICAnIG9yIGFuIGFycmF5IG9mIGNvbG9ycyBvciBhIDJEIGFycmF5IG9mIGNvbG9ycy4nXG4gICAgICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuXG4gICAgICAgIGZvbnQ6IGV4dGVuZEZsYXQoe30sIGZvbnRBdHRycyh7YXJyYXlPazogdHJ1ZX0pKVxuICAgIH1cbn0sICdjYWxjJywgJ2Zyb20tcm9vdCcpO1xuYXR0cnMudHJhbnNmb3JtcyA9IHVuZGVmaW5lZDtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGdldE1vZHVsZUNhbGNEYXRhID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZ2V0X2RhdGEnKS5nZXRNb2R1bGVDYWxjRGF0YTtcbnZhciB0YWJsZVBsb3QgPSByZXF1aXJlKCcuL3Bsb3QnKTtcblxudmFyIFRBQkxFID0gJ3RhYmxlJztcblxuZXhwb3J0cy5uYW1lID0gVEFCTEU7XG5cbmV4cG9ydHMucGxvdCA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgdmFyIGNhbGNEYXRhID0gZ2V0TW9kdWxlQ2FsY0RhdGEoZ2QuY2FsY2RhdGEsIFRBQkxFKVswXTtcbiAgICBpZihjYWxjRGF0YS5sZW5ndGgpIHRhYmxlUGxvdChnZCwgY2FsY0RhdGEpO1xufTtcblxuZXhwb3J0cy5jbGVhbiA9IGZ1bmN0aW9uKG5ld0Z1bGxEYXRhLCBuZXdGdWxsTGF5b3V0LCBvbGRGdWxsRGF0YSwgb2xkRnVsbExheW91dCkge1xuICAgIHZhciBoYWRUYWJsZSA9IChvbGRGdWxsTGF5b3V0Ll9oYXMgJiYgb2xkRnVsbExheW91dC5faGFzKFRBQkxFKSk7XG4gICAgdmFyIGhhc1RhYmxlID0gKG5ld0Z1bGxMYXlvdXQuX2hhcyAmJiBuZXdGdWxsTGF5b3V0Ll9oYXMoVEFCTEUpKTtcblxuICAgIGlmKGhhZFRhYmxlICYmICFoYXNUYWJsZSkge1xuICAgICAgICBvbGRGdWxsTGF5b3V0Ll9wYXBlcmRpdi5zZWxlY3RBbGwoJy50YWJsZScpLnJlbW92ZSgpO1xuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciB3cmFwID0gcmVxdWlyZSgnLi4vLi4vbGliL2d1cCcpLndyYXA7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYygpIHtcbiAgICAvLyB3ZSBkb24ndCBhY3R1YWxseSBuZWVkIHRvIGluY2x1ZGUgdGhlIHRyYWNlIGhlcmUsIHNpbmNlIHRoYXQgd2lsbCBiZSBhZGRlZFxuICAgIC8vIGJ5IFBsb3RzLmRvQ2FsY2RhdGEsIGFuZCB0aGF0J3MgYWxsIHdlIGFjdHVhbGx5IG5lZWQgbGF0ZXIuXG4gICAgcmV0dXJuIHdyYXAoe30pO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgY2VsbFBhZDogOCxcbiAgICBjb2x1bW5FeHRlbnRPZmZzZXQ6IDEwLFxuICAgIGNvbHVtblRpdGxlT2Zmc2V0OiAyOCxcbiAgICBlbXB0eUhlYWRlckhlaWdodDogMTYsXG4gICAgbGF0ZXhDaGVjazogL15cXCQuKlxcJCQvLFxuICAgIGdvbGRlblJhdGlvOiAxLjYxOCxcbiAgICBsaW5lQnJlYWtlcjogJzxicj4nLFxuICAgIG1heERpbWVuc2lvbkNvdW50OiA2MCxcbiAgICBvdmVyZHJhZzogNDUsXG4gICAgcmVsZWFzZVRyYW5zaXRpb25EdXJhdGlvbjogMTIwLFxuICAgIHJlbGVhc2VUcmFuc2l0aW9uRWFzZTogJ2N1YmljLW91dCcsXG4gICAgc2Nyb2xsYmFyQ2FwdHVyZVdpZHRoOiAxOCxcbiAgICBzY3JvbGxiYXJIaWRlRGVsYXk6IDEwMDAsXG4gICAgc2Nyb2xsYmFySGlkZUR1cmF0aW9uOiAxMDAwLFxuICAgIHNjcm9sbGJhck9mZnNldDogNSxcbiAgICBzY3JvbGxiYXJXaWR0aDogOCxcbiAgICB0cmFuc2l0aW9uRHVyYXRpb246IDEwMCxcbiAgICB0cmFuc2l0aW9uRWFzZTogJ2N1YmljLW91dCcsXG4gICAgdXBsaWZ0OiA1LFxuICAgIHdyYXBTcGFjZXI6ICcgJyxcbiAgICB3cmFwU3BsaXRDaGFyYWN0ZXI6ICcgJyxcbiAgICBjbjoge1xuICAgICAgICAvLyBnZW5lcmFsIGNsYXNzIG5hbWVzXG4gICAgICAgIHRhYmxlOiAndGFibGUnLFxuICAgICAgICB0YWJsZUNvbnRyb2xWaWV3OiAndGFibGUtY29udHJvbC12aWV3JyxcbiAgICAgICAgc2Nyb2xsQmFja2dyb3VuZDogJ3Njcm9sbC1iYWNrZ3JvdW5kJyxcbiAgICAgICAgeUNvbHVtbjogJ3ktY29sdW1uJyxcbiAgICAgICAgY29sdW1uQmxvY2s6ICdjb2x1bW4tYmxvY2snLFxuICAgICAgICBzY3JvbGxBcmVhQ2xpcDogJ3Njcm9sbC1hcmVhLWNsaXAnLFxuICAgICAgICBzY3JvbGxBcmVhQ2xpcFJlY3Q6ICdzY3JvbGwtYXJlYS1jbGlwLXJlY3QnLFxuICAgICAgICBjb2x1bW5Cb3VuZGFyeTogJ2NvbHVtbi1ib3VuZGFyeScsXG4gICAgICAgIGNvbHVtbkJvdW5kYXJ5Q2xpcHBhdGg6ICdjb2x1bW4tYm91bmRhcnktY2xpcHBhdGgnLFxuICAgICAgICBjb2x1bW5Cb3VuZGFyeVJlY3Q6ICdjb2x1bW4tYm91bmRhcnktcmVjdCcsXG4gICAgICAgIGNvbHVtbkNlbGxzOiAnY29sdW1uLWNlbGxzJyxcbiAgICAgICAgY29sdW1uQ2VsbDogJ2NvbHVtbi1jZWxsJyxcbiAgICAgICAgY2VsbFJlY3Q6ICdjZWxsLXJlY3QnLFxuICAgICAgICBjZWxsVGV4dDogJ2NlbGwtdGV4dCcsXG4gICAgICAgIGNlbGxUZXh0SG9sZGVyOiAnY2VsbC10ZXh0LWhvbGRlcicsXG5cbiAgICAgICAgLy8gc2Nyb2xsIHJlbGF0ZWQgY2xhc3MgbmFtZXNcbiAgICAgICAgc2Nyb2xsYmFyS2l0OiAnc2Nyb2xsYmFyLWtpdCcsXG4gICAgICAgIHNjcm9sbGJhcjogJ3Njcm9sbGJhcicsXG4gICAgICAgIHNjcm9sbGJhclNsaWRlcjogJ3Njcm9sbGJhci1zbGlkZXInLFxuICAgICAgICBzY3JvbGxiYXJHbHlwaDogJ3Njcm9sbGJhci1nbHlwaCcsXG4gICAgICAgIHNjcm9sbGJhckNhcHR1cmVab25lOiAnc2Nyb2xsYmFyLWNhcHR1cmUtem9uZSdcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xudmFyIGlzTnVtZXJpYyA9IHJlcXVpcmUoJ2Zhc3QtaXNudW1lcmljJyk7XG5cbi8vIHB1cmUgZnVuY3Rpb25zLCBkb24ndCBhbHRlciBidXQgcGFzc2VzIG9uIGBnZGAgYW5kIHBhcnRzIG9mIGB0cmFjZWAgd2l0aG91dCBkZWVwIGNvcHlpbmdcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY2FsYyhnZCwgdHJhY2UpIHtcbiAgICB2YXIgY2VsbHNWYWx1ZXMgPSBzcXVhcmVTdHJpbmdNYXRyaXgodHJhY2UuY2VsbHMudmFsdWVzKTtcbiAgICB2YXIgc2xpY2VyID0gZnVuY3Rpb24oYSkge1xuICAgICAgICByZXR1cm4gYS5zbGljZSh0cmFjZS5oZWFkZXIudmFsdWVzLmxlbmd0aCwgYS5sZW5ndGgpO1xuICAgIH07XG4gICAgdmFyIGhlYWRlclZhbHVlc0luID0gc3F1YXJlU3RyaW5nTWF0cml4KHRyYWNlLmhlYWRlci52YWx1ZXMpO1xuICAgIGlmKGhlYWRlclZhbHVlc0luLmxlbmd0aCAmJiAhaGVhZGVyVmFsdWVzSW5bMF0ubGVuZ3RoKSB7XG4gICAgICAgIGhlYWRlclZhbHVlc0luWzBdID0gWycnXTtcbiAgICAgICAgaGVhZGVyVmFsdWVzSW4gPSBzcXVhcmVTdHJpbmdNYXRyaXgoaGVhZGVyVmFsdWVzSW4pO1xuICAgIH1cbiAgICB2YXIgaGVhZGVyVmFsdWVzID0gaGVhZGVyVmFsdWVzSW5cbiAgICAgICAgLmNvbmNhdChzbGljZXIoY2VsbHNWYWx1ZXMpLm1hcChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJldHVybiBlbXB0eVN0cmluZ3MoKGhlYWRlclZhbHVlc0luWzBdIHx8IFsnJ10pLmxlbmd0aCk7XG4gICAgICAgIH0pKTtcblxuICAgIHZhciBkb21haW4gPSB0cmFjZS5kb21haW47XG4gICAgdmFyIGdyb3VwV2lkdGggPSBNYXRoLmZsb29yKGdkLl9mdWxsTGF5b3V0Ll9zaXplLncgKiAoZG9tYWluLnhbMV0gLSBkb21haW4ueFswXSkpO1xuICAgIHZhciBncm91cEhlaWdodCA9IE1hdGguZmxvb3IoZ2QuX2Z1bGxMYXlvdXQuX3NpemUuaCAqIChkb21haW4ueVsxXSAtIGRvbWFpbi55WzBdKSk7XG4gICAgdmFyIGhlYWRlclJvd0hlaWdodHMgPSB0cmFjZS5oZWFkZXIudmFsdWVzLmxlbmd0aCA/XG4gICAgICAgIGhlYWRlclZhbHVlc1swXS5tYXAoZnVuY3Rpb24oKSB7IHJldHVybiB0cmFjZS5oZWFkZXIuaGVpZ2h0OyB9KSA6XG4gICAgICAgIFtjLmVtcHR5SGVhZGVySGVpZ2h0XTtcbiAgICB2YXIgcm93SGVpZ2h0cyA9IGNlbGxzVmFsdWVzLmxlbmd0aCA/IGNlbGxzVmFsdWVzWzBdLm1hcChmdW5jdGlvbigpIHsgcmV0dXJuIHRyYWNlLmNlbGxzLmhlaWdodDsgfSkgOiBbXTtcbiAgICB2YXIgaGVhZGVySGVpZ2h0ID0gaGVhZGVyUm93SGVpZ2h0cy5yZWR1Y2Uoc3VtLCAwKTtcbiAgICB2YXIgc2Nyb2xsSGVpZ2h0ID0gZ3JvdXBIZWlnaHQgLSBoZWFkZXJIZWlnaHQ7XG4gICAgdmFyIG1pbmltdW1GaWxsSGVpZ2h0ID0gc2Nyb2xsSGVpZ2h0ICsgYy51cGxpZnQ7XG4gICAgdmFyIGFuY2hvclRvUm93QmxvY2sgPSBtYWtlQW5jaG9yVG9Sb3dCbG9jayhyb3dIZWlnaHRzLCBtaW5pbXVtRmlsbEhlaWdodCk7XG4gICAgdmFyIGFuY2hvclRvSGVhZGVyUm93QmxvY2sgPSBtYWtlQW5jaG9yVG9Sb3dCbG9jayhoZWFkZXJSb3dIZWlnaHRzLCBoZWFkZXJIZWlnaHQpO1xuICAgIHZhciBoZWFkZXJSb3dCbG9ja3MgPSBtYWtlUm93QmxvY2soYW5jaG9yVG9IZWFkZXJSb3dCbG9jaywgW10pO1xuICAgIHZhciByb3dCbG9ja3MgPSBtYWtlUm93QmxvY2soYW5jaG9yVG9Sb3dCbG9jaywgaGVhZGVyUm93QmxvY2tzKTtcbiAgICB2YXIgdW5pcXVlS2V5cyA9IHt9O1xuICAgIHZhciBjb2x1bW5PcmRlciA9IHRyYWNlLl9mdWxsSW5wdXQuY29sdW1ub3JkZXIuY29uY2F0KHNsaWNlcihjZWxsc1ZhbHVlcy5tYXAoZnVuY3Rpb24oZCwgaSkge3JldHVybiBpO30pKSk7XG4gICAgdmFyIGNvbHVtbldpZHRocyA9IGhlYWRlclZhbHVlcy5tYXAoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICB2YXIgdmFsdWUgPSBBcnJheS5pc0FycmF5KHRyYWNlLmNvbHVtbndpZHRoKSA/XG4gICAgICAgICAgICB0cmFjZS5jb2x1bW53aWR0aFtNYXRoLm1pbihpLCB0cmFjZS5jb2x1bW53aWR0aC5sZW5ndGggLSAxKV0gOlxuICAgICAgICAgICAgdHJhY2UuY29sdW1ud2lkdGg7XG4gICAgICAgIHJldHVybiBpc051bWVyaWModmFsdWUpID8gTnVtYmVyKHZhbHVlKSA6IDE7XG4gICAgfSk7XG4gICAgdmFyIHRvdGFsQ29sdW1uV2lkdGhzID0gY29sdW1uV2lkdGhzLnJlZHVjZShzdW0sIDApO1xuXG4gICAgLy8gZml0IGNvbHVtbnMgaW4gdGhlIGF2YWlsYWJsZSB2ZXJ0aWNhbCBzcGFjZSBhcyB0aGVyZSdzIG5vIHZlcnRpY2FsIHNjcm9sbGluZyBub3dcbiAgICBjb2x1bW5XaWR0aHMgPSBjb2x1bW5XaWR0aHMubWFwKGZ1bmN0aW9uKGQpIHsgcmV0dXJuIGQgLyB0b3RhbENvbHVtbldpZHRocyAqIGdyb3VwV2lkdGg7IH0pO1xuXG4gICAgdmFyIG1heExpbmVXaWR0aCA9IE1hdGgubWF4KGFycmF5TWF4KHRyYWNlLmhlYWRlci5saW5lLndpZHRoKSwgYXJyYXlNYXgodHJhY2UuY2VsbHMubGluZS53aWR0aCkpO1xuXG4gICAgdmFyIGNhbGNkYXRhID0ge1xuICAgICAgICAvLyBpbmNsdWRlIHN0YXRpY1Bsb3QgaW4gdGhlIGtleSBzbyBpZiBpdCBjaGFuZ2VzIHdlIGRlbGV0ZSBhbmQgcmVkcmF3XG4gICAgICAgIGtleTogdHJhY2UudWlkICsgZ2QuX2NvbnRleHQuc3RhdGljUGxvdCxcbiAgICAgICAgdHJhbnNsYXRlWDogZG9tYWluLnhbMF0gKiBnZC5fZnVsbExheW91dC5fc2l6ZS53LFxuICAgICAgICB0cmFuc2xhdGVZOiBnZC5fZnVsbExheW91dC5fc2l6ZS5oICogKDEgLSBkb21haW4ueVsxXSksXG4gICAgICAgIHNpemU6IGdkLl9mdWxsTGF5b3V0Ll9zaXplLFxuICAgICAgICB3aWR0aDogZ3JvdXBXaWR0aCxcbiAgICAgICAgbWF4TGluZVdpZHRoOiBtYXhMaW5lV2lkdGgsXG4gICAgICAgIGhlaWdodDogZ3JvdXBIZWlnaHQsXG4gICAgICAgIGNvbHVtbk9yZGVyOiBjb2x1bW5PcmRlciwgLy8gd2lsbCBiZSBtdXRhdGVkIG9uIGNvbHVtbiBtb3ZlLCB0b2RvIHVzZSBpbiBjYWxsYmFja1xuICAgICAgICBncm91cEhlaWdodDogZ3JvdXBIZWlnaHQsXG4gICAgICAgIHJvd0Jsb2Nrczogcm93QmxvY2tzLFxuICAgICAgICBoZWFkZXJSb3dCbG9ja3M6IGhlYWRlclJvd0Jsb2NrcyxcbiAgICAgICAgc2Nyb2xsWTogMCwgLy8gd2lsbCBiZSBtdXRhdGVkIG9uIHNjcm9sbFxuICAgICAgICBjZWxsczogZXh0ZW5kRmxhdCh7fSwgdHJhY2UuY2VsbHMsIHt2YWx1ZXM6IGNlbGxzVmFsdWVzfSksXG4gICAgICAgIGhlYWRlckNlbGxzOiBleHRlbmRGbGF0KHt9LCB0cmFjZS5oZWFkZXIsIHt2YWx1ZXM6IGhlYWRlclZhbHVlc30pLFxuICAgICAgICBnZENvbHVtbnM6IGhlYWRlclZhbHVlcy5tYXAoZnVuY3Rpb24oZCkge3JldHVybiBkWzBdO30pLFxuICAgICAgICBnZENvbHVtbnNPcmlnaW5hbE9yZGVyOiBoZWFkZXJWYWx1ZXMubWFwKGZ1bmN0aW9uKGQpIHtyZXR1cm4gZFswXTt9KSxcbiAgICAgICAgcHJldlBhZ2VzOiBbMCwgMF0sXG4gICAgICAgIHNjcm9sbGJhclN0YXRlOiB7c2Nyb2xsYmFyU2Nyb2xsSW5Qcm9ncmVzczogZmFsc2V9LFxuICAgICAgICBjb2x1bW5zOiBoZWFkZXJWYWx1ZXMubWFwKGZ1bmN0aW9uKGxhYmVsLCBpKSB7XG4gICAgICAgICAgICB2YXIgZm91bmRLZXkgPSB1bmlxdWVLZXlzW2xhYmVsXTtcbiAgICAgICAgICAgIHVuaXF1ZUtleXNbbGFiZWxdID0gKGZvdW5kS2V5IHx8IDApICsgMTtcbiAgICAgICAgICAgIHZhciBrZXkgPSBsYWJlbCArICdfXycgKyB1bmlxdWVLZXlzW2xhYmVsXTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAga2V5OiBrZXksXG4gICAgICAgICAgICAgICAgbGFiZWw6IGxhYmVsLFxuICAgICAgICAgICAgICAgIHNwZWNJbmRleDogaSxcbiAgICAgICAgICAgICAgICB4SW5kZXg6IGNvbHVtbk9yZGVyW2ldLFxuICAgICAgICAgICAgICAgIHhTY2FsZTogeFNjYWxlLFxuICAgICAgICAgICAgICAgIHg6IHVuZGVmaW5lZCwgLy8gaW5pdGlhbGl6ZWQgYmVsb3dcbiAgICAgICAgICAgICAgICBjYWxjZGF0YTogdW5kZWZpbmVkLCAvLyBpbml0aWFsaXplZCBiZWxvd1xuICAgICAgICAgICAgICAgIGNvbHVtbldpZHRoOiBjb2x1bW5XaWR0aHNbaV1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH0pXG4gICAgfTtcblxuICAgIGNhbGNkYXRhLmNvbHVtbnMuZm9yRWFjaChmdW5jdGlvbihjb2wpIHtcbiAgICAgICAgY29sLmNhbGNkYXRhID0gY2FsY2RhdGE7XG4gICAgICAgIGNvbC54ID0geFNjYWxlKGNvbCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gY2FsY2RhdGE7XG59O1xuXG5mdW5jdGlvbiBhcnJheU1heChtYXliZUFycmF5KSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheShtYXliZUFycmF5KSkge1xuICAgICAgICB2YXIgbWF4ID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG1heWJlQXJyYXkubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIG1heCA9IE1hdGgubWF4KG1heCwgYXJyYXlNYXgobWF5YmVBcnJheVtpXSkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtYXg7XG4gICAgfVxuICAgIHJldHVybiBtYXliZUFycmF5O1xufVxuXG5mdW5jdGlvbiBzdW0oYSwgYikgeyByZXR1cm4gYSArIGI7IH1cblxuLy8gZmlsbCBtYXRyaXggaW4gcGxhY2UgdG8gZXF1YWwgbGVuZ3Roc1xuLy8gYW5kIGVuc3VyZSBpdCdzIHVuaWZvcm1seSAyRFxuZnVuY3Rpb24gc3F1YXJlU3RyaW5nTWF0cml4KG1hdHJpeEluKSB7XG4gICAgdmFyIG1hdHJpeCA9IG1hdHJpeEluLnNsaWNlKCk7XG4gICAgdmFyIG1pbkxlbiA9IEluZmluaXR5O1xuICAgIHZhciBtYXhMZW4gPSAwO1xuICAgIHZhciBpO1xuICAgIGZvcihpID0gMDsgaSA8IG1hdHJpeC5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZighQXJyYXkuaXNBcnJheShtYXRyaXhbaV0pKSBtYXRyaXhbaV0gPSBbbWF0cml4W2ldXTtcbiAgICAgICAgbWluTGVuID0gTWF0aC5taW4obWluTGVuLCBtYXRyaXhbaV0ubGVuZ3RoKTtcbiAgICAgICAgbWF4TGVuID0gTWF0aC5tYXgobWF4TGVuLCBtYXRyaXhbaV0ubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBpZihtaW5MZW4gIT09IG1heExlbikge1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBtYXRyaXgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBwYWRMZW4gPSBtYXhMZW4gLSBtYXRyaXhbaV0ubGVuZ3RoO1xuICAgICAgICAgICAgaWYocGFkTGVuKSBtYXRyaXhbaV0gPSBtYXRyaXhbaV0uY29uY2F0KGVtcHR5U3RyaW5ncyhwYWRMZW4pKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbWF0cml4O1xufVxuXG5mdW5jdGlvbiBlbXB0eVN0cmluZ3MobGVuKSB7XG4gICAgdmFyIHBhZEFycmF5ID0gbmV3IEFycmF5KGxlbik7XG4gICAgZm9yKHZhciBqID0gMDsgaiA8IGxlbjsgaisrKSBwYWRBcnJheVtqXSA9ICcnO1xuICAgIHJldHVybiBwYWRBcnJheTtcbn1cblxuZnVuY3Rpb24geFNjYWxlKGQpIHtcbiAgICByZXR1cm4gZC5jYWxjZGF0YS5jb2x1bW5zLnJlZHVjZShmdW5jdGlvbihwcmV2LCBuZXh0KSB7XG4gICAgICAgIHJldHVybiBuZXh0LnhJbmRleCA8IGQueEluZGV4ID8gcHJldiArIG5leHQuY29sdW1uV2lkdGggOiBwcmV2O1xuICAgIH0sIDApO1xufVxuXG5mdW5jdGlvbiBtYWtlUm93QmxvY2soYW5jaG9yVG9Sb3dCbG9jaywgYXV4aWxpYXJ5KSB7XG4gICAgdmFyIGJsb2NrQW5jaG9yS2V5cyA9IE9iamVjdC5rZXlzKGFuY2hvclRvUm93QmxvY2spO1xuICAgIHJldHVybiBibG9ja0FuY2hvcktleXMubWFwKGZ1bmN0aW9uKGspIHtyZXR1cm4gZXh0ZW5kRmxhdCh7fSwgYW5jaG9yVG9Sb3dCbG9ja1trXSwge2F1eGlsaWFyeUJsb2NrczogYXV4aWxpYXJ5fSk7fSk7XG59XG5cbmZ1bmN0aW9uIG1ha2VBbmNob3JUb1Jvd0Jsb2NrKHJvd0hlaWdodHMsIG1pbmltdW1GaWxsSGVpZ2h0KSB7XG4gICAgdmFyIGFuY2hvclRvUm93QmxvY2sgPSB7fTtcbiAgICB2YXIgY3VycmVudFJvd0hlaWdodDtcbiAgICB2YXIgY3VycmVudEFuY2hvciA9IDA7XG4gICAgdmFyIGN1cnJlbnRCbG9ja0hlaWdodCA9IDA7XG4gICAgdmFyIGN1cnJlbnRCbG9jayA9IG1ha2VJZGVudGl0eSgpO1xuICAgIHZhciBjdXJyZW50Rmlyc3RSb3dJbmRleCA9IDA7XG4gICAgdmFyIGJsb2NrQ291bnRlciA9IDA7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHJvd0hlaWdodHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY3VycmVudFJvd0hlaWdodCA9IHJvd0hlaWdodHNbaV07XG4gICAgICAgIGN1cnJlbnRCbG9jay5yb3dzLnB1c2goe1xuICAgICAgICAgICAgcm93SW5kZXg6IGksXG4gICAgICAgICAgICByb3dIZWlnaHQ6IGN1cnJlbnRSb3dIZWlnaHRcbiAgICAgICAgfSk7XG4gICAgICAgIGN1cnJlbnRCbG9ja0hlaWdodCArPSBjdXJyZW50Um93SGVpZ2h0O1xuICAgICAgICBpZihjdXJyZW50QmxvY2tIZWlnaHQgPj0gbWluaW11bUZpbGxIZWlnaHQgfHwgaSA9PT0gcm93SGVpZ2h0cy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBhbmNob3JUb1Jvd0Jsb2NrW2N1cnJlbnRBbmNob3JdID0gY3VycmVudEJsb2NrO1xuICAgICAgICAgICAgY3VycmVudEJsb2NrLmtleSA9IGJsb2NrQ291bnRlcisrO1xuICAgICAgICAgICAgY3VycmVudEJsb2NrLmZpcnN0Um93SW5kZXggPSBjdXJyZW50Rmlyc3RSb3dJbmRleDtcbiAgICAgICAgICAgIGN1cnJlbnRCbG9jay5sYXN0Um93SW5kZXggPSBpO1xuICAgICAgICAgICAgY3VycmVudEJsb2NrID0gbWFrZUlkZW50aXR5KCk7XG4gICAgICAgICAgICBjdXJyZW50QW5jaG9yICs9IGN1cnJlbnRCbG9ja0hlaWdodDtcbiAgICAgICAgICAgIGN1cnJlbnRGaXJzdFJvd0luZGV4ID0gaSArIDE7XG4gICAgICAgICAgICBjdXJyZW50QmxvY2tIZWlnaHQgPSAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFuY2hvclRvUm93QmxvY2s7XG59XG5cbmZ1bmN0aW9uIG1ha2VJZGVudGl0eSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBmaXJzdFJvd0luZGV4OiBudWxsLFxuICAgICAgICBsYXN0Um93SW5kZXg6IG51bGwsXG4gICAgICAgIHJvd3M6IFtdXG4gICAgfTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxuLy8gcHVyZSBmdW5jdGlvbnMsIGRvbid0IGFsdGVyIGJ1dCBwYXNzZXMgb24gYGdkYCBhbmQgcGFydHMgb2YgYHRyYWNlYCB3aXRob3V0IGRlZXAgY29weWluZ1xuXG5leHBvcnRzLnNwbGl0VG9QYW5lbHMgPSBmdW5jdGlvbihkKSB7XG4gICAgdmFyIHByZXZQYWdlcyA9IFswLCAwXTtcbiAgICB2YXIgaGVhZGVyUGFuZWwgPSBleHRlbmRGbGF0KHt9LCBkLCB7XG4gICAgICAgIGtleTogJ2hlYWRlcicsXG4gICAgICAgIHR5cGU6ICdoZWFkZXInLFxuICAgICAgICBwYWdlOiAwLFxuICAgICAgICBwcmV2UGFnZXM6IHByZXZQYWdlcyxcbiAgICAgICAgY3VycmVudFJlcGFpbnQ6IFtudWxsLCBudWxsXSxcbiAgICAgICAgZHJhZ0hhbmRsZTogdHJ1ZSxcbiAgICAgICAgdmFsdWVzOiBkLmNhbGNkYXRhLmhlYWRlckNlbGxzLnZhbHVlc1tkLnNwZWNJbmRleF0sXG4gICAgICAgIHJvd0Jsb2NrczogZC5jYWxjZGF0YS5oZWFkZXJSb3dCbG9ja3MsXG4gICAgICAgIGNhbGNkYXRhOiBleHRlbmRGbGF0KHt9LCBkLmNhbGNkYXRhLCB7Y2VsbHM6IGQuY2FsY2RhdGEuaGVhZGVyQ2VsbHN9KVxuICAgIH0pO1xuICAgIHZhciByZXZvbHZlclBhbmVsMSA9IGV4dGVuZEZsYXQoe30sIGQsIHtcbiAgICAgICAga2V5OiAnY2VsbHMxJyxcbiAgICAgICAgdHlwZTogJ2NlbGxzJyxcbiAgICAgICAgcGFnZTogMCxcbiAgICAgICAgcHJldlBhZ2VzOiBwcmV2UGFnZXMsXG4gICAgICAgIGN1cnJlbnRSZXBhaW50OiBbbnVsbCwgbnVsbF0sXG4gICAgICAgIGRyYWdIYW5kbGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZXM6IGQuY2FsY2RhdGEuY2VsbHMudmFsdWVzW2Quc3BlY0luZGV4XSxcbiAgICAgICAgcm93QmxvY2tzOiBkLmNhbGNkYXRhLnJvd0Jsb2Nrc1xuICAgIH0pO1xuICAgIHZhciByZXZvbHZlclBhbmVsMiA9IGV4dGVuZEZsYXQoe30sIGQsIHtcbiAgICAgICAga2V5OiAnY2VsbHMyJyxcbiAgICAgICAgdHlwZTogJ2NlbGxzJyxcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgcHJldlBhZ2VzOiBwcmV2UGFnZXMsXG4gICAgICAgIGN1cnJlbnRSZXBhaW50OiBbbnVsbCwgbnVsbF0sXG4gICAgICAgIGRyYWdIYW5kbGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZXM6IGQuY2FsY2RhdGEuY2VsbHMudmFsdWVzW2Quc3BlY0luZGV4XSxcbiAgICAgICAgcm93QmxvY2tzOiBkLmNhbGNkYXRhLnJvd0Jsb2Nrc1xuICAgIH0pO1xuICAgIC8vIG9yZGVyIGR1ZSB0byBTVkcgdXNpbmcgcGFpbnRlcidzIGFsZ286XG4gICAgcmV0dXJuIFtyZXZvbHZlclBhbmVsMSwgcmV2b2x2ZXJQYW5lbDIsIGhlYWRlclBhbmVsXTtcbn07XG5cbmV4cG9ydHMuc3BsaXRUb0NlbGxzID0gZnVuY3Rpb24oZCkge1xuICAgIHZhciBmcm9tVG8gPSByb3dGcm9tVG8oZCk7XG4gICAgcmV0dXJuIChkLnZhbHVlcyB8fCBbXSkuc2xpY2UoZnJvbVRvWzBdLCBmcm9tVG9bMV0pLm1hcChmdW5jdGlvbih2LCBpKSB7XG4gICAgICAgIC8vIEJ5IGtlZXBpbmcgaWRlbnRpY2FsIGtleSwgYSBET00gbm9kZSByZW1vdmFsLCBjcmVhdGlvbiBhbmQgYWRkaXRpb24gaXMgc3BhcmVkLCBpbXBvcnRhbnQgd2hlbiB2aXNpYmxlXG4gICAgICAgIC8vIGdyaWQgaGFzIGEgbG90IG9mIGVsZW1lbnRzIChxdWFkcmF0aWMgd2l0aCB4Y29sL3ljb2wgY291bnQpLlxuICAgICAgICAvLyBCdXQgaXQgaGFzIHRvIGJlIGJ1c3RlZCB3aGVuIGBzdmdVdGlsLmNvbnZlcnRUb1RzcGFuc2AgaXMgdXNlZCBhcyBpdCByZXNoYXBlcyBjZWxsIHN1YnRyZWVzIGFzeW5jaHJvbm91c2x5LFxuICAgICAgICAvLyBhbmQgYnkgdGhhdCB0aW1lIHRoZSB1c2VyIG1heSBoYXZlIHNjcm9sbGVkIGF3YXksIHJlc3VsdGluZyBpbiBzdGFsZSBvdmVyd3JpdGVzLiBUaGUgcmVhbCBzb2x1dGlvbiB3aWxsIGJlXG4gICAgICAgIC8vIHRvIHR1cm4gYHN2Z1V0aWwuY29udmVydFRvVHNwYW5zYCBpbnRvIGEgY2FuY2VsYWJsZSByZXF1ZXN0LCBpbiB3aGljaCBjYXNlIG5vIGtleSBidXN0aW5nIGlzIG5lZWRlZC5cbiAgICAgICAgdmFyIGJ1c3RlciA9ICh0eXBlb2YgdiA9PT0gJ3N0cmluZycpICYmIHYubWF0Y2goL1s8JCY+IF0vKSA/ICdfa2V5YnVzdGVyXycgKyBNYXRoLnJhbmRvbSgpIDogJyc7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAvLyBrZXlXaXRoaW5CbG9jazogLypmcm9tVG9bMF0gKyAqL2ksIC8vIG9wdGltaXplZCBmdXR1cmUgdmVyc2lvbiAtIG5vIGJ1c3RpbmdcbiAgICAgICAgICAgIC8vIGtleVdpdGhpbkJsb2NrOiBmcm9tVG9bMF0gKyBpLCAvLyBpbml0aWFsIGFsd2F5cy11bm9wdGltaXplZCB2ZXJzaW9uIC0gamFua3kgc2Nyb2xsaW5nIHdpdGggNSsgY29sdW1uc1xuICAgICAgICAgICAga2V5V2l0aGluQmxvY2s6IGkgKyBidXN0ZXIsIC8vIGN1cnJlbnQgY29tcHJvbWlzZTogcmVndWxhciBjb250ZW50IGlzIHZlcnkgZmFzdDsgYXN5bmMgY29udGVudCBpcyBwb3NzaWJsZVxuICAgICAgICAgICAga2V5OiBmcm9tVG9bMF0gKyBpLFxuICAgICAgICAgICAgY29sdW1uOiBkLFxuICAgICAgICAgICAgY2FsY2RhdGE6IGQuY2FsY2RhdGEsXG4gICAgICAgICAgICBwYWdlOiBkLnBhZ2UsXG4gICAgICAgICAgICByb3dCbG9ja3M6IGQucm93QmxvY2tzLFxuICAgICAgICAgICAgdmFsdWU6IHZcbiAgICAgICAgfTtcbiAgICB9KTtcbn07XG5cbmZ1bmN0aW9uIHJvd0Zyb21UbyhkKSB7XG4gICAgdmFyIHJvd0Jsb2NrID0gZC5yb3dCbG9ja3NbZC5wYWdlXTtcbiAgICAvLyBmaXhtZSByb3dCbG9jayB0cnV0aGluZXNzIGNoZWNrIGlzIGR1ZSB0byB1Z2x5IGhhY2sgb2YgcGxhY2luZyAybmQgcGFuZWwgYXMgZC5wYWdlID0gLTFcbiAgICB2YXIgcm93RnJvbSA9IHJvd0Jsb2NrID8gcm93QmxvY2sucm93c1swXS5yb3dJbmRleCA6IDA7XG4gICAgdmFyIHJvd1RvID0gcm93QmxvY2sgPyByb3dGcm9tICsgcm93QmxvY2sucm93cy5sZW5ndGggOiAwO1xuICAgIHJldHVybiBbcm93RnJvbSwgcm93VG9dO1xufVxuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgTGliID0gcmVxdWlyZSgnLi4vLi4vbGliJyk7XG52YXIgYXR0cmlidXRlcyA9IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpO1xudmFyIGhhbmRsZURvbWFpbkRlZmF1bHRzID0gcmVxdWlyZSgnLi4vLi4vcGxvdHMvZG9tYWluJykuZGVmYXVsdHM7XG5cbmZ1bmN0aW9uIGRlZmF1bHRDb2x1bW5PcmRlcih0cmFjZU91dCwgY29lcmNlKSB7XG4gICAgdmFyIHNwZWNpZmllZENvbHVtbk9yZGVyID0gdHJhY2VPdXQuY29sdW1ub3JkZXIgfHwgW107XG4gICAgdmFyIGNvbW1vbkxlbmd0aCA9IHRyYWNlT3V0LmhlYWRlci52YWx1ZXMubGVuZ3RoO1xuICAgIHZhciB0cnVuY2F0ZWQgPSBzcGVjaWZpZWRDb2x1bW5PcmRlci5zbGljZSgwLCBjb21tb25MZW5ndGgpO1xuICAgIHZhciBzb3J0ZWQgPSB0cnVuY2F0ZWQuc2xpY2UoKS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtyZXR1cm4gYSAtIGI7fSk7XG4gICAgdmFyIG9uZVN0ZXBwZWQgPSB0cnVuY2F0ZWQubWFwKGZ1bmN0aW9uKGQpIHtyZXR1cm4gc29ydGVkLmluZGV4T2YoZCk7fSk7XG4gICAgZm9yKHZhciBpID0gb25lU3RlcHBlZC5sZW5ndGg7IGkgPCBjb21tb25MZW5ndGg7IGkrKykge1xuICAgICAgICBvbmVTdGVwcGVkLnB1c2goaSk7XG4gICAgfVxuICAgIGNvZXJjZSgnY29sdW1ub3JkZXInLCBvbmVTdGVwcGVkKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzdXBwbHlEZWZhdWx0cyh0cmFjZUluLCB0cmFjZU91dCwgZGVmYXVsdENvbG9yLCBsYXlvdXQpIHtcbiAgICBmdW5jdGlvbiBjb2VyY2UoYXR0ciwgZGZsdCkge1xuICAgICAgICByZXR1cm4gTGliLmNvZXJjZSh0cmFjZUluLCB0cmFjZU91dCwgYXR0cmlidXRlcywgYXR0ciwgZGZsdCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRG9tYWluRGVmYXVsdHModHJhY2VPdXQsIGxheW91dCwgY29lcmNlKTtcblxuICAgIGNvZXJjZSgnY29sdW1ud2lkdGgnKTtcblxuICAgIGNvZXJjZSgnaGVhZGVyLnZhbHVlcycpO1xuICAgIGNvZXJjZSgnaGVhZGVyLmZvcm1hdCcpO1xuICAgIGNvZXJjZSgnaGVhZGVyLmFsaWduJyk7XG5cbiAgICBjb2VyY2UoJ2hlYWRlci5wcmVmaXgnKTtcbiAgICBjb2VyY2UoJ2hlYWRlci5zdWZmaXgnKTtcbiAgICBjb2VyY2UoJ2hlYWRlci5oZWlnaHQnKTtcbiAgICBjb2VyY2UoJ2hlYWRlci5saW5lLndpZHRoJyk7XG4gICAgY29lcmNlKCdoZWFkZXIubGluZS5jb2xvcicpO1xuICAgIGNvZXJjZSgnaGVhZGVyLmZpbGwuY29sb3InKTtcbiAgICBMaWIuY29lcmNlRm9udChjb2VyY2UsICdoZWFkZXIuZm9udCcsIExpYi5leHRlbmRGbGF0KHt9LCBsYXlvdXQuZm9udCkpO1xuXG4gICAgZGVmYXVsdENvbHVtbk9yZGVyKHRyYWNlT3V0LCBjb2VyY2UpO1xuXG4gICAgY29lcmNlKCdjZWxscy52YWx1ZXMnKTtcbiAgICBjb2VyY2UoJ2NlbGxzLmZvcm1hdCcpO1xuICAgIGNvZXJjZSgnY2VsbHMuYWxpZ24nKTtcbiAgICBjb2VyY2UoJ2NlbGxzLnByZWZpeCcpO1xuICAgIGNvZXJjZSgnY2VsbHMuc3VmZml4Jyk7XG4gICAgY29lcmNlKCdjZWxscy5oZWlnaHQnKTtcbiAgICBjb2VyY2UoJ2NlbGxzLmxpbmUud2lkdGgnKTtcbiAgICBjb2VyY2UoJ2NlbGxzLmxpbmUuY29sb3InKTtcbiAgICBjb2VyY2UoJ2NlbGxzLmZpbGwuY29sb3InKTtcbiAgICBMaWIuY29lcmNlRm9udChjb2VyY2UsICdjZWxscy5mb250JywgTGliLmV4dGVuZEZsYXQoe30sIGxheW91dC5mb250KSk7XG5cbiAgICAvLyBkaXNhYmxlIDFEIHRyYW5zZm9ybXNcbiAgICB0cmFjZU91dC5fbGVuZ3RoID0gbnVsbDtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIGF0dHJpYnV0ZXM6IHJlcXVpcmUoJy4vYXR0cmlidXRlcycpLFxuICAgIHN1cHBseURlZmF1bHRzOiByZXF1aXJlKCcuL2RlZmF1bHRzJyksXG4gICAgY2FsYzogcmVxdWlyZSgnLi9jYWxjJyksXG4gICAgcGxvdDogcmVxdWlyZSgnLi9wbG90JyksXG5cbiAgICBtb2R1bGVUeXBlOiAndHJhY2UnLFxuICAgIG5hbWU6ICd0YWJsZScsXG4gICAgYmFzZVBsb3RNb2R1bGU6IHJlcXVpcmUoJy4vYmFzZV9wbG90JyksXG4gICAgY2F0ZWdvcmllczogWydub09wYWNpdHknXSxcbiAgICBtZXRhOiB7XG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGFibGUgdmlldyBmb3IgZGV0YWlsZWQgZGF0YSB2aWV3aW5nLicsXG4gICAgICAgICAgICAnVGhlIGRhdGEgYXJlIGFycmFuZ2VkIGluIGEgZ3JpZCBvZiByb3dzIGFuZCBjb2x1bW5zLicsXG4gICAgICAgICAgICAnTW9zdCBzdHlsaW5nIGNhbiBiZSBzcGVjaWZpZWQgZm9yIGNvbHVtbnMsIHJvd3Mgb3IgaW5kaXZpZHVhbCBjZWxscy4nLFxuICAgICAgICAgICAgJ1RhYmxlIGlzIHVzaW5nIGEgY29sdW1uLW1ham9yIG9yZGVyLCBpZS4gdGhlIGdyaWQgaXMgcmVwcmVzZW50ZWQgYXMgYSB2ZWN0b3Igb2YgY29sdW1uIHZlY3RvcnMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH1cbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBjID0gcmVxdWlyZSgnLi9jb25zdGFudHMnKTtcbnZhciBkMyA9IHJlcXVpcmUoJ2QzJyk7XG52YXIgZ3VwID0gcmVxdWlyZSgnLi4vLi4vbGliL2d1cCcpO1xudmFyIERyYXdpbmcgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2RyYXdpbmcnKTtcbnZhciBzdmdVdGlsID0gcmVxdWlyZSgnLi4vLi4vbGliL3N2Z190ZXh0X3V0aWxzJyk7XG52YXIgcmFpc2VUb1RvcCA9IHJlcXVpcmUoJy4uLy4uL2xpYicpLnJhaXNlVG9Ub3A7XG52YXIgY2FuY2VsRWVhc2VDb2x1bW4gPSByZXF1aXJlKCcuLi8uLi9saWInKS5jYW5jZWxUcmFuc2l0aW9uO1xudmFyIHByZXBhcmVEYXRhID0gcmVxdWlyZSgnLi9kYXRhX3ByZXBhcmF0aW9uX2hlbHBlcicpO1xudmFyIHNwbGl0RGF0YSA9IHJlcXVpcmUoJy4vZGF0YV9zcGxpdF9oZWxwZXJzJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gcGxvdChnZCwgd3JhcHBlZFRyYWNlSG9sZGVycykge1xuICAgIHZhciBkeW5hbWljID0gIWdkLl9jb250ZXh0LnN0YXRpY1Bsb3Q7XG5cbiAgICB2YXIgdGFibGUgPSBnZC5fZnVsbExheW91dC5fcGFwZXIuc2VsZWN0QWxsKCcuJyArIGMuY24udGFibGUpXG4gICAgICAgIC5kYXRhKHdyYXBwZWRUcmFjZUhvbGRlcnMubWFwKGZ1bmN0aW9uKHdyYXBwZWRUcmFjZUhvbGRlcikge1xuICAgICAgICAgICAgdmFyIHRyYWNlSG9sZGVyID0gZ3VwLnVud3JhcCh3cmFwcGVkVHJhY2VIb2xkZXIpO1xuICAgICAgICAgICAgdmFyIHRyYWNlID0gdHJhY2VIb2xkZXIudHJhY2U7XG4gICAgICAgICAgICByZXR1cm4gcHJlcGFyZURhdGEoZ2QsIHRyYWNlKTtcbiAgICAgICAgfSksIGd1cC5rZXlGdW4pO1xuXG4gICAgdGFibGUuZXhpdCgpLnJlbW92ZSgpO1xuXG4gICAgdGFibGUuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi50YWJsZSwgdHJ1ZSlcbiAgICAgICAgLmF0dHIoJ292ZXJmbG93JywgJ3Zpc2libGUnKVxuICAgICAgICAuc3R5bGUoJ2JveC1zaXppbmcnLCAnY29udGVudC1ib3gnKVxuICAgICAgICAuc3R5bGUoJ3Bvc2l0aW9uJywgJ2Fic29sdXRlJylcbiAgICAgICAgLnN0eWxlKCdsZWZ0JywgMClcbiAgICAgICAgLnN0eWxlKCdvdmVyZmxvdycsICd2aXNpYmxlJylcbiAgICAgICAgLnN0eWxlKCdzaGFwZS1yZW5kZXJpbmcnLCAnY3Jpc3BFZGdlcycpXG4gICAgICAgIC5zdHlsZSgncG9pbnRlci1ldmVudHMnLCAnYWxsJyk7XG5cbiAgICB0YWJsZVxuICAgICAgICAuYXR0cignd2lkdGgnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQud2lkdGggKyBkLnNpemUubCArIGQuc2l6ZS5yO30pXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQuaGVpZ2h0ICsgZC5zaXplLnQgKyBkLnNpemUuYjt9KVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIGQudHJhbnNsYXRlWCArICcsJyArIGQudHJhbnNsYXRlWSArICcpJztcbiAgICAgICAgfSk7XG5cbiAgICB2YXIgdGFibGVDb250cm9sVmlldyA9IHRhYmxlLnNlbGVjdEFsbCgnLicgKyBjLmNuLnRhYmxlQ29udHJvbFZpZXcpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGd1cC5rZXlGdW4pO1xuXG4gICAgdmFyIGN2RW50ZXIgPSB0YWJsZUNvbnRyb2xWaWV3LmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24udGFibGVDb250cm9sVmlldywgdHJ1ZSlcbiAgICAgICAgLnN0eWxlKCdib3gtc2l6aW5nJywgJ2NvbnRlbnQtYm94Jyk7XG4gICAgaWYoZHluYW1pYykge1xuICAgICAgICBjdkVudGVyXG4gICAgICAgICAgICAub24oJ21vdXNlbW92ZScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICB0YWJsZUNvbnRyb2xWaWV3XG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoZnVuY3Rpb24oZGQpIHtyZXR1cm4gZCA9PT0gZGQ7fSlcbiAgICAgICAgICAgICAgICAgICAgLmNhbGwocmVuZGVyU2Nyb2xsYmFyS2l0LCBnZCk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdtb3VzZXdoZWVsJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGlmKGQuc2Nyb2xsYmFyU3RhdGUud2hlZWxpbmcpIHJldHVybjtcbiAgICAgICAgICAgICAgICBkLnNjcm9sbGJhclN0YXRlLndoZWVsaW5nID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB2YXIgbmV3WSA9IGQuc2Nyb2xsWSArIGQzLmV2ZW50LmRlbHRhWTtcbiAgICAgICAgICAgICAgICB2YXIgbm9DaGFuZ2UgPSBtYWtlRHJhZ1JvdyhnZCwgdGFibGVDb250cm9sVmlldywgbnVsbCwgbmV3WSkoZCk7XG4gICAgICAgICAgICAgICAgaWYoIW5vQ2hhbmdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICBkMy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkLnNjcm9sbGJhclN0YXRlLndoZWVsaW5nID0gZmFsc2U7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmNhbGwocmVuZGVyU2Nyb2xsYmFyS2l0LCBnZCwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgdGFibGVDb250cm9sVmlld1xuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge3JldHVybiAndHJhbnNsYXRlKCcgKyBkLnNpemUubCArICcgJyArIGQuc2l6ZS50ICsgJyknO30pO1xuXG4gICAgLy8gc2Nyb2xsQmFja2dyb3VuZCBtZXJlbHkgZW5zdXJlcyB0aGF0IG1vdXNlIGV2ZW50cyBhcmUgY2FwdHVyZWQgZXZlbiBvbiBjcmF6eSBmYXN0IHNjcm9sbHdoZWVsaW5nXG4gICAgLy8gb3RoZXJ3aXNlIHJlbmRlcmluZyBnbGl0Y2hlcyBtYXkgb2NjdXJcbiAgICB2YXIgc2Nyb2xsQmFja2dyb3VuZCA9IHRhYmxlQ29udHJvbFZpZXcuc2VsZWN0QWxsKCcuJyArIGMuY24uc2Nyb2xsQmFja2dyb3VuZClcbiAgICAgICAgLmRhdGEoZ3VwLnJlcGVhdCwgZ3VwLmtleUZ1bik7XG5cbiAgICBzY3JvbGxCYWNrZ3JvdW5kLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uc2Nyb2xsQmFja2dyb3VuZCwgdHJ1ZSlcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpO1xuXG4gICAgc2Nyb2xsQmFja2dyb3VuZFxuICAgICAgICAuYXR0cignd2lkdGgnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQud2lkdGg7fSlcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5oZWlnaHQ7fSk7XG5cbiAgICB0YWJsZUNvbnRyb2xWaWV3LmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICBEcmF3aW5nLnNldENsaXBVcmwoZDMuc2VsZWN0KHRoaXMpLCBzY3JvbGxBcmVhQm90dG9tQ2xpcEtleShnZCwgZCksIGdkKTtcbiAgICB9KTtcblxuICAgIHZhciB5Q29sdW1uID0gdGFibGVDb250cm9sVmlldy5zZWxlY3RBbGwoJy4nICsgYy5jbi55Q29sdW1uKVxuICAgICAgICAuZGF0YShmdW5jdGlvbih2bSkge3JldHVybiB2bS5jb2x1bW5zO30sIGd1cC5rZXlGdW4pO1xuXG4gICAgeUNvbHVtbi5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLnlDb2x1bW4sIHRydWUpO1xuXG4gICAgeUNvbHVtbi5leGl0KCkucmVtb3ZlKCk7XG5cbiAgICB5Q29sdW1uLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gJ3RyYW5zbGF0ZSgnICsgZC54ICsgJyAwKSc7fSk7XG5cbiAgICBpZihkeW5hbWljKSB7XG4gICAgICAgIHlDb2x1bW4uY2FsbChkMy5iZWhhdmlvci5kcmFnKClcbiAgICAgICAgICAgIC5vcmlnaW4oZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHZhciBtb3ZlZENvbHVtbiA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgICAgICAgICBlYXNlQ29sdW1uKG1vdmVkQ29sdW1uLCBkLCAtYy51cGxpZnQpO1xuICAgICAgICAgICAgICAgIHJhaXNlVG9Ub3AodGhpcyk7XG4gICAgICAgICAgICAgICAgZC5jYWxjZGF0YS5jb2x1bW5EcmFnSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmVuZGVyU2Nyb2xsYmFyS2l0KHRhYmxlQ29udHJvbFZpZXcuZmlsdGVyKGZ1bmN0aW9uKGRkKSB7cmV0dXJuIGQuY2FsY2RhdGEua2V5ID09PSBkZC5rZXk7fSksIGdkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2RyYWcnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1vdmVkQ29sdW1uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBnZXR0ZXIgPSBmdW5jdGlvbihkZCkge3JldHVybiAoZCA9PT0gZGQgPyBkMy5ldmVudC54IDogZGQueCkgKyBkZC5jb2x1bW5XaWR0aCAvIDI7fTtcbiAgICAgICAgICAgICAgICBkLnggPSBNYXRoLm1heCgtYy5vdmVyZHJhZywgTWF0aC5taW4oZC5jYWxjZGF0YS53aWR0aCArIGMub3ZlcmRyYWcgLSBkLmNvbHVtbldpZHRoLCBkMy5ldmVudC54KSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgc29ydGFibGVDb2x1bW5zID0gZmxhdERhdGEoeUNvbHVtbikuZmlsdGVyKGZ1bmN0aW9uKGRkKSB7cmV0dXJuIGRkLmNhbGNkYXRhLmtleSA9PT0gZC5jYWxjZGF0YS5rZXk7fSk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld09yZGVyID0gc29ydGFibGVDb2x1bW5zLnNvcnQoZnVuY3Rpb24oYSwgYikge3JldHVybiBnZXR0ZXIoYSkgLSBnZXR0ZXIoYik7fSk7XG4gICAgICAgICAgICAgICAgbmV3T3JkZXIuZm9yRWFjaChmdW5jdGlvbihkZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICBkZC54SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBkZC54ID0gZCA9PT0gZGQgPyBkZC54IDogZGQueFNjYWxlKGRkKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHlDb2x1bW4uZmlsdGVyKGZ1bmN0aW9uKGRkKSB7cmV0dXJuIGQgIT09IGRkO30pXG4gICAgICAgICAgICAgICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgICAgICAgICAgICAgLmVhc2UoYy50cmFuc2l0aW9uRWFzZSlcbiAgICAgICAgICAgICAgICAgICAgLmR1cmF0aW9uKGMudHJhbnNpdGlvbkR1cmF0aW9uKVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge3JldHVybiAndHJhbnNsYXRlKCcgKyBkLnggKyAnIDApJzt9KTtcbiAgICAgICAgICAgICAgICBtb3ZlZENvbHVtblxuICAgICAgICAgICAgICAgICAgICAuY2FsbChjYW5jZWxFZWFzZUNvbHVtbilcbiAgICAgICAgICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIGQueCArICcgLScgKyBjLnVwbGlmdCArICcgKScpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5vbignZHJhZ2VuZCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbW92ZWRDb2x1bW4gPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBkLmNhbGNkYXRhO1xuICAgICAgICAgICAgICAgIGQueCA9IGQueFNjYWxlKGQpO1xuICAgICAgICAgICAgICAgIGQuY2FsY2RhdGEuY29sdW1uRHJhZ0luUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBlYXNlQ29sdW1uKG1vdmVkQ29sdW1uLCBkLCAwKTtcbiAgICAgICAgICAgICAgICBjb2x1bW5Nb3ZlZChnZCwgcCwgcC5jb2x1bW5zLm1hcChmdW5jdGlvbihkZCkge3JldHVybiBkZC54SW5kZXg7fSkpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICB5Q29sdW1uLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICBEcmF3aW5nLnNldENsaXBVcmwoZDMuc2VsZWN0KHRoaXMpLCBjb2x1bW5Cb3VuZGFyeUNsaXBLZXkoZ2QsIGQpLCBnZCk7XG4gICAgfSk7XG5cbiAgICB2YXIgY29sdW1uQmxvY2sgPSB5Q29sdW1uLnNlbGVjdEFsbCgnLicgKyBjLmNuLmNvbHVtbkJsb2NrKVxuICAgICAgICAuZGF0YShzcGxpdERhdGEuc3BsaXRUb1BhbmVscywgZ3VwLmtleUZ1bik7XG5cbiAgICBjb2x1bW5CbG9jay5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ2cnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLmNvbHVtbkJsb2NrLCB0cnVlKVxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQua2V5O30pO1xuXG4gICAgY29sdW1uQmxvY2tcbiAgICAgICAgLnN0eWxlKCdjdXJzb3InLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5kcmFnSGFuZGxlID8gJ2V3LXJlc2l6ZScgOiBkLmNhbGNkYXRhLnNjcm9sbGJhclN0YXRlLmJhcldpZ2dsZVJvb20gPyAnbnMtcmVzaXplJyA6ICdkZWZhdWx0JztcbiAgICAgICAgfSk7XG5cbiAgICB2YXIgaGVhZGVyQ29sdW1uQmxvY2sgPSBjb2x1bW5CbG9jay5maWx0ZXIoaGVhZGVyQmxvY2spO1xuICAgIHZhciBjZWxsc0NvbHVtbkJsb2NrID0gY29sdW1uQmxvY2suZmlsdGVyKGNlbGxzQmxvY2spO1xuXG4gICAgaWYoZHluYW1pYykge1xuICAgICAgICBjZWxsc0NvbHVtbkJsb2NrLmNhbGwoZDMuYmVoYXZpb3IuZHJhZygpXG4gICAgICAgICAgICAub3JpZ2luKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAub24oJ2RyYWcnLCBtYWtlRHJhZ1JvdyhnZCwgdGFibGVDb250cm9sVmlldywgLTEpKVxuICAgICAgICAgICAgLm9uKCdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gZml4bWUgZW1pdCBwbG90bHkgbm90aWZpY2F0aW9uXG4gICAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8vIGluaXRpYWwgcmVuZGVyaW5nOiBoZWFkZXIgaXMgcmVuZGVyZWQgZmlyc3QsIGFzIGl0IG1heSBtYXkgaGF2ZSBhc3luYyBMYVRlWCAoc2hvdyBoZWFkZXIgZmlyc3QpXG4gICAgLy8gYnV0IGJsb2NrcyBhcmUgX2VudGVyZWRfIHRoZSB3YXkgdGhleSBhcmUgZHVlIHRvIHBhaW50ZXIncyBhbGdvIChoZWFkZXIgb24gdG9wKVxuICAgIHJlbmRlckNvbHVtbkNlbGxUcmVlKGdkLCB0YWJsZUNvbnRyb2xWaWV3LCBoZWFkZXJDb2x1bW5CbG9jaywgY29sdW1uQmxvY2spO1xuICAgIHJlbmRlckNvbHVtbkNlbGxUcmVlKGdkLCB0YWJsZUNvbnRyb2xWaWV3LCBjZWxsc0NvbHVtbkJsb2NrLCBjb2x1bW5CbG9jayk7XG5cbiAgICB2YXIgc2Nyb2xsQXJlYUNsaXAgPSB0YWJsZUNvbnRyb2xWaWV3LnNlbGVjdEFsbCgnLicgKyBjLmNuLnNjcm9sbEFyZWFDbGlwKVxuICAgICAgICAuZGF0YShndXAucmVwZWF0LCBndXAua2V5RnVuKTtcblxuICAgIHNjcm9sbEFyZWFDbGlwLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnY2xpcFBhdGgnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLnNjcm9sbEFyZWFDbGlwLCB0cnVlKVxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7cmV0dXJuIHNjcm9sbEFyZWFCb3R0b21DbGlwS2V5KGdkLCBkKTt9KTtcblxuICAgIHZhciBzY3JvbGxBcmVhQ2xpcFJlY3QgPSBzY3JvbGxBcmVhQ2xpcC5zZWxlY3RBbGwoJy4nICsgYy5jbi5zY3JvbGxBcmVhQ2xpcFJlY3QpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGd1cC5rZXlGdW4pO1xuXG4gICAgc2Nyb2xsQXJlYUNsaXBSZWN0LmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uc2Nyb2xsQXJlYUNsaXBSZWN0LCB0cnVlKVxuICAgICAgICAuYXR0cigneCcsIC1jLm92ZXJkcmFnKVxuICAgICAgICAuYXR0cigneScsIC1jLnVwbGlmdClcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnbm9uZScpO1xuXG4gICAgc2Nyb2xsQXJlYUNsaXBSZWN0XG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC53aWR0aCArIDIgKiBjLm92ZXJkcmFnO30pXG4gICAgICAgIC5hdHRyKCdoZWlnaHQnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQuaGVpZ2h0ICsgYy51cGxpZnQ7fSk7XG5cbiAgICB2YXIgY29sdW1uQm91bmRhcnkgPSB5Q29sdW1uLnNlbGVjdEFsbCgnLicgKyBjLmNuLmNvbHVtbkJvdW5kYXJ5KVxuICAgICAgICAuZGF0YShndXAucmVwZWF0LCBndXAua2V5RnVuKTtcblxuICAgIGNvbHVtbkJvdW5kYXJ5LmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uY29sdW1uQm91bmRhcnksIHRydWUpO1xuXG4gICAgdmFyIGNvbHVtbkJvdW5kYXJ5Q2xpcHBhdGggPSB5Q29sdW1uLnNlbGVjdEFsbCgnLicgKyBjLmNuLmNvbHVtbkJvdW5kYXJ5Q2xpcHBhdGgpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGd1cC5rZXlGdW4pO1xuXG4gICAgLy8gU1ZHIHNwZWMgZG9lc24ndCBtYW5kYXRlIHdyYXBwaW5nIGludG8gYSA8ZGVmcz4gYW5kIGRvZXNuJ3Qgc2VlbSB0byBjYXVzZSBhIHNwZWVkIGRpZmZlcmVuY2VcbiAgICBjb2x1bW5Cb3VuZGFyeUNsaXBwYXRoLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnY2xpcFBhdGgnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLmNvbHVtbkJvdW5kYXJ5Q2xpcHBhdGgsIHRydWUpO1xuXG4gICAgY29sdW1uQm91bmRhcnlDbGlwcGF0aFxuICAgICAgICAuYXR0cignaWQnLCBmdW5jdGlvbihkKSB7cmV0dXJuIGNvbHVtbkJvdW5kYXJ5Q2xpcEtleShnZCwgZCk7fSk7XG5cbiAgICB2YXIgY29sdW1uQm91bmRhcnlSZWN0ID0gY29sdW1uQm91bmRhcnlDbGlwcGF0aC5zZWxlY3RBbGwoJy4nICsgYy5jbi5jb2x1bW5Cb3VuZGFyeVJlY3QpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGd1cC5rZXlGdW4pO1xuXG4gICAgY29sdW1uQm91bmRhcnlSZWN0LmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uY29sdW1uQm91bmRhcnlSZWN0LCB0cnVlKVxuICAgICAgICAuYXR0cignZmlsbCcsICdub25lJyk7XG5cbiAgICBjb2x1bW5Cb3VuZGFyeVJlY3RcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24oZCkgeyByZXR1cm4gZC5jb2x1bW5XaWR0aCArIDIgKiByb3VuZEhhbGZXaWR0aChkKTsgfSlcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5jYWxjZGF0YS5oZWlnaHQgKyAyICogcm91bmRIYWxmV2lkdGgoZCkgKyBjLnVwbGlmdDt9KVxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQpIHsgcmV0dXJuIC1yb3VuZEhhbGZXaWR0aChkKTsgfSlcbiAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7IHJldHVybiAtcm91bmRIYWxmV2lkdGgoZCk7IH0pO1xuXG4gICAgdXBkYXRlQmxvY2tZUG9zaXRpb24obnVsbCwgY2VsbHNDb2x1bW5CbG9jaywgdGFibGVDb250cm9sVmlldyk7XG59O1xuXG5mdW5jdGlvbiByb3VuZEhhbGZXaWR0aChkKSB7XG4gICAgcmV0dXJuIE1hdGguY2VpbChkLmNhbGNkYXRhLm1heExpbmVXaWR0aCAvIDIpO1xufVxuXG5mdW5jdGlvbiBzY3JvbGxBcmVhQm90dG9tQ2xpcEtleShnZCwgZCkge1xuICAgIHJldHVybiAnY2xpcCcgKyBnZC5fZnVsbExheW91dC5fdWlkICsgJ19zY3JvbGxBcmVhQm90dG9tQ2xpcF8nICsgZC5rZXk7XG59XG5cbmZ1bmN0aW9uIGNvbHVtbkJvdW5kYXJ5Q2xpcEtleShnZCwgZCkge1xuICAgIHJldHVybiAnY2xpcCcgKyBnZC5fZnVsbExheW91dC5fdWlkICsgJ19jb2x1bW5Cb3VuZGFyeUNsaXBwYXRoXycgKyBkLmNhbGNkYXRhLmtleSArICdfJyArIGQuc3BlY0luZGV4O1xufVxuXG5mdW5jdGlvbiBmbGF0RGF0YShzZWxlY3Rpb24pIHtcbiAgICByZXR1cm4gW10uY29uY2F0LmFwcGx5KFtdLCBzZWxlY3Rpb24ubWFwKGZ1bmN0aW9uKGcpIHtyZXR1cm4gZzt9KSlcbiAgICAgICAgLm1hcChmdW5jdGlvbihnKSB7cmV0dXJuIGcuX19kYXRhX187fSk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlclNjcm9sbGJhcktpdCh0YWJsZUNvbnRyb2xWaWV3LCBnZCwgYnlwYXNzVmlzaWJsZUJhcikge1xuICAgIGZ1bmN0aW9uIGNhbGNUb3RhbEhlaWdodChkKSB7XG4gICAgICAgIHZhciBibG9ja3MgPSBkLnJvd0Jsb2NrcztcbiAgICAgICAgcmV0dXJuIGZpcnN0Um93QW5jaG9yKGJsb2NrcywgYmxvY2tzLmxlbmd0aCAtIDEpICsgKGJsb2Nrcy5sZW5ndGggPyByb3dzSGVpZ2h0KGJsb2Nrc1tibG9ja3MubGVuZ3RoIC0gMV0sIEluZmluaXR5KSA6IDEpO1xuICAgIH1cblxuICAgIHZhciBzY3JvbGxiYXJLaXQgPSB0YWJsZUNvbnRyb2xWaWV3LnNlbGVjdEFsbCgnLicgKyBjLmNuLnNjcm9sbGJhcktpdClcbiAgICAgICAgLmRhdGEoZ3VwLnJlcGVhdCwgZ3VwLmtleUZ1bik7XG5cbiAgICBzY3JvbGxiYXJLaXQuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5zY3JvbGxiYXJLaXQsIHRydWUpXG4gICAgICAgIC5zdHlsZSgnc2hhcGUtcmVuZGVyaW5nJywgJ2dlb21ldHJpY1ByZWNpc2lvbicpO1xuXG4gICAgc2Nyb2xsYmFyS2l0XG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHZhciBzID0gZC5zY3JvbGxiYXJTdGF0ZTtcbiAgICAgICAgICAgIHMudG90YWxIZWlnaHQgPSBjYWxjVG90YWxIZWlnaHQoZCk7XG4gICAgICAgICAgICBzLnNjcm9sbGFibGVBcmVhSGVpZ2h0ID0gZC5ncm91cEhlaWdodCAtIGhlYWRlckhlaWdodChkKTtcbiAgICAgICAgICAgIHMuY3VycmVudGx5VmlzaWJsZUhlaWdodCA9IE1hdGgubWluKHMudG90YWxIZWlnaHQsIHMuc2Nyb2xsYWJsZUFyZWFIZWlnaHQpO1xuICAgICAgICAgICAgcy5yYXRpbyA9IHMuY3VycmVudGx5VmlzaWJsZUhlaWdodCAvIHMudG90YWxIZWlnaHQ7XG4gICAgICAgICAgICBzLmJhckxlbmd0aCA9IE1hdGgubWF4KHMucmF0aW8gKiBzLmN1cnJlbnRseVZpc2libGVIZWlnaHQsIGMuZ29sZGVuUmF0aW8gKiBjLnNjcm9sbGJhcldpZHRoKTtcbiAgICAgICAgICAgIHMuYmFyV2lnZ2xlUm9vbSA9IHMuY3VycmVudGx5VmlzaWJsZUhlaWdodCAtIHMuYmFyTGVuZ3RoO1xuICAgICAgICAgICAgcy53aWdnbGVSb29tID0gTWF0aC5tYXgoMCwgcy50b3RhbEhlaWdodCAtIHMuc2Nyb2xsYWJsZUFyZWFIZWlnaHQpO1xuICAgICAgICAgICAgcy50b3BZID0gcy5iYXJXaWdnbGVSb29tID09PSAwID8gMCA6IChkLnNjcm9sbFkgLyBzLndpZ2dsZVJvb20pICogcy5iYXJXaWdnbGVSb29tO1xuICAgICAgICAgICAgcy5ib3R0b21ZID0gcy50b3BZICsgcy5iYXJMZW5ndGg7XG4gICAgICAgICAgICBzLmRyYWdNdWx0aXBsaWVyID0gcy53aWdnbGVSb29tIC8gcy5iYXJXaWdnbGVSb29tO1xuICAgICAgICB9KVxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHhQb3NpdGlvbiA9IGQud2lkdGggKyBjLnNjcm9sbGJhcldpZHRoIC8gMiArIGMuc2Nyb2xsYmFyT2Zmc2V0O1xuICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoJyArIHhQb3NpdGlvbiArICcgJyArIGhlYWRlckhlaWdodChkKSArICcpJztcbiAgICAgICAgfSk7XG5cbiAgICB2YXIgc2Nyb2xsYmFyID0gc2Nyb2xsYmFyS2l0LnNlbGVjdEFsbCgnLicgKyBjLmNuLnNjcm9sbGJhcilcbiAgICAgICAgLmRhdGEoZ3VwLnJlcGVhdCwgZ3VwLmtleUZ1bik7XG5cbiAgICBzY3JvbGxiYXIuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5zY3JvbGxiYXIsIHRydWUpO1xuXG4gICAgdmFyIHNjcm9sbGJhclNsaWRlciA9IHNjcm9sbGJhci5zZWxlY3RBbGwoJy4nICsgYy5jbi5zY3JvbGxiYXJTbGlkZXIpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGd1cC5rZXlGdW4pO1xuXG4gICAgc2Nyb2xsYmFyU2xpZGVyLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uc2Nyb2xsYmFyU2xpZGVyLCB0cnVlKTtcblxuICAgIHNjcm9sbGJhclNsaWRlclxuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuICd0cmFuc2xhdGUoMCAnICsgKGQuc2Nyb2xsYmFyU3RhdGUudG9wWSB8fCAwKSArICcpJztcbiAgICAgICAgfSk7XG5cbiAgICB2YXIgc2Nyb2xsYmFyR2x5cGggPSBzY3JvbGxiYXJTbGlkZXIuc2VsZWN0QWxsKCcuJyArIGMuY24uc2Nyb2xsYmFyR2x5cGgpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGd1cC5rZXlGdW4pO1xuXG4gICAgc2Nyb2xsYmFyR2x5cGguZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5zY3JvbGxiYXJHbHlwaCwgdHJ1ZSlcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsICdibGFjaycpXG4gICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCBjLnNjcm9sbGJhcldpZHRoKVxuICAgICAgICAuYXR0cignc3Ryb2tlLWxpbmVjYXAnLCAncm91bmQnKVxuICAgICAgICAuYXR0cigneTEnLCBjLnNjcm9sbGJhcldpZHRoIC8gMik7XG5cbiAgICBzY3JvbGxiYXJHbHlwaFxuICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5zY3JvbGxiYXJTdGF0ZS5iYXJMZW5ndGggLSBjLnNjcm9sbGJhcldpZHRoIC8gMjtcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuY29sdW1uRHJhZ0luUHJvZ3Jlc3MgfHwgIWQuc2Nyb2xsYmFyU3RhdGUuYmFyV2lnZ2xlUm9vbSB8fCBieXBhc3NWaXNpYmxlQmFyID8gMCA6IDAuNDtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBjYW5jZWwgdHJhbnNpdGlvbjogcG9zc2libGUgcGVuZGluZyAoYWxzbywgZGVsYXllZCkgdHJhbnNpdGlvblxuICAgIHNjcm9sbGJhckdseXBoXG4gICAgICAgIC50cmFuc2l0aW9uKCkuZGVsYXkoMCkuZHVyYXRpb24oMCk7XG5cbiAgICBzY3JvbGxiYXJHbHlwaFxuICAgICAgICAudHJhbnNpdGlvbigpLmRlbGF5KGMuc2Nyb2xsYmFySGlkZURlbGF5KS5kdXJhdGlvbihjLnNjcm9sbGJhckhpZGVEdXJhdGlvbilcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS1vcGFjaXR5JywgMCk7XG5cbiAgICB2YXIgc2Nyb2xsYmFyQ2FwdHVyZVpvbmUgPSBzY3JvbGxiYXIuc2VsZWN0QWxsKCcuJyArIGMuY24uc2Nyb2xsYmFyQ2FwdHVyZVpvbmUpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGd1cC5rZXlGdW4pO1xuXG4gICAgc2Nyb2xsYmFyQ2FwdHVyZVpvbmUuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdsaW5lJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5zY3JvbGxiYXJDYXB0dXJlWm9uZSwgdHJ1ZSlcbiAgICAgICAgLmF0dHIoJ3N0cm9rZScsICd3aGl0ZScpXG4gICAgICAgIC5hdHRyKCdzdHJva2Utb3BhY2l0eScsIDAuMDEpIC8vIHNvbWUgYnJvd3NlciBtaWdodCBnZXQgcmlkIG9mIGEgMCBvcGFjaXR5IGVsZW1lbnRcbiAgICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGMuc2Nyb2xsYmFyQ2FwdHVyZVdpZHRoKVxuICAgICAgICAuYXR0cignc3Ryb2tlLWxpbmVjYXAnLCAnYnV0dCcpXG4gICAgICAgIC5hdHRyKCd5MScsIDApXG4gICAgICAgIC5vbignbW91c2Vkb3duJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHkgPSBkMy5ldmVudC55O1xuICAgICAgICAgICAgdmFyIGJib3ggPSB0aGlzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgdmFyIHMgPSBkLnNjcm9sbGJhclN0YXRlO1xuICAgICAgICAgICAgdmFyIHBpeGVsVmFsID0geSAtIGJib3gudG9wO1xuICAgICAgICAgICAgdmFyIGludmVyc2VTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpLmRvbWFpbihbMCwgcy5zY3JvbGxhYmxlQXJlYUhlaWdodF0pLnJhbmdlKFswLCBzLnRvdGFsSGVpZ2h0XSkuY2xhbXAodHJ1ZSk7XG4gICAgICAgICAgICBpZighKHMudG9wWSA8PSBwaXhlbFZhbCAmJiBwaXhlbFZhbCA8PSBzLmJvdHRvbVkpKSB7XG4gICAgICAgICAgICAgICAgbWFrZURyYWdSb3coZ2QsIHRhYmxlQ29udHJvbFZpZXcsIG51bGwsIGludmVyc2VTY2FsZShwaXhlbFZhbCAtIHMuYmFyTGVuZ3RoIC8gMikpKGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAuY2FsbChkMy5iZWhhdmlvci5kcmFnKClcbiAgICAgICAgICAgIC5vcmlnaW4oZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIGQzLmV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgIGQuc2Nyb2xsYmFyU3RhdGUuc2Nyb2xsYmFyU2Nyb2xsSW5Qcm9ncmVzcyA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLm9uKCdkcmFnJywgbWFrZURyYWdSb3coZ2QsIHRhYmxlQ29udHJvbFZpZXcpKVxuICAgICAgICAgICAgLm9uKCdkcmFnZW5kJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgLy8gZml4bWUgZW1pdCBQbG90bHkgZXZlbnRcbiAgICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICBzY3JvbGxiYXJDYXB0dXJlWm9uZVxuICAgICAgICAuYXR0cigneTInLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gZC5zY3JvbGxiYXJTdGF0ZS5zY3JvbGxhYmxlQXJlYUhlaWdodDtcbiAgICAgICAgfSk7XG5cbiAgICAvLyBSZW1vdmUgc2Nyb2xsIGdseXBoIGFuZCBjYXB0dXJlIHpvbmUgb24gc3RhdGljIHBsb3RzXG4gICAgLy8gYXMgdGhleSBkb24ndCByZW5kZXIgcHJvcGVybHkgd2hlbiBjb252ZXJ0ZWQgdG8gUERGXG4gICAgLy8gaW4gdGhlIENocm9tZSBQREYgdmlld2VyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9zdHJlYW1iZWQvaXNzdWVzLzExNjE4XG4gICAgaWYoZ2QuX2NvbnRleHQuc3RhdGljUGxvdCkge1xuICAgICAgICBzY3JvbGxiYXJHbHlwaC5yZW1vdmUoKTtcbiAgICAgICAgc2Nyb2xsYmFyQ2FwdHVyZVpvbmUucmVtb3ZlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiByZW5kZXJDb2x1bW5DZWxsVHJlZShnZCwgdGFibGVDb250cm9sVmlldywgY29sdW1uQmxvY2ssIGFsbENvbHVtbkJsb2NrKSB7XG4gICAgLy8gZml4bWUgdGhpcyBwZXJmIGhvdHNwb3RcbiAgICAvLyB0aGlzIGlzIHBlcmZvcm1hbmNlIGNyaXRpY2FsIGNvZGUgYXMgc2Nyb2xsaW5nIGNhbGxzIGl0IG9uIGV2ZXJ5IHJldm9sdmVyIHN3aXRjaFxuICAgIC8vIGl0IGFwcGVhcnMgc3VmZmljaWVudGx5IGZhc3QgYnV0IHRoZXJlIGFyZSBwbGVudHkgb2YgbG93LWhhbmdpbmcgZnJ1aXRzIGZvciBwZXJmb3JtYW5jZSBvcHRpbWl6YXRpb25cblxuICAgIHZhciBjb2x1bW5DZWxscyA9IHJlbmRlckNvbHVtbkNlbGxzKGNvbHVtbkJsb2NrKTtcblxuICAgIHZhciBjb2x1bW5DZWxsID0gcmVuZGVyQ29sdW1uQ2VsbChjb2x1bW5DZWxscyk7XG5cbiAgICBzdXBwbHlTdHlsaW5nVmFsdWVzKGNvbHVtbkNlbGwpO1xuXG4gICAgdmFyIGNlbGxSZWN0ID0gcmVuZGVyQ2VsbFJlY3QoY29sdW1uQ2VsbCk7XG5cbiAgICBzaXplQW5kU3R5bGVSZWN0KGNlbGxSZWN0KTtcblxuICAgIHZhciBjZWxsVGV4dEhvbGRlciA9IHJlbmRlckNlbGxUZXh0SG9sZGVyKGNvbHVtbkNlbGwpO1xuXG4gICAgdmFyIGNlbGxUZXh0ID0gcmVuZGVyQ2VsbFRleHQoY2VsbFRleHRIb2xkZXIpO1xuXG4gICAgc2V0Rm9udChjZWxsVGV4dCk7XG4gICAgcG9wdWxhdGVDZWxsVGV4dChjZWxsVGV4dCwgdGFibGVDb250cm9sVmlldywgYWxsQ29sdW1uQmxvY2ssIGdkKTtcblxuICAgIC8vIGRvaW5nIHRoaXMgYXQgdGhlIGVuZCB3aGVuIHRleHQsIGFuZCB0ZXh0IHN0bHlpbmcgYXJlIHNldFxuICAgIHNldENlbGxIZWlnaHRBbmRQb3NpdGlvblkoY29sdW1uQ2VsbCk7XG59XG5cbmZ1bmN0aW9uIHJlbmRlckNvbHVtbkNlbGxzKGNvbHVtbkJsb2NrKSB7XG4gICAgdmFyIGNvbHVtbkNlbGxzID0gY29sdW1uQmxvY2suc2VsZWN0QWxsKCcuJyArIGMuY24uY29sdW1uQ2VsbHMpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGd1cC5rZXlGdW4pO1xuXG4gICAgY29sdW1uQ2VsbHMuZW50ZXIoKVxuICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoYy5jbi5jb2x1bW5DZWxscywgdHJ1ZSk7XG5cbiAgICBjb2x1bW5DZWxscy5leGl0KClcbiAgICAgICAgLnJlbW92ZSgpO1xuXG4gICAgcmV0dXJuIGNvbHVtbkNlbGxzO1xufVxuXG5mdW5jdGlvbiByZW5kZXJDb2x1bW5DZWxsKGNvbHVtbkNlbGxzKSB7XG4gICAgdmFyIGNvbHVtbkNlbGwgPSBjb2x1bW5DZWxscy5zZWxlY3RBbGwoJy4nICsgYy5jbi5jb2x1bW5DZWxsKVxuICAgICAgICAuZGF0YShzcGxpdERhdGEuc3BsaXRUb0NlbGxzLCBmdW5jdGlvbihkKSB7cmV0dXJuIGQua2V5V2l0aGluQmxvY2s7fSk7XG5cbiAgICBjb2x1bW5DZWxsLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uY29sdW1uQ2VsbCwgdHJ1ZSk7XG5cbiAgICBjb2x1bW5DZWxsLmV4aXQoKVxuICAgICAgICAucmVtb3ZlKCk7XG5cbiAgICByZXR1cm4gY29sdW1uQ2VsbDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2VsbFJlY3QoY29sdW1uQ2VsbCkge1xuICAgIHZhciBjZWxsUmVjdCA9IGNvbHVtbkNlbGwuc2VsZWN0QWxsKCcuJyArIGMuY24uY2VsbFJlY3QpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5rZXlXaXRoaW5CbG9jazt9KTtcblxuICAgIGNlbGxSZWN0LmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uY2VsbFJlY3QsIHRydWUpO1xuXG4gICAgcmV0dXJuIGNlbGxSZWN0O1xufVxuXG5mdW5jdGlvbiByZW5kZXJDZWxsVGV4dChjZWxsVGV4dEhvbGRlcikge1xuICAgIHZhciBjZWxsVGV4dCA9IGNlbGxUZXh0SG9sZGVyLnNlbGVjdEFsbCgnLicgKyBjLmNuLmNlbGxUZXh0KVxuICAgICAgICAuZGF0YShndXAucmVwZWF0LCBmdW5jdGlvbihkKSB7cmV0dXJuIGQua2V5V2l0aGluQmxvY2s7fSk7XG5cbiAgICBjZWxsVGV4dC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAuY2xhc3NlZChjLmNuLmNlbGxUZXh0LCB0cnVlKVxuICAgICAgICAuc3R5bGUoJ2N1cnNvcicsIGZ1bmN0aW9uKCkge3JldHVybiAnYXV0byc7fSlcbiAgICAgICAgLm9uKCdtb3VzZWRvd24nLCBmdW5jdGlvbigpIHtkMy5ldmVudC5zdG9wUHJvcGFnYXRpb24oKTt9KTtcblxuICAgIHJldHVybiBjZWxsVGV4dDtcbn1cblxuZnVuY3Rpb24gcmVuZGVyQ2VsbFRleHRIb2xkZXIoY29sdW1uQ2VsbCkge1xuICAgIHZhciBjZWxsVGV4dEhvbGRlciA9IGNvbHVtbkNlbGwuc2VsZWN0QWxsKCcuJyArIGMuY24uY2VsbFRleHRIb2xkZXIpXG4gICAgICAgIC5kYXRhKGd1cC5yZXBlYXQsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZC5rZXlXaXRoaW5CbG9jazt9KTtcblxuICAgIGNlbGxUZXh0SG9sZGVyLmVudGVyKClcbiAgICAgICAgLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKGMuY24uY2VsbFRleHRIb2xkZXIsIHRydWUpXG4gICAgICAgIC5zdHlsZSgnc2hhcGUtcmVuZGVyaW5nJywgJ2dlb21ldHJpY1ByZWNpc2lvbicpO1xuXG4gICAgcmV0dXJuIGNlbGxUZXh0SG9sZGVyO1xufVxuXG5mdW5jdGlvbiBzdXBwbHlTdHlsaW5nVmFsdWVzKGNvbHVtbkNlbGwpIHtcbiAgICBjb2x1bW5DZWxsXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgIHZhciBzcGVjID0gZC5jYWxjZGF0YS5jZWxscy5mb250O1xuICAgICAgICAgICAgdmFyIGNvbCA9IGQuY29sdW1uLnNwZWNJbmRleDtcbiAgICAgICAgICAgIHZhciBmb250ID0ge1xuICAgICAgICAgICAgICAgIHNpemU6IGdyaWRQaWNrKHNwZWMuc2l6ZSwgY29sLCBpKSxcbiAgICAgICAgICAgICAgICBjb2xvcjogZ3JpZFBpY2soc3BlYy5jb2xvciwgY29sLCBpKSxcbiAgICAgICAgICAgICAgICBmYW1pbHk6IGdyaWRQaWNrKHNwZWMuZmFtaWx5LCBjb2wsIGkpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZC5yb3dOdW1iZXIgPSBkLmtleTtcbiAgICAgICAgICAgIGQuYWxpZ24gPSBncmlkUGljayhkLmNhbGNkYXRhLmNlbGxzLmFsaWduLCBjb2wsIGkpO1xuICAgICAgICAgICAgZC5jZWxsQm9yZGVyV2lkdGggPSBncmlkUGljayhkLmNhbGNkYXRhLmNlbGxzLmxpbmUud2lkdGgsIGNvbCwgaSk7XG4gICAgICAgICAgICBkLmZvbnQgPSBmb250O1xuICAgICAgICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0Rm9udChjZWxsVGV4dCkge1xuICAgIGNlbGxUZXh0XG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIERyYXdpbmcuZm9udChkMy5zZWxlY3QodGhpcyksIGQuZm9udCk7XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBzaXplQW5kU3R5bGVSZWN0KGNlbGxSZWN0KSB7XG4gICAgY2VsbFJlY3RcbiAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVuY3Rpb24oZCkge3JldHVybiBkLmNvbHVtbi5jb2x1bW5XaWR0aDt9KVxuICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgZnVuY3Rpb24oZCkge3JldHVybiBkLmNlbGxCb3JkZXJXaWR0aDt9KVxuICAgICAgICAuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICB2YXIgYXRvbWljU2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMpO1xuICAgICAgICAgICAgQ29sb3Iuc3Ryb2tlKGF0b21pY1NlbGVjdGlvbiwgZ3JpZFBpY2soZC5jYWxjZGF0YS5jZWxscy5saW5lLmNvbG9yLCBkLmNvbHVtbi5zcGVjSW5kZXgsIGQucm93TnVtYmVyKSk7XG4gICAgICAgICAgICBDb2xvci5maWxsKGF0b21pY1NlbGVjdGlvbiwgZ3JpZFBpY2soZC5jYWxjZGF0YS5jZWxscy5maWxsLmNvbG9yLCBkLmNvbHVtbi5zcGVjSW5kZXgsIGQucm93TnVtYmVyKSk7XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBwb3B1bGF0ZUNlbGxUZXh0KGNlbGxUZXh0LCB0YWJsZUNvbnRyb2xWaWV3LCBhbGxDb2x1bW5CbG9jaywgZ2QpIHtcbiAgICBjZWxsVGV4dFxuICAgICAgICAudGV4dChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICB2YXIgY29sID0gZC5jb2x1bW4uc3BlY0luZGV4O1xuICAgICAgICAgICAgdmFyIHJvdyA9IGQucm93TnVtYmVyO1xuXG4gICAgICAgICAgICB2YXIgdXNlclN1cHBsaWVkQ29udGVudCA9IGQudmFsdWU7XG4gICAgICAgICAgICB2YXIgc3RyaW5nU3VwcGxpZWQgPSAodHlwZW9mIHVzZXJTdXBwbGllZENvbnRlbnQgPT09ICdzdHJpbmcnKTtcbiAgICAgICAgICAgIHZhciBoYXNCcmVha3MgPSBzdHJpbmdTdXBwbGllZCAmJiB1c2VyU3VwcGxpZWRDb250ZW50Lm1hdGNoKC88YnI+L2kpO1xuICAgICAgICAgICAgdmFyIHVzZXJCcm9rZW5UZXh0ID0gIXN0cmluZ1N1cHBsaWVkIHx8IGhhc0JyZWFrcztcbiAgICAgICAgICAgIGQubWF5SGF2ZU1hcmt1cCA9IHN0cmluZ1N1cHBsaWVkICYmIHVzZXJTdXBwbGllZENvbnRlbnQubWF0Y2goL1s8Jj5dLyk7XG5cbiAgICAgICAgICAgIHZhciBsYXRleCA9IGlzTGF0ZXgodXNlclN1cHBsaWVkQ29udGVudCk7XG4gICAgICAgICAgICBkLmxhdGV4ID0gbGF0ZXg7XG5cbiAgICAgICAgICAgIHZhciBwcmVmaXggPSBsYXRleCA/ICcnIDogZ3JpZFBpY2soZC5jYWxjZGF0YS5jZWxscy5wcmVmaXgsIGNvbCwgcm93KSB8fCAnJztcbiAgICAgICAgICAgIHZhciBzdWZmaXggPSBsYXRleCA/ICcnIDogZ3JpZFBpY2soZC5jYWxjZGF0YS5jZWxscy5zdWZmaXgsIGNvbCwgcm93KSB8fCAnJztcbiAgICAgICAgICAgIHZhciBmb3JtYXQgPSBsYXRleCA/IG51bGwgOiBncmlkUGljayhkLmNhbGNkYXRhLmNlbGxzLmZvcm1hdCwgY29sLCByb3cpIHx8IG51bGw7XG5cbiAgICAgICAgICAgIHZhciBwcmVmaXhTdWZmaXhlZFRleHQgPSBwcmVmaXggKyAoZm9ybWF0ID8gZDMuZm9ybWF0KGZvcm1hdCkoZC52YWx1ZSkgOiBkLnZhbHVlKSArIHN1ZmZpeDtcblxuICAgICAgICAgICAgdmFyIGhhc1dyYXBTcGxpdENoYXJhY3RlcjtcbiAgICAgICAgICAgIGQud3JhcHBpbmdOZWVkZWQgPSAhZC53cmFwcGVkICYmICF1c2VyQnJva2VuVGV4dCAmJiAhbGF0ZXggJiYgKGhhc1dyYXBTcGxpdENoYXJhY3RlciA9IGhhc1dyYXBDaGFyYWN0ZXIocHJlZml4U3VmZml4ZWRUZXh0KSk7XG4gICAgICAgICAgICBkLmNlbGxIZWlnaHRNYXlJbmNyZWFzZSA9IGhhc0JyZWFrcyB8fCBsYXRleCB8fCBkLm1heUhhdmVNYXJrdXAgfHwgKGhhc1dyYXBTcGxpdENoYXJhY3RlciA9PT0gdm9pZCgwKSA/IGhhc1dyYXBDaGFyYWN0ZXIocHJlZml4U3VmZml4ZWRUZXh0KSA6IGhhc1dyYXBTcGxpdENoYXJhY3Rlcik7XG4gICAgICAgICAgICBkLm5lZWRzQ29udmVydFRvVHNwYW5zID0gZC5tYXlIYXZlTWFya3VwIHx8IGQud3JhcHBpbmdOZWVkZWQgfHwgZC5sYXRleDtcblxuICAgICAgICAgICAgdmFyIHRleHRUb1JlbmRlcjtcbiAgICAgICAgICAgIGlmKGQud3JhcHBpbmdOZWVkZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgaHJlZlByZXNlcnZlZFRleHQgPSBjLndyYXBTcGxpdENoYXJhY3RlciA9PT0gJyAnID8gcHJlZml4U3VmZml4ZWRUZXh0LnJlcGxhY2UoLzxhIGhyZWY9L2lnLCAnPGFfaHJlZj0nKSA6IHByZWZpeFN1ZmZpeGVkVGV4dDtcbiAgICAgICAgICAgICAgICB2YXIgZnJhZ21lbnRzID0gaHJlZlByZXNlcnZlZFRleHQuc3BsaXQoYy53cmFwU3BsaXRDaGFyYWN0ZXIpO1xuICAgICAgICAgICAgICAgIHZhciBocmVmUmVzdG9yZWRGcmFnbWVudHMgPSBjLndyYXBTcGxpdENoYXJhY3RlciA9PT0gJyAnID8gZnJhZ21lbnRzLm1hcChmdW5jdGlvbihmcmFnKSB7cmV0dXJuIGZyYWcucmVwbGFjZSgvPGFfaHJlZj0vaWcsICc8YSBocmVmPScpO30pIDogZnJhZ21lbnRzO1xuICAgICAgICAgICAgICAgIGQuZnJhZ21lbnRzID0gaHJlZlJlc3RvcmVkRnJhZ21lbnRzLm1hcChmdW5jdGlvbihmKSB7cmV0dXJuIHt0ZXh0OiBmLCB3aWR0aDogbnVsbH07fSk7XG4gICAgICAgICAgICAgICAgZC5mcmFnbWVudHMucHVzaCh7ZnJhZ21lbnQ6IGMud3JhcFNwYWNlciwgd2lkdGg6IG51bGx9KTtcbiAgICAgICAgICAgICAgICB0ZXh0VG9SZW5kZXIgPSBocmVmUmVzdG9yZWRGcmFnbWVudHMuam9pbihjLmxpbmVCcmVha2VyKSArIGMubGluZUJyZWFrZXIgKyBjLndyYXBTcGFjZXI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBkLmZyYWdtZW50cztcbiAgICAgICAgICAgICAgICB0ZXh0VG9SZW5kZXIgPSBwcmVmaXhTdWZmaXhlZFRleHQ7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiB0ZXh0VG9SZW5kZXI7XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdkeScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLm5lZWRzQ29udmVydFRvVHNwYW5zID8gMCA6ICcwLjc1ZW0nO1xuICAgICAgICB9KVxuICAgICAgICAuZWFjaChmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICB2YXIgZWxlbWVudCA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgc2VsZWN0aW9uID0gZDMuc2VsZWN0KGVsZW1lbnQpO1xuXG4gICAgICAgICAgICAvLyBmaW5hbGl6ZSB3aGF0J3MgaW4gdGhlIERPTVxuXG4gICAgICAgICAgICB2YXIgcmVuZGVyQ2FsbGJhY2sgPSBkLndyYXBwaW5nTmVlZGVkID8gd3JhcFRleHRNYWtlciA6IHVwZGF0ZVlQb3NpdGlvbk1ha2VyO1xuICAgICAgICAgICAgaWYoZC5uZWVkc0NvbnZlcnRUb1RzcGFucykge1xuICAgICAgICAgICAgICAgIHN2Z1V0aWwuY29udmVydFRvVHNwYW5zKHNlbGVjdGlvbiwgZ2QsIHJlbmRlckNhbGxiYWNrKGFsbENvbHVtbkJsb2NrLCBlbGVtZW50LCB0YWJsZUNvbnRyb2xWaWV3LCBnZCwgZCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QoZWxlbWVudC5wYXJlbnROb2RlKVxuICAgICAgICAgICAgICAgICAgICAvLyBiYXNpYyBjZWxsIGFkanVzdG1lbnQgLSBjb21wbGlhbmNlIHdpdGggYGNlbGxQYWRgXG4gICAgICAgICAgICAgICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7cmV0dXJuICd0cmFuc2xhdGUoJyArIHhQb3NpdGlvbihkKSArICcgJyArIGMuY2VsbFBhZCArICcpJzt9KVxuICAgICAgICAgICAgICAgICAgICAuYXR0cigndGV4dC1hbmNob3InLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAnc3RhcnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNlbnRlcjogJ21pZGRsZScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmlnaHQ6ICdlbmQnXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVtkLmFsaWduXTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xufVxuXG5mdW5jdGlvbiBpc0xhdGV4KGNvbnRlbnQpIHtcbiAgICByZXR1cm4gdHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnICYmIGNvbnRlbnQubWF0Y2goYy5sYXRleENoZWNrKTtcbn1cblxuZnVuY3Rpb24gaGFzV3JhcENoYXJhY3Rlcih0ZXh0KSB7cmV0dXJuIHRleHQuaW5kZXhPZihjLndyYXBTcGxpdENoYXJhY3RlcikgIT09IC0xO31cblxuZnVuY3Rpb24gY29sdW1uTW92ZWQoZ2QsIGNhbGNkYXRhLCBpbmRpY2VzKSB7XG4gICAgdmFyIG8gPSBjYWxjZGF0YS5nZENvbHVtbnNPcmlnaW5hbE9yZGVyO1xuICAgIGNhbGNkYXRhLmdkQ29sdW1ucy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGluZGljZXNbby5pbmRleE9mKGEpXSAtIGluZGljZXNbby5pbmRleE9mKGIpXTtcbiAgICB9KTtcblxuICAgIGNhbGNkYXRhLmNvbHVtbm9yZGVyID0gaW5kaWNlcztcblxuICAgIC8vIFRPRE86IHRoZXJlJ3Mgbm8gZGF0YSBoZXJlLCBidXQgYWxzbyB0aGlzIHJlb3JkZXJpbmcgaXMgbm90IHJlZmxlY3RlZFxuICAgIC8vIGluIGdkLmRhdGEgb3IgZXZlbiBnZC5fZnVsbERhdGEuXG4gICAgLy8gRm9yIG5vdyBJIHdpbGwgbm90IGF0dGVtcHQgdG8gcGVyc2lzdCB0aGlzIGluIF9wcmVHVUlcbiAgICBnZC5lbWl0KCdwbG90bHlfcmVzdHlsZScpO1xufVxuXG5mdW5jdGlvbiBncmlkUGljayhzcGVjLCBjb2wsIHJvdykge1xuICAgIGlmKEFycmF5LmlzQXJyYXkoc3BlYykpIHtcbiAgICAgICAgdmFyIGNvbHVtbiA9IHNwZWNbTWF0aC5taW4oY29sLCBzcGVjLmxlbmd0aCAtIDEpXTtcbiAgICAgICAgaWYoQXJyYXkuaXNBcnJheShjb2x1bW4pKSB7XG4gICAgICAgICAgICByZXR1cm4gY29sdW1uW01hdGgubWluKHJvdywgY29sdW1uLmxlbmd0aCAtIDEpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjb2x1bW47XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc3BlYztcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGVhc2VDb2x1bW4oc2VsZWN0aW9uLCBkLCB5KSB7XG4gICAgc2VsZWN0aW9uXG4gICAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgICAgLmVhc2UoYy5yZWxlYXNlVHJhbnNpdGlvbkVhc2UpXG4gICAgICAgIC5kdXJhdGlvbihjLnJlbGVhc2VUcmFuc2l0aW9uRHVyYXRpb24pXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCAndHJhbnNsYXRlKCcgKyBkLnggKyAnICcgKyB5ICsgJyknKTtcbn1cblxuZnVuY3Rpb24gY2VsbHNCbG9jayhkKSB7cmV0dXJuIGQudHlwZSA9PT0gJ2NlbGxzJzt9XG5mdW5jdGlvbiBoZWFkZXJCbG9jayhkKSB7cmV0dXJuIGQudHlwZSA9PT0gJ2hlYWRlcic7fVxuXG4vKipcbiAqIFJldm9sdmVyIHBhbmVsIGFuZCBjZWxsIGNvbnRlbnRzIGxheW91dGluZ1xuICovXG5cbmZ1bmN0aW9uIGhlYWRlckhlaWdodChkKSB7XG4gICAgdmFyIGhlYWRlckJsb2NrcyA9IGQucm93QmxvY2tzLmxlbmd0aCA/IGQucm93QmxvY2tzWzBdLmF1eGlsaWFyeUJsb2NrcyA6IFtdO1xuICAgIHJldHVybiBoZWFkZXJCbG9ja3MucmVkdWNlKGZ1bmN0aW9uKHAsIG4pIHtyZXR1cm4gcCArIHJvd3NIZWlnaHQobiwgSW5maW5pdHkpO30sIDApO1xufVxuXG5mdW5jdGlvbiBmaW5kUGFnZXNBbmRDYWNoZUhlaWdodHMoYmxvY2tzLCBzY3JvbGxZLCBzY3JvbGxIZWlnaHQpIHtcbiAgICB2YXIgcGFnZXMgPSBbXTtcbiAgICB2YXIgcFRvcCA9IDA7XG5cbiAgICBmb3IodmFyIGJsb2NrSW5kZXggPSAwOyBibG9ja0luZGV4IDwgYmxvY2tzLmxlbmd0aDsgYmxvY2tJbmRleCsrKSB7XG4gICAgICAgIHZhciBibG9jayA9IGJsb2Nrc1tibG9ja0luZGV4XTtcbiAgICAgICAgdmFyIGJsb2NrUm93cyA9IGJsb2NrLnJvd3M7XG4gICAgICAgIHZhciByb3dzSGVpZ2h0ID0gMDtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGJsb2NrUm93cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgcm93c0hlaWdodCArPSBibG9ja1Jvd3NbaV0ucm93SGVpZ2h0O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2FjaGluZyBhbGxSb3dzSGVpZ2h0IG9uIHRoZSBibG9jayAtIGl0J3Mgc2FmZSBhcyB0aGlzIGZ1bmN0aW9uIGlzIGFsd2F5cyBjYWxsZWQgZnJvbSB3aXRoaW4gdGhlIGNvZGUgcGFydFxuICAgICAgICAvLyB0aGF0IGhhbmRsZXMgaW5jcmVhc2VzIHRvIHJvdyBoZWlnaHRzXG4gICAgICAgIGJsb2NrLmFsbFJvd3NIZWlnaHQgPSByb3dzSGVpZ2h0O1xuXG4gICAgICAgIHZhciBwQm90dG9tID0gcFRvcCArIHJvd3NIZWlnaHQ7XG4gICAgICAgIHZhciB3aW5kb3dUb3AgPSBzY3JvbGxZO1xuICAgICAgICB2YXIgd2luZG93Qm90dG9tID0gd2luZG93VG9wICsgc2Nyb2xsSGVpZ2h0O1xuICAgICAgICBpZih3aW5kb3dUb3AgPCBwQm90dG9tICYmIHdpbmRvd0JvdHRvbSA+IHBUb3ApIHtcbiAgICAgICAgICAgIHBhZ2VzLnB1c2goYmxvY2tJbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgcFRvcCArPSByb3dzSGVpZ2h0O1xuXG4gICAgICAgIC8vIGNvbnNpZGVyIHRoaXMgbmljZSBmaW5hbCBvcHRpbWl6YXRpb247IHB1dCBpdCBpbiBgZm9yYCBjb25kaXRpb24gLSBjYXZlYXQsIGN1cnJlbnRseSB0aGVcbiAgICAgICAgLy8gYmxvY2suYWxsUm93c0hlaWdodCByZWxpZXMgb24gYmVpbmcgaW52YWxpZGF0ZWQsIHNvIGVuYWJsaW5nIHRoaXMgb3B0IG1heSBub3QgYmUgc2FmZVxuICAgICAgICAvLyBpZihwYWdlcy5sZW5ndGggPiAxKSBicmVhaztcbiAgICB9XG5cbiAgICByZXR1cm4gcGFnZXM7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUJsb2NrWVBvc2l0aW9uKGdkLCBjZWxsc0NvbHVtbkJsb2NrLCB0YWJsZUNvbnRyb2xWaWV3KSB7XG4gICAgdmFyIGQgPSBmbGF0RGF0YShjZWxsc0NvbHVtbkJsb2NrKVswXTtcbiAgICBpZihkID09PSB1bmRlZmluZWQpIHJldHVybjtcbiAgICB2YXIgYmxvY2tzID0gZC5yb3dCbG9ja3M7XG4gICAgdmFyIGNhbGNkYXRhID0gZC5jYWxjZGF0YTtcblxuICAgIHZhciBib3R0b20gPSBmaXJzdFJvd0FuY2hvcihibG9ja3MsIGJsb2Nrcy5sZW5ndGgpO1xuICAgIHZhciBzY3JvbGxIZWlnaHQgPSBkLmNhbGNkYXRhLmdyb3VwSGVpZ2h0IC0gaGVhZGVySGVpZ2h0KGQpO1xuICAgIHZhciBzY3JvbGxZID0gY2FsY2RhdGEuc2Nyb2xsWSA9IE1hdGgubWF4KDAsIE1hdGgubWluKGJvdHRvbSAtIHNjcm9sbEhlaWdodCwgY2FsY2RhdGEuc2Nyb2xsWSkpO1xuXG4gICAgdmFyIHBhZ2VzID0gZmluZFBhZ2VzQW5kQ2FjaGVIZWlnaHRzKGJsb2Nrcywgc2Nyb2xsWSwgc2Nyb2xsSGVpZ2h0KTtcbiAgICBpZihwYWdlcy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgaWYocGFnZXNbMF0gPT09IGJsb2Nrcy5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICBwYWdlcy51bnNoaWZ0KHBhZ2VzWzBdIC0gMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBwYWdlcy5wdXNoKHBhZ2VzWzBdICsgMSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBtYWtlIHBoYXNlZCBvdXQgcGFnZSBqdW1wIGJ5IDIgd2hpbGUgbGVhdmluZyBzdGF0aW9uYXJ5IHBhZ2UgaW50YWN0XG4gICAgaWYocGFnZXNbMF0gJSAyKSB7XG4gICAgICAgIHBhZ2VzLnJldmVyc2UoKTtcbiAgICB9XG5cbiAgICBjZWxsc0NvbHVtbkJsb2NrXG4gICAgICAgIC5lYWNoKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgIC8vIHRoZXNlIHZhbHVlcyB3aWxsIGFsc28gYmUgbmVlZGVkIHdoZW4gYSBibG9jayBpcyB0cmFuc2xhdGVkIGFnYWluIGR1ZSB0byBncm93aW5nIGNlbGwgaGVpZ2h0XG4gICAgICAgICAgICBkLnBhZ2UgPSBwYWdlc1tpXTtcbiAgICAgICAgICAgIGQuc2Nyb2xsWSA9IHNjcm9sbFk7XG4gICAgICAgIH0pO1xuXG4gICAgY2VsbHNDb2x1bW5CbG9ja1xuICAgICAgICAuYXR0cigndHJhbnNmb3JtJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgdmFyIHlUcmFuc2xhdGUgPSBmaXJzdFJvd0FuY2hvcihkLnJvd0Jsb2NrcywgZC5wYWdlKSAtIGQuc2Nyb2xsWTtcbiAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKDAgJyArIHlUcmFuc2xhdGUgKyAnKSc7XG4gICAgICAgIH0pO1xuXG4gICAgLy8gY29uZGl0aW9uYWxseSByZXJlbmRlcmluZyBwYW5lbCAwIGFuZCAxXG4gICAgaWYoZ2QpIHtcbiAgICAgICAgY29uZGl0aW9uYWxQYW5lbFJlcmVuZGVyKGdkLCB0YWJsZUNvbnRyb2xWaWV3LCBjZWxsc0NvbHVtbkJsb2NrLCBwYWdlcywgZC5wcmV2UGFnZXMsIGQsIDApO1xuICAgICAgICBjb25kaXRpb25hbFBhbmVsUmVyZW5kZXIoZ2QsIHRhYmxlQ29udHJvbFZpZXcsIGNlbGxzQ29sdW1uQmxvY2ssIHBhZ2VzLCBkLnByZXZQYWdlcywgZCwgMSk7XG4gICAgICAgIHJlbmRlclNjcm9sbGJhcktpdCh0YWJsZUNvbnRyb2xWaWV3LCBnZCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBtYWtlRHJhZ1JvdyhnZCwgYWxsVGFibGVDb250cm9sVmlldywgb3B0aW9uYWxNdWx0aXBsaWVyLCBvcHRpb25hbFBvc2l0aW9uKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIGRyYWdSb3coZXZlbnREKSB7XG4gICAgICAgIC8vIG1heSBjb21lIGZyb20gd2hpY2hldmVyIERPTSBldmVudCB0YXJnZXQ6IGRyYWcsIHdoZWVsLCBiYXIuLi4gZXZlbnREIGNvcnJlc3BvbmRzIHRvIGV2ZW50IHRhcmdldFxuICAgICAgICB2YXIgZCA9IGV2ZW50RC5jYWxjZGF0YSA/IGV2ZW50RC5jYWxjZGF0YSA6IGV2ZW50RDtcbiAgICAgICAgdmFyIHRhYmxlQ29udHJvbFZpZXcgPSBhbGxUYWJsZUNvbnRyb2xWaWV3LmZpbHRlcihmdW5jdGlvbihkZCkge3JldHVybiBkLmtleSA9PT0gZGQua2V5O30pO1xuICAgICAgICB2YXIgbXVsdGlwbGllciA9IG9wdGlvbmFsTXVsdGlwbGllciB8fCBkLnNjcm9sbGJhclN0YXRlLmRyYWdNdWx0aXBsaWVyO1xuXG4gICAgICAgIHZhciBpbml0aWFsU2Nyb2xsWSA9IGQuc2Nyb2xsWTtcblxuICAgICAgICBkLnNjcm9sbFkgPSBvcHRpb25hbFBvc2l0aW9uID09PSB2b2lkKDApID8gZC5zY3JvbGxZICsgbXVsdGlwbGllciAqIGQzLmV2ZW50LmR5IDogb3B0aW9uYWxQb3NpdGlvbjtcbiAgICAgICAgdmFyIGNlbGxzQ29sdW1uQmxvY2sgPSB0YWJsZUNvbnRyb2xWaWV3LnNlbGVjdEFsbCgnLicgKyBjLmNuLnlDb2x1bW4pLnNlbGVjdEFsbCgnLicgKyBjLmNuLmNvbHVtbkJsb2NrKS5maWx0ZXIoY2VsbHNCbG9jayk7XG4gICAgICAgIHVwZGF0ZUJsb2NrWVBvc2l0aW9uKGdkLCBjZWxsc0NvbHVtbkJsb2NrLCB0YWJsZUNvbnRyb2xWaWV3KTtcblxuICAgICAgICAvLyByZXR1cm4gZmFsc2UgaWYgd2UndmUgXCJ1c2VkXCIgdGhlIHNjcm9sbCwgaWUgaXQgZGlkIHNvbWV0aGluZyxcbiAgICAgICAgLy8gc28gdGhlIGV2ZW50IHNob3VsZG4ndCBidWJibGUgKGlmIGFwcHJvcHJpYXRlKVxuICAgICAgICByZXR1cm4gZC5zY3JvbGxZID09PSBpbml0aWFsU2Nyb2xsWTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBjb25kaXRpb25hbFBhbmVsUmVyZW5kZXIoZ2QsIHRhYmxlQ29udHJvbFZpZXcsIGNlbGxzQ29sdW1uQmxvY2ssIHBhZ2VzLCBwcmV2UGFnZXMsIGQsIHJldm9sdmVySW5kZXgpIHtcbiAgICB2YXIgc2hvdWxkQ29tcG9uZW50VXBkYXRlID0gcGFnZXNbcmV2b2x2ZXJJbmRleF0gIT09IHByZXZQYWdlc1tyZXZvbHZlckluZGV4XTtcbiAgICBpZihzaG91bGRDb21wb25lbnRVcGRhdGUpIHtcbiAgICAgICAgY2xlYXJUaW1lb3V0KGQuY3VycmVudFJlcGFpbnRbcmV2b2x2ZXJJbmRleF0pO1xuICAgICAgICBkLmN1cnJlbnRSZXBhaW50W3Jldm9sdmVySW5kZXhdID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQgbWlnaHQgbGFnIHJlbmRlcmluZyBidXQgeWllbGRzIGEgc21vb3RoZXIgc2Nyb2xsLCBiZWNhdXNlIGZhc3Qgc2Nyb2xsaW5nIG1ha2VzXG4gICAgICAgICAgICAvLyBzb21lIHJlcGFpbnRzIGludmlzaWJsZSBpZS4gd2FzdGVmdWwgKERPTSB3b3JrIGJsb2NrcyB0aGUgbWFpbiB0aHJlYWQpXG4gICAgICAgICAgICB2YXIgdG9SZXJlbmRlciA9IGNlbGxzQ29sdW1uQmxvY2suZmlsdGVyKGZ1bmN0aW9uKGQsIGkpIHtyZXR1cm4gaSA9PT0gcmV2b2x2ZXJJbmRleCAmJiBwYWdlc1tpXSAhPT0gcHJldlBhZ2VzW2ldO30pO1xuICAgICAgICAgICAgcmVuZGVyQ29sdW1uQ2VsbFRyZWUoZ2QsIHRhYmxlQ29udHJvbFZpZXcsIHRvUmVyZW5kZXIsIGNlbGxzQ29sdW1uQmxvY2spO1xuICAgICAgICAgICAgcHJldlBhZ2VzW3Jldm9sdmVySW5kZXhdID0gcGFnZXNbcmV2b2x2ZXJJbmRleF07XG4gICAgICAgIH0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gd3JhcFRleHRNYWtlcihjb2x1bW5CbG9jaywgZWxlbWVudCwgdGFibGVDb250cm9sVmlldywgZ2QpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gd3JhcFRleHQoKSB7XG4gICAgICAgIHZhciBjZWxsVGV4dEhvbGRlciA9IGQzLnNlbGVjdChlbGVtZW50LnBhcmVudE5vZGUpO1xuICAgICAgICBjZWxsVGV4dEhvbGRlclxuICAgICAgICAgICAgLmVhY2goZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHZhciBmcmFnbWVudHMgPSBkLmZyYWdtZW50cztcbiAgICAgICAgICAgICAgICBjZWxsVGV4dEhvbGRlci5zZWxlY3RBbGwoJ3RzcGFuLmxpbmUnKS5lYWNoKGZ1bmN0aW9uKGRkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYWdtZW50c1tpXS53aWR0aCA9IHRoaXMuZ2V0Q29tcHV0ZWRUZXh0TGVuZ3RoKCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgLy8gbGFzdCBlbGVtZW50IGlzIG9ubHkgZm9yIG1lYXN1cmluZyB0aGUgc2VwYXJhdG9yIGNoYXJhY3Rlciwgc28gaXQncyBpZ25vcmVkOlxuICAgICAgICAgICAgICAgIHZhciBzZXBhcmF0b3JMZW5ndGggPSBmcmFnbWVudHNbZnJhZ21lbnRzLmxlbmd0aCAtIDFdLndpZHRoO1xuICAgICAgICAgICAgICAgIHZhciByZXN0ID0gZnJhZ21lbnRzLnNsaWNlKDAsIC0xKTtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFJvdyA9IFtdO1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50QWRkaXRpb24sIGN1cnJlbnRBZGRpdGlvbkxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFJvd0xlbmd0aCA9IDA7XG4gICAgICAgICAgICAgICAgdmFyIHJvd0xlbmd0aExpbWl0ID0gZC5jb2x1bW4uY29sdW1uV2lkdGggLSAyICogYy5jZWxsUGFkO1xuICAgICAgICAgICAgICAgIGQudmFsdWUgPSAnJztcbiAgICAgICAgICAgICAgICB3aGlsZShyZXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50QWRkaXRpb24gPSByZXN0LnNoaWZ0KCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRBZGRpdGlvbkxlbmd0aCA9IGN1cnJlbnRBZGRpdGlvbi53aWR0aCArIHNlcGFyYXRvckxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgaWYoY3VycmVudFJvd0xlbmd0aCArIGN1cnJlbnRBZGRpdGlvbkxlbmd0aCA+IHJvd0xlbmd0aExpbWl0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLnZhbHVlICs9IGN1cnJlbnRSb3cuam9pbihjLndyYXBTcGFjZXIpICsgYy5saW5lQnJlYWtlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3cgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3dMZW5ndGggPSAwO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3cucHVzaChjdXJyZW50QWRkaXRpb24udGV4dCk7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRSb3dMZW5ndGggKz0gY3VycmVudEFkZGl0aW9uTGVuZ3RoO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZihjdXJyZW50Um93TGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIGQudmFsdWUgKz0gY3VycmVudFJvdy5qb2luKGMud3JhcFNwYWNlcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGQud3JhcHBlZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAvLyB0aGUgcHJlLXdyYXBwZWQgdGV4dCB3YXMgcmVuZGVyZWQgb25seSBmb3IgdGhlIHRleHQgbWVhc3VyZW1lbnRzXG4gICAgICAgIGNlbGxUZXh0SG9sZGVyLnNlbGVjdEFsbCgndHNwYW4ubGluZScpLnJlbW92ZSgpO1xuXG4gICAgICAgIC8vIHJlc3VwcGx5IHRleHQsIG5vdyB3cmFwcGVkXG4gICAgICAgIHBvcHVsYXRlQ2VsbFRleHQoY2VsbFRleHRIb2xkZXIuc2VsZWN0KCcuJyArIGMuY24uY2VsbFRleHQpLCB0YWJsZUNvbnRyb2xWaWV3LCBjb2x1bW5CbG9jaywgZ2QpO1xuICAgICAgICBkMy5zZWxlY3QoZWxlbWVudC5wYXJlbnROb2RlLnBhcmVudE5vZGUpLmNhbGwoc2V0Q2VsbEhlaWdodEFuZFBvc2l0aW9uWSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlWVBvc2l0aW9uTWFrZXIoY29sdW1uQmxvY2ssIGVsZW1lbnQsIHRhYmxlQ29udHJvbFZpZXcsIGdkLCBkKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZVlQb3NpdGlvbigpIHtcbiAgICAgICAgaWYoZC5zZXR0bGVkWSkgcmV0dXJuO1xuICAgICAgICB2YXIgY2VsbFRleHRIb2xkZXIgPSBkMy5zZWxlY3QoZWxlbWVudC5wYXJlbnROb2RlKTtcbiAgICAgICAgdmFyIGwgPSBnZXRCbG9jayhkKTtcbiAgICAgICAgdmFyIHJvd0luZGV4ID0gZC5rZXkgLSBsLmZpcnN0Um93SW5kZXg7XG5cbiAgICAgICAgdmFyIGRlY2xhcmVkUm93SGVpZ2h0ID0gbC5yb3dzW3Jvd0luZGV4XS5yb3dIZWlnaHQ7XG5cbiAgICAgICAgdmFyIHJlcXVpcmVkSGVpZ2h0ID0gZC5jZWxsSGVpZ2h0TWF5SW5jcmVhc2UgPyBlbGVtZW50LnBhcmVudE5vZGUuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0ICsgMiAqIGMuY2VsbFBhZCA6IGRlY2xhcmVkUm93SGVpZ2h0O1xuXG4gICAgICAgIHZhciBmaW5hbEhlaWdodCA9IE1hdGgubWF4KHJlcXVpcmVkSGVpZ2h0LCBkZWNsYXJlZFJvd0hlaWdodCk7XG4gICAgICAgIHZhciBpbmNyZWFzZSA9IGZpbmFsSGVpZ2h0IC0gbC5yb3dzW3Jvd0luZGV4XS5yb3dIZWlnaHQ7XG5cbiAgICAgICAgaWYoaW5jcmVhc2UpIHtcbiAgICAgICAgICAgIC8vIGN1cnJlbnQgcm93IGhlaWdodCBpbmNyZWFzZWRcbiAgICAgICAgICAgIGwucm93c1tyb3dJbmRleF0ucm93SGVpZ2h0ID0gZmluYWxIZWlnaHQ7XG5cbiAgICAgICAgICAgIGNvbHVtbkJsb2NrXG4gICAgICAgICAgICAgICAgLnNlbGVjdEFsbCgnLicgKyBjLmNuLmNvbHVtbkNlbGwpXG4gICAgICAgICAgICAgICAgLmNhbGwoc2V0Q2VsbEhlaWdodEFuZFBvc2l0aW9uWSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZUJsb2NrWVBvc2l0aW9uKG51bGwsIGNvbHVtbkJsb2NrLmZpbHRlcihjZWxsc0Jsb2NrKSwgMCk7XG5cbiAgICAgICAgICAgIC8vIGlmIGQuY29sdW1uLnR5cGUgPT09ICdoZWFkZXInLCB0aGVuIHRoZSBzY3JvbGxiYXIgaGFzIHRvIGJlIHB1c2hlZCBkb3dud2FyZCB0byB0aGUgc2Nyb2xsYWJsZSBhcmVhXG4gICAgICAgICAgICAvLyBpZiBkLmNvbHVtbi50eXBlID09PSAnY2VsbHMnLCBpdCBjYW4gc3RpbGwgYmUgcmVsZXZhbnQgaWYgdG90YWwgc2Nyb2xsaW5nIGNvbnRlbnQgaGVpZ2h0IGlzIGxlc3MgdGhhbiB0aGVcbiAgICAgICAgICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbGFibGUgd2luZG93LCBhcyBpbmNyZWFzZXMgdG8gcm93IGhlaWdodHMgbWF5IG5lZWQgc2Nyb2xsYmFyIHVwZGF0ZXNcbiAgICAgICAgICAgIHJlbmRlclNjcm9sbGJhcktpdCh0YWJsZUNvbnRyb2xWaWV3LCBnZCwgdHJ1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBjZWxsVGV4dEhvbGRlclxuICAgICAgICAgICAgLmF0dHIoJ3RyYW5zZm9ybScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIHRoaXMgY29kZSBibG9jayBpcyBvbmx5IGludm9rZWQgZm9yIGl0ZW1zIHdoZXJlIGQuY2VsbEhlaWdodE1heUluY3JlYXNlIGlzIHRydXRoeVxuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50ID0gdGhpcztcbiAgICAgICAgICAgICAgICB2YXIgY29sdW1uQ2VsbEVsZW1lbnQgPSBlbGVtZW50LnBhcmVudE5vZGU7XG4gICAgICAgICAgICAgICAgdmFyIGJveCA9IGNvbHVtbkNlbGxFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICAgICAgICAgIHZhciByZWN0Qm94ID0gZDMuc2VsZWN0KGVsZW1lbnQucGFyZW50Tm9kZSkuc2VsZWN0KCcuJyArIGMuY24uY2VsbFJlY3QpLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICB2YXIgY3VycmVudFRyYW5zZm9ybSA9IGVsZW1lbnQudHJhbnNmb3JtLmJhc2VWYWwuY29uc29saWRhdGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgeVBvc2l0aW9uID0gcmVjdEJveC50b3AgLSBib3gudG9wICsgKGN1cnJlbnRUcmFuc2Zvcm0gPyBjdXJyZW50VHJhbnNmb3JtLm1hdHJpeC5mIDogYy5jZWxsUGFkKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgeFBvc2l0aW9uKGQsIGQzLnNlbGVjdChlbGVtZW50LnBhcmVudE5vZGUpLnNlbGVjdCgnLicgKyBjLmNuLmNlbGxUZXh0SG9sZGVyKS5ub2RlKCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgpICsgJyAnICsgeVBvc2l0aW9uICsgJyknO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgZC5zZXR0bGVkWSA9IHRydWU7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24geFBvc2l0aW9uKGQsIG9wdGlvbmFsV2lkdGgpIHtcbiAgICBzd2l0Y2goZC5hbGlnbikge1xuICAgICAgICBjYXNlICdsZWZ0JzogcmV0dXJuIGMuY2VsbFBhZDtcbiAgICAgICAgY2FzZSAncmlnaHQnOiByZXR1cm4gZC5jb2x1bW4uY29sdW1uV2lkdGggLSAob3B0aW9uYWxXaWR0aCB8fCAwKSAtIGMuY2VsbFBhZDtcbiAgICAgICAgY2FzZSAnY2VudGVyJzogcmV0dXJuIChkLmNvbHVtbi5jb2x1bW5XaWR0aCAtIChvcHRpb25hbFdpZHRoIHx8IDApKSAvIDI7XG4gICAgICAgIGRlZmF1bHQ6IHJldHVybiBjLmNlbGxQYWQ7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZXRDZWxsSGVpZ2h0QW5kUG9zaXRpb25ZKGNvbHVtbkNlbGwpIHtcbiAgICBjb2x1bW5DZWxsXG4gICAgICAgIC5hdHRyKCd0cmFuc2Zvcm0nLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICB2YXIgaGVhZGVySGVpZ2h0ID0gZC5yb3dCbG9ja3NbMF0uYXV4aWxpYXJ5QmxvY2tzLnJlZHVjZShmdW5jdGlvbihwLCBuKSB7cmV0dXJuIHAgKyByb3dzSGVpZ2h0KG4sIEluZmluaXR5KTt9LCAwKTtcbiAgICAgICAgICAgIHZhciBsID0gZ2V0QmxvY2soZCk7XG4gICAgICAgICAgICB2YXIgcm93QW5jaG9yID0gcm93c0hlaWdodChsLCBkLmtleSk7XG4gICAgICAgICAgICB2YXIgeU9mZnNldCA9IHJvd0FuY2hvciArIGhlYWRlckhlaWdodDtcbiAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKDAgJyArIHlPZmZzZXQgKyAnKSc7XG4gICAgICAgIH0pXG4gICAgICAgIC5zZWxlY3RBbGwoJy4nICsgYy5jbi5jZWxsUmVjdClcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGZ1bmN0aW9uKGQpIHtyZXR1cm4gZ2V0Um93KGdldEJsb2NrKGQpLCBkLmtleSkucm93SGVpZ2h0O30pO1xufVxuXG5mdW5jdGlvbiBmaXJzdFJvd0FuY2hvcihibG9ja3MsIHBhZ2UpIHtcbiAgICB2YXIgdG90YWwgPSAwO1xuICAgIGZvcih2YXIgaSA9IHBhZ2UgLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICB0b3RhbCArPSBhbGxSb3dzSGVpZ2h0KGJsb2Nrc1tpXSk7XG4gICAgfVxuICAgIHJldHVybiB0b3RhbDtcbn1cblxuZnVuY3Rpb24gcm93c0hlaWdodChyb3dCbG9jaywga2V5KSB7XG4gICAgdmFyIHRvdGFsID0gMDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcm93QmxvY2sucm93cy5sZW5ndGggJiYgcm93QmxvY2sucm93c1tpXS5yb3dJbmRleCA8IGtleTsgaSsrKSB7XG4gICAgICAgIHRvdGFsICs9IHJvd0Jsb2NrLnJvd3NbaV0ucm93SGVpZ2h0O1xuICAgIH1cbiAgICByZXR1cm4gdG90YWw7XG59XG5cbmZ1bmN0aW9uIGFsbFJvd3NIZWlnaHQocm93QmxvY2spIHtcbiAgICB2YXIgY2FjaGVkID0gcm93QmxvY2suYWxsUm93c0hlaWdodDtcblxuICAgIGlmKGNhY2hlZCAhPT0gdm9pZCgwKSkge1xuICAgICAgICByZXR1cm4gY2FjaGVkO1xuICAgIH1cblxuICAgIHZhciB0b3RhbCA9IDA7XG4gICAgZm9yKHZhciBpID0gMDsgaSA8IHJvd0Jsb2NrLnJvd3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdG90YWwgKz0gcm93QmxvY2sucm93c1tpXS5yb3dIZWlnaHQ7XG4gICAgfVxuICAgIHJvd0Jsb2NrLmFsbFJvd3NIZWlnaHQgPSB0b3RhbDtcblxuICAgIHJldHVybiB0b3RhbDtcbn1cblxuZnVuY3Rpb24gZ2V0QmxvY2soZCkge3JldHVybiBkLnJvd0Jsb2Nrc1tkLnBhZ2VdO31cbmZ1bmN0aW9uIGdldFJvdyhsLCBpKSB7cmV0dXJuIGwucm93c1tpIC0gbC5maXJzdFJvd0luZGV4XTt9XG4iXSwic291cmNlUm9vdCI6IiJ9