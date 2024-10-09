(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["src_dashboard_Dashboard_tsx"],{

/***/ "./src/components/ApacheChart/ApacheChart.tsx":
/*!****************************************************!*\
  !*** ./src/components/ApacheChart/ApacheChart.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApacheChart": () => (/* binding */ ApacheChart)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils */ "./src/components/ApacheChart/utils/index.ts");



var _templateObject;





var StyledChart = styled_components__WEBPACK_IMPORTED_MODULE_5__.default.div(_templateObject || (_templateObject = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__.default)(["\n  min-height: 100% !important;\n"])));

var ApacheChart = function ApacheChart(props) {
  var element = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_useState, 2),
      loading = _useState2[0],
      setLoading = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    if (element.current) {
      if (props.demo) {
        switch (props.type) {
          case 'line':
            (0,_utils__WEBPACK_IMPORTED_MODULE_4__.makeBasicLineChart)(element.current);
            break;

          case 'bar':
            (0,_utils__WEBPACK_IMPORTED_MODULE_4__.renderBasicColumnChart)(element.current);
            break;

          case 'pie':
            (0,_utils__WEBPACK_IMPORTED_MODULE_4__.renderBasicPieChart)(element.current);
            break;

          default:
            break;
        }
      } else {
        (0,_utils__WEBPACK_IMPORTED_MODULE_4__.renderChart)(element.current, props.options).then(function (chart) {
          setLoading(false);
          /* eslint-disable @typescript-eslint/no-non-null-assertion */

          if (props.onClick) {
            chart.on('click', function (params) {
              props.onClick({
                data: props.data,
                chart: chart,
                params: params
              });
            });
          }

          if (props.onHover) {
            chart.on('mouseover', function (params) {
              props.onHover({
                data: props.data,
                chart: chart,
                params: params
              });
            });
          }

          if (props.onBlur) {
            chart.on('mouseout', function (params) {
              props.onBlur({
                data: props.data,
                chart: chart,
                params: params
              });
            });
          }
          /* eslint-enable @typescript-eslint/no-non-null-assertion */

        });
      }
    }
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_2___default()('chart-container chart-container--full', {
      'chart-container--loading': loading
    })
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(StyledChart, {
    className: "charts__chart"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
    ref: element,
    style: {
      height: props.height
    }
  }), loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
    className: "chart-loading"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
    className: "chart-loading__block"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null))) : null));
};

ApacheChart.defaultProps = {
  height: '300px',
  type: 'line'
};


/***/ }),

/***/ "./src/components/ApacheChart/index.ts":
/*!*********************************************!*\
  !*** ./src/components/ApacheChart/index.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApacheChart": () => (/* reexport safe */ _ApacheChart__WEBPACK_IMPORTED_MODULE_0__.ApacheChart)
/* harmony export */ });
/* harmony import */ var _ApacheChart__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ApacheChart */ "./src/components/ApacheChart/ApacheChart.tsx");


/***/ }),

/***/ "./src/components/ApacheChart/utils/index.ts":
/*!***************************************************!*\
  !*** ./src/components/ApacheChart/utils/index.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "renderChart": () => (/* binding */ renderChart),
/* harmony export */   "makeBasicLineChart": () => (/* binding */ makeBasicLineChart),
/* harmony export */   "renderBasicColumnChart": () => (/* binding */ renderBasicColumnChart),
/* harmony export */   "renderBasicPieChart": () => (/* binding */ renderBasicPieChart)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/asyncToGenerator */ "./node_modules/@babel/runtime/helpers/esm/asyncToGenerator.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _dashboard_utils_chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../dashboard/utils/chart */ "./src/dashboard/utils/chart/index.ts");
/* harmony import */ var _utils_echarts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../utils/echarts */ "./src/utils/echarts.ts");






var loadApacheCharts = /*#__PURE__*/function () {
  var _ref = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee() {
    var echarts, _yield$import, BarChart, LineChart, PieChart, _yield$import2, TitleComponent, TooltipComponent, GridComponent, LegendComponent, DatasetComponent, _yield$import3, CanvasRenderer;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_zrender_lib_animation_requestAnimationFrame_js-node_modules_zrender_lib_-f7e0e6"), __webpack_require__.e("vendors-node_modules_echarts_lib_coord_Axis_js-node_modules_echarts_lib_coord_axisModelCommon-51c136"), __webpack_require__.e("vendors-node_modules_echarts_lib_chart_helper_createListFromArray_js"), __webpack_require__.e("vendors-node_modules_echarts_core_js")]).then(__webpack_require__.bind(__webpack_require__, /*! echarts/core */ "./node_modules/echarts/core.js"));

          case 2:
            echarts = _context.sent;
            _context.next = 5;
            return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_zrender_lib_animation_requestAnimationFrame_js-node_modules_zrender_lib_-f7e0e6"), __webpack_require__.e("vendors-node_modules_echarts_lib_coord_Axis_js-node_modules_echarts_lib_coord_axisModelCommon-51c136"), __webpack_require__.e("vendors-node_modules_echarts_lib_chart_helper_LineDraw_js-node_modules_echarts_lib_chart_help-e3a1dd"), __webpack_require__.e("vendors-node_modules_echarts_lib_chart_helper_createListFromArray_js"), __webpack_require__.e("vendors-node_modules_echarts_charts_js")]).then(__webpack_require__.bind(__webpack_require__, /*! echarts/charts */ "./node_modules/echarts/charts.js"));

          case 5:
            _yield$import = _context.sent;
            BarChart = _yield$import.BarChart;
            LineChart = _yield$import.LineChart;
            PieChart = _yield$import.PieChart;
            _context.next = 11;
            return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_zrender_lib_animation_requestAnimationFrame_js-node_modules_zrender_lib_-f7e0e6"), __webpack_require__.e("vendors-node_modules_echarts_lib_coord_Axis_js-node_modules_echarts_lib_coord_axisModelCommon-51c136"), __webpack_require__.e("vendors-node_modules_echarts_lib_chart_helper_LineDraw_js-node_modules_echarts_lib_chart_help-e3a1dd"), __webpack_require__.e("vendors-node_modules_echarts_components_js")]).then(__webpack_require__.bind(__webpack_require__, /*! echarts/components */ "./node_modules/echarts/components.js"));

          case 11:
            _yield$import2 = _context.sent;
            TitleComponent = _yield$import2.TitleComponent;
            TooltipComponent = _yield$import2.TooltipComponent;
            GridComponent = _yield$import2.GridComponent;
            LegendComponent = _yield$import2.LegendComponent;
            DatasetComponent = _yield$import2.DatasetComponent;
            _context.next = 19;
            return Promise.all(/*! import() */[__webpack_require__.e("vendors-node_modules_zrender_lib_animation_requestAnimationFrame_js-node_modules_zrender_lib_-f7e0e6"), __webpack_require__.e("vendors-node_modules_echarts_renderers_js")]).then(__webpack_require__.bind(__webpack_require__, /*! echarts/renderers */ "./node_modules/echarts/renderers.js"));

          case 19:
            _yield$import3 = _context.sent;
            CanvasRenderer = _yield$import3.CanvasRenderer;
            echarts.use([TitleComponent, TooltipComponent, GridComponent, LegendComponent, DatasetComponent, BarChart, LineChart, PieChart, CanvasRenderer]);
            return _context.abrupt("return", echarts);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function loadApacheCharts() {
    return _ref.apply(this, arguments);
  };
}();

var renderChart = /*#__PURE__*/function () {
  var _ref2 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee2(node, option) {
    var _yield$loadApacheChar, init, chart;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return loadApacheCharts();

          case 2:
            _yield$loadApacheChar = _context2.sent;
            init = _yield$loadApacheChar.init;
            chart = init(node); // eslint-disable-line @typescript-eslint/no-explicit-any

            chart.setOption(deepmerge__WEBPACK_IMPORTED_MODULE_2___default()(_utils_echarts__WEBPACK_IMPORTED_MODULE_4__.defaultOptions, option)); // eslint-disable-line @typescript-eslint/no-explicit-any

            return _context2.abrupt("return", chart);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function renderChart(_x, _x2) {
    return _ref2.apply(this, arguments);
  };
}();
var makeBasicLineChart = /*#__PURE__*/function () {
  var _ref3 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee3(node) {
    var _yield$loadApacheChar2, init, chart, option;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return loadApacheCharts();

          case 2:
            _yield$loadApacheChar2 = _context3.sent;
            init = _yield$loadApacheChar2.init;
            chart = init(node);
            option = {
              color: _dashboard_utils_chart__WEBPACK_IMPORTED_MODULE_3__.colours,
              tooltip: {
                trigger: 'axis'
              },
              legend: {
                data: ['Step Start', 'Step Middle', 'Step End']
              },
              grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
              },
              toolbox: {
                feature: {
                  saveAsImage: {}
                }
              },
              xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
              },
              yAxis: {
                type: 'value'
              },
              series: [{
                name: 'Step Start',
                type: 'line',
                step: 'start',
                data: [120, 132, 101, 134, 90, 230, 210]
              }, {
                name: 'Step Middle',
                type: 'line',
                step: 'middle',
                data: [220, 282, 201, 234, 290, 430, 410]
              }, {
                name: 'Step End',
                type: 'line',
                step: 'end',
                data: [450, 432, 401, 454, 590, 530, 510]
              }]
            };
            chart.setOption(deepmerge__WEBPACK_IMPORTED_MODULE_2___default()(_utils_echarts__WEBPACK_IMPORTED_MODULE_4__.defaultOptions, option)); // eslint-disable-line @typescript-eslint/no-explicit-any

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function makeBasicLineChart(_x3) {
    return _ref3.apply(this, arguments);
  };
}();
var renderBasicColumnChart = /*#__PURE__*/function () {
  var _ref4 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee4(node) {
    var _yield$loadApacheChar3, init, chart, option;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return loadApacheCharts();

          case 2:
            _yield$loadApacheChar3 = _context4.sent;
            init = _yield$loadApacheChar3.init;
            chart = init(node);
            option = {
              color: _dashboard_utils_chart__WEBPACK_IMPORTED_MODULE_3__.colours,
              legend: {},
              tooltip: {},
              dataset: {
                dimensions: ['product', '2015', '2016', '2017'],
                source: [{
                  product: 'Matcha Latte',
                  '2015': 43.3,
                  '2016': 85.8,
                  '2017': 93.7
                }, {
                  product: 'Milk Tea',
                  '2015': 83.1,
                  '2016': 73.4,
                  '2017': 55.1
                }, {
                  product: 'Cheese Cocoa',
                  '2015': 86.4,
                  '2016': 65.2,
                  '2017': 82.5
                }, {
                  product: 'Walnut Brownie',
                  '2015': 72.4,
                  '2016': 53.9,
                  '2017': 39.1
                }]
              },
              xAxis: {
                type: 'category'
              },
              yAxis: {},
              // Declare several bar series, each will be mapped
              // to a column of dataset.source by default.
              series: [{
                type: 'bar'
              }, {
                type: 'bar'
              }, {
                type: 'bar'
              }]
            };
            chart.setOption(deepmerge__WEBPACK_IMPORTED_MODULE_2___default()(_utils_echarts__WEBPACK_IMPORTED_MODULE_4__.defaultOptions, option)); // eslint-disable-line @typescript-eslint/no-explicit-any

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function renderBasicColumnChart(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var renderBasicPieChart = /*#__PURE__*/function () {
  var _ref5 = (0,_babel_runtime_helpers_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().mark(function _callee5(node) {
    var _yield$loadApacheChar4, init, chart, option;

    return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_1___default().wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return loadApacheCharts();

          case 2:
            _yield$loadApacheChar4 = _context5.sent;
            init = _yield$loadApacheChar4.init;
            chart = init(node);
            option = {
              color: _dashboard_utils_chart__WEBPACK_IMPORTED_MODULE_3__.colours,
              legend: {
                top: 'bottom'
              },
              toolbox: {
                show: true,
                feature: {
                  mark: {
                    show: true
                  },
                  dataView: {
                    show: true,
                    readOnly: false
                  },
                  restore: {
                    show: true
                  },
                  saveAsImage: {
                    show: true
                  }
                }
              },
              xAxis: {
                show: false
              },
              yAxis: {
                show: false
              },
              series: [{
                name: 'Rose',
                type: 'pie',
                radius: '65%',
                center: ['50%', '50%'],
                label: {
                  show: true
                },
                data: [{
                  value: 40,
                  name: 'rose 1'
                }, {
                  value: 38,
                  name: 'rose 2'
                }, {
                  value: 32,
                  name: 'rose 3'
                }, {
                  value: 30,
                  name: 'rose 4'
                }]
              }]
            };
            chart.setOption(deepmerge__WEBPACK_IMPORTED_MODULE_2___default()(_utils_echarts__WEBPACK_IMPORTED_MODULE_4__.defaultOptions, option)); // eslint-disable-line @typescript-eslint/no-explicit-any

          case 7:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function renderBasicPieChart(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

/***/ }),

/***/ "./src/components/Card/Card.tsx":
/*!**************************************!*\
  !*** ./src/components/Card/Card.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CardMetaLarge": () => (/* binding */ CardMetaLarge),
/* harmony export */   "CardTitleLarge": () => (/* binding */ CardTitleLarge),
/* harmony export */   "Card": () => (/* binding */ Card)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");


var _templateObject, _templateObject2;




var Card = function Card(props) {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "card card--offset"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: "card__body"
  }, props.meta ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("span", {
    className: "card__meta"
  }, props.meta) : null, props.title ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("h3", {
    className: "card__title"
  }, props.title) : null, props.children));
};

var CardMetaLarge = styled_components__WEBPACK_IMPORTED_MODULE_2__.default.span.attrs(function () {
  return {
    className: 'card__meta'
  };
})(_templateObject || (_templateObject = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__.default)(["\n  font-size: 1.3rem;\n"])));
var CardTitleLarge = styled_components__WEBPACK_IMPORTED_MODULE_2__.default.h3.attrs(function () {
  return {
    className: 'card__title'
  };
})(_templateObject2 || (_templateObject2 = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_0__.default)(["\n  font-size: 3rem;\n  margin-bottom: 0;\n"])));


/***/ }),

/***/ "./src/components/Card/index.ts":
/*!**************************************!*\
  !*** ./src/components/Card/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Card": () => (/* reexport safe */ _Card__WEBPACK_IMPORTED_MODULE_0__.Card),
/* harmony export */   "CardMetaLarge": () => (/* reexport safe */ _Card__WEBPACK_IMPORTED_MODULE_0__.CardMetaLarge),
/* harmony export */   "CardTitleLarge": () => (/* reexport safe */ _Card__WEBPACK_IMPORTED_MODULE_0__.CardTitleLarge)
/* harmony export */ });
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Card */ "./src/components/Card/Card.tsx");


/***/ }),

/***/ "./src/components/DashboardSection/DashboardSection.tsx":
/*!**************************************************************!*\
  !*** ./src/components/DashboardSection/DashboardSection.tsx ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardSection": () => (/* binding */ DashboardSection)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectWithoutProperties */ "./node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _dashboard_utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../dashboard/utils */ "./src/dashboard/utils/index.ts");
/* harmony import */ var _ApacheChart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../ApacheChart */ "./src/components/ApacheChart/index.ts");
/* harmony import */ var _Card__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Card */ "./src/components/Card/index.ts");
/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Grid */ "./src/components/Grid/index.ts");
/* harmony import */ var _HiddenMediaCaption__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../HiddenMediaCaption */ "./src/components/HiddenMediaCaption/index.ts");
/* harmony import */ var _Section__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Section */ "./src/components/Section/index.ts");











var DashboardSection = function DashboardSection(_ref) {
  var year = _ref.year,
      quarter = _ref.quarter,
      department = _ref.department,
      props = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__.default)(_ref, ["year", "quarter", "department"]);

  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(props.data),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(function () {
    setData((0,_dashboard_utils__WEBPACK_IMPORTED_MODULE_4__.filterDashboardData)(props.data, {
      year: year,
      quarter: quarter,
      department: department
    }));
  }, [props.data.length]);

  var renderChart = function renderChart(chart) {
    if (chart.data && chart.options) {
      var dataset = chart.data(data);
      var options = deepmerge__WEBPACK_IMPORTED_MODULE_2___default()(chart.options, {
        dataset: {
          source: dataset
        }
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ApacheChart__WEBPACK_IMPORTED_MODULE_5__.ApacheChart, {
        options: options,
        height: chart.height || '250px',
        data: data,
        onClick: chart.onClick,
        onHover: chart.onHover,
        onBlur: chart.onBlur
      });
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_ApacheChart__WEBPACK_IMPORTED_MODULE_5__.ApacheChart, {
      demo: true,
      options: {
        title: {
          text: 'THIS IS A DEMO CHART'
        }
      },
      height: "250px",
      data: data,
      onClick: chart.onClick,
      onHover: chart.onHover,
      onBlur: chart.onBlur
    });
  };

  var renderCard = function renderCard(_ref2) {
    var meta = _ref2.meta,
        chart = _ref2.chart,
        content = (0,_babel_runtime_helpers_objectWithoutProperties__WEBPACK_IMPORTED_MODULE_1__.default)(_ref2, ["meta", "chart"]);

    var title = content.title && typeof content.title === 'function' ? content.title(data) : content.title;

    if (meta && !title && !chart) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", {
        key: content.id,
        className: "m-stat__title"
      }, meta);
    }

    var info = content.info && typeof content.info === 'function' ? content.info(data) : content.info;

    if (content.styled) {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Card__WEBPACK_IMPORTED_MODULE_6__.Card, {
        key: content.id
      }, meta ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Card__WEBPACK_IMPORTED_MODULE_6__.CardMetaLarge, null, meta) : null, title ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Card__WEBPACK_IMPORTED_MODULE_6__.CardTitleLarge, null, title) : null, chart ? renderChart(chart) : null, info ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_HiddenMediaCaption__WEBPACK_IMPORTED_MODULE_8__.HiddenMediaCaption, {
        buttonCaption: "Narrative"
      }, info.split('\n').map(function (i, key) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("p", {
          key: "".concat(key)
        }, i);
      })) : null);
    }

    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Card__WEBPACK_IMPORTED_MODULE_6__.Card, {
      key: content.id,
      meta: meta,
      title: title
    }, chart ? renderChart(chart) : null);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Section__WEBPACK_IMPORTED_MODULE_9__.Section, {
    title: props.title,
    id: props.id
  }, !data.length ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement("div", null, "Loading...") : props.grids.map(function (_ref3) {
    var id = _ref3.id,
        columns = _ref3.columns,
        content = _ref3.content,
        className = _ref3.className;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3__.createElement(_Grid__WEBPACK_IMPORTED_MODULE_7__.Grid, {
      key: id,
      columns: columns || 1,
      className: className
    }, content.map(renderCard));
  }));
};



/***/ }),

/***/ "./src/components/DashboardSection/index.ts":
/*!**************************************************!*\
  !*** ./src/components/DashboardSection/index.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DashboardSection": () => (/* reexport safe */ _DashboardSection__WEBPACK_IMPORTED_MODULE_0__.DashboardSection)
/* harmony export */ });
/* harmony import */ var _DashboardSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DashboardSection */ "./src/components/DashboardSection/DashboardSection.tsx");


/***/ }),

/***/ "./src/components/Grid/Grid.tsx":
/*!**************************************!*\
  !*** ./src/components/Grid/Grid.tsx ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Grid": () => (/* binding */ Grid)
/* harmony export */ });
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");



var Grid = function Grid(_ref) {
  var columns = _ref.columns,
      children = _ref.children,
      className = _ref.className;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1__.createElement("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_0___default()("l-".concat(columns, "up"), className)
  }, children);
};

Grid.defaultProps = {
  columns: 3
};


/***/ }),

/***/ "./src/components/Grid/index.ts":
/*!**************************************!*\
  !*** ./src/components/Grid/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Grid": () => (/* reexport safe */ _Grid__WEBPACK_IMPORTED_MODULE_0__.Grid)
/* harmony export */ });
/* harmony import */ var _Grid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Grid */ "./src/components/Grid/Grid.tsx");


/***/ }),

/***/ "./src/components/HiddenMediaCaption/HiddenMediaCaption.tsx":
/*!******************************************************************!*\
  !*** ./src/components/HiddenMediaCaption/HiddenMediaCaption.tsx ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HiddenMediaCaption": () => (/* binding */ HiddenMediaCaption)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/taggedTemplateLiteral */ "./node_modules/@babel/runtime/helpers/esm/taggedTemplateLiteral.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var styled_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! styled-components */ "./node_modules/styled-components/dist/styled-components.browser.esm.js");
/* harmony import */ var _MediaCaption__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../MediaCaption */ "./src/components/MediaCaption/index.ts");



var _templateObject;




var StyledButton = styled_components__WEBPACK_IMPORTED_MODULE_4__.default.button(_templateObject || (_templateObject = (0,_babel_runtime_helpers_taggedTemplateLiteral__WEBPACK_IMPORTED_MODULE_1__.default)(["\n  padding: 0.8rem;\n"])));

var HiddenMediaCaption = function HiddenMediaCaption(props) {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_useState, 2),
      show = _useState2[0],
      setShow = _useState2[1];

  var onHover = function onHover() {
    return setShow(true);
  };

  var onBlur = function onBlur() {
    return setShow(false);
  };

  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement("div", {
    className: "media-caption__hidden"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(StyledButton, {
    className: "button",
    onMouseEnter: onHover,
    onMouseLeave: onBlur
  }, props.buttonCaption), show ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2__.createElement(_MediaCaption__WEBPACK_IMPORTED_MODULE_3__.MediaCaption, null, props.children) : null);
};



/***/ }),

/***/ "./src/components/HiddenMediaCaption/index.ts":
/*!****************************************************!*\
  !*** ./src/components/HiddenMediaCaption/index.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "HiddenMediaCaption": () => (/* reexport safe */ _HiddenMediaCaption__WEBPACK_IMPORTED_MODULE_0__.HiddenMediaCaption)
/* harmony export */ });
/* harmony import */ var _HiddenMediaCaption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./HiddenMediaCaption */ "./src/components/HiddenMediaCaption/HiddenMediaCaption.tsx");


/***/ }),

/***/ "./src/components/MediaCaption/MediaCaption.tsx":
/*!******************************************************!*\
  !*** ./src/components/MediaCaption/MediaCaption.tsx ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaCaption": () => (/* binding */ MediaCaption)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");


var MediaCaption = function MediaCaption(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("figcaption", {
    className: "media-caption"
  }, children);
};



/***/ }),

/***/ "./src/components/MediaCaption/index.ts":
/*!**********************************************!*\
  !*** ./src/components/MediaCaption/index.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MediaCaption": () => (/* reexport safe */ _MediaCaption__WEBPACK_IMPORTED_MODULE_0__.MediaCaption)
/* harmony export */ });
/* harmony import */ var _MediaCaption__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MediaCaption */ "./src/components/MediaCaption/MediaCaption.tsx");


/***/ }),

/***/ "./src/dashboard/Dashboard.tsx":
/*!*************************************!*\
  !*** ./src/dashboard/Dashboard.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var _components_DashboardSection__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/DashboardSection */ "./src/components/DashboardSection/index.ts");
/* harmony import */ var _hooks_data__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hooks/data */ "./src/dashboard/hooks/data.ts");
/* harmony import */ var _utils_dashboards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/dashboards */ "./src/dashboard/utils/dashboards/index.ts");





var Dashboard = function Dashboard() {
  var data = (0,_hooks_data__WEBPACK_IMPORTED_MODULE_2__.useDashboardData)();
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(react__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_DashboardSection__WEBPACK_IMPORTED_MODULE_1__.DashboardSection, {
    id: "finance",
    title: "Finance",
    department: "Finance",
    data: data,
    grids: _utils_dashboards__WEBPACK_IMPORTED_MODULE_3__.financeDashboard
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_DashboardSection__WEBPACK_IMPORTED_MODULE_1__.DashboardSection, {
    id: "hr",
    title: "Human Resources",
    department: "HR",
    data: data,
    grids: _utils_dashboards__WEBPACK_IMPORTED_MODULE_3__.hr
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_DashboardSection__WEBPACK_IMPORTED_MODULE_1__.DashboardSection, {
    id: "project-management",
    title: "Project Management",
    department: "Project management",
    data: data,
    grids: _utils_dashboards__WEBPACK_IMPORTED_MODULE_3__.projectManagement
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_DashboardSection__WEBPACK_IMPORTED_MODULE_1__.DashboardSection, {
    id: "communications",
    title: "Communications",
    department: "Comms and engagement",
    data: data,
    grids: _utils_dashboards__WEBPACK_IMPORTED_MODULE_3__.comms
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_DashboardSection__WEBPACK_IMPORTED_MODULE_1__.DashboardSection, {
    id: "development",
    title: "Development & Fundraising",
    department: "Development and fundraising",
    data: data,
    grids: _utils_dashboards__WEBPACK_IMPORTED_MODULE_3__.fundraising
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(_components_DashboardSection__WEBPACK_IMPORTED_MODULE_1__.DashboardSection, {
    id: "data-systems",
    title: "IT",
    department: "IT systems and data systems",
    data: data,
    grids: _utils_dashboards__WEBPACK_IMPORTED_MODULE_3__.dataSystems
  }));
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Dashboard);

/***/ }),

/***/ "./src/dashboard/hooks/data.ts":
/*!*************************************!*\
  !*** ./src/dashboard/hooks/data.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "useDashboardData": () => (/* binding */ useDashboardData)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");



var useDashboardData = function useDashboardData() {
  var _useState = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)([]),
      _useState2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__.default)(_useState, 2),
      data = _useState2[0],
      setData = _useState2[1];

  (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(function () {
    localforage__WEBPACK_IMPORTED_MODULE_1__.getItem('dashboard.updatedAt').then(function (value) {
      var updatedAt = value && new Date(value);

      if (updatedAt) {
        updatedAt.setHours(updatedAt.getHours() + 1);
      }

      if (updatedAt && Date.now() - updatedAt.getTime() > 60 * 60 || !updatedAt) {
        var dataURL = "".concat(window.location.origin, "/api/dashboard/data/");
        window.fetch(dataURL).then(function (response) {
          return response.json();
        }).then(function (_ref) {
          var data = _ref.data,
              error = _ref.error;

          if (error) {
            console.log('Failed to fetch data:', error);
            return;
          }

          if (data) {
            setData(data);
            localforage__WEBPACK_IMPORTED_MODULE_1__.setItem('dashboard.data', data);
            localforage__WEBPACK_IMPORTED_MODULE_1__.setItem('dashboard.updatedAt', new Date());
          }
        });
      } else {
        localforage__WEBPACK_IMPORTED_MODULE_1__.getItem('dashboard.data').then(function (data) {
          setData(data);
        });
      }
    });
  }, []);
  return data;
};

/***/ }),

/***/ "./src/dashboard/utils/chart/events.ts":
/*!*********************************************!*\
  !*** ./src/dashboard/utils/chart/events.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hideNarrative": () => (/* binding */ hideNarrative),
/* harmony export */   "showNarrative": () => (/* binding */ showNarrative),
/* harmony export */   "getEventHandlers": () => (/* binding */ getEventHandlers)
/* harmony export */ });
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! deepmerge */ "./node_modules/deepmerge/dist/cjs.js");
/* harmony import */ var deepmerge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(deepmerge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! . */ "./src/dashboard/utils/chart/index.ts");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .. */ "./src/dashboard/utils/index.ts");



var hideNarrative = function hideNarrative(chartNode) {
  var parent = chartNode.parentElement;

  if (parent) {
    var narratives = parent.getElementsByClassName('media-caption chart-event-caption');
    Array.prototype.filter.call(narratives, function (narrative) {
      return narrative.remove();
    });
  }
};
var showNarrative = function showNarrative(chartNode, content) {
  var parent = chartNode.parentElement;

  if (parent) {
    hideNarrative(chartNode);
    var caption = document.createElement('figcaption');
    caption.classList.add('media-caption', 'chart-event-caption');
    content.split('\n').forEach(function (note) {
      var paragraph = document.createElement('p');
      paragraph.innerHTML = note;
      caption.appendChild(paragraph);
    });
    parent.appendChild(caption);
  }
};
/**
 * Common handling of events on bar/line charts - click to drilldown & hover to show tooltips
 * @param metrics - Indicators for a particular chart
 * @returns Object with event handlers - onClick, onHover, onBlur
 */

var getEventHandlers = function getEventHandlers(metrics) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var division = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'quarter';
  return {
    onClick: function onClick(_ref) {
      var data = _ref.data,
          chart = _ref.chart,
          params = _ref.params;
      if (!params.data) return;
      var y = params.data.year;
      var source = (0,___WEBPACK_IMPORTED_MODULE_2__.generateObjectDataset)(data.filter(function (_ref2) {
        var metric = _ref2.metric,
            year = _ref2.year;
        return metrics.includes(metric) && y === year;
      }), division);
      (0,___WEBPACK_IMPORTED_MODULE_1__.addChartReverseListener)(chart);
      chart.setOption(deepmerge__WEBPACK_IMPORTED_MODULE_0___default()(options, {
        dataset: {
          source: source,
          dimensions: ['quarter'].concat(metrics)
        }
      }));
    },
    onHover: function onHover(_ref3) {
      var chart = _ref3.chart,
          params = _ref3.params;
      if (!params.data) return;
      var metric = params.seriesName;
      var narrative = params.data["".concat(metric, " - narrative")];

      if (narrative) {
        showNarrative(chart.getDom(), narrative);
      }
    },
    onBlur: function onBlur(_ref4) {
      var chart = _ref4.chart;
      return hideNarrative(chart.getDom());
    }
  };
};

/***/ }),

/***/ "./src/dashboard/utils/chart/index.ts":
/*!********************************************!*\
  !*** ./src/dashboard/utils/chart/index.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getEventHandlers": () => (/* reexport safe */ _events__WEBPACK_IMPORTED_MODULE_1__.getEventHandlers),
/* harmony export */   "hideNarrative": () => (/* reexport safe */ _events__WEBPACK_IMPORTED_MODULE_1__.hideNarrative),
/* harmony export */   "showNarrative": () => (/* reexport safe */ _events__WEBPACK_IMPORTED_MODULE_1__.showNarrative),
/* harmony export */   "colours": () => (/* binding */ colours),
/* harmony export */   "grid": () => (/* binding */ grid),
/* harmony export */   "addChartReverseListener": () => (/* binding */ addChartReverseListener),
/* harmony export */   "tootipFormatter": () => (/* binding */ tootipFormatter),
/* harmony export */   "getBarLabelConfig": () => (/* binding */ getBarLabelConfig)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! .. */ "./src/dashboard/utils/index.ts");
/* harmony import */ var _events__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./events */ "./src/dashboard/utils/chart/events.ts");


var colours = ['#6c120a', '#a21e25', '#cd2b2a', '#dc372d', '#ec6250', '#f6b0a0', '#fbd7cb', '#fce3dc'];
var grid = {
  left: '3%',
  right: '4%',
  bottom: '3%',
  containLabel: true
};
/**
 * Use when updating a chart's options
 * Captures the current options & adds an event listener that will revert to the old options when the canvas is clicked
 * @param chart echarts.ECharts
 */

var addChartReverseListener = function addChartReverseListener(chart) {
  var merge = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var currentOptions = chart.getOption();
  var chartNode = chart.getDom();
  var canvas = chartNode.getElementsByTagName('canvas')[0];

  if (canvas) {
    var onClick = function onClick() {
      chart.setOption(currentOptions, !merge);
      canvas.removeEventListener('click', onClick);
    };

    canvas.addEventListener('click', onClick);
  }
};
var tootipFormatter = function tootipFormatter(_ref) {
  var _ref$prefix = _ref.prefix,
      prefix = _ref$prefix === void 0 ? '' : _ref$prefix,
      _ref$suffix = _ref.suffix,
      suffix = _ref$suffix === void 0 ? '' : _ref$suffix,
      currency = _ref.currency;
  return function (params) {
    var value = params.value,
        seriesName = params.seriesName;
    /* eslint-disable @typescript-eslint/no-explicit-any */

    if (value && seriesName && value[seriesName]) {
      var rawValue = value[seriesName];

      if (typeof rawValue === 'number') {
        rawValue = Math.round(rawValue * 100) / 100;
      }

      var parsedValue = currency ? (0,___WEBPACK_IMPORTED_MODULE_0__.toPounds)(rawValue) : rawValue;
      return "".concat(prefix).concat(parsedValue).concat(suffix);
    }

    return 'No Data';
    /* eslint-enable @typescript-eslint/no-explicit-any */
  };
};
var getBarLabelConfig = function getBarLabelConfig(options) {
  return {
    show: true,
    position: options.position || 'top',

    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    formatter: function formatter(params) {
      var value = params.value[params.dimensionNames[params.encode.y[0]]];

      if (typeof value === 'number') {
        var roundedValue = Math.round(value * 100) / 100;

        var _parsedValue = options.currency ? (0,___WEBPACK_IMPORTED_MODULE_0__.toPounds)(roundedValue) : roundedValue;

        return "".concat(options.prefix || '').concat(_parsedValue).concat(options.suffix || '');
      }

      var parsedValue = options.currency ? (0,___WEBPACK_IMPORTED_MODULE_0__.toPounds)(value) : value;
      return "".concat(options.prefix || '').concat(parsedValue).concat(options.suffix || '');
    }
  };
};

/***/ }),

/***/ "./src/dashboard/utils/dashboards/comms.ts":
/*!*************************************************!*\
  !*** ./src/dashboard/utils/dashboards/comms.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "comms": () => (/* binding */ comms)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./src/dashboard/utils/index.ts");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../chart */ "./src/dashboard/utils/chart/index.ts");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var colours = ['#65093d', '#7e1850', '#9f1459', '#d12568', '#f3a5b6'];
var dashboardMetrics = ['Bounce rate on the website (%)', 'Dwell time on the website (minutes)', 'Overall site SEO score', 'Twitter engagement rate', 'Linkedin engagement rate', 'Proportion of new linkedin followers from target stakeholder groups'];
var comms = [{
  id: '1',
  columns: 3,
  content: [{
    id: 'bounce-rate',
    meta: dashboardMetrics[0],
    styled: true,
    chart: _objectSpread({
      data: function data(_data) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data, Array().concat(dashboardMetrics[0]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            suffix: '%'
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[0])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getBarLabelConfig)({
            suffix: '%'
          })
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[0]))
  }, {
    id: 'dwell-time',
    meta: dashboardMetrics[1],
    styled: true,
    chart: _objectSpread({
      data: function data(_data2) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data2, Array().concat(dashboardMetrics[1]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({})
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[1])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getBarLabelConfig)({})
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[1]))
  }, {
    id: 'seo-score',
    meta: dashboardMetrics[2],
    styled: true,
    chart: _objectSpread({
      data: function data(_data3) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data3, Array().concat(dashboardMetrics[2]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({})
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[2])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getBarLabelConfig)({})
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[2]))
  }, {
    id: 'twitter-engagement',
    meta: dashboardMetrics[3],
    styled: true,
    chart: _objectSpread({
      data: function data(_data4) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data4, Array().concat(dashboardMetrics[3]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            suffix: '%'
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[3])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getBarLabelConfig)({
            suffix: '%'
          })
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[3]))
  }, {
    id: 'linkedin-engagement',
    meta: dashboardMetrics[4],
    styled: true,
    chart: _objectSpread({
      data: function data(_data5) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data5, Array().concat(dashboardMetrics[4]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            suffix: '%'
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[4])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getBarLabelConfig)({
            suffix: '%'
          })
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[4]))
  }]
}, {
  id: '2',
  columns: 1,
  className: 'm-pills',
  content: [{
    id: 'linkedin-followers',
    meta: dashboardMetrics[5],
    styled: true,
    chart: _objectSpread({
      data: function data(_data6) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data6, Array().concat(dashboardMetrics[5]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            suffix: '%'
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[5])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getBarLabelConfig)({
            suffix: '%'
          })
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[5]))
  }]
}];

/***/ }),

/***/ "./src/dashboard/utils/dashboards/dataSystems.ts":
/*!*******************************************************!*\
  !*** ./src/dashboard/utils/dashboards/dataSystems.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "dataSystems": () => (/* binding */ dataSystems)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! .. */ "./src/dashboard/utils/index.ts");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../chart */ "./src/dashboard/utils/chart/index.ts");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var colours = ['#302b2e', '#555053', '#736e73', '#a9a6aa', '#d9d4da'];
var dashboardMetrics = ['Roadmap in place for global Infrastructure with capacity for growth (Progress Indicator)', 'Fully hosted systems with reduced internal reliance (Progress Indicator)', 'Standardised global support (Progress Indicator)'];
var dataSystems = [{
  id: '1',
  columns: 2,
  content: [{
    id: 'global-infrastructure',
    meta: dashboardMetrics[0],
    styled: true,
    chart: _objectSpread({
      data: function data(_data) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data, Array().concat(dashboardMetrics[0]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            suffix: '%'
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[0])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getBarLabelConfig)({
            suffix: '%'
          })
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[0]))
  }, {
    id: 'hosted-systems',
    meta: dashboardMetrics[1],
    styled: true,
    chart: _objectSpread({
      data: function data(_data2) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data2, Array().concat(dashboardMetrics[1]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            suffix: '%'
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[1])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getBarLabelConfig)({
            suffix: '%'
          })
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[1]))
  }, {
    id: 'global-support',
    meta: dashboardMetrics[2],
    styled: true,
    chart: _objectSpread({
      data: function data(_data3) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data3, Array().concat(dashboardMetrics[2]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            suffix: '%'
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[2])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getBarLabelConfig)({
            suffix: '%'
          })
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[2]))
  }]
}];

/***/ }),

/***/ "./src/dashboard/utils/dashboards/finance.ts":
/*!***************************************************!*\
  !*** ./src/dashboard/utils/dashboards/finance.ts ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "financeDashboard": () => (/* binding */ financeDashboard)
/* harmony export */ });
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ */ "./src/dashboard/utils/index.ts");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../chart */ "./src/dashboard/utils/chart/index.ts");


var financeDashboard = [{
  id: '1',
  columns: 2,
  content: [{
    id: 'project-time',
    meta: 'Proportion of staff time spent on projects',
    styled: true,
    chart: {
      data: function data(_data) {
        return (0,___WEBPACK_IMPORTED_MODULE_0__.getAggregatedDatasetSource)(_data, ['Non-Overhead staff', 'All staff']);
      },
      options: {
        color: _chart__WEBPACK_IMPORTED_MODULE_1__.colours,
        tooltip: {
          show: false
        },
        legend: {
          data: ['Non-Overhead staff', 'All staff']
        },
        dataset: {
          dimensions: ['year', 'Non-Overhead staff', 'All staff']
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_1__.grid,
        xAxis: {
          type: 'category',
          boundaryGap: true,
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: Array.from({
          length: 2
        }, function () {
          return {
            type: 'bar',
            label: (0,_chart__WEBPACK_IMPORTED_MODULE_1__.getBarLabelConfig)({
              suffix: '%'
            })
          };
        })
      },
      onClick: function onClick(_ref) {
        var data = _ref.data,
            chart = _ref.chart,
            params = _ref.params;
        if (!params.data) return;
        var y = params.data.year;
        var source = (0,___WEBPACK_IMPORTED_MODULE_0__.generateObjectDataset)(data.filter(function (_ref2) {
          var metric = _ref2.metric,
              year = _ref2.year;
          return (metric === 'Non-Overhead staff' || metric === 'All staff') && y === year;
        }));
        (0,_chart__WEBPACK_IMPORTED_MODULE_1__.addChartReverseListener)(chart);
        var options = {
          legend: {
            data: ['Non-Overhead staff', 'All staff', 'Target']
          },
          dataset: {
            source: source,
            dimensions: ['quarter', 'Non-Overhead staff', 'All staff', 'Target']
          },
          yAxis: {
            type: 'value',
            show: true,
            scale: true,
            splitNumber: 3,
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [{
            type: 'line'
          }, {
            type: 'line'
          }, {
            type: 'line',
            symbol: 'none',
            lineStyle: {
              type: 'dashed',
              color: '#333'
            },
            itemStyle: {
              color: '#333'
            }
          }]
        };
        chart.setOption(options);
      }
    }
  }, {
    id: 'overhead-time',
    meta: 'Proportion of time spent on direct and indirect overheads',
    styled: true,
    chart: {
      data: function data(_data2) {
        return (0,___WEBPACK_IMPORTED_MODULE_0__.getAggregatedDatasetSource)(_data2, ['Direct overheads', 'Indirect overheads']);
      },
      options: {
        color: _chart__WEBPACK_IMPORTED_MODULE_1__.colours,
        tooltip: {
          show: false
        },
        legend: {
          data: ['Direct overheads', 'Indirect overheads']
        },
        dataset: {
          dimensions: ['year', 'Direct overheads', 'Indirect overheads']
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_1__.grid,
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false
        },
        series: Array.from({
          length: 2
        }, function () {
          return {
            type: 'bar',
            label: (0,_chart__WEBPACK_IMPORTED_MODULE_1__.getBarLabelConfig)({
              suffix: '%'
            })
          };
        })
      },
      onClick: function onClick(_ref3) {
        var data = _ref3.data,
            chart = _ref3.chart,
            params = _ref3.params;
        if (!params.data) return;
        var y = params.data.year;
        var source = (0,___WEBPACK_IMPORTED_MODULE_0__.generateObjectDataset)(data.filter(function (_ref4) {
          var metric = _ref4.metric,
              year = _ref4.year;
          return (metric === 'Direct overheads' || metric === 'Indirect overheads') && y === year;
        }));
        (0,_chart__WEBPACK_IMPORTED_MODULE_1__.addChartReverseListener)(chart);
        var options = {
          tooltip: {
            show: true,
            trigger: 'axis'
          },
          legend: {
            data: ['Direct overheads', 'Indirect overheads', 'Target']
          },
          dataset: {
            source: source,
            dimensions: ['quarter', 'Direct overheads', 'Indirect overheads', 'Target']
          },
          yAxis: {
            show: true,
            splitNumber: 3,
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [{
            type: 'bar',
            label: {
              show: false,
              formatter: function formatter() {
                return '';
              }
            }
          }, {
            type: 'bar',
            label: {
              show: false,
              formatter: function formatter() {
                return '';
              }
            }
          }, {
            type: 'line',
            symbol: 'none',
            lineStyle: {
              type: 'dashed',
              color: '#333'
            },
            itemStyle: {
              color: '#333'
            }
          }]
        };
        chart.setOption(options);
      }
    }
  }, {
    id: 'personnel-costs',
    meta: 'Personnel costs as a proporation of income (% of target)',
    styled: true,
    chart: {
      data: function data(_data3) {
        return (0,___WEBPACK_IMPORTED_MODULE_0__.getAggregatedDatasetSource)(_data3, ['Consultants as proportion of income', 'Salary as proportion of income']);
      },
      options: {
        color: _chart__WEBPACK_IMPORTED_MODULE_1__.colours,
        tooltip: {
          show: false
        },
        legend: {
          top: '10%'
        },
        dataset: {
          dimensions: ['year', 'Consultants as proportion of income', 'Salary as proportion of income']
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_1__.grid,
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false
        },

        /* eslint-disable @typescript-eslint/no-explicit-any */
        series: Array.from({
          length: 2
        }, function () {
          return {
            type: 'bar',
            label: (0,_chart__WEBPACK_IMPORTED_MODULE_1__.getBarLabelConfig)({
              suffix: '%'
            })
          };
        })
        /* eslint-enable @typescript-eslint/no-explicit-any */

      },
      onClick: function onClick(_ref5) {
        var data = _ref5.data,
            chart = _ref5.chart,
            params = _ref5.params;
        if (!params.data) return;
        var y = params.data.year;
        var source = (0,___WEBPACK_IMPORTED_MODULE_0__.generateObjectDataset)(data.filter(function (_ref6) {
          var metric = _ref6.metric,
              year = _ref6.year;
          return ['Consultants as proportion of income', 'Salary as proportion of income'].includes(metric) && y === year;
        }));
        (0,_chart__WEBPACK_IMPORTED_MODULE_1__.addChartReverseListener)(chart);
        var options = {
          tooltip: {
            show: false
          },
          dataset: {
            source: source,
            dimensions: ['quarter', 'Consultants as proportion of income', 'Salary as proportion of income']
          },
          grid: _chart__WEBPACK_IMPORTED_MODULE_1__.grid,
          xAxis: {
            type: 'category'
          },
          yAxis: {
            type: 'value',
            splitNumber: 3,
            axisLabel: {
              formatter: '{value}%'
            }
          },
          series: [{
            type: 'bar'
          }, {
            type: 'bar'
          }]
        };
        chart.setOption(options);
      }
    }
  }, {
    id: 'consultant-costs',
    meta: 'Average consultant % for year to date (excl GNR)',
    styled: true,
    chart: {
      data: function data(_data4) {
        return (0,___WEBPACK_IMPORTED_MODULE_0__.getAggregatedDatasetSource)(_data4, ['Average consultant % for year to date (excl GNR)']);
      },
      options: {
        color: _chart__WEBPACK_IMPORTED_MODULE_1__.colours,
        tooltip: {
          show: false
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year', 'Average consultant % for year to date (excl GNR)']
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_1__.grid,
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}%'
          }
        },

        /* eslint-disable @typescript-eslint/no-explicit-any */
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_1__.getBarLabelConfig)({
            suffix: '%'
          })
        }]
        /* eslint-enable @typescript-eslint/no-explicit-any */

      },
      onClick: function onClick(_ref7) {
        var data = _ref7.data,
            chart = _ref7.chart,
            params = _ref7.params;
        if (!params.data) return;
        var y = params.data.year;
        var source = (0,___WEBPACK_IMPORTED_MODULE_0__.generateObjectDataset)(data.filter(function (_ref8) {
          var metric = _ref8.metric,
              year = _ref8.year;
          return ['Average consultant % for year to date (excl GNR)'].includes(metric) && y === year;
        }));
        (0,_chart__WEBPACK_IMPORTED_MODULE_1__.addChartReverseListener)(chart);
        chart.setOption({
          tooltip: {
            show: false
          },
          dataset: {
            source: source,
            dimensions: ['quarter', 'Average consultant % for year to date (excl GNR)']
          }
        });
      }
    }
  }]
}];

/***/ }),

/***/ "./src/dashboard/utils/dashboards/fundraising.ts":
/*!*******************************************************!*\
  !*** ./src/dashboard/utils/dashboards/fundraising.ts ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fundraising": () => (/* binding */ fundraising)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../ */ "./src/dashboard/utils/index.ts");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../chart */ "./src/dashboard/utils/chart/index.ts");


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var colours = ['#42184c', '#632572', '#994d98', '#cb98c4', '#ebcfe5'];
var dashboardMetrics = ['Income secured this quarter', 'Weighted value 50/80% probable pipeline at end of quarter', 'Income at 90% at end of quarter (waiting for agreement to be signed for 2021-2023)', 'Weighted value of 50% & 80% probable pipeline at end of quarter (income 2021-2023)', 'Speculative pipeline value, not weighted (>50% probable)'];
var fundraising = [{
  id: '1',
  columns: 1,
  className: 'm-pills',
  content: [{
    id: 'contract-income',
    meta: 'Total Income Secured (Contracts + Grants)',
    styled: true,
    chart: _objectSpread(_objectSpread({
      height: '300px',
      data: function data(_data) {
        var metricData = _data.filter(function (_ref) {
          var metric = _ref.metric;
          return dashboardMetrics[0].includes(metric);
        });

        var dataAggregateForMetricYear = metricData.reduce(function (prev, curr) {
          var categoryMetric = "".concat(dashboardMetrics[0], " - ").concat(curr.category.trim());

          if (!prev.find(function (item) {
            return item.metric === categoryMetric && item.year === curr.year;
          })) {
            var metricDataForYear = metricData.filter(function (_ref2) {
              var metric = _ref2.metric,
                  year = _ref2.year,
                  category = _ref2.category;
              return metric === curr.metric && year === curr.year && category === curr.category;
            });
            var sum = metricDataForYear.reduce(function (currentSum, curr) {
              return currentSum + curr.value;
            }, 0);
            prev.push(_objectSpread(_objectSpread({}, curr), {}, {
              metric: categoryMetric,
              value: sum
            }));
          }

          return prev;
        }, []);
        return (0,___WEBPACK_IMPORTED_MODULE_1__.generateObjectDataset)(dataAggregateForMetricYear);
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          show: true
        },
        dataset: {
          dimensions: ['year', "".concat(dashboardMetrics[0], " - Contracts"), "".concat(dashboardMetrics[0], " - Grants")]
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          axisLine: {
            show: true
          },
          axisTick: {
            show: true
          },
          axisLabel: {
            formatter: '£{value}'
          }
        },
        series: [{
          type: 'bar',
          barWidth: '30%',
          stack: 'fundraising'
        }, {
          type: 'bar',
          barWidth: '30%',
          stack: 'fundraising'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[0])), {}, {
      onClick: function onClick(_ref3) {
        var data = _ref3.data,
            chart = _ref3.chart,
            params = _ref3.params;
        if (!params.data) return;
        var y = params.data.year;
        var metricData = data.filter(function (_ref4) {
          var metric = _ref4.metric,
              year = _ref4.year;
          return dashboardMetrics[0].includes(metric) && y === year;
        });
        var dataAggregateForMetricYear = metricData.reduce(function (prev, curr) {
          var categoryMetric = "".concat(dashboardMetrics[0], " - ").concat(curr.category.trim());

          if (!prev.find(function (item) {
            return item.metric === categoryMetric;
          })) {
            var metricDataForYear = metricData.filter(function (_ref5) {
              var metric = _ref5.metric,
                  quarter = _ref5.quarter,
                  category = _ref5.category;
              return metric === curr.metric && quarter === curr.quarter && category === curr.category;
            });
            var sum = metricDataForYear.reduce(function (currentSum, curr) {
              return currentSum + curr.value;
            }, 0);
            prev.push(_objectSpread(_objectSpread({}, curr), {}, {
              metric: categoryMetric,
              value: sum
            }));
          } else {
            prev.push(_objectSpread(_objectSpread({}, curr), {}, {
              metric: categoryMetric
            }));
          }

          return prev;
        }, []);
        var source = (0,___WEBPACK_IMPORTED_MODULE_1__.generateObjectDataset)(dataAggregateForMetricYear);
        (0,_chart__WEBPACK_IMPORTED_MODULE_2__.addChartReverseListener)(chart);
        chart.setOption({
          dataset: {
            source: source,
            dimensions: ['quarter', "".concat(dashboardMetrics[0], " - Contracts"), "".concat(dashboardMetrics[0], " - Grants")]
          }
        });
      }
    })
  }]
}, {
  id: '0',
  columns: 1,
  className: 'pt-20',
  content: [{
    id: 'contracts',
    meta: 'Contracts'
  }]
}, {
  id: '2',
  columns: 2,
  content: [{
    id: 'contract-weighted',
    meta: dashboardMetrics[1],
    styled: true,
    chart: _objectSpread({
      data: function data(_data2) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data2, Array().concat(dashboardMetrics[1]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            currency: true
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[1])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 3,
          axisLabel: {
            formatter: '£{value}'
          }
        },
        series: [{
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[1]))
  }, {
    id: 'income-secured',
    meta: 'Income Secured From Contracts (Target £1.2M)',
    styled: true,
    chart: _objectSpread({
      data: function data(_data3) {
        var categoryMetric = 'Contracts';

        var metricData = _data3.filter(function (_ref6) {
          var metric = _ref6.metric,
              category = _ref6.category;
          return dashboardMetrics[0].includes(metric) && category === categoryMetric;
        });

        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(metricData, Array().concat(dashboardMetrics[0]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            currency: true
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[0])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 3,
          axisLabel: {
            formatter: '£{value}'
          }
        },
        series: [{
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[0]))
  }]
}, {
  id: '3',
  columns: 1,
  content: [{
    id: 'grants',
    meta: 'Grants'
  }]
}, {
  id: '4',
  columns: 2,
  content: [{
    id: 'income-secured',
    meta: 'Income Secured From Grants (Target £2.5m)',
    styled: true,
    chart: _objectSpread({
      data: function data(_data4) {
        var categoryMetric = 'Grants';

        var metricData = _data4.filter(function (_ref7) {
          var metric = _ref7.metric,
              category = _ref7.category;
          return dashboardMetrics[0].includes(metric) && category === categoryMetric;
        });

        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(metricData, Array().concat(dashboardMetrics[0]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            currency: true
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[0])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 3,
          axisLabel: {
            formatter: '£{value}'
          }
        },
        series: [{
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[0]))
  }, {
    id: 'grant-income',
    meta: 'Income at 90% at end of quarter',
    styled: true,
    chart: _objectSpread({
      data: function data(_data5) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data5, Array().concat(dashboardMetrics[2]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            currency: true
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[2])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 3,
          axisLabel: {
            formatter: '£{value}'
          }
        },
        series: [{
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[2]))
  }, {
    id: 'weighted-value',
    meta: dashboardMetrics[3],
    styled: true,
    chart: _objectSpread({
      data: function data(_data6) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data6, Array().concat(dashboardMetrics[3]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            currency: true
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[3])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 3,
          axisLabel: {
            formatter: '£{value}'
          }
        },
        series: [{
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[3]))
  }, {
    id: 'speculative-pileline-value',
    meta: dashboardMetrics[4],
    styled: true,
    chart: _objectSpread({
      data: function data(_data7) {
        return (0,___WEBPACK_IMPORTED_MODULE_1__.getAggregatedDatasetSource)(_data7, Array().concat(dashboardMetrics[4]));
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: (0,_chart__WEBPACK_IMPORTED_MODULE_2__.tootipFormatter)({
            currency: true
          })
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[4])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_2__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 3,
          axisLabel: {
            formatter: '£{value}'
          }
        },
        series: [{
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_2__.getEventHandlers)(dashboardMetrics[4]))
  }]
}];

/***/ }),

/***/ "./src/dashboard/utils/dashboards/hr.ts":
/*!**********************************************!*\
  !*** ./src/dashboard/utils/dashboards/hr.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hr": () => (/* binding */ hr)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../ */ "./src/dashboard/utils/index.ts");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chart */ "./src/dashboard/utils/chart/index.ts");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var colours = ['#0c457b', '#0071b1', '#4397d3', '#00538e', '#88bae5', '#0089cc']; // shades of blue

var dashboardMetrics = [['Total Staff', 'Total leavers in the period (Voluntary)', 'Total leavers in the period (Planned)'], 'Staffing against budget', 'Staffing budget as a %age of org budget (65% ceiling)', 'Stability Index'];
var hr = [{
  id: '1',
  columns: 2,
  content: [{
    id: 'staff',
    meta: 'Ratio of Staff to Leavers',
    styled: true,
    chart: _objectSpread({
      data: function data(_data) {
        var metricData = _data.filter(function (_ref) {
          var metric = _ref.metric;
          return dashboardMetrics[0].includes(metric);
        });

        var dataAggregateForMetricYear = metricData.reduce(function (prev, curr) {
          if (!prev.find(function (item) {
            return item.metric === curr.metric && item.year === curr.year;
          })) {
            var metricDataForYear = metricData.filter(function (_ref2) {
              var metric = _ref2.metric,
                  year = _ref2.year;
              return metric === curr.metric && year === curr.year;
            });

            if (curr.metric === 'Total Staff') {
              var max = Math.max.apply(Math, (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__.default)(metricDataForYear.map(function (item) {
                return item.value;
              })));
              prev.push(_objectSpread(_objectSpread({}, curr), {}, {
                value: max
              }));
            } else {
              var sum = metricDataForYear.reduce(function (currentSum, curr) {
                return currentSum + curr.value;
              }, 0);
              prev.push(_objectSpread(_objectSpread({}, curr), {}, {
                value: sum
              }));
            }
          }

          return prev;
        }, []);
        return (0,___WEBPACK_IMPORTED_MODULE_2__.generateObjectDataset)(dataAggregateForMetricYear);
      },
      options: {
        color: colours,
        tooltip: {
          trigger: 'axis'
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[0])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          splitNumber: 3
        },
        series: [{
          type: 'bar',
          stack: 'hr'
        }, {
          type: 'bar',
          stack: 'hr'
        }, {
          type: 'bar',
          stack: 'hr'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)(dashboardMetrics[0]))
  }, {
    id: 'stability',
    meta: 'Stability Index',
    styled: true,
    chart: _objectSpread({
      data: function data(_data2) {
        return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(_data2, [dashboardMetrics[3]]);
      },
      options: {
        color: colours,
        tooltip: {
          show: false,
          trigger: 'axis'
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[3])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3
        },

        /* eslint-disable @typescript-eslint/no-explicit-any */
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getBarLabelConfig)({})
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)(dashboardMetrics[3]))
  }].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_1__.default)([{
    id: 'gender-pay-mean',
    meta: 'Gender Pay Gap (Mean) UK'
  }, {
    id: 'gender-pay-median',
    meta: 'Gender Pay Gap (Median) UK'
  }].map(function (_ref3) {
    var id = _ref3.id,
        meta = _ref3.meta;
    return {
      id: id,
      meta: meta,
      styled: true,
      chart: _objectSpread({
        data: function data(_data3) {
          return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(_data3, [meta]);
        },
        options: {
          color: colours,
          tooltip: {
            trigger: 'item'
          },
          legend: {
            show: false
          },
          dataset: {
            dimensions: ['year', meta]
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {
                show: true
              }
            }
          },
          xAxis: {
            type: 'category',
            position: 'top'
          },
          yAxis: {
            type: 'value',
            scale: true,
            splitNumber: 1
          },
          series: [{
            type: 'bar',
            label: (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getBarLabelConfig)({
              position: 'bottom'
            })
          }]
        }
      }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)(meta))
    };
  })), [{
    id: 'staffing-budget',
    meta: 'Staffing against budget',
    styled: true,
    chart: _objectSpread({
      data: function data(_data4) {
        return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(_data4, [dashboardMetrics[1]]);
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          show: true
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[1], 'Target')
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getBarLabelConfig)({
            currency: true,
            suffix: 'm'
          }),
          barGap: '-100%'
        }, {
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)([dashboardMetrics[1], 'Target'], {
      series: [{}, {
        type: 'line',
        symbol: 'none',
        lineStyle: {
          type: 'dashed',
          color: '#333'
        },
        itemStyle: {
          color: '#333'
        },
        silent: true
      }]
    }))
  }, {
    id: 'staffing-budget-vs-org-budget',
    meta: 'Staffing budget as a %age of org budget (65% ceiling)',
    styled: true,
    chart: _objectSpread({
      data: function data(_data5) {
        return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(_data5, [dashboardMetrics[2]]);
      },
      options: {
        color: colours,
        tooltip: {
          show: false,
          trigger: 'axis'
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year'].concat(dashboardMetrics[2])
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getBarLabelConfig)({
            suffix: '%'
          })
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)(dashboardMetrics[2]))
  }, {
    id: 'sick-days',
    meta: 'Total Sick Days',
    styled: true,
    chart: _objectSpread({
      data: function data(_data6) {
        var monthlyData = _data6.filter(function (_ref4) {
          var metric = _ref4.metric,
              quarter = _ref4.quarter;
          return metric === 'Total Sick Days' && ___WEBPACK_IMPORTED_MODULE_2__.fullMonths.includes(quarter);
        });

        return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(monthlyData, ['Total Sick Days'], 'sum', 'month');
      },
      options: {
        color: colours,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year', 'Total Sick Days']
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
            interval: 1
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 3
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getBarLabelConfig)({})
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)('Total Sick Days', {
      yAxis: {
        show: false
      }
    }, 'month'))
  }, {
    id: 'sick-days-staff',
    meta: 'Number of Staff Who logged Sick days per period of sickness',
    styled: true,
    chart: _objectSpread({
      data: function data(_data7) {
        var monthlyData = _data7.filter(function (_ref5) {
          var metric = _ref5.metric,
              quarter = _ref5.quarter;
          return metric === 'No. Staff Logged Sick days/ periods of sickness' && ___WEBPACK_IMPORTED_MODULE_2__.fullMonths.includes(quarter);
        });

        return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(monthlyData, ['No. Staff Logged Sick days/ periods of sickness'], 'sum', 'month');
      },
      options: {
        color: colours,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year', 'No. Staff Logged Sick days/ periods of sickness']
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          show: true,
          feature: {
            saveAsImage: {
              show: true
            }
          }
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true,
            interval: 1
          }
        },
        yAxis: {
          type: 'value',
          splitNumber: 3
        },
        series: [{
          type: 'bar',
          label: (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getBarLabelConfig)({})
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)('No. Staff Logged Sick days/ periods of sickness', {
      yAxis: {
        show: false
      }
    }, 'month'))
  }])
}];

/***/ }),

/***/ "./src/dashboard/utils/dashboards/index.ts":
/*!*************************************************!*\
  !*** ./src/dashboard/utils/dashboards/index.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "financeDashboard": () => (/* reexport safe */ _finance__WEBPACK_IMPORTED_MODULE_0__.financeDashboard),
/* harmony export */   "hr": () => (/* reexport safe */ _hr__WEBPACK_IMPORTED_MODULE_1__.hr),
/* harmony export */   "projectManagement": () => (/* reexport safe */ _pm__WEBPACK_IMPORTED_MODULE_2__.projectManagement),
/* harmony export */   "comms": () => (/* reexport safe */ _comms__WEBPACK_IMPORTED_MODULE_3__.comms),
/* harmony export */   "fundraising": () => (/* reexport safe */ _fundraising__WEBPACK_IMPORTED_MODULE_4__.fundraising),
/* harmony export */   "dataSystems": () => (/* reexport safe */ _dataSystems__WEBPACK_IMPORTED_MODULE_5__.dataSystems)
/* harmony export */ });
/* harmony import */ var _finance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./finance */ "./src/dashboard/utils/dashboards/finance.ts");
/* harmony import */ var _hr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./hr */ "./src/dashboard/utils/dashboards/hr.ts");
/* harmony import */ var _pm__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pm */ "./src/dashboard/utils/dashboards/pm.ts");
/* harmony import */ var _comms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./comms */ "./src/dashboard/utils/dashboards/comms.ts");
/* harmony import */ var _fundraising__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fundraising */ "./src/dashboard/utils/dashboards/fundraising.ts");
/* harmony import */ var _dataSystems__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./dataSystems */ "./src/dashboard/utils/dashboards/dataSystems.ts");







/***/ }),

/***/ "./src/dashboard/utils/dashboards/pm.ts":
/*!**********************************************!*\
  !*** ./src/dashboard/utils/dashboards/pm.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectManagement": () => (/* binding */ projectManagement)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! .. */ "./src/dashboard/utils/index.ts");
/* harmony import */ var _chart__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../chart */ "./src/dashboard/utils/chart/index.ts");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }



var colours = ['#07482e', '#1e8259', '#005b3e', '#5ab88a', '#c5e1cb'];
var dashboardMetrics = ['Ranking on IATI dashboard (suggest move from top 10% to top 5%)', ['# active projects DIPR', '# active projects DII'], ['Number of projects with On track status', 'Number of projects with Warning status', 'Number of projects with High risk status'], ['% projects overspending', '% projects underspending', '% projects on track']];
var projectManagement = [{
  id: '1',
  columns: 2,
  content: [{
    id: 'iati-ranking',
    meta: dashboardMetrics[0],
    styled: true,
    chart: _objectSpread({
      data: function data(_data) {
        return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(_data, [dashboardMetrics[0]]);
      },
      options: {
        color: colours,
        tooltip: {
          show: false,
          trigger: 'axis'
        },
        legend: {
          show: false
        },
        dataset: {
          dimensions: ['year', dashboardMetrics[0]]
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: false,
          splitNumber: 3
        },
        series: [{
          type: 'bar',
          label: {
            show: true,
            position: 'top',

            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            formatter: function formatter(params) {
              return "".concat(params.value[params.dimensionNames[params.encode.y[0]]], "%");
            }
          }
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)(dashboardMetrics[0]))
  }, {
    id: 'active-projects',
    meta: 'Active Projects DIPR vs DII',
    styled: true,
    chart: _objectSpread({
      data: function data(_data2) {
        return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(_data2, dashboardMetrics[1]);
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          show: true
        },
        dataset: {
          dimensions: ['year'].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.default)(dashboardMetrics[1]))
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 3
        },
        series: [{
          type: 'bar'
        }, {
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)(dashboardMetrics[1]))
  }, {
    id: 'project-status',
    meta: 'Project Status',
    styled: true,
    chart: _objectSpread({
      data: function data(_data3) {
        return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(_data3, dashboardMetrics[2]);
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          show: true
        },
        dataset: {
          dimensions: ['year'].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.default)(dashboardMetrics[2]))
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 3
        },
        series: [{
          type: 'bar'
        }, {
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)(dashboardMetrics[2]))
  }, {
    id: 'project-spending',
    meta: 'Project Spending',
    styled: true,
    chart: _objectSpread({
      data: function data(_data4) {
        return (0,___WEBPACK_IMPORTED_MODULE_2__.getAggregatedDatasetSource)(_data4, dashboardMetrics[3]);
      },
      options: {
        color: colours,
        tooltip: {
          show: true,
          trigger: 'axis'
        },
        legend: {
          show: true
        },
        dataset: {
          dimensions: ['year'].concat((0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__.default)(dashboardMetrics[3]))
        },
        grid: _chart__WEBPACK_IMPORTED_MODULE_3__.grid,
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          type: 'value',
          show: true,
          splitNumber: 3,
          axisLabel: {
            formatter: '{value}%'
          }
        },
        series: [{
          type: 'bar'
        }, {
          type: 'bar'
        }]
      }
    }, (0,_chart__WEBPACK_IMPORTED_MODULE_3__.getEventHandlers)(dashboardMetrics[3]))
  }]
}];

/***/ }),

/***/ "./src/dashboard/utils/index.ts":
/*!**************************************!*\
  !*** ./src/dashboard/utils/index.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fullMonths": () => (/* binding */ fullMonths),
/* harmony export */   "getQuarterYear": () => (/* binding */ getQuarterYear),
/* harmony export */   "getMonthYear": () => (/* binding */ getMonthYear),
/* harmony export */   "generateObjectDataset": () => (/* binding */ generateObjectDataset),
/* harmony export */   "generateArrayDataset": () => (/* binding */ generateArrayDataset),
/* harmony export */   "filterDashboardData": () => (/* binding */ filterDashboardData),
/* harmony export */   "toPounds": () => (/* binding */ toPounds),
/* harmony export */   "getAggregatedDatasetSource": () => (/* binding */ getAggregatedDatasetSource)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/toConsumableArray */ "./node_modules/@babel/runtime/helpers/esm/toConsumableArray.js");




function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

// determines whether to split x-axis dates by month or quarter
var fullMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
var getQuarterYear = function getQuarterYear(dateString) {
  try {
    var date = new Date(dateString);
    var quarter = Math.floor((date.getMonth() + 3) / 3);
    return [quarter, date.getFullYear()];
  } catch (error) {
    return [0, 0];
  }
};
var getMonthYear = function getMonthYear(dateString) {
  try {
    var date = new Date(dateString);
    return [months[date.getMonth()], date.getFullYear()];
  } catch (error) {
    return ['', 0];
  }
};

var getAnnualTargetFromData = function getAnnualTargetFromData(data, metric, date) {
  var year = new Date(date).getFullYear();
  var annualData = data.find(function (item) {
    return metric === item.metric && item.year === year && item.quarter === 'Annual';
  });
  return annualData && annualData.target || null;
};

var generateObjectDataset = function generateObjectDataset(data) {
  var division = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'quarter';

  // extract unique metrics & dates
  var metrics = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__.default)(new Set(data.map(function (_ref) {
    var metric = _ref.metric;
    return metric;
  })));

  var dates = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__.default)(new Set(data.map(function (_ref2) {
    var date = _ref2.date;
    return date;
  }))).sort();

  return dates.reduce(function (prev, date) {
    var _ref3 = division === 'quarter' ? getQuarterYear(date) : getMonthYear(date),
        _ref4 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__.default)(_ref3, 2),
        quarterMonth = _ref4[0],
        year = _ref4[1];

    var quarter = division === 'quarter' ? "".concat(year, " Q").concat(quarterMonth) : quarterMonth;
    var matchingDataset = prev.find(function (_dataset) {
      return _dataset.quarter === quarter;
    });
    var dataset = matchingDataset || {
      quarter: quarter,
      year: year
    };
    metrics.forEach(function (metric) {
      var matchingData = data.find(function (item) {
        return item.date === date && metric === item.metric;
      });

      if (matchingData) {
        if (matchingDataset) {
          dataset[metric] += matchingData.value;
        } else {
          dataset[metric] = matchingData.value;
        }

        if (matchingData.target) {
          dataset['Target'] = matchingData.target;
        } else {
          var target = getAnnualTargetFromData(data, metric, date);

          if (target) {
            dataset['Target'] = target;
          }
        }

        if (matchingData.narrative) {
          dataset["".concat(metric, " - narrative")] = matchingData.narrative;
        }
      }
    });
    if (!matchingDataset) prev.push(dataset);
    return prev;
  }, []);
};
var generateArrayDataset = function generateArrayDataset(data) {
  // extract unique metrics & dates
  var metrics = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__.default)(new Set(data.map(function (_ref5) {
    var metric = _ref5.metric;
    return metric;
  })));

  var dates = (0,_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_2__.default)(new Set(data.map(function (_ref6) {
    var date = _ref6.date;
    return date;
  })));

  var dataset = metrics.map(function (metric) {
    return new Array(metric).concat(dates.map(function (date) {
      var matchingData = data.find(function (item) {
        return item.date === date && metric === item.metric;
      });
      return matchingData ? matchingData.value : 0;
    }));
  });
  return [new Array('metric').concat(dates.map(function (date) {
    var _getQuarterYear = getQuarterYear(date),
        _getQuarterYear2 = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__.default)(_getQuarterYear, 2),
        quarter = _getQuarterYear2[0],
        year = _getQuarterYear2[1];

    return "".concat(year, " Q").concat(quarter);
  }))].concat(dataset);
};
var filterDashboardData = function filterDashboardData(data, _ref7) {
  var year = _ref7.year,
      quarter = _ref7.quarter,
      department = _ref7.department;
  return data.filter(function (row) {
    return department ? row.department === department : true;
  }).filter(function (row) {
    if (year && !quarter) {
      return row.year === year;
    }

    if (quarter && !year) {
      return row.quarter === "Q".concat(quarter);
    }

    if (year && quarter) {
      return row.year === year && row.quarter === "Q".concat(quarter);
    }

    return true;
  });
};
var toPounds = function toPounds(value) {
  var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'GBP'
  });
  return formatter.format(value);
};
var getAggregatedDatasetSource = function getAggregatedDatasetSource(data, metrics) {
  var aggregation = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'average';
  var division = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'quarter';
  var metricData = data.filter(function (_ref8) {
    var metric = _ref8.metric;
    return metrics.includes(metric);
  });
  var dataAggregateForMetricYear = metricData.reduce(function (prev, curr) {
    if (!prev.find(function (item) {
      return item.metric === curr.metric && item.year === curr.year;
    })) {
      var metricDataForYear = metricData.filter(function (_ref9) {
        var metric = _ref9.metric,
            year = _ref9.year,
            value = _ref9.value;
        return metric === curr.metric && year === curr.year && typeof value === 'number';
      });
      var sum = metricDataForYear.reduce(function (currentSum, curr) {
        return currentSum + curr.value;
      }, 0);

      if (aggregation === 'average') {
        var average = sum / metricDataForYear.length;
        prev.push(_objectSpread(_objectSpread({}, curr), {}, {
          value: average,
          quarter: '',
          narrative: ''
        })); // TODO: add actual narratives for year
      } else {
        prev.push(_objectSpread(_objectSpread({}, curr), {}, {
          value: sum,
          quarter: '',
          narrative: ''
        })); // TODO: add actual narratives for year
      }
    }

    return prev;
  }, []);
  return generateObjectDataset(dataAggregateForMetricYear, division);
};

/***/ }),

/***/ "./src/utils/echarts.ts":
/*!******************************!*\
  !*** ./src/utils/echarts.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "defaultOptions": () => (/* binding */ defaultOptions)
/* harmony export */ });
var defaultOptions = {
  legend: {
    top: 10,
    textStyle: {
      fontFamily: 'Geomanist Regular,sans-serif'
    }
  },
  tooltip: {
    trigger: 'axis',
    textStyle: {
      fontFamily: 'Geomanist Regular,sans-serif'
    }
  },
  toolbox: {
    showTitle: false,
    feature: {
      saveAsImage: {
        title: 'Save as image',
        pixelRatio: 2
      }
    },
    right: 20,
    tooltip: {
      show: true,
      textStyle: {
        fontFamily: 'Geomanist Regular,sans-serif',
        formatter: function formatter(param) {
          return "<div>".concat(param.title, "</div>"); // user-defined DOM structure
        }
      }
    }
  },
  xAxis: {
    axisLabel: {
      fontFamily: 'Geomanist Regular,sans-serif',
      fontSize: 13
    },
    splitLine: {
      show: false
    }
  },
  yAxis: {
    axisLabel: {
      fontFamily: 'Geomanist Regular,sans-serif',
      fontSize: 13
    },
    splitLine: {
      show: false
    }
  }
};

/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vc3JjL2NvbXBvbmVudHMvQXBhY2hlQ2hhcnQvQXBhY2hlQ2hhcnQudHN4Iiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9zcmMvY29tcG9uZW50cy9BcGFjaGVDaGFydC91dGlscy9pbmRleC50cyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vc3JjL2NvbXBvbmVudHMvQ2FyZC9DYXJkLnRzeCIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vc3JjL2NvbXBvbmVudHMvRGFzaGJvYXJkU2VjdGlvbi9EYXNoYm9hcmRTZWN0aW9uLnRzeCIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vc3JjL2NvbXBvbmVudHMvR3JpZC9HcmlkLnRzeCIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vc3JjL2NvbXBvbmVudHMvSGlkZGVuTWVkaWFDYXB0aW9uL0hpZGRlbk1lZGlhQ2FwdGlvbi50c3giLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL3NyYy9jb21wb25lbnRzL01lZGlhQ2FwdGlvbi9NZWRpYUNhcHRpb24udHN4Iiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9zcmMvZGFzaGJvYXJkL0Rhc2hib2FyZC50c3giLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL3NyYy9kYXNoYm9hcmQvaG9va3MvZGF0YS50cyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vc3JjL2Rhc2hib2FyZC91dGlscy9jaGFydC9ldmVudHMudHMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL3NyYy9kYXNoYm9hcmQvdXRpbHMvY2hhcnQvaW5kZXgudHMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL3NyYy9kYXNoYm9hcmQvdXRpbHMvZGFzaGJvYXJkcy9jb21tcy50cyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vc3JjL2Rhc2hib2FyZC91dGlscy9kYXNoYm9hcmRzL2RhdGFTeXN0ZW1zLnRzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9zcmMvZGFzaGJvYXJkL3V0aWxzL2Rhc2hib2FyZHMvZmluYW5jZS50cyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vc3JjL2Rhc2hib2FyZC91dGlscy9kYXNoYm9hcmRzL2Z1bmRyYWlzaW5nLnRzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9zcmMvZGFzaGJvYXJkL3V0aWxzL2Rhc2hib2FyZHMvaHIudHMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL3NyYy9kYXNoYm9hcmQvdXRpbHMvZGFzaGJvYXJkcy9pbmRleC50cyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vc3JjL2Rhc2hib2FyZC91dGlscy9kYXNoYm9hcmRzL3BtLnRzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9zcmMvZGFzaGJvYXJkL3V0aWxzL2luZGV4LnRzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9zcmMvdXRpbHMvZWNoYXJ0cy50cyJdLCJuYW1lcyI6WyJTdHlsZWRDaGFydCIsInN0eWxlZCIsIkFwYWNoZUNoYXJ0IiwicHJvcHMiLCJlbGVtZW50IiwidXNlUmVmIiwidXNlU3RhdGUiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsInVzZUVmZmVjdCIsImN1cnJlbnQiLCJkZW1vIiwidHlwZSIsIm1ha2VCYXNpY0xpbmVDaGFydCIsInJlbmRlckJhc2ljQ29sdW1uQ2hhcnQiLCJyZW5kZXJCYXNpY1BpZUNoYXJ0IiwicmVuZGVyQ2hhcnQiLCJvcHRpb25zIiwidGhlbiIsImNoYXJ0Iiwib25DbGljayIsIm9uIiwicGFyYW1zIiwiZGF0YSIsIm9uSG92ZXIiLCJvbkJsdXIiLCJjbGFzc05hbWVzIiwiaGVpZ2h0IiwiZGVmYXVsdFByb3BzIiwibG9hZEFwYWNoZUNoYXJ0cyIsImVjaGFydHMiLCJCYXJDaGFydCIsIkxpbmVDaGFydCIsIlBpZUNoYXJ0IiwiVGl0bGVDb21wb25lbnQiLCJUb29sdGlwQ29tcG9uZW50IiwiR3JpZENvbXBvbmVudCIsIkxlZ2VuZENvbXBvbmVudCIsIkRhdGFzZXRDb21wb25lbnQiLCJDYW52YXNSZW5kZXJlciIsInVzZSIsIm5vZGUiLCJvcHRpb24iLCJpbml0Iiwic2V0T3B0aW9uIiwiZGVlcG1lcmdlIiwiZGVmYXVsdE9wdGlvbnMiLCJjb2xvciIsImNvbG91cnMiLCJ0b29sdGlwIiwidHJpZ2dlciIsImxlZ2VuZCIsImdyaWQiLCJsZWZ0IiwicmlnaHQiLCJib3R0b20iLCJjb250YWluTGFiZWwiLCJ0b29sYm94IiwiZmVhdHVyZSIsInNhdmVBc0ltYWdlIiwieEF4aXMiLCJ5QXhpcyIsInNlcmllcyIsIm5hbWUiLCJzdGVwIiwiZGF0YXNldCIsImRpbWVuc2lvbnMiLCJzb3VyY2UiLCJwcm9kdWN0IiwidG9wIiwic2hvdyIsIm1hcmsiLCJkYXRhVmlldyIsInJlYWRPbmx5IiwicmVzdG9yZSIsInJhZGl1cyIsImNlbnRlciIsImxhYmVsIiwidmFsdWUiLCJDYXJkIiwibWV0YSIsInRpdGxlIiwiY2hpbGRyZW4iLCJDYXJkTWV0YUxhcmdlIiwiY2xhc3NOYW1lIiwiQ2FyZFRpdGxlTGFyZ2UiLCJEYXNoYm9hcmRTZWN0aW9uIiwieWVhciIsInF1YXJ0ZXIiLCJkZXBhcnRtZW50Iiwic2V0RGF0YSIsImZpbHRlckRhc2hib2FyZERhdGEiLCJsZW5ndGgiLCJ0ZXh0IiwicmVuZGVyQ2FyZCIsImNvbnRlbnQiLCJpZCIsImluZm8iLCJzcGxpdCIsIm1hcCIsImkiLCJrZXkiLCJncmlkcyIsImNvbHVtbnMiLCJHcmlkIiwiU3R5bGVkQnV0dG9uIiwiSGlkZGVuTWVkaWFDYXB0aW9uIiwic2V0U2hvdyIsImJ1dHRvbkNhcHRpb24iLCJNZWRpYUNhcHRpb24iLCJEYXNoYm9hcmQiLCJ1c2VEYXNoYm9hcmREYXRhIiwiZmluYW5jZURhc2hib2FyZCIsImh1bWFuUmVzb3VyY2VzRGFzaGJvYXJkIiwicHJvamVjdE1hbmFnZW1lbnQiLCJjb21tcyIsImZ1bmRyYWlzaW5nIiwiZGF0YVN5c3RlbXMiLCJsb2NhbGZvcmFnZSIsInVwZGF0ZWRBdCIsIkRhdGUiLCJzZXRIb3VycyIsImdldEhvdXJzIiwibm93IiwiZ2V0VGltZSIsImRhdGFVUkwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsIm9yaWdpbiIsImZldGNoIiwicmVzcG9uc2UiLCJqc29uIiwiZXJyb3IiLCJjb25zb2xlIiwibG9nIiwiaGlkZU5hcnJhdGl2ZSIsImNoYXJ0Tm9kZSIsInBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJuYXJyYXRpdmVzIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsIkFycmF5IiwicHJvdG90eXBlIiwiZmlsdGVyIiwiY2FsbCIsIm5hcnJhdGl2ZSIsInJlbW92ZSIsInNob3dOYXJyYXRpdmUiLCJjYXB0aW9uIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZm9yRWFjaCIsIm5vdGUiLCJwYXJhZ3JhcGgiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImdldEV2ZW50SGFuZGxlcnMiLCJtZXRyaWNzIiwiZGl2aXNpb24iLCJ5IiwiZ2VuZXJhdGVPYmplY3REYXRhc2V0IiwibWV0cmljIiwiaW5jbHVkZXMiLCJhZGRDaGFydFJldmVyc2VMaXN0ZW5lciIsImNvbmNhdCIsInNlcmllc05hbWUiLCJnZXREb20iLCJtZXJnZSIsImN1cnJlbnRPcHRpb25zIiwiZ2V0T3B0aW9uIiwiY2FudmFzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsInRvb3RpcEZvcm1hdHRlciIsInByZWZpeCIsInN1ZmZpeCIsImN1cnJlbmN5IiwicmF3VmFsdWUiLCJNYXRoIiwicm91bmQiLCJwYXJzZWRWYWx1ZSIsInRvUG91bmRzIiwiZ2V0QmFyTGFiZWxDb25maWciLCJwb3NpdGlvbiIsImZvcm1hdHRlciIsImRpbWVuc2lvbk5hbWVzIiwiZW5jb2RlIiwicm91bmRlZFZhbHVlIiwiZGFzaGJvYXJkTWV0cmljcyIsImdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlIiwic3BsaXROdW1iZXIiLCJheGlzTGFiZWwiLCJib3VuZGFyeUdhcCIsImF4aXNUaWNrIiwiYWxpZ25XaXRoTGFiZWwiLCJmcm9tIiwic2NhbGUiLCJzeW1ib2wiLCJsaW5lU3R5bGUiLCJpdGVtU3R5bGUiLCJtZXRyaWNEYXRhIiwiZGF0YUFnZ3JlZ2F0ZUZvck1ldHJpY1llYXIiLCJyZWR1Y2UiLCJwcmV2IiwiY3VyciIsImNhdGVnb3J5TWV0cmljIiwiY2F0ZWdvcnkiLCJ0cmltIiwiZmluZCIsIml0ZW0iLCJtZXRyaWNEYXRhRm9yWWVhciIsInN1bSIsImN1cnJlbnRTdW0iLCJwdXNoIiwiYXhpc0xpbmUiLCJiYXJXaWR0aCIsInN0YWNrIiwiaHIiLCJtYXgiLCJiYXJHYXAiLCJzaWxlbnQiLCJtb250aGx5RGF0YSIsImZ1bGxNb250aHMiLCJpbnRlcnZhbCIsIm1vbnRocyIsImdldFF1YXJ0ZXJZZWFyIiwiZGF0ZVN0cmluZyIsImRhdGUiLCJmbG9vciIsImdldE1vbnRoIiwiZ2V0RnVsbFllYXIiLCJnZXRNb250aFllYXIiLCJnZXRBbm51YWxUYXJnZXRGcm9tRGF0YSIsImFubnVhbERhdGEiLCJ0YXJnZXQiLCJTZXQiLCJkYXRlcyIsInNvcnQiLCJxdWFydGVyTW9udGgiLCJtYXRjaGluZ0RhdGFzZXQiLCJfZGF0YXNldCIsIm1hdGNoaW5nRGF0YSIsImdlbmVyYXRlQXJyYXlEYXRhc2V0Iiwicm93IiwiSW50bCIsIk51bWJlckZvcm1hdCIsInN0eWxlIiwiZm9ybWF0IiwiYWdncmVnYXRpb24iLCJhdmVyYWdlIiwidGV4dFN0eWxlIiwiZm9udEZhbWlseSIsInNob3dUaXRsZSIsInBpeGVsUmF0aW8iLCJwYXJhbSIsImZvbnRTaXplIiwic3BsaXRMaW5lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBRUE7QUFjQSxJQUFNQSxXQUFXLEdBQUdDLDBEQUFILHNLQUFqQjs7QUFJQSxJQUFNQyxXQUFnRCxHQUFHLFNBQW5EQSxXQUFtRCxDQUFDQyxLQUFELEVBQVc7QUFDbEUsTUFBTUMsT0FBTyxHQUFHQyw2Q0FBTSxDQUFpQixJQUFqQixDQUF0Qjs7QUFEa0Usa0JBRXBDQywrQ0FBUSxDQUFDLElBQUQsQ0FGNEI7QUFBQTtBQUFBLE1BRTNEQyxPQUYyRDtBQUFBLE1BRWxEQyxVQUZrRDs7QUFJbEVDLGtEQUFTLENBQUMsWUFBTTtBQUNkLFFBQUlMLE9BQU8sQ0FBQ00sT0FBWixFQUFxQjtBQUNuQixVQUFJUCxLQUFLLENBQUNRLElBQVYsRUFBZ0I7QUFDZCxnQkFBUVIsS0FBSyxDQUFDUyxJQUFkO0FBQ0UsZUFBSyxNQUFMO0FBQ0VDLHNFQUFrQixDQUFDVCxPQUFPLENBQUNNLE9BQVQsQ0FBbEI7QUFDQTs7QUFDRixlQUFLLEtBQUw7QUFDRUksMEVBQXNCLENBQUNWLE9BQU8sQ0FBQ00sT0FBVCxDQUF0QjtBQUNBOztBQUNGLGVBQUssS0FBTDtBQUNFSyx1RUFBbUIsQ0FBQ1gsT0FBTyxDQUFDTSxPQUFULENBQW5CO0FBQ0E7O0FBQ0Y7QUFDRTtBQVhKO0FBYUQsT0FkRCxNQWNPO0FBQ0xNLDJEQUFXLENBQUNaLE9BQU8sQ0FBQ00sT0FBVCxFQUFrQlAsS0FBSyxDQUFDYyxPQUF4QixDQUFYLENBQTRDQyxJQUE1QyxDQUFpRCxVQUFDQyxLQUFELEVBQVc7QUFDMURYLG9CQUFVLENBQUMsS0FBRCxDQUFWO0FBQ0E7O0FBQ0EsY0FBSUwsS0FBSyxDQUFDaUIsT0FBVixFQUFtQjtBQUNqQkQsaUJBQUssQ0FBQ0UsRUFBTixDQUFTLE9BQVQsRUFBa0IsVUFBQ0MsTUFBRCxFQUFxQjtBQUNyQ25CLG1CQUFLLENBQUNpQixPQUFOLENBQWU7QUFBRUcsb0JBQUksRUFBRXBCLEtBQUssQ0FBQ29CLElBQWQ7QUFBb0JKLHFCQUFLLEVBQUxBLEtBQXBCO0FBQTJCRyxzQkFBTSxFQUFOQTtBQUEzQixlQUFmO0FBQ0QsYUFGRDtBQUdEOztBQUNELGNBQUluQixLQUFLLENBQUNxQixPQUFWLEVBQW1CO0FBQ2pCTCxpQkFBSyxDQUFDRSxFQUFOLENBQVMsV0FBVCxFQUFzQixVQUFDQyxNQUFELEVBQXFCO0FBQ3pDbkIsbUJBQUssQ0FBQ3FCLE9BQU4sQ0FBZTtBQUFFRCxvQkFBSSxFQUFFcEIsS0FBSyxDQUFDb0IsSUFBZDtBQUFvQkoscUJBQUssRUFBTEEsS0FBcEI7QUFBMkJHLHNCQUFNLEVBQU5BO0FBQTNCLGVBQWY7QUFDRCxhQUZEO0FBR0Q7O0FBQ0QsY0FBSW5CLEtBQUssQ0FBQ3NCLE1BQVYsRUFBa0I7QUFDaEJOLGlCQUFLLENBQUNFLEVBQU4sQ0FBUyxVQUFULEVBQXFCLFVBQUNDLE1BQUQsRUFBcUI7QUFDeENuQixtQkFBSyxDQUFDc0IsTUFBTixDQUFjO0FBQUVGLG9CQUFJLEVBQUVwQixLQUFLLENBQUNvQixJQUFkO0FBQW9CSixxQkFBSyxFQUFMQSxLQUFwQjtBQUEyQkcsc0JBQU0sRUFBTkE7QUFBM0IsZUFBZDtBQUNELGFBRkQ7QUFHRDtBQUNEOztBQUNELFNBbkJEO0FBb0JEO0FBQ0Y7QUFDRixHQXZDUSxFQXVDTixFQXZDTSxDQUFUO0FBeUNBLHNCQUNFO0FBQUssYUFBUyxFQUFFSSxpREFBVSxDQUFDLHVDQUFELEVBQTBDO0FBQUUsa0NBQTRCbkI7QUFBOUIsS0FBMUM7QUFBMUIsa0JBQ0UsaURBQUMsV0FBRDtBQUFhLGFBQVMsRUFBQztBQUF2QixrQkFDRTtBQUFLLE9BQUcsRUFBRUgsT0FBVjtBQUFtQixTQUFLLEVBQUU7QUFBRXVCLFlBQU0sRUFBRXhCLEtBQUssQ0FBQ3dCO0FBQWhCO0FBQTFCLElBREYsRUFFR3BCLE9BQU8sZ0JBQ047QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDRTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNFLDZEQURGLGVBRUUsNkRBRkYsZUFHRSw2REFIRixlQUlFLDZEQUpGLENBREYsQ0FETSxHQVNKLElBWE4sQ0FERixDQURGO0FBaUJELENBOUREOztBQWdFQUwsV0FBVyxDQUFDMEIsWUFBWixHQUEyQjtBQUN6QkQsUUFBTSxFQUFFLE9BRGlCO0FBRXpCZixNQUFJLEVBQUU7QUFGbUIsQ0FBM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDdEZBO0FBQ0E7QUFDQTs7QUFFQSxJQUFNaUIsZ0JBQWdCO0FBQUEsbUxBQUc7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0Qsa2lCQURDOztBQUFBO0FBQ2pCQyxtQkFEaUI7QUFBQTtBQUFBLG1CQUV5Qix1cUJBRnpCOztBQUFBO0FBQUE7QUFFZkMsb0JBRmUsaUJBRWZBLFFBRmU7QUFFTEMscUJBRkssaUJBRUxBLFNBRks7QUFFTUMsb0JBRk4saUJBRU1BLFFBRk47QUFBQTtBQUFBLG1CQUc4RSxvbEJBSDlFOztBQUFBO0FBQUE7QUFHZkMsMEJBSGUsa0JBR2ZBLGNBSGU7QUFHQ0MsNEJBSEQsa0JBR0NBLGdCQUhEO0FBR21CQyx5QkFIbkIsa0JBR21CQSxhQUhuQjtBQUdrQ0MsMkJBSGxDLGtCQUdrQ0EsZUFIbEM7QUFHbURDLDRCQUhuRCxrQkFHbURBLGdCQUhuRDtBQUFBO0FBQUEsbUJBTVUsbVZBTlY7O0FBQUE7QUFBQTtBQU1mQywwQkFOZSxrQkFNZkEsY0FOZTtBQVF2QlQsbUJBQU8sQ0FBQ1UsR0FBUixDQUFZLENBQ1ZOLGNBRFUsRUFFVkMsZ0JBRlUsRUFHVkMsYUFIVSxFQUlWQyxlQUpVLEVBS1ZDLGdCQUxVLEVBTVZQLFFBTlUsRUFPVkMsU0FQVSxFQVFWQyxRQVJVLEVBU1ZNLGNBVFUsQ0FBWjtBQVJ1Qiw2Q0FvQmhCVCxPQXBCZ0I7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBaEJELGdCQUFnQjtBQUFBO0FBQUE7QUFBQSxHQUF0Qjs7QUF1Qk8sSUFBTWIsV0FBVztBQUFBLG9MQUFHLGtCQUFPeUIsSUFBUCxFQUE2QkMsTUFBN0I7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ0ZiLGdCQUFnQixFQURkOztBQUFBO0FBQUE7QUFDakJjLGdCQURpQix5QkFDakJBLElBRGlCO0FBRW5CeEIsaUJBRm1CLEdBRU13QixJQUFJLENBQUNGLElBQUQsQ0FGVixFQUV5Qjs7QUFDbER0QixpQkFBSyxDQUFDeUIsU0FBTixDQUFnQkMsZ0RBQVMsQ0FBQ0MsMERBQUQsRUFBaUJKLE1BQWpCLENBQXpCLEVBSHlCLENBR2tDOztBQUhsQyw4Q0FLbEJ2QixLQUxrQjs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFYSCxXQUFXO0FBQUE7QUFBQTtBQUFBLEdBQWpCO0FBUUEsSUFBTUgsa0JBQWtCO0FBQUEsb0xBQUcsa0JBQU80QixJQUFQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNUWixnQkFBZ0IsRUFEUDs7QUFBQTtBQUFBO0FBQ3hCYyxnQkFEd0IsMEJBQ3hCQSxJQUR3QjtBQUUxQnhCLGlCQUYwQixHQUVsQndCLElBQUksQ0FBQ0YsSUFBRCxDQUZjO0FBRzFCQyxrQkFIMEIsR0FHSztBQUNuQ0ssbUJBQUssRUFBRUMsMkRBRDRCO0FBRW5DQyxxQkFBTyxFQUFFO0FBQ1BDLHVCQUFPLEVBQUU7QUFERixlQUYwQjtBQUtuQ0Msb0JBQU0sRUFBRTtBQUNONUIsb0JBQUksRUFBRSxDQUFDLFlBQUQsRUFBZSxhQUFmLEVBQThCLFVBQTlCO0FBREEsZUFMMkI7QUFRbkM2QixrQkFBSSxFQUFFO0FBQ0pDLG9CQUFJLEVBQUUsSUFERjtBQUVKQyxxQkFBSyxFQUFFLElBRkg7QUFHSkMsc0JBQU0sRUFBRSxJQUhKO0FBSUpDLDRCQUFZLEVBQUU7QUFKVixlQVI2QjtBQWNuQ0MscUJBQU8sRUFBRTtBQUNQQyx1QkFBTyxFQUFFO0FBQ1BDLDZCQUFXLEVBQUU7QUFETjtBQURGLGVBZDBCO0FBbUJuQ0MsbUJBQUssRUFBRTtBQUNMaEQsb0JBQUksRUFBRSxVQUREO0FBRUxXLG9CQUFJLEVBQUUsQ0FBQyxLQUFELEVBQVEsS0FBUixFQUFlLEtBQWYsRUFBc0IsS0FBdEIsRUFBNkIsS0FBN0IsRUFBb0MsS0FBcEMsRUFBMkMsS0FBM0M7QUFGRCxlQW5CNEI7QUF1Qm5Dc0MsbUJBQUssRUFBRTtBQUNMakQsb0JBQUksRUFBRTtBQURELGVBdkI0QjtBQTBCbkNrRCxvQkFBTSxFQUFFLENBQ047QUFDRUMsb0JBQUksRUFBRSxZQURSO0FBRUVuRCxvQkFBSSxFQUFFLE1BRlI7QUFHRW9ELG9CQUFJLEVBQUUsT0FIUjtBQUlFekMsb0JBQUksRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixFQUFyQixFQUF5QixHQUF6QixFQUE4QixHQUE5QjtBQUpSLGVBRE0sRUFPTjtBQUNFd0Msb0JBQUksRUFBRSxhQURSO0FBRUVuRCxvQkFBSSxFQUFFLE1BRlI7QUFHRW9ELG9CQUFJLEVBQUUsUUFIUjtBQUlFekMsb0JBQUksRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQjtBQUpSLGVBUE0sRUFhTjtBQUNFd0Msb0JBQUksRUFBRSxVQURSO0FBRUVuRCxvQkFBSSxFQUFFLE1BRlI7QUFHRW9ELG9CQUFJLEVBQUUsS0FIUjtBQUlFekMsb0JBQUksRUFBRSxDQUFDLEdBQUQsRUFBTSxHQUFOLEVBQVcsR0FBWCxFQUFnQixHQUFoQixFQUFxQixHQUFyQixFQUEwQixHQUExQixFQUErQixHQUEvQjtBQUpSLGVBYk07QUExQjJCLGFBSEw7QUFrRGhDSixpQkFBSyxDQUFDeUIsU0FBTixDQUFnQkMsZ0RBQVMsQ0FBQ0MsMERBQUQsRUFBaUJKLE1BQWpCLENBQXpCLEVBbERnQyxDQWtEMkI7O0FBbEQzQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFsQjdCLGtCQUFrQjtBQUFBO0FBQUE7QUFBQSxHQUF4QjtBQXFEQSxJQUFNQyxzQkFBc0I7QUFBQSxvTEFBRyxrQkFBTzJCLElBQVA7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBQ2JaLGdCQUFnQixFQURIOztBQUFBO0FBQUE7QUFDNUJjLGdCQUQ0QiwwQkFDNUJBLElBRDRCO0FBRTlCeEIsaUJBRjhCLEdBRXRCd0IsSUFBSSxDQUFDRixJQUFELENBRmtCO0FBRzlCQyxrQkFIOEIsR0FHQztBQUNuQ0ssbUJBQUssRUFBRUMsMkRBRDRCO0FBRW5DRyxvQkFBTSxFQUFFLEVBRjJCO0FBR25DRixxQkFBTyxFQUFFLEVBSDBCO0FBSW5DZ0IscUJBQU8sRUFBRTtBQUNQQywwQkFBVSxFQUFFLENBQUMsU0FBRCxFQUFZLE1BQVosRUFBb0IsTUFBcEIsRUFBNEIsTUFBNUIsQ0FETDtBQUVQQyxzQkFBTSxFQUFFLENBQ047QUFBRUMseUJBQU8sRUFBRSxjQUFYO0FBQTJCLDBCQUFRLElBQW5DO0FBQXlDLDBCQUFRLElBQWpEO0FBQXVELDBCQUFRO0FBQS9ELGlCQURNLEVBRU47QUFBRUEseUJBQU8sRUFBRSxVQUFYO0FBQXVCLDBCQUFRLElBQS9CO0FBQXFDLDBCQUFRLElBQTdDO0FBQW1ELDBCQUFRO0FBQTNELGlCQUZNLEVBR047QUFBRUEseUJBQU8sRUFBRSxjQUFYO0FBQTJCLDBCQUFRLElBQW5DO0FBQXlDLDBCQUFRLElBQWpEO0FBQXVELDBCQUFRO0FBQS9ELGlCQUhNLEVBSU47QUFBRUEseUJBQU8sRUFBRSxnQkFBWDtBQUE2QiwwQkFBUSxJQUFyQztBQUEyQywwQkFBUSxJQUFuRDtBQUF5RCwwQkFBUTtBQUFqRSxpQkFKTTtBQUZELGVBSjBCO0FBYW5DUixtQkFBSyxFQUFFO0FBQUVoRCxvQkFBSSxFQUFFO0FBQVIsZUFiNEI7QUFjbkNpRCxtQkFBSyxFQUFFLEVBZDRCO0FBZW5DO0FBQ0E7QUFDQUMsb0JBQU0sRUFBRSxDQUFDO0FBQUVsRCxvQkFBSSxFQUFFO0FBQVIsZUFBRCxFQUFrQjtBQUFFQSxvQkFBSSxFQUFFO0FBQVIsZUFBbEIsRUFBbUM7QUFBRUEsb0JBQUksRUFBRTtBQUFSLGVBQW5DO0FBakIyQixhQUhEO0FBc0JwQ08saUJBQUssQ0FBQ3lCLFNBQU4sQ0FBZ0JDLGdEQUFTLENBQUNDLDBEQUFELEVBQWlCSixNQUFqQixDQUF6QixFQXRCb0MsQ0FzQnVCOztBQXRCdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsR0FBSDs7QUFBQSxrQkFBdEI1QixzQkFBc0I7QUFBQTtBQUFBO0FBQUEsR0FBNUI7QUF5QkEsSUFBTUMsbUJBQW1CO0FBQUEsb0xBQUcsa0JBQU8wQixJQUFQO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLG1CQUNWWixnQkFBZ0IsRUFETjs7QUFBQTtBQUFBO0FBQ3pCYyxnQkFEeUIsMEJBQ3pCQSxJQUR5QjtBQUUzQnhCLGlCQUYyQixHQUVuQndCLElBQUksQ0FBQ0YsSUFBRCxDQUZlO0FBRzNCQyxrQkFIMkIsR0FHSTtBQUNuQ0ssbUJBQUssRUFBRUMsMkRBRDRCO0FBRW5DRyxvQkFBTSxFQUFFO0FBQ05rQixtQkFBRyxFQUFFO0FBREMsZUFGMkI7QUFLbkNaLHFCQUFPLEVBQUU7QUFDUGEsb0JBQUksRUFBRSxJQURDO0FBRVBaLHVCQUFPLEVBQUU7QUFDUGEsc0JBQUksRUFBRTtBQUFFRCx3QkFBSSxFQUFFO0FBQVIsbUJBREM7QUFFUEUsMEJBQVEsRUFBRTtBQUFFRix3QkFBSSxFQUFFLElBQVI7QUFBY0csNEJBQVEsRUFBRTtBQUF4QixtQkFGSDtBQUdQQyx5QkFBTyxFQUFFO0FBQUVKLHdCQUFJLEVBQUU7QUFBUixtQkFIRjtBQUlQWCw2QkFBVyxFQUFFO0FBQUVXLHdCQUFJLEVBQUU7QUFBUjtBQUpOO0FBRkYsZUFMMEI7QUFjbkNWLG1CQUFLLEVBQUU7QUFBRVUsb0JBQUksRUFBRTtBQUFSLGVBZDRCO0FBZW5DVCxtQkFBSyxFQUFFO0FBQUVTLG9CQUFJLEVBQUU7QUFBUixlQWY0QjtBQWdCbkNSLG9CQUFNLEVBQUUsQ0FDTjtBQUNFQyxvQkFBSSxFQUFFLE1BRFI7QUFFRW5ELG9CQUFJLEVBQUUsS0FGUjtBQUdFK0Qsc0JBQU0sRUFBRSxLQUhWO0FBSUVDLHNCQUFNLEVBQUUsQ0FBQyxLQUFELEVBQVEsS0FBUixDQUpWO0FBS0VDLHFCQUFLLEVBQUU7QUFDTFAsc0JBQUksRUFBRTtBQURELGlCQUxUO0FBUUUvQyxvQkFBSSxFQUFFLENBQ0o7QUFBRXVELHVCQUFLLEVBQUUsRUFBVDtBQUFhZixzQkFBSSxFQUFFO0FBQW5CLGlCQURJLEVBRUo7QUFBRWUsdUJBQUssRUFBRSxFQUFUO0FBQWFmLHNCQUFJLEVBQUU7QUFBbkIsaUJBRkksRUFHSjtBQUFFZSx1QkFBSyxFQUFFLEVBQVQ7QUFBYWYsc0JBQUksRUFBRTtBQUFuQixpQkFISSxFQUlKO0FBQUVlLHVCQUFLLEVBQUUsRUFBVDtBQUFhZixzQkFBSSxFQUFFO0FBQW5CLGlCQUpJO0FBUlIsZUFETTtBQWhCMkIsYUFISjtBQXFDakM1QyxpQkFBSyxDQUFDeUIsU0FBTixDQUFnQkMsZ0RBQVMsQ0FBQ0MsMERBQUQsRUFBaUJKLE1BQWpCLENBQXpCLEVBckNpQyxDQXFDMEI7O0FBckMxQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxHQUFIOztBQUFBLGtCQUFuQjNCLG1CQUFtQjtBQUFBO0FBQUE7QUFBQSxHQUF6QixDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqSFA7QUFDQTs7QUFPQSxJQUFNZ0UsSUFBa0MsR0FBRyxTQUFyQ0EsSUFBcUMsQ0FBQzVFLEtBQUQsRUFBVztBQUNwRCxzQkFDRTtBQUFLLGFBQVMsRUFBQztBQUFmLGtCQUNFO0FBQUssYUFBUyxFQUFDO0FBQWYsS0FDR0EsS0FBSyxDQUFDNkUsSUFBTixnQkFBYTtBQUFNLGFBQVMsRUFBQztBQUFoQixLQUE4QjdFLEtBQUssQ0FBQzZFLElBQXBDLENBQWIsR0FBZ0UsSUFEbkUsRUFFRzdFLEtBQUssQ0FBQzhFLEtBQU4sZ0JBQWM7QUFBSSxhQUFTLEVBQUM7QUFBZCxLQUE2QjlFLEtBQUssQ0FBQzhFLEtBQW5DLENBQWQsR0FBK0QsSUFGbEUsRUFHRzlFLEtBQUssQ0FBQytFLFFBSFQsQ0FERixDQURGO0FBU0QsQ0FWRDs7QUFZTyxJQUFNQyxhQUFhLEdBQUdsRixpRUFBQSxDQUFrQjtBQUFBLFNBQU87QUFBRW1GLGFBQVMsRUFBRTtBQUFiLEdBQVA7QUFBQSxDQUFsQixDQUFILDRKQUFuQjtBQUlBLElBQU1DLGNBQWMsR0FBR3BGLCtEQUFBLENBQWdCO0FBQUEsU0FBTztBQUFFbUYsYUFBUyxFQUFFO0FBQWIsR0FBUDtBQUFBLENBQWhCLENBQUgsaUxBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hCUDtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQVlBLElBQU1FLGdCQUEwRCxHQUFHLFNBQTdEQSxnQkFBNkQsT0FBNkM7QUFBQSxNQUExQ0MsSUFBMEMsUUFBMUNBLElBQTBDO0FBQUEsTUFBcENDLE9BQW9DLFFBQXBDQSxPQUFvQztBQUFBLE1BQTNCQyxVQUEyQixRQUEzQkEsVUFBMkI7QUFBQSxNQUFadEYsS0FBWTs7QUFBQSxrQkFDdEZHLCtDQUFRLENBQUNILEtBQUssQ0FBQ29CLElBQVAsQ0FEOEU7QUFBQTtBQUFBLE1BQ3ZHQSxJQUR1RztBQUFBLE1BQ2pHbUUsT0FEaUc7O0FBRTlHakYsa0RBQVMsQ0FBQyxZQUFNO0FBQ2RpRixXQUFPLENBQUNDLHFFQUFtQixDQUFDeEYsS0FBSyxDQUFDb0IsSUFBUCxFQUFhO0FBQUVnRSxVQUFJLEVBQUpBLElBQUY7QUFBUUMsYUFBTyxFQUFQQSxPQUFSO0FBQWlCQyxnQkFBVSxFQUFWQTtBQUFqQixLQUFiLENBQXBCLENBQVA7QUFDRCxHQUZRLEVBRU4sQ0FBQ3RGLEtBQUssQ0FBQ29CLElBQU4sQ0FBV3FFLE1BQVosQ0FGTSxDQUFUOztBQUlBLE1BQU01RSxXQUFXLEdBQUcsU0FBZEEsV0FBYyxDQUFDRyxLQUFELEVBQTJCO0FBQzdDLFFBQUlBLEtBQUssQ0FBQ0ksSUFBTixJQUFjSixLQUFLLENBQUNGLE9BQXhCLEVBQWlDO0FBQy9CLFVBQU1nRCxPQUFPLEdBQUc5QyxLQUFLLENBQUNJLElBQU4sQ0FBV0EsSUFBWCxDQUFoQjtBQUNBLFVBQU1OLE9BQU8sR0FBRzRCLGdEQUFTLENBQUMxQixLQUFLLENBQUNGLE9BQVAsRUFBZ0I7QUFBRWdELGVBQU8sRUFBRTtBQUFFRSxnQkFBTSxFQUFFRjtBQUFWO0FBQVgsT0FBaEIsQ0FBekI7QUFFQSwwQkFDRSxpREFBQyxxREFBRDtBQUNFLGVBQU8sRUFBRWhELE9BRFg7QUFFRSxjQUFNLEVBQUVFLEtBQUssQ0FBQ1EsTUFBTixJQUFnQixPQUYxQjtBQUdFLFlBQUksRUFBRUosSUFIUjtBQUlFLGVBQU8sRUFBRUosS0FBSyxDQUFDQyxPQUpqQjtBQUtFLGVBQU8sRUFBRUQsS0FBSyxDQUFDSyxPQUxqQjtBQU1FLGNBQU0sRUFBRUwsS0FBSyxDQUFDTTtBQU5oQixRQURGO0FBVUQ7O0FBRUQsd0JBQ0UsaURBQUMscURBQUQ7QUFDRSxVQUFJLE1BRE47QUFFRSxhQUFPLEVBQUU7QUFBRXdELGFBQUssRUFBRTtBQUFFWSxjQUFJLEVBQUU7QUFBUjtBQUFULE9BRlg7QUFHRSxZQUFNLEVBQUMsT0FIVDtBQUlFLFVBQUksRUFBRXRFLElBSlI7QUFLRSxhQUFPLEVBQUVKLEtBQUssQ0FBQ0MsT0FMakI7QUFNRSxhQUFPLEVBQUVELEtBQUssQ0FBQ0ssT0FOakI7QUFPRSxZQUFNLEVBQUVMLEtBQUssQ0FBQ007QUFQaEIsTUFERjtBQVdELEdBNUJEOztBQThCQSxNQUFNcUUsVUFBVSxHQUFHLFNBQWJBLFVBQWEsUUFBbUQ7QUFBQSxRQUFoRGQsSUFBZ0QsU0FBaERBLElBQWdEO0FBQUEsUUFBMUM3RCxLQUEwQyxTQUExQ0EsS0FBMEM7QUFBQSxRQUFoQzRFLE9BQWdDOztBQUNwRSxRQUFNZCxLQUFLLEdBQUdjLE9BQU8sQ0FBQ2QsS0FBUixJQUFpQixPQUFPYyxPQUFPLENBQUNkLEtBQWYsS0FBeUIsVUFBMUMsR0FBdURjLE9BQU8sQ0FBQ2QsS0FBUixDQUFjMUQsSUFBZCxDQUF2RCxHQUE2RXdFLE9BQU8sQ0FBQ2QsS0FBbkc7O0FBQ0EsUUFBSUQsSUFBSSxJQUFJLENBQUNDLEtBQVQsSUFBa0IsQ0FBQzlELEtBQXZCLEVBQThCO0FBQzVCLDBCQUNFO0FBQUssV0FBRyxFQUFFNEUsT0FBTyxDQUFDQyxFQUFsQjtBQUFzQixpQkFBUyxFQUFDO0FBQWhDLFNBQ0doQixJQURILENBREY7QUFLRDs7QUFDRCxRQUFNaUIsSUFBSSxHQUFHRixPQUFPLENBQUNFLElBQVIsSUFBZ0IsT0FBT0YsT0FBTyxDQUFDRSxJQUFmLEtBQXdCLFVBQXhDLEdBQXFERixPQUFPLENBQUNFLElBQVIsQ0FBYTFFLElBQWIsQ0FBckQsR0FBMEV3RSxPQUFPLENBQUNFLElBQS9GOztBQUVBLFFBQUlGLE9BQU8sQ0FBQzlGLE1BQVosRUFBb0I7QUFDbEIsMEJBQ0UsaURBQUMsdUNBQUQ7QUFBTSxXQUFHLEVBQUU4RixPQUFPLENBQUNDO0FBQW5CLFNBQ0doQixJQUFJLGdCQUFHLGlEQUFDLGdEQUFELFFBQWdCQSxJQUFoQixDQUFILEdBQTJDLElBRGxELEVBRUdDLEtBQUssZ0JBQUcsaURBQUMsaURBQUQsUUFBaUJBLEtBQWpCLENBQUgsR0FBOEMsSUFGdEQsRUFHRzlELEtBQUssR0FBR0gsV0FBVyxDQUFDRyxLQUFELENBQWQsR0FBd0IsSUFIaEMsRUFJRzhFLElBQUksZ0JBQ0gsaURBQUMsbUVBQUQ7QUFBb0IscUJBQWEsRUFBQztBQUFsQyxTQUNHQSxJQUFJLENBQUNDLEtBQUwsQ0FBVyxJQUFYLEVBQWlCQyxHQUFqQixDQUFxQixVQUFDQyxDQUFELEVBQUlDLEdBQUo7QUFBQSw0QkFDcEI7QUFBRyxhQUFHLFlBQUtBLEdBQUw7QUFBTixXQUFtQkQsQ0FBbkIsQ0FEb0I7QUFBQSxPQUFyQixDQURILENBREcsR0FNRCxJQVZOLENBREY7QUFjRDs7QUFFRCx3QkFDRSxpREFBQyx1Q0FBRDtBQUFNLFNBQUcsRUFBRUwsT0FBTyxDQUFDQyxFQUFuQjtBQUF1QixVQUFJLEVBQUVoQixJQUE3QjtBQUFtQyxXQUFLLEVBQUVDO0FBQTFDLE9BQ0c5RCxLQUFLLEdBQUdILFdBQVcsQ0FBQ0csS0FBRCxDQUFkLEdBQXdCLElBRGhDLENBREY7QUFLRCxHQWpDRDs7QUFtQ0Esc0JBQ0UsaURBQUMsNkNBQUQ7QUFBUyxTQUFLLEVBQUVoQixLQUFLLENBQUM4RSxLQUF0QjtBQUE2QixNQUFFLEVBQUU5RSxLQUFLLENBQUM2RjtBQUF2QyxLQUNHLENBQUN6RSxJQUFJLENBQUNxRSxNQUFOLGdCQUNDLDJFQURELEdBR0N6RixLQUFLLENBQUNtRyxLQUFOLENBQVlILEdBQVosQ0FBZ0I7QUFBQSxRQUFHSCxFQUFILFNBQUdBLEVBQUg7QUFBQSxRQUFPTyxPQUFQLFNBQU9BLE9BQVA7QUFBQSxRQUFnQlIsT0FBaEIsU0FBZ0JBLE9BQWhCO0FBQUEsUUFBeUJYLFNBQXpCLFNBQXlCQSxTQUF6QjtBQUFBLHdCQUNkLGlEQUFDLHVDQUFEO0FBQU0sU0FBRyxFQUFFWSxFQUFYO0FBQWUsYUFBTyxFQUFFTyxPQUFPLElBQUksQ0FBbkM7QUFBc0MsZUFBUyxFQUFFbkI7QUFBakQsT0FDR1csT0FBTyxDQUFDSSxHQUFSLENBQVlMLFVBQVosQ0FESCxDQURjO0FBQUEsR0FBaEIsQ0FKSixDQURGO0FBYUQsQ0FwRkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBOztBQU9BLElBQU1VLElBQWtDLEdBQUcsU0FBckNBLElBQXFDLE9BQXNDO0FBQUEsTUFBbkNELE9BQW1DLFFBQW5DQSxPQUFtQztBQUFBLE1BQTFCckIsUUFBMEIsUUFBMUJBLFFBQTBCO0FBQUEsTUFBaEJFLFNBQWdCLFFBQWhCQSxTQUFnQjtBQUMvRSxzQkFBTztBQUFLLGFBQVMsRUFBRTFELGlEQUFVLGFBQU02RSxPQUFOLFNBQW1CbkIsU0FBbkI7QUFBMUIsS0FBMERGLFFBQTFELENBQVA7QUFDRCxDQUZEOztBQUlBc0IsSUFBSSxDQUFDNUUsWUFBTCxHQUFvQjtBQUNsQjJFLFNBQU8sRUFBRTtBQURTLENBQXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNaQTtBQUNBO0FBQ0E7QUFLQSxJQUFNRSxZQUFZLEdBQUd4Ryw2REFBSCwwSkFBbEI7O0FBSUEsSUFBTXlHLGtCQUFxRCxHQUFHLFNBQXhEQSxrQkFBd0QsQ0FBQ3ZHLEtBQUQsRUFBVztBQUFBLGtCQUMvQ0csK0NBQVEsQ0FBQyxLQUFELENBRHVDO0FBQUE7QUFBQSxNQUNoRWdFLElBRGdFO0FBQUEsTUFDMURxQyxPQUQwRDs7QUFHdkUsTUFBTW5GLE9BQU8sR0FBRyxTQUFWQSxPQUFVO0FBQUEsV0FBTW1GLE9BQU8sQ0FBQyxJQUFELENBQWI7QUFBQSxHQUFoQjs7QUFDQSxNQUFNbEYsTUFBTSxHQUFHLFNBQVRBLE1BQVM7QUFBQSxXQUFNa0YsT0FBTyxDQUFDLEtBQUQsQ0FBYjtBQUFBLEdBQWY7O0FBRUEsc0JBQ0U7QUFBSyxhQUFTLEVBQUM7QUFBZixrQkFDRSxpREFBQyxZQUFEO0FBQWMsYUFBUyxFQUFDLFFBQXhCO0FBQWlDLGdCQUFZLEVBQUVuRixPQUEvQztBQUF3RCxnQkFBWSxFQUFFQztBQUF0RSxLQUNHdEIsS0FBSyxDQUFDeUcsYUFEVCxDQURGLEVBSUd0QyxJQUFJLGdCQUFHLGlEQUFDLHVEQUFELFFBQWVuRSxLQUFLLENBQUMrRSxRQUFyQixDQUFILEdBQW1ELElBSjFELENBREY7QUFRRCxDQWREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWEE7O0FBRUEsSUFBTTJCLFlBQStCLEdBQUcsU0FBbENBLFlBQWtDO0FBQUEsTUFBRzNCLFFBQUgsUUFBR0EsUUFBSDtBQUFBLHNCQUFrQjtBQUFZLGFBQVMsRUFBQztBQUF0QixLQUF1Q0EsUUFBdkMsQ0FBbEI7QUFBQSxDQUF4Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBOztBQVNBLElBQU00QixTQUE0QixHQUFHLFNBQS9CQSxTQUErQixHQUFNO0FBQ3pDLE1BQU12RixJQUFJLEdBQUd3Riw2REFBZ0IsRUFBN0I7QUFFQSxzQkFDRSxpSEFDRSxpREFBQywwRUFBRDtBQUFrQixNQUFFLEVBQUMsU0FBckI7QUFBK0IsU0FBSyxFQUFDLFNBQXJDO0FBQStDLGNBQVUsRUFBQyxTQUExRDtBQUFvRSxRQUFJLEVBQUV4RixJQUExRTtBQUFnRixTQUFLLEVBQUV5RiwrREFBZ0JBO0FBQXZHLElBREYsZUFFRSxpREFBQywwRUFBRDtBQUFrQixNQUFFLEVBQUMsSUFBckI7QUFBMEIsU0FBSyxFQUFDLGlCQUFoQztBQUFrRCxjQUFVLEVBQUMsSUFBN0Q7QUFBa0UsUUFBSSxFQUFFekYsSUFBeEU7QUFBOEUsU0FBSyxFQUFFMEYsaURBQXVCQTtBQUE1RyxJQUZGLGVBR0UsaURBQUMsMEVBQUQ7QUFDRSxNQUFFLEVBQUMsb0JBREw7QUFFRSxTQUFLLEVBQUMsb0JBRlI7QUFHRSxjQUFVLEVBQUMsb0JBSGI7QUFJRSxRQUFJLEVBQUUxRixJQUpSO0FBS0UsU0FBSyxFQUFFMkYsZ0VBQWlCQTtBQUwxQixJQUhGLGVBVUUsaURBQUMsMEVBQUQ7QUFDRSxNQUFFLEVBQUMsZ0JBREw7QUFFRSxTQUFLLEVBQUMsZ0JBRlI7QUFHRSxjQUFVLEVBQUMsc0JBSGI7QUFJRSxRQUFJLEVBQUUzRixJQUpSO0FBS0UsU0FBSyxFQUFFNEYsb0RBQUtBO0FBTGQsSUFWRixlQWlCRSxpREFBQywwRUFBRDtBQUNFLE1BQUUsRUFBQyxhQURMO0FBRUUsU0FBSyxFQUFDLDJCQUZSO0FBR0UsY0FBVSxFQUFDLDZCQUhiO0FBSUUsUUFBSSxFQUFFNUYsSUFKUjtBQUtFLFNBQUssRUFBRTZGLDBEQUFXQTtBQUxwQixJQWpCRixlQXdCRSxpREFBQywwRUFBRDtBQUNFLE1BQUUsRUFBQyxjQURMO0FBRUUsU0FBSyxFQUFDLElBRlI7QUFHRSxjQUFVLEVBQUMsNkJBSGI7QUFJRSxRQUFJLEVBQUU3RixJQUpSO0FBS0UsU0FBSyxFQUFFOEYsMERBQVdBO0FBTHBCLElBeEJGLENBREY7QUFrQ0QsQ0FyQ0Q7O0FBdUNBLGlFQUFlUCxTQUFmLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkRBO0FBQ0E7QUFHTyxJQUFNQyxnQkFBZ0IsR0FBRyxTQUFuQkEsZ0JBQW1CLEdBQXVCO0FBQUEsa0JBQzdCekcsK0NBQVEsQ0FBa0IsRUFBbEIsQ0FEcUI7QUFBQTtBQUFBLE1BQzlDaUIsSUFEOEM7QUFBQSxNQUN4Q21FLE9BRHdDOztBQUVyRGpGLGtEQUFTLENBQUMsWUFBTTtBQUNkNkcsb0RBQUEsQ0FBb0IscUJBQXBCLEVBQTJDcEcsSUFBM0MsQ0FBZ0QsVUFBQzRELEtBQUQsRUFBMEI7QUFDeEUsVUFBTXlDLFNBQVMsR0FBR3pDLEtBQUssSUFBSSxJQUFJMEMsSUFBSixDQUFTMUMsS0FBVCxDQUEzQjs7QUFDQSxVQUFJeUMsU0FBSixFQUFlO0FBQ2JBLGlCQUFTLENBQUNFLFFBQVYsQ0FBbUJGLFNBQVMsQ0FBQ0csUUFBVixLQUF1QixDQUExQztBQUNEOztBQUNELFVBQUtILFNBQVMsSUFBSUMsSUFBSSxDQUFDRyxHQUFMLEtBQWFKLFNBQVMsQ0FBQ0ssT0FBVixFQUFiLEdBQW1DLEtBQUssRUFBdEQsSUFBNkQsQ0FBQ0wsU0FBbEUsRUFBNkU7QUFDM0UsWUFBTU0sT0FBTyxhQUFNQyxNQUFNLENBQUNDLFFBQVAsQ0FBZ0JDLE1BQXRCLHlCQUFiO0FBQ0FGLGNBQU0sQ0FDSEcsS0FESCxDQUNTSixPQURULEVBRUczRyxJQUZILENBRVEsVUFBQ2dILFFBQUQ7QUFBQSxpQkFBY0EsUUFBUSxDQUFDQyxJQUFULEVBQWQ7QUFBQSxTQUZSLEVBR0dqSCxJQUhILENBR1EsZ0JBQXFCO0FBQUEsY0FBbEJLLElBQWtCLFFBQWxCQSxJQUFrQjtBQUFBLGNBQVo2RyxLQUFZLFFBQVpBLEtBQVk7O0FBQ3pCLGNBQUlBLEtBQUosRUFBVztBQUNUQyxtQkFBTyxDQUFDQyxHQUFSLENBQVksdUJBQVosRUFBcUNGLEtBQXJDO0FBRUE7QUFDRDs7QUFDRCxjQUFJN0csSUFBSixFQUFVO0FBQ1JtRSxtQkFBTyxDQUFDbkUsSUFBRCxDQUFQO0FBQ0ErRiw0REFBQSxDQUFvQixnQkFBcEIsRUFBc0MvRixJQUF0QztBQUNBK0YsNERBQUEsQ0FBb0IscUJBQXBCLEVBQTJDLElBQUlFLElBQUosRUFBM0M7QUFDRDtBQUNGLFNBZEg7QUFlRCxPQWpCRCxNQWlCTztBQUNMRix3REFBQSxDQUFvQixnQkFBcEIsRUFBc0NwRyxJQUF0QyxDQUEyQyxVQUFDSyxJQUFELEVBQTJCO0FBQ3BFbUUsaUJBQU8sQ0FBQ25FLElBQUQsQ0FBUDtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBM0JEO0FBNEJELEdBN0JRLEVBNkJOLEVBN0JNLENBQVQ7QUErQkEsU0FBT0EsSUFBUDtBQUNELENBbENNLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0pQO0FBQ0E7QUFDQTtBQUdPLElBQU1nSCxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNDLFNBQUQsRUFBcUM7QUFDaEUsTUFBTUMsTUFBTSxHQUFHRCxTQUFTLENBQUNFLGFBQXpCOztBQUNBLE1BQUlELE1BQUosRUFBWTtBQUNWLFFBQU1FLFVBQVUsR0FBR0YsTUFBTSxDQUFDRyxzQkFBUCxDQUE4QixtQ0FBOUIsQ0FBbkI7QUFDQUMsU0FBSyxDQUFDQyxTQUFOLENBQWdCQyxNQUFoQixDQUF1QkMsSUFBdkIsQ0FBNEJMLFVBQTVCLEVBQXdDLFVBQUNNLFNBQUQ7QUFBQSxhQUE0QkEsU0FBUyxDQUFDQyxNQUFWLEVBQTVCO0FBQUEsS0FBeEM7QUFDRDtBQUNGLENBTk07QUFRQSxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWdCLENBQUNYLFNBQUQsRUFBNEJ6QyxPQUE1QixFQUFzRDtBQUNqRixNQUFNMEMsTUFBTSxHQUFHRCxTQUFTLENBQUNFLGFBQXpCOztBQUNBLE1BQUlELE1BQUosRUFBWTtBQUNWRixpQkFBYSxDQUFDQyxTQUFELENBQWI7QUFDQSxRQUFNWSxPQUFPLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixZQUF2QixDQUFoQjtBQUNBRixXQUFPLENBQUNHLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCLGVBQXRCLEVBQXVDLHFCQUF2QztBQUNBekQsV0FBTyxDQUFDRyxLQUFSLENBQWMsSUFBZCxFQUFvQnVELE9BQXBCLENBQTRCLFVBQUNDLElBQUQsRUFBVTtBQUNwQyxVQUFNQyxTQUFTLEdBQUdOLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixHQUF2QixDQUFsQjtBQUNBSyxlQUFTLENBQUNDLFNBQVYsR0FBc0JGLElBQXRCO0FBQ0FOLGFBQU8sQ0FBQ1MsV0FBUixDQUFvQkYsU0FBcEI7QUFDRCxLQUpEO0FBS0FsQixVQUFNLENBQUNvQixXQUFQLENBQW1CVCxPQUFuQjtBQUNEO0FBQ0YsQ0FiTTtBQWVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sSUFBTVUsZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFtQixDQUM5QkMsT0FEOEIsRUFJTDtBQUFBLE1BRnpCOUksT0FFeUIsdUVBRmdCLEVBRWhCO0FBQUEsTUFEekIrSSxRQUN5Qix1RUFEQSxTQUNBO0FBQ3pCLFNBQU87QUFDTDVJLFdBQU8sRUFBRSx1QkFBaUQ7QUFBQSxVQUE5Q0csSUFBOEMsUUFBOUNBLElBQThDO0FBQUEsVUFBeENKLEtBQXdDLFFBQXhDQSxLQUF3QztBQUFBLFVBQWpDRyxNQUFpQyxRQUFqQ0EsTUFBaUM7QUFDeEQsVUFBSSxDQUFDQSxNQUFNLENBQUNDLElBQVosRUFBa0I7QUFEc0MsVUFFMUMwSSxDQUYwQyxHQUVwQzNJLE1BQU0sQ0FBQ0MsSUFGNkIsQ0FFaERnRSxJQUZnRDtBQUd4RCxVQUFNcEIsTUFBTSxHQUFHK0Ysd0RBQXFCLENBQ2pDM0ksSUFBRCxDQUEwQndILE1BQTFCLENBQWlDO0FBQUEsWUFBR29CLE1BQUgsU0FBR0EsTUFBSDtBQUFBLFlBQVc1RSxJQUFYLFNBQVdBLElBQVg7QUFBQSxlQUFzQndFLE9BQU8sQ0FBQ0ssUUFBUixDQUFpQkQsTUFBakIsS0FBNEJGLENBQUMsS0FBSzFFLElBQXhEO0FBQUEsT0FBakMsQ0FEa0MsRUFFbEN5RSxRQUZrQyxDQUFwQztBQUlBSyxnRUFBdUIsQ0FBQ2xKLEtBQUQsQ0FBdkI7QUFFQUEsV0FBSyxDQUFDeUIsU0FBTixDQUFnQkMsZ0RBQVMsQ0FBQzVCLE9BQUQsRUFBVTtBQUFFZ0QsZUFBTyxFQUFFO0FBQUVFLGdCQUFNLEVBQU5BLE1BQUY7QUFBVUQsb0JBQVUsRUFBRSxDQUFDLFNBQUQsRUFBWW9HLE1BQVosQ0FBbUJQLE9BQW5CO0FBQXRCO0FBQVgsT0FBVixDQUF6QjtBQUNELEtBWEk7QUFZTHZJLFdBQU8sRUFBRSx3QkFBMkM7QUFBQSxVQUF4Q0wsS0FBd0MsU0FBeENBLEtBQXdDO0FBQUEsVUFBakNHLE1BQWlDLFNBQWpDQSxNQUFpQztBQUNsRCxVQUFJLENBQUNBLE1BQU0sQ0FBQ0MsSUFBWixFQUFrQjtBQUNsQixVQUFNNEksTUFBTSxHQUFHN0ksTUFBTSxDQUFDaUosVUFBdEI7QUFDQSxVQUFNdEIsU0FBUyxHQUFHM0gsTUFBTSxDQUFDQyxJQUFQLFdBQWU0SSxNQUFmLGtCQUFsQjs7QUFFQSxVQUFJbEIsU0FBSixFQUFlO0FBQ2JFLHFCQUFhLENBQUNoSSxLQUFLLENBQUNxSixNQUFOLEVBQUQsRUFBbUN2QixTQUFuQyxDQUFiO0FBQ0Q7QUFDRixLQXBCSTtBQXFCTHhILFVBQU0sRUFBRTtBQUFBLFVBQUdOLEtBQUgsU0FBR0EsS0FBSDtBQUFBLGFBQW1Db0gsYUFBYSxDQUFDcEgsS0FBSyxDQUFDcUosTUFBTixFQUFELENBQWhEO0FBQUE7QUFyQkgsR0FBUDtBQXVCRCxDQTVCTSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqQ1A7QUFFQTtBQUVPLElBQU14SCxPQUFPLEdBQUcsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxFQUF3RCxTQUF4RCxFQUFtRSxTQUFuRSxFQUE4RSxTQUE5RSxDQUFoQjtBQUNBLElBQU1JLElBQStCLEdBQUc7QUFDN0NDLE1BQUksRUFBRSxJQUR1QztBQUU3Q0MsT0FBSyxFQUFFLElBRnNDO0FBRzdDQyxRQUFNLEVBQUUsSUFIcUM7QUFJN0NDLGNBQVksRUFBRTtBQUorQixDQUF4QztBQU9QO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ08sSUFBTTZHLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQ2xKLEtBQUQsRUFBaUQ7QUFBQSxNQUF4QnNKLEtBQXdCLHVFQUFoQixLQUFnQjtBQUN0RixNQUFNQyxjQUFjLEdBQUd2SixLQUFLLENBQUN3SixTQUFOLEVBQXZCO0FBQ0EsTUFBTW5DLFNBQVMsR0FBR3JILEtBQUssQ0FBQ3FKLE1BQU4sRUFBbEI7QUFDQSxNQUFNSSxNQUFNLEdBQUdwQyxTQUFTLENBQUNxQyxvQkFBVixDQUErQixRQUEvQixFQUF5QyxDQUF6QyxDQUFmOztBQUNBLE1BQUlELE1BQUosRUFBWTtBQUNWLFFBQU14SixPQUFPLEdBQUcsU0FBVkEsT0FBVSxHQUFNO0FBQ3BCRCxXQUFLLENBQUN5QixTQUFOLENBQWdCOEgsY0FBaEIsRUFBZ0MsQ0FBQ0QsS0FBakM7QUFDQUcsWUFBTSxDQUFDRSxtQkFBUCxDQUEyQixPQUEzQixFQUFvQzFKLE9BQXBDO0FBQ0QsS0FIRDs7QUFJQXdKLFVBQU0sQ0FBQ0csZ0JBQVAsQ0FBd0IsT0FBeEIsRUFBaUMzSixPQUFqQztBQUNEO0FBQ0YsQ0FYTTtBQWVBLElBQU00SixlQUFlLEdBQUcsU0FBbEJBLGVBQWtCO0FBQUEseUJBQzdCQyxNQUQ2QjtBQUFBLE1BQzdCQSxNQUQ2Qiw0QkFDcEIsRUFEb0I7QUFBQSx5QkFFN0JDLE1BRjZCO0FBQUEsTUFFN0JBLE1BRjZCLDRCQUVwQixFQUZvQjtBQUFBLE1BRzdCQyxRQUg2QixRQUc3QkEsUUFINkI7QUFBQSxTQUlpQyxVQUM5RDdKLE1BRDhELEVBRW5EO0FBQUEsUUFDSHdELEtBREcsR0FDbUJ4RCxNQURuQixDQUNId0QsS0FERztBQUFBLFFBQ0l5RixVQURKLEdBQ21CakosTUFEbkIsQ0FDSWlKLFVBREo7QUFHWDs7QUFDQSxRQUFJekYsS0FBSyxJQUFJeUYsVUFBVCxJQUF3QnpGLEtBQUQsQ0FBZXlGLFVBQWYsQ0FBM0IsRUFBdUQ7QUFDckQsVUFBSWEsUUFBUSxHQUFJdEcsS0FBRCxDQUFleUYsVUFBZixDQUFmOztBQUNBLFVBQUksT0FBT2EsUUFBUCxLQUFvQixRQUF4QixFQUFrQztBQUNoQ0EsZ0JBQVEsR0FBR0MsSUFBSSxDQUFDQyxLQUFMLENBQVdGLFFBQVEsR0FBRyxHQUF0QixJQUE2QixHQUF4QztBQUNEOztBQUNELFVBQU1HLFdBQVcsR0FBR0osUUFBUSxHQUFHSywyQ0FBUSxDQUFDSixRQUFELENBQVgsR0FBd0JBLFFBQXBEO0FBRUEsdUJBQVVILE1BQVYsU0FBbUJNLFdBQW5CLFNBQWlDTCxNQUFqQztBQUNEOztBQUVELFdBQU8sU0FBUDtBQUNBO0FBQ0QsR0F0QjhCO0FBQUEsQ0FBeEI7QUF3QkEsSUFBTU8saUJBQWlCLEdBQUcsU0FBcEJBLGlCQUFvQixDQUFDeEssT0FBRDtBQUFBLFNBQXdEO0FBQ3ZGcUQsUUFBSSxFQUFFLElBRGlGO0FBRXZGb0gsWUFBUSxFQUFFekssT0FBTyxDQUFDeUssUUFBUixJQUFvQixLQUZ5RDs7QUFHdkY7QUFDQUMsYUFBUyxFQUFFLG1CQUFDckssTUFBRCxFQUF5QjtBQUNsQyxVQUFNd0QsS0FBSyxHQUFHeEQsTUFBTSxDQUFDd0QsS0FBUCxDQUFheEQsTUFBTSxDQUFDc0ssY0FBUCxDQUFzQnRLLE1BQU0sQ0FBQ3VLLE1BQVAsQ0FBYzVCLENBQWQsQ0FBZ0IsQ0FBaEIsQ0FBdEIsQ0FBYixDQUFkOztBQUNBLFVBQUksT0FBT25GLEtBQVAsS0FBaUIsUUFBckIsRUFBK0I7QUFDN0IsWUFBTWdILFlBQVksR0FBR1QsSUFBSSxDQUFDQyxLQUFMLENBQVd4RyxLQUFLLEdBQUcsR0FBbkIsSUFBMEIsR0FBL0M7O0FBQ0EsWUFBTXlHLFlBQVcsR0FBR3RLLE9BQU8sQ0FBQ2tLLFFBQVIsR0FBbUJLLDJDQUFRLENBQUNNLFlBQUQsQ0FBM0IsR0FBNENBLFlBQWhFOztBQUVBLHlCQUFVN0ssT0FBTyxDQUFDZ0ssTUFBUixJQUFrQixFQUE1QixTQUFpQ00sWUFBakMsU0FBK0N0SyxPQUFPLENBQUNpSyxNQUFSLElBQWtCLEVBQWpFO0FBQ0Q7O0FBQ0QsVUFBTUssV0FBVyxHQUFHdEssT0FBTyxDQUFDa0ssUUFBUixHQUFtQkssMkNBQVEsQ0FBQzFHLEtBQUQsQ0FBM0IsR0FBcUNBLEtBQXpEO0FBRUEsdUJBQVU3RCxPQUFPLENBQUNnSyxNQUFSLElBQWtCLEVBQTVCLFNBQWlDTSxXQUFqQyxTQUErQ3RLLE9BQU8sQ0FBQ2lLLE1BQVIsSUFBa0IsRUFBakU7QUFDRDtBQWZzRixHQUF4RDtBQUFBLENBQTFCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hEUDtBQUVBO0FBRUEsSUFBTWxJLE9BQU8sR0FBRyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLENBQWhCO0FBQ0EsSUFBTStJLGdCQUFnQixHQUFHLENBQ3ZCLGdDQUR1QixFQUV2QixxQ0FGdUIsRUFHdkIsd0JBSHVCLEVBSXZCLHlCQUp1QixFQUt2QiwwQkFMdUIsRUFNdkIscUVBTnVCLENBQXpCO0FBU08sSUFBTTVFLEtBQXNCLEdBQUcsQ0FDcEM7QUFDRW5CLElBQUUsRUFBRSxHQUROO0FBRUVPLFNBQU8sRUFBRSxDQUZYO0FBR0VSLFNBQU8sRUFBRSxDQUNQO0FBQ0VDLE1BQUUsRUFBRSxhQUROO0FBRUVoQixRQUFJLEVBQUUrRyxnQkFBZ0IsQ0FBQyxDQUFELENBRnhCO0FBR0U5TCxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSztBQUNISSxVQUFJLEVBQUUsY0FBQ0EsS0FBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLEtBQUQsRUFBT3NILEtBQUssR0FBV3lCLE1BQWhCLENBQXVCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUF2QyxDQUFQLENBRHRCO0FBQUEsT0FESDtBQUdIOUssYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLE9BREE7QUFFUEMsZUFBTyxFQUFFO0FBQUVxQixjQUFJLEVBQUUsSUFBUjtBQUFjcEIsaUJBQU8sRUFBRSxNQUF2QjtBQUErQnlJLG1CQUFTLEVBQUVYLHVEQUFlLENBQUM7QUFBRUUsa0JBQU0sRUFBRTtBQUFWLFdBQUQ7QUFBekQsU0FGRjtBQUdQL0gsY0FBTSxFQUFFO0FBQUVtQixjQUFJLEVBQUU7QUFBUixTQUhEO0FBSVBMLGVBQU8sRUFBRTtBQUFFQyxvQkFBVSxFQUFFLENBQUMsTUFBRCxFQUFTb0csTUFBVCxDQUFnQnlCLGdCQUFnQixDQUFDLENBQUQsQ0FBaEM7QUFBZCxTQUpGO0FBS1AzSSxZQUFJLEVBQUpBLHdDQUxPO0FBTVBLLGVBQU8sRUFBRTtBQUFFQyxpQkFBTyxFQUFFO0FBQUVDLHVCQUFXLEVBQUU7QUFBZjtBQUFYLFNBTkY7QUFPUEMsYUFBSyxFQUFFO0FBQUVoRCxjQUFJLEVBQUU7QUFBUixTQVBBO0FBUVBpRCxhQUFLLEVBQUU7QUFBRWpELGNBQUksRUFBRSxPQUFSO0FBQWlCMEQsY0FBSSxFQUFFLEtBQXZCO0FBQThCMkgscUJBQVcsRUFBRSxDQUEzQztBQUE4Q0MsbUJBQVMsRUFBRTtBQUFFUCxxQkFBUyxFQUFFO0FBQWI7QUFBekQsU0FSQTtBQVNQN0gsY0FBTSxFQUFFLENBQUM7QUFBRWxELGNBQUksRUFBRSxLQUFSO0FBQWVpRSxlQUFLLEVBQUU0Ryx5REFBaUIsQ0FBQztBQUFFUCxrQkFBTSxFQUFFO0FBQVYsV0FBRDtBQUF2QyxTQUFEO0FBVEQ7QUFITixPQWNBcEIsd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBZGhCO0FBSlAsR0FETyxFQXNCUDtBQUNFL0YsTUFBRSxFQUFFLFlBRE47QUFFRWhCLFFBQUksRUFBRStHLGdCQUFnQixDQUFDLENBQUQsQ0FGeEI7QUFHRTlMLFVBQU0sRUFBRSxJQUhWO0FBSUVrQixTQUFLO0FBQ0hJLFVBQUksRUFBRSxjQUFDQSxNQUFEO0FBQUEsZUFDSnlLLDZEQUEwQixDQUFDekssTUFBRCxFQUFPc0gsS0FBSyxHQUFXeUIsTUFBaEIsQ0FBdUJ5QixnQkFBZ0IsQ0FBQyxDQUFELENBQXZDLENBQVAsQ0FEdEI7QUFBQSxPQURIO0FBR0g5SyxhQUFPLEVBQUU7QUFDUDhCLGFBQUssRUFBRUMsT0FEQTtBQUVQQyxlQUFPLEVBQUU7QUFBRXFCLGNBQUksRUFBRSxJQUFSO0FBQWNwQixpQkFBTyxFQUFFLE1BQXZCO0FBQStCeUksbUJBQVMsRUFBRVgsdURBQWUsQ0FBQyxFQUFEO0FBQXpELFNBRkY7QUFHUDdILGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FIRDtBQUlQTCxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQWQsU0FKRjtBQUtQM0ksWUFBSSxFQUFKQSx3Q0FMTztBQU1QSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQU5GO0FBT1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FQQTtBQVFQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxLQUF2QjtBQUE4QjJILHFCQUFXLEVBQUUsQ0FBM0M7QUFBOENDLG1CQUFTLEVBQUU7QUFBRVAscUJBQVMsRUFBRTtBQUFiO0FBQXpELFNBUkE7QUFTUDdILGNBQU0sRUFBRSxDQUFDO0FBQUVsRCxjQUFJLEVBQUUsS0FBUjtBQUFlaUUsZUFBSyxFQUFFNEcseURBQWlCLENBQUMsRUFBRDtBQUF2QyxTQUFEO0FBVEQ7QUFITixPQWNBM0Isd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBZGhCO0FBSlAsR0F0Qk8sRUEyQ1A7QUFDRS9GLE1BQUUsRUFBRSxXQUROO0FBRUVoQixRQUFJLEVBQUUrRyxnQkFBZ0IsQ0FBQyxDQUFELENBRnhCO0FBR0U5TCxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSztBQUNISSxVQUFJLEVBQUUsY0FBQ0EsTUFBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLE1BQUQsRUFBT3NILEtBQUssR0FBV3lCLE1BQWhCLENBQXVCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUF2QyxDQUFQLENBRHRCO0FBQUEsT0FESDtBQUdIOUssYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLE9BREE7QUFFUEMsZUFBTyxFQUFFO0FBQUVxQixjQUFJLEVBQUUsSUFBUjtBQUFjcEIsaUJBQU8sRUFBRSxNQUF2QjtBQUErQnlJLG1CQUFTLEVBQUVYLHVEQUFlLENBQUMsRUFBRDtBQUF6RCxTQUZGO0FBR1A3SCxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBSEQ7QUFJUEwsZUFBTyxFQUFFO0FBQUVDLG9CQUFVLEVBQUUsQ0FBQyxNQUFELEVBQVNvRyxNQUFULENBQWdCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUFoQztBQUFkLFNBSkY7QUFLUDNJLFlBQUksRUFBSkEsd0NBTE87QUFNUEssZUFBTyxFQUFFO0FBQUVDLGlCQUFPLEVBQUU7QUFBRUMsdUJBQVcsRUFBRTtBQUFmO0FBQVgsU0FORjtBQU9QQyxhQUFLLEVBQUU7QUFBRWhELGNBQUksRUFBRTtBQUFSLFNBUEE7QUFRUGlELGFBQUssRUFBRTtBQUFFakQsY0FBSSxFQUFFLE9BQVI7QUFBaUIwRCxjQUFJLEVBQUUsS0FBdkI7QUFBOEIySCxxQkFBVyxFQUFFLENBQTNDO0FBQThDQyxtQkFBUyxFQUFFO0FBQUVQLHFCQUFTLEVBQUU7QUFBYjtBQUF6RCxTQVJBO0FBU1A3SCxjQUFNLEVBQUUsQ0FBQztBQUFFbEQsY0FBSSxFQUFFLEtBQVI7QUFBZWlFLGVBQUssRUFBRTRHLHlEQUFpQixDQUFDLEVBQUQ7QUFBdkMsU0FBRDtBQVREO0FBSE4sT0FjQTNCLHdEQUFnQixDQUFDaUMsZ0JBQWdCLENBQUMsQ0FBRCxDQUFqQixDQWRoQjtBQUpQLEdBM0NPLEVBZ0VQO0FBQ0UvRixNQUFFLEVBQUUsb0JBRE47QUFFRWhCLFFBQUksRUFBRStHLGdCQUFnQixDQUFDLENBQUQsQ0FGeEI7QUFHRTlMLFVBQU0sRUFBRSxJQUhWO0FBSUVrQixTQUFLO0FBQ0hJLFVBQUksRUFBRSxjQUFDQSxNQUFEO0FBQUEsZUFDSnlLLDZEQUEwQixDQUFDekssTUFBRCxFQUFPc0gsS0FBSyxHQUFXeUIsTUFBaEIsQ0FBdUJ5QixnQkFBZ0IsQ0FBQyxDQUFELENBQXZDLENBQVAsQ0FEdEI7QUFBQSxPQURIO0FBR0g5SyxhQUFPLEVBQUU7QUFDUDhCLGFBQUssRUFBRUMsT0FEQTtBQUVQQyxlQUFPLEVBQUU7QUFBRXFCLGNBQUksRUFBRSxJQUFSO0FBQWNwQixpQkFBTyxFQUFFLE1BQXZCO0FBQStCeUksbUJBQVMsRUFBRVgsdURBQWUsQ0FBQztBQUFFRSxrQkFBTSxFQUFFO0FBQVYsV0FBRDtBQUF6RCxTQUZGO0FBR1AvSCxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBSEQ7QUFJUEwsZUFBTyxFQUFFO0FBQUVDLG9CQUFVLEVBQUUsQ0FBQyxNQUFELEVBQVNvRyxNQUFULENBQWdCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUFoQztBQUFkLFNBSkY7QUFLUDNJLFlBQUksRUFBSkEsd0NBTE87QUFNUEssZUFBTyxFQUFFO0FBQUVDLGlCQUFPLEVBQUU7QUFBRUMsdUJBQVcsRUFBRTtBQUFmO0FBQVgsU0FORjtBQU9QQyxhQUFLLEVBQUU7QUFBRWhELGNBQUksRUFBRTtBQUFSLFNBUEE7QUFRUGlELGFBQUssRUFBRTtBQUFFakQsY0FBSSxFQUFFLE9BQVI7QUFBaUIwRCxjQUFJLEVBQUUsS0FBdkI7QUFBOEIySCxxQkFBVyxFQUFFLENBQTNDO0FBQThDQyxtQkFBUyxFQUFFO0FBQUVQLHFCQUFTLEVBQUU7QUFBYjtBQUF6RCxTQVJBO0FBU1A3SCxjQUFNLEVBQUUsQ0FBQztBQUFFbEQsY0FBSSxFQUFFLEtBQVI7QUFBZWlFLGVBQUssRUFBRTRHLHlEQUFpQixDQUFDO0FBQUVQLGtCQUFNLEVBQUU7QUFBVixXQUFEO0FBQXZDLFNBQUQ7QUFURDtBQUhOLE9BY0FwQix3REFBZ0IsQ0FBQ2lDLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsQ0FkaEI7QUFKUCxHQWhFTyxFQXFGUDtBQUNFL0YsTUFBRSxFQUFFLHFCQUROO0FBRUVoQixRQUFJLEVBQUUrRyxnQkFBZ0IsQ0FBQyxDQUFELENBRnhCO0FBR0U5TCxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSztBQUNISSxVQUFJLEVBQUUsY0FBQ0EsTUFBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLE1BQUQsRUFBT3NILEtBQUssR0FBV3lCLE1BQWhCLENBQXVCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUF2QyxDQUFQLENBRHRCO0FBQUEsT0FESDtBQUdIOUssYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLE9BREE7QUFFUEMsZUFBTyxFQUFFO0FBQUVxQixjQUFJLEVBQUUsSUFBUjtBQUFjcEIsaUJBQU8sRUFBRSxNQUF2QjtBQUErQnlJLG1CQUFTLEVBQUVYLHVEQUFlLENBQUM7QUFBRUUsa0JBQU0sRUFBRTtBQUFWLFdBQUQ7QUFBekQsU0FGRjtBQUdQL0gsY0FBTSxFQUFFO0FBQUVtQixjQUFJLEVBQUU7QUFBUixTQUhEO0FBSVBMLGVBQU8sRUFBRTtBQUFFQyxvQkFBVSxFQUFFLENBQUMsTUFBRCxFQUFTb0csTUFBVCxDQUFnQnlCLGdCQUFnQixDQUFDLENBQUQsQ0FBaEM7QUFBZCxTQUpGO0FBS1AzSSxZQUFJLEVBQUpBLHdDQUxPO0FBTVBLLGVBQU8sRUFBRTtBQUFFQyxpQkFBTyxFQUFFO0FBQUVDLHVCQUFXLEVBQUU7QUFBZjtBQUFYLFNBTkY7QUFPUEMsYUFBSyxFQUFFO0FBQUVoRCxjQUFJLEVBQUU7QUFBUixTQVBBO0FBUVBpRCxhQUFLLEVBQUU7QUFBRWpELGNBQUksRUFBRSxPQUFSO0FBQWlCMEQsY0FBSSxFQUFFLEtBQXZCO0FBQThCMkgscUJBQVcsRUFBRSxDQUEzQztBQUE4Q0MsbUJBQVMsRUFBRTtBQUFFUCxxQkFBUyxFQUFFO0FBQWI7QUFBekQsU0FSQTtBQVNQN0gsY0FBTSxFQUFFLENBQUM7QUFBRWxELGNBQUksRUFBRSxLQUFSO0FBQWVpRSxlQUFLLEVBQUU0Ryx5REFBaUIsQ0FBQztBQUFFUCxrQkFBTSxFQUFFO0FBQVYsV0FBRDtBQUF2QyxTQUFEO0FBVEQ7QUFITixPQWNBcEIsd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBZGhCO0FBSlAsR0FyRk87QUFIWCxDQURvQyxFQWdIcEM7QUFDRS9GLElBQUUsRUFBRSxHQUROO0FBRUVPLFNBQU8sRUFBRSxDQUZYO0FBR0VuQixXQUFTLEVBQUUsU0FIYjtBQUlFVyxTQUFPLEVBQUUsQ0FDUDtBQUNFQyxNQUFFLEVBQUUsb0JBRE47QUFFRWhCLFFBQUksRUFBRStHLGdCQUFnQixDQUFDLENBQUQsQ0FGeEI7QUFHRTlMLFVBQU0sRUFBRSxJQUhWO0FBSUVrQixTQUFLO0FBQ0hJLFVBQUksRUFBRSxjQUFDQSxNQUFEO0FBQUEsZUFDSnlLLDZEQUEwQixDQUFDekssTUFBRCxFQUFPc0gsS0FBSyxHQUFXeUIsTUFBaEIsQ0FBdUJ5QixnQkFBZ0IsQ0FBQyxDQUFELENBQXZDLENBQVAsQ0FEdEI7QUFBQSxPQURIO0FBR0g5SyxhQUFPLEVBQUU7QUFDUDhCLGFBQUssRUFBRUMsT0FEQTtBQUVQQyxlQUFPLEVBQUU7QUFBRXFCLGNBQUksRUFBRSxJQUFSO0FBQWNwQixpQkFBTyxFQUFFLE1BQXZCO0FBQStCeUksbUJBQVMsRUFBRVgsdURBQWUsQ0FBQztBQUFFRSxrQkFBTSxFQUFFO0FBQVYsV0FBRDtBQUF6RCxTQUZGO0FBR1AvSCxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBSEQ7QUFJUEwsZUFBTyxFQUFFO0FBQUVDLG9CQUFVLEVBQUUsQ0FBQyxNQUFELEVBQVNvRyxNQUFULENBQWdCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUFoQztBQUFkLFNBSkY7QUFLUDNJLFlBQUksRUFBSkEsd0NBTE87QUFNUEssZUFBTyxFQUFFO0FBQUVDLGlCQUFPLEVBQUU7QUFBRUMsdUJBQVcsRUFBRTtBQUFmO0FBQVgsU0FORjtBQU9QQyxhQUFLLEVBQUU7QUFBRWhELGNBQUksRUFBRTtBQUFSLFNBUEE7QUFRUGlELGFBQUssRUFBRTtBQUFFakQsY0FBSSxFQUFFLE9BQVI7QUFBaUIwRCxjQUFJLEVBQUUsS0FBdkI7QUFBOEIySCxxQkFBVyxFQUFFLENBQTNDO0FBQThDQyxtQkFBUyxFQUFFO0FBQUVQLHFCQUFTLEVBQUU7QUFBYjtBQUF6RCxTQVJBO0FBU1A3SCxjQUFNLEVBQUUsQ0FBQztBQUFFbEQsY0FBSSxFQUFFLEtBQVI7QUFBZWlFLGVBQUssRUFBRTRHLHlEQUFpQixDQUFDO0FBQUVQLGtCQUFNLEVBQUU7QUFBVixXQUFEO0FBQXZDLFNBQUQ7QUFURDtBQUhOLE9BY0FwQix3REFBZ0IsQ0FBQ2lDLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsQ0FkaEI7QUFKUCxHQURPO0FBSlgsQ0FoSG9DLENBQS9CLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2RQO0FBRUE7QUFFQSxJQUFNL0ksT0FBTyxHQUFHLENBQUMsU0FBRCxFQUFZLFNBQVosRUFBdUIsU0FBdkIsRUFBa0MsU0FBbEMsRUFBNkMsU0FBN0MsQ0FBaEI7QUFDQSxJQUFNK0ksZ0JBQWdCLEdBQUcsQ0FDdkIsMEZBRHVCLEVBRXZCLDBFQUZ1QixFQUd2QixrREFIdUIsQ0FBekI7QUFNTyxJQUFNMUUsV0FBNEIsR0FBRyxDQUMxQztBQUNFckIsSUFBRSxFQUFFLEdBRE47QUFFRU8sU0FBTyxFQUFFLENBRlg7QUFHRVIsU0FBTyxFQUFFLENBQ1A7QUFDRUMsTUFBRSxFQUFFLHVCQUROO0FBRUVoQixRQUFJLEVBQUUrRyxnQkFBZ0IsQ0FBQyxDQUFELENBRnhCO0FBR0U5TCxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSztBQUNISSxVQUFJLEVBQUUsY0FBQ0EsS0FBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLEtBQUQsRUFBT3NILEtBQUssR0FBV3lCLE1BQWhCLENBQXVCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUF2QyxDQUFQLENBRHRCO0FBQUEsT0FESDtBQUdIOUssYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLE9BREE7QUFFUEMsZUFBTyxFQUFFO0FBQ1BxQixjQUFJLEVBQUUsSUFEQztBQUVQcEIsaUJBQU8sRUFBRSxNQUZGO0FBR1B5SSxtQkFBUyxFQUFFWCx1REFBZSxDQUFDO0FBQUVFLGtCQUFNLEVBQUU7QUFBVixXQUFEO0FBSG5CLFNBRkY7QUFPUC9ILGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FQRDtBQVFQTCxlQUFPLEVBQUU7QUFDUEMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBREwsU0FSRjtBQVdQM0ksWUFBSSxFQUFKQSx3Q0FYTztBQVlQSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQVpGO0FBYVBDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FiQTtBQWNQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxLQUF2QjtBQUE4QjJILHFCQUFXLEVBQUUsQ0FBM0M7QUFBOENDLG1CQUFTLEVBQUU7QUFBRVAscUJBQVMsRUFBRTtBQUFiO0FBQXpELFNBZEE7QUFlUDdILGNBQU0sRUFBRSxDQUNOO0FBQ0VsRCxjQUFJLEVBQUUsS0FEUjtBQUVFaUUsZUFBSyxFQUFFNEcseURBQWlCLENBQUM7QUFBRVAsa0JBQU0sRUFBRTtBQUFWLFdBQUQ7QUFGMUIsU0FETTtBQWZEO0FBSE4sT0F5QkFwQix3REFBZ0IsQ0FBQ2lDLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsQ0F6QmhCO0FBSlAsR0FETyxFQWlDUDtBQUNFL0YsTUFBRSxFQUFFLGdCQUROO0FBRUVoQixRQUFJLEVBQUUrRyxnQkFBZ0IsQ0FBQyxDQUFELENBRnhCO0FBR0U5TCxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSztBQUNISSxVQUFJLEVBQUUsY0FBQ0EsTUFBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLE1BQUQsRUFBT3NILEtBQUssR0FBV3lCLE1BQWhCLENBQXVCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUF2QyxDQUFQLENBRHRCO0FBQUEsT0FESDtBQUdIOUssYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLE9BREE7QUFFUEMsZUFBTyxFQUFFO0FBQ1BxQixjQUFJLEVBQUUsSUFEQztBQUVQcEIsaUJBQU8sRUFBRSxNQUZGO0FBR1B5SSxtQkFBUyxFQUFFWCx1REFBZSxDQUFDO0FBQUVFLGtCQUFNLEVBQUU7QUFBVixXQUFEO0FBSG5CLFNBRkY7QUFPUC9ILGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FQRDtBQVFQTCxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQWQsU0FSRjtBQVNQM0ksWUFBSSxFQUFKQSx3Q0FUTztBQVVQSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQVZGO0FBV1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FYQTtBQVlQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxLQUF2QjtBQUE4QjJILHFCQUFXLEVBQUUsQ0FBM0M7QUFBOENDLG1CQUFTLEVBQUU7QUFBRVAscUJBQVMsRUFBRTtBQUFiO0FBQXpELFNBWkE7QUFhUDdILGNBQU0sRUFBRSxDQUFDO0FBQUVsRCxjQUFJLEVBQUUsS0FBUjtBQUFlaUUsZUFBSyxFQUFFNEcseURBQWlCLENBQUM7QUFBRVAsa0JBQU0sRUFBRTtBQUFWLFdBQUQ7QUFBdkMsU0FBRDtBQWJEO0FBSE4sT0FrQkFwQix3REFBZ0IsQ0FBQ2lDLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsQ0FsQmhCO0FBSlAsR0FqQ08sRUEwRFA7QUFDRS9GLE1BQUUsRUFBRSxnQkFETjtBQUVFaEIsUUFBSSxFQUFFK0csZ0JBQWdCLENBQUMsQ0FBRCxDQUZ4QjtBQUdFOUwsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSEksVUFBSSxFQUFFLGNBQUNBLE1BQUQ7QUFBQSxlQUNKeUssNkRBQTBCLENBQUN6SyxNQUFELEVBQU9zSCxLQUFLLEdBQVd5QixNQUFoQixDQUF1QnlCLGdCQUFnQixDQUFDLENBQUQsQ0FBdkMsQ0FBUCxDQUR0QjtBQUFBLE9BREg7QUFHSDlLLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUNQcUIsY0FBSSxFQUFFLElBREM7QUFFUHBCLGlCQUFPLEVBQUUsTUFGRjtBQUdQeUksbUJBQVMsRUFBRVgsdURBQWUsQ0FBQztBQUFFRSxrQkFBTSxFQUFFO0FBQVYsV0FBRDtBQUhuQixTQUZGO0FBT1AvSCxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBUEQ7QUFRUEwsZUFBTyxFQUFFO0FBQUVDLG9CQUFVLEVBQUUsQ0FBQyxNQUFELEVBQVNvRyxNQUFULENBQWdCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUFoQztBQUFkLFNBUkY7QUFTUDNJLFlBQUksRUFBSkEsd0NBVE87QUFVUEssZUFBTyxFQUFFO0FBQUVDLGlCQUFPLEVBQUU7QUFBRUMsdUJBQVcsRUFBRTtBQUFmO0FBQVgsU0FWRjtBQVdQQyxhQUFLLEVBQUU7QUFBRWhELGNBQUksRUFBRTtBQUFSLFNBWEE7QUFZUGlELGFBQUssRUFBRTtBQUFFakQsY0FBSSxFQUFFLE9BQVI7QUFBaUIwRCxjQUFJLEVBQUUsS0FBdkI7QUFBOEIySCxxQkFBVyxFQUFFLENBQTNDO0FBQThDQyxtQkFBUyxFQUFFO0FBQUVQLHFCQUFTLEVBQUU7QUFBYjtBQUF6RCxTQVpBO0FBYVA3SCxjQUFNLEVBQUUsQ0FBQztBQUFFbEQsY0FBSSxFQUFFLEtBQVI7QUFBZWlFLGVBQUssRUFBRTRHLHlEQUFpQixDQUFDO0FBQUVQLGtCQUFNLEVBQUU7QUFBVixXQUFEO0FBQXZDLFNBQUQ7QUFiRDtBQUhOLE9Ba0JBcEIsd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBbEJoQjtBQUpQLEdBMURPO0FBSFgsQ0FEMEMsQ0FBckMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNYUDtBQUVBO0FBRU8sSUFBTS9FLGdCQUFpQyxHQUFHLENBQy9DO0FBQ0VoQixJQUFFLEVBQUUsR0FETjtBQUVFTyxTQUFPLEVBQUUsQ0FGWDtBQUdFUixTQUFPLEVBQUUsQ0FDUDtBQUNFQyxNQUFFLEVBQUUsY0FETjtBQUVFaEIsUUFBSSxFQUFFLDRDQUZSO0FBR0UvRSxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSyxFQUFFO0FBQ0xJLFVBQUksRUFBRSxjQUFDQSxLQUFEO0FBQUEsZUFDSnlLLDZEQUEwQixDQUFDekssS0FBRCxFQUFPLENBQUMsb0JBQUQsRUFBdUIsV0FBdkIsQ0FBUCxDQUR0QjtBQUFBLE9BREQ7QUFHTE4sYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLDJDQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFcUIsY0FBSSxFQUFFO0FBQVIsU0FGRjtBQUdQbkIsY0FBTSxFQUFFO0FBQUU1QixjQUFJLEVBQUUsQ0FBQyxvQkFBRCxFQUF1QixXQUF2QjtBQUFSLFNBSEQ7QUFJUDBDLGVBQU8sRUFBRTtBQUFFQyxvQkFBVSxFQUFFLENBQUMsTUFBRCxFQUFTLG9CQUFULEVBQStCLFdBQS9CO0FBQWQsU0FKRjtBQUtQZCxZQUFJLEVBQUpBLHdDQUxPO0FBTVBRLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFLFVBQVI7QUFBb0J1TCxxQkFBVyxFQUFFLElBQWpDO0FBQXVDQyxrQkFBUSxFQUFFO0FBQUVDLDBCQUFjLEVBQUU7QUFBbEI7QUFBakQsU0FOQTtBQU9QeEksYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRTtBQUF2QixTQVBBO0FBUVBSLGNBQU0sRUFBRStFLEtBQUssQ0FBQ3lELElBQU4sQ0FDTjtBQUFFMUcsZ0JBQU0sRUFBRTtBQUFWLFNBRE0sRUFFTjtBQUFBLGlCQUFvQztBQUNsQ2hGLGdCQUFJLEVBQUUsS0FENEI7QUFFbENpRSxpQkFBSyxFQUFFNEcseURBQWlCLENBQUM7QUFBRVAsb0JBQU0sRUFBRTtBQUFWLGFBQUQ7QUFGVSxXQUFwQztBQUFBLFNBRk07QUFSRCxPQUhKO0FBbUJMOUosYUFBTyxFQUFFLHVCQUFpRDtBQUFBLFlBQTlDRyxJQUE4QyxRQUE5Q0EsSUFBOEM7QUFBQSxZQUF4Q0osS0FBd0MsUUFBeENBLEtBQXdDO0FBQUEsWUFBakNHLE1BQWlDLFFBQWpDQSxNQUFpQztBQUN4RCxZQUFJLENBQUNBLE1BQU0sQ0FBQ0MsSUFBWixFQUFrQjtBQURzQyxZQUUxQzBJLENBRjBDLEdBRXBDM0ksTUFBTSxDQUFDQyxJQUY2QixDQUVoRGdFLElBRmdEO0FBR3hELFlBQU1wQixNQUFNLEdBQUcrRix3REFBcUIsQ0FDakMzSSxJQUFELENBQTBCd0gsTUFBMUIsQ0FDRTtBQUFBLGNBQUdvQixNQUFILFNBQUdBLE1BQUg7QUFBQSxjQUFXNUUsSUFBWCxTQUFXQSxJQUFYO0FBQUEsaUJBQXNCLENBQUM0RSxNQUFNLEtBQUssb0JBQVgsSUFBbUNBLE1BQU0sS0FBSyxXQUEvQyxLQUErREYsQ0FBQyxLQUFLMUUsSUFBM0Y7QUFBQSxTQURGLENBRGtDLENBQXBDO0FBS0E4RSx1RUFBdUIsQ0FBQ2xKLEtBQUQsQ0FBdkI7QUFFQSxZQUFNRixPQUE2QixHQUFHO0FBQ3BDa0MsZ0JBQU0sRUFBRTtBQUFFNUIsZ0JBQUksRUFBRSxDQUFDLG9CQUFELEVBQXVCLFdBQXZCLEVBQW9DLFFBQXBDO0FBQVIsV0FENEI7QUFFcEMwQyxpQkFBTyxFQUFFO0FBQ1BFLGtCQUFNLEVBQU5BLE1BRE87QUFFUEQsc0JBQVUsRUFBRSxDQUFDLFNBQUQsRUFBWSxvQkFBWixFQUFrQyxXQUFsQyxFQUErQyxRQUEvQztBQUZMLFdBRjJCO0FBTXBDTCxlQUFLLEVBQUU7QUFBRWpELGdCQUFJLEVBQUUsT0FBUjtBQUFpQjBELGdCQUFJLEVBQUUsSUFBdkI7QUFBNkJpSSxpQkFBSyxFQUFFLElBQXBDO0FBQTBDTix1QkFBVyxFQUFFLENBQXZEO0FBQTBEQyxxQkFBUyxFQUFFO0FBQUVQLHVCQUFTLEVBQUU7QUFBYjtBQUFyRSxXQU42QjtBQU9wQzdILGdCQUFNLEVBQUUsQ0FDTjtBQUFFbEQsZ0JBQUksRUFBRTtBQUFSLFdBRE0sRUFFTjtBQUFFQSxnQkFBSSxFQUFFO0FBQVIsV0FGTSxFQUdOO0FBQ0VBLGdCQUFJLEVBQUUsTUFEUjtBQUVFNEwsa0JBQU0sRUFBRSxNQUZWO0FBR0VDLHFCQUFTLEVBQUU7QUFBRTdMLGtCQUFJLEVBQUUsUUFBUjtBQUFrQm1DLG1CQUFLLEVBQUU7QUFBekIsYUFIYjtBQUlFMkoscUJBQVMsRUFBRTtBQUFFM0osbUJBQUssRUFBRTtBQUFUO0FBSmIsV0FITTtBQVA0QixTQUF0QztBQWtCQTVCLGFBQUssQ0FBQ3lCLFNBQU4sQ0FBZ0IzQixPQUFoQjtBQUNEO0FBaERJO0FBSlQsR0FETyxFQXdEUDtBQUNFK0UsTUFBRSxFQUFFLGVBRE47QUFFRWhCLFFBQUksRUFBRSwyREFGUjtBQUdFL0UsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUssRUFBRTtBQUNMSSxVQUFJLEVBQUUsY0FBQ0EsTUFBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLE1BQUQsRUFBTyxDQUFDLGtCQUFELEVBQXFCLG9CQUFyQixDQUFQLENBRHRCO0FBQUEsT0FERDtBQUdMTixhQUFPLEVBQUU7QUFDUDhCLGFBQUssRUFBRUMsMkNBREE7QUFFUEMsZUFBTyxFQUFFO0FBQUVxQixjQUFJLEVBQUU7QUFBUixTQUZGO0FBR1BuQixjQUFNLEVBQUU7QUFBRTVCLGNBQUksRUFBRSxDQUFDLGtCQUFELEVBQXFCLG9CQUFyQjtBQUFSLFNBSEQ7QUFJUDBDLGVBQU8sRUFBRTtBQUFFQyxvQkFBVSxFQUFFLENBQUMsTUFBRCxFQUFTLGtCQUFULEVBQTZCLG9CQUE3QjtBQUFkLFNBSkY7QUFLUGQsWUFBSSxFQUFKQSx3Q0FMTztBQU1QUSxhQUFLLEVBQUU7QUFBRWhELGNBQUksRUFBRTtBQUFSLFNBTkE7QUFPUGlELGFBQUssRUFBRTtBQUFFakQsY0FBSSxFQUFFLE9BQVI7QUFBaUIwRCxjQUFJLEVBQUU7QUFBdkIsU0FQQTtBQVFQUixjQUFNLEVBQUUrRSxLQUFLLENBQUN5RCxJQUFOLENBQ047QUFBRTFHLGdCQUFNLEVBQUU7QUFBVixTQURNLEVBRU47QUFBQSxpQkFBb0M7QUFDbENoRixnQkFBSSxFQUFFLEtBRDRCO0FBRWxDaUUsaUJBQUssRUFBRTRHLHlEQUFpQixDQUFDO0FBQUVQLG9CQUFNLEVBQUU7QUFBVixhQUFEO0FBRlUsV0FBcEM7QUFBQSxTQUZNO0FBUkQsT0FISjtBQW1CTDlKLGFBQU8sRUFBRSx3QkFBaUQ7QUFBQSxZQUE5Q0csSUFBOEMsU0FBOUNBLElBQThDO0FBQUEsWUFBeENKLEtBQXdDLFNBQXhDQSxLQUF3QztBQUFBLFlBQWpDRyxNQUFpQyxTQUFqQ0EsTUFBaUM7QUFDeEQsWUFBSSxDQUFDQSxNQUFNLENBQUNDLElBQVosRUFBa0I7QUFEc0MsWUFFMUMwSSxDQUYwQyxHQUVwQzNJLE1BQU0sQ0FBQ0MsSUFGNkIsQ0FFaERnRSxJQUZnRDtBQUd4RCxZQUFNcEIsTUFBTSxHQUFHK0Ysd0RBQXFCLENBQ2pDM0ksSUFBRCxDQUEwQndILE1BQTFCLENBQ0U7QUFBQSxjQUFHb0IsTUFBSCxTQUFHQSxNQUFIO0FBQUEsY0FBVzVFLElBQVgsU0FBV0EsSUFBWDtBQUFBLGlCQUFzQixDQUFDNEUsTUFBTSxLQUFLLGtCQUFYLElBQWlDQSxNQUFNLEtBQUssb0JBQTdDLEtBQXNFRixDQUFDLEtBQUsxRSxJQUFsRztBQUFBLFNBREYsQ0FEa0MsQ0FBcEM7QUFLQThFLHVFQUF1QixDQUFDbEosS0FBRCxDQUF2QjtBQUVBLFlBQU1GLE9BQTZCLEdBQUc7QUFDcENnQyxpQkFBTyxFQUFFO0FBQUVxQixnQkFBSSxFQUFFLElBQVI7QUFBY3BCLG1CQUFPLEVBQUU7QUFBdkIsV0FEMkI7QUFFcENDLGdCQUFNLEVBQUU7QUFBRTVCLGdCQUFJLEVBQUUsQ0FBQyxrQkFBRCxFQUFxQixvQkFBckIsRUFBMkMsUUFBM0M7QUFBUixXQUY0QjtBQUdwQzBDLGlCQUFPLEVBQUU7QUFDUEUsa0JBQU0sRUFBTkEsTUFETztBQUVQRCxzQkFBVSxFQUFFLENBQUMsU0FBRCxFQUFZLGtCQUFaLEVBQWdDLG9CQUFoQyxFQUFzRCxRQUF0RDtBQUZMLFdBSDJCO0FBT3BDTCxlQUFLLEVBQUU7QUFBRVMsZ0JBQUksRUFBRSxJQUFSO0FBQWMySCx1QkFBVyxFQUFFLENBQTNCO0FBQThCQyxxQkFBUyxFQUFFO0FBQUVQLHVCQUFTLEVBQUU7QUFBYjtBQUF6QyxXQVA2QjtBQVFwQzdILGdCQUFNLEVBQUUsQ0FDTjtBQUFFbEQsZ0JBQUksRUFBRSxLQUFSO0FBQWVpRSxpQkFBSyxFQUFFO0FBQUVQLGtCQUFJLEVBQUUsS0FBUjtBQUFlcUgsdUJBQVMsRUFBRTtBQUFBLHVCQUFNLEVBQU47QUFBQTtBQUExQjtBQUF0QixXQURNLEVBRU47QUFBRS9LLGdCQUFJLEVBQUUsS0FBUjtBQUFlaUUsaUJBQUssRUFBRTtBQUFFUCxrQkFBSSxFQUFFLEtBQVI7QUFBZXFILHVCQUFTLEVBQUU7QUFBQSx1QkFBTSxFQUFOO0FBQUE7QUFBMUI7QUFBdEIsV0FGTSxFQUdOO0FBQ0UvSyxnQkFBSSxFQUFFLE1BRFI7QUFFRTRMLGtCQUFNLEVBQUUsTUFGVjtBQUdFQyxxQkFBUyxFQUFFO0FBQUU3TCxrQkFBSSxFQUFFLFFBQVI7QUFBa0JtQyxtQkFBSyxFQUFFO0FBQXpCLGFBSGI7QUFJRTJKLHFCQUFTLEVBQUU7QUFBRTNKLG1CQUFLLEVBQUU7QUFBVDtBQUpiLFdBSE07QUFSNEIsU0FBdEM7QUFtQkE1QixhQUFLLENBQUN5QixTQUFOLENBQWdCM0IsT0FBaEI7QUFDRDtBQWpESTtBQUpULEdBeERPLEVBZ0hQO0FBQ0UrRSxNQUFFLEVBQUUsaUJBRE47QUFFRWhCLFFBQUksRUFBRSwwREFGUjtBQUdFL0UsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUssRUFBRTtBQUNMSSxVQUFJLEVBQUUsY0FBQ0EsTUFBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLE1BQUQsRUFBTyxDQUFDLHFDQUFELEVBQXdDLGdDQUF4QyxDQUFQLENBRHRCO0FBQUEsT0FERDtBQUdMTixhQUFPLEVBQUU7QUFDUDhCLGFBQUssRUFBRUMsMkNBREE7QUFFUEMsZUFBTyxFQUFFO0FBQUVxQixjQUFJLEVBQUU7QUFBUixTQUZGO0FBR1BuQixjQUFNLEVBQUU7QUFBRWtCLGFBQUcsRUFBRTtBQUFQLFNBSEQ7QUFJUEosZUFBTyxFQUFFO0FBQ1BDLG9CQUFVLEVBQUUsQ0FBQyxNQUFELEVBQVMscUNBQVQsRUFBZ0QsZ0NBQWhEO0FBREwsU0FKRjtBQU9QZCxZQUFJLEVBQUpBLHdDQVBPO0FBUVBRLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FSQTtBQVNQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRTtBQUF2QixTQVRBOztBQVVQO0FBQ0FSLGNBQU0sRUFBRStFLEtBQUssQ0FBQ3lELElBQU4sQ0FDTjtBQUFFMUcsZ0JBQU0sRUFBRTtBQUFWLFNBRE0sRUFFTjtBQUFBLGlCQUFvQztBQUNsQ2hGLGdCQUFJLEVBQUUsS0FENEI7QUFFbENpRSxpQkFBSyxFQUFFNEcseURBQWlCLENBQUM7QUFBRVAsb0JBQU0sRUFBRTtBQUFWLGFBQUQ7QUFGVSxXQUFwQztBQUFBLFNBRk07QUFPUjs7QUFsQk8sT0FISjtBQXVCTDlKLGFBQU8sRUFBRSx3QkFBaUQ7QUFBQSxZQUE5Q0csSUFBOEMsU0FBOUNBLElBQThDO0FBQUEsWUFBeENKLEtBQXdDLFNBQXhDQSxLQUF3QztBQUFBLFlBQWpDRyxNQUFpQyxTQUFqQ0EsTUFBaUM7QUFDeEQsWUFBSSxDQUFDQSxNQUFNLENBQUNDLElBQVosRUFBa0I7QUFEc0MsWUFFMUMwSSxDQUYwQyxHQUVwQzNJLE1BQU0sQ0FBQ0MsSUFGNkIsQ0FFaERnRSxJQUZnRDtBQUd4RCxZQUFNcEIsTUFBTSxHQUFHK0Ysd0RBQXFCLENBQ2pDM0ksSUFBRCxDQUEwQndILE1BQTFCLENBQ0U7QUFBQSxjQUFHb0IsTUFBSCxTQUFHQSxNQUFIO0FBQUEsY0FBVzVFLElBQVgsU0FBV0EsSUFBWDtBQUFBLGlCQUNFLENBQUMscUNBQUQsRUFBd0MsZ0NBQXhDLEVBQTBFNkUsUUFBMUUsQ0FBbUZELE1BQW5GLEtBQ0FGLENBQUMsS0FBSzFFLElBRlI7QUFBQSxTQURGLENBRGtDLENBQXBDO0FBT0E4RSx1RUFBdUIsQ0FBQ2xKLEtBQUQsQ0FBdkI7QUFFQSxZQUFNRixPQUE2QixHQUFHO0FBQ3BDZ0MsaUJBQU8sRUFBRTtBQUFFcUIsZ0JBQUksRUFBRTtBQUFSLFdBRDJCO0FBRXBDTCxpQkFBTyxFQUFFO0FBQ1BFLGtCQUFNLEVBQU5BLE1BRE87QUFFUEQsc0JBQVUsRUFBRSxDQUFDLFNBQUQsRUFBWSxxQ0FBWixFQUFtRCxnQ0FBbkQ7QUFGTCxXQUYyQjtBQU1wQ2QsY0FBSSxFQUFKQSx3Q0FOb0M7QUFPcENRLGVBQUssRUFBRTtBQUFFaEQsZ0JBQUksRUFBRTtBQUFSLFdBUDZCO0FBUXBDaUQsZUFBSyxFQUFFO0FBQUVqRCxnQkFBSSxFQUFFLE9BQVI7QUFBaUJxTCx1QkFBVyxFQUFFLENBQTlCO0FBQWlDQyxxQkFBUyxFQUFFO0FBQUVQLHVCQUFTLEVBQUU7QUFBYjtBQUE1QyxXQVI2QjtBQVNwQzdILGdCQUFNLEVBQUUsQ0FBQztBQUFFbEQsZ0JBQUksRUFBRTtBQUFSLFdBQUQsRUFBa0I7QUFBRUEsZ0JBQUksRUFBRTtBQUFSLFdBQWxCO0FBVDRCLFNBQXRDO0FBV0FPLGFBQUssQ0FBQ3lCLFNBQU4sQ0FBZ0IzQixPQUFoQjtBQUNEO0FBL0NJO0FBSlQsR0FoSE8sRUFzS1A7QUFDRStFLE1BQUUsRUFBRSxrQkFETjtBQUVFaEIsUUFBSSxFQUFFLGtEQUZSO0FBR0UvRSxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSyxFQUFFO0FBQ0xJLFVBQUksRUFBRSxjQUFDQSxNQUFEO0FBQUEsZUFDSnlLLDZEQUEwQixDQUFDekssTUFBRCxFQUFPLENBQUMsa0RBQUQsQ0FBUCxDQUR0QjtBQUFBLE9BREQ7QUFHTE4sYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLDJDQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFcUIsY0FBSSxFQUFFO0FBQVIsU0FGRjtBQUdQbkIsY0FBTSxFQUFFO0FBQUVtQixjQUFJLEVBQUU7QUFBUixTQUhEO0FBSVBMLGVBQU8sRUFBRTtBQUNQQyxvQkFBVSxFQUFFLENBQUMsTUFBRCxFQUFTLGtEQUFUO0FBREwsU0FKRjtBQU9QZCxZQUFJLEVBQUpBLHdDQVBPO0FBUVBRLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FSQTtBQVNQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxLQUF2QjtBQUE4QjJILHFCQUFXLEVBQUUsQ0FBM0M7QUFBOENDLG1CQUFTLEVBQUU7QUFBRVAscUJBQVMsRUFBRTtBQUFiO0FBQXpELFNBVEE7O0FBVVA7QUFDQTdILGNBQU0sRUFBRSxDQUNOO0FBQ0VsRCxjQUFJLEVBQUUsS0FEUjtBQUVFaUUsZUFBSyxFQUFFNEcseURBQWlCLENBQUM7QUFBRVAsa0JBQU0sRUFBRTtBQUFWLFdBQUQ7QUFGMUIsU0FETTtBQU1SOztBQWpCTyxPQUhKO0FBc0JMOUosYUFBTyxFQUFFLHdCQUFpRDtBQUFBLFlBQTlDRyxJQUE4QyxTQUE5Q0EsSUFBOEM7QUFBQSxZQUF4Q0osS0FBd0MsU0FBeENBLEtBQXdDO0FBQUEsWUFBakNHLE1BQWlDLFNBQWpDQSxNQUFpQztBQUN4RCxZQUFJLENBQUNBLE1BQU0sQ0FBQ0MsSUFBWixFQUFrQjtBQURzQyxZQUUxQzBJLENBRjBDLEdBRXBDM0ksTUFBTSxDQUFDQyxJQUY2QixDQUVoRGdFLElBRmdEO0FBR3hELFlBQU1wQixNQUFNLEdBQUcrRix3REFBcUIsQ0FDakMzSSxJQUFELENBQTBCd0gsTUFBMUIsQ0FDRTtBQUFBLGNBQUdvQixNQUFILFNBQUdBLE1BQUg7QUFBQSxjQUFXNUUsSUFBWCxTQUFXQSxJQUFYO0FBQUEsaUJBQ0UsQ0FBQyxrREFBRCxFQUFxRDZFLFFBQXJELENBQThERCxNQUE5RCxLQUF5RUYsQ0FBQyxLQUFLMUUsSUFEakY7QUFBQSxTQURGLENBRGtDLENBQXBDO0FBTUE4RSx1RUFBdUIsQ0FBQ2xKLEtBQUQsQ0FBdkI7QUFFQUEsYUFBSyxDQUFDeUIsU0FBTixDQUFnQjtBQUNkSyxpQkFBTyxFQUFFO0FBQUVxQixnQkFBSSxFQUFFO0FBQVIsV0FESztBQUVkTCxpQkFBTyxFQUFFO0FBQ1BFLGtCQUFNLEVBQU5BLE1BRE87QUFFUEQsc0JBQVUsRUFBRSxDQUFDLFNBQUQsRUFBWSxrREFBWjtBQUZMO0FBRkssU0FBaEI7QUFPRDtBQXhDSTtBQUpULEdBdEtPO0FBSFgsQ0FEK0MsQ0FBMUMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSlA7QUFFQTtBQUVBLElBQU1sQixPQUFPLEdBQUcsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxDQUFoQjtBQUNBLElBQU0rSSxnQkFBZ0IsR0FBRyxDQUN2Qiw2QkFEdUIsRUFFdkIsMkRBRnVCLEVBR3ZCLG9GQUh1QixFQUl2QixvRkFKdUIsRUFLdkIsMERBTHVCLENBQXpCO0FBUU8sSUFBTTNFLFdBQTRCLEdBQUcsQ0FDMUM7QUFDRXBCLElBQUUsRUFBRSxHQUROO0FBRUVPLFNBQU8sRUFBRSxDQUZYO0FBR0VuQixXQUFTLEVBQUUsU0FIYjtBQUlFVyxTQUFPLEVBQUUsQ0FDUDtBQUNFQyxNQUFFLEVBQUUsaUJBRE47QUFFRWhCLFFBQUksRUFBRSwyQ0FGUjtBQUdFL0UsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSFEsWUFBTSxFQUFFLE9BREw7QUFFSEosVUFBSSxFQUFFLGNBQUNBLEtBQUQsRUFBOEQ7QUFDbEUsWUFBTW9MLFVBQVUsR0FBR3BMLEtBQUksQ0FBQ3dILE1BQUwsQ0FBWTtBQUFBLGNBQUdvQixNQUFILFFBQUdBLE1BQUg7QUFBQSxpQkFBZ0I0QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CM0IsUUFBcEIsQ0FBNkJELE1BQTdCLENBQWhCO0FBQUEsU0FBWixDQUFuQjs7QUFFQSxZQUFNeUMsMEJBQTBCLEdBQUdELFVBQVUsQ0FBQ0UsTUFBWCxDQUFtQyxVQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDcEYsY0FBTUMsY0FBYyxhQUFNakIsZ0JBQWdCLENBQUMsQ0FBRCxDQUF0QixnQkFBK0JnQixJQUFJLENBQUNFLFFBQUwsQ0FBY0MsSUFBZCxFQUEvQixDQUFwQjs7QUFDQSxjQUFJLENBQUNKLElBQUksQ0FBQ0ssSUFBTCxDQUFVLFVBQUNDLElBQUQ7QUFBQSxtQkFBVUEsSUFBSSxDQUFDakQsTUFBTCxLQUFnQjZDLGNBQWhCLElBQWtDSSxJQUFJLENBQUM3SCxJQUFMLEtBQWN3SCxJQUFJLENBQUN4SCxJQUEvRDtBQUFBLFdBQVYsQ0FBTCxFQUFxRjtBQUNuRixnQkFBTThILGlCQUFpQixHQUFHVixVQUFVLENBQUM1RCxNQUFYLENBQ3hCO0FBQUEsa0JBQUdvQixNQUFILFNBQUdBLE1BQUg7QUFBQSxrQkFBVzVFLElBQVgsU0FBV0EsSUFBWDtBQUFBLGtCQUFpQjBILFFBQWpCLFNBQWlCQSxRQUFqQjtBQUFBLHFCQUNFOUMsTUFBTSxLQUFLNEMsSUFBSSxDQUFDNUMsTUFBaEIsSUFBMEI1RSxJQUFJLEtBQUt3SCxJQUFJLENBQUN4SCxJQUF4QyxJQUFnRDBILFFBQVEsS0FBS0YsSUFBSSxDQUFDRSxRQURwRTtBQUFBLGFBRHdCLENBQTFCO0FBSUEsZ0JBQU1LLEdBQUcsR0FBR0QsaUJBQWlCLENBQUNSLE1BQWxCLENBQXlCLFVBQUNVLFVBQUQsRUFBYVIsSUFBYjtBQUFBLHFCQUFzQlEsVUFBVSxHQUFHUixJQUFJLENBQUNqSSxLQUF4QztBQUFBLGFBQXpCLEVBQXdFLENBQXhFLENBQVo7QUFDQWdJLGdCQUFJLENBQUNVLElBQUwsaUNBQWVULElBQWY7QUFBcUI1QyxvQkFBTSxFQUFFNkMsY0FBN0I7QUFBNkNsSSxtQkFBSyxFQUFFd0k7QUFBcEQ7QUFDRDs7QUFFRCxpQkFBT1IsSUFBUDtBQUNELFNBWmtDLEVBWWhDLEVBWmdDLENBQW5DO0FBY0EsZUFBTzVDLHdEQUFxQixDQUFDMEMsMEJBQUQsQ0FBNUI7QUFDRCxPQXBCRTtBQXNCSDNMLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFcUIsY0FBSSxFQUFFLElBQVI7QUFBY3BCLGlCQUFPLEVBQUU7QUFBdkIsU0FGRjtBQUdQQyxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBSEQ7QUFJUEwsZUFBTyxFQUFFO0FBQ1BDLG9CQUFVLEVBQUUsQ0FDVixNQURVLFlBRVA2SCxnQkFBZ0IsQ0FBQyxDQUFELENBRlQsNkJBR1BBLGdCQUFnQixDQUFDLENBQUQsQ0FIVDtBQURMLFNBSkY7QUFXUDNJLFlBQUksRUFBSkEsd0NBWE87QUFZUEssZUFBTyxFQUFFO0FBQUVDLGlCQUFPLEVBQUU7QUFBRUMsdUJBQVcsRUFBRTtBQUFmO0FBQVgsU0FaRjtBQWFQQyxhQUFLLEVBQUU7QUFBRWhELGNBQUksRUFBRTtBQUFSLFNBYkE7QUFjUGlELGFBQUssRUFBRTtBQUNMakQsY0FBSSxFQUFFLE9BREQ7QUFFTDBELGNBQUksRUFBRSxJQUZEO0FBR0xtSixrQkFBUSxFQUFFO0FBQUVuSixnQkFBSSxFQUFFO0FBQVIsV0FITDtBQUlMOEgsa0JBQVEsRUFBRTtBQUFFOUgsZ0JBQUksRUFBRTtBQUFSLFdBSkw7QUFLTDRILG1CQUFTLEVBQUU7QUFBRVAscUJBQVMsRUFBRTtBQUFiO0FBTE4sU0FkQTtBQXFCUDdILGNBQU0sRUFBRSxDQUNOO0FBQUVsRCxjQUFJLEVBQUUsS0FBUjtBQUFlOE0sa0JBQVEsRUFBRSxLQUF6QjtBQUFnQ0MsZUFBSyxFQUFFO0FBQXZDLFNBRE0sRUFFTjtBQUFFL00sY0FBSSxFQUFFLEtBQVI7QUFBZThNLGtCQUFRLEVBQUUsS0FBekI7QUFBZ0NDLGVBQUssRUFBRTtBQUF2QyxTQUZNO0FBckJEO0FBdEJOLE9BZ0RBN0Qsd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBaERoQjtBQWlESDNLLGFBQU8sRUFBRSx3QkFBaUQ7QUFBQSxZQUE5Q0csSUFBOEMsU0FBOUNBLElBQThDO0FBQUEsWUFBeENKLEtBQXdDLFNBQXhDQSxLQUF3QztBQUFBLFlBQWpDRyxNQUFpQyxTQUFqQ0EsTUFBaUM7QUFDeEQsWUFBSSxDQUFDQSxNQUFNLENBQUNDLElBQVosRUFBa0I7QUFEc0MsWUFFMUMwSSxDQUYwQyxHQUVwQzNJLE1BQU0sQ0FBQ0MsSUFGNkIsQ0FFaERnRSxJQUZnRDtBQUd4RCxZQUFNb0gsVUFBVSxHQUFJcEwsSUFBRCxDQUEwQndILE1BQTFCLENBQ2pCO0FBQUEsY0FBR29CLE1BQUgsU0FBR0EsTUFBSDtBQUFBLGNBQVc1RSxJQUFYLFNBQVdBLElBQVg7QUFBQSxpQkFBc0J3RyxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CM0IsUUFBcEIsQ0FBNkJELE1BQTdCLEtBQXdDRixDQUFDLEtBQUsxRSxJQUFwRTtBQUFBLFNBRGlCLENBQW5CO0FBR0EsWUFBTXFILDBCQUEwQixHQUFHRCxVQUFVLENBQUNFLE1BQVgsQ0FBbUMsVUFBQ0MsSUFBRCxFQUFPQyxJQUFQLEVBQWdCO0FBQ3BGLGNBQU1DLGNBQWMsYUFBTWpCLGdCQUFnQixDQUFDLENBQUQsQ0FBdEIsZ0JBQStCZ0IsSUFBSSxDQUFDRSxRQUFMLENBQWNDLElBQWQsRUFBL0IsQ0FBcEI7O0FBQ0EsY0FBSSxDQUFDSixJQUFJLENBQUNLLElBQUwsQ0FBVSxVQUFDQyxJQUFEO0FBQUEsbUJBQVVBLElBQUksQ0FBQ2pELE1BQUwsS0FBZ0I2QyxjQUExQjtBQUFBLFdBQVYsQ0FBTCxFQUEwRDtBQUN4RCxnQkFBTUssaUJBQWlCLEdBQUdWLFVBQVUsQ0FBQzVELE1BQVgsQ0FDeEI7QUFBQSxrQkFBR29CLE1BQUgsU0FBR0EsTUFBSDtBQUFBLGtCQUFXM0UsT0FBWCxTQUFXQSxPQUFYO0FBQUEsa0JBQW9CeUgsUUFBcEIsU0FBb0JBLFFBQXBCO0FBQUEscUJBQ0U5QyxNQUFNLEtBQUs0QyxJQUFJLENBQUM1QyxNQUFoQixJQUEwQjNFLE9BQU8sS0FBS3VILElBQUksQ0FBQ3ZILE9BQTNDLElBQXNEeUgsUUFBUSxLQUFLRixJQUFJLENBQUNFLFFBRDFFO0FBQUEsYUFEd0IsQ0FBMUI7QUFJQSxnQkFBTUssR0FBRyxHQUFHRCxpQkFBaUIsQ0FBQ1IsTUFBbEIsQ0FBeUIsVUFBQ1UsVUFBRCxFQUFhUixJQUFiO0FBQUEscUJBQXNCUSxVQUFVLEdBQUdSLElBQUksQ0FBQ2pJLEtBQXhDO0FBQUEsYUFBekIsRUFBd0UsQ0FBeEUsQ0FBWjtBQUNBZ0ksZ0JBQUksQ0FBQ1UsSUFBTCxpQ0FBZVQsSUFBZjtBQUFxQjVDLG9CQUFNLEVBQUU2QyxjQUE3QjtBQUE2Q2xJLG1CQUFLLEVBQUV3STtBQUFwRDtBQUNELFdBUEQsTUFPTztBQUNMUixnQkFBSSxDQUFDVSxJQUFMLGlDQUFlVCxJQUFmO0FBQXFCNUMsb0JBQU0sRUFBRTZDO0FBQTdCO0FBQ0Q7O0FBRUQsaUJBQU9GLElBQVA7QUFDRCxTQWRrQyxFQWNoQyxFQWRnQyxDQUFuQztBQWVBLFlBQU0zSSxNQUFNLEdBQUcrRix3REFBcUIsQ0FBQzBDLDBCQUFELENBQXBDO0FBQ0F2Qyx1RUFBdUIsQ0FBQ2xKLEtBQUQsQ0FBdkI7QUFFQUEsYUFBSyxDQUFDeUIsU0FBTixDQUFnQjtBQUNkcUIsaUJBQU8sRUFBRTtBQUNQRSxrQkFBTSxFQUFOQSxNQURPO0FBRVBELHNCQUFVLEVBQUUsQ0FDVixTQURVLFlBRVA2SCxnQkFBZ0IsQ0FBQyxDQUFELENBRlQsNkJBR1BBLGdCQUFnQixDQUFDLENBQUQsQ0FIVDtBQUZMO0FBREssU0FBaEI7QUFVRDtBQW5GRTtBQUpQLEdBRE87QUFKWCxDQUQwQyxFQWtHMUM7QUFDRS9GLElBQUUsRUFBRSxHQUROO0FBRUVPLFNBQU8sRUFBRSxDQUZYO0FBR0VuQixXQUFTLEVBQUUsT0FIYjtBQUlFVyxTQUFPLEVBQUUsQ0FDUDtBQUNFQyxNQUFFLEVBQUUsV0FETjtBQUVFaEIsUUFBSSxFQUFFO0FBRlIsR0FETztBQUpYLENBbEcwQyxFQTZHMUM7QUFDRWdCLElBQUUsRUFBRSxHQUROO0FBRUVPLFNBQU8sRUFBRSxDQUZYO0FBR0VSLFNBQU8sRUFBRSxDQUNQO0FBQ0VDLE1BQUUsRUFBRSxtQkFETjtBQUVFaEIsUUFBSSxFQUFFK0csZ0JBQWdCLENBQUMsQ0FBRCxDQUZ4QjtBQUdFOUwsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSEksVUFBSSxFQUFFLGNBQUNBLE1BQUQ7QUFBQSxlQUNKeUssNkRBQTBCLENBQUN6SyxNQUFELEVBQU9zSCxLQUFLLEdBQVd5QixNQUFoQixDQUF1QnlCLGdCQUFnQixDQUFDLENBQUQsQ0FBdkMsQ0FBUCxDQUR0QjtBQUFBLE9BREg7QUFHSDlLLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFcUIsY0FBSSxFQUFFLElBQVI7QUFBY3BCLGlCQUFPLEVBQUUsTUFBdkI7QUFBK0J5SSxtQkFBUyxFQUFFWCx1REFBZSxDQUFDO0FBQUVHLG9CQUFRLEVBQUU7QUFBWixXQUFEO0FBQXpELFNBRkY7QUFHUGhJLGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FIRDtBQUlQTCxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQWQsU0FKRjtBQUtQM0ksWUFBSSxFQUFKQSx3Q0FMTztBQU1QSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQU5GO0FBT1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FQQTtBQVFQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxJQUF2QjtBQUE2QjJILHFCQUFXLEVBQUUsQ0FBMUM7QUFBNkNDLG1CQUFTLEVBQUU7QUFBRVAscUJBQVMsRUFBRTtBQUFiO0FBQXhELFNBUkE7QUFTUDdILGNBQU0sRUFBRSxDQUFDO0FBQUVsRCxjQUFJLEVBQUU7QUFBUixTQUFEO0FBVEQ7QUFITixPQWNBa0osd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBZGhCO0FBSlAsR0FETyxFQXNCUDtBQUNFL0YsTUFBRSxFQUFFLGdCQUROO0FBRUVoQixRQUFJLEVBQUUsOENBRlI7QUFHRS9FLFVBQU0sRUFBRSxJQUhWO0FBSUVrQixTQUFLO0FBQ0hJLFVBQUksRUFBRSxjQUFDQSxNQUFELEVBQThEO0FBQ2xFLFlBQU15TCxjQUFjLEdBQUcsV0FBdkI7O0FBQ0EsWUFBTUwsVUFBVSxHQUFHcEwsTUFBSSxDQUFDd0gsTUFBTCxDQUNqQjtBQUFBLGNBQUdvQixNQUFILFNBQUdBLE1BQUg7QUFBQSxjQUFXOEMsUUFBWCxTQUFXQSxRQUFYO0FBQUEsaUJBQTBCbEIsZ0JBQWdCLENBQUMsQ0FBRCxDQUFoQixDQUFvQjNCLFFBQXBCLENBQTZCRCxNQUE3QixLQUF3QzhDLFFBQVEsS0FBS0QsY0FBL0U7QUFBQSxTQURpQixDQUFuQjs7QUFJQSxlQUFPaEIsNkRBQTBCLENBQUNXLFVBQUQsRUFBYTlELEtBQUssR0FBV3lCLE1BQWhCLENBQXVCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUF2QyxDQUFiLENBQWpDO0FBQ0QsT0FSRTtBQVNIOUssYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLE9BREE7QUFFUEMsZUFBTyxFQUFFO0FBQUVxQixjQUFJLEVBQUUsSUFBUjtBQUFjcEIsaUJBQU8sRUFBRSxNQUF2QjtBQUErQnlJLG1CQUFTLEVBQUVYLHVEQUFlLENBQUM7QUFBRUcsb0JBQVEsRUFBRTtBQUFaLFdBQUQ7QUFBekQsU0FGRjtBQUdQaEksY0FBTSxFQUFFO0FBQUVtQixjQUFJLEVBQUU7QUFBUixTQUhEO0FBSVBMLGVBQU8sRUFBRTtBQUFFQyxvQkFBVSxFQUFFLENBQUMsTUFBRCxFQUFTb0csTUFBVCxDQUFnQnlCLGdCQUFnQixDQUFDLENBQUQsQ0FBaEM7QUFBZCxTQUpGO0FBS1AzSSxZQUFJLEVBQUpBLHdDQUxPO0FBTVBLLGVBQU8sRUFBRTtBQUFFQyxpQkFBTyxFQUFFO0FBQUVDLHVCQUFXLEVBQUU7QUFBZjtBQUFYLFNBTkY7QUFPUEMsYUFBSyxFQUFFO0FBQUVoRCxjQUFJLEVBQUU7QUFBUixTQVBBO0FBUVBpRCxhQUFLLEVBQUU7QUFBRWpELGNBQUksRUFBRSxPQUFSO0FBQWlCMEQsY0FBSSxFQUFFLElBQXZCO0FBQTZCMkgscUJBQVcsRUFBRSxDQUExQztBQUE2Q0MsbUJBQVMsRUFBRTtBQUFFUCxxQkFBUyxFQUFFO0FBQWI7QUFBeEQsU0FSQTtBQVNQN0gsY0FBTSxFQUFFLENBQUM7QUFBRWxELGNBQUksRUFBRTtBQUFSLFNBQUQ7QUFURDtBQVROLE9Bb0JBa0osd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBcEJoQjtBQUpQLEdBdEJPO0FBSFgsQ0E3RzBDLEVBbUsxQztBQUNFL0YsSUFBRSxFQUFFLEdBRE47QUFFRU8sU0FBTyxFQUFFLENBRlg7QUFHRVIsU0FBTyxFQUFFLENBQ1A7QUFDRUMsTUFBRSxFQUFFLFFBRE47QUFFRWhCLFFBQUksRUFBRTtBQUZSLEdBRE87QUFIWCxDQW5LMEMsRUE2SzFDO0FBQ0VnQixJQUFFLEVBQUUsR0FETjtBQUVFTyxTQUFPLEVBQUUsQ0FGWDtBQUdFUixTQUFPLEVBQUUsQ0FDUDtBQUNFQyxNQUFFLEVBQUUsZ0JBRE47QUFFRWhCLFFBQUksRUFBRSwyQ0FGUjtBQUdFL0UsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSEksVUFBSSxFQUFFLGNBQUNBLE1BQUQsRUFBOEQ7QUFDbEUsWUFBTXlMLGNBQWMsR0FBRyxRQUF2Qjs7QUFDQSxZQUFNTCxVQUFVLEdBQUdwTCxNQUFJLENBQUN3SCxNQUFMLENBQ2pCO0FBQUEsY0FBR29CLE1BQUgsU0FBR0EsTUFBSDtBQUFBLGNBQVc4QyxRQUFYLFNBQVdBLFFBQVg7QUFBQSxpQkFBMEJsQixnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CM0IsUUFBcEIsQ0FBNkJELE1BQTdCLEtBQXdDOEMsUUFBUSxLQUFLRCxjQUEvRTtBQUFBLFNBRGlCLENBQW5COztBQUlBLGVBQU9oQiw2REFBMEIsQ0FBQ1csVUFBRCxFQUFhOUQsS0FBSyxHQUFXeUIsTUFBaEIsQ0FBdUJ5QixnQkFBZ0IsQ0FBQyxDQUFELENBQXZDLENBQWIsQ0FBakM7QUFDRCxPQVJFO0FBU0g5SyxhQUFPLEVBQUU7QUFDUDhCLGFBQUssRUFBRUMsT0FEQTtBQUVQQyxlQUFPLEVBQUU7QUFBRXFCLGNBQUksRUFBRSxJQUFSO0FBQWNwQixpQkFBTyxFQUFFLE1BQXZCO0FBQStCeUksbUJBQVMsRUFBRVgsdURBQWUsQ0FBQztBQUFFRyxvQkFBUSxFQUFFO0FBQVosV0FBRDtBQUF6RCxTQUZGO0FBR1BoSSxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBSEQ7QUFJUEwsZUFBTyxFQUFFO0FBQUVDLG9CQUFVLEVBQUUsQ0FBQyxNQUFELEVBQVNvRyxNQUFULENBQWdCeUIsZ0JBQWdCLENBQUMsQ0FBRCxDQUFoQztBQUFkLFNBSkY7QUFLUDNJLFlBQUksRUFBSkEsd0NBTE87QUFNUEssZUFBTyxFQUFFO0FBQUVDLGlCQUFPLEVBQUU7QUFBRUMsdUJBQVcsRUFBRTtBQUFmO0FBQVgsU0FORjtBQU9QQyxhQUFLLEVBQUU7QUFBRWhELGNBQUksRUFBRTtBQUFSLFNBUEE7QUFRUGlELGFBQUssRUFBRTtBQUFFakQsY0FBSSxFQUFFLE9BQVI7QUFBaUIwRCxjQUFJLEVBQUUsSUFBdkI7QUFBNkIySCxxQkFBVyxFQUFFLENBQTFDO0FBQTZDQyxtQkFBUyxFQUFFO0FBQUVQLHFCQUFTLEVBQUU7QUFBYjtBQUF4RCxTQVJBO0FBU1A3SCxjQUFNLEVBQUUsQ0FBQztBQUFFbEQsY0FBSSxFQUFFO0FBQVIsU0FBRDtBQVREO0FBVE4sT0FvQkFrSix3REFBZ0IsQ0FBQ2lDLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsQ0FwQmhCO0FBSlAsR0FETyxFQTRCUDtBQUNFL0YsTUFBRSxFQUFFLGNBRE47QUFFRWhCLFFBQUksRUFBRSxpQ0FGUjtBQUdFL0UsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSEksVUFBSSxFQUFFLGNBQUNBLE1BQUQ7QUFBQSxlQUNKeUssNkRBQTBCLENBQUN6SyxNQUFELEVBQU9zSCxLQUFLLEdBQVd5QixNQUFoQixDQUF1QnlCLGdCQUFnQixDQUFDLENBQUQsQ0FBdkMsQ0FBUCxDQUR0QjtBQUFBLE9BREg7QUFHSDlLLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFcUIsY0FBSSxFQUFFLElBQVI7QUFBY3BCLGlCQUFPLEVBQUUsTUFBdkI7QUFBK0J5SSxtQkFBUyxFQUFFWCx1REFBZSxDQUFDO0FBQUVHLG9CQUFRLEVBQUU7QUFBWixXQUFEO0FBQXpELFNBRkY7QUFHUGhJLGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FIRDtBQUlQTCxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQWQsU0FKRjtBQUtQM0ksWUFBSSxFQUFKQSx3Q0FMTztBQU1QSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQU5GO0FBT1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FQQTtBQVFQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxJQUF2QjtBQUE2QjJILHFCQUFXLEVBQUUsQ0FBMUM7QUFBNkNDLG1CQUFTLEVBQUU7QUFBRVAscUJBQVMsRUFBRTtBQUFiO0FBQXhELFNBUkE7QUFTUDdILGNBQU0sRUFBRSxDQUFDO0FBQUVsRCxjQUFJLEVBQUU7QUFBUixTQUFEO0FBVEQ7QUFITixPQWNBa0osd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBZGhCO0FBSlAsR0E1Qk8sRUFpRFA7QUFDRS9GLE1BQUUsRUFBRSxnQkFETjtBQUVFaEIsUUFBSSxFQUFFK0csZ0JBQWdCLENBQUMsQ0FBRCxDQUZ4QjtBQUdFOUwsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSEksVUFBSSxFQUFFLGNBQUNBLE1BQUQ7QUFBQSxlQUNKeUssNkRBQTBCLENBQUN6SyxNQUFELEVBQU9zSCxLQUFLLEdBQVd5QixNQUFoQixDQUF1QnlCLGdCQUFnQixDQUFDLENBQUQsQ0FBdkMsQ0FBUCxDQUR0QjtBQUFBLE9BREg7QUFHSDlLLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFcUIsY0FBSSxFQUFFLElBQVI7QUFBY3BCLGlCQUFPLEVBQUUsTUFBdkI7QUFBK0J5SSxtQkFBUyxFQUFFWCx1REFBZSxDQUFDO0FBQUVHLG9CQUFRLEVBQUU7QUFBWixXQUFEO0FBQXpELFNBRkY7QUFHUGhJLGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FIRDtBQUlQTCxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQWQsU0FKRjtBQUtQM0ksWUFBSSxFQUFKQSx3Q0FMTztBQU1QSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQU5GO0FBT1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FQQTtBQVFQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxJQUF2QjtBQUE2QjJILHFCQUFXLEVBQUUsQ0FBMUM7QUFBNkNDLG1CQUFTLEVBQUU7QUFBRVAscUJBQVMsRUFBRTtBQUFiO0FBQXhELFNBUkE7QUFTUDdILGNBQU0sRUFBRSxDQUFDO0FBQUVsRCxjQUFJLEVBQUU7QUFBUixTQUFEO0FBVEQ7QUFITixPQWNBa0osd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBZGhCO0FBSlAsR0FqRE8sRUFzRVA7QUFDRS9GLE1BQUUsRUFBRSw0QkFETjtBQUVFaEIsUUFBSSxFQUFFK0csZ0JBQWdCLENBQUMsQ0FBRCxDQUZ4QjtBQUdFOUwsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSEksVUFBSSxFQUFFLGNBQUNBLE1BQUQ7QUFBQSxlQUNKeUssNkRBQTBCLENBQUN6SyxNQUFELEVBQU9zSCxLQUFLLEdBQVd5QixNQUFoQixDQUF1QnlCLGdCQUFnQixDQUFDLENBQUQsQ0FBdkMsQ0FBUCxDQUR0QjtBQUFBLE9BREg7QUFHSDlLLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFcUIsY0FBSSxFQUFFLElBQVI7QUFBY3BCLGlCQUFPLEVBQUUsTUFBdkI7QUFBK0J5SSxtQkFBUyxFQUFFWCx1REFBZSxDQUFDO0FBQUVHLG9CQUFRLEVBQUU7QUFBWixXQUFEO0FBQXpELFNBRkY7QUFHUGhJLGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FIRDtBQUlQTCxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQWQsU0FKRjtBQUtQM0ksWUFBSSxFQUFKQSx3Q0FMTztBQU1QSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQU5GO0FBT1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FQQTtBQVFQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxJQUF2QjtBQUE2QjJILHFCQUFXLEVBQUUsQ0FBMUM7QUFBNkNDLG1CQUFTLEVBQUU7QUFBRVAscUJBQVMsRUFBRTtBQUFiO0FBQXhELFNBUkE7QUFTUDdILGNBQU0sRUFBRSxDQUFDO0FBQUVsRCxjQUFJLEVBQUU7QUFBUixTQUFEO0FBVEQ7QUFITixPQWNBa0osd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBZGhCO0FBSlAsR0F0RU87QUFIWCxDQTdLMEMsQ0FBckMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNiUDtBQUVBO0FBRUEsSUFBTS9JLE9BQU8sR0FBRyxDQUFDLFNBQUQsRUFBWSxTQUFaLEVBQXVCLFNBQXZCLEVBQWtDLFNBQWxDLEVBQTZDLFNBQTdDLEVBQXdELFNBQXhELENBQWhCLEMsQ0FBb0Y7O0FBQ3BGLElBQU0rSSxnQkFBZ0IsR0FBRyxDQUN2QixDQUFDLGFBQUQsRUFBZ0IseUNBQWhCLEVBQTJELHVDQUEzRCxDQUR1QixFQUV2Qix5QkFGdUIsRUFHdkIsdURBSHVCLEVBSXZCLGlCQUp1QixDQUF6QjtBQU9PLElBQU02QixFQUFtQixHQUFHLENBQ2pDO0FBQ0U1SCxJQUFFLEVBQUUsR0FETjtBQUVFTyxTQUFPLEVBQUUsQ0FGWDtBQUdFUixTQUFPLEdBQ0w7QUFDRUMsTUFBRSxFQUFFLE9BRE47QUFFRWhCLFFBQUksRUFBRSwyQkFGUjtBQUdFL0UsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSEksVUFBSSxFQUFFLGNBQUNBLEtBQUQsRUFBOEQ7QUFDbEUsWUFBTW9MLFVBQVUsR0FBR3BMLEtBQUksQ0FBQ3dILE1BQUwsQ0FBWTtBQUFBLGNBQUdvQixNQUFILFFBQUdBLE1BQUg7QUFBQSxpQkFBZ0I0QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CM0IsUUFBcEIsQ0FBNkJELE1BQTdCLENBQWhCO0FBQUEsU0FBWixDQUFuQjs7QUFFQSxZQUFNeUMsMEJBQTBCLEdBQUdELFVBQVUsQ0FBQ0UsTUFBWCxDQUFtQyxVQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDcEYsY0FBSSxDQUFDRCxJQUFJLENBQUNLLElBQUwsQ0FBVSxVQUFDQyxJQUFEO0FBQUEsbUJBQVVBLElBQUksQ0FBQ2pELE1BQUwsS0FBZ0I0QyxJQUFJLENBQUM1QyxNQUFyQixJQUErQmlELElBQUksQ0FBQzdILElBQUwsS0FBY3dILElBQUksQ0FBQ3hILElBQTVEO0FBQUEsV0FBVixDQUFMLEVBQWtGO0FBQ2hGLGdCQUFNOEgsaUJBQWlCLEdBQUdWLFVBQVUsQ0FBQzVELE1BQVgsQ0FDeEI7QUFBQSxrQkFBR29CLE1BQUgsU0FBR0EsTUFBSDtBQUFBLGtCQUFXNUUsSUFBWCxTQUFXQSxJQUFYO0FBQUEscUJBQXNCNEUsTUFBTSxLQUFLNEMsSUFBSSxDQUFDNUMsTUFBaEIsSUFBMEI1RSxJQUFJLEtBQUt3SCxJQUFJLENBQUN4SCxJQUE5RDtBQUFBLGFBRHdCLENBQTFCOztBQUdBLGdCQUFJd0gsSUFBSSxDQUFDNUMsTUFBTCxLQUFnQixhQUFwQixFQUFtQztBQUNqQyxrQkFBTTBELEdBQUcsR0FBR3hDLElBQUksQ0FBQ3dDLEdBQUwsT0FBQXhDLElBQUksb0ZBQVFnQyxpQkFBaUIsQ0FBQ2xILEdBQWxCLENBQXNCLFVBQUNpSCxJQUFEO0FBQUEsdUJBQVVBLElBQUksQ0FBQ3RJLEtBQWY7QUFBQSxlQUF0QixDQUFSLEVBQWhCO0FBQ0FnSSxrQkFBSSxDQUFDVSxJQUFMLGlDQUFlVCxJQUFmO0FBQXFCakkscUJBQUssRUFBRStJO0FBQTVCO0FBQ0QsYUFIRCxNQUdPO0FBQ0wsa0JBQU1QLEdBQUcsR0FBR0QsaUJBQWlCLENBQUNSLE1BQWxCLENBQXlCLFVBQUNVLFVBQUQsRUFBYVIsSUFBYjtBQUFBLHVCQUFzQlEsVUFBVSxHQUFHUixJQUFJLENBQUNqSSxLQUF4QztBQUFBLGVBQXpCLEVBQXdFLENBQXhFLENBQVo7QUFDQWdJLGtCQUFJLENBQUNVLElBQUwsaUNBQWVULElBQWY7QUFBcUJqSSxxQkFBSyxFQUFFd0k7QUFBNUI7QUFDRDtBQUNGOztBQUVELGlCQUFPUixJQUFQO0FBQ0QsU0Fma0MsRUFlaEMsRUFmZ0MsQ0FBbkM7QUFpQkEsZUFBTzVDLHdEQUFxQixDQUFDMEMsMEJBQUQsQ0FBNUI7QUFDRCxPQXRCRTtBQXVCSDNMLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFQyxpQkFBTyxFQUFFO0FBQVgsU0FGRjtBQUdQZSxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQWQsU0FIRjtBQUlQM0ksWUFBSSxFQUFKQSx3Q0FKTztBQUtQSyxlQUFPLEVBQUU7QUFBRWEsY0FBSSxFQUFFLElBQVI7QUFBY1osaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQUVXLGtCQUFJLEVBQUU7QUFBUjtBQUFmO0FBQXZCLFNBTEY7QUFNUFYsYUFBSyxFQUFFO0FBQUVoRCxjQUFJLEVBQUU7QUFBUixTQU5BO0FBT1BpRCxhQUFLLEVBQUU7QUFBRWpELGNBQUksRUFBRSxPQUFSO0FBQWlCcUwscUJBQVcsRUFBRTtBQUE5QixTQVBBO0FBUVBuSSxjQUFNLEVBQUUsQ0FDTjtBQUFFbEQsY0FBSSxFQUFFLEtBQVI7QUFBZStNLGVBQUssRUFBRTtBQUF0QixTQURNLEVBRU47QUFBRS9NLGNBQUksRUFBRSxLQUFSO0FBQWUrTSxlQUFLLEVBQUU7QUFBdEIsU0FGTSxFQUdOO0FBQUUvTSxjQUFJLEVBQUUsS0FBUjtBQUFlK00sZUFBSyxFQUFFO0FBQXRCLFNBSE07QUFSRDtBQXZCTixPQXFDQTdELHdEQUFnQixDQUFDaUMsZ0JBQWdCLENBQUMsQ0FBRCxDQUFqQixDQXJDaEI7QUFKUCxHQURLLEVBNkNMO0FBQ0UvRixNQUFFLEVBQUUsV0FETjtBQUVFaEIsUUFBSSxFQUFFLGlCQUZSO0FBR0UvRSxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSztBQUNISSxVQUFJLEVBQUUsY0FBQ0EsTUFBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLE1BQUQsRUFBTyxDQUFDd0ssZ0JBQWdCLENBQUMsQ0FBRCxDQUFqQixDQUFQLENBRHRCO0FBQUEsT0FESDtBQUdIOUssYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLE9BREE7QUFFUEMsZUFBTyxFQUFFO0FBQUVxQixjQUFJLEVBQUUsS0FBUjtBQUFlcEIsaUJBQU8sRUFBRTtBQUF4QixTQUZGO0FBR1BDLGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FIRDtBQUlQTCxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQWQsU0FKRjtBQUtQM0ksWUFBSSxFQUFKQSx3Q0FMTztBQU1QSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQU5GO0FBT1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FQQTtBQVFQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxLQUF2QjtBQUE4QjJILHFCQUFXLEVBQUU7QUFBM0MsU0FSQTs7QUFTUDtBQUNBbkksY0FBTSxFQUFFLENBQUM7QUFBRWxELGNBQUksRUFBRSxLQUFSO0FBQWVpRSxlQUFLLEVBQUU0Ryx5REFBaUIsQ0FBQyxFQUFEO0FBQXZDLFNBQUQ7QUFWRDtBQUhOLE9BZUEzQix3REFBZ0IsQ0FBQ2lDLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsQ0FmaEI7QUFKUCxHQTdDSywyRkFtRUYsQ0FDRDtBQUFFL0YsTUFBRSxFQUFFLGlCQUFOO0FBQXlCaEIsUUFBSSxFQUFFO0FBQS9CLEdBREMsRUFFRDtBQUFFZ0IsTUFBRSxFQUFFLG1CQUFOO0FBQTJCaEIsUUFBSSxFQUFFO0FBQWpDLEdBRkMsRUFHRG1CLEdBSEMsQ0FHcUIsaUJBQWtCO0FBQUEsUUFBZkgsRUFBZSxTQUFmQSxFQUFlO0FBQUEsUUFBWGhCLElBQVcsU0FBWEEsSUFBVztBQUN4QyxXQUFPO0FBQ0xnQixRQUFFLEVBQUVBLEVBREM7QUFFTGhCLFVBQUksRUFBRUEsSUFGRDtBQUdML0UsWUFBTSxFQUFFLElBSEg7QUFJTGtCLFdBQUs7QUFDSEksWUFBSSxFQUFFLGNBQUNBLE1BQUQ7QUFBQSxpQkFDSnlLLDZEQUEwQixDQUFDekssTUFBRCxFQUFPLENBQUN5RCxJQUFELENBQVAsQ0FEdEI7QUFBQSxTQURIO0FBR0gvRCxlQUFPLEVBQUU7QUFDUDhCLGVBQUssRUFBRUMsT0FEQTtBQUVQQyxpQkFBTyxFQUFFO0FBQUVDLG1CQUFPLEVBQUU7QUFBWCxXQUZGO0FBR1BDLGdCQUFNLEVBQUU7QUFBRW1CLGdCQUFJLEVBQUU7QUFBUixXQUhEO0FBSVBMLGlCQUFPLEVBQUU7QUFBRUMsc0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU2MsSUFBVDtBQUFkLFdBSkY7QUFLUHZCLGlCQUFPLEVBQUU7QUFBRWEsZ0JBQUksRUFBRSxJQUFSO0FBQWNaLG1CQUFPLEVBQUU7QUFBRUMseUJBQVcsRUFBRTtBQUFFVyxvQkFBSSxFQUFFO0FBQVI7QUFBZjtBQUF2QixXQUxGO0FBTVBWLGVBQUssRUFBRTtBQUFFaEQsZ0JBQUksRUFBRSxVQUFSO0FBQW9COEssb0JBQVEsRUFBRTtBQUE5QixXQU5BO0FBT1A3SCxlQUFLLEVBQUU7QUFBRWpELGdCQUFJLEVBQUUsT0FBUjtBQUFpQjJMLGlCQUFLLEVBQUUsSUFBeEI7QUFBOEJOLHVCQUFXLEVBQUU7QUFBM0MsV0FQQTtBQVFQbkksZ0JBQU0sRUFBRSxDQUFDO0FBQUVsRCxnQkFBSSxFQUFFLEtBQVI7QUFBZWlFLGlCQUFLLEVBQUU0Ryx5REFBaUIsQ0FBQztBQUFFQyxzQkFBUSxFQUFFO0FBQVosYUFBRDtBQUF2QyxXQUFEO0FBUkQ7QUFITixTQWFBNUIsd0RBQWdCLENBQUM5RSxJQUFELENBYmhCO0FBSkEsS0FBUDtBQW9CRCxHQXhCRSxDQW5FRSxJQTRGTDtBQUNFZ0IsTUFBRSxFQUFFLGlCQUROO0FBRUVoQixRQUFJLEVBQUUseUJBRlI7QUFHRS9FLFVBQU0sRUFBRSxJQUhWO0FBSUVrQixTQUFLO0FBQ0hJLFVBQUksRUFBRSxjQUFDQSxNQUFEO0FBQUEsZUFDSnlLLDZEQUEwQixDQUFDekssTUFBRCxFQUFPLENBQUN3SyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBQVAsQ0FEdEI7QUFBQSxPQURIO0FBR0g5SyxhQUFPLEVBQUU7QUFDUDhCLGFBQUssRUFBRUMsT0FEQTtBQUVQQyxlQUFPLEVBQUU7QUFBRXFCLGNBQUksRUFBRSxJQUFSO0FBQWNwQixpQkFBTyxFQUFFO0FBQXZCLFNBRkY7QUFHUEMsY0FBTSxFQUFFO0FBQUVtQixjQUFJLEVBQUU7QUFBUixTQUhEO0FBSVBMLGVBQU8sRUFBRTtBQUFFQyxvQkFBVSxFQUFFLENBQUMsTUFBRCxFQUFTb0csTUFBVCxDQUFnQnlCLGdCQUFnQixDQUFDLENBQUQsQ0FBaEMsRUFBcUMsUUFBckM7QUFBZCxTQUpGO0FBS1AzSSxZQUFJLEVBQUpBLHdDQUxPO0FBTVBLLGVBQU8sRUFBRTtBQUFFQyxpQkFBTyxFQUFFO0FBQUVDLHVCQUFXLEVBQUU7QUFBZjtBQUFYLFNBTkY7QUFPUEMsYUFBSyxFQUFFO0FBQUVoRCxjQUFJLEVBQUU7QUFBUixTQVBBO0FBUVBpRCxhQUFLLEVBQUU7QUFBRWpELGNBQUksRUFBRSxPQUFSO0FBQWlCMEQsY0FBSSxFQUFFLEtBQXZCO0FBQThCMkgscUJBQVcsRUFBRTtBQUEzQyxTQVJBO0FBU1BuSSxjQUFNLEVBQUUsQ0FDTjtBQUFFbEQsY0FBSSxFQUFFLEtBQVI7QUFBZWlFLGVBQUssRUFBRTRHLHlEQUFpQixDQUFDO0FBQUVOLG9CQUFRLEVBQUUsSUFBWjtBQUFrQkQsa0JBQU0sRUFBRTtBQUExQixXQUFELENBQXZDO0FBQTBFNEMsZ0JBQU0sRUFBRTtBQUFsRixTQURNLEVBRU47QUFBRWxOLGNBQUksRUFBRTtBQUFSLFNBRk07QUFURDtBQUhOLE9BaUJBa0osd0RBQWdCLENBQUMsQ0FBQ2lDLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsRUFBZ0MsUUFBaEMsQ0FBRCxFQUE0QztBQUM3RGpJLFlBQU0sRUFBRSxDQUNOLEVBRE0sRUFFTjtBQUNFbEQsWUFBSSxFQUFFLE1BRFI7QUFFRTRMLGNBQU0sRUFBRSxNQUZWO0FBR0VDLGlCQUFTLEVBQUU7QUFBRTdMLGNBQUksRUFBRSxRQUFSO0FBQWtCbUMsZUFBSyxFQUFFO0FBQXpCLFNBSGI7QUFJRTJKLGlCQUFTLEVBQUU7QUFBRTNKLGVBQUssRUFBRTtBQUFULFNBSmI7QUFLRWdMLGNBQU0sRUFBRTtBQUxWLE9BRk07QUFEcUQsS0FBNUMsQ0FqQmhCO0FBSlAsR0E1RkssRUErSEw7QUFDRS9ILE1BQUUsRUFBRSwrQkFETjtBQUVFaEIsUUFBSSxFQUFFLHVEQUZSO0FBR0UvRSxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSztBQUNISSxVQUFJLEVBQUUsY0FBQ0EsTUFBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLE1BQUQsRUFBTyxDQUFDd0ssZ0JBQWdCLENBQUMsQ0FBRCxDQUFqQixDQUFQLENBRHRCO0FBQUEsT0FESDtBQUdIOUssYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLE9BREE7QUFFUEMsZUFBTyxFQUFFO0FBQUVxQixjQUFJLEVBQUUsS0FBUjtBQUFlcEIsaUJBQU8sRUFBRTtBQUF4QixTQUZGO0FBR1BDLGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FIRDtBQUlQTCxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsRUFBRSxDQUFDLE1BQUQsRUFBU29HLE1BQVQsQ0FBZ0J5QixnQkFBZ0IsQ0FBQyxDQUFELENBQWhDO0FBQWQsU0FKRjtBQUtQM0ksWUFBSSxFQUFKQSx3Q0FMTztBQU1QSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQU5GO0FBT1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FQQTtBQVFQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxLQUF2QjtBQUE4QjJILHFCQUFXLEVBQUU7QUFBM0MsU0FSQTtBQVNQbkksY0FBTSxFQUFFLENBQUM7QUFBRWxELGNBQUksRUFBRSxLQUFSO0FBQWVpRSxlQUFLLEVBQUU0Ryx5REFBaUIsQ0FBQztBQUFFUCxrQkFBTSxFQUFFO0FBQVYsV0FBRDtBQUF2QyxTQUFEO0FBVEQ7QUFITixPQWNBcEIsd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBZGhCO0FBSlAsR0EvSEssRUFvSkw7QUFDRS9GLE1BQUUsRUFBRSxXQUROO0FBRUVoQixRQUFJLEVBQUUsaUJBRlI7QUFHRS9FLFVBQU0sRUFBRSxJQUhWO0FBSUVrQixTQUFLO0FBQ0hJLFVBQUksRUFBRSxjQUFDQSxNQUFELEVBQThEO0FBQ2xFLFlBQU15TSxXQUFXLEdBQUd6TSxNQUFJLENBQUN3SCxNQUFMLENBQ2xCO0FBQUEsY0FBR29CLE1BQUgsU0FBR0EsTUFBSDtBQUFBLGNBQVczRSxPQUFYLFNBQVdBLE9BQVg7QUFBQSxpQkFBeUIyRSxNQUFNLEtBQUssaUJBQVgsSUFBZ0M4RCxrREFBQSxDQUFvQnpJLE9BQXBCLENBQXpEO0FBQUEsU0FEa0IsQ0FBcEI7O0FBSUEsZUFBT3dHLDZEQUEwQixDQUFDZ0MsV0FBRCxFQUFjLENBQUMsaUJBQUQsQ0FBZCxFQUFtQyxLQUFuQyxFQUEwQyxPQUExQyxDQUFqQztBQUNELE9BUEU7QUFRSC9NLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFQyxpQkFBTyxFQUFFO0FBQVgsU0FGRjtBQUdQQyxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBSEQ7QUFJUEwsZUFBTyxFQUFFO0FBQUVDLG9CQUFVLEVBQUUsQ0FBQyxNQUFELEVBQVMsaUJBQVQ7QUFBZCxTQUpGO0FBS1BkLFlBQUksRUFBSkEsd0NBTE87QUFNUEssZUFBTyxFQUFFO0FBQUVhLGNBQUksRUFBRSxJQUFSO0FBQWNaLGlCQUFPLEVBQUU7QUFBRUMsdUJBQVcsRUFBRTtBQUFFVyxrQkFBSSxFQUFFO0FBQVI7QUFBZjtBQUF2QixTQU5GO0FBT1BWLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFLFVBQVI7QUFBb0J3TCxrQkFBUSxFQUFFO0FBQUVDLDBCQUFjLEVBQUUsSUFBbEI7QUFBd0I2QixvQkFBUSxFQUFFO0FBQWxDO0FBQTlCLFNBUEE7QUFRUHJLLGFBQUssRUFBRTtBQUFFakQsY0FBSSxFQUFFLE9BQVI7QUFBaUJxTCxxQkFBVyxFQUFFO0FBQTlCLFNBUkE7QUFTUG5JLGNBQU0sRUFBRSxDQUFDO0FBQUVsRCxjQUFJLEVBQUUsS0FBUjtBQUFlaUUsZUFBSyxFQUFFNEcseURBQWlCLENBQUMsRUFBRDtBQUF2QyxTQUFEO0FBVEQ7QUFSTixPQW1CQTNCLHdEQUFnQixDQUFDLGlCQUFELEVBQW9CO0FBQUVqRyxXQUFLLEVBQUU7QUFBRVMsWUFBSSxFQUFFO0FBQVI7QUFBVCxLQUFwQixFQUFnRCxPQUFoRCxDQW5CaEI7QUFKUCxHQXBKSyxFQThLTDtBQUNFMEIsTUFBRSxFQUFFLGlCQUROO0FBRUVoQixRQUFJLEVBQUUsNkRBRlI7QUFHRS9FLFVBQU0sRUFBRSxJQUhWO0FBSUVrQixTQUFLO0FBQ0hJLFVBQUksRUFBRSxjQUFDQSxNQUFELEVBQThEO0FBQ2xFLFlBQU15TSxXQUFXLEdBQUd6TSxNQUFJLENBQUN3SCxNQUFMLENBQ2xCO0FBQUEsY0FBR29CLE1BQUgsU0FBR0EsTUFBSDtBQUFBLGNBQVczRSxPQUFYLFNBQVdBLE9BQVg7QUFBQSxpQkFDRTJFLE1BQU0sS0FBSyxpREFBWCxJQUFnRThELGtEQUFBLENBQW9CekksT0FBcEIsQ0FEbEU7QUFBQSxTQURrQixDQUFwQjs7QUFLQSxlQUFPd0csNkRBQTBCLENBQy9CZ0MsV0FEK0IsRUFFL0IsQ0FBQyxpREFBRCxDQUYrQixFQUcvQixLQUgrQixFQUkvQixPQUorQixDQUFqQztBQU1ELE9BYkU7QUFjSC9NLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFQyxpQkFBTyxFQUFFO0FBQVgsU0FGRjtBQUdQQyxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBSEQ7QUFJUEwsZUFBTyxFQUFFO0FBQUVDLG9CQUFVLEVBQUUsQ0FBQyxNQUFELEVBQVMsaURBQVQ7QUFBZCxTQUpGO0FBS1BkLFlBQUksRUFBSkEsd0NBTE87QUFNUEssZUFBTyxFQUFFO0FBQUVhLGNBQUksRUFBRSxJQUFSO0FBQWNaLGlCQUFPLEVBQUU7QUFBRUMsdUJBQVcsRUFBRTtBQUFFVyxrQkFBSSxFQUFFO0FBQVI7QUFBZjtBQUF2QixTQU5GO0FBT1BWLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFLFVBQVI7QUFBb0J3TCxrQkFBUSxFQUFFO0FBQUVDLDBCQUFjLEVBQUUsSUFBbEI7QUFBd0I2QixvQkFBUSxFQUFFO0FBQWxDO0FBQTlCLFNBUEE7QUFRUHJLLGFBQUssRUFBRTtBQUFFakQsY0FBSSxFQUFFLE9BQVI7QUFBaUJxTCxxQkFBVyxFQUFFO0FBQTlCLFNBUkE7QUFTUG5JLGNBQU0sRUFBRSxDQUFDO0FBQUVsRCxjQUFJLEVBQUUsS0FBUjtBQUFlaUUsZUFBSyxFQUFFNEcseURBQWlCLENBQUMsRUFBRDtBQUF2QyxTQUFEO0FBVEQ7QUFkTixPQXlCQTNCLHdEQUFnQixDQUFDLGlEQUFELEVBQW9EO0FBQUVqRyxXQUFLLEVBQUU7QUFBRVMsWUFBSSxFQUFFO0FBQVI7QUFBVCxLQUFwRCxFQUFnRixPQUFoRixDQXpCaEI7QUFKUCxHQTlLSztBQUhULENBRGlDLENBQTVCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDWlA7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDSkE7QUFFQTtBQUVBLElBQU10QixPQUFPLEdBQUcsQ0FBQyxTQUFELEVBQVksU0FBWixFQUF1QixTQUF2QixFQUFrQyxTQUFsQyxFQUE2QyxTQUE3QyxDQUFoQjtBQUNBLElBQU0rSSxnQkFBZ0IsR0FBRyxDQUN2QixpRUFEdUIsRUFFdkIsQ0FBQyx3QkFBRCxFQUEyQix1QkFBM0IsQ0FGdUIsRUFHdkIsQ0FDRSx5Q0FERixFQUVFLHdDQUZGLEVBR0UsMENBSEYsQ0FIdUIsRUFRdkIsQ0FBQyx5QkFBRCxFQUE0QiwwQkFBNUIsRUFBd0QscUJBQXhELENBUnVCLENBQXpCO0FBV08sSUFBTTdFLGlCQUFrQyxHQUFHLENBQ2hEO0FBQ0VsQixJQUFFLEVBQUUsR0FETjtBQUVFTyxTQUFPLEVBQUUsQ0FGWDtBQUdFUixTQUFPLEVBQUUsQ0FDUDtBQUNFQyxNQUFFLEVBQUUsY0FETjtBQUVFaEIsUUFBSSxFQUFFK0csZ0JBQWdCLENBQUMsQ0FBRCxDQUZ4QjtBQUdFOUwsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSEksVUFBSSxFQUFFLGNBQUNBLEtBQUQ7QUFBQSxlQUNKeUssNkRBQTBCLENBQUN6SyxLQUFELEVBQU8sQ0FBQ3dLLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsQ0FBUCxDQUR0QjtBQUFBLE9BREg7QUFHSDlLLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFcUIsY0FBSSxFQUFFLEtBQVI7QUFBZXBCLGlCQUFPLEVBQUU7QUFBeEIsU0FGRjtBQUdQQyxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBSEQ7QUFJUEwsZUFBTyxFQUFFO0FBQUVDLG9CQUFVLEVBQUUsQ0FBQyxNQUFELEVBQVM2SCxnQkFBZ0IsQ0FBQyxDQUFELENBQXpCO0FBQWQsU0FKRjtBQUtQM0ksWUFBSSxFQUFKQSx3Q0FMTztBQU1QSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQU5GO0FBT1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FQQTtBQVFQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxLQUF2QjtBQUE4QjJILHFCQUFXLEVBQUU7QUFBM0MsU0FSQTtBQVNQbkksY0FBTSxFQUFFLENBQ047QUFDRWxELGNBQUksRUFBRSxLQURSO0FBRUVpRSxlQUFLLEVBQUU7QUFDTFAsZ0JBQUksRUFBRSxJQUREO0FBRUxvSCxvQkFBUSxFQUFFLEtBRkw7O0FBR0w7QUFDQUMscUJBQVMsRUFBRSxtQkFBQ3JLLE1BQUQ7QUFBQSwrQkFBNEJBLE1BQU0sQ0FBQ3dELEtBQVAsQ0FBYXhELE1BQU0sQ0FBQ3NLLGNBQVAsQ0FBc0J0SyxNQUFNLENBQUN1SyxNQUFQLENBQWM1QixDQUFkLENBQWdCLENBQWhCLENBQXRCLENBQWIsQ0FBNUI7QUFBQTtBQUpOO0FBRlQsU0FETTtBQVREO0FBSE4sT0F3QkFILHdEQUFnQixDQUFDaUMsZ0JBQWdCLENBQUMsQ0FBRCxDQUFqQixDQXhCaEI7QUFKUCxHQURPLEVBZ0NQO0FBQ0UvRixNQUFFLEVBQUUsaUJBRE47QUFFRWhCLFFBQUksRUFBRSw2QkFGUjtBQUdFL0UsVUFBTSxFQUFFLElBSFY7QUFJRWtCLFNBQUs7QUFDSEksVUFBSSxFQUFFLGNBQUNBLE1BQUQ7QUFBQSxlQUNKeUssNkRBQTBCLENBQUN6SyxNQUFELEVBQU93SyxnQkFBZ0IsQ0FBQyxDQUFELENBQXZCLENBRHRCO0FBQUEsT0FESDtBQUdIOUssYUFBTyxFQUFFO0FBQ1A4QixhQUFLLEVBQUVDLE9BREE7QUFFUEMsZUFBTyxFQUFFO0FBQUVxQixjQUFJLEVBQUUsSUFBUjtBQUFjcEIsaUJBQU8sRUFBRTtBQUF2QixTQUZGO0FBR1BDLGNBQU0sRUFBRTtBQUFFbUIsY0FBSSxFQUFFO0FBQVIsU0FIRDtBQUlQTCxlQUFPLEVBQUU7QUFBRUMsb0JBQVUsR0FBRyxNQUFILDJGQUFlNkgsZ0JBQWdCLENBQUMsQ0FBRCxDQUEvQjtBQUFaLFNBSkY7QUFLUDNJLFlBQUksRUFBSkEsd0NBTE87QUFNUEssZUFBTyxFQUFFO0FBQUVDLGlCQUFPLEVBQUU7QUFBRUMsdUJBQVcsRUFBRTtBQUFmO0FBQVgsU0FORjtBQU9QQyxhQUFLLEVBQUU7QUFBRWhELGNBQUksRUFBRTtBQUFSLFNBUEE7QUFRUGlELGFBQUssRUFBRTtBQUFFakQsY0FBSSxFQUFFLE9BQVI7QUFBaUIwRCxjQUFJLEVBQUUsSUFBdkI7QUFBNkIySCxxQkFBVyxFQUFFO0FBQTFDLFNBUkE7QUFTUG5JLGNBQU0sRUFBRSxDQUFDO0FBQUVsRCxjQUFJLEVBQUU7QUFBUixTQUFELEVBQWtCO0FBQUVBLGNBQUksRUFBRTtBQUFSLFNBQWxCO0FBVEQ7QUFITixPQWNBa0osd0RBQWdCLENBQUNpQyxnQkFBZ0IsQ0FBQyxDQUFELENBQWpCLENBZGhCO0FBSlAsR0FoQ08sRUFxRFA7QUFDRS9GLE1BQUUsRUFBRSxnQkFETjtBQUVFaEIsUUFBSSxFQUFFLGdCQUZSO0FBR0UvRSxVQUFNLEVBQUUsSUFIVjtBQUlFa0IsU0FBSztBQUNISSxVQUFJLEVBQUUsY0FBQ0EsTUFBRDtBQUFBLGVBQ0p5Syw2REFBMEIsQ0FBQ3pLLE1BQUQsRUFBT3dLLGdCQUFnQixDQUFDLENBQUQsQ0FBdkIsQ0FEdEI7QUFBQSxPQURIO0FBR0g5SyxhQUFPLEVBQUU7QUFDUDhCLGFBQUssRUFBRUMsT0FEQTtBQUVQQyxlQUFPLEVBQUU7QUFBRXFCLGNBQUksRUFBRSxJQUFSO0FBQWNwQixpQkFBTyxFQUFFO0FBQXZCLFNBRkY7QUFHUEMsY0FBTSxFQUFFO0FBQUVtQixjQUFJLEVBQUU7QUFBUixTQUhEO0FBSVBMLGVBQU8sRUFBRTtBQUFFQyxvQkFBVSxHQUFHLE1BQUgsMkZBQWU2SCxnQkFBZ0IsQ0FBQyxDQUFELENBQS9CO0FBQVosU0FKRjtBQUtQM0ksWUFBSSxFQUFKQSx3Q0FMTztBQU1QSyxlQUFPLEVBQUU7QUFBRUMsaUJBQU8sRUFBRTtBQUFFQyx1QkFBVyxFQUFFO0FBQWY7QUFBWCxTQU5GO0FBT1BDLGFBQUssRUFBRTtBQUFFaEQsY0FBSSxFQUFFO0FBQVIsU0FQQTtBQVFQaUQsYUFBSyxFQUFFO0FBQUVqRCxjQUFJLEVBQUUsT0FBUjtBQUFpQjBELGNBQUksRUFBRSxJQUF2QjtBQUE2QjJILHFCQUFXLEVBQUU7QUFBMUMsU0FSQTtBQVNQbkksY0FBTSxFQUFFLENBQUM7QUFBRWxELGNBQUksRUFBRTtBQUFSLFNBQUQsRUFBa0I7QUFBRUEsY0FBSSxFQUFFO0FBQVIsU0FBbEI7QUFURDtBQUhOLE9BY0FrSix3REFBZ0IsQ0FBQ2lDLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsQ0FkaEI7QUFKUCxHQXJETyxFQTBFUDtBQUNFL0YsTUFBRSxFQUFFLGtCQUROO0FBRUVoQixRQUFJLEVBQUUsa0JBRlI7QUFHRS9FLFVBQU0sRUFBRSxJQUhWO0FBSUVrQixTQUFLO0FBQ0hJLFVBQUksRUFBRSxjQUFDQSxNQUFEO0FBQUEsZUFDSnlLLDZEQUEwQixDQUFDekssTUFBRCxFQUFPd0ssZ0JBQWdCLENBQUMsQ0FBRCxDQUF2QixDQUR0QjtBQUFBLE9BREg7QUFHSDlLLGFBQU8sRUFBRTtBQUNQOEIsYUFBSyxFQUFFQyxPQURBO0FBRVBDLGVBQU8sRUFBRTtBQUFFcUIsY0FBSSxFQUFFLElBQVI7QUFBY3BCLGlCQUFPLEVBQUU7QUFBdkIsU0FGRjtBQUdQQyxjQUFNLEVBQUU7QUFBRW1CLGNBQUksRUFBRTtBQUFSLFNBSEQ7QUFJUEwsZUFBTyxFQUFFO0FBQUVDLG9CQUFVLEdBQUcsTUFBSCwyRkFBZTZILGdCQUFnQixDQUFDLENBQUQsQ0FBL0I7QUFBWixTQUpGO0FBS1AzSSxZQUFJLEVBQUpBLHdDQUxPO0FBTVBLLGVBQU8sRUFBRTtBQUFFQyxpQkFBTyxFQUFFO0FBQUVDLHVCQUFXLEVBQUU7QUFBZjtBQUFYLFNBTkY7QUFPUEMsYUFBSyxFQUFFO0FBQUVoRCxjQUFJLEVBQUU7QUFBUixTQVBBO0FBUVBpRCxhQUFLLEVBQUU7QUFBRWpELGNBQUksRUFBRSxPQUFSO0FBQWlCMEQsY0FBSSxFQUFFLElBQXZCO0FBQTZCMkgscUJBQVcsRUFBRSxDQUExQztBQUE2Q0MsbUJBQVMsRUFBRTtBQUFFUCxxQkFBUyxFQUFFO0FBQWI7QUFBeEQsU0FSQTtBQVNQN0gsY0FBTSxFQUFFLENBQUM7QUFBRWxELGNBQUksRUFBRTtBQUFSLFNBQUQsRUFBa0I7QUFBRUEsY0FBSSxFQUFFO0FBQVIsU0FBbEI7QUFURDtBQUhOLE9BY0FrSix3REFBZ0IsQ0FBQ2lDLGdCQUFnQixDQUFDLENBQUQsQ0FBakIsQ0FkaEI7QUFKUCxHQTFFTztBQUhYLENBRGdELENBQTNDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2R5QztBQUN6QyxJQUFNa0MsVUFBVSxHQUFHLENBQ3hCLFNBRHdCLEVBRXhCLFVBRndCLEVBR3hCLE9BSHdCLEVBSXhCLE9BSndCLEVBS3hCLEtBTHdCLEVBTXhCLE1BTndCLEVBT3hCLE1BUHdCLEVBUXhCLFFBUndCLEVBU3hCLFdBVHdCLEVBVXhCLFNBVndCLEVBV3hCLFVBWHdCLEVBWXhCLFVBWndCLENBQW5CO0FBY1AsSUFBTUUsTUFBTSxHQUFHLENBQUMsS0FBRCxFQUFRLEtBQVIsRUFBZSxLQUFmLEVBQXNCLEtBQXRCLEVBQTZCLEtBQTdCLEVBQW9DLE1BQXBDLEVBQTRDLE1BQTVDLEVBQW9ELEtBQXBELEVBQTJELE1BQTNELEVBQW1FLEtBQW5FLEVBQTBFLEtBQTFFLEVBQWlGLEtBQWpGLENBQWY7QUFFTyxJQUFNQyxjQUFjLEdBQUcsU0FBakJBLGNBQWlCLENBQUNDLFVBQUQsRUFBMEM7QUFDdEUsTUFBSTtBQUNGLFFBQU1DLElBQUksR0FBRyxJQUFJOUcsSUFBSixDQUFTNkcsVUFBVCxDQUFiO0FBQ0EsUUFBTTdJLE9BQU8sR0FBRzZGLElBQUksQ0FBQ2tELEtBQUwsQ0FBVyxDQUFDRCxJQUFJLENBQUNFLFFBQUwsS0FBa0IsQ0FBbkIsSUFBd0IsQ0FBbkMsQ0FBaEI7QUFFQSxXQUFPLENBQUNoSixPQUFELEVBQVU4SSxJQUFJLENBQUNHLFdBQUwsRUFBVixDQUFQO0FBQ0QsR0FMRCxDQUtFLE9BQU9yRyxLQUFQLEVBQWM7QUFDZCxXQUFPLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBUDtBQUNEO0FBQ0YsQ0FUTTtBQVdBLElBQU1zRyxZQUFZLEdBQUcsU0FBZkEsWUFBZSxDQUFDTCxVQUFELEVBQTBDO0FBQ3BFLE1BQUk7QUFDRixRQUFNQyxJQUFJLEdBQUcsSUFBSTlHLElBQUosQ0FBUzZHLFVBQVQsQ0FBYjtBQUVBLFdBQU8sQ0FBQ0YsTUFBTSxDQUFDRyxJQUFJLENBQUNFLFFBQUwsRUFBRCxDQUFQLEVBQTBCRixJQUFJLENBQUNHLFdBQUwsRUFBMUIsQ0FBUDtBQUNELEdBSkQsQ0FJRSxPQUFPckcsS0FBUCxFQUFjO0FBQ2QsV0FBTyxDQUFDLEVBQUQsRUFBSyxDQUFMLENBQVA7QUFDRDtBQUNGLENBUk07O0FBVVAsSUFBTXVHLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEIsQ0FBQ3BOLElBQUQsRUFBd0I0SSxNQUF4QixFQUF3Q21FLElBQXhDLEVBQXdFO0FBQ3RHLE1BQU0vSSxJQUFJLEdBQUcsSUFBSWlDLElBQUosQ0FBUzhHLElBQVQsRUFBZUcsV0FBZixFQUFiO0FBQ0EsTUFBTUcsVUFBVSxHQUFHck4sSUFBSSxDQUFDNEwsSUFBTCxDQUFVLFVBQUNDLElBQUQ7QUFBQSxXQUFVakQsTUFBTSxLQUFLaUQsSUFBSSxDQUFDakQsTUFBaEIsSUFBMEJpRCxJQUFJLENBQUM3SCxJQUFMLEtBQWNBLElBQXhDLElBQWdENkgsSUFBSSxDQUFDNUgsT0FBTCxLQUFpQixRQUEzRTtBQUFBLEdBQVYsQ0FBbkI7QUFFQSxTQUFRb0osVUFBVSxJQUFJQSxVQUFVLENBQUNDLE1BQTFCLElBQXFDLElBQTVDO0FBQ0QsQ0FMRDs7QUFPTyxJQUFNM0UscUJBQXFCLEdBQUcsU0FBeEJBLHFCQUF3QixDQUNuQzNJLElBRG1DLEVBR0c7QUFBQSxNQUR0Q3lJLFFBQ3NDLHVFQURiLFNBQ2E7O0FBQ3RDO0FBQ0EsTUFBTUQsT0FBTyxHQUFHLGtGQUFJLElBQUkrRSxHQUFKLENBQVF2TixJQUFJLENBQUM0RSxHQUFMLENBQVM7QUFBQSxRQUFHZ0UsTUFBSCxRQUFHQSxNQUFIO0FBQUEsV0FBZ0JBLE1BQWhCO0FBQUEsR0FBVCxDQUFSLENBQVAsQ0FBYjs7QUFDQSxNQUFNNEUsS0FBSyxHQUFHLGtGQUFJLElBQUlELEdBQUosQ0FBUXZOLElBQUksQ0FBQzRFLEdBQUwsQ0FBUztBQUFBLFFBQUdtSSxJQUFILFNBQUdBLElBQUg7QUFBQSxXQUFjQSxJQUFkO0FBQUEsR0FBVCxDQUFSLENBQUosRUFBMkNVLElBQTNDLEVBQWQ7O0FBRUEsU0FBT0QsS0FBSyxDQUFDbEMsTUFBTixDQUFnRCxVQUFDQyxJQUFELEVBQU93QixJQUFQLEVBQWdCO0FBQUEsZ0JBQ3hDdEUsUUFBUSxLQUFLLFNBQWIsR0FBeUJvRSxjQUFjLENBQUNFLElBQUQsQ0FBdkMsR0FBZ0RJLFlBQVksQ0FBQ0osSUFBRCxDQURwQjtBQUFBO0FBQUEsUUFDOURXLFlBRDhEO0FBQUEsUUFDaEQxSixJQURnRDs7QUFFckUsUUFBTUMsT0FBTyxHQUFHd0UsUUFBUSxLQUFLLFNBQWIsYUFBNEJ6RSxJQUE1QixlQUFxQzBKLFlBQXJDLElBQXNEQSxZQUF0RTtBQUNBLFFBQU1DLGVBQWUsR0FBR3BDLElBQUksQ0FBQ0ssSUFBTCxDQUFVLFVBQUNnQyxRQUFEO0FBQUEsYUFBY0EsUUFBUSxDQUFDM0osT0FBVCxLQUFxQkEsT0FBbkM7QUFBQSxLQUFWLENBQXhCO0FBQ0EsUUFBTXZCLE9BQXdDLEdBQUdpTCxlQUFlLElBQUk7QUFBRTFKLGFBQU8sRUFBRUEsT0FBWDtBQUFvQkQsVUFBSSxFQUFKQTtBQUFwQixLQUFwRTtBQUVBd0UsV0FBTyxDQUFDTixPQUFSLENBQWdCLFVBQUNVLE1BQUQsRUFBWTtBQUMxQixVQUFNaUYsWUFBWSxHQUFHN04sSUFBSSxDQUFDNEwsSUFBTCxDQUFVLFVBQUNDLElBQUQ7QUFBQSxlQUFVQSxJQUFJLENBQUNrQixJQUFMLEtBQWNBLElBQWQsSUFBc0JuRSxNQUFNLEtBQUtpRCxJQUFJLENBQUNqRCxNQUFoRDtBQUFBLE9BQVYsQ0FBckI7O0FBQ0EsVUFBSWlGLFlBQUosRUFBa0I7QUFDaEIsWUFBSUYsZUFBSixFQUFxQjtBQUNsQmpMLGlCQUFPLENBQUNrRyxNQUFELENBQVIsSUFBK0JpRixZQUFZLENBQUN0SyxLQUE1QztBQUNELFNBRkQsTUFFTztBQUNMYixpQkFBTyxDQUFDa0csTUFBRCxDQUFQLEdBQWtCaUYsWUFBWSxDQUFDdEssS0FBL0I7QUFDRDs7QUFDRCxZQUFJc0ssWUFBWSxDQUFDUCxNQUFqQixFQUF5QjtBQUN2QjVLLGlCQUFPLENBQUMsUUFBRCxDQUFQLEdBQW9CbUwsWUFBWSxDQUFDUCxNQUFqQztBQUNELFNBRkQsTUFFTztBQUNMLGNBQU1BLE1BQU0sR0FBR0YsdUJBQXVCLENBQUNwTixJQUFELEVBQU80SSxNQUFQLEVBQWVtRSxJQUFmLENBQXRDOztBQUNBLGNBQUlPLE1BQUosRUFBWTtBQUNWNUssbUJBQU8sQ0FBQyxRQUFELENBQVAsR0FBb0I0SyxNQUFwQjtBQUNEO0FBQ0Y7O0FBQ0QsWUFBSU8sWUFBWSxDQUFDbkcsU0FBakIsRUFBNEI7QUFDMUJoRixpQkFBTyxXQUFJa0csTUFBSixrQkFBUCxHQUFtQ2lGLFlBQVksQ0FBQ25HLFNBQWhEO0FBQ0Q7QUFDRjtBQUNGLEtBcEJEO0FBcUJBLFFBQUksQ0FBQ2lHLGVBQUwsRUFBc0JwQyxJQUFJLENBQUNVLElBQUwsQ0FBVXZKLE9BQVY7QUFFdEIsV0FBTzZJLElBQVA7QUFDRCxHQTlCTSxFQThCSixFQTlCSSxDQUFQO0FBK0JELENBdkNNO0FBeUNBLElBQU11QyxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLENBQUM5TixJQUFELEVBQWdEO0FBQ2xGO0FBQ0EsTUFBTXdJLE9BQU8sR0FBRyxrRkFBSSxJQUFJK0UsR0FBSixDQUFRdk4sSUFBSSxDQUFDNEUsR0FBTCxDQUFTO0FBQUEsUUFBR2dFLE1BQUgsU0FBR0EsTUFBSDtBQUFBLFdBQWdCQSxNQUFoQjtBQUFBLEdBQVQsQ0FBUixDQUFQLENBQWI7O0FBQ0EsTUFBTTRFLEtBQUssR0FBRyxrRkFBSSxJQUFJRCxHQUFKLENBQVF2TixJQUFJLENBQUM0RSxHQUFMLENBQVM7QUFBQSxRQUFHbUksSUFBSCxTQUFHQSxJQUFIO0FBQUEsV0FBY0EsSUFBZDtBQUFBLEdBQVQsQ0FBUixDQUFQLENBQVg7O0FBRUEsTUFBTXJLLE9BQTRCLEdBQUc4RixPQUFPLENBQUM1RCxHQUFSLENBQVksVUFBQ2dFLE1BQUQ7QUFBQSxXQUMvQyxJQUFJdEIsS0FBSixDQUEyQnNCLE1BQTNCLEVBQW1DRyxNQUFuQyxDQUNFeUUsS0FBSyxDQUFDNUksR0FBTixDQUFVLFVBQUNtSSxJQUFELEVBQVU7QUFDbEIsVUFBTWMsWUFBWSxHQUFHN04sSUFBSSxDQUFDNEwsSUFBTCxDQUFVLFVBQUNDLElBQUQ7QUFBQSxlQUFVQSxJQUFJLENBQUNrQixJQUFMLEtBQWNBLElBQWQsSUFBc0JuRSxNQUFNLEtBQUtpRCxJQUFJLENBQUNqRCxNQUFoRDtBQUFBLE9BQVYsQ0FBckI7QUFFQSxhQUFPaUYsWUFBWSxHQUFHQSxZQUFZLENBQUN0SyxLQUFoQixHQUF3QixDQUEzQztBQUNELEtBSkQsQ0FERixDQUQrQztBQUFBLEdBQVosQ0FBckM7QUFVQSxTQUFPLENBQ0wsSUFBSStELEtBQUosQ0FBMkIsUUFBM0IsRUFBcUN5QixNQUFyQyxDQUNFeUUsS0FBSyxDQUFDNUksR0FBTixDQUFVLFVBQUNtSSxJQUFELEVBQVU7QUFBQSwwQkFDTUYsY0FBYyxDQUFDRSxJQUFELENBRHBCO0FBQUE7QUFBQSxRQUNYOUksT0FEVztBQUFBLFFBQ0ZELElBREU7O0FBR2xCLHFCQUFVQSxJQUFWLGVBQW1CQyxPQUFuQjtBQUNELEdBSkQsQ0FERixDQURLLEVBUUw4RSxNQVJLLENBUUVyRyxPQVJGLENBQVA7QUFTRCxDQXhCTTtBQTBCQSxJQUFNMEIsbUJBQW1CLEdBQUcsU0FBdEJBLG1CQUFzQixDQUNqQ3BFLElBRGlDLFNBR2I7QUFBQSxNQURsQmdFLElBQ2tCLFNBRGxCQSxJQUNrQjtBQUFBLE1BRFpDLE9BQ1ksU0FEWkEsT0FDWTtBQUFBLE1BREhDLFVBQ0csU0FESEEsVUFDRztBQUNwQixTQUFPbEUsSUFBSSxDQUNSd0gsTUFESSxDQUNHLFVBQUN1RyxHQUFEO0FBQUEsV0FBVTdKLFVBQVUsR0FBRzZKLEdBQUcsQ0FBQzdKLFVBQUosS0FBbUJBLFVBQXRCLEdBQW1DLElBQXZEO0FBQUEsR0FESCxFQUVKc0QsTUFGSSxDQUVHLFVBQUN1RyxHQUFELEVBQVM7QUFDZixRQUFJL0osSUFBSSxJQUFJLENBQUNDLE9BQWIsRUFBc0I7QUFDcEIsYUFBTzhKLEdBQUcsQ0FBQy9KLElBQUosS0FBYUEsSUFBcEI7QUFDRDs7QUFDRCxRQUFJQyxPQUFPLElBQUksQ0FBQ0QsSUFBaEIsRUFBc0I7QUFDcEIsYUFBTytKLEdBQUcsQ0FBQzlKLE9BQUosZ0JBQW9CQSxPQUFwQixDQUFQO0FBQ0Q7O0FBQ0QsUUFBSUQsSUFBSSxJQUFJQyxPQUFaLEVBQXFCO0FBQ25CLGFBQU84SixHQUFHLENBQUMvSixJQUFKLEtBQWFBLElBQWIsSUFBcUIrSixHQUFHLENBQUM5SixPQUFKLGdCQUFvQkEsT0FBcEIsQ0FBNUI7QUFDRDs7QUFFRCxXQUFPLElBQVA7QUFDRCxHQWRJLENBQVA7QUFlRCxDQW5CTTtBQXFCQSxJQUFNZ0csUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQzFHLEtBQUQsRUFBMkI7QUFDakQsTUFBTTZHLFNBQVMsR0FBRyxJQUFJNEQsSUFBSSxDQUFDQyxZQUFULENBQXNCLE9BQXRCLEVBQStCO0FBQUVDLFNBQUssRUFBRSxVQUFUO0FBQXFCdEUsWUFBUSxFQUFFO0FBQS9CLEdBQS9CLENBQWxCO0FBRUEsU0FBT1EsU0FBUyxDQUFDK0QsTUFBVixDQUFpQjVLLEtBQWpCLENBQVA7QUFDRCxDQUpNO0FBTUEsSUFBTWtILDBCQUEwQixHQUFHLFNBQTdCQSwwQkFBNkIsQ0FDeEN6SyxJQUR3QyxFQUV4Q3dJLE9BRndDLEVBS0Y7QUFBQSxNQUZ0QzRGLFdBRXNDLHVFQUZMLFNBRUs7QUFBQSxNQUR0QzNGLFFBQ3NDLHVFQURiLFNBQ2E7QUFDdEMsTUFBTTJDLFVBQVUsR0FBR3BMLElBQUksQ0FBQ3dILE1BQUwsQ0FBWTtBQUFBLFFBQUdvQixNQUFILFNBQUdBLE1BQUg7QUFBQSxXQUFnQkosT0FBTyxDQUFDSyxRQUFSLENBQWlCRCxNQUFqQixDQUFoQjtBQUFBLEdBQVosQ0FBbkI7QUFFQSxNQUFNeUMsMEJBQTBCLEdBQUdELFVBQVUsQ0FBQ0UsTUFBWCxDQUFtQyxVQUFDQyxJQUFELEVBQU9DLElBQVAsRUFBZ0I7QUFDcEYsUUFBSSxDQUFDRCxJQUFJLENBQUNLLElBQUwsQ0FBVSxVQUFDQyxJQUFEO0FBQUEsYUFBVUEsSUFBSSxDQUFDakQsTUFBTCxLQUFnQjRDLElBQUksQ0FBQzVDLE1BQXJCLElBQStCaUQsSUFBSSxDQUFDN0gsSUFBTCxLQUFjd0gsSUFBSSxDQUFDeEgsSUFBNUQ7QUFBQSxLQUFWLENBQUwsRUFBa0Y7QUFDaEYsVUFBTThILGlCQUFpQixHQUFHVixVQUFVLENBQUM1RCxNQUFYLENBQ3hCO0FBQUEsWUFBR29CLE1BQUgsU0FBR0EsTUFBSDtBQUFBLFlBQVc1RSxJQUFYLFNBQVdBLElBQVg7QUFBQSxZQUFpQlQsS0FBakIsU0FBaUJBLEtBQWpCO0FBQUEsZUFBNkJxRixNQUFNLEtBQUs0QyxJQUFJLENBQUM1QyxNQUFoQixJQUEwQjVFLElBQUksS0FBS3dILElBQUksQ0FBQ3hILElBQXhDLElBQWdELE9BQU9ULEtBQVAsS0FBaUIsUUFBOUY7QUFBQSxPQUR3QixDQUExQjtBQUdBLFVBQU13SSxHQUFHLEdBQUdELGlCQUFpQixDQUFDUixNQUFsQixDQUF5QixVQUFDVSxVQUFELEVBQWFSLElBQWI7QUFBQSxlQUFzQlEsVUFBVSxHQUFHUixJQUFJLENBQUNqSSxLQUF4QztBQUFBLE9BQXpCLEVBQXdFLENBQXhFLENBQVo7O0FBQ0EsVUFBSTZLLFdBQVcsS0FBSyxTQUFwQixFQUErQjtBQUM3QixZQUFNQyxPQUFPLEdBQUd0QyxHQUFHLEdBQUdELGlCQUFpQixDQUFDekgsTUFBeEM7QUFDQWtILFlBQUksQ0FBQ1UsSUFBTCxpQ0FBZVQsSUFBZjtBQUFxQmpJLGVBQUssRUFBRThLLE9BQTVCO0FBQXFDcEssaUJBQU8sRUFBRSxFQUE5QztBQUFrRHlELG1CQUFTLEVBQUU7QUFBN0QsWUFGNkIsQ0FFdUM7QUFDckUsT0FIRCxNQUdPO0FBQ0w2RCxZQUFJLENBQUNVLElBQUwsaUNBQWVULElBQWY7QUFBcUJqSSxlQUFLLEVBQUV3SSxHQUE1QjtBQUFpQzlILGlCQUFPLEVBQUUsRUFBMUM7QUFBOEN5RCxtQkFBUyxFQUFFO0FBQXpELFlBREssQ0FDMkQ7QUFDakU7QUFDRjs7QUFFRCxXQUFPNkQsSUFBUDtBQUNELEdBZmtDLEVBZWhDLEVBZmdDLENBQW5DO0FBaUJBLFNBQU81QyxxQkFBcUIsQ0FBQzBDLDBCQUFELEVBQTZCNUMsUUFBN0IsQ0FBNUI7QUFDRCxDQTFCTSxDOzs7Ozs7Ozs7Ozs7Ozs7QUMzSUEsSUFBTWxILGNBQTRCLEdBQUc7QUFDMUNLLFFBQU0sRUFBRTtBQUNOa0IsT0FBRyxFQUFFLEVBREM7QUFFTndMLGFBQVMsRUFBRTtBQUNUQyxnQkFBVSxFQUFFO0FBREg7QUFGTCxHQURrQztBQU8xQzdNLFNBQU8sRUFBRTtBQUNQQyxXQUFPLEVBQUUsTUFERjtBQUVQMk0sYUFBUyxFQUFFO0FBQ1RDLGdCQUFVLEVBQUU7QUFESDtBQUZKLEdBUGlDO0FBYTFDck0sU0FBTyxFQUFFO0FBQ1BzTSxhQUFTLEVBQUUsS0FESjtBQUVQck0sV0FBTyxFQUFFO0FBQ1BDLGlCQUFXLEVBQUU7QUFDWHNCLGFBQUssRUFBRSxlQURJO0FBRVgrSyxrQkFBVSxFQUFFO0FBRkQ7QUFETixLQUZGO0FBUVAxTSxTQUFLLEVBQUUsRUFSQTtBQVNQTCxXQUFPLEVBQUU7QUFDUHFCLFVBQUksRUFBRSxJQURDO0FBRVB1TCxlQUFTLEVBQUU7QUFDVEMsa0JBQVUsRUFBRSw4QkFESDtBQUVUbkUsaUJBQVMsRUFBRSxtQkFBVXNFLEtBQVYsRUFBb0M7QUFDN0MsZ0NBQWVBLEtBQUssQ0FBQ2hMLEtBQXJCLFlBRDZDLENBQ1Q7QUFDckM7QUFKUTtBQUZKO0FBVEYsR0FiaUM7QUFnQzFDckIsT0FBSyxFQUFFO0FBQ0xzSSxhQUFTLEVBQUU7QUFDVDRELGdCQUFVLEVBQUUsOEJBREg7QUFFVEksY0FBUSxFQUFFO0FBRkQsS0FETjtBQUtMQyxhQUFTLEVBQUU7QUFDVDdMLFVBQUksRUFBRTtBQURHO0FBTE4sR0FoQ21DO0FBeUMxQ1QsT0FBSyxFQUFFO0FBQ0xxSSxhQUFTLEVBQUU7QUFDVDRELGdCQUFVLEVBQUUsOEJBREg7QUFFVEksY0FBUSxFQUFFO0FBRkQsS0FETjtBQUtMQyxhQUFTLEVBQUU7QUFDVDdMLFVBQUksRUFBRTtBQURHO0FBTE47QUF6Q21DLENBQXJDLEMiLCJmaWxlIjoiZGFzaGJvYXJkL2pzL2Rhc2hib2FyZDcyZWM5YTU1NDQ0ZmEyMjI0YmI1LmJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5pbXBvcnQgUmVhY3QsIHsgRnVuY3Rpb25Db21wb25lbnQsIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IEV2ZW50T3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzJztcbmltcG9ydCB7IG1ha2VCYXNpY0xpbmVDaGFydCwgcmVuZGVyQmFzaWNDb2x1bW5DaGFydCwgcmVuZGVyQmFzaWNQaWVDaGFydCwgcmVuZGVyQ2hhcnQgfSBmcm9tICcuL3V0aWxzJztcblxudHlwZSBBcGFjaGVDaGFydFByb3BzID0ge1xuICBkZW1vPzogYm9vbGVhbjtcbiAgd2lkdGg/OiBzdHJpbmc7XG4gIGhlaWdodD86IHN0cmluZztcbiAgb3B0aW9uczogZWNoYXJ0cy5FQ2hhcnRPcHRpb247XG4gIHR5cGU/OiAnYmFyJyB8ICdsaW5lJyB8ICdwaWUnO1xuICBkYXRhOiB1bmtub3duW107XG4gIG9uQ2xpY2s/OiAob3B0aW9uczogRXZlbnRPcHRpb25zKSA9PiB2b2lkO1xuICBvbkhvdmVyPzogKG9wdGlvbnM6IEV2ZW50T3B0aW9ucykgPT4gdm9pZDtcbiAgb25CbHVyPzogKG9wdGlvbnM6IEV2ZW50T3B0aW9ucykgPT4gdm9pZDtcbn07XG5cbmNvbnN0IFN0eWxlZENoYXJ0ID0gc3R5bGVkLmRpdmBcbiAgbWluLWhlaWdodDogMTAwJSAhaW1wb3J0YW50O1xuYDtcblxuY29uc3QgQXBhY2hlQ2hhcnQ6IEZ1bmN0aW9uQ29tcG9uZW50PEFwYWNoZUNoYXJ0UHJvcHM+ID0gKHByb3BzKSA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQ+KG51bGwpO1xuICBjb25zdCBbbG9hZGluZywgc2V0TG9hZGluZ10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChlbGVtZW50LmN1cnJlbnQpIHtcbiAgICAgIGlmIChwcm9wcy5kZW1vKSB7XG4gICAgICAgIHN3aXRjaCAocHJvcHMudHlwZSkge1xuICAgICAgICAgIGNhc2UgJ2xpbmUnOlxuICAgICAgICAgICAgbWFrZUJhc2ljTGluZUNoYXJ0KGVsZW1lbnQuY3VycmVudCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdiYXInOlxuICAgICAgICAgICAgcmVuZGVyQmFzaWNDb2x1bW5DaGFydChlbGVtZW50LmN1cnJlbnQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAncGllJzpcbiAgICAgICAgICAgIHJlbmRlckJhc2ljUGllQ2hhcnQoZWxlbWVudC5jdXJyZW50KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVuZGVyQ2hhcnQoZWxlbWVudC5jdXJyZW50LCBwcm9wcy5vcHRpb25zKS50aGVuKChjaGFydCkgPT4ge1xuICAgICAgICAgIHNldExvYWRpbmcoZmFsc2UpO1xuICAgICAgICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICAgICAgICBpZiAocHJvcHMub25DbGljaykge1xuICAgICAgICAgICAgY2hhcnQub24oJ2NsaWNrJywgKHBhcmFtczogdW5rbm93bikgPT4ge1xuICAgICAgICAgICAgICBwcm9wcy5vbkNsaWNrISh7IGRhdGE6IHByb3BzLmRhdGEsIGNoYXJ0LCBwYXJhbXMgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHByb3BzLm9uSG92ZXIpIHtcbiAgICAgICAgICAgIGNoYXJ0Lm9uKCdtb3VzZW92ZXInLCAocGFyYW1zOiB1bmtub3duKSA9PiB7XG4gICAgICAgICAgICAgIHByb3BzLm9uSG92ZXIhKHsgZGF0YTogcHJvcHMuZGF0YSwgY2hhcnQsIHBhcmFtcyB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocHJvcHMub25CbHVyKSB7XG4gICAgICAgICAgICBjaGFydC5vbignbW91c2VvdXQnLCAocGFyYW1zOiB1bmtub3duKSA9PiB7XG4gICAgICAgICAgICAgIHByb3BzLm9uQmx1ciEoeyBkYXRhOiBwcm9wcy5kYXRhLCBjaGFydCwgcGFyYW1zIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvbiAqL1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH0sIFtdKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKCdjaGFydC1jb250YWluZXIgY2hhcnQtY29udGFpbmVyLS1mdWxsJywgeyAnY2hhcnQtY29udGFpbmVyLS1sb2FkaW5nJzogbG9hZGluZyB9KX0+XG4gICAgICA8U3R5bGVkQ2hhcnQgY2xhc3NOYW1lPVwiY2hhcnRzX19jaGFydFwiPlxuICAgICAgICA8ZGl2IHJlZj17ZWxlbWVudH0gc3R5bGU9e3sgaGVpZ2h0OiBwcm9wcy5oZWlnaHQgfX0+PC9kaXY+XG4gICAgICAgIHtsb2FkaW5nID8gKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY2hhcnQtbG9hZGluZ1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjaGFydC1sb2FkaW5nX19ibG9ja1wiPlxuICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9TdHlsZWRDaGFydD5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG5cbkFwYWNoZUNoYXJ0LmRlZmF1bHRQcm9wcyA9IHtcbiAgaGVpZ2h0OiAnMzAwcHgnLFxuICB0eXBlOiAnbGluZScsXG59O1xuXG5leHBvcnQgeyBBcGFjaGVDaGFydCB9O1xuIiwiaW1wb3J0IGRlZXBtZXJnZSBmcm9tICdkZWVwbWVyZ2UnO1xuaW1wb3J0IHsgY29sb3VycyB9IGZyb20gJy4uLy4uLy4uL2Rhc2hib2FyZC91dGlscy9jaGFydCc7XG5pbXBvcnQgeyBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL2VjaGFydHMnO1xuXG5jb25zdCBsb2FkQXBhY2hlQ2hhcnRzID0gYXN5bmMgKCk6IFByb21pc2U8dHlwZW9mIGVjaGFydHM+ID0+IHtcbiAgY29uc3QgZWNoYXJ0cyA9IGF3YWl0IGltcG9ydCgnZWNoYXJ0cy9jb3JlJyk7XG4gIGNvbnN0IHsgQmFyQ2hhcnQsIExpbmVDaGFydCwgUGllQ2hhcnQgfSA9IGF3YWl0IGltcG9ydCgnZWNoYXJ0cy9jaGFydHMnKTtcbiAgY29uc3QgeyBUaXRsZUNvbXBvbmVudCwgVG9vbHRpcENvbXBvbmVudCwgR3JpZENvbXBvbmVudCwgTGVnZW5kQ29tcG9uZW50LCBEYXRhc2V0Q29tcG9uZW50IH0gPSBhd2FpdCBpbXBvcnQoXG4gICAgJ2VjaGFydHMvY29tcG9uZW50cydcbiAgKTtcbiAgY29uc3QgeyBDYW52YXNSZW5kZXJlciB9ID0gYXdhaXQgaW1wb3J0KCdlY2hhcnRzL3JlbmRlcmVycycpO1xuXG4gIGVjaGFydHMudXNlKFtcbiAgICBUaXRsZUNvbXBvbmVudCxcbiAgICBUb29sdGlwQ29tcG9uZW50LFxuICAgIEdyaWRDb21wb25lbnQsXG4gICAgTGVnZW5kQ29tcG9uZW50LFxuICAgIERhdGFzZXRDb21wb25lbnQsXG4gICAgQmFyQ2hhcnQsXG4gICAgTGluZUNoYXJ0LFxuICAgIFBpZUNoYXJ0LFxuICAgIENhbnZhc1JlbmRlcmVyLFxuICBdKTtcblxuICByZXR1cm4gZWNoYXJ0cztcbn07XG5cbmV4cG9ydCBjb25zdCByZW5kZXJDaGFydCA9IGFzeW5jIChub2RlOiBIVE1MRGl2RWxlbWVudCwgb3B0aW9uOiBlY2hhcnRzLkVDaGFydE9wdGlvbik6IFByb21pc2U8ZWNoYXJ0cy5FQ2hhcnRzPiA9PiB7XG4gIGNvbnN0IHsgaW5pdCB9ID0gYXdhaXQgbG9hZEFwYWNoZUNoYXJ0cygpO1xuICBjb25zdCBjaGFydDogZWNoYXJ0cy5FQ2hhcnRzID0gaW5pdChub2RlKSBhcyBhbnk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBjaGFydC5zZXRPcHRpb24oZGVlcG1lcmdlKGRlZmF1bHRPcHRpb25zLCBvcHRpb24pIGFzIGFueSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuXG4gIHJldHVybiBjaGFydDtcbn07XG5cbmV4cG9ydCBjb25zdCBtYWtlQmFzaWNMaW5lQ2hhcnQgPSBhc3luYyAobm9kZTogSFRNTERpdkVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgeyBpbml0IH0gPSBhd2FpdCBsb2FkQXBhY2hlQ2hhcnRzKCk7XG4gIGNvbnN0IGNoYXJ0ID0gaW5pdChub2RlKTtcbiAgY29uc3Qgb3B0aW9uOiBlY2hhcnRzLkVDaGFydE9wdGlvbiA9IHtcbiAgICBjb2xvcjogY29sb3VycyxcbiAgICB0b29sdGlwOiB7XG4gICAgICB0cmlnZ2VyOiAnYXhpcycsXG4gICAgfSxcbiAgICBsZWdlbmQ6IHtcbiAgICAgIGRhdGE6IFsnU3RlcCBTdGFydCcsICdTdGVwIE1pZGRsZScsICdTdGVwIEVuZCddLFxuICAgIH0sXG4gICAgZ3JpZDoge1xuICAgICAgbGVmdDogJzMlJyxcbiAgICAgIHJpZ2h0OiAnNCUnLFxuICAgICAgYm90dG9tOiAnMyUnLFxuICAgICAgY29udGFpbkxhYmVsOiB0cnVlLFxuICAgIH0sXG4gICAgdG9vbGJveDoge1xuICAgICAgZmVhdHVyZToge1xuICAgICAgICBzYXZlQXNJbWFnZToge30sXG4gICAgICB9LFxuICAgIH0sXG4gICAgeEF4aXM6IHtcbiAgICAgIHR5cGU6ICdjYXRlZ29yeScsXG4gICAgICBkYXRhOiBbJ01vbicsICdUdWUnLCAnV2VkJywgJ1RodScsICdGcmknLCAnU2F0JywgJ1N1biddLFxuICAgIH0sXG4gICAgeUF4aXM6IHtcbiAgICAgIHR5cGU6ICd2YWx1ZScsXG4gICAgfSxcbiAgICBzZXJpZXM6IFtcbiAgICAgIHtcbiAgICAgICAgbmFtZTogJ1N0ZXAgU3RhcnQnLFxuICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgIHN0ZXA6ICdzdGFydCcsXG4gICAgICAgIGRhdGE6IFsxMjAsIDEzMiwgMTAxLCAxMzQsIDkwLCAyMzAsIDIxMF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBuYW1lOiAnU3RlcCBNaWRkbGUnLFxuICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgIHN0ZXA6ICdtaWRkbGUnLFxuICAgICAgICBkYXRhOiBbMjIwLCAyODIsIDIwMSwgMjM0LCAyOTAsIDQzMCwgNDEwXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdTdGVwIEVuZCcsXG4gICAgICAgIHR5cGU6ICdsaW5lJyxcbiAgICAgICAgc3RlcDogJ2VuZCcsXG4gICAgICAgIGRhdGE6IFs0NTAsIDQzMiwgNDAxLCA0NTQsIDU5MCwgNTMwLCA1MTBdLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuICBjaGFydC5zZXRPcHRpb24oZGVlcG1lcmdlKGRlZmF1bHRPcHRpb25zLCBvcHRpb24pIGFzIGFueSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxufTtcblxuZXhwb3J0IGNvbnN0IHJlbmRlckJhc2ljQ29sdW1uQ2hhcnQgPSBhc3luYyAobm9kZTogSFRNTERpdkVsZW1lbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgY29uc3QgeyBpbml0IH0gPSBhd2FpdCBsb2FkQXBhY2hlQ2hhcnRzKCk7XG4gIGNvbnN0IGNoYXJ0ID0gaW5pdChub2RlKTtcbiAgY29uc3Qgb3B0aW9uOiBlY2hhcnRzLkVDaGFydE9wdGlvbiA9IHtcbiAgICBjb2xvcjogY29sb3VycyxcbiAgICBsZWdlbmQ6IHt9LFxuICAgIHRvb2x0aXA6IHt9LFxuICAgIGRhdGFzZXQ6IHtcbiAgICAgIGRpbWVuc2lvbnM6IFsncHJvZHVjdCcsICcyMDE1JywgJzIwMTYnLCAnMjAxNyddLFxuICAgICAgc291cmNlOiBbXG4gICAgICAgIHsgcHJvZHVjdDogJ01hdGNoYSBMYXR0ZScsICcyMDE1JzogNDMuMywgJzIwMTYnOiA4NS44LCAnMjAxNyc6IDkzLjcgfSxcbiAgICAgICAgeyBwcm9kdWN0OiAnTWlsayBUZWEnLCAnMjAxNSc6IDgzLjEsICcyMDE2JzogNzMuNCwgJzIwMTcnOiA1NS4xIH0sXG4gICAgICAgIHsgcHJvZHVjdDogJ0NoZWVzZSBDb2NvYScsICcyMDE1JzogODYuNCwgJzIwMTYnOiA2NS4yLCAnMjAxNyc6IDgyLjUgfSxcbiAgICAgICAgeyBwcm9kdWN0OiAnV2FsbnV0IEJyb3duaWUnLCAnMjAxNSc6IDcyLjQsICcyMDE2JzogNTMuOSwgJzIwMTcnOiAzOS4xIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgIHlBeGlzOiB7fSxcbiAgICAvLyBEZWNsYXJlIHNldmVyYWwgYmFyIHNlcmllcywgZWFjaCB3aWxsIGJlIG1hcHBlZFxuICAgIC8vIHRvIGEgY29sdW1uIG9mIGRhdGFzZXQuc291cmNlIGJ5IGRlZmF1bHQuXG4gICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJyB9LCB7IHR5cGU6ICdiYXInIH0sIHsgdHlwZTogJ2JhcicgfV0sXG4gIH07XG4gIGNoYXJ0LnNldE9wdGlvbihkZWVwbWVyZ2UoZGVmYXVsdE9wdGlvbnMsIG9wdGlvbikgYXMgYW55KTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG59O1xuXG5leHBvcnQgY29uc3QgcmVuZGVyQmFzaWNQaWVDaGFydCA9IGFzeW5jIChub2RlOiBIVE1MRGl2RWxlbWVudCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCB7IGluaXQgfSA9IGF3YWl0IGxvYWRBcGFjaGVDaGFydHMoKTtcbiAgY29uc3QgY2hhcnQgPSBpbml0KG5vZGUpO1xuICBjb25zdCBvcHRpb246IGVjaGFydHMuRUNoYXJ0T3B0aW9uID0ge1xuICAgIGNvbG9yOiBjb2xvdXJzLFxuICAgIGxlZ2VuZDoge1xuICAgICAgdG9wOiAnYm90dG9tJyxcbiAgICB9LFxuICAgIHRvb2xib3g6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICBmZWF0dXJlOiB7XG4gICAgICAgIG1hcms6IHsgc2hvdzogdHJ1ZSB9LFxuICAgICAgICBkYXRhVmlldzogeyBzaG93OiB0cnVlLCByZWFkT25seTogZmFsc2UgfSxcbiAgICAgICAgcmVzdG9yZTogeyBzaG93OiB0cnVlIH0sXG4gICAgICAgIHNhdmVBc0ltYWdlOiB7IHNob3c6IHRydWUgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB4QXhpczogeyBzaG93OiBmYWxzZSB9LFxuICAgIHlBeGlzOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgc2VyaWVzOiBbXG4gICAgICB7XG4gICAgICAgIG5hbWU6ICdSb3NlJyxcbiAgICAgICAgdHlwZTogJ3BpZScsXG4gICAgICAgIHJhZGl1czogJzY1JScsXG4gICAgICAgIGNlbnRlcjogWyc1MCUnLCAnNTAlJ10sXG4gICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgZGF0YTogW1xuICAgICAgICAgIHsgdmFsdWU6IDQwLCBuYW1lOiAncm9zZSAxJyB9LFxuICAgICAgICAgIHsgdmFsdWU6IDM4LCBuYW1lOiAncm9zZSAyJyB9LFxuICAgICAgICAgIHsgdmFsdWU6IDMyLCBuYW1lOiAncm9zZSAzJyB9LFxuICAgICAgICAgIHsgdmFsdWU6IDMwLCBuYW1lOiAncm9zZSA0JyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICBdLFxuICB9O1xuICBjaGFydC5zZXRPcHRpb24oZGVlcG1lcmdlKGRlZmF1bHRPcHRpb25zLCBvcHRpb24pIGFzIGFueSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxufTtcbiIsImltcG9ydCBSZWFjdCwgeyBGdW5jdGlvbkNvbXBvbmVudCwgUmVhY3RUZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdzdHlsZWQtY29tcG9uZW50cyc7XG5cbnR5cGUgQ2FyZFByb3BzID0ge1xuICBtZXRhPzogUmVhY3RUZXh0O1xuICB0aXRsZT86IFJlYWN0VGV4dDtcbn07XG5cbmNvbnN0IENhcmQ6IEZ1bmN0aW9uQ29tcG9uZW50PENhcmRQcm9wcz4gPSAocHJvcHMpID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmQgY2FyZC0tb2Zmc2V0XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImNhcmRfX2JvZHlcIj5cbiAgICAgICAge3Byb3BzLm1ldGEgPyA8c3BhbiBjbGFzc05hbWU9XCJjYXJkX19tZXRhXCI+e3Byb3BzLm1ldGF9PC9zcGFuPiA6IG51bGx9XG4gICAgICAgIHtwcm9wcy50aXRsZSA/IDxoMyBjbGFzc05hbWU9XCJjYXJkX190aXRsZVwiPntwcm9wcy50aXRsZX08L2gzPiA6IG51bGx9XG4gICAgICAgIHtwcm9wcy5jaGlsZHJlbn1cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IENhcmRNZXRhTGFyZ2UgPSBzdHlsZWQuc3Bhbi5hdHRycygoKSA9PiAoeyBjbGFzc05hbWU6ICdjYXJkX19tZXRhJyB9KSlgXG4gIGZvbnQtc2l6ZTogMS4zcmVtO1xuYDtcblxuZXhwb3J0IGNvbnN0IENhcmRUaXRsZUxhcmdlID0gc3R5bGVkLmgzLmF0dHJzKCgpID0+ICh7IGNsYXNzTmFtZTogJ2NhcmRfX3RpdGxlJyB9KSlgXG4gIGZvbnQtc2l6ZTogM3JlbTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbmA7XG5cbmV4cG9ydCB7IENhcmQgfTtcbiIsImltcG9ydCBkZWVwbWVyZ2UgZnJvbSAnZGVlcG1lcmdlJztcbmltcG9ydCBSZWFjdCwgeyBGdW5jdGlvbkNvbXBvbmVudCwgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGZpbHRlckRhc2hib2FyZERhdGEgfSBmcm9tICcuLi8uLi9kYXNoYm9hcmQvdXRpbHMnO1xuaW1wb3J0IHsgRGFzaGJvYXJkQ2hhcnQsIERhc2hib2FyZENvbnRlbnQsIERhc2hib2FyZERhdGEsIERhc2hib2FyZEdyaWQsIFF1YXJ0ZXIgfSBmcm9tICcuLi8uLi91dGlscy90eXBlcyc7XG5pbXBvcnQgeyBBcGFjaGVDaGFydCB9IGZyb20gJy4uL0FwYWNoZUNoYXJ0JztcbmltcG9ydCB7IENhcmQsIENhcmRNZXRhTGFyZ2UsIENhcmRUaXRsZUxhcmdlIH0gZnJvbSAnLi4vQ2FyZCc7XG5pbXBvcnQgeyBHcmlkIH0gZnJvbSAnLi4vR3JpZCc7XG5pbXBvcnQgeyBIaWRkZW5NZWRpYUNhcHRpb24gfSBmcm9tICcuLi9IaWRkZW5NZWRpYUNhcHRpb24nO1xuaW1wb3J0IHsgU2VjdGlvbiB9IGZyb20gJy4uL1NlY3Rpb24nO1xuXG50eXBlIERhc2hib2FyZFNlY3Rpb25Qcm9wcyA9IHtcbiAgaWQ6IHN0cmluZztcbiAgdGl0bGU/OiBzdHJpbmc7XG4gIGRlcGFydG1lbnQ/OiBzdHJpbmc7XG4gIHllYXI/OiBudW1iZXI7XG4gIHF1YXJ0ZXI/OiBRdWFydGVyO1xuICBkYXRhOiBEYXNoYm9hcmREYXRhW107XG4gIGdyaWRzOiBEYXNoYm9hcmRHcmlkW107XG59O1xuXG5jb25zdCBEYXNoYm9hcmRTZWN0aW9uOiBGdW5jdGlvbkNvbXBvbmVudDxEYXNoYm9hcmRTZWN0aW9uUHJvcHM+ID0gKHsgeWVhciwgcXVhcnRlciwgZGVwYXJ0bWVudCwgLi4ucHJvcHMgfSkgPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZShwcm9wcy5kYXRhKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBzZXREYXRhKGZpbHRlckRhc2hib2FyZERhdGEocHJvcHMuZGF0YSwgeyB5ZWFyLCBxdWFydGVyLCBkZXBhcnRtZW50IH0pKTtcbiAgfSwgW3Byb3BzLmRhdGEubGVuZ3RoXSk7XG5cbiAgY29uc3QgcmVuZGVyQ2hhcnQgPSAoY2hhcnQ6IERhc2hib2FyZENoYXJ0KSA9PiB7XG4gICAgaWYgKGNoYXJ0LmRhdGEgJiYgY2hhcnQub3B0aW9ucykge1xuICAgICAgY29uc3QgZGF0YXNldCA9IGNoYXJ0LmRhdGEoZGF0YSk7XG4gICAgICBjb25zdCBvcHRpb25zID0gZGVlcG1lcmdlKGNoYXJ0Lm9wdGlvbnMsIHsgZGF0YXNldDogeyBzb3VyY2U6IGRhdGFzZXQgfSB9KTtcblxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPEFwYWNoZUNoYXJ0XG4gICAgICAgICAgb3B0aW9ucz17b3B0aW9uc31cbiAgICAgICAgICBoZWlnaHQ9e2NoYXJ0LmhlaWdodCB8fCAnMjUwcHgnfVxuICAgICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgICAgb25DbGljaz17Y2hhcnQub25DbGlja31cbiAgICAgICAgICBvbkhvdmVyPXtjaGFydC5vbkhvdmVyfVxuICAgICAgICAgIG9uQmx1cj17Y2hhcnQub25CbHVyfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEFwYWNoZUNoYXJ0XG4gICAgICAgIGRlbW9cbiAgICAgICAgb3B0aW9ucz17eyB0aXRsZTogeyB0ZXh0OiAnVEhJUyBJUyBBIERFTU8gQ0hBUlQnIH0gfX1cbiAgICAgICAgaGVpZ2h0PVwiMjUwcHhcIlxuICAgICAgICBkYXRhPXtkYXRhfVxuICAgICAgICBvbkNsaWNrPXtjaGFydC5vbkNsaWNrfVxuICAgICAgICBvbkhvdmVyPXtjaGFydC5vbkhvdmVyfVxuICAgICAgICBvbkJsdXI9e2NoYXJ0Lm9uQmx1cn1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcblxuICBjb25zdCByZW5kZXJDYXJkID0gKHsgbWV0YSwgY2hhcnQsIC4uLmNvbnRlbnQgfTogRGFzaGJvYXJkQ29udGVudCkgPT4ge1xuICAgIGNvbnN0IHRpdGxlID0gY29udGVudC50aXRsZSAmJiB0eXBlb2YgY29udGVudC50aXRsZSA9PT0gJ2Z1bmN0aW9uJyA/IGNvbnRlbnQudGl0bGUoZGF0YSkgOiBjb250ZW50LnRpdGxlO1xuICAgIGlmIChtZXRhICYmICF0aXRsZSAmJiAhY2hhcnQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYga2V5PXtjb250ZW50LmlkfSBjbGFzc05hbWU9XCJtLXN0YXRfX3RpdGxlXCI+XG4gICAgICAgICAge21ldGF9XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgaW5mbyA9IGNvbnRlbnQuaW5mbyAmJiB0eXBlb2YgY29udGVudC5pbmZvID09PSAnZnVuY3Rpb24nID8gY29udGVudC5pbmZvKGRhdGEpIDogY29udGVudC5pbmZvO1xuXG4gICAgaWYgKGNvbnRlbnQuc3R5bGVkKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8Q2FyZCBrZXk9e2NvbnRlbnQuaWR9PlxuICAgICAgICAgIHttZXRhID8gPENhcmRNZXRhTGFyZ2U+e21ldGF9PC9DYXJkTWV0YUxhcmdlPiA6IG51bGx9XG4gICAgICAgICAge3RpdGxlID8gPENhcmRUaXRsZUxhcmdlPnt0aXRsZX08L0NhcmRUaXRsZUxhcmdlPiA6IG51bGx9XG4gICAgICAgICAge2NoYXJ0ID8gcmVuZGVyQ2hhcnQoY2hhcnQpIDogbnVsbH1cbiAgICAgICAgICB7aW5mbyA/IChcbiAgICAgICAgICAgIDxIaWRkZW5NZWRpYUNhcHRpb24gYnV0dG9uQ2FwdGlvbj1cIk5hcnJhdGl2ZVwiPlxuICAgICAgICAgICAgICB7aW5mby5zcGxpdCgnXFxuJykubWFwKChpLCBrZXkpID0+IChcbiAgICAgICAgICAgICAgICA8cCBrZXk9e2Ake2tleX1gfT57aX08L3A+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9IaWRkZW5NZWRpYUNhcHRpb24+XG4gICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDwvQ2FyZD5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxDYXJkIGtleT17Y29udGVudC5pZH0gbWV0YT17bWV0YX0gdGl0bGU9e3RpdGxlfT5cbiAgICAgICAge2NoYXJ0ID8gcmVuZGVyQ2hhcnQoY2hhcnQpIDogbnVsbH1cbiAgICAgIDwvQ2FyZD5cbiAgICApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFNlY3Rpb24gdGl0bGU9e3Byb3BzLnRpdGxlfSBpZD17cHJvcHMuaWR9PlxuICAgICAgeyFkYXRhLmxlbmd0aCA/IChcbiAgICAgICAgPGRpdj5Mb2FkaW5nLi4uPC9kaXY+XG4gICAgICApIDogKFxuICAgICAgICBwcm9wcy5ncmlkcy5tYXAoKHsgaWQsIGNvbHVtbnMsIGNvbnRlbnQsIGNsYXNzTmFtZSB9KSA9PiAoXG4gICAgICAgICAgPEdyaWQga2V5PXtpZH0gY29sdW1ucz17Y29sdW1ucyB8fCAxfSBjbGFzc05hbWU9e2NsYXNzTmFtZX0+XG4gICAgICAgICAgICB7Y29udGVudC5tYXAocmVuZGVyQ2FyZCl9XG4gICAgICAgICAgPC9HcmlkPlxuICAgICAgICApKVxuICAgICAgKX1cbiAgICA8L1NlY3Rpb24+XG4gICk7XG59O1xuXG5leHBvcnQgeyBEYXNoYm9hcmRTZWN0aW9uIH07XG4iLCJpbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCBSZWFjdCwgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxudHlwZSBHcmlkUHJvcHMgPSB7XG4gIGNvbHVtbnM/OiBudW1iZXI7XG4gIGNsYXNzTmFtZT86IHN0cmluZztcbn07XG5cbmNvbnN0IEdyaWQ6IEZ1bmN0aW9uQ29tcG9uZW50PEdyaWRQcm9wcz4gPSAoeyBjb2x1bW5zLCBjaGlsZHJlbiwgY2xhc3NOYW1lIH0pID0+IHtcbiAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWVzKGBsLSR7Y29sdW1uc311cGAsIGNsYXNzTmFtZSl9PntjaGlsZHJlbn08L2Rpdj47XG59O1xuXG5HcmlkLmRlZmF1bHRQcm9wcyA9IHtcbiAgY29sdW1uczogMyxcbn07XG5cbmV4cG9ydCB7IEdyaWQgfTtcbiIsImltcG9ydCBSZWFjdCwgeyBGdW5jdGlvbkNvbXBvbmVudCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ3N0eWxlZC1jb21wb25lbnRzJztcbmltcG9ydCB7IE1lZGlhQ2FwdGlvbiB9IGZyb20gJy4uL01lZGlhQ2FwdGlvbic7XG5cbnR5cGUgQ29tcG9uZW50UHJvcHMgPSB7XG4gIGJ1dHRvbkNhcHRpb246IHN0cmluZztcbn07XG5jb25zdCBTdHlsZWRCdXR0b24gPSBzdHlsZWQuYnV0dG9uYFxuICBwYWRkaW5nOiAwLjhyZW07XG5gO1xuXG5jb25zdCBIaWRkZW5NZWRpYUNhcHRpb246IEZ1bmN0aW9uQ29tcG9uZW50PENvbXBvbmVudFByb3BzPiA9IChwcm9wcykgPT4ge1xuICBjb25zdCBbc2hvdywgc2V0U2hvd10gPSB1c2VTdGF0ZShmYWxzZSk7XG5cbiAgY29uc3Qgb25Ib3ZlciA9ICgpID0+IHNldFNob3codHJ1ZSk7XG4gIGNvbnN0IG9uQmx1ciA9ICgpID0+IHNldFNob3coZmFsc2UpO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtZWRpYS1jYXB0aW9uX19oaWRkZW5cIj5cbiAgICAgIDxTdHlsZWRCdXR0b24gY2xhc3NOYW1lPVwiYnV0dG9uXCIgb25Nb3VzZUVudGVyPXtvbkhvdmVyfSBvbk1vdXNlTGVhdmU9e29uQmx1cn0+XG4gICAgICAgIHtwcm9wcy5idXR0b25DYXB0aW9ufVxuICAgICAgPC9TdHlsZWRCdXR0b24+XG4gICAgICB7c2hvdyA/IDxNZWRpYUNhcHRpb24+e3Byb3BzLmNoaWxkcmVufTwvTWVkaWFDYXB0aW9uPiA6IG51bGx9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5leHBvcnQgeyBIaWRkZW5NZWRpYUNhcHRpb24gfTtcbiIsImltcG9ydCBSZWFjdCwgeyBGdW5jdGlvbkNvbXBvbmVudCB9IGZyb20gJ3JlYWN0JztcblxuY29uc3QgTWVkaWFDYXB0aW9uOiBGdW5jdGlvbkNvbXBvbmVudCA9ICh7IGNoaWxkcmVuIH0pID0+IDxmaWdjYXB0aW9uIGNsYXNzTmFtZT1cIm1lZGlhLWNhcHRpb25cIj57Y2hpbGRyZW59PC9maWdjYXB0aW9uPjtcblxuZXhwb3J0IHsgTWVkaWFDYXB0aW9uIH07XG4iLCJpbXBvcnQgUmVhY3QsIHsgRnVuY3Rpb25Db21wb25lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBEYXNoYm9hcmRTZWN0aW9uIH0gZnJvbSAnLi4vY29tcG9uZW50cy9EYXNoYm9hcmRTZWN0aW9uJztcbmltcG9ydCB7IHVzZURhc2hib2FyZERhdGEgfSBmcm9tICcuL2hvb2tzL2RhdGEnO1xuaW1wb3J0IHtcbiAgY29tbXMsXG4gIGZpbmFuY2VEYXNoYm9hcmQsXG4gIGZ1bmRyYWlzaW5nLFxuICBociBhcyBodW1hblJlc291cmNlc0Rhc2hib2FyZCxcbiAgcHJvamVjdE1hbmFnZW1lbnQsXG4gIGRhdGFTeXN0ZW1zLFxufSBmcm9tICcuL3V0aWxzL2Rhc2hib2FyZHMnO1xuXG5jb25zdCBEYXNoYm9hcmQ6IEZ1bmN0aW9uQ29tcG9uZW50ID0gKCkgPT4ge1xuICBjb25zdCBkYXRhID0gdXNlRGFzaGJvYXJkRGF0YSgpO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxEYXNoYm9hcmRTZWN0aW9uIGlkPVwiZmluYW5jZVwiIHRpdGxlPVwiRmluYW5jZVwiIGRlcGFydG1lbnQ9XCJGaW5hbmNlXCIgZGF0YT17ZGF0YX0gZ3JpZHM9e2ZpbmFuY2VEYXNoYm9hcmR9IC8+XG4gICAgICA8RGFzaGJvYXJkU2VjdGlvbiBpZD1cImhyXCIgdGl0bGU9XCJIdW1hbiBSZXNvdXJjZXNcIiBkZXBhcnRtZW50PVwiSFJcIiBkYXRhPXtkYXRhfSBncmlkcz17aHVtYW5SZXNvdXJjZXNEYXNoYm9hcmR9IC8+XG4gICAgICA8RGFzaGJvYXJkU2VjdGlvblxuICAgICAgICBpZD1cInByb2plY3QtbWFuYWdlbWVudFwiXG4gICAgICAgIHRpdGxlPVwiUHJvamVjdCBNYW5hZ2VtZW50XCJcbiAgICAgICAgZGVwYXJ0bWVudD1cIlByb2plY3QgbWFuYWdlbWVudFwiXG4gICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgIGdyaWRzPXtwcm9qZWN0TWFuYWdlbWVudH1cbiAgICAgIC8+XG4gICAgICA8RGFzaGJvYXJkU2VjdGlvblxuICAgICAgICBpZD1cImNvbW11bmljYXRpb25zXCJcbiAgICAgICAgdGl0bGU9XCJDb21tdW5pY2F0aW9uc1wiXG4gICAgICAgIGRlcGFydG1lbnQ9XCJDb21tcyBhbmQgZW5nYWdlbWVudFwiXG4gICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgIGdyaWRzPXtjb21tc31cbiAgICAgIC8+XG4gICAgICA8RGFzaGJvYXJkU2VjdGlvblxuICAgICAgICBpZD1cImRldmVsb3BtZW50XCJcbiAgICAgICAgdGl0bGU9XCJEZXZlbG9wbWVudCAmIEZ1bmRyYWlzaW5nXCJcbiAgICAgICAgZGVwYXJ0bWVudD1cIkRldmVsb3BtZW50IGFuZCBmdW5kcmFpc2luZ1wiXG4gICAgICAgIGRhdGE9e2RhdGF9XG4gICAgICAgIGdyaWRzPXtmdW5kcmFpc2luZ31cbiAgICAgIC8+XG4gICAgICA8RGFzaGJvYXJkU2VjdGlvblxuICAgICAgICBpZD1cImRhdGEtc3lzdGVtc1wiXG4gICAgICAgIHRpdGxlPVwiSVRcIlxuICAgICAgICBkZXBhcnRtZW50PVwiSVQgc3lzdGVtcyBhbmQgZGF0YSBzeXN0ZW1zXCJcbiAgICAgICAgZGF0YT17ZGF0YX1cbiAgICAgICAgZ3JpZHM9e2RhdGFTeXN0ZW1zfVxuICAgICAgLz5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IERhc2hib2FyZDtcbiIsImltcG9ydCAqIGFzIGxvY2FsZm9yYWdlIGZyb20gJ2xvY2FsZm9yYWdlJztcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBEYXNoYm9hcmREYXRhIH0gZnJvbSAnLi4vLi4vdXRpbHMvdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgdXNlRGFzaGJvYXJkRGF0YSA9ICgpOiBEYXNoYm9hcmREYXRhW10gPT4ge1xuICBjb25zdCBbZGF0YSwgc2V0RGF0YV0gPSB1c2VTdGF0ZTxEYXNoYm9hcmREYXRhW10+KFtdKTtcbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBsb2NhbGZvcmFnZS5nZXRJdGVtKCdkYXNoYm9hcmQudXBkYXRlZEF0JykudGhlbigodmFsdWU6IHN0cmluZyB8IG51bGwpID0+IHtcbiAgICAgIGNvbnN0IHVwZGF0ZWRBdCA9IHZhbHVlICYmIG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgIGlmICh1cGRhdGVkQXQpIHtcbiAgICAgICAgdXBkYXRlZEF0LnNldEhvdXJzKHVwZGF0ZWRBdC5nZXRIb3VycygpICsgMSk7XG4gICAgICB9XG4gICAgICBpZiAoKHVwZGF0ZWRBdCAmJiBEYXRlLm5vdygpIC0gdXBkYXRlZEF0LmdldFRpbWUoKSA+IDYwICogNjApIHx8ICF1cGRhdGVkQXQpIHtcbiAgICAgICAgY29uc3QgZGF0YVVSTCA9IGAke3dpbmRvdy5sb2NhdGlvbi5vcmlnaW59L2FwaS9kYXNoYm9hcmQvZGF0YS9gO1xuICAgICAgICB3aW5kb3dcbiAgICAgICAgICAuZmV0Y2goZGF0YVVSTClcbiAgICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAgICAgICAudGhlbigoeyBkYXRhLCBlcnJvciB9KSA9PiB7XG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZhaWxlZCB0byBmZXRjaCBkYXRhOicsIGVycm9yKTtcblxuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoZGF0YSkge1xuICAgICAgICAgICAgICBzZXREYXRhKGRhdGEpO1xuICAgICAgICAgICAgICBsb2NhbGZvcmFnZS5zZXRJdGVtKCdkYXNoYm9hcmQuZGF0YScsIGRhdGEpO1xuICAgICAgICAgICAgICBsb2NhbGZvcmFnZS5zZXRJdGVtKCdkYXNoYm9hcmQudXBkYXRlZEF0JywgbmV3IERhdGUoKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2NhbGZvcmFnZS5nZXRJdGVtKCdkYXNoYm9hcmQuZGF0YScpLnRoZW4oKGRhdGE6IERhc2hib2FyZERhdGFbXSkgPT4ge1xuICAgICAgICAgIHNldERhdGEoZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGRhdGE7XG59O1xuIiwiaW1wb3J0IGRlZXBtZXJnZSBmcm9tICdkZWVwbWVyZ2UnO1xuaW1wb3J0IHsgYWRkQ2hhcnRSZXZlcnNlTGlzdGVuZXIgfSBmcm9tICcuJztcbmltcG9ydCB7IERhdGVEaXZpc2lvbiwgZ2VuZXJhdGVPYmplY3REYXRhc2V0IH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgRGFzaGJvYXJkQ2hhcnRFdmVudHMsIERhc2hib2FyZERhdGEsIEV2ZW50T3B0aW9ucyB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzJztcblxuZXhwb3J0IGNvbnN0IGhpZGVOYXJyYXRpdmUgPSAoY2hhcnROb2RlOiBIVE1MRGl2RWxlbWVudCk6IHZvaWQgPT4ge1xuICBjb25zdCBwYXJlbnQgPSBjaGFydE5vZGUucGFyZW50RWxlbWVudDtcbiAgaWYgKHBhcmVudCkge1xuICAgIGNvbnN0IG5hcnJhdGl2ZXMgPSBwYXJlbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnbWVkaWEtY2FwdGlvbiBjaGFydC1ldmVudC1jYXB0aW9uJyk7XG4gICAgQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKG5hcnJhdGl2ZXMsIChuYXJyYXRpdmU6IEhUTUxFbGVtZW50KSA9PiBuYXJyYXRpdmUucmVtb3ZlKCkpO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3Qgc2hvd05hcnJhdGl2ZSA9IChjaGFydE5vZGU6IEhUTUxEaXZFbGVtZW50LCBjb250ZW50OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgY29uc3QgcGFyZW50ID0gY2hhcnROb2RlLnBhcmVudEVsZW1lbnQ7XG4gIGlmIChwYXJlbnQpIHtcbiAgICBoaWRlTmFycmF0aXZlKGNoYXJ0Tm9kZSk7XG4gICAgY29uc3QgY2FwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ZpZ2NhcHRpb24nKTtcbiAgICBjYXB0aW9uLmNsYXNzTGlzdC5hZGQoJ21lZGlhLWNhcHRpb24nLCAnY2hhcnQtZXZlbnQtY2FwdGlvbicpO1xuICAgIGNvbnRlbnQuc3BsaXQoJ1xcbicpLmZvckVhY2goKG5vdGUpID0+IHtcbiAgICAgIGNvbnN0IHBhcmFncmFwaCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICAgIHBhcmFncmFwaC5pbm5lckhUTUwgPSBub3RlO1xuICAgICAgY2FwdGlvbi5hcHBlbmRDaGlsZChwYXJhZ3JhcGgpO1xuICAgIH0pO1xuICAgIHBhcmVudC5hcHBlbmRDaGlsZChjYXB0aW9uKTtcbiAgfVxufTtcblxuLyoqXG4gKiBDb21tb24gaGFuZGxpbmcgb2YgZXZlbnRzIG9uIGJhci9saW5lIGNoYXJ0cyAtIGNsaWNrIHRvIGRyaWxsZG93biAmIGhvdmVyIHRvIHNob3cgdG9vbHRpcHNcbiAqIEBwYXJhbSBtZXRyaWNzIC0gSW5kaWNhdG9ycyBmb3IgYSBwYXJ0aWN1bGFyIGNoYXJ0XG4gKiBAcmV0dXJucyBPYmplY3Qgd2l0aCBldmVudCBoYW5kbGVycyAtIG9uQ2xpY2ssIG9uSG92ZXIsIG9uQmx1clxuICovXG5leHBvcnQgY29uc3QgZ2V0RXZlbnRIYW5kbGVycyA9IChcbiAgbWV0cmljczogc3RyaW5nIHwgc3RyaW5nW10sXG4gIG9wdGlvbnM6IFBhcnRpYWw8ZWNoYXJ0cy5FQ2hhcnRPcHRpb24+ID0ge30sXG4gIGRpdmlzaW9uOiBEYXRlRGl2aXNpb24gPSAncXVhcnRlcicsIC8vIGRldGVybWluZXMgd2hldGhlciB0byBzcGxpdCB4LWF4aXMgZGF0ZXMgYnkgbW9udGggb3IgcXVhcnRlclxuKTogRGFzaGJvYXJkQ2hhcnRFdmVudHMgPT4ge1xuICByZXR1cm4ge1xuICAgIG9uQ2xpY2s6ICh7IGRhdGEsIGNoYXJ0LCBwYXJhbXMgfTogRXZlbnRPcHRpb25zKTogdm9pZCA9PiB7XG4gICAgICBpZiAoIXBhcmFtcy5kYXRhKSByZXR1cm47XG4gICAgICBjb25zdCB7IHllYXI6IHkgfSA9IHBhcmFtcy5kYXRhO1xuICAgICAgY29uc3Qgc291cmNlID0gZ2VuZXJhdGVPYmplY3REYXRhc2V0KFxuICAgICAgICAoZGF0YSBhcyBEYXNoYm9hcmREYXRhW10pLmZpbHRlcigoeyBtZXRyaWMsIHllYXIgfSkgPT4gbWV0cmljcy5pbmNsdWRlcyhtZXRyaWMpICYmIHkgPT09IHllYXIpLFxuICAgICAgICBkaXZpc2lvbixcbiAgICAgICk7XG4gICAgICBhZGRDaGFydFJldmVyc2VMaXN0ZW5lcihjaGFydCk7XG5cbiAgICAgIGNoYXJ0LnNldE9wdGlvbihkZWVwbWVyZ2Uob3B0aW9ucywgeyBkYXRhc2V0OiB7IHNvdXJjZSwgZGltZW5zaW9uczogWydxdWFydGVyJ10uY29uY2F0KG1ldHJpY3MpIH0gfSkpO1xuICAgIH0sXG4gICAgb25Ib3ZlcjogKHsgY2hhcnQsIHBhcmFtcyB9OiBFdmVudE9wdGlvbnMpOiB2b2lkID0+IHtcbiAgICAgIGlmICghcGFyYW1zLmRhdGEpIHJldHVybjtcbiAgICAgIGNvbnN0IG1ldHJpYyA9IHBhcmFtcy5zZXJpZXNOYW1lO1xuICAgICAgY29uc3QgbmFycmF0aXZlID0gcGFyYW1zLmRhdGFbYCR7bWV0cmljfSAtIG5hcnJhdGl2ZWBdO1xuXG4gICAgICBpZiAobmFycmF0aXZlKSB7XG4gICAgICAgIHNob3dOYXJyYXRpdmUoY2hhcnQuZ2V0RG9tKCkgYXMgSFRNTERpdkVsZW1lbnQsIG5hcnJhdGl2ZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBvbkJsdXI6ICh7IGNoYXJ0IH06IEV2ZW50T3B0aW9ucyk6IHZvaWQgPT4gaGlkZU5hcnJhdGl2ZShjaGFydC5nZXREb20oKSBhcyBIVE1MRGl2RWxlbWVudCksXG4gIH07XG59O1xuIiwiaW1wb3J0IHsgdG9Qb3VuZHMgfSBmcm9tICcuLic7XG5cbmV4cG9ydCAqIGZyb20gJy4vZXZlbnRzJztcblxuZXhwb3J0IGNvbnN0IGNvbG91cnMgPSBbJyM2YzEyMGEnLCAnI2EyMWUyNScsICcjY2QyYjJhJywgJyNkYzM3MmQnLCAnI2VjNjI1MCcsICcjZjZiMGEwJywgJyNmYmQ3Y2InLCAnI2ZjZTNkYyddO1xuZXhwb3J0IGNvbnN0IGdyaWQ6IGVjaGFydHMuRUNoYXJ0T3B0aW9uLkdyaWQgPSB7XG4gIGxlZnQ6ICczJScsXG4gIHJpZ2h0OiAnNCUnLFxuICBib3R0b206ICczJScsXG4gIGNvbnRhaW5MYWJlbDogdHJ1ZSxcbn07XG5cbi8qKlxuICogVXNlIHdoZW4gdXBkYXRpbmcgYSBjaGFydCdzIG9wdGlvbnNcbiAqIENhcHR1cmVzIHRoZSBjdXJyZW50IG9wdGlvbnMgJiBhZGRzIGFuIGV2ZW50IGxpc3RlbmVyIHRoYXQgd2lsbCByZXZlcnQgdG8gdGhlIG9sZCBvcHRpb25zIHdoZW4gdGhlIGNhbnZhcyBpcyBjbGlja2VkXG4gKiBAcGFyYW0gY2hhcnQgZWNoYXJ0cy5FQ2hhcnRzXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRDaGFydFJldmVyc2VMaXN0ZW5lciA9IChjaGFydDogZWNoYXJ0cy5FQ2hhcnRzLCBtZXJnZSA9IGZhbHNlKTogdm9pZCA9PiB7XG4gIGNvbnN0IGN1cnJlbnRPcHRpb25zID0gY2hhcnQuZ2V0T3B0aW9uKCk7XG4gIGNvbnN0IGNoYXJ0Tm9kZSA9IGNoYXJ0LmdldERvbSgpO1xuICBjb25zdCBjYW52YXMgPSBjaGFydE5vZGUuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2NhbnZhcycpWzBdO1xuICBpZiAoY2FudmFzKSB7XG4gICAgY29uc3Qgb25DbGljayA9ICgpID0+IHtcbiAgICAgIGNoYXJ0LnNldE9wdGlvbihjdXJyZW50T3B0aW9ucywgIW1lcmdlKTtcbiAgICAgIGNhbnZhcy5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQ2xpY2spO1xuICAgIH07XG4gICAgY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25DbGljayk7XG4gIH1cbn07XG5cbnR5cGUgRm9ybWF0dGVyT3B0aW9ucyA9IHsgcHJlZml4Pzogc3RyaW5nOyBzdWZmaXg/OiBzdHJpbmc7IGN1cnJlbmN5PzogYm9vbGVhbiB9O1xuXG5leHBvcnQgY29uc3QgdG9vdGlwRm9ybWF0dGVyID0gKHtcbiAgcHJlZml4ID0gJycsXG4gIHN1ZmZpeCA9ICcnLFxuICBjdXJyZW5jeSxcbn06IEZvcm1hdHRlck9wdGlvbnMpOiBlY2hhcnRzLkVDaGFydE9wdGlvbi5Ub29sdGlwLkZvcm1hdHRlciA9PiAoXG4gIHBhcmFtczogZWNoYXJ0cy5FQ2hhcnRPcHRpb24uVG9vbHRpcC5Gb3JtYXQsXG4pOiBzdHJpbmcgPT4ge1xuICBjb25zdCB7IHZhbHVlLCBzZXJpZXNOYW1lIH0gPSBwYXJhbXM7XG5cbiAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBpZiAodmFsdWUgJiYgc2VyaWVzTmFtZSAmJiAodmFsdWUgYXMgYW55KVtzZXJpZXNOYW1lXSkge1xuICAgIGxldCByYXdWYWx1ZSA9ICh2YWx1ZSBhcyBhbnkpW3Nlcmllc05hbWVdO1xuICAgIGlmICh0eXBlb2YgcmF3VmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICByYXdWYWx1ZSA9IE1hdGgucm91bmQocmF3VmFsdWUgKiAxMDApIC8gMTAwO1xuICAgIH1cbiAgICBjb25zdCBwYXJzZWRWYWx1ZSA9IGN1cnJlbmN5ID8gdG9Qb3VuZHMocmF3VmFsdWUpIDogcmF3VmFsdWU7XG5cbiAgICByZXR1cm4gYCR7cHJlZml4fSR7cGFyc2VkVmFsdWV9JHtzdWZmaXh9YDtcbiAgfVxuXG4gIHJldHVybiAnTm8gRGF0YSc7XG4gIC8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEJhckxhYmVsQ29uZmlnID0gKG9wdGlvbnM6IEZvcm1hdHRlck9wdGlvbnMgJiB7IHBvc2l0aW9uPzogc3RyaW5nIH0pID0+ICh7XG4gIHNob3c6IHRydWUsXG4gIHBvc2l0aW9uOiBvcHRpb25zLnBvc2l0aW9uIHx8ICd0b3AnLFxuICAvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICBmb3JtYXR0ZXI6IChwYXJhbXM6IGFueSk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSBwYXJhbXMudmFsdWVbcGFyYW1zLmRpbWVuc2lvbk5hbWVzW3BhcmFtcy5lbmNvZGUueVswXV1dO1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICBjb25zdCByb3VuZGVkVmFsdWUgPSBNYXRoLnJvdW5kKHZhbHVlICogMTAwKSAvIDEwMDtcbiAgICAgIGNvbnN0IHBhcnNlZFZhbHVlID0gb3B0aW9ucy5jdXJyZW5jeSA/IHRvUG91bmRzKHJvdW5kZWRWYWx1ZSkgOiByb3VuZGVkVmFsdWU7XG5cbiAgICAgIHJldHVybiBgJHtvcHRpb25zLnByZWZpeCB8fCAnJ30ke3BhcnNlZFZhbHVlfSR7b3B0aW9ucy5zdWZmaXggfHwgJyd9YDtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkVmFsdWUgPSBvcHRpb25zLmN1cnJlbmN5ID8gdG9Qb3VuZHModmFsdWUpIDogdmFsdWU7XG5cbiAgICByZXR1cm4gYCR7b3B0aW9ucy5wcmVmaXggfHwgJyd9JHtwYXJzZWRWYWx1ZX0ke29wdGlvbnMuc3VmZml4IHx8ICcnfWA7XG4gIH0sXG59KTtcbiIsImltcG9ydCB7IGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgRGFzaGJvYXJkRGF0YSwgRGFzaGJvYXJkR3JpZCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzJztcbmltcG9ydCB7IGdldEJhckxhYmVsQ29uZmlnLCBnZXRFdmVudEhhbmRsZXJzLCBncmlkLCB0b290aXBGb3JtYXR0ZXIgfSBmcm9tICcuLi9jaGFydCc7XG5cbmNvbnN0IGNvbG91cnMgPSBbJyM2NTA5M2QnLCAnIzdlMTg1MCcsICcjOWYxNDU5JywgJyNkMTI1NjgnLCAnI2YzYTViNiddO1xuY29uc3QgZGFzaGJvYXJkTWV0cmljcyA9IFtcbiAgJ0JvdW5jZSByYXRlIG9uIHRoZSB3ZWJzaXRlICglKScsXG4gICdEd2VsbCB0aW1lIG9uIHRoZSB3ZWJzaXRlIChtaW51dGVzKScsXG4gICdPdmVyYWxsIHNpdGUgU0VPIHNjb3JlJyxcbiAgJ1R3aXR0ZXIgZW5nYWdlbWVudCByYXRlJyxcbiAgJ0xpbmtlZGluIGVuZ2FnZW1lbnQgcmF0ZScsXG4gICdQcm9wb3J0aW9uIG9mIG5ldyBsaW5rZWRpbiBmb2xsb3dlcnMgZnJvbSB0YXJnZXQgc3Rha2Vob2xkZXIgZ3JvdXBzJyxcbl07XG5cbmV4cG9ydCBjb25zdCBjb21tczogRGFzaGJvYXJkR3JpZFtdID0gW1xuICB7XG4gICAgaWQ6ICcxJyxcbiAgICBjb2x1bW5zOiAzLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdib3VuY2UtcmF0ZScsXG4gICAgICAgIG1ldGE6IGRhc2hib2FyZE1ldHJpY3NbMF0sXG4gICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+XG4gICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBBcnJheTxzdHJpbmc+KCkuY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbMF0pKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgc2hvdzogdHJ1ZSwgdHJpZ2dlcjogJ2l0ZW0nLCBmb3JtYXR0ZXI6IHRvb3RpcEZvcm1hdHRlcih7IHN1ZmZpeDogJyUnIH0pIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgc2hvdzogZmFsc2UgfSxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHsgZGltZW5zaW9uczogWyd5ZWFyJ10uY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbMF0pIH0sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgdG9vbGJveDogeyBmZWF0dXJlOiB7IHNhdmVBc0ltYWdlOiB7fSB9IH0sXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzaG93OiBmYWxzZSwgc3BsaXROdW1iZXI6IDMsIGF4aXNMYWJlbDogeyBmb3JtYXR0ZXI6ICd7dmFsdWV9JScgfSB9LFxuICAgICAgICAgICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJywgbGFiZWw6IGdldEJhckxhYmVsQ29uZmlnKHsgc3VmZml4OiAnJScgfSkgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbMF0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdkd2VsbC10aW1lJyxcbiAgICAgICAgbWV0YTogZGFzaGJvYXJkTWV0cmljc1sxXSxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGRhdGE6IChkYXRhOiBEYXNoYm9hcmREYXRhW10pOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdFRleHQ+W10gPT5cbiAgICAgICAgICAgIGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlKGRhdGEsIEFycmF5PHN0cmluZz4oKS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1sxXSkpLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvdXJzLFxuICAgICAgICAgICAgdG9vbHRpcDogeyBzaG93OiB0cnVlLCB0cmlnZ2VyOiAnaXRlbScsIGZvcm1hdHRlcjogdG9vdGlwRm9ybWF0dGVyKHt9KSB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhciddLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzFdKSB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgZmVhdHVyZTogeyBzYXZlQXNJbWFnZToge30gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc2hvdzogZmFsc2UsIHNwbGl0TnVtYmVyOiAzLCBheGlzTGFiZWw6IHsgZm9ybWF0dGVyOiAne3ZhbHVlfScgfSB9LFxuICAgICAgICAgICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJywgbGFiZWw6IGdldEJhckxhYmVsQ29uZmlnKHt9KSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLmdldEV2ZW50SGFuZGxlcnMoZGFzaGJvYXJkTWV0cmljc1sxXSksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3Nlby1zY29yZScsXG4gICAgICAgIG1ldGE6IGRhc2hib2FyZE1ldHJpY3NbMl0sXG4gICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+XG4gICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBBcnJheTxzdHJpbmc+KCkuY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbMl0pKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgc2hvdzogdHJ1ZSwgdHJpZ2dlcjogJ2l0ZW0nLCBmb3JtYXR0ZXI6IHRvb3RpcEZvcm1hdHRlcih7fSkgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgZGF0YXNldDogeyBkaW1lbnNpb25zOiBbJ3llYXInXS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1syXSkgfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB0b29sYm94OiB7IGZlYXR1cmU6IHsgc2F2ZUFzSW1hZ2U6IHt9IH0gfSxcbiAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNob3c6IGZhbHNlLCBzcGxpdE51bWJlcjogMywgYXhpc0xhYmVsOiB7IGZvcm1hdHRlcjogJ3t2YWx1ZX0nIH0gfSxcbiAgICAgICAgICAgIHNlcmllczogW3sgdHlwZTogJ2JhcicsIGxhYmVsOiBnZXRCYXJMYWJlbENvbmZpZyh7fSkgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbMl0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICd0d2l0dGVyLWVuZ2FnZW1lbnQnLFxuICAgICAgICBtZXRhOiBkYXNoYm9hcmRNZXRyaWNzWzNdLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgQXJyYXk8c3RyaW5nPigpLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzNdKSksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHNob3c6IHRydWUsIHRyaWdnZXI6ICdpdGVtJywgZm9ybWF0dGVyOiB0b290aXBGb3JtYXR0ZXIoeyBzdWZmaXg6ICclJyB9KSB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhciddLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzNdKSB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgZmVhdHVyZTogeyBzYXZlQXNJbWFnZToge30gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc2hvdzogZmFsc2UsIHNwbGl0TnVtYmVyOiAzLCBheGlzTGFiZWw6IHsgZm9ybWF0dGVyOiAne3ZhbHVlfSUnIH0gfSxcbiAgICAgICAgICAgIHNlcmllczogW3sgdHlwZTogJ2JhcicsIGxhYmVsOiBnZXRCYXJMYWJlbENvbmZpZyh7IHN1ZmZpeDogJyUnIH0pIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uZ2V0RXZlbnRIYW5kbGVycyhkYXNoYm9hcmRNZXRyaWNzWzNdKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnbGlua2VkaW4tZW5nYWdlbWVudCcsXG4gICAgICAgIG1ldGE6IGRhc2hib2FyZE1ldHJpY3NbNF0sXG4gICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+XG4gICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBBcnJheTxzdHJpbmc+KCkuY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbNF0pKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgc2hvdzogdHJ1ZSwgdHJpZ2dlcjogJ2l0ZW0nLCBmb3JtYXR0ZXI6IHRvb3RpcEZvcm1hdHRlcih7IHN1ZmZpeDogJyUnIH0pIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgc2hvdzogZmFsc2UgfSxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHsgZGltZW5zaW9uczogWyd5ZWFyJ10uY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbNF0pIH0sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgdG9vbGJveDogeyBmZWF0dXJlOiB7IHNhdmVBc0ltYWdlOiB7fSB9IH0sXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzaG93OiBmYWxzZSwgc3BsaXROdW1iZXI6IDMsIGF4aXNMYWJlbDogeyBmb3JtYXR0ZXI6ICd7dmFsdWV9JScgfSB9LFxuICAgICAgICAgICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJywgbGFiZWw6IGdldEJhckxhYmVsQ29uZmlnKHsgc3VmZml4OiAnJScgfSkgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbNF0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgaWQ6ICcyJyxcbiAgICBjb2x1bW5zOiAxLFxuICAgIGNsYXNzTmFtZTogJ20tcGlsbHMnLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdsaW5rZWRpbi1mb2xsb3dlcnMnLFxuICAgICAgICBtZXRhOiBkYXNoYm9hcmRNZXRyaWNzWzVdLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgQXJyYXk8c3RyaW5nPigpLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzVdKSksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHNob3c6IHRydWUsIHRyaWdnZXI6ICdpdGVtJywgZm9ybWF0dGVyOiB0b290aXBGb3JtYXR0ZXIoeyBzdWZmaXg6ICclJyB9KSB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhciddLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzVdKSB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgZmVhdHVyZTogeyBzYXZlQXNJbWFnZToge30gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc2hvdzogZmFsc2UsIHNwbGl0TnVtYmVyOiAzLCBheGlzTGFiZWw6IHsgZm9ybWF0dGVyOiAne3ZhbHVlfSUnIH0gfSxcbiAgICAgICAgICAgIHNlcmllczogW3sgdHlwZTogJ2JhcicsIGxhYmVsOiBnZXRCYXJMYWJlbENvbmZpZyh7IHN1ZmZpeDogJyUnIH0pIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uZ2V0RXZlbnRIYW5kbGVycyhkYXNoYm9hcmRNZXRyaWNzWzVdKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iLCJpbXBvcnQgeyBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZSB9IGZyb20gJy4uJztcbmltcG9ydCB7IERhc2hib2FyZERhdGEsIERhc2hib2FyZEdyaWQgfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcyc7XG5pbXBvcnQgeyBnZXRCYXJMYWJlbENvbmZpZywgZ2V0RXZlbnRIYW5kbGVycywgZ3JpZCwgdG9vdGlwRm9ybWF0dGVyIH0gZnJvbSAnLi4vY2hhcnQnO1xuXG5jb25zdCBjb2xvdXJzID0gWycjMzAyYjJlJywgJyM1NTUwNTMnLCAnIzczNmU3MycsICcjYTlhNmFhJywgJyNkOWQ0ZGEnXTtcbmNvbnN0IGRhc2hib2FyZE1ldHJpY3MgPSBbXG4gICdSb2FkbWFwIGluIHBsYWNlIGZvciBnbG9iYWwgSW5mcmFzdHJ1Y3R1cmUgd2l0aCBjYXBhY2l0eSBmb3IgZ3Jvd3RoIChQcm9ncmVzcyBJbmRpY2F0b3IpJyxcbiAgJ0Z1bGx5IGhvc3RlZCBzeXN0ZW1zIHdpdGggcmVkdWNlZCBpbnRlcm5hbCByZWxpYW5jZSAoUHJvZ3Jlc3MgSW5kaWNhdG9yKScsXG4gICdTdGFuZGFyZGlzZWQgZ2xvYmFsIHN1cHBvcnQgKFByb2dyZXNzIEluZGljYXRvciknLFxuXTtcblxuZXhwb3J0IGNvbnN0IGRhdGFTeXN0ZW1zOiBEYXNoYm9hcmRHcmlkW10gPSBbXG4gIHtcbiAgICBpZDogJzEnLFxuICAgIGNvbHVtbnM6IDIsXG4gICAgY29udGVudDogW1xuICAgICAge1xuICAgICAgICBpZDogJ2dsb2JhbC1pbmZyYXN0cnVjdHVyZScsXG4gICAgICAgIG1ldGE6IGRhc2hib2FyZE1ldHJpY3NbMF0sXG4gICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+XG4gICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBBcnJheTxzdHJpbmc+KCkuY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbMF0pKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgICAgICAgICBmb3JtYXR0ZXI6IHRvb3RpcEZvcm1hdHRlcih7IHN1ZmZpeDogJyUnIH0pLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICBkaW1lbnNpb25zOiBbJ3llYXInXS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1swXSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgZmVhdHVyZTogeyBzYXZlQXNJbWFnZToge30gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc2hvdzogZmFsc2UsIHNwbGl0TnVtYmVyOiAzLCBheGlzTGFiZWw6IHsgZm9ybWF0dGVyOiAne3ZhbHVlfSUnIH0gfSxcbiAgICAgICAgICAgIHNlcmllczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2JhcicsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGdldEJhckxhYmVsQ29uZmlnKHsgc3VmZml4OiAnJScgfSksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uZ2V0RXZlbnRIYW5kbGVycyhkYXNoYm9hcmRNZXRyaWNzWzBdKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnaG9zdGVkLXN5c3RlbXMnLFxuICAgICAgICBtZXRhOiBkYXNoYm9hcmRNZXRyaWNzWzFdLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgQXJyYXk8c3RyaW5nPigpLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzFdKSksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7XG4gICAgICAgICAgICAgIHNob3c6IHRydWUsXG4gICAgICAgICAgICAgIHRyaWdnZXI6ICdpdGVtJyxcbiAgICAgICAgICAgICAgZm9ybWF0dGVyOiB0b290aXBGb3JtYXR0ZXIoeyBzdWZmaXg6ICclJyB9KSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgc2hvdzogZmFsc2UgfSxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHsgZGltZW5zaW9uczogWyd5ZWFyJ10uY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbMV0pIH0sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgdG9vbGJveDogeyBmZWF0dXJlOiB7IHNhdmVBc0ltYWdlOiB7fSB9IH0sXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzaG93OiBmYWxzZSwgc3BsaXROdW1iZXI6IDMsIGF4aXNMYWJlbDogeyBmb3JtYXR0ZXI6ICd7dmFsdWV9JScgfSB9LFxuICAgICAgICAgICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJywgbGFiZWw6IGdldEJhckxhYmVsQ29uZmlnKHsgc3VmZml4OiAnJScgfSkgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbMV0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdnbG9iYWwtc3VwcG9ydCcsXG4gICAgICAgIG1ldGE6IGRhc2hib2FyZE1ldHJpY3NbMl0sXG4gICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+XG4gICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBBcnJheTxzdHJpbmc+KCkuY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbMl0pKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHtcbiAgICAgICAgICAgICAgc2hvdzogdHJ1ZSxcbiAgICAgICAgICAgICAgdHJpZ2dlcjogJ2l0ZW0nLFxuICAgICAgICAgICAgICBmb3JtYXR0ZXI6IHRvb3RpcEZvcm1hdHRlcih7IHN1ZmZpeDogJyUnIH0pLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgZGF0YXNldDogeyBkaW1lbnNpb25zOiBbJ3llYXInXS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1syXSkgfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB0b29sYm94OiB7IGZlYXR1cmU6IHsgc2F2ZUFzSW1hZ2U6IHt9IH0gfSxcbiAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNob3c6IGZhbHNlLCBzcGxpdE51bWJlcjogMywgYXhpc0xhYmVsOiB7IGZvcm1hdHRlcjogJ3t2YWx1ZX0lJyB9IH0sXG4gICAgICAgICAgICBzZXJpZXM6IFt7IHR5cGU6ICdiYXInLCBsYWJlbDogZ2V0QmFyTGFiZWxDb25maWcoeyBzdWZmaXg6ICclJyB9KSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLmdldEV2ZW50SGFuZGxlcnMoZGFzaGJvYXJkTWV0cmljc1syXSksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgZ2VuZXJhdGVPYmplY3REYXRhc2V0LCBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZSB9IGZyb20gJy4uLyc7XG5pbXBvcnQgeyBEYXNoYm9hcmREYXRhLCBEYXNoYm9hcmRHcmlkLCBFdmVudE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcyc7XG5pbXBvcnQgeyBhZGRDaGFydFJldmVyc2VMaXN0ZW5lciwgY29sb3VycywgZ2V0QmFyTGFiZWxDb25maWcsIGdyaWQgfSBmcm9tICcuLi9jaGFydCc7XG5cbmV4cG9ydCBjb25zdCBmaW5hbmNlRGFzaGJvYXJkOiBEYXNoYm9hcmRHcmlkW10gPSBbXG4gIHtcbiAgICBpZDogJzEnLFxuICAgIGNvbHVtbnM6IDIsXG4gICAgY29udGVudDogW1xuICAgICAge1xuICAgICAgICBpZDogJ3Byb2plY3QtdGltZScsXG4gICAgICAgIG1ldGE6ICdQcm9wb3J0aW9uIG9mIHN0YWZmIHRpbWUgc3BlbnQgb24gcHJvamVjdHMnLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgWydOb24tT3ZlcmhlYWQgc3RhZmYnLCAnQWxsIHN0YWZmJ10pLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvdXJzLFxuICAgICAgICAgICAgdG9vbHRpcDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IGRhdGE6IFsnTm9uLU92ZXJoZWFkIHN0YWZmJywgJ0FsbCBzdGFmZiddIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhcicsICdOb24tT3ZlcmhlYWQgc3RhZmYnLCAnQWxsIHN0YWZmJ10gfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknLCBib3VuZGFyeUdhcDogdHJ1ZSwgYXhpc1RpY2s6IHsgYWxpZ25XaXRoTGFiZWw6IHRydWUgfSB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc2hvdzogZmFsc2UgfSxcbiAgICAgICAgICAgIHNlcmllczogQXJyYXkuZnJvbShcbiAgICAgICAgICAgICAgeyBsZW5ndGg6IDIgfSxcbiAgICAgICAgICAgICAgKCk6IGVjaGFydHMuRUNoYXJ0T3B0aW9uLlNlcmllcyA9PiAoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiYXInLFxuICAgICAgICAgICAgICAgIGxhYmVsOiBnZXRCYXJMYWJlbENvbmZpZyh7IHN1ZmZpeDogJyUnIH0pLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkNsaWNrOiAoeyBkYXRhLCBjaGFydCwgcGFyYW1zIH06IEV2ZW50T3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKCFwYXJhbXMuZGF0YSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgeyB5ZWFyOiB5IH0gPSBwYXJhbXMuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGdlbmVyYXRlT2JqZWN0RGF0YXNldChcbiAgICAgICAgICAgICAgKGRhdGEgYXMgRGFzaGJvYXJkRGF0YVtdKS5maWx0ZXIoXG4gICAgICAgICAgICAgICAgKHsgbWV0cmljLCB5ZWFyIH0pID0+IChtZXRyaWMgPT09ICdOb24tT3ZlcmhlYWQgc3RhZmYnIHx8IG1ldHJpYyA9PT0gJ0FsbCBzdGFmZicpICYmIHkgPT09IHllYXIsXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYWRkQ2hhcnRSZXZlcnNlTGlzdGVuZXIoY2hhcnQpO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBlY2hhcnRzLkVDaGFydE9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgbGVnZW5kOiB7IGRhdGE6IFsnTm9uLU92ZXJoZWFkIHN0YWZmJywgJ0FsbCBzdGFmZicsICdUYXJnZXQnXSB9LFxuICAgICAgICAgICAgICBkYXRhc2V0OiB7XG4gICAgICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IFsncXVhcnRlcicsICdOb24tT3ZlcmhlYWQgc3RhZmYnLCAnQWxsIHN0YWZmJywgJ1RhcmdldCddLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzaG93OiB0cnVlLCBzY2FsZTogdHJ1ZSwgc3BsaXROdW1iZXI6IDMsIGF4aXNMYWJlbDogeyBmb3JtYXR0ZXI6ICd7dmFsdWV9JScgfSB9LFxuICAgICAgICAgICAgICBzZXJpZXM6IFtcbiAgICAgICAgICAgICAgICB7IHR5cGU6ICdsaW5lJyB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogJ2xpbmUnIH0sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICAgICAgc3ltYm9sOiAnbm9uZScsXG4gICAgICAgICAgICAgICAgICBsaW5lU3R5bGU6IHsgdHlwZTogJ2Rhc2hlZCcsIGNvbG9yOiAnIzMzMycgfSxcbiAgICAgICAgICAgICAgICAgIGl0ZW1TdHlsZTogeyBjb2xvcjogJyMzMzMnIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjaGFydC5zZXRPcHRpb24ob3B0aW9ucyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnb3ZlcmhlYWQtdGltZScsXG4gICAgICAgIG1ldGE6ICdQcm9wb3J0aW9uIG9mIHRpbWUgc3BlbnQgb24gZGlyZWN0IGFuZCBpbmRpcmVjdCBvdmVyaGVhZHMnLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgWydEaXJlY3Qgb3ZlcmhlYWRzJywgJ0luZGlyZWN0IG92ZXJoZWFkcyddKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgc2hvdzogZmFsc2UgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBkYXRhOiBbJ0RpcmVjdCBvdmVyaGVhZHMnLCAnSW5kaXJlY3Qgb3ZlcmhlYWRzJ10gfSxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHsgZGltZW5zaW9uczogWyd5ZWFyJywgJ0RpcmVjdCBvdmVyaGVhZHMnLCAnSW5kaXJlY3Qgb3ZlcmhlYWRzJ10gfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgc2VyaWVzOiBBcnJheS5mcm9tKFxuICAgICAgICAgICAgICB7IGxlbmd0aDogMiB9LFxuICAgICAgICAgICAgICAoKTogZWNoYXJ0cy5FQ2hhcnRPcHRpb24uU2VyaWVzID0+ICh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2JhcicsXG4gICAgICAgICAgICAgICAgbGFiZWw6IGdldEJhckxhYmVsQ29uZmlnKHsgc3VmZml4OiAnJScgfSksXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2xpY2s6ICh7IGRhdGEsIGNoYXJ0LCBwYXJhbXMgfTogRXZlbnRPcHRpb25zKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBpZiAoIXBhcmFtcy5kYXRhKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCB7IHllYXI6IHkgfSA9IHBhcmFtcy5kYXRhO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gZ2VuZXJhdGVPYmplY3REYXRhc2V0KFxuICAgICAgICAgICAgICAoZGF0YSBhcyBEYXNoYm9hcmREYXRhW10pLmZpbHRlcihcbiAgICAgICAgICAgICAgICAoeyBtZXRyaWMsIHllYXIgfSkgPT4gKG1ldHJpYyA9PT0gJ0RpcmVjdCBvdmVyaGVhZHMnIHx8IG1ldHJpYyA9PT0gJ0luZGlyZWN0IG92ZXJoZWFkcycpICYmIHkgPT09IHllYXIsXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYWRkQ2hhcnRSZXZlcnNlTGlzdGVuZXIoY2hhcnQpO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBlY2hhcnRzLkVDaGFydE9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgdG9vbHRpcDogeyBzaG93OiB0cnVlLCB0cmlnZ2VyOiAnYXhpcycgfSxcbiAgICAgICAgICAgICAgbGVnZW5kOiB7IGRhdGE6IFsnRGlyZWN0IG92ZXJoZWFkcycsICdJbmRpcmVjdCBvdmVyaGVhZHMnLCAnVGFyZ2V0J10gfSxcbiAgICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgICAgICBkaW1lbnNpb25zOiBbJ3F1YXJ0ZXInLCAnRGlyZWN0IG92ZXJoZWFkcycsICdJbmRpcmVjdCBvdmVyaGVhZHMnLCAnVGFyZ2V0J10sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIHlBeGlzOiB7IHNob3c6IHRydWUsIHNwbGl0TnVtYmVyOiAzLCBheGlzTGFiZWw6IHsgZm9ybWF0dGVyOiAne3ZhbHVlfSUnIH0gfSxcbiAgICAgICAgICAgICAgc2VyaWVzOiBbXG4gICAgICAgICAgICAgICAgeyB0eXBlOiAnYmFyJywgbGFiZWw6IHsgc2hvdzogZmFsc2UsIGZvcm1hdHRlcjogKCkgPT4gJycgfSB9LFxuICAgICAgICAgICAgICAgIHsgdHlwZTogJ2JhcicsIGxhYmVsOiB7IHNob3c6IGZhbHNlLCBmb3JtYXR0ZXI6ICgpID0+ICcnIH0gfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0eXBlOiAnbGluZScsXG4gICAgICAgICAgICAgICAgICBzeW1ib2w6ICdub25lJyxcbiAgICAgICAgICAgICAgICAgIGxpbmVTdHlsZTogeyB0eXBlOiAnZGFzaGVkJywgY29sb3I6ICcjMzMzJyB9LFxuICAgICAgICAgICAgICAgICAgaXRlbVN0eWxlOiB7IGNvbG9yOiAnIzMzMycgfSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNoYXJ0LnNldE9wdGlvbihvcHRpb25zKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdwZXJzb25uZWwtY29zdHMnLFxuICAgICAgICBtZXRhOiAnUGVyc29ubmVsIGNvc3RzIGFzIGEgcHJvcG9yYXRpb24gb2YgaW5jb21lICglIG9mIHRhcmdldCknLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgWydDb25zdWx0YW50cyBhcyBwcm9wb3J0aW9uIG9mIGluY29tZScsICdTYWxhcnkgYXMgcHJvcG9ydGlvbiBvZiBpbmNvbWUnXSksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgdG9wOiAnMTAlJyB9LFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICBkaW1lbnNpb25zOiBbJ3llYXInLCAnQ29uc3VsdGFudHMgYXMgcHJvcG9ydGlvbiBvZiBpbmNvbWUnLCAnU2FsYXJ5IGFzIHByb3BvcnRpb24gb2YgaW5jb21lJ10sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICAvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gICAgICAgICAgICBzZXJpZXM6IEFycmF5LmZyb20oXG4gICAgICAgICAgICAgIHsgbGVuZ3RoOiAyIH0sXG4gICAgICAgICAgICAgICgpOiBlY2hhcnRzLkVDaGFydE9wdGlvbi5TZXJpZXMgPT4gKHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmFyJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogZ2V0QmFyTGFiZWxDb25maWcoeyBzdWZmaXg6ICclJyB9KSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkNsaWNrOiAoeyBkYXRhLCBjaGFydCwgcGFyYW1zIH06IEV2ZW50T3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKCFwYXJhbXMuZGF0YSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgeyB5ZWFyOiB5IH0gPSBwYXJhbXMuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHNvdXJjZSA9IGdlbmVyYXRlT2JqZWN0RGF0YXNldChcbiAgICAgICAgICAgICAgKGRhdGEgYXMgRGFzaGJvYXJkRGF0YVtdKS5maWx0ZXIoXG4gICAgICAgICAgICAgICAgKHsgbWV0cmljLCB5ZWFyIH0pID0+XG4gICAgICAgICAgICAgICAgICBbJ0NvbnN1bHRhbnRzIGFzIHByb3BvcnRpb24gb2YgaW5jb21lJywgJ1NhbGFyeSBhcyBwcm9wb3J0aW9uIG9mIGluY29tZSddLmluY2x1ZGVzKG1ldHJpYykgJiZcbiAgICAgICAgICAgICAgICAgIHkgPT09IHllYXIsXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYWRkQ2hhcnRSZXZlcnNlTGlzdGVuZXIoY2hhcnQpO1xuXG4gICAgICAgICAgICBjb25zdCBvcHRpb25zOiBlY2hhcnRzLkVDaGFydE9wdGlvbiA9IHtcbiAgICAgICAgICAgICAgdG9vbHRpcDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgICBkYXRhc2V0OiB7XG4gICAgICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IFsncXVhcnRlcicsICdDb25zdWx0YW50cyBhcyBwcm9wb3J0aW9uIG9mIGluY29tZScsICdTYWxhcnkgYXMgcHJvcG9ydGlvbiBvZiBpbmNvbWUnXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzcGxpdE51bWJlcjogMywgYXhpc0xhYmVsOiB7IGZvcm1hdHRlcjogJ3t2YWx1ZX0lJyB9IH0sXG4gICAgICAgICAgICAgIHNlcmllczogW3sgdHlwZTogJ2JhcicgfSwgeyB0eXBlOiAnYmFyJyB9XSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBjaGFydC5zZXRPcHRpb24ob3B0aW9ucyk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnY29uc3VsdGFudC1jb3N0cycsXG4gICAgICAgIG1ldGE6ICdBdmVyYWdlIGNvbnN1bHRhbnQgJSBmb3IgeWVhciB0byBkYXRlIChleGNsIEdOUiknLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgWydBdmVyYWdlIGNvbnN1bHRhbnQgJSBmb3IgeWVhciB0byBkYXRlIChleGNsIEdOUiknXSksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgc2hvdzogZmFsc2UgfSxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHtcbiAgICAgICAgICAgICAgZGltZW5zaW9uczogWyd5ZWFyJywgJ0F2ZXJhZ2UgY29uc3VsdGFudCAlIGZvciB5ZWFyIHRvIGRhdGUgKGV4Y2wgR05SKSddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzaG93OiBmYWxzZSwgc3BsaXROdW1iZXI6IDMsIGF4aXNMYWJlbDogeyBmb3JtYXR0ZXI6ICd7dmFsdWV9JScgfSB9LFxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICAgICAgICAgICAgc2VyaWVzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAnYmFyJyxcbiAgICAgICAgICAgICAgICBsYWJlbDogZ2V0QmFyTGFiZWxDb25maWcoeyBzdWZmaXg6ICclJyB9KSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAvKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uQ2xpY2s6ICh7IGRhdGEsIGNoYXJ0LCBwYXJhbXMgfTogRXZlbnRPcHRpb25zKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBpZiAoIXBhcmFtcy5kYXRhKSByZXR1cm47XG4gICAgICAgICAgICBjb25zdCB7IHllYXI6IHkgfSA9IHBhcmFtcy5kYXRhO1xuICAgICAgICAgICAgY29uc3Qgc291cmNlID0gZ2VuZXJhdGVPYmplY3REYXRhc2V0KFxuICAgICAgICAgICAgICAoZGF0YSBhcyBEYXNoYm9hcmREYXRhW10pLmZpbHRlcihcbiAgICAgICAgICAgICAgICAoeyBtZXRyaWMsIHllYXIgfSkgPT5cbiAgICAgICAgICAgICAgICAgIFsnQXZlcmFnZSBjb25zdWx0YW50ICUgZm9yIHllYXIgdG8gZGF0ZSAoZXhjbCBHTlIpJ10uaW5jbHVkZXMobWV0cmljKSAmJiB5ID09PSB5ZWFyLFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGFkZENoYXJ0UmV2ZXJzZUxpc3RlbmVyKGNoYXJ0KTtcblxuICAgICAgICAgICAgY2hhcnQuc2V0T3B0aW9uKHtcbiAgICAgICAgICAgICAgdG9vbHRpcDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgICBkYXRhc2V0OiB7XG4gICAgICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IFsncXVhcnRlcicsICdBdmVyYWdlIGNvbnN1bHRhbnQgJSBmb3IgeWVhciB0byBkYXRlIChleGNsIEdOUiknXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgZ2VuZXJhdGVPYmplY3REYXRhc2V0LCBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZSB9IGZyb20gJy4uLyc7XG5pbXBvcnQgeyBEYXNoYm9hcmREYXRhLCBEYXNoYm9hcmRHcmlkLCBFdmVudE9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi91dGlscy90eXBlcyc7XG5pbXBvcnQgeyBhZGRDaGFydFJldmVyc2VMaXN0ZW5lciwgZ2V0RXZlbnRIYW5kbGVycywgZ3JpZCwgdG9vdGlwRm9ybWF0dGVyIH0gZnJvbSAnLi4vY2hhcnQnO1xuXG5jb25zdCBjb2xvdXJzID0gWycjNDIxODRjJywgJyM2MzI1NzInLCAnIzk5NGQ5OCcsICcjY2I5OGM0JywgJyNlYmNmZTUnXTtcbmNvbnN0IGRhc2hib2FyZE1ldHJpY3MgPSBbXG4gICdJbmNvbWUgc2VjdXJlZCB0aGlzIHF1YXJ0ZXInLFxuICAnV2VpZ2h0ZWQgdmFsdWUgNTAvODAlIHByb2JhYmxlIHBpcGVsaW5lIGF0IGVuZCBvZiBxdWFydGVyJyxcbiAgJ0luY29tZSBhdCA5MCUgYXQgZW5kIG9mIHF1YXJ0ZXIgKHdhaXRpbmcgZm9yIGFncmVlbWVudCB0byBiZSBzaWduZWQgZm9yIDIwMjEtMjAyMyknLFxuICAnV2VpZ2h0ZWQgdmFsdWUgb2YgNTAlICYgODAlIHByb2JhYmxlIHBpcGVsaW5lIGF0IGVuZCBvZiBxdWFydGVyIChpbmNvbWUgMjAyMS0yMDIzKScsXG4gICdTcGVjdWxhdGl2ZSBwaXBlbGluZSB2YWx1ZSwgbm90IHdlaWdodGVkICg+NTAlIHByb2JhYmxlKScsXG5dO1xuXG5leHBvcnQgY29uc3QgZnVuZHJhaXNpbmc6IERhc2hib2FyZEdyaWRbXSA9IFtcbiAge1xuICAgIGlkOiAnMScsXG4gICAgY29sdW1uczogMSxcbiAgICBjbGFzc05hbWU6ICdtLXBpbGxzJyxcbiAgICBjb250ZW50OiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnY29udHJhY3QtaW5jb21lJyxcbiAgICAgICAgbWV0YTogJ1RvdGFsIEluY29tZSBTZWN1cmVkIChDb250cmFjdHMgKyBHcmFudHMpJyxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGhlaWdodDogJzMwMHB4JyxcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG1ldHJpY0RhdGEgPSBkYXRhLmZpbHRlcigoeyBtZXRyaWMgfSkgPT4gZGFzaGJvYXJkTWV0cmljc1swXS5pbmNsdWRlcyhtZXRyaWMpKTtcblxuICAgICAgICAgICAgY29uc3QgZGF0YUFnZ3JlZ2F0ZUZvck1ldHJpY1llYXIgPSBtZXRyaWNEYXRhLnJlZHVjZTxEYXNoYm9hcmREYXRhW10+KChwcmV2LCBjdXJyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGNhdGVnb3J5TWV0cmljID0gYCR7ZGFzaGJvYXJkTWV0cmljc1swXX0gLSAke2N1cnIuY2F0ZWdvcnkudHJpbSgpfWA7XG4gICAgICAgICAgICAgIGlmICghcHJldi5maW5kKChpdGVtKSA9PiBpdGVtLm1ldHJpYyA9PT0gY2F0ZWdvcnlNZXRyaWMgJiYgaXRlbS55ZWFyID09PSBjdXJyLnllYXIpKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWV0cmljRGF0YUZvclllYXIgPSBtZXRyaWNEYXRhLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICh7IG1ldHJpYywgeWVhciwgY2F0ZWdvcnkgfSkgPT5cbiAgICAgICAgICAgICAgICAgICAgbWV0cmljID09PSBjdXJyLm1ldHJpYyAmJiB5ZWFyID09PSBjdXJyLnllYXIgJiYgY2F0ZWdvcnkgPT09IGN1cnIuY2F0ZWdvcnksXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBzdW0gPSBtZXRyaWNEYXRhRm9yWWVhci5yZWR1Y2UoKGN1cnJlbnRTdW0sIGN1cnIpID0+IGN1cnJlbnRTdW0gKyBjdXJyLnZhbHVlLCAwKTtcbiAgICAgICAgICAgICAgICBwcmV2LnB1c2goeyAuLi5jdXJyLCBtZXRyaWM6IGNhdGVnb3J5TWV0cmljLCB2YWx1ZTogc3VtIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCBbXSk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZW5lcmF0ZU9iamVjdERhdGFzZXQoZGF0YUFnZ3JlZ2F0ZUZvck1ldHJpY1llYXIpO1xuICAgICAgICAgIH0sXG5cbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgc2hvdzogdHJ1ZSwgdHJpZ2dlcjogJ2F4aXMnIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgc2hvdzogdHJ1ZSB9LFxuICAgICAgICAgICAgZGF0YXNldDoge1xuICAgICAgICAgICAgICBkaW1lbnNpb25zOiBbXG4gICAgICAgICAgICAgICAgJ3llYXInLFxuICAgICAgICAgICAgICAgIGAke2Rhc2hib2FyZE1ldHJpY3NbMF0gYXMgc3RyaW5nfSAtIENvbnRyYWN0c2AsXG4gICAgICAgICAgICAgICAgYCR7ZGFzaGJvYXJkTWV0cmljc1swXSBhcyBzdHJpbmd9IC0gR3JhbnRzYCxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgdG9vbGJveDogeyBmZWF0dXJlOiB7IHNhdmVBc0ltYWdlOiB7fSB9IH0sXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICB5QXhpczoge1xuICAgICAgICAgICAgICB0eXBlOiAndmFsdWUnLFxuICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICBheGlzTGluZTogeyBzaG93OiB0cnVlIH0sXG4gICAgICAgICAgICAgIGF4aXNUaWNrOiB7IHNob3c6IHRydWUgfSxcbiAgICAgICAgICAgICAgYXhpc0xhYmVsOiB7IGZvcm1hdHRlcjogJ8Kje3ZhbHVlfScgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXJpZXM6IFtcbiAgICAgICAgICAgICAgeyB0eXBlOiAnYmFyJywgYmFyV2lkdGg6ICczMCUnLCBzdGFjazogJ2Z1bmRyYWlzaW5nJyB9LFxuICAgICAgICAgICAgICB7IHR5cGU6ICdiYXInLCBiYXJXaWR0aDogJzMwJScsIHN0YWNrOiAnZnVuZHJhaXNpbmcnIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uZ2V0RXZlbnRIYW5kbGVycyhkYXNoYm9hcmRNZXRyaWNzWzBdKSxcbiAgICAgICAgICBvbkNsaWNrOiAoeyBkYXRhLCBjaGFydCwgcGFyYW1zIH06IEV2ZW50T3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgaWYgKCFwYXJhbXMuZGF0YSkgcmV0dXJuO1xuICAgICAgICAgICAgY29uc3QgeyB5ZWFyOiB5IH0gPSBwYXJhbXMuZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IG1ldHJpY0RhdGEgPSAoZGF0YSBhcyBEYXNoYm9hcmREYXRhW10pLmZpbHRlcihcbiAgICAgICAgICAgICAgKHsgbWV0cmljLCB5ZWFyIH0pID0+IGRhc2hib2FyZE1ldHJpY3NbMF0uaW5jbHVkZXMobWV0cmljKSAmJiB5ID09PSB5ZWFyLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGNvbnN0IGRhdGFBZ2dyZWdhdGVGb3JNZXRyaWNZZWFyID0gbWV0cmljRGF0YS5yZWR1Y2U8RGFzaGJvYXJkRGF0YVtdPigocHJldiwgY3VycikgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjYXRlZ29yeU1ldHJpYyA9IGAke2Rhc2hib2FyZE1ldHJpY3NbMF19IC0gJHtjdXJyLmNhdGVnb3J5LnRyaW0oKX1gO1xuICAgICAgICAgICAgICBpZiAoIXByZXYuZmluZCgoaXRlbSkgPT4gaXRlbS5tZXRyaWMgPT09IGNhdGVnb3J5TWV0cmljKSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1ldHJpY0RhdGFGb3JZZWFyID0gbWV0cmljRGF0YS5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAoeyBtZXRyaWMsIHF1YXJ0ZXIsIGNhdGVnb3J5IH0pID0+XG4gICAgICAgICAgICAgICAgICAgIG1ldHJpYyA9PT0gY3Vyci5tZXRyaWMgJiYgcXVhcnRlciA9PT0gY3Vyci5xdWFydGVyICYmIGNhdGVnb3J5ID09PSBjdXJyLmNhdGVnb3J5LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3Qgc3VtID0gbWV0cmljRGF0YUZvclllYXIucmVkdWNlKChjdXJyZW50U3VtLCBjdXJyKSA9PiBjdXJyZW50U3VtICsgY3Vyci52YWx1ZSwgMCk7XG4gICAgICAgICAgICAgICAgcHJldi5wdXNoKHsgLi4uY3VyciwgbWV0cmljOiBjYXRlZ29yeU1ldHJpYywgdmFsdWU6IHN1bSB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwcmV2LnB1c2goeyAuLi5jdXJyLCBtZXRyaWM6IGNhdGVnb3J5TWV0cmljIH0pO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgcmV0dXJuIHByZXY7XG4gICAgICAgICAgICB9LCBbXSk7XG4gICAgICAgICAgICBjb25zdCBzb3VyY2UgPSBnZW5lcmF0ZU9iamVjdERhdGFzZXQoZGF0YUFnZ3JlZ2F0ZUZvck1ldHJpY1llYXIpO1xuICAgICAgICAgICAgYWRkQ2hhcnRSZXZlcnNlTGlzdGVuZXIoY2hhcnQpO1xuXG4gICAgICAgICAgICBjaGFydC5zZXRPcHRpb24oe1xuICAgICAgICAgICAgICBkYXRhc2V0OiB7XG4gICAgICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgICAgIGRpbWVuc2lvbnM6IFtcbiAgICAgICAgICAgICAgICAgICdxdWFydGVyJyxcbiAgICAgICAgICAgICAgICAgIGAke2Rhc2hib2FyZE1ldHJpY3NbMF0gYXMgc3RyaW5nfSAtIENvbnRyYWN0c2AsXG4gICAgICAgICAgICAgICAgICBgJHtkYXNoYm9hcmRNZXRyaWNzWzBdIGFzIHN0cmluZ30gLSBHcmFudHNgLFxuICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgaWQ6ICcwJyxcbiAgICBjb2x1bW5zOiAxLFxuICAgIGNsYXNzTmFtZTogJ3B0LTIwJyxcbiAgICBjb250ZW50OiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnY29udHJhY3RzJyxcbiAgICAgICAgbWV0YTogJ0NvbnRyYWN0cycsXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG4gIHtcbiAgICBpZDogJzInLFxuICAgIGNvbHVtbnM6IDIsXG4gICAgY29udGVudDogW1xuICAgICAge1xuICAgICAgICBpZDogJ2NvbnRyYWN0LXdlaWdodGVkJyxcbiAgICAgICAgbWV0YTogZGFzaGJvYXJkTWV0cmljc1sxXSxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGRhdGE6IChkYXRhOiBEYXNoYm9hcmREYXRhW10pOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdFRleHQ+W10gPT5cbiAgICAgICAgICAgIGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlKGRhdGEsIEFycmF5PHN0cmluZz4oKS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1sxXSkpLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvdXJzLFxuICAgICAgICAgICAgdG9vbHRpcDogeyBzaG93OiB0cnVlLCB0cmlnZ2VyOiAnaXRlbScsIGZvcm1hdHRlcjogdG9vdGlwRm9ybWF0dGVyKHsgY3VycmVuY3k6IHRydWUgfSkgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgZGF0YXNldDogeyBkaW1lbnNpb25zOiBbJ3llYXInXS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1sxXSkgfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB0b29sYm94OiB7IGZlYXR1cmU6IHsgc2F2ZUFzSW1hZ2U6IHt9IH0gfSxcbiAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNob3c6IHRydWUsIHNwbGl0TnVtYmVyOiAzLCBheGlzTGFiZWw6IHsgZm9ybWF0dGVyOiAnwqN7dmFsdWV9JyB9IH0sXG4gICAgICAgICAgICBzZXJpZXM6IFt7IHR5cGU6ICdiYXInIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uZ2V0RXZlbnRIYW5kbGVycyhkYXNoYm9hcmRNZXRyaWNzWzFdKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnaW5jb21lLXNlY3VyZWQnLFxuICAgICAgICBtZXRhOiAnSW5jb21lIFNlY3VyZWQgRnJvbSBDb250cmFjdHMgKFRhcmdldCDCozEuMk0pJyxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGRhdGE6IChkYXRhOiBEYXNoYm9hcmREYXRhW10pOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdFRleHQ+W10gPT4ge1xuICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnlNZXRyaWMgPSAnQ29udHJhY3RzJztcbiAgICAgICAgICAgIGNvbnN0IG1ldHJpY0RhdGEgPSBkYXRhLmZpbHRlcihcbiAgICAgICAgICAgICAgKHsgbWV0cmljLCBjYXRlZ29yeSB9KSA9PiBkYXNoYm9hcmRNZXRyaWNzWzBdLmluY2x1ZGVzKG1ldHJpYykgJiYgY2F0ZWdvcnkgPT09IGNhdGVnb3J5TWV0cmljLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlKG1ldHJpY0RhdGEsIEFycmF5PHN0cmluZz4oKS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1swXSkpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHNob3c6IHRydWUsIHRyaWdnZXI6ICdpdGVtJywgZm9ybWF0dGVyOiB0b290aXBGb3JtYXR0ZXIoeyBjdXJyZW5jeTogdHJ1ZSB9KSB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhciddLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzBdKSB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgZmVhdHVyZTogeyBzYXZlQXNJbWFnZToge30gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc2hvdzogdHJ1ZSwgc3BsaXROdW1iZXI6IDMsIGF4aXNMYWJlbDogeyBmb3JtYXR0ZXI6ICfCo3t2YWx1ZX0nIH0gfSxcbiAgICAgICAgICAgIHNlcmllczogW3sgdHlwZTogJ2JhcicgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbMF0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuICB7XG4gICAgaWQ6ICczJyxcbiAgICBjb2x1bW5zOiAxLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdncmFudHMnLFxuICAgICAgICBtZXRhOiAnR3JhbnRzJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbiAge1xuICAgIGlkOiAnNCcsXG4gICAgY29sdW1uczogMixcbiAgICBjb250ZW50OiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnaW5jb21lLXNlY3VyZWQnLFxuICAgICAgICBtZXRhOiAnSW5jb21lIFNlY3VyZWQgRnJvbSBHcmFudHMgKFRhcmdldCDCozIuNW0pJyxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGRhdGE6IChkYXRhOiBEYXNoYm9hcmREYXRhW10pOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdFRleHQ+W10gPT4ge1xuICAgICAgICAgICAgY29uc3QgY2F0ZWdvcnlNZXRyaWMgPSAnR3JhbnRzJztcbiAgICAgICAgICAgIGNvbnN0IG1ldHJpY0RhdGEgPSBkYXRhLmZpbHRlcihcbiAgICAgICAgICAgICAgKHsgbWV0cmljLCBjYXRlZ29yeSB9KSA9PiBkYXNoYm9hcmRNZXRyaWNzWzBdLmluY2x1ZGVzKG1ldHJpYykgJiYgY2F0ZWdvcnkgPT09IGNhdGVnb3J5TWV0cmljLFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgcmV0dXJuIGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlKG1ldHJpY0RhdGEsIEFycmF5PHN0cmluZz4oKS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1swXSkpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHNob3c6IHRydWUsIHRyaWdnZXI6ICdpdGVtJywgZm9ybWF0dGVyOiB0b290aXBGb3JtYXR0ZXIoeyBjdXJyZW5jeTogdHJ1ZSB9KSB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhciddLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzBdKSB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgZmVhdHVyZTogeyBzYXZlQXNJbWFnZToge30gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc2hvdzogdHJ1ZSwgc3BsaXROdW1iZXI6IDMsIGF4aXNMYWJlbDogeyBmb3JtYXR0ZXI6ICfCo3t2YWx1ZX0nIH0gfSxcbiAgICAgICAgICAgIHNlcmllczogW3sgdHlwZTogJ2JhcicgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbMF0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdncmFudC1pbmNvbWUnLFxuICAgICAgICBtZXRhOiAnSW5jb21lIGF0IDkwJSBhdCBlbmQgb2YgcXVhcnRlcicsXG4gICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+XG4gICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBBcnJheTxzdHJpbmc+KCkuY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbMl0pKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgc2hvdzogdHJ1ZSwgdHJpZ2dlcjogJ2l0ZW0nLCBmb3JtYXR0ZXI6IHRvb3RpcEZvcm1hdHRlcih7IGN1cnJlbmN5OiB0cnVlIH0pIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgc2hvdzogZmFsc2UgfSxcbiAgICAgICAgICAgIGRhdGFzZXQ6IHsgZGltZW5zaW9uczogWyd5ZWFyJ10uY29uY2F0KGRhc2hib2FyZE1ldHJpY3NbMl0pIH0sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgdG9vbGJveDogeyBmZWF0dXJlOiB7IHNhdmVBc0ltYWdlOiB7fSB9IH0sXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzaG93OiB0cnVlLCBzcGxpdE51bWJlcjogMywgYXhpc0xhYmVsOiB7IGZvcm1hdHRlcjogJ8Kje3ZhbHVlfScgfSB9LFxuICAgICAgICAgICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJyB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLmdldEV2ZW50SGFuZGxlcnMoZGFzaGJvYXJkTWV0cmljc1syXSksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3dlaWdodGVkLXZhbHVlJyxcbiAgICAgICAgbWV0YTogZGFzaGJvYXJkTWV0cmljc1szXSxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGRhdGE6IChkYXRhOiBEYXNoYm9hcmREYXRhW10pOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdFRleHQ+W10gPT5cbiAgICAgICAgICAgIGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlKGRhdGEsIEFycmF5PHN0cmluZz4oKS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1szXSkpLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvdXJzLFxuICAgICAgICAgICAgdG9vbHRpcDogeyBzaG93OiB0cnVlLCB0cmlnZ2VyOiAnaXRlbScsIGZvcm1hdHRlcjogdG9vdGlwRm9ybWF0dGVyKHsgY3VycmVuY3k6IHRydWUgfSkgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgZGF0YXNldDogeyBkaW1lbnNpb25zOiBbJ3llYXInXS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1szXSkgfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB0b29sYm94OiB7IGZlYXR1cmU6IHsgc2F2ZUFzSW1hZ2U6IHt9IH0gfSxcbiAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNob3c6IHRydWUsIHNwbGl0TnVtYmVyOiAzLCBheGlzTGFiZWw6IHsgZm9ybWF0dGVyOiAnwqN7dmFsdWV9JyB9IH0sXG4gICAgICAgICAgICBzZXJpZXM6IFt7IHR5cGU6ICdiYXInIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uZ2V0RXZlbnRIYW5kbGVycyhkYXNoYm9hcmRNZXRyaWNzWzNdKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnc3BlY3VsYXRpdmUtcGlsZWxpbmUtdmFsdWUnLFxuICAgICAgICBtZXRhOiBkYXNoYm9hcmRNZXRyaWNzWzRdLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgQXJyYXk8c3RyaW5nPigpLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzRdKSksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHNob3c6IHRydWUsIHRyaWdnZXI6ICdpdGVtJywgZm9ybWF0dGVyOiB0b290aXBGb3JtYXR0ZXIoeyBjdXJyZW5jeTogdHJ1ZSB9KSB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhciddLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzRdKSB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgZmVhdHVyZTogeyBzYXZlQXNJbWFnZToge30gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc2hvdzogdHJ1ZSwgc3BsaXROdW1iZXI6IDMsIGF4aXNMYWJlbDogeyBmb3JtYXR0ZXI6ICfCo3t2YWx1ZX0nIH0gfSxcbiAgICAgICAgICAgIHNlcmllczogW3sgdHlwZTogJ2JhcicgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbNF0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICBdLFxuICB9LFxuXTtcbiIsImltcG9ydCB7IGZ1bGxNb250aHMsIGdlbmVyYXRlT2JqZWN0RGF0YXNldCwgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UgfSBmcm9tICcuLi8nO1xuaW1wb3J0IHsgRGFzaGJvYXJkQ29udGVudCwgRGFzaGJvYXJkRGF0YSwgRGFzaGJvYXJkR3JpZCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzJztcbmltcG9ydCB7IGdldEJhckxhYmVsQ29uZmlnLCBnZXRFdmVudEhhbmRsZXJzLCBncmlkIH0gZnJvbSAnLi4vY2hhcnQnO1xuXG5jb25zdCBjb2xvdXJzID0gWycjMGM0NTdiJywgJyMwMDcxYjEnLCAnIzQzOTdkMycsICcjMDA1MzhlJywgJyM4OGJhZTUnLCAnIzAwODljYyddOyAvLyBzaGFkZXMgb2YgYmx1ZVxuY29uc3QgZGFzaGJvYXJkTWV0cmljcyA9IFtcbiAgWydUb3RhbCBTdGFmZicsICdUb3RhbCBsZWF2ZXJzIGluIHRoZSBwZXJpb2QgKFZvbHVudGFyeSknLCAnVG90YWwgbGVhdmVycyBpbiB0aGUgcGVyaW9kIChQbGFubmVkKSddLFxuICAnU3RhZmZpbmcgYWdhaW5zdCBidWRnZXQnLFxuICAnU3RhZmZpbmcgYnVkZ2V0IGFzIGEgJWFnZSBvZiBvcmcgYnVkZ2V0ICg2NSUgY2VpbGluZyknLFxuICAnU3RhYmlsaXR5IEluZGV4Jyxcbl07XG5cbmV4cG9ydCBjb25zdCBocjogRGFzaGJvYXJkR3JpZFtdID0gW1xuICB7XG4gICAgaWQ6ICcxJyxcbiAgICBjb2x1bW5zOiAyLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdzdGFmZicsXG4gICAgICAgIG1ldGE6ICdSYXRpbyBvZiBTdGFmZiB0byBMZWF2ZXJzJyxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGRhdGE6IChkYXRhOiBEYXNoYm9hcmREYXRhW10pOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdFRleHQ+W10gPT4ge1xuICAgICAgICAgICAgY29uc3QgbWV0cmljRGF0YSA9IGRhdGEuZmlsdGVyKCh7IG1ldHJpYyB9KSA9PiBkYXNoYm9hcmRNZXRyaWNzWzBdLmluY2x1ZGVzKG1ldHJpYykpO1xuXG4gICAgICAgICAgICBjb25zdCBkYXRhQWdncmVnYXRlRm9yTWV0cmljWWVhciA9IG1ldHJpY0RhdGEucmVkdWNlPERhc2hib2FyZERhdGFbXT4oKHByZXYsIGN1cnIpID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFwcmV2LmZpbmQoKGl0ZW0pID0+IGl0ZW0ubWV0cmljID09PSBjdXJyLm1ldHJpYyAmJiBpdGVtLnllYXIgPT09IGN1cnIueWVhcikpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtZXRyaWNEYXRhRm9yWWVhciA9IG1ldHJpY0RhdGEuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgKHsgbWV0cmljLCB5ZWFyIH0pID0+IG1ldHJpYyA9PT0gY3Vyci5tZXRyaWMgJiYgeWVhciA9PT0gY3Vyci55ZWFyLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKGN1cnIubWV0cmljID09PSAnVG90YWwgU3RhZmYnKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBtYXggPSBNYXRoLm1heCguLi5tZXRyaWNEYXRhRm9yWWVhci5tYXAoKGl0ZW0pID0+IGl0ZW0udmFsdWUpKTtcbiAgICAgICAgICAgICAgICAgIHByZXYucHVzaCh7IC4uLmN1cnIsIHZhbHVlOiBtYXggfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHN1bSA9IG1ldHJpY0RhdGFGb3JZZWFyLnJlZHVjZSgoY3VycmVudFN1bSwgY3VycikgPT4gY3VycmVudFN1bSArIGN1cnIudmFsdWUsIDApO1xuICAgICAgICAgICAgICAgICAgcHJldi5wdXNoKHsgLi4uY3VyciwgdmFsdWU6IHN1bSB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gcHJldjtcbiAgICAgICAgICAgIH0sIFtdKTtcblxuICAgICAgICAgICAgcmV0dXJuIGdlbmVyYXRlT2JqZWN0RGF0YXNldChkYXRhQWdncmVnYXRlRm9yTWV0cmljWWVhcik7XG4gICAgICAgICAgfSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgdHJpZ2dlcjogJ2F4aXMnIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhciddLmNvbmNhdChkYXNoYm9hcmRNZXRyaWNzWzBdKSB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgc2hvdzogdHJ1ZSwgZmVhdHVyZTogeyBzYXZlQXNJbWFnZTogeyBzaG93OiB0cnVlIH0gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc3BsaXROdW1iZXI6IDMgfSxcbiAgICAgICAgICAgIHNlcmllczogW1xuICAgICAgICAgICAgICB7IHR5cGU6ICdiYXInLCBzdGFjazogJ2hyJyB9LFxuICAgICAgICAgICAgICB7IHR5cGU6ICdiYXInLCBzdGFjazogJ2hyJyB9LFxuICAgICAgICAgICAgICB7IHR5cGU6ICdiYXInLCBzdGFjazogJ2hyJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLmdldEV2ZW50SGFuZGxlcnMoZGFzaGJvYXJkTWV0cmljc1swXSksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBpZDogJ3N0YWJpbGl0eScsXG4gICAgICAgIG1ldGE6ICdTdGFiaWxpdHkgSW5kZXgnLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgW2Rhc2hib2FyZE1ldHJpY3NbM10gYXMgc3RyaW5nXSksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHNob3c6IGZhbHNlLCB0cmlnZ2VyOiAnYXhpcycgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgZGF0YXNldDogeyBkaW1lbnNpb25zOiBbJ3llYXInXS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1szXSkgfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB0b29sYm94OiB7IGZlYXR1cmU6IHsgc2F2ZUFzSW1hZ2U6IHt9IH0gfSxcbiAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNob3c6IGZhbHNlLCBzcGxpdE51bWJlcjogMyB9LFxuICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuICAgICAgICAgICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJywgbGFiZWw6IGdldEJhckxhYmVsQ29uZmlnKHt9KSB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLmdldEV2ZW50SGFuZGxlcnMoZGFzaGJvYXJkTWV0cmljc1szXSksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgLi4uW1xuICAgICAgICB7IGlkOiAnZ2VuZGVyLXBheS1tZWFuJywgbWV0YTogJ0dlbmRlciBQYXkgR2FwIChNZWFuKSBVSycgfSxcbiAgICAgICAgeyBpZDogJ2dlbmRlci1wYXktbWVkaWFuJywgbWV0YTogJ0dlbmRlciBQYXkgR2FwIChNZWRpYW4pIFVLJyB9LFxuICAgICAgXS5tYXA8RGFzaGJvYXJkQ29udGVudD4oKHsgaWQsIG1ldGEgfSkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkOiBpZCxcbiAgICAgICAgICBtZXRhOiBtZXRhLFxuICAgICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgICBjaGFydDoge1xuICAgICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBbbWV0YV0pLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgICAgdG9vbHRpcDogeyB0cmlnZ2VyOiAnaXRlbScgfSxcbiAgICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICAgIGRhdGFzZXQ6IHsgZGltZW5zaW9uczogWyd5ZWFyJywgbWV0YV0gfSxcbiAgICAgICAgICAgICAgdG9vbGJveDogeyBzaG93OiB0cnVlLCBmZWF0dXJlOiB7IHNhdmVBc0ltYWdlOiB7IHNob3c6IHRydWUgfSB9IH0sXG4gICAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScsIHBvc2l0aW9uOiAndG9wJyB9LFxuICAgICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzY2FsZTogdHJ1ZSwgc3BsaXROdW1iZXI6IDEgfSxcbiAgICAgICAgICAgICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJywgbGFiZWw6IGdldEJhckxhYmVsQ29uZmlnKHsgcG9zaXRpb246ICdib3R0b20nIH0pIH1dLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC4uLmdldEV2ZW50SGFuZGxlcnMobWV0YSksXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0pLFxuICAgICAge1xuICAgICAgICBpZDogJ3N0YWZmaW5nLWJ1ZGdldCcsXG4gICAgICAgIG1ldGE6ICdTdGFmZmluZyBhZ2FpbnN0IGJ1ZGdldCcsXG4gICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+XG4gICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBbZGFzaGJvYXJkTWV0cmljc1sxXSBhcyBzdHJpbmddKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgc2hvdzogdHJ1ZSwgdHJpZ2dlcjogJ2F4aXMnIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgc2hvdzogdHJ1ZSB9LFxuICAgICAgICAgICAgZGF0YXNldDogeyBkaW1lbnNpb25zOiBbJ3llYXInXS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1sxXSwgJ1RhcmdldCcpIH0sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgdG9vbGJveDogeyBmZWF0dXJlOiB7IHNhdmVBc0ltYWdlOiB7fSB9IH0sXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzaG93OiBmYWxzZSwgc3BsaXROdW1iZXI6IDMgfSxcbiAgICAgICAgICAgIHNlcmllczogW1xuICAgICAgICAgICAgICB7IHR5cGU6ICdiYXInLCBsYWJlbDogZ2V0QmFyTGFiZWxDb25maWcoeyBjdXJyZW5jeTogdHJ1ZSwgc3VmZml4OiAnbScgfSksIGJhckdhcDogJy0xMDAlJyB9LFxuICAgICAgICAgICAgICB7IHR5cGU6ICdiYXInIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uZ2V0RXZlbnRIYW5kbGVycyhbZGFzaGJvYXJkTWV0cmljc1sxXSBhcyBzdHJpbmcsICdUYXJnZXQnXSwge1xuICAgICAgICAgICAgc2VyaWVzOiBbXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogJ2xpbmUnLFxuICAgICAgICAgICAgICAgIHN5bWJvbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgIGxpbmVTdHlsZTogeyB0eXBlOiAnZGFzaGVkJywgY29sb3I6ICcjMzMzJyB9LFxuICAgICAgICAgICAgICAgIGl0ZW1TdHlsZTogeyBjb2xvcjogJyMzMzMnIH0sXG4gICAgICAgICAgICAgICAgc2lsZW50OiB0cnVlLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAnc3RhZmZpbmctYnVkZ2V0LXZzLW9yZy1idWRnZXQnLFxuICAgICAgICBtZXRhOiAnU3RhZmZpbmcgYnVkZ2V0IGFzIGEgJWFnZSBvZiBvcmcgYnVkZ2V0ICg2NSUgY2VpbGluZyknLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PlxuICAgICAgICAgICAgZ2V0QWdncmVnYXRlZERhdGFzZXRTb3VyY2UoZGF0YSwgW2Rhc2hib2FyZE1ldHJpY3NbMl0gYXMgc3RyaW5nXSksXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHNob3c6IGZhbHNlLCB0cmlnZ2VyOiAnYXhpcycgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBzaG93OiBmYWxzZSB9LFxuICAgICAgICAgICAgZGF0YXNldDogeyBkaW1lbnNpb25zOiBbJ3llYXInXS5jb25jYXQoZGFzaGJvYXJkTWV0cmljc1syXSkgfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB0b29sYm94OiB7IGZlYXR1cmU6IHsgc2F2ZUFzSW1hZ2U6IHt9IH0gfSxcbiAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNob3c6IGZhbHNlLCBzcGxpdE51bWJlcjogMyB9LFxuICAgICAgICAgICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJywgbGFiZWw6IGdldEJhckxhYmVsQ29uZmlnKHsgc3VmZml4OiAnJScgfSkgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbMl0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdzaWNrLWRheXMnLFxuICAgICAgICBtZXRhOiAnVG90YWwgU2ljayBEYXlzJyxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGRhdGE6IChkYXRhOiBEYXNoYm9hcmREYXRhW10pOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdFRleHQ+W10gPT4ge1xuICAgICAgICAgICAgY29uc3QgbW9udGhseURhdGEgPSBkYXRhLmZpbHRlcihcbiAgICAgICAgICAgICAgKHsgbWV0cmljLCBxdWFydGVyIH0pID0+IG1ldHJpYyA9PT0gJ1RvdGFsIFNpY2sgRGF5cycgJiYgZnVsbE1vbnRocy5pbmNsdWRlcyhxdWFydGVyKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShtb250aGx5RGF0YSwgWydUb3RhbCBTaWNrIERheXMnXSwgJ3N1bScsICdtb250aCcpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHRyaWdnZXI6ICdpdGVtJyB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhcicsICdUb3RhbCBTaWNrIERheXMnXSB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgc2hvdzogdHJ1ZSwgZmVhdHVyZTogeyBzYXZlQXNJbWFnZTogeyBzaG93OiB0cnVlIH0gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JywgYXhpc1RpY2s6IHsgYWxpZ25XaXRoTGFiZWw6IHRydWUsIGludGVydmFsOiAxIH0gfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNwbGl0TnVtYmVyOiAzIH0sXG4gICAgICAgICAgICBzZXJpZXM6IFt7IHR5cGU6ICdiYXInLCBsYWJlbDogZ2V0QmFyTGFiZWxDb25maWcoe30pIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uZ2V0RXZlbnRIYW5kbGVycygnVG90YWwgU2ljayBEYXlzJywgeyB5QXhpczogeyBzaG93OiBmYWxzZSB9IH0sICdtb250aCcpLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdzaWNrLWRheXMtc3RhZmYnLFxuICAgICAgICBtZXRhOiAnTnVtYmVyIG9mIFN0YWZmIFdobyBsb2dnZWQgU2ljayBkYXlzIHBlciBwZXJpb2Qgb2Ygc2lja25lc3MnLFxuICAgICAgICBzdHlsZWQ6IHRydWUsXG4gICAgICAgIGNoYXJ0OiB7XG4gICAgICAgICAgZGF0YTogKGRhdGE6IERhc2hib2FyZERhdGFbXSk6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PiB7XG4gICAgICAgICAgICBjb25zdCBtb250aGx5RGF0YSA9IGRhdGEuZmlsdGVyKFxuICAgICAgICAgICAgICAoeyBtZXRyaWMsIHF1YXJ0ZXIgfSkgPT5cbiAgICAgICAgICAgICAgICBtZXRyaWMgPT09ICdOby4gU3RhZmYgTG9nZ2VkIFNpY2sgZGF5cy8gcGVyaW9kcyBvZiBzaWNrbmVzcycgJiYgZnVsbE1vbnRocy5pbmNsdWRlcyhxdWFydGVyKSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHJldHVybiBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShcbiAgICAgICAgICAgICAgbW9udGhseURhdGEsXG4gICAgICAgICAgICAgIFsnTm8uIFN0YWZmIExvZ2dlZCBTaWNrIGRheXMvIHBlcmlvZHMgb2Ygc2lja25lc3MnXSxcbiAgICAgICAgICAgICAgJ3N1bScsXG4gICAgICAgICAgICAgICdtb250aCcsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgY29sb3I6IGNvbG91cnMsXG4gICAgICAgICAgICB0b29sdGlwOiB7IHRyaWdnZXI6ICdpdGVtJyB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhcicsICdOby4gU3RhZmYgTG9nZ2VkIFNpY2sgZGF5cy8gcGVyaW9kcyBvZiBzaWNrbmVzcyddIH0sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgdG9vbGJveDogeyBzaG93OiB0cnVlLCBmZWF0dXJlOiB7IHNhdmVBc0ltYWdlOiB7IHNob3c6IHRydWUgfSB9IH0sXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknLCBheGlzVGljazogeyBhbGlnbldpdGhMYWJlbDogdHJ1ZSwgaW50ZXJ2YWw6IDEgfSB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc3BsaXROdW1iZXI6IDMgfSxcbiAgICAgICAgICAgIHNlcmllczogW3sgdHlwZTogJ2JhcicsIGxhYmVsOiBnZXRCYXJMYWJlbENvbmZpZyh7fSkgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKCdOby4gU3RhZmYgTG9nZ2VkIFNpY2sgZGF5cy8gcGVyaW9kcyBvZiBzaWNrbmVzcycsIHsgeUF4aXM6IHsgc2hvdzogZmFsc2UgfSB9LCAnbW9udGgnKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSxcbl07XG4iLCJleHBvcnQgKiBmcm9tICcuL2ZpbmFuY2UnO1xuZXhwb3J0ICogZnJvbSAnLi9ocic7XG5leHBvcnQgKiBmcm9tICcuL3BtJztcbmV4cG9ydCAqIGZyb20gJy4vY29tbXMnO1xuZXhwb3J0ICogZnJvbSAnLi9mdW5kcmFpc2luZyc7XG5leHBvcnQgKiBmcm9tICcuL2RhdGFTeXN0ZW1zJztcbiIsImltcG9ydCB7IGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlIH0gZnJvbSAnLi4nO1xuaW1wb3J0IHsgRGFzaGJvYXJkRGF0YSwgRGFzaGJvYXJkR3JpZCB9IGZyb20gJy4uLy4uLy4uL3V0aWxzL3R5cGVzJztcbmltcG9ydCB7IGdldEV2ZW50SGFuZGxlcnMsIGdyaWQgfSBmcm9tICcuLi9jaGFydCc7XG5cbmNvbnN0IGNvbG91cnMgPSBbJyMwNzQ4MmUnLCAnIzFlODI1OScsICcjMDA1YjNlJywgJyM1YWI4OGEnLCAnI2M1ZTFjYiddO1xuY29uc3QgZGFzaGJvYXJkTWV0cmljcyA9IFtcbiAgJ1Jhbmtpbmcgb24gSUFUSSBkYXNoYm9hcmQgKHN1Z2dlc3QgbW92ZSBmcm9tIHRvcCAxMCUgdG8gdG9wIDUlKScsXG4gIFsnIyBhY3RpdmUgcHJvamVjdHMgRElQUicsICcjIGFjdGl2ZSBwcm9qZWN0cyBESUknXSxcbiAgW1xuICAgICdOdW1iZXIgb2YgcHJvamVjdHMgd2l0aCBPbiB0cmFjayBzdGF0dXMnLFxuICAgICdOdW1iZXIgb2YgcHJvamVjdHMgd2l0aCBXYXJuaW5nIHN0YXR1cycsXG4gICAgJ051bWJlciBvZiBwcm9qZWN0cyB3aXRoIEhpZ2ggcmlzayBzdGF0dXMnLFxuICBdLFxuICBbJyUgcHJvamVjdHMgb3ZlcnNwZW5kaW5nJywgJyUgcHJvamVjdHMgdW5kZXJzcGVuZGluZycsICclIHByb2plY3RzIG9uIHRyYWNrJ10sXG5dO1xuXG5leHBvcnQgY29uc3QgcHJvamVjdE1hbmFnZW1lbnQ6IERhc2hib2FyZEdyaWRbXSA9IFtcbiAge1xuICAgIGlkOiAnMScsXG4gICAgY29sdW1uczogMixcbiAgICBjb250ZW50OiBbXG4gICAgICB7XG4gICAgICAgIGlkOiAnaWF0aS1yYW5raW5nJyxcbiAgICAgICAgbWV0YTogZGFzaGJvYXJkTWV0cmljc1swXSBhcyBzdHJpbmcsXG4gICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+XG4gICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBbZGFzaGJvYXJkTWV0cmljc1swXSBhcyBzdHJpbmddKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgc2hvdzogZmFsc2UsIHRyaWdnZXI6ICdheGlzJyB9LFxuICAgICAgICAgICAgbGVnZW5kOiB7IHNob3c6IGZhbHNlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhcicsIGRhc2hib2FyZE1ldHJpY3NbMF0gYXMgc3RyaW5nXSB9LFxuICAgICAgICAgICAgZ3JpZCxcbiAgICAgICAgICAgIHRvb2xib3g6IHsgZmVhdHVyZTogeyBzYXZlQXNJbWFnZToge30gfSB9LFxuICAgICAgICAgICAgeEF4aXM6IHsgdHlwZTogJ2NhdGVnb3J5JyB9LFxuICAgICAgICAgICAgeUF4aXM6IHsgdHlwZTogJ3ZhbHVlJywgc2hvdzogZmFsc2UsIHNwbGl0TnVtYmVyOiAzIH0sXG4gICAgICAgICAgICBzZXJpZXM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdiYXInLFxuICAgICAgICAgICAgICAgIGxhYmVsOiB7XG4gICAgICAgICAgICAgICAgICBzaG93OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgcG9zaXRpb246ICd0b3AnLFxuICAgICAgICAgICAgICAgICAgLyogZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cbiAgICAgICAgICAgICAgICAgIGZvcm1hdHRlcjogKHBhcmFtczogYW55KTogc3RyaW5nID0+IGAke3BhcmFtcy52YWx1ZVtwYXJhbXMuZGltZW5zaW9uTmFtZXNbcGFyYW1zLmVuY29kZS55WzBdXV19JWAsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbMF0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdhY3RpdmUtcHJvamVjdHMnLFxuICAgICAgICBtZXRhOiAnQWN0aXZlIFByb2plY3RzIERJUFIgdnMgRElJJyxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGRhdGE6IChkYXRhOiBEYXNoYm9hcmREYXRhW10pOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdFRleHQ+W10gPT5cbiAgICAgICAgICAgIGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlKGRhdGEsIGRhc2hib2FyZE1ldHJpY3NbMV0gYXMgc3RyaW5nW10pLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvdXJzLFxuICAgICAgICAgICAgdG9vbHRpcDogeyBzaG93OiB0cnVlLCB0cmlnZ2VyOiAnYXhpcycgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBzaG93OiB0cnVlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhcicsIC4uLihkYXNoYm9hcmRNZXRyaWNzWzFdIGFzIHN0cmluZ1tdKV0gfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB0b29sYm94OiB7IGZlYXR1cmU6IHsgc2F2ZUFzSW1hZ2U6IHt9IH0gfSxcbiAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNob3c6IHRydWUsIHNwbGl0TnVtYmVyOiAzIH0sXG4gICAgICAgICAgICBzZXJpZXM6IFt7IHR5cGU6ICdiYXInIH0sIHsgdHlwZTogJ2JhcicgfV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICAuLi5nZXRFdmVudEhhbmRsZXJzKGRhc2hib2FyZE1ldHJpY3NbMV0pLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgaWQ6ICdwcm9qZWN0LXN0YXR1cycsXG4gICAgICAgIG1ldGE6ICdQcm9qZWN0IFN0YXR1cycsXG4gICAgICAgIHN0eWxlZDogdHJ1ZSxcbiAgICAgICAgY2hhcnQ6IHtcbiAgICAgICAgICBkYXRhOiAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+XG4gICAgICAgICAgICBnZXRBZ2dyZWdhdGVkRGF0YXNldFNvdXJjZShkYXRhLCBkYXNoYm9hcmRNZXRyaWNzWzJdIGFzIHN0cmluZ1tdKSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBjb2xvcjogY29sb3VycyxcbiAgICAgICAgICAgIHRvb2x0aXA6IHsgc2hvdzogdHJ1ZSwgdHJpZ2dlcjogJ2F4aXMnIH0sXG4gICAgICAgICAgICBsZWdlbmQ6IHsgc2hvdzogdHJ1ZSB9LFxuICAgICAgICAgICAgZGF0YXNldDogeyBkaW1lbnNpb25zOiBbJ3llYXInLCAuLi4oZGFzaGJvYXJkTWV0cmljc1syXSBhcyBzdHJpbmdbXSldIH0sXG4gICAgICAgICAgICBncmlkLFxuICAgICAgICAgICAgdG9vbGJveDogeyBmZWF0dXJlOiB7IHNhdmVBc0ltYWdlOiB7fSB9IH0sXG4gICAgICAgICAgICB4QXhpczogeyB0eXBlOiAnY2F0ZWdvcnknIH0sXG4gICAgICAgICAgICB5QXhpczogeyB0eXBlOiAndmFsdWUnLCBzaG93OiB0cnVlLCBzcGxpdE51bWJlcjogMyB9LFxuICAgICAgICAgICAgc2VyaWVzOiBbeyB0eXBlOiAnYmFyJyB9LCB7IHR5cGU6ICdiYXInIH1dLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgLi4uZ2V0RXZlbnRIYW5kbGVycyhkYXNoYm9hcmRNZXRyaWNzWzJdKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIGlkOiAncHJvamVjdC1zcGVuZGluZycsXG4gICAgICAgIG1ldGE6ICdQcm9qZWN0IFNwZW5kaW5nJyxcbiAgICAgICAgc3R5bGVkOiB0cnVlLFxuICAgICAgICBjaGFydDoge1xuICAgICAgICAgIGRhdGE6IChkYXRhOiBEYXNoYm9hcmREYXRhW10pOiBSZWNvcmQ8c3RyaW5nLCBSZWFjdC5SZWFjdFRleHQ+W10gPT5cbiAgICAgICAgICAgIGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlKGRhdGEsIGRhc2hib2FyZE1ldHJpY3NbM10gYXMgc3RyaW5nW10pLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvdXJzLFxuICAgICAgICAgICAgdG9vbHRpcDogeyBzaG93OiB0cnVlLCB0cmlnZ2VyOiAnYXhpcycgfSxcbiAgICAgICAgICAgIGxlZ2VuZDogeyBzaG93OiB0cnVlIH0sXG4gICAgICAgICAgICBkYXRhc2V0OiB7IGRpbWVuc2lvbnM6IFsneWVhcicsIC4uLihkYXNoYm9hcmRNZXRyaWNzWzNdIGFzIHN0cmluZ1tdKV0gfSxcbiAgICAgICAgICAgIGdyaWQsXG4gICAgICAgICAgICB0b29sYm94OiB7IGZlYXR1cmU6IHsgc2F2ZUFzSW1hZ2U6IHt9IH0gfSxcbiAgICAgICAgICAgIHhBeGlzOiB7IHR5cGU6ICdjYXRlZ29yeScgfSxcbiAgICAgICAgICAgIHlBeGlzOiB7IHR5cGU6ICd2YWx1ZScsIHNob3c6IHRydWUsIHNwbGl0TnVtYmVyOiAzLCBheGlzTGFiZWw6IHsgZm9ybWF0dGVyOiAne3ZhbHVlfSUnIH0gfSxcbiAgICAgICAgICAgIHNlcmllczogW3sgdHlwZTogJ2JhcicgfSwgeyB0eXBlOiAnYmFyJyB9XSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIC4uLmdldEV2ZW50SGFuZGxlcnMoZGFzaGJvYXJkTWV0cmljc1szXSksXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIF0sXG4gIH0sXG5dO1xuIiwiaW1wb3J0IHsgRGFzaGJvYXJkRGF0YSwgRGFzaGJvYXJkRmlsdGVycyB9IGZyb20gJy4uLy4uL3V0aWxzL3R5cGVzJztcblxuZXhwb3J0IHR5cGUgRGF0ZURpdmlzaW9uID0gJ21vbnRoJyB8ICdxdWFydGVyJzsgLy8gZGV0ZXJtaW5lcyB3aGV0aGVyIHRvIHNwbGl0IHgtYXhpcyBkYXRlcyBieSBtb250aCBvciBxdWFydGVyXG5leHBvcnQgY29uc3QgZnVsbE1vbnRocyA9IFtcbiAgJ0phbnVhcnknLFxuICAnRmVicnVhcnknLFxuICAnTWFyY2gnLFxuICAnQXByaWwnLFxuICAnTWF5JyxcbiAgJ0p1bmUnLFxuICAnSnVseScsXG4gICdBdWd1c3QnLFxuICAnU2VwdGVtYmVyJyxcbiAgJ09jdG9iZXInLFxuICAnTm92ZW1iZXInLFxuICAnRGVjZW1iZXInLFxuXTtcbmNvbnN0IG1vbnRocyA9IFsnSmFuJywgJ0ZlYicsICdNYXInLCAnQXByJywgJ01heScsICdKdW5lJywgJ0p1bHknLCAnQXVnJywgJ1NlcHQnLCAnT2N0JywgJ05vdicsICdEZWMnXTtcblxuZXhwb3J0IGNvbnN0IGdldFF1YXJ0ZXJZZWFyID0gKGRhdGVTdHJpbmc6IHN0cmluZyk6IFtudW1iZXIsIG51bWJlcl0gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcbiAgICBjb25zdCBxdWFydGVyID0gTWF0aC5mbG9vcigoZGF0ZS5nZXRNb250aCgpICsgMykgLyAzKTtcblxuICAgIHJldHVybiBbcXVhcnRlciwgZGF0ZS5nZXRGdWxsWWVhcigpXTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gWzAsIDBdO1xuICB9XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0TW9udGhZZWFyID0gKGRhdGVTdHJpbmc6IHN0cmluZyk6IFtzdHJpbmcsIG51bWJlcl0gPT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZShkYXRlU3RyaW5nKTtcblxuICAgIHJldHVybiBbbW9udGhzW2RhdGUuZ2V0TW9udGgoKV0sIGRhdGUuZ2V0RnVsbFllYXIoKV07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIFsnJywgMF07XG4gIH1cbn07XG5cbmNvbnN0IGdldEFubnVhbFRhcmdldEZyb21EYXRhID0gKGRhdGE6IERhc2hib2FyZERhdGFbXSwgbWV0cmljOiBzdHJpbmcsIGRhdGU6IHN0cmluZyk6IG51bWJlciB8IG51bGwgPT4ge1xuICBjb25zdCB5ZWFyID0gbmV3IERhdGUoZGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgY29uc3QgYW5udWFsRGF0YSA9IGRhdGEuZmluZCgoaXRlbSkgPT4gbWV0cmljID09PSBpdGVtLm1ldHJpYyAmJiBpdGVtLnllYXIgPT09IHllYXIgJiYgaXRlbS5xdWFydGVyID09PSAnQW5udWFsJyk7XG5cbiAgcmV0dXJuIChhbm51YWxEYXRhICYmIGFubnVhbERhdGEudGFyZ2V0KSB8fCBudWxsO1xufTtcblxuZXhwb3J0IGNvbnN0IGdlbmVyYXRlT2JqZWN0RGF0YXNldCA9IChcbiAgZGF0YTogRGFzaGJvYXJkRGF0YVtdLFxuICBkaXZpc2lvbjogRGF0ZURpdmlzaW9uID0gJ3F1YXJ0ZXInLCAvLyBkZXRlcm1pbmVzIHdoZXRoZXIgdG8gc3BsaXQgeC1heGlzIGRhdGVzIGJ5IG1vbnRoIG9yIHF1YXJ0ZXJcbik6IFJlY29yZDxzdHJpbmcsIFJlYWN0LlJlYWN0VGV4dD5bXSA9PiB7XG4gIC8vIGV4dHJhY3QgdW5pcXVlIG1ldHJpY3MgJiBkYXRlc1xuICBjb25zdCBtZXRyaWNzID0gWy4uLm5ldyBTZXQoZGF0YS5tYXAoKHsgbWV0cmljIH0pID0+IG1ldHJpYykpXTtcbiAgY29uc3QgZGF0ZXMgPSBbLi4ubmV3IFNldChkYXRhLm1hcCgoeyBkYXRlIH0pID0+IGRhdGUpKV0uc29ydCgpO1xuXG4gIHJldHVybiBkYXRlcy5yZWR1Y2U8UmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPltdPigocHJldiwgZGF0ZSkgPT4ge1xuICAgIGNvbnN0IFtxdWFydGVyTW9udGgsIHllYXJdID0gZGl2aXNpb24gPT09ICdxdWFydGVyJyA/IGdldFF1YXJ0ZXJZZWFyKGRhdGUpIDogZ2V0TW9udGhZZWFyKGRhdGUpO1xuICAgIGNvbnN0IHF1YXJ0ZXIgPSBkaXZpc2lvbiA9PT0gJ3F1YXJ0ZXInID8gYCR7eWVhcn0gUSR7cXVhcnRlck1vbnRofWAgOiBxdWFydGVyTW9udGg7XG4gICAgY29uc3QgbWF0Y2hpbmdEYXRhc2V0ID0gcHJldi5maW5kKChfZGF0YXNldCkgPT4gX2RhdGFzZXQucXVhcnRlciA9PT0gcXVhcnRlcik7XG4gICAgY29uc3QgZGF0YXNldDogUmVjb3JkPHN0cmluZywgc3RyaW5nIHwgbnVtYmVyPiA9IG1hdGNoaW5nRGF0YXNldCB8fCB7IHF1YXJ0ZXI6IHF1YXJ0ZXIsIHllYXIgfTtcblxuICAgIG1ldHJpY3MuZm9yRWFjaCgobWV0cmljKSA9PiB7XG4gICAgICBjb25zdCBtYXRjaGluZ0RhdGEgPSBkYXRhLmZpbmQoKGl0ZW0pID0+IGl0ZW0uZGF0ZSA9PT0gZGF0ZSAmJiBtZXRyaWMgPT09IGl0ZW0ubWV0cmljKTtcbiAgICAgIGlmIChtYXRjaGluZ0RhdGEpIHtcbiAgICAgICAgaWYgKG1hdGNoaW5nRGF0YXNldCkge1xuICAgICAgICAgIChkYXRhc2V0W21ldHJpY10gYXMgbnVtYmVyKSArPSBtYXRjaGluZ0RhdGEudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGF0YXNldFttZXRyaWNdID0gbWF0Y2hpbmdEYXRhLnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaGluZ0RhdGEudGFyZ2V0KSB7XG4gICAgICAgICAgZGF0YXNldFsnVGFyZ2V0J10gPSBtYXRjaGluZ0RhdGEudGFyZ2V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHRhcmdldCA9IGdldEFubnVhbFRhcmdldEZyb21EYXRhKGRhdGEsIG1ldHJpYywgZGF0ZSk7XG4gICAgICAgICAgaWYgKHRhcmdldCkge1xuICAgICAgICAgICAgZGF0YXNldFsnVGFyZ2V0J10gPSB0YXJnZXQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtYXRjaGluZ0RhdGEubmFycmF0aXZlKSB7XG4gICAgICAgICAgZGF0YXNldFtgJHttZXRyaWN9IC0gbmFycmF0aXZlYF0gPSBtYXRjaGluZ0RhdGEubmFycmF0aXZlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKCFtYXRjaGluZ0RhdGFzZXQpIHByZXYucHVzaChkYXRhc2V0KTtcblxuICAgIHJldHVybiBwcmV2O1xuICB9LCBbXSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2VuZXJhdGVBcnJheURhdGFzZXQgPSAoZGF0YTogRGFzaGJvYXJkRGF0YVtdKTogUmVhY3QuUmVhY3RUZXh0W11bXSA9PiB7XG4gIC8vIGV4dHJhY3QgdW5pcXVlIG1ldHJpY3MgJiBkYXRlc1xuICBjb25zdCBtZXRyaWNzID0gWy4uLm5ldyBTZXQoZGF0YS5tYXAoKHsgbWV0cmljIH0pID0+IG1ldHJpYykpXTtcbiAgY29uc3QgZGF0ZXMgPSBbLi4ubmV3IFNldChkYXRhLm1hcCgoeyBkYXRlIH0pID0+IGRhdGUpKV07XG5cbiAgY29uc3QgZGF0YXNldDogUmVhY3QuUmVhY3RUZXh0W11bXSA9IG1ldHJpY3MubWFwKChtZXRyaWMpID0+XG4gICAgbmV3IEFycmF5PFJlYWN0LlJlYWN0VGV4dD4obWV0cmljKS5jb25jYXQoXG4gICAgICBkYXRlcy5tYXAoKGRhdGUpID0+IHtcbiAgICAgICAgY29uc3QgbWF0Y2hpbmdEYXRhID0gZGF0YS5maW5kKChpdGVtKSA9PiBpdGVtLmRhdGUgPT09IGRhdGUgJiYgbWV0cmljID09PSBpdGVtLm1ldHJpYyk7XG5cbiAgICAgICAgcmV0dXJuIG1hdGNoaW5nRGF0YSA/IG1hdGNoaW5nRGF0YS52YWx1ZSA6IDA7XG4gICAgICB9KSxcbiAgICApLFxuICApO1xuXG4gIHJldHVybiBbXG4gICAgbmV3IEFycmF5PFJlYWN0LlJlYWN0VGV4dD4oJ21ldHJpYycpLmNvbmNhdChcbiAgICAgIGRhdGVzLm1hcCgoZGF0ZSkgPT4ge1xuICAgICAgICBjb25zdCBbcXVhcnRlciwgeWVhcl0gPSBnZXRRdWFydGVyWWVhcihkYXRlKTtcblxuICAgICAgICByZXR1cm4gYCR7eWVhcn0gUSR7cXVhcnRlcn1gO1xuICAgICAgfSksXG4gICAgKSxcbiAgXS5jb25jYXQoZGF0YXNldCk7XG59O1xuXG5leHBvcnQgY29uc3QgZmlsdGVyRGFzaGJvYXJkRGF0YSA9IChcbiAgZGF0YTogRGFzaGJvYXJkRGF0YVtdLFxuICB7IHllYXIsIHF1YXJ0ZXIsIGRlcGFydG1lbnQgfTogRGFzaGJvYXJkRmlsdGVycyxcbik6IERhc2hib2FyZERhdGFbXSA9PiB7XG4gIHJldHVybiBkYXRhXG4gICAgLmZpbHRlcigocm93KSA9PiAoZGVwYXJ0bWVudCA/IHJvdy5kZXBhcnRtZW50ID09PSBkZXBhcnRtZW50IDogdHJ1ZSkpXG4gICAgLmZpbHRlcigocm93KSA9PiB7XG4gICAgICBpZiAoeWVhciAmJiAhcXVhcnRlcikge1xuICAgICAgICByZXR1cm4gcm93LnllYXIgPT09IHllYXI7XG4gICAgICB9XG4gICAgICBpZiAocXVhcnRlciAmJiAheWVhcikge1xuICAgICAgICByZXR1cm4gcm93LnF1YXJ0ZXIgPT09IGBRJHtxdWFydGVyfWA7XG4gICAgICB9XG4gICAgICBpZiAoeWVhciAmJiBxdWFydGVyKSB7XG4gICAgICAgIHJldHVybiByb3cueWVhciA9PT0geWVhciAmJiByb3cucXVhcnRlciA9PT0gYFEke3F1YXJ0ZXJ9YDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSk7XG59O1xuXG5leHBvcnQgY29uc3QgdG9Qb3VuZHMgPSAodmFsdWU6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gIGNvbnN0IGZvcm1hdHRlciA9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgnZW4tVVMnLCB7IHN0eWxlOiAnY3VycmVuY3knLCBjdXJyZW5jeTogJ0dCUCcgfSk7XG5cbiAgcmV0dXJuIGZvcm1hdHRlci5mb3JtYXQodmFsdWUpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEFnZ3JlZ2F0ZWREYXRhc2V0U291cmNlID0gKFxuICBkYXRhOiBEYXNoYm9hcmREYXRhW10sXG4gIG1ldHJpY3M6IHN0cmluZ1tdLFxuICBhZ2dyZWdhdGlvbjogJ3N1bScgfCAnYXZlcmFnZScgPSAnYXZlcmFnZScsXG4gIGRpdmlzaW9uOiBEYXRlRGl2aXNpb24gPSAncXVhcnRlcicsIC8vIGRldGVybWluZXMgd2hldGhlciB0byBzcGxpdCB4LWF4aXMgZGF0ZXMgYnkgbW9udGggb3IgcXVhcnRlclxuKTogUmVjb3JkPHN0cmluZywgUmVhY3QuUmVhY3RUZXh0PltdID0+IHtcbiAgY29uc3QgbWV0cmljRGF0YSA9IGRhdGEuZmlsdGVyKCh7IG1ldHJpYyB9KSA9PiBtZXRyaWNzLmluY2x1ZGVzKG1ldHJpYykpO1xuXG4gIGNvbnN0IGRhdGFBZ2dyZWdhdGVGb3JNZXRyaWNZZWFyID0gbWV0cmljRGF0YS5yZWR1Y2U8RGFzaGJvYXJkRGF0YVtdPigocHJldiwgY3VycikgPT4ge1xuICAgIGlmICghcHJldi5maW5kKChpdGVtKSA9PiBpdGVtLm1ldHJpYyA9PT0gY3Vyci5tZXRyaWMgJiYgaXRlbS55ZWFyID09PSBjdXJyLnllYXIpKSB7XG4gICAgICBjb25zdCBtZXRyaWNEYXRhRm9yWWVhciA9IG1ldHJpY0RhdGEuZmlsdGVyKFxuICAgICAgICAoeyBtZXRyaWMsIHllYXIsIHZhbHVlIH0pID0+IG1ldHJpYyA9PT0gY3Vyci5tZXRyaWMgJiYgeWVhciA9PT0gY3Vyci55ZWFyICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicsXG4gICAgICApO1xuICAgICAgY29uc3Qgc3VtID0gbWV0cmljRGF0YUZvclllYXIucmVkdWNlKChjdXJyZW50U3VtLCBjdXJyKSA9PiBjdXJyZW50U3VtICsgY3Vyci52YWx1ZSwgMCk7XG4gICAgICBpZiAoYWdncmVnYXRpb24gPT09ICdhdmVyYWdlJykge1xuICAgICAgICBjb25zdCBhdmVyYWdlID0gc3VtIC8gbWV0cmljRGF0YUZvclllYXIubGVuZ3RoO1xuICAgICAgICBwcmV2LnB1c2goeyAuLi5jdXJyLCB2YWx1ZTogYXZlcmFnZSwgcXVhcnRlcjogJycsIG5hcnJhdGl2ZTogJycgfSk7IC8vIFRPRE86IGFkZCBhY3R1YWwgbmFycmF0aXZlcyBmb3IgeWVhclxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJldi5wdXNoKHsgLi4uY3VyciwgdmFsdWU6IHN1bSwgcXVhcnRlcjogJycsIG5hcnJhdGl2ZTogJycgfSk7IC8vIFRPRE86IGFkZCBhY3R1YWwgbmFycmF0aXZlcyBmb3IgeWVhclxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBwcmV2O1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIGdlbmVyYXRlT2JqZWN0RGF0YXNldChkYXRhQWdncmVnYXRlRm9yTWV0cmljWWVhciwgZGl2aXNpb24pO1xufTtcbiIsImltcG9ydCB7IEVDaGFydE9wdGlvbiB9IGZyb20gJ2VjaGFydHMnO1xuXG5leHBvcnQgY29uc3QgZGVmYXVsdE9wdGlvbnM6IEVDaGFydE9wdGlvbiA9IHtcbiAgbGVnZW5kOiB7XG4gICAgdG9wOiAxMCxcbiAgICB0ZXh0U3R5bGU6IHtcbiAgICAgIGZvbnRGYW1pbHk6ICdHZW9tYW5pc3QgUmVndWxhcixzYW5zLXNlcmlmJyxcbiAgICB9LFxuICB9LFxuICB0b29sdGlwOiB7XG4gICAgdHJpZ2dlcjogJ2F4aXMnLFxuICAgIHRleHRTdHlsZToge1xuICAgICAgZm9udEZhbWlseTogJ0dlb21hbmlzdCBSZWd1bGFyLHNhbnMtc2VyaWYnLFxuICAgIH0sXG4gIH0sXG4gIHRvb2xib3g6IHtcbiAgICBzaG93VGl0bGU6IGZhbHNlLFxuICAgIGZlYXR1cmU6IHtcbiAgICAgIHNhdmVBc0ltYWdlOiB7XG4gICAgICAgIHRpdGxlOiAnU2F2ZSBhcyBpbWFnZScsXG4gICAgICAgIHBpeGVsUmF0aW86IDIsXG4gICAgICB9LFxuICAgIH0sXG4gICAgcmlnaHQ6IDIwLFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIHNob3c6IHRydWUsXG4gICAgICB0ZXh0U3R5bGU6IHtcbiAgICAgICAgZm9udEZhbWlseTogJ0dlb21hbmlzdCBSZWd1bGFyLHNhbnMtc2VyaWYnLFxuICAgICAgICBmb3JtYXR0ZXI6IGZ1bmN0aW9uIChwYXJhbTogeyB0aXRsZTogc3RyaW5nIH0pIHtcbiAgICAgICAgICByZXR1cm4gYDxkaXY+JHtwYXJhbS50aXRsZX08L2Rpdj5gOyAvLyB1c2VyLWRlZmluZWQgRE9NIHN0cnVjdHVyZVxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICB4QXhpczoge1xuICAgIGF4aXNMYWJlbDoge1xuICAgICAgZm9udEZhbWlseTogJ0dlb21hbmlzdCBSZWd1bGFyLHNhbnMtc2VyaWYnLFxuICAgICAgZm9udFNpemU6IDEzLFxuICAgIH0sXG4gICAgc3BsaXRMaW5lOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICB9LFxuICB9LFxuICB5QXhpczoge1xuICAgIGF4aXNMYWJlbDoge1xuICAgICAgZm9udEZhbWlseTogJ0dlb21hbmlzdCBSZWd1bGFyLHNhbnMtc2VyaWYnLFxuICAgICAgZm9udFNpemU6IDEzLFxuICAgIH0sXG4gICAgc3BsaXRMaW5lOiB7XG4gICAgICBzaG93OiBmYWxzZSxcbiAgICB9LFxuICB9LFxufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=