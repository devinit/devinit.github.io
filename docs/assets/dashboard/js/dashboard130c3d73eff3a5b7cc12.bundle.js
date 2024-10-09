(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_echarts_lib_chart_helper_createListFromArray_js"],{

/***/ "./node_modules/echarts/lib/chart/helper/createListFromArray.js":
/*!**********************************************************************!*\
  !*** ./node_modules/echarts/lib/chart/helper/createListFromArray.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _data_List__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../data/List */ "./node_modules/echarts/lib/data/List.js");
/* harmony import */ var _data_helper_createDimensions__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../data/helper/createDimensions */ "./node_modules/echarts/lib/data/helper/createDimensions.js");
/* harmony import */ var _data_helper_dimensionHelper__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../data/helper/dimensionHelper */ "./node_modules/echarts/lib/data/helper/dimensionHelper.js");
/* harmony import */ var _util_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util/model */ "./node_modules/echarts/lib/util/model.js");
/* harmony import */ var _core_CoordinateSystem__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/CoordinateSystem */ "./node_modules/echarts/lib/core/CoordinateSystem.js");
/* harmony import */ var _model_referHelper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../model/referHelper */ "./node_modules/echarts/lib/model/referHelper.js");
/* harmony import */ var _data_Source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../data/Source */ "./node_modules/echarts/lib/data/Source.js");
/* harmony import */ var _data_helper_dataStackHelper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../data/helper/dataStackHelper */ "./node_modules/echarts/lib/data/helper/dataStackHelper.js");
/* harmony import */ var _data_helper_sourceHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../data/helper/sourceHelper */ "./node_modules/echarts/lib/data/helper/sourceHelper.js");
/* harmony import */ var _util_types__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/types */ "./node_modules/echarts/lib/util/types.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/












function createListFromArray(source, seriesModel, opt) {
  opt = opt || {};

  if (!(0,_data_Source__WEBPACK_IMPORTED_MODULE_0__.isSourceInstance)(source)) {
    source = (0,_data_Source__WEBPACK_IMPORTED_MODULE_0__.createSourceFromSeriesDataOption)(source);
  }

  var coordSysName = seriesModel.get('coordinateSystem');
  var registeredCoordSys = _core_CoordinateSystem__WEBPACK_IMPORTED_MODULE_1__.default.get(coordSysName);
  var coordSysInfo = (0,_model_referHelper__WEBPACK_IMPORTED_MODULE_2__.getCoordSysInfoBySeries)(seriesModel);
  var coordSysDimDefs;

  if (coordSysInfo && coordSysInfo.coordSysDims) {
    coordSysDimDefs = zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_3__.map(coordSysInfo.coordSysDims, function (dim) {
      var dimInfo = {
        name: dim
      };
      var axisModel = coordSysInfo.axisMap.get(dim);

      if (axisModel) {
        var axisType = axisModel.get('type');
        dimInfo.type = (0,_data_helper_dimensionHelper__WEBPACK_IMPORTED_MODULE_4__.getDimensionTypeByAxis)(axisType); // dimInfo.stackable = isStackable(axisType);
      }

      return dimInfo;
    });
  }

  if (!coordSysDimDefs) {
    // Get dimensions from registered coordinate system
    coordSysDimDefs = registeredCoordSys && (registeredCoordSys.getDimensionsInfo ? registeredCoordSys.getDimensionsInfo() : registeredCoordSys.dimensions.slice()) || ['x', 'y'];
  }

  var useEncodeDefaulter = opt.useEncodeDefaulter;
  var dimInfoList = (0,_data_helper_createDimensions__WEBPACK_IMPORTED_MODULE_5__.default)(source, {
    coordDimensions: coordSysDimDefs,
    generateCoord: opt.generateCoord,
    encodeDefaulter: zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_3__.isFunction(useEncodeDefaulter) ? useEncodeDefaulter : useEncodeDefaulter ? zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_3__.curry(_data_helper_sourceHelper__WEBPACK_IMPORTED_MODULE_6__.makeSeriesEncodeForAxisCoordSys, coordSysDimDefs, seriesModel) : null
  });
  var firstCategoryDimIndex;
  var hasNameEncode;
  coordSysInfo && zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_3__.each(dimInfoList, function (dimInfo, dimIndex) {
    var coordDim = dimInfo.coordDim;
    var categoryAxisModel = coordSysInfo.categoryAxisMap.get(coordDim);

    if (categoryAxisModel) {
      if (firstCategoryDimIndex == null) {
        firstCategoryDimIndex = dimIndex;
      }

      dimInfo.ordinalMeta = categoryAxisModel.getOrdinalMeta();

      if (opt.createInvertedIndices) {
        dimInfo.createInvertedIndices = true;
      }
    }

    if (dimInfo.otherDims.itemName != null) {
      hasNameEncode = true;
    }
  });

  if (!hasNameEncode && firstCategoryDimIndex != null) {
    dimInfoList[firstCategoryDimIndex].otherDims.itemName = 0;
  }

  var stackCalculationInfo = (0,_data_helper_dataStackHelper__WEBPACK_IMPORTED_MODULE_7__.enableDataStack)(seriesModel, dimInfoList);
  var list = new _data_List__WEBPACK_IMPORTED_MODULE_8__.default(dimInfoList, seriesModel);
  list.setCalculationInfo(stackCalculationInfo);
  var dimValueGetter = firstCategoryDimIndex != null && isNeedCompleteOrdinalData(source) ? function (itemOpt, dimName, dataIndex, dimIndex) {
    // Use dataIndex as ordinal value in categoryAxis
    return dimIndex === firstCategoryDimIndex ? dataIndex : this.defaultDimValueGetter(itemOpt, dimName, dataIndex, dimIndex);
  } : null;
  list.hasItemOption = false;
  list.initData(source, null, dimValueGetter);
  return list;
}

function isNeedCompleteOrdinalData(source) {
  if (source.sourceFormat === _util_types__WEBPACK_IMPORTED_MODULE_9__.SOURCE_FORMAT_ORIGINAL) {
    var sampleItem = firstDataNotNull(source.data || []);
    return sampleItem != null && !zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_3__.isArray((0,_util_model__WEBPACK_IMPORTED_MODULE_10__.getDataItemValue)(sampleItem));
  }
}

function firstDataNotNull(data) {
  var i = 0;

  while (i < data.length && data[i] == null) {
    i++;
  }

  return data[i];
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createListFromArray);

/***/ }),

/***/ "./node_modules/echarts/lib/data/helper/completeDimensions.js":
/*!********************************************************************!*\
  !*** ./node_modules/echarts/lib/data/helper/completeDimensions.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _util_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/model */ "./node_modules/echarts/lib/util/model.js");
/* harmony import */ var _sourceHelper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./sourceHelper */ "./node_modules/echarts/lib/data/helper/sourceHelper.js");
/* harmony import */ var _Source__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Source */ "./node_modules/echarts/lib/data/Source.js");
/* harmony import */ var _util_types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/types */ "./node_modules/echarts/lib/util/types.js");
/* harmony import */ var _DataDimensionInfo__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../DataDimensionInfo */ "./node_modules/echarts/lib/data/DataDimensionInfo.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * @deprecated
 * Use `echarts/data/helper/createDimensions` instead.
 */






/**
 * @see {module:echarts/test/ut/spec/data/completeDimensions}
 *
 * This method builds the relationship between:
 * + "what the coord sys or series requires (see `sysDims`)",
 * + "what the user defines (in `encode` and `dimensions`, see `opt.dimsDef` and `opt.encodeDef`)"
 * + "what the data source provids (see `source`)".
 *
 * Some guess strategy will be adapted if user does not define something.
 * If no 'value' dimension specified, the first no-named dimension will be
 * named as 'value'.
 *
 * @param {Array.<string>} sysDims Necessary dimensions, like ['x', 'y'], which
 *      provides not only dim template, but also default order.
 *      properties: 'name', 'type', 'displayName'.
 *      `name` of each item provides default coord name.
 *      [{dimsDef: [string|Object, ...]}, ...] dimsDef of sysDim item provides default dim name, and
 *                                    provide dims count that the sysDim required.
 *      [{ordinalMeta}] can be specified.
 * @param {module:echarts/data/Source|Array|Object} source or data (for compatibal with pervious)
 * @param {Object} [opt]
 * @param {Array.<Object|string>} [opt.dimsDef] option.series.dimensions User defined dimensions
 *      For example: ['asdf', {name, type}, ...].
 * @param {Object|HashMap} [opt.encodeDef] option.series.encode {x: 2, y: [3, 1], tooltip: [1, 2], label: 3}
 * @param {Function} [opt.encodeDefaulter] Called if no `opt.encodeDef` exists.
 *      If not specified, auto find the next available data dim.
 *      param source {module:data/Source}
 *      param dimCount {number}
 *      return {Object} encode Never be `null/undefined`.
 * @param {string} [opt.generateCoord] Generate coord dim with the given name.
 *      If not specified, extra dim names will be:
 *      'value', 'value0', 'value1', ...
 * @param {number} [opt.generateCoordCount] By default, the generated dim name is `generateCoord`.
 *      If `generateCoordCount` specified, the generated dim names will be:
 *      `generateCoord` + 0, `generateCoord` + 1, ...
 *      can be Infinity, indicate that use all of the remain columns.
 * @param {number} [opt.dimCount] If not specified, guess by the first data item.
 * @return {Array.<module:data/DataDimensionInfo>}
 */

function completeDimensions(sysDims, source, opt) {
  if (!(0,_Source__WEBPACK_IMPORTED_MODULE_0__.isSourceInstance)(source)) {
    source = (0,_Source__WEBPACK_IMPORTED_MODULE_0__.createSourceFromSeriesDataOption)(source);
  }

  opt = opt || {};
  sysDims = (sysDims || []).slice();
  var dimsDef = (opt.dimsDef || []).slice();
  var dataDimNameMap = (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.createHashMap)();
  var coordDimNameMap = (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.createHashMap)(); // let valueCandidate;

  var result = [];
  var dimCount = getDimCount(source, sysDims, dimsDef, opt.dimCount); // Apply user defined dims (`name` and `type`) and init result.

  for (var i = 0; i < dimCount; i++) {
    var dimDefItemRaw = dimsDef[i];
    var dimDefItem = dimsDef[i] = (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.extend)({}, (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.isObject)(dimDefItemRaw) ? dimDefItemRaw : {
      name: dimDefItemRaw
    });
    var userDimName = dimDefItem.name;
    var resultItem = result[i] = new _DataDimensionInfo__WEBPACK_IMPORTED_MODULE_2__.default(); // Name will be applied later for avoiding duplication.

    if (userDimName != null && dataDimNameMap.get(userDimName) == null) {
      // Only if `series.dimensions` is defined in option
      // displayName, will be set, and dimension will be diplayed vertically in
      // tooltip by default.
      resultItem.name = resultItem.displayName = userDimName;
      dataDimNameMap.set(userDimName, i);
    }

    dimDefItem.type != null && (resultItem.type = dimDefItem.type);
    dimDefItem.displayName != null && (resultItem.displayName = dimDefItem.displayName);
  }

  var encodeDef = opt.encodeDef;

  if (!encodeDef && opt.encodeDefaulter) {
    encodeDef = opt.encodeDefaulter(source, dimCount);
  }

  var encodeDefMap = (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.createHashMap)(encodeDef); // Set `coordDim` and `coordDimIndex` by `encodeDefMap` and normalize `encodeDefMap`.

  encodeDefMap.each(function (dataDimsRaw, coordDim) {
    var dataDims = (0,_util_model__WEBPACK_IMPORTED_MODULE_3__.normalizeToArray)(dataDimsRaw).slice(); // Note: It is allowed that `dataDims.length` is `0`, e.g., options is
    // `{encode: {x: -1, y: 1}}`. Should not filter anything in
    // this case.

    if (dataDims.length === 1 && !(0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.isString)(dataDims[0]) && dataDims[0] < 0) {
      encodeDefMap.set(coordDim, false);
      return;
    }

    var validDataDims = encodeDefMap.set(coordDim, []);
    (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.each)(dataDims, function (resultDimIdxOrName, idx) {
      // The input resultDimIdx can be dim name or index.
      var resultDimIdx = (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.isString)(resultDimIdxOrName) ? dataDimNameMap.get(resultDimIdxOrName) : resultDimIdxOrName;

      if (resultDimIdx != null && resultDimIdx < dimCount) {
        validDataDims[idx] = resultDimIdx;
        applyDim(result[resultDimIdx], coordDim, idx);
      }
    });
  }); // Apply templetes and default order from `sysDims`.

  var availDimIdx = 0;
  (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.each)(sysDims, function (sysDimItemRaw) {
    var coordDim;
    var sysDimItemDimsDef;
    var sysDimItemOtherDims;
    var sysDimItem;

    if ((0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.isString)(sysDimItemRaw)) {
      coordDim = sysDimItemRaw;
      sysDimItem = {};
    } else {
      sysDimItem = sysDimItemRaw;
      coordDim = sysDimItem.name;
      var ordinalMeta = sysDimItem.ordinalMeta;
      sysDimItem.ordinalMeta = null;
      sysDimItem = (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.clone)(sysDimItem);
      sysDimItem.ordinalMeta = ordinalMeta; // `coordDimIndex` should not be set directly.

      sysDimItemDimsDef = sysDimItem.dimsDef;
      sysDimItemOtherDims = sysDimItem.otherDims;
      sysDimItem.name = sysDimItem.coordDim = sysDimItem.coordDimIndex = sysDimItem.dimsDef = sysDimItem.otherDims = null;
    }

    var dataDims = encodeDefMap.get(coordDim); // negative resultDimIdx means no need to mapping.

    if (dataDims === false) {
      return;
    }

    dataDims = (0,_util_model__WEBPACK_IMPORTED_MODULE_3__.normalizeToArray)(dataDims); // dimensions provides default dim sequences.

    if (!dataDims.length) {
      for (var i = 0; i < (sysDimItemDimsDef && sysDimItemDimsDef.length || 1); i++) {
        while (availDimIdx < result.length && result[availDimIdx].coordDim != null) {
          availDimIdx++;
        }

        availDimIdx < result.length && dataDims.push(availDimIdx++);
      }
    } // Apply templates.


    (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.each)(dataDims, function (resultDimIdx, coordDimIndex) {
      var resultItem = result[resultDimIdx];
      applyDim((0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.defaults)(resultItem, sysDimItem), coordDim, coordDimIndex);

      if (resultItem.name == null && sysDimItemDimsDef) {
        var sysDimItemDimsDefItem = sysDimItemDimsDef[coordDimIndex];
        !(0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.isObject)(sysDimItemDimsDefItem) && (sysDimItemDimsDefItem = {
          name: sysDimItemDimsDefItem
        });
        resultItem.name = resultItem.displayName = sysDimItemDimsDefItem.name;
        resultItem.defaultTooltip = sysDimItemDimsDefItem.defaultTooltip;
      } // FIXME refactor, currently only used in case: {otherDims: {tooltip: false}}


      sysDimItemOtherDims && (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.defaults)(resultItem.otherDims, sysDimItemOtherDims);
    });
  });

  function applyDim(resultItem, coordDim, coordDimIndex) {
    if (_util_types__WEBPACK_IMPORTED_MODULE_4__.VISUAL_DIMENSIONS.get(coordDim) != null) {
      resultItem.otherDims[coordDim] = coordDimIndex;
    } else {
      resultItem.coordDim = coordDim;
      resultItem.coordDimIndex = coordDimIndex;
      coordDimNameMap.set(coordDim, true);
    }
  } // Make sure the first extra dim is 'value'.


  var generateCoord = opt.generateCoord;
  var generateCoordCount = opt.generateCoordCount;
  var fromZero = generateCoordCount != null;
  generateCoordCount = generateCoord ? generateCoordCount || 1 : 0;
  var extra = generateCoord || 'value'; // Set dim `name` and other `coordDim` and other props.

  for (var resultDimIdx = 0; resultDimIdx < dimCount; resultDimIdx++) {
    var resultItem = result[resultDimIdx] = result[resultDimIdx] || new _DataDimensionInfo__WEBPACK_IMPORTED_MODULE_2__.default();
    var coordDim = resultItem.coordDim;

    if (coordDim == null) {
      resultItem.coordDim = genName(extra, coordDimNameMap, fromZero);
      resultItem.coordDimIndex = 0;

      if (!generateCoord || generateCoordCount <= 0) {
        resultItem.isExtraCoord = true;
      }

      generateCoordCount--;
    }

    resultItem.name == null && (resultItem.name = genName(resultItem.coordDim, dataDimNameMap, false));

    if (resultItem.type == null && ((0,_sourceHelper__WEBPACK_IMPORTED_MODULE_5__.guessOrdinal)(source, resultDimIdx) === _sourceHelper__WEBPACK_IMPORTED_MODULE_5__.BE_ORDINAL.Must // Consider the case:
    // {
    //    dataset: {source: [
    //        ['2001', 123],
    //        ['2002', 456],
    //        ...
    //        ['The others', 987],
    //    ]},
    //    series: {type: 'pie'}
    // }
    // The first colum should better be treated as a "ordinal" although it
    // might not able to be detected as an "ordinal" by `guessOrdinal`.
    || resultItem.isExtraCoord && (resultItem.otherDims.itemName != null || resultItem.otherDims.seriesName != null))) {
      resultItem.type = 'ordinal';
    }
  }

  return result;
} // ??? TODO
// Originally detect dimCount by data[0]. Should we
// optimize it to only by sysDims and dimensions and encode.
// So only necessary dims will be initialized.
// But
// (1) custom series should be considered. where other dims
// may be visited.
// (2) sometimes user need to calcualte bubble size or use visualMap
// on other dimensions besides coordSys needed.
// So, dims that is not used by system, should be shared in storage?


function getDimCount(source, sysDims, dimsDef, optDimCount) {
  // Note that the result dimCount should not small than columns count
  // of data, otherwise `dataDimNameMap` checking will be incorrect.
  var dimCount = Math.max(source.dimensionsDetectedCount || 1, sysDims.length, dimsDef.length, optDimCount || 0);
  (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.each)(sysDims, function (sysDimItem) {
    var sysDimItemDimsDef;

    if ((0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_1__.isObject)(sysDimItem) && (sysDimItemDimsDef = sysDimItem.dimsDef)) {
      dimCount = Math.max(dimCount, sysDimItemDimsDef.length);
    }
  });
  return dimCount;
}

function genName(name, map, fromZero) {
  if (fromZero || map.get(name) != null) {
    var i = 0;

    while (map.get(name + i) != null) {
      i++;
    }

    name += i;
  }

  map.set(name, true);
  return name;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (completeDimensions);

/***/ }),

/***/ "./node_modules/echarts/lib/data/helper/createDimensions.js":
/*!******************************************************************!*\
  !*** ./node_modules/echarts/lib/data/helper/createDimensions.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createDimensions)
/* harmony export */ });
/* harmony import */ var _completeDimensions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./completeDimensions */ "./node_modules/echarts/lib/data/helper/completeDimensions.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * Substitute `completeDimensions`.
 * `completeDimensions` is to be deprecated.
 */

/**
 * @param opt.coordDimensions
 * @param opt.dimensionsDefine By default `source.dimensionsDefine` Overwrite source define.
 * @param opt.encodeDefine By default `source.encodeDefine` Overwrite source define.
 * @param opt.encodeDefaulter Make default encode if user not specified.
 */

function createDimensions( // TODO: TYPE completeDimensions type
source, opt) {
  opt = opt || {};
  return (0,_completeDimensions__WEBPACK_IMPORTED_MODULE_0__.default)(opt.coordDimensions || [], source, {
    // FIXME:TS detect whether source then call `.dimensionsDefine` and `.encodeDefine`?
    dimsDef: opt.dimensionsDefine || source.dimensionsDefine,
    encodeDef: opt.encodeDefine || source.encodeDefine,
    dimCount: opt.dimensionsCount,
    encodeDefaulter: opt.encodeDefaulter,
    generateCoord: opt.generateCoord,
    generateCoordCount: opt.generateCoordCount
  });
}

/***/ }),

/***/ "./node_modules/echarts/lib/model/referHelper.js":
/*!*******************************************************!*\
  !*** ./node_modules/echarts/lib/model/referHelper.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getCoordSysInfoBySeries": () => (/* binding */ getCoordSysInfoBySeries)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _util_model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util/model */ "./node_modules/echarts/lib/util/model.js");

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/


/**
 * AUTO-GENERATED FILE. DO NOT MODIFY.
 */

/*
* Licensed to the Apache Software Foundation (ASF) under one
* or more contributor license agreements.  See the NOTICE file
* distributed with this work for additional information
* regarding copyright ownership.  The ASF licenses this file
* to you under the Apache License, Version 2.0 (the
* "License"); you may not use this file except in compliance
* with the License.  You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing,
* software distributed under the License is distributed on an
* "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
* KIND, either express or implied.  See the License for the
* specific language governing permissions and limitations
* under the License.
*/

/**
 * Helper for model references.
 * There are many manners to refer axis/coordSys.
 */
// TODO
// merge relevant logic to this file?
// check: "modelHelper" of tooltip and "BrushTargetManager".


/**
 * @class
 * For example:
 * {
 *     coordSysName: 'cartesian2d',
 *     coordSysDims: ['x', 'y', ...],
 *     axisMap: HashMap({
 *         x: xAxisModel,
 *         y: yAxisModel
 *     }),
 *     categoryAxisMap: HashMap({
 *         x: xAxisModel,
 *         y: undefined
 *     }),
 *     // The index of the first category axis in `coordSysDims`.
 *     // `null/undefined` means no category axis exists.
 *     firstCategoryDimIndex: 1,
 *     // To replace user specified encode.
 * }
 */

var CoordSysInfo =
/** @class */
function () {
  function CoordSysInfo(coordSysName) {
    this.coordSysDims = [];
    this.axisMap = (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.createHashMap)();
    this.categoryAxisMap = (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.createHashMap)();
    this.coordSysName = coordSysName;
  }

  return CoordSysInfo;
}();

function getCoordSysInfoBySeries(seriesModel) {
  var coordSysName = seriesModel.get('coordinateSystem');
  var result = new CoordSysInfo(coordSysName);
  var fetch = fetchers[coordSysName];

  if (fetch) {
    fetch(seriesModel, result, result.axisMap, result.categoryAxisMap);
    return result;
  }
}
var fetchers = {
  cartesian2d: function (seriesModel, result, axisMap, categoryAxisMap) {
    var xAxisModel = seriesModel.getReferringComponents('xAxis', _util_model__WEBPACK_IMPORTED_MODULE_1__.SINGLE_REFERRING).models[0];
    var yAxisModel = seriesModel.getReferringComponents('yAxis', _util_model__WEBPACK_IMPORTED_MODULE_1__.SINGLE_REFERRING).models[0];

    if (true) {
      if (!xAxisModel) {
        throw new Error('xAxis "' + (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.retrieve)(seriesModel.get('xAxisIndex'), seriesModel.get('xAxisId'), 0) + '" not found');
      }

      if (!yAxisModel) {
        throw new Error('yAxis "' + (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.retrieve)(seriesModel.get('xAxisIndex'), seriesModel.get('yAxisId'), 0) + '" not found');
      }
    }

    result.coordSysDims = ['x', 'y'];
    axisMap.set('x', xAxisModel);
    axisMap.set('y', yAxisModel);

    if (isCategory(xAxisModel)) {
      categoryAxisMap.set('x', xAxisModel);
      result.firstCategoryDimIndex = 0;
    }

    if (isCategory(yAxisModel)) {
      categoryAxisMap.set('y', yAxisModel);
      result.firstCategoryDimIndex == null && (result.firstCategoryDimIndex = 1);
    }
  },
  singleAxis: function (seriesModel, result, axisMap, categoryAxisMap) {
    var singleAxisModel = seriesModel.getReferringComponents('singleAxis', _util_model__WEBPACK_IMPORTED_MODULE_1__.SINGLE_REFERRING).models[0];

    if (true) {
      if (!singleAxisModel) {
        throw new Error('singleAxis should be specified.');
      }
    }

    result.coordSysDims = ['single'];
    axisMap.set('single', singleAxisModel);

    if (isCategory(singleAxisModel)) {
      categoryAxisMap.set('single', singleAxisModel);
      result.firstCategoryDimIndex = 0;
    }
  },
  polar: function (seriesModel, result, axisMap, categoryAxisMap) {
    var polarModel = seriesModel.getReferringComponents('polar', _util_model__WEBPACK_IMPORTED_MODULE_1__.SINGLE_REFERRING).models[0];
    var radiusAxisModel = polarModel.findAxisModel('radiusAxis');
    var angleAxisModel = polarModel.findAxisModel('angleAxis');

    if (true) {
      if (!angleAxisModel) {
        throw new Error('angleAxis option not found');
      }

      if (!radiusAxisModel) {
        throw new Error('radiusAxis option not found');
      }
    }

    result.coordSysDims = ['radius', 'angle'];
    axisMap.set('radius', radiusAxisModel);
    axisMap.set('angle', angleAxisModel);

    if (isCategory(radiusAxisModel)) {
      categoryAxisMap.set('radius', radiusAxisModel);
      result.firstCategoryDimIndex = 0;
    }

    if (isCategory(angleAxisModel)) {
      categoryAxisMap.set('angle', angleAxisModel);
      result.firstCategoryDimIndex == null && (result.firstCategoryDimIndex = 1);
    }
  },
  geo: function (seriesModel, result, axisMap, categoryAxisMap) {
    result.coordSysDims = ['lng', 'lat'];
  },
  parallel: function (seriesModel, result, axisMap, categoryAxisMap) {
    var ecModel = seriesModel.ecModel;
    var parallelModel = ecModel.getComponent('parallel', seriesModel.get('parallelIndex'));
    var coordSysDims = result.coordSysDims = parallelModel.dimensions.slice();
    (0,zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.each)(parallelModel.parallelAxisIndex, function (axisIndex, index) {
      var axisModel = ecModel.getComponent('parallelAxis', axisIndex);
      var axisDim = coordSysDims[index];
      axisMap.set(axisDim, axisModel);

      if (isCategory(axisModel)) {
        categoryAxisMap.set(axisDim, axisModel);

        if (result.firstCategoryDimIndex == null) {
          result.firstCategoryDimIndex = index;
        }
      }
    });
  }
};

function isCategory(axisModel) {
  return axisModel.get('type') === 'category';
}

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VjaGFydHMvbGliL2NoYXJ0L2hlbHBlci9jcmVhdGVMaXN0RnJvbUFycmF5LmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZWNoYXJ0cy9saWIvZGF0YS9oZWxwZXIvY29tcGxldGVEaW1lbnNpb25zLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZWNoYXJ0cy9saWIvZGF0YS9oZWxwZXIvY3JlYXRlRGltZW5zaW9ucy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VjaGFydHMvbGliL21vZGVsL3JlZmVySGVscGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2dEO0FBQ2I7QUFDK0I7QUFDUztBQUN2QjtBQUNPO0FBQ087QUFDcUI7QUFDbkI7QUFDYTtBQUN2Qjs7QUFFMUQ7QUFDQTs7QUFFQSxPQUFPLDhEQUFnQjtBQUN2QixhQUFhLDhFQUFnQztBQUM3Qzs7QUFFQTtBQUNBLDJCQUEyQiwrREFBb0I7QUFDL0MscUJBQXFCLDJFQUF1QjtBQUM1Qzs7QUFFQTtBQUNBLHNCQUFzQixzREFBVTtBQUNoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCLG9GQUFzQixXQUFXO0FBQ3hEOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztB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O0FBQ0Esb0NBQW9DLCtEQUFRO0FBQzVDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsMkVBQTJFLHlEQUFnQjs7QUFFM0YsUUFBUSxJQUFxQztBQUM3QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsaUVBQWlFLHlEQUFnQjtBQUNqRjtBQUNBOztBQUVBLFFBQVEsSUFBcUM7QUFDN0M7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSSwyREFBSTtBQUNSO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEMiLCJmaWxlIjoiZGFzaGJvYXJkL2pzL2Rhc2hib2FyZDEzMGMzZDczZWZmM2E1YjdjYzEyLmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5cbi8qKlxuICogQVVUTy1HRU5FUkFURUQgRklMRS4gRE8gTk9UIE1PRElGWS5cbiAqL1xuXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5pbXBvcnQgKiBhcyB6clV0aWwgZnJvbSAnenJlbmRlci9saWIvY29yZS91dGlsJztcbmltcG9ydCBMaXN0IGZyb20gJy4uLy4uL2RhdGEvTGlzdCc7XG5pbXBvcnQgY3JlYXRlRGltZW5zaW9ucyBmcm9tICcuLi8uLi9kYXRhL2hlbHBlci9jcmVhdGVEaW1lbnNpb25zJztcbmltcG9ydCB7IGdldERpbWVuc2lvblR5cGVCeUF4aXMgfSBmcm9tICcuLi8uLi9kYXRhL2hlbHBlci9kaW1lbnNpb25IZWxwZXInO1xuaW1wb3J0IHsgZ2V0RGF0YUl0ZW1WYWx1ZSB9IGZyb20gJy4uLy4uL3V0aWwvbW9kZWwnO1xuaW1wb3J0IENvb3JkaW5hdGVTeXN0ZW0gZnJvbSAnLi4vLi4vY29yZS9Db29yZGluYXRlU3lzdGVtJztcbmltcG9ydCB7IGdldENvb3JkU3lzSW5mb0J5U2VyaWVzIH0gZnJvbSAnLi4vLi4vbW9kZWwvcmVmZXJIZWxwZXInO1xuaW1wb3J0IHsgY3JlYXRlU291cmNlRnJvbVNlcmllc0RhdGFPcHRpb24sIGlzU291cmNlSW5zdGFuY2UgfSBmcm9tICcuLi8uLi9kYXRhL1NvdXJjZSc7XG5pbXBvcnQgeyBlbmFibGVEYXRhU3RhY2sgfSBmcm9tICcuLi8uLi9kYXRhL2hlbHBlci9kYXRhU3RhY2tIZWxwZXInO1xuaW1wb3J0IHsgbWFrZVNlcmllc0VuY29kZUZvckF4aXNDb29yZFN5cyB9IGZyb20gJy4uLy4uL2RhdGEvaGVscGVyL3NvdXJjZUhlbHBlcic7XG5pbXBvcnQgeyBTT1VSQ0VfRk9STUFUX09SSUdJTkFMIH0gZnJvbSAnLi4vLi4vdXRpbC90eXBlcyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUxpc3RGcm9tQXJyYXkoc291cmNlLCBzZXJpZXNNb2RlbCwgb3B0KSB7XG4gIG9wdCA9IG9wdCB8fCB7fTtcblxuICBpZiAoIWlzU291cmNlSW5zdGFuY2Uoc291cmNlKSkge1xuICAgIHNvdXJjZSA9IGNyZWF0ZVNvdXJjZUZyb21TZXJpZXNEYXRhT3B0aW9uKHNvdXJjZSk7XG4gIH1cblxuICB2YXIgY29vcmRTeXNOYW1lID0gc2VyaWVzTW9kZWwuZ2V0KCdjb29yZGluYXRlU3lzdGVtJyk7XG4gIHZhciByZWdpc3RlcmVkQ29vcmRTeXMgPSBDb29yZGluYXRlU3lzdGVtLmdldChjb29yZFN5c05hbWUpO1xuICB2YXIgY29vcmRTeXNJbmZvID0gZ2V0Q29vcmRTeXNJbmZvQnlTZXJpZXMoc2VyaWVzTW9kZWwpO1xuICB2YXIgY29vcmRTeXNEaW1EZWZzO1xuXG4gIGlmIChjb29yZFN5c0luZm8gJiYgY29vcmRTeXNJbmZvLmNvb3JkU3lzRGltcykge1xuICAgIGNvb3JkU3lzRGltRGVmcyA9IHpyVXRpbC5tYXAoY29vcmRTeXNJbmZvLmNvb3JkU3lzRGltcywgZnVuY3Rpb24gKGRpbSkge1xuICAgICAgdmFyIGRpbUluZm8gPSB7XG4gICAgICAgIG5hbWU6IGRpbVxuICAgICAgfTtcbiAgICAgIHZhciBheGlzTW9kZWwgPSBjb29yZFN5c0luZm8uYXhpc01hcC5nZXQoZGltKTtcblxuICAgICAgaWYgKGF4aXNNb2RlbCkge1xuICAgICAgICB2YXIgYXhpc1R5cGUgPSBheGlzTW9kZWwuZ2V0KCd0eXBlJyk7XG4gICAgICAgIGRpbUluZm8udHlwZSA9IGdldERpbWVuc2lvblR5cGVCeUF4aXMoYXhpc1R5cGUpOyAvLyBkaW1JbmZvLnN0YWNrYWJsZSA9IGlzU3RhY2thYmxlKGF4aXNUeXBlKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRpbUluZm87XG4gICAgfSk7XG4gIH1cblxuICBpZiAoIWNvb3JkU3lzRGltRGVmcykge1xuICAgIC8vIEdldCBkaW1lbnNpb25zIGZyb20gcmVnaXN0ZXJlZCBjb29yZGluYXRlIHN5c3RlbVxuICAgIGNvb3JkU3lzRGltRGVmcyA9IHJlZ2lzdGVyZWRDb29yZFN5cyAmJiAocmVnaXN0ZXJlZENvb3JkU3lzLmdldERpbWVuc2lvbnNJbmZvID8gcmVnaXN0ZXJlZENvb3JkU3lzLmdldERpbWVuc2lvbnNJbmZvKCkgOiByZWdpc3RlcmVkQ29vcmRTeXMuZGltZW5zaW9ucy5zbGljZSgpKSB8fCBbJ3gnLCAneSddO1xuICB9XG5cbiAgdmFyIHVzZUVuY29kZURlZmF1bHRlciA9IG9wdC51c2VFbmNvZGVEZWZhdWx0ZXI7XG4gIHZhciBkaW1JbmZvTGlzdCA9IGNyZWF0ZURpbWVuc2lvbnMoc291cmNlLCB7XG4gICAgY29vcmREaW1lbnNpb25zOiBjb29yZFN5c0RpbURlZnMsXG4gICAgZ2VuZXJhdGVDb29yZDogb3B0LmdlbmVyYXRlQ29vcmQsXG4gICAgZW5jb2RlRGVmYXVsdGVyOiB6clV0aWwuaXNGdW5jdGlvbih1c2VFbmNvZGVEZWZhdWx0ZXIpID8gdXNlRW5jb2RlRGVmYXVsdGVyIDogdXNlRW5jb2RlRGVmYXVsdGVyID8genJVdGlsLmN1cnJ5KG1ha2VTZXJpZXNFbmNvZGVGb3JBeGlzQ29vcmRTeXMsIGNvb3JkU3lzRGltRGVmcywgc2VyaWVzTW9kZWwpIDogbnVsbFxuICB9KTtcbiAgdmFyIGZpcnN0Q2F0ZWdvcnlEaW1JbmRleDtcbiAgdmFyIGhhc05hbWVFbmNvZGU7XG4gIGNvb3JkU3lzSW5mbyAmJiB6clV0aWwuZWFjaChkaW1JbmZvTGlzdCwgZnVuY3Rpb24gKGRpbUluZm8sIGRpbUluZGV4KSB7XG4gICAgdmFyIGNvb3JkRGltID0gZGltSW5mby5jb29yZERpbTtcbiAgICB2YXIgY2F0ZWdvcnlBeGlzTW9kZWwgPSBjb29yZFN5c0luZm8uY2F0ZWdvcnlBeGlzTWFwLmdldChjb29yZERpbSk7XG5cbiAgICBpZiAoY2F0ZWdvcnlBeGlzTW9kZWwpIHtcbiAgICAgIGlmIChmaXJzdENhdGVnb3J5RGltSW5kZXggPT0gbnVsbCkge1xuICAgICAgICBmaXJzdENhdGVnb3J5RGltSW5kZXggPSBkaW1JbmRleDtcbiAgICAgIH1cblxuICAgICAgZGltSW5mby5vcmRpbmFsTWV0YSA9IGNhdGVnb3J5QXhpc01vZGVsLmdldE9yZGluYWxNZXRhKCk7XG5cbiAgICAgIGlmIChvcHQuY3JlYXRlSW52ZXJ0ZWRJbmRpY2VzKSB7XG4gICAgICAgIGRpbUluZm8uY3JlYXRlSW52ZXJ0ZWRJbmRpY2VzID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZGltSW5mby5vdGhlckRpbXMuaXRlbU5hbWUgIT0gbnVsbCkge1xuICAgICAgaGFzTmFtZUVuY29kZSA9IHRydWU7XG4gICAgfVxuICB9KTtcblxuICBpZiAoIWhhc05hbWVFbmNvZGUgJiYgZmlyc3RDYXRlZ29yeURpbUluZGV4ICE9IG51bGwpIHtcbiAgICBkaW1JbmZvTGlzdFtmaXJzdENhdGVnb3J5RGltSW5kZXhdLm90aGVyRGltcy5pdGVtTmFtZSA9IDA7XG4gIH1cblxuICB2YXIgc3RhY2tDYWxjdWxhdGlvbkluZm8gPSBlbmFibGVEYXRhU3RhY2soc2VyaWVzTW9kZWwsIGRpbUluZm9MaXN0KTtcbiAgdmFyIGxpc3QgPSBuZXcgTGlzdChkaW1JbmZvTGlzdCwgc2VyaWVzTW9kZWwpO1xuICBsaXN0LnNldENhbGN1bGF0aW9uSW5mbyhzdGFja0NhbGN1bGF0aW9uSW5mbyk7XG4gIHZhciBkaW1WYWx1ZUdldHRlciA9IGZpcnN0Q2F0ZWdvcnlEaW1JbmRleCAhPSBudWxsICYmIGlzTmVlZENvbXBsZXRlT3JkaW5hbERhdGEoc291cmNlKSA/IGZ1bmN0aW9uIChpdGVtT3B0LCBkaW1OYW1lLCBkYXRhSW5kZXgsIGRpbUluZGV4KSB7XG4gICAgLy8gVXNlIGRhdGFJbmRleCBhcyBvcmRpbmFsIHZhbHVlIGluIGNhdGVnb3J5QXhpc1xuICAgIHJldHVybiBkaW1JbmRleCA9PT0gZmlyc3RDYXRlZ29yeURpbUluZGV4ID8gZGF0YUluZGV4IDogdGhpcy5kZWZhdWx0RGltVmFsdWVHZXR0ZXIoaXRlbU9wdCwgZGltTmFtZSwgZGF0YUluZGV4LCBkaW1JbmRleCk7XG4gIH0gOiBudWxsO1xuICBsaXN0Lmhhc0l0ZW1PcHRpb24gPSBmYWxzZTtcbiAgbGlzdC5pbml0RGF0YShzb3VyY2UsIG51bGwsIGRpbVZhbHVlR2V0dGVyKTtcbiAgcmV0dXJuIGxpc3Q7XG59XG5cbmZ1bmN0aW9uIGlzTmVlZENvbXBsZXRlT3JkaW5hbERhdGEoc291cmNlKSB7XG4gIGlmIChzb3VyY2Uuc291cmNlRm9ybWF0ID09PSBTT1VSQ0VfRk9STUFUX09SSUdJTkFMKSB7XG4gICAgdmFyIHNhbXBsZUl0ZW0gPSBmaXJzdERhdGFOb3ROdWxsKHNvdXJjZS5kYXRhIHx8IFtdKTtcbiAgICByZXR1cm4gc2FtcGxlSXRlbSAhPSBudWxsICYmICF6clV0aWwuaXNBcnJheShnZXREYXRhSXRlbVZhbHVlKHNhbXBsZUl0ZW0pKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBmaXJzdERhdGFOb3ROdWxsKGRhdGEpIHtcbiAgdmFyIGkgPSAwO1xuXG4gIHdoaWxlIChpIDwgZGF0YS5sZW5ndGggJiYgZGF0YVtpXSA9PSBudWxsKSB7XG4gICAgaSsrO1xuICB9XG5cbiAgcmV0dXJuIGRhdGFbaV07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGNyZWF0ZUxpc3RGcm9tQXJyYXk7IiwiXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cblxuLyoqXG4gKiBBVVRPLUdFTkVSQVRFRCBGSUxFLiBETyBOT1QgTU9ESUZZLlxuICovXG5cbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBAZGVwcmVjYXRlZFxuICogVXNlIGBlY2hhcnRzL2RhdGEvaGVscGVyL2NyZWF0ZURpbWVuc2lvbnNgIGluc3RlYWQuXG4gKi9cbmltcG9ydCB7IGNyZWF0ZUhhc2hNYXAsIGVhY2gsIGlzU3RyaW5nLCBkZWZhdWx0cywgZXh0ZW5kLCBpc09iamVjdCwgY2xvbmUgfSBmcm9tICd6cmVuZGVyL2xpYi9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgbm9ybWFsaXplVG9BcnJheSB9IGZyb20gJy4uLy4uL3V0aWwvbW9kZWwnO1xuaW1wb3J0IHsgZ3Vlc3NPcmRpbmFsLCBCRV9PUkRJTkFMIH0gZnJvbSAnLi9zb3VyY2VIZWxwZXInO1xuaW1wb3J0IHsgY3JlYXRlU291cmNlRnJvbVNlcmllc0RhdGFPcHRpb24sIGlzU291cmNlSW5zdGFuY2UgfSBmcm9tICcuLi9Tb3VyY2UnO1xuaW1wb3J0IHsgVklTVUFMX0RJTUVOU0lPTlMgfSBmcm9tICcuLi8uLi91dGlsL3R5cGVzJztcbmltcG9ydCBEYXRhRGltZW5zaW9uSW5mbyBmcm9tICcuLi9EYXRhRGltZW5zaW9uSW5mbyc7XG4vKipcbiAqIEBzZWUge21vZHVsZTplY2hhcnRzL3Rlc3QvdXQvc3BlYy9kYXRhL2NvbXBsZXRlRGltZW5zaW9uc31cbiAqXG4gKiBUaGlzIG1ldGhvZCBidWlsZHMgdGhlIHJlbGF0aW9uc2hpcCBiZXR3ZWVuOlxuICogKyBcIndoYXQgdGhlIGNvb3JkIHN5cyBvciBzZXJpZXMgcmVxdWlyZXMgKHNlZSBgc3lzRGltc2ApXCIsXG4gKiArIFwid2hhdCB0aGUgdXNlciBkZWZpbmVzIChpbiBgZW5jb2RlYCBhbmQgYGRpbWVuc2lvbnNgLCBzZWUgYG9wdC5kaW1zRGVmYCBhbmQgYG9wdC5lbmNvZGVEZWZgKVwiXG4gKiArIFwid2hhdCB0aGUgZGF0YSBzb3VyY2UgcHJvdmlkcyAoc2VlIGBzb3VyY2VgKVwiLlxuICpcbiAqIFNvbWUgZ3Vlc3Mgc3RyYXRlZ3kgd2lsbCBiZSBhZGFwdGVkIGlmIHVzZXIgZG9lcyBub3QgZGVmaW5lIHNvbWV0aGluZy5cbiAqIElmIG5vICd2YWx1ZScgZGltZW5zaW9uIHNwZWNpZmllZCwgdGhlIGZpcnN0IG5vLW5hbWVkIGRpbWVuc2lvbiB3aWxsIGJlXG4gKiBuYW1lZCBhcyAndmFsdWUnLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkuPHN0cmluZz59IHN5c0RpbXMgTmVjZXNzYXJ5IGRpbWVuc2lvbnMsIGxpa2UgWyd4JywgJ3knXSwgd2hpY2hcbiAqICAgICAgcHJvdmlkZXMgbm90IG9ubHkgZGltIHRlbXBsYXRlLCBidXQgYWxzbyBkZWZhdWx0IG9yZGVyLlxuICogICAgICBwcm9wZXJ0aWVzOiAnbmFtZScsICd0eXBlJywgJ2Rpc3BsYXlOYW1lJy5cbiAqICAgICAgYG5hbWVgIG9mIGVhY2ggaXRlbSBwcm92aWRlcyBkZWZhdWx0IGNvb3JkIG5hbWUuXG4gKiAgICAgIFt7ZGltc0RlZjogW3N0cmluZ3xPYmplY3QsIC4uLl19LCAuLi5dIGRpbXNEZWYgb2Ygc3lzRGltIGl0ZW0gcHJvdmlkZXMgZGVmYXVsdCBkaW0gbmFtZSwgYW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3ZpZGUgZGltcyBjb3VudCB0aGF0IHRoZSBzeXNEaW0gcmVxdWlyZWQuXG4gKiAgICAgIFt7b3JkaW5hbE1ldGF9XSBjYW4gYmUgc3BlY2lmaWVkLlxuICogQHBhcmFtIHttb2R1bGU6ZWNoYXJ0cy9kYXRhL1NvdXJjZXxBcnJheXxPYmplY3R9IHNvdXJjZSBvciBkYXRhIChmb3IgY29tcGF0aWJhbCB3aXRoIHBlcnZpb3VzKVxuICogQHBhcmFtIHtPYmplY3R9IFtvcHRdXG4gKiBAcGFyYW0ge0FycmF5LjxPYmplY3R8c3RyaW5nPn0gW29wdC5kaW1zRGVmXSBvcHRpb24uc2VyaWVzLmRpbWVuc2lvbnMgVXNlciBkZWZpbmVkIGRpbWVuc2lvbnNcbiAqICAgICAgRm9yIGV4YW1wbGU6IFsnYXNkZicsIHtuYW1lLCB0eXBlfSwgLi4uXS5cbiAqIEBwYXJhbSB7T2JqZWN0fEhhc2hNYXB9IFtvcHQuZW5jb2RlRGVmXSBvcHRpb24uc2VyaWVzLmVuY29kZSB7eDogMiwgeTogWzMsIDFdLCB0b29sdGlwOiBbMSwgMl0sIGxhYmVsOiAzfVxuICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdC5lbmNvZGVEZWZhdWx0ZXJdIENhbGxlZCBpZiBubyBgb3B0LmVuY29kZURlZmAgZXhpc3RzLlxuICogICAgICBJZiBub3Qgc3BlY2lmaWVkLCBhdXRvIGZpbmQgdGhlIG5leHQgYXZhaWxhYmxlIGRhdGEgZGltLlxuICogICAgICBwYXJhbSBzb3VyY2Uge21vZHVsZTpkYXRhL1NvdXJjZX1cbiAqICAgICAgcGFyYW0gZGltQ291bnQge251bWJlcn1cbiAqICAgICAgcmV0dXJuIHtPYmplY3R9IGVuY29kZSBOZXZlciBiZSBgbnVsbC91bmRlZmluZWRgLlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHQuZ2VuZXJhdGVDb29yZF0gR2VuZXJhdGUgY29vcmQgZGltIHdpdGggdGhlIGdpdmVuIG5hbWUuXG4gKiAgICAgIElmIG5vdCBzcGVjaWZpZWQsIGV4dHJhIGRpbSBuYW1lcyB3aWxsIGJlOlxuICogICAgICAndmFsdWUnLCAndmFsdWUwJywgJ3ZhbHVlMScsIC4uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHQuZ2VuZXJhdGVDb29yZENvdW50XSBCeSBkZWZhdWx0LCB0aGUgZ2VuZXJhdGVkIGRpbSBuYW1lIGlzIGBnZW5lcmF0ZUNvb3JkYC5cbiAqICAgICAgSWYgYGdlbmVyYXRlQ29vcmRDb3VudGAgc3BlY2lmaWVkLCB0aGUgZ2VuZXJhdGVkIGRpbSBuYW1lcyB3aWxsIGJlOlxuICogICAgICBgZ2VuZXJhdGVDb29yZGAgKyAwLCBgZ2VuZXJhdGVDb29yZGAgKyAxLCAuLi5cbiAqICAgICAgY2FuIGJlIEluZmluaXR5LCBpbmRpY2F0ZSB0aGF0IHVzZSBhbGwgb2YgdGhlIHJlbWFpbiBjb2x1bW5zLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHQuZGltQ291bnRdIElmIG5vdCBzcGVjaWZpZWQsIGd1ZXNzIGJ5IHRoZSBmaXJzdCBkYXRhIGl0ZW0uXG4gKiBAcmV0dXJuIHtBcnJheS48bW9kdWxlOmRhdGEvRGF0YURpbWVuc2lvbkluZm8+fVxuICovXG5cbmZ1bmN0aW9uIGNvbXBsZXRlRGltZW5zaW9ucyhzeXNEaW1zLCBzb3VyY2UsIG9wdCkge1xuICBpZiAoIWlzU291cmNlSW5zdGFuY2Uoc291cmNlKSkge1xuICAgIHNvdXJjZSA9IGNyZWF0ZVNvdXJjZUZyb21TZXJpZXNEYXRhT3B0aW9uKHNvdXJjZSk7XG4gIH1cblxuICBvcHQgPSBvcHQgfHwge307XG4gIHN5c0RpbXMgPSAoc3lzRGltcyB8fCBbXSkuc2xpY2UoKTtcbiAgdmFyIGRpbXNEZWYgPSAob3B0LmRpbXNEZWYgfHwgW10pLnNsaWNlKCk7XG4gIHZhciBkYXRhRGltTmFtZU1hcCA9IGNyZWF0ZUhhc2hNYXAoKTtcbiAgdmFyIGNvb3JkRGltTmFtZU1hcCA9IGNyZWF0ZUhhc2hNYXAoKTsgLy8gbGV0IHZhbHVlQ2FuZGlkYXRlO1xuXG4gIHZhciByZXN1bHQgPSBbXTtcbiAgdmFyIGRpbUNvdW50ID0gZ2V0RGltQ291bnQoc291cmNlLCBzeXNEaW1zLCBkaW1zRGVmLCBvcHQuZGltQ291bnQpOyAvLyBBcHBseSB1c2VyIGRlZmluZWQgZGltcyAoYG5hbWVgIGFuZCBgdHlwZWApIGFuZCBpbml0IHJlc3VsdC5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGRpbUNvdW50OyBpKyspIHtcbiAgICB2YXIgZGltRGVmSXRlbVJhdyA9IGRpbXNEZWZbaV07XG4gICAgdmFyIGRpbURlZkl0ZW0gPSBkaW1zRGVmW2ldID0gZXh0ZW5kKHt9LCBpc09iamVjdChkaW1EZWZJdGVtUmF3KSA/IGRpbURlZkl0ZW1SYXcgOiB7XG4gICAgICBuYW1lOiBkaW1EZWZJdGVtUmF3XG4gICAgfSk7XG4gICAgdmFyIHVzZXJEaW1OYW1lID0gZGltRGVmSXRlbS5uYW1lO1xuICAgIHZhciByZXN1bHRJdGVtID0gcmVzdWx0W2ldID0gbmV3IERhdGFEaW1lbnNpb25JbmZvKCk7IC8vIE5hbWUgd2lsbCBiZSBhcHBsaWVkIGxhdGVyIGZvciBhdm9pZGluZyBkdXBsaWNhdGlvbi5cblxuICAgIGlmICh1c2VyRGltTmFtZSAhPSBudWxsICYmIGRhdGFEaW1OYW1lTWFwLmdldCh1c2VyRGltTmFtZSkgPT0gbnVsbCkge1xuICAgICAgLy8gT25seSBpZiBgc2VyaWVzLmRpbWVuc2lvbnNgIGlzIGRlZmluZWQgaW4gb3B0aW9uXG4gICAgICAvLyBkaXNwbGF5TmFtZSwgd2lsbCBiZSBzZXQsIGFuZCBkaW1lbnNpb24gd2lsbCBiZSBkaXBsYXllZCB2ZXJ0aWNhbGx5IGluXG4gICAgICAvLyB0b29sdGlwIGJ5IGRlZmF1bHQuXG4gICAgICByZXN1bHRJdGVtLm5hbWUgPSByZXN1bHRJdGVtLmRpc3BsYXlOYW1lID0gdXNlckRpbU5hbWU7XG4gICAgICBkYXRhRGltTmFtZU1hcC5zZXQodXNlckRpbU5hbWUsIGkpO1xuICAgIH1cblxuICAgIGRpbURlZkl0ZW0udHlwZSAhPSBudWxsICYmIChyZXN1bHRJdGVtLnR5cGUgPSBkaW1EZWZJdGVtLnR5cGUpO1xuICAgIGRpbURlZkl0ZW0uZGlzcGxheU5hbWUgIT0gbnVsbCAmJiAocmVzdWx0SXRlbS5kaXNwbGF5TmFtZSA9IGRpbURlZkl0ZW0uZGlzcGxheU5hbWUpO1xuICB9XG5cbiAgdmFyIGVuY29kZURlZiA9IG9wdC5lbmNvZGVEZWY7XG5cbiAgaWYgKCFlbmNvZGVEZWYgJiYgb3B0LmVuY29kZURlZmF1bHRlcikge1xuICAgIGVuY29kZURlZiA9IG9wdC5lbmNvZGVEZWZhdWx0ZXIoc291cmNlLCBkaW1Db3VudCk7XG4gIH1cblxuICB2YXIgZW5jb2RlRGVmTWFwID0gY3JlYXRlSGFzaE1hcChlbmNvZGVEZWYpOyAvLyBTZXQgYGNvb3JkRGltYCBhbmQgYGNvb3JkRGltSW5kZXhgIGJ5IGBlbmNvZGVEZWZNYXBgIGFuZCBub3JtYWxpemUgYGVuY29kZURlZk1hcGAuXG5cbiAgZW5jb2RlRGVmTWFwLmVhY2goZnVuY3Rpb24gKGRhdGFEaW1zUmF3LCBjb29yZERpbSkge1xuICAgIHZhciBkYXRhRGltcyA9IG5vcm1hbGl6ZVRvQXJyYXkoZGF0YURpbXNSYXcpLnNsaWNlKCk7IC8vIE5vdGU6IEl0IGlzIGFsbG93ZWQgdGhhdCBgZGF0YURpbXMubGVuZ3RoYCBpcyBgMGAsIGUuZy4sIG9wdGlvbnMgaXNcbiAgICAvLyBge2VuY29kZToge3g6IC0xLCB5OiAxfX1gLiBTaG91bGQgbm90IGZpbHRlciBhbnl0aGluZyBpblxuICAgIC8vIHRoaXMgY2FzZS5cblxuICAgIGlmIChkYXRhRGltcy5sZW5ndGggPT09IDEgJiYgIWlzU3RyaW5nKGRhdGFEaW1zWzBdKSAmJiBkYXRhRGltc1swXSA8IDApIHtcbiAgICAgIGVuY29kZURlZk1hcC5zZXQoY29vcmREaW0sIGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB2YXIgdmFsaWREYXRhRGltcyA9IGVuY29kZURlZk1hcC5zZXQoY29vcmREaW0sIFtdKTtcbiAgICBlYWNoKGRhdGFEaW1zLCBmdW5jdGlvbiAocmVzdWx0RGltSWR4T3JOYW1lLCBpZHgpIHtcbiAgICAgIC8vIFRoZSBpbnB1dCByZXN1bHREaW1JZHggY2FuIGJlIGRpbSBuYW1lIG9yIGluZGV4LlxuICAgICAgdmFyIHJlc3VsdERpbUlkeCA9IGlzU3RyaW5nKHJlc3VsdERpbUlkeE9yTmFtZSkgPyBkYXRhRGltTmFtZU1hcC5nZXQocmVzdWx0RGltSWR4T3JOYW1lKSA6IHJlc3VsdERpbUlkeE9yTmFtZTtcblxuICAgICAgaWYgKHJlc3VsdERpbUlkeCAhPSBudWxsICYmIHJlc3VsdERpbUlkeCA8IGRpbUNvdW50KSB7XG4gICAgICAgIHZhbGlkRGF0YURpbXNbaWR4XSA9IHJlc3VsdERpbUlkeDtcbiAgICAgICAgYXBwbHlEaW0ocmVzdWx0W3Jlc3VsdERpbUlkeF0sIGNvb3JkRGltLCBpZHgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTsgLy8gQXBwbHkgdGVtcGxldGVzIGFuZCBkZWZhdWx0IG9yZGVyIGZyb20gYHN5c0RpbXNgLlxuXG4gIHZhciBhdmFpbERpbUlkeCA9IDA7XG4gIGVhY2goc3lzRGltcywgZnVuY3Rpb24gKHN5c0RpbUl0ZW1SYXcpIHtcbiAgICB2YXIgY29vcmREaW07XG4gICAgdmFyIHN5c0RpbUl0ZW1EaW1zRGVmO1xuICAgIHZhciBzeXNEaW1JdGVtT3RoZXJEaW1zO1xuICAgIHZhciBzeXNEaW1JdGVtO1xuXG4gICAgaWYgKGlzU3RyaW5nKHN5c0RpbUl0ZW1SYXcpKSB7XG4gICAgICBjb29yZERpbSA9IHN5c0RpbUl0ZW1SYXc7XG4gICAgICBzeXNEaW1JdGVtID0ge307XG4gICAgfSBlbHNlIHtcbiAgICAgIHN5c0RpbUl0ZW0gPSBzeXNEaW1JdGVtUmF3O1xuICAgICAgY29vcmREaW0gPSBzeXNEaW1JdGVtLm5hbWU7XG4gICAgICB2YXIgb3JkaW5hbE1ldGEgPSBzeXNEaW1JdGVtLm9yZGluYWxNZXRhO1xuICAgICAgc3lzRGltSXRlbS5vcmRpbmFsTWV0YSA9IG51bGw7XG4gICAgICBzeXNEaW1JdGVtID0gY2xvbmUoc3lzRGltSXRlbSk7XG4gICAgICBzeXNEaW1JdGVtLm9yZGluYWxNZXRhID0gb3JkaW5hbE1ldGE7IC8vIGBjb29yZERpbUluZGV4YCBzaG91bGQgbm90IGJlIHNldCBkaXJlY3RseS5cblxuICAgICAgc3lzRGltSXRlbURpbXNEZWYgPSBzeXNEaW1JdGVtLmRpbXNEZWY7XG4gICAgICBzeXNEaW1JdGVtT3RoZXJEaW1zID0gc3lzRGltSXRlbS5vdGhlckRpbXM7XG4gICAgICBzeXNEaW1JdGVtLm5hbWUgPSBzeXNEaW1JdGVtLmNvb3JkRGltID0gc3lzRGltSXRlbS5jb29yZERpbUluZGV4ID0gc3lzRGltSXRlbS5kaW1zRGVmID0gc3lzRGltSXRlbS5vdGhlckRpbXMgPSBudWxsO1xuICAgIH1cblxuICAgIHZhciBkYXRhRGltcyA9IGVuY29kZURlZk1hcC5nZXQoY29vcmREaW0pOyAvLyBuZWdhdGl2ZSByZXN1bHREaW1JZHggbWVhbnMgbm8gbmVlZCB0byBtYXBwaW5nLlxuXG4gICAgaWYgKGRhdGFEaW1zID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRhdGFEaW1zID0gbm9ybWFsaXplVG9BcnJheShkYXRhRGltcyk7IC8vIGRpbWVuc2lvbnMgcHJvdmlkZXMgZGVmYXVsdCBkaW0gc2VxdWVuY2VzLlxuXG4gICAgaWYgKCFkYXRhRGltcy5sZW5ndGgpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgKHN5c0RpbUl0ZW1EaW1zRGVmICYmIHN5c0RpbUl0ZW1EaW1zRGVmLmxlbmd0aCB8fCAxKTsgaSsrKSB7XG4gICAgICAgIHdoaWxlIChhdmFpbERpbUlkeCA8IHJlc3VsdC5sZW5ndGggJiYgcmVzdWx0W2F2YWlsRGltSWR4XS5jb29yZERpbSAhPSBudWxsKSB7XG4gICAgICAgICAgYXZhaWxEaW1JZHgrKztcbiAgICAgICAgfVxuXG4gICAgICAgIGF2YWlsRGltSWR4IDwgcmVzdWx0Lmxlbmd0aCAmJiBkYXRhRGltcy5wdXNoKGF2YWlsRGltSWR4KyspO1xuICAgICAgfVxuICAgIH0gLy8gQXBwbHkgdGVtcGxhdGVzLlxuXG5cbiAgICBlYWNoKGRhdGFEaW1zLCBmdW5jdGlvbiAocmVzdWx0RGltSWR4LCBjb29yZERpbUluZGV4KSB7XG4gICAgICB2YXIgcmVzdWx0SXRlbSA9IHJlc3VsdFtyZXN1bHREaW1JZHhdO1xuICAgICAgYXBwbHlEaW0oZGVmYXVsdHMocmVzdWx0SXRlbSwgc3lzRGltSXRlbSksIGNvb3JkRGltLCBjb29yZERpbUluZGV4KTtcblxuICAgICAgaWYgKHJlc3VsdEl0ZW0ubmFtZSA9PSBudWxsICYmIHN5c0RpbUl0ZW1EaW1zRGVmKSB7XG4gICAgICAgIHZhciBzeXNEaW1JdGVtRGltc0RlZkl0ZW0gPSBzeXNEaW1JdGVtRGltc0RlZltjb29yZERpbUluZGV4XTtcbiAgICAgICAgIWlzT2JqZWN0KHN5c0RpbUl0ZW1EaW1zRGVmSXRlbSkgJiYgKHN5c0RpbUl0ZW1EaW1zRGVmSXRlbSA9IHtcbiAgICAgICAgICBuYW1lOiBzeXNEaW1JdGVtRGltc0RlZkl0ZW1cbiAgICAgICAgfSk7XG4gICAgICAgIHJlc3VsdEl0ZW0ubmFtZSA9IHJlc3VsdEl0ZW0uZGlzcGxheU5hbWUgPSBzeXNEaW1JdGVtRGltc0RlZkl0ZW0ubmFtZTtcbiAgICAgICAgcmVzdWx0SXRlbS5kZWZhdWx0VG9vbHRpcCA9IHN5c0RpbUl0ZW1EaW1zRGVmSXRlbS5kZWZhdWx0VG9vbHRpcDtcbiAgICAgIH0gLy8gRklYTUUgcmVmYWN0b3IsIGN1cnJlbnRseSBvbmx5IHVzZWQgaW4gY2FzZToge290aGVyRGltczoge3Rvb2x0aXA6IGZhbHNlfX1cblxuXG4gICAgICBzeXNEaW1JdGVtT3RoZXJEaW1zICYmIGRlZmF1bHRzKHJlc3VsdEl0ZW0ub3RoZXJEaW1zLCBzeXNEaW1JdGVtT3RoZXJEaW1zKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZnVuY3Rpb24gYXBwbHlEaW0ocmVzdWx0SXRlbSwgY29vcmREaW0sIGNvb3JkRGltSW5kZXgpIHtcbiAgICBpZiAoVklTVUFMX0RJTUVOU0lPTlMuZ2V0KGNvb3JkRGltKSAhPSBudWxsKSB7XG4gICAgICByZXN1bHRJdGVtLm90aGVyRGltc1tjb29yZERpbV0gPSBjb29yZERpbUluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHRJdGVtLmNvb3JkRGltID0gY29vcmREaW07XG4gICAgICByZXN1bHRJdGVtLmNvb3JkRGltSW5kZXggPSBjb29yZERpbUluZGV4O1xuICAgICAgY29vcmREaW1OYW1lTWFwLnNldChjb29yZERpbSwgdHJ1ZSk7XG4gICAgfVxuICB9IC8vIE1ha2Ugc3VyZSB0aGUgZmlyc3QgZXh0cmEgZGltIGlzICd2YWx1ZScuXG5cblxuICB2YXIgZ2VuZXJhdGVDb29yZCA9IG9wdC5nZW5lcmF0ZUNvb3JkO1xuICB2YXIgZ2VuZXJhdGVDb29yZENvdW50ID0gb3B0LmdlbmVyYXRlQ29vcmRDb3VudDtcbiAgdmFyIGZyb21aZXJvID0gZ2VuZXJhdGVDb29yZENvdW50ICE9IG51bGw7XG4gIGdlbmVyYXRlQ29vcmRDb3VudCA9IGdlbmVyYXRlQ29vcmQgPyBnZW5lcmF0ZUNvb3JkQ291bnQgfHwgMSA6IDA7XG4gIHZhciBleHRyYSA9IGdlbmVyYXRlQ29vcmQgfHwgJ3ZhbHVlJzsgLy8gU2V0IGRpbSBgbmFtZWAgYW5kIG90aGVyIGBjb29yZERpbWAgYW5kIG90aGVyIHByb3BzLlxuXG4gIGZvciAodmFyIHJlc3VsdERpbUlkeCA9IDA7IHJlc3VsdERpbUlkeCA8IGRpbUNvdW50OyByZXN1bHREaW1JZHgrKykge1xuICAgIHZhciByZXN1bHRJdGVtID0gcmVzdWx0W3Jlc3VsdERpbUlkeF0gPSByZXN1bHRbcmVzdWx0RGltSWR4XSB8fCBuZXcgRGF0YURpbWVuc2lvbkluZm8oKTtcbiAgICB2YXIgY29vcmREaW0gPSByZXN1bHRJdGVtLmNvb3JkRGltO1xuXG4gICAgaWYgKGNvb3JkRGltID09IG51bGwpIHtcbiAgICAgIHJlc3VsdEl0ZW0uY29vcmREaW0gPSBnZW5OYW1lKGV4dHJhLCBjb29yZERpbU5hbWVNYXAsIGZyb21aZXJvKTtcbiAgICAgIHJlc3VsdEl0ZW0uY29vcmREaW1JbmRleCA9IDA7XG5cbiAgICAgIGlmICghZ2VuZXJhdGVDb29yZCB8fCBnZW5lcmF0ZUNvb3JkQ291bnQgPD0gMCkge1xuICAgICAgICByZXN1bHRJdGVtLmlzRXh0cmFDb29yZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGdlbmVyYXRlQ29vcmRDb3VudC0tO1xuICAgIH1cblxuICAgIHJlc3VsdEl0ZW0ubmFtZSA9PSBudWxsICYmIChyZXN1bHRJdGVtLm5hbWUgPSBnZW5OYW1lKHJlc3VsdEl0ZW0uY29vcmREaW0sIGRhdGFEaW1OYW1lTWFwLCBmYWxzZSkpO1xuXG4gICAgaWYgKHJlc3VsdEl0ZW0udHlwZSA9PSBudWxsICYmIChndWVzc09yZGluYWwoc291cmNlLCByZXN1bHREaW1JZHgpID09PSBCRV9PUkRJTkFMLk11c3QgLy8gQ29uc2lkZXIgdGhlIGNhc2U6XG4gICAgLy8ge1xuICAgIC8vICAgIGRhdGFzZXQ6IHtzb3VyY2U6IFtcbiAgICAvLyAgICAgICAgWycyMDAxJywgMTIzXSxcbiAgICAvLyAgICAgICAgWycyMDAyJywgNDU2XSxcbiAgICAvLyAgICAgICAgLi4uXG4gICAgLy8gICAgICAgIFsnVGhlIG90aGVycycsIDk4N10sXG4gICAgLy8gICAgXX0sXG4gICAgLy8gICAgc2VyaWVzOiB7dHlwZTogJ3BpZSd9XG4gICAgLy8gfVxuICAgIC8vIFRoZSBmaXJzdCBjb2x1bSBzaG91bGQgYmV0dGVyIGJlIHRyZWF0ZWQgYXMgYSBcIm9yZGluYWxcIiBhbHRob3VnaCBpdFxuICAgIC8vIG1pZ2h0IG5vdCBhYmxlIHRvIGJlIGRldGVjdGVkIGFzIGFuIFwib3JkaW5hbFwiIGJ5IGBndWVzc09yZGluYWxgLlxuICAgIHx8IHJlc3VsdEl0ZW0uaXNFeHRyYUNvb3JkICYmIChyZXN1bHRJdGVtLm90aGVyRGltcy5pdGVtTmFtZSAhPSBudWxsIHx8IHJlc3VsdEl0ZW0ub3RoZXJEaW1zLnNlcmllc05hbWUgIT0gbnVsbCkpKSB7XG4gICAgICByZXN1bHRJdGVtLnR5cGUgPSAnb3JkaW5hbCc7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn0gLy8gPz8/IFRPRE9cbi8vIE9yaWdpbmFsbHkgZGV0ZWN0IGRpbUNvdW50IGJ5IGRhdGFbMF0uIFNob3VsZCB3ZVxuLy8gb3B0aW1pemUgaXQgdG8gb25seSBieSBzeXNEaW1zIGFuZCBkaW1lbnNpb25zIGFuZCBlbmNvZGUuXG4vLyBTbyBvbmx5IG5lY2Vzc2FyeSBkaW1zIHdpbGwgYmUgaW5pdGlhbGl6ZWQuXG4vLyBCdXRcbi8vICgxKSBjdXN0b20gc2VyaWVzIHNob3VsZCBiZSBjb25zaWRlcmVkLiB3aGVyZSBvdGhlciBkaW1zXG4vLyBtYXkgYmUgdmlzaXRlZC5cbi8vICgyKSBzb21ldGltZXMgdXNlciBuZWVkIHRvIGNhbGN1YWx0ZSBidWJibGUgc2l6ZSBvciB1c2UgdmlzdWFsTWFwXG4vLyBvbiBvdGhlciBkaW1lbnNpb25zIGJlc2lkZXMgY29vcmRTeXMgbmVlZGVkLlxuLy8gU28sIGRpbXMgdGhhdCBpcyBub3QgdXNlZCBieSBzeXN0ZW0sIHNob3VsZCBiZSBzaGFyZWQgaW4gc3RvcmFnZT9cblxuXG5mdW5jdGlvbiBnZXREaW1Db3VudChzb3VyY2UsIHN5c0RpbXMsIGRpbXNEZWYsIG9wdERpbUNvdW50KSB7XG4gIC8vIE5vdGUgdGhhdCB0aGUgcmVzdWx0IGRpbUNvdW50IHNob3VsZCBub3Qgc21hbGwgdGhhbiBjb2x1bW5zIGNvdW50XG4gIC8vIG9mIGRhdGEsIG90aGVyd2lzZSBgZGF0YURpbU5hbWVNYXBgIGNoZWNraW5nIHdpbGwgYmUgaW5jb3JyZWN0LlxuICB2YXIgZGltQ291bnQgPSBNYXRoLm1heChzb3VyY2UuZGltZW5zaW9uc0RldGVjdGVkQ291bnQgfHwgMSwgc3lzRGltcy5sZW5ndGgsIGRpbXNEZWYubGVuZ3RoLCBvcHREaW1Db3VudCB8fCAwKTtcbiAgZWFjaChzeXNEaW1zLCBmdW5jdGlvbiAoc3lzRGltSXRlbSkge1xuICAgIHZhciBzeXNEaW1JdGVtRGltc0RlZjtcblxuICAgIGlmIChpc09iamVjdChzeXNEaW1JdGVtKSAmJiAoc3lzRGltSXRlbURpbXNEZWYgPSBzeXNEaW1JdGVtLmRpbXNEZWYpKSB7XG4gICAgICBkaW1Db3VudCA9IE1hdGgubWF4KGRpbUNvdW50LCBzeXNEaW1JdGVtRGltc0RlZi5sZW5ndGgpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBkaW1Db3VudDtcbn1cblxuZnVuY3Rpb24gZ2VuTmFtZShuYW1lLCBtYXAsIGZyb21aZXJvKSB7XG4gIGlmIChmcm9tWmVybyB8fCBtYXAuZ2V0KG5hbWUpICE9IG51bGwpIHtcbiAgICB2YXIgaSA9IDA7XG5cbiAgICB3aGlsZSAobWFwLmdldChuYW1lICsgaSkgIT0gbnVsbCkge1xuICAgICAgaSsrO1xuICAgIH1cblxuICAgIG5hbWUgKz0gaTtcbiAgfVxuXG4gIG1hcC5zZXQobmFtZSwgdHJ1ZSk7XG4gIHJldHVybiBuYW1lO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjb21wbGV0ZURpbWVuc2lvbnM7IiwiXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cblxuLyoqXG4gKiBBVVRPLUdFTkVSQVRFRCBGSUxFLiBETyBOT1QgTU9ESUZZLlxuICovXG5cbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuLyoqXG4gKiBTdWJzdGl0dXRlIGBjb21wbGV0ZURpbWVuc2lvbnNgLlxuICogYGNvbXBsZXRlRGltZW5zaW9uc2AgaXMgdG8gYmUgZGVwcmVjYXRlZC5cbiAqL1xuaW1wb3J0IGNvbXBsZXRlRGltZW5zaW9ucyBmcm9tICcuL2NvbXBsZXRlRGltZW5zaW9ucyc7XG4vKipcbiAqIEBwYXJhbSBvcHQuY29vcmREaW1lbnNpb25zXG4gKiBAcGFyYW0gb3B0LmRpbWVuc2lvbnNEZWZpbmUgQnkgZGVmYXVsdCBgc291cmNlLmRpbWVuc2lvbnNEZWZpbmVgIE92ZXJ3cml0ZSBzb3VyY2UgZGVmaW5lLlxuICogQHBhcmFtIG9wdC5lbmNvZGVEZWZpbmUgQnkgZGVmYXVsdCBgc291cmNlLmVuY29kZURlZmluZWAgT3ZlcndyaXRlIHNvdXJjZSBkZWZpbmUuXG4gKiBAcGFyYW0gb3B0LmVuY29kZURlZmF1bHRlciBNYWtlIGRlZmF1bHQgZW5jb2RlIGlmIHVzZXIgbm90IHNwZWNpZmllZC5cbiAqL1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVEaW1lbnNpb25zKCAvLyBUT0RPOiBUWVBFIGNvbXBsZXRlRGltZW5zaW9ucyB0eXBlXG5zb3VyY2UsIG9wdCkge1xuICBvcHQgPSBvcHQgfHwge307XG4gIHJldHVybiBjb21wbGV0ZURpbWVuc2lvbnMob3B0LmNvb3JkRGltZW5zaW9ucyB8fCBbXSwgc291cmNlLCB7XG4gICAgLy8gRklYTUU6VFMgZGV0ZWN0IHdoZXRoZXIgc291cmNlIHRoZW4gY2FsbCBgLmRpbWVuc2lvbnNEZWZpbmVgIGFuZCBgLmVuY29kZURlZmluZWA/XG4gICAgZGltc0RlZjogb3B0LmRpbWVuc2lvbnNEZWZpbmUgfHwgc291cmNlLmRpbWVuc2lvbnNEZWZpbmUsXG4gICAgZW5jb2RlRGVmOiBvcHQuZW5jb2RlRGVmaW5lIHx8IHNvdXJjZS5lbmNvZGVEZWZpbmUsXG4gICAgZGltQ291bnQ6IG9wdC5kaW1lbnNpb25zQ291bnQsXG4gICAgZW5jb2RlRGVmYXVsdGVyOiBvcHQuZW5jb2RlRGVmYXVsdGVyLFxuICAgIGdlbmVyYXRlQ29vcmQ6IG9wdC5nZW5lcmF0ZUNvb3JkLFxuICAgIGdlbmVyYXRlQ29vcmRDb3VudDogb3B0LmdlbmVyYXRlQ29vcmRDb3VudFxuICB9KTtcbn0iLCJcbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuXG4vKipcbiAqIEFVVE8tR0VORVJBVEVEIEZJTEUuIERPIE5PVCBNT0RJRlkuXG4gKi9cblxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG4vKipcbiAqIEhlbHBlciBmb3IgbW9kZWwgcmVmZXJlbmNlcy5cbiAqIFRoZXJlIGFyZSBtYW55IG1hbm5lcnMgdG8gcmVmZXIgYXhpcy9jb29yZFN5cy5cbiAqL1xuLy8gVE9ET1xuLy8gbWVyZ2UgcmVsZXZhbnQgbG9naWMgdG8gdGhpcyBmaWxlP1xuLy8gY2hlY2s6IFwibW9kZWxIZWxwZXJcIiBvZiB0b29sdGlwIGFuZCBcIkJydXNoVGFyZ2V0TWFuYWdlclwiLlxuaW1wb3J0IHsgY3JlYXRlSGFzaE1hcCwgcmV0cmlldmUsIGVhY2ggfSBmcm9tICd6cmVuZGVyL2xpYi9jb3JlL3V0aWwnO1xuaW1wb3J0IHsgU0lOR0xFX1JFRkVSUklORyB9IGZyb20gJy4uL3V0aWwvbW9kZWwnO1xuLyoqXG4gKiBAY2xhc3NcbiAqIEZvciBleGFtcGxlOlxuICoge1xuICogICAgIGNvb3JkU3lzTmFtZTogJ2NhcnRlc2lhbjJkJyxcbiAqICAgICBjb29yZFN5c0RpbXM6IFsneCcsICd5JywgLi4uXSxcbiAqICAgICBheGlzTWFwOiBIYXNoTWFwKHtcbiAqICAgICAgICAgeDogeEF4aXNNb2RlbCxcbiAqICAgICAgICAgeTogeUF4aXNNb2RlbFxuICogICAgIH0pLFxuICogICAgIGNhdGVnb3J5QXhpc01hcDogSGFzaE1hcCh7XG4gKiAgICAgICAgIHg6IHhBeGlzTW9kZWwsXG4gKiAgICAgICAgIHk6IHVuZGVmaW5lZFxuICogICAgIH0pLFxuICogICAgIC8vIFRoZSBpbmRleCBvZiB0aGUgZmlyc3QgY2F0ZWdvcnkgYXhpcyBpbiBgY29vcmRTeXNEaW1zYC5cbiAqICAgICAvLyBgbnVsbC91bmRlZmluZWRgIG1lYW5zIG5vIGNhdGVnb3J5IGF4aXMgZXhpc3RzLlxuICogICAgIGZpcnN0Q2F0ZWdvcnlEaW1JbmRleDogMSxcbiAqICAgICAvLyBUbyByZXBsYWNlIHVzZXIgc3BlY2lmaWVkIGVuY29kZS5cbiAqIH1cbiAqL1xuXG52YXIgQ29vcmRTeXNJbmZvID1cbi8qKiBAY2xhc3MgKi9cbmZ1bmN0aW9uICgpIHtcbiAgZnVuY3Rpb24gQ29vcmRTeXNJbmZvKGNvb3JkU3lzTmFtZSkge1xuICAgIHRoaXMuY29vcmRTeXNEaW1zID0gW107XG4gICAgdGhpcy5heGlzTWFwID0gY3JlYXRlSGFzaE1hcCgpO1xuICAgIHRoaXMuY2F0ZWdvcnlBeGlzTWFwID0gY3JlYXRlSGFzaE1hcCgpO1xuICAgIHRoaXMuY29vcmRTeXNOYW1lID0gY29vcmRTeXNOYW1lO1xuICB9XG5cbiAgcmV0dXJuIENvb3JkU3lzSW5mbztcbn0oKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvb3JkU3lzSW5mb0J5U2VyaWVzKHNlcmllc01vZGVsKSB7XG4gIHZhciBjb29yZFN5c05hbWUgPSBzZXJpZXNNb2RlbC5nZXQoJ2Nvb3JkaW5hdGVTeXN0ZW0nKTtcbiAgdmFyIHJlc3VsdCA9IG5ldyBDb29yZFN5c0luZm8oY29vcmRTeXNOYW1lKTtcbiAgdmFyIGZldGNoID0gZmV0Y2hlcnNbY29vcmRTeXNOYW1lXTtcblxuICBpZiAoZmV0Y2gpIHtcbiAgICBmZXRjaChzZXJpZXNNb2RlbCwgcmVzdWx0LCByZXN1bHQuYXhpc01hcCwgcmVzdWx0LmNhdGVnb3J5QXhpc01hcCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxudmFyIGZldGNoZXJzID0ge1xuICBjYXJ0ZXNpYW4yZDogZnVuY3Rpb24gKHNlcmllc01vZGVsLCByZXN1bHQsIGF4aXNNYXAsIGNhdGVnb3J5QXhpc01hcCkge1xuICAgIHZhciB4QXhpc01vZGVsID0gc2VyaWVzTW9kZWwuZ2V0UmVmZXJyaW5nQ29tcG9uZW50cygneEF4aXMnLCBTSU5HTEVfUkVGRVJSSU5HKS5tb2RlbHNbMF07XG4gICAgdmFyIHlBeGlzTW9kZWwgPSBzZXJpZXNNb2RlbC5nZXRSZWZlcnJpbmdDb21wb25lbnRzKCd5QXhpcycsIFNJTkdMRV9SRUZFUlJJTkcpLm1vZGVsc1swXTtcblxuICAgIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgICBpZiAoIXhBeGlzTW9kZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd4QXhpcyBcIicgKyByZXRyaWV2ZShzZXJpZXNNb2RlbC5nZXQoJ3hBeGlzSW5kZXgnKSwgc2VyaWVzTW9kZWwuZ2V0KCd4QXhpc0lkJyksIDApICsgJ1wiIG5vdCBmb3VuZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIXlBeGlzTW9kZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCd5QXhpcyBcIicgKyByZXRyaWV2ZShzZXJpZXNNb2RlbC5nZXQoJ3hBeGlzSW5kZXgnKSwgc2VyaWVzTW9kZWwuZ2V0KCd5QXhpc0lkJyksIDApICsgJ1wiIG5vdCBmb3VuZCcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJlc3VsdC5jb29yZFN5c0RpbXMgPSBbJ3gnLCAneSddO1xuICAgIGF4aXNNYXAuc2V0KCd4JywgeEF4aXNNb2RlbCk7XG4gICAgYXhpc01hcC5zZXQoJ3knLCB5QXhpc01vZGVsKTtcblxuICAgIGlmIChpc0NhdGVnb3J5KHhBeGlzTW9kZWwpKSB7XG4gICAgICBjYXRlZ29yeUF4aXNNYXAuc2V0KCd4JywgeEF4aXNNb2RlbCk7XG4gICAgICByZXN1bHQuZmlyc3RDYXRlZ29yeURpbUluZGV4ID0gMDtcbiAgICB9XG5cbiAgICBpZiAoaXNDYXRlZ29yeSh5QXhpc01vZGVsKSkge1xuICAgICAgY2F0ZWdvcnlBeGlzTWFwLnNldCgneScsIHlBeGlzTW9kZWwpO1xuICAgICAgcmVzdWx0LmZpcnN0Q2F0ZWdvcnlEaW1JbmRleCA9PSBudWxsICYmIChyZXN1bHQuZmlyc3RDYXRlZ29yeURpbUluZGV4ID0gMSk7XG4gICAgfVxuICB9LFxuICBzaW5nbGVBeGlzOiBmdW5jdGlvbiAoc2VyaWVzTW9kZWwsIHJlc3VsdCwgYXhpc01hcCwgY2F0ZWdvcnlBeGlzTWFwKSB7XG4gICAgdmFyIHNpbmdsZUF4aXNNb2RlbCA9IHNlcmllc01vZGVsLmdldFJlZmVycmluZ0NvbXBvbmVudHMoJ3NpbmdsZUF4aXMnLCBTSU5HTEVfUkVGRVJSSU5HKS5tb2RlbHNbMF07XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCFzaW5nbGVBeGlzTW9kZWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzaW5nbGVBeGlzIHNob3VsZCBiZSBzcGVjaWZpZWQuJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzdWx0LmNvb3JkU3lzRGltcyA9IFsnc2luZ2xlJ107XG4gICAgYXhpc01hcC5zZXQoJ3NpbmdsZScsIHNpbmdsZUF4aXNNb2RlbCk7XG5cbiAgICBpZiAoaXNDYXRlZ29yeShzaW5nbGVBeGlzTW9kZWwpKSB7XG4gICAgICBjYXRlZ29yeUF4aXNNYXAuc2V0KCdzaW5nbGUnLCBzaW5nbGVBeGlzTW9kZWwpO1xuICAgICAgcmVzdWx0LmZpcnN0Q2F0ZWdvcnlEaW1JbmRleCA9IDA7XG4gICAgfVxuICB9LFxuICBwb2xhcjogZnVuY3Rpb24gKHNlcmllc01vZGVsLCByZXN1bHQsIGF4aXNNYXAsIGNhdGVnb3J5QXhpc01hcCkge1xuICAgIHZhciBwb2xhck1vZGVsID0gc2VyaWVzTW9kZWwuZ2V0UmVmZXJyaW5nQ29tcG9uZW50cygncG9sYXInLCBTSU5HTEVfUkVGRVJSSU5HKS5tb2RlbHNbMF07XG4gICAgdmFyIHJhZGl1c0F4aXNNb2RlbCA9IHBvbGFyTW9kZWwuZmluZEF4aXNNb2RlbCgncmFkaXVzQXhpcycpO1xuICAgIHZhciBhbmdsZUF4aXNNb2RlbCA9IHBvbGFyTW9kZWwuZmluZEF4aXNNb2RlbCgnYW5nbGVBeGlzJyk7XG5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICAgICAgaWYgKCFhbmdsZUF4aXNNb2RlbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FuZ2xlQXhpcyBvcHRpb24gbm90IGZvdW5kJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICghcmFkaXVzQXhpc01vZGVsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncmFkaXVzQXhpcyBvcHRpb24gbm90IGZvdW5kJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmVzdWx0LmNvb3JkU3lzRGltcyA9IFsncmFkaXVzJywgJ2FuZ2xlJ107XG4gICAgYXhpc01hcC5zZXQoJ3JhZGl1cycsIHJhZGl1c0F4aXNNb2RlbCk7XG4gICAgYXhpc01hcC5zZXQoJ2FuZ2xlJywgYW5nbGVBeGlzTW9kZWwpO1xuXG4gICAgaWYgKGlzQ2F0ZWdvcnkocmFkaXVzQXhpc01vZGVsKSkge1xuICAgICAgY2F0ZWdvcnlBeGlzTWFwLnNldCgncmFkaXVzJywgcmFkaXVzQXhpc01vZGVsKTtcbiAgICAgIHJlc3VsdC5maXJzdENhdGVnb3J5RGltSW5kZXggPSAwO1xuICAgIH1cblxuICAgIGlmIChpc0NhdGVnb3J5KGFuZ2xlQXhpc01vZGVsKSkge1xuICAgICAgY2F0ZWdvcnlBeGlzTWFwLnNldCgnYW5nbGUnLCBhbmdsZUF4aXNNb2RlbCk7XG4gICAgICByZXN1bHQuZmlyc3RDYXRlZ29yeURpbUluZGV4ID09IG51bGwgJiYgKHJlc3VsdC5maXJzdENhdGVnb3J5RGltSW5kZXggPSAxKTtcbiAgICB9XG4gIH0sXG4gIGdlbzogZnVuY3Rpb24gKHNlcmllc01vZGVsLCByZXN1bHQsIGF4aXNNYXAsIGNhdGVnb3J5QXhpc01hcCkge1xuICAgIHJlc3VsdC5jb29yZFN5c0RpbXMgPSBbJ2xuZycsICdsYXQnXTtcbiAgfSxcbiAgcGFyYWxsZWw6IGZ1bmN0aW9uIChzZXJpZXNNb2RlbCwgcmVzdWx0LCBheGlzTWFwLCBjYXRlZ29yeUF4aXNNYXApIHtcbiAgICB2YXIgZWNNb2RlbCA9IHNlcmllc01vZGVsLmVjTW9kZWw7XG4gICAgdmFyIHBhcmFsbGVsTW9kZWwgPSBlY01vZGVsLmdldENvbXBvbmVudCgncGFyYWxsZWwnLCBzZXJpZXNNb2RlbC5nZXQoJ3BhcmFsbGVsSW5kZXgnKSk7XG4gICAgdmFyIGNvb3JkU3lzRGltcyA9IHJlc3VsdC5jb29yZFN5c0RpbXMgPSBwYXJhbGxlbE1vZGVsLmRpbWVuc2lvbnMuc2xpY2UoKTtcbiAgICBlYWNoKHBhcmFsbGVsTW9kZWwucGFyYWxsZWxBeGlzSW5kZXgsIGZ1bmN0aW9uIChheGlzSW5kZXgsIGluZGV4KSB7XG4gICAgICB2YXIgYXhpc01vZGVsID0gZWNNb2RlbC5nZXRDb21wb25lbnQoJ3BhcmFsbGVsQXhpcycsIGF4aXNJbmRleCk7XG4gICAgICB2YXIgYXhpc0RpbSA9IGNvb3JkU3lzRGltc1tpbmRleF07XG4gICAgICBheGlzTWFwLnNldChheGlzRGltLCBheGlzTW9kZWwpO1xuXG4gICAgICBpZiAoaXNDYXRlZ29yeShheGlzTW9kZWwpKSB7XG4gICAgICAgIGNhdGVnb3J5QXhpc01hcC5zZXQoYXhpc0RpbSwgYXhpc01vZGVsKTtcblxuICAgICAgICBpZiAocmVzdWx0LmZpcnN0Q2F0ZWdvcnlEaW1JbmRleCA9PSBudWxsKSB7XG4gICAgICAgICAgcmVzdWx0LmZpcnN0Q2F0ZWdvcnlEaW1JbmRleCA9IGluZGV4O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGlzQ2F0ZWdvcnkoYXhpc01vZGVsKSB7XG4gIHJldHVybiBheGlzTW9kZWwuZ2V0KCd0eXBlJykgPT09ICdjYXRlZ29yeSc7XG59Il0sInNvdXJjZVJvb3QiOiIifQ==