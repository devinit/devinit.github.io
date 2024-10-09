(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_zrender_lib_animation_requestAnimationFrame_js-node_modules_zrender_lib_-f7e0e6"],{

/***/ "./node_modules/zrender/lib/Element.js":
/*!*********************************************!*\
  !*** ./node_modules/zrender/lib/Element.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PRESERVED_NORMAL_STATE": () => (/* binding */ PRESERVED_NORMAL_STATE),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _core_Transformable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./core/Transformable */ "./node_modules/zrender/lib/core/Transformable.js");
/* harmony import */ var _animation_Animator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./animation/Animator */ "./node_modules/zrender/lib/animation/Animator.js");
/* harmony import */ var _core_BoundingRect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./core/BoundingRect */ "./node_modules/zrender/lib/core/BoundingRect.js");
/* harmony import */ var _core_Eventful__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./core/Eventful */ "./node_modules/zrender/lib/core/Eventful.js");
/* harmony import */ var _contain_text__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./contain/text */ "./node_modules/zrender/lib/contain/text.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./config */ "./node_modules/zrender/lib/config.js");
/* harmony import */ var _tool_color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tool/color */ "./node_modules/zrender/lib/tool/color.js");
/* harmony import */ var _core_env__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./core/env */ "./node_modules/zrender/lib/core/env.js");









var PRESERVED_NORMAL_STATE = '__zr_normal__';
var PRIMARY_STATES_KEYS = ['x', 'y', 'scaleX', 'scaleY', 'originX', 'originY', 'rotation', 'ignore'];
var DEFAULT_ANIMATABLE_MAP = {
    x: true,
    y: true,
    scaleX: true,
    scaleY: true,
    originX: true,
    originY: true,
    rotation: true,
    ignore: false
};
var tmpTextPosCalcRes = {};
var tmpBoundingRect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_0__.default(0, 0, 0, 0);
var Element = (function () {
    function Element(props) {
        this.id = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.guid)();
        this.animators = [];
        this.currentStates = [];
        this.states = {};
        this._init(props);
    }
    Element.prototype._init = function (props) {
        this.attr(props);
    };
    Element.prototype.drift = function (dx, dy, e) {
        switch (this.draggable) {
            case 'horizontal':
                dy = 0;
                break;
            case 'vertical':
                dx = 0;
                break;
        }
        var m = this.transform;
        if (!m) {
            m = this.transform = [1, 0, 0, 1, 0, 0];
        }
        m[4] += dx;
        m[5] += dy;
        this.decomposeTransform();
        this.markRedraw();
    };
    Element.prototype.beforeUpdate = function () { };
    Element.prototype.afterUpdate = function () { };
    Element.prototype.update = function () {
        this.updateTransform();
        if (this.__dirty) {
            this.updateInnerText();
        }
    };
    Element.prototype.updateInnerText = function (forceUpdate) {
        var textEl = this._textContent;
        if (textEl && (!textEl.ignore || forceUpdate)) {
            if (!this.textConfig) {
                this.textConfig = {};
            }
            var textConfig = this.textConfig;
            var isLocal = textConfig.local;
            var attachedTransform = textEl.attachedTransform;
            var textAlign = void 0;
            var textVerticalAlign = void 0;
            var textStyleChanged = false;
            if (isLocal) {
                attachedTransform.parent = this;
            }
            else {
                attachedTransform.parent = null;
            }
            var innerOrigin = false;
            attachedTransform.x = textEl.x;
            attachedTransform.y = textEl.y;
            attachedTransform.originX = textEl.originX;
            attachedTransform.originY = textEl.originY;
            attachedTransform.rotation = textEl.rotation;
            attachedTransform.scaleX = textEl.scaleX;
            attachedTransform.scaleY = textEl.scaleY;
            if (textConfig.position != null) {
                var layoutRect = tmpBoundingRect;
                if (textConfig.layoutRect) {
                    layoutRect.copy(textConfig.layoutRect);
                }
                else {
                    layoutRect.copy(this.getBoundingRect());
                }
                if (!isLocal) {
                    layoutRect.applyTransform(this.transform);
                }
                if (this.calculateTextPosition) {
                    this.calculateTextPosition(tmpTextPosCalcRes, textConfig, layoutRect);
                }
                else {
                    (0,_contain_text__WEBPACK_IMPORTED_MODULE_2__.calculateTextPosition)(tmpTextPosCalcRes, textConfig, layoutRect);
                }
                attachedTransform.x = tmpTextPosCalcRes.x;
                attachedTransform.y = tmpTextPosCalcRes.y;
                textAlign = tmpTextPosCalcRes.align;
                textVerticalAlign = tmpTextPosCalcRes.verticalAlign;
                var textOrigin = textConfig.origin;
                if (textOrigin && textConfig.rotation != null) {
                    var relOriginX = void 0;
                    var relOriginY = void 0;
                    if (textOrigin === 'center') {
                        relOriginX = layoutRect.width * 0.5;
                        relOriginY = layoutRect.height * 0.5;
                    }
                    else {
                        relOriginX = (0,_contain_text__WEBPACK_IMPORTED_MODULE_2__.parsePercent)(textOrigin[0], layoutRect.width);
                        relOriginY = (0,_contain_text__WEBPACK_IMPORTED_MODULE_2__.parsePercent)(textOrigin[1], layoutRect.height);
                    }
                    innerOrigin = true;
                    attachedTransform.originX = -attachedTransform.x + relOriginX + (isLocal ? 0 : layoutRect.x);
                    attachedTransform.originY = -attachedTransform.y + relOriginY + (isLocal ? 0 : layoutRect.y);
                }
            }
            if (textConfig.rotation != null) {
                attachedTransform.rotation = textConfig.rotation;
            }
            var textOffset = textConfig.offset;
            if (textOffset) {
                attachedTransform.x += textOffset[0];
                attachedTransform.y += textOffset[1];
                if (!innerOrigin) {
                    attachedTransform.originX = -textOffset[0];
                    attachedTransform.originY = -textOffset[1];
                }
            }
            var isInside = textConfig.inside == null
                ? (typeof textConfig.position === 'string' && textConfig.position.indexOf('inside') >= 0)
                : textConfig.inside;
            var innerTextDefaultStyle = this._innerTextDefaultStyle || (this._innerTextDefaultStyle = {});
            var textFill = void 0;
            var textStroke = void 0;
            var autoStroke = void 0;
            if (isInside && this.canBeInsideText()) {
                textFill = textConfig.insideFill;
                textStroke = textConfig.insideStroke;
                if (textFill == null || textFill === 'auto') {
                    textFill = this.getInsideTextFill();
                }
                if (textStroke == null || textStroke === 'auto') {
                    textStroke = this.getInsideTextStroke(textFill);
                    autoStroke = true;
                }
            }
            else {
                textFill = textConfig.outsideFill;
                textStroke = textConfig.outsideStroke;
                if (textFill == null || textFill === 'auto') {
                    textFill = this.getOutsideFill();
                }
                if (textStroke == null || textStroke === 'auto') {
                    textStroke = this.getOutsideStroke(textFill);
                    autoStroke = true;
                }
            }
            textFill = textFill || '#000';
            if (textFill !== innerTextDefaultStyle.fill
                || textStroke !== innerTextDefaultStyle.stroke
                || autoStroke !== innerTextDefaultStyle.autoStroke
                || textAlign !== innerTextDefaultStyle.align
                || textVerticalAlign !== innerTextDefaultStyle.verticalAlign) {
                textStyleChanged = true;
                innerTextDefaultStyle.fill = textFill;
                innerTextDefaultStyle.stroke = textStroke;
                innerTextDefaultStyle.autoStroke = autoStroke;
                innerTextDefaultStyle.align = textAlign;
                innerTextDefaultStyle.verticalAlign = textVerticalAlign;
                textEl.setDefaultTextStyle(innerTextDefaultStyle);
            }
            if (textStyleChanged) {
                textEl.dirtyStyle();
            }
            textEl.markRedraw();
        }
    };
    Element.prototype.canBeInsideText = function () {
        return true;
    };
    Element.prototype.getInsideTextFill = function () {
        return '#fff';
    };
    Element.prototype.getInsideTextStroke = function (textFill) {
        return '#000';
    };
    Element.prototype.getOutsideFill = function () {
        return this.__zr && this.__zr.isDarkMode() ? _config__WEBPACK_IMPORTED_MODULE_3__.LIGHT_LABEL_COLOR : _config__WEBPACK_IMPORTED_MODULE_3__.DARK_LABEL_COLOR;
    };
    Element.prototype.getOutsideStroke = function (textFill) {
        var backgroundColor = this.__zr && this.__zr.getBackgroundColor();
        var colorArr = typeof backgroundColor === 'string' && (0,_tool_color__WEBPACK_IMPORTED_MODULE_4__.parse)(backgroundColor);
        if (!colorArr) {
            colorArr = [255, 255, 255, 1];
        }
        var alpha = colorArr[3];
        var isDark = this.__zr.isDarkMode();
        for (var i = 0; i < 3; i++) {
            colorArr[i] = colorArr[i] * alpha + (isDark ? 0 : 255) * (1 - alpha);
        }
        colorArr[3] = 1;
        return (0,_tool_color__WEBPACK_IMPORTED_MODULE_4__.stringify)(colorArr, 'rgba');
    };
    Element.prototype.traverse = function (cb, context) { };
    Element.prototype.attrKV = function (key, value) {
        if (key === 'textConfig') {
            this.setTextConfig(value);
        }
        else if (key === 'textContent') {
            this.setTextContent(value);
        }
        else if (key === 'clipPath') {
            this.setClipPath(value);
        }
        else if (key === 'extra') {
            this.extra = this.extra || {};
            (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.extend)(this.extra, value);
        }
        else {
            this[key] = value;
        }
    };
    Element.prototype.hide = function () {
        this.ignore = true;
        this.markRedraw();
    };
    Element.prototype.show = function () {
        this.ignore = false;
        this.markRedraw();
    };
    Element.prototype.attr = function (keyOrObj, value) {
        if (typeof keyOrObj === 'string') {
            this.attrKV(keyOrObj, value);
        }
        else if ((0,_core_util__WEBPACK_IMPORTED_MODULE_1__.isObject)(keyOrObj)) {
            var obj = keyOrObj;
            var keysArr = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.keys)(obj);
            for (var i = 0; i < keysArr.length; i++) {
                var key = keysArr[i];
                this.attrKV(key, keyOrObj[key]);
            }
        }
        this.markRedraw();
        return this;
    };
    Element.prototype.saveCurrentToNormalState = function (toState) {
        this._innerSaveToNormal(toState);
        var normalState = this._normalState;
        for (var i = 0; i < this.animators.length; i++) {
            var animator = this.animators[i];
            var fromStateTransition = animator.__fromStateTransition;
            if (fromStateTransition && fromStateTransition !== PRESERVED_NORMAL_STATE) {
                continue;
            }
            var targetName = animator.targetName;
            var target = targetName
                ? normalState[targetName] : normalState;
            animator.saveFinalToTarget(target);
        }
    };
    Element.prototype._innerSaveToNormal = function (toState) {
        var normalState = this._normalState;
        if (!normalState) {
            normalState = this._normalState = {};
        }
        if (toState.textConfig && !normalState.textConfig) {
            normalState.textConfig = this.textConfig;
        }
        this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS);
    };
    Element.prototype._savePrimaryToNormal = function (toState, normalState, primaryKeys) {
        for (var i = 0; i < primaryKeys.length; i++) {
            var key = primaryKeys[i];
            if (toState[key] != null && !(key in normalState)) {
                normalState[key] = this[key];
            }
        }
    };
    Element.prototype.hasState = function () {
        return this.currentStates.length > 0;
    };
    Element.prototype.getState = function (name) {
        return this.states[name];
    };
    Element.prototype.ensureState = function (name) {
        var states = this.states;
        if (!states[name]) {
            states[name] = {};
        }
        return states[name];
    };
    Element.prototype.clearStates = function (noAnimation) {
        this.useState(PRESERVED_NORMAL_STATE, false, noAnimation);
    };
    Element.prototype.useState = function (stateName, keepCurrentStates, noAnimation) {
        var toNormalState = stateName === PRESERVED_NORMAL_STATE;
        var hasStates = this.hasState();
        if (!hasStates && toNormalState) {
            return;
        }
        var currentStates = this.currentStates;
        var animationCfg = this.stateTransition;
        if ((0,_core_util__WEBPACK_IMPORTED_MODULE_1__.indexOf)(currentStates, stateName) >= 0 && (keepCurrentStates || currentStates.length === 1)) {
            return;
        }
        var state;
        if (this.stateProxy && !toNormalState) {
            state = this.stateProxy(stateName);
        }
        if (!state) {
            state = (this.states && this.states[stateName]);
        }
        if (!state && !toNormalState) {
            (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.logError)("State " + stateName + " not exists.");
            return;
        }
        if (!toNormalState) {
            this.saveCurrentToNormalState(state);
        }
        var useHoverLayer = !!(state && state.hoverLayer);
        if (useHoverLayer) {
            this._toggleHoverLayerFlag(true);
        }
        this._applyStateObj(stateName, state, this._normalState, keepCurrentStates, !noAnimation && !this.__inHover && animationCfg && animationCfg.duration > 0, animationCfg);
        if (this._textContent) {
            this._textContent.useState(stateName, keepCurrentStates);
        }
        if (this._textGuide) {
            this._textGuide.useState(stateName, keepCurrentStates);
        }
        if (toNormalState) {
            this.currentStates = [];
            this._normalState = {};
        }
        else {
            if (!keepCurrentStates) {
                this.currentStates = [stateName];
            }
            else {
                this.currentStates.push(stateName);
            }
        }
        this._updateAnimationTargets();
        this.markRedraw();
        if (!useHoverLayer && this.__inHover) {
            this._toggleHoverLayerFlag(false);
            this.__dirty &= ~Element.REDARAW_BIT;
        }
        return state;
    };
    Element.prototype.useStates = function (states, noAnimation) {
        if (!states.length) {
            this.clearStates();
        }
        else {
            var stateObjects = [];
            var currentStates = this.currentStates;
            var len = states.length;
            var notChange = len === currentStates.length;
            if (notChange) {
                for (var i = 0; i < len; i++) {
                    if (states[i] !== currentStates[i]) {
                        notChange = false;
                        break;
                    }
                }
            }
            if (notChange) {
                return;
            }
            for (var i = 0; i < len; i++) {
                var stateName = states[i];
                var stateObj = void 0;
                if (this.stateProxy) {
                    stateObj = this.stateProxy(stateName, states);
                }
                if (!stateObj) {
                    stateObj = this.states[stateName];
                }
                if (stateObj) {
                    stateObjects.push(stateObj);
                }
            }
            var useHoverLayer = !!(stateObjects[len - 1] && stateObjects[len - 1].hoverLayer);
            if (useHoverLayer) {
                this._toggleHoverLayerFlag(true);
            }
            var mergedState = this._mergeStates(stateObjects);
            var animationCfg = this.stateTransition;
            this.saveCurrentToNormalState(mergedState);
            this._applyStateObj(states.join(','), mergedState, this._normalState, false, !noAnimation && !this.__inHover && animationCfg && animationCfg.duration > 0, animationCfg);
            if (this._textContent) {
                this._textContent.useStates(states);
            }
            if (this._textGuide) {
                this._textGuide.useStates(states);
            }
            this._updateAnimationTargets();
            this.currentStates = states.slice();
            this.markRedraw();
            if (!useHoverLayer && this.__inHover) {
                this._toggleHoverLayerFlag(false);
                this.__dirty &= ~Element.REDARAW_BIT;
            }
        }
    };
    Element.prototype._updateAnimationTargets = function () {
        for (var i = 0; i < this.animators.length; i++) {
            var animator = this.animators[i];
            if (animator.targetName) {
                animator.changeTarget(this[animator.targetName]);
            }
        }
    };
    Element.prototype.removeState = function (state) {
        var idx = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.indexOf)(this.currentStates, state);
        if (idx >= 0) {
            var currentStates = this.currentStates.slice();
            currentStates.splice(idx, 1);
            this.useStates(currentStates);
        }
    };
    Element.prototype.replaceState = function (oldState, newState, forceAdd) {
        var currentStates = this.currentStates.slice();
        var idx = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.indexOf)(currentStates, oldState);
        var newStateExists = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.indexOf)(currentStates, newState) >= 0;
        if (idx >= 0) {
            if (!newStateExists) {
                currentStates[idx] = newState;
            }
            else {
                currentStates.splice(idx, 1);
            }
        }
        else if (forceAdd && !newStateExists) {
            currentStates.push(newState);
        }
        this.useStates(currentStates);
    };
    Element.prototype.toggleState = function (state, enable) {
        if (enable) {
            this.useState(state, true);
        }
        else {
            this.removeState(state);
        }
    };
    Element.prototype._mergeStates = function (states) {
        var mergedState = {};
        var mergedTextConfig;
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.extend)(mergedState, state);
            if (state.textConfig) {
                mergedTextConfig = mergedTextConfig || {};
                (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.extend)(mergedTextConfig, state.textConfig);
            }
        }
        if (mergedTextConfig) {
            mergedState.textConfig = mergedTextConfig;
        }
        return mergedState;
    };
    Element.prototype._applyStateObj = function (stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
        var needsRestoreToNormal = !(state && keepCurrentStates);
        if (state && state.textConfig) {
            this.textConfig = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.extend)({}, keepCurrentStates ? this.textConfig : normalState.textConfig);
            (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.extend)(this.textConfig, state.textConfig);
        }
        else if (needsRestoreToNormal) {
            if (normalState.textConfig) {
                this.textConfig = normalState.textConfig;
            }
        }
        var transitionTarget = {};
        var hasTransition = false;
        for (var i = 0; i < PRIMARY_STATES_KEYS.length; i++) {
            var key = PRIMARY_STATES_KEYS[i];
            var propNeedsTransition = transition && DEFAULT_ANIMATABLE_MAP[key];
            if (state && state[key] != null) {
                if (propNeedsTransition) {
                    hasTransition = true;
                    transitionTarget[key] = state[key];
                }
                else {
                    this[key] = state[key];
                }
            }
            else if (needsRestoreToNormal) {
                if (normalState[key] != null) {
                    if (propNeedsTransition) {
                        hasTransition = true;
                        transitionTarget[key] = normalState[key];
                    }
                    else {
                        this[key] = normalState[key];
                    }
                }
            }
        }
        if (!transition) {
            for (var i = 0; i < this.animators.length; i++) {
                var animator = this.animators[i];
                var targetName = animator.targetName;
                animator.__changeFinalValue(targetName
                    ? (state || normalState)[targetName]
                    : (state || normalState));
            }
        }
        if (hasTransition) {
            this._transitionState(stateName, transitionTarget, animationCfg);
        }
    };
    Element.prototype._attachComponent = function (componentEl) {
        if (componentEl.__zr && !componentEl.__hostTarget) {
            throw new Error('Text element has been added to zrender.');
        }
        if (componentEl === this) {
            throw new Error('Recursive component attachment.');
        }
        var zr = this.__zr;
        if (zr) {
            componentEl.addSelfToZr(zr);
        }
        componentEl.__zr = zr;
        componentEl.__hostTarget = this;
    };
    Element.prototype._detachComponent = function (componentEl) {
        if (componentEl.__zr) {
            componentEl.removeSelfFromZr(componentEl.__zr);
        }
        componentEl.__zr = null;
        componentEl.__hostTarget = null;
    };
    Element.prototype.getClipPath = function () {
        return this._clipPath;
    };
    Element.prototype.setClipPath = function (clipPath) {
        if (this._clipPath && this._clipPath !== clipPath) {
            this.removeClipPath();
        }
        this._attachComponent(clipPath);
        this._clipPath = clipPath;
        this.markRedraw();
    };
    Element.prototype.removeClipPath = function () {
        var clipPath = this._clipPath;
        if (clipPath) {
            this._detachComponent(clipPath);
            this._clipPath = null;
            this.markRedraw();
        }
    };
    Element.prototype.getTextContent = function () {
        return this._textContent;
    };
    Element.prototype.setTextContent = function (textEl) {
        var previousTextContent = this._textContent;
        if (previousTextContent === textEl) {
            return;
        }
        if (previousTextContent && previousTextContent !== textEl) {
            this.removeTextContent();
        }
        if (textEl.__zr && !textEl.__hostTarget) {
            throw new Error('Text element has been added to zrender.');
        }
        textEl.attachedTransform = new _core_Transformable__WEBPACK_IMPORTED_MODULE_5__.default();
        this._attachComponent(textEl);
        this._textContent = textEl;
        this.markRedraw();
    };
    Element.prototype.setTextConfig = function (cfg) {
        if (!this.textConfig) {
            this.textConfig = {};
        }
        (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.extend)(this.textConfig, cfg);
        this.markRedraw();
    };
    Element.prototype.removeTextContent = function () {
        var textEl = this._textContent;
        if (textEl) {
            textEl.attachedTransform = null;
            this._detachComponent(textEl);
            this._textContent = null;
            this._innerTextDefaultStyle = null;
            this.markRedraw();
        }
    };
    Element.prototype.getTextGuideLine = function () {
        return this._textGuide;
    };
    Element.prototype.setTextGuideLine = function (guideLine) {
        if (this._textGuide && this._textGuide !== guideLine) {
            this.removeTextGuideLine();
        }
        this._attachComponent(guideLine);
        this._textGuide = guideLine;
        this.markRedraw();
    };
    Element.prototype.removeTextGuideLine = function () {
        var textGuide = this._textGuide;
        if (textGuide) {
            this._detachComponent(textGuide);
            this._textGuide = null;
            this.markRedraw();
        }
    };
    Element.prototype.markRedraw = function () {
        this.__dirty |= Element.REDARAW_BIT;
        var zr = this.__zr;
        if (zr) {
            if (this.__inHover) {
                zr.refreshHover();
            }
            else {
                zr.refresh();
            }
        }
        if (this.__hostTarget) {
            this.__hostTarget.markRedraw();
        }
    };
    Element.prototype.dirty = function () {
        this.markRedraw();
    };
    Element.prototype._toggleHoverLayerFlag = function (inHover) {
        this.__inHover = inHover;
        var textContent = this._textContent;
        var textGuide = this._textGuide;
        if (textContent) {
            textContent.__inHover = inHover;
        }
        if (textGuide) {
            textGuide.__inHover = inHover;
        }
    };
    Element.prototype.addSelfToZr = function (zr) {
        this.__zr = zr;
        var animators = this.animators;
        if (animators) {
            for (var i = 0; i < animators.length; i++) {
                zr.animation.addAnimator(animators[i]);
            }
        }
        if (this._clipPath) {
            this._clipPath.addSelfToZr(zr);
        }
        if (this._textContent) {
            this._textContent.addSelfToZr(zr);
        }
        if (this._textGuide) {
            this._textGuide.addSelfToZr(zr);
        }
    };
    Element.prototype.removeSelfFromZr = function (zr) {
        this.__zr = null;
        var animators = this.animators;
        if (animators) {
            for (var i = 0; i < animators.length; i++) {
                zr.animation.removeAnimator(animators[i]);
            }
        }
        if (this._clipPath) {
            this._clipPath.removeSelfFromZr(zr);
        }
        if (this._textContent) {
            this._textContent.removeSelfFromZr(zr);
        }
        if (this._textGuide) {
            this._textGuide.removeSelfFromZr(zr);
        }
    };
    Element.prototype.animate = function (key, loop) {
        var target = key ? this[key] : this;
        if (!target) {
            (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.logError)('Property "'
                + key
                + '" is not existed in element '
                + this.id);
            return;
        }
        var animator = new _animation_Animator__WEBPACK_IMPORTED_MODULE_6__.default(target, loop);
        this.addAnimator(animator, key);
        return animator;
    };
    Element.prototype.addAnimator = function (animator, key) {
        var zr = this.__zr;
        var el = this;
        animator.during(function () {
            el.updateDuringAnimation(key);
        }).done(function () {
            var animators = el.animators;
            var idx = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.indexOf)(animators, animator);
            if (idx >= 0) {
                animators.splice(idx, 1);
            }
        });
        this.animators.push(animator);
        if (zr) {
            zr.animation.addAnimator(animator);
        }
        zr && zr.wakeUp();
    };
    Element.prototype.updateDuringAnimation = function (key) {
        this.markRedraw();
    };
    Element.prototype.stopAnimation = function (scope, forwardToLast) {
        var animators = this.animators;
        var len = animators.length;
        var leftAnimators = [];
        for (var i = 0; i < len; i++) {
            var animator = animators[i];
            if (!scope || scope === animator.scope) {
                animator.stop(forwardToLast);
            }
            else {
                leftAnimators.push(animator);
            }
        }
        this.animators = leftAnimators;
        return this;
    };
    Element.prototype.animateTo = function (target, cfg, animationProps) {
        animateTo(this, target, cfg, animationProps);
    };
    Element.prototype.animateFrom = function (target, cfg, animationProps) {
        animateTo(this, target, cfg, animationProps, true);
    };
    Element.prototype._transitionState = function (stateName, target, cfg, animationProps) {
        var animators = animateTo(this, target, cfg, animationProps);
        for (var i = 0; i < animators.length; i++) {
            animators[i].__fromStateTransition = stateName;
        }
    };
    Element.prototype.getBoundingRect = function () {
        return null;
    };
    Element.prototype.getPaintRect = function () {
        return null;
    };
    Element.REDARAW_BIT = 1;
    Element.initDefaultProps = (function () {
        var elProto = Element.prototype;
        elProto.type = 'element';
        elProto.name = '';
        elProto.ignore = false;
        elProto.silent = false;
        elProto.isGroup = false;
        elProto.draggable = false;
        elProto.dragging = false;
        elProto.ignoreClip = false;
        elProto.__inHover = false;
        elProto.__dirty = Element.REDARAW_BIT;
        var logs = {};
        function logDeprecatedError(key, xKey, yKey) {
            if (!logs[key + xKey + yKey]) {
                console.warn("DEPRECATED: '" + key + "' has been deprecated. use '" + xKey + "', '" + yKey + "' instead");
                logs[key + xKey + yKey] = true;
            }
        }
        function createLegacyProperty(key, privateKey, xKey, yKey) {
            Object.defineProperty(elProto, key, {
                get: function () {
                    logDeprecatedError(key, xKey, yKey);
                    if (!this[privateKey]) {
                        var pos = this[privateKey] = [];
                        enhanceArray(this, pos);
                    }
                    return this[privateKey];
                },
                set: function (pos) {
                    logDeprecatedError(key, xKey, yKey);
                    this[xKey] = pos[0];
                    this[yKey] = pos[1];
                    this[privateKey] = pos;
                    enhanceArray(this, pos);
                }
            });
            function enhanceArray(self, pos) {
                Object.defineProperty(pos, 0, {
                    get: function () {
                        return self[xKey];
                    },
                    set: function (val) {
                        self[xKey] = val;
                    }
                });
                Object.defineProperty(pos, 1, {
                    get: function () {
                        return self[yKey];
                    },
                    set: function (val) {
                        self[yKey] = val;
                    }
                });
            }
        }
        if (Object.defineProperty && (!_core_env__WEBPACK_IMPORTED_MODULE_7__.default.browser.ie || _core_env__WEBPACK_IMPORTED_MODULE_7__.default.browser.version > 8)) {
            createLegacyProperty('position', '_legacyPos', 'x', 'y');
            createLegacyProperty('scale', '_legacyScale', 'scaleX', 'scaleY');
            createLegacyProperty('origin', '_legacyOrigin', 'originX', 'originY');
        }
    })();
    return Element;
}());
(0,_core_util__WEBPACK_IMPORTED_MODULE_1__.mixin)(Element, _core_Eventful__WEBPACK_IMPORTED_MODULE_8__.default);
(0,_core_util__WEBPACK_IMPORTED_MODULE_1__.mixin)(Element, _core_Transformable__WEBPACK_IMPORTED_MODULE_5__.default);
function animateTo(animatable, target, cfg, animationProps, reverse) {
    cfg = cfg || {};
    var animators = [];
    animateToShallow(animatable, '', animatable, target, cfg, animationProps, animators, reverse);
    var finishCount = animators.length;
    var doneHappened = false;
    var cfgDone = cfg.done;
    var cfgAborted = cfg.aborted;
    var doneCb = function () {
        doneHappened = true;
        finishCount--;
        if (finishCount <= 0) {
            doneHappened
                ? (cfgDone && cfgDone())
                : (cfgAborted && cfgAborted());
        }
    };
    var abortedCb = function () {
        finishCount--;
        if (finishCount <= 0) {
            doneHappened
                ? (cfgDone && cfgDone())
                : (cfgAborted && cfgAborted());
        }
    };
    if (!finishCount) {
        cfgDone && cfgDone();
    }
    if (animators.length > 0 && cfg.during) {
        animators[0].during(function (target, percent) {
            cfg.during(percent);
        });
    }
    for (var i = 0; i < animators.length; i++) {
        var animator = animators[i];
        if (doneCb) {
            animator.done(doneCb);
        }
        if (abortedCb) {
            animator.aborted(abortedCb);
        }
        animator.start(cfg.easing, cfg.force);
    }
    return animators;
}
function copyArrShallow(source, target, len) {
    for (var i = 0; i < len; i++) {
        source[i] = target[i];
    }
}
function is2DArray(value) {
    return (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(value[0]);
}
function copyValue(target, source, key) {
    if ((0,_core_util__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(source[key])) {
        if (!(0,_core_util__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(target[key])) {
            target[key] = [];
        }
        if ((0,_core_util__WEBPACK_IMPORTED_MODULE_1__.isTypedArray)(source[key])) {
            var len = source[key].length;
            if (target[key].length !== len) {
                target[key] = new (source[key].constructor)(len);
                copyArrShallow(target[key], source[key], len);
            }
        }
        else {
            var sourceArr = source[key];
            var targetArr = target[key];
            var len0 = sourceArr.length;
            if (is2DArray(sourceArr)) {
                var len1 = sourceArr[0].length;
                for (var i = 0; i < len0; i++) {
                    if (!targetArr[i]) {
                        targetArr[i] = Array.prototype.slice.call(sourceArr[i]);
                    }
                    else {
                        copyArrShallow(targetArr[i], sourceArr[i], len1);
                    }
                }
            }
            else {
                copyArrShallow(targetArr, sourceArr, len0);
            }
            targetArr.length = sourceArr.length;
        }
    }
    else {
        target[key] = source[key];
    }
}
function animateToShallow(animatable, topKey, source, target, cfg, animationProps, animators, reverse) {
    var animatableKeys = [];
    var changedKeys = [];
    var targetKeys = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.keys)(target);
    var duration = cfg.duration;
    var delay = cfg.delay;
    var additive = cfg.additive;
    var setToFinal = cfg.setToFinal;
    var animateAll = !(0,_core_util__WEBPACK_IMPORTED_MODULE_1__.isObject)(animationProps);
    for (var k = 0; k < targetKeys.length; k++) {
        var innerKey = targetKeys[k];
        if (source[innerKey] != null
            && target[innerKey] != null
            && (animateAll || animationProps[innerKey])) {
            if ((0,_core_util__WEBPACK_IMPORTED_MODULE_1__.isObject)(target[innerKey]) && !(0,_core_util__WEBPACK_IMPORTED_MODULE_1__.isArrayLike)(target[innerKey])) {
                if (topKey) {
                    if (!reverse) {
                        source[innerKey] = target[innerKey];
                        animatable.updateDuringAnimation(topKey);
                    }
                    continue;
                }
                animateToShallow(animatable, innerKey, source[innerKey], target[innerKey], cfg, animationProps && animationProps[innerKey], animators, reverse);
            }
            else {
                animatableKeys.push(innerKey);
                changedKeys.push(innerKey);
            }
        }
        else if (!reverse) {
            source[innerKey] = target[innerKey];
            animatable.updateDuringAnimation(topKey);
            changedKeys.push(innerKey);
        }
    }
    var keyLen = animatableKeys.length;
    if (keyLen > 0
        || (cfg.force && !animators.length)) {
        var existsAnimators = animatable.animators;
        var existsAnimatorsOnSameTarget = [];
        for (var i = 0; i < existsAnimators.length; i++) {
            if (existsAnimators[i].targetName === topKey) {
                existsAnimatorsOnSameTarget.push(existsAnimators[i]);
            }
        }
        if (!additive && existsAnimatorsOnSameTarget.length) {
            for (var i = 0; i < existsAnimatorsOnSameTarget.length; i++) {
                var allAborted = existsAnimatorsOnSameTarget[i].stopTracks(changedKeys);
                if (allAborted) {
                    var idx = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.indexOf)(existsAnimators, existsAnimatorsOnSameTarget[i]);
                    existsAnimators.splice(idx, 1);
                }
            }
        }
        var revertedSource = void 0;
        var reversedTarget = void 0;
        var sourceClone = void 0;
        if (reverse) {
            reversedTarget = {};
            if (setToFinal) {
                revertedSource = {};
            }
            for (var i = 0; i < keyLen; i++) {
                var innerKey = animatableKeys[i];
                reversedTarget[innerKey] = source[innerKey];
                if (setToFinal) {
                    revertedSource[innerKey] = target[innerKey];
                }
                else {
                    source[innerKey] = target[innerKey];
                }
            }
        }
        else if (setToFinal) {
            sourceClone = {};
            for (var i = 0; i < keyLen; i++) {
                var innerKey = animatableKeys[i];
                sourceClone[innerKey] = (0,_animation_Animator__WEBPACK_IMPORTED_MODULE_6__.cloneValue)(source[innerKey]);
                copyValue(source, target, innerKey);
            }
        }
        var animator = new _animation_Animator__WEBPACK_IMPORTED_MODULE_6__.default(source, false, additive ? existsAnimatorsOnSameTarget : null);
        animator.targetName = topKey;
        if (cfg.scope) {
            animator.scope = cfg.scope;
        }
        if (setToFinal && revertedSource) {
            animator.whenWithKeys(0, revertedSource, animatableKeys);
        }
        if (sourceClone) {
            animator.whenWithKeys(0, sourceClone, animatableKeys);
        }
        animator.whenWithKeys(duration == null ? 500 : duration, reverse ? reversedTarget : target, animatableKeys).delay(delay || 0);
        animatable.addAnimator(animator, topKey);
        animators.push(animator);
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Element);


/***/ }),

/***/ "./node_modules/zrender/lib/animation/Animator.js":
/*!********************************************************!*\
  !*** ./node_modules/zrender/lib/animation/Animator.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "interpolateNumber": () => (/* binding */ interpolateNumber),
/* harmony export */   "step": () => (/* binding */ step),
/* harmony export */   "interpolate1DArray": () => (/* binding */ interpolate1DArray),
/* harmony export */   "interpolate2DArray": () => (/* binding */ interpolate2DArray),
/* harmony export */   "cloneValue": () => (/* binding */ cloneValue),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Clip__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Clip */ "./node_modules/zrender/lib/animation/Clip.js");
/* harmony import */ var _tool_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../tool/color */ "./node_modules/zrender/lib/tool/color.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");



var arraySlice = Array.prototype.slice;
function interpolateNumber(p0, p1, percent) {
    return (p1 - p0) * percent + p0;
}
function step(p0, p1, percent) {
    return percent > 0.5 ? p1 : p0;
}
function interpolate1DArray(out, p0, p1, percent) {
    var len = p0.length;
    for (var i = 0; i < len; i++) {
        out[i] = interpolateNumber(p0[i], p1[i], percent);
    }
}
function interpolate2DArray(out, p0, p1, percent) {
    var len = p0.length;
    var len2 = len && p0[0].length;
    for (var i = 0; i < len; i++) {
        if (!out[i]) {
            out[i] = [];
        }
        for (var j = 0; j < len2; j++) {
            out[i][j] = interpolateNumber(p0[i][j], p1[i][j], percent);
        }
    }
}
function add1DArray(out, p0, p1, sign) {
    var len = p0.length;
    for (var i = 0; i < len; i++) {
        out[i] = p0[i] + p1[i] * sign;
    }
    return out;
}
function add2DArray(out, p0, p1, sign) {
    var len = p0.length;
    var len2 = len && p0[0].length;
    for (var i = 0; i < len; i++) {
        if (!out[i]) {
            out[i] = [];
        }
        for (var j = 0; j < len2; j++) {
            out[i][j] = p0[i][j] + p1[i][j] * sign;
        }
    }
    return out;
}
function fillArray(val0, val1, arrDim) {
    var arr0 = val0;
    var arr1 = val1;
    if (!arr0.push || !arr1.push) {
        return;
    }
    var arr0Len = arr0.length;
    var arr1Len = arr1.length;
    if (arr0Len !== arr1Len) {
        var isPreviousLarger = arr0Len > arr1Len;
        if (isPreviousLarger) {
            arr0.length = arr1Len;
        }
        else {
            for (var i = arr0Len; i < arr1Len; i++) {
                arr0.push(arrDim === 1 ? arr1[i] : arraySlice.call(arr1[i]));
            }
        }
    }
    var len2 = arr0[0] && arr0[0].length;
    for (var i = 0; i < arr0.length; i++) {
        if (arrDim === 1) {
            if (isNaN(arr0[i])) {
                arr0[i] = arr1[i];
            }
        }
        else {
            for (var j = 0; j < len2; j++) {
                if (isNaN(arr0[i][j])) {
                    arr0[i][j] = arr1[i][j];
                }
            }
        }
    }
}
function is1DArraySame(arr0, arr1) {
    var len = arr0.length;
    if (len !== arr1.length) {
        return false;
    }
    for (var i = 0; i < len; i++) {
        if (arr0[i] !== arr1[i]) {
            return false;
        }
    }
    return true;
}
function is2DArraySame(arr0, arr1) {
    var len = arr0.length;
    if (len !== arr1.length) {
        return false;
    }
    var len2 = arr0[0].length;
    for (var i = 0; i < len; i++) {
        for (var j = 0; j < len2; j++) {
            if (arr0[i][j] !== arr1[i][j]) {
                return false;
            }
        }
    }
    return true;
}
function catmullRomInterpolate(p0, p1, p2, p3, t, t2, t3) {
    var v0 = (p2 - p0) * 0.5;
    var v1 = (p3 - p1) * 0.5;
    return (2 * (p1 - p2) + v0 + v1) * t3
        + (-3 * (p1 - p2) - 2 * v0 - v1) * t2
        + v0 * t + p1;
}
function catmullRomInterpolate1DArray(out, p0, p1, p2, p3, t, t2, t3) {
    var len = p0.length;
    for (var i = 0; i < len; i++) {
        out[i] = catmullRomInterpolate(p0[i], p1[i], p2[i], p3[i], t, t2, t3);
    }
}
function catmullRomInterpolate2DArray(out, p0, p1, p2, p3, t, t2, t3) {
    var len = p0.length;
    var len2 = p0[0].length;
    for (var i = 0; i < len; i++) {
        if (!out[i]) {
            out[1] = [];
        }
        for (var j = 0; j < len2; j++) {
            out[i][j] = catmullRomInterpolate(p0[i][j], p1[i][j], p2[i][j], p3[i][j], t, t2, t3);
        }
    }
}
function cloneValue(value) {
    if ((0,_core_util__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(value)) {
        var len = value.length;
        if ((0,_core_util__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(value[0])) {
            var ret = [];
            for (var i = 0; i < len; i++) {
                ret.push(arraySlice.call(value[i]));
            }
            return ret;
        }
        return arraySlice.call(value);
    }
    return value;
}
function rgba2String(rgba) {
    rgba[0] = Math.floor(rgba[0]);
    rgba[1] = Math.floor(rgba[1]);
    rgba[2] = Math.floor(rgba[2]);
    return 'rgba(' + rgba.join(',') + ')';
}
function guessArrayDim(value) {
    return (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(value && value[0]) ? 2 : 1;
}
var tmpRgba = [0, 0, 0, 0];
var Track = (function () {
    function Track(propName) {
        this.keyframes = [];
        this.maxTime = 0;
        this.arrDim = 0;
        this.interpolable = true;
        this._needsSort = false;
        this._isAllValueEqual = true;
        this._lastFrame = 0;
        this._lastFramePercent = 0;
        this.propName = propName;
    }
    Track.prototype.isFinished = function () {
        return this._finished;
    };
    Track.prototype.setFinished = function () {
        this._finished = true;
        if (this._additiveTrack) {
            this._additiveTrack.setFinished();
        }
    };
    Track.prototype.needsAnimate = function () {
        return !this._isAllValueEqual && this.keyframes.length >= 2 && this.interpolable;
    };
    Track.prototype.getAdditiveTrack = function () {
        return this._additiveTrack;
    };
    Track.prototype.addKeyframe = function (time, value) {
        if (time >= this.maxTime) {
            this.maxTime = time;
        }
        else {
            this._needsSort = true;
        }
        var keyframes = this.keyframes;
        var len = keyframes.length;
        if (this.interpolable) {
            if ((0,_core_util__WEBPACK_IMPORTED_MODULE_0__.isArrayLike)(value)) {
                var arrayDim = guessArrayDim(value);
                if (len > 0 && this.arrDim !== arrayDim) {
                    this.interpolable = false;
                    return;
                }
                if (arrayDim === 1 && typeof value[0] !== 'number'
                    || arrayDim === 2 && typeof value[0][0] !== 'number') {
                    this.interpolable = false;
                    return;
                }
                if (len > 0) {
                    var lastFrame = keyframes[len - 1];
                    if (this._isAllValueEqual) {
                        if (arrayDim === 1) {
                            if (!is1DArraySame(value, lastFrame.value)) {
                                this._isAllValueEqual = false;
                            }
                        }
                        else {
                            this._isAllValueEqual = false;
                        }
                    }
                }
                this.arrDim = arrayDim;
            }
            else {
                if (this.arrDim > 0) {
                    this.interpolable = false;
                    return;
                }
                if (typeof value === 'string') {
                    var colorArray = _tool_color__WEBPACK_IMPORTED_MODULE_1__.parse(value);
                    if (colorArray) {
                        value = colorArray;
                        this.isValueColor = true;
                    }
                    else {
                        this.interpolable = false;
                    }
                }
                else if (typeof value !== 'number') {
                    this.interpolable = false;
                    return;
                }
                if (this._isAllValueEqual && len > 0) {
                    var lastFrame = keyframes[len - 1];
                    if (this.isValueColor && !is1DArraySame(lastFrame.value, value)) {
                        this._isAllValueEqual = false;
                    }
                    else if (lastFrame.value !== value) {
                        this._isAllValueEqual = false;
                    }
                }
            }
        }
        var kf = {
            time: time,
            value: value,
            percent: 0
        };
        this.keyframes.push(kf);
        return kf;
    };
    Track.prototype.prepare = function (additiveTrack) {
        var kfs = this.keyframes;
        if (this._needsSort) {
            kfs.sort(function (a, b) {
                return a.time - b.time;
            });
        }
        var arrDim = this.arrDim;
        var kfsLen = kfs.length;
        var lastKf = kfs[kfsLen - 1];
        for (var i = 0; i < kfsLen; i++) {
            kfs[i].percent = kfs[i].time / this.maxTime;
            if (arrDim > 0 && i !== kfsLen - 1) {
                fillArray(kfs[i].value, lastKf.value, arrDim);
            }
        }
        if (additiveTrack
            && this.needsAnimate()
            && additiveTrack.needsAnimate()
            && arrDim === additiveTrack.arrDim
            && this.isValueColor === additiveTrack.isValueColor
            && !additiveTrack._finished) {
            this._additiveTrack = additiveTrack;
            var startValue = kfs[0].value;
            for (var i = 0; i < kfsLen; i++) {
                if (arrDim === 0) {
                    if (this.isValueColor) {
                        kfs[i].additiveValue
                            = add1DArray([], kfs[i].value, startValue, -1);
                    }
                    else {
                        kfs[i].additiveValue = kfs[i].value - startValue;
                    }
                }
                else if (arrDim === 1) {
                    kfs[i].additiveValue = add1DArray([], kfs[i].value, startValue, -1);
                }
                else if (arrDim === 2) {
                    kfs[i].additiveValue = add2DArray([], kfs[i].value, startValue, -1);
                }
            }
        }
    };
    Track.prototype.step = function (target, percent) {
        if (this._finished) {
            return;
        }
        if (this._additiveTrack && this._additiveTrack._finished) {
            this._additiveTrack = null;
        }
        var isAdditive = this._additiveTrack != null;
        var valueKey = isAdditive ? 'additiveValue' : 'value';
        var keyframes = this.keyframes;
        var kfsNum = this.keyframes.length;
        var propName = this.propName;
        var arrDim = this.arrDim;
        var isValueColor = this.isValueColor;
        var frameIdx;
        if (percent < 0) {
            frameIdx = 0;
        }
        else if (percent < this._lastFramePercent) {
            var start = Math.min(this._lastFrame + 1, kfsNum - 1);
            for (frameIdx = start; frameIdx >= 0; frameIdx--) {
                if (keyframes[frameIdx].percent <= percent) {
                    break;
                }
            }
            frameIdx = Math.min(frameIdx, kfsNum - 2);
        }
        else {
            for (frameIdx = this._lastFrame; frameIdx < kfsNum; frameIdx++) {
                if (keyframes[frameIdx].percent > percent) {
                    break;
                }
            }
            frameIdx = Math.min(frameIdx - 1, kfsNum - 2);
        }
        var nextFrame = keyframes[frameIdx + 1];
        var frame = keyframes[frameIdx];
        if (!(frame && nextFrame)) {
            return;
        }
        this._lastFrame = frameIdx;
        this._lastFramePercent = percent;
        var range = (nextFrame.percent - frame.percent);
        if (range === 0) {
            return;
        }
        var w = (percent - frame.percent) / range;
        var targetArr = isAdditive ? this._additiveValue
            : (isValueColor ? tmpRgba : target[propName]);
        if ((arrDim > 0 || isValueColor) && !targetArr) {
            targetArr = this._additiveValue = [];
        }
        if (this.useSpline) {
            var p1 = keyframes[frameIdx][valueKey];
            var p0 = keyframes[frameIdx === 0 ? frameIdx : frameIdx - 1][valueKey];
            var p2 = keyframes[frameIdx > kfsNum - 2 ? kfsNum - 1 : frameIdx + 1][valueKey];
            var p3 = keyframes[frameIdx > kfsNum - 3 ? kfsNum - 1 : frameIdx + 2][valueKey];
            if (arrDim > 0) {
                arrDim === 1
                    ? catmullRomInterpolate1DArray(targetArr, p0, p1, p2, p3, w, w * w, w * w * w)
                    : catmullRomInterpolate2DArray(targetArr, p0, p1, p2, p3, w, w * w, w * w * w);
            }
            else if (isValueColor) {
                catmullRomInterpolate1DArray(targetArr, p0, p1, p2, p3, w, w * w, w * w * w);
                if (!isAdditive) {
                    target[propName] = rgba2String(targetArr);
                }
            }
            else {
                var value = void 0;
                if (!this.interpolable) {
                    value = p2;
                }
                else {
                    value = catmullRomInterpolate(p0, p1, p2, p3, w, w * w, w * w * w);
                }
                if (isAdditive) {
                    this._additiveValue = value;
                }
                else {
                    target[propName] = value;
                }
            }
        }
        else {
            if (arrDim > 0) {
                arrDim === 1
                    ? interpolate1DArray(targetArr, frame[valueKey], nextFrame[valueKey], w)
                    : interpolate2DArray(targetArr, frame[valueKey], nextFrame[valueKey], w);
            }
            else if (isValueColor) {
                interpolate1DArray(targetArr, frame[valueKey], nextFrame[valueKey], w);
                if (!isAdditive) {
                    target[propName] = rgba2String(targetArr);
                }
            }
            else {
                var value = void 0;
                if (!this.interpolable) {
                    value = step(frame[valueKey], nextFrame[valueKey], w);
                }
                else {
                    value = interpolateNumber(frame[valueKey], nextFrame[valueKey], w);
                }
                if (isAdditive) {
                    this._additiveValue = value;
                }
                else {
                    target[propName] = value;
                }
            }
        }
        if (isAdditive) {
            this._addToTarget(target);
        }
    };
    Track.prototype._addToTarget = function (target) {
        var arrDim = this.arrDim;
        var propName = this.propName;
        var additiveValue = this._additiveValue;
        if (arrDim === 0) {
            if (this.isValueColor) {
                _tool_color__WEBPACK_IMPORTED_MODULE_1__.parse(target[propName], tmpRgba);
                add1DArray(tmpRgba, tmpRgba, additiveValue, 1);
                target[propName] = rgba2String(tmpRgba);
            }
            else {
                target[propName] = target[propName] + additiveValue;
            }
        }
        else if (arrDim === 1) {
            add1DArray(target[propName], target[propName], additiveValue, 1);
        }
        else if (arrDim === 2) {
            add2DArray(target[propName], target[propName], additiveValue, 1);
        }
    };
    return Track;
}());
var Animator = (function () {
    function Animator(target, loop, additiveTo) {
        this._tracks = {};
        this._trackKeys = [];
        this._delay = 0;
        this._maxTime = 0;
        this._paused = false;
        this._started = 0;
        this._clip = null;
        this._target = target;
        this._loop = loop;
        if (loop && additiveTo) {
            (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.logError)('Can\' use additive animation on looped animation.');
            return;
        }
        this._additiveAnimators = additiveTo;
    }
    Animator.prototype.getTarget = function () {
        return this._target;
    };
    Animator.prototype.changeTarget = function (target) {
        this._target = target;
    };
    Animator.prototype.when = function (time, props) {
        return this.whenWithKeys(time, props, (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.keys)(props));
    };
    Animator.prototype.whenWithKeys = function (time, props, propNames) {
        var tracks = this._tracks;
        for (var i = 0; i < propNames.length; i++) {
            var propName = propNames[i];
            var track = tracks[propName];
            if (!track) {
                track = tracks[propName] = new Track(propName);
                var initialValue = void 0;
                var additiveTrack = this._getAdditiveTrack(propName);
                if (additiveTrack) {
                    var lastFinalKf = additiveTrack.keyframes[additiveTrack.keyframes.length - 1];
                    initialValue = lastFinalKf && lastFinalKf.value;
                    if (additiveTrack.isValueColor && initialValue) {
                        initialValue = rgba2String(initialValue);
                    }
                }
                else {
                    initialValue = this._target[propName];
                }
                if (initialValue == null) {
                    continue;
                }
                if (time !== 0) {
                    track.addKeyframe(0, cloneValue(initialValue));
                }
                this._trackKeys.push(propName);
            }
            track.addKeyframe(time, cloneValue(props[propName]));
        }
        this._maxTime = Math.max(this._maxTime, time);
        return this;
    };
    Animator.prototype.pause = function () {
        this._clip.pause();
        this._paused = true;
    };
    Animator.prototype.resume = function () {
        this._clip.resume();
        this._paused = false;
    };
    Animator.prototype.isPaused = function () {
        return !!this._paused;
    };
    Animator.prototype._doneCallback = function () {
        this._setTracksFinished();
        this._clip = null;
        var doneList = this._doneList;
        if (doneList) {
            var len = doneList.length;
            for (var i = 0; i < len; i++) {
                doneList[i].call(this);
            }
        }
    };
    Animator.prototype._abortedCallback = function () {
        this._setTracksFinished();
        var animation = this.animation;
        var abortedList = this._abortedList;
        if (animation) {
            animation.removeClip(this._clip);
        }
        this._clip = null;
        if (abortedList) {
            for (var i = 0; i < abortedList.length; i++) {
                abortedList[i].call(this);
            }
        }
    };
    Animator.prototype._setTracksFinished = function () {
        var tracks = this._tracks;
        var tracksKeys = this._trackKeys;
        for (var i = 0; i < tracksKeys.length; i++) {
            tracks[tracksKeys[i]].setFinished();
        }
    };
    Animator.prototype._getAdditiveTrack = function (trackName) {
        var additiveTrack;
        var additiveAnimators = this._additiveAnimators;
        if (additiveAnimators) {
            for (var i = 0; i < additiveAnimators.length; i++) {
                var track = additiveAnimators[i].getTrack(trackName);
                if (track) {
                    additiveTrack = track;
                }
            }
        }
        return additiveTrack;
    };
    Animator.prototype.start = function (easing, forceAnimate) {
        if (this._started > 0) {
            return;
        }
        this._started = 1;
        var self = this;
        var tracks = [];
        for (var i = 0; i < this._trackKeys.length; i++) {
            var propName = this._trackKeys[i];
            var track = this._tracks[propName];
            var additiveTrack = this._getAdditiveTrack(propName);
            var kfs = track.keyframes;
            track.prepare(additiveTrack);
            if (track.needsAnimate()) {
                tracks.push(track);
            }
            else if (!track.interpolable) {
                var lastKf = kfs[kfs.length - 1];
                if (lastKf) {
                    self._target[track.propName] = lastKf.value;
                }
            }
        }
        if (tracks.length || forceAnimate) {
            var clip = new _Clip__WEBPACK_IMPORTED_MODULE_2__.default({
                life: this._maxTime,
                loop: this._loop,
                delay: this._delay,
                onframe: function (percent) {
                    self._started = 2;
                    var additiveAnimators = self._additiveAnimators;
                    if (additiveAnimators) {
                        var stillHasAdditiveAnimator = false;
                        for (var i = 0; i < additiveAnimators.length; i++) {
                            if (additiveAnimators[i]._clip) {
                                stillHasAdditiveAnimator = true;
                                break;
                            }
                        }
                        if (!stillHasAdditiveAnimator) {
                            self._additiveAnimators = null;
                        }
                    }
                    for (var i = 0; i < tracks.length; i++) {
                        tracks[i].step(self._target, percent);
                    }
                    var onframeList = self._onframeList;
                    if (onframeList) {
                        for (var i = 0; i < onframeList.length; i++) {
                            onframeList[i](self._target, percent);
                        }
                    }
                },
                ondestroy: function () {
                    self._doneCallback();
                }
            });
            this._clip = clip;
            if (this.animation) {
                this.animation.addClip(clip);
            }
            if (easing && easing !== 'spline') {
                clip.easing = easing;
            }
        }
        else {
            this._doneCallback();
        }
        return this;
    };
    Animator.prototype.stop = function (forwardToLast) {
        if (!this._clip) {
            return;
        }
        var clip = this._clip;
        if (forwardToLast) {
            clip.onframe(1);
        }
        this._abortedCallback();
    };
    Animator.prototype.delay = function (time) {
        this._delay = time;
        return this;
    };
    Animator.prototype.during = function (cb) {
        if (cb) {
            if (!this._onframeList) {
                this._onframeList = [];
            }
            this._onframeList.push(cb);
        }
        return this;
    };
    Animator.prototype.done = function (cb) {
        if (cb) {
            if (!this._doneList) {
                this._doneList = [];
            }
            this._doneList.push(cb);
        }
        return this;
    };
    Animator.prototype.aborted = function (cb) {
        if (cb) {
            if (!this._abortedList) {
                this._abortedList = [];
            }
            this._abortedList.push(cb);
        }
        return this;
    };
    Animator.prototype.getClip = function () {
        return this._clip;
    };
    Animator.prototype.getTrack = function (propName) {
        return this._tracks[propName];
    };
    Animator.prototype.stopTracks = function (propNames, forwardToLast) {
        if (!propNames.length || !this._clip) {
            return true;
        }
        var tracks = this._tracks;
        var tracksKeys = this._trackKeys;
        for (var i = 0; i < propNames.length; i++) {
            var track = tracks[propNames[i]];
            if (track) {
                if (forwardToLast) {
                    track.step(this._target, 1);
                }
                else if (this._started === 1) {
                    track.step(this._target, 0);
                }
                track.setFinished();
            }
        }
        var allAborted = true;
        for (var i = 0; i < tracksKeys.length; i++) {
            if (!tracks[tracksKeys[i]].isFinished()) {
                allAborted = false;
                break;
            }
        }
        if (allAborted) {
            this._abortedCallback();
        }
        return allAborted;
    };
    Animator.prototype.saveFinalToTarget = function (target, trackKeys) {
        if (!target) {
            return;
        }
        trackKeys = trackKeys || this._trackKeys;
        for (var i = 0; i < trackKeys.length; i++) {
            var propName = trackKeys[i];
            var track = this._tracks[propName];
            if (!track || track.isFinished()) {
                continue;
            }
            var kfs = track.keyframes;
            var lastKf = kfs[kfs.length - 1];
            if (lastKf) {
                var val = cloneValue(lastKf.value);
                if (track.isValueColor) {
                    val = rgba2String(val);
                }
                target[propName] = val;
            }
        }
    };
    Animator.prototype.__changeFinalValue = function (finalProps, trackKeys) {
        trackKeys = trackKeys || (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.keys)(finalProps);
        for (var i = 0; i < trackKeys.length; i++) {
            var propName = trackKeys[i];
            var track = this._tracks[propName];
            if (!track) {
                continue;
            }
            var kfs = track.keyframes;
            if (kfs.length > 1) {
                var lastKf = kfs.pop();
                track.addKeyframe(lastKf.time, finalProps[propName]);
                track.prepare(track.getAdditiveTrack());
            }
        }
    };
    return Animator;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Animator);


/***/ }),

/***/ "./node_modules/zrender/lib/animation/Clip.js":
/*!****************************************************!*\
  !*** ./node_modules/zrender/lib/animation/Clip.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _easing__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./easing */ "./node_modules/zrender/lib/animation/easing.js");

var Clip = (function () {
    function Clip(opts) {
        this._initialized = false;
        this._startTime = 0;
        this._pausedTime = 0;
        this._paused = false;
        this._life = opts.life || 1000;
        this._delay = opts.delay || 0;
        this.loop = opts.loop == null ? false : opts.loop;
        this.gap = opts.gap || 0;
        this.easing = opts.easing || 'linear';
        this.onframe = opts.onframe;
        this.ondestroy = opts.ondestroy;
        this.onrestart = opts.onrestart;
    }
    Clip.prototype.step = function (globalTime, deltaTime) {
        if (!this._initialized) {
            this._startTime = globalTime + this._delay;
            this._initialized = true;
        }
        if (this._paused) {
            this._pausedTime += deltaTime;
            return;
        }
        var percent = (globalTime - this._startTime - this._pausedTime) / this._life;
        if (percent < 0) {
            percent = 0;
        }
        percent = Math.min(percent, 1);
        var easing = this.easing;
        var easingFunc = typeof easing === 'string'
            ? _easing__WEBPACK_IMPORTED_MODULE_0__.default[easing] : easing;
        var schedule = typeof easingFunc === 'function'
            ? easingFunc(percent)
            : percent;
        this.onframe && this.onframe(schedule);
        if (percent === 1) {
            if (this.loop) {
                this._restart(globalTime);
                this.onrestart && this.onrestart();
            }
            else {
                return true;
            }
        }
        return false;
    };
    Clip.prototype._restart = function (globalTime) {
        var remainder = (globalTime - this._startTime - this._pausedTime) % this._life;
        this._startTime = globalTime - remainder + this.gap;
        this._pausedTime = 0;
    };
    Clip.prototype.pause = function () {
        this._paused = true;
    };
    Clip.prototype.resume = function () {
        this._paused = false;
    };
    return Clip;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Clip);


/***/ }),

/***/ "./node_modules/zrender/lib/animation/easing.js":
/*!******************************************************!*\
  !*** ./node_modules/zrender/lib/animation/easing.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var easing = {
    linear: function (k) {
        return k;
    },
    quadraticIn: function (k) {
        return k * k;
    },
    quadraticOut: function (k) {
        return k * (2 - k);
    },
    quadraticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k;
        }
        return -0.5 * (--k * (k - 2) - 1);
    },
    cubicIn: function (k) {
        return k * k * k;
    },
    cubicOut: function (k) {
        return --k * k * k + 1;
    },
    cubicInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k + 2);
    },
    quarticIn: function (k) {
        return k * k * k * k;
    },
    quarticOut: function (k) {
        return 1 - (--k * k * k * k);
    },
    quarticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k;
        }
        return -0.5 * ((k -= 2) * k * k * k - 2);
    },
    quinticIn: function (k) {
        return k * k * k * k * k;
    },
    quinticOut: function (k) {
        return --k * k * k * k * k + 1;
    },
    quinticInOut: function (k) {
        if ((k *= 2) < 1) {
            return 0.5 * k * k * k * k * k;
        }
        return 0.5 * ((k -= 2) * k * k * k * k + 2);
    },
    sinusoidalIn: function (k) {
        return 1 - Math.cos(k * Math.PI / 2);
    },
    sinusoidalOut: function (k) {
        return Math.sin(k * Math.PI / 2);
    },
    sinusoidalInOut: function (k) {
        return 0.5 * (1 - Math.cos(Math.PI * k));
    },
    exponentialIn: function (k) {
        return k === 0 ? 0 : Math.pow(1024, k - 1);
    },
    exponentialOut: function (k) {
        return k === 1 ? 1 : 1 - Math.pow(2, -10 * k);
    },
    exponentialInOut: function (k) {
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if ((k *= 2) < 1) {
            return 0.5 * Math.pow(1024, k - 1);
        }
        return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    },
    circularIn: function (k) {
        return 1 - Math.sqrt(1 - k * k);
    },
    circularOut: function (k) {
        return Math.sqrt(1 - (--k * k));
    },
    circularInOut: function (k) {
        if ((k *= 2) < 1) {
            return -0.5 * (Math.sqrt(1 - k * k) - 1);
        }
        return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    },
    elasticIn: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return -(a * Math.pow(2, 10 * (k -= 1))
            * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    elasticOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        return (a * Math.pow(2, -10 * k)
            * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
    },
    elasticInOut: function (k) {
        var s;
        var a = 0.1;
        var p = 0.4;
        if (k === 0) {
            return 0;
        }
        if (k === 1) {
            return 1;
        }
        if (!a || a < 1) {
            a = 1;
            s = p / 4;
        }
        else {
            s = p * Math.asin(1 / a) / (2 * Math.PI);
        }
        if ((k *= 2) < 1) {
            return -0.5 * (a * Math.pow(2, 10 * (k -= 1))
                * Math.sin((k - s) * (2 * Math.PI) / p));
        }
        return a * Math.pow(2, -10 * (k -= 1))
            * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    },
    backIn: function (k) {
        var s = 1.70158;
        return k * k * ((s + 1) * k - s);
    },
    backOut: function (k) {
        var s = 1.70158;
        return --k * k * ((s + 1) * k + s) + 1;
    },
    backInOut: function (k) {
        var s = 1.70158 * 1.525;
        if ((k *= 2) < 1) {
            return 0.5 * (k * k * ((s + 1) * k - s));
        }
        return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    },
    bounceIn: function (k) {
        return 1 - easing.bounceOut(1 - k);
    },
    bounceOut: function (k) {
        if (k < (1 / 2.75)) {
            return 7.5625 * k * k;
        }
        else if (k < (2 / 2.75)) {
            return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
        }
        else if (k < (2.5 / 2.75)) {
            return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
        }
        else {
            return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
        }
    },
    bounceInOut: function (k) {
        if (k < 0.5) {
            return easing.bounceIn(k * 2) * 0.5;
        }
        return easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (easing);


/***/ }),

/***/ "./node_modules/zrender/lib/animation/requestAnimationFrame.js":
/*!*********************************************************************!*\
  !*** ./node_modules/zrender/lib/animation/requestAnimationFrame.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var requestAnimationFrame;
requestAnimationFrame = (typeof window !== 'undefined'
    && ((window.requestAnimationFrame && window.requestAnimationFrame.bind(window))
        || (window.msRequestAnimationFrame && window.msRequestAnimationFrame.bind(window))
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame)) || function (func) {
    return setTimeout(func, 16);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (requestAnimationFrame);


/***/ }),

/***/ "./node_modules/zrender/lib/canvas/graphic.js":
/*!****************************************************!*\
  !*** ./node_modules/zrender/lib/canvas/graphic.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createCanvasPattern": () => (/* binding */ createCanvasPattern),
/* harmony export */   "brushSingle": () => (/* binding */ brushSingle),
/* harmony export */   "brush": () => (/* binding */ brush)
/* harmony export */ });
/* harmony import */ var _graphic_Displayable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../graphic/Displayable */ "./node_modules/zrender/lib/graphic/Displayable.js");
/* harmony import */ var _core_PathProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/PathProxy */ "./node_modules/zrender/lib/core/PathProxy.js");
/* harmony import */ var _graphic_helper_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../graphic/helper/image */ "./node_modules/zrender/lib/graphic/helper/image.js");
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ "./node_modules/zrender/lib/canvas/helper.js");
/* harmony import */ var _graphic_Path__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../graphic/Path */ "./node_modules/zrender/lib/graphic/Path.js");
/* harmony import */ var _graphic_Image__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../graphic/Image */ "./node_modules/zrender/lib/graphic/Image.js");
/* harmony import */ var _graphic_TSpan__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../graphic/TSpan */ "./node_modules/zrender/lib/graphic/TSpan.js");
/* harmony import */ var _contain_text__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../contain/text */ "./node_modules/zrender/lib/contain/text.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _graphic_helper_dashStyle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../graphic/helper/dashStyle */ "./node_modules/zrender/lib/graphic/helper/dashStyle.js");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Element */ "./node_modules/zrender/lib/Element.js");
/* harmony import */ var _graphic_IncrementalDisplayable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../graphic/IncrementalDisplayable */ "./node_modules/zrender/lib/graphic/IncrementalDisplayable.js");












var pathProxyForDraw = new _core_PathProxy__WEBPACK_IMPORTED_MODULE_0__.default(true);
function styleHasStroke(style) {
    var stroke = style.stroke;
    return !(stroke == null || stroke === 'none' || !(style.lineWidth > 0));
}
function styleHasFill(style) {
    var fill = style.fill;
    return fill != null && fill !== 'none';
}
function doFillPath(ctx, style) {
    if (style.fillOpacity != null && style.fillOpacity !== 1) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.fillOpacity * style.opacity;
        ctx.fill();
        ctx.globalAlpha = originalGlobalAlpha;
    }
    else {
        ctx.fill();
    }
}
function doStrokePath(ctx, style) {
    if (style.strokeOpacity != null && style.strokeOpacity !== 1) {
        var originalGlobalAlpha = ctx.globalAlpha;
        ctx.globalAlpha = style.strokeOpacity * style.opacity;
        ctx.stroke();
        ctx.globalAlpha = originalGlobalAlpha;
    }
    else {
        ctx.stroke();
    }
}
function createCanvasPattern(ctx, pattern, el) {
    var image = (0,_graphic_helper_image__WEBPACK_IMPORTED_MODULE_1__.createOrUpdateImage)(pattern.image, pattern.__image, el);
    if ((0,_graphic_helper_image__WEBPACK_IMPORTED_MODULE_1__.isImageReady)(image)) {
        var canvasPattern = ctx.createPattern(image, pattern.repeat || 'repeat');
        if (typeof DOMMatrix === 'function') {
            var matrix = new DOMMatrix();
            matrix.rotateSelf(0, 0, (pattern.rotation || 0) / Math.PI * 180);
            matrix.scaleSelf((pattern.scaleX || 1), (pattern.scaleY || 1));
            matrix.translateSelf((pattern.x || 0), (pattern.y || 0));
            canvasPattern.setTransform(matrix);
        }
        return canvasPattern;
    }
}
function brushPath(ctx, el, style, inBatch) {
    var hasStroke = styleHasStroke(style);
    var hasFill = styleHasFill(style);
    var strokePercent = style.strokePercent;
    var strokePart = strokePercent < 1;
    var firstDraw = !el.path;
    if ((!el.silent || strokePart) && firstDraw) {
        el.createPathProxy();
    }
    var path = el.path || pathProxyForDraw;
    if (!inBatch) {
        var fill = style.fill;
        var stroke = style.stroke;
        var hasFillGradient = hasFill && !!fill.colorStops;
        var hasStrokeGradient = hasStroke && !!stroke.colorStops;
        var hasFillPattern = hasFill && !!fill.image;
        var hasStrokePattern = hasStroke && !!stroke.image;
        var fillGradient = void 0;
        var strokeGradient = void 0;
        var fillPattern = void 0;
        var strokePattern = void 0;
        var rect = void 0;
        if (hasFillGradient || hasStrokeGradient) {
            rect = el.getBoundingRect();
        }
        if (hasFillGradient) {
            fillGradient = el.__dirty
                ? (0,_helper__WEBPACK_IMPORTED_MODULE_2__.getCanvasGradient)(ctx, fill, rect)
                : el.__canvasFillGradient;
            el.__canvasFillGradient = fillGradient;
        }
        if (hasStrokeGradient) {
            strokeGradient = el.__dirty
                ? (0,_helper__WEBPACK_IMPORTED_MODULE_2__.getCanvasGradient)(ctx, stroke, rect)
                : el.__canvasStrokeGradient;
            el.__canvasStrokeGradient = strokeGradient;
        }
        if (hasFillPattern) {
            fillPattern = (el.__dirty || !el.__canvasFillPattern)
                ? createCanvasPattern(ctx, fill, el)
                : el.__canvasFillPattern;
            el.__canvasFillPattern = fillPattern;
        }
        if (hasStrokePattern) {
            strokePattern = (el.__dirty || !el.__canvasStrokePattern)
                ? createCanvasPattern(ctx, stroke, el)
                : el.__canvasStrokePattern;
            el.__canvasStrokePattern = fillPattern;
        }
        if (hasFillGradient) {
            ctx.fillStyle = fillGradient;
        }
        else if (hasFillPattern) {
            if (fillPattern) {
                ctx.fillStyle = fillPattern;
            }
            else {
                hasFill = false;
            }
        }
        if (hasStrokeGradient) {
            ctx.strokeStyle = strokeGradient;
        }
        else if (hasStrokePattern) {
            if (strokePattern) {
                ctx.strokeStyle = strokePattern;
            }
            else {
                hasStroke = false;
            }
        }
    }
    var lineDash = style.lineDash && style.lineWidth > 0 && (0,_graphic_helper_dashStyle__WEBPACK_IMPORTED_MODULE_3__.normalizeLineDash)(style.lineDash, style.lineWidth);
    var lineDashOffset = style.lineDashOffset;
    var ctxLineDash = !!ctx.setLineDash;
    var scale = el.getGlobalScale();
    path.setScale(scale[0], scale[1], el.segmentIgnoreThreshold);
    if (lineDash) {
        var lineScale_1 = (style.strokeNoScale && el.getLineScale) ? el.getLineScale() : 1;
        if (lineScale_1 && lineScale_1 !== 1) {
            lineDash = (0,_core_util__WEBPACK_IMPORTED_MODULE_4__.map)(lineDash, function (rawVal) {
                return rawVal / lineScale_1;
            });
            lineDashOffset /= lineScale_1;
        }
    }
    var needsRebuild = true;
    if (firstDraw || (el.__dirty & _graphic_Path__WEBPACK_IMPORTED_MODULE_5__.default.SHAPE_CHANGED_BIT)
        || (lineDash && !ctxLineDash && hasStroke)) {
        path.setDPR(ctx.dpr);
        if (strokePart) {
            path.setContext(null);
        }
        else {
            path.setContext(ctx);
            needsRebuild = false;
        }
        path.reset();
        if (lineDash && !ctxLineDash) {
            path.setLineDash(lineDash);
            path.setLineDashOffset(lineDashOffset);
        }
        el.buildPath(path, el.shape, inBatch);
        path.toStatic();
        el.pathUpdated();
    }
    if (needsRebuild) {
        path.rebuildPath(ctx, strokePart ? strokePercent : 1);
    }
    if (lineDash && ctxLineDash) {
        ctx.setLineDash(lineDash);
        ctx.lineDashOffset = lineDashOffset;
    }
    if (!inBatch) {
        if (style.strokeFirst) {
            if (hasStroke) {
                doStrokePath(ctx, style);
            }
            if (hasFill) {
                doFillPath(ctx, style);
            }
        }
        else {
            if (hasFill) {
                doFillPath(ctx, style);
            }
            if (hasStroke) {
                doStrokePath(ctx, style);
            }
        }
    }
    if (lineDash && ctxLineDash) {
        ctx.setLineDash([]);
    }
}
function brushImage(ctx, el, style) {
    var image = el.__image = (0,_graphic_helper_image__WEBPACK_IMPORTED_MODULE_1__.createOrUpdateImage)(style.image, el.__image, el, el.onload);
    if (!image || !(0,_graphic_helper_image__WEBPACK_IMPORTED_MODULE_1__.isImageReady)(image)) {
        return;
    }
    var x = style.x || 0;
    var y = style.y || 0;
    var width = el.getWidth();
    var height = el.getHeight();
    var aspect = image.width / image.height;
    if (width == null && height != null) {
        width = height * aspect;
    }
    else if (height == null && width != null) {
        height = width / aspect;
    }
    else if (width == null && height == null) {
        width = image.width;
        height = image.height;
    }
    if (style.sWidth && style.sHeight) {
        var sx = style.sx || 0;
        var sy = style.sy || 0;
        ctx.drawImage(image, sx, sy, style.sWidth, style.sHeight, x, y, width, height);
    }
    else if (style.sx && style.sy) {
        var sx = style.sx;
        var sy = style.sy;
        var sWidth = width - sx;
        var sHeight = height - sy;
        ctx.drawImage(image, sx, sy, sWidth, sHeight, x, y, width, height);
    }
    else {
        ctx.drawImage(image, x, y, width, height);
    }
}
function brushText(ctx, el, style) {
    var text = style.text;
    text != null && (text += '');
    if (text) {
        ctx.font = style.font || _contain_text__WEBPACK_IMPORTED_MODULE_6__.DEFAULT_FONT;
        ctx.textAlign = style.textAlign;
        ctx.textBaseline = style.textBaseline;
        var hasLineDash = void 0;
        if (ctx.setLineDash) {
            var lineDash = style.lineDash && style.lineWidth > 0 && (0,_graphic_helper_dashStyle__WEBPACK_IMPORTED_MODULE_3__.normalizeLineDash)(style.lineDash, style.lineWidth);
            var lineDashOffset = style.lineDashOffset;
            if (lineDash) {
                var lineScale_2 = (style.strokeNoScale && el.getLineScale) ? el.getLineScale() : 1;
                if (lineScale_2 && lineScale_2 !== 1) {
                    lineDash = (0,_core_util__WEBPACK_IMPORTED_MODULE_4__.map)(lineDash, function (rawVal) {
                        return rawVal / lineScale_2;
                    });
                    lineDashOffset /= lineScale_2;
                }
                ctx.setLineDash(lineDash);
                ctx.lineDashOffset = lineDashOffset;
                hasLineDash = true;
            }
        }
        if (style.strokeFirst) {
            if (styleHasStroke(style)) {
                ctx.strokeText(text, style.x, style.y);
            }
            if (styleHasFill(style)) {
                ctx.fillText(text, style.x, style.y);
            }
        }
        else {
            if (styleHasFill(style)) {
                ctx.fillText(text, style.x, style.y);
            }
            if (styleHasStroke(style)) {
                ctx.strokeText(text, style.x, style.y);
            }
        }
        if (hasLineDash) {
            ctx.setLineDash([]);
        }
    }
}
var SHADOW_NUMBER_PROPS = ['shadowBlur', 'shadowOffsetX', 'shadowOffsetY'];
var STROKE_PROPS = [
    ['lineCap', 'butt'], ['lineJoin', 'miter'], ['miterLimit', 10]
];
function bindCommonProps(ctx, style, prevStyle, forceSetAll, scope) {
    var styleChanged = false;
    if (!forceSetAll) {
        prevStyle = prevStyle || {};
        if (style === prevStyle) {
            return false;
        }
    }
    if (forceSetAll || style.opacity !== prevStyle.opacity) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        ctx.globalAlpha = style.opacity == null ? _graphic_Displayable__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_COMMON_STYLE.opacity : style.opacity;
    }
    if (forceSetAll || style.blend !== prevStyle.blend) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        ctx.globalCompositeOperation = style.blend || _graphic_Displayable__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_COMMON_STYLE.blend;
    }
    for (var i = 0; i < SHADOW_NUMBER_PROPS.length; i++) {
        var propName = SHADOW_NUMBER_PROPS[i];
        if (forceSetAll || style[propName] !== prevStyle[propName]) {
            if (!styleChanged) {
                flushPathDrawn(ctx, scope);
                styleChanged = true;
            }
            ctx[propName] = ctx.dpr * (style[propName] || 0);
        }
    }
    if (forceSetAll || style.shadowColor !== prevStyle.shadowColor) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        ctx.shadowColor = style.shadowColor || _graphic_Displayable__WEBPACK_IMPORTED_MODULE_7__.DEFAULT_COMMON_STYLE.shadowColor;
    }
    return styleChanged;
}
function bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetAll, scope) {
    var style = getStyle(el, scope.inHover);
    var prevStyle = forceSetAll
        ? null
        : (prevEl && getStyle(prevEl, scope.inHover) || {});
    if (style === prevStyle) {
        return false;
    }
    var styleChanged = bindCommonProps(ctx, style, prevStyle, forceSetAll, scope);
    if (forceSetAll || style.fill !== prevStyle.fill) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        ctx.fillStyle = style.fill;
    }
    if (forceSetAll || style.stroke !== prevStyle.stroke) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        ctx.strokeStyle = style.stroke;
    }
    if (forceSetAll || style.opacity !== prevStyle.opacity) {
        if (!styleChanged) {
            flushPathDrawn(ctx, scope);
            styleChanged = true;
        }
        ctx.globalAlpha = style.opacity == null ? 1 : style.opacity;
    }
    if (el.hasStroke()) {
        var lineWidth = style.lineWidth;
        var newLineWidth = lineWidth / ((style.strokeNoScale && el && el.getLineScale) ? el.getLineScale() : 1);
        if (ctx.lineWidth !== newLineWidth) {
            if (!styleChanged) {
                flushPathDrawn(ctx, scope);
                styleChanged = true;
            }
            ctx.lineWidth = newLineWidth;
        }
    }
    for (var i = 0; i < STROKE_PROPS.length; i++) {
        var prop = STROKE_PROPS[i];
        var propName = prop[0];
        if (forceSetAll || style[propName] !== prevStyle[propName]) {
            if (!styleChanged) {
                flushPathDrawn(ctx, scope);
                styleChanged = true;
            }
            ctx[propName] = style[propName] || prop[1];
        }
    }
    return styleChanged;
}
function bindImageStyle(ctx, el, prevEl, forceSetAll, scope) {
    return bindCommonProps(ctx, getStyle(el, scope.inHover), prevEl && getStyle(prevEl, scope.inHover), forceSetAll, scope);
}
function setContextTransform(ctx, el) {
    var m = el.transform;
    var dpr = ctx.dpr || 1;
    if (m) {
        ctx.setTransform(dpr * m[0], dpr * m[1], dpr * m[2], dpr * m[3], dpr * m[4], dpr * m[5]);
    }
    else {
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
}
function updateClipStatus(clipPaths, ctx, scope) {
    var allClipped = false;
    for (var i = 0; i < clipPaths.length; i++) {
        var clipPath = clipPaths[i];
        allClipped = allClipped || clipPath.isZeroArea();
        setContextTransform(ctx, clipPath);
        ctx.beginPath();
        clipPath.buildPath(ctx, clipPath.shape);
        ctx.clip();
    }
    scope.allClipped = allClipped;
}
function isTransformChanged(m0, m1) {
    if (m0 && m1) {
        return m0[0] !== m1[0]
            || m0[1] !== m1[1]
            || m0[2] !== m1[2]
            || m0[3] !== m1[3]
            || m0[4] !== m1[4]
            || m0[5] !== m1[5];
    }
    else if (!m0 && !m1) {
        return false;
    }
    return true;
}
var DRAW_TYPE_PATH = 1;
var DRAW_TYPE_IMAGE = 2;
var DRAW_TYPE_TEXT = 3;
var DRAW_TYPE_INCREMENTAL = 4;
function canPathBatch(style) {
    var hasFill = styleHasFill(style);
    var hasStroke = styleHasStroke(style);
    return !(style.lineDash
        || !(+hasFill ^ +hasStroke)
        || (hasFill && typeof style.fill !== 'string')
        || (hasStroke && typeof style.stroke !== 'string')
        || style.strokePercent < 1
        || style.strokeOpacity < 1
        || style.fillOpacity < 1);
}
function flushPathDrawn(ctx, scope) {
    scope.batchFill && ctx.fill();
    scope.batchStroke && ctx.stroke();
    scope.batchFill = '';
    scope.batchStroke = '';
}
function getStyle(el, inHover) {
    return inHover ? (el.__hoverStyle || el.style) : el.style;
}
function brushSingle(ctx, el) {
    brush(ctx, el, { inHover: false, viewWidth: 0, viewHeight: 0 }, true);
}
function brush(ctx, el, scope, isLast) {
    var m = el.transform;
    if (!el.shouldBePainted(scope.viewWidth, scope.viewHeight, false, false)) {
        el.__dirty &= ~_Element__WEBPACK_IMPORTED_MODULE_8__.default.REDARAW_BIT;
        el.__isRendered = false;
        return;
    }
    var clipPaths = el.__clipPaths;
    var prevElClipPaths = scope.prevElClipPaths;
    var forceSetTransform = false;
    var forceSetStyle = false;
    if (!prevElClipPaths || (0,_helper__WEBPACK_IMPORTED_MODULE_2__.isClipPathChanged)(clipPaths, prevElClipPaths)) {
        if (prevElClipPaths && prevElClipPaths.length) {
            flushPathDrawn(ctx, scope);
            ctx.restore();
            forceSetStyle = forceSetTransform = true;
            scope.prevElClipPaths = null;
            scope.allClipped = false;
            scope.prevEl = null;
        }
        if (clipPaths && clipPaths.length) {
            flushPathDrawn(ctx, scope);
            ctx.save();
            updateClipStatus(clipPaths, ctx, scope);
            forceSetTransform = true;
        }
        scope.prevElClipPaths = clipPaths;
    }
    if (scope.allClipped) {
        el.__isRendered = false;
        return;
    }
    el.beforeBrush && el.beforeBrush();
    el.innerBeforeBrush();
    var prevEl = scope.prevEl;
    if (!prevEl) {
        forceSetStyle = forceSetTransform = true;
    }
    var canBatchPath = el instanceof _graphic_Path__WEBPACK_IMPORTED_MODULE_5__.default
        && el.autoBatch
        && canPathBatch(el.style);
    if (forceSetTransform || isTransformChanged(m, prevEl.transform)) {
        flushPathDrawn(ctx, scope);
        setContextTransform(ctx, el);
    }
    else if (!canBatchPath) {
        flushPathDrawn(ctx, scope);
    }
    var style = getStyle(el, scope.inHover);
    if (el instanceof _graphic_Path__WEBPACK_IMPORTED_MODULE_5__.default) {
        if (scope.lastDrawType !== DRAW_TYPE_PATH) {
            forceSetStyle = true;
            scope.lastDrawType = DRAW_TYPE_PATH;
        }
        bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetStyle, scope);
        if (!canBatchPath || (!scope.batchFill && !scope.batchStroke)) {
            ctx.beginPath();
        }
        brushPath(ctx, el, style, canBatchPath);
        if (canBatchPath) {
            scope.batchFill = style.fill || '';
            scope.batchStroke = style.stroke || '';
        }
    }
    else {
        if (el instanceof _graphic_TSpan__WEBPACK_IMPORTED_MODULE_9__.default) {
            if (scope.lastDrawType !== DRAW_TYPE_TEXT) {
                forceSetStyle = true;
                scope.lastDrawType = DRAW_TYPE_TEXT;
            }
            bindPathAndTextCommonStyle(ctx, el, prevEl, forceSetStyle, scope);
            brushText(ctx, el, style);
        }
        else if (el instanceof _graphic_Image__WEBPACK_IMPORTED_MODULE_10__.default) {
            if (scope.lastDrawType !== DRAW_TYPE_IMAGE) {
                forceSetStyle = true;
                scope.lastDrawType = DRAW_TYPE_IMAGE;
            }
            bindImageStyle(ctx, el, prevEl, forceSetStyle, scope);
            brushImage(ctx, el, style);
        }
        else if (el instanceof _graphic_IncrementalDisplayable__WEBPACK_IMPORTED_MODULE_11__.default) {
            if (scope.lastDrawType !== DRAW_TYPE_INCREMENTAL) {
                forceSetStyle = true;
                scope.lastDrawType = DRAW_TYPE_INCREMENTAL;
            }
            brushIncremental(ctx, el, scope);
        }
    }
    if (canBatchPath && isLast) {
        flushPathDrawn(ctx, scope);
    }
    el.innerAfterBrush();
    el.afterBrush && el.afterBrush();
    scope.prevEl = el;
    el.__dirty = 0;
    el.__isRendered = true;
}
function brushIncremental(ctx, el, scope) {
    var displayables = el.getDisplayables();
    var temporalDisplayables = el.getTemporalDisplayables();
    ctx.save();
    var innerScope = {
        prevElClipPaths: null,
        prevEl: null,
        allClipped: false,
        viewWidth: scope.viewWidth,
        viewHeight: scope.viewHeight,
        inHover: scope.inHover
    };
    var i;
    var len;
    for (i = el.getCursor(), len = displayables.length; i < len; i++) {
        var displayable = displayables[i];
        displayable.beforeBrush && displayable.beforeBrush();
        displayable.innerBeforeBrush();
        brush(ctx, displayable, innerScope, i === len - 1);
        displayable.innerAfterBrush();
        displayable.afterBrush && displayable.afterBrush();
        innerScope.prevEl = displayable;
    }
    for (var i_1 = 0, len_1 = temporalDisplayables.length; i_1 < len_1; i_1++) {
        var displayable = temporalDisplayables[i_1];
        displayable.beforeBrush && displayable.beforeBrush();
        displayable.innerBeforeBrush();
        brush(ctx, displayable, innerScope, i_1 === len_1 - 1);
        displayable.innerAfterBrush();
        displayable.afterBrush && displayable.afterBrush();
        innerScope.prevEl = displayable;
    }
    el.clearTemporalDisplayables();
    el.notClear = true;
    ctx.restore();
}


/***/ }),

/***/ "./node_modules/zrender/lib/canvas/helper.js":
/*!***************************************************!*\
  !*** ./node_modules/zrender/lib/canvas/helper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createLinearGradient": () => (/* binding */ createLinearGradient),
/* harmony export */   "createRadialGradient": () => (/* binding */ createRadialGradient),
/* harmony export */   "getCanvasGradient": () => (/* binding */ getCanvasGradient),
/* harmony export */   "isClipPathChanged": () => (/* binding */ isClipPathChanged)
/* harmony export */ });
function createLinearGradient(ctx, obj, rect) {
    var x = obj.x == null ? 0 : obj.x;
    var x2 = obj.x2 == null ? 1 : obj.x2;
    var y = obj.y == null ? 0 : obj.y;
    var y2 = obj.y2 == null ? 0 : obj.y2;
    if (!obj.global) {
        x = x * rect.width + rect.x;
        x2 = x2 * rect.width + rect.x;
        y = y * rect.height + rect.y;
        y2 = y2 * rect.height + rect.y;
    }
    x = isNaN(x) ? 0 : x;
    x2 = isNaN(x2) ? 1 : x2;
    y = isNaN(y) ? 0 : y;
    y2 = isNaN(y2) ? 0 : y2;
    var canvasGradient = ctx.createLinearGradient(x, y, x2, y2);
    return canvasGradient;
}
function createRadialGradient(ctx, obj, rect) {
    var width = rect.width;
    var height = rect.height;
    var min = Math.min(width, height);
    var x = obj.x == null ? 0.5 : obj.x;
    var y = obj.y == null ? 0.5 : obj.y;
    var r = obj.r == null ? 0.5 : obj.r;
    if (!obj.global) {
        x = x * width + rect.x;
        y = y * height + rect.y;
        r = r * min;
    }
    var canvasGradient = ctx.createRadialGradient(x, y, 0, x, y, r);
    return canvasGradient;
}
function getCanvasGradient(ctx, obj, rect) {
    var canvasGradient = obj.type === 'radial'
        ? createRadialGradient(ctx, obj, rect)
        : createLinearGradient(ctx, obj, rect);
    var colorStops = obj.colorStops;
    for (var i = 0; i < colorStops.length; i++) {
        canvasGradient.addColorStop(colorStops[i].offset, colorStops[i].color);
    }
    return canvasGradient;
}
function isClipPathChanged(clipPaths, prevClipPaths) {
    if (clipPaths === prevClipPaths || (!clipPaths && !prevClipPaths)) {
        return false;
    }
    if (!clipPaths || !prevClipPaths || (clipPaths.length !== prevClipPaths.length)) {
        return true;
    }
    for (var i = 0; i < clipPaths.length; i++) {
        if (clipPaths[i] !== prevClipPaths[i]) {
            return true;
        }
    }
    return false;
}


/***/ }),

/***/ "./node_modules/zrender/lib/config.js":
/*!********************************************!*\
  !*** ./node_modules/zrender/lib/config.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "debugMode": () => (/* binding */ debugMode),
/* harmony export */   "devicePixelRatio": () => (/* binding */ devicePixelRatio),
/* harmony export */   "DARK_MODE_THRESHOLD": () => (/* binding */ DARK_MODE_THRESHOLD),
/* harmony export */   "DARK_LABEL_COLOR": () => (/* binding */ DARK_LABEL_COLOR),
/* harmony export */   "LIGHT_LABEL_COLOR": () => (/* binding */ LIGHT_LABEL_COLOR),
/* harmony export */   "LIGHTER_LABEL_COLOR": () => (/* binding */ LIGHTER_LABEL_COLOR)
/* harmony export */ });
var dpr = 1;
if (typeof window !== 'undefined') {
    dpr = Math.max(window.devicePixelRatio
        || (window.screen && window.screen.deviceXDPI / window.screen.logicalXDPI)
        || 1, 1);
}
var debugMode = 0;
var devicePixelRatio = dpr;
var DARK_MODE_THRESHOLD = 0.4;
var DARK_LABEL_COLOR = '#333';
var LIGHT_LABEL_COLOR = '#ccc';
var LIGHTER_LABEL_COLOR = '#eee';


/***/ }),

/***/ "./node_modules/zrender/lib/contain/arc.js":
/*!*************************************************!*\
  !*** ./node_modules/zrender/lib/contain/arc.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "containStroke": () => (/* binding */ containStroke)
/* harmony export */ });
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util */ "./node_modules/zrender/lib/contain/util.js");

var PI2 = Math.PI * 2;
function containStroke(cx, cy, r, startAngle, endAngle, anticlockwise, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    x -= cx;
    y -= cy;
    var d = Math.sqrt(x * x + y * y);
    if ((d - _l > r) || (d + _l < r)) {
        return false;
    }
    if (Math.abs(startAngle - endAngle) % PI2 < 1e-4) {
        return true;
    }
    if (anticlockwise) {
        var tmp = startAngle;
        startAngle = (0,_util__WEBPACK_IMPORTED_MODULE_0__.normalizeRadian)(endAngle);
        endAngle = (0,_util__WEBPACK_IMPORTED_MODULE_0__.normalizeRadian)(tmp);
    }
    else {
        startAngle = (0,_util__WEBPACK_IMPORTED_MODULE_0__.normalizeRadian)(startAngle);
        endAngle = (0,_util__WEBPACK_IMPORTED_MODULE_0__.normalizeRadian)(endAngle);
    }
    if (startAngle > endAngle) {
        endAngle += PI2;
    }
    var angle = Math.atan2(y, x);
    if (angle < 0) {
        angle += PI2;
    }
    return (angle >= startAngle && angle <= endAngle)
        || (angle + PI2 >= startAngle && angle + PI2 <= endAngle);
}


/***/ }),

/***/ "./node_modules/zrender/lib/contain/cubic.js":
/*!***************************************************!*\
  !*** ./node_modules/zrender/lib/contain/cubic.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "containStroke": () => (/* binding */ containStroke)
/* harmony export */ });
/* harmony import */ var _core_curve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/curve */ "./node_modules/zrender/lib/core/curve.js");

function containStroke(x0, y0, x1, y1, x2, y2, x3, y3, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    if ((y > y0 + _l && y > y1 + _l && y > y2 + _l && y > y3 + _l)
        || (y < y0 - _l && y < y1 - _l && y < y2 - _l && y < y3 - _l)
        || (x > x0 + _l && x > x1 + _l && x > x2 + _l && x > x3 + _l)
        || (x < x0 - _l && x < x1 - _l && x < x2 - _l && x < x3 - _l)) {
        return false;
    }
    var d = _core_curve__WEBPACK_IMPORTED_MODULE_0__.cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, null);
    return d <= _l / 2;
}


/***/ }),

/***/ "./node_modules/zrender/lib/contain/line.js":
/*!**************************************************!*\
  !*** ./node_modules/zrender/lib/contain/line.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "containStroke": () => (/* binding */ containStroke)
/* harmony export */ });
function containStroke(x0, y0, x1, y1, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    var _a = 0;
    var _b = x0;
    if ((y > y0 + _l && y > y1 + _l)
        || (y < y0 - _l && y < y1 - _l)
        || (x > x0 + _l && x > x1 + _l)
        || (x < x0 - _l && x < x1 - _l)) {
        return false;
    }
    if (x0 !== x1) {
        _a = (y0 - y1) / (x0 - x1);
        _b = (x0 * y1 - x1 * y0) / (x0 - x1);
    }
    else {
        return Math.abs(x - x0) <= _l / 2;
    }
    var tmp = _a * x - y + _b;
    var _s = tmp * tmp / (_a * _a + 1);
    return _s <= _l / 2 * _l / 2;
}


/***/ }),

/***/ "./node_modules/zrender/lib/contain/path.js":
/*!**************************************************!*\
  !*** ./node_modules/zrender/lib/contain/path.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "contain": () => (/* binding */ contain),
/* harmony export */   "containStroke": () => (/* binding */ containStroke)
/* harmony export */ });
/* harmony import */ var _core_PathProxy__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/PathProxy */ "./node_modules/zrender/lib/core/PathProxy.js");
/* harmony import */ var _line__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./line */ "./node_modules/zrender/lib/contain/line.js");
/* harmony import */ var _cubic__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./cubic */ "./node_modules/zrender/lib/contain/cubic.js");
/* harmony import */ var _quadratic__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./quadratic */ "./node_modules/zrender/lib/contain/quadratic.js");
/* harmony import */ var _arc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./arc */ "./node_modules/zrender/lib/contain/arc.js");
/* harmony import */ var _core_curve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/curve */ "./node_modules/zrender/lib/core/curve.js");
/* harmony import */ var _windingLine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./windingLine */ "./node_modules/zrender/lib/contain/windingLine.js");







var CMD = _core_PathProxy__WEBPACK_IMPORTED_MODULE_0__.default.CMD;
var PI2 = Math.PI * 2;
var EPSILON = 1e-4;
function isAroundEqual(a, b) {
    return Math.abs(a - b) < EPSILON;
}
var roots = [-1, -1, -1];
var extrema = [-1, -1];
function swapExtrema() {
    var tmp = extrema[0];
    extrema[0] = extrema[1];
    extrema[1] = tmp;
}
function windingCubic(x0, y0, x1, y1, x2, y2, x3, y3, x, y) {
    if ((y > y0 && y > y1 && y > y2 && y > y3)
        || (y < y0 && y < y1 && y < y2 && y < y3)) {
        return 0;
    }
    var nRoots = _core_curve__WEBPACK_IMPORTED_MODULE_1__.cubicRootAt(y0, y1, y2, y3, y, roots);
    if (nRoots === 0) {
        return 0;
    }
    else {
        var w = 0;
        var nExtrema = -1;
        var y0_ = void 0;
        var y1_ = void 0;
        for (var i = 0; i < nRoots; i++) {
            var t = roots[i];
            var unit = (t === 0 || t === 1) ? 0.5 : 1;
            var x_ = _core_curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt(x0, x1, x2, x3, t);
            if (x_ < x) {
                continue;
            }
            if (nExtrema < 0) {
                nExtrema = _core_curve__WEBPACK_IMPORTED_MODULE_1__.cubicExtrema(y0, y1, y2, y3, extrema);
                if (extrema[1] < extrema[0] && nExtrema > 1) {
                    swapExtrema();
                }
                y0_ = _core_curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt(y0, y1, y2, y3, extrema[0]);
                if (nExtrema > 1) {
                    y1_ = _core_curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt(y0, y1, y2, y3, extrema[1]);
                }
            }
            if (nExtrema === 2) {
                if (t < extrema[0]) {
                    w += y0_ < y0 ? unit : -unit;
                }
                else if (t < extrema[1]) {
                    w += y1_ < y0_ ? unit : -unit;
                }
                else {
                    w += y3 < y1_ ? unit : -unit;
                }
            }
            else {
                if (t < extrema[0]) {
                    w += y0_ < y0 ? unit : -unit;
                }
                else {
                    w += y3 < y0_ ? unit : -unit;
                }
            }
        }
        return w;
    }
}
function windingQuadratic(x0, y0, x1, y1, x2, y2, x, y) {
    if ((y > y0 && y > y1 && y > y2)
        || (y < y0 && y < y1 && y < y2)) {
        return 0;
    }
    var nRoots = _core_curve__WEBPACK_IMPORTED_MODULE_1__.quadraticRootAt(y0, y1, y2, y, roots);
    if (nRoots === 0) {
        return 0;
    }
    else {
        var t = _core_curve__WEBPACK_IMPORTED_MODULE_1__.quadraticExtremum(y0, y1, y2);
        if (t >= 0 && t <= 1) {
            var w = 0;
            var y_ = _core_curve__WEBPACK_IMPORTED_MODULE_1__.quadraticAt(y0, y1, y2, t);
            for (var i = 0; i < nRoots; i++) {
                var unit = (roots[i] === 0 || roots[i] === 1) ? 0.5 : 1;
                var x_ = _core_curve__WEBPACK_IMPORTED_MODULE_1__.quadraticAt(x0, x1, x2, roots[i]);
                if (x_ < x) {
                    continue;
                }
                if (roots[i] < t) {
                    w += y_ < y0 ? unit : -unit;
                }
                else {
                    w += y2 < y_ ? unit : -unit;
                }
            }
            return w;
        }
        else {
            var unit = (roots[0] === 0 || roots[0] === 1) ? 0.5 : 1;
            var x_ = _core_curve__WEBPACK_IMPORTED_MODULE_1__.quadraticAt(x0, x1, x2, roots[0]);
            if (x_ < x) {
                return 0;
            }
            return y2 < y0 ? unit : -unit;
        }
    }
}
function windingArc(cx, cy, r, startAngle, endAngle, anticlockwise, x, y) {
    y -= cy;
    if (y > r || y < -r) {
        return 0;
    }
    var tmp = Math.sqrt(r * r - y * y);
    roots[0] = -tmp;
    roots[1] = tmp;
    var dTheta = Math.abs(startAngle - endAngle);
    if (dTheta < 1e-4) {
        return 0;
    }
    if (dTheta >= PI2 - 1e-4) {
        startAngle = 0;
        endAngle = PI2;
        var dir = anticlockwise ? 1 : -1;
        if (x >= roots[0] + cx && x <= roots[1] + cx) {
            return dir;
        }
        else {
            return 0;
        }
    }
    if (startAngle > endAngle) {
        var tmp_1 = startAngle;
        startAngle = endAngle;
        endAngle = tmp_1;
    }
    if (startAngle < 0) {
        startAngle += PI2;
        endAngle += PI2;
    }
    var w = 0;
    for (var i = 0; i < 2; i++) {
        var x_ = roots[i];
        if (x_ + cx > x) {
            var angle = Math.atan2(y, x_);
            var dir = anticlockwise ? 1 : -1;
            if (angle < 0) {
                angle = PI2 + angle;
            }
            if ((angle >= startAngle && angle <= endAngle)
                || (angle + PI2 >= startAngle && angle + PI2 <= endAngle)) {
                if (angle > Math.PI / 2 && angle < Math.PI * 1.5) {
                    dir = -dir;
                }
                w += dir;
            }
        }
    }
    return w;
}
function containPath(path, lineWidth, isStroke, x, y) {
    var data = path.data;
    var len = path.len();
    var w = 0;
    var xi = 0;
    var yi = 0;
    var x0 = 0;
    var y0 = 0;
    var x1;
    var y1;
    for (var i = 0; i < len;) {
        var cmd = data[i++];
        var isFirst = i === 1;
        if (cmd === CMD.M && i > 1) {
            if (!isStroke) {
                w += (0,_windingLine__WEBPACK_IMPORTED_MODULE_2__.default)(xi, yi, x0, y0, x, y);
            }
        }
        if (isFirst) {
            xi = data[i];
            yi = data[i + 1];
            x0 = xi;
            y0 = yi;
        }
        switch (cmd) {
            case CMD.M:
                x0 = data[i++];
                y0 = data[i++];
                xi = x0;
                yi = y0;
                break;
            case CMD.L:
                if (isStroke) {
                    if (_line__WEBPACK_IMPORTED_MODULE_3__.containStroke(xi, yi, data[i], data[i + 1], lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += (0,_windingLine__WEBPACK_IMPORTED_MODULE_2__.default)(xi, yi, data[i], data[i + 1], x, y) || 0;
                }
                xi = data[i++];
                yi = data[i++];
                break;
            case CMD.C:
                if (isStroke) {
                    if (_cubic__WEBPACK_IMPORTED_MODULE_4__.containStroke(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += windingCubic(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
                }
                xi = data[i++];
                yi = data[i++];
                break;
            case CMD.Q:
                if (isStroke) {
                    if (_quadratic__WEBPACK_IMPORTED_MODULE_5__.containStroke(xi, yi, data[i++], data[i++], data[i], data[i + 1], lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += windingQuadratic(xi, yi, data[i++], data[i++], data[i], data[i + 1], x, y) || 0;
                }
                xi = data[i++];
                yi = data[i++];
                break;
            case CMD.A:
                var cx = data[i++];
                var cy = data[i++];
                var rx = data[i++];
                var ry = data[i++];
                var theta = data[i++];
                var dTheta = data[i++];
                i += 1;
                var anticlockwise = !!(1 - data[i++]);
                x1 = Math.cos(theta) * rx + cx;
                y1 = Math.sin(theta) * ry + cy;
                if (!isFirst) {
                    w += (0,_windingLine__WEBPACK_IMPORTED_MODULE_2__.default)(xi, yi, x1, y1, x, y);
                }
                else {
                    x0 = x1;
                    y0 = y1;
                }
                var _x = (x - cx) * ry / rx + cx;
                if (isStroke) {
                    if (_arc__WEBPACK_IMPORTED_MODULE_6__.containStroke(cx, cy, ry, theta, theta + dTheta, anticlockwise, lineWidth, _x, y)) {
                        return true;
                    }
                }
                else {
                    w += windingArc(cx, cy, ry, theta, theta + dTheta, anticlockwise, _x, y);
                }
                xi = Math.cos(theta + dTheta) * rx + cx;
                yi = Math.sin(theta + dTheta) * ry + cy;
                break;
            case CMD.R:
                x0 = xi = data[i++];
                y0 = yi = data[i++];
                var width = data[i++];
                var height = data[i++];
                x1 = x0 + width;
                y1 = y0 + height;
                if (isStroke) {
                    if (_line__WEBPACK_IMPORTED_MODULE_3__.containStroke(x0, y0, x1, y0, lineWidth, x, y)
                        || _line__WEBPACK_IMPORTED_MODULE_3__.containStroke(x1, y0, x1, y1, lineWidth, x, y)
                        || _line__WEBPACK_IMPORTED_MODULE_3__.containStroke(x1, y1, x0, y1, lineWidth, x, y)
                        || _line__WEBPACK_IMPORTED_MODULE_3__.containStroke(x0, y1, x0, y0, lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += (0,_windingLine__WEBPACK_IMPORTED_MODULE_2__.default)(x1, y0, x1, y1, x, y);
                    w += (0,_windingLine__WEBPACK_IMPORTED_MODULE_2__.default)(x0, y1, x0, y0, x, y);
                }
                break;
            case CMD.Z:
                if (isStroke) {
                    if (_line__WEBPACK_IMPORTED_MODULE_3__.containStroke(xi, yi, x0, y0, lineWidth, x, y)) {
                        return true;
                    }
                }
                else {
                    w += (0,_windingLine__WEBPACK_IMPORTED_MODULE_2__.default)(xi, yi, x0, y0, x, y);
                }
                xi = x0;
                yi = y0;
                break;
        }
    }
    if (!isStroke && !isAroundEqual(yi, y0)) {
        w += (0,_windingLine__WEBPACK_IMPORTED_MODULE_2__.default)(xi, yi, x0, y0, x, y) || 0;
    }
    return w !== 0;
}
function contain(pathProxy, x, y) {
    return containPath(pathProxy, 0, false, x, y);
}
function containStroke(pathProxy, lineWidth, x, y) {
    return containPath(pathProxy, lineWidth, true, x, y);
}


/***/ }),

/***/ "./node_modules/zrender/lib/contain/quadratic.js":
/*!*******************************************************!*\
  !*** ./node_modules/zrender/lib/contain/quadratic.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "containStroke": () => (/* binding */ containStroke)
/* harmony export */ });
/* harmony import */ var _core_curve__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/curve */ "./node_modules/zrender/lib/core/curve.js");

function containStroke(x0, y0, x1, y1, x2, y2, lineWidth, x, y) {
    if (lineWidth === 0) {
        return false;
    }
    var _l = lineWidth;
    if ((y > y0 + _l && y > y1 + _l && y > y2 + _l)
        || (y < y0 - _l && y < y1 - _l && y < y2 - _l)
        || (x > x0 + _l && x > x1 + _l && x > x2 + _l)
        || (x < x0 - _l && x < x1 - _l && x < x2 - _l)) {
        return false;
    }
    var d = (0,_core_curve__WEBPACK_IMPORTED_MODULE_0__.quadraticProjectPoint)(x0, y0, x1, y1, x2, y2, x, y, null);
    return d <= _l / 2;
}


/***/ }),

/***/ "./node_modules/zrender/lib/contain/text.js":
/*!**************************************************!*\
  !*** ./node_modules/zrender/lib/contain/text.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_FONT": () => (/* binding */ DEFAULT_FONT),
/* harmony export */   "$override": () => (/* binding */ $override),
/* harmony export */   "getWidth": () => (/* binding */ getWidth),
/* harmony export */   "innerGetBoundingRect": () => (/* binding */ innerGetBoundingRect),
/* harmony export */   "getBoundingRect": () => (/* binding */ getBoundingRect),
/* harmony export */   "adjustTextX": () => (/* binding */ adjustTextX),
/* harmony export */   "adjustTextY": () => (/* binding */ adjustTextY),
/* harmony export */   "getLineHeight": () => (/* binding */ getLineHeight),
/* harmony export */   "measureText": () => (/* binding */ measureText),
/* harmony export */   "parsePercent": () => (/* binding */ parsePercent),
/* harmony export */   "calculateTextPosition": () => (/* binding */ calculateTextPosition)
/* harmony export */ });
/* harmony import */ var _core_BoundingRect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/BoundingRect */ "./node_modules/zrender/lib/core/BoundingRect.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _core_LRU__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/LRU */ "./node_modules/zrender/lib/core/LRU.js");



var textWidthCache = {};
var DEFAULT_FONT = '12px sans-serif';
var _ctx;
var _cachedFont;
function defaultMeasureText(text, font) {
    if (!_ctx) {
        _ctx = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.createCanvas)().getContext('2d');
    }
    if (_cachedFont !== font) {
        _cachedFont = _ctx.font = font || DEFAULT_FONT;
    }
    return _ctx.measureText(text);
}
var methods = {
    measureText: defaultMeasureText
};
function $override(name, fn) {
    methods[name] = fn;
}
function getWidth(text, font) {
    font = font || DEFAULT_FONT;
    var cacheOfFont = textWidthCache[font];
    if (!cacheOfFont) {
        cacheOfFont = textWidthCache[font] = new _core_LRU__WEBPACK_IMPORTED_MODULE_1__.default(500);
    }
    var width = cacheOfFont.get(text);
    if (width == null) {
        width = methods.measureText(text, font).width;
        cacheOfFont.put(text, width);
    }
    return width;
}
function innerGetBoundingRect(text, font, textAlign, textBaseline) {
    var width = getWidth(text, font);
    var height = getLineHeight(font);
    var x = adjustTextX(0, width, textAlign);
    var y = adjustTextY(0, height, textBaseline);
    var rect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_2__.default(x, y, width, height);
    return rect;
}
function getBoundingRect(text, font, textAlign, textBaseline) {
    var textLines = ((text || '') + '').split('\n');
    var len = textLines.length;
    if (len === 1) {
        return innerGetBoundingRect(textLines[0], font, textAlign, textBaseline);
    }
    else {
        var uniondRect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_2__.default(0, 0, 0, 0);
        for (var i = 0; i < textLines.length; i++) {
            var rect = innerGetBoundingRect(textLines[i], font, textAlign, textBaseline);
            i === 0 ? uniondRect.copy(rect) : uniondRect.union(rect);
        }
        return uniondRect;
    }
}
function adjustTextX(x, width, textAlign) {
    if (textAlign === 'right') {
        x -= width;
    }
    else if (textAlign === 'center') {
        x -= width / 2;
    }
    return x;
}
function adjustTextY(y, height, verticalAlign) {
    if (verticalAlign === 'middle') {
        y -= height / 2;
    }
    else if (verticalAlign === 'bottom') {
        y -= height;
    }
    return y;
}
function getLineHeight(font) {
    return getWidth('国', font);
}
function measureText(text, font) {
    return methods.measureText(text, font);
}
function parsePercent(value, maxValue) {
    if (typeof value === 'string') {
        if (value.lastIndexOf('%') >= 0) {
            return parseFloat(value) / 100 * maxValue;
        }
        return parseFloat(value);
    }
    return value;
}
function calculateTextPosition(out, opts, rect) {
    var textPosition = opts.position || 'inside';
    var distance = opts.distance != null ? opts.distance : 5;
    var height = rect.height;
    var width = rect.width;
    var halfHeight = height / 2;
    var x = rect.x;
    var y = rect.y;
    var textAlign = 'left';
    var textVerticalAlign = 'top';
    if (textPosition instanceof Array) {
        x += parsePercent(textPosition[0], rect.width);
        y += parsePercent(textPosition[1], rect.height);
        textAlign = null;
        textVerticalAlign = null;
    }
    else {
        switch (textPosition) {
            case 'left':
                x -= distance;
                y += halfHeight;
                textAlign = 'right';
                textVerticalAlign = 'middle';
                break;
            case 'right':
                x += distance + width;
                y += halfHeight;
                textVerticalAlign = 'middle';
                break;
            case 'top':
                x += width / 2;
                y -= distance;
                textAlign = 'center';
                textVerticalAlign = 'bottom';
                break;
            case 'bottom':
                x += width / 2;
                y += height + distance;
                textAlign = 'center';
                break;
            case 'inside':
                x += width / 2;
                y += halfHeight;
                textAlign = 'center';
                textVerticalAlign = 'middle';
                break;
            case 'insideLeft':
                x += distance;
                y += halfHeight;
                textVerticalAlign = 'middle';
                break;
            case 'insideRight':
                x += width - distance;
                y += halfHeight;
                textAlign = 'right';
                textVerticalAlign = 'middle';
                break;
            case 'insideTop':
                x += width / 2;
                y += distance;
                textAlign = 'center';
                break;
            case 'insideBottom':
                x += width / 2;
                y += height - distance;
                textAlign = 'center';
                textVerticalAlign = 'bottom';
                break;
            case 'insideTopLeft':
                x += distance;
                y += distance;
                break;
            case 'insideTopRight':
                x += width - distance;
                y += distance;
                textAlign = 'right';
                break;
            case 'insideBottomLeft':
                x += distance;
                y += height - distance;
                textVerticalAlign = 'bottom';
                break;
            case 'insideBottomRight':
                x += width - distance;
                y += height - distance;
                textAlign = 'right';
                textVerticalAlign = 'bottom';
                break;
        }
    }
    out = out || {};
    out.x = x;
    out.y = y;
    out.align = textAlign;
    out.verticalAlign = textVerticalAlign;
    return out;
}


/***/ }),

/***/ "./node_modules/zrender/lib/contain/util.js":
/*!**************************************************!*\
  !*** ./node_modules/zrender/lib/contain/util.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeRadian": () => (/* binding */ normalizeRadian)
/* harmony export */ });
var PI2 = Math.PI * 2;
function normalizeRadian(angle) {
    angle %= PI2;
    if (angle < 0) {
        angle += PI2;
    }
    return angle;
}


/***/ }),

/***/ "./node_modules/zrender/lib/contain/windingLine.js":
/*!*********************************************************!*\
  !*** ./node_modules/zrender/lib/contain/windingLine.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ windingLine)
/* harmony export */ });
function windingLine(x0, y0, x1, y1, x, y) {
    if ((y > y0 && y > y1) || (y < y0 && y < y1)) {
        return 0;
    }
    if (y1 === y0) {
        return 0;
    }
    var t = (y - y0) / (y1 - y0);
    var dir = y1 < y0 ? 1 : -1;
    if (t === 1 || t === 0) {
        dir = y1 < y0 ? 0.5 : -0.5;
    }
    var x_ = t * (x1 - x0) + x0;
    return x_ === x ? Infinity : x_ > x ? dir : 0;
}


/***/ }),

/***/ "./node_modules/zrender/lib/core/BoundingRect.js":
/*!*******************************************************!*\
  !*** ./node_modules/zrender/lib/core/BoundingRect.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./matrix */ "./node_modules/zrender/lib/core/matrix.js");
/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ "./node_modules/zrender/lib/core/Point.js");


var mathMin = Math.min;
var mathMax = Math.max;
var lt = new _Point__WEBPACK_IMPORTED_MODULE_0__.default();
var rb = new _Point__WEBPACK_IMPORTED_MODULE_0__.default();
var lb = new _Point__WEBPACK_IMPORTED_MODULE_0__.default();
var rt = new _Point__WEBPACK_IMPORTED_MODULE_0__.default();
var minTv = new _Point__WEBPACK_IMPORTED_MODULE_0__.default();
var maxTv = new _Point__WEBPACK_IMPORTED_MODULE_0__.default();
var BoundingRect = (function () {
    function BoundingRect(x, y, width, height) {
        if (width < 0 && isFinite(width)) {
            x = x + width;
            width = -width;
        }
        if (height < 0 && isFinite(height)) {
            y = y + height;
            height = -height;
        }
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    BoundingRect.prototype.union = function (other) {
        var x = mathMin(other.x, this.x);
        var y = mathMin(other.y, this.y);
        if (isFinite(this.x) && isFinite(this.width)) {
            this.width = mathMax(other.x + other.width, this.x + this.width) - x;
        }
        else {
            this.width = other.width;
        }
        if (isFinite(this.y) && isFinite(this.height)) {
            this.height = mathMax(other.y + other.height, this.y + this.height) - y;
        }
        else {
            this.height = other.height;
        }
        this.x = x;
        this.y = y;
    };
    BoundingRect.prototype.applyTransform = function (m) {
        BoundingRect.applyTransform(this, this, m);
    };
    BoundingRect.prototype.calculateTransform = function (b) {
        var a = this;
        var sx = b.width / a.width;
        var sy = b.height / a.height;
        var m = _matrix__WEBPACK_IMPORTED_MODULE_1__.create();
        _matrix__WEBPACK_IMPORTED_MODULE_1__.translate(m, m, [-a.x, -a.y]);
        _matrix__WEBPACK_IMPORTED_MODULE_1__.scale(m, m, [sx, sy]);
        _matrix__WEBPACK_IMPORTED_MODULE_1__.translate(m, m, [b.x, b.y]);
        return m;
    };
    BoundingRect.prototype.intersect = function (b, mtv) {
        if (!b) {
            return false;
        }
        if (!(b instanceof BoundingRect)) {
            b = BoundingRect.create(b);
        }
        var a = this;
        var ax0 = a.x;
        var ax1 = a.x + a.width;
        var ay0 = a.y;
        var ay1 = a.y + a.height;
        var bx0 = b.x;
        var bx1 = b.x + b.width;
        var by0 = b.y;
        var by1 = b.y + b.height;
        var overlap = !(ax1 < bx0 || bx1 < ax0 || ay1 < by0 || by1 < ay0);
        if (mtv) {
            var dMin = Infinity;
            var dMax = 0;
            var d0 = Math.abs(ax1 - bx0);
            var d1 = Math.abs(bx1 - ax0);
            var d2 = Math.abs(ay1 - by0);
            var d3 = Math.abs(by1 - ay0);
            var dx = Math.min(d0, d1);
            var dy = Math.min(d2, d3);
            if (ax1 < bx0 || bx1 < ax0) {
                if (dx > dMax) {
                    dMax = dx;
                    if (d0 < d1) {
                        _Point__WEBPACK_IMPORTED_MODULE_0__.default.set(maxTv, -d0, 0);
                    }
                    else {
                        _Point__WEBPACK_IMPORTED_MODULE_0__.default.set(maxTv, d1, 0);
                    }
                }
            }
            else {
                if (dx < dMin) {
                    dMin = dx;
                    if (d0 < d1) {
                        _Point__WEBPACK_IMPORTED_MODULE_0__.default.set(minTv, d0, 0);
                    }
                    else {
                        _Point__WEBPACK_IMPORTED_MODULE_0__.default.set(minTv, -d1, 0);
                    }
                }
            }
            if (ay1 < by0 || by1 < ay0) {
                if (dy > dMax) {
                    dMax = dy;
                    if (d2 < d3) {
                        _Point__WEBPACK_IMPORTED_MODULE_0__.default.set(maxTv, 0, -d2);
                    }
                    else {
                        _Point__WEBPACK_IMPORTED_MODULE_0__.default.set(maxTv, 0, d3);
                    }
                }
            }
            else {
                if (dx < dMin) {
                    dMin = dx;
                    if (d2 < d3) {
                        _Point__WEBPACK_IMPORTED_MODULE_0__.default.set(minTv, 0, d2);
                    }
                    else {
                        _Point__WEBPACK_IMPORTED_MODULE_0__.default.set(minTv, 0, -d3);
                    }
                }
            }
        }
        if (mtv) {
            _Point__WEBPACK_IMPORTED_MODULE_0__.default.copy(mtv, overlap ? minTv : maxTv);
        }
        return overlap;
    };
    BoundingRect.prototype.contain = function (x, y) {
        var rect = this;
        return x >= rect.x
            && x <= (rect.x + rect.width)
            && y >= rect.y
            && y <= (rect.y + rect.height);
    };
    BoundingRect.prototype.clone = function () {
        return new BoundingRect(this.x, this.y, this.width, this.height);
    };
    BoundingRect.prototype.copy = function (other) {
        BoundingRect.copy(this, other);
    };
    BoundingRect.prototype.plain = function () {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    };
    BoundingRect.prototype.isFinite = function () {
        return isFinite(this.x)
            && isFinite(this.y)
            && isFinite(this.width)
            && isFinite(this.height);
    };
    BoundingRect.prototype.isZero = function () {
        return this.width === 0 || this.height === 0;
    };
    BoundingRect.create = function (rect) {
        return new BoundingRect(rect.x, rect.y, rect.width, rect.height);
    };
    BoundingRect.copy = function (target, source) {
        target.x = source.x;
        target.y = source.y;
        target.width = source.width;
        target.height = source.height;
    };
    BoundingRect.applyTransform = function (target, source, m) {
        if (!m) {
            if (target !== source) {
                BoundingRect.copy(target, source);
            }
            return;
        }
        if (m[1] < 1e-5 && m[1] > -1e-5 && m[2] < 1e-5 && m[2] > -1e-5) {
            var sx = m[0];
            var sy = m[3];
            var tx = m[4];
            var ty = m[5];
            target.x = source.x * sx + tx;
            target.y = source.y * sy + ty;
            target.width = source.width * sx;
            target.height = source.height * sy;
            if (target.width < 0) {
                target.x += target.width;
                target.width = -target.width;
            }
            if (target.height < 0) {
                target.y += target.height;
                target.height = -target.height;
            }
            return;
        }
        lt.x = lb.x = source.x;
        lt.y = rt.y = source.y;
        rb.x = rt.x = source.x + source.width;
        rb.y = lb.y = source.y + source.height;
        lt.transform(m);
        rt.transform(m);
        rb.transform(m);
        lb.transform(m);
        target.x = mathMin(lt.x, rb.x, lb.x, rt.x);
        target.y = mathMin(lt.y, rb.y, lb.y, rt.y);
        var maxX = mathMax(lt.x, rb.x, lb.x, rt.x);
        var maxY = mathMax(lt.y, rb.y, lb.y, rt.y);
        target.width = maxX - target.x;
        target.height = maxY - target.y;
    };
    return BoundingRect;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BoundingRect);


/***/ }),

/***/ "./node_modules/zrender/lib/core/Eventful.js":
/*!***************************************************!*\
  !*** ./node_modules/zrender/lib/core/Eventful.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Eventful = (function () {
    function Eventful(eventProcessors) {
        if (eventProcessors) {
            this._$eventProcessor = eventProcessors;
        }
    }
    Eventful.prototype.on = function (event, query, handler, context) {
        if (!this._$handlers) {
            this._$handlers = {};
        }
        var _h = this._$handlers;
        if (typeof query === 'function') {
            context = handler;
            handler = query;
            query = null;
        }
        if (!handler || !event) {
            return this;
        }
        var eventProcessor = this._$eventProcessor;
        if (query != null && eventProcessor && eventProcessor.normalizeQuery) {
            query = eventProcessor.normalizeQuery(query);
        }
        if (!_h[event]) {
            _h[event] = [];
        }
        for (var i = 0; i < _h[event].length; i++) {
            if (_h[event][i].h === handler) {
                return this;
            }
        }
        var wrap = {
            h: handler,
            query: query,
            ctx: (context || this),
            callAtLast: handler.zrEventfulCallAtLast
        };
        var lastIndex = _h[event].length - 1;
        var lastWrap = _h[event][lastIndex];
        (lastWrap && lastWrap.callAtLast)
            ? _h[event].splice(lastIndex, 0, wrap)
            : _h[event].push(wrap);
        return this;
    };
    Eventful.prototype.isSilent = function (eventName) {
        var _h = this._$handlers;
        return !_h || !_h[eventName] || !_h[eventName].length;
    };
    Eventful.prototype.off = function (eventType, handler) {
        var _h = this._$handlers;
        if (!_h) {
            return this;
        }
        if (!eventType) {
            this._$handlers = {};
            return this;
        }
        if (handler) {
            if (_h[eventType]) {
                var newList = [];
                for (var i = 0, l = _h[eventType].length; i < l; i++) {
                    if (_h[eventType][i].h !== handler) {
                        newList.push(_h[eventType][i]);
                    }
                }
                _h[eventType] = newList;
            }
            if (_h[eventType] && _h[eventType].length === 0) {
                delete _h[eventType];
            }
        }
        else {
            delete _h[eventType];
        }
        return this;
    };
    Eventful.prototype.trigger = function (eventType) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (!this._$handlers) {
            return this;
        }
        var _h = this._$handlers[eventType];
        var eventProcessor = this._$eventProcessor;
        if (_h) {
            var argLen = args.length;
            var len = _h.length;
            for (var i = 0; i < len; i++) {
                var hItem = _h[i];
                if (eventProcessor
                    && eventProcessor.filter
                    && hItem.query != null
                    && !eventProcessor.filter(eventType, hItem.query)) {
                    continue;
                }
                switch (argLen) {
                    case 0:
                        hItem.h.call(hItem.ctx);
                        break;
                    case 1:
                        hItem.h.call(hItem.ctx, args[0]);
                        break;
                    case 2:
                        hItem.h.call(hItem.ctx, args[0], args[1]);
                        break;
                    default:
                        hItem.h.apply(hItem.ctx, args);
                        break;
                }
            }
        }
        eventProcessor && eventProcessor.afterTrigger
            && eventProcessor.afterTrigger(eventType);
        return this;
    };
    Eventful.prototype.triggerWithContext = function (type) {
        if (!this._$handlers) {
            return this;
        }
        var _h = this._$handlers[type];
        var eventProcessor = this._$eventProcessor;
        if (_h) {
            var args = arguments;
            var argLen = args.length;
            var ctx = args[argLen - 1];
            var len = _h.length;
            for (var i = 0; i < len; i++) {
                var hItem = _h[i];
                if (eventProcessor
                    && eventProcessor.filter
                    && hItem.query != null
                    && !eventProcessor.filter(type, hItem.query)) {
                    continue;
                }
                switch (argLen) {
                    case 0:
                        hItem.h.call(ctx);
                        break;
                    case 1:
                        hItem.h.call(ctx, args[0]);
                        break;
                    case 2:
                        hItem.h.call(ctx, args[0], args[1]);
                        break;
                    default:
                        hItem.h.apply(ctx, args.slice(1, argLen - 1));
                        break;
                }
            }
        }
        eventProcessor && eventProcessor.afterTrigger
            && eventProcessor.afterTrigger(type);
        return this;
    };
    return Eventful;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Eventful);


/***/ }),

/***/ "./node_modules/zrender/lib/core/LRU.js":
/*!**********************************************!*\
  !*** ./node_modules/zrender/lib/core/LRU.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Entry": () => (/* binding */ Entry),
/* harmony export */   "LinkedList": () => (/* binding */ LinkedList),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Entry = (function () {
    function Entry(val) {
        this.value = val;
    }
    return Entry;
}());

var LinkedList = (function () {
    function LinkedList() {
        this._len = 0;
    }
    LinkedList.prototype.insert = function (val) {
        var entry = new Entry(val);
        this.insertEntry(entry);
        return entry;
    };
    LinkedList.prototype.insertEntry = function (entry) {
        if (!this.head) {
            this.head = this.tail = entry;
        }
        else {
            this.tail.next = entry;
            entry.prev = this.tail;
            entry.next = null;
            this.tail = entry;
        }
        this._len++;
    };
    LinkedList.prototype.remove = function (entry) {
        var prev = entry.prev;
        var next = entry.next;
        if (prev) {
            prev.next = next;
        }
        else {
            this.head = next;
        }
        if (next) {
            next.prev = prev;
        }
        else {
            this.tail = prev;
        }
        entry.next = entry.prev = null;
        this._len--;
    };
    LinkedList.prototype.len = function () {
        return this._len;
    };
    LinkedList.prototype.clear = function () {
        this.head = this.tail = null;
        this._len = 0;
    };
    return LinkedList;
}());

var LRU = (function () {
    function LRU(maxSize) {
        this._list = new LinkedList();
        this._maxSize = 10;
        this._map = {};
        this._maxSize = maxSize;
    }
    LRU.prototype.put = function (key, value) {
        var list = this._list;
        var map = this._map;
        var removed = null;
        if (map[key] == null) {
            var len = list.len();
            var entry = this._lastRemovedEntry;
            if (len >= this._maxSize && len > 0) {
                var leastUsedEntry = list.head;
                list.remove(leastUsedEntry);
                delete map[leastUsedEntry.key];
                removed = leastUsedEntry.value;
                this._lastRemovedEntry = leastUsedEntry;
            }
            if (entry) {
                entry.value = value;
            }
            else {
                entry = new Entry(value);
            }
            entry.key = key;
            list.insertEntry(entry);
            map[key] = entry;
        }
        return removed;
    };
    LRU.prototype.get = function (key) {
        var entry = this._map[key];
        var list = this._list;
        if (entry != null) {
            if (entry !== list.tail) {
                list.remove(entry);
                list.insertEntry(entry);
            }
            return entry.value;
        }
    };
    LRU.prototype.clear = function () {
        this._list.clear();
        this._map = {};
    };
    LRU.prototype.len = function () {
        return this._list.len();
    };
    return LRU;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LRU);


/***/ }),

/***/ "./node_modules/zrender/lib/core/PathProxy.js":
/*!****************************************************!*\
  !*** ./node_modules/zrender/lib/core/PathProxy.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeArcAngles": () => (/* binding */ normalizeArcAngles),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vector */ "./node_modules/zrender/lib/core/vector.js");
/* harmony import */ var _BoundingRect__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./BoundingRect */ "./node_modules/zrender/lib/core/BoundingRect.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../config */ "./node_modules/zrender/lib/config.js");
/* harmony import */ var _bbox__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bbox */ "./node_modules/zrender/lib/core/bbox.js");
/* harmony import */ var _curve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curve */ "./node_modules/zrender/lib/core/curve.js");





var CMD = {
    M: 1,
    L: 2,
    C: 3,
    Q: 4,
    A: 5,
    Z: 6,
    R: 7
};
var tmpOutX = [];
var tmpOutY = [];
var min = [];
var max = [];
var min2 = [];
var max2 = [];
var mathMin = Math.min;
var mathMax = Math.max;
var mathCos = Math.cos;
var mathSin = Math.sin;
var mathSqrt = Math.sqrt;
var mathAbs = Math.abs;
var PI = Math.PI;
var PI2 = PI * 2;
var hasTypedArray = typeof Float32Array !== 'undefined';
var tmpAngles = [];
function modPI2(radian) {
    var n = Math.round(radian / PI * 1e8) / 1e8;
    return (n % 2) * PI;
}
function normalizeArcAngles(angles, anticlockwise) {
    var newStartAngle = modPI2(angles[0]);
    if (newStartAngle < 0) {
        newStartAngle += PI2;
    }
    var delta = newStartAngle - angles[0];
    var newEndAngle = angles[1];
    newEndAngle += delta;
    if (!anticlockwise && newEndAngle - newStartAngle >= PI2) {
        newEndAngle = newStartAngle + PI2;
    }
    else if (anticlockwise && newStartAngle - newEndAngle >= PI2) {
        newEndAngle = newStartAngle - PI2;
    }
    else if (!anticlockwise && newStartAngle > newEndAngle) {
        newEndAngle = newStartAngle +
            (PI2 - modPI2(newStartAngle - newEndAngle));
    }
    else if (anticlockwise && newStartAngle < newEndAngle) {
        newEndAngle = newStartAngle -
            (PI2 - modPI2(newEndAngle - newStartAngle));
    }
    angles[0] = newStartAngle;
    angles[1] = newEndAngle;
}
var PathProxy = (function () {
    function PathProxy(notSaveData) {
        this.dpr = 1;
        this._version = 0;
        this._xi = 0;
        this._yi = 0;
        this._x0 = 0;
        this._y0 = 0;
        this._len = 0;
        if (notSaveData) {
            this._saveData = false;
        }
        if (this._saveData) {
            this.data = [];
        }
    }
    PathProxy.prototype.increaseVersion = function () {
        this._version++;
    };
    PathProxy.prototype.getVersion = function () {
        return this._version;
    };
    PathProxy.prototype.setScale = function (sx, sy, segmentIgnoreThreshold) {
        segmentIgnoreThreshold = segmentIgnoreThreshold || 0;
        if (segmentIgnoreThreshold > 0) {
            this._ux = mathAbs(segmentIgnoreThreshold / _config__WEBPACK_IMPORTED_MODULE_0__.devicePixelRatio / sx) || 0;
            this._uy = mathAbs(segmentIgnoreThreshold / _config__WEBPACK_IMPORTED_MODULE_0__.devicePixelRatio / sy) || 0;
        }
    };
    PathProxy.prototype.setDPR = function (dpr) {
        this.dpr = dpr;
    };
    PathProxy.prototype.setContext = function (ctx) {
        this._ctx = ctx;
    };
    PathProxy.prototype.getContext = function () {
        return this._ctx;
    };
    PathProxy.prototype.beginPath = function () {
        this._ctx && this._ctx.beginPath();
        this.reset();
        return this;
    };
    PathProxy.prototype.reset = function () {
        if (this._saveData) {
            this._len = 0;
        }
        if (this._lineDash) {
            this._lineDash = null;
            this._dashOffset = 0;
        }
        if (this._pathSegLen) {
            this._pathSegLen = null;
            this._pathLen = 0;
        }
        this._version++;
    };
    PathProxy.prototype.moveTo = function (x, y) {
        this.addData(CMD.M, x, y);
        this._ctx && this._ctx.moveTo(x, y);
        this._x0 = x;
        this._y0 = y;
        this._xi = x;
        this._yi = y;
        return this;
    };
    PathProxy.prototype.lineTo = function (x, y) {
        var exceedUnit = mathAbs(x - this._xi) > this._ux
            || mathAbs(y - this._yi) > this._uy
            || this._len < 5;
        this.addData(CMD.L, x, y);
        if (this._ctx && exceedUnit) {
            this._needsDash ? this._dashedLineTo(x, y)
                : this._ctx.lineTo(x, y);
        }
        if (exceedUnit) {
            this._xi = x;
            this._yi = y;
        }
        return this;
    };
    PathProxy.prototype.bezierCurveTo = function (x1, y1, x2, y2, x3, y3) {
        this.addData(CMD.C, x1, y1, x2, y2, x3, y3);
        if (this._ctx) {
            this._needsDash ? this._dashedBezierTo(x1, y1, x2, y2, x3, y3)
                : this._ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
        }
        this._xi = x3;
        this._yi = y3;
        return this;
    };
    PathProxy.prototype.quadraticCurveTo = function (x1, y1, x2, y2) {
        this.addData(CMD.Q, x1, y1, x2, y2);
        if (this._ctx) {
            this._needsDash ? this._dashedQuadraticTo(x1, y1, x2, y2)
                : this._ctx.quadraticCurveTo(x1, y1, x2, y2);
        }
        this._xi = x2;
        this._yi = y2;
        return this;
    };
    PathProxy.prototype.arc = function (cx, cy, r, startAngle, endAngle, anticlockwise) {
        tmpAngles[0] = startAngle;
        tmpAngles[1] = endAngle;
        normalizeArcAngles(tmpAngles, anticlockwise);
        startAngle = tmpAngles[0];
        endAngle = tmpAngles[1];
        var delta = endAngle - startAngle;
        this.addData(CMD.A, cx, cy, r, r, startAngle, delta, 0, anticlockwise ? 0 : 1);
        this._ctx && this._ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);
        this._xi = mathCos(endAngle) * r + cx;
        this._yi = mathSin(endAngle) * r + cy;
        return this;
    };
    PathProxy.prototype.arcTo = function (x1, y1, x2, y2, radius) {
        if (this._ctx) {
            this._ctx.arcTo(x1, y1, x2, y2, radius);
        }
        return this;
    };
    PathProxy.prototype.rect = function (x, y, w, h) {
        this._ctx && this._ctx.rect(x, y, w, h);
        this.addData(CMD.R, x, y, w, h);
        return this;
    };
    PathProxy.prototype.closePath = function () {
        this.addData(CMD.Z);
        var ctx = this._ctx;
        var x0 = this._x0;
        var y0 = this._y0;
        if (ctx) {
            this._needsDash && this._dashedLineTo(x0, y0);
            ctx.closePath();
        }
        this._xi = x0;
        this._yi = y0;
        return this;
    };
    PathProxy.prototype.fill = function (ctx) {
        ctx && ctx.fill();
        this.toStatic();
    };
    PathProxy.prototype.stroke = function (ctx) {
        ctx && ctx.stroke();
        this.toStatic();
    };
    PathProxy.prototype.setLineDash = function (lineDash) {
        if (lineDash instanceof Array) {
            this._lineDash = lineDash;
            this._dashIdx = 0;
            var lineDashSum = 0;
            for (var i = 0; i < lineDash.length; i++) {
                lineDashSum += lineDash[i];
            }
            this._dashSum = lineDashSum;
            this._needsDash = true;
        }
        else {
            this._lineDash = null;
            this._needsDash = false;
        }
        return this;
    };
    PathProxy.prototype.setLineDashOffset = function (offset) {
        this._dashOffset = offset;
        return this;
    };
    PathProxy.prototype.len = function () {
        return this._len;
    };
    PathProxy.prototype.setData = function (data) {
        var len = data.length;
        if (!(this.data && this.data.length === len) && hasTypedArray) {
            this.data = new Float32Array(len);
        }
        for (var i = 0; i < len; i++) {
            this.data[i] = data[i];
        }
        this._len = len;
    };
    PathProxy.prototype.appendPath = function (path) {
        if (!(path instanceof Array)) {
            path = [path];
        }
        var len = path.length;
        var appendSize = 0;
        var offset = this._len;
        for (var i = 0; i < len; i++) {
            appendSize += path[i].len();
        }
        if (hasTypedArray && (this.data instanceof Float32Array)) {
            this.data = new Float32Array(offset + appendSize);
        }
        for (var i = 0; i < len; i++) {
            var appendPathData = path[i].data;
            for (var k = 0; k < appendPathData.length; k++) {
                this.data[offset++] = appendPathData[k];
            }
        }
        this._len = offset;
    };
    PathProxy.prototype.addData = function (cmd, a, b, c, d, e, f, g, h) {
        if (!this._saveData) {
            return;
        }
        var data = this.data;
        if (this._len + arguments.length > data.length) {
            this._expandData();
            data = this.data;
        }
        for (var i = 0; i < arguments.length; i++) {
            data[this._len++] = arguments[i];
        }
    };
    PathProxy.prototype._expandData = function () {
        if (!(this.data instanceof Array)) {
            var newData = [];
            for (var i = 0; i < this._len; i++) {
                newData[i] = this.data[i];
            }
            this.data = newData;
        }
    };
    PathProxy.prototype._dashedLineTo = function (x1, y1) {
        var dashSum = this._dashSum;
        var lineDash = this._lineDash;
        var ctx = this._ctx;
        var offset = this._dashOffset;
        var x0 = this._xi;
        var y0 = this._yi;
        var dx = x1 - x0;
        var dy = y1 - y0;
        var dist = mathSqrt(dx * dx + dy * dy);
        var x = x0;
        var y = y0;
        var nDash = lineDash.length;
        var dash;
        var idx;
        dx /= dist;
        dy /= dist;
        if (offset < 0) {
            offset = dashSum + offset;
        }
        offset %= dashSum;
        x -= offset * dx;
        y -= offset * dy;
        while ((dx > 0 && x <= x1) || (dx < 0 && x >= x1)
            || (dx === 0 && ((dy > 0 && y <= y1) || (dy < 0 && y >= y1)))) {
            idx = this._dashIdx;
            dash = lineDash[idx];
            x += dx * dash;
            y += dy * dash;
            this._dashIdx = (idx + 1) % nDash;
            if ((dx > 0 && x < x0) || (dx < 0 && x > x0) || (dy > 0 && y < y0) || (dy < 0 && y > y0)) {
                continue;
            }
            ctx[idx % 2 ? 'moveTo' : 'lineTo'](dx >= 0 ? mathMin(x, x1) : mathMax(x, x1), dy >= 0 ? mathMin(y, y1) : mathMax(y, y1));
        }
        dx = x - x1;
        dy = y - y1;
        this._dashOffset = -mathSqrt(dx * dx + dy * dy);
    };
    PathProxy.prototype._dashedBezierTo = function (x1, y1, x2, y2, x3, y3) {
        var ctx = this._ctx;
        var dashSum = this._dashSum;
        var offset = this._dashOffset;
        var lineDash = this._lineDash;
        var x0 = this._xi;
        var y0 = this._yi;
        var bezierLen = 0;
        var idx = this._dashIdx;
        var nDash = lineDash.length;
        var t;
        var dx;
        var dy;
        var x;
        var y;
        var tmpLen = 0;
        if (offset < 0) {
            offset = dashSum + offset;
        }
        offset %= dashSum;
        for (t = 0; t < 1; t += 0.1) {
            dx = (0,_curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt)(x0, x1, x2, x3, t + 0.1)
                - (0,_curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt)(x0, x1, x2, x3, t);
            dy = (0,_curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt)(y0, y1, y2, y3, t + 0.1)
                - (0,_curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt)(y0, y1, y2, y3, t);
            bezierLen += mathSqrt(dx * dx + dy * dy);
        }
        for (; idx < nDash; idx++) {
            tmpLen += lineDash[idx];
            if (tmpLen > offset) {
                break;
            }
        }
        t = (tmpLen - offset) / bezierLen;
        while (t <= 1) {
            x = (0,_curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt)(x0, x1, x2, x3, t);
            y = (0,_curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt)(y0, y1, y2, y3, t);
            idx % 2 ? ctx.moveTo(x, y)
                : ctx.lineTo(x, y);
            t += lineDash[idx] / bezierLen;
            idx = (idx + 1) % nDash;
        }
        (idx % 2 !== 0) && ctx.lineTo(x3, y3);
        dx = x3 - x;
        dy = y3 - y;
        this._dashOffset = -mathSqrt(dx * dx + dy * dy);
    };
    PathProxy.prototype._dashedQuadraticTo = function (x1, y1, x2, y2) {
        var x3 = x2;
        var y3 = y2;
        x2 = (x2 + 2 * x1) / 3;
        y2 = (y2 + 2 * y1) / 3;
        x1 = (this._xi + 2 * x1) / 3;
        y1 = (this._yi + 2 * y1) / 3;
        this._dashedBezierTo(x1, y1, x2, y2, x3, y3);
    };
    PathProxy.prototype.toStatic = function () {
        if (!this._saveData) {
            return;
        }
        var data = this.data;
        if (data instanceof Array) {
            data.length = this._len;
            if (hasTypedArray && this._len > 11) {
                this.data = new Float32Array(data);
            }
        }
    };
    PathProxy.prototype.getBoundingRect = function () {
        min[0] = min[1] = min2[0] = min2[1] = Number.MAX_VALUE;
        max[0] = max[1] = max2[0] = max2[1] = -Number.MAX_VALUE;
        var data = this.data;
        var xi = 0;
        var yi = 0;
        var x0 = 0;
        var y0 = 0;
        var i;
        for (i = 0; i < this._len;) {
            var cmd = data[i++];
            var isFirst = i === 1;
            if (isFirst) {
                xi = data[i];
                yi = data[i + 1];
                x0 = xi;
                y0 = yi;
            }
            switch (cmd) {
                case CMD.M:
                    xi = x0 = data[i++];
                    yi = y0 = data[i++];
                    min2[0] = x0;
                    min2[1] = y0;
                    max2[0] = x0;
                    max2[1] = y0;
                    break;
                case CMD.L:
                    (0,_bbox__WEBPACK_IMPORTED_MODULE_2__.fromLine)(xi, yi, data[i], data[i + 1], min2, max2);
                    xi = data[i++];
                    yi = data[i++];
                    break;
                case CMD.C:
                    (0,_bbox__WEBPACK_IMPORTED_MODULE_2__.fromCubic)(xi, yi, data[i++], data[i++], data[i++], data[i++], data[i], data[i + 1], min2, max2);
                    xi = data[i++];
                    yi = data[i++];
                    break;
                case CMD.Q:
                    (0,_bbox__WEBPACK_IMPORTED_MODULE_2__.fromQuadratic)(xi, yi, data[i++], data[i++], data[i], data[i + 1], min2, max2);
                    xi = data[i++];
                    yi = data[i++];
                    break;
                case CMD.A:
                    var cx = data[i++];
                    var cy = data[i++];
                    var rx = data[i++];
                    var ry = data[i++];
                    var startAngle = data[i++];
                    var endAngle = data[i++] + startAngle;
                    i += 1;
                    var anticlockwise = !data[i++];
                    if (isFirst) {
                        x0 = mathCos(startAngle) * rx + cx;
                        y0 = mathSin(startAngle) * ry + cy;
                    }
                    (0,_bbox__WEBPACK_IMPORTED_MODULE_2__.fromArc)(cx, cy, rx, ry, startAngle, endAngle, anticlockwise, min2, max2);
                    xi = mathCos(endAngle) * rx + cx;
                    yi = mathSin(endAngle) * ry + cy;
                    break;
                case CMD.R:
                    x0 = xi = data[i++];
                    y0 = yi = data[i++];
                    var width = data[i++];
                    var height = data[i++];
                    (0,_bbox__WEBPACK_IMPORTED_MODULE_2__.fromLine)(x0, y0, x0 + width, y0 + height, min2, max2);
                    break;
                case CMD.Z:
                    xi = x0;
                    yi = y0;
                    break;
            }
            _vector__WEBPACK_IMPORTED_MODULE_3__.min(min, min, min2);
            _vector__WEBPACK_IMPORTED_MODULE_3__.max(max, max, max2);
        }
        if (i === 0) {
            min[0] = min[1] = max[0] = max[1] = 0;
        }
        return new _BoundingRect__WEBPACK_IMPORTED_MODULE_4__.default(min[0], min[1], max[0] - min[0], max[1] - min[1]);
    };
    PathProxy.prototype._calculateLength = function () {
        var data = this.data;
        var len = this._len;
        var ux = this._ux;
        var uy = this._uy;
        var xi = 0;
        var yi = 0;
        var x0 = 0;
        var y0 = 0;
        if (!this._pathSegLen) {
            this._pathSegLen = [];
        }
        var pathSegLen = this._pathSegLen;
        var pathTotalLen = 0;
        var segCount = 0;
        for (var i = 0; i < len;) {
            var cmd = data[i++];
            var isFirst = i === 1;
            if (isFirst) {
                xi = data[i];
                yi = data[i + 1];
                x0 = xi;
                y0 = yi;
            }
            var l = -1;
            switch (cmd) {
                case CMD.M:
                    xi = x0 = data[i++];
                    yi = y0 = data[i++];
                    break;
                case CMD.L: {
                    var x2 = data[i++];
                    var y2 = data[i++];
                    var dx = x2 - xi;
                    var dy = y2 - yi;
                    if (mathAbs(dx) > ux || mathAbs(dy) > uy || i === len - 1) {
                        l = Math.sqrt(dx * dx + dy * dy);
                        xi = x2;
                        yi = y2;
                    }
                    break;
                }
                case CMD.C: {
                    var x1 = data[i++];
                    var y1 = data[i++];
                    var x2 = data[i++];
                    var y2 = data[i++];
                    var x3 = data[i++];
                    var y3 = data[i++];
                    l = (0,_curve__WEBPACK_IMPORTED_MODULE_1__.cubicLength)(xi, yi, x1, y1, x2, y2, x3, y3, 10);
                    xi = x3;
                    yi = y3;
                    break;
                }
                case CMD.Q: {
                    var x1 = data[i++];
                    var y1 = data[i++];
                    var x2 = data[i++];
                    var y2 = data[i++];
                    l = (0,_curve__WEBPACK_IMPORTED_MODULE_1__.quadraticLength)(xi, yi, x1, y1, x2, y2, 10);
                    xi = x2;
                    yi = y2;
                    break;
                }
                case CMD.A:
                    var cx = data[i++];
                    var cy = data[i++];
                    var rx = data[i++];
                    var ry = data[i++];
                    var startAngle = data[i++];
                    var delta = data[i++];
                    var endAngle = delta + startAngle;
                    i += 1;
                    var anticlockwise = !data[i++];
                    if (isFirst) {
                        x0 = mathCos(startAngle) * rx + cx;
                        y0 = mathSin(startAngle) * ry + cy;
                    }
                    l = mathMax(rx, ry) * mathMin(PI2, Math.abs(delta));
                    xi = mathCos(endAngle) * rx + cx;
                    yi = mathSin(endAngle) * ry + cy;
                    break;
                case CMD.R: {
                    x0 = xi = data[i++];
                    y0 = yi = data[i++];
                    var width = data[i++];
                    var height = data[i++];
                    l = width * 2 + height * 2;
                    break;
                }
                case CMD.Z: {
                    var dx = x0 - xi;
                    var dy = y0 - yi;
                    l = Math.sqrt(dx * dx + dy * dy);
                    xi = x0;
                    yi = y0;
                    break;
                }
            }
            if (l >= 0) {
                pathSegLen[segCount++] = l;
                pathTotalLen += l;
            }
        }
        this._pathLen = pathTotalLen;
        return pathTotalLen;
    };
    PathProxy.prototype.rebuildPath = function (ctx, percent) {
        var d = this.data;
        var ux = this._ux;
        var uy = this._uy;
        var len = this._len;
        var x0;
        var y0;
        var xi;
        var yi;
        var x;
        var y;
        var drawPart = percent < 1;
        var pathSegLen;
        var pathTotalLen;
        var accumLength = 0;
        var segCount = 0;
        var displayedLength;
        if (drawPart) {
            if (!this._pathSegLen) {
                this._calculateLength();
            }
            pathSegLen = this._pathSegLen;
            pathTotalLen = this._pathLen;
            displayedLength = percent * pathTotalLen;
            if (!displayedLength) {
                return;
            }
        }
        lo: for (var i = 0; i < len;) {
            var cmd = d[i++];
            var isFirst = i === 1;
            if (isFirst) {
                xi = d[i];
                yi = d[i + 1];
                x0 = xi;
                y0 = yi;
            }
            switch (cmd) {
                case CMD.M:
                    x0 = xi = d[i++];
                    y0 = yi = d[i++];
                    ctx.moveTo(xi, yi);
                    break;
                case CMD.L: {
                    x = d[i++];
                    y = d[i++];
                    if (mathAbs(x - xi) > ux || mathAbs(y - yi) > uy || i === len - 1) {
                        if (drawPart) {
                            var l = pathSegLen[segCount++];
                            if (accumLength + l > displayedLength) {
                                var t = (displayedLength - accumLength) / l;
                                ctx.lineTo(xi * (1 - t) + x * t, yi * (1 - t) + y * t);
                                break lo;
                            }
                            accumLength += l;
                        }
                        ctx.lineTo(x, y);
                        xi = x;
                        yi = y;
                    }
                    break;
                }
                case CMD.C: {
                    var x1 = d[i++];
                    var y1 = d[i++];
                    var x2 = d[i++];
                    var y2 = d[i++];
                    var x3 = d[i++];
                    var y3 = d[i++];
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            var t = (displayedLength - accumLength) / l;
                            (0,_curve__WEBPACK_IMPORTED_MODULE_1__.cubicSubdivide)(xi, x1, x2, x3, t, tmpOutX);
                            (0,_curve__WEBPACK_IMPORTED_MODULE_1__.cubicSubdivide)(yi, y1, y2, y3, t, tmpOutY);
                            ctx.bezierCurveTo(tmpOutX[1], tmpOutY[1], tmpOutX[2], tmpOutY[2], tmpOutX[3], tmpOutY[3]);
                            break lo;
                        }
                        accumLength += l;
                    }
                    ctx.bezierCurveTo(x1, y1, x2, y2, x3, y3);
                    xi = x3;
                    yi = y3;
                    break;
                }
                case CMD.Q: {
                    var x1 = d[i++];
                    var y1 = d[i++];
                    var x2 = d[i++];
                    var y2 = d[i++];
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            var t = (displayedLength - accumLength) / l;
                            (0,_curve__WEBPACK_IMPORTED_MODULE_1__.quadraticSubdivide)(xi, x1, x2, t, tmpOutX);
                            (0,_curve__WEBPACK_IMPORTED_MODULE_1__.quadraticSubdivide)(yi, y1, y2, t, tmpOutY);
                            ctx.quadraticCurveTo(tmpOutX[1], tmpOutY[1], tmpOutX[2], tmpOutY[2]);
                            break lo;
                        }
                        accumLength += l;
                    }
                    ctx.quadraticCurveTo(x1, y1, x2, y2);
                    xi = x2;
                    yi = y2;
                    break;
                }
                case CMD.A:
                    var cx = d[i++];
                    var cy = d[i++];
                    var rx = d[i++];
                    var ry = d[i++];
                    var startAngle = d[i++];
                    var delta = d[i++];
                    var psi = d[i++];
                    var anticlockwise = !d[i++];
                    var r = (rx > ry) ? rx : ry;
                    var scaleX = (rx > ry) ? 1 : rx / ry;
                    var scaleY = (rx > ry) ? ry / rx : 1;
                    var isEllipse = mathAbs(rx - ry) > 1e-3;
                    var endAngle = startAngle + delta;
                    var breakBuild = false;
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            endAngle = startAngle + delta * (displayedLength - accumLength) / l;
                            breakBuild = true;
                        }
                        accumLength += l;
                    }
                    if (isEllipse && ctx.ellipse) {
                        ctx.ellipse(cx, cy, rx, ry, psi, startAngle, endAngle, anticlockwise);
                    }
                    else {
                        ctx.arc(cx, cy, r, startAngle, endAngle, anticlockwise);
                    }
                    if (breakBuild) {
                        break lo;
                    }
                    if (isFirst) {
                        x0 = mathCos(startAngle) * rx + cx;
                        y0 = mathSin(startAngle) * ry + cy;
                    }
                    xi = mathCos(endAngle) * rx + cx;
                    yi = mathSin(endAngle) * ry + cy;
                    break;
                case CMD.R:
                    x0 = xi = d[i];
                    y0 = yi = d[i + 1];
                    x = d[i++];
                    y = d[i++];
                    var width = d[i++];
                    var height = d[i++];
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            var d_1 = displayedLength - accumLength;
                            ctx.moveTo(x, y);
                            ctx.lineTo(x + mathMin(d_1, width), y);
                            d_1 -= width;
                            if (d_1 > 0) {
                                ctx.lineTo(x + width, y + mathMin(d_1, height));
                            }
                            d_1 -= height;
                            if (d_1 > 0) {
                                ctx.lineTo(x + mathMax(width - d_1, 0), y + height);
                            }
                            d_1 -= width;
                            if (d_1 > 0) {
                                ctx.lineTo(x, y + mathMax(height - d_1, 0));
                            }
                            break lo;
                        }
                        accumLength += l;
                    }
                    ctx.rect(x, y, width, height);
                    break;
                case CMD.Z:
                    if (drawPart) {
                        var l = pathSegLen[segCount++];
                        if (accumLength + l > displayedLength) {
                            var t = (displayedLength - accumLength) / l;
                            ctx.lineTo(xi * (1 - t) + x0 * t, yi * (1 - t) + y0 * t);
                            break lo;
                        }
                        accumLength += l;
                    }
                    ctx.closePath();
                    xi = x0;
                    yi = y0;
            }
        }
    };
    PathProxy.CMD = CMD;
    PathProxy.initDefaultProps = (function () {
        var proto = PathProxy.prototype;
        proto._saveData = true;
        proto._needsDash = false;
        proto._dashOffset = 0;
        proto._dashIdx = 0;
        proto._dashSum = 0;
        proto._ux = 0;
        proto._uy = 0;
    })();
    return PathProxy;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PathProxy);


/***/ }),

/***/ "./node_modules/zrender/lib/core/Point.js":
/*!************************************************!*\
  !*** ./node_modules/zrender/lib/core/Point.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Point = (function () {
    function Point(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    Point.prototype.copy = function (other) {
        this.x = other.x;
        this.y = other.y;
        return this;
    };
    Point.prototype.clone = function () {
        return new Point(this.x, this.y);
    };
    Point.prototype.set = function (x, y) {
        this.x = x;
        this.y = y;
        return this;
    };
    Point.prototype.equal = function (other) {
        return other.x === this.x && other.y === this.y;
    };
    Point.prototype.add = function (other) {
        this.x += other.x;
        this.y += other.y;
        return this;
    };
    Point.prototype.scale = function (scalar) {
        this.x *= scalar;
        this.y *= scalar;
    };
    Point.prototype.scaleAndAdd = function (other, scalar) {
        this.x += other.x * scalar;
        this.y += other.y * scalar;
    };
    Point.prototype.sub = function (other) {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    };
    Point.prototype.dot = function (other) {
        return this.x * other.x + this.y * other.y;
    };
    Point.prototype.len = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };
    Point.prototype.lenSquare = function () {
        return this.x * this.x + this.y * this.y;
    };
    Point.prototype.normalize = function () {
        var len = this.len();
        this.x /= len;
        this.y /= len;
        return this;
    };
    Point.prototype.distance = function (other) {
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        return Math.sqrt(dx * dx + dy * dy);
    };
    Point.prototype.distanceSquare = function (other) {
        var dx = this.x - other.x;
        var dy = this.y - other.y;
        return dx * dx + dy * dy;
    };
    Point.prototype.negate = function () {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    };
    Point.prototype.transform = function (m) {
        if (!m) {
            return;
        }
        var x = this.x;
        var y = this.y;
        this.x = m[0] * x + m[2] * y + m[4];
        this.y = m[1] * x + m[3] * y + m[5];
        return this;
    };
    Point.prototype.toArray = function (out) {
        out[0] = this.x;
        out[1] = this.y;
        return out;
    };
    Point.prototype.fromArray = function (input) {
        this.x = input[0];
        this.y = input[1];
    };
    Point.set = function (p, x, y) {
        p.x = x;
        p.y = y;
    };
    Point.copy = function (p, p2) {
        p.x = p2.x;
        p.y = p2.y;
    };
    Point.len = function (p) {
        return Math.sqrt(p.x * p.x + p.y * p.y);
    };
    Point.lenSquare = function (p) {
        return p.x * p.x + p.y * p.y;
    };
    Point.dot = function (p0, p1) {
        return p0.x * p1.x + p0.y * p1.y;
    };
    Point.add = function (out, p0, p1) {
        out.x = p0.x + p1.x;
        out.y = p0.y + p1.y;
    };
    Point.sub = function (out, p0, p1) {
        out.x = p0.x - p1.x;
        out.y = p0.y - p1.y;
    };
    Point.scale = function (out, p0, scalar) {
        out.x = p0.x * scalar;
        out.y = p0.y * scalar;
    };
    Point.scaleAndAdd = function (out, p0, p1, scalar) {
        out.x = p0.x + p1.x * scalar;
        out.y = p0.y + p1.y * scalar;
    };
    Point.lerp = function (out, p0, p1, t) {
        var onet = 1 - t;
        out.x = onet * p0.x + t * p1.x;
        out.y = onet * p0.y + t * p1.y;
    };
    return Point;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Point);


/***/ }),

/***/ "./node_modules/zrender/lib/core/Transformable.js":
/*!********************************************************!*\
  !*** ./node_modules/zrender/lib/core/Transformable.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _matrix__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./matrix */ "./node_modules/zrender/lib/core/matrix.js");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./vector */ "./node_modules/zrender/lib/core/vector.js");


var mIdentity = _matrix__WEBPACK_IMPORTED_MODULE_0__.identity;
var EPSILON = 5e-5;
function isNotAroundZero(val) {
    return val > EPSILON || val < -EPSILON;
}
var scaleTmp = [];
var tmpTransform = [];
var originTransform = _matrix__WEBPACK_IMPORTED_MODULE_0__.create();
var abs = Math.abs;
var Transformable = (function () {
    function Transformable() {
    }
    Transformable.prototype.setPosition = function (arr) {
        this.x = arr[0];
        this.y = arr[1];
    };
    Transformable.prototype.setScale = function (arr) {
        this.scaleX = arr[0];
        this.scaleY = arr[1];
    };
    Transformable.prototype.setOrigin = function (arr) {
        this.originX = arr[0];
        this.originY = arr[1];
    };
    Transformable.prototype.needLocalTransform = function () {
        return isNotAroundZero(this.rotation)
            || isNotAroundZero(this.x)
            || isNotAroundZero(this.y)
            || isNotAroundZero(this.scaleX - 1)
            || isNotAroundZero(this.scaleY - 1);
    };
    Transformable.prototype.updateTransform = function () {
        var parent = this.parent;
        var parentHasTransform = parent && parent.transform;
        var needLocalTransform = this.needLocalTransform();
        var m = this.transform;
        if (!(needLocalTransform || parentHasTransform)) {
            m && mIdentity(m);
            return;
        }
        m = m || _matrix__WEBPACK_IMPORTED_MODULE_0__.create();
        if (needLocalTransform) {
            this.getLocalTransform(m);
        }
        else {
            mIdentity(m);
        }
        if (parentHasTransform) {
            if (needLocalTransform) {
                _matrix__WEBPACK_IMPORTED_MODULE_0__.mul(m, parent.transform, m);
            }
            else {
                _matrix__WEBPACK_IMPORTED_MODULE_0__.copy(m, parent.transform);
            }
        }
        this.transform = m;
        this._resolveGlobalScaleRatio(m);
    };
    Transformable.prototype._resolveGlobalScaleRatio = function (m) {
        var globalScaleRatio = this.globalScaleRatio;
        if (globalScaleRatio != null && globalScaleRatio !== 1) {
            this.getGlobalScale(scaleTmp);
            var relX = scaleTmp[0] < 0 ? -1 : 1;
            var relY = scaleTmp[1] < 0 ? -1 : 1;
            var sx = ((scaleTmp[0] - relX) * globalScaleRatio + relX) / scaleTmp[0] || 0;
            var sy = ((scaleTmp[1] - relY) * globalScaleRatio + relY) / scaleTmp[1] || 0;
            m[0] *= sx;
            m[1] *= sx;
            m[2] *= sy;
            m[3] *= sy;
        }
        this.invTransform = this.invTransform || _matrix__WEBPACK_IMPORTED_MODULE_0__.create();
        _matrix__WEBPACK_IMPORTED_MODULE_0__.invert(this.invTransform, m);
    };
    Transformable.prototype.getLocalTransform = function (m) {
        return Transformable.getLocalTransform(this, m);
    };
    Transformable.prototype.getComputedTransform = function () {
        var transformNode = this;
        var ancestors = [];
        while (transformNode) {
            ancestors.push(transformNode);
            transformNode = transformNode.parent;
        }
        while (transformNode = ancestors.pop()) {
            transformNode.updateTransform();
        }
        return this.transform;
    };
    Transformable.prototype.setLocalTransform = function (m) {
        if (!m) {
            return;
        }
        var sx = m[0] * m[0] + m[1] * m[1];
        var sy = m[2] * m[2] + m[3] * m[3];
        if (isNotAroundZero(sx - 1)) {
            sx = Math.sqrt(sx);
        }
        if (isNotAroundZero(sy - 1)) {
            sy = Math.sqrt(sy);
        }
        if (m[0] < 0) {
            sx = -sx;
        }
        if (m[3] < 0) {
            sy = -sy;
        }
        this.rotation = Math.atan2(-m[1] / sy, m[0] / sx);
        if (sx < 0 && sy < 0) {
            this.rotation += Math.PI;
            sx = -sx;
            sy = -sy;
        }
        this.x = m[4];
        this.y = m[5];
        this.scaleX = sx;
        this.scaleY = sy;
    };
    Transformable.prototype.decomposeTransform = function () {
        if (!this.transform) {
            return;
        }
        var parent = this.parent;
        var m = this.transform;
        if (parent && parent.transform) {
            _matrix__WEBPACK_IMPORTED_MODULE_0__.mul(tmpTransform, parent.invTransform, m);
            m = tmpTransform;
        }
        var ox = this.originX;
        var oy = this.originY;
        if (ox || oy) {
            originTransform[4] = ox;
            originTransform[5] = oy;
            _matrix__WEBPACK_IMPORTED_MODULE_0__.mul(tmpTransform, m, originTransform);
            tmpTransform[4] -= ox;
            tmpTransform[5] -= oy;
            m = tmpTransform;
        }
        this.setLocalTransform(m);
    };
    Transformable.prototype.getGlobalScale = function (out) {
        var m = this.transform;
        out = out || [];
        if (!m) {
            out[0] = 1;
            out[1] = 1;
            return out;
        }
        out[0] = Math.sqrt(m[0] * m[0] + m[1] * m[1]);
        out[1] = Math.sqrt(m[2] * m[2] + m[3] * m[3]);
        if (m[0] < 0) {
            out[0] = -out[0];
        }
        if (m[3] < 0) {
            out[1] = -out[1];
        }
        return out;
    };
    Transformable.prototype.transformCoordToLocal = function (x, y) {
        var v2 = [x, y];
        var invTransform = this.invTransform;
        if (invTransform) {
            _vector__WEBPACK_IMPORTED_MODULE_1__.applyTransform(v2, v2, invTransform);
        }
        return v2;
    };
    Transformable.prototype.transformCoordToGlobal = function (x, y) {
        var v2 = [x, y];
        var transform = this.transform;
        if (transform) {
            _vector__WEBPACK_IMPORTED_MODULE_1__.applyTransform(v2, v2, transform);
        }
        return v2;
    };
    Transformable.prototype.getLineScale = function () {
        var m = this.transform;
        return m && abs(m[0] - 1) > 1e-10 && abs(m[3] - 1) > 1e-10
            ? Math.sqrt(abs(m[0] * m[3] - m[2] * m[1]))
            : 1;
    };
    Transformable.getLocalTransform = function (target, m) {
        m = m || [];
        mIdentity(m);
        var ox = target.originX || 0;
        var oy = target.originY || 0;
        var sx = target.scaleX;
        var sy = target.scaleY;
        var rotation = target.rotation || 0;
        var x = target.x;
        var y = target.y;
        m[4] -= ox;
        m[5] -= oy;
        m[0] *= sx;
        m[1] *= sy;
        m[2] *= sx;
        m[3] *= sy;
        m[4] *= sx;
        m[5] *= sy;
        if (rotation) {
            _matrix__WEBPACK_IMPORTED_MODULE_0__.rotate(m, m, rotation);
        }
        m[4] += ox;
        m[5] += oy;
        m[4] += x;
        m[5] += y;
        return m;
    };
    Transformable.initDefaultProps = (function () {
        var proto = Transformable.prototype;
        proto.x = 0;
        proto.y = 0;
        proto.scaleX = 1;
        proto.scaleY = 1;
        proto.originX = 0;
        proto.originY = 0;
        proto.rotation = 0;
        proto.globalScaleRatio = 1;
    })();
    return Transformable;
}());
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Transformable);


/***/ }),

/***/ "./node_modules/zrender/lib/core/WeakMap.js":
/*!**************************************************!*\
  !*** ./node_modules/zrender/lib/core/WeakMap.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var wmUniqueIndex = Math.round(Math.random() * 9);
var WeakMap = (function () {
    function WeakMap() {
        this._id = '__ec_inner_' + wmUniqueIndex++;
    }
    WeakMap.prototype.get = function (key) {
        return this._guard(key)[this._id];
    };
    WeakMap.prototype.set = function (key, value) {
        var target = this._guard(key);
        if (typeof Object.defineProperty === 'function') {
            Object.defineProperty(target, this._id, {
                value: value,
                enumerable: false,
                configurable: true
            });
        }
        else {
            target[this._id] = value;
        }
        return this;
    };
    WeakMap.prototype["delete"] = function (key) {
        if (this.has(key)) {
            delete this._guard(key)[this._id];
            return true;
        }
        return false;
    };
    WeakMap.prototype.has = function (key) {
        return !!this._guard(key)[this._id];
    };
    WeakMap.prototype._guard = function (key) {
        if (key !== Object(key)) {
            throw TypeError('Value of WeakMap is not a non-null object.');
        }
        return key;
    };
    return WeakMap;
}());
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (WeakMap);


/***/ }),

/***/ "./node_modules/zrender/lib/core/bbox.js":
/*!***********************************************!*\
  !*** ./node_modules/zrender/lib/core/bbox.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromPoints": () => (/* binding */ fromPoints),
/* harmony export */   "fromLine": () => (/* binding */ fromLine),
/* harmony export */   "fromCubic": () => (/* binding */ fromCubic),
/* harmony export */   "fromQuadratic": () => (/* binding */ fromQuadratic),
/* harmony export */   "fromArc": () => (/* binding */ fromArc)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./node_modules/zrender/lib/core/vector.js");
/* harmony import */ var _curve__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./curve */ "./node_modules/zrender/lib/core/curve.js");


var mathMin = Math.min;
var mathMax = Math.max;
var mathSin = Math.sin;
var mathCos = Math.cos;
var PI2 = Math.PI * 2;
var start = _vector__WEBPACK_IMPORTED_MODULE_0__.create();
var end = _vector__WEBPACK_IMPORTED_MODULE_0__.create();
var extremity = _vector__WEBPACK_IMPORTED_MODULE_0__.create();
function fromPoints(points, min, max) {
    if (points.length === 0) {
        return;
    }
    var p = points[0];
    var left = p[0];
    var right = p[0];
    var top = p[1];
    var bottom = p[1];
    for (var i = 1; i < points.length; i++) {
        p = points[i];
        left = mathMin(left, p[0]);
        right = mathMax(right, p[0]);
        top = mathMin(top, p[1]);
        bottom = mathMax(bottom, p[1]);
    }
    min[0] = left;
    min[1] = top;
    max[0] = right;
    max[1] = bottom;
}
function fromLine(x0, y0, x1, y1, min, max) {
    min[0] = mathMin(x0, x1);
    min[1] = mathMin(y0, y1);
    max[0] = mathMax(x0, x1);
    max[1] = mathMax(y0, y1);
}
var xDim = [];
var yDim = [];
function fromCubic(x0, y0, x1, y1, x2, y2, x3, y3, min, max) {
    var cubicExtrema = _curve__WEBPACK_IMPORTED_MODULE_1__.cubicExtrema;
    var cubicAt = _curve__WEBPACK_IMPORTED_MODULE_1__.cubicAt;
    var n = cubicExtrema(x0, x1, x2, x3, xDim);
    min[0] = Infinity;
    min[1] = Infinity;
    max[0] = -Infinity;
    max[1] = -Infinity;
    for (var i = 0; i < n; i++) {
        var x = cubicAt(x0, x1, x2, x3, xDim[i]);
        min[0] = mathMin(x, min[0]);
        max[0] = mathMax(x, max[0]);
    }
    n = cubicExtrema(y0, y1, y2, y3, yDim);
    for (var i = 0; i < n; i++) {
        var y = cubicAt(y0, y1, y2, y3, yDim[i]);
        min[1] = mathMin(y, min[1]);
        max[1] = mathMax(y, max[1]);
    }
    min[0] = mathMin(x0, min[0]);
    max[0] = mathMax(x0, max[0]);
    min[0] = mathMin(x3, min[0]);
    max[0] = mathMax(x3, max[0]);
    min[1] = mathMin(y0, min[1]);
    max[1] = mathMax(y0, max[1]);
    min[1] = mathMin(y3, min[1]);
    max[1] = mathMax(y3, max[1]);
}
function fromQuadratic(x0, y0, x1, y1, x2, y2, min, max) {
    var quadraticExtremum = _curve__WEBPACK_IMPORTED_MODULE_1__.quadraticExtremum;
    var quadraticAt = _curve__WEBPACK_IMPORTED_MODULE_1__.quadraticAt;
    var tx = mathMax(mathMin(quadraticExtremum(x0, x1, x2), 1), 0);
    var ty = mathMax(mathMin(quadraticExtremum(y0, y1, y2), 1), 0);
    var x = quadraticAt(x0, x1, x2, tx);
    var y = quadraticAt(y0, y1, y2, ty);
    min[0] = mathMin(x0, x2, x);
    min[1] = mathMin(y0, y2, y);
    max[0] = mathMax(x0, x2, x);
    max[1] = mathMax(y0, y2, y);
}
function fromArc(x, y, rx, ry, startAngle, endAngle, anticlockwise, min, max) {
    var vec2Min = _vector__WEBPACK_IMPORTED_MODULE_0__.min;
    var vec2Max = _vector__WEBPACK_IMPORTED_MODULE_0__.max;
    var diff = Math.abs(startAngle - endAngle);
    if (diff % PI2 < 1e-4 && diff > 1e-4) {
        min[0] = x - rx;
        min[1] = y - ry;
        max[0] = x + rx;
        max[1] = y + ry;
        return;
    }
    start[0] = mathCos(startAngle) * rx + x;
    start[1] = mathSin(startAngle) * ry + y;
    end[0] = mathCos(endAngle) * rx + x;
    end[1] = mathSin(endAngle) * ry + y;
    vec2Min(min, start, end);
    vec2Max(max, start, end);
    startAngle = startAngle % (PI2);
    if (startAngle < 0) {
        startAngle = startAngle + PI2;
    }
    endAngle = endAngle % (PI2);
    if (endAngle < 0) {
        endAngle = endAngle + PI2;
    }
    if (startAngle > endAngle && !anticlockwise) {
        endAngle += PI2;
    }
    else if (startAngle < endAngle && anticlockwise) {
        startAngle += PI2;
    }
    if (anticlockwise) {
        var tmp = endAngle;
        endAngle = startAngle;
        startAngle = tmp;
    }
    for (var angle = 0; angle < endAngle; angle += Math.PI / 2) {
        if (angle > startAngle) {
            extremity[0] = mathCos(angle) * rx + x;
            extremity[1] = mathSin(angle) * ry + y;
            vec2Min(min, extremity, min);
            vec2Max(max, extremity, max);
        }
    }
}


/***/ }),

/***/ "./node_modules/zrender/lib/core/curve.js":
/*!************************************************!*\
  !*** ./node_modules/zrender/lib/core/curve.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cubicAt": () => (/* binding */ cubicAt),
/* harmony export */   "cubicDerivativeAt": () => (/* binding */ cubicDerivativeAt),
/* harmony export */   "cubicRootAt": () => (/* binding */ cubicRootAt),
/* harmony export */   "cubicExtrema": () => (/* binding */ cubicExtrema),
/* harmony export */   "cubicSubdivide": () => (/* binding */ cubicSubdivide),
/* harmony export */   "cubicProjectPoint": () => (/* binding */ cubicProjectPoint),
/* harmony export */   "cubicLength": () => (/* binding */ cubicLength),
/* harmony export */   "quadraticAt": () => (/* binding */ quadraticAt),
/* harmony export */   "quadraticDerivativeAt": () => (/* binding */ quadraticDerivativeAt),
/* harmony export */   "quadraticRootAt": () => (/* binding */ quadraticRootAt),
/* harmony export */   "quadraticExtremum": () => (/* binding */ quadraticExtremum),
/* harmony export */   "quadraticSubdivide": () => (/* binding */ quadraticSubdivide),
/* harmony export */   "quadraticProjectPoint": () => (/* binding */ quadraticProjectPoint),
/* harmony export */   "quadraticLength": () => (/* binding */ quadraticLength)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./node_modules/zrender/lib/core/vector.js");

var mathPow = Math.pow;
var mathSqrt = Math.sqrt;
var EPSILON = 1e-8;
var EPSILON_NUMERIC = 1e-4;
var THREE_SQRT = mathSqrt(3);
var ONE_THIRD = 1 / 3;
var _v0 = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.create)();
var _v1 = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.create)();
var _v2 = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.create)();
function isAroundZero(val) {
    return val > -EPSILON && val < EPSILON;
}
function isNotAroundZero(val) {
    return val > EPSILON || val < -EPSILON;
}
function cubicAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return onet * onet * (onet * p0 + 3 * t * p1)
        + t * t * (t * p3 + 3 * onet * p2);
}
function cubicDerivativeAt(p0, p1, p2, p3, t) {
    var onet = 1 - t;
    return 3 * (((p1 - p0) * onet + 2 * (p2 - p1) * t) * onet
        + (p3 - p2) * t * t);
}
function cubicRootAt(p0, p1, p2, p3, val, roots) {
    var a = p3 + 3 * (p1 - p2) - p0;
    var b = 3 * (p2 - p1 * 2 + p0);
    var c = 3 * (p1 - p0);
    var d = p0 - val;
    var A = b * b - 3 * a * c;
    var B = b * c - 9 * a * d;
    var C = c * c - 3 * b * d;
    var n = 0;
    if (isAroundZero(A) && isAroundZero(B)) {
        if (isAroundZero(b)) {
            roots[0] = 0;
        }
        else {
            var t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
    }
    else {
        var disc = B * B - 4 * A * C;
        if (isAroundZero(disc)) {
            var K = B / A;
            var t1 = -b / a + K;
            var t2 = -K / 2;
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
        }
        else if (disc > 0) {
            var discSqrt = mathSqrt(disc);
            var Y1 = A * b + 1.5 * a * (-B + discSqrt);
            var Y2 = A * b + 1.5 * a * (-B - discSqrt);
            if (Y1 < 0) {
                Y1 = -mathPow(-Y1, ONE_THIRD);
            }
            else {
                Y1 = mathPow(Y1, ONE_THIRD);
            }
            if (Y2 < 0) {
                Y2 = -mathPow(-Y2, ONE_THIRD);
            }
            else {
                Y2 = mathPow(Y2, ONE_THIRD);
            }
            var t1 = (-b - (Y1 + Y2)) / (3 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
        else {
            var T = (2 * A * b - 3 * a * B) / (2 * mathSqrt(A * A * A));
            var theta = Math.acos(T) / 3;
            var ASqrt = mathSqrt(A);
            var tmp = Math.cos(theta);
            var t1 = (-b - 2 * ASqrt * tmp) / (3 * a);
            var t2 = (-b + ASqrt * (tmp + THREE_SQRT * Math.sin(theta))) / (3 * a);
            var t3 = (-b + ASqrt * (tmp - THREE_SQRT * Math.sin(theta))) / (3 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
            if (t3 >= 0 && t3 <= 1) {
                roots[n++] = t3;
            }
        }
    }
    return n;
}
function cubicExtrema(p0, p1, p2, p3, extrema) {
    var b = 6 * p2 - 12 * p1 + 6 * p0;
    var a = 9 * p1 + 3 * p3 - 3 * p0 - 9 * p2;
    var c = 3 * p1 - 3 * p0;
    var n = 0;
    if (isAroundZero(a)) {
        if (isNotAroundZero(b)) {
            var t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                extrema[n++] = t1;
            }
        }
    }
    else {
        var disc = b * b - 4 * a * c;
        if (isAroundZero(disc)) {
            extrema[0] = -b / (2 * a);
        }
        else if (disc > 0) {
            var discSqrt = mathSqrt(disc);
            var t1 = (-b + discSqrt) / (2 * a);
            var t2 = (-b - discSqrt) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                extrema[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                extrema[n++] = t2;
            }
        }
    }
    return n;
}
function cubicSubdivide(p0, p1, p2, p3, t, out) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p23 = (p3 - p2) * t + p2;
    var p012 = (p12 - p01) * t + p01;
    var p123 = (p23 - p12) * t + p12;
    var p0123 = (p123 - p012) * t + p012;
    out[0] = p0;
    out[1] = p01;
    out[2] = p012;
    out[3] = p0123;
    out[4] = p0123;
    out[5] = p123;
    out[6] = p23;
    out[7] = p3;
}
function cubicProjectPoint(x0, y0, x1, y1, x2, y2, x3, y3, x, y, out) {
    var t;
    var interval = 0.005;
    var d = Infinity;
    var prev;
    var next;
    var d1;
    var d2;
    _v0[0] = x;
    _v0[1] = y;
    for (var _t = 0; _t < 1; _t += 0.05) {
        _v1[0] = cubicAt(x0, x1, x2, x3, _t);
        _v1[1] = cubicAt(y0, y1, y2, y3, _t);
        d1 = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v0, _v1);
        if (d1 < d) {
            t = _t;
            d = d1;
        }
    }
    d = Infinity;
    for (var i = 0; i < 32; i++) {
        if (interval < EPSILON_NUMERIC) {
            break;
        }
        prev = t - interval;
        next = t + interval;
        _v1[0] = cubicAt(x0, x1, x2, x3, prev);
        _v1[1] = cubicAt(y0, y1, y2, y3, prev);
        d1 = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v1, _v0);
        if (prev >= 0 && d1 < d) {
            t = prev;
            d = d1;
        }
        else {
            _v2[0] = cubicAt(x0, x1, x2, x3, next);
            _v2[1] = cubicAt(y0, y1, y2, y3, next);
            d2 = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v2, _v0);
            if (next <= 1 && d2 < d) {
                t = next;
                d = d2;
            }
            else {
                interval *= 0.5;
            }
        }
    }
    if (out) {
        out[0] = cubicAt(x0, x1, x2, x3, t);
        out[1] = cubicAt(y0, y1, y2, y3, t);
    }
    return mathSqrt(d);
}
function cubicLength(x0, y0, x1, y1, x2, y2, x3, y3, iteration) {
    var px = x0;
    var py = y0;
    var d = 0;
    var step = 1 / iteration;
    for (var i = 1; i <= iteration; i++) {
        var t = i * step;
        var x = cubicAt(x0, x1, x2, x3, t);
        var y = cubicAt(y0, y1, y2, y3, t);
        var dx = x - px;
        var dy = y - py;
        d += Math.sqrt(dx * dx + dy * dy);
        px = x;
        py = y;
    }
    return d;
}
function quadraticAt(p0, p1, p2, t) {
    var onet = 1 - t;
    return onet * (onet * p0 + 2 * t * p1) + t * t * p2;
}
function quadraticDerivativeAt(p0, p1, p2, t) {
    return 2 * ((1 - t) * (p1 - p0) + t * (p2 - p1));
}
function quadraticRootAt(p0, p1, p2, val, roots) {
    var a = p0 - 2 * p1 + p2;
    var b = 2 * (p1 - p0);
    var c = p0 - val;
    var n = 0;
    if (isAroundZero(a)) {
        if (isNotAroundZero(b)) {
            var t1 = -c / b;
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
    }
    else {
        var disc = b * b - 4 * a * c;
        if (isAroundZero(disc)) {
            var t1 = -b / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
        }
        else if (disc > 0) {
            var discSqrt = mathSqrt(disc);
            var t1 = (-b + discSqrt) / (2 * a);
            var t2 = (-b - discSqrt) / (2 * a);
            if (t1 >= 0 && t1 <= 1) {
                roots[n++] = t1;
            }
            if (t2 >= 0 && t2 <= 1) {
                roots[n++] = t2;
            }
        }
    }
    return n;
}
function quadraticExtremum(p0, p1, p2) {
    var divider = p0 + p2 - 2 * p1;
    if (divider === 0) {
        return 0.5;
    }
    else {
        return (p0 - p1) / divider;
    }
}
function quadraticSubdivide(p0, p1, p2, t, out) {
    var p01 = (p1 - p0) * t + p0;
    var p12 = (p2 - p1) * t + p1;
    var p012 = (p12 - p01) * t + p01;
    out[0] = p0;
    out[1] = p01;
    out[2] = p012;
    out[3] = p012;
    out[4] = p12;
    out[5] = p2;
}
function quadraticProjectPoint(x0, y0, x1, y1, x2, y2, x, y, out) {
    var t;
    var interval = 0.005;
    var d = Infinity;
    _v0[0] = x;
    _v0[1] = y;
    for (var _t = 0; _t < 1; _t += 0.05) {
        _v1[0] = quadraticAt(x0, x1, x2, _t);
        _v1[1] = quadraticAt(y0, y1, y2, _t);
        var d1 = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v0, _v1);
        if (d1 < d) {
            t = _t;
            d = d1;
        }
    }
    d = Infinity;
    for (var i = 0; i < 32; i++) {
        if (interval < EPSILON_NUMERIC) {
            break;
        }
        var prev = t - interval;
        var next = t + interval;
        _v1[0] = quadraticAt(x0, x1, x2, prev);
        _v1[1] = quadraticAt(y0, y1, y2, prev);
        var d1 = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v1, _v0);
        if (prev >= 0 && d1 < d) {
            t = prev;
            d = d1;
        }
        else {
            _v2[0] = quadraticAt(x0, x1, x2, next);
            _v2[1] = quadraticAt(y0, y1, y2, next);
            var d2 = (0,_vector__WEBPACK_IMPORTED_MODULE_0__.distSquare)(_v2, _v0);
            if (next <= 1 && d2 < d) {
                t = next;
                d = d2;
            }
            else {
                interval *= 0.5;
            }
        }
    }
    if (out) {
        out[0] = quadraticAt(x0, x1, x2, t);
        out[1] = quadraticAt(y0, y1, y2, t);
    }
    return mathSqrt(d);
}
function quadraticLength(x0, y0, x1, y1, x2, y2, iteration) {
    var px = x0;
    var py = y0;
    var d = 0;
    var step = 1 / iteration;
    for (var i = 1; i <= iteration; i++) {
        var t = i * step;
        var x = quadraticAt(x0, x1, x2, t);
        var y = quadraticAt(y0, y1, y2, t);
        var dx = x - px;
        var dy = y - py;
        d += Math.sqrt(dx * dx + dy * dy);
        px = x;
        py = y;
    }
    return d;
}


/***/ }),

/***/ "./node_modules/zrender/lib/core/env.js":
/*!**********************************************!*\
  !*** ./node_modules/zrender/lib/core/env.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var Browser = (function () {
    function Browser() {
        this.firefox = false;
        this.ie = false;
        this.edge = false;
        this.newEdge = false;
        this.weChat = false;
    }
    return Browser;
}());
var Env = (function () {
    function Env() {
        this.browser = new Browser();
        this.node = false;
        this.wxa = false;
        this.worker = false;
        this.canvasSupported = false;
        this.svgSupported = false;
        this.touchEventsSupported = false;
        this.pointerEventsSupported = false;
        this.domSupported = false;
    }
    return Env;
}());
var env = new Env();
if (typeof wx === 'object' && typeof wx.getSystemInfoSync === 'function') {
    env.wxa = true;
    env.canvasSupported = true;
    env.touchEventsSupported = true;
}
else if (typeof document === 'undefined' && typeof self !== 'undefined') {
    env.worker = true;
    env.canvasSupported = true;
}
else if (typeof navigator === 'undefined') {
    env.node = true;
    env.canvasSupported = true;
    env.svgSupported = true;
}
else {
    detect(navigator.userAgent, env);
}
function detect(ua, env) {
    var browser = env.browser;
    var firefox = ua.match(/Firefox\/([\d.]+)/);
    var ie = ua.match(/MSIE\s([\d.]+)/)
        || ua.match(/Trident\/.+?rv:(([\d.]+))/);
    var edge = ua.match(/Edge?\/([\d.]+)/);
    var weChat = (/micromessenger/i).test(ua);
    if (firefox) {
        browser.firefox = true;
        browser.version = firefox[1];
    }
    if (ie) {
        browser.ie = true;
        browser.version = ie[1];
    }
    if (edge) {
        browser.edge = true;
        browser.version = edge[1];
        browser.newEdge = +edge[1].split('.')[0] > 18;
    }
    if (weChat) {
        browser.weChat = true;
    }
    env.canvasSupported = !!document.createElement('canvas').getContext;
    env.svgSupported = typeof SVGRect !== 'undefined';
    env.touchEventsSupported = 'ontouchstart' in window && !browser.ie && !browser.edge;
    env.pointerEventsSupported = 'onpointerdown' in window
        && (browser.edge || (browser.ie && +browser.version >= 11));
    env.domSupported = typeof document !== 'undefined';
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (env);


/***/ }),

/***/ "./node_modules/zrender/lib/core/matrix.js":
/*!*************************************************!*\
  !*** ./node_modules/zrender/lib/core/matrix.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "identity": () => (/* binding */ identity),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "translate": () => (/* binding */ translate),
/* harmony export */   "rotate": () => (/* binding */ rotate),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "invert": () => (/* binding */ invert),
/* harmony export */   "clone": () => (/* binding */ clone)
/* harmony export */ });
function create() {
    return [1, 0, 0, 1, 0, 0];
}
function identity(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    out[4] = 0;
    out[5] = 0;
    return out;
}
function copy(out, m) {
    out[0] = m[0];
    out[1] = m[1];
    out[2] = m[2];
    out[3] = m[3];
    out[4] = m[4];
    out[5] = m[5];
    return out;
}
function mul(out, m1, m2) {
    var out0 = m1[0] * m2[0] + m1[2] * m2[1];
    var out1 = m1[1] * m2[0] + m1[3] * m2[1];
    var out2 = m1[0] * m2[2] + m1[2] * m2[3];
    var out3 = m1[1] * m2[2] + m1[3] * m2[3];
    var out4 = m1[0] * m2[4] + m1[2] * m2[5] + m1[4];
    var out5 = m1[1] * m2[4] + m1[3] * m2[5] + m1[5];
    out[0] = out0;
    out[1] = out1;
    out[2] = out2;
    out[3] = out3;
    out[4] = out4;
    out[5] = out5;
    return out;
}
function translate(out, a, v) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4] + v[0];
    out[5] = a[5] + v[1];
    return out;
}
function rotate(out, a, rad) {
    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];
    var st = Math.sin(rad);
    var ct = Math.cos(rad);
    out[0] = aa * ct + ab * st;
    out[1] = -aa * st + ab * ct;
    out[2] = ac * ct + ad * st;
    out[3] = -ac * st + ct * ad;
    out[4] = ct * atx + st * aty;
    out[5] = ct * aty - st * atx;
    return out;
}
function scale(out, a, v) {
    var vx = v[0];
    var vy = v[1];
    out[0] = a[0] * vx;
    out[1] = a[1] * vy;
    out[2] = a[2] * vx;
    out[3] = a[3] * vy;
    out[4] = a[4] * vx;
    out[5] = a[5] * vy;
    return out;
}
function invert(out, a) {
    var aa = a[0];
    var ac = a[2];
    var atx = a[4];
    var ab = a[1];
    var ad = a[3];
    var aty = a[5];
    var det = aa * ad - ab * ac;
    if (!det) {
        return null;
    }
    det = 1.0 / det;
    out[0] = ad * det;
    out[1] = -ab * det;
    out[2] = -ac * det;
    out[3] = aa * det;
    out[4] = (ac * aty - ad * atx) * det;
    out[5] = (ab * atx - aa * aty) * det;
    return out;
}
function clone(a) {
    var b = create();
    copy(b, a);
    return b;
}


/***/ }),

/***/ "./node_modules/zrender/lib/core/util.js":
/*!***********************************************!*\
  !*** ./node_modules/zrender/lib/core/util.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$override": () => (/* binding */ $override),
/* harmony export */   "guid": () => (/* binding */ guid),
/* harmony export */   "logError": () => (/* binding */ logError),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "mergeAll": () => (/* binding */ mergeAll),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "defaults": () => (/* binding */ defaults),
/* harmony export */   "createCanvas": () => (/* binding */ createCanvas),
/* harmony export */   "indexOf": () => (/* binding */ indexOf),
/* harmony export */   "inherits": () => (/* binding */ inherits),
/* harmony export */   "mixin": () => (/* binding */ mixin),
/* harmony export */   "isArrayLike": () => (/* binding */ isArrayLike),
/* harmony export */   "each": () => (/* binding */ each),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "filter": () => (/* binding */ filter),
/* harmony export */   "find": () => (/* binding */ find),
/* harmony export */   "keys": () => (/* binding */ keys),
/* harmony export */   "bind": () => (/* binding */ bind),
/* harmony export */   "curry": () => (/* binding */ curry),
/* harmony export */   "isArray": () => (/* binding */ isArray),
/* harmony export */   "isFunction": () => (/* binding */ isFunction),
/* harmony export */   "isString": () => (/* binding */ isString),
/* harmony export */   "isStringSafe": () => (/* binding */ isStringSafe),
/* harmony export */   "isNumber": () => (/* binding */ isNumber),
/* harmony export */   "isObject": () => (/* binding */ isObject),
/* harmony export */   "isBuiltInObject": () => (/* binding */ isBuiltInObject),
/* harmony export */   "isTypedArray": () => (/* binding */ isTypedArray),
/* harmony export */   "isDom": () => (/* binding */ isDom),
/* harmony export */   "isGradientObject": () => (/* binding */ isGradientObject),
/* harmony export */   "isPatternObject": () => (/* binding */ isPatternObject),
/* harmony export */   "isRegExp": () => (/* binding */ isRegExp),
/* harmony export */   "eqNaN": () => (/* binding */ eqNaN),
/* harmony export */   "retrieve": () => (/* binding */ retrieve),
/* harmony export */   "retrieve2": () => (/* binding */ retrieve2),
/* harmony export */   "retrieve3": () => (/* binding */ retrieve3),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "normalizeCssArray": () => (/* binding */ normalizeCssArray),
/* harmony export */   "assert": () => (/* binding */ assert),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "setAsPrimitive": () => (/* binding */ setAsPrimitive),
/* harmony export */   "isPrimitive": () => (/* binding */ isPrimitive),
/* harmony export */   "HashMap": () => (/* binding */ HashMap),
/* harmony export */   "createHashMap": () => (/* binding */ createHashMap),
/* harmony export */   "concatArray": () => (/* binding */ concatArray),
/* harmony export */   "createObject": () => (/* binding */ createObject),
/* harmony export */   "hasOwn": () => (/* binding */ hasOwn),
/* harmony export */   "noop": () => (/* binding */ noop)
/* harmony export */ });
var BUILTIN_OBJECT = {
    '[object Function]': true,
    '[object RegExp]': true,
    '[object Date]': true,
    '[object Error]': true,
    '[object CanvasGradient]': true,
    '[object CanvasPattern]': true,
    '[object Image]': true,
    '[object Canvas]': true
};
var TYPED_ARRAY = {
    '[object Int8Array]': true,
    '[object Uint8Array]': true,
    '[object Uint8ClampedArray]': true,
    '[object Int16Array]': true,
    '[object Uint16Array]': true,
    '[object Int32Array]': true,
    '[object Uint32Array]': true,
    '[object Float32Array]': true,
    '[object Float64Array]': true
};
var objToString = Object.prototype.toString;
var arrayProto = Array.prototype;
var nativeForEach = arrayProto.forEach;
var nativeFilter = arrayProto.filter;
var nativeSlice = arrayProto.slice;
var nativeMap = arrayProto.map;
var ctorFunction = function () { }.constructor;
var protoFunction = ctorFunction ? ctorFunction.prototype : null;
var methods = {};
function $override(name, fn) {
    methods[name] = fn;
}
var idStart = 0x0907;
function guid() {
    return idStart++;
}
function logError() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    if (typeof console !== 'undefined') {
        console.error.apply(console, args);
    }
}
function clone(source) {
    if (source == null || typeof source !== 'object') {
        return source;
    }
    var result = source;
    var typeStr = objToString.call(source);
    if (typeStr === '[object Array]') {
        if (!isPrimitive(source)) {
            result = [];
            for (var i = 0, len = source.length; i < len; i++) {
                result[i] = clone(source[i]);
            }
        }
    }
    else if (TYPED_ARRAY[typeStr]) {
        if (!isPrimitive(source)) {
            var Ctor = source.constructor;
            if (Ctor.from) {
                result = Ctor.from(source);
            }
            else {
                result = new Ctor(source.length);
                for (var i = 0, len = source.length; i < len; i++) {
                    result[i] = clone(source[i]);
                }
            }
        }
    }
    else if (!BUILTIN_OBJECT[typeStr] && !isPrimitive(source) && !isDom(source)) {
        result = {};
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                result[key] = clone(source[key]);
            }
        }
    }
    return result;
}
function merge(target, source, overwrite) {
    if (!isObject(source) || !isObject(target)) {
        return overwrite ? clone(source) : target;
    }
    for (var key in source) {
        if (source.hasOwnProperty(key)) {
            var targetProp = target[key];
            var sourceProp = source[key];
            if (isObject(sourceProp)
                && isObject(targetProp)
                && !isArray(sourceProp)
                && !isArray(targetProp)
                && !isDom(sourceProp)
                && !isDom(targetProp)
                && !isBuiltInObject(sourceProp)
                && !isBuiltInObject(targetProp)
                && !isPrimitive(sourceProp)
                && !isPrimitive(targetProp)) {
                merge(targetProp, sourceProp, overwrite);
            }
            else if (overwrite || !(key in target)) {
                target[key] = clone(source[key]);
            }
        }
    }
    return target;
}
function mergeAll(targetAndSources, overwrite) {
    var result = targetAndSources[0];
    for (var i = 1, len = targetAndSources.length; i < len; i++) {
        result = merge(result, targetAndSources[i], overwrite);
    }
    return result;
}
function extend(target, source) {
    if (Object.assign) {
        Object.assign(target, source);
    }
    else {
        for (var key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
    }
    return target;
}
function defaults(target, source, overlay) {
    var keysArr = keys(source);
    for (var i = 0; i < keysArr.length; i++) {
        var key = keysArr[i];
        if ((overlay ? source[key] != null : target[key] == null)) {
            target[key] = source[key];
        }
    }
    return target;
}
var createCanvas = function () {
    return methods.createCanvas();
};
methods.createCanvas = function () {
    return document.createElement('canvas');
};
function indexOf(array, value) {
    if (array) {
        if (array.indexOf) {
            return array.indexOf(value);
        }
        for (var i = 0, len = array.length; i < len; i++) {
            if (array[i] === value) {
                return i;
            }
        }
    }
    return -1;
}
function inherits(clazz, baseClazz) {
    var clazzPrototype = clazz.prototype;
    function F() { }
    F.prototype = baseClazz.prototype;
    clazz.prototype = new F();
    for (var prop in clazzPrototype) {
        if (clazzPrototype.hasOwnProperty(prop)) {
            clazz.prototype[prop] = clazzPrototype[prop];
        }
    }
    clazz.prototype.constructor = clazz;
    clazz.superClass = baseClazz;
}
function mixin(target, source, override) {
    target = 'prototype' in target ? target.prototype : target;
    source = 'prototype' in source ? source.prototype : source;
    if (Object.getOwnPropertyNames) {
        var keyList = Object.getOwnPropertyNames(source);
        for (var i = 0; i < keyList.length; i++) {
            var key = keyList[i];
            if (key !== 'constructor') {
                if ((override ? source[key] != null : target[key] == null)) {
                    target[key] = source[key];
                }
            }
        }
    }
    else {
        defaults(target, source, override);
    }
}
function isArrayLike(data) {
    if (!data) {
        return false;
    }
    if (typeof data === 'string') {
        return false;
    }
    return typeof data.length === 'number';
}
function each(arr, cb, context) {
    if (!(arr && cb)) {
        return;
    }
    if (arr.forEach && arr.forEach === nativeForEach) {
        arr.forEach(cb, context);
    }
    else if (arr.length === +arr.length) {
        for (var i = 0, len = arr.length; i < len; i++) {
            cb.call(context, arr[i], i, arr);
        }
    }
    else {
        for (var key in arr) {
            if (arr.hasOwnProperty(key)) {
                cb.call(context, arr[key], key, arr);
            }
        }
    }
}
function map(arr, cb, context) {
    if (!arr) {
        return [];
    }
    if (!cb) {
        return slice(arr);
    }
    if (arr.map && arr.map === nativeMap) {
        return arr.map(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            result.push(cb.call(context, arr[i], i, arr));
        }
        return result;
    }
}
function reduce(arr, cb, memo, context) {
    if (!(arr && cb)) {
        return;
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        memo = cb.call(context, memo, arr[i], i, arr);
    }
    return memo;
}
function filter(arr, cb, context) {
    if (!arr) {
        return [];
    }
    if (!cb) {
        return slice(arr);
    }
    if (arr.filter && arr.filter === nativeFilter) {
        return arr.filter(cb, context);
    }
    else {
        var result = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            if (cb.call(context, arr[i], i, arr)) {
                result.push(arr[i]);
            }
        }
        return result;
    }
}
function find(arr, cb, context) {
    if (!(arr && cb)) {
        return;
    }
    for (var i = 0, len = arr.length; i < len; i++) {
        if (cb.call(context, arr[i], i, arr)) {
            return arr[i];
        }
    }
}
function keys(obj) {
    if (!obj) {
        return [];
    }
    if (Object.keys) {
        return Object.keys(obj);
    }
    var keyList = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            keyList.push(key);
        }
    }
    return keyList;
}
function bindPolyfill(func, context) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        args[_i - 2] = arguments[_i];
    }
    return function () {
        return func.apply(context, args.concat(nativeSlice.call(arguments)));
    };
}
var bind = (protoFunction && isFunction(protoFunction.bind))
    ? protoFunction.call.bind(protoFunction.bind)
    : bindPolyfill;
function curry(func) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return function () {
        return func.apply(this, args.concat(nativeSlice.call(arguments)));
    };
}

function isArray(value) {
    if (Array.isArray) {
        return Array.isArray(value);
    }
    return objToString.call(value) === '[object Array]';
}
function isFunction(value) {
    return typeof value === 'function';
}
function isString(value) {
    return typeof value === 'string';
}
function isStringSafe(value) {
    return objToString.call(value) === '[object String]';
}
function isNumber(value) {
    return typeof value === 'number';
}
function isObject(value) {
    var type = typeof value;
    return type === 'function' || (!!value && type === 'object');
}
function isBuiltInObject(value) {
    return !!BUILTIN_OBJECT[objToString.call(value)];
}
function isTypedArray(value) {
    return !!TYPED_ARRAY[objToString.call(value)];
}
function isDom(value) {
    return typeof value === 'object'
        && typeof value.nodeType === 'number'
        && typeof value.ownerDocument === 'object';
}
function isGradientObject(value) {
    return value.colorStops != null;
}
function isPatternObject(value) {
    return value.image != null;
}
function isRegExp(value) {
    return objToString.call(value) === '[object RegExp]';
}
function eqNaN(value) {
    return value !== value;
}
function retrieve() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    for (var i = 0, len = args.length; i < len; i++) {
        if (args[i] != null) {
            return args[i];
        }
    }
}
function retrieve2(value0, value1) {
    return value0 != null
        ? value0
        : value1;
}
function retrieve3(value0, value1, value2) {
    return value0 != null
        ? value0
        : value1 != null
            ? value1
            : value2;
}
function slice(arr) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return nativeSlice.apply(arr, args);
}
function normalizeCssArray(val) {
    if (typeof (val) === 'number') {
        return [val, val, val, val];
    }
    var len = val.length;
    if (len === 2) {
        return [val[0], val[1], val[0], val[1]];
    }
    else if (len === 3) {
        return [val[0], val[1], val[2], val[1]];
    }
    return val;
}
function assert(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
}
function trim(str) {
    if (str == null) {
        return null;
    }
    else if (typeof str.trim === 'function') {
        return str.trim();
    }
    else {
        return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    }
}
var primitiveKey = '__ec_primitive__';
function setAsPrimitive(obj) {
    obj[primitiveKey] = true;
}
function isPrimitive(obj) {
    return obj[primitiveKey];
}
var HashMap = (function () {
    function HashMap(obj) {
        this.data = {};
        var isArr = isArray(obj);
        this.data = {};
        var thisMap = this;
        (obj instanceof HashMap)
            ? obj.each(visit)
            : (obj && each(obj, visit));
        function visit(value, key) {
            isArr ? thisMap.set(value, key) : thisMap.set(key, value);
        }
    }
    HashMap.prototype.get = function (key) {
        return this.data.hasOwnProperty(key) ? this.data[key] : null;
    };
    HashMap.prototype.set = function (key, value) {
        return (this.data[key] = value);
    };
    HashMap.prototype.each = function (cb, context) {
        for (var key in this.data) {
            if (this.data.hasOwnProperty(key)) {
                cb.call(context, this.data[key], key);
            }
        }
    };
    HashMap.prototype.keys = function () {
        return keys(this.data);
    };
    HashMap.prototype.removeKey = function (key) {
        delete this.data[key];
    };
    return HashMap;
}());

function createHashMap(obj) {
    return new HashMap(obj);
}
function concatArray(a, b) {
    var newArray = new a.constructor(a.length + b.length);
    for (var i = 0; i < a.length; i++) {
        newArray[i] = a[i];
    }
    var offset = a.length;
    for (var i = 0; i < b.length; i++) {
        newArray[i + offset] = b[i];
    }
    return newArray;
}
function createObject(proto, properties) {
    var obj;
    if (Object.create) {
        obj = Object.create(proto);
    }
    else {
        var StyleCtor = function () { };
        StyleCtor.prototype = proto;
        obj = new StyleCtor();
    }
    if (properties) {
        extend(obj, properties);
    }
    return obj;
}
function hasOwn(own, prop) {
    return own.hasOwnProperty(prop);
}
function noop() { }


/***/ }),

/***/ "./node_modules/zrender/lib/core/vector.js":
/*!*************************************************!*\
  !*** ./node_modules/zrender/lib/core/vector.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "clone": () => (/* binding */ clone),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "scaleAndAdd": () => (/* binding */ scaleAndAdd),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "len": () => (/* binding */ len),
/* harmony export */   "length": () => (/* binding */ length),
/* harmony export */   "lenSquare": () => (/* binding */ lenSquare),
/* harmony export */   "lengthSquare": () => (/* binding */ lengthSquare),
/* harmony export */   "mul": () => (/* binding */ mul),
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "dot": () => (/* binding */ dot),
/* harmony export */   "scale": () => (/* binding */ scale),
/* harmony export */   "normalize": () => (/* binding */ normalize),
/* harmony export */   "distance": () => (/* binding */ distance),
/* harmony export */   "dist": () => (/* binding */ dist),
/* harmony export */   "distanceSquare": () => (/* binding */ distanceSquare),
/* harmony export */   "distSquare": () => (/* binding */ distSquare),
/* harmony export */   "negate": () => (/* binding */ negate),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "applyTransform": () => (/* binding */ applyTransform),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "max": () => (/* binding */ max)
/* harmony export */ });
function create(x, y) {
    if (x == null) {
        x = 0;
    }
    if (y == null) {
        y = 0;
    }
    return [x, y];
}
function copy(out, v) {
    out[0] = v[0];
    out[1] = v[1];
    return out;
}
function clone(v) {
    return [v[0], v[1]];
}
function set(out, a, b) {
    out[0] = a;
    out[1] = b;
    return out;
}
function add(out, v1, v2) {
    out[0] = v1[0] + v2[0];
    out[1] = v1[1] + v2[1];
    return out;
}
function scaleAndAdd(out, v1, v2, a) {
    out[0] = v1[0] + v2[0] * a;
    out[1] = v1[1] + v2[1] * a;
    return out;
}
function sub(out, v1, v2) {
    out[0] = v1[0] - v2[0];
    out[1] = v1[1] - v2[1];
    return out;
}
function len(v) {
    return Math.sqrt(lenSquare(v));
}
var length = len;
function lenSquare(v) {
    return v[0] * v[0] + v[1] * v[1];
}
var lengthSquare = lenSquare;
function mul(out, v1, v2) {
    out[0] = v1[0] * v2[0];
    out[1] = v1[1] * v2[1];
    return out;
}
function div(out, v1, v2) {
    out[0] = v1[0] / v2[0];
    out[1] = v1[1] / v2[1];
    return out;
}
function dot(v1, v2) {
    return v1[0] * v2[0] + v1[1] * v2[1];
}
function scale(out, v, s) {
    out[0] = v[0] * s;
    out[1] = v[1] * s;
    return out;
}
function normalize(out, v) {
    var d = len(v);
    if (d === 0) {
        out[0] = 0;
        out[1] = 0;
    }
    else {
        out[0] = v[0] / d;
        out[1] = v[1] / d;
    }
    return out;
}
function distance(v1, v2) {
    return Math.sqrt((v1[0] - v2[0]) * (v1[0] - v2[0])
        + (v1[1] - v2[1]) * (v1[1] - v2[1]));
}
var dist = distance;
function distanceSquare(v1, v2) {
    return (v1[0] - v2[0]) * (v1[0] - v2[0])
        + (v1[1] - v2[1]) * (v1[1] - v2[1]);
}
var distSquare = distanceSquare;
function negate(out, v) {
    out[0] = -v[0];
    out[1] = -v[1];
    return out;
}
function lerp(out, v1, v2, t) {
    out[0] = v1[0] + t * (v2[0] - v1[0]);
    out[1] = v1[1] + t * (v2[1] - v1[1]);
    return out;
}
function applyTransform(out, v, m) {
    var x = v[0];
    var y = v[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
}
function min(out, v1, v2) {
    out[0] = Math.min(v1[0], v2[0]);
    out[1] = Math.min(v1[1], v2[1]);
    return out;
}
function max(out, v1, v2) {
    out[0] = Math.max(v1[0], v2[0]);
    out[1] = Math.max(v1[1], v2[1]);
    return out;
}


/***/ }),

/***/ "./node_modules/zrender/lib/graphic/Displayable.js":
/*!*********************************************************!*\
  !*** ./node_modules/zrender/lib/graphic/Displayable.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_COMMON_STYLE": () => (/* binding */ DEFAULT_COMMON_STYLE),
/* harmony export */   "DEFAULT_COMMON_ANIMATION_PROPS": () => (/* binding */ DEFAULT_COMMON_ANIMATION_PROPS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Element */ "./node_modules/zrender/lib/Element.js");
/* harmony import */ var _core_BoundingRect__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../core/BoundingRect */ "./node_modules/zrender/lib/core/BoundingRect.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");




var STYLE_MAGIC_KEY = '__zr_style_' + Math.round((Math.random() * 10));
var DEFAULT_COMMON_STYLE = {
    shadowBlur: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: '#000',
    opacity: 1,
    blend: 'source-over'
};
var DEFAULT_COMMON_ANIMATION_PROPS = {
    style: {
        shadowBlur: true,
        shadowOffsetX: true,
        shadowOffsetY: true,
        shadowColor: true,
        opacity: true
    }
};
DEFAULT_COMMON_STYLE[STYLE_MAGIC_KEY] = true;
var PRIMARY_STATES_KEYS = ['z', 'z2', 'invisible'];
var Displayable = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(Displayable, _super);
    function Displayable(props) {
        return _super.call(this, props) || this;
    }
    Displayable.prototype._init = function (props) {
        var keysArr = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.keys)(props);
        for (var i = 0; i < keysArr.length; i++) {
            var key = keysArr[i];
            if (key === 'style') {
                this.useStyle(props[key]);
            }
            else {
                _super.prototype.attrKV.call(this, key, props[key]);
            }
        }
        if (!this.style) {
            this.useStyle({});
        }
    };
    Displayable.prototype.beforeBrush = function () { };
    Displayable.prototype.afterBrush = function () { };
    Displayable.prototype.innerBeforeBrush = function () { };
    Displayable.prototype.innerAfterBrush = function () { };
    Displayable.prototype.shouldBePainted = function (viewWidth, viewHeight, considerClipPath, considerAncestors) {
        var m = this.transform;
        if (this.ignore
            || this.invisible
            || this.style.opacity === 0
            || (this.culling
                && isDisplayableCulled(this, viewWidth, viewHeight))
            || (m && !m[0] && !m[3])) {
            return false;
        }
        if (considerClipPath && this.__clipPaths) {
            for (var i = 0; i < this.__clipPaths.length; ++i) {
                if (this.__clipPaths[i].isZeroArea()) {
                    return false;
                }
            }
        }
        if (considerAncestors && this.parent) {
            var parent_1 = this.parent;
            while (parent_1) {
                if (parent_1.ignore) {
                    return false;
                }
                parent_1 = parent_1.parent;
            }
        }
        return true;
    };
    Displayable.prototype.contain = function (x, y) {
        return this.rectContain(x, y);
    };
    Displayable.prototype.traverse = function (cb, context) {
        cb.call(context, this);
    };
    Displayable.prototype.rectContain = function (x, y) {
        var coord = this.transformCoordToLocal(x, y);
        var rect = this.getBoundingRect();
        return rect.contain(coord[0], coord[1]);
    };
    Displayable.prototype.getPaintRect = function () {
        var rect = this._paintRect;
        if (!this._paintRect || this.__dirty) {
            var transform = this.transform;
            var elRect = this.getBoundingRect();
            var style = this.style;
            var shadowSize = style.shadowBlur || 0;
            var shadowOffsetX = style.shadowOffsetX || 0;
            var shadowOffsetY = style.shadowOffsetY || 0;
            rect = this._paintRect || (this._paintRect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_2__.default(0, 0, 0, 0));
            if (transform) {
                _core_BoundingRect__WEBPACK_IMPORTED_MODULE_2__.default.applyTransform(rect, elRect, transform);
            }
            else {
                rect.copy(elRect);
            }
            if (shadowSize || shadowOffsetX || shadowOffsetY) {
                rect.width += shadowSize * 2 + Math.abs(shadowOffsetX);
                rect.height += shadowSize * 2 + Math.abs(shadowOffsetY);
                rect.x = Math.min(rect.x, rect.x + shadowOffsetX - shadowSize);
                rect.y = Math.min(rect.y, rect.y + shadowOffsetY - shadowSize);
            }
            var tolerance = this.dirtyRectTolerance;
            if (!rect.isZero()) {
                rect.x = Math.floor(rect.x - tolerance);
                rect.y = Math.floor(rect.y - tolerance);
                rect.width = Math.ceil(rect.width + 1 + tolerance * 2);
                rect.height = Math.ceil(rect.height + 1 + tolerance * 2);
            }
        }
        return rect;
    };
    Displayable.prototype.setPrevPaintRect = function (paintRect) {
        if (paintRect) {
            this._prevPaintRect = this._prevPaintRect || new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_2__.default(0, 0, 0, 0);
            this._prevPaintRect.copy(paintRect);
        }
        else {
            this._prevPaintRect = null;
        }
    };
    Displayable.prototype.getPrevPaintRect = function () {
        return this._prevPaintRect;
    };
    Displayable.prototype.animateStyle = function (loop) {
        return this.animate('style', loop);
    };
    Displayable.prototype.updateDuringAnimation = function (targetKey) {
        if (targetKey === 'style') {
            this.dirtyStyle();
        }
        else {
            this.markRedraw();
        }
    };
    Displayable.prototype.attrKV = function (key, value) {
        if (key !== 'style') {
            _super.prototype.attrKV.call(this, key, value);
        }
        else {
            if (!this.style) {
                this.useStyle(value);
            }
            else {
                this.setStyle(value);
            }
        }
    };
    Displayable.prototype.setStyle = function (keyOrObj, value) {
        if (typeof keyOrObj === 'string') {
            this.style[keyOrObj] = value;
        }
        else {
            (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.extend)(this.style, keyOrObj);
        }
        this.dirtyStyle();
        return this;
    };
    Displayable.prototype.dirtyStyle = function () {
        this.markRedraw();
        this.__dirty |= Displayable.STYLE_CHANGED_BIT;
        if (this._rect) {
            this._rect = null;
        }
    };
    Displayable.prototype.dirty = function () {
        this.dirtyStyle();
    };
    Displayable.prototype.styleChanged = function () {
        return !!(this.__dirty & Displayable.STYLE_CHANGED_BIT);
    };
    Displayable.prototype.styleUpdated = function () {
        this.__dirty &= ~Displayable.STYLE_CHANGED_BIT;
    };
    Displayable.prototype.createStyle = function (obj) {
        return (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.createObject)(DEFAULT_COMMON_STYLE, obj);
    };
    Displayable.prototype.useStyle = function (obj) {
        if (!obj[STYLE_MAGIC_KEY]) {
            obj = this.createStyle(obj);
        }
        if (this.__inHover) {
            this.__hoverStyle = obj;
        }
        else {
            this.style = obj;
        }
        this.dirtyStyle();
    };
    Displayable.prototype.isStyleObject = function (obj) {
        return obj[STYLE_MAGIC_KEY];
    };
    Displayable.prototype._innerSaveToNormal = function (toState) {
        _super.prototype._innerSaveToNormal.call(this, toState);
        var normalState = this._normalState;
        if (toState.style && !normalState.style) {
            normalState.style = this._mergeStyle(this.createStyle(), this.style);
        }
        this._savePrimaryToNormal(toState, normalState, PRIMARY_STATES_KEYS);
    };
    Displayable.prototype._applyStateObj = function (stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
        _super.prototype._applyStateObj.call(this, stateName, state, normalState, keepCurrentStates, transition, animationCfg);
        var needsRestoreToNormal = !(state && keepCurrentStates);
        var targetStyle;
        if (state && state.style) {
            if (transition) {
                if (keepCurrentStates) {
                    targetStyle = state.style;
                }
                else {
                    targetStyle = this._mergeStyle(this.createStyle(), normalState.style);
                    this._mergeStyle(targetStyle, state.style);
                }
            }
            else {
                targetStyle = this._mergeStyle(this.createStyle(), keepCurrentStates ? this.style : normalState.style);
                this._mergeStyle(targetStyle, state.style);
            }
        }
        else if (needsRestoreToNormal) {
            targetStyle = normalState.style;
        }
        if (targetStyle) {
            if (transition) {
                var sourceStyle = this.style;
                this.style = this.createStyle(needsRestoreToNormal ? {} : sourceStyle);
                if (needsRestoreToNormal) {
                    var changedKeys = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.keys)(sourceStyle);
                    for (var i = 0; i < changedKeys.length; i++) {
                        var key = changedKeys[i];
                        if (key in targetStyle) {
                            targetStyle[key] = targetStyle[key];
                            this.style[key] = sourceStyle[key];
                        }
                    }
                }
                var targetKeys = (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.keys)(targetStyle);
                for (var i = 0; i < targetKeys.length; i++) {
                    var key = targetKeys[i];
                    this.style[key] = this.style[key];
                }
                this._transitionState(stateName, {
                    style: targetStyle
                }, animationCfg, this.getAnimationStyleProps());
            }
            else {
                this.useStyle(targetStyle);
            }
        }
        for (var i = 0; i < PRIMARY_STATES_KEYS.length; i++) {
            var key = PRIMARY_STATES_KEYS[i];
            if (state && state[key] != null) {
                this[key] = state[key];
            }
            else if (needsRestoreToNormal) {
                if (normalState[key] != null) {
                    this[key] = normalState[key];
                }
            }
        }
    };
    Displayable.prototype._mergeStates = function (states) {
        var mergedState = _super.prototype._mergeStates.call(this, states);
        var mergedStyle;
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (state.style) {
                mergedStyle = mergedStyle || {};
                this._mergeStyle(mergedStyle, state.style);
            }
        }
        if (mergedStyle) {
            mergedState.style = mergedStyle;
        }
        return mergedState;
    };
    Displayable.prototype._mergeStyle = function (targetStyle, sourceStyle) {
        (0,_core_util__WEBPACK_IMPORTED_MODULE_1__.extend)(targetStyle, sourceStyle);
        return targetStyle;
    };
    Displayable.prototype.getAnimationStyleProps = function () {
        return DEFAULT_COMMON_ANIMATION_PROPS;
    };
    Displayable.STYLE_CHANGED_BIT = 2;
    Displayable.initDefaultProps = (function () {
        var dispProto = Displayable.prototype;
        dispProto.type = 'displayable';
        dispProto.invisible = false;
        dispProto.z = 0;
        dispProto.z2 = 0;
        dispProto.zlevel = 0;
        dispProto.culling = false;
        dispProto.cursor = 'pointer';
        dispProto.rectHover = false;
        dispProto.incremental = false;
        dispProto._rect = null;
        dispProto.dirtyRectTolerance = 0;
        dispProto.__dirty = _Element__WEBPACK_IMPORTED_MODULE_3__.default.REDARAW_BIT | Displayable.STYLE_CHANGED_BIT;
    })();
    return Displayable;
}(_Element__WEBPACK_IMPORTED_MODULE_3__.default));
var tmpRect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_2__.default(0, 0, 0, 0);
var viewRect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_2__.default(0, 0, 0, 0);
function isDisplayableCulled(el, width, height) {
    tmpRect.copy(el.getBoundingRect());
    if (el.transform) {
        tmpRect.applyTransform(el.transform);
    }
    viewRect.width = width;
    viewRect.height = height;
    return !tmpRect.intersect(viewRect);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Displayable);


/***/ }),

/***/ "./node_modules/zrender/lib/graphic/Image.js":
/*!***************************************************!*\
  !*** ./node_modules/zrender/lib/graphic/Image.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_IMAGE_STYLE": () => (/* binding */ DEFAULT_IMAGE_STYLE),
/* harmony export */   "DEFAULT_IMAGE_ANIMATION_PROPS": () => (/* binding */ DEFAULT_IMAGE_ANIMATION_PROPS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Displayable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Displayable */ "./node_modules/zrender/lib/graphic/Displayable.js");
/* harmony import */ var _core_BoundingRect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../core/BoundingRect */ "./node_modules/zrender/lib/core/BoundingRect.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");




var DEFAULT_IMAGE_STYLE = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.defaults)({
    x: 0,
    y: 0
}, _Displayable__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_COMMON_STYLE);
var DEFAULT_IMAGE_ANIMATION_PROPS = {
    style: (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.defaults)({
        x: true,
        y: true,
        width: true,
        height: true,
        sx: true,
        sy: true,
        sWidth: true,
        sHeight: true
    }, _Displayable__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_COMMON_ANIMATION_PROPS.style)
};
function isImageLike(source) {
    return !!(source
        && typeof source !== 'string'
        && source.width && source.height);
}
var ZRImage = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(ZRImage, _super);
    function ZRImage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ZRImage.prototype.createStyle = function (obj) {
        return (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.createObject)(DEFAULT_IMAGE_STYLE, obj);
    };
    ZRImage.prototype._getSize = function (dim) {
        var style = this.style;
        var size = style[dim];
        if (size != null) {
            return size;
        }
        var imageSource = isImageLike(style.image)
            ? style.image : this.__image;
        if (!imageSource) {
            return 0;
        }
        var otherDim = dim === 'width' ? 'height' : 'width';
        var otherDimSize = style[otherDim];
        if (otherDimSize == null) {
            return imageSource[dim];
        }
        else {
            return imageSource[dim] / imageSource[otherDim] * otherDimSize;
        }
    };
    ZRImage.prototype.getWidth = function () {
        return this._getSize('width');
    };
    ZRImage.prototype.getHeight = function () {
        return this._getSize('height');
    };
    ZRImage.prototype.getAnimationStyleProps = function () {
        return DEFAULT_IMAGE_ANIMATION_PROPS;
    };
    ZRImage.prototype.getBoundingRect = function () {
        var style = this.style;
        if (!this._rect) {
            this._rect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_3__.default(style.x || 0, style.y || 0, this.getWidth(), this.getHeight());
        }
        return this._rect;
    };
    return ZRImage;
}(_Displayable__WEBPACK_IMPORTED_MODULE_1__.default));
ZRImage.prototype.type = 'image';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ZRImage);


/***/ }),

/***/ "./node_modules/zrender/lib/graphic/IncrementalDisplayable.js":
/*!********************************************************************!*\
  !*** ./node_modules/zrender/lib/graphic/IncrementalDisplayable.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Displayable__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Displayable */ "./node_modules/zrender/lib/graphic/Displayable.js");
/* harmony import */ var _core_BoundingRect__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../core/BoundingRect */ "./node_modules/zrender/lib/core/BoundingRect.js");



var m = [];
var IncrementalDisplayable = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__extends)(IncrementalDisplayable, _super);
    function IncrementalDisplayable() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.notClear = true;
        _this.incremental = true;
        _this._displayables = [];
        _this._temporaryDisplayables = [];
        _this._cursor = 0;
        return _this;
    }
    IncrementalDisplayable.prototype.traverse = function (cb, context) {
        cb.call(context, this);
    };
    IncrementalDisplayable.prototype.useStyle = function () {
        this.style = {};
    };
    IncrementalDisplayable.prototype.getCursor = function () {
        return this._cursor;
    };
    IncrementalDisplayable.prototype.innerAfterBrush = function () {
        this._cursor = this._displayables.length;
    };
    IncrementalDisplayable.prototype.clearDisplaybles = function () {
        this._displayables = [];
        this._temporaryDisplayables = [];
        this._cursor = 0;
        this.markRedraw();
        this.notClear = false;
    };
    IncrementalDisplayable.prototype.clearTemporalDisplayables = function () {
        this._temporaryDisplayables = [];
    };
    IncrementalDisplayable.prototype.addDisplayable = function (displayable, notPersistent) {
        if (notPersistent) {
            this._temporaryDisplayables.push(displayable);
        }
        else {
            this._displayables.push(displayable);
        }
        this.markRedraw();
    };
    IncrementalDisplayable.prototype.addDisplayables = function (displayables, notPersistent) {
        notPersistent = notPersistent || false;
        for (var i = 0; i < displayables.length; i++) {
            this.addDisplayable(displayables[i], notPersistent);
        }
    };
    IncrementalDisplayable.prototype.getDisplayables = function () {
        return this._displayables;
    };
    IncrementalDisplayable.prototype.getTemporalDisplayables = function () {
        return this._temporaryDisplayables;
    };
    IncrementalDisplayable.prototype.eachPendingDisplayable = function (cb) {
        for (var i = this._cursor; i < this._displayables.length; i++) {
            cb && cb(this._displayables[i]);
        }
        for (var i = 0; i < this._temporaryDisplayables.length; i++) {
            cb && cb(this._temporaryDisplayables[i]);
        }
    };
    IncrementalDisplayable.prototype.update = function () {
        this.updateTransform();
        for (var i = this._cursor; i < this._displayables.length; i++) {
            var displayable = this._displayables[i];
            displayable.parent = this;
            displayable.update();
            displayable.parent = null;
        }
        for (var i = 0; i < this._temporaryDisplayables.length; i++) {
            var displayable = this._temporaryDisplayables[i];
            displayable.parent = this;
            displayable.update();
            displayable.parent = null;
        }
    };
    IncrementalDisplayable.prototype.getBoundingRect = function () {
        if (!this._rect) {
            var rect = new _core_BoundingRect__WEBPACK_IMPORTED_MODULE_1__.default(Infinity, Infinity, -Infinity, -Infinity);
            for (var i = 0; i < this._displayables.length; i++) {
                var displayable = this._displayables[i];
                var childRect = displayable.getBoundingRect().clone();
                if (displayable.needLocalTransform()) {
                    childRect.applyTransform(displayable.getLocalTransform(m));
                }
                rect.union(childRect);
            }
            this._rect = rect;
        }
        return this._rect;
    };
    IncrementalDisplayable.prototype.contain = function (x, y) {
        var localPos = this.transformCoordToLocal(x, y);
        var rect = this.getBoundingRect();
        if (rect.contain(localPos[0], localPos[1])) {
            for (var i = 0; i < this._displayables.length; i++) {
                var displayable = this._displayables[i];
                if (displayable.contain(x, y)) {
                    return true;
                }
            }
        }
        return false;
    };
    return IncrementalDisplayable;
}(_Displayable__WEBPACK_IMPORTED_MODULE_2__.default));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (IncrementalDisplayable);


/***/ }),

/***/ "./node_modules/zrender/lib/graphic/Path.js":
/*!**************************************************!*\
  !*** ./node_modules/zrender/lib/graphic/Path.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_PATH_STYLE": () => (/* binding */ DEFAULT_PATH_STYLE),
/* harmony export */   "DEFAULT_PATH_ANIMATION_PROPS": () => (/* binding */ DEFAULT_PATH_ANIMATION_PROPS),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Displayable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Displayable */ "./node_modules/zrender/lib/graphic/Displayable.js");
/* harmony import */ var _Element__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Element */ "./node_modules/zrender/lib/Element.js");
/* harmony import */ var _core_PathProxy__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../core/PathProxy */ "./node_modules/zrender/lib/core/PathProxy.js");
/* harmony import */ var _contain_path__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../contain/path */ "./node_modules/zrender/lib/contain/path.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");
/* harmony import */ var _tool_color__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../tool/color */ "./node_modules/zrender/lib/tool/color.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config */ "./node_modules/zrender/lib/config.js");








var DEFAULT_PATH_STYLE = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.defaults)({
    fill: '#000',
    stroke: null,
    strokePercent: 1,
    fillOpacity: 1,
    strokeOpacity: 1,
    lineDashOffset: 0,
    lineWidth: 1,
    lineCap: 'butt',
    miterLimit: 10,
    strokeNoScale: false,
    strokeFirst: false
}, _Displayable__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_COMMON_STYLE);
var DEFAULT_PATH_ANIMATION_PROPS = {
    style: (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.defaults)({
        fill: true,
        stroke: true,
        strokePercent: true,
        fillOpacity: true,
        strokeOpacity: true,
        lineDashOffset: true,
        lineWidth: true,
        miterLimit: true
    }, _Displayable__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_COMMON_ANIMATION_PROPS.style)
};
var pathCopyParams = [
    'x', 'y', 'rotation', 'scaleX', 'scaleY', 'originX', 'originY', 'invisible',
    'culling', 'z', 'z2', 'zlevel', 'parent'
];
var Path = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(Path, _super);
    function Path(opts) {
        return _super.call(this, opts) || this;
    }
    Path.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        var style = this.style;
        if (style.decal) {
            var decalEl = this._decalEl
                = this._decalEl || new Path();
            if (decalEl.buildPath === Path.prototype.buildPath) {
                decalEl.buildPath = function (ctx) {
                    _this.buildPath(ctx, _this.shape);
                };
            }
            decalEl.silent = true;
            var decalElStyle = decalEl.style;
            for (var key in style) {
                if (decalElStyle[key] !== style[key]) {
                    decalElStyle[key] = style[key];
                }
            }
            decalElStyle.fill = style.fill ? style.decal : null;
            decalElStyle.decal = null;
            decalElStyle.shadowColor = null;
            style.strokeFirst && (decalElStyle.stroke = null);
            for (var i = 0; i < pathCopyParams.length; ++i) {
                decalEl[pathCopyParams[i]] = this[pathCopyParams[i]];
            }
            decalEl.__dirty |= _Element__WEBPACK_IMPORTED_MODULE_3__.default.REDARAW_BIT;
        }
        else if (this._decalEl) {
            this._decalEl = null;
        }
    };
    Path.prototype.getDecalElement = function () {
        return this._decalEl;
    };
    Path.prototype._init = function (props) {
        var keysArr = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.keys)(props);
        this.shape = this.getDefaultShape();
        var defaultStyle = this.getDefaultStyle();
        if (defaultStyle) {
            this.useStyle(defaultStyle);
        }
        for (var i = 0; i < keysArr.length; i++) {
            var key = keysArr[i];
            var value = props[key];
            if (key === 'style') {
                if (!this.style) {
                    this.useStyle(value);
                }
                else {
                    (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.extend)(this.style, value);
                }
            }
            else if (key === 'shape') {
                (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.extend)(this.shape, value);
            }
            else {
                _super.prototype.attrKV.call(this, key, value);
            }
        }
        if (!this.style) {
            this.useStyle({});
        }
    };
    Path.prototype.getDefaultStyle = function () {
        return null;
    };
    Path.prototype.getDefaultShape = function () {
        return {};
    };
    Path.prototype.canBeInsideText = function () {
        return this.hasFill();
    };
    Path.prototype.getInsideTextFill = function () {
        var pathFill = this.style.fill;
        if (pathFill !== 'none') {
            if ((0,_core_util__WEBPACK_IMPORTED_MODULE_0__.isString)(pathFill)) {
                var fillLum = (0,_tool_color__WEBPACK_IMPORTED_MODULE_4__.lum)(pathFill, 0);
                if (fillLum > 0.5) {
                    return _config__WEBPACK_IMPORTED_MODULE_5__.DARK_LABEL_COLOR;
                }
                else if (fillLum > 0.2) {
                    return _config__WEBPACK_IMPORTED_MODULE_5__.LIGHTER_LABEL_COLOR;
                }
                return _config__WEBPACK_IMPORTED_MODULE_5__.LIGHT_LABEL_COLOR;
            }
            else if (pathFill) {
                return _config__WEBPACK_IMPORTED_MODULE_5__.LIGHT_LABEL_COLOR;
            }
        }
        return _config__WEBPACK_IMPORTED_MODULE_5__.DARK_LABEL_COLOR;
    };
    Path.prototype.getInsideTextStroke = function (textFill) {
        var pathFill = this.style.fill;
        if ((0,_core_util__WEBPACK_IMPORTED_MODULE_0__.isString)(pathFill)) {
            var zr = this.__zr;
            var isDarkMode = !!(zr && zr.isDarkMode());
            var isDarkLabel = (0,_tool_color__WEBPACK_IMPORTED_MODULE_4__.lum)(textFill, 0) < _config__WEBPACK_IMPORTED_MODULE_5__.DARK_MODE_THRESHOLD;
            if (isDarkMode === isDarkLabel) {
                return pathFill;
            }
        }
    };
    Path.prototype.buildPath = function (ctx, shapeCfg, inBundle) { };
    Path.prototype.pathUpdated = function () {
        this.__dirty &= ~Path.SHAPE_CHANGED_BIT;
    };
    Path.prototype.createPathProxy = function () {
        this.path = new _core_PathProxy__WEBPACK_IMPORTED_MODULE_6__.default(false);
    };
    Path.prototype.hasStroke = function () {
        var style = this.style;
        var stroke = style.stroke;
        return !(stroke == null || stroke === 'none' || !(style.lineWidth > 0));
    };
    Path.prototype.hasFill = function () {
        var style = this.style;
        var fill = style.fill;
        return fill != null && fill !== 'none';
    };
    Path.prototype.getBoundingRect = function () {
        var rect = this._rect;
        var style = this.style;
        var needsUpdateRect = !rect;
        if (needsUpdateRect) {
            var firstInvoke = false;
            if (!this.path) {
                firstInvoke = true;
                this.createPathProxy();
            }
            var path = this.path;
            if (firstInvoke || (this.__dirty & Path.SHAPE_CHANGED_BIT)) {
                path.beginPath();
                this.buildPath(path, this.shape, false);
                this.pathUpdated();
            }
            rect = path.getBoundingRect();
        }
        this._rect = rect;
        if (this.hasStroke() && this.path && this.path.len() > 0) {
            var rectWithStroke = this._rectWithStroke || (this._rectWithStroke = rect.clone());
            if (this.__dirty || needsUpdateRect) {
                rectWithStroke.copy(rect);
                var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
                var w = style.lineWidth;
                if (!this.hasFill()) {
                    var strokeContainThreshold = this.strokeContainThreshold;
                    w = Math.max(w, strokeContainThreshold == null ? 4 : strokeContainThreshold);
                }
                if (lineScale > 1e-10) {
                    rectWithStroke.width += w / lineScale;
                    rectWithStroke.height += w / lineScale;
                    rectWithStroke.x -= w / lineScale / 2;
                    rectWithStroke.y -= w / lineScale / 2;
                }
            }
            return rectWithStroke;
        }
        return rect;
    };
    Path.prototype.contain = function (x, y) {
        var localPos = this.transformCoordToLocal(x, y);
        var rect = this.getBoundingRect();
        var style = this.style;
        x = localPos[0];
        y = localPos[1];
        if (rect.contain(x, y)) {
            var pathProxy = this.path;
            if (this.hasStroke()) {
                var lineWidth = style.lineWidth;
                var lineScale = style.strokeNoScale ? this.getLineScale() : 1;
                if (lineScale > 1e-10) {
                    if (!this.hasFill()) {
                        lineWidth = Math.max(lineWidth, this.strokeContainThreshold);
                    }
                    if (_contain_path__WEBPACK_IMPORTED_MODULE_7__.containStroke(pathProxy, lineWidth / lineScale, x, y)) {
                        return true;
                    }
                }
            }
            if (this.hasFill()) {
                return _contain_path__WEBPACK_IMPORTED_MODULE_7__.contain(pathProxy, x, y);
            }
        }
        return false;
    };
    Path.prototype.dirtyShape = function () {
        this.__dirty |= Path.SHAPE_CHANGED_BIT;
        if (this._rect) {
            this._rect = null;
        }
        if (this._decalEl) {
            this._decalEl.dirtyShape();
        }
        this.markRedraw();
    };
    Path.prototype.dirty = function () {
        this.dirtyStyle();
        this.dirtyShape();
    };
    Path.prototype.animateShape = function (loop) {
        return this.animate('shape', loop);
    };
    Path.prototype.updateDuringAnimation = function (targetKey) {
        if (targetKey === 'style') {
            this.dirtyStyle();
        }
        else if (targetKey === 'shape') {
            this.dirtyShape();
        }
        else {
            this.markRedraw();
        }
    };
    Path.prototype.attrKV = function (key, value) {
        if (key === 'shape') {
            this.setShape(value);
        }
        else {
            _super.prototype.attrKV.call(this, key, value);
        }
    };
    Path.prototype.setShape = function (keyOrObj, value) {
        var shape = this.shape;
        if (!shape) {
            shape = this.shape = {};
        }
        if (typeof keyOrObj === 'string') {
            shape[keyOrObj] = value;
        }
        else {
            (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.extend)(shape, keyOrObj);
        }
        this.dirtyShape();
        return this;
    };
    Path.prototype.shapeChanged = function () {
        return !!(this.__dirty & Path.SHAPE_CHANGED_BIT);
    };
    Path.prototype.createStyle = function (obj) {
        return (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.createObject)(DEFAULT_PATH_STYLE, obj);
    };
    Path.prototype._innerSaveToNormal = function (toState) {
        _super.prototype._innerSaveToNormal.call(this, toState);
        var normalState = this._normalState;
        if (toState.shape && !normalState.shape) {
            normalState.shape = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.extend)({}, this.shape);
        }
    };
    Path.prototype._applyStateObj = function (stateName, state, normalState, keepCurrentStates, transition, animationCfg) {
        _super.prototype._applyStateObj.call(this, stateName, state, normalState, keepCurrentStates, transition, animationCfg);
        var needsRestoreToNormal = !(state && keepCurrentStates);
        var targetShape;
        if (state && state.shape) {
            if (transition) {
                if (keepCurrentStates) {
                    targetShape = state.shape;
                }
                else {
                    targetShape = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.extend)({}, normalState.shape);
                    (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.extend)(targetShape, state.shape);
                }
            }
            else {
                targetShape = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.extend)({}, keepCurrentStates ? this.shape : normalState.shape);
                (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.extend)(targetShape, state.shape);
            }
        }
        else if (needsRestoreToNormal) {
            targetShape = normalState.shape;
        }
        if (targetShape) {
            if (transition) {
                this.shape = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.extend)({}, this.shape);
                var targetShapePrimaryProps = {};
                var shapeKeys = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.keys)(targetShape);
                for (var i = 0; i < shapeKeys.length; i++) {
                    var key = shapeKeys[i];
                    if (typeof targetShape[key] === 'object') {
                        this.shape[key] = targetShape[key];
                    }
                    else {
                        targetShapePrimaryProps[key] = targetShape[key];
                    }
                }
                this._transitionState(stateName, {
                    shape: targetShapePrimaryProps
                }, animationCfg);
            }
            else {
                this.shape = targetShape;
                this.dirtyShape();
            }
        }
    };
    Path.prototype._mergeStates = function (states) {
        var mergedState = _super.prototype._mergeStates.call(this, states);
        var mergedShape;
        for (var i = 0; i < states.length; i++) {
            var state = states[i];
            if (state.shape) {
                mergedShape = mergedShape || {};
                this._mergeStyle(mergedShape, state.shape);
            }
        }
        if (mergedShape) {
            mergedState.shape = mergedShape;
        }
        return mergedState;
    };
    Path.prototype.getAnimationStyleProps = function () {
        return DEFAULT_PATH_ANIMATION_PROPS;
    };
    Path.prototype.isZeroArea = function () {
        return false;
    };
    Path.extend = function (defaultProps) {
        var Sub = (function (_super) {
            (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__extends)(Sub, _super);
            function Sub(opts) {
                var _this = _super.call(this, opts) || this;
                defaultProps.init && defaultProps.init.call(_this, opts);
                return _this;
            }
            Sub.prototype.getDefaultStyle = function () {
                return (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.clone)(defaultProps.style);
            };
            Sub.prototype.getDefaultShape = function () {
                return (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.clone)(defaultProps.shape);
            };
            return Sub;
        }(Path));
        for (var key in defaultProps) {
            if (typeof defaultProps[key] === 'function') {
                Sub.prototype[key] = defaultProps[key];
            }
        }
        return Sub;
    };
    Path.SHAPE_CHANGED_BIT = 4;
    Path.initDefaultProps = (function () {
        var pathProto = Path.prototype;
        pathProto.type = 'path';
        pathProto.strokeContainThreshold = 5;
        pathProto.segmentIgnoreThreshold = 0;
        pathProto.subPixelOptimize = false;
        pathProto.autoBatch = false;
        pathProto.__dirty = _Element__WEBPACK_IMPORTED_MODULE_3__.default.REDARAW_BIT | _Displayable__WEBPACK_IMPORTED_MODULE_1__.default.STYLE_CHANGED_BIT | Path.SHAPE_CHANGED_BIT;
    })();
    return Path;
}(_Displayable__WEBPACK_IMPORTED_MODULE_1__.default));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Path);


/***/ }),

/***/ "./node_modules/zrender/lib/graphic/TSpan.js":
/*!***************************************************!*\
  !*** ./node_modules/zrender/lib/graphic/TSpan.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_TSPAN_STYLE": () => (/* binding */ DEFAULT_TSPAN_STYLE),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ "./node_modules/zrender/node_modules/tslib/tslib.es6.js");
/* harmony import */ var _Displayable__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Displayable */ "./node_modules/zrender/lib/graphic/Displayable.js");
/* harmony import */ var _contain_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../contain/text */ "./node_modules/zrender/lib/contain/text.js");
/* harmony import */ var _Path__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Path */ "./node_modules/zrender/lib/graphic/Path.js");
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/util */ "./node_modules/zrender/lib/core/util.js");





var DEFAULT_TSPAN_STYLE = (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.defaults)({
    strokeFirst: true,
    font: _contain_text__WEBPACK_IMPORTED_MODULE_1__.DEFAULT_FONT,
    x: 0,
    y: 0,
    textAlign: 'left',
    textBaseline: 'top',
    miterLimit: 2
}, _Path__WEBPACK_IMPORTED_MODULE_2__.DEFAULT_PATH_STYLE);
var TSpan = (function (_super) {
    (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__extends)(TSpan, _super);
    function TSpan() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TSpan.prototype.hasStroke = function () {
        var style = this.style;
        var stroke = style.stroke;
        return stroke != null && stroke !== 'none' && style.lineWidth > 0;
    };
    TSpan.prototype.hasFill = function () {
        var style = this.style;
        var fill = style.fill;
        return fill != null && fill !== 'none';
    };
    TSpan.prototype.createStyle = function (obj) {
        return (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.createObject)(DEFAULT_TSPAN_STYLE, obj);
    };
    TSpan.prototype.setBoundingRect = function (rect) {
        this._rect = rect;
    };
    TSpan.prototype.getBoundingRect = function () {
        var style = this.style;
        if (!this._rect) {
            var text = style.text;
            text != null ? (text += '') : (text = '');
            var rect = (0,_contain_text__WEBPACK_IMPORTED_MODULE_1__.getBoundingRect)(text, style.font, style.textAlign, style.textBaseline);
            rect.x += style.x || 0;
            rect.y += style.y || 0;
            if (this.hasStroke()) {
                var w = style.lineWidth;
                rect.x -= w / 2;
                rect.y -= w / 2;
                rect.width += w;
                rect.height += w;
            }
            this._rect = rect;
        }
        return this._rect;
    };
    TSpan.initDefaultProps = (function () {
        var tspanProto = TSpan.prototype;
        tspanProto.dirtyRectTolerance = 10;
    })();
    return TSpan;
}(_Displayable__WEBPACK_IMPORTED_MODULE_4__.default));
TSpan.prototype.type = 'tspan';
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TSpan);


/***/ }),

/***/ "./node_modules/zrender/lib/graphic/helper/dashStyle.js":
/*!**************************************************************!*\
  !*** ./node_modules/zrender/lib/graphic/helper/dashStyle.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "normalizeLineDash": () => (/* binding */ normalizeLineDash)
/* harmony export */ });
/* harmony import */ var _core_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/util */ "./node_modules/zrender/lib/core/util.js");

function normalizeLineDash(lineType, lineWidth) {
    if (!lineType || lineType === 'solid' || !(lineWidth > 0)) {
        return null;
    }
    lineWidth = lineWidth || 1;
    return lineType === 'dashed'
        ? [4 * lineWidth, 2 * lineWidth]
        : lineType === 'dotted'
            ? [lineWidth]
            : (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.isNumber)(lineType)
                ? [lineType] : (0,_core_util__WEBPACK_IMPORTED_MODULE_0__.isArray)(lineType) ? lineType : null;
}


/***/ }),

/***/ "./node_modules/zrender/lib/graphic/helper/image.js":
/*!**********************************************************!*\
  !*** ./node_modules/zrender/lib/graphic/helper/image.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findExistImage": () => (/* binding */ findExistImage),
/* harmony export */   "createOrUpdateImage": () => (/* binding */ createOrUpdateImage),
/* harmony export */   "isImageReady": () => (/* binding */ isImageReady)
/* harmony export */ });
/* harmony import */ var _core_LRU__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../core/LRU */ "./node_modules/zrender/lib/core/LRU.js");

var globalImageCache = new _core_LRU__WEBPACK_IMPORTED_MODULE_0__.default(50);
function findExistImage(newImageOrSrc) {
    if (typeof newImageOrSrc === 'string') {
        var cachedImgObj = globalImageCache.get(newImageOrSrc);
        return cachedImgObj && cachedImgObj.image;
    }
    else {
        return newImageOrSrc;
    }
}
function createOrUpdateImage(newImageOrSrc, image, hostEl, onload, cbPayload) {
    if (!newImageOrSrc) {
        return image;
    }
    else if (typeof newImageOrSrc === 'string') {
        if ((image && image.__zrImageSrc === newImageOrSrc) || !hostEl) {
            return image;
        }
        var cachedImgObj = globalImageCache.get(newImageOrSrc);
        var pendingWrap = { hostEl: hostEl, cb: onload, cbPayload: cbPayload };
        if (cachedImgObj) {
            image = cachedImgObj.image;
            !isImageReady(image) && cachedImgObj.pending.push(pendingWrap);
        }
        else {
            image = new Image();
            image.onload = image.onerror = imageOnLoad;
            globalImageCache.put(newImageOrSrc, image.__cachedImgObj = {
                image: image,
                pending: [pendingWrap]
            });
            image.src = image.__zrImageSrc = newImageOrSrc;
        }
        return image;
    }
    else {
        return newImageOrSrc;
    }
}
function imageOnLoad() {
    var cachedImgObj = this.__cachedImgObj;
    this.onload = this.onerror = this.__cachedImgObj = null;
    for (var i = 0; i < cachedImgObj.pending.length; i++) {
        var pendingWrap = cachedImgObj.pending[i];
        var cb = pendingWrap.cb;
        cb && cb(this, pendingWrap.cbPayload);
        pendingWrap.hostEl.dirty();
    }
    cachedImgObj.pending.length = 0;
}
function isImageReady(image) {
    return image && image.width && image.height;
}


/***/ }),

/***/ "./node_modules/zrender/lib/tool/color.js":
/*!************************************************!*\
  !*** ./node_modules/zrender/lib/tool/color.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "parse": () => (/* binding */ parse),
/* harmony export */   "lift": () => (/* binding */ lift),
/* harmony export */   "toHex": () => (/* binding */ toHex),
/* harmony export */   "fastLerp": () => (/* binding */ fastLerp),
/* harmony export */   "fastMapToColor": () => (/* binding */ fastMapToColor),
/* harmony export */   "lerp": () => (/* binding */ lerp),
/* harmony export */   "mapToColor": () => (/* binding */ mapToColor),
/* harmony export */   "modifyHSL": () => (/* binding */ modifyHSL),
/* harmony export */   "modifyAlpha": () => (/* binding */ modifyAlpha),
/* harmony export */   "stringify": () => (/* binding */ stringify),
/* harmony export */   "lum": () => (/* binding */ lum),
/* harmony export */   "random": () => (/* binding */ random)
/* harmony export */ });
/* harmony import */ var _core_LRU__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../core/LRU */ "./node_modules/zrender/lib/core/LRU.js");

var kCSSColorTable = {
    'transparent': [0, 0, 0, 0], 'aliceblue': [240, 248, 255, 1],
    'antiquewhite': [250, 235, 215, 1], 'aqua': [0, 255, 255, 1],
    'aquamarine': [127, 255, 212, 1], 'azure': [240, 255, 255, 1],
    'beige': [245, 245, 220, 1], 'bisque': [255, 228, 196, 1],
    'black': [0, 0, 0, 1], 'blanchedalmond': [255, 235, 205, 1],
    'blue': [0, 0, 255, 1], 'blueviolet': [138, 43, 226, 1],
    'brown': [165, 42, 42, 1], 'burlywood': [222, 184, 135, 1],
    'cadetblue': [95, 158, 160, 1], 'chartreuse': [127, 255, 0, 1],
    'chocolate': [210, 105, 30, 1], 'coral': [255, 127, 80, 1],
    'cornflowerblue': [100, 149, 237, 1], 'cornsilk': [255, 248, 220, 1],
    'crimson': [220, 20, 60, 1], 'cyan': [0, 255, 255, 1],
    'darkblue': [0, 0, 139, 1], 'darkcyan': [0, 139, 139, 1],
    'darkgoldenrod': [184, 134, 11, 1], 'darkgray': [169, 169, 169, 1],
    'darkgreen': [0, 100, 0, 1], 'darkgrey': [169, 169, 169, 1],
    'darkkhaki': [189, 183, 107, 1], 'darkmagenta': [139, 0, 139, 1],
    'darkolivegreen': [85, 107, 47, 1], 'darkorange': [255, 140, 0, 1],
    'darkorchid': [153, 50, 204, 1], 'darkred': [139, 0, 0, 1],
    'darksalmon': [233, 150, 122, 1], 'darkseagreen': [143, 188, 143, 1],
    'darkslateblue': [72, 61, 139, 1], 'darkslategray': [47, 79, 79, 1],
    'darkslategrey': [47, 79, 79, 1], 'darkturquoise': [0, 206, 209, 1],
    'darkviolet': [148, 0, 211, 1], 'deeppink': [255, 20, 147, 1],
    'deepskyblue': [0, 191, 255, 1], 'dimgray': [105, 105, 105, 1],
    'dimgrey': [105, 105, 105, 1], 'dodgerblue': [30, 144, 255, 1],
    'firebrick': [178, 34, 34, 1], 'floralwhite': [255, 250, 240, 1],
    'forestgreen': [34, 139, 34, 1], 'fuchsia': [255, 0, 255, 1],
    'gainsboro': [220, 220, 220, 1], 'ghostwhite': [248, 248, 255, 1],
    'gold': [255, 215, 0, 1], 'goldenrod': [218, 165, 32, 1],
    'gray': [128, 128, 128, 1], 'green': [0, 128, 0, 1],
    'greenyellow': [173, 255, 47, 1], 'grey': [128, 128, 128, 1],
    'honeydew': [240, 255, 240, 1], 'hotpink': [255, 105, 180, 1],
    'indianred': [205, 92, 92, 1], 'indigo': [75, 0, 130, 1],
    'ivory': [255, 255, 240, 1], 'khaki': [240, 230, 140, 1],
    'lavender': [230, 230, 250, 1], 'lavenderblush': [255, 240, 245, 1],
    'lawngreen': [124, 252, 0, 1], 'lemonchiffon': [255, 250, 205, 1],
    'lightblue': [173, 216, 230, 1], 'lightcoral': [240, 128, 128, 1],
    'lightcyan': [224, 255, 255, 1], 'lightgoldenrodyellow': [250, 250, 210, 1],
    'lightgray': [211, 211, 211, 1], 'lightgreen': [144, 238, 144, 1],
    'lightgrey': [211, 211, 211, 1], 'lightpink': [255, 182, 193, 1],
    'lightsalmon': [255, 160, 122, 1], 'lightseagreen': [32, 178, 170, 1],
    'lightskyblue': [135, 206, 250, 1], 'lightslategray': [119, 136, 153, 1],
    'lightslategrey': [119, 136, 153, 1], 'lightsteelblue': [176, 196, 222, 1],
    'lightyellow': [255, 255, 224, 1], 'lime': [0, 255, 0, 1],
    'limegreen': [50, 205, 50, 1], 'linen': [250, 240, 230, 1],
    'magenta': [255, 0, 255, 1], 'maroon': [128, 0, 0, 1],
    'mediumaquamarine': [102, 205, 170, 1], 'mediumblue': [0, 0, 205, 1],
    'mediumorchid': [186, 85, 211, 1], 'mediumpurple': [147, 112, 219, 1],
    'mediumseagreen': [60, 179, 113, 1], 'mediumslateblue': [123, 104, 238, 1],
    'mediumspringgreen': [0, 250, 154, 1], 'mediumturquoise': [72, 209, 204, 1],
    'mediumvioletred': [199, 21, 133, 1], 'midnightblue': [25, 25, 112, 1],
    'mintcream': [245, 255, 250, 1], 'mistyrose': [255, 228, 225, 1],
    'moccasin': [255, 228, 181, 1], 'navajowhite': [255, 222, 173, 1],
    'navy': [0, 0, 128, 1], 'oldlace': [253, 245, 230, 1],
    'olive': [128, 128, 0, 1], 'olivedrab': [107, 142, 35, 1],
    'orange': [255, 165, 0, 1], 'orangered': [255, 69, 0, 1],
    'orchid': [218, 112, 214, 1], 'palegoldenrod': [238, 232, 170, 1],
    'palegreen': [152, 251, 152, 1], 'paleturquoise': [175, 238, 238, 1],
    'palevioletred': [219, 112, 147, 1], 'papayawhip': [255, 239, 213, 1],
    'peachpuff': [255, 218, 185, 1], 'peru': [205, 133, 63, 1],
    'pink': [255, 192, 203, 1], 'plum': [221, 160, 221, 1],
    'powderblue': [176, 224, 230, 1], 'purple': [128, 0, 128, 1],
    'red': [255, 0, 0, 1], 'rosybrown': [188, 143, 143, 1],
    'royalblue': [65, 105, 225, 1], 'saddlebrown': [139, 69, 19, 1],
    'salmon': [250, 128, 114, 1], 'sandybrown': [244, 164, 96, 1],
    'seagreen': [46, 139, 87, 1], 'seashell': [255, 245, 238, 1],
    'sienna': [160, 82, 45, 1], 'silver': [192, 192, 192, 1],
    'skyblue': [135, 206, 235, 1], 'slateblue': [106, 90, 205, 1],
    'slategray': [112, 128, 144, 1], 'slategrey': [112, 128, 144, 1],
    'snow': [255, 250, 250, 1], 'springgreen': [0, 255, 127, 1],
    'steelblue': [70, 130, 180, 1], 'tan': [210, 180, 140, 1],
    'teal': [0, 128, 128, 1], 'thistle': [216, 191, 216, 1],
    'tomato': [255, 99, 71, 1], 'turquoise': [64, 224, 208, 1],
    'violet': [238, 130, 238, 1], 'wheat': [245, 222, 179, 1],
    'white': [255, 255, 255, 1], 'whitesmoke': [245, 245, 245, 1],
    'yellow': [255, 255, 0, 1], 'yellowgreen': [154, 205, 50, 1]
};
function clampCssByte(i) {
    i = Math.round(i);
    return i < 0 ? 0 : i > 255 ? 255 : i;
}
function clampCssAngle(i) {
    i = Math.round(i);
    return i < 0 ? 0 : i > 360 ? 360 : i;
}
function clampCssFloat(f) {
    return f < 0 ? 0 : f > 1 ? 1 : f;
}
function parseCssInt(val) {
    var str = val;
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssByte(parseFloat(str) / 100 * 255);
    }
    return clampCssByte(parseInt(str, 10));
}
function parseCssFloat(val) {
    var str = val;
    if (str.length && str.charAt(str.length - 1) === '%') {
        return clampCssFloat(parseFloat(str) / 100);
    }
    return clampCssFloat(parseFloat(str));
}
function cssHueToRgb(m1, m2, h) {
    if (h < 0) {
        h += 1;
    }
    else if (h > 1) {
        h -= 1;
    }
    if (h * 6 < 1) {
        return m1 + (m2 - m1) * h * 6;
    }
    if (h * 2 < 1) {
        return m2;
    }
    if (h * 3 < 2) {
        return m1 + (m2 - m1) * (2 / 3 - h) * 6;
    }
    return m1;
}
function lerpNumber(a, b, p) {
    return a + (b - a) * p;
}
function setRgba(out, r, g, b, a) {
    out[0] = r;
    out[1] = g;
    out[2] = b;
    out[3] = a;
    return out;
}
function copyRgba(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
}
var colorCache = new _core_LRU__WEBPACK_IMPORTED_MODULE_0__.default(20);
var lastRemovedArr = null;
function putToCache(colorStr, rgbaArr) {
    if (lastRemovedArr) {
        copyRgba(lastRemovedArr, rgbaArr);
    }
    lastRemovedArr = colorCache.put(colorStr, lastRemovedArr || (rgbaArr.slice()));
}
function parse(colorStr, rgbaArr) {
    if (!colorStr) {
        return;
    }
    rgbaArr = rgbaArr || [];
    var cached = colorCache.get(colorStr);
    if (cached) {
        return copyRgba(rgbaArr, cached);
    }
    colorStr = colorStr + '';
    var str = colorStr.replace(/ /g, '').toLowerCase();
    if (str in kCSSColorTable) {
        copyRgba(rgbaArr, kCSSColorTable[str]);
        putToCache(colorStr, rgbaArr);
        return rgbaArr;
    }
    var strLen = str.length;
    if (str.charAt(0) === '#') {
        if (strLen === 4 || strLen === 5) {
            var iv = parseInt(str.slice(1, 4), 16);
            if (!(iv >= 0 && iv <= 0xfff)) {
                setRgba(rgbaArr, 0, 0, 0, 1);
                return;
            }
            setRgba(rgbaArr, ((iv & 0xf00) >> 4) | ((iv & 0xf00) >> 8), (iv & 0xf0) | ((iv & 0xf0) >> 4), (iv & 0xf) | ((iv & 0xf) << 4), strLen === 5 ? parseInt(str.slice(4), 16) / 0xf : 1);
            putToCache(colorStr, rgbaArr);
            return rgbaArr;
        }
        else if (strLen === 7 || strLen === 9) {
            var iv = parseInt(str.slice(1, 7), 16);
            if (!(iv >= 0 && iv <= 0xffffff)) {
                setRgba(rgbaArr, 0, 0, 0, 1);
                return;
            }
            setRgba(rgbaArr, (iv & 0xff0000) >> 16, (iv & 0xff00) >> 8, iv & 0xff, strLen === 9 ? parseInt(str.slice(7), 16) / 0xff : 1);
            putToCache(colorStr, rgbaArr);
            return rgbaArr;
        }
        return;
    }
    var op = str.indexOf('(');
    var ep = str.indexOf(')');
    if (op !== -1 && ep + 1 === strLen) {
        var fname = str.substr(0, op);
        var params = str.substr(op + 1, ep - (op + 1)).split(',');
        var alpha = 1;
        switch (fname) {
            case 'rgba':
                if (params.length !== 4) {
                    return params.length === 3
                        ? setRgba(rgbaArr, +params[0], +params[1], +params[2], 1)
                        : setRgba(rgbaArr, 0, 0, 0, 1);
                }
                alpha = parseCssFloat(params.pop());
            case 'rgb':
                if (params.length !== 3) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                setRgba(rgbaArr, parseCssInt(params[0]), parseCssInt(params[1]), parseCssInt(params[2]), alpha);
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            case 'hsla':
                if (params.length !== 4) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                params[3] = parseCssFloat(params[3]);
                hsla2rgba(params, rgbaArr);
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            case 'hsl':
                if (params.length !== 3) {
                    setRgba(rgbaArr, 0, 0, 0, 1);
                    return;
                }
                hsla2rgba(params, rgbaArr);
                putToCache(colorStr, rgbaArr);
                return rgbaArr;
            default:
                return;
        }
    }
    setRgba(rgbaArr, 0, 0, 0, 1);
    return;
}
function hsla2rgba(hsla, rgba) {
    var h = (((parseFloat(hsla[0]) % 360) + 360) % 360) / 360;
    var s = parseCssFloat(hsla[1]);
    var l = parseCssFloat(hsla[2]);
    var m2 = l <= 0.5 ? l * (s + 1) : l + s - l * s;
    var m1 = l * 2 - m2;
    rgba = rgba || [];
    setRgba(rgba, clampCssByte(cssHueToRgb(m1, m2, h + 1 / 3) * 255), clampCssByte(cssHueToRgb(m1, m2, h) * 255), clampCssByte(cssHueToRgb(m1, m2, h - 1 / 3) * 255), 1);
    if (hsla.length === 4) {
        rgba[3] = hsla[3];
    }
    return rgba;
}
function rgba2hsla(rgba) {
    if (!rgba) {
        return;
    }
    var R = rgba[0] / 255;
    var G = rgba[1] / 255;
    var B = rgba[2] / 255;
    var vMin = Math.min(R, G, B);
    var vMax = Math.max(R, G, B);
    var delta = vMax - vMin;
    var L = (vMax + vMin) / 2;
    var H;
    var S;
    if (delta === 0) {
        H = 0;
        S = 0;
    }
    else {
        if (L < 0.5) {
            S = delta / (vMax + vMin);
        }
        else {
            S = delta / (2 - vMax - vMin);
        }
        var deltaR = (((vMax - R) / 6) + (delta / 2)) / delta;
        var deltaG = (((vMax - G) / 6) + (delta / 2)) / delta;
        var deltaB = (((vMax - B) / 6) + (delta / 2)) / delta;
        if (R === vMax) {
            H = deltaB - deltaG;
        }
        else if (G === vMax) {
            H = (1 / 3) + deltaR - deltaB;
        }
        else if (B === vMax) {
            H = (2 / 3) + deltaG - deltaR;
        }
        if (H < 0) {
            H += 1;
        }
        if (H > 1) {
            H -= 1;
        }
    }
    var hsla = [H * 360, S, L];
    if (rgba[3] != null) {
        hsla.push(rgba[3]);
    }
    return hsla;
}
function lift(color, level) {
    var colorArr = parse(color);
    if (colorArr) {
        for (var i = 0; i < 3; i++) {
            if (level < 0) {
                colorArr[i] = colorArr[i] * (1 - level) | 0;
            }
            else {
                colorArr[i] = ((255 - colorArr[i]) * level + colorArr[i]) | 0;
            }
            if (colorArr[i] > 255) {
                colorArr[i] = 255;
            }
            else if (colorArr[i] < 0) {
                colorArr[i] = 0;
            }
        }
        return stringify(colorArr, colorArr.length === 4 ? 'rgba' : 'rgb');
    }
}
function toHex(color) {
    var colorArr = parse(color);
    if (colorArr) {
        return ((1 << 24) + (colorArr[0] << 16) + (colorArr[1] << 8) + (+colorArr[2])).toString(16).slice(1);
    }
}
function fastLerp(normalizedValue, colors, out) {
    if (!(colors && colors.length)
        || !(normalizedValue >= 0 && normalizedValue <= 1)) {
        return;
    }
    out = out || [];
    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = colors[leftIndex];
    var rightColor = colors[rightIndex];
    var dv = value - leftIndex;
    out[0] = clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv));
    out[1] = clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv));
    out[2] = clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv));
    out[3] = clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv));
    return out;
}
var fastMapToColor = fastLerp;
function lerp(normalizedValue, colors, fullOutput) {
    if (!(colors && colors.length)
        || !(normalizedValue >= 0 && normalizedValue <= 1)) {
        return;
    }
    var value = normalizedValue * (colors.length - 1);
    var leftIndex = Math.floor(value);
    var rightIndex = Math.ceil(value);
    var leftColor = parse(colors[leftIndex]);
    var rightColor = parse(colors[rightIndex]);
    var dv = value - leftIndex;
    var color = stringify([
        clampCssByte(lerpNumber(leftColor[0], rightColor[0], dv)),
        clampCssByte(lerpNumber(leftColor[1], rightColor[1], dv)),
        clampCssByte(lerpNumber(leftColor[2], rightColor[2], dv)),
        clampCssFloat(lerpNumber(leftColor[3], rightColor[3], dv))
    ], 'rgba');
    return fullOutput
        ? {
            color: color,
            leftIndex: leftIndex,
            rightIndex: rightIndex,
            value: value
        }
        : color;
}
var mapToColor = lerp;
function modifyHSL(color, h, s, l) {
    var colorArr = parse(color);
    if (color) {
        colorArr = rgba2hsla(colorArr);
        h != null && (colorArr[0] = clampCssAngle(h));
        s != null && (colorArr[1] = parseCssFloat(s));
        l != null && (colorArr[2] = parseCssFloat(l));
        return stringify(hsla2rgba(colorArr), 'rgba');
    }
}
function modifyAlpha(color, alpha) {
    var colorArr = parse(color);
    if (colorArr && alpha != null) {
        colorArr[3] = clampCssFloat(alpha);
        return stringify(colorArr, 'rgba');
    }
}
function stringify(arrColor, type) {
    if (!arrColor || !arrColor.length) {
        return;
    }
    var colorStr = arrColor[0] + ',' + arrColor[1] + ',' + arrColor[2];
    if (type === 'rgba' || type === 'hsva' || type === 'hsla') {
        colorStr += ',' + arrColor[3];
    }
    return type + '(' + colorStr + ')';
}
function lum(color, backgroundLum) {
    var arr = parse(color);
    return arr
        ? (0.299 * arr[0] + 0.587 * arr[1] + 0.114 * arr[2]) * arr[3] / 255
            + (1 - arr[3]) * backgroundLum
        : 0;
}
function random() {
    var r = Math.round(Math.random() * 255);
    var g = Math.round(Math.random() * 255);
    var b = Math.round(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


/***/ }),

/***/ "./node_modules/zrender/node_modules/tslib/tslib.es6.js":
/*!**************************************************************!*\
  !*** ./node_modules/zrender/node_modules/tslib/tslib.es6.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "__extends": () => (/* binding */ __extends),
/* harmony export */   "__assign": () => (/* binding */ __assign),
/* harmony export */   "__rest": () => (/* binding */ __rest),
/* harmony export */   "__decorate": () => (/* binding */ __decorate),
/* harmony export */   "__param": () => (/* binding */ __param),
/* harmony export */   "__metadata": () => (/* binding */ __metadata),
/* harmony export */   "__awaiter": () => (/* binding */ __awaiter),
/* harmony export */   "__generator": () => (/* binding */ __generator),
/* harmony export */   "__createBinding": () => (/* binding */ __createBinding),
/* harmony export */   "__exportStar": () => (/* binding */ __exportStar),
/* harmony export */   "__values": () => (/* binding */ __values),
/* harmony export */   "__read": () => (/* binding */ __read),
/* harmony export */   "__spread": () => (/* binding */ __spread),
/* harmony export */   "__spreadArrays": () => (/* binding */ __spreadArrays),
/* harmony export */   "__await": () => (/* binding */ __await),
/* harmony export */   "__asyncGenerator": () => (/* binding */ __asyncGenerator),
/* harmony export */   "__asyncDelegator": () => (/* binding */ __asyncDelegator),
/* harmony export */   "__asyncValues": () => (/* binding */ __asyncValues),
/* harmony export */   "__makeTemplateObject": () => (/* binding */ __makeTemplateObject),
/* harmony export */   "__importStar": () => (/* binding */ __importStar),
/* harmony export */   "__importDefault": () => (/* binding */ __importDefault),
/* harmony export */   "__classPrivateFieldGet": () => (/* binding */ __classPrivateFieldGet),
/* harmony export */   "__classPrivateFieldSet": () => (/* binding */ __classPrivateFieldSet)
/* harmony export */ });
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    }
    return __assign.apply(this, arguments);
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};

var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, privateMap) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to get private field on non-instance");
    }
    return privateMap.get(receiver);
}

function __classPrivateFieldSet(receiver, privateMap, value) {
    if (!privateMap.has(receiver)) {
        throw new TypeError("attempted to set private field on non-instance");
    }
    privateMap.set(receiver, value);
    return value;
}


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL0VsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9hbmltYXRpb24vQW5pbWF0b3IuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9hbmltYXRpb24vQ2xpcC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL2FuaW1hdGlvbi9lYXNpbmcuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9hbmltYXRpb24vcmVxdWVzdEFuaW1hdGlvbkZyYW1lLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY2FudmFzL2dyYXBoaWMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jYW52YXMvaGVscGVyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY29uZmlnLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY29udGFpbi9hcmMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb250YWluL2N1YmljLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY29udGFpbi9saW5lLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY29udGFpbi9wYXRoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY29udGFpbi9xdWFkcmF0aWMuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb250YWluL3RleHQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb250YWluL3V0aWwuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb250YWluL3dpbmRpbmdMaW5lLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY29yZS9Cb3VuZGluZ1JlY3QuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb3JlL0V2ZW50ZnVsLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY29yZS9MUlUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb3JlL1BhdGhQcm94eS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL2NvcmUvUG9pbnQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb3JlL1RyYW5zZm9ybWFibGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb3JlL1dlYWtNYXAuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb3JlL2Jib3guanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb3JlL2N1cnZlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvY29yZS9lbnYuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9jb3JlL21hdHJpeC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL2NvcmUvdXRpbC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL2NvcmUvdmVjdG9yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvZ3JhcGhpYy9EaXNwbGF5YWJsZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3pyZW5kZXIvbGliL2dyYXBoaWMvSW1hZ2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9ncmFwaGljL0luY3JlbWVudGFsRGlzcGxheWFibGUuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9ncmFwaGljL1BhdGguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi9ncmFwaGljL1RTcGFuLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvZ3JhcGhpYy9oZWxwZXIvZGFzaFN0eWxlLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9saWIvZ3JhcGhpYy9oZWxwZXIvaW1hZ2UuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy96cmVuZGVyL2xpYi90b29sL2NvbG9yLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvenJlbmRlci9ub2RlX21vZHVsZXMvdHNsaWIvdHNsaWIuZXM2LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWlEO0FBQ1c7QUFDYjtBQUNSO0FBQzhCO0FBQzJDO0FB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDhDQUFXO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLG9EQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsZ0RBQUk7QUFDbEQ7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixT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LEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNB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Q3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLFFBQVEsRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDOUp4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNnQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNxQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxHQUFHLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM3R2M7QUFDUztBQUNVO0FBQ2lCO0FBQytCO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELHFEQUFHO0FBQzNELHdEQUF3RCxxREFBRztBQUMzRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixxQkFBcUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsU0FBUztBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQSwyQkFBMkIsMkJBQTJCO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixlQUFlO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUIsaUJBQWlCLCtDQUFPO0FBQ3hCLGtCQUFrQiwrQ0FBTztBQUN6QixpQkFBaUIsK0NBQU87QUFDeEIsa0JBQWtCLCtDQUFPO0FBQ3pCO0FBQ0E7QUFDQSxjQUFjLGFBQWE7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0IsK0NBQU87QUFDdkIsZ0JBQWdCLCtDQUFPO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGVBQWU7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLCtDQUFRO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGdEQUFTO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG9EQUFhO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLDhDQUFPO0FBQzNCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0IsK0NBQVE7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx3Q0FBUTtBQUNwQixZQUFZLHdDQUFRO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLGtEQUFZO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLFNBQVM7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG1EQUFXO0FBQ25DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix1REFBZTtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMkIsU0FBUztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLHNEQUFjO0FBQzFDLDRCQUE0QixzREFBYztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QiwwREFBa0I7QUFDOUMsNEJBQTRCLDBEQUFrQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7QUFDRCxpRUFBZSxTQUFTLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1d0J6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxpRUFBZSxLQUFLLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2hJYztBQUNBO0FBQ25DLGdCQUFnQiw2Q0FBZTtBQUMvQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsMkNBQWE7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiwyQ0FBYTtBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLHdDQUFVO0FBQzFCO0FBQ0E7QUFDQSxnQkFBZ0IseUNBQVc7QUFDM0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQWlELDJDQUFhO0FBQzlELFFBQVEsMkNBQWE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHdDQUFVO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSx3Q0FBVTtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksbURBQXFCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSxtREFBcUI7QUFDakM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJDQUFhO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQSxpRUFBZSxhQUFhLEVBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUMvTjdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELGlFQUFlLE9BQU8sRUFBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hDVTtBQUNBO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJDQUFXO0FBQ3ZCLFVBQVUsMkNBQVc7QUFDckIsZ0JBQWdCLDJDQUFXO0FBQ3BCO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLHVCQUF1QixnREFBa0I7QUFDekMsa0JBQWtCLDJDQUFhO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CLE9BQU87QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLDRCQUE0QixxREFBdUI7QUFDbkQsc0JBQXNCLCtDQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQLGtCQUFrQix3Q0FBUTtBQUMxQixrQkFBa0Isd0NBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLGtCQUFrQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUMzSDBFO0FBQzFFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsK0NBQVE7QUFDbEIsVUFBVSwrQ0FBUTtBQUNsQixVQUFVLCtDQUFRO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLEVBQUU7QUFDbEM7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBLG9CQUFvQix1QkFBdUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELFNBQVM7QUFDekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0RBQW9ELFNBQVM7QUFDN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtB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QTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNrQjtBQUNaO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsY0FBYztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ08saUJBQWlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNWVqQjtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ087QUFDQTtBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLDhDQUFHO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQSx1QkFBdUIsT0FBTztBQUM5QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ0E7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ087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QUU7QUFDNUkseUJBQXlCLDZCQUE2QixvQkFBb0IsZ0RBQWdELGdCQUFnQixFQUFFLEtBQUs7QUFDako7O0FBRU87QUFDUDtBQUNBO0FBQ0EsMkdBQTJHLHNGQUFzRixhQUFhLEVBQUU7QUFDaE4sc0JBQXNCLDhCQUE4QixnREFBZ0QsdURBQXVELEVBQUUsRUFBRSxHQUFHO0FBQ2xLLDRDQUE0QyxzQ0FBc0MsVUFBVSxvQkFBb0IsRUFBRSxFQUFFLFVBQVU7QUFDOUg7O0FBRU87QUFDUCxnQ0FBZ0MsdUNBQXVDLGFBQWEsRUFBRSxFQUFFLE9BQU8sa0JBQWtCO0FBQ2pIO0FBQ0E7O0FBRUE7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLENBQUM7QUFDRDtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1AsNENBQTRDO0FBQzVDOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJkYXNoYm9hcmQvanMvZGFzaGJvYXJkYmY5ZjBiZGUxOTgyYTUzZmQ0NDEuYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFRyYW5zZm9ybWFibGUgZnJvbSAnLi9jb3JlL1RyYW5zZm9ybWFibGUnO1xuaW1wb3J0IEFuaW1hdG9yLCB7IGNsb25lVmFsdWUgfSBmcm9tICcuL2FuaW1hdGlvbi9BbmltYXRvcic7XG5pbXBvcnQgQm91bmRpbmdSZWN0IGZyb20gJy4vY29yZS9Cb3VuZGluZ1JlY3QnO1xuaW1wb3J0IEV2ZW50ZnVsIGZyb20gJy4vY29yZS9FdmVudGZ1bCc7XG5pbXBvcnQgeyBjYWxjdWxhdGVUZXh0UG9zaXRpb24sIHBhcnNlUGVyY2VudCB9IGZyb20gJy4vY29udGFpbi90ZXh0JztcbmltcG9ydCB7IGd1aWQsIGlzT2JqZWN0LCBrZXlzLCBleHRlbmQsIGluZGV4T2YsIGxvZ0Vycm9yLCBtaXhpbiwgaXNBcnJheUxpa2UsIGlzVHlwZWRBcnJheSB9IGZyb20gJy4vY29yZS91dGlsJztcbmltcG9ydCB7IExJR0hUX0xBQkVMX0NPTE9SLCBEQVJLX0xBQkVMX0NPTE9SIH0gZnJvbSAnLi9jb25maWcnO1xuaW1wb3J0IHsgcGFyc2UsIHN0cmluZ2lmeSB9IGZyb20gJy4vdG9vbC9jb2xvcic7XG5pbXBvcnQgZW52IGZyb20gJy4vY29yZS9lbnYnO1xuZXhwb3J0IHZhciBQUkVTRVJWRURfTk9STUFMX1NUQVRFID0gJ19fenJfbm9ybWFsX18nO1xudmFyIFBSSU1BUllfU1RBVEVTX0tFWVMgPSBbJ3gnLCAneScsICdzY2FsZVgnLCAnc2NhbGVZJywgJ29yaWdpblgnLCAnb3JpZ2luWScsICdyb3RhdGlvbicsICdpZ25vcmUnXTtcbnZhciBERUZBVUxUX0FOSU1BVEFCTEVfTUFQID0ge1xuICAgIHg6IHRydWUsXG4gICAgeTogdHJ1ZSxcbiAgICBzY2FsZVg6IHRydWUsXG4gICAgc2NhbGVZOiB0cnVlLFxuICAgIG9yaWdpblg6IHRydWUsXG4gICAgb3JpZ2luWTogdHJ1ZSxcbiAgICByb3RhdGlvbjogdHJ1ZSxcbiAgICBpZ25vcmU6IGZhbHNlXG59O1xudmFyIHRtcFRleHRQb3NDYWxjUmVzID0ge307XG52YXIgdG1wQm91bmRpbmdSZWN0ID0gbmV3IEJvdW5kaW5nUmVjdCgwLCAwLCAwLCAwKTtcbnZhciBFbGVtZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFbGVtZW50KHByb3BzKSB7XG4gICAgICAgIHRoaXMuaWQgPSBndWlkKCk7XG4gICAgICAgIHRoaXMuYW5pbWF0b3JzID0gW107XG4gICAgICAgIHRoaXMuY3VycmVudFN0YXRlcyA9IFtdO1xuICAgICAgICB0aGlzLnN0YXRlcyA9IHt9O1xuICAgICAgICB0aGlzLl9pbml0KHByb3BzKTtcbiAgICB9XG4gICAgRWxlbWVudC5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgdGhpcy5hdHRyKHByb3BzKTtcbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmRyaWZ0ID0gZnVuY3Rpb24gKGR4LCBkeSwgZSkge1xuICAgICAgICBzd2l0Y2ggKHRoaXMuZHJhZ2dhYmxlKSB7XG4gICAgICAgICAgICBjYXNlICdob3Jpem9udGFsJzpcbiAgICAgICAgICAgICAgICBkeSA9IDA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICd2ZXJ0aWNhbCc6XG4gICAgICAgICAgICAgICAgZHggPSAwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIHZhciBtID0gdGhpcy50cmFuc2Zvcm07XG4gICAgICAgIGlmICghbSkge1xuICAgICAgICAgICAgbSA9IHRoaXMudHJhbnNmb3JtID0gWzEsIDAsIDAsIDEsIDAsIDBdO1xuICAgICAgICB9XG4gICAgICAgIG1bNF0gKz0gZHg7XG4gICAgICAgIG1bNV0gKz0gZHk7XG4gICAgICAgIHRoaXMuZGVjb21wb3NlVHJhbnNmb3JtKCk7XG4gICAgICAgIHRoaXMubWFya1JlZHJhdygpO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuYmVmb3JlVXBkYXRlID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmFmdGVyVXBkYXRlID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVUcmFuc2Zvcm0oKTtcbiAgICAgICAgaWYgKHRoaXMuX19kaXJ0eSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVJbm5lclRleHQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUudXBkYXRlSW5uZXJUZXh0ID0gZnVuY3Rpb24gKGZvcmNlVXBkYXRlKSB7XG4gICAgICAgIHZhciB0ZXh0RWwgPSB0aGlzLl90ZXh0Q29udGVudDtcbiAgICAgICAgaWYgKHRleHRFbCAmJiAoIXRleHRFbC5pZ25vcmUgfHwgZm9yY2VVcGRhdGUpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMudGV4dENvbmZpZykge1xuICAgICAgICAgICAgICAgIHRoaXMudGV4dENvbmZpZyA9IHt9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRleHRDb25maWcgPSB0aGlzLnRleHRDb25maWc7XG4gICAgICAgICAgICB2YXIgaXNMb2NhbCA9IHRleHRDb25maWcubG9jYWw7XG4gICAgICAgICAgICB2YXIgYXR0YWNoZWRUcmFuc2Zvcm0gPSB0ZXh0RWwuYXR0YWNoZWRUcmFuc2Zvcm07XG4gICAgICAgICAgICB2YXIgdGV4dEFsaWduID0gdm9pZCAwO1xuICAgICAgICAgICAgdmFyIHRleHRWZXJ0aWNhbEFsaWduID0gdm9pZCAwO1xuICAgICAgICAgICAgdmFyIHRleHRTdHlsZUNoYW5nZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmIChpc0xvY2FsKSB7XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRUcmFuc2Zvcm0ucGFyZW50ID0gdGhpcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLnBhcmVudCA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5uZXJPcmlnaW4gPSBmYWxzZTtcbiAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLnggPSB0ZXh0RWwueDtcbiAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLnkgPSB0ZXh0RWwueTtcbiAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLm9yaWdpblggPSB0ZXh0RWwub3JpZ2luWDtcbiAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLm9yaWdpblkgPSB0ZXh0RWwub3JpZ2luWTtcbiAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLnJvdGF0aW9uID0gdGV4dEVsLnJvdGF0aW9uO1xuICAgICAgICAgICAgYXR0YWNoZWRUcmFuc2Zvcm0uc2NhbGVYID0gdGV4dEVsLnNjYWxlWDtcbiAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLnNjYWxlWSA9IHRleHRFbC5zY2FsZVk7XG4gICAgICAgICAgICBpZiAodGV4dENvbmZpZy5wb3NpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxheW91dFJlY3QgPSB0bXBCb3VuZGluZ1JlY3Q7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRDb25maWcubGF5b3V0UmVjdCkge1xuICAgICAgICAgICAgICAgICAgICBsYXlvdXRSZWN0LmNvcHkodGV4dENvbmZpZy5sYXlvdXRSZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGxheW91dFJlY3QuY29weSh0aGlzLmdldEJvdW5kaW5nUmVjdCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFpc0xvY2FsKSB7XG4gICAgICAgICAgICAgICAgICAgIGxheW91dFJlY3QuYXBwbHlUcmFuc2Zvcm0odGhpcy50cmFuc2Zvcm0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jYWxjdWxhdGVUZXh0UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jYWxjdWxhdGVUZXh0UG9zaXRpb24odG1wVGV4dFBvc0NhbGNSZXMsIHRleHRDb25maWcsIGxheW91dFJlY3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2FsY3VsYXRlVGV4dFBvc2l0aW9uKHRtcFRleHRQb3NDYWxjUmVzLCB0ZXh0Q29uZmlnLCBsYXlvdXRSZWN0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRUcmFuc2Zvcm0ueCA9IHRtcFRleHRQb3NDYWxjUmVzLng7XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRUcmFuc2Zvcm0ueSA9IHRtcFRleHRQb3NDYWxjUmVzLnk7XG4gICAgICAgICAgICAgICAgdGV4dEFsaWduID0gdG1wVGV4dFBvc0NhbGNSZXMuYWxpZ247XG4gICAgICAgICAgICAgICAgdGV4dFZlcnRpY2FsQWxpZ24gPSB0bXBUZXh0UG9zQ2FsY1Jlcy52ZXJ0aWNhbEFsaWduO1xuICAgICAgICAgICAgICAgIHZhciB0ZXh0T3JpZ2luID0gdGV4dENvbmZpZy5vcmlnaW47XG4gICAgICAgICAgICAgICAgaWYgKHRleHRPcmlnaW4gJiYgdGV4dENvbmZpZy5yb3RhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZWxPcmlnaW5YID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcmVsT3JpZ2luWSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRleHRPcmlnaW4gPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxPcmlnaW5YID0gbGF5b3V0UmVjdC53aWR0aCAqIDAuNTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbE9yaWdpblkgPSBsYXlvdXRSZWN0LmhlaWdodCAqIDAuNTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlbE9yaWdpblggPSBwYXJzZVBlcmNlbnQodGV4dE9yaWdpblswXSwgbGF5b3V0UmVjdC53aWR0aCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWxPcmlnaW5ZID0gcGFyc2VQZXJjZW50KHRleHRPcmlnaW5bMV0sIGxheW91dFJlY3QuaGVpZ2h0KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpbm5lck9yaWdpbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLm9yaWdpblggPSAtYXR0YWNoZWRUcmFuc2Zvcm0ueCArIHJlbE9yaWdpblggKyAoaXNMb2NhbCA/IDAgOiBsYXlvdXRSZWN0LngpO1xuICAgICAgICAgICAgICAgICAgICBhdHRhY2hlZFRyYW5zZm9ybS5vcmlnaW5ZID0gLWF0dGFjaGVkVHJhbnNmb3JtLnkgKyByZWxPcmlnaW5ZICsgKGlzTG9jYWwgPyAwIDogbGF5b3V0UmVjdC55KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGV4dENvbmZpZy5yb3RhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRUcmFuc2Zvcm0ucm90YXRpb24gPSB0ZXh0Q29uZmlnLnJvdGF0aW9uO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHRleHRPZmZzZXQgPSB0ZXh0Q29uZmlnLm9mZnNldDtcbiAgICAgICAgICAgIGlmICh0ZXh0T2Zmc2V0KSB7XG4gICAgICAgICAgICAgICAgYXR0YWNoZWRUcmFuc2Zvcm0ueCArPSB0ZXh0T2Zmc2V0WzBdO1xuICAgICAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLnkgKz0gdGV4dE9mZnNldFsxXTtcbiAgICAgICAgICAgICAgICBpZiAoIWlubmVyT3JpZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIGF0dGFjaGVkVHJhbnNmb3JtLm9yaWdpblggPSAtdGV4dE9mZnNldFswXTtcbiAgICAgICAgICAgICAgICAgICAgYXR0YWNoZWRUcmFuc2Zvcm0ub3JpZ2luWSA9IC10ZXh0T2Zmc2V0WzFdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBpc0luc2lkZSA9IHRleHRDb25maWcuaW5zaWRlID09IG51bGxcbiAgICAgICAgICAgICAgICA/ICh0eXBlb2YgdGV4dENvbmZpZy5wb3NpdGlvbiA9PT0gJ3N0cmluZycgJiYgdGV4dENvbmZpZy5wb3NpdGlvbi5pbmRleE9mKCdpbnNpZGUnKSA+PSAwKVxuICAgICAgICAgICAgICAgIDogdGV4dENvbmZpZy5pbnNpZGU7XG4gICAgICAgICAgICB2YXIgaW5uZXJUZXh0RGVmYXVsdFN0eWxlID0gdGhpcy5faW5uZXJUZXh0RGVmYXVsdFN0eWxlIHx8ICh0aGlzLl9pbm5lclRleHREZWZhdWx0U3R5bGUgPSB7fSk7XG4gICAgICAgICAgICB2YXIgdGV4dEZpbGwgPSB2b2lkIDA7XG4gICAgICAgICAgICB2YXIgdGV4dFN0cm9rZSA9IHZvaWQgMDtcbiAgICAgICAgICAgIHZhciBhdXRvU3Ryb2tlID0gdm9pZCAwO1xuICAgICAgICAgICAgaWYgKGlzSW5zaWRlICYmIHRoaXMuY2FuQmVJbnNpZGVUZXh0KCkpIHtcbiAgICAgICAgICAgICAgICB0ZXh0RmlsbCA9IHRleHRDb25maWcuaW5zaWRlRmlsbDtcbiAgICAgICAgICAgICAgICB0ZXh0U3Ryb2tlID0gdGV4dENvbmZpZy5pbnNpZGVTdHJva2U7XG4gICAgICAgICAgICAgICAgaWYgKHRleHRGaWxsID09IG51bGwgfHwgdGV4dEZpbGwgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICAgICAgICB0ZXh0RmlsbCA9IHRoaXMuZ2V0SW5zaWRlVGV4dEZpbGwoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHRleHRTdHJva2UgPT0gbnVsbCB8fCB0ZXh0U3Ryb2tlID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dFN0cm9rZSA9IHRoaXMuZ2V0SW5zaWRlVGV4dFN0cm9rZSh0ZXh0RmlsbCk7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9TdHJva2UgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRleHRGaWxsID0gdGV4dENvbmZpZy5vdXRzaWRlRmlsbDtcbiAgICAgICAgICAgICAgICB0ZXh0U3Ryb2tlID0gdGV4dENvbmZpZy5vdXRzaWRlU3Ryb2tlO1xuICAgICAgICAgICAgICAgIGlmICh0ZXh0RmlsbCA9PSBudWxsIHx8IHRleHRGaWxsID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICAgICAgdGV4dEZpbGwgPSB0aGlzLmdldE91dHNpZGVGaWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0ZXh0U3Ryb2tlID09IG51bGwgfHwgdGV4dFN0cm9rZSA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICAgICAgICAgIHRleHRTdHJva2UgPSB0aGlzLmdldE91dHNpZGVTdHJva2UodGV4dEZpbGwpO1xuICAgICAgICAgICAgICAgICAgICBhdXRvU3Ryb2tlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0RmlsbCA9IHRleHRGaWxsIHx8ICcjMDAwJztcbiAgICAgICAgICAgIGlmICh0ZXh0RmlsbCAhPT0gaW5uZXJUZXh0RGVmYXVsdFN0eWxlLmZpbGxcbiAgICAgICAgICAgICAgICB8fCB0ZXh0U3Ryb2tlICE9PSBpbm5lclRleHREZWZhdWx0U3R5bGUuc3Ryb2tlXG4gICAgICAgICAgICAgICAgfHwgYXV0b1N0cm9rZSAhPT0gaW5uZXJUZXh0RGVmYXVsdFN0eWxlLmF1dG9TdHJva2VcbiAgICAgICAgICAgICAgICB8fCB0ZXh0QWxpZ24gIT09IGlubmVyVGV4dERlZmF1bHRTdHlsZS5hbGlnblxuICAgICAgICAgICAgICAgIHx8IHRleHRWZXJ0aWNhbEFsaWduICE9PSBpbm5lclRleHREZWZhdWx0U3R5bGUudmVydGljYWxBbGlnbikge1xuICAgICAgICAgICAgICAgIHRleHRTdHlsZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGlubmVyVGV4dERlZmF1bHRTdHlsZS5maWxsID0gdGV4dEZpbGw7XG4gICAgICAgICAgICAgICAgaW5uZXJUZXh0RGVmYXVsdFN0eWxlLnN0cm9rZSA9IHRleHRTdHJva2U7XG4gICAgICAgICAgICAgICAgaW5uZXJUZXh0RGVmYXVsdFN0eWxlLmF1dG9TdHJva2UgPSBhdXRvU3Ryb2tlO1xuICAgICAgICAgICAgICAgIGlubmVyVGV4dERlZmF1bHRTdHlsZS5hbGlnbiA9IHRleHRBbGlnbjtcbiAgICAgICAgICAgICAgICBpbm5lclRleHREZWZhdWx0U3R5bGUudmVydGljYWxBbGlnbiA9IHRleHRWZXJ0aWNhbEFsaWduO1xuICAgICAgICAgICAgICAgIHRleHRFbC5zZXREZWZhdWx0VGV4dFN0eWxlKGlubmVyVGV4dERlZmF1bHRTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGV4dFN0eWxlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIHRleHRFbC5kaXJ0eVN0eWxlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0ZXh0RWwubWFya1JlZHJhdygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5jYW5CZUluc2lkZVRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuZ2V0SW5zaWRlVGV4dEZpbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnI2ZmZic7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5nZXRJbnNpZGVUZXh0U3Ryb2tlID0gZnVuY3Rpb24gKHRleHRGaWxsKSB7XG4gICAgICAgIHJldHVybiAnIzAwMCc7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5nZXRPdXRzaWRlRmlsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX196ciAmJiB0aGlzLl9fenIuaXNEYXJrTW9kZSgpID8gTElHSFRfTEFCRUxfQ09MT1IgOiBEQVJLX0xBQkVMX0NPTE9SO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuZ2V0T3V0c2lkZVN0cm9rZSA9IGZ1bmN0aW9uICh0ZXh0RmlsbCkge1xuICAgICAgICB2YXIgYmFja2dyb3VuZENvbG9yID0gdGhpcy5fX3pyICYmIHRoaXMuX196ci5nZXRCYWNrZ3JvdW5kQ29sb3IoKTtcbiAgICAgICAgdmFyIGNvbG9yQXJyID0gdHlwZW9mIGJhY2tncm91bmRDb2xvciA9PT0gJ3N0cmluZycgJiYgcGFyc2UoYmFja2dyb3VuZENvbG9yKTtcbiAgICAgICAgaWYgKCFjb2xvckFycikge1xuICAgICAgICAgICAgY29sb3JBcnIgPSBbMjU1LCAyNTUsIDI1NSwgMV07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFscGhhID0gY29sb3JBcnJbM107XG4gICAgICAgIHZhciBpc0RhcmsgPSB0aGlzLl9fenIuaXNEYXJrTW9kZSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgICAgICAgY29sb3JBcnJbaV0gPSBjb2xvckFycltpXSAqIGFscGhhICsgKGlzRGFyayA/IDAgOiAyNTUpICogKDEgLSBhbHBoYSk7XG4gICAgICAgIH1cbiAgICAgICAgY29sb3JBcnJbM10gPSAxO1xuICAgICAgICByZXR1cm4gc3RyaW5naWZ5KGNvbG9yQXJyLCAncmdiYScpO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUudHJhdmVyc2UgPSBmdW5jdGlvbiAoY2IsIGNvbnRleHQpIHsgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5hdHRyS1YgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICBpZiAoa2V5ID09PSAndGV4dENvbmZpZycpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0VGV4dENvbmZpZyh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoa2V5ID09PSAndGV4dENvbnRlbnQnKSB7XG4gICAgICAgICAgICB0aGlzLnNldFRleHRDb250ZW50KHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdjbGlwUGF0aCcpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Q2xpcFBhdGgodmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGtleSA9PT0gJ2V4dHJhJykge1xuICAgICAgICAgICAgdGhpcy5leHRyYSA9IHRoaXMuZXh0cmEgfHwge307XG4gICAgICAgICAgICBleHRlbmQodGhpcy5leHRyYSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpc1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmhpZGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuaWdub3JlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5tYXJrUmVkcmF3KCk7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5zaG93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmlnbm9yZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcmtSZWRyYXcoKTtcbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmF0dHIgPSBmdW5jdGlvbiAoa2V5T3JPYmosIHZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2Yga2V5T3JPYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICB0aGlzLmF0dHJLVihrZXlPck9iaiwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGlzT2JqZWN0KGtleU9yT2JqKSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IGtleU9yT2JqO1xuICAgICAgICAgICAgdmFyIGtleXNBcnIgPSBrZXlzKG9iaik7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleXNBcnIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIga2V5ID0ga2V5c0FycltpXTtcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJLVihrZXksIGtleU9yT2JqW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFya1JlZHJhdygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnNhdmVDdXJyZW50VG9Ob3JtYWxTdGF0ZSA9IGZ1bmN0aW9uICh0b1N0YXRlKSB7XG4gICAgICAgIHRoaXMuX2lubmVyU2F2ZVRvTm9ybWFsKHRvU3RhdGUpO1xuICAgICAgICB2YXIgbm9ybWFsU3RhdGUgPSB0aGlzLl9ub3JtYWxTdGF0ZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFuaW1hdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGFuaW1hdG9yID0gdGhpcy5hbmltYXRvcnNbaV07XG4gICAgICAgICAgICB2YXIgZnJvbVN0YXRlVHJhbnNpdGlvbiA9IGFuaW1hdG9yLl9fZnJvbVN0YXRlVHJhbnNpdGlvbjtcbiAgICAgICAgICAgIGlmIChmcm9tU3RhdGVUcmFuc2l0aW9uICYmIGZyb21TdGF0ZVRyYW5zaXRpb24gIT09IFBSRVNFUlZFRF9OT1JNQUxfU1RBVEUpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB0YXJnZXROYW1lID0gYW5pbWF0b3IudGFyZ2V0TmFtZTtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0YXJnZXROYW1lXG4gICAgICAgICAgICAgICAgPyBub3JtYWxTdGF0ZVt0YXJnZXROYW1lXSA6IG5vcm1hbFN0YXRlO1xuICAgICAgICAgICAgYW5pbWF0b3Iuc2F2ZUZpbmFsVG9UYXJnZXQodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuX2lubmVyU2F2ZVRvTm9ybWFsID0gZnVuY3Rpb24gKHRvU3RhdGUpIHtcbiAgICAgICAgdmFyIG5vcm1hbFN0YXRlID0gdGhpcy5fbm9ybWFsU3RhdGU7XG4gICAgICAgIGlmICghbm9ybWFsU3RhdGUpIHtcbiAgICAgICAgICAgIG5vcm1hbFN0YXRlID0gdGhpcy5fbm9ybWFsU3RhdGUgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9TdGF0ZS50ZXh0Q29uZmlnICYmICFub3JtYWxTdGF0ZS50ZXh0Q29uZmlnKSB7XG4gICAgICAgICAgICBub3JtYWxTdGF0ZS50ZXh0Q29uZmlnID0gdGhpcy50ZXh0Q29uZmlnO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3NhdmVQcmltYXJ5VG9Ob3JtYWwodG9TdGF0ZSwgbm9ybWFsU3RhdGUsIFBSSU1BUllfU1RBVEVTX0tFWVMpO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuX3NhdmVQcmltYXJ5VG9Ob3JtYWwgPSBmdW5jdGlvbiAodG9TdGF0ZSwgbm9ybWFsU3RhdGUsIHByaW1hcnlLZXlzKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJpbWFyeUtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwcmltYXJ5S2V5c1tpXTtcbiAgICAgICAgICAgIGlmICh0b1N0YXRlW2tleV0gIT0gbnVsbCAmJiAhKGtleSBpbiBub3JtYWxTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICBub3JtYWxTdGF0ZVtrZXldID0gdGhpc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5oYXNTdGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3VycmVudFN0YXRlcy5sZW5ndGggPiAwO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuZ2V0U3RhdGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZXNbbmFtZV07XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5lbnN1cmVTdGF0ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIHZhciBzdGF0ZXMgPSB0aGlzLnN0YXRlcztcbiAgICAgICAgaWYgKCFzdGF0ZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIHN0YXRlc1tuYW1lXSA9IHt9O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZXNbbmFtZV07XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5jbGVhclN0YXRlcyA9IGZ1bmN0aW9uIChub0FuaW1hdGlvbikge1xuICAgICAgICB0aGlzLnVzZVN0YXRlKFBSRVNFUlZFRF9OT1JNQUxfU1RBVEUsIGZhbHNlLCBub0FuaW1hdGlvbik7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS51c2VTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZU5hbWUsIGtlZXBDdXJyZW50U3RhdGVzLCBub0FuaW1hdGlvbikge1xuICAgICAgICB2YXIgdG9Ob3JtYWxTdGF0ZSA9IHN0YXRlTmFtZSA9PT0gUFJFU0VSVkVEX05PUk1BTF9TVEFURTtcbiAgICAgICAgdmFyIGhhc1N0YXRlcyA9IHRoaXMuaGFzU3RhdGUoKTtcbiAgICAgICAgaWYgKCFoYXNTdGF0ZXMgJiYgdG9Ob3JtYWxTdGF0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjdXJyZW50U3RhdGVzID0gdGhpcy5jdXJyZW50U3RhdGVzO1xuICAgICAgICB2YXIgYW5pbWF0aW9uQ2ZnID0gdGhpcy5zdGF0ZVRyYW5zaXRpb247XG4gICAgICAgIGlmIChpbmRleE9mKGN1cnJlbnRTdGF0ZXMsIHN0YXRlTmFtZSkgPj0gMCAmJiAoa2VlcEN1cnJlbnRTdGF0ZXMgfHwgY3VycmVudFN0YXRlcy5sZW5ndGggPT09IDEpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXRlO1xuICAgICAgICBpZiAodGhpcy5zdGF0ZVByb3h5ICYmICF0b05vcm1hbFN0YXRlKSB7XG4gICAgICAgICAgICBzdGF0ZSA9IHRoaXMuc3RhdGVQcm94eShzdGF0ZU5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RhdGUpIHtcbiAgICAgICAgICAgIHN0YXRlID0gKHRoaXMuc3RhdGVzICYmIHRoaXMuc3RhdGVzW3N0YXRlTmFtZV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICghc3RhdGUgJiYgIXRvTm9ybWFsU3RhdGUpIHtcbiAgICAgICAgICAgIGxvZ0Vycm9yKFwiU3RhdGUgXCIgKyBzdGF0ZU5hbWUgKyBcIiBub3QgZXhpc3RzLlwiKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRvTm9ybWFsU3RhdGUpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZUN1cnJlbnRUb05vcm1hbFN0YXRlKHN0YXRlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdXNlSG92ZXJMYXllciA9ICEhKHN0YXRlICYmIHN0YXRlLmhvdmVyTGF5ZXIpO1xuICAgICAgICBpZiAodXNlSG92ZXJMYXllcikge1xuICAgICAgICAgICAgdGhpcy5fdG9nZ2xlSG92ZXJMYXllckZsYWcodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fYXBwbHlTdGF0ZU9iaihzdGF0ZU5hbWUsIHN0YXRlLCB0aGlzLl9ub3JtYWxTdGF0ZSwga2VlcEN1cnJlbnRTdGF0ZXMsICFub0FuaW1hdGlvbiAmJiAhdGhpcy5fX2luSG92ZXIgJiYgYW5pbWF0aW9uQ2ZnICYmIGFuaW1hdGlvbkNmZy5kdXJhdGlvbiA+IDAsIGFuaW1hdGlvbkNmZyk7XG4gICAgICAgIGlmICh0aGlzLl90ZXh0Q29udGVudCkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dENvbnRlbnQudXNlU3RhdGUoc3RhdGVOYW1lLCBrZWVwQ3VycmVudFN0YXRlcyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RleHRHdWlkZSkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dEd1aWRlLnVzZVN0YXRlKHN0YXRlTmFtZSwga2VlcEN1cnJlbnRTdGF0ZXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0b05vcm1hbFN0YXRlKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX25vcm1hbFN0YXRlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWtlZXBDdXJyZW50U3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVzID0gW3N0YXRlTmFtZV07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRTdGF0ZXMucHVzaChzdGF0ZU5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3VwZGF0ZUFuaW1hdGlvblRhcmdldHMoKTtcbiAgICAgICAgdGhpcy5tYXJrUmVkcmF3KCk7XG4gICAgICAgIGlmICghdXNlSG92ZXJMYXllciAmJiB0aGlzLl9faW5Ib3Zlcikge1xuICAgICAgICAgICAgdGhpcy5fdG9nZ2xlSG92ZXJMYXllckZsYWcoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5fX2RpcnR5ICY9IH5FbGVtZW50LlJFREFSQVdfQklUO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnVzZVN0YXRlcyA9IGZ1bmN0aW9uIChzdGF0ZXMsIG5vQW5pbWF0aW9uKSB7XG4gICAgICAgIGlmICghc3RhdGVzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhclN0YXRlcygpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHN0YXRlT2JqZWN0cyA9IFtdO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRTdGF0ZXMgPSB0aGlzLmN1cnJlbnRTdGF0ZXM7XG4gICAgICAgICAgICB2YXIgbGVuID0gc3RhdGVzLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBub3RDaGFuZ2UgPSBsZW4gPT09IGN1cnJlbnRTdGF0ZXMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG5vdENoYW5nZSkge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXRlc1tpXSAhPT0gY3VycmVudFN0YXRlc1tpXSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbm90Q2hhbmdlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChub3RDaGFuZ2UpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YXRlTmFtZSA9IHN0YXRlc1tpXTtcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGVPYmogPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGVQcm94eSkge1xuICAgICAgICAgICAgICAgICAgICBzdGF0ZU9iaiA9IHRoaXMuc3RhdGVQcm94eShzdGF0ZU5hbWUsIHN0YXRlcyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghc3RhdGVPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVPYmogPSB0aGlzLnN0YXRlc1tzdGF0ZU5hbWVdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoc3RhdGVPYmopIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGVPYmplY3RzLnB1c2goc3RhdGVPYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB1c2VIb3ZlckxheWVyID0gISEoc3RhdGVPYmplY3RzW2xlbiAtIDFdICYmIHN0YXRlT2JqZWN0c1tsZW4gLSAxXS5ob3ZlckxheWVyKTtcbiAgICAgICAgICAgIGlmICh1c2VIb3ZlckxheWVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9nZ2xlSG92ZXJMYXllckZsYWcodHJ1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgbWVyZ2VkU3RhdGUgPSB0aGlzLl9tZXJnZVN0YXRlcyhzdGF0ZU9iamVjdHMpO1xuICAgICAgICAgICAgdmFyIGFuaW1hdGlvbkNmZyA9IHRoaXMuc3RhdGVUcmFuc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5zYXZlQ3VycmVudFRvTm9ybWFsU3RhdGUobWVyZ2VkU3RhdGUpO1xuICAgICAgICAgICAgdGhpcy5fYXBwbHlTdGF0ZU9iaihzdGF0ZXMuam9pbignLCcpLCBtZXJnZWRTdGF0ZSwgdGhpcy5fbm9ybWFsU3RhdGUsIGZhbHNlLCAhbm9BbmltYXRpb24gJiYgIXRoaXMuX19pbkhvdmVyICYmIGFuaW1hdGlvbkNmZyAmJiBhbmltYXRpb25DZmcuZHVyYXRpb24gPiAwLCBhbmltYXRpb25DZmcpO1xuICAgICAgICAgICAgaWYgKHRoaXMuX3RleHRDb250ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dENvbnRlbnQudXNlU3RhdGVzKHN0YXRlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5fdGV4dEd1aWRlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dEd1aWRlLnVzZVN0YXRlcyhzdGF0ZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fdXBkYXRlQW5pbWF0aW9uVGFyZ2V0cygpO1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGVzID0gc3RhdGVzLnNsaWNlKCk7XG4gICAgICAgICAgICB0aGlzLm1hcmtSZWRyYXcoKTtcbiAgICAgICAgICAgIGlmICghdXNlSG92ZXJMYXllciAmJiB0aGlzLl9faW5Ib3Zlcikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvZ2dsZUhvdmVyTGF5ZXJGbGFnKGZhbHNlKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fZGlydHkgJj0gfkVsZW1lbnQuUkVEQVJBV19CSVQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLl91cGRhdGVBbmltYXRpb25UYXJnZXRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYW5pbWF0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYW5pbWF0b3IgPSB0aGlzLmFuaW1hdG9yc1tpXTtcbiAgICAgICAgICAgIGlmIChhbmltYXRvci50YXJnZXROYW1lKSB7XG4gICAgICAgICAgICAgICAgYW5pbWF0b3IuY2hhbmdlVGFyZ2V0KHRoaXNbYW5pbWF0b3IudGFyZ2V0TmFtZV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSkge1xuICAgICAgICB2YXIgaWR4ID0gaW5kZXhPZih0aGlzLmN1cnJlbnRTdGF0ZXMsIHN0YXRlKTtcbiAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudFN0YXRlcyA9IHRoaXMuY3VycmVudFN0YXRlcy5zbGljZSgpO1xuICAgICAgICAgICAgY3VycmVudFN0YXRlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIHRoaXMudXNlU3RhdGVzKGN1cnJlbnRTdGF0ZXMpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5yZXBsYWNlU3RhdGUgPSBmdW5jdGlvbiAob2xkU3RhdGUsIG5ld1N0YXRlLCBmb3JjZUFkZCkge1xuICAgICAgICB2YXIgY3VycmVudFN0YXRlcyA9IHRoaXMuY3VycmVudFN0YXRlcy5zbGljZSgpO1xuICAgICAgICB2YXIgaWR4ID0gaW5kZXhPZihjdXJyZW50U3RhdGVzLCBvbGRTdGF0ZSk7XG4gICAgICAgIHZhciBuZXdTdGF0ZUV4aXN0cyA9IGluZGV4T2YoY3VycmVudFN0YXRlcywgbmV3U3RhdGUpID49IDA7XG4gICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgaWYgKCFuZXdTdGF0ZUV4aXN0cykge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRTdGF0ZXNbaWR4XSA9IG5ld1N0YXRlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFN0YXRlcy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChmb3JjZUFkZCAmJiAhbmV3U3RhdGVFeGlzdHMpIHtcbiAgICAgICAgICAgIGN1cnJlbnRTdGF0ZXMucHVzaChuZXdTdGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy51c2VTdGF0ZXMoY3VycmVudFN0YXRlcyk7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS50b2dnbGVTdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZSwgZW5hYmxlKSB7XG4gICAgICAgIGlmIChlbmFibGUpIHtcbiAgICAgICAgICAgIHRoaXMudXNlU3RhdGUoc3RhdGUsIHRydWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVTdGF0ZShzdGF0ZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLl9tZXJnZVN0YXRlcyA9IGZ1bmN0aW9uIChzdGF0ZXMpIHtcbiAgICAgICAgdmFyIG1lcmdlZFN0YXRlID0ge307XG4gICAgICAgIHZhciBtZXJnZWRUZXh0Q29uZmlnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gc3RhdGVzW2ldO1xuICAgICAgICAgICAgZXh0ZW5kKG1lcmdlZFN0YXRlLCBzdGF0ZSk7XG4gICAgICAgICAgICBpZiAoc3RhdGUudGV4dENvbmZpZykge1xuICAgICAgICAgICAgICAgIG1lcmdlZFRleHRDb25maWcgPSBtZXJnZWRUZXh0Q29uZmlnIHx8IHt9O1xuICAgICAgICAgICAgICAgIGV4dGVuZChtZXJnZWRUZXh0Q29uZmlnLCBzdGF0ZS50ZXh0Q29uZmlnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobWVyZ2VkVGV4dENvbmZpZykge1xuICAgICAgICAgICAgbWVyZ2VkU3RhdGUudGV4dENvbmZpZyA9IG1lcmdlZFRleHRDb25maWc7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG1lcmdlZFN0YXRlO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuX2FwcGx5U3RhdGVPYmogPSBmdW5jdGlvbiAoc3RhdGVOYW1lLCBzdGF0ZSwgbm9ybWFsU3RhdGUsIGtlZXBDdXJyZW50U3RhdGVzLCB0cmFuc2l0aW9uLCBhbmltYXRpb25DZmcpIHtcbiAgICAgICAgdmFyIG5lZWRzUmVzdG9yZVRvTm9ybWFsID0gIShzdGF0ZSAmJiBrZWVwQ3VycmVudFN0YXRlcyk7XG4gICAgICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS50ZXh0Q29uZmlnKSB7XG4gICAgICAgICAgICB0aGlzLnRleHRDb25maWcgPSBleHRlbmQoe30sIGtlZXBDdXJyZW50U3RhdGVzID8gdGhpcy50ZXh0Q29uZmlnIDogbm9ybWFsU3RhdGUudGV4dENvbmZpZyk7XG4gICAgICAgICAgICBleHRlbmQodGhpcy50ZXh0Q29uZmlnLCBzdGF0ZS50ZXh0Q29uZmlnKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChuZWVkc1Jlc3RvcmVUb05vcm1hbCkge1xuICAgICAgICAgICAgaWYgKG5vcm1hbFN0YXRlLnRleHRDb25maWcpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRDb25maWcgPSBub3JtYWxTdGF0ZS50ZXh0Q29uZmlnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHZhciB0cmFuc2l0aW9uVGFyZ2V0ID0ge307XG4gICAgICAgIHZhciBoYXNUcmFuc2l0aW9uID0gZmFsc2U7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgUFJJTUFSWV9TVEFURVNfS0VZUy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGtleSA9IFBSSU1BUllfU1RBVEVTX0tFWVNbaV07XG4gICAgICAgICAgICB2YXIgcHJvcE5lZWRzVHJhbnNpdGlvbiA9IHRyYW5zaXRpb24gJiYgREVGQVVMVF9BTklNQVRBQkxFX01BUFtrZXldO1xuICAgICAgICAgICAgaWYgKHN0YXRlICYmIHN0YXRlW2tleV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wTmVlZHNUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGhhc1RyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2l0aW9uVGFyZ2V0W2tleV0gPSBzdGF0ZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1trZXldID0gc3RhdGVba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChuZWVkc1Jlc3RvcmVUb05vcm1hbCkge1xuICAgICAgICAgICAgICAgIGlmIChub3JtYWxTdGF0ZVtrZXldICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByb3BOZWVkc1RyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1RyYW5zaXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvblRhcmdldFtrZXldID0gbm9ybWFsU3RhdGVba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5vcm1hbFN0YXRlW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYW5pbWF0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGFuaW1hdG9yID0gdGhpcy5hbmltYXRvcnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldE5hbWUgPSBhbmltYXRvci50YXJnZXROYW1lO1xuICAgICAgICAgICAgICAgIGFuaW1hdG9yLl9fY2hhbmdlRmluYWxWYWx1ZSh0YXJnZXROYW1lXG4gICAgICAgICAgICAgICAgICAgID8gKHN0YXRlIHx8IG5vcm1hbFN0YXRlKVt0YXJnZXROYW1lXVxuICAgICAgICAgICAgICAgICAgICA6IChzdGF0ZSB8fCBub3JtYWxTdGF0ZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNUcmFuc2l0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uU3RhdGUoc3RhdGVOYW1lLCB0cmFuc2l0aW9uVGFyZ2V0LCBhbmltYXRpb25DZmcpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5fYXR0YWNoQ29tcG9uZW50ID0gZnVuY3Rpb24gKGNvbXBvbmVudEVsKSB7XG4gICAgICAgIGlmIChjb21wb25lbnRFbC5fX3pyICYmICFjb21wb25lbnRFbC5fX2hvc3RUYXJnZXQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVGV4dCBlbGVtZW50IGhhcyBiZWVuIGFkZGVkIHRvIHpyZW5kZXIuJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbXBvbmVudEVsID09PSB0aGlzKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlY3Vyc2l2ZSBjb21wb25lbnQgYXR0YWNobWVudC4nKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgenIgPSB0aGlzLl9fenI7XG4gICAgICAgIGlmICh6cikge1xuICAgICAgICAgICAgY29tcG9uZW50RWwuYWRkU2VsZlRvWnIoenIpO1xuICAgICAgICB9XG4gICAgICAgIGNvbXBvbmVudEVsLl9fenIgPSB6cjtcbiAgICAgICAgY29tcG9uZW50RWwuX19ob3N0VGFyZ2V0ID0gdGhpcztcbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLl9kZXRhY2hDb21wb25lbnQgPSBmdW5jdGlvbiAoY29tcG9uZW50RWwpIHtcbiAgICAgICAgaWYgKGNvbXBvbmVudEVsLl9fenIpIHtcbiAgICAgICAgICAgIGNvbXBvbmVudEVsLnJlbW92ZVNlbGZGcm9tWnIoY29tcG9uZW50RWwuX196cik7XG4gICAgICAgIH1cbiAgICAgICAgY29tcG9uZW50RWwuX196ciA9IG51bGw7XG4gICAgICAgIGNvbXBvbmVudEVsLl9faG9zdFRhcmdldCA9IG51bGw7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5nZXRDbGlwUGF0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NsaXBQYXRoO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuc2V0Q2xpcFBhdGggPSBmdW5jdGlvbiAoY2xpcFBhdGgpIHtcbiAgICAgICAgaWYgKHRoaXMuX2NsaXBQYXRoICYmIHRoaXMuX2NsaXBQYXRoICE9PSBjbGlwUGF0aCkge1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVDbGlwUGF0aCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2F0dGFjaENvbXBvbmVudChjbGlwUGF0aCk7XG4gICAgICAgIHRoaXMuX2NsaXBQYXRoID0gY2xpcFBhdGg7XG4gICAgICAgIHRoaXMubWFya1JlZHJhdygpO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlQ2xpcFBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBjbGlwUGF0aCA9IHRoaXMuX2NsaXBQYXRoO1xuICAgICAgICBpZiAoY2xpcFBhdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2RldGFjaENvbXBvbmVudChjbGlwUGF0aCk7XG4gICAgICAgICAgICB0aGlzLl9jbGlwUGF0aCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm1hcmtSZWRyYXcoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuZ2V0VGV4dENvbnRlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0Q29udGVudDtcbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnNldFRleHRDb250ZW50ID0gZnVuY3Rpb24gKHRleHRFbCkge1xuICAgICAgICB2YXIgcHJldmlvdXNUZXh0Q29udGVudCA9IHRoaXMuX3RleHRDb250ZW50O1xuICAgICAgICBpZiAocHJldmlvdXNUZXh0Q29udGVudCA9PT0gdGV4dEVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZpb3VzVGV4dENvbnRlbnQgJiYgcHJldmlvdXNUZXh0Q29udGVudCAhPT0gdGV4dEVsKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRleHRDb250ZW50KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHRFbC5fX3pyICYmICF0ZXh0RWwuX19ob3N0VGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RleHQgZWxlbWVudCBoYXMgYmVlbiBhZGRlZCB0byB6cmVuZGVyLicpO1xuICAgICAgICB9XG4gICAgICAgIHRleHRFbC5hdHRhY2hlZFRyYW5zZm9ybSA9IG5ldyBUcmFuc2Zvcm1hYmxlKCk7XG4gICAgICAgIHRoaXMuX2F0dGFjaENvbXBvbmVudCh0ZXh0RWwpO1xuICAgICAgICB0aGlzLl90ZXh0Q29udGVudCA9IHRleHRFbDtcbiAgICAgICAgdGhpcy5tYXJrUmVkcmF3KCk7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5zZXRUZXh0Q29uZmlnID0gZnVuY3Rpb24gKGNmZykge1xuICAgICAgICBpZiAoIXRoaXMudGV4dENvbmZpZykge1xuICAgICAgICAgICAgdGhpcy50ZXh0Q29uZmlnID0ge307XG4gICAgICAgIH1cbiAgICAgICAgZXh0ZW5kKHRoaXMudGV4dENvbmZpZywgY2ZnKTtcbiAgICAgICAgdGhpcy5tYXJrUmVkcmF3KCk7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5yZW1vdmVUZXh0Q29udGVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRleHRFbCA9IHRoaXMuX3RleHRDb250ZW50O1xuICAgICAgICBpZiAodGV4dEVsKSB7XG4gICAgICAgICAgICB0ZXh0RWwuYXR0YWNoZWRUcmFuc2Zvcm0gPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5fZGV0YWNoQ29tcG9uZW50KHRleHRFbCk7XG4gICAgICAgICAgICB0aGlzLl90ZXh0Q29udGVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9pbm5lclRleHREZWZhdWx0U3R5bGUgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy5tYXJrUmVkcmF3KCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmdldFRleHRHdWlkZUxpbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90ZXh0R3VpZGU7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5zZXRUZXh0R3VpZGVMaW5lID0gZnVuY3Rpb24gKGd1aWRlTGluZSkge1xuICAgICAgICBpZiAodGhpcy5fdGV4dEd1aWRlICYmIHRoaXMuX3RleHRHdWlkZSAhPT0gZ3VpZGVMaW5lKSB7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRleHRHdWlkZUxpbmUoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9hdHRhY2hDb21wb25lbnQoZ3VpZGVMaW5lKTtcbiAgICAgICAgdGhpcy5fdGV4dEd1aWRlID0gZ3VpZGVMaW5lO1xuICAgICAgICB0aGlzLm1hcmtSZWRyYXcoKTtcbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLnJlbW92ZVRleHRHdWlkZUxpbmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0ZXh0R3VpZGUgPSB0aGlzLl90ZXh0R3VpZGU7XG4gICAgICAgIGlmICh0ZXh0R3VpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2RldGFjaENvbXBvbmVudCh0ZXh0R3VpZGUpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dEd1aWRlID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMubWFya1JlZHJhdygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5tYXJrUmVkcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9fZGlydHkgfD0gRWxlbWVudC5SRURBUkFXX0JJVDtcbiAgICAgICAgdmFyIHpyID0gdGhpcy5fX3pyO1xuICAgICAgICBpZiAoenIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLl9faW5Ib3Zlcikge1xuICAgICAgICAgICAgICAgIHpyLnJlZnJlc2hIb3ZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgenIucmVmcmVzaCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9faG9zdFRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5fX2hvc3RUYXJnZXQubWFya1JlZHJhdygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5kaXJ0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5tYXJrUmVkcmF3KCk7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5fdG9nZ2xlSG92ZXJMYXllckZsYWcgPSBmdW5jdGlvbiAoaW5Ib3Zlcikge1xuICAgICAgICB0aGlzLl9faW5Ib3ZlciA9IGluSG92ZXI7XG4gICAgICAgIHZhciB0ZXh0Q29udGVudCA9IHRoaXMuX3RleHRDb250ZW50O1xuICAgICAgICB2YXIgdGV4dEd1aWRlID0gdGhpcy5fdGV4dEd1aWRlO1xuICAgICAgICBpZiAodGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIHRleHRDb250ZW50Ll9faW5Ib3ZlciA9IGluSG92ZXI7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRleHRHdWlkZSkge1xuICAgICAgICAgICAgdGV4dEd1aWRlLl9faW5Ib3ZlciA9IGluSG92ZXI7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEVsZW1lbnQucHJvdG90eXBlLmFkZFNlbGZUb1pyID0gZnVuY3Rpb24gKHpyKSB7XG4gICAgICAgIHRoaXMuX196ciA9IHpyO1xuICAgICAgICB2YXIgYW5pbWF0b3JzID0gdGhpcy5hbmltYXRvcnM7XG4gICAgICAgIGlmIChhbmltYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW5pbWF0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgenIuYW5pbWF0aW9uLmFkZEFuaW1hdG9yKGFuaW1hdG9yc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NsaXBQYXRoKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGlwUGF0aC5hZGRTZWxmVG9acih6cik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RleHRDb250ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl90ZXh0Q29udGVudC5hZGRTZWxmVG9acih6cik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3RleHRHdWlkZSkge1xuICAgICAgICAgICAgdGhpcy5fdGV4dEd1aWRlLmFkZFNlbGZUb1pyKHpyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUucmVtb3ZlU2VsZkZyb21aciA9IGZ1bmN0aW9uICh6cikge1xuICAgICAgICB0aGlzLl9fenIgPSBudWxsO1xuICAgICAgICB2YXIgYW5pbWF0b3JzID0gdGhpcy5hbmltYXRvcnM7XG4gICAgICAgIGlmIChhbmltYXRvcnMpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW5pbWF0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgenIuYW5pbWF0aW9uLnJlbW92ZUFuaW1hdG9yKGFuaW1hdG9yc1tpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2NsaXBQYXRoKSB7XG4gICAgICAgICAgICB0aGlzLl9jbGlwUGF0aC5yZW1vdmVTZWxmRnJvbVpyKHpyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fdGV4dENvbnRlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRDb250ZW50LnJlbW92ZVNlbGZGcm9tWnIoenIpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl90ZXh0R3VpZGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RleHRHdWlkZS5yZW1vdmVTZWxmRnJvbVpyKHpyKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uIChrZXksIGxvb3ApIHtcbiAgICAgICAgdmFyIHRhcmdldCA9IGtleSA/IHRoaXNba2V5XSA6IHRoaXM7XG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICBsb2dFcnJvcignUHJvcGVydHkgXCInXG4gICAgICAgICAgICAgICAgKyBrZXlcbiAgICAgICAgICAgICAgICArICdcIiBpcyBub3QgZXhpc3RlZCBpbiBlbGVtZW50ICdcbiAgICAgICAgICAgICAgICArIHRoaXMuaWQpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhbmltYXRvciA9IG5ldyBBbmltYXRvcih0YXJnZXQsIGxvb3ApO1xuICAgICAgICB0aGlzLmFkZEFuaW1hdG9yKGFuaW1hdG9yLCBrZXkpO1xuICAgICAgICByZXR1cm4gYW5pbWF0b3I7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5hZGRBbmltYXRvciA9IGZ1bmN0aW9uIChhbmltYXRvciwga2V5KSB7XG4gICAgICAgIHZhciB6ciA9IHRoaXMuX196cjtcbiAgICAgICAgdmFyIGVsID0gdGhpcztcbiAgICAgICAgYW5pbWF0b3IuZHVyaW5nKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGVsLnVwZGF0ZUR1cmluZ0FuaW1hdGlvbihrZXkpO1xuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhbmltYXRvcnMgPSBlbC5hbmltYXRvcnM7XG4gICAgICAgICAgICB2YXIgaWR4ID0gaW5kZXhPZihhbmltYXRvcnMsIGFuaW1hdG9yKTtcbiAgICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgIGFuaW1hdG9ycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuYW5pbWF0b3JzLnB1c2goYW5pbWF0b3IpO1xuICAgICAgICBpZiAoenIpIHtcbiAgICAgICAgICAgIHpyLmFuaW1hdGlvbi5hZGRBbmltYXRvcihhbmltYXRvcik7XG4gICAgICAgIH1cbiAgICAgICAgenIgJiYgenIud2FrZVVwKCk7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS51cGRhdGVEdXJpbmdBbmltYXRpb24gPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHRoaXMubWFya1JlZHJhdygpO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuc3RvcEFuaW1hdGlvbiA9IGZ1bmN0aW9uIChzY29wZSwgZm9yd2FyZFRvTGFzdCkge1xuICAgICAgICB2YXIgYW5pbWF0b3JzID0gdGhpcy5hbmltYXRvcnM7XG4gICAgICAgIHZhciBsZW4gPSBhbmltYXRvcnMubGVuZ3RoO1xuICAgICAgICB2YXIgbGVmdEFuaW1hdG9ycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgYW5pbWF0b3IgPSBhbmltYXRvcnNbaV07XG4gICAgICAgICAgICBpZiAoIXNjb3BlIHx8IHNjb3BlID09PSBhbmltYXRvci5zY29wZSkge1xuICAgICAgICAgICAgICAgIGFuaW1hdG9yLnN0b3AoZm9yd2FyZFRvTGFzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZWZ0QW5pbWF0b3JzLnB1c2goYW5pbWF0b3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuYW5pbWF0b3JzID0gbGVmdEFuaW1hdG9ycztcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5hbmltYXRlVG8gPSBmdW5jdGlvbiAodGFyZ2V0LCBjZmcsIGFuaW1hdGlvblByb3BzKSB7XG4gICAgICAgIGFuaW1hdGVUbyh0aGlzLCB0YXJnZXQsIGNmZywgYW5pbWF0aW9uUHJvcHMpO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuYW5pbWF0ZUZyb20gPSBmdW5jdGlvbiAodGFyZ2V0LCBjZmcsIGFuaW1hdGlvblByb3BzKSB7XG4gICAgICAgIGFuaW1hdGVUbyh0aGlzLCB0YXJnZXQsIGNmZywgYW5pbWF0aW9uUHJvcHMsIHRydWUpO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuX3RyYW5zaXRpb25TdGF0ZSA9IGZ1bmN0aW9uIChzdGF0ZU5hbWUsIHRhcmdldCwgY2ZnLCBhbmltYXRpb25Qcm9wcykge1xuICAgICAgICB2YXIgYW5pbWF0b3JzID0gYW5pbWF0ZVRvKHRoaXMsIHRhcmdldCwgY2ZnLCBhbmltYXRpb25Qcm9wcyk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYW5pbWF0b3JzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhbmltYXRvcnNbaV0uX19mcm9tU3RhdGVUcmFuc2l0aW9uID0gc3RhdGVOYW1lO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFbGVtZW50LnByb3RvdHlwZS5nZXRCb3VuZGluZ1JlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgRWxlbWVudC5wcm90b3R5cGUuZ2V0UGFpbnRSZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xuICAgIEVsZW1lbnQuUkVEQVJBV19CSVQgPSAxO1xuICAgIEVsZW1lbnQuaW5pdERlZmF1bHRQcm9wcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBlbFByb3RvID0gRWxlbWVudC5wcm90b3R5cGU7XG4gICAgICAgIGVsUHJvdG8udHlwZSA9ICdlbGVtZW50JztcbiAgICAgICAgZWxQcm90by5uYW1lID0gJyc7XG4gICAgICAgIGVsUHJvdG8uaWdub3JlID0gZmFsc2U7XG4gICAgICAgIGVsUHJvdG8uc2lsZW50ID0gZmFsc2U7XG4gICAgICAgIGVsUHJvdG8uaXNHcm91cCA9IGZhbHNlO1xuICAgICAgICBlbFByb3RvLmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgICAgICBlbFByb3RvLmRyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIGVsUHJvdG8uaWdub3JlQ2xpcCA9IGZhbHNlO1xuICAgICAgICBlbFByb3RvLl9faW5Ib3ZlciA9IGZhbHNlO1xuICAgICAgICBlbFByb3RvLl9fZGlydHkgPSBFbGVtZW50LlJFREFSQVdfQklUO1xuICAgICAgICB2YXIgbG9ncyA9IHt9O1xuICAgICAgICBmdW5jdGlvbiBsb2dEZXByZWNhdGVkRXJyb3Ioa2V5LCB4S2V5LCB5S2V5KSB7XG4gICAgICAgICAgICBpZiAoIWxvZ3Nba2V5ICsgeEtleSArIHlLZXldKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFwiREVQUkVDQVRFRDogJ1wiICsga2V5ICsgXCInIGhhcyBiZWVuIGRlcHJlY2F0ZWQuIHVzZSAnXCIgKyB4S2V5ICsgXCInLCAnXCIgKyB5S2V5ICsgXCInIGluc3RlYWRcIik7XG4gICAgICAgICAgICAgICAgbG9nc1trZXkgKyB4S2V5ICsgeUtleV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZ1bmN0aW9uIGNyZWF0ZUxlZ2FjeVByb3BlcnR5KGtleSwgcHJpdmF0ZUtleSwgeEtleSwgeUtleSkge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGVsUHJvdG8sIGtleSwge1xuICAgICAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICBsb2dEZXByZWNhdGVkRXJyb3Ioa2V5LCB4S2V5LCB5S2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzW3ByaXZhdGVLZXldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9zID0gdGhpc1twcml2YXRlS2V5XSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgZW5oYW5jZUFycmF5KHRoaXMsIHBvcyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXNbcHJpdmF0ZUtleV07XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9nRGVwcmVjYXRlZEVycm9yKGtleSwgeEtleSwgeUtleSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbeEtleV0gPSBwb3NbMF07XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbeUtleV0gPSBwb3NbMV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbcHJpdmF0ZUtleV0gPSBwb3M7XG4gICAgICAgICAgICAgICAgICAgIGVuaGFuY2VBcnJheSh0aGlzLCBwb3MpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnVuY3Rpb24gZW5oYW5jZUFycmF5KHNlbGYsIHBvcykge1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShwb3MsIDAsIHtcbiAgICAgICAgICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2VsZlt4S2V5XTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmW3hLZXldID0gdmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHBvcywgMSwge1xuICAgICAgICAgICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBzZWxmW3lLZXldO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGZbeUtleV0gPSB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoT2JqZWN0LmRlZmluZVByb3BlcnR5ICYmICghZW52LmJyb3dzZXIuaWUgfHwgZW52LmJyb3dzZXIudmVyc2lvbiA+IDgpKSB7XG4gICAgICAgICAgICBjcmVhdGVMZWdhY3lQcm9wZXJ0eSgncG9zaXRpb24nLCAnX2xlZ2FjeVBvcycsICd4JywgJ3knKTtcbiAgICAgICAgICAgIGNyZWF0ZUxlZ2FjeVByb3BlcnR5KCdzY2FsZScsICdfbGVnYWN5U2NhbGUnLCAnc2NhbGVYJywgJ3NjYWxlWScpO1xuICAgICAgICAgICAgY3JlYXRlTGVnYWN5UHJvcGVydHkoJ29yaWdpbicsICdfbGVnYWN5T3JpZ2luJywgJ29yaWdpblgnLCAnb3JpZ2luWScpO1xuICAgICAgICB9XG4gICAgfSkoKTtcbiAgICByZXR1cm4gRWxlbWVudDtcbn0oKSk7XG5taXhpbihFbGVtZW50LCBFdmVudGZ1bCk7XG5taXhpbihFbGVtZW50LCBUcmFuc2Zvcm1hYmxlKTtcbmZ1bmN0aW9uIGFuaW1hdGVUbyhhbmltYXRhYmxlLCB0YXJnZXQsIGNmZywgYW5pbWF0aW9uUHJvcHMsIHJldmVyc2UpIHtcbiAgICBjZmcgPSBjZmcgfHwge307XG4gICAgdmFyIGFuaW1hdG9ycyA9IFtdO1xuICAgIGFuaW1hdGVUb1NoYWxsb3coYW5pbWF0YWJsZSwgJycsIGFuaW1hdGFibGUsIHRhcmdldCwgY2ZnLCBhbmltYXRpb25Qcm9wcywgYW5pbWF0b3JzLCByZXZlcnNlKTtcbiAgICB2YXIgZmluaXNoQ291bnQgPSBhbmltYXRvcnMubGVuZ3RoO1xuICAgIHZhciBkb25lSGFwcGVuZWQgPSBmYWxzZTtcbiAgICB2YXIgY2ZnRG9uZSA9IGNmZy5kb25lO1xuICAgIHZhciBjZmdBYm9ydGVkID0gY2ZnLmFib3J0ZWQ7XG4gICAgdmFyIGRvbmVDYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZG9uZUhhcHBlbmVkID0gdHJ1ZTtcbiAgICAgICAgZmluaXNoQ291bnQtLTtcbiAgICAgICAgaWYgKGZpbmlzaENvdW50IDw9IDApIHtcbiAgICAgICAgICAgIGRvbmVIYXBwZW5lZFxuICAgICAgICAgICAgICAgID8gKGNmZ0RvbmUgJiYgY2ZnRG9uZSgpKVxuICAgICAgICAgICAgICAgIDogKGNmZ0Fib3J0ZWQgJiYgY2ZnQWJvcnRlZCgpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgdmFyIGFib3J0ZWRDYiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZmluaXNoQ291bnQtLTtcbiAgICAgICAgaWYgKGZpbmlzaENvdW50IDw9IDApIHtcbiAgICAgICAgICAgIGRvbmVIYXBwZW5lZFxuICAgICAgICAgICAgICAgID8gKGNmZ0RvbmUgJiYgY2ZnRG9uZSgpKVxuICAgICAgICAgICAgICAgIDogKGNmZ0Fib3J0ZWQgJiYgY2ZnQWJvcnRlZCgpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgaWYgKCFmaW5pc2hDb3VudCkge1xuICAgICAgICBjZmdEb25lICYmIGNmZ0RvbmUoKTtcbiAgICB9XG4gICAgaWYgKGFuaW1hdG9ycy5sZW5ndGggPiAwICYmIGNmZy5kdXJpbmcpIHtcbiAgICAgICAgYW5pbWF0b3JzWzBdLmR1cmluZyhmdW5jdGlvbiAodGFyZ2V0LCBwZXJjZW50KSB7XG4gICAgICAgICAgICBjZmcuZHVyaW5nKHBlcmNlbnQpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhbmltYXRvcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIGFuaW1hdG9yID0gYW5pbWF0b3JzW2ldO1xuICAgICAgICBpZiAoZG9uZUNiKSB7XG4gICAgICAgICAgICBhbmltYXRvci5kb25lKGRvbmVDYik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFib3J0ZWRDYikge1xuICAgICAgICAgICAgYW5pbWF0b3IuYWJvcnRlZChhYm9ydGVkQ2IpO1xuICAgICAgICB9XG4gICAgICAgIGFuaW1hdG9yLnN0YXJ0KGNmZy5lYXNpbmcsIGNmZy5mb3JjZSk7XG4gICAgfVxuICAgIHJldHVybiBhbmltYXRvcnM7XG59XG5mdW5jdGlvbiBjb3B5QXJyU2hhbGxvdyhzb3VyY2UsIHRhcmdldCwgbGVuKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBzb3VyY2VbaV0gPSB0YXJnZXRbaV07XG4gICAgfVxufVxuZnVuY3Rpb24gaXMyREFycmF5KHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzQXJyYXlMaWtlKHZhbHVlWzBdKTtcbn1cbmZ1bmN0aW9uIGNvcHlWYWx1ZSh0YXJnZXQsIHNvdXJjZSwga2V5KSB7XG4gICAgaWYgKGlzQXJyYXlMaWtlKHNvdXJjZVtrZXldKSkge1xuICAgICAgICBpZiAoIWlzQXJyYXlMaWtlKHRhcmdldFtrZXldKSkge1xuICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNUeXBlZEFycmF5KHNvdXJjZVtrZXldKSkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IHNvdXJjZVtrZXldLmxlbmd0aDtcbiAgICAgICAgICAgIGlmICh0YXJnZXRba2V5XS5sZW5ndGggIT09IGxlbikge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gbmV3IChzb3VyY2Vba2V5XS5jb25zdHJ1Y3RvcikobGVuKTtcbiAgICAgICAgICAgICAgICBjb3B5QXJyU2hhbGxvdyh0YXJnZXRba2V5XSwgc291cmNlW2tleV0sIGxlbik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgc291cmNlQXJyID0gc291cmNlW2tleV07XG4gICAgICAgICAgICB2YXIgdGFyZ2V0QXJyID0gdGFyZ2V0W2tleV07XG4gICAgICAgICAgICB2YXIgbGVuMCA9IHNvdXJjZUFyci5sZW5ndGg7XG4gICAgICAgICAgICBpZiAoaXMyREFycmF5KHNvdXJjZUFycikpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVuMSA9IHNvdXJjZUFyclswXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW4wOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0YXJnZXRBcnJbaV0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRhcmdldEFycltpXSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHNvdXJjZUFycltpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3B5QXJyU2hhbGxvdyh0YXJnZXRBcnJbaV0sIHNvdXJjZUFycltpXSwgbGVuMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb3B5QXJyU2hhbGxvdyh0YXJnZXRBcnIsIHNvdXJjZUFyciwgbGVuMCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0YXJnZXRBcnIubGVuZ3RoID0gc291cmNlQXJyLmxlbmd0aDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICB9XG59XG5mdW5jdGlvbiBhbmltYXRlVG9TaGFsbG93KGFuaW1hdGFibGUsIHRvcEtleSwgc291cmNlLCB0YXJnZXQsIGNmZywgYW5pbWF0aW9uUHJvcHMsIGFuaW1hdG9ycywgcmV2ZXJzZSkge1xuICAgIHZhciBhbmltYXRhYmxlS2V5cyA9IFtdO1xuICAgIHZhciBjaGFuZ2VkS2V5cyA9IFtdO1xuICAgIHZhciB0YXJnZXRLZXlzID0ga2V5cyh0YXJnZXQpO1xuICAgIHZhciBkdXJhdGlvbiA9IGNmZy5kdXJhdGlvbjtcbiAgICB2YXIgZGVsYXkgPSBjZmcuZGVsYXk7XG4gICAgdmFyIGFkZGl0aXZlID0gY2ZnLmFkZGl0aXZlO1xuICAgIHZhciBzZXRUb0ZpbmFsID0gY2ZnLnNldFRvRmluYWw7XG4gICAgdmFyIGFuaW1hdGVBbGwgPSAhaXNPYmplY3QoYW5pbWF0aW9uUHJvcHMpO1xuICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGFyZ2V0S2V5cy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaW5uZXJLZXkgPSB0YXJnZXRLZXlzW2tdO1xuICAgICAgICBpZiAoc291cmNlW2lubmVyS2V5XSAhPSBudWxsXG4gICAgICAgICAgICAmJiB0YXJnZXRbaW5uZXJLZXldICE9IG51bGxcbiAgICAgICAgICAgICYmIChhbmltYXRlQWxsIHx8IGFuaW1hdGlvblByb3BzW2lubmVyS2V5XSkpIHtcbiAgICAgICAgICAgIGlmIChpc09iamVjdCh0YXJnZXRbaW5uZXJLZXldKSAmJiAhaXNBcnJheUxpa2UodGFyZ2V0W2lubmVyS2V5XSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9wS2V5KSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghcmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc291cmNlW2lubmVyS2V5XSA9IHRhcmdldFtpbm5lcktleV07XG4gICAgICAgICAgICAgICAgICAgICAgICBhbmltYXRhYmxlLnVwZGF0ZUR1cmluZ0FuaW1hdGlvbih0b3BLZXkpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBhbmltYXRlVG9TaGFsbG93KGFuaW1hdGFibGUsIGlubmVyS2V5LCBzb3VyY2VbaW5uZXJLZXldLCB0YXJnZXRbaW5uZXJLZXldLCBjZmcsIGFuaW1hdGlvblByb3BzICYmIGFuaW1hdGlvblByb3BzW2lubmVyS2V5XSwgYW5pbWF0b3JzLCByZXZlcnNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGFuaW1hdGFibGVLZXlzLnB1c2goaW5uZXJLZXkpO1xuICAgICAgICAgICAgICAgIGNoYW5nZWRLZXlzLnB1c2goaW5uZXJLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKCFyZXZlcnNlKSB7XG4gICAgICAgICAgICBzb3VyY2VbaW5uZXJLZXldID0gdGFyZ2V0W2lubmVyS2V5XTtcbiAgICAgICAgICAgIGFuaW1hdGFibGUudXBkYXRlRHVyaW5nQW5pbWF0aW9uKHRvcEtleSk7XG4gICAgICAgICAgICBjaGFuZ2VkS2V5cy5wdXNoKGlubmVyS2V5KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB2YXIga2V5TGVuID0gYW5pbWF0YWJsZUtleXMubGVuZ3RoO1xuICAgIGlmIChrZXlMZW4gPiAwXG4gICAgICAgIHx8IChjZmcuZm9yY2UgJiYgIWFuaW1hdG9ycy5sZW5ndGgpKSB7XG4gICAgICAgIHZhciBleGlzdHNBbmltYXRvcnMgPSBhbmltYXRhYmxlLmFuaW1hdG9ycztcbiAgICAgICAgdmFyIGV4aXN0c0FuaW1hdG9yc09uU2FtZVRhcmdldCA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGV4aXN0c0FuaW1hdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKGV4aXN0c0FuaW1hdG9yc1tpXS50YXJnZXROYW1lID09PSB0b3BLZXkpIHtcbiAgICAgICAgICAgICAgICBleGlzdHNBbmltYXRvcnNPblNhbWVUYXJnZXQucHVzaChleGlzdHNBbmltYXRvcnNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghYWRkaXRpdmUgJiYgZXhpc3RzQW5pbWF0b3JzT25TYW1lVGFyZ2V0Lmxlbmd0aCkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBleGlzdHNBbmltYXRvcnNPblNhbWVUYXJnZXQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgYWxsQWJvcnRlZCA9IGV4aXN0c0FuaW1hdG9yc09uU2FtZVRhcmdldFtpXS5zdG9wVHJhY2tzKGNoYW5nZWRLZXlzKTtcbiAgICAgICAgICAgICAgICBpZiAoYWxsQWJvcnRlZCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgaWR4ID0gaW5kZXhPZihleGlzdHNBbmltYXRvcnMsIGV4aXN0c0FuaW1hdG9yc09uU2FtZVRhcmdldFtpXSk7XG4gICAgICAgICAgICAgICAgICAgIGV4aXN0c0FuaW1hdG9ycy5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJldmVydGVkU291cmNlID0gdm9pZCAwO1xuICAgICAgICB2YXIgcmV2ZXJzZWRUYXJnZXQgPSB2b2lkIDA7XG4gICAgICAgIHZhciBzb3VyY2VDbG9uZSA9IHZvaWQgMDtcbiAgICAgICAgaWYgKHJldmVyc2UpIHtcbiAgICAgICAgICAgIHJldmVyc2VkVGFyZ2V0ID0ge307XG4gICAgICAgICAgICBpZiAoc2V0VG9GaW5hbCkge1xuICAgICAgICAgICAgICAgIHJldmVydGVkU291cmNlID0ge307XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleUxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlubmVyS2V5ID0gYW5pbWF0YWJsZUtleXNbaV07XG4gICAgICAgICAgICAgICAgcmV2ZXJzZWRUYXJnZXRbaW5uZXJLZXldID0gc291cmNlW2lubmVyS2V5XTtcbiAgICAgICAgICAgICAgICBpZiAoc2V0VG9GaW5hbCkge1xuICAgICAgICAgICAgICAgICAgICByZXZlcnRlZFNvdXJjZVtpbm5lcktleV0gPSB0YXJnZXRbaW5uZXJLZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlW2lubmVyS2V5XSA9IHRhcmdldFtpbm5lcktleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHNldFRvRmluYWwpIHtcbiAgICAgICAgICAgIHNvdXJjZUNsb25lID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGtleUxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGlubmVyS2V5ID0gYW5pbWF0YWJsZUtleXNbaV07XG4gICAgICAgICAgICAgICAgc291cmNlQ2xvbmVbaW5uZXJLZXldID0gY2xvbmVWYWx1ZShzb3VyY2VbaW5uZXJLZXldKTtcbiAgICAgICAgICAgICAgICBjb3B5VmFsdWUoc291cmNlLCB0YXJnZXQsIGlubmVyS2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIgYW5pbWF0b3IgPSBuZXcgQW5pbWF0b3Ioc291cmNlLCBmYWxzZSwgYWRkaXRpdmUgPyBleGlzdHNBbmltYXRvcnNPblNhbWVUYXJnZXQgOiBudWxsKTtcbiAgICAgICAgYW5pbWF0b3IudGFyZ2V0TmFtZSA9IHRvcEtleTtcbiAgICAgICAgaWYgKGNmZy5zY29wZSkge1xuICAgICAgICAgICAgYW5pbWF0b3Iuc2NvcGUgPSBjZmcuc2NvcGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNldFRvRmluYWwgJiYgcmV2ZXJ0ZWRTb3VyY2UpIHtcbiAgICAgICAgICAgIGFuaW1hdG9yLndoZW5XaXRoS2V5cygwLCByZXZlcnRlZFNvdXJjZSwgYW5pbWF0YWJsZUtleXMpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzb3VyY2VDbG9uZSkge1xuICAgICAgICAgICAgYW5pbWF0b3Iud2hlbldpdGhLZXlzKDAsIHNvdXJjZUNsb25lLCBhbmltYXRhYmxlS2V5cyk7XG4gICAgICAgIH1cbiAgICAgICAgYW5pbWF0b3Iud2hlbldpdGhLZXlzKGR1cmF0aW9uID09IG51bGwgPyA1MDAgOiBkdXJhdGlvbiwgcmV2ZXJzZSA/IHJldmVyc2VkVGFyZ2V0IDogdGFyZ2V0LCBhbmltYXRhYmxlS2V5cykuZGVsYXkoZGVsYXkgfHwgMCk7XG4gICAgICAgIGFuaW1hdGFibGUuYWRkQW5pbWF0b3IoYW5pbWF0b3IsIHRvcEtleSk7XG4gICAgICAgIGFuaW1hdG9ycy5wdXNoKGFuaW1hdG9yKTtcbiAgICB9XG59XG5leHBvcnQgZGVmYXVsdCBFbGVtZW50O1xuIiwiaW1wb3J0IENsaXAgZnJvbSAnLi9DbGlwJztcbmltcG9ydCAqIGFzIGNvbG9yIGZyb20gJy4uL3Rvb2wvY29sb3InO1xuaW1wb3J0IHsgaXNBcnJheUxpa2UsIGtleXMsIGxvZ0Vycm9yIH0gZnJvbSAnLi4vY29yZS91dGlsJztcbnZhciBhcnJheVNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuZXhwb3J0IGZ1bmN0aW9uIGludGVycG9sYXRlTnVtYmVyKHAwLCBwMSwgcGVyY2VudCkge1xuICAgIHJldHVybiAocDEgLSBwMCkgKiBwZXJjZW50ICsgcDA7XG59XG5leHBvcnQgZnVuY3Rpb24gc3RlcChwMCwgcDEsIHBlcmNlbnQpIHtcbiAgICByZXR1cm4gcGVyY2VudCA+IDAuNSA/IHAxIDogcDA7XG59XG5leHBvcnQgZnVuY3Rpb24gaW50ZXJwb2xhdGUxREFycmF5KG91dCwgcDAsIHAxLCBwZXJjZW50KSB7XG4gICAgdmFyIGxlbiA9IHAwLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIG91dFtpXSA9IGludGVycG9sYXRlTnVtYmVyKHAwW2ldLCBwMVtpXSwgcGVyY2VudCk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGludGVycG9sYXRlMkRBcnJheShvdXQsIHAwLCBwMSwgcGVyY2VudCkge1xuICAgIHZhciBsZW4gPSBwMC5sZW5ndGg7XG4gICAgdmFyIGxlbjIgPSBsZW4gJiYgcDBbMF0ubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCFvdXRbaV0pIHtcbiAgICAgICAgICAgIG91dFtpXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgbGVuMjsgaisrKSB7XG4gICAgICAgICAgICBvdXRbaV1bal0gPSBpbnRlcnBvbGF0ZU51bWJlcihwMFtpXVtqXSwgcDFbaV1bal0sIHBlcmNlbnQpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gYWRkMURBcnJheShvdXQsIHAwLCBwMSwgc2lnbikge1xuICAgIHZhciBsZW4gPSBwMC5sZW5ndGg7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBvdXRbaV0gPSBwMFtpXSArIHAxW2ldICogc2lnbjtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn1cbmZ1bmN0aW9uIGFkZDJEQXJyYXkob3V0LCBwMCwgcDEsIHNpZ24pIHtcbiAgICB2YXIgbGVuID0gcDAubGVuZ3RoO1xuICAgIHZhciBsZW4yID0gbGVuICYmIHAwWzBdLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICghb3V0W2ldKSB7XG4gICAgICAgICAgICBvdXRbaV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxlbjI7IGorKykge1xuICAgICAgICAgICAgb3V0W2ldW2pdID0gcDBbaV1bal0gKyBwMVtpXVtqXSAqIHNpZ247XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn1cbmZ1bmN0aW9uIGZpbGxBcnJheSh2YWwwLCB2YWwxLCBhcnJEaW0pIHtcbiAgICB2YXIgYXJyMCA9IHZhbDA7XG4gICAgdmFyIGFycjEgPSB2YWwxO1xuICAgIGlmICghYXJyMC5wdXNoIHx8ICFhcnIxLnB1c2gpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYXJyMExlbiA9IGFycjAubGVuZ3RoO1xuICAgIHZhciBhcnIxTGVuID0gYXJyMS5sZW5ndGg7XG4gICAgaWYgKGFycjBMZW4gIT09IGFycjFMZW4pIHtcbiAgICAgICAgdmFyIGlzUHJldmlvdXNMYXJnZXIgPSBhcnIwTGVuID4gYXJyMUxlbjtcbiAgICAgICAgaWYgKGlzUHJldmlvdXNMYXJnZXIpIHtcbiAgICAgICAgICAgIGFycjAubGVuZ3RoID0gYXJyMUxlbjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSBhcnIwTGVuOyBpIDwgYXJyMUxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgYXJyMC5wdXNoKGFyckRpbSA9PT0gMSA/IGFycjFbaV0gOiBhcnJheVNsaWNlLmNhbGwoYXJyMVtpXSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBsZW4yID0gYXJyMFswXSAmJiBhcnIwWzBdLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFycjAubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFyckRpbSA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKGlzTmFOKGFycjBbaV0pKSB7XG4gICAgICAgICAgICAgICAgYXJyMFtpXSA9IGFycjFbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxlbjI7IGorKykge1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihhcnIwW2ldW2pdKSkge1xuICAgICAgICAgICAgICAgICAgICBhcnIwW2ldW2pdID0gYXJyMVtpXVtqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBpczFEQXJyYXlTYW1lKGFycjAsIGFycjEpIHtcbiAgICB2YXIgbGVuID0gYXJyMC5sZW5ndGg7XG4gICAgaWYgKGxlbiAhPT0gYXJyMS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmIChhcnIwW2ldICE9PSBhcnIxW2ldKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBpczJEQXJyYXlTYW1lKGFycjAsIGFycjEpIHtcbiAgICB2YXIgbGVuID0gYXJyMC5sZW5ndGg7XG4gICAgaWYgKGxlbiAhPT0gYXJyMS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgbGVuMiA9IGFycjBbMF0ubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBsZW4yOyBqKyspIHtcbiAgICAgICAgICAgIGlmIChhcnIwW2ldW2pdICE9PSBhcnIxW2ldW2pdKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gY2F0bXVsbFJvbUludGVycG9sYXRlKHAwLCBwMSwgcDIsIHAzLCB0LCB0MiwgdDMpIHtcbiAgICB2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG4gICAgdmFyIHYxID0gKHAzIC0gcDEpICogMC41O1xuICAgIHJldHVybiAoMiAqIChwMSAtIHAyKSArIHYwICsgdjEpICogdDNcbiAgICAgICAgKyAoLTMgKiAocDEgLSBwMikgLSAyICogdjAgLSB2MSkgKiB0MlxuICAgICAgICArIHYwICogdCArIHAxO1xufVxuZnVuY3Rpb24gY2F0bXVsbFJvbUludGVycG9sYXRlMURBcnJheShvdXQsIHAwLCBwMSwgcDIsIHAzLCB0LCB0MiwgdDMpIHtcbiAgICB2YXIgbGVuID0gcDAubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgb3V0W2ldID0gY2F0bXVsbFJvbUludGVycG9sYXRlKHAwW2ldLCBwMVtpXSwgcDJbaV0sIHAzW2ldLCB0LCB0MiwgdDMpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGNhdG11bGxSb21JbnRlcnBvbGF0ZTJEQXJyYXkob3V0LCBwMCwgcDEsIHAyLCBwMywgdCwgdDIsIHQzKSB7XG4gICAgdmFyIGxlbiA9IHAwLmxlbmd0aDtcbiAgICB2YXIgbGVuMiA9IHAwWzBdLmxlbmd0aDtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGlmICghb3V0W2ldKSB7XG4gICAgICAgICAgICBvdXRbMV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBqID0gMDsgaiA8IGxlbjI7IGorKykge1xuICAgICAgICAgICAgb3V0W2ldW2pdID0gY2F0bXVsbFJvbUludGVycG9sYXRlKHAwW2ldW2pdLCBwMVtpXVtqXSwgcDJbaV1bal0sIHAzW2ldW2pdLCB0LCB0MiwgdDMpO1xuICAgICAgICB9XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lVmFsdWUodmFsdWUpIHtcbiAgICBpZiAoaXNBcnJheUxpa2UodmFsdWUpKSB7XG4gICAgICAgIHZhciBsZW4gPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgIGlmIChpc0FycmF5TGlrZSh2YWx1ZVswXSkpIHtcbiAgICAgICAgICAgIHZhciByZXQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXQucHVzaChhcnJheVNsaWNlLmNhbGwodmFsdWVbaV0pKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFycmF5U2xpY2UuY2FsbCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmZ1bmN0aW9uIHJnYmEyU3RyaW5nKHJnYmEpIHtcbiAgICByZ2JhWzBdID0gTWF0aC5mbG9vcihyZ2JhWzBdKTtcbiAgICByZ2JhWzFdID0gTWF0aC5mbG9vcihyZ2JhWzFdKTtcbiAgICByZ2JhWzJdID0gTWF0aC5mbG9vcihyZ2JhWzJdKTtcbiAgICByZXR1cm4gJ3JnYmEoJyArIHJnYmEuam9pbignLCcpICsgJyknO1xufVxuZnVuY3Rpb24gZ3Vlc3NBcnJheURpbSh2YWx1ZSkge1xuICAgIHJldHVybiBpc0FycmF5TGlrZSh2YWx1ZSAmJiB2YWx1ZVswXSkgPyAyIDogMTtcbn1cbnZhciB0bXBSZ2JhID0gWzAsIDAsIDAsIDBdO1xudmFyIFRyYWNrID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUcmFjayhwcm9wTmFtZSkge1xuICAgICAgICB0aGlzLmtleWZyYW1lcyA9IFtdO1xuICAgICAgICB0aGlzLm1heFRpbWUgPSAwO1xuICAgICAgICB0aGlzLmFyckRpbSA9IDA7XG4gICAgICAgIHRoaXMuaW50ZXJwb2xhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fbmVlZHNTb3J0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2lzQWxsVmFsdWVFcXVhbCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IDA7XG4gICAgICAgIHRoaXMuX2xhc3RGcmFtZVBlcmNlbnQgPSAwO1xuICAgICAgICB0aGlzLnByb3BOYW1lID0gcHJvcE5hbWU7XG4gICAgfVxuICAgIFRyYWNrLnByb3RvdHlwZS5pc0ZpbmlzaGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZmluaXNoZWQ7XG4gICAgfTtcbiAgICBUcmFjay5wcm90b3R5cGUuc2V0RmluaXNoZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2ZpbmlzaGVkID0gdHJ1ZTtcbiAgICAgICAgaWYgKHRoaXMuX2FkZGl0aXZlVHJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuX2FkZGl0aXZlVHJhY2suc2V0RmluaXNoZWQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVHJhY2sucHJvdG90eXBlLm5lZWRzQW5pbWF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLl9pc0FsbFZhbHVlRXF1YWwgJiYgdGhpcy5rZXlmcmFtZXMubGVuZ3RoID49IDIgJiYgdGhpcy5pbnRlcnBvbGFibGU7XG4gICAgfTtcbiAgICBUcmFjay5wcm90b3R5cGUuZ2V0QWRkaXRpdmVUcmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FkZGl0aXZlVHJhY2s7XG4gICAgfTtcbiAgICBUcmFjay5wcm90b3R5cGUuYWRkS2V5ZnJhbWUgPSBmdW5jdGlvbiAodGltZSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHRpbWUgPj0gdGhpcy5tYXhUaW1lKSB7XG4gICAgICAgICAgICB0aGlzLm1heFRpbWUgPSB0aW1lO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fbmVlZHNTb3J0ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIga2V5ZnJhbWVzID0gdGhpcy5rZXlmcmFtZXM7XG4gICAgICAgIHZhciBsZW4gPSBrZXlmcmFtZXMubGVuZ3RoO1xuICAgICAgICBpZiAodGhpcy5pbnRlcnBvbGFibGUpIHtcbiAgICAgICAgICAgIGlmIChpc0FycmF5TGlrZSh2YWx1ZSkpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJyYXlEaW0gPSBndWVzc0FycmF5RGltKHZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAobGVuID4gMCAmJiB0aGlzLmFyckRpbSAhPT0gYXJyYXlEaW0pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnBvbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoYXJyYXlEaW0gPT09IDEgJiYgdHlwZW9mIHZhbHVlWzBdICE9PSAnbnVtYmVyJ1xuICAgICAgICAgICAgICAgICAgICB8fCBhcnJheURpbSA9PT0gMiAmJiB0eXBlb2YgdmFsdWVbMF1bMF0gIT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJwb2xhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGxlbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RGcmFtZSA9IGtleWZyYW1lc1tsZW4gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuX2lzQWxsVmFsdWVFcXVhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFycmF5RGltID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFpczFEQXJyYXlTYW1lKHZhbHVlLCBsYXN0RnJhbWUudmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzQWxsVmFsdWVFcXVhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2lzQWxsVmFsdWVFcXVhbCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuYXJyRGltID0gYXJyYXlEaW07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hcnJEaW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaW50ZXJwb2xhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvbG9yQXJyYXkgPSBjb2xvci5wYXJzZSh2YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb2xvckFycmF5KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGNvbG9yQXJyYXk7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmlzVmFsdWVDb2xvciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmludGVycG9sYWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5pbnRlcnBvbGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5faXNBbGxWYWx1ZUVxdWFsICYmIGxlbiA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxhc3RGcmFtZSA9IGtleWZyYW1lc1tsZW4gLSAxXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNWYWx1ZUNvbG9yICYmICFpczFEQXJyYXlTYW1lKGxhc3RGcmFtZS52YWx1ZSwgdmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0FsbFZhbHVlRXF1YWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIGlmIChsYXN0RnJhbWUudmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9pc0FsbFZhbHVlRXF1YWwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB2YXIga2YgPSB7XG4gICAgICAgICAgICB0aW1lOiB0aW1lLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlLFxuICAgICAgICAgICAgcGVyY2VudDogMFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmtleWZyYW1lcy5wdXNoKGtmKTtcbiAgICAgICAgcmV0dXJuIGtmO1xuICAgIH07XG4gICAgVHJhY2sucHJvdG90eXBlLnByZXBhcmUgPSBmdW5jdGlvbiAoYWRkaXRpdmVUcmFjaykge1xuICAgICAgICB2YXIga2ZzID0gdGhpcy5rZXlmcmFtZXM7XG4gICAgICAgIGlmICh0aGlzLl9uZWVkc1NvcnQpIHtcbiAgICAgICAgICAgIGtmcy5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEudGltZSAtIGIudGltZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhcnJEaW0gPSB0aGlzLmFyckRpbTtcbiAgICAgICAgdmFyIGtmc0xlbiA9IGtmcy5sZW5ndGg7XG4gICAgICAgIHZhciBsYXN0S2YgPSBrZnNba2ZzTGVuIC0gMV07XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2ZzTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGtmc1tpXS5wZXJjZW50ID0ga2ZzW2ldLnRpbWUgLyB0aGlzLm1heFRpbWU7XG4gICAgICAgICAgICBpZiAoYXJyRGltID4gMCAmJiBpICE9PSBrZnNMZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgZmlsbEFycmF5KGtmc1tpXS52YWx1ZSwgbGFzdEtmLnZhbHVlLCBhcnJEaW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChhZGRpdGl2ZVRyYWNrXG4gICAgICAgICAgICAmJiB0aGlzLm5lZWRzQW5pbWF0ZSgpXG4gICAgICAgICAgICAmJiBhZGRpdGl2ZVRyYWNrLm5lZWRzQW5pbWF0ZSgpXG4gICAgICAgICAgICAmJiBhcnJEaW0gPT09IGFkZGl0aXZlVHJhY2suYXJyRGltXG4gICAgICAgICAgICAmJiB0aGlzLmlzVmFsdWVDb2xvciA9PT0gYWRkaXRpdmVUcmFjay5pc1ZhbHVlQ29sb3JcbiAgICAgICAgICAgICYmICFhZGRpdGl2ZVRyYWNrLl9maW5pc2hlZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkaXRpdmVUcmFjayA9IGFkZGl0aXZlVHJhY2s7XG4gICAgICAgICAgICB2YXIgc3RhcnRWYWx1ZSA9IGtmc1swXS52YWx1ZTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2ZzTGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoYXJyRGltID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsdWVDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAga2ZzW2ldLmFkZGl0aXZlVmFsdWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA9IGFkZDFEQXJyYXkoW10sIGtmc1tpXS52YWx1ZSwgc3RhcnRWYWx1ZSwgLTEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAga2ZzW2ldLmFkZGl0aXZlVmFsdWUgPSBrZnNbaV0udmFsdWUgLSBzdGFydFZhbHVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgaWYgKGFyckRpbSA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBrZnNbaV0uYWRkaXRpdmVWYWx1ZSA9IGFkZDFEQXJyYXkoW10sIGtmc1tpXS52YWx1ZSwgc3RhcnRWYWx1ZSwgLTEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChhcnJEaW0gPT09IDIpIHtcbiAgICAgICAgICAgICAgICAgICAga2ZzW2ldLmFkZGl0aXZlVmFsdWUgPSBhZGQyREFycmF5KFtdLCBrZnNbaV0udmFsdWUsIHN0YXJ0VmFsdWUsIC0xKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFRyYWNrLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gKHRhcmdldCwgcGVyY2VudCkge1xuICAgICAgICBpZiAodGhpcy5fZmluaXNoZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fYWRkaXRpdmVUcmFjayAmJiB0aGlzLl9hZGRpdGl2ZVRyYWNrLl9maW5pc2hlZCkge1xuICAgICAgICAgICAgdGhpcy5fYWRkaXRpdmVUcmFjayA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGlzQWRkaXRpdmUgPSB0aGlzLl9hZGRpdGl2ZVRyYWNrICE9IG51bGw7XG4gICAgICAgIHZhciB2YWx1ZUtleSA9IGlzQWRkaXRpdmUgPyAnYWRkaXRpdmVWYWx1ZScgOiAndmFsdWUnO1xuICAgICAgICB2YXIga2V5ZnJhbWVzID0gdGhpcy5rZXlmcmFtZXM7XG4gICAgICAgIHZhciBrZnNOdW0gPSB0aGlzLmtleWZyYW1lcy5sZW5ndGg7XG4gICAgICAgIHZhciBwcm9wTmFtZSA9IHRoaXMucHJvcE5hbWU7XG4gICAgICAgIHZhciBhcnJEaW0gPSB0aGlzLmFyckRpbTtcbiAgICAgICAgdmFyIGlzVmFsdWVDb2xvciA9IHRoaXMuaXNWYWx1ZUNvbG9yO1xuICAgICAgICB2YXIgZnJhbWVJZHg7XG4gICAgICAgIGlmIChwZXJjZW50IDwgMCkge1xuICAgICAgICAgICAgZnJhbWVJZHggPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHBlcmNlbnQgPCB0aGlzLl9sYXN0RnJhbWVQZXJjZW50KSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBNYXRoLm1pbih0aGlzLl9sYXN0RnJhbWUgKyAxLCBrZnNOdW0gLSAxKTtcbiAgICAgICAgICAgIGZvciAoZnJhbWVJZHggPSBzdGFydDsgZnJhbWVJZHggPj0gMDsgZnJhbWVJZHgtLSkge1xuICAgICAgICAgICAgICAgIGlmIChrZXlmcmFtZXNbZnJhbWVJZHhdLnBlcmNlbnQgPD0gcGVyY2VudCkge1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmcmFtZUlkeCA9IE1hdGgubWluKGZyYW1lSWR4LCBrZnNOdW0gLSAyKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGZvciAoZnJhbWVJZHggPSB0aGlzLl9sYXN0RnJhbWU7IGZyYW1lSWR4IDwga2ZzTnVtOyBmcmFtZUlkeCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtleWZyYW1lc1tmcmFtZUlkeF0ucGVyY2VudCA+IHBlcmNlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnJhbWVJZHggPSBNYXRoLm1pbihmcmFtZUlkeCAtIDEsIGtmc051bSAtIDIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBuZXh0RnJhbWUgPSBrZXlmcmFtZXNbZnJhbWVJZHggKyAxXTtcbiAgICAgICAgdmFyIGZyYW1lID0ga2V5ZnJhbWVzW2ZyYW1lSWR4XTtcbiAgICAgICAgaWYgKCEoZnJhbWUgJiYgbmV4dEZyYW1lKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xhc3RGcmFtZSA9IGZyYW1lSWR4O1xuICAgICAgICB0aGlzLl9sYXN0RnJhbWVQZXJjZW50ID0gcGVyY2VudDtcbiAgICAgICAgdmFyIHJhbmdlID0gKG5leHRGcmFtZS5wZXJjZW50IC0gZnJhbWUucGVyY2VudCk7XG4gICAgICAgIGlmIChyYW5nZSA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3ID0gKHBlcmNlbnQgLSBmcmFtZS5wZXJjZW50KSAvIHJhbmdlO1xuICAgICAgICB2YXIgdGFyZ2V0QXJyID0gaXNBZGRpdGl2ZSA/IHRoaXMuX2FkZGl0aXZlVmFsdWVcbiAgICAgICAgICAgIDogKGlzVmFsdWVDb2xvciA/IHRtcFJnYmEgOiB0YXJnZXRbcHJvcE5hbWVdKTtcbiAgICAgICAgaWYgKChhcnJEaW0gPiAwIHx8IGlzVmFsdWVDb2xvcikgJiYgIXRhcmdldEFycikge1xuICAgICAgICAgICAgdGFyZ2V0QXJyID0gdGhpcy5fYWRkaXRpdmVWYWx1ZSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLnVzZVNwbGluZSkge1xuICAgICAgICAgICAgdmFyIHAxID0ga2V5ZnJhbWVzW2ZyYW1lSWR4XVt2YWx1ZUtleV07XG4gICAgICAgICAgICB2YXIgcDAgPSBrZXlmcmFtZXNbZnJhbWVJZHggPT09IDAgPyBmcmFtZUlkeCA6IGZyYW1lSWR4IC0gMV1bdmFsdWVLZXldO1xuICAgICAgICAgICAgdmFyIHAyID0ga2V5ZnJhbWVzW2ZyYW1lSWR4ID4ga2ZzTnVtIC0gMiA/IGtmc051bSAtIDEgOiBmcmFtZUlkeCArIDFdW3ZhbHVlS2V5XTtcbiAgICAgICAgICAgIHZhciBwMyA9IGtleWZyYW1lc1tmcmFtZUlkeCA+IGtmc051bSAtIDMgPyBrZnNOdW0gLSAxIDogZnJhbWVJZHggKyAyXVt2YWx1ZUtleV07XG4gICAgICAgICAgICBpZiAoYXJyRGltID4gMCkge1xuICAgICAgICAgICAgICAgIGFyckRpbSA9PT0gMVxuICAgICAgICAgICAgICAgICAgICA/IGNhdG11bGxSb21JbnRlcnBvbGF0ZTFEQXJyYXkodGFyZ2V0QXJyLCBwMCwgcDEsIHAyLCBwMywgdywgdyAqIHcsIHcgKiB3ICogdylcbiAgICAgICAgICAgICAgICAgICAgOiBjYXRtdWxsUm9tSW50ZXJwb2xhdGUyREFycmF5KHRhcmdldEFyciwgcDAsIHAxLCBwMiwgcDMsIHcsIHcgKiB3LCB3ICogdyAqIHcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoaXNWYWx1ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgY2F0bXVsbFJvbUludGVycG9sYXRlMURBcnJheSh0YXJnZXRBcnIsIHAwLCBwMSwgcDIsIHAzLCB3LCB3ICogdywgdyAqIHcgKiB3KTtcbiAgICAgICAgICAgICAgICBpZiAoIWlzQWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IHJnYmEyU3RyaW5nKHRhcmdldEFycik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdm9pZCAwO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5pbnRlcnBvbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBwMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gY2F0bXVsbFJvbUludGVycG9sYXRlKHAwLCBwMSwgcDIsIHAzLCB3LCB3ICogdywgdyAqIHcgKiB3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzQWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkaXRpdmVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChhcnJEaW0gPiAwKSB7XG4gICAgICAgICAgICAgICAgYXJyRGltID09PSAxXG4gICAgICAgICAgICAgICAgICAgID8gaW50ZXJwb2xhdGUxREFycmF5KHRhcmdldEFyciwgZnJhbWVbdmFsdWVLZXldLCBuZXh0RnJhbWVbdmFsdWVLZXldLCB3KVxuICAgICAgICAgICAgICAgICAgICA6IGludGVycG9sYXRlMkRBcnJheSh0YXJnZXRBcnIsIGZyYW1lW3ZhbHVlS2V5XSwgbmV4dEZyYW1lW3ZhbHVlS2V5XSwgdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChpc1ZhbHVlQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBpbnRlcnBvbGF0ZTFEQXJyYXkodGFyZ2V0QXJyLCBmcmFtZVt2YWx1ZUtleV0sIG5leHRGcmFtZVt2YWx1ZUtleV0sIHcpO1xuICAgICAgICAgICAgICAgIGlmICghaXNBZGRpdGl2ZSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRbcHJvcE5hbWVdID0gcmdiYTJTdHJpbmcodGFyZ2V0QXJyKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgdmFsdWUgPSB2b2lkIDA7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmludGVycG9sYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHN0ZXAoZnJhbWVbdmFsdWVLZXldLCBuZXh0RnJhbWVbdmFsdWVLZXldLCB3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gaW50ZXJwb2xhdGVOdW1iZXIoZnJhbWVbdmFsdWVLZXldLCBuZXh0RnJhbWVbdmFsdWVLZXldLCB3KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGlzQWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkaXRpdmVWYWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNBZGRpdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5fYWRkVG9UYXJnZXQodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgVHJhY2sucHJvdG90eXBlLl9hZGRUb1RhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQpIHtcbiAgICAgICAgdmFyIGFyckRpbSA9IHRoaXMuYXJyRGltO1xuICAgICAgICB2YXIgcHJvcE5hbWUgPSB0aGlzLnByb3BOYW1lO1xuICAgICAgICB2YXIgYWRkaXRpdmVWYWx1ZSA9IHRoaXMuX2FkZGl0aXZlVmFsdWU7XG4gICAgICAgIGlmIChhcnJEaW0gPT09IDApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzVmFsdWVDb2xvcikge1xuICAgICAgICAgICAgICAgIGNvbG9yLnBhcnNlKHRhcmdldFtwcm9wTmFtZV0sIHRtcFJnYmEpO1xuICAgICAgICAgICAgICAgIGFkZDFEQXJyYXkodG1wUmdiYSwgdG1wUmdiYSwgYWRkaXRpdmVWYWx1ZSwgMSk7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IHJnYmEyU3RyaW5nKHRtcFJnYmEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3Byb3BOYW1lXSA9IHRhcmdldFtwcm9wTmFtZV0gKyBhZGRpdGl2ZVZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGFyckRpbSA9PT0gMSkge1xuICAgICAgICAgICAgYWRkMURBcnJheSh0YXJnZXRbcHJvcE5hbWVdLCB0YXJnZXRbcHJvcE5hbWVdLCBhZGRpdGl2ZVZhbHVlLCAxKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChhcnJEaW0gPT09IDIpIHtcbiAgICAgICAgICAgIGFkZDJEQXJyYXkodGFyZ2V0W3Byb3BOYW1lXSwgdGFyZ2V0W3Byb3BOYW1lXSwgYWRkaXRpdmVWYWx1ZSwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBUcmFjaztcbn0oKSk7XG52YXIgQW5pbWF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEFuaW1hdG9yKHRhcmdldCwgbG9vcCwgYWRkaXRpdmVUbykge1xuICAgICAgICB0aGlzLl90cmFja3MgPSB7fTtcbiAgICAgICAgdGhpcy5fdHJhY2tLZXlzID0gW107XG4gICAgICAgIHRoaXMuX2RlbGF5ID0gMDtcbiAgICAgICAgdGhpcy5fbWF4VGltZSA9IDA7XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGFydGVkID0gMDtcbiAgICAgICAgdGhpcy5fY2xpcCA9IG51bGw7XG4gICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgdGhpcy5fbG9vcCA9IGxvb3A7XG4gICAgICAgIGlmIChsb29wICYmIGFkZGl0aXZlVG8pIHtcbiAgICAgICAgICAgIGxvZ0Vycm9yKCdDYW5cXCcgdXNlIGFkZGl0aXZlIGFuaW1hdGlvbiBvbiBsb29wZWQgYW5pbWF0aW9uLicpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2FkZGl0aXZlQW5pbWF0b3JzID0gYWRkaXRpdmVUbztcbiAgICB9XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLmdldFRhcmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgICB9O1xuICAgIEFuaW1hdG9yLnByb3RvdHlwZS5jaGFuZ2VUYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0KSB7XG4gICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICB9O1xuICAgIEFuaW1hdG9yLnByb3RvdHlwZS53aGVuID0gZnVuY3Rpb24gKHRpbWUsIHByb3BzKSB7XG4gICAgICAgIHJldHVybiB0aGlzLndoZW5XaXRoS2V5cyh0aW1lLCBwcm9wcywga2V5cyhwcm9wcykpO1xuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLndoZW5XaXRoS2V5cyA9IGZ1bmN0aW9uICh0aW1lLCBwcm9wcywgcHJvcE5hbWVzKSB7XG4gICAgICAgIHZhciB0cmFja3MgPSB0aGlzLl90cmFja3M7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgcHJvcE5hbWUgPSBwcm9wTmFtZXNbaV07XG4gICAgICAgICAgICB2YXIgdHJhY2sgPSB0cmFja3NbcHJvcE5hbWVdO1xuICAgICAgICAgICAgaWYgKCF0cmFjaykge1xuICAgICAgICAgICAgICAgIHRyYWNrID0gdHJhY2tzW3Byb3BOYW1lXSA9IG5ldyBUcmFjayhwcm9wTmFtZSk7XG4gICAgICAgICAgICAgICAgdmFyIGluaXRpYWxWYWx1ZSA9IHZvaWQgMDtcbiAgICAgICAgICAgICAgICB2YXIgYWRkaXRpdmVUcmFjayA9IHRoaXMuX2dldEFkZGl0aXZlVHJhY2socHJvcE5hbWUpO1xuICAgICAgICAgICAgICAgIGlmIChhZGRpdGl2ZVRyYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXN0RmluYWxLZiA9IGFkZGl0aXZlVHJhY2sua2V5ZnJhbWVzW2FkZGl0aXZlVHJhY2sua2V5ZnJhbWVzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgICAgICBpbml0aWFsVmFsdWUgPSBsYXN0RmluYWxLZiAmJiBsYXN0RmluYWxLZi52YWx1ZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGFkZGl0aXZlVHJhY2suaXNWYWx1ZUNvbG9yICYmIGluaXRpYWxWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gcmdiYTJTdHJpbmcoaW5pdGlhbFZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbFZhbHVlID0gdGhpcy5fdGFyZ2V0W3Byb3BOYW1lXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGluaXRpYWxWYWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodGltZSAhPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICB0cmFjay5hZGRLZXlmcmFtZSgwLCBjbG9uZVZhbHVlKGluaXRpYWxWYWx1ZSkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl90cmFja0tleXMucHVzaChwcm9wTmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0cmFjay5hZGRLZXlmcmFtZSh0aW1lLCBjbG9uZVZhbHVlKHByb3BzW3Byb3BOYW1lXSkpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX21heFRpbWUgPSBNYXRoLm1heCh0aGlzLl9tYXhUaW1lLCB0aW1lKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBBbmltYXRvci5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NsaXAucGF1c2UoKTtcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gdHJ1ZTtcbiAgICB9O1xuICAgIEFuaW1hdG9yLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2NsaXAucmVzdW1lKCk7XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLmlzUGF1c2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9wYXVzZWQ7XG4gICAgfTtcbiAgICBBbmltYXRvci5wcm90b3R5cGUuX2RvbmVDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fc2V0VHJhY2tzRmluaXNoZWQoKTtcbiAgICAgICAgdGhpcy5fY2xpcCA9IG51bGw7XG4gICAgICAgIHZhciBkb25lTGlzdCA9IHRoaXMuX2RvbmVMaXN0O1xuICAgICAgICBpZiAoZG9uZUxpc3QpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSBkb25lTGlzdC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZG9uZUxpc3RbaV0uY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLl9hYm9ydGVkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3NldFRyYWNrc0ZpbmlzaGVkKCk7XG4gICAgICAgIHZhciBhbmltYXRpb24gPSB0aGlzLmFuaW1hdGlvbjtcbiAgICAgICAgdmFyIGFib3J0ZWRMaXN0ID0gdGhpcy5fYWJvcnRlZExpc3Q7XG4gICAgICAgIGlmIChhbmltYXRpb24pIHtcbiAgICAgICAgICAgIGFuaW1hdGlvbi5yZW1vdmVDbGlwKHRoaXMuX2NsaXApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2NsaXAgPSBudWxsO1xuICAgICAgICBpZiAoYWJvcnRlZExpc3QpIHtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYWJvcnRlZExpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBhYm9ydGVkTGlzdFtpXS5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBBbmltYXRvci5wcm90b3R5cGUuX3NldFRyYWNrc0ZpbmlzaGVkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJhY2tzID0gdGhpcy5fdHJhY2tzO1xuICAgICAgICB2YXIgdHJhY2tzS2V5cyA9IHRoaXMuX3RyYWNrS2V5cztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0cmFja3NLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB0cmFja3NbdHJhY2tzS2V5c1tpXV0uc2V0RmluaXNoZWQoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLl9nZXRBZGRpdGl2ZVRyYWNrID0gZnVuY3Rpb24gKHRyYWNrTmFtZSkge1xuICAgICAgICB2YXIgYWRkaXRpdmVUcmFjaztcbiAgICAgICAgdmFyIGFkZGl0aXZlQW5pbWF0b3JzID0gdGhpcy5fYWRkaXRpdmVBbmltYXRvcnM7XG4gICAgICAgIGlmIChhZGRpdGl2ZUFuaW1hdG9ycykge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGRpdGl2ZUFuaW1hdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB0cmFjayA9IGFkZGl0aXZlQW5pbWF0b3JzW2ldLmdldFRyYWNrKHRyYWNrTmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKHRyYWNrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZGl0aXZlVHJhY2sgPSB0cmFjaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFkZGl0aXZlVHJhY2s7XG4gICAgfTtcbiAgICBBbmltYXRvci5wcm90b3R5cGUuc3RhcnQgPSBmdW5jdGlvbiAoZWFzaW5nLCBmb3JjZUFuaW1hdGUpIHtcbiAgICAgICAgaWYgKHRoaXMuX3N0YXJ0ZWQgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fc3RhcnRlZCA9IDE7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdmFyIHRyYWNrcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3RyYWNrS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gdGhpcy5fdHJhY2tLZXlzW2ldO1xuICAgICAgICAgICAgdmFyIHRyYWNrID0gdGhpcy5fdHJhY2tzW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIHZhciBhZGRpdGl2ZVRyYWNrID0gdGhpcy5fZ2V0QWRkaXRpdmVUcmFjayhwcm9wTmFtZSk7XG4gICAgICAgICAgICB2YXIga2ZzID0gdHJhY2sua2V5ZnJhbWVzO1xuICAgICAgICAgICAgdHJhY2sucHJlcGFyZShhZGRpdGl2ZVRyYWNrKTtcbiAgICAgICAgICAgIGlmICh0cmFjay5uZWVkc0FuaW1hdGUoKSkge1xuICAgICAgICAgICAgICAgIHRyYWNrcy5wdXNoKHRyYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2UgaWYgKCF0cmFjay5pbnRlcnBvbGFibGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdEtmID0ga2ZzW2tmcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBpZiAobGFzdEtmKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX3RhcmdldFt0cmFjay5wcm9wTmFtZV0gPSBsYXN0S2YudmFsdWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICh0cmFja3MubGVuZ3RoIHx8IGZvcmNlQW5pbWF0ZSkge1xuICAgICAgICAgICAgdmFyIGNsaXAgPSBuZXcgQ2xpcCh7XG4gICAgICAgICAgICAgICAgbGlmZTogdGhpcy5fbWF4VGltZSxcbiAgICAgICAgICAgICAgICBsb29wOiB0aGlzLl9sb29wLFxuICAgICAgICAgICAgICAgIGRlbGF5OiB0aGlzLl9kZWxheSxcbiAgICAgICAgICAgICAgICBvbmZyYW1lOiBmdW5jdGlvbiAocGVyY2VudCkge1xuICAgICAgICAgICAgICAgICAgICBzZWxmLl9zdGFydGVkID0gMjtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFkZGl0aXZlQW5pbWF0b3JzID0gc2VsZi5fYWRkaXRpdmVBbmltYXRvcnM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChhZGRpdGl2ZUFuaW1hdG9ycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHN0aWxsSGFzQWRkaXRpdmVBbmltYXRvciA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhZGRpdGl2ZUFuaW1hdG9ycy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhZGRpdGl2ZUFuaW1hdG9yc1tpXS5fY2xpcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdGlsbEhhc0FkZGl0aXZlQW5pbWF0b3IgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXN0aWxsSGFzQWRkaXRpdmVBbmltYXRvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbGYuX2FkZGl0aXZlQW5pbWF0b3JzID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNrcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHJhY2tzW2ldLnN0ZXAoc2VsZi5fdGFyZ2V0LCBwZXJjZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB2YXIgb25mcmFtZUxpc3QgPSBzZWxmLl9vbmZyYW1lTGlzdDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9uZnJhbWVMaXN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9uZnJhbWVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb25mcmFtZUxpc3RbaV0oc2VsZi5fdGFyZ2V0LCBwZXJjZW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgb25kZXN0cm95OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgIHNlbGYuX2RvbmVDYWxsYmFjaygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5fY2xpcCA9IGNsaXA7XG4gICAgICAgICAgICBpZiAodGhpcy5hbmltYXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGlvbi5hZGRDbGlwKGNsaXApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVhc2luZyAmJiBlYXNpbmcgIT09ICdzcGxpbmUnKSB7XG4gICAgICAgICAgICAgICAgY2xpcC5lYXNpbmcgPSBlYXNpbmc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kb25lQ2FsbGJhY2soKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFuaW1hdG9yLnByb3RvdHlwZS5zdG9wID0gZnVuY3Rpb24gKGZvcndhcmRUb0xhc3QpIHtcbiAgICAgICAgaWYgKCF0aGlzLl9jbGlwKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGNsaXAgPSB0aGlzLl9jbGlwO1xuICAgICAgICBpZiAoZm9yd2FyZFRvTGFzdCkge1xuICAgICAgICAgICAgY2xpcC5vbmZyYW1lKDEpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2Fib3J0ZWRDYWxsYmFjaygpO1xuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLmRlbGF5ID0gZnVuY3Rpb24gKHRpbWUpIHtcbiAgICAgICAgdGhpcy5fZGVsYXkgPSB0aW1lO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEFuaW1hdG9yLnByb3RvdHlwZS5kdXJpbmcgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX29uZnJhbWVMaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25mcmFtZUxpc3QgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX29uZnJhbWVMaXN0LnB1c2goY2IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLmRvbmUgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2RvbmVMaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZG9uZUxpc3QgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2RvbmVMaXN0LnB1c2goY2IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLmFib3J0ZWQgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgaWYgKGNiKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuX2Fib3J0ZWRMaXN0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWJvcnRlZExpc3QgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2Fib3J0ZWRMaXN0LnB1c2goY2IpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLmdldENsaXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jbGlwO1xuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLmdldFRyYWNrID0gZnVuY3Rpb24gKHByb3BOYW1lKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90cmFja3NbcHJvcE5hbWVdO1xuICAgIH07XG4gICAgQW5pbWF0b3IucHJvdG90eXBlLnN0b3BUcmFja3MgPSBmdW5jdGlvbiAocHJvcE5hbWVzLCBmb3J3YXJkVG9MYXN0KSB7XG4gICAgICAgIGlmICghcHJvcE5hbWVzLmxlbmd0aCB8fCAhdGhpcy5fY2xpcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHRyYWNrcyA9IHRoaXMuX3RyYWNrcztcbiAgICAgICAgdmFyIHRyYWNrc0tleXMgPSB0aGlzLl90cmFja0tleXM7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcE5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdHJhY2sgPSB0cmFja3NbcHJvcE5hbWVzW2ldXTtcbiAgICAgICAgICAgIGlmICh0cmFjaykge1xuICAgICAgICAgICAgICAgIGlmIChmb3J3YXJkVG9MYXN0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRyYWNrLnN0ZXAodGhpcy5fdGFyZ2V0LCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAodGhpcy5fc3RhcnRlZCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0cmFjay5zdGVwKHRoaXMuX3RhcmdldCwgMCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRyYWNrLnNldEZpbmlzaGVkKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGFsbEFib3J0ZWQgPSB0cnVlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNrc0tleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICghdHJhY2tzW3RyYWNrc0tleXNbaV1dLmlzRmluaXNoZWQoKSkge1xuICAgICAgICAgICAgICAgIGFsbEFib3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoYWxsQWJvcnRlZCkge1xuICAgICAgICAgICAgdGhpcy5fYWJvcnRlZENhbGxiYWNrKCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFsbEFib3J0ZWQ7XG4gICAgfTtcbiAgICBBbmltYXRvci5wcm90b3R5cGUuc2F2ZUZpbmFsVG9UYXJnZXQgPSBmdW5jdGlvbiAodGFyZ2V0LCB0cmFja0tleXMpIHtcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0cmFja0tleXMgPSB0cmFja0tleXMgfHwgdGhpcy5fdHJhY2tLZXlzO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNrS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gdHJhY2tLZXlzW2ldO1xuICAgICAgICAgICAgdmFyIHRyYWNrID0gdGhpcy5fdHJhY2tzW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIGlmICghdHJhY2sgfHwgdHJhY2suaXNGaW5pc2hlZCgpKSB7XG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIga2ZzID0gdHJhY2sua2V5ZnJhbWVzO1xuICAgICAgICAgICAgdmFyIGxhc3RLZiA9IGtmc1trZnMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAobGFzdEtmKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZhbCA9IGNsb25lVmFsdWUobGFzdEtmLnZhbHVlKTtcbiAgICAgICAgICAgICAgICBpZiAodHJhY2suaXNWYWx1ZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbCA9IHJnYmEyU3RyaW5nKHZhbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhcmdldFtwcm9wTmFtZV0gPSB2YWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEFuaW1hdG9yLnByb3RvdHlwZS5fX2NoYW5nZUZpbmFsVmFsdWUgPSBmdW5jdGlvbiAoZmluYWxQcm9wcywgdHJhY2tLZXlzKSB7XG4gICAgICAgIHRyYWNrS2V5cyA9IHRyYWNrS2V5cyB8fCBrZXlzKGZpbmFsUHJvcHMpO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRyYWNrS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHByb3BOYW1lID0gdHJhY2tLZXlzW2ldO1xuICAgICAgICAgICAgdmFyIHRyYWNrID0gdGhpcy5fdHJhY2tzW3Byb3BOYW1lXTtcbiAgICAgICAgICAgIGlmICghdHJhY2spIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBrZnMgPSB0cmFjay5rZXlmcmFtZXM7XG4gICAgICAgICAgICBpZiAoa2ZzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFzdEtmID0ga2ZzLnBvcCgpO1xuICAgICAgICAgICAgICAgIHRyYWNrLmFkZEtleWZyYW1lKGxhc3RLZi50aW1lLCBmaW5hbFByb3BzW3Byb3BOYW1lXSk7XG4gICAgICAgICAgICAgICAgdHJhY2sucHJlcGFyZSh0cmFjay5nZXRBZGRpdGl2ZVRyYWNrKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gQW5pbWF0b3I7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgQW5pbWF0b3I7XG4iLCJpbXBvcnQgZWFzaW5nRnVuY3MgZnJvbSAnLi9lYXNpbmcnO1xudmFyIENsaXAgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENsaXAob3B0cykge1xuICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSAwO1xuICAgICAgICB0aGlzLl9wYXVzZWRUaW1lID0gMDtcbiAgICAgICAgdGhpcy5fcGF1c2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2xpZmUgPSBvcHRzLmxpZmUgfHwgMTAwMDtcbiAgICAgICAgdGhpcy5fZGVsYXkgPSBvcHRzLmRlbGF5IHx8IDA7XG4gICAgICAgIHRoaXMubG9vcCA9IG9wdHMubG9vcCA9PSBudWxsID8gZmFsc2UgOiBvcHRzLmxvb3A7XG4gICAgICAgIHRoaXMuZ2FwID0gb3B0cy5nYXAgfHwgMDtcbiAgICAgICAgdGhpcy5lYXNpbmcgPSBvcHRzLmVhc2luZyB8fCAnbGluZWFyJztcbiAgICAgICAgdGhpcy5vbmZyYW1lID0gb3B0cy5vbmZyYW1lO1xuICAgICAgICB0aGlzLm9uZGVzdHJveSA9IG9wdHMub25kZXN0cm95O1xuICAgICAgICB0aGlzLm9ucmVzdGFydCA9IG9wdHMub25yZXN0YXJ0O1xuICAgIH1cbiAgICBDbGlwLnByb3RvdHlwZS5zdGVwID0gZnVuY3Rpb24gKGdsb2JhbFRpbWUsIGRlbHRhVGltZSkge1xuICAgICAgICBpZiAoIXRoaXMuX2luaXRpYWxpemVkKSB7XG4gICAgICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSBnbG9iYWxUaW1lICsgdGhpcy5fZGVsYXk7XG4gICAgICAgICAgICB0aGlzLl9pbml0aWFsaXplZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3BhdXNlZCkge1xuICAgICAgICAgICAgdGhpcy5fcGF1c2VkVGltZSArPSBkZWx0YVRpbWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHBlcmNlbnQgPSAoZ2xvYmFsVGltZSAtIHRoaXMuX3N0YXJ0VGltZSAtIHRoaXMuX3BhdXNlZFRpbWUpIC8gdGhpcy5fbGlmZTtcbiAgICAgICAgaWYgKHBlcmNlbnQgPCAwKSB7XG4gICAgICAgICAgICBwZXJjZW50ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBwZXJjZW50ID0gTWF0aC5taW4ocGVyY2VudCwgMSk7XG4gICAgICAgIHZhciBlYXNpbmcgPSB0aGlzLmVhc2luZztcbiAgICAgICAgdmFyIGVhc2luZ0Z1bmMgPSB0eXBlb2YgZWFzaW5nID09PSAnc3RyaW5nJ1xuICAgICAgICAgICAgPyBlYXNpbmdGdW5jc1tlYXNpbmddIDogZWFzaW5nO1xuICAgICAgICB2YXIgc2NoZWR1bGUgPSB0eXBlb2YgZWFzaW5nRnVuYyA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgICAgPyBlYXNpbmdGdW5jKHBlcmNlbnQpXG4gICAgICAgICAgICA6IHBlcmNlbnQ7XG4gICAgICAgIHRoaXMub25mcmFtZSAmJiB0aGlzLm9uZnJhbWUoc2NoZWR1bGUpO1xuICAgICAgICBpZiAocGVyY2VudCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubG9vcCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3Jlc3RhcnQoZ2xvYmFsVGltZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbnJlc3RhcnQgJiYgdGhpcy5vbnJlc3RhcnQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIENsaXAucHJvdG90eXBlLl9yZXN0YXJ0ID0gZnVuY3Rpb24gKGdsb2JhbFRpbWUpIHtcbiAgICAgICAgdmFyIHJlbWFpbmRlciA9IChnbG9iYWxUaW1lIC0gdGhpcy5fc3RhcnRUaW1lIC0gdGhpcy5fcGF1c2VkVGltZSkgJSB0aGlzLl9saWZlO1xuICAgICAgICB0aGlzLl9zdGFydFRpbWUgPSBnbG9iYWxUaW1lIC0gcmVtYWluZGVyICsgdGhpcy5nYXA7XG4gICAgICAgIHRoaXMuX3BhdXNlZFRpbWUgPSAwO1xuICAgIH07XG4gICAgQ2xpcC5wcm90b3R5cGUucGF1c2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IHRydWU7XG4gICAgfTtcbiAgICBDbGlwLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX3BhdXNlZCA9IGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIENsaXA7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgQ2xpcDtcbiIsInZhciBlYXNpbmcgPSB7XG4gICAgbGluZWFyOiBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gaztcbiAgICB9LFxuICAgIHF1YWRyYXRpY0luOiBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gayAqIGs7XG4gICAgfSxcbiAgICBxdWFkcmF0aWNPdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldHVybiBrICogKDIgLSBrKTtcbiAgICB9LFxuICAgIHF1YWRyYXRpY0luT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogayAqIGs7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIC0wLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xuICAgIH0sXG4gICAgY3ViaWNJbjogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0dXJuIGsgKiBrICogaztcbiAgICB9LFxuICAgIGN1YmljT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gLS1rICogayAqIGsgKyAxO1xuICAgIH0sXG4gICAgY3ViaWNJbk91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgaWYgKChrICo9IDIpIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIDAuNSAqIGsgKiBrICogaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcbiAgICB9LFxuICAgIHF1YXJ0aWNJbjogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0dXJuIGsgKiBrICogayAqIGs7XG4gICAgfSxcbiAgICBxdWFydGljT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gMSAtICgtLWsgKiBrICogayAqIGspO1xuICAgIH0sXG4gICAgcXVhcnRpY0luT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xuICAgIH0sXG4gICAgcXVpbnRpY0luOiBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gayAqIGsgKiBrICogayAqIGs7XG4gICAgfSxcbiAgICBxdWludGljT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gLS1rICogayAqIGsgKiBrICogayArIDE7XG4gICAgfSxcbiAgICBxdWludGljSW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrICogaztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrICogayArIDIpO1xuICAgIH0sXG4gICAgc2ludXNvaWRhbEluOiBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XG4gICAgfSxcbiAgICBzaW51c29pZGFsT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcbiAgICB9LFxuICAgIHNpbnVzb2lkYWxJbk91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcbiAgICB9LFxuICAgIGV4cG9uZW50aWFsSW46IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcbiAgICB9LFxuICAgIGV4cG9uZW50aWFsT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgICByZXR1cm4gayA9PT0gMSA/IDEgOiAxIC0gTWF0aC5wb3coMiwgLTEwICogayk7XG4gICAgfSxcbiAgICBleHBvbmVudGlhbEluT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgICBpZiAoayA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGsgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDAuNSAqICgtTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKyAyKTtcbiAgICB9LFxuICAgIGNpcmN1bGFySW46IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XG4gICAgfSxcbiAgICBjaXJjdWxhck91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCgxIC0gKC0tayAqIGspKTtcbiAgICB9LFxuICAgIGNpcmN1bGFySW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnNxcnQoMSAtIChrIC09IDIpICogaykgKyAxKTtcbiAgICB9LFxuICAgIGVsYXN0aWNJbjogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgdmFyIHM7XG4gICAgICAgIHZhciBhID0gMC4xO1xuICAgICAgICB2YXIgcCA9IDAuNDtcbiAgICAgICAgaWYgKGsgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWEgfHwgYSA8IDEpIHtcbiAgICAgICAgICAgIGEgPSAxO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcyA9IHAgKiBNYXRoLmFzaW4oMSAvIGEpIC8gKDIgKiBNYXRoLlBJKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLShhICogTWF0aC5wb3coMiwgMTAgKiAoayAtPSAxKSlcbiAgICAgICAgICAgICogTWF0aC5zaW4oKGsgLSBzKSAqICgyICogTWF0aC5QSSkgLyBwKSk7XG4gICAgfSxcbiAgICBlbGFzdGljT3V0OiBmdW5jdGlvbiAoaykge1xuICAgICAgICB2YXIgcztcbiAgICAgICAgdmFyIGEgPSAwLjE7XG4gICAgICAgIHZhciBwID0gMC40O1xuICAgICAgICBpZiAoayA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGsgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9XG4gICAgICAgIGlmICghYSB8fCBhIDwgMSkge1xuICAgICAgICAgICAgYSA9IDE7XG4gICAgICAgICAgICBzID0gcCAvIDQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBzID0gcCAqIE1hdGguYXNpbigxIC8gYSkgLyAoMiAqIE1hdGguUEkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoYSAqIE1hdGgucG93KDIsIC0xMCAqIGspXG4gICAgICAgICAgICAqIE1hdGguc2luKChrIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKyAxKTtcbiAgICB9LFxuICAgIGVsYXN0aWNJbk91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgdmFyIHM7XG4gICAgICAgIHZhciBhID0gMC4xO1xuICAgICAgICB2YXIgcCA9IDAuNDtcbiAgICAgICAgaWYgKGsgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIGlmIChrID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIWEgfHwgYSA8IDEpIHtcbiAgICAgICAgICAgIGEgPSAxO1xuICAgICAgICAgICAgcyA9IHAgLyA0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcyA9IHAgKiBNYXRoLmFzaW4oMSAvIGEpIC8gKDIgKiBNYXRoLlBJKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGsgKj0gMikgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gLTAuNSAqIChhICogTWF0aC5wb3coMiwgMTAgKiAoayAtPSAxKSlcbiAgICAgICAgICAgICAgICAqIE1hdGguc2luKChrIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhICogTWF0aC5wb3coMiwgLTEwICogKGsgLT0gMSkpXG4gICAgICAgICAgICAqIE1hdGguc2luKChrIC0gcykgKiAoMiAqIE1hdGguUEkpIC8gcCkgKiAwLjUgKyAxO1xuICAgIH0sXG4gICAgYmFja0luOiBmdW5jdGlvbiAoaykge1xuICAgICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICAgIHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xuICAgIH0sXG4gICAgYmFja091dDogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgICByZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcbiAgICB9LFxuICAgIGJhY2tJbk91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgdmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG4gICAgICAgIGlmICgoayAqPSAyKSA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAwLjUgKiAoayAqIGsgKiAoKHMgKyAxKSAqIGsgLSBzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xuICAgIH0sXG4gICAgYm91bmNlSW46IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIHJldHVybiAxIC0gZWFzaW5nLmJvdW5jZU91dCgxIC0gayk7XG4gICAgfSxcbiAgICBib3VuY2VPdXQ6IGZ1bmN0aW9uIChrKSB7XG4gICAgICAgIGlmIChrIDwgKDEgLyAyLjc1KSkge1xuICAgICAgICAgICAgcmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XG4gICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKGsgLT0gKDEuNSAvIDIuNzUpKSAqIGsgKyAwLjc1O1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGsgPCAoMi41IC8gMi43NSkpIHtcbiAgICAgICAgICAgIHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xuICAgICAgICB9XG4gICAgfSxcbiAgICBib3VuY2VJbk91dDogZnVuY3Rpb24gKGspIHtcbiAgICAgICAgaWYgKGsgPCAwLjUpIHtcbiAgICAgICAgICAgIHJldHVybiBlYXNpbmcuYm91bmNlSW4oayAqIDIpICogMC41O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBlYXNpbmcuYm91bmNlT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XG4gICAgfVxufTtcbmV4cG9ydCBkZWZhdWx0IGVhc2luZztcbiIsInZhciByZXF1ZXN0QW5pbWF0aW9uRnJhbWU7XG5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCdcbiAgICAmJiAoKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZS5iaW5kKHdpbmRvdykpXG4gICAgICAgIHx8ICh3aW5kb3cubXNSZXF1ZXN0QW5pbWF0aW9uRnJhbWUgJiYgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KSlcbiAgICAgICAgfHwgd2luZG93Lm1velJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgICB8fCB3aW5kb3cud2Via2l0UmVxdWVzdEFuaW1hdGlvbkZyYW1lKSkgfHwgZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICByZXR1cm4gc2V0VGltZW91dChmdW5jLCAxNik7XG59O1xuZXhwb3J0IGRlZmF1bHQgcmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuIiwiaW1wb3J0IHsgREVGQVVMVF9DT01NT05fU1RZTEUgfSBmcm9tICcuLi9ncmFwaGljL0Rpc3BsYXlhYmxlJztcbmltcG9ydCBQYXRoUHJveHkgZnJvbSAnLi4vY29yZS9QYXRoUHJveHknO1xuaW1wb3J0IHsgY3JlYXRlT3JVcGRhdGVJbWFnZSwgaXNJbWFnZVJlYWR5IH0gZnJvbSAnLi4vZ3JhcGhpYy9oZWxwZXIvaW1hZ2UnO1xuaW1wb3J0IHsgZ2V0Q2FudmFzR3JhZGllbnQsIGlzQ2xpcFBhdGhDaGFuZ2VkIH0gZnJvbSAnLi9oZWxwZXInO1xuaW1wb3J0IFBhdGggZnJvbSAnLi4vZ3JhcGhpYy9QYXRoJztcbmltcG9ydCBaUkltYWdlIGZyb20gJy4uL2dyYXBoaWMvSW1hZ2UnO1xuaW1wb3J0IFRTcGFuIGZyb20gJy4uL2dyYXBoaWMvVFNwYW4nO1xuaW1wb3J0IHsgREVGQVVMVF9GT05UIH0gZnJvbSAnLi4vY29udGFpbi90ZXh0JztcbmltcG9ydCB7IG1hcCB9IGZyb20gJy4uL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBub3JtYWxpemVMaW5lRGFzaCB9IGZyb20gJy4uL2dyYXBoaWMvaGVscGVyL2Rhc2hTdHlsZSc7XG5pbXBvcnQgRWxlbWVudCBmcm9tICcuLi9FbGVtZW50JztcbmltcG9ydCBJbmNyZW1lbnRhbERpc3BsYXlhYmxlIGZyb20gJy4uL2dyYXBoaWMvSW5jcmVtZW50YWxEaXNwbGF5YWJsZSc7XG52YXIgcGF0aFByb3h5Rm9yRHJhdyA9IG5ldyBQYXRoUHJveHkodHJ1ZSk7XG5mdW5jdGlvbiBzdHlsZUhhc1N0cm9rZShzdHlsZSkge1xuICAgIHZhciBzdHJva2UgPSBzdHlsZS5zdHJva2U7XG4gICAgcmV0dXJuICEoc3Ryb2tlID09IG51bGwgfHwgc3Ryb2tlID09PSAnbm9uZScgfHwgIShzdHlsZS5saW5lV2lkdGggPiAwKSk7XG59XG5mdW5jdGlvbiBzdHlsZUhhc0ZpbGwoc3R5bGUpIHtcbiAgICB2YXIgZmlsbCA9IHN0eWxlLmZpbGw7XG4gICAgcmV0dXJuIGZpbGwgIT0gbnVsbCAmJiBmaWxsICE9PSAnbm9uZSc7XG59XG5mdW5jdGlvbiBkb0ZpbGxQYXRoKGN0eCwgc3R5bGUpIHtcbiAgICBpZiAoc3R5bGUuZmlsbE9wYWNpdHkgIT0gbnVsbCAmJiBzdHlsZS5maWxsT3BhY2l0eSAhPT0gMSkge1xuICAgICAgICB2YXIgb3JpZ2luYWxHbG9iYWxBbHBoYSA9IGN0eC5nbG9iYWxBbHBoYTtcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gc3R5bGUuZmlsbE9wYWNpdHkgKiBzdHlsZS5vcGFjaXR5O1xuICAgICAgICBjdHguZmlsbCgpO1xuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSBvcmlnaW5hbEdsb2JhbEFscGhhO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG59XG5mdW5jdGlvbiBkb1N0cm9rZVBhdGgoY3R4LCBzdHlsZSkge1xuICAgIGlmIChzdHlsZS5zdHJva2VPcGFjaXR5ICE9IG51bGwgJiYgc3R5bGUuc3Ryb2tlT3BhY2l0eSAhPT0gMSkge1xuICAgICAgICB2YXIgb3JpZ2luYWxHbG9iYWxBbHBoYSA9IGN0eC5nbG9iYWxBbHBoYTtcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gc3R5bGUuc3Ryb2tlT3BhY2l0eSAqIHN0eWxlLm9wYWNpdHk7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICAgICAgY3R4Lmdsb2JhbEFscGhhID0gb3JpZ2luYWxHbG9iYWxBbHBoYTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGN0eC5zdHJva2UoKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2FudmFzUGF0dGVybihjdHgsIHBhdHRlcm4sIGVsKSB7XG4gICAgdmFyIGltYWdlID0gY3JlYXRlT3JVcGRhdGVJbWFnZShwYXR0ZXJuLmltYWdlLCBwYXR0ZXJuLl9faW1hZ2UsIGVsKTtcbiAgICBpZiAoaXNJbWFnZVJlYWR5KGltYWdlKSkge1xuICAgICAgICB2YXIgY2FudmFzUGF0dGVybiA9IGN0eC5jcmVhdGVQYXR0ZXJuKGltYWdlLCBwYXR0ZXJuLnJlcGVhdCB8fCAncmVwZWF0Jyk7XG4gICAgICAgIGlmICh0eXBlb2YgRE9NTWF0cml4ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICB2YXIgbWF0cml4ID0gbmV3IERPTU1hdHJpeCgpO1xuICAgICAgICAgICAgbWF0cml4LnJvdGF0ZVNlbGYoMCwgMCwgKHBhdHRlcm4ucm90YXRpb24gfHwgMCkgLyBNYXRoLlBJICogMTgwKTtcbiAgICAgICAgICAgIG1hdHJpeC5zY2FsZVNlbGYoKHBhdHRlcm4uc2NhbGVYIHx8IDEpLCAocGF0dGVybi5zY2FsZVkgfHwgMSkpO1xuICAgICAgICAgICAgbWF0cml4LnRyYW5zbGF0ZVNlbGYoKHBhdHRlcm4ueCB8fCAwKSwgKHBhdHRlcm4ueSB8fCAwKSk7XG4gICAgICAgICAgICBjYW52YXNQYXR0ZXJuLnNldFRyYW5zZm9ybShtYXRyaXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjYW52YXNQYXR0ZXJuO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGJydXNoUGF0aChjdHgsIGVsLCBzdHlsZSwgaW5CYXRjaCkge1xuICAgIHZhciBoYXNTdHJva2UgPSBzdHlsZUhhc1N0cm9rZShzdHlsZSk7XG4gICAgdmFyIGhhc0ZpbGwgPSBzdHlsZUhhc0ZpbGwoc3R5bGUpO1xuICAgIHZhciBzdHJva2VQZXJjZW50ID0gc3R5bGUuc3Ryb2tlUGVyY2VudDtcbiAgICB2YXIgc3Ryb2tlUGFydCA9IHN0cm9rZVBlcmNlbnQgPCAxO1xuICAgIHZhciBmaXJzdERyYXcgPSAhZWwucGF0aDtcbiAgICBpZiAoKCFlbC5zaWxlbnQgfHwgc3Ryb2tlUGFydCkgJiYgZmlyc3REcmF3KSB7XG4gICAgICAgIGVsLmNyZWF0ZVBhdGhQcm94eSgpO1xuICAgIH1cbiAgICB2YXIgcGF0aCA9IGVsLnBhdGggfHwgcGF0aFByb3h5Rm9yRHJhdztcbiAgICBpZiAoIWluQmF0Y2gpIHtcbiAgICAgICAgdmFyIGZpbGwgPSBzdHlsZS5maWxsO1xuICAgICAgICB2YXIgc3Ryb2tlID0gc3R5bGUuc3Ryb2tlO1xuICAgICAgICB2YXIgaGFzRmlsbEdyYWRpZW50ID0gaGFzRmlsbCAmJiAhIWZpbGwuY29sb3JTdG9wcztcbiAgICAgICAgdmFyIGhhc1N0cm9rZUdyYWRpZW50ID0gaGFzU3Ryb2tlICYmICEhc3Ryb2tlLmNvbG9yU3RvcHM7XG4gICAgICAgIHZhciBoYXNGaWxsUGF0dGVybiA9IGhhc0ZpbGwgJiYgISFmaWxsLmltYWdlO1xuICAgICAgICB2YXIgaGFzU3Ryb2tlUGF0dGVybiA9IGhhc1N0cm9rZSAmJiAhIXN0cm9rZS5pbWFnZTtcbiAgICAgICAgdmFyIGZpbGxHcmFkaWVudCA9IHZvaWQgMDtcbiAgICAgICAgdmFyIHN0cm9rZUdyYWRpZW50ID0gdm9pZCAwO1xuICAgICAgICB2YXIgZmlsbFBhdHRlcm4gPSB2b2lkIDA7XG4gICAgICAgIHZhciBzdHJva2VQYXR0ZXJuID0gdm9pZCAwO1xuICAgICAgICB2YXIgcmVjdCA9IHZvaWQgMDtcbiAgICAgICAgaWYgKGhhc0ZpbGxHcmFkaWVudCB8fCBoYXNTdHJva2VHcmFkaWVudCkge1xuICAgICAgICAgICAgcmVjdCA9IGVsLmdldEJvdW5kaW5nUmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNGaWxsR3JhZGllbnQpIHtcbiAgICAgICAgICAgIGZpbGxHcmFkaWVudCA9IGVsLl9fZGlydHlcbiAgICAgICAgICAgICAgICA/IGdldENhbnZhc0dyYWRpZW50KGN0eCwgZmlsbCwgcmVjdClcbiAgICAgICAgICAgICAgICA6IGVsLl9fY2FudmFzRmlsbEdyYWRpZW50O1xuICAgICAgICAgICAgZWwuX19jYW52YXNGaWxsR3JhZGllbnQgPSBmaWxsR3JhZGllbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc1N0cm9rZUdyYWRpZW50KSB7XG4gICAgICAgICAgICBzdHJva2VHcmFkaWVudCA9IGVsLl9fZGlydHlcbiAgICAgICAgICAgICAgICA/IGdldENhbnZhc0dyYWRpZW50KGN0eCwgc3Ryb2tlLCByZWN0KVxuICAgICAgICAgICAgICAgIDogZWwuX19jYW52YXNTdHJva2VHcmFkaWVudDtcbiAgICAgICAgICAgIGVsLl9fY2FudmFzU3Ryb2tlR3JhZGllbnQgPSBzdHJva2VHcmFkaWVudDtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzRmlsbFBhdHRlcm4pIHtcbiAgICAgICAgICAgIGZpbGxQYXR0ZXJuID0gKGVsLl9fZGlydHkgfHwgIWVsLl9fY2FudmFzRmlsbFBhdHRlcm4pXG4gICAgICAgICAgICAgICAgPyBjcmVhdGVDYW52YXNQYXR0ZXJuKGN0eCwgZmlsbCwgZWwpXG4gICAgICAgICAgICAgICAgOiBlbC5fX2NhbnZhc0ZpbGxQYXR0ZXJuO1xuICAgICAgICAgICAgZWwuX19jYW52YXNGaWxsUGF0dGVybiA9IGZpbGxQYXR0ZXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNTdHJva2VQYXR0ZXJuKSB7XG4gICAgICAgICAgICBzdHJva2VQYXR0ZXJuID0gKGVsLl9fZGlydHkgfHwgIWVsLl9fY2FudmFzU3Ryb2tlUGF0dGVybilcbiAgICAgICAgICAgICAgICA/IGNyZWF0ZUNhbnZhc1BhdHRlcm4oY3R4LCBzdHJva2UsIGVsKVxuICAgICAgICAgICAgICAgIDogZWwuX19jYW52YXNTdHJva2VQYXR0ZXJuO1xuICAgICAgICAgICAgZWwuX19jYW52YXNTdHJva2VQYXR0ZXJuID0gZmlsbFBhdHRlcm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGhhc0ZpbGxHcmFkaWVudCkge1xuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpbGxHcmFkaWVudDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChoYXNGaWxsUGF0dGVybikge1xuICAgICAgICAgICAgaWYgKGZpbGxQYXR0ZXJuKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IGZpbGxQYXR0ZXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFzRmlsbCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNTdHJva2VHcmFkaWVudCkge1xuICAgICAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gc3Ryb2tlR3JhZGllbnQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoaGFzU3Ryb2tlUGF0dGVybikge1xuICAgICAgICAgICAgaWYgKHN0cm9rZVBhdHRlcm4pIHtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHJva2VQYXR0ZXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaGFzU3Ryb2tlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIGxpbmVEYXNoID0gc3R5bGUubGluZURhc2ggJiYgc3R5bGUubGluZVdpZHRoID4gMCAmJiBub3JtYWxpemVMaW5lRGFzaChzdHlsZS5saW5lRGFzaCwgc3R5bGUubGluZVdpZHRoKTtcbiAgICB2YXIgbGluZURhc2hPZmZzZXQgPSBzdHlsZS5saW5lRGFzaE9mZnNldDtcbiAgICB2YXIgY3R4TGluZURhc2ggPSAhIWN0eC5zZXRMaW5lRGFzaDtcbiAgICB2YXIgc2NhbGUgPSBlbC5nZXRHbG9iYWxTY2FsZSgpO1xuICAgIHBhdGguc2V0U2NhbGUoc2NhbGVbMF0sIHNjYWxlWzFdLCBlbC5zZWdtZW50SWdub3JlVGhyZXNob2xkKTtcbiAgICBpZiAobGluZURhc2gpIHtcbiAgICAgICAgdmFyIGxpbmVTY2FsZV8xID0gKHN0eWxlLnN0cm9rZU5vU2NhbGUgJiYgZWwuZ2V0TGluZVNjYWxlKSA/IGVsLmdldExpbmVTY2FsZSgpIDogMTtcbiAgICAgICAgaWYgKGxpbmVTY2FsZV8xICYmIGxpbmVTY2FsZV8xICE9PSAxKSB7XG4gICAgICAgICAgICBsaW5lRGFzaCA9IG1hcChsaW5lRGFzaCwgZnVuY3Rpb24gKHJhd1ZhbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiByYXdWYWwgLyBsaW5lU2NhbGVfMTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGluZURhc2hPZmZzZXQgLz0gbGluZVNjYWxlXzE7XG4gICAgICAgIH1cbiAgICB9XG4gICAgdmFyIG5lZWRzUmVidWlsZCA9IHRydWU7XG4gICAgaWYgKGZpcnN0RHJhdyB8fCAoZWwuX19kaXJ0eSAmIFBhdGguU0hBUEVfQ0hBTkdFRF9CSVQpXG4gICAgICAgIHx8IChsaW5lRGFzaCAmJiAhY3R4TGluZURhc2ggJiYgaGFzU3Ryb2tlKSkge1xuICAgICAgICBwYXRoLnNldERQUihjdHguZHByKTtcbiAgICAgICAgaWYgKHN0cm9rZVBhcnQpIHtcbiAgICAgICAgICAgIHBhdGguc2V0Q29udGV4dChudWxsKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHBhdGguc2V0Q29udGV4dChjdHgpO1xuICAgICAgICAgICAgbmVlZHNSZWJ1aWxkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcGF0aC5yZXNldCgpO1xuICAgICAgICBpZiAobGluZURhc2ggJiYgIWN0eExpbmVEYXNoKSB7XG4gICAgICAgICAgICBwYXRoLnNldExpbmVEYXNoKGxpbmVEYXNoKTtcbiAgICAgICAgICAgIHBhdGguc2V0TGluZURhc2hPZmZzZXQobGluZURhc2hPZmZzZXQpO1xuICAgICAgICB9XG4gICAgICAgIGVsLmJ1aWxkUGF0aChwYXRoLCBlbC5zaGFwZSwgaW5CYXRjaCk7XG4gICAgICAgIHBhdGgudG9TdGF0aWMoKTtcbiAgICAgICAgZWwucGF0aFVwZGF0ZWQoKTtcbiAgICB9XG4gICAgaWYgKG5lZWRzUmVidWlsZCkge1xuICAgICAgICBwYXRoLnJlYnVpbGRQYXRoKGN0eCwgc3Ryb2tlUGFydCA/IHN0cm9rZVBlcmNlbnQgOiAxKTtcbiAgICB9XG4gICAgaWYgKGxpbmVEYXNoICYmIGN0eExpbmVEYXNoKSB7XG4gICAgICAgIGN0eC5zZXRMaW5lRGFzaChsaW5lRGFzaCk7XG4gICAgICAgIGN0eC5saW5lRGFzaE9mZnNldCA9IGxpbmVEYXNoT2Zmc2V0O1xuICAgIH1cbiAgICBpZiAoIWluQmF0Y2gpIHtcbiAgICAgICAgaWYgKHN0eWxlLnN0cm9rZUZpcnN0KSB7XG4gICAgICAgICAgICBpZiAoaGFzU3Ryb2tlKSB7XG4gICAgICAgICAgICAgICAgZG9TdHJva2VQYXRoKGN0eCwgc3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc0ZpbGwpIHtcbiAgICAgICAgICAgICAgICBkb0ZpbGxQYXRoKGN0eCwgc3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgaWYgKGhhc0ZpbGwpIHtcbiAgICAgICAgICAgICAgICBkb0ZpbGxQYXRoKGN0eCwgc3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc1N0cm9rZSkge1xuICAgICAgICAgICAgICAgIGRvU3Ryb2tlUGF0aChjdHgsIHN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAobGluZURhc2ggJiYgY3R4TGluZURhc2gpIHtcbiAgICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICB9XG59XG5mdW5jdGlvbiBicnVzaEltYWdlKGN0eCwgZWwsIHN0eWxlKSB7XG4gICAgdmFyIGltYWdlID0gZWwuX19pbWFnZSA9IGNyZWF0ZU9yVXBkYXRlSW1hZ2Uoc3R5bGUuaW1hZ2UsIGVsLl9faW1hZ2UsIGVsLCBlbC5vbmxvYWQpO1xuICAgIGlmICghaW1hZ2UgfHwgIWlzSW1hZ2VSZWFkeShpbWFnZSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgeCA9IHN0eWxlLnggfHwgMDtcbiAgICB2YXIgeSA9IHN0eWxlLnkgfHwgMDtcbiAgICB2YXIgd2lkdGggPSBlbC5nZXRXaWR0aCgpO1xuICAgIHZhciBoZWlnaHQgPSBlbC5nZXRIZWlnaHQoKTtcbiAgICB2YXIgYXNwZWN0ID0gaW1hZ2Uud2lkdGggLyBpbWFnZS5oZWlnaHQ7XG4gICAgaWYgKHdpZHRoID09IG51bGwgJiYgaGVpZ2h0ICE9IG51bGwpIHtcbiAgICAgICAgd2lkdGggPSBoZWlnaHQgKiBhc3BlY3Q7XG4gICAgfVxuICAgIGVsc2UgaWYgKGhlaWdodCA9PSBudWxsICYmIHdpZHRoICE9IG51bGwpIHtcbiAgICAgICAgaGVpZ2h0ID0gd2lkdGggLyBhc3BlY3Q7XG4gICAgfVxuICAgIGVsc2UgaWYgKHdpZHRoID09IG51bGwgJiYgaGVpZ2h0ID09IG51bGwpIHtcbiAgICAgICAgd2lkdGggPSBpbWFnZS53aWR0aDtcbiAgICAgICAgaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuICAgIH1cbiAgICBpZiAoc3R5bGUuc1dpZHRoICYmIHN0eWxlLnNIZWlnaHQpIHtcbiAgICAgICAgdmFyIHN4ID0gc3R5bGUuc3ggfHwgMDtcbiAgICAgICAgdmFyIHN5ID0gc3R5bGUuc3kgfHwgMDtcbiAgICAgICAgY3R4LmRyYXdJbWFnZShpbWFnZSwgc3gsIHN5LCBzdHlsZS5zV2lkdGgsIHN0eWxlLnNIZWlnaHQsIHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIH1cbiAgICBlbHNlIGlmIChzdHlsZS5zeCAmJiBzdHlsZS5zeSkge1xuICAgICAgICB2YXIgc3ggPSBzdHlsZS5zeDtcbiAgICAgICAgdmFyIHN5ID0gc3R5bGUuc3k7XG4gICAgICAgIHZhciBzV2lkdGggPSB3aWR0aCAtIHN4O1xuICAgICAgICB2YXIgc0hlaWdodCA9IGhlaWdodCAtIHN5O1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCBzeCwgc3ksIHNXaWR0aCwgc0hlaWdodCwgeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBjdHguZHJhd0ltYWdlKGltYWdlLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KTtcbiAgICB9XG59XG5mdW5jdGlvbiBicnVzaFRleHQoY3R4LCBlbCwgc3R5bGUpIHtcbiAgICB2YXIgdGV4dCA9IHN0eWxlLnRleHQ7XG4gICAgdGV4dCAhPSBudWxsICYmICh0ZXh0ICs9ICcnKTtcbiAgICBpZiAodGV4dCkge1xuICAgICAgICBjdHguZm9udCA9IHN0eWxlLmZvbnQgfHwgREVGQVVMVF9GT05UO1xuICAgICAgICBjdHgudGV4dEFsaWduID0gc3R5bGUudGV4dEFsaWduO1xuICAgICAgICBjdHgudGV4dEJhc2VsaW5lID0gc3R5bGUudGV4dEJhc2VsaW5lO1xuICAgICAgICB2YXIgaGFzTGluZURhc2ggPSB2b2lkIDA7XG4gICAgICAgIGlmIChjdHguc2V0TGluZURhc2gpIHtcbiAgICAgICAgICAgIHZhciBsaW5lRGFzaCA9IHN0eWxlLmxpbmVEYXNoICYmIHN0eWxlLmxpbmVXaWR0aCA+IDAgJiYgbm9ybWFsaXplTGluZURhc2goc3R5bGUubGluZURhc2gsIHN0eWxlLmxpbmVXaWR0aCk7XG4gICAgICAgICAgICB2YXIgbGluZURhc2hPZmZzZXQgPSBzdHlsZS5saW5lRGFzaE9mZnNldDtcbiAgICAgICAgICAgIGlmIChsaW5lRGFzaCkge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lU2NhbGVfMiA9IChzdHlsZS5zdHJva2VOb1NjYWxlICYmIGVsLmdldExpbmVTY2FsZSkgPyBlbC5nZXRMaW5lU2NhbGUoKSA6IDE7XG4gICAgICAgICAgICAgICAgaWYgKGxpbmVTY2FsZV8yICYmIGxpbmVTY2FsZV8yICE9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGxpbmVEYXNoID0gbWFwKGxpbmVEYXNoLCBmdW5jdGlvbiAocmF3VmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmF3VmFsIC8gbGluZVNjYWxlXzI7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICBsaW5lRGFzaE9mZnNldCAvPSBsaW5lU2NhbGVfMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY3R4LnNldExpbmVEYXNoKGxpbmVEYXNoKTtcbiAgICAgICAgICAgICAgICBjdHgubGluZURhc2hPZmZzZXQgPSBsaW5lRGFzaE9mZnNldDtcbiAgICAgICAgICAgICAgICBoYXNMaW5lRGFzaCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0eWxlLnN0cm9rZUZpcnN0KSB7XG4gICAgICAgICAgICBpZiAoc3R5bGVIYXNTdHJva2Uoc3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgY3R4LnN0cm9rZVRleHQodGV4dCwgc3R5bGUueCwgc3R5bGUueSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoc3R5bGVIYXNGaWxsKHN0eWxlKSkge1xuICAgICAgICAgICAgICAgIGN0eC5maWxsVGV4dCh0ZXh0LCBzdHlsZS54LCBzdHlsZS55KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChzdHlsZUhhc0ZpbGwoc3R5bGUpKSB7XG4gICAgICAgICAgICAgICAgY3R4LmZpbGxUZXh0KHRleHQsIHN0eWxlLngsIHN0eWxlLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHN0eWxlSGFzU3Ryb2tlKHN0eWxlKSkge1xuICAgICAgICAgICAgICAgIGN0eC5zdHJva2VUZXh0KHRleHQsIHN0eWxlLngsIHN0eWxlLnkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNMaW5lRGFzaCkge1xuICAgICAgICAgICAgY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbnZhciBTSEFET1dfTlVNQkVSX1BST1BTID0gWydzaGFkb3dCbHVyJywgJ3NoYWRvd09mZnNldFgnLCAnc2hhZG93T2Zmc2V0WSddO1xudmFyIFNUUk9LRV9QUk9QUyA9IFtcbiAgICBbJ2xpbmVDYXAnLCAnYnV0dCddLCBbJ2xpbmVKb2luJywgJ21pdGVyJ10sIFsnbWl0ZXJMaW1pdCcsIDEwXVxuXTtcbmZ1bmN0aW9uIGJpbmRDb21tb25Qcm9wcyhjdHgsIHN0eWxlLCBwcmV2U3R5bGUsIGZvcmNlU2V0QWxsLCBzY29wZSkge1xuICAgIHZhciBzdHlsZUNoYW5nZWQgPSBmYWxzZTtcbiAgICBpZiAoIWZvcmNlU2V0QWxsKSB7XG4gICAgICAgIHByZXZTdHlsZSA9IHByZXZTdHlsZSB8fCB7fTtcbiAgICAgICAgaWYgKHN0eWxlID09PSBwcmV2U3R5bGUpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoZm9yY2VTZXRBbGwgfHwgc3R5bGUub3BhY2l0eSAhPT0gcHJldlN0eWxlLm9wYWNpdHkpIHtcbiAgICAgICAgaWYgKCFzdHlsZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGZsdXNoUGF0aERyYXduKGN0eCwgc2NvcGUpO1xuICAgICAgICAgICAgc3R5bGVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjdHguZ2xvYmFsQWxwaGEgPSBzdHlsZS5vcGFjaXR5ID09IG51bGwgPyBERUZBVUxUX0NPTU1PTl9TVFlMRS5vcGFjaXR5IDogc3R5bGUub3BhY2l0eTtcbiAgICB9XG4gICAgaWYgKGZvcmNlU2V0QWxsIHx8IHN0eWxlLmJsZW5kICE9PSBwcmV2U3R5bGUuYmxlbmQpIHtcbiAgICAgICAgaWYgKCFzdHlsZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGZsdXNoUGF0aERyYXduKGN0eCwgc2NvcGUpO1xuICAgICAgICAgICAgc3R5bGVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjdHguZ2xvYmFsQ29tcG9zaXRlT3BlcmF0aW9uID0gc3R5bGUuYmxlbmQgfHwgREVGQVVMVF9DT01NT05fU1RZTEUuYmxlbmQ7XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgU0hBRE9XX05VTUJFUl9QUk9QUy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcE5hbWUgPSBTSEFET1dfTlVNQkVSX1BST1BTW2ldO1xuICAgICAgICBpZiAoZm9yY2VTZXRBbGwgfHwgc3R5bGVbcHJvcE5hbWVdICE9PSBwcmV2U3R5bGVbcHJvcE5hbWVdKSB7XG4gICAgICAgICAgICBpZiAoIXN0eWxlQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgIGZsdXNoUGF0aERyYXduKGN0eCwgc2NvcGUpO1xuICAgICAgICAgICAgICAgIHN0eWxlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHhbcHJvcE5hbWVdID0gY3R4LmRwciAqIChzdHlsZVtwcm9wTmFtZV0gfHwgMCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKGZvcmNlU2V0QWxsIHx8IHN0eWxlLnNoYWRvd0NvbG9yICE9PSBwcmV2U3R5bGUuc2hhZG93Q29sb3IpIHtcbiAgICAgICAgaWYgKCFzdHlsZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGZsdXNoUGF0aERyYXduKGN0eCwgc2NvcGUpO1xuICAgICAgICAgICAgc3R5bGVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjdHguc2hhZG93Q29sb3IgPSBzdHlsZS5zaGFkb3dDb2xvciB8fCBERUZBVUxUX0NPTU1PTl9TVFlMRS5zaGFkb3dDb2xvcjtcbiAgICB9XG4gICAgcmV0dXJuIHN0eWxlQ2hhbmdlZDtcbn1cbmZ1bmN0aW9uIGJpbmRQYXRoQW5kVGV4dENvbW1vblN0eWxlKGN0eCwgZWwsIHByZXZFbCwgZm9yY2VTZXRBbGwsIHNjb3BlKSB7XG4gICAgdmFyIHN0eWxlID0gZ2V0U3R5bGUoZWwsIHNjb3BlLmluSG92ZXIpO1xuICAgIHZhciBwcmV2U3R5bGUgPSBmb3JjZVNldEFsbFxuICAgICAgICA/IG51bGxcbiAgICAgICAgOiAocHJldkVsICYmIGdldFN0eWxlKHByZXZFbCwgc2NvcGUuaW5Ib3ZlcikgfHwge30pO1xuICAgIGlmIChzdHlsZSA9PT0gcHJldlN0eWxlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHN0eWxlQ2hhbmdlZCA9IGJpbmRDb21tb25Qcm9wcyhjdHgsIHN0eWxlLCBwcmV2U3R5bGUsIGZvcmNlU2V0QWxsLCBzY29wZSk7XG4gICAgaWYgKGZvcmNlU2V0QWxsIHx8IHN0eWxlLmZpbGwgIT09IHByZXZTdHlsZS5maWxsKSB7XG4gICAgICAgIGlmICghc3R5bGVDaGFuZ2VkKSB7XG4gICAgICAgICAgICBmbHVzaFBhdGhEcmF3bihjdHgsIHNjb3BlKTtcbiAgICAgICAgICAgIHN0eWxlQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgY3R4LmZpbGxTdHlsZSA9IHN0eWxlLmZpbGw7XG4gICAgfVxuICAgIGlmIChmb3JjZVNldEFsbCB8fCBzdHlsZS5zdHJva2UgIT09IHByZXZTdHlsZS5zdHJva2UpIHtcbiAgICAgICAgaWYgKCFzdHlsZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIGZsdXNoUGF0aERyYXduKGN0eCwgc2NvcGUpO1xuICAgICAgICAgICAgc3R5bGVDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHlsZS5zdHJva2U7XG4gICAgfVxuICAgIGlmIChmb3JjZVNldEFsbCB8fCBzdHlsZS5vcGFjaXR5ICE9PSBwcmV2U3R5bGUub3BhY2l0eSkge1xuICAgICAgICBpZiAoIXN0eWxlQ2hhbmdlZCkge1xuICAgICAgICAgICAgZmx1c2hQYXRoRHJhd24oY3R4LCBzY29wZSk7XG4gICAgICAgICAgICBzdHlsZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIGN0eC5nbG9iYWxBbHBoYSA9IHN0eWxlLm9wYWNpdHkgPT0gbnVsbCA/IDEgOiBzdHlsZS5vcGFjaXR5O1xuICAgIH1cbiAgICBpZiAoZWwuaGFzU3Ryb2tlKCkpIHtcbiAgICAgICAgdmFyIGxpbmVXaWR0aCA9IHN0eWxlLmxpbmVXaWR0aDtcbiAgICAgICAgdmFyIG5ld0xpbmVXaWR0aCA9IGxpbmVXaWR0aCAvICgoc3R5bGUuc3Ryb2tlTm9TY2FsZSAmJiBlbCAmJiBlbC5nZXRMaW5lU2NhbGUpID8gZWwuZ2V0TGluZVNjYWxlKCkgOiAxKTtcbiAgICAgICAgaWYgKGN0eC5saW5lV2lkdGggIT09IG5ld0xpbmVXaWR0aCkge1xuICAgICAgICAgICAgaWYgKCFzdHlsZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBmbHVzaFBhdGhEcmF3bihjdHgsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICBzdHlsZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IG5ld0xpbmVXaWR0aDtcbiAgICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IFNUUk9LRV9QUk9QUy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgcHJvcCA9IFNUUk9LRV9QUk9QU1tpXTtcbiAgICAgICAgdmFyIHByb3BOYW1lID0gcHJvcFswXTtcbiAgICAgICAgaWYgKGZvcmNlU2V0QWxsIHx8IHN0eWxlW3Byb3BOYW1lXSAhPT0gcHJldlN0eWxlW3Byb3BOYW1lXSkge1xuICAgICAgICAgICAgaWYgKCFzdHlsZUNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICBmbHVzaFBhdGhEcmF3bihjdHgsIHNjb3BlKTtcbiAgICAgICAgICAgICAgICBzdHlsZUNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3R4W3Byb3BOYW1lXSA9IHN0eWxlW3Byb3BOYW1lXSB8fCBwcm9wWzFdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzdHlsZUNoYW5nZWQ7XG59XG5mdW5jdGlvbiBiaW5kSW1hZ2VTdHlsZShjdHgsIGVsLCBwcmV2RWwsIGZvcmNlU2V0QWxsLCBzY29wZSkge1xuICAgIHJldHVybiBiaW5kQ29tbW9uUHJvcHMoY3R4LCBnZXRTdHlsZShlbCwgc2NvcGUuaW5Ib3ZlciksIHByZXZFbCAmJiBnZXRTdHlsZShwcmV2RWwsIHNjb3BlLmluSG92ZXIpLCBmb3JjZVNldEFsbCwgc2NvcGUpO1xufVxuZnVuY3Rpb24gc2V0Q29udGV4dFRyYW5zZm9ybShjdHgsIGVsKSB7XG4gICAgdmFyIG0gPSBlbC50cmFuc2Zvcm07XG4gICAgdmFyIGRwciA9IGN0eC5kcHIgfHwgMTtcbiAgICBpZiAobSkge1xuICAgICAgICBjdHguc2V0VHJhbnNmb3JtKGRwciAqIG1bMF0sIGRwciAqIG1bMV0sIGRwciAqIG1bMl0sIGRwciAqIG1bM10sIGRwciAqIG1bNF0sIGRwciAqIG1bNV0pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgY3R4LnNldFRyYW5zZm9ybShkcHIsIDAsIDAsIGRwciwgMCwgMCk7XG4gICAgfVxufVxuZnVuY3Rpb24gdXBkYXRlQ2xpcFN0YXR1cyhjbGlwUGF0aHMsIGN0eCwgc2NvcGUpIHtcbiAgICB2YXIgYWxsQ2xpcHBlZCA9IGZhbHNlO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2xpcFBhdGhzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBjbGlwUGF0aCA9IGNsaXBQYXRoc1tpXTtcbiAgICAgICAgYWxsQ2xpcHBlZCA9IGFsbENsaXBwZWQgfHwgY2xpcFBhdGguaXNaZXJvQXJlYSgpO1xuICAgICAgICBzZXRDb250ZXh0VHJhbnNmb3JtKGN0eCwgY2xpcFBhdGgpO1xuICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIGNsaXBQYXRoLmJ1aWxkUGF0aChjdHgsIGNsaXBQYXRoLnNoYXBlKTtcbiAgICAgICAgY3R4LmNsaXAoKTtcbiAgICB9XG4gICAgc2NvcGUuYWxsQ2xpcHBlZCA9IGFsbENsaXBwZWQ7XG59XG5mdW5jdGlvbiBpc1RyYW5zZm9ybUNoYW5nZWQobTAsIG0xKSB7XG4gICAgaWYgKG0wICYmIG0xKSB7XG4gICAgICAgIHJldHVybiBtMFswXSAhPT0gbTFbMF1cbiAgICAgICAgICAgIHx8IG0wWzFdICE9PSBtMVsxXVxuICAgICAgICAgICAgfHwgbTBbMl0gIT09IG0xWzJdXG4gICAgICAgICAgICB8fCBtMFszXSAhPT0gbTFbM11cbiAgICAgICAgICAgIHx8IG0wWzRdICE9PSBtMVs0XVxuICAgICAgICAgICAgfHwgbTBbNV0gIT09IG0xWzVdO1xuICAgIH1cbiAgICBlbHNlIGlmICghbTAgJiYgIW0xKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG59XG52YXIgRFJBV19UWVBFX1BBVEggPSAxO1xudmFyIERSQVdfVFlQRV9JTUFHRSA9IDI7XG52YXIgRFJBV19UWVBFX1RFWFQgPSAzO1xudmFyIERSQVdfVFlQRV9JTkNSRU1FTlRBTCA9IDQ7XG5mdW5jdGlvbiBjYW5QYXRoQmF0Y2goc3R5bGUpIHtcbiAgICB2YXIgaGFzRmlsbCA9IHN0eWxlSGFzRmlsbChzdHlsZSk7XG4gICAgdmFyIGhhc1N0cm9rZSA9IHN0eWxlSGFzU3Ryb2tlKHN0eWxlKTtcbiAgICByZXR1cm4gIShzdHlsZS5saW5lRGFzaFxuICAgICAgICB8fCAhKCtoYXNGaWxsIF4gK2hhc1N0cm9rZSlcbiAgICAgICAgfHwgKGhhc0ZpbGwgJiYgdHlwZW9mIHN0eWxlLmZpbGwgIT09ICdzdHJpbmcnKVxuICAgICAgICB8fCAoaGFzU3Ryb2tlICYmIHR5cGVvZiBzdHlsZS5zdHJva2UgIT09ICdzdHJpbmcnKVxuICAgICAgICB8fCBzdHlsZS5zdHJva2VQZXJjZW50IDwgMVxuICAgICAgICB8fCBzdHlsZS5zdHJva2VPcGFjaXR5IDwgMVxuICAgICAgICB8fCBzdHlsZS5maWxsT3BhY2l0eSA8IDEpO1xufVxuZnVuY3Rpb24gZmx1c2hQYXRoRHJhd24oY3R4LCBzY29wZSkge1xuICAgIHNjb3BlLmJhdGNoRmlsbCAmJiBjdHguZmlsbCgpO1xuICAgIHNjb3BlLmJhdGNoU3Ryb2tlICYmIGN0eC5zdHJva2UoKTtcbiAgICBzY29wZS5iYXRjaEZpbGwgPSAnJztcbiAgICBzY29wZS5iYXRjaFN0cm9rZSA9ICcnO1xufVxuZnVuY3Rpb24gZ2V0U3R5bGUoZWwsIGluSG92ZXIpIHtcbiAgICByZXR1cm4gaW5Ib3ZlciA/IChlbC5fX2hvdmVyU3R5bGUgfHwgZWwuc3R5bGUpIDogZWwuc3R5bGU7XG59XG5leHBvcnQgZnVuY3Rpb24gYnJ1c2hTaW5nbGUoY3R4LCBlbCkge1xuICAgIGJydXNoKGN0eCwgZWwsIHsgaW5Ib3ZlcjogZmFsc2UsIHZpZXdXaWR0aDogMCwgdmlld0hlaWdodDogMCB9LCB0cnVlKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBicnVzaChjdHgsIGVsLCBzY29wZSwgaXNMYXN0KSB7XG4gICAgdmFyIG0gPSBlbC50cmFuc2Zvcm07XG4gICAgaWYgKCFlbC5zaG91bGRCZVBhaW50ZWQoc2NvcGUudmlld1dpZHRoLCBzY29wZS52aWV3SGVpZ2h0LCBmYWxzZSwgZmFsc2UpKSB7XG4gICAgICAgIGVsLl9fZGlydHkgJj0gfkVsZW1lbnQuUkVEQVJBV19CSVQ7XG4gICAgICAgIGVsLl9faXNSZW5kZXJlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBjbGlwUGF0aHMgPSBlbC5fX2NsaXBQYXRocztcbiAgICB2YXIgcHJldkVsQ2xpcFBhdGhzID0gc2NvcGUucHJldkVsQ2xpcFBhdGhzO1xuICAgIHZhciBmb3JjZVNldFRyYW5zZm9ybSA9IGZhbHNlO1xuICAgIHZhciBmb3JjZVNldFN0eWxlID0gZmFsc2U7XG4gICAgaWYgKCFwcmV2RWxDbGlwUGF0aHMgfHwgaXNDbGlwUGF0aENoYW5nZWQoY2xpcFBhdGhzLCBwcmV2RWxDbGlwUGF0aHMpKSB7XG4gICAgICAgIGlmIChwcmV2RWxDbGlwUGF0aHMgJiYgcHJldkVsQ2xpcFBhdGhzLmxlbmd0aCkge1xuICAgICAgICAgICAgZmx1c2hQYXRoRHJhd24oY3R4LCBzY29wZSk7XG4gICAgICAgICAgICBjdHgucmVzdG9yZSgpO1xuICAgICAgICAgICAgZm9yY2VTZXRTdHlsZSA9IGZvcmNlU2V0VHJhbnNmb3JtID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLnByZXZFbENsaXBQYXRocyA9IG51bGw7XG4gICAgICAgICAgICBzY29wZS5hbGxDbGlwcGVkID0gZmFsc2U7XG4gICAgICAgICAgICBzY29wZS5wcmV2RWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjbGlwUGF0aHMgJiYgY2xpcFBhdGhzLmxlbmd0aCkge1xuICAgICAgICAgICAgZmx1c2hQYXRoRHJhd24oY3R4LCBzY29wZSk7XG4gICAgICAgICAgICBjdHguc2F2ZSgpO1xuICAgICAgICAgICAgdXBkYXRlQ2xpcFN0YXR1cyhjbGlwUGF0aHMsIGN0eCwgc2NvcGUpO1xuICAgICAgICAgICAgZm9yY2VTZXRUcmFuc2Zvcm0gPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHNjb3BlLnByZXZFbENsaXBQYXRocyA9IGNsaXBQYXRocztcbiAgICB9XG4gICAgaWYgKHNjb3BlLmFsbENsaXBwZWQpIHtcbiAgICAgICAgZWwuX19pc1JlbmRlcmVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZWwuYmVmb3JlQnJ1c2ggJiYgZWwuYmVmb3JlQnJ1c2goKTtcbiAgICBlbC5pbm5lckJlZm9yZUJydXNoKCk7XG4gICAgdmFyIHByZXZFbCA9IHNjb3BlLnByZXZFbDtcbiAgICBpZiAoIXByZXZFbCkge1xuICAgICAgICBmb3JjZVNldFN0eWxlID0gZm9yY2VTZXRUcmFuc2Zvcm0gPSB0cnVlO1xuICAgIH1cbiAgICB2YXIgY2FuQmF0Y2hQYXRoID0gZWwgaW5zdGFuY2VvZiBQYXRoXG4gICAgICAgICYmIGVsLmF1dG9CYXRjaFxuICAgICAgICAmJiBjYW5QYXRoQmF0Y2goZWwuc3R5bGUpO1xuICAgIGlmIChmb3JjZVNldFRyYW5zZm9ybSB8fCBpc1RyYW5zZm9ybUNoYW5nZWQobSwgcHJldkVsLnRyYW5zZm9ybSkpIHtcbiAgICAgICAgZmx1c2hQYXRoRHJhd24oY3R4LCBzY29wZSk7XG4gICAgICAgIHNldENvbnRleHRUcmFuc2Zvcm0oY3R4LCBlbCk7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFjYW5CYXRjaFBhdGgpIHtcbiAgICAgICAgZmx1c2hQYXRoRHJhd24oY3R4LCBzY29wZSk7XG4gICAgfVxuICAgIHZhciBzdHlsZSA9IGdldFN0eWxlKGVsLCBzY29wZS5pbkhvdmVyKTtcbiAgICBpZiAoZWwgaW5zdGFuY2VvZiBQYXRoKSB7XG4gICAgICAgIGlmIChzY29wZS5sYXN0RHJhd1R5cGUgIT09IERSQVdfVFlQRV9QQVRIKSB7XG4gICAgICAgICAgICBmb3JjZVNldFN0eWxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHNjb3BlLmxhc3REcmF3VHlwZSA9IERSQVdfVFlQRV9QQVRIO1xuICAgICAgICB9XG4gICAgICAgIGJpbmRQYXRoQW5kVGV4dENvbW1vblN0eWxlKGN0eCwgZWwsIHByZXZFbCwgZm9yY2VTZXRTdHlsZSwgc2NvcGUpO1xuICAgICAgICBpZiAoIWNhbkJhdGNoUGF0aCB8fCAoIXNjb3BlLmJhdGNoRmlsbCAmJiAhc2NvcGUuYmF0Y2hTdHJva2UpKSB7XG4gICAgICAgICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIH1cbiAgICAgICAgYnJ1c2hQYXRoKGN0eCwgZWwsIHN0eWxlLCBjYW5CYXRjaFBhdGgpO1xuICAgICAgICBpZiAoY2FuQmF0Y2hQYXRoKSB7XG4gICAgICAgICAgICBzY29wZS5iYXRjaEZpbGwgPSBzdHlsZS5maWxsIHx8ICcnO1xuICAgICAgICAgICAgc2NvcGUuYmF0Y2hTdHJva2UgPSBzdHlsZS5zdHJva2UgfHwgJyc7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGlmIChlbCBpbnN0YW5jZW9mIFRTcGFuKSB7XG4gICAgICAgICAgICBpZiAoc2NvcGUubGFzdERyYXdUeXBlICE9PSBEUkFXX1RZUEVfVEVYVCkge1xuICAgICAgICAgICAgICAgIGZvcmNlU2V0U3R5bGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNjb3BlLmxhc3REcmF3VHlwZSA9IERSQVdfVFlQRV9URVhUO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmluZFBhdGhBbmRUZXh0Q29tbW9uU3R5bGUoY3R4LCBlbCwgcHJldkVsLCBmb3JjZVNldFN0eWxlLCBzY29wZSk7XG4gICAgICAgICAgICBicnVzaFRleHQoY3R4LCBlbCwgc3R5bGUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGVsIGluc3RhbmNlb2YgWlJJbWFnZSkge1xuICAgICAgICAgICAgaWYgKHNjb3BlLmxhc3REcmF3VHlwZSAhPT0gRFJBV19UWVBFX0lNQUdFKSB7XG4gICAgICAgICAgICAgICAgZm9yY2VTZXRTdHlsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgc2NvcGUubGFzdERyYXdUeXBlID0gRFJBV19UWVBFX0lNQUdFO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYmluZEltYWdlU3R5bGUoY3R4LCBlbCwgcHJldkVsLCBmb3JjZVNldFN0eWxlLCBzY29wZSk7XG4gICAgICAgICAgICBicnVzaEltYWdlKGN0eCwgZWwsIHN0eWxlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChlbCBpbnN0YW5jZW9mIEluY3JlbWVudGFsRGlzcGxheWFibGUpIHtcbiAgICAgICAgICAgIGlmIChzY29wZS5sYXN0RHJhd1R5cGUgIT09IERSQVdfVFlQRV9JTkNSRU1FTlRBTCkge1xuICAgICAgICAgICAgICAgIGZvcmNlU2V0U3R5bGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNjb3BlLmxhc3REcmF3VHlwZSA9IERSQVdfVFlQRV9JTkNSRU1FTlRBTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJydXNoSW5jcmVtZW50YWwoY3R4LCBlbCwgc2NvcGUpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChjYW5CYXRjaFBhdGggJiYgaXNMYXN0KSB7XG4gICAgICAgIGZsdXNoUGF0aERyYXduKGN0eCwgc2NvcGUpO1xuICAgIH1cbiAgICBlbC5pbm5lckFmdGVyQnJ1c2goKTtcbiAgICBlbC5hZnRlckJydXNoICYmIGVsLmFmdGVyQnJ1c2goKTtcbiAgICBzY29wZS5wcmV2RWwgPSBlbDtcbiAgICBlbC5fX2RpcnR5ID0gMDtcbiAgICBlbC5fX2lzUmVuZGVyZWQgPSB0cnVlO1xufVxuZnVuY3Rpb24gYnJ1c2hJbmNyZW1lbnRhbChjdHgsIGVsLCBzY29wZSkge1xuICAgIHZhciBkaXNwbGF5YWJsZXMgPSBlbC5nZXREaXNwbGF5YWJsZXMoKTtcbiAgICB2YXIgdGVtcG9yYWxEaXNwbGF5YWJsZXMgPSBlbC5nZXRUZW1wb3JhbERpc3BsYXlhYmxlcygpO1xuICAgIGN0eC5zYXZlKCk7XG4gICAgdmFyIGlubmVyU2NvcGUgPSB7XG4gICAgICAgIHByZXZFbENsaXBQYXRoczogbnVsbCxcbiAgICAgICAgcHJldkVsOiBudWxsLFxuICAgICAgICBhbGxDbGlwcGVkOiBmYWxzZSxcbiAgICAgICAgdmlld1dpZHRoOiBzY29wZS52aWV3V2lkdGgsXG4gICAgICAgIHZpZXdIZWlnaHQ6IHNjb3BlLnZpZXdIZWlnaHQsXG4gICAgICAgIGluSG92ZXI6IHNjb3BlLmluSG92ZXJcbiAgICB9O1xuICAgIHZhciBpO1xuICAgIHZhciBsZW47XG4gICAgZm9yIChpID0gZWwuZ2V0Q3Vyc29yKCksIGxlbiA9IGRpc3BsYXlhYmxlcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YXIgZGlzcGxheWFibGUgPSBkaXNwbGF5YWJsZXNbaV07XG4gICAgICAgIGRpc3BsYXlhYmxlLmJlZm9yZUJydXNoICYmIGRpc3BsYXlhYmxlLmJlZm9yZUJydXNoKCk7XG4gICAgICAgIGRpc3BsYXlhYmxlLmlubmVyQmVmb3JlQnJ1c2goKTtcbiAgICAgICAgYnJ1c2goY3R4LCBkaXNwbGF5YWJsZSwgaW5uZXJTY29wZSwgaSA9PT0gbGVuIC0gMSk7XG4gICAgICAgIGRpc3BsYXlhYmxlLmlubmVyQWZ0ZXJCcnVzaCgpO1xuICAgICAgICBkaXNwbGF5YWJsZS5hZnRlckJydXNoICYmIGRpc3BsYXlhYmxlLmFmdGVyQnJ1c2goKTtcbiAgICAgICAgaW5uZXJTY29wZS5wcmV2RWwgPSBkaXNwbGF5YWJsZTtcbiAgICB9XG4gICAgZm9yICh2YXIgaV8xID0gMCwgbGVuXzEgPSB0ZW1wb3JhbERpc3BsYXlhYmxlcy5sZW5ndGg7IGlfMSA8IGxlbl8xOyBpXzErKykge1xuICAgICAgICB2YXIgZGlzcGxheWFibGUgPSB0ZW1wb3JhbERpc3BsYXlhYmxlc1tpXzFdO1xuICAgICAgICBkaXNwbGF5YWJsZS5iZWZvcmVCcnVzaCAmJiBkaXNwbGF5YWJsZS5iZWZvcmVCcnVzaCgpO1xuICAgICAgICBkaXNwbGF5YWJsZS5pbm5lckJlZm9yZUJydXNoKCk7XG4gICAgICAgIGJydXNoKGN0eCwgZGlzcGxheWFibGUsIGlubmVyU2NvcGUsIGlfMSA9PT0gbGVuXzEgLSAxKTtcbiAgICAgICAgZGlzcGxheWFibGUuaW5uZXJBZnRlckJydXNoKCk7XG4gICAgICAgIGRpc3BsYXlhYmxlLmFmdGVyQnJ1c2ggJiYgZGlzcGxheWFibGUuYWZ0ZXJCcnVzaCgpO1xuICAgICAgICBpbm5lclNjb3BlLnByZXZFbCA9IGRpc3BsYXlhYmxlO1xuICAgIH1cbiAgICBlbC5jbGVhclRlbXBvcmFsRGlzcGxheWFibGVzKCk7XG4gICAgZWwubm90Q2xlYXIgPSB0cnVlO1xuICAgIGN0eC5yZXN0b3JlKCk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gY3JlYXRlTGluZWFyR3JhZGllbnQoY3R4LCBvYmosIHJlY3QpIHtcbiAgICB2YXIgeCA9IG9iai54ID09IG51bGwgPyAwIDogb2JqLng7XG4gICAgdmFyIHgyID0gb2JqLngyID09IG51bGwgPyAxIDogb2JqLngyO1xuICAgIHZhciB5ID0gb2JqLnkgPT0gbnVsbCA/IDAgOiBvYmoueTtcbiAgICB2YXIgeTIgPSBvYmoueTIgPT0gbnVsbCA/IDAgOiBvYmoueTI7XG4gICAgaWYgKCFvYmouZ2xvYmFsKSB7XG4gICAgICAgIHggPSB4ICogcmVjdC53aWR0aCArIHJlY3QueDtcbiAgICAgICAgeDIgPSB4MiAqIHJlY3Qud2lkdGggKyByZWN0Lng7XG4gICAgICAgIHkgPSB5ICogcmVjdC5oZWlnaHQgKyByZWN0Lnk7XG4gICAgICAgIHkyID0geTIgKiByZWN0LmhlaWdodCArIHJlY3QueTtcbiAgICB9XG4gICAgeCA9IGlzTmFOKHgpID8gMCA6IHg7XG4gICAgeDIgPSBpc05hTih4MikgPyAxIDogeDI7XG4gICAgeSA9IGlzTmFOKHkpID8gMCA6IHk7XG4gICAgeTIgPSBpc05hTih5MikgPyAwIDogeTI7XG4gICAgdmFyIGNhbnZhc0dyYWRpZW50ID0gY3R4LmNyZWF0ZUxpbmVhckdyYWRpZW50KHgsIHksIHgyLCB5Mik7XG4gICAgcmV0dXJuIGNhbnZhc0dyYWRpZW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJhZGlhbEdyYWRpZW50KGN0eCwgb2JqLCByZWN0KSB7XG4gICAgdmFyIHdpZHRoID0gcmVjdC53aWR0aDtcbiAgICB2YXIgaGVpZ2h0ID0gcmVjdC5oZWlnaHQ7XG4gICAgdmFyIG1pbiA9IE1hdGgubWluKHdpZHRoLCBoZWlnaHQpO1xuICAgIHZhciB4ID0gb2JqLnggPT0gbnVsbCA/IDAuNSA6IG9iai54O1xuICAgIHZhciB5ID0gb2JqLnkgPT0gbnVsbCA/IDAuNSA6IG9iai55O1xuICAgIHZhciByID0gb2JqLnIgPT0gbnVsbCA/IDAuNSA6IG9iai5yO1xuICAgIGlmICghb2JqLmdsb2JhbCkge1xuICAgICAgICB4ID0geCAqIHdpZHRoICsgcmVjdC54O1xuICAgICAgICB5ID0geSAqIGhlaWdodCArIHJlY3QueTtcbiAgICAgICAgciA9IHIgKiBtaW47XG4gICAgfVxuICAgIHZhciBjYW52YXNHcmFkaWVudCA9IGN0eC5jcmVhdGVSYWRpYWxHcmFkaWVudCh4LCB5LCAwLCB4LCB5LCByKTtcbiAgICByZXR1cm4gY2FudmFzR3JhZGllbnQ7XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0Q2FudmFzR3JhZGllbnQoY3R4LCBvYmosIHJlY3QpIHtcbiAgICB2YXIgY2FudmFzR3JhZGllbnQgPSBvYmoudHlwZSA9PT0gJ3JhZGlhbCdcbiAgICAgICAgPyBjcmVhdGVSYWRpYWxHcmFkaWVudChjdHgsIG9iaiwgcmVjdClcbiAgICAgICAgOiBjcmVhdGVMaW5lYXJHcmFkaWVudChjdHgsIG9iaiwgcmVjdCk7XG4gICAgdmFyIGNvbG9yU3RvcHMgPSBvYmouY29sb3JTdG9wcztcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbG9yU3RvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY2FudmFzR3JhZGllbnQuYWRkQ29sb3JTdG9wKGNvbG9yU3RvcHNbaV0ub2Zmc2V0LCBjb2xvclN0b3BzW2ldLmNvbG9yKTtcbiAgICB9XG4gICAgcmV0dXJuIGNhbnZhc0dyYWRpZW50O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2xpcFBhdGhDaGFuZ2VkKGNsaXBQYXRocywgcHJldkNsaXBQYXRocykge1xuICAgIGlmIChjbGlwUGF0aHMgPT09IHByZXZDbGlwUGF0aHMgfHwgKCFjbGlwUGF0aHMgJiYgIXByZXZDbGlwUGF0aHMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFjbGlwUGF0aHMgfHwgIXByZXZDbGlwUGF0aHMgfHwgKGNsaXBQYXRocy5sZW5ndGggIT09IHByZXZDbGlwUGF0aHMubGVuZ3RoKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjbGlwUGF0aHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGNsaXBQYXRoc1tpXSAhPT0gcHJldkNsaXBQYXRoc1tpXSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuIiwidmFyIGRwciA9IDE7XG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBkcHIgPSBNYXRoLm1heCh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpb1xuICAgICAgICB8fCAod2luZG93LnNjcmVlbiAmJiB3aW5kb3cuc2NyZWVuLmRldmljZVhEUEkgLyB3aW5kb3cuc2NyZWVuLmxvZ2ljYWxYRFBJKVxuICAgICAgICB8fCAxLCAxKTtcbn1cbmV4cG9ydCB2YXIgZGVidWdNb2RlID0gMDtcbmV4cG9ydCB2YXIgZGV2aWNlUGl4ZWxSYXRpbyA9IGRwcjtcbmV4cG9ydCB2YXIgREFSS19NT0RFX1RIUkVTSE9MRCA9IDAuNDtcbmV4cG9ydCB2YXIgREFSS19MQUJFTF9DT0xPUiA9ICcjMzMzJztcbmV4cG9ydCB2YXIgTElHSFRfTEFCRUxfQ09MT1IgPSAnI2NjYyc7XG5leHBvcnQgdmFyIExJR0hURVJfTEFCRUxfQ09MT1IgPSAnI2VlZSc7XG4iLCJpbXBvcnQgeyBub3JtYWxpemVSYWRpYW4gfSBmcm9tICcuL3V0aWwnO1xudmFyIFBJMiA9IE1hdGguUEkgKiAyO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5TdHJva2UoY3gsIGN5LCByLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZSwgbGluZVdpZHRoLCB4LCB5KSB7XG4gICAgaWYgKGxpbmVXaWR0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBfbCA9IGxpbmVXaWR0aDtcbiAgICB4IC09IGN4O1xuICAgIHkgLT0gY3k7XG4gICAgdmFyIGQgPSBNYXRoLnNxcnQoeCAqIHggKyB5ICogeSk7XG4gICAgaWYgKChkIC0gX2wgPiByKSB8fCAoZCArIF9sIDwgcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoTWF0aC5hYnMoc3RhcnRBbmdsZSAtIGVuZEFuZ2xlKSAlIFBJMiA8IDFlLTQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChhbnRpY2xvY2t3aXNlKSB7XG4gICAgICAgIHZhciB0bXAgPSBzdGFydEFuZ2xlO1xuICAgICAgICBzdGFydEFuZ2xlID0gbm9ybWFsaXplUmFkaWFuKGVuZEFuZ2xlKTtcbiAgICAgICAgZW5kQW5nbGUgPSBub3JtYWxpemVSYWRpYW4odG1wKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHN0YXJ0QW5nbGUgPSBub3JtYWxpemVSYWRpYW4oc3RhcnRBbmdsZSk7XG4gICAgICAgIGVuZEFuZ2xlID0gbm9ybWFsaXplUmFkaWFuKGVuZEFuZ2xlKTtcbiAgICB9XG4gICAgaWYgKHN0YXJ0QW5nbGUgPiBlbmRBbmdsZSkge1xuICAgICAgICBlbmRBbmdsZSArPSBQSTI7XG4gICAgfVxuICAgIHZhciBhbmdsZSA9IE1hdGguYXRhbjIoeSwgeCk7XG4gICAgaWYgKGFuZ2xlIDwgMCkge1xuICAgICAgICBhbmdsZSArPSBQSTI7XG4gICAgfVxuICAgIHJldHVybiAoYW5nbGUgPj0gc3RhcnRBbmdsZSAmJiBhbmdsZSA8PSBlbmRBbmdsZSlcbiAgICAgICAgfHwgKGFuZ2xlICsgUEkyID49IHN0YXJ0QW5nbGUgJiYgYW5nbGUgKyBQSTIgPD0gZW5kQW5nbGUpO1xufVxuIiwiaW1wb3J0ICogYXMgY3VydmUgZnJvbSAnLi4vY29yZS9jdXJ2ZSc7XG5leHBvcnQgZnVuY3Rpb24gY29udGFpblN0cm9rZSh4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIGxpbmVXaWR0aCwgeCwgeSkge1xuICAgIGlmIChsaW5lV2lkdGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgX2wgPSBsaW5lV2lkdGg7XG4gICAgaWYgKCh5ID4geTAgKyBfbCAmJiB5ID4geTEgKyBfbCAmJiB5ID4geTIgKyBfbCAmJiB5ID4geTMgKyBfbClcbiAgICAgICAgfHwgKHkgPCB5MCAtIF9sICYmIHkgPCB5MSAtIF9sICYmIHkgPCB5MiAtIF9sICYmIHkgPCB5MyAtIF9sKVxuICAgICAgICB8fCAoeCA+IHgwICsgX2wgJiYgeCA+IHgxICsgX2wgJiYgeCA+IHgyICsgX2wgJiYgeCA+IHgzICsgX2wpXG4gICAgICAgIHx8ICh4IDwgeDAgLSBfbCAmJiB4IDwgeDEgLSBfbCAmJiB4IDwgeDIgLSBfbCAmJiB4IDwgeDMgLSBfbCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgZCA9IGN1cnZlLmN1YmljUHJvamVjdFBvaW50KHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsIHgzLCB5MywgeCwgeSwgbnVsbCk7XG4gICAgcmV0dXJuIGQgPD0gX2wgLyAyO1xufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5TdHJva2UoeDAsIHkwLCB4MSwgeTEsIGxpbmVXaWR0aCwgeCwgeSkge1xuICAgIGlmIChsaW5lV2lkdGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgX2wgPSBsaW5lV2lkdGg7XG4gICAgdmFyIF9hID0gMDtcbiAgICB2YXIgX2IgPSB4MDtcbiAgICBpZiAoKHkgPiB5MCArIF9sICYmIHkgPiB5MSArIF9sKVxuICAgICAgICB8fCAoeSA8IHkwIC0gX2wgJiYgeSA8IHkxIC0gX2wpXG4gICAgICAgIHx8ICh4ID4geDAgKyBfbCAmJiB4ID4geDEgKyBfbClcbiAgICAgICAgfHwgKHggPCB4MCAtIF9sICYmIHggPCB4MSAtIF9sKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh4MCAhPT0geDEpIHtcbiAgICAgICAgX2EgPSAoeTAgLSB5MSkgLyAoeDAgLSB4MSk7XG4gICAgICAgIF9iID0gKHgwICogeTEgLSB4MSAqIHkwKSAvICh4MCAtIHgxKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBNYXRoLmFicyh4IC0geDApIDw9IF9sIC8gMjtcbiAgICB9XG4gICAgdmFyIHRtcCA9IF9hICogeCAtIHkgKyBfYjtcbiAgICB2YXIgX3MgPSB0bXAgKiB0bXAgLyAoX2EgKiBfYSArIDEpO1xuICAgIHJldHVybiBfcyA8PSBfbCAvIDIgKiBfbCAvIDI7XG59XG4iLCJpbXBvcnQgUGF0aFByb3h5IGZyb20gJy4uL2NvcmUvUGF0aFByb3h5JztcbmltcG9ydCAqIGFzIGxpbmUgZnJvbSAnLi9saW5lJztcbmltcG9ydCAqIGFzIGN1YmljIGZyb20gJy4vY3ViaWMnO1xuaW1wb3J0ICogYXMgcXVhZHJhdGljIGZyb20gJy4vcXVhZHJhdGljJztcbmltcG9ydCAqIGFzIGFyYyBmcm9tICcuL2FyYyc7XG5pbXBvcnQgKiBhcyBjdXJ2ZSBmcm9tICcuLi9jb3JlL2N1cnZlJztcbmltcG9ydCB3aW5kaW5nTGluZSBmcm9tICcuL3dpbmRpbmdMaW5lJztcbnZhciBDTUQgPSBQYXRoUHJveHkuQ01EO1xudmFyIFBJMiA9IE1hdGguUEkgKiAyO1xudmFyIEVQU0lMT04gPSAxZS00O1xuZnVuY3Rpb24gaXNBcm91bmRFcXVhbChhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8IEVQU0lMT047XG59XG52YXIgcm9vdHMgPSBbLTEsIC0xLCAtMV07XG52YXIgZXh0cmVtYSA9IFstMSwgLTFdO1xuZnVuY3Rpb24gc3dhcEV4dHJlbWEoKSB7XG4gICAgdmFyIHRtcCA9IGV4dHJlbWFbMF07XG4gICAgZXh0cmVtYVswXSA9IGV4dHJlbWFbMV07XG4gICAgZXh0cmVtYVsxXSA9IHRtcDtcbn1cbmZ1bmN0aW9uIHdpbmRpbmdDdWJpYyh4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIHgsIHkpIHtcbiAgICBpZiAoKHkgPiB5MCAmJiB5ID4geTEgJiYgeSA+IHkyICYmIHkgPiB5MylcbiAgICAgICAgfHwgKHkgPCB5MCAmJiB5IDwgeTEgJiYgeSA8IHkyICYmIHkgPCB5MykpIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIHZhciBuUm9vdHMgPSBjdXJ2ZS5jdWJpY1Jvb3RBdCh5MCwgeTEsIHkyLCB5MywgeSwgcm9vdHMpO1xuICAgIGlmIChuUm9vdHMgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICB2YXIgdyA9IDA7XG4gICAgICAgIHZhciBuRXh0cmVtYSA9IC0xO1xuICAgICAgICB2YXIgeTBfID0gdm9pZCAwO1xuICAgICAgICB2YXIgeTFfID0gdm9pZCAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5Sb290czsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgdCA9IHJvb3RzW2ldO1xuICAgICAgICAgICAgdmFyIHVuaXQgPSAodCA9PT0gMCB8fCB0ID09PSAxKSA/IDAuNSA6IDE7XG4gICAgICAgICAgICB2YXIgeF8gPSBjdXJ2ZS5jdWJpY0F0KHgwLCB4MSwgeDIsIHgzLCB0KTtcbiAgICAgICAgICAgIGlmICh4XyA8IHgpIHtcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuRXh0cmVtYSA8IDApIHtcbiAgICAgICAgICAgICAgICBuRXh0cmVtYSA9IGN1cnZlLmN1YmljRXh0cmVtYSh5MCwgeTEsIHkyLCB5MywgZXh0cmVtYSk7XG4gICAgICAgICAgICAgICAgaWYgKGV4dHJlbWFbMV0gPCBleHRyZW1hWzBdICYmIG5FeHRyZW1hID4gMSkge1xuICAgICAgICAgICAgICAgICAgICBzd2FwRXh0cmVtYSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB5MF8gPSBjdXJ2ZS5jdWJpY0F0KHkwLCB5MSwgeTIsIHkzLCBleHRyZW1hWzBdKTtcbiAgICAgICAgICAgICAgICBpZiAobkV4dHJlbWEgPiAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHkxXyA9IGN1cnZlLmN1YmljQXQoeTAsIHkxLCB5MiwgeTMsIGV4dHJlbWFbMV0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChuRXh0cmVtYSA9PT0gMikge1xuICAgICAgICAgICAgICAgIGlmICh0IDwgZXh0cmVtYVswXSkge1xuICAgICAgICAgICAgICAgICAgICB3ICs9IHkwXyA8IHkwID8gdW5pdCA6IC11bml0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmICh0IDwgZXh0cmVtYVsxXSkge1xuICAgICAgICAgICAgICAgICAgICB3ICs9IHkxXyA8IHkwXyA/IHVuaXQgOiAtdW5pdDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHcgKz0geTMgPCB5MV8gPyB1bml0IDogLXVuaXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHQgPCBleHRyZW1hWzBdKSB7XG4gICAgICAgICAgICAgICAgICAgIHcgKz0geTBfIDwgeTAgPyB1bml0IDogLXVuaXQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3ICs9IHkzIDwgeTBfID8gdW5pdCA6IC11bml0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdztcbiAgICB9XG59XG5mdW5jdGlvbiB3aW5kaW5nUXVhZHJhdGljKHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsIHgsIHkpIHtcbiAgICBpZiAoKHkgPiB5MCAmJiB5ID4geTEgJiYgeSA+IHkyKVxuICAgICAgICB8fCAoeSA8IHkwICYmIHkgPCB5MSAmJiB5IDwgeTIpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB2YXIgblJvb3RzID0gY3VydmUucXVhZHJhdGljUm9vdEF0KHkwLCB5MSwgeTIsIHksIHJvb3RzKTtcbiAgICBpZiAoblJvb3RzID09PSAwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIHQgPSBjdXJ2ZS5xdWFkcmF0aWNFeHRyZW11bSh5MCwgeTEsIHkyKTtcbiAgICAgICAgaWYgKHQgPj0gMCAmJiB0IDw9IDEpIHtcbiAgICAgICAgICAgIHZhciB3ID0gMDtcbiAgICAgICAgICAgIHZhciB5XyA9IGN1cnZlLnF1YWRyYXRpY0F0KHkwLCB5MSwgeTIsIHQpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuUm9vdHM7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciB1bml0ID0gKHJvb3RzW2ldID09PSAwIHx8IHJvb3RzW2ldID09PSAxKSA/IDAuNSA6IDE7XG4gICAgICAgICAgICAgICAgdmFyIHhfID0gY3VydmUucXVhZHJhdGljQXQoeDAsIHgxLCB4Miwgcm9vdHNbaV0pO1xuICAgICAgICAgICAgICAgIGlmICh4XyA8IHgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyb290c1tpXSA8IHQpIHtcbiAgICAgICAgICAgICAgICAgICAgdyArPSB5XyA8IHkwID8gdW5pdCA6IC11bml0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdyArPSB5MiA8IHlfID8gdW5pdCA6IC11bml0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB3O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHVuaXQgPSAocm9vdHNbMF0gPT09IDAgfHwgcm9vdHNbMF0gPT09IDEpID8gMC41IDogMTtcbiAgICAgICAgICAgIHZhciB4XyA9IGN1cnZlLnF1YWRyYXRpY0F0KHgwLCB4MSwgeDIsIHJvb3RzWzBdKTtcbiAgICAgICAgICAgIGlmICh4XyA8IHgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB5MiA8IHkwID8gdW5pdCA6IC11bml0O1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gd2luZGluZ0FyYyhjeCwgY3ksIHIsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBhbnRpY2xvY2t3aXNlLCB4LCB5KSB7XG4gICAgeSAtPSBjeTtcbiAgICBpZiAoeSA+IHIgfHwgeSA8IC1yKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB2YXIgdG1wID0gTWF0aC5zcXJ0KHIgKiByIC0geSAqIHkpO1xuICAgIHJvb3RzWzBdID0gLXRtcDtcbiAgICByb290c1sxXSA9IHRtcDtcbiAgICB2YXIgZFRoZXRhID0gTWF0aC5hYnMoc3RhcnRBbmdsZSAtIGVuZEFuZ2xlKTtcbiAgICBpZiAoZFRoZXRhIDwgMWUtNCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG4gICAgaWYgKGRUaGV0YSA+PSBQSTIgLSAxZS00KSB7XG4gICAgICAgIHN0YXJ0QW5nbGUgPSAwO1xuICAgICAgICBlbmRBbmdsZSA9IFBJMjtcbiAgICAgICAgdmFyIGRpciA9IGFudGljbG9ja3dpc2UgPyAxIDogLTE7XG4gICAgICAgIGlmICh4ID49IHJvb3RzWzBdICsgY3ggJiYgeCA8PSByb290c1sxXSArIGN4KSB7XG4gICAgICAgICAgICByZXR1cm4gZGlyO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHN0YXJ0QW5nbGUgPiBlbmRBbmdsZSkge1xuICAgICAgICB2YXIgdG1wXzEgPSBzdGFydEFuZ2xlO1xuICAgICAgICBzdGFydEFuZ2xlID0gZW5kQW5nbGU7XG4gICAgICAgIGVuZEFuZ2xlID0gdG1wXzE7XG4gICAgfVxuICAgIGlmIChzdGFydEFuZ2xlIDwgMCkge1xuICAgICAgICBzdGFydEFuZ2xlICs9IFBJMjtcbiAgICAgICAgZW5kQW5nbGUgKz0gUEkyO1xuICAgIH1cbiAgICB2YXIgdyA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyOyBpKyspIHtcbiAgICAgICAgdmFyIHhfID0gcm9vdHNbaV07XG4gICAgICAgIGlmICh4XyArIGN4ID4geCkge1xuICAgICAgICAgICAgdmFyIGFuZ2xlID0gTWF0aC5hdGFuMih5LCB4Xyk7XG4gICAgICAgICAgICB2YXIgZGlyID0gYW50aWNsb2Nrd2lzZSA/IDEgOiAtMTtcbiAgICAgICAgICAgIGlmIChhbmdsZSA8IDApIHtcbiAgICAgICAgICAgICAgICBhbmdsZSA9IFBJMiArIGFuZ2xlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKChhbmdsZSA+PSBzdGFydEFuZ2xlICYmIGFuZ2xlIDw9IGVuZEFuZ2xlKVxuICAgICAgICAgICAgICAgIHx8IChhbmdsZSArIFBJMiA+PSBzdGFydEFuZ2xlICYmIGFuZ2xlICsgUEkyIDw9IGVuZEFuZ2xlKSkge1xuICAgICAgICAgICAgICAgIGlmIChhbmdsZSA+IE1hdGguUEkgLyAyICYmIGFuZ2xlIDwgTWF0aC5QSSAqIDEuNSkge1xuICAgICAgICAgICAgICAgICAgICBkaXIgPSAtZGlyO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3ICs9IGRpcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdztcbn1cbmZ1bmN0aW9uIGNvbnRhaW5QYXRoKHBhdGgsIGxpbmVXaWR0aCwgaXNTdHJva2UsIHgsIHkpIHtcbiAgICB2YXIgZGF0YSA9IHBhdGguZGF0YTtcbiAgICB2YXIgbGVuID0gcGF0aC5sZW4oKTtcbiAgICB2YXIgdyA9IDA7XG4gICAgdmFyIHhpID0gMDtcbiAgICB2YXIgeWkgPSAwO1xuICAgIHZhciB4MCA9IDA7XG4gICAgdmFyIHkwID0gMDtcbiAgICB2YXIgeDE7XG4gICAgdmFyIHkxO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOykge1xuICAgICAgICB2YXIgY21kID0gZGF0YVtpKytdO1xuICAgICAgICB2YXIgaXNGaXJzdCA9IGkgPT09IDE7XG4gICAgICAgIGlmIChjbWQgPT09IENNRC5NICYmIGkgPiAxKSB7XG4gICAgICAgICAgICBpZiAoIWlzU3Ryb2tlKSB7XG4gICAgICAgICAgICAgICAgdyArPSB3aW5kaW5nTGluZSh4aSwgeWksIHgwLCB5MCwgeCwgeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgICAgIHhpID0gZGF0YVtpXTtcbiAgICAgICAgICAgIHlpID0gZGF0YVtpICsgMV07XG4gICAgICAgICAgICB4MCA9IHhpO1xuICAgICAgICAgICAgeTAgPSB5aTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKGNtZCkge1xuICAgICAgICAgICAgY2FzZSBDTUQuTTpcbiAgICAgICAgICAgICAgICB4MCA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICB5MCA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICB4aSA9IHgwO1xuICAgICAgICAgICAgICAgIHlpID0geTA7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENNRC5MOlxuICAgICAgICAgICAgICAgIGlmIChpc1N0cm9rZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5jb250YWluU3Ryb2tlKHhpLCB5aSwgZGF0YVtpXSwgZGF0YVtpICsgMV0sIGxpbmVXaWR0aCwgeCwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3ICs9IHdpbmRpbmdMaW5lKHhpLCB5aSwgZGF0YVtpXSwgZGF0YVtpICsgMV0sIHgsIHkpIHx8IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHhpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgIHlpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBDTUQuQzpcbiAgICAgICAgICAgICAgICBpZiAoaXNTdHJva2UpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGN1YmljLmNvbnRhaW5TdHJva2UoeGksIHlpLCBkYXRhW2krK10sIGRhdGFbaSsrXSwgZGF0YVtpKytdLCBkYXRhW2krK10sIGRhdGFbaV0sIGRhdGFbaSArIDFdLCBsaW5lV2lkdGgsIHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdyArPSB3aW5kaW5nQ3ViaWMoeGksIHlpLCBkYXRhW2krK10sIGRhdGFbaSsrXSwgZGF0YVtpKytdLCBkYXRhW2krK10sIGRhdGFbaV0sIGRhdGFbaSArIDFdLCB4LCB5KSB8fCAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB4aSA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICB5aSA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ01ELlE6XG4gICAgICAgICAgICAgICAgaWYgKGlzU3Ryb2tlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChxdWFkcmF0aWMuY29udGFpblN0cm9rZSh4aSwgeWksIGRhdGFbaSsrXSwgZGF0YVtpKytdLCBkYXRhW2ldLCBkYXRhW2kgKyAxXSwgbGluZVdpZHRoLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHcgKz0gd2luZGluZ1F1YWRyYXRpYyh4aSwgeWksIGRhdGFbaSsrXSwgZGF0YVtpKytdLCBkYXRhW2ldLCBkYXRhW2kgKyAxXSwgeCwgeSkgfHwgMDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeGkgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgeWkgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIENNRC5BOlxuICAgICAgICAgICAgICAgIHZhciBjeCA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICB2YXIgY3kgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgdmFyIHJ4ID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgIHZhciByeSA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICB2YXIgdGhldGEgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgdmFyIGRUaGV0YSA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICAgICAgdmFyIGFudGljbG9ja3dpc2UgPSAhISgxIC0gZGF0YVtpKytdKTtcbiAgICAgICAgICAgICAgICB4MSA9IE1hdGguY29zKHRoZXRhKSAqIHJ4ICsgY3g7XG4gICAgICAgICAgICAgICAgeTEgPSBNYXRoLnNpbih0aGV0YSkgKiByeSArIGN5O1xuICAgICAgICAgICAgICAgIGlmICghaXNGaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICB3ICs9IHdpbmRpbmdMaW5lKHhpLCB5aSwgeDEsIHkxLCB4LCB5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHgwID0geDE7XG4gICAgICAgICAgICAgICAgICAgIHkwID0geTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBfeCA9ICh4IC0gY3gpICogcnkgLyByeCArIGN4O1xuICAgICAgICAgICAgICAgIGlmIChpc1N0cm9rZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoYXJjLmNvbnRhaW5TdHJva2UoY3gsIGN5LCByeSwgdGhldGEsIHRoZXRhICsgZFRoZXRhLCBhbnRpY2xvY2t3aXNlLCBsaW5lV2lkdGgsIF94LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHcgKz0gd2luZGluZ0FyYyhjeCwgY3ksIHJ5LCB0aGV0YSwgdGhldGEgKyBkVGhldGEsIGFudGljbG9ja3dpc2UsIF94LCB5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeGkgPSBNYXRoLmNvcyh0aGV0YSArIGRUaGV0YSkgKiByeCArIGN4O1xuICAgICAgICAgICAgICAgIHlpID0gTWF0aC5zaW4odGhldGEgKyBkVGhldGEpICogcnkgKyBjeTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ01ELlI6XG4gICAgICAgICAgICAgICAgeDAgPSB4aSA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICB5MCA9IHlpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgIHZhciB3aWR0aCA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICB2YXIgaGVpZ2h0ID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgIHgxID0geDAgKyB3aWR0aDtcbiAgICAgICAgICAgICAgICB5MSA9IHkwICsgaGVpZ2h0O1xuICAgICAgICAgICAgICAgIGlmIChpc1N0cm9rZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAobGluZS5jb250YWluU3Ryb2tlKHgwLCB5MCwgeDEsIHkwLCBsaW5lV2lkdGgsIHgsIHkpXG4gICAgICAgICAgICAgICAgICAgICAgICB8fCBsaW5lLmNvbnRhaW5TdHJva2UoeDEsIHkwLCB4MSwgeTEsIGxpbmVXaWR0aCwgeCwgeSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHx8IGxpbmUuY29udGFpblN0cm9rZSh4MSwgeTEsIHgwLCB5MSwgbGluZVdpZHRoLCB4LCB5KVxuICAgICAgICAgICAgICAgICAgICAgICAgfHwgbGluZS5jb250YWluU3Ryb2tlKHgwLCB5MSwgeDAsIHkwLCBsaW5lV2lkdGgsIHgsIHkpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdyArPSB3aW5kaW5nTGluZSh4MSwgeTAsIHgxLCB5MSwgeCwgeSk7XG4gICAgICAgICAgICAgICAgICAgIHcgKz0gd2luZGluZ0xpbmUoeDAsIHkxLCB4MCwgeTAsIHgsIHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgQ01ELlo6XG4gICAgICAgICAgICAgICAgaWYgKGlzU3Ryb2tlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChsaW5lLmNvbnRhaW5TdHJva2UoeGksIHlpLCB4MCwgeTAsIGxpbmVXaWR0aCwgeCwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB3ICs9IHdpbmRpbmdMaW5lKHhpLCB5aSwgeDAsIHkwLCB4LCB5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgeGkgPSB4MDtcbiAgICAgICAgICAgICAgICB5aSA9IHkwO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmICghaXNTdHJva2UgJiYgIWlzQXJvdW5kRXF1YWwoeWksIHkwKSkge1xuICAgICAgICB3ICs9IHdpbmRpbmdMaW5lKHhpLCB5aSwgeDAsIHkwLCB4LCB5KSB8fCAwO1xuICAgIH1cbiAgICByZXR1cm4gdyAhPT0gMDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluKHBhdGhQcm94eSwgeCwgeSkge1xuICAgIHJldHVybiBjb250YWluUGF0aChwYXRoUHJveHksIDAsIGZhbHNlLCB4LCB5KTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb250YWluU3Ryb2tlKHBhdGhQcm94eSwgbGluZVdpZHRoLCB4LCB5KSB7XG4gICAgcmV0dXJuIGNvbnRhaW5QYXRoKHBhdGhQcm94eSwgbGluZVdpZHRoLCB0cnVlLCB4LCB5KTtcbn1cbiIsImltcG9ydCB7IHF1YWRyYXRpY1Byb2plY3RQb2ludCB9IGZyb20gJy4uL2NvcmUvY3VydmUnO1xuZXhwb3J0IGZ1bmN0aW9uIGNvbnRhaW5TdHJva2UoeDAsIHkwLCB4MSwgeTEsIHgyLCB5MiwgbGluZVdpZHRoLCB4LCB5KSB7XG4gICAgaWYgKGxpbmVXaWR0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBfbCA9IGxpbmVXaWR0aDtcbiAgICBpZiAoKHkgPiB5MCArIF9sICYmIHkgPiB5MSArIF9sICYmIHkgPiB5MiArIF9sKVxuICAgICAgICB8fCAoeSA8IHkwIC0gX2wgJiYgeSA8IHkxIC0gX2wgJiYgeSA8IHkyIC0gX2wpXG4gICAgICAgIHx8ICh4ID4geDAgKyBfbCAmJiB4ID4geDEgKyBfbCAmJiB4ID4geDIgKyBfbClcbiAgICAgICAgfHwgKHggPCB4MCAtIF9sICYmIHggPCB4MSAtIF9sICYmIHggPCB4MiAtIF9sKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHZhciBkID0gcXVhZHJhdGljUHJvamVjdFBvaW50KHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsIHgsIHksIG51bGwpO1xuICAgIHJldHVybiBkIDw9IF9sIC8gMjtcbn1cbiIsImltcG9ydCBCb3VuZGluZ1JlY3QgZnJvbSAnLi4vY29yZS9Cb3VuZGluZ1JlY3QnO1xuaW1wb3J0IHsgY3JlYXRlQ2FudmFzIH0gZnJvbSAnLi4vY29yZS91dGlsJztcbmltcG9ydCBMUlUgZnJvbSAnLi4vY29yZS9MUlUnO1xudmFyIHRleHRXaWR0aENhY2hlID0ge307XG5leHBvcnQgdmFyIERFRkFVTFRfRk9OVCA9ICcxMnB4IHNhbnMtc2VyaWYnO1xudmFyIF9jdHg7XG52YXIgX2NhY2hlZEZvbnQ7XG5mdW5jdGlvbiBkZWZhdWx0TWVhc3VyZVRleHQodGV4dCwgZm9udCkge1xuICAgIGlmICghX2N0eCkge1xuICAgICAgICBfY3R4ID0gY3JlYXRlQ2FudmFzKCkuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB9XG4gICAgaWYgKF9jYWNoZWRGb250ICE9PSBmb250KSB7XG4gICAgICAgIF9jYWNoZWRGb250ID0gX2N0eC5mb250ID0gZm9udCB8fCBERUZBVUxUX0ZPTlQ7XG4gICAgfVxuICAgIHJldHVybiBfY3R4Lm1lYXN1cmVUZXh0KHRleHQpO1xufVxudmFyIG1ldGhvZHMgPSB7XG4gICAgbWVhc3VyZVRleHQ6IGRlZmF1bHRNZWFzdXJlVGV4dFxufTtcbmV4cG9ydCBmdW5jdGlvbiAkb3ZlcnJpZGUobmFtZSwgZm4pIHtcbiAgICBtZXRob2RzW25hbWVdID0gZm47XG59XG5leHBvcnQgZnVuY3Rpb24gZ2V0V2lkdGgodGV4dCwgZm9udCkge1xuICAgIGZvbnQgPSBmb250IHx8IERFRkFVTFRfRk9OVDtcbiAgICB2YXIgY2FjaGVPZkZvbnQgPSB0ZXh0V2lkdGhDYWNoZVtmb250XTtcbiAgICBpZiAoIWNhY2hlT2ZGb250KSB7XG4gICAgICAgIGNhY2hlT2ZGb250ID0gdGV4dFdpZHRoQ2FjaGVbZm9udF0gPSBuZXcgTFJVKDUwMCk7XG4gICAgfVxuICAgIHZhciB3aWR0aCA9IGNhY2hlT2ZGb250LmdldCh0ZXh0KTtcbiAgICBpZiAod2lkdGggPT0gbnVsbCkge1xuICAgICAgICB3aWR0aCA9IG1ldGhvZHMubWVhc3VyZVRleHQodGV4dCwgZm9udCkud2lkdGg7XG4gICAgICAgIGNhY2hlT2ZGb250LnB1dCh0ZXh0LCB3aWR0aCk7XG4gICAgfVxuICAgIHJldHVybiB3aWR0aDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbm5lckdldEJvdW5kaW5nUmVjdCh0ZXh0LCBmb250LCB0ZXh0QWxpZ24sIHRleHRCYXNlbGluZSkge1xuICAgIHZhciB3aWR0aCA9IGdldFdpZHRoKHRleHQsIGZvbnQpO1xuICAgIHZhciBoZWlnaHQgPSBnZXRMaW5lSGVpZ2h0KGZvbnQpO1xuICAgIHZhciB4ID0gYWRqdXN0VGV4dFgoMCwgd2lkdGgsIHRleHRBbGlnbik7XG4gICAgdmFyIHkgPSBhZGp1c3RUZXh0WSgwLCBoZWlnaHQsIHRleHRCYXNlbGluZSk7XG4gICAgdmFyIHJlY3QgPSBuZXcgQm91bmRpbmdSZWN0KHgsIHksIHdpZHRoLCBoZWlnaHQpO1xuICAgIHJldHVybiByZWN0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldEJvdW5kaW5nUmVjdCh0ZXh0LCBmb250LCB0ZXh0QWxpZ24sIHRleHRCYXNlbGluZSkge1xuICAgIHZhciB0ZXh0TGluZXMgPSAoKHRleHQgfHwgJycpICsgJycpLnNwbGl0KCdcXG4nKTtcbiAgICB2YXIgbGVuID0gdGV4dExpbmVzLmxlbmd0aDtcbiAgICBpZiAobGVuID09PSAxKSB7XG4gICAgICAgIHJldHVybiBpbm5lckdldEJvdW5kaW5nUmVjdCh0ZXh0TGluZXNbMF0sIGZvbnQsIHRleHRBbGlnbiwgdGV4dEJhc2VsaW5lKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciB1bmlvbmRSZWN0ID0gbmV3IEJvdW5kaW5nUmVjdCgwLCAwLCAwLCAwKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0TGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciByZWN0ID0gaW5uZXJHZXRCb3VuZGluZ1JlY3QodGV4dExpbmVzW2ldLCBmb250LCB0ZXh0QWxpZ24sIHRleHRCYXNlbGluZSk7XG4gICAgICAgICAgICBpID09PSAwID8gdW5pb25kUmVjdC5jb3B5KHJlY3QpIDogdW5pb25kUmVjdC51bmlvbihyZWN0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdW5pb25kUmVjdDtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0VGV4dFgoeCwgd2lkdGgsIHRleHRBbGlnbikge1xuICAgIGlmICh0ZXh0QWxpZ24gPT09ICdyaWdodCcpIHtcbiAgICAgICAgeCAtPSB3aWR0aDtcbiAgICB9XG4gICAgZWxzZSBpZiAodGV4dEFsaWduID09PSAnY2VudGVyJykge1xuICAgICAgICB4IC09IHdpZHRoIC8gMjtcbiAgICB9XG4gICAgcmV0dXJuIHg7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRqdXN0VGV4dFkoeSwgaGVpZ2h0LCB2ZXJ0aWNhbEFsaWduKSB7XG4gICAgaWYgKHZlcnRpY2FsQWxpZ24gPT09ICdtaWRkbGUnKSB7XG4gICAgICAgIHkgLT0gaGVpZ2h0IC8gMjtcbiAgICB9XG4gICAgZWxzZSBpZiAodmVydGljYWxBbGlnbiA9PT0gJ2JvdHRvbScpIHtcbiAgICAgICAgeSAtPSBoZWlnaHQ7XG4gICAgfVxuICAgIHJldHVybiB5O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGdldExpbmVIZWlnaHQoZm9udCkge1xuICAgIHJldHVybiBnZXRXaWR0aCgn5Zu9JywgZm9udCk7XG59XG5leHBvcnQgZnVuY3Rpb24gbWVhc3VyZVRleHQodGV4dCwgZm9udCkge1xuICAgIHJldHVybiBtZXRob2RzLm1lYXN1cmVUZXh0KHRleHQsIGZvbnQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlUGVyY2VudCh2YWx1ZSwgbWF4VmFsdWUpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgICBpZiAodmFsdWUubGFzdEluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSkgLyAxMDAgKiBtYXhWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVUZXh0UG9zaXRpb24ob3V0LCBvcHRzLCByZWN0KSB7XG4gICAgdmFyIHRleHRQb3NpdGlvbiA9IG9wdHMucG9zaXRpb24gfHwgJ2luc2lkZSc7XG4gICAgdmFyIGRpc3RhbmNlID0gb3B0cy5kaXN0YW5jZSAhPSBudWxsID8gb3B0cy5kaXN0YW5jZSA6IDU7XG4gICAgdmFyIGhlaWdodCA9IHJlY3QuaGVpZ2h0O1xuICAgIHZhciB3aWR0aCA9IHJlY3Qud2lkdGg7XG4gICAgdmFyIGhhbGZIZWlnaHQgPSBoZWlnaHQgLyAyO1xuICAgIHZhciB4ID0gcmVjdC54O1xuICAgIHZhciB5ID0gcmVjdC55O1xuICAgIHZhciB0ZXh0QWxpZ24gPSAnbGVmdCc7XG4gICAgdmFyIHRleHRWZXJ0aWNhbEFsaWduID0gJ3RvcCc7XG4gICAgaWYgKHRleHRQb3NpdGlvbiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgIHggKz0gcGFyc2VQZXJjZW50KHRleHRQb3NpdGlvblswXSwgcmVjdC53aWR0aCk7XG4gICAgICAgIHkgKz0gcGFyc2VQZXJjZW50KHRleHRQb3NpdGlvblsxXSwgcmVjdC5oZWlnaHQpO1xuICAgICAgICB0ZXh0QWxpZ24gPSBudWxsO1xuICAgICAgICB0ZXh0VmVydGljYWxBbGlnbiA9IG51bGw7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKHRleHRQb3NpdGlvbikge1xuICAgICAgICAgICAgY2FzZSAnbGVmdCc6XG4gICAgICAgICAgICAgICAgeCAtPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB5ICs9IGhhbGZIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGV4dEFsaWduID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICB0ZXh0VmVydGljYWxBbGlnbiA9ICdtaWRkbGUnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAncmlnaHQnOlxuICAgICAgICAgICAgICAgIHggKz0gZGlzdGFuY2UgKyB3aWR0aDtcbiAgICAgICAgICAgICAgICB5ICs9IGhhbGZIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGV4dFZlcnRpY2FsQWxpZ24gPSAnbWlkZGxlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ3RvcCc6XG4gICAgICAgICAgICAgICAgeCArPSB3aWR0aCAvIDI7XG4gICAgICAgICAgICAgICAgeSAtPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICAgICAgICAgICAgICB0ZXh0VmVydGljYWxBbGlnbiA9ICdib3R0b20nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnYm90dG9tJzpcbiAgICAgICAgICAgICAgICB4ICs9IHdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICB5ICs9IGhlaWdodCArIGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIHRleHRBbGlnbiA9ICdjZW50ZXInO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW5zaWRlJzpcbiAgICAgICAgICAgICAgICB4ICs9IHdpZHRoIC8gMjtcbiAgICAgICAgICAgICAgICB5ICs9IGhhbGZIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgdGV4dFZlcnRpY2FsQWxpZ24gPSAnbWlkZGxlJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luc2lkZUxlZnQnOlxuICAgICAgICAgICAgICAgIHggKz0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgeSArPSBoYWxmSGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRleHRWZXJ0aWNhbEFsaWduID0gJ21pZGRsZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnNpZGVSaWdodCc6XG4gICAgICAgICAgICAgICAgeCArPSB3aWR0aCAtIGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIHkgKz0gaGFsZkhlaWdodDtcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIHRleHRWZXJ0aWNhbEFsaWduID0gJ21pZGRsZSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnNpZGVUb3AnOlxuICAgICAgICAgICAgICAgIHggKz0gd2lkdGggLyAyO1xuICAgICAgICAgICAgICAgIHkgKz0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgdGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnNpZGVCb3R0b20nOlxuICAgICAgICAgICAgICAgIHggKz0gd2lkdGggLyAyO1xuICAgICAgICAgICAgICAgIHkgKz0gaGVpZ2h0IC0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgdGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgICAgICAgICAgICAgdGV4dFZlcnRpY2FsQWxpZ24gPSAnYm90dG9tJztcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luc2lkZVRvcExlZnQnOlxuICAgICAgICAgICAgICAgIHggKz0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgeSArPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIGNhc2UgJ2luc2lkZVRvcFJpZ2h0JzpcbiAgICAgICAgICAgICAgICB4ICs9IHdpZHRoIC0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgeSArPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB0ZXh0QWxpZ24gPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAnaW5zaWRlQm90dG9tTGVmdCc6XG4gICAgICAgICAgICAgICAgeCArPSBkaXN0YW5jZTtcbiAgICAgICAgICAgICAgICB5ICs9IGhlaWdodCAtIGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIHRleHRWZXJ0aWNhbEFsaWduID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdpbnNpZGVCb3R0b21SaWdodCc6XG4gICAgICAgICAgICAgICAgeCArPSB3aWR0aCAtIGRpc3RhbmNlO1xuICAgICAgICAgICAgICAgIHkgKz0gaGVpZ2h0IC0gZGlzdGFuY2U7XG4gICAgICAgICAgICAgICAgdGV4dEFsaWduID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICB0ZXh0VmVydGljYWxBbGlnbiA9ICdib3R0b20nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuICAgIG91dCA9IG91dCB8fCB7fTtcbiAgICBvdXQueCA9IHg7XG4gICAgb3V0LnkgPSB5O1xuICAgIG91dC5hbGlnbiA9IHRleHRBbGlnbjtcbiAgICBvdXQudmVydGljYWxBbGlnbiA9IHRleHRWZXJ0aWNhbEFsaWduO1xuICAgIHJldHVybiBvdXQ7XG59XG4iLCJ2YXIgUEkyID0gTWF0aC5QSSAqIDI7XG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplUmFkaWFuKGFuZ2xlKSB7XG4gICAgYW5nbGUgJT0gUEkyO1xuICAgIGlmIChhbmdsZSA8IDApIHtcbiAgICAgICAgYW5nbGUgKz0gUEkyO1xuICAgIH1cbiAgICByZXR1cm4gYW5nbGU7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3aW5kaW5nTGluZSh4MCwgeTAsIHgxLCB5MSwgeCwgeSkge1xuICAgIGlmICgoeSA+IHkwICYmIHkgPiB5MSkgfHwgKHkgPCB5MCAmJiB5IDwgeTEpKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoeTEgPT09IHkwKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICB2YXIgdCA9ICh5IC0geTApIC8gKHkxIC0geTApO1xuICAgIHZhciBkaXIgPSB5MSA8IHkwID8gMSA6IC0xO1xuICAgIGlmICh0ID09PSAxIHx8IHQgPT09IDApIHtcbiAgICAgICAgZGlyID0geTEgPCB5MCA/IDAuNSA6IC0wLjU7XG4gICAgfVxuICAgIHZhciB4XyA9IHQgKiAoeDEgLSB4MCkgKyB4MDtcbiAgICByZXR1cm4geF8gPT09IHggPyBJbmZpbml0eSA6IHhfID4geCA/IGRpciA6IDA7XG59XG4iLCJpbXBvcnQgKiBhcyBtYXRyaXggZnJvbSAnLi9tYXRyaXgnO1xuaW1wb3J0IFBvaW50IGZyb20gJy4vUG9pbnQnO1xudmFyIG1hdGhNaW4gPSBNYXRoLm1pbjtcbnZhciBtYXRoTWF4ID0gTWF0aC5tYXg7XG52YXIgbHQgPSBuZXcgUG9pbnQoKTtcbnZhciByYiA9IG5ldyBQb2ludCgpO1xudmFyIGxiID0gbmV3IFBvaW50KCk7XG52YXIgcnQgPSBuZXcgUG9pbnQoKTtcbnZhciBtaW5UdiA9IG5ldyBQb2ludCgpO1xudmFyIG1heFR2ID0gbmV3IFBvaW50KCk7XG52YXIgQm91bmRpbmdSZWN0ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCb3VuZGluZ1JlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCkge1xuICAgICAgICBpZiAod2lkdGggPCAwICYmIGlzRmluaXRlKHdpZHRoKSkge1xuICAgICAgICAgICAgeCA9IHggKyB3aWR0aDtcbiAgICAgICAgICAgIHdpZHRoID0gLXdpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoZWlnaHQgPCAwICYmIGlzRmluaXRlKGhlaWdodCkpIHtcbiAgICAgICAgICAgIHkgPSB5ICsgaGVpZ2h0O1xuICAgICAgICAgICAgaGVpZ2h0ID0gLWhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIH1cbiAgICBCb3VuZGluZ1JlY3QucHJvdG90eXBlLnVuaW9uID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHZhciB4ID0gbWF0aE1pbihvdGhlci54LCB0aGlzLngpO1xuICAgICAgICB2YXIgeSA9IG1hdGhNaW4ob3RoZXIueSwgdGhpcy55KTtcbiAgICAgICAgaWYgKGlzRmluaXRlKHRoaXMueCkgJiYgaXNGaW5pdGUodGhpcy53aWR0aCkpIHtcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSBtYXRoTWF4KG90aGVyLnggKyBvdGhlci53aWR0aCwgdGhpcy54ICsgdGhpcy53aWR0aCkgLSB4O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy53aWR0aCA9IG90aGVyLndpZHRoO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpc0Zpbml0ZSh0aGlzLnkpICYmIGlzRmluaXRlKHRoaXMuaGVpZ2h0KSkge1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSBtYXRoTWF4KG90aGVyLnkgKyBvdGhlci5oZWlnaHQsIHRoaXMueSArIHRoaXMuaGVpZ2h0KSAtIHk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9IG90aGVyLmhlaWdodDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH07XG4gICAgQm91bmRpbmdSZWN0LnByb3RvdHlwZS5hcHBseVRyYW5zZm9ybSA9IGZ1bmN0aW9uIChtKSB7XG4gICAgICAgIEJvdW5kaW5nUmVjdC5hcHBseVRyYW5zZm9ybSh0aGlzLCB0aGlzLCBtKTtcbiAgICB9O1xuICAgIEJvdW5kaW5nUmVjdC5wcm90b3R5cGUuY2FsY3VsYXRlVHJhbnNmb3JtID0gZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzO1xuICAgICAgICB2YXIgc3ggPSBiLndpZHRoIC8gYS53aWR0aDtcbiAgICAgICAgdmFyIHN5ID0gYi5oZWlnaHQgLyBhLmhlaWdodDtcbiAgICAgICAgdmFyIG0gPSBtYXRyaXguY3JlYXRlKCk7XG4gICAgICAgIG1hdHJpeC50cmFuc2xhdGUobSwgbSwgWy1hLngsIC1hLnldKTtcbiAgICAgICAgbWF0cml4LnNjYWxlKG0sIG0sIFtzeCwgc3ldKTtcbiAgICAgICAgbWF0cml4LnRyYW5zbGF0ZShtLCBtLCBbYi54LCBiLnldKTtcbiAgICAgICAgcmV0dXJuIG07XG4gICAgfTtcbiAgICBCb3VuZGluZ1JlY3QucHJvdG90eXBlLmludGVyc2VjdCA9IGZ1bmN0aW9uIChiLCBtdHYpIHtcbiAgICAgICAgaWYgKCFiKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCEoYiBpbnN0YW5jZW9mIEJvdW5kaW5nUmVjdCkpIHtcbiAgICAgICAgICAgIGIgPSBCb3VuZGluZ1JlY3QuY3JlYXRlKGIpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBhID0gdGhpcztcbiAgICAgICAgdmFyIGF4MCA9IGEueDtcbiAgICAgICAgdmFyIGF4MSA9IGEueCArIGEud2lkdGg7XG4gICAgICAgIHZhciBheTAgPSBhLnk7XG4gICAgICAgIHZhciBheTEgPSBhLnkgKyBhLmhlaWdodDtcbiAgICAgICAgdmFyIGJ4MCA9IGIueDtcbiAgICAgICAgdmFyIGJ4MSA9IGIueCArIGIud2lkdGg7XG4gICAgICAgIHZhciBieTAgPSBiLnk7XG4gICAgICAgIHZhciBieTEgPSBiLnkgKyBiLmhlaWdodDtcbiAgICAgICAgdmFyIG92ZXJsYXAgPSAhKGF4MSA8IGJ4MCB8fCBieDEgPCBheDAgfHwgYXkxIDwgYnkwIHx8IGJ5MSA8IGF5MCk7XG4gICAgICAgIGlmIChtdHYpIHtcbiAgICAgICAgICAgIHZhciBkTWluID0gSW5maW5pdHk7XG4gICAgICAgICAgICB2YXIgZE1heCA9IDA7XG4gICAgICAgICAgICB2YXIgZDAgPSBNYXRoLmFicyhheDEgLSBieDApO1xuICAgICAgICAgICAgdmFyIGQxID0gTWF0aC5hYnMoYngxIC0gYXgwKTtcbiAgICAgICAgICAgIHZhciBkMiA9IE1hdGguYWJzKGF5MSAtIGJ5MCk7XG4gICAgICAgICAgICB2YXIgZDMgPSBNYXRoLmFicyhieTEgLSBheTApO1xuICAgICAgICAgICAgdmFyIGR4ID0gTWF0aC5taW4oZDAsIGQxKTtcbiAgICAgICAgICAgIHZhciBkeSA9IE1hdGgubWluKGQyLCBkMyk7XG4gICAgICAgICAgICBpZiAoYXgxIDwgYngwIHx8IGJ4MSA8IGF4MCkge1xuICAgICAgICAgICAgICAgIGlmIChkeCA+IGRNYXgpIHtcbiAgICAgICAgICAgICAgICAgICAgZE1heCA9IGR4O1xuICAgICAgICAgICAgICAgICAgICBpZiAoZDAgPCBkMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgUG9pbnQuc2V0KG1heFR2LCAtZDAsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgUG9pbnQuc2V0KG1heFR2LCBkMSwgMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoZHggPCBkTWluKSB7XG4gICAgICAgICAgICAgICAgICAgIGRNaW4gPSBkeDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQwIDwgZDEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBvaW50LnNldChtaW5UdiwgZDAsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgUG9pbnQuc2V0KG1pblR2LCAtZDEsIDApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGF5MSA8IGJ5MCB8fCBieTEgPCBheTApIHtcbiAgICAgICAgICAgICAgICBpZiAoZHkgPiBkTWF4KSB7XG4gICAgICAgICAgICAgICAgICAgIGRNYXggPSBkeTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGQyIDwgZDMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBvaW50LnNldChtYXhUdiwgMCwgLWQyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBvaW50LnNldChtYXhUdiwgMCwgZDMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGR4IDwgZE1pbikge1xuICAgICAgICAgICAgICAgICAgICBkTWluID0gZHg7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkMiA8IGQzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBQb2ludC5zZXQobWluVHYsIDAsIGQyKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBvaW50LnNldChtaW5UdiwgMCwgLWQzKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAobXR2KSB7XG4gICAgICAgICAgICBQb2ludC5jb3B5KG10diwgb3ZlcmxhcCA/IG1pblR2IDogbWF4VHYpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdmVybGFwO1xuICAgIH07XG4gICAgQm91bmRpbmdSZWN0LnByb3RvdHlwZS5jb250YWluID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzO1xuICAgICAgICByZXR1cm4geCA+PSByZWN0LnhcbiAgICAgICAgICAgICYmIHggPD0gKHJlY3QueCArIHJlY3Qud2lkdGgpXG4gICAgICAgICAgICAmJiB5ID49IHJlY3QueVxuICAgICAgICAgICAgJiYgeSA8PSAocmVjdC55ICsgcmVjdC5oZWlnaHQpO1xuICAgIH07XG4gICAgQm91bmRpbmdSZWN0LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBCb3VuZGluZ1JlY3QodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9O1xuICAgIEJvdW5kaW5nUmVjdC5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICBCb3VuZGluZ1JlY3QuY29weSh0aGlzLCBvdGhlcik7XG4gICAgfTtcbiAgICBCb3VuZGluZ1JlY3QucHJvdG90eXBlLnBsYWluID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgeDogdGhpcy54LFxuICAgICAgICAgICAgeTogdGhpcy55LFxuICAgICAgICAgICAgd2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IHRoaXMuaGVpZ2h0XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBCb3VuZGluZ1JlY3QucHJvdG90eXBlLmlzRmluaXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gaXNGaW5pdGUodGhpcy54KVxuICAgICAgICAgICAgJiYgaXNGaW5pdGUodGhpcy55KVxuICAgICAgICAgICAgJiYgaXNGaW5pdGUodGhpcy53aWR0aClcbiAgICAgICAgICAgICYmIGlzRmluaXRlKHRoaXMuaGVpZ2h0KTtcbiAgICB9O1xuICAgIEJvdW5kaW5nUmVjdC5wcm90b3R5cGUuaXNaZXJvID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy53aWR0aCA9PT0gMCB8fCB0aGlzLmhlaWdodCA9PT0gMDtcbiAgICB9O1xuICAgIEJvdW5kaW5nUmVjdC5jcmVhdGUgPSBmdW5jdGlvbiAocmVjdCkge1xuICAgICAgICByZXR1cm4gbmV3IEJvdW5kaW5nUmVjdChyZWN0LngsIHJlY3QueSwgcmVjdC53aWR0aCwgcmVjdC5oZWlnaHQpO1xuICAgIH07XG4gICAgQm91bmRpbmdSZWN0LmNvcHkgPSBmdW5jdGlvbiAodGFyZ2V0LCBzb3VyY2UpIHtcbiAgICAgICAgdGFyZ2V0LnggPSBzb3VyY2UueDtcbiAgICAgICAgdGFyZ2V0LnkgPSBzb3VyY2UueTtcbiAgICAgICAgdGFyZ2V0LndpZHRoID0gc291cmNlLndpZHRoO1xuICAgICAgICB0YXJnZXQuaGVpZ2h0ID0gc291cmNlLmhlaWdodDtcbiAgICB9O1xuICAgIEJvdW5kaW5nUmVjdC5hcHBseVRyYW5zZm9ybSA9IGZ1bmN0aW9uICh0YXJnZXQsIHNvdXJjZSwgbSkge1xuICAgICAgICBpZiAoIW0pIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQgIT09IHNvdXJjZSkge1xuICAgICAgICAgICAgICAgIEJvdW5kaW5nUmVjdC5jb3B5KHRhcmdldCwgc291cmNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobVsxXSA8IDFlLTUgJiYgbVsxXSA+IC0xZS01ICYmIG1bMl0gPCAxZS01ICYmIG1bMl0gPiAtMWUtNSkge1xuICAgICAgICAgICAgdmFyIHN4ID0gbVswXTtcbiAgICAgICAgICAgIHZhciBzeSA9IG1bM107XG4gICAgICAgICAgICB2YXIgdHggPSBtWzRdO1xuICAgICAgICAgICAgdmFyIHR5ID0gbVs1XTtcbiAgICAgICAgICAgIHRhcmdldC54ID0gc291cmNlLnggKiBzeCArIHR4O1xuICAgICAgICAgICAgdGFyZ2V0LnkgPSBzb3VyY2UueSAqIHN5ICsgdHk7XG4gICAgICAgICAgICB0YXJnZXQud2lkdGggPSBzb3VyY2Uud2lkdGggKiBzeDtcbiAgICAgICAgICAgIHRhcmdldC5oZWlnaHQgPSBzb3VyY2UuaGVpZ2h0ICogc3k7XG4gICAgICAgICAgICBpZiAodGFyZ2V0LndpZHRoIDwgMCkge1xuICAgICAgICAgICAgICAgIHRhcmdldC54ICs9IHRhcmdldC53aWR0aDtcbiAgICAgICAgICAgICAgICB0YXJnZXQud2lkdGggPSAtdGFyZ2V0LndpZHRoO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRhcmdldC5oZWlnaHQgPCAwKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0LnkgKz0gdGFyZ2V0LmhlaWdodDtcbiAgICAgICAgICAgICAgICB0YXJnZXQuaGVpZ2h0ID0gLXRhcmdldC5oZWlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbHQueCA9IGxiLnggPSBzb3VyY2UueDtcbiAgICAgICAgbHQueSA9IHJ0LnkgPSBzb3VyY2UueTtcbiAgICAgICAgcmIueCA9IHJ0LnggPSBzb3VyY2UueCArIHNvdXJjZS53aWR0aDtcbiAgICAgICAgcmIueSA9IGxiLnkgPSBzb3VyY2UueSArIHNvdXJjZS5oZWlnaHQ7XG4gICAgICAgIGx0LnRyYW5zZm9ybShtKTtcbiAgICAgICAgcnQudHJhbnNmb3JtKG0pO1xuICAgICAgICByYi50cmFuc2Zvcm0obSk7XG4gICAgICAgIGxiLnRyYW5zZm9ybShtKTtcbiAgICAgICAgdGFyZ2V0LnggPSBtYXRoTWluKGx0LngsIHJiLngsIGxiLngsIHJ0LngpO1xuICAgICAgICB0YXJnZXQueSA9IG1hdGhNaW4obHQueSwgcmIueSwgbGIueSwgcnQueSk7XG4gICAgICAgIHZhciBtYXhYID0gbWF0aE1heChsdC54LCByYi54LCBsYi54LCBydC54KTtcbiAgICAgICAgdmFyIG1heFkgPSBtYXRoTWF4KGx0LnksIHJiLnksIGxiLnksIHJ0LnkpO1xuICAgICAgICB0YXJnZXQud2lkdGggPSBtYXhYIC0gdGFyZ2V0Lng7XG4gICAgICAgIHRhcmdldC5oZWlnaHQgPSBtYXhZIC0gdGFyZ2V0Lnk7XG4gICAgfTtcbiAgICByZXR1cm4gQm91bmRpbmdSZWN0O1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IEJvdW5kaW5nUmVjdDtcbiIsInZhciBFdmVudGZ1bCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRmdWwoZXZlbnRQcm9jZXNzb3JzKSB7XG4gICAgICAgIGlmIChldmVudFByb2Nlc3NvcnMpIHtcbiAgICAgICAgICAgIHRoaXMuXyRldmVudFByb2Nlc3NvciA9IGV2ZW50UHJvY2Vzc29ycztcbiAgICAgICAgfVxuICAgIH1cbiAgICBFdmVudGZ1bC5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnQsIHF1ZXJ5LCBoYW5kbGVyLCBjb250ZXh0KSB7XG4gICAgICAgIGlmICghdGhpcy5fJGhhbmRsZXJzKSB7XG4gICAgICAgICAgICB0aGlzLl8kaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgX2ggPSB0aGlzLl8kaGFuZGxlcnM7XG4gICAgICAgIGlmICh0eXBlb2YgcXVlcnkgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNvbnRleHQgPSBoYW5kbGVyO1xuICAgICAgICAgICAgaGFuZGxlciA9IHF1ZXJ5O1xuICAgICAgICAgICAgcXVlcnkgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghaGFuZGxlciB8fCAhZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBldmVudFByb2Nlc3NvciA9IHRoaXMuXyRldmVudFByb2Nlc3NvcjtcbiAgICAgICAgaWYgKHF1ZXJ5ICE9IG51bGwgJiYgZXZlbnRQcm9jZXNzb3IgJiYgZXZlbnRQcm9jZXNzb3Iubm9ybWFsaXplUXVlcnkpIHtcbiAgICAgICAgICAgIHF1ZXJ5ID0gZXZlbnRQcm9jZXNzb3Iubm9ybWFsaXplUXVlcnkocXVlcnkpO1xuICAgICAgICB9XG4gICAgICAgIGlmICghX2hbZXZlbnRdKSB7XG4gICAgICAgICAgICBfaFtldmVudF0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IF9oW2V2ZW50XS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKF9oW2V2ZW50XVtpXS5oID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHdyYXAgPSB7XG4gICAgICAgICAgICBoOiBoYW5kbGVyLFxuICAgICAgICAgICAgcXVlcnk6IHF1ZXJ5LFxuICAgICAgICAgICAgY3R4OiAoY29udGV4dCB8fCB0aGlzKSxcbiAgICAgICAgICAgIGNhbGxBdExhc3Q6IGhhbmRsZXIuenJFdmVudGZ1bENhbGxBdExhc3RcbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGxhc3RJbmRleCA9IF9oW2V2ZW50XS5sZW5ndGggLSAxO1xuICAgICAgICB2YXIgbGFzdFdyYXAgPSBfaFtldmVudF1bbGFzdEluZGV4XTtcbiAgICAgICAgKGxhc3RXcmFwICYmIGxhc3RXcmFwLmNhbGxBdExhc3QpXG4gICAgICAgICAgICA/IF9oW2V2ZW50XS5zcGxpY2UobGFzdEluZGV4LCAwLCB3cmFwKVxuICAgICAgICAgICAgOiBfaFtldmVudF0ucHVzaCh3cmFwKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFdmVudGZ1bC5wcm90b3R5cGUuaXNTaWxlbnQgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIHZhciBfaCA9IHRoaXMuXyRoYW5kbGVycztcbiAgICAgICAgcmV0dXJuICFfaCB8fCAhX2hbZXZlbnROYW1lXSB8fCAhX2hbZXZlbnROYW1lXS5sZW5ndGg7XG4gICAgfTtcbiAgICBFdmVudGZ1bC5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50VHlwZSwgaGFuZGxlcikge1xuICAgICAgICB2YXIgX2ggPSB0aGlzLl8kaGFuZGxlcnM7XG4gICAgICAgIGlmICghX2gpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmICghZXZlbnRUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLl8kaGFuZGxlcnMgPSB7fTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYW5kbGVyKSB7XG4gICAgICAgICAgICBpZiAoX2hbZXZlbnRUeXBlXSkge1xuICAgICAgICAgICAgICAgIHZhciBuZXdMaXN0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDAsIGwgPSBfaFtldmVudFR5cGVdLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2hbZXZlbnRUeXBlXVtpXS5oICE9PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdMaXN0LnB1c2goX2hbZXZlbnRUeXBlXVtpXSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgX2hbZXZlbnRUeXBlXSA9IG5ld0xpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoX2hbZXZlbnRUeXBlXSAmJiBfaFtldmVudFR5cGVdLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBfaFtldmVudFR5cGVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZGVsZXRlIF9oW2V2ZW50VHlwZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBFdmVudGZ1bC5wcm90b3R5cGUudHJpZ2dlciA9IGZ1bmN0aW9uIChldmVudFR5cGUpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgX2kgPSAxOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLl8kaGFuZGxlcnMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHZhciBfaCA9IHRoaXMuXyRoYW5kbGVyc1tldmVudFR5cGVdO1xuICAgICAgICB2YXIgZXZlbnRQcm9jZXNzb3IgPSB0aGlzLl8kZXZlbnRQcm9jZXNzb3I7XG4gICAgICAgIGlmIChfaCkge1xuICAgICAgICAgICAgdmFyIGFyZ0xlbiA9IGFyZ3MubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGxlbiA9IF9oLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgaEl0ZW0gPSBfaFtpXTtcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRQcm9jZXNzb3JcbiAgICAgICAgICAgICAgICAgICAgJiYgZXZlbnRQcm9jZXNzb3IuZmlsdGVyXG4gICAgICAgICAgICAgICAgICAgICYmIGhJdGVtLnF1ZXJ5ICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICAgJiYgIWV2ZW50UHJvY2Vzc29yLmZpbHRlcihldmVudFR5cGUsIGhJdGVtLnF1ZXJ5KSkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc3dpdGNoIChhcmdMZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgICAgICAgICAgICAgaEl0ZW0uaC5jYWxsKGhJdGVtLmN0eCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgaEl0ZW0uaC5jYWxsKGhJdGVtLmN0eCwgYXJnc1swXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgaEl0ZW0uaC5jYWxsKGhJdGVtLmN0eCwgYXJnc1swXSwgYXJnc1sxXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIGhJdGVtLmguYXBwbHkoaEl0ZW0uY3R4LCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBldmVudFByb2Nlc3NvciAmJiBldmVudFByb2Nlc3Nvci5hZnRlclRyaWdnZXJcbiAgICAgICAgICAgICYmIGV2ZW50UHJvY2Vzc29yLmFmdGVyVHJpZ2dlcihldmVudFR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIEV2ZW50ZnVsLnByb3RvdHlwZS50cmlnZ2VyV2l0aENvbnRleHQgPSBmdW5jdGlvbiAodHlwZSkge1xuICAgICAgICBpZiAoIXRoaXMuXyRoYW5kbGVycykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIF9oID0gdGhpcy5fJGhhbmRsZXJzW3R5cGVdO1xuICAgICAgICB2YXIgZXZlbnRQcm9jZXNzb3IgPSB0aGlzLl8kZXZlbnRQcm9jZXNzb3I7XG4gICAgICAgIGlmIChfaCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICB2YXIgYXJnTGVuID0gYXJncy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgY3R4ID0gYXJnc1thcmdMZW4gLSAxXTtcbiAgICAgICAgICAgIHZhciBsZW4gPSBfaC5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhJdGVtID0gX2hbaV07XG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50UHJvY2Vzc29yXG4gICAgICAgICAgICAgICAgICAgICYmIGV2ZW50UHJvY2Vzc29yLmZpbHRlclxuICAgICAgICAgICAgICAgICAgICAmJiBoSXRlbS5xdWVyeSAhPSBudWxsXG4gICAgICAgICAgICAgICAgICAgICYmICFldmVudFByb2Nlc3Nvci5maWx0ZXIodHlwZSwgaEl0ZW0ucXVlcnkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBzd2l0Y2ggKGFyZ0xlbikge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICBoSXRlbS5oLmNhbGwoY3R4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICAgICAgICAgICAgICBoSXRlbS5oLmNhbGwoY3R4LCBhcmdzWzBdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICAgICAgICAgICAgICBoSXRlbS5oLmNhbGwoY3R4LCBhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgaEl0ZW0uaC5hcHBseShjdHgsIGFyZ3Muc2xpY2UoMSwgYXJnTGVuIC0gMSkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGV2ZW50UHJvY2Vzc29yICYmIGV2ZW50UHJvY2Vzc29yLmFmdGVyVHJpZ2dlclxuICAgICAgICAgICAgJiYgZXZlbnRQcm9jZXNzb3IuYWZ0ZXJUcmlnZ2VyKHR5cGUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBFdmVudGZ1bDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBFdmVudGZ1bDtcbiIsInZhciBFbnRyeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRW50cnkodmFsKSB7XG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWw7XG4gICAgfVxuICAgIHJldHVybiBFbnRyeTtcbn0oKSk7XG5leHBvcnQgeyBFbnRyeSB9O1xudmFyIExpbmtlZExpc3QgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIExpbmtlZExpc3QoKSB7XG4gICAgICAgIHRoaXMuX2xlbiA9IDA7XG4gICAgfVxuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmluc2VydCA9IGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gbmV3IEVudHJ5KHZhbCk7XG4gICAgICAgIHRoaXMuaW5zZXJ0RW50cnkoZW50cnkpO1xuICAgICAgICByZXR1cm4gZW50cnk7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5pbnNlcnRFbnRyeSA9IGZ1bmN0aW9uIChlbnRyeSkge1xuICAgICAgICBpZiAoIXRoaXMuaGVhZCkge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gdGhpcy50YWlsID0gZW50cnk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRhaWwubmV4dCA9IGVudHJ5O1xuICAgICAgICAgICAgZW50cnkucHJldiA9IHRoaXMudGFpbDtcbiAgICAgICAgICAgIGVudHJ5Lm5leHQgPSBudWxsO1xuICAgICAgICAgICAgdGhpcy50YWlsID0gZW50cnk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGVuKys7XG4gICAgfTtcbiAgICBMaW5rZWRMaXN0LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoZW50cnkpIHtcbiAgICAgICAgdmFyIHByZXYgPSBlbnRyeS5wcmV2O1xuICAgICAgICB2YXIgbmV4dCA9IGVudHJ5Lm5leHQ7XG4gICAgICAgIGlmIChwcmV2KSB7XG4gICAgICAgICAgICBwcmV2Lm5leHQgPSBuZXh0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5oZWFkID0gbmV4dDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobmV4dCkge1xuICAgICAgICAgICAgbmV4dC5wcmV2ID0gcHJldjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudGFpbCA9IHByZXY7XG4gICAgICAgIH1cbiAgICAgICAgZW50cnkubmV4dCA9IGVudHJ5LnByZXYgPSBudWxsO1xuICAgICAgICB0aGlzLl9sZW4tLTtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmxlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlbjtcbiAgICB9O1xuICAgIExpbmtlZExpc3QucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmhlYWQgPSB0aGlzLnRhaWwgPSBudWxsO1xuICAgICAgICB0aGlzLl9sZW4gPSAwO1xuICAgIH07XG4gICAgcmV0dXJuIExpbmtlZExpc3Q7XG59KCkpO1xuZXhwb3J0IHsgTGlua2VkTGlzdCB9O1xudmFyIExSVSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gTFJVKG1heFNpemUpIHtcbiAgICAgICAgdGhpcy5fbGlzdCA9IG5ldyBMaW5rZWRMaXN0KCk7XG4gICAgICAgIHRoaXMuX21heFNpemUgPSAxMDtcbiAgICAgICAgdGhpcy5fbWFwID0ge307XG4gICAgICAgIHRoaXMuX21heFNpemUgPSBtYXhTaXplO1xuICAgIH1cbiAgICBMUlUucHJvdG90eXBlLnB1dCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciBsaXN0ID0gdGhpcy5fbGlzdDtcbiAgICAgICAgdmFyIG1hcCA9IHRoaXMuX21hcDtcbiAgICAgICAgdmFyIHJlbW92ZWQgPSBudWxsO1xuICAgICAgICBpZiAobWFwW2tleV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdmFyIGxlbiA9IGxpc3QubGVuKCk7XG4gICAgICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9sYXN0UmVtb3ZlZEVudHJ5O1xuICAgICAgICAgICAgaWYgKGxlbiA+PSB0aGlzLl9tYXhTaXplICYmIGxlbiA+IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgbGVhc3RVc2VkRW50cnkgPSBsaXN0LmhlYWQ7XG4gICAgICAgICAgICAgICAgbGlzdC5yZW1vdmUobGVhc3RVc2VkRW50cnkpO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSBtYXBbbGVhc3RVc2VkRW50cnkua2V5XTtcbiAgICAgICAgICAgICAgICByZW1vdmVkID0gbGVhc3RVc2VkRW50cnkudmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGFzdFJlbW92ZWRFbnRyeSA9IGxlYXN0VXNlZEVudHJ5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgZW50cnkudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGVudHJ5ID0gbmV3IEVudHJ5KHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVudHJ5LmtleSA9IGtleTtcbiAgICAgICAgICAgIGxpc3QuaW5zZXJ0RW50cnkoZW50cnkpO1xuICAgICAgICAgICAgbWFwW2tleV0gPSBlbnRyeTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVtb3ZlZDtcbiAgICB9O1xuICAgIExSVS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLl9tYXBba2V5XTtcbiAgICAgICAgdmFyIGxpc3QgPSB0aGlzLl9saXN0O1xuICAgICAgICBpZiAoZW50cnkgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGVudHJ5ICE9PSBsaXN0LnRhaWwpIHtcbiAgICAgICAgICAgICAgICBsaXN0LnJlbW92ZShlbnRyeSk7XG4gICAgICAgICAgICAgICAgbGlzdC5pbnNlcnRFbnRyeShlbnRyeSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZW50cnkudmFsdWU7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIExSVS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2xpc3QuY2xlYXIoKTtcbiAgICAgICAgdGhpcy5fbWFwID0ge307XG4gICAgfTtcbiAgICBMUlUucHJvdG90eXBlLmxlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3QubGVuKCk7XG4gICAgfTtcbiAgICByZXR1cm4gTFJVO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IExSVTtcbiIsImltcG9ydCAqIGFzIHZlYzIgZnJvbSAnLi92ZWN0b3InO1xuaW1wb3J0IEJvdW5kaW5nUmVjdCBmcm9tICcuL0JvdW5kaW5nUmVjdCc7XG5pbXBvcnQgeyBkZXZpY2VQaXhlbFJhdGlvIGFzIGRwciB9IGZyb20gJy4uL2NvbmZpZyc7XG5pbXBvcnQgeyBmcm9tTGluZSwgZnJvbUN1YmljLCBmcm9tUXVhZHJhdGljLCBmcm9tQXJjIH0gZnJvbSAnLi9iYm94JztcbmltcG9ydCB7IGN1YmljQXQsIGN1YmljTGVuZ3RoLCBjdWJpY1N1YmRpdmlkZSwgcXVhZHJhdGljTGVuZ3RoLCBxdWFkcmF0aWNTdWJkaXZpZGUgfSBmcm9tICcuL2N1cnZlJztcbnZhciBDTUQgPSB7XG4gICAgTTogMSxcbiAgICBMOiAyLFxuICAgIEM6IDMsXG4gICAgUTogNCxcbiAgICBBOiA1LFxuICAgIFo6IDYsXG4gICAgUjogN1xufTtcbnZhciB0bXBPdXRYID0gW107XG52YXIgdG1wT3V0WSA9IFtdO1xudmFyIG1pbiA9IFtdO1xudmFyIG1heCA9IFtdO1xudmFyIG1pbjIgPSBbXTtcbnZhciBtYXgyID0gW107XG52YXIgbWF0aE1pbiA9IE1hdGgubWluO1xudmFyIG1hdGhNYXggPSBNYXRoLm1heDtcbnZhciBtYXRoQ29zID0gTWF0aC5jb3M7XG52YXIgbWF0aFNpbiA9IE1hdGguc2luO1xudmFyIG1hdGhTcXJ0ID0gTWF0aC5zcXJ0O1xudmFyIG1hdGhBYnMgPSBNYXRoLmFicztcbnZhciBQSSA9IE1hdGguUEk7XG52YXIgUEkyID0gUEkgKiAyO1xudmFyIGhhc1R5cGVkQXJyYXkgPSB0eXBlb2YgRmxvYXQzMkFycmF5ICE9PSAndW5kZWZpbmVkJztcbnZhciB0bXBBbmdsZXMgPSBbXTtcbmZ1bmN0aW9uIG1vZFBJMihyYWRpYW4pIHtcbiAgICB2YXIgbiA9IE1hdGgucm91bmQocmFkaWFuIC8gUEkgKiAxZTgpIC8gMWU4O1xuICAgIHJldHVybiAobiAlIDIpICogUEk7XG59XG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplQXJjQW5nbGVzKGFuZ2xlcywgYW50aWNsb2Nrd2lzZSkge1xuICAgIHZhciBuZXdTdGFydEFuZ2xlID0gbW9kUEkyKGFuZ2xlc1swXSk7XG4gICAgaWYgKG5ld1N0YXJ0QW5nbGUgPCAwKSB7XG4gICAgICAgIG5ld1N0YXJ0QW5nbGUgKz0gUEkyO1xuICAgIH1cbiAgICB2YXIgZGVsdGEgPSBuZXdTdGFydEFuZ2xlIC0gYW5nbGVzWzBdO1xuICAgIHZhciBuZXdFbmRBbmdsZSA9IGFuZ2xlc1sxXTtcbiAgICBuZXdFbmRBbmdsZSArPSBkZWx0YTtcbiAgICBpZiAoIWFudGljbG9ja3dpc2UgJiYgbmV3RW5kQW5nbGUgLSBuZXdTdGFydEFuZ2xlID49IFBJMikge1xuICAgICAgICBuZXdFbmRBbmdsZSA9IG5ld1N0YXJ0QW5nbGUgKyBQSTI7XG4gICAgfVxuICAgIGVsc2UgaWYgKGFudGljbG9ja3dpc2UgJiYgbmV3U3RhcnRBbmdsZSAtIG5ld0VuZEFuZ2xlID49IFBJMikge1xuICAgICAgICBuZXdFbmRBbmdsZSA9IG5ld1N0YXJ0QW5nbGUgLSBQSTI7XG4gICAgfVxuICAgIGVsc2UgaWYgKCFhbnRpY2xvY2t3aXNlICYmIG5ld1N0YXJ0QW5nbGUgPiBuZXdFbmRBbmdsZSkge1xuICAgICAgICBuZXdFbmRBbmdsZSA9IG5ld1N0YXJ0QW5nbGUgK1xuICAgICAgICAgICAgKFBJMiAtIG1vZFBJMihuZXdTdGFydEFuZ2xlIC0gbmV3RW5kQW5nbGUpKTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYW50aWNsb2Nrd2lzZSAmJiBuZXdTdGFydEFuZ2xlIDwgbmV3RW5kQW5nbGUpIHtcbiAgICAgICAgbmV3RW5kQW5nbGUgPSBuZXdTdGFydEFuZ2xlIC1cbiAgICAgICAgICAgIChQSTIgLSBtb2RQSTIobmV3RW5kQW5nbGUgLSBuZXdTdGFydEFuZ2xlKSk7XG4gICAgfVxuICAgIGFuZ2xlc1swXSA9IG5ld1N0YXJ0QW5nbGU7XG4gICAgYW5nbGVzWzFdID0gbmV3RW5kQW5nbGU7XG59XG52YXIgUGF0aFByb3h5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQYXRoUHJveHkobm90U2F2ZURhdGEpIHtcbiAgICAgICAgdGhpcy5kcHIgPSAxO1xuICAgICAgICB0aGlzLl92ZXJzaW9uID0gMDtcbiAgICAgICAgdGhpcy5feGkgPSAwO1xuICAgICAgICB0aGlzLl95aSA9IDA7XG4gICAgICAgIHRoaXMuX3gwID0gMDtcbiAgICAgICAgdGhpcy5feTAgPSAwO1xuICAgICAgICB0aGlzLl9sZW4gPSAwO1xuICAgICAgICBpZiAobm90U2F2ZURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX3NhdmVEYXRhID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX3NhdmVEYXRhKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBbXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBQYXRoUHJveHkucHJvdG90eXBlLmluY3JlYXNlVmVyc2lvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fdmVyc2lvbisrO1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5nZXRWZXJzaW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmVyc2lvbjtcbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuc2V0U2NhbGUgPSBmdW5jdGlvbiAoc3gsIHN5LCBzZWdtZW50SWdub3JlVGhyZXNob2xkKSB7XG4gICAgICAgIHNlZ21lbnRJZ25vcmVUaHJlc2hvbGQgPSBzZWdtZW50SWdub3JlVGhyZXNob2xkIHx8IDA7XG4gICAgICAgIGlmIChzZWdtZW50SWdub3JlVGhyZXNob2xkID4gMCkge1xuICAgICAgICAgICAgdGhpcy5fdXggPSBtYXRoQWJzKHNlZ21lbnRJZ25vcmVUaHJlc2hvbGQgLyBkcHIgLyBzeCkgfHwgMDtcbiAgICAgICAgICAgIHRoaXMuX3V5ID0gbWF0aEFicyhzZWdtZW50SWdub3JlVGhyZXNob2xkIC8gZHByIC8gc3kpIHx8IDA7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuc2V0RFBSID0gZnVuY3Rpb24gKGRwcikge1xuICAgICAgICB0aGlzLmRwciA9IGRwcjtcbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuc2V0Q29udGV4dCA9IGZ1bmN0aW9uIChjdHgpIHtcbiAgICAgICAgdGhpcy5fY3R4ID0gY3R4O1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5nZXRDb250ZXh0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY3R4O1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5iZWdpblBhdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2N0eCAmJiB0aGlzLl9jdHguYmVnaW5QYXRoKCk7XG4gICAgICAgIHRoaXMucmVzZXQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBQYXRoUHJveHkucHJvdG90eXBlLnJlc2V0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5fc2F2ZURhdGEpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlbiA9IDA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2xpbmVEYXNoKSB7XG4gICAgICAgICAgICB0aGlzLl9saW5lRGFzaCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9kYXNoT2Zmc2V0ID0gMDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGhpcy5fcGF0aFNlZ0xlbikge1xuICAgICAgICAgICAgdGhpcy5fcGF0aFNlZ0xlbiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLl9wYXRoTGVuID0gMDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl92ZXJzaW9uKys7XG4gICAgfTtcbiAgICBQYXRoUHJveHkucHJvdG90eXBlLm1vdmVUbyA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHRoaXMuYWRkRGF0YShDTUQuTSwgeCwgeSk7XG4gICAgICAgIHRoaXMuX2N0eCAmJiB0aGlzLl9jdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICB0aGlzLl94MCA9IHg7XG4gICAgICAgIHRoaXMuX3kwID0geTtcbiAgICAgICAgdGhpcy5feGkgPSB4O1xuICAgICAgICB0aGlzLl95aSA9IHk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5saW5lVG8gPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICB2YXIgZXhjZWVkVW5pdCA9IG1hdGhBYnMoeCAtIHRoaXMuX3hpKSA+IHRoaXMuX3V4XG4gICAgICAgICAgICB8fCBtYXRoQWJzKHkgLSB0aGlzLl95aSkgPiB0aGlzLl91eVxuICAgICAgICAgICAgfHwgdGhpcy5fbGVuIDwgNTtcbiAgICAgICAgdGhpcy5hZGREYXRhKENNRC5MLCB4LCB5KTtcbiAgICAgICAgaWYgKHRoaXMuX2N0eCAmJiBleGNlZWRVbml0KSB7XG4gICAgICAgICAgICB0aGlzLl9uZWVkc0Rhc2ggPyB0aGlzLl9kYXNoZWRMaW5lVG8oeCwgeSlcbiAgICAgICAgICAgICAgICA6IHRoaXMuX2N0eC5saW5lVG8oeCwgeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGV4Y2VlZFVuaXQpIHtcbiAgICAgICAgICAgIHRoaXMuX3hpID0geDtcbiAgICAgICAgICAgIHRoaXMuX3lpID0geTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuYmV6aWVyQ3VydmVUbyA9IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKSB7XG4gICAgICAgIHRoaXMuYWRkRGF0YShDTUQuQywgeDEsIHkxLCB4MiwgeTIsIHgzLCB5Myk7XG4gICAgICAgIGlmICh0aGlzLl9jdHgpIHtcbiAgICAgICAgICAgIHRoaXMuX25lZWRzRGFzaCA/IHRoaXMuX2Rhc2hlZEJlemllclRvKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMpXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9jdHguYmV6aWVyQ3VydmVUbyh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl94aSA9IHgzO1xuICAgICAgICB0aGlzLl95aSA9IHkzO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUucXVhZHJhdGljQ3VydmVUbyA9IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5Mikge1xuICAgICAgICB0aGlzLmFkZERhdGEoQ01ELlEsIHgxLCB5MSwgeDIsIHkyKTtcbiAgICAgICAgaWYgKHRoaXMuX2N0eCkge1xuICAgICAgICAgICAgdGhpcy5fbmVlZHNEYXNoID8gdGhpcy5fZGFzaGVkUXVhZHJhdGljVG8oeDEsIHkxLCB4MiwgeTIpXG4gICAgICAgICAgICAgICAgOiB0aGlzLl9jdHgucXVhZHJhdGljQ3VydmVUbyh4MSwgeTEsIHgyLCB5Mik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5feGkgPSB4MjtcbiAgICAgICAgdGhpcy5feWkgPSB5MjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBQYXRoUHJveHkucHJvdG90eXBlLmFyYyA9IGZ1bmN0aW9uIChjeCwgY3ksIHIsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBhbnRpY2xvY2t3aXNlKSB7XG4gICAgICAgIHRtcEFuZ2xlc1swXSA9IHN0YXJ0QW5nbGU7XG4gICAgICAgIHRtcEFuZ2xlc1sxXSA9IGVuZEFuZ2xlO1xuICAgICAgICBub3JtYWxpemVBcmNBbmdsZXModG1wQW5nbGVzLCBhbnRpY2xvY2t3aXNlKTtcbiAgICAgICAgc3RhcnRBbmdsZSA9IHRtcEFuZ2xlc1swXTtcbiAgICAgICAgZW5kQW5nbGUgPSB0bXBBbmdsZXNbMV07XG4gICAgICAgIHZhciBkZWx0YSA9IGVuZEFuZ2xlIC0gc3RhcnRBbmdsZTtcbiAgICAgICAgdGhpcy5hZGREYXRhKENNRC5BLCBjeCwgY3ksIHIsIHIsIHN0YXJ0QW5nbGUsIGRlbHRhLCAwLCBhbnRpY2xvY2t3aXNlID8gMCA6IDEpO1xuICAgICAgICB0aGlzLl9jdHggJiYgdGhpcy5fY3R4LmFyYyhjeCwgY3ksIHIsIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBhbnRpY2xvY2t3aXNlKTtcbiAgICAgICAgdGhpcy5feGkgPSBtYXRoQ29zKGVuZEFuZ2xlKSAqIHIgKyBjeDtcbiAgICAgICAgdGhpcy5feWkgPSBtYXRoU2luKGVuZEFuZ2xlKSAqIHIgKyBjeTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBQYXRoUHJveHkucHJvdG90eXBlLmFyY1RvID0gZnVuY3Rpb24gKHgxLCB5MSwgeDIsIHkyLCByYWRpdXMpIHtcbiAgICAgICAgaWYgKHRoaXMuX2N0eCkge1xuICAgICAgICAgICAgdGhpcy5fY3R4LmFyY1RvKHgxLCB5MSwgeDIsIHkyLCByYWRpdXMpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5yZWN0ID0gZnVuY3Rpb24gKHgsIHksIHcsIGgpIHtcbiAgICAgICAgdGhpcy5fY3R4ICYmIHRoaXMuX2N0eC5yZWN0KHgsIHksIHcsIGgpO1xuICAgICAgICB0aGlzLmFkZERhdGEoQ01ELlIsIHgsIHksIHcsIGgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuY2xvc2VQYXRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmFkZERhdGEoQ01ELlopO1xuICAgICAgICB2YXIgY3R4ID0gdGhpcy5fY3R4O1xuICAgICAgICB2YXIgeDAgPSB0aGlzLl94MDtcbiAgICAgICAgdmFyIHkwID0gdGhpcy5feTA7XG4gICAgICAgIGlmIChjdHgpIHtcbiAgICAgICAgICAgIHRoaXMuX25lZWRzRGFzaCAmJiB0aGlzLl9kYXNoZWRMaW5lVG8oeDAsIHkwKTtcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl94aSA9IHgwO1xuICAgICAgICB0aGlzLl95aSA9IHkwO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuZmlsbCA9IGZ1bmN0aW9uIChjdHgpIHtcbiAgICAgICAgY3R4ICYmIGN0eC5maWxsKCk7XG4gICAgICAgIHRoaXMudG9TdGF0aWMoKTtcbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuc3Ryb2tlID0gZnVuY3Rpb24gKGN0eCkge1xuICAgICAgICBjdHggJiYgY3R4LnN0cm9rZSgpO1xuICAgICAgICB0aGlzLnRvU3RhdGljKCk7XG4gICAgfTtcbiAgICBQYXRoUHJveHkucHJvdG90eXBlLnNldExpbmVEYXNoID0gZnVuY3Rpb24gKGxpbmVEYXNoKSB7XG4gICAgICAgIGlmIChsaW5lRGFzaCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgICB0aGlzLl9saW5lRGFzaCA9IGxpbmVEYXNoO1xuICAgICAgICAgICAgdGhpcy5fZGFzaElkeCA9IDA7XG4gICAgICAgICAgICB2YXIgbGluZURhc2hTdW0gPSAwO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5lRGFzaC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGxpbmVEYXNoU3VtICs9IGxpbmVEYXNoW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fZGFzaFN1bSA9IGxpbmVEYXNoU3VtO1xuICAgICAgICAgICAgdGhpcy5fbmVlZHNEYXNoID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuX2xpbmVEYXNoID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuX25lZWRzRGFzaCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5zZXRMaW5lRGFzaE9mZnNldCA9IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgdGhpcy5fZGFzaE9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBQYXRoUHJveHkucHJvdG90eXBlLmxlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xlbjtcbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuc2V0RGF0YSA9IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgIHZhciBsZW4gPSBkYXRhLmxlbmd0aDtcbiAgICAgICAgaWYgKCEodGhpcy5kYXRhICYmIHRoaXMuZGF0YS5sZW5ndGggPT09IGxlbikgJiYgaGFzVHlwZWRBcnJheSkge1xuICAgICAgICAgICAgdGhpcy5kYXRhID0gbmV3IEZsb2F0MzJBcnJheShsZW4pO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YVtpXSA9IGRhdGFbaV07XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGVuID0gbGVuO1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5hcHBlbmRQYXRoID0gZnVuY3Rpb24gKHBhdGgpIHtcbiAgICAgICAgaWYgKCEocGF0aCBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICAgICAgcGF0aCA9IFtwYXRoXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGVuID0gcGF0aC5sZW5ndGg7XG4gICAgICAgIHZhciBhcHBlbmRTaXplID0gMDtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX2xlbjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgYXBwZW5kU2l6ZSArPSBwYXRoW2ldLmxlbigpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChoYXNUeXBlZEFycmF5ICYmICh0aGlzLmRhdGEgaW5zdGFuY2VvZiBGbG9hdDMyQXJyYXkpKSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSBuZXcgRmxvYXQzMkFycmF5KG9mZnNldCArIGFwcGVuZFNpemUpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBhcHBlbmRQYXRoRGF0YSA9IHBhdGhbaV0uZGF0YTtcbiAgICAgICAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgYXBwZW5kUGF0aERhdGEubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRhdGFbb2Zmc2V0KytdID0gYXBwZW5kUGF0aERhdGFba107XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGVuID0gb2Zmc2V0O1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5hZGREYXRhID0gZnVuY3Rpb24gKGNtZCwgYSwgYiwgYywgZCwgZSwgZiwgZywgaCkge1xuICAgICAgICBpZiAoIXRoaXMuX3NhdmVEYXRhKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIGlmICh0aGlzLl9sZW4gKyBhcmd1bWVudHMubGVuZ3RoID4gZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2V4cGFuZERhdGEoKTtcbiAgICAgICAgICAgIGRhdGEgPSB0aGlzLmRhdGE7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGRhdGFbdGhpcy5fbGVuKytdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQYXRoUHJveHkucHJvdG90eXBlLl9leHBhbmREYXRhID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoISh0aGlzLmRhdGEgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgIHZhciBuZXdEYXRhID0gW107XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX2xlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbmV3RGF0YVtpXSA9IHRoaXMuZGF0YVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ld0RhdGE7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuX2Rhc2hlZExpbmVUbyA9IGZ1bmN0aW9uICh4MSwgeTEpIHtcbiAgICAgICAgdmFyIGRhc2hTdW0gPSB0aGlzLl9kYXNoU3VtO1xuICAgICAgICB2YXIgbGluZURhc2ggPSB0aGlzLl9saW5lRGFzaDtcbiAgICAgICAgdmFyIGN0eCA9IHRoaXMuX2N0eDtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX2Rhc2hPZmZzZXQ7XG4gICAgICAgIHZhciB4MCA9IHRoaXMuX3hpO1xuICAgICAgICB2YXIgeTAgPSB0aGlzLl95aTtcbiAgICAgICAgdmFyIGR4ID0geDEgLSB4MDtcbiAgICAgICAgdmFyIGR5ID0geTEgLSB5MDtcbiAgICAgICAgdmFyIGRpc3QgPSBtYXRoU3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIHZhciB4ID0geDA7XG4gICAgICAgIHZhciB5ID0geTA7XG4gICAgICAgIHZhciBuRGFzaCA9IGxpbmVEYXNoLmxlbmd0aDtcbiAgICAgICAgdmFyIGRhc2g7XG4gICAgICAgIHZhciBpZHg7XG4gICAgICAgIGR4IC89IGRpc3Q7XG4gICAgICAgIGR5IC89IGRpc3Q7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSBkYXNoU3VtICsgb2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCAlPSBkYXNoU3VtO1xuICAgICAgICB4IC09IG9mZnNldCAqIGR4O1xuICAgICAgICB5IC09IG9mZnNldCAqIGR5O1xuICAgICAgICB3aGlsZSAoKGR4ID4gMCAmJiB4IDw9IHgxKSB8fCAoZHggPCAwICYmIHggPj0geDEpXG4gICAgICAgICAgICB8fCAoZHggPT09IDAgJiYgKChkeSA+IDAgJiYgeSA8PSB5MSkgfHwgKGR5IDwgMCAmJiB5ID49IHkxKSkpKSB7XG4gICAgICAgICAgICBpZHggPSB0aGlzLl9kYXNoSWR4O1xuICAgICAgICAgICAgZGFzaCA9IGxpbmVEYXNoW2lkeF07XG4gICAgICAgICAgICB4ICs9IGR4ICogZGFzaDtcbiAgICAgICAgICAgIHkgKz0gZHkgKiBkYXNoO1xuICAgICAgICAgICAgdGhpcy5fZGFzaElkeCA9IChpZHggKyAxKSAlIG5EYXNoO1xuICAgICAgICAgICAgaWYgKChkeCA+IDAgJiYgeCA8IHgwKSB8fCAoZHggPCAwICYmIHggPiB4MCkgfHwgKGR5ID4gMCAmJiB5IDwgeTApIHx8IChkeSA8IDAgJiYgeSA+IHkwKSkge1xuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY3R4W2lkeCAlIDIgPyAnbW92ZVRvJyA6ICdsaW5lVG8nXShkeCA+PSAwID8gbWF0aE1pbih4LCB4MSkgOiBtYXRoTWF4KHgsIHgxKSwgZHkgPj0gMCA/IG1hdGhNaW4oeSwgeTEpIDogbWF0aE1heCh5LCB5MSkpO1xuICAgICAgICB9XG4gICAgICAgIGR4ID0geCAtIHgxO1xuICAgICAgICBkeSA9IHkgLSB5MTtcbiAgICAgICAgdGhpcy5fZGFzaE9mZnNldCA9IC1tYXRoU3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgfTtcbiAgICBQYXRoUHJveHkucHJvdG90eXBlLl9kYXNoZWRCZXppZXJUbyA9IGZ1bmN0aW9uICh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKSB7XG4gICAgICAgIHZhciBjdHggPSB0aGlzLl9jdHg7XG4gICAgICAgIHZhciBkYXNoU3VtID0gdGhpcy5fZGFzaFN1bTtcbiAgICAgICAgdmFyIG9mZnNldCA9IHRoaXMuX2Rhc2hPZmZzZXQ7XG4gICAgICAgIHZhciBsaW5lRGFzaCA9IHRoaXMuX2xpbmVEYXNoO1xuICAgICAgICB2YXIgeDAgPSB0aGlzLl94aTtcbiAgICAgICAgdmFyIHkwID0gdGhpcy5feWk7XG4gICAgICAgIHZhciBiZXppZXJMZW4gPSAwO1xuICAgICAgICB2YXIgaWR4ID0gdGhpcy5fZGFzaElkeDtcbiAgICAgICAgdmFyIG5EYXNoID0gbGluZURhc2gubGVuZ3RoO1xuICAgICAgICB2YXIgdDtcbiAgICAgICAgdmFyIGR4O1xuICAgICAgICB2YXIgZHk7XG4gICAgICAgIHZhciB4O1xuICAgICAgICB2YXIgeTtcbiAgICAgICAgdmFyIHRtcExlbiA9IDA7XG4gICAgICAgIGlmIChvZmZzZXQgPCAwKSB7XG4gICAgICAgICAgICBvZmZzZXQgPSBkYXNoU3VtICsgb2Zmc2V0O1xuICAgICAgICB9XG4gICAgICAgIG9mZnNldCAlPSBkYXNoU3VtO1xuICAgICAgICBmb3IgKHQgPSAwOyB0IDwgMTsgdCArPSAwLjEpIHtcbiAgICAgICAgICAgIGR4ID0gY3ViaWNBdCh4MCwgeDEsIHgyLCB4MywgdCArIDAuMSlcbiAgICAgICAgICAgICAgICAtIGN1YmljQXQoeDAsIHgxLCB4MiwgeDMsIHQpO1xuICAgICAgICAgICAgZHkgPSBjdWJpY0F0KHkwLCB5MSwgeTIsIHkzLCB0ICsgMC4xKVxuICAgICAgICAgICAgICAgIC0gY3ViaWNBdCh5MCwgeTEsIHkyLCB5MywgdCk7XG4gICAgICAgICAgICBiZXppZXJMZW4gKz0gbWF0aFNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoOyBpZHggPCBuRGFzaDsgaWR4KyspIHtcbiAgICAgICAgICAgIHRtcExlbiArPSBsaW5lRGFzaFtpZHhdO1xuICAgICAgICAgICAgaWYgKHRtcExlbiA+IG9mZnNldCkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHQgPSAodG1wTGVuIC0gb2Zmc2V0KSAvIGJlemllckxlbjtcbiAgICAgICAgd2hpbGUgKHQgPD0gMSkge1xuICAgICAgICAgICAgeCA9IGN1YmljQXQoeDAsIHgxLCB4MiwgeDMsIHQpO1xuICAgICAgICAgICAgeSA9IGN1YmljQXQoeTAsIHkxLCB5MiwgeTMsIHQpO1xuICAgICAgICAgICAgaWR4ICUgMiA/IGN0eC5tb3ZlVG8oeCwgeSlcbiAgICAgICAgICAgICAgICA6IGN0eC5saW5lVG8oeCwgeSk7XG4gICAgICAgICAgICB0ICs9IGxpbmVEYXNoW2lkeF0gLyBiZXppZXJMZW47XG4gICAgICAgICAgICBpZHggPSAoaWR4ICsgMSkgJSBuRGFzaDtcbiAgICAgICAgfVxuICAgICAgICAoaWR4ICUgMiAhPT0gMCkgJiYgY3R4LmxpbmVUbyh4MywgeTMpO1xuICAgICAgICBkeCA9IHgzIC0geDtcbiAgICAgICAgZHkgPSB5MyAtIHk7XG4gICAgICAgIHRoaXMuX2Rhc2hPZmZzZXQgPSAtbWF0aFNxcnQoZHggKiBkeCArIGR5ICogZHkpO1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5fZGFzaGVkUXVhZHJhdGljVG8gPSBmdW5jdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICAgICAgdmFyIHgzID0geDI7XG4gICAgICAgIHZhciB5MyA9IHkyO1xuICAgICAgICB4MiA9ICh4MiArIDIgKiB4MSkgLyAzO1xuICAgICAgICB5MiA9ICh5MiArIDIgKiB5MSkgLyAzO1xuICAgICAgICB4MSA9ICh0aGlzLl94aSArIDIgKiB4MSkgLyAzO1xuICAgICAgICB5MSA9ICh0aGlzLl95aSArIDIgKiB5MSkgLyAzO1xuICAgICAgICB0aGlzLl9kYXNoZWRCZXppZXJUbyh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzKTtcbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUudG9TdGF0aWMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fc2F2ZURhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgaWYgKGRhdGEgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgICAgZGF0YS5sZW5ndGggPSB0aGlzLl9sZW47XG4gICAgICAgICAgICBpZiAoaGFzVHlwZWRBcnJheSAmJiB0aGlzLl9sZW4gPiAxMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGF0YSA9IG5ldyBGbG9hdDMyQXJyYXkoZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBhdGhQcm94eS5wcm90b3R5cGUuZ2V0Qm91bmRpbmdSZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBtaW5bMF0gPSBtaW5bMV0gPSBtaW4yWzBdID0gbWluMlsxXSA9IE51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIG1heFswXSA9IG1heFsxXSA9IG1heDJbMF0gPSBtYXgyWzFdID0gLU51bWJlci5NQVhfVkFMVUU7XG4gICAgICAgIHZhciBkYXRhID0gdGhpcy5kYXRhO1xuICAgICAgICB2YXIgeGkgPSAwO1xuICAgICAgICB2YXIgeWkgPSAwO1xuICAgICAgICB2YXIgeDAgPSAwO1xuICAgICAgICB2YXIgeTAgPSAwO1xuICAgICAgICB2YXIgaTtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRoaXMuX2xlbjspIHtcbiAgICAgICAgICAgIHZhciBjbWQgPSBkYXRhW2krK107XG4gICAgICAgICAgICB2YXIgaXNGaXJzdCA9IGkgPT09IDE7XG4gICAgICAgICAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICAgICAgICAgIHhpID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICB5aSA9IGRhdGFbaSArIDFdO1xuICAgICAgICAgICAgICAgIHgwID0geGk7XG4gICAgICAgICAgICAgICAgeTAgPSB5aTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY21kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBDTUQuTTpcbiAgICAgICAgICAgICAgICAgICAgeGkgPSB4MCA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgeWkgPSB5MCA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgbWluMlswXSA9IHgwO1xuICAgICAgICAgICAgICAgICAgICBtaW4yWzFdID0geTA7XG4gICAgICAgICAgICAgICAgICAgIG1heDJbMF0gPSB4MDtcbiAgICAgICAgICAgICAgICAgICAgbWF4MlsxXSA9IHkwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENNRC5MOlxuICAgICAgICAgICAgICAgICAgICBmcm9tTGluZSh4aSwgeWksIGRhdGFbaV0sIGRhdGFbaSArIDFdLCBtaW4yLCBtYXgyKTtcbiAgICAgICAgICAgICAgICAgICAgeGkgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHlpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENNRC5DOlxuICAgICAgICAgICAgICAgICAgICBmcm9tQ3ViaWMoeGksIHlpLCBkYXRhW2krK10sIGRhdGFbaSsrXSwgZGF0YVtpKytdLCBkYXRhW2krK10sIGRhdGFbaV0sIGRhdGFbaSArIDFdLCBtaW4yLCBtYXgyKTtcbiAgICAgICAgICAgICAgICAgICAgeGkgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHlpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENNRC5ROlxuICAgICAgICAgICAgICAgICAgICBmcm9tUXVhZHJhdGljKHhpLCB5aSwgZGF0YVtpKytdLCBkYXRhW2krK10sIGRhdGFbaV0sIGRhdGFbaSArIDFdLCBtaW4yLCBtYXgyKTtcbiAgICAgICAgICAgICAgICAgICAgeGkgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHlpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENNRC5BOlxuICAgICAgICAgICAgICAgICAgICB2YXIgY3ggPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciBjeSA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJ4ID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcnkgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydEFuZ2xlID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZW5kQW5nbGUgPSBkYXRhW2krK10gKyBzdGFydEFuZ2xlO1xuICAgICAgICAgICAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBhbnRpY2xvY2t3aXNlID0gIWRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmlyc3QpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHgwID0gbWF0aENvcyhzdGFydEFuZ2xlKSAqIHJ4ICsgY3g7XG4gICAgICAgICAgICAgICAgICAgICAgICB5MCA9IG1hdGhTaW4oc3RhcnRBbmdsZSkgKiByeSArIGN5O1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGZyb21BcmMoY3gsIGN5LCByeCwgcnksIHN0YXJ0QW5nbGUsIGVuZEFuZ2xlLCBhbnRpY2xvY2t3aXNlLCBtaW4yLCBtYXgyKTtcbiAgICAgICAgICAgICAgICAgICAgeGkgPSBtYXRoQ29zKGVuZEFuZ2xlKSAqIHJ4ICsgY3g7XG4gICAgICAgICAgICAgICAgICAgIHlpID0gbWF0aFNpbihlbmRBbmdsZSkgKiByeSArIGN5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENNRC5SOlxuICAgICAgICAgICAgICAgICAgICB4MCA9IHhpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB5MCA9IHlpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIGZyb21MaW5lKHgwLCB5MCwgeDAgKyB3aWR0aCwgeTAgKyBoZWlnaHQsIG1pbjIsIG1heDIpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENNRC5aOlxuICAgICAgICAgICAgICAgICAgICB4aSA9IHgwO1xuICAgICAgICAgICAgICAgICAgICB5aSA9IHkwO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZlYzIubWluKG1pbiwgbWluLCBtaW4yKTtcbiAgICAgICAgICAgIHZlYzIubWF4KG1heCwgbWF4LCBtYXgyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaSA9PT0gMCkge1xuICAgICAgICAgICAgbWluWzBdID0gbWluWzFdID0gbWF4WzBdID0gbWF4WzFdID0gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IEJvdW5kaW5nUmVjdChtaW5bMF0sIG1pblsxXSwgbWF4WzBdIC0gbWluWzBdLCBtYXhbMV0gLSBtaW5bMV0pO1xuICAgIH07XG4gICAgUGF0aFByb3h5LnByb3RvdHlwZS5fY2FsY3VsYXRlTGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGF0YSA9IHRoaXMuZGF0YTtcbiAgICAgICAgdmFyIGxlbiA9IHRoaXMuX2xlbjtcbiAgICAgICAgdmFyIHV4ID0gdGhpcy5fdXg7XG4gICAgICAgIHZhciB1eSA9IHRoaXMuX3V5O1xuICAgICAgICB2YXIgeGkgPSAwO1xuICAgICAgICB2YXIgeWkgPSAwO1xuICAgICAgICB2YXIgeDAgPSAwO1xuICAgICAgICB2YXIgeTAgPSAwO1xuICAgICAgICBpZiAoIXRoaXMuX3BhdGhTZWdMZW4pIHtcbiAgICAgICAgICAgIHRoaXMuX3BhdGhTZWdMZW4gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGF0aFNlZ0xlbiA9IHRoaXMuX3BhdGhTZWdMZW47XG4gICAgICAgIHZhciBwYXRoVG90YWxMZW4gPSAwO1xuICAgICAgICB2YXIgc2VnQ291bnQgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjspIHtcbiAgICAgICAgICAgIHZhciBjbWQgPSBkYXRhW2krK107XG4gICAgICAgICAgICB2YXIgaXNGaXJzdCA9IGkgPT09IDE7XG4gICAgICAgICAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICAgICAgICAgIHhpID0gZGF0YVtpXTtcbiAgICAgICAgICAgICAgICB5aSA9IGRhdGFbaSArIDFdO1xuICAgICAgICAgICAgICAgIHgwID0geGk7XG4gICAgICAgICAgICAgICAgeTAgPSB5aTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBsID0gLTE7XG4gICAgICAgICAgICBzd2l0Y2ggKGNtZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgQ01ELk06XG4gICAgICAgICAgICAgICAgICAgIHhpID0geDAgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHlpID0geTAgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQ01ELkw6IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHgyID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeTIgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciBkeCA9IHgyIC0geGk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBkeSA9IHkyIC0geWk7XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRoQWJzKGR4KSA+IHV4IHx8IG1hdGhBYnMoZHkpID4gdXkgfHwgaSA9PT0gbGVuIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbCA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB4aSA9IHgyO1xuICAgICAgICAgICAgICAgICAgICAgICAgeWkgPSB5MjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBDTUQuQzoge1xuICAgICAgICAgICAgICAgICAgICB2YXIgeDEgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciB5MSA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHgyID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeTIgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciB4MyA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkzID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICBsID0gY3ViaWNMZW5ndGgoeGksIHlpLCB4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIHhpID0geDM7XG4gICAgICAgICAgICAgICAgICAgIHlpID0geTM7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIENNRC5ROiB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB4MSA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkxID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeDIgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciB5MiA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgbCA9IHF1YWRyYXRpY0xlbmd0aCh4aSwgeWksIHgxLCB5MSwgeDIsIHkyLCAxMCk7XG4gICAgICAgICAgICAgICAgICAgIHhpID0geDI7XG4gICAgICAgICAgICAgICAgICAgIHlpID0geTI7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXNlIENNRC5BOlxuICAgICAgICAgICAgICAgICAgICB2YXIgY3ggPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciBjeSA9IGRhdGFbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJ4ID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcnkgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdGFydEFuZ2xlID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZGVsdGEgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciBlbmRBbmdsZSA9IGRlbHRhICsgc3RhcnRBbmdsZTtcbiAgICAgICAgICAgICAgICAgICAgaSArPSAxO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYW50aWNsb2Nrd2lzZSA9ICFkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpcnN0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB4MCA9IG1hdGhDb3Moc3RhcnRBbmdsZSkgKiByeCArIGN4O1xuICAgICAgICAgICAgICAgICAgICAgICAgeTAgPSBtYXRoU2luKHN0YXJ0QW5nbGUpICogcnkgKyBjeTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsID0gbWF0aE1heChyeCwgcnkpICogbWF0aE1pbihQSTIsIE1hdGguYWJzKGRlbHRhKSk7XG4gICAgICAgICAgICAgICAgICAgIHhpID0gbWF0aENvcyhlbmRBbmdsZSkgKiByeCArIGN4O1xuICAgICAgICAgICAgICAgICAgICB5aSA9IG1hdGhTaW4oZW5kQW5nbGUpICogcnkgKyBjeTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBDTUQuUjoge1xuICAgICAgICAgICAgICAgICAgICB4MCA9IHhpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB5MCA9IHlpID0gZGF0YVtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBkYXRhW2krK107XG4gICAgICAgICAgICAgICAgICAgIGwgPSB3aWR0aCAqIDIgKyBoZWlnaHQgKiAyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBDTUQuWjoge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHggPSB4MCAtIHhpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHkgPSB5MCAtIHlpO1xuICAgICAgICAgICAgICAgICAgICBsID0gTWF0aC5zcXJ0KGR4ICogZHggKyBkeSAqIGR5KTtcbiAgICAgICAgICAgICAgICAgICAgeGkgPSB4MDtcbiAgICAgICAgICAgICAgICAgICAgeWkgPSB5MDtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGwgPj0gMCkge1xuICAgICAgICAgICAgICAgIHBhdGhTZWdMZW5bc2VnQ291bnQrK10gPSBsO1xuICAgICAgICAgICAgICAgIHBhdGhUb3RhbExlbiArPSBsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3BhdGhMZW4gPSBwYXRoVG90YWxMZW47XG4gICAgICAgIHJldHVybiBwYXRoVG90YWxMZW47XG4gICAgfTtcbiAgICBQYXRoUHJveHkucHJvdG90eXBlLnJlYnVpbGRQYXRoID0gZnVuY3Rpb24gKGN0eCwgcGVyY2VudCkge1xuICAgICAgICB2YXIgZCA9IHRoaXMuZGF0YTtcbiAgICAgICAgdmFyIHV4ID0gdGhpcy5fdXg7XG4gICAgICAgIHZhciB1eSA9IHRoaXMuX3V5O1xuICAgICAgICB2YXIgbGVuID0gdGhpcy5fbGVuO1xuICAgICAgICB2YXIgeDA7XG4gICAgICAgIHZhciB5MDtcbiAgICAgICAgdmFyIHhpO1xuICAgICAgICB2YXIgeWk7XG4gICAgICAgIHZhciB4O1xuICAgICAgICB2YXIgeTtcbiAgICAgICAgdmFyIGRyYXdQYXJ0ID0gcGVyY2VudCA8IDE7XG4gICAgICAgIHZhciBwYXRoU2VnTGVuO1xuICAgICAgICB2YXIgcGF0aFRvdGFsTGVuO1xuICAgICAgICB2YXIgYWNjdW1MZW5ndGggPSAwO1xuICAgICAgICB2YXIgc2VnQ291bnQgPSAwO1xuICAgICAgICB2YXIgZGlzcGxheWVkTGVuZ3RoO1xuICAgICAgICBpZiAoZHJhd1BhcnQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5fcGF0aFNlZ0xlbikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NhbGN1bGF0ZUxlbmd0aCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcGF0aFNlZ0xlbiA9IHRoaXMuX3BhdGhTZWdMZW47XG4gICAgICAgICAgICBwYXRoVG90YWxMZW4gPSB0aGlzLl9wYXRoTGVuO1xuICAgICAgICAgICAgZGlzcGxheWVkTGVuZ3RoID0gcGVyY2VudCAqIHBhdGhUb3RhbExlbjtcbiAgICAgICAgICAgIGlmICghZGlzcGxheWVkTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGxvOiBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjspIHtcbiAgICAgICAgICAgIHZhciBjbWQgPSBkW2krK107XG4gICAgICAgICAgICB2YXIgaXNGaXJzdCA9IGkgPT09IDE7XG4gICAgICAgICAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICAgICAgICAgIHhpID0gZFtpXTtcbiAgICAgICAgICAgICAgICB5aSA9IGRbaSArIDFdO1xuICAgICAgICAgICAgICAgIHgwID0geGk7XG4gICAgICAgICAgICAgICAgeTAgPSB5aTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN3aXRjaCAoY21kKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBDTUQuTTpcbiAgICAgICAgICAgICAgICAgICAgeDAgPSB4aSA9IGRbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgeTAgPSB5aSA9IGRbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgY3R4Lm1vdmVUbyh4aSwgeWkpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENNRC5MOiB7XG4gICAgICAgICAgICAgICAgICAgIHggPSBkW2krK107XG4gICAgICAgICAgICAgICAgICAgIHkgPSBkW2krK107XG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRoQWJzKHggLSB4aSkgPiB1eCB8fCBtYXRoQWJzKHkgLSB5aSkgPiB1eSB8fCBpID09PSBsZW4gLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd1BhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbCA9IHBhdGhTZWdMZW5bc2VnQ291bnQrK107XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjY3VtTGVuZ3RoICsgbCA+IGRpc3BsYXllZExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IChkaXNwbGF5ZWRMZW5ndGggLSBhY2N1bUxlbmd0aCkgLyBsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHhpICogKDEgLSB0KSArIHggKiB0LCB5aSAqICgxIC0gdCkgKyB5ICogdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrIGxvO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY2N1bUxlbmd0aCArPSBsO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh4LCB5KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHhpID0geDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHlpID0geTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBDTUQuQzoge1xuICAgICAgICAgICAgICAgICAgICB2YXIgeDEgPSBkW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciB5MSA9IGRbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHgyID0gZFtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeTIgPSBkW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciB4MyA9IGRbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHkzID0gZFtpKytdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd1BhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsID0gcGF0aFNlZ0xlbltzZWdDb3VudCsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY2N1bUxlbmd0aCArIGwgPiBkaXNwbGF5ZWRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgdCA9IChkaXNwbGF5ZWRMZW5ndGggLSBhY2N1bUxlbmd0aCkgLyBsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1YmljU3ViZGl2aWRlKHhpLCB4MSwgeDIsIHgzLCB0LCB0bXBPdXRYKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdWJpY1N1YmRpdmlkZSh5aSwgeTEsIHkyLCB5MywgdCwgdG1wT3V0WSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmJlemllckN1cnZlVG8odG1wT3V0WFsxXSwgdG1wT3V0WVsxXSwgdG1wT3V0WFsyXSwgdG1wT3V0WVsyXSwgdG1wT3V0WFszXSwgdG1wT3V0WVszXSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgbG87XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2N1bUxlbmd0aCArPSBsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN0eC5iZXppZXJDdXJ2ZVRvKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMpO1xuICAgICAgICAgICAgICAgICAgICB4aSA9IHgzO1xuICAgICAgICAgICAgICAgICAgICB5aSA9IHkzO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBDTUQuUToge1xuICAgICAgICAgICAgICAgICAgICB2YXIgeDEgPSBkW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciB5MSA9IGRbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHgyID0gZFtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgeTIgPSBkW2krK107XG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmF3UGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBwYXRoU2VnTGVuW3NlZ0NvdW50KytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjY3VtTGVuZ3RoICsgbCA+IGRpc3BsYXllZExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gKGRpc3BsYXllZExlbmd0aCAtIGFjY3VtTGVuZ3RoKSAvIGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcXVhZHJhdGljU3ViZGl2aWRlKHhpLCB4MSwgeDIsIHQsIHRtcE91dFgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHF1YWRyYXRpY1N1YmRpdmlkZSh5aSwgeTEsIHkyLCB0LCB0bXBPdXRZKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgucXVhZHJhdGljQ3VydmVUbyh0bXBPdXRYWzFdLCB0bXBPdXRZWzFdLCB0bXBPdXRYWzJdLCB0bXBPdXRZWzJdKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBsbztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VtTGVuZ3RoICs9IGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8oeDEsIHkxLCB4MiwgeTIpO1xuICAgICAgICAgICAgICAgICAgICB4aSA9IHgyO1xuICAgICAgICAgICAgICAgICAgICB5aSA9IHkyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2FzZSBDTUQuQTpcbiAgICAgICAgICAgICAgICAgICAgdmFyIGN4ID0gZFtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY3kgPSBkW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciByeCA9IGRbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJ5ID0gZFtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3RhcnRBbmdsZSA9IGRbaSsrXTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRlbHRhID0gZFtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcHNpID0gZFtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYW50aWNsb2Nrd2lzZSA9ICFkW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciByID0gKHJ4ID4gcnkpID8gcnggOiByeTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHNjYWxlWCA9IChyeCA+IHJ5KSA/IDEgOiByeCAvIHJ5O1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2NhbGVZID0gKHJ4ID4gcnkpID8gcnkgLyByeCA6IDE7XG4gICAgICAgICAgICAgICAgICAgIHZhciBpc0VsbGlwc2UgPSBtYXRoQWJzKHJ4IC0gcnkpID4gMWUtMztcbiAgICAgICAgICAgICAgICAgICAgdmFyIGVuZEFuZ2xlID0gc3RhcnRBbmdsZSArIGRlbHRhO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYnJlYWtCdWlsZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZHJhd1BhcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsID0gcGF0aFNlZ0xlbltzZWdDb3VudCsrXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhY2N1bUxlbmd0aCArIGwgPiBkaXNwbGF5ZWRMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmRBbmdsZSA9IHN0YXJ0QW5nbGUgKyBkZWx0YSAqIChkaXNwbGF5ZWRMZW5ndGggLSBhY2N1bUxlbmd0aCkgLyBsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrQnVpbGQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWNjdW1MZW5ndGggKz0gbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNFbGxpcHNlICYmIGN0eC5lbGxpcHNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguZWxsaXBzZShjeCwgY3ksIHJ4LCByeSwgcHNpLCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdHguYXJjKGN4LCBjeSwgciwgc3RhcnRBbmdsZSwgZW5kQW5nbGUsIGFudGljbG9ja3dpc2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChicmVha0J1aWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhayBsbztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgeDAgPSBtYXRoQ29zKHN0YXJ0QW5nbGUpICogcnggKyBjeDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHkwID0gbWF0aFNpbihzdGFydEFuZ2xlKSAqIHJ5ICsgY3k7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgeGkgPSBtYXRoQ29zKGVuZEFuZ2xlKSAqIHJ4ICsgY3g7XG4gICAgICAgICAgICAgICAgICAgIHlpID0gbWF0aFNpbihlbmRBbmdsZSkgKiByeSArIGN5O1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlIENNRC5SOlxuICAgICAgICAgICAgICAgICAgICB4MCA9IHhpID0gZFtpXTtcbiAgICAgICAgICAgICAgICAgICAgeTAgPSB5aSA9IGRbaSArIDFdO1xuICAgICAgICAgICAgICAgICAgICB4ID0gZFtpKytdO1xuICAgICAgICAgICAgICAgICAgICB5ID0gZFtpKytdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgd2lkdGggPSBkW2krK107XG4gICAgICAgICAgICAgICAgICAgIHZhciBoZWlnaHQgPSBkW2krK107XG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmF3UGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBwYXRoU2VnTGVuW3NlZ0NvdW50KytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjY3VtTGVuZ3RoICsgbCA+IGRpc3BsYXllZExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkXzEgPSBkaXNwbGF5ZWRMZW5ndGggLSBhY2N1bUxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5saW5lVG8oeCArIG1hdGhNaW4oZF8xLCB3aWR0aCksIHkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMSAtPSB3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZF8xID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHggKyB3aWR0aCwgeSArIG1hdGhNaW4oZF8xLCBoZWlnaHQpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZF8xIC09IGhlaWdodDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZF8xID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHggKyBtYXRoTWF4KHdpZHRoIC0gZF8xLCAwKSwgeSArIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRfMSAtPSB3aWR0aDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZF8xID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdHgubGluZVRvKHgsIHkgKyBtYXRoTWF4KGhlaWdodCAtIGRfMSwgMCkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhayBsbztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY3VtTGVuZ3RoICs9IGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY3R4LnJlY3QoeCwgeSwgd2lkdGgsIGhlaWdodCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgQ01ELlo6XG4gICAgICAgICAgICAgICAgICAgIGlmIChkcmF3UGFydCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBwYXRoU2VnTGVuW3NlZ0NvdW50KytdO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFjY3VtTGVuZ3RoICsgbCA+IGRpc3BsYXllZExlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciB0ID0gKGRpc3BsYXllZExlbmd0aCAtIGFjY3VtTGVuZ3RoKSAvIGw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmxpbmVUbyh4aSAqICgxIC0gdCkgKyB4MCAqIHQsIHlpICogKDEgLSB0KSArIHkwICogdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWsgbG87XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhY2N1bUxlbmd0aCArPSBsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgICAgICAgICAgeGkgPSB4MDtcbiAgICAgICAgICAgICAgICAgICAgeWkgPSB5MDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUGF0aFByb3h5LkNNRCA9IENNRDtcbiAgICBQYXRoUHJveHkuaW5pdERlZmF1bHRQcm9wcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcm90byA9IFBhdGhQcm94eS5wcm90b3R5cGU7XG4gICAgICAgIHByb3RvLl9zYXZlRGF0YSA9IHRydWU7XG4gICAgICAgIHByb3RvLl9uZWVkc0Rhc2ggPSBmYWxzZTtcbiAgICAgICAgcHJvdG8uX2Rhc2hPZmZzZXQgPSAwO1xuICAgICAgICBwcm90by5fZGFzaElkeCA9IDA7XG4gICAgICAgIHByb3RvLl9kYXNoU3VtID0gMDtcbiAgICAgICAgcHJvdG8uX3V4ID0gMDtcbiAgICAgICAgcHJvdG8uX3V5ID0gMDtcbiAgICB9KSgpO1xuICAgIHJldHVybiBQYXRoUHJveHk7XG59KCkpO1xuZXhwb3J0IGRlZmF1bHQgUGF0aFByb3h5O1xuIiwidmFyIFBvaW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHggfHwgMDtcbiAgICAgICAgdGhpcy55ID0geSB8fCAwO1xuICAgIH1cbiAgICBQb2ludC5wcm90b3R5cGUuY29weSA9IGZ1bmN0aW9uIChvdGhlcikge1xuICAgICAgICB0aGlzLnggPSBvdGhlci54O1xuICAgICAgICB0aGlzLnkgPSBvdGhlci55O1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFBvaW50LnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBQb2ludCh0aGlzLngsIHRoaXMueSk7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUuZXF1YWwgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgcmV0dXJuIG90aGVyLnggPT09IHRoaXMueCAmJiBvdGhlci55ID09PSB0aGlzLnk7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHRoaXMueCArPSBvdGhlci54O1xuICAgICAgICB0aGlzLnkgKz0gb3RoZXIueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUuc2NhbGUgPSBmdW5jdGlvbiAoc2NhbGFyKSB7XG4gICAgICAgIHRoaXMueCAqPSBzY2FsYXI7XG4gICAgICAgIHRoaXMueSAqPSBzY2FsYXI7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUuc2NhbGVBbmRBZGQgPSBmdW5jdGlvbiAob3RoZXIsIHNjYWxhcikge1xuICAgICAgICB0aGlzLnggKz0gb3RoZXIueCAqIHNjYWxhcjtcbiAgICAgICAgdGhpcy55ICs9IG90aGVyLnkgKiBzY2FsYXI7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUuc3ViID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHRoaXMueCAtPSBvdGhlci54O1xuICAgICAgICB0aGlzLnkgLT0gb3RoZXIueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUuZG90ID0gZnVuY3Rpb24gKG90aGVyKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiBvdGhlci54ICsgdGhpcy55ICogb3RoZXIueTtcbiAgICB9O1xuICAgIFBvaW50LnByb3RvdHlwZS5sZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBNYXRoLnNxcnQodGhpcy54ICogdGhpcy54ICsgdGhpcy55ICogdGhpcy55KTtcbiAgICB9O1xuICAgIFBvaW50LnByb3RvdHlwZS5sZW5TcXVhcmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnggKiB0aGlzLnggKyB0aGlzLnkgKiB0aGlzLnk7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUubm9ybWFsaXplID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgbGVuID0gdGhpcy5sZW4oKTtcbiAgICAgICAgdGhpcy54IC89IGxlbjtcbiAgICAgICAgdGhpcy55IC89IGxlbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUuZGlzdGFuY2UgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgdmFyIGR4ID0gdGhpcy54IC0gb3RoZXIueDtcbiAgICAgICAgdmFyIGR5ID0gdGhpcy55IC0gb3RoZXIueTtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUuZGlzdGFuY2VTcXVhcmUgPSBmdW5jdGlvbiAob3RoZXIpIHtcbiAgICAgICAgdmFyIGR4ID0gdGhpcy54IC0gb3RoZXIueDtcbiAgICAgICAgdmFyIGR5ID0gdGhpcy55IC0gb3RoZXIueTtcbiAgICAgICAgcmV0dXJuIGR4ICogZHggKyBkeSAqIGR5O1xuICAgIH07XG4gICAgUG9pbnQucHJvdG90eXBlLm5lZ2F0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy54ID0gLXRoaXMueDtcbiAgICAgICAgdGhpcy55ID0gLXRoaXMueTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBQb2ludC5wcm90b3R5cGUudHJhbnNmb3JtID0gZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgaWYgKCFtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHggPSB0aGlzLng7XG4gICAgICAgIHZhciB5ID0gdGhpcy55O1xuICAgICAgICB0aGlzLnggPSBtWzBdICogeCArIG1bMl0gKiB5ICsgbVs0XTtcbiAgICAgICAgdGhpcy55ID0gbVsxXSAqIHggKyBtWzNdICogeSArIG1bNV07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgUG9pbnQucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbiAob3V0KSB7XG4gICAgICAgIG91dFswXSA9IHRoaXMueDtcbiAgICAgICAgb3V0WzFdID0gdGhpcy55O1xuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG4gICAgUG9pbnQucHJvdG90eXBlLmZyb21BcnJheSA9IGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgICB0aGlzLnggPSBpbnB1dFswXTtcbiAgICAgICAgdGhpcy55ID0gaW5wdXRbMV07XG4gICAgfTtcbiAgICBQb2ludC5zZXQgPSBmdW5jdGlvbiAocCwgeCwgeSkge1xuICAgICAgICBwLnggPSB4O1xuICAgICAgICBwLnkgPSB5O1xuICAgIH07XG4gICAgUG9pbnQuY29weSA9IGZ1bmN0aW9uIChwLCBwMikge1xuICAgICAgICBwLnggPSBwMi54O1xuICAgICAgICBwLnkgPSBwMi55O1xuICAgIH07XG4gICAgUG9pbnQubGVuID0gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIE1hdGguc3FydChwLnggKiBwLnggKyBwLnkgKiBwLnkpO1xuICAgIH07XG4gICAgUG9pbnQubGVuU3F1YXJlID0gZnVuY3Rpb24gKHApIHtcbiAgICAgICAgcmV0dXJuIHAueCAqIHAueCArIHAueSAqIHAueTtcbiAgICB9O1xuICAgIFBvaW50LmRvdCA9IGZ1bmN0aW9uIChwMCwgcDEpIHtcbiAgICAgICAgcmV0dXJuIHAwLnggKiBwMS54ICsgcDAueSAqIHAxLnk7XG4gICAgfTtcbiAgICBQb2ludC5hZGQgPSBmdW5jdGlvbiAob3V0LCBwMCwgcDEpIHtcbiAgICAgICAgb3V0LnggPSBwMC54ICsgcDEueDtcbiAgICAgICAgb3V0LnkgPSBwMC55ICsgcDEueTtcbiAgICB9O1xuICAgIFBvaW50LnN1YiA9IGZ1bmN0aW9uIChvdXQsIHAwLCBwMSkge1xuICAgICAgICBvdXQueCA9IHAwLnggLSBwMS54O1xuICAgICAgICBvdXQueSA9IHAwLnkgLSBwMS55O1xuICAgIH07XG4gICAgUG9pbnQuc2NhbGUgPSBmdW5jdGlvbiAob3V0LCBwMCwgc2NhbGFyKSB7XG4gICAgICAgIG91dC54ID0gcDAueCAqIHNjYWxhcjtcbiAgICAgICAgb3V0LnkgPSBwMC55ICogc2NhbGFyO1xuICAgIH07XG4gICAgUG9pbnQuc2NhbGVBbmRBZGQgPSBmdW5jdGlvbiAob3V0LCBwMCwgcDEsIHNjYWxhcikge1xuICAgICAgICBvdXQueCA9IHAwLnggKyBwMS54ICogc2NhbGFyO1xuICAgICAgICBvdXQueSA9IHAwLnkgKyBwMS55ICogc2NhbGFyO1xuICAgIH07XG4gICAgUG9pbnQubGVycCA9IGZ1bmN0aW9uIChvdXQsIHAwLCBwMSwgdCkge1xuICAgICAgICB2YXIgb25ldCA9IDEgLSB0O1xuICAgICAgICBvdXQueCA9IG9uZXQgKiBwMC54ICsgdCAqIHAxLng7XG4gICAgICAgIG91dC55ID0gb25ldCAqIHAwLnkgKyB0ICogcDEueTtcbiAgICB9O1xuICAgIHJldHVybiBQb2ludDtcbn0oKSk7XG5leHBvcnQgZGVmYXVsdCBQb2ludDtcbiIsImltcG9ydCAqIGFzIG1hdHJpeCBmcm9tICcuL21hdHJpeCc7XG5pbXBvcnQgKiBhcyB2ZWN0b3IgZnJvbSAnLi92ZWN0b3InO1xudmFyIG1JZGVudGl0eSA9IG1hdHJpeC5pZGVudGl0eTtcbnZhciBFUFNJTE9OID0gNWUtNTtcbmZ1bmN0aW9uIGlzTm90QXJvdW5kWmVybyh2YWwpIHtcbiAgICByZXR1cm4gdmFsID4gRVBTSUxPTiB8fCB2YWwgPCAtRVBTSUxPTjtcbn1cbnZhciBzY2FsZVRtcCA9IFtdO1xudmFyIHRtcFRyYW5zZm9ybSA9IFtdO1xudmFyIG9yaWdpblRyYW5zZm9ybSA9IG1hdHJpeC5jcmVhdGUoKTtcbnZhciBhYnMgPSBNYXRoLmFicztcbnZhciBUcmFuc2Zvcm1hYmxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUcmFuc2Zvcm1hYmxlKCkge1xuICAgIH1cbiAgICBUcmFuc2Zvcm1hYmxlLnByb3RvdHlwZS5zZXRQb3NpdGlvbiA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgdGhpcy54ID0gYXJyWzBdO1xuICAgICAgICB0aGlzLnkgPSBhcnJbMV07XG4gICAgfTtcbiAgICBUcmFuc2Zvcm1hYmxlLnByb3RvdHlwZS5zZXRTY2FsZSA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgICAgICAgdGhpcy5zY2FsZVggPSBhcnJbMF07XG4gICAgICAgIHRoaXMuc2NhbGVZID0gYXJyWzFdO1xuICAgIH07XG4gICAgVHJhbnNmb3JtYWJsZS5wcm90b3R5cGUuc2V0T3JpZ2luID0gZnVuY3Rpb24gKGFycikge1xuICAgICAgICB0aGlzLm9yaWdpblggPSBhcnJbMF07XG4gICAgICAgIHRoaXMub3JpZ2luWSA9IGFyclsxXTtcbiAgICB9O1xuICAgIFRyYW5zZm9ybWFibGUucHJvdG90eXBlLm5lZWRMb2NhbFRyYW5zZm9ybSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGlzTm90QXJvdW5kWmVybyh0aGlzLnJvdGF0aW9uKVxuICAgICAgICAgICAgfHwgaXNOb3RBcm91bmRaZXJvKHRoaXMueClcbiAgICAgICAgICAgIHx8IGlzTm90QXJvdW5kWmVybyh0aGlzLnkpXG4gICAgICAgICAgICB8fCBpc05vdEFyb3VuZFplcm8odGhpcy5zY2FsZVggLSAxKVxuICAgICAgICAgICAgfHwgaXNOb3RBcm91bmRaZXJvKHRoaXMuc2NhbGVZIC0gMSk7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm1hYmxlLnByb3RvdHlwZS51cGRhdGVUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudDtcbiAgICAgICAgdmFyIHBhcmVudEhhc1RyYW5zZm9ybSA9IHBhcmVudCAmJiBwYXJlbnQudHJhbnNmb3JtO1xuICAgICAgICB2YXIgbmVlZExvY2FsVHJhbnNmb3JtID0gdGhpcy5uZWVkTG9jYWxUcmFuc2Zvcm0oKTtcbiAgICAgICAgdmFyIG0gPSB0aGlzLnRyYW5zZm9ybTtcbiAgICAgICAgaWYgKCEobmVlZExvY2FsVHJhbnNmb3JtIHx8IHBhcmVudEhhc1RyYW5zZm9ybSkpIHtcbiAgICAgICAgICAgIG0gJiYgbUlkZW50aXR5KG0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIG0gPSBtIHx8IG1hdHJpeC5jcmVhdGUoKTtcbiAgICAgICAgaWYgKG5lZWRMb2NhbFRyYW5zZm9ybSkge1xuICAgICAgICAgICAgdGhpcy5nZXRMb2NhbFRyYW5zZm9ybShtKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1JZGVudGl0eShtKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyZW50SGFzVHJhbnNmb3JtKSB7XG4gICAgICAgICAgICBpZiAobmVlZExvY2FsVHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgbWF0cml4Lm11bChtLCBwYXJlbnQudHJhbnNmb3JtLCBtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIG1hdHJpeC5jb3B5KG0sIHBhcmVudC50cmFuc2Zvcm0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMudHJhbnNmb3JtID0gbTtcbiAgICAgICAgdGhpcy5fcmVzb2x2ZUdsb2JhbFNjYWxlUmF0aW8obSk7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm1hYmxlLnByb3RvdHlwZS5fcmVzb2x2ZUdsb2JhbFNjYWxlUmF0aW8gPSBmdW5jdGlvbiAobSkge1xuICAgICAgICB2YXIgZ2xvYmFsU2NhbGVSYXRpbyA9IHRoaXMuZ2xvYmFsU2NhbGVSYXRpbztcbiAgICAgICAgaWYgKGdsb2JhbFNjYWxlUmF0aW8gIT0gbnVsbCAmJiBnbG9iYWxTY2FsZVJhdGlvICE9PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmdldEdsb2JhbFNjYWxlKHNjYWxlVG1wKTtcbiAgICAgICAgICAgIHZhciByZWxYID0gc2NhbGVUbXBbMF0gPCAwID8gLTEgOiAxO1xuICAgICAgICAgICAgdmFyIHJlbFkgPSBzY2FsZVRtcFsxXSA8IDAgPyAtMSA6IDE7XG4gICAgICAgICAgICB2YXIgc3ggPSAoKHNjYWxlVG1wWzBdIC0gcmVsWCkgKiBnbG9iYWxTY2FsZVJhdGlvICsgcmVsWCkgLyBzY2FsZVRtcFswXSB8fCAwO1xuICAgICAgICAgICAgdmFyIHN5ID0gKChzY2FsZVRtcFsxXSAtIHJlbFkpICogZ2xvYmFsU2NhbGVSYXRpbyArIHJlbFkpIC8gc2NhbGVUbXBbMV0gfHwgMDtcbiAgICAgICAgICAgIG1bMF0gKj0gc3g7XG4gICAgICAgICAgICBtWzFdICo9IHN4O1xuICAgICAgICAgICAgbVsyXSAqPSBzeTtcbiAgICAgICAgICAgIG1bM10gKj0gc3k7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbnZUcmFuc2Zvcm0gPSB0aGlzLmludlRyYW5zZm9ybSB8fCBtYXRyaXguY3JlYXRlKCk7XG4gICAgICAgIG1hdHJpeC5pbnZlcnQodGhpcy5pbnZUcmFuc2Zvcm0sIG0pO1xuICAgIH07XG4gICAgVHJhbnNmb3JtYWJsZS5wcm90b3R5cGUuZ2V0TG9jYWxUcmFuc2Zvcm0gPSBmdW5jdGlvbiAobSkge1xuICAgICAgICByZXR1cm4gVHJhbnNmb3JtYWJsZS5nZXRMb2NhbFRyYW5zZm9ybSh0aGlzLCBtKTtcbiAgICB9O1xuICAgIFRyYW5zZm9ybWFibGUucHJvdG90eXBlLmdldENvbXB1dGVkVHJhbnNmb3JtID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHJhbnNmb3JtTm9kZSA9IHRoaXM7XG4gICAgICAgIHZhciBhbmNlc3RvcnMgPSBbXTtcbiAgICAgICAgd2hpbGUgKHRyYW5zZm9ybU5vZGUpIHtcbiAgICAgICAgICAgIGFuY2VzdG9ycy5wdXNoKHRyYW5zZm9ybU5vZGUpO1xuICAgICAgICAgICAgdHJhbnNmb3JtTm9kZSA9IHRyYW5zZm9ybU5vZGUucGFyZW50O1xuICAgICAgICB9XG4gICAgICAgIHdoaWxlICh0cmFuc2Zvcm1Ob2RlID0gYW5jZXN0b3JzLnBvcCgpKSB7XG4gICAgICAgICAgICB0cmFuc2Zvcm1Ob2RlLnVwZGF0ZVRyYW5zZm9ybSgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zZm9ybTtcbiAgICB9O1xuICAgIFRyYW5zZm9ybWFibGUucHJvdG90eXBlLnNldExvY2FsVHJhbnNmb3JtID0gZnVuY3Rpb24gKG0pIHtcbiAgICAgICAgaWYgKCFtKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN4ID0gbVswXSAqIG1bMF0gKyBtWzFdICogbVsxXTtcbiAgICAgICAgdmFyIHN5ID0gbVsyXSAqIG1bMl0gKyBtWzNdICogbVszXTtcbiAgICAgICAgaWYgKGlzTm90QXJvdW5kWmVybyhzeCAtIDEpKSB7XG4gICAgICAgICAgICBzeCA9IE1hdGguc3FydChzeCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzTm90QXJvdW5kWmVybyhzeSAtIDEpKSB7XG4gICAgICAgICAgICBzeSA9IE1hdGguc3FydChzeSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1bMF0gPCAwKSB7XG4gICAgICAgICAgICBzeCA9IC1zeDtcbiAgICAgICAgfVxuICAgICAgICBpZiAobVszXSA8IDApIHtcbiAgICAgICAgICAgIHN5ID0gLXN5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucm90YXRpb24gPSBNYXRoLmF0YW4yKC1tWzFdIC8gc3ksIG1bMF0gLyBzeCk7XG4gICAgICAgIGlmIChzeCA8IDAgJiYgc3kgPCAwKSB7XG4gICAgICAgICAgICB0aGlzLnJvdGF0aW9uICs9IE1hdGguUEk7XG4gICAgICAgICAgICBzeCA9IC1zeDtcbiAgICAgICAgICAgIHN5ID0gLXN5O1xuICAgICAgICB9XG4gICAgICAgIHRoaXMueCA9IG1bNF07XG4gICAgICAgIHRoaXMueSA9IG1bNV07XG4gICAgICAgIHRoaXMuc2NhbGVYID0gc3g7XG4gICAgICAgIHRoaXMuc2NhbGVZID0gc3k7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm1hYmxlLnByb3RvdHlwZS5kZWNvbXBvc2VUcmFuc2Zvcm0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy50cmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnQ7XG4gICAgICAgIHZhciBtID0gdGhpcy50cmFuc2Zvcm07XG4gICAgICAgIGlmIChwYXJlbnQgJiYgcGFyZW50LnRyYW5zZm9ybSkge1xuICAgICAgICAgICAgbWF0cml4Lm11bCh0bXBUcmFuc2Zvcm0sIHBhcmVudC5pbnZUcmFuc2Zvcm0sIG0pO1xuICAgICAgICAgICAgbSA9IHRtcFRyYW5zZm9ybTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3ggPSB0aGlzLm9yaWdpblg7XG4gICAgICAgIHZhciBveSA9IHRoaXMub3JpZ2luWTtcbiAgICAgICAgaWYgKG94IHx8IG95KSB7XG4gICAgICAgICAgICBvcmlnaW5UcmFuc2Zvcm1bNF0gPSBveDtcbiAgICAgICAgICAgIG9yaWdpblRyYW5zZm9ybVs1XSA9IG95O1xuICAgICAgICAgICAgbWF0cml4Lm11bCh0bXBUcmFuc2Zvcm0sIG0sIG9yaWdpblRyYW5zZm9ybSk7XG4gICAgICAgICAgICB0bXBUcmFuc2Zvcm1bNF0gLT0gb3g7XG4gICAgICAgICAgICB0bXBUcmFuc2Zvcm1bNV0gLT0gb3k7XG4gICAgICAgICAgICBtID0gdG1wVHJhbnNmb3JtO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2V0TG9jYWxUcmFuc2Zvcm0obSk7XG4gICAgfTtcbiAgICBUcmFuc2Zvcm1hYmxlLnByb3RvdHlwZS5nZXRHbG9iYWxTY2FsZSA9IGZ1bmN0aW9uIChvdXQpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzLnRyYW5zZm9ybTtcbiAgICAgICAgb3V0ID0gb3V0IHx8IFtdO1xuICAgICAgICBpZiAoIW0pIHtcbiAgICAgICAgICAgIG91dFswXSA9IDE7XG4gICAgICAgICAgICBvdXRbMV0gPSAxO1xuICAgICAgICAgICAgcmV0dXJuIG91dDtcbiAgICAgICAgfVxuICAgICAgICBvdXRbMF0gPSBNYXRoLnNxcnQobVswXSAqIG1bMF0gKyBtWzFdICogbVsxXSk7XG4gICAgICAgIG91dFsxXSA9IE1hdGguc3FydChtWzJdICogbVsyXSArIG1bM10gKiBtWzNdKTtcbiAgICAgICAgaWYgKG1bMF0gPCAwKSB7XG4gICAgICAgICAgICBvdXRbMF0gPSAtb3V0WzBdO1xuICAgICAgICB9XG4gICAgICAgIGlmIChtWzNdIDwgMCkge1xuICAgICAgICAgICAgb3V0WzFdID0gLW91dFsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG4gICAgVHJhbnNmb3JtYWJsZS5wcm90b3R5cGUudHJhbnNmb3JtQ29vcmRUb0xvY2FsID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdmFyIHYyID0gW3gsIHldO1xuICAgICAgICB2YXIgaW52VHJhbnNmb3JtID0gdGhpcy5pbnZUcmFuc2Zvcm07XG4gICAgICAgIGlmIChpbnZUcmFuc2Zvcm0pIHtcbiAgICAgICAgICAgIHZlY3Rvci5hcHBseVRyYW5zZm9ybSh2MiwgdjIsIGludlRyYW5zZm9ybSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHYyO1xuICAgIH07XG4gICAgVHJhbnNmb3JtYWJsZS5wcm90b3R5cGUudHJhbnNmb3JtQ29vcmRUb0dsb2JhbCA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHZhciB2MiA9IFt4LCB5XTtcbiAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtO1xuICAgICAgICBpZiAodHJhbnNmb3JtKSB7XG4gICAgICAgICAgICB2ZWN0b3IuYXBwbHlUcmFuc2Zvcm0odjIsIHYyLCB0cmFuc2Zvcm0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2MjtcbiAgICB9O1xuICAgIFRyYW5zZm9ybWFibGUucHJvdG90eXBlLmdldExpbmVTY2FsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIG0gPSB0aGlzLnRyYW5zZm9ybTtcbiAgICAgICAgcmV0dXJuIG0gJiYgYWJzKG1bMF0gLSAxKSA+IDFlLTEwICYmIGFicyhtWzNdIC0gMSkgPiAxZS0xMFxuICAgICAgICAgICAgPyBNYXRoLnNxcnQoYWJzKG1bMF0gKiBtWzNdIC0gbVsyXSAqIG1bMV0pKVxuICAgICAgICAgICAgOiAxO1xuICAgIH07XG4gICAgVHJhbnNmb3JtYWJsZS5nZXRMb2NhbFRyYW5zZm9ybSA9IGZ1bmN0aW9uICh0YXJnZXQsIG0pIHtcbiAgICAgICAgbSA9IG0gfHwgW107XG4gICAgICAgIG1JZGVudGl0eShtKTtcbiAgICAgICAgdmFyIG94ID0gdGFyZ2V0Lm9yaWdpblggfHwgMDtcbiAgICAgICAgdmFyIG95ID0gdGFyZ2V0Lm9yaWdpblkgfHwgMDtcbiAgICAgICAgdmFyIHN4ID0gdGFyZ2V0LnNjYWxlWDtcbiAgICAgICAgdmFyIHN5ID0gdGFyZ2V0LnNjYWxlWTtcbiAgICAgICAgdmFyIHJvdGF0aW9uID0gdGFyZ2V0LnJvdGF0aW9uIHx8IDA7XG4gICAgICAgIHZhciB4ID0gdGFyZ2V0Lng7XG4gICAgICAgIHZhciB5ID0gdGFyZ2V0Lnk7XG4gICAgICAgIG1bNF0gLT0gb3g7XG4gICAgICAgIG1bNV0gLT0gb3k7XG4gICAgICAgIG1bMF0gKj0gc3g7XG4gICAgICAgIG1bMV0gKj0gc3k7XG4gICAgICAgIG1bMl0gKj0gc3g7XG4gICAgICAgIG1bM10gKj0gc3k7XG4gICAgICAgIG1bNF0gKj0gc3g7XG4gICAgICAgIG1bNV0gKj0gc3k7XG4gICAgICAgIGlmIChyb3RhdGlvbikge1xuICAgICAgICAgICAgbWF0cml4LnJvdGF0ZShtLCBtLCByb3RhdGlvbik7XG4gICAgICAgIH1cbiAgICAgICAgbVs0XSArPSBveDtcbiAgICAgICAgbVs1XSArPSBveTtcbiAgICAgICAgbVs0XSArPSB4O1xuICAgICAgICBtWzVdICs9IHk7XG4gICAgICAgIHJldHVybiBtO1xuICAgIH07XG4gICAgVHJhbnNmb3JtYWJsZS5pbml0RGVmYXVsdFByb3BzID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHByb3RvID0gVHJhbnNmb3JtYWJsZS5wcm90b3R5cGU7XG4gICAgICAgIHByb3RvLnggPSAwO1xuICAgICAgICBwcm90by55ID0gMDtcbiAgICAgICAgcHJvdG8uc2NhbGVYID0gMTtcbiAgICAgICAgcHJvdG8uc2NhbGVZID0gMTtcbiAgICAgICAgcHJvdG8ub3JpZ2luWCA9IDA7XG4gICAgICAgIHByb3RvLm9yaWdpblkgPSAwO1xuICAgICAgICBwcm90by5yb3RhdGlvbiA9IDA7XG4gICAgICAgIHByb3RvLmdsb2JhbFNjYWxlUmF0aW8gPSAxO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIFRyYW5zZm9ybWFibGU7XG59KCkpO1xuO1xuZXhwb3J0IGRlZmF1bHQgVHJhbnNmb3JtYWJsZTtcbiIsInZhciB3bVVuaXF1ZUluZGV4ID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogOSk7XG52YXIgV2Vha01hcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gV2Vha01hcCgpIHtcbiAgICAgICAgdGhpcy5faWQgPSAnX19lY19pbm5lcl8nICsgd21VbmlxdWVJbmRleCsrO1xuICAgIH1cbiAgICBXZWFrTWFwLnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndWFyZChrZXkpW3RoaXMuX2lkXTtcbiAgICB9O1xuICAgIFdlYWtNYXAucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlKSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLl9ndWFyZChrZXkpO1xuICAgICAgICBpZiAodHlwZW9mIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgdGhpcy5faWQsIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWUsXG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRhcmdldFt0aGlzLl9pZF0gPSB2YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIFdlYWtNYXAucHJvdG90eXBlW1wiZGVsZXRlXCJdID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAodGhpcy5oYXMoa2V5KSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2d1YXJkKGtleSlbdGhpcy5faWRdO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgV2Vha01hcC5wcm90b3R5cGUuaGFzID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gISF0aGlzLl9ndWFyZChrZXkpW3RoaXMuX2lkXTtcbiAgICB9O1xuICAgIFdlYWtNYXAucHJvdG90eXBlLl9ndWFyZCA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKGtleSAhPT0gT2JqZWN0KGtleSkpIHtcbiAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcignVmFsdWUgb2YgV2Vha01hcCBpcyBub3QgYSBub24tbnVsbCBvYmplY3QuJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtleTtcbiAgICB9O1xuICAgIHJldHVybiBXZWFrTWFwO1xufSgpKTtcbmV4cG9ydCBkZWZhdWx0IFdlYWtNYXA7XG4iLCJpbXBvcnQgKiBhcyB2ZWMyIGZyb20gJy4vdmVjdG9yJztcbmltcG9ydCAqIGFzIGN1cnZlIGZyb20gJy4vY3VydmUnO1xudmFyIG1hdGhNaW4gPSBNYXRoLm1pbjtcbnZhciBtYXRoTWF4ID0gTWF0aC5tYXg7XG52YXIgbWF0aFNpbiA9IE1hdGguc2luO1xudmFyIG1hdGhDb3MgPSBNYXRoLmNvcztcbnZhciBQSTIgPSBNYXRoLlBJICogMjtcbnZhciBzdGFydCA9IHZlYzIuY3JlYXRlKCk7XG52YXIgZW5kID0gdmVjMi5jcmVhdGUoKTtcbnZhciBleHRyZW1pdHkgPSB2ZWMyLmNyZWF0ZSgpO1xuZXhwb3J0IGZ1bmN0aW9uIGZyb21Qb2ludHMocG9pbnRzLCBtaW4sIG1heCkge1xuICAgIGlmIChwb2ludHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHAgPSBwb2ludHNbMF07XG4gICAgdmFyIGxlZnQgPSBwWzBdO1xuICAgIHZhciByaWdodCA9IHBbMF07XG4gICAgdmFyIHRvcCA9IHBbMV07XG4gICAgdmFyIGJvdHRvbSA9IHBbMV07XG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCBwb2ludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcCA9IHBvaW50c1tpXTtcbiAgICAgICAgbGVmdCA9IG1hdGhNaW4obGVmdCwgcFswXSk7XG4gICAgICAgIHJpZ2h0ID0gbWF0aE1heChyaWdodCwgcFswXSk7XG4gICAgICAgIHRvcCA9IG1hdGhNaW4odG9wLCBwWzFdKTtcbiAgICAgICAgYm90dG9tID0gbWF0aE1heChib3R0b20sIHBbMV0pO1xuICAgIH1cbiAgICBtaW5bMF0gPSBsZWZ0O1xuICAgIG1pblsxXSA9IHRvcDtcbiAgICBtYXhbMF0gPSByaWdodDtcbiAgICBtYXhbMV0gPSBib3R0b207XG59XG5leHBvcnQgZnVuY3Rpb24gZnJvbUxpbmUoeDAsIHkwLCB4MSwgeTEsIG1pbiwgbWF4KSB7XG4gICAgbWluWzBdID0gbWF0aE1pbih4MCwgeDEpO1xuICAgIG1pblsxXSA9IG1hdGhNaW4oeTAsIHkxKTtcbiAgICBtYXhbMF0gPSBtYXRoTWF4KHgwLCB4MSk7XG4gICAgbWF4WzFdID0gbWF0aE1heCh5MCwgeTEpO1xufVxudmFyIHhEaW0gPSBbXTtcbnZhciB5RGltID0gW107XG5leHBvcnQgZnVuY3Rpb24gZnJvbUN1YmljKHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsIHgzLCB5MywgbWluLCBtYXgpIHtcbiAgICB2YXIgY3ViaWNFeHRyZW1hID0gY3VydmUuY3ViaWNFeHRyZW1hO1xuICAgIHZhciBjdWJpY0F0ID0gY3VydmUuY3ViaWNBdDtcbiAgICB2YXIgbiA9IGN1YmljRXh0cmVtYSh4MCwgeDEsIHgyLCB4MywgeERpbSk7XG4gICAgbWluWzBdID0gSW5maW5pdHk7XG4gICAgbWluWzFdID0gSW5maW5pdHk7XG4gICAgbWF4WzBdID0gLUluZmluaXR5O1xuICAgIG1heFsxXSA9IC1JbmZpbml0eTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IG47IGkrKykge1xuICAgICAgICB2YXIgeCA9IGN1YmljQXQoeDAsIHgxLCB4MiwgeDMsIHhEaW1baV0pO1xuICAgICAgICBtaW5bMF0gPSBtYXRoTWluKHgsIG1pblswXSk7XG4gICAgICAgIG1heFswXSA9IG1hdGhNYXgoeCwgbWF4WzBdKTtcbiAgICB9XG4gICAgbiA9IGN1YmljRXh0cmVtYSh5MCwgeTEsIHkyLCB5MywgeURpbSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuOyBpKyspIHtcbiAgICAgICAgdmFyIHkgPSBjdWJpY0F0KHkwLCB5MSwgeTIsIHkzLCB5RGltW2ldKTtcbiAgICAgICAgbWluWzFdID0gbWF0aE1pbih5LCBtaW5bMV0pO1xuICAgICAgICBtYXhbMV0gPSBtYXRoTWF4KHksIG1heFsxXSk7XG4gICAgfVxuICAgIG1pblswXSA9IG1hdGhNaW4oeDAsIG1pblswXSk7XG4gICAgbWF4WzBdID0gbWF0aE1heCh4MCwgbWF4WzBdKTtcbiAgICBtaW5bMF0gPSBtYXRoTWluKHgzLCBtaW5bMF0pO1xuICAgIG1heFswXSA9IG1hdGhNYXgoeDMsIG1heFswXSk7XG4gICAgbWluWzFdID0gbWF0aE1pbih5MCwgbWluWzFdKTtcbiAgICBtYXhbMV0gPSBtYXRoTWF4KHkwLCBtYXhbMV0pO1xuICAgIG1pblsxXSA9IG1hdGhNaW4oeTMsIG1pblsxXSk7XG4gICAgbWF4WzFdID0gbWF0aE1heCh5MywgbWF4WzFdKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBmcm9tUXVhZHJhdGljKHgwLCB5MCwgeDEsIHkxLCB4MiwgeTIsIG1pbiwgbWF4KSB7XG4gICAgdmFyIHF1YWRyYXRpY0V4dHJlbXVtID0gY3VydmUucXVhZHJhdGljRXh0cmVtdW07XG4gICAgdmFyIHF1YWRyYXRpY0F0ID0gY3VydmUucXVhZHJhdGljQXQ7XG4gICAgdmFyIHR4ID0gbWF0aE1heChtYXRoTWluKHF1YWRyYXRpY0V4dHJlbXVtKHgwLCB4MSwgeDIpLCAxKSwgMCk7XG4gICAgdmFyIHR5ID0gbWF0aE1heChtYXRoTWluKHF1YWRyYXRpY0V4dHJlbXVtKHkwLCB5MSwgeTIpLCAxKSwgMCk7XG4gICAgdmFyIHggPSBxdWFkcmF0aWNBdCh4MCwgeDEsIHgyLCB0eCk7XG4gICAgdmFyIHkgPSBxdWFkcmF0aWNBdCh5MCwgeTEsIHkyLCB0eSk7XG4gICAgbWluWzBdID0gbWF0aE1pbih4MCwgeDIsIHgpO1xuICAgIG1pblsxXSA9IG1hdGhNaW4oeTAsIHkyLCB5KTtcbiAgICBtYXhbMF0gPSBtYXRoTWF4KHgwLCB4MiwgeCk7XG4gICAgbWF4WzFdID0gbWF0aE1heCh5MCwgeTIsIHkpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyb21BcmMoeCwgeSwgcngsIHJ5LCBzdGFydEFuZ2xlLCBlbmRBbmdsZSwgYW50aWNsb2Nrd2lzZSwgbWluLCBtYXgpIHtcbiAgICB2YXIgdmVjMk1pbiA9IHZlYzIubWluO1xuICAgIHZhciB2ZWMyTWF4ID0gdmVjMi5tYXg7XG4gICAgdmFyIGRpZmYgPSBNYXRoLmFicyhzdGFydEFuZ2xlIC0gZW5kQW5nbGUpO1xuICAgIGlmIChkaWZmICUgUEkyIDwgMWUtNCAmJiBkaWZmID4gMWUtNCkge1xuICAgICAgICBtaW5bMF0gPSB4IC0gcng7XG4gICAgICAgIG1pblsxXSA9IHkgLSByeTtcbiAgICAgICAgbWF4WzBdID0geCArIHJ4O1xuICAgICAgICBtYXhbMV0gPSB5ICsgcnk7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3RhcnRbMF0gPSBtYXRoQ29zKHN0YXJ0QW5nbGUpICogcnggKyB4O1xuICAgIHN0YXJ0WzFdID0gbWF0aFNpbihzdGFydEFuZ2xlKSAqIHJ5ICsgeTtcbiAgICBlbmRbMF0gPSBtYXRoQ29zKGVuZEFuZ2xlKSAqIHJ4ICsgeDtcbiAgICBlbmRbMV0gPSBtYXRoU2luKGVuZEFuZ2xlKSAqIHJ5ICsgeTtcbiAgICB2ZWMyTWluKG1pbiwgc3RhcnQsIGVuZCk7XG4gICAgdmVjMk1heChtYXgsIHN0YXJ0LCBlbmQpO1xuICAgIHN0YXJ0QW5nbGUgPSBzdGFydEFuZ2xlICUgKFBJMik7XG4gICAgaWYgKHN0YXJ0QW5nbGUgPCAwKSB7XG4gICAgICAgIHN0YXJ0QW5nbGUgPSBzdGFydEFuZ2xlICsgUEkyO1xuICAgIH1cbiAgICBlbmRBbmdsZSA9IGVuZEFuZ2xlICUgKFBJMik7XG4gICAgaWYgKGVuZEFuZ2xlIDwgMCkge1xuICAgICAgICBlbmRBbmdsZSA9IGVuZEFuZ2xlICsgUEkyO1xuICAgIH1cbiAgICBpZiAoc3RhcnRBbmdsZSA+IGVuZEFuZ2xlICYmICFhbnRpY2xvY2t3aXNlKSB7XG4gICAgICAgIGVuZEFuZ2xlICs9IFBJMjtcbiAgICB9XG4gICAgZWxzZSBpZiAoc3RhcnRBbmdsZSA8IGVuZEFuZ2xlICYmIGFudGljbG9ja3dpc2UpIHtcbiAgICAgICAgc3RhcnRBbmdsZSArPSBQSTI7XG4gICAgfVxuICAgIGlmIChhbnRpY2xvY2t3aXNlKSB7XG4gICAgICAgIHZhciB0bXAgPSBlbmRBbmdsZTtcbiAgICAgICAgZW5kQW5nbGUgPSBzdGFydEFuZ2xlO1xuICAgICAgICBzdGFydEFuZ2xlID0gdG1wO1xuICAgIH1cbiAgICBmb3IgKHZhciBhbmdsZSA9IDA7IGFuZ2xlIDwgZW5kQW5nbGU7IGFuZ2xlICs9IE1hdGguUEkgLyAyKSB7XG4gICAgICAgIGlmIChhbmdsZSA+IHN0YXJ0QW5nbGUpIHtcbiAgICAgICAgICAgIGV4dHJlbWl0eVswXSA9IG1hdGhDb3MoYW5nbGUpICogcnggKyB4O1xuICAgICAgICAgICAgZXh0cmVtaXR5WzFdID0gbWF0aFNpbihhbmdsZSkgKiByeSArIHk7XG4gICAgICAgICAgICB2ZWMyTWluKG1pbiwgZXh0cmVtaXR5LCBtaW4pO1xuICAgICAgICAgICAgdmVjMk1heChtYXgsIGV4dHJlbWl0eSwgbWF4KTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImltcG9ydCB7IGNyZWF0ZSBhcyB2MkNyZWF0ZSwgZGlzdFNxdWFyZSBhcyB2MkRpc3RTcXVhcmUgfSBmcm9tICcuL3ZlY3Rvcic7XG52YXIgbWF0aFBvdyA9IE1hdGgucG93O1xudmFyIG1hdGhTcXJ0ID0gTWF0aC5zcXJ0O1xudmFyIEVQU0lMT04gPSAxZS04O1xudmFyIEVQU0lMT05fTlVNRVJJQyA9IDFlLTQ7XG52YXIgVEhSRUVfU1FSVCA9IG1hdGhTcXJ0KDMpO1xudmFyIE9ORV9USElSRCA9IDEgLyAzO1xudmFyIF92MCA9IHYyQ3JlYXRlKCk7XG52YXIgX3YxID0gdjJDcmVhdGUoKTtcbnZhciBfdjIgPSB2MkNyZWF0ZSgpO1xuZnVuY3Rpb24gaXNBcm91bmRaZXJvKHZhbCkge1xuICAgIHJldHVybiB2YWwgPiAtRVBTSUxPTiAmJiB2YWwgPCBFUFNJTE9OO1xufVxuZnVuY3Rpb24gaXNOb3RBcm91bmRaZXJvKHZhbCkge1xuICAgIHJldHVybiB2YWwgPiBFUFNJTE9OIHx8IHZhbCA8IC1FUFNJTE9OO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGN1YmljQXQocDAsIHAxLCBwMiwgcDMsIHQpIHtcbiAgICB2YXIgb25ldCA9IDEgLSB0O1xuICAgIHJldHVybiBvbmV0ICogb25ldCAqIChvbmV0ICogcDAgKyAzICogdCAqIHAxKVxuICAgICAgICArIHQgKiB0ICogKHQgKiBwMyArIDMgKiBvbmV0ICogcDIpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGN1YmljRGVyaXZhdGl2ZUF0KHAwLCBwMSwgcDIsIHAzLCB0KSB7XG4gICAgdmFyIG9uZXQgPSAxIC0gdDtcbiAgICByZXR1cm4gMyAqICgoKHAxIC0gcDApICogb25ldCArIDIgKiAocDIgLSBwMSkgKiB0KSAqIG9uZXRcbiAgICAgICAgKyAocDMgLSBwMikgKiB0ICogdCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3ViaWNSb290QXQocDAsIHAxLCBwMiwgcDMsIHZhbCwgcm9vdHMpIHtcbiAgICB2YXIgYSA9IHAzICsgMyAqIChwMSAtIHAyKSAtIHAwO1xuICAgIHZhciBiID0gMyAqIChwMiAtIHAxICogMiArIHAwKTtcbiAgICB2YXIgYyA9IDMgKiAocDEgLSBwMCk7XG4gICAgdmFyIGQgPSBwMCAtIHZhbDtcbiAgICB2YXIgQSA9IGIgKiBiIC0gMyAqIGEgKiBjO1xuICAgIHZhciBCID0gYiAqIGMgLSA5ICogYSAqIGQ7XG4gICAgdmFyIEMgPSBjICogYyAtIDMgKiBiICogZDtcbiAgICB2YXIgbiA9IDA7XG4gICAgaWYgKGlzQXJvdW5kWmVybyhBKSAmJiBpc0Fyb3VuZFplcm8oQikpIHtcbiAgICAgICAgaWYgKGlzQXJvdW5kWmVybyhiKSkge1xuICAgICAgICAgICAgcm9vdHNbMF0gPSAwO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdmFyIHQxID0gLWMgLyBiO1xuICAgICAgICAgICAgaWYgKHQxID49IDAgJiYgdDEgPD0gMSkge1xuICAgICAgICAgICAgICAgIHJvb3RzW24rK10gPSB0MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGRpc2MgPSBCICogQiAtIDQgKiBBICogQztcbiAgICAgICAgaWYgKGlzQXJvdW5kWmVybyhkaXNjKSkge1xuICAgICAgICAgICAgdmFyIEsgPSBCIC8gQTtcbiAgICAgICAgICAgIHZhciB0MSA9IC1iIC8gYSArIEs7XG4gICAgICAgICAgICB2YXIgdDIgPSAtSyAvIDI7XG4gICAgICAgICAgICBpZiAodDEgPj0gMCAmJiB0MSA8PSAxKSB7XG4gICAgICAgICAgICAgICAgcm9vdHNbbisrXSA9IHQxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHQyID49IDAgJiYgdDIgPD0gMSkge1xuICAgICAgICAgICAgICAgIHJvb3RzW24rK10gPSB0MjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXNjID4gMCkge1xuICAgICAgICAgICAgdmFyIGRpc2NTcXJ0ID0gbWF0aFNxcnQoZGlzYyk7XG4gICAgICAgICAgICB2YXIgWTEgPSBBICogYiArIDEuNSAqIGEgKiAoLUIgKyBkaXNjU3FydCk7XG4gICAgICAgICAgICB2YXIgWTIgPSBBICogYiArIDEuNSAqIGEgKiAoLUIgLSBkaXNjU3FydCk7XG4gICAgICAgICAgICBpZiAoWTEgPCAwKSB7XG4gICAgICAgICAgICAgICAgWTEgPSAtbWF0aFBvdygtWTEsIE9ORV9USElSRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBZMSA9IG1hdGhQb3coWTEsIE9ORV9USElSRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoWTIgPCAwKSB7XG4gICAgICAgICAgICAgICAgWTIgPSAtbWF0aFBvdygtWTIsIE9ORV9USElSRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBZMiA9IG1hdGhQb3coWTIsIE9ORV9USElSRCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdDEgPSAoLWIgLSAoWTEgKyBZMikpIC8gKDMgKiBhKTtcbiAgICAgICAgICAgIGlmICh0MSA+PSAwICYmIHQxIDw9IDEpIHtcbiAgICAgICAgICAgICAgICByb290c1tuKytdID0gdDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB2YXIgVCA9ICgyICogQSAqIGIgLSAzICogYSAqIEIpIC8gKDIgKiBtYXRoU3FydChBICogQSAqIEEpKTtcbiAgICAgICAgICAgIHZhciB0aGV0YSA9IE1hdGguYWNvcyhUKSAvIDM7XG4gICAgICAgICAgICB2YXIgQVNxcnQgPSBtYXRoU3FydChBKTtcbiAgICAgICAgICAgIHZhciB0bXAgPSBNYXRoLmNvcyh0aGV0YSk7XG4gICAgICAgICAgICB2YXIgdDEgPSAoLWIgLSAyICogQVNxcnQgKiB0bXApIC8gKDMgKiBhKTtcbiAgICAgICAgICAgIHZhciB0MiA9ICgtYiArIEFTcXJ0ICogKHRtcCArIFRIUkVFX1NRUlQgKiBNYXRoLnNpbih0aGV0YSkpKSAvICgzICogYSk7XG4gICAgICAgICAgICB2YXIgdDMgPSAoLWIgKyBBU3FydCAqICh0bXAgLSBUSFJFRV9TUVJUICogTWF0aC5zaW4odGhldGEpKSkgLyAoMyAqIGEpO1xuICAgICAgICAgICAgaWYgKHQxID49IDAgJiYgdDEgPD0gMSkge1xuICAgICAgICAgICAgICAgIHJvb3RzW24rK10gPSB0MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0MiA+PSAwICYmIHQyIDw9IDEpIHtcbiAgICAgICAgICAgICAgICByb290c1tuKytdID0gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodDMgPj0gMCAmJiB0MyA8PSAxKSB7XG4gICAgICAgICAgICAgICAgcm9vdHNbbisrXSA9IHQzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGN1YmljRXh0cmVtYShwMCwgcDEsIHAyLCBwMywgZXh0cmVtYSkge1xuICAgIHZhciBiID0gNiAqIHAyIC0gMTIgKiBwMSArIDYgKiBwMDtcbiAgICB2YXIgYSA9IDkgKiBwMSArIDMgKiBwMyAtIDMgKiBwMCAtIDkgKiBwMjtcbiAgICB2YXIgYyA9IDMgKiBwMSAtIDMgKiBwMDtcbiAgICB2YXIgbiA9IDA7XG4gICAgaWYgKGlzQXJvdW5kWmVybyhhKSkge1xuICAgICAgICBpZiAoaXNOb3RBcm91bmRaZXJvKGIpKSB7XG4gICAgICAgICAgICB2YXIgdDEgPSAtYyAvIGI7XG4gICAgICAgICAgICBpZiAodDEgPj0gMCAmJiB0MSA8PSAxKSB7XG4gICAgICAgICAgICAgICAgZXh0cmVtYVtuKytdID0gdDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciBkaXNjID0gYiAqIGIgLSA0ICogYSAqIGM7XG4gICAgICAgIGlmIChpc0Fyb3VuZFplcm8oZGlzYykpIHtcbiAgICAgICAgICAgIGV4dHJlbWFbMF0gPSAtYiAvICgyICogYSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAoZGlzYyA+IDApIHtcbiAgICAgICAgICAgIHZhciBkaXNjU3FydCA9IG1hdGhTcXJ0KGRpc2MpO1xuICAgICAgICAgICAgdmFyIHQxID0gKC1iICsgZGlzY1NxcnQpIC8gKDIgKiBhKTtcbiAgICAgICAgICAgIHZhciB0MiA9ICgtYiAtIGRpc2NTcXJ0KSAvICgyICogYSk7XG4gICAgICAgICAgICBpZiAodDEgPj0gMCAmJiB0MSA8PSAxKSB7XG4gICAgICAgICAgICAgICAgZXh0cmVtYVtuKytdID0gdDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodDIgPj0gMCAmJiB0MiA8PSAxKSB7XG4gICAgICAgICAgICAgICAgZXh0cmVtYVtuKytdID0gdDI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG47XG59XG5leHBvcnQgZnVuY3Rpb24gY3ViaWNTdWJkaXZpZGUocDAsIHAxLCBwMiwgcDMsIHQsIG91dCkge1xuICAgIHZhciBwMDEgPSAocDEgLSBwMCkgKiB0ICsgcDA7XG4gICAgdmFyIHAxMiA9IChwMiAtIHAxKSAqIHQgKyBwMTtcbiAgICB2YXIgcDIzID0gKHAzIC0gcDIpICogdCArIHAyO1xuICAgIHZhciBwMDEyID0gKHAxMiAtIHAwMSkgKiB0ICsgcDAxO1xuICAgIHZhciBwMTIzID0gKHAyMyAtIHAxMikgKiB0ICsgcDEyO1xuICAgIHZhciBwMDEyMyA9IChwMTIzIC0gcDAxMikgKiB0ICsgcDAxMjtcbiAgICBvdXRbMF0gPSBwMDtcbiAgICBvdXRbMV0gPSBwMDE7XG4gICAgb3V0WzJdID0gcDAxMjtcbiAgICBvdXRbM10gPSBwMDEyMztcbiAgICBvdXRbNF0gPSBwMDEyMztcbiAgICBvdXRbNV0gPSBwMTIzO1xuICAgIG91dFs2XSA9IHAyMztcbiAgICBvdXRbN10gPSBwMztcbn1cbmV4cG9ydCBmdW5jdGlvbiBjdWJpY1Byb2plY3RQb2ludCh4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIHgsIHksIG91dCkge1xuICAgIHZhciB0O1xuICAgIHZhciBpbnRlcnZhbCA9IDAuMDA1O1xuICAgIHZhciBkID0gSW5maW5pdHk7XG4gICAgdmFyIHByZXY7XG4gICAgdmFyIG5leHQ7XG4gICAgdmFyIGQxO1xuICAgIHZhciBkMjtcbiAgICBfdjBbMF0gPSB4O1xuICAgIF92MFsxXSA9IHk7XG4gICAgZm9yICh2YXIgX3QgPSAwOyBfdCA8IDE7IF90ICs9IDAuMDUpIHtcbiAgICAgICAgX3YxWzBdID0gY3ViaWNBdCh4MCwgeDEsIHgyLCB4MywgX3QpO1xuICAgICAgICBfdjFbMV0gPSBjdWJpY0F0KHkwLCB5MSwgeTIsIHkzLCBfdCk7XG4gICAgICAgIGQxID0gdjJEaXN0U3F1YXJlKF92MCwgX3YxKTtcbiAgICAgICAgaWYgKGQxIDwgZCkge1xuICAgICAgICAgICAgdCA9IF90O1xuICAgICAgICAgICAgZCA9IGQxO1xuICAgICAgICB9XG4gICAgfVxuICAgIGQgPSBJbmZpbml0eTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgICAgaWYgKGludGVydmFsIDwgRVBTSUxPTl9OVU1FUklDKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBwcmV2ID0gdCAtIGludGVydmFsO1xuICAgICAgICBuZXh0ID0gdCArIGludGVydmFsO1xuICAgICAgICBfdjFbMF0gPSBjdWJpY0F0KHgwLCB4MSwgeDIsIHgzLCBwcmV2KTtcbiAgICAgICAgX3YxWzFdID0gY3ViaWNBdCh5MCwgeTEsIHkyLCB5MywgcHJldik7XG4gICAgICAgIGQxID0gdjJEaXN0U3F1YXJlKF92MSwgX3YwKTtcbiAgICAgICAgaWYgKHByZXYgPj0gMCAmJiBkMSA8IGQpIHtcbiAgICAgICAgICAgIHQgPSBwcmV2O1xuICAgICAgICAgICAgZCA9IGQxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3YyWzBdID0gY3ViaWNBdCh4MCwgeDEsIHgyLCB4MywgbmV4dCk7XG4gICAgICAgICAgICBfdjJbMV0gPSBjdWJpY0F0KHkwLCB5MSwgeTIsIHkzLCBuZXh0KTtcbiAgICAgICAgICAgIGQyID0gdjJEaXN0U3F1YXJlKF92MiwgX3YwKTtcbiAgICAgICAgICAgIGlmIChuZXh0IDw9IDEgJiYgZDIgPCBkKSB7XG4gICAgICAgICAgICAgICAgdCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgZCA9IGQyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgaW50ZXJ2YWwgKj0gMC41O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChvdXQpIHtcbiAgICAgICAgb3V0WzBdID0gY3ViaWNBdCh4MCwgeDEsIHgyLCB4MywgdCk7XG4gICAgICAgIG91dFsxXSA9IGN1YmljQXQoeTAsIHkxLCB5MiwgeTMsIHQpO1xuICAgIH1cbiAgICByZXR1cm4gbWF0aFNxcnQoZCk7XG59XG5leHBvcnQgZnVuY3Rpb24gY3ViaWNMZW5ndGgoeDAsIHkwLCB4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCBpdGVyYXRpb24pIHtcbiAgICB2YXIgcHggPSB4MDtcbiAgICB2YXIgcHkgPSB5MDtcbiAgICB2YXIgZCA9IDA7XG4gICAgdmFyIHN0ZXAgPSAxIC8gaXRlcmF0aW9uO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGl0ZXJhdGlvbjsgaSsrKSB7XG4gICAgICAgIHZhciB0ID0gaSAqIHN0ZXA7XG4gICAgICAgIHZhciB4ID0gY3ViaWNBdCh4MCwgeDEsIHgyLCB4MywgdCk7XG4gICAgICAgIHZhciB5ID0gY3ViaWNBdCh5MCwgeTEsIHkyLCB5MywgdCk7XG4gICAgICAgIHZhciBkeCA9IHggLSBweDtcbiAgICAgICAgdmFyIGR5ID0geSAtIHB5O1xuICAgICAgICBkICs9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIHB4ID0geDtcbiAgICAgICAgcHkgPSB5O1xuICAgIH1cbiAgICByZXR1cm4gZDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBxdWFkcmF0aWNBdChwMCwgcDEsIHAyLCB0KSB7XG4gICAgdmFyIG9uZXQgPSAxIC0gdDtcbiAgICByZXR1cm4gb25ldCAqIChvbmV0ICogcDAgKyAyICogdCAqIHAxKSArIHQgKiB0ICogcDI7XG59XG5leHBvcnQgZnVuY3Rpb24gcXVhZHJhdGljRGVyaXZhdGl2ZUF0KHAwLCBwMSwgcDIsIHQpIHtcbiAgICByZXR1cm4gMiAqICgoMSAtIHQpICogKHAxIC0gcDApICsgdCAqIChwMiAtIHAxKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcXVhZHJhdGljUm9vdEF0KHAwLCBwMSwgcDIsIHZhbCwgcm9vdHMpIHtcbiAgICB2YXIgYSA9IHAwIC0gMiAqIHAxICsgcDI7XG4gICAgdmFyIGIgPSAyICogKHAxIC0gcDApO1xuICAgIHZhciBjID0gcDAgLSB2YWw7XG4gICAgdmFyIG4gPSAwO1xuICAgIGlmIChpc0Fyb3VuZFplcm8oYSkpIHtcbiAgICAgICAgaWYgKGlzTm90QXJvdW5kWmVybyhiKSkge1xuICAgICAgICAgICAgdmFyIHQxID0gLWMgLyBiO1xuICAgICAgICAgICAgaWYgKHQxID49IDAgJiYgdDEgPD0gMSkge1xuICAgICAgICAgICAgICAgIHJvb3RzW24rK10gPSB0MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIGRpc2MgPSBiICogYiAtIDQgKiBhICogYztcbiAgICAgICAgaWYgKGlzQXJvdW5kWmVybyhkaXNjKSkge1xuICAgICAgICAgICAgdmFyIHQxID0gLWIgLyAoMiAqIGEpO1xuICAgICAgICAgICAgaWYgKHQxID49IDAgJiYgdDEgPD0gMSkge1xuICAgICAgICAgICAgICAgIHJvb3RzW24rK10gPSB0MTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChkaXNjID4gMCkge1xuICAgICAgICAgICAgdmFyIGRpc2NTcXJ0ID0gbWF0aFNxcnQoZGlzYyk7XG4gICAgICAgICAgICB2YXIgdDEgPSAoLWIgKyBkaXNjU3FydCkgLyAoMiAqIGEpO1xuICAgICAgICAgICAgdmFyIHQyID0gKC1iIC0gZGlzY1NxcnQpIC8gKDIgKiBhKTtcbiAgICAgICAgICAgIGlmICh0MSA+PSAwICYmIHQxIDw9IDEpIHtcbiAgICAgICAgICAgICAgICByb290c1tuKytdID0gdDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodDIgPj0gMCAmJiB0MiA8PSAxKSB7XG4gICAgICAgICAgICAgICAgcm9vdHNbbisrXSA9IHQyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBuO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHF1YWRyYXRpY0V4dHJlbXVtKHAwLCBwMSwgcDIpIHtcbiAgICB2YXIgZGl2aWRlciA9IHAwICsgcDIgLSAyICogcDE7XG4gICAgaWYgKGRpdmlkZXIgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIDAuNTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiAocDAgLSBwMSkgLyBkaXZpZGVyO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBxdWFkcmF0aWNTdWJkaXZpZGUocDAsIHAxLCBwMiwgdCwgb3V0KSB7XG4gICAgdmFyIHAwMSA9IChwMSAtIHAwKSAqIHQgKyBwMDtcbiAgICB2YXIgcDEyID0gKHAyIC0gcDEpICogdCArIHAxO1xuICAgIHZhciBwMDEyID0gKHAxMiAtIHAwMSkgKiB0ICsgcDAxO1xuICAgIG91dFswXSA9IHAwO1xuICAgIG91dFsxXSA9IHAwMTtcbiAgICBvdXRbMl0gPSBwMDEyO1xuICAgIG91dFszXSA9IHAwMTI7XG4gICAgb3V0WzRdID0gcDEyO1xuICAgIG91dFs1XSA9IHAyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHF1YWRyYXRpY1Byb2plY3RQb2ludCh4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLCB4LCB5LCBvdXQpIHtcbiAgICB2YXIgdDtcbiAgICB2YXIgaW50ZXJ2YWwgPSAwLjAwNTtcbiAgICB2YXIgZCA9IEluZmluaXR5O1xuICAgIF92MFswXSA9IHg7XG4gICAgX3YwWzFdID0geTtcbiAgICBmb3IgKHZhciBfdCA9IDA7IF90IDwgMTsgX3QgKz0gMC4wNSkge1xuICAgICAgICBfdjFbMF0gPSBxdWFkcmF0aWNBdCh4MCwgeDEsIHgyLCBfdCk7XG4gICAgICAgIF92MVsxXSA9IHF1YWRyYXRpY0F0KHkwLCB5MSwgeTIsIF90KTtcbiAgICAgICAgdmFyIGQxID0gdjJEaXN0U3F1YXJlKF92MCwgX3YxKTtcbiAgICAgICAgaWYgKGQxIDwgZCkge1xuICAgICAgICAgICAgdCA9IF90O1xuICAgICAgICAgICAgZCA9IGQxO1xuICAgICAgICB9XG4gICAgfVxuICAgIGQgPSBJbmZpbml0eTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IDMyOyBpKyspIHtcbiAgICAgICAgaWYgKGludGVydmFsIDwgRVBTSUxPTl9OVU1FUklDKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJldiA9IHQgLSBpbnRlcnZhbDtcbiAgICAgICAgdmFyIG5leHQgPSB0ICsgaW50ZXJ2YWw7XG4gICAgICAgIF92MVswXSA9IHF1YWRyYXRpY0F0KHgwLCB4MSwgeDIsIHByZXYpO1xuICAgICAgICBfdjFbMV0gPSBxdWFkcmF0aWNBdCh5MCwgeTEsIHkyLCBwcmV2KTtcbiAgICAgICAgdmFyIGQxID0gdjJEaXN0U3F1YXJlKF92MSwgX3YwKTtcbiAgICAgICAgaWYgKHByZXYgPj0gMCAmJiBkMSA8IGQpIHtcbiAgICAgICAgICAgIHQgPSBwcmV2O1xuICAgICAgICAgICAgZCA9IGQxO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgX3YyWzBdID0gcXVhZHJhdGljQXQoeDAsIHgxLCB4MiwgbmV4dCk7XG4gICAgICAgICAgICBfdjJbMV0gPSBxdWFkcmF0aWNBdCh5MCwgeTEsIHkyLCBuZXh0KTtcbiAgICAgICAgICAgIHZhciBkMiA9IHYyRGlzdFNxdWFyZShfdjIsIF92MCk7XG4gICAgICAgICAgICBpZiAobmV4dCA8PSAxICYmIGQyIDwgZCkge1xuICAgICAgICAgICAgICAgIHQgPSBuZXh0O1xuICAgICAgICAgICAgICAgIGQgPSBkMjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGludGVydmFsICo9IDAuNTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAob3V0KSB7XG4gICAgICAgIG91dFswXSA9IHF1YWRyYXRpY0F0KHgwLCB4MSwgeDIsIHQpO1xuICAgICAgICBvdXRbMV0gPSBxdWFkcmF0aWNBdCh5MCwgeTEsIHkyLCB0KTtcbiAgICB9XG4gICAgcmV0dXJuIG1hdGhTcXJ0KGQpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHF1YWRyYXRpY0xlbmd0aCh4MCwgeTAsIHgxLCB5MSwgeDIsIHkyLCBpdGVyYXRpb24pIHtcbiAgICB2YXIgcHggPSB4MDtcbiAgICB2YXIgcHkgPSB5MDtcbiAgICB2YXIgZCA9IDA7XG4gICAgdmFyIHN0ZXAgPSAxIC8gaXRlcmF0aW9uO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IGl0ZXJhdGlvbjsgaSsrKSB7XG4gICAgICAgIHZhciB0ID0gaSAqIHN0ZXA7XG4gICAgICAgIHZhciB4ID0gcXVhZHJhdGljQXQoeDAsIHgxLCB4MiwgdCk7XG4gICAgICAgIHZhciB5ID0gcXVhZHJhdGljQXQoeTAsIHkxLCB5MiwgdCk7XG4gICAgICAgIHZhciBkeCA9IHggLSBweDtcbiAgICAgICAgdmFyIGR5ID0geSAtIHB5O1xuICAgICAgICBkICs9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG4gICAgICAgIHB4ID0geDtcbiAgICAgICAgcHkgPSB5O1xuICAgIH1cbiAgICByZXR1cm4gZDtcbn1cbiIsInZhciBCcm93c2VyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBCcm93c2VyKCkge1xuICAgICAgICB0aGlzLmZpcmVmb3ggPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmVkZ2UgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5uZXdFZGdlID0gZmFsc2U7XG4gICAgICAgIHRoaXMud2VDaGF0ID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBCcm93c2VyO1xufSgpKTtcbnZhciBFbnYgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEVudigpIHtcbiAgICAgICAgdGhpcy5icm93c2VyID0gbmV3IEJyb3dzZXIoKTtcbiAgICAgICAgdGhpcy5ub2RlID0gZmFsc2U7XG4gICAgICAgIHRoaXMud3hhID0gZmFsc2U7XG4gICAgICAgIHRoaXMud29ya2VyID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2FudmFzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3ZnU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMudG91Y2hFdmVudHNTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5wb2ludGVyRXZlbnRzU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZG9tU3VwcG9ydGVkID0gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBFbnY7XG59KCkpO1xudmFyIGVudiA9IG5ldyBFbnYoKTtcbmlmICh0eXBlb2Ygd3ggPT09ICdvYmplY3QnICYmIHR5cGVvZiB3eC5nZXRTeXN0ZW1JbmZvU3luYyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGVudi53eGEgPSB0cnVlO1xuICAgIGVudi5jYW52YXNTdXBwb3J0ZWQgPSB0cnVlO1xuICAgIGVudi50b3VjaEV2ZW50c1N1cHBvcnRlZCA9IHRydWU7XG59XG5lbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJykge1xuICAgIGVudi53b3JrZXIgPSB0cnVlO1xuICAgIGVudi5jYW52YXNTdXBwb3J0ZWQgPSB0cnVlO1xufVxuZWxzZSBpZiAodHlwZW9mIG5hdmlnYXRvciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBlbnYubm9kZSA9IHRydWU7XG4gICAgZW52LmNhbnZhc1N1cHBvcnRlZCA9IHRydWU7XG4gICAgZW52LnN2Z1N1cHBvcnRlZCA9IHRydWU7XG59XG5lbHNlIHtcbiAgICBkZXRlY3QobmF2aWdhdG9yLnVzZXJBZ2VudCwgZW52KTtcbn1cbmZ1bmN0aW9uIGRldGVjdCh1YSwgZW52KSB7XG4gICAgdmFyIGJyb3dzZXIgPSBlbnYuYnJvd3NlcjtcbiAgICB2YXIgZmlyZWZveCA9IHVhLm1hdGNoKC9GaXJlZm94XFwvKFtcXGQuXSspLyk7XG4gICAgdmFyIGllID0gdWEubWF0Y2goL01TSUVcXHMoW1xcZC5dKykvKVxuICAgICAgICB8fCB1YS5tYXRjaCgvVHJpZGVudFxcLy4rP3J2OigoW1xcZC5dKykpLyk7XG4gICAgdmFyIGVkZ2UgPSB1YS5tYXRjaCgvRWRnZT9cXC8oW1xcZC5dKykvKTtcbiAgICB2YXIgd2VDaGF0ID0gKC9taWNyb21lc3Nlbmdlci9pKS50ZXN0KHVhKTtcbiAgICBpZiAoZmlyZWZveCkge1xuICAgICAgICBicm93c2VyLmZpcmVmb3ggPSB0cnVlO1xuICAgICAgICBicm93c2VyLnZlcnNpb24gPSBmaXJlZm94WzFdO1xuICAgIH1cbiAgICBpZiAoaWUpIHtcbiAgICAgICAgYnJvd3Nlci5pZSA9IHRydWU7XG4gICAgICAgIGJyb3dzZXIudmVyc2lvbiA9IGllWzFdO1xuICAgIH1cbiAgICBpZiAoZWRnZSkge1xuICAgICAgICBicm93c2VyLmVkZ2UgPSB0cnVlO1xuICAgICAgICBicm93c2VyLnZlcnNpb24gPSBlZGdlWzFdO1xuICAgICAgICBicm93c2VyLm5ld0VkZ2UgPSArZWRnZVsxXS5zcGxpdCgnLicpWzBdID4gMTg7XG4gICAgfVxuICAgIGlmICh3ZUNoYXQpIHtcbiAgICAgICAgYnJvd3Nlci53ZUNoYXQgPSB0cnVlO1xuICAgIH1cbiAgICBlbnYuY2FudmFzU3VwcG9ydGVkID0gISFkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKS5nZXRDb250ZXh0O1xuICAgIGVudi5zdmdTdXBwb3J0ZWQgPSB0eXBlb2YgU1ZHUmVjdCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgZW52LnRvdWNoRXZlbnRzU3VwcG9ydGVkID0gJ29udG91Y2hzdGFydCcgaW4gd2luZG93ICYmICFicm93c2VyLmllICYmICFicm93c2VyLmVkZ2U7XG4gICAgZW52LnBvaW50ZXJFdmVudHNTdXBwb3J0ZWQgPSAnb25wb2ludGVyZG93bicgaW4gd2luZG93XG4gICAgICAgICYmIChicm93c2VyLmVkZ2UgfHwgKGJyb3dzZXIuaWUgJiYgK2Jyb3dzZXIudmVyc2lvbiA+PSAxMSkpO1xuICAgIGVudi5kb21TdXBwb3J0ZWQgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0IGRlZmF1bHQgZW52O1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZSgpIHtcbiAgICByZXR1cm4gWzEsIDAsIDAsIDEsIDAsIDBdO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KG91dCkge1xuICAgIG91dFswXSA9IDE7XG4gICAgb3V0WzFdID0gMDtcbiAgICBvdXRbMl0gPSAwO1xuICAgIG91dFszXSA9IDE7XG4gICAgb3V0WzRdID0gMDtcbiAgICBvdXRbNV0gPSAwO1xuICAgIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIG0pIHtcbiAgICBvdXRbMF0gPSBtWzBdO1xuICAgIG91dFsxXSA9IG1bMV07XG4gICAgb3V0WzJdID0gbVsyXTtcbiAgICBvdXRbM10gPSBtWzNdO1xuICAgIG91dFs0XSA9IG1bNF07XG4gICAgb3V0WzVdID0gbVs1XTtcbiAgICByZXR1cm4gb3V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIG11bChvdXQsIG0xLCBtMikge1xuICAgIHZhciBvdXQwID0gbTFbMF0gKiBtMlswXSArIG0xWzJdICogbTJbMV07XG4gICAgdmFyIG91dDEgPSBtMVsxXSAqIG0yWzBdICsgbTFbM10gKiBtMlsxXTtcbiAgICB2YXIgb3V0MiA9IG0xWzBdICogbTJbMl0gKyBtMVsyXSAqIG0yWzNdO1xuICAgIHZhciBvdXQzID0gbTFbMV0gKiBtMlsyXSArIG0xWzNdICogbTJbM107XG4gICAgdmFyIG91dDQgPSBtMVswXSAqIG0yWzRdICsgbTFbMl0gKiBtMls1XSArIG0xWzRdO1xuICAgIHZhciBvdXQ1ID0gbTFbMV0gKiBtMls0XSArIG0xWzNdICogbTJbNV0gKyBtMVs1XTtcbiAgICBvdXRbMF0gPSBvdXQwO1xuICAgIG91dFsxXSA9IG91dDE7XG4gICAgb3V0WzJdID0gb3V0MjtcbiAgICBvdXRbM10gPSBvdXQzO1xuICAgIG91dFs0XSA9IG91dDQ7XG4gICAgb3V0WzVdID0gb3V0NTtcbiAgICByZXR1cm4gb3V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zbGF0ZShvdXQsIGEsIHYpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIG91dFs0XSA9IGFbNF0gKyB2WzBdO1xuICAgIG91dFs1XSA9IGFbNV0gKyB2WzFdO1xuICAgIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gcm90YXRlKG91dCwgYSwgcmFkKSB7XG4gICAgdmFyIGFhID0gYVswXTtcbiAgICB2YXIgYWMgPSBhWzJdO1xuICAgIHZhciBhdHggPSBhWzRdO1xuICAgIHZhciBhYiA9IGFbMV07XG4gICAgdmFyIGFkID0gYVszXTtcbiAgICB2YXIgYXR5ID0gYVs1XTtcbiAgICB2YXIgc3QgPSBNYXRoLnNpbihyYWQpO1xuICAgIHZhciBjdCA9IE1hdGguY29zKHJhZCk7XG4gICAgb3V0WzBdID0gYWEgKiBjdCArIGFiICogc3Q7XG4gICAgb3V0WzFdID0gLWFhICogc3QgKyBhYiAqIGN0O1xuICAgIG91dFsyXSA9IGFjICogY3QgKyBhZCAqIHN0O1xuICAgIG91dFszXSA9IC1hYyAqIHN0ICsgY3QgKiBhZDtcbiAgICBvdXRbNF0gPSBjdCAqIGF0eCArIHN0ICogYXR5O1xuICAgIG91dFs1XSA9IGN0ICogYXR5IC0gc3QgKiBhdHg7XG4gICAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzY2FsZShvdXQsIGEsIHYpIHtcbiAgICB2YXIgdnggPSB2WzBdO1xuICAgIHZhciB2eSA9IHZbMV07XG4gICAgb3V0WzBdID0gYVswXSAqIHZ4O1xuICAgIG91dFsxXSA9IGFbMV0gKiB2eTtcbiAgICBvdXRbMl0gPSBhWzJdICogdng7XG4gICAgb3V0WzNdID0gYVszXSAqIHZ5O1xuICAgIG91dFs0XSA9IGFbNF0gKiB2eDtcbiAgICBvdXRbNV0gPSBhWzVdICogdnk7XG4gICAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpbnZlcnQob3V0LCBhKSB7XG4gICAgdmFyIGFhID0gYVswXTtcbiAgICB2YXIgYWMgPSBhWzJdO1xuICAgIHZhciBhdHggPSBhWzRdO1xuICAgIHZhciBhYiA9IGFbMV07XG4gICAgdmFyIGFkID0gYVszXTtcbiAgICB2YXIgYXR5ID0gYVs1XTtcbiAgICB2YXIgZGV0ID0gYWEgKiBhZCAtIGFiICogYWM7XG4gICAgaWYgKCFkZXQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGRldCA9IDEuMCAvIGRldDtcbiAgICBvdXRbMF0gPSBhZCAqIGRldDtcbiAgICBvdXRbMV0gPSAtYWIgKiBkZXQ7XG4gICAgb3V0WzJdID0gLWFjICogZGV0O1xuICAgIG91dFszXSA9IGFhICogZGV0O1xuICAgIG91dFs0XSA9IChhYyAqIGF0eSAtIGFkICogYXR4KSAqIGRldDtcbiAgICBvdXRbNV0gPSAoYWIgKiBhdHggLSBhYSAqIGF0eSkgKiBkZXQ7XG4gICAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZShhKSB7XG4gICAgdmFyIGIgPSBjcmVhdGUoKTtcbiAgICBjb3B5KGIsIGEpO1xuICAgIHJldHVybiBiO1xufVxuIiwidmFyIEJVSUxUSU5fT0JKRUNUID0ge1xuICAgICdbb2JqZWN0IEZ1bmN0aW9uXSc6IHRydWUsXG4gICAgJ1tvYmplY3QgUmVnRXhwXSc6IHRydWUsXG4gICAgJ1tvYmplY3QgRGF0ZV0nOiB0cnVlLFxuICAgICdbb2JqZWN0IEVycm9yXSc6IHRydWUsXG4gICAgJ1tvYmplY3QgQ2FudmFzR3JhZGllbnRdJzogdHJ1ZSxcbiAgICAnW29iamVjdCBDYW52YXNQYXR0ZXJuXSc6IHRydWUsXG4gICAgJ1tvYmplY3QgSW1hZ2VdJzogdHJ1ZSxcbiAgICAnW29iamVjdCBDYW52YXNdJzogdHJ1ZVxufTtcbnZhciBUWVBFRF9BUlJBWSA9IHtcbiAgICAnW29iamVjdCBJbnQ4QXJyYXldJzogdHJ1ZSxcbiAgICAnW29iamVjdCBVaW50OEFycmF5XSc6IHRydWUsXG4gICAgJ1tvYmplY3QgVWludDhDbGFtcGVkQXJyYXldJzogdHJ1ZSxcbiAgICAnW29iamVjdCBJbnQxNkFycmF5XSc6IHRydWUsXG4gICAgJ1tvYmplY3QgVWludDE2QXJyYXldJzogdHJ1ZSxcbiAgICAnW29iamVjdCBJbnQzMkFycmF5XSc6IHRydWUsXG4gICAgJ1tvYmplY3QgVWludDMyQXJyYXldJzogdHJ1ZSxcbiAgICAnW29iamVjdCBGbG9hdDMyQXJyYXldJzogdHJ1ZSxcbiAgICAnW29iamVjdCBGbG9hdDY0QXJyYXldJzogdHJ1ZVxufTtcbnZhciBvYmpUb1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG52YXIgYXJyYXlQcm90byA9IEFycmF5LnByb3RvdHlwZTtcbnZhciBuYXRpdmVGb3JFYWNoID0gYXJyYXlQcm90by5mb3JFYWNoO1xudmFyIG5hdGl2ZUZpbHRlciA9IGFycmF5UHJvdG8uZmlsdGVyO1xudmFyIG5hdGl2ZVNsaWNlID0gYXJyYXlQcm90by5zbGljZTtcbnZhciBuYXRpdmVNYXAgPSBhcnJheVByb3RvLm1hcDtcbnZhciBjdG9yRnVuY3Rpb24gPSBmdW5jdGlvbiAoKSB7IH0uY29uc3RydWN0b3I7XG52YXIgcHJvdG9GdW5jdGlvbiA9IGN0b3JGdW5jdGlvbiA/IGN0b3JGdW5jdGlvbi5wcm90b3R5cGUgOiBudWxsO1xudmFyIG1ldGhvZHMgPSB7fTtcbmV4cG9ydCBmdW5jdGlvbiAkb3ZlcnJpZGUobmFtZSwgZm4pIHtcbiAgICBtZXRob2RzW25hbWVdID0gZm47XG59XG52YXIgaWRTdGFydCA9IDB4MDkwNztcbmV4cG9ydCBmdW5jdGlvbiBndWlkKCkge1xuICAgIHJldHVybiBpZFN0YXJ0Kys7XG59XG5leHBvcnQgZnVuY3Rpb24gbG9nRXJyb3IoKSB7XG4gICAgdmFyIGFyZ3MgPSBbXTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgYXJndW1lbnRzLmxlbmd0aDsgX2krKykge1xuICAgICAgICBhcmdzW19pXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc29sZS5lcnJvci5hcHBseShjb25zb2xlLCBhcmdzKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gY2xvbmUoc291cmNlKSB7XG4gICAgaWYgKHNvdXJjZSA9PSBudWxsIHx8IHR5cGVvZiBzb3VyY2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgIHJldHVybiBzb3VyY2U7XG4gICAgfVxuICAgIHZhciByZXN1bHQgPSBzb3VyY2U7XG4gICAgdmFyIHR5cGVTdHIgPSBvYmpUb1N0cmluZy5jYWxsKHNvdXJjZSk7XG4gICAgaWYgKHR5cGVTdHIgPT09ICdbb2JqZWN0IEFycmF5XScpIHtcbiAgICAgICAgaWYgKCFpc1ByaW1pdGl2ZShzb3VyY2UpKSB7XG4gICAgICAgICAgICByZXN1bHQgPSBbXTtcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBzb3VyY2UubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0gPSBjbG9uZShzb3VyY2VbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKFRZUEVEX0FSUkFZW3R5cGVTdHJdKSB7XG4gICAgICAgIGlmICghaXNQcmltaXRpdmUoc291cmNlKSkge1xuICAgICAgICAgICAgdmFyIEN0b3IgPSBzb3VyY2UuY29uc3RydWN0b3I7XG4gICAgICAgICAgICBpZiAoQ3Rvci5mcm9tKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gQ3Rvci5mcm9tKHNvdXJjZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBuZXcgQ3Rvcihzb3VyY2UubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gc291cmNlLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdFtpXSA9IGNsb25lKHNvdXJjZVtpXSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGVsc2UgaWYgKCFCVUlMVElOX09CSkVDVFt0eXBlU3RyXSAmJiAhaXNQcmltaXRpdmUoc291cmNlKSAmJiAhaXNEb20oc291cmNlKSkge1xuICAgICAgICByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSBjbG9uZShzb3VyY2Vba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBtZXJnZSh0YXJnZXQsIHNvdXJjZSwgb3ZlcndyaXRlKSB7XG4gICAgaWYgKCFpc09iamVjdChzb3VyY2UpIHx8ICFpc09iamVjdCh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiBvdmVyd3JpdGUgPyBjbG9uZShzb3VyY2UpIDogdGFyZ2V0O1xuICAgIH1cbiAgICBmb3IgKHZhciBrZXkgaW4gc291cmNlKSB7XG4gICAgICAgIGlmIChzb3VyY2UuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdmFyIHRhcmdldFByb3AgPSB0YXJnZXRba2V5XTtcbiAgICAgICAgICAgIHZhciBzb3VyY2VQcm9wID0gc291cmNlW2tleV07XG4gICAgICAgICAgICBpZiAoaXNPYmplY3Qoc291cmNlUHJvcClcbiAgICAgICAgICAgICAgICAmJiBpc09iamVjdCh0YXJnZXRQcm9wKVxuICAgICAgICAgICAgICAgICYmICFpc0FycmF5KHNvdXJjZVByb3ApXG4gICAgICAgICAgICAgICAgJiYgIWlzQXJyYXkodGFyZ2V0UHJvcClcbiAgICAgICAgICAgICAgICAmJiAhaXNEb20oc291cmNlUHJvcClcbiAgICAgICAgICAgICAgICAmJiAhaXNEb20odGFyZ2V0UHJvcClcbiAgICAgICAgICAgICAgICAmJiAhaXNCdWlsdEluT2JqZWN0KHNvdXJjZVByb3ApXG4gICAgICAgICAgICAgICAgJiYgIWlzQnVpbHRJbk9iamVjdCh0YXJnZXRQcm9wKVxuICAgICAgICAgICAgICAgICYmICFpc1ByaW1pdGl2ZShzb3VyY2VQcm9wKVxuICAgICAgICAgICAgICAgICYmICFpc1ByaW1pdGl2ZSh0YXJnZXRQcm9wKSkge1xuICAgICAgICAgICAgICAgIG1lcmdlKHRhcmdldFByb3AsIHNvdXJjZVByb3AsIG92ZXJ3cml0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChvdmVyd3JpdGUgfHwgIShrZXkgaW4gdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRhcmdldFtrZXldID0gY2xvbmUoc291cmNlW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gbWVyZ2VBbGwodGFyZ2V0QW5kU291cmNlcywgb3ZlcndyaXRlKSB7XG4gICAgdmFyIHJlc3VsdCA9IHRhcmdldEFuZFNvdXJjZXNbMF07XG4gICAgZm9yICh2YXIgaSA9IDEsIGxlbiA9IHRhcmdldEFuZFNvdXJjZXMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgcmVzdWx0ID0gbWVyZ2UocmVzdWx0LCB0YXJnZXRBbmRTb3VyY2VzW2ldLCBvdmVyd3JpdGUpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmIChPYmplY3QuYXNzaWduKSB7XG4gICAgICAgIE9iamVjdC5hc3NpZ24odGFyZ2V0LCBzb3VyY2UpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W2tleV0gPSBzb3VyY2Vba2V5XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRlZmF1bHRzKHRhcmdldCwgc291cmNlLCBvdmVybGF5KSB7XG4gICAgdmFyIGtleXNBcnIgPSBrZXlzKHNvdXJjZSk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzQXJyW2ldO1xuICAgICAgICBpZiAoKG92ZXJsYXkgPyBzb3VyY2Vba2V5XSAhPSBudWxsIDogdGFyZ2V0W2tleV0gPT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRhcmdldFtrZXldID0gc291cmNlW2tleV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRhcmdldDtcbn1cbmV4cG9ydCB2YXIgY3JlYXRlQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBtZXRob2RzLmNyZWF0ZUNhbnZhcygpO1xufTtcbm1ldGhvZHMuY3JlYXRlQ2FudmFzID0gZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbn07XG5leHBvcnQgZnVuY3Rpb24gaW5kZXhPZihhcnJheSwgdmFsdWUpIHtcbiAgICBpZiAoYXJyYXkpIHtcbiAgICAgICAgaWYgKGFycmF5LmluZGV4T2YpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJheS5pbmRleE9mKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gYXJyYXkubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChhcnJheVtpXSA9PT0gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gLTE7XG59XG5leHBvcnQgZnVuY3Rpb24gaW5oZXJpdHMoY2xhenosIGJhc2VDbGF6eikge1xuICAgIHZhciBjbGF6elByb3RvdHlwZSA9IGNsYXp6LnByb3RvdHlwZTtcbiAgICBmdW5jdGlvbiBGKCkgeyB9XG4gICAgRi5wcm90b3R5cGUgPSBiYXNlQ2xhenoucHJvdG90eXBlO1xuICAgIGNsYXp6LnByb3RvdHlwZSA9IG5ldyBGKCk7XG4gICAgZm9yICh2YXIgcHJvcCBpbiBjbGF6elByb3RvdHlwZSkge1xuICAgICAgICBpZiAoY2xhenpQcm90b3R5cGUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgIGNsYXp6LnByb3RvdHlwZVtwcm9wXSA9IGNsYXp6UHJvdG90eXBlW3Byb3BdO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNsYXp6LnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IGNsYXp6O1xuICAgIGNsYXp6LnN1cGVyQ2xhc3MgPSBiYXNlQ2xheno7XG59XG5leHBvcnQgZnVuY3Rpb24gbWl4aW4odGFyZ2V0LCBzb3VyY2UsIG92ZXJyaWRlKSB7XG4gICAgdGFyZ2V0ID0gJ3Byb3RvdHlwZScgaW4gdGFyZ2V0ID8gdGFyZ2V0LnByb3RvdHlwZSA6IHRhcmdldDtcbiAgICBzb3VyY2UgPSAncHJvdG90eXBlJyBpbiBzb3VyY2UgPyBzb3VyY2UucHJvdG90eXBlIDogc291cmNlO1xuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcykge1xuICAgICAgICB2YXIga2V5TGlzdCA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHNvdXJjZSk7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5TGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleUxpc3RbaV07XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnY29uc3RydWN0b3InKSB7XG4gICAgICAgICAgICAgICAgaWYgKChvdmVycmlkZSA/IHNvdXJjZVtrZXldICE9IG51bGwgOiB0YXJnZXRba2V5XSA9PSBudWxsKSkge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgZGVmYXVsdHModGFyZ2V0LCBzb3VyY2UsIG92ZXJyaWRlKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gaXNBcnJheUxpa2UoZGF0YSkge1xuICAgIGlmICghZGF0YSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZW9mIGRhdGEubGVuZ3RoID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBlYWNoKGFyciwgY2IsIGNvbnRleHQpIHtcbiAgICBpZiAoIShhcnIgJiYgY2IpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFyci5mb3JFYWNoICYmIGFyci5mb3JFYWNoID09PSBuYXRpdmVGb3JFYWNoKSB7XG4gICAgICAgIGFyci5mb3JFYWNoKGNiLCBjb250ZXh0KTtcbiAgICB9XG4gICAgZWxzZSBpZiAoYXJyLmxlbmd0aCA9PT0gK2Fyci5sZW5ndGgpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgY2IuY2FsbChjb250ZXh0LCBhcnJbaV0sIGksIGFycik7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBhcnIpIHtcbiAgICAgICAgICAgIGlmIChhcnIuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNiLmNhbGwoY29udGV4dCwgYXJyW2tleV0sIGtleSwgYXJyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBtYXAoYXJyLCBjYiwgY29udGV4dCkge1xuICAgIGlmICghYXJyKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgaWYgKCFjYikge1xuICAgICAgICByZXR1cm4gc2xpY2UoYXJyKTtcbiAgICB9XG4gICAgaWYgKGFyci5tYXAgJiYgYXJyLm1hcCA9PT0gbmF0aXZlTWFwKSB7XG4gICAgICAgIHJldHVybiBhcnIubWFwKGNiLCBjb250ZXh0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goY2IuY2FsbChjb250ZXh0LCBhcnJbaV0sIGksIGFycikpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZShhcnIsIGNiLCBtZW1vLCBjb250ZXh0KSB7XG4gICAgaWYgKCEoYXJyICYmIGNiKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBhcnIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgbWVtbyA9IGNiLmNhbGwoY29udGV4dCwgbWVtbywgYXJyW2ldLCBpLCBhcnIpO1xuICAgIH1cbiAgICByZXR1cm4gbWVtbztcbn1cbmV4cG9ydCBmdW5jdGlvbiBmaWx0ZXIoYXJyLCBjYiwgY29udGV4dCkge1xuICAgIGlmICghYXJyKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgaWYgKCFjYikge1xuICAgICAgICByZXR1cm4gc2xpY2UoYXJyKTtcbiAgICB9XG4gICAgaWYgKGFyci5maWx0ZXIgJiYgYXJyLmZpbHRlciA9PT0gbmF0aXZlRmlsdGVyKSB7XG4gICAgICAgIHJldHVybiBhcnIuZmlsdGVyKGNiLCBjb250ZXh0KTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgICAgaWYgKGNiLmNhbGwoY29udGV4dCwgYXJyW2ldLCBpLCBhcnIpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goYXJyW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBmaW5kKGFyciwgY2IsIGNvbnRleHQpIHtcbiAgICBpZiAoIShhcnIgJiYgY2IpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBpZiAoY2IuY2FsbChjb250ZXh0LCBhcnJbaV0sIGksIGFycikpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJbaV07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24ga2V5cyhvYmopIHtcbiAgICBpZiAoIW9iaikge1xuICAgICAgICByZXR1cm4gW107XG4gICAgfVxuICAgIGlmIChPYmplY3Qua2V5cykge1xuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMob2JqKTtcbiAgICB9XG4gICAgdmFyIGtleUxpc3QgPSBbXTtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICAgIGlmIChvYmouaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAga2V5TGlzdC5wdXNoKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGtleUxpc3Q7XG59XG5mdW5jdGlvbiBiaW5kUG9seWZpbGwoZnVuYywgY29udGV4dCkge1xuICAgIHZhciBhcmdzID0gW107XG4gICAgZm9yICh2YXIgX2kgPSAyOyBfaSA8IGFyZ3VtZW50cy5sZW5ndGg7IF9pKyspIHtcbiAgICAgICAgYXJnc1tfaSAtIDJdID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncy5jb25jYXQobmF0aXZlU2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgfTtcbn1cbmV4cG9ydCB2YXIgYmluZCA9IChwcm90b0Z1bmN0aW9uICYmIGlzRnVuY3Rpb24ocHJvdG9GdW5jdGlvbi5iaW5kKSlcbiAgICA/IHByb3RvRnVuY3Rpb24uY2FsbC5iaW5kKHByb3RvRnVuY3Rpb24uYmluZClcbiAgICA6IGJpbmRQb2x5ZmlsbDtcbmZ1bmN0aW9uIGN1cnJ5KGZ1bmMpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBmdW5jLmFwcGx5KHRoaXMsIGFyZ3MuY29uY2F0KG5hdGl2ZVNsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgIH07XG59XG5leHBvcnQgeyBjdXJyeSB9O1xuZXhwb3J0IGZ1bmN0aW9uIGlzQXJyYXkodmFsdWUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheSkge1xuICAgICAgICByZXR1cm4gQXJyYXkuaXNBcnJheSh2YWx1ZSk7XG4gICAgfVxuICAgIHJldHVybiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RyaW5nU2FmZSh2YWx1ZSkge1xuICAgIHJldHVybiBvYmpUb1N0cmluZy5jYWxsKHZhbHVlKSA9PT0gJ1tvYmplY3QgU3RyaW5nXSc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNOdW1iZXIodmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJztcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8ICghIXZhbHVlICYmIHR5cGUgPT09ICdvYmplY3QnKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0J1aWx0SW5PYmplY3QodmFsdWUpIHtcbiAgICByZXR1cm4gISFCVUlMVElOX09CSkVDVFtvYmpUb1N0cmluZy5jYWxsKHZhbHVlKV07XG59XG5leHBvcnQgZnVuY3Rpb24gaXNUeXBlZEFycmF5KHZhbHVlKSB7XG4gICAgcmV0dXJuICEhVFlQRURfQVJSQVlbb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGlzRG9tKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCdcbiAgICAgICAgJiYgdHlwZW9mIHZhbHVlLm5vZGVUeXBlID09PSAnbnVtYmVyJ1xuICAgICAgICAmJiB0eXBlb2YgdmFsdWUub3duZXJEb2N1bWVudCA9PT0gJ29iamVjdCc7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNHcmFkaWVudE9iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZS5jb2xvclN0b3BzICE9IG51bGw7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNQYXR0ZXJuT2JqZWN0KHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlLmltYWdlICE9IG51bGw7XG59XG5leHBvcnQgZnVuY3Rpb24gaXNSZWdFeHAodmFsdWUpIHtcbiAgICByZXR1cm4gb2JqVG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGVxTmFOKHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICE9PSB2YWx1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiByZXRyaWV2ZSgpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2ldID0gYXJndW1lbnRzW19pXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyZ3MubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgaWYgKGFyZ3NbaV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGFyZ3NbaV07XG4gICAgICAgIH1cbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gcmV0cmlldmUyKHZhbHVlMCwgdmFsdWUxKSB7XG4gICAgcmV0dXJuIHZhbHVlMCAhPSBudWxsXG4gICAgICAgID8gdmFsdWUwXG4gICAgICAgIDogdmFsdWUxO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJldHJpZXZlMyh2YWx1ZTAsIHZhbHVlMSwgdmFsdWUyKSB7XG4gICAgcmV0dXJuIHZhbHVlMCAhPSBudWxsXG4gICAgICAgID8gdmFsdWUwXG4gICAgICAgIDogdmFsdWUxICE9IG51bGxcbiAgICAgICAgICAgID8gdmFsdWUxXG4gICAgICAgICAgICA6IHZhbHVlMjtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzbGljZShhcnIpIHtcbiAgICB2YXIgYXJncyA9IFtdO1xuICAgIGZvciAodmFyIF9pID0gMTsgX2kgPCBhcmd1bWVudHMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICAgIGFyZ3NbX2kgLSAxXSA9IGFyZ3VtZW50c1tfaV07XG4gICAgfVxuICAgIHJldHVybiBuYXRpdmVTbGljZS5hcHBseShhcnIsIGFyZ3MpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUNzc0FycmF5KHZhbCkge1xuICAgIGlmICh0eXBlb2YgKHZhbCkgPT09ICdudW1iZXInKSB7XG4gICAgICAgIHJldHVybiBbdmFsLCB2YWwsIHZhbCwgdmFsXTtcbiAgICB9XG4gICAgdmFyIGxlbiA9IHZhbC5sZW5ndGg7XG4gICAgaWYgKGxlbiA9PT0gMikge1xuICAgICAgICByZXR1cm4gW3ZhbFswXSwgdmFsWzFdLCB2YWxbMF0sIHZhbFsxXV07XG4gICAgfVxuICAgIGVsc2UgaWYgKGxlbiA9PT0gMykge1xuICAgICAgICByZXR1cm4gW3ZhbFswXSwgdmFsWzFdLCB2YWxbMl0sIHZhbFsxXV07XG4gICAgfVxuICAgIHJldHVybiB2YWw7XG59XG5leHBvcnQgZnVuY3Rpb24gYXNzZXJ0KGNvbmRpdGlvbiwgbWVzc2FnZSkge1xuICAgIGlmICghY29uZGl0aW9uKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdHJpbShzdHIpIHtcbiAgICBpZiAoc3RyID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGVsc2UgaWYgKHR5cGVvZiBzdHIudHJpbSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR1cm4gc3RyLnRyaW0oKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIHJldHVybiBzdHIucmVwbGFjZSgvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2csICcnKTtcbiAgICB9XG59XG52YXIgcHJpbWl0aXZlS2V5ID0gJ19fZWNfcHJpbWl0aXZlX18nO1xuZXhwb3J0IGZ1bmN0aW9uIHNldEFzUHJpbWl0aXZlKG9iaikge1xuICAgIG9ialtwcmltaXRpdmVLZXldID0gdHJ1ZTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc1ByaW1pdGl2ZShvYmopIHtcbiAgICByZXR1cm4gb2JqW3ByaW1pdGl2ZUtleV07XG59XG52YXIgSGFzaE1hcCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gSGFzaE1hcChvYmopIHtcbiAgICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgICAgIHZhciBpc0FyciA9IGlzQXJyYXkob2JqKTtcbiAgICAgICAgdGhpcy5kYXRhID0ge307XG4gICAgICAgIHZhciB0aGlzTWFwID0gdGhpcztcbiAgICAgICAgKG9iaiBpbnN0YW5jZW9mIEhhc2hNYXApXG4gICAgICAgICAgICA/IG9iai5lYWNoKHZpc2l0KVxuICAgICAgICAgICAgOiAob2JqICYmIGVhY2gob2JqLCB2aXNpdCkpO1xuICAgICAgICBmdW5jdGlvbiB2aXNpdCh2YWx1ZSwga2V5KSB7XG4gICAgICAgICAgICBpc0FyciA/IHRoaXNNYXAuc2V0KHZhbHVlLCBrZXkpIDogdGhpc01hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgSGFzaE1hcC5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gdGhpcy5kYXRhLmhhc093blByb3BlcnR5KGtleSkgPyB0aGlzLmRhdGFba2V5XSA6IG51bGw7XG4gICAgfTtcbiAgICBIYXNoTWFwLnByb3RvdHlwZS5zZXQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSkge1xuICAgICAgICByZXR1cm4gKHRoaXMuZGF0YVtrZXldID0gdmFsdWUpO1xuICAgIH07XG4gICAgSGFzaE1hcC5wcm90b3R5cGUuZWFjaCA9IGZ1bmN0aW9uIChjYiwgY29udGV4dCkge1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy5kYXRhKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kYXRhLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjYi5jYWxsKGNvbnRleHQsIHRoaXMuZGF0YVtrZXldLCBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBIYXNoTWFwLnByb3RvdHlwZS5rZXlzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ga2V5cyh0aGlzLmRhdGEpO1xuICAgIH07XG4gICAgSGFzaE1hcC5wcm90b3R5cGUucmVtb3ZlS2V5ID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBkZWxldGUgdGhpcy5kYXRhW2tleV07XG4gICAgfTtcbiAgICByZXR1cm4gSGFzaE1hcDtcbn0oKSk7XG5leHBvcnQgeyBIYXNoTWFwIH07XG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlSGFzaE1hcChvYmopIHtcbiAgICByZXR1cm4gbmV3IEhhc2hNYXAob2JqKTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXRBcnJheShhLCBiKSB7XG4gICAgdmFyIG5ld0FycmF5ID0gbmV3IGEuY29uc3RydWN0b3IoYS5sZW5ndGggKyBiLmxlbmd0aCk7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG5ld0FycmF5W2ldID0gYVtpXTtcbiAgICB9XG4gICAgdmFyIG9mZnNldCA9IGEubGVuZ3RoO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYi5sZW5ndGg7IGkrKykge1xuICAgICAgICBuZXdBcnJheVtpICsgb2Zmc2V0XSA9IGJbaV07XG4gICAgfVxuICAgIHJldHVybiBuZXdBcnJheTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVPYmplY3QocHJvdG8sIHByb3BlcnRpZXMpIHtcbiAgICB2YXIgb2JqO1xuICAgIGlmIChPYmplY3QuY3JlYXRlKSB7XG4gICAgICAgIG9iaiA9IE9iamVjdC5jcmVhdGUocHJvdG8pO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgdmFyIFN0eWxlQ3RvciA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICAgICAgU3R5bGVDdG9yLnByb3RvdHlwZSA9IHByb3RvO1xuICAgICAgICBvYmogPSBuZXcgU3R5bGVDdG9yKCk7XG4gICAgfVxuICAgIGlmIChwcm9wZXJ0aWVzKSB7XG4gICAgICAgIGV4dGVuZChvYmosIHByb3BlcnRpZXMpO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGhhc093bihvd24sIHByb3ApIHtcbiAgICByZXR1cm4gb3duLmhhc093blByb3BlcnR5KHByb3ApO1xufVxuZXhwb3J0IGZ1bmN0aW9uIG5vb3AoKSB7IH1cbiIsImV4cG9ydCBmdW5jdGlvbiBjcmVhdGUoeCwgeSkge1xuICAgIGlmICh4ID09IG51bGwpIHtcbiAgICAgICAgeCA9IDA7XG4gICAgfVxuICAgIGlmICh5ID09IG51bGwpIHtcbiAgICAgICAgeSA9IDA7XG4gICAgfVxuICAgIHJldHVybiBbeCwgeV07XG59XG5leHBvcnQgZnVuY3Rpb24gY29weShvdXQsIHYpIHtcbiAgICBvdXRbMF0gPSB2WzBdO1xuICAgIG91dFsxXSA9IHZbMV07XG4gICAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBjbG9uZSh2KSB7XG4gICAgcmV0dXJuIFt2WzBdLCB2WzFdXTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBzZXQob3V0LCBhLCBiKSB7XG4gICAgb3V0WzBdID0gYTtcbiAgICBvdXRbMV0gPSBiO1xuICAgIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gYWRkKG91dCwgdjEsIHYyKSB7XG4gICAgb3V0WzBdID0gdjFbMF0gKyB2MlswXTtcbiAgICBvdXRbMV0gPSB2MVsxXSArIHYyWzFdO1xuICAgIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gc2NhbGVBbmRBZGQob3V0LCB2MSwgdjIsIGEpIHtcbiAgICBvdXRbMF0gPSB2MVswXSArIHYyWzBdICogYTtcbiAgICBvdXRbMV0gPSB2MVsxXSArIHYyWzFdICogYTtcbiAgICByZXR1cm4gb3V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIHN1YihvdXQsIHYxLCB2Mikge1xuICAgIG91dFswXSA9IHYxWzBdIC0gdjJbMF07XG4gICAgb3V0WzFdID0gdjFbMV0gLSB2MlsxXTtcbiAgICByZXR1cm4gb3V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGxlbih2KSB7XG4gICAgcmV0dXJuIE1hdGguc3FydChsZW5TcXVhcmUodikpO1xufVxuZXhwb3J0IHZhciBsZW5ndGggPSBsZW47XG5leHBvcnQgZnVuY3Rpb24gbGVuU3F1YXJlKHYpIHtcbiAgICByZXR1cm4gdlswXSAqIHZbMF0gKyB2WzFdICogdlsxXTtcbn1cbmV4cG9ydCB2YXIgbGVuZ3RoU3F1YXJlID0gbGVuU3F1YXJlO1xuZXhwb3J0IGZ1bmN0aW9uIG11bChvdXQsIHYxLCB2Mikge1xuICAgIG91dFswXSA9IHYxWzBdICogdjJbMF07XG4gICAgb3V0WzFdID0gdjFbMV0gKiB2MlsxXTtcbiAgICByZXR1cm4gb3V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRpdihvdXQsIHYxLCB2Mikge1xuICAgIG91dFswXSA9IHYxWzBdIC8gdjJbMF07XG4gICAgb3V0WzFdID0gdjFbMV0gLyB2MlsxXTtcbiAgICByZXR1cm4gb3V0O1xufVxuZXhwb3J0IGZ1bmN0aW9uIGRvdCh2MSwgdjIpIHtcbiAgICByZXR1cm4gdjFbMF0gKiB2MlswXSArIHYxWzFdICogdjJbMV07XG59XG5leHBvcnQgZnVuY3Rpb24gc2NhbGUob3V0LCB2LCBzKSB7XG4gICAgb3V0WzBdID0gdlswXSAqIHM7XG4gICAgb3V0WzFdID0gdlsxXSAqIHM7XG4gICAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBub3JtYWxpemUob3V0LCB2KSB7XG4gICAgdmFyIGQgPSBsZW4odik7XG4gICAgaWYgKGQgPT09IDApIHtcbiAgICAgICAgb3V0WzBdID0gMDtcbiAgICAgICAgb3V0WzFdID0gMDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIG91dFswXSA9IHZbMF0gLyBkO1xuICAgICAgICBvdXRbMV0gPSB2WzFdIC8gZDtcbiAgICB9XG4gICAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZSh2MSwgdjIpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KCh2MVswXSAtIHYyWzBdKSAqICh2MVswXSAtIHYyWzBdKVxuICAgICAgICArICh2MVsxXSAtIHYyWzFdKSAqICh2MVsxXSAtIHYyWzFdKSk7XG59XG5leHBvcnQgdmFyIGRpc3QgPSBkaXN0YW5jZTtcbmV4cG9ydCBmdW5jdGlvbiBkaXN0YW5jZVNxdWFyZSh2MSwgdjIpIHtcbiAgICByZXR1cm4gKHYxWzBdIC0gdjJbMF0pICogKHYxWzBdIC0gdjJbMF0pXG4gICAgICAgICsgKHYxWzFdIC0gdjJbMV0pICogKHYxWzFdIC0gdjJbMV0pO1xufVxuZXhwb3J0IHZhciBkaXN0U3F1YXJlID0gZGlzdGFuY2VTcXVhcmU7XG5leHBvcnQgZnVuY3Rpb24gbmVnYXRlKG91dCwgdikge1xuICAgIG91dFswXSA9IC12WzBdO1xuICAgIG91dFsxXSA9IC12WzFdO1xuICAgIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gbGVycChvdXQsIHYxLCB2MiwgdCkge1xuICAgIG91dFswXSA9IHYxWzBdICsgdCAqICh2MlswXSAtIHYxWzBdKTtcbiAgICBvdXRbMV0gPSB2MVsxXSArIHQgKiAodjJbMV0gLSB2MVsxXSk7XG4gICAgcmV0dXJuIG91dDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBhcHBseVRyYW5zZm9ybShvdXQsIHYsIG0pIHtcbiAgICB2YXIgeCA9IHZbMF07XG4gICAgdmFyIHkgPSB2WzFdO1xuICAgIG91dFswXSA9IG1bMF0gKiB4ICsgbVsyXSAqIHkgKyBtWzRdO1xuICAgIG91dFsxXSA9IG1bMV0gKiB4ICsgbVszXSAqIHkgKyBtWzVdO1xuICAgIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gbWluKG91dCwgdjEsIHYyKSB7XG4gICAgb3V0WzBdID0gTWF0aC5taW4odjFbMF0sIHYyWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1pbih2MVsxXSwgdjJbMV0pO1xuICAgIHJldHVybiBvdXQ7XG59XG5leHBvcnQgZnVuY3Rpb24gbWF4KG91dCwgdjEsIHYyKSB7XG4gICAgb3V0WzBdID0gTWF0aC5tYXgodjFbMF0sIHYyWzBdKTtcbiAgICBvdXRbMV0gPSBNYXRoLm1heCh2MVsxXSwgdjJbMV0pO1xuICAgIHJldHVybiBvdXQ7XG59XG4iLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBFbGVtZW50IGZyb20gJy4uL0VsZW1lbnQnO1xuaW1wb3J0IEJvdW5kaW5nUmVjdCBmcm9tICcuLi9jb3JlL0JvdW5kaW5nUmVjdCc7XG5pbXBvcnQgeyBrZXlzLCBleHRlbmQsIGNyZWF0ZU9iamVjdCB9IGZyb20gJy4uL2NvcmUvdXRpbCc7XG52YXIgU1RZTEVfTUFHSUNfS0VZID0gJ19fenJfc3R5bGVfJyArIE1hdGgucm91bmQoKE1hdGgucmFuZG9tKCkgKiAxMCkpO1xuZXhwb3J0IHZhciBERUZBVUxUX0NPTU1PTl9TVFlMRSA9IHtcbiAgICBzaGFkb3dCbHVyOiAwLFxuICAgIHNoYWRvd09mZnNldFg6IDAsXG4gICAgc2hhZG93T2Zmc2V0WTogMCxcbiAgICBzaGFkb3dDb2xvcjogJyMwMDAnLFxuICAgIG9wYWNpdHk6IDEsXG4gICAgYmxlbmQ6ICdzb3VyY2Utb3Zlcidcbn07XG5leHBvcnQgdmFyIERFRkFVTFRfQ09NTU9OX0FOSU1BVElPTl9QUk9QUyA9IHtcbiAgICBzdHlsZToge1xuICAgICAgICBzaGFkb3dCbHVyOiB0cnVlLFxuICAgICAgICBzaGFkb3dPZmZzZXRYOiB0cnVlLFxuICAgICAgICBzaGFkb3dPZmZzZXRZOiB0cnVlLFxuICAgICAgICBzaGFkb3dDb2xvcjogdHJ1ZSxcbiAgICAgICAgb3BhY2l0eTogdHJ1ZVxuICAgIH1cbn07XG5ERUZBVUxUX0NPTU1PTl9TVFlMRVtTVFlMRV9NQUdJQ19LRVldID0gdHJ1ZTtcbnZhciBQUklNQVJZX1NUQVRFU19LRVlTID0gWyd6JywgJ3oyJywgJ2ludmlzaWJsZSddO1xudmFyIERpc3BsYXlhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRGlzcGxheWFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRGlzcGxheWFibGUocHJvcHMpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlci5jYWxsKHRoaXMsIHByb3BzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgdmFyIGtleXNBcnIgPSBrZXlzKHByb3BzKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c0FycltpXTtcbiAgICAgICAgICAgIGlmIChrZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVzZVN0eWxlKHByb3BzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hdHRyS1YuY2FsbCh0aGlzLCBrZXksIHByb3BzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICghdGhpcy5zdHlsZSkge1xuICAgICAgICAgICAgdGhpcy51c2VTdHlsZSh7fSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS5iZWZvcmVCcnVzaCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUuYWZ0ZXJCcnVzaCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUuaW5uZXJCZWZvcmVCcnVzaCA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUuaW5uZXJBZnRlckJydXNoID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS5zaG91bGRCZVBhaW50ZWQgPSBmdW5jdGlvbiAodmlld1dpZHRoLCB2aWV3SGVpZ2h0LCBjb25zaWRlckNsaXBQYXRoLCBjb25zaWRlckFuY2VzdG9ycykge1xuICAgICAgICB2YXIgbSA9IHRoaXMudHJhbnNmb3JtO1xuICAgICAgICBpZiAodGhpcy5pZ25vcmVcbiAgICAgICAgICAgIHx8IHRoaXMuaW52aXNpYmxlXG4gICAgICAgICAgICB8fCB0aGlzLnN0eWxlLm9wYWNpdHkgPT09IDBcbiAgICAgICAgICAgIHx8ICh0aGlzLmN1bGxpbmdcbiAgICAgICAgICAgICAgICAmJiBpc0Rpc3BsYXlhYmxlQ3VsbGVkKHRoaXMsIHZpZXdXaWR0aCwgdmlld0hlaWdodCkpXG4gICAgICAgICAgICB8fCAobSAmJiAhbVswXSAmJiAhbVszXSkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uc2lkZXJDbGlwUGF0aCAmJiB0aGlzLl9fY2xpcFBhdGhzKSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX19jbGlwUGF0aHMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5fX2NsaXBQYXRoc1tpXS5pc1plcm9BcmVhKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoY29uc2lkZXJBbmNlc3RvcnMgJiYgdGhpcy5wYXJlbnQpIHtcbiAgICAgICAgICAgIHZhciBwYXJlbnRfMSA9IHRoaXMucGFyZW50O1xuICAgICAgICAgICAgd2hpbGUgKHBhcmVudF8xKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhcmVudF8xLmlnbm9yZSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmVudF8xID0gcGFyZW50XzEucGFyZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgRGlzcGxheWFibGUucHJvdG90eXBlLmNvbnRhaW4gPSBmdW5jdGlvbiAoeCwgeSkge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWN0Q29udGFpbih4LCB5KTtcbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS50cmF2ZXJzZSA9IGZ1bmN0aW9uIChjYiwgY29udGV4dCkge1xuICAgICAgICBjYi5jYWxsKGNvbnRleHQsIHRoaXMpO1xuICAgIH07XG4gICAgRGlzcGxheWFibGUucHJvdG90eXBlLnJlY3RDb250YWluID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdmFyIGNvb3JkID0gdGhpcy50cmFuc2Zvcm1Db29yZFRvTG9jYWwoeCwgeSk7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5nZXRCb3VuZGluZ1JlY3QoKTtcbiAgICAgICAgcmV0dXJuIHJlY3QuY29udGFpbihjb29yZFswXSwgY29vcmRbMV0pO1xuICAgIH07XG4gICAgRGlzcGxheWFibGUucHJvdG90eXBlLmdldFBhaW50UmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLl9wYWludFJlY3Q7XG4gICAgICAgIGlmICghdGhpcy5fcGFpbnRSZWN0IHx8IHRoaXMuX19kaXJ0eSkge1xuICAgICAgICAgICAgdmFyIHRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtO1xuICAgICAgICAgICAgdmFyIGVsUmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdSZWN0KCk7XG4gICAgICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlO1xuICAgICAgICAgICAgdmFyIHNoYWRvd1NpemUgPSBzdHlsZS5zaGFkb3dCbHVyIHx8IDA7XG4gICAgICAgICAgICB2YXIgc2hhZG93T2Zmc2V0WCA9IHN0eWxlLnNoYWRvd09mZnNldFggfHwgMDtcbiAgICAgICAgICAgIHZhciBzaGFkb3dPZmZzZXRZID0gc3R5bGUuc2hhZG93T2Zmc2V0WSB8fCAwO1xuICAgICAgICAgICAgcmVjdCA9IHRoaXMuX3BhaW50UmVjdCB8fCAodGhpcy5fcGFpbnRSZWN0ID0gbmV3IEJvdW5kaW5nUmVjdCgwLCAwLCAwLCAwKSk7XG4gICAgICAgICAgICBpZiAodHJhbnNmb3JtKSB7XG4gICAgICAgICAgICAgICAgQm91bmRpbmdSZWN0LmFwcGx5VHJhbnNmb3JtKHJlY3QsIGVsUmVjdCwgdHJhbnNmb3JtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJlY3QuY29weShlbFJlY3QpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHNoYWRvd1NpemUgfHwgc2hhZG93T2Zmc2V0WCB8fCBzaGFkb3dPZmZzZXRZKSB7XG4gICAgICAgICAgICAgICAgcmVjdC53aWR0aCArPSBzaGFkb3dTaXplICogMiArIE1hdGguYWJzKHNoYWRvd09mZnNldFgpO1xuICAgICAgICAgICAgICAgIHJlY3QuaGVpZ2h0ICs9IHNoYWRvd1NpemUgKiAyICsgTWF0aC5hYnMoc2hhZG93T2Zmc2V0WSk7XG4gICAgICAgICAgICAgICAgcmVjdC54ID0gTWF0aC5taW4ocmVjdC54LCByZWN0LnggKyBzaGFkb3dPZmZzZXRYIC0gc2hhZG93U2l6ZSk7XG4gICAgICAgICAgICAgICAgcmVjdC55ID0gTWF0aC5taW4ocmVjdC55LCByZWN0LnkgKyBzaGFkb3dPZmZzZXRZIC0gc2hhZG93U2l6ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgdG9sZXJhbmNlID0gdGhpcy5kaXJ0eVJlY3RUb2xlcmFuY2U7XG4gICAgICAgICAgICBpZiAoIXJlY3QuaXNaZXJvKCkpIHtcbiAgICAgICAgICAgICAgICByZWN0LnggPSBNYXRoLmZsb29yKHJlY3QueCAtIHRvbGVyYW5jZSk7XG4gICAgICAgICAgICAgICAgcmVjdC55ID0gTWF0aC5mbG9vcihyZWN0LnkgLSB0b2xlcmFuY2UpO1xuICAgICAgICAgICAgICAgIHJlY3Qud2lkdGggPSBNYXRoLmNlaWwocmVjdC53aWR0aCArIDEgKyB0b2xlcmFuY2UgKiAyKTtcbiAgICAgICAgICAgICAgICByZWN0LmhlaWdodCA9IE1hdGguY2VpbChyZWN0LmhlaWdodCArIDEgKyB0b2xlcmFuY2UgKiAyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVjdDtcbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS5zZXRQcmV2UGFpbnRSZWN0ID0gZnVuY3Rpb24gKHBhaW50UmVjdCkge1xuICAgICAgICBpZiAocGFpbnRSZWN0KSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2UGFpbnRSZWN0ID0gdGhpcy5fcHJldlBhaW50UmVjdCB8fCBuZXcgQm91bmRpbmdSZWN0KDAsIDAsIDAsIDApO1xuICAgICAgICAgICAgdGhpcy5fcHJldlBhaW50UmVjdC5jb3B5KHBhaW50UmVjdCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9wcmV2UGFpbnRSZWN0ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRGlzcGxheWFibGUucHJvdG90eXBlLmdldFByZXZQYWludFJlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9wcmV2UGFpbnRSZWN0O1xuICAgIH07XG4gICAgRGlzcGxheWFibGUucHJvdG90eXBlLmFuaW1hdGVTdHlsZSA9IGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoJ3N0eWxlJywgbG9vcCk7XG4gICAgfTtcbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUudXBkYXRlRHVyaW5nQW5pbWF0aW9uID0gZnVuY3Rpb24gKHRhcmdldEtleSkge1xuICAgICAgICBpZiAodGFyZ2V0S2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICB0aGlzLmRpcnR5U3R5bGUoKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubWFya1JlZHJhdygpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUuYXR0cktWID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleSAhPT0gJ3N0eWxlJykge1xuICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hdHRyS1YuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5zdHlsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMudXNlU3R5bGUodmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdHlsZSh2YWx1ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS5zZXRTdHlsZSA9IGZ1bmN0aW9uIChrZXlPck9iaiwgdmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBrZXlPck9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVba2V5T3JPYmpdID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBleHRlbmQodGhpcy5zdHlsZSwga2V5T3JPYmopO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlydHlTdHlsZSgpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS5kaXJ0eVN0eWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLm1hcmtSZWRyYXcoKTtcbiAgICAgICAgdGhpcy5fX2RpcnR5IHw9IERpc3BsYXlhYmxlLlNUWUxFX0NIQU5HRURfQklUO1xuICAgICAgICBpZiAodGhpcy5fcmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fcmVjdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS5kaXJ0eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5kaXJ0eVN0eWxlKCk7XG4gICAgfTtcbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUuc3R5bGVDaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISEodGhpcy5fX2RpcnR5ICYgRGlzcGxheWFibGUuU1RZTEVfQ0hBTkdFRF9CSVQpO1xuICAgIH07XG4gICAgRGlzcGxheWFibGUucHJvdG90eXBlLnN0eWxlVXBkYXRlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fX2RpcnR5ICY9IH5EaXNwbGF5YWJsZS5TVFlMRV9DSEFOR0VEX0JJVDtcbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS5jcmVhdGVTdHlsZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU9iamVjdChERUZBVUxUX0NPTU1PTl9TVFlMRSwgb2JqKTtcbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS51c2VTdHlsZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgaWYgKCFvYmpbU1RZTEVfTUFHSUNfS0VZXSkge1xuICAgICAgICAgICAgb2JqID0gdGhpcy5jcmVhdGVTdHlsZShvYmopO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLl9faW5Ib3Zlcikge1xuICAgICAgICAgICAgdGhpcy5fX2hvdmVyU3R5bGUgPSBvYmo7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0eWxlID0gb2JqO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuZGlydHlTdHlsZSgpO1xuICAgIH07XG4gICAgRGlzcGxheWFibGUucHJvdG90eXBlLmlzU3R5bGVPYmplY3QgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBvYmpbU1RZTEVfTUFHSUNfS0VZXTtcbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS5faW5uZXJTYXZlVG9Ob3JtYWwgPSBmdW5jdGlvbiAodG9TdGF0ZSkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLl9pbm5lclNhdmVUb05vcm1hbC5jYWxsKHRoaXMsIHRvU3RhdGUpO1xuICAgICAgICB2YXIgbm9ybWFsU3RhdGUgPSB0aGlzLl9ub3JtYWxTdGF0ZTtcbiAgICAgICAgaWYgKHRvU3RhdGUuc3R5bGUgJiYgIW5vcm1hbFN0YXRlLnN0eWxlKSB7XG4gICAgICAgICAgICBub3JtYWxTdGF0ZS5zdHlsZSA9IHRoaXMuX21lcmdlU3R5bGUodGhpcy5jcmVhdGVTdHlsZSgpLCB0aGlzLnN0eWxlKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zYXZlUHJpbWFyeVRvTm9ybWFsKHRvU3RhdGUsIG5vcm1hbFN0YXRlLCBQUklNQVJZX1NUQVRFU19LRVlTKTtcbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLnByb3RvdHlwZS5fYXBwbHlTdGF0ZU9iaiA9IGZ1bmN0aW9uIChzdGF0ZU5hbWUsIHN0YXRlLCBub3JtYWxTdGF0ZSwga2VlcEN1cnJlbnRTdGF0ZXMsIHRyYW5zaXRpb24sIGFuaW1hdGlvbkNmZykge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLl9hcHBseVN0YXRlT2JqLmNhbGwodGhpcywgc3RhdGVOYW1lLCBzdGF0ZSwgbm9ybWFsU3RhdGUsIGtlZXBDdXJyZW50U3RhdGVzLCB0cmFuc2l0aW9uLCBhbmltYXRpb25DZmcpO1xuICAgICAgICB2YXIgbmVlZHNSZXN0b3JlVG9Ob3JtYWwgPSAhKHN0YXRlICYmIGtlZXBDdXJyZW50U3RhdGVzKTtcbiAgICAgICAgdmFyIHRhcmdldFN0eWxlO1xuICAgICAgICBpZiAoc3RhdGUgJiYgc3RhdGUuc3R5bGUpIHtcbiAgICAgICAgICAgIGlmICh0cmFuc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgaWYgKGtlZXBDdXJyZW50U3RhdGVzKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFN0eWxlID0gc3RhdGUuc3R5bGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXRTdHlsZSA9IHRoaXMuX21lcmdlU3R5bGUodGhpcy5jcmVhdGVTdHlsZSgpLCBub3JtYWxTdGF0ZS5zdHlsZSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX21lcmdlU3R5bGUodGFyZ2V0U3R5bGUsIHN0YXRlLnN0eWxlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRTdHlsZSA9IHRoaXMuX21lcmdlU3R5bGUodGhpcy5jcmVhdGVTdHlsZSgpLCBrZWVwQ3VycmVudFN0YXRlcyA/IHRoaXMuc3R5bGUgOiBub3JtYWxTdGF0ZS5zdHlsZSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVyZ2VTdHlsZSh0YXJnZXRTdHlsZSwgc3RhdGUuc3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKG5lZWRzUmVzdG9yZVRvTm9ybWFsKSB7XG4gICAgICAgICAgICB0YXJnZXRTdHlsZSA9IG5vcm1hbFN0YXRlLnN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXRTdHlsZSkge1xuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlU3R5bGUgPSB0aGlzLnN0eWxlO1xuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGUgPSB0aGlzLmNyZWF0ZVN0eWxlKG5lZWRzUmVzdG9yZVRvTm9ybWFsID8ge30gOiBzb3VyY2VTdHlsZSk7XG4gICAgICAgICAgICAgICAgaWYgKG5lZWRzUmVzdG9yZVRvTm9ybWFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGFuZ2VkS2V5cyA9IGtleXMoc291cmNlU3R5bGUpO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoYW5nZWRLZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gY2hhbmdlZEtleXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoa2V5IGluIHRhcmdldFN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U3R5bGVba2V5XSA9IHRhcmdldFN0eWxlW2tleV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZVtrZXldID0gc291cmNlU3R5bGVba2V5XTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0S2V5cyA9IGtleXModGFyZ2V0U3R5bGUpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGFyZ2V0S2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gdGFyZ2V0S2V5c1tpXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdHlsZVtrZXldID0gdGhpcy5zdHlsZVtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLl90cmFuc2l0aW9uU3RhdGUoc3RhdGVOYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlOiB0YXJnZXRTdHlsZVxuICAgICAgICAgICAgICAgIH0sIGFuaW1hdGlvbkNmZywgdGhpcy5nZXRBbmltYXRpb25TdHlsZVByb3BzKCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy51c2VTdHlsZSh0YXJnZXRTdHlsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBQUklNQVJZX1NUQVRFU19LRVlTLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gUFJJTUFSWV9TVEFURVNfS0VZU1tpXTtcbiAgICAgICAgICAgIGlmIChzdGF0ZSAmJiBzdGF0ZVtrZXldICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzW2tleV0gPSBzdGF0ZVtrZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAobmVlZHNSZXN0b3JlVG9Ob3JtYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAobm9ybWFsU3RhdGVba2V5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNba2V5XSA9IG5vcm1hbFN0YXRlW2tleV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUuX21lcmdlU3RhdGVzID0gZnVuY3Rpb24gKHN0YXRlcykge1xuICAgICAgICB2YXIgbWVyZ2VkU3RhdGUgPSBfc3VwZXIucHJvdG90eXBlLl9tZXJnZVN0YXRlcy5jYWxsKHRoaXMsIHN0YXRlcyk7XG4gICAgICAgIHZhciBtZXJnZWRTdHlsZTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdGF0ZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzdGF0ZSA9IHN0YXRlc1tpXTtcbiAgICAgICAgICAgIGlmIChzdGF0ZS5zdHlsZSkge1xuICAgICAgICAgICAgICAgIG1lcmdlZFN0eWxlID0gbWVyZ2VkU3R5bGUgfHwge307XG4gICAgICAgICAgICAgICAgdGhpcy5fbWVyZ2VTdHlsZShtZXJnZWRTdHlsZSwgc3RhdGUuc3R5bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmIChtZXJnZWRTdHlsZSkge1xuICAgICAgICAgICAgbWVyZ2VkU3RhdGUuc3R5bGUgPSBtZXJnZWRTdHlsZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbWVyZ2VkU3RhdGU7XG4gICAgfTtcbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUuX21lcmdlU3R5bGUgPSBmdW5jdGlvbiAodGFyZ2V0U3R5bGUsIHNvdXJjZVN0eWxlKSB7XG4gICAgICAgIGV4dGVuZCh0YXJnZXRTdHlsZSwgc291cmNlU3R5bGUpO1xuICAgICAgICByZXR1cm4gdGFyZ2V0U3R5bGU7XG4gICAgfTtcbiAgICBEaXNwbGF5YWJsZS5wcm90b3R5cGUuZ2V0QW5pbWF0aW9uU3R5bGVQcm9wcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIERFRkFVTFRfQ09NTU9OX0FOSU1BVElPTl9QUk9QUztcbiAgICB9O1xuICAgIERpc3BsYXlhYmxlLlNUWUxFX0NIQU5HRURfQklUID0gMjtcbiAgICBEaXNwbGF5YWJsZS5pbml0RGVmYXVsdFByb3BzID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGRpc3BQcm90byA9IERpc3BsYXlhYmxlLnByb3RvdHlwZTtcbiAgICAgICAgZGlzcFByb3RvLnR5cGUgPSAnZGlzcGxheWFibGUnO1xuICAgICAgICBkaXNwUHJvdG8uaW52aXNpYmxlID0gZmFsc2U7XG4gICAgICAgIGRpc3BQcm90by56ID0gMDtcbiAgICAgICAgZGlzcFByb3RvLnoyID0gMDtcbiAgICAgICAgZGlzcFByb3RvLnpsZXZlbCA9IDA7XG4gICAgICAgIGRpc3BQcm90by5jdWxsaW5nID0gZmFsc2U7XG4gICAgICAgIGRpc3BQcm90by5jdXJzb3IgPSAncG9pbnRlcic7XG4gICAgICAgIGRpc3BQcm90by5yZWN0SG92ZXIgPSBmYWxzZTtcbiAgICAgICAgZGlzcFByb3RvLmluY3JlbWVudGFsID0gZmFsc2U7XG4gICAgICAgIGRpc3BQcm90by5fcmVjdCA9IG51bGw7XG4gICAgICAgIGRpc3BQcm90by5kaXJ0eVJlY3RUb2xlcmFuY2UgPSAwO1xuICAgICAgICBkaXNwUHJvdG8uX19kaXJ0eSA9IEVsZW1lbnQuUkVEQVJBV19CSVQgfCBEaXNwbGF5YWJsZS5TVFlMRV9DSEFOR0VEX0JJVDtcbiAgICB9KSgpO1xuICAgIHJldHVybiBEaXNwbGF5YWJsZTtcbn0oRWxlbWVudCkpO1xudmFyIHRtcFJlY3QgPSBuZXcgQm91bmRpbmdSZWN0KDAsIDAsIDAsIDApO1xudmFyIHZpZXdSZWN0ID0gbmV3IEJvdW5kaW5nUmVjdCgwLCAwLCAwLCAwKTtcbmZ1bmN0aW9uIGlzRGlzcGxheWFibGVDdWxsZWQoZWwsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICB0bXBSZWN0LmNvcHkoZWwuZ2V0Qm91bmRpbmdSZWN0KCkpO1xuICAgIGlmIChlbC50cmFuc2Zvcm0pIHtcbiAgICAgICAgdG1wUmVjdC5hcHBseVRyYW5zZm9ybShlbC50cmFuc2Zvcm0pO1xuICAgIH1cbiAgICB2aWV3UmVjdC53aWR0aCA9IHdpZHRoO1xuICAgIHZpZXdSZWN0LmhlaWdodCA9IGhlaWdodDtcbiAgICByZXR1cm4gIXRtcFJlY3QuaW50ZXJzZWN0KHZpZXdSZWN0KTtcbn1cbmV4cG9ydCBkZWZhdWx0IERpc3BsYXlhYmxlO1xuIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgRGlzcGxheWFibGUsIHsgREVGQVVMVF9DT01NT05fU1RZTEUsIERFRkFVTFRfQ09NTU9OX0FOSU1BVElPTl9QUk9QUyB9IGZyb20gJy4vRGlzcGxheWFibGUnO1xuaW1wb3J0IEJvdW5kaW5nUmVjdCBmcm9tICcuLi9jb3JlL0JvdW5kaW5nUmVjdCc7XG5pbXBvcnQgeyBkZWZhdWx0cywgY3JlYXRlT2JqZWN0IH0gZnJvbSAnLi4vY29yZS91dGlsJztcbmV4cG9ydCB2YXIgREVGQVVMVF9JTUFHRV9TVFlMRSA9IGRlZmF1bHRzKHtcbiAgICB4OiAwLFxuICAgIHk6IDBcbn0sIERFRkFVTFRfQ09NTU9OX1NUWUxFKTtcbmV4cG9ydCB2YXIgREVGQVVMVF9JTUFHRV9BTklNQVRJT05fUFJPUFMgPSB7XG4gICAgc3R5bGU6IGRlZmF1bHRzKHtcbiAgICAgICAgeDogdHJ1ZSxcbiAgICAgICAgeTogdHJ1ZSxcbiAgICAgICAgd2lkdGg6IHRydWUsXG4gICAgICAgIGhlaWdodDogdHJ1ZSxcbiAgICAgICAgc3g6IHRydWUsXG4gICAgICAgIHN5OiB0cnVlLFxuICAgICAgICBzV2lkdGg6IHRydWUsXG4gICAgICAgIHNIZWlnaHQ6IHRydWVcbiAgICB9LCBERUZBVUxUX0NPTU1PTl9BTklNQVRJT05fUFJPUFMuc3R5bGUpXG59O1xuZnVuY3Rpb24gaXNJbWFnZUxpa2Uoc291cmNlKSB7XG4gICAgcmV0dXJuICEhKHNvdXJjZVxuICAgICAgICAmJiB0eXBlb2Ygc291cmNlICE9PSAnc3RyaW5nJ1xuICAgICAgICAmJiBzb3VyY2Uud2lkdGggJiYgc291cmNlLmhlaWdodCk7XG59XG52YXIgWlJJbWFnZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFpSSW1hZ2UsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gWlJJbWFnZSgpIHtcbiAgICAgICAgcmV0dXJuIF9zdXBlciAhPT0gbnVsbCAmJiBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBaUkltYWdlLnByb3RvdHlwZS5jcmVhdGVTdHlsZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU9iamVjdChERUZBVUxUX0lNQUdFX1NUWUxFLCBvYmopO1xuICAgIH07XG4gICAgWlJJbWFnZS5wcm90b3R5cGUuX2dldFNpemUgPSBmdW5jdGlvbiAoZGltKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGU7XG4gICAgICAgIHZhciBzaXplID0gc3R5bGVbZGltXTtcbiAgICAgICAgaWYgKHNpemUgIT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIHNpemU7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGltYWdlU291cmNlID0gaXNJbWFnZUxpa2Uoc3R5bGUuaW1hZ2UpXG4gICAgICAgICAgICA/IHN0eWxlLmltYWdlIDogdGhpcy5fX2ltYWdlO1xuICAgICAgICBpZiAoIWltYWdlU291cmNlKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICB2YXIgb3RoZXJEaW0gPSBkaW0gPT09ICd3aWR0aCcgPyAnaGVpZ2h0JyA6ICd3aWR0aCc7XG4gICAgICAgIHZhciBvdGhlckRpbVNpemUgPSBzdHlsZVtvdGhlckRpbV07XG4gICAgICAgIGlmIChvdGhlckRpbVNpemUgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGltYWdlU291cmNlW2RpbV07XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gaW1hZ2VTb3VyY2VbZGltXSAvIGltYWdlU291cmNlW290aGVyRGltXSAqIG90aGVyRGltU2l6ZTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgWlJJbWFnZS5wcm90b3R5cGUuZ2V0V2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nZXRTaXplKCd3aWR0aCcpO1xuICAgIH07XG4gICAgWlJJbWFnZS5wcm90b3R5cGUuZ2V0SGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ2V0U2l6ZSgnaGVpZ2h0Jyk7XG4gICAgfTtcbiAgICBaUkltYWdlLnByb3RvdHlwZS5nZXRBbmltYXRpb25TdHlsZVByb3BzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gREVGQVVMVF9JTUFHRV9BTklNQVRJT05fUFJPUFM7XG4gICAgfTtcbiAgICBaUkltYWdlLnByb3RvdHlwZS5nZXRCb3VuZGluZ1JlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGU7XG4gICAgICAgIGlmICghdGhpcy5fcmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fcmVjdCA9IG5ldyBCb3VuZGluZ1JlY3Qoc3R5bGUueCB8fCAwLCBzdHlsZS55IHx8IDAsIHRoaXMuZ2V0V2lkdGgoKSwgdGhpcy5nZXRIZWlnaHQoKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX3JlY3Q7XG4gICAgfTtcbiAgICByZXR1cm4gWlJJbWFnZTtcbn0oRGlzcGxheWFibGUpKTtcblpSSW1hZ2UucHJvdG90eXBlLnR5cGUgPSAnaW1hZ2UnO1xuZXhwb3J0IGRlZmF1bHQgWlJJbWFnZTtcbiIsImltcG9ydCB7IF9fZXh0ZW5kcyB9IGZyb20gXCJ0c2xpYlwiO1xuaW1wb3J0IERpc3BsYXlibGUgZnJvbSAnLi9EaXNwbGF5YWJsZSc7XG5pbXBvcnQgQm91bmRpbmdSZWN0IGZyb20gJy4uL2NvcmUvQm91bmRpbmdSZWN0JztcbnZhciBtID0gW107XG52YXIgSW5jcmVtZW50YWxEaXNwbGF5YWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEluY3JlbWVudGFsRGlzcGxheWFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gSW5jcmVtZW50YWxEaXNwbGF5YWJsZSgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgICAgIF90aGlzLm5vdENsZWFyID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuaW5jcmVtZW50YWwgPSB0cnVlO1xuICAgICAgICBfdGhpcy5fZGlzcGxheWFibGVzID0gW107XG4gICAgICAgIF90aGlzLl90ZW1wb3JhcnlEaXNwbGF5YWJsZXMgPSBbXTtcbiAgICAgICAgX3RoaXMuX2N1cnNvciA9IDA7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICB9XG4gICAgSW5jcmVtZW50YWxEaXNwbGF5YWJsZS5wcm90b3R5cGUudHJhdmVyc2UgPSBmdW5jdGlvbiAoY2IsIGNvbnRleHQpIHtcbiAgICAgICAgY2IuY2FsbChjb250ZXh0LCB0aGlzKTtcbiAgICB9O1xuICAgIEluY3JlbWVudGFsRGlzcGxheWFibGUucHJvdG90eXBlLnVzZVN0eWxlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnN0eWxlID0ge307XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbERpc3BsYXlhYmxlLnByb3RvdHlwZS5nZXRDdXJzb3IgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9jdXJzb3I7XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbERpc3BsYXlhYmxlLnByb3RvdHlwZS5pbm5lckFmdGVyQnJ1c2ggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IHRoaXMuX2Rpc3BsYXlhYmxlcy5sZW5ndGg7XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbERpc3BsYXlhYmxlLnByb3RvdHlwZS5jbGVhckRpc3BsYXlibGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9kaXNwbGF5YWJsZXMgPSBbXTtcbiAgICAgICAgdGhpcy5fdGVtcG9yYXJ5RGlzcGxheWFibGVzID0gW107XG4gICAgICAgIHRoaXMuX2N1cnNvciA9IDA7XG4gICAgICAgIHRoaXMubWFya1JlZHJhdygpO1xuICAgICAgICB0aGlzLm5vdENsZWFyID0gZmFsc2U7XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbERpc3BsYXlhYmxlLnByb3RvdHlwZS5jbGVhclRlbXBvcmFsRGlzcGxheWFibGVzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl90ZW1wb3JhcnlEaXNwbGF5YWJsZXMgPSBbXTtcbiAgICB9O1xuICAgIEluY3JlbWVudGFsRGlzcGxheWFibGUucHJvdG90eXBlLmFkZERpc3BsYXlhYmxlID0gZnVuY3Rpb24gKGRpc3BsYXlhYmxlLCBub3RQZXJzaXN0ZW50KSB7XG4gICAgICAgIGlmIChub3RQZXJzaXN0ZW50KSB7XG4gICAgICAgICAgICB0aGlzLl90ZW1wb3JhcnlEaXNwbGF5YWJsZXMucHVzaChkaXNwbGF5YWJsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLl9kaXNwbGF5YWJsZXMucHVzaChkaXNwbGF5YWJsZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXJrUmVkcmF3KCk7XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbERpc3BsYXlhYmxlLnByb3RvdHlwZS5hZGREaXNwbGF5YWJsZXMgPSBmdW5jdGlvbiAoZGlzcGxheWFibGVzLCBub3RQZXJzaXN0ZW50KSB7XG4gICAgICAgIG5vdFBlcnNpc3RlbnQgPSBub3RQZXJzaXN0ZW50IHx8IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRpc3BsYXlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdGhpcy5hZGREaXNwbGF5YWJsZShkaXNwbGF5YWJsZXNbaV0sIG5vdFBlcnNpc3RlbnQpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbERpc3BsYXlhYmxlLnByb3RvdHlwZS5nZXREaXNwbGF5YWJsZXMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kaXNwbGF5YWJsZXM7XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbERpc3BsYXlhYmxlLnByb3RvdHlwZS5nZXRUZW1wb3JhbERpc3BsYXlhYmxlcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RlbXBvcmFyeURpc3BsYXlhYmxlcztcbiAgICB9O1xuICAgIEluY3JlbWVudGFsRGlzcGxheWFibGUucHJvdG90eXBlLmVhY2hQZW5kaW5nRGlzcGxheWFibGUgPSBmdW5jdGlvbiAoY2IpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IHRoaXMuX2N1cnNvcjsgaSA8IHRoaXMuX2Rpc3BsYXlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2IgJiYgY2IodGhpcy5fZGlzcGxheWFibGVzW2ldKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuX3RlbXBvcmFyeURpc3BsYXlhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgY2IgJiYgY2IodGhpcy5fdGVtcG9yYXJ5RGlzcGxheWFibGVzW2ldKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgSW5jcmVtZW50YWxEaXNwbGF5YWJsZS5wcm90b3R5cGUudXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLnVwZGF0ZVRyYW5zZm9ybSgpO1xuICAgICAgICBmb3IgKHZhciBpID0gdGhpcy5fY3Vyc29yOyBpIDwgdGhpcy5fZGlzcGxheWFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGlzcGxheWFibGUgPSB0aGlzLl9kaXNwbGF5YWJsZXNbaV07XG4gICAgICAgICAgICBkaXNwbGF5YWJsZS5wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgZGlzcGxheWFibGUudXBkYXRlKCk7XG4gICAgICAgICAgICBkaXNwbGF5YWJsZS5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5fdGVtcG9yYXJ5RGlzcGxheWFibGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIgZGlzcGxheWFibGUgPSB0aGlzLl90ZW1wb3JhcnlEaXNwbGF5YWJsZXNbaV07XG4gICAgICAgICAgICBkaXNwbGF5YWJsZS5wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgZGlzcGxheWFibGUudXBkYXRlKCk7XG4gICAgICAgICAgICBkaXNwbGF5YWJsZS5wYXJlbnQgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBJbmNyZW1lbnRhbERpc3BsYXlhYmxlLnByb3RvdHlwZS5nZXRCb3VuZGluZ1JlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5fcmVjdCkge1xuICAgICAgICAgICAgdmFyIHJlY3QgPSBuZXcgQm91bmRpbmdSZWN0KEluZmluaXR5LCBJbmZpbml0eSwgLUluZmluaXR5LCAtSW5maW5pdHkpO1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kaXNwbGF5YWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlzcGxheWFibGUgPSB0aGlzLl9kaXNwbGF5YWJsZXNbaV07XG4gICAgICAgICAgICAgICAgdmFyIGNoaWxkUmVjdCA9IGRpc3BsYXlhYmxlLmdldEJvdW5kaW5nUmVjdCgpLmNsb25lKCk7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3BsYXlhYmxlLm5lZWRMb2NhbFRyYW5zZm9ybSgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUmVjdC5hcHBseVRyYW5zZm9ybShkaXNwbGF5YWJsZS5nZXRMb2NhbFRyYW5zZm9ybShtKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJlY3QudW5pb24oY2hpbGRSZWN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3JlY3QgPSByZWN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWN0O1xuICAgIH07XG4gICAgSW5jcmVtZW50YWxEaXNwbGF5YWJsZS5wcm90b3R5cGUuY29udGFpbiA9IGZ1bmN0aW9uICh4LCB5KSB7XG4gICAgICAgIHZhciBsb2NhbFBvcyA9IHRoaXMudHJhbnNmb3JtQ29vcmRUb0xvY2FsKHgsIHkpO1xuICAgICAgICB2YXIgcmVjdCA9IHRoaXMuZ2V0Qm91bmRpbmdSZWN0KCk7XG4gICAgICAgIGlmIChyZWN0LmNvbnRhaW4obG9jYWxQb3NbMF0sIGxvY2FsUG9zWzFdKSkge1xuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLl9kaXNwbGF5YWJsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgZGlzcGxheWFibGUgPSB0aGlzLl9kaXNwbGF5YWJsZXNbaV07XG4gICAgICAgICAgICAgICAgaWYgKGRpc3BsYXlhYmxlLmNvbnRhaW4oeCwgeSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBJbmNyZW1lbnRhbERpc3BsYXlhYmxlO1xufShEaXNwbGF5YmxlKSk7XG5leHBvcnQgZGVmYXVsdCBJbmNyZW1lbnRhbERpc3BsYXlhYmxlO1xuIiwiaW1wb3J0IHsgX19leHRlbmRzIH0gZnJvbSBcInRzbGliXCI7XG5pbXBvcnQgRGlzcGxheWFibGUsIHsgREVGQVVMVF9DT01NT05fU1RZTEUsIERFRkFVTFRfQ09NTU9OX0FOSU1BVElPTl9QUk9QUyB9IGZyb20gJy4vRGlzcGxheWFibGUnO1xuaW1wb3J0IEVsZW1lbnQgZnJvbSAnLi4vRWxlbWVudCc7XG5pbXBvcnQgUGF0aFByb3h5IGZyb20gJy4uL2NvcmUvUGF0aFByb3h5JztcbmltcG9ydCAqIGFzIHBhdGhDb250YWluIGZyb20gJy4uL2NvbnRhaW4vcGF0aCc7XG5pbXBvcnQgeyBkZWZhdWx0cywga2V5cywgZXh0ZW5kLCBjbG9uZSwgaXNTdHJpbmcsIGNyZWF0ZU9iamVjdCB9IGZyb20gJy4uL2NvcmUvdXRpbCc7XG5pbXBvcnQgeyBsdW0gfSBmcm9tICcuLi90b29sL2NvbG9yJztcbmltcG9ydCB7IERBUktfTEFCRUxfQ09MT1IsIExJR0hUX0xBQkVMX0NPTE9SLCBEQVJLX01PREVfVEhSRVNIT0xELCBMSUdIVEVSX0xBQkVMX0NPTE9SIH0gZnJvbSAnLi4vY29uZmlnJztcbmV4cG9ydCB2YXIgREVGQVVMVF9QQVRIX1NUWUxFID0gZGVmYXVsdHMoe1xuICAgIGZpbGw6ICcjMDAwJyxcbiAgICBzdHJva2U6IG51bGwsXG4gICAgc3Ryb2tlUGVyY2VudDogMSxcbiAgICBmaWxsT3BhY2l0eTogMSxcbiAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgIGxpbmVEYXNoT2Zmc2V0OiAwLFxuICAgIGxpbmVXaWR0aDogMSxcbiAgICBsaW5lQ2FwOiAnYnV0dCcsXG4gICAgbWl0ZXJMaW1pdDogMTAsXG4gICAgc3Ryb2tlTm9TY2FsZTogZmFsc2UsXG4gICAgc3Ryb2tlRmlyc3Q6IGZhbHNlXG59LCBERUZBVUxUX0NPTU1PTl9TVFlMRSk7XG5leHBvcnQgdmFyIERFRkFVTFRfUEFUSF9BTklNQVRJT05fUFJPUFMgPSB7XG4gICAgc3R5bGU6IGRlZmF1bHRzKHtcbiAgICAgICAgZmlsbDogdHJ1ZSxcbiAgICAgICAgc3Ryb2tlOiB0cnVlLFxuICAgICAgICBzdHJva2VQZXJjZW50OiB0cnVlLFxuICAgICAgICBmaWxsT3BhY2l0eTogdHJ1ZSxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogdHJ1ZSxcbiAgICAgICAgbGluZURhc2hPZmZzZXQ6IHRydWUsXG4gICAgICAgIGxpbmVXaWR0aDogdHJ1ZSxcbiAgICAgICAgbWl0ZXJMaW1pdDogdHJ1ZVxuICAgIH0sIERFRkFVTFRfQ09NTU9OX0FOSU1BVElPTl9QUk9QUy5zdHlsZSlcbn07XG52YXIgcGF0aENvcHlQYXJhbXMgPSBbXG4gICAgJ3gnLCAneScsICdyb3RhdGlvbicsICdzY2FsZVgnLCAnc2NhbGVZJywgJ29yaWdpblgnLCAnb3JpZ2luWScsICdpbnZpc2libGUnLFxuICAgICdjdWxsaW5nJywgJ3onLCAnejInLCAnemxldmVsJywgJ3BhcmVudCdcbl07XG52YXIgUGF0aCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFBhdGgsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUGF0aChvcHRzKSB7XG4gICAgICAgIHJldHVybiBfc3VwZXIuY2FsbCh0aGlzLCBvcHRzKSB8fCB0aGlzO1xuICAgIH1cbiAgICBQYXRoLnByb3RvdHlwZS51cGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUudXBkYXRlLmNhbGwodGhpcyk7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGU7XG4gICAgICAgIGlmIChzdHlsZS5kZWNhbCkge1xuICAgICAgICAgICAgdmFyIGRlY2FsRWwgPSB0aGlzLl9kZWNhbEVsXG4gICAgICAgICAgICAgICAgPSB0aGlzLl9kZWNhbEVsIHx8IG5ldyBQYXRoKCk7XG4gICAgICAgICAgICBpZiAoZGVjYWxFbC5idWlsZFBhdGggPT09IFBhdGgucHJvdG90eXBlLmJ1aWxkUGF0aCkge1xuICAgICAgICAgICAgICAgIGRlY2FsRWwuYnVpbGRQYXRoID0gZnVuY3Rpb24gKGN0eCkge1xuICAgICAgICAgICAgICAgICAgICBfdGhpcy5idWlsZFBhdGgoY3R4LCBfdGhpcy5zaGFwZSk7XG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlY2FsRWwuc2lsZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgIHZhciBkZWNhbEVsU3R5bGUgPSBkZWNhbEVsLnN0eWxlO1xuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHN0eWxlKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRlY2FsRWxTdHlsZVtrZXldICE9PSBzdHlsZVtrZXldKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlY2FsRWxTdHlsZVtrZXldID0gc3R5bGVba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWNhbEVsU3R5bGUuZmlsbCA9IHN0eWxlLmZpbGwgPyBzdHlsZS5kZWNhbCA6IG51bGw7XG4gICAgICAgICAgICBkZWNhbEVsU3R5bGUuZGVjYWwgPSBudWxsO1xuICAgICAgICAgICAgZGVjYWxFbFN0eWxlLnNoYWRvd0NvbG9yID0gbnVsbDtcbiAgICAgICAgICAgIHN0eWxlLnN0cm9rZUZpcnN0ICYmIChkZWNhbEVsU3R5bGUuc3Ryb2tlID0gbnVsbCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGhDb3B5UGFyYW1zLmxlbmd0aDsgKytpKSB7XG4gICAgICAgICAgICAgICAgZGVjYWxFbFtwYXRoQ29weVBhcmFtc1tpXV0gPSB0aGlzW3BhdGhDb3B5UGFyYW1zW2ldXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlY2FsRWwuX19kaXJ0eSB8PSBFbGVtZW50LlJFREFSQVdfQklUO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRoaXMuX2RlY2FsRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlY2FsRWwgPSBudWxsO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS5nZXREZWNhbEVsZW1lbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9kZWNhbEVsO1xuICAgIH07XG4gICAgUGF0aC5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAocHJvcHMpIHtcbiAgICAgICAgdmFyIGtleXNBcnIgPSBrZXlzKHByb3BzKTtcbiAgICAgICAgdGhpcy5zaGFwZSA9IHRoaXMuZ2V0RGVmYXVsdFNoYXBlKCk7XG4gICAgICAgIHZhciBkZWZhdWx0U3R5bGUgPSB0aGlzLmdldERlZmF1bHRTdHlsZSgpO1xuICAgICAgICBpZiAoZGVmYXVsdFN0eWxlKSB7XG4gICAgICAgICAgICB0aGlzLnVzZVN0eWxlKGRlZmF1bHRTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBrZXlzQXJyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0ga2V5c0FycltpXTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHByb3BzW2tleV07XG4gICAgICAgICAgICBpZiAoa2V5ID09PSAnc3R5bGUnKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLnN0eWxlKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXNlU3R5bGUodmFsdWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZXh0ZW5kKHRoaXMuc3R5bGUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChrZXkgPT09ICdzaGFwZScpIHtcbiAgICAgICAgICAgICAgICBleHRlbmQodGhpcy5zaGFwZSwgdmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgX3N1cGVyLnByb3RvdHlwZS5hdHRyS1YuY2FsbCh0aGlzLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoIXRoaXMuc3R5bGUpIHtcbiAgICAgICAgICAgIHRoaXMudXNlU3R5bGUoe30pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS5nZXREZWZhdWx0U3R5bGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH07XG4gICAgUGF0aC5wcm90b3R5cGUuZ2V0RGVmYXVsdFNoYXBlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4ge307XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS5jYW5CZUluc2lkZVRleHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhhc0ZpbGwoKTtcbiAgICB9O1xuICAgIFBhdGgucHJvdG90eXBlLmdldEluc2lkZVRleHRGaWxsID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGF0aEZpbGwgPSB0aGlzLnN0eWxlLmZpbGw7XG4gICAgICAgIGlmIChwYXRoRmlsbCAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBpZiAoaXNTdHJpbmcocGF0aEZpbGwpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGxMdW0gPSBsdW0ocGF0aEZpbGwsIDApO1xuICAgICAgICAgICAgICAgIGlmIChmaWxsTHVtID4gMC41KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBEQVJLX0xBQkVMX0NPTE9SO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIGlmIChmaWxsTHVtID4gMC4yKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBMSUdIVEVSX0xBQkVMX0NPTE9SO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICByZXR1cm4gTElHSFRfTEFCRUxfQ09MT1I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmIChwYXRoRmlsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBMSUdIVF9MQUJFTF9DT0xPUjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gREFSS19MQUJFTF9DT0xPUjtcbiAgICB9O1xuICAgIFBhdGgucHJvdG90eXBlLmdldEluc2lkZVRleHRTdHJva2UgPSBmdW5jdGlvbiAodGV4dEZpbGwpIHtcbiAgICAgICAgdmFyIHBhdGhGaWxsID0gdGhpcy5zdHlsZS5maWxsO1xuICAgICAgICBpZiAoaXNTdHJpbmcocGF0aEZpbGwpKSB7XG4gICAgICAgICAgICB2YXIgenIgPSB0aGlzLl9fenI7XG4gICAgICAgICAgICB2YXIgaXNEYXJrTW9kZSA9ICEhKHpyICYmIHpyLmlzRGFya01vZGUoKSk7XG4gICAgICAgICAgICB2YXIgaXNEYXJrTGFiZWwgPSBsdW0odGV4dEZpbGwsIDApIDwgREFSS19NT0RFX1RIUkVTSE9MRDtcbiAgICAgICAgICAgIGlmIChpc0RhcmtNb2RlID09PSBpc0RhcmtMYWJlbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwYXRoRmlsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgUGF0aC5wcm90b3R5cGUuYnVpbGRQYXRoID0gZnVuY3Rpb24gKGN0eCwgc2hhcGVDZmcsIGluQnVuZGxlKSB7IH07XG4gICAgUGF0aC5wcm90b3R5cGUucGF0aFVwZGF0ZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX19kaXJ0eSAmPSB+UGF0aC5TSEFQRV9DSEFOR0VEX0JJVDtcbiAgICB9O1xuICAgIFBhdGgucHJvdG90eXBlLmNyZWF0ZVBhdGhQcm94eSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5wYXRoID0gbmV3IFBhdGhQcm94eShmYWxzZSk7XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS5oYXNTdHJva2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGU7XG4gICAgICAgIHZhciBzdHJva2UgPSBzdHlsZS5zdHJva2U7XG4gICAgICAgIHJldHVybiAhKHN0cm9rZSA9PSBudWxsIHx8IHN0cm9rZSA9PT0gJ25vbmUnIHx8ICEoc3R5bGUubGluZVdpZHRoID4gMCkpO1xuICAgIH07XG4gICAgUGF0aC5wcm90b3R5cGUuaGFzRmlsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5zdHlsZTtcbiAgICAgICAgdmFyIGZpbGwgPSBzdHlsZS5maWxsO1xuICAgICAgICByZXR1cm4gZmlsbCAhPSBudWxsICYmIGZpbGwgIT09ICdub25lJztcbiAgICB9O1xuICAgIFBhdGgucHJvdG90eXBlLmdldEJvdW5kaW5nUmVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHJlY3QgPSB0aGlzLl9yZWN0O1xuICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLnN0eWxlO1xuICAgICAgICB2YXIgbmVlZHNVcGRhdGVSZWN0ID0gIXJlY3Q7XG4gICAgICAgIGlmIChuZWVkc1VwZGF0ZVJlY3QpIHtcbiAgICAgICAgICAgIHZhciBmaXJzdEludm9rZSA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBhdGgpIHtcbiAgICAgICAgICAgICAgICBmaXJzdEludm9rZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVQYXRoUHJveHkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwYXRoID0gdGhpcy5wYXRoO1xuICAgICAgICAgICAgaWYgKGZpcnN0SW52b2tlIHx8ICh0aGlzLl9fZGlydHkgJiBQYXRoLlNIQVBFX0NIQU5HRURfQklUKSkge1xuICAgICAgICAgICAgICAgIHBhdGguYmVnaW5QYXRoKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5idWlsZFBhdGgocGF0aCwgdGhpcy5zaGFwZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgIHRoaXMucGF0aFVwZGF0ZWQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlY3QgPSBwYXRoLmdldEJvdW5kaW5nUmVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX3JlY3QgPSByZWN0O1xuICAgICAgICBpZiAodGhpcy5oYXNTdHJva2UoKSAmJiB0aGlzLnBhdGggJiYgdGhpcy5wYXRoLmxlbigpID4gMCkge1xuICAgICAgICAgICAgdmFyIHJlY3RXaXRoU3Ryb2tlID0gdGhpcy5fcmVjdFdpdGhTdHJva2UgfHwgKHRoaXMuX3JlY3RXaXRoU3Ryb2tlID0gcmVjdC5jbG9uZSgpKTtcbiAgICAgICAgICAgIGlmICh0aGlzLl9fZGlydHkgfHwgbmVlZHNVcGRhdGVSZWN0KSB7XG4gICAgICAgICAgICAgICAgcmVjdFdpdGhTdHJva2UuY29weShyZWN0KTtcbiAgICAgICAgICAgICAgICB2YXIgbGluZVNjYWxlID0gc3R5bGUuc3Ryb2tlTm9TY2FsZSA/IHRoaXMuZ2V0TGluZVNjYWxlKCkgOiAxO1xuICAgICAgICAgICAgICAgIHZhciB3ID0gc3R5bGUubGluZVdpZHRoO1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNGaWxsKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHN0cm9rZUNvbnRhaW5UaHJlc2hvbGQgPSB0aGlzLnN0cm9rZUNvbnRhaW5UaHJlc2hvbGQ7XG4gICAgICAgICAgICAgICAgICAgIHcgPSBNYXRoLm1heCh3LCBzdHJva2VDb250YWluVGhyZXNob2xkID09IG51bGwgPyA0IDogc3Ryb2tlQ29udGFpblRocmVzaG9sZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChsaW5lU2NhbGUgPiAxZS0xMCkge1xuICAgICAgICAgICAgICAgICAgICByZWN0V2l0aFN0cm9rZS53aWR0aCArPSB3IC8gbGluZVNjYWxlO1xuICAgICAgICAgICAgICAgICAgICByZWN0V2l0aFN0cm9rZS5oZWlnaHQgKz0gdyAvIGxpbmVTY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgcmVjdFdpdGhTdHJva2UueCAtPSB3IC8gbGluZVNjYWxlIC8gMjtcbiAgICAgICAgICAgICAgICAgICAgcmVjdFdpdGhTdHJva2UueSAtPSB3IC8gbGluZVNjYWxlIC8gMjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVjdFdpdGhTdHJva2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlY3Q7XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS5jb250YWluID0gZnVuY3Rpb24gKHgsIHkpIHtcbiAgICAgICAgdmFyIGxvY2FsUG9zID0gdGhpcy50cmFuc2Zvcm1Db29yZFRvTG9jYWwoeCwgeSk7XG4gICAgICAgIHZhciByZWN0ID0gdGhpcy5nZXRCb3VuZGluZ1JlY3QoKTtcbiAgICAgICAgdmFyIHN0eWxlID0gdGhpcy5zdHlsZTtcbiAgICAgICAgeCA9IGxvY2FsUG9zWzBdO1xuICAgICAgICB5ID0gbG9jYWxQb3NbMV07XG4gICAgICAgIGlmIChyZWN0LmNvbnRhaW4oeCwgeSkpIHtcbiAgICAgICAgICAgIHZhciBwYXRoUHJveHkgPSB0aGlzLnBhdGg7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNTdHJva2UoKSkge1xuICAgICAgICAgICAgICAgIHZhciBsaW5lV2lkdGggPSBzdHlsZS5saW5lV2lkdGg7XG4gICAgICAgICAgICAgICAgdmFyIGxpbmVTY2FsZSA9IHN0eWxlLnN0cm9rZU5vU2NhbGUgPyB0aGlzLmdldExpbmVTY2FsZSgpIDogMTtcbiAgICAgICAgICAgICAgICBpZiAobGluZVNjYWxlID4gMWUtMTApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0ZpbGwoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGluZVdpZHRoID0gTWF0aC5tYXgobGluZVdpZHRoLCB0aGlzLnN0cm9rZUNvbnRhaW5UaHJlc2hvbGQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChwYXRoQ29udGFpbi5jb250YWluU3Ryb2tlKHBhdGhQcm94eSwgbGluZVdpZHRoIC8gbGluZVNjYWxlLCB4LCB5KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNGaWxsKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGF0aENvbnRhaW4uY29udGFpbihwYXRoUHJveHksIHgsIHkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuICAgIFBhdGgucHJvdG90eXBlLmRpcnR5U2hhcGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX19kaXJ0eSB8PSBQYXRoLlNIQVBFX0NIQU5HRURfQklUO1xuICAgICAgICBpZiAodGhpcy5fcmVjdCkge1xuICAgICAgICAgICAgdGhpcy5fcmVjdCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuX2RlY2FsRWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2RlY2FsRWwuZGlydHlTaGFwZSgpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFya1JlZHJhdygpO1xuICAgIH07XG4gICAgUGF0aC5wcm90b3R5cGUuZGlydHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuZGlydHlTdHlsZSgpO1xuICAgICAgICB0aGlzLmRpcnR5U2hhcGUoKTtcbiAgICB9O1xuICAgIFBhdGgucHJvdG90eXBlLmFuaW1hdGVTaGFwZSA9IGZ1bmN0aW9uIChsb29wKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFuaW1hdGUoJ3NoYXBlJywgbG9vcCk7XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS51cGRhdGVEdXJpbmdBbmltYXRpb24gPSBmdW5jdGlvbiAodGFyZ2V0S2V5KSB7XG4gICAgICAgIGlmICh0YXJnZXRLZXkgPT09ICdzdHlsZScpIHtcbiAgICAgICAgICAgIHRoaXMuZGlydHlTdHlsZSgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHRhcmdldEtleSA9PT0gJ3NoYXBlJykge1xuICAgICAgICAgICAgdGhpcy5kaXJ0eVNoYXBlKCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLm1hcmtSZWRyYXcoKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgUGF0aC5wcm90b3R5cGUuYXR0cktWID0gZnVuY3Rpb24gKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKGtleSA9PT0gJ3NoYXBlJykge1xuICAgICAgICAgICAgdGhpcy5zZXRTaGFwZSh2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBfc3VwZXIucHJvdG90eXBlLmF0dHJLVi5jYWxsKHRoaXMsIGtleSwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS5zZXRTaGFwZSA9IGZ1bmN0aW9uIChrZXlPck9iaiwgdmFsdWUpIHtcbiAgICAgICAgdmFyIHNoYXBlID0gdGhpcy5zaGFwZTtcbiAgICAgICAgaWYgKCFzaGFwZSkge1xuICAgICAgICAgICAgc2hhcGUgPSB0aGlzLnNoYXBlID0ge307XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiBrZXlPck9iaiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHNoYXBlW2tleU9yT2JqXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZXh0ZW5kKHNoYXBlLCBrZXlPck9iaik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5kaXJ0eVNoYXBlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgUGF0aC5wcm90b3R5cGUuc2hhcGVDaGFuZ2VkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gISEodGhpcy5fX2RpcnR5ICYgUGF0aC5TSEFQRV9DSEFOR0VEX0JJVCk7XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS5jcmVhdGVTdHlsZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZU9iamVjdChERUZBVUxUX1BBVEhfU1RZTEUsIG9iaik7XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS5faW5uZXJTYXZlVG9Ob3JtYWwgPSBmdW5jdGlvbiAodG9TdGF0ZSkge1xuICAgICAgICBfc3VwZXIucHJvdG90eXBlLl9pbm5lclNhdmVUb05vcm1hbC5jYWxsKHRoaXMsIHRvU3RhdGUpO1xuICAgICAgICB2YXIgbm9ybWFsU3RhdGUgPSB0aGlzLl9ub3JtYWxTdGF0ZTtcbiAgICAgICAgaWYgKHRvU3RhdGUuc2hhcGUgJiYgIW5vcm1hbFN0YXRlLnNoYXBlKSB7XG4gICAgICAgICAgICBub3JtYWxTdGF0ZS5zaGFwZSA9IGV4dGVuZCh7fSwgdGhpcy5zaGFwZSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIFBhdGgucHJvdG90eXBlLl9hcHBseVN0YXRlT2JqID0gZnVuY3Rpb24gKHN0YXRlTmFtZSwgc3RhdGUsIG5vcm1hbFN0YXRlLCBrZWVwQ3VycmVudFN0YXRlcywgdHJhbnNpdGlvbiwgYW5pbWF0aW9uQ2ZnKSB7XG4gICAgICAgIF9zdXBlci5wcm90b3R5cGUuX2FwcGx5U3RhdGVPYmouY2FsbCh0aGlzLCBzdGF0ZU5hbWUsIHN0YXRlLCBub3JtYWxTdGF0ZSwga2VlcEN1cnJlbnRTdGF0ZXMsIHRyYW5zaXRpb24sIGFuaW1hdGlvbkNmZyk7XG4gICAgICAgIHZhciBuZWVkc1Jlc3RvcmVUb05vcm1hbCA9ICEoc3RhdGUgJiYga2VlcEN1cnJlbnRTdGF0ZXMpO1xuICAgICAgICB2YXIgdGFyZ2V0U2hhcGU7XG4gICAgICAgIGlmIChzdGF0ZSAmJiBzdGF0ZS5zaGFwZSkge1xuICAgICAgICAgICAgaWYgKHRyYW5zaXRpb24pIHtcbiAgICAgICAgICAgICAgICBpZiAoa2VlcEN1cnJlbnRTdGF0ZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U2hhcGUgPSBzdGF0ZS5zaGFwZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFNoYXBlID0gZXh0ZW5kKHt9LCBub3JtYWxTdGF0ZS5zaGFwZSk7XG4gICAgICAgICAgICAgICAgICAgIGV4dGVuZCh0YXJnZXRTaGFwZSwgc3RhdGUuc2hhcGUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRhcmdldFNoYXBlID0gZXh0ZW5kKHt9LCBrZWVwQ3VycmVudFN0YXRlcyA/IHRoaXMuc2hhcGUgOiBub3JtYWxTdGF0ZS5zaGFwZSk7XG4gICAgICAgICAgICAgICAgZXh0ZW5kKHRhcmdldFNoYXBlLCBzdGF0ZS5zaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAobmVlZHNSZXN0b3JlVG9Ob3JtYWwpIHtcbiAgICAgICAgICAgIHRhcmdldFNoYXBlID0gbm9ybWFsU3RhdGUuc2hhcGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldFNoYXBlKSB7XG4gICAgICAgICAgICBpZiAodHJhbnNpdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuc2hhcGUgPSBleHRlbmQoe30sIHRoaXMuc2hhcGUpO1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXRTaGFwZVByaW1hcnlQcm9wcyA9IHt9O1xuICAgICAgICAgICAgICAgIHZhciBzaGFwZUtleXMgPSBrZXlzKHRhcmdldFNoYXBlKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHNoYXBlS2V5cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICB2YXIga2V5ID0gc2hhcGVLZXlzW2ldO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRhcmdldFNoYXBlW2tleV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNoYXBlW2tleV0gPSB0YXJnZXRTaGFwZVtrZXldO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0U2hhcGVQcmltYXJ5UHJvcHNba2V5XSA9IHRhcmdldFNoYXBlW2tleV07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5fdHJhbnNpdGlvblN0YXRlKHN0YXRlTmFtZSwge1xuICAgICAgICAgICAgICAgICAgICBzaGFwZTogdGFyZ2V0U2hhcGVQcmltYXJ5UHJvcHNcbiAgICAgICAgICAgICAgICB9LCBhbmltYXRpb25DZmcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zaGFwZSA9IHRhcmdldFNoYXBlO1xuICAgICAgICAgICAgICAgIHRoaXMuZGlydHlTaGFwZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICBQYXRoLnByb3RvdHlwZS5fbWVyZ2VTdGF0ZXMgPSBmdW5jdGlvbiAoc3RhdGVzKSB7XG4gICAgICAgIHZhciBtZXJnZWRTdGF0ZSA9IF9zdXBlci5wcm90b3R5cGUuX21lcmdlU3RhdGVzLmNhbGwodGhpcywgc3RhdGVzKTtcbiAgICAgICAgdmFyIG1lcmdlZFNoYXBlO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHN0YXRlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgdmFyIHN0YXRlID0gc3RhdGVzW2ldO1xuICAgICAgICAgICAgaWYgKHN0YXRlLnNoYXBlKSB7XG4gICAgICAgICAgICAgICAgbWVyZ2VkU2hhcGUgPSBtZXJnZWRTaGFwZSB8fCB7fTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tZXJnZVN0eWxlKG1lcmdlZFNoYXBlLCBzdGF0ZS5zaGFwZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1lcmdlZFNoYXBlKSB7XG4gICAgICAgICAgICBtZXJnZWRTdGF0ZS5zaGFwZSA9IG1lcmdlZFNoYXBlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBtZXJnZWRTdGF0ZTtcbiAgICB9O1xuICAgIFBhdGgucHJvdG90eXBlLmdldEFuaW1hdGlvblN0eWxlUHJvcHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBERUZBVUxUX1BBVEhfQU5JTUFUSU9OX1BST1BTO1xuICAgIH07XG4gICAgUGF0aC5wcm90b3R5cGUuaXNaZXJvQXJlYSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH07XG4gICAgUGF0aC5leHRlbmQgPSBmdW5jdGlvbiAoZGVmYXVsdFByb3BzKSB7XG4gICAgICAgIHZhciBTdWIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICAgICAgX19leHRlbmRzKFN1YiwgX3N1cGVyKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIFN1YihvcHRzKSB7XG4gICAgICAgICAgICAgICAgdmFyIF90aGlzID0gX3N1cGVyLmNhbGwodGhpcywgb3B0cykgfHwgdGhpcztcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvcHMuaW5pdCAmJiBkZWZhdWx0UHJvcHMuaW5pdC5jYWxsKF90aGlzLCBvcHRzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBTdWIucHJvdG90eXBlLmdldERlZmF1bHRTdHlsZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvbmUoZGVmYXVsdFByb3BzLnN0eWxlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBTdWIucHJvdG90eXBlLmdldERlZmF1bHRTaGFwZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2xvbmUoZGVmYXVsdFByb3BzLnNoYXBlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gU3ViO1xuICAgICAgICB9KFBhdGgpKTtcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGRlZmF1bHRQcm9wcykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBkZWZhdWx0UHJvcHNba2V5XSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIFN1Yi5wcm90b3R5cGVba2V5XSA9IGRlZmF1bHRQcm9wc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBTdWI7XG4gICAgfTtcbiAgICBQYXRoLlNIQVBFX0NIQU5HRURfQklUID0gNDtcbiAgICBQYXRoLmluaXREZWZhdWx0UHJvcHMgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGF0aFByb3RvID0gUGF0aC5wcm90b3R5cGU7XG4gICAgICAgIHBhdGhQcm90by50eXBlID0gJ3BhdGgnO1xuICAgICAgICBwYXRoUHJvdG8uc3Ryb2tlQ29udGFpblRocmVzaG9sZCA9IDU7XG4gICAgICAgIHBhdGhQcm90by5zZWdtZW50SWdub3JlVGhyZXNob2xkID0gMDtcbiAgICAgICAgcGF0aFByb3RvLnN1YlBpeGVsT3B0aW1pemUgPSBmYWxzZTtcbiAgICAgICAgcGF0aFByb3RvLmF1dG9CYXRjaCA9IGZhbHNlO1xuICAgICAgICBwYXRoUHJvdG8uX19kaXJ0eSA9IEVsZW1lbnQuUkVEQVJBV19CSVQgfCBEaXNwbGF5YWJsZS5TVFlMRV9DSEFOR0VEX0JJVCB8IFBhdGguU0hBUEVfQ0hBTkdFRF9CSVQ7XG4gICAgfSkoKTtcbiAgICByZXR1cm4gUGF0aDtcbn0oRGlzcGxheWFibGUpKTtcbmV4cG9ydCBkZWZhdWx0IFBhdGg7XG4iLCJpbXBvcnQgeyBfX2V4dGVuZHMgfSBmcm9tIFwidHNsaWJcIjtcbmltcG9ydCBEaXNwbGF5YWJsZSBmcm9tICcuL0Rpc3BsYXlhYmxlJztcbmltcG9ydCB7IGdldEJvdW5kaW5nUmVjdCwgREVGQVVMVF9GT05UIH0gZnJvbSAnLi4vY29udGFpbi90ZXh0JztcbmltcG9ydCB7IERFRkFVTFRfUEFUSF9TVFlMRSB9IGZyb20gJy4vUGF0aCc7XG5pbXBvcnQgeyBjcmVhdGVPYmplY3QsIGRlZmF1bHRzIH0gZnJvbSAnLi4vY29yZS91dGlsJztcbmV4cG9ydCB2YXIgREVGQVVMVF9UU1BBTl9TVFlMRSA9IGRlZmF1bHRzKHtcbiAgICBzdHJva2VGaXJzdDogdHJ1ZSxcbiAgICBmb250OiBERUZBVUxUX0ZPTlQsXG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIHRleHRBbGlnbjogJ2xlZnQnLFxuICAgIHRleHRCYXNlbGluZTogJ3RvcCcsXG4gICAgbWl0ZXJMaW1pdDogMlxufSwgREVGQVVMVF9QQVRIX1NUWUxFKTtcbnZhciBUU3BhbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFRTcGFuLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFRTcGFuKCkge1xuICAgICAgICByZXR1cm4gX3N1cGVyICE9PSBudWxsICYmIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IHRoaXM7XG4gICAgfVxuICAgIFRTcGFuLnByb3RvdHlwZS5oYXNTdHJva2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGU7XG4gICAgICAgIHZhciBzdHJva2UgPSBzdHlsZS5zdHJva2U7XG4gICAgICAgIHJldHVybiBzdHJva2UgIT0gbnVsbCAmJiBzdHJva2UgIT09ICdub25lJyAmJiBzdHlsZS5saW5lV2lkdGggPiAwO1xuICAgIH07XG4gICAgVFNwYW4ucHJvdG90eXBlLmhhc0ZpbGwgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGU7XG4gICAgICAgIHZhciBmaWxsID0gc3R5bGUuZmlsbDtcbiAgICAgICAgcmV0dXJuIGZpbGwgIT0gbnVsbCAmJiBmaWxsICE9PSAnbm9uZSc7XG4gICAgfTtcbiAgICBUU3Bhbi5wcm90b3R5cGUuY3JlYXRlU3R5bGUgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVPYmplY3QoREVGQVVMVF9UU1BBTl9TVFlMRSwgb2JqKTtcbiAgICB9O1xuICAgIFRTcGFuLnByb3RvdHlwZS5zZXRCb3VuZGluZ1JlY3QgPSBmdW5jdGlvbiAocmVjdCkge1xuICAgICAgICB0aGlzLl9yZWN0ID0gcmVjdDtcbiAgICB9O1xuICAgIFRTcGFuLnByb3RvdHlwZS5nZXRCb3VuZGluZ1JlY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdHlsZSA9IHRoaXMuc3R5bGU7XG4gICAgICAgIGlmICghdGhpcy5fcmVjdCkge1xuICAgICAgICAgICAgdmFyIHRleHQgPSBzdHlsZS50ZXh0O1xuICAgICAgICAgICAgdGV4dCAhPSBudWxsID8gKHRleHQgKz0gJycpIDogKHRleHQgPSAnJyk7XG4gICAgICAgICAgICB2YXIgcmVjdCA9IGdldEJvdW5kaW5nUmVjdCh0ZXh0LCBzdHlsZS5mb250LCBzdHlsZS50ZXh0QWxpZ24sIHN0eWxlLnRleHRCYXNlbGluZSk7XG4gICAgICAgICAgICByZWN0LnggKz0gc3R5bGUueCB8fCAwO1xuICAgICAgICAgICAgcmVjdC55ICs9IHN0eWxlLnkgfHwgMDtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1N0cm9rZSgpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHcgPSBzdHlsZS5saW5lV2lkdGg7XG4gICAgICAgICAgICAgICAgcmVjdC54IC09IHcgLyAyO1xuICAgICAgICAgICAgICAgIHJlY3QueSAtPSB3IC8gMjtcbiAgICAgICAgICAgICAgICByZWN0LndpZHRoICs9IHc7XG4gICAgICAgICAgICAgICAgcmVjdC5oZWlnaHQgKz0gdztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX3JlY3QgPSByZWN0O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9yZWN0O1xuICAgIH07XG4gICAgVFNwYW4uaW5pdERlZmF1bHRQcm9wcyA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0c3BhblByb3RvID0gVFNwYW4ucHJvdG90eXBlO1xuICAgICAgICB0c3BhblByb3RvLmRpcnR5UmVjdFRvbGVyYW5jZSA9IDEwO1xuICAgIH0pKCk7XG4gICAgcmV0dXJuIFRTcGFuO1xufShEaXNwbGF5YWJsZSkpO1xuVFNwYW4ucHJvdG90eXBlLnR5cGUgPSAndHNwYW4nO1xuZXhwb3J0IGRlZmF1bHQgVFNwYW47XG4iLCJpbXBvcnQgeyBpc0FycmF5LCBpc051bWJlciB9IGZyb20gJy4uLy4uL2NvcmUvdXRpbCc7XG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplTGluZURhc2gobGluZVR5cGUsIGxpbmVXaWR0aCkge1xuICAgIGlmICghbGluZVR5cGUgfHwgbGluZVR5cGUgPT09ICdzb2xpZCcgfHwgIShsaW5lV2lkdGggPiAwKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgbGluZVdpZHRoID0gbGluZVdpZHRoIHx8IDE7XG4gICAgcmV0dXJuIGxpbmVUeXBlID09PSAnZGFzaGVkJ1xuICAgICAgICA/IFs0ICogbGluZVdpZHRoLCAyICogbGluZVdpZHRoXVxuICAgICAgICA6IGxpbmVUeXBlID09PSAnZG90dGVkJ1xuICAgICAgICAgICAgPyBbbGluZVdpZHRoXVxuICAgICAgICAgICAgOiBpc051bWJlcihsaW5lVHlwZSlcbiAgICAgICAgICAgICAgICA/IFtsaW5lVHlwZV0gOiBpc0FycmF5KGxpbmVUeXBlKSA/IGxpbmVUeXBlIDogbnVsbDtcbn1cbiIsImltcG9ydCBMUlUgZnJvbSAnLi4vLi4vY29yZS9MUlUnO1xudmFyIGdsb2JhbEltYWdlQ2FjaGUgPSBuZXcgTFJVKDUwKTtcbmV4cG9ydCBmdW5jdGlvbiBmaW5kRXhpc3RJbWFnZShuZXdJbWFnZU9yU3JjKSB7XG4gICAgaWYgKHR5cGVvZiBuZXdJbWFnZU9yU3JjID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgY2FjaGVkSW1nT2JqID0gZ2xvYmFsSW1hZ2VDYWNoZS5nZXQobmV3SW1hZ2VPclNyYyk7XG4gICAgICAgIHJldHVybiBjYWNoZWRJbWdPYmogJiYgY2FjaGVkSW1nT2JqLmltYWdlO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG5ld0ltYWdlT3JTcmM7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZU9yVXBkYXRlSW1hZ2UobmV3SW1hZ2VPclNyYywgaW1hZ2UsIGhvc3RFbCwgb25sb2FkLCBjYlBheWxvYWQpIHtcbiAgICBpZiAoIW5ld0ltYWdlT3JTcmMpIHtcbiAgICAgICAgcmV0dXJuIGltYWdlO1xuICAgIH1cbiAgICBlbHNlIGlmICh0eXBlb2YgbmV3SW1hZ2VPclNyYyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgaWYgKChpbWFnZSAmJiBpbWFnZS5fX3pySW1hZ2VTcmMgPT09IG5ld0ltYWdlT3JTcmMpIHx8ICFob3N0RWwpIHtcbiAgICAgICAgICAgIHJldHVybiBpbWFnZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY2FjaGVkSW1nT2JqID0gZ2xvYmFsSW1hZ2VDYWNoZS5nZXQobmV3SW1hZ2VPclNyYyk7XG4gICAgICAgIHZhciBwZW5kaW5nV3JhcCA9IHsgaG9zdEVsOiBob3N0RWwsIGNiOiBvbmxvYWQsIGNiUGF5bG9hZDogY2JQYXlsb2FkIH07XG4gICAgICAgIGlmIChjYWNoZWRJbWdPYmopIHtcbiAgICAgICAgICAgIGltYWdlID0gY2FjaGVkSW1nT2JqLmltYWdlO1xuICAgICAgICAgICAgIWlzSW1hZ2VSZWFkeShpbWFnZSkgJiYgY2FjaGVkSW1nT2JqLnBlbmRpbmcucHVzaChwZW5kaW5nV3JhcCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgICAgICAgICAgaW1hZ2Uub25sb2FkID0gaW1hZ2Uub25lcnJvciA9IGltYWdlT25Mb2FkO1xuICAgICAgICAgICAgZ2xvYmFsSW1hZ2VDYWNoZS5wdXQobmV3SW1hZ2VPclNyYywgaW1hZ2UuX19jYWNoZWRJbWdPYmogPSB7XG4gICAgICAgICAgICAgICAgaW1hZ2U6IGltYWdlLFxuICAgICAgICAgICAgICAgIHBlbmRpbmc6IFtwZW5kaW5nV3JhcF1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaW1hZ2Uuc3JjID0gaW1hZ2UuX196ckltYWdlU3JjID0gbmV3SW1hZ2VPclNyYztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW1hZ2U7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICByZXR1cm4gbmV3SW1hZ2VPclNyYztcbiAgICB9XG59XG5mdW5jdGlvbiBpbWFnZU9uTG9hZCgpIHtcbiAgICB2YXIgY2FjaGVkSW1nT2JqID0gdGhpcy5fX2NhY2hlZEltZ09iajtcbiAgICB0aGlzLm9ubG9hZCA9IHRoaXMub25lcnJvciA9IHRoaXMuX19jYWNoZWRJbWdPYmogPSBudWxsO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2FjaGVkSW1nT2JqLnBlbmRpbmcubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHBlbmRpbmdXcmFwID0gY2FjaGVkSW1nT2JqLnBlbmRpbmdbaV07XG4gICAgICAgIHZhciBjYiA9IHBlbmRpbmdXcmFwLmNiO1xuICAgICAgICBjYiAmJiBjYih0aGlzLCBwZW5kaW5nV3JhcC5jYlBheWxvYWQpO1xuICAgICAgICBwZW5kaW5nV3JhcC5ob3N0RWwuZGlydHkoKTtcbiAgICB9XG4gICAgY2FjaGVkSW1nT2JqLnBlbmRpbmcubGVuZ3RoID0gMDtcbn1cbmV4cG9ydCBmdW5jdGlvbiBpc0ltYWdlUmVhZHkoaW1hZ2UpIHtcbiAgICByZXR1cm4gaW1hZ2UgJiYgaW1hZ2Uud2lkdGggJiYgaW1hZ2UuaGVpZ2h0O1xufVxuIiwiaW1wb3J0IExSVSBmcm9tICcuLi9jb3JlL0xSVSc7XG52YXIga0NTU0NvbG9yVGFibGUgPSB7XG4gICAgJ3RyYW5zcGFyZW50JzogWzAsIDAsIDAsIDBdLCAnYWxpY2VibHVlJzogWzI0MCwgMjQ4LCAyNTUsIDFdLFxuICAgICdhbnRpcXVld2hpdGUnOiBbMjUwLCAyMzUsIDIxNSwgMV0sICdhcXVhJzogWzAsIDI1NSwgMjU1LCAxXSxcbiAgICAnYXF1YW1hcmluZSc6IFsxMjcsIDI1NSwgMjEyLCAxXSwgJ2F6dXJlJzogWzI0MCwgMjU1LCAyNTUsIDFdLFxuICAgICdiZWlnZSc6IFsyNDUsIDI0NSwgMjIwLCAxXSwgJ2Jpc3F1ZSc6IFsyNTUsIDIyOCwgMTk2LCAxXSxcbiAgICAnYmxhY2snOiBbMCwgMCwgMCwgMV0sICdibGFuY2hlZGFsbW9uZCc6IFsyNTUsIDIzNSwgMjA1LCAxXSxcbiAgICAnYmx1ZSc6IFswLCAwLCAyNTUsIDFdLCAnYmx1ZXZpb2xldCc6IFsxMzgsIDQzLCAyMjYsIDFdLFxuICAgICdicm93bic6IFsxNjUsIDQyLCA0MiwgMV0sICdidXJseXdvb2QnOiBbMjIyLCAxODQsIDEzNSwgMV0sXG4gICAgJ2NhZGV0Ymx1ZSc6IFs5NSwgMTU4LCAxNjAsIDFdLCAnY2hhcnRyZXVzZSc6IFsxMjcsIDI1NSwgMCwgMV0sXG4gICAgJ2Nob2NvbGF0ZSc6IFsyMTAsIDEwNSwgMzAsIDFdLCAnY29yYWwnOiBbMjU1LCAxMjcsIDgwLCAxXSxcbiAgICAnY29ybmZsb3dlcmJsdWUnOiBbMTAwLCAxNDksIDIzNywgMV0sICdjb3Juc2lsayc6IFsyNTUsIDI0OCwgMjIwLCAxXSxcbiAgICAnY3JpbXNvbic6IFsyMjAsIDIwLCA2MCwgMV0sICdjeWFuJzogWzAsIDI1NSwgMjU1LCAxXSxcbiAgICAnZGFya2JsdWUnOiBbMCwgMCwgMTM5LCAxXSwgJ2RhcmtjeWFuJzogWzAsIDEzOSwgMTM5LCAxXSxcbiAgICAnZGFya2dvbGRlbnJvZCc6IFsxODQsIDEzNCwgMTEsIDFdLCAnZGFya2dyYXknOiBbMTY5LCAxNjksIDE2OSwgMV0sXG4gICAgJ2RhcmtncmVlbic6IFswLCAxMDAsIDAsIDFdLCAnZGFya2dyZXknOiBbMTY5LCAxNjksIDE2OSwgMV0sXG4gICAgJ2RhcmtraGFraSc6IFsxODksIDE4MywgMTA3LCAxXSwgJ2RhcmttYWdlbnRhJzogWzEzOSwgMCwgMTM5LCAxXSxcbiAgICAnZGFya29saXZlZ3JlZW4nOiBbODUsIDEwNywgNDcsIDFdLCAnZGFya29yYW5nZSc6IFsyNTUsIDE0MCwgMCwgMV0sXG4gICAgJ2RhcmtvcmNoaWQnOiBbMTUzLCA1MCwgMjA0LCAxXSwgJ2RhcmtyZWQnOiBbMTM5LCAwLCAwLCAxXSxcbiAgICAnZGFya3NhbG1vbic6IFsyMzMsIDE1MCwgMTIyLCAxXSwgJ2RhcmtzZWFncmVlbic6IFsxNDMsIDE4OCwgMTQzLCAxXSxcbiAgICAnZGFya3NsYXRlYmx1ZSc6IFs3MiwgNjEsIDEzOSwgMV0sICdkYXJrc2xhdGVncmF5JzogWzQ3LCA3OSwgNzksIDFdLFxuICAgICdkYXJrc2xhdGVncmV5JzogWzQ3LCA3OSwgNzksIDFdLCAnZGFya3R1cnF1b2lzZSc6IFswLCAyMDYsIDIwOSwgMV0sXG4gICAgJ2Rhcmt2aW9sZXQnOiBbMTQ4LCAwLCAyMTEsIDFdLCAnZGVlcHBpbmsnOiBbMjU1LCAyMCwgMTQ3LCAxXSxcbiAgICAnZGVlcHNreWJsdWUnOiBbMCwgMTkxLCAyNTUsIDFdLCAnZGltZ3JheSc6IFsxMDUsIDEwNSwgMTA1LCAxXSxcbiAgICAnZGltZ3JleSc6IFsxMDUsIDEwNSwgMTA1LCAxXSwgJ2RvZGdlcmJsdWUnOiBbMzAsIDE0NCwgMjU1LCAxXSxcbiAgICAnZmlyZWJyaWNrJzogWzE3OCwgMzQsIDM0LCAxXSwgJ2Zsb3JhbHdoaXRlJzogWzI1NSwgMjUwLCAyNDAsIDFdLFxuICAgICdmb3Jlc3RncmVlbic6IFszNCwgMTM5LCAzNCwgMV0sICdmdWNoc2lhJzogWzI1NSwgMCwgMjU1LCAxXSxcbiAgICAnZ2FpbnNib3JvJzogWzIyMCwgMjIwLCAyMjAsIDFdLCAnZ2hvc3R3aGl0ZSc6IFsyNDgsIDI0OCwgMjU1LCAxXSxcbiAgICAnZ29sZCc6IFsyNTUsIDIxNSwgMCwgMV0sICdnb2xkZW5yb2QnOiBbMjE4LCAxNjUsIDMyLCAxXSxcbiAgICAnZ3JheSc6IFsxMjgsIDEyOCwgMTI4LCAxXSwgJ2dyZWVuJzogWzAsIDEyOCwgMCwgMV0sXG4gICAgJ2dyZWVueWVsbG93JzogWzE3MywgMjU1LCA0NywgMV0sICdncmV5JzogWzEyOCwgMTI4LCAxMjgsIDFdLFxuICAgICdob25leWRldyc6IFsyNDAsIDI1NSwgMjQwLCAxXSwgJ2hvdHBpbmsnOiBbMjU1LCAxMDUsIDE4MCwgMV0sXG4gICAgJ2luZGlhbnJlZCc6IFsyMDUsIDkyLCA5MiwgMV0sICdpbmRpZ28nOiBbNzUsIDAsIDEzMCwgMV0sXG4gICAgJ2l2b3J5JzogWzI1NSwgMjU1LCAyNDAsIDFdLCAna2hha2knOiBbMjQwLCAyMzAsIDE0MCwgMV0sXG4gICAgJ2xhdmVuZGVyJzogWzIzMCwgMjMwLCAyNTAsIDFdLCAnbGF2ZW5kZXJibHVzaCc6IFsyNTUsIDI0MCwgMjQ1LCAxXSxcbiAgICAnbGF3bmdyZWVuJzogWzEyNCwgMjUyLCAwLCAxXSwgJ2xlbW9uY2hpZmZvbic6IFsyNTUsIDI1MCwgMjA1LCAxXSxcbiAgICAnbGlnaHRibHVlJzogWzE3MywgMjE2LCAyMzAsIDFdLCAnbGlnaHRjb3JhbCc6IFsyNDAsIDEyOCwgMTI4LCAxXSxcbiAgICAnbGlnaHRjeWFuJzogWzIyNCwgMjU1LCAyNTUsIDFdLCAnbGlnaHRnb2xkZW5yb2R5ZWxsb3cnOiBbMjUwLCAyNTAsIDIxMCwgMV0sXG4gICAgJ2xpZ2h0Z3JheSc6IFsyMTEsIDIxMSwgMjExLCAxXSwgJ2xpZ2h0Z3JlZW4nOiBbMTQ0LCAyMzgsIDE0NCwgMV0sXG4gICAgJ2xpZ2h0Z3JleSc6IFsyMTEsIDIxMSwgMjExLCAxXSwgJ2xpZ2h0cGluayc6IFsyNTUsIDE4MiwgMTkzLCAxXSxcbiAgICAnbGlnaHRzYWxtb24nOiBbMjU1LCAxNjAsIDEyMiwgMV0sICdsaWdodHNlYWdyZWVuJzogWzMyLCAxNzgsIDE3MCwgMV0sXG4gICAgJ2xpZ2h0c2t5Ymx1ZSc6IFsxMzUsIDIwNiwgMjUwLCAxXSwgJ2xpZ2h0c2xhdGVncmF5JzogWzExOSwgMTM2LCAxNTMsIDFdLFxuICAgICdsaWdodHNsYXRlZ3JleSc6IFsxMTksIDEzNiwgMTUzLCAxXSwgJ2xpZ2h0c3RlZWxibHVlJzogWzE3NiwgMTk2LCAyMjIsIDFdLFxuICAgICdsaWdodHllbGxvdyc6IFsyNTUsIDI1NSwgMjI0LCAxXSwgJ2xpbWUnOiBbMCwgMjU1LCAwLCAxXSxcbiAgICAnbGltZWdyZWVuJzogWzUwLCAyMDUsIDUwLCAxXSwgJ2xpbmVuJzogWzI1MCwgMjQwLCAyMzAsIDFdLFxuICAgICdtYWdlbnRhJzogWzI1NSwgMCwgMjU1LCAxXSwgJ21hcm9vbic6IFsxMjgsIDAsIDAsIDFdLFxuICAgICdtZWRpdW1hcXVhbWFyaW5lJzogWzEwMiwgMjA1LCAxNzAsIDFdLCAnbWVkaXVtYmx1ZSc6IFswLCAwLCAyMDUsIDFdLFxuICAgICdtZWRpdW1vcmNoaWQnOiBbMTg2LCA4NSwgMjExLCAxXSwgJ21lZGl1bXB1cnBsZSc6IFsxNDcsIDExMiwgMjE5LCAxXSxcbiAgICAnbWVkaXVtc2VhZ3JlZW4nOiBbNjAsIDE3OSwgMTEzLCAxXSwgJ21lZGl1bXNsYXRlYmx1ZSc6IFsxMjMsIDEwNCwgMjM4LCAxXSxcbiAgICAnbWVkaXVtc3ByaW5nZ3JlZW4nOiBbMCwgMjUwLCAxNTQsIDFdLCAnbWVkaXVtdHVycXVvaXNlJzogWzcyLCAyMDksIDIwNCwgMV0sXG4gICAgJ21lZGl1bXZpb2xldHJlZCc6IFsxOTksIDIxLCAxMzMsIDFdLCAnbWlkbmlnaHRibHVlJzogWzI1LCAyNSwgMTEyLCAxXSxcbiAgICAnbWludGNyZWFtJzogWzI0NSwgMjU1LCAyNTAsIDFdLCAnbWlzdHlyb3NlJzogWzI1NSwgMjI4LCAyMjUsIDFdLFxuICAgICdtb2NjYXNpbic6IFsyNTUsIDIyOCwgMTgxLCAxXSwgJ25hdmFqb3doaXRlJzogWzI1NSwgMjIyLCAxNzMsIDFdLFxuICAgICduYXZ5JzogWzAsIDAsIDEyOCwgMV0sICdvbGRsYWNlJzogWzI1MywgMjQ1LCAyMzAsIDFdLFxuICAgICdvbGl2ZSc6IFsxMjgsIDEyOCwgMCwgMV0sICdvbGl2ZWRyYWInOiBbMTA3LCAxNDIsIDM1LCAxXSxcbiAgICAnb3JhbmdlJzogWzI1NSwgMTY1LCAwLCAxXSwgJ29yYW5nZXJlZCc6IFsyNTUsIDY5LCAwLCAxXSxcbiAgICAnb3JjaGlkJzogWzIxOCwgMTEyLCAyMTQsIDFdLCAncGFsZWdvbGRlbnJvZCc6IFsyMzgsIDIzMiwgMTcwLCAxXSxcbiAgICAncGFsZWdyZWVuJzogWzE1MiwgMjUxLCAxNTIsIDFdLCAncGFsZXR1cnF1b2lzZSc6IFsxNzUsIDIzOCwgMjM4LCAxXSxcbiAgICAncGFsZXZpb2xldHJlZCc6IFsyMTksIDExMiwgMTQ3LCAxXSwgJ3BhcGF5YXdoaXAnOiBbMjU1LCAyMzksIDIxMywgMV0sXG4gICAgJ3BlYWNocHVmZic6IFsyNTUsIDIxOCwgMTg1LCAxXSwgJ3BlcnUnOiBbMjA1LCAxMzMsIDYzLCAxXSxcbiAgICAncGluayc6IFsyNTUsIDE5MiwgMjAzLCAxXSwgJ3BsdW0nOiBbMjIxLCAxNjAsIDIyMSwgMV0sXG4gICAgJ3Bvd2RlcmJsdWUnOiBbMTc2LCAyMjQsIDIzMCwgMV0sICdwdXJwbGUnOiBbMTI4LCAwLCAxMjgsIDFdLFxuICAgICdyZWQnOiBbMjU1LCAwLCAwLCAxXSwgJ3Jvc3licm93bic6IFsxODgsIDE0MywgMTQzLCAxXSxcbiAgICAncm95YWxibHVlJzogWzY1LCAxMDUsIDIyNSwgMV0sICdzYWRkbGVicm93bic6IFsxMzksIDY5LCAxOSwgMV0sXG4gICAgJ3NhbG1vbic6IFsyNTAsIDEyOCwgMTE0LCAxXSwgJ3NhbmR5YnJvd24nOiBbMjQ0LCAxNjQsIDk2LCAxXSxcbiAgICAnc2VhZ3JlZW4nOiBbNDYsIDEzOSwgODcsIDFdLCAnc2Vhc2hlbGwnOiBbMjU1LCAyNDUsIDIzOCwgMV0sXG4gICAgJ3NpZW5uYSc6IFsxNjAsIDgyLCA0NSwgMV0sICdzaWx2ZXInOiBbMTkyLCAxOTIsIDE5MiwgMV0sXG4gICAgJ3NreWJsdWUnOiBbMTM1LCAyMDYsIDIzNSwgMV0sICdzbGF0ZWJsdWUnOiBbMTA2LCA5MCwgMjA1LCAxXSxcbiAgICAnc2xhdGVncmF5JzogWzExMiwgMTI4LCAxNDQsIDFdLCAnc2xhdGVncmV5JzogWzExMiwgMTI4LCAxNDQsIDFdLFxuICAgICdzbm93JzogWzI1NSwgMjUwLCAyNTAsIDFdLCAnc3ByaW5nZ3JlZW4nOiBbMCwgMjU1LCAxMjcsIDFdLFxuICAgICdzdGVlbGJsdWUnOiBbNzAsIDEzMCwgMTgwLCAxXSwgJ3Rhbic6IFsyMTAsIDE4MCwgMTQwLCAxXSxcbiAgICAndGVhbCc6IFswLCAxMjgsIDEyOCwgMV0sICd0aGlzdGxlJzogWzIxNiwgMTkxLCAyMTYsIDFdLFxuICAgICd0b21hdG8nOiBbMjU1LCA5OSwgNzEsIDFdLCAndHVycXVvaXNlJzogWzY0LCAyMjQsIDIwOCwgMV0sXG4gICAgJ3Zpb2xldCc6IFsyMzgsIDEzMCwgMjM4LCAxXSwgJ3doZWF0JzogWzI0NSwgMjIyLCAxNzksIDFdLFxuICAgICd3aGl0ZSc6IFsyNTUsIDI1NSwgMjU1LCAxXSwgJ3doaXRlc21va2UnOiBbMjQ1LCAyNDUsIDI0NSwgMV0sXG4gICAgJ3llbGxvdyc6IFsyNTUsIDI1NSwgMCwgMV0sICd5ZWxsb3dncmVlbic6IFsxNTQsIDIwNSwgNTAsIDFdXG59O1xuZnVuY3Rpb24gY2xhbXBDc3NCeXRlKGkpIHtcbiAgICBpID0gTWF0aC5yb3VuZChpKTtcbiAgICByZXR1cm4gaSA8IDAgPyAwIDogaSA+IDI1NSA/IDI1NSA6IGk7XG59XG5mdW5jdGlvbiBjbGFtcENzc0FuZ2xlKGkpIHtcbiAgICBpID0gTWF0aC5yb3VuZChpKTtcbiAgICByZXR1cm4gaSA8IDAgPyAwIDogaSA+IDM2MCA/IDM2MCA6IGk7XG59XG5mdW5jdGlvbiBjbGFtcENzc0Zsb2F0KGYpIHtcbiAgICByZXR1cm4gZiA8IDAgPyAwIDogZiA+IDEgPyAxIDogZjtcbn1cbmZ1bmN0aW9uIHBhcnNlQ3NzSW50KHZhbCkge1xuICAgIHZhciBzdHIgPSB2YWw7XG4gICAgaWYgKHN0ci5sZW5ndGggJiYgc3RyLmNoYXJBdChzdHIubGVuZ3RoIC0gMSkgPT09ICclJykge1xuICAgICAgICByZXR1cm4gY2xhbXBDc3NCeXRlKHBhcnNlRmxvYXQoc3RyKSAvIDEwMCAqIDI1NSk7XG4gICAgfVxuICAgIHJldHVybiBjbGFtcENzc0J5dGUocGFyc2VJbnQoc3RyLCAxMCkpO1xufVxuZnVuY3Rpb24gcGFyc2VDc3NGbG9hdCh2YWwpIHtcbiAgICB2YXIgc3RyID0gdmFsO1xuICAgIGlmIChzdHIubGVuZ3RoICYmIHN0ci5jaGFyQXQoc3RyLmxlbmd0aCAtIDEpID09PSAnJScpIHtcbiAgICAgICAgcmV0dXJuIGNsYW1wQ3NzRmxvYXQocGFyc2VGbG9hdChzdHIpIC8gMTAwKTtcbiAgICB9XG4gICAgcmV0dXJuIGNsYW1wQ3NzRmxvYXQocGFyc2VGbG9hdChzdHIpKTtcbn1cbmZ1bmN0aW9uIGNzc0h1ZVRvUmdiKG0xLCBtMiwgaCkge1xuICAgIGlmIChoIDwgMCkge1xuICAgICAgICBoICs9IDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGggPiAxKSB7XG4gICAgICAgIGggLT0gMTtcbiAgICB9XG4gICAgaWYgKGggKiA2IDwgMSkge1xuICAgICAgICByZXR1cm4gbTEgKyAobTIgLSBtMSkgKiBoICogNjtcbiAgICB9XG4gICAgaWYgKGggKiAyIDwgMSkge1xuICAgICAgICByZXR1cm4gbTI7XG4gICAgfVxuICAgIGlmIChoICogMyA8IDIpIHtcbiAgICAgICAgcmV0dXJuIG0xICsgKG0yIC0gbTEpICogKDIgLyAzIC0gaCkgKiA2O1xuICAgIH1cbiAgICByZXR1cm4gbTE7XG59XG5mdW5jdGlvbiBsZXJwTnVtYmVyKGEsIGIsIHApIHtcbiAgICByZXR1cm4gYSArIChiIC0gYSkgKiBwO1xufVxuZnVuY3Rpb24gc2V0UmdiYShvdXQsIHIsIGcsIGIsIGEpIHtcbiAgICBvdXRbMF0gPSByO1xuICAgIG91dFsxXSA9IGc7XG4gICAgb3V0WzJdID0gYjtcbiAgICBvdXRbM10gPSBhO1xuICAgIHJldHVybiBvdXQ7XG59XG5mdW5jdGlvbiBjb3B5UmdiYShvdXQsIGEpIHtcbiAgICBvdXRbMF0gPSBhWzBdO1xuICAgIG91dFsxXSA9IGFbMV07XG4gICAgb3V0WzJdID0gYVsyXTtcbiAgICBvdXRbM10gPSBhWzNdO1xuICAgIHJldHVybiBvdXQ7XG59XG52YXIgY29sb3JDYWNoZSA9IG5ldyBMUlUoMjApO1xudmFyIGxhc3RSZW1vdmVkQXJyID0gbnVsbDtcbmZ1bmN0aW9uIHB1dFRvQ2FjaGUoY29sb3JTdHIsIHJnYmFBcnIpIHtcbiAgICBpZiAobGFzdFJlbW92ZWRBcnIpIHtcbiAgICAgICAgY29weVJnYmEobGFzdFJlbW92ZWRBcnIsIHJnYmFBcnIpO1xuICAgIH1cbiAgICBsYXN0UmVtb3ZlZEFyciA9IGNvbG9yQ2FjaGUucHV0KGNvbG9yU3RyLCBsYXN0UmVtb3ZlZEFyciB8fCAocmdiYUFyci5zbGljZSgpKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gcGFyc2UoY29sb3JTdHIsIHJnYmFBcnIpIHtcbiAgICBpZiAoIWNvbG9yU3RyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmdiYUFyciA9IHJnYmFBcnIgfHwgW107XG4gICAgdmFyIGNhY2hlZCA9IGNvbG9yQ2FjaGUuZ2V0KGNvbG9yU3RyKTtcbiAgICBpZiAoY2FjaGVkKSB7XG4gICAgICAgIHJldHVybiBjb3B5UmdiYShyZ2JhQXJyLCBjYWNoZWQpO1xuICAgIH1cbiAgICBjb2xvclN0ciA9IGNvbG9yU3RyICsgJyc7XG4gICAgdmFyIHN0ciA9IGNvbG9yU3RyLnJlcGxhY2UoLyAvZywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgaWYgKHN0ciBpbiBrQ1NTQ29sb3JUYWJsZSkge1xuICAgICAgICBjb3B5UmdiYShyZ2JhQXJyLCBrQ1NTQ29sb3JUYWJsZVtzdHJdKTtcbiAgICAgICAgcHV0VG9DYWNoZShjb2xvclN0ciwgcmdiYUFycik7XG4gICAgICAgIHJldHVybiByZ2JhQXJyO1xuICAgIH1cbiAgICB2YXIgc3RyTGVuID0gc3RyLmxlbmd0aDtcbiAgICBpZiAoc3RyLmNoYXJBdCgwKSA9PT0gJyMnKSB7XG4gICAgICAgIGlmIChzdHJMZW4gPT09IDQgfHwgc3RyTGVuID09PSA1KSB7XG4gICAgICAgICAgICB2YXIgaXYgPSBwYXJzZUludChzdHIuc2xpY2UoMSwgNCksIDE2KTtcbiAgICAgICAgICAgIGlmICghKGl2ID49IDAgJiYgaXYgPD0gMHhmZmYpKSB7XG4gICAgICAgICAgICAgICAgc2V0UmdiYShyZ2JhQXJyLCAwLCAwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRSZ2JhKHJnYmFBcnIsICgoaXYgJiAweGYwMCkgPj4gNCkgfCAoKGl2ICYgMHhmMDApID4+IDgpLCAoaXYgJiAweGYwKSB8ICgoaXYgJiAweGYwKSA+PiA0KSwgKGl2ICYgMHhmKSB8ICgoaXYgJiAweGYpIDw8IDQpLCBzdHJMZW4gPT09IDUgPyBwYXJzZUludChzdHIuc2xpY2UoNCksIDE2KSAvIDB4ZiA6IDEpO1xuICAgICAgICAgICAgcHV0VG9DYWNoZShjb2xvclN0ciwgcmdiYUFycik7XG4gICAgICAgICAgICByZXR1cm4gcmdiYUFycjtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChzdHJMZW4gPT09IDcgfHwgc3RyTGVuID09PSA5KSB7XG4gICAgICAgICAgICB2YXIgaXYgPSBwYXJzZUludChzdHIuc2xpY2UoMSwgNyksIDE2KTtcbiAgICAgICAgICAgIGlmICghKGl2ID49IDAgJiYgaXYgPD0gMHhmZmZmZmYpKSB7XG4gICAgICAgICAgICAgICAgc2V0UmdiYShyZ2JhQXJyLCAwLCAwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZXRSZ2JhKHJnYmFBcnIsIChpdiAmIDB4ZmYwMDAwKSA+PiAxNiwgKGl2ICYgMHhmZjAwKSA+PiA4LCBpdiAmIDB4ZmYsIHN0ckxlbiA9PT0gOSA/IHBhcnNlSW50KHN0ci5zbGljZSg3KSwgMTYpIC8gMHhmZiA6IDEpO1xuICAgICAgICAgICAgcHV0VG9DYWNoZShjb2xvclN0ciwgcmdiYUFycik7XG4gICAgICAgICAgICByZXR1cm4gcmdiYUFycjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBvcCA9IHN0ci5pbmRleE9mKCcoJyk7XG4gICAgdmFyIGVwID0gc3RyLmluZGV4T2YoJyknKTtcbiAgICBpZiAob3AgIT09IC0xICYmIGVwICsgMSA9PT0gc3RyTGVuKSB7XG4gICAgICAgIHZhciBmbmFtZSA9IHN0ci5zdWJzdHIoMCwgb3ApO1xuICAgICAgICB2YXIgcGFyYW1zID0gc3RyLnN1YnN0cihvcCArIDEsIGVwIC0gKG9wICsgMSkpLnNwbGl0KCcsJyk7XG4gICAgICAgIHZhciBhbHBoYSA9IDE7XG4gICAgICAgIHN3aXRjaCAoZm5hbWUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3JnYmEnOlxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubGVuZ3RoICE9PSA0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJhbXMubGVuZ3RoID09PSAzXG4gICAgICAgICAgICAgICAgICAgICAgICA/IHNldFJnYmEocmdiYUFyciwgK3BhcmFtc1swXSwgK3BhcmFtc1sxXSwgK3BhcmFtc1syXSwgMSlcbiAgICAgICAgICAgICAgICAgICAgICAgIDogc2V0UmdiYShyZ2JhQXJyLCAwLCAwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYWxwaGEgPSBwYXJzZUNzc0Zsb2F0KHBhcmFtcy5wb3AoKSk7XG4gICAgICAgICAgICBjYXNlICdyZ2InOlxuICAgICAgICAgICAgICAgIGlmIChwYXJhbXMubGVuZ3RoICE9PSAzKSB7XG4gICAgICAgICAgICAgICAgICAgIHNldFJnYmEocmdiYUFyciwgMCwgMCwgMCwgMSk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgc2V0UmdiYShyZ2JhQXJyLCBwYXJzZUNzc0ludChwYXJhbXNbMF0pLCBwYXJzZUNzc0ludChwYXJhbXNbMV0pLCBwYXJzZUNzc0ludChwYXJhbXNbMl0pLCBhbHBoYSk7XG4gICAgICAgICAgICAgICAgcHV0VG9DYWNoZShjb2xvclN0ciwgcmdiYUFycik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJnYmFBcnI7XG4gICAgICAgICAgICBjYXNlICdoc2xhJzpcbiAgICAgICAgICAgICAgICBpZiAocGFyYW1zLmxlbmd0aCAhPT0gNCkge1xuICAgICAgICAgICAgICAgICAgICBzZXRSZ2JhKHJnYmFBcnIsIDAsIDAsIDAsIDEpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHBhcmFtc1szXSA9IHBhcnNlQ3NzRmxvYXQocGFyYW1zWzNdKTtcbiAgICAgICAgICAgICAgICBoc2xhMnJnYmEocGFyYW1zLCByZ2JhQXJyKTtcbiAgICAgICAgICAgICAgICBwdXRUb0NhY2hlKGNvbG9yU3RyLCByZ2JhQXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmdiYUFycjtcbiAgICAgICAgICAgIGNhc2UgJ2hzbCc6XG4gICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5sZW5ndGggIT09IDMpIHtcbiAgICAgICAgICAgICAgICAgICAgc2V0UmdiYShyZ2JhQXJyLCAwLCAwLCAwLCAxKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoc2xhMnJnYmEocGFyYW1zLCByZ2JhQXJyKTtcbiAgICAgICAgICAgICAgICBwdXRUb0NhY2hlKGNvbG9yU3RyLCByZ2JhQXJyKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmdiYUFycjtcbiAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIHNldFJnYmEocmdiYUFyciwgMCwgMCwgMCwgMSk7XG4gICAgcmV0dXJuO1xufVxuZnVuY3Rpb24gaHNsYTJyZ2JhKGhzbGEsIHJnYmEpIHtcbiAgICB2YXIgaCA9ICgoKHBhcnNlRmxvYXQoaHNsYVswXSkgJSAzNjApICsgMzYwKSAlIDM2MCkgLyAzNjA7XG4gICAgdmFyIHMgPSBwYXJzZUNzc0Zsb2F0KGhzbGFbMV0pO1xuICAgIHZhciBsID0gcGFyc2VDc3NGbG9hdChoc2xhWzJdKTtcbiAgICB2YXIgbTIgPSBsIDw9IDAuNSA/IGwgKiAocyArIDEpIDogbCArIHMgLSBsICogcztcbiAgICB2YXIgbTEgPSBsICogMiAtIG0yO1xuICAgIHJnYmEgPSByZ2JhIHx8IFtdO1xuICAgIHNldFJnYmEocmdiYSwgY2xhbXBDc3NCeXRlKGNzc0h1ZVRvUmdiKG0xLCBtMiwgaCArIDEgLyAzKSAqIDI1NSksIGNsYW1wQ3NzQnl0ZShjc3NIdWVUb1JnYihtMSwgbTIsIGgpICogMjU1KSwgY2xhbXBDc3NCeXRlKGNzc0h1ZVRvUmdiKG0xLCBtMiwgaCAtIDEgLyAzKSAqIDI1NSksIDEpO1xuICAgIGlmIChoc2xhLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICByZ2JhWzNdID0gaHNsYVszXTtcbiAgICB9XG4gICAgcmV0dXJuIHJnYmE7XG59XG5mdW5jdGlvbiByZ2JhMmhzbGEocmdiYSkge1xuICAgIGlmICghcmdiYSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBSID0gcmdiYVswXSAvIDI1NTtcbiAgICB2YXIgRyA9IHJnYmFbMV0gLyAyNTU7XG4gICAgdmFyIEIgPSByZ2JhWzJdIC8gMjU1O1xuICAgIHZhciB2TWluID0gTWF0aC5taW4oUiwgRywgQik7XG4gICAgdmFyIHZNYXggPSBNYXRoLm1heChSLCBHLCBCKTtcbiAgICB2YXIgZGVsdGEgPSB2TWF4IC0gdk1pbjtcbiAgICB2YXIgTCA9ICh2TWF4ICsgdk1pbikgLyAyO1xuICAgIHZhciBIO1xuICAgIHZhciBTO1xuICAgIGlmIChkZWx0YSA9PT0gMCkge1xuICAgICAgICBIID0gMDtcbiAgICAgICAgUyA9IDA7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpZiAoTCA8IDAuNSkge1xuICAgICAgICAgICAgUyA9IGRlbHRhIC8gKHZNYXggKyB2TWluKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIFMgPSBkZWx0YSAvICgyIC0gdk1heCAtIHZNaW4pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBkZWx0YVIgPSAoKCh2TWF4IC0gUikgLyA2KSArIChkZWx0YSAvIDIpKSAvIGRlbHRhO1xuICAgICAgICB2YXIgZGVsdGFHID0gKCgodk1heCAtIEcpIC8gNikgKyAoZGVsdGEgLyAyKSkgLyBkZWx0YTtcbiAgICAgICAgdmFyIGRlbHRhQiA9ICgoKHZNYXggLSBCKSAvIDYpICsgKGRlbHRhIC8gMikpIC8gZGVsdGE7XG4gICAgICAgIGlmIChSID09PSB2TWF4KSB7XG4gICAgICAgICAgICBIID0gZGVsdGFCIC0gZGVsdGFHO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEcgPT09IHZNYXgpIHtcbiAgICAgICAgICAgIEggPSAoMSAvIDMpICsgZGVsdGFSIC0gZGVsdGFCO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKEIgPT09IHZNYXgpIHtcbiAgICAgICAgICAgIEggPSAoMiAvIDMpICsgZGVsdGFHIC0gZGVsdGFSO1xuICAgICAgICB9XG4gICAgICAgIGlmIChIIDwgMCkge1xuICAgICAgICAgICAgSCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlmIChIID4gMSkge1xuICAgICAgICAgICAgSCAtPSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHZhciBoc2xhID0gW0ggKiAzNjAsIFMsIExdO1xuICAgIGlmIChyZ2JhWzNdICE9IG51bGwpIHtcbiAgICAgICAgaHNsYS5wdXNoKHJnYmFbM10pO1xuICAgIH1cbiAgICByZXR1cm4gaHNsYTtcbn1cbmV4cG9ydCBmdW5jdGlvbiBsaWZ0KGNvbG9yLCBsZXZlbCkge1xuICAgIHZhciBjb2xvckFyciA9IHBhcnNlKGNvbG9yKTtcbiAgICBpZiAoY29sb3JBcnIpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChsZXZlbCA8IDApIHtcbiAgICAgICAgICAgICAgICBjb2xvckFycltpXSA9IGNvbG9yQXJyW2ldICogKDEgLSBsZXZlbCkgfCAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY29sb3JBcnJbaV0gPSAoKDI1NSAtIGNvbG9yQXJyW2ldKSAqIGxldmVsICsgY29sb3JBcnJbaV0pIHwgMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChjb2xvckFycltpXSA+IDI1NSkge1xuICAgICAgICAgICAgICAgIGNvbG9yQXJyW2ldID0gMjU1O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoY29sb3JBcnJbaV0gPCAwKSB7XG4gICAgICAgICAgICAgICAgY29sb3JBcnJbaV0gPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdHJpbmdpZnkoY29sb3JBcnIsIGNvbG9yQXJyLmxlbmd0aCA9PT0gNCA/ICdyZ2JhJyA6ICdyZ2InKTtcbiAgICB9XG59XG5leHBvcnQgZnVuY3Rpb24gdG9IZXgoY29sb3IpIHtcbiAgICB2YXIgY29sb3JBcnIgPSBwYXJzZShjb2xvcik7XG4gICAgaWYgKGNvbG9yQXJyKSB7XG4gICAgICAgIHJldHVybiAoKDEgPDwgMjQpICsgKGNvbG9yQXJyWzBdIDw8IDE2KSArIChjb2xvckFyclsxXSA8PCA4KSArICgrY29sb3JBcnJbMl0pKS50b1N0cmluZygxNikuc2xpY2UoMSk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIGZhc3RMZXJwKG5vcm1hbGl6ZWRWYWx1ZSwgY29sb3JzLCBvdXQpIHtcbiAgICBpZiAoIShjb2xvcnMgJiYgY29sb3JzLmxlbmd0aClcbiAgICAgICAgfHwgIShub3JtYWxpemVkVmFsdWUgPj0gMCAmJiBub3JtYWxpemVkVmFsdWUgPD0gMSkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBvdXQgPSBvdXQgfHwgW107XG4gICAgdmFyIHZhbHVlID0gbm9ybWFsaXplZFZhbHVlICogKGNvbG9ycy5sZW5ndGggLSAxKTtcbiAgICB2YXIgbGVmdEluZGV4ID0gTWF0aC5mbG9vcih2YWx1ZSk7XG4gICAgdmFyIHJpZ2h0SW5kZXggPSBNYXRoLmNlaWwodmFsdWUpO1xuICAgIHZhciBsZWZ0Q29sb3IgPSBjb2xvcnNbbGVmdEluZGV4XTtcbiAgICB2YXIgcmlnaHRDb2xvciA9IGNvbG9yc1tyaWdodEluZGV4XTtcbiAgICB2YXIgZHYgPSB2YWx1ZSAtIGxlZnRJbmRleDtcbiAgICBvdXRbMF0gPSBjbGFtcENzc0J5dGUobGVycE51bWJlcihsZWZ0Q29sb3JbMF0sIHJpZ2h0Q29sb3JbMF0sIGR2KSk7XG4gICAgb3V0WzFdID0gY2xhbXBDc3NCeXRlKGxlcnBOdW1iZXIobGVmdENvbG9yWzFdLCByaWdodENvbG9yWzFdLCBkdikpO1xuICAgIG91dFsyXSA9IGNsYW1wQ3NzQnl0ZShsZXJwTnVtYmVyKGxlZnRDb2xvclsyXSwgcmlnaHRDb2xvclsyXSwgZHYpKTtcbiAgICBvdXRbM10gPSBjbGFtcENzc0Zsb2F0KGxlcnBOdW1iZXIobGVmdENvbG9yWzNdLCByaWdodENvbG9yWzNdLCBkdikpO1xuICAgIHJldHVybiBvdXQ7XG59XG5leHBvcnQgdmFyIGZhc3RNYXBUb0NvbG9yID0gZmFzdExlcnA7XG5leHBvcnQgZnVuY3Rpb24gbGVycChub3JtYWxpemVkVmFsdWUsIGNvbG9ycywgZnVsbE91dHB1dCkge1xuICAgIGlmICghKGNvbG9ycyAmJiBjb2xvcnMubGVuZ3RoKVxuICAgICAgICB8fCAhKG5vcm1hbGl6ZWRWYWx1ZSA+PSAwICYmIG5vcm1hbGl6ZWRWYWx1ZSA8PSAxKSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB2YWx1ZSA9IG5vcm1hbGl6ZWRWYWx1ZSAqIChjb2xvcnMubGVuZ3RoIC0gMSk7XG4gICAgdmFyIGxlZnRJbmRleCA9IE1hdGguZmxvb3IodmFsdWUpO1xuICAgIHZhciByaWdodEluZGV4ID0gTWF0aC5jZWlsKHZhbHVlKTtcbiAgICB2YXIgbGVmdENvbG9yID0gcGFyc2UoY29sb3JzW2xlZnRJbmRleF0pO1xuICAgIHZhciByaWdodENvbG9yID0gcGFyc2UoY29sb3JzW3JpZ2h0SW5kZXhdKTtcbiAgICB2YXIgZHYgPSB2YWx1ZSAtIGxlZnRJbmRleDtcbiAgICB2YXIgY29sb3IgPSBzdHJpbmdpZnkoW1xuICAgICAgICBjbGFtcENzc0J5dGUobGVycE51bWJlcihsZWZ0Q29sb3JbMF0sIHJpZ2h0Q29sb3JbMF0sIGR2KSksXG4gICAgICAgIGNsYW1wQ3NzQnl0ZShsZXJwTnVtYmVyKGxlZnRDb2xvclsxXSwgcmlnaHRDb2xvclsxXSwgZHYpKSxcbiAgICAgICAgY2xhbXBDc3NCeXRlKGxlcnBOdW1iZXIobGVmdENvbG9yWzJdLCByaWdodENvbG9yWzJdLCBkdikpLFxuICAgICAgICBjbGFtcENzc0Zsb2F0KGxlcnBOdW1iZXIobGVmdENvbG9yWzNdLCByaWdodENvbG9yWzNdLCBkdikpXG4gICAgXSwgJ3JnYmEnKTtcbiAgICByZXR1cm4gZnVsbE91dHB1dFxuICAgICAgICA/IHtcbiAgICAgICAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgICAgICAgIGxlZnRJbmRleDogbGVmdEluZGV4LFxuICAgICAgICAgICAgcmlnaHRJbmRleDogcmlnaHRJbmRleCxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICB9XG4gICAgICAgIDogY29sb3I7XG59XG5leHBvcnQgdmFyIG1hcFRvQ29sb3IgPSBsZXJwO1xuZXhwb3J0IGZ1bmN0aW9uIG1vZGlmeUhTTChjb2xvciwgaCwgcywgbCkge1xuICAgIHZhciBjb2xvckFyciA9IHBhcnNlKGNvbG9yKTtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgICAgY29sb3JBcnIgPSByZ2JhMmhzbGEoY29sb3JBcnIpO1xuICAgICAgICBoICE9IG51bGwgJiYgKGNvbG9yQXJyWzBdID0gY2xhbXBDc3NBbmdsZShoKSk7XG4gICAgICAgIHMgIT0gbnVsbCAmJiAoY29sb3JBcnJbMV0gPSBwYXJzZUNzc0Zsb2F0KHMpKTtcbiAgICAgICAgbCAhPSBudWxsICYmIChjb2xvckFyclsyXSA9IHBhcnNlQ3NzRmxvYXQobCkpO1xuICAgICAgICByZXR1cm4gc3RyaW5naWZ5KGhzbGEycmdiYShjb2xvckFyciksICdyZ2JhJyk7XG4gICAgfVxufVxuZXhwb3J0IGZ1bmN0aW9uIG1vZGlmeUFscGhhKGNvbG9yLCBhbHBoYSkge1xuICAgIHZhciBjb2xvckFyciA9IHBhcnNlKGNvbG9yKTtcbiAgICBpZiAoY29sb3JBcnIgJiYgYWxwaGEgIT0gbnVsbCkge1xuICAgICAgICBjb2xvckFyclszXSA9IGNsYW1wQ3NzRmxvYXQoYWxwaGEpO1xuICAgICAgICByZXR1cm4gc3RyaW5naWZ5KGNvbG9yQXJyLCAncmdiYScpO1xuICAgIH1cbn1cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkoYXJyQ29sb3IsIHR5cGUpIHtcbiAgICBpZiAoIWFyckNvbG9yIHx8ICFhcnJDb2xvci5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgY29sb3JTdHIgPSBhcnJDb2xvclswXSArICcsJyArIGFyckNvbG9yWzFdICsgJywnICsgYXJyQ29sb3JbMl07XG4gICAgaWYgKHR5cGUgPT09ICdyZ2JhJyB8fCB0eXBlID09PSAnaHN2YScgfHwgdHlwZSA9PT0gJ2hzbGEnKSB7XG4gICAgICAgIGNvbG9yU3RyICs9ICcsJyArIGFyckNvbG9yWzNdO1xuICAgIH1cbiAgICByZXR1cm4gdHlwZSArICcoJyArIGNvbG9yU3RyICsgJyknO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGx1bShjb2xvciwgYmFja2dyb3VuZEx1bSkge1xuICAgIHZhciBhcnIgPSBwYXJzZShjb2xvcik7XG4gICAgcmV0dXJuIGFyclxuICAgICAgICA/ICgwLjI5OSAqIGFyclswXSArIDAuNTg3ICogYXJyWzFdICsgMC4xMTQgKiBhcnJbMl0pICogYXJyWzNdIC8gMjU1XG4gICAgICAgICAgICArICgxIC0gYXJyWzNdKSAqIGJhY2tncm91bmRMdW1cbiAgICAgICAgOiAwO1xufVxuZXhwb3J0IGZ1bmN0aW9uIHJhbmRvbSgpIHtcbiAgICB2YXIgciA9IE1hdGgucm91bmQoTWF0aC5yYW5kb20oKSAqIDI1NSk7XG4gICAgdmFyIGcgPSBNYXRoLnJvdW5kKE1hdGgucmFuZG9tKCkgKiAyNTUpO1xuICAgIHZhciBiID0gTWF0aC5yb3VuZChNYXRoLnJhbmRvbSgpICogMjU1KTtcbiAgICByZXR1cm4gJ3JnYignICsgciArICcsJyArIGcgKyAnLCcgKyBiICsgJyknO1xufVxuIiwiLyohICoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXHJcbkNvcHlyaWdodCAoYykgTWljcm9zb2Z0IENvcnBvcmF0aW9uLlxyXG5cclxuUGVybWlzc2lvbiB0byB1c2UsIGNvcHksIG1vZGlmeSwgYW5kL29yIGRpc3RyaWJ1dGUgdGhpcyBzb2Z0d2FyZSBmb3IgYW55XHJcbnB1cnBvc2Ugd2l0aCBvciB3aXRob3V0IGZlZSBpcyBoZXJlYnkgZ3JhbnRlZC5cclxuXHJcblRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIgQU5EIFRIRSBBVVRIT1IgRElTQ0xBSU1TIEFMTCBXQVJSQU5USUVTIFdJVEhcclxuUkVHQVJEIFRPIFRISVMgU09GVFdBUkUgSU5DTFVESU5HIEFMTCBJTVBMSUVEIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZXHJcbkFORCBGSVRORVNTLiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQVVUSE9SIEJFIExJQUJMRSBGT1IgQU5ZIFNQRUNJQUwsIERJUkVDVCxcclxuSU5ESVJFQ1QsIE9SIENPTlNFUVVFTlRJQUwgREFNQUdFUyBPUiBBTlkgREFNQUdFUyBXSEFUU09FVkVSIFJFU1VMVElORyBGUk9NXHJcbkxPU1MgT0YgVVNFLCBEQVRBIE9SIFBST0ZJVFMsIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBORUdMSUdFTkNFIE9SXHJcbk9USEVSIFRPUlRJT1VTIEFDVElPTiwgQVJJU0lORyBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBVU0UgT1JcclxuUEVSRk9STUFOQ0UgT0YgVEhJUyBTT0ZUV0FSRS5cclxuKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiogKi9cclxuLyogZ2xvYmFsIFJlZmxlY3QsIFByb21pc2UgKi9cclxuXHJcbnZhciBleHRlbmRTdGF0aWNzID0gZnVuY3Rpb24oZCwgYikge1xyXG4gICAgZXh0ZW5kU3RhdGljcyA9IE9iamVjdC5zZXRQcm90b3R5cGVPZiB8fFxyXG4gICAgICAgICh7IF9fcHJvdG9fXzogW10gfSBpbnN0YW5jZW9mIEFycmF5ICYmIGZ1bmN0aW9uIChkLCBiKSB7IGQuX19wcm90b19fID0gYjsgfSkgfHxcclxuICAgICAgICBmdW5jdGlvbiAoZCwgYikgeyBmb3IgKHZhciBwIGluIGIpIGlmIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoYiwgcCkpIGRbcF0gPSBiW3BdOyB9O1xyXG4gICAgcmV0dXJuIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbn07XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19leHRlbmRzKGQsIGIpIHtcclxuICAgIGV4dGVuZFN0YXRpY3MoZCwgYik7XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuZXhwb3J0IHZhciBfX2Fzc2lnbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgX19hc3NpZ24gPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uIF9fYXNzaWduKHQpIHtcclxuICAgICAgICBmb3IgKHZhciBzLCBpID0gMSwgbiA9IGFyZ3VtZW50cy5sZW5ndGg7IGkgPCBuOyBpKyspIHtcclxuICAgICAgICAgICAgcyA9IGFyZ3VtZW50c1tpXTtcclxuICAgICAgICAgICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApKSB0W3BdID0gc1twXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHQ7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gX19hc3NpZ24uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fcmVzdChzLCBlKSB7XHJcbiAgICB2YXIgdCA9IHt9O1xyXG4gICAgZm9yICh2YXIgcCBpbiBzKSBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHMsIHApICYmIGUuaW5kZXhPZihwKSA8IDApXHJcbiAgICAgICAgdFtwXSA9IHNbcF07XHJcbiAgICBpZiAocyAhPSBudWxsICYmIHR5cGVvZiBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzID09PSBcImZ1bmN0aW9uXCIpXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHAgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHMpOyBpIDwgcC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoZS5pbmRleE9mKHBbaV0pIDwgMCAmJiBPYmplY3QucHJvdG90eXBlLnByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwocywgcFtpXSkpXHJcbiAgICAgICAgICAgICAgICB0W3BbaV1dID0gc1twW2ldXTtcclxuICAgICAgICB9XHJcbiAgICByZXR1cm4gdDtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpIHtcclxuICAgIHZhciBjID0gYXJndW1lbnRzLmxlbmd0aCwgciA9IGMgPCAzID8gdGFyZ2V0IDogZGVzYyA9PT0gbnVsbCA/IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwga2V5KSA6IGRlc2MsIGQ7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QuZGVjb3JhdGUgPT09IFwiZnVuY3Rpb25cIikgciA9IFJlZmxlY3QuZGVjb3JhdGUoZGVjb3JhdG9ycywgdGFyZ2V0LCBrZXksIGRlc2MpO1xyXG4gICAgZWxzZSBmb3IgKHZhciBpID0gZGVjb3JhdG9ycy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkgaWYgKGQgPSBkZWNvcmF0b3JzW2ldKSByID0gKGMgPCAzID8gZChyKSA6IGMgPiAzID8gZCh0YXJnZXQsIGtleSwgcikgOiBkKHRhcmdldCwga2V5KSkgfHwgcjtcclxuICAgIHJldHVybiBjID4gMyAmJiByICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGtleSwgciksIHI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3BhcmFtKHBhcmFtSW5kZXgsIGRlY29yYXRvcikge1xyXG4gICAgcmV0dXJuIGZ1bmN0aW9uICh0YXJnZXQsIGtleSkgeyBkZWNvcmF0b3IodGFyZ2V0LCBrZXksIHBhcmFtSW5kZXgpOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX21ldGFkYXRhKG1ldGFkYXRhS2V5LCBtZXRhZGF0YVZhbHVlKSB7XHJcbiAgICBpZiAodHlwZW9mIFJlZmxlY3QgPT09IFwib2JqZWN0XCIgJiYgdHlwZW9mIFJlZmxlY3QubWV0YWRhdGEgPT09IFwiZnVuY3Rpb25cIikgcmV0dXJuIFJlZmxlY3QubWV0YWRhdGEobWV0YWRhdGFLZXksIG1ldGFkYXRhVmFsdWUpO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hd2FpdGVyKHRoaXNBcmcsIF9hcmd1bWVudHMsIFAsIGdlbmVyYXRvcikge1xyXG4gICAgZnVuY3Rpb24gYWRvcHQodmFsdWUpIHsgcmV0dXJuIHZhbHVlIGluc3RhbmNlb2YgUCA/IHZhbHVlIDogbmV3IFAoZnVuY3Rpb24gKHJlc29sdmUpIHsgcmVzb2x2ZSh2YWx1ZSk7IH0pOyB9XHJcbiAgICByZXR1cm4gbmV3IChQIHx8IChQID0gUHJvbWlzZSkpKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcclxuICAgICAgICBmdW5jdGlvbiBmdWxmaWxsZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3IubmV4dCh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gcmVqZWN0ZWQodmFsdWUpIHsgdHJ5IHsgc3RlcChnZW5lcmF0b3JbXCJ0aHJvd1wiXSh2YWx1ZSkpOyB9IGNhdGNoIChlKSB7IHJlamVjdChlKTsgfSB9XHJcbiAgICAgICAgZnVuY3Rpb24gc3RlcChyZXN1bHQpIHsgcmVzdWx0LmRvbmUgPyByZXNvbHZlKHJlc3VsdC52YWx1ZSkgOiBhZG9wdChyZXN1bHQudmFsdWUpLnRoZW4oZnVsZmlsbGVkLCByZWplY3RlZCk7IH1cclxuICAgICAgICBzdGVwKChnZW5lcmF0b3IgPSBnZW5lcmF0b3IuYXBwbHkodGhpc0FyZywgX2FyZ3VtZW50cyB8fCBbXSkpLm5leHQoKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fZ2VuZXJhdG9yKHRoaXNBcmcsIGJvZHkpIHtcclxuICAgIHZhciBfID0geyBsYWJlbDogMCwgc2VudDogZnVuY3Rpb24oKSB7IGlmICh0WzBdICYgMSkgdGhyb3cgdFsxXTsgcmV0dXJuIHRbMV07IH0sIHRyeXM6IFtdLCBvcHM6IFtdIH0sIGYsIHksIHQsIGc7XHJcbiAgICByZXR1cm4gZyA9IHsgbmV4dDogdmVyYigwKSwgXCJ0aHJvd1wiOiB2ZXJiKDEpLCBcInJldHVyblwiOiB2ZXJiKDIpIH0sIHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiAoZ1tTeW1ib2wuaXRlcmF0b3JdID0gZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzOyB9KSwgZztcclxuICAgIGZ1bmN0aW9uIHZlcmIobikgeyByZXR1cm4gZnVuY3Rpb24gKHYpIHsgcmV0dXJuIHN0ZXAoW24sIHZdKTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc3RlcChvcCkge1xyXG4gICAgICAgIGlmIChmKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiR2VuZXJhdG9yIGlzIGFscmVhZHkgZXhlY3V0aW5nLlwiKTtcclxuICAgICAgICB3aGlsZSAoXykgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKGYgPSAxLCB5ICYmICh0ID0gb3BbMF0gJiAyID8geVtcInJldHVyblwiXSA6IG9wWzBdID8geVtcInRocm93XCJdIHx8ICgodCA9IHlbXCJyZXR1cm5cIl0pICYmIHQuY2FsbCh5KSwgMCkgOiB5Lm5leHQpICYmICEodCA9IHQuY2FsbCh5LCBvcFsxXSkpLmRvbmUpIHJldHVybiB0O1xyXG4gICAgICAgICAgICBpZiAoeSA9IDAsIHQpIG9wID0gW29wWzBdICYgMiwgdC52YWx1ZV07XHJcbiAgICAgICAgICAgIHN3aXRjaCAob3BbMF0pIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgMDogY2FzZSAxOiB0ID0gb3A7IGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSA0OiBfLmxhYmVsKys7IHJldHVybiB7IHZhbHVlOiBvcFsxXSwgZG9uZTogZmFsc2UgfTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNTogXy5sYWJlbCsrOyB5ID0gb3BbMV07IG9wID0gWzBdOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGNhc2UgNzogb3AgPSBfLm9wcy5wb3AoKTsgXy50cnlzLnBvcCgpOyBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCEodCA9IF8udHJ5cywgdCA9IHQubGVuZ3RoID4gMCAmJiB0W3QubGVuZ3RoIC0gMV0pICYmIChvcFswXSA9PT0gNiB8fCBvcFswXSA9PT0gMikpIHsgXyA9IDA7IGNvbnRpbnVlOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKG9wWzBdID09PSAzICYmICghdCB8fCAob3BbMV0gPiB0WzBdICYmIG9wWzFdIDwgdFszXSkpKSB7IF8ubGFiZWwgPSBvcFsxXTsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAob3BbMF0gPT09IDYgJiYgXy5sYWJlbCA8IHRbMV0pIHsgXy5sYWJlbCA9IHRbMV07IHQgPSBvcDsgYnJlYWs7IH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAodCAmJiBfLmxhYmVsIDwgdFsyXSkgeyBfLmxhYmVsID0gdFsyXTsgXy5vcHMucHVzaChvcCk7IGJyZWFrOyB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRbMl0pIF8ub3BzLnBvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIF8udHJ5cy5wb3AoKTsgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb3AgPSBib2R5LmNhbGwodGhpc0FyZywgXyk7XHJcbiAgICAgICAgfSBjYXRjaCAoZSkgeyBvcCA9IFs2LCBlXTsgeSA9IDA7IH0gZmluYWxseSB7IGYgPSB0ID0gMDsgfVxyXG4gICAgICAgIGlmIChvcFswXSAmIDUpIHRocm93IG9wWzFdOyByZXR1cm4geyB2YWx1ZTogb3BbMF0gPyBvcFsxXSA6IHZvaWQgMCwgZG9uZTogdHJ1ZSB9O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgdmFyIF9fY3JlYXRlQmluZGluZyA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgbSwgaywgazIpIHtcclxuICAgIGlmIChrMiA9PT0gdW5kZWZpbmVkKSBrMiA9IGs7XHJcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobywgazIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbigpIHsgcmV0dXJuIG1ba107IH0gfSk7XHJcbn0pIDogKGZ1bmN0aW9uKG8sIG0sIGssIGsyKSB7XHJcbiAgICBpZiAoazIgPT09IHVuZGVmaW5lZCkgazIgPSBrO1xyXG4gICAgb1trMl0gPSBtW2tdO1xyXG59KTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2V4cG9ydFN0YXIobSwgbykge1xyXG4gICAgZm9yICh2YXIgcCBpbiBtKSBpZiAocCAhPT0gXCJkZWZhdWx0XCIgJiYgIU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvLCBwKSkgX19jcmVhdGVCaW5kaW5nKG8sIG0sIHApO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX192YWx1ZXMobykge1xyXG4gICAgdmFyIHMgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgU3ltYm9sLml0ZXJhdG9yLCBtID0gcyAmJiBvW3NdLCBpID0gMDtcclxuICAgIGlmIChtKSByZXR1cm4gbS5jYWxsKG8pO1xyXG4gICAgaWYgKG8gJiYgdHlwZW9mIG8ubGVuZ3RoID09PSBcIm51bWJlclwiKSByZXR1cm4ge1xyXG4gICAgICAgIG5leHQ6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKG8gJiYgaSA+PSBvLmxlbmd0aCkgbyA9IHZvaWQgMDtcclxuICAgICAgICAgICAgcmV0dXJuIHsgdmFsdWU6IG8gJiYgb1tpKytdLCBkb25lOiAhbyB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHMgPyBcIk9iamVjdCBpcyBub3QgaXRlcmFibGUuXCIgOiBcIlN5bWJvbC5pdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3JlYWQobywgbikge1xyXG4gICAgdmFyIG0gPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb1tTeW1ib2wuaXRlcmF0b3JdO1xyXG4gICAgaWYgKCFtKSByZXR1cm4gbztcclxuICAgIHZhciBpID0gbS5jYWxsKG8pLCByLCBhciA9IFtdLCBlO1xyXG4gICAgdHJ5IHtcclxuICAgICAgICB3aGlsZSAoKG4gPT09IHZvaWQgMCB8fCBuLS0gPiAwKSAmJiAhKHIgPSBpLm5leHQoKSkuZG9uZSkgYXIucHVzaChyLnZhbHVlKTtcclxuICAgIH1cclxuICAgIGNhdGNoIChlcnJvcikgeyBlID0geyBlcnJvcjogZXJyb3IgfTsgfVxyXG4gICAgZmluYWxseSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgaWYgKHIgJiYgIXIuZG9uZSAmJiAobSA9IGlbXCJyZXR1cm5cIl0pKSBtLmNhbGwoaSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbmFsbHkgeyBpZiAoZSkgdGhyb3cgZS5lcnJvcjsgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFyO1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19zcHJlYWQoKSB7XHJcbiAgICBmb3IgKHZhciBhciA9IFtdLCBpID0gMDsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKylcclxuICAgICAgICBhciA9IGFyLmNvbmNhdChfX3JlYWQoYXJndW1lbnRzW2ldKSk7XHJcbiAgICByZXR1cm4gYXI7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX3NwcmVhZEFycmF5cygpIHtcclxuICAgIGZvciAodmFyIHMgPSAwLCBpID0gMCwgaWwgPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykgcyArPSBhcmd1bWVudHNbaV0ubGVuZ3RoO1xyXG4gICAgZm9yICh2YXIgciA9IEFycmF5KHMpLCBrID0gMCwgaSA9IDA7IGkgPCBpbDsgaSsrKVxyXG4gICAgICAgIGZvciAodmFyIGEgPSBhcmd1bWVudHNbaV0sIGogPSAwLCBqbCA9IGEubGVuZ3RoOyBqIDwgamw7IGorKywgaysrKVxyXG4gICAgICAgICAgICByW2tdID0gYVtqXTtcclxuICAgIHJldHVybiByO1xyXG59O1xyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIF9fYXdhaXQodikge1xyXG4gICAgcmV0dXJuIHRoaXMgaW5zdGFuY2VvZiBfX2F3YWl0ID8gKHRoaXMudiA9IHYsIHRoaXMpIDogbmV3IF9fYXdhaXQodik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jR2VuZXJhdG9yKHRoaXNBcmcsIF9hcmd1bWVudHMsIGdlbmVyYXRvcikge1xyXG4gICAgaWYgKCFTeW1ib2wuYXN5bmNJdGVyYXRvcikgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN5bWJvbC5hc3luY0l0ZXJhdG9yIGlzIG5vdCBkZWZpbmVkLlwiKTtcclxuICAgIHZhciBnID0gZ2VuZXJhdG9yLmFwcGx5KHRoaXNBcmcsIF9hcmd1bWVudHMgfHwgW10pLCBpLCBxID0gW107XHJcbiAgICByZXR1cm4gaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4pIHsgaWYgKGdbbl0pIGlbbl0gPSBmdW5jdGlvbiAodikgeyByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKGEsIGIpIHsgcS5wdXNoKFtuLCB2LCBhLCBiXSkgPiAxIHx8IHJlc3VtZShuLCB2KTsgfSk7IH07IH1cclxuICAgIGZ1bmN0aW9uIHJlc3VtZShuLCB2KSB7IHRyeSB7IHN0ZXAoZ1tuXSh2KSk7IH0gY2F0Y2ggKGUpIHsgc2V0dGxlKHFbMF1bM10sIGUpOyB9IH1cclxuICAgIGZ1bmN0aW9uIHN0ZXAocikgeyByLnZhbHVlIGluc3RhbmNlb2YgX19hd2FpdCA/IFByb21pc2UucmVzb2x2ZShyLnZhbHVlLnYpLnRoZW4oZnVsZmlsbCwgcmVqZWN0KSA6IHNldHRsZShxWzBdWzJdLCByKTsgfVxyXG4gICAgZnVuY3Rpb24gZnVsZmlsbCh2YWx1ZSkgeyByZXN1bWUoXCJuZXh0XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gcmVqZWN0KHZhbHVlKSB7IHJlc3VtZShcInRocm93XCIsIHZhbHVlKTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKGYsIHYpIHsgaWYgKGYodiksIHEuc2hpZnQoKSwgcS5sZW5ndGgpIHJlc3VtZShxWzBdWzBdLCBxWzBdWzFdKTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19hc3luY0RlbGVnYXRvcihvKSB7XHJcbiAgICB2YXIgaSwgcDtcclxuICAgIHJldHVybiBpID0ge30sIHZlcmIoXCJuZXh0XCIpLCB2ZXJiKFwidGhyb3dcIiwgZnVuY3Rpb24gKGUpIHsgdGhyb3cgZTsgfSksIHZlcmIoXCJyZXR1cm5cIiksIGlbU3ltYm9sLml0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGk7XHJcbiAgICBmdW5jdGlvbiB2ZXJiKG4sIGYpIHsgaVtuXSA9IG9bbl0gPyBmdW5jdGlvbiAodikgeyByZXR1cm4gKHAgPSAhcCkgPyB7IHZhbHVlOiBfX2F3YWl0KG9bbl0odikpLCBkb25lOiBuID09PSBcInJldHVyblwiIH0gOiBmID8gZih2KSA6IHY7IH0gOiBmOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2FzeW5jVmFsdWVzKG8pIHtcclxuICAgIGlmICghU3ltYm9sLmFzeW5jSXRlcmF0b3IpIHRocm93IG5ldyBUeXBlRXJyb3IoXCJTeW1ib2wuYXN5bmNJdGVyYXRvciBpcyBub3QgZGVmaW5lZC5cIik7XHJcbiAgICB2YXIgbSA9IG9bU3ltYm9sLmFzeW5jSXRlcmF0b3JdLCBpO1xyXG4gICAgcmV0dXJuIG0gPyBtLmNhbGwobykgOiAobyA9IHR5cGVvZiBfX3ZhbHVlcyA9PT0gXCJmdW5jdGlvblwiID8gX192YWx1ZXMobykgOiBvW1N5bWJvbC5pdGVyYXRvcl0oKSwgaSA9IHt9LCB2ZXJiKFwibmV4dFwiKSwgdmVyYihcInRocm93XCIpLCB2ZXJiKFwicmV0dXJuXCIpLCBpW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHRoaXM7IH0sIGkpO1xyXG4gICAgZnVuY3Rpb24gdmVyYihuKSB7IGlbbl0gPSBvW25dICYmIGZ1bmN0aW9uICh2KSB7IHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbiAocmVzb2x2ZSwgcmVqZWN0KSB7IHYgPSBvW25dKHYpLCBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCB2LmRvbmUsIHYudmFsdWUpOyB9KTsgfTsgfVxyXG4gICAgZnVuY3Rpb24gc2V0dGxlKHJlc29sdmUsIHJlamVjdCwgZCwgdikgeyBQcm9taXNlLnJlc29sdmUodikudGhlbihmdW5jdGlvbih2KSB7IHJlc29sdmUoeyB2YWx1ZTogdiwgZG9uZTogZCB9KTsgfSwgcmVqZWN0KTsgfVxyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19tYWtlVGVtcGxhdGVPYmplY3QoY29va2VkLCByYXcpIHtcclxuICAgIGlmIChPYmplY3QuZGVmaW5lUHJvcGVydHkpIHsgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNvb2tlZCwgXCJyYXdcIiwgeyB2YWx1ZTogcmF3IH0pOyB9IGVsc2UgeyBjb29rZWQucmF3ID0gcmF3OyB9XHJcbiAgICByZXR1cm4gY29va2VkO1xyXG59O1xyXG5cclxudmFyIF9fc2V0TW9kdWxlRGVmYXVsdCA9IE9iamVjdC5jcmVhdGUgPyAoZnVuY3Rpb24obywgdikge1xyXG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KG8sIFwiZGVmYXVsdFwiLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2IH0pO1xyXG59KSA6IGZ1bmN0aW9uKG8sIHYpIHtcclxuICAgIG9bXCJkZWZhdWx0XCJdID0gdjtcclxufTtcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydFN0YXIobW9kKSB7XHJcbiAgICBpZiAobW9kICYmIG1vZC5fX2VzTW9kdWxlKSByZXR1cm4gbW9kO1xyXG4gICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgaWYgKG1vZCAhPSBudWxsKSBmb3IgKHZhciBrIGluIG1vZCkgaWYgKGsgIT09IFwiZGVmYXVsdFwiICYmIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChtb2QsIGspKSBfX2NyZWF0ZUJpbmRpbmcocmVzdWx0LCBtb2QsIGspO1xyXG4gICAgX19zZXRNb2R1bGVEZWZhdWx0KHJlc3VsdCwgbW9kKTtcclxuICAgIHJldHVybiByZXN1bHQ7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2ltcG9ydERlZmF1bHQobW9kKSB7XHJcbiAgICByZXR1cm4gKG1vZCAmJiBtb2QuX19lc01vZHVsZSkgPyBtb2QgOiB7IGRlZmF1bHQ6IG1vZCB9O1xyXG59XHJcblxyXG5leHBvcnQgZnVuY3Rpb24gX19jbGFzc1ByaXZhdGVGaWVsZEdldChyZWNlaXZlciwgcHJpdmF0ZU1hcCkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIGdldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHJldHVybiBwcml2YXRlTWFwLmdldChyZWNlaXZlcik7XHJcbn1cclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBfX2NsYXNzUHJpdmF0ZUZpZWxkU2V0KHJlY2VpdmVyLCBwcml2YXRlTWFwLCB2YWx1ZSkge1xyXG4gICAgaWYgKCFwcml2YXRlTWFwLmhhcyhyZWNlaXZlcikpIHtcclxuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiYXR0ZW1wdGVkIHRvIHNldCBwcml2YXRlIGZpZWxkIG9uIG5vbi1pbnN0YW5jZVwiKTtcclxuICAgIH1cclxuICAgIHByaXZhdGVNYXAuc2V0KHJlY2VpdmVyLCB2YWx1ZSk7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIifQ==