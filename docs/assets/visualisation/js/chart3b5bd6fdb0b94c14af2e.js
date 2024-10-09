(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_histogram_attributes_js-node_modules_plotly_js_src_-d83651"],{

/***/ "./node_modules/plotly.js/src/traces/histogram/attributes.js":
/*!*******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/attributes.js ***!
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



var barAttrs = __webpack_require__(/*! ../bar/attributes */ "./node_modules/plotly.js/src/traces/bar/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var makeBinAttrs = __webpack_require__(/*! ./bin_attributes */ "./node_modules/plotly.js/src/traces/histogram/bin_attributes.js");
var constants = __webpack_require__(/*! ./constants */ "./node_modules/plotly.js/src/traces/histogram/constants.js");
var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

module.exports = {
    x: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the sample data to be binned on the x axis.'
        ].join(' ')
    },
    y: {
        valType: 'data_array',
        editType: 'calc+clearAxisTypes',
        description: [
            'Sets the sample data to be binned on the y axis.'
        ].join(' ')
    },

    text: extendFlat({}, barAttrs.text, {
        description: [
            'Sets hover text elements associated with each bar.',
            'If a single string, the same string appears over all bars.',
            'If an array of string, the items are mapped in order to the',
            'this trace\'s coordinates.'
        ].join(' ')
    }),
    hovertext: extendFlat({}, barAttrs.hovertext, {
        description: 'Same as `text`.'
    }),
    orientation: barAttrs.orientation,

    histfunc: {
        valType: 'enumerated',
        values: ['count', 'sum', 'avg', 'min', 'max'],
        role: 'style',
        dflt: 'count',
        editType: 'calc',
        description: [
            'Specifies the binning function used for this histogram trace.',

            'If *count*, the histogram values are computed by counting the',
            'number of values lying inside each bin.',

            'If *sum*, *avg*, *min*, *max*,',
            'the histogram values are computed using',
            'the sum, the average, the minimum or the maximum',
            'of the values lying inside each bin respectively.'
        ].join(' ')
    },
    histnorm: {
        valType: 'enumerated',
        values: ['', 'percent', 'probability', 'density', 'probability density'],
        dflt: '',
        role: 'style',
        editType: 'calc',
        description: [
            'Specifies the type of normalization used for this histogram trace.',

            'If **, the span of each bar corresponds to the number of',
            'occurrences (i.e. the number of data points lying inside the bins).',

            'If *percent* / *probability*, the span of each bar corresponds to',
            'the percentage / fraction of occurrences with respect to the total',
            'number of sample points',
            '(here, the sum of all bin HEIGHTS equals 100% / 1).',

            'If *density*, the span of each bar corresponds to the number of',
            'occurrences in a bin divided by the size of the bin interval',
            '(here, the sum of all bin AREAS equals the',
            'total number of sample points).',

            'If *probability density*, the area of each bar corresponds to the',
            'probability that an event will fall into the corresponding bin',
            '(here, the sum of all bin AREAS equals 1).'
        ].join(' ')
    },

    cumulative: {
        enabled: {
            valType: 'boolean',
            dflt: false,
            role: 'info',
            editType: 'calc',
            description: [
                'If true, display the cumulative distribution by summing the',
                'binned values. Use the `direction` and `centralbin` attributes',
                'to tune the accumulation method.',
                'Note: in this mode, the *density* `histnorm` settings behave',
                'the same as their equivalents without *density*:',
                '** and *density* both rise to the number of data points, and',
                '*probability* and *probability density* both rise to the',
                'number of sample points.'
            ].join(' ')
        },

        direction: {
            valType: 'enumerated',
            values: ['increasing', 'decreasing'],
            dflt: 'increasing',
            role: 'info',
            editType: 'calc',
            description: [
                'Only applies if cumulative is enabled.',
                'If *increasing* (default) we sum all prior bins, so the result',
                'increases from left to right. If *decreasing* we sum later bins',
                'so the result decreases from left to right.'
            ].join(' ')
        },

        currentbin: {
            valType: 'enumerated',
            values: ['include', 'exclude', 'half'],
            dflt: 'include',
            role: 'info',
            editType: 'calc',
            description: [
                'Only applies if cumulative is enabled.',
                'Sets whether the current bin is included, excluded, or has half',
                'of its value included in the current cumulative value.',
                '*include* is the default for compatibility with various other',
                'tools, however it introduces a half-bin bias to the results.',
                '*exclude* makes the opposite half-bin bias, and *half* removes',
                'it.'
            ].join(' ')
        },
        editType: 'calc'
    },
    nbinsx: {
        valType: 'integer',
        min: 0,
        dflt: 0,
        role: 'style',
        editType: 'calc',
        description: [
            'Specifies the maximum number of desired bins. This value will be used',
            'in an algorithm that will decide the optimal bin size such that the',
            'histogram best visualizes the distribution of the data.',
            'Ignored if `xbins.size` is provided.'
        ].join(' ')
    },
    xbins: makeBinAttrs('x', true),

    nbinsy: {
        valType: 'integer',
        min: 0,
        dflt: 0,
        role: 'style',
        editType: 'calc',
        description: [
            'Specifies the maximum number of desired bins. This value will be used',
            'in an algorithm that will decide the optimal bin size such that the',
            'histogram best visualizes the distribution of the data.',
            'Ignored if `ybins.size` is provided.'
        ].join(' ')
    },
    ybins: makeBinAttrs('y', true),
    autobinx: {
        valType: 'boolean',
        dflt: null,
        role: 'style',
        editType: 'calc',
        description: [
            'Obsolete: since v1.42 each bin attribute is auto-determined',
            'separately and `autobinx` is not needed. However, we accept',
            '`autobinx: true` or `false` and will update `xbins` accordingly',
            'before deleting `autobinx` from the trace.'
        ].join(' ')
    },
    autobiny: {
        valType: 'boolean',
        dflt: null,
        role: 'style',
        editType: 'calc',
        description: [
            'Obsolete: since v1.42 each bin attribute is auto-determined',
            'separately and `autobiny` is not needed. However, we accept',
            '`autobiny: true` or `false` and will update `ybins` accordingly',
            'before deleting `autobiny` from the trace.'
        ].join(' ')
    },

    bingroup: {
        valType: 'string',
        role: 'info',
        dflt: '',
        editType: 'calc',
        description: [
            'Set a group of histogram traces which will have compatible bin settings.',
            'Note that traces on the same subplot and with the same *orientation*',
            'under `barmode` *stack*, *relative* and *group* are forced into the same bingroup,',
            'Using `bingroup`, traces under `barmode` *overlay* and on different axes',
            '(of the same axis type) can have compatible bin settings.',
            'Note that histogram and histogram2d* trace can share the same `bingroup`'
        ].join(' ')
    },

    hovertemplate: hovertemplateAttrs({}, {
        keys: constants.eventDataKeys
    }),

    marker: barAttrs.marker,

    offsetgroup: barAttrs.offsetgroup,
    alignmentgroup: barAttrs.alignmentgroup,

    selected: barAttrs.selected,
    unselected: barAttrs.unselected,

    _deprecated: {
        bardir: barAttrs._deprecated.bardir
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/bin_attributes.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/bin_attributes.js ***!
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



module.exports = function makeBinAttrs(axLetter, match) {
    return {
        start: {
            valType: 'any', // for date axes
            role: 'style',
            editType: 'calc',
            description: [
                'Sets the starting value for the', axLetter,
                'axis bins. Defaults to the minimum data value,',
                'shifted down if necessary to make nice round values',
                'and to remove ambiguous bin edges. For example, if most of the',
                'data is integers we shift the bin edges 0.5 down, so a `size`',
                'of 5 would have a default `start` of -0.5, so it is clear',
                'that 0-4 are in the first bin, 5-9 in the second, but',
                'continuous data gets a start of 0 and bins [0,5), [5,10) etc.',
                'Dates behave similarly, and `start` should be a date string.',
                'For category data, `start` is based on the category serial',
                'numbers, and defaults to -0.5.',
                (match ? (
                    'If multiple non-overlaying histograms share a subplot, ' +
                    'the first explicit `start` is used exactly and all others ' +
                    'are shifted down (if necessary) to differ from that one ' +
                    'by an integer number of bins.'
                ) : '')
            ].join(' ')
        },
        end: {
            valType: 'any', // for date axes
            role: 'style',
            editType: 'calc',
            description: [
                'Sets the end value for the', axLetter,
                'axis bins. The last bin may not end exactly at this value,',
                'we increment the bin edge by `size` from `start` until we',
                'reach or exceed `end`. Defaults to the maximum data value.',
                'Like `start`, for dates use a date string, and for category',
                'data `end` is based on the category serial numbers.'
            ].join(' ')
        },
        size: {
            valType: 'any', // for date axes
            role: 'style',
            editType: 'calc',
            description: [
                'Sets the size of each', axLetter, 'axis bin.',
                'Default behavior: If `nbins' + axLetter + '` is 0 or omitted,',
                'we choose a nice round bin size such that the number of bins',
                'is about the same as the typical number of samples in each bin.',
                'If `nbins' + axLetter + '` is provided, we choose a nice round',
                'bin size giving no more than that many bins.',
                'For date data, use milliseconds or *M<n>* for months, as in',
                '`axis.dtick`. For category data, the number of categories to',
                'bin together (always defaults to 1).',
                (match ? (
                    'If multiple non-overlaying histograms share a subplot, ' +
                    'the first explicit `size` is used and all others discarded. ' +
                    'If no `size` is provided,the sample data from all traces ' +
                    'is combined to determine `size` as described above.'
                ) : '')
            ].join(' ')
        },
        editType: 'calc'
    };
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/constants.js":
/*!******************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/constants.js ***!
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
    eventDataKeys: ['binNumber']
};


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/histogram/cross_trace_defaults.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/histogram/cross_trace_defaults.js ***!
  \*****************************************************************************/
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
var axisIds = __webpack_require__(/*! ../../plots/cartesian/axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js");

var traceIs = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js").traceIs;
var handleGroupingDefaults = __webpack_require__(/*! ../bar/defaults */ "./node_modules/plotly.js/src/traces/bar/defaults.js").handleGroupingDefaults;

var nestedProperty = Lib.nestedProperty;
var getAxisGroup = axisIds.getAxisGroup;

var BINATTRS = [
    {aStr: {x: 'xbins.start', y: 'ybins.start'}, name: 'start'},
    {aStr: {x: 'xbins.end', y: 'ybins.end'}, name: 'end'},
    {aStr: {x: 'xbins.size', y: 'ybins.size'}, name: 'size'},
    {aStr: {x: 'nbinsx', y: 'nbinsy'}, name: 'nbins'}
];

var BINDIRECTIONS = ['x', 'y'];

// handle bin attrs and relink auto-determined values so fullData is complete
module.exports = function crossTraceDefaults(fullData, fullLayout) {
    var allBinOpts = fullLayout._histogramBinOpts = {};
    var histTraces = [];
    var mustMatchTracesLookup = {};
    var otherTracesList = [];

    var traceOut, traces, groupName, binDir;
    var i, j, k;

    function coerce(attr, dflt) {
        return Lib.coerce(traceOut._input, traceOut, traceOut._module.attributes, attr, dflt);
    }

    function orientation2binDir(traceOut) {
        return traceOut.orientation === 'v' ? 'x' : 'y';
    }

    function getAxisType(traceOut, binDir) {
        var ax = axisIds.getFromTrace({_fullLayout: fullLayout}, traceOut, binDir);
        return ax.type;
    }

    function fillBinOpts(traceOut, groupName, binDir) {
        // N.B. group traces that don't have a bingroup with themselves
        var fallbackGroupName = traceOut.uid + '__' + binDir;
        if(!groupName) groupName = fallbackGroupName;

        var axType = getAxisType(traceOut, binDir);
        var calendar = traceOut[binDir + 'calendar'] || '';
        var binOpts = allBinOpts[groupName];
        var needsNewItem = true;

        if(binOpts) {
            if(axType === binOpts.axType && calendar === binOpts.calendar) {
                needsNewItem = false;
                binOpts.traces.push(traceOut);
                binOpts.dirs.push(binDir);
            } else {
                groupName = fallbackGroupName;

                if(axType !== binOpts.axType) {
                    Lib.warn([
                        'Attempted to group the bins of trace', traceOut.index,
                        'set on a', 'type:' + axType, 'axis',
                        'with bins on', 'type:' + binOpts.axType, 'axis.'
                    ].join(' '));
                }
                if(calendar !== binOpts.calendar) {
                    // prohibit bingroup for traces using different calendar,
                    // there's probably a way to make this work, but skip for now
                    Lib.warn([
                        'Attempted to group the bins of trace', traceOut.index,
                        'set with a', calendar, 'calendar',
                        'with bins',
                        (binOpts.calendar ? 'on a ' + binOpts.calendar + ' calendar' : 'w/o a set calendar')
                    ].join(' '));
                }
            }
        }

        if(needsNewItem) {
            allBinOpts[groupName] = {
                traces: [traceOut],
                dirs: [binDir],
                axType: axType,
                calendar: traceOut[binDir + 'calendar'] || ''
            };
        }
        traceOut['_' + binDir + 'bingroup'] = groupName;
    }

    for(i = 0; i < fullData.length; i++) {
        traceOut = fullData[i];

        if(traceIs(traceOut, 'histogram')) {
            histTraces.push(traceOut);

            // TODO: this shouldn't be relinked as it's only used within calc
            // https://github.com/plotly/plotly.js/issues/749
            delete traceOut._xautoBinFinished;
            delete traceOut._yautoBinFinished;

            // N.B. need to coerce *alignmentgroup* before *bingroup*, as traces
            // in same alignmentgroup "have to match"
            if(!traceIs(traceOut, '2dMap')) {
                handleGroupingDefaults(traceOut._input, traceOut, fullLayout, coerce);
            }
        }
    }

    var alignmentOpts = fullLayout._alignmentOpts || {};

    // Look for traces that "have to match", that is:
    // - 1d histogram traces on the same subplot with same orientation under barmode:stack,
    // - 1d histogram traces on the same subplot with same orientation under barmode:group
    // - 1d histogram traces on the same position axis with the same orientation
    //   and the same *alignmentgroup* (coerced under barmode:group)
    // - Once `stackgroup` gets implemented (see https://github.com/plotly/plotly.js/issues/3614),
    //   traces within the same stackgroup will also "have to match"
    for(i = 0; i < histTraces.length; i++) {
        traceOut = histTraces[i];
        groupName = '';

        if(!traceIs(traceOut, '2dMap')) {
            binDir = orientation2binDir(traceOut);

            if(fullLayout.barmode === 'group' && traceOut.alignmentgroup) {
                var pa = traceOut[binDir + 'axis'];
                var aGroupId = getAxisGroup(fullLayout, pa) + traceOut.orientation;
                if((alignmentOpts[aGroupId] || {})[traceOut.alignmentgroup]) {
                    groupName = aGroupId;
                }
            }

            if(!groupName && fullLayout.barmode !== 'overlay') {
                groupName = (
                    getAxisGroup(fullLayout, traceOut.xaxis) +
                    getAxisGroup(fullLayout, traceOut.yaxis) +
                    orientation2binDir(traceOut)
                );
            }
        }

        if(groupName) {
            if(!mustMatchTracesLookup[groupName]) {
                mustMatchTracesLookup[groupName] = [];
            }
            mustMatchTracesLookup[groupName].push(traceOut);
        } else {
            otherTracesList.push(traceOut);
        }
    }

    // Setup binOpts for traces that have to match,
    // if the traces have a valid bingroup, use that
    // if not use axis+binDir groupName
    for(groupName in mustMatchTracesLookup) {
        traces = mustMatchTracesLookup[groupName];

        // no need to 'force' anything when a single
        // trace is detected as "must match"
        if(traces.length === 1) {
            otherTracesList.push(traces[0]);
            continue;
        }

        var binGroupFound = false;
        for(i = 0; i < traces.length; i++) {
            traceOut = traces[i];
            binGroupFound = coerce('bingroup');
            break;
        }

        groupName = binGroupFound || groupName;

        for(i = 0; i < traces.length; i++) {
            traceOut = traces[i];
            var bingroupIn = traceOut._input.bingroup;
            if(bingroupIn && bingroupIn !== groupName) {
                Lib.warn([
                    'Trace', traceOut.index, 'must match',
                    'within bingroup', groupName + '.',
                    'Ignoring its bingroup:', bingroupIn, 'setting.'
                ].join(' '));
            }
            traceOut.bingroup = groupName;

            // N.B. no need to worry about 2dMap case
            // (where both bin direction are set in each trace)
            // as 2dMap trace never "have to match"
            fillBinOpts(traceOut, groupName, orientation2binDir(traceOut));
        }
    }

    // setup binOpts for traces that can but don't have to match,
    // notice that these traces can be matched with traces that have to match
    for(i = 0; i < otherTracesList.length; i++) {
        traceOut = otherTracesList[i];

        var binGroup = coerce('bingroup');

        if(traceIs(traceOut, '2dMap')) {
            for(k = 0; k < 2; k++) {
                binDir = BINDIRECTIONS[k];
                var binGroupInDir = coerce(binDir + 'bingroup',
                    binGroup ? binGroup + '__' + binDir : null
                );
                fillBinOpts(traceOut, binGroupInDir, binDir);
            }
        } else {
            fillBinOpts(traceOut, binGroup, orientation2binDir(traceOut));
        }
    }

    // coerce bin attrs!
    for(groupName in allBinOpts) {
        var binOpts = allBinOpts[groupName];
        traces = binOpts.traces;

        for(j = 0; j < BINATTRS.length; j++) {
            var attrSpec = BINATTRS[j];
            var attr = attrSpec.name;
            var aStr;
            var autoVals;

            // nbins(x|y) is moot if we have a size. This depends on
            // nbins coming after size in binAttrs.
            if(attr === 'nbins' && binOpts.sizeFound) continue;

            for(i = 0; i < traces.length; i++) {
                traceOut = traces[i];
                binDir = binOpts.dirs[i];
                aStr = attrSpec.aStr[binDir];

                if(nestedProperty(traceOut._input, aStr).get() !== undefined) {
                    binOpts[attr] = coerce(aStr);
                    binOpts[attr + 'Found'] = true;
                    break;
                }

                autoVals = (traceOut._autoBin || {})[binDir] || {};
                if(autoVals[attr]) {
                    // if this is the *first* autoval
                    nestedProperty(traceOut, aStr).set(autoVals[attr]);
                }
            }

            // start and end we need to coerce anyway, after having collected the
            // first of each into binOpts, in case a trace wants to restrict its
            // data to a certain range
            if(attr === 'start' || attr === 'end') {
                for(; i < traces.length; i++) {
                    traceOut = traces[i];
                    if(traceOut['_' + binDir + 'bingroup']) {
                        autoVals = (traceOut._autoBin || {})[binDir] || {};
                        coerce(aStr, autoVals[attr]);
                    }
                }
            }

            if(attr === 'nbins' && !binOpts.sizeFound && !binOpts.nbinsFound) {
                traceOut = traces[0];
                binOpts[attr] = coerce(aStr);
            }
        }
    }
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hpc3RvZ3JhbS9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtL2Jpbl9hdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy90cmFjZXMvaGlzdG9ncmFtL2NvbnN0YW50cy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hpc3RvZ3JhbS9jcm9zc190cmFjZV9kZWZhdWx0cy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsZ0ZBQW1CO0FBQzFDLHlCQUF5QiwwSUFBNkQ7QUFDdEYsbUJBQW1CLG1CQUFPLENBQUMseUZBQWtCO0FBQzdDLGdCQUFnQixtQkFBTyxDQUFDLCtFQUFhO0FBQ3JDLGlCQUFpQixvR0FBc0M7O0FBRXZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCw0QkFBNEI7QUFDNUI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLHdDQUF3QztBQUN4QztBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNqT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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QUFDeEM7QUFDQTtBQUNBLDJEQUEyRDtBQUMzRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJjaGFydDNiNWJkNmZkYjBiOTRjMTRhZjJlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgYmFyQXR0cnMgPSByZXF1aXJlKCcuLi9iYXIvYXR0cmlidXRlcycpO1xudmFyIGhvdmVydGVtcGxhdGVBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL3RlbXBsYXRlX2F0dHJpYnV0ZXMnKS5ob3ZlcnRlbXBsYXRlQXR0cnM7XG52YXIgbWFrZUJpbkF0dHJzID0gcmVxdWlyZSgnLi9iaW5fYXR0cmlidXRlcycpO1xudmFyIGNvbnN0YW50cyA9IHJlcXVpcmUoJy4vY29uc3RhbnRzJyk7XG52YXIgZXh0ZW5kRmxhdCA9IHJlcXVpcmUoJy4uLy4uL2xpYi9leHRlbmQnKS5leHRlbmRGbGF0O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICB4OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBzYW1wbGUgZGF0YSB0byBiZSBiaW5uZWQgb24gdGhlIHggYXhpcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2NsZWFyQXhpc1R5cGVzJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBzYW1wbGUgZGF0YSB0byBiZSBiaW5uZWQgb24gdGhlIHkgYXhpcy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIHRleHQ6IGV4dGVuZEZsYXQoe30sIGJhckF0dHJzLnRleHQsIHtcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIGhvdmVyIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggYmFyLicsXG4gICAgICAgICAgICAnSWYgYSBzaW5nbGUgc3RyaW5nLCB0aGUgc2FtZSBzdHJpbmcgYXBwZWFycyBvdmVyIGFsbCBiYXJzLicsXG4gICAgICAgICAgICAnSWYgYW4gYXJyYXkgb2Ygc3RyaW5nLCB0aGUgaXRlbXMgYXJlIG1hcHBlZCBpbiBvcmRlciB0byB0aGUnLFxuICAgICAgICAgICAgJ3RoaXMgdHJhY2VcXCdzIGNvb3JkaW5hdGVzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9KSxcbiAgICBob3ZlcnRleHQ6IGV4dGVuZEZsYXQoe30sIGJhckF0dHJzLmhvdmVydGV4dCwge1xuICAgICAgICBkZXNjcmlwdGlvbjogJ1NhbWUgYXMgYHRleHRgLidcbiAgICB9KSxcbiAgICBvcmllbnRhdGlvbjogYmFyQXR0cnMub3JpZW50YXRpb24sXG5cbiAgICBoaXN0ZnVuYzoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydjb3VudCcsICdzdW0nLCAnYXZnJywgJ21pbicsICdtYXgnXSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZGZsdDogJ2NvdW50JyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTcGVjaWZpZXMgdGhlIGJpbm5pbmcgZnVuY3Rpb24gdXNlZCBmb3IgdGhpcyBoaXN0b2dyYW0gdHJhY2UuJyxcblxuICAgICAgICAgICAgJ0lmICpjb3VudCosIHRoZSBoaXN0b2dyYW0gdmFsdWVzIGFyZSBjb21wdXRlZCBieSBjb3VudGluZyB0aGUnLFxuICAgICAgICAgICAgJ251bWJlciBvZiB2YWx1ZXMgbHlpbmcgaW5zaWRlIGVhY2ggYmluLicsXG5cbiAgICAgICAgICAgICdJZiAqc3VtKiwgKmF2ZyosICptaW4qLCAqbWF4KiwnLFxuICAgICAgICAgICAgJ3RoZSBoaXN0b2dyYW0gdmFsdWVzIGFyZSBjb21wdXRlZCB1c2luZycsXG4gICAgICAgICAgICAndGhlIHN1bSwgdGhlIGF2ZXJhZ2UsIHRoZSBtaW5pbXVtIG9yIHRoZSBtYXhpbXVtJyxcbiAgICAgICAgICAgICdvZiB0aGUgdmFsdWVzIGx5aW5nIGluc2lkZSBlYWNoIGJpbiByZXNwZWN0aXZlbHkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgaGlzdG5vcm06IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnJywgJ3BlcmNlbnQnLCAncHJvYmFiaWxpdHknLCAnZGVuc2l0eScsICdwcm9iYWJpbGl0eSBkZW5zaXR5J10sXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NwZWNpZmllcyB0aGUgdHlwZSBvZiBub3JtYWxpemF0aW9uIHVzZWQgZm9yIHRoaXMgaGlzdG9ncmFtIHRyYWNlLicsXG5cbiAgICAgICAgICAgICdJZiAqKiwgdGhlIHNwYW4gb2YgZWFjaCBiYXIgY29ycmVzcG9uZHMgdG8gdGhlIG51bWJlciBvZicsXG4gICAgICAgICAgICAnb2NjdXJyZW5jZXMgKGkuZS4gdGhlIG51bWJlciBvZiBkYXRhIHBvaW50cyBseWluZyBpbnNpZGUgdGhlIGJpbnMpLicsXG5cbiAgICAgICAgICAgICdJZiAqcGVyY2VudCogLyAqcHJvYmFiaWxpdHkqLCB0aGUgc3BhbiBvZiBlYWNoIGJhciBjb3JyZXNwb25kcyB0bycsXG4gICAgICAgICAgICAndGhlIHBlcmNlbnRhZ2UgLyBmcmFjdGlvbiBvZiBvY2N1cnJlbmNlcyB3aXRoIHJlc3BlY3QgdG8gdGhlIHRvdGFsJyxcbiAgICAgICAgICAgICdudW1iZXIgb2Ygc2FtcGxlIHBvaW50cycsXG4gICAgICAgICAgICAnKGhlcmUsIHRoZSBzdW0gb2YgYWxsIGJpbiBIRUlHSFRTIGVxdWFscyAxMDAlIC8gMSkuJyxcblxuICAgICAgICAgICAgJ0lmICpkZW5zaXR5KiwgdGhlIHNwYW4gb2YgZWFjaCBiYXIgY29ycmVzcG9uZHMgdG8gdGhlIG51bWJlciBvZicsXG4gICAgICAgICAgICAnb2NjdXJyZW5jZXMgaW4gYSBiaW4gZGl2aWRlZCBieSB0aGUgc2l6ZSBvZiB0aGUgYmluIGludGVydmFsJyxcbiAgICAgICAgICAgICcoaGVyZSwgdGhlIHN1bSBvZiBhbGwgYmluIEFSRUFTIGVxdWFscyB0aGUnLFxuICAgICAgICAgICAgJ3RvdGFsIG51bWJlciBvZiBzYW1wbGUgcG9pbnRzKS4nLFxuXG4gICAgICAgICAgICAnSWYgKnByb2JhYmlsaXR5IGRlbnNpdHkqLCB0aGUgYXJlYSBvZiBlYWNoIGJhciBjb3JyZXNwb25kcyB0byB0aGUnLFxuICAgICAgICAgICAgJ3Byb2JhYmlsaXR5IHRoYXQgYW4gZXZlbnQgd2lsbCBmYWxsIGludG8gdGhlIGNvcnJlc3BvbmRpbmcgYmluJyxcbiAgICAgICAgICAgICcoaGVyZSwgdGhlIHN1bSBvZiBhbGwgYmluIEFSRUFTIGVxdWFscyAxKS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIGN1bXVsYXRpdmU6IHtcbiAgICAgICAgZW5hYmxlZDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgZGZsdDogZmFsc2UsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnSWYgdHJ1ZSwgZGlzcGxheSB0aGUgY3VtdWxhdGl2ZSBkaXN0cmlidXRpb24gYnkgc3VtbWluZyB0aGUnLFxuICAgICAgICAgICAgICAgICdiaW5uZWQgdmFsdWVzLiBVc2UgdGhlIGBkaXJlY3Rpb25gIGFuZCBgY2VudHJhbGJpbmAgYXR0cmlidXRlcycsXG4gICAgICAgICAgICAgICAgJ3RvIHR1bmUgdGhlIGFjY3VtdWxhdGlvbiBtZXRob2QuJyxcbiAgICAgICAgICAgICAgICAnTm90ZTogaW4gdGhpcyBtb2RlLCB0aGUgKmRlbnNpdHkqIGBoaXN0bm9ybWAgc2V0dGluZ3MgYmVoYXZlJyxcbiAgICAgICAgICAgICAgICAndGhlIHNhbWUgYXMgdGhlaXIgZXF1aXZhbGVudHMgd2l0aG91dCAqZGVuc2l0eSo6JyxcbiAgICAgICAgICAgICAgICAnKiogYW5kICpkZW5zaXR5KiBib3RoIHJpc2UgdG8gdGhlIG51bWJlciBvZiBkYXRhIHBvaW50cywgYW5kJyxcbiAgICAgICAgICAgICAgICAnKnByb2JhYmlsaXR5KiBhbmQgKnByb2JhYmlsaXR5IGRlbnNpdHkqIGJvdGggcmlzZSB0byB0aGUnLFxuICAgICAgICAgICAgICAgICdudW1iZXIgb2Ygc2FtcGxlIHBvaW50cy4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuXG4gICAgICAgIGRpcmVjdGlvbjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICAgICAgdmFsdWVzOiBbJ2luY3JlYXNpbmcnLCAnZGVjcmVhc2luZyddLFxuICAgICAgICAgICAgZGZsdDogJ2luY3JlYXNpbmcnLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ09ubHkgYXBwbGllcyBpZiBjdW11bGF0aXZlIGlzIGVuYWJsZWQuJyxcbiAgICAgICAgICAgICAgICAnSWYgKmluY3JlYXNpbmcqIChkZWZhdWx0KSB3ZSBzdW0gYWxsIHByaW9yIGJpbnMsIHNvIHRoZSByZXN1bHQnLFxuICAgICAgICAgICAgICAgICdpbmNyZWFzZXMgZnJvbSBsZWZ0IHRvIHJpZ2h0LiBJZiAqZGVjcmVhc2luZyogd2Ugc3VtIGxhdGVyIGJpbnMnLFxuICAgICAgICAgICAgICAgICdzbyB0aGUgcmVzdWx0IGRlY3JlYXNlcyBmcm9tIGxlZnQgdG8gcmlnaHQuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcblxuICAgICAgICBjdXJyZW50YmluOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgICAgICB2YWx1ZXM6IFsnaW5jbHVkZScsICdleGNsdWRlJywgJ2hhbGYnXSxcbiAgICAgICAgICAgIGRmbHQ6ICdpbmNsdWRlJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdPbmx5IGFwcGxpZXMgaWYgY3VtdWxhdGl2ZSBpcyBlbmFibGVkLicsXG4gICAgICAgICAgICAgICAgJ1NldHMgd2hldGhlciB0aGUgY3VycmVudCBiaW4gaXMgaW5jbHVkZWQsIGV4Y2x1ZGVkLCBvciBoYXMgaGFsZicsXG4gICAgICAgICAgICAgICAgJ29mIGl0cyB2YWx1ZSBpbmNsdWRlZCBpbiB0aGUgY3VycmVudCBjdW11bGF0aXZlIHZhbHVlLicsXG4gICAgICAgICAgICAgICAgJyppbmNsdWRlKiBpcyB0aGUgZGVmYXVsdCBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIHZhcmlvdXMgb3RoZXInLFxuICAgICAgICAgICAgICAgICd0b29scywgaG93ZXZlciBpdCBpbnRyb2R1Y2VzIGEgaGFsZi1iaW4gYmlhcyB0byB0aGUgcmVzdWx0cy4nLFxuICAgICAgICAgICAgICAgICcqZXhjbHVkZSogbWFrZXMgdGhlIG9wcG9zaXRlIGhhbGYtYmluIGJpYXMsIGFuZCAqaGFsZiogcmVtb3ZlcycsXG4gICAgICAgICAgICAgICAgJ2l0LidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYydcbiAgICB9LFxuICAgIG5iaW5zeDoge1xuICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTcGVjaWZpZXMgdGhlIG1heGltdW0gbnVtYmVyIG9mIGRlc2lyZWQgYmlucy4gVGhpcyB2YWx1ZSB3aWxsIGJlIHVzZWQnLFxuICAgICAgICAgICAgJ2luIGFuIGFsZ29yaXRobSB0aGF0IHdpbGwgZGVjaWRlIHRoZSBvcHRpbWFsIGJpbiBzaXplIHN1Y2ggdGhhdCB0aGUnLFxuICAgICAgICAgICAgJ2hpc3RvZ3JhbSBiZXN0IHZpc3VhbGl6ZXMgdGhlIGRpc3RyaWJ1dGlvbiBvZiB0aGUgZGF0YS4nLFxuICAgICAgICAgICAgJ0lnbm9yZWQgaWYgYHhiaW5zLnNpemVgIGlzIHByb3ZpZGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHhiaW5zOiBtYWtlQmluQXR0cnMoJ3gnLCB0cnVlKSxcblxuICAgIG5iaW5zeToge1xuICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTcGVjaWZpZXMgdGhlIG1heGltdW0gbnVtYmVyIG9mIGRlc2lyZWQgYmlucy4gVGhpcyB2YWx1ZSB3aWxsIGJlIHVzZWQnLFxuICAgICAgICAgICAgJ2luIGFuIGFsZ29yaXRobSB0aGF0IHdpbGwgZGVjaWRlIHRoZSBvcHRpbWFsIGJpbiBzaXplIHN1Y2ggdGhhdCB0aGUnLFxuICAgICAgICAgICAgJ2hpc3RvZ3JhbSBiZXN0IHZpc3VhbGl6ZXMgdGhlIGRpc3RyaWJ1dGlvbiBvZiB0aGUgZGF0YS4nLFxuICAgICAgICAgICAgJ0lnbm9yZWQgaWYgYHliaW5zLnNpemVgIGlzIHByb3ZpZGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHliaW5zOiBtYWtlQmluQXR0cnMoJ3knLCB0cnVlKSxcbiAgICBhdXRvYmlueDoge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnT2Jzb2xldGU6IHNpbmNlIHYxLjQyIGVhY2ggYmluIGF0dHJpYnV0ZSBpcyBhdXRvLWRldGVybWluZWQnLFxuICAgICAgICAgICAgJ3NlcGFyYXRlbHkgYW5kIGBhdXRvYmlueGAgaXMgbm90IG5lZWRlZC4gSG93ZXZlciwgd2UgYWNjZXB0JyxcbiAgICAgICAgICAgICdgYXV0b2Jpbng6IHRydWVgIG9yIGBmYWxzZWAgYW5kIHdpbGwgdXBkYXRlIGB4Ymluc2AgYWNjb3JkaW5nbHknLFxuICAgICAgICAgICAgJ2JlZm9yZSBkZWxldGluZyBgYXV0b2JpbnhgIGZyb20gdGhlIHRyYWNlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGF1dG9iaW55OiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdPYnNvbGV0ZTogc2luY2UgdjEuNDIgZWFjaCBiaW4gYXR0cmlidXRlIGlzIGF1dG8tZGV0ZXJtaW5lZCcsXG4gICAgICAgICAgICAnc2VwYXJhdGVseSBhbmQgYGF1dG9iaW55YCBpcyBub3QgbmVlZGVkLiBIb3dldmVyLCB3ZSBhY2NlcHQnLFxuICAgICAgICAgICAgJ2BhdXRvYmlueTogdHJ1ZWAgb3IgYGZhbHNlYCBhbmQgd2lsbCB1cGRhdGUgYHliaW5zYCBhY2NvcmRpbmdseScsXG4gICAgICAgICAgICAnYmVmb3JlIGRlbGV0aW5nIGBhdXRvYmlueWAgZnJvbSB0aGUgdHJhY2UuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBiaW5ncm91cDoge1xuICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiAnJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXQgYSBncm91cCBvZiBoaXN0b2dyYW0gdHJhY2VzIHdoaWNoIHdpbGwgaGF2ZSBjb21wYXRpYmxlIGJpbiBzZXR0aW5ncy4nLFxuICAgICAgICAgICAgJ05vdGUgdGhhdCB0cmFjZXMgb24gdGhlIHNhbWUgc3VicGxvdCBhbmQgd2l0aCB0aGUgc2FtZSAqb3JpZW50YXRpb24qJyxcbiAgICAgICAgICAgICd1bmRlciBgYmFybW9kZWAgKnN0YWNrKiwgKnJlbGF0aXZlKiBhbmQgKmdyb3VwKiBhcmUgZm9yY2VkIGludG8gdGhlIHNhbWUgYmluZ3JvdXAsJyxcbiAgICAgICAgICAgICdVc2luZyBgYmluZ3JvdXBgLCB0cmFjZXMgdW5kZXIgYGJhcm1vZGVgICpvdmVybGF5KiBhbmQgb24gZGlmZmVyZW50IGF4ZXMnLFxuICAgICAgICAgICAgJyhvZiB0aGUgc2FtZSBheGlzIHR5cGUpIGNhbiBoYXZlIGNvbXBhdGlibGUgYmluIHNldHRpbmdzLicsXG4gICAgICAgICAgICAnTm90ZSB0aGF0IGhpc3RvZ3JhbSBhbmQgaGlzdG9ncmFtMmQqIHRyYWNlIGNhbiBzaGFyZSB0aGUgc2FtZSBgYmluZ3JvdXBgJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICBob3ZlcnRlbXBsYXRlOiBob3ZlcnRlbXBsYXRlQXR0cnMoe30sIHtcbiAgICAgICAga2V5czogY29uc3RhbnRzLmV2ZW50RGF0YUtleXNcbiAgICB9KSxcblxuICAgIG1hcmtlcjogYmFyQXR0cnMubWFya2VyLFxuXG4gICAgb2Zmc2V0Z3JvdXA6IGJhckF0dHJzLm9mZnNldGdyb3VwLFxuICAgIGFsaWdubWVudGdyb3VwOiBiYXJBdHRycy5hbGlnbm1lbnRncm91cCxcblxuICAgIHNlbGVjdGVkOiBiYXJBdHRycy5zZWxlY3RlZCxcbiAgICB1bnNlbGVjdGVkOiBiYXJBdHRycy51bnNlbGVjdGVkLFxuXG4gICAgX2RlcHJlY2F0ZWQ6IHtcbiAgICAgICAgYmFyZGlyOiBiYXJBdHRycy5fZGVwcmVjYXRlZC5iYXJkaXJcbiAgICB9XG59O1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1ha2VCaW5BdHRycyhheExldHRlciwgbWF0Y2gpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2FueScsIC8vIGZvciBkYXRlIGF4ZXNcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgc3RhcnRpbmcgdmFsdWUgZm9yIHRoZScsIGF4TGV0dGVyLFxuICAgICAgICAgICAgICAgICdheGlzIGJpbnMuIERlZmF1bHRzIHRvIHRoZSBtaW5pbXVtIGRhdGEgdmFsdWUsJyxcbiAgICAgICAgICAgICAgICAnc2hpZnRlZCBkb3duIGlmIG5lY2Vzc2FyeSB0byBtYWtlIG5pY2Ugcm91bmQgdmFsdWVzJyxcbiAgICAgICAgICAgICAgICAnYW5kIHRvIHJlbW92ZSBhbWJpZ3VvdXMgYmluIGVkZ2VzLiBGb3IgZXhhbXBsZSwgaWYgbW9zdCBvZiB0aGUnLFxuICAgICAgICAgICAgICAgICdkYXRhIGlzIGludGVnZXJzIHdlIHNoaWZ0IHRoZSBiaW4gZWRnZXMgMC41IGRvd24sIHNvIGEgYHNpemVgJyxcbiAgICAgICAgICAgICAgICAnb2YgNSB3b3VsZCBoYXZlIGEgZGVmYXVsdCBgc3RhcnRgIG9mIC0wLjUsIHNvIGl0IGlzIGNsZWFyJyxcbiAgICAgICAgICAgICAgICAndGhhdCAwLTQgYXJlIGluIHRoZSBmaXJzdCBiaW4sIDUtOSBpbiB0aGUgc2Vjb25kLCBidXQnLFxuICAgICAgICAgICAgICAgICdjb250aW51b3VzIGRhdGEgZ2V0cyBhIHN0YXJ0IG9mIDAgYW5kIGJpbnMgWzAsNSksIFs1LDEwKSBldGMuJyxcbiAgICAgICAgICAgICAgICAnRGF0ZXMgYmVoYXZlIHNpbWlsYXJseSwgYW5kIGBzdGFydGAgc2hvdWxkIGJlIGEgZGF0ZSBzdHJpbmcuJyxcbiAgICAgICAgICAgICAgICAnRm9yIGNhdGVnb3J5IGRhdGEsIGBzdGFydGAgaXMgYmFzZWQgb24gdGhlIGNhdGVnb3J5IHNlcmlhbCcsXG4gICAgICAgICAgICAgICAgJ251bWJlcnMsIGFuZCBkZWZhdWx0cyB0byAtMC41LicsXG4gICAgICAgICAgICAgICAgKG1hdGNoID8gKFxuICAgICAgICAgICAgICAgICAgICAnSWYgbXVsdGlwbGUgbm9uLW92ZXJsYXlpbmcgaGlzdG9ncmFtcyBzaGFyZSBhIHN1YnBsb3QsICcgK1xuICAgICAgICAgICAgICAgICAgICAndGhlIGZpcnN0IGV4cGxpY2l0IGBzdGFydGAgaXMgdXNlZCBleGFjdGx5IGFuZCBhbGwgb3RoZXJzICcgK1xuICAgICAgICAgICAgICAgICAgICAnYXJlIHNoaWZ0ZWQgZG93biAoaWYgbmVjZXNzYXJ5KSB0byBkaWZmZXIgZnJvbSB0aGF0IG9uZSAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2J5IGFuIGludGVnZXIgbnVtYmVyIG9mIGJpbnMuJ1xuICAgICAgICAgICAgICAgICkgOiAnJylcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGVuZDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2FueScsIC8vIGZvciBkYXRlIGF4ZXNcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgZW5kIHZhbHVlIGZvciB0aGUnLCBheExldHRlcixcbiAgICAgICAgICAgICAgICAnYXhpcyBiaW5zLiBUaGUgbGFzdCBiaW4gbWF5IG5vdCBlbmQgZXhhY3RseSBhdCB0aGlzIHZhbHVlLCcsXG4gICAgICAgICAgICAgICAgJ3dlIGluY3JlbWVudCB0aGUgYmluIGVkZ2UgYnkgYHNpemVgIGZyb20gYHN0YXJ0YCB1bnRpbCB3ZScsXG4gICAgICAgICAgICAgICAgJ3JlYWNoIG9yIGV4Y2VlZCBgZW5kYC4gRGVmYXVsdHMgdG8gdGhlIG1heGltdW0gZGF0YSB2YWx1ZS4nLFxuICAgICAgICAgICAgICAgICdMaWtlIGBzdGFydGAsIGZvciBkYXRlcyB1c2UgYSBkYXRlIHN0cmluZywgYW5kIGZvciBjYXRlZ29yeScsXG4gICAgICAgICAgICAgICAgJ2RhdGEgYGVuZGAgaXMgYmFzZWQgb24gdGhlIGNhdGVnb3J5IHNlcmlhbCBudW1iZXJzLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdhbnknLCAvLyBmb3IgZGF0ZSBheGVzXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHNpemUgb2YgZWFjaCcsIGF4TGV0dGVyLCAnYXhpcyBiaW4uJyxcbiAgICAgICAgICAgICAgICAnRGVmYXVsdCBiZWhhdmlvcjogSWYgYG5iaW5zJyArIGF4TGV0dGVyICsgJ2AgaXMgMCBvciBvbWl0dGVkLCcsXG4gICAgICAgICAgICAgICAgJ3dlIGNob29zZSBhIG5pY2Ugcm91bmQgYmluIHNpemUgc3VjaCB0aGF0IHRoZSBudW1iZXIgb2YgYmlucycsXG4gICAgICAgICAgICAgICAgJ2lzIGFib3V0IHRoZSBzYW1lIGFzIHRoZSB0eXBpY2FsIG51bWJlciBvZiBzYW1wbGVzIGluIGVhY2ggYmluLicsXG4gICAgICAgICAgICAgICAgJ0lmIGBuYmlucycgKyBheExldHRlciArICdgIGlzIHByb3ZpZGVkLCB3ZSBjaG9vc2UgYSBuaWNlIHJvdW5kJyxcbiAgICAgICAgICAgICAgICAnYmluIHNpemUgZ2l2aW5nIG5vIG1vcmUgdGhhbiB0aGF0IG1hbnkgYmlucy4nLFxuICAgICAgICAgICAgICAgICdGb3IgZGF0ZSBkYXRhLCB1c2UgbWlsbGlzZWNvbmRzIG9yICpNPG4+KiBmb3IgbW9udGhzLCBhcyBpbicsXG4gICAgICAgICAgICAgICAgJ2BheGlzLmR0aWNrYC4gRm9yIGNhdGVnb3J5IGRhdGEsIHRoZSBudW1iZXIgb2YgY2F0ZWdvcmllcyB0bycsXG4gICAgICAgICAgICAgICAgJ2JpbiB0b2dldGhlciAoYWx3YXlzIGRlZmF1bHRzIHRvIDEpLicsXG4gICAgICAgICAgICAgICAgKG1hdGNoID8gKFxuICAgICAgICAgICAgICAgICAgICAnSWYgbXVsdGlwbGUgbm9uLW92ZXJsYXlpbmcgaGlzdG9ncmFtcyBzaGFyZSBhIHN1YnBsb3QsICcgK1xuICAgICAgICAgICAgICAgICAgICAndGhlIGZpcnN0IGV4cGxpY2l0IGBzaXplYCBpcyB1c2VkIGFuZCBhbGwgb3RoZXJzIGRpc2NhcmRlZC4gJyArXG4gICAgICAgICAgICAgICAgICAgICdJZiBubyBgc2l6ZWAgaXMgcHJvdmlkZWQsdGhlIHNhbXBsZSBkYXRhIGZyb20gYWxsIHRyYWNlcyAnICtcbiAgICAgICAgICAgICAgICAgICAgJ2lzIGNvbWJpbmVkIHRvIGRldGVybWluZSBgc2l6ZWAgYXMgZGVzY3JpYmVkIGFib3ZlLidcbiAgICAgICAgICAgICAgICApIDogJycpXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnXG4gICAgfTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZXZlbnREYXRhS2V5czogWydiaW5OdW1iZXInXVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uL2xpYicpO1xudmFyIGF4aXNJZHMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy9jYXJ0ZXNpYW4vYXhpc19pZHMnKTtcblxudmFyIHRyYWNlSXMgPSByZXF1aXJlKCcuLi8uLi9yZWdpc3RyeScpLnRyYWNlSXM7XG52YXIgaGFuZGxlR3JvdXBpbmdEZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2Jhci9kZWZhdWx0cycpLmhhbmRsZUdyb3VwaW5nRGVmYXVsdHM7XG5cbnZhciBuZXN0ZWRQcm9wZXJ0eSA9IExpYi5uZXN0ZWRQcm9wZXJ0eTtcbnZhciBnZXRBeGlzR3JvdXAgPSBheGlzSWRzLmdldEF4aXNHcm91cDtcblxudmFyIEJJTkFUVFJTID0gW1xuICAgIHthU3RyOiB7eDogJ3hiaW5zLnN0YXJ0JywgeTogJ3liaW5zLnN0YXJ0J30sIG5hbWU6ICdzdGFydCd9LFxuICAgIHthU3RyOiB7eDogJ3hiaW5zLmVuZCcsIHk6ICd5Ymlucy5lbmQnfSwgbmFtZTogJ2VuZCd9LFxuICAgIHthU3RyOiB7eDogJ3hiaW5zLnNpemUnLCB5OiAneWJpbnMuc2l6ZSd9LCBuYW1lOiAnc2l6ZSd9LFxuICAgIHthU3RyOiB7eDogJ25iaW5zeCcsIHk6ICduYmluc3knfSwgbmFtZTogJ25iaW5zJ31cbl07XG5cbnZhciBCSU5ESVJFQ1RJT05TID0gWyd4JywgJ3knXTtcblxuLy8gaGFuZGxlIGJpbiBhdHRycyBhbmQgcmVsaW5rIGF1dG8tZGV0ZXJtaW5lZCB2YWx1ZXMgc28gZnVsbERhdGEgaXMgY29tcGxldGVcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY3Jvc3NUcmFjZURlZmF1bHRzKGZ1bGxEYXRhLCBmdWxsTGF5b3V0KSB7XG4gICAgdmFyIGFsbEJpbk9wdHMgPSBmdWxsTGF5b3V0Ll9oaXN0b2dyYW1CaW5PcHRzID0ge307XG4gICAgdmFyIGhpc3RUcmFjZXMgPSBbXTtcbiAgICB2YXIgbXVzdE1hdGNoVHJhY2VzTG9va3VwID0ge307XG4gICAgdmFyIG90aGVyVHJhY2VzTGlzdCA9IFtdO1xuXG4gICAgdmFyIHRyYWNlT3V0LCB0cmFjZXMsIGdyb3VwTmFtZSwgYmluRGlyO1xuICAgIHZhciBpLCBqLCBrO1xuXG4gICAgZnVuY3Rpb24gY29lcmNlKGF0dHIsIGRmbHQpIHtcbiAgICAgICAgcmV0dXJuIExpYi5jb2VyY2UodHJhY2VPdXQuX2lucHV0LCB0cmFjZU91dCwgdHJhY2VPdXQuX21vZHVsZS5hdHRyaWJ1dGVzLCBhdHRyLCBkZmx0KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBvcmllbnRhdGlvbjJiaW5EaXIodHJhY2VPdXQpIHtcbiAgICAgICAgcmV0dXJuIHRyYWNlT3V0Lm9yaWVudGF0aW9uID09PSAndicgPyAneCcgOiAneSc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QXhpc1R5cGUodHJhY2VPdXQsIGJpbkRpcikge1xuICAgICAgICB2YXIgYXggPSBheGlzSWRzLmdldEZyb21UcmFjZSh7X2Z1bGxMYXlvdXQ6IGZ1bGxMYXlvdXR9LCB0cmFjZU91dCwgYmluRGlyKTtcbiAgICAgICAgcmV0dXJuIGF4LnR5cGU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmlsbEJpbk9wdHModHJhY2VPdXQsIGdyb3VwTmFtZSwgYmluRGlyKSB7XG4gICAgICAgIC8vIE4uQi4gZ3JvdXAgdHJhY2VzIHRoYXQgZG9uJ3QgaGF2ZSBhIGJpbmdyb3VwIHdpdGggdGhlbXNlbHZlc1xuICAgICAgICB2YXIgZmFsbGJhY2tHcm91cE5hbWUgPSB0cmFjZU91dC51aWQgKyAnX18nICsgYmluRGlyO1xuICAgICAgICBpZighZ3JvdXBOYW1lKSBncm91cE5hbWUgPSBmYWxsYmFja0dyb3VwTmFtZTtcblxuICAgICAgICB2YXIgYXhUeXBlID0gZ2V0QXhpc1R5cGUodHJhY2VPdXQsIGJpbkRpcik7XG4gICAgICAgIHZhciBjYWxlbmRhciA9IHRyYWNlT3V0W2JpbkRpciArICdjYWxlbmRhciddIHx8ICcnO1xuICAgICAgICB2YXIgYmluT3B0cyA9IGFsbEJpbk9wdHNbZ3JvdXBOYW1lXTtcbiAgICAgICAgdmFyIG5lZWRzTmV3SXRlbSA9IHRydWU7XG5cbiAgICAgICAgaWYoYmluT3B0cykge1xuICAgICAgICAgICAgaWYoYXhUeXBlID09PSBiaW5PcHRzLmF4VHlwZSAmJiBjYWxlbmRhciA9PT0gYmluT3B0cy5jYWxlbmRhcikge1xuICAgICAgICAgICAgICAgIG5lZWRzTmV3SXRlbSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJpbk9wdHMudHJhY2VzLnB1c2godHJhY2VPdXQpO1xuICAgICAgICAgICAgICAgIGJpbk9wdHMuZGlycy5wdXNoKGJpbkRpcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGdyb3VwTmFtZSA9IGZhbGxiYWNrR3JvdXBOYW1lO1xuXG4gICAgICAgICAgICAgICAgaWYoYXhUeXBlICE9PSBiaW5PcHRzLmF4VHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBMaWIud2FybihbXG4gICAgICAgICAgICAgICAgICAgICAgICAnQXR0ZW1wdGVkIHRvIGdyb3VwIHRoZSBiaW5zIG9mIHRyYWNlJywgdHJhY2VPdXQuaW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAnc2V0IG9uIGEnLCAndHlwZTonICsgYXhUeXBlLCAnYXhpcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAnd2l0aCBiaW5zIG9uJywgJ3R5cGU6JyArIGJpbk9wdHMuYXhUeXBlLCAnYXhpcy4nXG4gICAgICAgICAgICAgICAgICAgIF0uam9pbignICcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYoY2FsZW5kYXIgIT09IGJpbk9wdHMuY2FsZW5kYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gcHJvaGliaXQgYmluZ3JvdXAgZm9yIHRyYWNlcyB1c2luZyBkaWZmZXJlbnQgY2FsZW5kYXIsXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZXJlJ3MgcHJvYmFibHkgYSB3YXkgdG8gbWFrZSB0aGlzIHdvcmssIGJ1dCBza2lwIGZvciBub3dcbiAgICAgICAgICAgICAgICAgICAgTGliLndhcm4oW1xuICAgICAgICAgICAgICAgICAgICAgICAgJ0F0dGVtcHRlZCB0byBncm91cCB0aGUgYmlucyBvZiB0cmFjZScsIHRyYWNlT3V0LmluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgJ3NldCB3aXRoIGEnLCBjYWxlbmRhciwgJ2NhbGVuZGFyJyxcbiAgICAgICAgICAgICAgICAgICAgICAgICd3aXRoIGJpbnMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgKGJpbk9wdHMuY2FsZW5kYXIgPyAnb24gYSAnICsgYmluT3B0cy5jYWxlbmRhciArICcgY2FsZW5kYXInIDogJ3cvbyBhIHNldCBjYWxlbmRhcicpXG4gICAgICAgICAgICAgICAgICAgIF0uam9pbignICcpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihuZWVkc05ld0l0ZW0pIHtcbiAgICAgICAgICAgIGFsbEJpbk9wdHNbZ3JvdXBOYW1lXSA9IHtcbiAgICAgICAgICAgICAgICB0cmFjZXM6IFt0cmFjZU91dF0sXG4gICAgICAgICAgICAgICAgZGlyczogW2JpbkRpcl0sXG4gICAgICAgICAgICAgICAgYXhUeXBlOiBheFR5cGUsXG4gICAgICAgICAgICAgICAgY2FsZW5kYXI6IHRyYWNlT3V0W2JpbkRpciArICdjYWxlbmRhciddIHx8ICcnXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICAgIHRyYWNlT3V0WydfJyArIGJpbkRpciArICdiaW5ncm91cCddID0gZ3JvdXBOYW1lO1xuICAgIH1cblxuICAgIGZvcihpID0gMDsgaSA8IGZ1bGxEYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyYWNlT3V0ID0gZnVsbERhdGFbaV07XG5cbiAgICAgICAgaWYodHJhY2VJcyh0cmFjZU91dCwgJ2hpc3RvZ3JhbScpKSB7XG4gICAgICAgICAgICBoaXN0VHJhY2VzLnB1c2godHJhY2VPdXQpO1xuXG4gICAgICAgICAgICAvLyBUT0RPOiB0aGlzIHNob3VsZG4ndCBiZSByZWxpbmtlZCBhcyBpdCdzIG9ubHkgdXNlZCB3aXRoaW4gY2FsY1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9wbG90bHkuanMvaXNzdWVzLzc0OVxuICAgICAgICAgICAgZGVsZXRlIHRyYWNlT3V0Ll94YXV0b0JpbkZpbmlzaGVkO1xuICAgICAgICAgICAgZGVsZXRlIHRyYWNlT3V0Ll95YXV0b0JpbkZpbmlzaGVkO1xuXG4gICAgICAgICAgICAvLyBOLkIuIG5lZWQgdG8gY29lcmNlICphbGlnbm1lbnRncm91cCogYmVmb3JlICpiaW5ncm91cCosIGFzIHRyYWNlc1xuICAgICAgICAgICAgLy8gaW4gc2FtZSBhbGlnbm1lbnRncm91cCBcImhhdmUgdG8gbWF0Y2hcIlxuICAgICAgICAgICAgaWYoIXRyYWNlSXModHJhY2VPdXQsICcyZE1hcCcpKSB7XG4gICAgICAgICAgICAgICAgaGFuZGxlR3JvdXBpbmdEZWZhdWx0cyh0cmFjZU91dC5faW5wdXQsIHRyYWNlT3V0LCBmdWxsTGF5b3V0LCBjb2VyY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFsaWdubWVudE9wdHMgPSBmdWxsTGF5b3V0Ll9hbGlnbm1lbnRPcHRzIHx8IHt9O1xuXG4gICAgLy8gTG9vayBmb3IgdHJhY2VzIHRoYXQgXCJoYXZlIHRvIG1hdGNoXCIsIHRoYXQgaXM6XG4gICAgLy8gLSAxZCBoaXN0b2dyYW0gdHJhY2VzIG9uIHRoZSBzYW1lIHN1YnBsb3Qgd2l0aCBzYW1lIG9yaWVudGF0aW9uIHVuZGVyIGJhcm1vZGU6c3RhY2ssXG4gICAgLy8gLSAxZCBoaXN0b2dyYW0gdHJhY2VzIG9uIHRoZSBzYW1lIHN1YnBsb3Qgd2l0aCBzYW1lIG9yaWVudGF0aW9uIHVuZGVyIGJhcm1vZGU6Z3JvdXBcbiAgICAvLyAtIDFkIGhpc3RvZ3JhbSB0cmFjZXMgb24gdGhlIHNhbWUgcG9zaXRpb24gYXhpcyB3aXRoIHRoZSBzYW1lIG9yaWVudGF0aW9uXG4gICAgLy8gICBhbmQgdGhlIHNhbWUgKmFsaWdubWVudGdyb3VwKiAoY29lcmNlZCB1bmRlciBiYXJtb2RlOmdyb3VwKVxuICAgIC8vIC0gT25jZSBgc3RhY2tncm91cGAgZ2V0cyBpbXBsZW1lbnRlZCAoc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9wbG90bHkvcGxvdGx5LmpzL2lzc3Vlcy8zNjE0KSxcbiAgICAvLyAgIHRyYWNlcyB3aXRoaW4gdGhlIHNhbWUgc3RhY2tncm91cCB3aWxsIGFsc28gXCJoYXZlIHRvIG1hdGNoXCJcbiAgICBmb3IoaSA9IDA7IGkgPCBoaXN0VHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRyYWNlT3V0ID0gaGlzdFRyYWNlc1tpXTtcbiAgICAgICAgZ3JvdXBOYW1lID0gJyc7XG5cbiAgICAgICAgaWYoIXRyYWNlSXModHJhY2VPdXQsICcyZE1hcCcpKSB7XG4gICAgICAgICAgICBiaW5EaXIgPSBvcmllbnRhdGlvbjJiaW5EaXIodHJhY2VPdXQpO1xuXG4gICAgICAgICAgICBpZihmdWxsTGF5b3V0LmJhcm1vZGUgPT09ICdncm91cCcgJiYgdHJhY2VPdXQuYWxpZ25tZW50Z3JvdXApIHtcbiAgICAgICAgICAgICAgICB2YXIgcGEgPSB0cmFjZU91dFtiaW5EaXIgKyAnYXhpcyddO1xuICAgICAgICAgICAgICAgIHZhciBhR3JvdXBJZCA9IGdldEF4aXNHcm91cChmdWxsTGF5b3V0LCBwYSkgKyB0cmFjZU91dC5vcmllbnRhdGlvbjtcbiAgICAgICAgICAgICAgICBpZigoYWxpZ25tZW50T3B0c1thR3JvdXBJZF0gfHwge30pW3RyYWNlT3V0LmFsaWdubWVudGdyb3VwXSkge1xuICAgICAgICAgICAgICAgICAgICBncm91cE5hbWUgPSBhR3JvdXBJZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKCFncm91cE5hbWUgJiYgZnVsbExheW91dC5iYXJtb2RlICE9PSAnb3ZlcmxheScpIHtcbiAgICAgICAgICAgICAgICBncm91cE5hbWUgPSAoXG4gICAgICAgICAgICAgICAgICAgIGdldEF4aXNHcm91cChmdWxsTGF5b3V0LCB0cmFjZU91dC54YXhpcykgK1xuICAgICAgICAgICAgICAgICAgICBnZXRBeGlzR3JvdXAoZnVsbExheW91dCwgdHJhY2VPdXQueWF4aXMpICtcbiAgICAgICAgICAgICAgICAgICAgb3JpZW50YXRpb24yYmluRGlyKHRyYWNlT3V0KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihncm91cE5hbWUpIHtcbiAgICAgICAgICAgIGlmKCFtdXN0TWF0Y2hUcmFjZXNMb29rdXBbZ3JvdXBOYW1lXSkge1xuICAgICAgICAgICAgICAgIG11c3RNYXRjaFRyYWNlc0xvb2t1cFtncm91cE5hbWVdID0gW107XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBtdXN0TWF0Y2hUcmFjZXNMb29rdXBbZ3JvdXBOYW1lXS5wdXNoKHRyYWNlT3V0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG90aGVyVHJhY2VzTGlzdC5wdXNoKHRyYWNlT3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNldHVwIGJpbk9wdHMgZm9yIHRyYWNlcyB0aGF0IGhhdmUgdG8gbWF0Y2gsXG4gICAgLy8gaWYgdGhlIHRyYWNlcyBoYXZlIGEgdmFsaWQgYmluZ3JvdXAsIHVzZSB0aGF0XG4gICAgLy8gaWYgbm90IHVzZSBheGlzK2JpbkRpciBncm91cE5hbWVcbiAgICBmb3IoZ3JvdXBOYW1lIGluIG11c3RNYXRjaFRyYWNlc0xvb2t1cCkge1xuICAgICAgICB0cmFjZXMgPSBtdXN0TWF0Y2hUcmFjZXNMb29rdXBbZ3JvdXBOYW1lXTtcblxuICAgICAgICAvLyBubyBuZWVkIHRvICdmb3JjZScgYW55dGhpbmcgd2hlbiBhIHNpbmdsZVxuICAgICAgICAvLyB0cmFjZSBpcyBkZXRlY3RlZCBhcyBcIm11c3QgbWF0Y2hcIlxuICAgICAgICBpZih0cmFjZXMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICBvdGhlclRyYWNlc0xpc3QucHVzaCh0cmFjZXNbMF0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgYmluR3JvdXBGb3VuZCA9IGZhbHNlO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCB0cmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHRyYWNlT3V0ID0gdHJhY2VzW2ldO1xuICAgICAgICAgICAgYmluR3JvdXBGb3VuZCA9IGNvZXJjZSgnYmluZ3JvdXAnKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG5cbiAgICAgICAgZ3JvdXBOYW1lID0gYmluR3JvdXBGb3VuZCB8fCBncm91cE5hbWU7XG5cbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgdHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cmFjZU91dCA9IHRyYWNlc1tpXTtcbiAgICAgICAgICAgIHZhciBiaW5ncm91cEluID0gdHJhY2VPdXQuX2lucHV0LmJpbmdyb3VwO1xuICAgICAgICAgICAgaWYoYmluZ3JvdXBJbiAmJiBiaW5ncm91cEluICE9PSBncm91cE5hbWUpIHtcbiAgICAgICAgICAgICAgICBMaWIud2FybihbXG4gICAgICAgICAgICAgICAgICAgICdUcmFjZScsIHRyYWNlT3V0LmluZGV4LCAnbXVzdCBtYXRjaCcsXG4gICAgICAgICAgICAgICAgICAgICd3aXRoaW4gYmluZ3JvdXAnLCBncm91cE5hbWUgKyAnLicsXG4gICAgICAgICAgICAgICAgICAgICdJZ25vcmluZyBpdHMgYmluZ3JvdXA6JywgYmluZ3JvdXBJbiwgJ3NldHRpbmcuJ1xuICAgICAgICAgICAgICAgIF0uam9pbignICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRyYWNlT3V0LmJpbmdyb3VwID0gZ3JvdXBOYW1lO1xuXG4gICAgICAgICAgICAvLyBOLkIuIG5vIG5lZWQgdG8gd29ycnkgYWJvdXQgMmRNYXAgY2FzZVxuICAgICAgICAgICAgLy8gKHdoZXJlIGJvdGggYmluIGRpcmVjdGlvbiBhcmUgc2V0IGluIGVhY2ggdHJhY2UpXG4gICAgICAgICAgICAvLyBhcyAyZE1hcCB0cmFjZSBuZXZlciBcImhhdmUgdG8gbWF0Y2hcIlxuICAgICAgICAgICAgZmlsbEJpbk9wdHModHJhY2VPdXQsIGdyb3VwTmFtZSwgb3JpZW50YXRpb24yYmluRGlyKHRyYWNlT3V0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBzZXR1cCBiaW5PcHRzIGZvciB0cmFjZXMgdGhhdCBjYW4gYnV0IGRvbid0IGhhdmUgdG8gbWF0Y2gsXG4gICAgLy8gbm90aWNlIHRoYXQgdGhlc2UgdHJhY2VzIGNhbiBiZSBtYXRjaGVkIHdpdGggdHJhY2VzIHRoYXQgaGF2ZSB0byBtYXRjaFxuICAgIGZvcihpID0gMDsgaSA8IG90aGVyVHJhY2VzTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0cmFjZU91dCA9IG90aGVyVHJhY2VzTGlzdFtpXTtcblxuICAgICAgICB2YXIgYmluR3JvdXAgPSBjb2VyY2UoJ2Jpbmdyb3VwJyk7XG5cbiAgICAgICAgaWYodHJhY2VJcyh0cmFjZU91dCwgJzJkTWFwJykpIHtcbiAgICAgICAgICAgIGZvcihrID0gMDsgayA8IDI7IGsrKykge1xuICAgICAgICAgICAgICAgIGJpbkRpciA9IEJJTkRJUkVDVElPTlNba107XG4gICAgICAgICAgICAgICAgdmFyIGJpbkdyb3VwSW5EaXIgPSBjb2VyY2UoYmluRGlyICsgJ2Jpbmdyb3VwJyxcbiAgICAgICAgICAgICAgICAgICAgYmluR3JvdXAgPyBiaW5Hcm91cCArICdfXycgKyBiaW5EaXIgOiBudWxsXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBmaWxsQmluT3B0cyh0cmFjZU91dCwgYmluR3JvdXBJbkRpciwgYmluRGlyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZpbGxCaW5PcHRzKHRyYWNlT3V0LCBiaW5Hcm91cCwgb3JpZW50YXRpb24yYmluRGlyKHRyYWNlT3V0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBjb2VyY2UgYmluIGF0dHJzIVxuICAgIGZvcihncm91cE5hbWUgaW4gYWxsQmluT3B0cykge1xuICAgICAgICB2YXIgYmluT3B0cyA9IGFsbEJpbk9wdHNbZ3JvdXBOYW1lXTtcbiAgICAgICAgdHJhY2VzID0gYmluT3B0cy50cmFjZXM7XG5cbiAgICAgICAgZm9yKGogPSAwOyBqIDwgQklOQVRUUlMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHZhciBhdHRyU3BlYyA9IEJJTkFUVFJTW2pdO1xuICAgICAgICAgICAgdmFyIGF0dHIgPSBhdHRyU3BlYy5uYW1lO1xuICAgICAgICAgICAgdmFyIGFTdHI7XG4gICAgICAgICAgICB2YXIgYXV0b1ZhbHM7XG5cbiAgICAgICAgICAgIC8vIG5iaW5zKHh8eSkgaXMgbW9vdCBpZiB3ZSBoYXZlIGEgc2l6ZS4gVGhpcyBkZXBlbmRzIG9uXG4gICAgICAgICAgICAvLyBuYmlucyBjb21pbmcgYWZ0ZXIgc2l6ZSBpbiBiaW5BdHRycy5cbiAgICAgICAgICAgIGlmKGF0dHIgPT09ICduYmlucycgJiYgYmluT3B0cy5zaXplRm91bmQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0cmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB0cmFjZU91dCA9IHRyYWNlc1tpXTtcbiAgICAgICAgICAgICAgICBiaW5EaXIgPSBiaW5PcHRzLmRpcnNbaV07XG4gICAgICAgICAgICAgICAgYVN0ciA9IGF0dHJTcGVjLmFTdHJbYmluRGlyXTtcblxuICAgICAgICAgICAgICAgIGlmKG5lc3RlZFByb3BlcnR5KHRyYWNlT3V0Ll9pbnB1dCwgYVN0cikuZ2V0KCkgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBiaW5PcHRzW2F0dHJdID0gY29lcmNlKGFTdHIpO1xuICAgICAgICAgICAgICAgICAgICBiaW5PcHRzW2F0dHIgKyAnRm91bmQnXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGF1dG9WYWxzID0gKHRyYWNlT3V0Ll9hdXRvQmluIHx8IHt9KVtiaW5EaXJdIHx8IHt9O1xuICAgICAgICAgICAgICAgIGlmKGF1dG9WYWxzW2F0dHJdKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoaXMgaXMgdGhlICpmaXJzdCogYXV0b3ZhbFxuICAgICAgICAgICAgICAgICAgICBuZXN0ZWRQcm9wZXJ0eSh0cmFjZU91dCwgYVN0cikuc2V0KGF1dG9WYWxzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN0YXJ0IGFuZCBlbmQgd2UgbmVlZCB0byBjb2VyY2UgYW55d2F5LCBhZnRlciBoYXZpbmcgY29sbGVjdGVkIHRoZVxuICAgICAgICAgICAgLy8gZmlyc3Qgb2YgZWFjaCBpbnRvIGJpbk9wdHMsIGluIGNhc2UgYSB0cmFjZSB3YW50cyB0byByZXN0cmljdCBpdHNcbiAgICAgICAgICAgIC8vIGRhdGEgdG8gYSBjZXJ0YWluIHJhbmdlXG4gICAgICAgICAgICBpZihhdHRyID09PSAnc3RhcnQnIHx8IGF0dHIgPT09ICdlbmQnKSB7XG4gICAgICAgICAgICAgICAgZm9yKDsgaSA8IHRyYWNlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB0cmFjZU91dCA9IHRyYWNlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgaWYodHJhY2VPdXRbJ18nICsgYmluRGlyICsgJ2Jpbmdyb3VwJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9WYWxzID0gKHRyYWNlT3V0Ll9hdXRvQmluIHx8IHt9KVtiaW5EaXJdIHx8IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29lcmNlKGFTdHIsIGF1dG9WYWxzW2F0dHJdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYoYXR0ciA9PT0gJ25iaW5zJyAmJiAhYmluT3B0cy5zaXplRm91bmQgJiYgIWJpbk9wdHMubmJpbnNGb3VuZCkge1xuICAgICAgICAgICAgICAgIHRyYWNlT3V0ID0gdHJhY2VzWzBdO1xuICAgICAgICAgICAgICAgIGJpbk9wdHNbYXR0cl0gPSBjb2VyY2UoYVN0cik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuIl0sInNvdXJjZVJvb3QiOiIifQ==