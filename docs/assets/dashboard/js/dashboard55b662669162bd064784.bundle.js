(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_echarts_renderers_js"],{

/***/ "./node_modules/echarts/lib/export/renderers.js":
/*!******************************************************!*\
  !*** ./node_modules/echarts/lib/export/renderers.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SVGRenderer": () => (/* reexport safe */ _renderer_installSVGRenderer__WEBPACK_IMPORTED_MODULE_0__.install),
/* harmony export */   "CanvasRenderer": () => (/* reexport safe */ _renderer_installCanvasRenderer__WEBPACK_IMPORTED_MODULE_1__.install)
/* harmony export */ });
/* harmony import */ var _renderer_installSVGRenderer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../renderer/installSVGRenderer */ "./node_modules/echarts/lib/renderer/installSVGRenderer.js");
/* harmony import */ var _renderer_installCanvasRenderer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../renderer/installCanvasRenderer */ "./node_modules/echarts/lib/renderer/installCanvasRenderer.js");

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

/***/ "./node_modules/echarts/lib/renderer/installCanvasRenderer.js":
/*!********************************************************************!*\
  !*** ./node_modules/echarts/lib/renderer/installCanvasRenderer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "install": () => (/* binding */ install)
/* harmony export */ });
/* harmony import */ var zrender_lib_canvas_Painter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zrender/lib/canvas/Painter */ "./node_modules/zrender/lib/canvas/Painter.js");

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

function install(registers) {
  registers.registerPainter('canvas', zrender_lib_canvas_Painter__WEBPACK_IMPORTED_MODULE_0__.default);
}

/***/ }),

/***/ "./node_modules/echarts/lib/renderer/installSVGRenderer.js":
/*!*****************************************************************!*\
  !*** ./node_modules/echarts/lib/renderer/installSVGRenderer.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "install": () => (/* binding */ install)
/* harmony export */ });
/* harmony import */ var zrender_lib_svg_Painter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zrender/lib/svg/Painter */ "./node_modules/zrender/lib/svg/Painter.js");

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

function install(registers) {
  registers.registerPainter('svg', zrender_lib_svg_Painter__WEBPACK_IMPORTED_MODULE_0__.default);
}

/***/ }),

/***/ "./node_modules/echarts/renderers.js":
/*!*******************************************!*\
  !*** ./node_modules/echarts/renderers.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CanvasRenderer": () => (/* reexport safe */ _lib_export_renderers__WEBPACK_IMPORTED_MODULE_0__.CanvasRenderer),
/* harmony export */   "SVGRenderer": () => (/* reexport safe */ _lib_export_renderers__WEBPACK_IMPORTED_MODULE_0__.SVGRenderer)
/* harmony export */ });
/* harmony import */ var _lib_export_renderers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lib/export/renderers */ "./node_modules/echarts/lib/export/renderers.js");
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

/***/ "./node_modules/zrender/lib/canvas/Layer.js":
/*!**************************************************!*\
  !*** ./node_modules/zrender/lib/canvas/Layer.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../config */ "./node_modules/zrender/lib/config.js");
/* harmony import */ var _core_Eventful__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../core/Eventful */ "./node_modules/zrender/lib/core/Eventful.js");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Element */ "./node_modules/zrender/lib/Element.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./helper */ "./node_modules/zrender/lib/canvas/helper.js");
/* harmony import */ var _graphic__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./graphic */ "./node_modules/zrender/lib/canvas/graphic.js");
/* harmony import */ var _core_BoundingRect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/BoundingRect */ "./node_modules/zrender/lib/core/BoundingRect.js");








function returnFalse() {
    return false;
}
function createDom(id, painter, dpr) {
    var newDom = _core_util__WEBPACK_IMPORTED_MODULE_0__.createCanvas();
    var width = painter.getWidth();
    var height = painter.getHeight();
    var newDomStyle = newDom.style;
    if (newDomStyle) {
        newDomStyle.position = 'absolute';
        newDomStyle.left = '0';
        newDomStyle.top = '0';
        newDomStyle.width = width + 'px';
        newDomStyle.height = height + 'px';
        newDom.setAttribute('data-zr-dom-id', id);
    }
    newDom.width = width * dpr;
    newDom.height = height * dpr;
    return newDom;
}
;
var Layer = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(Layer, _super);
    function Layer(id, painter, dpr) {
        var _this = _super.call(this) || this;
        _this.motionBlur = false;
        _this.lastFrameAlpha = 0.7;
        _this.dpr = 1;
        _this.virtual = false;
        _this.config = {};
        _this.incremental = false;
        _this.zlevel = 0;
        _this.maxRepaintRectCount = 5;
        _this.__dirty = true;
        _this.__firstTimePaint = true;
        _this.__used = false;
        _this.__drawIndex = 0;
        _this.__startIndex = 0;
        _this.__endIndex = 0;
        _this.__prevStartIndex = null;
        _this.__prevEndIndex = null;
        var dom;
        dpr = dpr || _config__WEBPACK_IMPORTED_MODULE_2__.devicePixelRatio;
        if (typeof id === 'string') {
            dom = createDom(id, painter, dpr);
        }
        else if (_core_util__WEBPACK_IMPORTED_MODULE_0__.isObject(id)) {
            dom = id;
            id = dom.id;
        }
        _this.id = id;
        _this.dom = dom;
        var domStyle = dom.style;
        if (domStyle) {
            dom.onselectstart = returnFalse;
            domStyle.webkitUserSelect = 'none';
            domStyle.userSelect = 'none';
            domStyle.webkitTapHighlightColor = 'rgba(0,0,0,0)';
            domStyle['-webkit-touch-callout'] = 'none';
            domStyle.padding = '0';
            domStyle.margin = '0';
            domStyle.borderWidth = '0';
        }
        _this.domBack = null;
        _this.ctxBack = null;
        _this.painter = painter;
        _this.config = null;
        _this.dpr = dpr;
        return _this;
    }
    Layer.prototype.getElementCount = function () {
        return this.__endIndex - this.__startIndex;
    };
    Layer.prototype.afterBrush = function () {
        this.__prevStartIndex = this.__startIndex;
        this.__prevEndIndex = this.__endIndex;
    };
    Layer.prototype.initContext = function () {
        this.ctx = this.dom.getContext('2d');
        this.ctx.dpr = this.dpr;
    };
    Layer.prototype.setUnpainted = function () {
        this.__firstTimePaint = true;
    };
    Layer.prototype.createBackBuffer = function () {
        var dpr = this.dpr;
        this.domBack = createDom('back-' + this.id, this.painter, dpr);
        this.ctxBack = this.domBack.getContext('2d');
        if (dpr !== 1) {
            this.ctxBack.scale(dpr, dpr);
        }
    };
    Layer.prototype.createRepaintRects = function (displayList, prevList, viewWidth, viewHeight) {
        if (this.__firstTimePaint) {
            this.__firstTimePaint = false;
            return null;
        }
        var mergedRepaintRects = [];
        var maxRepaintRectCount = this.maxRepaintRectCount;
        var full = false;
        var pendingRect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_3__.default(0, 0, 0, 0);
        function addRectToMergePool(rect) {
            if (!rect.isFinite() || rect.isZero()) {
                return;
            }
            if (mergedRepaintRects.length === 0) {
                var boundingRect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_3__.default(0, 0, 0, 0);
                boundingRect.copy(rect);
                mergedRepaintRects.push(boundingRect);
            }
            else {
                var isMerged = false;
                var minDeltaArea = Infinity;
                var bestRectToMergeIdx = 0;
                for (var i = 0; i < mergedRepaintRects.length; ++i) {
                    var mergedRect = mergedRepaintRects[i];
                    if (mergedRect.intersect(rect)) {
                        var pendingRect_1 = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_3__.default(0, 0, 0, 0);
                        pendingRect_1.copy(mergedRect);
                        pendingRect_1.union(rect);
                        mergedRepaintRects[i] = pendingRect_1;
                        isMerged = true;
                        break;
                    }
                    else if (full) {
                        pendingRect.copy(rect);
                        pendingRect.union(mergedRect);
                        var aArea = rect.width * rect.height;
                        var bArea = mergedRect.width * mergedRect.height;
                        var pendingArea = pendingRect.width * pendingRect.height;
                        var deltaArea = pendingArea - aArea - bArea;
                        if (deltaArea < minDeltaArea) {
                            minDeltaArea = deltaArea;
                            bestRectToMergeIdx = i;
                        }
                    }
                }
                if (full) {
                    mergedRepaintRects[bestRectToMergeIdx].union(rect);
                    isMerged = true;
                }
                if (!isMerged) {
                    var boundingRect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_3__.default(0, 0, 0, 0);
                    boundingRect.copy(rect);
                    mergedRepaintRects.push(boundingRect);
                }
                if (!full) {
                    full = mergedRepaintRects.length >= maxRepaintRectCount;
                }
            }
        }
        for (var i = this.__startIndex; i < this.__endIndex; ++i) {
            var el = displayList[i];
            if (el) {
                var shouldPaint = el.shouldBePainted(viewWidth, viewHeight, true, true);
                var prevRect = el.__isRendered && ((el.__dirty & _Element__WEBPACK_IMPORTED_MODULE_4__.default.REDARAW_BIT) || !shouldPaint)
                    ? el.getPrevPaintRect()
                    : null;
                if (prevRect) {
                    addRectToMergePool(prevRect);
                }
                var curRect = shouldPaint && ((el.__dirty & _Element__WEBPACK_IMPORTED_MODULE_4__.default.REDARAW_BIT) || !el.__isRendered)
                    ? el.getPaintRect()
                    : null;
                if (curRect) {
                    addRectToMergePool(curRect);
                }
            }
        }
        for (var i = this.__prevStartIndex; i < this.__prevEndIndex; ++i) {
            var el = prevList[i];
            var shouldPaint = el.shouldBePainted(viewWidth, viewHeight, true, true);
            if (el && (!shouldPaint || !el.__zr) && el.__isRendered) {
                var prevRect = el.getPrevPaintRect();
                if (prevRect) {
                    addRectToMergePool(prevRect);
                }
            }
        }
        var hasIntersections;
        do {
            hasIntersections = false;
            for (var i = 0; i < mergedRepaintRects.length;) {
                if (mergedRepaintRects[i].isZero()) {
                    mergedRepaintRects.splice(i, 1);
                    continue;
                }
                for (var j = i + 1; j < mergedRepaintRects.length;) {
                    if (mergedRepaintRects[i].intersect(mergedRepaintRects[j])) {
                        hasIntersections = true;
                        mergedRepaintRects[i].union(mergedRepaintRects[j]);
                        mergedRepaintRects.splice(j, 1);
                    }
                    else {
                        j++;
                    }
                }
                i++;
            }
        } while (hasIntersections);
        this._paintRects = mergedRepaintRects;
        return mergedRepaintRects;
    };
    Layer.prototype.debugGetPaintRects = function () {
        return (this._paintRects || []).slice();
    };
    Layer.prototype.resize = function (width, height) {
        var dpr = this.dpr;
        var dom = this.dom;
        var domStyle = dom.style;
        var domBack = this.domBack;
        if (domStyle) {
            domStyle.width = width + 'px';
            domStyle.height = height + 'px';
        }
        dom.width = width * dpr;
        dom.height = height * dpr;
        if (domBack) {
            domBack.width = width * dpr;
            domBack.height = height * dpr;
            if (dpr !== 1) {
                this.ctxBack.scale(dpr, dpr);
            }
        }
    };
    Layer.prototype.clear = function (clearAll, clearColor, repaintRects) {
        var dom = this.dom;
        var ctx = this.ctx;
        var width = dom.width;
        var height = dom.height;
        clearColor = clearColor || this.clearColor;
        var haveMotionBLur = this.motionBlur && !clearAll;
        var lastFrameAlpha = this.lastFrameAlpha;
        var dpr = this.dpr;
        var self = this;
        if (haveMotionBLur) {
            if (!this.domBack) {
                this.createBackBuffer();
            }
            this.ctxBack.globalCompositeOperation = 'copy';
            this.ctxBack.drawImage(dom, 0, 0, width / dpr, height / dpr);
        }
        var domBack = this.domBack;
        function doClear(x, y, width, height) {
            ctx.clearRect(x, y, width, height);
            if (clearColor && clearColor !== 'transparent') {
                var clearColorGradientOrPattern = void 0;
                if (_core_util__WEBPACK_IMPORTED_MODULE_0__.isGradientObject(clearColor)) {
                    clearColorGradientOrPattern = clearColor.__canvasGradient
                        || (0,_helper__WEBPACK_IMPORTED_MODULE_5__.getCanvasGradient)(ctx, clearColor, {
                            x: 0,
                            y: 0,
                            width: width,
                            height: height
                        });
                    clearColor.__canvasGradient = clearColorGradientOrPattern;
                }
                else if (_core_util__WEBPACK_IMPORTED_MODULE_0__.isPatternObject(clearColor)) {
                    clearColorGradientOrPattern = (0,_graphic__WEBPACK_IMPORTED_MODULE_6__.createCanvasPattern)(ctx, clearColor, {
                        dirty: function () {
                            self.setUnpainted();
                            self.__painter.refresh();
                        }
                    });
                }
                ctx.save();
                ctx.fillStyle = clearColorGradientOrPattern || clearColor;
                ctx.fillRect(x, y, width, height);
                ctx.restore();
            }
            if (haveMotionBLur) {
                ctx.save();
                ctx.globalAlpha = lastFrameAlpha;
                ctx.drawImage(domBack, x, y, width, height);
                ctx.restore();
            }
        }
        ;
        if (!repaintRects || haveMotionBLur) {
            doClear(0, 0, width, height);
        }
        else if (repaintRects.length) {
            _core_util__WEBPACK_IMPORTED_MODULE_0__.each(repaintRects, function (rect) {
                doClear(rect.x * dpr, rect.y * dpr, rect.width * dpr, rect.height * dpr);
            });
        }
    };
    return Layer;
}(_core_Eventful__WEBPACK_IMPORTED_MODULE_7__.default));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Layer);


/***/ }),

/***/ "./node_modules/zrender/lib/canvas/Painter.js":
/*!****************************************************!*\
  !*** ./node_modules/zrender/lib/canvas/Painter.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ "./node_modules/zrender/lib/config.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _Layer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Layer */ "./node_modules/zrender/lib/canvas/Layer.js");
/* harmony import */ var _animation_requestAnimationFrame__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../animation/requestAnimationFrame */ "./node_modules/zrender/lib/animation/requestAnimationFrame.js");
/* harmony import */ var _graphic_Image__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../graphic/Image */ "./node_modules/zrender/lib/graphic/Image.js");
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../core/env */ "./node_modules/zrender/lib/core/env.js");
/* harmony import */ var _graphic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./graphic */ "./node_modules/zrender/lib/canvas/graphic.js");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Element */ "./node_modules/zrender/lib/Element.js");








var HOVER_LAYER_ZLEVEL = 1e5;
var CANVAS_ZLEVEL = 314159;
var EL_AFTER_INCREMENTAL_INC = 0.01;
var INCREMENTAL_INC = 0.001;
function parseInt10(val) {
    return parseInt(val, 10);
}
function isLayerValid(layer) {
    if (!layer) {
        return false;
    }
    if (layer.__builtin__) {
        return true;
    }
    if (typeof (layer.resize) !== 'function'
        || typeof (layer.refresh) !== 'function') {
        return false;
    }
    return true;
}
function createRoot(width, height) {
    var domRoot = document.createElement('div');
    domRoot.style.cssText = [
        'position:relative',
        'width:' + width + 'px',
        'height:' + height + 'px',
        'padding:0',
        'margin:0',
        'border-width:0'
    ].join(';') + ';';
    return domRoot;
}
var CanvasPainter = (function () {
    function CanvasPainter(root, storage, opts, id) {
        this.type = 'canvas';
        this._zlevelList = [];
        this._prevDisplayList = [];
        this._layers = {};
        this._layerConfig = {};
        this._needsManuallyCompositing = false;
        this.type = 'canvas';
        var singleCanvas = !root.nodeName
            || root.nodeName.toUpperCase() === 'CANVAS';
        this._opts = opts = _core_util__WEBPACK_IMPORTED_MODULE_0__.extend({}, opts || {});
        this.dpr = opts.devicePixelRatio || _config__WEBPACK_IMPORTED_MODULE_1__.devicePixelRatio;
        this._singleCanvas = singleCanvas;
        this.root = root;
        var rootStyle = root.style;
        if (rootStyle) {
            rootStyle.webkitTapHighlightColor = 'transparent';
            rootStyle.webkitUserSelect = 'none';
            rootStyle.userSelect = 'none';
            rootStyle['-webkit-touch-callout'] = 'none';
            root.innerHTML = '';
        }
        this.storage = storage;
        var zlevelList = this._zlevelList;
        this._prevDisplayList = [];
        var layers = this._layers;
        if (!singleCanvas) {
            this._width = this._getSize(0);
            this._height = this._getSize(1);
            var domRoot = this._domRoot = createRoot(this._width, this._height);
            root.appendChild(domRoot);
        }
        else {
            var rootCanvas = root;
            var width = rootCanvas.width;
            var height = rootCanvas.height;
            if (opts.width != null) {
                width = opts.width;
            }
            if (opts.height != null) {
                height = opts.height;
            }
            this.dpr = opts.devicePixelRatio || 1;
            rootCanvas.width = width * this.dpr;
            rootCanvas.height = height * this.dpr;
            this._width = width;
            this._height = height;
            var mainLayer = new _Layer__WEBPACK_IMPORTED_MODULE_2__.default(rootCanvas, this, this.dpr);
            mainLayer.__builtin__ = true;
            mainLayer.initContext();
            layers[CANVAS_ZLEVEL] = mainLayer;
            mainLayer.zlevel = CANVAS_ZLEVEL;
            zlevelList.push(CANVAS_ZLEVEL);
            this._domRoot = root;
        }
    }
    CanvasPainter.prototype.getType = function () {
        return 'canvas';
    };
    CanvasPainter.prototype.isSingleCanvas = function () {
        return this._singleCanvas;
    };
    CanvasPainter.prototype.getViewportRoot = function () {
        return this._domRoot;
    };
    CanvasPainter.prototype.getViewportRootOffset = function () {
        var viewportRoot = this.getViewportRoot();
        if (viewportRoot) {
            return {
                offsetLeft: viewportRoot.offsetLeft || 0,
                offsetTop: viewportRoot.offsetTop || 0
            };
        }
    };
    CanvasPainter.prototype.refresh = function (paintAll) {
        var list = this.storage.getDisplayList(true);
        var prevList = this._prevDisplayList;
        var zlevelList = this._zlevelList;
        this._redrawId = Math.random();
        this._paintList(list, prevList, paintAll, this._redrawId);
        for (var i = 0; i < zlevelList.length; i++) {
            var z = zlevelList[i];
            var layer = this._layers[z];
            if (!layer.__builtin__ && layer.refresh) {
                var clearColor = i === 0 ? this._backgroundColor : null;
                layer.refresh(clearColor);
            }
        }
        if (this._opts.useDirtyRect) {
            this._prevDisplayList = list.slice();
        }
        return this;
    };
    CanvasPainter.prototype.refreshHover = function () {
        this._paintHoverList(this.storage.getDisplayList(false));
    };
    CanvasPainter.prototype._paintHoverList = function (list) {
        var len = list.length;
        var hoverLayer = this._hoverlayer;
        hoverLayer && hoverLayer.clear();
        if (!len) {
            return;
        }
        var scope = {
            inHover: true,
            viewWidth: this._width,
            viewHeight: this._height
        };
        var ctx;
        for (var i = 0; i < len; i++) {
            var el = list[i];
            if (el.__inHover) {
                if (!hoverLayer) {
                    hoverLayer = this._hoverlayer = this.getLayer(HOVER_LAYER_ZLEVEL);
                }
                if (!ctx) {
                    ctx = hoverLayer.ctx;
                    ctx.save();
                }
                (0,_graphic__WEBPACK_IMPORTED_MODULE_3__.brush)(ctx, el, scope, i === len - 1);
            }
        }
        if (ctx) {
            ctx.restore();
        }
    };
    CanvasPainter.prototype.getHoverLayer = function () {
        return this.getLayer(HOVER_LAYER_ZLEVEL);
    };
    CanvasPainter.prototype.paintOne = function (ctx, el) {
        (0,_graphic__WEBPACK_IMPORTED_MODULE_3__.brushSingle)(ctx, el);
    };
    CanvasPainter.prototype._paintList = function (list, prevList, paintAll, redrawId) {
        if (this._redrawId !== redrawId) {
            return;
        }
        paintAll = paintAll || false;
        this._updateLayerStatus(list);
        var _a = this._doPaintList(list, prevList, paintAll), finished = _a.finished, needsRefreshHover = _a.needsRefreshHover;
        if (this._needsManuallyCompositing) {
            this._compositeManually();
        }
        if (needsRefreshHover) {
            this._paintHoverList(list);
        }
        if (!finished) {
            var self_1 = this;
            (0,_animation_requestAnimationFrame__WEBPACK_IMPORTED_MODULE_4__.default)(function () {
                self_1._paintList(list, prevList, paintAll, redrawId);
            });
        }
        else {
            this.eachLayer(function (layer) {
                layer.afterBrush && layer.afterBrush();
            });
        }
    };
    CanvasPainter.prototype._compositeManually = function () {
        var ctx = this.getLayer(CANVAS_ZLEVEL).ctx;
        var width = this._domRoot.width;
        var height = this._domRoot.height;
        ctx.clearRect(0, 0, width, height);
        this.eachBuiltinLayer(function (layer) {
            if (layer.virtual) {
                ctx.drawImage(layer.dom, 0, 0, width, height);
            }
        });
    };
    CanvasPainter.prototype._doPaintList = function (list, prevList, paintAll) {
        var _this = this;
        var layerList = [];
        var useDirtyRect = this._opts.useDirtyRect;
        for (var zi = 0; zi < this._zlevelList.length; zi++) {
            var zlevel = this._zlevelList[zi];
            var layer = this._layers[zlevel];
            if (layer.__builtin__
                && layer !== this._hoverlayer
                && (layer.__dirty || paintAll)) {
                layerList.push(layer);
            }
        }
        var finished = true;
        var needsRefreshHover = false;
        var _loop_1 = function (k) {
            var layer = layerList[k];
            var ctx = layer.ctx;
            var repaintRects = useDirtyRect
                && layer.createRepaintRects(list, prevList, this_1._width, this_1._height);
            ctx.save();
            var start = paintAll ? layer.__startIndex : layer.__drawIndex;
            var useTimer = !paintAll && layer.incremental && Date.now;
            var startTime = useTimer && Date.now();
            var clearColor = layer.zlevel === this_1._zlevelList[0]
                ? this_1._backgroundColor : null;
            if (layer.__startIndex === layer.__endIndex) {
                layer.clear(false, clearColor, repaintRects);
            }
            else if (start === layer.__startIndex) {
                var firstEl = list[start];
                if (!firstEl.incremental || !firstEl.notClear || paintAll) {
                    layer.clear(false, clearColor, repaintRects);
                }
            }
            if (start === -1) {
                console.error('For some unknown reason. drawIndex is -1');
                start = layer.__startIndex;
            }
            var i;
            var repaint = function (repaintRect) {
                var scope = {
                    inHover: false,
                    allClipped: false,
                    prevEl: null,
                    viewWidth: _this._width,
                    viewHeight: _this._height
                };
                for (i = start; i < layer.__endIndex; i++) {
                    var el = list[i];
                    if (el.__inHover) {
                        needsRefreshHover = true;
                    }
                    _this._doPaintEl(el, layer, useDirtyRect, repaintRect, scope, i === layer.__endIndex - 1);
                    if (useTimer) {
                        var dTime = Date.now() - startTime;
                        if (dTime > 15) {
                            break;
                        }
                    }
                }
                if (scope.prevElClipPaths) {
                    ctx.restore();
                }
            };
            if (repaintRects) {
                if (repaintRects.length === 0) {
                    i = layer.__endIndex;
                }
                else {
                    var dpr = this_1.dpr;
                    for (var r = 0; r < repaintRects.length; ++r) {
                        var rect = repaintRects[r];
                        ctx.save();
                        ctx.beginPath();
                        ctx.rect(rect.x * dpr, rect.y * dpr, rect.width * dpr, rect.height * dpr);
                        ctx.clip();
                        repaint(rect);
                        ctx.restore();
                    }
                }
            }
            else {
                ctx.save();
                repaint();
                ctx.restore();
            }
            layer.__drawIndex = i;
            if (layer.__drawIndex < layer.__endIndex) {
                finished = false;
            }
        };
        var this_1 = this;
        for (var k = 0; k < layerList.length; k++) {
            _loop_1(k);
        }
        if (_core_env__WEBPACK_IMPORTED_MODULE_5__.default.wxa) {
            _core_util__WEBPACK_IMPORTED_MODULE_0__.each(this._layers, function (layer) {
                if (layer && layer.ctx && layer.ctx.draw) {
                    layer.ctx.draw();
                }
            });
        }
        return {
            finished: finished,
            needsRefreshHover: needsRefreshHover
        };
    };
    CanvasPainter.prototype._doPaintEl = function (el, currentLayer, useDirtyRect, repaintRect, scope, isLast) {
        var ctx = currentLayer.ctx;
        if (useDirtyRect) {
            var paintRect = el.getPaintRect();
            if (!repaintRect || paintRect && paintRect.intersect(repaintRect)) {
                (0,_graphic__WEBPACK_IMPORTED_MODULE_3__.brush)(ctx, el, scope, isLast);
                el.setPrevPaintRect(paintRect);
            }
        }
        else {
            (0,_graphic__WEBPACK_IMPORTED_MODULE_3__.brush)(ctx, el, scope, isLast);
        }
    };
    CanvasPainter.prototype.getLayer = function (zlevel, virtual) {
        if (this._singleCanvas && !this._needsManuallyCompositing) {
            zlevel = CANVAS_ZLEVEL;
        }
        var layer = this._layers[zlevel];
        if (!layer) {
            layer = new _Layer__WEBPACK_IMPORTED_MODULE_2__.default('zr_' + zlevel, this, this.dpr);
            layer.zlevel = zlevel;
            layer.__builtin__ = true;
            if (this._layerConfig[zlevel]) {
                _core_util__WEBPACK_IMPORTED_MODULE_0__.merge(layer, this._layerConfig[zlevel], true);
            }
            else if (this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC]) {
                _core_util__WEBPACK_IMPORTED_MODULE_0__.merge(layer, this._layerConfig[zlevel - EL_AFTER_INCREMENTAL_INC], true);
            }
            if (virtual) {
                layer.virtual = virtual;
            }
            this.insertLayer(zlevel, layer);
            layer.initContext();
        }
        return layer;
    };
    CanvasPainter.prototype.insertLayer = function (zlevel, layer) {
        var layersMap = this._layers;
        var zlevelList = this._zlevelList;
        var len = zlevelList.length;
        var domRoot = this._domRoot;
        var prevLayer = null;
        var i = -1;
        if (layersMap[zlevel]) {
            _core_util__WEBPACK_IMPORTED_MODULE_0__.logError('ZLevel ' + zlevel + ' has been used already');
            return;
        }
        if (!isLayerValid(layer)) {
            _core_util__WEBPACK_IMPORTED_MODULE_0__.logError('Layer of zlevel ' + zlevel + ' is not valid');
            return;
        }
        if (len > 0 && zlevel > zlevelList[0]) {
            for (i = 0; i < len - 1; i++) {
                if (zlevelList[i] < zlevel
                    && zlevelList[i + 1] > zlevel) {
                    break;
                }
            }
            prevLayer = layersMap[zlevelList[i]];
        }
        zlevelList.splice(i + 1, 0, zlevel);
        layersMap[zlevel] = layer;
        if (!layer.virtual) {
            if (prevLayer) {
                var prevDom = prevLayer.dom;
                if (prevDom.nextSibling) {
                    domRoot.insertBefore(layer.dom, prevDom.nextSibling);
                }
                else {
                    domRoot.appendChild(layer.dom);
                }
            }
            else {
                if (domRoot.firstChild) {
                    domRoot.insertBefore(layer.dom, domRoot.firstChild);
                }
                else {
                    domRoot.appendChild(layer.dom);
                }
            }
        }
        layer.__painter = this;
    };
    CanvasPainter.prototype.eachLayer = function (cb, context) {
        var zlevelList = this._zlevelList;
        for (var i = 0; i < zlevelList.length; i++) {
            var z = zlevelList[i];
            cb.call(context, this._layers[z], z);
        }
    };
    CanvasPainter.prototype.eachBuiltinLayer = function (cb, context) {
        var zlevelList = this._zlevelList;
        for (var i = 0; i < zlevelList.length; i++) {
            var z = zlevelList[i];
            var layer = this._layers[z];
            if (layer.__builtin__) {
                cb.call(context, layer, z);
            }
        }
    };
    CanvasPainter.prototype.eachOtherLayer = function (cb, context) {
        var zlevelList = this._zlevelList;
        for (var i = 0; i < zlevelList.length; i++) {
            var z = zlevelList[i];
            var layer = this._layers[z];
            if (!layer.__builtin__) {
                cb.call(context, layer, z);
            }
        }
    };
    CanvasPainter.prototype.getLayers = function () {
        return this._layers;
    };
    CanvasPainter.prototype._updateLayerStatus = function (list) {
        this.eachBuiltinLayer(function (layer, z) {
            layer.__dirty = layer.__used = false;
        });
        function updatePrevLayer(idx) {
            if (prevLayer) {
                if (prevLayer.__endIndex !== idx) {
                    prevLayer.__dirty = true;
                }
                prevLayer.__endIndex = idx;
            }
        }
        if (this._singleCanvas) {
            for (var i_1 = 1; i_1 < list.length; i_1++) {
                var el = list[i_1];
                if (el.zlevel !== list[i_1 - 1].zlevel || el.incremental) {
                    this._needsManuallyCompositing = true;
                    break;
                }
            }
        }
        var prevLayer = null;
        var incrementalLayerCount = 0;
        var prevZlevel;
        var i;
        for (i = 0; i < list.length; i++) {
            var el = list[i];
            var zlevel = el.zlevel;
            var layer = void 0;
            if (prevZlevel !== zlevel) {
                prevZlevel = zlevel;
                incrementalLayerCount = 0;
            }
            if (el.incremental) {
                layer = this.getLayer(zlevel + INCREMENTAL_INC, this._needsManuallyCompositing);
                layer.incremental = true;
                incrementalLayerCount = 1;
            }
            else {
                layer = this.getLayer(zlevel + (incrementalLayerCount > 0 ? EL_AFTER_INCREMENTAL_INC : 0), this._needsManuallyCompositing);
            }
            if (!layer.__builtin__) {
                _core_util__WEBPACK_IMPORTED_MODULE_0__.logError('ZLevel ' + zlevel + ' has been used by unkown layer ' + layer.id);
            }
            if (layer !== prevLayer) {
                layer.__used = true;
                if (layer.__startIndex !== i) {
                    layer.__dirty = true;
                }
                layer.__startIndex = i;
                if (!layer.incremental) {
                    layer.__drawIndex = i;
                }
                else {
                    layer.__drawIndex = -1;
                }
                updatePrevLayer(i);
                prevLayer = layer;
            }
            if ((el.__dirty & _Element__WEBPACK_IMPORTED_MODULE_6__.default.REDARAW_BIT) && !el.__inHover) {
                layer.__dirty = true;
                if (layer.incremental && layer.__drawIndex < 0) {
                    layer.__drawIndex = i;
                }
            }
        }
        updatePrevLayer(i);
        this.eachBuiltinLayer(function (layer, z) {
            if (!layer.__used && layer.getElementCount() > 0) {
                layer.__dirty = true;
                layer.__startIndex = layer.__endIndex = layer.__drawIndex = 0;
            }
            if (layer.__dirty && layer.__drawIndex < 0) {
                layer.__drawIndex = layer.__startIndex;
            }
        });
    };
    CanvasPainter.prototype.clear = function () {
        this.eachBuiltinLayer(this._clearLayer);
        return this;
    };
    CanvasPainter.prototype._clearLayer = function (layer) {
        layer.clear();
    };
    CanvasPainter.prototype.setBackgroundColor = function (backgroundColor) {
        this._backgroundColor = backgroundColor;
        _core_util__WEBPACK_IMPORTED_MODULE_0__.each(this._layers, function (layer) {
            layer.setUnpainted();
        });
    };
    CanvasPainter.prototype.configLayer = function (zlevel, config) {
        if (config) {
            var layerConfig = this._layerConfig;
            if (!layerConfig[zlevel]) {
                layerConfig[zlevel] = config;
            }
            else {
                _core_util__WEBPACK_IMPORTED_MODULE_0__.merge(layerConfig[zlevel], config, true);
            }
            for (var i = 0; i < this._zlevelList.length; i++) {
                var _zlevel = this._zlevelList[i];
                if (_zlevel === zlevel || _zlevel === zlevel + EL_AFTER_INCREMENTAL_INC) {
                    var layer = this._layers[_zlevel];
                    _core_util__WEBPACK_IMPORTED_MODULE_0__.merge(layer, layerConfig[zlevel], true);
                }
            }
        }
    };
    CanvasPainter.prototype.delLayer = function (zlevel) {
        var layers = this._layers;
        var zlevelList = this._zlevelList;
        var layer = layers[zlevel];
        if (!layer) {
            return;
        }
        layer.dom.parentNode.removeChild(layer.dom);
        delete layers[zlevel];
        zlevelList.splice(_core_util__WEBPACK_IMPORTED_MODULE_0__.indexOf(zlevelList, zlevel), 1);
    };
    CanvasPainter.prototype.resize = function (width, height) {
        if (!this._domRoot.style) {
            if (width == null || height == null) {
                return;
            }
            this._width = width;
            this._height = height;
            this.getLayer(CANVAS_ZLEVEL).resize(width, height);
        }
        else {
            var domRoot = this._domRoot;
            domRoot.style.display = 'none';
            var opts = this._opts;
            width != null && (opts.width = width);
            height != null && (opts.height = height);
            width = this._getSize(0);
            height = this._getSize(1);
            domRoot.style.display = '';
            if (this._width !== width || height !== this._height) {
                domRoot.style.width = width + 'px';
                domRoot.style.height = height + 'px';
                for (var id in this._layers) {
                    if (this._layers.hasOwnProperty(id)) {
                        this._layers[id].resize(width, height);
                    }
                }
                this.refresh(true);
            }
            this._width = width;
            this._height = height;
        }
        return this;
    };
    CanvasPainter.prototype.clearLayer = function (zlevel) {
        var layer = this._layers[zlevel];
        if (layer) {
            layer.clear();
        }
    };
    CanvasPainter.prototype.dispose = function () {
        this.root.innerHTML = '';
        this.root =
            this.storage =
                this._domRoot =
                    this._layers = null;
    };
    CanvasPainter.prototype.getRenderedCanvas = function (opts) {
        opts = opts || {};
        if (this._singleCanvas && !this._compositeManually) {
            return this._layers[CANVAS_ZLEVEL].dom;
        }
        var imageLayer = new _Layer__WEBPACK_IMPORTED_MODULE_2__.default('image', this, opts.pixelRatio || this.dpr);
        imageLayer.initContext();
        imageLayer.clear(false, opts.backgroundColor || this._backgroundColor);
        var ctx = imageLayer.ctx;
        if (opts.pixelRatio <= this.dpr) {
            this.refresh();
            var width_1 = imageLayer.dom.width;
            var height_1 = imageLayer.dom.height;
            this.eachLayer(function (layer) {
                if (layer.__builtin__) {
                    ctx.drawImage(layer.dom, 0, 0, width_1, height_1);
                }
                else if (layer.renderToCanvas) {
                    ctx.save();
                    layer.renderToCanvas(ctx);
                    ctx.restore();
                }
            });
        }
        else {
            var scope = {
                inHover: false,
                viewWidth: this._width,
                viewHeight: this._height
            };
            var displayList = this.storage.getDisplayList(true);
            for (var i = 0, len = displayList.length; i < len; i++) {
                var el = displayList[i];
                (0,_graphic__WEBPACK_IMPORTED_MODULE_3__.brush)(ctx, el, scope, i === len - 1);
            }
        }
        return imageLayer.dom;
    };
    CanvasPainter.prototype.getWidth = function () {
        return this._width;
    };
    CanvasPainter.prototype.getHeight = function () {
        return this._height;
    };
    CanvasPainter.prototype._getSize = function (whIdx) {
        var opts = this._opts;
        var wh = ['width', 'height'][whIdx];
        var cwh = ['clientWidth', 'clientHeight'][whIdx];
        var plt = ['paddingLeft', 'paddingTop'][whIdx];
        var prb = ['paddingRight', 'paddingBottom'][whIdx];
        if (opts[wh] != null && opts[wh] !== 'auto') {
            return parseFloat(opts[wh]);
        }
        var root = this.root;
        var stl = document.defaultView.getComputedStyle(root);
        return ((root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh]))
            - (parseInt10(stl[plt]) || 0)
            - (parseInt10(stl[prb]) || 0)) | 0;
    };
    CanvasPainter.prototype.pathToImage = function (path, dpr) {
        dpr = dpr || this.dpr;
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        var rect = path.getBoundingRect();
        var style = path.style;
        var shadowBlurSize = style.shadowBlur * dpr;
        var shadowOffsetX = style.shadowOffsetX * dpr;
        var shadowOffsetY = style.shadowOffsetY * dpr;
        var lineWidth = path.hasStroke() ? style.lineWidth : 0;
        var leftMargin = Math.max(lineWidth / 2, -shadowOffsetX + shadowBlurSize);
        var rightMargin = Math.max(lineWidth / 2, shadowOffsetX + shadowBlurSize);
        var topMargin = Math.max(lineWidth / 2, -shadowOffsetY + shadowBlurSize);
        var bottomMargin = Math.max(lineWidth / 2, shadowOffsetY + shadowBlurSize);
        var width = rect.width + leftMargin + rightMargin;
        var height = rect.height + topMargin + bottomMargin;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
        ctx.clearRect(0, 0, width, height);
        ctx.dpr = dpr;
        var pathTransform = {
            x: path.x,
            y: path.y,
            scaleX: path.scaleX,
            scaleY: path.scaleY,
            rotation: path.rotation,
            originX: path.originX,
            originY: path.originY
        };
        path.x = leftMargin - rect.x;
        path.y = topMargin - rect.y;
        path.rotation = 0;
        path.scaleX = 1;
        path.scaleY = 1;
        path.updateTransform();
        if (path) {
            (0,_graphic__WEBPACK_IMPORTED_MODULE_3__.brush)(ctx, path, {
                inHover: false,
                viewWidth: this._width,
                viewHeight: this._height
            }, true);
        }
        var imgShape = new _graphic_Image__WEBPACK_IMPORTED_MODULE_7__.default({
            style: {
                x: 0,
                y: 0,
                image: canvas
            }
        });
        _core_util__WEBPACK_IMPORTED_MODULE_0__.extend(path, pathTransform);
        return imgShape;
    };
    return CanvasPainter;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CanvasPainter);
;


/***/ }),

/***/ "./node_modules/zrender/lib/core/arrayDiff.js":
/*!****************************************************!*\
  !*** ./node_modules/zrender/lib/core/arrayDiff.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ arrayDiff)
/* harmony export */ });
function diff(oldArr, newArr, equals) {
    if (!equals) {
        equals = function (a, b) {
            return a === b;
        };
    }
    oldArr = oldArr.slice();
    newArr = newArr.slice();
    var newLen = newArr.length;
    var oldLen = oldArr.length;
    var editLength = 1;
    var maxEditLength = newLen + oldLen;
    var bestPath = [{ newPos: -1, components: [] }];
    var oldPos = extractCommon(bestPath[0], newArr, oldArr, 0, equals);
    if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
        var indices = [];
        for (var i = 0; i < newArr.length; i++) {
            indices.push(i);
        }
        return [{
                indices: indices,
                count: newArr.length,
                added: false,
                removed: false
            }];
    }
    function execEditLength() {
        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
            var basePath;
            var addPath = bestPath[diagonalPath - 1];
            var removePath = bestPath[diagonalPath + 1];
            var oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
            if (addPath) {
                bestPath[diagonalPath - 1] = undefined;
            }
            var canAdd = addPath && addPath.newPos + 1 < newLen;
            var canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
            if (!canAdd && !canRemove) {
                bestPath[diagonalPath] = undefined;
                continue;
            }
            if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
                basePath = clonePath(removePath);
                pushComponent(basePath.components, false, true);
            }
            else {
                basePath = addPath;
                basePath.newPos++;
                pushComponent(basePath.components, true, false);
            }
            oldPos = extractCommon(basePath, newArr, oldArr, diagonalPath, equals);
            if (basePath.newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
                return buildValues(basePath.components);
            }
            else {
                bestPath[diagonalPath] = basePath;
            }
        }
        editLength++;
    }
    while (editLength <= maxEditLength) {
        var ret = execEditLength();
        if (ret) {
            return ret;
        }
    }
}
function extractCommon(basePath, newArr, oldArr, diagonalPath, equals) {
    var newLen = newArr.length;
    var oldLen = oldArr.length;
    var newPos = basePath.newPos;
    var oldPos = newPos - diagonalPath;
    var commonCount = 0;
    while (newPos + 1 < newLen && oldPos + 1 < oldLen && equals(newArr[newPos + 1], oldArr[oldPos + 1])) {
        newPos++;
        oldPos++;
        commonCount++;
    }
    if (commonCount) {
        basePath.components.push({
            count: commonCount,
            added: false,
            removed: false,
            indices: []
        });
    }
    basePath.newPos = newPos;
    return oldPos;
}
function pushComponent(components, added, removed) {
    var last = components[components.length - 1];
    if (last && last.added === added && last.removed === removed) {
        components[components.length - 1] = {
            count: last.count + 1,
            added: added,
            removed: removed,
            indices: []
        };
    }
    else {
        components.push({
            count: 1,
            added: added,
            removed: removed,
            indices: []
        });
    }
}
function buildValues(components) {
    var componentPos = 0;
    var componentLen = components.length;
    var newPos = 0;
    var oldPos = 0;
    for (; componentPos < componentLen; componentPos++) {
        var component = components[componentPos];
        if (!component.removed) {
            var indices = [];
            for (var i = newPos; i < newPos + component.count; i++) {
                indices.push(i);
            }
            component.indices = indices;
            newPos += component.count;
            if (!component.added) {
                oldPos += component.count;
            }
        }
        else {
            for (var i = oldPos; i < oldPos + component.count; i++) {
                component.indices.push(i);
            }
            oldPos += component.count;
        }
    }
    return components;
}
function clonePath(path) {
    return { newPos: path.newPos, components: path.components.slice(0) };
}
function arrayDiff(oldArr, newArr, equal) {
    return diff(oldArr, newArr, equal);
}


/***/ }),

/***/ "./node_modules/zrender/lib/svg/Painter.js":
/*!*************************************************!*\
  !*** ./node_modules/zrender/lib/svg/Painter.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core */ "./node_modules/zrender/lib/svg/core.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _graphic_Path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphic/Path */ "./node_modules/zrender/lib/graphic/Path.js");
/* harmony import */ var _graphic_Image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../graphic/Image */ "./node_modules/zrender/lib/graphic/Image.js");
/* harmony import */ var _graphic_TSpan__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphic/TSpan */ "./node_modules/zrender/lib/graphic/TSpan.js");
/* harmony import */ var _core_arrayDiff__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../core/arrayDiff */ "./node_modules/zrender/lib/core/arrayDiff.js");
/* harmony import */ var _helper_GradientManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helper/GradientManager */ "./node_modules/zrender/lib/svg/helper/GradientManager.js");
/* harmony import */ var _helper_PatternManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./helper/PatternManager */ "./node_modules/zrender/lib/svg/helper/PatternManager.js");
/* harmony import */ var _helper_ClippathManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./helper/ClippathManager */ "./node_modules/zrender/lib/svg/helper/ClippathManager.js");
/* harmony import */ var _helper_ShadowManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./helper/ShadowManager */ "./node_modules/zrender/lib/svg/helper/ShadowManager.js");
/* harmony import */ var _graphic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./graphic */ "./node_modules/zrender/lib/svg/graphic.js");











function parseInt10(val) {
    return parseInt(val, 10);
}
function getSvgProxy(el) {
    if (el instanceof _graphic_Path__WEBPACK_IMPORTED_MODULE_0__.default) {
        return _graphic__WEBPACK_IMPORTED_MODULE_1__.path;
    }
    else if (el instanceof _graphic_Image__WEBPACK_IMPORTED_MODULE_2__.default) {
        return _graphic__WEBPACK_IMPORTED_MODULE_1__.image;
    }
    else if (el instanceof _graphic_TSpan__WEBPACK_IMPORTED_MODULE_3__.default) {
        return _graphic__WEBPACK_IMPORTED_MODULE_1__.text;
    }
    else {
        return _graphic__WEBPACK_IMPORTED_MODULE_1__.path;
    }
}
function checkParentAvailable(parent, child) {
    return child && parent && child.parentNode !== parent;
}
function insertAfter(parent, child, prevSibling) {
    if (checkParentAvailable(parent, child) && prevSibling) {
        var nextSibling = prevSibling.nextSibling;
        nextSibling ? parent.insertBefore(child, nextSibling)
            : parent.appendChild(child);
    }
}
function prepend(parent, child) {
    if (checkParentAvailable(parent, child)) {
        var firstChild = parent.firstChild;
        firstChild ? parent.insertBefore(child, firstChild)
            : parent.appendChild(child);
    }
}
function remove(parent, child) {
    if (child && parent && child.parentNode === parent) {
        parent.removeChild(child);
    }
}
function removeFromMyParent(child) {
    if (child && child.parentNode) {
        child.parentNode.removeChild(child);
    }
}
function getSvgElement(displayable) {
    return displayable.__svgEl;
}
var SVGPainter = (function () {
    function SVGPainter(root, storage, opts, zrId) {
        this.type = 'svg';
        this.refreshHover = createMethodNotSupport('refreshHover');
        this.pathToImage = createMethodNotSupport('pathToImage');
        this.configLayer = createMethodNotSupport('configLayer');
        this.root = root;
        this.storage = storage;
        this._opts = opts = _core_util__WEBPACK_IMPORTED_MODULE_4__.extend({}, opts || {});
        var svgDom = (0,_core__WEBPACK_IMPORTED_MODULE_5__.createElement)('svg');
        svgDom.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns', 'http://www.w3.org/2000/svg');
        svgDom.setAttributeNS('http://www.w3.org/2000/xmlns/', 'xmlns:xlink', 'http://www.w3.org/1999/xlink');
        svgDom.setAttribute('version', '1.1');
        svgDom.setAttribute('baseProfile', 'full');
        svgDom.style.cssText = 'user-select:none;position:absolute;left:0;top:0;';
        var bgRoot = (0,_core__WEBPACK_IMPORTED_MODULE_5__.createElement)('g');
        svgDom.appendChild(bgRoot);
        var svgRoot = (0,_core__WEBPACK_IMPORTED_MODULE_5__.createElement)('g');
        svgDom.appendChild(svgRoot);
        this._gradientManager = new _helper_GradientManager__WEBPACK_IMPORTED_MODULE_6__.default(zrId, svgRoot);
        this._patternManager = new _helper_PatternManager__WEBPACK_IMPORTED_MODULE_7__.default(zrId, svgRoot);
        this._clipPathManager = new _helper_ClippathManager__WEBPACK_IMPORTED_MODULE_8__.default(zrId, svgRoot);
        this._shadowManager = new _helper_ShadowManager__WEBPACK_IMPORTED_MODULE_9__.default(zrId, svgRoot);
        var viewport = document.createElement('div');
        viewport.style.cssText = 'overflow:hidden;position:relative';
        this._svgDom = svgDom;
        this._svgRoot = svgRoot;
        this._backgroundRoot = bgRoot;
        this._viewport = viewport;
        root.appendChild(viewport);
        viewport.appendChild(svgDom);
        this.resize(opts.width, opts.height);
        this._visibleList = [];
    }
    SVGPainter.prototype.getType = function () {
        return 'svg';
    };
    SVGPainter.prototype.getViewportRoot = function () {
        return this._viewport;
    };
    SVGPainter.prototype.getSvgDom = function () {
        return this._svgDom;
    };
    SVGPainter.prototype.getSvgRoot = function () {
        return this._svgRoot;
    };
    SVGPainter.prototype.getViewportRootOffset = function () {
        var viewportRoot = this.getViewportRoot();
        if (viewportRoot) {
            return {
                offsetLeft: viewportRoot.offsetLeft || 0,
                offsetTop: viewportRoot.offsetTop || 0
            };
        }
    };
    SVGPainter.prototype.refresh = function () {
        var list = this.storage.getDisplayList(true);
        this._paintList(list);
    };
    SVGPainter.prototype.setBackgroundColor = function (backgroundColor) {
        if (this._backgroundRoot && this._backgroundNode) {
            this._backgroundRoot.removeChild(this._backgroundNode);
        }
        var bgNode = (0,_core__WEBPACK_IMPORTED_MODULE_5__.createElement)('rect');
        bgNode.setAttribute('width', this.getWidth());
        bgNode.setAttribute('height', this.getHeight());
        bgNode.setAttribute('x', 0);
        bgNode.setAttribute('y', 0);
        bgNode.setAttribute('id', 0);
        bgNode.style.fill = backgroundColor;
        this._backgroundRoot.appendChild(bgNode);
        this._backgroundNode = bgNode;
    };
    SVGPainter.prototype.createSVGElement = function (tag) {
        return (0,_core__WEBPACK_IMPORTED_MODULE_5__.createElement)(tag);
    };
    SVGPainter.prototype.paintOne = function (el) {
        var svgProxy = getSvgProxy(el);
        svgProxy && svgProxy.brush(el);
        return getSvgElement(el);
    };
    SVGPainter.prototype._paintList = function (list) {
        var gradientManager = this._gradientManager;
        var patternManager = this._patternManager;
        var clipPathManager = this._clipPathManager;
        var shadowManager = this._shadowManager;
        gradientManager.markAllUnused();
        patternManager.markAllUnused();
        clipPathManager.markAllUnused();
        shadowManager.markAllUnused();
        var svgRoot = this._svgRoot;
        var visibleList = this._visibleList;
        var listLen = list.length;
        var newVisibleList = [];
        for (var i = 0; i < listLen; i++) {
            var displayable = list[i];
            var svgProxy = getSvgProxy(displayable);
            var svgElement = getSvgElement(displayable);
            if (!displayable.invisible) {
                if (displayable.__dirty || !svgElement) {
                    svgProxy && svgProxy.brush(displayable);
                    svgElement = getSvgElement(displayable);
                    if (svgElement && displayable.style) {
                        gradientManager.update(displayable.style.fill);
                        gradientManager.update(displayable.style.stroke);
                        patternManager.update(displayable.style.fill);
                        patternManager.update(displayable.style.stroke);
                        shadowManager.update(svgElement, displayable);
                    }
                    displayable.__dirty = 0;
                }
                if (svgElement) {
                    newVisibleList.push(displayable);
                }
            }
        }
        var diff = (0,_core_arrayDiff__WEBPACK_IMPORTED_MODULE_10__.default)(visibleList, newVisibleList);
        var prevSvgElement;
        var topPrevSvgElement;
        for (var i = 0; i < diff.length; i++) {
            var item = diff[i];
            if (item.removed) {
                for (var k = 0; k < item.count; k++) {
                    var displayable = visibleList[item.indices[k]];
                    var svgElement = getSvgElement(displayable);
                    (0,_helper_ClippathManager__WEBPACK_IMPORTED_MODULE_8__.hasClipPath)(displayable) ? removeFromMyParent(svgElement)
                        : remove(svgRoot, svgElement);
                }
            }
        }
        var prevDisplayable;
        var currentClipGroup;
        for (var i = 0; i < diff.length; i++) {
            var item = diff[i];
            if (item.removed) {
                continue;
            }
            for (var k = 0; k < item.count; k++) {
                var displayable = newVisibleList[item.indices[k]];
                var clipGroup = clipPathManager.update(displayable, prevDisplayable);
                if (clipGroup !== currentClipGroup) {
                    prevSvgElement = topPrevSvgElement;
                    if (clipGroup) {
                        prevSvgElement ? insertAfter(svgRoot, clipGroup, prevSvgElement)
                            : prepend(svgRoot, clipGroup);
                        topPrevSvgElement = clipGroup;
                        prevSvgElement = null;
                    }
                    currentClipGroup = clipGroup;
                }
                var svgElement = getSvgElement(displayable);
                prevSvgElement
                    ? insertAfter(currentClipGroup || svgRoot, svgElement, prevSvgElement)
                    : prepend(currentClipGroup || svgRoot, svgElement);
                prevSvgElement = svgElement || prevSvgElement;
                if (!currentClipGroup) {
                    topPrevSvgElement = prevSvgElement;
                }
                gradientManager.markUsed(displayable);
                gradientManager.addWithoutUpdate(svgElement, displayable);
                patternManager.markUsed(displayable);
                patternManager.addWithoutUpdate(svgElement, displayable);
                clipPathManager.markUsed(displayable);
                prevDisplayable = displayable;
            }
        }
        gradientManager.removeUnused();
        patternManager.removeUnused();
        clipPathManager.removeUnused();
        shadowManager.removeUnused();
        this._visibleList = newVisibleList;
    };
    SVGPainter.prototype._getDefs = function (isForceCreating) {
        var svgRoot = this._svgDom;
        var defs = svgRoot.getElementsByTagName('defs');
        if (defs.length === 0) {
            if (isForceCreating) {
                var defs_1 = svgRoot.insertBefore((0,_core__WEBPACK_IMPORTED_MODULE_5__.createElement)('defs'), svgRoot.firstChild);
                if (!defs_1.contains) {
                    defs_1.contains = function (el) {
                        var children = defs_1.children;
                        if (!children) {
                            return false;
                        }
                        for (var i = children.length - 1; i >= 0; --i) {
                            if (children[i] === el) {
                                return true;
                            }
                        }
                        return false;
                    };
                }
                return defs_1;
            }
            else {
                return null;
            }
        }
        else {
            return defs[0];
        }
    };
    SVGPainter.prototype.resize = function (width, height) {
        var viewport = this._viewport;
        viewport.style.display = 'none';
        var opts = this._opts;
        width != null && (opts.width = width);
        height != null && (opts.height = height);
        width = this._getSize(0);
        height = this._getSize(1);
        viewport.style.display = '';
        if (this._width !== width || this._height !== height) {
            this._width = width;
            this._height = height;
            var viewportStyle = viewport.style;
            viewportStyle.width = width + 'px';
            viewportStyle.height = height + 'px';
            var svgRoot = this._svgDom;
            svgRoot.setAttribute('width', width + '');
            svgRoot.setAttribute('height', height + '');
        }
        if (this._backgroundNode) {
            this._backgroundNode.setAttribute('width', width);
            this._backgroundNode.setAttribute('height', height);
        }
    };
    SVGPainter.prototype.getWidth = function () {
        return this._width;
    };
    SVGPainter.prototype.getHeight = function () {
        return this._height;
    };
    SVGPainter.prototype._getSize = function (whIdx) {
        var opts = this._opts;
        var wh = ['width', 'height'][whIdx];
        var cwh = ['clientWidth', 'clientHeight'][whIdx];
        var plt = ['paddingLeft', 'paddingTop'][whIdx];
        var prb = ['paddingRight', 'paddingBottom'][whIdx];
        if (opts[wh] != null && opts[wh] !== 'auto') {
            return parseFloat(opts[wh]);
        }
        var root = this.root;
        var stl = document.defaultView.getComputedStyle(root);
        return ((root[cwh] || parseInt10(stl[wh]) || parseInt10(root.style[wh]))
            - (parseInt10(stl[plt]) || 0)
            - (parseInt10(stl[prb]) || 0)) | 0;
    };
    SVGPainter.prototype.dispose = function () {
        this.root.innerHTML = '';
        this._svgRoot
            = this._backgroundRoot
                = this._svgDom
                    = this._backgroundNode
                        = this._viewport
                            = this.storage
                                = null;
    };
    SVGPainter.prototype.clear = function () {
        var viewportNode = this._viewport;
        if (viewportNode && viewportNode.parentNode) {
            viewportNode.parentNode.removeChild(viewportNode);
        }
    };
    SVGPainter.prototype.toDataURL = function () {
        this.refresh();
        var svgDom = this._svgDom;
        var outerHTML = svgDom.outerHTML
            || (svgDom.parentNode && svgDom.parentNode).innerHTML;
        var html = encodeURIComponent(outerHTML.replace(/></g, '>\n\r<'));
        return 'data:image/svg+xml;charset=UTF-8,' + html;
    };
    return SVGPainter;
}());
function createMethodNotSupport(method) {
    return function () {
        _core_util__WEBPACK_IMPORTED_MODULE_4__.logError('In SVG mode painter not support method "' + method + '"');
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SVGPainter);


/***/ }),

/***/ "./node_modules/zrender/lib/svg/core.js":
/*!**********************************************!*\
  !*** ./node_modules/zrender/lib/svg/core.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createElement": () => (/* binding */ createElement)
/* harmony export */ });
function createElement(name) {
    return document.createElementNS('http://www.w3.org/2000/svg', name);
}


/***/ }),

/***/ "./node_modules/zrender/lib/svg/graphic.js":
/*!*************************************************!*\
  !*** ./node_modules/zrender/lib/svg/graphic.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "path": () => (/* binding */ svgPath),
/* harmony export */   "image": () => (/* binding */ svgImage),
/* harmony export */   "text": () => (/* binding */ svgText)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./core */ "./node_modules/zrender/lib/svg/core.js");
/* harmony import */ var _graphic_Image__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../graphic/Image */ "./node_modules/zrender/lib/graphic/Image.js");
/* harmony import */ var _contain_text__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../contain/text */ "./node_modules/zrender/lib/contain/text.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _graphic_helper_dashStyle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphic/helper/dashStyle */ "./node_modules/zrender/lib/graphic/helper/dashStyle.js");





var NONE = 'none';
var mathRound = Math.round;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI = Math.PI;
var PI2 = Math.PI * 2;
var degree = 180 / PI;
var EPSILON = 1e-4;
function round3(val) {
    return mathRound(val * 1e3) / 1e3;
}
function round4(val) {
    return mathRound(val * 1e4) / 1e4;
}
function isAroundZero(val) {
    return val < EPSILON && val > -EPSILON;
}
function pathHasFill(style) {
    var fill = style.fill;
    return fill != null && fill !== NONE;
}
function pathHasStroke(style) {
    var stroke = style.stroke;
    return stroke != null && stroke !== NONE;
}
function setTransform(svgEl, m) {
    if (m) {
        attr(svgEl, 'transform', 'matrix('
            + round3(m[0]) + ','
            + round3(m[1]) + ','
            + round3(m[2]) + ','
            + round3(m[3]) + ','
            + round4(m[4]) + ','
            + round4(m[5])
            + ')');
    }
}
function attr(el, key, val) {
    if (!val || val.type !== 'linear' && val.type !== 'radial') {
        el.setAttribute(key, val);
    }
}
function attrXLink(el, key, val) {
    el.setAttributeNS('http://www.w3.org/1999/xlink', key, val);
}
function attrXML(el, key, val) {
    el.setAttributeNS('http://www.w3.org/XML/1998/namespace', key, val);
}
function bindStyle(svgEl, style, el) {
    var opacity = style.opacity == null ? 1 : style.opacity;
    if (el instanceof _graphic_Image__WEBPACK_IMPORTED_MODULE_0__.default) {
        svgEl.style.opacity = opacity + '';
        return;
    }
    if (pathHasFill(style)) {
        var fill = style.fill;
        fill = fill === 'transparent' ? NONE : fill;
        attr(svgEl, 'fill', fill);
        attr(svgEl, 'fill-opacity', (style.fillOpacity != null ? style.fillOpacity * opacity : opacity) + '');
    }
    else {
        attr(svgEl, 'fill', NONE);
    }
    if (pathHasStroke(style)) {
        var stroke = style.stroke;
        stroke = stroke === 'transparent' ? NONE : stroke;
        attr(svgEl, 'stroke', stroke);
        var strokeWidth = style.lineWidth;
        var strokeScale_1 = style.strokeNoScale
            ? el.getLineScale()
            : 1;
        attr(svgEl, 'stroke-width', (strokeScale_1 ? strokeWidth / strokeScale_1 : 0) + '');
        attr(svgEl, 'paint-order', style.strokeFirst ? 'stroke' : 'fill');
        attr(svgEl, 'stroke-opacity', (style.strokeOpacity != null ? style.strokeOpacity * opacity : opacity) + '');
        var lineDash = style.lineDash && strokeWidth > 0 && (0,_graphic_helper_dashStyle__WEBPACK_IMPORTED_MODULE_1__.normalizeLineDash)(style.lineDash, strokeWidth);
        if (lineDash) {
            var lineDashOffset = style.lineDashOffset;
            if (strokeScale_1 && strokeScale_1 !== 1) {
                lineDash = (0,_core_util__WEBPACK_IMPORTED_MODULE_2__.map)(lineDash, function (rawVal) {
                    return rawVal / strokeScale_1;
                });
                if (lineDashOffset) {
                    lineDashOffset /= strokeScale_1;
                    lineDashOffset = mathRound(lineDashOffset);
                }
            }
            attr(svgEl, 'stroke-dasharray', lineDash.join(','));
            attr(svgEl, 'stroke-dashoffset', (lineDashOffset || 0) + '');
        }
        else {
            attr(svgEl, 'stroke-dasharray', '');
        }
        style.lineCap && attr(svgEl, 'stroke-linecap', style.lineCap);
        style.lineJoin && attr(svgEl, 'stroke-linejoin', style.lineJoin);
        style.miterLimit && attr(svgEl, 'stroke-miterlimit', style.miterLimit + '');
    }
    else {
        attr(svgEl, 'stroke', NONE);
    }
}
var SVGPathRebuilder = (function () {
    function SVGPathRebuilder() {
    }
    SVGPathRebuilder.prototype.reset = function () {
        this._d = [];
        this._str = '';
    };
    SVGPathRebuilder.prototype.moveTo = function (x, y) {
        this._add('M', x, y);
    };
    SVGPathRebuilder.prototype.lineTo = function (x, y) {
        this._add('L', x, y);
    };
    SVGPathRebuilder.prototype.bezierCurveTo = function (x, y, x2, y2, x3, y3) {
        this._add('C', x, y, x2, y2, x3, y3);
    };
    SVGPathRebuilder.prototype.quadraticCurveTo = function (x, y, x2, y2) {
        this._add('Q', x, y, x2, y2);
    };
    SVGPathRebuilder.prototype.arc = function (cx, cy, r, startAngle, endAngle, anticlockwise) {
        this.ellipse(cx, cy, r, r, 0, startAngle, endAngle, anticlockwise);
    };
    SVGPathRebuilder.prototype.ellipse = function (cx, cy, rx, ry, psi, startAngle, endAngle, anticlockwise) {
        var firstCmd = this._d.length === 0;
        var dTheta = endAngle - startAngle;
        var clockwise = !anticlockwise;
        var dThetaPositive = Math.abs(dTheta);
        var isCircle = isAroundZero(dThetaPositive - PI2)
            || (clockwise ? dTheta >= PI2 : -dTheta >= PI2);
        var unifiedTheta = dTheta > 0 ? dTheta % PI2 : (dTheta % PI2 + PI2);
        var large = false;
        if (isCircle) {
            large = true;
        }
        else if (isAroundZero(dThetaPositive)) {
            large = false;
        }
        else {
            large = (unifiedTheta >= PI) === !!clockwise;
        }
        var x0 = round4(cx + rx * mathCos(startAngle));
        var y0 = round4(cy + ry * mathSin(startAngle));
        if (isCircle) {
            if (clockwise) {
                dTheta = PI2 - 1e-4;
            }
            else {
                dTheta = -PI2 + 1e-4;
            }
            large = true;
            if (firstCmd) {
                this._d.push('M', x0, y0);
            }
        }
        var x = round4(cx + rx * mathCos(startAngle + dTheta));
        var y = round4(cy + ry * mathSin(startAngle + dTheta));
        if (isNaN(x0) || isNaN(y0) || isNaN(rx) || isNaN(ry) || isNaN(psi) || isNaN(degree) || isNaN(x) || isNaN(y)) {
            return '';
        }
        this._d.push('A', round4(rx), round4(ry), mathRound(psi * degree), +large, +clockwise, x, y);
    };
    SVGPathRebuilder.prototype.rect = function (x, y, w, h) {
        this._add('M', x, y);
        this._add('L', x + w, y);
        this._add('L', x + w, y + h);
        this._add('L', x, y + h);
        this._add('L', x, y);
    };
    SVGPathRebuilder.prototype.closePath = function () {
        if (this._d.length > 0) {
            this._add('Z');
        }
    };
    SVGPathRebuilder.prototype._add = function (cmd, a, b, c, d, e, f, g, h) {
        this._d.push(cmd);
        for (var i = 1; i < arguments.length; i++) {
            var val = arguments[i];
            if (isNaN(val)) {
                this._invalid = true;
                return;
            }
            this._d.push(round4(val));
        }
    };
    SVGPathRebuilder.prototype.generateStr = function () {
        this._str = this._invalid ? '' : this._d.join(' ');
        this._d = [];
    };
    SVGPathRebuilder.prototype.getStr = function () {
        return this._str;
    };
    return SVGPathRebuilder;
}());
var svgPath = {
    brush: function (el) {
        var style = el.style;
        var svgEl = el.__svgEl;
        if (!svgEl) {
            svgEl = (0,_core__WEBPACK_IMPORTED_MODULE_3__.createElement)('path');
            el.__svgEl = svgEl;
        }
        if (!el.path) {
            el.createPathProxy();
        }
        var path = el.path;
        if (el.shapeChanged()) {
            path.beginPath();
            el.buildPath(path, el.shape);
            el.pathUpdated();
        }
        var pathVersion = path.getVersion();
        var elExt = el;
        var svgPathBuilder = elExt.__svgPathBuilder;
        if (elExt.__svgPathVersion !== pathVersion || !svgPathBuilder || el.style.strokePercent < 1) {
            if (!svgPathBuilder) {
                svgPathBuilder = elExt.__svgPathBuilder = new SVGPathRebuilder();
            }
            svgPathBuilder.reset();
            path.rebuildPath(svgPathBuilder, el.style.strokePercent);
            svgPathBuilder.generateStr();
            elExt.__svgPathVersion = pathVersion;
        }
        attr(svgEl, 'd', svgPathBuilder.getStr());
        bindStyle(svgEl, style, el);
        setTransform(svgEl, el.transform);
    }
};

var svgImage = {
    brush: function (el) {
        var style = el.style;
        var image = style.image;
        if (image instanceof HTMLImageElement) {
            image = image.src;
        }
        else if (image instanceof HTMLCanvasElement) {
            image = image.toDataURL();
        }
        if (!image) {
            return;
        }
        var x = style.x || 0;
        var y = style.y || 0;
        var dw = style.width;
        var dh = style.height;
        var svgEl = el.__svgEl;
        if (!svgEl) {
            svgEl = (0,_core__WEBPACK_IMPORTED_MODULE_3__.createElement)('image');
            el.__svgEl = svgEl;
        }
        if (image !== el.__imageSrc) {
            attrXLink(svgEl, 'href', image);
            el.__imageSrc = image;
        }
        attr(svgEl, 'width', dw + '');
        attr(svgEl, 'height', dh + '');
        attr(svgEl, 'x', x + '');
        attr(svgEl, 'y', y + '');
        bindStyle(svgEl, style, el);
        setTransform(svgEl, el.transform);
    }
};

var TEXT_ALIGN_TO_ANCHOR = {
    left: 'start',
    right: 'end',
    center: 'middle',
    middle: 'middle'
};
function adjustTextY(y, lineHeight, textBaseline) {
    if (textBaseline === 'top') {
        y += lineHeight / 2;
    }
    else if (textBaseline === 'bottom') {
        y -= lineHeight / 2;
    }
    return y;
}
var svgText = {
    brush: function (el) {
        var style = el.style;
        var text = style.text;
        text != null && (text += '');
        if (!text || isNaN(style.x) || isNaN(style.y)) {
            return;
        }
        var textSvgEl = el.__svgEl;
        if (!textSvgEl) {
            textSvgEl = (0,_core__WEBPACK_IMPORTED_MODULE_3__.createElement)('text');
            attrXML(textSvgEl, 'xml:space', 'preserve');
            el.__svgEl = textSvgEl;
        }
        var font = style.font || _contain_text__WEBPACK_IMPORTED_MODULE_4__.DEFAULT_FONT;
        var textSvgElStyle = textSvgEl.style;
        textSvgElStyle.font = font;
        textSvgEl.textContent = text;
        bindStyle(textSvgEl, style, el);
        setTransform(textSvgEl, el.transform);
        var x = style.x || 0;
        var y = adjustTextY(style.y || 0, (0,_contain_text__WEBPACK_IMPORTED_MODULE_4__.getLineHeight)(font), style.textBaseline);
        var textAlign = TEXT_ALIGN_TO_ANCHOR[style.textAlign]
            || style.textAlign;
        attr(textSvgEl, 'dominant-baseline', 'central');
        attr(textSvgEl, 'text-anchor', textAlign);
        attr(textSvgEl, 'x', x + '');
        attr(textSvgEl, 'y', y + '');
    }
};



/***/ }),

/***/ "./node_modules/zrender/lib/svg/helper/ClippathManager.js":
/*!****************************************************************!*\
  !*** ./node_modules/zrender/lib/svg/helper/ClippathManager.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hasClipPath": () => (/* binding */ hasClipPath),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Definable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Definable */ "./node_modules/zrender/lib/svg/helper/Definable.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _canvas_helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../canvas/helper */ "./node_modules/zrender/lib/canvas/helper.js");




function generateClipPathsKey(clipPaths) {
    var key = [];
    if (clipPaths) {
        for (var i = 0; i < clipPaths.length; i++) {
            var clipPath = clipPaths[i];
            key.push(clipPath.id);
        }
    }
    return key.join(',');
}
function hasClipPath(displayable) {
    var clipPaths = displayable.__clipPaths;
    return clipPaths && clipPaths.length > 0;
}
var ClippathManager = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(ClippathManager, _super);
    function ClippathManager(zrId, svgRoot) {
        var _this = _super.call(this, zrId, svgRoot, 'clipPath', '__clippath_in_use__') || this;
        _this._refGroups = {};
        _this._keyDuplicateCount = {};
        return _this;
    }
    ClippathManager.prototype.markAllUnused = function () {
        _super.prototype.markAllUnused.call(this);
        for (var key in this._refGroups) {
            this.markDomUnused(this._refGroups[key]);
        }
        this._keyDuplicateCount = {};
    };
    ClippathManager.prototype._getClipPathGroup = function (displayable, prevDisplayable) {
        if (!hasClipPath(displayable)) {
            return;
        }
        var clipPaths = displayable.__clipPaths;
        var keyDuplicateCount = this._keyDuplicateCount;
        var clipPathKey = generateClipPathsKey(clipPaths);
        if ((0,_canvas_helper__WEBPACK_IMPORTED_MODULE_1__.isClipPathChanged)(clipPaths, prevDisplayable && prevDisplayable.__clipPaths)) {
            keyDuplicateCount[clipPathKey] = keyDuplicateCount[clipPathKey] || 0;
            keyDuplicateCount[clipPathKey] && (clipPathKey += '-' + keyDuplicateCount[clipPathKey]);
            keyDuplicateCount[clipPathKey]++;
        }
        return this._refGroups[clipPathKey]
            || (this._refGroups[clipPathKey] = this.createElement('g'));
    };
    ClippathManager.prototype.update = function (displayable, prevDisplayable) {
        var clipGroup = this._getClipPathGroup(displayable, prevDisplayable);
        if (clipGroup) {
            this.markDomUsed(clipGroup);
            this.updateDom(clipGroup, displayable.__clipPaths);
        }
        return clipGroup;
    };
    ;
    ClippathManager.prototype.updateDom = function (parentEl, clipPaths) {
        if (clipPaths && clipPaths.length > 0) {
            var defs = this.getDefs(true);
            var clipPath = clipPaths[0];
            var clipPathEl = void 0;
            var id = void 0;
            if (clipPath._dom) {
                id = clipPath._dom.getAttribute('id');
                clipPathEl = clipPath._dom;
                if (!defs.contains(clipPathEl)) {
                    defs.appendChild(clipPathEl);
                }
            }
            else {
                id = 'zr' + this._zrId + '-clip-' + this.nextId;
                ++this.nextId;
                clipPathEl = this.createElement('clipPath');
                clipPathEl.setAttribute('id', id);
                defs.appendChild(clipPathEl);
                clipPath._dom = clipPathEl;
            }
            var svgProxy = this.getSvgProxy(clipPath);
            svgProxy.brush(clipPath);
            var pathEl = this.getSvgElement(clipPath);
            clipPathEl.innerHTML = '';
            clipPathEl.appendChild(pathEl);
            parentEl.setAttribute('clip-path', 'url(#' + id + ')');
            if (clipPaths.length > 1) {
                this.updateDom(clipPathEl, clipPaths.slice(1));
            }
        }
        else {
            if (parentEl) {
                parentEl.setAttribute('clip-path', 'none');
            }
        }
    };
    ;
    ClippathManager.prototype.markUsed = function (displayable) {
        var _this = this;
        if (displayable.__clipPaths) {
            _core_util__WEBPACK_IMPORTED_MODULE_2__.each(displayable.__clipPaths, function (clipPath) {
                if (clipPath._dom) {
                    _super.prototype.markDomUsed.call(_this, clipPath._dom);
                }
            });
        }
    };
    ;
    ClippathManager.prototype.removeUnused = function () {
        _super.prototype.removeUnused.call(this);
        var newRefGroupsMap = {};
        for (var key in this._refGroups) {
            var group = this._refGroups[key];
            if (!this.isDomUnused(group)) {
                newRefGroupsMap[key] = group;
            }
            else if (group.parentNode) {
                group.parentNode.removeChild(group);
            }
        }
        this._refGroups = newRefGroupsMap;
    };
    return ClippathManager;
}(_Definable__WEBPACK_IMPORTED_MODULE_3__.default));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ClippathManager);


/***/ }),

/***/ "./node_modules/zrender/lib/svg/helper/Definable.js":
/*!**********************************************************!*\
  !*** ./node_modules/zrender/lib/svg/helper/Definable.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core */ "./node_modules/zrender/lib/svg/core.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _graphic_Path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../graphic/Path */ "./node_modules/zrender/lib/graphic/Path.js");
/* harmony import */ var _graphic_Image__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../graphic/Image */ "./node_modules/zrender/lib/graphic/Image.js");
/* harmony import */ var _graphic_TSpan__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../graphic/TSpan */ "./node_modules/zrender/lib/graphic/TSpan.js");
/* harmony import */ var _graphic__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphic */ "./node_modules/zrender/lib/svg/graphic.js");






var MARK_UNUSED = '0';
var MARK_USED = '1';
var Definable = (function () {
    function Definable(zrId, svgRoot, tagNames, markLabel, domName) {
        this.nextId = 0;
        this._domName = '_dom';
        this.createElement = _core__WEBPACK_IMPORTED_MODULE_0__.createElement;
        this._zrId = zrId;
        this._svgRoot = svgRoot;
        this._tagNames = typeof tagNames === 'string' ? [tagNames] : tagNames;
        this._markLabel = markLabel;
        if (domName) {
            this._domName = domName;
        }
    }
    Definable.prototype.getDefs = function (isForceCreating) {
        var svgRoot = this._svgRoot;
        var defs = this._svgRoot.getElementsByTagName('defs');
        if (defs.length === 0) {
            if (isForceCreating) {
                var defs_1 = svgRoot.insertBefore(this.createElement('defs'), svgRoot.firstChild);
                if (!defs_1.contains) {
                    defs_1.contains = function (el) {
                        var children = defs_1.children;
                        if (!children) {
                            return false;
                        }
                        for (var i = children.length - 1; i >= 0; --i) {
                            if (children[i] === el) {
                                return true;
                            }
                        }
                        return false;
                    };
                }
                return defs_1;
            }
            else {
                return null;
            }
        }
        else {
            return defs[0];
        }
    };
    Definable.prototype.doUpdate = function (target, onUpdate) {
        if (!target) {
            return;
        }
        var defs = this.getDefs(false);
        if (target[this._domName] && defs.contains(target[this._domName])) {
            if (typeof onUpdate === 'function') {
                onUpdate(target);
            }
        }
        else {
            var dom = this.add(target);
            if (dom) {
                target[this._domName] = dom;
            }
        }
    };
    Definable.prototype.add = function (target) {
        return null;
    };
    Definable.prototype.addDom = function (dom) {
        var defs = this.getDefs(true);
        if (dom.parentNode !== defs) {
            defs.appendChild(dom);
        }
    };
    Definable.prototype.removeDom = function (target) {
        var defs = this.getDefs(false);
        if (defs && target[this._domName]) {
            defs.removeChild(target[this._domName]);
            target[this._domName] = null;
        }
    };
    Definable.prototype.getDoms = function () {
        var defs = this.getDefs(false);
        if (!defs) {
            return [];
        }
        var doms = [];
        _core_util__WEBPACK_IMPORTED_MODULE_1__.each(this._tagNames, function (tagName) {
            var tags = defs.getElementsByTagName(tagName);
            for (var i = 0; i < tags.length; i++) {
                doms.push(tags[i]);
            }
        });
        return doms;
    };
    Definable.prototype.markAllUnused = function () {
        var doms = this.getDoms();
        var that = this;
        _core_util__WEBPACK_IMPORTED_MODULE_1__.each(doms, function (dom) {
            dom[that._markLabel] = MARK_UNUSED;
        });
    };
    Definable.prototype.markDomUsed = function (dom) {
        dom && (dom[this._markLabel] = MARK_USED);
    };
    ;
    Definable.prototype.markDomUnused = function (dom) {
        dom && (dom[this._markLabel] = MARK_UNUSED);
    };
    ;
    Definable.prototype.isDomUnused = function (dom) {
        return dom && dom[this._markLabel] !== MARK_USED;
    };
    Definable.prototype.removeUnused = function () {
        var _this = this;
        var defs = this.getDefs(false);
        if (!defs) {
            return;
        }
        var doms = this.getDoms();
        _core_util__WEBPACK_IMPORTED_MODULE_1__.each(doms, function (dom) {
            if (_this.isDomUnused(dom)) {
                defs.removeChild(dom);
            }
        });
    };
    Definable.prototype.getSvgProxy = function (displayable) {
        if (displayable instanceof _graphic_Path__WEBPACK_IMPORTED_MODULE_2__.default) {
            return _graphic__WEBPACK_IMPORTED_MODULE_3__.path;
        }
        else if (displayable instanceof _graphic_Image__WEBPACK_IMPORTED_MODULE_4__.default) {
            return _graphic__WEBPACK_IMPORTED_MODULE_3__.image;
        }
        else if (displayable instanceof _graphic_TSpan__WEBPACK_IMPORTED_MODULE_5__.default) {
            return _graphic__WEBPACK_IMPORTED_MODULE_3__.text;
        }
        else {
            return _graphic__WEBPACK_IMPORTED_MODULE_3__.path;
        }
    };
    Definable.prototype.getSvgElement = function (displayable) {
        return displayable.__svgEl;
    };
    return Definable;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Definable);


/***/ }),

/***/ "./node_modules/zrender/lib/svg/helper/GradientManager.js":
/*!****************************************************************!*\
  !*** ./node_modules/zrender/lib/svg/helper/GradientManager.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Definable__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Definable */ "./node_modules/zrender/lib/svg/helper/Definable.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _tool_color__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../tool/color */ "./node_modules/zrender/lib/tool/color.js");




function isLinearGradient(value) {
    return value.type === 'linear';
}
function isRadialGradient(value) {
    return value.type === 'radial';
}
function isGradient(value) {
    return value && (value.type === 'linear'
        || value.type === 'radial');
}
var GradientManager = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(GradientManager, _super);
    function GradientManager(zrId, svgRoot) {
        return _super.call(this, zrId, svgRoot, ['linearGradient', 'radialGradient'], '__gradient_in_use__') || this;
    }
    GradientManager.prototype.addWithoutUpdate = function (svgElement, displayable) {
        if (displayable && displayable.style) {
            var that_1 = this;
            _core_util__WEBPACK_IMPORTED_MODULE_1__.each(['fill', 'stroke'], function (fillOrStroke) {
                var value = displayable.style[fillOrStroke];
                if (isGradient(value)) {
                    var gradient = value;
                    var defs = that_1.getDefs(true);
                    var dom = void 0;
                    if (gradient.__dom) {
                        dom = gradient.__dom;
                        if (!defs.contains(gradient.__dom)) {
                            that_1.addDom(dom);
                        }
                    }
                    else {
                        dom = that_1.add(gradient);
                    }
                    that_1.markUsed(displayable);
                    var id = dom.getAttribute('id');
                    svgElement.setAttribute(fillOrStroke, 'url(#' + id + ')');
                }
            });
        }
    };
    GradientManager.prototype.add = function (gradient) {
        var dom;
        if (isLinearGradient(gradient)) {
            dom = this.createElement('linearGradient');
        }
        else if (isRadialGradient(gradient)) {
            dom = this.createElement('radialGradient');
        }
        else {
            _core_util__WEBPACK_IMPORTED_MODULE_1__.logError('Illegal gradient type.');
            return null;
        }
        gradient.id = gradient.id || this.nextId++;
        dom.setAttribute('id', 'zr' + this._zrId
            + '-gradient-' + gradient.id);
        this.updateDom(gradient, dom);
        this.addDom(dom);
        return dom;
    };
    GradientManager.prototype.update = function (gradient) {
        if (!isGradient(gradient)) {
            return;
        }
        var that = this;
        this.doUpdate(gradient, function () {
            var dom = gradient.__dom;
            if (!dom) {
                return;
            }
            var tagName = dom.tagName;
            var type = gradient.type;
            if (type === 'linear' && tagName === 'linearGradient'
                || type === 'radial' && tagName === 'radialGradient') {
                that.updateDom(gradient, gradient.__dom);
            }
            else {
                that.removeDom(gradient);
                that.add(gradient);
            }
        });
    };
    GradientManager.prototype.updateDom = function (gradient, dom) {
        if (isLinearGradient(gradient)) {
            dom.setAttribute('x1', gradient.x + '');
            dom.setAttribute('y1', gradient.y + '');
            dom.setAttribute('x2', gradient.x2 + '');
            dom.setAttribute('y2', gradient.y2 + '');
        }
        else if (isRadialGradient(gradient)) {
            dom.setAttribute('cx', gradient.x + '');
            dom.setAttribute('cy', gradient.y + '');
            dom.setAttribute('r', gradient.r + '');
        }
        else {
            _core_util__WEBPACK_IMPORTED_MODULE_1__.logError('Illegal gradient type.');
            return;
        }
        if (gradient.global) {
            dom.setAttribute('gradientUnits', 'userSpaceOnUse');
        }
        else {
            dom.setAttribute('gradientUnits', 'objectBoundingBox');
        }
        dom.innerHTML = '';
        var colors = gradient.colorStops;
        for (var i = 0, len = colors.length; i < len; ++i) {
            var stop_1 = this.createElement('stop');
            stop_1.setAttribute('offset', colors[i].offset * 100 + '%');
            var color = colors[i].color;
            if (color.indexOf('rgba') > -1) {
                var opacity = _tool_color__WEBPACK_IMPORTED_MODULE_2__.parse(color)[3];
                var hex = _tool_color__WEBPACK_IMPORTED_MODULE_2__.toHex(color);
                stop_1.setAttribute('stop-color', '#' + hex);
                stop_1.setAttribute('stop-opacity', opacity + '');
            }
            else {
                stop_1.setAttribute('stop-color', colors[i].color);
            }
            dom.appendChild(stop_1);
        }
        gradient.__dom = dom;
    };
    GradientManager.prototype.markUsed = function (displayable) {
        if (displayable.style) {
            var gradient = displayable.style.fill;
            if (gradient && gradient.__dom) {
                _super.prototype.markDomUsed.call(this, gradient.__dom);
            }
            gradient = displayable.style.stroke;
            if (gradient && gradient.__dom) {
                _super.prototype.markDomUsed.call(this, gradient.__dom);
            }
        }
    };
    return GradientManager;
}(_Definable__WEBPACK_IMPORTED_MODULE_3__.default));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GradientManager);


/***/ }),

/***/ "./node_modules/zrender/lib/svg/helper/PatternManager.js":
/*!***************************************************************!*\
  !*** ./node_modules/zrender/lib/svg/helper/PatternManager.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Definable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Definable */ "./node_modules/zrender/lib/svg/helper/Definable.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _graphic_helper_image__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../graphic/helper/image */ "./node_modules/zrender/lib/graphic/helper/image.js");
/* harmony import */ var _core_WeakMap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/WeakMap */ "./node_modules/zrender/lib/core/WeakMap.js");





function isPattern(value) {
    return value && (!!value.image || !!value.svgElement);
}
var patternDomMap = new _core_WeakMap__WEBPACK_IMPORTED_MODULE_0__.default();
var PatternManager = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__extends)(PatternManager, _super);
    function PatternManager(zrId, svgRoot) {
        return _super.call(this, zrId, svgRoot, ['pattern'], '__pattern_in_use__') || this;
    }
    PatternManager.prototype.addWithoutUpdate = function (svgElement, displayable) {
        if (displayable && displayable.style) {
            var that_1 = this;
            _core_util__WEBPACK_IMPORTED_MODULE_2__.each(['fill', 'stroke'], function (fillOrStroke) {
                var pattern = displayable.style[fillOrStroke];
                if (isPattern(pattern)) {
                    var defs = that_1.getDefs(true);
                    var dom = patternDomMap.get(pattern);
                    if (dom) {
                        if (!defs.contains(dom)) {
                            that_1.addDom(dom);
                        }
                    }
                    else {
                        dom = that_1.add(pattern);
                    }
                    that_1.markUsed(displayable);
                    var id = dom.getAttribute('id');
                    svgElement.setAttribute(fillOrStroke, 'url(#' + id + ')');
                }
            });
        }
    };
    PatternManager.prototype.add = function (pattern) {
        if (!isPattern(pattern)) {
            return;
        }
        var dom = this.createElement('pattern');
        pattern.id = pattern.id == null ? this.nextId++ : pattern.id;
        dom.setAttribute('id', 'zr' + this._zrId
            + '-pattern-' + pattern.id);
        dom.setAttribute('x', '0');
        dom.setAttribute('y', '0');
        dom.setAttribute('patternUnits', 'userSpaceOnUse');
        this.updateDom(pattern, dom);
        this.addDom(dom);
        return dom;
    };
    PatternManager.prototype.update = function (pattern) {
        if (!isPattern(pattern)) {
            return;
        }
        var that = this;
        this.doUpdate(pattern, function () {
            var dom = patternDomMap.get(pattern);
            that.updateDom(pattern, dom);
        });
    };
    PatternManager.prototype.updateDom = function (pattern, patternDom) {
        var svgElement = pattern.svgElement;
        if (svgElement instanceof SVGElement) {
            if (svgElement.parentNode !== patternDom) {
                patternDom.innerHTML = '';
                patternDom.appendChild(svgElement);
                patternDom.setAttribute('width', pattern.svgWidth + '');
                patternDom.setAttribute('height', pattern.svgHeight + '');
            }
        }
        else {
            var img = void 0;
            var prevImage = patternDom.getElementsByTagName('image');
            if (prevImage.length) {
                if (pattern.image) {
                    img = prevImage[0];
                }
                else {
                    patternDom.removeChild(prevImage[0]);
                    return;
                }
            }
            else if (pattern.image) {
                img = this.createElement('image');
            }
            if (img) {
                var imageSrc = void 0;
                if (typeof pattern.image === 'string') {
                    imageSrc = pattern.image;
                }
                else if (pattern.image instanceof HTMLImageElement) {
                    imageSrc = pattern.image.src;
                }
                else if (pattern.image instanceof HTMLCanvasElement) {
                    imageSrc = pattern.image.toDataURL();
                }
                if (imageSrc) {
                    img.setAttribute('href', imageSrc);
                    img.setAttribute('x', '0');
                    img.setAttribute('y', '0');
                    var hostEl = {
                        dirty: function () { }
                    };
                    var createdImage = (0,_graphic_helper_image__WEBPACK_IMPORTED_MODULE_3__.createOrUpdateImage)(imageSrc, img, hostEl, function (img) {
                        patternDom.setAttribute('width', img.width + '');
                        patternDom.setAttribute('height', img.height + '');
                    });
                    if (createdImage && createdImage.width && createdImage.height) {
                        patternDom.setAttribute('width', createdImage.width + '');
                        patternDom.setAttribute('height', createdImage.height + '');
                    }
                    patternDom.appendChild(img);
                }
            }
        }
        var x = pattern.x || 0;
        var y = pattern.y || 0;
        var rotation = (pattern.rotation || 0) / Math.PI * 180;
        var scaleX = pattern.scaleX || 1;
        var scaleY = pattern.scaleY || 1;
        var transform = "translate(" + x + ", " + y + ") rotate(" + rotation + ") scale(" + scaleX + ", " + scaleY + ")";
        patternDom.setAttribute('patternTransform', transform);
        patternDomMap.set(pattern, patternDom);
    };
    PatternManager.prototype.markUsed = function (displayable) {
        if (displayable.style) {
            if (isPattern(displayable.style.fill)) {
                _super.prototype.markDomUsed.call(this, patternDomMap.get(displayable.style.fill));
            }
            if (isPattern(displayable.style.stroke)) {
                _super.prototype.markDomUsed.call(this, patternDomMap.get(displayable.style.stroke));
            }
        }
    };
    return PatternManager;
}(_Definable__WEBPACK_IMPORTED_MODULE_4__.default));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PatternManager);


/***/ }),

/***/ "./node_modules/zrender/lib/svg/helper/ShadowManager.js":
/*!**************************************************************!*\
  !*** ./node_modules/zrender/lib/svg/helper/ShadowManager.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Definable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Definable */ "./node_modules/zrender/lib/svg/helper/Definable.js");


var ShadowManager = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(ShadowManager, _super);
    function ShadowManager(zrId, svgRoot) {
        var _this = _super.call(this, zrId, svgRoot, ['filter'], '__filter_in_use__', '_shadowDom') || this;
        _this._shadowDomMap = {};
        _this._shadowDomPool = [];
        return _this;
    }
    ShadowManager.prototype._getFromPool = function () {
        var shadowDom = this._shadowDomPool.pop();
        if (!shadowDom) {
            shadowDom = this.createElement('filter');
            shadowDom.setAttribute('id', 'zr' + this._zrId + '-shadow-' + this.nextId++);
            var domChild = this.createElement('feDropShadow');
            shadowDom.appendChild(domChild);
            this.addDom(shadowDom);
        }
        return shadowDom;
    };
    ShadowManager.prototype.update = function (svgElement, displayable) {
        var style = displayable.style;
        if (hasShadow(style)) {
            var shadowKey = getShadowKey(displayable);
            var shadowDom = displayable._shadowDom = this._shadowDomMap[shadowKey];
            if (!shadowDom) {
                shadowDom = this._getFromPool();
                this._shadowDomMap[shadowKey] = shadowDom;
            }
            this.updateDom(svgElement, displayable, shadowDom);
        }
        else {
            this.remove(svgElement, displayable);
        }
    };
    ShadowManager.prototype.remove = function (svgElement, displayable) {
        if (displayable._shadowDom != null) {
            displayable._shadowDom = null;
            svgElement.style.filter = '';
        }
    };
    ShadowManager.prototype.updateDom = function (svgElement, displayable, shadowDom) {
        var domChild = shadowDom.children[0];
        var style = displayable.style;
        var globalScale = displayable.getGlobalScale();
        var scaleX = globalScale[0];
        var scaleY = globalScale[1];
        if (!scaleX || !scaleY) {
            return;
        }
        var offsetX = style.shadowOffsetX || 0;
        var offsetY = style.shadowOffsetY || 0;
        var blur = style.shadowBlur;
        var color = style.shadowColor;
        domChild.setAttribute('dx', offsetX / scaleX + '');
        domChild.setAttribute('dy', offsetY / scaleY + '');
        domChild.setAttribute('flood-color', color);
        var stdDx = blur / 2 / scaleX;
        var stdDy = blur / 2 / scaleY;
        var stdDeviation = stdDx + ' ' + stdDy;
        domChild.setAttribute('stdDeviation', stdDeviation);
        shadowDom.setAttribute('x', '-100%');
        shadowDom.setAttribute('y', '-100%');
        shadowDom.setAttribute('width', '300%');
        shadowDom.setAttribute('height', '300%');
        displayable._shadowDom = shadowDom;
        var id = shadowDom.getAttribute('id');
        svgElement.style.filter = 'url(#' + id + ')';
    };
    ShadowManager.prototype.removeUnused = function () {
        var defs = this.getDefs(false);
        if (!defs) {
            return;
        }
        var shadowDomsPool = this._shadowDomPool;
        for (var key in this._shadowDomMap) {
            var dom = this._shadowDomMap[key];
            shadowDomsPool.push(dom);
        }
        this._shadowDomMap = {};
    };
    return ShadowManager;
}(_Definable__WEBPACK_IMPORTED_MODULE_1__.default));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShadowManager);
function hasShadow(style) {
    return style
        && (style.shadowBlur || style.shadowOffsetX || style.shadowOffsetY);
}
function getShadowKey(displayable) {
    var style = displayable.style;
    var globalScale = displayable.getGlobalScale();
    return [
        style.shadowColor,
        (style.shadowBlur || 0).toFixed(2),
        (style.shadowOffsetX || 0).toFixed(2),
        (style.shadowOffsetY || 0).toFixed(2),
        globalScale[0],
        globalScale[1]
    ].join(',');
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2VjaGFydHMvbGliL2V4cG9ydC9yZW5kZXJlcnMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lY2hhcnRzL2xpYi9yZW5kZXJlci9pbnN0YWxsQ2FudmFzUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lY2hhcnRzL2xpYi9yZW5kZXJlci9pbnN0YWxsU1ZHUmVuZGVyZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9lY2hhcnRzL3JlbmRlcmVycy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL2NhbnZhcy9MYXllci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL2NhbnZhcy9QYWludGVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY29yZS9hcnJheURpZmYuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9zdmcvUGFpbnRlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL3N2Zy9jb3JlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvc3ZnL2dyYXBoaWMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9zdmcvaGVscGVyL0NsaXBwYXRoTWFuYWdlci5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL3N2Zy9oZWxwZXIvRGVmaW5hYmxlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvc3ZnL2hlbHBlci9HcmFkaWVudE1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9zdmcvaGVscGVyL1BhdHRlcm5NYW5hZ2VyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvc3ZnL2hlbHBlci9TaGFkb3dNYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUN3RTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDMUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ3VEO0FBQ2hEO0FBQ1Asc0NBQXNDLCtEQUFhO0FBQ25ELEM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixzQkFBc0I7QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvREFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUMyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQixvREFBYTtBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQzZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FB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QUFDQSxDQUFDLENBQUMsK0NBQVM7QUFDWCxpRUFBZSxjQUFjLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzFJSTtBQUNFO0FBQ3BDO0FBQ0EsSUFBSSxnREFBUztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxDQUFDLCtDQUFTO0FBQ1gsaUVBQWUsYUFBYSxFQUFDO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImRhc2hib2FyZC9qcy9kYXNoYm9hcmQ1NWI2NjI2NjkxNjJiZDA2NDc4NC5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuXG4vKipcbiAqIEFVVE8tR0VORVJBVEVEIEZJTEUuIERPIE5PVCBNT0RJRlkuXG4gKi9cblxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuZXhwb3J0IHsgaW5zdGFsbCBhcyBTVkdSZW5kZXJlciB9IGZyb20gJy4uL3JlbmRlcmVyL2luc3RhbGxTVkdSZW5kZXJlcic7XG5leHBvcnQgeyBpbnN0YWxsIGFzIENhbnZhc1JlbmRlcmVyIH0gZnJvbSAnLi4vcmVuZGVyZXIvaW5zdGFsbENhbnZhc1JlbmRlcmVyJzsiLCJcbi8qXG4qIExpY2Vuc2VkIHRvIHRoZSBBcGFjaGUgU29mdHdhcmUgRm91bmRhdGlvbiAoQVNGKSB1bmRlciBvbmVcbiogb3IgbW9yZSBjb250cmlidXRvciBsaWNlbnNlIGFncmVlbWVudHMuICBTZWUgdGhlIE5PVElDRSBmaWxlXG4qIGRpc3RyaWJ1dGVkIHdpdGggdGhpcyB3b3JrIGZvciBhZGRpdGlvbmFsIGluZm9ybWF0aW9uXG4qIHJlZ2FyZGluZyBjb3B5cmlnaHQgb3duZXJzaGlwLiAgVGhlIEFTRiBsaWNlbnNlcyB0aGlzIGZpbGVcbiogdG8geW91IHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZVxuKiBcIkxpY2Vuc2VcIik7IHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Vcbiogd2l0aCB0aGUgTGljZW5zZS4gIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxuKlxuKiAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxuKlxuKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsXG4qIHNvZnR3YXJlIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuXG4qIFwiQVMgSVNcIiBCQVNJUywgV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZXG4qIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuICBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZVxuKiBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kIGxpbWl0YXRpb25zXG4qIHVuZGVyIHRoZSBMaWNlbnNlLlxuKi9cblxuXG4vKipcbiAqIEFVVE8tR0VORVJBVEVEIEZJTEUuIERPIE5PVCBNT0RJRlkuXG4gKi9cblxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuaW1wb3J0IENhbnZhc1BhaW50ZXIgZnJvbSAnenJlbmRlci9saWIvY2FudmFzL1BhaW50ZXInO1xuZXhwb3J0IGZ1bmN0aW9uIGluc3RhbGwocmVnaXN0ZXJzKSB7XG4gIHJlZ2lzdGVycy5yZWdpc3RlclBhaW50ZXIoJ2NhbnZhcycsIENhbnZhc1BhaW50ZXIpO1xufSIsIlxuLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5cbi8qKlxuICogQVVUTy1HRU5FUkFURUQgRklMRS4gRE8gTk9UIE1PRElGWS5cbiAqL1xuXG4vKlxuKiBMaWNlbnNlZCB0byB0aGUgQXBhY2hlIFNvZnR3YXJlIEZvdW5kYXRpb24gKEFTRikgdW5kZXIgb25lXG4qIG9yIG1vcmUgY29udHJpYnV0b3IgbGljZW5zZSBhZ3JlZW1lbnRzLiAgU2VlIHRoZSBOT1RJQ0UgZmlsZVxuKiBkaXN0cmlidXRlZCB3aXRoIHRoaXMgd29yayBmb3IgYWRkaXRpb25hbCBpbmZvcm1hdGlvblxuKiByZWdhcmRpbmcgY29weXJpZ2h0IG93bmVyc2hpcC4gIFRoZSBBU0YgbGljZW5zZXMgdGhpcyBmaWxlXG4qIHRvIHlvdSB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGVcbiogXCJMaWNlbnNlXCIpOyB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlXG4qIHdpdGggdGhlIExpY2Vuc2UuICBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcbipcbiogICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcbipcbiogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLFxuKiBzb2Z0d2FyZSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhblxuKiBcIkFTIElTXCIgQkFTSVMsIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWVxuKiBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLiAgU2VlIHRoZSBMaWNlbnNlIGZvciB0aGVcbiogc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZCBsaW1pdGF0aW9uc1xuKiB1bmRlciB0aGUgTGljZW5zZS5cbiovXG5pbXBvcnQgU1ZHUGFpbnRlciBmcm9tICd6cmVuZGVyL2xpYi9zdmcvUGFpbnRlcic7XG5leHBvcnQgZnVuY3Rpb24gaW5zdGFsbChyZWdpc3RlcnMpIHtcbiAgcmVnaXN0ZXJzLnJlZ2lzdGVyUGFpbnRlcignc3ZnJywgU1ZHUGFpbnRlcik7XG59IiwiLypcbiogTGljZW5zZWQgdG8gdGhlIEFwYWNoZSBTb2Z0d2FyZSBGb3VuZGF0aW9uIChBU0YpIHVuZGVyIG9uZVxuKiBvciBtb3JlIGNvbnRyaWJ1dG9yIGxpY2Vuc2UgYWdyZWVtZW50cy4gIFNlZSB0aGUgTk9USUNFIGZpbGVcbiogZGlzdHJpYnV0ZWQgd2l0aCB0aGlzIHdvcmsgZm9yIGFkZGl0aW9uYWwgaW5mb3JtYXRpb25cbiogcmVnYXJkaW5nIGNvcHlyaWdodCBvd25lcnNoaXAuICBUaGUgQVNGIGxpY2Vuc2VzIHRoaXMgZmlsZVxuKiB0byB5b3UgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlXG4qIFwiTGljZW5zZVwiKTsgeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZVxuKiB3aXRoIHRoZSBMaWNlbnNlLiAgWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XG4qXG4qICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXG4qXG4qIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZyxcbiogc29mdHdhcmUgZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW5cbiogXCJBUyBJU1wiIEJBU0lTLCBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTllcbiogS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC4gIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlXG4qIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmQgbGltaXRhdGlvbnNcbiogdW5kZXIgdGhlIExpY2Vuc2UuXG4qL1xuXG5leHBvcnQgKiBmcm9tICcuL2xpYi9leHBvcnQvcmVuZGVyZXJzJzsiLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi4vY29yZS91dGlsJztcbmltcG9ydCB7IGRldmljZVBpeGVsUmF0aW8gfSBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IEV2ZW50ZnVsIGZyb20gJy4uL2NvcmUvRXZlbnRmdWwnO1xuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi4vRWxlbWVudCc7XG5pbXBvcnQgeyBnZXRDYW52YXNHcmFkaWVudCB9IGZyb20gJy4vaGVscGVyJztcbmltcG9ydCB7IGNyZWF0ZUNhbnZhc1BhdHRlcm4gfSBmcm9tICcuL2dyYXBoaWMnO1xuaW1wb3J0IEJvdW5kaW5nUmVjdCBmcm9tICcuLi9jb3JlL0JvdW5kaW5nUmVjdCc7XG5mdW5jdGlvbiByZXR1cm5GYWxzZSgpIHtcbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBjcmVhdGVEb20oaWQsIHBhaW50ZXIsIGRwcikge1xuICAgIHZhciBuZXdEb20gPSB1dGlsLmNyZWF0ZUNhbnZhcygpO1xuICAgIHZhciB3aWR0aCA9IHBhaW50ZXIuZ2V0V2lkdGgoKTtcbiAgICB2YXIgaGVpZ2h0ID0gcGFpbnRlci5nZXRIZWlnaHQoKTtcbiAgICB2YXIgbmV3RG9tU3R5bGUgPSBuZXdEb20uc3R5bGU7XG4gICAgaWYgKG5ld0RvbVN0eWxlKSB7XG4gICAgICAgIG5ld0RvbVN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgICAgbmV3RG9tU3R5bGUubGVmdCA9ICcwJztcbiAgICAgICAgbmV3RG9tU3R5bGUudG9wID0gJzAnO1xuICAgICAgICBuZXdEb21TdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgbmV3RG9tU3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgbmV3RG9tLnNldEF0dHJpYnV0ZSgnZGF0YS16ci1kb20taWQnLCBpZCk7XG4gICAgfVxuICAgIG5ld0RvbS53aWR0aCA9IHdpZHRoICogZHByO1xuICAgIG5ld0RvbS5oZWlnaHQgPSBoZWlnaHQgKiBkcHI7XG4gICAgcmV0dXJuIG5ld0RvbTtcbn1cbjtcbnZhciBMYXllciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKExheWVyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIExheWVyKGlkLCBwYWludGVyLCBkcHIpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMubW90aW9uQmx1ciA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5sYXN0RnJhbWVBbHBoYSA9IDAuNztcbiAgICAgICAgX3RoaXMuZHByID0gMTtcbiAgICAgICAgX3RoaXMudmlydHVhbCA9IGZhbHNlO1xuICAgICAgICBfdGhpcy5jb25maWcgPSB7fTtcbiAgICAgICAgX3RoaXMuaW5jcmVtZW50YWwgPSBmYWxzZTtcbiAgICAgICAgX3RoaXMuemxldmVsID0gMDtcbiAgICAgICAgX3RoaXMubWF4UmVwYWludFJlY3RDb3VudCA9IDU7XG4gICAgICAgIF90aGlzLl9fZGlydHkgPSB0cnVlO1xuICAgICAgICBfdGhpcy5fX2ZpcnN0VGltZVBhaW50ID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuX191c2VkID0gZmFsc2U7XG4gICAgICAgIF90aGlzLl9fZHJhd0luZGV4ID0gMDtcbiAgICAgICAgX3RoaXMuX19zdGFydEluZGV4ID0gMDtcbiAgICAgICAgX3RoaXMuX19lbmRJbmRleCA9IDA7XG4gICAgICAgIF90aGlzLl9fcHJldlN0YXJ0SW5kZXggPSBudWxsO1xuICAgICAgICBfdGhpcy5fX3ByZXZFbmRJbmRleCA9IG51bGw7XG4gICAgICAgIHZhciBkb207XG4gICAgICAgIGRwciA9IGRwciB8fCBkZXZpY2VQaXhlbFJhdGlvO1xuICAgICAgICBpZiAodHlwZW9mIGlkID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgZG9tID0gY3JlYXRlRG9tKGlkLCBwYWludGVyLCBkcHIpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHV0aWwuaXNPYmplY3QoaWQpKSB7XG4gICAgICAgICAgICBkb20gPSBpZDtcbiAgICAgICAgICAgIGlkID0gZG9tLmlkO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLmlkID0gaWQ7XG4gICAgICAgIF90aGlzLmRvbSA9IGRvbTtcbiAgICAgICAgdmFyIGRvbVN0eWxlID0gZG9tLnN0eWxlO1xuICAgICAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgICAgICAgIGRvbS5vbnNlbGVjdHN0YXJ0ID0gcmV0dXJuRmFsc2U7XG4gICAgICAgICAgICBkb21TdHlsZS53ZWJraXRVc2VyU2VsZWN0ID0gJ25vbmUnO1xuICAgICAgICAgICAgZG9tU3R5bGUudXNlclNlbGVjdCA9ICdub25lJztcbiAgICAgICAgICAgIGRvbVN0eWxlLndlYmtpdFRhcEhpZ2hsaWdodENvbG9yID0gJ3JnYmEoMCwwLDAsMCknO1xuICAgICAgICAgICAgZG9tU3R5bGVbJy13ZWJraXQtdG91Y2gtY2FsbG91dCddID0gJ25vbmUnO1xuICAgICAgICAgICAgZG9tU3R5bGUucGFkZGluZyA9ICcwJztcbiAgICAgICAgICAgIGRvbVN0eWxlLm1hcmdpbiA9ICcwJztcbiAgICAgICAgICAgIGRvbVN0eWxlLmJvcmRlcldpZHRoID0gJzAnO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLmRvbUJhY2sgPSBudWxsO1xuICAgICAgICBfdGhpcy5jdHhCYWNrID0gbnVsbDtcbiAgICAgICAgX3RoaXMucGFpbnRlciA9IHBhaW50ZXI7XG4gICAgICAgIF90aGlzLmNvbmZpZyA9IG51bGw7XG4gICAgICAgIF90aGlzLmRwciA9IGRwcjtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBMYXllci5wcm90b3R5cGUuZ2V0RWxlbWVudENvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fX2VuZEluZGV4IC0gdGhpcy5fX3N0YXJ0SW5kZXg7XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuYWZ0ZXJCcnVzaCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fX3ByZXZTdGFydEluZGV4ID0gdGhpcy5fX3N0YXJ0SW5kZXg7XG4gICAgICAgIHRoaXMuX19wcmV2RW5kSW5kZXggPSB0aGlzLl9fZW5kSW5kZXg7XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuaW5pdENvbnRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY3R4ID0gdGhpcy5kb20uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdGhpcy5jdHguZHByID0gdGhpcy5kcHI7XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuc2V0VW5wYWludGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9fZmlyc3RUaW1lUGFpbnQgPSB0cnVlO1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLmNyZWF0ZUJhY2tCdWZmZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkcHIgPSB0aGlzLmRwcjtcbiAgICAgICAgdGhpcy5kb21CYWNrID0gY3JlYXRlRG9tKCdiYWNrLScgKyB0aGlzLmlkLCB0aGlzLnBhaW50ZXIsIGRwcik7XG4gICAgICAgIHRoaXMuY3R4QmFjayA9IHRoaXMuZG9tQmFjay5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICBpZiAoZHByICE9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmN0eEJhY2suc2NhbGUoZHByLCBkcHIpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBMYXllci5wcm90b3R5cGUuY3JlYXRlUmVwYWludFJlY3RzID0gZnVuY3Rpb24gKGRpc3BsYXlMaXN0LCBwcmV2TGlzdCwgdmlld1dpZHRoLCB2aWV3SGVpZ2h0KSB7XG4gICAgICAgIGlmICh0aGlzLl9fZmlyc3RUaW1lUGFpbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX19maXJzdFRpbWVQYWludCA9IGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG1lcmdlZFJlcGFpbnRSZWN0cyA9IFtdO1xuICAgICAgICB2YXIgbWF4UmVwYWludFJlY3RDb3VudCA9IHRoaXMubWF4UmVwYWludFJlY3RDb3VudDtcbiAgICAgICAgdmFyIGZ1bGwgPSBmYWxzZTtcbiAgICAgICAgdmFyIHBlbmRpbmdSZWN0ID0gbmV3IEJvdW5kaW5nUmVjdCgwLCAwLCAwLCAwKTtcbiAgICAgICAgZnVuY3Rpb24gYWRkUmVjdFRvTWVyZ2VQb29sKHJlY3QpIHtcbiAgICAgICAgICAgIGlmICghcmVjdC5pc0Zpbml0ZSgpIHx8IHJlY3QuaXNaZXJvKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobWVyZ2VkUmVwYWludFJlY3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHZhciBib3VuZGluZ1JlY3QgPSBuZXcgQm91bmRpbmdSZWN0KDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgIGJvdW5kaW5nUmVjdC5jb3B5KHJlY3QpO1xuICAgICAgICAgICAgICAgIG1lcmdlZFJlcGFpbnRSZWN0cy5wdXNoKGJvdW5kaW5nUmVjdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgaXNNZXJnZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB2YXIgbWluRGVsdGFBcmVhID0gSW5maW5pdHk7XG4gICAgICAgICAgICAgICAgdmFyIGJlc3RSZWN0VG9NZXJnZUlkeCA9IDA7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXJnZWRSZXBhaW50UmVjdHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG1lcmdlZFJlY3QgPSBtZXJnZWRSZXBhaW50UmVjdHNbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChtZXJnZWRSZWN0LmludGVyc2VjdChyZWN0KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBlbmRpbmdSZWN0XzEgPSBuZXcgQm91bmRpbmdSZWN0KDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlY3RfMS5jb3B5KG1lcmdlZFJlY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlY3RfMS51bmlvbihyZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlZFJlcGFpbnRSZWN0c1tpXSA9IHBlbmRpbmdSZWN0XzE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc01lcmdlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChmdWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwZW5kaW5nUmVjdC5jb3B5KHJlY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGVuZGluZ1JlY3QudW5pb24obWVyZ2VkUmVjdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYUFyZWEgPSByZWN0LndpZHRoICogcmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYkFyZWEgPSBtZXJnZWRSZWN0LndpZHRoICogbWVyZ2VkUmVjdC5oZWlnaHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGVuZGluZ0FyZWEgPSBwZW5kaW5nUmVjdC53aWR0aCAqIHBlbmRpbmdSZWN0LmhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkZWx0YUFyZWEgPSBwZW5kaW5nQXJlYSAtIGFBcmVhIC0gYkFyZWE7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGVsdGFBcmVhIDwgbWluRGVsdGFBcmVhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWluRGVsdGFBcmVhID0gZGVsdGFBcmVhO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlc3RSZWN0VG9NZXJnZUlkeCA9IGk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGZ1bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgbWVyZ2VkUmVwYWludFJlY3RzW2Jlc3RSZWN0VG9NZXJnZUlkeF0udW5pb24ocmVjdCk7XG4gICAgICAgICAgICAgICAgICAgIGlzTWVyZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc01lcmdlZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYm91bmRpbmdSZWN0ID0gbmV3IEJvdW5kaW5nUmVjdCgwLCAwLCAwLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgYm91bmRpbmdSZWN0LmNvcHkocmVjdCk7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlZFJlcGFpbnRSZWN0cy5wdXNoKGJvdW5kaW5nUmVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZnVsbCkge1xuICAgICAgICAgICAgICAgICAgICBmdWxsID0gbWVyZ2VkUmVwYWludFJlY3RzLmxlbmd0aCA+PSBtYXhSZXBhaW50UmVjdENvdW50O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5fX3N0YXJ0SW5kZXg7IGkgPCB0aGlzLl9fZW5kSW5kZXg7ICsraSkge1xuICAgICAgICAgICAgdmFyIGVsID0gZGlzcGxheUxpc3RbaV07XG4gICAgICAgICAgICBpZiAoZWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2hvdWxkUGFpbnQgPSBlbC5zaG91bGRCZVBhaW50ZWQodmlld1dpZHRoLCB2aWV3SGVpZ2h0LCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB2YXIgcHJldlJlY3QgPSBlbC5fX2lzUmVuZGVyZWQgJiYgKChlbC5fX2RpcnR5ICYgRWxlbWVudC5SRURBUkFXX0JJVCkgfHwgIXNob3VsZFBhaW50KVxuICAgICAgICAgICAgICAgICAgICA/IGVsLmdldFByZXZQYWludFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKHByZXZSZWN0KSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFJlY3RUb01lcmdlUG9vbChwcmV2UmVjdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjdXJSZWN0ID0gc2hvdWxkUGFpbnQgJiYgKChlbC5fX2RpcnR5ICYgRWxlbWVudC5SRURBUkFXX0JJVCkgfHwgIWVsLl9faXNSZW5kZXJlZClcbiAgICAgICAgICAgICAgICAgICAgPyBlbC5nZXRQYWludFJlY3QoKVxuICAgICAgICAgICAgICAgICAgICA6IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGN1clJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkUmVjdFRvTWVyZ2VQb29sKGN1clJlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5fX3ByZXZTdGFydEluZGV4OyBpIDwgdGhpcy5fX3ByZXZFbmRJbmRleDsgKytpKSB7XG4gICAgICAgICAgICB2YXIgZWwgPSBwcmV2TGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBzaG91bGRQYWludCA9IGVsLnNob3VsZEJlUGFpbnRlZCh2aWV3V2lkdGgsIHZpZXdIZWlnaHQsIHRydWUsIHRydWUpO1xuICAgICAgICAgICAgaWYgKGVsICYmICghc2hvdWxkUGFpbnQgfHwgIWVsLl9fenIpICYmIGVsLl9faXNSZW5kZXJlZCkge1xuICAgICAgICAgICAgICAgIHZhciBwcmV2UmVjdCA9IGVsLmdldFByZXZQYWludFJlY3QoKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldlJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgYWRkUmVjdFRvTWVyZ2VQb29sKHByZXZSZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGhhc0ludGVyc2VjdGlvbnM7XG4gICAgICAgIGRvIHtcbiAgICAgICAgICAgIGhhc0ludGVyc2VjdGlvbnMgPSBmYWxzZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbWVyZ2VkUmVwYWludFJlY3RzLmxlbmd0aDspIHtcbiAgICAgICAgICAgICAgICBpZiAobWVyZ2VkUmVwYWludFJlY3RzW2ldLmlzWmVybygpKSB7XG4gICAgICAgICAgICAgICAgICAgIG1lcmdlZFJlcGFpbnRSZWN0cy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IgKHZhciBqID0gaSArIDE7IGogPCBtZXJnZWRSZXBhaW50UmVjdHMubGVuZ3RoOykge1xuICAgICAgICAgICAgICAgICAgICBpZiAobWVyZ2VkUmVwYWludFJlY3RzW2ldLmludGVyc2VjdChtZXJnZWRSZXBhaW50UmVjdHNbal0pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNJbnRlcnNlY3Rpb25zID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1lcmdlZFJlcGFpbnRSZWN0c1tpXS51bmlvbihtZXJnZWRSZXBhaW50UmVjdHNbal0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgbWVyZ2VkUmVwYWludFJlY3RzLnNwbGljZShqLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGorKztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpKys7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gd2hpbGUgKGhhc0ludGVyc2VjdGlvbnMpO1xuICAgICAgICB0aGlzLl9wYWludFJlY3RzID0gbWVyZ2VkUmVwYWludFJlY3RzO1xuICAgICAgICByZXR1cm4gbWVyZ2VkUmVwYWludFJlY3RzO1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLmRlYnVnR2V0UGFpbnRSZWN0cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICh0aGlzLl9wYWludFJlY3RzIHx8IFtdKS5zbGljZSgpO1xuICAgIH07XG4gICAgTGF5ZXIucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHZhciBkcHIgPSB0aGlzLmRwcjtcbiAgICAgICAgdmFyIGRvbSA9IHRoaXMuZG9tO1xuICAgICAgICB2YXIgZG9tU3R5bGUgPSBkb20uc3R5bGU7XG4gICAgICAgIHZhciBkb21CYWNrID0gdGhpcy5kb21CYWNrO1xuICAgICAgICBpZiAoZG9tU3R5bGUpIHtcbiAgICAgICAgICAgIGRvbVN0eWxlLndpZHRoID0gd2lkdGggKyAncHgnO1xuICAgICAgICAgICAgZG9tU3R5bGUuaGVpZ2h0ID0gaGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgfVxuICAgICAgICBkb20ud2lkdGggPSB3aWR0aCAqIGRwcjtcbiAgICAgICAgZG9tLmhlaWdodCA9IGhlaWdodCAqIGRwcjtcbiAgICAgICAgaWYgKGRvbUJhY2spIHtcbiAgICAgICAgICAgIGRvbUJhY2sud2lkdGggPSB3aWR0aCAqIGRwcjtcbiAgICAgICAgICAgIGRvbUJhY2suaGVpZ2h0ID0gaGVpZ2h0ICogZHByO1xuICAgICAgICAgICAgaWYgKGRwciAhPT0gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3R4QmFjay5zY2FsZShkcHIsIGRwcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExheWVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uIChjbGVhckFsbCwgY2xlYXJDb2xvciwgcmVwYWludFJlY3RzKSB7XG4gICAgICAgIHZhciBkb20gPSB0aGlzLmRvbTtcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuY3R4O1xuICAgICAgICB2YXIgd2lkdGggPSBkb20ud2lkdGg7XG4gICAgICAgIHZhciBoZWlnaHQgPSBkb20uaGVpZ2h0O1xuICAgICAgICBjbGVhckNvbG9yID0gY2xlYXJDb2xvciB8fCB0aGlzLmNsZWFyQ29sb3I7XG4gICAgICAgIHZhciBoYXZlTW90aW9uQkx1ciA9IHRoaXMubW90aW9uQmx1ciAmJiAhY2xlYXJBbGw7XG4gICAgICAgIHZhciBsYXN0RnJhbWVBbHBoYSA9IHRoaXMubGFzdEZyYW1lQWxwaGE7XG4gICAgICAgIHZhciBkcHIgPSB0aGlzLmRwcjtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBpZiAoaGF2ZU1vdGlvbkJMdXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kb21CYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVCYWNrQnVmZmVyKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmN0eEJhY2suZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gJ2NvcHknO1xuICAgICAgICAgICAgdGhpcy5jdHhCYWNrLmRyYXdJbWFnZShkb20sIDAsIDAsIHdpZHRoIC8gZHByLCBoZWlnaHQgLyBkcHIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkb21CYWNrID0gdGhpcy5kb21CYWNrO1xuICAgICAgICBmdW5jdGlvbiBkb0NsZWFyKHgsIHksIHdpZHRoLCBoZWlnaHQpIHtcbiAgICAgICAgICAgIGN0eC5jbGVhclJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICBpZiAoY2xlYXJDb2xvciAmJiBjbGVhckNvbG9yICE9PSAndHJhbnNwYXJlbnQnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNsZWFyQ29sb3JHcmFkaWVudE9yUGF0dGVybiA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICBpZiAodXRpbC5pc0dyYWRpZW50T2JqZWN0KGNsZWFyQ29sb3IpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ29sb3JHcmFkaWVudE9yUGF0dGVybiA9IGNsZWFyQ29sb3IuX19jYW52YXNHcmFkaWVudFxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgZ2V0Q2FudmFzR3JhZGllbnQoY3R4LCBjbGVhckNvbG9yLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IGhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGNsZWFyQ29sb3IuX19jYW52YXNHcmFkaWVudCA9IGNsZWFyQ29sb3JHcmFkaWVudE9yUGF0dGVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodXRpbC5pc1BhdHRlcm5PYmplY3QoY2xlYXJDb2xvcikpIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJDb2xvckdyYWRpZW50T3JQYXR0ZXJuID0gY3JlYXRlQ2FudmFzUGF0dGVybihjdHgsIGNsZWFyQ29sb3IsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpcnR5OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5zZXRVbnBhaW50ZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZWxmLl9fcGFpbnRlci5yZWZyZXNoKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgICAgIGN0eC5maWxsU3R5bGUgPSBjbGVhckNvbG9yR3JhZGllbnRPclBhdHRlcm4gfHwgY2xlYXJDb2xvcjtcbiAgICAgICAgICAgICAgICBjdHguZmlsbFJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChoYXZlTW90aW9uQkx1cikge1xuICAgICAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gbGFzdEZyYW1lQWxwaGE7XG4gICAgICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShkb21CYWNrLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIDtcbiAgICAgICAgaWYgKCFyZXBhaW50UmVjdHMgfHwgaGF2ZU1vdGlvbkJMdXIpIHtcbiAgICAgICAgICAgIGRvQ2xlYXIoMCwgMCwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVwYWludFJlY3RzLmxlbmd0aCkge1xuICAgICAgICAgICAgdXRpbC5lYWNoKHJlcGFpbnRSZWN0cywgZnVuY3Rpb24gKHJlY3QpIHtcbiAgICAgICAgICAgICAgICBkb0NsZWFyKHJlY3QueCAqIGRwciwgcmVjdC55ICogZHByLCByZWN0LndpZHRoICogZHByLCByZWN0LmhlaWdodCAqIGRwcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIExheWVyO1xufShFdmVudGZ1bCkpO1xuZXhwb3J0IGRlZmF1bHQgTGF5ZXI7XG4iLCJpbXBvcnQgeyBkZXZpY2VQaXhlbFJhdGlvIH0gZnJvbSAnLi4vY29uZmlnJztcbmltcG9ydCAqIGFzIHV0aWwgZnJvbSAnLi4vY29yZS91dGlsJztcbmltcG9ydCBMYXllciBmcm9tICcuL0xheWVyJztcbmltcG9ydCByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgZnJvbSAnLi4vYW5pbWF0aW9uL3JlcXVlc3RBbmltYXRpb25GcmFtZSc7XG5pbXBvcnQgWlJJbWFnZSBmcm9tICcuLi9ncmFwaGljL0ltYWdlJztcbmltcG9ydCBlbnYgZnJvbSAnLi4vY29yZS9lbnYnO1xuaW1wb3J0IHsgYnJ1c2gsIGJydXNoU2luZ2xlIH0gZnJvbSAnLi9ncmFwaGljJztcbmltcG9ydCBFbGVtZW50IGZyb20gJy4uL0VsZW1lbnQnO1xudmFyIEhPVkVSX0xBWUVSX1pMRVZFTCA9IDFlNTtcbnZhciBDQU5WQVNfWkxFVkVMID0gMzE0MTU5O1xudmFyIEVMX0FGVEVSX0lOQ1JFTUVOVEFMX0lOQyA9IDAuMDE7XG52YXIgSU5DUkVNRU5UQUxfSU5DID0gMC4wMDE7XG5mdW5jdGlvbiBwYXJzZUludDEwKHZhbCkge1xuICAgIHJldHVybiBwYXJzZUludCh2YWwsIDEwKTtcbn1cbmZ1bmN0aW9uIGlzTGF5ZXJWYWxpZChsYXllcikge1xuICAgIGlmICghbGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAobGF5ZXIuX19idWlsdGluX18pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgKGxheWVyLnJlc2l6ZSkgIT09ICdmdW5jdGlvbidcbiAgICAgICAgfHwgdHlwZW9mIChsYXllci5yZWZyZXNoKSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gY3JlYXRlUm9vdCh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgdmFyIGRvbVJvb3QgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb21Sb290LnN0eWxlLmNzc1RleHQgPSBbXG4gICAgICAgICdwb3NpdGlvbjpyZWxhdGl2ZScsXG4gICAgICAgICd3aWR0aDonICsgd2lkdGggKyAncHgnLFxuICAgICAgICAnaGVpZ2h0OicgKyBoZWlnaHQgKyAncHgnLFxuICAgICAgICAncGFkZGluZzowJyxcbiAgICAgICAgJ21hcmdpbjowJyxcbiAgICAgICAgJ2JvcmRlci13aWR0aDowJ1xuICAgIF0uam9pbignOycpICsgJzsnO1xuICAgIHJldHVybiBkb21Sb290O1xufVxudmFyIENhbnZhc1BhaW50ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbnZhc1BhaW50ZXIocm9vdCwgc3RvcmFnZSwgb3B0cywgaWQpIHtcbiAgICAgICAgdGhpcy50eXBlID0gJ2NhbnZhcyc7XG4gICAgICAgIHRoaXMuX3psZXZlbExpc3QgPSBbXTtcbiAgICAgICAgdGhpcy5fcHJldkRpc3BsYXlMaXN0ID0gW107XG4gICAgICAgIHRoaXMuX2xheWVycyA9IHt9O1xuICAgICAgICB0aGlzLl9sYXllckNvbmZpZyA9IHt9O1xuICAgICAgICB0aGlzLl9uZWVkc01hbnVhbGx5Q29tcG9zaXRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy50eXBlID0gJ2NhbnZhcyc7XG4gICAgICAgIHZhciBzaW5nbGVDYW52YXMgPSAhcm9vdC5ub2RlTmFtZVxuICAgICAgICAgICAgfHwgcm9vdC5ub2RlTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnQ0FOVkFTJztcbiAgICAgICAgdGhpcy5fb3B0cyA9IG9wdHMgPSB1dGlsLmV4dGVuZCh7fSwgb3B0cyB8fCB7fSk7XG4gICAgICAgIHRoaXMuZHByID0gb3B0cy5kZXZpY2VQaXhlbFJhdGlvIHx8IGRldmljZVBpeGVsUmF0aW87XG4gICAgICAgIHRoaXMuX3NpbmdsZUNhbnZhcyA9IHNpbmdsZUNhbnZhcztcbiAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgdmFyIHJvb3RTdHlsZSA9IHJvb3Quc3R5bGU7XG4gICAgICAgIGlmIChyb290U3R5bGUpIHtcbiAgICAgICAgICAgIHJvb3RTdHlsZS53ZWJraXRUYXBIaWdobGlnaHRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgICAgICByb290U3R5bGUud2Via2l0VXNlclNlbGVjdCA9ICdub25lJztcbiAgICAgICAgICAgIHJvb3RTdHlsZS51c2VyU2VsZWN0ID0gJ25vbmUnO1xuICAgICAgICAgICAgcm9vdFN0eWxlWyctd2Via2l0LXRvdWNoLWNhbGxvdXQnXSA9ICdub25lJztcbiAgICAgICAgICAgIHJvb3QuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zdG9yYWdlID0gc3RvcmFnZTtcbiAgICAgICAgdmFyIHpsZXZlbExpc3QgPSB0aGlzLl96bGV2ZWxMaXN0O1xuICAgICAgICB0aGlzLl9wcmV2RGlzcGxheUxpc3QgPSBbXTtcbiAgICAgICAgdmFyIGxheWVycyA9IHRoaXMuX2xheWVycztcbiAgICAgICAgaWYgKCFzaW5nbGVDYW52YXMpIHtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gdGhpcy5fZ2V0U2l6ZSgwKTtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IHRoaXMuX2dldFNpemUoMSk7XG4gICAgICAgICAgICB2YXIgZG9tUm9vdCA9IHRoaXMuX2RvbVJvb3QgPSBjcmVhdGVSb290KHRoaXMuX3dpZHRoLCB0aGlzLl9oZWlnaHQpO1xuICAgICAgICAgICAgcm9vdC5hcHBlbmRDaGlsZChkb21Sb290KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciByb290Q2FudmFzID0gcm9vdDtcbiAgICAgICAgICAgIHZhciB3aWR0aCA9IHJvb3RDYW52YXMud2lkdGg7XG4gICAgICAgICAgICB2YXIgaGVpZ2h0ID0gcm9vdENhbnZhcy5oZWlnaHQ7XG4gICAgICAgICAgICBpZiAob3B0cy53aWR0aCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgd2lkdGggPSBvcHRzLndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKG9wdHMuaGVpZ2h0ICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICBoZWlnaHQgPSBvcHRzLmhlaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZHByID0gb3B0cy5kZXZpY2VQaXhlbFJhdGlvIHx8IDE7XG4gICAgICAgICAgICByb290Q2FudmFzLndpZHRoID0gd2lkdGggKiB0aGlzLmRwcjtcbiAgICAgICAgICAgIHJvb3RDYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogdGhpcy5kcHI7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgdmFyIG1haW5MYXllciA9IG5ldyBMYXllcihyb290Q2FudmFzLCB0aGlzLCB0aGlzLmRwcik7XG4gICAgICAgICAgICBtYWluTGF5ZXIuX19idWlsdGluX18gPSB0cnVlO1xuICAgICAgICAgICAgbWFpbkxheWVyLmluaXRDb250ZXh0KCk7XG4gICAgICAgICAgICBsYXllcnNbQ0FOVkFTX1pMRVZFTF0gPSBtYWluTGF5ZXI7XG4gICAgICAgICAgICBtYWluTGF5ZXIuemxldmVsID0gQ0FOVkFTX1pMRVZFTDtcbiAgICAgICAgICAgIHpsZXZlbExpc3QucHVzaChDQU5WQVNfWkxFVkVMKTtcbiAgICAgICAgICAgIHRoaXMuX2RvbVJvb3QgPSByb290O1xuICAgICAgICB9XG4gICAgfVxuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLmdldFR5cGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnY2FudmFzJztcbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLmlzU2luZ2xlQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2luZ2xlQ2FudmFzO1xuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUuZ2V0Vmlld3BvcnRSb290ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZG9tUm9vdDtcbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLmdldFZpZXdwb3J0Um9vdE9mZnNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHZpZXdwb3J0Um9vdCA9IHRoaXMuZ2V0Vmlld3BvcnRSb290KCk7XG4gICAgICAgIGlmICh2aWV3cG9ydFJvb3QpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb2Zmc2V0TGVmdDogdmlld3BvcnRSb290Lm9mZnNldExlZnQgfHwgMCxcbiAgICAgICAgICAgICAgICBvZmZzZXRUb3A6IHZpZXdwb3J0Um9vdC5vZmZzZXRUb3AgfHwgMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUucmVmcmVzaCA9IGZ1bmN0aW9uIChwYWludEFsbCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RvcmFnZS5nZXREaXNwbGF5TGlzdCh0cnVlKTtcbiAgICAgICAgdmFyIHByZXZMaXN0ID0gdGhpcy5fcHJldkRpc3BsYXlMaXN0O1xuICAgICAgICB2YXIgemxldmVsTGlzdCA9IHRoaXMuX3psZXZlbExpc3Q7XG4gICAgICAgIHRoaXMuX3JlZHJhd0lkID0gTWF0aC5yYW5kb20oKTtcbiAgICAgICAgdGhpcy5fcGFpbnRMaXN0KGxpc3QsIHByZXZMaXN0LCBwYWludEFsbCwgdGhpcy5fcmVkcmF3SWQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHpsZXZlbExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB6ID0gemxldmVsTGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1t6XTtcbiAgICAgICAgICAgIGlmICghbGF5ZXIuX19idWlsdGluX18gJiYgbGF5ZXIucmVmcmVzaCkge1xuICAgICAgICAgICAgICAgIHZhciBjbGVhckNvbG9yID0gaSA9PT0gMCA/IHRoaXMuX2JhY2tncm91bmRDb2xvciA6IG51bGw7XG4gICAgICAgICAgICAgICAgbGF5ZXIucmVmcmVzaChjbGVhckNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fb3B0cy51c2VEaXJ0eVJlY3QpIHtcbiAgICAgICAgICAgIHRoaXMuX3ByZXZEaXNwbGF5TGlzdCA9IGxpc3Quc2xpY2UoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLnJlZnJlc2hIb3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fcGFpbnRIb3Zlckxpc3QodGhpcy5zdG9yYWdlLmdldERpc3BsYXlMaXN0KGZhbHNlKSk7XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5fcGFpbnRIb3Zlckxpc3QgPSBmdW5jdGlvbiAobGlzdCkge1xuICAgICAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciBob3ZlckxheWVyID0gdGhpcy5faG92ZXJsYXllcjtcbiAgICAgICAgaG92ZXJMYXllciAmJiBob3ZlckxheWVyLmNsZWFyKCk7XG4gICAgICAgIGlmICghbGVuKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNjb3BlID0ge1xuICAgICAgICAgICAgaW5Ib3ZlcjogdHJ1ZSxcbiAgICAgICAgICAgIHZpZXdXaWR0aDogdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICB2aWV3SGVpZ2h0OiB0aGlzLl9oZWlnaHRcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGN0eDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmFyIGVsID0gbGlzdFtpXTtcbiAgICAgICAgICAgIGlmIChlbC5fX2luSG92ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAoIWhvdmVyTGF5ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgaG92ZXJMYXllciA9IHRoaXMuX2hvdmVybGF5ZXIgPSB0aGlzLmdldExheWVyKEhPVkVSX0xBWUVSX1pMRVZFTCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghY3R4KSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eCA9IGhvdmVyTGF5ZXIuY3R4O1xuICAgICAgICAgICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicnVzaChjdHgsIGVsLCBzY29wZSwgaSA9PT0gbGVuIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0eCkge1xuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUuZ2V0SG92ZXJMYXllciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TGF5ZXIoSE9WRVJfTEFZRVJfWkxFVkVMKTtcbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLnBhaW50T25lID0gZnVuY3Rpb24gKGN0eCwgZWwpIHtcbiAgICAgICAgYnJ1c2hTaW5nbGUoY3R4LCBlbCk7XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5fcGFpbnRMaXN0ID0gZnVuY3Rpb24gKGxpc3QsIHByZXZMaXN0LCBwYWludEFsbCwgcmVkcmF3SWQpIHtcbiAgICAgICAgaWYgKHRoaXMuX3JlZHJhd0lkICE9PSByZWRyYXdJZCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHBhaW50QWxsID0gcGFpbnRBbGwgfHwgZmFsc2U7XG4gICAgICAgIHRoaXMuX3VwZGF0ZUxheWVyU3RhdHVzKGxpc3QpO1xuICAgICAgICB2YXIgX2EgPSB0aGlzLl9kb1BhaW50TGlzdChsaXN0LCBwcmV2TGlzdCwgcGFpbnRBbGwpLCBmaW5pc2hlZCA9IF9hLmZpbmlzaGVkLCBuZWVkc1JlZnJlc2hIb3ZlciA9IF9hLm5lZWRzUmVmcmVzaEhvdmVyO1xuICAgICAgICBpZiAodGhpcy5fbmVlZHNNYW51YWxseUNvbXBvc2l0aW5nKSB7XG4gICAgICAgICAgICB0aGlzLl9jb21wb3NpdGVNYW51YWxseSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuZWVkc1JlZnJlc2hIb3Zlcikge1xuICAgICAgICAgICAgdGhpcy5fcGFpbnRIb3Zlckxpc3QobGlzdCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFmaW5pc2hlZCkge1xuICAgICAgICAgICAgdmFyIHNlbGZfMSA9IHRoaXM7XG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGZfMS5fcGFpbnRMaXN0KGxpc3QsIHByZXZMaXN0LCBwYWludEFsbCwgcmVkcmF3SWQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmVhY2hMYXllcihmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBsYXllci5hZnRlckJydXNoICYmIGxheWVyLmFmdGVyQnJ1c2goKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5fY29tcG9zaXRlTWFudWFsbHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjdHggPSB0aGlzLmdldExheWVyKENBTlZBU19aTEVWRUwpLmN0eDtcbiAgICAgICAgdmFyIHdpZHRoID0gdGhpcy5fZG9tUm9vdC53aWR0aDtcbiAgICAgICAgdmFyIGhlaWdodCA9IHRoaXMuX2RvbVJvb3QuaGVpZ2h0O1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB0aGlzLmVhY2hCdWlsdGluTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICBpZiAobGF5ZXIudmlydHVhbCkge1xuICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UobGF5ZXIuZG9tLCAwLCAwLCB3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5fZG9QYWludExpc3QgPSBmdW5jdGlvbiAobGlzdCwgcHJldkxpc3QsIHBhaW50QWxsKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBsYXllckxpc3QgPSBbXTtcbiAgICAgICAgdmFyIHVzZURpcnR5UmVjdCA9IHRoaXMuX29wdHMudXNlRGlydHlSZWN0O1xuICAgICAgICBmb3IgKHZhciB6aSA9IDA7IHppIDwgdGhpcy5femxldmVsTGlzdC5sZW5ndGg7IHppKyspIHtcbiAgICAgICAgICAgIHZhciB6bGV2ZWwgPSB0aGlzLl96bGV2ZWxMaXN0W3ppXTtcbiAgICAgICAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1t6bGV2ZWxdO1xuICAgICAgICAgICAgaWYgKGxheWVyLl9fYnVpbHRpbl9fXG4gICAgICAgICAgICAgICAgJiYgbGF5ZXIgIT09IHRoaXMuX2hvdmVybGF5ZXJcbiAgICAgICAgICAgICAgICAmJiAobGF5ZXIuX19kaXJ0eSB8fCBwYWludEFsbCkpIHtcbiAgICAgICAgICAgICAgICBsYXllckxpc3QucHVzaChsYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgdmFyIG5lZWRzUmVmcmVzaEhvdmVyID0gZmFsc2U7XG4gICAgICAgIHZhciBfbG9vcF8xID0gZnVuY3Rpb24gKGspIHtcbiAgICAgICAgICAgIHZhciBsYXllciA9IGxheWVyTGlzdFtrXTtcbiAgICAgICAgICAgIHZhciBjdHggPSBsYXllci5jdHg7XG4gICAgICAgICAgICB2YXIgcmVwYWludFJlY3RzID0gdXNlRGlydHlSZWN0XG4gICAgICAgICAgICAgICAgJiYgbGF5ZXIuY3JlYXRlUmVwYWludFJlY3RzKGxpc3QsIHByZXZMaXN0LCB0aGlzXzEuX3dpZHRoLCB0aGlzXzEuX2hlaWdodCk7XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gcGFpbnRBbGwgPyBsYXllci5fX3N0YXJ0SW5kZXggOiBsYXllci5fX2RyYXdJbmRleDtcbiAgICAgICAgICAgIHZhciB1c2VUaW1lciA9ICFwYWludEFsbCAmJiBsYXllci5pbmNyZW1lbnRhbCAmJiBEYXRlLm5vdztcbiAgICAgICAgICAgIHZhciBzdGFydFRpbWUgPSB1c2VUaW1lciAmJiBEYXRlLm5vdygpO1xuICAgICAgICAgICAgdmFyIGNsZWFyQ29sb3IgPSBsYXllci56bGV2ZWwgPT09IHRoaXNfMS5femxldmVsTGlzdFswXVxuICAgICAgICAgICAgICAgID8gdGhpc18xLl9iYWNrZ3JvdW5kQ29sb3IgOiBudWxsO1xuICAgICAgICAgICAgaWYgKGxheWVyLl9fc3RhcnRJbmRleCA9PT0gbGF5ZXIuX19lbmRJbmRleCkge1xuICAgICAgICAgICAgICAgIGxheWVyLmNsZWFyKGZhbHNlLCBjbGVhckNvbG9yLCByZXBhaW50UmVjdHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoc3RhcnQgPT09IGxheWVyLl9fc3RhcnRJbmRleCkge1xuICAgICAgICAgICAgICAgIHZhciBmaXJzdEVsID0gbGlzdFtzdGFydF07XG4gICAgICAgICAgICAgICAgaWYgKCFmaXJzdEVsLmluY3JlbWVudGFsIHx8ICFmaXJzdEVsLm5vdENsZWFyIHx8IHBhaW50QWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmNsZWFyKGZhbHNlLCBjbGVhckNvbG9yLCByZXBhaW50UmVjdHMpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChzdGFydCA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdGb3Igc29tZSB1bmtub3duIHJlYXNvbi4gZHJhd0luZGV4IGlzIC0xJyk7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBsYXllci5fX3N0YXJ0SW5kZXg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaTtcbiAgICAgICAgICAgIHZhciByZXBhaW50ID0gZnVuY3Rpb24gKHJlcGFpbnRSZWN0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHNjb3BlID0ge1xuICAgICAgICAgICAgICAgICAgICBpbkhvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgYWxsQ2xpcHBlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIHByZXZFbDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdmlld1dpZHRoOiBfdGhpcy5fd2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdIZWlnaHQ6IF90aGlzLl9oZWlnaHRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgbGF5ZXIuX19lbmRJbmRleDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IGxpc3RbaV07XG4gICAgICAgICAgICAgICAgICAgIGlmIChlbC5fX2luSG92ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5lZWRzUmVmcmVzaEhvdmVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBfdGhpcy5fZG9QYWludEVsKGVsLCBsYXllciwgdXNlRGlydHlSZWN0LCByZXBhaW50UmVjdCwgc2NvcGUsIGkgPT09IGxheWVyLl9fZW5kSW5kZXggLSAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVzZVRpbWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZFRpbWUgPSBEYXRlLm5vdygpIC0gc3RhcnRUaW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRUaW1lID4gMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc2NvcGUucHJldkVsQ2xpcFBhdGhzKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmIChyZXBhaW50UmVjdHMpIHtcbiAgICAgICAgICAgICAgICBpZiAocmVwYWludFJlY3RzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICBpID0gbGF5ZXIuX19lbmRJbmRleDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkcHIgPSB0aGlzXzEuZHByO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciByID0gMDsgciA8IHJlcGFpbnRSZWN0cy5sZW5ndGg7ICsrcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlY3QgPSByZXBhaW50UmVjdHNbcl07XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJlY3QocmVjdC54ICogZHByLCByZWN0LnkgKiBkcHIsIHJlY3Qud2lkdGggKiBkcHIsIHJlY3QuaGVpZ2h0ICogZHByKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5jbGlwKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXBhaW50KHJlY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgcmVwYWludCgpO1xuICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXllci5fX2RyYXdJbmRleCA9IGk7XG4gICAgICAgICAgICBpZiAobGF5ZXIuX19kcmF3SW5kZXggPCBsYXllci5fX2VuZEluZGV4KSB7XG4gICAgICAgICAgICAgICAgZmluaXNoZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIHRoaXNfMSA9IHRoaXM7XG4gICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgbGF5ZXJMaXN0Lmxlbmd0aDsgaysrKSB7XG4gICAgICAgICAgICBfbG9vcF8xKGspO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlbnYud3hhKSB7XG4gICAgICAgICAgICB1dGlsLmVhY2godGhpcy5fbGF5ZXJzLCBmdW5jdGlvbiAobGF5ZXIpIHtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIgJiYgbGF5ZXIuY3R4ICYmIGxheWVyLmN0eC5kcmF3KSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLmN0eC5kcmF3KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZpbmlzaGVkOiBmaW5pc2hlZCxcbiAgICAgICAgICAgIG5lZWRzUmVmcmVzaEhvdmVyOiBuZWVkc1JlZnJlc2hIb3ZlclxuICAgICAgICB9O1xuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUuX2RvUGFpbnRFbCA9IGZ1bmN0aW9uIChlbCwgY3VycmVudExheWVyLCB1c2VEaXJ0eVJlY3QsIHJlcGFpbnRSZWN0LCBzY29wZSwgaXNMYXN0KSB7XG4gICAgICAgIHZhciBjdHggPSBjdXJyZW50TGF5ZXIuY3R4O1xuICAgICAgICBpZiAodXNlRGlydHlSZWN0KSB7XG4gICAgICAgICAgICB2YXIgcGFpbnRSZWN0ID0gZWwuZ2V0UGFpbnRSZWN0KCk7XG4gICAgICAgICAgICBpZiAoIXJlcGFpbnRSZWN0IHx8IHBhaW50UmVjdCAmJiBwYWludFJlY3QuaW50ZXJzZWN0KHJlcGFpbnRSZWN0KSkge1xuICAgICAgICAgICAgICAgIGJydXNoKGN0eCwgZWwsIHNjb3BlLCBpc0xhc3QpO1xuICAgICAgICAgICAgICAgIGVsLnNldFByZXZQYWludFJlY3QocGFpbnRSZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGJydXNoKGN0eCwgZWwsIHNjb3BlLCBpc0xhc3QpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5nZXRMYXllciA9IGZ1bmN0aW9uICh6bGV2ZWwsIHZpcnR1YWwpIHtcbiAgICAgICAgaWYgKHRoaXMuX3NpbmdsZUNhbnZhcyAmJiAhdGhpcy5fbmVlZHNNYW51YWxseUNvbXBvc2l0aW5nKSB7XG4gICAgICAgICAgICB6bGV2ZWwgPSBDQU5WQVNfWkxFVkVMO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1t6bGV2ZWxdO1xuICAgICAgICBpZiAoIWxheWVyKSB7XG4gICAgICAgICAgICBsYXllciA9IG5ldyBMYXllcignenJfJyArIHpsZXZlbCwgdGhpcywgdGhpcy5kcHIpO1xuICAgICAgICAgICAgbGF5ZXIuemxldmVsID0gemxldmVsO1xuICAgICAgICAgICAgbGF5ZXIuX19idWlsdGluX18gPSB0cnVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuX2xheWVyQ29uZmlnW3psZXZlbF0pIHtcbiAgICAgICAgICAgICAgICB1dGlsLm1lcmdlKGxheWVyLCB0aGlzLl9sYXllckNvbmZpZ1t6bGV2ZWxdLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuX2xheWVyQ29uZmlnW3psZXZlbCAtIEVMX0FGVEVSX0lOQ1JFTUVOVEFMX0lOQ10pIHtcbiAgICAgICAgICAgICAgICB1dGlsLm1lcmdlKGxheWVyLCB0aGlzLl9sYXllckNvbmZpZ1t6bGV2ZWwgLSBFTF9BRlRFUl9JTkNSRU1FTlRBTF9JTkNdLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2aXJ0dWFsKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIudmlydHVhbCA9IHZpcnR1YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmluc2VydExheWVyKHpsZXZlbCwgbGF5ZXIpO1xuICAgICAgICAgICAgbGF5ZXIuaW5pdENvbnRleHQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGF5ZXI7XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5pbnNlcnRMYXllciA9IGZ1bmN0aW9uICh6bGV2ZWwsIGxheWVyKSB7XG4gICAgICAgIHZhciBsYXllcnNNYXAgPSB0aGlzLl9sYXllcnM7XG4gICAgICAgIHZhciB6bGV2ZWxMaXN0ID0gdGhpcy5femxldmVsTGlzdDtcbiAgICAgICAgdmFyIGxlbiA9IHpsZXZlbExpc3QubGVuZ3RoO1xuICAgICAgICB2YXIgZG9tUm9vdCA9IHRoaXMuX2RvbVJvb3Q7XG4gICAgICAgIHZhciBwcmV2TGF5ZXIgPSBudWxsO1xuICAgICAgICB2YXIgaSA9IC0xO1xuICAgICAgICBpZiAobGF5ZXJzTWFwW3psZXZlbF0pIHtcbiAgICAgICAgICAgIHV0aWwubG9nRXJyb3IoJ1pMZXZlbCAnICsgemxldmVsICsgJyBoYXMgYmVlbiB1c2VkIGFscmVhZHknKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWlzTGF5ZXJWYWxpZChsYXllcikpIHtcbiAgICAgICAgICAgIHV0aWwubG9nRXJyb3IoJ0xheWVyIG9mIHpsZXZlbCAnICsgemxldmVsICsgJyBpcyBub3QgdmFsaWQnKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGVuID4gMCAmJiB6bGV2ZWwgPiB6bGV2ZWxMaXN0WzBdKSB7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuIC0gMTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHpsZXZlbExpc3RbaV0gPCB6bGV2ZWxcbiAgICAgICAgICAgICAgICAgICAgJiYgemxldmVsTGlzdFtpICsgMV0gPiB6bGV2ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJldkxheWVyID0gbGF5ZXJzTWFwW3psZXZlbExpc3RbaV1dO1xuICAgICAgICB9XG4gICAgICAgIHpsZXZlbExpc3Quc3BsaWNlKGkgKyAxLCAwLCB6bGV2ZWwpO1xuICAgICAgICBsYXllcnNNYXBbemxldmVsXSA9IGxheWVyO1xuICAgICAgICBpZiAoIWxheWVyLnZpcnR1YWwpIHtcbiAgICAgICAgICAgIGlmIChwcmV2TGF5ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJldkRvbSA9IHByZXZMYXllci5kb207XG4gICAgICAgICAgICAgICAgaWYgKHByZXZEb20ubmV4dFNpYmxpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgZG9tUm9vdC5pbnNlcnRCZWZvcmUobGF5ZXIuZG9tLCBwcmV2RG9tLm5leHRTaWJsaW5nKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVJvb3QuYXBwZW5kQ2hpbGQobGF5ZXIuZG9tKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZG9tUm9vdC5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVJvb3QuaW5zZXJ0QmVmb3JlKGxheWVyLmRvbSwgZG9tUm9vdC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRvbVJvb3QuYXBwZW5kQ2hpbGQobGF5ZXIuZG9tKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIuX19wYWludGVyID0gdGhpcztcbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLmVhY2hMYXllciA9IGZ1bmN0aW9uIChjYiwgY29udGV4dCkge1xuICAgICAgICB2YXIgemxldmVsTGlzdCA9IHRoaXMuX3psZXZlbExpc3Q7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgemxldmVsTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHogPSB6bGV2ZWxMaXN0W2ldO1xuICAgICAgICAgICAgY2IuY2FsbChjb250ZXh0LCB0aGlzLl9sYXllcnNbel0sIHopO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5lYWNoQnVpbHRpbkxheWVyID0gZnVuY3Rpb24gKGNiLCBjb250ZXh0KSB7XG4gICAgICAgIHZhciB6bGV2ZWxMaXN0ID0gdGhpcy5femxldmVsTGlzdDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB6bGV2ZWxMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgeiA9IHpsZXZlbExpc3RbaV07XG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSB0aGlzLl9sYXllcnNbel07XG4gICAgICAgICAgICBpZiAobGF5ZXIuX19idWlsdGluX18pIHtcbiAgICAgICAgICAgICAgICBjYi5jYWxsKGNvbnRleHQsIGxheWVyLCB6KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUuZWFjaE90aGVyTGF5ZXIgPSBmdW5jdGlvbiAoY2IsIGNvbnRleHQpIHtcbiAgICAgICAgdmFyIHpsZXZlbExpc3QgPSB0aGlzLl96bGV2ZWxMaXN0O1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHpsZXZlbExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciB6ID0gemxldmVsTGlzdFtpXTtcbiAgICAgICAgICAgIHZhciBsYXllciA9IHRoaXMuX2xheWVyc1t6XTtcbiAgICAgICAgICAgIGlmICghbGF5ZXIuX19idWlsdGluX18pIHtcbiAgICAgICAgICAgICAgICBjYi5jYWxsKGNvbnRleHQsIGxheWVyLCB6KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUuZ2V0TGF5ZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJzO1xuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUuX3VwZGF0ZUxheWVyU3RhdHVzID0gZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgdGhpcy5lYWNoQnVpbHRpbkxheWVyKGZ1bmN0aW9uIChsYXllciwgeikge1xuICAgICAgICAgICAgbGF5ZXIuX19kaXJ0eSA9IGxheWVyLl9fdXNlZCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlUHJldkxheWVyKGlkeCkge1xuICAgICAgICAgICAgaWYgKHByZXZMYXllcikge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2TGF5ZXIuX19lbmRJbmRleCAhPT0gaWR4KSB7XG4gICAgICAgICAgICAgICAgICAgIHByZXZMYXllci5fX2RpcnR5ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcHJldkxheWVyLl9fZW5kSW5kZXggPSBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3NpbmdsZUNhbnZhcykge1xuICAgICAgICAgICAgZm9yICh2YXIgaV8xID0gMTsgaV8xIDwgbGlzdC5sZW5ndGg7IGlfMSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGVsID0gbGlzdFtpXzFdO1xuICAgICAgICAgICAgICAgIGlmIChlbC56bGV2ZWwgIT09IGxpc3RbaV8xIC0gMV0uemxldmVsIHx8IGVsLmluY3JlbWVudGFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25lZWRzTWFudWFsbHlDb21wb3NpdGluZyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldkxheWVyID0gbnVsbDtcbiAgICAgICAgdmFyIGluY3JlbWVudGFsTGF5ZXJDb3VudCA9IDA7XG4gICAgICAgIHZhciBwcmV2WmxldmVsO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBlbCA9IGxpc3RbaV07XG4gICAgICAgICAgICB2YXIgemxldmVsID0gZWwuemxldmVsO1xuICAgICAgICAgICAgdmFyIGxheWVyID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKHByZXZabGV2ZWwgIT09IHpsZXZlbCkge1xuICAgICAgICAgICAgICAgIHByZXZabGV2ZWwgPSB6bGV2ZWw7XG4gICAgICAgICAgICAgICAgaW5jcmVtZW50YWxMYXllckNvdW50ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChlbC5pbmNyZW1lbnRhbCkge1xuICAgICAgICAgICAgICAgIGxheWVyID0gdGhpcy5nZXRMYXllcih6bGV2ZWwgKyBJTkNSRU1FTlRBTF9JTkMsIHRoaXMuX25lZWRzTWFudWFsbHlDb21wb3NpdGluZyk7XG4gICAgICAgICAgICAgICAgbGF5ZXIuaW5jcmVtZW50YWwgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGluY3JlbWVudGFsTGF5ZXJDb3VudCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsYXllciA9IHRoaXMuZ2V0TGF5ZXIoemxldmVsICsgKGluY3JlbWVudGFsTGF5ZXJDb3VudCA+IDAgPyBFTF9BRlRFUl9JTkNSRU1FTlRBTF9JTkMgOiAwKSwgdGhpcy5fbmVlZHNNYW51YWxseUNvbXBvc2l0aW5nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghbGF5ZXIuX19idWlsdGluX18pIHtcbiAgICAgICAgICAgICAgICB1dGlsLmxvZ0Vycm9yKCdaTGV2ZWwgJyArIHpsZXZlbCArICcgaGFzIGJlZW4gdXNlZCBieSB1bmtvd24gbGF5ZXIgJyArIGxheWVyLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChsYXllciAhPT0gcHJldkxheWVyKSB7XG4gICAgICAgICAgICAgICAgbGF5ZXIuX191c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpZiAobGF5ZXIuX19zdGFydEluZGV4ICE9PSBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLl9fZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsYXllci5fX3N0YXJ0SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIGlmICghbGF5ZXIuaW5jcmVtZW50YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuX19kcmF3SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuX19kcmF3SW5kZXggPSAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdXBkYXRlUHJldkxheWVyKGkpO1xuICAgICAgICAgICAgICAgIHByZXZMYXllciA9IGxheWVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChlbC5fX2RpcnR5ICYgRWxlbWVudC5SRURBUkFXX0JJVCkgJiYgIWVsLl9faW5Ib3Zlcikge1xuICAgICAgICAgICAgICAgIGxheWVyLl9fZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlmIChsYXllci5pbmNyZW1lbnRhbCAmJiBsYXllci5fX2RyYXdJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXIuX19kcmF3SW5kZXggPSBpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVQcmV2TGF5ZXIoaSk7XG4gICAgICAgIHRoaXMuZWFjaEJ1aWx0aW5MYXllcihmdW5jdGlvbiAobGF5ZXIsIHopIHtcbiAgICAgICAgICAgIGlmICghbGF5ZXIuX191c2VkICYmIGxheWVyLmdldEVsZW1lbnRDb3VudCgpID4gMCkge1xuICAgICAgICAgICAgICAgIGxheWVyLl9fZGlydHkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxheWVyLl9fc3RhcnRJbmRleCA9IGxheWVyLl9fZW5kSW5kZXggPSBsYXllci5fX2RyYXdJbmRleCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGF5ZXIuX19kaXJ0eSAmJiBsYXllci5fX2RyYXdJbmRleCA8IDApIHtcbiAgICAgICAgICAgICAgICBsYXllci5fX2RyYXdJbmRleCA9IGxheWVyLl9fc3RhcnRJbmRleDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5lYWNoQnVpbHRpbkxheWVyKHRoaXMuX2NsZWFyTGF5ZXIpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLl9jbGVhckxheWVyID0gZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgIGxheWVyLmNsZWFyKCk7XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5zZXRCYWNrZ3JvdW5kQ29sb3IgPSBmdW5jdGlvbiAoYmFja2dyb3VuZENvbG9yKSB7XG4gICAgICAgIHRoaXMuX2JhY2tncm91bmRDb2xvciA9IGJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdXRpbC5lYWNoKHRoaXMuX2xheWVycywgZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICBsYXllci5zZXRVbnBhaW50ZWQoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5jb25maWdMYXllciA9IGZ1bmN0aW9uICh6bGV2ZWwsIGNvbmZpZykge1xuICAgICAgICBpZiAoY29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXJDb25maWcgPSB0aGlzLl9sYXllckNvbmZpZztcbiAgICAgICAgICAgIGlmICghbGF5ZXJDb25maWdbemxldmVsXSkge1xuICAgICAgICAgICAgICAgIGxheWVyQ29uZmlnW3psZXZlbF0gPSBjb25maWc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB1dGlsLm1lcmdlKGxheWVyQ29uZmlnW3psZXZlbF0sIGNvbmZpZywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3psZXZlbExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgX3psZXZlbCA9IHRoaXMuX3psZXZlbExpc3RbaV07XG4gICAgICAgICAgICAgICAgaWYgKF96bGV2ZWwgPT09IHpsZXZlbCB8fCBfemxldmVsID09PSB6bGV2ZWwgKyBFTF9BRlRFUl9JTkNSRU1FTlRBTF9JTkMpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW196bGV2ZWxdO1xuICAgICAgICAgICAgICAgICAgICB1dGlsLm1lcmdlKGxheWVyLCBsYXllckNvbmZpZ1t6bGV2ZWxdLCB0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLmRlbExheWVyID0gZnVuY3Rpb24gKHpsZXZlbCkge1xuICAgICAgICB2YXIgbGF5ZXJzID0gdGhpcy5fbGF5ZXJzO1xuICAgICAgICB2YXIgemxldmVsTGlzdCA9IHRoaXMuX3psZXZlbExpc3Q7XG4gICAgICAgIHZhciBsYXllciA9IGxheWVyc1t6bGV2ZWxdO1xuICAgICAgICBpZiAoIWxheWVyKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGF5ZXIuZG9tLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQobGF5ZXIuZG9tKTtcbiAgICAgICAgZGVsZXRlIGxheWVyc1t6bGV2ZWxdO1xuICAgICAgICB6bGV2ZWxMaXN0LnNwbGljZSh1dGlsLmluZGV4T2YoemxldmVsTGlzdCwgemxldmVsKSwgMSk7XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5yZXNpemUgPSBmdW5jdGlvbiAod2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAoIXRoaXMuX2RvbVJvb3Quc3R5bGUpIHtcbiAgICAgICAgICAgIGlmICh3aWR0aCA9PSBudWxsIHx8IGhlaWdodCA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSB3aWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgICAgIHRoaXMuZ2V0TGF5ZXIoQ0FOVkFTX1pMRVZFTCkucmVzaXplKHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGRvbVJvb3QgPSB0aGlzLl9kb21Sb290O1xuICAgICAgICAgICAgZG9tUm9vdC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgdmFyIG9wdHMgPSB0aGlzLl9vcHRzO1xuICAgICAgICAgICAgd2lkdGggIT0gbnVsbCAmJiAob3B0cy53aWR0aCA9IHdpZHRoKTtcbiAgICAgICAgICAgIGhlaWdodCAhPSBudWxsICYmIChvcHRzLmhlaWdodCA9IGhlaWdodCk7XG4gICAgICAgICAgICB3aWR0aCA9IHRoaXMuX2dldFNpemUoMCk7XG4gICAgICAgICAgICBoZWlnaHQgPSB0aGlzLl9nZXRTaXplKDEpO1xuICAgICAgICAgICAgZG9tUm9vdC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgICAgICAgICBpZiAodGhpcy5fd2lkdGggIT09IHdpZHRoIHx8IGhlaWdodCAhPT0gdGhpcy5faGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgZG9tUm9vdC5zdHlsZS53aWR0aCA9IHdpZHRoICsgJ3B4JztcbiAgICAgICAgICAgICAgICBkb21Sb290LnN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaWQgaW4gdGhpcy5fbGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLl9sYXllcnMuaGFzT3duUHJvcGVydHkoaWQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sYXllcnNbaWRdLnJlc2l6ZSh3aWR0aCwgaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnJlZnJlc2godHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUuY2xlYXJMYXllciA9IGZ1bmN0aW9uICh6bGV2ZWwpIHtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5fbGF5ZXJzW3psZXZlbF07XG4gICAgICAgIGlmIChsYXllcikge1xuICAgICAgICAgICAgbGF5ZXIuY2xlYXIoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yb290LmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLnJvb3QgPVxuICAgICAgICAgICAgdGhpcy5zdG9yYWdlID1cbiAgICAgICAgICAgICAgICB0aGlzLl9kb21Sb290ID1cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbGF5ZXJzID0gbnVsbDtcbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLmdldFJlbmRlcmVkQ2FudmFzID0gZnVuY3Rpb24gKG9wdHMpIHtcbiAgICAgICAgb3B0cyA9IG9wdHMgfHwge307XG4gICAgICAgIGlmICh0aGlzLl9zaW5nbGVDYW52YXMgJiYgIXRoaXMuX2NvbXBvc2l0ZU1hbnVhbGx5KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJzW0NBTlZBU19aTEVWRUxdLmRvbTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaW1hZ2VMYXllciA9IG5ldyBMYXllcignaW1hZ2UnLCB0aGlzLCBvcHRzLnBpeGVsUmF0aW8gfHwgdGhpcy5kcHIpO1xuICAgICAgICBpbWFnZUxheWVyLmluaXRDb250ZXh0KCk7XG4gICAgICAgIGltYWdlTGF5ZXIuY2xlYXIoZmFsc2UsIG9wdHMuYmFja2dyb3VuZENvbG9yIHx8IHRoaXMuX2JhY2tncm91bmRDb2xvcik7XG4gICAgICAgIHZhciBjdHggPSBpbWFnZUxheWVyLmN0eDtcbiAgICAgICAgaWYgKG9wdHMucGl4ZWxSYXRpbyA8PSB0aGlzLmRwcikge1xuICAgICAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgICAgICB2YXIgd2lkdGhfMSA9IGltYWdlTGF5ZXIuZG9tLndpZHRoO1xuICAgICAgICAgICAgdmFyIGhlaWdodF8xID0gaW1hZ2VMYXllci5kb20uaGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5lYWNoTGF5ZXIoZnVuY3Rpb24gKGxheWVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxheWVyLl9fYnVpbHRpbl9fKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5kcmF3SW1hZ2UobGF5ZXIuZG9tLCAwLCAwLCB3aWR0aF8xLCBoZWlnaHRfMSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGxheWVyLnJlbmRlclRvQ2FudmFzKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyLnJlbmRlclRvQ2FudmFzKGN0eCk7XG4gICAgICAgICAgICAgICAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc2NvcGUgPSB7XG4gICAgICAgICAgICAgICAgaW5Ib3ZlcjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlld1dpZHRoOiB0aGlzLl93aWR0aCxcbiAgICAgICAgICAgICAgICB2aWV3SGVpZ2h0OiB0aGlzLl9oZWlnaHRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgZGlzcGxheUxpc3QgPSB0aGlzLnN0b3JhZ2UuZ2V0RGlzcGxheUxpc3QodHJ1ZSk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gZGlzcGxheUxpc3QubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBkaXNwbGF5TGlzdFtpXTtcbiAgICAgICAgICAgICAgICBicnVzaChjdHgsIGVsLCBzY29wZSwgaSA9PT0gbGVuIC0gMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGltYWdlTGF5ZXIuZG9tO1xuICAgIH07XG4gICAgQ2FudmFzUGFpbnRlci5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLmdldEhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICB9O1xuICAgIENhbnZhc1BhaW50ZXIucHJvdG90eXBlLl9nZXRTaXplID0gZnVuY3Rpb24gKHdoSWR4KSB7XG4gICAgICAgIHZhciBvcHRzID0gdGhpcy5fb3B0cztcbiAgICAgICAgdmFyIHdoID0gWyd3aWR0aCcsICdoZWlnaHQnXVt3aElkeF07XG4gICAgICAgIHZhciBjd2ggPSBbJ2NsaWVudFdpZHRoJywgJ2NsaWVudEhlaWdodCddW3doSWR4XTtcbiAgICAgICAgdmFyIHBsdCA9IFsncGFkZGluZ0xlZnQnLCAncGFkZGluZ1RvcCddW3doSWR4XTtcbiAgICAgICAgdmFyIHByYiA9IFsncGFkZGluZ1JpZ2h0JywgJ3BhZGRpbmdCb3R0b20nXVt3aElkeF07XG4gICAgICAgIGlmIChvcHRzW3doXSAhPSBudWxsICYmIG9wdHNbd2hdICE9PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KG9wdHNbd2hdKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcm9vdCA9IHRoaXMucm9vdDtcbiAgICAgICAgdmFyIHN0bCA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUocm9vdCk7XG4gICAgICAgIHJldHVybiAoKHJvb3RbY3doXSB8fCBwYXJzZUludDEwKHN0bFt3aF0pIHx8IHBhcnNlSW50MTAocm9vdC5zdHlsZVt3aF0pKVxuICAgICAgICAgICAgLSAocGFyc2VJbnQxMChzdGxbcGx0XSkgfHwgMClcbiAgICAgICAgICAgIC0gKHBhcnNlSW50MTAoc3RsW3ByYl0pIHx8IDApKSB8IDA7XG4gICAgfTtcbiAgICBDYW52YXNQYWludGVyLnByb3RvdHlwZS5wYXRoVG9JbWFnZSA9IGZ1bmN0aW9uIChwYXRoLCBkcHIpIHtcbiAgICAgICAgZHByID0gZHByIHx8IHRoaXMuZHByO1xuICAgICAgICB2YXIgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHZhciBjdHggPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgdmFyIHJlY3QgPSBwYXRoLmdldEJvdW5kaW5nUmVjdCgpO1xuICAgICAgICB2YXIgc3R5bGUgPSBwYXRoLnN0eWxlO1xuICAgICAgICB2YXIgc2hhZG93Qmx1clNpemUgPSBzdHlsZS5zaGFkb3dCbHVyICogZHByO1xuICAgICAgICB2YXIgc2hhZG93T2Zmc2V0WCA9IHN0eWxlLnNoYWRvd09mZnNldFggKiBkcHI7XG4gICAgICAgIHZhciBzaGFkb3dPZmZzZXRZID0gc3R5bGUuc2hhZG93T2Zmc2V0WSAqIGRwcjtcbiAgICAgICAgdmFyIGxpbmVXaWR0aCA9IHBhdGguaGFzU3Ryb2tlKCkgPyBzdHlsZS5saW5lV2lkdGggOiAwO1xuICAgICAgICB2YXIgbGVmdE1hcmdpbiA9IE1hdGgubWF4KGxpbmVXaWR0aCAvIDIsIC1zaGFkb3dPZmZzZXRYICsgc2hhZG93Qmx1clNpemUpO1xuICAgICAgICB2YXIgcmlnaHRNYXJnaW4gPSBNYXRoLm1heChsaW5lV2lkdGggLyAyLCBzaGFkb3dPZmZzZXRYICsgc2hhZG93Qmx1clNpemUpO1xuICAgICAgICB2YXIgdG9wTWFyZ2luID0gTWF0aC5tYXgobGluZVdpZHRoIC8gMiwgLXNoYWRvd09mZnNldFkgKyBzaGFkb3dCbHVyU2l6ZSk7XG4gICAgICAgIHZhciBib3R0b21NYXJnaW4gPSBNYXRoLm1heChsaW5lV2lkdGggLyAyLCBzaGFkb3dPZmZzZXRZICsgc2hhZG93Qmx1clNpemUpO1xuICAgICAgICB2YXIgd2lkdGggPSByZWN0LndpZHRoICsgbGVmdE1hcmdpbiArIHJpZ2h0TWFyZ2luO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gcmVjdC5oZWlnaHQgKyB0b3BNYXJnaW4gKyBib3R0b21NYXJnaW47XG4gICAgICAgIGNhbnZhcy53aWR0aCA9IHdpZHRoICogZHByO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gaGVpZ2h0ICogZHByO1xuICAgICAgICBjdHguc2NhbGUoZHByLCBkcHIpO1xuICAgICAgICBjdHguY2xlYXJSZWN0KDAsIDAsIHdpZHRoLCBoZWlnaHQpO1xuICAgICAgICBjdHguZHByID0gZHByO1xuICAgICAgICB2YXIgcGF0aFRyYW5zZm9ybSA9IHtcbiAgICAgICAgICAgIHg6IHBhdGgueCxcbiAgICAgICAgICAgIHk6IHBhdGgueSxcbiAgICAgICAgICAgIHNjYWxlWDogcGF0aC5zY2FsZVgsXG4gICAgICAgICAgICBzY2FsZVk6IHBhdGguc2NhbGVZLFxuICAgICAgICAgICAgcm90YXRpb246IHBhdGgucm90YXRpb24sXG4gICAgICAgICAgICBvcmlnaW5YOiBwYXRoLm9yaWdpblgsXG4gICAgICAgICAgICBvcmlnaW5ZOiBwYXRoLm9yaWdpbllcbiAgICAgICAgfTtcbiAgICAgICAgcGF0aC54ID0gbGVmdE1hcmdpbiAtIHJlY3QueDtcbiAgICAgICAgcGF0aC55ID0gdG9wTWFyZ2luIC0gcmVjdC55O1xuICAgICAgICBwYXRoLnJvdGF0aW9uID0gMDtcbiAgICAgICAgcGF0aC5zY2FsZVggPSAxO1xuICAgICAgICBwYXRoLnNjYWxlWSA9IDE7XG4gICAgICAgIHBhdGgudXBkYXRlVHJhbnNmb3JtKCk7XG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICBicnVzaChjdHgsIHBhdGgsIHtcbiAgICAgICAgICAgICAgICBpbkhvdmVyOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWV3V2lkdGg6IHRoaXMuX3dpZHRoLFxuICAgICAgICAgICAgICAgIHZpZXdIZWlnaHQ6IHRoaXMuX2hlaWdodFxuICAgICAgICAgICAgfSwgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGltZ1NoYXBlID0gbmV3IFpSSW1hZ2Uoe1xuICAgICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgICAgICB4OiAwLFxuICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgaW1hZ2U6IGNhbnZhc1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdXRpbC5leHRlbmQocGF0aCwgcGF0aFRyYW5zZm9ybSk7XG4gICAgICAgIHJldHVybiBpbWdTaGFwZTtcbiAgICB9O1xuICAgIHJldHVybiBDYW52YXNQYWludGVyO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IENhbnZhc1BhaW50ZXI7XG47XG4iLCJmdW5jdGlvbiBkaWZmKG9sZEFyciwgbmV3QXJyLCBlcXVhbHMpIHtcbiAgICBpZiAoIWVxdWFscykge1xuICAgICAgICBlcXVhbHMgPSBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIGEgPT09IGI7XG4gICAgICAgIH07XG4gICAgfVxuICAgIG9sZEFyciA9IG9sZEFyci5zbGljZSgpO1xuICAgIG5ld0FyciA9IG5ld0Fyci5zbGljZSgpO1xuICAgIHZhciBuZXdMZW4gPSBuZXdBcnIubGVuZ3RoO1xuICAgIHZhciBvbGRMZW4gPSBvbGRBcnIubGVuZ3RoO1xuICAgIHZhciBlZGl0TGVuZ3RoID0gMTtcbiAgICB2YXIgbWF4RWRpdExlbmd0aCA9IG5ld0xlbiArIG9sZExlbjtcbiAgICB2YXIgYmVzdFBhdGggPSBbeyBuZXdQb3M6IC0xLCBjb21wb25lbnRzOiBbXSB9XTtcbiAgICB2YXIgb2xkUG9zID0gZXh0cmFjdENvbW1vbihiZXN0UGF0aFswXSwgbmV3QXJyLCBvbGRBcnIsIDAsIGVxdWFscyk7XG4gICAgaWYgKGJlc3RQYXRoWzBdLm5ld1BvcyArIDEgPj0gbmV3TGVuICYmIG9sZFBvcyArIDEgPj0gb2xkTGVuKSB7XG4gICAgICAgIHZhciBpbmRpY2VzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3QXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpbmRpY2VzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFt7XG4gICAgICAgICAgICAgICAgaW5kaWNlczogaW5kaWNlcyxcbiAgICAgICAgICAgICAgICBjb3VudDogbmV3QXJyLmxlbmd0aCxcbiAgICAgICAgICAgICAgICBhZGRlZDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcmVtb3ZlZDogZmFsc2VcbiAgICAgICAgICAgIH1dO1xuICAgIH1cbiAgICBmdW5jdGlvbiBleGVjRWRpdExlbmd0aCgpIHtcbiAgICAgICAgZm9yICh2YXIgZGlhZ29uYWxQYXRoID0gLTEgKiBlZGl0TGVuZ3RoOyBkaWFnb25hbFBhdGggPD0gZWRpdExlbmd0aDsgZGlhZ29uYWxQYXRoICs9IDIpIHtcbiAgICAgICAgICAgIHZhciBiYXNlUGF0aDtcbiAgICAgICAgICAgIHZhciBhZGRQYXRoID0gYmVzdFBhdGhbZGlhZ29uYWxQYXRoIC0gMV07XG4gICAgICAgICAgICB2YXIgcmVtb3ZlUGF0aCA9IGJlc3RQYXRoW2RpYWdvbmFsUGF0aCArIDFdO1xuICAgICAgICAgICAgdmFyIG9sZFBvcyA9IChyZW1vdmVQYXRoID8gcmVtb3ZlUGF0aC5uZXdQb3MgOiAwKSAtIGRpYWdvbmFsUGF0aDtcbiAgICAgICAgICAgIGlmIChhZGRQYXRoKSB7XG4gICAgICAgICAgICAgICAgYmVzdFBhdGhbZGlhZ29uYWxQYXRoIC0gMV0gPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2FuQWRkID0gYWRkUGF0aCAmJiBhZGRQYXRoLm5ld1BvcyArIDEgPCBuZXdMZW47XG4gICAgICAgICAgICB2YXIgY2FuUmVtb3ZlID0gcmVtb3ZlUGF0aCAmJiAwIDw9IG9sZFBvcyAmJiBvbGRQb3MgPCBvbGRMZW47XG4gICAgICAgICAgICBpZiAoIWNhbkFkZCAmJiAhY2FuUmVtb3ZlKSB7XG4gICAgICAgICAgICAgICAgYmVzdFBhdGhbZGlhZ29uYWxQYXRoXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghY2FuQWRkIHx8IChjYW5SZW1vdmUgJiYgYWRkUGF0aC5uZXdQb3MgPCByZW1vdmVQYXRoLm5ld1BvcykpIHtcbiAgICAgICAgICAgICAgICBiYXNlUGF0aCA9IGNsb25lUGF0aChyZW1vdmVQYXRoKTtcbiAgICAgICAgICAgICAgICBwdXNoQ29tcG9uZW50KGJhc2VQYXRoLmNvbXBvbmVudHMsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGJhc2VQYXRoID0gYWRkUGF0aDtcbiAgICAgICAgICAgICAgICBiYXNlUGF0aC5uZXdQb3MrKztcbiAgICAgICAgICAgICAgICBwdXNoQ29tcG9uZW50KGJhc2VQYXRoLmNvbXBvbmVudHMsIHRydWUsIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9sZFBvcyA9IGV4dHJhY3RDb21tb24oYmFzZVBhdGgsIG5ld0Fyciwgb2xkQXJyLCBkaWFnb25hbFBhdGgsIGVxdWFscyk7XG4gICAgICAgICAgICBpZiAoYmFzZVBhdGgubmV3UG9zICsgMSA+PSBuZXdMZW4gJiYgb2xkUG9zICsgMSA+PSBvbGRMZW4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYnVpbGRWYWx1ZXMoYmFzZVBhdGguY29tcG9uZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBiZXN0UGF0aFtkaWFnb25hbFBhdGhdID0gYmFzZVBhdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWRpdExlbmd0aCsrO1xuICAgIH1cbiAgICB3aGlsZSAoZWRpdExlbmd0aCA8PSBtYXhFZGl0TGVuZ3RoKSB7XG4gICAgICAgIHZhciByZXQgPSBleGVjRWRpdExlbmd0aCgpO1xuICAgICAgICBpZiAocmV0KSB7XG4gICAgICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZXh0cmFjdENvbW1vbihiYXNlUGF0aCwgbmV3QXJyLCBvbGRBcnIsIGRpYWdvbmFsUGF0aCwgZXF1YWxzKSB7XG4gICAgdmFyIG5ld0xlbiA9IG5ld0Fyci5sZW5ndGg7XG4gICAgdmFyIG9sZExlbiA9IG9sZEFyci5sZW5ndGg7XG4gICAgdmFyIG5ld1BvcyA9IGJhc2VQYXRoLm5ld1BvcztcbiAgICB2YXIgb2xkUG9zID0gbmV3UG9zIC0gZGlhZ29uYWxQYXRoO1xuICAgIHZhciBjb21tb25Db3VudCA9IDA7XG4gICAgd2hpbGUgKG5ld1BvcyArIDEgPCBuZXdMZW4gJiYgb2xkUG9zICsgMSA8IG9sZExlbiAmJiBlcXVhbHMobmV3QXJyW25ld1BvcyArIDFdLCBvbGRBcnJbb2xkUG9zICsgMV0pKSB7XG4gICAgICAgIG5ld1BvcysrO1xuICAgICAgICBvbGRQb3MrKztcbiAgICAgICAgY29tbW9uQ291bnQrKztcbiAgICB9XG4gICAgaWYgKGNvbW1vbkNvdW50KSB7XG4gICAgICAgIGJhc2VQYXRoLmNvbXBvbmVudHMucHVzaCh7XG4gICAgICAgICAgICBjb3VudDogY29tbW9uQ291bnQsXG4gICAgICAgICAgICBhZGRlZDogZmFsc2UsXG4gICAgICAgICAgICByZW1vdmVkOiBmYWxzZSxcbiAgICAgICAgICAgIGluZGljZXM6IFtdXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBiYXNlUGF0aC5uZXdQb3MgPSBuZXdQb3M7XG4gICAgcmV0dXJuIG9sZFBvcztcbn1cbmZ1bmN0aW9uIHB1c2hDb21wb25lbnQoY29tcG9uZW50cywgYWRkZWQsIHJlbW92ZWQpIHtcbiAgICB2YXIgbGFzdCA9IGNvbXBvbmVudHNbY29tcG9uZW50cy5sZW5ndGggLSAxXTtcbiAgICBpZiAobGFzdCAmJiBsYXN0LmFkZGVkID09PSBhZGRlZCAmJiBsYXN0LnJlbW92ZWQgPT09IHJlbW92ZWQpIHtcbiAgICAgICAgY29tcG9uZW50c1tjb21wb25lbnRzLmxlbmd0aCAtIDFdID0ge1xuICAgICAgICAgICAgY291bnQ6IGxhc3QuY291bnQgKyAxLFxuICAgICAgICAgICAgYWRkZWQ6IGFkZGVkLFxuICAgICAgICAgICAgcmVtb3ZlZDogcmVtb3ZlZCxcbiAgICAgICAgICAgIGluZGljZXM6IFtdXG4gICAgICAgIH07XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjb21wb25lbnRzLnB1c2goe1xuICAgICAgICAgICAgY291bnQ6IDEsXG4gICAgICAgICAgICBhZGRlZDogYWRkZWQsXG4gICAgICAgICAgICByZW1vdmVkOiByZW1vdmVkLFxuICAgICAgICAgICAgaW5kaWNlczogW11cbiAgICAgICAgfSk7XG4gICAgfVxufVxuZnVuY3Rpb24gYnVpbGRWYWx1ZXMoY29tcG9uZW50cykge1xuICAgIHZhciBjb21wb25lbnRQb3MgPSAwO1xuICAgIHZhciBjb21wb25lbnRMZW4gPSBjb21wb25lbnRzLmxlbmd0aDtcbiAgICB2YXIgbmV3UG9zID0gMDtcbiAgICB2YXIgb2xkUG9zID0gMDtcbiAgICBmb3IgKDsgY29tcG9uZW50UG9zIDwgY29tcG9uZW50TGVuOyBjb21wb25lbnRQb3MrKykge1xuICAgICAgICB2YXIgY29tcG9uZW50ID0gY29tcG9uZW50c1tjb21wb25lbnRQb3NdO1xuICAgICAgICBpZiAoIWNvbXBvbmVudC5yZW1vdmVkKSB7XG4gICAgICAgICAgICB2YXIgaW5kaWNlcyA9IFtdO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IG5ld1BvczsgaSA8IG5ld1BvcyArIGNvbXBvbmVudC5jb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaW5kaWNlcy5wdXNoKGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29tcG9uZW50LmluZGljZXMgPSBpbmRpY2VzO1xuICAgICAgICAgICAgbmV3UG9zICs9IGNvbXBvbmVudC5jb3VudDtcbiAgICAgICAgICAgIGlmICghY29tcG9uZW50LmFkZGVkKSB7XG4gICAgICAgICAgICAgICAgb2xkUG9zICs9IGNvbXBvbmVudC5jb3VudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBvbGRQb3M7IGkgPCBvbGRQb3MgKyBjb21wb25lbnQuY291bnQ7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudC5pbmRpY2VzLnB1c2goaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvbGRQb3MgKz0gY29tcG9uZW50LmNvdW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb21wb25lbnRzO1xufVxuZnVuY3Rpb24gY2xvbmVQYXRoKHBhdGgpIHtcbiAgICByZXR1cm4geyBuZXdQb3M6IHBhdGgubmV3UG9zLCBjb21wb25lbnRzOiBwYXRoLmNvbXBvbmVudHMuc2xpY2UoMCkgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFycmF5RGlmZihvbGRBcnIsIG5ld0FyciwgZXF1YWwpIHtcbiAgICByZXR1cm4gZGlmZihvbGRBcnIsIG5ld0FyciwgZXF1YWwpO1xufVxuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vY29yZSc7XG5pbXBvcnQgKiBhcyB1dGlsIGZyb20gJy4uL2NvcmUvdXRpbCc7XG5pbXBvcnQgUGF0aCBmcm9tICcuLi9ncmFwaGljL1BhdGgnO1xuaW1wb3J0IFpSSW1hZ2UgZnJvbSAnLi4vZ3JhcGhpYy9JbWFnZSc7XG5pbXBvcnQgVFNwYW4gZnJvbSAnLi4vZ3JhcGhpYy9UU3Bhbic7XG5pbXBvcnQgYXJyYXlEaWZmIGZyb20gJy4uL2NvcmUvYXJyYXlEaWZmJztcbmltcG9ydCBHcmFkaWVudE1hbmFnZXIgZnJvbSAnLi9oZWxwZXIvR3JhZGllbnRNYW5hZ2VyJztcbmltcG9ydCBQYXR0ZXJuTWFuYWdlciBmcm9tICcuL2hlbHBlci9QYXR0ZXJuTWFuYWdlcic7XG5pbXBvcnQgQ2xpcHBhdGhNYW5hZ2VyLCB7IGhhc0NsaXBQYXRoIH0gZnJvbSAnLi9oZWxwZXIvQ2xpcHBhdGhNYW5hZ2VyJztcbmltcG9ydCBTaGFkb3dNYW5hZ2VyIGZyb20gJy4vaGVscGVyL1NoYWRvd01hbmFnZXInO1xuaW1wb3J0IHsgcGF0aCBhcyBzdmdQYXRoLCBpbWFnZSBhcyBzdmdJbWFnZSwgdGV4dCBhcyBzdmdUZXh0IH0gZnJvbSAnLi9ncmFwaGljJztcbmZ1bmN0aW9uIHBhcnNlSW50MTAodmFsKSB7XG4gICAgcmV0dXJuIHBhcnNlSW50KHZhbCwgMTApO1xufVxuZnVuY3Rpb24gZ2V0U3ZnUHJveHkoZWwpIHtcbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBQYXRoKSB7XG4gICAgICAgIHJldHVybiBzdmdQYXRoO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbCBpbnN0YW5jZW9mIFpSSW1hZ2UpIHtcbiAgICAgICAgcmV0dXJuIHN2Z0ltYWdlO1xuICAgIH1cbiAgICBlbHNlIGlmIChlbCBpbnN0YW5jZW9mIFRTcGFuKSB7XG4gICAgICAgIHJldHVybiBzdmdUZXh0O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHN2Z1BhdGg7XG4gICAgfVxufVxuZnVuY3Rpb24gY2hlY2tQYXJlbnRBdmFpbGFibGUocGFyZW50LCBjaGlsZCkge1xuICAgIHJldHVybiBjaGlsZCAmJiBwYXJlbnQgJiYgY2hpbGQucGFyZW50Tm9kZSAhPT0gcGFyZW50O1xufVxuZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIocGFyZW50LCBjaGlsZCwgcHJldlNpYmxpbmcpIHtcbiAgICBpZiAoY2hlY2tQYXJlbnRBdmFpbGFibGUocGFyZW50LCBjaGlsZCkgJiYgcHJldlNpYmxpbmcpIHtcbiAgICAgICAgdmFyIG5leHRTaWJsaW5nID0gcHJldlNpYmxpbmcubmV4dFNpYmxpbmc7XG4gICAgICAgIG5leHRTaWJsaW5nID8gcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbmV4dFNpYmxpbmcpXG4gICAgICAgICAgICA6IHBhcmVudC5hcHBlbmRDaGlsZChjaGlsZCk7XG4gICAgfVxufVxuZnVuY3Rpb24gcHJlcGVuZChwYXJlbnQsIGNoaWxkKSB7XG4gICAgaWYgKGNoZWNrUGFyZW50QXZhaWxhYmxlKHBhcmVudCwgY2hpbGQpKSB7XG4gICAgICAgIHZhciBmaXJzdENoaWxkID0gcGFyZW50LmZpcnN0Q2hpbGQ7XG4gICAgICAgIGZpcnN0Q2hpbGQgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCBmaXJzdENoaWxkKVxuICAgICAgICAgICAgOiBwYXJlbnQuYXBwZW5kQ2hpbGQoY2hpbGQpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlbW92ZShwYXJlbnQsIGNoaWxkKSB7XG4gICAgaWYgKGNoaWxkICYmIHBhcmVudCAmJiBjaGlsZC5wYXJlbnROb2RlID09PSBwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG59XG5mdW5jdGlvbiByZW1vdmVGcm9tTXlQYXJlbnQoY2hpbGQpIHtcbiAgICBpZiAoY2hpbGQgJiYgY2hpbGQucGFyZW50Tm9kZSkge1xuICAgICAgICBjaGlsZC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRTdmdFbGVtZW50KGRpc3BsYXlhYmxlKSB7XG4gICAgcmV0dXJuIGRpc3BsYXlhYmxlLl9fc3ZnRWw7XG59XG52YXIgU1ZHUGFpbnRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gU1ZHUGFpbnRlcihyb290LCBzdG9yYWdlLCBvcHRzLCB6cklkKSB7XG4gICAgICAgIHRoaXMudHlwZSA9ICdzdmcnO1xuICAgICAgICB0aGlzLnJlZnJlc2hIb3ZlciA9IGNyZWF0ZU1ldGhvZE5vdFN1cHBvcnQoJ3JlZnJlc2hIb3ZlcicpO1xuICAgICAgICB0aGlzLnBhdGhUb0ltYWdlID0gY3JlYXRlTWV0aG9kTm90U3VwcG9ydCgncGF0aFRvSW1hZ2UnKTtcbiAgICAgICAgdGhpcy5jb25maWdMYXllciA9IGNyZWF0ZU1ldGhvZE5vdFN1cHBvcnQoJ2NvbmZpZ0xheWVyJyk7XG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XG4gICAgICAgIHRoaXMuc3RvcmFnZSA9IHN0b3JhZ2U7XG4gICAgICAgIHRoaXMuX29wdHMgPSBvcHRzID0gdXRpbC5leHRlbmQoe30sIG9wdHMgfHwge30pO1xuICAgICAgICB2YXIgc3ZnRG9tID0gY3JlYXRlRWxlbWVudCgnc3ZnJyk7XG4gICAgICAgIHN2Z0RvbS5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy8nLCAneG1sbnMnLCAnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnKTtcbiAgICAgICAgc3ZnRG9tLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3htbG5zLycsICd4bWxuczp4bGluaycsICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyk7XG4gICAgICAgIHN2Z0RvbS5zZXRBdHRyaWJ1dGUoJ3ZlcnNpb24nLCAnMS4xJyk7XG4gICAgICAgIHN2Z0RvbS5zZXRBdHRyaWJ1dGUoJ2Jhc2VQcm9maWxlJywgJ2Z1bGwnKTtcbiAgICAgICAgc3ZnRG9tLnN0eWxlLmNzc1RleHQgPSAndXNlci1zZWxlY3Q6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTtsZWZ0OjA7dG9wOjA7JztcbiAgICAgICAgdmFyIGJnUm9vdCA9IGNyZWF0ZUVsZW1lbnQoJ2cnKTtcbiAgICAgICAgc3ZnRG9tLmFwcGVuZENoaWxkKGJnUm9vdCk7XG4gICAgICAgIHZhciBzdmdSb290ID0gY3JlYXRlRWxlbWVudCgnZycpO1xuICAgICAgICBzdmdEb20uYXBwZW5kQ2hpbGQoc3ZnUm9vdCk7XG4gICAgICAgIHRoaXMuX2dyYWRpZW50TWFuYWdlciA9IG5ldyBHcmFkaWVudE1hbmFnZXIoenJJZCwgc3ZnUm9vdCk7XG4gICAgICAgIHRoaXMuX3BhdHRlcm5NYW5hZ2VyID0gbmV3IFBhdHRlcm5NYW5hZ2VyKHpySWQsIHN2Z1Jvb3QpO1xuICAgICAgICB0aGlzLl9jbGlwUGF0aE1hbmFnZXIgPSBuZXcgQ2xpcHBhdGhNYW5hZ2VyKHpySWQsIHN2Z1Jvb3QpO1xuICAgICAgICB0aGlzLl9zaGFkb3dNYW5hZ2VyID0gbmV3IFNoYWRvd01hbmFnZXIoenJJZCwgc3ZnUm9vdCk7XG4gICAgICAgIHZhciB2aWV3cG9ydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB2aWV3cG9ydC5zdHlsZS5jc3NUZXh0ID0gJ292ZXJmbG93OmhpZGRlbjtwb3NpdGlvbjpyZWxhdGl2ZSc7XG4gICAgICAgIHRoaXMuX3N2Z0RvbSA9IHN2Z0RvbTtcbiAgICAgICAgdGhpcy5fc3ZnUm9vdCA9IHN2Z1Jvb3Q7XG4gICAgICAgIHRoaXMuX2JhY2tncm91bmRSb290ID0gYmdSb290O1xuICAgICAgICB0aGlzLl92aWV3cG9ydCA9IHZpZXdwb3J0O1xuICAgICAgICByb290LmFwcGVuZENoaWxkKHZpZXdwb3J0KTtcbiAgICAgICAgdmlld3BvcnQuYXBwZW5kQ2hpbGQoc3ZnRG9tKTtcbiAgICAgICAgdGhpcy5yZXNpemUob3B0cy53aWR0aCwgb3B0cy5oZWlnaHQpO1xuICAgICAgICB0aGlzLl92aXNpYmxlTGlzdCA9IFtdO1xuICAgIH1cbiAgICBTVkdQYWludGVyLnByb3RvdHlwZS5nZXRUeXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJ3N2Zyc7XG4gICAgfTtcbiAgICBTVkdQYWludGVyLnByb3RvdHlwZS5nZXRWaWV3cG9ydFJvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl92aWV3cG9ydDtcbiAgICB9O1xuICAgIFNWR1BhaW50ZXIucHJvdG90eXBlLmdldFN2Z0RvbSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N2Z0RvbTtcbiAgICB9O1xuICAgIFNWR1BhaW50ZXIucHJvdG90eXBlLmdldFN2Z1Jvb3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdmdSb290O1xuICAgIH07XG4gICAgU1ZHUGFpbnRlci5wcm90b3R5cGUuZ2V0Vmlld3BvcnRSb290T2Zmc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmlld3BvcnRSb290ID0gdGhpcy5nZXRWaWV3cG9ydFJvb3QoKTtcbiAgICAgICAgaWYgKHZpZXdwb3J0Um9vdCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICBvZmZzZXRMZWZ0OiB2aWV3cG9ydFJvb3Qub2Zmc2V0TGVmdCB8fCAwLFxuICAgICAgICAgICAgICAgIG9mZnNldFRvcDogdmlld3BvcnRSb290Lm9mZnNldFRvcCB8fCAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBTVkdQYWludGVyLnByb3RvdHlwZS5yZWZyZXNoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGlzdCA9IHRoaXMuc3RvcmFnZS5nZXREaXNwbGF5TGlzdCh0cnVlKTtcbiAgICAgICAgdGhpcy5fcGFpbnRMaXN0KGxpc3QpO1xuICAgIH07XG4gICAgU1ZHUGFpbnRlci5wcm90b3R5cGUuc2V0QmFja2dyb3VuZENvbG9yID0gZnVuY3Rpb24gKGJhY2tncm91bmRDb2xvcikge1xuICAgICAgICBpZiAodGhpcy5fYmFja2dyb3VuZFJvb3QgJiYgdGhpcy5fYmFja2dyb3VuZE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmRSb290LnJlbW92ZUNoaWxkKHRoaXMuX2JhY2tncm91bmROb2RlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgYmdOb2RlID0gY3JlYXRlRWxlbWVudCgncmVjdCcpO1xuICAgICAgICBiZ05vZGUuc2V0QXR0cmlidXRlKCd3aWR0aCcsIHRoaXMuZ2V0V2lkdGgoKSk7XG4gICAgICAgIGJnTm9kZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIHRoaXMuZ2V0SGVpZ2h0KCkpO1xuICAgICAgICBiZ05vZGUuc2V0QXR0cmlidXRlKCd4JywgMCk7XG4gICAgICAgIGJnTm9kZS5zZXRBdHRyaWJ1dGUoJ3knLCAwKTtcbiAgICAgICAgYmdOb2RlLnNldEF0dHJpYnV0ZSgnaWQnLCAwKTtcbiAgICAgICAgYmdOb2RlLnN0eWxlLmZpbGwgPSBiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuX2JhY2tncm91bmRSb290LmFwcGVuZENoaWxkKGJnTm9kZSk7XG4gICAgICAgIHRoaXMuX2JhY2tncm91bmROb2RlID0gYmdOb2RlO1xuICAgIH07XG4gICAgU1ZHUGFpbnRlci5wcm90b3R5cGUuY3JlYXRlU1ZHRWxlbWVudCA9IGZ1bmN0aW9uICh0YWcpIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgICB9O1xuICAgIFNWR1BhaW50ZXIucHJvdG90eXBlLnBhaW50T25lID0gZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHZhciBzdmdQcm94eSA9IGdldFN2Z1Byb3h5KGVsKTtcbiAgICAgICAgc3ZnUHJveHkgJiYgc3ZnUHJveHkuYnJ1c2goZWwpO1xuICAgICAgICByZXR1cm4gZ2V0U3ZnRWxlbWVudChlbCk7XG4gICAgfTtcbiAgICBTVkdQYWludGVyLnByb3RvdHlwZS5fcGFpbnRMaXN0ID0gZnVuY3Rpb24gKGxpc3QpIHtcbiAgICAgICAgdmFyIGdyYWRpZW50TWFuYWdlciA9IHRoaXMuX2dyYWRpZW50TWFuYWdlcjtcbiAgICAgICAgdmFyIHBhdHRlcm5NYW5hZ2VyID0gdGhpcy5fcGF0dGVybk1hbmFnZXI7XG4gICAgICAgIHZhciBjbGlwUGF0aE1hbmFnZXIgPSB0aGlzLl9jbGlwUGF0aE1hbmFnZXI7XG4gICAgICAgIHZhciBzaGFkb3dNYW5hZ2VyID0gdGhpcy5fc2hhZG93TWFuYWdlcjtcbiAgICAgICAgZ3JhZGllbnRNYW5hZ2VyLm1hcmtBbGxVbnVzZWQoKTtcbiAgICAgICAgcGF0dGVybk1hbmFnZXIubWFya0FsbFVudXNlZCgpO1xuICAgICAgICBjbGlwUGF0aE1hbmFnZXIubWFya0FsbFVudXNlZCgpO1xuICAgICAgICBzaGFkb3dNYW5hZ2VyLm1hcmtBbGxVbnVzZWQoKTtcbiAgICAgICAgdmFyIHN2Z1Jvb3QgPSB0aGlzLl9zdmdSb290O1xuICAgICAgICB2YXIgdmlzaWJsZUxpc3QgPSB0aGlzLl92aXNpYmxlTGlzdDtcbiAgICAgICAgdmFyIGxpc3RMZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIG5ld1Zpc2libGVMaXN0ID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdExlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGlzcGxheWFibGUgPSBsaXN0W2ldO1xuICAgICAgICAgICAgdmFyIHN2Z1Byb3h5ID0gZ2V0U3ZnUHJveHkoZGlzcGxheWFibGUpO1xuICAgICAgICAgICAgdmFyIHN2Z0VsZW1lbnQgPSBnZXRTdmdFbGVtZW50KGRpc3BsYXlhYmxlKTtcbiAgICAgICAgICAgIGlmICghZGlzcGxheWFibGUuaW52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3BsYXlhYmxlLl9fZGlydHkgfHwgIXN2Z0VsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgc3ZnUHJveHkgJiYgc3ZnUHJveHkuYnJ1c2goZGlzcGxheWFibGUpO1xuICAgICAgICAgICAgICAgICAgICBzdmdFbGVtZW50ID0gZ2V0U3ZnRWxlbWVudChkaXNwbGF5YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzdmdFbGVtZW50ICYmIGRpc3BsYXlhYmxlLnN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBncmFkaWVudE1hbmFnZXIudXBkYXRlKGRpc3BsYXlhYmxlLnN0eWxlLmZpbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZ3JhZGllbnRNYW5hZ2VyLnVwZGF0ZShkaXNwbGF5YWJsZS5zdHlsZS5zdHJva2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybk1hbmFnZXIudXBkYXRlKGRpc3BsYXlhYmxlLnN0eWxlLmZpbGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybk1hbmFnZXIudXBkYXRlKGRpc3BsYXlhYmxlLnN0eWxlLnN0cm9rZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaGFkb3dNYW5hZ2VyLnVwZGF0ZShzdmdFbGVtZW50LCBkaXNwbGF5YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheWFibGUuX19kaXJ0eSA9IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChzdmdFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1Zpc2libGVMaXN0LnB1c2goZGlzcGxheWFibGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgZGlmZiA9IGFycmF5RGlmZih2aXNpYmxlTGlzdCwgbmV3VmlzaWJsZUxpc3QpO1xuICAgICAgICB2YXIgcHJldlN2Z0VsZW1lbnQ7XG4gICAgICAgIHZhciB0b3BQcmV2U3ZnRWxlbWVudDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkaWZmLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgaXRlbSA9IGRpZmZbaV07XG4gICAgICAgICAgICBpZiAoaXRlbS5yZW1vdmVkKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBpdGVtLmNvdW50OyBrKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpc3BsYXlhYmxlID0gdmlzaWJsZUxpc3RbaXRlbS5pbmRpY2VzW2tdXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN2Z0VsZW1lbnQgPSBnZXRTdmdFbGVtZW50KGRpc3BsYXlhYmxlKTtcbiAgICAgICAgICAgICAgICAgICAgaGFzQ2xpcFBhdGgoZGlzcGxheWFibGUpID8gcmVtb3ZlRnJvbU15UGFyZW50KHN2Z0VsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgICAgICA6IHJlbW92ZShzdmdSb290LCBzdmdFbGVtZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByZXZEaXNwbGF5YWJsZTtcbiAgICAgICAgdmFyIGN1cnJlbnRDbGlwR3JvdXA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgZGlmZi5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGl0ZW0gPSBkaWZmW2ldO1xuICAgICAgICAgICAgaWYgKGl0ZW0ucmVtb3ZlZCkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBpdGVtLmNvdW50OyBrKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlzcGxheWFibGUgPSBuZXdWaXNpYmxlTGlzdFtpdGVtLmluZGljZXNba11dO1xuICAgICAgICAgICAgICAgIHZhciBjbGlwR3JvdXAgPSBjbGlwUGF0aE1hbmFnZXIudXBkYXRlKGRpc3BsYXlhYmxlLCBwcmV2RGlzcGxheWFibGUpO1xuICAgICAgICAgICAgICAgIGlmIChjbGlwR3JvdXAgIT09IGN1cnJlbnRDbGlwR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgcHJldlN2Z0VsZW1lbnQgPSB0b3BQcmV2U3ZnRWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNsaXBHcm91cCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJldlN2Z0VsZW1lbnQgPyBpbnNlcnRBZnRlcihzdmdSb290LCBjbGlwR3JvdXAsIHByZXZTdmdFbGVtZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogcHJlcGVuZChzdmdSb290LCBjbGlwR3JvdXApO1xuICAgICAgICAgICAgICAgICAgICAgICAgdG9wUHJldlN2Z0VsZW1lbnQgPSBjbGlwR3JvdXA7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2U3ZnRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENsaXBHcm91cCA9IGNsaXBHcm91cDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHN2Z0VsZW1lbnQgPSBnZXRTdmdFbGVtZW50KGRpc3BsYXlhYmxlKTtcbiAgICAgICAgICAgICAgICBwcmV2U3ZnRWxlbWVudFxuICAgICAgICAgICAgICAgICAgICA/IGluc2VydEFmdGVyKGN1cnJlbnRDbGlwR3JvdXAgfHwgc3ZnUm9vdCwgc3ZnRWxlbWVudCwgcHJldlN2Z0VsZW1lbnQpXG4gICAgICAgICAgICAgICAgICAgIDogcHJlcGVuZChjdXJyZW50Q2xpcEdyb3VwIHx8IHN2Z1Jvb3QsIHN2Z0VsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHByZXZTdmdFbGVtZW50ID0gc3ZnRWxlbWVudCB8fCBwcmV2U3ZnRWxlbWVudDtcbiAgICAgICAgICAgICAgICBpZiAoIWN1cnJlbnRDbGlwR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgdG9wUHJldlN2Z0VsZW1lbnQgPSBwcmV2U3ZnRWxlbWVudDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZ3JhZGllbnRNYW5hZ2VyLm1hcmtVc2VkKGRpc3BsYXlhYmxlKTtcbiAgICAgICAgICAgICAgICBncmFkaWVudE1hbmFnZXIuYWRkV2l0aG91dFVwZGF0ZShzdmdFbGVtZW50LCBkaXNwbGF5YWJsZSk7XG4gICAgICAgICAgICAgICAgcGF0dGVybk1hbmFnZXIubWFya1VzZWQoZGlzcGxheWFibGUpO1xuICAgICAgICAgICAgICAgIHBhdHRlcm5NYW5hZ2VyLmFkZFdpdGhvdXRVcGRhdGUoc3ZnRWxlbWVudCwgZGlzcGxheWFibGUpO1xuICAgICAgICAgICAgICAgIGNsaXBQYXRoTWFuYWdlci5tYXJrVXNlZChkaXNwbGF5YWJsZSk7XG4gICAgICAgICAgICAgICAgcHJldkRpc3BsYXlhYmxlID0gZGlzcGxheWFibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZ3JhZGllbnRNYW5hZ2VyLnJlbW92ZVVudXNlZCgpO1xuICAgICAgICBwYXR0ZXJuTWFuYWdlci5yZW1vdmVVbnVzZWQoKTtcbiAgICAgICAgY2xpcFBhdGhNYW5hZ2VyLnJlbW92ZVVudXNlZCgpO1xuICAgICAgICBzaGFkb3dNYW5hZ2VyLnJlbW92ZVVudXNlZCgpO1xuICAgICAgICB0aGlzLl92aXNpYmxlTGlzdCA9IG5ld1Zpc2libGVMaXN0O1xuICAgIH07XG4gICAgU1ZHUGFpbnRlci5wcm90b3R5cGUuX2dldERlZnMgPSBmdW5jdGlvbiAoaXNGb3JjZUNyZWF0aW5nKSB7XG4gICAgICAgIHZhciBzdmdSb290ID0gdGhpcy5fc3ZnRG9tO1xuICAgICAgICB2YXIgZGVmcyA9IHN2Z1Jvb3QuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2RlZnMnKTtcbiAgICAgICAgaWYgKGRlZnMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoaXNGb3JjZUNyZWF0aW5nKSB7XG4gICAgICAgICAgICAgICAgdmFyIGRlZnNfMSA9IHN2Z1Jvb3QuaW5zZXJ0QmVmb3JlKGNyZWF0ZUVsZW1lbnQoJ2RlZnMnKSwgc3ZnUm9vdC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRlZnNfMS5jb250YWlucykge1xuICAgICAgICAgICAgICAgICAgICBkZWZzXzEuY29udGFpbnMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGRlZnNfMS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0gPT09IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZnNfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRlZnNbMF07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNWR1BhaW50ZXIucHJvdG90eXBlLnJlc2l6ZSA9IGZ1bmN0aW9uICh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICAgIHZhciB2aWV3cG9ydCA9IHRoaXMuX3ZpZXdwb3J0O1xuICAgICAgICB2aWV3cG9ydC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX29wdHM7XG4gICAgICAgIHdpZHRoICE9IG51bGwgJiYgKG9wdHMud2lkdGggPSB3aWR0aCk7XG4gICAgICAgIGhlaWdodCAhPSBudWxsICYmIChvcHRzLmhlaWdodCA9IGhlaWdodCk7XG4gICAgICAgIHdpZHRoID0gdGhpcy5fZ2V0U2l6ZSgwKTtcbiAgICAgICAgaGVpZ2h0ID0gdGhpcy5fZ2V0U2l6ZSgxKTtcbiAgICAgICAgdmlld3BvcnQuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgICAgICBpZiAodGhpcy5fd2lkdGggIT09IHdpZHRoIHx8IHRoaXMuX2hlaWdodCAhPT0gaGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IHdpZHRoO1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICAgICAgdmFyIHZpZXdwb3J0U3R5bGUgPSB2aWV3cG9ydC5zdHlsZTtcbiAgICAgICAgICAgIHZpZXdwb3J0U3R5bGUud2lkdGggPSB3aWR0aCArICdweCc7XG4gICAgICAgICAgICB2aWV3cG9ydFN0eWxlLmhlaWdodCA9IGhlaWdodCArICdweCc7XG4gICAgICAgICAgICB2YXIgc3ZnUm9vdCA9IHRoaXMuX3N2Z0RvbTtcbiAgICAgICAgICAgIHN2Z1Jvb3Quc2V0QXR0cmlidXRlKCd3aWR0aCcsIHdpZHRoICsgJycpO1xuICAgICAgICAgICAgc3ZnUm9vdC5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodCArICcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYmFja2dyb3VuZE5vZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmROb2RlLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCB3aWR0aCk7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kTm9kZS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGhlaWdodCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNWR1BhaW50ZXIucHJvdG90eXBlLmdldFdpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgfTtcbiAgICBTVkdQYWludGVyLnByb3RvdHlwZS5nZXRIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgfTtcbiAgICBTVkdQYWludGVyLnByb3RvdHlwZS5fZ2V0U2l6ZSA9IGZ1bmN0aW9uICh3aElkeCkge1xuICAgICAgICB2YXIgb3B0cyA9IHRoaXMuX29wdHM7XG4gICAgICAgIHZhciB3aCA9IFsnd2lkdGgnLCAnaGVpZ2h0J11bd2hJZHhdO1xuICAgICAgICB2YXIgY3doID0gWydjbGllbnRXaWR0aCcsICdjbGllbnRIZWlnaHQnXVt3aElkeF07XG4gICAgICAgIHZhciBwbHQgPSBbJ3BhZGRpbmdMZWZ0JywgJ3BhZGRpbmdUb3AnXVt3aElkeF07XG4gICAgICAgIHZhciBwcmIgPSBbJ3BhZGRpbmdSaWdodCcsICdwYWRkaW5nQm90dG9tJ11bd2hJZHhdO1xuICAgICAgICBpZiAob3B0c1t3aF0gIT0gbnVsbCAmJiBvcHRzW3doXSAhPT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChvcHRzW3doXSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJvb3QgPSB0aGlzLnJvb3Q7XG4gICAgICAgIHZhciBzdGwgPSBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlKHJvb3QpO1xuICAgICAgICByZXR1cm4gKChyb290W2N3aF0gfHwgcGFyc2VJbnQxMChzdGxbd2hdKSB8fCBwYXJzZUludDEwKHJvb3Quc3R5bGVbd2hdKSlcbiAgICAgICAgICAgIC0gKHBhcnNlSW50MTAoc3RsW3BsdF0pIHx8IDApXG4gICAgICAgICAgICAtIChwYXJzZUludDEwKHN0bFtwcmJdKSB8fCAwKSkgfCAwO1xuICAgIH07XG4gICAgU1ZHUGFpbnRlci5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yb290LmlubmVySFRNTCA9ICcnO1xuICAgICAgICB0aGlzLl9zdmdSb290XG4gICAgICAgICAgICA9IHRoaXMuX2JhY2tncm91bmRSb290XG4gICAgICAgICAgICAgICAgPSB0aGlzLl9zdmdEb21cbiAgICAgICAgICAgICAgICAgICAgPSB0aGlzLl9iYWNrZ3JvdW5kTm9kZVxuICAgICAgICAgICAgICAgICAgICAgICAgPSB0aGlzLl92aWV3cG9ydFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gdGhpcy5zdG9yYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gbnVsbDtcbiAgICB9O1xuICAgIFNWR1BhaW50ZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdmlld3BvcnROb2RlID0gdGhpcy5fdmlld3BvcnQ7XG4gICAgICAgIGlmICh2aWV3cG9ydE5vZGUgJiYgdmlld3BvcnROb2RlLnBhcmVudE5vZGUpIHtcbiAgICAgICAgICAgIHZpZXdwb3J0Tm9kZS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHZpZXdwb3J0Tm9kZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNWR1BhaW50ZXIucHJvdG90eXBlLnRvRGF0YVVSTCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5yZWZyZXNoKCk7XG4gICAgICAgIHZhciBzdmdEb20gPSB0aGlzLl9zdmdEb207XG4gICAgICAgIHZhciBvdXRlckhUTUwgPSBzdmdEb20ub3V0ZXJIVE1MXG4gICAgICAgICAgICB8fCAoc3ZnRG9tLnBhcmVudE5vZGUgJiYgc3ZnRG9tLnBhcmVudE5vZGUpLmlubmVySFRNTDtcbiAgICAgICAgdmFyIGh0bWwgPSBlbmNvZGVVUklDb21wb25lbnQob3V0ZXJIVE1MLnJlcGxhY2UoLz48L2csICc+XFxuXFxyPCcpKTtcbiAgICAgICAgcmV0dXJuICdkYXRhOmltYWdlL3N2Zyt4bWw7Y2hhcnNldD1VVEYtOCwnICsgaHRtbDtcbiAgICB9O1xuICAgIHJldHVybiBTVkdQYWludGVyO1xufSgpKTtcbmZ1bmN0aW9uIGNyZWF0ZU1ldGhvZE5vdFN1cHBvcnQobWV0aG9kKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdXRpbC5sb2dFcnJvcignSW4gU1ZHIG1vZGUgcGFpbnRlciBub3Qgc3VwcG9ydCBtZXRob2QgXCInICsgbWV0aG9kICsgJ1wiJyk7XG4gICAgfTtcbn1cbmV4cG9ydCBkZWZhdWx0IFNWR1BhaW50ZXI7XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlRWxlbWVudChuYW1lKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbn1cbiIsImltcG9ydCB7IGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL2NvcmUnO1xuaW1wb3J0IFpSSW1hZ2UgZnJvbSAnLi4vZ3JhcGhpYy9JbWFnZSc7XG5pbXBvcnQgeyBERUZBVUxUX0ZPTlQsIGdldExpbmVIZWlnaHQgfSBmcm9tICcuLi9jb250YWluL3RleHQnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAnLi4vY29yZS91dGlsJztcbmltcG9ydCB7IG5vcm1hbGl6ZUxpbmVEYXNoIH0gZnJvbSAnLi4vZ3JhcGhpYy9oZWxwZXIvZGFzaFN0eWxlJztcbnZhciBOT05FID0gJ25vbmUnO1xudmFyIG1hdGhSb3VuZCA9IE1hdGgucm91bmQ7XG52YXIgbWF0aFNpbiA9IE1hdGguc2luO1xudmFyIG1hdGhDb3MgPSBNYXRoLmNvcztcbnZhciBQSSA9IE1hdGguUEk7XG52YXIgUEkyID0gTWF0aC5QSSAqIDI7XG52YXIgZGVncmVlID0gMTgwIC8gUEk7XG52YXIgRVBTSUxPTiA9IDFlLTQ7XG5mdW5jdGlvbiByb3VuZDModmFsKSB7XG4gICAgcmV0dXJuIG1hdGhSb3VuZCh2YWwgKiAxZTMpIC8gMWUzO1xufVxuZnVuY3Rpb24gcm91bmQ0KHZhbCkge1xuICAgIHJldHVybiBtYXRoUm91bmQodmFsICogMWU0KSAvIDFlNDtcbn1cbmZ1bmN0aW9uIGlzQXJvdW5kWmVybyh2YWwpIHtcbiAgICByZXR1cm4gdmFsIDwgRVBTSUxPTiAmJiB2YWwgPiAtRVBTSUxPTjtcbn1cbmZ1bmN0aW9uIHBhdGhIYXNGaWxsKHN0eWxlKSB7XG4gICAgdmFyIGZpbGwgPSBzdHlsZS5maWxsO1xuICAgIHJldHVybiBmaWxsICE9IG51bGwgJiYgZmlsbCAhPT0gTk9ORTtcbn1cbmZ1bmN0aW9uIHBhdGhIYXNTdHJva2Uoc3R5bGUpIHtcbiAgICB2YXIgc3Ryb2tlID0gc3R5bGUuc3Ryb2tlO1xuICAgIHJldHVybiBzdHJva2UgIT0gbnVsbCAmJiBzdHJva2UgIT09IE5PTkU7XG59XG5mdW5jdGlvbiBzZXRUcmFuc2Zvcm0oc3ZnRWwsIG0pIHtcbiAgICBpZiAobSkge1xuICAgICAgICBhdHRyKHN2Z0VsLCAndHJhbnNmb3JtJywgJ21hdHJpeCgnXG4gICAgICAgICAgICArIHJvdW5kMyhtWzBdKSArICcsJ1xuICAgICAgICAgICAgKyByb3VuZDMobVsxXSkgKyAnLCdcbiAgICAgICAgICAgICsgcm91bmQzKG1bMl0pICsgJywnXG4gICAgICAgICAgICArIHJvdW5kMyhtWzNdKSArICcsJ1xuICAgICAgICAgICAgKyByb3VuZDQobVs0XSkgKyAnLCdcbiAgICAgICAgICAgICsgcm91bmQ0KG1bNV0pXG4gICAgICAgICAgICArICcpJyk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXR0cihlbCwga2V5LCB2YWwpIHtcbiAgICBpZiAoIXZhbCB8fCB2YWwudHlwZSAhPT0gJ2xpbmVhcicgJiYgdmFsLnR5cGUgIT09ICdyYWRpYWwnKSB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZShrZXksIHZhbCk7XG4gICAgfVxufVxuZnVuY3Rpb24gYXR0clhMaW5rKGVsLCBrZXksIHZhbCkge1xuICAgIGVsLnNldEF0dHJpYnV0ZU5TKCdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJywga2V5LCB2YWwpO1xufVxuZnVuY3Rpb24gYXR0clhNTChlbCwga2V5LCB2YWwpIHtcbiAgICBlbC5zZXRBdHRyaWJ1dGVOUygnaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlJywga2V5LCB2YWwpO1xufVxuZnVuY3Rpb24gYmluZFN0eWxlKHN2Z0VsLCBzdHlsZSwgZWwpIHtcbiAgICB2YXIgb3BhY2l0eSA9IHN0eWxlLm9wYWNpdHkgPT0gbnVsbCA/IDEgOiBzdHlsZS5vcGFjaXR5O1xuICAgIGlmIChlbCBpbnN0YW5jZW9mIFpSSW1hZ2UpIHtcbiAgICAgICAgc3ZnRWwuc3R5bGUub3BhY2l0eSA9IG9wYWNpdHkgKyAnJztcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGF0aEhhc0ZpbGwoc3R5bGUpKSB7XG4gICAgICAgIHZhciBmaWxsID0gc3R5bGUuZmlsbDtcbiAgICAgICAgZmlsbCA9IGZpbGwgPT09ICd0cmFuc3BhcmVudCcgPyBOT05FIDogZmlsbDtcbiAgICAgICAgYXR0cihzdmdFbCwgJ2ZpbGwnLCBmaWxsKTtcbiAgICAgICAgYXR0cihzdmdFbCwgJ2ZpbGwtb3BhY2l0eScsIChzdHlsZS5maWxsT3BhY2l0eSAhPSBudWxsID8gc3R5bGUuZmlsbE9wYWNpdHkgKiBvcGFjaXR5IDogb3BhY2l0eSkgKyAnJyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBhdHRyKHN2Z0VsLCAnZmlsbCcsIE5PTkUpO1xuICAgIH1cbiAgICBpZiAocGF0aEhhc1N0cm9rZShzdHlsZSkpIHtcbiAgICAgICAgdmFyIHN0cm9rZSA9IHN0eWxlLnN0cm9rZTtcbiAgICAgICAgc3Ryb2tlID0gc3Ryb2tlID09PSAndHJhbnNwYXJlbnQnID8gTk9ORSA6IHN0cm9rZTtcbiAgICAgICAgYXR0cihzdmdFbCwgJ3N0cm9rZScsIHN0cm9rZSk7XG4gICAgICAgIHZhciBzdHJva2VXaWR0aCA9IHN0eWxlLmxpbmVXaWR0aDtcbiAgICAgICAgdmFyIHN0cm9rZVNjYWxlXzEgPSBzdHlsZS5zdHJva2VOb1NjYWxlXG4gICAgICAgICAgICA/IGVsLmdldExpbmVTY2FsZSgpXG4gICAgICAgICAgICA6IDE7XG4gICAgICAgIGF0dHIoc3ZnRWwsICdzdHJva2Utd2lkdGgnLCAoc3Ryb2tlU2NhbGVfMSA/IHN0cm9rZVdpZHRoIC8gc3Ryb2tlU2NhbGVfMSA6IDApICsgJycpO1xuICAgICAgICBhdHRyKHN2Z0VsLCAncGFpbnQtb3JkZXInLCBzdHlsZS5zdHJva2VGaXJzdCA/ICdzdHJva2UnIDogJ2ZpbGwnKTtcbiAgICAgICAgYXR0cihzdmdFbCwgJ3N0cm9rZS1vcGFjaXR5JywgKHN0eWxlLnN0cm9rZU9wYWNpdHkgIT0gbnVsbCA/IHN0eWxlLnN0cm9rZU9wYWNpdHkgKiBvcGFjaXR5IDogb3BhY2l0eSkgKyAnJyk7XG4gICAgICAgIHZhciBsaW5lRGFzaCA9IHN0eWxlLmxpbmVEYXNoICYmIHN0cm9rZVdpZHRoID4gMCAmJiBub3JtYWxpemVMaW5lRGFzaChzdHlsZS5saW5lRGFzaCwgc3Ryb2tlV2lkdGgpO1xuICAgICAgICBpZiAobGluZURhc2gpIHtcbiAgICAgICAgICAgIHZhciBsaW5lRGFzaE9mZnNldCA9IHN0eWxlLmxpbmVEYXNoT2Zmc2V0O1xuICAgICAgICAgICAgaWYgKHN0cm9rZVNjYWxlXzEgJiYgc3Ryb2tlU2NhbGVfMSAhPT0gMSkge1xuICAgICAgICAgICAgICAgIGxpbmVEYXNoID0gbWFwKGxpbmVEYXNoLCBmdW5jdGlvbiAocmF3VmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByYXdWYWwgLyBzdHJva2VTY2FsZV8xO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChsaW5lRGFzaE9mZnNldCkge1xuICAgICAgICAgICAgICAgICAgICBsaW5lRGFzaE9mZnNldCAvPSBzdHJva2VTY2FsZV8xO1xuICAgICAgICAgICAgICAgICAgICBsaW5lRGFzaE9mZnNldCA9IG1hdGhSb3VuZChsaW5lRGFzaE9mZnNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXR0cihzdmdFbCwgJ3N0cm9rZS1kYXNoYXJyYXknLCBsaW5lRGFzaC5qb2luKCcsJykpO1xuICAgICAgICAgICAgYXR0cihzdmdFbCwgJ3N0cm9rZS1kYXNob2Zmc2V0JywgKGxpbmVEYXNoT2Zmc2V0IHx8IDApICsgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgYXR0cihzdmdFbCwgJ3N0cm9rZS1kYXNoYXJyYXknLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgc3R5bGUubGluZUNhcCAmJiBhdHRyKHN2Z0VsLCAnc3Ryb2tlLWxpbmVjYXAnLCBzdHlsZS5saW5lQ2FwKTtcbiAgICAgICAgc3R5bGUubGluZUpvaW4gJiYgYXR0cihzdmdFbCwgJ3N0cm9rZS1saW5lam9pbicsIHN0eWxlLmxpbmVKb2luKTtcbiAgICAgICAgc3R5bGUubWl0ZXJMaW1pdCAmJiBhdHRyKHN2Z0VsLCAnc3Ryb2tlLW1pdGVybGltaXQnLCBzdHlsZS5taXRlckxpbWl0ICsgJycpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgYXR0cihzdmdFbCwgJ3N0cm9rZScsIE5PTkUpO1xuICAgIH1cbn1cbnZhciBTVkdQYXRoUmVidWlsZGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBTVkdQYXRoUmVidWlsZGVyKCkge1xuICAgIH1cbiAgICBTVkdQYXRoUmVidWlsZGVyLnByb3RvdHlwZS5yZXNldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZCA9IFtdO1xuICAgICAgICB0aGlzLl9zdHIgPSAnJztcbiAgICB9O1xuICAgIFNWR1BhdGhSZWJ1aWxkZXIucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHRoaXMuX2FkZCgnTScsIHgsIHkpO1xuICAgIH07XG4gICAgU1ZHUGF0aFJlYnVpbGRlci5wcm90b3R5cGUubGluZVRvID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdGhpcy5fYWRkKCdMJywgeCwgeSk7XG4gICAgfTtcbiAgICBTVkdQYXRoUmVidWlsZGVyLnByb3RvdHlwZS5iZXppZXJDdXJ2ZVRvID0gZnVuY3Rpb24gKHgsIHksIHgyLCB5MiwgeDMsIHkzKSB7XG4gICAgICAgIHRoaXMuX2FkZCgnQycsIHgsIHksIHgyLCB5MiwgeDMsIHkzKTtcbiAgICB9O1xuICAgIFNWR1BhdGhSZWJ1aWxkZXIucHJvdG90eXBlLnF1YWRyYXRpY0N1cnZlVG8gPSBmdW5jdGlvbiAoeCwgeSwgeDIsIHkyKSB7XG4gICAgICAgIHRoaXMuX2FkZCgnUScsIHgsIHksIHgyLCB5Mik7XG4gICAgfTtcbiAgICBTVkdQYXRoUmVidWlsZGVyLnByb3RvdHlwZS5hcmMgPSBmdW5jdGlvbiAoY3gsIGN5LCByLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZSkge1xuICAgICAgICB0aGlzLmVsbGlwc2UoY3gsIGN5LCByLCByLCAwLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZSk7XG4gICAgfTtcbiAgICBTVkdQYXRoUmVidWlsZGVyLnByb3RvdHlwZS5lbGxpcHNlID0gZnVuY3Rpb24gKGN4LCBjeSwgcngsIHJ5LCBwc2ksIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBhbnRpY2xvY2t3aXNlKSB7XG4gICAgICAgIHZhciBmaXJzdENtZCA9IHRoaXMuX2QubGVuZ3RoID09PSAwO1xuICAgICAgICB2YXIgZFRoZXRhID0gZW5kQW5nbGUgLSBzdGFydEFuZ2xlO1xuICAgICAgICB2YXIgY2xvY2t3aXNlID0gIWFudGljbG9ja3dpc2U7XG4gICAgICAgIHZhciBkVGhldGFQb3NpdGl2ZSA9IE1hdGguYWJzKGRUaGV0YSk7XG4gICAgICAgIHZhciBpc0NpcmNsZSA9IGlzQXJvdW5kWmVybyhkVGhldGFQb3NpdGl2ZSAtIFBJMilcbiAgICAgICAgICAgIHx8IChjbG9ja3dpc2UgPyBkVGhldGEgPj0gUEkyIDogLWRUaGV0YSA+PSBQSTIpO1xuICAgICAgICB2YXIgdW5pZmllZFRoZXRhID0gZFRoZXRhID4gMCA/IGRUaGV0YSAlIFBJMiA6IChkVGhldGEgJSBQSTIgKyBQSTIpO1xuICAgICAgICB2YXIgbGFyZ2UgPSBmYWxzZTtcbiAgICAgICAgaWYgKGlzQ2lyY2xlKSB7XG4gICAgICAgICAgICBsYXJnZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNBcm91bmRaZXJvKGRUaGV0YVBvc2l0aXZlKSkge1xuICAgICAgICAgICAgbGFyZ2UgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGxhcmdlID0gKHVuaWZpZWRUaGV0YSA+PSBQSSkgPT09ICEhY2xvY2t3aXNlO1xuICAgICAgICB9XG4gICAgICAgIHZhciB4MCA9IHJvdW5kNChjeCArIHJ4ICogbWF0aENvcyhzdGFydEFuZ2xlKSk7XG4gICAgICAgIHZhciB5MCA9IHJvdW5kNChjeSArIHJ5ICogbWF0aFNpbihzdGFydEFuZ2xlKSk7XG4gICAgICAgIGlmIChpc0NpcmNsZSkge1xuICAgICAgICAgICAgaWYgKGNsb2Nrd2lzZSkge1xuICAgICAgICAgICAgICAgIGRUaGV0YSA9IFBJMiAtIDFlLTQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkVGhldGEgPSAtUEkyICsgMWUtNDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhcmdlID0gdHJ1ZTtcbiAgICAgICAgICAgIGlmIChmaXJzdENtZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2QucHVzaCgnTScsIHgwLCB5MCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSByb3VuZDQoY3ggKyByeCAqIG1hdGhDb3Moc3RhcnRBbmdsZSArIGRUaGV0YSkpO1xuICAgICAgICB2YXIgeSA9IHJvdW5kNChjeSArIHJ5ICogbWF0aFNpbihzdGFydEFuZ2xlICsgZFRoZXRhKSk7XG4gICAgICAgIGlmIChpc05hTih4MCkgfHwgaXNOYU4oeTApIHx8IGlzTmFOKHJ4KSB8fCBpc05hTihyeSkgfHwgaXNOYU4ocHNpKSB8fCBpc05hTihkZWdyZWUpIHx8IGlzTmFOKHgpIHx8IGlzTmFOKHkpKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fZC5wdXNoKCdBJywgcm91bmQ0KHJ4KSwgcm91bmQ0KHJ5KSwgbWF0aFJvdW5kKHBzaSAqIGRlZ3JlZSksICtsYXJnZSwgK2Nsb2Nrd2lzZSwgeCwgeSk7XG4gICAgfTtcbiAgICBTVkdQYXRoUmVidWlsZGVyLnByb3RvdHlwZS5yZWN0ID0gZnVuY3Rpb24gKHgsIHksIHcsIGgpIHtcbiAgICAgICAgdGhpcy5fYWRkKCdNJywgeCwgeSk7XG4gICAgICAgIHRoaXMuX2FkZCgnTCcsIHggKyB3LCB5KTtcbiAgICAgICAgdGhpcy5fYWRkKCdMJywgeCArIHcsIHkgKyBoKTtcbiAgICAgICAgdGhpcy5fYWRkKCdMJywgeCwgeSArIGgpO1xuICAgICAgICB0aGlzLl9hZGQoJ0wnLCB4LCB5KTtcbiAgICB9O1xuICAgIFNWR1BhdGhSZWJ1aWxkZXIucHJvdG90eXBlLmNsb3NlUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkKCdaJyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNWR1BhdGhSZWJ1aWxkZXIucHJvdG90eXBlLl9hZGQgPSBmdW5jdGlvbiAoY21kLCBhLCBiLCBjLCBkLCBlLCBmLCBnLCBoKSB7XG4gICAgICAgIHRoaXMuX2QucHVzaChjbWQpO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHZhbCA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICAgIGlmIChpc05hTih2YWwpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faW52YWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZC5wdXNoKHJvdW5kNCh2YWwpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgU1ZHUGF0aFJlYnVpbGRlci5wcm90b3R5cGUuZ2VuZXJhdGVTdHIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3N0ciA9IHRoaXMuX2ludmFsaWQgPyAnJyA6IHRoaXMuX2Quam9pbignICcpO1xuICAgICAgICB0aGlzLl9kID0gW107XG4gICAgfTtcbiAgICBTVkdQYXRoUmVidWlsZGVyLnByb3RvdHlwZS5nZXRTdHIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHI7XG4gICAgfTtcbiAgICByZXR1cm4gU1ZHUGF0aFJlYnVpbGRlcjtcbn0oKSk7XG52YXIgc3ZnUGF0aCA9IHtcbiAgICBicnVzaDogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGVsLnN0eWxlO1xuICAgICAgICB2YXIgc3ZnRWwgPSBlbC5fX3N2Z0VsO1xuICAgICAgICBpZiAoIXN2Z0VsKSB7XG4gICAgICAgICAgICBzdmdFbCA9IGNyZWF0ZUVsZW1lbnQoJ3BhdGgnKTtcbiAgICAgICAgICAgIGVsLl9fc3ZnRWwgPSBzdmdFbDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWVsLnBhdGgpIHtcbiAgICAgICAgICAgIGVsLmNyZWF0ZVBhdGhQcm94eSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwYXRoID0gZWwucGF0aDtcbiAgICAgICAgaWYgKGVsLnNoYXBlQ2hhbmdlZCgpKSB7XG4gICAgICAgICAgICBwYXRoLmJlZ2luUGF0aCgpO1xuICAgICAgICAgICAgZWwuYnVpbGRQYXRoKHBhdGgsIGVsLnNoYXBlKTtcbiAgICAgICAgICAgIGVsLnBhdGhVcGRhdGVkKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBhdGhWZXJzaW9uID0gcGF0aC5nZXRWZXJzaW9uKCk7XG4gICAgICAgIHZhciBlbEV4dCA9IGVsO1xuICAgICAgICB2YXIgc3ZnUGF0aEJ1aWxkZXIgPSBlbEV4dC5fX3N2Z1BhdGhCdWlsZGVyO1xuICAgICAgICBpZiAoZWxFeHQuX19zdmdQYXRoVmVyc2lvbiAhPT0gcGF0aFZlcnNpb24gfHwgIXN2Z1BhdGhCdWlsZGVyIHx8IGVsLnN0eWxlLnN0cm9rZVBlcmNlbnQgPCAxKSB7XG4gICAgICAgICAgICBpZiAoIXN2Z1BhdGhCdWlsZGVyKSB7XG4gICAgICAgICAgICAgICAgc3ZnUGF0aEJ1aWxkZXIgPSBlbEV4dC5fX3N2Z1BhdGhCdWlsZGVyID0gbmV3IFNWR1BhdGhSZWJ1aWxkZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN2Z1BhdGhCdWlsZGVyLnJlc2V0KCk7XG4gICAgICAgICAgICBwYXRoLnJlYnVpbGRQYXRoKHN2Z1BhdGhCdWlsZGVyLCBlbC5zdHlsZS5zdHJva2VQZXJjZW50KTtcbiAgICAgICAgICAgIHN2Z1BhdGhCdWlsZGVyLmdlbmVyYXRlU3RyKCk7XG4gICAgICAgICAgICBlbEV4dC5fX3N2Z1BhdGhWZXJzaW9uID0gcGF0aFZlcnNpb247XG4gICAgICAgIH1cbiAgICAgICAgYXR0cihzdmdFbCwgJ2QnLCBzdmdQYXRoQnVpbGRlci5nZXRTdHIoKSk7XG4gICAgICAgIGJpbmRTdHlsZShzdmdFbCwgc3R5bGUsIGVsKTtcbiAgICAgICAgc2V0VHJhbnNmb3JtKHN2Z0VsLCBlbC50cmFuc2Zvcm0pO1xuICAgIH1cbn07XG5leHBvcnQgeyBzdmdQYXRoIGFzIHBhdGggfTtcbnZhciBzdmdJbWFnZSA9IHtcbiAgICBicnVzaDogZnVuY3Rpb24gKGVsKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGVsLnN0eWxlO1xuICAgICAgICB2YXIgaW1hZ2UgPSBzdHlsZS5pbWFnZTtcbiAgICAgICAgaWYgKGltYWdlIGluc3RhbmNlb2YgSFRNTEltYWdlRWxlbWVudCkge1xuICAgICAgICAgICAgaW1hZ2UgPSBpbWFnZS5zcmM7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaW1hZ2UgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICAgICAgaW1hZ2UgPSBpbWFnZS50b0RhdGFVUkwoKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSBzdHlsZS54IHx8IDA7XG4gICAgICAgIHZhciB5ID0gc3R5bGUueSB8fCAwO1xuICAgICAgICB2YXIgZHcgPSBzdHlsZS53aWR0aDtcbiAgICAgICAgdmFyIGRoID0gc3R5bGUuaGVpZ2h0O1xuICAgICAgICB2YXIgc3ZnRWwgPSBlbC5fX3N2Z0VsO1xuICAgICAgICBpZiAoIXN2Z0VsKSB7XG4gICAgICAgICAgICBzdmdFbCA9IGNyZWF0ZUVsZW1lbnQoJ2ltYWdlJyk7XG4gICAgICAgICAgICBlbC5fX3N2Z0VsID0gc3ZnRWw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGltYWdlICE9PSBlbC5fX2ltYWdlU3JjKSB7XG4gICAgICAgICAgICBhdHRyWExpbmsoc3ZnRWwsICdocmVmJywgaW1hZ2UpO1xuICAgICAgICAgICAgZWwuX19pbWFnZVNyYyA9IGltYWdlO1xuICAgICAgICB9XG4gICAgICAgIGF0dHIoc3ZnRWwsICd3aWR0aCcsIGR3ICsgJycpO1xuICAgICAgICBhdHRyKHN2Z0VsLCAnaGVpZ2h0JywgZGggKyAnJyk7XG4gICAgICAgIGF0dHIoc3ZnRWwsICd4JywgeCArICcnKTtcbiAgICAgICAgYXR0cihzdmdFbCwgJ3knLCB5ICsgJycpO1xuICAgICAgICBiaW5kU3R5bGUoc3ZnRWwsIHN0eWxlLCBlbCk7XG4gICAgICAgIHNldFRyYW5zZm9ybShzdmdFbCwgZWwudHJhbnNmb3JtKTtcbiAgICB9XG59O1xuZXhwb3J0IHsgc3ZnSW1hZ2UgYXMgaW1hZ2UgfTtcbnZhciBURVhUX0FMSUdOX1RPX0FOQ0hPUiA9IHtcbiAgICBsZWZ0OiAnc3RhcnQnLFxuICAgIHJpZ2h0OiAnZW5kJyxcbiAgICBjZW50ZXI6ICdtaWRkbGUnLFxuICAgIG1pZGRsZTogJ21pZGRsZSdcbn07XG5mdW5jdGlvbiBhZGp1c3RUZXh0WSh5LCBsaW5lSGVpZ2h0LCB0ZXh0QmFzZWxpbmUpIHtcbiAgICBpZiAodGV4dEJhc2VsaW5lID09PSAndG9wJykge1xuICAgICAgICB5ICs9IGxpbmVIZWlnaHQgLyAyO1xuICAgIH1cbiAgICBlbHNlIGlmICh0ZXh0QmFzZWxpbmUgPT09ICdib3R0b20nKSB7XG4gICAgICAgIHkgLT0gbGluZUhlaWdodCAvIDI7XG4gICAgfVxuICAgIHJldHVybiB5O1xufVxudmFyIHN2Z1RleHQgPSB7XG4gICAgYnJ1c2g6IGZ1bmN0aW9uIChlbCkge1xuICAgICAgICB2YXIgc3R5bGUgPSBlbC5zdHlsZTtcbiAgICAgICAgdmFyIHRleHQgPSBzdHlsZS50ZXh0O1xuICAgICAgICB0ZXh0ICE9IG51bGwgJiYgKHRleHQgKz0gJycpO1xuICAgICAgICBpZiAoIXRleHQgfHwgaXNOYU4oc3R5bGUueCkgfHwgaXNOYU4oc3R5bGUueSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGV4dFN2Z0VsID0gZWwuX19zdmdFbDtcbiAgICAgICAgaWYgKCF0ZXh0U3ZnRWwpIHtcbiAgICAgICAgICAgIHRleHRTdmdFbCA9IGNyZWF0ZUVsZW1lbnQoJ3RleHQnKTtcbiAgICAgICAgICAgIGF0dHJYTUwodGV4dFN2Z0VsLCAneG1sOnNwYWNlJywgJ3ByZXNlcnZlJyk7XG4gICAgICAgICAgICBlbC5fX3N2Z0VsID0gdGV4dFN2Z0VsO1xuICAgICAgICB9XG4gICAgICAgIHZhciBmb250ID0gc3R5bGUuZm9udCB8fCBERUZBVUxUX0ZPTlQ7XG4gICAgICAgIHZhciB0ZXh0U3ZnRWxTdHlsZSA9IHRleHRTdmdFbC5zdHlsZTtcbiAgICAgICAgdGV4dFN2Z0VsU3R5bGUuZm9udCA9IGZvbnQ7XG4gICAgICAgIHRleHRTdmdFbC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIGJpbmRTdHlsZSh0ZXh0U3ZnRWwsIHN0eWxlLCBlbCk7XG4gICAgICAgIHNldFRyYW5zZm9ybSh0ZXh0U3ZnRWwsIGVsLnRyYW5zZm9ybSk7XG4gICAgICAgIHZhciB4ID0gc3R5bGUueCB8fCAwO1xuICAgICAgICB2YXIgeSA9IGFkanVzdFRleHRZKHN0eWxlLnkgfHwgMCwgZ2V0TGluZUhlaWdodChmb250KSwgc3R5bGUudGV4dEJhc2VsaW5lKTtcbiAgICAgICAgdmFyIHRleHRBbGlnbiA9IFRFWFRfQUxJR05fVE9fQU5DSE9SW3N0eWxlLnRleHRBbGlnbl1cbiAgICAgICAgICAgIHx8IHN0eWxlLnRleHRBbGlnbjtcbiAgICAgICAgYXR0cih0ZXh0U3ZnRWwsICdkb21pbmFudC1iYXNlbGluZScsICdjZW50cmFsJyk7XG4gICAgICAgIGF0dHIodGV4dFN2Z0VsLCAndGV4dC1hbmNob3InLCB0ZXh0QWxpZ24pO1xuICAgICAgICBhdHRyKHRleHRTdmdFbCwgJ3gnLCB4ICsgJycpO1xuICAgICAgICBhdHRyKHRleHRTdmdFbCwgJ3knLCB5ICsgJycpO1xuICAgIH1cbn07XG5leHBvcnQgeyBzdmdUZXh0IGFzIHRleHQgfTtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IERlZmluYWJsZSBmcm9tICcuL0RlZmluYWJsZSc7XG5pbXBvcnQgKiBhcyB6clV0aWwgZnJvbSAnLi4vLi4vY29yZS91dGlsJztcbmltcG9ydCB7IGlzQ2xpcFBhdGhDaGFuZ2VkIH0gZnJvbSAnLi4vLi4vY2FudmFzL2hlbHBlcic7XG5mdW5jdGlvbiBnZW5lcmF0ZUNsaXBQYXRoc0tleShjbGlwUGF0aHMpIHtcbiAgICB2YXIga2V5ID0gW107XG4gICAgaWYgKGNsaXBQYXRocykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNsaXBQYXRocy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGNsaXBQYXRoID0gY2xpcFBhdGhzW2ldO1xuICAgICAgICAgICAga2V5LnB1c2goY2xpcFBhdGguaWQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBrZXkuam9pbignLCcpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhc0NsaXBQYXRoKGRpc3BsYXlhYmxlKSB7XG4gICAgdmFyIGNsaXBQYXRocyA9IGRpc3BsYXlhYmxlLl9fY2xpcFBhdGhzO1xuICAgIHJldHVybiBjbGlwUGF0aHMgJiYgY2xpcFBhdGhzLmxlbmd0aCA+IDA7XG59XG52YXIgQ2xpcHBhdGhNYW5hZ2VyID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ2xpcHBhdGhNYW5hZ2VyLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENsaXBwYXRoTWFuYWdlcih6cklkLCBzdmdSb290KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHpySWQsIHN2Z1Jvb3QsICdjbGlwUGF0aCcsICdfX2NsaXBwYXRoX2luX3VzZV9fJykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX3JlZkdyb3VwcyA9IHt9O1xuICAgICAgICBfdGhpcy5fa2V5RHVwbGljYXRlQ291bnQgPSB7fTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cbiAgICBDbGlwcGF0aE1hbmFnZXIucHJvdG90eXBlLm1hcmtBbGxVbnVzZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUubWFya0FsbFVudXNlZC5jYWxsKHRoaXMpO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fcmVmR3JvdXBzKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtEb21VbnVzZWQodGhpcy5fcmVmR3JvdXBzW2tleV0pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2tleUR1cGxpY2F0ZUNvdW50ID0ge307XG4gICAgfTtcbiAgICBDbGlwcGF0aE1hbmFnZXIucHJvdG90eXBlLl9nZXRDbGlwUGF0aEdyb3VwID0gZnVuY3Rpb24gKGRpc3BsYXlhYmxlLCBwcmV2RGlzcGxheWFibGUpIHtcbiAgICAgICAgaWYgKCFoYXNDbGlwUGF0aChkaXNwbGF5YWJsZSkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2xpcFBhdGhzID0gZGlzcGxheWFibGUuX19jbGlwUGF0aHM7XG4gICAgICAgIHZhciBrZXlEdXBsaWNhdGVDb3VudCA9IHRoaXMuX2tleUR1cGxpY2F0ZUNvdW50O1xuICAgICAgICB2YXIgY2xpcFBhdGhLZXkgPSBnZW5lcmF0ZUNsaXBQYXRoc0tleShjbGlwUGF0aHMpO1xuICAgICAgICBpZiAoaXNDbGlwUGF0aENoYW5nZWQoY2xpcFBhdGhzLCBwcmV2RGlzcGxheWFibGUgJiYgcHJldkRpc3BsYXlhYmxlLl9fY2xpcFBhdGhzKSkge1xuICAgICAgICAgICAga2V5RHVwbGljYXRlQ291bnRbY2xpcFBhdGhLZXldID0ga2V5RHVwbGljYXRlQ291bnRbY2xpcFBhdGhLZXldIHx8IDA7XG4gICAgICAgICAgICBrZXlEdXBsaWNhdGVDb3VudFtjbGlwUGF0aEtleV0gJiYgKGNsaXBQYXRoS2V5ICs9ICctJyArIGtleUR1cGxpY2F0ZUNvdW50W2NsaXBQYXRoS2V5XSk7XG4gICAgICAgICAgICBrZXlEdXBsaWNhdGVDb3VudFtjbGlwUGF0aEtleV0rKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5fcmVmR3JvdXBzW2NsaXBQYXRoS2V5XVxuICAgICAgICAgICAgfHwgKHRoaXMuX3JlZkdyb3Vwc1tjbGlwUGF0aEtleV0gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2cnKSk7XG4gICAgfTtcbiAgICBDbGlwcGF0aE1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChkaXNwbGF5YWJsZSwgcHJldkRpc3BsYXlhYmxlKSB7XG4gICAgICAgIHZhciBjbGlwR3JvdXAgPSB0aGlzLl9nZXRDbGlwUGF0aEdyb3VwKGRpc3BsYXlhYmxlLCBwcmV2RGlzcGxheWFibGUpO1xuICAgICAgICBpZiAoY2xpcEdyb3VwKSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtEb21Vc2VkKGNsaXBHcm91cCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZURvbShjbGlwR3JvdXAsIGRpc3BsYXlhYmxlLl9fY2xpcFBhdGhzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2xpcEdyb3VwO1xuICAgIH07XG4gICAgO1xuICAgIENsaXBwYXRoTWFuYWdlci5wcm90b3R5cGUudXBkYXRlRG9tID0gZnVuY3Rpb24gKHBhcmVudEVsLCBjbGlwUGF0aHMpIHtcbiAgICAgICAgaWYgKGNsaXBQYXRocyAmJiBjbGlwUGF0aHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgdmFyIGRlZnMgPSB0aGlzLmdldERlZnModHJ1ZSk7XG4gICAgICAgICAgICB2YXIgY2xpcFBhdGggPSBjbGlwUGF0aHNbMF07XG4gICAgICAgICAgICB2YXIgY2xpcFBhdGhFbCA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBpZCA9IHZvaWQgMDtcbiAgICAgICAgICAgIGlmIChjbGlwUGF0aC5fZG9tKSB7XG4gICAgICAgICAgICAgICAgaWQgPSBjbGlwUGF0aC5fZG9tLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgICAgICAgICBjbGlwUGF0aEVsID0gY2xpcFBhdGguX2RvbTtcbiAgICAgICAgICAgICAgICBpZiAoIWRlZnMuY29udGFpbnMoY2xpcFBhdGhFbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVmcy5hcHBlbmRDaGlsZChjbGlwUGF0aEVsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZCA9ICd6cicgKyB0aGlzLl96cklkICsgJy1jbGlwLScgKyB0aGlzLm5leHRJZDtcbiAgICAgICAgICAgICAgICArK3RoaXMubmV4dElkO1xuICAgICAgICAgICAgICAgIGNsaXBQYXRoRWwgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2NsaXBQYXRoJyk7XG4gICAgICAgICAgICAgICAgY2xpcFBhdGhFbC5zZXRBdHRyaWJ1dGUoJ2lkJywgaWQpO1xuICAgICAgICAgICAgICAgIGRlZnMuYXBwZW5kQ2hpbGQoY2xpcFBhdGhFbCk7XG4gICAgICAgICAgICAgICAgY2xpcFBhdGguX2RvbSA9IGNsaXBQYXRoRWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3ZnUHJveHkgPSB0aGlzLmdldFN2Z1Byb3h5KGNsaXBQYXRoKTtcbiAgICAgICAgICAgIHN2Z1Byb3h5LmJydXNoKGNsaXBQYXRoKTtcbiAgICAgICAgICAgIHZhciBwYXRoRWwgPSB0aGlzLmdldFN2Z0VsZW1lbnQoY2xpcFBhdGgpO1xuICAgICAgICAgICAgY2xpcFBhdGhFbC5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgIGNsaXBQYXRoRWwuYXBwZW5kQ2hpbGQocGF0aEVsKTtcbiAgICAgICAgICAgIHBhcmVudEVsLnNldEF0dHJpYnV0ZSgnY2xpcC1wYXRoJywgJ3VybCgjJyArIGlkICsgJyknKTtcbiAgICAgICAgICAgIGlmIChjbGlwUGF0aHMubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlRG9tKGNsaXBQYXRoRWwsIGNsaXBQYXRocy5zbGljZSgxKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAocGFyZW50RWwpIHtcbiAgICAgICAgICAgICAgICBwYXJlbnRFbC5zZXRBdHRyaWJ1dGUoJ2NsaXAtcGF0aCcsICdub25lJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIDtcbiAgICBDbGlwcGF0aE1hbmFnZXIucHJvdG90eXBlLm1hcmtVc2VkID0gZnVuY3Rpb24gKGRpc3BsYXlhYmxlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChkaXNwbGF5YWJsZS5fX2NsaXBQYXRocykge1xuICAgICAgICAgICAgenJVdGlsLmVhY2goZGlzcGxheWFibGUuX19jbGlwUGF0aHMsIGZ1bmN0aW9uIChjbGlwUGF0aCkge1xuICAgICAgICAgICAgICAgIGlmIChjbGlwUGF0aC5fZG9tKSB7XG4gICAgICAgICAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUubWFya0RvbVVzZWQuY2FsbChfdGhpcywgY2xpcFBhdGguX2RvbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIDtcbiAgICBDbGlwcGF0aE1hbmFnZXIucHJvdG90eXBlLnJlbW92ZVVudXNlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5yZW1vdmVVbnVzZWQuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIG5ld1JlZkdyb3Vwc01hcCA9IHt9O1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5fcmVmR3JvdXBzKSB7XG4gICAgICAgICAgICB2YXIgZ3JvdXAgPSB0aGlzLl9yZWZHcm91cHNba2V5XTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0RvbVVudXNlZChncm91cCkpIHtcbiAgICAgICAgICAgICAgICBuZXdSZWZHcm91cHNNYXBba2V5XSA9IGdyb3VwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZ3JvdXAucGFyZW50Tm9kZSkge1xuICAgICAgICAgICAgICAgIGdyb3VwLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZ3JvdXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlZkdyb3VwcyA9IG5ld1JlZkdyb3Vwc01hcDtcbiAgICB9O1xuICAgIHJldHVybiBDbGlwcGF0aE1hbmFnZXI7XG59KERlZmluYWJsZSkpO1xuZXhwb3J0IGRlZmF1bHQgQ2xpcHBhdGhNYW5hZ2VyO1xuIiwiaW1wb3J0IHsgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4uL2NvcmUnO1xuaW1wb3J0ICogYXMgenJVdGlsIGZyb20gJy4uLy4uL2NvcmUvdXRpbCc7XG5pbXBvcnQgUGF0aCBmcm9tICcuLi8uLi9ncmFwaGljL1BhdGgnO1xuaW1wb3J0IFpSSW1hZ2UgZnJvbSAnLi4vLi4vZ3JhcGhpYy9JbWFnZSc7XG5pbXBvcnQgVFNwYW4gZnJvbSAnLi4vLi4vZ3JhcGhpYy9UU3Bhbic7XG5pbXBvcnQgeyBwYXRoIGFzIHN2Z1BhdGgsIGltYWdlIGFzIHN2Z0ltYWdlLCB0ZXh0IGFzIHN2Z1RleHQgfSBmcm9tICcuLi9ncmFwaGljJztcbnZhciBNQVJLX1VOVVNFRCA9ICcwJztcbnZhciBNQVJLX1VTRUQgPSAnMSc7XG52YXIgRGVmaW5hYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEZWZpbmFibGUoenJJZCwgc3ZnUm9vdCwgdGFnTmFtZXMsIG1hcmtMYWJlbCwgZG9tTmFtZSkge1xuICAgICAgICB0aGlzLm5leHRJZCA9IDA7XG4gICAgICAgIHRoaXMuX2RvbU5hbWUgPSAnX2RvbSc7XG4gICAgICAgIHRoaXMuY3JlYXRlRWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQ7XG4gICAgICAgIHRoaXMuX3pySWQgPSB6cklkO1xuICAgICAgICB0aGlzLl9zdmdSb290ID0gc3ZnUm9vdDtcbiAgICAgICAgdGhpcy5fdGFnTmFtZXMgPSB0eXBlb2YgdGFnTmFtZXMgPT09ICdzdHJpbmcnID8gW3RhZ05hbWVzXSA6IHRhZ05hbWVzO1xuICAgICAgICB0aGlzLl9tYXJrTGFiZWwgPSBtYXJrTGFiZWw7XG4gICAgICAgIGlmIChkb21OYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9kb21OYW1lID0gZG9tTmFtZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBEZWZpbmFibGUucHJvdG90eXBlLmdldERlZnMgPSBmdW5jdGlvbiAoaXNGb3JjZUNyZWF0aW5nKSB7XG4gICAgICAgIHZhciBzdmdSb290ID0gdGhpcy5fc3ZnUm9vdDtcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLl9zdmdSb290LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkZWZzJyk7XG4gICAgICAgIGlmIChkZWZzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKGlzRm9yY2VDcmVhdGluZykge1xuICAgICAgICAgICAgICAgIHZhciBkZWZzXzEgPSBzdmdSb290Lmluc2VydEJlZm9yZSh0aGlzLmNyZWF0ZUVsZW1lbnQoJ2RlZnMnKSwgc3ZnUm9vdC5maXJzdENoaWxkKTtcbiAgICAgICAgICAgICAgICBpZiAoIWRlZnNfMS5jb250YWlucykge1xuICAgICAgICAgICAgICAgICAgICBkZWZzXzEuY29udGFpbnMgPSBmdW5jdGlvbiAoZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IGRlZnNfMS5jaGlsZHJlbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghY2hpbGRyZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gY2hpbGRyZW4ubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoY2hpbGRyZW5baV0gPT09IGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZnNfMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIGRlZnNbMF07XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERlZmluYWJsZS5wcm90b3R5cGUuZG9VcGRhdGUgPSBmdW5jdGlvbiAodGFyZ2V0LCBvblVwZGF0ZSkge1xuICAgICAgICBpZiAoIXRhcmdldCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5nZXREZWZzKGZhbHNlKTtcbiAgICAgICAgaWYgKHRhcmdldFt0aGlzLl9kb21OYW1lXSAmJiBkZWZzLmNvbnRhaW5zKHRhcmdldFt0aGlzLl9kb21OYW1lXSkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb25VcGRhdGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBvblVwZGF0ZSh0YXJnZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIGRvbSA9IHRoaXMuYWRkKHRhcmdldCk7XG4gICAgICAgICAgICBpZiAoZG9tKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3RoaXMuX2RvbU5hbWVdID0gZG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBEZWZpbmFibGUucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfTtcbiAgICBEZWZpbmFibGUucHJvdG90eXBlLmFkZERvbSA9IGZ1bmN0aW9uIChkb20pIHtcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLmdldERlZnModHJ1ZSk7XG4gICAgICAgIGlmIChkb20ucGFyZW50Tm9kZSAhPT0gZGVmcykge1xuICAgICAgICAgICAgZGVmcy5hcHBlbmRDaGlsZChkb20pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEZWZpbmFibGUucHJvdG90eXBlLnJlbW92ZURvbSA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLmdldERlZnMoZmFsc2UpO1xuICAgICAgICBpZiAoZGVmcyAmJiB0YXJnZXRbdGhpcy5fZG9tTmFtZV0pIHtcbiAgICAgICAgICAgIGRlZnMucmVtb3ZlQ2hpbGQodGFyZ2V0W3RoaXMuX2RvbU5hbWVdKTtcbiAgICAgICAgICAgIHRhcmdldFt0aGlzLl9kb21OYW1lXSA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERlZmluYWJsZS5wcm90b3R5cGUuZ2V0RG9tcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRlZnMgPSB0aGlzLmdldERlZnMoZmFsc2UpO1xuICAgICAgICBpZiAoIWRlZnMpIHtcbiAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZG9tcyA9IFtdO1xuICAgICAgICB6clV0aWwuZWFjaCh0aGlzLl90YWdOYW1lcywgZnVuY3Rpb24gKHRhZ05hbWUpIHtcbiAgICAgICAgICAgIHZhciB0YWdzID0gZGVmcy5nZXRFbGVtZW50c0J5VGFnTmFtZSh0YWdOYW1lKTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFncy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGRvbXMucHVzaCh0YWdzW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBkb21zO1xuICAgIH07XG4gICAgRGVmaW5hYmxlLnByb3RvdHlwZS5tYXJrQWxsVW51c2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZG9tcyA9IHRoaXMuZ2V0RG9tcygpO1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHpyVXRpbC5lYWNoKGRvbXMsIGZ1bmN0aW9uIChkb20pIHtcbiAgICAgICAgICAgIGRvbVt0aGF0Ll9tYXJrTGFiZWxdID0gTUFSS19VTlVTRUQ7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRGVmaW5hYmxlLnByb3RvdHlwZS5tYXJrRG9tVXNlZCA9IGZ1bmN0aW9uIChkb20pIHtcbiAgICAgICAgZG9tICYmIChkb21bdGhpcy5fbWFya0xhYmVsXSA9IE1BUktfVVNFRCk7XG4gICAgfTtcbiAgICA7XG4gICAgRGVmaW5hYmxlLnByb3RvdHlwZS5tYXJrRG9tVW51c2VkID0gZnVuY3Rpb24gKGRvbSkge1xuICAgICAgICBkb20gJiYgKGRvbVt0aGlzLl9tYXJrTGFiZWxdID0gTUFSS19VTlVTRUQpO1xuICAgIH07XG4gICAgO1xuICAgIERlZmluYWJsZS5wcm90b3R5cGUuaXNEb21VbnVzZWQgPSBmdW5jdGlvbiAoZG9tKSB7XG4gICAgICAgIHJldHVybiBkb20gJiYgZG9tW3RoaXMuX21hcmtMYWJlbF0gIT09IE1BUktfVVNFRDtcbiAgICB9O1xuICAgIERlZmluYWJsZS5wcm90b3R5cGUucmVtb3ZlVW51c2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgZGVmcyA9IHRoaXMuZ2V0RGVmcyhmYWxzZSk7XG4gICAgICAgIGlmICghZGVmcykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkb21zID0gdGhpcy5nZXREb21zKCk7XG4gICAgICAgIHpyVXRpbC5lYWNoKGRvbXMsIGZ1bmN0aW9uIChkb20pIHtcbiAgICAgICAgICAgIGlmIChfdGhpcy5pc0RvbVVudXNlZChkb20pKSB7XG4gICAgICAgICAgICAgICAgZGVmcy5yZW1vdmVDaGlsZChkb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xuICAgIERlZmluYWJsZS5wcm90b3R5cGUuZ2V0U3ZnUHJveHkgPSBmdW5jdGlvbiAoZGlzcGxheWFibGUpIHtcbiAgICAgICAgaWYgKGRpc3BsYXlhYmxlIGluc3RhbmNlb2YgUGF0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHN2Z1BhdGg7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlzcGxheWFibGUgaW5zdGFuY2VvZiBaUkltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZnSW1hZ2U7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlzcGxheWFibGUgaW5zdGFuY2VvZiBUU3Bhbikge1xuICAgICAgICAgICAgcmV0dXJuIHN2Z1RleHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gc3ZnUGF0aDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGVmaW5hYmxlLnByb3RvdHlwZS5nZXRTdmdFbGVtZW50ID0gZnVuY3Rpb24gKGRpc3BsYXlhYmxlKSB7XG4gICAgICAgIHJldHVybiBkaXNwbGF5YWJsZS5fX3N2Z0VsO1xuICAgIH07XG4gICAgcmV0dXJuIERlZmluYWJsZTtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBEZWZpbmFibGU7XG4iLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBEZWZpbmFibGUgZnJvbSAnLi9EZWZpbmFibGUnO1xuaW1wb3J0ICogYXMgenJVdGlsIGZyb20gJy4uLy4uL2NvcmUvdXRpbCc7XG5pbXBvcnQgKiBhcyBjb2xvclRvb2wgZnJvbSAnLi4vLi4vdG9vbC9jb2xvcic7XG5mdW5jdGlvbiBpc0xpbmVhckdyYWRpZW50KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLnR5cGUgPT09ICdsaW5lYXInO1xufVxuZnVuY3Rpb24gaXNSYWRpYWxHcmFkaWVudCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS50eXBlID09PSAncmFkaWFsJztcbn1cbmZ1bmN0aW9uIGlzR3JhZGllbnQodmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgKHZhbHVlLnR5cGUgPT09ICdsaW5lYXInXG4gICAgICAgIHx8IHZhbHVlLnR5cGUgPT09ICdyYWRpYWwnKTtcbn1cbnZhciBHcmFkaWVudE1hbmFnZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhHcmFkaWVudE1hbmFnZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gR3JhZGllbnRNYW5hZ2VyKHpySWQsIHN2Z1Jvb3QpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHpySWQsIHN2Z1Jvb3QsIFsnbGluZWFyR3JhZGllbnQnLCAncmFkaWFsR3JhZGllbnQnXSwgJ19fZ3JhZGllbnRfaW5fdXNlX18nKSB8fCB0aGlzO1xuICAgIH1cbiAgICBHcmFkaWVudE1hbmFnZXIucHJvdG90eXBlLmFkZFdpdGhvdXRVcGRhdGUgPSBmdW5jdGlvbiAoc3ZnRWxlbWVudCwgZGlzcGxheWFibGUpIHtcbiAgICAgICAgaWYgKGRpc3BsYXlhYmxlICYmIGRpc3BsYXlhYmxlLnN0eWxlKSB7XG4gICAgICAgICAgICB2YXIgdGhhdF8xID0gdGhpcztcbiAgICAgICAgICAgIHpyVXRpbC5lYWNoKFsnZmlsbCcsICdzdHJva2UnXSwgZnVuY3Rpb24gKGZpbGxPclN0cm9rZSkge1xuICAgICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGRpc3BsYXlhYmxlLnN0eWxlW2ZpbGxPclN0cm9rZV07XG4gICAgICAgICAgICAgICAgaWYgKGlzR3JhZGllbnQodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBncmFkaWVudCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmcyA9IHRoYXRfMS5nZXREZWZzKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9tID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZ3JhZGllbnQuX19kb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbSA9IGdyYWRpZW50Ll9fZG9tO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFkZWZzLmNvbnRhaW5zKGdyYWRpZW50Ll9fZG9tKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoYXRfMS5hZGREb20oZG9tKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvbSA9IHRoYXRfMS5hZGQoZ3JhZGllbnQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoYXRfMS5tYXJrVXNlZChkaXNwbGF5YWJsZSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpZCA9IGRvbS5nZXRBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgICAgICAgICAgICAgICAgIHN2Z0VsZW1lbnQuc2V0QXR0cmlidXRlKGZpbGxPclN0cm9rZSwgJ3VybCgjJyArIGlkICsgJyknKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgR3JhZGllbnRNYW5hZ2VyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoZ3JhZGllbnQpIHtcbiAgICAgICAgdmFyIGRvbTtcbiAgICAgICAgaWYgKGlzTGluZWFyR3JhZGllbnQoZ3JhZGllbnQpKSB7XG4gICAgICAgICAgICBkb20gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2xpbmVhckdyYWRpZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNSYWRpYWxHcmFkaWVudChncmFkaWVudCkpIHtcbiAgICAgICAgICAgIGRvbSA9IHRoaXMuY3JlYXRlRWxlbWVudCgncmFkaWFsR3JhZGllbnQnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHpyVXRpbC5sb2dFcnJvcignSWxsZWdhbCBncmFkaWVudCB0eXBlLicpO1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgZ3JhZGllbnQuaWQgPSBncmFkaWVudC5pZCB8fCB0aGlzLm5leHRJZCsrO1xuICAgICAgICBkb20uc2V0QXR0cmlidXRlKCdpZCcsICd6cicgKyB0aGlzLl96cklkXG4gICAgICAgICAgICArICctZ3JhZGllbnQtJyArIGdyYWRpZW50LmlkKTtcbiAgICAgICAgdGhpcy51cGRhdGVEb20oZ3JhZGllbnQsIGRvbSk7XG4gICAgICAgIHRoaXMuYWRkRG9tKGRvbSk7XG4gICAgICAgIHJldHVybiBkb207XG4gICAgfTtcbiAgICBHcmFkaWVudE1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uIChncmFkaWVudCkge1xuICAgICAgICBpZiAoIWlzR3JhZGllbnQoZ3JhZGllbnQpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB0aGlzLmRvVXBkYXRlKGdyYWRpZW50LCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgZG9tID0gZ3JhZGllbnQuX19kb207XG4gICAgICAgICAgICBpZiAoIWRvbSkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0YWdOYW1lID0gZG9tLnRhZ05hbWU7XG4gICAgICAgICAgICB2YXIgdHlwZSA9IGdyYWRpZW50LnR5cGU7XG4gICAgICAgICAgICBpZiAodHlwZSA9PT0gJ2xpbmVhcicgJiYgdGFnTmFtZSA9PT0gJ2xpbmVhckdyYWRpZW50J1xuICAgICAgICAgICAgICAgIHx8IHR5cGUgPT09ICdyYWRpYWwnICYmIHRhZ05hbWUgPT09ICdyYWRpYWxHcmFkaWVudCcpIHtcbiAgICAgICAgICAgICAgICB0aGF0LnVwZGF0ZURvbShncmFkaWVudCwgZ3JhZGllbnQuX19kb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhhdC5yZW1vdmVEb20oZ3JhZGllbnQpO1xuICAgICAgICAgICAgICAgIHRoYXQuYWRkKGdyYWRpZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBHcmFkaWVudE1hbmFnZXIucHJvdG90eXBlLnVwZGF0ZURvbSA9IGZ1bmN0aW9uIChncmFkaWVudCwgZG9tKSB7XG4gICAgICAgIGlmIChpc0xpbmVhckdyYWRpZW50KGdyYWRpZW50KSkge1xuICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgneDEnLCBncmFkaWVudC54ICsgJycpO1xuICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgneTEnLCBncmFkaWVudC55ICsgJycpO1xuICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgneDInLCBncmFkaWVudC54MiArICcnKTtcbiAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoJ3kyJywgZ3JhZGllbnQueTIgKyAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaXNSYWRpYWxHcmFkaWVudChncmFkaWVudCkpIHtcbiAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoJ2N4JywgZ3JhZGllbnQueCArICcnKTtcbiAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoJ2N5JywgZ3JhZGllbnQueSArICcnKTtcbiAgICAgICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoJ3InLCBncmFkaWVudC5yICsgJycpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgenJVdGlsLmxvZ0Vycm9yKCdJbGxlZ2FsIGdyYWRpZW50IHR5cGUuJyk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyYWRpZW50Lmdsb2JhbCkge1xuICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgnZ3JhZGllbnRVbml0cycsICd1c2VyU3BhY2VPblVzZScpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgnZ3JhZGllbnRVbml0cycsICdvYmplY3RCb3VuZGluZ0JveCcpO1xuICAgICAgICB9XG4gICAgICAgIGRvbS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgdmFyIGNvbG9ycyA9IGdyYWRpZW50LmNvbG9yU3RvcHM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBjb2xvcnMubGVuZ3RoOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgICAgICAgIHZhciBzdG9wXzEgPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ3N0b3AnKTtcbiAgICAgICAgICAgIHN0b3BfMS5zZXRBdHRyaWJ1dGUoJ29mZnNldCcsIGNvbG9yc1tpXS5vZmZzZXQgKiAxMDAgKyAnJScpO1xuICAgICAgICAgICAgdmFyIGNvbG9yID0gY29sb3JzW2ldLmNvbG9yO1xuICAgICAgICAgICAgaWYgKGNvbG9yLmluZGV4T2YoJ3JnYmEnKSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9wYWNpdHkgPSBjb2xvclRvb2wucGFyc2UoY29sb3IpWzNdO1xuICAgICAgICAgICAgICAgIHZhciBoZXggPSBjb2xvclRvb2wudG9IZXgoY29sb3IpO1xuICAgICAgICAgICAgICAgIHN0b3BfMS5zZXRBdHRyaWJ1dGUoJ3N0b3AtY29sb3InLCAnIycgKyBoZXgpO1xuICAgICAgICAgICAgICAgIHN0b3BfMS5zZXRBdHRyaWJ1dGUoJ3N0b3Atb3BhY2l0eScsIG9wYWNpdHkgKyAnJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdG9wXzEuc2V0QXR0cmlidXRlKCdzdG9wLWNvbG9yJywgY29sb3JzW2ldLmNvbG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRvbS5hcHBlbmRDaGlsZChzdG9wXzEpO1xuICAgICAgICB9XG4gICAgICAgIGdyYWRpZW50Ll9fZG9tID0gZG9tO1xuICAgIH07XG4gICAgR3JhZGllbnRNYW5hZ2VyLnByb3RvdHlwZS5tYXJrVXNlZCA9IGZ1bmN0aW9uIChkaXNwbGF5YWJsZSkge1xuICAgICAgICBpZiAoZGlzcGxheWFibGUuc3R5bGUpIHtcbiAgICAgICAgICAgIHZhciBncmFkaWVudCA9IGRpc3BsYXlhYmxlLnN0eWxlLmZpbGw7XG4gICAgICAgICAgICBpZiAoZ3JhZGllbnQgJiYgZ3JhZGllbnQuX19kb20pIHtcbiAgICAgICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLm1hcmtEb21Vc2VkLmNhbGwodGhpcywgZ3JhZGllbnQuX19kb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZ3JhZGllbnQgPSBkaXNwbGF5YWJsZS5zdHlsZS5zdHJva2U7XG4gICAgICAgICAgICBpZiAoZ3JhZGllbnQgJiYgZ3JhZGllbnQuX19kb20pIHtcbiAgICAgICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLm1hcmtEb21Vc2VkLmNhbGwodGhpcywgZ3JhZGllbnQuX19kb20pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gR3JhZGllbnRNYW5hZ2VyO1xufShEZWZpbmFibGUpKTtcbmV4cG9ydCBkZWZhdWx0IEdyYWRpZW50TWFuYWdlcjtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IERlZmluYWJsZSBmcm9tICcuL0RlZmluYWJsZSc7XG5pbXBvcnQgKiBhcyB6clV0aWwgZnJvbSAnLi4vLi4vY29yZS91dGlsJztcbmltcG9ydCB7IGNyZWF0ZU9yVXBkYXRlSW1hZ2UgfSBmcm9tICcuLi8uLi9ncmFwaGljL2hlbHBlci9pbWFnZSc7XG5pbXBvcnQgV2Vha01hcCBmcm9tICcuLi8uLi9jb3JlL1dlYWtNYXAnO1xuZnVuY3Rpb24gaXNQYXR0ZXJuKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmICghIXZhbHVlLmltYWdlIHx8ICEhdmFsdWUuc3ZnRWxlbWVudCk7XG59XG52YXIgcGF0dGVybkRvbU1hcCA9IG5ldyBXZWFrTWFwKCk7XG52YXIgUGF0dGVybk1hbmFnZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQYXR0ZXJuTWFuYWdlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQYXR0ZXJuTWFuYWdlcih6cklkLCBzdmdSb290KSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCB6cklkLCBzdmdSb290LCBbJ3BhdHRlcm4nXSwgJ19fcGF0dGVybl9pbl91c2VfXycpIHx8IHRoaXM7XG4gICAgfVxuICAgIFBhdHRlcm5NYW5hZ2VyLnByb3RvdHlwZS5hZGRXaXRob3V0VXBkYXRlID0gZnVuY3Rpb24gKHN2Z0VsZW1lbnQsIGRpc3BsYXlhYmxlKSB7XG4gICAgICAgIGlmIChkaXNwbGF5YWJsZSAmJiBkaXNwbGF5YWJsZS5zdHlsZSkge1xuICAgICAgICAgICAgdmFyIHRoYXRfMSA9IHRoaXM7XG4gICAgICAgICAgICB6clV0aWwuZWFjaChbJ2ZpbGwnLCAnc3Ryb2tlJ10sIGZ1bmN0aW9uIChmaWxsT3JTdHJva2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgcGF0dGVybiA9IGRpc3BsYXlhYmxlLnN0eWxlW2ZpbGxPclN0cm9rZV07XG4gICAgICAgICAgICAgICAgaWYgKGlzUGF0dGVybihwYXR0ZXJuKSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmcyA9IHRoYXRfMS5nZXREZWZzKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZG9tID0gcGF0dGVybkRvbU1hcC5nZXQocGF0dGVybik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkb20pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICghZGVmcy5jb250YWlucyhkb20pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhhdF8xLmFkZERvbShkb20pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9tID0gdGhhdF8xLmFkZChwYXR0ZXJuKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGF0XzEubWFya1VzZWQoZGlzcGxheWFibGUpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWQgPSBkb20uZ2V0QXR0cmlidXRlKCdpZCcpO1xuICAgICAgICAgICAgICAgICAgICBzdmdFbGVtZW50LnNldEF0dHJpYnV0ZShmaWxsT3JTdHJva2UsICd1cmwoIycgKyBpZCArICcpJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBhdHRlcm5NYW5hZ2VyLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAocGF0dGVybikge1xuICAgICAgICBpZiAoIWlzUGF0dGVybihwYXR0ZXJuKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkb20gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ3BhdHRlcm4nKTtcbiAgICAgICAgcGF0dGVybi5pZCA9IHBhdHRlcm4uaWQgPT0gbnVsbCA/IHRoaXMubmV4dElkKysgOiBwYXR0ZXJuLmlkO1xuICAgICAgICBkb20uc2V0QXR0cmlidXRlKCdpZCcsICd6cicgKyB0aGlzLl96cklkXG4gICAgICAgICAgICArICctcGF0dGVybi0nICsgcGF0dGVybi5pZCk7XG4gICAgICAgIGRvbS5zZXRBdHRyaWJ1dGUoJ3gnLCAnMCcpO1xuICAgICAgICBkb20uc2V0QXR0cmlidXRlKCd5JywgJzAnKTtcbiAgICAgICAgZG9tLnNldEF0dHJpYnV0ZSgncGF0dGVyblVuaXRzJywgJ3VzZXJTcGFjZU9uVXNlJyk7XG4gICAgICAgIHRoaXMudXBkYXRlRG9tKHBhdHRlcm4sIGRvbSk7XG4gICAgICAgIHRoaXMuYWRkRG9tKGRvbSk7XG4gICAgICAgIHJldHVybiBkb207XG4gICAgfTtcbiAgICBQYXR0ZXJuTWFuYWdlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHBhdHRlcm4pIHtcbiAgICAgICAgaWYgKCFpc1BhdHRlcm4ocGF0dGVybikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHRoaXMuZG9VcGRhdGUocGF0dGVybiwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGRvbSA9IHBhdHRlcm5Eb21NYXAuZ2V0KHBhdHRlcm4pO1xuICAgICAgICAgICAgdGhhdC51cGRhdGVEb20ocGF0dGVybiwgZG9tKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBQYXR0ZXJuTWFuYWdlci5wcm90b3R5cGUudXBkYXRlRG9tID0gZnVuY3Rpb24gKHBhdHRlcm4sIHBhdHRlcm5Eb20pIHtcbiAgICAgICAgdmFyIHN2Z0VsZW1lbnQgPSBwYXR0ZXJuLnN2Z0VsZW1lbnQ7XG4gICAgICAgIGlmIChzdmdFbGVtZW50IGluc3RhbmNlb2YgU1ZHRWxlbWVudCkge1xuICAgICAgICAgICAgaWYgKHN2Z0VsZW1lbnQucGFyZW50Tm9kZSAhPT0gcGF0dGVybkRvbSkge1xuICAgICAgICAgICAgICAgIHBhdHRlcm5Eb20uaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgICAgICAgcGF0dGVybkRvbS5hcHBlbmRDaGlsZChzdmdFbGVtZW50KTtcbiAgICAgICAgICAgICAgICBwYXR0ZXJuRG9tLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBwYXR0ZXJuLnN2Z1dpZHRoICsgJycpO1xuICAgICAgICAgICAgICAgIHBhdHRlcm5Eb20uc2V0QXR0cmlidXRlKCdoZWlnaHQnLCBwYXR0ZXJuLnN2Z0hlaWdodCArICcnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHZhciBpbWcgPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgcHJldkltYWdlID0gcGF0dGVybkRvbS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaW1hZ2UnKTtcbiAgICAgICAgICAgIGlmIChwcmV2SW1hZ2UubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhdHRlcm4uaW1hZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaW1nID0gcHJldkltYWdlWzBdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcGF0dGVybkRvbS5yZW1vdmVDaGlsZChwcmV2SW1hZ2VbMF0pO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAocGF0dGVybi5pbWFnZSkge1xuICAgICAgICAgICAgICAgIGltZyA9IHRoaXMuY3JlYXRlRWxlbWVudCgnaW1hZ2UnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbWcpIHtcbiAgICAgICAgICAgICAgICB2YXIgaW1hZ2VTcmMgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBwYXR0ZXJuLmltYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVNyYyA9IHBhdHRlcm4uaW1hZ2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhdHRlcm4uaW1hZ2UgaW5zdGFuY2VvZiBIVE1MSW1hZ2VFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGltYWdlU3JjID0gcGF0dGVybi5pbWFnZS5zcmM7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHBhdHRlcm4uaW1hZ2UgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBpbWFnZVNyYyA9IHBhdHRlcm4uaW1hZ2UudG9EYXRhVVJMKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChpbWFnZVNyYykge1xuICAgICAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCdocmVmJywgaW1hZ2VTcmMpO1xuICAgICAgICAgICAgICAgICAgICBpbWcuc2V0QXR0cmlidXRlKCd4JywgJzAnKTtcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNldEF0dHJpYnV0ZSgneScsICcwJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBob3N0RWwgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXJ0eTogZnVuY3Rpb24gKCkgeyB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIHZhciBjcmVhdGVkSW1hZ2UgPSBjcmVhdGVPclVwZGF0ZUltYWdlKGltYWdlU3JjLCBpbWcsIGhvc3RFbCwgZnVuY3Rpb24gKGltZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybkRvbS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgaW1nLndpZHRoICsgJycpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcGF0dGVybkRvbS5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsIGltZy5oZWlnaHQgKyAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoY3JlYXRlZEltYWdlICYmIGNyZWF0ZWRJbWFnZS53aWR0aCAmJiBjcmVhdGVkSW1hZ2UuaGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuRG9tLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCBjcmVhdGVkSW1hZ2Uud2lkdGggKyAnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuRG9tLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgY3JlYXRlZEltYWdlLmhlaWdodCArICcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuRG9tLmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB4ID0gcGF0dGVybi54IHx8IDA7XG4gICAgICAgIHZhciB5ID0gcGF0dGVybi55IHx8IDA7XG4gICAgICAgIHZhciByb3RhdGlvbiA9IChwYXR0ZXJuLnJvdGF0aW9uIHx8IDApIC8gTWF0aC5QSSAqIDE4MDtcbiAgICAgICAgdmFyIHNjYWxlWCA9IHBhdHRlcm4uc2NhbGVYIHx8IDE7XG4gICAgICAgIHZhciBzY2FsZVkgPSBwYXR0ZXJuLnNjYWxlWSB8fCAxO1xuICAgICAgICB2YXIgdHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUoXCIgKyB4ICsgXCIsIFwiICsgeSArIFwiKSByb3RhdGUoXCIgKyByb3RhdGlvbiArIFwiKSBzY2FsZShcIiArIHNjYWxlWCArIFwiLCBcIiArIHNjYWxlWSArIFwiKVwiO1xuICAgICAgICBwYXR0ZXJuRG9tLnNldEF0dHJpYnV0ZSgncGF0dGVyblRyYW5zZm9ybScsIHRyYW5zZm9ybSk7XG4gICAgICAgIHBhdHRlcm5Eb21NYXAuc2V0KHBhdHRlcm4sIHBhdHRlcm5Eb20pO1xuICAgIH07XG4gICAgUGF0dGVybk1hbmFnZXIucHJvdG90eXBlLm1hcmtVc2VkID0gZnVuY3Rpb24gKGRpc3BsYXlhYmxlKSB7XG4gICAgICAgIGlmIChkaXNwbGF5YWJsZS5zdHlsZSkge1xuICAgICAgICAgICAgaWYgKGlzUGF0dGVybihkaXNwbGF5YWJsZS5zdHlsZS5maWxsKSkge1xuICAgICAgICAgICAgICAgIF9zdXBlci5wcm90b3R5cGUubWFya0RvbVVzZWQuY2FsbCh0aGlzLCBwYXR0ZXJuRG9tTWFwLmdldChkaXNwbGF5YWJsZS5zdHlsZS5maWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNQYXR0ZXJuKGRpc3BsYXlhYmxlLnN0eWxlLnN0cm9rZSkpIHtcbiAgICAgICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLm1hcmtEb21Vc2VkLmNhbGwodGhpcywgcGF0dGVybkRvbU1hcC5nZXQoZGlzcGxheWFibGUuc3R5bGUuc3Ryb2tlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBQYXR0ZXJuTWFuYWdlcjtcbn0oRGVmaW5hYmxlKSk7XG5leHBvcnQgZGVmYXVsdCBQYXR0ZXJuTWFuYWdlcjtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IERlZmluYWJsZSBmcm9tICcuL0RlZmluYWJsZSc7XG52YXIgU2hhZG93TWFuYWdlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFNoYWRvd01hbmFnZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gU2hhZG93TWFuYWdlcih6cklkLCBzdmdSb290KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IF9zdXBlci5jYWxsKHRoaXMsIHpySWQsIHN2Z1Jvb3QsIFsnZmlsdGVyJ10sICdfX2ZpbHRlcl9pbl91c2VfXycsICdfc2hhZG93RG9tJykgfHwgdGhpcztcbiAgICAgICAgX3RoaXMuX3NoYWRvd0RvbU1hcCA9IHt9O1xuICAgICAgICBfdGhpcy5fc2hhZG93RG9tUG9vbCA9IFtdO1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgfVxuICAgIFNoYWRvd01hbmFnZXIucHJvdG90eXBlLl9nZXRGcm9tUG9vbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNoYWRvd0RvbSA9IHRoaXMuX3NoYWRvd0RvbVBvb2wucG9wKCk7XG4gICAgICAgIGlmICghc2hhZG93RG9tKSB7XG4gICAgICAgICAgICBzaGFkb3dEb20gPSB0aGlzLmNyZWF0ZUVsZW1lbnQoJ2ZpbHRlcicpO1xuICAgICAgICAgICAgc2hhZG93RG9tLnNldEF0dHJpYnV0ZSgnaWQnLCAnenInICsgdGhpcy5fenJJZCArICctc2hhZG93LScgKyB0aGlzLm5leHRJZCsrKTtcbiAgICAgICAgICAgIHZhciBkb21DaGlsZCA9IHRoaXMuY3JlYXRlRWxlbWVudCgnZmVEcm9wU2hhZG93Jyk7XG4gICAgICAgICAgICBzaGFkb3dEb20uYXBwZW5kQ2hpbGQoZG9tQ2hpbGQpO1xuICAgICAgICAgICAgdGhpcy5hZGREb20oc2hhZG93RG9tKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc2hhZG93RG9tO1xuICAgIH07XG4gICAgU2hhZG93TWFuYWdlci5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKHN2Z0VsZW1lbnQsIGRpc3BsYXlhYmxlKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IGRpc3BsYXlhYmxlLnN0eWxlO1xuICAgICAgICBpZiAoaGFzU2hhZG93KHN0eWxlKSkge1xuICAgICAgICAgICAgdmFyIHNoYWRvd0tleSA9IGdldFNoYWRvd0tleShkaXNwbGF5YWJsZSk7XG4gICAgICAgICAgICB2YXIgc2hhZG93RG9tID0gZGlzcGxheWFibGUuX3NoYWRvd0RvbSA9IHRoaXMuX3NoYWRvd0RvbU1hcFtzaGFkb3dLZXldO1xuICAgICAgICAgICAgaWYgKCFzaGFkb3dEb20pIHtcbiAgICAgICAgICAgICAgICBzaGFkb3dEb20gPSB0aGlzLl9nZXRGcm9tUG9vbCgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NoYWRvd0RvbU1hcFtzaGFkb3dLZXldID0gc2hhZG93RG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVEb20oc3ZnRWxlbWVudCwgZGlzcGxheWFibGUsIHNoYWRvd0RvbSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZShzdmdFbGVtZW50LCBkaXNwbGF5YWJsZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNoYWRvd01hbmFnZXIucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChzdmdFbGVtZW50LCBkaXNwbGF5YWJsZSkge1xuICAgICAgICBpZiAoZGlzcGxheWFibGUuX3NoYWRvd0RvbSAhPSBudWxsKSB7XG4gICAgICAgICAgICBkaXNwbGF5YWJsZS5fc2hhZG93RG9tID0gbnVsbDtcbiAgICAgICAgICAgIHN2Z0VsZW1lbnQuc3R5bGUuZmlsdGVyID0gJyc7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFNoYWRvd01hbmFnZXIucHJvdG90eXBlLnVwZGF0ZURvbSA9IGZ1bmN0aW9uIChzdmdFbGVtZW50LCBkaXNwbGF5YWJsZSwgc2hhZG93RG9tKSB7XG4gICAgICAgIHZhciBkb21DaGlsZCA9IHNoYWRvd0RvbS5jaGlsZHJlblswXTtcbiAgICAgICAgdmFyIHN0eWxlID0gZGlzcGxheWFibGUuc3R5bGU7XG4gICAgICAgIHZhciBnbG9iYWxTY2FsZSA9IGRpc3BsYXlhYmxlLmdldEdsb2JhbFNjYWxlKCk7XG4gICAgICAgIHZhciBzY2FsZVggPSBnbG9iYWxTY2FsZVswXTtcbiAgICAgICAgdmFyIHNjYWxlWSA9IGdsb2JhbFNjYWxlWzFdO1xuICAgICAgICBpZiAoIXNjYWxlWCB8fCAhc2NhbGVZKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIG9mZnNldFggPSBzdHlsZS5zaGFkb3dPZmZzZXRYIHx8IDA7XG4gICAgICAgIHZhciBvZmZzZXRZID0gc3R5bGUuc2hhZG93T2Zmc2V0WSB8fCAwO1xuICAgICAgICB2YXIgYmx1ciA9IHN0eWxlLnNoYWRvd0JsdXI7XG4gICAgICAgIHZhciBjb2xvciA9IHN0eWxlLnNoYWRvd0NvbG9yO1xuICAgICAgICBkb21DaGlsZC5zZXRBdHRyaWJ1dGUoJ2R4Jywgb2Zmc2V0WCAvIHNjYWxlWCArICcnKTtcbiAgICAgICAgZG9tQ2hpbGQuc2V0QXR0cmlidXRlKCdkeScsIG9mZnNldFkgLyBzY2FsZVkgKyAnJyk7XG4gICAgICAgIGRvbUNoaWxkLnNldEF0dHJpYnV0ZSgnZmxvb2QtY29sb3InLCBjb2xvcik7XG4gICAgICAgIHZhciBzdGREeCA9IGJsdXIgLyAyIC8gc2NhbGVYO1xuICAgICAgICB2YXIgc3RkRHkgPSBibHVyIC8gMiAvIHNjYWxlWTtcbiAgICAgICAgdmFyIHN0ZERldmlhdGlvbiA9IHN0ZER4ICsgJyAnICsgc3RkRHk7XG4gICAgICAgIGRvbUNoaWxkLnNldEF0dHJpYnV0ZSgnc3RkRGV2aWF0aW9uJywgc3RkRGV2aWF0aW9uKTtcbiAgICAgICAgc2hhZG93RG9tLnNldEF0dHJpYnV0ZSgneCcsICctMTAwJScpO1xuICAgICAgICBzaGFkb3dEb20uc2V0QXR0cmlidXRlKCd5JywgJy0xMDAlJyk7XG4gICAgICAgIHNoYWRvd0RvbS5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzMwMCUnKTtcbiAgICAgICAgc2hhZG93RG9tLnNldEF0dHJpYnV0ZSgnaGVpZ2h0JywgJzMwMCUnKTtcbiAgICAgICAgZGlzcGxheWFibGUuX3NoYWRvd0RvbSA9IHNoYWRvd0RvbTtcbiAgICAgICAgdmFyIGlkID0gc2hhZG93RG9tLmdldEF0dHJpYnV0ZSgnaWQnKTtcbiAgICAgICAgc3ZnRWxlbWVudC5zdHlsZS5maWx0ZXIgPSAndXJsKCMnICsgaWQgKyAnKSc7XG4gICAgfTtcbiAgICBTaGFkb3dNYW5hZ2VyLnByb3RvdHlwZS5yZW1vdmVVbnVzZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBkZWZzID0gdGhpcy5nZXREZWZzKGZhbHNlKTtcbiAgICAgICAgaWYgKCFkZWZzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHNoYWRvd0RvbXNQb29sID0gdGhpcy5fc2hhZG93RG9tUG9vbDtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHRoaXMuX3NoYWRvd0RvbU1hcCkge1xuICAgICAgICAgICAgdmFyIGRvbSA9IHRoaXMuX3NoYWRvd0RvbU1hcFtrZXldO1xuICAgICAgICAgICAgc2hhZG93RG9tc1Bvb2wucHVzaChkb20pO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NoYWRvd0RvbU1hcCA9IHt9O1xuICAgIH07XG4gICAgcmV0dXJuIFNoYWRvd01hbmFnZXI7XG59KERlZmluYWJsZSkpO1xuZXhwb3J0IGRlZmF1bHQgU2hhZG93TWFuYWdlcjtcbmZ1bmN0aW9uIGhhc1NoYWRvdyhzdHlsZSkge1xuICAgIHJldHVybiBzdHlsZVxuICAgICAgICAmJiAoc3R5bGUuc2hhZG93Qmx1ciB8fCBzdHlsZS5zaGFkb3dPZmZzZXRYIHx8IHN0eWxlLnNoYWRvd09mZnNldFkpO1xufVxuZnVuY3Rpb24gZ2V0U2hhZG93S2V5KGRpc3BsYXlhYmxlKSB7XG4gICAgdmFyIHN0eWxlID0gZGlzcGxheWFibGUuc3R5bGU7XG4gICAgdmFyIGdsb2JhbFNjYWxlID0gZGlzcGxheWFibGUuZ2V0R2xvYmFsU2NhbGUoKTtcbiAgICByZXR1cm4gW1xuICAgICAgICBzdHlsZS5zaGFkb3dDb2xvcixcbiAgICAgICAgKHN0eWxlLnNoYWRvd0JsdXIgfHwgMCkudG9GaXhlZCgyKSxcbiAgICAgICAgKHN0eWxlLnNoYWRvd09mZnNldFggfHwgMCkudG9GaXhlZCgyKSxcbiAgICAgICAgKHN0eWxlLnNoYWRvd09mZnNldFkgfHwgMCkudG9GaXhlZCgyKSxcbiAgICAgICAgZ2xvYmFsU2NhbGVbMF0sXG4gICAgICAgIGdsb2JhbFNjYWxlWzFdXG4gICAgXS5qb2luKCcsJyk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9