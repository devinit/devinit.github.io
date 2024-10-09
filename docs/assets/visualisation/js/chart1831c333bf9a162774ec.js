(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_components_grid_index_js"],{

/***/ "./node_modules/plotly.js/src/components/grid/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/grid/index.js ***!
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
var counterRegex = __webpack_require__(/*! ../../lib/regex */ "./node_modules/plotly.js/src/lib/regex.js").counter;
var domainAttrs = __webpack_require__(/*! ../../plots/domain */ "./node_modules/plotly.js/src/plots/domain.js").attributes;
var cartesianIdRegex = __webpack_require__(/*! ../../plots/cartesian/constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js").idRegex;
var Template = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js");

var gridAttrs = {
    rows: {
        valType: 'integer',
        min: 1,
        role: 'info',
        editType: 'plot',
        description: [
            'The number of rows in the grid. If you provide a 2D `subplots`',
            'array or a `yaxes` array, its length is used as the default.',
            'But it\'s also possible to have a different length, if you',
            'want to leave a row at the end for non-cartesian subplots.'
        ].join(' ')
    },
    roworder: {
        valType: 'enumerated',
        values: ['top to bottom', 'bottom to top'],
        dflt: 'top to bottom',
        role: 'info',
        editType: 'plot',
        description: [
            'Is the first row the top or the bottom? Note that columns',
            'are always enumerated from left to right.'
        ].join(' ')
    },
    columns: {
        valType: 'integer',
        min: 1,
        role: 'info',
        editType: 'plot',
        description: [
            'The number of columns in the grid. If you provide a 2D `subplots`',
            'array, the length of its longest row is used as the default.',
            'If you give an `xaxes` array, its length is used as the default.',
            'But it\'s also possible to have a different length, if you',
            'want to leave a row at the end for non-cartesian subplots.'
        ].join(' ')
    },
    subplots: {
        valType: 'info_array',
        freeLength: true,
        dimensions: 2,
        items: {valType: 'enumerated', values: [counterRegex('xy').toString(), ''], editType: 'plot'},
        role: 'info',
        editType: 'plot',
        description: [
            'Used for freeform grids, where some axes may be shared across subplots',
            'but others are not. Each entry should be a cartesian subplot id, like',
            '*xy* or *x3y2*, or ** to leave that cell empty. You may reuse x axes',
            'within the same column, and y axes within the same row.',
            'Non-cartesian subplots and traces that support `domain` can place themselves',
            'in this grid separately using the `gridcell` attribute.'
        ].join(' ')
    },
    xaxes: {
        valType: 'info_array',
        freeLength: true,
        items: {valType: 'enumerated', values: [cartesianIdRegex.x.toString(), ''], editType: 'plot'},
        role: 'info',
        editType: 'plot',
        description: [
            'Used with `yaxes` when the x and y axes are shared across columns and rows.',
            'Each entry should be an x axis id like *x*, *x2*, etc., or ** to',
            'not put an x axis in that column. Entries other than ** must be unique.',
            'Ignored if `subplots` is present. If missing but `yaxes` is present,',
            'will generate consecutive IDs.'
        ].join(' ')
    },
    yaxes: {
        valType: 'info_array',
        freeLength: true,
        items: {valType: 'enumerated', values: [cartesianIdRegex.y.toString(), ''], editType: 'plot'},
        role: 'info',
        editType: 'plot',
        description: [
            'Used with `yaxes` when the x and y axes are shared across columns and rows.',
            'Each entry should be an y axis id like *y*, *y2*, etc., or ** to',
            'not put a y axis in that row. Entries other than ** must be unique.',
            'Ignored if `subplots` is present. If missing but `xaxes` is present,',
            'will generate consecutive IDs.'
        ].join(' ')
    },
    pattern: {
        valType: 'enumerated',
        values: ['independent', 'coupled'],
        dflt: 'coupled',
        role: 'info',
        editType: 'plot',
        description: [
            'If no `subplots`, `xaxes`, or `yaxes` are given but we do have `rows` and `columns`,',
            'we can generate defaults using consecutive axis IDs, in two ways:',
            '*coupled* gives one x axis per column and one y axis per row.',
            '*independent* uses a new xy pair for each cell, left-to-right across each row',
            'then iterating rows according to `roworder`.'
        ].join(' ')
    },
    xgap: {
        valType: 'number',
        min: 0,
        max: 1,
        role: 'info',
        editType: 'plot',
        description: [
            'Horizontal space between grid cells, expressed as a fraction',
            'of the total width available to one cell. Defaults to 0.1',
            'for coupled-axes grids and 0.2 for independent grids.'
        ].join(' ')
    },
    ygap: {
        valType: 'number',
        min: 0,
        max: 1,
        role: 'info',
        editType: 'plot',
        description: [
            'Vertical space between grid cells, expressed as a fraction',
            'of the total height available to one cell. Defaults to 0.1',
            'for coupled-axes grids and 0.3 for independent grids.'
        ].join(' ')
    },
    domain: domainAttrs({name: 'grid', editType: 'plot', noGridCell: true}, {
        description: [
            'The first and last cells end exactly at the domain',
            'edges, with no grout around the edges.'
        ].join(' ')
    }),
    xside: {
        valType: 'enumerated',
        values: ['bottom', 'bottom plot', 'top plot', 'top'],
        dflt: 'bottom plot',
        role: 'info',
        editType: 'plot',
        description: [
            'Sets where the x axis labels and titles go. *bottom* means',
            'the very bottom of the grid. *bottom plot* is the lowest plot',
            'that each x axis is used in. *top* and *top plot* are similar.'
        ].join(' ')
    },
    yside: {
        valType: 'enumerated',
        values: ['left', 'left plot', 'right plot', 'right'],
        dflt: 'left plot',
        role: 'info',
        editType: 'plot',
        description: [
            'Sets where the y axis labels and titles go. *left* means',
            'the very left edge of the grid. *left plot* is the leftmost plot',
            'that each y axis is used in. *right* and *right plot* are similar.'
        ].join(' ')
    },
    editType: 'plot'
};

function getAxes(layout, grid, axLetter) {
    var gridVal = grid[axLetter + 'axes'];
    var splomVal = Object.keys((layout._splomAxes || {})[axLetter] || {});

    if(Array.isArray(gridVal)) return gridVal;
    if(splomVal.length) return splomVal;
}

// the shape of the grid - this needs to be done BEFORE supplyDataDefaults
// so that non-subplot traces can place themselves in the grid
function sizeDefaults(layoutIn, layoutOut) {
    var gridIn = layoutIn.grid || {};
    var xAxes = getAxes(layoutOut, gridIn, 'x');
    var yAxes = getAxes(layoutOut, gridIn, 'y');

    if(!layoutIn.grid && !xAxes && !yAxes) return;

    var hasSubplotGrid = Array.isArray(gridIn.subplots) && Array.isArray(gridIn.subplots[0]);
    var hasXaxes = Array.isArray(xAxes);
    var hasYaxes = Array.isArray(yAxes);
    var isSplomGenerated = (
        hasXaxes && xAxes !== gridIn.xaxes &&
        hasYaxes && yAxes !== gridIn.yaxes
    );

    var dfltRows, dfltColumns;

    if(hasSubplotGrid) {
        dfltRows = gridIn.subplots.length;
        dfltColumns = gridIn.subplots[0].length;
    } else {
        if(hasYaxes) dfltRows = yAxes.length;
        if(hasXaxes) dfltColumns = xAxes.length;
    }

    var gridOut = Template.newContainer(layoutOut, 'grid');

    function coerce(attr, dflt) {
        return Lib.coerce(gridIn, gridOut, gridAttrs, attr, dflt);
    }

    var rows = coerce('rows', dfltRows);
    var columns = coerce('columns', dfltColumns);

    if(!(rows * columns > 1)) {
        delete layoutOut.grid;
        return;
    }

    if(!hasSubplotGrid && !hasXaxes && !hasYaxes) {
        var useDefaultSubplots = coerce('pattern') === 'independent';
        if(useDefaultSubplots) hasSubplotGrid = true;
    }
    gridOut._hasSubplotGrid = hasSubplotGrid;

    var rowOrder = coerce('roworder');
    var reversed = rowOrder === 'top to bottom';

    var dfltGapX = hasSubplotGrid ? 0.2 : 0.1;
    var dfltGapY = hasSubplotGrid ? 0.3 : 0.1;

    var dfltSideX, dfltSideY;
    if(isSplomGenerated && layoutOut._splomGridDflt) {
        dfltSideX = layoutOut._splomGridDflt.xside;
        dfltSideY = layoutOut._splomGridDflt.yside;
    }

    gridOut._domains = {
        x: fillGridPositions('x', coerce, dfltGapX, dfltSideX, columns),
        y: fillGridPositions('y', coerce, dfltGapY, dfltSideY, rows, reversed)
    };
}

// coerce x or y sizing attributes and return an array of domains for this direction
function fillGridPositions(axLetter, coerce, dfltGap, dfltSide, len, reversed) {
    var dirGap = coerce(axLetter + 'gap', dfltGap);
    var domain = coerce('domain.' + axLetter);
    coerce(axLetter + 'side', dfltSide);

    var out = new Array(len);
    var start = domain[0];
    var step = (domain[1] - start) / (len - dirGap);
    var cellDomain = step * (1 - dirGap);
    for(var i = 0; i < len; i++) {
        var cellStart = start + step * i;
        out[reversed ? (len - 1 - i) : i] = [cellStart, cellStart + cellDomain];
    }
    return out;
}

// the (cartesian) contents of the grid - this needs to happen AFTER supplyDataDefaults
// so that we know what cartesian subplots are available
function contentDefaults(layoutIn, layoutOut) {
    var gridOut = layoutOut.grid;
    // make sure we got to the end of handleGridSizing
    if(!gridOut || !gridOut._domains) return;

    var gridIn = layoutIn.grid || {};
    var subplots = layoutOut._subplots;
    var hasSubplotGrid = gridOut._hasSubplotGrid;
    var rows = gridOut.rows;
    var columns = gridOut.columns;
    var useDefaultSubplots = gridOut.pattern === 'independent';

    var i, j, xId, yId, subplotId, subplotsOut, yPos;

    var axisMap = gridOut._axisMap = {};

    if(hasSubplotGrid) {
        var subplotsIn = gridIn.subplots || [];
        subplotsOut = gridOut.subplots = new Array(rows);
        var index = 1;

        for(i = 0; i < rows; i++) {
            var rowOut = subplotsOut[i] = new Array(columns);
            var rowIn = subplotsIn[i] || [];
            for(j = 0; j < columns; j++) {
                if(useDefaultSubplots) {
                    subplotId = (index === 1) ? 'xy' : ('x' + index + 'y' + index);
                    index++;
                } else subplotId = rowIn[j];

                rowOut[j] = '';

                if(subplots.cartesian.indexOf(subplotId) !== -1) {
                    yPos = subplotId.indexOf('y');
                    xId = subplotId.slice(0, yPos);
                    yId = subplotId.slice(yPos);
                    if((axisMap[xId] !== undefined && axisMap[xId] !== j) ||
                        (axisMap[yId] !== undefined && axisMap[yId] !== i)
                    ) {
                        continue;
                    }

                    rowOut[j] = subplotId;
                    axisMap[xId] = j;
                    axisMap[yId] = i;
                }
            }
        }
    } else {
        var xAxes = getAxes(layoutOut, gridIn, 'x');
        var yAxes = getAxes(layoutOut, gridIn, 'y');
        gridOut.xaxes = fillGridAxes(xAxes, subplots.xaxis, columns, axisMap, 'x');
        gridOut.yaxes = fillGridAxes(yAxes, subplots.yaxis, rows, axisMap, 'y');
    }

    var anchors = gridOut._anchors = {};
    var reversed = gridOut.roworder === 'top to bottom';

    for(var axisId in axisMap) {
        var axLetter = axisId.charAt(0);
        var side = gridOut[axLetter + 'side'];

        var i0, inc, iFinal;

        if(side.length < 8) {
            // grid edge -  ie not "* plot" - make these as free axes
            // since we're not guaranteed to have a subplot there at all
            anchors[axisId] = 'free';
        } else if(axLetter === 'x') {
            if((side.charAt(0) === 't') === reversed) {
                i0 = 0;
                inc = 1;
                iFinal = rows;
            } else {
                i0 = rows - 1;
                inc = -1;
                iFinal = -1;
            }
            if(hasSubplotGrid) {
                var column = axisMap[axisId];
                for(i = i0; i !== iFinal; i += inc) {
                    subplotId = subplotsOut[i][column];
                    if(!subplotId) continue;
                    yPos = subplotId.indexOf('y');
                    if(subplotId.slice(0, yPos) === axisId) {
                        anchors[axisId] = subplotId.slice(yPos);
                        break;
                    }
                }
            } else {
                for(i = i0; i !== iFinal; i += inc) {
                    yId = gridOut.yaxes[i];
                    if(subplots.cartesian.indexOf(axisId + yId) !== -1) {
                        anchors[axisId] = yId;
                        break;
                    }
                }
            }
        } else {
            if((side.charAt(0) === 'l')) {
                i0 = 0;
                inc = 1;
                iFinal = columns;
            } else {
                i0 = columns - 1;
                inc = -1;
                iFinal = -1;
            }
            if(hasSubplotGrid) {
                var row = axisMap[axisId];
                for(i = i0; i !== iFinal; i += inc) {
                    subplotId = subplotsOut[row][i];
                    if(!subplotId) continue;
                    yPos = subplotId.indexOf('y');
                    if(subplotId.slice(yPos) === axisId) {
                        anchors[axisId] = subplotId.slice(0, yPos);
                        break;
                    }
                }
            } else {
                for(i = i0; i !== iFinal; i += inc) {
                    xId = gridOut.xaxes[i];
                    if(subplots.cartesian.indexOf(xId + axisId) !== -1) {
                        anchors[axisId] = xId;
                        break;
                    }
                }
            }
        }
    }
}

function fillGridAxes(axesIn, axesAllowed, len, axisMap, axLetter) {
    var out = new Array(len);
    var i;

    function fillOneAxis(i, axisId) {
        if(axesAllowed.indexOf(axisId) !== -1 && axisMap[axisId] === undefined) {
            out[i] = axisId;
            axisMap[axisId] = i;
        } else out[i] = '';
    }

    if(Array.isArray(axesIn)) {
        for(i = 0; i < len; i++) {
            fillOneAxis(i, axesIn[i]);
        }
    } else {
        // default axis list is the first `len` axis ids
        fillOneAxis(0, axLetter);
        for(i = 1; i < len; i++) {
            fillOneAxis(i, axLetter + (i + 1));
        }
    }

    return out;
}

module.exports = {
    moduleType: 'component',
    name: 'grid',

    schema: {
        layout: {grid: gridAttrs}
    },

    layoutAttributes: gridAttrs,
    sizeDefaults: sizeDefaults,
    contentDefaults: contentDefaults
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29tcG9uZW50cy9ncmlkL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViLFVBQVUsbUJBQU8sQ0FBQyw0REFBVztBQUM3QixtQkFBbUIsK0ZBQWtDO0FBQ3JELGtCQUFrQix3R0FBd0M7QUFDMUQsdUJBQXVCLCtIQUFrRDtBQUN6RSxlQUFlLG1CQUFPLENBQUMsNEZBQThCOztBQUVyRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHFGQUFxRjtBQUNyRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IscUZBQXFGO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IscUZBQXFGO0FBQ3JHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wseUJBQXlCLGlEQUFpRDtBQUMxRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELGlCQUFpQjs7QUFFeEU7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixVQUFVO0FBQzVCO0FBQ0E7QUFDQSxzQkFBc0IsYUFBYTtBQUNuQztBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7O0FBRWpCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsY0FBYztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixjQUFjO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsMkJBQTJCLGNBQWM7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0Esa0JBQWtCLFNBQVM7QUFDM0I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsaUJBQWlCO0FBQ2pCLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiY2hhcnQxODMxYzMzM2JmOWExNjI3NzRlYy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGNvdW50ZXJSZWdleCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9yZWdleCcpLmNvdW50ZXI7XG52YXIgZG9tYWluQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9kb21haW4nKS5hdHRyaWJ1dGVzO1xudmFyIGNhcnRlc2lhbklkUmVnZXggPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vY29uc3RhbnRzJykuaWRSZWdleDtcbnZhciBUZW1wbGF0ZSA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKTtcblxudmFyIGdyaWRBdHRycyA9IHtcbiAgICByb3dzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgbWluOiAxLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVGhlIG51bWJlciBvZiByb3dzIGluIHRoZSBncmlkLiBJZiB5b3UgcHJvdmlkZSBhIDJEIGBzdWJwbG90c2AnLFxuICAgICAgICAgICAgJ2FycmF5IG9yIGEgYHlheGVzYCBhcnJheSwgaXRzIGxlbmd0aCBpcyB1c2VkIGFzIHRoZSBkZWZhdWx0LicsXG4gICAgICAgICAgICAnQnV0IGl0XFwncyBhbHNvIHBvc3NpYmxlIHRvIGhhdmUgYSBkaWZmZXJlbnQgbGVuZ3RoLCBpZiB5b3UnLFxuICAgICAgICAgICAgJ3dhbnQgdG8gbGVhdmUgYSByb3cgYXQgdGhlIGVuZCBmb3Igbm9uLWNhcnRlc2lhbiBzdWJwbG90cy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICByb3dvcmRlcjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWyd0b3AgdG8gYm90dG9tJywgJ2JvdHRvbSB0byB0b3AnXSxcbiAgICAgICAgZGZsdDogJ3RvcCB0byBib3R0b20nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSXMgdGhlIGZpcnN0IHJvdyB0aGUgdG9wIG9yIHRoZSBib3R0b20/IE5vdGUgdGhhdCBjb2x1bW5zJyxcbiAgICAgICAgICAgICdhcmUgYWx3YXlzIGVudW1lcmF0ZWQgZnJvbSBsZWZ0IHRvIHJpZ2h0LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGNvbHVtbnM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2ludGVnZXInLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIGdyaWQuIElmIHlvdSBwcm92aWRlIGEgMkQgYHN1YnBsb3RzYCcsXG4gICAgICAgICAgICAnYXJyYXksIHRoZSBsZW5ndGggb2YgaXRzIGxvbmdlc3Qgcm93IGlzIHVzZWQgYXMgdGhlIGRlZmF1bHQuJyxcbiAgICAgICAgICAgICdJZiB5b3UgZ2l2ZSBhbiBgeGF4ZXNgIGFycmF5LCBpdHMgbGVuZ3RoIGlzIHVzZWQgYXMgdGhlIGRlZmF1bHQuJyxcbiAgICAgICAgICAgICdCdXQgaXRcXCdzIGFsc28gcG9zc2libGUgdG8gaGF2ZSBhIGRpZmZlcmVudCBsZW5ndGgsIGlmIHlvdScsXG4gICAgICAgICAgICAnd2FudCB0byBsZWF2ZSBhIHJvdyBhdCB0aGUgZW5kIGZvciBub24tY2FydGVzaWFuIHN1YnBsb3RzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHN1YnBsb3RzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgZnJlZUxlbmd0aDogdHJ1ZSxcbiAgICAgICAgZGltZW5zaW9uczogMixcbiAgICAgICAgaXRlbXM6IHt2YWxUeXBlOiAnZW51bWVyYXRlZCcsIHZhbHVlczogW2NvdW50ZXJSZWdleCgneHknKS50b1N0cmluZygpLCAnJ10sIGVkaXRUeXBlOiAncGxvdCd9LFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVXNlZCBmb3IgZnJlZWZvcm0gZ3JpZHMsIHdoZXJlIHNvbWUgYXhlcyBtYXkgYmUgc2hhcmVkIGFjcm9zcyBzdWJwbG90cycsXG4gICAgICAgICAgICAnYnV0IG90aGVycyBhcmUgbm90LiBFYWNoIGVudHJ5IHNob3VsZCBiZSBhIGNhcnRlc2lhbiBzdWJwbG90IGlkLCBsaWtlJyxcbiAgICAgICAgICAgICcqeHkqIG9yICp4M3kyKiwgb3IgKiogdG8gbGVhdmUgdGhhdCBjZWxsIGVtcHR5LiBZb3UgbWF5IHJldXNlIHggYXhlcycsXG4gICAgICAgICAgICAnd2l0aGluIHRoZSBzYW1lIGNvbHVtbiwgYW5kIHkgYXhlcyB3aXRoaW4gdGhlIHNhbWUgcm93LicsXG4gICAgICAgICAgICAnTm9uLWNhcnRlc2lhbiBzdWJwbG90cyBhbmQgdHJhY2VzIHRoYXQgc3VwcG9ydCBgZG9tYWluYCBjYW4gcGxhY2UgdGhlbXNlbHZlcycsXG4gICAgICAgICAgICAnaW4gdGhpcyBncmlkIHNlcGFyYXRlbHkgdXNpbmcgdGhlIGBncmlkY2VsbGAgYXR0cmlidXRlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHhheGVzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgZnJlZUxlbmd0aDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IHt2YWxUeXBlOiAnZW51bWVyYXRlZCcsIHZhbHVlczogW2NhcnRlc2lhbklkUmVnZXgueC50b1N0cmluZygpLCAnJ10sIGVkaXRUeXBlOiAncGxvdCd9LFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVXNlZCB3aXRoIGB5YXhlc2Agd2hlbiB0aGUgeCBhbmQgeSBheGVzIGFyZSBzaGFyZWQgYWNyb3NzIGNvbHVtbnMgYW5kIHJvd3MuJyxcbiAgICAgICAgICAgICdFYWNoIGVudHJ5IHNob3VsZCBiZSBhbiB4IGF4aXMgaWQgbGlrZSAqeCosICp4MiosIGV0Yy4sIG9yICoqIHRvJyxcbiAgICAgICAgICAgICdub3QgcHV0IGFuIHggYXhpcyBpbiB0aGF0IGNvbHVtbi4gRW50cmllcyBvdGhlciB0aGFuICoqIG11c3QgYmUgdW5pcXVlLicsXG4gICAgICAgICAgICAnSWdub3JlZCBpZiBgc3VicGxvdHNgIGlzIHByZXNlbnQuIElmIG1pc3NpbmcgYnV0IGB5YXhlc2AgaXMgcHJlc2VudCwnLFxuICAgICAgICAgICAgJ3dpbGwgZ2VuZXJhdGUgY29uc2VjdXRpdmUgSURzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHlheGVzOiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbmZvX2FycmF5JyxcbiAgICAgICAgZnJlZUxlbmd0aDogdHJ1ZSxcbiAgICAgICAgaXRlbXM6IHt2YWxUeXBlOiAnZW51bWVyYXRlZCcsIHZhbHVlczogW2NhcnRlc2lhbklkUmVnZXgueS50b1N0cmluZygpLCAnJ10sIGVkaXRUeXBlOiAncGxvdCd9LFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVXNlZCB3aXRoIGB5YXhlc2Agd2hlbiB0aGUgeCBhbmQgeSBheGVzIGFyZSBzaGFyZWQgYWNyb3NzIGNvbHVtbnMgYW5kIHJvd3MuJyxcbiAgICAgICAgICAgICdFYWNoIGVudHJ5IHNob3VsZCBiZSBhbiB5IGF4aXMgaWQgbGlrZSAqeSosICp5MiosIGV0Yy4sIG9yICoqIHRvJyxcbiAgICAgICAgICAgICdub3QgcHV0IGEgeSBheGlzIGluIHRoYXQgcm93LiBFbnRyaWVzIG90aGVyIHRoYW4gKiogbXVzdCBiZSB1bmlxdWUuJyxcbiAgICAgICAgICAgICdJZ25vcmVkIGlmIGBzdWJwbG90c2AgaXMgcHJlc2VudC4gSWYgbWlzc2luZyBidXQgYHhheGVzYCBpcyBwcmVzZW50LCcsXG4gICAgICAgICAgICAnd2lsbCBnZW5lcmF0ZSBjb25zZWN1dGl2ZSBJRHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgcGF0dGVybjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydpbmRlcGVuZGVudCcsICdjb3VwbGVkJ10sXG4gICAgICAgIGRmbHQ6ICdjb3VwbGVkJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0lmIG5vIGBzdWJwbG90c2AsIGB4YXhlc2AsIG9yIGB5YXhlc2AgYXJlIGdpdmVuIGJ1dCB3ZSBkbyBoYXZlIGByb3dzYCBhbmQgYGNvbHVtbnNgLCcsXG4gICAgICAgICAgICAnd2UgY2FuIGdlbmVyYXRlIGRlZmF1bHRzIHVzaW5nIGNvbnNlY3V0aXZlIGF4aXMgSURzLCBpbiB0d28gd2F5czonLFxuICAgICAgICAgICAgJypjb3VwbGVkKiBnaXZlcyBvbmUgeCBheGlzIHBlciBjb2x1bW4gYW5kIG9uZSB5IGF4aXMgcGVyIHJvdy4nLFxuICAgICAgICAgICAgJyppbmRlcGVuZGVudCogdXNlcyBhIG5ldyB4eSBwYWlyIGZvciBlYWNoIGNlbGwsIGxlZnQtdG8tcmlnaHQgYWNyb3NzIGVhY2ggcm93JyxcbiAgICAgICAgICAgICd0aGVuIGl0ZXJhdGluZyByb3dzIGFjY29yZGluZyB0byBgcm93b3JkZXJgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHhnYXA6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnSG9yaXpvbnRhbCBzcGFjZSBiZXR3ZWVuIGdyaWQgY2VsbHMsIGV4cHJlc3NlZCBhcyBhIGZyYWN0aW9uJyxcbiAgICAgICAgICAgICdvZiB0aGUgdG90YWwgd2lkdGggYXZhaWxhYmxlIHRvIG9uZSBjZWxsLiBEZWZhdWx0cyB0byAwLjEnLFxuICAgICAgICAgICAgJ2ZvciBjb3VwbGVkLWF4ZXMgZ3JpZHMgYW5kIDAuMiBmb3IgaW5kZXBlbmRlbnQgZ3JpZHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeWdhcDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdwbG90JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdWZXJ0aWNhbCBzcGFjZSBiZXR3ZWVuIGdyaWQgY2VsbHMsIGV4cHJlc3NlZCBhcyBhIGZyYWN0aW9uJyxcbiAgICAgICAgICAgICdvZiB0aGUgdG90YWwgaGVpZ2h0IGF2YWlsYWJsZSB0byBvbmUgY2VsbC4gRGVmYXVsdHMgdG8gMC4xJyxcbiAgICAgICAgICAgICdmb3IgY291cGxlZC1heGVzIGdyaWRzIGFuZCAwLjMgZm9yIGluZGVwZW5kZW50IGdyaWRzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGRvbWFpbjogZG9tYWluQXR0cnMoe25hbWU6ICdncmlkJywgZWRpdFR5cGU6ICdwbG90Jywgbm9HcmlkQ2VsbDogdHJ1ZX0sIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUaGUgZmlyc3QgYW5kIGxhc3QgY2VsbHMgZW5kIGV4YWN0bHkgYXQgdGhlIGRvbWFpbicsXG4gICAgICAgICAgICAnZWRnZXMsIHdpdGggbm8gZ3JvdXQgYXJvdW5kIHRoZSBlZGdlcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSksXG4gICAgeHNpZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnYm90dG9tJywgJ2JvdHRvbSBwbG90JywgJ3RvcCBwbG90JywgJ3RvcCddLFxuICAgICAgICBkZmx0OiAnYm90dG9tIHBsb3QnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB3aGVyZSB0aGUgeCBheGlzIGxhYmVscyBhbmQgdGl0bGVzIGdvLiAqYm90dG9tKiBtZWFucycsXG4gICAgICAgICAgICAndGhlIHZlcnkgYm90dG9tIG9mIHRoZSBncmlkLiAqYm90dG9tIHBsb3QqIGlzIHRoZSBsb3dlc3QgcGxvdCcsXG4gICAgICAgICAgICAndGhhdCBlYWNoIHggYXhpcyBpcyB1c2VkIGluLiAqdG9wKiBhbmQgKnRvcCBwbG90KiBhcmUgc2ltaWxhci4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5c2lkZToge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydsZWZ0JywgJ2xlZnQgcGxvdCcsICdyaWdodCBwbG90JywgJ3JpZ2h0J10sXG4gICAgICAgIGRmbHQ6ICdsZWZ0IHBsb3QnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB3aGVyZSB0aGUgeSBheGlzIGxhYmVscyBhbmQgdGl0bGVzIGdvLiAqbGVmdCogbWVhbnMnLFxuICAgICAgICAgICAgJ3RoZSB2ZXJ5IGxlZnQgZWRnZSBvZiB0aGUgZ3JpZC4gKmxlZnQgcGxvdCogaXMgdGhlIGxlZnRtb3N0IHBsb3QnLFxuICAgICAgICAgICAgJ3RoYXQgZWFjaCB5IGF4aXMgaXMgdXNlZCBpbi4gKnJpZ2h0KiBhbmQgKnJpZ2h0IHBsb3QqIGFyZSBzaW1pbGFyLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGVkaXRUeXBlOiAncGxvdCdcbn07XG5cbmZ1bmN0aW9uIGdldEF4ZXMobGF5b3V0LCBncmlkLCBheExldHRlcikge1xuICAgIHZhciBncmlkVmFsID0gZ3JpZFtheExldHRlciArICdheGVzJ107XG4gICAgdmFyIHNwbG9tVmFsID0gT2JqZWN0LmtleXMoKGxheW91dC5fc3Bsb21BeGVzIHx8IHt9KVtheExldHRlcl0gfHwge30pO1xuXG4gICAgaWYoQXJyYXkuaXNBcnJheShncmlkVmFsKSkgcmV0dXJuIGdyaWRWYWw7XG4gICAgaWYoc3Bsb21WYWwubGVuZ3RoKSByZXR1cm4gc3Bsb21WYWw7XG59XG5cbi8vIHRoZSBzaGFwZSBvZiB0aGUgZ3JpZCAtIHRoaXMgbmVlZHMgdG8gYmUgZG9uZSBCRUZPUkUgc3VwcGx5RGF0YURlZmF1bHRzXG4vLyBzbyB0aGF0IG5vbi1zdWJwbG90IHRyYWNlcyBjYW4gcGxhY2UgdGhlbXNlbHZlcyBpbiB0aGUgZ3JpZFxuZnVuY3Rpb24gc2l6ZURlZmF1bHRzKGxheW91dEluLCBsYXlvdXRPdXQpIHtcbiAgICB2YXIgZ3JpZEluID0gbGF5b3V0SW4uZ3JpZCB8fCB7fTtcbiAgICB2YXIgeEF4ZXMgPSBnZXRBeGVzKGxheW91dE91dCwgZ3JpZEluLCAneCcpO1xuICAgIHZhciB5QXhlcyA9IGdldEF4ZXMobGF5b3V0T3V0LCBncmlkSW4sICd5Jyk7XG5cbiAgICBpZighbGF5b3V0SW4uZ3JpZCAmJiAheEF4ZXMgJiYgIXlBeGVzKSByZXR1cm47XG5cbiAgICB2YXIgaGFzU3VicGxvdEdyaWQgPSBBcnJheS5pc0FycmF5KGdyaWRJbi5zdWJwbG90cykgJiYgQXJyYXkuaXNBcnJheShncmlkSW4uc3VicGxvdHNbMF0pO1xuICAgIHZhciBoYXNYYXhlcyA9IEFycmF5LmlzQXJyYXkoeEF4ZXMpO1xuICAgIHZhciBoYXNZYXhlcyA9IEFycmF5LmlzQXJyYXkoeUF4ZXMpO1xuICAgIHZhciBpc1NwbG9tR2VuZXJhdGVkID0gKFxuICAgICAgICBoYXNYYXhlcyAmJiB4QXhlcyAhPT0gZ3JpZEluLnhheGVzICYmXG4gICAgICAgIGhhc1lheGVzICYmIHlBeGVzICE9PSBncmlkSW4ueWF4ZXNcbiAgICApO1xuXG4gICAgdmFyIGRmbHRSb3dzLCBkZmx0Q29sdW1ucztcblxuICAgIGlmKGhhc1N1YnBsb3RHcmlkKSB7XG4gICAgICAgIGRmbHRSb3dzID0gZ3JpZEluLnN1YnBsb3RzLmxlbmd0aDtcbiAgICAgICAgZGZsdENvbHVtbnMgPSBncmlkSW4uc3VicGxvdHNbMF0ubGVuZ3RoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGlmKGhhc1lheGVzKSBkZmx0Um93cyA9IHlBeGVzLmxlbmd0aDtcbiAgICAgICAgaWYoaGFzWGF4ZXMpIGRmbHRDb2x1bW5zID0geEF4ZXMubGVuZ3RoO1xuICAgIH1cblxuICAgIHZhciBncmlkT3V0ID0gVGVtcGxhdGUubmV3Q29udGFpbmVyKGxheW91dE91dCwgJ2dyaWQnKTtcblxuICAgIGZ1bmN0aW9uIGNvZXJjZShhdHRyLCBkZmx0KSB7XG4gICAgICAgIHJldHVybiBMaWIuY29lcmNlKGdyaWRJbiwgZ3JpZE91dCwgZ3JpZEF0dHJzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICB2YXIgcm93cyA9IGNvZXJjZSgncm93cycsIGRmbHRSb3dzKTtcbiAgICB2YXIgY29sdW1ucyA9IGNvZXJjZSgnY29sdW1ucycsIGRmbHRDb2x1bW5zKTtcblxuICAgIGlmKCEocm93cyAqIGNvbHVtbnMgPiAxKSkge1xuICAgICAgICBkZWxldGUgbGF5b3V0T3V0LmdyaWQ7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZighaGFzU3VicGxvdEdyaWQgJiYgIWhhc1hheGVzICYmICFoYXNZYXhlcykge1xuICAgICAgICB2YXIgdXNlRGVmYXVsdFN1YnBsb3RzID0gY29lcmNlKCdwYXR0ZXJuJykgPT09ICdpbmRlcGVuZGVudCc7XG4gICAgICAgIGlmKHVzZURlZmF1bHRTdWJwbG90cykgaGFzU3VicGxvdEdyaWQgPSB0cnVlO1xuICAgIH1cbiAgICBncmlkT3V0Ll9oYXNTdWJwbG90R3JpZCA9IGhhc1N1YnBsb3RHcmlkO1xuXG4gICAgdmFyIHJvd09yZGVyID0gY29lcmNlKCdyb3dvcmRlcicpO1xuICAgIHZhciByZXZlcnNlZCA9IHJvd09yZGVyID09PSAndG9wIHRvIGJvdHRvbSc7XG5cbiAgICB2YXIgZGZsdEdhcFggPSBoYXNTdWJwbG90R3JpZCA/IDAuMiA6IDAuMTtcbiAgICB2YXIgZGZsdEdhcFkgPSBoYXNTdWJwbG90R3JpZCA/IDAuMyA6IDAuMTtcblxuICAgIHZhciBkZmx0U2lkZVgsIGRmbHRTaWRlWTtcbiAgICBpZihpc1NwbG9tR2VuZXJhdGVkICYmIGxheW91dE91dC5fc3Bsb21HcmlkRGZsdCkge1xuICAgICAgICBkZmx0U2lkZVggPSBsYXlvdXRPdXQuX3NwbG9tR3JpZERmbHQueHNpZGU7XG4gICAgICAgIGRmbHRTaWRlWSA9IGxheW91dE91dC5fc3Bsb21HcmlkRGZsdC55c2lkZTtcbiAgICB9XG5cbiAgICBncmlkT3V0Ll9kb21haW5zID0ge1xuICAgICAgICB4OiBmaWxsR3JpZFBvc2l0aW9ucygneCcsIGNvZXJjZSwgZGZsdEdhcFgsIGRmbHRTaWRlWCwgY29sdW1ucyksXG4gICAgICAgIHk6IGZpbGxHcmlkUG9zaXRpb25zKCd5JywgY29lcmNlLCBkZmx0R2FwWSwgZGZsdFNpZGVZLCByb3dzLCByZXZlcnNlZClcbiAgICB9O1xufVxuXG4vLyBjb2VyY2UgeCBvciB5IHNpemluZyBhdHRyaWJ1dGVzIGFuZCByZXR1cm4gYW4gYXJyYXkgb2YgZG9tYWlucyBmb3IgdGhpcyBkaXJlY3Rpb25cbmZ1bmN0aW9uIGZpbGxHcmlkUG9zaXRpb25zKGF4TGV0dGVyLCBjb2VyY2UsIGRmbHRHYXAsIGRmbHRTaWRlLCBsZW4sIHJldmVyc2VkKSB7XG4gICAgdmFyIGRpckdhcCA9IGNvZXJjZShheExldHRlciArICdnYXAnLCBkZmx0R2FwKTtcbiAgICB2YXIgZG9tYWluID0gY29lcmNlKCdkb21haW4uJyArIGF4TGV0dGVyKTtcbiAgICBjb2VyY2UoYXhMZXR0ZXIgKyAnc2lkZScsIGRmbHRTaWRlKTtcblxuICAgIHZhciBvdXQgPSBuZXcgQXJyYXkobGVuKTtcbiAgICB2YXIgc3RhcnQgPSBkb21haW5bMF07XG4gICAgdmFyIHN0ZXAgPSAoZG9tYWluWzFdIC0gc3RhcnQpIC8gKGxlbiAtIGRpckdhcCk7XG4gICAgdmFyIGNlbGxEb21haW4gPSBzdGVwICogKDEgLSBkaXJHYXApO1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgY2VsbFN0YXJ0ID0gc3RhcnQgKyBzdGVwICogaTtcbiAgICAgICAgb3V0W3JldmVyc2VkID8gKGxlbiAtIDEgLSBpKSA6IGldID0gW2NlbGxTdGFydCwgY2VsbFN0YXJ0ICsgY2VsbERvbWFpbl07XG4gICAgfVxuICAgIHJldHVybiBvdXQ7XG59XG5cbi8vIHRoZSAoY2FydGVzaWFuKSBjb250ZW50cyBvZiB0aGUgZ3JpZCAtIHRoaXMgbmVlZHMgdG8gaGFwcGVuIEFGVEVSIHN1cHBseURhdGFEZWZhdWx0c1xuLy8gc28gdGhhdCB3ZSBrbm93IHdoYXQgY2FydGVzaWFuIHN1YnBsb3RzIGFyZSBhdmFpbGFibGVcbmZ1bmN0aW9uIGNvbnRlbnREZWZhdWx0cyhsYXlvdXRJbiwgbGF5b3V0T3V0KSB7XG4gICAgdmFyIGdyaWRPdXQgPSBsYXlvdXRPdXQuZ3JpZDtcbiAgICAvLyBtYWtlIHN1cmUgd2UgZ290IHRvIHRoZSBlbmQgb2YgaGFuZGxlR3JpZFNpemluZ1xuICAgIGlmKCFncmlkT3V0IHx8ICFncmlkT3V0Ll9kb21haW5zKSByZXR1cm47XG5cbiAgICB2YXIgZ3JpZEluID0gbGF5b3V0SW4uZ3JpZCB8fCB7fTtcbiAgICB2YXIgc3VicGxvdHMgPSBsYXlvdXRPdXQuX3N1YnBsb3RzO1xuICAgIHZhciBoYXNTdWJwbG90R3JpZCA9IGdyaWRPdXQuX2hhc1N1YnBsb3RHcmlkO1xuICAgIHZhciByb3dzID0gZ3JpZE91dC5yb3dzO1xuICAgIHZhciBjb2x1bW5zID0gZ3JpZE91dC5jb2x1bW5zO1xuICAgIHZhciB1c2VEZWZhdWx0U3VicGxvdHMgPSBncmlkT3V0LnBhdHRlcm4gPT09ICdpbmRlcGVuZGVudCc7XG5cbiAgICB2YXIgaSwgaiwgeElkLCB5SWQsIHN1YnBsb3RJZCwgc3VicGxvdHNPdXQsIHlQb3M7XG5cbiAgICB2YXIgYXhpc01hcCA9IGdyaWRPdXQuX2F4aXNNYXAgPSB7fTtcblxuICAgIGlmKGhhc1N1YnBsb3RHcmlkKSB7XG4gICAgICAgIHZhciBzdWJwbG90c0luID0gZ3JpZEluLnN1YnBsb3RzIHx8IFtdO1xuICAgICAgICBzdWJwbG90c091dCA9IGdyaWRPdXQuc3VicGxvdHMgPSBuZXcgQXJyYXkocm93cyk7XG4gICAgICAgIHZhciBpbmRleCA9IDE7XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcm93T3V0ID0gc3VicGxvdHNPdXRbaV0gPSBuZXcgQXJyYXkoY29sdW1ucyk7XG4gICAgICAgICAgICB2YXIgcm93SW4gPSBzdWJwbG90c0luW2ldIHx8IFtdO1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgY29sdW1uczsgaisrKSB7XG4gICAgICAgICAgICAgICAgaWYodXNlRGVmYXVsdFN1YnBsb3RzKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnBsb3RJZCA9IChpbmRleCA9PT0gMSkgPyAneHknIDogKCd4JyArIGluZGV4ICsgJ3knICsgaW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICBpbmRleCsrO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBzdWJwbG90SWQgPSByb3dJbltqXTtcblxuICAgICAgICAgICAgICAgIHJvd091dFtqXSA9ICcnO1xuXG4gICAgICAgICAgICAgICAgaWYoc3VicGxvdHMuY2FydGVzaWFuLmluZGV4T2Yoc3VicGxvdElkKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgeVBvcyA9IHN1YnBsb3RJZC5pbmRleE9mKCd5Jyk7XG4gICAgICAgICAgICAgICAgICAgIHhJZCA9IHN1YnBsb3RJZC5zbGljZSgwLCB5UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgeUlkID0gc3VicGxvdElkLnNsaWNlKHlQb3MpO1xuICAgICAgICAgICAgICAgICAgICBpZigoYXhpc01hcFt4SWRdICE9PSB1bmRlZmluZWQgJiYgYXhpc01hcFt4SWRdICE9PSBqKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgKGF4aXNNYXBbeUlkXSAhPT0gdW5kZWZpbmVkICYmIGF4aXNNYXBbeUlkXSAhPT0gaSlcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJvd091dFtqXSA9IHN1YnBsb3RJZDtcbiAgICAgICAgICAgICAgICAgICAgYXhpc01hcFt4SWRdID0gajtcbiAgICAgICAgICAgICAgICAgICAgYXhpc01hcFt5SWRdID0gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgeEF4ZXMgPSBnZXRBeGVzKGxheW91dE91dCwgZ3JpZEluLCAneCcpO1xuICAgICAgICB2YXIgeUF4ZXMgPSBnZXRBeGVzKGxheW91dE91dCwgZ3JpZEluLCAneScpO1xuICAgICAgICBncmlkT3V0LnhheGVzID0gZmlsbEdyaWRBeGVzKHhBeGVzLCBzdWJwbG90cy54YXhpcywgY29sdW1ucywgYXhpc01hcCwgJ3gnKTtcbiAgICAgICAgZ3JpZE91dC55YXhlcyA9IGZpbGxHcmlkQXhlcyh5QXhlcywgc3VicGxvdHMueWF4aXMsIHJvd3MsIGF4aXNNYXAsICd5Jyk7XG4gICAgfVxuXG4gICAgdmFyIGFuY2hvcnMgPSBncmlkT3V0Ll9hbmNob3JzID0ge307XG4gICAgdmFyIHJldmVyc2VkID0gZ3JpZE91dC5yb3dvcmRlciA9PT0gJ3RvcCB0byBib3R0b20nO1xuXG4gICAgZm9yKHZhciBheGlzSWQgaW4gYXhpc01hcCkge1xuICAgICAgICB2YXIgYXhMZXR0ZXIgPSBheGlzSWQuY2hhckF0KDApO1xuICAgICAgICB2YXIgc2lkZSA9IGdyaWRPdXRbYXhMZXR0ZXIgKyAnc2lkZSddO1xuXG4gICAgICAgIHZhciBpMCwgaW5jLCBpRmluYWw7XG5cbiAgICAgICAgaWYoc2lkZS5sZW5ndGggPCA4KSB7XG4gICAgICAgICAgICAvLyBncmlkIGVkZ2UgLSAgaWUgbm90IFwiKiBwbG90XCIgLSBtYWtlIHRoZXNlIGFzIGZyZWUgYXhlc1xuICAgICAgICAgICAgLy8gc2luY2Ugd2UncmUgbm90IGd1YXJhbnRlZWQgdG8gaGF2ZSBhIHN1YnBsb3QgdGhlcmUgYXQgYWxsXG4gICAgICAgICAgICBhbmNob3JzW2F4aXNJZF0gPSAnZnJlZSc7XG4gICAgICAgIH0gZWxzZSBpZihheExldHRlciA9PT0gJ3gnKSB7XG4gICAgICAgICAgICBpZigoc2lkZS5jaGFyQXQoMCkgPT09ICd0JykgPT09IHJldmVyc2VkKSB7XG4gICAgICAgICAgICAgICAgaTAgPSAwO1xuICAgICAgICAgICAgICAgIGluYyA9IDE7XG4gICAgICAgICAgICAgICAgaUZpbmFsID0gcm93cztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaTAgPSByb3dzIC0gMTtcbiAgICAgICAgICAgICAgICBpbmMgPSAtMTtcbiAgICAgICAgICAgICAgICBpRmluYWwgPSAtMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmKGhhc1N1YnBsb3RHcmlkKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbHVtbiA9IGF4aXNNYXBbYXhpc0lkXTtcbiAgICAgICAgICAgICAgICBmb3IoaSA9IGkwOyBpICE9PSBpRmluYWw7IGkgKz0gaW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHN1YnBsb3RJZCA9IHN1YnBsb3RzT3V0W2ldW2NvbHVtbl07XG4gICAgICAgICAgICAgICAgICAgIGlmKCFzdWJwbG90SWQpIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgICAgICB5UG9zID0gc3VicGxvdElkLmluZGV4T2YoJ3knKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoc3VicGxvdElkLnNsaWNlKDAsIHlQb3MpID09PSBheGlzSWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFuY2hvcnNbYXhpc0lkXSA9IHN1YnBsb3RJZC5zbGljZSh5UG9zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IoaSA9IGkwOyBpICE9PSBpRmluYWw7IGkgKz0gaW5jKSB7XG4gICAgICAgICAgICAgICAgICAgIHlJZCA9IGdyaWRPdXQueWF4ZXNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmKHN1YnBsb3RzLmNhcnRlc2lhbi5pbmRleE9mKGF4aXNJZCArIHlJZCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3JzW2F4aXNJZF0gPSB5SWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmKChzaWRlLmNoYXJBdCgwKSA9PT0gJ2wnKSkge1xuICAgICAgICAgICAgICAgIGkwID0gMDtcbiAgICAgICAgICAgICAgICBpbmMgPSAxO1xuICAgICAgICAgICAgICAgIGlGaW5hbCA9IGNvbHVtbnM7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGkwID0gY29sdW1ucyAtIDE7XG4gICAgICAgICAgICAgICAgaW5jID0gLTE7XG4gICAgICAgICAgICAgICAgaUZpbmFsID0gLTE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihoYXNTdWJwbG90R3JpZCkge1xuICAgICAgICAgICAgICAgIHZhciByb3cgPSBheGlzTWFwW2F4aXNJZF07XG4gICAgICAgICAgICAgICAgZm9yKGkgPSBpMDsgaSAhPT0gaUZpbmFsOyBpICs9IGluYykge1xuICAgICAgICAgICAgICAgICAgICBzdWJwbG90SWQgPSBzdWJwbG90c091dFtyb3ddW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZighc3VicGxvdElkKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgeVBvcyA9IHN1YnBsb3RJZC5pbmRleE9mKCd5Jyk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHN1YnBsb3RJZC5zbGljZSh5UG9zKSA9PT0gYXhpc0lkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmNob3JzW2F4aXNJZF0gPSBzdWJwbG90SWQuc2xpY2UoMCwgeVBvcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSBpMDsgaSAhPT0gaUZpbmFsOyBpICs9IGluYykge1xuICAgICAgICAgICAgICAgICAgICB4SWQgPSBncmlkT3V0LnhheGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZihzdWJwbG90cy5jYXJ0ZXNpYW4uaW5kZXhPZih4SWQgKyBheGlzSWQpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgYW5jaG9yc1theGlzSWRdID0geElkO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGZpbGxHcmlkQXhlcyhheGVzSW4sIGF4ZXNBbGxvd2VkLCBsZW4sIGF4aXNNYXAsIGF4TGV0dGVyKSB7XG4gICAgdmFyIG91dCA9IG5ldyBBcnJheShsZW4pO1xuICAgIHZhciBpO1xuXG4gICAgZnVuY3Rpb24gZmlsbE9uZUF4aXMoaSwgYXhpc0lkKSB7XG4gICAgICAgIGlmKGF4ZXNBbGxvd2VkLmluZGV4T2YoYXhpc0lkKSAhPT0gLTEgJiYgYXhpc01hcFtheGlzSWRdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIG91dFtpXSA9IGF4aXNJZDtcbiAgICAgICAgICAgIGF4aXNNYXBbYXhpc0lkXSA9IGk7XG4gICAgICAgIH0gZWxzZSBvdXRbaV0gPSAnJztcbiAgICB9XG5cbiAgICBpZihBcnJheS5pc0FycmF5KGF4ZXNJbikpIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGZpbGxPbmVBeGlzKGksIGF4ZXNJbltpXSk7XG4gICAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyBkZWZhdWx0IGF4aXMgbGlzdCBpcyB0aGUgZmlyc3QgYGxlbmAgYXhpcyBpZHNcbiAgICAgICAgZmlsbE9uZUF4aXMoMCwgYXhMZXR0ZXIpO1xuICAgICAgICBmb3IoaSA9IDE7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgZmlsbE9uZUF4aXMoaSwgYXhMZXR0ZXIgKyAoaSArIDEpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICAgIG1vZHVsZVR5cGU6ICdjb21wb25lbnQnLFxuICAgIG5hbWU6ICdncmlkJyxcblxuICAgIHNjaGVtYToge1xuICAgICAgICBsYXlvdXQ6IHtncmlkOiBncmlkQXR0cnN9XG4gICAgfSxcblxuICAgIGxheW91dEF0dHJpYnV0ZXM6IGdyaWRBdHRycyxcbiAgICBzaXplRGVmYXVsdHM6IHNpemVEZWZhdWx0cyxcbiAgICBjb250ZW50RGVmYXVsdHM6IGNvbnRlbnREZWZhdWx0c1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=