(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_echarts_core_js"],{

/***/ "./node_modules/echarts/core.js":
/*!**************************************!*\
  !*** ./node_modules/echarts/core.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Axis": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.Axis),
/* harmony export */   "ChartView": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.ChartView),
/* harmony export */   "ComponentModel": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.ComponentModel),
/* harmony export */   "ComponentView": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.ComponentView),
/* harmony export */   "List": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.List),
/* harmony export */   "Model": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.Model),
/* harmony export */   "PRIORITY": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.PRIORITY),
/* harmony export */   "SeriesModel": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.SeriesModel),
/* harmony export */   "color": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.color),
/* harmony export */   "connect": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.connect),
/* harmony export */   "dataTool": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.dataTool),
/* harmony export */   "dependencies": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.dependencies),
/* harmony export */   "disConnect": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.disConnect),
/* harmony export */   "disconnect": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.disconnect),
/* harmony export */   "dispose": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.dispose),
/* harmony export */   "env": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.env),
/* harmony export */   "extendChartView": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.extendChartView),
/* harmony export */   "extendComponentModel": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.extendComponentModel),
/* harmony export */   "extendComponentView": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.extendComponentView),
/* harmony export */   "extendSeriesModel": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.extendSeriesModel),
/* harmony export */   "format": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.format),
/* harmony export */   "getCoordinateSystemDimensions": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.getCoordinateSystemDimensions),
/* harmony export */   "getInstanceByDom": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.getInstanceByDom),
/* harmony export */   "getInstanceById": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.getInstanceById),
/* harmony export */   "getMap": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.getMap),
/* harmony export */   "graphic": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.graphic),
/* harmony export */   "helper": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.helper),
/* harmony export */   "init": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.init),
/* harmony export */   "innerDrawElementOnCanvas": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.innerDrawElementOnCanvas),
/* harmony export */   "matrix": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.matrix),
/* harmony export */   "number": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.number),
/* harmony export */   "parseGeoJSON": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.parseGeoJSON),
/* harmony export */   "parseGeoJson": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.parseGeoJson),
/* harmony export */   "registerAction": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerAction),
/* harmony export */   "registerCoordinateSystem": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerCoordinateSystem),
/* harmony export */   "registerLayout": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerLayout),
/* harmony export */   "registerLoading": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerLoading),
/* harmony export */   "registerLocale": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerLocale),
/* harmony export */   "registerMap": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerMap),
/* harmony export */   "registerPostInit": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerPostInit),
/* harmony export */   "registerPostUpdate": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerPostUpdate),
/* harmony export */   "registerPreprocessor": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerPreprocessor),
/* harmony export */   "registerProcessor": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerProcessor),
/* harmony export */   "registerTheme": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerTheme),
/* harmony export */   "registerTransform": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerTransform),
/* harmony export */   "registerVisual": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.registerVisual),
/* harmony export */   "setCanvasCreator": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.setCanvasCreator),
/* harmony export */   "throttle": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.throttle),
/* harmony export */   "time": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.time),
/* harmony export */   "use": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.use),
/* harmony export */   "util": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.util),
/* harmony export */   "vector": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.vector),
/* harmony export */   "version": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.version),
/* harmony export */   "zrUtil": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.zrUtil),
/* harmony export */   "zrender": () => (/* reexport safe */ _lib_export_core__WEBPACK_IMPORTED_MODULE_0__.zrender)
/* harmony export */ });
/* harmony import */ var _lib_export_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/export/core */ "./node_modules/echarts/lib/export/core.js");
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



/***/ }),

/***/ "./node_modules/echarts/lib/export/api.js":
/*!************************************************!*\
  !*** ./node_modules/echarts/lib/export/api.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "zrender": () => (/* reexport module object */ zrender_lib_zrender__WEBPACK_IMPORTED_MODULE_0__),
/* harmony export */   "matrix": () => (/* reexport module object */ zrender_lib_core_matrix__WEBPACK_IMPORTED_MODULE_1__),
/* harmony export */   "vector": () => (/* reexport module object */ zrender_lib_core_vector__WEBPACK_IMPORTED_MODULE_2__),
/* harmony export */   "zrUtil": () => (/* reexport module object */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_3__),
/* harmony export */   "color": () => (/* reexport module object */ zrender_lib_tool_color__WEBPACK_IMPORTED_MODULE_4__),
/* harmony export */   "throttle": () => (/* reexport safe */ _util_throttle__WEBPACK_IMPORTED_MODULE_5__.throttle),
/* harmony export */   "helper": () => (/* reexport module object */ _api_helper__WEBPACK_IMPORTED_MODULE_6__),
/* harmony export */   "use": () => (/* reexport safe */ _extension__WEBPACK_IMPORTED_MODULE_7__.use),
/* harmony export */   "parseGeoJSON": () => (/* reexport safe */ _coord_geo_parseGeoJson__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "parseGeoJson": () => (/* reexport safe */ _coord_geo_parseGeoJson__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "number": () => (/* reexport module object */ _api_number__WEBPACK_IMPORTED_MODULE_9__),
/* harmony export */   "time": () => (/* reexport module object */ _api_time__WEBPACK_IMPORTED_MODULE_10__),
/* harmony export */   "graphic": () => (/* reexport module object */ _api_graphic__WEBPACK_IMPORTED_MODULE_11__),
/* harmony export */   "format": () => (/* reexport module object */ _api_format__WEBPACK_IMPORTED_MODULE_12__),
/* harmony export */   "util": () => (/* reexport module object */ _api_util__WEBPACK_IMPORTED_MODULE_13__),
/* harmony export */   "env": () => (/* reexport safe */ zrender_lib_core_env__WEBPACK_IMPORTED_MODULE_14__.default),
/* harmony export */   "List": () => (/* reexport safe */ _data_List__WEBPACK_IMPORTED_MODULE_15__.default),
/* harmony export */   "Model": () => (/* reexport safe */ _model_Model__WEBPACK_IMPORTED_MODULE_16__.default),
/* harmony export */   "Axis": () => (/* reexport safe */ _coord_Axis__WEBPACK_IMPORTED_MODULE_17__.default),
/* harmony export */   "ComponentModel": () => (/* reexport safe */ _model_Component__WEBPACK_IMPORTED_MODULE_18__.default),
/* harmony export */   "ComponentView": () => (/* reexport safe */ _view_Component__WEBPACK_IMPORTED_MODULE_19__.default),
/* harmony export */   "SeriesModel": () => (/* reexport safe */ _model_Series__WEBPACK_IMPORTED_MODULE_20__.default),
/* harmony export */   "ChartView": () => (/* reexport safe */ _view_Chart__WEBPACK_IMPORTED_MODULE_21__.default),
/* harmony export */   "innerDrawElementOnCanvas": () => (/* reexport safe */ zrender_lib_canvas_graphic__WEBPACK_IMPORTED_MODULE_22__.brushSingle),
/* harmony export */   "extendComponentModel": () => (/* binding */ extendComponentModel),
/* harmony export */   "extendComponentView": () => (/* binding */ extendComponentView),
/* harmony export */   "extendSeriesModel": () => (/* binding */ extendSeriesModel),
/* harmony export */   "extendChartView": () => (/* binding */ extendChartView)
/* harmony export */ });
/* harmony import */ var _model_Component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../model/Component */ "./node_modules/echarts/lib/model/Component.js");
/* harmony import */ var _view_Component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../view/Component */ "./node_modules/echarts/lib/view/Component.js");
/* harmony import */ var _model_Series__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../model/Series */ "./node_modules/echarts/lib/model/Series.js");
/* harmony import */ var _view_Chart__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../view/Chart */ "./node_modules/echarts/lib/view/Chart.js");
/* harmony import */ var zrender_lib_zrender__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zrender/lib/zrender */ "./node_modules/zrender/lib/zrender.js");
/* harmony import */ var zrender_lib_core_matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! zrender/lib/core/matrix */ "./node_modules/zrender/lib/core/matrix.js");
/* harmony import */ var zrender_lib_core_vector__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! zrender/lib/core/vector */ "./node_modules/zrender/lib/core/vector.js");
/* harmony import */ var zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var zrender_lib_tool_color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! zrender/lib/tool/color */ "./node_modules/zrender/lib/tool/color.js");
/* harmony import */ var _util_throttle__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../util/throttle */ "./node_modules/echarts/lib/util/throttle.js");
/* harmony import */ var _api_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./api/helper */ "./node_modules/echarts/lib/export/api/helper.js");
/* harmony import */ var _extension__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../extension */ "./node_modules/echarts/lib/extension.js");
/* harmony import */ var _coord_geo_parseGeoJson__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../coord/geo/parseGeoJson */ "./node_modules/echarts/lib/coord/geo/parseGeoJson.js");
/* harmony import */ var _api_number__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./api/number */ "./node_modules/echarts/lib/export/api/number.js");
/* harmony import */ var _api_time__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./api/time */ "./node_modules/echarts/lib/export/api/time.js");
/* harmony import */ var _api_graphic__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./api/graphic */ "./node_modules/echarts/lib/export/api/graphic.js");
/* harmony import */ var _api_format__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./api/format */ "./node_modules/echarts/lib/export/api/format.js");
/* harmony import */ var _api_util__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./api/util */ "./node_modules/echarts/lib/export/api/util.js");
/* harmony import */ var zrender_lib_core_env__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! zrender/lib/core/env */ "./node_modules/zrender/lib/core/env.js");
/* harmony import */ var _data_List__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../data/List */ "./node_modules/echarts/lib/data/List.js");
/* harmony import */ var _model_Model__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../model/Model */ "./node_modules/echarts/lib/model/Model.js");
/* harmony import */ var _coord_Axis__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../coord/Axis */ "./node_modules/echarts/lib/coord/Axis.js");
/* harmony import */ var zrender_lib_canvas_graphic__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! zrender/lib/canvas/graphic */ "./node_modules/zrender/lib/canvas/graphic.js");

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
// These APIs are for more advanced usages
// For example extend charts and components, creating graphic elements, formatting.

















 //////////////// Helper Methods /////////////////////













 //////////////// Export for Exension Usage ////////////////




 // Only for GL

 //////////////// Deprecated Extension Methods ////////////////
// Should use `ComponentModel.extend` or `class XXXX extend ComponentModel` to create class.
// Then use `registerComponentModel` in `install` parameter when `use` this extension. For example:
// class Bar3DModel extends ComponentModel {}
// export function install(registers) { regsiters.registerComponentModel(Bar3DModel); }
// echarts.use(install);

function extendComponentModel(proto) {
  var Model = _model_Component__WEBPACK_IMPORTED_MODULE_18__.default.extend(proto);
  _model_Component__WEBPACK_IMPORTED_MODULE_18__.default.registerClass(Model);
  return Model;
}
function extendComponentView(proto) {
  var View = _view_Component__WEBPACK_IMPORTED_MODULE_19__.default.extend(proto);
  _view_Component__WEBPACK_IMPORTED_MODULE_19__.default.registerClass(View);
  return View;
}
function extendSeriesModel(proto) {
  var Model = _model_Series__WEBPACK_IMPORTED_MODULE_20__.default.extend(proto);
  _model_Series__WEBPACK_IMPORTED_MODULE_20__.default.registerClass(Model);
  return Model;
}
function extendChartView(proto) {
  var View = _view_Chart__WEBPACK_IMPORTED_MODULE_21__.default.extend(proto);
  _view_Chart__WEBPACK_IMPORTED_MODULE_21__.default.registerClass(View);
  return View;
}

/***/ }),

/***/ "./node_modules/echarts/lib/export/api/format.js":
/*!*******************************************************!*\
  !*** ./node_modules/echarts/lib/export/api/format.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addCommas": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_0__.addCommas),
/* harmony export */   "toCamelCase": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_0__.toCamelCase),
/* harmony export */   "normalizeCssArray": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_0__.normalizeCssArray),
/* harmony export */   "encodeHTML": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_0__.encodeHTML),
/* harmony export */   "formatTpl": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_0__.formatTpl),
/* harmony export */   "getTooltipMarker": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_0__.getTooltipMarker),
/* harmony export */   "formatTime": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_0__.formatTime),
/* harmony export */   "capitalFirst": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_0__.capitalFirst),
/* harmony export */   "truncateText": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_1__.truncateText),
/* harmony export */   "getTextRect": () => (/* reexport safe */ _util_format__WEBPACK_IMPORTED_MODULE_2__.getTextRect)
/* harmony export */ });
/* harmony import */ var _util_format__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/format */ "./node_modules/echarts/lib/util/format.js");
/* harmony import */ var _util_format__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/format */ "./node_modules/zrender/lib/graphic/helper/parseText.js");
/* harmony import */ var _util_format__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/format */ "./node_modules/echarts/lib/legacy/getTextRect.js");

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


/***/ }),

/***/ "./node_modules/echarts/lib/export/api/graphic.js":
/*!********************************************************!*\
  !*** ./node_modules/echarts/lib/export/api/graphic.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "extendShape": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.extendShape),
/* harmony export */   "extendPath": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.extendPath),
/* harmony export */   "makePath": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.makePath),
/* harmony export */   "makeImage": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.makeImage),
/* harmony export */   "mergePath": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.mergePath),
/* harmony export */   "resizePath": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.resizePath),
/* harmony export */   "createIcon": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.createIcon),
/* harmony export */   "updateProps": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.updateProps),
/* harmony export */   "initProps": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.initProps),
/* harmony export */   "getTransform": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.getTransform),
/* harmony export */   "clipPointsByRect": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.clipPointsByRect),
/* harmony export */   "clipRectByRect": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.clipRectByRect),
/* harmony export */   "registerShape": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.registerShape),
/* harmony export */   "getShapeClass": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_0__.getShapeClass),
/* harmony export */   "Group": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_1__.default),
/* harmony export */   "Image": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "Text": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_3__.default),
/* harmony export */   "Circle": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_4__.default),
/* harmony export */   "Ellipse": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_5__.default),
/* harmony export */   "Sector": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_6__.default),
/* harmony export */   "Ring": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_7__.default),
/* harmony export */   "Polygon": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_8__.default),
/* harmony export */   "Polyline": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_9__.default),
/* harmony export */   "Rect": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_10__.default),
/* harmony export */   "Line": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_11__.default),
/* harmony export */   "BezierCurve": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_12__.default),
/* harmony export */   "Arc": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_13__.default),
/* harmony export */   "IncrementalDisplayable": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_14__.default),
/* harmony export */   "CompoundPath": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_15__.default),
/* harmony export */   "LinearGradient": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_16__.default),
/* harmony export */   "RadialGradient": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_17__.default),
/* harmony export */   "BoundingRect": () => (/* reexport safe */ _util_graphic__WEBPACK_IMPORTED_MODULE_18__.default)
/* harmony export */ });
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/echarts/lib/util/graphic.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/Group.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/Image.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/Text.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/Circle.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/Ellipse.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/Sector.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/Ring.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/Polygon.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/Polyline.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/Rect.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/Line.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/BezierCurve.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/shape/Arc.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/IncrementalDisplayable.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/CompoundPath.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/LinearGradient.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/graphic/RadialGradient.js");
/* harmony import */ var _util_graphic__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../util/graphic */ "./node_modules/zrender/lib/core/BoundingRect.js");

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


/***/ }),

/***/ "./node_modules/echarts/lib/export/api/helper.js":
/*!*******************************************************!*\
  !*** ./node_modules/echarts/lib/export/api/helper.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createList": () => (/* binding */ createList),
/* harmony export */   "getLayoutRect": () => (/* reexport safe */ _util_layout__WEBPACK_IMPORTED_MODULE_1__.getLayoutRect),
/* harmony export */   "createDimensions": () => (/* reexport safe */ _data_helper_createDimensions__WEBPACK_IMPORTED_MODULE_2__.default),
/* harmony export */   "dataStack": () => (/* binding */ dataStack),
/* harmony export */   "createSymbol": () => (/* reexport safe */ _util_symbol__WEBPACK_IMPORTED_MODULE_4__.createSymbol),
/* harmony export */   "createScale": () => (/* binding */ createScale),
/* harmony export */   "mixinAxisModelCommonMethods": () => (/* binding */ mixinAxisModelCommonMethods),
/* harmony export */   "getECData": () => (/* reexport safe */ _util_innerStore__WEBPACK_IMPORTED_MODULE_9__.getECData),
/* harmony export */   "enableHoverEmphasis": () => (/* reexport safe */ _util_states__WEBPACK_IMPORTED_MODULE_10__.enableHoverEmphasis),
/* harmony export */   "createTextStyle": () => (/* binding */ createTextStyle)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _chart_helper_createListFromArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../chart/helper/createListFromArray */ "./node_modules/echarts/lib/chart/helper/createListFromArray.js");
/* harmony import */ var _coord_axisHelper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../coord/axisHelper */ "./node_modules/echarts/lib/coord/axisHelper.js");
/* harmony import */ var _coord_axisModelCommonMixin__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../coord/axisModelCommonMixin */ "./node_modules/echarts/lib/coord/axisModelCommonMixin.js");
/* harmony import */ var _model_Model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../model/Model */ "./node_modules/echarts/lib/model/Model.js");
/* harmony import */ var _util_layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/layout */ "./node_modules/echarts/lib/util/layout.js");
/* harmony import */ var _data_helper_dataStackHelper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../data/helper/dataStackHelper */ "./node_modules/echarts/lib/data/helper/dataStackHelper.js");
/* harmony import */ var _util_innerStore__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../util/innerStore */ "./node_modules/echarts/lib/util/innerStore.js");
/* harmony import */ var _label_labelStyle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../label/labelStyle */ "./node_modules/echarts/lib/label/labelStyle.js");
/* harmony import */ var _data_helper_createDimensions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../data/helper/createDimensions */ "./node_modules/echarts/lib/data/helper/createDimensions.js");
/* harmony import */ var _util_symbol__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../util/symbol */ "./node_modules/echarts/lib/util/symbol.js");
/* harmony import */ var _util_states__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../util/states */ "./node_modules/echarts/lib/util/states.js");

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
 * This module exposes helper functions for developing extensions.
 */

 // import createGraphFromNodeEdge from './chart/helper/createGraphFromNodeEdge';








/**
 * Create a muti dimension List structure from seriesModel.
 */

function createList(seriesModel) {
  return (0,_chart_helper_createListFromArray__WEBPACK_IMPORTED_MODULE_0__.default)(seriesModel.getSource(), seriesModel);
} // export function createGraph(seriesModel) {
//     let nodes = seriesModel.get('data');
//     let links = seriesModel.get('links');
//     return createGraphFromNodeEdge(nodes, links, seriesModel);
// }



var dataStack = {
  isDimensionStacked: _data_helper_dataStackHelper__WEBPACK_IMPORTED_MODULE_3__.isDimensionStacked,
  enableDataStack: _data_helper_dataStackHelper__WEBPACK_IMPORTED_MODULE_3__.enableDataStack,
  getStackedDimension: _data_helper_dataStackHelper__WEBPACK_IMPORTED_MODULE_3__.getStackedDimension
};
/**
 * Create a symbol element with given symbol configuration: shape, x, y, width, height, color
 * @param {string} symbolDesc
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {string} color
 */


/**
 * Create scale
 * @param {Array.<number>} dataExtent
 * @param {Object|module:echarts/Model} option If `optoin.type`
 *        is secified, it can only be `'value'` currently.
 */

function createScale(dataExtent, option) {
  var axisModel = option;

  if (!(option instanceof _model_Model__WEBPACK_IMPORTED_MODULE_5__.default)) {
    axisModel = new _model_Model__WEBPACK_IMPORTED_MODULE_5__.default(option); // FIXME
    // Currently AxisModelCommonMixin has nothing to do with the
    // the requirements of `axisHelper.createScaleByModel`. For
    // example the method `getCategories` and `getOrdinalMeta`
    // are required for `'category'` axis, and ecModel are required
    // for `'time'` axis. But occationally echarts-gl happened
    // to only use `'value'` axis.
    // zrUtil.mixin(axisModel, AxisModelCommonMixin);
  }

  var scale = _coord_axisHelper__WEBPACK_IMPORTED_MODULE_6__.createScaleByModel(axisModel);
  scale.setExtent(dataExtent[0], dataExtent[1]);
  _coord_axisHelper__WEBPACK_IMPORTED_MODULE_6__.niceScaleExtent(scale, axisModel);
  return scale;
}
/**
 * Mixin common methods to axis model,
 *
 * Inlcude methods
 * `getFormattedLabels() => Array.<string>`
 * `getCategories() => Array.<string>`
 * `getMin(origin: boolean) => number`
 * `getMax(origin: boolean) => number`
 * `getNeedCrossZero() => boolean`
 */

function mixinAxisModelCommonMethods(Model) {
  zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_7__.mixin(Model, _coord_axisModelCommonMixin__WEBPACK_IMPORTED_MODULE_8__.AxisModelCommonMixin);
}


function createTextStyle(textStyleModel, opts) {
  opts = opts || {};
  return (0,_label_labelStyle__WEBPACK_IMPORTED_MODULE_11__.createTextStyle)(textStyleModel, null, null, opts.state !== 'normal');
}

/***/ }),

/***/ "./node_modules/echarts/lib/export/api/number.js":
/*!*******************************************************!*\
  !*** ./node_modules/echarts/lib/export/api/number.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "linearMap": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.linearMap),
/* harmony export */   "round": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.round),
/* harmony export */   "asc": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.asc),
/* harmony export */   "getPrecision": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.getPrecision),
/* harmony export */   "getPrecisionSafe": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.getPrecisionSafe),
/* harmony export */   "getPixelPrecision": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.getPixelPrecision),
/* harmony export */   "getPercentWithPrecision": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.getPercentWithPrecision),
/* harmony export */   "MAX_SAFE_INTEGER": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.MAX_SAFE_INTEGER),
/* harmony export */   "remRadian": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.remRadian),
/* harmony export */   "isRadianAroundZero": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.isRadianAroundZero),
/* harmony export */   "parseDate": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.parseDate),
/* harmony export */   "quantity": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.quantity),
/* harmony export */   "quantityExponent": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.quantityExponent),
/* harmony export */   "nice": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.nice),
/* harmony export */   "quantile": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.quantile),
/* harmony export */   "reformIntervals": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.reformIntervals),
/* harmony export */   "isNumeric": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.isNumeric),
/* harmony export */   "numericToNumber": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.numericToNumber)
/* harmony export */ });
/* harmony import */ var _util_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/number */ "./node_modules/echarts/lib/util/number.js");

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


/***/ }),

/***/ "./node_modules/echarts/lib/export/api/time.js":
/*!*****************************************************!*\
  !*** ./node_modules/echarts/lib/export/api/time.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* reexport safe */ _util_number__WEBPACK_IMPORTED_MODULE_0__.parseDate),
/* harmony export */   "format": () => (/* reexport safe */ _util_time__WEBPACK_IMPORTED_MODULE_1__.format)
/* harmony export */ });
/* harmony import */ var _util_number__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../util/number */ "./node_modules/echarts/lib/util/number.js");
/* harmony import */ var _util_time__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../util/time */ "./node_modules/echarts/lib/util/time.js");

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



/***/ }),

/***/ "./node_modules/echarts/lib/export/api/util.js":
/*!*****************************************************!*\
  !*** ./node_modules/echarts/lib/export/api/util.js ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "map": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.map),
/* harmony export */   "each": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.each),
/* harmony export */   "indexOf": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.indexOf),
/* harmony export */   "inherits": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.inherits),
/* harmony export */   "reduce": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.reduce),
/* harmony export */   "filter": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.filter),
/* harmony export */   "bind": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.bind),
/* harmony export */   "curry": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.curry),
/* harmony export */   "isArray": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.isArray),
/* harmony export */   "isString": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.isString),
/* harmony export */   "isObject": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.isObject),
/* harmony export */   "isFunction": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.isFunction),
/* harmony export */   "extend": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.extend),
/* harmony export */   "defaults": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.defaults),
/* harmony export */   "clone": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.clone),
/* harmony export */   "merge": () => (/* reexport safe */ zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__.merge)
/* harmony export */ });
/* harmony import */ var zrender_lib_core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zrender/lib/core/util */ "./node_modules/zrender/lib/core/util.js");

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


/***/ }),

/***/ "./node_modules/echarts/lib/export/core.js":
/*!*************************************************!*\
  !*** ./node_modules/echarts/lib/export/core.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PRIORITY": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.PRIORITY),
/* harmony export */   "connect": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.connect),
/* harmony export */   "dataTool": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.dataTool),
/* harmony export */   "dependencies": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.dependencies),
/* harmony export */   "disConnect": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.disConnect),
/* harmony export */   "disconnect": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.disconnect),
/* harmony export */   "dispose": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.dispose),
/* harmony export */   "getCoordinateSystemDimensions": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.getCoordinateSystemDimensions),
/* harmony export */   "getInstanceByDom": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.getInstanceByDom),
/* harmony export */   "getInstanceById": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.getInstanceById),
/* harmony export */   "getMap": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.getMap),
/* harmony export */   "init": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.init),
/* harmony export */   "registerAction": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerAction),
/* harmony export */   "registerCoordinateSystem": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerCoordinateSystem),
/* harmony export */   "registerLayout": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerLayout),
/* harmony export */   "registerLoading": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerLoading),
/* harmony export */   "registerLocale": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerLocale),
/* harmony export */   "registerMap": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerMap),
/* harmony export */   "registerPostInit": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerPostInit),
/* harmony export */   "registerPostUpdate": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerPostUpdate),
/* harmony export */   "registerPreprocessor": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerPreprocessor),
/* harmony export */   "registerProcessor": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerProcessor),
/* harmony export */   "registerTheme": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerTheme),
/* harmony export */   "registerTransform": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerTransform),
/* harmony export */   "registerVisual": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.registerVisual),
/* harmony export */   "setCanvasCreator": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.setCanvasCreator),
/* harmony export */   "version": () => (/* reexport safe */ _core_echarts__WEBPACK_IMPORTED_MODULE_0__.version),
/* harmony export */   "Axis": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.Axis),
/* harmony export */   "ChartView": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.ChartView),
/* harmony export */   "ComponentModel": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.ComponentModel),
/* harmony export */   "ComponentView": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.ComponentView),
/* harmony export */   "List": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.List),
/* harmony export */   "Model": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.Model),
/* harmony export */   "SeriesModel": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.SeriesModel),
/* harmony export */   "color": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.color),
/* harmony export */   "env": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.env),
/* harmony export */   "extendChartView": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.extendChartView),
/* harmony export */   "extendComponentModel": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.extendComponentModel),
/* harmony export */   "extendComponentView": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.extendComponentView),
/* harmony export */   "extendSeriesModel": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.extendSeriesModel),
/* harmony export */   "format": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.format),
/* harmony export */   "graphic": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.graphic),
/* harmony export */   "helper": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.helper),
/* harmony export */   "innerDrawElementOnCanvas": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.innerDrawElementOnCanvas),
/* harmony export */   "matrix": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.matrix),
/* harmony export */   "number": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.number),
/* harmony export */   "parseGeoJSON": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.parseGeoJSON),
/* harmony export */   "parseGeoJson": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.parseGeoJson),
/* harmony export */   "throttle": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.throttle),
/* harmony export */   "time": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.time),
/* harmony export */   "use": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.use),
/* harmony export */   "util": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.util),
/* harmony export */   "vector": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.vector),
/* harmony export */   "zrUtil": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.zrUtil),
/* harmony export */   "zrender": () => (/* reexport safe */ _api__WEBPACK_IMPORTED_MODULE_1__.zrender)
/* harmony export */ });
/* harmony import */ var _core_echarts__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/echarts */ "./node_modules/echarts/lib/core/echarts.js");
/* harmony import */ var _api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./api */ "./node_modules/echarts/lib/export/api.js");

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



/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VjaGFydHMvY29yZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VjaGFydHMvbGliL2V4cG9ydC9hcGkuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lY2hhcnRzL2xpYi9leHBvcnQvYXBpL2Zvcm1hdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VjaGFydHMvbGliL2V4cG9ydC9hcGkvZ3JhcGhpYy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VjaGFydHMvbGliL2V4cG9ydC9hcGkvaGVscGVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvZWNoYXJ0cy9saWIvZXhwb3J0L2FwaS9udW1iZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lY2hhcnRzL2xpYi9leHBvcnQvYXBpL3RpbWUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lY2hhcnRzL2xpYi9leHBvcnQvYXBpL3V0aWwuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lY2hhcnRzL2xpYi9leHBvcnQvY29yZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNnRDtBQUNGO0FBQ0o7QUFDSjtBQUNXO0FBQ2pCO0FBQ29CO0FBQ3RCO0FBQ3NCO0FBQ3RCO0FBQ29CO0FBQ3BCO0FBQ29CO0FBQ3RCO0FBQ2dCO0FBQ0g7QUFDWDtBQUNLOztBQUVpQztBQUNBO0FBQzNCO0FBQ1g7QUFDTztBQUNYO0FBQ2lCO0FBQ1g7QUFDUztBQUNYO0FBQ087QUFDWDtBQUM0Qjs7QUFFUDtBQUNHO0FBQ0Y7QUFDaUI7O0FBRW9CO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHVDQUF1Qyw4Q0FBOEM7QUFDckY7O0FBRU87QUFDUCxjQUFjLDZEQUFxQjtBQUNuQyxFQUFFLG9FQUE0QjtBQUM5QjtBQUNBO0FBQ087QUFDUCxhQUFhLDREQUFvQjtBQUNqQyxFQUFFLG1FQUEyQjtBQUM3QjtBQUNBO0FBQ087QUFDUCxjQUFjLDBEQUFrQjtBQUNoQyxFQUFFLGlFQUF5QjtBQUMzQjtBQUNBO0FBQ087QUFDUCxhQUFhLHdEQUFnQjtBQUM3QixFQUFFLCtEQUF1QjtBQUN6QjtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNnRDtBQUN5Qjs7QUFFcEI7QUFDbUI7QUFDbEM7QUFDWTtBQUMyRDtBQUMzRDtBQUMrQjtBQUNqRjtBQUNBO0FBQ0E7O0FBRU87QUFDUCxTQUFTLDBFQUFtQjtBQUM1QixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRXlCO0FBQ3dEO0FBQzFFO0FBQ1Asc0JBQXNCLDRFQUFrQjtBQUN4QyxtQkFBbUIseUVBQWU7QUFDbEMsdUJBQXVCLDZFQUFtQjtBQUMxQztBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjs7QUFFaUQ7QUFDakQ7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixXQUFXLDRCQUE0QjtBQUN2QztBQUNBOztBQUVPO0FBQ1A7O0FBRUEsMEJBQTBCLGlEQUFLO0FBQy9CLG9CQUFvQixpREFBSyxTQUFTO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxpRUFBNkI7QUFDM0M7QUFDQSxFQUFFLDhEQUEwQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRU87QUFDUCxFQUFFLHdEQUFZLFFBQVEsNkVBQW9CO0FBQzFDO0FBQ3FCO0FBQ21DO0FBQ2pEO0FBQ1A7QUFDQSxTQUFTLG1FQUFvQjtBQUM3QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDdUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ2dDIiwiZmlsZSI6ImRhc2hib2FyZC9qcy9kYXNoYm9hcmQ2ZjU4YzgwZjBjNzg4YzQ5MzRhZS5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbmV4cG9ydCAqIGZyb20gJy4vbGliL2V4cG9ydC9jb3JlJzsiLCJcbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuXG4vKipcbiAqIEFVVE8tR0VORVJBVEVEIEZJTEUuIERPIE5PVCBNT0RJRlkuXG4gKi9cblxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuLy8gVGhlc2UgQVBJcyBhcmUgZm9yIG1vcmUgYWR2YW5jZWQgdXNhZ2VzXG4vLyBGb3IgZXhhbXBsZSBleHRlbmQgY2hhcnRzIGFuZCBjb21wb25lbnRzLCBjcmVhdGluZyBncmFwaGljIGVsZW1lbnRzLCBmb3JtYXR0aW5nLlxuaW1wb3J0IENvbXBvbmVudE1vZGVsIGZyb20gJy4uL21vZGVsL0NvbXBvbmVudCc7XG5pbXBvcnQgQ29tcG9uZW50VmlldyBmcm9tICcuLi92aWV3L0NvbXBvbmVudCc7XG5pbXBvcnQgU2VyaWVzTW9kZWwgZnJvbSAnLi4vbW9kZWwvU2VyaWVzJztcbmltcG9ydCBDaGFydFZpZXcgZnJvbSAnLi4vdmlldy9DaGFydCc7XG5pbXBvcnQgKiBhcyB6cmVuZGVyXzEgZnJvbSAnenJlbmRlci9saWIvenJlbmRlcic7XG5leHBvcnQgeyB6cmVuZGVyXzEgYXMgenJlbmRlciB9O1xuaW1wb3J0ICogYXMgbWF0cml4XzEgZnJvbSAnenJlbmRlci9saWIvY29yZS9tYXRyaXgnO1xuZXhwb3J0IHsgbWF0cml4XzEgYXMgbWF0cml4IH07XG5pbXBvcnQgKiBhcyB2ZWN0b3JfMSBmcm9tICd6cmVuZGVyL2xpYi9jb3JlL3ZlY3Rvcic7XG5leHBvcnQgeyB2ZWN0b3JfMSBhcyB2ZWN0b3IgfTtcbmltcG9ydCAqIGFzIHpyVXRpbF8xIGZyb20gJ3pyZW5kZXIvbGliL2NvcmUvdXRpbCc7XG5leHBvcnQgeyB6clV0aWxfMSBhcyB6clV0aWwgfTtcbmltcG9ydCAqIGFzIGNvbG9yXzEgZnJvbSAnenJlbmRlci9saWIvdG9vbC9jb2xvcic7XG5leHBvcnQgeyBjb2xvcl8xIGFzIGNvbG9yIH07XG5leHBvcnQgeyB0aHJvdHRsZSB9IGZyb20gJy4uL3V0aWwvdGhyb3R0bGUnO1xuaW1wb3J0ICogYXMgaGVscGVyXzEgZnJvbSAnLi9hcGkvaGVscGVyJztcbmV4cG9ydCB7IGhlbHBlcl8xIGFzIGhlbHBlciB9O1xuZXhwb3J0IHsgdXNlIH0gZnJvbSAnLi4vZXh0ZW5zaW9uJzsgLy8vLy8vLy8vLy8vLy8vLyBIZWxwZXIgTWV0aG9kcyAvLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBwYXJzZUdlb0pTT04gfSBmcm9tICcuLi9jb29yZC9nZW8vcGFyc2VHZW9Kc29uJztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgcGFyc2VHZW9Kc29uIH0gZnJvbSAnLi4vY29vcmQvZ2VvL3BhcnNlR2VvSnNvbic7XG5pbXBvcnQgKiBhcyBudW1iZXJfMSBmcm9tICcuL2FwaS9udW1iZXInO1xuZXhwb3J0IHsgbnVtYmVyXzEgYXMgbnVtYmVyIH07XG5pbXBvcnQgKiBhcyB0aW1lXzEgZnJvbSAnLi9hcGkvdGltZSc7XG5leHBvcnQgeyB0aW1lXzEgYXMgdGltZSB9O1xuaW1wb3J0ICogYXMgZ3JhcGhpY18xIGZyb20gJy4vYXBpL2dyYXBoaWMnO1xuZXhwb3J0IHsgZ3JhcGhpY18xIGFzIGdyYXBoaWMgfTtcbmltcG9ydCAqIGFzIGZvcm1hdF8xIGZyb20gJy4vYXBpL2Zvcm1hdCc7XG5leHBvcnQgeyBmb3JtYXRfMSBhcyBmb3JtYXQgfTtcbmltcG9ydCAqIGFzIHV0aWxfMSBmcm9tICcuL2FwaS91dGlsJztcbmV4cG9ydCB7IHV0aWxfMSBhcyB1dGlsIH07XG5leHBvcnQgeyBkZWZhdWx0IGFzIGVudiB9IGZyb20gJ3pyZW5kZXIvbGliL2NvcmUvZW52JzsgLy8vLy8vLy8vLy8vLy8vLyBFeHBvcnQgZm9yIEV4ZW5zaW9uIFVzYWdlIC8vLy8vLy8vLy8vLy8vLy9cblxuZXhwb3J0IHsgZGVmYXVsdCBhcyBMaXN0IH0gZnJvbSAnLi4vZGF0YS9MaXN0JztcbmV4cG9ydCB7IGRlZmF1bHQgYXMgTW9kZWwgfSBmcm9tICcuLi9tb2RlbC9Nb2RlbCc7XG5leHBvcnQgeyBkZWZhdWx0IGFzIEF4aXMgfSBmcm9tICcuLi9jb29yZC9BeGlzJztcbmV4cG9ydCB7IENvbXBvbmVudE1vZGVsLCBDb21wb25lbnRWaWV3LCBTZXJpZXNNb2RlbCwgQ2hhcnRWaWV3IH07IC8vIE9ubHkgZm9yIEdMXG5cbmV4cG9ydCB7IGJydXNoU2luZ2xlIGFzIGlubmVyRHJhd0VsZW1lbnRPbkNhbnZhcyB9IGZyb20gJ3pyZW5kZXIvbGliL2NhbnZhcy9ncmFwaGljJzsgLy8vLy8vLy8vLy8vLy8vLyBEZXByZWNhdGVkIEV4dGVuc2lvbiBNZXRob2RzIC8vLy8vLy8vLy8vLy8vLy9cbi8vIFNob3VsZCB1c2UgYENvbXBvbmVudE1vZGVsLmV4dGVuZGAgb3IgYGNsYXNzIFhYWFggZXh0ZW5kIENvbXBvbmVudE1vZGVsYCB0byBjcmVhdGUgY2xhc3MuXG4vLyBUaGVuIHVzZSBgcmVnaXN0ZXJDb21wb25lbnRNb2RlbGAgaW4gYGluc3RhbGxgIHBhcmFtZXRlciB3aGVuIGB1c2VgIHRoaXMgZXh0ZW5zaW9uLiBGb3IgZXhhbXBsZTpcbi8vIGNsYXNzIEJhcjNETW9kZWwgZXh0ZW5kcyBDb21wb25lbnRNb2RlbCB7fVxuLy8gZXhwb3J0IGZ1bmN0aW9uIGluc3RhbGwocmVnaXN0ZXJzKSB7IHJlZ3NpdGVycy5yZWdpc3RlckNvbXBvbmVudE1vZGVsKEJhcjNETW9kZWwpOyB9XG4vLyBlY2hhcnRzLnVzZShpbnN0YWxsKTtcblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZENvbXBvbmVudE1vZGVsKHByb3RvKSB7XG4gIHZhciBNb2RlbCA9IENvbXBvbmVudE1vZGVsLmV4dGVuZChwcm90byk7XG4gIENvbXBvbmVudE1vZGVsLnJlZ2lzdGVyQ2xhc3MoTW9kZWwpO1xuICByZXR1cm4gTW9kZWw7XG59XG5leHBvcnQgZnVuY3Rpb24gZXh0ZW5kQ29tcG9uZW50Vmlldyhwcm90bykge1xuICB2YXIgVmlldyA9IENvbXBvbmVudFZpZXcuZXh0ZW5kKHByb3RvKTtcbiAgQ29tcG9uZW50Vmlldy5yZWdpc3RlckNsYXNzKFZpZXcpO1xuICByZXR1cm4gVmlldztcbn1cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmRTZXJpZXNNb2RlbChwcm90bykge1xuICB2YXIgTW9kZWwgPSBTZXJpZXNNb2RlbC5leHRlbmQocHJvdG8pO1xuICBTZXJpZXNNb2RlbC5yZWdpc3RlckNsYXNzKE1vZGVsKTtcbiAgcmV0dXJuIE1vZGVsO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZENoYXJ0Vmlldyhwcm90bykge1xuICB2YXIgVmlldyA9IENoYXJ0Vmlldy5leHRlbmQocHJvdG8pO1xuICBDaGFydFZpZXcucmVnaXN0ZXJDbGFzcyhWaWV3KTtcbiAgcmV0dXJuIFZpZXc7XG59IiwiXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cblxuLyoqXG4gKiBBVVRPLUdFTkVSQVRFRCBGSUxFLiBETyBOT1QgTU9ESUZZLlxuICovXG5cbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbmV4cG9ydCB7IGFkZENvbW1hcywgdG9DYW1lbENhc2UsIG5vcm1hbGl6ZUNzc0FycmF5LCBlbmNvZGVIVE1MLCBmb3JtYXRUcGwsIGdldFRvb2x0aXBNYXJrZXIsIGZvcm1hdFRpbWUsIGNhcGl0YWxGaXJzdCwgdHJ1bmNhdGVUZXh0LCBnZXRUZXh0UmVjdCB9IGZyb20gJy4uLy4uL3V0aWwvZm9ybWF0JzsiLCJcbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuXG4vKipcbiAqIEFVVE8tR0VORVJBVEVEIEZJTEUuIERPIE5PVCBNT0RJRlkuXG4gKi9cblxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuZXhwb3J0IHsgZXh0ZW5kU2hhcGUsIGV4dGVuZFBhdGgsIG1ha2VQYXRoLCBtYWtlSW1hZ2UsIG1lcmdlUGF0aCwgcmVzaXplUGF0aCwgY3JlYXRlSWNvbiwgdXBkYXRlUHJvcHMsIGluaXRQcm9wcywgZ2V0VHJhbnNmb3JtLCBjbGlwUG9pbnRzQnlSZWN0LCBjbGlwUmVjdEJ5UmVjdCwgcmVnaXN0ZXJTaGFwZSwgZ2V0U2hhcGVDbGFzcywgR3JvdXAsIEltYWdlLCBUZXh0LCBDaXJjbGUsIEVsbGlwc2UsIFNlY3RvciwgUmluZywgUG9seWdvbiwgUG9seWxpbmUsIFJlY3QsIExpbmUsIEJlemllckN1cnZlLCBBcmMsIEluY3JlbWVudGFsRGlzcGxheWFibGUsIENvbXBvdW5kUGF0aCwgTGluZWFyR3JhZGllbnQsIFJhZGlhbEdyYWRpZW50LCBCb3VuZGluZ1JlY3QgfSBmcm9tICcuLi8uLi91dGlsL2dyYXBoaWMnOyIsIlxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5cbi8qKlxuICogQVVUTy1HRU5FUkFURUQgRklMRS4gRE8gTk9UIE1PRElGWS5cbiAqL1xuXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cbi8qKlxuICogVGhpcyBtb2R1bGUgZXhwb3NlcyBoZWxwZXIgZnVuY3Rpb25zIGZvciBkZXZlbG9waW5nIGV4dGVuc2lvbnMuXG4gKi9cbmltcG9ydCAqIGFzIHpyVXRpbCBmcm9tICd6cmVuZGVyL2xpYi9jb3JlL3V0aWwnO1xuaW1wb3J0IGNyZWF0ZUxpc3RGcm9tQXJyYXkgZnJvbSAnLi4vLi4vY2hhcnQvaGVscGVyL2NyZWF0ZUxpc3RGcm9tQXJyYXknOyAvLyBpbXBvcnQgY3JlYXRlR3JhcGhGcm9tTm9kZUVkZ2UgZnJvbSAnLi9jaGFydC9oZWxwZXIvY3JlYXRlR3JhcGhGcm9tTm9kZUVkZ2UnO1xuXG5pbXBvcnQgKiBhcyBheGlzSGVscGVyIGZyb20gJy4uLy4uL2Nvb3JkL2F4aXNIZWxwZXInO1xuaW1wb3J0IHsgQXhpc01vZGVsQ29tbW9uTWl4aW4gfSBmcm9tICcuLi8uLi9jb29yZC9heGlzTW9kZWxDb21tb25NaXhpbic7XG5pbXBvcnQgTW9kZWwgZnJvbSAnLi4vLi4vbW9kZWwvTW9kZWwnO1xuaW1wb3J0IHsgZ2V0TGF5b3V0UmVjdCB9IGZyb20gJy4uLy4uL3V0aWwvbGF5b3V0JztcbmltcG9ydCB7IGVuYWJsZURhdGFTdGFjaywgaXNEaW1lbnNpb25TdGFja2VkLCBnZXRTdGFja2VkRGltZW5zaW9uIH0gZnJvbSAnLi4vLi4vZGF0YS9oZWxwZXIvZGF0YVN0YWNrSGVscGVyJztcbmltcG9ydCB7IGdldEVDRGF0YSB9IGZyb20gJy4uLy4uL3V0aWwvaW5uZXJTdG9yZSc7XG5pbXBvcnQgeyBjcmVhdGVUZXh0U3R5bGUgYXMgaW5uZXJDcmVhdGVUZXh0U3R5bGUgfSBmcm9tICcuLi8uLi9sYWJlbC9sYWJlbFN0eWxlJztcbi8qKlxuICogQ3JlYXRlIGEgbXV0aSBkaW1lbnNpb24gTGlzdCBzdHJ1Y3R1cmUgZnJvbSBzZXJpZXNNb2RlbC5cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTGlzdChzZXJpZXNNb2RlbCkge1xuICByZXR1cm4gY3JlYXRlTGlzdEZyb21BcnJheShzZXJpZXNNb2RlbC5nZXRTb3VyY2UoKSwgc2VyaWVzTW9kZWwpO1xufSAvLyBleHBvcnQgZnVuY3Rpb24gY3JlYXRlR3JhcGgoc2VyaWVzTW9kZWwpIHtcbi8vICAgICBsZXQgbm9kZXMgPSBzZXJpZXNNb2RlbC5nZXQoJ2RhdGEnKTtcbi8vICAgICBsZXQgbGlua3MgPSBzZXJpZXNNb2RlbC5nZXQoJ2xpbmtzJyk7XG4vLyAgICAgcmV0dXJuIGNyZWF0ZUdyYXBoRnJvbU5vZGVFZGdlKG5vZGVzLCBsaW5rcywgc2VyaWVzTW9kZWwpO1xuLy8gfVxuXG5leHBvcnQgeyBnZXRMYXlvdXRSZWN0IH07XG5leHBvcnQgeyBkZWZhdWx0IGFzIGNyZWF0ZURpbWVuc2lvbnMgfSBmcm9tICcuLi8uLi9kYXRhL2hlbHBlci9jcmVhdGVEaW1lbnNpb25zJztcbmV4cG9ydCB2YXIgZGF0YVN0YWNrID0ge1xuICBpc0RpbWVuc2lvblN0YWNrZWQ6IGlzRGltZW5zaW9uU3RhY2tlZCxcbiAgZW5hYmxlRGF0YVN0YWNrOiBlbmFibGVEYXRhU3RhY2ssXG4gIGdldFN0YWNrZWREaW1lbnNpb246IGdldFN0YWNrZWREaW1lbnNpb25cbn07XG4vKipcbiAqIENyZWF0ZSBhIHN5bWJvbCBlbGVtZW50IHdpdGggZ2l2ZW4gc3ltYm9sIGNvbmZpZ3VyYXRpb246IHNoYXBlLCB4LCB5LCB3aWR0aCwgaGVpZ2h0LCBjb2xvclxuICogQHBhcmFtIHtzdHJpbmd9IHN5bWJvbERlc2NcbiAqIEBwYXJhbSB7bnVtYmVyfSB4XG4gKiBAcGFyYW0ge251bWJlcn0geVxuICogQHBhcmFtIHtudW1iZXJ9IHdcbiAqIEBwYXJhbSB7bnVtYmVyfSBoXG4gKiBAcGFyYW0ge3N0cmluZ30gY29sb3JcbiAqL1xuXG5leHBvcnQgeyBjcmVhdGVTeW1ib2wgfSBmcm9tICcuLi8uLi91dGlsL3N5bWJvbCc7XG4vKipcbiAqIENyZWF0ZSBzY2FsZVxuICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gZGF0YUV4dGVudFxuICogQHBhcmFtIHtPYmplY3R8bW9kdWxlOmVjaGFydHMvTW9kZWx9IG9wdGlvbiBJZiBgb3B0b2luLnR5cGVgXG4gKiAgICAgICAgaXMgc2VjaWZpZWQsIGl0IGNhbiBvbmx5IGJlIGAndmFsdWUnYCBjdXJyZW50bHkuXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVNjYWxlKGRhdGFFeHRlbnQsIG9wdGlvbikge1xuICB2YXIgYXhpc01vZGVsID0gb3B0aW9uO1xuXG4gIGlmICghKG9wdGlvbiBpbnN0YW5jZW9mIE1vZGVsKSkge1xuICAgIGF4aXNNb2RlbCA9IG5ldyBNb2RlbChvcHRpb24pOyAvLyBGSVhNRVxuICAgIC8vIEN1cnJlbnRseSBBeGlzTW9kZWxDb21tb25NaXhpbiBoYXMgbm90aGluZyB0byBkbyB3aXRoIHRoZVxuICAgIC8vIHRoZSByZXF1aXJlbWVudHMgb2YgYGF4aXNIZWxwZXIuY3JlYXRlU2NhbGVCeU1vZGVsYC4gRm9yXG4gICAgLy8gZXhhbXBsZSB0aGUgbWV0aG9kIGBnZXRDYXRlZ29yaWVzYCBhbmQgYGdldE9yZGluYWxNZXRhYFxuICAgIC8vIGFyZSByZXF1aXJlZCBmb3IgYCdjYXRlZ29yeSdgIGF4aXMsIGFuZCBlY01vZGVsIGFyZSByZXF1aXJlZFxuICAgIC8vIGZvciBgJ3RpbWUnYCBheGlzLiBCdXQgb2NjYXRpb25hbGx5IGVjaGFydHMtZ2wgaGFwcGVuZWRcbiAgICAvLyB0byBvbmx5IHVzZSBgJ3ZhbHVlJ2AgYXhpcy5cbiAgICAvLyB6clV0aWwubWl4aW4oYXhpc01vZGVsLCBBeGlzTW9kZWxDb21tb25NaXhpbik7XG4gIH1cblxuICB2YXIgc2NhbGUgPSBheGlzSGVscGVyLmNyZWF0ZVNjYWxlQnlNb2RlbChheGlzTW9kZWwpO1xuICBzY2FsZS5zZXRFeHRlbnQoZGF0YUV4dGVudFswXSwgZGF0YUV4dGVudFsxXSk7XG4gIGF4aXNIZWxwZXIubmljZVNjYWxlRXh0ZW50KHNjYWxlLCBheGlzTW9kZWwpO1xuICByZXR1cm4gc2NhbGU7XG59XG4vKipcbiAqIE1peGluIGNvbW1vbiBtZXRob2RzIHRvIGF4aXMgbW9kZWwsXG4gKlxuICogSW5sY3VkZSBtZXRob2RzXG4gKiBgZ2V0Rm9ybWF0dGVkTGFiZWxzKCkgPT4gQXJyYXkuPHN0cmluZz5gXG4gKiBgZ2V0Q2F0ZWdvcmllcygpID0+IEFycmF5LjxzdHJpbmc+YFxuICogYGdldE1pbihvcmlnaW46IGJvb2xlYW4pID0+IG51bWJlcmBcbiAqIGBnZXRNYXgob3JpZ2luOiBib29sZWFuKSA9PiBudW1iZXJgXG4gKiBgZ2V0TmVlZENyb3NzWmVybygpID0+IGJvb2xlYW5gXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIG1peGluQXhpc01vZGVsQ29tbW9uTWV0aG9kcyhNb2RlbCkge1xuICB6clV0aWwubWl4aW4oTW9kZWwsIEF4aXNNb2RlbENvbW1vbk1peGluKTtcbn1cbmV4cG9ydCB7IGdldEVDRGF0YSB9O1xuZXhwb3J0IHsgZW5hYmxlSG92ZXJFbXBoYXNpcyB9IGZyb20gJy4uLy4uL3V0aWwvc3RhdGVzJztcbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUZXh0U3R5bGUodGV4dFN0eWxlTW9kZWwsIG9wdHMpIHtcbiAgb3B0cyA9IG9wdHMgfHwge307XG4gIHJldHVybiBpbm5lckNyZWF0ZVRleHRTdHlsZSh0ZXh0U3R5bGVNb2RlbCwgbnVsbCwgbnVsbCwgb3B0cy5zdGF0ZSAhPT0gJ25vcm1hbCcpO1xufSIsIlxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5cbi8qKlxuICogQVVUTy1HRU5FUkFURUQgRklMRS4gRE8gTk9UIE1PRElGWS5cbiAqL1xuXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5leHBvcnQgeyBsaW5lYXJNYXAsIHJvdW5kLCBhc2MsIGdldFByZWNpc2lvbiwgZ2V0UHJlY2lzaW9uU2FmZSwgZ2V0UGl4ZWxQcmVjaXNpb24sIGdldFBlcmNlbnRXaXRoUHJlY2lzaW9uLCBNQVhfU0FGRV9JTlRFR0VSLCByZW1SYWRpYW4sIGlzUmFkaWFuQXJvdW5kWmVybywgcGFyc2VEYXRlLCBxdWFudGl0eSwgcXVhbnRpdHlFeHBvbmVudCwgbmljZSwgcXVhbnRpbGUsIHJlZm9ybUludGVydmFscywgaXNOdW1lcmljLCBudW1lcmljVG9OdW1iZXIgfSBmcm9tICcuLi8uLi91dGlsL251bWJlcic7IiwiXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cblxuLyoqXG4gKiBBVVRPLUdFTkVSQVRFRCBGSUxFLiBETyBOT1QgTU9ESUZZLlxuICovXG5cbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbmV4cG9ydCB7IHBhcnNlRGF0ZSBhcyBwYXJzZSB9IGZyb20gJy4uLy4uL3V0aWwvbnVtYmVyJztcbmV4cG9ydCB7IGZvcm1hdCB9IGZyb20gJy4uLy4uL3V0aWwvdGltZSc7IiwiXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5cblxuLyoqXG4gKiBBVVRPLUdFTkVSQVRFRCBGSUxFLiBETyBOT1QgTU9ESUZZLlxuICovXG5cbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cbmV4cG9ydCB7IG1hcCwgZWFjaCwgaW5kZXhPZiwgaW5oZXJpdHMsIHJlZHVjZSwgZmlsdGVyLCBiaW5kLCBjdXJyeSwgaXNBcnJheSwgaXNTdHJpbmcsIGlzT2JqZWN0LCBpc0Z1bmN0aW9uLCBleHRlbmQsIGRlZmF1bHRzLCBjbG9uZSwgbWVyZ2UgfSBmcm9tICd6cmVuZGVyL2xpYi9jb3JlL3V0aWwnOyIsIlxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5cbi8qKlxuICogQVVUTy1HRU5FUkFURUQgRklMRS4gRE8gTk9UIE1PRElGWS5cbiAqL1xuXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5leHBvcnQgKiBmcm9tICcuLi9jb3JlL2VjaGFydHMnO1xuZXhwb3J0ICogZnJvbSAnLi9hcGknOyJdLCJzb3VyY2VSb290IjoiIn0=