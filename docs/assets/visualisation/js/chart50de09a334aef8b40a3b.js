(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_plot_api_plot_api_js-node_modules_plotly_js_src_plots_domain_js"],{

/***/ "./node_modules/gl-mat4/fromQuat.js":
/*!******************************************!*\
  !*** ./node_modules/gl-mat4/fromQuat.js ***!
  \******************************************/
/***/ ((module) => {

module.exports = fromQuat;

/**
 * Creates a matrix from a quaternion rotation.
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @returns {mat4} out
 */
function fromQuat(out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/***/ }),

/***/ "./node_modules/plotly.js/src/lib/queue.js":
/*!*************************************************!*\
  !*** ./node_modules/plotly.js/src/lib/queue.js ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Lib = __webpack_require__(/*! ../lib */ "./node_modules/plotly.js/src/lib/index.js");
var dfltConfig = __webpack_require__(/*! ../plot_api/plot_config */ "./node_modules/plotly.js/src/plot_api/plot_config.js").dfltConfig;

/**
 * Copy arg array *without* removing `undefined` values from objects.
 *
 * @param gd
 * @param args
 * @returns {Array}
 */
function copyArgArray(gd, args) {
    var copy = [];
    var arg;

    for(var i = 0; i < args.length; i++) {
        arg = args[i];

        if(arg === gd) copy[i] = arg;
        else if(typeof arg === 'object') {
            copy[i] = Array.isArray(arg) ?
                Lib.extendDeep([], arg) :
                Lib.extendDeepAll({}, arg);
        } else copy[i] = arg;
    }

    return copy;
}


// -----------------------------------------------------
// Undo/Redo queue for plots
// -----------------------------------------------------


var queue = {};

// TODO: disable/enable undo and redo buttons appropriately

/**
 * Add an item to the undoQueue for a graphDiv
 *
 * @param gd
 * @param undoFunc Function undo this operation
 * @param undoArgs Args to supply undoFunc with
 * @param redoFunc Function to redo this operation
 * @param redoArgs Args to supply redoFunc with
 */
queue.add = function(gd, undoFunc, undoArgs, redoFunc, redoArgs) {
    var queueObj,
        queueIndex;

    // make sure we have the queue and our position in it
    gd.undoQueue = gd.undoQueue || {index: 0, queue: [], sequence: false};
    queueIndex = gd.undoQueue.index;

    // if we're already playing an undo or redo, or if this is an auto operation
    // (like pane resize... any others?) then we don't save this to the undo queue
    if(gd.autoplay) {
        if(!gd.undoQueue.inSequence) gd.autoplay = false;
        return;
    }

    // if we're not in a sequence or are just starting, we need a new queue item
    if(!gd.undoQueue.sequence || gd.undoQueue.beginSequence) {
        queueObj = {undo: {calls: [], args: []}, redo: {calls: [], args: []}};
        gd.undoQueue.queue.splice(queueIndex, gd.undoQueue.queue.length - queueIndex, queueObj);
        gd.undoQueue.index += 1;
    } else {
        queueObj = gd.undoQueue.queue[queueIndex - 1];
    }
    gd.undoQueue.beginSequence = false;

    // we unshift to handle calls for undo in a forward for loop later
    if(queueObj) {
        queueObj.undo.calls.unshift(undoFunc);
        queueObj.undo.args.unshift(undoArgs);
        queueObj.redo.calls.push(redoFunc);
        queueObj.redo.args.push(redoArgs);
    }

    if(gd.undoQueue.queue.length > dfltConfig.queueLength) {
        gd.undoQueue.queue.shift();
        gd.undoQueue.index--;
    }
};

/**
 * Begin a sequence of undoQueue changes
 *
 * @param gd
 */
queue.startSequence = function(gd) {
    gd.undoQueue = gd.undoQueue || {index: 0, queue: [], sequence: false};
    gd.undoQueue.sequence = true;
    gd.undoQueue.beginSequence = true;
};

/**
 * Stop a sequence of undoQueue changes
 *
 * Call this *after* you're sure your undo chain has ended
 *
 * @param gd
 */
queue.stopSequence = function(gd) {
    gd.undoQueue = gd.undoQueue || {index: 0, queue: [], sequence: false};
    gd.undoQueue.sequence = false;
    gd.undoQueue.beginSequence = false;
};

/**
 * Move one step back in the undo queue, and undo the object there.
 *
 * @param gd
 */
queue.undo = function undo(gd) {
    var queueObj, i;

    if(gd.framework && gd.framework.isPolar) {
        gd.framework.undo();
        return;
    }
    if(gd.undoQueue === undefined ||
            isNaN(gd.undoQueue.index) ||
            gd.undoQueue.index <= 0) {
        return;
    }

    // index is pointing to next *forward* queueObj, point to the one we're undoing
    gd.undoQueue.index--;

    // get the queueObj for instructions on how to undo
    queueObj = gd.undoQueue.queue[gd.undoQueue.index];

    // this sequence keeps things from adding to the queue during undo/redo
    gd.undoQueue.inSequence = true;
    for(i = 0; i < queueObj.undo.calls.length; i++) {
        queue.plotDo(gd, queueObj.undo.calls[i], queueObj.undo.args[i]);
    }
    gd.undoQueue.inSequence = false;
    gd.autoplay = false;
};

/**
 * Redo the current object in the undo, then move forward in the queue.
 *
 * @param gd
 */
queue.redo = function redo(gd) {
    var queueObj, i;

    if(gd.framework && gd.framework.isPolar) {
        gd.framework.redo();
        return;
    }
    if(gd.undoQueue === undefined ||
            isNaN(gd.undoQueue.index) ||
            gd.undoQueue.index >= gd.undoQueue.queue.length) {
        return;
    }

    // get the queueObj for instructions on how to undo
    queueObj = gd.undoQueue.queue[gd.undoQueue.index];

    // this sequence keeps things from adding to the queue during undo/redo
    gd.undoQueue.inSequence = true;
    for(i = 0; i < queueObj.redo.calls.length; i++) {
        queue.plotDo(gd, queueObj.redo.calls[i], queueObj.redo.args[i]);
    }
    gd.undoQueue.inSequence = false;
    gd.autoplay = false;

    // index is pointing to the thing we just redid, move it
    gd.undoQueue.index++;
};

/**
 * Called by undo/redo to make the actual changes.
 *
 * Not meant to be called publically, but included for mocking out in tests.
 *
 * @param gd
 * @param func
 * @param args
 */
queue.plotDo = function(gd, func, args) {
    gd.autoplay = true;

    // this *won't* copy gd and it preserves `undefined` properties!
    args = copyArgArray(gd, args);

    // call the supplied function
    func.apply(null, args);
};

module.exports = queue;


/***/ }),

/***/ "./node_modules/plotly.js/src/plot_api/container_array_match.js":
/*!**********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plot_api/container_array_match.js ***!
  \**********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var Registry = __webpack_require__(/*! ../registry */ "./node_modules/plotly.js/src/registry.js");

/*
 * containerArrayMatch: does this attribute string point into a
 * layout container array?
 *
 * @param {String} astr: an attribute string, like *annotations[2].text*
 *
 * @returns {Object | false} Returns false if `astr` doesn't match a container
 *  array. If it does, returns:
 *     {array: {String}, index: {Number}, property: {String}}
 *  ie the attribute string for the array, the index within the array (or ''
 *  if the whole array) and the property within that (or '' if the whole array
 *  or the whole object)
 */
module.exports = function containerArrayMatch(astr) {
    var rootContainers = Registry.layoutArrayContainers;
    var regexpContainers = Registry.layoutArrayRegexes;
    var rootPart = astr.split('[')[0];
    var arrayStr;
    var match;

    // look for regexp matches first, because they may be nested inside root matches
    // eg updatemenus[i].buttons is nested inside updatemenus
    for(var i = 0; i < regexpContainers.length; i++) {
        match = astr.match(regexpContainers[i]);
        if(match && match.index === 0) {
            arrayStr = match[0];
            break;
        }
    }

    // now look for root matches
    if(!arrayStr) arrayStr = rootContainers[rootContainers.indexOf(rootPart)];

    if(!arrayStr) return false;

    var tail = astr.substr(arrayStr.length);
    if(!tail) return {array: arrayStr, index: '', property: ''};

    match = tail.match(/^\[(0|[1-9][0-9]*)\](\.(.+))?$/);
    if(!match) return false;

    return {array: arrayStr, index: Number(match[1]), property: match[3] || ''};
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plot_api/helpers.js":
/*!********************************************************!*\
  !*** ./node_modules/plotly.js/src/plot_api/helpers.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var m4FromQuat = __webpack_require__(/*! gl-mat4/fromQuat */ "./node_modules/gl-mat4/fromQuat.js");

var Registry = __webpack_require__(/*! ../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Plots = __webpack_require__(/*! ../plots/plots */ "./node_modules/plotly.js/src/plots/plots.js");
var AxisIds = __webpack_require__(/*! ../plots/cartesian/axis_ids */ "./node_modules/plotly.js/src/plots/cartesian/axis_ids.js");
var Color = __webpack_require__(/*! ../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var cleanId = AxisIds.cleanId;
var getFromTrace = AxisIds.getFromTrace;
var traceIs = Registry.traceIs;

// clear the promise queue if one of them got rejected
exports.clearPromiseQueue = function(gd) {
    if(Array.isArray(gd._promises) && gd._promises.length > 0) {
        Lib.log('Clearing previous rejected promises from queue.');
    }

    gd._promises = [];
};

// make a few changes to the layout right away
// before it gets used for anything
// backward compatibility and cleanup of nonstandard options
exports.cleanLayout = function(layout) {
    var i, j;

    if(!layout) layout = {};

    // cannot have (x|y)axis1, numbering goes axis, axis2, axis3...
    if(layout.xaxis1) {
        if(!layout.xaxis) layout.xaxis = layout.xaxis1;
        delete layout.xaxis1;
    }
    if(layout.yaxis1) {
        if(!layout.yaxis) layout.yaxis = layout.yaxis1;
        delete layout.yaxis1;
    }
    if(layout.scene1) {
        if(!layout.scene) layout.scene = layout.scene1;
        delete layout.scene1;
    }

    var axisAttrRegex = (Plots.subplotsRegistry.cartesian || {}).attrRegex;
    var polarAttrRegex = (Plots.subplotsRegistry.polar || {}).attrRegex;
    var ternaryAttrRegex = (Plots.subplotsRegistry.ternary || {}).attrRegex;
    var sceneAttrRegex = (Plots.subplotsRegistry.gl3d || {}).attrRegex;

    var keys = Object.keys(layout);
    for(i = 0; i < keys.length; i++) {
        var key = keys[i];

        if(axisAttrRegex && axisAttrRegex.test(key)) {
            // modifications to cartesian axes

            var ax = layout[key];
            if(ax.anchor && ax.anchor !== 'free') {
                ax.anchor = cleanId(ax.anchor);
            }
            if(ax.overlaying) ax.overlaying = cleanId(ax.overlaying);

            // old method of axis type - isdate and islog (before category existed)
            if(!ax.type) {
                if(ax.isdate) ax.type = 'date';
                else if(ax.islog) ax.type = 'log';
                else if(ax.isdate === false && ax.islog === false) ax.type = 'linear';
            }
            if(ax.autorange === 'withzero' || ax.autorange === 'tozero') {
                ax.autorange = true;
                ax.rangemode = 'tozero';
            }
            delete ax.islog;
            delete ax.isdate;
            delete ax.categories; // replaced by _categories

            // prune empty domain arrays made before the new nestedProperty
            if(emptyContainer(ax, 'domain')) delete ax.domain;

            // autotick -> tickmode
            if(ax.autotick !== undefined) {
                if(ax.tickmode === undefined) {
                    ax.tickmode = ax.autotick ? 'auto' : 'linear';
                }
                delete ax.autotick;
            }

            cleanTitle(ax);
        } else if(polarAttrRegex && polarAttrRegex.test(key)) {
            // modifications for polar

            var polar = layout[key];
            cleanTitle(polar.radialaxis);
        } else if(ternaryAttrRegex && ternaryAttrRegex.test(key)) {
            // modifications for ternary

            var ternary = layout[key];
            cleanTitle(ternary.aaxis);
            cleanTitle(ternary.baxis);
            cleanTitle(ternary.caxis);
        } else if(sceneAttrRegex && sceneAttrRegex.test(key)) {
            // modifications for 3D scenes

            var scene = layout[key];

            // clean old Camera coords
            var cameraposition = scene.cameraposition;

            if(Array.isArray(cameraposition) && cameraposition[0].length === 4) {
                var rotation = cameraposition[0];
                var center = cameraposition[1];
                var radius = cameraposition[2];
                var mat = m4FromQuat([], rotation);
                var eye = [];

                for(j = 0; j < 3; ++j) {
                    eye[j] = center[j] + radius * mat[2 + 4 * j];
                }

                scene.camera = {
                    eye: {x: eye[0], y: eye[1], z: eye[2]},
                    center: {x: center[0], y: center[1], z: center[2]},
                    up: {x: 0, y: 0, z: 1} // we just ignore calculating camera z up in this case
                };

                delete scene.cameraposition;
            }

            // clean axis titles
            cleanTitle(scene.xaxis);
            cleanTitle(scene.yaxis);
            cleanTitle(scene.zaxis);
        }
    }

    var annotationsLen = Array.isArray(layout.annotations) ? layout.annotations.length : 0;
    for(i = 0; i < annotationsLen; i++) {
        var ann = layout.annotations[i];

        if(!Lib.isPlainObject(ann)) continue;

        if(ann.ref) {
            if(ann.ref === 'paper') {
                ann.xref = 'paper';
                ann.yref = 'paper';
            } else if(ann.ref === 'data') {
                ann.xref = 'x';
                ann.yref = 'y';
            }
            delete ann.ref;
        }

        cleanAxRef(ann, 'xref');
        cleanAxRef(ann, 'yref');
    }

    var shapesLen = Array.isArray(layout.shapes) ? layout.shapes.length : 0;
    for(i = 0; i < shapesLen; i++) {
        var shape = layout.shapes[i];

        if(!Lib.isPlainObject(shape)) continue;

        cleanAxRef(shape, 'xref');
        cleanAxRef(shape, 'yref');
    }

    var legend = layout.legend;
    if(legend) {
        // check for old-style legend positioning (x or y is +/- 100)
        if(legend.x > 3) {
            legend.x = 1.02;
            legend.xanchor = 'left';
        } else if(legend.x < -2) {
            legend.x = -0.02;
            legend.xanchor = 'right';
        }

        if(legend.y > 3) {
            legend.y = 1.02;
            legend.yanchor = 'bottom';
        } else if(legend.y < -2) {
            legend.y = -0.02;
            legend.yanchor = 'top';
        }
    }

    // clean plot title
    cleanTitle(layout);

    /*
     * Moved from rotate -> orbit for dragmode
     */
    if(layout.dragmode === 'rotate') layout.dragmode = 'orbit';

    // sanitize rgb(fractions) and rgba(fractions) that old tinycolor
    // supported, but new tinycolor does not because they're not valid css
    Color.clean(layout);

    // clean the layout container in layout.template
    if(layout.template && layout.template.layout) {
        exports.cleanLayout(layout.template.layout);
    }

    return layout;
};

function cleanAxRef(container, attr) {
    var valIn = container[attr];
    var axLetter = attr.charAt(0);
    if(valIn && valIn !== 'paper') {
        container[attr] = cleanId(valIn, axLetter);
    }
}

/**
 * Cleans up old title attribute structure (flat) in favor of the new one (nested).
 *
 * @param {Object} titleContainer - an object potentially including deprecated title attributes
 */
function cleanTitle(titleContainer) {
    if(titleContainer) {
        // title -> title.text
        // (although title used to be a string attribute,
        // numbers are accepted as well)
        if(typeof titleContainer.title === 'string' || typeof titleContainer.title === 'number') {
            titleContainer.title = {
                text: titleContainer.title
            };
        }

        rewireAttr('titlefont', 'font');
        rewireAttr('titleposition', 'position');
        rewireAttr('titleside', 'side');
        rewireAttr('titleoffset', 'offset');
    }

    function rewireAttr(oldAttrName, newAttrName) {
        var oldAttrSet = titleContainer[oldAttrName];
        var newAttrSet = titleContainer.title && titleContainer.title[newAttrName];

        if(oldAttrSet && !newAttrSet) {
            // Ensure title object exists
            if(!titleContainer.title) {
                titleContainer.title = {};
            }

            titleContainer.title[newAttrName] = titleContainer[oldAttrName];
            delete titleContainer[oldAttrName];
        }
    }
}

/*
 * cleanData: Make a few changes to the data for backward compatibility
 * before it gets used for anything. Modifies the data traces users provide.
 *
 * Important: if you're going to add something here that modifies a data array,
 * update it in place so the new array === the old one.
 */
exports.cleanData = function(data) {
    for(var tracei = 0; tracei < data.length; tracei++) {
        var trace = data[tracei];
        var i;

        // use xbins to bin data in x, and ybins to bin data in y
        if(trace.type === 'histogramy' && 'xbins' in trace && !('ybins' in trace)) {
            trace.ybins = trace.xbins;
            delete trace.xbins;
        }

        // error_y.opacity is obsolete - merge into color
        if(trace.error_y && 'opacity' in trace.error_y) {
            var dc = Color.defaults;
            var yeColor = trace.error_y.color || (traceIs(trace, 'bar') ?
                Color.defaultLine :
                dc[tracei % dc.length]);
            trace.error_y.color = Color.addOpacity(
                Color.rgb(yeColor),
                Color.opacity(yeColor) * trace.error_y.opacity);
            delete trace.error_y.opacity;
        }

        // convert bardir to orientation, and put the data into
        // the axes it's eventually going to be used with
        if('bardir' in trace) {
            if(trace.bardir === 'h' && (traceIs(trace, 'bar') ||
                trace.type.substr(0, 9) === 'histogram')) {
                trace.orientation = 'h';
                exports.swapXYData(trace);
            }
            delete trace.bardir;
        }

        // now we have only one 1D histogram type, and whether
        // it uses x or y data depends on trace.orientation
        if(trace.type === 'histogramy') exports.swapXYData(trace);
        if(trace.type === 'histogramx' || trace.type === 'histogramy') {
            trace.type = 'histogram';
        }

        // scl->scale, reversescl->reversescale
        if('scl' in trace && !('colorscale' in trace)) {
            trace.colorscale = trace.scl;
            delete trace.scl;
        }
        if('reversescl' in trace && !('reversescale' in trace)) {
            trace.reversescale = trace.reversescl;
            delete trace.reversescl;
        }

        // axis ids x1 -> x, y1-> y
        if(trace.xaxis) trace.xaxis = cleanId(trace.xaxis, 'x');
        if(trace.yaxis) trace.yaxis = cleanId(trace.yaxis, 'y');

        // scene ids scene1 -> scene
        if(traceIs(trace, 'gl3d') && trace.scene) {
            trace.scene = Plots.subplotsRegistry.gl3d.cleanId(trace.scene);
        }

        if(!traceIs(trace, 'pie-like') && !traceIs(trace, 'bar-like')) {
            if(Array.isArray(trace.textposition)) {
                for(i = 0; i < trace.textposition.length; i++) {
                    trace.textposition[i] = cleanTextPosition(trace.textposition[i]);
                }
            } else if(trace.textposition) {
                trace.textposition = cleanTextPosition(trace.textposition);
            }
        }

        // fix typo in colorscale definition
        var _module = Registry.getModule(trace);
        if(_module && _module.colorbar) {
            var containerName = _module.colorbar.container;
            var container = containerName ? trace[containerName] : trace;
            if(container && container.colorscale) {
                if(container.colorscale === 'YIGnBu') container.colorscale = 'YlGnBu';
                if(container.colorscale === 'YIOrRd') container.colorscale = 'YlOrRd';
            }
        }

        // fix typo in surface 'highlight*' definitions
        if(trace.type === 'surface' && Lib.isPlainObject(trace.contours)) {
            var dims = ['x', 'y', 'z'];

            for(i = 0; i < dims.length; i++) {
                var opts = trace.contours[dims[i]];

                if(!Lib.isPlainObject(opts)) continue;

                if(opts.highlightColor) {
                    opts.highlightcolor = opts.highlightColor;
                    delete opts.highlightColor;
                }

                if(opts.highlightWidth) {
                    opts.highlightwidth = opts.highlightWidth;
                    delete opts.highlightWidth;
                }
            }
        }

        // fixes from converting finance from transforms to real trace types
        if(trace.type === 'candlestick' || trace.type === 'ohlc') {
            var increasingShowlegend = (trace.increasing || {}).showlegend !== false;
            var decreasingShowlegend = (trace.decreasing || {}).showlegend !== false;
            var increasingName = cleanFinanceDir(trace.increasing);
            var decreasingName = cleanFinanceDir(trace.decreasing);

            // now figure out something smart to do with the separate direction
            // names we removed
            if((increasingName !== false) && (decreasingName !== false)) {
                // both sub-names existed: base name previously had no effect
                // so ignore it and try to find a shared part of the sub-names

                var newName = commonPrefix(
                    increasingName, decreasingName,
                    increasingShowlegend, decreasingShowlegend
                );
                // if no common part, leave whatever name was (or wasn't) there
                if(newName) trace.name = newName;
            } else if((increasingName || decreasingName) && !trace.name) {
                // one sub-name existed but not the base name - just use the sub-name
                trace.name = increasingName || decreasingName;
            }
        }

        // transforms backward compatibility fixes
        if(Array.isArray(trace.transforms)) {
            var transforms = trace.transforms;

            for(i = 0; i < transforms.length; i++) {
                var transform = transforms[i];

                if(!Lib.isPlainObject(transform)) continue;

                switch(transform.type) {
                    case 'filter':
                        if(transform.filtersrc) {
                            transform.target = transform.filtersrc;
                            delete transform.filtersrc;
                        }

                        if(transform.calendar) {
                            if(!transform.valuecalendar) {
                                transform.valuecalendar = transform.calendar;
                            }
                            delete transform.calendar;
                        }
                        break;

                    case 'groupby':
                        // Name has changed from `style` to `styles`, so use `style` but prefer `styles`:
                        transform.styles = transform.styles || transform.style;

                        if(transform.styles && !Array.isArray(transform.styles)) {
                            var prevStyles = transform.styles;
                            var styleKeys = Object.keys(prevStyles);

                            transform.styles = [];
                            for(var j = 0; j < styleKeys.length; j++) {
                                transform.styles.push({
                                    target: styleKeys[j],
                                    value: prevStyles[styleKeys[j]]
                                });
                            }
                        }
                        break;
                }
            }
        }

        // prune empty containers made before the new nestedProperty
        if(emptyContainer(trace, 'line')) delete trace.line;
        if('marker' in trace) {
            if(emptyContainer(trace.marker, 'line')) delete trace.marker.line;
            if(emptyContainer(trace, 'marker')) delete trace.marker;
        }

        // sanitize rgb(fractions) and rgba(fractions) that old tinycolor
        // supported, but new tinycolor does not because they're not valid css
        Color.clean(trace);

        // remove obsolete autobin(x|y) attributes, but only if true
        // if false, this needs to happen in Histogram.calc because it
        // can be a one-time autobin so we need to know the results before
        // we can push them back into the trace.
        if(trace.autobinx) {
            delete trace.autobinx;
            delete trace.xbins;
        }
        if(trace.autobiny) {
            delete trace.autobiny;
            delete trace.ybins;
        }

        cleanTitle(trace);
        if(trace.colorbar) cleanTitle(trace.colorbar);
        if(trace.marker && trace.marker.colorbar) cleanTitle(trace.marker.colorbar);
        if(trace.line && trace.line.colorbar) cleanTitle(trace.line.colorbar);
        if(trace.aaxis) cleanTitle(trace.aaxis);
        if(trace.baxis) cleanTitle(trace.baxis);
    }
};

function cleanFinanceDir(dirContainer) {
    if(!Lib.isPlainObject(dirContainer)) return false;

    var dirName = dirContainer.name;

    delete dirContainer.name;
    delete dirContainer.showlegend;

    return (typeof dirName === 'string' || typeof dirName === 'number') && String(dirName);
}

function commonPrefix(name1, name2, show1, show2) {
    // if only one is shown in the legend, use that
    if(show1 && !show2) return name1;
    if(show2 && !show1) return name2;

    // if both or neither are in the legend, check if one is blank (or whitespace)
    // and use the other one
    // note that hover labels can still use the name even if the legend doesn't
    if(!name1.trim()) return name2;
    if(!name2.trim()) return name1;

    var minLen = Math.min(name1.length, name2.length);
    var i;
    for(i = 0; i < minLen; i++) {
        if(name1.charAt(i) !== name2.charAt(i)) break;
    }

    var out = name1.substr(0, i);
    return out.trim();
}

// textposition - support partial attributes (ie just 'top')
// and incorrect use of middle / center etc.
function cleanTextPosition(textposition) {
    var posY = 'middle';
    var posX = 'center';

    if(typeof textposition === 'string') {
        if(textposition.indexOf('top') !== -1) posY = 'top';
        else if(textposition.indexOf('bottom') !== -1) posY = 'bottom';

        if(textposition.indexOf('left') !== -1) posX = 'left';
        else if(textposition.indexOf('right') !== -1) posX = 'right';
    }

    return posY + ' ' + posX;
}

function emptyContainer(outer, innerStr) {
    return (innerStr in outer) &&
        (typeof outer[innerStr] === 'object') &&
        (Object.keys(outer[innerStr]).length === 0);
}


// swap all the data and data attributes associated with x and y
exports.swapXYData = function(trace) {
    var i;
    Lib.swapAttrs(trace, ['?', '?0', 'd?', '?bins', 'nbins?', 'autobin?', '?src', 'error_?']);
    if(Array.isArray(trace.z) && Array.isArray(trace.z[0])) {
        if(trace.transpose) delete trace.transpose;
        else trace.transpose = true;
    }
    if(trace.error_x && trace.error_y) {
        var errorY = trace.error_y;
        var copyYstyle = ('copy_ystyle' in errorY) ?
            errorY.copy_ystyle :
            !(errorY.color || errorY.thickness || errorY.width);
        Lib.swapAttrs(trace, ['error_?.copy_ystyle']);
        if(copyYstyle) {
            Lib.swapAttrs(trace, ['error_?.color', 'error_?.thickness', 'error_?.width']);
        }
    }
    if(typeof trace.hoverinfo === 'string') {
        var hoverInfoParts = trace.hoverinfo.split('+');
        for(i = 0; i < hoverInfoParts.length; i++) {
            if(hoverInfoParts[i] === 'x') hoverInfoParts[i] = 'y';
            else if(hoverInfoParts[i] === 'y') hoverInfoParts[i] = 'x';
        }
        trace.hoverinfo = hoverInfoParts.join('+');
    }
};

// coerce traceIndices input to array of trace indices
exports.coerceTraceIndices = function(gd, traceIndices) {
    if(isNumeric(traceIndices)) {
        return [traceIndices];
    } else if(!Array.isArray(traceIndices) || !traceIndices.length) {
        return gd.data.map(function(_, i) { return i; });
    } else if(Array.isArray(traceIndices)) {
        var traceIndicesOut = [];
        for(var i = 0; i < traceIndices.length; i++) {
            if(Lib.isIndex(traceIndices[i], gd.data.length)) {
                traceIndicesOut.push(traceIndices[i]);
            } else {
                Lib.warn('trace index (', traceIndices[i], ') is not a number or is out of bounds');
            }
        }
        return traceIndicesOut;
    }

    return traceIndices;
};

/**
 * Manages logic around array container item creation / deletion / update
 * that nested property alone can't handle.
 *
 * @param {Object} np
 *  nested property of update attribute string about trace or layout object
 * @param {*} newVal
 *  update value passed to restyle / relayout / update
 * @param {Object} undoit
 *  undo hash (N.B. undoit may be mutated here).
 *
 */
exports.manageArrayContainers = function(np, newVal, undoit) {
    var obj = np.obj;
    var parts = np.parts;
    var pLength = parts.length;
    var pLast = parts[pLength - 1];

    var pLastIsNumber = isNumeric(pLast);

    if(pLastIsNumber && newVal === null) {
        // delete item

        // Clear item in array container when new value is null
        var contPath = parts.slice(0, pLength - 1).join('.');
        var cont = Lib.nestedProperty(obj, contPath).get();
        cont.splice(pLast, 1);

        // Note that nested property clears null / undefined at end of
        // array container, but not within them.
    } else if(pLastIsNumber && np.get() === undefined) {
        // create item

        // When adding a new item, make sure undo command will remove it
        if(np.get() === undefined) undoit[np.astr] = null;

        np.set(newVal);
    } else {
        // update item

        // If the last part of attribute string isn't a number,
        // np.set is all we need.
        np.set(newVal);
    }
};

/*
 * Match the part to strip off to turn an attribute into its parent
 * really it should be either '.some_characters' or '[number]'
 * but we're a little more permissive here and match either
 * '.not_brackets_or_dot' or '[not_brackets_or_dot]'
 */
var ATTR_TAIL_RE = /(\.[^\[\]\.]+|\[[^\[\]\.]+\])$/;

function getParent(attr) {
    var tail = attr.search(ATTR_TAIL_RE);
    if(tail > 0) return attr.substr(0, tail);
}

/*
 * hasParent: does an attribute object contain a parent of the given attribute?
 * for example, given 'images[2].x' do we also have 'images' or 'images[2]'?
 *
 * @param {Object} aobj
 *  update object, whose keys are attribute strings and values are their new settings
 * @param {string} attr
 *  the attribute string to test against
 * @returns {Boolean}
 *  is a parent of attr present in aobj?
 */
exports.hasParent = function(aobj, attr) {
    var attrParent = getParent(attr);
    while(attrParent) {
        if(attrParent in aobj) return true;
        attrParent = getParent(attrParent);
    }
    return false;
};

/**
 * Empty out types for all axes containing these traces so we auto-set them again
 *
 * @param {object} gd
 * @param {[integer]} traces: trace indices to search for axes to clear the types of
 * @param {object} layoutUpdate: any update being done concurrently to the layout,
 *   which may supercede clearing the axis types
 */
var axLetters = ['x', 'y', 'z'];
exports.clearAxisTypes = function(gd, traces, layoutUpdate) {
    for(var i = 0; i < traces.length; i++) {
        var trace = gd._fullData[i];
        for(var j = 0; j < 3; j++) {
            var ax = getFromTrace(gd, trace, axLetters[j]);

            // do not clear log type - that's never an auto result so must have been intentional
            if(ax && ax.type !== 'log') {
                var axAttr = ax._name;
                var sceneName = ax._id.substr(1);
                if(sceneName.substr(0, 5) === 'scene') {
                    if(layoutUpdate[sceneName] !== undefined) continue;
                    axAttr = sceneName + '.' + axAttr;
                }
                var typeAttr = axAttr + '.type';

                if(layoutUpdate[axAttr] === undefined && layoutUpdate[typeAttr] === undefined) {
                    Lib.nestedProperty(gd.layout, typeAttr).set(null);
                }
            }
        }
    }
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plot_api/manage_arrays.js":
/*!**************************************************************!*\
  !*** ./node_modules/plotly.js/src/plot_api/manage_arrays.js ***!
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




var isPlainObject = __webpack_require__(/*! ../lib/is_plain_object */ "./node_modules/plotly.js/src/lib/is_plain_object.js");
var noop = __webpack_require__(/*! ../lib/noop */ "./node_modules/plotly.js/src/lib/noop.js");
var Loggers = __webpack_require__(/*! ../lib/loggers */ "./node_modules/plotly.js/src/lib/loggers.js");
var sorterAsc = __webpack_require__(/*! ../lib/search */ "./node_modules/plotly.js/src/lib/search.js").sorterAsc;
var Registry = __webpack_require__(/*! ../registry */ "./node_modules/plotly.js/src/registry.js");


exports.containerArrayMatch = __webpack_require__(/*! ./container_array_match */ "./node_modules/plotly.js/src/plot_api/container_array_match.js");

var isAddVal = exports.isAddVal = function isAddVal(val) {
    return val === 'add' || isPlainObject(val);
};

var isRemoveVal = exports.isRemoveVal = function isRemoveVal(val) {
    return val === null || val === 'remove';
};

/*
 * applyContainerArrayChanges: for managing arrays of layout components in relayout
 * handles them all with a consistent interface.
 *
 * Here are the supported actions -> relayout calls -> edits we get here
 * (as prepared in _relayout):
 *
 * add an empty obj -> {'annotations[2]': 'add'} -> {2: {'': 'add'}}
 * add a specific obj -> {'annotations[2]': {attrs}} -> {2: {'': {attrs}}}
 * delete an obj -> {'annotations[2]': 'remove'} -> {2: {'': 'remove'}}
 *               -> {'annotations[2]': null} -> {2: {'': null}}
 * delete the whole array -> {'annotations': 'remove'} -> {'': {'': 'remove'}}
 *                        -> {'annotations': null} -> {'': {'': null}}
 * edit an object -> {'annotations[2].text': 'boo'} -> {2: {'text': 'boo'}}
 *
 * You can combine many edits to different objects. Objects are added and edited
 * in ascending order, then removed in descending order.
 * For example, starting with [a, b, c], if you want to:
 * - replace b with d:
 *   {'annotations[1]': d, 'annotations[2]': null} (b is item 2 after adding d)
 * - add a new item d between a and b, and edit b:
 *    {'annotations[1]': d, 'annotations[2].x': newX} (b is item 2 after adding d)
 * - delete b and edit c:
 *    {'annotations[1]': null, 'annotations[2].x': newX} (c is edited before b is removed)
 *
 * You CANNOT combine adding/deleting an item at index `i` with edits to the same index `i`
 * You CANNOT combine replacing/deleting the whole array with anything else (for the same array).
 *
 * @param {HTMLDivElement} gd
 *  the DOM element of the graph container div
 * @param {Lib.nestedProperty} componentType: the array we are editing
 * @param {Object} edits
 *  the changes to make; keys are indices to edit, values are themselves objects:
 *  {attr: newValue} of changes to make to that index (with add/remove behavior
 *  in special values of the empty attr)
 * @param {Object} flags
 *  the flags for which actions we're going to perform to display these (and
 *  any other) changes. If we're already `recalc`ing, we don't need to redraw
 *  individual items
 * @param {function} _nestedProperty
 *  a (possibly modified for gui edits) nestedProperty constructor
 *  The modified version takes a 3rd argument, for a prefix to the attribute
 *  string necessary for storing GUI edits
 *
 * @returns {bool} `true` if it managed to complete drawing of the changes
 *  `false` would mean the parent should replot.
 */
exports.applyContainerArrayChanges = function applyContainerArrayChanges(gd, np, edits, flags, _nestedProperty) {
    var componentType = np.astr;
    var supplyComponentDefaults = Registry.getComponentMethod(componentType, 'supplyLayoutDefaults');
    var draw = Registry.getComponentMethod(componentType, 'draw');
    var drawOne = Registry.getComponentMethod(componentType, 'drawOne');
    var replotLater = flags.replot || flags.recalc || (supplyComponentDefaults === noop) || (draw === noop);
    var layout = gd.layout;
    var fullLayout = gd._fullLayout;

    if(edits['']) {
        if(Object.keys(edits).length > 1) {
            Loggers.warn('Full array edits are incompatible with other edits',
                componentType);
        }

        var fullVal = edits[''][''];

        if(isRemoveVal(fullVal)) np.set(null);
        else if(Array.isArray(fullVal)) np.set(fullVal);
        else {
            Loggers.warn('Unrecognized full array edit value', componentType, fullVal);
            return true;
        }

        if(replotLater) return false;

        supplyComponentDefaults(layout, fullLayout);
        draw(gd);
        return true;
    }

    var componentNums = Object.keys(edits).map(Number).sort(sorterAsc);
    var componentArrayIn = np.get();
    var componentArray = componentArrayIn || [];
    // componentArrayFull is used just to keep splices in line between
    // full and input arrays, so private keys can be copied over after
    // redoing supplyDefaults
    // TODO: this assumes componentArray is in gd.layout - which will not be
    // true after we extend this to restyle
    var componentArrayFull = _nestedProperty(fullLayout, componentType).get();

    var deletes = [];
    var firstIndexChange = -1;
    var maxIndex = componentArray.length;
    var i;
    var j;
    var componentNum;
    var objEdits;
    var objKeys;
    var objVal;
    var adding, prefix;

    // first make the add and edit changes
    for(i = 0; i < componentNums.length; i++) {
        componentNum = componentNums[i];
        objEdits = edits[componentNum];
        objKeys = Object.keys(objEdits);
        objVal = objEdits[''],
        adding = isAddVal(objVal);

        if(componentNum < 0 || componentNum > componentArray.length - (adding ? 0 : 1)) {
            Loggers.warn('index out of range', componentType, componentNum);
            continue;
        }

        if(objVal !== undefined) {
            if(objKeys.length > 1) {
                Loggers.warn(
                    'Insertion & removal are incompatible with edits to the same index.',
                    componentType, componentNum);
            }

            if(isRemoveVal(objVal)) {
                deletes.push(componentNum);
            } else if(adding) {
                if(objVal === 'add') objVal = {};
                componentArray.splice(componentNum, 0, objVal);
                if(componentArrayFull) componentArrayFull.splice(componentNum, 0, {});
            } else {
                Loggers.warn('Unrecognized full object edit value',
                    componentType, componentNum, objVal);
            }

            if(firstIndexChange === -1) firstIndexChange = componentNum;
        } else {
            for(j = 0; j < objKeys.length; j++) {
                prefix = componentType + '[' + componentNum + '].';
                _nestedProperty(componentArray[componentNum], objKeys[j], prefix)
                    .set(objEdits[objKeys[j]]);
            }
        }
    }

    // now do deletes
    for(i = deletes.length - 1; i >= 0; i--) {
        componentArray.splice(deletes[i], 1);
        // TODO: this drops private keys that had been stored in componentArrayFull
        // does this have any ill effects?
        if(componentArrayFull) componentArrayFull.splice(deletes[i], 1);
    }

    if(!componentArray.length) np.set(null);
    else if(!componentArrayIn) np.set(componentArray);

    if(replotLater) return false;

    supplyComponentDefaults(layout, fullLayout);

    // finally draw all the components we need to
    // if we added or removed any, redraw all after it
    if(drawOne !== noop) {
        var indicesToDraw;
        if(firstIndexChange === -1) {
            // there's no re-indexing to do, so only redraw components that changed
            indicesToDraw = componentNums;
        } else {
            // in case the component array was shortened, we still need do call
            // drawOne on the latter items so they get properly removed
            maxIndex = Math.max(componentArray.length, maxIndex);
            indicesToDraw = [];
            for(i = 0; i < componentNums.length; i++) {
                componentNum = componentNums[i];
                if(componentNum >= firstIndexChange) break;
                indicesToDraw.push(componentNum);
            }
            for(i = firstIndexChange; i < maxIndex; i++) {
                indicesToDraw.push(i);
            }
        }
        for(i = 0; i < indicesToDraw.length; i++) {
            drawOne(gd, indicesToDraw[i]);
        }
    } else draw(gd);

    return true;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plot_api/plot_api.js":
/*!*********************************************************!*\
  !*** ./node_modules/plotly.js/src/plot_api/plot_api.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var isNumeric = __webpack_require__(/*! fast-isnumeric */ "./node_modules/fast-isnumeric/index.js");
var hasHover = __webpack_require__(/*! has-hover */ "./node_modules/has-hover/index.js");

var Lib = __webpack_require__(/*! ../lib */ "./node_modules/plotly.js/src/lib/index.js");
var nestedProperty = Lib.nestedProperty;

var Events = __webpack_require__(/*! ../lib/events */ "./node_modules/plotly.js/src/lib/events.js");
var Queue = __webpack_require__(/*! ../lib/queue */ "./node_modules/plotly.js/src/lib/queue.js");

var Registry = __webpack_require__(/*! ../registry */ "./node_modules/plotly.js/src/registry.js");
var PlotSchema = __webpack_require__(/*! ./plot_schema */ "./node_modules/plotly.js/src/plot_api/plot_schema.js");
var Plots = __webpack_require__(/*! ../plots/plots */ "./node_modules/plotly.js/src/plots/plots.js");
var Polar = __webpack_require__(/*! ../plots/polar/legacy */ "./node_modules/plotly.js/src/plots/polar/legacy/index.js");

var Axes = __webpack_require__(/*! ../plots/cartesian/axes */ "./node_modules/plotly.js/src/plots/cartesian/axes.js");
var Drawing = __webpack_require__(/*! ../components/drawing */ "./node_modules/plotly.js/src/components/drawing/index.js");
var Color = __webpack_require__(/*! ../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var initInteractions = __webpack_require__(/*! ../plots/cartesian/graph_interact */ "./node_modules/plotly.js/src/plots/cartesian/graph_interact.js").initInteractions;
var xmlnsNamespaces = __webpack_require__(/*! ../constants/xmlns_namespaces */ "./node_modules/plotly.js/src/constants/xmlns_namespaces.js");
var svgTextUtils = __webpack_require__(/*! ../lib/svg_text_utils */ "./node_modules/plotly.js/src/lib/svg_text_utils.js");
var clearSelect = __webpack_require__(/*! ../plots/cartesian/select */ "./node_modules/plotly.js/src/plots/cartesian/select.js").clearSelect;

var dfltConfig = __webpack_require__(/*! ./plot_config */ "./node_modules/plotly.js/src/plot_api/plot_config.js").dfltConfig;
var manageArrays = __webpack_require__(/*! ./manage_arrays */ "./node_modules/plotly.js/src/plot_api/manage_arrays.js");
var helpers = __webpack_require__(/*! ./helpers */ "./node_modules/plotly.js/src/plot_api/helpers.js");
var subroutines = __webpack_require__(/*! ./subroutines */ "./node_modules/plotly.js/src/plot_api/subroutines.js");
var editTypes = __webpack_require__(/*! ./edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js");

var AX_NAME_PATTERN = __webpack_require__(/*! ../plots/cartesian/constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js").AX_NAME_PATTERN;

var numericNameWarningCount = 0;
var numericNameWarningCountLimit = 5;

/**
 * Main plot-creation function
 *
 * @param {string id or DOM element} gd
 *      the id or DOM element of the graph container div
 * @param {array of objects} data
 *      array of traces, containing the data and display information for each trace
 * @param {object} layout
 *      object describing the overall display of the plot,
 *      all the stuff that doesn't pertain to any individual trace
 * @param {object} config
 *      configuration options (see ./plot_config.js for more info)
 *
 * OR
 *
 * @param {string id or DOM element} gd
 *      the id or DOM element of the graph container div
 * @param {object} figure
 *      object containing `data`, `layout`, `config`, and `frames` members
 *
 */
function plot(gd, data, layout, config) {
    var frames;

    gd = Lib.getGraphDiv(gd);

    // Events.init is idempotent and bails early if gd has already been init'd
    Events.init(gd);

    if(Lib.isPlainObject(data)) {
        var obj = data;
        data = obj.data;
        layout = obj.layout;
        config = obj.config;
        frames = obj.frames;
    }

    var okToPlot = Events.triggerHandler(gd, 'plotly_beforeplot', [data, layout, config]);
    if(okToPlot === false) return Promise.reject();

    // if there's no data or layout, and this isn't yet a plotly plot
    // container, log a warning to help plotly.js users debug
    if(!data && !layout && !Lib.isPlotDiv(gd)) {
        Lib.warn('Calling Plotly.plot as if redrawing ' +
            'but this container doesn\'t yet have a plot.', gd);
    }

    function addFrames() {
        if(frames) {
            return exports.addFrames(gd, frames);
        }
    }

    // transfer configuration options to gd until we move over to
    // a more OO like model
    setPlotContext(gd, config);

    if(!layout) layout = {};

    // hook class for plots main container (in case of plotly.js
    // this won't be #embedded-graph or .js-tab-contents)
    d3.select(gd).classed('js-plotly-plot', true);

    // off-screen getBoundingClientRect testing space,
    // in #js-plotly-tester (and stored as Drawing.tester)
    // so we can share cached text across tabs
    Drawing.makeTester();

    // collect promises for any async actions during plotting
    // any part of the plotting code can push to gd._promises, then
    // before we move to the next step, we check that they're all
    // complete, and empty out the promise list again.
    if(!Array.isArray(gd._promises)) gd._promises = [];

    var graphWasEmpty = ((gd.data || []).length === 0 && Array.isArray(data));

    // if there is already data on the graph, append the new data
    // if you only want to redraw, pass a non-array for data
    if(Array.isArray(data)) {
        helpers.cleanData(data);

        if(graphWasEmpty) gd.data = data;
        else gd.data.push.apply(gd.data, data);

        // for routines outside graph_obj that want a clean tab
        // (rather than appending to an existing one) gd.empty
        // is used to determine whether to make a new tab
        gd.empty = false;
    }

    if(!gd.layout || graphWasEmpty) {
        gd.layout = helpers.cleanLayout(layout);
    }

    Plots.supplyDefaults(gd);

    var fullLayout = gd._fullLayout;
    var hasCartesian = fullLayout._has('cartesian');

    // Legacy polar plots
    if(!fullLayout._has('polar') && data && data[0] && data[0].r) {
        Lib.log('Legacy polar charts are deprecated!');
        return plotLegacyPolar(gd, data, layout);
    }

    // so we don't try to re-call Plotly.plot from inside
    // legend and colorbar, if margins changed
    fullLayout._replotting = true;

    // make or remake the framework if we need to
    if(graphWasEmpty || fullLayout._shouldCreateBgLayer) {
        makePlotFramework(gd);

        if(fullLayout._shouldCreateBgLayer) {
            delete fullLayout._shouldCreateBgLayer;
        }
    }

    // polar need a different framework
    if(gd.framework !== makePlotFramework) {
        gd.framework = makePlotFramework;
        makePlotFramework(gd);
    }

    // clear gradient defs on each .plot call, because we know we'll loop through all traces
    Drawing.initGradients(gd);

    // save initial show spikes once per graph
    if(graphWasEmpty) Axes.saveShowSpikeInitial(gd);

    // prepare the data and find the autorange

    // generate calcdata, if we need to
    // to force redoing calcdata, just delete it before calling Plotly.plot
    var recalc = !gd.calcdata || gd.calcdata.length !== (gd._fullData || []).length;
    if(recalc) Plots.doCalcdata(gd);

    // in case it has changed, attach fullData traces to calcdata
    for(var i = 0; i < gd.calcdata.length; i++) {
        gd.calcdata[i][0].trace = gd._fullData[i];
    }

    // make the figure responsive
    if(gd._context.responsive) {
        if(!gd._responsiveChartHandler) {
            // Keep a reference to the resize handler to purge it down the road
            gd._responsiveChartHandler = function() { if(!Lib.isHidden(gd)) Plots.resize(gd); };

            // Listen to window resize
            window.addEventListener('resize', gd._responsiveChartHandler);
        }
    } else {
        Lib.clearResponsive(gd);
    }

    /*
     * start async-friendly code - now we're actually drawing things
     */

    var oldMargins = Lib.extendFlat({}, fullLayout._size);

    // draw framework first so that margin-pushing
    // components can position themselves correctly
    var drawFrameworkCalls = 0;
    function drawFramework() {
        var basePlotModules = fullLayout._basePlotModules;

        for(var i = 0; i < basePlotModules.length; i++) {
            if(basePlotModules[i].drawFramework) {
                basePlotModules[i].drawFramework(gd);
            }
        }

        if(!fullLayout._glcanvas && fullLayout._has('gl')) {
            fullLayout._glcanvas = fullLayout._glcontainer.selectAll('.gl-canvas').data([{
                key: 'contextLayer',
                context: true,
                pick: false
            }, {
                key: 'focusLayer',
                context: false,
                pick: false
            }, {
                key: 'pickLayer',
                context: false,
                pick: true
            }], function(d) { return d.key; });

            fullLayout._glcanvas.enter().append('canvas')
                .attr('class', function(d) {
                    return 'gl-canvas gl-canvas-' + d.key.replace('Layer', '');
                })
                .style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    overflow: 'visible',
                    'pointer-events': 'none'
                });
        }

        if(fullLayout._glcanvas) {
            fullLayout._glcanvas
                .attr('width', fullLayout.width)
                .attr('height', fullLayout.height);

            var regl = fullLayout._glcanvas.data()[0].regl;
            if(regl) {
                // Unfortunately, this can happen when relayouting to large
                // width/height on some browsers.
                if(Math.floor(fullLayout.width) !== regl._gl.drawingBufferWidth ||
                    Math.floor(fullLayout.height) !== regl._gl.drawingBufferHeight
                 ) {
                    var msg = 'WebGL context buffer and canvas dimensions do not match due to browser/WebGL bug.';
                    if(drawFrameworkCalls) {
                        Lib.error(msg);
                    } else {
                        Lib.log(msg + ' Clearing graph and plotting again.');
                        Plots.cleanPlot([], {}, gd._fullData, fullLayout);
                        Plots.supplyDefaults(gd);
                        fullLayout = gd._fullLayout;
                        Plots.doCalcdata(gd);
                        drawFrameworkCalls++;
                        return drawFramework();
                    }
                }
            }
        }

        if(fullLayout.modebar.orientation === 'h') {
            fullLayout._modebardiv
              .style('height', null)
              .style('width', '100%');
        } else {
            fullLayout._modebardiv
              .style('width', null)
              .style('height', fullLayout.height + 'px');
        }

        return Plots.previousPromises(gd);
    }

    // draw anything that can affect margins.
    function marginPushers() {
        // First reset the list of things that are allowed to change the margins
        // So any deleted traces or components will be wiped out of the
        // automargin calculation.
        // This means *every* margin pusher must be listed here, even if it
        // doesn't actually try to push the margins until later.
        Plots.clearAutoMarginIds(gd);

        subroutines.drawMarginPushers(gd);
        Axes.allowAutoMargin(gd);

        // TODO can this be moved elsewhere?
        if(fullLayout._has('pie')) {
            var fullData = gd._fullData;
            for(var i = 0; i < fullData.length; i++) {
                var trace = fullData[i];
                if(trace.type === 'pie' && trace.automargin) {
                    Plots.allowAutoMargin(gd, 'pie.' + trace.uid + '.automargin');
                }
            }
        }

        Plots.doAutoMargin(gd);
        return Plots.previousPromises(gd);
    }

    // in case the margins changed, draw margin pushers again
    function marginPushersAgain() {
        if(!Plots.didMarginChange(oldMargins, fullLayout._size)) return;

        return Lib.syncOrAsync([
            marginPushers,
            subroutines.layoutStyles
        ], gd);
    }

    function positionAndAutorange() {
        if(!recalc) {
            doAutoRangeAndConstraints();
            return;
        }

        // TODO: autosize extra for text markers and images
        // see https://github.com/plotly/plotly.js/issues/1111
        return Lib.syncOrAsync([
            Registry.getComponentMethod('shapes', 'calcAutorange'),
            Registry.getComponentMethod('annotations', 'calcAutorange'),
            doAutoRangeAndConstraints
        ], gd);
    }

    function doAutoRangeAndConstraints() {
        if(gd._transitioning) return;

        subroutines.doAutoRangeAndConstraints(gd);

        // store initial ranges *after* enforcing constraints, otherwise
        // we will never look like we're at the initial ranges
        if(graphWasEmpty) Axes.saveRangeInitial(gd);

        // this one is different from shapes/annotations calcAutorange
        // the others incorporate those components into ax._extremes,
        // this one actually sets the ranges in rangesliders.
        Registry.getComponentMethod('rangeslider', 'calcAutorange')(gd);
    }

    // draw ticks, titles, and calculate axis scaling (._b, ._m)
    function drawAxes() {
        return Axes.draw(gd, graphWasEmpty ? '' : 'redraw');
    }

    var seq = [
        Plots.previousPromises,
        addFrames,
        drawFramework,
        marginPushers,
        marginPushersAgain
    ];

    if(hasCartesian) seq.push(positionAndAutorange);

    seq.push(subroutines.layoutStyles);
    if(hasCartesian) seq.push(drawAxes);

    seq.push(
        subroutines.drawData,
        subroutines.finalDraw,
        initInteractions,
        Plots.addLinks,
        Plots.rehover,
        Plots.redrag,
        // TODO: doAutoMargin is only needed here for axis automargin, which
        // happens outside of marginPushers where all the other automargins are
        // calculated. Would be much better to separate margin calculations from
        // component drawing - see https://github.com/plotly/plotly.js/issues/2704
        Plots.doAutoMargin,
        Plots.previousPromises
    );

    // even if everything we did was synchronous, return a promise
    // so that the caller doesn't care which route we took
    var plotDone = Lib.syncOrAsync(seq, gd);
    if(!plotDone || !plotDone.then) plotDone = Promise.resolve();

    return plotDone.then(function() {
        emitAfterPlot(gd);
        return gd;
    });
}

function emitAfterPlot(gd) {
    var fullLayout = gd._fullLayout;

    if(fullLayout._redrawFromAutoMarginCount) {
        fullLayout._redrawFromAutoMarginCount--;
    } else {
        gd.emit('plotly_afterplot');
    }
}

function setPlotConfig(obj) {
    return Lib.extendFlat(dfltConfig, obj);
}

function setBackground(gd, bgColor) {
    try {
        gd._fullLayout._paper.style('background', bgColor);
    } catch(e) {
        Lib.error(e);
    }
}

function opaqueSetBackground(gd, bgColor) {
    var blend = Color.combine(bgColor, 'white');
    setBackground(gd, blend);
}

function setPlotContext(gd, config) {
    if(!gd._context) {
        gd._context = Lib.extendDeep({}, dfltConfig);

        // stash <base> href, used to make robust clipPath URLs
        var base = d3.select('base');
        gd._context._baseUrl = base.size() && base.attr('href') ?
            window.location.href.split('#')[0] :
            '';
    }

    var context = gd._context;

    var i, keys, key;

    if(config) {
        keys = Object.keys(config);
        for(i = 0; i < keys.length; i++) {
            key = keys[i];
            if(key === 'editable' || key === 'edits') continue;
            if(key in context) {
                if(key === 'setBackground' && config[key] === 'opaque') {
                    context[key] = opaqueSetBackground;
                } else {
                    context[key] = config[key];
                }
            }
        }

        // map plot3dPixelRatio to plotGlPixelRatio for backward compatibility
        if(config.plot3dPixelRatio && !context.plotGlPixelRatio) {
            context.plotGlPixelRatio = context.plot3dPixelRatio;
        }

        // now deal with editable and edits - first editable overrides
        // everything, then edits refines
        var editable = config.editable;
        if(editable !== undefined) {
            // we're not going to *use* context.editable, we're only going to
            // use context.edits... but keep it for the record
            context.editable = editable;

            keys = Object.keys(context.edits);
            for(i = 0; i < keys.length; i++) {
                context.edits[keys[i]] = editable;
            }
        }
        if(config.edits) {
            keys = Object.keys(config.edits);
            for(i = 0; i < keys.length; i++) {
                key = keys[i];
                if(key in context.edits) {
                    context.edits[key] = config.edits[key];
                }
            }
        }

        // not part of the user-facing config options
        context._exportedPlot = config._exportedPlot;
    }

    // staticPlot forces a bunch of others:
    if(context.staticPlot) {
        context.editable = false;
        context.edits = {};
        context.autosizable = false;
        context.scrollZoom = false;
        context.doubleClick = false;
        context.showTips = false;
        context.showLink = false;
        context.displayModeBar = false;
    }

    // make sure hover-only devices have mode bar visible
    if(context.displayModeBar === 'hover' && !hasHover) {
        context.displayModeBar = true;
    }

    // default and fallback for setBackground
    if(context.setBackground === 'transparent' || typeof context.setBackground !== 'function') {
        context.setBackground = setBackground;
    }

    // Check if gd has a specified widht/height to begin with
    context._hasZeroHeight = context._hasZeroHeight || gd.clientHeight === 0;
    context._hasZeroWidth = context._hasZeroWidth || gd.clientWidth === 0;

    // fill context._scrollZoom helper to help manage scrollZoom flaglist
    var szIn = context.scrollZoom;
    var szOut = context._scrollZoom = {};
    if(szIn === true) {
        szOut.cartesian = 1;
        szOut.gl3d = 1;
        szOut.geo = 1;
        szOut.mapbox = 1;
    } else if(typeof szIn === 'string') {
        var parts = szIn.split('+');
        for(i = 0; i < parts.length; i++) {
            szOut[parts[i]] = 1;
        }
    } else if(szIn !== false) {
        szOut.gl3d = 1;
        szOut.geo = 1;
        szOut.mapbox = 1;
    }
}

function plotLegacyPolar(gd, data, layout) {
    // build or reuse the container skeleton
    var plotContainer = d3.select(gd).selectAll('.plot-container')
        .data([0]);
    plotContainer.enter()
        .insert('div', ':first-child')
        .classed('plot-container plotly', true);
    var paperDiv = plotContainer.selectAll('.svg-container')
        .data([0]);
    paperDiv.enter().append('div')
        .classed('svg-container', true)
        .style('position', 'relative');

    // empty it everytime for now
    paperDiv.html('');

    // fulfill gd requirements
    if(data) gd.data = data;
    if(layout) gd.layout = layout;
    Polar.manager.fillLayout(gd);

    // resize canvas
    paperDiv.style({
        width: gd._fullLayout.width + 'px',
        height: gd._fullLayout.height + 'px'
    });

    // instantiate framework
    gd.framework = Polar.manager.framework(gd);

    // plot
    gd.framework({data: gd.data, layout: gd.layout}, paperDiv.node());

    // set undo point
    gd.framework.setUndoPoint();

    // get the resulting svg for extending it
    var polarPlotSVG = gd.framework.svg();

    // editable title
    var opacity = 1;
    var txt = gd._fullLayout.title ? gd._fullLayout.title.text : '';
    if(txt === '' || !txt) opacity = 0;

    var titleLayout = function() {
        this.call(svgTextUtils.convertToTspans, gd);
        // TODO: html/mathjax
        // TODO: center title
    };

    var title = polarPlotSVG.select('.title-group text')
        .call(titleLayout);

    if(gd._context.edits.titleText) {
        var placeholderText = Lib._(gd, 'Click to enter Plot title');
        if(!txt || txt === placeholderText) {
            opacity = 0.2;
            // placeholder is not going through convertToTspans
            // so needs explicit data-unformatted
            title.attr({'data-unformatted': placeholderText})
                .text(placeholderText)
                .style({opacity: opacity})
                .on('mouseover.opacity', function() {
                    d3.select(this).transition().duration(100)
                        .style('opacity', 1);
                })
                .on('mouseout.opacity', function() {
                    d3.select(this).transition().duration(1000)
                        .style('opacity', 0);
                });
        }

        var setContenteditable = function() {
            this.call(svgTextUtils.makeEditable, {gd: gd})
                .on('edit', function(text) {
                    gd.framework({layout: {title: {text: text}}});
                    this.text(text)
                        .call(titleLayout);
                    this.call(setContenteditable);
                })
                .on('cancel', function() {
                    var txt = this.attr('data-unformatted');
                    this.text(txt).call(titleLayout);
                });
        };
        title.call(setContenteditable);
    }

    gd._context.setBackground(gd, gd._fullLayout.paper_bgcolor);
    Plots.addLinks(gd);

    return Promise.resolve();
}

// convenience function to force a full redraw, mostly for use by plotly.js
function redraw(gd) {
    gd = Lib.getGraphDiv(gd);

    if(!Lib.isPlotDiv(gd)) {
        throw new Error('This element is not a Plotly plot: ' + gd);
    }

    helpers.cleanData(gd.data);
    helpers.cleanLayout(gd.layout);

    gd.calcdata = undefined;
    return exports.plot(gd).then(function() {
        gd.emit('plotly_redraw');
        return gd;
    });
}

/**
 * Convenience function to make idempotent plot option obvious to users.
 *
 * @param gd
 * @param {Object[]} data
 * @param {Object} layout
 * @param {Object} config
 */
function newPlot(gd, data, layout, config) {
    gd = Lib.getGraphDiv(gd);

    // remove gl contexts
    Plots.cleanPlot([], {}, gd._fullData || [], gd._fullLayout || {});

    Plots.purge(gd);
    return exports.plot(gd, data, layout, config);
}

/**
 * Wrap negative indicies to their positive counterparts.
 *
 * @param {Number[]} indices An array of indices
 * @param {Number} maxIndex The maximum index allowable (arr.length - 1)
 */
function positivifyIndices(indices, maxIndex) {
    var parentLength = maxIndex + 1;
    var positiveIndices = [];
    var i;
    var index;

    for(i = 0; i < indices.length; i++) {
        index = indices[i];
        if(index < 0) {
            positiveIndices.push(parentLength + index);
        } else {
            positiveIndices.push(index);
        }
    }
    return positiveIndices;
}

/**
 * Ensures that an index array for manipulating gd.data is valid.
 *
 * Intended for use with addTraces, deleteTraces, and moveTraces.
 *
 * @param gd
 * @param indices
 * @param arrayName
 */
function assertIndexArray(gd, indices, arrayName) {
    var i,
        index;

    for(i = 0; i < indices.length; i++) {
        index = indices[i];

        // validate that indices are indeed integers
        if(index !== parseInt(index, 10)) {
            throw new Error('all values in ' + arrayName + ' must be integers');
        }

        // check that all indices are in bounds for given gd.data array length
        if(index >= gd.data.length || index < -gd.data.length) {
            throw new Error(arrayName + ' must be valid indices for gd.data.');
        }

        // check that indices aren't repeated
        if(indices.indexOf(index, i + 1) > -1 ||
                index >= 0 && indices.indexOf(-gd.data.length + index) > -1 ||
                index < 0 && indices.indexOf(gd.data.length + index) > -1) {
            throw new Error('each index in ' + arrayName + ' must be unique.');
        }
    }
}

/**
 * Private function used by Plotly.moveTraces to check input args
 *
 * @param gd
 * @param currentIndices
 * @param newIndices
 */
function checkMoveTracesArgs(gd, currentIndices, newIndices) {
    // check that gd has attribute 'data' and 'data' is array
    if(!Array.isArray(gd.data)) {
        throw new Error('gd.data must be an array.');
    }

    // validate currentIndices array
    if(typeof currentIndices === 'undefined') {
        throw new Error('currentIndices is a required argument.');
    } else if(!Array.isArray(currentIndices)) {
        currentIndices = [currentIndices];
    }
    assertIndexArray(gd, currentIndices, 'currentIndices');

    // validate newIndices array if it exists
    if(typeof newIndices !== 'undefined' && !Array.isArray(newIndices)) {
        newIndices = [newIndices];
    }
    if(typeof newIndices !== 'undefined') {
        assertIndexArray(gd, newIndices, 'newIndices');
    }

    // check currentIndices and newIndices are the same length if newIdices exists
    if(typeof newIndices !== 'undefined' && currentIndices.length !== newIndices.length) {
        throw new Error('current and new indices must be of equal length.');
    }
}
/**
 * A private function to reduce the type checking clutter in addTraces.
 *
 * @param gd
 * @param traces
 * @param newIndices
 */
function checkAddTracesArgs(gd, traces, newIndices) {
    var i, value;

    // check that gd has attribute 'data' and 'data' is array
    if(!Array.isArray(gd.data)) {
        throw new Error('gd.data must be an array.');
    }

    // make sure traces exists
    if(typeof traces === 'undefined') {
        throw new Error('traces must be defined.');
    }

    // make sure traces is an array
    if(!Array.isArray(traces)) {
        traces = [traces];
    }

    // make sure each value in traces is an object
    for(i = 0; i < traces.length; i++) {
        value = traces[i];
        if(typeof value !== 'object' || (Array.isArray(value) || value === null)) {
            throw new Error('all values in traces array must be non-array objects');
        }
    }

    // make sure we have an index for each trace
    if(typeof newIndices !== 'undefined' && !Array.isArray(newIndices)) {
        newIndices = [newIndices];
    }
    if(typeof newIndices !== 'undefined' && newIndices.length !== traces.length) {
        throw new Error(
            'if indices is specified, traces.length must equal indices.length'
        );
    }
}

/**
 * A private function to reduce the type checking clutter in spliceTraces.
 * Get all update Properties from gd.data. Validate inputs and outputs.
 * Used by prependTrace and extendTraces
 *
 * @param gd
 * @param update
 * @param indices
 * @param maxPoints
 */
function assertExtendTracesArgs(gd, update, indices, maxPoints) {
    var maxPointsIsObject = Lib.isPlainObject(maxPoints);

    if(!Array.isArray(gd.data)) {
        throw new Error('gd.data must be an array');
    }
    if(!Lib.isPlainObject(update)) {
        throw new Error('update must be a key:value object');
    }

    if(typeof indices === 'undefined') {
        throw new Error('indices must be an integer or array of integers');
    }

    assertIndexArray(gd, indices, 'indices');

    for(var key in update) {
        /*
         * Verify that the attribute to be updated contains as many trace updates
         * as indices. Failure must result in throw and no-op
         */
        if(!Array.isArray(update[key]) || update[key].length !== indices.length) {
            throw new Error('attribute ' + key + ' must be an array of length equal to indices array length');
        }

        /*
         * if maxPoints is an object it must match keys and array lengths of 'update' 1:1
         */
        if(maxPointsIsObject &&
            (!(key in maxPoints) || !Array.isArray(maxPoints[key]) ||
            maxPoints[key].length !== update[key].length)) {
            throw new Error('when maxPoints is set as a key:value object it must contain a 1:1 ' +
                            'corrispondence with the keys and number of traces in the update object');
        }
    }
}

/**
 * A private function to reduce the type checking clutter in spliceTraces.
 *
 * @param {Object|HTMLDivElement} gd
 * @param {Object} update
 * @param {Number[]} indices
 * @param {Number||Object} maxPoints
 * @return {Object[]}
 */
function getExtendProperties(gd, update, indices, maxPoints) {
    var maxPointsIsObject = Lib.isPlainObject(maxPoints);
    var updateProps = [];
    var trace, target, prop, insert, maxp;

    // allow scalar index to represent a single trace position
    if(!Array.isArray(indices)) indices = [indices];

    // negative indices are wrapped around to their positive value. Equivalent to python indexing.
    indices = positivifyIndices(indices, gd.data.length - 1);

    // loop through all update keys and traces and harvest validated data.
    for(var key in update) {
        for(var j = 0; j < indices.length; j++) {
            /*
             * Choose the trace indexed by the indices map argument and get the prop setter-getter
             * instance that references the key and value for this particular trace.
             */
            trace = gd.data[indices[j]];
            prop = nestedProperty(trace, key);

            /*
             * Target is the existing gd.data.trace.dataArray value like "x" or "marker.size"
             * Target must exist as an Array to allow the extend operation to be performed.
             */
            target = prop.get();
            insert = update[key][j];

            if(!Lib.isArrayOrTypedArray(insert)) {
                throw new Error('attribute: ' + key + ' index: ' + j + ' must be an array');
            }
            if(!Lib.isArrayOrTypedArray(target)) {
                throw new Error('cannot extend missing or non-array attribute: ' + key);
            }
            if(target.constructor !== insert.constructor) {
                throw new Error('cannot extend array with an array of a different type: ' + key);
            }

            /*
             * maxPoints may be an object map or a scalar. If object select the key:value, else
             * Use the scalar maxPoints for all key and trace combinations.
             */
            maxp = maxPointsIsObject ? maxPoints[key][j] : maxPoints;

            // could have chosen null here, -1 just tells us to not take a window
            if(!isNumeric(maxp)) maxp = -1;

            /*
             * Wrap the nestedProperty in an object containing required data
             * for lengthening and windowing this particular trace - key combination.
             * Flooring maxp mirrors the behaviour of floats in the Array.slice JSnative function.
             */
            updateProps.push({
                prop: prop,
                target: target,
                insert: insert,
                maxp: Math.floor(maxp)
            });
        }
    }

    // all target and insertion data now validated
    return updateProps;
}

/**
 * A private function to key Extend and Prepend traces DRY
 *
 * @param {Object|HTMLDivElement} gd
 * @param {Object} update
 * @param {Number[]} indices
 * @param {Number||Object} maxPoints
 * @param {Function} updateArray
 * @return {Object}
 */
function spliceTraces(gd, update, indices, maxPoints, updateArray) {
    assertExtendTracesArgs(gd, update, indices, maxPoints);

    var updateProps = getExtendProperties(gd, update, indices, maxPoints);
    var undoUpdate = {};
    var undoPoints = {};

    for(var i = 0; i < updateProps.length; i++) {
        var prop = updateProps[i].prop;
        var maxp = updateProps[i].maxp;

        // return new array and remainder
        var out = updateArray(updateProps[i].target, updateProps[i].insert, maxp);
        prop.set(out[0]);

        // build the inverse update object for the undo operation
        if(!Array.isArray(undoUpdate[prop.astr])) undoUpdate[prop.astr] = [];
        undoUpdate[prop.astr].push(out[1]);

         // build the matching maxPoints undo object containing original trace lengths
        if(!Array.isArray(undoPoints[prop.astr])) undoPoints[prop.astr] = [];
        undoPoints[prop.astr].push(updateProps[i].target.length);
    }

    return {update: undoUpdate, maxPoints: undoPoints};
}

function concatTypedArray(arr0, arr1) {
    var arr2 = new arr0.constructor(arr0.length + arr1.length);
    arr2.set(arr0);
    arr2.set(arr1, arr0.length);
    return arr2;
}

/**
 * extend && prepend traces at indices with update arrays, window trace lengths to maxPoints
 *
 * Extend and Prepend have identical APIs. Prepend inserts an array at the head while Extend
 * inserts an array off the tail. Prepend truncates the tail of the array - counting maxPoints
 * from the head, whereas Extend truncates the head of the array, counting backward maxPoints
 * from the tail.
 *
 * If maxPoints is undefined, nonNumeric, negative or greater than extended trace length no
 * truncation / windowing will be performed. If its zero, well the whole trace is truncated.
 *
 * @param {Object|HTMLDivElement} gd The graph div
 * @param {Object} update The key:array map of target attributes to extend
 * @param {Number|Number[]} indices The locations of traces to be extended
 * @param {Number|Object} [maxPoints] Number of points for trace window after lengthening.
 *
 */
function extendTraces(gd, update, indices, maxPoints) {
    gd = Lib.getGraphDiv(gd);

    function updateArray(target, insert, maxp) {
        var newArray, remainder;

        if(Lib.isTypedArray(target)) {
            if(maxp < 0) {
                var none = new target.constructor(0);
                var both = concatTypedArray(target, insert);

                if(maxp < 0) {
                    newArray = both;
                    remainder = none;
                } else {
                    newArray = none;
                    remainder = both;
                }
            } else {
                newArray = new target.constructor(maxp);
                remainder = new target.constructor(target.length + insert.length - maxp);

                if(maxp === insert.length) {
                    newArray.set(insert);
                    remainder.set(target);
                } else if(maxp < insert.length) {
                    var numberOfItemsFromInsert = insert.length - maxp;

                    newArray.set(insert.subarray(numberOfItemsFromInsert));
                    remainder.set(target);
                    remainder.set(insert.subarray(0, numberOfItemsFromInsert), target.length);
                } else {
                    var numberOfItemsFromTarget = maxp - insert.length;
                    var targetBegin = target.length - numberOfItemsFromTarget;

                    newArray.set(target.subarray(targetBegin));
                    newArray.set(insert, numberOfItemsFromTarget);
                    remainder.set(target.subarray(0, targetBegin));
                }
            }
        } else {
            newArray = target.concat(insert);
            remainder = (maxp >= 0 && maxp < newArray.length) ?
                newArray.splice(0, newArray.length - maxp) :
                [];
        }

        return [newArray, remainder];
    }

    var undo = spliceTraces(gd, update, indices, maxPoints, updateArray);
    var promise = exports.redraw(gd);
    var undoArgs = [gd, undo.update, indices, undo.maxPoints];
    Queue.add(gd, exports.prependTraces, undoArgs, extendTraces, arguments);

    return promise;
}

function prependTraces(gd, update, indices, maxPoints) {
    gd = Lib.getGraphDiv(gd);

    function updateArray(target, insert, maxp) {
        var newArray, remainder;

        if(Lib.isTypedArray(target)) {
            if(maxp <= 0) {
                var none = new target.constructor(0);
                var both = concatTypedArray(insert, target);

                if(maxp < 0) {
                    newArray = both;
                    remainder = none;
                } else {
                    newArray = none;
                    remainder = both;
                }
            } else {
                newArray = new target.constructor(maxp);
                remainder = new target.constructor(target.length + insert.length - maxp);

                if(maxp === insert.length) {
                    newArray.set(insert);
                    remainder.set(target);
                } else if(maxp < insert.length) {
                    var numberOfItemsFromInsert = insert.length - maxp;

                    newArray.set(insert.subarray(0, numberOfItemsFromInsert));
                    remainder.set(insert.subarray(numberOfItemsFromInsert));
                    remainder.set(target, numberOfItemsFromInsert);
                } else {
                    var numberOfItemsFromTarget = maxp - insert.length;

                    newArray.set(insert);
                    newArray.set(target.subarray(0, numberOfItemsFromTarget), insert.length);
                    remainder.set(target.subarray(numberOfItemsFromTarget));
                }
            }
        } else {
            newArray = insert.concat(target);
            remainder = (maxp >= 0 && maxp < newArray.length) ?
                newArray.splice(maxp, newArray.length) :
                [];
        }

        return [newArray, remainder];
    }

    var undo = spliceTraces(gd, update, indices, maxPoints, updateArray);
    var promise = exports.redraw(gd);
    var undoArgs = [gd, undo.update, indices, undo.maxPoints];
    Queue.add(gd, exports.extendTraces, undoArgs, prependTraces, arguments);

    return promise;
}

/**
 * Add data traces to an existing graph div.
 *
 * @param {Object|HTMLDivElement} gd The graph div
 * @param {Object[]} gd.data The array of traces we're adding to
 * @param {Object[]|Object} traces The object or array of objects to add
 * @param {Number[]|Number} [newIndices=[gd.data.length]] Locations to add traces
 *
 */
function addTraces(gd, traces, newIndices) {
    gd = Lib.getGraphDiv(gd);

    var currentIndices = [];
    var undoFunc = exports.deleteTraces;
    var redoFunc = addTraces;
    var undoArgs = [gd, currentIndices];
    var redoArgs = [gd, traces];  // no newIndices here
    var i;
    var promise;

    // all validation is done elsewhere to remove clutter here
    checkAddTracesArgs(gd, traces, newIndices);

    // make sure traces is an array
    if(!Array.isArray(traces)) {
        traces = [traces];
    }

    // make sure traces do not repeat existing ones
    traces = traces.map(function(trace) {
        return Lib.extendFlat({}, trace);
    });

    helpers.cleanData(traces);

    // add the traces to gd.data (no redrawing yet!)
    for(i = 0; i < traces.length; i++) {
        gd.data.push(traces[i]);
    }

    // to continue, we need to call moveTraces which requires currentIndices
    for(i = 0; i < traces.length; i++) {
        currentIndices.push(-traces.length + i);
    }

    // if the user didn't define newIndices, they just want the traces appended
    // i.e., we can simply redraw and be done
    if(typeof newIndices === 'undefined') {
        promise = exports.redraw(gd);
        Queue.add(gd, undoFunc, undoArgs, redoFunc, redoArgs);
        return promise;
    }

    // make sure indices is property defined
    if(!Array.isArray(newIndices)) {
        newIndices = [newIndices];
    }

    try {
        // this is redundant, but necessary to not catch later possible errors!
        checkMoveTracesArgs(gd, currentIndices, newIndices);
    } catch(error) {
        // something went wrong, reset gd to be safe and rethrow error
        gd.data.splice(gd.data.length - traces.length, traces.length);
        throw error;
    }

    // if we're here, the user has defined specific places to place the new traces
    // this requires some extra work that moveTraces will do
    Queue.startSequence(gd);
    Queue.add(gd, undoFunc, undoArgs, redoFunc, redoArgs);
    promise = exports.moveTraces(gd, currentIndices, newIndices);
    Queue.stopSequence(gd);
    return promise;
}

/**
 * Delete traces at `indices` from gd.data array.
 *
 * @param {Object|HTMLDivElement} gd The graph div
 * @param {Object[]} gd.data The array of traces we're removing from
 * @param {Number|Number[]} indices The indices
 */
function deleteTraces(gd, indices) {
    gd = Lib.getGraphDiv(gd);

    var traces = [];
    var undoFunc = exports.addTraces;
    var redoFunc = deleteTraces;
    var undoArgs = [gd, traces, indices];
    var redoArgs = [gd, indices];
    var i;
    var deletedTrace;

    // make sure indices are defined
    if(typeof indices === 'undefined') {
        throw new Error('indices must be an integer or array of integers.');
    } else if(!Array.isArray(indices)) {
        indices = [indices];
    }
    assertIndexArray(gd, indices, 'indices');

    // convert negative indices to positive indices
    indices = positivifyIndices(indices, gd.data.length - 1);

    // we want descending here so that splicing later doesn't affect indexing
    indices.sort(Lib.sorterDes);
    for(i = 0; i < indices.length; i += 1) {
        deletedTrace = gd.data.splice(indices[i], 1)[0];
        traces.push(deletedTrace);
    }

    var promise = exports.redraw(gd);
    Queue.add(gd, undoFunc, undoArgs, redoFunc, redoArgs);

    return promise;
}

/**
 * Move traces at currentIndices array to locations in newIndices array.
 *
 * If newIndices is omitted, currentIndices will be moved to the end. E.g.,
 * these are equivalent:
 *
 * Plotly.moveTraces(gd, [1, 2, 3], [-3, -2, -1])
 * Plotly.moveTraces(gd, [1, 2, 3])
 *
 * @param {Object|HTMLDivElement} gd The graph div
 * @param {Object[]} gd.data The array of traces we're removing from
 * @param {Number|Number[]} currentIndices The locations of traces to be moved
 * @param {Number|Number[]} [newIndices] The locations to move traces to
 *
 * Example calls:
 *
 *      // move trace i to location x
 *      Plotly.moveTraces(gd, i, x)
 *
 *      // move trace i to end of array
 *      Plotly.moveTraces(gd, i)
 *
 *      // move traces i, j, k to end of array (i != j != k)
 *      Plotly.moveTraces(gd, [i, j, k])
 *
 *      // move traces [i, j, k] to [x, y, z] (i != j != k) (x != y != z)
 *      Plotly.moveTraces(gd, [i, j, k], [x, y, z])
 *
 *      // reorder all traces (assume there are 5--a, b, c, d, e)
 *      Plotly.moveTraces(gd, [b, d, e, a, c])  // same as 'move to end'
 */
function moveTraces(gd, currentIndices, newIndices) {
    gd = Lib.getGraphDiv(gd);

    var newData = [];
    var movingTraceMap = [];
    var undoFunc = moveTraces;
    var redoFunc = moveTraces;
    var undoArgs = [gd, newIndices, currentIndices];
    var redoArgs = [gd, currentIndices, newIndices];
    var i;

    // to reduce complexity here, check args elsewhere
    // this throws errors where appropriate
    checkMoveTracesArgs(gd, currentIndices, newIndices);

    // make sure currentIndices is an array
    currentIndices = Array.isArray(currentIndices) ? currentIndices : [currentIndices];

    // if undefined, define newIndices to point to the end of gd.data array
    if(typeof newIndices === 'undefined') {
        newIndices = [];
        for(i = 0; i < currentIndices.length; i++) {
            newIndices.push(-currentIndices.length + i);
        }
    }

    // make sure newIndices is an array if it's user-defined
    newIndices = Array.isArray(newIndices) ? newIndices : [newIndices];

    // convert negative indices to positive indices (they're the same length)
    currentIndices = positivifyIndices(currentIndices, gd.data.length - 1);
    newIndices = positivifyIndices(newIndices, gd.data.length - 1);

    // at this point, we've coerced the index arrays into predictable forms

    // get the traces that aren't being moved around
    for(i = 0; i < gd.data.length; i++) {
        // if index isn't in currentIndices, include it in ignored!
        if(currentIndices.indexOf(i) === -1) {
            newData.push(gd.data[i]);
        }
    }

    // get a mapping of indices to moving traces
    for(i = 0; i < currentIndices.length; i++) {
        movingTraceMap.push({newIndex: newIndices[i], trace: gd.data[currentIndices[i]]});
    }

    // reorder this mapping by newIndex, ascending
    movingTraceMap.sort(function(a, b) {
        return a.newIndex - b.newIndex;
    });

    // now, add the moving traces back in, in order!
    for(i = 0; i < movingTraceMap.length; i += 1) {
        newData.splice(movingTraceMap[i].newIndex, 0, movingTraceMap[i].trace);
    }

    gd.data = newData;

    var promise = exports.redraw(gd);
    Queue.add(gd, undoFunc, undoArgs, redoFunc, redoArgs);

    return promise;
}

/**
 * restyle: update trace attributes of an existing plot
 *
 * Can be called two ways.
 *
 * Signature 1:
 * @param {String | HTMLDivElement} gd
 *  the id or DOM element of the graph container div
 * @param {String} astr
 *  attribute string (like `'marker.symbol'`) to update
 * @param {*} val
 *  value to give this attribute
 * @param {Number[] | Number} [traces]
 *  integer or array of integers for the traces to alter (all if omitted)
 *
 * Signature 2:
 * @param {String | HTMLDivElement} gd
 *  (as in signature 1)
 * @param {Object} aobj
 *  attribute object `{astr1: val1, astr2: val2 ...}`
 *  allows setting multiple attributes simultaneously
 * @param {Number[] | Number} [traces]
 *  (as in signature 1)
 *
 * `val` (or `val1`, `val2` ... in the object form) can be an array,
 * to apply different values to each trace.
 *
 * If the array is too short, it will wrap around (useful for
 * style files that want to specify cyclical default values).
 */
function restyle(gd, astr, val, _traces) {
    gd = Lib.getGraphDiv(gd);
    helpers.clearPromiseQueue(gd);

    var aobj = {};
    if(typeof astr === 'string') aobj[astr] = val;
    else if(Lib.isPlainObject(astr)) {
        // the 3-arg form
        aobj = Lib.extendFlat({}, astr);
        if(_traces === undefined) _traces = val;
    } else {
        Lib.warn('Restyle fail.', astr, val, _traces);
        return Promise.reject();
    }

    if(Object.keys(aobj).length) gd.changed = true;

    var traces = helpers.coerceTraceIndices(gd, _traces);

    var specs = _restyle(gd, aobj, traces);
    var flags = specs.flags;

    // clear calcdata and/or axis types if required so they get regenerated
    if(flags.calc) gd.calcdata = undefined;
    if(flags.clearAxisTypes) helpers.clearAxisTypes(gd, traces, {});

    // fill in redraw sequence
    var seq = [];

    if(flags.fullReplot) {
        seq.push(exports.plot);
    } else {
        seq.push(Plots.previousPromises);

        // maybe only call Plots.supplyDataDefaults in the splom case,
        // to skip over long and slow axes defaults
        Plots.supplyDefaults(gd);

        if(flags.markerSize) {
            Plots.doCalcdata(gd);
            addAxRangeSequence(seq);

            // TODO
            // if all axes have autorange:false, then
            // proceed to subroutines.doTraceStyle(),
            // otherwise we must go through addAxRangeSequence,
            // which in general must redraws 'all' axes
        }

        if(flags.style) seq.push(subroutines.doTraceStyle);
        if(flags.colorbars) seq.push(subroutines.doColorBars);

        seq.push(emitAfterPlot);
    }

    seq.push(Plots.rehover, Plots.redrag);

    Queue.add(gd,
        restyle, [gd, specs.undoit, specs.traces],
        restyle, [gd, specs.redoit, specs.traces]
    );

    var plotDone = Lib.syncOrAsync(seq, gd);
    if(!plotDone || !plotDone.then) plotDone = Promise.resolve();

    return plotDone.then(function() {
        gd.emit('plotly_restyle', specs.eventData);
        return gd;
    });
}

// for undo: undefined initial vals must be turned into nulls
// so that we unset rather than ignore them
function undefinedToNull(val) {
    if(val === undefined) return null;
    return val;
}

/**
 * Factory function to wrap nestedProperty with GUI edits if necessary
 * with GUI edits we add an optional prefix to the nestedProperty constructor
 * to prepend to the attribute string in the preGUI store.
 */
function makeNP(preGUI, guiEditFlag) {
    if(!guiEditFlag) return nestedProperty;

    return function(container, attr, prefix) {
        var np = nestedProperty(container, attr);
        var npSet = np.set;
        np.set = function(val) {
            var fullAttr = (prefix || '') + attr;
            storeCurrent(fullAttr, np.get(), val, preGUI);
            npSet(val);
        };
        return np;
    };
}

function storeCurrent(attr, val, newVal, preGUI) {
    if(Array.isArray(val) || Array.isArray(newVal)) {
        var arrayVal = Array.isArray(val) ? val : [];
        var arrayNew = Array.isArray(newVal) ? newVal : [];
        var maxLen = Math.max(arrayVal.length, arrayNew.length);
        for(var i = 0; i < maxLen; i++) {
            storeCurrent(attr + '[' + i + ']', arrayVal[i], arrayNew[i], preGUI);
        }
    } else if(Lib.isPlainObject(val) || Lib.isPlainObject(newVal)) {
        var objVal = Lib.isPlainObject(val) ? val : {};
        var objNew = Lib.isPlainObject(newVal) ? newVal : {};
        var objBoth = Lib.extendFlat({}, objVal, objNew);
        for(var key in objBoth) {
            storeCurrent(attr + '.' + key, objVal[key], objNew[key], preGUI);
        }
    } else if(preGUI[attr] === undefined) {
        preGUI[attr] = undefinedToNull(val);
    }
}

/**
 * storeDirectGUIEdit: for routines that skip restyle/relayout and mock it
 * by emitting a plotly_restyle or plotly_relayout event, this routine
 * keeps track of the initial state in _preGUI for use by uirevision
 * Does *not* apply these changes to data/layout - that's the responsibility
 * of the calling routine.
 *
 * @param {object} container: the input attributes container (eg `layout` or a `trace`)
 * @param {object} preGUI: where original values should be stored, either
 *     `layout._preGUI` or `layout._tracePreGUI[uid]`
 * @param {object} edits: the {attr: val} object as normally passed to `relayout` etc
 */
function _storeDirectGUIEdit(container, preGUI, edits) {
    for(var attr in edits) {
        var np = nestedProperty(container, attr);
        storeCurrent(attr, np.get(), edits[attr], preGUI);
    }
}

function _restyle(gd, aobj, traces) {
    var fullLayout = gd._fullLayout;
    var fullData = gd._fullData;
    var data = gd.data;
    var guiEditFlag = fullLayout._guiEditing;
    var layoutNP = makeNP(fullLayout._preGUI, guiEditFlag);
    var eventData = Lib.extendDeepAll({}, aobj);
    var i;

    cleanDeprecatedAttributeKeys(aobj);

    // initialize flags
    var flags = editTypes.traceFlags();

    // copies of the change (and previous values of anything affected)
    // for the undo / redo queue
    var redoit = {};
    var undoit = {};
    var axlist;

    // make a new empty vals array for undoit
    function a0() { return traces.map(function() { return undefined; }); }

    // for autoranging multiple axes
    function addToAxlist(axid) {
        var axName = Axes.id2name(axid);
        if(axlist.indexOf(axName) === -1) axlist.push(axName);
    }

    function autorangeAttr(axName) { return 'LAYOUT' + axName + '.autorange'; }

    function rangeAttr(axName) { return 'LAYOUT' + axName + '.range'; }

    function getFullTrace(traceIndex) {
        // usually fullData maps 1:1 onto data, but with groupby transforms
        // the fullData index can be greater. Take the *first* matching trace.
        for(var j = traceIndex; j < fullData.length; j++) {
            if(fullData[j]._input === data[traceIndex]) return fullData[j];
        }
        // should never get here - and if we *do* it should cause an error
        // later on undefined fullTrace is passed to nestedProperty.
    }

    // for attrs that interact (like scales & autoscales), save the
    // old vals before making the change
    // val=undefined will not set a value, just record what the value was.
    // val=null will delete the attribute
    // attr can be an array to set several at once (all to the same val)
    function doextra(attr, val, i) {
        if(Array.isArray(attr)) {
            attr.forEach(function(a) { doextra(a, val, i); });
            return;
        }
        // quit if explicitly setting this elsewhere
        if(attr in aobj || helpers.hasParent(aobj, attr)) return;

        var extraparam;
        if(attr.substr(0, 6) === 'LAYOUT') {
            extraparam = layoutNP(gd.layout, attr.replace('LAYOUT', ''));
        } else {
            var tracei = traces[i];
            var preGUI = fullLayout._tracePreGUI[getFullTrace(tracei)._fullInput.uid];
            extraparam = makeNP(preGUI, guiEditFlag)(data[tracei], attr);
        }

        if(!(attr in undoit)) {
            undoit[attr] = a0();
        }
        if(undoit[attr][i] === undefined) {
            undoit[attr][i] = undefinedToNull(extraparam.get());
        }
        if(val !== undefined) {
            extraparam.set(val);
        }
    }

    function allBins(binAttr) {
        return function(j) {
            return fullData[j][binAttr];
        };
    }

    function arrayBins(binAttr) {
        return function(vij, j) {
            return vij === false ? fullData[traces[j]][binAttr] : null;
        };
    }

    // now make the changes to gd.data (and occasionally gd.layout)
    // and figure out what kind of graphics update we need to do
    for(var ai in aobj) {
        if(helpers.hasParent(aobj, ai)) {
            throw new Error('cannot set ' + ai + ' and a parent attribute simultaneously');
        }

        var vi = aobj[ai];
        var cont;
        var contFull;
        var param;
        var oldVal;
        var newVal;
        var valObject;

        // Backward compatibility shim for turning histogram autobin on,
        // or freezing previous autobinned values.
        // Replace obsolete `autobin(x|y): true` with `(x|y)bins: null`
        // and `autobin(x|y): false` with the `(x|y)bins` in `fullData`
        if(ai === 'autobinx' || ai === 'autobiny') {
            ai = ai.charAt(ai.length - 1) + 'bins';
            if(Array.isArray(vi)) vi = vi.map(arrayBins(ai));
            else if(vi === false) vi = traces.map(allBins(ai));
            else vi = null;
        }

        redoit[ai] = vi;

        if(ai.substr(0, 6) === 'LAYOUT') {
            param = layoutNP(gd.layout, ai.replace('LAYOUT', ''));
            undoit[ai] = [undefinedToNull(param.get())];
            // since we're allowing val to be an array, allow it here too,
            // even though that's meaningless
            param.set(Array.isArray(vi) ? vi[0] : vi);
            // ironically, the layout attrs in restyle only require replot,
            // not relayout
            flags.calc = true;
            continue;
        }

        // set attribute in gd.data
        undoit[ai] = a0();
        for(i = 0; i < traces.length; i++) {
            cont = data[traces[i]];
            contFull = getFullTrace(traces[i]);
            var preGUI = fullLayout._tracePreGUI[contFull._fullInput.uid];
            param = makeNP(preGUI, guiEditFlag)(cont, ai);
            oldVal = param.get();
            newVal = Array.isArray(vi) ? vi[i % vi.length] : vi;

            if(newVal === undefined) continue;

            var finalPart = param.parts[param.parts.length - 1];
            var prefix = ai.substr(0, ai.length - finalPart.length - 1);
            var prefixDot = prefix ? prefix + '.' : '';
            var innerContFull = prefix ?
                nestedProperty(contFull, prefix).get() : contFull;

            valObject = PlotSchema.getTraceValObject(contFull, param.parts);

            if(valObject && valObject.impliedEdits && newVal !== null) {
                for(var impliedKey in valObject.impliedEdits) {
                    doextra(Lib.relativeAttr(ai, impliedKey), valObject.impliedEdits[impliedKey], i);
                }
            } else if((finalPart === 'thicknessmode' || finalPart === 'lenmode') &&
                    oldVal !== newVal &&
                    (newVal === 'fraction' || newVal === 'pixels') &&
                    innerContFull
            ) {
                // changing colorbar size modes,
                // make the resulting size not change
                // note that colorbar fractional sizing is based on the
                // original plot size, before anything (like a colorbar)
                // increases the margins

                var gs = fullLayout._size;
                var orient = innerContFull.orient;
                var topOrBottom = (orient === 'top') || (orient === 'bottom');
                if(finalPart === 'thicknessmode') {
                    var thicknorm = topOrBottom ? gs.h : gs.w;
                    doextra(prefixDot + 'thickness', innerContFull.thickness *
                        (newVal === 'fraction' ? 1 / thicknorm : thicknorm), i);
                } else {
                    var lennorm = topOrBottom ? gs.w : gs.h;
                    doextra(prefixDot + 'len', innerContFull.len *
                        (newVal === 'fraction' ? 1 / lennorm : lennorm), i);
                }
            } else if(ai === 'type' && (
                (newVal === 'pie') !== (oldVal === 'pie') ||
                (newVal === 'funnelarea') !== (oldVal === 'funnelarea')
            )) {
                var labelsTo = 'x';
                var valuesTo = 'y';
                if((newVal === 'bar' || oldVal === 'bar') && cont.orientation === 'h') {
                    labelsTo = 'y';
                    valuesTo = 'x';
                }
                Lib.swapAttrs(cont, ['?', '?src'], 'labels', labelsTo);
                Lib.swapAttrs(cont, ['d?', '?0'], 'label', labelsTo);
                Lib.swapAttrs(cont, ['?', '?src'], 'values', valuesTo);

                if(oldVal === 'pie' || oldVal === 'funnelarea') {
                    nestedProperty(cont, 'marker.color')
                        .set(nestedProperty(cont, 'marker.colors').get());

                    // super kludgy - but if all pies are gone we won't remove them otherwise
                    fullLayout._pielayer.selectAll('g.trace').remove();
                } else if(Registry.traceIs(cont, 'cartesian')) {
                    nestedProperty(cont, 'marker.colors')
                        .set(nestedProperty(cont, 'marker.color').get());
                }
            }

            undoit[ai][i] = undefinedToNull(oldVal);
            // set the new value - if val is an array, it's one el per trace
            // first check for attributes that get more complex alterations
            var swapAttrs = [
                'swapxy', 'swapxyaxes', 'orientation', 'orientationaxes'
            ];
            if(swapAttrs.indexOf(ai) !== -1) {
                // setting an orientation: make sure it's changing
                // before we swap everything else
                if(ai === 'orientation') {
                    param.set(newVal);
                    // obnoxious that we need this level of coupling... but in order to
                    // properly handle setting orientation to `null` we need to mimic
                    // the logic inside Bars.supplyDefaults for default orientation
                    var defaultOrientation = (cont.x && !cont.y) ? 'h' : 'v';
                    if((param.get() || defaultOrientation) === contFull.orientation) {
                        continue;
                    }
                } else if(ai === 'orientationaxes') {
                    // orientationaxes has no value,
                    // it flips everything and the axes

                    cont.orientation =
                        {v: 'h', h: 'v'}[contFull.orientation];
                }
                helpers.swapXYData(cont);
                flags.calc = flags.clearAxisTypes = true;
            } else if(Plots.dataArrayContainers.indexOf(param.parts[0]) !== -1) {
                // TODO: use manageArrays.applyContainerArrayChanges here too
                helpers.manageArrayContainers(param, newVal, undoit);
                flags.calc = true;
            } else {
                if(valObject) {
                    // must redo calcdata when restyling array values of arrayOk attributes
                    // ... but no need to this for regl-based traces
                    if(valObject.arrayOk &&
                        !Registry.traceIs(contFull, 'regl') &&
                        (Lib.isArrayOrTypedArray(newVal) || Lib.isArrayOrTypedArray(oldVal))
                    ) {
                        flags.calc = true;
                    } else editTypes.update(flags, valObject);
                } else {
                    /*
                     * if we couldn't find valObject,  assume a full recalc.
                     * This can happen if you're changing type and making
                     * some other edits too, so the modules we're
                     * looking at don't have these attributes in them.
                     */
                    flags.calc = true;
                }

                // all the other ones, just modify that one attribute
                param.set(newVal);
            }
        }

        // swap the data attributes of the relevant x and y axes?
        if(['swapxyaxes', 'orientationaxes'].indexOf(ai) !== -1) {
            Axes.swap(gd, traces);
        }

        // swap hovermode if set to "compare x/y data"
        if(ai === 'orientationaxes') {
            var hovermode = nestedProperty(gd.layout, 'hovermode');
            if(hovermode.get() === 'x') {
                hovermode.set('y');
            } else if(hovermode.get() === 'y') {
                hovermode.set('x');
            } else if(hovermode.get() === 'x unified') {
                hovermode.set('y unified');
            } else if(hovermode.get() === 'y unified') {
                hovermode.set('x unified');
            }
        }

        // Major enough changes deserve autoscale and
        // non-reversed axes so people don't get confused
        //
        // Note: autobin (or its new analog bin clearing) is not included here
        // since we're not pushing bins back to gd.data, so if we have bin
        // info it was explicitly provided by the user.
        if(['orientation', 'type'].indexOf(ai) !== -1) {
            axlist = [];
            for(i = 0; i < traces.length; i++) {
                var trace = data[traces[i]];

                if(Registry.traceIs(trace, 'cartesian')) {
                    addToAxlist(trace.xaxis || 'x');
                    addToAxlist(trace.yaxis || 'y');
                }
            }

            doextra(axlist.map(autorangeAttr), true, 0);
            doextra(axlist.map(rangeAttr), [0, 1], 0);
        }
    }

    if(flags.calc || flags.plot) {
        flags.fullReplot = true;
    }

    return {
        flags: flags,
        undoit: undoit,
        redoit: redoit,
        traces: traces,
        eventData: Lib.extendDeepNoArrays([], [eventData, traces])
    };
}

/**
 * Converts deprecated attribute keys to
 * the current API to ensure backwards compatibility.
 *
 * This is needed for the update mechanism to determine which
 * subroutines to run based on the actual attribute
 * definitions (that don't include the deprecated ones).
 *
 * E.g. Maps {'xaxis.title': 'A chart'} to {'xaxis.title.text': 'A chart'}
 * and {titlefont: {...}} to {'title.font': {...}}.
 *
 * @param aobj
 */
function cleanDeprecatedAttributeKeys(aobj) {
    var oldAxisTitleRegex = Lib.counterRegex('axis', '\.title', false, false);
    var colorbarRegex = /colorbar\.title$/;
    var keys = Object.keys(aobj);
    var i, key, value;

    for(i = 0; i < keys.length; i++) {
        key = keys[i];
        value = aobj[key];

        if((key === 'title' || oldAxisTitleRegex.test(key) || colorbarRegex.test(key)) &&
          (typeof value === 'string' || typeof value === 'number')) {
            replace(key, key.replace('title', 'title.text'));
        } else if(key.indexOf('titlefont') > -1) {
            replace(key, key.replace('titlefont', 'title.font'));
        } else if(key.indexOf('titleposition') > -1) {
            replace(key, key.replace('titleposition', 'title.position'));
        } else if(key.indexOf('titleside') > -1) {
            replace(key, key.replace('titleside', 'title.side'));
        } else if(key.indexOf('titleoffset') > -1) {
            replace(key, key.replace('titleoffset', 'title.offset'));
        }
    }

    function replace(oldAttrStr, newAttrStr) {
        aobj[newAttrStr] = aobj[oldAttrStr];
        delete aobj[oldAttrStr];
    }
}

/**
 * relayout: update layout attributes of an existing plot
 *
 * Can be called two ways:
 *
 * Signature 1:
 * @param {String | HTMLDivElement} gd
 *  the id or dom element of the graph container div
 * @param {String} astr
 *  attribute string (like `'xaxis.range[0]'`) to update
 * @param {*} val
 *  value to give this attribute
 *
 * Signature 2:
 * @param {String | HTMLDivElement} gd
 *  (as in signature 1)
 * @param {Object} aobj
 *  attribute object `{astr1: val1, astr2: val2 ...}`
 *  allows setting multiple attributes simultaneously
 */
function relayout(gd, astr, val) {
    gd = Lib.getGraphDiv(gd);
    helpers.clearPromiseQueue(gd);

    if(gd.framework && gd.framework.isPolar) {
        return Promise.resolve(gd);
    }

    var aobj = {};
    if(typeof astr === 'string') {
        aobj[astr] = val;
    } else if(Lib.isPlainObject(astr)) {
        aobj = Lib.extendFlat({}, astr);
    } else {
        Lib.warn('Relayout fail.', astr, val);
        return Promise.reject();
    }

    if(Object.keys(aobj).length) gd.changed = true;

    var specs = _relayout(gd, aobj);
    var flags = specs.flags;

    // clear calcdata if required
    if(flags.calc) gd.calcdata = undefined;

    // fill in redraw sequence

    // even if we don't have anything left in aobj,
    // something may have happened within relayout that we
    // need to wait for
    var seq = [Plots.previousPromises];

    if(flags.layoutReplot) {
        seq.push(subroutines.layoutReplot);
    } else if(Object.keys(aobj).length) {
        axRangeSupplyDefaultsByPass(gd, flags, specs) || Plots.supplyDefaults(gd);

        if(flags.legend) seq.push(subroutines.doLegend);
        if(flags.layoutstyle) seq.push(subroutines.layoutStyles);
        if(flags.axrange) addAxRangeSequence(seq, specs.rangesAltered);
        if(flags.ticks) seq.push(subroutines.doTicksRelayout);
        if(flags.modebar) seq.push(subroutines.doModeBar);
        if(flags.camera) seq.push(subroutines.doCamera);
        if(flags.colorbars) seq.push(subroutines.doColorBars);

        seq.push(emitAfterPlot);
    }

    seq.push(Plots.rehover, Plots.redrag);

    Queue.add(gd,
        relayout, [gd, specs.undoit],
        relayout, [gd, specs.redoit]
    );

    var plotDone = Lib.syncOrAsync(seq, gd);
    if(!plotDone || !plotDone.then) plotDone = Promise.resolve(gd);

    return plotDone.then(function() {
        gd.emit('plotly_relayout', specs.eventData);
        return gd;
    });
}

// Optimization mostly for large splom traces where
// Plots.supplyDefaults can take > 100ms
function axRangeSupplyDefaultsByPass(gd, flags, specs) {
    var fullLayout = gd._fullLayout;

    if(!flags.axrange) return false;

    for(var k in flags) {
        if(k !== 'axrange' && flags[k]) return false;
    }

    for(var axId in specs.rangesAltered) {
        var axName = Axes.id2name(axId);
        var axIn = gd.layout[axName];
        var axOut = fullLayout[axName];
        axOut.autorange = axIn.autorange;
        axOut.range = axIn.range.slice();
        axOut.cleanRange();

        if(axOut._matchGroup) {
            for(var axId2 in axOut._matchGroup) {
                if(axId2 !== axId) {
                    var ax2 = fullLayout[Axes.id2name(axId2)];
                    ax2.autorange = axOut.autorange;
                    ax2.range = axOut.range.slice();
                    ax2._input.range = axOut.range.slice();
                }
            }
        }
    }

    return true;
}

function addAxRangeSequence(seq, rangesAltered) {
    // N.B. leave as sequence of subroutines (for now) instead of
    // subroutine of its own so that finalDraw always gets
    // executed after drawData
    var drawAxes = rangesAltered ?
        function(gd) {
            var axIds = [];
            var skipTitle = true;

            for(var id in rangesAltered) {
                var ax = Axes.getFromId(gd, id);
                axIds.push(id);

                if(ax._matchGroup) {
                    for(var id2 in ax._matchGroup) {
                        if(!rangesAltered[id2]) {
                            axIds.push(id2);
                        }
                    }
                }

                if(ax.automargin) skipTitle = false;
            }

            return Axes.draw(gd, axIds, {skipTitle: skipTitle});
        } :
        function(gd) {
            return Axes.draw(gd, 'redraw');
        };

    seq.push(
        clearSelect,
        subroutines.doAutoRangeAndConstraints,
        drawAxes,
        subroutines.drawData,
        subroutines.finalDraw
    );
}

var AX_RANGE_RE = /^[xyz]axis[0-9]*\.range(\[[0|1]\])?$/;
var AX_AUTORANGE_RE = /^[xyz]axis[0-9]*\.autorange$/;
var AX_DOMAIN_RE = /^[xyz]axis[0-9]*\.domain(\[[0|1]\])?$/;

function _relayout(gd, aobj) {
    var layout = gd.layout;
    var fullLayout = gd._fullLayout;
    var guiEditFlag = fullLayout._guiEditing;
    var layoutNP = makeNP(fullLayout._preGUI, guiEditFlag);
    var keys = Object.keys(aobj);
    var axes = Axes.list(gd);
    var eventData = Lib.extendDeepAll({}, aobj);
    var arrayEdits = {};

    var arrayStr, i, j;

    cleanDeprecatedAttributeKeys(aobj);
    keys = Object.keys(aobj);

    // look for 'allaxes', split out into all axes
    // in case of 3D the axis are nested within a scene which is held in _id
    for(i = 0; i < keys.length; i++) {
        if(keys[i].indexOf('allaxes') === 0) {
            for(j = 0; j < axes.length; j++) {
                var scene = axes[j]._id.substr(1);
                var axisAttr = (scene.indexOf('scene') !== -1) ? (scene + '.') : '';
                var newkey = keys[i].replace('allaxes', axisAttr + axes[j]._name);

                if(!aobj[newkey]) aobj[newkey] = aobj[keys[i]];
            }

            delete aobj[keys[i]];
        }
    }

    // initialize flags
    var flags = editTypes.layoutFlags();

    // copies of the change (and previous values of anything affected)
    // for the undo / redo queue
    var redoit = {};
    var undoit = {};

    // for attrs that interact (like scales & autoscales), save the
    // old vals before making the change
    // val=undefined will not set a value, just record what the value was.
    // attr can be an array to set several at once (all to the same val)
    function doextra(attr, val) {
        if(Array.isArray(attr)) {
            attr.forEach(function(a) { doextra(a, val); });
            return;
        }

        // if we have another value for this attribute (explicitly or
        // via a parent) do not override with this auto-generated extra
        if(attr in aobj || helpers.hasParent(aobj, attr)) return;

        var p = layoutNP(layout, attr);
        if(!(attr in undoit)) {
            undoit[attr] = undefinedToNull(p.get());
        }
        if(val !== undefined) p.set(val);
    }

    // for constraint enforcement: keep track of all axes (as {id: name})
    // we're editing the (auto)range of, so we can tell the others constrained
    // to scale with them that it's OK for them to shrink
    var rangesAltered = {};
    var axId;

    function recordAlteredAxis(pleafPlus) {
        var axId = Axes.name2id(pleafPlus.split('.')[0]);
        rangesAltered[axId] = 1;
        return axId;
    }

    // alter gd.layout
    for(var ai in aobj) {
        if(helpers.hasParent(aobj, ai)) {
            throw new Error('cannot set ' + ai + ' and a parent attribute simultaneously');
        }

        var p = layoutNP(layout, ai);
        var vi = aobj[ai];
        var plen = p.parts.length;
        // p.parts may end with an index integer if the property is an array
        var pend = plen - 1;
        while(pend > 0 && typeof p.parts[pend] !== 'string') pend--;
        // last property in chain (leaf node)
        var pleaf = p.parts[pend];
        // leaf plus immediate parent
        var pleafPlus = p.parts[pend - 1] + '.' + pleaf;
        // trunk nodes (everything except the leaf)
        var ptrunk = p.parts.slice(0, pend).join('.');
        var parentIn = nestedProperty(gd.layout, ptrunk).get();
        var parentFull = nestedProperty(fullLayout, ptrunk).get();
        var vOld = p.get();

        if(vi === undefined) continue;

        redoit[ai] = vi;

        // axis reverse is special - it is its own inverse
        // op and has no flag.
        undoit[ai] = (pleaf === 'reverse') ? vi : undefinedToNull(vOld);

        var valObject = PlotSchema.getLayoutValObject(fullLayout, p.parts);

        if(valObject && valObject.impliedEdits && vi !== null) {
            for(var impliedKey in valObject.impliedEdits) {
                doextra(Lib.relativeAttr(ai, impliedKey), valObject.impliedEdits[impliedKey]);
            }
        }

        // Setting width or height to null must reset the graph's width / height
        // back to its initial value as computed during the first pass in Plots.plotAutoSize.
        //
        // To do so, we must manually set them back here using the _initialAutoSize cache.
        // can't use impliedEdits for this because behavior depends on vi
        if(['width', 'height'].indexOf(ai) !== -1) {
            if(vi) {
                doextra('autosize', null);
                // currently we don't support autosize one dim only - so
                // explicitly set the other one. Note that doextra will
                // ignore this if the same relayout call also provides oppositeAttr
                var oppositeAttr = ai === 'height' ? 'width' : 'height';
                doextra(oppositeAttr, fullLayout[oppositeAttr]);
            } else {
                fullLayout[ai] = gd._initialAutoSize[ai];
            }
        } else if(ai === 'autosize') {
            // depends on vi here too, so again can't use impliedEdits
            doextra('width', vi ? null : fullLayout.width);
            doextra('height', vi ? null : fullLayout.height);
        } else if(pleafPlus.match(AX_RANGE_RE)) {
            // check autorange vs range

            recordAlteredAxis(pleafPlus);
            nestedProperty(fullLayout, ptrunk + '._inputRange').set(null);
        } else if(pleafPlus.match(AX_AUTORANGE_RE)) {
            recordAlteredAxis(pleafPlus);
            nestedProperty(fullLayout, ptrunk + '._inputRange').set(null);
            var axFull = nestedProperty(fullLayout, ptrunk).get();
            if(axFull._inputDomain) {
                // if we're autoranging and this axis has a constrained domain,
                // reset it so we don't get locked into a shrunken size
                axFull._input.domain = axFull._inputDomain.slice();
            }
        } else if(pleafPlus.match(AX_DOMAIN_RE)) {
            nestedProperty(fullLayout, ptrunk + '._inputDomain').set(null);
        }

        // toggling axis type between log and linear: we need to convert
        // positions for components that are still using linearized values,
        // not data values like newer components.
        // previously we did this for log <-> not-log, but now only do it
        // for log <-> linear
        if(pleaf === 'type') {
            var ax = parentIn;
            var toLog = parentFull.type === 'linear' && vi === 'log';
            var fromLog = parentFull.type === 'log' && vi === 'linear';

            if(toLog || fromLog) {
                if(!ax || !ax.range) {
                    // 2D never gets here, but 3D does
                    // I don't think this is needed, but left here in case there
                    // are edge cases I'm not thinking of.
                    doextra(ptrunk + '.autorange', true);
                } else if(!parentFull.autorange) {
                    // toggling log without autorange: need to also recalculate ranges
                    // because log axes use linearized values for range endpoints
                    var r0 = ax.range[0];
                    var r1 = ax.range[1];
                    if(toLog) {
                        // if both limits are negative, autorange
                        if(r0 <= 0 && r1 <= 0) {
                            doextra(ptrunk + '.autorange', true);
                        }
                        // if one is negative, set it 6 orders below the other.
                        if(r0 <= 0) r0 = r1 / 1e6;
                        else if(r1 <= 0) r1 = r0 / 1e6;
                        // now set the range values as appropriate
                        doextra(ptrunk + '.range[0]', Math.log(r0) / Math.LN10);
                        doextra(ptrunk + '.range[1]', Math.log(r1) / Math.LN10);
                    } else {
                        doextra(ptrunk + '.range[0]', Math.pow(10, r0));
                        doextra(ptrunk + '.range[1]', Math.pow(10, r1));
                    }
                } else if(toLog) {
                    // just make sure the range is positive and in the right
                    // order, it'll get recalculated later
                    ax.range = (ax.range[1] > ax.range[0]) ? [1, 2] : [2, 1];
                }

                // clear polar view initial stash for radial range so that
                // value get recomputed in correct units
                if(Array.isArray(fullLayout._subplots.polar) &&
                    fullLayout._subplots.polar.length &&
                    fullLayout[p.parts[0]] &&
                    p.parts[1] === 'radialaxis'
                ) {
                    delete fullLayout[p.parts[0]]._subplot.viewInitial['radialaxis.range'];
                }

                // Annotations and images also need to convert to/from linearized coords
                // Shapes do not need this :)
                Registry.getComponentMethod('annotations', 'convertCoords')(gd, parentFull, vi, doextra);
                Registry.getComponentMethod('images', 'convertCoords')(gd, parentFull, vi, doextra);
            } else {
                // any other type changes: the range from the previous type
                // will not make sense, so autorange it.
                doextra(ptrunk + '.autorange', true);
                doextra(ptrunk + '.range', null);
            }
            nestedProperty(fullLayout, ptrunk + '._inputRange').set(null);
        } else if(pleaf.match(AX_NAME_PATTERN)) {
            var fullProp = nestedProperty(fullLayout, ai).get();
            var newType = (vi || {}).type;

            // This can potentially cause strange behavior if the autotype is not
            // numeric (linear, because we don't auto-log) but the previous type
            // was log. That's a very strange edge case though
            if(!newType || newType === '-') newType = 'linear';
            Registry.getComponentMethod('annotations', 'convertCoords')(gd, fullProp, newType, doextra);
            Registry.getComponentMethod('images', 'convertCoords')(gd, fullProp, newType, doextra);
        }

        // alter gd.layout

        // collect array component edits for execution all together
        // so we can ensure consistent behavior adding/removing items
        // and order-independence for add/remove/edit all together in
        // one relayout call
        var containerArrayMatch = manageArrays.containerArrayMatch(ai);
        if(containerArrayMatch) {
            arrayStr = containerArrayMatch.array;
            i = containerArrayMatch.index;
            var propStr = containerArrayMatch.property;
            var updateValObject = valObject || {editType: 'calc'};

            if(i !== '' && propStr === '') {
                // special handling of undoit if we're adding or removing an element
                // ie 'annotations[2]' which can be {...} (add) or null,
                // does not work when replacing the entire array
                if(manageArrays.isAddVal(vi)) {
                    undoit[ai] = null;
                } else if(manageArrays.isRemoveVal(vi)) {
                    undoit[ai] = (nestedProperty(layout, arrayStr).get() || [])[i];
                } else {
                    Lib.warn('unrecognized full object value', aobj);
                }
            }
            editTypes.update(flags, updateValObject);

            // prepare the edits object we'll send to applyContainerArrayChanges
            if(!arrayEdits[arrayStr]) arrayEdits[arrayStr] = {};
            var objEdits = arrayEdits[arrayStr][i];
            if(!objEdits) objEdits = arrayEdits[arrayStr][i] = {};
            objEdits[propStr] = vi;

            delete aobj[ai];
        } else if(pleaf === 'reverse') {
            // handle axis reversal explicitly, as there's no 'reverse' attribute

            if(parentIn.range) parentIn.range.reverse();
            else {
                doextra(ptrunk + '.autorange', true);
                parentIn.range = [1, 0];
            }

            if(parentFull.autorange) flags.calc = true;
            else flags.plot = true;
        } else {
            if((fullLayout._has('scatter-like') && fullLayout._has('regl')) &&
                (ai === 'dragmode' &&
                (vi === 'lasso' || vi === 'select') &&
                !(vOld === 'lasso' || vOld === 'select'))
            ) {
                flags.plot = true;
            } else if(fullLayout._has('gl2d')) {
                flags.plot = true;
            } else if(valObject) editTypes.update(flags, valObject);
            else flags.calc = true;

            p.set(vi);
        }
    }

    // now we've collected component edits - execute them all together
    for(arrayStr in arrayEdits) {
        var finished = manageArrays.applyContainerArrayChanges(gd,
            layoutNP(layout, arrayStr), arrayEdits[arrayStr], flags, layoutNP);
        if(!finished) flags.plot = true;
    }

    // figure out if we need to recalculate axis constraints
    var constraints = fullLayout._axisConstraintGroups || [];
    for(axId in rangesAltered) {
        for(i = 0; i < constraints.length; i++) {
            var group = constraints[i];
            if(group[axId]) {
                // Always recalc if we're changing constrained ranges.
                // Otherwise it's possible to violate the constraints by
                // specifying arbitrary ranges for all axes in the group.
                // this way some ranges may expand beyond what's specified,
                // as they do at first draw, to satisfy the constraints.
                flags.calc = true;
                for(var groupAxId in group) {
                    if(!rangesAltered[groupAxId]) {
                        Axes.getFromId(gd, groupAxId)._constraintShrinkable = true;
                    }
                }
            }
        }
    }

    // If the autosize changed or height or width was explicitly specified,
    // this triggers a redraw
    // TODO: do we really need special aobj.height/width handling here?
    // couldn't editType do this?
    if(updateAutosize(gd) || aobj.height || aobj.width) flags.plot = true;

    if(flags.plot || flags.calc) {
        flags.layoutReplot = true;
    }

    // now all attribute mods are done, as are
    // redo and undo so we can save them

    return {
        flags: flags,
        rangesAltered: rangesAltered,
        undoit: undoit,
        redoit: redoit,
        eventData: eventData
    };
}

/*
 * updateAutosize: we made a change, does it change the autosize result?
 * puts the new size into fullLayout
 * returns true if either height or width changed
 */
function updateAutosize(gd) {
    var fullLayout = gd._fullLayout;
    var oldWidth = fullLayout.width;
    var oldHeight = fullLayout.height;

    // calculate autosizing
    if(gd.layout.autosize) Plots.plotAutoSize(gd, gd.layout, fullLayout);

    return (fullLayout.width !== oldWidth) || (fullLayout.height !== oldHeight);
}

/**
 * update: update trace and layout attributes of an existing plot
 *
 * @param {String | HTMLDivElement} gd
 *  the id or DOM element of the graph container div
 * @param {Object} traceUpdate
 *  attribute object `{astr1: val1, astr2: val2 ...}`
 *  corresponding to updates in the plot's traces
 * @param {Object} layoutUpdate
 *  attribute object `{astr1: val1, astr2: val2 ...}`
 *  corresponding to updates in the plot's layout
 * @param {Number[] | Number} [traces]
 *  integer or array of integers for the traces to alter (all if omitted)
 *
 */
function update(gd, traceUpdate, layoutUpdate, _traces) {
    gd = Lib.getGraphDiv(gd);
    helpers.clearPromiseQueue(gd);

    if(gd.framework && gd.framework.isPolar) {
        return Promise.resolve(gd);
    }

    if(!Lib.isPlainObject(traceUpdate)) traceUpdate = {};
    if(!Lib.isPlainObject(layoutUpdate)) layoutUpdate = {};

    if(Object.keys(traceUpdate).length) gd.changed = true;
    if(Object.keys(layoutUpdate).length) gd.changed = true;

    var traces = helpers.coerceTraceIndices(gd, _traces);

    var restyleSpecs = _restyle(gd, Lib.extendFlat({}, traceUpdate), traces);
    var restyleFlags = restyleSpecs.flags;

    var relayoutSpecs = _relayout(gd, Lib.extendFlat({}, layoutUpdate));
    var relayoutFlags = relayoutSpecs.flags;

    // clear calcdata and/or axis types if required
    if(restyleFlags.calc || relayoutFlags.calc) gd.calcdata = undefined;
    if(restyleFlags.clearAxisTypes) helpers.clearAxisTypes(gd, traces, layoutUpdate);

    // fill in redraw sequence
    var seq = [];

    if(relayoutFlags.layoutReplot) {
        // N.B. works fine when both
        // relayoutFlags.layoutReplot and restyleFlags.fullReplot are true
        seq.push(subroutines.layoutReplot);
    } else if(restyleFlags.fullReplot) {
        seq.push(exports.plot);
    } else {
        seq.push(Plots.previousPromises);
        axRangeSupplyDefaultsByPass(gd, relayoutFlags, relayoutSpecs) || Plots.supplyDefaults(gd);

        if(restyleFlags.style) seq.push(subroutines.doTraceStyle);
        if(restyleFlags.colorbars || relayoutFlags.colorbars) seq.push(subroutines.doColorBars);
        if(relayoutFlags.legend) seq.push(subroutines.doLegend);
        if(relayoutFlags.layoutstyle) seq.push(subroutines.layoutStyles);
        if(relayoutFlags.axrange) addAxRangeSequence(seq, relayoutSpecs.rangesAltered);
        if(relayoutFlags.ticks) seq.push(subroutines.doTicksRelayout);
        if(relayoutFlags.modebar) seq.push(subroutines.doModeBar);
        if(relayoutFlags.camera) seq.push(subroutines.doCamera);

        seq.push(emitAfterPlot);
    }

    seq.push(Plots.rehover, Plots.redrag);

    Queue.add(gd,
        update, [gd, restyleSpecs.undoit, relayoutSpecs.undoit, restyleSpecs.traces],
        update, [gd, restyleSpecs.redoit, relayoutSpecs.redoit, restyleSpecs.traces]
    );

    var plotDone = Lib.syncOrAsync(seq, gd);
    if(!plotDone || !plotDone.then) plotDone = Promise.resolve(gd);

    return plotDone.then(function() {
        gd.emit('plotly_update', {
            data: restyleSpecs.eventData,
            layout: relayoutSpecs.eventData
        });

        return gd;
    });
}

/*
 * internal-use-only restyle/relayout/update variants that record the initial
 * values in (fullLayout|fullTrace)._preGUI so changes can be persisted across
 * Plotly.react data updates, dependent on uirevision attributes
 */
function guiEdit(func) {
    return function wrappedEdit(gd) {
        gd._fullLayout._guiEditing = true;
        var p = func.apply(null, arguments);
        gd._fullLayout._guiEditing = false;
        return p;
    };
}

// For connecting edited layout attributes to uirevision attrs
// If no `attr` we use `match[1] + '.uirevision'`
// Ordered by most common edits first, to minimize our search time
var layoutUIControlPatterns = [
    {pattern: /^hiddenlabels/, attr: 'legend.uirevision'},
    {pattern: /^((x|y)axis\d*)\.((auto)?range|title\.text)/},

    // showspikes and modes include those nested inside scenes
    {pattern: /axis\d*\.showspikes$/, attr: 'modebar.uirevision'},
    {pattern: /(hover|drag)mode$/, attr: 'modebar.uirevision'},

    {pattern: /^(scene\d*)\.camera/},
    {pattern: /^(geo\d*)\.(projection|center|fitbounds)/},
    {pattern: /^(ternary\d*\.[abc]axis)\.(min|title\.text)$/},
    {pattern: /^(polar\d*\.radialaxis)\.((auto)?range|angle|title\.text)/},
    {pattern: /^(polar\d*\.angularaxis)\.rotation/},
    {pattern: /^(mapbox\d*)\.(center|zoom|bearing|pitch)/},

    {pattern: /^legend\.(x|y)$/, attr: 'editrevision'},
    {pattern: /^(shapes|annotations)/, attr: 'editrevision'},
    {pattern: /^title\.text$/, attr: 'editrevision'}
];

// same for trace attributes: if `attr` is given it's in layout,
// or with no `attr` we use `trace.uirevision`
var traceUIControlPatterns = [
    {pattern: /^selectedpoints$/, attr: 'selectionrevision'},
    // "visible" includes trace.transforms[i].styles[j].value.visible
    {pattern: /(^|value\.)visible$/, attr: 'legend.uirevision'},
    {pattern: /^dimensions\[\d+\]\.constraintrange/},
    {pattern: /^node\.(x|y|groups)/}, // for Sankey nodes
    {pattern: /^level$/}, // for Sunburst & Treemap traces

    // below this you must be in editable: true mode
    // TODO: I still put name and title with `trace.uirevision`
    // reasonable or should these be `editrevision`?
    // Also applies to axis titles up in the layout section

    // "name" also includes transform.styles
    {pattern: /(^|value\.)name$/},
    // including nested colorbar attributes (ie marker.colorbar)
    {pattern: /colorbar\.title\.text$/},
    {pattern: /colorbar\.(x|y)$/, attr: 'editrevision'}
];

function findUIPattern(key, patternSpecs) {
    for(var i = 0; i < patternSpecs.length; i++) {
        var spec = patternSpecs[i];
        var match = key.match(spec.pattern);
        if(match) {
            return {head: match[1], attr: spec.attr};
        }
    }
}

// We're finding the new uirevision before supplyDefaults, so do the
// inheritance manually. Note that only `undefined` inherits - other
// falsy values are returned.
function getNewRev(revAttr, container) {
    var newRev = nestedProperty(container, revAttr).get();
    if(newRev !== undefined) return newRev;

    var parts = revAttr.split('.');
    parts.pop();
    while(parts.length > 1) {
        parts.pop();
        newRev = nestedProperty(container, parts.join('.') + '.uirevision').get();
        if(newRev !== undefined) return newRev;
    }

    return container.uirevision;
}

function getFullTraceIndexFromUid(uid, fullData) {
    for(var i = 0; i < fullData.length; i++) {
        if(fullData[i]._fullInput.uid === uid) return i;
    }
    return -1;
}

function getTraceIndexFromUid(uid, data, tracei) {
    for(var i = 0; i < data.length; i++) {
        if(data[i].uid === uid) return i;
    }
    // fall back on trace order, but only if user didn't provide a uid for that trace
    return (!data[tracei] || data[tracei].uid) ? -1 : tracei;
}

function valsMatch(v1, v2) {
    var v1IsObj = Lib.isPlainObject(v1);
    var v1IsArray = Array.isArray(v1);
    if(v1IsObj || v1IsArray) {
        return (
            (v1IsObj && Lib.isPlainObject(v2)) ||
            (v1IsArray && Array.isArray(v2))
        ) && JSON.stringify(v1) === JSON.stringify(v2);
    }
    return v1 === v2;
}

function applyUIRevisions(data, layout, oldFullData, oldFullLayout) {
    var layoutPreGUI = oldFullLayout._preGUI;
    var key, revAttr, oldRev, newRev, match, preGUIVal, newNP, newVal;
    var bothInheritAutorange = [];
    var newRangeAccepted = {};
    for(key in layoutPreGUI) {
        match = findUIPattern(key, layoutUIControlPatterns);
        if(match) {
            revAttr = match.attr || (match.head + '.uirevision');
            oldRev = nestedProperty(oldFullLayout, revAttr).get();
            newRev = oldRev && getNewRev(revAttr, layout);
            if(newRev && (newRev === oldRev)) {
                preGUIVal = layoutPreGUI[key];
                if(preGUIVal === null) preGUIVal = undefined;
                newNP = nestedProperty(layout, key);
                newVal = newNP.get();
                if(valsMatch(newVal, preGUIVal)) {
                    if(newVal === undefined && key.substr(key.length - 9) === 'autorange') {
                        bothInheritAutorange.push(key.substr(0, key.length - 10));
                    }
                    newNP.set(undefinedToNull(nestedProperty(oldFullLayout, key).get()));
                    continue;
                }
            }
        } else {
            Lib.warn('unrecognized GUI edit: ' + key);
        }
        // if we got this far, the new value was accepted as the new starting
        // point (either because it changed or revision changed)
        // so remove it from _preGUI for next time.
        delete layoutPreGUI[key];

        if(key.substr(key.length - 8, 6) === 'range[') {
            newRangeAccepted[key.substr(0, key.length - 9)] = 1;
        }
    }

    // Special logic for `autorange`, since it interacts with `range`:
    // If the new figure's matching `range` was kept, and `autorange`
    // wasn't supplied explicitly in either the original or the new figure,
    // we shouldn't alter that - but we may just have done that, so fix it.
    for(var i = 0; i < bothInheritAutorange.length; i++) {
        var axAttr = bothInheritAutorange[i];
        if(newRangeAccepted[axAttr]) {
            var newAx = nestedProperty(layout, axAttr).get();
            if(newAx) delete newAx.autorange;
        }
    }

    // Now traces - try to match them up by uid (in case we added/deleted in
    // the middle), then fall back on index.
    var allTracePreGUI = oldFullLayout._tracePreGUI;
    for(var uid in allTracePreGUI) {
        var tracePreGUI = allTracePreGUI[uid];
        var newTrace = null;
        var fullInput;
        for(key in tracePreGUI) {
            // wait until we know we have preGUI values to look for traces
            // but if we don't find both, stop looking at this uid
            if(!newTrace) {
                var fulli = getFullTraceIndexFromUid(uid, oldFullData);
                if(fulli < 0) {
                    // Somehow we didn't even have this trace in oldFullData...
                    // I guess this could happen with `deleteTraces` or something
                    delete allTracePreGUI[uid];
                    break;
                }
                var fullTrace = oldFullData[fulli];
                fullInput = fullTrace._fullInput;

                var newTracei = getTraceIndexFromUid(uid, data, fullInput.index);
                if(newTracei < 0) {
                    // No match in new data
                    delete allTracePreGUI[uid];
                    break;
                }
                newTrace = data[newTracei];
            }

            match = findUIPattern(key, traceUIControlPatterns);
            if(match) {
                if(match.attr) {
                    oldRev = nestedProperty(oldFullLayout, match.attr).get();
                    newRev = oldRev && getNewRev(match.attr, layout);
                } else {
                    oldRev = fullInput.uirevision;
                    // inheritance for trace.uirevision is simple, just layout.uirevision
                    newRev = newTrace.uirevision;
                    if(newRev === undefined) newRev = layout.uirevision;
                }

                if(newRev && newRev === oldRev) {
                    preGUIVal = tracePreGUI[key];
                    if(preGUIVal === null) preGUIVal = undefined;
                    newNP = nestedProperty(newTrace, key);
                    newVal = newNP.get();
                    if(valsMatch(newVal, preGUIVal)) {
                        newNP.set(undefinedToNull(nestedProperty(fullInput, key).get()));
                        continue;
                    }
                }
            } else {
                Lib.warn('unrecognized GUI edit: ' + key + ' in trace uid ' + uid);
            }
            delete tracePreGUI[key];
        }
    }
}

/**
 * Plotly.react:
 * A plot/update method that takes the full plot state (same API as plot/newPlot)
 * and diffs to determine the minimal update pathway
 *
 * @param {string id or DOM element} gd
 *      the id or DOM element of the graph container div
 * @param {array of objects} data
 *      array of traces, containing the data and display information for each trace
 * @param {object} layout
 *      object describing the overall display of the plot,
 *      all the stuff that doesn't pertain to any individual trace
 * @param {object} config
 *      configuration options (see ./plot_config.js for more info)
 *
 * OR
 *
 * @param {string id or DOM element} gd
 *      the id or DOM element of the graph container div
 * @param {object} figure
 *      object containing `data`, `layout`, `config`, and `frames` members
 *
 */
function react(gd, data, layout, config) {
    var frames, plotDone;

    function addFrames() { return exports.addFrames(gd, frames); }

    gd = Lib.getGraphDiv(gd);
    helpers.clearPromiseQueue(gd);

    var oldFullData = gd._fullData;
    var oldFullLayout = gd._fullLayout;

    // you can use this as the initial draw as well as to update
    if(!Lib.isPlotDiv(gd) || !oldFullData || !oldFullLayout) {
        plotDone = exports.newPlot(gd, data, layout, config);
    } else {
        if(Lib.isPlainObject(data)) {
            var obj = data;
            data = obj.data;
            layout = obj.layout;
            config = obj.config;
            frames = obj.frames;
        }

        var configChanged = false;
        // assume that if there's a config at all, we're reacting to it too,
        // and completely replace the previous config
        if(config) {
            var oldConfig = Lib.extendDeep({}, gd._context);
            gd._context = undefined;
            setPlotContext(gd, config);
            configChanged = diffConfig(oldConfig, gd._context);
        }

        gd.data = data || [];
        helpers.cleanData(gd.data);
        gd.layout = layout || {};
        helpers.cleanLayout(gd.layout);

        applyUIRevisions(gd.data, gd.layout, oldFullData, oldFullLayout);

        // "true" skips updating calcdata and remapping arrays from calcTransforms,
        // which supplyDefaults usually does at the end, but we may need to NOT do
        // if the diff (which we haven't determined yet) says we'll recalc
        Plots.supplyDefaults(gd, {skipUpdateCalc: true});

        var newFullData = gd._fullData;
        var newFullLayout = gd._fullLayout;
        var immutable = newFullLayout.datarevision === undefined;
        var transition = newFullLayout.transition;

        var relayoutFlags = diffLayout(gd, oldFullLayout, newFullLayout, immutable, transition);
        var newDataRevision = relayoutFlags.newDataRevision;
        var restyleFlags = diffData(gd, oldFullData, newFullData, immutable, transition, newDataRevision);

        // TODO: how to translate this part of relayout to Plotly.react?
        // // Setting width or height to null must reset the graph's width / height
        // // back to its initial value as computed during the first pass in Plots.plotAutoSize.
        // //
        // // To do so, we must manually set them back here using the _initialAutoSize cache.
        // if(['width', 'height'].indexOf(ai) !== -1 && vi === null) {
        //     fullLayout[ai] = gd._initialAutoSize[ai];
        // }

        if(updateAutosize(gd)) relayoutFlags.layoutReplot = true;

        // clear calcdata if required
        if(restyleFlags.calc || relayoutFlags.calc) gd.calcdata = undefined;
        // otherwise do the calcdata updates and calcTransform array remaps that we skipped earlier
        else Plots.supplyDefaultsUpdateCalc(gd.calcdata, newFullData);

        // Note: what restyle/relayout use impliedEdits and clearAxisTypes for
        // must be handled by the user when using Plotly.react.

        // fill in redraw sequence
        var seq = [];

        if(frames) {
            gd._transitionData = {};
            Plots.createTransitionData(gd);
            seq.push(addFrames);
        }

        // Transition pathway,
        // only used when 'transition' is set by user and
        // when at least one animatable attribute has changed,
        // N.B. config changed aren't animatable
        if(newFullLayout.transition && !configChanged && (restyleFlags.anim || relayoutFlags.anim)) {
            Plots.doCalcdata(gd);
            subroutines.doAutoRangeAndConstraints(gd);

            seq.push(function() {
                return Plots.transitionFromReact(gd, restyleFlags, relayoutFlags, oldFullLayout);
            });
        } else if(restyleFlags.fullReplot || relayoutFlags.layoutReplot || configChanged) {
            gd._fullLayout._skipDefaults = true;
            seq.push(exports.plot);
        } else {
            for(var componentType in relayoutFlags.arrays) {
                var indices = relayoutFlags.arrays[componentType];
                if(indices.length) {
                    var drawOne = Registry.getComponentMethod(componentType, 'drawOne');
                    if(drawOne !== Lib.noop) {
                        for(var i = 0; i < indices.length; i++) {
                            drawOne(gd, indices[i]);
                        }
                    } else {
                        var draw = Registry.getComponentMethod(componentType, 'draw');
                        if(draw === Lib.noop) {
                            throw new Error('cannot draw components: ' + componentType);
                        }
                        draw(gd);
                    }
                }
            }

            seq.push(Plots.previousPromises);
            if(restyleFlags.style) seq.push(subroutines.doTraceStyle);
            if(restyleFlags.colorbars || relayoutFlags.colorbars) seq.push(subroutines.doColorBars);
            if(relayoutFlags.legend) seq.push(subroutines.doLegend);
            if(relayoutFlags.layoutstyle) seq.push(subroutines.layoutStyles);
            if(relayoutFlags.axrange) addAxRangeSequence(seq);
            if(relayoutFlags.ticks) seq.push(subroutines.doTicksRelayout);
            if(relayoutFlags.modebar) seq.push(subroutines.doModeBar);
            if(relayoutFlags.camera) seq.push(subroutines.doCamera);
            seq.push(emitAfterPlot);
        }

        seq.push(Plots.rehover, Plots.redrag);

        plotDone = Lib.syncOrAsync(seq, gd);
        if(!plotDone || !plotDone.then) plotDone = Promise.resolve(gd);
    }

    return plotDone.then(function() {
        gd.emit('plotly_react', {
            data: data,
            layout: layout
        });

        return gd;
    });
}

function diffData(gd, oldFullData, newFullData, immutable, transition, newDataRevision) {
    var sameTraceLength = oldFullData.length === newFullData.length;

    if(!transition && !sameTraceLength) {
        return {
            fullReplot: true,
            calc: true
        };
    }

    var flags = editTypes.traceFlags();
    flags.arrays = {};
    flags.nChanges = 0;
    flags.nChangesAnim = 0;

    var i, trace;

    function getTraceValObject(parts) {
        var out = PlotSchema.getTraceValObject(trace, parts);
        if(!trace._module.animatable && out.anim) {
            out.anim = false;
        }
        return out;
    }

    var diffOpts = {
        getValObject: getTraceValObject,
        flags: flags,
        immutable: immutable,
        transition: transition,
        newDataRevision: newDataRevision,
        gd: gd
    };

    var seenUIDs = {};

    for(i = 0; i < oldFullData.length; i++) {
        if(newFullData[i]) {
            trace = newFullData[i]._fullInput;
            if(Plots.hasMakesDataTransform(trace)) trace = newFullData[i];
            if(seenUIDs[trace.uid]) continue;
            seenUIDs[trace.uid] = 1;

            getDiffFlags(oldFullData[i]._fullInput, trace, [], diffOpts);
        }
    }

    if(flags.calc || flags.plot) {
        flags.fullReplot = true;
    }

    if(transition && flags.nChanges && flags.nChangesAnim) {
        flags.anim = (flags.nChanges === flags.nChangesAnim) && sameTraceLength ? 'all' : 'some';
    }

    return flags;
}

function diffLayout(gd, oldFullLayout, newFullLayout, immutable, transition) {
    var flags = editTypes.layoutFlags();
    flags.arrays = {};
    flags.rangesAltered = {};
    flags.nChanges = 0;
    flags.nChangesAnim = 0;

    function getLayoutValObject(parts) {
        return PlotSchema.getLayoutValObject(newFullLayout, parts);
    }

    var diffOpts = {
        getValObject: getLayoutValObject,
        flags: flags,
        immutable: immutable,
        transition: transition,
        gd: gd
    };

    getDiffFlags(oldFullLayout, newFullLayout, [], diffOpts);

    if(flags.plot || flags.calc) {
        flags.layoutReplot = true;
    }

    if(transition && flags.nChanges && flags.nChangesAnim) {
        flags.anim = flags.nChanges === flags.nChangesAnim ? 'all' : 'some';
    }

    return flags;
}

function getDiffFlags(oldContainer, newContainer, outerparts, opts) {
    var valObject, key, astr;

    var getValObject = opts.getValObject;
    var flags = opts.flags;
    var immutable = opts.immutable;
    var inArray = opts.inArray;
    var arrayIndex = opts.arrayIndex;

    function changed() {
        var editType = valObject.editType;
        if(inArray && editType.indexOf('arraydraw') !== -1) {
            Lib.pushUnique(flags.arrays[inArray], arrayIndex);
            return;
        }
        editTypes.update(flags, valObject);

        if(editType !== 'none') {
            flags.nChanges++;
        }

        // track animatable changes
        if(opts.transition && valObject.anim) {
            flags.nChangesAnim++;
        }

        // track cartesian axes with altered ranges
        if(AX_RANGE_RE.test(astr) || AX_AUTORANGE_RE.test(astr)) {
            flags.rangesAltered[outerparts[0]] = 1;
        }

        // clear _inputDomain on cartesian axes with altered domains
        if(AX_DOMAIN_RE.test(astr)) {
            nestedProperty(newContainer, '_inputDomain').set(null);
        }

        // track datarevision changes
        if(key === 'datarevision') {
            flags.newDataRevision = 1;
        }
    }

    function valObjectCanBeDataArray(valObject) {
        return valObject.valType === 'data_array' || valObject.arrayOk;
    }

    for(key in oldContainer) {
        // short-circuit based on previous calls or previous keys that already maximized the pathway
        if(flags.calc && !opts.transition) return;

        var oldVal = oldContainer[key];
        var newVal = newContainer[key];
        var parts = outerparts.concat(key);
        astr = parts.join('.');

        if(key.charAt(0) === '_' || typeof oldVal === 'function' || oldVal === newVal) continue;

        // FIXME: ax.tick0 and dtick get filled in during plotting (except for geo subplots),
        // and unlike other auto values they don't make it back into the input,
        // so newContainer won't have them.
        if((key === 'tick0' || key === 'dtick') && outerparts[0] !== 'geo') {
            var tickMode = newContainer.tickmode;
            if(tickMode === 'auto' || tickMode === 'array' || !tickMode) continue;
        }
        // FIXME: Similarly for axis ranges for 3D
        // contourcarpet doesn't HAVE zmin/zmax, they're just auto-added. It needs them.
        if(key === 'range' && newContainer.autorange) continue;
        if((key === 'zmin' || key === 'zmax') && newContainer.type === 'contourcarpet') continue;

        valObject = getValObject(parts);

        // in case type changed, we may not even *have* a valObject.
        if(!valObject) continue;

        if(valObject._compareAsJSON && JSON.stringify(oldVal) === JSON.stringify(newVal)) continue;

        var valType = valObject.valType;
        var i;

        var canBeDataArray = valObjectCanBeDataArray(valObject);
        var wasArray = Array.isArray(oldVal);
        var nowArray = Array.isArray(newVal);

        // hack for traces that modify the data in supplyDefaults, like
        // converting 1D to 2D arrays, which will always create new objects
        if(wasArray && nowArray) {
            var inputKey = '_input_' + key;
            var oldValIn = oldContainer[inputKey];
            var newValIn = newContainer[inputKey];
            if(Array.isArray(oldValIn) && oldValIn === newValIn) continue;
        }

        if(newVal === undefined) {
            if(canBeDataArray && wasArray) flags.calc = true;
            else changed();
        } else if(valObject._isLinkedToArray) {
            var arrayEditIndices = [];
            var extraIndices = false;
            if(!inArray) flags.arrays[key] = arrayEditIndices;

            var minLen = Math.min(oldVal.length, newVal.length);
            var maxLen = Math.max(oldVal.length, newVal.length);
            if(minLen !== maxLen) {
                if(valObject.editType === 'arraydraw') {
                    extraIndices = true;
                } else {
                    changed();
                    continue;
                }
            }

            for(i = 0; i < minLen; i++) {
                getDiffFlags(oldVal[i], newVal[i], parts.concat(i),
                    // add array indices, but not if we're already in an array
                    Lib.extendFlat({inArray: key, arrayIndex: i}, opts));
            }

            // put this at the end so that we know our collected array indices are sorted
            // but the check for length changes happens up front so we can short-circuit
            // diffing if appropriate
            if(extraIndices) {
                for(i = minLen; i < maxLen; i++) {
                    arrayEditIndices.push(i);
                }
            }
        } else if(!valType && Lib.isPlainObject(oldVal)) {
            getDiffFlags(oldVal, newVal, parts, opts);
        } else if(canBeDataArray) {
            if(wasArray && nowArray) {
                // don't try to diff two data arrays. If immutable we know the data changed,
                // if not, assume it didn't and let `layout.datarevision` tell us if it did
                if(immutable) {
                    flags.calc = true;
                }

                // look for animatable attributes when the data changed
                if(immutable || opts.newDataRevision) {
                    changed();
                }
            } else if(wasArray !== nowArray) {
                flags.calc = true;
            } else changed();
        } else if(wasArray && nowArray) {
            // info array, colorscale, 'any' - these are short, just stringify.
            // I don't *think* that covers up any real differences post-validation, does it?
            // otherwise we need to dive in 1 (info_array) or 2 (colorscale) levels and compare
            // all elements.
            if(oldVal.length !== newVal.length || String(oldVal) !== String(newVal)) {
                changed();
            }
        } else {
            changed();
        }
    }

    for(key in newContainer) {
        if(!(key in oldContainer || key.charAt(0) === '_' || typeof newContainer[key] === 'function')) {
            valObject = getValObject(outerparts.concat(key));

            if(valObjectCanBeDataArray(valObject) && Array.isArray(newContainer[key])) {
                flags.calc = true;
                return;
            } else changed();
        }
    }
}

/*
 * simple diff for config - for now, just treat all changes as equivalent
 */
function diffConfig(oldConfig, newConfig) {
    var key;

    for(key in oldConfig) {
        if(key.charAt(0) === '_') continue;
        var oldVal = oldConfig[key];
        var newVal = newConfig[key];
        if(oldVal !== newVal) {
            if(Lib.isPlainObject(oldVal) && Lib.isPlainObject(newVal)) {
                if(diffConfig(oldVal, newVal)) {
                    return true;
                }
            } else if(Array.isArray(oldVal) && Array.isArray(newVal)) {
                if(oldVal.length !== newVal.length) {
                    return true;
                }
                for(var i = 0; i < oldVal.length; i++) {
                    if(oldVal[i] !== newVal[i]) {
                        if(Lib.isPlainObject(oldVal[i]) && Lib.isPlainObject(newVal[i])) {
                            if(diffConfig(oldVal[i], newVal[i])) {
                                return true;
                            }
                        } else {
                            return true;
                        }
                    }
                }
            } else {
                return true;
            }
        }
    }
}

/**
 * Animate to a frame, sequence of frame, frame group, or frame definition
 *
 * @param {string id or DOM element} gd
 *      the id or DOM element of the graph container div
 *
 * @param {string or object or array of strings or array of objects} frameOrGroupNameOrFrameList
 *      a single frame, array of frames, or group to which to animate. The intent is
 *      inferred by the type of the input. Valid inputs are:
 *
 *      - string, e.g. 'groupname': animate all frames of a given `group` in the order
 *            in which they are defined via `Plotly.addFrames`.
 *
 *      - array of strings, e.g. ['frame1', frame2']: a list of frames by name to which
 *            to animate in sequence
 *
 *      - object: {data: ...}: a frame definition to which to animate. The frame is not
 *            and does not need to be added via `Plotly.addFrames`. It may contain any of
 *            the properties of a frame, including `data`, `layout`, and `traces`. The
 *            frame is used as provided and does not use the `baseframe` property.
 *
 *      - array of objects, e.g. [{data: ...}, {data: ...}]: a list of frame objects,
 *            each following the same rules as a single `object`.
 *
 * @param {object} animationOpts
 *      configuration for the animation
 */
function animate(gd, frameOrGroupNameOrFrameList, animationOpts) {
    gd = Lib.getGraphDiv(gd);

    if(!Lib.isPlotDiv(gd)) {
        throw new Error(
            'This element is not a Plotly plot: ' + gd + '. It\'s likely that you\'ve failed ' +
            'to create a plot before animating it. For more details, see ' +
            'https://plotly.com/javascript/animations/'
        );
    }

    var trans = gd._transitionData;

    // This is the queue of frames that will be animated as soon as possible. They
    // are popped immediately upon the *start* of a transition:
    if(!trans._frameQueue) {
        trans._frameQueue = [];
    }

    animationOpts = Plots.supplyAnimationDefaults(animationOpts);
    var transitionOpts = animationOpts.transition;
    var frameOpts = animationOpts.frame;

    // Since frames are popped immediately, an empty queue only means all frames have
    // *started* to transition, not that the animation is complete. To solve that,
    // track a separate counter that increments at the same time as frames are added
    // to the queue, but decrements only when the transition is complete.
    if(trans._frameWaitingCnt === undefined) {
        trans._frameWaitingCnt = 0;
    }

    function getTransitionOpts(i) {
        if(Array.isArray(transitionOpts)) {
            if(i >= transitionOpts.length) {
                return transitionOpts[0];
            } else {
                return transitionOpts[i];
            }
        } else {
            return transitionOpts;
        }
    }

    function getFrameOpts(i) {
        if(Array.isArray(frameOpts)) {
            if(i >= frameOpts.length) {
                return frameOpts[0];
            } else {
                return frameOpts[i];
            }
        } else {
            return frameOpts;
        }
    }

    // Execute a callback after the wrapper function has been called n times.
    // This is used to defer the resolution until a transition has resovled *and*
    // the frame has completed. If it's not done this way, then we get a race
    // condition in which the animation might resolve before a transition is complete
    // or vice versa.
    function callbackOnNthTime(cb, n) {
        var cnt = 0;
        return function() {
            if(cb && ++cnt === n) {
                return cb();
            }
        };
    }

    return new Promise(function(resolve, reject) {
        function discardExistingFrames() {
            if(trans._frameQueue.length === 0) {
                return;
            }

            while(trans._frameQueue.length) {
                var next = trans._frameQueue.pop();
                if(next.onInterrupt) {
                    next.onInterrupt();
                }
            }

            gd.emit('plotly_animationinterrupted', []);
        }

        function queueFrames(frameList) {
            if(frameList.length === 0) return;

            for(var i = 0; i < frameList.length; i++) {
                var computedFrame;

                if(frameList[i].type === 'byname') {
                    // If it's a named frame, compute it:
                    computedFrame = Plots.computeFrame(gd, frameList[i].name);
                } else {
                    // Otherwise we must have been given a simple object, so treat
                    // the input itself as the computed frame.
                    computedFrame = frameList[i].data;
                }

                var frameOpts = getFrameOpts(i);
                var transitionOpts = getTransitionOpts(i);

                // It doesn't make much sense for the transition duration to be greater than
                // the frame duration, so limit it:
                transitionOpts.duration = Math.min(transitionOpts.duration, frameOpts.duration);

                var nextFrame = {
                    frame: computedFrame,
                    name: frameList[i].name,
                    frameOpts: frameOpts,
                    transitionOpts: transitionOpts,
                };
                if(i === frameList.length - 1) {
                    // The last frame in this .animate call stores the promise resolve
                    // and reject callbacks. This is how we ensure that the animation
                    // loop (which may exist as a result of a *different* .animate call)
                    // still resolves or rejecdts this .animate call's promise. once it's
                    // complete.
                    nextFrame.onComplete = callbackOnNthTime(resolve, 2);
                    nextFrame.onInterrupt = reject;
                }

                trans._frameQueue.push(nextFrame);
            }

            // Set it as never having transitioned to a frame. This will cause the animation
            // loop to immediately transition to the next frame (which, for immediate mode,
            // is the first frame in the list since all others would have been discarded
            // below)
            if(animationOpts.mode === 'immediate') {
                trans._lastFrameAt = -Infinity;
            }

            // Only it's not already running, start a RAF loop. This could be avoided in the
            // case that there's only one frame, but it significantly complicated the logic
            // and only sped things up by about 5% or so for a lorenz attractor simulation.
            // It would be a fine thing to implement, but the benefit of that optimization
            // doesn't seem worth the extra complexity.
            if(!trans._animationRaf) {
                beginAnimationLoop();
            }
        }

        function stopAnimationLoop() {
            gd.emit('plotly_animated');

            // Be sure to unset also since it's how we know whether a loop is already running:
            window.cancelAnimationFrame(trans._animationRaf);
            trans._animationRaf = null;
        }

        function nextFrame() {
            if(trans._currentFrame && trans._currentFrame.onComplete) {
                // Execute the callback and unset it to ensure it doesn't
                // accidentally get called twice
                trans._currentFrame.onComplete();
            }

            var newFrame = trans._currentFrame = trans._frameQueue.shift();

            if(newFrame) {
                // Since it's sometimes necessary to do deep digging into frame data,
                // we'll consider it not 100% impossible for nulls or numbers to sneak through,
                // so check when casting the name, just to be absolutely certain:
                var stringName = newFrame.name ? newFrame.name.toString() : null;
                gd._fullLayout._currentFrame = stringName;

                trans._lastFrameAt = Date.now();
                trans._timeToNext = newFrame.frameOpts.duration;

                // This is simply called and it's left to .transition to decide how to manage
                // interrupting current transitions. That means we don't need to worry about
                // how it resolves or what happens after this:
                Plots.transition(gd,
                    newFrame.frame.data,
                    newFrame.frame.layout,
                    helpers.coerceTraceIndices(gd, newFrame.frame.traces),
                    newFrame.frameOpts,
                    newFrame.transitionOpts
                ).then(function() {
                    if(newFrame.onComplete) {
                        newFrame.onComplete();
                    }
                });

                gd.emit('plotly_animatingframe', {
                    name: stringName,
                    frame: newFrame.frame,
                    animation: {
                        frame: newFrame.frameOpts,
                        transition: newFrame.transitionOpts,
                    }
                });
            } else {
                // If there are no more frames, then stop the RAF loop:
                stopAnimationLoop();
            }
        }

        function beginAnimationLoop() {
            gd.emit('plotly_animating');

            // If no timer is running, then set last frame = long ago so that the next
            // frame is immediately transitioned:
            trans._lastFrameAt = -Infinity;
            trans._timeToNext = 0;
            trans._runningTransitions = 0;
            trans._currentFrame = null;

            var doFrame = function() {
                // This *must* be requested before nextFrame since nextFrame may decide
                // to cancel it if there's nothing more to animated:
                trans._animationRaf = window.requestAnimationFrame(doFrame);

                // Check if we're ready for a new frame:
                if(Date.now() - trans._lastFrameAt > trans._timeToNext) {
                    nextFrame();
                }
            };

            doFrame();
        }

        // This is an animate-local counter that helps match up option input list
        // items with the particular frame.
        var configCounter = 0;
        function setTransitionConfig(frame) {
            if(Array.isArray(transitionOpts)) {
                if(configCounter >= transitionOpts.length) {
                    frame.transitionOpts = transitionOpts[configCounter];
                } else {
                    frame.transitionOpts = transitionOpts[0];
                }
            } else {
                frame.transitionOpts = transitionOpts;
            }
            configCounter++;
            return frame;
        }

        // Disambiguate what's sort of frames have been received
        var i, frame;
        var frameList = [];
        var allFrames = frameOrGroupNameOrFrameList === undefined || frameOrGroupNameOrFrameList === null;
        var isFrameArray = Array.isArray(frameOrGroupNameOrFrameList);
        var isSingleFrame = !allFrames && !isFrameArray && Lib.isPlainObject(frameOrGroupNameOrFrameList);

        if(isSingleFrame) {
            // In this case, a simple object has been passed to animate.
            frameList.push({
                type: 'object',
                data: setTransitionConfig(Lib.extendFlat({}, frameOrGroupNameOrFrameList))
            });
        } else if(allFrames || ['string', 'number'].indexOf(typeof frameOrGroupNameOrFrameList) !== -1) {
            // In this case, null or undefined has been passed so that we want to
            // animate *all* currently defined frames
            for(i = 0; i < trans._frames.length; i++) {
                frame = trans._frames[i];

                if(!frame) continue;

                if(allFrames || String(frame.group) === String(frameOrGroupNameOrFrameList)) {
                    frameList.push({
                        type: 'byname',
                        name: String(frame.name),
                        data: setTransitionConfig({name: frame.name})
                    });
                }
            }
        } else if(isFrameArray) {
            for(i = 0; i < frameOrGroupNameOrFrameList.length; i++) {
                var frameOrName = frameOrGroupNameOrFrameList[i];
                if(['number', 'string'].indexOf(typeof frameOrName) !== -1) {
                    frameOrName = String(frameOrName);
                    // In this case, there's an array and this frame is a string name:
                    frameList.push({
                        type: 'byname',
                        name: frameOrName,
                        data: setTransitionConfig({name: frameOrName})
                    });
                } else if(Lib.isPlainObject(frameOrName)) {
                    frameList.push({
                        type: 'object',
                        data: setTransitionConfig(Lib.extendFlat({}, frameOrName))
                    });
                }
            }
        }

        // Verify that all of these frames actually exist; return and reject if not:
        for(i = 0; i < frameList.length; i++) {
            frame = frameList[i];
            if(frame.type === 'byname' && !trans._frameHash[frame.data.name]) {
                Lib.warn('animate failure: frame not found: "' + frame.data.name + '"');
                reject();
                return;
            }
        }

        // If the mode is either next or immediate, then all currently queued frames must
        // be dumped and the corresponding .animate promises rejected.
        if(['next', 'immediate'].indexOf(animationOpts.mode) !== -1) {
            discardExistingFrames();
        }

        if(animationOpts.direction === 'reverse') {
            frameList.reverse();
        }

        var currentFrame = gd._fullLayout._currentFrame;
        if(currentFrame && animationOpts.fromcurrent) {
            var idx = -1;
            for(i = 0; i < frameList.length; i++) {
                frame = frameList[i];
                if(frame.type === 'byname' && frame.name === currentFrame) {
                    idx = i;
                    break;
                }
            }

            if(idx > 0 && idx < frameList.length - 1) {
                var filteredFrameList = [];
                for(i = 0; i < frameList.length; i++) {
                    frame = frameList[i];
                    if(frameList[i].type !== 'byname' || i > idx) {
                        filteredFrameList.push(frame);
                    }
                }
                frameList = filteredFrameList;
            }
        }

        if(frameList.length > 0) {
            queueFrames(frameList);
        } else {
            // This is the case where there were simply no frames. It's a little strange
            // since there's not much to do:
            gd.emit('plotly_animated');
            resolve();
        }
    });
}

/**
 * Register new frames
 *
 * @param {string id or DOM element} gd
 *      the id or DOM element of the graph container div
 *
 * @param {array of objects} frameList
 *      list of frame definitions, in which each object includes any of:
 *      - name: {string} name of frame to add
 *      - data: {array of objects} trace data
 *      - layout {object} layout definition
 *      - traces {array} trace indices
 *      - baseframe {string} name of frame from which this frame gets defaults
 *
 *  @param {array of integers} indices
 *      an array of integer indices matching the respective frames in `frameList`. If not
 *      provided, an index will be provided in serial order. If already used, the frame
 *      will be overwritten.
 */
function addFrames(gd, frameList, indices) {
    gd = Lib.getGraphDiv(gd);

    if(frameList === null || frameList === undefined) {
        return Promise.resolve();
    }

    if(!Lib.isPlotDiv(gd)) {
        throw new Error(
            'This element is not a Plotly plot: ' + gd + '. It\'s likely that you\'ve failed ' +
            'to create a plot before adding frames. For more details, see ' +
            'https://plotly.com/javascript/animations/'
        );
    }

    var i, frame, j, idx;
    var _frames = gd._transitionData._frames;
    var _frameHash = gd._transitionData._frameHash;


    if(!Array.isArray(frameList)) {
        throw new Error('addFrames failure: frameList must be an Array of frame definitions' + frameList);
    }

    // Create a sorted list of insertions since we run into lots of problems if these
    // aren't in ascending order of index:
    //
    // Strictly for sorting. Make sure this is guaranteed to never collide with any
    // already-exisisting indices:
    var bigIndex = _frames.length + frameList.length * 2;

    var insertions = [];
    var _frameHashLocal = {};
    for(i = frameList.length - 1; i >= 0; i--) {
        if(!Lib.isPlainObject(frameList[i])) continue;

        // The entire logic for checking for this type of name collision can be removed once we migrate to ES6 and
        // use a Map instead of an Object instance, as Map keys aren't converted to strings.
        var lookupName = frameList[i].name;
        var name = (_frameHash[lookupName] || _frameHashLocal[lookupName] || {}).name;
        var newName = frameList[i].name;
        var collisionPresent = _frameHash[name] || _frameHashLocal[name];

        if(name && newName && typeof newName === 'number' && collisionPresent && numericNameWarningCount < numericNameWarningCountLimit) {
            numericNameWarningCount++;

            Lib.warn('addFrames: overwriting frame "' + (_frameHash[name] || _frameHashLocal[name]).name +
                '" with a frame whose name of type "number" also equates to "' +
                name + '". This is valid but may potentially lead to unexpected ' +
                'behavior since all plotly.js frame names are stored internally ' +
                'as strings.');

            if(numericNameWarningCount === numericNameWarningCountLimit) {
                Lib.warn('addFrames: This API call has yielded too many of these warnings. ' +
                    'For the rest of this call, further warnings about numeric frame ' +
                    'names will be suppressed.');
            }
        }

        _frameHashLocal[lookupName] = {name: lookupName};

        insertions.push({
            frame: Plots.supplyFrameDefaults(frameList[i]),
            index: (indices && indices[i] !== undefined && indices[i] !== null) ? indices[i] : bigIndex + i
        });
    }

    // Sort this, taking note that undefined insertions end up at the end:
    insertions.sort(function(a, b) {
        if(a.index > b.index) return -1;
        if(a.index < b.index) return 1;
        return 0;
    });

    var ops = [];
    var revops = [];
    var frameCount = _frames.length;

    for(i = insertions.length - 1; i >= 0; i--) {
        frame = insertions[i].frame;

        if(typeof frame.name === 'number') {
            Lib.warn('Warning: addFrames accepts frames with numeric names, but the numbers are' +
                'implicitly cast to strings');
        }

        if(!frame.name) {
            // Repeatedly assign a default name, incrementing the counter each time until
            // we get a name that's not in the hashed lookup table:
            while(_frameHash[(frame.name = 'frame ' + gd._transitionData._counter++)]);
        }

        if(_frameHash[frame.name]) {
            // If frame is present, overwrite its definition:
            for(j = 0; j < _frames.length; j++) {
                if((_frames[j] || {}).name === frame.name) break;
            }
            ops.push({type: 'replace', index: j, value: frame});
            revops.unshift({type: 'replace', index: j, value: _frames[j]});
        } else {
            // Otherwise insert it at the end of the list:
            idx = Math.max(0, Math.min(insertions[i].index, frameCount));

            ops.push({type: 'insert', index: idx, value: frame});
            revops.unshift({type: 'delete', index: idx});
            frameCount++;
        }
    }

    var undoFunc = Plots.modifyFrames;
    var redoFunc = Plots.modifyFrames;
    var undoArgs = [gd, revops];
    var redoArgs = [gd, ops];

    if(Queue) Queue.add(gd, undoFunc, undoArgs, redoFunc, redoArgs);

    return Plots.modifyFrames(gd, ops);
}

/**
 * Delete frame
 *
 * @param {string id or DOM element} gd
 *      the id or DOM element of the graph container div
 *
 * @param {array of integers} frameList
 *      list of integer indices of frames to be deleted
 */
function deleteFrames(gd, frameList) {
    gd = Lib.getGraphDiv(gd);

    if(!Lib.isPlotDiv(gd)) {
        throw new Error('This element is not a Plotly plot: ' + gd);
    }

    var i, idx;
    var _frames = gd._transitionData._frames;
    var ops = [];
    var revops = [];

    if(!frameList) {
        frameList = [];
        for(i = 0; i < _frames.length; i++) {
            frameList.push(i);
        }
    }

    frameList = frameList.slice();
    frameList.sort();

    for(i = frameList.length - 1; i >= 0; i--) {
        idx = frameList[i];
        ops.push({type: 'delete', index: idx});
        revops.unshift({type: 'insert', index: idx, value: _frames[idx]});
    }

    var undoFunc = Plots.modifyFrames;
    var redoFunc = Plots.modifyFrames;
    var undoArgs = [gd, revops];
    var redoArgs = [gd, ops];

    if(Queue) Queue.add(gd, undoFunc, undoArgs, redoFunc, redoArgs);

    return Plots.modifyFrames(gd, ops);
}

/**
 * Purge a graph container div back to its initial pre-Plotly.plot state
 *
 * @param {string id or DOM element} gd
 *      the id or DOM element of the graph container div
 */
function purge(gd) {
    gd = Lib.getGraphDiv(gd);

    var fullLayout = gd._fullLayout || {};
    var fullData = gd._fullData || [];

    // remove gl contexts
    Plots.cleanPlot([], {}, fullData, fullLayout);

    // purge properties
    Plots.purge(gd);

    // purge event emitter methods
    Events.purge(gd);

    // remove plot container
    if(fullLayout._container) fullLayout._container.remove();

    // in contrast to Plotly.Plots.purge which does NOT clear _context!
    delete gd._context;

    return gd;
}

// -------------------------------------------------------
// makePlotFramework: Create the plot container and axes
// -------------------------------------------------------
function makePlotFramework(gd) {
    var gd3 = d3.select(gd);
    var fullLayout = gd._fullLayout;

    // Plot container
    fullLayout._container = gd3.selectAll('.plot-container').data([0]);
    fullLayout._container.enter().insert('div', ':first-child')
        .classed('plot-container', true)
        .classed('plotly', true);

    // Make the svg container
    fullLayout._paperdiv = fullLayout._container.selectAll('.svg-container').data([0]);
    fullLayout._paperdiv.enter().append('div')
        .classed('svg-container', true)
        .style('position', 'relative');

    // Make the graph containers
    // start fresh each time we get here, so we know the order comes out
    // right, rather than enter/exit which can muck up the order
    // TODO: sort out all the ordering so we don't have to
    // explicitly delete anything
    // FIXME: parcoords reuses this object, not the best pattern
    fullLayout._glcontainer = fullLayout._paperdiv.selectAll('.gl-container')
        .data([{}]);

    fullLayout._glcontainer.enter().append('div')
        .classed('gl-container', true);

    fullLayout._paperdiv.selectAll('.main-svg').remove();
    fullLayout._paperdiv.select('.modebar-container').remove();

    fullLayout._paper = fullLayout._paperdiv.insert('svg', ':first-child')
        .classed('main-svg', true);

    fullLayout._toppaper = fullLayout._paperdiv.append('svg')
        .classed('main-svg', true);

    fullLayout._modebardiv = fullLayout._paperdiv.append('div');

    fullLayout._hoverpaper = fullLayout._paperdiv.append('svg')
        .classed('main-svg', true);

    if(!fullLayout._uid) {
        var otherUids = {};
        d3.selectAll('defs').each(function() {
            if(this.id) otherUids[this.id.split('-')[1]] = 1;
        });
        fullLayout._uid = Lib.randstr(otherUids);
    }

    fullLayout._paperdiv.selectAll('.main-svg')
        .attr(xmlnsNamespaces.svgAttrs);

    fullLayout._defs = fullLayout._paper.append('defs')
        .attr('id', 'defs-' + fullLayout._uid);

    fullLayout._clips = fullLayout._defs.append('g')
        .classed('clips', true);

    fullLayout._topdefs = fullLayout._toppaper.append('defs')
        .attr('id', 'topdefs-' + fullLayout._uid);

    fullLayout._topclips = fullLayout._topdefs.append('g')
        .classed('clips', true);

    fullLayout._bgLayer = fullLayout._paper.append('g')
        .classed('bglayer', true);

    fullLayout._draggers = fullLayout._paper.append('g')
        .classed('draglayer', true);

    // lower shape/image layer - note that this is behind
    // all subplots data/grids but above the backgrounds
    // except inset subplots, whose backgrounds are drawn
    // inside their own group so that they appear above
    // the data for the main subplot
    // lower shapes and images which are fully referenced to
    // a subplot still get drawn within the subplot's group
    // so they will work correctly on insets
    var layerBelow = fullLayout._paper.append('g')
        .classed('layer-below', true);
    fullLayout._imageLowerLayer = layerBelow.append('g')
        .classed('imagelayer', true);
    fullLayout._shapeLowerLayer = layerBelow.append('g')
        .classed('shapelayer', true);

    // single cartesian layer for the whole plot
    fullLayout._cartesianlayer = fullLayout._paper.append('g').classed('cartesianlayer', true);

    // single polar layer for the whole plot
    fullLayout._polarlayer = fullLayout._paper.append('g').classed('polarlayer', true);

    // single ternary layer for the whole plot
    fullLayout._ternarylayer = fullLayout._paper.append('g').classed('ternarylayer', true);

    // single geo layer for the whole plot
    fullLayout._geolayer = fullLayout._paper.append('g').classed('geolayer', true);

    // single funnelarea layer for the whole plot
    fullLayout._funnelarealayer = fullLayout._paper.append('g').classed('funnelarealayer', true);

    // single pie layer for the whole plot
    fullLayout._pielayer = fullLayout._paper.append('g').classed('pielayer', true);

    // single treemap layer for the whole plot
    fullLayout._treemaplayer = fullLayout._paper.append('g').classed('treemaplayer', true);

    // single sunburst layer for the whole plot
    fullLayout._sunburstlayer = fullLayout._paper.append('g').classed('sunburstlayer', true);

    // single indicator layer for the whole plot
    fullLayout._indicatorlayer = fullLayout._toppaper.append('g').classed('indicatorlayer', true);

    // fill in image server scrape-svg
    fullLayout._glimages = fullLayout._paper.append('g').classed('glimages', true);

    // lastly upper shapes, info (legend, annotations) and hover layers go on top
    // these are in a different svg element normally, but get collapsed into a single
    // svg when exporting (after inserting 3D)
    // upper shapes/images are only those drawn above the whole plot, including subplots
    var layerAbove = fullLayout._toppaper.append('g')
        .classed('layer-above', true);
    fullLayout._imageUpperLayer = layerAbove.append('g')
        .classed('imagelayer', true);
    fullLayout._shapeUpperLayer = layerAbove.append('g')
        .classed('shapelayer', true);

    fullLayout._infolayer = fullLayout._toppaper.append('g').classed('infolayer', true);
    fullLayout._menulayer = fullLayout._toppaper.append('g').classed('menulayer', true);
    fullLayout._zoomlayer = fullLayout._toppaper.append('g').classed('zoomlayer', true);
    fullLayout._hoverlayer = fullLayout._hoverpaper.append('g').classed('hoverlayer', true);

    // Make the modebar container
    fullLayout._modebardiv
        .classed('modebar-container', true)
        .style('position', 'absolute')
        .style('top', '0px')
        .style('right', '0px');

    gd.emit('plotly_framework');
}

exports.animate = animate;
exports.addFrames = addFrames;
exports.deleteFrames = deleteFrames;

exports.addTraces = addTraces;
exports.deleteTraces = deleteTraces;
exports.extendTraces = extendTraces;
exports.moveTraces = moveTraces;
exports.prependTraces = prependTraces;

exports.newPlot = newPlot;
exports.plot = plot;
exports.purge = purge;

exports.react = react;
exports.redraw = redraw;
exports.relayout = relayout;
exports.restyle = restyle;

exports.setPlotConfig = setPlotConfig;

exports.update = update;

exports._guiRelayout = guiEdit(relayout);
exports._guiRestyle = guiEdit(restyle);
exports._guiUpdate = guiEdit(update);

exports._storeDirectGUIEdit = _storeDirectGUIEdit;


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/domain.js":
/*!****************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/domain.js ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var extendFlat = __webpack_require__(/*! ../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;

/**
 * Make a xy domain attribute group
 *
 * @param {object} opts
 *   @param {string}
 *     opts.name: name to be inserted in the default description
 *   @param {boolean}
 *     opts.trace: set to true for trace containers
 *   @param {string}
 *     opts.editType: editType for all pieces
 *   @param {boolean}
 *     opts.noGridCell: set to true to omit `row` and `column`
 *
 * @param {object} extra
 *   @param {string}
 *     extra.description: extra description. N.B we use
 *     a separate extra container to make it compatible with
 *     the compress_attributes transform.
 *
 * @return {object} attributes object containing {x,y} as specified
 */
exports.attributes = function(opts, extra) {
    opts = opts || {};
    extra = extra || {};

    var base = {
        valType: 'info_array',
        role: 'info',
        editType: opts.editType,
        items: [
            {valType: 'number', min: 0, max: 1, editType: opts.editType},
            {valType: 'number', min: 0, max: 1, editType: opts.editType}
        ],
        dflt: [0, 1]
    };

    var namePart = opts.name ? opts.name + ' ' : '';
    var contPart = opts.trace ? 'trace ' : 'subplot ';
    var descPart = extra.description ? ' ' + extra.description : '';

    var out = {
        x: extendFlat({}, base, {
            description: [
                'Sets the horizontal domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        y: extendFlat({}, base, {
            description: [
                'Sets the vertical domain of this ',
                namePart,
                contPart,
                '(in plot fraction).',
                descPart
            ].join('')
        }),
        editType: opts.editType
    };

    if(!opts.noGridCell) {
        out.row = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this row in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
        out.column = {
            valType: 'integer',
            min: 0,
            dflt: 0,
            role: 'info',
            editType: opts.editType,
            description: [
                'If there is a layout grid, use the domain ',
                'for this column in the grid for this ',
                namePart,
                contPart,
                '.',
                descPart
            ].join('')
        };
    }

    return out;
};

exports.defaults = function(containerOut, layout, coerce, dfltDomains) {
    var dfltX = (dfltDomains && dfltDomains.x) || [0, 1];
    var dfltY = (dfltDomains && dfltDomains.y) || [0, 1];

    var grid = layout.grid;
    if(grid) {
        var column = coerce('domain.column');
        if(column !== undefined) {
            if(column < grid.columns) dfltX = grid._domains.x[column];
            else delete containerOut.domain.column;
        }

        var row = coerce('domain.row');
        if(row !== undefined) {
            if(row < grid.rows) dfltY = grid._domains.y[row];
            else delete containerOut.domain.row;
        }
    }

    var x = coerce('domain.x', dfltX);
    var y = coerce('domain.y', dfltY);

    // don't accept bad input data
    if(!(x[0] < x[1])) containerOut.domain.x = dfltX.slice();
    if(!(y[0] < y[1])) containerOut.domain.y = dfltY.slice();
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/legacy/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/legacy/index.js ***!
  \****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Polar = module.exports = __webpack_require__(/*! ./micropolar */ "./node_modules/plotly.js/src/plots/polar/legacy/micropolar.js");

Polar.manager = __webpack_require__(/*! ./micropolar_manager */ "./node_modules/plotly.js/src/plots/polar/legacy/micropolar_manager.js");


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/legacy/micropolar.js":
/*!*********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/legacy/micropolar.js ***!
  \*********************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var Lib = __webpack_require__(/*! ../../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var extendDeepAll = Lib.extendDeepAll;
var MID_SHIFT = __webpack_require__(/*! ../../../constants/alignment */ "./node_modules/plotly.js/src/constants/alignment.js").MID_SHIFT;

var µ = module.exports = { version: '0.2.2' };

µ.Axis = function module() {
    var config = {
        data: [],
        layout: {}
    }, inputConfig = {}, liveConfig = {};
    var svg, container, dispatch = d3.dispatch('hover'), radialScale, angularScale;
    var exports = {};
    function render(_container) {
        container = _container || container;
        var data = config.data;
        var axisConfig = config.layout;
        if (typeof container == 'string' || container.nodeName) container = d3.select(container);
        container.datum(data).each(function(_data, _index) {
            var dataOriginal = _data.slice();
            liveConfig = {
                data: µ.util.cloneJson(dataOriginal),
                layout: µ.util.cloneJson(axisConfig)
            };
            var colorIndex = 0;
            dataOriginal.forEach(function(d, i) {
                if (!d.color) {
                    d.color = axisConfig.defaultColorRange[colorIndex];
                    colorIndex = (colorIndex + 1) % axisConfig.defaultColorRange.length;
                }
                if (!d.strokeColor) {
                    d.strokeColor = d.geometry === 'LinePlot' ? d.color : d3.rgb(d.color).darker().toString();
                }
                liveConfig.data[i].color = d.color;
                liveConfig.data[i].strokeColor = d.strokeColor;
                liveConfig.data[i].strokeDash = d.strokeDash;
                liveConfig.data[i].strokeSize = d.strokeSize;
            });
            var data = dataOriginal.filter(function(d, i) {
                var visible = d.visible;
                return typeof visible === 'undefined' || visible === true;
            });
            var isStacked = false;
            var dataWithGroupId = data.map(function(d, i) {
                isStacked = isStacked || typeof d.groupId !== 'undefined';
                return d;
            });
            if (isStacked) {
                var grouped = d3.nest().key(function(d, i) {
                    return typeof d.groupId != 'undefined' ? d.groupId : 'unstacked';
                }).entries(dataWithGroupId);
                var dataYStack = [];
                var stacked = grouped.map(function(d, i) {
                    if (d.key === 'unstacked') return d.values; else {
                        var prevArray = d.values[0].r.map(function(d, i) {
                            return 0;
                        });
                        d.values.forEach(function(d, i, a) {
                            d.yStack = [ prevArray ];
                            dataYStack.push(prevArray);
                            prevArray = µ.util.sumArrays(d.r, prevArray);
                        });
                        return d.values;
                    }
                });
                data = d3.merge(stacked);
            }
            data.forEach(function(d, i) {
                d.t = Array.isArray(d.t[0]) ? d.t : [ d.t ];
                d.r = Array.isArray(d.r[0]) ? d.r : [ d.r ];
            });
            var radius = Math.min(axisConfig.width - axisConfig.margin.left - axisConfig.margin.right, axisConfig.height - axisConfig.margin.top - axisConfig.margin.bottom) / 2;
            radius = Math.max(10, radius);
            var chartCenter = [ axisConfig.margin.left + radius, axisConfig.margin.top + radius ];
            var extent;
            if (isStacked) {
                var highestStackedValue = d3.max(µ.util.sumArrays(µ.util.arrayLast(data).r[0], µ.util.arrayLast(dataYStack)));
                extent = [ 0, highestStackedValue ];
            } else extent = d3.extent(µ.util.flattenArray(data.map(function(d, i) {
                return d.r;
            })));
            if (axisConfig.radialAxis.domain != µ.DATAEXTENT) extent[0] = 0;
            radialScale = d3.scale.linear().domain(axisConfig.radialAxis.domain != µ.DATAEXTENT && axisConfig.radialAxis.domain ? axisConfig.radialAxis.domain : extent).range([ 0, radius ]);
            liveConfig.layout.radialAxis.domain = radialScale.domain();
            var angularDataMerged = µ.util.flattenArray(data.map(function(d, i) {
                return d.t;
            }));
            var isOrdinal = typeof angularDataMerged[0] === 'string';
            var ticks;
            if (isOrdinal) {
                angularDataMerged = µ.util.deduplicate(angularDataMerged);
                ticks = angularDataMerged.slice();
                angularDataMerged = d3.range(angularDataMerged.length);
                data = data.map(function(d, i) {
                    var result = d;
                    d.t = [ angularDataMerged ];
                    if (isStacked) result.yStack = d.yStack;
                    return result;
                });
            }
            var hasOnlyLineOrDotPlot = data.filter(function(d, i) {
                return d.geometry === 'LinePlot' || d.geometry === 'DotPlot';
            }).length === data.length;
            var needsEndSpacing = axisConfig.needsEndSpacing === null ? isOrdinal || !hasOnlyLineOrDotPlot : axisConfig.needsEndSpacing;
            var useProvidedDomain = axisConfig.angularAxis.domain && axisConfig.angularAxis.domain != µ.DATAEXTENT && !isOrdinal && axisConfig.angularAxis.domain[0] >= 0;
            var angularDomain = useProvidedDomain ? axisConfig.angularAxis.domain : d3.extent(angularDataMerged);
            var angularDomainStep = Math.abs(angularDataMerged[1] - angularDataMerged[0]);
            if (hasOnlyLineOrDotPlot && !isOrdinal) angularDomainStep = 0;
            var angularDomainWithPadding = angularDomain.slice();
            if (needsEndSpacing && isOrdinal) angularDomainWithPadding[1] += angularDomainStep;
            var tickCount = axisConfig.angularAxis.ticksCount || 4;
            if (tickCount > 8) tickCount = tickCount / (tickCount / 8) + tickCount % 8;
            if (axisConfig.angularAxis.ticksStep) {
                tickCount = (angularDomainWithPadding[1] - angularDomainWithPadding[0]) / tickCount;
            }
            var angularTicksStep = axisConfig.angularAxis.ticksStep || (angularDomainWithPadding[1] - angularDomainWithPadding[0]) / (tickCount * (axisConfig.minorTicks + 1));
            if (ticks) angularTicksStep = Math.max(Math.round(angularTicksStep), 1);
            if (!angularDomainWithPadding[2]) angularDomainWithPadding[2] = angularTicksStep;
            var angularAxisRange = d3.range.apply(this, angularDomainWithPadding);
            angularAxisRange = angularAxisRange.map(function(d, i) {
                return parseFloat(d.toPrecision(12));
            });
            angularScale = d3.scale.linear().domain(angularDomainWithPadding.slice(0, 2)).range(axisConfig.direction === 'clockwise' ? [ 0, 360 ] : [ 360, 0 ]);
            liveConfig.layout.angularAxis.domain = angularScale.domain();
            liveConfig.layout.angularAxis.endPadding = needsEndSpacing ? angularDomainStep : 0;
            svg = d3.select(this).select('svg.chart-root');
            if (typeof svg === 'undefined' || svg.empty()) {
                var skeleton = "<svg xmlns='http://www.w3.org/2000/svg' class='chart-root'>' + '<g class='outer-group'>' + '<g class='chart-group'>' + '<circle class='background-circle'></circle>' + '<g class='geometry-group'></g>' + '<g class='radial axis-group'>' + '<circle class='outside-circle'></circle>' + '</g>' + '<g class='angular axis-group'></g>' + '<g class='guides-group'><line></line><circle r='0'></circle></g>' + '</g>' + '<g class='legend-group'></g>' + '<g class='tooltips-group'></g>' + '<g class='title-group'><text></text></g>' + '</g>' + '</svg>";
                var doc = new DOMParser().parseFromString(skeleton, 'application/xml');
                var newSvg = this.appendChild(this.ownerDocument.importNode(doc.documentElement, true));
                svg = d3.select(newSvg);
            }
            svg.select('.guides-group').style({
                'pointer-events': 'none'
            });
            svg.select('.angular.axis-group').style({
                'pointer-events': 'none'
            });
            svg.select('.radial.axis-group').style({
                'pointer-events': 'none'
            });
            var chartGroup = svg.select('.chart-group');
            var lineStyle = {
                fill: 'none',
                stroke: axisConfig.tickColor
            };
            var fontStyle = {
                'font-size': axisConfig.font.size,
                'font-family': axisConfig.font.family,
                fill: axisConfig.font.color,
                'text-shadow': [ '-1px 0px', '1px -1px', '-1px 1px', '1px 1px' ].map(function(d, i) {
                    return ' ' + d + ' 0 ' + axisConfig.font.outlineColor;
                }).join(',')
            };
            var legendContainer;
            if (axisConfig.showLegend) {
                legendContainer = svg.select('.legend-group').attr({
                    transform: 'translate(' + [ radius, axisConfig.margin.top ] + ')'
                }).style({
                    display: 'block'
                });
                var elements = data.map(function(d, i) {
                    var datumClone = µ.util.cloneJson(d);
                    datumClone.symbol = d.geometry === 'DotPlot' ? d.dotType || 'circle' : d.geometry != 'LinePlot' ? 'square' : 'line';
                    datumClone.visibleInLegend = typeof d.visibleInLegend === 'undefined' || d.visibleInLegend;
                    datumClone.color = d.geometry === 'LinePlot' ? d.strokeColor : d.color;
                    return datumClone;
                });

                µ.Legend().config({
                    data: data.map(function(d, i) {
                        return d.name || 'Element' + i;
                    }),
                    legendConfig: extendDeepAll({},
                        µ.Legend.defaultConfig().legendConfig,
                        {
                            container: legendContainer,
                            elements: elements,
                            reverseOrder: axisConfig.legend.reverseOrder
                        }
                    )
                })();

                var legendBBox = legendContainer.node().getBBox();
                radius = Math.min(axisConfig.width - legendBBox.width - axisConfig.margin.left - axisConfig.margin.right, axisConfig.height - axisConfig.margin.top - axisConfig.margin.bottom) / 2;
                radius = Math.max(10, radius);
                chartCenter = [ axisConfig.margin.left + radius, axisConfig.margin.top + radius ];
                radialScale.range([ 0, radius ]);
                liveConfig.layout.radialAxis.domain = radialScale.domain();
                legendContainer.attr('transform', 'translate(' + [ chartCenter[0] + radius, chartCenter[1] - radius ] + ')');
            } else {
                legendContainer = svg.select('.legend-group').style({
                    display: 'none'
                });
            }
            svg.attr({
                width: axisConfig.width,
                height: axisConfig.height
            }).style({
                opacity: axisConfig.opacity
            });
            chartGroup.attr('transform', 'translate(' + chartCenter + ')').style({
                cursor: 'crosshair'
            });
            var centeringOffset = [ (axisConfig.width - (axisConfig.margin.left + axisConfig.margin.right + radius * 2 + (legendBBox ? legendBBox.width : 0))) / 2, (axisConfig.height - (axisConfig.margin.top + axisConfig.margin.bottom + radius * 2)) / 2 ];
            centeringOffset[0] = Math.max(0, centeringOffset[0]);
            centeringOffset[1] = Math.max(0, centeringOffset[1]);
            svg.select('.outer-group').attr('transform', 'translate(' + centeringOffset + ')');
            if (axisConfig.title && axisConfig.title.text) {
                var title = svg.select('g.title-group text').style(fontStyle).text(axisConfig.title.text);
                var titleBBox = title.node().getBBox();
                title.attr({
                    x: chartCenter[0] - titleBBox.width / 2,
                    y: chartCenter[1] - radius - 20
                });
            }
            var radialAxis = svg.select('.radial.axis-group');
            if (axisConfig.radialAxis.gridLinesVisible) {
                var gridCircles = radialAxis.selectAll('circle.grid-circle').data(radialScale.ticks(5));
                gridCircles.enter().append('circle').attr({
                    'class': 'grid-circle'
                }).style(lineStyle);
                gridCircles.attr('r', radialScale);
                gridCircles.exit().remove();
            }
            radialAxis.select('circle.outside-circle').attr({
                r: radius
            }).style(lineStyle);
            var backgroundCircle = svg.select('circle.background-circle').attr({
                r: radius
            }).style({
                fill: axisConfig.backgroundColor,
                stroke: axisConfig.stroke
            });
            function currentAngle(d, i) {
                return angularScale(d) % 360 + axisConfig.orientation;
            }
            if (axisConfig.radialAxis.visible) {
                var axis = d3.svg.axis().scale(radialScale).ticks(5).tickSize(5);
                radialAxis.call(axis).attr({
                    transform: 'rotate(' + axisConfig.radialAxis.orientation + ')'
                });
                radialAxis.selectAll('.domain').style(lineStyle);
                radialAxis.selectAll('g>text').text(function(d, i) {
                    return this.textContent + axisConfig.radialAxis.ticksSuffix;
                }).style(fontStyle).style({
                    'text-anchor': 'start'
                }).attr({
                    x: 0,
                    y: 0,
                    dx: 0,
                    dy: 0,
                    transform: function(d, i) {
                        if (axisConfig.radialAxis.tickOrientation === 'horizontal') {
                            return 'rotate(' + -axisConfig.radialAxis.orientation + ') translate(' + [ 0, fontStyle['font-size'] ] + ')';
                        } else return 'translate(' + [ 0, fontStyle['font-size'] ] + ')';
                    }
                });
                radialAxis.selectAll('g>line').style({
                    stroke: 'black'
                });
            }
            var angularAxis = svg.select('.angular.axis-group').selectAll('g.angular-tick').data(angularAxisRange);
            var angularAxisEnter = angularAxis.enter().append('g').classed('angular-tick', true);
            angularAxis.attr({
                transform: function(d, i) {
                    return 'rotate(' + currentAngle(d, i) + ')';
                }
            }).style({
                display: axisConfig.angularAxis.visible ? 'block' : 'none'
            });
            angularAxis.exit().remove();
            angularAxisEnter.append('line').classed('grid-line', true).classed('major', function(d, i) {
                return i % (axisConfig.minorTicks + 1) == 0;
            }).classed('minor', function(d, i) {
                return !(i % (axisConfig.minorTicks + 1) == 0);
            }).style(lineStyle);
            angularAxisEnter.selectAll('.minor').style({
                stroke: axisConfig.minorTickColor
            });
            angularAxis.select('line.grid-line').attr({
                x1: axisConfig.tickLength ? radius - axisConfig.tickLength : 0,
                x2: radius
            }).style({
                display: axisConfig.angularAxis.gridLinesVisible ? 'block' : 'none'
            });
            angularAxisEnter.append('text').classed('axis-text', true).style(fontStyle);
            var ticksText = angularAxis.select('text.axis-text').attr({
                x: radius + axisConfig.labelOffset,
                dy: MID_SHIFT + 'em',
                transform: function(d, i) {
                    var angle = currentAngle(d, i);
                    var rad = radius + axisConfig.labelOffset;
                    var orient = axisConfig.angularAxis.tickOrientation;
                    if (orient == 'horizontal') return 'rotate(' + -angle + ' ' + rad + ' 0)'; else if (orient == 'radial') return angle < 270 && angle > 90 ? 'rotate(180 ' + rad + ' 0)' : null; else return 'rotate(' + (angle <= 180 && angle > 0 ? -90 : 90) + ' ' + rad + ' 0)';
                }
            }).style({
                'text-anchor': 'middle',
                display: axisConfig.angularAxis.labelsVisible ? 'block' : 'none'
            }).text(function(d, i) {
                if (i % (axisConfig.minorTicks + 1) != 0) return '';
                if (ticks) {
                    return ticks[d] + axisConfig.angularAxis.ticksSuffix;
                } else return d + axisConfig.angularAxis.ticksSuffix;
            }).style(fontStyle);
            if (axisConfig.angularAxis.rewriteTicks) ticksText.text(function(d, i) {
                if (i % (axisConfig.minorTicks + 1) != 0) return '';
                return axisConfig.angularAxis.rewriteTicks(this.textContent, i);
            });
            var rightmostTickEndX = d3.max(chartGroup.selectAll('.angular-tick text')[0].map(function(d, i) {
                return d.getCTM().e + d.getBBox().width;
            }));
            legendContainer.attr({
                transform: 'translate(' + [ radius + rightmostTickEndX, axisConfig.margin.top ] + ')'
            });
            var hasGeometry = svg.select('g.geometry-group').selectAll('g').size() > 0;
            var geometryContainer = svg.select('g.geometry-group').selectAll('g.geometry').data(data);
            geometryContainer.enter().append('g').attr({
                'class': function(d, i) {
                    return 'geometry geometry' + i;
                }
            });
            geometryContainer.exit().remove();
            if (data[0] || hasGeometry) {
                var geometryConfigs = [];
                data.forEach(function(d, i) {
                    var geometryConfig = {};
                    geometryConfig.radialScale = radialScale;
                    geometryConfig.angularScale = angularScale;
                    geometryConfig.container = geometryContainer.filter(function(dB, iB) {
                        return iB == i;
                    });
                    geometryConfig.geometry = d.geometry;
                    geometryConfig.orientation = axisConfig.orientation;
                    geometryConfig.direction = axisConfig.direction;
                    geometryConfig.index = i;
                    geometryConfigs.push({
                        data: d,
                        geometryConfig: geometryConfig
                    });
                });
                var geometryConfigsGrouped = d3.nest().key(function(d, i) {
                    return typeof d.data.groupId != 'undefined' || 'unstacked';
                }).entries(geometryConfigs);
                var geometryConfigsGrouped2 = [];
                geometryConfigsGrouped.forEach(function(d, i) {
                    if (d.key === 'unstacked') geometryConfigsGrouped2 = geometryConfigsGrouped2.concat(d.values.map(function(d, i) {
                        return [ d ];
                    })); else geometryConfigsGrouped2.push(d.values);
                });
                geometryConfigsGrouped2.forEach(function(d, i) {
                    var geometry;
                    if (Array.isArray(d)) geometry = d[0].geometryConfig.geometry; else geometry = d.geometryConfig.geometry;
                    var finalGeometryConfig = d.map(function(dB, iB) {
                        return extendDeepAll(µ[geometry].defaultConfig(), dB);
                    });
                    µ[geometry]().config(finalGeometryConfig)();
                });
            }
            var guides = svg.select('.guides-group');
            var tooltipContainer = svg.select('.tooltips-group');
            var angularTooltip = µ.tooltipPanel().config({
                container: tooltipContainer,
                fontSize: 8
            })();
            var radialTooltip = µ.tooltipPanel().config({
                container: tooltipContainer,
                fontSize: 8
            })();
            var geometryTooltip = µ.tooltipPanel().config({
                container: tooltipContainer,
                hasTick: true
            })();
            var angularValue, radialValue;
            if (!isOrdinal) {
                var angularGuideLine = guides.select('line').attr({
                    x1: 0,
                    y1: 0,
                    y2: 0
                }).style({
                    stroke: 'grey',
                    'pointer-events': 'none'
                });
                chartGroup.on('mousemove.angular-guide', function(d, i) {
                    var mouseAngle = µ.util.getMousePos(backgroundCircle).angle;
                    angularGuideLine.attr({
                        x2: -radius,
                        transform: 'rotate(' + mouseAngle + ')'
                    }).style({
                        opacity: .5
                    });
                    var angleWithOriginOffset = (mouseAngle + 180 + 360 - axisConfig.orientation) % 360;
                    angularValue = angularScale.invert(angleWithOriginOffset);
                    var pos = µ.util.convertToCartesian(radius + 12, mouseAngle + 180);
                    angularTooltip.text(µ.util.round(angularValue)).move([ pos[0] + chartCenter[0], pos[1] + chartCenter[1] ]);
                }).on('mouseout.angular-guide', function(d, i) {
                    guides.select('line').style({
                        opacity: 0
                    });
                });
            }
            var angularGuideCircle = guides.select('circle').style({
                stroke: 'grey',
                fill: 'none'
            });
            chartGroup.on('mousemove.radial-guide', function(d, i) {
                var r = µ.util.getMousePos(backgroundCircle).radius;
                angularGuideCircle.attr({
                    r: r
                }).style({
                    opacity: .5
                });
                radialValue = radialScale.invert(µ.util.getMousePos(backgroundCircle).radius);
                var pos = µ.util.convertToCartesian(r, axisConfig.radialAxis.orientation);
                radialTooltip.text(µ.util.round(radialValue)).move([ pos[0] + chartCenter[0], pos[1] + chartCenter[1] ]);
            }).on('mouseout.radial-guide', function(d, i) {
                angularGuideCircle.style({
                    opacity: 0
                });
                geometryTooltip.hide();
                angularTooltip.hide();
                radialTooltip.hide();
            });
            svg.selectAll('.geometry-group .mark').on('mouseover.tooltip', function(d, i) {
                var el = d3.select(this);
                var color = this.style.fill;
                var newColor = 'black';
                var opacity = this.style.opacity || 1;
                el.attr({
                    'data-opacity': opacity
                });
                if (color && color !== 'none') {
                    el.attr({
                        'data-fill': color
                    });
                    newColor = d3.hsl(color).darker().toString();
                    el.style({
                        fill: newColor,
                        opacity: 1
                    });
                    var textData = {
                        t: µ.util.round(d[0]),
                        r: µ.util.round(d[1])
                    };
                    if (isOrdinal) textData.t = ticks[d[0]];
                    var text = 't: ' + textData.t + ', r: ' + textData.r;
                    var bbox = this.getBoundingClientRect();
                    var svgBBox = svg.node().getBoundingClientRect();
                    var pos = [ bbox.left + bbox.width / 2 - centeringOffset[0] - svgBBox.left, bbox.top + bbox.height / 2 - centeringOffset[1] - svgBBox.top ];
                    geometryTooltip.config({
                        color: newColor
                    }).text(text);
                    geometryTooltip.move(pos);
                } else {
                    color = this.style.stroke || 'black';
                    el.attr({
                        'data-stroke': color
                    });
                    newColor = d3.hsl(color).darker().toString();
                    el.style({
                        stroke: newColor,
                        opacity: 1
                    });
                }
            }).on('mousemove.tooltip', function(d, i) {
                if (d3.event.which != 0) return false;
                if (d3.select(this).attr('data-fill')) geometryTooltip.show();
            }).on('mouseout.tooltip', function(d, i) {
                geometryTooltip.hide();
                var el = d3.select(this);
                var fillColor = el.attr('data-fill');
                if (fillColor) el.style({
                    fill: fillColor,
                    opacity: el.attr('data-opacity')
                }); else el.style({
                    stroke: el.attr('data-stroke'),
                    opacity: el.attr('data-opacity')
                });
            });
        });
        return exports;
    }
    exports.render = function(_container) {
        render(_container);
        return this;
    };
    exports.config = function(_x) {
        if (!arguments.length) return config;
        var xClone = µ.util.cloneJson(_x);
        xClone.data.forEach(function(d, i) {
            if (!config.data[i]) config.data[i] = {};
            extendDeepAll(config.data[i], µ.Axis.defaultConfig().data[0]);
            extendDeepAll(config.data[i], d);
        });
        extendDeepAll(config.layout, µ.Axis.defaultConfig().layout);
        extendDeepAll(config.layout, xClone.layout);
        return this;
    };
    exports.getLiveConfig = function() {
        return liveConfig;
    };
    exports.getinputConfig = function() {
        return inputConfig;
    };
    exports.radialScale = function(_x) {
        return radialScale;
    };
    exports.angularScale = function(_x) {
        return angularScale;
    };
    exports.svg = function() {
        return svg;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};

µ.Axis.defaultConfig = function(d, i) {
    var config = {
        data: [ {
            t: [ 1, 2, 3, 4 ],
            r: [ 10, 11, 12, 13 ],
            name: 'Line1',
            geometry: 'LinePlot',
            color: null,
            strokeDash: 'solid',
            strokeColor: null,
            strokeSize: '1',
            visibleInLegend: true,
            opacity: 1
        } ],
        layout: {
            defaultColorRange: d3.scale.category10().range(),
            title: null,
            height: 450,
            width: 500,
            margin: {
                top: 40,
                right: 40,
                bottom: 40,
                left: 40
            },
            font: {
                size: 12,
                color: 'gray',
                outlineColor: 'white',
                family: 'Tahoma, sans-serif'
            },
            direction: 'clockwise',
            orientation: 0,
            labelOffset: 10,
            radialAxis: {
                domain: null,
                orientation: -45,
                ticksSuffix: '',
                visible: true,
                gridLinesVisible: true,
                tickOrientation: 'horizontal',
                rewriteTicks: null
            },
            angularAxis: {
                domain: [ 0, 360 ],
                ticksSuffix: '',
                visible: true,
                gridLinesVisible: true,
                labelsVisible: true,
                tickOrientation: 'horizontal',
                rewriteTicks: null,
                ticksCount: null,
                ticksStep: null
            },
            minorTicks: 0,
            tickLength: null,
            tickColor: 'silver',
            minorTickColor: '#eee',
            backgroundColor: 'none',
            needsEndSpacing: null,
            showLegend: true,
            legend: {
                reverseOrder: false
            },
            opacity: 1
        }
    };
    return config;
};

µ.util = {};

µ.DATAEXTENT = 'dataExtent';

µ.AREA = 'AreaChart';

µ.LINE = 'LinePlot';

µ.DOT = 'DotPlot';

µ.BAR = 'BarChart';

µ.util._override = function(_objA, _objB) {
    for (var x in _objA) if (x in _objB) _objB[x] = _objA[x];
};

µ.util._extend = function(_objA, _objB) {
    for (var x in _objA) _objB[x] = _objA[x];
};

µ.util._rndSnd = function() {
    return Math.random() * 2 - 1 + (Math.random() * 2 - 1) + (Math.random() * 2 - 1);
};

µ.util.dataFromEquation2 = function(_equation, _step) {
    var step = _step || 6;
    var data = d3.range(0, 360 + step, step).map(function(deg, index) {
        var theta = deg * Math.PI / 180;
        var radius = _equation(theta);
        return [ deg, radius ];
    });
    return data;
};

µ.util.dataFromEquation = function(_equation, _step, _name) {
    var step = _step || 6;
    var t = [], r = [];
    d3.range(0, 360 + step, step).forEach(function(deg, index) {
        var theta = deg * Math.PI / 180;
        var radius = _equation(theta);
        t.push(deg);
        r.push(radius);
    });
    var result = {
        t: t,
        r: r
    };
    if (_name) result.name = _name;
    return result;
};

µ.util.ensureArray = function(_val, _count) {
    if (typeof _val === 'undefined') return null;
    var arr = [].concat(_val);
    return d3.range(_count).map(function(d, i) {
        return arr[i] || arr[0];
    });
};

µ.util.fillArrays = function(_obj, _valueNames, _count) {
    _valueNames.forEach(function(d, i) {
        _obj[d] = µ.util.ensureArray(_obj[d], _count);
    });
    return _obj;
};

µ.util.cloneJson = function(json) {
    return JSON.parse(JSON.stringify(json));
};

µ.util.validateKeys = function(obj, keys) {
    if (typeof keys === 'string') keys = keys.split('.');
    var next = keys.shift();
    return obj[next] && (!keys.length || objHasKeys(obj[next], keys));
};

µ.util.sumArrays = function(a, b) {
    return d3.zip(a, b).map(function(d, i) {
        return d3.sum(d);
    });
};

µ.util.arrayLast = function(a) {
    return a[a.length - 1];
};

µ.util.arrayEqual = function(a, b) {
    var i = Math.max(a.length, b.length, 1);
    while (i-- >= 0 && a[i] === b[i]) ;
    return i === -2;
};

µ.util.flattenArray = function(arr) {
    var r = [];
    while (!µ.util.arrayEqual(r, arr)) {
        r = arr;
        arr = [].concat.apply([], arr);
    }
    return arr;
};

µ.util.deduplicate = function(arr) {
    return arr.filter(function(v, i, a) {
        return a.indexOf(v) == i;
    });
};

µ.util.convertToCartesian = function(radius, theta) {
    var thetaRadians = theta * Math.PI / 180;
    var x = radius * Math.cos(thetaRadians);
    var y = radius * Math.sin(thetaRadians);
    return [ x, y ];
};

µ.util.round = function(_value, _digits) {
    var digits = _digits || 2;
    var mult = Math.pow(10, digits);
    return Math.round(_value * mult) / mult;
};

µ.util.getMousePos = function(_referenceElement) {
    var mousePos = d3.mouse(_referenceElement.node());
    var mouseX = mousePos[0];
    var mouseY = mousePos[1];
    var mouse = {};
    mouse.x = mouseX;
    mouse.y = mouseY;
    mouse.pos = mousePos;
    mouse.angle = (Math.atan2(mouseY, mouseX) + Math.PI) * 180 / Math.PI;
    mouse.radius = Math.sqrt(mouseX * mouseX + mouseY * mouseY);
    return mouse;
};

µ.util.duplicatesCount = function(arr) {
    var uniques = {}, val;
    var dups = {};
    for (var i = 0, len = arr.length; i < len; i++) {
        val = arr[i];
        if (val in uniques) {
            uniques[val]++;
            dups[val] = uniques[val];
        } else {
            uniques[val] = 1;
        }
    }
    return dups;
};

µ.util.duplicates = function(arr) {
    return Object.keys(µ.util.duplicatesCount(arr));
};

µ.util.translator = function(obj, sourceBranch, targetBranch, reverse) {
    if (reverse) {
        var targetBranchCopy = targetBranch.slice();
        targetBranch = sourceBranch;
        sourceBranch = targetBranchCopy;
    }
    var value = sourceBranch.reduce(function(previousValue, currentValue) {
        if (typeof previousValue != 'undefined') return previousValue[currentValue];
    }, obj);
    if (typeof value === 'undefined') return;
    sourceBranch.reduce(function(previousValue, currentValue, index) {
        if (typeof previousValue == 'undefined') return;
        if (index === sourceBranch.length - 1) delete previousValue[currentValue];
        return previousValue[currentValue];
    }, obj);
    targetBranch.reduce(function(previousValue, currentValue, index) {
        if (typeof previousValue[currentValue] === 'undefined') previousValue[currentValue] = {};
        if (index === targetBranch.length - 1) previousValue[currentValue] = value;
        return previousValue[currentValue];
    }, obj);
};

µ.PolyChart = function module() {
    var config = [ µ.PolyChart.defaultConfig() ];
    var dispatch = d3.dispatch('hover');
    var dashArray = {
        solid: 'none',
        dash: [ 5, 2 ],
        dot: [ 2, 5 ]
    };
    var colorScale;
    function exports() {
        var geometryConfig = config[0].geometryConfig;
        var container = geometryConfig.container;
        if (typeof container == 'string') container = d3.select(container);
        container.datum(config).each(function(_config, _index) {
            var isStack = !!_config[0].data.yStack;
            var data = _config.map(function(d, i) {
                if (isStack) return d3.zip(d.data.t[0], d.data.r[0], d.data.yStack[0]); else return d3.zip(d.data.t[0], d.data.r[0]);
            });
            var angularScale = geometryConfig.angularScale;
            var domainMin = geometryConfig.radialScale.domain()[0];
            var generator = {};
            generator.bar = function(d, i, pI) {
                var dataConfig = _config[pI].data;
                var h = geometryConfig.radialScale(d[1]) - geometryConfig.radialScale(0);
                var stackTop = geometryConfig.radialScale(d[2] || 0);
                var w = dataConfig.barWidth;
                d3.select(this).attr({
                    'class': 'mark bar',
                    d: 'M' + [ [ h + stackTop, -w / 2 ], [ h + stackTop, w / 2 ], [ stackTop, w / 2 ], [ stackTop, -w / 2 ] ].join('L') + 'Z',
                    transform: function(d, i) {
                        return 'rotate(' + (geometryConfig.orientation + angularScale(d[0])) + ')';
                    }
                });
            };
            generator.dot = function(d, i, pI) {
                var stackedData = d[2] ? [ d[0], d[1] + d[2] ] : d;
                var symbol = d3.svg.symbol().size(_config[pI].data.dotSize).type(_config[pI].data.dotType)(d, i);
                d3.select(this).attr({
                    'class': 'mark dot',
                    d: symbol,
                    transform: function(d, i) {
                        var coord = convertToCartesian(getPolarCoordinates(stackedData));
                        return 'translate(' + [ coord.x, coord.y ] + ')';
                    }
                });
            };
            var line = d3.svg.line.radial().interpolate(_config[0].data.lineInterpolation).radius(function(d) {
                return geometryConfig.radialScale(d[1]);
            }).angle(function(d) {
                return geometryConfig.angularScale(d[0]) * Math.PI / 180;
            });
            generator.line = function(d, i, pI) {
                var lineData = d[2] ? data[pI].map(function(d, i) {
                    return [ d[0], d[1] + d[2] ];
                }) : data[pI];
                d3.select(this).each(generator['dot']).style({
                    opacity: function(dB, iB) {
                        return +_config[pI].data.dotVisible;
                    },
                    fill: markStyle.stroke(d, i, pI)
                }).attr({
                    'class': 'mark dot'
                });
                if (i > 0) return;
                var lineSelection = d3.select(this.parentNode).selectAll('path.line').data([ 0 ]);
                lineSelection.enter().insert('path');
                lineSelection.attr({
                    'class': 'line',
                    d: line(lineData),
                    transform: function(dB, iB) {
                        return 'rotate(' + (geometryConfig.orientation + 90) + ')';
                    },
                    'pointer-events': 'none'
                }).style({
                    fill: function(dB, iB) {
                        return markStyle.fill(d, i, pI);
                    },
                    'fill-opacity': 0,
                    stroke: function(dB, iB) {
                        return markStyle.stroke(d, i, pI);
                    },
                    'stroke-width': function(dB, iB) {
                        return markStyle['stroke-width'](d, i, pI);
                    },
                    'stroke-dasharray': function(dB, iB) {
                        return markStyle['stroke-dasharray'](d, i, pI);
                    },
                    opacity: function(dB, iB) {
                        return markStyle.opacity(d, i, pI);
                    },
                    display: function(dB, iB) {
                        return markStyle.display(d, i, pI);
                    }
                });
            };
            var angularRange = geometryConfig.angularScale.range();
            var triangleAngle = Math.abs(angularRange[1] - angularRange[0]) / data[0].length * Math.PI / 180;
            var arc = d3.svg.arc().startAngle(function(d) {
                return -triangleAngle / 2;
            }).endAngle(function(d) {
                return triangleAngle / 2;
            }).innerRadius(function(d) {
                return geometryConfig.radialScale(domainMin + (d[2] || 0));
            }).outerRadius(function(d) {
                return geometryConfig.radialScale(domainMin + (d[2] || 0)) + geometryConfig.radialScale(d[1]);
            });
            generator.arc = function(d, i, pI) {
                d3.select(this).attr({
                    'class': 'mark arc',
                    d: arc,
                    transform: function(d, i) {
                        return 'rotate(' + (geometryConfig.orientation + angularScale(d[0]) + 90) + ')';
                    }
                });
            };
            var markStyle = {
                fill: function(d, i, pI) {
                    return _config[pI].data.color;
                },
                stroke: function(d, i, pI) {
                    return _config[pI].data.strokeColor;
                },
                'stroke-width': function(d, i, pI) {
                    return _config[pI].data.strokeSize + 'px';
                },
                'stroke-dasharray': function(d, i, pI) {
                    return dashArray[_config[pI].data.strokeDash];
                },
                opacity: function(d, i, pI) {
                    return _config[pI].data.opacity;
                },
                display: function(d, i, pI) {
                    return typeof _config[pI].data.visible === 'undefined' || _config[pI].data.visible ? 'block' : 'none';
                }
            };
            var geometryLayer = d3.select(this).selectAll('g.layer').data(data);
            geometryLayer.enter().append('g').attr({
                'class': 'layer'
            });
            var geometry = geometryLayer.selectAll('path.mark').data(function(d, i) {
                return d;
            });
            geometry.enter().append('path').attr({
                'class': 'mark'
            });
            geometry.style(markStyle).each(generator[geometryConfig.geometryType]);
            geometry.exit().remove();
            geometryLayer.exit().remove();
            function getPolarCoordinates(d, i) {
                var r = geometryConfig.radialScale(d[1]);
                var t = (geometryConfig.angularScale(d[0]) + geometryConfig.orientation) * Math.PI / 180;
                return {
                    r: r,
                    t: t
                };
            }
            function convertToCartesian(polarCoordinates) {
                var x = polarCoordinates.r * Math.cos(polarCoordinates.t);
                var y = polarCoordinates.r * Math.sin(polarCoordinates.t);
                return {
                    x: x,
                    y: y
                };
            }
        });
    }
    exports.config = function(_x) {
        if (!arguments.length) return config;
        _x.forEach(function(d, i) {
            if (!config[i]) config[i] = {};
            extendDeepAll(config[i], µ.PolyChart.defaultConfig());
            extendDeepAll(config[i], d);
        });
        return this;
    };
    exports.getColorScale = function() {
        return colorScale;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};

µ.PolyChart.defaultConfig = function() {
    var config = {
        data: {
            name: 'geom1',
            t: [ [ 1, 2, 3, 4 ] ],
            r: [ [ 1, 2, 3, 4 ] ],
            dotType: 'circle',
            dotSize: 64,
            dotVisible: false,
            barWidth: 20,
            color: '#ffa500',
            strokeSize: 1,
            strokeColor: 'silver',
            strokeDash: 'solid',
            opacity: 1,
            index: 0,
            visible: true,
            visibleInLegend: true
        },
        geometryConfig: {
            geometry: 'LinePlot',
            geometryType: 'arc',
            direction: 'clockwise',
            orientation: 0,
            container: 'body',
            radialScale: null,
            angularScale: null,
            colorScale: d3.scale.category20()
        }
    };
    return config;
};

µ.BarChart = function module() {
    return µ.PolyChart();
};

µ.BarChart.defaultConfig = function() {
    var config = {
        geometryConfig: {
            geometryType: 'bar'
        }
    };
    return config;
};

µ.AreaChart = function module() {
    return µ.PolyChart();
};

µ.AreaChart.defaultConfig = function() {
    var config = {
        geometryConfig: {
            geometryType: 'arc'
        }
    };
    return config;
};

µ.DotPlot = function module() {
    return µ.PolyChart();
};

µ.DotPlot.defaultConfig = function() {
    var config = {
        geometryConfig: {
            geometryType: 'dot',
            dotType: 'circle'
        }
    };
    return config;
};

µ.LinePlot = function module() {
    return µ.PolyChart();
};

µ.LinePlot.defaultConfig = function() {
    var config = {
        geometryConfig: {
            geometryType: 'line'
        }
    };
    return config;
};

µ.Legend = function module() {
    var config = µ.Legend.defaultConfig();
    var dispatch = d3.dispatch('hover');
    function exports() {
        var legendConfig = config.legendConfig;
        var flattenData = config.data.map(function(d, i) {
            return [].concat(d).map(function(dB, iB) {
                var element = extendDeepAll({}, legendConfig.elements[i]);
                element.name = dB;
                element.color = [].concat(legendConfig.elements[i].color)[iB];
                return element;
            });
        });
        var data = d3.merge(flattenData);
        data = data.filter(function(d, i) {
            return legendConfig.elements[i] && (legendConfig.elements[i].visibleInLegend || typeof legendConfig.elements[i].visibleInLegend === 'undefined');
        });
        if (legendConfig.reverseOrder) data = data.reverse();
        var container = legendConfig.container;
        if (typeof container == 'string' || container.nodeName) container = d3.select(container);
        var colors = data.map(function(d, i) {
            return d.color;
        });
        var lineHeight = legendConfig.fontSize;
        var isContinuous = legendConfig.isContinuous == null ? typeof data[0] === 'number' : legendConfig.isContinuous;
        var height = isContinuous ? legendConfig.height : lineHeight * data.length;
        var legendContainerGroup = container.classed('legend-group', true);
        var svg = legendContainerGroup.selectAll('svg').data([ 0 ]);
        var svgEnter = svg.enter().append('svg').attr({
            width: 300,
            height: height + lineHeight,
            xmlns: 'http://www.w3.org/2000/svg',
            'xmlns:xlink': 'http://www.w3.org/1999/xlink',
            version: '1.1'
        });
        svgEnter.append('g').classed('legend-axis', true);
        svgEnter.append('g').classed('legend-marks', true);
        var dataNumbered = d3.range(data.length);
        var colorScale = d3.scale[isContinuous ? 'linear' : 'ordinal']().domain(dataNumbered).range(colors);
        var dataScale = d3.scale[isContinuous ? 'linear' : 'ordinal']().domain(dataNumbered)[isContinuous ? 'range' : 'rangePoints']([ 0, height ]);
        var shapeGenerator = function(_type, _size) {
            var squareSize = _size * 3;
            if (_type === 'line') {
                return 'M' + [ [ -_size / 2, -_size / 12 ], [ _size / 2, -_size / 12 ], [ _size / 2, _size / 12 ], [ -_size / 2, _size / 12 ] ] + 'Z';
            } else if (d3.svg.symbolTypes.indexOf(_type) != -1) return d3.svg.symbol().type(_type).size(squareSize)(); else return d3.svg.symbol().type('square').size(squareSize)();
        };
        if (isContinuous) {
            var gradient = svg.select('.legend-marks').append('defs').append('linearGradient').attr({
                id: 'grad1',
                x1: '0%',
                y1: '0%',
                x2: '0%',
                y2: '100%'
            }).selectAll('stop').data(colors);
            gradient.enter().append('stop');
            gradient.attr({
                offset: function(d, i) {
                    return i / (colors.length - 1) * 100 + '%';
                }
            }).style({
                'stop-color': function(d, i) {
                    return d;
                }
            });
            svg.append('rect').classed('legend-mark', true).attr({
                height: legendConfig.height,
                width: legendConfig.colorBandWidth,
                fill: 'url(#grad1)'
            });
        } else {
            var legendElement = svg.select('.legend-marks').selectAll('path.legend-mark').data(data);
            legendElement.enter().append('path').classed('legend-mark', true);
            legendElement.attr({
                transform: function(d, i) {
                    return 'translate(' + [ lineHeight / 2, dataScale(i) + lineHeight / 2 ] + ')';
                },
                d: function(d, i) {
                    var symbolType = d.symbol;
                    return shapeGenerator(symbolType, lineHeight);
                },
                fill: function(d, i) {
                    return colorScale(i);
                }
            });
            legendElement.exit().remove();
        }
        var legendAxis = d3.svg.axis().scale(dataScale).orient('right');
        var axis = svg.select('g.legend-axis').attr({
            transform: 'translate(' + [ isContinuous ? legendConfig.colorBandWidth : lineHeight, lineHeight / 2 ] + ')'
        }).call(legendAxis);
        axis.selectAll('.domain').style({
            fill: 'none',
            stroke: 'none'
        });
        axis.selectAll('line').style({
            fill: 'none',
            stroke: isContinuous ? legendConfig.textColor : 'none'
        });
        axis.selectAll('text').style({
            fill: legendConfig.textColor,
            'font-size': legendConfig.fontSize
        }).text(function(d, i) {
            return data[i].name;
        });
        return exports;
    }
    exports.config = function(_x) {
        if (!arguments.length) return config;
        extendDeepAll(config, _x);
        return this;
    };
    d3.rebind(exports, dispatch, 'on');
    return exports;
};

µ.Legend.defaultConfig = function(d, i) {
    var config = {
        data: [ 'a', 'b', 'c' ],
        legendConfig: {
            elements: [ {
                symbol: 'line',
                color: 'red'
            }, {
                symbol: 'square',
                color: 'yellow'
            }, {
                symbol: 'diamond',
                color: 'limegreen'
            } ],
            height: 150,
            colorBandWidth: 30,
            fontSize: 12,
            container: 'body',
            isContinuous: null,
            textColor: 'grey',
            reverseOrder: false
        }
    };
    return config;
};

µ.tooltipPanel = function() {
    var tooltipEl, tooltipTextEl, backgroundEl;
    var config = {
        container: null,
        hasTick: false,
        fontSize: 12,
        color: 'white',
        padding: 5
    };
    var id = 'tooltip-' + µ.tooltipPanel.uid++;
    var tickSize = 10;
    var exports = function() {
        tooltipEl = config.container.selectAll('g.' + id).data([ 0 ]);
        var tooltipEnter = tooltipEl.enter().append('g').classed(id, true).style({
            'pointer-events': 'none',
            display: 'none'
        });
        backgroundEl = tooltipEnter.append('path').style({
            fill: 'white',
            'fill-opacity': .9
        }).attr({
            d: 'M0 0'
        });
        tooltipTextEl = tooltipEnter.append('text').attr({
            dx: config.padding + tickSize,
            dy: +config.fontSize * .3
        });
        return exports;
    };
    exports.text = function(_text) {
        var l = d3.hsl(config.color).l;
        var strokeColor = l >= .5 ? '#aaa' : 'white';
        var fillColor = l >= .5 ? 'black' : 'white';
        var text = _text || '';
        tooltipTextEl.style({
            fill: fillColor,
            'font-size': config.fontSize + 'px'
        }).text(text);
        var padding = config.padding;
        var bbox = tooltipTextEl.node().getBBox();
        var boxStyle = {
            fill: config.color,
            stroke: strokeColor,
            'stroke-width': '2px'
        };
        var backGroundW = bbox.width + padding * 2 + tickSize;
        var backGroundH = bbox.height + padding * 2;
        backgroundEl.attr({
            d: 'M' + [ [ tickSize, -backGroundH / 2 ], [ tickSize, -backGroundH / 4 ], [ config.hasTick ? 0 : tickSize, 0 ], [ tickSize, backGroundH / 4 ], [ tickSize, backGroundH / 2 ], [ backGroundW, backGroundH / 2 ], [ backGroundW, -backGroundH / 2 ] ].join('L') + 'Z'
        }).style(boxStyle);
        tooltipEl.attr({
            transform: 'translate(' + [ tickSize, -backGroundH / 2 + padding * 2 ] + ')'
        });
        tooltipEl.style({
            display: 'block'
        });
        return exports;
    };
    exports.move = function(_pos) {
        if (!tooltipEl) return;
        tooltipEl.attr({
            transform: 'translate(' + [ _pos[0], _pos[1] ] + ')'
        }).style({
            display: 'block'
        });
        return exports;
    };
    exports.hide = function() {
        if (!tooltipEl) return;
        tooltipEl.style({
            display: 'none'
        });
        return exports;
    };
    exports.show = function() {
        if (!tooltipEl) return;
        tooltipEl.style({
            display: 'block'
        });
        return exports;
    };
    exports.config = function(_x) {
        extendDeepAll(config, _x);
        return exports;
    };
    return exports;
};

µ.tooltipPanel.uid = 1;

µ.adapter = {};

µ.adapter.plotly = function module() {
    var exports = {};
    exports.convert = function(_inputConfig, reverse) {
        var outputConfig = {};
        if (_inputConfig.data) {
            outputConfig.data = _inputConfig.data.map(function(d, i) {
                var r = extendDeepAll({}, d);
                var toTranslate = [
                    [ r, [ 'marker', 'color' ], [ 'color' ] ],
                    [ r, [ 'marker', 'opacity' ], [ 'opacity' ] ],
                    [ r, [ 'marker', 'line', 'color' ], [ 'strokeColor' ] ],
                    [ r, [ 'marker', 'line', 'dash' ], [ 'strokeDash' ] ],
                    [ r, [ 'marker', 'line', 'width' ], [ 'strokeSize' ] ],
                    [ r, [ 'marker', 'symbol' ], [ 'dotType' ] ],
                    [ r, [ 'marker', 'size' ], [ 'dotSize' ] ],
                    [ r, [ 'marker', 'barWidth' ], [ 'barWidth' ] ],
                    [ r, [ 'line', 'interpolation' ], [ 'lineInterpolation' ] ],
                    [ r, [ 'showlegend' ], [ 'visibleInLegend' ] ]
                ];
                toTranslate.forEach(function(d, i) {
                    µ.util.translator.apply(null, d.concat(reverse));
                });

                if (!reverse) delete r.marker;
                if (reverse) delete r.groupId;
                if (!reverse) {
                    if (r.type === 'scatter') {
                        if (r.mode === 'lines') r.geometry = 'LinePlot'; else if (r.mode === 'markers') r.geometry = 'DotPlot'; else if (r.mode === 'lines+markers') {
                            r.geometry = 'LinePlot';
                            r.dotVisible = true;
                        }
                    } else if (r.type === 'area') r.geometry = 'AreaChart'; else if (r.type === 'bar') r.geometry = 'BarChart';
                    delete r.mode;
                    delete r.type;
                } else {
                    if (r.geometry === 'LinePlot') {
                        r.type = 'scatter';
                        if (r.dotVisible === true) {
                            delete r.dotVisible;
                            r.mode = 'lines+markers';
                        } else r.mode = 'lines';
                    } else if (r.geometry === 'DotPlot') {
                        r.type = 'scatter';
                        r.mode = 'markers';
                    } else if (r.geometry === 'AreaChart') r.type = 'area'; else if (r.geometry === 'BarChart') r.type = 'bar';
                    delete r.geometry;
                }
                return r;
            });
            if (!reverse && _inputConfig.layout && _inputConfig.layout.barmode === 'stack') {
                var duplicates = µ.util.duplicates(outputConfig.data.map(function(d, i) {
                    return d.geometry;
                }));
                outputConfig.data.forEach(function(d, i) {
                    var idx = duplicates.indexOf(d.geometry);
                    if (idx != -1) outputConfig.data[i].groupId = idx;
                });
            }
        }
        if (_inputConfig.layout) {
            var r = extendDeepAll({}, _inputConfig.layout);
            var toTranslate = [
                [ r, [ 'plot_bgcolor' ], [ 'backgroundColor' ] ],
                [ r, [ 'showlegend' ], [ 'showLegend' ] ],
                [ r, [ 'radialaxis' ], [ 'radialAxis' ] ],
                [ r, [ 'angularaxis' ], [ 'angularAxis' ] ],
                [ r.angularaxis, [ 'showline' ], [ 'gridLinesVisible' ] ],
                [ r.angularaxis, [ 'showticklabels' ], [ 'labelsVisible' ] ],
                [ r.angularaxis, [ 'nticks' ], [ 'ticksCount' ] ],
                [ r.angularaxis, [ 'tickorientation' ], [ 'tickOrientation' ] ],
                [ r.angularaxis, [ 'ticksuffix' ], [ 'ticksSuffix' ] ],
                [ r.angularaxis, [ 'range' ], [ 'domain' ] ],
                [ r.angularaxis, [ 'endpadding' ], [ 'endPadding' ] ],
                [ r.radialaxis, [ 'showline' ], [ 'gridLinesVisible' ] ],
                [ r.radialaxis, [ 'tickorientation' ], [ 'tickOrientation' ] ],
                [ r.radialaxis, [ 'ticksuffix' ], [ 'ticksSuffix' ] ],
                [ r.radialaxis, [ 'range' ], [ 'domain' ] ],
                [ r.angularAxis, [ 'showline' ], [ 'gridLinesVisible' ] ],
                [ r.angularAxis, [ 'showticklabels' ], [ 'labelsVisible' ] ],
                [ r.angularAxis, [ 'nticks' ], [ 'ticksCount' ] ],
                [ r.angularAxis, [ 'tickorientation' ], [ 'tickOrientation' ] ],
                [ r.angularAxis, [ 'ticksuffix' ], [ 'ticksSuffix' ] ],
                [ r.angularAxis, [ 'range' ], [ 'domain' ] ],
                [ r.angularAxis, [ 'endpadding' ], [ 'endPadding' ] ],
                [ r.radialAxis, [ 'showline' ], [ 'gridLinesVisible' ] ],
                [ r.radialAxis, [ 'tickorientation' ], [ 'tickOrientation' ] ],
                [ r.radialAxis, [ 'ticksuffix' ], [ 'ticksSuffix' ] ],
                [ r.radialAxis, [ 'range' ], [ 'domain' ] ],
                [ r.font, [ 'outlinecolor' ], [ 'outlineColor' ] ],
                [ r.legend, [ 'traceorder' ], [ 'reverseOrder' ] ],
                [ r, [ 'labeloffset' ], [ 'labelOffset' ] ],
                [ r, [ 'defaultcolorrange' ], [ 'defaultColorRange' ] ]
            ];
            toTranslate.forEach(function(d, i) {
                µ.util.translator.apply(null, d.concat(reverse));
            });

            if (!reverse) {
                if (r.angularAxis && typeof r.angularAxis.ticklen !== 'undefined') r.tickLength = r.angularAxis.ticklen;
                if (r.angularAxis && typeof r.angularAxis.tickcolor !== 'undefined') r.tickColor = r.angularAxis.tickcolor;
            } else {
                if (typeof r.tickLength !== 'undefined') {
                    r.angularaxis.ticklen = r.tickLength;
                    delete r.tickLength;
                }
                if (r.tickColor) {
                    r.angularaxis.tickcolor = r.tickColor;
                    delete r.tickColor;
                }
            }
            if (r.legend && typeof r.legend.reverseOrder != 'boolean') {
                r.legend.reverseOrder = r.legend.reverseOrder != 'normal';
            }
            if (r.legend && typeof r.legend.traceorder == 'boolean') {
                r.legend.traceorder = r.legend.traceorder ? 'reversed' : 'normal';
                delete r.legend.reverseOrder;
            }
            if (r.margin && typeof r.margin.t != 'undefined') {
                var source = [ 't', 'r', 'b', 'l', 'pad' ];
                var target = [ 'top', 'right', 'bottom', 'left', 'pad' ];
                var margin = {};
                d3.entries(r.margin).forEach(function(dB, iB) {
                    margin[target[source.indexOf(dB.key)]] = dB.value;
                });
                r.margin = margin;
            }
            if (reverse) {
                delete r.needsEndSpacing;
                delete r.minorTickColor;
                delete r.minorTicks;
                delete r.angularaxis.ticksCount;
                delete r.angularaxis.ticksCount;
                delete r.angularaxis.ticksStep;
                delete r.angularaxis.rewriteTicks;
                delete r.angularaxis.nticks;
                delete r.radialaxis.ticksCount;
                delete r.radialaxis.ticksCount;
                delete r.radialaxis.ticksStep;
                delete r.radialaxis.rewriteTicks;
                delete r.radialaxis.nticks;
            }
            outputConfig.layout = r;
        }
        return outputConfig;
    };
    return exports;
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/legacy/micropolar_manager.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/legacy/micropolar_manager.js ***!
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

/* eslint-disable new-cap */



var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var Lib = __webpack_require__(/*! ../../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var Color = __webpack_require__(/*! ../../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");

var micropolar = __webpack_require__(/*! ./micropolar */ "./node_modules/plotly.js/src/plots/polar/legacy/micropolar.js");
var UndoManager = __webpack_require__(/*! ./undo_manager */ "./node_modules/plotly.js/src/plots/polar/legacy/undo_manager.js");
var extendDeepAll = Lib.extendDeepAll;

var manager = module.exports = {};

manager.framework = function(_gd) {
    var config, previousConfigClone, plot, convertedInput, container;
    var undoManager = new UndoManager();

    function exports(_inputConfig, _container) {
        if(_container) container = _container;
        d3.select(d3.select(container).node().parentNode).selectAll('.svg-container>*:not(.chart-root)').remove();

        config = (!config) ?
            _inputConfig :
            extendDeepAll(config, _inputConfig);

        if(!plot) plot = micropolar.Axis();
        convertedInput = micropolar.adapter.plotly().convert(config);
        plot.config(convertedInput).render(container);
        _gd.data = config.data;
        _gd.layout = config.layout;
        manager.fillLayout(_gd);
        return config;
    }
    exports.isPolar = true;
    exports.svg = function() { return plot.svg(); };
    exports.getConfig = function() { return config; };
    exports.getLiveConfig = function() {
        return micropolar.adapter.plotly().convert(plot.getLiveConfig(), true);
    };
    exports.getLiveScales = function() { return {t: plot.angularScale(), r: plot.radialScale()}; };
    exports.setUndoPoint = function() {
        var that = this;
        var configClone = micropolar.util.cloneJson(config);
        (function(_configClone, _previousConfigClone) {
            undoManager.add({
                undo: function() {
                    if(_previousConfigClone) that(_previousConfigClone);
                },
                redo: function() {
                    that(_configClone);
                }
            });
        })(configClone, previousConfigClone);
        previousConfigClone = micropolar.util.cloneJson(configClone);
    };
    exports.undo = function() { undoManager.undo(); };
    exports.redo = function() { undoManager.redo(); };
    return exports;
};

manager.fillLayout = function(_gd) {
    var container = d3.select(_gd).selectAll('.plot-container');
    var paperDiv = container.selectAll('.svg-container');
    var paper = _gd.framework && _gd.framework.svg && _gd.framework.svg();
    var dflts = {
        width: 800,
        height: 600,
        paper_bgcolor: Color.background,
        _container: container,
        _paperdiv: paperDiv,
        _paper: paper
    };

    _gd._fullLayout = extendDeepAll(dflts, _gd.layout);
};


/***/ }),

/***/ "./node_modules/plotly.js/src/plots/polar/legacy/undo_manager.js":
/*!***********************************************************************!*\
  !*** ./node_modules/plotly.js/src/plots/polar/legacy/undo_manager.js ***!
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



// Modified from https://github.com/ArthurClemens/Javascript-Undo-Manager
// Copyright (c) 2010-2013 Arthur Clemens, arthur@visiblearea.com
module.exports = function UndoManager() {
    var undoCommands = [];
    var index = -1;
    var isExecuting = false;
    var callback;

    function execute(command, action) {
        if(!command) return this;

        isExecuting = true;
        command[action]();
        isExecuting = false;

        return this;
    }

    return {
        add: function(command) {
            if(isExecuting) return this;
            undoCommands.splice(index + 1, undoCommands.length - index);
            undoCommands.push(command);
            index = undoCommands.length - 1;
            return this;
        },
        setCallback: function(callbackFunc) { callback = callbackFunc; },
        undo: function() {
            var command = undoCommands[index];
            if(!command) return this;
            execute(command, 'undo');
            index -= 1;
            if(callback) callback(command.undo);
            return this;
        },
        redo: function() {
            var command = undoCommands[index + 1];
            if(!command) return this;
            execute(command, 'redo');
            index += 1;
            if(callback) callback(command.redo);
            return this;
        },
        clear: function() {
            undoCommands = [];
            index = -1;
        },
        hasUndo: function() { return index !== -1; },
        hasRedo: function() { return index < (undoCommands.length - 1); },
        getCommands: function() { return undoCommands; },
        getPreviousCommand: function() { return undoCommands[index - 1]; },
        getIndex: function() { return index; }
    };
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL2dsLW1hdDQvZnJvbVF1YXQuanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL2xpYi9xdWV1ZS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdF9hcGkvY29udGFpbmVyX2FycmF5X21hdGNoLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90X2FwaS9oZWxwZXJzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90X2FwaS9tYW5hZ2VfYXJyYXlzLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90X2FwaS9wbG90X2FwaS5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvcGxvdHMvZG9tYWluLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9wb2xhci9sZWdhY3kvaW5kZXguanMiLCJ3ZWJwYWNrOi8vZGktd2Vic2l0ZS8uL25vZGVfbW9kdWxlcy9wbG90bHkuanMvc3JjL3Bsb3RzL3BvbGFyL2xlZ2FjeS9taWNyb3BvbGFyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9wb2xhci9sZWdhY3kvbWljcm9wb2xhcl9tYW5hZ2VyLmpzIiwid2VicGFjazovL2RpLXdlYnNpdGUvLi9ub2RlX21vZHVsZXMvcGxvdGx5LmpzL3NyYy9wbG90cy9wb2xhci9sZWdhY3kvdW5kb19tYW5hZ2VyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7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cUJBQXFCO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1Q0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0Esa0JBQWtCLGlCQUFpQjtBQUNuQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxrQkFBa0Isa0JBQWtCO0FBQ3BDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBLGtCQUFrQixpQ0FBaUM7O0FBRW5EO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLG9DQUFvQztBQUM1RDtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjs7QUFFQTtBQUNBLGtEQUFrRCxPQUFPO0FBQ3pEO0FBQ0Esa0NBQWtDLFNBQVMsUUFBUSxhQUFhO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsMENBQTBDOztBQUVwRTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsY0FBYyxvQkFBb0I7QUFDbEM7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGNBQWMsb0JBQW9CO0FBQ2xDOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGNBQWMsbUJBQW1CO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7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QTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLGNBQWMsd0JBQXdCO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsc0JBQXNCLFlBQVk7QUFDbEM7QUFDQTtBQUNBLG9DQUFvQyw0QkFBNEI7QUFDaEU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0IsWUFBWTtBQUMzQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLG1CQUFtQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyx5QkFBeUI7QUFDcEM7QUFDQTtBQUNBLFdBQVcseURBQXlEO0FBQ3BFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQixVQUFVO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUNBQW1DLFVBQVUsR0FBRyxVQUFVO0FBQzFEO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBLDBCQUEwQixzQkFBc0I7QUFDaEQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5QjtBQUN6QjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOEZBQThGLG9HQUFvRztBQUNsTTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLEdBQUc7QUFDeEIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxrRkFBa0Y7QUFDbEY7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsRUFBRTtBQUNuQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0JBQW9CO0FBQ3BCO0FBQ0EscUNBQXFDLFNBQVM7QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUZBQXVGO0FBQ3ZGLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLHlHQUF5RztBQUN0SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFD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bkQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDbkZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsNkNBQTZDLHlCQUF5QixFQUFFO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCw2QkFBNkIscUJBQXFCLEVBQUU7QUFDcEQsNkJBQTZCLDBDQUEwQyxFQUFFO0FBQ3pFLGlDQUFpQyxxQkFBcUIsRUFBRTtBQUN4RCx3Q0FBd0MsZ0NBQWdDLEVBQUU7QUFDMUUsOEJBQThCLGNBQWM7QUFDNUM7QUFDQSIsImZpbGUiOiJjaGFydDUwZGUwOWEzMzRhZWY4YjQwYTNiLmpzIiwic291cmNlc0NvbnRlbnQiOlsibW9kdWxlLmV4cG9ydHMgPSBmcm9tUXVhdDtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbWF0cml4IGZyb20gYSBxdWF0ZXJuaW9uIHJvdGF0aW9uLlxuICpcbiAqIEBwYXJhbSB7bWF0NH0gb3V0IG1hdDQgcmVjZWl2aW5nIG9wZXJhdGlvbiByZXN1bHRcbiAqIEBwYXJhbSB7cXVhdDR9IHEgUm90YXRpb24gcXVhdGVybmlvblxuICogQHJldHVybnMge21hdDR9IG91dFxuICovXG5mdW5jdGlvbiBmcm9tUXVhdChvdXQsIHEpIHtcbiAgICB2YXIgeCA9IHFbMF0sIHkgPSBxWzFdLCB6ID0gcVsyXSwgdyA9IHFbM10sXG4gICAgICAgIHgyID0geCArIHgsXG4gICAgICAgIHkyID0geSArIHksXG4gICAgICAgIHoyID0geiArIHosXG5cbiAgICAgICAgeHggPSB4ICogeDIsXG4gICAgICAgIHl4ID0geSAqIHgyLFxuICAgICAgICB5eSA9IHkgKiB5MixcbiAgICAgICAgenggPSB6ICogeDIsXG4gICAgICAgIHp5ID0geiAqIHkyLFxuICAgICAgICB6eiA9IHogKiB6MixcbiAgICAgICAgd3ggPSB3ICogeDIsXG4gICAgICAgIHd5ID0gdyAqIHkyLFxuICAgICAgICB3eiA9IHcgKiB6MjtcblxuICAgIG91dFswXSA9IDEgLSB5eSAtIHp6O1xuICAgIG91dFsxXSA9IHl4ICsgd3o7XG4gICAgb3V0WzJdID0genggLSB3eTtcbiAgICBvdXRbM10gPSAwO1xuXG4gICAgb3V0WzRdID0geXggLSB3ejtcbiAgICBvdXRbNV0gPSAxIC0geHggLSB6ejtcbiAgICBvdXRbNl0gPSB6eSArIHd4O1xuICAgIG91dFs3XSA9IDA7XG5cbiAgICBvdXRbOF0gPSB6eCArIHd5O1xuICAgIG91dFs5XSA9IHp5IC0gd3g7XG4gICAgb3V0WzEwXSA9IDEgLSB4eCAtIHl5O1xuICAgIG91dFsxMV0gPSAwO1xuXG4gICAgb3V0WzEyXSA9IDA7XG4gICAgb3V0WzEzXSA9IDA7XG4gICAgb3V0WzE0XSA9IDA7XG4gICAgb3V0WzE1XSA9IDE7XG5cbiAgICByZXR1cm4gb3V0O1xufTsiLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi9saWInKTtcbnZhciBkZmx0Q29uZmlnID0gcmVxdWlyZSgnLi4vcGxvdF9hcGkvcGxvdF9jb25maWcnKS5kZmx0Q29uZmlnO1xuXG4vKipcbiAqIENvcHkgYXJnIGFycmF5ICp3aXRob3V0KiByZW1vdmluZyBgdW5kZWZpbmVkYCB2YWx1ZXMgZnJvbSBvYmplY3RzLlxuICpcbiAqIEBwYXJhbSBnZFxuICogQHBhcmFtIGFyZ3NcbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqL1xuZnVuY3Rpb24gY29weUFyZ0FycmF5KGdkLCBhcmdzKSB7XG4gICAgdmFyIGNvcHkgPSBbXTtcbiAgICB2YXIgYXJnO1xuXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgYXJnID0gYXJnc1tpXTtcblxuICAgICAgICBpZihhcmcgPT09IGdkKSBjb3B5W2ldID0gYXJnO1xuICAgICAgICBlbHNlIGlmKHR5cGVvZiBhcmcgPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICBjb3B5W2ldID0gQXJyYXkuaXNBcnJheShhcmcpID9cbiAgICAgICAgICAgICAgICBMaWIuZXh0ZW5kRGVlcChbXSwgYXJnKSA6XG4gICAgICAgICAgICAgICAgTGliLmV4dGVuZERlZXBBbGwoe30sIGFyZyk7XG4gICAgICAgIH0gZWxzZSBjb3B5W2ldID0gYXJnO1xuICAgIH1cblxuICAgIHJldHVybiBjb3B5O1xufVxuXG5cbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBVbmRvL1JlZG8gcXVldWUgZm9yIHBsb3RzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG5cbnZhciBxdWV1ZSA9IHt9O1xuXG4vLyBUT0RPOiBkaXNhYmxlL2VuYWJsZSB1bmRvIGFuZCByZWRvIGJ1dHRvbnMgYXBwcm9wcmlhdGVseVxuXG4vKipcbiAqIEFkZCBhbiBpdGVtIHRvIHRoZSB1bmRvUXVldWUgZm9yIGEgZ3JhcGhEaXZcbiAqXG4gKiBAcGFyYW0gZ2RcbiAqIEBwYXJhbSB1bmRvRnVuYyBGdW5jdGlvbiB1bmRvIHRoaXMgb3BlcmF0aW9uXG4gKiBAcGFyYW0gdW5kb0FyZ3MgQXJncyB0byBzdXBwbHkgdW5kb0Z1bmMgd2l0aFxuICogQHBhcmFtIHJlZG9GdW5jIEZ1bmN0aW9uIHRvIHJlZG8gdGhpcyBvcGVyYXRpb25cbiAqIEBwYXJhbSByZWRvQXJncyBBcmdzIHRvIHN1cHBseSByZWRvRnVuYyB3aXRoXG4gKi9cbnF1ZXVlLmFkZCA9IGZ1bmN0aW9uKGdkLCB1bmRvRnVuYywgdW5kb0FyZ3MsIHJlZG9GdW5jLCByZWRvQXJncykge1xuICAgIHZhciBxdWV1ZU9iaixcbiAgICAgICAgcXVldWVJbmRleDtcblxuICAgIC8vIG1ha2Ugc3VyZSB3ZSBoYXZlIHRoZSBxdWV1ZSBhbmQgb3VyIHBvc2l0aW9uIGluIGl0XG4gICAgZ2QudW5kb1F1ZXVlID0gZ2QudW5kb1F1ZXVlIHx8IHtpbmRleDogMCwgcXVldWU6IFtdLCBzZXF1ZW5jZTogZmFsc2V9O1xuICAgIHF1ZXVlSW5kZXggPSBnZC51bmRvUXVldWUuaW5kZXg7XG5cbiAgICAvLyBpZiB3ZSdyZSBhbHJlYWR5IHBsYXlpbmcgYW4gdW5kbyBvciByZWRvLCBvciBpZiB0aGlzIGlzIGFuIGF1dG8gb3BlcmF0aW9uXG4gICAgLy8gKGxpa2UgcGFuZSByZXNpemUuLi4gYW55IG90aGVycz8pIHRoZW4gd2UgZG9uJ3Qgc2F2ZSB0aGlzIHRvIHRoZSB1bmRvIHF1ZXVlXG4gICAgaWYoZ2QuYXV0b3BsYXkpIHtcbiAgICAgICAgaWYoIWdkLnVuZG9RdWV1ZS5pblNlcXVlbmNlKSBnZC5hdXRvcGxheSA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gaWYgd2UncmUgbm90IGluIGEgc2VxdWVuY2Ugb3IgYXJlIGp1c3Qgc3RhcnRpbmcsIHdlIG5lZWQgYSBuZXcgcXVldWUgaXRlbVxuICAgIGlmKCFnZC51bmRvUXVldWUuc2VxdWVuY2UgfHwgZ2QudW5kb1F1ZXVlLmJlZ2luU2VxdWVuY2UpIHtcbiAgICAgICAgcXVldWVPYmogPSB7dW5kbzoge2NhbGxzOiBbXSwgYXJnczogW119LCByZWRvOiB7Y2FsbHM6IFtdLCBhcmdzOiBbXX19O1xuICAgICAgICBnZC51bmRvUXVldWUucXVldWUuc3BsaWNlKHF1ZXVlSW5kZXgsIGdkLnVuZG9RdWV1ZS5xdWV1ZS5sZW5ndGggLSBxdWV1ZUluZGV4LCBxdWV1ZU9iaik7XG4gICAgICAgIGdkLnVuZG9RdWV1ZS5pbmRleCArPSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlT2JqID0gZ2QudW5kb1F1ZXVlLnF1ZXVlW3F1ZXVlSW5kZXggLSAxXTtcbiAgICB9XG4gICAgZ2QudW5kb1F1ZXVlLmJlZ2luU2VxdWVuY2UgPSBmYWxzZTtcblxuICAgIC8vIHdlIHVuc2hpZnQgdG8gaGFuZGxlIGNhbGxzIGZvciB1bmRvIGluIGEgZm9yd2FyZCBmb3IgbG9vcCBsYXRlclxuICAgIGlmKHF1ZXVlT2JqKSB7XG4gICAgICAgIHF1ZXVlT2JqLnVuZG8uY2FsbHMudW5zaGlmdCh1bmRvRnVuYyk7XG4gICAgICAgIHF1ZXVlT2JqLnVuZG8uYXJncy51bnNoaWZ0KHVuZG9BcmdzKTtcbiAgICAgICAgcXVldWVPYmoucmVkby5jYWxscy5wdXNoKHJlZG9GdW5jKTtcbiAgICAgICAgcXVldWVPYmoucmVkby5hcmdzLnB1c2gocmVkb0FyZ3MpO1xuICAgIH1cblxuICAgIGlmKGdkLnVuZG9RdWV1ZS5xdWV1ZS5sZW5ndGggPiBkZmx0Q29uZmlnLnF1ZXVlTGVuZ3RoKSB7XG4gICAgICAgIGdkLnVuZG9RdWV1ZS5xdWV1ZS5zaGlmdCgpO1xuICAgICAgICBnZC51bmRvUXVldWUuaW5kZXgtLTtcbiAgICB9XG59O1xuXG4vKipcbiAqIEJlZ2luIGEgc2VxdWVuY2Ugb2YgdW5kb1F1ZXVlIGNoYW5nZXNcbiAqXG4gKiBAcGFyYW0gZ2RcbiAqL1xucXVldWUuc3RhcnRTZXF1ZW5jZSA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgZ2QudW5kb1F1ZXVlID0gZ2QudW5kb1F1ZXVlIHx8IHtpbmRleDogMCwgcXVldWU6IFtdLCBzZXF1ZW5jZTogZmFsc2V9O1xuICAgIGdkLnVuZG9RdWV1ZS5zZXF1ZW5jZSA9IHRydWU7XG4gICAgZ2QudW5kb1F1ZXVlLmJlZ2luU2VxdWVuY2UgPSB0cnVlO1xufTtcblxuLyoqXG4gKiBTdG9wIGEgc2VxdWVuY2Ugb2YgdW5kb1F1ZXVlIGNoYW5nZXNcbiAqXG4gKiBDYWxsIHRoaXMgKmFmdGVyKiB5b3UncmUgc3VyZSB5b3VyIHVuZG8gY2hhaW4gaGFzIGVuZGVkXG4gKlxuICogQHBhcmFtIGdkXG4gKi9cbnF1ZXVlLnN0b3BTZXF1ZW5jZSA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgZ2QudW5kb1F1ZXVlID0gZ2QudW5kb1F1ZXVlIHx8IHtpbmRleDogMCwgcXVldWU6IFtdLCBzZXF1ZW5jZTogZmFsc2V9O1xuICAgIGdkLnVuZG9RdWV1ZS5zZXF1ZW5jZSA9IGZhbHNlO1xuICAgIGdkLnVuZG9RdWV1ZS5iZWdpblNlcXVlbmNlID0gZmFsc2U7XG59O1xuXG4vKipcbiAqIE1vdmUgb25lIHN0ZXAgYmFjayBpbiB0aGUgdW5kbyBxdWV1ZSwgYW5kIHVuZG8gdGhlIG9iamVjdCB0aGVyZS5cbiAqXG4gKiBAcGFyYW0gZ2RcbiAqL1xucXVldWUudW5kbyA9IGZ1bmN0aW9uIHVuZG8oZ2QpIHtcbiAgICB2YXIgcXVldWVPYmosIGk7XG5cbiAgICBpZihnZC5mcmFtZXdvcmsgJiYgZ2QuZnJhbWV3b3JrLmlzUG9sYXIpIHtcbiAgICAgICAgZ2QuZnJhbWV3b3JrLnVuZG8oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZihnZC51bmRvUXVldWUgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgaXNOYU4oZ2QudW5kb1F1ZXVlLmluZGV4KSB8fFxuICAgICAgICAgICAgZ2QudW5kb1F1ZXVlLmluZGV4IDw9IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGluZGV4IGlzIHBvaW50aW5nIHRvIG5leHQgKmZvcndhcmQqIHF1ZXVlT2JqLCBwb2ludCB0byB0aGUgb25lIHdlJ3JlIHVuZG9pbmdcbiAgICBnZC51bmRvUXVldWUuaW5kZXgtLTtcblxuICAgIC8vIGdldCB0aGUgcXVldWVPYmogZm9yIGluc3RydWN0aW9ucyBvbiBob3cgdG8gdW5kb1xuICAgIHF1ZXVlT2JqID0gZ2QudW5kb1F1ZXVlLnF1ZXVlW2dkLnVuZG9RdWV1ZS5pbmRleF07XG5cbiAgICAvLyB0aGlzIHNlcXVlbmNlIGtlZXBzIHRoaW5ncyBmcm9tIGFkZGluZyB0byB0aGUgcXVldWUgZHVyaW5nIHVuZG8vcmVkb1xuICAgIGdkLnVuZG9RdWV1ZS5pblNlcXVlbmNlID0gdHJ1ZTtcbiAgICBmb3IoaSA9IDA7IGkgPCBxdWV1ZU9iai51bmRvLmNhbGxzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHF1ZXVlLnBsb3REbyhnZCwgcXVldWVPYmoudW5kby5jYWxsc1tpXSwgcXVldWVPYmoudW5kby5hcmdzW2ldKTtcbiAgICB9XG4gICAgZ2QudW5kb1F1ZXVlLmluU2VxdWVuY2UgPSBmYWxzZTtcbiAgICBnZC5hdXRvcGxheSA9IGZhbHNlO1xufTtcblxuLyoqXG4gKiBSZWRvIHRoZSBjdXJyZW50IG9iamVjdCBpbiB0aGUgdW5kbywgdGhlbiBtb3ZlIGZvcndhcmQgaW4gdGhlIHF1ZXVlLlxuICpcbiAqIEBwYXJhbSBnZFxuICovXG5xdWV1ZS5yZWRvID0gZnVuY3Rpb24gcmVkbyhnZCkge1xuICAgIHZhciBxdWV1ZU9iaiwgaTtcblxuICAgIGlmKGdkLmZyYW1ld29yayAmJiBnZC5mcmFtZXdvcmsuaXNQb2xhcikge1xuICAgICAgICBnZC5mcmFtZXdvcmsucmVkbygpO1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmKGdkLnVuZG9RdWV1ZSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBpc05hTihnZC51bmRvUXVldWUuaW5kZXgpIHx8XG4gICAgICAgICAgICBnZC51bmRvUXVldWUuaW5kZXggPj0gZ2QudW5kb1F1ZXVlLnF1ZXVlLmxlbmd0aCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBxdWV1ZU9iaiBmb3IgaW5zdHJ1Y3Rpb25zIG9uIGhvdyB0byB1bmRvXG4gICAgcXVldWVPYmogPSBnZC51bmRvUXVldWUucXVldWVbZ2QudW5kb1F1ZXVlLmluZGV4XTtcblxuICAgIC8vIHRoaXMgc2VxdWVuY2Uga2VlcHMgdGhpbmdzIGZyb20gYWRkaW5nIHRvIHRoZSBxdWV1ZSBkdXJpbmcgdW5kby9yZWRvXG4gICAgZ2QudW5kb1F1ZXVlLmluU2VxdWVuY2UgPSB0cnVlO1xuICAgIGZvcihpID0gMDsgaSA8IHF1ZXVlT2JqLnJlZG8uY2FsbHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcXVldWUucGxvdERvKGdkLCBxdWV1ZU9iai5yZWRvLmNhbGxzW2ldLCBxdWV1ZU9iai5yZWRvLmFyZ3NbaV0pO1xuICAgIH1cbiAgICBnZC51bmRvUXVldWUuaW5TZXF1ZW5jZSA9IGZhbHNlO1xuICAgIGdkLmF1dG9wbGF5ID0gZmFsc2U7XG5cbiAgICAvLyBpbmRleCBpcyBwb2ludGluZyB0byB0aGUgdGhpbmcgd2UganVzdCByZWRpZCwgbW92ZSBpdFxuICAgIGdkLnVuZG9RdWV1ZS5pbmRleCsrO1xufTtcblxuLyoqXG4gKiBDYWxsZWQgYnkgdW5kby9yZWRvIHRvIG1ha2UgdGhlIGFjdHVhbCBjaGFuZ2VzLlxuICpcbiAqIE5vdCBtZWFudCB0byBiZSBjYWxsZWQgcHVibGljYWxseSwgYnV0IGluY2x1ZGVkIGZvciBtb2NraW5nIG91dCBpbiB0ZXN0cy5cbiAqXG4gKiBAcGFyYW0gZ2RcbiAqIEBwYXJhbSBmdW5jXG4gKiBAcGFyYW0gYXJnc1xuICovXG5xdWV1ZS5wbG90RG8gPSBmdW5jdGlvbihnZCwgZnVuYywgYXJncykge1xuICAgIGdkLmF1dG9wbGF5ID0gdHJ1ZTtcblxuICAgIC8vIHRoaXMgKndvbid0KiBjb3B5IGdkIGFuZCBpdCBwcmVzZXJ2ZXMgYHVuZGVmaW5lZGAgcHJvcGVydGllcyFcbiAgICBhcmdzID0gY29weUFyZ0FycmF5KGdkLCBhcmdzKTtcblxuICAgIC8vIGNhbGwgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uXG4gICAgZnVuYy5hcHBseShudWxsLCBhcmdzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gcXVldWU7XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vcmVnaXN0cnknKTtcblxuLypcbiAqIGNvbnRhaW5lckFycmF5TWF0Y2g6IGRvZXMgdGhpcyBhdHRyaWJ1dGUgc3RyaW5nIHBvaW50IGludG8gYVxuICogbGF5b3V0IGNvbnRhaW5lciBhcnJheT9cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gYXN0cjogYW4gYXR0cmlidXRlIHN0cmluZywgbGlrZSAqYW5ub3RhdGlvbnNbMl0udGV4dCpcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0IHwgZmFsc2V9IFJldHVybnMgZmFsc2UgaWYgYGFzdHJgIGRvZXNuJ3QgbWF0Y2ggYSBjb250YWluZXJcbiAqICBhcnJheS4gSWYgaXQgZG9lcywgcmV0dXJuczpcbiAqICAgICB7YXJyYXk6IHtTdHJpbmd9LCBpbmRleDoge051bWJlcn0sIHByb3BlcnR5OiB7U3RyaW5nfX1cbiAqICBpZSB0aGUgYXR0cmlidXRlIHN0cmluZyBmb3IgdGhlIGFycmF5LCB0aGUgaW5kZXggd2l0aGluIHRoZSBhcnJheSAob3IgJydcbiAqICBpZiB0aGUgd2hvbGUgYXJyYXkpIGFuZCB0aGUgcHJvcGVydHkgd2l0aGluIHRoYXQgKG9yICcnIGlmIHRoZSB3aG9sZSBhcnJheVxuICogIG9yIHRoZSB3aG9sZSBvYmplY3QpXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gY29udGFpbmVyQXJyYXlNYXRjaChhc3RyKSB7XG4gICAgdmFyIHJvb3RDb250YWluZXJzID0gUmVnaXN0cnkubGF5b3V0QXJyYXlDb250YWluZXJzO1xuICAgIHZhciByZWdleHBDb250YWluZXJzID0gUmVnaXN0cnkubGF5b3V0QXJyYXlSZWdleGVzO1xuICAgIHZhciByb290UGFydCA9IGFzdHIuc3BsaXQoJ1snKVswXTtcbiAgICB2YXIgYXJyYXlTdHI7XG4gICAgdmFyIG1hdGNoO1xuXG4gICAgLy8gbG9vayBmb3IgcmVnZXhwIG1hdGNoZXMgZmlyc3QsIGJlY2F1c2UgdGhleSBtYXkgYmUgbmVzdGVkIGluc2lkZSByb290IG1hdGNoZXNcbiAgICAvLyBlZyB1cGRhdGVtZW51c1tpXS5idXR0b25zIGlzIG5lc3RlZCBpbnNpZGUgdXBkYXRlbWVudXNcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgcmVnZXhwQ29udGFpbmVycy5sZW5ndGg7IGkrKykge1xuICAgICAgICBtYXRjaCA9IGFzdHIubWF0Y2gocmVnZXhwQ29udGFpbmVyc1tpXSk7XG4gICAgICAgIGlmKG1hdGNoICYmIG1hdGNoLmluZGV4ID09PSAwKSB7XG4gICAgICAgICAgICBhcnJheVN0ciA9IG1hdGNoWzBdO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBub3cgbG9vayBmb3Igcm9vdCBtYXRjaGVzXG4gICAgaWYoIWFycmF5U3RyKSBhcnJheVN0ciA9IHJvb3RDb250YWluZXJzW3Jvb3RDb250YWluZXJzLmluZGV4T2Yocm9vdFBhcnQpXTtcblxuICAgIGlmKCFhcnJheVN0cikgcmV0dXJuIGZhbHNlO1xuXG4gICAgdmFyIHRhaWwgPSBhc3RyLnN1YnN0cihhcnJheVN0ci5sZW5ndGgpO1xuICAgIGlmKCF0YWlsKSByZXR1cm4ge2FycmF5OiBhcnJheVN0ciwgaW5kZXg6ICcnLCBwcm9wZXJ0eTogJyd9O1xuXG4gICAgbWF0Y2ggPSB0YWlsLm1hdGNoKC9eXFxbKDB8WzEtOV1bMC05XSopXFxdKFxcLiguKykpPyQvKTtcbiAgICBpZighbWF0Y2gpIHJldHVybiBmYWxzZTtcblxuICAgIHJldHVybiB7YXJyYXk6IGFycmF5U3RyLCBpbmRleDogTnVtYmVyKG1hdGNoWzFdKSwgcHJvcGVydHk6IG1hdGNoWzNdIHx8ICcnfTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIG00RnJvbVF1YXQgPSByZXF1aXJlKCdnbC1tYXQ0L2Zyb21RdWF0Jyk7XG5cbnZhciBSZWdpc3RyeSA9IHJlcXVpcmUoJy4uL3JlZ2lzdHJ5Jyk7XG52YXIgTGliID0gcmVxdWlyZSgnLi4vbGliJyk7XG52YXIgUGxvdHMgPSByZXF1aXJlKCcuLi9wbG90cy9wbG90cycpO1xudmFyIEF4aXNJZHMgPSByZXF1aXJlKCcuLi9wbG90cy9jYXJ0ZXNpYW4vYXhpc19pZHMnKTtcbnZhciBDb2xvciA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMvY29sb3InKTtcblxudmFyIGNsZWFuSWQgPSBBeGlzSWRzLmNsZWFuSWQ7XG52YXIgZ2V0RnJvbVRyYWNlID0gQXhpc0lkcy5nZXRGcm9tVHJhY2U7XG52YXIgdHJhY2VJcyA9IFJlZ2lzdHJ5LnRyYWNlSXM7XG5cbi8vIGNsZWFyIHRoZSBwcm9taXNlIHF1ZXVlIGlmIG9uZSBvZiB0aGVtIGdvdCByZWplY3RlZFxuZXhwb3J0cy5jbGVhclByb21pc2VRdWV1ZSA9IGZ1bmN0aW9uKGdkKSB7XG4gICAgaWYoQXJyYXkuaXNBcnJheShnZC5fcHJvbWlzZXMpICYmIGdkLl9wcm9taXNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIExpYi5sb2coJ0NsZWFyaW5nIHByZXZpb3VzIHJlamVjdGVkIHByb21pc2VzIGZyb20gcXVldWUuJyk7XG4gICAgfVxuXG4gICAgZ2QuX3Byb21pc2VzID0gW107XG59O1xuXG4vLyBtYWtlIGEgZmV3IGNoYW5nZXMgdG8gdGhlIGxheW91dCByaWdodCBhd2F5XG4vLyBiZWZvcmUgaXQgZ2V0cyB1c2VkIGZvciBhbnl0aGluZ1xuLy8gYmFja3dhcmQgY29tcGF0aWJpbGl0eSBhbmQgY2xlYW51cCBvZiBub25zdGFuZGFyZCBvcHRpb25zXG5leHBvcnRzLmNsZWFuTGF5b3V0ID0gZnVuY3Rpb24obGF5b3V0KSB7XG4gICAgdmFyIGksIGo7XG5cbiAgICBpZighbGF5b3V0KSBsYXlvdXQgPSB7fTtcblxuICAgIC8vIGNhbm5vdCBoYXZlICh4fHkpYXhpczEsIG51bWJlcmluZyBnb2VzIGF4aXMsIGF4aXMyLCBheGlzMy4uLlxuICAgIGlmKGxheW91dC54YXhpczEpIHtcbiAgICAgICAgaWYoIWxheW91dC54YXhpcykgbGF5b3V0LnhheGlzID0gbGF5b3V0LnhheGlzMTtcbiAgICAgICAgZGVsZXRlIGxheW91dC54YXhpczE7XG4gICAgfVxuICAgIGlmKGxheW91dC55YXhpczEpIHtcbiAgICAgICAgaWYoIWxheW91dC55YXhpcykgbGF5b3V0LnlheGlzID0gbGF5b3V0LnlheGlzMTtcbiAgICAgICAgZGVsZXRlIGxheW91dC55YXhpczE7XG4gICAgfVxuICAgIGlmKGxheW91dC5zY2VuZTEpIHtcbiAgICAgICAgaWYoIWxheW91dC5zY2VuZSkgbGF5b3V0LnNjZW5lID0gbGF5b3V0LnNjZW5lMTtcbiAgICAgICAgZGVsZXRlIGxheW91dC5zY2VuZTE7XG4gICAgfVxuXG4gICAgdmFyIGF4aXNBdHRyUmVnZXggPSAoUGxvdHMuc3VicGxvdHNSZWdpc3RyeS5jYXJ0ZXNpYW4gfHwge30pLmF0dHJSZWdleDtcbiAgICB2YXIgcG9sYXJBdHRyUmVnZXggPSAoUGxvdHMuc3VicGxvdHNSZWdpc3RyeS5wb2xhciB8fCB7fSkuYXR0clJlZ2V4O1xuICAgIHZhciB0ZXJuYXJ5QXR0clJlZ2V4ID0gKFBsb3RzLnN1YnBsb3RzUmVnaXN0cnkudGVybmFyeSB8fCB7fSkuYXR0clJlZ2V4O1xuICAgIHZhciBzY2VuZUF0dHJSZWdleCA9IChQbG90cy5zdWJwbG90c1JlZ2lzdHJ5LmdsM2QgfHwge30pLmF0dHJSZWdleDtcblxuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMobGF5b3V0KTtcbiAgICBmb3IoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBrZXkgPSBrZXlzW2ldO1xuXG4gICAgICAgIGlmKGF4aXNBdHRyUmVnZXggJiYgYXhpc0F0dHJSZWdleC50ZXN0KGtleSkpIHtcbiAgICAgICAgICAgIC8vIG1vZGlmaWNhdGlvbnMgdG8gY2FydGVzaWFuIGF4ZXNcblxuICAgICAgICAgICAgdmFyIGF4ID0gbGF5b3V0W2tleV07XG4gICAgICAgICAgICBpZihheC5hbmNob3IgJiYgYXguYW5jaG9yICE9PSAnZnJlZScpIHtcbiAgICAgICAgICAgICAgICBheC5hbmNob3IgPSBjbGVhbklkKGF4LmFuY2hvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihheC5vdmVybGF5aW5nKSBheC5vdmVybGF5aW5nID0gY2xlYW5JZChheC5vdmVybGF5aW5nKTtcblxuICAgICAgICAgICAgLy8gb2xkIG1ldGhvZCBvZiBheGlzIHR5cGUgLSBpc2RhdGUgYW5kIGlzbG9nIChiZWZvcmUgY2F0ZWdvcnkgZXhpc3RlZClcbiAgICAgICAgICAgIGlmKCFheC50eXBlKSB7XG4gICAgICAgICAgICAgICAgaWYoYXguaXNkYXRlKSBheC50eXBlID0gJ2RhdGUnO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYoYXguaXNsb2cpIGF4LnR5cGUgPSAnbG9nJztcbiAgICAgICAgICAgICAgICBlbHNlIGlmKGF4LmlzZGF0ZSA9PT0gZmFsc2UgJiYgYXguaXNsb2cgPT09IGZhbHNlKSBheC50eXBlID0gJ2xpbmVhcic7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZihheC5hdXRvcmFuZ2UgPT09ICd3aXRoemVybycgfHwgYXguYXV0b3JhbmdlID09PSAndG96ZXJvJykge1xuICAgICAgICAgICAgICAgIGF4LmF1dG9yYW5nZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgYXgucmFuZ2Vtb2RlID0gJ3RvemVybyc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkZWxldGUgYXguaXNsb2c7XG4gICAgICAgICAgICBkZWxldGUgYXguaXNkYXRlO1xuICAgICAgICAgICAgZGVsZXRlIGF4LmNhdGVnb3JpZXM7IC8vIHJlcGxhY2VkIGJ5IF9jYXRlZ29yaWVzXG5cbiAgICAgICAgICAgIC8vIHBydW5lIGVtcHR5IGRvbWFpbiBhcnJheXMgbWFkZSBiZWZvcmUgdGhlIG5ldyBuZXN0ZWRQcm9wZXJ0eVxuICAgICAgICAgICAgaWYoZW1wdHlDb250YWluZXIoYXgsICdkb21haW4nKSkgZGVsZXRlIGF4LmRvbWFpbjtcblxuICAgICAgICAgICAgLy8gYXV0b3RpY2sgLT4gdGlja21vZGVcbiAgICAgICAgICAgIGlmKGF4LmF1dG90aWNrICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBpZihheC50aWNrbW9kZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIGF4LnRpY2ttb2RlID0gYXguYXV0b3RpY2sgPyAnYXV0bycgOiAnbGluZWFyJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZGVsZXRlIGF4LmF1dG90aWNrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbGVhblRpdGxlKGF4KTtcbiAgICAgICAgfSBlbHNlIGlmKHBvbGFyQXR0clJlZ2V4ICYmIHBvbGFyQXR0clJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgLy8gbW9kaWZpY2F0aW9ucyBmb3IgcG9sYXJcblxuICAgICAgICAgICAgdmFyIHBvbGFyID0gbGF5b3V0W2tleV07XG4gICAgICAgICAgICBjbGVhblRpdGxlKHBvbGFyLnJhZGlhbGF4aXMpO1xuICAgICAgICB9IGVsc2UgaWYodGVybmFyeUF0dHJSZWdleCAmJiB0ZXJuYXJ5QXR0clJlZ2V4LnRlc3Qoa2V5KSkge1xuICAgICAgICAgICAgLy8gbW9kaWZpY2F0aW9ucyBmb3IgdGVybmFyeVxuXG4gICAgICAgICAgICB2YXIgdGVybmFyeSA9IGxheW91dFtrZXldO1xuICAgICAgICAgICAgY2xlYW5UaXRsZSh0ZXJuYXJ5LmFheGlzKTtcbiAgICAgICAgICAgIGNsZWFuVGl0bGUodGVybmFyeS5iYXhpcyk7XG4gICAgICAgICAgICBjbGVhblRpdGxlKHRlcm5hcnkuY2F4aXMpO1xuICAgICAgICB9IGVsc2UgaWYoc2NlbmVBdHRyUmVnZXggJiYgc2NlbmVBdHRyUmVnZXgudGVzdChrZXkpKSB7XG4gICAgICAgICAgICAvLyBtb2RpZmljYXRpb25zIGZvciAzRCBzY2VuZXNcblxuICAgICAgICAgICAgdmFyIHNjZW5lID0gbGF5b3V0W2tleV07XG5cbiAgICAgICAgICAgIC8vIGNsZWFuIG9sZCBDYW1lcmEgY29vcmRzXG4gICAgICAgICAgICB2YXIgY2FtZXJhcG9zaXRpb24gPSBzY2VuZS5jYW1lcmFwb3NpdGlvbjtcblxuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheShjYW1lcmFwb3NpdGlvbikgJiYgY2FtZXJhcG9zaXRpb25bMF0ubGVuZ3RoID09PSA0KSB7XG4gICAgICAgICAgICAgICAgdmFyIHJvdGF0aW9uID0gY2FtZXJhcG9zaXRpb25bMF07XG4gICAgICAgICAgICAgICAgdmFyIGNlbnRlciA9IGNhbWVyYXBvc2l0aW9uWzFdO1xuICAgICAgICAgICAgICAgIHZhciByYWRpdXMgPSBjYW1lcmFwb3NpdGlvblsyXTtcbiAgICAgICAgICAgICAgICB2YXIgbWF0ID0gbTRGcm9tUXVhdChbXSwgcm90YXRpb24pO1xuICAgICAgICAgICAgICAgIHZhciBleWUgPSBbXTtcblxuICAgICAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IDM7ICsraikge1xuICAgICAgICAgICAgICAgICAgICBleWVbal0gPSBjZW50ZXJbal0gKyByYWRpdXMgKiBtYXRbMiArIDQgKiBqXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBzY2VuZS5jYW1lcmEgPSB7XG4gICAgICAgICAgICAgICAgICAgIGV5ZToge3g6IGV5ZVswXSwgeTogZXllWzFdLCB6OiBleWVbMl19LFxuICAgICAgICAgICAgICAgICAgICBjZW50ZXI6IHt4OiBjZW50ZXJbMF0sIHk6IGNlbnRlclsxXSwgejogY2VudGVyWzJdfSxcbiAgICAgICAgICAgICAgICAgICAgdXA6IHt4OiAwLCB5OiAwLCB6OiAxfSAvLyB3ZSBqdXN0IGlnbm9yZSBjYWxjdWxhdGluZyBjYW1lcmEgeiB1cCBpbiB0aGlzIGNhc2VcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgZGVsZXRlIHNjZW5lLmNhbWVyYXBvc2l0aW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBjbGVhbiBheGlzIHRpdGxlc1xuICAgICAgICAgICAgY2xlYW5UaXRsZShzY2VuZS54YXhpcyk7XG4gICAgICAgICAgICBjbGVhblRpdGxlKHNjZW5lLnlheGlzKTtcbiAgICAgICAgICAgIGNsZWFuVGl0bGUoc2NlbmUuemF4aXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGFubm90YXRpb25zTGVuID0gQXJyYXkuaXNBcnJheShsYXlvdXQuYW5ub3RhdGlvbnMpID8gbGF5b3V0LmFubm90YXRpb25zLmxlbmd0aCA6IDA7XG4gICAgZm9yKGkgPSAwOyBpIDwgYW5ub3RhdGlvbnNMZW47IGkrKykge1xuICAgICAgICB2YXIgYW5uID0gbGF5b3V0LmFubm90YXRpb25zW2ldO1xuXG4gICAgICAgIGlmKCFMaWIuaXNQbGFpbk9iamVjdChhbm4pKSBjb250aW51ZTtcblxuICAgICAgICBpZihhbm4ucmVmKSB7XG4gICAgICAgICAgICBpZihhbm4ucmVmID09PSAncGFwZXInKSB7XG4gICAgICAgICAgICAgICAgYW5uLnhyZWYgPSAncGFwZXInO1xuICAgICAgICAgICAgICAgIGFubi55cmVmID0gJ3BhcGVyJztcbiAgICAgICAgICAgIH0gZWxzZSBpZihhbm4ucmVmID09PSAnZGF0YScpIHtcbiAgICAgICAgICAgICAgICBhbm4ueHJlZiA9ICd4JztcbiAgICAgICAgICAgICAgICBhbm4ueXJlZiA9ICd5JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZSBhbm4ucmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgY2xlYW5BeFJlZihhbm4sICd4cmVmJyk7XG4gICAgICAgIGNsZWFuQXhSZWYoYW5uLCAneXJlZicpO1xuICAgIH1cblxuICAgIHZhciBzaGFwZXNMZW4gPSBBcnJheS5pc0FycmF5KGxheW91dC5zaGFwZXMpID8gbGF5b3V0LnNoYXBlcy5sZW5ndGggOiAwO1xuICAgIGZvcihpID0gMDsgaSA8IHNoYXBlc0xlbjsgaSsrKSB7XG4gICAgICAgIHZhciBzaGFwZSA9IGxheW91dC5zaGFwZXNbaV07XG5cbiAgICAgICAgaWYoIUxpYi5pc1BsYWluT2JqZWN0KHNoYXBlKSkgY29udGludWU7XG5cbiAgICAgICAgY2xlYW5BeFJlZihzaGFwZSwgJ3hyZWYnKTtcbiAgICAgICAgY2xlYW5BeFJlZihzaGFwZSwgJ3lyZWYnKTtcbiAgICB9XG5cbiAgICB2YXIgbGVnZW5kID0gbGF5b3V0LmxlZ2VuZDtcbiAgICBpZihsZWdlbmQpIHtcbiAgICAgICAgLy8gY2hlY2sgZm9yIG9sZC1zdHlsZSBsZWdlbmQgcG9zaXRpb25pbmcgKHggb3IgeSBpcyArLy0gMTAwKVxuICAgICAgICBpZihsZWdlbmQueCA+IDMpIHtcbiAgICAgICAgICAgIGxlZ2VuZC54ID0gMS4wMjtcbiAgICAgICAgICAgIGxlZ2VuZC54YW5jaG9yID0gJ2xlZnQnO1xuICAgICAgICB9IGVsc2UgaWYobGVnZW5kLnggPCAtMikge1xuICAgICAgICAgICAgbGVnZW5kLnggPSAtMC4wMjtcbiAgICAgICAgICAgIGxlZ2VuZC54YW5jaG9yID0gJ3JpZ2h0JztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGxlZ2VuZC55ID4gMykge1xuICAgICAgICAgICAgbGVnZW5kLnkgPSAxLjAyO1xuICAgICAgICAgICAgbGVnZW5kLnlhbmNob3IgPSAnYm90dG9tJztcbiAgICAgICAgfSBlbHNlIGlmKGxlZ2VuZC55IDwgLTIpIHtcbiAgICAgICAgICAgIGxlZ2VuZC55ID0gLTAuMDI7XG4gICAgICAgICAgICBsZWdlbmQueWFuY2hvciA9ICd0b3AnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gY2xlYW4gcGxvdCB0aXRsZVxuICAgIGNsZWFuVGl0bGUobGF5b3V0KTtcblxuICAgIC8qXG4gICAgICogTW92ZWQgZnJvbSByb3RhdGUgLT4gb3JiaXQgZm9yIGRyYWdtb2RlXG4gICAgICovXG4gICAgaWYobGF5b3V0LmRyYWdtb2RlID09PSAncm90YXRlJykgbGF5b3V0LmRyYWdtb2RlID0gJ29yYml0JztcblxuICAgIC8vIHNhbml0aXplIHJnYihmcmFjdGlvbnMpIGFuZCByZ2JhKGZyYWN0aW9ucykgdGhhdCBvbGQgdGlueWNvbG9yXG4gICAgLy8gc3VwcG9ydGVkLCBidXQgbmV3IHRpbnljb2xvciBkb2VzIG5vdCBiZWNhdXNlIHRoZXkncmUgbm90IHZhbGlkIGNzc1xuICAgIENvbG9yLmNsZWFuKGxheW91dCk7XG5cbiAgICAvLyBjbGVhbiB0aGUgbGF5b3V0IGNvbnRhaW5lciBpbiBsYXlvdXQudGVtcGxhdGVcbiAgICBpZihsYXlvdXQudGVtcGxhdGUgJiYgbGF5b3V0LnRlbXBsYXRlLmxheW91dCkge1xuICAgICAgICBleHBvcnRzLmNsZWFuTGF5b3V0KGxheW91dC50ZW1wbGF0ZS5sYXlvdXQpO1xuICAgIH1cblxuICAgIHJldHVybiBsYXlvdXQ7XG59O1xuXG5mdW5jdGlvbiBjbGVhbkF4UmVmKGNvbnRhaW5lciwgYXR0cikge1xuICAgIHZhciB2YWxJbiA9IGNvbnRhaW5lclthdHRyXTtcbiAgICB2YXIgYXhMZXR0ZXIgPSBhdHRyLmNoYXJBdCgwKTtcbiAgICBpZih2YWxJbiAmJiB2YWxJbiAhPT0gJ3BhcGVyJykge1xuICAgICAgICBjb250YWluZXJbYXR0cl0gPSBjbGVhbklkKHZhbEluLCBheExldHRlcik7XG4gICAgfVxufVxuXG4vKipcbiAqIENsZWFucyB1cCBvbGQgdGl0bGUgYXR0cmlidXRlIHN0cnVjdHVyZSAoZmxhdCkgaW4gZmF2b3Igb2YgdGhlIG5ldyBvbmUgKG5lc3RlZCkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHRpdGxlQ29udGFpbmVyIC0gYW4gb2JqZWN0IHBvdGVudGlhbGx5IGluY2x1ZGluZyBkZXByZWNhdGVkIHRpdGxlIGF0dHJpYnV0ZXNcbiAqL1xuZnVuY3Rpb24gY2xlYW5UaXRsZSh0aXRsZUNvbnRhaW5lcikge1xuICAgIGlmKHRpdGxlQ29udGFpbmVyKSB7XG4gICAgICAgIC8vIHRpdGxlIC0+IHRpdGxlLnRleHRcbiAgICAgICAgLy8gKGFsdGhvdWdoIHRpdGxlIHVzZWQgdG8gYmUgYSBzdHJpbmcgYXR0cmlidXRlLFxuICAgICAgICAvLyBudW1iZXJzIGFyZSBhY2NlcHRlZCBhcyB3ZWxsKVxuICAgICAgICBpZih0eXBlb2YgdGl0bGVDb250YWluZXIudGl0bGUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB0aXRsZUNvbnRhaW5lci50aXRsZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHRpdGxlQ29udGFpbmVyLnRpdGxlID0ge1xuICAgICAgICAgICAgICAgIHRleHQ6IHRpdGxlQ29udGFpbmVyLnRpdGxlXG4gICAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgcmV3aXJlQXR0cigndGl0bGVmb250JywgJ2ZvbnQnKTtcbiAgICAgICAgcmV3aXJlQXR0cigndGl0bGVwb3NpdGlvbicsICdwb3NpdGlvbicpO1xuICAgICAgICByZXdpcmVBdHRyKCd0aXRsZXNpZGUnLCAnc2lkZScpO1xuICAgICAgICByZXdpcmVBdHRyKCd0aXRsZW9mZnNldCcsICdvZmZzZXQnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXdpcmVBdHRyKG9sZEF0dHJOYW1lLCBuZXdBdHRyTmFtZSkge1xuICAgICAgICB2YXIgb2xkQXR0clNldCA9IHRpdGxlQ29udGFpbmVyW29sZEF0dHJOYW1lXTtcbiAgICAgICAgdmFyIG5ld0F0dHJTZXQgPSB0aXRsZUNvbnRhaW5lci50aXRsZSAmJiB0aXRsZUNvbnRhaW5lci50aXRsZVtuZXdBdHRyTmFtZV07XG5cbiAgICAgICAgaWYob2xkQXR0clNldCAmJiAhbmV3QXR0clNldCkge1xuICAgICAgICAgICAgLy8gRW5zdXJlIHRpdGxlIG9iamVjdCBleGlzdHNcbiAgICAgICAgICAgIGlmKCF0aXRsZUNvbnRhaW5lci50aXRsZSkge1xuICAgICAgICAgICAgICAgIHRpdGxlQ29udGFpbmVyLnRpdGxlID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRpdGxlQ29udGFpbmVyLnRpdGxlW25ld0F0dHJOYW1lXSA9IHRpdGxlQ29udGFpbmVyW29sZEF0dHJOYW1lXTtcbiAgICAgICAgICAgIGRlbGV0ZSB0aXRsZUNvbnRhaW5lcltvbGRBdHRyTmFtZV07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qXG4gKiBjbGVhbkRhdGE6IE1ha2UgYSBmZXcgY2hhbmdlcyB0byB0aGUgZGF0YSBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuICogYmVmb3JlIGl0IGdldHMgdXNlZCBmb3IgYW55dGhpbmcuIE1vZGlmaWVzIHRoZSBkYXRhIHRyYWNlcyB1c2VycyBwcm92aWRlLlxuICpcbiAqIEltcG9ydGFudDogaWYgeW91J3JlIGdvaW5nIHRvIGFkZCBzb21ldGhpbmcgaGVyZSB0aGF0IG1vZGlmaWVzIGEgZGF0YSBhcnJheSxcbiAqIHVwZGF0ZSBpdCBpbiBwbGFjZSBzbyB0aGUgbmV3IGFycmF5ID09PSB0aGUgb2xkIG9uZS5cbiAqL1xuZXhwb3J0cy5jbGVhbkRhdGEgPSBmdW5jdGlvbihkYXRhKSB7XG4gICAgZm9yKHZhciB0cmFjZWkgPSAwOyB0cmFjZWkgPCBkYXRhLmxlbmd0aDsgdHJhY2VpKyspIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZGF0YVt0cmFjZWldO1xuICAgICAgICB2YXIgaTtcblxuICAgICAgICAvLyB1c2UgeGJpbnMgdG8gYmluIGRhdGEgaW4geCwgYW5kIHliaW5zIHRvIGJpbiBkYXRhIGluIHlcbiAgICAgICAgaWYodHJhY2UudHlwZSA9PT0gJ2hpc3RvZ3JhbXknICYmICd4YmlucycgaW4gdHJhY2UgJiYgISgneWJpbnMnIGluIHRyYWNlKSkge1xuICAgICAgICAgICAgdHJhY2UueWJpbnMgPSB0cmFjZS54YmlucztcbiAgICAgICAgICAgIGRlbGV0ZSB0cmFjZS54YmlucztcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGVycm9yX3kub3BhY2l0eSBpcyBvYnNvbGV0ZSAtIG1lcmdlIGludG8gY29sb3JcbiAgICAgICAgaWYodHJhY2UuZXJyb3JfeSAmJiAnb3BhY2l0eScgaW4gdHJhY2UuZXJyb3JfeSkge1xuICAgICAgICAgICAgdmFyIGRjID0gQ29sb3IuZGVmYXVsdHM7XG4gICAgICAgICAgICB2YXIgeWVDb2xvciA9IHRyYWNlLmVycm9yX3kuY29sb3IgfHwgKHRyYWNlSXModHJhY2UsICdiYXInKSA/XG4gICAgICAgICAgICAgICAgQ29sb3IuZGVmYXVsdExpbmUgOlxuICAgICAgICAgICAgICAgIGRjW3RyYWNlaSAlIGRjLmxlbmd0aF0pO1xuICAgICAgICAgICAgdHJhY2UuZXJyb3JfeS5jb2xvciA9IENvbG9yLmFkZE9wYWNpdHkoXG4gICAgICAgICAgICAgICAgQ29sb3IucmdiKHllQ29sb3IpLFxuICAgICAgICAgICAgICAgIENvbG9yLm9wYWNpdHkoeWVDb2xvcikgKiB0cmFjZS5lcnJvcl95Lm9wYWNpdHkpO1xuICAgICAgICAgICAgZGVsZXRlIHRyYWNlLmVycm9yX3kub3BhY2l0eTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNvbnZlcnQgYmFyZGlyIHRvIG9yaWVudGF0aW9uLCBhbmQgcHV0IHRoZSBkYXRhIGludG9cbiAgICAgICAgLy8gdGhlIGF4ZXMgaXQncyBldmVudHVhbGx5IGdvaW5nIHRvIGJlIHVzZWQgd2l0aFxuICAgICAgICBpZignYmFyZGlyJyBpbiB0cmFjZSkge1xuICAgICAgICAgICAgaWYodHJhY2UuYmFyZGlyID09PSAnaCcgJiYgKHRyYWNlSXModHJhY2UsICdiYXInKSB8fFxuICAgICAgICAgICAgICAgIHRyYWNlLnR5cGUuc3Vic3RyKDAsIDkpID09PSAnaGlzdG9ncmFtJykpIHtcbiAgICAgICAgICAgICAgICB0cmFjZS5vcmllbnRhdGlvbiA9ICdoJztcbiAgICAgICAgICAgICAgICBleHBvcnRzLnN3YXBYWURhdGEodHJhY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHRyYWNlLmJhcmRpcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdyB3ZSBoYXZlIG9ubHkgb25lIDFEIGhpc3RvZ3JhbSB0eXBlLCBhbmQgd2hldGhlclxuICAgICAgICAvLyBpdCB1c2VzIHggb3IgeSBkYXRhIGRlcGVuZHMgb24gdHJhY2Uub3JpZW50YXRpb25cbiAgICAgICAgaWYodHJhY2UudHlwZSA9PT0gJ2hpc3RvZ3JhbXknKSBleHBvcnRzLnN3YXBYWURhdGEodHJhY2UpO1xuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnaGlzdG9ncmFteCcgfHwgdHJhY2UudHlwZSA9PT0gJ2hpc3RvZ3JhbXknKSB7XG4gICAgICAgICAgICB0cmFjZS50eXBlID0gJ2hpc3RvZ3JhbSc7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzY2wtPnNjYWxlLCByZXZlcnNlc2NsLT5yZXZlcnNlc2NhbGVcbiAgICAgICAgaWYoJ3NjbCcgaW4gdHJhY2UgJiYgISgnY29sb3JzY2FsZScgaW4gdHJhY2UpKSB7XG4gICAgICAgICAgICB0cmFjZS5jb2xvcnNjYWxlID0gdHJhY2Uuc2NsO1xuICAgICAgICAgICAgZGVsZXRlIHRyYWNlLnNjbDtcbiAgICAgICAgfVxuICAgICAgICBpZigncmV2ZXJzZXNjbCcgaW4gdHJhY2UgJiYgISgncmV2ZXJzZXNjYWxlJyBpbiB0cmFjZSkpIHtcbiAgICAgICAgICAgIHRyYWNlLnJldmVyc2VzY2FsZSA9IHRyYWNlLnJldmVyc2VzY2w7XG4gICAgICAgICAgICBkZWxldGUgdHJhY2UucmV2ZXJzZXNjbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGF4aXMgaWRzIHgxIC0+IHgsIHkxLT4geVxuICAgICAgICBpZih0cmFjZS54YXhpcykgdHJhY2UueGF4aXMgPSBjbGVhbklkKHRyYWNlLnhheGlzLCAneCcpO1xuICAgICAgICBpZih0cmFjZS55YXhpcykgdHJhY2UueWF4aXMgPSBjbGVhbklkKHRyYWNlLnlheGlzLCAneScpO1xuXG4gICAgICAgIC8vIHNjZW5lIGlkcyBzY2VuZTEgLT4gc2NlbmVcbiAgICAgICAgaWYodHJhY2VJcyh0cmFjZSwgJ2dsM2QnKSAmJiB0cmFjZS5zY2VuZSkge1xuICAgICAgICAgICAgdHJhY2Uuc2NlbmUgPSBQbG90cy5zdWJwbG90c1JlZ2lzdHJ5LmdsM2QuY2xlYW5JZCh0cmFjZS5zY2VuZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZighdHJhY2VJcyh0cmFjZSwgJ3BpZS1saWtlJykgJiYgIXRyYWNlSXModHJhY2UsICdiYXItbGlrZScpKSB7XG4gICAgICAgICAgICBpZihBcnJheS5pc0FycmF5KHRyYWNlLnRleHRwb3NpdGlvbikpIHtcbiAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0cmFjZS50ZXh0cG9zaXRpb24ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgdHJhY2UudGV4dHBvc2l0aW9uW2ldID0gY2xlYW5UZXh0UG9zaXRpb24odHJhY2UudGV4dHBvc2l0aW9uW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYodHJhY2UudGV4dHBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgdHJhY2UudGV4dHBvc2l0aW9uID0gY2xlYW5UZXh0UG9zaXRpb24odHJhY2UudGV4dHBvc2l0aW9uKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpeCB0eXBvIGluIGNvbG9yc2NhbGUgZGVmaW5pdGlvblxuICAgICAgICB2YXIgX21vZHVsZSA9IFJlZ2lzdHJ5LmdldE1vZHVsZSh0cmFjZSk7XG4gICAgICAgIGlmKF9tb2R1bGUgJiYgX21vZHVsZS5jb2xvcmJhcikge1xuICAgICAgICAgICAgdmFyIGNvbnRhaW5lck5hbWUgPSBfbW9kdWxlLmNvbG9yYmFyLmNvbnRhaW5lcjtcbiAgICAgICAgICAgIHZhciBjb250YWluZXIgPSBjb250YWluZXJOYW1lID8gdHJhY2VbY29udGFpbmVyTmFtZV0gOiB0cmFjZTtcbiAgICAgICAgICAgIGlmKGNvbnRhaW5lciAmJiBjb250YWluZXIuY29sb3JzY2FsZSkge1xuICAgICAgICAgICAgICAgIGlmKGNvbnRhaW5lci5jb2xvcnNjYWxlID09PSAnWUlHbkJ1JykgY29udGFpbmVyLmNvbG9yc2NhbGUgPSAnWWxHbkJ1JztcbiAgICAgICAgICAgICAgICBpZihjb250YWluZXIuY29sb3JzY2FsZSA9PT0gJ1lJT3JSZCcpIGNvbnRhaW5lci5jb2xvcnNjYWxlID0gJ1lsT3JSZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBmaXggdHlwbyBpbiBzdXJmYWNlICdoaWdobGlnaHQqJyBkZWZpbml0aW9uc1xuICAgICAgICBpZih0cmFjZS50eXBlID09PSAnc3VyZmFjZScgJiYgTGliLmlzUGxhaW5PYmplY3QodHJhY2UuY29udG91cnMpKSB7XG4gICAgICAgICAgICB2YXIgZGltcyA9IFsneCcsICd5JywgJ3onXTtcblxuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgZGltcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBvcHRzID0gdHJhY2UuY29udG91cnNbZGltc1tpXV07XG5cbiAgICAgICAgICAgICAgICBpZighTGliLmlzUGxhaW5PYmplY3Qob3B0cykpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICAgICAgaWYob3B0cy5oaWdobGlnaHRDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmhpZ2hsaWdodGNvbG9yID0gb3B0cy5oaWdobGlnaHRDb2xvcjtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdHMuaGlnaGxpZ2h0Q29sb3I7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYob3B0cy5oaWdobGlnaHRXaWR0aCkge1xuICAgICAgICAgICAgICAgICAgICBvcHRzLmhpZ2hsaWdodHdpZHRoID0gb3B0cy5oaWdobGlnaHRXaWR0aDtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIG9wdHMuaGlnaGxpZ2h0V2lkdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gZml4ZXMgZnJvbSBjb252ZXJ0aW5nIGZpbmFuY2UgZnJvbSB0cmFuc2Zvcm1zIHRvIHJlYWwgdHJhY2UgdHlwZXNcbiAgICAgICAgaWYodHJhY2UudHlwZSA9PT0gJ2NhbmRsZXN0aWNrJyB8fCB0cmFjZS50eXBlID09PSAnb2hsYycpIHtcbiAgICAgICAgICAgIHZhciBpbmNyZWFzaW5nU2hvd2xlZ2VuZCA9ICh0cmFjZS5pbmNyZWFzaW5nIHx8IHt9KS5zaG93bGVnZW5kICE9PSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBkZWNyZWFzaW5nU2hvd2xlZ2VuZCA9ICh0cmFjZS5kZWNyZWFzaW5nIHx8IHt9KS5zaG93bGVnZW5kICE9PSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBpbmNyZWFzaW5nTmFtZSA9IGNsZWFuRmluYW5jZURpcih0cmFjZS5pbmNyZWFzaW5nKTtcbiAgICAgICAgICAgIHZhciBkZWNyZWFzaW5nTmFtZSA9IGNsZWFuRmluYW5jZURpcih0cmFjZS5kZWNyZWFzaW5nKTtcblxuICAgICAgICAgICAgLy8gbm93IGZpZ3VyZSBvdXQgc29tZXRoaW5nIHNtYXJ0IHRvIGRvIHdpdGggdGhlIHNlcGFyYXRlIGRpcmVjdGlvblxuICAgICAgICAgICAgLy8gbmFtZXMgd2UgcmVtb3ZlZFxuICAgICAgICAgICAgaWYoKGluY3JlYXNpbmdOYW1lICE9PSBmYWxzZSkgJiYgKGRlY3JlYXNpbmdOYW1lICE9PSBmYWxzZSkpIHtcbiAgICAgICAgICAgICAgICAvLyBib3RoIHN1Yi1uYW1lcyBleGlzdGVkOiBiYXNlIG5hbWUgcHJldmlvdXNseSBoYWQgbm8gZWZmZWN0XG4gICAgICAgICAgICAgICAgLy8gc28gaWdub3JlIGl0IGFuZCB0cnkgdG8gZmluZCBhIHNoYXJlZCBwYXJ0IG9mIHRoZSBzdWItbmFtZXNcblxuICAgICAgICAgICAgICAgIHZhciBuZXdOYW1lID0gY29tbW9uUHJlZml4KFxuICAgICAgICAgICAgICAgICAgICBpbmNyZWFzaW5nTmFtZSwgZGVjcmVhc2luZ05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGluY3JlYXNpbmdTaG93bGVnZW5kLCBkZWNyZWFzaW5nU2hvd2xlZ2VuZFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgLy8gaWYgbm8gY29tbW9uIHBhcnQsIGxlYXZlIHdoYXRldmVyIG5hbWUgd2FzIChvciB3YXNuJ3QpIHRoZXJlXG4gICAgICAgICAgICAgICAgaWYobmV3TmFtZSkgdHJhY2UubmFtZSA9IG5ld05hbWU7XG4gICAgICAgICAgICB9IGVsc2UgaWYoKGluY3JlYXNpbmdOYW1lIHx8IGRlY3JlYXNpbmdOYW1lKSAmJiAhdHJhY2UubmFtZSkge1xuICAgICAgICAgICAgICAgIC8vIG9uZSBzdWItbmFtZSBleGlzdGVkIGJ1dCBub3QgdGhlIGJhc2UgbmFtZSAtIGp1c3QgdXNlIHRoZSBzdWItbmFtZVxuICAgICAgICAgICAgICAgIHRyYWNlLm5hbWUgPSBpbmNyZWFzaW5nTmFtZSB8fCBkZWNyZWFzaW5nTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHRyYW5zZm9ybXMgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBmaXhlc1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KHRyYWNlLnRyYW5zZm9ybXMpKSB7XG4gICAgICAgICAgICB2YXIgdHJhbnNmb3JtcyA9IHRyYWNlLnRyYW5zZm9ybXM7XG5cbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IHRyYW5zZm9ybXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhbnNmb3JtID0gdHJhbnNmb3Jtc1tpXTtcblxuICAgICAgICAgICAgICAgIGlmKCFMaWIuaXNQbGFpbk9iamVjdCh0cmFuc2Zvcm0pKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIHN3aXRjaCh0cmFuc2Zvcm0udHlwZSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdmaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYodHJhbnNmb3JtLmZpbHRlcnNyYykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS50YXJnZXQgPSB0cmFuc2Zvcm0uZmlsdGVyc3JjO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0cmFuc2Zvcm0uZmlsdGVyc3JjO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0cmFuc2Zvcm0uY2FsZW5kYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZighdHJhbnNmb3JtLnZhbHVlY2FsZW5kYXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnZhbHVlY2FsZW5kYXIgPSB0cmFuc2Zvcm0uY2FsZW5kYXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0cmFuc2Zvcm0uY2FsZW5kYXI7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlICdncm91cGJ5JzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE5hbWUgaGFzIGNoYW5nZWQgZnJvbSBgc3R5bGVgIHRvIGBzdHlsZXNgLCBzbyB1c2UgYHN0eWxlYCBidXQgcHJlZmVyIGBzdHlsZXNgOlxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtLnN0eWxlcyA9IHRyYW5zZm9ybS5zdHlsZXMgfHwgdHJhbnNmb3JtLnN0eWxlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZih0cmFuc2Zvcm0uc3R5bGVzICYmICFBcnJheS5pc0FycmF5KHRyYW5zZm9ybS5zdHlsZXMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHByZXZTdHlsZXMgPSB0cmFuc2Zvcm0uc3R5bGVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBzdHlsZUtleXMgPSBPYmplY3Qua2V5cyhwcmV2U3R5bGVzKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5zdHlsZXMgPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgc3R5bGVLZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybS5zdHlsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQ6IHN0eWxlS2V5c1tqXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBwcmV2U3R5bGVzW3N0eWxlS2V5c1tqXV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gcHJ1bmUgZW1wdHkgY29udGFpbmVycyBtYWRlIGJlZm9yZSB0aGUgbmV3IG5lc3RlZFByb3BlcnR5XG4gICAgICAgIGlmKGVtcHR5Q29udGFpbmVyKHRyYWNlLCAnbGluZScpKSBkZWxldGUgdHJhY2UubGluZTtcbiAgICAgICAgaWYoJ21hcmtlcicgaW4gdHJhY2UpIHtcbiAgICAgICAgICAgIGlmKGVtcHR5Q29udGFpbmVyKHRyYWNlLm1hcmtlciwgJ2xpbmUnKSkgZGVsZXRlIHRyYWNlLm1hcmtlci5saW5lO1xuICAgICAgICAgICAgaWYoZW1wdHlDb250YWluZXIodHJhY2UsICdtYXJrZXInKSkgZGVsZXRlIHRyYWNlLm1hcmtlcjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNhbml0aXplIHJnYihmcmFjdGlvbnMpIGFuZCByZ2JhKGZyYWN0aW9ucykgdGhhdCBvbGQgdGlueWNvbG9yXG4gICAgICAgIC8vIHN1cHBvcnRlZCwgYnV0IG5ldyB0aW55Y29sb3IgZG9lcyBub3QgYmVjYXVzZSB0aGV5J3JlIG5vdCB2YWxpZCBjc3NcbiAgICAgICAgQ29sb3IuY2xlYW4odHJhY2UpO1xuXG4gICAgICAgIC8vIHJlbW92ZSBvYnNvbGV0ZSBhdXRvYmluKHh8eSkgYXR0cmlidXRlcywgYnV0IG9ubHkgaWYgdHJ1ZVxuICAgICAgICAvLyBpZiBmYWxzZSwgdGhpcyBuZWVkcyB0byBoYXBwZW4gaW4gSGlzdG9ncmFtLmNhbGMgYmVjYXVzZSBpdFxuICAgICAgICAvLyBjYW4gYmUgYSBvbmUtdGltZSBhdXRvYmluIHNvIHdlIG5lZWQgdG8ga25vdyB0aGUgcmVzdWx0cyBiZWZvcmVcbiAgICAgICAgLy8gd2UgY2FuIHB1c2ggdGhlbSBiYWNrIGludG8gdGhlIHRyYWNlLlxuICAgICAgICBpZih0cmFjZS5hdXRvYmlueCkge1xuICAgICAgICAgICAgZGVsZXRlIHRyYWNlLmF1dG9iaW54O1xuICAgICAgICAgICAgZGVsZXRlIHRyYWNlLnhiaW5zO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRyYWNlLmF1dG9iaW55KSB7XG4gICAgICAgICAgICBkZWxldGUgdHJhY2UuYXV0b2Jpbnk7XG4gICAgICAgICAgICBkZWxldGUgdHJhY2UueWJpbnM7XG4gICAgICAgIH1cblxuICAgICAgICBjbGVhblRpdGxlKHRyYWNlKTtcbiAgICAgICAgaWYodHJhY2UuY29sb3JiYXIpIGNsZWFuVGl0bGUodHJhY2UuY29sb3JiYXIpO1xuICAgICAgICBpZih0cmFjZS5tYXJrZXIgJiYgdHJhY2UubWFya2VyLmNvbG9yYmFyKSBjbGVhblRpdGxlKHRyYWNlLm1hcmtlci5jb2xvcmJhcik7XG4gICAgICAgIGlmKHRyYWNlLmxpbmUgJiYgdHJhY2UubGluZS5jb2xvcmJhcikgY2xlYW5UaXRsZSh0cmFjZS5saW5lLmNvbG9yYmFyKTtcbiAgICAgICAgaWYodHJhY2UuYWF4aXMpIGNsZWFuVGl0bGUodHJhY2UuYWF4aXMpO1xuICAgICAgICBpZih0cmFjZS5iYXhpcykgY2xlYW5UaXRsZSh0cmFjZS5iYXhpcyk7XG4gICAgfVxufTtcblxuZnVuY3Rpb24gY2xlYW5GaW5hbmNlRGlyKGRpckNvbnRhaW5lcikge1xuICAgIGlmKCFMaWIuaXNQbGFpbk9iamVjdChkaXJDb250YWluZXIpKSByZXR1cm4gZmFsc2U7XG5cbiAgICB2YXIgZGlyTmFtZSA9IGRpckNvbnRhaW5lci5uYW1lO1xuXG4gICAgZGVsZXRlIGRpckNvbnRhaW5lci5uYW1lO1xuICAgIGRlbGV0ZSBkaXJDb250YWluZXIuc2hvd2xlZ2VuZDtcblxuICAgIHJldHVybiAodHlwZW9mIGRpck5hbWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiBkaXJOYW1lID09PSAnbnVtYmVyJykgJiYgU3RyaW5nKGRpck5hbWUpO1xufVxuXG5mdW5jdGlvbiBjb21tb25QcmVmaXgobmFtZTEsIG5hbWUyLCBzaG93MSwgc2hvdzIpIHtcbiAgICAvLyBpZiBvbmx5IG9uZSBpcyBzaG93biBpbiB0aGUgbGVnZW5kLCB1c2UgdGhhdFxuICAgIGlmKHNob3cxICYmICFzaG93MikgcmV0dXJuIG5hbWUxO1xuICAgIGlmKHNob3cyICYmICFzaG93MSkgcmV0dXJuIG5hbWUyO1xuXG4gICAgLy8gaWYgYm90aCBvciBuZWl0aGVyIGFyZSBpbiB0aGUgbGVnZW5kLCBjaGVjayBpZiBvbmUgaXMgYmxhbmsgKG9yIHdoaXRlc3BhY2UpXG4gICAgLy8gYW5kIHVzZSB0aGUgb3RoZXIgb25lXG4gICAgLy8gbm90ZSB0aGF0IGhvdmVyIGxhYmVscyBjYW4gc3RpbGwgdXNlIHRoZSBuYW1lIGV2ZW4gaWYgdGhlIGxlZ2VuZCBkb2Vzbid0XG4gICAgaWYoIW5hbWUxLnRyaW0oKSkgcmV0dXJuIG5hbWUyO1xuICAgIGlmKCFuYW1lMi50cmltKCkpIHJldHVybiBuYW1lMTtcblxuICAgIHZhciBtaW5MZW4gPSBNYXRoLm1pbihuYW1lMS5sZW5ndGgsIG5hbWUyLmxlbmd0aCk7XG4gICAgdmFyIGk7XG4gICAgZm9yKGkgPSAwOyBpIDwgbWluTGVuOyBpKyspIHtcbiAgICAgICAgaWYobmFtZTEuY2hhckF0KGkpICE9PSBuYW1lMi5jaGFyQXQoaSkpIGJyZWFrO1xuICAgIH1cblxuICAgIHZhciBvdXQgPSBuYW1lMS5zdWJzdHIoMCwgaSk7XG4gICAgcmV0dXJuIG91dC50cmltKCk7XG59XG5cbi8vIHRleHRwb3NpdGlvbiAtIHN1cHBvcnQgcGFydGlhbCBhdHRyaWJ1dGVzIChpZSBqdXN0ICd0b3AnKVxuLy8gYW5kIGluY29ycmVjdCB1c2Ugb2YgbWlkZGxlIC8gY2VudGVyIGV0Yy5cbmZ1bmN0aW9uIGNsZWFuVGV4dFBvc2l0aW9uKHRleHRwb3NpdGlvbikge1xuICAgIHZhciBwb3NZID0gJ21pZGRsZSc7XG4gICAgdmFyIHBvc1ggPSAnY2VudGVyJztcblxuICAgIGlmKHR5cGVvZiB0ZXh0cG9zaXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGlmKHRleHRwb3NpdGlvbi5pbmRleE9mKCd0b3AnKSAhPT0gLTEpIHBvc1kgPSAndG9wJztcbiAgICAgICAgZWxzZSBpZih0ZXh0cG9zaXRpb24uaW5kZXhPZignYm90dG9tJykgIT09IC0xKSBwb3NZID0gJ2JvdHRvbSc7XG5cbiAgICAgICAgaWYodGV4dHBvc2l0aW9uLmluZGV4T2YoJ2xlZnQnKSAhPT0gLTEpIHBvc1ggPSAnbGVmdCc7XG4gICAgICAgIGVsc2UgaWYodGV4dHBvc2l0aW9uLmluZGV4T2YoJ3JpZ2h0JykgIT09IC0xKSBwb3NYID0gJ3JpZ2h0JztcbiAgICB9XG5cbiAgICByZXR1cm4gcG9zWSArICcgJyArIHBvc1g7XG59XG5cbmZ1bmN0aW9uIGVtcHR5Q29udGFpbmVyKG91dGVyLCBpbm5lclN0cikge1xuICAgIHJldHVybiAoaW5uZXJTdHIgaW4gb3V0ZXIpICYmXG4gICAgICAgICh0eXBlb2Ygb3V0ZXJbaW5uZXJTdHJdID09PSAnb2JqZWN0JykgJiZcbiAgICAgICAgKE9iamVjdC5rZXlzKG91dGVyW2lubmVyU3RyXSkubGVuZ3RoID09PSAwKTtcbn1cblxuXG4vLyBzd2FwIGFsbCB0aGUgZGF0YSBhbmQgZGF0YSBhdHRyaWJ1dGVzIGFzc29jaWF0ZWQgd2l0aCB4IGFuZCB5XG5leHBvcnRzLnN3YXBYWURhdGEgPSBmdW5jdGlvbih0cmFjZSkge1xuICAgIHZhciBpO1xuICAgIExpYi5zd2FwQXR0cnModHJhY2UsIFsnPycsICc/MCcsICdkPycsICc/YmlucycsICduYmlucz8nLCAnYXV0b2Jpbj8nLCAnP3NyYycsICdlcnJvcl8/J10pO1xuICAgIGlmKEFycmF5LmlzQXJyYXkodHJhY2UueikgJiYgQXJyYXkuaXNBcnJheSh0cmFjZS56WzBdKSkge1xuICAgICAgICBpZih0cmFjZS50cmFuc3Bvc2UpIGRlbGV0ZSB0cmFjZS50cmFuc3Bvc2U7XG4gICAgICAgIGVsc2UgdHJhY2UudHJhbnNwb3NlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYodHJhY2UuZXJyb3JfeCAmJiB0cmFjZS5lcnJvcl95KSB7XG4gICAgICAgIHZhciBlcnJvclkgPSB0cmFjZS5lcnJvcl95O1xuICAgICAgICB2YXIgY29weVlzdHlsZSA9ICgnY29weV95c3R5bGUnIGluIGVycm9yWSkgP1xuICAgICAgICAgICAgZXJyb3JZLmNvcHlfeXN0eWxlIDpcbiAgICAgICAgICAgICEoZXJyb3JZLmNvbG9yIHx8IGVycm9yWS50aGlja25lc3MgfHwgZXJyb3JZLndpZHRoKTtcbiAgICAgICAgTGliLnN3YXBBdHRycyh0cmFjZSwgWydlcnJvcl8/LmNvcHlfeXN0eWxlJ10pO1xuICAgICAgICBpZihjb3B5WXN0eWxlKSB7XG4gICAgICAgICAgICBMaWIuc3dhcEF0dHJzKHRyYWNlLCBbJ2Vycm9yXz8uY29sb3InLCAnZXJyb3JfPy50aGlja25lc3MnLCAnZXJyb3JfPy53aWR0aCddKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZih0eXBlb2YgdHJhY2UuaG92ZXJpbmZvID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgaG92ZXJJbmZvUGFydHMgPSB0cmFjZS5ob3ZlcmluZm8uc3BsaXQoJysnKTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgaG92ZXJJbmZvUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGhvdmVySW5mb1BhcnRzW2ldID09PSAneCcpIGhvdmVySW5mb1BhcnRzW2ldID0gJ3knO1xuICAgICAgICAgICAgZWxzZSBpZihob3ZlckluZm9QYXJ0c1tpXSA9PT0gJ3knKSBob3ZlckluZm9QYXJ0c1tpXSA9ICd4JztcbiAgICAgICAgfVxuICAgICAgICB0cmFjZS5ob3ZlcmluZm8gPSBob3ZlckluZm9QYXJ0cy5qb2luKCcrJyk7XG4gICAgfVxufTtcblxuLy8gY29lcmNlIHRyYWNlSW5kaWNlcyBpbnB1dCB0byBhcnJheSBvZiB0cmFjZSBpbmRpY2VzXG5leHBvcnRzLmNvZXJjZVRyYWNlSW5kaWNlcyA9IGZ1bmN0aW9uKGdkLCB0cmFjZUluZGljZXMpIHtcbiAgICBpZihpc051bWVyaWModHJhY2VJbmRpY2VzKSkge1xuICAgICAgICByZXR1cm4gW3RyYWNlSW5kaWNlc107XG4gICAgfSBlbHNlIGlmKCFBcnJheS5pc0FycmF5KHRyYWNlSW5kaWNlcykgfHwgIXRyYWNlSW5kaWNlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGdkLmRhdGEubWFwKGZ1bmN0aW9uKF8sIGkpIHsgcmV0dXJuIGk7IH0pO1xuICAgIH0gZWxzZSBpZihBcnJheS5pc0FycmF5KHRyYWNlSW5kaWNlcykpIHtcbiAgICAgICAgdmFyIHRyYWNlSW5kaWNlc091dCA9IFtdO1xuICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgdHJhY2VJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZihMaWIuaXNJbmRleCh0cmFjZUluZGljZXNbaV0sIGdkLmRhdGEubGVuZ3RoKSkge1xuICAgICAgICAgICAgICAgIHRyYWNlSW5kaWNlc091dC5wdXNoKHRyYWNlSW5kaWNlc1tpXSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIExpYi53YXJuKCd0cmFjZSBpbmRleCAoJywgdHJhY2VJbmRpY2VzW2ldLCAnKSBpcyBub3QgYSBudW1iZXIgb3IgaXMgb3V0IG9mIGJvdW5kcycpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cmFjZUluZGljZXNPdXQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRyYWNlSW5kaWNlcztcbn07XG5cbi8qKlxuICogTWFuYWdlcyBsb2dpYyBhcm91bmQgYXJyYXkgY29udGFpbmVyIGl0ZW0gY3JlYXRpb24gLyBkZWxldGlvbiAvIHVwZGF0ZVxuICogdGhhdCBuZXN0ZWQgcHJvcGVydHkgYWxvbmUgY2FuJ3QgaGFuZGxlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBucFxuICogIG5lc3RlZCBwcm9wZXJ0eSBvZiB1cGRhdGUgYXR0cmlidXRlIHN0cmluZyBhYm91dCB0cmFjZSBvciBsYXlvdXQgb2JqZWN0XG4gKiBAcGFyYW0geyp9IG5ld1ZhbFxuICogIHVwZGF0ZSB2YWx1ZSBwYXNzZWQgdG8gcmVzdHlsZSAvIHJlbGF5b3V0IC8gdXBkYXRlXG4gKiBAcGFyYW0ge09iamVjdH0gdW5kb2l0XG4gKiAgdW5kbyBoYXNoIChOLkIuIHVuZG9pdCBtYXkgYmUgbXV0YXRlZCBoZXJlKS5cbiAqXG4gKi9cbmV4cG9ydHMubWFuYWdlQXJyYXlDb250YWluZXJzID0gZnVuY3Rpb24obnAsIG5ld1ZhbCwgdW5kb2l0KSB7XG4gICAgdmFyIG9iaiA9IG5wLm9iajtcbiAgICB2YXIgcGFydHMgPSBucC5wYXJ0cztcbiAgICB2YXIgcExlbmd0aCA9IHBhcnRzLmxlbmd0aDtcbiAgICB2YXIgcExhc3QgPSBwYXJ0c1twTGVuZ3RoIC0gMV07XG5cbiAgICB2YXIgcExhc3RJc051bWJlciA9IGlzTnVtZXJpYyhwTGFzdCk7XG5cbiAgICBpZihwTGFzdElzTnVtYmVyICYmIG5ld1ZhbCA9PT0gbnVsbCkge1xuICAgICAgICAvLyBkZWxldGUgaXRlbVxuXG4gICAgICAgIC8vIENsZWFyIGl0ZW0gaW4gYXJyYXkgY29udGFpbmVyIHdoZW4gbmV3IHZhbHVlIGlzIG51bGxcbiAgICAgICAgdmFyIGNvbnRQYXRoID0gcGFydHMuc2xpY2UoMCwgcExlbmd0aCAtIDEpLmpvaW4oJy4nKTtcbiAgICAgICAgdmFyIGNvbnQgPSBMaWIubmVzdGVkUHJvcGVydHkob2JqLCBjb250UGF0aCkuZ2V0KCk7XG4gICAgICAgIGNvbnQuc3BsaWNlKHBMYXN0LCAxKTtcblxuICAgICAgICAvLyBOb3RlIHRoYXQgbmVzdGVkIHByb3BlcnR5IGNsZWFycyBudWxsIC8gdW5kZWZpbmVkIGF0IGVuZCBvZlxuICAgICAgICAvLyBhcnJheSBjb250YWluZXIsIGJ1dCBub3Qgd2l0aGluIHRoZW0uXG4gICAgfSBlbHNlIGlmKHBMYXN0SXNOdW1iZXIgJiYgbnAuZ2V0KCkgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAvLyBjcmVhdGUgaXRlbVxuXG4gICAgICAgIC8vIFdoZW4gYWRkaW5nIGEgbmV3IGl0ZW0sIG1ha2Ugc3VyZSB1bmRvIGNvbW1hbmQgd2lsbCByZW1vdmUgaXRcbiAgICAgICAgaWYobnAuZ2V0KCkgPT09IHVuZGVmaW5lZCkgdW5kb2l0W25wLmFzdHJdID0gbnVsbDtcblxuICAgICAgICBucC5zZXQobmV3VmFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvLyB1cGRhdGUgaXRlbVxuXG4gICAgICAgIC8vIElmIHRoZSBsYXN0IHBhcnQgb2YgYXR0cmlidXRlIHN0cmluZyBpc24ndCBhIG51bWJlcixcbiAgICAgICAgLy8gbnAuc2V0IGlzIGFsbCB3ZSBuZWVkLlxuICAgICAgICBucC5zZXQobmV3VmFsKTtcbiAgICB9XG59O1xuXG4vKlxuICogTWF0Y2ggdGhlIHBhcnQgdG8gc3RyaXAgb2ZmIHRvIHR1cm4gYW4gYXR0cmlidXRlIGludG8gaXRzIHBhcmVudFxuICogcmVhbGx5IGl0IHNob3VsZCBiZSBlaXRoZXIgJy5zb21lX2NoYXJhY3RlcnMnIG9yICdbbnVtYmVyXSdcbiAqIGJ1dCB3ZSdyZSBhIGxpdHRsZSBtb3JlIHBlcm1pc3NpdmUgaGVyZSBhbmQgbWF0Y2ggZWl0aGVyXG4gKiAnLm5vdF9icmFja2V0c19vcl9kb3QnIG9yICdbbm90X2JyYWNrZXRzX29yX2RvdF0nXG4gKi9cbnZhciBBVFRSX1RBSUxfUkUgPSAvKFxcLlteXFxbXFxdXFwuXSt8XFxbW15cXFtcXF1cXC5dK1xcXSkkLztcblxuZnVuY3Rpb24gZ2V0UGFyZW50KGF0dHIpIHtcbiAgICB2YXIgdGFpbCA9IGF0dHIuc2VhcmNoKEFUVFJfVEFJTF9SRSk7XG4gICAgaWYodGFpbCA+IDApIHJldHVybiBhdHRyLnN1YnN0cigwLCB0YWlsKTtcbn1cblxuLypcbiAqIGhhc1BhcmVudDogZG9lcyBhbiBhdHRyaWJ1dGUgb2JqZWN0IGNvbnRhaW4gYSBwYXJlbnQgb2YgdGhlIGdpdmVuIGF0dHJpYnV0ZT9cbiAqIGZvciBleGFtcGxlLCBnaXZlbiAnaW1hZ2VzWzJdLngnIGRvIHdlIGFsc28gaGF2ZSAnaW1hZ2VzJyBvciAnaW1hZ2VzWzJdJz9cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gYW9ialxuICogIHVwZGF0ZSBvYmplY3QsIHdob3NlIGtleXMgYXJlIGF0dHJpYnV0ZSBzdHJpbmdzIGFuZCB2YWx1ZXMgYXJlIHRoZWlyIG5ldyBzZXR0aW5nc1xuICogQHBhcmFtIHtzdHJpbmd9IGF0dHJcbiAqICB0aGUgYXR0cmlidXRlIHN0cmluZyB0byB0ZXN0IGFnYWluc3RcbiAqIEByZXR1cm5zIHtCb29sZWFufVxuICogIGlzIGEgcGFyZW50IG9mIGF0dHIgcHJlc2VudCBpbiBhb2JqP1xuICovXG5leHBvcnRzLmhhc1BhcmVudCA9IGZ1bmN0aW9uKGFvYmosIGF0dHIpIHtcbiAgICB2YXIgYXR0clBhcmVudCA9IGdldFBhcmVudChhdHRyKTtcbiAgICB3aGlsZShhdHRyUGFyZW50KSB7XG4gICAgICAgIGlmKGF0dHJQYXJlbnQgaW4gYW9iaikgcmV0dXJuIHRydWU7XG4gICAgICAgIGF0dHJQYXJlbnQgPSBnZXRQYXJlbnQoYXR0clBhcmVudCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn07XG5cbi8qKlxuICogRW1wdHkgb3V0IHR5cGVzIGZvciBhbGwgYXhlcyBjb250YWluaW5nIHRoZXNlIHRyYWNlcyBzbyB3ZSBhdXRvLXNldCB0aGVtIGFnYWluXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGdkXG4gKiBAcGFyYW0ge1tpbnRlZ2VyXX0gdHJhY2VzOiB0cmFjZSBpbmRpY2VzIHRvIHNlYXJjaCBmb3IgYXhlcyB0byBjbGVhciB0aGUgdHlwZXMgb2ZcbiAqIEBwYXJhbSB7b2JqZWN0fSBsYXlvdXRVcGRhdGU6IGFueSB1cGRhdGUgYmVpbmcgZG9uZSBjb25jdXJyZW50bHkgdG8gdGhlIGxheW91dCxcbiAqICAgd2hpY2ggbWF5IHN1cGVyY2VkZSBjbGVhcmluZyB0aGUgYXhpcyB0eXBlc1xuICovXG52YXIgYXhMZXR0ZXJzID0gWyd4JywgJ3knLCAneiddO1xuZXhwb3J0cy5jbGVhckF4aXNUeXBlcyA9IGZ1bmN0aW9uKGdkLCB0cmFjZXMsIGxheW91dFVwZGF0ZSkge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCB0cmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHRyYWNlID0gZ2QuX2Z1bGxEYXRhW2ldO1xuICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgICAgICB2YXIgYXggPSBnZXRGcm9tVHJhY2UoZ2QsIHRyYWNlLCBheExldHRlcnNbal0pO1xuXG4gICAgICAgICAgICAvLyBkbyBub3QgY2xlYXIgbG9nIHR5cGUgLSB0aGF0J3MgbmV2ZXIgYW4gYXV0byByZXN1bHQgc28gbXVzdCBoYXZlIGJlZW4gaW50ZW50aW9uYWxcbiAgICAgICAgICAgIGlmKGF4ICYmIGF4LnR5cGUgIT09ICdsb2cnKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF4QXR0ciA9IGF4Ll9uYW1lO1xuICAgICAgICAgICAgICAgIHZhciBzY2VuZU5hbWUgPSBheC5faWQuc3Vic3RyKDEpO1xuICAgICAgICAgICAgICAgIGlmKHNjZW5lTmFtZS5zdWJzdHIoMCwgNSkgPT09ICdzY2VuZScpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobGF5b3V0VXBkYXRlW3NjZW5lTmFtZV0gIT09IHVuZGVmaW5lZCkgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIGF4QXR0ciA9IHNjZW5lTmFtZSArICcuJyArIGF4QXR0cjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIHR5cGVBdHRyID0gYXhBdHRyICsgJy50eXBlJztcblxuICAgICAgICAgICAgICAgIGlmKGxheW91dFVwZGF0ZVtheEF0dHJdID09PSB1bmRlZmluZWQgJiYgbGF5b3V0VXBkYXRlW3R5cGVBdHRyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIExpYi5uZXN0ZWRQcm9wZXJ0eShnZC5sYXlvdXQsIHR5cGVBdHRyKS5zZXQobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgaXNQbGFpbk9iamVjdCA9IHJlcXVpcmUoJy4uL2xpYi9pc19wbGFpbl9vYmplY3QnKTtcbnZhciBub29wID0gcmVxdWlyZSgnLi4vbGliL25vb3AnKTtcbnZhciBMb2dnZXJzID0gcmVxdWlyZSgnLi4vbGliL2xvZ2dlcnMnKTtcbnZhciBzb3J0ZXJBc2MgPSByZXF1aXJlKCcuLi9saWIvc2VhcmNoJykuc29ydGVyQXNjO1xudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vcmVnaXN0cnknKTtcblxuXG5leHBvcnRzLmNvbnRhaW5lckFycmF5TWF0Y2ggPSByZXF1aXJlKCcuL2NvbnRhaW5lcl9hcnJheV9tYXRjaCcpO1xuXG52YXIgaXNBZGRWYWwgPSBleHBvcnRzLmlzQWRkVmFsID0gZnVuY3Rpb24gaXNBZGRWYWwodmFsKSB7XG4gICAgcmV0dXJuIHZhbCA9PT0gJ2FkZCcgfHwgaXNQbGFpbk9iamVjdCh2YWwpO1xufTtcblxudmFyIGlzUmVtb3ZlVmFsID0gZXhwb3J0cy5pc1JlbW92ZVZhbCA9IGZ1bmN0aW9uIGlzUmVtb3ZlVmFsKHZhbCkge1xuICAgIHJldHVybiB2YWwgPT09IG51bGwgfHwgdmFsID09PSAncmVtb3ZlJztcbn07XG5cbi8qXG4gKiBhcHBseUNvbnRhaW5lckFycmF5Q2hhbmdlczogZm9yIG1hbmFnaW5nIGFycmF5cyBvZiBsYXlvdXQgY29tcG9uZW50cyBpbiByZWxheW91dFxuICogaGFuZGxlcyB0aGVtIGFsbCB3aXRoIGEgY29uc2lzdGVudCBpbnRlcmZhY2UuXG4gKlxuICogSGVyZSBhcmUgdGhlIHN1cHBvcnRlZCBhY3Rpb25zIC0+IHJlbGF5b3V0IGNhbGxzIC0+IGVkaXRzIHdlIGdldCBoZXJlXG4gKiAoYXMgcHJlcGFyZWQgaW4gX3JlbGF5b3V0KTpcbiAqXG4gKiBhZGQgYW4gZW1wdHkgb2JqIC0+IHsnYW5ub3RhdGlvbnNbMl0nOiAnYWRkJ30gLT4gezI6IHsnJzogJ2FkZCd9fVxuICogYWRkIGEgc3BlY2lmaWMgb2JqIC0+IHsnYW5ub3RhdGlvbnNbMl0nOiB7YXR0cnN9fSAtPiB7MjogeycnOiB7YXR0cnN9fX1cbiAqIGRlbGV0ZSBhbiBvYmogLT4geydhbm5vdGF0aW9uc1syXSc6ICdyZW1vdmUnfSAtPiB7MjogeycnOiAncmVtb3ZlJ319XG4gKiAgICAgICAgICAgICAgIC0+IHsnYW5ub3RhdGlvbnNbMl0nOiBudWxsfSAtPiB7MjogeycnOiBudWxsfX1cbiAqIGRlbGV0ZSB0aGUgd2hvbGUgYXJyYXkgLT4geydhbm5vdGF0aW9ucyc6ICdyZW1vdmUnfSAtPiB7Jyc6IHsnJzogJ3JlbW92ZSd9fVxuICogICAgICAgICAgICAgICAgICAgICAgICAtPiB7J2Fubm90YXRpb25zJzogbnVsbH0gLT4geycnOiB7Jyc6IG51bGx9fVxuICogZWRpdCBhbiBvYmplY3QgLT4geydhbm5vdGF0aW9uc1syXS50ZXh0JzogJ2Jvbyd9IC0+IHsyOiB7J3RleHQnOiAnYm9vJ319XG4gKlxuICogWW91IGNhbiBjb21iaW5lIG1hbnkgZWRpdHMgdG8gZGlmZmVyZW50IG9iamVjdHMuIE9iamVjdHMgYXJlIGFkZGVkIGFuZCBlZGl0ZWRcbiAqIGluIGFzY2VuZGluZyBvcmRlciwgdGhlbiByZW1vdmVkIGluIGRlc2NlbmRpbmcgb3JkZXIuXG4gKiBGb3IgZXhhbXBsZSwgc3RhcnRpbmcgd2l0aCBbYSwgYiwgY10sIGlmIHlvdSB3YW50IHRvOlxuICogLSByZXBsYWNlIGIgd2l0aCBkOlxuICogICB7J2Fubm90YXRpb25zWzFdJzogZCwgJ2Fubm90YXRpb25zWzJdJzogbnVsbH0gKGIgaXMgaXRlbSAyIGFmdGVyIGFkZGluZyBkKVxuICogLSBhZGQgYSBuZXcgaXRlbSBkIGJldHdlZW4gYSBhbmQgYiwgYW5kIGVkaXQgYjpcbiAqICAgIHsnYW5ub3RhdGlvbnNbMV0nOiBkLCAnYW5ub3RhdGlvbnNbMl0ueCc6IG5ld1h9IChiIGlzIGl0ZW0gMiBhZnRlciBhZGRpbmcgZClcbiAqIC0gZGVsZXRlIGIgYW5kIGVkaXQgYzpcbiAqICAgIHsnYW5ub3RhdGlvbnNbMV0nOiBudWxsLCAnYW5ub3RhdGlvbnNbMl0ueCc6IG5ld1h9IChjIGlzIGVkaXRlZCBiZWZvcmUgYiBpcyByZW1vdmVkKVxuICpcbiAqIFlvdSBDQU5OT1QgY29tYmluZSBhZGRpbmcvZGVsZXRpbmcgYW4gaXRlbSBhdCBpbmRleCBgaWAgd2l0aCBlZGl0cyB0byB0aGUgc2FtZSBpbmRleCBgaWBcbiAqIFlvdSBDQU5OT1QgY29tYmluZSByZXBsYWNpbmcvZGVsZXRpbmcgdGhlIHdob2xlIGFycmF5IHdpdGggYW55dGhpbmcgZWxzZSAoZm9yIHRoZSBzYW1lIGFycmF5KS5cbiAqXG4gKiBAcGFyYW0ge0hUTUxEaXZFbGVtZW50fSBnZFxuICogIHRoZSBET00gZWxlbWVudCBvZiB0aGUgZ3JhcGggY29udGFpbmVyIGRpdlxuICogQHBhcmFtIHtMaWIubmVzdGVkUHJvcGVydHl9IGNvbXBvbmVudFR5cGU6IHRoZSBhcnJheSB3ZSBhcmUgZWRpdGluZ1xuICogQHBhcmFtIHtPYmplY3R9IGVkaXRzXG4gKiAgdGhlIGNoYW5nZXMgdG8gbWFrZTsga2V5cyBhcmUgaW5kaWNlcyB0byBlZGl0LCB2YWx1ZXMgYXJlIHRoZW1zZWx2ZXMgb2JqZWN0czpcbiAqICB7YXR0cjogbmV3VmFsdWV9IG9mIGNoYW5nZXMgdG8gbWFrZSB0byB0aGF0IGluZGV4ICh3aXRoIGFkZC9yZW1vdmUgYmVoYXZpb3JcbiAqICBpbiBzcGVjaWFsIHZhbHVlcyBvZiB0aGUgZW1wdHkgYXR0cilcbiAqIEBwYXJhbSB7T2JqZWN0fSBmbGFnc1xuICogIHRoZSBmbGFncyBmb3Igd2hpY2ggYWN0aW9ucyB3ZSdyZSBnb2luZyB0byBwZXJmb3JtIHRvIGRpc3BsYXkgdGhlc2UgKGFuZFxuICogIGFueSBvdGhlcikgY2hhbmdlcy4gSWYgd2UncmUgYWxyZWFkeSBgcmVjYWxjYGluZywgd2UgZG9uJ3QgbmVlZCB0byByZWRyYXdcbiAqICBpbmRpdmlkdWFsIGl0ZW1zXG4gKiBAcGFyYW0ge2Z1bmN0aW9ufSBfbmVzdGVkUHJvcGVydHlcbiAqICBhIChwb3NzaWJseSBtb2RpZmllZCBmb3IgZ3VpIGVkaXRzKSBuZXN0ZWRQcm9wZXJ0eSBjb25zdHJ1Y3RvclxuICogIFRoZSBtb2RpZmllZCB2ZXJzaW9uIHRha2VzIGEgM3JkIGFyZ3VtZW50LCBmb3IgYSBwcmVmaXggdG8gdGhlIGF0dHJpYnV0ZVxuICogIHN0cmluZyBuZWNlc3NhcnkgZm9yIHN0b3JpbmcgR1VJIGVkaXRzXG4gKlxuICogQHJldHVybnMge2Jvb2x9IGB0cnVlYCBpZiBpdCBtYW5hZ2VkIHRvIGNvbXBsZXRlIGRyYXdpbmcgb2YgdGhlIGNoYW5nZXNcbiAqICBgZmFsc2VgIHdvdWxkIG1lYW4gdGhlIHBhcmVudCBzaG91bGQgcmVwbG90LlxuICovXG5leHBvcnRzLmFwcGx5Q29udGFpbmVyQXJyYXlDaGFuZ2VzID0gZnVuY3Rpb24gYXBwbHlDb250YWluZXJBcnJheUNoYW5nZXMoZ2QsIG5wLCBlZGl0cywgZmxhZ3MsIF9uZXN0ZWRQcm9wZXJ0eSkge1xuICAgIHZhciBjb21wb25lbnRUeXBlID0gbnAuYXN0cjtcbiAgICB2YXIgc3VwcGx5Q29tcG9uZW50RGVmYXVsdHMgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoY29tcG9uZW50VHlwZSwgJ3N1cHBseUxheW91dERlZmF1bHRzJyk7XG4gICAgdmFyIGRyYXcgPSBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoY29tcG9uZW50VHlwZSwgJ2RyYXcnKTtcbiAgICB2YXIgZHJhd09uZSA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZChjb21wb25lbnRUeXBlLCAnZHJhd09uZScpO1xuICAgIHZhciByZXBsb3RMYXRlciA9IGZsYWdzLnJlcGxvdCB8fCBmbGFncy5yZWNhbGMgfHwgKHN1cHBseUNvbXBvbmVudERlZmF1bHRzID09PSBub29wKSB8fCAoZHJhdyA9PT0gbm9vcCk7XG4gICAgdmFyIGxheW91dCA9IGdkLmxheW91dDtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuXG4gICAgaWYoZWRpdHNbJyddKSB7XG4gICAgICAgIGlmKE9iamVjdC5rZXlzKGVkaXRzKS5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBMb2dnZXJzLndhcm4oJ0Z1bGwgYXJyYXkgZWRpdHMgYXJlIGluY29tcGF0aWJsZSB3aXRoIG90aGVyIGVkaXRzJyxcbiAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmdWxsVmFsID0gZWRpdHNbJyddWycnXTtcblxuICAgICAgICBpZihpc1JlbW92ZVZhbChmdWxsVmFsKSkgbnAuc2V0KG51bGwpO1xuICAgICAgICBlbHNlIGlmKEFycmF5LmlzQXJyYXkoZnVsbFZhbCkpIG5wLnNldChmdWxsVmFsKTtcbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBMb2dnZXJzLndhcm4oJ1VucmVjb2duaXplZCBmdWxsIGFycmF5IGVkaXQgdmFsdWUnLCBjb21wb25lbnRUeXBlLCBmdWxsVmFsKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYocmVwbG90TGF0ZXIpIHJldHVybiBmYWxzZTtcblxuICAgICAgICBzdXBwbHlDb21wb25lbnREZWZhdWx0cyhsYXlvdXQsIGZ1bGxMYXlvdXQpO1xuICAgICAgICBkcmF3KGdkKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgdmFyIGNvbXBvbmVudE51bXMgPSBPYmplY3Qua2V5cyhlZGl0cykubWFwKE51bWJlcikuc29ydChzb3J0ZXJBc2MpO1xuICAgIHZhciBjb21wb25lbnRBcnJheUluID0gbnAuZ2V0KCk7XG4gICAgdmFyIGNvbXBvbmVudEFycmF5ID0gY29tcG9uZW50QXJyYXlJbiB8fCBbXTtcbiAgICAvLyBjb21wb25lbnRBcnJheUZ1bGwgaXMgdXNlZCBqdXN0IHRvIGtlZXAgc3BsaWNlcyBpbiBsaW5lIGJldHdlZW5cbiAgICAvLyBmdWxsIGFuZCBpbnB1dCBhcnJheXMsIHNvIHByaXZhdGUga2V5cyBjYW4gYmUgY29waWVkIG92ZXIgYWZ0ZXJcbiAgICAvLyByZWRvaW5nIHN1cHBseURlZmF1bHRzXG4gICAgLy8gVE9ETzogdGhpcyBhc3N1bWVzIGNvbXBvbmVudEFycmF5IGlzIGluIGdkLmxheW91dCAtIHdoaWNoIHdpbGwgbm90IGJlXG4gICAgLy8gdHJ1ZSBhZnRlciB3ZSBleHRlbmQgdGhpcyB0byByZXN0eWxlXG4gICAgdmFyIGNvbXBvbmVudEFycmF5RnVsbCA9IF9uZXN0ZWRQcm9wZXJ0eShmdWxsTGF5b3V0LCBjb21wb25lbnRUeXBlKS5nZXQoKTtcblxuICAgIHZhciBkZWxldGVzID0gW107XG4gICAgdmFyIGZpcnN0SW5kZXhDaGFuZ2UgPSAtMTtcbiAgICB2YXIgbWF4SW5kZXggPSBjb21wb25lbnRBcnJheS5sZW5ndGg7XG4gICAgdmFyIGk7XG4gICAgdmFyIGo7XG4gICAgdmFyIGNvbXBvbmVudE51bTtcbiAgICB2YXIgb2JqRWRpdHM7XG4gICAgdmFyIG9iaktleXM7XG4gICAgdmFyIG9ialZhbDtcbiAgICB2YXIgYWRkaW5nLCBwcmVmaXg7XG5cbiAgICAvLyBmaXJzdCBtYWtlIHRoZSBhZGQgYW5kIGVkaXQgY2hhbmdlc1xuICAgIGZvcihpID0gMDsgaSA8IGNvbXBvbmVudE51bXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29tcG9uZW50TnVtID0gY29tcG9uZW50TnVtc1tpXTtcbiAgICAgICAgb2JqRWRpdHMgPSBlZGl0c1tjb21wb25lbnROdW1dO1xuICAgICAgICBvYmpLZXlzID0gT2JqZWN0LmtleXMob2JqRWRpdHMpO1xuICAgICAgICBvYmpWYWwgPSBvYmpFZGl0c1snJ10sXG4gICAgICAgIGFkZGluZyA9IGlzQWRkVmFsKG9ialZhbCk7XG5cbiAgICAgICAgaWYoY29tcG9uZW50TnVtIDwgMCB8fCBjb21wb25lbnROdW0gPiBjb21wb25lbnRBcnJheS5sZW5ndGggLSAoYWRkaW5nID8gMCA6IDEpKSB7XG4gICAgICAgICAgICBMb2dnZXJzLndhcm4oJ2luZGV4IG91dCBvZiByYW5nZScsIGNvbXBvbmVudFR5cGUsIGNvbXBvbmVudE51bSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKG9ialZhbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihvYmpLZXlzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBMb2dnZXJzLndhcm4oXG4gICAgICAgICAgICAgICAgICAgICdJbnNlcnRpb24gJiByZW1vdmFsIGFyZSBpbmNvbXBhdGlibGUgd2l0aCBlZGl0cyB0byB0aGUgc2FtZSBpbmRleC4nLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlLCBjb21wb25lbnROdW0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpc1JlbW92ZVZhbChvYmpWYWwpKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlcy5wdXNoKGNvbXBvbmVudE51bSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYoYWRkaW5nKSB7XG4gICAgICAgICAgICAgICAgaWYob2JqVmFsID09PSAnYWRkJykgb2JqVmFsID0ge307XG4gICAgICAgICAgICAgICAgY29tcG9uZW50QXJyYXkuc3BsaWNlKGNvbXBvbmVudE51bSwgMCwgb2JqVmFsKTtcbiAgICAgICAgICAgICAgICBpZihjb21wb25lbnRBcnJheUZ1bGwpIGNvbXBvbmVudEFycmF5RnVsbC5zcGxpY2UoY29tcG9uZW50TnVtLCAwLCB7fSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIExvZ2dlcnMud2FybignVW5yZWNvZ25pemVkIGZ1bGwgb2JqZWN0IGVkaXQgdmFsdWUnLFxuICAgICAgICAgICAgICAgICAgICBjb21wb25lbnRUeXBlLCBjb21wb25lbnROdW0sIG9ialZhbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKGZpcnN0SW5kZXhDaGFuZ2UgPT09IC0xKSBmaXJzdEluZGV4Q2hhbmdlID0gY29tcG9uZW50TnVtO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgb2JqS2V5cy5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgICAgIHByZWZpeCA9IGNvbXBvbmVudFR5cGUgKyAnWycgKyBjb21wb25lbnROdW0gKyAnXS4nO1xuICAgICAgICAgICAgICAgIF9uZXN0ZWRQcm9wZXJ0eShjb21wb25lbnRBcnJheVtjb21wb25lbnROdW1dLCBvYmpLZXlzW2pdLCBwcmVmaXgpXG4gICAgICAgICAgICAgICAgICAgIC5zZXQob2JqRWRpdHNbb2JqS2V5c1tqXV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbm93IGRvIGRlbGV0ZXNcbiAgICBmb3IoaSA9IGRlbGV0ZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgY29tcG9uZW50QXJyYXkuc3BsaWNlKGRlbGV0ZXNbaV0sIDEpO1xuICAgICAgICAvLyBUT0RPOiB0aGlzIGRyb3BzIHByaXZhdGUga2V5cyB0aGF0IGhhZCBiZWVuIHN0b3JlZCBpbiBjb21wb25lbnRBcnJheUZ1bGxcbiAgICAgICAgLy8gZG9lcyB0aGlzIGhhdmUgYW55IGlsbCBlZmZlY3RzP1xuICAgICAgICBpZihjb21wb25lbnRBcnJheUZ1bGwpIGNvbXBvbmVudEFycmF5RnVsbC5zcGxpY2UoZGVsZXRlc1tpXSwgMSk7XG4gICAgfVxuXG4gICAgaWYoIWNvbXBvbmVudEFycmF5Lmxlbmd0aCkgbnAuc2V0KG51bGwpO1xuICAgIGVsc2UgaWYoIWNvbXBvbmVudEFycmF5SW4pIG5wLnNldChjb21wb25lbnRBcnJheSk7XG5cbiAgICBpZihyZXBsb3RMYXRlcikgcmV0dXJuIGZhbHNlO1xuXG4gICAgc3VwcGx5Q29tcG9uZW50RGVmYXVsdHMobGF5b3V0LCBmdWxsTGF5b3V0KTtcblxuICAgIC8vIGZpbmFsbHkgZHJhdyBhbGwgdGhlIGNvbXBvbmVudHMgd2UgbmVlZCB0b1xuICAgIC8vIGlmIHdlIGFkZGVkIG9yIHJlbW92ZWQgYW55LCByZWRyYXcgYWxsIGFmdGVyIGl0XG4gICAgaWYoZHJhd09uZSAhPT0gbm9vcCkge1xuICAgICAgICB2YXIgaW5kaWNlc1RvRHJhdztcbiAgICAgICAgaWYoZmlyc3RJbmRleENoYW5nZSA9PT0gLTEpIHtcbiAgICAgICAgICAgIC8vIHRoZXJlJ3Mgbm8gcmUtaW5kZXhpbmcgdG8gZG8sIHNvIG9ubHkgcmVkcmF3IGNvbXBvbmVudHMgdGhhdCBjaGFuZ2VkXG4gICAgICAgICAgICBpbmRpY2VzVG9EcmF3ID0gY29tcG9uZW50TnVtcztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGluIGNhc2UgdGhlIGNvbXBvbmVudCBhcnJheSB3YXMgc2hvcnRlbmVkLCB3ZSBzdGlsbCBuZWVkIGRvIGNhbGxcbiAgICAgICAgICAgIC8vIGRyYXdPbmUgb24gdGhlIGxhdHRlciBpdGVtcyBzbyB0aGV5IGdldCBwcm9wZXJseSByZW1vdmVkXG4gICAgICAgICAgICBtYXhJbmRleCA9IE1hdGgubWF4KGNvbXBvbmVudEFycmF5Lmxlbmd0aCwgbWF4SW5kZXgpO1xuICAgICAgICAgICAgaW5kaWNlc1RvRHJhdyA9IFtdO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgY29tcG9uZW50TnVtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGNvbXBvbmVudE51bSA9IGNvbXBvbmVudE51bXNbaV07XG4gICAgICAgICAgICAgICAgaWYoY29tcG9uZW50TnVtID49IGZpcnN0SW5kZXhDaGFuZ2UpIGJyZWFrO1xuICAgICAgICAgICAgICAgIGluZGljZXNUb0RyYXcucHVzaChjb21wb25lbnROdW0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9yKGkgPSBmaXJzdEluZGV4Q2hhbmdlOyBpIDwgbWF4SW5kZXg7IGkrKykge1xuICAgICAgICAgICAgICAgIGluZGljZXNUb0RyYXcucHVzaChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmb3IoaSA9IDA7IGkgPCBpbmRpY2VzVG9EcmF3Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBkcmF3T25lKGdkLCBpbmRpY2VzVG9EcmF3W2ldKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBkcmF3KGdkKTtcblxuICAgIHJldHVybiB0cnVlO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBpc051bWVyaWMgPSByZXF1aXJlKCdmYXN0LWlzbnVtZXJpYycpO1xudmFyIGhhc0hvdmVyID0gcmVxdWlyZSgnaGFzLWhvdmVyJyk7XG5cbnZhciBMaWIgPSByZXF1aXJlKCcuLi9saWInKTtcbnZhciBuZXN0ZWRQcm9wZXJ0eSA9IExpYi5uZXN0ZWRQcm9wZXJ0eTtcblxudmFyIEV2ZW50cyA9IHJlcXVpcmUoJy4uL2xpYi9ldmVudHMnKTtcbnZhciBRdWV1ZSA9IHJlcXVpcmUoJy4uL2xpYi9xdWV1ZScpO1xuXG52YXIgUmVnaXN0cnkgPSByZXF1aXJlKCcuLi9yZWdpc3RyeScpO1xudmFyIFBsb3RTY2hlbWEgPSByZXF1aXJlKCcuL3Bsb3Rfc2NoZW1hJyk7XG52YXIgUGxvdHMgPSByZXF1aXJlKCcuLi9wbG90cy9wbG90cycpO1xudmFyIFBvbGFyID0gcmVxdWlyZSgnLi4vcGxvdHMvcG9sYXIvbGVnYWN5Jyk7XG5cbnZhciBBeGVzID0gcmVxdWlyZSgnLi4vcGxvdHMvY2FydGVzaWFuL2F4ZXMnKTtcbnZhciBEcmF3aW5nID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cy9kcmF3aW5nJyk7XG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgaW5pdEludGVyYWN0aW9ucyA9IHJlcXVpcmUoJy4uL3Bsb3RzL2NhcnRlc2lhbi9ncmFwaF9pbnRlcmFjdCcpLmluaXRJbnRlcmFjdGlvbnM7XG52YXIgeG1sbnNOYW1lc3BhY2VzID0gcmVxdWlyZSgnLi4vY29uc3RhbnRzL3htbG5zX25hbWVzcGFjZXMnKTtcbnZhciBzdmdUZXh0VXRpbHMgPSByZXF1aXJlKCcuLi9saWIvc3ZnX3RleHRfdXRpbHMnKTtcbnZhciBjbGVhclNlbGVjdCA9IHJlcXVpcmUoJy4uL3Bsb3RzL2NhcnRlc2lhbi9zZWxlY3QnKS5jbGVhclNlbGVjdDtcblxudmFyIGRmbHRDb25maWcgPSByZXF1aXJlKCcuL3Bsb3RfY29uZmlnJykuZGZsdENvbmZpZztcbnZhciBtYW5hZ2VBcnJheXMgPSByZXF1aXJlKCcuL21hbmFnZV9hcnJheXMnKTtcbnZhciBoZWxwZXJzID0gcmVxdWlyZSgnLi9oZWxwZXJzJyk7XG52YXIgc3Vicm91dGluZXMgPSByZXF1aXJlKCcuL3N1YnJvdXRpbmVzJyk7XG52YXIgZWRpdFR5cGVzID0gcmVxdWlyZSgnLi9lZGl0X3R5cGVzJyk7XG5cbnZhciBBWF9OQU1FX1BBVFRFUk4gPSByZXF1aXJlKCcuLi9wbG90cy9jYXJ0ZXNpYW4vY29uc3RhbnRzJykuQVhfTkFNRV9QQVRURVJOO1xuXG52YXIgbnVtZXJpY05hbWVXYXJuaW5nQ291bnQgPSAwO1xudmFyIG51bWVyaWNOYW1lV2FybmluZ0NvdW50TGltaXQgPSA1O1xuXG4vKipcbiAqIE1haW4gcGxvdC1jcmVhdGlvbiBmdW5jdGlvblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIGlkIG9yIERPTSBlbGVtZW50fSBnZFxuICogICAgICB0aGUgaWQgb3IgRE9NIGVsZW1lbnQgb2YgdGhlIGdyYXBoIGNvbnRhaW5lciBkaXZcbiAqIEBwYXJhbSB7YXJyYXkgb2Ygb2JqZWN0c30gZGF0YVxuICogICAgICBhcnJheSBvZiB0cmFjZXMsIGNvbnRhaW5pbmcgdGhlIGRhdGEgYW5kIGRpc3BsYXkgaW5mb3JtYXRpb24gZm9yIGVhY2ggdHJhY2VcbiAqIEBwYXJhbSB7b2JqZWN0fSBsYXlvdXRcbiAqICAgICAgb2JqZWN0IGRlc2NyaWJpbmcgdGhlIG92ZXJhbGwgZGlzcGxheSBvZiB0aGUgcGxvdCxcbiAqICAgICAgYWxsIHRoZSBzdHVmZiB0aGF0IGRvZXNuJ3QgcGVydGFpbiB0byBhbnkgaW5kaXZpZHVhbCB0cmFjZVxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZ1xuICogICAgICBjb25maWd1cmF0aW9uIG9wdGlvbnMgKHNlZSAuL3Bsb3RfY29uZmlnLmpzIGZvciBtb3JlIGluZm8pXG4gKlxuICogT1JcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyBpZCBvciBET00gZWxlbWVudH0gZ2RcbiAqICAgICAgdGhlIGlkIG9yIERPTSBlbGVtZW50IG9mIHRoZSBncmFwaCBjb250YWluZXIgZGl2XG4gKiBAcGFyYW0ge29iamVjdH0gZmlndXJlXG4gKiAgICAgIG9iamVjdCBjb250YWluaW5nIGBkYXRhYCwgYGxheW91dGAsIGBjb25maWdgLCBhbmQgYGZyYW1lc2AgbWVtYmVyc1xuICpcbiAqL1xuZnVuY3Rpb24gcGxvdChnZCwgZGF0YSwgbGF5b3V0LCBjb25maWcpIHtcbiAgICB2YXIgZnJhbWVzO1xuXG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuXG4gICAgLy8gRXZlbnRzLmluaXQgaXMgaWRlbXBvdGVudCBhbmQgYmFpbHMgZWFybHkgaWYgZ2QgaGFzIGFscmVhZHkgYmVlbiBpbml0J2RcbiAgICBFdmVudHMuaW5pdChnZCk7XG5cbiAgICBpZihMaWIuaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICB2YXIgb2JqID0gZGF0YTtcbiAgICAgICAgZGF0YSA9IG9iai5kYXRhO1xuICAgICAgICBsYXlvdXQgPSBvYmoubGF5b3V0O1xuICAgICAgICBjb25maWcgPSBvYmouY29uZmlnO1xuICAgICAgICBmcmFtZXMgPSBvYmouZnJhbWVzO1xuICAgIH1cblxuICAgIHZhciBva1RvUGxvdCA9IEV2ZW50cy50cmlnZ2VySGFuZGxlcihnZCwgJ3Bsb3RseV9iZWZvcmVwbG90JywgW2RhdGEsIGxheW91dCwgY29uZmlnXSk7XG4gICAgaWYob2tUb1Bsb3QgPT09IGZhbHNlKSByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcblxuICAgIC8vIGlmIHRoZXJlJ3Mgbm8gZGF0YSBvciBsYXlvdXQsIGFuZCB0aGlzIGlzbid0IHlldCBhIHBsb3RseSBwbG90XG4gICAgLy8gY29udGFpbmVyLCBsb2cgYSB3YXJuaW5nIHRvIGhlbHAgcGxvdGx5LmpzIHVzZXJzIGRlYnVnXG4gICAgaWYoIWRhdGEgJiYgIWxheW91dCAmJiAhTGliLmlzUGxvdERpdihnZCkpIHtcbiAgICAgICAgTGliLndhcm4oJ0NhbGxpbmcgUGxvdGx5LnBsb3QgYXMgaWYgcmVkcmF3aW5nICcgK1xuICAgICAgICAgICAgJ2J1dCB0aGlzIGNvbnRhaW5lciBkb2VzblxcJ3QgeWV0IGhhdmUgYSBwbG90LicsIGdkKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRGcmFtZXMoKSB7XG4gICAgICAgIGlmKGZyYW1lcykge1xuICAgICAgICAgICAgcmV0dXJuIGV4cG9ydHMuYWRkRnJhbWVzKGdkLCBmcmFtZXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gdHJhbnNmZXIgY29uZmlndXJhdGlvbiBvcHRpb25zIHRvIGdkIHVudGlsIHdlIG1vdmUgb3ZlciB0b1xuICAgIC8vIGEgbW9yZSBPTyBsaWtlIG1vZGVsXG4gICAgc2V0UGxvdENvbnRleHQoZ2QsIGNvbmZpZyk7XG5cbiAgICBpZighbGF5b3V0KSBsYXlvdXQgPSB7fTtcblxuICAgIC8vIGhvb2sgY2xhc3MgZm9yIHBsb3RzIG1haW4gY29udGFpbmVyIChpbiBjYXNlIG9mIHBsb3RseS5qc1xuICAgIC8vIHRoaXMgd29uJ3QgYmUgI2VtYmVkZGVkLWdyYXBoIG9yIC5qcy10YWItY29udGVudHMpXG4gICAgZDMuc2VsZWN0KGdkKS5jbGFzc2VkKCdqcy1wbG90bHktcGxvdCcsIHRydWUpO1xuXG4gICAgLy8gb2ZmLXNjcmVlbiBnZXRCb3VuZGluZ0NsaWVudFJlY3QgdGVzdGluZyBzcGFjZSxcbiAgICAvLyBpbiAjanMtcGxvdGx5LXRlc3RlciAoYW5kIHN0b3JlZCBhcyBEcmF3aW5nLnRlc3RlcilcbiAgICAvLyBzbyB3ZSBjYW4gc2hhcmUgY2FjaGVkIHRleHQgYWNyb3NzIHRhYnNcbiAgICBEcmF3aW5nLm1ha2VUZXN0ZXIoKTtcblxuICAgIC8vIGNvbGxlY3QgcHJvbWlzZXMgZm9yIGFueSBhc3luYyBhY3Rpb25zIGR1cmluZyBwbG90dGluZ1xuICAgIC8vIGFueSBwYXJ0IG9mIHRoZSBwbG90dGluZyBjb2RlIGNhbiBwdXNoIHRvIGdkLl9wcm9taXNlcywgdGhlblxuICAgIC8vIGJlZm9yZSB3ZSBtb3ZlIHRvIHRoZSBuZXh0IHN0ZXAsIHdlIGNoZWNrIHRoYXQgdGhleSdyZSBhbGxcbiAgICAvLyBjb21wbGV0ZSwgYW5kIGVtcHR5IG91dCB0aGUgcHJvbWlzZSBsaXN0IGFnYWluLlxuICAgIGlmKCFBcnJheS5pc0FycmF5KGdkLl9wcm9taXNlcykpIGdkLl9wcm9taXNlcyA9IFtdO1xuXG4gICAgdmFyIGdyYXBoV2FzRW1wdHkgPSAoKGdkLmRhdGEgfHwgW10pLmxlbmd0aCA9PT0gMCAmJiBBcnJheS5pc0FycmF5KGRhdGEpKTtcblxuICAgIC8vIGlmIHRoZXJlIGlzIGFscmVhZHkgZGF0YSBvbiB0aGUgZ3JhcGgsIGFwcGVuZCB0aGUgbmV3IGRhdGFcbiAgICAvLyBpZiB5b3Ugb25seSB3YW50IHRvIHJlZHJhdywgcGFzcyBhIG5vbi1hcnJheSBmb3IgZGF0YVxuICAgIGlmKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgaGVscGVycy5jbGVhbkRhdGEoZGF0YSk7XG5cbiAgICAgICAgaWYoZ3JhcGhXYXNFbXB0eSkgZ2QuZGF0YSA9IGRhdGE7XG4gICAgICAgIGVsc2UgZ2QuZGF0YS5wdXNoLmFwcGx5KGdkLmRhdGEsIGRhdGEpO1xuXG4gICAgICAgIC8vIGZvciByb3V0aW5lcyBvdXRzaWRlIGdyYXBoX29iaiB0aGF0IHdhbnQgYSBjbGVhbiB0YWJcbiAgICAgICAgLy8gKHJhdGhlciB0aGFuIGFwcGVuZGluZyB0byBhbiBleGlzdGluZyBvbmUpIGdkLmVtcHR5XG4gICAgICAgIC8vIGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdG8gbWFrZSBhIG5ldyB0YWJcbiAgICAgICAgZ2QuZW1wdHkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZighZ2QubGF5b3V0IHx8IGdyYXBoV2FzRW1wdHkpIHtcbiAgICAgICAgZ2QubGF5b3V0ID0gaGVscGVycy5jbGVhbkxheW91dChsYXlvdXQpO1xuICAgIH1cblxuICAgIFBsb3RzLnN1cHBseURlZmF1bHRzKGdkKTtcblxuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGhhc0NhcnRlc2lhbiA9IGZ1bGxMYXlvdXQuX2hhcygnY2FydGVzaWFuJyk7XG5cbiAgICAvLyBMZWdhY3kgcG9sYXIgcGxvdHNcbiAgICBpZighZnVsbExheW91dC5faGFzKCdwb2xhcicpICYmIGRhdGEgJiYgZGF0YVswXSAmJiBkYXRhWzBdLnIpIHtcbiAgICAgICAgTGliLmxvZygnTGVnYWN5IHBvbGFyIGNoYXJ0cyBhcmUgZGVwcmVjYXRlZCEnKTtcbiAgICAgICAgcmV0dXJuIHBsb3RMZWdhY3lQb2xhcihnZCwgZGF0YSwgbGF5b3V0KTtcbiAgICB9XG5cbiAgICAvLyBzbyB3ZSBkb24ndCB0cnkgdG8gcmUtY2FsbCBQbG90bHkucGxvdCBmcm9tIGluc2lkZVxuICAgIC8vIGxlZ2VuZCBhbmQgY29sb3JiYXIsIGlmIG1hcmdpbnMgY2hhbmdlZFxuICAgIGZ1bGxMYXlvdXQuX3JlcGxvdHRpbmcgPSB0cnVlO1xuXG4gICAgLy8gbWFrZSBvciByZW1ha2UgdGhlIGZyYW1ld29yayBpZiB3ZSBuZWVkIHRvXG4gICAgaWYoZ3JhcGhXYXNFbXB0eSB8fCBmdWxsTGF5b3V0Ll9zaG91bGRDcmVhdGVCZ0xheWVyKSB7XG4gICAgICAgIG1ha2VQbG90RnJhbWV3b3JrKGdkKTtcblxuICAgICAgICBpZihmdWxsTGF5b3V0Ll9zaG91bGRDcmVhdGVCZ0xheWVyKSB7XG4gICAgICAgICAgICBkZWxldGUgZnVsbExheW91dC5fc2hvdWxkQ3JlYXRlQmdMYXllcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIHBvbGFyIG5lZWQgYSBkaWZmZXJlbnQgZnJhbWV3b3JrXG4gICAgaWYoZ2QuZnJhbWV3b3JrICE9PSBtYWtlUGxvdEZyYW1ld29yaykge1xuICAgICAgICBnZC5mcmFtZXdvcmsgPSBtYWtlUGxvdEZyYW1ld29yaztcbiAgICAgICAgbWFrZVBsb3RGcmFtZXdvcmsoZ2QpO1xuICAgIH1cblxuICAgIC8vIGNsZWFyIGdyYWRpZW50IGRlZnMgb24gZWFjaCAucGxvdCBjYWxsLCBiZWNhdXNlIHdlIGtub3cgd2UnbGwgbG9vcCB0aHJvdWdoIGFsbCB0cmFjZXNcbiAgICBEcmF3aW5nLmluaXRHcmFkaWVudHMoZ2QpO1xuXG4gICAgLy8gc2F2ZSBpbml0aWFsIHNob3cgc3Bpa2VzIG9uY2UgcGVyIGdyYXBoXG4gICAgaWYoZ3JhcGhXYXNFbXB0eSkgQXhlcy5zYXZlU2hvd1NwaWtlSW5pdGlhbChnZCk7XG5cbiAgICAvLyBwcmVwYXJlIHRoZSBkYXRhIGFuZCBmaW5kIHRoZSBhdXRvcmFuZ2VcblxuICAgIC8vIGdlbmVyYXRlIGNhbGNkYXRhLCBpZiB3ZSBuZWVkIHRvXG4gICAgLy8gdG8gZm9yY2UgcmVkb2luZyBjYWxjZGF0YSwganVzdCBkZWxldGUgaXQgYmVmb3JlIGNhbGxpbmcgUGxvdGx5LnBsb3RcbiAgICB2YXIgcmVjYWxjID0gIWdkLmNhbGNkYXRhIHx8IGdkLmNhbGNkYXRhLmxlbmd0aCAhPT0gKGdkLl9mdWxsRGF0YSB8fCBbXSkubGVuZ3RoO1xuICAgIGlmKHJlY2FsYykgUGxvdHMuZG9DYWxjZGF0YShnZCk7XG5cbiAgICAvLyBpbiBjYXNlIGl0IGhhcyBjaGFuZ2VkLCBhdHRhY2ggZnVsbERhdGEgdHJhY2VzIHRvIGNhbGNkYXRhXG4gICAgZm9yKHZhciBpID0gMDsgaSA8IGdkLmNhbGNkYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGdkLmNhbGNkYXRhW2ldWzBdLnRyYWNlID0gZ2QuX2Z1bGxEYXRhW2ldO1xuICAgIH1cblxuICAgIC8vIG1ha2UgdGhlIGZpZ3VyZSByZXNwb25zaXZlXG4gICAgaWYoZ2QuX2NvbnRleHQucmVzcG9uc2l2ZSkge1xuICAgICAgICBpZighZ2QuX3Jlc3BvbnNpdmVDaGFydEhhbmRsZXIpIHtcbiAgICAgICAgICAgIC8vIEtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIHJlc2l6ZSBoYW5kbGVyIHRvIHB1cmdlIGl0IGRvd24gdGhlIHJvYWRcbiAgICAgICAgICAgIGdkLl9yZXNwb25zaXZlQ2hhcnRIYW5kbGVyID0gZnVuY3Rpb24oKSB7IGlmKCFMaWIuaXNIaWRkZW4oZ2QpKSBQbG90cy5yZXNpemUoZ2QpOyB9O1xuXG4gICAgICAgICAgICAvLyBMaXN0ZW4gdG8gd2luZG93IHJlc2l6ZVxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGdkLl9yZXNwb25zaXZlQ2hhcnRIYW5kbGVyKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAgIExpYi5jbGVhclJlc3BvbnNpdmUoZ2QpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogc3RhcnQgYXN5bmMtZnJpZW5kbHkgY29kZSAtIG5vdyB3ZSdyZSBhY3R1YWxseSBkcmF3aW5nIHRoaW5nc1xuICAgICAqL1xuXG4gICAgdmFyIG9sZE1hcmdpbnMgPSBMaWIuZXh0ZW5kRmxhdCh7fSwgZnVsbExheW91dC5fc2l6ZSk7XG5cbiAgICAvLyBkcmF3IGZyYW1ld29yayBmaXJzdCBzbyB0aGF0IG1hcmdpbi1wdXNoaW5nXG4gICAgLy8gY29tcG9uZW50cyBjYW4gcG9zaXRpb24gdGhlbXNlbHZlcyBjb3JyZWN0bHlcbiAgICB2YXIgZHJhd0ZyYW1ld29ya0NhbGxzID0gMDtcbiAgICBmdW5jdGlvbiBkcmF3RnJhbWV3b3JrKCkge1xuICAgICAgICB2YXIgYmFzZVBsb3RNb2R1bGVzID0gZnVsbExheW91dC5fYmFzZVBsb3RNb2R1bGVzO1xuXG4gICAgICAgIGZvcih2YXIgaSA9IDA7IGkgPCBiYXNlUGxvdE1vZHVsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmKGJhc2VQbG90TW9kdWxlc1tpXS5kcmF3RnJhbWV3b3JrKSB7XG4gICAgICAgICAgICAgICAgYmFzZVBsb3RNb2R1bGVzW2ldLmRyYXdGcmFtZXdvcmsoZ2QpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWZ1bGxMYXlvdXQuX2dsY2FudmFzICYmIGZ1bGxMYXlvdXQuX2hhcygnZ2wnKSkge1xuICAgICAgICAgICAgZnVsbExheW91dC5fZ2xjYW52YXMgPSBmdWxsTGF5b3V0Ll9nbGNvbnRhaW5lci5zZWxlY3RBbGwoJy5nbC1jYW52YXMnKS5kYXRhKFt7XG4gICAgICAgICAgICAgICAga2V5OiAnY29udGV4dExheWVyJyxcbiAgICAgICAgICAgICAgICBjb250ZXh0OiB0cnVlLFxuICAgICAgICAgICAgICAgIHBpY2s6IGZhbHNlXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAga2V5OiAnZm9jdXNMYXllcicsXG4gICAgICAgICAgICAgICAgY29udGV4dDogZmFsc2UsXG4gICAgICAgICAgICAgICAgcGljazogZmFsc2VcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBrZXk6ICdwaWNrTGF5ZXInLFxuICAgICAgICAgICAgICAgIGNvbnRleHQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHBpY2s6IHRydWVcbiAgICAgICAgICAgIH1dLCBmdW5jdGlvbihkKSB7IHJldHVybiBkLmtleTsgfSk7XG5cbiAgICAgICAgICAgIGZ1bGxMYXlvdXQuX2dsY2FudmFzLmVudGVyKCkuYXBwZW5kKCdjYW52YXMnKVxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdnbC1jYW52YXMgZ2wtY2FudmFzLScgKyBkLmtleS5yZXBsYWNlKCdMYXllcicsICcnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5zdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgICAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgICAgICAgICAgIGxlZnQ6IDAsXG4gICAgICAgICAgICAgICAgICAgIG92ZXJmbG93OiAndmlzaWJsZScsXG4gICAgICAgICAgICAgICAgICAgICdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoZnVsbExheW91dC5fZ2xjYW52YXMpIHtcbiAgICAgICAgICAgIGZ1bGxMYXlvdXQuX2dsY2FudmFzXG4gICAgICAgICAgICAgICAgLmF0dHIoJ3dpZHRoJywgZnVsbExheW91dC53aWR0aClcbiAgICAgICAgICAgICAgICAuYXR0cignaGVpZ2h0JywgZnVsbExheW91dC5oZWlnaHQpO1xuXG4gICAgICAgICAgICB2YXIgcmVnbCA9IGZ1bGxMYXlvdXQuX2dsY2FudmFzLmRhdGEoKVswXS5yZWdsO1xuICAgICAgICAgICAgaWYocmVnbCkge1xuICAgICAgICAgICAgICAgIC8vIFVuZm9ydHVuYXRlbHksIHRoaXMgY2FuIGhhcHBlbiB3aGVuIHJlbGF5b3V0aW5nIHRvIGxhcmdlXG4gICAgICAgICAgICAgICAgLy8gd2lkdGgvaGVpZ2h0IG9uIHNvbWUgYnJvd3NlcnMuXG4gICAgICAgICAgICAgICAgaWYoTWF0aC5mbG9vcihmdWxsTGF5b3V0LndpZHRoKSAhPT0gcmVnbC5fZ2wuZHJhd2luZ0J1ZmZlcldpZHRoIHx8XG4gICAgICAgICAgICAgICAgICAgIE1hdGguZmxvb3IoZnVsbExheW91dC5oZWlnaHQpICE9PSByZWdsLl9nbC5kcmF3aW5nQnVmZmVySGVpZ2h0XG4gICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbXNnID0gJ1dlYkdMIGNvbnRleHQgYnVmZmVyIGFuZCBjYW52YXMgZGltZW5zaW9ucyBkbyBub3QgbWF0Y2ggZHVlIHRvIGJyb3dzZXIvV2ViR0wgYnVnLic7XG4gICAgICAgICAgICAgICAgICAgIGlmKGRyYXdGcmFtZXdvcmtDYWxscykge1xuICAgICAgICAgICAgICAgICAgICAgICAgTGliLmVycm9yKG1zZyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBMaWIubG9nKG1zZyArICcgQ2xlYXJpbmcgZ3JhcGggYW5kIHBsb3R0aW5nIGFnYWluLicpO1xuICAgICAgICAgICAgICAgICAgICAgICAgUGxvdHMuY2xlYW5QbG90KFtdLCB7fSwgZ2QuX2Z1bGxEYXRhLCBmdWxsTGF5b3V0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsb3RzLnN1cHBseURlZmF1bHRzKGdkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICAgICAgICAgICAgICAgICAgICAgIFBsb3RzLmRvQ2FsY2RhdGEoZ2QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZHJhd0ZyYW1ld29ya0NhbGxzKys7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZHJhd0ZyYW1ld29yaygpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYoZnVsbExheW91dC5tb2RlYmFyLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgICAgIGZ1bGxMYXlvdXQuX21vZGViYXJkaXZcbiAgICAgICAgICAgICAgLnN0eWxlKCdoZWlnaHQnLCBudWxsKVxuICAgICAgICAgICAgICAuc3R5bGUoJ3dpZHRoJywgJzEwMCUnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bGxMYXlvdXQuX21vZGViYXJkaXZcbiAgICAgICAgICAgICAgLnN0eWxlKCd3aWR0aCcsIG51bGwpXG4gICAgICAgICAgICAgIC5zdHlsZSgnaGVpZ2h0JywgZnVsbExheW91dC5oZWlnaHQgKyAncHgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQbG90cy5wcmV2aW91c1Byb21pc2VzKGdkKTtcbiAgICB9XG5cbiAgICAvLyBkcmF3IGFueXRoaW5nIHRoYXQgY2FuIGFmZmVjdCBtYXJnaW5zLlxuICAgIGZ1bmN0aW9uIG1hcmdpblB1c2hlcnMoKSB7XG4gICAgICAgIC8vIEZpcnN0IHJlc2V0IHRoZSBsaXN0IG9mIHRoaW5ncyB0aGF0IGFyZSBhbGxvd2VkIHRvIGNoYW5nZSB0aGUgbWFyZ2luc1xuICAgICAgICAvLyBTbyBhbnkgZGVsZXRlZCB0cmFjZXMgb3IgY29tcG9uZW50cyB3aWxsIGJlIHdpcGVkIG91dCBvZiB0aGVcbiAgICAgICAgLy8gYXV0b21hcmdpbiBjYWxjdWxhdGlvbi5cbiAgICAgICAgLy8gVGhpcyBtZWFucyAqZXZlcnkqIG1hcmdpbiBwdXNoZXIgbXVzdCBiZSBsaXN0ZWQgaGVyZSwgZXZlbiBpZiBpdFxuICAgICAgICAvLyBkb2Vzbid0IGFjdHVhbGx5IHRyeSB0byBwdXNoIHRoZSBtYXJnaW5zIHVudGlsIGxhdGVyLlxuICAgICAgICBQbG90cy5jbGVhckF1dG9NYXJnaW5JZHMoZ2QpO1xuXG4gICAgICAgIHN1YnJvdXRpbmVzLmRyYXdNYXJnaW5QdXNoZXJzKGdkKTtcbiAgICAgICAgQXhlcy5hbGxvd0F1dG9NYXJnaW4oZ2QpO1xuXG4gICAgICAgIC8vIFRPRE8gY2FuIHRoaXMgYmUgbW92ZWQgZWxzZXdoZXJlP1xuICAgICAgICBpZihmdWxsTGF5b3V0Ll9oYXMoJ3BpZScpKSB7XG4gICAgICAgICAgICB2YXIgZnVsbERhdGEgPSBnZC5fZnVsbERhdGE7XG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgdHJhY2UgPSBmdWxsRGF0YVtpXTtcbiAgICAgICAgICAgICAgICBpZih0cmFjZS50eXBlID09PSAncGllJyAmJiB0cmFjZS5hdXRvbWFyZ2luKSB7XG4gICAgICAgICAgICAgICAgICAgIFBsb3RzLmFsbG93QXV0b01hcmdpbihnZCwgJ3BpZS4nICsgdHJhY2UudWlkICsgJy5hdXRvbWFyZ2luJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgUGxvdHMuZG9BdXRvTWFyZ2luKGdkKTtcbiAgICAgICAgcmV0dXJuIFBsb3RzLnByZXZpb3VzUHJvbWlzZXMoZ2QpO1xuICAgIH1cblxuICAgIC8vIGluIGNhc2UgdGhlIG1hcmdpbnMgY2hhbmdlZCwgZHJhdyBtYXJnaW4gcHVzaGVycyBhZ2FpblxuICAgIGZ1bmN0aW9uIG1hcmdpblB1c2hlcnNBZ2FpbigpIHtcbiAgICAgICAgaWYoIVBsb3RzLmRpZE1hcmdpbkNoYW5nZShvbGRNYXJnaW5zLCBmdWxsTGF5b3V0Ll9zaXplKSkgcmV0dXJuO1xuXG4gICAgICAgIHJldHVybiBMaWIuc3luY09yQXN5bmMoW1xuICAgICAgICAgICAgbWFyZ2luUHVzaGVycyxcbiAgICAgICAgICAgIHN1YnJvdXRpbmVzLmxheW91dFN0eWxlc1xuICAgICAgICBdLCBnZCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcG9zaXRpb25BbmRBdXRvcmFuZ2UoKSB7XG4gICAgICAgIGlmKCFyZWNhbGMpIHtcbiAgICAgICAgICAgIGRvQXV0b1JhbmdlQW5kQ29uc3RyYWludHMoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFRPRE86IGF1dG9zaXplIGV4dHJhIGZvciB0ZXh0IG1hcmtlcnMgYW5kIGltYWdlc1xuICAgICAgICAvLyBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9wbG90bHkuanMvaXNzdWVzLzExMTFcbiAgICAgICAgcmV0dXJuIExpYi5zeW5jT3JBc3luYyhbXG4gICAgICAgICAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ3NoYXBlcycsICdjYWxjQXV0b3JhbmdlJyksXG4gICAgICAgICAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Fubm90YXRpb25zJywgJ2NhbGNBdXRvcmFuZ2UnKSxcbiAgICAgICAgICAgIGRvQXV0b1JhbmdlQW5kQ29uc3RyYWludHNcbiAgICAgICAgXSwgZ2QpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvQXV0b1JhbmdlQW5kQ29uc3RyYWludHMoKSB7XG4gICAgICAgIGlmKGdkLl90cmFuc2l0aW9uaW5nKSByZXR1cm47XG5cbiAgICAgICAgc3Vicm91dGluZXMuZG9BdXRvUmFuZ2VBbmRDb25zdHJhaW50cyhnZCk7XG5cbiAgICAgICAgLy8gc3RvcmUgaW5pdGlhbCByYW5nZXMgKmFmdGVyKiBlbmZvcmNpbmcgY29uc3RyYWludHMsIG90aGVyd2lzZVxuICAgICAgICAvLyB3ZSB3aWxsIG5ldmVyIGxvb2sgbGlrZSB3ZSdyZSBhdCB0aGUgaW5pdGlhbCByYW5nZXNcbiAgICAgICAgaWYoZ3JhcGhXYXNFbXB0eSkgQXhlcy5zYXZlUmFuZ2VJbml0aWFsKGdkKTtcblxuICAgICAgICAvLyB0aGlzIG9uZSBpcyBkaWZmZXJlbnQgZnJvbSBzaGFwZXMvYW5ub3RhdGlvbnMgY2FsY0F1dG9yYW5nZVxuICAgICAgICAvLyB0aGUgb3RoZXJzIGluY29ycG9yYXRlIHRob3NlIGNvbXBvbmVudHMgaW50byBheC5fZXh0cmVtZXMsXG4gICAgICAgIC8vIHRoaXMgb25lIGFjdHVhbGx5IHNldHMgdGhlIHJhbmdlcyBpbiByYW5nZXNsaWRlcnMuXG4gICAgICAgIFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZCgncmFuZ2VzbGlkZXInLCAnY2FsY0F1dG9yYW5nZScpKGdkKTtcbiAgICB9XG5cbiAgICAvLyBkcmF3IHRpY2tzLCB0aXRsZXMsIGFuZCBjYWxjdWxhdGUgYXhpcyBzY2FsaW5nICguX2IsIC5fbSlcbiAgICBmdW5jdGlvbiBkcmF3QXhlcygpIHtcbiAgICAgICAgcmV0dXJuIEF4ZXMuZHJhdyhnZCwgZ3JhcGhXYXNFbXB0eSA/ICcnIDogJ3JlZHJhdycpO1xuICAgIH1cblxuICAgIHZhciBzZXEgPSBbXG4gICAgICAgIFBsb3RzLnByZXZpb3VzUHJvbWlzZXMsXG4gICAgICAgIGFkZEZyYW1lcyxcbiAgICAgICAgZHJhd0ZyYW1ld29yayxcbiAgICAgICAgbWFyZ2luUHVzaGVycyxcbiAgICAgICAgbWFyZ2luUHVzaGVyc0FnYWluXG4gICAgXTtcblxuICAgIGlmKGhhc0NhcnRlc2lhbikgc2VxLnB1c2gocG9zaXRpb25BbmRBdXRvcmFuZ2UpO1xuXG4gICAgc2VxLnB1c2goc3Vicm91dGluZXMubGF5b3V0U3R5bGVzKTtcbiAgICBpZihoYXNDYXJ0ZXNpYW4pIHNlcS5wdXNoKGRyYXdBeGVzKTtcblxuICAgIHNlcS5wdXNoKFxuICAgICAgICBzdWJyb3V0aW5lcy5kcmF3RGF0YSxcbiAgICAgICAgc3Vicm91dGluZXMuZmluYWxEcmF3LFxuICAgICAgICBpbml0SW50ZXJhY3Rpb25zLFxuICAgICAgICBQbG90cy5hZGRMaW5rcyxcbiAgICAgICAgUGxvdHMucmVob3ZlcixcbiAgICAgICAgUGxvdHMucmVkcmFnLFxuICAgICAgICAvLyBUT0RPOiBkb0F1dG9NYXJnaW4gaXMgb25seSBuZWVkZWQgaGVyZSBmb3IgYXhpcyBhdXRvbWFyZ2luLCB3aGljaFxuICAgICAgICAvLyBoYXBwZW5zIG91dHNpZGUgb2YgbWFyZ2luUHVzaGVycyB3aGVyZSBhbGwgdGhlIG90aGVyIGF1dG9tYXJnaW5zIGFyZVxuICAgICAgICAvLyBjYWxjdWxhdGVkLiBXb3VsZCBiZSBtdWNoIGJldHRlciB0byBzZXBhcmF0ZSBtYXJnaW4gY2FsY3VsYXRpb25zIGZyb21cbiAgICAgICAgLy8gY29tcG9uZW50IGRyYXdpbmcgLSBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3Bsb3RseS9wbG90bHkuanMvaXNzdWVzLzI3MDRcbiAgICAgICAgUGxvdHMuZG9BdXRvTWFyZ2luLFxuICAgICAgICBQbG90cy5wcmV2aW91c1Byb21pc2VzXG4gICAgKTtcblxuICAgIC8vIGV2ZW4gaWYgZXZlcnl0aGluZyB3ZSBkaWQgd2FzIHN5bmNocm9ub3VzLCByZXR1cm4gYSBwcm9taXNlXG4gICAgLy8gc28gdGhhdCB0aGUgY2FsbGVyIGRvZXNuJ3QgY2FyZSB3aGljaCByb3V0ZSB3ZSB0b29rXG4gICAgdmFyIHBsb3REb25lID0gTGliLnN5bmNPckFzeW5jKHNlcSwgZ2QpO1xuICAgIGlmKCFwbG90RG9uZSB8fCAhcGxvdERvbmUudGhlbikgcGxvdERvbmUgPSBQcm9taXNlLnJlc29sdmUoKTtcblxuICAgIHJldHVybiBwbG90RG9uZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBlbWl0QWZ0ZXJQbG90KGdkKTtcbiAgICAgICAgcmV0dXJuIGdkO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBlbWl0QWZ0ZXJQbG90KGdkKSB7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIGlmKGZ1bGxMYXlvdXQuX3JlZHJhd0Zyb21BdXRvTWFyZ2luQ291bnQpIHtcbiAgICAgICAgZnVsbExheW91dC5fcmVkcmF3RnJvbUF1dG9NYXJnaW5Db3VudC0tO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9hZnRlcnBsb3QnKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHNldFBsb3RDb25maWcob2JqKSB7XG4gICAgcmV0dXJuIExpYi5leHRlbmRGbGF0KGRmbHRDb25maWcsIG9iaik7XG59XG5cbmZ1bmN0aW9uIHNldEJhY2tncm91bmQoZ2QsIGJnQ29sb3IpIHtcbiAgICB0cnkge1xuICAgICAgICBnZC5fZnVsbExheW91dC5fcGFwZXIuc3R5bGUoJ2JhY2tncm91bmQnLCBiZ0NvbG9yKTtcbiAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgTGliLmVycm9yKGUpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gb3BhcXVlU2V0QmFja2dyb3VuZChnZCwgYmdDb2xvcikge1xuICAgIHZhciBibGVuZCA9IENvbG9yLmNvbWJpbmUoYmdDb2xvciwgJ3doaXRlJyk7XG4gICAgc2V0QmFja2dyb3VuZChnZCwgYmxlbmQpO1xufVxuXG5mdW5jdGlvbiBzZXRQbG90Q29udGV4dChnZCwgY29uZmlnKSB7XG4gICAgaWYoIWdkLl9jb250ZXh0KSB7XG4gICAgICAgIGdkLl9jb250ZXh0ID0gTGliLmV4dGVuZERlZXAoe30sIGRmbHRDb25maWcpO1xuXG4gICAgICAgIC8vIHN0YXNoIDxiYXNlPiBocmVmLCB1c2VkIHRvIG1ha2Ugcm9idXN0IGNsaXBQYXRoIFVSTHNcbiAgICAgICAgdmFyIGJhc2UgPSBkMy5zZWxlY3QoJ2Jhc2UnKTtcbiAgICAgICAgZ2QuX2NvbnRleHQuX2Jhc2VVcmwgPSBiYXNlLnNpemUoKSAmJiBiYXNlLmF0dHIoJ2hyZWYnKSA/XG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZi5zcGxpdCgnIycpWzBdIDpcbiAgICAgICAgICAgICcnO1xuICAgIH1cblxuICAgIHZhciBjb250ZXh0ID0gZ2QuX2NvbnRleHQ7XG5cbiAgICB2YXIgaSwga2V5cywga2V5O1xuXG4gICAgaWYoY29uZmlnKSB7XG4gICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhjb25maWcpO1xuICAgICAgICBmb3IoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgaWYoa2V5ID09PSAnZWRpdGFibGUnIHx8IGtleSA9PT0gJ2VkaXRzJykgY29udGludWU7XG4gICAgICAgICAgICBpZihrZXkgaW4gY29udGV4dCkge1xuICAgICAgICAgICAgICAgIGlmKGtleSA9PT0gJ3NldEJhY2tncm91bmQnICYmIGNvbmZpZ1trZXldID09PSAnb3BhcXVlJykge1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0W2tleV0gPSBvcGFxdWVTZXRCYWNrZ3JvdW5kO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHRba2V5XSA9IGNvbmZpZ1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1hcCBwbG90M2RQaXhlbFJhdGlvIHRvIHBsb3RHbFBpeGVsUmF0aW8gZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcbiAgICAgICAgaWYoY29uZmlnLnBsb3QzZFBpeGVsUmF0aW8gJiYgIWNvbnRleHQucGxvdEdsUGl4ZWxSYXRpbykge1xuICAgICAgICAgICAgY29udGV4dC5wbG90R2xQaXhlbFJhdGlvID0gY29udGV4dC5wbG90M2RQaXhlbFJhdGlvO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gbm93IGRlYWwgd2l0aCBlZGl0YWJsZSBhbmQgZWRpdHMgLSBmaXJzdCBlZGl0YWJsZSBvdmVycmlkZXNcbiAgICAgICAgLy8gZXZlcnl0aGluZywgdGhlbiBlZGl0cyByZWZpbmVzXG4gICAgICAgIHZhciBlZGl0YWJsZSA9IGNvbmZpZy5lZGl0YWJsZTtcbiAgICAgICAgaWYoZWRpdGFibGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgLy8gd2UncmUgbm90IGdvaW5nIHRvICp1c2UqIGNvbnRleHQuZWRpdGFibGUsIHdlJ3JlIG9ubHkgZ29pbmcgdG9cbiAgICAgICAgICAgIC8vIHVzZSBjb250ZXh0LmVkaXRzLi4uIGJ1dCBrZWVwIGl0IGZvciB0aGUgcmVjb3JkXG4gICAgICAgICAgICBjb250ZXh0LmVkaXRhYmxlID0gZWRpdGFibGU7XG5cbiAgICAgICAgICAgIGtleXMgPSBPYmplY3Qua2V5cyhjb250ZXh0LmVkaXRzKTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBjb250ZXh0LmVkaXRzW2tleXNbaV1dID0gZWRpdGFibGU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgaWYoY29uZmlnLmVkaXRzKSB7XG4gICAgICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMoY29uZmlnLmVkaXRzKTtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBrZXkgPSBrZXlzW2ldO1xuICAgICAgICAgICAgICAgIGlmKGtleSBpbiBjb250ZXh0LmVkaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZWRpdHNba2V5XSA9IGNvbmZpZy5lZGl0c1trZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG5vdCBwYXJ0IG9mIHRoZSB1c2VyLWZhY2luZyBjb25maWcgb3B0aW9uc1xuICAgICAgICBjb250ZXh0Ll9leHBvcnRlZFBsb3QgPSBjb25maWcuX2V4cG9ydGVkUGxvdDtcbiAgICB9XG5cbiAgICAvLyBzdGF0aWNQbG90IGZvcmNlcyBhIGJ1bmNoIG9mIG90aGVyczpcbiAgICBpZihjb250ZXh0LnN0YXRpY1Bsb3QpIHtcbiAgICAgICAgY29udGV4dC5lZGl0YWJsZSA9IGZhbHNlO1xuICAgICAgICBjb250ZXh0LmVkaXRzID0ge307XG4gICAgICAgIGNvbnRleHQuYXV0b3NpemFibGUgPSBmYWxzZTtcbiAgICAgICAgY29udGV4dC5zY3JvbGxab29tID0gZmFsc2U7XG4gICAgICAgIGNvbnRleHQuZG91YmxlQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgY29udGV4dC5zaG93VGlwcyA9IGZhbHNlO1xuICAgICAgICBjb250ZXh0LnNob3dMaW5rID0gZmFsc2U7XG4gICAgICAgIGNvbnRleHQuZGlzcGxheU1vZGVCYXIgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBtYWtlIHN1cmUgaG92ZXItb25seSBkZXZpY2VzIGhhdmUgbW9kZSBiYXIgdmlzaWJsZVxuICAgIGlmKGNvbnRleHQuZGlzcGxheU1vZGVCYXIgPT09ICdob3ZlcicgJiYgIWhhc0hvdmVyKSB7XG4gICAgICAgIGNvbnRleHQuZGlzcGxheU1vZGVCYXIgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIGRlZmF1bHQgYW5kIGZhbGxiYWNrIGZvciBzZXRCYWNrZ3JvdW5kXG4gICAgaWYoY29udGV4dC5zZXRCYWNrZ3JvdW5kID09PSAndHJhbnNwYXJlbnQnIHx8IHR5cGVvZiBjb250ZXh0LnNldEJhY2tncm91bmQgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgY29udGV4dC5zZXRCYWNrZ3JvdW5kID0gc2V0QmFja2dyb3VuZDtcbiAgICB9XG5cbiAgICAvLyBDaGVjayBpZiBnZCBoYXMgYSBzcGVjaWZpZWQgd2lkaHQvaGVpZ2h0IHRvIGJlZ2luIHdpdGhcbiAgICBjb250ZXh0Ll9oYXNaZXJvSGVpZ2h0ID0gY29udGV4dC5faGFzWmVyb0hlaWdodCB8fCBnZC5jbGllbnRIZWlnaHQgPT09IDA7XG4gICAgY29udGV4dC5faGFzWmVyb1dpZHRoID0gY29udGV4dC5faGFzWmVyb1dpZHRoIHx8IGdkLmNsaWVudFdpZHRoID09PSAwO1xuXG4gICAgLy8gZmlsbCBjb250ZXh0Ll9zY3JvbGxab29tIGhlbHBlciB0byBoZWxwIG1hbmFnZSBzY3JvbGxab29tIGZsYWdsaXN0XG4gICAgdmFyIHN6SW4gPSBjb250ZXh0LnNjcm9sbFpvb207XG4gICAgdmFyIHN6T3V0ID0gY29udGV4dC5fc2Nyb2xsWm9vbSA9IHt9O1xuICAgIGlmKHN6SW4gPT09IHRydWUpIHtcbiAgICAgICAgc3pPdXQuY2FydGVzaWFuID0gMTtcbiAgICAgICAgc3pPdXQuZ2wzZCA9IDE7XG4gICAgICAgIHN6T3V0LmdlbyA9IDE7XG4gICAgICAgIHN6T3V0Lm1hcGJveCA9IDE7XG4gICAgfSBlbHNlIGlmKHR5cGVvZiBzekluID09PSAnc3RyaW5nJykge1xuICAgICAgICB2YXIgcGFydHMgPSBzekluLnNwbGl0KCcrJyk7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzek91dFtwYXJ0c1tpXV0gPSAxO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKHN6SW4gIT09IGZhbHNlKSB7XG4gICAgICAgIHN6T3V0LmdsM2QgPSAxO1xuICAgICAgICBzek91dC5nZW8gPSAxO1xuICAgICAgICBzek91dC5tYXBib3ggPSAxO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcGxvdExlZ2FjeVBvbGFyKGdkLCBkYXRhLCBsYXlvdXQpIHtcbiAgICAvLyBidWlsZCBvciByZXVzZSB0aGUgY29udGFpbmVyIHNrZWxldG9uXG4gICAgdmFyIHBsb3RDb250YWluZXIgPSBkMy5zZWxlY3QoZ2QpLnNlbGVjdEFsbCgnLnBsb3QtY29udGFpbmVyJylcbiAgICAgICAgLmRhdGEoWzBdKTtcbiAgICBwbG90Q29udGFpbmVyLmVudGVyKClcbiAgICAgICAgLmluc2VydCgnZGl2JywgJzpmaXJzdC1jaGlsZCcpXG4gICAgICAgIC5jbGFzc2VkKCdwbG90LWNvbnRhaW5lciBwbG90bHknLCB0cnVlKTtcbiAgICB2YXIgcGFwZXJEaXYgPSBwbG90Q29udGFpbmVyLnNlbGVjdEFsbCgnLnN2Zy1jb250YWluZXInKVxuICAgICAgICAuZGF0YShbMF0pO1xuICAgIHBhcGVyRGl2LmVudGVyKCkuYXBwZW5kKCdkaXYnKVxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRhaW5lcicsIHRydWUpXG4gICAgICAgIC5zdHlsZSgncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblxuICAgIC8vIGVtcHR5IGl0IGV2ZXJ5dGltZSBmb3Igbm93XG4gICAgcGFwZXJEaXYuaHRtbCgnJyk7XG5cbiAgICAvLyBmdWxmaWxsIGdkIHJlcXVpcmVtZW50c1xuICAgIGlmKGRhdGEpIGdkLmRhdGEgPSBkYXRhO1xuICAgIGlmKGxheW91dCkgZ2QubGF5b3V0ID0gbGF5b3V0O1xuICAgIFBvbGFyLm1hbmFnZXIuZmlsbExheW91dChnZCk7XG5cbiAgICAvLyByZXNpemUgY2FudmFzXG4gICAgcGFwZXJEaXYuc3R5bGUoe1xuICAgICAgICB3aWR0aDogZ2QuX2Z1bGxMYXlvdXQud2lkdGggKyAncHgnLFxuICAgICAgICBoZWlnaHQ6IGdkLl9mdWxsTGF5b3V0LmhlaWdodCArICdweCdcbiAgICB9KTtcblxuICAgIC8vIGluc3RhbnRpYXRlIGZyYW1ld29ya1xuICAgIGdkLmZyYW1ld29yayA9IFBvbGFyLm1hbmFnZXIuZnJhbWV3b3JrKGdkKTtcblxuICAgIC8vIHBsb3RcbiAgICBnZC5mcmFtZXdvcmsoe2RhdGE6IGdkLmRhdGEsIGxheW91dDogZ2QubGF5b3V0fSwgcGFwZXJEaXYubm9kZSgpKTtcblxuICAgIC8vIHNldCB1bmRvIHBvaW50XG4gICAgZ2QuZnJhbWV3b3JrLnNldFVuZG9Qb2ludCgpO1xuXG4gICAgLy8gZ2V0IHRoZSByZXN1bHRpbmcgc3ZnIGZvciBleHRlbmRpbmcgaXRcbiAgICB2YXIgcG9sYXJQbG90U1ZHID0gZ2QuZnJhbWV3b3JrLnN2ZygpO1xuXG4gICAgLy8gZWRpdGFibGUgdGl0bGVcbiAgICB2YXIgb3BhY2l0eSA9IDE7XG4gICAgdmFyIHR4dCA9IGdkLl9mdWxsTGF5b3V0LnRpdGxlID8gZ2QuX2Z1bGxMYXlvdXQudGl0bGUudGV4dCA6ICcnO1xuICAgIGlmKHR4dCA9PT0gJycgfHwgIXR4dCkgb3BhY2l0eSA9IDA7XG5cbiAgICB2YXIgdGl0bGVMYXlvdXQgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGhpcy5jYWxsKHN2Z1RleHRVdGlscy5jb252ZXJ0VG9Uc3BhbnMsIGdkKTtcbiAgICAgICAgLy8gVE9ETzogaHRtbC9tYXRoamF4XG4gICAgICAgIC8vIFRPRE86IGNlbnRlciB0aXRsZVxuICAgIH07XG5cbiAgICB2YXIgdGl0bGUgPSBwb2xhclBsb3RTVkcuc2VsZWN0KCcudGl0bGUtZ3JvdXAgdGV4dCcpXG4gICAgICAgIC5jYWxsKHRpdGxlTGF5b3V0KTtcblxuICAgIGlmKGdkLl9jb250ZXh0LmVkaXRzLnRpdGxlVGV4dCkge1xuICAgICAgICB2YXIgcGxhY2Vob2xkZXJUZXh0ID0gTGliLl8oZ2QsICdDbGljayB0byBlbnRlciBQbG90IHRpdGxlJyk7XG4gICAgICAgIGlmKCF0eHQgfHwgdHh0ID09PSBwbGFjZWhvbGRlclRleHQpIHtcbiAgICAgICAgICAgIG9wYWNpdHkgPSAwLjI7XG4gICAgICAgICAgICAvLyBwbGFjZWhvbGRlciBpcyBub3QgZ29pbmcgdGhyb3VnaCBjb252ZXJ0VG9Uc3BhbnNcbiAgICAgICAgICAgIC8vIHNvIG5lZWRzIGV4cGxpY2l0IGRhdGEtdW5mb3JtYXR0ZWRcbiAgICAgICAgICAgIHRpdGxlLmF0dHIoeydkYXRhLXVuZm9ybWF0dGVkJzogcGxhY2Vob2xkZXJUZXh0fSlcbiAgICAgICAgICAgICAgICAudGV4dChwbGFjZWhvbGRlclRleHQpXG4gICAgICAgICAgICAgICAgLnN0eWxlKHtvcGFjaXR5OiBvcGFjaXR5fSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3Zlci5vcGFjaXR5JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50cmFuc2l0aW9uKCkuZHVyYXRpb24oMTAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMSk7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAub24oJ21vdXNlb3V0Lm9wYWNpdHknLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLnRyYW5zaXRpb24oKS5kdXJhdGlvbigxMDAwKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgc2V0Q29udGVudGVkaXRhYmxlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGlzLmNhbGwoc3ZnVGV4dFV0aWxzLm1ha2VFZGl0YWJsZSwge2dkOiBnZH0pXG4gICAgICAgICAgICAgICAgLm9uKCdlZGl0JywgZnVuY3Rpb24odGV4dCkge1xuICAgICAgICAgICAgICAgICAgICBnZC5mcmFtZXdvcmsoe2xheW91dDoge3RpdGxlOiB7dGV4dDogdGV4dH19fSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGV4dCh0ZXh0KVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhbGwodGl0bGVMYXlvdXQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbGwoc2V0Q29udGVudGVkaXRhYmxlKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5vbignY2FuY2VsJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0eHQgPSB0aGlzLmF0dHIoJ2RhdGEtdW5mb3JtYXR0ZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50ZXh0KHR4dCkuY2FsbCh0aXRsZUxheW91dCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHRpdGxlLmNhbGwoc2V0Q29udGVudGVkaXRhYmxlKTtcbiAgICB9XG5cbiAgICBnZC5fY29udGV4dC5zZXRCYWNrZ3JvdW5kKGdkLCBnZC5fZnVsbExheW91dC5wYXBlcl9iZ2NvbG9yKTtcbiAgICBQbG90cy5hZGRMaW5rcyhnZCk7XG5cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG59XG5cbi8vIGNvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIGZvcmNlIGEgZnVsbCByZWRyYXcsIG1vc3RseSBmb3IgdXNlIGJ5IHBsb3RseS5qc1xuZnVuY3Rpb24gcmVkcmF3KGdkKSB7XG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuXG4gICAgaWYoIUxpYi5pc1Bsb3REaXYoZ2QpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBlbGVtZW50IGlzIG5vdCBhIFBsb3RseSBwbG90OiAnICsgZ2QpO1xuICAgIH1cblxuICAgIGhlbHBlcnMuY2xlYW5EYXRhKGdkLmRhdGEpO1xuICAgIGhlbHBlcnMuY2xlYW5MYXlvdXQoZ2QubGF5b3V0KTtcblxuICAgIGdkLmNhbGNkYXRhID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiBleHBvcnRzLnBsb3QoZ2QpLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9yZWRyYXcnKTtcbiAgICAgICAgcmV0dXJuIGdkO1xuICAgIH0pO1xufVxuXG4vKipcbiAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIHRvIG1ha2UgaWRlbXBvdGVudCBwbG90IG9wdGlvbiBvYnZpb3VzIHRvIHVzZXJzLlxuICpcbiAqIEBwYXJhbSBnZFxuICogQHBhcmFtIHtPYmplY3RbXX0gZGF0YVxuICogQHBhcmFtIHtPYmplY3R9IGxheW91dFxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZ1xuICovXG5mdW5jdGlvbiBuZXdQbG90KGdkLCBkYXRhLCBsYXlvdXQsIGNvbmZpZykge1xuICAgIGdkID0gTGliLmdldEdyYXBoRGl2KGdkKTtcblxuICAgIC8vIHJlbW92ZSBnbCBjb250ZXh0c1xuICAgIFBsb3RzLmNsZWFuUGxvdChbXSwge30sIGdkLl9mdWxsRGF0YSB8fCBbXSwgZ2QuX2Z1bGxMYXlvdXQgfHwge30pO1xuXG4gICAgUGxvdHMucHVyZ2UoZ2QpO1xuICAgIHJldHVybiBleHBvcnRzLnBsb3QoZ2QsIGRhdGEsIGxheW91dCwgY29uZmlnKTtcbn1cblxuLyoqXG4gKiBXcmFwIG5lZ2F0aXZlIGluZGljaWVzIHRvIHRoZWlyIHBvc2l0aXZlIGNvdW50ZXJwYXJ0cy5cbiAqXG4gKiBAcGFyYW0ge051bWJlcltdfSBpbmRpY2VzIEFuIGFycmF5IG9mIGluZGljZXNcbiAqIEBwYXJhbSB7TnVtYmVyfSBtYXhJbmRleCBUaGUgbWF4aW11bSBpbmRleCBhbGxvd2FibGUgKGFyci5sZW5ndGggLSAxKVxuICovXG5mdW5jdGlvbiBwb3NpdGl2aWZ5SW5kaWNlcyhpbmRpY2VzLCBtYXhJbmRleCkge1xuICAgIHZhciBwYXJlbnRMZW5ndGggPSBtYXhJbmRleCArIDE7XG4gICAgdmFyIHBvc2l0aXZlSW5kaWNlcyA9IFtdO1xuICAgIHZhciBpO1xuICAgIHZhciBpbmRleDtcblxuICAgIGZvcihpID0gMDsgaSA8IGluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW5kZXggPSBpbmRpY2VzW2ldO1xuICAgICAgICBpZihpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHBvc2l0aXZlSW5kaWNlcy5wdXNoKHBhcmVudExlbmd0aCArIGluZGV4KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHBvc2l0aXZlSW5kaWNlcy5wdXNoKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcG9zaXRpdmVJbmRpY2VzO1xufVxuXG4vKipcbiAqIEVuc3VyZXMgdGhhdCBhbiBpbmRleCBhcnJheSBmb3IgbWFuaXB1bGF0aW5nIGdkLmRhdGEgaXMgdmFsaWQuXG4gKlxuICogSW50ZW5kZWQgZm9yIHVzZSB3aXRoIGFkZFRyYWNlcywgZGVsZXRlVHJhY2VzLCBhbmQgbW92ZVRyYWNlcy5cbiAqXG4gKiBAcGFyYW0gZ2RcbiAqIEBwYXJhbSBpbmRpY2VzXG4gKiBAcGFyYW0gYXJyYXlOYW1lXG4gKi9cbmZ1bmN0aW9uIGFzc2VydEluZGV4QXJyYXkoZ2QsIGluZGljZXMsIGFycmF5TmFtZSkge1xuICAgIHZhciBpLFxuICAgICAgICBpbmRleDtcblxuICAgIGZvcihpID0gMDsgaSA8IGluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaW5kZXggPSBpbmRpY2VzW2ldO1xuXG4gICAgICAgIC8vIHZhbGlkYXRlIHRoYXQgaW5kaWNlcyBhcmUgaW5kZWVkIGludGVnZXJzXG4gICAgICAgIGlmKGluZGV4ICE9PSBwYXJzZUludChpbmRleCwgMTApKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FsbCB2YWx1ZXMgaW4gJyArIGFycmF5TmFtZSArICcgbXVzdCBiZSBpbnRlZ2VycycpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgdGhhdCBhbGwgaW5kaWNlcyBhcmUgaW4gYm91bmRzIGZvciBnaXZlbiBnZC5kYXRhIGFycmF5IGxlbmd0aFxuICAgICAgICBpZihpbmRleCA+PSBnZC5kYXRhLmxlbmd0aCB8fCBpbmRleCA8IC1nZC5kYXRhLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGFycmF5TmFtZSArICcgbXVzdCBiZSB2YWxpZCBpbmRpY2VzIGZvciBnZC5kYXRhLicpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgdGhhdCBpbmRpY2VzIGFyZW4ndCByZXBlYXRlZFxuICAgICAgICBpZihpbmRpY2VzLmluZGV4T2YoaW5kZXgsIGkgKyAxKSA+IC0xIHx8XG4gICAgICAgICAgICAgICAgaW5kZXggPj0gMCAmJiBpbmRpY2VzLmluZGV4T2YoLWdkLmRhdGEubGVuZ3RoICsgaW5kZXgpID4gLTEgfHxcbiAgICAgICAgICAgICAgICBpbmRleCA8IDAgJiYgaW5kaWNlcy5pbmRleE9mKGdkLmRhdGEubGVuZ3RoICsgaW5kZXgpID4gLTEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZWFjaCBpbmRleCBpbiAnICsgYXJyYXlOYW1lICsgJyBtdXN0IGJlIHVuaXF1ZS4nKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBQcml2YXRlIGZ1bmN0aW9uIHVzZWQgYnkgUGxvdGx5Lm1vdmVUcmFjZXMgdG8gY2hlY2sgaW5wdXQgYXJnc1xuICpcbiAqIEBwYXJhbSBnZFxuICogQHBhcmFtIGN1cnJlbnRJbmRpY2VzXG4gKiBAcGFyYW0gbmV3SW5kaWNlc1xuICovXG5mdW5jdGlvbiBjaGVja01vdmVUcmFjZXNBcmdzKGdkLCBjdXJyZW50SW5kaWNlcywgbmV3SW5kaWNlcykge1xuICAgIC8vIGNoZWNrIHRoYXQgZ2QgaGFzIGF0dHJpYnV0ZSAnZGF0YScgYW5kICdkYXRhJyBpcyBhcnJheVxuICAgIGlmKCFBcnJheS5pc0FycmF5KGdkLmRhdGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2QuZGF0YSBtdXN0IGJlIGFuIGFycmF5LicpO1xuICAgIH1cblxuICAgIC8vIHZhbGlkYXRlIGN1cnJlbnRJbmRpY2VzIGFycmF5XG4gICAgaWYodHlwZW9mIGN1cnJlbnRJbmRpY2VzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2N1cnJlbnRJbmRpY2VzIGlzIGEgcmVxdWlyZWQgYXJndW1lbnQuJyk7XG4gICAgfSBlbHNlIGlmKCFBcnJheS5pc0FycmF5KGN1cnJlbnRJbmRpY2VzKSkge1xuICAgICAgICBjdXJyZW50SW5kaWNlcyA9IFtjdXJyZW50SW5kaWNlc107XG4gICAgfVxuICAgIGFzc2VydEluZGV4QXJyYXkoZ2QsIGN1cnJlbnRJbmRpY2VzLCAnY3VycmVudEluZGljZXMnKTtcblxuICAgIC8vIHZhbGlkYXRlIG5ld0luZGljZXMgYXJyYXkgaWYgaXQgZXhpc3RzXG4gICAgaWYodHlwZW9mIG5ld0luZGljZXMgIT09ICd1bmRlZmluZWQnICYmICFBcnJheS5pc0FycmF5KG5ld0luZGljZXMpKSB7XG4gICAgICAgIG5ld0luZGljZXMgPSBbbmV3SW5kaWNlc107XG4gICAgfVxuICAgIGlmKHR5cGVvZiBuZXdJbmRpY2VzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBhc3NlcnRJbmRleEFycmF5KGdkLCBuZXdJbmRpY2VzLCAnbmV3SW5kaWNlcycpO1xuICAgIH1cblxuICAgIC8vIGNoZWNrIGN1cnJlbnRJbmRpY2VzIGFuZCBuZXdJbmRpY2VzIGFyZSB0aGUgc2FtZSBsZW5ndGggaWYgbmV3SWRpY2VzIGV4aXN0c1xuICAgIGlmKHR5cGVvZiBuZXdJbmRpY2VzICE9PSAndW5kZWZpbmVkJyAmJiBjdXJyZW50SW5kaWNlcy5sZW5ndGggIT09IG5ld0luZGljZXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignY3VycmVudCBhbmQgbmV3IGluZGljZXMgbXVzdCBiZSBvZiBlcXVhbCBsZW5ndGguJyk7XG4gICAgfVxufVxuLyoqXG4gKiBBIHByaXZhdGUgZnVuY3Rpb24gdG8gcmVkdWNlIHRoZSB0eXBlIGNoZWNraW5nIGNsdXR0ZXIgaW4gYWRkVHJhY2VzLlxuICpcbiAqIEBwYXJhbSBnZFxuICogQHBhcmFtIHRyYWNlc1xuICogQHBhcmFtIG5ld0luZGljZXNcbiAqL1xuZnVuY3Rpb24gY2hlY2tBZGRUcmFjZXNBcmdzKGdkLCB0cmFjZXMsIG5ld0luZGljZXMpIHtcbiAgICB2YXIgaSwgdmFsdWU7XG5cbiAgICAvLyBjaGVjayB0aGF0IGdkIGhhcyBhdHRyaWJ1dGUgJ2RhdGEnIGFuZCAnZGF0YScgaXMgYXJyYXlcbiAgICBpZighQXJyYXkuaXNBcnJheShnZC5kYXRhKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dkLmRhdGEgbXVzdCBiZSBhbiBhcnJheS4nKTtcbiAgICB9XG5cbiAgICAvLyBtYWtlIHN1cmUgdHJhY2VzIGV4aXN0c1xuICAgIGlmKHR5cGVvZiB0cmFjZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndHJhY2VzIG11c3QgYmUgZGVmaW5lZC4nKTtcbiAgICB9XG5cbiAgICAvLyBtYWtlIHN1cmUgdHJhY2VzIGlzIGFuIGFycmF5XG4gICAgaWYoIUFycmF5LmlzQXJyYXkodHJhY2VzKSkge1xuICAgICAgICB0cmFjZXMgPSBbdHJhY2VzXTtcbiAgICB9XG5cbiAgICAvLyBtYWtlIHN1cmUgZWFjaCB2YWx1ZSBpbiB0cmFjZXMgaXMgYW4gb2JqZWN0XG4gICAgZm9yKGkgPSAwOyBpIDwgdHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhbHVlID0gdHJhY2VzW2ldO1xuICAgICAgICBpZih0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnIHx8IChBcnJheS5pc0FycmF5KHZhbHVlKSB8fCB2YWx1ZSA9PT0gbnVsbCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignYWxsIHZhbHVlcyBpbiB0cmFjZXMgYXJyYXkgbXVzdCBiZSBub24tYXJyYXkgb2JqZWN0cycpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbWFrZSBzdXJlIHdlIGhhdmUgYW4gaW5kZXggZm9yIGVhY2ggdHJhY2VcbiAgICBpZih0eXBlb2YgbmV3SW5kaWNlcyAhPT0gJ3VuZGVmaW5lZCcgJiYgIUFycmF5LmlzQXJyYXkobmV3SW5kaWNlcykpIHtcbiAgICAgICAgbmV3SW5kaWNlcyA9IFtuZXdJbmRpY2VzXTtcbiAgICB9XG4gICAgaWYodHlwZW9mIG5ld0luZGljZXMgIT09ICd1bmRlZmluZWQnICYmIG5ld0luZGljZXMubGVuZ3RoICE9PSB0cmFjZXMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdpZiBpbmRpY2VzIGlzIHNwZWNpZmllZCwgdHJhY2VzLmxlbmd0aCBtdXN0IGVxdWFsIGluZGljZXMubGVuZ3RoJ1xuICAgICAgICApO1xuICAgIH1cbn1cblxuLyoqXG4gKiBBIHByaXZhdGUgZnVuY3Rpb24gdG8gcmVkdWNlIHRoZSB0eXBlIGNoZWNraW5nIGNsdXR0ZXIgaW4gc3BsaWNlVHJhY2VzLlxuICogR2V0IGFsbCB1cGRhdGUgUHJvcGVydGllcyBmcm9tIGdkLmRhdGEuIFZhbGlkYXRlIGlucHV0cyBhbmQgb3V0cHV0cy5cbiAqIFVzZWQgYnkgcHJlcGVuZFRyYWNlIGFuZCBleHRlbmRUcmFjZXNcbiAqXG4gKiBAcGFyYW0gZ2RcbiAqIEBwYXJhbSB1cGRhdGVcbiAqIEBwYXJhbSBpbmRpY2VzXG4gKiBAcGFyYW0gbWF4UG9pbnRzXG4gKi9cbmZ1bmN0aW9uIGFzc2VydEV4dGVuZFRyYWNlc0FyZ3MoZ2QsIHVwZGF0ZSwgaW5kaWNlcywgbWF4UG9pbnRzKSB7XG4gICAgdmFyIG1heFBvaW50c0lzT2JqZWN0ID0gTGliLmlzUGxhaW5PYmplY3QobWF4UG9pbnRzKTtcblxuICAgIGlmKCFBcnJheS5pc0FycmF5KGdkLmRhdGEpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2QuZGF0YSBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgfVxuICAgIGlmKCFMaWIuaXNQbGFpbk9iamVjdCh1cGRhdGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigndXBkYXRlIG11c3QgYmUgYSBrZXk6dmFsdWUgb2JqZWN0Jyk7XG4gICAgfVxuXG4gICAgaWYodHlwZW9mIGluZGljZXMgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignaW5kaWNlcyBtdXN0IGJlIGFuIGludGVnZXIgb3IgYXJyYXkgb2YgaW50ZWdlcnMnKTtcbiAgICB9XG5cbiAgICBhc3NlcnRJbmRleEFycmF5KGdkLCBpbmRpY2VzLCAnaW5kaWNlcycpO1xuXG4gICAgZm9yKHZhciBrZXkgaW4gdXBkYXRlKSB7XG4gICAgICAgIC8qXG4gICAgICAgICAqIFZlcmlmeSB0aGF0IHRoZSBhdHRyaWJ1dGUgdG8gYmUgdXBkYXRlZCBjb250YWlucyBhcyBtYW55IHRyYWNlIHVwZGF0ZXNcbiAgICAgICAgICogYXMgaW5kaWNlcy4gRmFpbHVyZSBtdXN0IHJlc3VsdCBpbiB0aHJvdyBhbmQgbm8tb3BcbiAgICAgICAgICovXG4gICAgICAgIGlmKCFBcnJheS5pc0FycmF5KHVwZGF0ZVtrZXldKSB8fCB1cGRhdGVba2V5XS5sZW5ndGggIT09IGluZGljZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0dHJpYnV0ZSAnICsga2V5ICsgJyBtdXN0IGJlIGFuIGFycmF5IG9mIGxlbmd0aCBlcXVhbCB0byBpbmRpY2VzIGFycmF5IGxlbmd0aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgLypcbiAgICAgICAgICogaWYgbWF4UG9pbnRzIGlzIGFuIG9iamVjdCBpdCBtdXN0IG1hdGNoIGtleXMgYW5kIGFycmF5IGxlbmd0aHMgb2YgJ3VwZGF0ZScgMToxXG4gICAgICAgICAqL1xuICAgICAgICBpZihtYXhQb2ludHNJc09iamVjdCAmJlxuICAgICAgICAgICAgKCEoa2V5IGluIG1heFBvaW50cykgfHwgIUFycmF5LmlzQXJyYXkobWF4UG9pbnRzW2tleV0pIHx8XG4gICAgICAgICAgICBtYXhQb2ludHNba2V5XS5sZW5ndGggIT09IHVwZGF0ZVtrZXldLmxlbmd0aCkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignd2hlbiBtYXhQb2ludHMgaXMgc2V0IGFzIGEga2V5OnZhbHVlIG9iamVjdCBpdCBtdXN0IGNvbnRhaW4gYSAxOjEgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ2NvcnJpc3BvbmRlbmNlIHdpdGggdGhlIGtleXMgYW5kIG51bWJlciBvZiB0cmFjZXMgaW4gdGhlIHVwZGF0ZSBvYmplY3QnKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBIHByaXZhdGUgZnVuY3Rpb24gdG8gcmVkdWNlIHRoZSB0eXBlIGNoZWNraW5nIGNsdXR0ZXIgaW4gc3BsaWNlVHJhY2VzLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEhUTUxEaXZFbGVtZW50fSBnZFxuICogQHBhcmFtIHtPYmplY3R9IHVwZGF0ZVxuICogQHBhcmFtIHtOdW1iZXJbXX0gaW5kaWNlc1xuICogQHBhcmFtIHtOdW1iZXJ8fE9iamVjdH0gbWF4UG9pbnRzXG4gKiBAcmV0dXJuIHtPYmplY3RbXX1cbiAqL1xuZnVuY3Rpb24gZ2V0RXh0ZW5kUHJvcGVydGllcyhnZCwgdXBkYXRlLCBpbmRpY2VzLCBtYXhQb2ludHMpIHtcbiAgICB2YXIgbWF4UG9pbnRzSXNPYmplY3QgPSBMaWIuaXNQbGFpbk9iamVjdChtYXhQb2ludHMpO1xuICAgIHZhciB1cGRhdGVQcm9wcyA9IFtdO1xuICAgIHZhciB0cmFjZSwgdGFyZ2V0LCBwcm9wLCBpbnNlcnQsIG1heHA7XG5cbiAgICAvLyBhbGxvdyBzY2FsYXIgaW5kZXggdG8gcmVwcmVzZW50IGEgc2luZ2xlIHRyYWNlIHBvc2l0aW9uXG4gICAgaWYoIUFycmF5LmlzQXJyYXkoaW5kaWNlcykpIGluZGljZXMgPSBbaW5kaWNlc107XG5cbiAgICAvLyBuZWdhdGl2ZSBpbmRpY2VzIGFyZSB3cmFwcGVkIGFyb3VuZCB0byB0aGVpciBwb3NpdGl2ZSB2YWx1ZS4gRXF1aXZhbGVudCB0byBweXRob24gaW5kZXhpbmcuXG4gICAgaW5kaWNlcyA9IHBvc2l0aXZpZnlJbmRpY2VzKGluZGljZXMsIGdkLmRhdGEubGVuZ3RoIC0gMSk7XG5cbiAgICAvLyBsb29wIHRocm91Z2ggYWxsIHVwZGF0ZSBrZXlzIGFuZCB0cmFjZXMgYW5kIGhhcnZlc3QgdmFsaWRhdGVkIGRhdGEuXG4gICAgZm9yKHZhciBrZXkgaW4gdXBkYXRlKSB7XG4gICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBpbmRpY2VzLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogQ2hvb3NlIHRoZSB0cmFjZSBpbmRleGVkIGJ5IHRoZSBpbmRpY2VzIG1hcCBhcmd1bWVudCBhbmQgZ2V0IHRoZSBwcm9wIHNldHRlci1nZXR0ZXJcbiAgICAgICAgICAgICAqIGluc3RhbmNlIHRoYXQgcmVmZXJlbmNlcyB0aGUga2V5IGFuZCB2YWx1ZSBmb3IgdGhpcyBwYXJ0aWN1bGFyIHRyYWNlLlxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0cmFjZSA9IGdkLmRhdGFbaW5kaWNlc1tqXV07XG4gICAgICAgICAgICBwcm9wID0gbmVzdGVkUHJvcGVydHkodHJhY2UsIGtleSk7XG5cbiAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgKiBUYXJnZXQgaXMgdGhlIGV4aXN0aW5nIGdkLmRhdGEudHJhY2UuZGF0YUFycmF5IHZhbHVlIGxpa2UgXCJ4XCIgb3IgXCJtYXJrZXIuc2l6ZVwiXG4gICAgICAgICAgICAgKiBUYXJnZXQgbXVzdCBleGlzdCBhcyBhbiBBcnJheSB0byBhbGxvdyB0aGUgZXh0ZW5kIG9wZXJhdGlvbiB0byBiZSBwZXJmb3JtZWQuXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRhcmdldCA9IHByb3AuZ2V0KCk7XG4gICAgICAgICAgICBpbnNlcnQgPSB1cGRhdGVba2V5XVtqXTtcblxuICAgICAgICAgICAgaWYoIUxpYi5pc0FycmF5T3JUeXBlZEFycmF5KGluc2VydCkpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2F0dHJpYnV0ZTogJyArIGtleSArICcgaW5kZXg6ICcgKyBqICsgJyBtdXN0IGJlIGFuIGFycmF5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZighTGliLmlzQXJyYXlPclR5cGVkQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGV4dGVuZCBtaXNzaW5nIG9yIG5vbi1hcnJheSBhdHRyaWJ1dGU6ICcgKyBrZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYodGFyZ2V0LmNvbnN0cnVjdG9yICE9PSBpbnNlcnQuY29uc3RydWN0b3IpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Nhbm5vdCBleHRlbmQgYXJyYXkgd2l0aCBhbiBhcnJheSBvZiBhIGRpZmZlcmVudCB0eXBlOiAnICsga2V5KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAqIG1heFBvaW50cyBtYXkgYmUgYW4gb2JqZWN0IG1hcCBvciBhIHNjYWxhci4gSWYgb2JqZWN0IHNlbGVjdCB0aGUga2V5OnZhbHVlLCBlbHNlXG4gICAgICAgICAgICAgKiBVc2UgdGhlIHNjYWxhciBtYXhQb2ludHMgZm9yIGFsbCBrZXkgYW5kIHRyYWNlIGNvbWJpbmF0aW9ucy5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgbWF4cCA9IG1heFBvaW50c0lzT2JqZWN0ID8gbWF4UG9pbnRzW2tleV1bal0gOiBtYXhQb2ludHM7XG5cbiAgICAgICAgICAgIC8vIGNvdWxkIGhhdmUgY2hvc2VuIG51bGwgaGVyZSwgLTEganVzdCB0ZWxscyB1cyB0byBub3QgdGFrZSBhIHdpbmRvd1xuICAgICAgICAgICAgaWYoIWlzTnVtZXJpYyhtYXhwKSkgbWF4cCA9IC0xO1xuXG4gICAgICAgICAgICAvKlxuICAgICAgICAgICAgICogV3JhcCB0aGUgbmVzdGVkUHJvcGVydHkgaW4gYW4gb2JqZWN0IGNvbnRhaW5pbmcgcmVxdWlyZWQgZGF0YVxuICAgICAgICAgICAgICogZm9yIGxlbmd0aGVuaW5nIGFuZCB3aW5kb3dpbmcgdGhpcyBwYXJ0aWN1bGFyIHRyYWNlIC0ga2V5IGNvbWJpbmF0aW9uLlxuICAgICAgICAgICAgICogRmxvb3JpbmcgbWF4cCBtaXJyb3JzIHRoZSBiZWhhdmlvdXIgb2YgZmxvYXRzIGluIHRoZSBBcnJheS5zbGljZSBKU25hdGl2ZSBmdW5jdGlvbi5cbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdXBkYXRlUHJvcHMucHVzaCh7XG4gICAgICAgICAgICAgICAgcHJvcDogcHJvcCxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBpbnNlcnQ6IGluc2VydCxcbiAgICAgICAgICAgICAgICBtYXhwOiBNYXRoLmZsb29yKG1heHApXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGFsbCB0YXJnZXQgYW5kIGluc2VydGlvbiBkYXRhIG5vdyB2YWxpZGF0ZWRcbiAgICByZXR1cm4gdXBkYXRlUHJvcHM7XG59XG5cbi8qKlxuICogQSBwcml2YXRlIGZ1bmN0aW9uIHRvIGtleSBFeHRlbmQgYW5kIFByZXBlbmQgdHJhY2VzIERSWVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEhUTUxEaXZFbGVtZW50fSBnZFxuICogQHBhcmFtIHtPYmplY3R9IHVwZGF0ZVxuICogQHBhcmFtIHtOdW1iZXJbXX0gaW5kaWNlc1xuICogQHBhcmFtIHtOdW1iZXJ8fE9iamVjdH0gbWF4UG9pbnRzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSB1cGRhdGVBcnJheVxuICogQHJldHVybiB7T2JqZWN0fVxuICovXG5mdW5jdGlvbiBzcGxpY2VUcmFjZXMoZ2QsIHVwZGF0ZSwgaW5kaWNlcywgbWF4UG9pbnRzLCB1cGRhdGVBcnJheSkge1xuICAgIGFzc2VydEV4dGVuZFRyYWNlc0FyZ3MoZ2QsIHVwZGF0ZSwgaW5kaWNlcywgbWF4UG9pbnRzKTtcblxuICAgIHZhciB1cGRhdGVQcm9wcyA9IGdldEV4dGVuZFByb3BlcnRpZXMoZ2QsIHVwZGF0ZSwgaW5kaWNlcywgbWF4UG9pbnRzKTtcbiAgICB2YXIgdW5kb1VwZGF0ZSA9IHt9O1xuICAgIHZhciB1bmRvUG9pbnRzID0ge307XG5cbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgdXBkYXRlUHJvcHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHByb3AgPSB1cGRhdGVQcm9wc1tpXS5wcm9wO1xuICAgICAgICB2YXIgbWF4cCA9IHVwZGF0ZVByb3BzW2ldLm1heHA7XG5cbiAgICAgICAgLy8gcmV0dXJuIG5ldyBhcnJheSBhbmQgcmVtYWluZGVyXG4gICAgICAgIHZhciBvdXQgPSB1cGRhdGVBcnJheSh1cGRhdGVQcm9wc1tpXS50YXJnZXQsIHVwZGF0ZVByb3BzW2ldLmluc2VydCwgbWF4cCk7XG4gICAgICAgIHByb3Auc2V0KG91dFswXSk7XG5cbiAgICAgICAgLy8gYnVpbGQgdGhlIGludmVyc2UgdXBkYXRlIG9iamVjdCBmb3IgdGhlIHVuZG8gb3BlcmF0aW9uXG4gICAgICAgIGlmKCFBcnJheS5pc0FycmF5KHVuZG9VcGRhdGVbcHJvcC5hc3RyXSkpIHVuZG9VcGRhdGVbcHJvcC5hc3RyXSA9IFtdO1xuICAgICAgICB1bmRvVXBkYXRlW3Byb3AuYXN0cl0ucHVzaChvdXRbMV0pO1xuXG4gICAgICAgICAvLyBidWlsZCB0aGUgbWF0Y2hpbmcgbWF4UG9pbnRzIHVuZG8gb2JqZWN0IGNvbnRhaW5pbmcgb3JpZ2luYWwgdHJhY2UgbGVuZ3Roc1xuICAgICAgICBpZighQXJyYXkuaXNBcnJheSh1bmRvUG9pbnRzW3Byb3AuYXN0cl0pKSB1bmRvUG9pbnRzW3Byb3AuYXN0cl0gPSBbXTtcbiAgICAgICAgdW5kb1BvaW50c1twcm9wLmFzdHJdLnB1c2godXBkYXRlUHJvcHNbaV0udGFyZ2V0Lmxlbmd0aCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHt1cGRhdGU6IHVuZG9VcGRhdGUsIG1heFBvaW50czogdW5kb1BvaW50c307XG59XG5cbmZ1bmN0aW9uIGNvbmNhdFR5cGVkQXJyYXkoYXJyMCwgYXJyMSkge1xuICAgIHZhciBhcnIyID0gbmV3IGFycjAuY29uc3RydWN0b3IoYXJyMC5sZW5ndGggKyBhcnIxLmxlbmd0aCk7XG4gICAgYXJyMi5zZXQoYXJyMCk7XG4gICAgYXJyMi5zZXQoYXJyMSwgYXJyMC5sZW5ndGgpO1xuICAgIHJldHVybiBhcnIyO1xufVxuXG4vKipcbiAqIGV4dGVuZCAmJiBwcmVwZW5kIHRyYWNlcyBhdCBpbmRpY2VzIHdpdGggdXBkYXRlIGFycmF5cywgd2luZG93IHRyYWNlIGxlbmd0aHMgdG8gbWF4UG9pbnRzXG4gKlxuICogRXh0ZW5kIGFuZCBQcmVwZW5kIGhhdmUgaWRlbnRpY2FsIEFQSXMuIFByZXBlbmQgaW5zZXJ0cyBhbiBhcnJheSBhdCB0aGUgaGVhZCB3aGlsZSBFeHRlbmRcbiAqIGluc2VydHMgYW4gYXJyYXkgb2ZmIHRoZSB0YWlsLiBQcmVwZW5kIHRydW5jYXRlcyB0aGUgdGFpbCBvZiB0aGUgYXJyYXkgLSBjb3VudGluZyBtYXhQb2ludHNcbiAqIGZyb20gdGhlIGhlYWQsIHdoZXJlYXMgRXh0ZW5kIHRydW5jYXRlcyB0aGUgaGVhZCBvZiB0aGUgYXJyYXksIGNvdW50aW5nIGJhY2t3YXJkIG1heFBvaW50c1xuICogZnJvbSB0aGUgdGFpbC5cbiAqXG4gKiBJZiBtYXhQb2ludHMgaXMgdW5kZWZpbmVkLCBub25OdW1lcmljLCBuZWdhdGl2ZSBvciBncmVhdGVyIHRoYW4gZXh0ZW5kZWQgdHJhY2UgbGVuZ3RoIG5vXG4gKiB0cnVuY2F0aW9uIC8gd2luZG93aW5nIHdpbGwgYmUgcGVyZm9ybWVkLiBJZiBpdHMgemVybywgd2VsbCB0aGUgd2hvbGUgdHJhY2UgaXMgdHJ1bmNhdGVkLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEhUTUxEaXZFbGVtZW50fSBnZCBUaGUgZ3JhcGggZGl2XG4gKiBAcGFyYW0ge09iamVjdH0gdXBkYXRlIFRoZSBrZXk6YXJyYXkgbWFwIG9mIHRhcmdldCBhdHRyaWJ1dGVzIHRvIGV4dGVuZFxuICogQHBhcmFtIHtOdW1iZXJ8TnVtYmVyW119IGluZGljZXMgVGhlIGxvY2F0aW9ucyBvZiB0cmFjZXMgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7TnVtYmVyfE9iamVjdH0gW21heFBvaW50c10gTnVtYmVyIG9mIHBvaW50cyBmb3IgdHJhY2Ugd2luZG93IGFmdGVyIGxlbmd0aGVuaW5nLlxuICpcbiAqL1xuZnVuY3Rpb24gZXh0ZW5kVHJhY2VzKGdkLCB1cGRhdGUsIGluZGljZXMsIG1heFBvaW50cykge1xuICAgIGdkID0gTGliLmdldEdyYXBoRGl2KGdkKTtcblxuICAgIGZ1bmN0aW9uIHVwZGF0ZUFycmF5KHRhcmdldCwgaW5zZXJ0LCBtYXhwKSB7XG4gICAgICAgIHZhciBuZXdBcnJheSwgcmVtYWluZGVyO1xuXG4gICAgICAgIGlmKExpYi5pc1R5cGVkQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgaWYobWF4cCA8IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9uZSA9IG5ldyB0YXJnZXQuY29uc3RydWN0b3IoMCk7XG4gICAgICAgICAgICAgICAgdmFyIGJvdGggPSBjb25jYXRUeXBlZEFycmF5KHRhcmdldCwgaW5zZXJ0KTtcblxuICAgICAgICAgICAgICAgIGlmKG1heHAgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0FycmF5ID0gYm90aDtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyID0gbm9uZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheSA9IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlciA9IGJvdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdBcnJheSA9IG5ldyB0YXJnZXQuY29uc3RydWN0b3IobWF4cCk7XG4gICAgICAgICAgICAgICAgcmVtYWluZGVyID0gbmV3IHRhcmdldC5jb25zdHJ1Y3Rvcih0YXJnZXQubGVuZ3RoICsgaW5zZXJ0Lmxlbmd0aCAtIG1heHApO1xuXG4gICAgICAgICAgICAgICAgaWYobWF4cCA9PT0gaW5zZXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheS5zZXQoaW5zZXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyLnNldCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihtYXhwIDwgaW5zZXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyT2ZJdGVtc0Zyb21JbnNlcnQgPSBpbnNlcnQubGVuZ3RoIC0gbWF4cDtcblxuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheS5zZXQoaW5zZXJ0LnN1YmFycmF5KG51bWJlck9mSXRlbXNGcm9tSW5zZXJ0KSk7XG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlci5zZXQodGFyZ2V0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyLnNldChpbnNlcnQuc3ViYXJyYXkoMCwgbnVtYmVyT2ZJdGVtc0Zyb21JbnNlcnQpLCB0YXJnZXQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyT2ZJdGVtc0Zyb21UYXJnZXQgPSBtYXhwIC0gaW5zZXJ0Lmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldEJlZ2luID0gdGFyZ2V0Lmxlbmd0aCAtIG51bWJlck9mSXRlbXNGcm9tVGFyZ2V0O1xuXG4gICAgICAgICAgICAgICAgICAgIG5ld0FycmF5LnNldCh0YXJnZXQuc3ViYXJyYXkodGFyZ2V0QmVnaW4pKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3QXJyYXkuc2V0KGluc2VydCwgbnVtYmVyT2ZJdGVtc0Zyb21UYXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICByZW1haW5kZXIuc2V0KHRhcmdldC5zdWJhcnJheSgwLCB0YXJnZXRCZWdpbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5ld0FycmF5ID0gdGFyZ2V0LmNvbmNhdChpbnNlcnQpO1xuICAgICAgICAgICAgcmVtYWluZGVyID0gKG1heHAgPj0gMCAmJiBtYXhwIDwgbmV3QXJyYXkubGVuZ3RoKSA/XG4gICAgICAgICAgICAgICAgbmV3QXJyYXkuc3BsaWNlKDAsIG5ld0FycmF5Lmxlbmd0aCAtIG1heHApIDpcbiAgICAgICAgICAgICAgICBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbbmV3QXJyYXksIHJlbWFpbmRlcl07XG4gICAgfVxuXG4gICAgdmFyIHVuZG8gPSBzcGxpY2VUcmFjZXMoZ2QsIHVwZGF0ZSwgaW5kaWNlcywgbWF4UG9pbnRzLCB1cGRhdGVBcnJheSk7XG4gICAgdmFyIHByb21pc2UgPSBleHBvcnRzLnJlZHJhdyhnZCk7XG4gICAgdmFyIHVuZG9BcmdzID0gW2dkLCB1bmRvLnVwZGF0ZSwgaW5kaWNlcywgdW5kby5tYXhQb2ludHNdO1xuICAgIFF1ZXVlLmFkZChnZCwgZXhwb3J0cy5wcmVwZW5kVHJhY2VzLCB1bmRvQXJncywgZXh0ZW5kVHJhY2VzLCBhcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbmZ1bmN0aW9uIHByZXBlbmRUcmFjZXMoZ2QsIHVwZGF0ZSwgaW5kaWNlcywgbWF4UG9pbnRzKSB7XG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuXG4gICAgZnVuY3Rpb24gdXBkYXRlQXJyYXkodGFyZ2V0LCBpbnNlcnQsIG1heHApIHtcbiAgICAgICAgdmFyIG5ld0FycmF5LCByZW1haW5kZXI7XG5cbiAgICAgICAgaWYoTGliLmlzVHlwZWRBcnJheSh0YXJnZXQpKSB7XG4gICAgICAgICAgICBpZihtYXhwIDw9IDApIHtcbiAgICAgICAgICAgICAgICB2YXIgbm9uZSA9IG5ldyB0YXJnZXQuY29uc3RydWN0b3IoMCk7XG4gICAgICAgICAgICAgICAgdmFyIGJvdGggPSBjb25jYXRUeXBlZEFycmF5KGluc2VydCwgdGFyZ2V0KTtcblxuICAgICAgICAgICAgICAgIGlmKG1heHAgPCAwKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld0FycmF5ID0gYm90aDtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyID0gbm9uZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheSA9IG5vbmU7XG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlciA9IGJvdGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdBcnJheSA9IG5ldyB0YXJnZXQuY29uc3RydWN0b3IobWF4cCk7XG4gICAgICAgICAgICAgICAgcmVtYWluZGVyID0gbmV3IHRhcmdldC5jb25zdHJ1Y3Rvcih0YXJnZXQubGVuZ3RoICsgaW5zZXJ0Lmxlbmd0aCAtIG1heHApO1xuXG4gICAgICAgICAgICAgICAgaWYobWF4cCA9PT0gaW5zZXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheS5zZXQoaW5zZXJ0KTtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyLnNldCh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihtYXhwIDwgaW5zZXJ0Lmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbnVtYmVyT2ZJdGVtc0Zyb21JbnNlcnQgPSBpbnNlcnQubGVuZ3RoIC0gbWF4cDtcblxuICAgICAgICAgICAgICAgICAgICBuZXdBcnJheS5zZXQoaW5zZXJ0LnN1YmFycmF5KDAsIG51bWJlck9mSXRlbXNGcm9tSW5zZXJ0KSk7XG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlci5zZXQoaW5zZXJ0LnN1YmFycmF5KG51bWJlck9mSXRlbXNGcm9tSW5zZXJ0KSk7XG4gICAgICAgICAgICAgICAgICAgIHJlbWFpbmRlci5zZXQodGFyZ2V0LCBudW1iZXJPZkl0ZW1zRnJvbUluc2VydCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG51bWJlck9mSXRlbXNGcm9tVGFyZ2V0ID0gbWF4cCAtIGluc2VydC5sZW5ndGg7XG5cbiAgICAgICAgICAgICAgICAgICAgbmV3QXJyYXkuc2V0KGluc2VydCk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0FycmF5LnNldCh0YXJnZXQuc3ViYXJyYXkoMCwgbnVtYmVyT2ZJdGVtc0Zyb21UYXJnZXQpLCBpbnNlcnQubGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtYWluZGVyLnNldCh0YXJnZXQuc3ViYXJyYXkobnVtYmVyT2ZJdGVtc0Zyb21UYXJnZXQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBuZXdBcnJheSA9IGluc2VydC5jb25jYXQodGFyZ2V0KTtcbiAgICAgICAgICAgIHJlbWFpbmRlciA9IChtYXhwID49IDAgJiYgbWF4cCA8IG5ld0FycmF5Lmxlbmd0aCkgP1xuICAgICAgICAgICAgICAgIG5ld0FycmF5LnNwbGljZShtYXhwLCBuZXdBcnJheS5sZW5ndGgpIDpcbiAgICAgICAgICAgICAgICBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBbbmV3QXJyYXksIHJlbWFpbmRlcl07XG4gICAgfVxuXG4gICAgdmFyIHVuZG8gPSBzcGxpY2VUcmFjZXMoZ2QsIHVwZGF0ZSwgaW5kaWNlcywgbWF4UG9pbnRzLCB1cGRhdGVBcnJheSk7XG4gICAgdmFyIHByb21pc2UgPSBleHBvcnRzLnJlZHJhdyhnZCk7XG4gICAgdmFyIHVuZG9BcmdzID0gW2dkLCB1bmRvLnVwZGF0ZSwgaW5kaWNlcywgdW5kby5tYXhQb2ludHNdO1xuICAgIFF1ZXVlLmFkZChnZCwgZXhwb3J0cy5leHRlbmRUcmFjZXMsIHVuZG9BcmdzLCBwcmVwZW5kVHJhY2VzLCBhcmd1bWVudHMpO1xuXG4gICAgcmV0dXJuIHByb21pc2U7XG59XG5cbi8qKlxuICogQWRkIGRhdGEgdHJhY2VzIHRvIGFuIGV4aXN0aW5nIGdyYXBoIGRpdi5cbiAqXG4gKiBAcGFyYW0ge09iamVjdHxIVE1MRGl2RWxlbWVudH0gZ2QgVGhlIGdyYXBoIGRpdlxuICogQHBhcmFtIHtPYmplY3RbXX0gZ2QuZGF0YSBUaGUgYXJyYXkgb2YgdHJhY2VzIHdlJ3JlIGFkZGluZyB0b1xuICogQHBhcmFtIHtPYmplY3RbXXxPYmplY3R9IHRyYWNlcyBUaGUgb2JqZWN0IG9yIGFycmF5IG9mIG9iamVjdHMgdG8gYWRkXG4gKiBAcGFyYW0ge051bWJlcltdfE51bWJlcn0gW25ld0luZGljZXM9W2dkLmRhdGEubGVuZ3RoXV0gTG9jYXRpb25zIHRvIGFkZCB0cmFjZXNcbiAqXG4gKi9cbmZ1bmN0aW9uIGFkZFRyYWNlcyhnZCwgdHJhY2VzLCBuZXdJbmRpY2VzKSB7XG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuXG4gICAgdmFyIGN1cnJlbnRJbmRpY2VzID0gW107XG4gICAgdmFyIHVuZG9GdW5jID0gZXhwb3J0cy5kZWxldGVUcmFjZXM7XG4gICAgdmFyIHJlZG9GdW5jID0gYWRkVHJhY2VzO1xuICAgIHZhciB1bmRvQXJncyA9IFtnZCwgY3VycmVudEluZGljZXNdO1xuICAgIHZhciByZWRvQXJncyA9IFtnZCwgdHJhY2VzXTsgIC8vIG5vIG5ld0luZGljZXMgaGVyZVxuICAgIHZhciBpO1xuICAgIHZhciBwcm9taXNlO1xuXG4gICAgLy8gYWxsIHZhbGlkYXRpb24gaXMgZG9uZSBlbHNld2hlcmUgdG8gcmVtb3ZlIGNsdXR0ZXIgaGVyZVxuICAgIGNoZWNrQWRkVHJhY2VzQXJncyhnZCwgdHJhY2VzLCBuZXdJbmRpY2VzKTtcblxuICAgIC8vIG1ha2Ugc3VyZSB0cmFjZXMgaXMgYW4gYXJyYXlcbiAgICBpZighQXJyYXkuaXNBcnJheSh0cmFjZXMpKSB7XG4gICAgICAgIHRyYWNlcyA9IFt0cmFjZXNdO1xuICAgIH1cblxuICAgIC8vIG1ha2Ugc3VyZSB0cmFjZXMgZG8gbm90IHJlcGVhdCBleGlzdGluZyBvbmVzXG4gICAgdHJhY2VzID0gdHJhY2VzLm1hcChmdW5jdGlvbih0cmFjZSkge1xuICAgICAgICByZXR1cm4gTGliLmV4dGVuZEZsYXQoe30sIHRyYWNlKTtcbiAgICB9KTtcblxuICAgIGhlbHBlcnMuY2xlYW5EYXRhKHRyYWNlcyk7XG5cbiAgICAvLyBhZGQgdGhlIHRyYWNlcyB0byBnZC5kYXRhIChubyByZWRyYXdpbmcgeWV0ISlcbiAgICBmb3IoaSA9IDA7IGkgPCB0cmFjZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgZ2QuZGF0YS5wdXNoKHRyYWNlc1tpXSk7XG4gICAgfVxuXG4gICAgLy8gdG8gY29udGludWUsIHdlIG5lZWQgdG8gY2FsbCBtb3ZlVHJhY2VzIHdoaWNoIHJlcXVpcmVzIGN1cnJlbnRJbmRpY2VzXG4gICAgZm9yKGkgPSAwOyBpIDwgdHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGN1cnJlbnRJbmRpY2VzLnB1c2goLXRyYWNlcy5sZW5ndGggKyBpKTtcbiAgICB9XG5cbiAgICAvLyBpZiB0aGUgdXNlciBkaWRuJ3QgZGVmaW5lIG5ld0luZGljZXMsIHRoZXkganVzdCB3YW50IHRoZSB0cmFjZXMgYXBwZW5kZWRcbiAgICAvLyBpLmUuLCB3ZSBjYW4gc2ltcGx5IHJlZHJhdyBhbmQgYmUgZG9uZVxuICAgIGlmKHR5cGVvZiBuZXdJbmRpY2VzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBwcm9taXNlID0gZXhwb3J0cy5yZWRyYXcoZ2QpO1xuICAgICAgICBRdWV1ZS5hZGQoZ2QsIHVuZG9GdW5jLCB1bmRvQXJncywgcmVkb0Z1bmMsIHJlZG9BcmdzKTtcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxuXG4gICAgLy8gbWFrZSBzdXJlIGluZGljZXMgaXMgcHJvcGVydHkgZGVmaW5lZFxuICAgIGlmKCFBcnJheS5pc0FycmF5KG5ld0luZGljZXMpKSB7XG4gICAgICAgIG5ld0luZGljZXMgPSBbbmV3SW5kaWNlc107XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgICAgLy8gdGhpcyBpcyByZWR1bmRhbnQsIGJ1dCBuZWNlc3NhcnkgdG8gbm90IGNhdGNoIGxhdGVyIHBvc3NpYmxlIGVycm9ycyFcbiAgICAgICAgY2hlY2tNb3ZlVHJhY2VzQXJncyhnZCwgY3VycmVudEluZGljZXMsIG5ld0luZGljZXMpO1xuICAgIH0gY2F0Y2goZXJyb3IpIHtcbiAgICAgICAgLy8gc29tZXRoaW5nIHdlbnQgd3JvbmcsIHJlc2V0IGdkIHRvIGJlIHNhZmUgYW5kIHJldGhyb3cgZXJyb3JcbiAgICAgICAgZ2QuZGF0YS5zcGxpY2UoZ2QuZGF0YS5sZW5ndGggLSB0cmFjZXMubGVuZ3RoLCB0cmFjZXMubGVuZ3RoKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgLy8gaWYgd2UncmUgaGVyZSwgdGhlIHVzZXIgaGFzIGRlZmluZWQgc3BlY2lmaWMgcGxhY2VzIHRvIHBsYWNlIHRoZSBuZXcgdHJhY2VzXG4gICAgLy8gdGhpcyByZXF1aXJlcyBzb21lIGV4dHJhIHdvcmsgdGhhdCBtb3ZlVHJhY2VzIHdpbGwgZG9cbiAgICBRdWV1ZS5zdGFydFNlcXVlbmNlKGdkKTtcbiAgICBRdWV1ZS5hZGQoZ2QsIHVuZG9GdW5jLCB1bmRvQXJncywgcmVkb0Z1bmMsIHJlZG9BcmdzKTtcbiAgICBwcm9taXNlID0gZXhwb3J0cy5tb3ZlVHJhY2VzKGdkLCBjdXJyZW50SW5kaWNlcywgbmV3SW5kaWNlcyk7XG4gICAgUXVldWUuc3RvcFNlcXVlbmNlKGdkKTtcbiAgICByZXR1cm4gcHJvbWlzZTtcbn1cblxuLyoqXG4gKiBEZWxldGUgdHJhY2VzIGF0IGBpbmRpY2VzYCBmcm9tIGdkLmRhdGEgYXJyYXkuXG4gKlxuICogQHBhcmFtIHtPYmplY3R8SFRNTERpdkVsZW1lbnR9IGdkIFRoZSBncmFwaCBkaXZcbiAqIEBwYXJhbSB7T2JqZWN0W119IGdkLmRhdGEgVGhlIGFycmF5IG9mIHRyYWNlcyB3ZSdyZSByZW1vdmluZyBmcm9tXG4gKiBAcGFyYW0ge051bWJlcnxOdW1iZXJbXX0gaW5kaWNlcyBUaGUgaW5kaWNlc1xuICovXG5mdW5jdGlvbiBkZWxldGVUcmFjZXMoZ2QsIGluZGljZXMpIHtcbiAgICBnZCA9IExpYi5nZXRHcmFwaERpdihnZCk7XG5cbiAgICB2YXIgdHJhY2VzID0gW107XG4gICAgdmFyIHVuZG9GdW5jID0gZXhwb3J0cy5hZGRUcmFjZXM7XG4gICAgdmFyIHJlZG9GdW5jID0gZGVsZXRlVHJhY2VzO1xuICAgIHZhciB1bmRvQXJncyA9IFtnZCwgdHJhY2VzLCBpbmRpY2VzXTtcbiAgICB2YXIgcmVkb0FyZ3MgPSBbZ2QsIGluZGljZXNdO1xuICAgIHZhciBpO1xuICAgIHZhciBkZWxldGVkVHJhY2U7XG5cbiAgICAvLyBtYWtlIHN1cmUgaW5kaWNlcyBhcmUgZGVmaW5lZFxuICAgIGlmKHR5cGVvZiBpbmRpY2VzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2luZGljZXMgbXVzdCBiZSBhbiBpbnRlZ2VyIG9yIGFycmF5IG9mIGludGVnZXJzLicpO1xuICAgIH0gZWxzZSBpZighQXJyYXkuaXNBcnJheShpbmRpY2VzKSkge1xuICAgICAgICBpbmRpY2VzID0gW2luZGljZXNdO1xuICAgIH1cbiAgICBhc3NlcnRJbmRleEFycmF5KGdkLCBpbmRpY2VzLCAnaW5kaWNlcycpO1xuXG4gICAgLy8gY29udmVydCBuZWdhdGl2ZSBpbmRpY2VzIHRvIHBvc2l0aXZlIGluZGljZXNcbiAgICBpbmRpY2VzID0gcG9zaXRpdmlmeUluZGljZXMoaW5kaWNlcywgZ2QuZGF0YS5sZW5ndGggLSAxKTtcblxuICAgIC8vIHdlIHdhbnQgZGVzY2VuZGluZyBoZXJlIHNvIHRoYXQgc3BsaWNpbmcgbGF0ZXIgZG9lc24ndCBhZmZlY3QgaW5kZXhpbmdcbiAgICBpbmRpY2VzLnNvcnQoTGliLnNvcnRlckRlcyk7XG4gICAgZm9yKGkgPSAwOyBpIDwgaW5kaWNlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBkZWxldGVkVHJhY2UgPSBnZC5kYXRhLnNwbGljZShpbmRpY2VzW2ldLCAxKVswXTtcbiAgICAgICAgdHJhY2VzLnB1c2goZGVsZXRlZFRyYWNlKTtcbiAgICB9XG5cbiAgICB2YXIgcHJvbWlzZSA9IGV4cG9ydHMucmVkcmF3KGdkKTtcbiAgICBRdWV1ZS5hZGQoZ2QsIHVuZG9GdW5jLCB1bmRvQXJncywgcmVkb0Z1bmMsIHJlZG9BcmdzKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vKipcbiAqIE1vdmUgdHJhY2VzIGF0IGN1cnJlbnRJbmRpY2VzIGFycmF5IHRvIGxvY2F0aW9ucyBpbiBuZXdJbmRpY2VzIGFycmF5LlxuICpcbiAqIElmIG5ld0luZGljZXMgaXMgb21pdHRlZCwgY3VycmVudEluZGljZXMgd2lsbCBiZSBtb3ZlZCB0byB0aGUgZW5kLiBFLmcuLFxuICogdGhlc2UgYXJlIGVxdWl2YWxlbnQ6XG4gKlxuICogUGxvdGx5Lm1vdmVUcmFjZXMoZ2QsIFsxLCAyLCAzXSwgWy0zLCAtMiwgLTFdKVxuICogUGxvdGx5Lm1vdmVUcmFjZXMoZ2QsIFsxLCAyLCAzXSlcbiAqXG4gKiBAcGFyYW0ge09iamVjdHxIVE1MRGl2RWxlbWVudH0gZ2QgVGhlIGdyYXBoIGRpdlxuICogQHBhcmFtIHtPYmplY3RbXX0gZ2QuZGF0YSBUaGUgYXJyYXkgb2YgdHJhY2VzIHdlJ3JlIHJlbW92aW5nIGZyb21cbiAqIEBwYXJhbSB7TnVtYmVyfE51bWJlcltdfSBjdXJyZW50SW5kaWNlcyBUaGUgbG9jYXRpb25zIG9mIHRyYWNlcyB0byBiZSBtb3ZlZFxuICogQHBhcmFtIHtOdW1iZXJ8TnVtYmVyW119IFtuZXdJbmRpY2VzXSBUaGUgbG9jYXRpb25zIHRvIG1vdmUgdHJhY2VzIHRvXG4gKlxuICogRXhhbXBsZSBjYWxsczpcbiAqXG4gKiAgICAgIC8vIG1vdmUgdHJhY2UgaSB0byBsb2NhdGlvbiB4XG4gKiAgICAgIFBsb3RseS5tb3ZlVHJhY2VzKGdkLCBpLCB4KVxuICpcbiAqICAgICAgLy8gbW92ZSB0cmFjZSBpIHRvIGVuZCBvZiBhcnJheVxuICogICAgICBQbG90bHkubW92ZVRyYWNlcyhnZCwgaSlcbiAqXG4gKiAgICAgIC8vIG1vdmUgdHJhY2VzIGksIGosIGsgdG8gZW5kIG9mIGFycmF5IChpICE9IGogIT0gaylcbiAqICAgICAgUGxvdGx5Lm1vdmVUcmFjZXMoZ2QsIFtpLCBqLCBrXSlcbiAqXG4gKiAgICAgIC8vIG1vdmUgdHJhY2VzIFtpLCBqLCBrXSB0byBbeCwgeSwgel0gKGkgIT0gaiAhPSBrKSAoeCAhPSB5ICE9IHopXG4gKiAgICAgIFBsb3RseS5tb3ZlVHJhY2VzKGdkLCBbaSwgaiwga10sIFt4LCB5LCB6XSlcbiAqXG4gKiAgICAgIC8vIHJlb3JkZXIgYWxsIHRyYWNlcyAoYXNzdW1lIHRoZXJlIGFyZSA1LS1hLCBiLCBjLCBkLCBlKVxuICogICAgICBQbG90bHkubW92ZVRyYWNlcyhnZCwgW2IsIGQsIGUsIGEsIGNdKSAgLy8gc2FtZSBhcyAnbW92ZSB0byBlbmQnXG4gKi9cbmZ1bmN0aW9uIG1vdmVUcmFjZXMoZ2QsIGN1cnJlbnRJbmRpY2VzLCBuZXdJbmRpY2VzKSB7XG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuXG4gICAgdmFyIG5ld0RhdGEgPSBbXTtcbiAgICB2YXIgbW92aW5nVHJhY2VNYXAgPSBbXTtcbiAgICB2YXIgdW5kb0Z1bmMgPSBtb3ZlVHJhY2VzO1xuICAgIHZhciByZWRvRnVuYyA9IG1vdmVUcmFjZXM7XG4gICAgdmFyIHVuZG9BcmdzID0gW2dkLCBuZXdJbmRpY2VzLCBjdXJyZW50SW5kaWNlc107XG4gICAgdmFyIHJlZG9BcmdzID0gW2dkLCBjdXJyZW50SW5kaWNlcywgbmV3SW5kaWNlc107XG4gICAgdmFyIGk7XG5cbiAgICAvLyB0byByZWR1Y2UgY29tcGxleGl0eSBoZXJlLCBjaGVjayBhcmdzIGVsc2V3aGVyZVxuICAgIC8vIHRoaXMgdGhyb3dzIGVycm9ycyB3aGVyZSBhcHByb3ByaWF0ZVxuICAgIGNoZWNrTW92ZVRyYWNlc0FyZ3MoZ2QsIGN1cnJlbnRJbmRpY2VzLCBuZXdJbmRpY2VzKTtcblxuICAgIC8vIG1ha2Ugc3VyZSBjdXJyZW50SW5kaWNlcyBpcyBhbiBhcnJheVxuICAgIGN1cnJlbnRJbmRpY2VzID0gQXJyYXkuaXNBcnJheShjdXJyZW50SW5kaWNlcykgPyBjdXJyZW50SW5kaWNlcyA6IFtjdXJyZW50SW5kaWNlc107XG5cbiAgICAvLyBpZiB1bmRlZmluZWQsIGRlZmluZSBuZXdJbmRpY2VzIHRvIHBvaW50IHRvIHRoZSBlbmQgb2YgZ2QuZGF0YSBhcnJheVxuICAgIGlmKHR5cGVvZiBuZXdJbmRpY2VzID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBuZXdJbmRpY2VzID0gW107XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGN1cnJlbnRJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBuZXdJbmRpY2VzLnB1c2goLWN1cnJlbnRJbmRpY2VzLmxlbmd0aCArIGkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gbWFrZSBzdXJlIG5ld0luZGljZXMgaXMgYW4gYXJyYXkgaWYgaXQncyB1c2VyLWRlZmluZWRcbiAgICBuZXdJbmRpY2VzID0gQXJyYXkuaXNBcnJheShuZXdJbmRpY2VzKSA/IG5ld0luZGljZXMgOiBbbmV3SW5kaWNlc107XG5cbiAgICAvLyBjb252ZXJ0IG5lZ2F0aXZlIGluZGljZXMgdG8gcG9zaXRpdmUgaW5kaWNlcyAodGhleSdyZSB0aGUgc2FtZSBsZW5ndGgpXG4gICAgY3VycmVudEluZGljZXMgPSBwb3NpdGl2aWZ5SW5kaWNlcyhjdXJyZW50SW5kaWNlcywgZ2QuZGF0YS5sZW5ndGggLSAxKTtcbiAgICBuZXdJbmRpY2VzID0gcG9zaXRpdmlmeUluZGljZXMobmV3SW5kaWNlcywgZ2QuZGF0YS5sZW5ndGggLSAxKTtcblxuICAgIC8vIGF0IHRoaXMgcG9pbnQsIHdlJ3ZlIGNvZXJjZWQgdGhlIGluZGV4IGFycmF5cyBpbnRvIHByZWRpY3RhYmxlIGZvcm1zXG5cbiAgICAvLyBnZXQgdGhlIHRyYWNlcyB0aGF0IGFyZW4ndCBiZWluZyBtb3ZlZCBhcm91bmRcbiAgICBmb3IoaSA9IDA7IGkgPCBnZC5kYXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIC8vIGlmIGluZGV4IGlzbid0IGluIGN1cnJlbnRJbmRpY2VzLCBpbmNsdWRlIGl0IGluIGlnbm9yZWQhXG4gICAgICAgIGlmKGN1cnJlbnRJbmRpY2VzLmluZGV4T2YoaSkgPT09IC0xKSB7XG4gICAgICAgICAgICBuZXdEYXRhLnB1c2goZ2QuZGF0YVtpXSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBnZXQgYSBtYXBwaW5nIG9mIGluZGljZXMgdG8gbW92aW5nIHRyYWNlc1xuICAgIGZvcihpID0gMDsgaSA8IGN1cnJlbnRJbmRpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIG1vdmluZ1RyYWNlTWFwLnB1c2goe25ld0luZGV4OiBuZXdJbmRpY2VzW2ldLCB0cmFjZTogZ2QuZGF0YVtjdXJyZW50SW5kaWNlc1tpXV19KTtcbiAgICB9XG5cbiAgICAvLyByZW9yZGVyIHRoaXMgbWFwcGluZyBieSBuZXdJbmRleCwgYXNjZW5kaW5nXG4gICAgbW92aW5nVHJhY2VNYXAuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgIHJldHVybiBhLm5ld0luZGV4IC0gYi5uZXdJbmRleDtcbiAgICB9KTtcblxuICAgIC8vIG5vdywgYWRkIHRoZSBtb3ZpbmcgdHJhY2VzIGJhY2sgaW4sIGluIG9yZGVyIVxuICAgIGZvcihpID0gMDsgaSA8IG1vdmluZ1RyYWNlTWFwLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIG5ld0RhdGEuc3BsaWNlKG1vdmluZ1RyYWNlTWFwW2ldLm5ld0luZGV4LCAwLCBtb3ZpbmdUcmFjZU1hcFtpXS50cmFjZSk7XG4gICAgfVxuXG4gICAgZ2QuZGF0YSA9IG5ld0RhdGE7XG5cbiAgICB2YXIgcHJvbWlzZSA9IGV4cG9ydHMucmVkcmF3KGdkKTtcbiAgICBRdWV1ZS5hZGQoZ2QsIHVuZG9GdW5jLCB1bmRvQXJncywgcmVkb0Z1bmMsIHJlZG9BcmdzKTtcblxuICAgIHJldHVybiBwcm9taXNlO1xufVxuXG4vKipcbiAqIHJlc3R5bGU6IHVwZGF0ZSB0cmFjZSBhdHRyaWJ1dGVzIG9mIGFuIGV4aXN0aW5nIHBsb3RcbiAqXG4gKiBDYW4gYmUgY2FsbGVkIHR3byB3YXlzLlxuICpcbiAqIFNpZ25hdHVyZSAxOlxuICogQHBhcmFtIHtTdHJpbmcgfCBIVE1MRGl2RWxlbWVudH0gZ2RcbiAqICB0aGUgaWQgb3IgRE9NIGVsZW1lbnQgb2YgdGhlIGdyYXBoIGNvbnRhaW5lciBkaXZcbiAqIEBwYXJhbSB7U3RyaW5nfSBhc3RyXG4gKiAgYXR0cmlidXRlIHN0cmluZyAobGlrZSBgJ21hcmtlci5zeW1ib2wnYCkgdG8gdXBkYXRlXG4gKiBAcGFyYW0geyp9IHZhbFxuICogIHZhbHVlIHRvIGdpdmUgdGhpcyBhdHRyaWJ1dGVcbiAqIEBwYXJhbSB7TnVtYmVyW10gfCBOdW1iZXJ9IFt0cmFjZXNdXG4gKiAgaW50ZWdlciBvciBhcnJheSBvZiBpbnRlZ2VycyBmb3IgdGhlIHRyYWNlcyB0byBhbHRlciAoYWxsIGlmIG9taXR0ZWQpXG4gKlxuICogU2lnbmF0dXJlIDI6XG4gKiBAcGFyYW0ge1N0cmluZyB8IEhUTUxEaXZFbGVtZW50fSBnZFxuICogIChhcyBpbiBzaWduYXR1cmUgMSlcbiAqIEBwYXJhbSB7T2JqZWN0fSBhb2JqXG4gKiAgYXR0cmlidXRlIG9iamVjdCBge2FzdHIxOiB2YWwxLCBhc3RyMjogdmFsMiAuLi59YFxuICogIGFsbG93cyBzZXR0aW5nIG11bHRpcGxlIGF0dHJpYnV0ZXMgc2ltdWx0YW5lb3VzbHlcbiAqIEBwYXJhbSB7TnVtYmVyW10gfCBOdW1iZXJ9IFt0cmFjZXNdXG4gKiAgKGFzIGluIHNpZ25hdHVyZSAxKVxuICpcbiAqIGB2YWxgIChvciBgdmFsMWAsIGB2YWwyYCAuLi4gaW4gdGhlIG9iamVjdCBmb3JtKSBjYW4gYmUgYW4gYXJyYXksXG4gKiB0byBhcHBseSBkaWZmZXJlbnQgdmFsdWVzIHRvIGVhY2ggdHJhY2UuXG4gKlxuICogSWYgdGhlIGFycmF5IGlzIHRvbyBzaG9ydCwgaXQgd2lsbCB3cmFwIGFyb3VuZCAodXNlZnVsIGZvclxuICogc3R5bGUgZmlsZXMgdGhhdCB3YW50IHRvIHNwZWNpZnkgY3ljbGljYWwgZGVmYXVsdCB2YWx1ZXMpLlxuICovXG5mdW5jdGlvbiByZXN0eWxlKGdkLCBhc3RyLCB2YWwsIF90cmFjZXMpIHtcbiAgICBnZCA9IExpYi5nZXRHcmFwaERpdihnZCk7XG4gICAgaGVscGVycy5jbGVhclByb21pc2VRdWV1ZShnZCk7XG5cbiAgICB2YXIgYW9iaiA9IHt9O1xuICAgIGlmKHR5cGVvZiBhc3RyID09PSAnc3RyaW5nJykgYW9ialthc3RyXSA9IHZhbDtcbiAgICBlbHNlIGlmKExpYi5pc1BsYWluT2JqZWN0KGFzdHIpKSB7XG4gICAgICAgIC8vIHRoZSAzLWFyZyBmb3JtXG4gICAgICAgIGFvYmogPSBMaWIuZXh0ZW5kRmxhdCh7fSwgYXN0cik7XG4gICAgICAgIGlmKF90cmFjZXMgPT09IHVuZGVmaW5lZCkgX3RyYWNlcyA9IHZhbDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBMaWIud2FybignUmVzdHlsZSBmYWlsLicsIGFzdHIsIHZhbCwgX3RyYWNlcyk7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgIH1cblxuICAgIGlmKE9iamVjdC5rZXlzKGFvYmopLmxlbmd0aCkgZ2QuY2hhbmdlZCA9IHRydWU7XG5cbiAgICB2YXIgdHJhY2VzID0gaGVscGVycy5jb2VyY2VUcmFjZUluZGljZXMoZ2QsIF90cmFjZXMpO1xuXG4gICAgdmFyIHNwZWNzID0gX3Jlc3R5bGUoZ2QsIGFvYmosIHRyYWNlcyk7XG4gICAgdmFyIGZsYWdzID0gc3BlY3MuZmxhZ3M7XG5cbiAgICAvLyBjbGVhciBjYWxjZGF0YSBhbmQvb3IgYXhpcyB0eXBlcyBpZiByZXF1aXJlZCBzbyB0aGV5IGdldCByZWdlbmVyYXRlZFxuICAgIGlmKGZsYWdzLmNhbGMpIGdkLmNhbGNkYXRhID0gdW5kZWZpbmVkO1xuICAgIGlmKGZsYWdzLmNsZWFyQXhpc1R5cGVzKSBoZWxwZXJzLmNsZWFyQXhpc1R5cGVzKGdkLCB0cmFjZXMsIHt9KTtcblxuICAgIC8vIGZpbGwgaW4gcmVkcmF3IHNlcXVlbmNlXG4gICAgdmFyIHNlcSA9IFtdO1xuXG4gICAgaWYoZmxhZ3MuZnVsbFJlcGxvdCkge1xuICAgICAgICBzZXEucHVzaChleHBvcnRzLnBsb3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlcS5wdXNoKFBsb3RzLnByZXZpb3VzUHJvbWlzZXMpO1xuXG4gICAgICAgIC8vIG1heWJlIG9ubHkgY2FsbCBQbG90cy5zdXBwbHlEYXRhRGVmYXVsdHMgaW4gdGhlIHNwbG9tIGNhc2UsXG4gICAgICAgIC8vIHRvIHNraXAgb3ZlciBsb25nIGFuZCBzbG93IGF4ZXMgZGVmYXVsdHNcbiAgICAgICAgUGxvdHMuc3VwcGx5RGVmYXVsdHMoZ2QpO1xuXG4gICAgICAgIGlmKGZsYWdzLm1hcmtlclNpemUpIHtcbiAgICAgICAgICAgIFBsb3RzLmRvQ2FsY2RhdGEoZ2QpO1xuICAgICAgICAgICAgYWRkQXhSYW5nZVNlcXVlbmNlKHNlcSk7XG5cbiAgICAgICAgICAgIC8vIFRPRE9cbiAgICAgICAgICAgIC8vIGlmIGFsbCBheGVzIGhhdmUgYXV0b3JhbmdlOmZhbHNlLCB0aGVuXG4gICAgICAgICAgICAvLyBwcm9jZWVkIHRvIHN1YnJvdXRpbmVzLmRvVHJhY2VTdHlsZSgpLFxuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIG11c3QgZ28gdGhyb3VnaCBhZGRBeFJhbmdlU2VxdWVuY2UsXG4gICAgICAgICAgICAvLyB3aGljaCBpbiBnZW5lcmFsIG11c3QgcmVkcmF3cyAnYWxsJyBheGVzXG4gICAgICAgIH1cblxuICAgICAgICBpZihmbGFncy5zdHlsZSkgc2VxLnB1c2goc3Vicm91dGluZXMuZG9UcmFjZVN0eWxlKTtcbiAgICAgICAgaWYoZmxhZ3MuY29sb3JiYXJzKSBzZXEucHVzaChzdWJyb3V0aW5lcy5kb0NvbG9yQmFycyk7XG5cbiAgICAgICAgc2VxLnB1c2goZW1pdEFmdGVyUGxvdCk7XG4gICAgfVxuXG4gICAgc2VxLnB1c2goUGxvdHMucmVob3ZlciwgUGxvdHMucmVkcmFnKTtcblxuICAgIFF1ZXVlLmFkZChnZCxcbiAgICAgICAgcmVzdHlsZSwgW2dkLCBzcGVjcy51bmRvaXQsIHNwZWNzLnRyYWNlc10sXG4gICAgICAgIHJlc3R5bGUsIFtnZCwgc3BlY3MucmVkb2l0LCBzcGVjcy50cmFjZXNdXG4gICAgKTtcblxuICAgIHZhciBwbG90RG9uZSA9IExpYi5zeW5jT3JBc3luYyhzZXEsIGdkKTtcbiAgICBpZighcGxvdERvbmUgfHwgIXBsb3REb25lLnRoZW4pIHBsb3REb25lID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICByZXR1cm4gcGxvdERvbmUudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgZ2QuZW1pdCgncGxvdGx5X3Jlc3R5bGUnLCBzcGVjcy5ldmVudERhdGEpO1xuICAgICAgICByZXR1cm4gZ2Q7XG4gICAgfSk7XG59XG5cbi8vIGZvciB1bmRvOiB1bmRlZmluZWQgaW5pdGlhbCB2YWxzIG11c3QgYmUgdHVybmVkIGludG8gbnVsbHNcbi8vIHNvIHRoYXQgd2UgdW5zZXQgcmF0aGVyIHRoYW4gaWdub3JlIHRoZW1cbmZ1bmN0aW9uIHVuZGVmaW5lZFRvTnVsbCh2YWwpIHtcbiAgICBpZih2YWwgPT09IHVuZGVmaW5lZCkgcmV0dXJuIG51bGw7XG4gICAgcmV0dXJuIHZhbDtcbn1cblxuLyoqXG4gKiBGYWN0b3J5IGZ1bmN0aW9uIHRvIHdyYXAgbmVzdGVkUHJvcGVydHkgd2l0aCBHVUkgZWRpdHMgaWYgbmVjZXNzYXJ5XG4gKiB3aXRoIEdVSSBlZGl0cyB3ZSBhZGQgYW4gb3B0aW9uYWwgcHJlZml4IHRvIHRoZSBuZXN0ZWRQcm9wZXJ0eSBjb25zdHJ1Y3RvclxuICogdG8gcHJlcGVuZCB0byB0aGUgYXR0cmlidXRlIHN0cmluZyBpbiB0aGUgcHJlR1VJIHN0b3JlLlxuICovXG5mdW5jdGlvbiBtYWtlTlAocHJlR1VJLCBndWlFZGl0RmxhZykge1xuICAgIGlmKCFndWlFZGl0RmxhZykgcmV0dXJuIG5lc3RlZFByb3BlcnR5O1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRhaW5lciwgYXR0ciwgcHJlZml4KSB7XG4gICAgICAgIHZhciBucCA9IG5lc3RlZFByb3BlcnR5KGNvbnRhaW5lciwgYXR0cik7XG4gICAgICAgIHZhciBucFNldCA9IG5wLnNldDtcbiAgICAgICAgbnAuc2V0ID0gZnVuY3Rpb24odmFsKSB7XG4gICAgICAgICAgICB2YXIgZnVsbEF0dHIgPSAocHJlZml4IHx8ICcnKSArIGF0dHI7XG4gICAgICAgICAgICBzdG9yZUN1cnJlbnQoZnVsbEF0dHIsIG5wLmdldCgpLCB2YWwsIHByZUdVSSk7XG4gICAgICAgICAgICBucFNldCh2YWwpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gbnA7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gc3RvcmVDdXJyZW50KGF0dHIsIHZhbCwgbmV3VmFsLCBwcmVHVUkpIHtcbiAgICBpZihBcnJheS5pc0FycmF5KHZhbCkgfHwgQXJyYXkuaXNBcnJheShuZXdWYWwpKSB7XG4gICAgICAgIHZhciBhcnJheVZhbCA9IEFycmF5LmlzQXJyYXkodmFsKSA/IHZhbCA6IFtdO1xuICAgICAgICB2YXIgYXJyYXlOZXcgPSBBcnJheS5pc0FycmF5KG5ld1ZhbCkgPyBuZXdWYWwgOiBbXTtcbiAgICAgICAgdmFyIG1heExlbiA9IE1hdGgubWF4KGFycmF5VmFsLmxlbmd0aCwgYXJyYXlOZXcubGVuZ3RoKTtcbiAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IG1heExlbjsgaSsrKSB7XG4gICAgICAgICAgICBzdG9yZUN1cnJlbnQoYXR0ciArICdbJyArIGkgKyAnXScsIGFycmF5VmFsW2ldLCBhcnJheU5ld1tpXSwgcHJlR1VJKTtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZihMaWIuaXNQbGFpbk9iamVjdCh2YWwpIHx8IExpYi5pc1BsYWluT2JqZWN0KG5ld1ZhbCkpIHtcbiAgICAgICAgdmFyIG9ialZhbCA9IExpYi5pc1BsYWluT2JqZWN0KHZhbCkgPyB2YWwgOiB7fTtcbiAgICAgICAgdmFyIG9iak5ldyA9IExpYi5pc1BsYWluT2JqZWN0KG5ld1ZhbCkgPyBuZXdWYWwgOiB7fTtcbiAgICAgICAgdmFyIG9iakJvdGggPSBMaWIuZXh0ZW5kRmxhdCh7fSwgb2JqVmFsLCBvYmpOZXcpO1xuICAgICAgICBmb3IodmFyIGtleSBpbiBvYmpCb3RoKSB7XG4gICAgICAgICAgICBzdG9yZUN1cnJlbnQoYXR0ciArICcuJyArIGtleSwgb2JqVmFsW2tleV0sIG9iak5ld1trZXldLCBwcmVHVUkpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIGlmKHByZUdVSVthdHRyXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHByZUdVSVthdHRyXSA9IHVuZGVmaW5lZFRvTnVsbCh2YWwpO1xuICAgIH1cbn1cblxuLyoqXG4gKiBzdG9yZURpcmVjdEdVSUVkaXQ6IGZvciByb3V0aW5lcyB0aGF0IHNraXAgcmVzdHlsZS9yZWxheW91dCBhbmQgbW9jayBpdFxuICogYnkgZW1pdHRpbmcgYSBwbG90bHlfcmVzdHlsZSBvciBwbG90bHlfcmVsYXlvdXQgZXZlbnQsIHRoaXMgcm91dGluZVxuICoga2VlcHMgdHJhY2sgb2YgdGhlIGluaXRpYWwgc3RhdGUgaW4gX3ByZUdVSSBmb3IgdXNlIGJ5IHVpcmV2aXNpb25cbiAqIERvZXMgKm5vdCogYXBwbHkgdGhlc2UgY2hhbmdlcyB0byBkYXRhL2xheW91dCAtIHRoYXQncyB0aGUgcmVzcG9uc2liaWxpdHlcbiAqIG9mIHRoZSBjYWxsaW5nIHJvdXRpbmUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbnRhaW5lcjogdGhlIGlucHV0IGF0dHJpYnV0ZXMgY29udGFpbmVyIChlZyBgbGF5b3V0YCBvciBhIGB0cmFjZWApXG4gKiBAcGFyYW0ge29iamVjdH0gcHJlR1VJOiB3aGVyZSBvcmlnaW5hbCB2YWx1ZXMgc2hvdWxkIGJlIHN0b3JlZCwgZWl0aGVyXG4gKiAgICAgYGxheW91dC5fcHJlR1VJYCBvciBgbGF5b3V0Ll90cmFjZVByZUdVSVt1aWRdYFxuICogQHBhcmFtIHtvYmplY3R9IGVkaXRzOiB0aGUge2F0dHI6IHZhbH0gb2JqZWN0IGFzIG5vcm1hbGx5IHBhc3NlZCB0byBgcmVsYXlvdXRgIGV0Y1xuICovXG5mdW5jdGlvbiBfc3RvcmVEaXJlY3RHVUlFZGl0KGNvbnRhaW5lciwgcHJlR1VJLCBlZGl0cykge1xuICAgIGZvcih2YXIgYXR0ciBpbiBlZGl0cykge1xuICAgICAgICB2YXIgbnAgPSBuZXN0ZWRQcm9wZXJ0eShjb250YWluZXIsIGF0dHIpO1xuICAgICAgICBzdG9yZUN1cnJlbnQoYXR0ciwgbnAuZ2V0KCksIGVkaXRzW2F0dHJdLCBwcmVHVUkpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gX3Jlc3R5bGUoZ2QsIGFvYmosIHRyYWNlcykge1xuICAgIHZhciBmdWxsTGF5b3V0ID0gZ2QuX2Z1bGxMYXlvdXQ7XG4gICAgdmFyIGZ1bGxEYXRhID0gZ2QuX2Z1bGxEYXRhO1xuICAgIHZhciBkYXRhID0gZ2QuZGF0YTtcbiAgICB2YXIgZ3VpRWRpdEZsYWcgPSBmdWxsTGF5b3V0Ll9ndWlFZGl0aW5nO1xuICAgIHZhciBsYXlvdXROUCA9IG1ha2VOUChmdWxsTGF5b3V0Ll9wcmVHVUksIGd1aUVkaXRGbGFnKTtcbiAgICB2YXIgZXZlbnREYXRhID0gTGliLmV4dGVuZERlZXBBbGwoe30sIGFvYmopO1xuICAgIHZhciBpO1xuXG4gICAgY2xlYW5EZXByZWNhdGVkQXR0cmlidXRlS2V5cyhhb2JqKTtcblxuICAgIC8vIGluaXRpYWxpemUgZmxhZ3NcbiAgICB2YXIgZmxhZ3MgPSBlZGl0VHlwZXMudHJhY2VGbGFncygpO1xuXG4gICAgLy8gY29waWVzIG9mIHRoZSBjaGFuZ2UgKGFuZCBwcmV2aW91cyB2YWx1ZXMgb2YgYW55dGhpbmcgYWZmZWN0ZWQpXG4gICAgLy8gZm9yIHRoZSB1bmRvIC8gcmVkbyBxdWV1ZVxuICAgIHZhciByZWRvaXQgPSB7fTtcbiAgICB2YXIgdW5kb2l0ID0ge307XG4gICAgdmFyIGF4bGlzdDtcblxuICAgIC8vIG1ha2UgYSBuZXcgZW1wdHkgdmFscyBhcnJheSBmb3IgdW5kb2l0XG4gICAgZnVuY3Rpb24gYTAoKSB7IHJldHVybiB0cmFjZXMubWFwKGZ1bmN0aW9uKCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9KTsgfVxuXG4gICAgLy8gZm9yIGF1dG9yYW5naW5nIG11bHRpcGxlIGF4ZXNcbiAgICBmdW5jdGlvbiBhZGRUb0F4bGlzdChheGlkKSB7XG4gICAgICAgIHZhciBheE5hbWUgPSBBeGVzLmlkMm5hbWUoYXhpZCk7XG4gICAgICAgIGlmKGF4bGlzdC5pbmRleE9mKGF4TmFtZSkgPT09IC0xKSBheGxpc3QucHVzaChheE5hbWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGF1dG9yYW5nZUF0dHIoYXhOYW1lKSB7IHJldHVybiAnTEFZT1VUJyArIGF4TmFtZSArICcuYXV0b3JhbmdlJzsgfVxuXG4gICAgZnVuY3Rpb24gcmFuZ2VBdHRyKGF4TmFtZSkgeyByZXR1cm4gJ0xBWU9VVCcgKyBheE5hbWUgKyAnLnJhbmdlJzsgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RnVsbFRyYWNlKHRyYWNlSW5kZXgpIHtcbiAgICAgICAgLy8gdXN1YWxseSBmdWxsRGF0YSBtYXBzIDE6MSBvbnRvIGRhdGEsIGJ1dCB3aXRoIGdyb3VwYnkgdHJhbnNmb3Jtc1xuICAgICAgICAvLyB0aGUgZnVsbERhdGEgaW5kZXggY2FuIGJlIGdyZWF0ZXIuIFRha2UgdGhlICpmaXJzdCogbWF0Y2hpbmcgdHJhY2UuXG4gICAgICAgIGZvcih2YXIgaiA9IHRyYWNlSW5kZXg7IGogPCBmdWxsRGF0YS5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgaWYoZnVsbERhdGFbal0uX2lucHV0ID09PSBkYXRhW3RyYWNlSW5kZXhdKSByZXR1cm4gZnVsbERhdGFbal07XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2hvdWxkIG5ldmVyIGdldCBoZXJlIC0gYW5kIGlmIHdlICpkbyogaXQgc2hvdWxkIGNhdXNlIGFuIGVycm9yXG4gICAgICAgIC8vIGxhdGVyIG9uIHVuZGVmaW5lZCBmdWxsVHJhY2UgaXMgcGFzc2VkIHRvIG5lc3RlZFByb3BlcnR5LlxuICAgIH1cblxuICAgIC8vIGZvciBhdHRycyB0aGF0IGludGVyYWN0IChsaWtlIHNjYWxlcyAmIGF1dG9zY2FsZXMpLCBzYXZlIHRoZVxuICAgIC8vIG9sZCB2YWxzIGJlZm9yZSBtYWtpbmcgdGhlIGNoYW5nZVxuICAgIC8vIHZhbD11bmRlZmluZWQgd2lsbCBub3Qgc2V0IGEgdmFsdWUsIGp1c3QgcmVjb3JkIHdoYXQgdGhlIHZhbHVlIHdhcy5cbiAgICAvLyB2YWw9bnVsbCB3aWxsIGRlbGV0ZSB0aGUgYXR0cmlidXRlXG4gICAgLy8gYXR0ciBjYW4gYmUgYW4gYXJyYXkgdG8gc2V0IHNldmVyYWwgYXQgb25jZSAoYWxsIHRvIHRoZSBzYW1lIHZhbClcbiAgICBmdW5jdGlvbiBkb2V4dHJhKGF0dHIsIHZhbCwgaSkge1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KGF0dHIpKSB7XG4gICAgICAgICAgICBhdHRyLmZvckVhY2goZnVuY3Rpb24oYSkgeyBkb2V4dHJhKGEsIHZhbCwgaSk7IH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIHF1aXQgaWYgZXhwbGljaXRseSBzZXR0aW5nIHRoaXMgZWxzZXdoZXJlXG4gICAgICAgIGlmKGF0dHIgaW4gYW9iaiB8fCBoZWxwZXJzLmhhc1BhcmVudChhb2JqLCBhdHRyKSkgcmV0dXJuO1xuXG4gICAgICAgIHZhciBleHRyYXBhcmFtO1xuICAgICAgICBpZihhdHRyLnN1YnN0cigwLCA2KSA9PT0gJ0xBWU9VVCcpIHtcbiAgICAgICAgICAgIGV4dHJhcGFyYW0gPSBsYXlvdXROUChnZC5sYXlvdXQsIGF0dHIucmVwbGFjZSgnTEFZT1VUJywgJycpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB0cmFjZWkgPSB0cmFjZXNbaV07XG4gICAgICAgICAgICB2YXIgcHJlR1VJID0gZnVsbExheW91dC5fdHJhY2VQcmVHVUlbZ2V0RnVsbFRyYWNlKHRyYWNlaSkuX2Z1bGxJbnB1dC51aWRdO1xuICAgICAgICAgICAgZXh0cmFwYXJhbSA9IG1ha2VOUChwcmVHVUksIGd1aUVkaXRGbGFnKShkYXRhW3RyYWNlaV0sIGF0dHIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIShhdHRyIGluIHVuZG9pdCkpIHtcbiAgICAgICAgICAgIHVuZG9pdFthdHRyXSA9IGEwKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodW5kb2l0W2F0dHJdW2ldID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHVuZG9pdFthdHRyXVtpXSA9IHVuZGVmaW5lZFRvTnVsbChleHRyYXBhcmFtLmdldCgpKTtcbiAgICAgICAgfVxuICAgICAgICBpZih2YWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgZXh0cmFwYXJhbS5zZXQodmFsKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFsbEJpbnMoYmluQXR0cikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24oaikge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bGxEYXRhW2pdW2JpbkF0dHJdO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFycmF5QmlucyhiaW5BdHRyKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbih2aWosIGopIHtcbiAgICAgICAgICAgIHJldHVybiB2aWogPT09IGZhbHNlID8gZnVsbERhdGFbdHJhY2VzW2pdXVtiaW5BdHRyXSA6IG51bGw7XG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gbm93IG1ha2UgdGhlIGNoYW5nZXMgdG8gZ2QuZGF0YSAoYW5kIG9jY2FzaW9uYWxseSBnZC5sYXlvdXQpXG4gICAgLy8gYW5kIGZpZ3VyZSBvdXQgd2hhdCBraW5kIG9mIGdyYXBoaWNzIHVwZGF0ZSB3ZSBuZWVkIHRvIGRvXG4gICAgZm9yKHZhciBhaSBpbiBhb2JqKSB7XG4gICAgICAgIGlmKGhlbHBlcnMuaGFzUGFyZW50KGFvYmosIGFpKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjYW5ub3Qgc2V0ICcgKyBhaSArICcgYW5kIGEgcGFyZW50IGF0dHJpYnV0ZSBzaW11bHRhbmVvdXNseScpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHZpID0gYW9ialthaV07XG4gICAgICAgIHZhciBjb250O1xuICAgICAgICB2YXIgY29udEZ1bGw7XG4gICAgICAgIHZhciBwYXJhbTtcbiAgICAgICAgdmFyIG9sZFZhbDtcbiAgICAgICAgdmFyIG5ld1ZhbDtcbiAgICAgICAgdmFyIHZhbE9iamVjdDtcblxuICAgICAgICAvLyBCYWNrd2FyZCBjb21wYXRpYmlsaXR5IHNoaW0gZm9yIHR1cm5pbmcgaGlzdG9ncmFtIGF1dG9iaW4gb24sXG4gICAgICAgIC8vIG9yIGZyZWV6aW5nIHByZXZpb3VzIGF1dG9iaW5uZWQgdmFsdWVzLlxuICAgICAgICAvLyBSZXBsYWNlIG9ic29sZXRlIGBhdXRvYmluKHh8eSk6IHRydWVgIHdpdGggYCh4fHkpYmluczogbnVsbGBcbiAgICAgICAgLy8gYW5kIGBhdXRvYmluKHh8eSk6IGZhbHNlYCB3aXRoIHRoZSBgKHh8eSliaW5zYCBpbiBgZnVsbERhdGFgXG4gICAgICAgIGlmKGFpID09PSAnYXV0b2JpbngnIHx8IGFpID09PSAnYXV0b2JpbnknKSB7XG4gICAgICAgICAgICBhaSA9IGFpLmNoYXJBdChhaS5sZW5ndGggLSAxKSArICdiaW5zJztcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkodmkpKSB2aSA9IHZpLm1hcChhcnJheUJpbnMoYWkpKTtcbiAgICAgICAgICAgIGVsc2UgaWYodmkgPT09IGZhbHNlKSB2aSA9IHRyYWNlcy5tYXAoYWxsQmlucyhhaSkpO1xuICAgICAgICAgICAgZWxzZSB2aSA9IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZWRvaXRbYWldID0gdmk7XG5cbiAgICAgICAgaWYoYWkuc3Vic3RyKDAsIDYpID09PSAnTEFZT1VUJykge1xuICAgICAgICAgICAgcGFyYW0gPSBsYXlvdXROUChnZC5sYXlvdXQsIGFpLnJlcGxhY2UoJ0xBWU9VVCcsICcnKSk7XG4gICAgICAgICAgICB1bmRvaXRbYWldID0gW3VuZGVmaW5lZFRvTnVsbChwYXJhbS5nZXQoKSldO1xuICAgICAgICAgICAgLy8gc2luY2Ugd2UncmUgYWxsb3dpbmcgdmFsIHRvIGJlIGFuIGFycmF5LCBhbGxvdyBpdCBoZXJlIHRvbyxcbiAgICAgICAgICAgIC8vIGV2ZW4gdGhvdWdoIHRoYXQncyBtZWFuaW5nbGVzc1xuICAgICAgICAgICAgcGFyYW0uc2V0KEFycmF5LmlzQXJyYXkodmkpID8gdmlbMF0gOiB2aSk7XG4gICAgICAgICAgICAvLyBpcm9uaWNhbGx5LCB0aGUgbGF5b3V0IGF0dHJzIGluIHJlc3R5bGUgb25seSByZXF1aXJlIHJlcGxvdCxcbiAgICAgICAgICAgIC8vIG5vdCByZWxheW91dFxuICAgICAgICAgICAgZmxhZ3MuY2FsYyA9IHRydWU7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHNldCBhdHRyaWJ1dGUgaW4gZ2QuZGF0YVxuICAgICAgICB1bmRvaXRbYWldID0gYTAoKTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgdHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBjb250ID0gZGF0YVt0cmFjZXNbaV1dO1xuICAgICAgICAgICAgY29udEZ1bGwgPSBnZXRGdWxsVHJhY2UodHJhY2VzW2ldKTtcbiAgICAgICAgICAgIHZhciBwcmVHVUkgPSBmdWxsTGF5b3V0Ll90cmFjZVByZUdVSVtjb250RnVsbC5fZnVsbElucHV0LnVpZF07XG4gICAgICAgICAgICBwYXJhbSA9IG1ha2VOUChwcmVHVUksIGd1aUVkaXRGbGFnKShjb250LCBhaSk7XG4gICAgICAgICAgICBvbGRWYWwgPSBwYXJhbS5nZXQoKTtcbiAgICAgICAgICAgIG5ld1ZhbCA9IEFycmF5LmlzQXJyYXkodmkpID8gdmlbaSAlIHZpLmxlbmd0aF0gOiB2aTtcblxuICAgICAgICAgICAgaWYobmV3VmFsID09PSB1bmRlZmluZWQpIGNvbnRpbnVlO1xuXG4gICAgICAgICAgICB2YXIgZmluYWxQYXJ0ID0gcGFyYW0ucGFydHNbcGFyYW0ucGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICB2YXIgcHJlZml4ID0gYWkuc3Vic3RyKDAsIGFpLmxlbmd0aCAtIGZpbmFsUGFydC5sZW5ndGggLSAxKTtcbiAgICAgICAgICAgIHZhciBwcmVmaXhEb3QgPSBwcmVmaXggPyBwcmVmaXggKyAnLicgOiAnJztcbiAgICAgICAgICAgIHZhciBpbm5lckNvbnRGdWxsID0gcHJlZml4ID9cbiAgICAgICAgICAgICAgICBuZXN0ZWRQcm9wZXJ0eShjb250RnVsbCwgcHJlZml4KS5nZXQoKSA6IGNvbnRGdWxsO1xuXG4gICAgICAgICAgICB2YWxPYmplY3QgPSBQbG90U2NoZW1hLmdldFRyYWNlVmFsT2JqZWN0KGNvbnRGdWxsLCBwYXJhbS5wYXJ0cyk7XG5cbiAgICAgICAgICAgIGlmKHZhbE9iamVjdCAmJiB2YWxPYmplY3QuaW1wbGllZEVkaXRzICYmIG5ld1ZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGZvcih2YXIgaW1wbGllZEtleSBpbiB2YWxPYmplY3QuaW1wbGllZEVkaXRzKSB7XG4gICAgICAgICAgICAgICAgICAgIGRvZXh0cmEoTGliLnJlbGF0aXZlQXR0cihhaSwgaW1wbGllZEtleSksIHZhbE9iamVjdC5pbXBsaWVkRWRpdHNbaW1wbGllZEtleV0sIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZigoZmluYWxQYXJ0ID09PSAndGhpY2tuZXNzbW9kZScgfHwgZmluYWxQYXJ0ID09PSAnbGVubW9kZScpICYmXG4gICAgICAgICAgICAgICAgICAgIG9sZFZhbCAhPT0gbmV3VmFsICYmXG4gICAgICAgICAgICAgICAgICAgIChuZXdWYWwgPT09ICdmcmFjdGlvbicgfHwgbmV3VmFsID09PSAncGl4ZWxzJykgJiZcbiAgICAgICAgICAgICAgICAgICAgaW5uZXJDb250RnVsbFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgLy8gY2hhbmdpbmcgY29sb3JiYXIgc2l6ZSBtb2RlcyxcbiAgICAgICAgICAgICAgICAvLyBtYWtlIHRoZSByZXN1bHRpbmcgc2l6ZSBub3QgY2hhbmdlXG4gICAgICAgICAgICAgICAgLy8gbm90ZSB0aGF0IGNvbG9yYmFyIGZyYWN0aW9uYWwgc2l6aW5nIGlzIGJhc2VkIG9uIHRoZVxuICAgICAgICAgICAgICAgIC8vIG9yaWdpbmFsIHBsb3Qgc2l6ZSwgYmVmb3JlIGFueXRoaW5nIChsaWtlIGEgY29sb3JiYXIpXG4gICAgICAgICAgICAgICAgLy8gaW5jcmVhc2VzIHRoZSBtYXJnaW5zXG5cbiAgICAgICAgICAgICAgICB2YXIgZ3MgPSBmdWxsTGF5b3V0Ll9zaXplO1xuICAgICAgICAgICAgICAgIHZhciBvcmllbnQgPSBpbm5lckNvbnRGdWxsLm9yaWVudDtcbiAgICAgICAgICAgICAgICB2YXIgdG9wT3JCb3R0b20gPSAob3JpZW50ID09PSAndG9wJykgfHwgKG9yaWVudCA9PT0gJ2JvdHRvbScpO1xuICAgICAgICAgICAgICAgIGlmKGZpbmFsUGFydCA9PT0gJ3RoaWNrbmVzc21vZGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0aGlja25vcm0gPSB0b3BPckJvdHRvbSA/IGdzLmggOiBncy53O1xuICAgICAgICAgICAgICAgICAgICBkb2V4dHJhKHByZWZpeERvdCArICd0aGlja25lc3MnLCBpbm5lckNvbnRGdWxsLnRoaWNrbmVzcyAqXG4gICAgICAgICAgICAgICAgICAgICAgICAobmV3VmFsID09PSAnZnJhY3Rpb24nID8gMSAvIHRoaWNrbm9ybSA6IHRoaWNrbm9ybSksIGkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW5ub3JtID0gdG9wT3JCb3R0b20gPyBncy53IDogZ3MuaDtcbiAgICAgICAgICAgICAgICAgICAgZG9leHRyYShwcmVmaXhEb3QgKyAnbGVuJywgaW5uZXJDb250RnVsbC5sZW4gKlxuICAgICAgICAgICAgICAgICAgICAgICAgKG5ld1ZhbCA9PT0gJ2ZyYWN0aW9uJyA/IDEgLyBsZW5ub3JtIDogbGVubm9ybSksIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZihhaSA9PT0gJ3R5cGUnICYmIChcbiAgICAgICAgICAgICAgICAobmV3VmFsID09PSAncGllJykgIT09IChvbGRWYWwgPT09ICdwaWUnKSB8fFxuICAgICAgICAgICAgICAgIChuZXdWYWwgPT09ICdmdW5uZWxhcmVhJykgIT09IChvbGRWYWwgPT09ICdmdW5uZWxhcmVhJylcbiAgICAgICAgICAgICkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGFiZWxzVG8gPSAneCc7XG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlc1RvID0gJ3knO1xuICAgICAgICAgICAgICAgIGlmKChuZXdWYWwgPT09ICdiYXInIHx8IG9sZFZhbCA9PT0gJ2JhcicpICYmIGNvbnQub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICAgICAgICAgICAgICBsYWJlbHNUbyA9ICd5JztcbiAgICAgICAgICAgICAgICAgICAgdmFsdWVzVG8gPSAneCc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIExpYi5zd2FwQXR0cnMoY29udCwgWyc/JywgJz9zcmMnXSwgJ2xhYmVscycsIGxhYmVsc1RvKTtcbiAgICAgICAgICAgICAgICBMaWIuc3dhcEF0dHJzKGNvbnQsIFsnZD8nLCAnPzAnXSwgJ2xhYmVsJywgbGFiZWxzVG8pO1xuICAgICAgICAgICAgICAgIExpYi5zd2FwQXR0cnMoY29udCwgWyc/JywgJz9zcmMnXSwgJ3ZhbHVlcycsIHZhbHVlc1RvKTtcblxuICAgICAgICAgICAgICAgIGlmKG9sZFZhbCA9PT0gJ3BpZScgfHwgb2xkVmFsID09PSAnZnVubmVsYXJlYScpIHtcbiAgICAgICAgICAgICAgICAgICAgbmVzdGVkUHJvcGVydHkoY29udCwgJ21hcmtlci5jb2xvcicpXG4gICAgICAgICAgICAgICAgICAgICAgICAuc2V0KG5lc3RlZFByb3BlcnR5KGNvbnQsICdtYXJrZXIuY29sb3JzJykuZ2V0KCkpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHN1cGVyIGtsdWRneSAtIGJ1dCBpZiBhbGwgcGllcyBhcmUgZ29uZSB3ZSB3b24ndCByZW1vdmUgdGhlbSBvdGhlcndpc2VcbiAgICAgICAgICAgICAgICAgICAgZnVsbExheW91dC5fcGllbGF5ZXIuc2VsZWN0QWxsKCdnLnRyYWNlJykucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKFJlZ2lzdHJ5LnRyYWNlSXMoY29udCwgJ2NhcnRlc2lhbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIG5lc3RlZFByb3BlcnR5KGNvbnQsICdtYXJrZXIuY29sb3JzJylcbiAgICAgICAgICAgICAgICAgICAgICAgIC5zZXQobmVzdGVkUHJvcGVydHkoY29udCwgJ21hcmtlci5jb2xvcicpLmdldCgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHVuZG9pdFthaV1baV0gPSB1bmRlZmluZWRUb051bGwob2xkVmFsKTtcbiAgICAgICAgICAgIC8vIHNldCB0aGUgbmV3IHZhbHVlIC0gaWYgdmFsIGlzIGFuIGFycmF5LCBpdCdzIG9uZSBlbCBwZXIgdHJhY2VcbiAgICAgICAgICAgIC8vIGZpcnN0IGNoZWNrIGZvciBhdHRyaWJ1dGVzIHRoYXQgZ2V0IG1vcmUgY29tcGxleCBhbHRlcmF0aW9uc1xuICAgICAgICAgICAgdmFyIHN3YXBBdHRycyA9IFtcbiAgICAgICAgICAgICAgICAnc3dhcHh5JywgJ3N3YXB4eWF4ZXMnLCAnb3JpZW50YXRpb24nLCAnb3JpZW50YXRpb25heGVzJ1xuICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIGlmKHN3YXBBdHRycy5pbmRleE9mKGFpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBzZXR0aW5nIGFuIG9yaWVudGF0aW9uOiBtYWtlIHN1cmUgaXQncyBjaGFuZ2luZ1xuICAgICAgICAgICAgICAgIC8vIGJlZm9yZSB3ZSBzd2FwIGV2ZXJ5dGhpbmcgZWxzZVxuICAgICAgICAgICAgICAgIGlmKGFpID09PSAnb3JpZW50YXRpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHBhcmFtLnNldChuZXdWYWwpO1xuICAgICAgICAgICAgICAgICAgICAvLyBvYm5veGlvdXMgdGhhdCB3ZSBuZWVkIHRoaXMgbGV2ZWwgb2YgY291cGxpbmcuLi4gYnV0IGluIG9yZGVyIHRvXG4gICAgICAgICAgICAgICAgICAgIC8vIHByb3Blcmx5IGhhbmRsZSBzZXR0aW5nIG9yaWVudGF0aW9uIHRvIGBudWxsYCB3ZSBuZWVkIHRvIG1pbWljXG4gICAgICAgICAgICAgICAgICAgIC8vIHRoZSBsb2dpYyBpbnNpZGUgQmFycy5zdXBwbHlEZWZhdWx0cyBmb3IgZGVmYXVsdCBvcmllbnRhdGlvblxuICAgICAgICAgICAgICAgICAgICB2YXIgZGVmYXVsdE9yaWVudGF0aW9uID0gKGNvbnQueCAmJiAhY29udC55KSA/ICdoJyA6ICd2JztcbiAgICAgICAgICAgICAgICAgICAgaWYoKHBhcmFtLmdldCgpIHx8IGRlZmF1bHRPcmllbnRhdGlvbikgPT09IGNvbnRGdWxsLm9yaWVudGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihhaSA9PT0gJ29yaWVudGF0aW9uYXhlcycpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gb3JpZW50YXRpb25heGVzIGhhcyBubyB2YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgLy8gaXQgZmxpcHMgZXZlcnl0aGluZyBhbmQgdGhlIGF4ZXNcblxuICAgICAgICAgICAgICAgICAgICBjb250Lm9yaWVudGF0aW9uID1cbiAgICAgICAgICAgICAgICAgICAgICAgIHt2OiAnaCcsIGg6ICd2J31bY29udEZ1bGwub3JpZW50YXRpb25dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBoZWxwZXJzLnN3YXBYWURhdGEoY29udCk7XG4gICAgICAgICAgICAgICAgZmxhZ3MuY2FsYyA9IGZsYWdzLmNsZWFyQXhpc1R5cGVzID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihQbG90cy5kYXRhQXJyYXlDb250YWluZXJzLmluZGV4T2YocGFyYW0ucGFydHNbMF0pICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIFRPRE86IHVzZSBtYW5hZ2VBcnJheXMuYXBwbHlDb250YWluZXJBcnJheUNoYW5nZXMgaGVyZSB0b29cbiAgICAgICAgICAgICAgICBoZWxwZXJzLm1hbmFnZUFycmF5Q29udGFpbmVycyhwYXJhbSwgbmV3VmFsLCB1bmRvaXQpO1xuICAgICAgICAgICAgICAgIGZsYWdzLmNhbGMgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZih2YWxPYmplY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbXVzdCByZWRvIGNhbGNkYXRhIHdoZW4gcmVzdHlsaW5nIGFycmF5IHZhbHVlcyBvZiBhcnJheU9rIGF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgICAgICAgLy8gLi4uIGJ1dCBubyBuZWVkIHRvIHRoaXMgZm9yIHJlZ2wtYmFzZWQgdHJhY2VzXG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbE9iamVjdC5hcnJheU9rICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAhUmVnaXN0cnkudHJhY2VJcyhjb250RnVsbCwgJ3JlZ2wnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKExpYi5pc0FycmF5T3JUeXBlZEFycmF5KG5ld1ZhbCkgfHwgTGliLmlzQXJyYXlPclR5cGVkQXJyYXkob2xkVmFsKSlcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmbGFncy5jYWxjID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGVkaXRUeXBlcy51cGRhdGUoZmxhZ3MsIHZhbE9iamVjdCk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgICAgICogaWYgd2UgY291bGRuJ3QgZmluZCB2YWxPYmplY3QsICBhc3N1bWUgYSBmdWxsIHJlY2FsYy5cbiAgICAgICAgICAgICAgICAgICAgICogVGhpcyBjYW4gaGFwcGVuIGlmIHlvdSdyZSBjaGFuZ2luZyB0eXBlIGFuZCBtYWtpbmdcbiAgICAgICAgICAgICAgICAgICAgICogc29tZSBvdGhlciBlZGl0cyB0b28sIHNvIHRoZSBtb2R1bGVzIHdlJ3JlXG4gICAgICAgICAgICAgICAgICAgICAqIGxvb2tpbmcgYXQgZG9uJ3QgaGF2ZSB0aGVzZSBhdHRyaWJ1dGVzIGluIHRoZW0uXG4gICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBmbGFncy5jYWxjID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBhbGwgdGhlIG90aGVyIG9uZXMsIGp1c3QgbW9kaWZ5IHRoYXQgb25lIGF0dHJpYnV0ZVxuICAgICAgICAgICAgICAgIHBhcmFtLnNldChuZXdWYWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3dhcCB0aGUgZGF0YSBhdHRyaWJ1dGVzIG9mIHRoZSByZWxldmFudCB4IGFuZCB5IGF4ZXM/XG4gICAgICAgIGlmKFsnc3dhcHh5YXhlcycsICdvcmllbnRhdGlvbmF4ZXMnXS5pbmRleE9mKGFpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIEF4ZXMuc3dhcChnZCwgdHJhY2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN3YXAgaG92ZXJtb2RlIGlmIHNldCB0byBcImNvbXBhcmUgeC95IGRhdGFcIlxuICAgICAgICBpZihhaSA9PT0gJ29yaWVudGF0aW9uYXhlcycpIHtcbiAgICAgICAgICAgIHZhciBob3Zlcm1vZGUgPSBuZXN0ZWRQcm9wZXJ0eShnZC5sYXlvdXQsICdob3Zlcm1vZGUnKTtcbiAgICAgICAgICAgIGlmKGhvdmVybW9kZS5nZXQoKSA9PT0gJ3gnKSB7XG4gICAgICAgICAgICAgICAgaG92ZXJtb2RlLnNldCgneScpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGhvdmVybW9kZS5nZXQoKSA9PT0gJ3knKSB7XG4gICAgICAgICAgICAgICAgaG92ZXJtb2RlLnNldCgneCcpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKGhvdmVybW9kZS5nZXQoKSA9PT0gJ3ggdW5pZmllZCcpIHtcbiAgICAgICAgICAgICAgICBob3Zlcm1vZGUuc2V0KCd5IHVuaWZpZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihob3Zlcm1vZGUuZ2V0KCkgPT09ICd5IHVuaWZpZWQnKSB7XG4gICAgICAgICAgICAgICAgaG92ZXJtb2RlLnNldCgneCB1bmlmaWVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBNYWpvciBlbm91Z2ggY2hhbmdlcyBkZXNlcnZlIGF1dG9zY2FsZSBhbmRcbiAgICAgICAgLy8gbm9uLXJldmVyc2VkIGF4ZXMgc28gcGVvcGxlIGRvbid0IGdldCBjb25mdXNlZFxuICAgICAgICAvL1xuICAgICAgICAvLyBOb3RlOiBhdXRvYmluIChvciBpdHMgbmV3IGFuYWxvZyBiaW4gY2xlYXJpbmcpIGlzIG5vdCBpbmNsdWRlZCBoZXJlXG4gICAgICAgIC8vIHNpbmNlIHdlJ3JlIG5vdCBwdXNoaW5nIGJpbnMgYmFjayB0byBnZC5kYXRhLCBzbyBpZiB3ZSBoYXZlIGJpblxuICAgICAgICAvLyBpbmZvIGl0IHdhcyBleHBsaWNpdGx5IHByb3ZpZGVkIGJ5IHRoZSB1c2VyLlxuICAgICAgICBpZihbJ29yaWVudGF0aW9uJywgJ3R5cGUnXS5pbmRleE9mKGFpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGF4bGlzdCA9IFtdO1xuICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgdHJhY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIHRyYWNlID0gZGF0YVt0cmFjZXNbaV1dO1xuXG4gICAgICAgICAgICAgICAgaWYoUmVnaXN0cnkudHJhY2VJcyh0cmFjZSwgJ2NhcnRlc2lhbicpKSB7XG4gICAgICAgICAgICAgICAgICAgIGFkZFRvQXhsaXN0KHRyYWNlLnhheGlzIHx8ICd4Jyk7XG4gICAgICAgICAgICAgICAgICAgIGFkZFRvQXhsaXN0KHRyYWNlLnlheGlzIHx8ICd5Jyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBkb2V4dHJhKGF4bGlzdC5tYXAoYXV0b3JhbmdlQXR0ciksIHRydWUsIDApO1xuICAgICAgICAgICAgZG9leHRyYShheGxpc3QubWFwKHJhbmdlQXR0ciksIFswLCAxXSwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZihmbGFncy5jYWxjIHx8IGZsYWdzLnBsb3QpIHtcbiAgICAgICAgZmxhZ3MuZnVsbFJlcGxvdCA9IHRydWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgZmxhZ3M6IGZsYWdzLFxuICAgICAgICB1bmRvaXQ6IHVuZG9pdCxcbiAgICAgICAgcmVkb2l0OiByZWRvaXQsXG4gICAgICAgIHRyYWNlczogdHJhY2VzLFxuICAgICAgICBldmVudERhdGE6IExpYi5leHRlbmREZWVwTm9BcnJheXMoW10sIFtldmVudERhdGEsIHRyYWNlc10pXG4gICAgfTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBkZXByZWNhdGVkIGF0dHJpYnV0ZSBrZXlzIHRvXG4gKiB0aGUgY3VycmVudCBBUEkgdG8gZW5zdXJlIGJhY2t3YXJkcyBjb21wYXRpYmlsaXR5LlxuICpcbiAqIFRoaXMgaXMgbmVlZGVkIGZvciB0aGUgdXBkYXRlIG1lY2hhbmlzbSB0byBkZXRlcm1pbmUgd2hpY2hcbiAqIHN1YnJvdXRpbmVzIHRvIHJ1biBiYXNlZCBvbiB0aGUgYWN0dWFsIGF0dHJpYnV0ZVxuICogZGVmaW5pdGlvbnMgKHRoYXQgZG9uJ3QgaW5jbHVkZSB0aGUgZGVwcmVjYXRlZCBvbmVzKS5cbiAqXG4gKiBFLmcuIE1hcHMgeyd4YXhpcy50aXRsZSc6ICdBIGNoYXJ0J30gdG8geyd4YXhpcy50aXRsZS50ZXh0JzogJ0EgY2hhcnQnfVxuICogYW5kIHt0aXRsZWZvbnQ6IHsuLi59fSB0byB7J3RpdGxlLmZvbnQnOiB7Li4ufX0uXG4gKlxuICogQHBhcmFtIGFvYmpcbiAqL1xuZnVuY3Rpb24gY2xlYW5EZXByZWNhdGVkQXR0cmlidXRlS2V5cyhhb2JqKSB7XG4gICAgdmFyIG9sZEF4aXNUaXRsZVJlZ2V4ID0gTGliLmNvdW50ZXJSZWdleCgnYXhpcycsICdcXC50aXRsZScsIGZhbHNlLCBmYWxzZSk7XG4gICAgdmFyIGNvbG9yYmFyUmVnZXggPSAvY29sb3JiYXJcXC50aXRsZSQvO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYW9iaik7XG4gICAgdmFyIGksIGtleSwgdmFsdWU7XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGtleSA9IGtleXNbaV07XG4gICAgICAgIHZhbHVlID0gYW9ialtrZXldO1xuXG4gICAgICAgIGlmKChrZXkgPT09ICd0aXRsZScgfHwgb2xkQXhpc1RpdGxlUmVnZXgudGVzdChrZXkpIHx8IGNvbG9yYmFyUmVnZXgudGVzdChrZXkpKSAmJlxuICAgICAgICAgICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnIHx8IHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpKSB7XG4gICAgICAgICAgICByZXBsYWNlKGtleSwga2V5LnJlcGxhY2UoJ3RpdGxlJywgJ3RpdGxlLnRleHQnKSk7XG4gICAgICAgIH0gZWxzZSBpZihrZXkuaW5kZXhPZigndGl0bGVmb250JykgPiAtMSkge1xuICAgICAgICAgICAgcmVwbGFjZShrZXksIGtleS5yZXBsYWNlKCd0aXRsZWZvbnQnLCAndGl0bGUuZm9udCcpKTtcbiAgICAgICAgfSBlbHNlIGlmKGtleS5pbmRleE9mKCd0aXRsZXBvc2l0aW9uJykgPiAtMSkge1xuICAgICAgICAgICAgcmVwbGFjZShrZXksIGtleS5yZXBsYWNlKCd0aXRsZXBvc2l0aW9uJywgJ3RpdGxlLnBvc2l0aW9uJykpO1xuICAgICAgICB9IGVsc2UgaWYoa2V5LmluZGV4T2YoJ3RpdGxlc2lkZScpID4gLTEpIHtcbiAgICAgICAgICAgIHJlcGxhY2Uoa2V5LCBrZXkucmVwbGFjZSgndGl0bGVzaWRlJywgJ3RpdGxlLnNpZGUnKSk7XG4gICAgICAgIH0gZWxzZSBpZihrZXkuaW5kZXhPZigndGl0bGVvZmZzZXQnKSA+IC0xKSB7XG4gICAgICAgICAgICByZXBsYWNlKGtleSwga2V5LnJlcGxhY2UoJ3RpdGxlb2Zmc2V0JywgJ3RpdGxlLm9mZnNldCcpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcGxhY2Uob2xkQXR0clN0ciwgbmV3QXR0clN0cikge1xuICAgICAgICBhb2JqW25ld0F0dHJTdHJdID0gYW9ialtvbGRBdHRyU3RyXTtcbiAgICAgICAgZGVsZXRlIGFvYmpbb2xkQXR0clN0cl07XG4gICAgfVxufVxuXG4vKipcbiAqIHJlbGF5b3V0OiB1cGRhdGUgbGF5b3V0IGF0dHJpYnV0ZXMgb2YgYW4gZXhpc3RpbmcgcGxvdFxuICpcbiAqIENhbiBiZSBjYWxsZWQgdHdvIHdheXM6XG4gKlxuICogU2lnbmF0dXJlIDE6XG4gKiBAcGFyYW0ge1N0cmluZyB8IEhUTUxEaXZFbGVtZW50fSBnZFxuICogIHRoZSBpZCBvciBkb20gZWxlbWVudCBvZiB0aGUgZ3JhcGggY29udGFpbmVyIGRpdlxuICogQHBhcmFtIHtTdHJpbmd9IGFzdHJcbiAqICBhdHRyaWJ1dGUgc3RyaW5nIChsaWtlIGAneGF4aXMucmFuZ2VbMF0nYCkgdG8gdXBkYXRlXG4gKiBAcGFyYW0geyp9IHZhbFxuICogIHZhbHVlIHRvIGdpdmUgdGhpcyBhdHRyaWJ1dGVcbiAqXG4gKiBTaWduYXR1cmUgMjpcbiAqIEBwYXJhbSB7U3RyaW5nIHwgSFRNTERpdkVsZW1lbnR9IGdkXG4gKiAgKGFzIGluIHNpZ25hdHVyZSAxKVxuICogQHBhcmFtIHtPYmplY3R9IGFvYmpcbiAqICBhdHRyaWJ1dGUgb2JqZWN0IGB7YXN0cjE6IHZhbDEsIGFzdHIyOiB2YWwyIC4uLn1gXG4gKiAgYWxsb3dzIHNldHRpbmcgbXVsdGlwbGUgYXR0cmlidXRlcyBzaW11bHRhbmVvdXNseVxuICovXG5mdW5jdGlvbiByZWxheW91dChnZCwgYXN0ciwgdmFsKSB7XG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuICAgIGhlbHBlcnMuY2xlYXJQcm9taXNlUXVldWUoZ2QpO1xuXG4gICAgaWYoZ2QuZnJhbWV3b3JrICYmIGdkLmZyYW1ld29yay5pc1BvbGFyKSB7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoZ2QpO1xuICAgIH1cblxuICAgIHZhciBhb2JqID0ge307XG4gICAgaWYodHlwZW9mIGFzdHIgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGFvYmpbYXN0cl0gPSB2YWw7XG4gICAgfSBlbHNlIGlmKExpYi5pc1BsYWluT2JqZWN0KGFzdHIpKSB7XG4gICAgICAgIGFvYmogPSBMaWIuZXh0ZW5kRmxhdCh7fSwgYXN0cik7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgTGliLndhcm4oJ1JlbGF5b3V0IGZhaWwuJywgYXN0ciwgdmFsKTtcbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgfVxuXG4gICAgaWYoT2JqZWN0LmtleXMoYW9iaikubGVuZ3RoKSBnZC5jaGFuZ2VkID0gdHJ1ZTtcblxuICAgIHZhciBzcGVjcyA9IF9yZWxheW91dChnZCwgYW9iaik7XG4gICAgdmFyIGZsYWdzID0gc3BlY3MuZmxhZ3M7XG5cbiAgICAvLyBjbGVhciBjYWxjZGF0YSBpZiByZXF1aXJlZFxuICAgIGlmKGZsYWdzLmNhbGMpIGdkLmNhbGNkYXRhID0gdW5kZWZpbmVkO1xuXG4gICAgLy8gZmlsbCBpbiByZWRyYXcgc2VxdWVuY2VcblxuICAgIC8vIGV2ZW4gaWYgd2UgZG9uJ3QgaGF2ZSBhbnl0aGluZyBsZWZ0IGluIGFvYmosXG4gICAgLy8gc29tZXRoaW5nIG1heSBoYXZlIGhhcHBlbmVkIHdpdGhpbiByZWxheW91dCB0aGF0IHdlXG4gICAgLy8gbmVlZCB0byB3YWl0IGZvclxuICAgIHZhciBzZXEgPSBbUGxvdHMucHJldmlvdXNQcm9taXNlc107XG5cbiAgICBpZihmbGFncy5sYXlvdXRSZXBsb3QpIHtcbiAgICAgICAgc2VxLnB1c2goc3Vicm91dGluZXMubGF5b3V0UmVwbG90KTtcbiAgICB9IGVsc2UgaWYoT2JqZWN0LmtleXMoYW9iaikubGVuZ3RoKSB7XG4gICAgICAgIGF4UmFuZ2VTdXBwbHlEZWZhdWx0c0J5UGFzcyhnZCwgZmxhZ3MsIHNwZWNzKSB8fCBQbG90cy5zdXBwbHlEZWZhdWx0cyhnZCk7XG5cbiAgICAgICAgaWYoZmxhZ3MubGVnZW5kKSBzZXEucHVzaChzdWJyb3V0aW5lcy5kb0xlZ2VuZCk7XG4gICAgICAgIGlmKGZsYWdzLmxheW91dHN0eWxlKSBzZXEucHVzaChzdWJyb3V0aW5lcy5sYXlvdXRTdHlsZXMpO1xuICAgICAgICBpZihmbGFncy5heHJhbmdlKSBhZGRBeFJhbmdlU2VxdWVuY2Uoc2VxLCBzcGVjcy5yYW5nZXNBbHRlcmVkKTtcbiAgICAgICAgaWYoZmxhZ3MudGlja3MpIHNlcS5wdXNoKHN1YnJvdXRpbmVzLmRvVGlja3NSZWxheW91dCk7XG4gICAgICAgIGlmKGZsYWdzLm1vZGViYXIpIHNlcS5wdXNoKHN1YnJvdXRpbmVzLmRvTW9kZUJhcik7XG4gICAgICAgIGlmKGZsYWdzLmNhbWVyYSkgc2VxLnB1c2goc3Vicm91dGluZXMuZG9DYW1lcmEpO1xuICAgICAgICBpZihmbGFncy5jb2xvcmJhcnMpIHNlcS5wdXNoKHN1YnJvdXRpbmVzLmRvQ29sb3JCYXJzKTtcblxuICAgICAgICBzZXEucHVzaChlbWl0QWZ0ZXJQbG90KTtcbiAgICB9XG5cbiAgICBzZXEucHVzaChQbG90cy5yZWhvdmVyLCBQbG90cy5yZWRyYWcpO1xuXG4gICAgUXVldWUuYWRkKGdkLFxuICAgICAgICByZWxheW91dCwgW2dkLCBzcGVjcy51bmRvaXRdLFxuICAgICAgICByZWxheW91dCwgW2dkLCBzcGVjcy5yZWRvaXRdXG4gICAgKTtcblxuICAgIHZhciBwbG90RG9uZSA9IExpYi5zeW5jT3JBc3luYyhzZXEsIGdkKTtcbiAgICBpZighcGxvdERvbmUgfHwgIXBsb3REb25lLnRoZW4pIHBsb3REb25lID0gUHJvbWlzZS5yZXNvbHZlKGdkKTtcblxuICAgIHJldHVybiBwbG90RG9uZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBnZC5lbWl0KCdwbG90bHlfcmVsYXlvdXQnLCBzcGVjcy5ldmVudERhdGEpO1xuICAgICAgICByZXR1cm4gZ2Q7XG4gICAgfSk7XG59XG5cbi8vIE9wdGltaXphdGlvbiBtb3N0bHkgZm9yIGxhcmdlIHNwbG9tIHRyYWNlcyB3aGVyZVxuLy8gUGxvdHMuc3VwcGx5RGVmYXVsdHMgY2FuIHRha2UgPiAxMDBtc1xuZnVuY3Rpb24gYXhSYW5nZVN1cHBseURlZmF1bHRzQnlQYXNzKGdkLCBmbGFncywgc3BlY3MpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuXG4gICAgaWYoIWZsYWdzLmF4cmFuZ2UpIHJldHVybiBmYWxzZTtcblxuICAgIGZvcih2YXIgayBpbiBmbGFncykge1xuICAgICAgICBpZihrICE9PSAnYXhyYW5nZScgJiYgZmxhZ3Nba10pIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBmb3IodmFyIGF4SWQgaW4gc3BlY3MucmFuZ2VzQWx0ZXJlZCkge1xuICAgICAgICB2YXIgYXhOYW1lID0gQXhlcy5pZDJuYW1lKGF4SWQpO1xuICAgICAgICB2YXIgYXhJbiA9IGdkLmxheW91dFtheE5hbWVdO1xuICAgICAgICB2YXIgYXhPdXQgPSBmdWxsTGF5b3V0W2F4TmFtZV07XG4gICAgICAgIGF4T3V0LmF1dG9yYW5nZSA9IGF4SW4uYXV0b3JhbmdlO1xuICAgICAgICBheE91dC5yYW5nZSA9IGF4SW4ucmFuZ2Uuc2xpY2UoKTtcbiAgICAgICAgYXhPdXQuY2xlYW5SYW5nZSgpO1xuXG4gICAgICAgIGlmKGF4T3V0Ll9tYXRjaEdyb3VwKSB7XG4gICAgICAgICAgICBmb3IodmFyIGF4SWQyIGluIGF4T3V0Ll9tYXRjaEdyb3VwKSB7XG4gICAgICAgICAgICAgICAgaWYoYXhJZDIgIT09IGF4SWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGF4MiA9IGZ1bGxMYXlvdXRbQXhlcy5pZDJuYW1lKGF4SWQyKV07XG4gICAgICAgICAgICAgICAgICAgIGF4Mi5hdXRvcmFuZ2UgPSBheE91dC5hdXRvcmFuZ2U7XG4gICAgICAgICAgICAgICAgICAgIGF4Mi5yYW5nZSA9IGF4T3V0LnJhbmdlLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGF4Mi5faW5wdXQucmFuZ2UgPSBheE91dC5yYW5nZS5zbGljZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBhZGRBeFJhbmdlU2VxdWVuY2Uoc2VxLCByYW5nZXNBbHRlcmVkKSB7XG4gICAgLy8gTi5CLiBsZWF2ZSBhcyBzZXF1ZW5jZSBvZiBzdWJyb3V0aW5lcyAoZm9yIG5vdykgaW5zdGVhZCBvZlxuICAgIC8vIHN1YnJvdXRpbmUgb2YgaXRzIG93biBzbyB0aGF0IGZpbmFsRHJhdyBhbHdheXMgZ2V0c1xuICAgIC8vIGV4ZWN1dGVkIGFmdGVyIGRyYXdEYXRhXG4gICAgdmFyIGRyYXdBeGVzID0gcmFuZ2VzQWx0ZXJlZCA/XG4gICAgICAgIGZ1bmN0aW9uKGdkKSB7XG4gICAgICAgICAgICB2YXIgYXhJZHMgPSBbXTtcbiAgICAgICAgICAgIHZhciBza2lwVGl0bGUgPSB0cnVlO1xuXG4gICAgICAgICAgICBmb3IodmFyIGlkIGluIHJhbmdlc0FsdGVyZWQpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXggPSBBeGVzLmdldEZyb21JZChnZCwgaWQpO1xuICAgICAgICAgICAgICAgIGF4SWRzLnB1c2goaWQpO1xuXG4gICAgICAgICAgICAgICAgaWYoYXguX21hdGNoR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpZDIgaW4gYXguX21hdGNoR3JvdXApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCFyYW5nZXNBbHRlcmVkW2lkMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBheElkcy5wdXNoKGlkMik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZihheC5hdXRvbWFyZ2luKSBza2lwVGl0bGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIEF4ZXMuZHJhdyhnZCwgYXhJZHMsIHtza2lwVGl0bGU6IHNraXBUaXRsZX0pO1xuICAgICAgICB9IDpcbiAgICAgICAgZnVuY3Rpb24oZ2QpIHtcbiAgICAgICAgICAgIHJldHVybiBBeGVzLmRyYXcoZ2QsICdyZWRyYXcnKTtcbiAgICAgICAgfTtcblxuICAgIHNlcS5wdXNoKFxuICAgICAgICBjbGVhclNlbGVjdCxcbiAgICAgICAgc3Vicm91dGluZXMuZG9BdXRvUmFuZ2VBbmRDb25zdHJhaW50cyxcbiAgICAgICAgZHJhd0F4ZXMsXG4gICAgICAgIHN1YnJvdXRpbmVzLmRyYXdEYXRhLFxuICAgICAgICBzdWJyb3V0aW5lcy5maW5hbERyYXdcbiAgICApO1xufVxuXG52YXIgQVhfUkFOR0VfUkUgPSAvXlt4eXpdYXhpc1swLTldKlxcLnJhbmdlKFxcW1swfDFdXFxdKT8kLztcbnZhciBBWF9BVVRPUkFOR0VfUkUgPSAvXlt4eXpdYXhpc1swLTldKlxcLmF1dG9yYW5nZSQvO1xudmFyIEFYX0RPTUFJTl9SRSA9IC9eW3h5el1heGlzWzAtOV0qXFwuZG9tYWluKFxcW1swfDFdXFxdKT8kLztcblxuZnVuY3Rpb24gX3JlbGF5b3V0KGdkLCBhb2JqKSB7XG4gICAgdmFyIGxheW91dCA9IGdkLmxheW91dDtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBndWlFZGl0RmxhZyA9IGZ1bGxMYXlvdXQuX2d1aUVkaXRpbmc7XG4gICAgdmFyIGxheW91dE5QID0gbWFrZU5QKGZ1bGxMYXlvdXQuX3ByZUdVSSwgZ3VpRWRpdEZsYWcpO1xuICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMoYW9iaik7XG4gICAgdmFyIGF4ZXMgPSBBeGVzLmxpc3QoZ2QpO1xuICAgIHZhciBldmVudERhdGEgPSBMaWIuZXh0ZW5kRGVlcEFsbCh7fSwgYW9iaik7XG4gICAgdmFyIGFycmF5RWRpdHMgPSB7fTtcblxuICAgIHZhciBhcnJheVN0ciwgaSwgajtcblxuICAgIGNsZWFuRGVwcmVjYXRlZEF0dHJpYnV0ZUtleXMoYW9iaik7XG4gICAga2V5cyA9IE9iamVjdC5rZXlzKGFvYmopO1xuXG4gICAgLy8gbG9vayBmb3IgJ2FsbGF4ZXMnLCBzcGxpdCBvdXQgaW50byBhbGwgYXhlc1xuICAgIC8vIGluIGNhc2Ugb2YgM0QgdGhlIGF4aXMgYXJlIG5lc3RlZCB3aXRoaW4gYSBzY2VuZSB3aGljaCBpcyBoZWxkIGluIF9pZFxuICAgIGZvcihpID0gMDsgaSA8IGtleXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoa2V5c1tpXS5pbmRleE9mKCdhbGxheGVzJykgPT09IDApIHtcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IGF4ZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICB2YXIgc2NlbmUgPSBheGVzW2pdLl9pZC5zdWJzdHIoMSk7XG4gICAgICAgICAgICAgICAgdmFyIGF4aXNBdHRyID0gKHNjZW5lLmluZGV4T2YoJ3NjZW5lJykgIT09IC0xKSA/IChzY2VuZSArICcuJykgOiAnJztcbiAgICAgICAgICAgICAgICB2YXIgbmV3a2V5ID0ga2V5c1tpXS5yZXBsYWNlKCdhbGxheGVzJywgYXhpc0F0dHIgKyBheGVzW2pdLl9uYW1lKTtcblxuICAgICAgICAgICAgICAgIGlmKCFhb2JqW25ld2tleV0pIGFvYmpbbmV3a2V5XSA9IGFvYmpba2V5c1tpXV07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGRlbGV0ZSBhb2JqW2tleXNbaV1dO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gaW5pdGlhbGl6ZSBmbGFnc1xuICAgIHZhciBmbGFncyA9IGVkaXRUeXBlcy5sYXlvdXRGbGFncygpO1xuXG4gICAgLy8gY29waWVzIG9mIHRoZSBjaGFuZ2UgKGFuZCBwcmV2aW91cyB2YWx1ZXMgb2YgYW55dGhpbmcgYWZmZWN0ZWQpXG4gICAgLy8gZm9yIHRoZSB1bmRvIC8gcmVkbyBxdWV1ZVxuICAgIHZhciByZWRvaXQgPSB7fTtcbiAgICB2YXIgdW5kb2l0ID0ge307XG5cbiAgICAvLyBmb3IgYXR0cnMgdGhhdCBpbnRlcmFjdCAobGlrZSBzY2FsZXMgJiBhdXRvc2NhbGVzKSwgc2F2ZSB0aGVcbiAgICAvLyBvbGQgdmFscyBiZWZvcmUgbWFraW5nIHRoZSBjaGFuZ2VcbiAgICAvLyB2YWw9dW5kZWZpbmVkIHdpbGwgbm90IHNldCBhIHZhbHVlLCBqdXN0IHJlY29yZCB3aGF0IHRoZSB2YWx1ZSB3YXMuXG4gICAgLy8gYXR0ciBjYW4gYmUgYW4gYXJyYXkgdG8gc2V0IHNldmVyYWwgYXQgb25jZSAoYWxsIHRvIHRoZSBzYW1lIHZhbClcbiAgICBmdW5jdGlvbiBkb2V4dHJhKGF0dHIsIHZhbCkge1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KGF0dHIpKSB7XG4gICAgICAgICAgICBhdHRyLmZvckVhY2goZnVuY3Rpb24oYSkgeyBkb2V4dHJhKGEsIHZhbCk7IH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgd2UgaGF2ZSBhbm90aGVyIHZhbHVlIGZvciB0aGlzIGF0dHJpYnV0ZSAoZXhwbGljaXRseSBvclxuICAgICAgICAvLyB2aWEgYSBwYXJlbnQpIGRvIG5vdCBvdmVycmlkZSB3aXRoIHRoaXMgYXV0by1nZW5lcmF0ZWQgZXh0cmFcbiAgICAgICAgaWYoYXR0ciBpbiBhb2JqIHx8IGhlbHBlcnMuaGFzUGFyZW50KGFvYmosIGF0dHIpKSByZXR1cm47XG5cbiAgICAgICAgdmFyIHAgPSBsYXlvdXROUChsYXlvdXQsIGF0dHIpO1xuICAgICAgICBpZighKGF0dHIgaW4gdW5kb2l0KSkge1xuICAgICAgICAgICAgdW5kb2l0W2F0dHJdID0gdW5kZWZpbmVkVG9OdWxsKHAuZ2V0KCkpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHZhbCAhPT0gdW5kZWZpbmVkKSBwLnNldCh2YWwpO1xuICAgIH1cblxuICAgIC8vIGZvciBjb25zdHJhaW50IGVuZm9yY2VtZW50OiBrZWVwIHRyYWNrIG9mIGFsbCBheGVzIChhcyB7aWQ6IG5hbWV9KVxuICAgIC8vIHdlJ3JlIGVkaXRpbmcgdGhlIChhdXRvKXJhbmdlIG9mLCBzbyB3ZSBjYW4gdGVsbCB0aGUgb3RoZXJzIGNvbnN0cmFpbmVkXG4gICAgLy8gdG8gc2NhbGUgd2l0aCB0aGVtIHRoYXQgaXQncyBPSyBmb3IgdGhlbSB0byBzaHJpbmtcbiAgICB2YXIgcmFuZ2VzQWx0ZXJlZCA9IHt9O1xuICAgIHZhciBheElkO1xuXG4gICAgZnVuY3Rpb24gcmVjb3JkQWx0ZXJlZEF4aXMocGxlYWZQbHVzKSB7XG4gICAgICAgIHZhciBheElkID0gQXhlcy5uYW1lMmlkKHBsZWFmUGx1cy5zcGxpdCgnLicpWzBdKTtcbiAgICAgICAgcmFuZ2VzQWx0ZXJlZFtheElkXSA9IDE7XG4gICAgICAgIHJldHVybiBheElkO1xuICAgIH1cblxuICAgIC8vIGFsdGVyIGdkLmxheW91dFxuICAgIGZvcih2YXIgYWkgaW4gYW9iaikge1xuICAgICAgICBpZihoZWxwZXJzLmhhc1BhcmVudChhb2JqLCBhaSkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IHNldCAnICsgYWkgKyAnIGFuZCBhIHBhcmVudCBhdHRyaWJ1dGUgc2ltdWx0YW5lb3VzbHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBwID0gbGF5b3V0TlAobGF5b3V0LCBhaSk7XG4gICAgICAgIHZhciB2aSA9IGFvYmpbYWldO1xuICAgICAgICB2YXIgcGxlbiA9IHAucGFydHMubGVuZ3RoO1xuICAgICAgICAvLyBwLnBhcnRzIG1heSBlbmQgd2l0aCBhbiBpbmRleCBpbnRlZ2VyIGlmIHRoZSBwcm9wZXJ0eSBpcyBhbiBhcnJheVxuICAgICAgICB2YXIgcGVuZCA9IHBsZW4gLSAxO1xuICAgICAgICB3aGlsZShwZW5kID4gMCAmJiB0eXBlb2YgcC5wYXJ0c1twZW5kXSAhPT0gJ3N0cmluZycpIHBlbmQtLTtcbiAgICAgICAgLy8gbGFzdCBwcm9wZXJ0eSBpbiBjaGFpbiAobGVhZiBub2RlKVxuICAgICAgICB2YXIgcGxlYWYgPSBwLnBhcnRzW3BlbmRdO1xuICAgICAgICAvLyBsZWFmIHBsdXMgaW1tZWRpYXRlIHBhcmVudFxuICAgICAgICB2YXIgcGxlYWZQbHVzID0gcC5wYXJ0c1twZW5kIC0gMV0gKyAnLicgKyBwbGVhZjtcbiAgICAgICAgLy8gdHJ1bmsgbm9kZXMgKGV2ZXJ5dGhpbmcgZXhjZXB0IHRoZSBsZWFmKVxuICAgICAgICB2YXIgcHRydW5rID0gcC5wYXJ0cy5zbGljZSgwLCBwZW5kKS5qb2luKCcuJyk7XG4gICAgICAgIHZhciBwYXJlbnRJbiA9IG5lc3RlZFByb3BlcnR5KGdkLmxheW91dCwgcHRydW5rKS5nZXQoKTtcbiAgICAgICAgdmFyIHBhcmVudEZ1bGwgPSBuZXN0ZWRQcm9wZXJ0eShmdWxsTGF5b3V0LCBwdHJ1bmspLmdldCgpO1xuICAgICAgICB2YXIgdk9sZCA9IHAuZ2V0KCk7XG5cbiAgICAgICAgaWYodmkgPT09IHVuZGVmaW5lZCkgY29udGludWU7XG5cbiAgICAgICAgcmVkb2l0W2FpXSA9IHZpO1xuXG4gICAgICAgIC8vIGF4aXMgcmV2ZXJzZSBpcyBzcGVjaWFsIC0gaXQgaXMgaXRzIG93biBpbnZlcnNlXG4gICAgICAgIC8vIG9wIGFuZCBoYXMgbm8gZmxhZy5cbiAgICAgICAgdW5kb2l0W2FpXSA9IChwbGVhZiA9PT0gJ3JldmVyc2UnKSA/IHZpIDogdW5kZWZpbmVkVG9OdWxsKHZPbGQpO1xuXG4gICAgICAgIHZhciB2YWxPYmplY3QgPSBQbG90U2NoZW1hLmdldExheW91dFZhbE9iamVjdChmdWxsTGF5b3V0LCBwLnBhcnRzKTtcblxuICAgICAgICBpZih2YWxPYmplY3QgJiYgdmFsT2JqZWN0LmltcGxpZWRFZGl0cyAmJiB2aSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZm9yKHZhciBpbXBsaWVkS2V5IGluIHZhbE9iamVjdC5pbXBsaWVkRWRpdHMpIHtcbiAgICAgICAgICAgICAgICBkb2V4dHJhKExpYi5yZWxhdGl2ZUF0dHIoYWksIGltcGxpZWRLZXkpLCB2YWxPYmplY3QuaW1wbGllZEVkaXRzW2ltcGxpZWRLZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNldHRpbmcgd2lkdGggb3IgaGVpZ2h0IHRvIG51bGwgbXVzdCByZXNldCB0aGUgZ3JhcGgncyB3aWR0aCAvIGhlaWdodFxuICAgICAgICAvLyBiYWNrIHRvIGl0cyBpbml0aWFsIHZhbHVlIGFzIGNvbXB1dGVkIGR1cmluZyB0aGUgZmlyc3QgcGFzcyBpbiBQbG90cy5wbG90QXV0b1NpemUuXG4gICAgICAgIC8vXG4gICAgICAgIC8vIFRvIGRvIHNvLCB3ZSBtdXN0IG1hbnVhbGx5IHNldCB0aGVtIGJhY2sgaGVyZSB1c2luZyB0aGUgX2luaXRpYWxBdXRvU2l6ZSBjYWNoZS5cbiAgICAgICAgLy8gY2FuJ3QgdXNlIGltcGxpZWRFZGl0cyBmb3IgdGhpcyBiZWNhdXNlIGJlaGF2aW9yIGRlcGVuZHMgb24gdmlcbiAgICAgICAgaWYoWyd3aWR0aCcsICdoZWlnaHQnXS5pbmRleE9mKGFpKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmKHZpKSB7XG4gICAgICAgICAgICAgICAgZG9leHRyYSgnYXV0b3NpemUnLCBudWxsKTtcbiAgICAgICAgICAgICAgICAvLyBjdXJyZW50bHkgd2UgZG9uJ3Qgc3VwcG9ydCBhdXRvc2l6ZSBvbmUgZGltIG9ubHkgLSBzb1xuICAgICAgICAgICAgICAgIC8vIGV4cGxpY2l0bHkgc2V0IHRoZSBvdGhlciBvbmUuIE5vdGUgdGhhdCBkb2V4dHJhIHdpbGxcbiAgICAgICAgICAgICAgICAvLyBpZ25vcmUgdGhpcyBpZiB0aGUgc2FtZSByZWxheW91dCBjYWxsIGFsc28gcHJvdmlkZXMgb3Bwb3NpdGVBdHRyXG4gICAgICAgICAgICAgICAgdmFyIG9wcG9zaXRlQXR0ciA9IGFpID09PSAnaGVpZ2h0JyA/ICd3aWR0aCcgOiAnaGVpZ2h0JztcbiAgICAgICAgICAgICAgICBkb2V4dHJhKG9wcG9zaXRlQXR0ciwgZnVsbExheW91dFtvcHBvc2l0ZUF0dHJdKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZnVsbExheW91dFthaV0gPSBnZC5faW5pdGlhbEF1dG9TaXplW2FpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmKGFpID09PSAnYXV0b3NpemUnKSB7XG4gICAgICAgICAgICAvLyBkZXBlbmRzIG9uIHZpIGhlcmUgdG9vLCBzbyBhZ2FpbiBjYW4ndCB1c2UgaW1wbGllZEVkaXRzXG4gICAgICAgICAgICBkb2V4dHJhKCd3aWR0aCcsIHZpID8gbnVsbCA6IGZ1bGxMYXlvdXQud2lkdGgpO1xuICAgICAgICAgICAgZG9leHRyYSgnaGVpZ2h0JywgdmkgPyBudWxsIDogZnVsbExheW91dC5oZWlnaHQpO1xuICAgICAgICB9IGVsc2UgaWYocGxlYWZQbHVzLm1hdGNoKEFYX1JBTkdFX1JFKSkge1xuICAgICAgICAgICAgLy8gY2hlY2sgYXV0b3JhbmdlIHZzIHJhbmdlXG5cbiAgICAgICAgICAgIHJlY29yZEFsdGVyZWRBeGlzKHBsZWFmUGx1cyk7XG4gICAgICAgICAgICBuZXN0ZWRQcm9wZXJ0eShmdWxsTGF5b3V0LCBwdHJ1bmsgKyAnLl9pbnB1dFJhbmdlJykuc2V0KG51bGwpO1xuICAgICAgICB9IGVsc2UgaWYocGxlYWZQbHVzLm1hdGNoKEFYX0FVVE9SQU5HRV9SRSkpIHtcbiAgICAgICAgICAgIHJlY29yZEFsdGVyZWRBeGlzKHBsZWFmUGx1cyk7XG4gICAgICAgICAgICBuZXN0ZWRQcm9wZXJ0eShmdWxsTGF5b3V0LCBwdHJ1bmsgKyAnLl9pbnB1dFJhbmdlJykuc2V0KG51bGwpO1xuICAgICAgICAgICAgdmFyIGF4RnVsbCA9IG5lc3RlZFByb3BlcnR5KGZ1bGxMYXlvdXQsIHB0cnVuaykuZ2V0KCk7XG4gICAgICAgICAgICBpZihheEZ1bGwuX2lucHV0RG9tYWluKSB7XG4gICAgICAgICAgICAgICAgLy8gaWYgd2UncmUgYXV0b3JhbmdpbmcgYW5kIHRoaXMgYXhpcyBoYXMgYSBjb25zdHJhaW5lZCBkb21haW4sXG4gICAgICAgICAgICAgICAgLy8gcmVzZXQgaXQgc28gd2UgZG9uJ3QgZ2V0IGxvY2tlZCBpbnRvIGEgc2hydW5rZW4gc2l6ZVxuICAgICAgICAgICAgICAgIGF4RnVsbC5faW5wdXQuZG9tYWluID0gYXhGdWxsLl9pbnB1dERvbWFpbi5zbGljZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYocGxlYWZQbHVzLm1hdGNoKEFYX0RPTUFJTl9SRSkpIHtcbiAgICAgICAgICAgIG5lc3RlZFByb3BlcnR5KGZ1bGxMYXlvdXQsIHB0cnVuayArICcuX2lucHV0RG9tYWluJykuc2V0KG51bGwpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdG9nZ2xpbmcgYXhpcyB0eXBlIGJldHdlZW4gbG9nIGFuZCBsaW5lYXI6IHdlIG5lZWQgdG8gY29udmVydFxuICAgICAgICAvLyBwb3NpdGlvbnMgZm9yIGNvbXBvbmVudHMgdGhhdCBhcmUgc3RpbGwgdXNpbmcgbGluZWFyaXplZCB2YWx1ZXMsXG4gICAgICAgIC8vIG5vdCBkYXRhIHZhbHVlcyBsaWtlIG5ld2VyIGNvbXBvbmVudHMuXG4gICAgICAgIC8vIHByZXZpb3VzbHkgd2UgZGlkIHRoaXMgZm9yIGxvZyA8LT4gbm90LWxvZywgYnV0IG5vdyBvbmx5IGRvIGl0XG4gICAgICAgIC8vIGZvciBsb2cgPC0+IGxpbmVhclxuICAgICAgICBpZihwbGVhZiA9PT0gJ3R5cGUnKSB7XG4gICAgICAgICAgICB2YXIgYXggPSBwYXJlbnRJbjtcbiAgICAgICAgICAgIHZhciB0b0xvZyA9IHBhcmVudEZ1bGwudHlwZSA9PT0gJ2xpbmVhcicgJiYgdmkgPT09ICdsb2cnO1xuICAgICAgICAgICAgdmFyIGZyb21Mb2cgPSBwYXJlbnRGdWxsLnR5cGUgPT09ICdsb2cnICYmIHZpID09PSAnbGluZWFyJztcblxuICAgICAgICAgICAgaWYodG9Mb2cgfHwgZnJvbUxvZykge1xuICAgICAgICAgICAgICAgIGlmKCFheCB8fCAhYXgucmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gMkQgbmV2ZXIgZ2V0cyBoZXJlLCBidXQgM0QgZG9lc1xuICAgICAgICAgICAgICAgICAgICAvLyBJIGRvbid0IHRoaW5rIHRoaXMgaXMgbmVlZGVkLCBidXQgbGVmdCBoZXJlIGluIGNhc2UgdGhlcmVcbiAgICAgICAgICAgICAgICAgICAgLy8gYXJlIGVkZ2UgY2FzZXMgSSdtIG5vdCB0aGlua2luZyBvZi5cbiAgICAgICAgICAgICAgICAgICAgZG9leHRyYShwdHJ1bmsgKyAnLmF1dG9yYW5nZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZighcGFyZW50RnVsbC5hdXRvcmFuZ2UpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gdG9nZ2xpbmcgbG9nIHdpdGhvdXQgYXV0b3JhbmdlOiBuZWVkIHRvIGFsc28gcmVjYWxjdWxhdGUgcmFuZ2VzXG4gICAgICAgICAgICAgICAgICAgIC8vIGJlY2F1c2UgbG9nIGF4ZXMgdXNlIGxpbmVhcml6ZWQgdmFsdWVzIGZvciByYW5nZSBlbmRwb2ludHNcbiAgICAgICAgICAgICAgICAgICAgdmFyIHIwID0gYXgucmFuZ2VbMF07XG4gICAgICAgICAgICAgICAgICAgIHZhciByMSA9IGF4LnJhbmdlWzFdO1xuICAgICAgICAgICAgICAgICAgICBpZih0b0xvZykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWYgYm90aCBsaW1pdHMgYXJlIG5lZ2F0aXZlLCBhdXRvcmFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHIwIDw9IDAgJiYgcjEgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvZXh0cmEocHRydW5rICsgJy5hdXRvcmFuZ2UnLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlmIG9uZSBpcyBuZWdhdGl2ZSwgc2V0IGl0IDYgb3JkZXJzIGJlbG93IHRoZSBvdGhlci5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKHIwIDw9IDApIHIwID0gcjEgLyAxZTY7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmKHIxIDw9IDApIHIxID0gcjAgLyAxZTY7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBub3cgc2V0IHRoZSByYW5nZSB2YWx1ZXMgYXMgYXBwcm9wcmlhdGVcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvZXh0cmEocHRydW5rICsgJy5yYW5nZVswXScsIE1hdGgubG9nKHIwKSAvIE1hdGguTE4xMCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2V4dHJhKHB0cnVuayArICcucmFuZ2VbMV0nLCBNYXRoLmxvZyhyMSkgLyBNYXRoLkxOMTApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZG9leHRyYShwdHJ1bmsgKyAnLnJhbmdlWzBdJywgTWF0aC5wb3coMTAsIHIwKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkb2V4dHJhKHB0cnVuayArICcucmFuZ2VbMV0nLCBNYXRoLnBvdygxMCwgcjEpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZih0b0xvZykge1xuICAgICAgICAgICAgICAgICAgICAvLyBqdXN0IG1ha2Ugc3VyZSB0aGUgcmFuZ2UgaXMgcG9zaXRpdmUgYW5kIGluIHRoZSByaWdodFxuICAgICAgICAgICAgICAgICAgICAvLyBvcmRlciwgaXQnbGwgZ2V0IHJlY2FsY3VsYXRlZCBsYXRlclxuICAgICAgICAgICAgICAgICAgICBheC5yYW5nZSA9IChheC5yYW5nZVsxXSA+IGF4LnJhbmdlWzBdKSA/IFsxLCAyXSA6IFsyLCAxXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBjbGVhciBwb2xhciB2aWV3IGluaXRpYWwgc3Rhc2ggZm9yIHJhZGlhbCByYW5nZSBzbyB0aGF0XG4gICAgICAgICAgICAgICAgLy8gdmFsdWUgZ2V0IHJlY29tcHV0ZWQgaW4gY29ycmVjdCB1bml0c1xuICAgICAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZnVsbExheW91dC5fc3VicGxvdHMucG9sYXIpICYmXG4gICAgICAgICAgICAgICAgICAgIGZ1bGxMYXlvdXQuX3N1YnBsb3RzLnBvbGFyLmxlbmd0aCAmJlxuICAgICAgICAgICAgICAgICAgICBmdWxsTGF5b3V0W3AucGFydHNbMF1dICYmXG4gICAgICAgICAgICAgICAgICAgIHAucGFydHNbMV0gPT09ICdyYWRpYWxheGlzJ1xuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZnVsbExheW91dFtwLnBhcnRzWzBdXS5fc3VicGxvdC52aWV3SW5pdGlhbFsncmFkaWFsYXhpcy5yYW5nZSddO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIEFubm90YXRpb25zIGFuZCBpbWFnZXMgYWxzbyBuZWVkIHRvIGNvbnZlcnQgdG8vZnJvbSBsaW5lYXJpemVkIGNvb3Jkc1xuICAgICAgICAgICAgICAgIC8vIFNoYXBlcyBkbyBub3QgbmVlZCB0aGlzIDopXG4gICAgICAgICAgICAgICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdhbm5vdGF0aW9ucycsICdjb252ZXJ0Q29vcmRzJykoZ2QsIHBhcmVudEZ1bGwsIHZpLCBkb2V4dHJhKTtcbiAgICAgICAgICAgICAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2ltYWdlcycsICdjb252ZXJ0Q29vcmRzJykoZ2QsIHBhcmVudEZ1bGwsIHZpLCBkb2V4dHJhKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gYW55IG90aGVyIHR5cGUgY2hhbmdlczogdGhlIHJhbmdlIGZyb20gdGhlIHByZXZpb3VzIHR5cGVcbiAgICAgICAgICAgICAgICAvLyB3aWxsIG5vdCBtYWtlIHNlbnNlLCBzbyBhdXRvcmFuZ2UgaXQuXG4gICAgICAgICAgICAgICAgZG9leHRyYShwdHJ1bmsgKyAnLmF1dG9yYW5nZScsIHRydWUpO1xuICAgICAgICAgICAgICAgIGRvZXh0cmEocHRydW5rICsgJy5yYW5nZScsIG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbmVzdGVkUHJvcGVydHkoZnVsbExheW91dCwgcHRydW5rICsgJy5faW5wdXRSYW5nZScpLnNldChudWxsKTtcbiAgICAgICAgfSBlbHNlIGlmKHBsZWFmLm1hdGNoKEFYX05BTUVfUEFUVEVSTikpIHtcbiAgICAgICAgICAgIHZhciBmdWxsUHJvcCA9IG5lc3RlZFByb3BlcnR5KGZ1bGxMYXlvdXQsIGFpKS5nZXQoKTtcbiAgICAgICAgICAgIHZhciBuZXdUeXBlID0gKHZpIHx8IHt9KS50eXBlO1xuXG4gICAgICAgICAgICAvLyBUaGlzIGNhbiBwb3RlbnRpYWxseSBjYXVzZSBzdHJhbmdlIGJlaGF2aW9yIGlmIHRoZSBhdXRvdHlwZSBpcyBub3RcbiAgICAgICAgICAgIC8vIG51bWVyaWMgKGxpbmVhciwgYmVjYXVzZSB3ZSBkb24ndCBhdXRvLWxvZykgYnV0IHRoZSBwcmV2aW91cyB0eXBlXG4gICAgICAgICAgICAvLyB3YXMgbG9nLiBUaGF0J3MgYSB2ZXJ5IHN0cmFuZ2UgZWRnZSBjYXNlIHRob3VnaFxuICAgICAgICAgICAgaWYoIW5ld1R5cGUgfHwgbmV3VHlwZSA9PT0gJy0nKSBuZXdUeXBlID0gJ2xpbmVhcic7XG4gICAgICAgICAgICBSZWdpc3RyeS5nZXRDb21wb25lbnRNZXRob2QoJ2Fubm90YXRpb25zJywgJ2NvbnZlcnRDb29yZHMnKShnZCwgZnVsbFByb3AsIG5ld1R5cGUsIGRvZXh0cmEpO1xuICAgICAgICAgICAgUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKCdpbWFnZXMnLCAnY29udmVydENvb3JkcycpKGdkLCBmdWxsUHJvcCwgbmV3VHlwZSwgZG9leHRyYSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhbHRlciBnZC5sYXlvdXRcblxuICAgICAgICAvLyBjb2xsZWN0IGFycmF5IGNvbXBvbmVudCBlZGl0cyBmb3IgZXhlY3V0aW9uIGFsbCB0b2dldGhlclxuICAgICAgICAvLyBzbyB3ZSBjYW4gZW5zdXJlIGNvbnNpc3RlbnQgYmVoYXZpb3IgYWRkaW5nL3JlbW92aW5nIGl0ZW1zXG4gICAgICAgIC8vIGFuZCBvcmRlci1pbmRlcGVuZGVuY2UgZm9yIGFkZC9yZW1vdmUvZWRpdCBhbGwgdG9nZXRoZXIgaW5cbiAgICAgICAgLy8gb25lIHJlbGF5b3V0IGNhbGxcbiAgICAgICAgdmFyIGNvbnRhaW5lckFycmF5TWF0Y2ggPSBtYW5hZ2VBcnJheXMuY29udGFpbmVyQXJyYXlNYXRjaChhaSk7XG4gICAgICAgIGlmKGNvbnRhaW5lckFycmF5TWF0Y2gpIHtcbiAgICAgICAgICAgIGFycmF5U3RyID0gY29udGFpbmVyQXJyYXlNYXRjaC5hcnJheTtcbiAgICAgICAgICAgIGkgPSBjb250YWluZXJBcnJheU1hdGNoLmluZGV4O1xuICAgICAgICAgICAgdmFyIHByb3BTdHIgPSBjb250YWluZXJBcnJheU1hdGNoLnByb3BlcnR5O1xuICAgICAgICAgICAgdmFyIHVwZGF0ZVZhbE9iamVjdCA9IHZhbE9iamVjdCB8fCB7ZWRpdFR5cGU6ICdjYWxjJ307XG5cbiAgICAgICAgICAgIGlmKGkgIT09ICcnICYmIHByb3BTdHIgPT09ICcnKSB7XG4gICAgICAgICAgICAgICAgLy8gc3BlY2lhbCBoYW5kbGluZyBvZiB1bmRvaXQgaWYgd2UncmUgYWRkaW5nIG9yIHJlbW92aW5nIGFuIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAvLyBpZSAnYW5ub3RhdGlvbnNbMl0nIHdoaWNoIGNhbiBiZSB7Li4ufSAoYWRkKSBvciBudWxsLFxuICAgICAgICAgICAgICAgIC8vIGRvZXMgbm90IHdvcmsgd2hlbiByZXBsYWNpbmcgdGhlIGVudGlyZSBhcnJheVxuICAgICAgICAgICAgICAgIGlmKG1hbmFnZUFycmF5cy5pc0FkZFZhbCh2aSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5kb2l0W2FpXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmKG1hbmFnZUFycmF5cy5pc1JlbW92ZVZhbCh2aSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdW5kb2l0W2FpXSA9IChuZXN0ZWRQcm9wZXJ0eShsYXlvdXQsIGFycmF5U3RyKS5nZXQoKSB8fCBbXSlbaV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgTGliLndhcm4oJ3VucmVjb2duaXplZCBmdWxsIG9iamVjdCB2YWx1ZScsIGFvYmopO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVkaXRUeXBlcy51cGRhdGUoZmxhZ3MsIHVwZGF0ZVZhbE9iamVjdCk7XG5cbiAgICAgICAgICAgIC8vIHByZXBhcmUgdGhlIGVkaXRzIG9iamVjdCB3ZSdsbCBzZW5kIHRvIGFwcGx5Q29udGFpbmVyQXJyYXlDaGFuZ2VzXG4gICAgICAgICAgICBpZighYXJyYXlFZGl0c1thcnJheVN0cl0pIGFycmF5RWRpdHNbYXJyYXlTdHJdID0ge307XG4gICAgICAgICAgICB2YXIgb2JqRWRpdHMgPSBhcnJheUVkaXRzW2FycmF5U3RyXVtpXTtcbiAgICAgICAgICAgIGlmKCFvYmpFZGl0cykgb2JqRWRpdHMgPSBhcnJheUVkaXRzW2FycmF5U3RyXVtpXSA9IHt9O1xuICAgICAgICAgICAgb2JqRWRpdHNbcHJvcFN0cl0gPSB2aTtcblxuICAgICAgICAgICAgZGVsZXRlIGFvYmpbYWldO1xuICAgICAgICB9IGVsc2UgaWYocGxlYWYgPT09ICdyZXZlcnNlJykge1xuICAgICAgICAgICAgLy8gaGFuZGxlIGF4aXMgcmV2ZXJzYWwgZXhwbGljaXRseSwgYXMgdGhlcmUncyBubyAncmV2ZXJzZScgYXR0cmlidXRlXG5cbiAgICAgICAgICAgIGlmKHBhcmVudEluLnJhbmdlKSBwYXJlbnRJbi5yYW5nZS5yZXZlcnNlKCk7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBkb2V4dHJhKHB0cnVuayArICcuYXV0b3JhbmdlJywgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgcGFyZW50SW4ucmFuZ2UgPSBbMSwgMF07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmKHBhcmVudEZ1bGwuYXV0b3JhbmdlKSBmbGFncy5jYWxjID0gdHJ1ZTtcbiAgICAgICAgICAgIGVsc2UgZmxhZ3MucGxvdCA9IHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZigoZnVsbExheW91dC5faGFzKCdzY2F0dGVyLWxpa2UnKSAmJiBmdWxsTGF5b3V0Ll9oYXMoJ3JlZ2wnKSkgJiZcbiAgICAgICAgICAgICAgICAoYWkgPT09ICdkcmFnbW9kZScgJiZcbiAgICAgICAgICAgICAgICAodmkgPT09ICdsYXNzbycgfHwgdmkgPT09ICdzZWxlY3QnKSAmJlxuICAgICAgICAgICAgICAgICEodk9sZCA9PT0gJ2xhc3NvJyB8fCB2T2xkID09PSAnc2VsZWN0JykpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBmbGFncy5wbG90ID0gdHJ1ZTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihmdWxsTGF5b3V0Ll9oYXMoJ2dsMmQnKSkge1xuICAgICAgICAgICAgICAgIGZsYWdzLnBsb3QgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHZhbE9iamVjdCkgZWRpdFR5cGVzLnVwZGF0ZShmbGFncywgdmFsT2JqZWN0KTtcbiAgICAgICAgICAgIGVsc2UgZmxhZ3MuY2FsYyA9IHRydWU7XG5cbiAgICAgICAgICAgIHAuc2V0KHZpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIG5vdyB3ZSd2ZSBjb2xsZWN0ZWQgY29tcG9uZW50IGVkaXRzIC0gZXhlY3V0ZSB0aGVtIGFsbCB0b2dldGhlclxuICAgIGZvcihhcnJheVN0ciBpbiBhcnJheUVkaXRzKSB7XG4gICAgICAgIHZhciBmaW5pc2hlZCA9IG1hbmFnZUFycmF5cy5hcHBseUNvbnRhaW5lckFycmF5Q2hhbmdlcyhnZCxcbiAgICAgICAgICAgIGxheW91dE5QKGxheW91dCwgYXJyYXlTdHIpLCBhcnJheUVkaXRzW2FycmF5U3RyXSwgZmxhZ3MsIGxheW91dE5QKTtcbiAgICAgICAgaWYoIWZpbmlzaGVkKSBmbGFncy5wbG90ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICAvLyBmaWd1cmUgb3V0IGlmIHdlIG5lZWQgdG8gcmVjYWxjdWxhdGUgYXhpcyBjb25zdHJhaW50c1xuICAgIHZhciBjb25zdHJhaW50cyA9IGZ1bGxMYXlvdXQuX2F4aXNDb25zdHJhaW50R3JvdXBzIHx8IFtdO1xuICAgIGZvcihheElkIGluIHJhbmdlc0FsdGVyZWQpIHtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgY29uc3RyYWludHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBncm91cCA9IGNvbnN0cmFpbnRzW2ldO1xuICAgICAgICAgICAgaWYoZ3JvdXBbYXhJZF0pIHtcbiAgICAgICAgICAgICAgICAvLyBBbHdheXMgcmVjYWxjIGlmIHdlJ3JlIGNoYW5naW5nIGNvbnN0cmFpbmVkIHJhbmdlcy5cbiAgICAgICAgICAgICAgICAvLyBPdGhlcndpc2UgaXQncyBwb3NzaWJsZSB0byB2aW9sYXRlIHRoZSBjb25zdHJhaW50cyBieVxuICAgICAgICAgICAgICAgIC8vIHNwZWNpZnlpbmcgYXJiaXRyYXJ5IHJhbmdlcyBmb3IgYWxsIGF4ZXMgaW4gdGhlIGdyb3VwLlxuICAgICAgICAgICAgICAgIC8vIHRoaXMgd2F5IHNvbWUgcmFuZ2VzIG1heSBleHBhbmQgYmV5b25kIHdoYXQncyBzcGVjaWZpZWQsXG4gICAgICAgICAgICAgICAgLy8gYXMgdGhleSBkbyBhdCBmaXJzdCBkcmF3LCB0byBzYXRpc2Z5IHRoZSBjb25zdHJhaW50cy5cbiAgICAgICAgICAgICAgICBmbGFncy5jYWxjID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBmb3IodmFyIGdyb3VwQXhJZCBpbiBncm91cCkge1xuICAgICAgICAgICAgICAgICAgICBpZighcmFuZ2VzQWx0ZXJlZFtncm91cEF4SWRdKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBBeGVzLmdldEZyb21JZChnZCwgZ3JvdXBBeElkKS5fY29uc3RyYWludFNocmlua2FibGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGF1dG9zaXplIGNoYW5nZWQgb3IgaGVpZ2h0IG9yIHdpZHRoIHdhcyBleHBsaWNpdGx5IHNwZWNpZmllZCxcbiAgICAvLyB0aGlzIHRyaWdnZXJzIGEgcmVkcmF3XG4gICAgLy8gVE9ETzogZG8gd2UgcmVhbGx5IG5lZWQgc3BlY2lhbCBhb2JqLmhlaWdodC93aWR0aCBoYW5kbGluZyBoZXJlP1xuICAgIC8vIGNvdWxkbid0IGVkaXRUeXBlIGRvIHRoaXM/XG4gICAgaWYodXBkYXRlQXV0b3NpemUoZ2QpIHx8IGFvYmouaGVpZ2h0IHx8IGFvYmoud2lkdGgpIGZsYWdzLnBsb3QgPSB0cnVlO1xuXG4gICAgaWYoZmxhZ3MucGxvdCB8fCBmbGFncy5jYWxjKSB7XG4gICAgICAgIGZsYWdzLmxheW91dFJlcGxvdCA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gbm93IGFsbCBhdHRyaWJ1dGUgbW9kcyBhcmUgZG9uZSwgYXMgYXJlXG4gICAgLy8gcmVkbyBhbmQgdW5kbyBzbyB3ZSBjYW4gc2F2ZSB0aGVtXG5cbiAgICByZXR1cm4ge1xuICAgICAgICBmbGFnczogZmxhZ3MsXG4gICAgICAgIHJhbmdlc0FsdGVyZWQ6IHJhbmdlc0FsdGVyZWQsXG4gICAgICAgIHVuZG9pdDogdW5kb2l0LFxuICAgICAgICByZWRvaXQ6IHJlZG9pdCxcbiAgICAgICAgZXZlbnREYXRhOiBldmVudERhdGFcbiAgICB9O1xufVxuXG4vKlxuICogdXBkYXRlQXV0b3NpemU6IHdlIG1hZGUgYSBjaGFuZ2UsIGRvZXMgaXQgY2hhbmdlIHRoZSBhdXRvc2l6ZSByZXN1bHQ/XG4gKiBwdXRzIHRoZSBuZXcgc2l6ZSBpbnRvIGZ1bGxMYXlvdXRcbiAqIHJldHVybnMgdHJ1ZSBpZiBlaXRoZXIgaGVpZ2h0IG9yIHdpZHRoIGNoYW5nZWRcbiAqL1xuZnVuY3Rpb24gdXBkYXRlQXV0b3NpemUoZ2QpIHtcbiAgICB2YXIgZnVsbExheW91dCA9IGdkLl9mdWxsTGF5b3V0O1xuICAgIHZhciBvbGRXaWR0aCA9IGZ1bGxMYXlvdXQud2lkdGg7XG4gICAgdmFyIG9sZEhlaWdodCA9IGZ1bGxMYXlvdXQuaGVpZ2h0O1xuXG4gICAgLy8gY2FsY3VsYXRlIGF1dG9zaXppbmdcbiAgICBpZihnZC5sYXlvdXQuYXV0b3NpemUpIFBsb3RzLnBsb3RBdXRvU2l6ZShnZCwgZ2QubGF5b3V0LCBmdWxsTGF5b3V0KTtcblxuICAgIHJldHVybiAoZnVsbExheW91dC53aWR0aCAhPT0gb2xkV2lkdGgpIHx8IChmdWxsTGF5b3V0LmhlaWdodCAhPT0gb2xkSGVpZ2h0KTtcbn1cblxuLyoqXG4gKiB1cGRhdGU6IHVwZGF0ZSB0cmFjZSBhbmQgbGF5b3V0IGF0dHJpYnV0ZXMgb2YgYW4gZXhpc3RpbmcgcGxvdFxuICpcbiAqIEBwYXJhbSB7U3RyaW5nIHwgSFRNTERpdkVsZW1lbnR9IGdkXG4gKiAgdGhlIGlkIG9yIERPTSBlbGVtZW50IG9mIHRoZSBncmFwaCBjb250YWluZXIgZGl2XG4gKiBAcGFyYW0ge09iamVjdH0gdHJhY2VVcGRhdGVcbiAqICBhdHRyaWJ1dGUgb2JqZWN0IGB7YXN0cjE6IHZhbDEsIGFzdHIyOiB2YWwyIC4uLn1gXG4gKiAgY29ycmVzcG9uZGluZyB0byB1cGRhdGVzIGluIHRoZSBwbG90J3MgdHJhY2VzXG4gKiBAcGFyYW0ge09iamVjdH0gbGF5b3V0VXBkYXRlXG4gKiAgYXR0cmlidXRlIG9iamVjdCBge2FzdHIxOiB2YWwxLCBhc3RyMjogdmFsMiAuLi59YFxuICogIGNvcnJlc3BvbmRpbmcgdG8gdXBkYXRlcyBpbiB0aGUgcGxvdCdzIGxheW91dFxuICogQHBhcmFtIHtOdW1iZXJbXSB8IE51bWJlcn0gW3RyYWNlc11cbiAqICBpbnRlZ2VyIG9yIGFycmF5IG9mIGludGVnZXJzIGZvciB0aGUgdHJhY2VzIHRvIGFsdGVyIChhbGwgaWYgb21pdHRlZClcbiAqXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZShnZCwgdHJhY2VVcGRhdGUsIGxheW91dFVwZGF0ZSwgX3RyYWNlcykge1xuICAgIGdkID0gTGliLmdldEdyYXBoRGl2KGdkKTtcbiAgICBoZWxwZXJzLmNsZWFyUHJvbWlzZVF1ZXVlKGdkKTtcblxuICAgIGlmKGdkLmZyYW1ld29yayAmJiBnZC5mcmFtZXdvcmsuaXNQb2xhcikge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKGdkKTtcbiAgICB9XG5cbiAgICBpZighTGliLmlzUGxhaW5PYmplY3QodHJhY2VVcGRhdGUpKSB0cmFjZVVwZGF0ZSA9IHt9O1xuICAgIGlmKCFMaWIuaXNQbGFpbk9iamVjdChsYXlvdXRVcGRhdGUpKSBsYXlvdXRVcGRhdGUgPSB7fTtcblxuICAgIGlmKE9iamVjdC5rZXlzKHRyYWNlVXBkYXRlKS5sZW5ndGgpIGdkLmNoYW5nZWQgPSB0cnVlO1xuICAgIGlmKE9iamVjdC5rZXlzKGxheW91dFVwZGF0ZSkubGVuZ3RoKSBnZC5jaGFuZ2VkID0gdHJ1ZTtcblxuICAgIHZhciB0cmFjZXMgPSBoZWxwZXJzLmNvZXJjZVRyYWNlSW5kaWNlcyhnZCwgX3RyYWNlcyk7XG5cbiAgICB2YXIgcmVzdHlsZVNwZWNzID0gX3Jlc3R5bGUoZ2QsIExpYi5leHRlbmRGbGF0KHt9LCB0cmFjZVVwZGF0ZSksIHRyYWNlcyk7XG4gICAgdmFyIHJlc3R5bGVGbGFncyA9IHJlc3R5bGVTcGVjcy5mbGFncztcblxuICAgIHZhciByZWxheW91dFNwZWNzID0gX3JlbGF5b3V0KGdkLCBMaWIuZXh0ZW5kRmxhdCh7fSwgbGF5b3V0VXBkYXRlKSk7XG4gICAgdmFyIHJlbGF5b3V0RmxhZ3MgPSByZWxheW91dFNwZWNzLmZsYWdzO1xuXG4gICAgLy8gY2xlYXIgY2FsY2RhdGEgYW5kL29yIGF4aXMgdHlwZXMgaWYgcmVxdWlyZWRcbiAgICBpZihyZXN0eWxlRmxhZ3MuY2FsYyB8fCByZWxheW91dEZsYWdzLmNhbGMpIGdkLmNhbGNkYXRhID0gdW5kZWZpbmVkO1xuICAgIGlmKHJlc3R5bGVGbGFncy5jbGVhckF4aXNUeXBlcykgaGVscGVycy5jbGVhckF4aXNUeXBlcyhnZCwgdHJhY2VzLCBsYXlvdXRVcGRhdGUpO1xuXG4gICAgLy8gZmlsbCBpbiByZWRyYXcgc2VxdWVuY2VcbiAgICB2YXIgc2VxID0gW107XG5cbiAgICBpZihyZWxheW91dEZsYWdzLmxheW91dFJlcGxvdCkge1xuICAgICAgICAvLyBOLkIuIHdvcmtzIGZpbmUgd2hlbiBib3RoXG4gICAgICAgIC8vIHJlbGF5b3V0RmxhZ3MubGF5b3V0UmVwbG90IGFuZCByZXN0eWxlRmxhZ3MuZnVsbFJlcGxvdCBhcmUgdHJ1ZVxuICAgICAgICBzZXEucHVzaChzdWJyb3V0aW5lcy5sYXlvdXRSZXBsb3QpO1xuICAgIH0gZWxzZSBpZihyZXN0eWxlRmxhZ3MuZnVsbFJlcGxvdCkge1xuICAgICAgICBzZXEucHVzaChleHBvcnRzLnBsb3QpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHNlcS5wdXNoKFBsb3RzLnByZXZpb3VzUHJvbWlzZXMpO1xuICAgICAgICBheFJhbmdlU3VwcGx5RGVmYXVsdHNCeVBhc3MoZ2QsIHJlbGF5b3V0RmxhZ3MsIHJlbGF5b3V0U3BlY3MpIHx8IFBsb3RzLnN1cHBseURlZmF1bHRzKGdkKTtcblxuICAgICAgICBpZihyZXN0eWxlRmxhZ3Muc3R5bGUpIHNlcS5wdXNoKHN1YnJvdXRpbmVzLmRvVHJhY2VTdHlsZSk7XG4gICAgICAgIGlmKHJlc3R5bGVGbGFncy5jb2xvcmJhcnMgfHwgcmVsYXlvdXRGbGFncy5jb2xvcmJhcnMpIHNlcS5wdXNoKHN1YnJvdXRpbmVzLmRvQ29sb3JCYXJzKTtcbiAgICAgICAgaWYocmVsYXlvdXRGbGFncy5sZWdlbmQpIHNlcS5wdXNoKHN1YnJvdXRpbmVzLmRvTGVnZW5kKTtcbiAgICAgICAgaWYocmVsYXlvdXRGbGFncy5sYXlvdXRzdHlsZSkgc2VxLnB1c2goc3Vicm91dGluZXMubGF5b3V0U3R5bGVzKTtcbiAgICAgICAgaWYocmVsYXlvdXRGbGFncy5heHJhbmdlKSBhZGRBeFJhbmdlU2VxdWVuY2Uoc2VxLCByZWxheW91dFNwZWNzLnJhbmdlc0FsdGVyZWQpO1xuICAgICAgICBpZihyZWxheW91dEZsYWdzLnRpY2tzKSBzZXEucHVzaChzdWJyb3V0aW5lcy5kb1RpY2tzUmVsYXlvdXQpO1xuICAgICAgICBpZihyZWxheW91dEZsYWdzLm1vZGViYXIpIHNlcS5wdXNoKHN1YnJvdXRpbmVzLmRvTW9kZUJhcik7XG4gICAgICAgIGlmKHJlbGF5b3V0RmxhZ3MuY2FtZXJhKSBzZXEucHVzaChzdWJyb3V0aW5lcy5kb0NhbWVyYSk7XG5cbiAgICAgICAgc2VxLnB1c2goZW1pdEFmdGVyUGxvdCk7XG4gICAgfVxuXG4gICAgc2VxLnB1c2goUGxvdHMucmVob3ZlciwgUGxvdHMucmVkcmFnKTtcblxuICAgIFF1ZXVlLmFkZChnZCxcbiAgICAgICAgdXBkYXRlLCBbZ2QsIHJlc3R5bGVTcGVjcy51bmRvaXQsIHJlbGF5b3V0U3BlY3MudW5kb2l0LCByZXN0eWxlU3BlY3MudHJhY2VzXSxcbiAgICAgICAgdXBkYXRlLCBbZ2QsIHJlc3R5bGVTcGVjcy5yZWRvaXQsIHJlbGF5b3V0U3BlY3MucmVkb2l0LCByZXN0eWxlU3BlY3MudHJhY2VzXVxuICAgICk7XG5cbiAgICB2YXIgcGxvdERvbmUgPSBMaWIuc3luY09yQXN5bmMoc2VxLCBnZCk7XG4gICAgaWYoIXBsb3REb25lIHx8ICFwbG90RG9uZS50aGVuKSBwbG90RG9uZSA9IFByb21pc2UucmVzb2x2ZShnZCk7XG5cbiAgICByZXR1cm4gcGxvdERvbmUudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgZ2QuZW1pdCgncGxvdGx5X3VwZGF0ZScsIHtcbiAgICAgICAgICAgIGRhdGE6IHJlc3R5bGVTcGVjcy5ldmVudERhdGEsXG4gICAgICAgICAgICBsYXlvdXQ6IHJlbGF5b3V0U3BlY3MuZXZlbnREYXRhXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBnZDtcbiAgICB9KTtcbn1cblxuLypcbiAqIGludGVybmFsLXVzZS1vbmx5IHJlc3R5bGUvcmVsYXlvdXQvdXBkYXRlIHZhcmlhbnRzIHRoYXQgcmVjb3JkIHRoZSBpbml0aWFsXG4gKiB2YWx1ZXMgaW4gKGZ1bGxMYXlvdXR8ZnVsbFRyYWNlKS5fcHJlR1VJIHNvIGNoYW5nZXMgY2FuIGJlIHBlcnNpc3RlZCBhY3Jvc3NcbiAqIFBsb3RseS5yZWFjdCBkYXRhIHVwZGF0ZXMsIGRlcGVuZGVudCBvbiB1aXJldmlzaW9uIGF0dHJpYnV0ZXNcbiAqL1xuZnVuY3Rpb24gZ3VpRWRpdChmdW5jKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdyYXBwZWRFZGl0KGdkKSB7XG4gICAgICAgIGdkLl9mdWxsTGF5b3V0Ll9ndWlFZGl0aW5nID0gdHJ1ZTtcbiAgICAgICAgdmFyIHAgPSBmdW5jLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gICAgICAgIGdkLl9mdWxsTGF5b3V0Ll9ndWlFZGl0aW5nID0gZmFsc2U7XG4gICAgICAgIHJldHVybiBwO1xuICAgIH07XG59XG5cbi8vIEZvciBjb25uZWN0aW5nIGVkaXRlZCBsYXlvdXQgYXR0cmlidXRlcyB0byB1aXJldmlzaW9uIGF0dHJzXG4vLyBJZiBubyBgYXR0cmAgd2UgdXNlIGBtYXRjaFsxXSArICcudWlyZXZpc2lvbidgXG4vLyBPcmRlcmVkIGJ5IG1vc3QgY29tbW9uIGVkaXRzIGZpcnN0LCB0byBtaW5pbWl6ZSBvdXIgc2VhcmNoIHRpbWVcbnZhciBsYXlvdXRVSUNvbnRyb2xQYXR0ZXJucyA9IFtcbiAgICB7cGF0dGVybjogL15oaWRkZW5sYWJlbHMvLCBhdHRyOiAnbGVnZW5kLnVpcmV2aXNpb24nfSxcbiAgICB7cGF0dGVybjogL14oKHh8eSlheGlzXFxkKilcXC4oKGF1dG8pP3JhbmdlfHRpdGxlXFwudGV4dCkvfSxcblxuICAgIC8vIHNob3dzcGlrZXMgYW5kIG1vZGVzIGluY2x1ZGUgdGhvc2UgbmVzdGVkIGluc2lkZSBzY2VuZXNcbiAgICB7cGF0dGVybjogL2F4aXNcXGQqXFwuc2hvd3NwaWtlcyQvLCBhdHRyOiAnbW9kZWJhci51aXJldmlzaW9uJ30sXG4gICAge3BhdHRlcm46IC8oaG92ZXJ8ZHJhZyltb2RlJC8sIGF0dHI6ICdtb2RlYmFyLnVpcmV2aXNpb24nfSxcblxuICAgIHtwYXR0ZXJuOiAvXihzY2VuZVxcZCopXFwuY2FtZXJhL30sXG4gICAge3BhdHRlcm46IC9eKGdlb1xcZCopXFwuKHByb2plY3Rpb258Y2VudGVyfGZpdGJvdW5kcykvfSxcbiAgICB7cGF0dGVybjogL14odGVybmFyeVxcZCpcXC5bYWJjXWF4aXMpXFwuKG1pbnx0aXRsZVxcLnRleHQpJC99LFxuICAgIHtwYXR0ZXJuOiAvXihwb2xhclxcZCpcXC5yYWRpYWxheGlzKVxcLigoYXV0byk/cmFuZ2V8YW5nbGV8dGl0bGVcXC50ZXh0KS99LFxuICAgIHtwYXR0ZXJuOiAvXihwb2xhclxcZCpcXC5hbmd1bGFyYXhpcylcXC5yb3RhdGlvbi99LFxuICAgIHtwYXR0ZXJuOiAvXihtYXBib3hcXGQqKVxcLihjZW50ZXJ8em9vbXxiZWFyaW5nfHBpdGNoKS99LFxuXG4gICAge3BhdHRlcm46IC9ebGVnZW5kXFwuKHh8eSkkLywgYXR0cjogJ2VkaXRyZXZpc2lvbid9LFxuICAgIHtwYXR0ZXJuOiAvXihzaGFwZXN8YW5ub3RhdGlvbnMpLywgYXR0cjogJ2VkaXRyZXZpc2lvbid9LFxuICAgIHtwYXR0ZXJuOiAvXnRpdGxlXFwudGV4dCQvLCBhdHRyOiAnZWRpdHJldmlzaW9uJ31cbl07XG5cbi8vIHNhbWUgZm9yIHRyYWNlIGF0dHJpYnV0ZXM6IGlmIGBhdHRyYCBpcyBnaXZlbiBpdCdzIGluIGxheW91dCxcbi8vIG9yIHdpdGggbm8gYGF0dHJgIHdlIHVzZSBgdHJhY2UudWlyZXZpc2lvbmBcbnZhciB0cmFjZVVJQ29udHJvbFBhdHRlcm5zID0gW1xuICAgIHtwYXR0ZXJuOiAvXnNlbGVjdGVkcG9pbnRzJC8sIGF0dHI6ICdzZWxlY3Rpb25yZXZpc2lvbid9LFxuICAgIC8vIFwidmlzaWJsZVwiIGluY2x1ZGVzIHRyYWNlLnRyYW5zZm9ybXNbaV0uc3R5bGVzW2pdLnZhbHVlLnZpc2libGVcbiAgICB7cGF0dGVybjogLyhefHZhbHVlXFwuKXZpc2libGUkLywgYXR0cjogJ2xlZ2VuZC51aXJldmlzaW9uJ30sXG4gICAge3BhdHRlcm46IC9eZGltZW5zaW9uc1xcW1xcZCtcXF1cXC5jb25zdHJhaW50cmFuZ2UvfSxcbiAgICB7cGF0dGVybjogL15ub2RlXFwuKHh8eXxncm91cHMpL30sIC8vIGZvciBTYW5rZXkgbm9kZXNcbiAgICB7cGF0dGVybjogL15sZXZlbCQvfSwgLy8gZm9yIFN1bmJ1cnN0ICYgVHJlZW1hcCB0cmFjZXNcblxuICAgIC8vIGJlbG93IHRoaXMgeW91IG11c3QgYmUgaW4gZWRpdGFibGU6IHRydWUgbW9kZVxuICAgIC8vIFRPRE86IEkgc3RpbGwgcHV0IG5hbWUgYW5kIHRpdGxlIHdpdGggYHRyYWNlLnVpcmV2aXNpb25gXG4gICAgLy8gcmVhc29uYWJsZSBvciBzaG91bGQgdGhlc2UgYmUgYGVkaXRyZXZpc2lvbmA/XG4gICAgLy8gQWxzbyBhcHBsaWVzIHRvIGF4aXMgdGl0bGVzIHVwIGluIHRoZSBsYXlvdXQgc2VjdGlvblxuXG4gICAgLy8gXCJuYW1lXCIgYWxzbyBpbmNsdWRlcyB0cmFuc2Zvcm0uc3R5bGVzXG4gICAge3BhdHRlcm46IC8oXnx2YWx1ZVxcLiluYW1lJC99LFxuICAgIC8vIGluY2x1ZGluZyBuZXN0ZWQgY29sb3JiYXIgYXR0cmlidXRlcyAoaWUgbWFya2VyLmNvbG9yYmFyKVxuICAgIHtwYXR0ZXJuOiAvY29sb3JiYXJcXC50aXRsZVxcLnRleHQkL30sXG4gICAge3BhdHRlcm46IC9jb2xvcmJhclxcLih4fHkpJC8sIGF0dHI6ICdlZGl0cmV2aXNpb24nfVxuXTtcblxuZnVuY3Rpb24gZmluZFVJUGF0dGVybihrZXksIHBhdHRlcm5TcGVjcykge1xuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBwYXR0ZXJuU3BlY3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdmFyIHNwZWMgPSBwYXR0ZXJuU3BlY3NbaV07XG4gICAgICAgIHZhciBtYXRjaCA9IGtleS5tYXRjaChzcGVjLnBhdHRlcm4pO1xuICAgICAgICBpZihtYXRjaCkge1xuICAgICAgICAgICAgcmV0dXJuIHtoZWFkOiBtYXRjaFsxXSwgYXR0cjogc3BlYy5hdHRyfTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuLy8gV2UncmUgZmluZGluZyB0aGUgbmV3IHVpcmV2aXNpb24gYmVmb3JlIHN1cHBseURlZmF1bHRzLCBzbyBkbyB0aGVcbi8vIGluaGVyaXRhbmNlIG1hbnVhbGx5LiBOb3RlIHRoYXQgb25seSBgdW5kZWZpbmVkYCBpbmhlcml0cyAtIG90aGVyXG4vLyBmYWxzeSB2YWx1ZXMgYXJlIHJldHVybmVkLlxuZnVuY3Rpb24gZ2V0TmV3UmV2KHJldkF0dHIsIGNvbnRhaW5lcikge1xuICAgIHZhciBuZXdSZXYgPSBuZXN0ZWRQcm9wZXJ0eShjb250YWluZXIsIHJldkF0dHIpLmdldCgpO1xuICAgIGlmKG5ld1JldiAhPT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3UmV2O1xuXG4gICAgdmFyIHBhcnRzID0gcmV2QXR0ci5zcGxpdCgnLicpO1xuICAgIHBhcnRzLnBvcCgpO1xuICAgIHdoaWxlKHBhcnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcGFydHMucG9wKCk7XG4gICAgICAgIG5ld1JldiA9IG5lc3RlZFByb3BlcnR5KGNvbnRhaW5lciwgcGFydHMuam9pbignLicpICsgJy51aXJldmlzaW9uJykuZ2V0KCk7XG4gICAgICAgIGlmKG5ld1JldiAhPT0gdW5kZWZpbmVkKSByZXR1cm4gbmV3UmV2O1xuICAgIH1cblxuICAgIHJldHVybiBjb250YWluZXIudWlyZXZpc2lvbjtcbn1cblxuZnVuY3Rpb24gZ2V0RnVsbFRyYWNlSW5kZXhGcm9tVWlkKHVpZCwgZnVsbERhdGEpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnVsbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYoZnVsbERhdGFbaV0uX2Z1bGxJbnB1dC51aWQgPT09IHVpZCkgcmV0dXJuIGk7XG4gICAgfVxuICAgIHJldHVybiAtMTtcbn1cblxuZnVuY3Rpb24gZ2V0VHJhY2VJbmRleEZyb21VaWQodWlkLCBkYXRhLCB0cmFjZWkpIHtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgZGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihkYXRhW2ldLnVpZCA9PT0gdWlkKSByZXR1cm4gaTtcbiAgICB9XG4gICAgLy8gZmFsbCBiYWNrIG9uIHRyYWNlIG9yZGVyLCBidXQgb25seSBpZiB1c2VyIGRpZG4ndCBwcm92aWRlIGEgdWlkIGZvciB0aGF0IHRyYWNlXG4gICAgcmV0dXJuICghZGF0YVt0cmFjZWldIHx8IGRhdGFbdHJhY2VpXS51aWQpID8gLTEgOiB0cmFjZWk7XG59XG5cbmZ1bmN0aW9uIHZhbHNNYXRjaCh2MSwgdjIpIHtcbiAgICB2YXIgdjFJc09iaiA9IExpYi5pc1BsYWluT2JqZWN0KHYxKTtcbiAgICB2YXIgdjFJc0FycmF5ID0gQXJyYXkuaXNBcnJheSh2MSk7XG4gICAgaWYodjFJc09iaiB8fCB2MUlzQXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICh2MUlzT2JqICYmIExpYi5pc1BsYWluT2JqZWN0KHYyKSkgfHxcbiAgICAgICAgICAgICh2MUlzQXJyYXkgJiYgQXJyYXkuaXNBcnJheSh2MikpXG4gICAgICAgICkgJiYgSlNPTi5zdHJpbmdpZnkodjEpID09PSBKU09OLnN0cmluZ2lmeSh2Mik7XG4gICAgfVxuICAgIHJldHVybiB2MSA9PT0gdjI7XG59XG5cbmZ1bmN0aW9uIGFwcGx5VUlSZXZpc2lvbnMoZGF0YSwgbGF5b3V0LCBvbGRGdWxsRGF0YSwgb2xkRnVsbExheW91dCkge1xuICAgIHZhciBsYXlvdXRQcmVHVUkgPSBvbGRGdWxsTGF5b3V0Ll9wcmVHVUk7XG4gICAgdmFyIGtleSwgcmV2QXR0ciwgb2xkUmV2LCBuZXdSZXYsIG1hdGNoLCBwcmVHVUlWYWwsIG5ld05QLCBuZXdWYWw7XG4gICAgdmFyIGJvdGhJbmhlcml0QXV0b3JhbmdlID0gW107XG4gICAgdmFyIG5ld1JhbmdlQWNjZXB0ZWQgPSB7fTtcbiAgICBmb3Ioa2V5IGluIGxheW91dFByZUdVSSkge1xuICAgICAgICBtYXRjaCA9IGZpbmRVSVBhdHRlcm4oa2V5LCBsYXlvdXRVSUNvbnRyb2xQYXR0ZXJucyk7XG4gICAgICAgIGlmKG1hdGNoKSB7XG4gICAgICAgICAgICByZXZBdHRyID0gbWF0Y2guYXR0ciB8fCAobWF0Y2guaGVhZCArICcudWlyZXZpc2lvbicpO1xuICAgICAgICAgICAgb2xkUmV2ID0gbmVzdGVkUHJvcGVydHkob2xkRnVsbExheW91dCwgcmV2QXR0cikuZ2V0KCk7XG4gICAgICAgICAgICBuZXdSZXYgPSBvbGRSZXYgJiYgZ2V0TmV3UmV2KHJldkF0dHIsIGxheW91dCk7XG4gICAgICAgICAgICBpZihuZXdSZXYgJiYgKG5ld1JldiA9PT0gb2xkUmV2KSkge1xuICAgICAgICAgICAgICAgIHByZUdVSVZhbCA9IGxheW91dFByZUdVSVtrZXldO1xuICAgICAgICAgICAgICAgIGlmKHByZUdVSVZhbCA9PT0gbnVsbCkgcHJlR1VJVmFsID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgICAgIG5ld05QID0gbmVzdGVkUHJvcGVydHkobGF5b3V0LCBrZXkpO1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IG5ld05QLmdldCgpO1xuICAgICAgICAgICAgICAgIGlmKHZhbHNNYXRjaChuZXdWYWwsIHByZUdVSVZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3VmFsID09PSB1bmRlZmluZWQgJiYga2V5LnN1YnN0cihrZXkubGVuZ3RoIC0gOSkgPT09ICdhdXRvcmFuZ2UnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBib3RoSW5oZXJpdEF1dG9yYW5nZS5wdXNoKGtleS5zdWJzdHIoMCwga2V5Lmxlbmd0aCAtIDEwKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgbmV3TlAuc2V0KHVuZGVmaW5lZFRvTnVsbChuZXN0ZWRQcm9wZXJ0eShvbGRGdWxsTGF5b3V0LCBrZXkpLmdldCgpKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIExpYi53YXJuKCd1bnJlY29nbml6ZWQgR1VJIGVkaXQ6ICcgKyBrZXkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGlmIHdlIGdvdCB0aGlzIGZhciwgdGhlIG5ldyB2YWx1ZSB3YXMgYWNjZXB0ZWQgYXMgdGhlIG5ldyBzdGFydGluZ1xuICAgICAgICAvLyBwb2ludCAoZWl0aGVyIGJlY2F1c2UgaXQgY2hhbmdlZCBvciByZXZpc2lvbiBjaGFuZ2VkKVxuICAgICAgICAvLyBzbyByZW1vdmUgaXQgZnJvbSBfcHJlR1VJIGZvciBuZXh0IHRpbWUuXG4gICAgICAgIGRlbGV0ZSBsYXlvdXRQcmVHVUlba2V5XTtcblxuICAgICAgICBpZihrZXkuc3Vic3RyKGtleS5sZW5ndGggLSA4LCA2KSA9PT0gJ3JhbmdlWycpIHtcbiAgICAgICAgICAgIG5ld1JhbmdlQWNjZXB0ZWRba2V5LnN1YnN0cigwLCBrZXkubGVuZ3RoIC0gOSldID0gMTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIFNwZWNpYWwgbG9naWMgZm9yIGBhdXRvcmFuZ2VgLCBzaW5jZSBpdCBpbnRlcmFjdHMgd2l0aCBgcmFuZ2VgOlxuICAgIC8vIElmIHRoZSBuZXcgZmlndXJlJ3MgbWF0Y2hpbmcgYHJhbmdlYCB3YXMga2VwdCwgYW5kIGBhdXRvcmFuZ2VgXG4gICAgLy8gd2Fzbid0IHN1cHBsaWVkIGV4cGxpY2l0bHkgaW4gZWl0aGVyIHRoZSBvcmlnaW5hbCBvciB0aGUgbmV3IGZpZ3VyZSxcbiAgICAvLyB3ZSBzaG91bGRuJ3QgYWx0ZXIgdGhhdCAtIGJ1dCB3ZSBtYXkganVzdCBoYXZlIGRvbmUgdGhhdCwgc28gZml4IGl0LlxuICAgIGZvcih2YXIgaSA9IDA7IGkgPCBib3RoSW5oZXJpdEF1dG9yYW5nZS5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgYXhBdHRyID0gYm90aEluaGVyaXRBdXRvcmFuZ2VbaV07XG4gICAgICAgIGlmKG5ld1JhbmdlQWNjZXB0ZWRbYXhBdHRyXSkge1xuICAgICAgICAgICAgdmFyIG5ld0F4ID0gbmVzdGVkUHJvcGVydHkobGF5b3V0LCBheEF0dHIpLmdldCgpO1xuICAgICAgICAgICAgaWYobmV3QXgpIGRlbGV0ZSBuZXdBeC5hdXRvcmFuZ2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBOb3cgdHJhY2VzIC0gdHJ5IHRvIG1hdGNoIHRoZW0gdXAgYnkgdWlkIChpbiBjYXNlIHdlIGFkZGVkL2RlbGV0ZWQgaW5cbiAgICAvLyB0aGUgbWlkZGxlKSwgdGhlbiBmYWxsIGJhY2sgb24gaW5kZXguXG4gICAgdmFyIGFsbFRyYWNlUHJlR1VJID0gb2xkRnVsbExheW91dC5fdHJhY2VQcmVHVUk7XG4gICAgZm9yKHZhciB1aWQgaW4gYWxsVHJhY2VQcmVHVUkpIHtcbiAgICAgICAgdmFyIHRyYWNlUHJlR1VJID0gYWxsVHJhY2VQcmVHVUlbdWlkXTtcbiAgICAgICAgdmFyIG5ld1RyYWNlID0gbnVsbDtcbiAgICAgICAgdmFyIGZ1bGxJbnB1dDtcbiAgICAgICAgZm9yKGtleSBpbiB0cmFjZVByZUdVSSkge1xuICAgICAgICAgICAgLy8gd2FpdCB1bnRpbCB3ZSBrbm93IHdlIGhhdmUgcHJlR1VJIHZhbHVlcyB0byBsb29rIGZvciB0cmFjZXNcbiAgICAgICAgICAgIC8vIGJ1dCBpZiB3ZSBkb24ndCBmaW5kIGJvdGgsIHN0b3AgbG9va2luZyBhdCB0aGlzIHVpZFxuICAgICAgICAgICAgaWYoIW5ld1RyYWNlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZ1bGxpID0gZ2V0RnVsbFRyYWNlSW5kZXhGcm9tVWlkKHVpZCwgb2xkRnVsbERhdGEpO1xuICAgICAgICAgICAgICAgIGlmKGZ1bGxpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBTb21laG93IHdlIGRpZG4ndCBldmVuIGhhdmUgdGhpcyB0cmFjZSBpbiBvbGRGdWxsRGF0YS4uLlxuICAgICAgICAgICAgICAgICAgICAvLyBJIGd1ZXNzIHRoaXMgY291bGQgaGFwcGVuIHdpdGggYGRlbGV0ZVRyYWNlc2Agb3Igc29tZXRoaW5nXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBhbGxUcmFjZVByZUdVSVt1aWRdO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdmFyIGZ1bGxUcmFjZSA9IG9sZEZ1bGxEYXRhW2Z1bGxpXTtcbiAgICAgICAgICAgICAgICBmdWxsSW5wdXQgPSBmdWxsVHJhY2UuX2Z1bGxJbnB1dDtcblxuICAgICAgICAgICAgICAgIHZhciBuZXdUcmFjZWkgPSBnZXRUcmFjZUluZGV4RnJvbVVpZCh1aWQsIGRhdGEsIGZ1bGxJbnB1dC5pbmRleCk7XG4gICAgICAgICAgICAgICAgaWYobmV3VHJhY2VpIDwgMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBObyBtYXRjaCBpbiBuZXcgZGF0YVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgYWxsVHJhY2VQcmVHVUlbdWlkXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG5ld1RyYWNlID0gZGF0YVtuZXdUcmFjZWldO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtYXRjaCA9IGZpbmRVSVBhdHRlcm4oa2V5LCB0cmFjZVVJQ29udHJvbFBhdHRlcm5zKTtcbiAgICAgICAgICAgIGlmKG1hdGNoKSB7XG4gICAgICAgICAgICAgICAgaWYobWF0Y2guYXR0cikge1xuICAgICAgICAgICAgICAgICAgICBvbGRSZXYgPSBuZXN0ZWRQcm9wZXJ0eShvbGRGdWxsTGF5b3V0LCBtYXRjaC5hdHRyKS5nZXQoKTtcbiAgICAgICAgICAgICAgICAgICAgbmV3UmV2ID0gb2xkUmV2ICYmIGdldE5ld1JldihtYXRjaC5hdHRyLCBsYXlvdXQpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG9sZFJldiA9IGZ1bGxJbnB1dC51aXJldmlzaW9uO1xuICAgICAgICAgICAgICAgICAgICAvLyBpbmhlcml0YW5jZSBmb3IgdHJhY2UudWlyZXZpc2lvbiBpcyBzaW1wbGUsIGp1c3QgbGF5b3V0LnVpcmV2aXNpb25cbiAgICAgICAgICAgICAgICAgICAgbmV3UmV2ID0gbmV3VHJhY2UudWlyZXZpc2lvbjtcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3UmV2ID09PSB1bmRlZmluZWQpIG5ld1JldiA9IGxheW91dC51aXJldmlzaW9uO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmKG5ld1JldiAmJiBuZXdSZXYgPT09IG9sZFJldikge1xuICAgICAgICAgICAgICAgICAgICBwcmVHVUlWYWwgPSB0cmFjZVByZUdVSVtrZXldO1xuICAgICAgICAgICAgICAgICAgICBpZihwcmVHVUlWYWwgPT09IG51bGwpIHByZUdVSVZhbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgbmV3TlAgPSBuZXN0ZWRQcm9wZXJ0eShuZXdUcmFjZSwga2V5KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsID0gbmV3TlAuZ2V0KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmKHZhbHNNYXRjaChuZXdWYWwsIHByZUdVSVZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld05QLnNldCh1bmRlZmluZWRUb051bGwobmVzdGVkUHJvcGVydHkoZnVsbElucHV0LCBrZXkpLmdldCgpKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgTGliLndhcm4oJ3VucmVjb2duaXplZCBHVUkgZWRpdDogJyArIGtleSArICcgaW4gdHJhY2UgdWlkICcgKyB1aWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVsZXRlIHRyYWNlUHJlR1VJW2tleV07XG4gICAgICAgIH1cbiAgICB9XG59XG5cbi8qKlxuICogUGxvdGx5LnJlYWN0OlxuICogQSBwbG90L3VwZGF0ZSBtZXRob2QgdGhhdCB0YWtlcyB0aGUgZnVsbCBwbG90IHN0YXRlIChzYW1lIEFQSSBhcyBwbG90L25ld1Bsb3QpXG4gKiBhbmQgZGlmZnMgdG8gZGV0ZXJtaW5lIHRoZSBtaW5pbWFsIHVwZGF0ZSBwYXRod2F5XG4gKlxuICogQHBhcmFtIHtzdHJpbmcgaWQgb3IgRE9NIGVsZW1lbnR9IGdkXG4gKiAgICAgIHRoZSBpZCBvciBET00gZWxlbWVudCBvZiB0aGUgZ3JhcGggY29udGFpbmVyIGRpdlxuICogQHBhcmFtIHthcnJheSBvZiBvYmplY3RzfSBkYXRhXG4gKiAgICAgIGFycmF5IG9mIHRyYWNlcywgY29udGFpbmluZyB0aGUgZGF0YSBhbmQgZGlzcGxheSBpbmZvcm1hdGlvbiBmb3IgZWFjaCB0cmFjZVxuICogQHBhcmFtIHtvYmplY3R9IGxheW91dFxuICogICAgICBvYmplY3QgZGVzY3JpYmluZyB0aGUgb3ZlcmFsbCBkaXNwbGF5IG9mIHRoZSBwbG90LFxuICogICAgICBhbGwgdGhlIHN0dWZmIHRoYXQgZG9lc24ndCBwZXJ0YWluIHRvIGFueSBpbmRpdmlkdWFsIHRyYWNlXG4gKiBAcGFyYW0ge29iamVjdH0gY29uZmlnXG4gKiAgICAgIGNvbmZpZ3VyYXRpb24gb3B0aW9ucyAoc2VlIC4vcGxvdF9jb25maWcuanMgZm9yIG1vcmUgaW5mbylcbiAqXG4gKiBPUlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIGlkIG9yIERPTSBlbGVtZW50fSBnZFxuICogICAgICB0aGUgaWQgb3IgRE9NIGVsZW1lbnQgb2YgdGhlIGdyYXBoIGNvbnRhaW5lciBkaXZcbiAqIEBwYXJhbSB7b2JqZWN0fSBmaWd1cmVcbiAqICAgICAgb2JqZWN0IGNvbnRhaW5pbmcgYGRhdGFgLCBgbGF5b3V0YCwgYGNvbmZpZ2AsIGFuZCBgZnJhbWVzYCBtZW1iZXJzXG4gKlxuICovXG5mdW5jdGlvbiByZWFjdChnZCwgZGF0YSwgbGF5b3V0LCBjb25maWcpIHtcbiAgICB2YXIgZnJhbWVzLCBwbG90RG9uZTtcblxuICAgIGZ1bmN0aW9uIGFkZEZyYW1lcygpIHsgcmV0dXJuIGV4cG9ydHMuYWRkRnJhbWVzKGdkLCBmcmFtZXMpOyB9XG5cbiAgICBnZCA9IExpYi5nZXRHcmFwaERpdihnZCk7XG4gICAgaGVscGVycy5jbGVhclByb21pc2VRdWV1ZShnZCk7XG5cbiAgICB2YXIgb2xkRnVsbERhdGEgPSBnZC5fZnVsbERhdGE7XG4gICAgdmFyIG9sZEZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIC8vIHlvdSBjYW4gdXNlIHRoaXMgYXMgdGhlIGluaXRpYWwgZHJhdyBhcyB3ZWxsIGFzIHRvIHVwZGF0ZVxuICAgIGlmKCFMaWIuaXNQbG90RGl2KGdkKSB8fCAhb2xkRnVsbERhdGEgfHwgIW9sZEZ1bGxMYXlvdXQpIHtcbiAgICAgICAgcGxvdERvbmUgPSBleHBvcnRzLm5ld1Bsb3QoZ2QsIGRhdGEsIGxheW91dCwgY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBpZihMaWIuaXNQbGFpbk9iamVjdChkYXRhKSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IGRhdGE7XG4gICAgICAgICAgICBkYXRhID0gb2JqLmRhdGE7XG4gICAgICAgICAgICBsYXlvdXQgPSBvYmoubGF5b3V0O1xuICAgICAgICAgICAgY29uZmlnID0gb2JqLmNvbmZpZztcbiAgICAgICAgICAgIGZyYW1lcyA9IG9iai5mcmFtZXM7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgY29uZmlnQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAvLyBhc3N1bWUgdGhhdCBpZiB0aGVyZSdzIGEgY29uZmlnIGF0IGFsbCwgd2UncmUgcmVhY3RpbmcgdG8gaXQgdG9vLFxuICAgICAgICAvLyBhbmQgY29tcGxldGVseSByZXBsYWNlIHRoZSBwcmV2aW91cyBjb25maWdcbiAgICAgICAgaWYoY29uZmlnKSB7XG4gICAgICAgICAgICB2YXIgb2xkQ29uZmlnID0gTGliLmV4dGVuZERlZXAoe30sIGdkLl9jb250ZXh0KTtcbiAgICAgICAgICAgIGdkLl9jb250ZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgc2V0UGxvdENvbnRleHQoZ2QsIGNvbmZpZyk7XG4gICAgICAgICAgICBjb25maWdDaGFuZ2VkID0gZGlmZkNvbmZpZyhvbGRDb25maWcsIGdkLl9jb250ZXh0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGdkLmRhdGEgPSBkYXRhIHx8IFtdO1xuICAgICAgICBoZWxwZXJzLmNsZWFuRGF0YShnZC5kYXRhKTtcbiAgICAgICAgZ2QubGF5b3V0ID0gbGF5b3V0IHx8IHt9O1xuICAgICAgICBoZWxwZXJzLmNsZWFuTGF5b3V0KGdkLmxheW91dCk7XG5cbiAgICAgICAgYXBwbHlVSVJldmlzaW9ucyhnZC5kYXRhLCBnZC5sYXlvdXQsIG9sZEZ1bGxEYXRhLCBvbGRGdWxsTGF5b3V0KTtcblxuICAgICAgICAvLyBcInRydWVcIiBza2lwcyB1cGRhdGluZyBjYWxjZGF0YSBhbmQgcmVtYXBwaW5nIGFycmF5cyBmcm9tIGNhbGNUcmFuc2Zvcm1zLFxuICAgICAgICAvLyB3aGljaCBzdXBwbHlEZWZhdWx0cyB1c3VhbGx5IGRvZXMgYXQgdGhlIGVuZCwgYnV0IHdlIG1heSBuZWVkIHRvIE5PVCBkb1xuICAgICAgICAvLyBpZiB0aGUgZGlmZiAod2hpY2ggd2UgaGF2ZW4ndCBkZXRlcm1pbmVkIHlldCkgc2F5cyB3ZSdsbCByZWNhbGNcbiAgICAgICAgUGxvdHMuc3VwcGx5RGVmYXVsdHMoZ2QsIHtza2lwVXBkYXRlQ2FsYzogdHJ1ZX0pO1xuXG4gICAgICAgIHZhciBuZXdGdWxsRGF0YSA9IGdkLl9mdWxsRGF0YTtcbiAgICAgICAgdmFyIG5ld0Z1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcbiAgICAgICAgdmFyIGltbXV0YWJsZSA9IG5ld0Z1bGxMYXlvdXQuZGF0YXJldmlzaW9uID09PSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciB0cmFuc2l0aW9uID0gbmV3RnVsbExheW91dC50cmFuc2l0aW9uO1xuXG4gICAgICAgIHZhciByZWxheW91dEZsYWdzID0gZGlmZkxheW91dChnZCwgb2xkRnVsbExheW91dCwgbmV3RnVsbExheW91dCwgaW1tdXRhYmxlLCB0cmFuc2l0aW9uKTtcbiAgICAgICAgdmFyIG5ld0RhdGFSZXZpc2lvbiA9IHJlbGF5b3V0RmxhZ3MubmV3RGF0YVJldmlzaW9uO1xuICAgICAgICB2YXIgcmVzdHlsZUZsYWdzID0gZGlmZkRhdGEoZ2QsIG9sZEZ1bGxEYXRhLCBuZXdGdWxsRGF0YSwgaW1tdXRhYmxlLCB0cmFuc2l0aW9uLCBuZXdEYXRhUmV2aXNpb24pO1xuXG4gICAgICAgIC8vIFRPRE86IGhvdyB0byB0cmFuc2xhdGUgdGhpcyBwYXJ0IG9mIHJlbGF5b3V0IHRvIFBsb3RseS5yZWFjdD9cbiAgICAgICAgLy8gLy8gU2V0dGluZyB3aWR0aCBvciBoZWlnaHQgdG8gbnVsbCBtdXN0IHJlc2V0IHRoZSBncmFwaCdzIHdpZHRoIC8gaGVpZ2h0XG4gICAgICAgIC8vIC8vIGJhY2sgdG8gaXRzIGluaXRpYWwgdmFsdWUgYXMgY29tcHV0ZWQgZHVyaW5nIHRoZSBmaXJzdCBwYXNzIGluIFBsb3RzLnBsb3RBdXRvU2l6ZS5cbiAgICAgICAgLy8gLy9cbiAgICAgICAgLy8gLy8gVG8gZG8gc28sIHdlIG11c3QgbWFudWFsbHkgc2V0IHRoZW0gYmFjayBoZXJlIHVzaW5nIHRoZSBfaW5pdGlhbEF1dG9TaXplIGNhY2hlLlxuICAgICAgICAvLyBpZihbJ3dpZHRoJywgJ2hlaWdodCddLmluZGV4T2YoYWkpICE9PSAtMSAmJiB2aSA9PT0gbnVsbCkge1xuICAgICAgICAvLyAgICAgZnVsbExheW91dFthaV0gPSBnZC5faW5pdGlhbEF1dG9TaXplW2FpXTtcbiAgICAgICAgLy8gfVxuXG4gICAgICAgIGlmKHVwZGF0ZUF1dG9zaXplKGdkKSkgcmVsYXlvdXRGbGFncy5sYXlvdXRSZXBsb3QgPSB0cnVlO1xuXG4gICAgICAgIC8vIGNsZWFyIGNhbGNkYXRhIGlmIHJlcXVpcmVkXG4gICAgICAgIGlmKHJlc3R5bGVGbGFncy5jYWxjIHx8IHJlbGF5b3V0RmxhZ3MuY2FsYykgZ2QuY2FsY2RhdGEgPSB1bmRlZmluZWQ7XG4gICAgICAgIC8vIG90aGVyd2lzZSBkbyB0aGUgY2FsY2RhdGEgdXBkYXRlcyBhbmQgY2FsY1RyYW5zZm9ybSBhcnJheSByZW1hcHMgdGhhdCB3ZSBza2lwcGVkIGVhcmxpZXJcbiAgICAgICAgZWxzZSBQbG90cy5zdXBwbHlEZWZhdWx0c1VwZGF0ZUNhbGMoZ2QuY2FsY2RhdGEsIG5ld0Z1bGxEYXRhKTtcblxuICAgICAgICAvLyBOb3RlOiB3aGF0IHJlc3R5bGUvcmVsYXlvdXQgdXNlIGltcGxpZWRFZGl0cyBhbmQgY2xlYXJBeGlzVHlwZXMgZm9yXG4gICAgICAgIC8vIG11c3QgYmUgaGFuZGxlZCBieSB0aGUgdXNlciB3aGVuIHVzaW5nIFBsb3RseS5yZWFjdC5cblxuICAgICAgICAvLyBmaWxsIGluIHJlZHJhdyBzZXF1ZW5jZVxuICAgICAgICB2YXIgc2VxID0gW107XG5cbiAgICAgICAgaWYoZnJhbWVzKSB7XG4gICAgICAgICAgICBnZC5fdHJhbnNpdGlvbkRhdGEgPSB7fTtcbiAgICAgICAgICAgIFBsb3RzLmNyZWF0ZVRyYW5zaXRpb25EYXRhKGdkKTtcbiAgICAgICAgICAgIHNlcS5wdXNoKGFkZEZyYW1lcyk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUcmFuc2l0aW9uIHBhdGh3YXksXG4gICAgICAgIC8vIG9ubHkgdXNlZCB3aGVuICd0cmFuc2l0aW9uJyBpcyBzZXQgYnkgdXNlciBhbmRcbiAgICAgICAgLy8gd2hlbiBhdCBsZWFzdCBvbmUgYW5pbWF0YWJsZSBhdHRyaWJ1dGUgaGFzIGNoYW5nZWQsXG4gICAgICAgIC8vIE4uQi4gY29uZmlnIGNoYW5nZWQgYXJlbid0IGFuaW1hdGFibGVcbiAgICAgICAgaWYobmV3RnVsbExheW91dC50cmFuc2l0aW9uICYmICFjb25maWdDaGFuZ2VkICYmIChyZXN0eWxlRmxhZ3MuYW5pbSB8fCByZWxheW91dEZsYWdzLmFuaW0pKSB7XG4gICAgICAgICAgICBQbG90cy5kb0NhbGNkYXRhKGdkKTtcbiAgICAgICAgICAgIHN1YnJvdXRpbmVzLmRvQXV0b1JhbmdlQW5kQ29uc3RyYWludHMoZ2QpO1xuXG4gICAgICAgICAgICBzZXEucHVzaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gUGxvdHMudHJhbnNpdGlvbkZyb21SZWFjdChnZCwgcmVzdHlsZUZsYWdzLCByZWxheW91dEZsYWdzLCBvbGRGdWxsTGF5b3V0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYocmVzdHlsZUZsYWdzLmZ1bGxSZXBsb3QgfHwgcmVsYXlvdXRGbGFncy5sYXlvdXRSZXBsb3QgfHwgY29uZmlnQ2hhbmdlZCkge1xuICAgICAgICAgICAgZ2QuX2Z1bGxMYXlvdXQuX3NraXBEZWZhdWx0cyA9IHRydWU7XG4gICAgICAgICAgICBzZXEucHVzaChleHBvcnRzLnBsb3QpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yKHZhciBjb21wb25lbnRUeXBlIGluIHJlbGF5b3V0RmxhZ3MuYXJyYXlzKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGljZXMgPSByZWxheW91dEZsYWdzLmFycmF5c1tjb21wb25lbnRUeXBlXTtcbiAgICAgICAgICAgICAgICBpZihpbmRpY2VzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZHJhd09uZSA9IFJlZ2lzdHJ5LmdldENvbXBvbmVudE1ldGhvZChjb21wb25lbnRUeXBlLCAnZHJhd09uZScpO1xuICAgICAgICAgICAgICAgICAgICBpZihkcmF3T25lICE9PSBMaWIubm9vcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9yKHZhciBpID0gMDsgaSA8IGluZGljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkcmF3T25lKGdkLCBpbmRpY2VzW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBkcmF3ID0gUmVnaXN0cnkuZ2V0Q29tcG9uZW50TWV0aG9kKGNvbXBvbmVudFR5cGUsICdkcmF3Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihkcmF3ID09PSBMaWIubm9vcCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY2Fubm90IGRyYXcgY29tcG9uZW50czogJyArIGNvbXBvbmVudFR5cGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgZHJhdyhnZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHNlcS5wdXNoKFBsb3RzLnByZXZpb3VzUHJvbWlzZXMpO1xuICAgICAgICAgICAgaWYocmVzdHlsZUZsYWdzLnN0eWxlKSBzZXEucHVzaChzdWJyb3V0aW5lcy5kb1RyYWNlU3R5bGUpO1xuICAgICAgICAgICAgaWYocmVzdHlsZUZsYWdzLmNvbG9yYmFycyB8fCByZWxheW91dEZsYWdzLmNvbG9yYmFycykgc2VxLnB1c2goc3Vicm91dGluZXMuZG9Db2xvckJhcnMpO1xuICAgICAgICAgICAgaWYocmVsYXlvdXRGbGFncy5sZWdlbmQpIHNlcS5wdXNoKHN1YnJvdXRpbmVzLmRvTGVnZW5kKTtcbiAgICAgICAgICAgIGlmKHJlbGF5b3V0RmxhZ3MubGF5b3V0c3R5bGUpIHNlcS5wdXNoKHN1YnJvdXRpbmVzLmxheW91dFN0eWxlcyk7XG4gICAgICAgICAgICBpZihyZWxheW91dEZsYWdzLmF4cmFuZ2UpIGFkZEF4UmFuZ2VTZXF1ZW5jZShzZXEpO1xuICAgICAgICAgICAgaWYocmVsYXlvdXRGbGFncy50aWNrcykgc2VxLnB1c2goc3Vicm91dGluZXMuZG9UaWNrc1JlbGF5b3V0KTtcbiAgICAgICAgICAgIGlmKHJlbGF5b3V0RmxhZ3MubW9kZWJhcikgc2VxLnB1c2goc3Vicm91dGluZXMuZG9Nb2RlQmFyKTtcbiAgICAgICAgICAgIGlmKHJlbGF5b3V0RmxhZ3MuY2FtZXJhKSBzZXEucHVzaChzdWJyb3V0aW5lcy5kb0NhbWVyYSk7XG4gICAgICAgICAgICBzZXEucHVzaChlbWl0QWZ0ZXJQbG90KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHNlcS5wdXNoKFBsb3RzLnJlaG92ZXIsIFBsb3RzLnJlZHJhZyk7XG5cbiAgICAgICAgcGxvdERvbmUgPSBMaWIuc3luY09yQXN5bmMoc2VxLCBnZCk7XG4gICAgICAgIGlmKCFwbG90RG9uZSB8fCAhcGxvdERvbmUudGhlbikgcGxvdERvbmUgPSBQcm9taXNlLnJlc29sdmUoZ2QpO1xuICAgIH1cblxuICAgIHJldHVybiBwbG90RG9uZS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICBnZC5lbWl0KCdwbG90bHlfcmVhY3QnLCB7XG4gICAgICAgICAgICBkYXRhOiBkYXRhLFxuICAgICAgICAgICAgbGF5b3V0OiBsYXlvdXRcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGdkO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBkaWZmRGF0YShnZCwgb2xkRnVsbERhdGEsIG5ld0Z1bGxEYXRhLCBpbW11dGFibGUsIHRyYW5zaXRpb24sIG5ld0RhdGFSZXZpc2lvbikge1xuICAgIHZhciBzYW1lVHJhY2VMZW5ndGggPSBvbGRGdWxsRGF0YS5sZW5ndGggPT09IG5ld0Z1bGxEYXRhLmxlbmd0aDtcblxuICAgIGlmKCF0cmFuc2l0aW9uICYmICFzYW1lVHJhY2VMZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGZ1bGxSZXBsb3Q6IHRydWUsXG4gICAgICAgICAgICBjYWxjOiB0cnVlXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgdmFyIGZsYWdzID0gZWRpdFR5cGVzLnRyYWNlRmxhZ3MoKTtcbiAgICBmbGFncy5hcnJheXMgPSB7fTtcbiAgICBmbGFncy5uQ2hhbmdlcyA9IDA7XG4gICAgZmxhZ3MubkNoYW5nZXNBbmltID0gMDtcblxuICAgIHZhciBpLCB0cmFjZTtcblxuICAgIGZ1bmN0aW9uIGdldFRyYWNlVmFsT2JqZWN0KHBhcnRzKSB7XG4gICAgICAgIHZhciBvdXQgPSBQbG90U2NoZW1hLmdldFRyYWNlVmFsT2JqZWN0KHRyYWNlLCBwYXJ0cyk7XG4gICAgICAgIGlmKCF0cmFjZS5fbW9kdWxlLmFuaW1hdGFibGUgJiYgb3V0LmFuaW0pIHtcbiAgICAgICAgICAgIG91dC5hbmltID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9XG5cbiAgICB2YXIgZGlmZk9wdHMgPSB7XG4gICAgICAgIGdldFZhbE9iamVjdDogZ2V0VHJhY2VWYWxPYmplY3QsXG4gICAgICAgIGZsYWdzOiBmbGFncyxcbiAgICAgICAgaW1tdXRhYmxlOiBpbW11dGFibGUsXG4gICAgICAgIHRyYW5zaXRpb246IHRyYW5zaXRpb24sXG4gICAgICAgIG5ld0RhdGFSZXZpc2lvbjogbmV3RGF0YVJldmlzaW9uLFxuICAgICAgICBnZDogZ2RcbiAgICB9O1xuXG4gICAgdmFyIHNlZW5VSURzID0ge307XG5cbiAgICBmb3IoaSA9IDA7IGkgPCBvbGRGdWxsRGF0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICBpZihuZXdGdWxsRGF0YVtpXSkge1xuICAgICAgICAgICAgdHJhY2UgPSBuZXdGdWxsRGF0YVtpXS5fZnVsbElucHV0O1xuICAgICAgICAgICAgaWYoUGxvdHMuaGFzTWFrZXNEYXRhVHJhbnNmb3JtKHRyYWNlKSkgdHJhY2UgPSBuZXdGdWxsRGF0YVtpXTtcbiAgICAgICAgICAgIGlmKHNlZW5VSURzW3RyYWNlLnVpZF0pIGNvbnRpbnVlO1xuICAgICAgICAgICAgc2VlblVJRHNbdHJhY2UudWlkXSA9IDE7XG5cbiAgICAgICAgICAgIGdldERpZmZGbGFncyhvbGRGdWxsRGF0YVtpXS5fZnVsbElucHV0LCB0cmFjZSwgW10sIGRpZmZPcHRzKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlmKGZsYWdzLmNhbGMgfHwgZmxhZ3MucGxvdCkge1xuICAgICAgICBmbGFncy5mdWxsUmVwbG90ID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZih0cmFuc2l0aW9uICYmIGZsYWdzLm5DaGFuZ2VzICYmIGZsYWdzLm5DaGFuZ2VzQW5pbSkge1xuICAgICAgICBmbGFncy5hbmltID0gKGZsYWdzLm5DaGFuZ2VzID09PSBmbGFncy5uQ2hhbmdlc0FuaW0pICYmIHNhbWVUcmFjZUxlbmd0aCA/ICdhbGwnIDogJ3NvbWUnO1xuICAgIH1cblxuICAgIHJldHVybiBmbGFncztcbn1cblxuZnVuY3Rpb24gZGlmZkxheW91dChnZCwgb2xkRnVsbExheW91dCwgbmV3RnVsbExheW91dCwgaW1tdXRhYmxlLCB0cmFuc2l0aW9uKSB7XG4gICAgdmFyIGZsYWdzID0gZWRpdFR5cGVzLmxheW91dEZsYWdzKCk7XG4gICAgZmxhZ3MuYXJyYXlzID0ge307XG4gICAgZmxhZ3MucmFuZ2VzQWx0ZXJlZCA9IHt9O1xuICAgIGZsYWdzLm5DaGFuZ2VzID0gMDtcbiAgICBmbGFncy5uQ2hhbmdlc0FuaW0gPSAwO1xuXG4gICAgZnVuY3Rpb24gZ2V0TGF5b3V0VmFsT2JqZWN0KHBhcnRzKSB7XG4gICAgICAgIHJldHVybiBQbG90U2NoZW1hLmdldExheW91dFZhbE9iamVjdChuZXdGdWxsTGF5b3V0LCBwYXJ0cyk7XG4gICAgfVxuXG4gICAgdmFyIGRpZmZPcHRzID0ge1xuICAgICAgICBnZXRWYWxPYmplY3Q6IGdldExheW91dFZhbE9iamVjdCxcbiAgICAgICAgZmxhZ3M6IGZsYWdzLFxuICAgICAgICBpbW11dGFibGU6IGltbXV0YWJsZSxcbiAgICAgICAgdHJhbnNpdGlvbjogdHJhbnNpdGlvbixcbiAgICAgICAgZ2Q6IGdkXG4gICAgfTtcblxuICAgIGdldERpZmZGbGFncyhvbGRGdWxsTGF5b3V0LCBuZXdGdWxsTGF5b3V0LCBbXSwgZGlmZk9wdHMpO1xuXG4gICAgaWYoZmxhZ3MucGxvdCB8fCBmbGFncy5jYWxjKSB7XG4gICAgICAgIGZsYWdzLmxheW91dFJlcGxvdCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYodHJhbnNpdGlvbiAmJiBmbGFncy5uQ2hhbmdlcyAmJiBmbGFncy5uQ2hhbmdlc0FuaW0pIHtcbiAgICAgICAgZmxhZ3MuYW5pbSA9IGZsYWdzLm5DaGFuZ2VzID09PSBmbGFncy5uQ2hhbmdlc0FuaW0gPyAnYWxsJyA6ICdzb21lJztcbiAgICB9XG5cbiAgICByZXR1cm4gZmxhZ3M7XG59XG5cbmZ1bmN0aW9uIGdldERpZmZGbGFncyhvbGRDb250YWluZXIsIG5ld0NvbnRhaW5lciwgb3V0ZXJwYXJ0cywgb3B0cykge1xuICAgIHZhciB2YWxPYmplY3QsIGtleSwgYXN0cjtcblxuICAgIHZhciBnZXRWYWxPYmplY3QgPSBvcHRzLmdldFZhbE9iamVjdDtcbiAgICB2YXIgZmxhZ3MgPSBvcHRzLmZsYWdzO1xuICAgIHZhciBpbW11dGFibGUgPSBvcHRzLmltbXV0YWJsZTtcbiAgICB2YXIgaW5BcnJheSA9IG9wdHMuaW5BcnJheTtcbiAgICB2YXIgYXJyYXlJbmRleCA9IG9wdHMuYXJyYXlJbmRleDtcblxuICAgIGZ1bmN0aW9uIGNoYW5nZWQoKSB7XG4gICAgICAgIHZhciBlZGl0VHlwZSA9IHZhbE9iamVjdC5lZGl0VHlwZTtcbiAgICAgICAgaWYoaW5BcnJheSAmJiBlZGl0VHlwZS5pbmRleE9mKCdhcnJheWRyYXcnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIExpYi5wdXNoVW5pcXVlKGZsYWdzLmFycmF5c1tpbkFycmF5XSwgYXJyYXlJbmRleCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgZWRpdFR5cGVzLnVwZGF0ZShmbGFncywgdmFsT2JqZWN0KTtcblxuICAgICAgICBpZihlZGl0VHlwZSAhPT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBmbGFncy5uQ2hhbmdlcysrO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gdHJhY2sgYW5pbWF0YWJsZSBjaGFuZ2VzXG4gICAgICAgIGlmKG9wdHMudHJhbnNpdGlvbiAmJiB2YWxPYmplY3QuYW5pbSkge1xuICAgICAgICAgICAgZmxhZ3MubkNoYW5nZXNBbmltKys7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cmFjayBjYXJ0ZXNpYW4gYXhlcyB3aXRoIGFsdGVyZWQgcmFuZ2VzXG4gICAgICAgIGlmKEFYX1JBTkdFX1JFLnRlc3QoYXN0cikgfHwgQVhfQVVUT1JBTkdFX1JFLnRlc3QoYXN0cikpIHtcbiAgICAgICAgICAgIGZsYWdzLnJhbmdlc0FsdGVyZWRbb3V0ZXJwYXJ0c1swXV0gPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2xlYXIgX2lucHV0RG9tYWluIG9uIGNhcnRlc2lhbiBheGVzIHdpdGggYWx0ZXJlZCBkb21haW5zXG4gICAgICAgIGlmKEFYX0RPTUFJTl9SRS50ZXN0KGFzdHIpKSB7XG4gICAgICAgICAgICBuZXN0ZWRQcm9wZXJ0eShuZXdDb250YWluZXIsICdfaW5wdXREb21haW4nKS5zZXQobnVsbCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cmFjayBkYXRhcmV2aXNpb24gY2hhbmdlc1xuICAgICAgICBpZihrZXkgPT09ICdkYXRhcmV2aXNpb24nKSB7XG4gICAgICAgICAgICBmbGFncy5uZXdEYXRhUmV2aXNpb24gPSAxO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdmFsT2JqZWN0Q2FuQmVEYXRhQXJyYXkodmFsT2JqZWN0KSB7XG4gICAgICAgIHJldHVybiB2YWxPYmplY3QudmFsVHlwZSA9PT0gJ2RhdGFfYXJyYXknIHx8IHZhbE9iamVjdC5hcnJheU9rO1xuICAgIH1cblxuICAgIGZvcihrZXkgaW4gb2xkQ29udGFpbmVyKSB7XG4gICAgICAgIC8vIHNob3J0LWNpcmN1aXQgYmFzZWQgb24gcHJldmlvdXMgY2FsbHMgb3IgcHJldmlvdXMga2V5cyB0aGF0IGFscmVhZHkgbWF4aW1pemVkIHRoZSBwYXRod2F5XG4gICAgICAgIGlmKGZsYWdzLmNhbGMgJiYgIW9wdHMudHJhbnNpdGlvbikgcmV0dXJuO1xuXG4gICAgICAgIHZhciBvbGRWYWwgPSBvbGRDb250YWluZXJba2V5XTtcbiAgICAgICAgdmFyIG5ld1ZhbCA9IG5ld0NvbnRhaW5lcltrZXldO1xuICAgICAgICB2YXIgcGFydHMgPSBvdXRlcnBhcnRzLmNvbmNhdChrZXkpO1xuICAgICAgICBhc3RyID0gcGFydHMuam9pbignLicpO1xuXG4gICAgICAgIGlmKGtleS5jaGFyQXQoMCkgPT09ICdfJyB8fCB0eXBlb2Ygb2xkVmFsID09PSAnZnVuY3Rpb24nIHx8IG9sZFZhbCA9PT0gbmV3VmFsKSBjb250aW51ZTtcblxuICAgICAgICAvLyBGSVhNRTogYXgudGljazAgYW5kIGR0aWNrIGdldCBmaWxsZWQgaW4gZHVyaW5nIHBsb3R0aW5nIChleGNlcHQgZm9yIGdlbyBzdWJwbG90cyksXG4gICAgICAgIC8vIGFuZCB1bmxpa2Ugb3RoZXIgYXV0byB2YWx1ZXMgdGhleSBkb24ndCBtYWtlIGl0IGJhY2sgaW50byB0aGUgaW5wdXQsXG4gICAgICAgIC8vIHNvIG5ld0NvbnRhaW5lciB3b24ndCBoYXZlIHRoZW0uXG4gICAgICAgIGlmKChrZXkgPT09ICd0aWNrMCcgfHwga2V5ID09PSAnZHRpY2snKSAmJiBvdXRlcnBhcnRzWzBdICE9PSAnZ2VvJykge1xuICAgICAgICAgICAgdmFyIHRpY2tNb2RlID0gbmV3Q29udGFpbmVyLnRpY2ttb2RlO1xuICAgICAgICAgICAgaWYodGlja01vZGUgPT09ICdhdXRvJyB8fCB0aWNrTW9kZSA9PT0gJ2FycmF5JyB8fCAhdGlja01vZGUpIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIC8vIEZJWE1FOiBTaW1pbGFybHkgZm9yIGF4aXMgcmFuZ2VzIGZvciAzRFxuICAgICAgICAvLyBjb250b3VyY2FycGV0IGRvZXNuJ3QgSEFWRSB6bWluL3ptYXgsIHRoZXkncmUganVzdCBhdXRvLWFkZGVkLiBJdCBuZWVkcyB0aGVtLlxuICAgICAgICBpZihrZXkgPT09ICdyYW5nZScgJiYgbmV3Q29udGFpbmVyLmF1dG9yYW5nZSkgY29udGludWU7XG4gICAgICAgIGlmKChrZXkgPT09ICd6bWluJyB8fCBrZXkgPT09ICd6bWF4JykgJiYgbmV3Q29udGFpbmVyLnR5cGUgPT09ICdjb250b3VyY2FycGV0JykgY29udGludWU7XG5cbiAgICAgICAgdmFsT2JqZWN0ID0gZ2V0VmFsT2JqZWN0KHBhcnRzKTtcblxuICAgICAgICAvLyBpbiBjYXNlIHR5cGUgY2hhbmdlZCwgd2UgbWF5IG5vdCBldmVuICpoYXZlKiBhIHZhbE9iamVjdC5cbiAgICAgICAgaWYoIXZhbE9iamVjdCkgY29udGludWU7XG5cbiAgICAgICAgaWYodmFsT2JqZWN0Ll9jb21wYXJlQXNKU09OICYmIEpTT04uc3RyaW5naWZ5KG9sZFZhbCkgPT09IEpTT04uc3RyaW5naWZ5KG5ld1ZhbCkpIGNvbnRpbnVlO1xuXG4gICAgICAgIHZhciB2YWxUeXBlID0gdmFsT2JqZWN0LnZhbFR5cGU7XG4gICAgICAgIHZhciBpO1xuXG4gICAgICAgIHZhciBjYW5CZURhdGFBcnJheSA9IHZhbE9iamVjdENhbkJlRGF0YUFycmF5KHZhbE9iamVjdCk7XG4gICAgICAgIHZhciB3YXNBcnJheSA9IEFycmF5LmlzQXJyYXkob2xkVmFsKTtcbiAgICAgICAgdmFyIG5vd0FycmF5ID0gQXJyYXkuaXNBcnJheShuZXdWYWwpO1xuXG4gICAgICAgIC8vIGhhY2sgZm9yIHRyYWNlcyB0aGF0IG1vZGlmeSB0aGUgZGF0YSBpbiBzdXBwbHlEZWZhdWx0cywgbGlrZVxuICAgICAgICAvLyBjb252ZXJ0aW5nIDFEIHRvIDJEIGFycmF5cywgd2hpY2ggd2lsbCBhbHdheXMgY3JlYXRlIG5ldyBvYmplY3RzXG4gICAgICAgIGlmKHdhc0FycmF5ICYmIG5vd0FycmF5KSB7XG4gICAgICAgICAgICB2YXIgaW5wdXRLZXkgPSAnX2lucHV0XycgKyBrZXk7XG4gICAgICAgICAgICB2YXIgb2xkVmFsSW4gPSBvbGRDb250YWluZXJbaW5wdXRLZXldO1xuICAgICAgICAgICAgdmFyIG5ld1ZhbEluID0gbmV3Q29udGFpbmVyW2lucHV0S2V5XTtcbiAgICAgICAgICAgIGlmKEFycmF5LmlzQXJyYXkob2xkVmFsSW4pICYmIG9sZFZhbEluID09PSBuZXdWYWxJbikgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZihuZXdWYWwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoY2FuQmVEYXRhQXJyYXkgJiYgd2FzQXJyYXkpIGZsYWdzLmNhbGMgPSB0cnVlO1xuICAgICAgICAgICAgZWxzZSBjaGFuZ2VkKCk7XG4gICAgICAgIH0gZWxzZSBpZih2YWxPYmplY3QuX2lzTGlua2VkVG9BcnJheSkge1xuICAgICAgICAgICAgdmFyIGFycmF5RWRpdEluZGljZXMgPSBbXTtcbiAgICAgICAgICAgIHZhciBleHRyYUluZGljZXMgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKCFpbkFycmF5KSBmbGFncy5hcnJheXNba2V5XSA9IGFycmF5RWRpdEluZGljZXM7XG5cbiAgICAgICAgICAgIHZhciBtaW5MZW4gPSBNYXRoLm1pbihvbGRWYWwubGVuZ3RoLCBuZXdWYWwubGVuZ3RoKTtcbiAgICAgICAgICAgIHZhciBtYXhMZW4gPSBNYXRoLm1heChvbGRWYWwubGVuZ3RoLCBuZXdWYWwubGVuZ3RoKTtcbiAgICAgICAgICAgIGlmKG1pbkxlbiAhPT0gbWF4TGVuKSB7XG4gICAgICAgICAgICAgICAgaWYodmFsT2JqZWN0LmVkaXRUeXBlID09PSAnYXJyYXlkcmF3Jykge1xuICAgICAgICAgICAgICAgICAgICBleHRyYUluZGljZXMgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGNoYW5nZWQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBtaW5MZW47IGkrKykge1xuICAgICAgICAgICAgICAgIGdldERpZmZGbGFncyhvbGRWYWxbaV0sIG5ld1ZhbFtpXSwgcGFydHMuY29uY2F0KGkpLFxuICAgICAgICAgICAgICAgICAgICAvLyBhZGQgYXJyYXkgaW5kaWNlcywgYnV0IG5vdCBpZiB3ZSdyZSBhbHJlYWR5IGluIGFuIGFycmF5XG4gICAgICAgICAgICAgICAgICAgIExpYi5leHRlbmRGbGF0KHtpbkFycmF5OiBrZXksIGFycmF5SW5kZXg6IGl9LCBvcHRzKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHB1dCB0aGlzIGF0IHRoZSBlbmQgc28gdGhhdCB3ZSBrbm93IG91ciBjb2xsZWN0ZWQgYXJyYXkgaW5kaWNlcyBhcmUgc29ydGVkXG4gICAgICAgICAgICAvLyBidXQgdGhlIGNoZWNrIGZvciBsZW5ndGggY2hhbmdlcyBoYXBwZW5zIHVwIGZyb250IHNvIHdlIGNhbiBzaG9ydC1jaXJjdWl0XG4gICAgICAgICAgICAvLyBkaWZmaW5nIGlmIGFwcHJvcHJpYXRlXG4gICAgICAgICAgICBpZihleHRyYUluZGljZXMpIHtcbiAgICAgICAgICAgICAgICBmb3IoaSA9IG1pbkxlbjsgaSA8IG1heExlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGFycmF5RWRpdEluZGljZXMucHVzaChpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZighdmFsVHlwZSAmJiBMaWIuaXNQbGFpbk9iamVjdChvbGRWYWwpKSB7XG4gICAgICAgICAgICBnZXREaWZmRmxhZ3Mob2xkVmFsLCBuZXdWYWwsIHBhcnRzLCBvcHRzKTtcbiAgICAgICAgfSBlbHNlIGlmKGNhbkJlRGF0YUFycmF5KSB7XG4gICAgICAgICAgICBpZih3YXNBcnJheSAmJiBub3dBcnJheSkge1xuICAgICAgICAgICAgICAgIC8vIGRvbid0IHRyeSB0byBkaWZmIHR3byBkYXRhIGFycmF5cy4gSWYgaW1tdXRhYmxlIHdlIGtub3cgdGhlIGRhdGEgY2hhbmdlZCxcbiAgICAgICAgICAgICAgICAvLyBpZiBub3QsIGFzc3VtZSBpdCBkaWRuJ3QgYW5kIGxldCBgbGF5b3V0LmRhdGFyZXZpc2lvbmAgdGVsbCB1cyBpZiBpdCBkaWRcbiAgICAgICAgICAgICAgICBpZihpbW11dGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZmxhZ3MuY2FsYyA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gbG9vayBmb3IgYW5pbWF0YWJsZSBhdHRyaWJ1dGVzIHdoZW4gdGhlIGRhdGEgY2hhbmdlZFxuICAgICAgICAgICAgICAgIGlmKGltbXV0YWJsZSB8fCBvcHRzLm5ld0RhdGFSZXZpc2lvbikge1xuICAgICAgICAgICAgICAgICAgICBjaGFuZ2VkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKHdhc0FycmF5ICE9PSBub3dBcnJheSkge1xuICAgICAgICAgICAgICAgIGZsYWdzLmNhbGMgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGNoYW5nZWQoKTtcbiAgICAgICAgfSBlbHNlIGlmKHdhc0FycmF5ICYmIG5vd0FycmF5KSB7XG4gICAgICAgICAgICAvLyBpbmZvIGFycmF5LCBjb2xvcnNjYWxlLCAnYW55JyAtIHRoZXNlIGFyZSBzaG9ydCwganVzdCBzdHJpbmdpZnkuXG4gICAgICAgICAgICAvLyBJIGRvbid0ICp0aGluayogdGhhdCBjb3ZlcnMgdXAgYW55IHJlYWwgZGlmZmVyZW5jZXMgcG9zdC12YWxpZGF0aW9uLCBkb2VzIGl0P1xuICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIHdlIG5lZWQgdG8gZGl2ZSBpbiAxIChpbmZvX2FycmF5KSBvciAyIChjb2xvcnNjYWxlKSBsZXZlbHMgYW5kIGNvbXBhcmVcbiAgICAgICAgICAgIC8vIGFsbCBlbGVtZW50cy5cbiAgICAgICAgICAgIGlmKG9sZFZhbC5sZW5ndGggIT09IG5ld1ZhbC5sZW5ndGggfHwgU3RyaW5nKG9sZFZhbCkgIT09IFN0cmluZyhuZXdWYWwpKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlZCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKGtleSBpbiBuZXdDb250YWluZXIpIHtcbiAgICAgICAgaWYoIShrZXkgaW4gb2xkQ29udGFpbmVyIHx8IGtleS5jaGFyQXQoMCkgPT09ICdfJyB8fCB0eXBlb2YgbmV3Q29udGFpbmVyW2tleV0gPT09ICdmdW5jdGlvbicpKSB7XG4gICAgICAgICAgICB2YWxPYmplY3QgPSBnZXRWYWxPYmplY3Qob3V0ZXJwYXJ0cy5jb25jYXQoa2V5KSk7XG5cbiAgICAgICAgICAgIGlmKHZhbE9iamVjdENhbkJlRGF0YUFycmF5KHZhbE9iamVjdCkgJiYgQXJyYXkuaXNBcnJheShuZXdDb250YWluZXJba2V5XSkpIHtcbiAgICAgICAgICAgICAgICBmbGFncy5jYWxjID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2UgY2hhbmdlZCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG4vKlxuICogc2ltcGxlIGRpZmYgZm9yIGNvbmZpZyAtIGZvciBub3csIGp1c3QgdHJlYXQgYWxsIGNoYW5nZXMgYXMgZXF1aXZhbGVudFxuICovXG5mdW5jdGlvbiBkaWZmQ29uZmlnKG9sZENvbmZpZywgbmV3Q29uZmlnKSB7XG4gICAgdmFyIGtleTtcblxuICAgIGZvcihrZXkgaW4gb2xkQ29uZmlnKSB7XG4gICAgICAgIGlmKGtleS5jaGFyQXQoMCkgPT09ICdfJykgY29udGludWU7XG4gICAgICAgIHZhciBvbGRWYWwgPSBvbGRDb25maWdba2V5XTtcbiAgICAgICAgdmFyIG5ld1ZhbCA9IG5ld0NvbmZpZ1trZXldO1xuICAgICAgICBpZihvbGRWYWwgIT09IG5ld1ZhbCkge1xuICAgICAgICAgICAgaWYoTGliLmlzUGxhaW5PYmplY3Qob2xkVmFsKSAmJiBMaWIuaXNQbGFpbk9iamVjdChuZXdWYWwpKSB7XG4gICAgICAgICAgICAgICAgaWYoZGlmZkNvbmZpZyhvbGRWYWwsIG5ld1ZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmKEFycmF5LmlzQXJyYXkob2xkVmFsKSAmJiBBcnJheS5pc0FycmF5KG5ld1ZhbCkpIHtcbiAgICAgICAgICAgICAgICBpZihvbGRWYWwubGVuZ3RoICE9PSBuZXdWYWwubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgb2xkVmFsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKG9sZFZhbFtpXSAhPT0gbmV3VmFsW2ldKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihMaWIuaXNQbGFpbk9iamVjdChvbGRWYWxbaV0pICYmIExpYi5pc1BsYWluT2JqZWN0KG5ld1ZhbFtpXSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZihkaWZmQ29uZmlnKG9sZFZhbFtpXSwgbmV3VmFsW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cblxuLyoqXG4gKiBBbmltYXRlIHRvIGEgZnJhbWUsIHNlcXVlbmNlIG9mIGZyYW1lLCBmcmFtZSBncm91cCwgb3IgZnJhbWUgZGVmaW5pdGlvblxuICpcbiAqIEBwYXJhbSB7c3RyaW5nIGlkIG9yIERPTSBlbGVtZW50fSBnZFxuICogICAgICB0aGUgaWQgb3IgRE9NIGVsZW1lbnQgb2YgdGhlIGdyYXBoIGNvbnRhaW5lciBkaXZcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyBvciBvYmplY3Qgb3IgYXJyYXkgb2Ygc3RyaW5ncyBvciBhcnJheSBvZiBvYmplY3RzfSBmcmFtZU9yR3JvdXBOYW1lT3JGcmFtZUxpc3RcbiAqICAgICAgYSBzaW5nbGUgZnJhbWUsIGFycmF5IG9mIGZyYW1lcywgb3IgZ3JvdXAgdG8gd2hpY2ggdG8gYW5pbWF0ZS4gVGhlIGludGVudCBpc1xuICogICAgICBpbmZlcnJlZCBieSB0aGUgdHlwZSBvZiB0aGUgaW5wdXQuIFZhbGlkIGlucHV0cyBhcmU6XG4gKlxuICogICAgICAtIHN0cmluZywgZS5nLiAnZ3JvdXBuYW1lJzogYW5pbWF0ZSBhbGwgZnJhbWVzIG9mIGEgZ2l2ZW4gYGdyb3VwYCBpbiB0aGUgb3JkZXJcbiAqICAgICAgICAgICAgaW4gd2hpY2ggdGhleSBhcmUgZGVmaW5lZCB2aWEgYFBsb3RseS5hZGRGcmFtZXNgLlxuICpcbiAqICAgICAgLSBhcnJheSBvZiBzdHJpbmdzLCBlLmcuIFsnZnJhbWUxJywgZnJhbWUyJ106IGEgbGlzdCBvZiBmcmFtZXMgYnkgbmFtZSB0byB3aGljaFxuICogICAgICAgICAgICB0byBhbmltYXRlIGluIHNlcXVlbmNlXG4gKlxuICogICAgICAtIG9iamVjdDoge2RhdGE6IC4uLn06IGEgZnJhbWUgZGVmaW5pdGlvbiB0byB3aGljaCB0byBhbmltYXRlLiBUaGUgZnJhbWUgaXMgbm90XG4gKiAgICAgICAgICAgIGFuZCBkb2VzIG5vdCBuZWVkIHRvIGJlIGFkZGVkIHZpYSBgUGxvdGx5LmFkZEZyYW1lc2AuIEl0IG1heSBjb250YWluIGFueSBvZlxuICogICAgICAgICAgICB0aGUgcHJvcGVydGllcyBvZiBhIGZyYW1lLCBpbmNsdWRpbmcgYGRhdGFgLCBgbGF5b3V0YCwgYW5kIGB0cmFjZXNgLiBUaGVcbiAqICAgICAgICAgICAgZnJhbWUgaXMgdXNlZCBhcyBwcm92aWRlZCBhbmQgZG9lcyBub3QgdXNlIHRoZSBgYmFzZWZyYW1lYCBwcm9wZXJ0eS5cbiAqXG4gKiAgICAgIC0gYXJyYXkgb2Ygb2JqZWN0cywgZS5nLiBbe2RhdGE6IC4uLn0sIHtkYXRhOiAuLi59XTogYSBsaXN0IG9mIGZyYW1lIG9iamVjdHMsXG4gKiAgICAgICAgICAgIGVhY2ggZm9sbG93aW5nIHRoZSBzYW1lIHJ1bGVzIGFzIGEgc2luZ2xlIGBvYmplY3RgLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBhbmltYXRpb25PcHRzXG4gKiAgICAgIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSBhbmltYXRpb25cbiAqL1xuZnVuY3Rpb24gYW5pbWF0ZShnZCwgZnJhbWVPckdyb3VwTmFtZU9yRnJhbWVMaXN0LCBhbmltYXRpb25PcHRzKSB7XG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuXG4gICAgaWYoIUxpYi5pc1Bsb3REaXYoZ2QpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdUaGlzIGVsZW1lbnQgaXMgbm90IGEgUGxvdGx5IHBsb3Q6ICcgKyBnZCArICcuIEl0XFwncyBsaWtlbHkgdGhhdCB5b3VcXCd2ZSBmYWlsZWQgJyArXG4gICAgICAgICAgICAndG8gY3JlYXRlIGEgcGxvdCBiZWZvcmUgYW5pbWF0aW5nIGl0LiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgJyArXG4gICAgICAgICAgICAnaHR0cHM6Ly9wbG90bHkuY29tL2phdmFzY3JpcHQvYW5pbWF0aW9ucy8nXG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdmFyIHRyYW5zID0gZ2QuX3RyYW5zaXRpb25EYXRhO1xuXG4gICAgLy8gVGhpcyBpcyB0aGUgcXVldWUgb2YgZnJhbWVzIHRoYXQgd2lsbCBiZSBhbmltYXRlZCBhcyBzb29uIGFzIHBvc3NpYmxlLiBUaGV5XG4gICAgLy8gYXJlIHBvcHBlZCBpbW1lZGlhdGVseSB1cG9uIHRoZSAqc3RhcnQqIG9mIGEgdHJhbnNpdGlvbjpcbiAgICBpZighdHJhbnMuX2ZyYW1lUXVldWUpIHtcbiAgICAgICAgdHJhbnMuX2ZyYW1lUXVldWUgPSBbXTtcbiAgICB9XG5cbiAgICBhbmltYXRpb25PcHRzID0gUGxvdHMuc3VwcGx5QW5pbWF0aW9uRGVmYXVsdHMoYW5pbWF0aW9uT3B0cyk7XG4gICAgdmFyIHRyYW5zaXRpb25PcHRzID0gYW5pbWF0aW9uT3B0cy50cmFuc2l0aW9uO1xuICAgIHZhciBmcmFtZU9wdHMgPSBhbmltYXRpb25PcHRzLmZyYW1lO1xuXG4gICAgLy8gU2luY2UgZnJhbWVzIGFyZSBwb3BwZWQgaW1tZWRpYXRlbHksIGFuIGVtcHR5IHF1ZXVlIG9ubHkgbWVhbnMgYWxsIGZyYW1lcyBoYXZlXG4gICAgLy8gKnN0YXJ0ZWQqIHRvIHRyYW5zaXRpb24sIG5vdCB0aGF0IHRoZSBhbmltYXRpb24gaXMgY29tcGxldGUuIFRvIHNvbHZlIHRoYXQsXG4gICAgLy8gdHJhY2sgYSBzZXBhcmF0ZSBjb3VudGVyIHRoYXQgaW5jcmVtZW50cyBhdCB0aGUgc2FtZSB0aW1lIGFzIGZyYW1lcyBhcmUgYWRkZWRcbiAgICAvLyB0byB0aGUgcXVldWUsIGJ1dCBkZWNyZW1lbnRzIG9ubHkgd2hlbiB0aGUgdHJhbnNpdGlvbiBpcyBjb21wbGV0ZS5cbiAgICBpZih0cmFucy5fZnJhbWVXYWl0aW5nQ250ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdHJhbnMuX2ZyYW1lV2FpdGluZ0NudCA9IDA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VHJhbnNpdGlvbk9wdHMoaSkge1xuICAgICAgICBpZihBcnJheS5pc0FycmF5KHRyYW5zaXRpb25PcHRzKSkge1xuICAgICAgICAgICAgaWYoaSA+PSB0cmFuc2l0aW9uT3B0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJhbnNpdGlvbk9wdHNbMF07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uT3B0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cmFuc2l0aW9uT3B0cztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZyYW1lT3B0cyhpKSB7XG4gICAgICAgIGlmKEFycmF5LmlzQXJyYXkoZnJhbWVPcHRzKSkge1xuICAgICAgICAgICAgaWYoaSA+PSBmcmFtZU9wdHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyYW1lT3B0c1swXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZyYW1lT3B0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmcmFtZU9wdHM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBFeGVjdXRlIGEgY2FsbGJhY2sgYWZ0ZXIgdGhlIHdyYXBwZXIgZnVuY3Rpb24gaGFzIGJlZW4gY2FsbGVkIG4gdGltZXMuXG4gICAgLy8gVGhpcyBpcyB1c2VkIHRvIGRlZmVyIHRoZSByZXNvbHV0aW9uIHVudGlsIGEgdHJhbnNpdGlvbiBoYXMgcmVzb3ZsZWQgKmFuZCpcbiAgICAvLyB0aGUgZnJhbWUgaGFzIGNvbXBsZXRlZC4gSWYgaXQncyBub3QgZG9uZSB0aGlzIHdheSwgdGhlbiB3ZSBnZXQgYSByYWNlXG4gICAgLy8gY29uZGl0aW9uIGluIHdoaWNoIHRoZSBhbmltYXRpb24gbWlnaHQgcmVzb2x2ZSBiZWZvcmUgYSB0cmFuc2l0aW9uIGlzIGNvbXBsZXRlXG4gICAgLy8gb3IgdmljZSB2ZXJzYS5cbiAgICBmdW5jdGlvbiBjYWxsYmFja09uTnRoVGltZShjYiwgbikge1xuICAgICAgICB2YXIgY250ID0gMDtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYoY2IgJiYgKytjbnQgPT09IG4pIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gY2IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGRpc2NhcmRFeGlzdGluZ0ZyYW1lcygpIHtcbiAgICAgICAgICAgIGlmKHRyYW5zLl9mcmFtZVF1ZXVlLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2hpbGUodHJhbnMuX2ZyYW1lUXVldWUubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5leHQgPSB0cmFucy5fZnJhbWVRdWV1ZS5wb3AoKTtcbiAgICAgICAgICAgICAgICBpZihuZXh0Lm9uSW50ZXJydXB0KSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQub25JbnRlcnJ1cHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9hbmltYXRpb25pbnRlcnJ1cHRlZCcsIFtdKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHF1ZXVlRnJhbWVzKGZyYW1lTGlzdCkge1xuICAgICAgICAgICAgaWYoZnJhbWVMaXN0Lmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gICAgICAgICAgICBmb3IodmFyIGkgPSAwOyBpIDwgZnJhbWVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbXB1dGVkRnJhbWU7XG5cbiAgICAgICAgICAgICAgICBpZihmcmFtZUxpc3RbaV0udHlwZSA9PT0gJ2J5bmFtZScpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSWYgaXQncyBhIG5hbWVkIGZyYW1lLCBjb21wdXRlIGl0OlxuICAgICAgICAgICAgICAgICAgICBjb21wdXRlZEZyYW1lID0gUGxvdHMuY29tcHV0ZUZyYW1lKGdkLCBmcmFtZUxpc3RbaV0ubmFtZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gT3RoZXJ3aXNlIHdlIG11c3QgaGF2ZSBiZWVuIGdpdmVuIGEgc2ltcGxlIG9iamVjdCwgc28gdHJlYXRcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIGlucHV0IGl0c2VsZiBhcyB0aGUgY29tcHV0ZWQgZnJhbWUuXG4gICAgICAgICAgICAgICAgICAgIGNvbXB1dGVkRnJhbWUgPSBmcmFtZUxpc3RbaV0uZGF0YTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgZnJhbWVPcHRzID0gZ2V0RnJhbWVPcHRzKGkpO1xuICAgICAgICAgICAgICAgIHZhciB0cmFuc2l0aW9uT3B0cyA9IGdldFRyYW5zaXRpb25PcHRzKGkpO1xuXG4gICAgICAgICAgICAgICAgLy8gSXQgZG9lc24ndCBtYWtlIG11Y2ggc2Vuc2UgZm9yIHRoZSB0cmFuc2l0aW9uIGR1cmF0aW9uIHRvIGJlIGdyZWF0ZXIgdGhhblxuICAgICAgICAgICAgICAgIC8vIHRoZSBmcmFtZSBkdXJhdGlvbiwgc28gbGltaXQgaXQ6XG4gICAgICAgICAgICAgICAgdHJhbnNpdGlvbk9wdHMuZHVyYXRpb24gPSBNYXRoLm1pbih0cmFuc2l0aW9uT3B0cy5kdXJhdGlvbiwgZnJhbWVPcHRzLmR1cmF0aW9uKTtcblxuICAgICAgICAgICAgICAgIHZhciBuZXh0RnJhbWUgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lOiBjb21wdXRlZEZyYW1lLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBmcmFtZUxpc3RbaV0ubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVPcHRzOiBmcmFtZU9wdHMsXG4gICAgICAgICAgICAgICAgICAgIHRyYW5zaXRpb25PcHRzOiB0cmFuc2l0aW9uT3B0cyxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGlmKGkgPT09IGZyYW1lTGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRoZSBsYXN0IGZyYW1lIGluIHRoaXMgLmFuaW1hdGUgY2FsbCBzdG9yZXMgdGhlIHByb21pc2UgcmVzb2x2ZVxuICAgICAgICAgICAgICAgICAgICAvLyBhbmQgcmVqZWN0IGNhbGxiYWNrcy4gVGhpcyBpcyBob3cgd2UgZW5zdXJlIHRoYXQgdGhlIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICAvLyBsb29wICh3aGljaCBtYXkgZXhpc3QgYXMgYSByZXN1bHQgb2YgYSAqZGlmZmVyZW50KiAuYW5pbWF0ZSBjYWxsKVxuICAgICAgICAgICAgICAgICAgICAvLyBzdGlsbCByZXNvbHZlcyBvciByZWplY2R0cyB0aGlzIC5hbmltYXRlIGNhbGwncyBwcm9taXNlLiBvbmNlIGl0J3NcbiAgICAgICAgICAgICAgICAgICAgLy8gY29tcGxldGUuXG4gICAgICAgICAgICAgICAgICAgIG5leHRGcmFtZS5vbkNvbXBsZXRlID0gY2FsbGJhY2tPbk50aFRpbWUocmVzb2x2ZSwgMik7XG4gICAgICAgICAgICAgICAgICAgIG5leHRGcmFtZS5vbkludGVycnVwdCA9IHJlamVjdDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0cmFucy5fZnJhbWVRdWV1ZS5wdXNoKG5leHRGcmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNldCBpdCBhcyBuZXZlciBoYXZpbmcgdHJhbnNpdGlvbmVkIHRvIGEgZnJhbWUuIFRoaXMgd2lsbCBjYXVzZSB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgICAvLyBsb29wIHRvIGltbWVkaWF0ZWx5IHRyYW5zaXRpb24gdG8gdGhlIG5leHQgZnJhbWUgKHdoaWNoLCBmb3IgaW1tZWRpYXRlIG1vZGUsXG4gICAgICAgICAgICAvLyBpcyB0aGUgZmlyc3QgZnJhbWUgaW4gdGhlIGxpc3Qgc2luY2UgYWxsIG90aGVycyB3b3VsZCBoYXZlIGJlZW4gZGlzY2FyZGVkXG4gICAgICAgICAgICAvLyBiZWxvdylcbiAgICAgICAgICAgIGlmKGFuaW1hdGlvbk9wdHMubW9kZSA9PT0gJ2ltbWVkaWF0ZScpIHtcbiAgICAgICAgICAgICAgICB0cmFucy5fbGFzdEZyYW1lQXQgPSAtSW5maW5pdHk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIE9ubHkgaXQncyBub3QgYWxyZWFkeSBydW5uaW5nLCBzdGFydCBhIFJBRiBsb29wLiBUaGlzIGNvdWxkIGJlIGF2b2lkZWQgaW4gdGhlXG4gICAgICAgICAgICAvLyBjYXNlIHRoYXQgdGhlcmUncyBvbmx5IG9uZSBmcmFtZSwgYnV0IGl0IHNpZ25pZmljYW50bHkgY29tcGxpY2F0ZWQgdGhlIGxvZ2ljXG4gICAgICAgICAgICAvLyBhbmQgb25seSBzcGVkIHRoaW5ncyB1cCBieSBhYm91dCA1JSBvciBzbyBmb3IgYSBsb3JlbnogYXR0cmFjdG9yIHNpbXVsYXRpb24uXG4gICAgICAgICAgICAvLyBJdCB3b3VsZCBiZSBhIGZpbmUgdGhpbmcgdG8gaW1wbGVtZW50LCBidXQgdGhlIGJlbmVmaXQgb2YgdGhhdCBvcHRpbWl6YXRpb25cbiAgICAgICAgICAgIC8vIGRvZXNuJ3Qgc2VlbSB3b3J0aCB0aGUgZXh0cmEgY29tcGxleGl0eS5cbiAgICAgICAgICAgIGlmKCF0cmFucy5fYW5pbWF0aW9uUmFmKSB7XG4gICAgICAgICAgICAgICAgYmVnaW5BbmltYXRpb25Mb29wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzdG9wQW5pbWF0aW9uTG9vcCgpIHtcbiAgICAgICAgICAgIGdkLmVtaXQoJ3Bsb3RseV9hbmltYXRlZCcpO1xuXG4gICAgICAgICAgICAvLyBCZSBzdXJlIHRvIHVuc2V0IGFsc28gc2luY2UgaXQncyBob3cgd2Uga25vdyB3aGV0aGVyIGEgbG9vcCBpcyBhbHJlYWR5IHJ1bm5pbmc6XG4gICAgICAgICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodHJhbnMuX2FuaW1hdGlvblJhZik7XG4gICAgICAgICAgICB0cmFucy5fYW5pbWF0aW9uUmFmID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG5leHRGcmFtZSgpIHtcbiAgICAgICAgICAgIGlmKHRyYW5zLl9jdXJyZW50RnJhbWUgJiYgdHJhbnMuX2N1cnJlbnRGcmFtZS5vbkNvbXBsZXRlKSB7XG4gICAgICAgICAgICAgICAgLy8gRXhlY3V0ZSB0aGUgY2FsbGJhY2sgYW5kIHVuc2V0IGl0IHRvIGVuc3VyZSBpdCBkb2Vzbid0XG4gICAgICAgICAgICAgICAgLy8gYWNjaWRlbnRhbGx5IGdldCBjYWxsZWQgdHdpY2VcbiAgICAgICAgICAgICAgICB0cmFucy5fY3VycmVudEZyYW1lLm9uQ29tcGxldGUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIG5ld0ZyYW1lID0gdHJhbnMuX2N1cnJlbnRGcmFtZSA9IHRyYW5zLl9mcmFtZVF1ZXVlLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGlmKG5ld0ZyYW1lKSB7XG4gICAgICAgICAgICAgICAgLy8gU2luY2UgaXQncyBzb21ldGltZXMgbmVjZXNzYXJ5IHRvIGRvIGRlZXAgZGlnZ2luZyBpbnRvIGZyYW1lIGRhdGEsXG4gICAgICAgICAgICAgICAgLy8gd2UnbGwgY29uc2lkZXIgaXQgbm90IDEwMCUgaW1wb3NzaWJsZSBmb3IgbnVsbHMgb3IgbnVtYmVycyB0byBzbmVhayB0aHJvdWdoLFxuICAgICAgICAgICAgICAgIC8vIHNvIGNoZWNrIHdoZW4gY2FzdGluZyB0aGUgbmFtZSwganVzdCB0byBiZSBhYnNvbHV0ZWx5IGNlcnRhaW46XG4gICAgICAgICAgICAgICAgdmFyIHN0cmluZ05hbWUgPSBuZXdGcmFtZS5uYW1lID8gbmV3RnJhbWUubmFtZS50b1N0cmluZygpIDogbnVsbDtcbiAgICAgICAgICAgICAgICBnZC5fZnVsbExheW91dC5fY3VycmVudEZyYW1lID0gc3RyaW5nTmFtZTtcblxuICAgICAgICAgICAgICAgIHRyYW5zLl9sYXN0RnJhbWVBdCA9IERhdGUubm93KCk7XG4gICAgICAgICAgICAgICAgdHJhbnMuX3RpbWVUb05leHQgPSBuZXdGcmFtZS5mcmFtZU9wdHMuZHVyYXRpb247XG5cbiAgICAgICAgICAgICAgICAvLyBUaGlzIGlzIHNpbXBseSBjYWxsZWQgYW5kIGl0J3MgbGVmdCB0byAudHJhbnNpdGlvbiB0byBkZWNpZGUgaG93IHRvIG1hbmFnZVxuICAgICAgICAgICAgICAgIC8vIGludGVycnVwdGluZyBjdXJyZW50IHRyYW5zaXRpb25zLiBUaGF0IG1lYW5zIHdlIGRvbid0IG5lZWQgdG8gd29ycnkgYWJvdXRcbiAgICAgICAgICAgICAgICAvLyBob3cgaXQgcmVzb2x2ZXMgb3Igd2hhdCBoYXBwZW5zIGFmdGVyIHRoaXM6XG4gICAgICAgICAgICAgICAgUGxvdHMudHJhbnNpdGlvbihnZCxcbiAgICAgICAgICAgICAgICAgICAgbmV3RnJhbWUuZnJhbWUuZGF0YSxcbiAgICAgICAgICAgICAgICAgICAgbmV3RnJhbWUuZnJhbWUubGF5b3V0LFxuICAgICAgICAgICAgICAgICAgICBoZWxwZXJzLmNvZXJjZVRyYWNlSW5kaWNlcyhnZCwgbmV3RnJhbWUuZnJhbWUudHJhY2VzKSxcbiAgICAgICAgICAgICAgICAgICAgbmV3RnJhbWUuZnJhbWVPcHRzLFxuICAgICAgICAgICAgICAgICAgICBuZXdGcmFtZS50cmFuc2l0aW9uT3B0c1xuICAgICAgICAgICAgICAgICkudGhlbihmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYobmV3RnJhbWUub25Db21wbGV0ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3RnJhbWUub25Db21wbGV0ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICBnZC5lbWl0KCdwbG90bHlfYW5pbWF0aW5nZnJhbWUnLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IHN0cmluZ05hbWUsXG4gICAgICAgICAgICAgICAgICAgIGZyYW1lOiBuZXdGcmFtZS5mcmFtZSxcbiAgICAgICAgICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcmFtZTogbmV3RnJhbWUuZnJhbWVPcHRzLFxuICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNpdGlvbjogbmV3RnJhbWUudHJhbnNpdGlvbk9wdHMsXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG5vIG1vcmUgZnJhbWVzLCB0aGVuIHN0b3AgdGhlIFJBRiBsb29wOlxuICAgICAgICAgICAgICAgIHN0b3BBbmltYXRpb25Mb29wKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBiZWdpbkFuaW1hdGlvbkxvb3AoKSB7XG4gICAgICAgICAgICBnZC5lbWl0KCdwbG90bHlfYW5pbWF0aW5nJyk7XG5cbiAgICAgICAgICAgIC8vIElmIG5vIHRpbWVyIGlzIHJ1bm5pbmcsIHRoZW4gc2V0IGxhc3QgZnJhbWUgPSBsb25nIGFnbyBzbyB0aGF0IHRoZSBuZXh0XG4gICAgICAgICAgICAvLyBmcmFtZSBpcyBpbW1lZGlhdGVseSB0cmFuc2l0aW9uZWQ6XG4gICAgICAgICAgICB0cmFucy5fbGFzdEZyYW1lQXQgPSAtSW5maW5pdHk7XG4gICAgICAgICAgICB0cmFucy5fdGltZVRvTmV4dCA9IDA7XG4gICAgICAgICAgICB0cmFucy5fcnVubmluZ1RyYW5zaXRpb25zID0gMDtcbiAgICAgICAgICAgIHRyYW5zLl9jdXJyZW50RnJhbWUgPSBudWxsO1xuXG4gICAgICAgICAgICB2YXIgZG9GcmFtZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIC8vIFRoaXMgKm11c3QqIGJlIHJlcXVlc3RlZCBiZWZvcmUgbmV4dEZyYW1lIHNpbmNlIG5leHRGcmFtZSBtYXkgZGVjaWRlXG4gICAgICAgICAgICAgICAgLy8gdG8gY2FuY2VsIGl0IGlmIHRoZXJlJ3Mgbm90aGluZyBtb3JlIHRvIGFuaW1hdGVkOlxuICAgICAgICAgICAgICAgIHRyYW5zLl9hbmltYXRpb25SYWYgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRvRnJhbWUpO1xuXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgd2UncmUgcmVhZHkgZm9yIGEgbmV3IGZyYW1lOlxuICAgICAgICAgICAgICAgIGlmKERhdGUubm93KCkgLSB0cmFucy5fbGFzdEZyYW1lQXQgPiB0cmFucy5fdGltZVRvTmV4dCkge1xuICAgICAgICAgICAgICAgICAgICBuZXh0RnJhbWUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBkb0ZyYW1lKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGlzIGlzIGFuIGFuaW1hdGUtbG9jYWwgY291bnRlciB0aGF0IGhlbHBzIG1hdGNoIHVwIG9wdGlvbiBpbnB1dCBsaXN0XG4gICAgICAgIC8vIGl0ZW1zIHdpdGggdGhlIHBhcnRpY3VsYXIgZnJhbWUuXG4gICAgICAgIHZhciBjb25maWdDb3VudGVyID0gMDtcbiAgICAgICAgZnVuY3Rpb24gc2V0VHJhbnNpdGlvbkNvbmZpZyhmcmFtZSkge1xuICAgICAgICAgICAgaWYoQXJyYXkuaXNBcnJheSh0cmFuc2l0aW9uT3B0cykpIHtcbiAgICAgICAgICAgICAgICBpZihjb25maWdDb3VudGVyID49IHRyYW5zaXRpb25PcHRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICBmcmFtZS50cmFuc2l0aW9uT3B0cyA9IHRyYW5zaXRpb25PcHRzW2NvbmZpZ0NvdW50ZXJdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lLnRyYW5zaXRpb25PcHRzID0gdHJhbnNpdGlvbk9wdHNbMF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmcmFtZS50cmFuc2l0aW9uT3B0cyA9IHRyYW5zaXRpb25PcHRzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlnQ291bnRlcisrO1xuICAgICAgICAgICAgcmV0dXJuIGZyYW1lO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gRGlzYW1iaWd1YXRlIHdoYXQncyBzb3J0IG9mIGZyYW1lcyBoYXZlIGJlZW4gcmVjZWl2ZWRcbiAgICAgICAgdmFyIGksIGZyYW1lO1xuICAgICAgICB2YXIgZnJhbWVMaXN0ID0gW107XG4gICAgICAgIHZhciBhbGxGcmFtZXMgPSBmcmFtZU9yR3JvdXBOYW1lT3JGcmFtZUxpc3QgPT09IHVuZGVmaW5lZCB8fCBmcmFtZU9yR3JvdXBOYW1lT3JGcmFtZUxpc3QgPT09IG51bGw7XG4gICAgICAgIHZhciBpc0ZyYW1lQXJyYXkgPSBBcnJheS5pc0FycmF5KGZyYW1lT3JHcm91cE5hbWVPckZyYW1lTGlzdCk7XG4gICAgICAgIHZhciBpc1NpbmdsZUZyYW1lID0gIWFsbEZyYW1lcyAmJiAhaXNGcmFtZUFycmF5ICYmIExpYi5pc1BsYWluT2JqZWN0KGZyYW1lT3JHcm91cE5hbWVPckZyYW1lTGlzdCk7XG5cbiAgICAgICAgaWYoaXNTaW5nbGVGcmFtZSkge1xuICAgICAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCBhIHNpbXBsZSBvYmplY3QgaGFzIGJlZW4gcGFzc2VkIHRvIGFuaW1hdGUuXG4gICAgICAgICAgICBmcmFtZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgZGF0YTogc2V0VHJhbnNpdGlvbkNvbmZpZyhMaWIuZXh0ZW5kRmxhdCh7fSwgZnJhbWVPckdyb3VwTmFtZU9yRnJhbWVMaXN0KSlcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYoYWxsRnJhbWVzIHx8IFsnc3RyaW5nJywgJ251bWJlciddLmluZGV4T2YodHlwZW9mIGZyYW1lT3JHcm91cE5hbWVPckZyYW1lTGlzdCkgIT09IC0xKSB7XG4gICAgICAgICAgICAvLyBJbiB0aGlzIGNhc2UsIG51bGwgb3IgdW5kZWZpbmVkIGhhcyBiZWVuIHBhc3NlZCBzbyB0aGF0IHdlIHdhbnQgdG9cbiAgICAgICAgICAgIC8vIGFuaW1hdGUgKmFsbCogY3VycmVudGx5IGRlZmluZWQgZnJhbWVzXG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCB0cmFucy5fZnJhbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgZnJhbWUgPSB0cmFucy5fZnJhbWVzW2ldO1xuXG4gICAgICAgICAgICAgICAgaWYoIWZyYW1lKSBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgIGlmKGFsbEZyYW1lcyB8fCBTdHJpbmcoZnJhbWUuZ3JvdXApID09PSBTdHJpbmcoZnJhbWVPckdyb3VwTmFtZU9yRnJhbWVMaXN0KSkge1xuICAgICAgICAgICAgICAgICAgICBmcmFtZUxpc3QucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYnluYW1lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6IFN0cmluZyhmcmFtZS5uYW1lKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IHNldFRyYW5zaXRpb25Db25maWcoe25hbWU6IGZyYW1lLm5hbWV9KVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZihpc0ZyYW1lQXJyYXkpIHtcbiAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGZyYW1lT3JHcm91cE5hbWVPckZyYW1lTGlzdC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIHZhciBmcmFtZU9yTmFtZSA9IGZyYW1lT3JHcm91cE5hbWVPckZyYW1lTGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZihbJ251bWJlcicsICdzdHJpbmcnXS5pbmRleE9mKHR5cGVvZiBmcmFtZU9yTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lT3JOYW1lID0gU3RyaW5nKGZyYW1lT3JOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gSW4gdGhpcyBjYXNlLCB0aGVyZSdzIGFuIGFycmF5IGFuZCB0aGlzIGZyYW1lIGlzIGEgc3RyaW5nIG5hbWU6XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lTGlzdC5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdieW5hbWUnLFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogZnJhbWVPck5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBzZXRUcmFuc2l0aW9uQ29uZmlnKHtuYW1lOiBmcmFtZU9yTmFtZX0pXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZihMaWIuaXNQbGFpbk9iamVjdChmcmFtZU9yTmFtZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZnJhbWVMaXN0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ29iamVjdCcsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBzZXRUcmFuc2l0aW9uQ29uZmlnKExpYi5leHRlbmRGbGF0KHt9LCBmcmFtZU9yTmFtZSkpXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFZlcmlmeSB0aGF0IGFsbCBvZiB0aGVzZSBmcmFtZXMgYWN0dWFsbHkgZXhpc3Q7IHJldHVybiBhbmQgcmVqZWN0IGlmIG5vdDpcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgZnJhbWVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBmcmFtZSA9IGZyYW1lTGlzdFtpXTtcbiAgICAgICAgICAgIGlmKGZyYW1lLnR5cGUgPT09ICdieW5hbWUnICYmICF0cmFucy5fZnJhbWVIYXNoW2ZyYW1lLmRhdGEubmFtZV0pIHtcbiAgICAgICAgICAgICAgICBMaWIud2FybignYW5pbWF0ZSBmYWlsdXJlOiBmcmFtZSBub3QgZm91bmQ6IFwiJyArIGZyYW1lLmRhdGEubmFtZSArICdcIicpO1xuICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHRoZSBtb2RlIGlzIGVpdGhlciBuZXh0IG9yIGltbWVkaWF0ZSwgdGhlbiBhbGwgY3VycmVudGx5IHF1ZXVlZCBmcmFtZXMgbXVzdFxuICAgICAgICAvLyBiZSBkdW1wZWQgYW5kIHRoZSBjb3JyZXNwb25kaW5nIC5hbmltYXRlIHByb21pc2VzIHJlamVjdGVkLlxuICAgICAgICBpZihbJ25leHQnLCAnaW1tZWRpYXRlJ10uaW5kZXhPZihhbmltYXRpb25PcHRzLm1vZGUpICE9PSAtMSkge1xuICAgICAgICAgICAgZGlzY2FyZEV4aXN0aW5nRnJhbWVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihhbmltYXRpb25PcHRzLmRpcmVjdGlvbiA9PT0gJ3JldmVyc2UnKSB7XG4gICAgICAgICAgICBmcmFtZUxpc3QucmV2ZXJzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGN1cnJlbnRGcmFtZSA9IGdkLl9mdWxsTGF5b3V0Ll9jdXJyZW50RnJhbWU7XG4gICAgICAgIGlmKGN1cnJlbnRGcmFtZSAmJiBhbmltYXRpb25PcHRzLmZyb21jdXJyZW50KSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gLTE7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBmcmFtZUxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBmcmFtZSA9IGZyYW1lTGlzdFtpXTtcbiAgICAgICAgICAgICAgICBpZihmcmFtZS50eXBlID09PSAnYnluYW1lJyAmJiBmcmFtZS5uYW1lID09PSBjdXJyZW50RnJhbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWR4ID0gaTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZihpZHggPiAwICYmIGlkeCA8IGZyYW1lTGlzdC5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlcmVkRnJhbWVMaXN0ID0gW107XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgZnJhbWVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGZyYW1lID0gZnJhbWVMaXN0W2ldO1xuICAgICAgICAgICAgICAgICAgICBpZihmcmFtZUxpc3RbaV0udHlwZSAhPT0gJ2J5bmFtZScgfHwgaSA+IGlkeCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyZWRGcmFtZUxpc3QucHVzaChmcmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZnJhbWVMaXN0ID0gZmlsdGVyZWRGcmFtZUxpc3Q7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZihmcmFtZUxpc3QubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcXVldWVGcmFtZXMoZnJhbWVMaXN0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIGNhc2Ugd2hlcmUgdGhlcmUgd2VyZSBzaW1wbHkgbm8gZnJhbWVzLiBJdCdzIGEgbGl0dGxlIHN0cmFuZ2VcbiAgICAgICAgICAgIC8vIHNpbmNlIHRoZXJlJ3Mgbm90IG11Y2ggdG8gZG86XG4gICAgICAgICAgICBnZC5lbWl0KCdwbG90bHlfYW5pbWF0ZWQnKTtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG4vKipcbiAqIFJlZ2lzdGVyIG5ldyBmcmFtZXNcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyBpZCBvciBET00gZWxlbWVudH0gZ2RcbiAqICAgICAgdGhlIGlkIG9yIERPTSBlbGVtZW50IG9mIHRoZSBncmFwaCBjb250YWluZXIgZGl2XG4gKlxuICogQHBhcmFtIHthcnJheSBvZiBvYmplY3RzfSBmcmFtZUxpc3RcbiAqICAgICAgbGlzdCBvZiBmcmFtZSBkZWZpbml0aW9ucywgaW4gd2hpY2ggZWFjaCBvYmplY3QgaW5jbHVkZXMgYW55IG9mOlxuICogICAgICAtIG5hbWU6IHtzdHJpbmd9IG5hbWUgb2YgZnJhbWUgdG8gYWRkXG4gKiAgICAgIC0gZGF0YToge2FycmF5IG9mIG9iamVjdHN9IHRyYWNlIGRhdGFcbiAqICAgICAgLSBsYXlvdXQge29iamVjdH0gbGF5b3V0IGRlZmluaXRpb25cbiAqICAgICAgLSB0cmFjZXMge2FycmF5fSB0cmFjZSBpbmRpY2VzXG4gKiAgICAgIC0gYmFzZWZyYW1lIHtzdHJpbmd9IG5hbWUgb2YgZnJhbWUgZnJvbSB3aGljaCB0aGlzIGZyYW1lIGdldHMgZGVmYXVsdHNcbiAqXG4gKiAgQHBhcmFtIHthcnJheSBvZiBpbnRlZ2Vyc30gaW5kaWNlc1xuICogICAgICBhbiBhcnJheSBvZiBpbnRlZ2VyIGluZGljZXMgbWF0Y2hpbmcgdGhlIHJlc3BlY3RpdmUgZnJhbWVzIGluIGBmcmFtZUxpc3RgLiBJZiBub3RcbiAqICAgICAgcHJvdmlkZWQsIGFuIGluZGV4IHdpbGwgYmUgcHJvdmlkZWQgaW4gc2VyaWFsIG9yZGVyLiBJZiBhbHJlYWR5IHVzZWQsIHRoZSBmcmFtZVxuICogICAgICB3aWxsIGJlIG92ZXJ3cml0dGVuLlxuICovXG5mdW5jdGlvbiBhZGRGcmFtZXMoZ2QsIGZyYW1lTGlzdCwgaW5kaWNlcykge1xuICAgIGdkID0gTGliLmdldEdyYXBoRGl2KGdkKTtcblxuICAgIGlmKGZyYW1lTGlzdCA9PT0gbnVsbCB8fCBmcmFtZUxpc3QgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgaWYoIUxpYi5pc1Bsb3REaXYoZ2QpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdUaGlzIGVsZW1lbnQgaXMgbm90IGEgUGxvdGx5IHBsb3Q6ICcgKyBnZCArICcuIEl0XFwncyBsaWtlbHkgdGhhdCB5b3VcXCd2ZSBmYWlsZWQgJyArXG4gICAgICAgICAgICAndG8gY3JlYXRlIGEgcGxvdCBiZWZvcmUgYWRkaW5nIGZyYW1lcy4gRm9yIG1vcmUgZGV0YWlscywgc2VlICcgK1xuICAgICAgICAgICAgJ2h0dHBzOi8vcGxvdGx5LmNvbS9qYXZhc2NyaXB0L2FuaW1hdGlvbnMvJ1xuICAgICAgICApO1xuICAgIH1cblxuICAgIHZhciBpLCBmcmFtZSwgaiwgaWR4O1xuICAgIHZhciBfZnJhbWVzID0gZ2QuX3RyYW5zaXRpb25EYXRhLl9mcmFtZXM7XG4gICAgdmFyIF9mcmFtZUhhc2ggPSBnZC5fdHJhbnNpdGlvbkRhdGEuX2ZyYW1lSGFzaDtcblxuXG4gICAgaWYoIUFycmF5LmlzQXJyYXkoZnJhbWVMaXN0KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FkZEZyYW1lcyBmYWlsdXJlOiBmcmFtZUxpc3QgbXVzdCBiZSBhbiBBcnJheSBvZiBmcmFtZSBkZWZpbml0aW9ucycgKyBmcmFtZUxpc3QpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBhIHNvcnRlZCBsaXN0IG9mIGluc2VydGlvbnMgc2luY2Ugd2UgcnVuIGludG8gbG90cyBvZiBwcm9ibGVtcyBpZiB0aGVzZVxuICAgIC8vIGFyZW4ndCBpbiBhc2NlbmRpbmcgb3JkZXIgb2YgaW5kZXg6XG4gICAgLy9cbiAgICAvLyBTdHJpY3RseSBmb3Igc29ydGluZy4gTWFrZSBzdXJlIHRoaXMgaXMgZ3VhcmFudGVlZCB0byBuZXZlciBjb2xsaWRlIHdpdGggYW55XG4gICAgLy8gYWxyZWFkeS1leGlzaXN0aW5nIGluZGljZXM6XG4gICAgdmFyIGJpZ0luZGV4ID0gX2ZyYW1lcy5sZW5ndGggKyBmcmFtZUxpc3QubGVuZ3RoICogMjtcblxuICAgIHZhciBpbnNlcnRpb25zID0gW107XG4gICAgdmFyIF9mcmFtZUhhc2hMb2NhbCA9IHt9O1xuICAgIGZvcihpID0gZnJhbWVMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmKCFMaWIuaXNQbGFpbk9iamVjdChmcmFtZUxpc3RbaV0pKSBjb250aW51ZTtcblxuICAgICAgICAvLyBUaGUgZW50aXJlIGxvZ2ljIGZvciBjaGVja2luZyBmb3IgdGhpcyB0eXBlIG9mIG5hbWUgY29sbGlzaW9uIGNhbiBiZSByZW1vdmVkIG9uY2Ugd2UgbWlncmF0ZSB0byBFUzYgYW5kXG4gICAgICAgIC8vIHVzZSBhIE1hcCBpbnN0ZWFkIG9mIGFuIE9iamVjdCBpbnN0YW5jZSwgYXMgTWFwIGtleXMgYXJlbid0IGNvbnZlcnRlZCB0byBzdHJpbmdzLlxuICAgICAgICB2YXIgbG9va3VwTmFtZSA9IGZyYW1lTGlzdFtpXS5uYW1lO1xuICAgICAgICB2YXIgbmFtZSA9IChfZnJhbWVIYXNoW2xvb2t1cE5hbWVdIHx8IF9mcmFtZUhhc2hMb2NhbFtsb29rdXBOYW1lXSB8fCB7fSkubmFtZTtcbiAgICAgICAgdmFyIG5ld05hbWUgPSBmcmFtZUxpc3RbaV0ubmFtZTtcbiAgICAgICAgdmFyIGNvbGxpc2lvblByZXNlbnQgPSBfZnJhbWVIYXNoW25hbWVdIHx8IF9mcmFtZUhhc2hMb2NhbFtuYW1lXTtcblxuICAgICAgICBpZihuYW1lICYmIG5ld05hbWUgJiYgdHlwZW9mIG5ld05hbWUgPT09ICdudW1iZXInICYmIGNvbGxpc2lvblByZXNlbnQgJiYgbnVtZXJpY05hbWVXYXJuaW5nQ291bnQgPCBudW1lcmljTmFtZVdhcm5pbmdDb3VudExpbWl0KSB7XG4gICAgICAgICAgICBudW1lcmljTmFtZVdhcm5pbmdDb3VudCsrO1xuXG4gICAgICAgICAgICBMaWIud2FybignYWRkRnJhbWVzOiBvdmVyd3JpdGluZyBmcmFtZSBcIicgKyAoX2ZyYW1lSGFzaFtuYW1lXSB8fCBfZnJhbWVIYXNoTG9jYWxbbmFtZV0pLm5hbWUgK1xuICAgICAgICAgICAgICAgICdcIiB3aXRoIGEgZnJhbWUgd2hvc2UgbmFtZSBvZiB0eXBlIFwibnVtYmVyXCIgYWxzbyBlcXVhdGVzIHRvIFwiJyArXG4gICAgICAgICAgICAgICAgbmFtZSArICdcIi4gVGhpcyBpcyB2YWxpZCBidXQgbWF5IHBvdGVudGlhbGx5IGxlYWQgdG8gdW5leHBlY3RlZCAnICtcbiAgICAgICAgICAgICAgICAnYmVoYXZpb3Igc2luY2UgYWxsIHBsb3RseS5qcyBmcmFtZSBuYW1lcyBhcmUgc3RvcmVkIGludGVybmFsbHkgJyArXG4gICAgICAgICAgICAgICAgJ2FzIHN0cmluZ3MuJyk7XG5cbiAgICAgICAgICAgIGlmKG51bWVyaWNOYW1lV2FybmluZ0NvdW50ID09PSBudW1lcmljTmFtZVdhcm5pbmdDb3VudExpbWl0KSB7XG4gICAgICAgICAgICAgICAgTGliLndhcm4oJ2FkZEZyYW1lczogVGhpcyBBUEkgY2FsbCBoYXMgeWllbGRlZCB0b28gbWFueSBvZiB0aGVzZSB3YXJuaW5ncy4gJyArXG4gICAgICAgICAgICAgICAgICAgICdGb3IgdGhlIHJlc3Qgb2YgdGhpcyBjYWxsLCBmdXJ0aGVyIHdhcm5pbmdzIGFib3V0IG51bWVyaWMgZnJhbWUgJyArXG4gICAgICAgICAgICAgICAgICAgICduYW1lcyB3aWxsIGJlIHN1cHByZXNzZWQuJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBfZnJhbWVIYXNoTG9jYWxbbG9va3VwTmFtZV0gPSB7bmFtZTogbG9va3VwTmFtZX07XG5cbiAgICAgICAgaW5zZXJ0aW9ucy5wdXNoKHtcbiAgICAgICAgICAgIGZyYW1lOiBQbG90cy5zdXBwbHlGcmFtZURlZmF1bHRzKGZyYW1lTGlzdFtpXSksXG4gICAgICAgICAgICBpbmRleDogKGluZGljZXMgJiYgaW5kaWNlc1tpXSAhPT0gdW5kZWZpbmVkICYmIGluZGljZXNbaV0gIT09IG51bGwpID8gaW5kaWNlc1tpXSA6IGJpZ0luZGV4ICsgaVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBTb3J0IHRoaXMsIHRha2luZyBub3RlIHRoYXQgdW5kZWZpbmVkIGluc2VydGlvbnMgZW5kIHVwIGF0IHRoZSBlbmQ6XG4gICAgaW5zZXJ0aW9ucy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgaWYoYS5pbmRleCA+IGIuaW5kZXgpIHJldHVybiAtMTtcbiAgICAgICAgaWYoYS5pbmRleCA8IGIuaW5kZXgpIHJldHVybiAxO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9KTtcblxuICAgIHZhciBvcHMgPSBbXTtcbiAgICB2YXIgcmV2b3BzID0gW107XG4gICAgdmFyIGZyYW1lQ291bnQgPSBfZnJhbWVzLmxlbmd0aDtcblxuICAgIGZvcihpID0gaW5zZXJ0aW9ucy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBmcmFtZSA9IGluc2VydGlvbnNbaV0uZnJhbWU7XG5cbiAgICAgICAgaWYodHlwZW9mIGZyYW1lLm5hbWUgPT09ICdudW1iZXInKSB7XG4gICAgICAgICAgICBMaWIud2FybignV2FybmluZzogYWRkRnJhbWVzIGFjY2VwdHMgZnJhbWVzIHdpdGggbnVtZXJpYyBuYW1lcywgYnV0IHRoZSBudW1iZXJzIGFyZScgK1xuICAgICAgICAgICAgICAgICdpbXBsaWNpdGx5IGNhc3QgdG8gc3RyaW5ncycpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoIWZyYW1lLm5hbWUpIHtcbiAgICAgICAgICAgIC8vIFJlcGVhdGVkbHkgYXNzaWduIGEgZGVmYXVsdCBuYW1lLCBpbmNyZW1lbnRpbmcgdGhlIGNvdW50ZXIgZWFjaCB0aW1lIHVudGlsXG4gICAgICAgICAgICAvLyB3ZSBnZXQgYSBuYW1lIHRoYXQncyBub3QgaW4gdGhlIGhhc2hlZCBsb29rdXAgdGFibGU6XG4gICAgICAgICAgICB3aGlsZShfZnJhbWVIYXNoWyhmcmFtZS5uYW1lID0gJ2ZyYW1lICcgKyBnZC5fdHJhbnNpdGlvbkRhdGEuX2NvdW50ZXIrKyldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKF9mcmFtZUhhc2hbZnJhbWUubmFtZV0pIHtcbiAgICAgICAgICAgIC8vIElmIGZyYW1lIGlzIHByZXNlbnQsIG92ZXJ3cml0ZSBpdHMgZGVmaW5pdGlvbjpcbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IF9mcmFtZXMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICBpZigoX2ZyYW1lc1tqXSB8fCB7fSkubmFtZSA9PT0gZnJhbWUubmFtZSkgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcHMucHVzaCh7dHlwZTogJ3JlcGxhY2UnLCBpbmRleDogaiwgdmFsdWU6IGZyYW1lfSk7XG4gICAgICAgICAgICByZXZvcHMudW5zaGlmdCh7dHlwZTogJ3JlcGxhY2UnLCBpbmRleDogaiwgdmFsdWU6IF9mcmFtZXNbal19KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIE90aGVyd2lzZSBpbnNlcnQgaXQgYXQgdGhlIGVuZCBvZiB0aGUgbGlzdDpcbiAgICAgICAgICAgIGlkeCA9IE1hdGgubWF4KDAsIE1hdGgubWluKGluc2VydGlvbnNbaV0uaW5kZXgsIGZyYW1lQ291bnQpKTtcblxuICAgICAgICAgICAgb3BzLnB1c2goe3R5cGU6ICdpbnNlcnQnLCBpbmRleDogaWR4LCB2YWx1ZTogZnJhbWV9KTtcbiAgICAgICAgICAgIHJldm9wcy51bnNoaWZ0KHt0eXBlOiAnZGVsZXRlJywgaW5kZXg6IGlkeH0pO1xuICAgICAgICAgICAgZnJhbWVDb3VudCsrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHVuZG9GdW5jID0gUGxvdHMubW9kaWZ5RnJhbWVzO1xuICAgIHZhciByZWRvRnVuYyA9IFBsb3RzLm1vZGlmeUZyYW1lcztcbiAgICB2YXIgdW5kb0FyZ3MgPSBbZ2QsIHJldm9wc107XG4gICAgdmFyIHJlZG9BcmdzID0gW2dkLCBvcHNdO1xuXG4gICAgaWYoUXVldWUpIFF1ZXVlLmFkZChnZCwgdW5kb0Z1bmMsIHVuZG9BcmdzLCByZWRvRnVuYywgcmVkb0FyZ3MpO1xuXG4gICAgcmV0dXJuIFBsb3RzLm1vZGlmeUZyYW1lcyhnZCwgb3BzKTtcbn1cblxuLyoqXG4gKiBEZWxldGUgZnJhbWVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyBpZCBvciBET00gZWxlbWVudH0gZ2RcbiAqICAgICAgdGhlIGlkIG9yIERPTSBlbGVtZW50IG9mIHRoZSBncmFwaCBjb250YWluZXIgZGl2XG4gKlxuICogQHBhcmFtIHthcnJheSBvZiBpbnRlZ2Vyc30gZnJhbWVMaXN0XG4gKiAgICAgIGxpc3Qgb2YgaW50ZWdlciBpbmRpY2VzIG9mIGZyYW1lcyB0byBiZSBkZWxldGVkXG4gKi9cbmZ1bmN0aW9uIGRlbGV0ZUZyYW1lcyhnZCwgZnJhbWVMaXN0KSB7XG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuXG4gICAgaWYoIUxpYi5pc1Bsb3REaXYoZ2QpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBlbGVtZW50IGlzIG5vdCBhIFBsb3RseSBwbG90OiAnICsgZ2QpO1xuICAgIH1cblxuICAgIHZhciBpLCBpZHg7XG4gICAgdmFyIF9mcmFtZXMgPSBnZC5fdHJhbnNpdGlvbkRhdGEuX2ZyYW1lcztcbiAgICB2YXIgb3BzID0gW107XG4gICAgdmFyIHJldm9wcyA9IFtdO1xuXG4gICAgaWYoIWZyYW1lTGlzdCkge1xuICAgICAgICBmcmFtZUxpc3QgPSBbXTtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgX2ZyYW1lcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgZnJhbWVMaXN0LnB1c2goaSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmcmFtZUxpc3QgPSBmcmFtZUxpc3Quc2xpY2UoKTtcbiAgICBmcmFtZUxpc3Quc29ydCgpO1xuXG4gICAgZm9yKGkgPSBmcmFtZUxpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWR4ID0gZnJhbWVMaXN0W2ldO1xuICAgICAgICBvcHMucHVzaCh7dHlwZTogJ2RlbGV0ZScsIGluZGV4OiBpZHh9KTtcbiAgICAgICAgcmV2b3BzLnVuc2hpZnQoe3R5cGU6ICdpbnNlcnQnLCBpbmRleDogaWR4LCB2YWx1ZTogX2ZyYW1lc1tpZHhdfSk7XG4gICAgfVxuXG4gICAgdmFyIHVuZG9GdW5jID0gUGxvdHMubW9kaWZ5RnJhbWVzO1xuICAgIHZhciByZWRvRnVuYyA9IFBsb3RzLm1vZGlmeUZyYW1lcztcbiAgICB2YXIgdW5kb0FyZ3MgPSBbZ2QsIHJldm9wc107XG4gICAgdmFyIHJlZG9BcmdzID0gW2dkLCBvcHNdO1xuXG4gICAgaWYoUXVldWUpIFF1ZXVlLmFkZChnZCwgdW5kb0Z1bmMsIHVuZG9BcmdzLCByZWRvRnVuYywgcmVkb0FyZ3MpO1xuXG4gICAgcmV0dXJuIFBsb3RzLm1vZGlmeUZyYW1lcyhnZCwgb3BzKTtcbn1cblxuLyoqXG4gKiBQdXJnZSBhIGdyYXBoIGNvbnRhaW5lciBkaXYgYmFjayB0byBpdHMgaW5pdGlhbCBwcmUtUGxvdGx5LnBsb3Qgc3RhdGVcbiAqXG4gKiBAcGFyYW0ge3N0cmluZyBpZCBvciBET00gZWxlbWVudH0gZ2RcbiAqICAgICAgdGhlIGlkIG9yIERPTSBlbGVtZW50IG9mIHRoZSBncmFwaCBjb250YWluZXIgZGl2XG4gKi9cbmZ1bmN0aW9uIHB1cmdlKGdkKSB7XG4gICAgZ2QgPSBMaWIuZ2V0R3JhcGhEaXYoZ2QpO1xuXG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dCB8fCB7fTtcbiAgICB2YXIgZnVsbERhdGEgPSBnZC5fZnVsbERhdGEgfHwgW107XG5cbiAgICAvLyByZW1vdmUgZ2wgY29udGV4dHNcbiAgICBQbG90cy5jbGVhblBsb3QoW10sIHt9LCBmdWxsRGF0YSwgZnVsbExheW91dCk7XG5cbiAgICAvLyBwdXJnZSBwcm9wZXJ0aWVzXG4gICAgUGxvdHMucHVyZ2UoZ2QpO1xuXG4gICAgLy8gcHVyZ2UgZXZlbnQgZW1pdHRlciBtZXRob2RzXG4gICAgRXZlbnRzLnB1cmdlKGdkKTtcblxuICAgIC8vIHJlbW92ZSBwbG90IGNvbnRhaW5lclxuICAgIGlmKGZ1bGxMYXlvdXQuX2NvbnRhaW5lcikgZnVsbExheW91dC5fY29udGFpbmVyLnJlbW92ZSgpO1xuXG4gICAgLy8gaW4gY29udHJhc3QgdG8gUGxvdGx5LlBsb3RzLnB1cmdlIHdoaWNoIGRvZXMgTk9UIGNsZWFyIF9jb250ZXh0IVxuICAgIGRlbGV0ZSBnZC5fY29udGV4dDtcblxuICAgIHJldHVybiBnZDtcbn1cblxuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuLy8gbWFrZVBsb3RGcmFtZXdvcms6IENyZWF0ZSB0aGUgcGxvdCBjb250YWluZXIgYW5kIGF4ZXNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbmZ1bmN0aW9uIG1ha2VQbG90RnJhbWV3b3JrKGdkKSB7XG4gICAgdmFyIGdkMyA9IGQzLnNlbGVjdChnZCk7XG4gICAgdmFyIGZ1bGxMYXlvdXQgPSBnZC5fZnVsbExheW91dDtcblxuICAgIC8vIFBsb3QgY29udGFpbmVyXG4gICAgZnVsbExheW91dC5fY29udGFpbmVyID0gZ2QzLnNlbGVjdEFsbCgnLnBsb3QtY29udGFpbmVyJykuZGF0YShbMF0pO1xuICAgIGZ1bGxMYXlvdXQuX2NvbnRhaW5lci5lbnRlcigpLmluc2VydCgnZGl2JywgJzpmaXJzdC1jaGlsZCcpXG4gICAgICAgIC5jbGFzc2VkKCdwbG90LWNvbnRhaW5lcicsIHRydWUpXG4gICAgICAgIC5jbGFzc2VkKCdwbG90bHknLCB0cnVlKTtcblxuICAgIC8vIE1ha2UgdGhlIHN2ZyBjb250YWluZXJcbiAgICBmdWxsTGF5b3V0Ll9wYXBlcmRpdiA9IGZ1bGxMYXlvdXQuX2NvbnRhaW5lci5zZWxlY3RBbGwoJy5zdmctY29udGFpbmVyJykuZGF0YShbMF0pO1xuICAgIGZ1bGxMYXlvdXQuX3BhcGVyZGl2LmVudGVyKCkuYXBwZW5kKCdkaXYnKVxuICAgICAgICAuY2xhc3NlZCgnc3ZnLWNvbnRhaW5lcicsIHRydWUpXG4gICAgICAgIC5zdHlsZSgncG9zaXRpb24nLCAncmVsYXRpdmUnKTtcblxuICAgIC8vIE1ha2UgdGhlIGdyYXBoIGNvbnRhaW5lcnNcbiAgICAvLyBzdGFydCBmcmVzaCBlYWNoIHRpbWUgd2UgZ2V0IGhlcmUsIHNvIHdlIGtub3cgdGhlIG9yZGVyIGNvbWVzIG91dFxuICAgIC8vIHJpZ2h0LCByYXRoZXIgdGhhbiBlbnRlci9leGl0IHdoaWNoIGNhbiBtdWNrIHVwIHRoZSBvcmRlclxuICAgIC8vIFRPRE86IHNvcnQgb3V0IGFsbCB0aGUgb3JkZXJpbmcgc28gd2UgZG9uJ3QgaGF2ZSB0b1xuICAgIC8vIGV4cGxpY2l0bHkgZGVsZXRlIGFueXRoaW5nXG4gICAgLy8gRklYTUU6IHBhcmNvb3JkcyByZXVzZXMgdGhpcyBvYmplY3QsIG5vdCB0aGUgYmVzdCBwYXR0ZXJuXG4gICAgZnVsbExheW91dC5fZ2xjb250YWluZXIgPSBmdWxsTGF5b3V0Ll9wYXBlcmRpdi5zZWxlY3RBbGwoJy5nbC1jb250YWluZXInKVxuICAgICAgICAuZGF0YShbe31dKTtcblxuICAgIGZ1bGxMYXlvdXQuX2dsY29udGFpbmVyLmVudGVyKCkuYXBwZW5kKCdkaXYnKVxuICAgICAgICAuY2xhc3NlZCgnZ2wtY29udGFpbmVyJywgdHJ1ZSk7XG5cbiAgICBmdWxsTGF5b3V0Ll9wYXBlcmRpdi5zZWxlY3RBbGwoJy5tYWluLXN2ZycpLnJlbW92ZSgpO1xuICAgIGZ1bGxMYXlvdXQuX3BhcGVyZGl2LnNlbGVjdCgnLm1vZGViYXItY29udGFpbmVyJykucmVtb3ZlKCk7XG5cbiAgICBmdWxsTGF5b3V0Ll9wYXBlciA9IGZ1bGxMYXlvdXQuX3BhcGVyZGl2Lmluc2VydCgnc3ZnJywgJzpmaXJzdC1jaGlsZCcpXG4gICAgICAgIC5jbGFzc2VkKCdtYWluLXN2ZycsIHRydWUpO1xuXG4gICAgZnVsbExheW91dC5fdG9wcGFwZXIgPSBmdWxsTGF5b3V0Ll9wYXBlcmRpdi5hcHBlbmQoJ3N2ZycpXG4gICAgICAgIC5jbGFzc2VkKCdtYWluLXN2ZycsIHRydWUpO1xuXG4gICAgZnVsbExheW91dC5fbW9kZWJhcmRpdiA9IGZ1bGxMYXlvdXQuX3BhcGVyZGl2LmFwcGVuZCgnZGl2Jyk7XG5cbiAgICBmdWxsTGF5b3V0Ll9ob3ZlcnBhcGVyID0gZnVsbExheW91dC5fcGFwZXJkaXYuYXBwZW5kKCdzdmcnKVxuICAgICAgICAuY2xhc3NlZCgnbWFpbi1zdmcnLCB0cnVlKTtcblxuICAgIGlmKCFmdWxsTGF5b3V0Ll91aWQpIHtcbiAgICAgICAgdmFyIG90aGVyVWlkcyA9IHt9O1xuICAgICAgICBkMy5zZWxlY3RBbGwoJ2RlZnMnKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYodGhpcy5pZCkgb3RoZXJVaWRzW3RoaXMuaWQuc3BsaXQoJy0nKVsxXV0gPSAxO1xuICAgICAgICB9KTtcbiAgICAgICAgZnVsbExheW91dC5fdWlkID0gTGliLnJhbmRzdHIob3RoZXJVaWRzKTtcbiAgICB9XG5cbiAgICBmdWxsTGF5b3V0Ll9wYXBlcmRpdi5zZWxlY3RBbGwoJy5tYWluLXN2ZycpXG4gICAgICAgIC5hdHRyKHhtbG5zTmFtZXNwYWNlcy5zdmdBdHRycyk7XG5cbiAgICBmdWxsTGF5b3V0Ll9kZWZzID0gZnVsbExheW91dC5fcGFwZXIuYXBwZW5kKCdkZWZzJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ2RlZnMtJyArIGZ1bGxMYXlvdXQuX3VpZCk7XG5cbiAgICBmdWxsTGF5b3V0Ll9jbGlwcyA9IGZ1bGxMYXlvdXQuX2RlZnMuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ2NsaXBzJywgdHJ1ZSk7XG5cbiAgICBmdWxsTGF5b3V0Ll90b3BkZWZzID0gZnVsbExheW91dC5fdG9wcGFwZXIuYXBwZW5kKCdkZWZzJylcbiAgICAgICAgLmF0dHIoJ2lkJywgJ3RvcGRlZnMtJyArIGZ1bGxMYXlvdXQuX3VpZCk7XG5cbiAgICBmdWxsTGF5b3V0Ll90b3BjbGlwcyA9IGZ1bGxMYXlvdXQuX3RvcGRlZnMuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ2NsaXBzJywgdHJ1ZSk7XG5cbiAgICBmdWxsTGF5b3V0Ll9iZ0xheWVyID0gZnVsbExheW91dC5fcGFwZXIuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ2JnbGF5ZXInLCB0cnVlKTtcblxuICAgIGZ1bGxMYXlvdXQuX2RyYWdnZXJzID0gZnVsbExheW91dC5fcGFwZXIuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ2RyYWdsYXllcicsIHRydWUpO1xuXG4gICAgLy8gbG93ZXIgc2hhcGUvaW1hZ2UgbGF5ZXIgLSBub3RlIHRoYXQgdGhpcyBpcyBiZWhpbmRcbiAgICAvLyBhbGwgc3VicGxvdHMgZGF0YS9ncmlkcyBidXQgYWJvdmUgdGhlIGJhY2tncm91bmRzXG4gICAgLy8gZXhjZXB0IGluc2V0IHN1YnBsb3RzLCB3aG9zZSBiYWNrZ3JvdW5kcyBhcmUgZHJhd25cbiAgICAvLyBpbnNpZGUgdGhlaXIgb3duIGdyb3VwIHNvIHRoYXQgdGhleSBhcHBlYXIgYWJvdmVcbiAgICAvLyB0aGUgZGF0YSBmb3IgdGhlIG1haW4gc3VicGxvdFxuICAgIC8vIGxvd2VyIHNoYXBlcyBhbmQgaW1hZ2VzIHdoaWNoIGFyZSBmdWxseSByZWZlcmVuY2VkIHRvXG4gICAgLy8gYSBzdWJwbG90IHN0aWxsIGdldCBkcmF3biB3aXRoaW4gdGhlIHN1YnBsb3QncyBncm91cFxuICAgIC8vIHNvIHRoZXkgd2lsbCB3b3JrIGNvcnJlY3RseSBvbiBpbnNldHNcbiAgICB2YXIgbGF5ZXJCZWxvdyA9IGZ1bGxMYXlvdXQuX3BhcGVyLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKCdsYXllci1iZWxvdycsIHRydWUpO1xuICAgIGZ1bGxMYXlvdXQuX2ltYWdlTG93ZXJMYXllciA9IGxheWVyQmVsb3cuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ2ltYWdlbGF5ZXInLCB0cnVlKTtcbiAgICBmdWxsTGF5b3V0Ll9zaGFwZUxvd2VyTGF5ZXIgPSBsYXllckJlbG93LmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKCdzaGFwZWxheWVyJywgdHJ1ZSk7XG5cbiAgICAvLyBzaW5nbGUgY2FydGVzaWFuIGxheWVyIGZvciB0aGUgd2hvbGUgcGxvdFxuICAgIGZ1bGxMYXlvdXQuX2NhcnRlc2lhbmxheWVyID0gZnVsbExheW91dC5fcGFwZXIuYXBwZW5kKCdnJykuY2xhc3NlZCgnY2FydGVzaWFubGF5ZXInLCB0cnVlKTtcblxuICAgIC8vIHNpbmdsZSBwb2xhciBsYXllciBmb3IgdGhlIHdob2xlIHBsb3RcbiAgICBmdWxsTGF5b3V0Ll9wb2xhcmxheWVyID0gZnVsbExheW91dC5fcGFwZXIuYXBwZW5kKCdnJykuY2xhc3NlZCgncG9sYXJsYXllcicsIHRydWUpO1xuXG4gICAgLy8gc2luZ2xlIHRlcm5hcnkgbGF5ZXIgZm9yIHRoZSB3aG9sZSBwbG90XG4gICAgZnVsbExheW91dC5fdGVybmFyeWxheWVyID0gZnVsbExheW91dC5fcGFwZXIuYXBwZW5kKCdnJykuY2xhc3NlZCgndGVybmFyeWxheWVyJywgdHJ1ZSk7XG5cbiAgICAvLyBzaW5nbGUgZ2VvIGxheWVyIGZvciB0aGUgd2hvbGUgcGxvdFxuICAgIGZ1bGxMYXlvdXQuX2dlb2xheWVyID0gZnVsbExheW91dC5fcGFwZXIuYXBwZW5kKCdnJykuY2xhc3NlZCgnZ2VvbGF5ZXInLCB0cnVlKTtcblxuICAgIC8vIHNpbmdsZSBmdW5uZWxhcmVhIGxheWVyIGZvciB0aGUgd2hvbGUgcGxvdFxuICAgIGZ1bGxMYXlvdXQuX2Z1bm5lbGFyZWFsYXllciA9IGZ1bGxMYXlvdXQuX3BhcGVyLmFwcGVuZCgnZycpLmNsYXNzZWQoJ2Z1bm5lbGFyZWFsYXllcicsIHRydWUpO1xuXG4gICAgLy8gc2luZ2xlIHBpZSBsYXllciBmb3IgdGhlIHdob2xlIHBsb3RcbiAgICBmdWxsTGF5b3V0Ll9waWVsYXllciA9IGZ1bGxMYXlvdXQuX3BhcGVyLmFwcGVuZCgnZycpLmNsYXNzZWQoJ3BpZWxheWVyJywgdHJ1ZSk7XG5cbiAgICAvLyBzaW5nbGUgdHJlZW1hcCBsYXllciBmb3IgdGhlIHdob2xlIHBsb3RcbiAgICBmdWxsTGF5b3V0Ll90cmVlbWFwbGF5ZXIgPSBmdWxsTGF5b3V0Ll9wYXBlci5hcHBlbmQoJ2cnKS5jbGFzc2VkKCd0cmVlbWFwbGF5ZXInLCB0cnVlKTtcblxuICAgIC8vIHNpbmdsZSBzdW5idXJzdCBsYXllciBmb3IgdGhlIHdob2xlIHBsb3RcbiAgICBmdWxsTGF5b3V0Ll9zdW5idXJzdGxheWVyID0gZnVsbExheW91dC5fcGFwZXIuYXBwZW5kKCdnJykuY2xhc3NlZCgnc3VuYnVyc3RsYXllcicsIHRydWUpO1xuXG4gICAgLy8gc2luZ2xlIGluZGljYXRvciBsYXllciBmb3IgdGhlIHdob2xlIHBsb3RcbiAgICBmdWxsTGF5b3V0Ll9pbmRpY2F0b3JsYXllciA9IGZ1bGxMYXlvdXQuX3RvcHBhcGVyLmFwcGVuZCgnZycpLmNsYXNzZWQoJ2luZGljYXRvcmxheWVyJywgdHJ1ZSk7XG5cbiAgICAvLyBmaWxsIGluIGltYWdlIHNlcnZlciBzY3JhcGUtc3ZnXG4gICAgZnVsbExheW91dC5fZ2xpbWFnZXMgPSBmdWxsTGF5b3V0Ll9wYXBlci5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdnbGltYWdlcycsIHRydWUpO1xuXG4gICAgLy8gbGFzdGx5IHVwcGVyIHNoYXBlcywgaW5mbyAobGVnZW5kLCBhbm5vdGF0aW9ucykgYW5kIGhvdmVyIGxheWVycyBnbyBvbiB0b3BcbiAgICAvLyB0aGVzZSBhcmUgaW4gYSBkaWZmZXJlbnQgc3ZnIGVsZW1lbnQgbm9ybWFsbHksIGJ1dCBnZXQgY29sbGFwc2VkIGludG8gYSBzaW5nbGVcbiAgICAvLyBzdmcgd2hlbiBleHBvcnRpbmcgKGFmdGVyIGluc2VydGluZyAzRClcbiAgICAvLyB1cHBlciBzaGFwZXMvaW1hZ2VzIGFyZSBvbmx5IHRob3NlIGRyYXduIGFib3ZlIHRoZSB3aG9sZSBwbG90LCBpbmNsdWRpbmcgc3VicGxvdHNcbiAgICB2YXIgbGF5ZXJBYm92ZSA9IGZ1bGxMYXlvdXQuX3RvcHBhcGVyLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKCdsYXllci1hYm92ZScsIHRydWUpO1xuICAgIGZ1bGxMYXlvdXQuX2ltYWdlVXBwZXJMYXllciA9IGxheWVyQWJvdmUuYXBwZW5kKCdnJylcbiAgICAgICAgLmNsYXNzZWQoJ2ltYWdlbGF5ZXInLCB0cnVlKTtcbiAgICBmdWxsTGF5b3V0Ll9zaGFwZVVwcGVyTGF5ZXIgPSBsYXllckFib3ZlLmFwcGVuZCgnZycpXG4gICAgICAgIC5jbGFzc2VkKCdzaGFwZWxheWVyJywgdHJ1ZSk7XG5cbiAgICBmdWxsTGF5b3V0Ll9pbmZvbGF5ZXIgPSBmdWxsTGF5b3V0Ll90b3BwYXBlci5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdpbmZvbGF5ZXInLCB0cnVlKTtcbiAgICBmdWxsTGF5b3V0Ll9tZW51bGF5ZXIgPSBmdWxsTGF5b3V0Ll90b3BwYXBlci5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdtZW51bGF5ZXInLCB0cnVlKTtcbiAgICBmdWxsTGF5b3V0Ll96b29tbGF5ZXIgPSBmdWxsTGF5b3V0Ll90b3BwYXBlci5hcHBlbmQoJ2cnKS5jbGFzc2VkKCd6b29tbGF5ZXInLCB0cnVlKTtcbiAgICBmdWxsTGF5b3V0Ll9ob3ZlcmxheWVyID0gZnVsbExheW91dC5faG92ZXJwYXBlci5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdob3ZlcmxheWVyJywgdHJ1ZSk7XG5cbiAgICAvLyBNYWtlIHRoZSBtb2RlYmFyIGNvbnRhaW5lclxuICAgIGZ1bGxMYXlvdXQuX21vZGViYXJkaXZcbiAgICAgICAgLmNsYXNzZWQoJ21vZGViYXItY29udGFpbmVyJywgdHJ1ZSlcbiAgICAgICAgLnN0eWxlKCdwb3NpdGlvbicsICdhYnNvbHV0ZScpXG4gICAgICAgIC5zdHlsZSgndG9wJywgJzBweCcpXG4gICAgICAgIC5zdHlsZSgncmlnaHQnLCAnMHB4Jyk7XG5cbiAgICBnZC5lbWl0KCdwbG90bHlfZnJhbWV3b3JrJyk7XG59XG5cbmV4cG9ydHMuYW5pbWF0ZSA9IGFuaW1hdGU7XG5leHBvcnRzLmFkZEZyYW1lcyA9IGFkZEZyYW1lcztcbmV4cG9ydHMuZGVsZXRlRnJhbWVzID0gZGVsZXRlRnJhbWVzO1xuXG5leHBvcnRzLmFkZFRyYWNlcyA9IGFkZFRyYWNlcztcbmV4cG9ydHMuZGVsZXRlVHJhY2VzID0gZGVsZXRlVHJhY2VzO1xuZXhwb3J0cy5leHRlbmRUcmFjZXMgPSBleHRlbmRUcmFjZXM7XG5leHBvcnRzLm1vdmVUcmFjZXMgPSBtb3ZlVHJhY2VzO1xuZXhwb3J0cy5wcmVwZW5kVHJhY2VzID0gcHJlcGVuZFRyYWNlcztcblxuZXhwb3J0cy5uZXdQbG90ID0gbmV3UGxvdDtcbmV4cG9ydHMucGxvdCA9IHBsb3Q7XG5leHBvcnRzLnB1cmdlID0gcHVyZ2U7XG5cbmV4cG9ydHMucmVhY3QgPSByZWFjdDtcbmV4cG9ydHMucmVkcmF3ID0gcmVkcmF3O1xuZXhwb3J0cy5yZWxheW91dCA9IHJlbGF5b3V0O1xuZXhwb3J0cy5yZXN0eWxlID0gcmVzdHlsZTtcblxuZXhwb3J0cy5zZXRQbG90Q29uZmlnID0gc2V0UGxvdENvbmZpZztcblxuZXhwb3J0cy51cGRhdGUgPSB1cGRhdGU7XG5cbmV4cG9ydHMuX2d1aVJlbGF5b3V0ID0gZ3VpRWRpdChyZWxheW91dCk7XG5leHBvcnRzLl9ndWlSZXN0eWxlID0gZ3VpRWRpdChyZXN0eWxlKTtcbmV4cG9ydHMuX2d1aVVwZGF0ZSA9IGd1aUVkaXQodXBkYXRlKTtcblxuZXhwb3J0cy5fc3RvcmVEaXJlY3RHVUlFZGl0ID0gX3N0b3JlRGlyZWN0R1VJRWRpdDtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcblxuLyoqXG4gKiBNYWtlIGEgeHkgZG9tYWluIGF0dHJpYnV0ZSBncm91cFxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBvcHRzXG4gKiAgIEBwYXJhbSB7c3RyaW5nfVxuICogICAgIG9wdHMubmFtZTogbmFtZSB0byBiZSBpbnNlcnRlZCBpbiB0aGUgZGVmYXVsdCBkZXNjcmlwdGlvblxuICogICBAcGFyYW0ge2Jvb2xlYW59XG4gKiAgICAgb3B0cy50cmFjZTogc2V0IHRvIHRydWUgZm9yIHRyYWNlIGNvbnRhaW5lcnNcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgb3B0cy5lZGl0VHlwZTogZWRpdFR5cGUgZm9yIGFsbCBwaWVjZXNcbiAqICAgQHBhcmFtIHtib29sZWFufVxuICogICAgIG9wdHMubm9HcmlkQ2VsbDogc2V0IHRvIHRydWUgdG8gb21pdCBgcm93YCBhbmQgYGNvbHVtbmBcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gZXh0cmFcbiAqICAgQHBhcmFtIHtzdHJpbmd9XG4gKiAgICAgZXh0cmEuZGVzY3JpcHRpb246IGV4dHJhIGRlc2NyaXB0aW9uLiBOLkIgd2UgdXNlXG4gKiAgICAgYSBzZXBhcmF0ZSBleHRyYSBjb250YWluZXIgdG8gbWFrZSBpdCBjb21wYXRpYmxlIHdpdGhcbiAqICAgICB0aGUgY29tcHJlc3NfYXR0cmlidXRlcyB0cmFuc2Zvcm0uXG4gKlxuICogQHJldHVybiB7b2JqZWN0fSBhdHRyaWJ1dGVzIG9iamVjdCBjb250YWluaW5nIHt4LHl9IGFzIHNwZWNpZmllZFxuICovXG5leHBvcnRzLmF0dHJpYnV0ZXMgPSBmdW5jdGlvbihvcHRzLCBleHRyYSkge1xuICAgIG9wdHMgPSBvcHRzIHx8IHt9O1xuICAgIGV4dHJhID0gZXh0cmEgfHwge307XG5cbiAgICB2YXIgYmFzZSA9IHtcbiAgICAgICAgdmFsVHlwZTogJ2luZm9fYXJyYXknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiBvcHRzLmVkaXRUeXBlLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9LFxuICAgICAgICAgICAge3ZhbFR5cGU6ICdudW1iZXInLCBtaW46IDAsIG1heDogMSwgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGV9XG4gICAgICAgIF0sXG4gICAgICAgIGRmbHQ6IFswLCAxXVxuICAgIH07XG5cbiAgICB2YXIgbmFtZVBhcnQgPSBvcHRzLm5hbWUgPyBvcHRzLm5hbWUgKyAnICcgOiAnJztcbiAgICB2YXIgY29udFBhcnQgPSBvcHRzLnRyYWNlID8gJ3RyYWNlICcgOiAnc3VicGxvdCAnO1xuICAgIHZhciBkZXNjUGFydCA9IGV4dHJhLmRlc2NyaXB0aW9uID8gJyAnICsgZXh0cmEuZGVzY3JpcHRpb24gOiAnJztcblxuICAgIHZhciBvdXQgPSB7XG4gICAgICAgIHg6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIGhvcml6b250YWwgZG9tYWluIG9mIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnKGluIHBsb3QgZnJhY3Rpb24pLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfSksXG4gICAgICAgIHk6IGV4dGVuZEZsYXQoe30sIGJhc2UsIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHZlcnRpY2FsIGRvbWFpbiBvZiB0aGlzICcsXG4gICAgICAgICAgICAgICAgbmFtZVBhcnQsXG4gICAgICAgICAgICAgICAgY29udFBhcnQsXG4gICAgICAgICAgICAgICAgJyhpbiBwbG90IGZyYWN0aW9uKS4nLFxuICAgICAgICAgICAgICAgIGRlc2NQYXJ0XG4gICAgICAgICAgICBdLmpvaW4oJycpXG4gICAgICAgIH0pLFxuICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZVxuICAgIH07XG5cbiAgICBpZighb3B0cy5ub0dyaWRDZWxsKSB7XG4gICAgICAgIG91dC5yb3cgPSB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgICAgICBtaW46IDAsXG4gICAgICAgICAgICBkZmx0OiAwLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZWRpdFR5cGU6IG9wdHMuZWRpdFR5cGUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdJZiB0aGVyZSBpcyBhIGxheW91dCBncmlkLCB1c2UgdGhlIGRvbWFpbiAnLFxuICAgICAgICAgICAgICAgICdmb3IgdGhpcyByb3cgaW4gdGhlIGdyaWQgZm9yIHRoaXMgJyxcbiAgICAgICAgICAgICAgICBuYW1lUGFydCxcbiAgICAgICAgICAgICAgICBjb250UGFydCxcbiAgICAgICAgICAgICAgICAnLicsXG4gICAgICAgICAgICAgICAgZGVzY1BhcnRcbiAgICAgICAgICAgIF0uam9pbignJylcbiAgICAgICAgfTtcbiAgICAgICAgb3V0LmNvbHVtbiA9IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBlZGl0VHlwZTogb3B0cy5lZGl0VHlwZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0lmIHRoZXJlIGlzIGEgbGF5b3V0IGdyaWQsIHVzZSB0aGUgZG9tYWluICcsXG4gICAgICAgICAgICAgICAgJ2ZvciB0aGlzIGNvbHVtbiBpbiB0aGUgZ3JpZCBmb3IgdGhpcyAnLFxuICAgICAgICAgICAgICAgIG5hbWVQYXJ0LFxuICAgICAgICAgICAgICAgIGNvbnRQYXJ0LFxuICAgICAgICAgICAgICAgICcuJyxcbiAgICAgICAgICAgICAgICBkZXNjUGFydFxuICAgICAgICAgICAgXS5qb2luKCcnKVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBvdXQ7XG59O1xuXG5leHBvcnRzLmRlZmF1bHRzID0gZnVuY3Rpb24oY29udGFpbmVyT3V0LCBsYXlvdXQsIGNvZXJjZSwgZGZsdERvbWFpbnMpIHtcbiAgICB2YXIgZGZsdFggPSAoZGZsdERvbWFpbnMgJiYgZGZsdERvbWFpbnMueCkgfHwgWzAsIDFdO1xuICAgIHZhciBkZmx0WSA9IChkZmx0RG9tYWlucyAmJiBkZmx0RG9tYWlucy55KSB8fCBbMCwgMV07XG5cbiAgICB2YXIgZ3JpZCA9IGxheW91dC5ncmlkO1xuICAgIGlmKGdyaWQpIHtcbiAgICAgICAgdmFyIGNvbHVtbiA9IGNvZXJjZSgnZG9tYWluLmNvbHVtbicpO1xuICAgICAgICBpZihjb2x1bW4gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYoY29sdW1uIDwgZ3JpZC5jb2x1bW5zKSBkZmx0WCA9IGdyaWQuX2RvbWFpbnMueFtjb2x1bW5dO1xuICAgICAgICAgICAgZWxzZSBkZWxldGUgY29udGFpbmVyT3V0LmRvbWFpbi5jb2x1bW47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcm93ID0gY29lcmNlKCdkb21haW4ucm93Jyk7XG4gICAgICAgIGlmKHJvdyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBpZihyb3cgPCBncmlkLnJvd3MpIGRmbHRZID0gZ3JpZC5fZG9tYWlucy55W3Jvd107XG4gICAgICAgICAgICBlbHNlIGRlbGV0ZSBjb250YWluZXJPdXQuZG9tYWluLnJvdztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB4ID0gY29lcmNlKCdkb21haW4ueCcsIGRmbHRYKTtcbiAgICB2YXIgeSA9IGNvZXJjZSgnZG9tYWluLnknLCBkZmx0WSk7XG5cbiAgICAvLyBkb24ndCBhY2NlcHQgYmFkIGlucHV0IGRhdGFcbiAgICBpZighKHhbMF0gPCB4WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi54ID0gZGZsdFguc2xpY2UoKTtcbiAgICBpZighKHlbMF0gPCB5WzFdKSkgY29udGFpbmVyT3V0LmRvbWFpbi55ID0gZGZsdFkuc2xpY2UoKTtcbn07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBQb2xhciA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9taWNyb3BvbGFyJyk7XG5cblBvbGFyLm1hbmFnZXIgPSByZXF1aXJlKCcuL21pY3JvcG9sYXJfbWFuYWdlcicpO1xuIiwiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxudmFyIGQzID0gcmVxdWlyZSgnZDMnKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi8uLi9saWInKTtcbnZhciBleHRlbmREZWVwQWxsID0gTGliLmV4dGVuZERlZXBBbGw7XG52YXIgTUlEX1NISUZUID0gcmVxdWlyZSgnLi4vLi4vLi4vY29uc3RhbnRzL2FsaWdubWVudCcpLk1JRF9TSElGVDtcblxudmFyIMK1ID0gbW9kdWxlLmV4cG9ydHMgPSB7IHZlcnNpb246ICcwLjIuMicgfTtcblxuwrUuQXhpcyA9IGZ1bmN0aW9uIG1vZHVsZSgpIHtcbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICBkYXRhOiBbXSxcbiAgICAgICAgbGF5b3V0OiB7fVxuICAgIH0sIGlucHV0Q29uZmlnID0ge30sIGxpdmVDb25maWcgPSB7fTtcbiAgICB2YXIgc3ZnLCBjb250YWluZXIsIGRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2hvdmVyJyksIHJhZGlhbFNjYWxlLCBhbmd1bGFyU2NhbGU7XG4gICAgdmFyIGV4cG9ydHMgPSB7fTtcbiAgICBmdW5jdGlvbiByZW5kZXIoX2NvbnRhaW5lcikge1xuICAgICAgICBjb250YWluZXIgPSBfY29udGFpbmVyIHx8IGNvbnRhaW5lcjtcbiAgICAgICAgdmFyIGRhdGEgPSBjb25maWcuZGF0YTtcbiAgICAgICAgdmFyIGF4aXNDb25maWcgPSBjb25maWcubGF5b3V0O1xuICAgICAgICBpZiAodHlwZW9mIGNvbnRhaW5lciA9PSAnc3RyaW5nJyB8fCBjb250YWluZXIubm9kZU5hbWUpIGNvbnRhaW5lciA9IGQzLnNlbGVjdChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuZGF0dW0oZGF0YSkuZWFjaChmdW5jdGlvbihfZGF0YSwgX2luZGV4KSB7XG4gICAgICAgICAgICB2YXIgZGF0YU9yaWdpbmFsID0gX2RhdGEuc2xpY2UoKTtcbiAgICAgICAgICAgIGxpdmVDb25maWcgPSB7XG4gICAgICAgICAgICAgICAgZGF0YTogwrUudXRpbC5jbG9uZUpzb24oZGF0YU9yaWdpbmFsKSxcbiAgICAgICAgICAgICAgICBsYXlvdXQ6IMK1LnV0aWwuY2xvbmVKc29uKGF4aXNDb25maWcpXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGNvbG9ySW5kZXggPSAwO1xuICAgICAgICAgICAgZGF0YU9yaWdpbmFsLmZvckVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIGlmICghZC5jb2xvcikge1xuICAgICAgICAgICAgICAgICAgICBkLmNvbG9yID0gYXhpc0NvbmZpZy5kZWZhdWx0Q29sb3JSYW5nZVtjb2xvckluZGV4XTtcbiAgICAgICAgICAgICAgICAgICAgY29sb3JJbmRleCA9IChjb2xvckluZGV4ICsgMSkgJSBheGlzQ29uZmlnLmRlZmF1bHRDb2xvclJhbmdlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFkLnN0cm9rZUNvbG9yKSB7XG4gICAgICAgICAgICAgICAgICAgIGQuc3Ryb2tlQ29sb3IgPSBkLmdlb21ldHJ5ID09PSAnTGluZVBsb3QnID8gZC5jb2xvciA6IGQzLnJnYihkLmNvbG9yKS5kYXJrZXIoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsaXZlQ29uZmlnLmRhdGFbaV0uY29sb3IgPSBkLmNvbG9yO1xuICAgICAgICAgICAgICAgIGxpdmVDb25maWcuZGF0YVtpXS5zdHJva2VDb2xvciA9IGQuc3Ryb2tlQ29sb3I7XG4gICAgICAgICAgICAgICAgbGl2ZUNvbmZpZy5kYXRhW2ldLnN0cm9rZURhc2ggPSBkLnN0cm9rZURhc2g7XG4gICAgICAgICAgICAgICAgbGl2ZUNvbmZpZy5kYXRhW2ldLnN0cm9rZVNpemUgPSBkLnN0cm9rZVNpemU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBkYXRhID0gZGF0YU9yaWdpbmFsLmZpbHRlcihmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHZpc2libGUgPSBkLnZpc2libGU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB2aXNpYmxlID09PSAndW5kZWZpbmVkJyB8fCB2aXNpYmxlID09PSB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgaXNTdGFja2VkID0gZmFsc2U7XG4gICAgICAgICAgICB2YXIgZGF0YVdpdGhHcm91cElkID0gZGF0YS5tYXAoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIGlzU3RhY2tlZCA9IGlzU3RhY2tlZCB8fCB0eXBlb2YgZC5ncm91cElkICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGlzU3RhY2tlZCkge1xuICAgICAgICAgICAgICAgIHZhciBncm91cGVkID0gZDMubmVzdCgpLmtleShmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZC5ncm91cElkICE9ICd1bmRlZmluZWQnID8gZC5ncm91cElkIDogJ3Vuc3RhY2tlZCc7XG4gICAgICAgICAgICAgICAgfSkuZW50cmllcyhkYXRhV2l0aEdyb3VwSWQpO1xuICAgICAgICAgICAgICAgIHZhciBkYXRhWVN0YWNrID0gW107XG4gICAgICAgICAgICAgICAgdmFyIHN0YWNrZWQgPSBncm91cGVkLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmtleSA9PT0gJ3Vuc3RhY2tlZCcpIHJldHVybiBkLnZhbHVlczsgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJldkFycmF5ID0gZC52YWx1ZXNbMF0uci5tYXAoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBkLnZhbHVlcy5mb3JFYWNoKGZ1bmN0aW9uKGQsIGksIGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkLnlTdGFjayA9IFsgcHJldkFycmF5IF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVlTdGFjay5wdXNoKHByZXZBcnJheSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldkFycmF5ID0gwrUudXRpbC5zdW1BcnJheXMoZC5yLCBwcmV2QXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZC52YWx1ZXM7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBkYXRhID0gZDMubWVyZ2Uoc3RhY2tlZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIGQudCA9IEFycmF5LmlzQXJyYXkoZC50WzBdKSA/IGQudCA6IFsgZC50IF07XG4gICAgICAgICAgICAgICAgZC5yID0gQXJyYXkuaXNBcnJheShkLnJbMF0pID8gZC5yIDogWyBkLnIgXTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIHJhZGl1cyA9IE1hdGgubWluKGF4aXNDb25maWcud2lkdGggLSBheGlzQ29uZmlnLm1hcmdpbi5sZWZ0IC0gYXhpc0NvbmZpZy5tYXJnaW4ucmlnaHQsIGF4aXNDb25maWcuaGVpZ2h0IC0gYXhpc0NvbmZpZy5tYXJnaW4udG9wIC0gYXhpc0NvbmZpZy5tYXJnaW4uYm90dG9tKSAvIDI7XG4gICAgICAgICAgICByYWRpdXMgPSBNYXRoLm1heCgxMCwgcmFkaXVzKTtcbiAgICAgICAgICAgIHZhciBjaGFydENlbnRlciA9IFsgYXhpc0NvbmZpZy5tYXJnaW4ubGVmdCArIHJhZGl1cywgYXhpc0NvbmZpZy5tYXJnaW4udG9wICsgcmFkaXVzIF07XG4gICAgICAgICAgICB2YXIgZXh0ZW50O1xuICAgICAgICAgICAgaWYgKGlzU3RhY2tlZCkge1xuICAgICAgICAgICAgICAgIHZhciBoaWdoZXN0U3RhY2tlZFZhbHVlID0gZDMubWF4KMK1LnV0aWwuc3VtQXJyYXlzKMK1LnV0aWwuYXJyYXlMYXN0KGRhdGEpLnJbMF0sIMK1LnV0aWwuYXJyYXlMYXN0KGRhdGFZU3RhY2spKSk7XG4gICAgICAgICAgICAgICAgZXh0ZW50ID0gWyAwLCBoaWdoZXN0U3RhY2tlZFZhbHVlIF07XG4gICAgICAgICAgICB9IGVsc2UgZXh0ZW50ID0gZDMuZXh0ZW50KMK1LnV0aWwuZmxhdHRlbkFycmF5KGRhdGEubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5yO1xuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgICAgIGlmIChheGlzQ29uZmlnLnJhZGlhbEF4aXMuZG9tYWluICE9IMK1LkRBVEFFWFRFTlQpIGV4dGVudFswXSA9IDA7XG4gICAgICAgICAgICByYWRpYWxTY2FsZSA9IGQzLnNjYWxlLmxpbmVhcigpLmRvbWFpbihheGlzQ29uZmlnLnJhZGlhbEF4aXMuZG9tYWluICE9IMK1LkRBVEFFWFRFTlQgJiYgYXhpc0NvbmZpZy5yYWRpYWxBeGlzLmRvbWFpbiA/IGF4aXNDb25maWcucmFkaWFsQXhpcy5kb21haW4gOiBleHRlbnQpLnJhbmdlKFsgMCwgcmFkaXVzIF0pO1xuICAgICAgICAgICAgbGl2ZUNvbmZpZy5sYXlvdXQucmFkaWFsQXhpcy5kb21haW4gPSByYWRpYWxTY2FsZS5kb21haW4oKTtcbiAgICAgICAgICAgIHZhciBhbmd1bGFyRGF0YU1lcmdlZCA9IMK1LnV0aWwuZmxhdHRlbkFycmF5KGRhdGEubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC50O1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgdmFyIGlzT3JkaW5hbCA9IHR5cGVvZiBhbmd1bGFyRGF0YU1lcmdlZFswXSA9PT0gJ3N0cmluZyc7XG4gICAgICAgICAgICB2YXIgdGlja3M7XG4gICAgICAgICAgICBpZiAoaXNPcmRpbmFsKSB7XG4gICAgICAgICAgICAgICAgYW5ndWxhckRhdGFNZXJnZWQgPSDCtS51dGlsLmRlZHVwbGljYXRlKGFuZ3VsYXJEYXRhTWVyZ2VkKTtcbiAgICAgICAgICAgICAgICB0aWNrcyA9IGFuZ3VsYXJEYXRhTWVyZ2VkLnNsaWNlKCk7XG4gICAgICAgICAgICAgICAgYW5ndWxhckRhdGFNZXJnZWQgPSBkMy5yYW5nZShhbmd1bGFyRGF0YU1lcmdlZC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBkO1xuICAgICAgICAgICAgICAgICAgICBkLnQgPSBbIGFuZ3VsYXJEYXRhTWVyZ2VkIF07XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1N0YWNrZWQpIHJlc3VsdC55U3RhY2sgPSBkLnlTdGFjaztcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBoYXNPbmx5TGluZU9yRG90UGxvdCA9IGRhdGEuZmlsdGVyKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZC5nZW9tZXRyeSA9PT0gJ0xpbmVQbG90JyB8fCBkLmdlb21ldHJ5ID09PSAnRG90UGxvdCc7XG4gICAgICAgICAgICB9KS5sZW5ndGggPT09IGRhdGEubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIG5lZWRzRW5kU3BhY2luZyA9IGF4aXNDb25maWcubmVlZHNFbmRTcGFjaW5nID09PSBudWxsID8gaXNPcmRpbmFsIHx8ICFoYXNPbmx5TGluZU9yRG90UGxvdCA6IGF4aXNDb25maWcubmVlZHNFbmRTcGFjaW5nO1xuICAgICAgICAgICAgdmFyIHVzZVByb3ZpZGVkRG9tYWluID0gYXhpc0NvbmZpZy5hbmd1bGFyQXhpcy5kb21haW4gJiYgYXhpc0NvbmZpZy5hbmd1bGFyQXhpcy5kb21haW4gIT0gwrUuREFUQUVYVEVOVCAmJiAhaXNPcmRpbmFsICYmIGF4aXNDb25maWcuYW5ndWxhckF4aXMuZG9tYWluWzBdID49IDA7XG4gICAgICAgICAgICB2YXIgYW5ndWxhckRvbWFpbiA9IHVzZVByb3ZpZGVkRG9tYWluID8gYXhpc0NvbmZpZy5hbmd1bGFyQXhpcy5kb21haW4gOiBkMy5leHRlbnQoYW5ndWxhckRhdGFNZXJnZWQpO1xuICAgICAgICAgICAgdmFyIGFuZ3VsYXJEb21haW5TdGVwID0gTWF0aC5hYnMoYW5ndWxhckRhdGFNZXJnZWRbMV0gLSBhbmd1bGFyRGF0YU1lcmdlZFswXSk7XG4gICAgICAgICAgICBpZiAoaGFzT25seUxpbmVPckRvdFBsb3QgJiYgIWlzT3JkaW5hbCkgYW5ndWxhckRvbWFpblN0ZXAgPSAwO1xuICAgICAgICAgICAgdmFyIGFuZ3VsYXJEb21haW5XaXRoUGFkZGluZyA9IGFuZ3VsYXJEb21haW4uc2xpY2UoKTtcbiAgICAgICAgICAgIGlmIChuZWVkc0VuZFNwYWNpbmcgJiYgaXNPcmRpbmFsKSBhbmd1bGFyRG9tYWluV2l0aFBhZGRpbmdbMV0gKz0gYW5ndWxhckRvbWFpblN0ZXA7XG4gICAgICAgICAgICB2YXIgdGlja0NvdW50ID0gYXhpc0NvbmZpZy5hbmd1bGFyQXhpcy50aWNrc0NvdW50IHx8IDQ7XG4gICAgICAgICAgICBpZiAodGlja0NvdW50ID4gOCkgdGlja0NvdW50ID0gdGlja0NvdW50IC8gKHRpY2tDb3VudCAvIDgpICsgdGlja0NvdW50ICUgODtcbiAgICAgICAgICAgIGlmIChheGlzQ29uZmlnLmFuZ3VsYXJBeGlzLnRpY2tzU3RlcCkge1xuICAgICAgICAgICAgICAgIHRpY2tDb3VudCA9IChhbmd1bGFyRG9tYWluV2l0aFBhZGRpbmdbMV0gLSBhbmd1bGFyRG9tYWluV2l0aFBhZGRpbmdbMF0pIC8gdGlja0NvdW50O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFuZ3VsYXJUaWNrc1N0ZXAgPSBheGlzQ29uZmlnLmFuZ3VsYXJBeGlzLnRpY2tzU3RlcCB8fCAoYW5ndWxhckRvbWFpbldpdGhQYWRkaW5nWzFdIC0gYW5ndWxhckRvbWFpbldpdGhQYWRkaW5nWzBdKSAvICh0aWNrQ291bnQgKiAoYXhpc0NvbmZpZy5taW5vclRpY2tzICsgMSkpO1xuICAgICAgICAgICAgaWYgKHRpY2tzKSBhbmd1bGFyVGlja3NTdGVwID0gTWF0aC5tYXgoTWF0aC5yb3VuZChhbmd1bGFyVGlja3NTdGVwKSwgMSk7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXJEb21haW5XaXRoUGFkZGluZ1syXSkgYW5ndWxhckRvbWFpbldpdGhQYWRkaW5nWzJdID0gYW5ndWxhclRpY2tzU3RlcDtcbiAgICAgICAgICAgIHZhciBhbmd1bGFyQXhpc1JhbmdlID0gZDMucmFuZ2UuYXBwbHkodGhpcywgYW5ndWxhckRvbWFpbldpdGhQYWRkaW5nKTtcbiAgICAgICAgICAgIGFuZ3VsYXJBeGlzUmFuZ2UgPSBhbmd1bGFyQXhpc1JhbmdlLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoZC50b1ByZWNpc2lvbigxMikpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbmd1bGFyU2NhbGUgPSBkMy5zY2FsZS5saW5lYXIoKS5kb21haW4oYW5ndWxhckRvbWFpbldpdGhQYWRkaW5nLnNsaWNlKDAsIDIpKS5yYW5nZShheGlzQ29uZmlnLmRpcmVjdGlvbiA9PT0gJ2Nsb2Nrd2lzZScgPyBbIDAsIDM2MCBdIDogWyAzNjAsIDAgXSk7XG4gICAgICAgICAgICBsaXZlQ29uZmlnLmxheW91dC5hbmd1bGFyQXhpcy5kb21haW4gPSBhbmd1bGFyU2NhbGUuZG9tYWluKCk7XG4gICAgICAgICAgICBsaXZlQ29uZmlnLmxheW91dC5hbmd1bGFyQXhpcy5lbmRQYWRkaW5nID0gbmVlZHNFbmRTcGFjaW5nID8gYW5ndWxhckRvbWFpblN0ZXAgOiAwO1xuICAgICAgICAgICAgc3ZnID0gZDMuc2VsZWN0KHRoaXMpLnNlbGVjdCgnc3ZnLmNoYXJ0LXJvb3QnKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ZnID09PSAndW5kZWZpbmVkJyB8fCBzdmcuZW1wdHkoKSkge1xuICAgICAgICAgICAgICAgIHZhciBza2VsZXRvbiA9IFwiPHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIGNsYXNzPSdjaGFydC1yb290Jz4nICsgJzxnIGNsYXNzPSdvdXRlci1ncm91cCc+JyArICc8ZyBjbGFzcz0nY2hhcnQtZ3JvdXAnPicgKyAnPGNpcmNsZSBjbGFzcz0nYmFja2dyb3VuZC1jaXJjbGUnPjwvY2lyY2xlPicgKyAnPGcgY2xhc3M9J2dlb21ldHJ5LWdyb3VwJz48L2c+JyArICc8ZyBjbGFzcz0ncmFkaWFsIGF4aXMtZ3JvdXAnPicgKyAnPGNpcmNsZSBjbGFzcz0nb3V0c2lkZS1jaXJjbGUnPjwvY2lyY2xlPicgKyAnPC9nPicgKyAnPGcgY2xhc3M9J2FuZ3VsYXIgYXhpcy1ncm91cCc+PC9nPicgKyAnPGcgY2xhc3M9J2d1aWRlcy1ncm91cCc+PGxpbmU+PC9saW5lPjxjaXJjbGUgcj0nMCc+PC9jaXJjbGU+PC9nPicgKyAnPC9nPicgKyAnPGcgY2xhc3M9J2xlZ2VuZC1ncm91cCc+PC9nPicgKyAnPGcgY2xhc3M9J3Rvb2x0aXBzLWdyb3VwJz48L2c+JyArICc8ZyBjbGFzcz0ndGl0bGUtZ3JvdXAnPjx0ZXh0PjwvdGV4dD48L2c+JyArICc8L2c+JyArICc8L3N2Zz5cIjtcbiAgICAgICAgICAgICAgICB2YXIgZG9jID0gbmV3IERPTVBhcnNlcigpLnBhcnNlRnJvbVN0cmluZyhza2VsZXRvbiwgJ2FwcGxpY2F0aW9uL3htbCcpO1xuICAgICAgICAgICAgICAgIHZhciBuZXdTdmcgPSB0aGlzLmFwcGVuZENoaWxkKHRoaXMub3duZXJEb2N1bWVudC5pbXBvcnROb2RlKGRvYy5kb2N1bWVudEVsZW1lbnQsIHRydWUpKTtcbiAgICAgICAgICAgICAgICBzdmcgPSBkMy5zZWxlY3QobmV3U3ZnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN2Zy5zZWxlY3QoJy5ndWlkZXMtZ3JvdXAnKS5zdHlsZSh7XG4gICAgICAgICAgICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN2Zy5zZWxlY3QoJy5hbmd1bGFyLmF4aXMtZ3JvdXAnKS5zdHlsZSh7XG4gICAgICAgICAgICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN2Zy5zZWxlY3QoJy5yYWRpYWwuYXhpcy1ncm91cCcpLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAncG9pbnRlci1ldmVudHMnOiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGNoYXJ0R3JvdXAgPSBzdmcuc2VsZWN0KCcuY2hhcnQtZ3JvdXAnKTtcbiAgICAgICAgICAgIHZhciBsaW5lU3R5bGUgPSB7XG4gICAgICAgICAgICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogYXhpc0NvbmZpZy50aWNrQ29sb3JcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgZm9udFN0eWxlID0ge1xuICAgICAgICAgICAgICAgICdmb250LXNpemUnOiBheGlzQ29uZmlnLmZvbnQuc2l6ZSxcbiAgICAgICAgICAgICAgICAnZm9udC1mYW1pbHknOiBheGlzQ29uZmlnLmZvbnQuZmFtaWx5LFxuICAgICAgICAgICAgICAgIGZpbGw6IGF4aXNDb25maWcuZm9udC5jb2xvcixcbiAgICAgICAgICAgICAgICAndGV4dC1zaGFkb3cnOiBbICctMXB4IDBweCcsICcxcHggLTFweCcsICctMXB4IDFweCcsICcxcHggMXB4JyBdLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAnICcgKyBkICsgJyAwICcgKyBheGlzQ29uZmlnLmZvbnQub3V0bGluZUNvbG9yO1xuICAgICAgICAgICAgICAgIH0pLmpvaW4oJywnKVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHZhciBsZWdlbmRDb250YWluZXI7XG4gICAgICAgICAgICBpZiAoYXhpc0NvbmZpZy5zaG93TGVnZW5kKSB7XG4gICAgICAgICAgICAgICAgbGVnZW5kQ29udGFpbmVyID0gc3ZnLnNlbGVjdCgnLmxlZ2VuZC1ncm91cCcpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoJyArIFsgcmFkaXVzLCBheGlzQ29uZmlnLm1hcmdpbi50b3AgXSArICcpJ1xuICAgICAgICAgICAgICAgIH0pLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBlbGVtZW50cyA9IGRhdGEubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRhdHVtQ2xvbmUgPSDCtS51dGlsLmNsb25lSnNvbihkKTtcbiAgICAgICAgICAgICAgICAgICAgZGF0dW1DbG9uZS5zeW1ib2wgPSBkLmdlb21ldHJ5ID09PSAnRG90UGxvdCcgPyBkLmRvdFR5cGUgfHwgJ2NpcmNsZScgOiBkLmdlb21ldHJ5ICE9ICdMaW5lUGxvdCcgPyAnc3F1YXJlJyA6ICdsaW5lJztcbiAgICAgICAgICAgICAgICAgICAgZGF0dW1DbG9uZS52aXNpYmxlSW5MZWdlbmQgPSB0eXBlb2YgZC52aXNpYmxlSW5MZWdlbmQgPT09ICd1bmRlZmluZWQnIHx8IGQudmlzaWJsZUluTGVnZW5kO1xuICAgICAgICAgICAgICAgICAgICBkYXR1bUNsb25lLmNvbG9yID0gZC5nZW9tZXRyeSA9PT0gJ0xpbmVQbG90JyA/IGQuc3Ryb2tlQ29sb3IgOiBkLmNvbG9yO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZGF0dW1DbG9uZTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIMK1LkxlZ2VuZCgpLmNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgIGRhdGE6IGRhdGEubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBkLm5hbWUgfHwgJ0VsZW1lbnQnICsgaTtcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgIGxlZ2VuZENvbmZpZzogZXh0ZW5kRGVlcEFsbCh7fSxcbiAgICAgICAgICAgICAgICAgICAgICAgIMK1LkxlZ2VuZC5kZWZhdWx0Q29uZmlnKCkubGVnZW5kQ29uZmlnLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogbGVnZW5kQ29udGFpbmVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRzOiBlbGVtZW50cyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXZlcnNlT3JkZXI6IGF4aXNDb25maWcubGVnZW5kLnJldmVyc2VPcmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSkoKTtcblxuICAgICAgICAgICAgICAgIHZhciBsZWdlbmRCQm94ID0gbGVnZW5kQ29udGFpbmVyLm5vZGUoKS5nZXRCQm94KCk7XG4gICAgICAgICAgICAgICAgcmFkaXVzID0gTWF0aC5taW4oYXhpc0NvbmZpZy53aWR0aCAtIGxlZ2VuZEJCb3gud2lkdGggLSBheGlzQ29uZmlnLm1hcmdpbi5sZWZ0IC0gYXhpc0NvbmZpZy5tYXJnaW4ucmlnaHQsIGF4aXNDb25maWcuaGVpZ2h0IC0gYXhpc0NvbmZpZy5tYXJnaW4udG9wIC0gYXhpc0NvbmZpZy5tYXJnaW4uYm90dG9tKSAvIDI7XG4gICAgICAgICAgICAgICAgcmFkaXVzID0gTWF0aC5tYXgoMTAsIHJhZGl1cyk7XG4gICAgICAgICAgICAgICAgY2hhcnRDZW50ZXIgPSBbIGF4aXNDb25maWcubWFyZ2luLmxlZnQgKyByYWRpdXMsIGF4aXNDb25maWcubWFyZ2luLnRvcCArIHJhZGl1cyBdO1xuICAgICAgICAgICAgICAgIHJhZGlhbFNjYWxlLnJhbmdlKFsgMCwgcmFkaXVzIF0pO1xuICAgICAgICAgICAgICAgIGxpdmVDb25maWcubGF5b3V0LnJhZGlhbEF4aXMuZG9tYWluID0gcmFkaWFsU2NhbGUuZG9tYWluKCk7XG4gICAgICAgICAgICAgICAgbGVnZW5kQ29udGFpbmVyLmF0dHIoJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoJyArIFsgY2hhcnRDZW50ZXJbMF0gKyByYWRpdXMsIGNoYXJ0Q2VudGVyWzFdIC0gcmFkaXVzIF0gKyAnKScpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZWdlbmRDb250YWluZXIgPSBzdmcuc2VsZWN0KCcubGVnZW5kLWdyb3VwJykuc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiAnbm9uZSdcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHN2Zy5hdHRyKHtcbiAgICAgICAgICAgICAgICB3aWR0aDogYXhpc0NvbmZpZy53aWR0aCxcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGF4aXNDb25maWcuaGVpZ2h0XG4gICAgICAgICAgICB9KS5zdHlsZSh7XG4gICAgICAgICAgICAgICAgb3BhY2l0eTogYXhpc0NvbmZpZy5vcGFjaXR5XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNoYXJ0R3JvdXAuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgY2hhcnRDZW50ZXIgKyAnKScpLnN0eWxlKHtcbiAgICAgICAgICAgICAgICBjdXJzb3I6ICdjcm9zc2hhaXInXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBjZW50ZXJpbmdPZmZzZXQgPSBbIChheGlzQ29uZmlnLndpZHRoIC0gKGF4aXNDb25maWcubWFyZ2luLmxlZnQgKyBheGlzQ29uZmlnLm1hcmdpbi5yaWdodCArIHJhZGl1cyAqIDIgKyAobGVnZW5kQkJveCA/IGxlZ2VuZEJCb3gud2lkdGggOiAwKSkpIC8gMiwgKGF4aXNDb25maWcuaGVpZ2h0IC0gKGF4aXNDb25maWcubWFyZ2luLnRvcCArIGF4aXNDb25maWcubWFyZ2luLmJvdHRvbSArIHJhZGl1cyAqIDIpKSAvIDIgXTtcbiAgICAgICAgICAgIGNlbnRlcmluZ09mZnNldFswXSA9IE1hdGgubWF4KDAsIGNlbnRlcmluZ09mZnNldFswXSk7XG4gICAgICAgICAgICBjZW50ZXJpbmdPZmZzZXRbMV0gPSBNYXRoLm1heCgwLCBjZW50ZXJpbmdPZmZzZXRbMV0pO1xuICAgICAgICAgICAgc3ZnLnNlbGVjdCgnLm91dGVyLWdyb3VwJykuYXR0cigndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgnICsgY2VudGVyaW5nT2Zmc2V0ICsgJyknKTtcbiAgICAgICAgICAgIGlmIChheGlzQ29uZmlnLnRpdGxlICYmIGF4aXNDb25maWcudGl0bGUudGV4dCkge1xuICAgICAgICAgICAgICAgIHZhciB0aXRsZSA9IHN2Zy5zZWxlY3QoJ2cudGl0bGUtZ3JvdXAgdGV4dCcpLnN0eWxlKGZvbnRTdHlsZSkudGV4dChheGlzQ29uZmlnLnRpdGxlLnRleHQpO1xuICAgICAgICAgICAgICAgIHZhciB0aXRsZUJCb3ggPSB0aXRsZS5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICAgICAgICAgIHRpdGxlLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICB4OiBjaGFydENlbnRlclswXSAtIHRpdGxlQkJveC53aWR0aCAvIDIsXG4gICAgICAgICAgICAgICAgICAgIHk6IGNoYXJ0Q2VudGVyWzFdIC0gcmFkaXVzIC0gMjBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciByYWRpYWxBeGlzID0gc3ZnLnNlbGVjdCgnLnJhZGlhbC5heGlzLWdyb3VwJyk7XG4gICAgICAgICAgICBpZiAoYXhpc0NvbmZpZy5yYWRpYWxBeGlzLmdyaWRMaW5lc1Zpc2libGUpIHtcbiAgICAgICAgICAgICAgICB2YXIgZ3JpZENpcmNsZXMgPSByYWRpYWxBeGlzLnNlbGVjdEFsbCgnY2lyY2xlLmdyaWQtY2lyY2xlJykuZGF0YShyYWRpYWxTY2FsZS50aWNrcyg1KSk7XG4gICAgICAgICAgICAgICAgZ3JpZENpcmNsZXMuZW50ZXIoKS5hcHBlbmQoJ2NpcmNsZScpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAnY2xhc3MnOiAnZ3JpZC1jaXJjbGUnXG4gICAgICAgICAgICAgICAgfSkuc3R5bGUobGluZVN0eWxlKTtcbiAgICAgICAgICAgICAgICBncmlkQ2lyY2xlcy5hdHRyKCdyJywgcmFkaWFsU2NhbGUpO1xuICAgICAgICAgICAgICAgIGdyaWRDaXJjbGVzLmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJhZGlhbEF4aXMuc2VsZWN0KCdjaXJjbGUub3V0c2lkZS1jaXJjbGUnKS5hdHRyKHtcbiAgICAgICAgICAgICAgICByOiByYWRpdXNcbiAgICAgICAgICAgIH0pLnN0eWxlKGxpbmVTdHlsZSk7XG4gICAgICAgICAgICB2YXIgYmFja2dyb3VuZENpcmNsZSA9IHN2Zy5zZWxlY3QoJ2NpcmNsZS5iYWNrZ3JvdW5kLWNpcmNsZScpLmF0dHIoe1xuICAgICAgICAgICAgICAgIHI6IHJhZGl1c1xuICAgICAgICAgICAgfSkuc3R5bGUoe1xuICAgICAgICAgICAgICAgIGZpbGw6IGF4aXNDb25maWcuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICAgICAgICAgIHN0cm9rZTogYXhpc0NvbmZpZy5zdHJva2VcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZnVuY3Rpb24gY3VycmVudEFuZ2xlKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhclNjYWxlKGQpICUgMzYwICsgYXhpc0NvbmZpZy5vcmllbnRhdGlvbjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChheGlzQ29uZmlnLnJhZGlhbEF4aXMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIHZhciBheGlzID0gZDMuc3ZnLmF4aXMoKS5zY2FsZShyYWRpYWxTY2FsZSkudGlja3MoNSkudGlja1NpemUoNSk7XG4gICAgICAgICAgICAgICAgcmFkaWFsQXhpcy5jYWxsKGF4aXMpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICdyb3RhdGUoJyArIGF4aXNDb25maWcucmFkaWFsQXhpcy5vcmllbnRhdGlvbiArICcpJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJhZGlhbEF4aXMuc2VsZWN0QWxsKCcuZG9tYWluJykuc3R5bGUobGluZVN0eWxlKTtcbiAgICAgICAgICAgICAgICByYWRpYWxBeGlzLnNlbGVjdEFsbCgnZz50ZXh0JykudGV4dChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHRDb250ZW50ICsgYXhpc0NvbmZpZy5yYWRpYWxBeGlzLnRpY2tzU3VmZml4O1xuICAgICAgICAgICAgICAgIH0pLnN0eWxlKGZvbnRTdHlsZSkuc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnc3RhcnQnXG4gICAgICAgICAgICAgICAgfSkuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgIHg6IDAsXG4gICAgICAgICAgICAgICAgICAgIHk6IDAsXG4gICAgICAgICAgICAgICAgICAgIGR4OiAwLFxuICAgICAgICAgICAgICAgICAgICBkeTogMCxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoYXhpc0NvbmZpZy5yYWRpYWxBeGlzLnRpY2tPcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdyb3RhdGUoJyArIC1heGlzQ29uZmlnLnJhZGlhbEF4aXMub3JpZW50YXRpb24gKyAnKSB0cmFuc2xhdGUoJyArIFsgMCwgZm9udFN0eWxlWydmb250LXNpemUnXSBdICsgJyknO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiAndHJhbnNsYXRlKCcgKyBbIDAsIGZvbnRTdHlsZVsnZm9udC1zaXplJ10gXSArICcpJztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJhZGlhbEF4aXMuc2VsZWN0QWxsKCdnPmxpbmUnKS5zdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgIHN0cm9rZTogJ2JsYWNrJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFuZ3VsYXJBeGlzID0gc3ZnLnNlbGVjdCgnLmFuZ3VsYXIuYXhpcy1ncm91cCcpLnNlbGVjdEFsbCgnZy5hbmd1bGFyLXRpY2snKS5kYXRhKGFuZ3VsYXJBeGlzUmFuZ2UpO1xuICAgICAgICAgICAgdmFyIGFuZ3VsYXJBeGlzRW50ZXIgPSBhbmd1bGFyQXhpcy5lbnRlcigpLmFwcGVuZCgnZycpLmNsYXNzZWQoJ2FuZ3VsYXItdGljaycsIHRydWUpO1xuICAgICAgICAgICAgYW5ndWxhckF4aXMuYXR0cih7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAncm90YXRlKCcgKyBjdXJyZW50QW5nbGUoZCwgaSkgKyAnKSc7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3R5bGUoe1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGF4aXNDb25maWcuYW5ndWxhckF4aXMudmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW5ndWxhckF4aXMuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgYW5ndWxhckF4aXNFbnRlci5hcHBlbmQoJ2xpbmUnKS5jbGFzc2VkKCdncmlkLWxpbmUnLCB0cnVlKS5jbGFzc2VkKCdtYWpvcicsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaSAlIChheGlzQ29uZmlnLm1pbm9yVGlja3MgKyAxKSA9PSAwO1xuICAgICAgICAgICAgfSkuY2xhc3NlZCgnbWlub3InLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICEoaSAlIChheGlzQ29uZmlnLm1pbm9yVGlja3MgKyAxKSA9PSAwKTtcbiAgICAgICAgICAgIH0pLnN0eWxlKGxpbmVTdHlsZSk7XG4gICAgICAgICAgICBhbmd1bGFyQXhpc0VudGVyLnNlbGVjdEFsbCgnLm1pbm9yJykuc3R5bGUoe1xuICAgICAgICAgICAgICAgIHN0cm9rZTogYXhpc0NvbmZpZy5taW5vclRpY2tDb2xvclxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBhbmd1bGFyQXhpcy5zZWxlY3QoJ2xpbmUuZ3JpZC1saW5lJykuYXR0cih7XG4gICAgICAgICAgICAgICAgeDE6IGF4aXNDb25maWcudGlja0xlbmd0aCA/IHJhZGl1cyAtIGF4aXNDb25maWcudGlja0xlbmd0aCA6IDAsXG4gICAgICAgICAgICAgICAgeDI6IHJhZGl1c1xuICAgICAgICAgICAgfSkuc3R5bGUoe1xuICAgICAgICAgICAgICAgIGRpc3BsYXk6IGF4aXNDb25maWcuYW5ndWxhckF4aXMuZ3JpZExpbmVzVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYW5ndWxhckF4aXNFbnRlci5hcHBlbmQoJ3RleHQnKS5jbGFzc2VkKCdheGlzLXRleHQnLCB0cnVlKS5zdHlsZShmb250U3R5bGUpO1xuICAgICAgICAgICAgdmFyIHRpY2tzVGV4dCA9IGFuZ3VsYXJBeGlzLnNlbGVjdCgndGV4dC5heGlzLXRleHQnKS5hdHRyKHtcbiAgICAgICAgICAgICAgICB4OiByYWRpdXMgKyBheGlzQ29uZmlnLmxhYmVsT2Zmc2V0LFxuICAgICAgICAgICAgICAgIGR5OiBNSURfU0hJRlQgKyAnZW0nLFxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgYW5nbGUgPSBjdXJyZW50QW5nbGUoZCwgaSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciByYWQgPSByYWRpdXMgKyBheGlzQ29uZmlnLmxhYmVsT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICB2YXIgb3JpZW50ID0gYXhpc0NvbmZpZy5hbmd1bGFyQXhpcy50aWNrT3JpZW50YXRpb247XG4gICAgICAgICAgICAgICAgICAgIGlmIChvcmllbnQgPT0gJ2hvcml6b250YWwnKSByZXR1cm4gJ3JvdGF0ZSgnICsgLWFuZ2xlICsgJyAnICsgcmFkICsgJyAwKSc7IGVsc2UgaWYgKG9yaWVudCA9PSAncmFkaWFsJykgcmV0dXJuIGFuZ2xlIDwgMjcwICYmIGFuZ2xlID4gOTAgPyAncm90YXRlKDE4MCAnICsgcmFkICsgJyAwKScgOiBudWxsOyBlbHNlIHJldHVybiAncm90YXRlKCcgKyAoYW5nbGUgPD0gMTgwICYmIGFuZ2xlID4gMCA/IC05MCA6IDkwKSArICcgJyArIHJhZCArICcgMCknO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAndGV4dC1hbmNob3InOiAnbWlkZGxlJyxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBheGlzQ29uZmlnLmFuZ3VsYXJBeGlzLmxhYmVsc1Zpc2libGUgPyAnYmxvY2snIDogJ25vbmUnXG4gICAgICAgICAgICB9KS50ZXh0KGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSAlIChheGlzQ29uZmlnLm1pbm9yVGlja3MgKyAxKSAhPSAwKSByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgaWYgKHRpY2tzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aWNrc1tkXSArIGF4aXNDb25maWcuYW5ndWxhckF4aXMudGlja3NTdWZmaXg7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHJldHVybiBkICsgYXhpc0NvbmZpZy5hbmd1bGFyQXhpcy50aWNrc1N1ZmZpeDtcbiAgICAgICAgICAgIH0pLnN0eWxlKGZvbnRTdHlsZSk7XG4gICAgICAgICAgICBpZiAoYXhpc0NvbmZpZy5hbmd1bGFyQXhpcy5yZXdyaXRlVGlja3MpIHRpY2tzVGV4dC50ZXh0KGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaSAlIChheGlzQ29uZmlnLm1pbm9yVGlja3MgKyAxKSAhPSAwKSByZXR1cm4gJyc7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGF4aXNDb25maWcuYW5ndWxhckF4aXMucmV3cml0ZVRpY2tzKHRoaXMudGV4dENvbnRlbnQsIGkpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgcmlnaHRtb3N0VGlja0VuZFggPSBkMy5tYXgoY2hhcnRHcm91cC5zZWxlY3RBbGwoJy5hbmd1bGFyLXRpY2sgdGV4dCcpWzBdLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGQuZ2V0Q1RNKCkuZSArIGQuZ2V0QkJveCgpLndpZHRoO1xuICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgbGVnZW5kQ29udGFpbmVyLmF0dHIoe1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgWyByYWRpdXMgKyByaWdodG1vc3RUaWNrRW5kWCwgYXhpc0NvbmZpZy5tYXJnaW4udG9wIF0gKyAnKSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGhhc0dlb21ldHJ5ID0gc3ZnLnNlbGVjdCgnZy5nZW9tZXRyeS1ncm91cCcpLnNlbGVjdEFsbCgnZycpLnNpemUoKSA+IDA7XG4gICAgICAgICAgICB2YXIgZ2VvbWV0cnlDb250YWluZXIgPSBzdmcuc2VsZWN0KCdnLmdlb21ldHJ5LWdyb3VwJykuc2VsZWN0QWxsKCdnLmdlb21ldHJ5JykuZGF0YShkYXRhKTtcbiAgICAgICAgICAgIGdlb21ldHJ5Q29udGFpbmVyLmVudGVyKCkuYXBwZW5kKCdnJykuYXR0cih7XG4gICAgICAgICAgICAgICAgJ2NsYXNzJzogZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ2dlb21ldHJ5IGdlb21ldHJ5JyArIGk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBnZW9tZXRyeUNvbnRhaW5lci5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgICAgICBpZiAoZGF0YVswXSB8fCBoYXNHZW9tZXRyeSkge1xuICAgICAgICAgICAgICAgIHZhciBnZW9tZXRyeUNvbmZpZ3MgPSBbXTtcbiAgICAgICAgICAgICAgICBkYXRhLmZvckVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZ2VvbWV0cnlDb25maWcgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlDb25maWcucmFkaWFsU2NhbGUgPSByYWRpYWxTY2FsZTtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlDb25maWcuYW5ndWxhclNjYWxlID0gYW5ndWxhclNjYWxlO1xuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeUNvbmZpZy5jb250YWluZXIgPSBnZW9tZXRyeUNvbnRhaW5lci5maWx0ZXIoZnVuY3Rpb24oZEIsIGlCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaUIgPT0gaTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIGdlb21ldHJ5Q29uZmlnLmdlb21ldHJ5ID0gZC5nZW9tZXRyeTtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlDb25maWcub3JpZW50YXRpb24gPSBheGlzQ29uZmlnLm9yaWVudGF0aW9uO1xuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeUNvbmZpZy5kaXJlY3Rpb24gPSBheGlzQ29uZmlnLmRpcmVjdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlDb25maWcuaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeUNvbmZpZ3MucHVzaCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlDb25maWc6IGdlb21ldHJ5Q29uZmlnXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHZhciBnZW9tZXRyeUNvbmZpZ3NHcm91cGVkID0gZDMubmVzdCgpLmtleShmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2YgZC5kYXRhLmdyb3VwSWQgIT0gJ3VuZGVmaW5lZCcgfHwgJ3Vuc3RhY2tlZCc7XG4gICAgICAgICAgICAgICAgfSkuZW50cmllcyhnZW9tZXRyeUNvbmZpZ3MpO1xuICAgICAgICAgICAgICAgIHZhciBnZW9tZXRyeUNvbmZpZ3NHcm91cGVkMiA9IFtdO1xuICAgICAgICAgICAgICAgIGdlb21ldHJ5Q29uZmlnc0dyb3VwZWQuZm9yRWFjaChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkLmtleSA9PT0gJ3Vuc3RhY2tlZCcpIGdlb21ldHJ5Q29uZmlnc0dyb3VwZWQyID0gZ2VvbWV0cnlDb25maWdzR3JvdXBlZDIuY29uY2F0KGQudmFsdWVzLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gWyBkIF07XG4gICAgICAgICAgICAgICAgICAgIH0pKTsgZWxzZSBnZW9tZXRyeUNvbmZpZ3NHcm91cGVkMi5wdXNoKGQudmFsdWVzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBnZW9tZXRyeUNvbmZpZ3NHcm91cGVkMi5mb3JFYWNoKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGdlb21ldHJ5O1xuICAgICAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkKSkgZ2VvbWV0cnkgPSBkWzBdLmdlb21ldHJ5Q29uZmlnLmdlb21ldHJ5OyBlbHNlIGdlb21ldHJ5ID0gZC5nZW9tZXRyeUNvbmZpZy5nZW9tZXRyeTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpbmFsR2VvbWV0cnlDb25maWcgPSBkLm1hcChmdW5jdGlvbihkQiwgaUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBleHRlbmREZWVwQWxsKMK1W2dlb21ldHJ5XS5kZWZhdWx0Q29uZmlnKCksIGRCKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIMK1W2dlb21ldHJ5XSgpLmNvbmZpZyhmaW5hbEdlb21ldHJ5Q29uZmlnKSgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGd1aWRlcyA9IHN2Zy5zZWxlY3QoJy5ndWlkZXMtZ3JvdXAnKTtcbiAgICAgICAgICAgIHZhciB0b29sdGlwQ29udGFpbmVyID0gc3ZnLnNlbGVjdCgnLnRvb2x0aXBzLWdyb3VwJyk7XG4gICAgICAgICAgICB2YXIgYW5ndWxhclRvb2x0aXAgPSDCtS50b29sdGlwUGFuZWwoKS5jb25maWcoe1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lcjogdG9vbHRpcENvbnRhaW5lcixcbiAgICAgICAgICAgICAgICBmb250U2l6ZTogOFxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIHZhciByYWRpYWxUb29sdGlwID0gwrUudG9vbHRpcFBhbmVsKCkuY29uZmlnKHtcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IHRvb2x0aXBDb250YWluZXIsXG4gICAgICAgICAgICAgICAgZm9udFNpemU6IDhcbiAgICAgICAgICAgIH0pKCk7XG4gICAgICAgICAgICB2YXIgZ2VvbWV0cnlUb29sdGlwID0gwrUudG9vbHRpcFBhbmVsKCkuY29uZmlnKHtcbiAgICAgICAgICAgICAgICBjb250YWluZXI6IHRvb2x0aXBDb250YWluZXIsXG4gICAgICAgICAgICAgICAgaGFzVGljazogdHJ1ZVxuICAgICAgICAgICAgfSkoKTtcbiAgICAgICAgICAgIHZhciBhbmd1bGFyVmFsdWUsIHJhZGlhbFZhbHVlO1xuICAgICAgICAgICAgaWYgKCFpc09yZGluYWwpIHtcbiAgICAgICAgICAgICAgICB2YXIgYW5ndWxhckd1aWRlTGluZSA9IGd1aWRlcy5zZWxlY3QoJ2xpbmUnKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgeDE6IDAsXG4gICAgICAgICAgICAgICAgICAgIHkxOiAwLFxuICAgICAgICAgICAgICAgICAgICB5MjogMFxuICAgICAgICAgICAgICAgIH0pLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiAnZ3JleScsXG4gICAgICAgICAgICAgICAgICAgICdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNoYXJ0R3JvdXAub24oJ21vdXNlbW92ZS5hbmd1bGFyLWd1aWRlJywgZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbW91c2VBbmdsZSA9IMK1LnV0aWwuZ2V0TW91c2VQb3MoYmFja2dyb3VuZENpcmNsZSkuYW5nbGU7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXJHdWlkZUxpbmUuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICAgICB4MjogLXJhZGl1cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3JvdGF0ZSgnICsgbW91c2VBbmdsZSArICcpJ1xuICAgICAgICAgICAgICAgICAgICB9KS5zdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAuNVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFuZ2xlV2l0aE9yaWdpbk9mZnNldCA9IChtb3VzZUFuZ2xlICsgMTgwICsgMzYwIC0gYXhpc0NvbmZpZy5vcmllbnRhdGlvbikgJSAzNjA7XG4gICAgICAgICAgICAgICAgICAgIGFuZ3VsYXJWYWx1ZSA9IGFuZ3VsYXJTY2FsZS5pbnZlcnQoYW5nbGVXaXRoT3JpZ2luT2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IMK1LnV0aWwuY29udmVydFRvQ2FydGVzaWFuKHJhZGl1cyArIDEyLCBtb3VzZUFuZ2xlICsgMTgwKTtcbiAgICAgICAgICAgICAgICAgICAgYW5ndWxhclRvb2x0aXAudGV4dCjCtS51dGlsLnJvdW5kKGFuZ3VsYXJWYWx1ZSkpLm1vdmUoWyBwb3NbMF0gKyBjaGFydENlbnRlclswXSwgcG9zWzFdICsgY2hhcnRDZW50ZXJbMV0gXSk7XG4gICAgICAgICAgICAgICAgfSkub24oJ21vdXNlb3V0LmFuZ3VsYXItZ3VpZGUnLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIGd1aWRlcy5zZWxlY3QoJ2xpbmUnKS5zdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGFuZ3VsYXJHdWlkZUNpcmNsZSA9IGd1aWRlcy5zZWxlY3QoJ2NpcmNsZScpLnN0eWxlKHtcbiAgICAgICAgICAgICAgICBzdHJva2U6ICdncmV5JyxcbiAgICAgICAgICAgICAgICBmaWxsOiAnbm9uZSdcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgY2hhcnRHcm91cC5vbignbW91c2Vtb3ZlLnJhZGlhbC1ndWlkZScsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgciA9IMK1LnV0aWwuZ2V0TW91c2VQb3MoYmFja2dyb3VuZENpcmNsZSkucmFkaXVzO1xuICAgICAgICAgICAgICAgIGFuZ3VsYXJHdWlkZUNpcmNsZS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgcjogclxuICAgICAgICAgICAgICAgIH0pLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogLjVcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByYWRpYWxWYWx1ZSA9IHJhZGlhbFNjYWxlLmludmVydCjCtS51dGlsLmdldE1vdXNlUG9zKGJhY2tncm91bmRDaXJjbGUpLnJhZGl1cyk7XG4gICAgICAgICAgICAgICAgdmFyIHBvcyA9IMK1LnV0aWwuY29udmVydFRvQ2FydGVzaWFuKHIsIGF4aXNDb25maWcucmFkaWFsQXhpcy5vcmllbnRhdGlvbik7XG4gICAgICAgICAgICAgICAgcmFkaWFsVG9vbHRpcC50ZXh0KMK1LnV0aWwucm91bmQocmFkaWFsVmFsdWUpKS5tb3ZlKFsgcG9zWzBdICsgY2hhcnRDZW50ZXJbMF0sIHBvc1sxXSArIGNoYXJ0Q2VudGVyWzFdIF0pO1xuICAgICAgICAgICAgfSkub24oJ21vdXNlb3V0LnJhZGlhbC1ndWlkZScsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBhbmd1bGFyR3VpZGVDaXJjbGUuc3R5bGUoe1xuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZ2VvbWV0cnlUb29sdGlwLmhpZGUoKTtcbiAgICAgICAgICAgICAgICBhbmd1bGFyVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgICAgICAgICAgcmFkaWFsVG9vbHRpcC5oaWRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHN2Zy5zZWxlY3RBbGwoJy5nZW9tZXRyeS1ncm91cCAubWFyaycpLm9uKCdtb3VzZW92ZXIudG9vbHRpcCcsIGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGNvbG9yID0gdGhpcy5zdHlsZS5maWxsO1xuICAgICAgICAgICAgICAgIHZhciBuZXdDb2xvciA9ICdibGFjayc7XG4gICAgICAgICAgICAgICAgdmFyIG9wYWNpdHkgPSB0aGlzLnN0eWxlLm9wYWNpdHkgfHwgMTtcbiAgICAgICAgICAgICAgICBlbC5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ2RhdGEtb3BhY2l0eSc6IG9wYWNpdHlcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoY29sb3IgJiYgY29sb3IgIT09ICdub25lJykge1xuICAgICAgICAgICAgICAgICAgICBlbC5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICdkYXRhLWZpbGwnOiBjb2xvclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgbmV3Q29sb3IgPSBkMy5oc2woY29sb3IpLmRhcmtlcigpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgIGVsLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGw6IG5ld0NvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRleHREYXRhID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdDogwrUudXRpbC5yb3VuZChkWzBdKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHI6IMK1LnV0aWwucm91bmQoZFsxXSlcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT3JkaW5hbCkgdGV4dERhdGEudCA9IHRpY2tzW2RbMF1dO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9ICd0OiAnICsgdGV4dERhdGEudCArICcsIHI6ICcgKyB0ZXh0RGF0YS5yO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYmJveCA9IHRoaXMuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzdmdCQm94ID0gc3ZnLm5vZGUoKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcyA9IFsgYmJveC5sZWZ0ICsgYmJveC53aWR0aCAvIDIgLSBjZW50ZXJpbmdPZmZzZXRbMF0gLSBzdmdCQm94LmxlZnQsIGJib3gudG9wICsgYmJveC5oZWlnaHQgLyAyIC0gY2VudGVyaW5nT2Zmc2V0WzFdIC0gc3ZnQkJveC50b3AgXTtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlUb29sdGlwLmNvbmZpZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb2xvcjogbmV3Q29sb3JcbiAgICAgICAgICAgICAgICAgICAgfSkudGV4dCh0ZXh0KTtcbiAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnlUb29sdGlwLm1vdmUocG9zKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBjb2xvciA9IHRoaXMuc3R5bGUuc3Ryb2tlIHx8ICdibGFjayc7XG4gICAgICAgICAgICAgICAgICAgIGVsLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2RhdGEtc3Ryb2tlJzogY29sb3JcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIG5ld0NvbG9yID0gZDMuaHNsKGNvbG9yKS5kYXJrZXIoKS50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHJva2U6IG5ld0NvbG9yLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5vbignbW91c2Vtb3ZlLnRvb2x0aXAnLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGQzLmV2ZW50LndoaWNoICE9IDApIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICBpZiAoZDMuc2VsZWN0KHRoaXMpLmF0dHIoJ2RhdGEtZmlsbCcpKSBnZW9tZXRyeVRvb2x0aXAuc2hvdygpO1xuICAgICAgICAgICAgfSkub24oJ21vdXNlb3V0LnRvb2x0aXAnLCBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgZ2VvbWV0cnlUb29sdGlwLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB2YXIgZWwgPSBkMy5zZWxlY3QodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIGZpbGxDb2xvciA9IGVsLmF0dHIoJ2RhdGEtZmlsbCcpO1xuICAgICAgICAgICAgICAgIGlmIChmaWxsQ29sb3IpIGVsLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogZmlsbENvbG9yLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBlbC5hdHRyKCdkYXRhLW9wYWNpdHknKVxuICAgICAgICAgICAgICAgIH0pOyBlbHNlIGVsLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiBlbC5hdHRyKCdkYXRhLXN0cm9rZScpLFxuICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiBlbC5hdHRyKCdkYXRhLW9wYWNpdHknKVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZXhwb3J0cztcbiAgICB9XG4gICAgZXhwb3J0cy5yZW5kZXIgPSBmdW5jdGlvbihfY29udGFpbmVyKSB7XG4gICAgICAgIHJlbmRlcihfY29udGFpbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBleHBvcnRzLmNvbmZpZyA9IGZ1bmN0aW9uKF94KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgdmFyIHhDbG9uZSA9IMK1LnV0aWwuY2xvbmVKc29uKF94KTtcbiAgICAgICAgeENsb25lLmRhdGEuZm9yRWFjaChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICBpZiAoIWNvbmZpZy5kYXRhW2ldKSBjb25maWcuZGF0YVtpXSA9IHt9O1xuICAgICAgICAgICAgZXh0ZW5kRGVlcEFsbChjb25maWcuZGF0YVtpXSwgwrUuQXhpcy5kZWZhdWx0Q29uZmlnKCkuZGF0YVswXSk7XG4gICAgICAgICAgICBleHRlbmREZWVwQWxsKGNvbmZpZy5kYXRhW2ldLCBkKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGV4dGVuZERlZXBBbGwoY29uZmlnLmxheW91dCwgwrUuQXhpcy5kZWZhdWx0Q29uZmlnKCkubGF5b3V0KTtcbiAgICAgICAgZXh0ZW5kRGVlcEFsbChjb25maWcubGF5b3V0LCB4Q2xvbmUubGF5b3V0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBleHBvcnRzLmdldExpdmVDb25maWcgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGxpdmVDb25maWc7XG4gICAgfTtcbiAgICBleHBvcnRzLmdldGlucHV0Q29uZmlnID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBpbnB1dENvbmZpZztcbiAgICB9O1xuICAgIGV4cG9ydHMucmFkaWFsU2NhbGUgPSBmdW5jdGlvbihfeCkge1xuICAgICAgICByZXR1cm4gcmFkaWFsU2NhbGU7XG4gICAgfTtcbiAgICBleHBvcnRzLmFuZ3VsYXJTY2FsZSA9IGZ1bmN0aW9uKF94KSB7XG4gICAgICAgIHJldHVybiBhbmd1bGFyU2NhbGU7XG4gICAgfTtcbiAgICBleHBvcnRzLnN2ZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gc3ZnO1xuICAgIH07XG4gICAgZDMucmViaW5kKGV4cG9ydHMsIGRpc3BhdGNoLCAnb24nKTtcbiAgICByZXR1cm4gZXhwb3J0cztcbn07XG5cbsK1LkF4aXMuZGVmYXVsdENvbmZpZyA9IGZ1bmN0aW9uKGQsIGkpIHtcbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICBkYXRhOiBbIHtcbiAgICAgICAgICAgIHQ6IFsgMSwgMiwgMywgNCBdLFxuICAgICAgICAgICAgcjogWyAxMCwgMTEsIDEyLCAxMyBdLFxuICAgICAgICAgICAgbmFtZTogJ0xpbmUxJyxcbiAgICAgICAgICAgIGdlb21ldHJ5OiAnTGluZVBsb3QnLFxuICAgICAgICAgICAgY29sb3I6IG51bGwsXG4gICAgICAgICAgICBzdHJva2VEYXNoOiAnc29saWQnLFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IG51bGwsXG4gICAgICAgICAgICBzdHJva2VTaXplOiAnMScsXG4gICAgICAgICAgICB2aXNpYmxlSW5MZWdlbmQ6IHRydWUsXG4gICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgIH0gXSxcbiAgICAgICAgbGF5b3V0OiB7XG4gICAgICAgICAgICBkZWZhdWx0Q29sb3JSYW5nZTogZDMuc2NhbGUuY2F0ZWdvcnkxMCgpLnJhbmdlKCksXG4gICAgICAgICAgICB0aXRsZTogbnVsbCxcbiAgICAgICAgICAgIGhlaWdodDogNDUwLFxuICAgICAgICAgICAgd2lkdGg6IDUwMCxcbiAgICAgICAgICAgIG1hcmdpbjoge1xuICAgICAgICAgICAgICAgIHRvcDogNDAsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IDQwLFxuICAgICAgICAgICAgICAgIGJvdHRvbTogNDAsXG4gICAgICAgICAgICAgICAgbGVmdDogNDBcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBmb250OiB7XG4gICAgICAgICAgICAgICAgc2l6ZTogMTIsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdncmF5JyxcbiAgICAgICAgICAgICAgICBvdXRsaW5lQ29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICAgICAgZmFtaWx5OiAnVGFob21hLCBzYW5zLXNlcmlmJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGRpcmVjdGlvbjogJ2Nsb2Nrd2lzZScsXG4gICAgICAgICAgICBvcmllbnRhdGlvbjogMCxcbiAgICAgICAgICAgIGxhYmVsT2Zmc2V0OiAxMCxcbiAgICAgICAgICAgIHJhZGlhbEF4aXM6IHtcbiAgICAgICAgICAgICAgICBkb21haW46IG51bGwsXG4gICAgICAgICAgICAgICAgb3JpZW50YXRpb246IC00NSxcbiAgICAgICAgICAgICAgICB0aWNrc1N1ZmZpeDogJycsXG4gICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBncmlkTGluZXNWaXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIHRpY2tPcmllbnRhdGlvbjogJ2hvcml6b250YWwnLFxuICAgICAgICAgICAgICAgIHJld3JpdGVUaWNrczogbnVsbFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFuZ3VsYXJBeGlzOiB7XG4gICAgICAgICAgICAgICAgZG9tYWluOiBbIDAsIDM2MCBdLFxuICAgICAgICAgICAgICAgIHRpY2tzU3VmZml4OiAnJyxcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGdyaWRMaW5lc1Zpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgbGFiZWxzVmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0aWNrT3JpZW50YXRpb246ICdob3Jpem9udGFsJyxcbiAgICAgICAgICAgICAgICByZXdyaXRlVGlja3M6IG51bGwsXG4gICAgICAgICAgICAgICAgdGlja3NDb3VudDogbnVsbCxcbiAgICAgICAgICAgICAgICB0aWNrc1N0ZXA6IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtaW5vclRpY2tzOiAwLFxuICAgICAgICAgICAgdGlja0xlbmd0aDogbnVsbCxcbiAgICAgICAgICAgIHRpY2tDb2xvcjogJ3NpbHZlcicsXG4gICAgICAgICAgICBtaW5vclRpY2tDb2xvcjogJyNlZWUnLFxuICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnbm9uZScsXG4gICAgICAgICAgICBuZWVkc0VuZFNwYWNpbmc6IG51bGwsXG4gICAgICAgICAgICBzaG93TGVnZW5kOiB0cnVlLFxuICAgICAgICAgICAgbGVnZW5kOiB7XG4gICAgICAgICAgICAgICAgcmV2ZXJzZU9yZGVyOiBmYWxzZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIGNvbmZpZztcbn07XG5cbsK1LnV0aWwgPSB7fTtcblxuwrUuREFUQUVYVEVOVCA9ICdkYXRhRXh0ZW50JztcblxuwrUuQVJFQSA9ICdBcmVhQ2hhcnQnO1xuXG7CtS5MSU5FID0gJ0xpbmVQbG90JztcblxuwrUuRE9UID0gJ0RvdFBsb3QnO1xuXG7CtS5CQVIgPSAnQmFyQ2hhcnQnO1xuXG7CtS51dGlsLl9vdmVycmlkZSA9IGZ1bmN0aW9uKF9vYmpBLCBfb2JqQikge1xuICAgIGZvciAodmFyIHggaW4gX29iakEpIGlmICh4IGluIF9vYmpCKSBfb2JqQlt4XSA9IF9vYmpBW3hdO1xufTtcblxuwrUudXRpbC5fZXh0ZW5kID0gZnVuY3Rpb24oX29iakEsIF9vYmpCKSB7XG4gICAgZm9yICh2YXIgeCBpbiBfb2JqQSkgX29iakJbeF0gPSBfb2JqQVt4XTtcbn07XG5cbsK1LnV0aWwuX3JuZFNuZCA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBNYXRoLnJhbmRvbSgpICogMiAtIDEgKyAoTWF0aC5yYW5kb20oKSAqIDIgLSAxKSArIChNYXRoLnJhbmRvbSgpICogMiAtIDEpO1xufTtcblxuwrUudXRpbC5kYXRhRnJvbUVxdWF0aW9uMiA9IGZ1bmN0aW9uKF9lcXVhdGlvbiwgX3N0ZXApIHtcbiAgICB2YXIgc3RlcCA9IF9zdGVwIHx8IDY7XG4gICAgdmFyIGRhdGEgPSBkMy5yYW5nZSgwLCAzNjAgKyBzdGVwLCBzdGVwKS5tYXAoZnVuY3Rpb24oZGVnLCBpbmRleCkge1xuICAgICAgICB2YXIgdGhldGEgPSBkZWcgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICB2YXIgcmFkaXVzID0gX2VxdWF0aW9uKHRoZXRhKTtcbiAgICAgICAgcmV0dXJuIFsgZGVnLCByYWRpdXMgXTtcbiAgICB9KTtcbiAgICByZXR1cm4gZGF0YTtcbn07XG5cbsK1LnV0aWwuZGF0YUZyb21FcXVhdGlvbiA9IGZ1bmN0aW9uKF9lcXVhdGlvbiwgX3N0ZXAsIF9uYW1lKSB7XG4gICAgdmFyIHN0ZXAgPSBfc3RlcCB8fCA2O1xuICAgIHZhciB0ID0gW10sIHIgPSBbXTtcbiAgICBkMy5yYW5nZSgwLCAzNjAgKyBzdGVwLCBzdGVwKS5mb3JFYWNoKGZ1bmN0aW9uKGRlZywgaW5kZXgpIHtcbiAgICAgICAgdmFyIHRoZXRhID0gZGVnICogTWF0aC5QSSAvIDE4MDtcbiAgICAgICAgdmFyIHJhZGl1cyA9IF9lcXVhdGlvbih0aGV0YSk7XG4gICAgICAgIHQucHVzaChkZWcpO1xuICAgICAgICByLnB1c2gocmFkaXVzKTtcbiAgICB9KTtcbiAgICB2YXIgcmVzdWx0ID0ge1xuICAgICAgICB0OiB0LFxuICAgICAgICByOiByXG4gICAgfTtcbiAgICBpZiAoX25hbWUpIHJlc3VsdC5uYW1lID0gX25hbWU7XG4gICAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbsK1LnV0aWwuZW5zdXJlQXJyYXkgPSBmdW5jdGlvbihfdmFsLCBfY291bnQpIHtcbiAgICBpZiAodHlwZW9mIF92YWwgPT09ICd1bmRlZmluZWQnKSByZXR1cm4gbnVsbDtcbiAgICB2YXIgYXJyID0gW10uY29uY2F0KF92YWwpO1xuICAgIHJldHVybiBkMy5yYW5nZShfY291bnQpLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgIHJldHVybiBhcnJbaV0gfHwgYXJyWzBdO1xuICAgIH0pO1xufTtcblxuwrUudXRpbC5maWxsQXJyYXlzID0gZnVuY3Rpb24oX29iaiwgX3ZhbHVlTmFtZXMsIF9jb3VudCkge1xuICAgIF92YWx1ZU5hbWVzLmZvckVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICBfb2JqW2RdID0gwrUudXRpbC5lbnN1cmVBcnJheShfb2JqW2RdLCBfY291bnQpO1xuICAgIH0pO1xuICAgIHJldHVybiBfb2JqO1xufTtcblxuwrUudXRpbC5jbG9uZUpzb24gPSBmdW5jdGlvbihqc29uKSB7XG4gICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoanNvbikpO1xufTtcblxuwrUudXRpbC52YWxpZGF0ZUtleXMgPSBmdW5jdGlvbihvYmosIGtleXMpIHtcbiAgICBpZiAodHlwZW9mIGtleXMgPT09ICdzdHJpbmcnKSBrZXlzID0ga2V5cy5zcGxpdCgnLicpO1xuICAgIHZhciBuZXh0ID0ga2V5cy5zaGlmdCgpO1xuICAgIHJldHVybiBvYmpbbmV4dF0gJiYgKCFrZXlzLmxlbmd0aCB8fCBvYmpIYXNLZXlzKG9ialtuZXh0XSwga2V5cykpO1xufTtcblxuwrUudXRpbC5zdW1BcnJheXMgPSBmdW5jdGlvbihhLCBiKSB7XG4gICAgcmV0dXJuIGQzLnppcChhLCBiKS5tYXAoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICByZXR1cm4gZDMuc3VtKGQpO1xuICAgIH0pO1xufTtcblxuwrUudXRpbC5hcnJheUxhc3QgPSBmdW5jdGlvbihhKSB7XG4gICAgcmV0dXJuIGFbYS5sZW5ndGggLSAxXTtcbn07XG5cbsK1LnV0aWwuYXJyYXlFcXVhbCA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICB2YXIgaSA9IE1hdGgubWF4KGEubGVuZ3RoLCBiLmxlbmd0aCwgMSk7XG4gICAgd2hpbGUgKGktLSA+PSAwICYmIGFbaV0gPT09IGJbaV0pIDtcbiAgICByZXR1cm4gaSA9PT0gLTI7XG59O1xuXG7CtS51dGlsLmZsYXR0ZW5BcnJheSA9IGZ1bmN0aW9uKGFycikge1xuICAgIHZhciByID0gW107XG4gICAgd2hpbGUgKCHCtS51dGlsLmFycmF5RXF1YWwociwgYXJyKSkge1xuICAgICAgICByID0gYXJyO1xuICAgICAgICBhcnIgPSBbXS5jb25jYXQuYXBwbHkoW10sIGFycik7XG4gICAgfVxuICAgIHJldHVybiBhcnI7XG59O1xuXG7CtS51dGlsLmRlZHVwbGljYXRlID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgcmV0dXJuIGFyci5maWx0ZXIoZnVuY3Rpb24odiwgaSwgYSkge1xuICAgICAgICByZXR1cm4gYS5pbmRleE9mKHYpID09IGk7XG4gICAgfSk7XG59O1xuXG7CtS51dGlsLmNvbnZlcnRUb0NhcnRlc2lhbiA9IGZ1bmN0aW9uKHJhZGl1cywgdGhldGEpIHtcbiAgICB2YXIgdGhldGFSYWRpYW5zID0gdGhldGEgKiBNYXRoLlBJIC8gMTgwO1xuICAgIHZhciB4ID0gcmFkaXVzICogTWF0aC5jb3ModGhldGFSYWRpYW5zKTtcbiAgICB2YXIgeSA9IHJhZGl1cyAqIE1hdGguc2luKHRoZXRhUmFkaWFucyk7XG4gICAgcmV0dXJuIFsgeCwgeSBdO1xufTtcblxuwrUudXRpbC5yb3VuZCA9IGZ1bmN0aW9uKF92YWx1ZSwgX2RpZ2l0cykge1xuICAgIHZhciBkaWdpdHMgPSBfZGlnaXRzIHx8IDI7XG4gICAgdmFyIG11bHQgPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgICByZXR1cm4gTWF0aC5yb3VuZChfdmFsdWUgKiBtdWx0KSAvIG11bHQ7XG59O1xuXG7CtS51dGlsLmdldE1vdXNlUG9zID0gZnVuY3Rpb24oX3JlZmVyZW5jZUVsZW1lbnQpIHtcbiAgICB2YXIgbW91c2VQb3MgPSBkMy5tb3VzZShfcmVmZXJlbmNlRWxlbWVudC5ub2RlKCkpO1xuICAgIHZhciBtb3VzZVggPSBtb3VzZVBvc1swXTtcbiAgICB2YXIgbW91c2VZID0gbW91c2VQb3NbMV07XG4gICAgdmFyIG1vdXNlID0ge307XG4gICAgbW91c2UueCA9IG1vdXNlWDtcbiAgICBtb3VzZS55ID0gbW91c2VZO1xuICAgIG1vdXNlLnBvcyA9IG1vdXNlUG9zO1xuICAgIG1vdXNlLmFuZ2xlID0gKE1hdGguYXRhbjIobW91c2VZLCBtb3VzZVgpICsgTWF0aC5QSSkgKiAxODAgLyBNYXRoLlBJO1xuICAgIG1vdXNlLnJhZGl1cyA9IE1hdGguc3FydChtb3VzZVggKiBtb3VzZVggKyBtb3VzZVkgKiBtb3VzZVkpO1xuICAgIHJldHVybiBtb3VzZTtcbn07XG5cbsK1LnV0aWwuZHVwbGljYXRlc0NvdW50ID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgdmFyIHVuaXF1ZXMgPSB7fSwgdmFsO1xuICAgIHZhciBkdXBzID0ge307XG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IGFyci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICB2YWwgPSBhcnJbaV07XG4gICAgICAgIGlmICh2YWwgaW4gdW5pcXVlcykge1xuICAgICAgICAgICAgdW5pcXVlc1t2YWxdKys7XG4gICAgICAgICAgICBkdXBzW3ZhbF0gPSB1bmlxdWVzW3ZhbF07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1bmlxdWVzW3ZhbF0gPSAxO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkdXBzO1xufTtcblxuwrUudXRpbC5kdXBsaWNhdGVzID0gZnVuY3Rpb24oYXJyKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKMK1LnV0aWwuZHVwbGljYXRlc0NvdW50KGFycikpO1xufTtcblxuwrUudXRpbC50cmFuc2xhdG9yID0gZnVuY3Rpb24ob2JqLCBzb3VyY2VCcmFuY2gsIHRhcmdldEJyYW5jaCwgcmV2ZXJzZSkge1xuICAgIGlmIChyZXZlcnNlKSB7XG4gICAgICAgIHZhciB0YXJnZXRCcmFuY2hDb3B5ID0gdGFyZ2V0QnJhbmNoLnNsaWNlKCk7XG4gICAgICAgIHRhcmdldEJyYW5jaCA9IHNvdXJjZUJyYW5jaDtcbiAgICAgICAgc291cmNlQnJhbmNoID0gdGFyZ2V0QnJhbmNoQ29weTtcbiAgICB9XG4gICAgdmFyIHZhbHVlID0gc291cmNlQnJhbmNoLnJlZHVjZShmdW5jdGlvbihwcmV2aW91c1ZhbHVlLCBjdXJyZW50VmFsdWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcmV2aW91c1ZhbHVlICE9ICd1bmRlZmluZWQnKSByZXR1cm4gcHJldmlvdXNWYWx1ZVtjdXJyZW50VmFsdWVdO1xuICAgIH0sIG9iaik7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICBzb3VyY2VCcmFuY2gucmVkdWNlKGZ1bmN0aW9uKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcmV2aW91c1ZhbHVlID09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgICAgIGlmIChpbmRleCA9PT0gc291cmNlQnJhbmNoLmxlbmd0aCAtIDEpIGRlbGV0ZSBwcmV2aW91c1ZhbHVlW2N1cnJlbnRWYWx1ZV07XG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlW2N1cnJlbnRWYWx1ZV07XG4gICAgfSwgb2JqKTtcbiAgICB0YXJnZXRCcmFuY2gucmVkdWNlKGZ1bmN0aW9uKHByZXZpb3VzVmFsdWUsIGN1cnJlbnRWYWx1ZSwgaW5kZXgpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBwcmV2aW91c1ZhbHVlW2N1cnJlbnRWYWx1ZV0gPT09ICd1bmRlZmluZWQnKSBwcmV2aW91c1ZhbHVlW2N1cnJlbnRWYWx1ZV0gPSB7fTtcbiAgICAgICAgaWYgKGluZGV4ID09PSB0YXJnZXRCcmFuY2gubGVuZ3RoIC0gMSkgcHJldmlvdXNWYWx1ZVtjdXJyZW50VmFsdWVdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiBwcmV2aW91c1ZhbHVlW2N1cnJlbnRWYWx1ZV07XG4gICAgfSwgb2JqKTtcbn07XG5cbsK1LlBvbHlDaGFydCA9IGZ1bmN0aW9uIG1vZHVsZSgpIHtcbiAgICB2YXIgY29uZmlnID0gWyDCtS5Qb2x5Q2hhcnQuZGVmYXVsdENvbmZpZygpIF07XG4gICAgdmFyIGRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2hvdmVyJyk7XG4gICAgdmFyIGRhc2hBcnJheSA9IHtcbiAgICAgICAgc29saWQ6ICdub25lJyxcbiAgICAgICAgZGFzaDogWyA1LCAyIF0sXG4gICAgICAgIGRvdDogWyAyLCA1IF1cbiAgICB9O1xuICAgIHZhciBjb2xvclNjYWxlO1xuICAgIGZ1bmN0aW9uIGV4cG9ydHMoKSB7XG4gICAgICAgIHZhciBnZW9tZXRyeUNvbmZpZyA9IGNvbmZpZ1swXS5nZW9tZXRyeUNvbmZpZztcbiAgICAgICAgdmFyIGNvbnRhaW5lciA9IGdlb21ldHJ5Q29uZmlnLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT0gJ3N0cmluZycpIGNvbnRhaW5lciA9IGQzLnNlbGVjdChjb250YWluZXIpO1xuICAgICAgICBjb250YWluZXIuZGF0dW0oY29uZmlnKS5lYWNoKGZ1bmN0aW9uKF9jb25maWcsIF9pbmRleCkge1xuICAgICAgICAgICAgdmFyIGlzU3RhY2sgPSAhIV9jb25maWdbMF0uZGF0YS55U3RhY2s7XG4gICAgICAgICAgICB2YXIgZGF0YSA9IF9jb25maWcubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNTdGFjaykgcmV0dXJuIGQzLnppcChkLmRhdGEudFswXSwgZC5kYXRhLnJbMF0sIGQuZGF0YS55U3RhY2tbMF0pOyBlbHNlIHJldHVybiBkMy56aXAoZC5kYXRhLnRbMF0sIGQuZGF0YS5yWzBdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGFuZ3VsYXJTY2FsZSA9IGdlb21ldHJ5Q29uZmlnLmFuZ3VsYXJTY2FsZTtcbiAgICAgICAgICAgIHZhciBkb21haW5NaW4gPSBnZW9tZXRyeUNvbmZpZy5yYWRpYWxTY2FsZS5kb21haW4oKVswXTtcbiAgICAgICAgICAgIHZhciBnZW5lcmF0b3IgPSB7fTtcbiAgICAgICAgICAgIGdlbmVyYXRvci5iYXIgPSBmdW5jdGlvbihkLCBpLCBwSSkge1xuICAgICAgICAgICAgICAgIHZhciBkYXRhQ29uZmlnID0gX2NvbmZpZ1twSV0uZGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgaCA9IGdlb21ldHJ5Q29uZmlnLnJhZGlhbFNjYWxlKGRbMV0pIC0gZ2VvbWV0cnlDb25maWcucmFkaWFsU2NhbGUoMCk7XG4gICAgICAgICAgICAgICAgdmFyIHN0YWNrVG9wID0gZ2VvbWV0cnlDb25maWcucmFkaWFsU2NhbGUoZFsyXSB8fCAwKTtcbiAgICAgICAgICAgICAgICB2YXIgdyA9IGRhdGFDb25maWcuYmFyV2lkdGg7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmF0dHIoe1xuICAgICAgICAgICAgICAgICAgICAnY2xhc3MnOiAnbWFyayBiYXInLFxuICAgICAgICAgICAgICAgICAgICBkOiAnTScgKyBbIFsgaCArIHN0YWNrVG9wLCAtdyAvIDIgXSwgWyBoICsgc3RhY2tUb3AsIHcgLyAyIF0sIFsgc3RhY2tUb3AsIHcgLyAyIF0sIFsgc3RhY2tUb3AsIC13IC8gMiBdIF0uam9pbignTCcpICsgJ1onLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncm90YXRlKCcgKyAoZ2VvbWV0cnlDb25maWcub3JpZW50YXRpb24gKyBhbmd1bGFyU2NhbGUoZFswXSkpICsgJyknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgZ2VuZXJhdG9yLmRvdCA9IGZ1bmN0aW9uKGQsIGksIHBJKSB7XG4gICAgICAgICAgICAgICAgdmFyIHN0YWNrZWREYXRhID0gZFsyXSA/IFsgZFswXSwgZFsxXSArIGRbMl0gXSA6IGQ7XG4gICAgICAgICAgICAgICAgdmFyIHN5bWJvbCA9IGQzLnN2Zy5zeW1ib2woKS5zaXplKF9jb25maWdbcEldLmRhdGEuZG90U2l6ZSkudHlwZShfY29uZmlnW3BJXS5kYXRhLmRvdFR5cGUpKGQsIGkpO1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ21hcmsgZG90JyxcbiAgICAgICAgICAgICAgICAgICAgZDogc3ltYm9sLFxuICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb29yZCA9IGNvbnZlcnRUb0NhcnRlc2lhbihnZXRQb2xhckNvb3JkaW5hdGVzKHN0YWNrZWREYXRhKSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3RyYW5zbGF0ZSgnICsgWyBjb29yZC54LCBjb29yZC55IF0gKyAnKSc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgbGluZSA9IGQzLnN2Zy5saW5lLnJhZGlhbCgpLmludGVycG9sYXRlKF9jb25maWdbMF0uZGF0YS5saW5lSW50ZXJwb2xhdGlvbikucmFkaXVzKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZ2VvbWV0cnlDb25maWcucmFkaWFsU2NhbGUoZFsxXSk7XG4gICAgICAgICAgICB9KS5hbmdsZShmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb21ldHJ5Q29uZmlnLmFuZ3VsYXJTY2FsZShkWzBdKSAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGdlbmVyYXRvci5saW5lID0gZnVuY3Rpb24oZCwgaSwgcEkpIHtcbiAgICAgICAgICAgICAgICB2YXIgbGluZURhdGEgPSBkWzJdID8gZGF0YVtwSV0ubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIFsgZFswXSwgZFsxXSArIGRbMl0gXTtcbiAgICAgICAgICAgICAgICB9KSA6IGRhdGFbcEldO1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5lYWNoKGdlbmVyYXRvclsnZG90J10pLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogZnVuY3Rpb24oZEIsIGlCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gK19jb25maWdbcEldLmRhdGEuZG90VmlzaWJsZTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogbWFya1N0eWxlLnN0cm9rZShkLCBpLCBwSSlcbiAgICAgICAgICAgICAgICB9KS5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ21hcmsgZG90J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGlmIChpID4gMCkgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHZhciBsaW5lU2VsZWN0aW9uID0gZDMuc2VsZWN0KHRoaXMucGFyZW50Tm9kZSkuc2VsZWN0QWxsKCdwYXRoLmxpbmUnKS5kYXRhKFsgMCBdKTtcbiAgICAgICAgICAgICAgICBsaW5lU2VsZWN0aW9uLmVudGVyKCkuaW5zZXJ0KCdwYXRoJyk7XG4gICAgICAgICAgICAgICAgbGluZVNlbGVjdGlvbi5hdHRyKHtcbiAgICAgICAgICAgICAgICAgICAgJ2NsYXNzJzogJ2xpbmUnLFxuICAgICAgICAgICAgICAgICAgICBkOiBsaW5lKGxpbmVEYXRhKSxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBmdW5jdGlvbihkQiwgaUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAncm90YXRlKCcgKyAoZ2VvbWV0cnlDb25maWcub3JpZW50YXRpb24gKyA5MCkgKyAnKSc7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICdwb2ludGVyLWV2ZW50cyc6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0pLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAgICAgZmlsbDogZnVuY3Rpb24oZEIsIGlCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFya1N0eWxlLmZpbGwoZCwgaSwgcEkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnZmlsbC1vcGFjaXR5JzogMCxcbiAgICAgICAgICAgICAgICAgICAgc3Ryb2tlOiBmdW5jdGlvbihkQiwgaUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXJrU3R5bGUuc3Ryb2tlKGQsIGksIHBJKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6IGZ1bmN0aW9uKGRCLCBpQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcmtTdHlsZVsnc3Ryb2tlLXdpZHRoJ10oZCwgaSwgcEkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6IGZ1bmN0aW9uKGRCLCBpQikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1hcmtTdHlsZVsnc3Ryb2tlLWRhc2hhcnJheSddKGQsIGksIHBJKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogZnVuY3Rpb24oZEIsIGlCKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWFya1N0eWxlLm9wYWNpdHkoZCwgaSwgcEkpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBmdW5jdGlvbihkQiwgaUIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBtYXJrU3R5bGUuZGlzcGxheShkLCBpLCBwSSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgYW5ndWxhclJhbmdlID0gZ2VvbWV0cnlDb25maWcuYW5ndWxhclNjYWxlLnJhbmdlKCk7XG4gICAgICAgICAgICB2YXIgdHJpYW5nbGVBbmdsZSA9IE1hdGguYWJzKGFuZ3VsYXJSYW5nZVsxXSAtIGFuZ3VsYXJSYW5nZVswXSkgLyBkYXRhWzBdLmxlbmd0aCAqIE1hdGguUEkgLyAxODA7XG4gICAgICAgICAgICB2YXIgYXJjID0gZDMuc3ZnLmFyYygpLnN0YXJ0QW5nbGUoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAtdHJpYW5nbGVBbmdsZSAvIDI7XG4gICAgICAgICAgICB9KS5lbmRBbmdsZShmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRyaWFuZ2xlQW5nbGUgLyAyO1xuICAgICAgICAgICAgfSkuaW5uZXJSYWRpdXMoZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBnZW9tZXRyeUNvbmZpZy5yYWRpYWxTY2FsZShkb21haW5NaW4gKyAoZFsyXSB8fCAwKSk7XG4gICAgICAgICAgICB9KS5vdXRlclJhZGl1cyhmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdlb21ldHJ5Q29uZmlnLnJhZGlhbFNjYWxlKGRvbWFpbk1pbiArIChkWzJdIHx8IDApKSArIGdlb21ldHJ5Q29uZmlnLnJhZGlhbFNjYWxlKGRbMV0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBnZW5lcmF0b3IuYXJjID0gZnVuY3Rpb24oZCwgaSwgcEkpIHtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cih7XG4gICAgICAgICAgICAgICAgICAgICdjbGFzcyc6ICdtYXJrIGFyYycsXG4gICAgICAgICAgICAgICAgICAgIGQ6IGFyYyxcbiAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gJ3JvdGF0ZSgnICsgKGdlb21ldHJ5Q29uZmlnLm9yaWVudGF0aW9uICsgYW5ndWxhclNjYWxlKGRbMF0pICsgOTApICsgJyknO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIG1hcmtTdHlsZSA9IHtcbiAgICAgICAgICAgICAgICBmaWxsOiBmdW5jdGlvbihkLCBpLCBwSSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gX2NvbmZpZ1twSV0uZGF0YS5jb2xvcjtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHN0cm9rZTogZnVuY3Rpb24oZCwgaSwgcEkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb25maWdbcEldLmRhdGEuc3Ryb2tlQ29sb3I7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogZnVuY3Rpb24oZCwgaSwgcEkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIF9jb25maWdbcEldLmRhdGEuc3Ryb2tlU2l6ZSArICdweCc7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAnc3Ryb2tlLWRhc2hhcnJheSc6IGZ1bmN0aW9uKGQsIGksIHBJKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkYXNoQXJyYXlbX2NvbmZpZ1twSV0uZGF0YS5zdHJva2VEYXNoXTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IGZ1bmN0aW9uKGQsIGksIHBJKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBfY29uZmlnW3BJXS5kYXRhLm9wYWNpdHk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkaXNwbGF5OiBmdW5jdGlvbihkLCBpLCBwSSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHlwZW9mIF9jb25maWdbcEldLmRhdGEudmlzaWJsZSA9PT0gJ3VuZGVmaW5lZCcgfHwgX2NvbmZpZ1twSV0uZGF0YS52aXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGdlb21ldHJ5TGF5ZXIgPSBkMy5zZWxlY3QodGhpcykuc2VsZWN0QWxsKCdnLmxheWVyJykuZGF0YShkYXRhKTtcbiAgICAgICAgICAgIGdlb21ldHJ5TGF5ZXIuZW50ZXIoKS5hcHBlbmQoJ2cnKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAnY2xhc3MnOiAnbGF5ZXInXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBnZW9tZXRyeSA9IGdlb21ldHJ5TGF5ZXIuc2VsZWN0QWxsKCdwYXRoLm1hcmsnKS5kYXRhKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ2VvbWV0cnkuZW50ZXIoKS5hcHBlbmQoJ3BhdGgnKS5hdHRyKHtcbiAgICAgICAgICAgICAgICAnY2xhc3MnOiAnbWFyaydcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZ2VvbWV0cnkuc3R5bGUobWFya1N0eWxlKS5lYWNoKGdlbmVyYXRvcltnZW9tZXRyeUNvbmZpZy5nZW9tZXRyeVR5cGVdKTtcbiAgICAgICAgICAgIGdlb21ldHJ5LmV4aXQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGdlb21ldHJ5TGF5ZXIuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgZnVuY3Rpb24gZ2V0UG9sYXJDb29yZGluYXRlcyhkLCBpKSB7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSBnZW9tZXRyeUNvbmZpZy5yYWRpYWxTY2FsZShkWzFdKTtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IChnZW9tZXRyeUNvbmZpZy5hbmd1bGFyU2NhbGUoZFswXSkgKyBnZW9tZXRyeUNvbmZpZy5vcmllbnRhdGlvbikgKiBNYXRoLlBJIC8gMTgwO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHI6IHIsXG4gICAgICAgICAgICAgICAgICAgIHQ6IHRcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZnVuY3Rpb24gY29udmVydFRvQ2FydGVzaWFuKHBvbGFyQ29vcmRpbmF0ZXMpIHtcbiAgICAgICAgICAgICAgICB2YXIgeCA9IHBvbGFyQ29vcmRpbmF0ZXMuciAqIE1hdGguY29zKHBvbGFyQ29vcmRpbmF0ZXMudCk7XG4gICAgICAgICAgICAgICAgdmFyIHkgPSBwb2xhckNvb3JkaW5hdGVzLnIgKiBNYXRoLnNpbihwb2xhckNvb3JkaW5hdGVzLnQpO1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHlcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgZXhwb3J0cy5jb25maWcgPSBmdW5jdGlvbihfeCkge1xuICAgICAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBjb25maWc7XG4gICAgICAgIF94LmZvckVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgaWYgKCFjb25maWdbaV0pIGNvbmZpZ1tpXSA9IHt9O1xuICAgICAgICAgICAgZXh0ZW5kRGVlcEFsbChjb25maWdbaV0sIMK1LlBvbHlDaGFydC5kZWZhdWx0Q29uZmlnKCkpO1xuICAgICAgICAgICAgZXh0ZW5kRGVlcEFsbChjb25maWdbaV0sIGQpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBleHBvcnRzLmdldENvbG9yU2NhbGUgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgcmV0dXJuIGNvbG9yU2NhbGU7XG4gICAgfTtcbiAgICBkMy5yZWJpbmQoZXhwb3J0cywgZGlzcGF0Y2gsICdvbicpO1xuICAgIHJldHVybiBleHBvcnRzO1xufTtcblxuwrUuUG9seUNoYXJ0LmRlZmF1bHRDb25maWcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiAnZ2VvbTEnLFxuICAgICAgICAgICAgdDogWyBbIDEsIDIsIDMsIDQgXSBdLFxuICAgICAgICAgICAgcjogWyBbIDEsIDIsIDMsIDQgXSBdLFxuICAgICAgICAgICAgZG90VHlwZTogJ2NpcmNsZScsXG4gICAgICAgICAgICBkb3RTaXplOiA2NCxcbiAgICAgICAgICAgIGRvdFZpc2libGU6IGZhbHNlLFxuICAgICAgICAgICAgYmFyV2lkdGg6IDIwLFxuICAgICAgICAgICAgY29sb3I6ICcjZmZhNTAwJyxcbiAgICAgICAgICAgIHN0cm9rZVNpemU6IDEsXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogJ3NpbHZlcicsXG4gICAgICAgICAgICBzdHJva2VEYXNoOiAnc29saWQnLFxuICAgICAgICAgICAgb3BhY2l0eTogMSxcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIHZpc2libGVJbkxlZ2VuZDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBnZW9tZXRyeUNvbmZpZzoge1xuICAgICAgICAgICAgZ2VvbWV0cnk6ICdMaW5lUGxvdCcsXG4gICAgICAgICAgICBnZW9tZXRyeVR5cGU6ICdhcmMnLFxuICAgICAgICAgICAgZGlyZWN0aW9uOiAnY2xvY2t3aXNlJyxcbiAgICAgICAgICAgIG9yaWVudGF0aW9uOiAwLFxuICAgICAgICAgICAgY29udGFpbmVyOiAnYm9keScsXG4gICAgICAgICAgICByYWRpYWxTY2FsZTogbnVsbCxcbiAgICAgICAgICAgIGFuZ3VsYXJTY2FsZTogbnVsbCxcbiAgICAgICAgICAgIGNvbG9yU2NhbGU6IGQzLnNjYWxlLmNhdGVnb3J5MjAoKVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gY29uZmlnO1xufTtcblxuwrUuQmFyQ2hhcnQgPSBmdW5jdGlvbiBtb2R1bGUoKSB7XG4gICAgcmV0dXJuIMK1LlBvbHlDaGFydCgpO1xufTtcblxuwrUuQmFyQ2hhcnQuZGVmYXVsdENvbmZpZyA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgIGdlb21ldHJ5Q29uZmlnOiB7XG4gICAgICAgICAgICBnZW9tZXRyeVR5cGU6ICdiYXInXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjb25maWc7XG59O1xuXG7CtS5BcmVhQ2hhcnQgPSBmdW5jdGlvbiBtb2R1bGUoKSB7XG4gICAgcmV0dXJuIMK1LlBvbHlDaGFydCgpO1xufTtcblxuwrUuQXJlYUNoYXJ0LmRlZmF1bHRDb25maWcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICBnZW9tZXRyeUNvbmZpZzoge1xuICAgICAgICAgICAgZ2VvbWV0cnlUeXBlOiAnYXJjJ1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gY29uZmlnO1xufTtcblxuwrUuRG90UGxvdCA9IGZ1bmN0aW9uIG1vZHVsZSgpIHtcbiAgICByZXR1cm4gwrUuUG9seUNoYXJ0KCk7XG59O1xuXG7CtS5Eb3RQbG90LmRlZmF1bHRDb25maWcgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgY29uZmlnID0ge1xuICAgICAgICBnZW9tZXRyeUNvbmZpZzoge1xuICAgICAgICAgICAgZ2VvbWV0cnlUeXBlOiAnZG90JyxcbiAgICAgICAgICAgIGRvdFR5cGU6ICdjaXJjbGUnXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjb25maWc7XG59O1xuXG7CtS5MaW5lUGxvdCA9IGZ1bmN0aW9uIG1vZHVsZSgpIHtcbiAgICByZXR1cm4gwrUuUG9seUNoYXJ0KCk7XG59O1xuXG7CtS5MaW5lUGxvdC5kZWZhdWx0Q29uZmlnID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgZ2VvbWV0cnlDb25maWc6IHtcbiAgICAgICAgICAgIGdlb21ldHJ5VHlwZTogJ2xpbmUnXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjb25maWc7XG59O1xuXG7CtS5MZWdlbmQgPSBmdW5jdGlvbiBtb2R1bGUoKSB7XG4gICAgdmFyIGNvbmZpZyA9IMK1LkxlZ2VuZC5kZWZhdWx0Q29uZmlnKCk7XG4gICAgdmFyIGRpc3BhdGNoID0gZDMuZGlzcGF0Y2goJ2hvdmVyJyk7XG4gICAgZnVuY3Rpb24gZXhwb3J0cygpIHtcbiAgICAgICAgdmFyIGxlZ2VuZENvbmZpZyA9IGNvbmZpZy5sZWdlbmRDb25maWc7XG4gICAgICAgIHZhciBmbGF0dGVuRGF0YSA9IGNvbmZpZy5kYXRhLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gW10uY29uY2F0KGQpLm1hcChmdW5jdGlvbihkQiwgaUIpIHtcbiAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IGV4dGVuZERlZXBBbGwoe30sIGxlZ2VuZENvbmZpZy5lbGVtZW50c1tpXSk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5uYW1lID0gZEI7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5jb2xvciA9IFtdLmNvbmNhdChsZWdlbmRDb25maWcuZWxlbWVudHNbaV0uY29sb3IpW2lCXTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZWxlbWVudDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGRhdGEgPSBkMy5tZXJnZShmbGF0dGVuRGF0YSk7XG4gICAgICAgIGRhdGEgPSBkYXRhLmZpbHRlcihmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICByZXR1cm4gbGVnZW5kQ29uZmlnLmVsZW1lbnRzW2ldICYmIChsZWdlbmRDb25maWcuZWxlbWVudHNbaV0udmlzaWJsZUluTGVnZW5kIHx8IHR5cGVvZiBsZWdlbmRDb25maWcuZWxlbWVudHNbaV0udmlzaWJsZUluTGVnZW5kID09PSAndW5kZWZpbmVkJyk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobGVnZW5kQ29uZmlnLnJldmVyc2VPcmRlcikgZGF0YSA9IGRhdGEucmV2ZXJzZSgpO1xuICAgICAgICB2YXIgY29udGFpbmVyID0gbGVnZW5kQ29uZmlnLmNvbnRhaW5lcjtcbiAgICAgICAgaWYgKHR5cGVvZiBjb250YWluZXIgPT0gJ3N0cmluZycgfHwgY29udGFpbmVyLm5vZGVOYW1lKSBjb250YWluZXIgPSBkMy5zZWxlY3QoY29udGFpbmVyKTtcbiAgICAgICAgdmFyIGNvbG9ycyA9IGRhdGEubWFwKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgIHJldHVybiBkLmNvbG9yO1xuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGxpbmVIZWlnaHQgPSBsZWdlbmRDb25maWcuZm9udFNpemU7XG4gICAgICAgIHZhciBpc0NvbnRpbnVvdXMgPSBsZWdlbmRDb25maWcuaXNDb250aW51b3VzID09IG51bGwgPyB0eXBlb2YgZGF0YVswXSA9PT0gJ251bWJlcicgOiBsZWdlbmRDb25maWcuaXNDb250aW51b3VzO1xuICAgICAgICB2YXIgaGVpZ2h0ID0gaXNDb250aW51b3VzID8gbGVnZW5kQ29uZmlnLmhlaWdodCA6IGxpbmVIZWlnaHQgKiBkYXRhLmxlbmd0aDtcbiAgICAgICAgdmFyIGxlZ2VuZENvbnRhaW5lckdyb3VwID0gY29udGFpbmVyLmNsYXNzZWQoJ2xlZ2VuZC1ncm91cCcsIHRydWUpO1xuICAgICAgICB2YXIgc3ZnID0gbGVnZW5kQ29udGFpbmVyR3JvdXAuc2VsZWN0QWxsKCdzdmcnKS5kYXRhKFsgMCBdKTtcbiAgICAgICAgdmFyIHN2Z0VudGVyID0gc3ZnLmVudGVyKCkuYXBwZW5kKCdzdmcnKS5hdHRyKHtcbiAgICAgICAgICAgIHdpZHRoOiAzMDAsXG4gICAgICAgICAgICBoZWlnaHQ6IGhlaWdodCArIGxpbmVIZWlnaHQsXG4gICAgICAgICAgICB4bWxuczogJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJyxcbiAgICAgICAgICAgICd4bWxuczp4bGluayc6ICdodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rJyxcbiAgICAgICAgICAgIHZlcnNpb246ICcxLjEnXG4gICAgICAgIH0pO1xuICAgICAgICBzdmdFbnRlci5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdsZWdlbmQtYXhpcycsIHRydWUpO1xuICAgICAgICBzdmdFbnRlci5hcHBlbmQoJ2cnKS5jbGFzc2VkKCdsZWdlbmQtbWFya3MnLCB0cnVlKTtcbiAgICAgICAgdmFyIGRhdGFOdW1iZXJlZCA9IGQzLnJhbmdlKGRhdGEubGVuZ3RoKTtcbiAgICAgICAgdmFyIGNvbG9yU2NhbGUgPSBkMy5zY2FsZVtpc0NvbnRpbnVvdXMgPyAnbGluZWFyJyA6ICdvcmRpbmFsJ10oKS5kb21haW4oZGF0YU51bWJlcmVkKS5yYW5nZShjb2xvcnMpO1xuICAgICAgICB2YXIgZGF0YVNjYWxlID0gZDMuc2NhbGVbaXNDb250aW51b3VzID8gJ2xpbmVhcicgOiAnb3JkaW5hbCddKCkuZG9tYWluKGRhdGFOdW1iZXJlZClbaXNDb250aW51b3VzID8gJ3JhbmdlJyA6ICdyYW5nZVBvaW50cyddKFsgMCwgaGVpZ2h0IF0pO1xuICAgICAgICB2YXIgc2hhcGVHZW5lcmF0b3IgPSBmdW5jdGlvbihfdHlwZSwgX3NpemUpIHtcbiAgICAgICAgICAgIHZhciBzcXVhcmVTaXplID0gX3NpemUgKiAzO1xuICAgICAgICAgICAgaWYgKF90eXBlID09PSAnbGluZScpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ00nICsgWyBbIC1fc2l6ZSAvIDIsIC1fc2l6ZSAvIDEyIF0sIFsgX3NpemUgLyAyLCAtX3NpemUgLyAxMiBdLCBbIF9zaXplIC8gMiwgX3NpemUgLyAxMiBdLCBbIC1fc2l6ZSAvIDIsIF9zaXplIC8gMTIgXSBdICsgJ1onO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChkMy5zdmcuc3ltYm9sVHlwZXMuaW5kZXhPZihfdHlwZSkgIT0gLTEpIHJldHVybiBkMy5zdmcuc3ltYm9sKCkudHlwZShfdHlwZSkuc2l6ZShzcXVhcmVTaXplKSgpOyBlbHNlIHJldHVybiBkMy5zdmcuc3ltYm9sKCkudHlwZSgnc3F1YXJlJykuc2l6ZShzcXVhcmVTaXplKSgpO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoaXNDb250aW51b3VzKSB7XG4gICAgICAgICAgICB2YXIgZ3JhZGllbnQgPSBzdmcuc2VsZWN0KCcubGVnZW5kLW1hcmtzJykuYXBwZW5kKCdkZWZzJykuYXBwZW5kKCdsaW5lYXJHcmFkaWVudCcpLmF0dHIoe1xuICAgICAgICAgICAgICAgIGlkOiAnZ3JhZDEnLFxuICAgICAgICAgICAgICAgIHgxOiAnMCUnLFxuICAgICAgICAgICAgICAgIHkxOiAnMCUnLFxuICAgICAgICAgICAgICAgIHgyOiAnMCUnLFxuICAgICAgICAgICAgICAgIHkyOiAnMTAwJSdcbiAgICAgICAgICAgIH0pLnNlbGVjdEFsbCgnc3RvcCcpLmRhdGEoY29sb3JzKTtcbiAgICAgICAgICAgIGdyYWRpZW50LmVudGVyKCkuYXBwZW5kKCdzdG9wJyk7XG4gICAgICAgICAgICBncmFkaWVudC5hdHRyKHtcbiAgICAgICAgICAgICAgICBvZmZzZXQ6IGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGkgLyAoY29sb3JzLmxlbmd0aCAtIDEpICogMTAwICsgJyUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0eWxlKHtcbiAgICAgICAgICAgICAgICAnc3RvcC1jb2xvcic6IGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBzdmcuYXBwZW5kKCdyZWN0JykuY2xhc3NlZCgnbGVnZW5kLW1hcmsnLCB0cnVlKS5hdHRyKHtcbiAgICAgICAgICAgICAgICBoZWlnaHQ6IGxlZ2VuZENvbmZpZy5oZWlnaHQsXG4gICAgICAgICAgICAgICAgd2lkdGg6IGxlZ2VuZENvbmZpZy5jb2xvckJhbmRXaWR0aCxcbiAgICAgICAgICAgICAgICBmaWxsOiAndXJsKCNncmFkMSknXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBsZWdlbmRFbGVtZW50ID0gc3ZnLnNlbGVjdCgnLmxlZ2VuZC1tYXJrcycpLnNlbGVjdEFsbCgncGF0aC5sZWdlbmQtbWFyaycpLmRhdGEoZGF0YSk7XG4gICAgICAgICAgICBsZWdlbmRFbGVtZW50LmVudGVyKCkuYXBwZW5kKCdwYXRoJykuY2xhc3NlZCgnbGVnZW5kLW1hcmsnLCB0cnVlKTtcbiAgICAgICAgICAgIGxlZ2VuZEVsZW1lbnQuYXR0cih7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAndHJhbnNsYXRlKCcgKyBbIGxpbmVIZWlnaHQgLyAyLCBkYXRhU2NhbGUoaSkgKyBsaW5lSGVpZ2h0IC8gMiBdICsgJyknO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZDogZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgc3ltYm9sVHlwZSA9IGQuc3ltYm9sO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gc2hhcGVHZW5lcmF0b3Ioc3ltYm9sVHlwZSwgbGluZUhlaWdodCk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBmaWxsOiBmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjb2xvclNjYWxlKGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgbGVnZW5kRWxlbWVudC5leGl0KCkucmVtb3ZlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxlZ2VuZEF4aXMgPSBkMy5zdmcuYXhpcygpLnNjYWxlKGRhdGFTY2FsZSkub3JpZW50KCdyaWdodCcpO1xuICAgICAgICB2YXIgYXhpcyA9IHN2Zy5zZWxlY3QoJ2cubGVnZW5kLWF4aXMnKS5hdHRyKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgWyBpc0NvbnRpbnVvdXMgPyBsZWdlbmRDb25maWcuY29sb3JCYW5kV2lkdGggOiBsaW5lSGVpZ2h0LCBsaW5lSGVpZ2h0IC8gMiBdICsgJyknXG4gICAgICAgIH0pLmNhbGwobGVnZW5kQXhpcyk7XG4gICAgICAgIGF4aXMuc2VsZWN0QWxsKCcuZG9tYWluJykuc3R5bGUoe1xuICAgICAgICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgICAgICAgc3Ryb2tlOiAnbm9uZSdcbiAgICAgICAgfSk7XG4gICAgICAgIGF4aXMuc2VsZWN0QWxsKCdsaW5lJykuc3R5bGUoe1xuICAgICAgICAgICAgZmlsbDogJ25vbmUnLFxuICAgICAgICAgICAgc3Ryb2tlOiBpc0NvbnRpbnVvdXMgPyBsZWdlbmRDb25maWcudGV4dENvbG9yIDogJ25vbmUnXG4gICAgICAgIH0pO1xuICAgICAgICBheGlzLnNlbGVjdEFsbCgndGV4dCcpLnN0eWxlKHtcbiAgICAgICAgICAgIGZpbGw6IGxlZ2VuZENvbmZpZy50ZXh0Q29sb3IsXG4gICAgICAgICAgICAnZm9udC1zaXplJzogbGVnZW5kQ29uZmlnLmZvbnRTaXplXG4gICAgICAgIH0pLnRleHQoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgcmV0dXJuIGRhdGFbaV0ubmFtZTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBleHBvcnRzO1xuICAgIH1cbiAgICBleHBvcnRzLmNvbmZpZyA9IGZ1bmN0aW9uKF94KSB7XG4gICAgICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGNvbmZpZztcbiAgICAgICAgZXh0ZW5kRGVlcEFsbChjb25maWcsIF94KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBkMy5yZWJpbmQoZXhwb3J0cywgZGlzcGF0Y2gsICdvbicpO1xuICAgIHJldHVybiBleHBvcnRzO1xufTtcblxuwrUuTGVnZW5kLmRlZmF1bHRDb25maWcgPSBmdW5jdGlvbihkLCBpKSB7XG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgZGF0YTogWyAnYScsICdiJywgJ2MnIF0sXG4gICAgICAgIGxlZ2VuZENvbmZpZzoge1xuICAgICAgICAgICAgZWxlbWVudHM6IFsge1xuICAgICAgICAgICAgICAgIHN5bWJvbDogJ2xpbmUnLFxuICAgICAgICAgICAgICAgIGNvbG9yOiAncmVkJ1xuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIHN5bWJvbDogJ3NxdWFyZScsXG4gICAgICAgICAgICAgICAgY29sb3I6ICd5ZWxsb3cnXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgc3ltYm9sOiAnZGlhbW9uZCcsXG4gICAgICAgICAgICAgICAgY29sb3I6ICdsaW1lZ3JlZW4nXG4gICAgICAgICAgICB9IF0sXG4gICAgICAgICAgICBoZWlnaHQ6IDE1MCxcbiAgICAgICAgICAgIGNvbG9yQmFuZFdpZHRoOiAzMCxcbiAgICAgICAgICAgIGZvbnRTaXplOiAxMixcbiAgICAgICAgICAgIGNvbnRhaW5lcjogJ2JvZHknLFxuICAgICAgICAgICAgaXNDb250aW51b3VzOiBudWxsLFxuICAgICAgICAgICAgdGV4dENvbG9yOiAnZ3JleScsXG4gICAgICAgICAgICByZXZlcnNlT3JkZXI6IGZhbHNlXG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBjb25maWc7XG59O1xuXG7CtS50b29sdGlwUGFuZWwgPSBmdW5jdGlvbigpIHtcbiAgICB2YXIgdG9vbHRpcEVsLCB0b29sdGlwVGV4dEVsLCBiYWNrZ3JvdW5kRWw7XG4gICAgdmFyIGNvbmZpZyA9IHtcbiAgICAgICAgY29udGFpbmVyOiBudWxsLFxuICAgICAgICBoYXNUaWNrOiBmYWxzZSxcbiAgICAgICAgZm9udFNpemU6IDEyLFxuICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgcGFkZGluZzogNVxuICAgIH07XG4gICAgdmFyIGlkID0gJ3Rvb2x0aXAtJyArIMK1LnRvb2x0aXBQYW5lbC51aWQrKztcbiAgICB2YXIgdGlja1NpemUgPSAxMDtcbiAgICB2YXIgZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0b29sdGlwRWwgPSBjb25maWcuY29udGFpbmVyLnNlbGVjdEFsbCgnZy4nICsgaWQpLmRhdGEoWyAwIF0pO1xuICAgICAgICB2YXIgdG9vbHRpcEVudGVyID0gdG9vbHRpcEVsLmVudGVyKCkuYXBwZW5kKCdnJykuY2xhc3NlZChpZCwgdHJ1ZSkuc3R5bGUoe1xuICAgICAgICAgICAgJ3BvaW50ZXItZXZlbnRzJzogJ25vbmUnLFxuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0pO1xuICAgICAgICBiYWNrZ3JvdW5kRWwgPSB0b29sdGlwRW50ZXIuYXBwZW5kKCdwYXRoJykuc3R5bGUoe1xuICAgICAgICAgICAgZmlsbDogJ3doaXRlJyxcbiAgICAgICAgICAgICdmaWxsLW9wYWNpdHknOiAuOVxuICAgICAgICB9KS5hdHRyKHtcbiAgICAgICAgICAgIGQ6ICdNMCAwJ1xuICAgICAgICB9KTtcbiAgICAgICAgdG9vbHRpcFRleHRFbCA9IHRvb2x0aXBFbnRlci5hcHBlbmQoJ3RleHQnKS5hdHRyKHtcbiAgICAgICAgICAgIGR4OiBjb25maWcucGFkZGluZyArIHRpY2tTaXplLFxuICAgICAgICAgICAgZHk6ICtjb25maWcuZm9udFNpemUgKiAuM1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHM7XG4gICAgfTtcbiAgICBleHBvcnRzLnRleHQgPSBmdW5jdGlvbihfdGV4dCkge1xuICAgICAgICB2YXIgbCA9IGQzLmhzbChjb25maWcuY29sb3IpLmw7XG4gICAgICAgIHZhciBzdHJva2VDb2xvciA9IGwgPj0gLjUgPyAnI2FhYScgOiAnd2hpdGUnO1xuICAgICAgICB2YXIgZmlsbENvbG9yID0gbCA+PSAuNSA/ICdibGFjaycgOiAnd2hpdGUnO1xuICAgICAgICB2YXIgdGV4dCA9IF90ZXh0IHx8ICcnO1xuICAgICAgICB0b29sdGlwVGV4dEVsLnN0eWxlKHtcbiAgICAgICAgICAgIGZpbGw6IGZpbGxDb2xvcixcbiAgICAgICAgICAgICdmb250LXNpemUnOiBjb25maWcuZm9udFNpemUgKyAncHgnXG4gICAgICAgIH0pLnRleHQodGV4dCk7XG4gICAgICAgIHZhciBwYWRkaW5nID0gY29uZmlnLnBhZGRpbmc7XG4gICAgICAgIHZhciBiYm94ID0gdG9vbHRpcFRleHRFbC5ub2RlKCkuZ2V0QkJveCgpO1xuICAgICAgICB2YXIgYm94U3R5bGUgPSB7XG4gICAgICAgICAgICBmaWxsOiBjb25maWcuY29sb3IsXG4gICAgICAgICAgICBzdHJva2U6IHN0cm9rZUNvbG9yLFxuICAgICAgICAgICAgJ3N0cm9rZS13aWR0aCc6ICcycHgnXG4gICAgICAgIH07XG4gICAgICAgIHZhciBiYWNrR3JvdW5kVyA9IGJib3gud2lkdGggKyBwYWRkaW5nICogMiArIHRpY2tTaXplO1xuICAgICAgICB2YXIgYmFja0dyb3VuZEggPSBiYm94LmhlaWdodCArIHBhZGRpbmcgKiAyO1xuICAgICAgICBiYWNrZ3JvdW5kRWwuYXR0cih7XG4gICAgICAgICAgICBkOiAnTScgKyBbIFsgdGlja1NpemUsIC1iYWNrR3JvdW5kSCAvIDIgXSwgWyB0aWNrU2l6ZSwgLWJhY2tHcm91bmRIIC8gNCBdLCBbIGNvbmZpZy5oYXNUaWNrID8gMCA6IHRpY2tTaXplLCAwIF0sIFsgdGlja1NpemUsIGJhY2tHcm91bmRIIC8gNCBdLCBbIHRpY2tTaXplLCBiYWNrR3JvdW5kSCAvIDIgXSwgWyBiYWNrR3JvdW5kVywgYmFja0dyb3VuZEggLyAyIF0sIFsgYmFja0dyb3VuZFcsIC1iYWNrR3JvdW5kSCAvIDIgXSBdLmpvaW4oJ0wnKSArICdaJ1xuICAgICAgICB9KS5zdHlsZShib3hTdHlsZSk7XG4gICAgICAgIHRvb2x0aXBFbC5hdHRyKHtcbiAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZSgnICsgWyB0aWNrU2l6ZSwgLWJhY2tHcm91bmRIIC8gMiArIHBhZGRpbmcgKiAyIF0gKyAnKSdcbiAgICAgICAgfSk7XG4gICAgICAgIHRvb2x0aXBFbC5zdHlsZSh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZXhwb3J0cztcbiAgICB9O1xuICAgIGV4cG9ydHMubW92ZSA9IGZ1bmN0aW9uKF9wb3MpIHtcbiAgICAgICAgaWYgKCF0b29sdGlwRWwpIHJldHVybjtcbiAgICAgICAgdG9vbHRpcEVsLmF0dHIoe1xuICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlKCcgKyBbIF9wb3NbMF0sIF9wb3NbMV0gXSArICcpJ1xuICAgICAgICB9KS5zdHlsZSh7XG4gICAgICAgICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZXhwb3J0cztcbiAgICB9O1xuICAgIGV4cG9ydHMuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRvb2x0aXBFbCkgcmV0dXJuO1xuICAgICAgICB0b29sdGlwRWwuc3R5bGUoe1xuICAgICAgICAgICAgZGlzcGxheTogJ25vbmUnXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZXhwb3J0cztcbiAgICB9O1xuICAgIGV4cG9ydHMuc2hvdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIXRvb2x0aXBFbCkgcmV0dXJuO1xuICAgICAgICB0b29sdGlwRWwuc3R5bGUoe1xuICAgICAgICAgICAgZGlzcGxheTogJ2Jsb2NrJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGV4cG9ydHM7XG4gICAgfTtcbiAgICBleHBvcnRzLmNvbmZpZyA9IGZ1bmN0aW9uKF94KSB7XG4gICAgICAgIGV4dGVuZERlZXBBbGwoY29uZmlnLCBfeCk7XG4gICAgICAgIHJldHVybiBleHBvcnRzO1xuICAgIH07XG4gICAgcmV0dXJuIGV4cG9ydHM7XG59O1xuXG7CtS50b29sdGlwUGFuZWwudWlkID0gMTtcblxuwrUuYWRhcHRlciA9IHt9O1xuXG7CtS5hZGFwdGVyLnBsb3RseSA9IGZ1bmN0aW9uIG1vZHVsZSgpIHtcbiAgICB2YXIgZXhwb3J0cyA9IHt9O1xuICAgIGV4cG9ydHMuY29udmVydCA9IGZ1bmN0aW9uKF9pbnB1dENvbmZpZywgcmV2ZXJzZSkge1xuICAgICAgICB2YXIgb3V0cHV0Q29uZmlnID0ge307XG4gICAgICAgIGlmIChfaW5wdXRDb25maWcuZGF0YSkge1xuICAgICAgICAgICAgb3V0cHV0Q29uZmlnLmRhdGEgPSBfaW5wdXRDb25maWcuZGF0YS5tYXAoZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgIHZhciByID0gZXh0ZW5kRGVlcEFsbCh7fSwgZCk7XG4gICAgICAgICAgICAgICAgdmFyIHRvVHJhbnNsYXRlID0gW1xuICAgICAgICAgICAgICAgICAgICBbIHIsIFsgJ21hcmtlcicsICdjb2xvcicgXSwgWyAnY29sb3InIF0gXSxcbiAgICAgICAgICAgICAgICAgICAgWyByLCBbICdtYXJrZXInLCAnb3BhY2l0eScgXSwgWyAnb3BhY2l0eScgXSBdLFxuICAgICAgICAgICAgICAgICAgICBbIHIsIFsgJ21hcmtlcicsICdsaW5lJywgJ2NvbG9yJyBdLCBbICdzdHJva2VDb2xvcicgXSBdLFxuICAgICAgICAgICAgICAgICAgICBbIHIsIFsgJ21hcmtlcicsICdsaW5lJywgJ2Rhc2gnIF0sIFsgJ3N0cm9rZURhc2gnIF0gXSxcbiAgICAgICAgICAgICAgICAgICAgWyByLCBbICdtYXJrZXInLCAnbGluZScsICd3aWR0aCcgXSwgWyAnc3Ryb2tlU2l6ZScgXSBdLFxuICAgICAgICAgICAgICAgICAgICBbIHIsIFsgJ21hcmtlcicsICdzeW1ib2wnIF0sIFsgJ2RvdFR5cGUnIF0gXSxcbiAgICAgICAgICAgICAgICAgICAgWyByLCBbICdtYXJrZXInLCAnc2l6ZScgXSwgWyAnZG90U2l6ZScgXSBdLFxuICAgICAgICAgICAgICAgICAgICBbIHIsIFsgJ21hcmtlcicsICdiYXJXaWR0aCcgXSwgWyAnYmFyV2lkdGgnIF0gXSxcbiAgICAgICAgICAgICAgICAgICAgWyByLCBbICdsaW5lJywgJ2ludGVycG9sYXRpb24nIF0sIFsgJ2xpbmVJbnRlcnBvbGF0aW9uJyBdIF0sXG4gICAgICAgICAgICAgICAgICAgIFsgciwgWyAnc2hvd2xlZ2VuZCcgXSwgWyAndmlzaWJsZUluTGVnZW5kJyBdIF1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIHRvVHJhbnNsYXRlLmZvckVhY2goZnVuY3Rpb24oZCwgaSkge1xuICAgICAgICAgICAgICAgICAgICDCtS51dGlsLnRyYW5zbGF0b3IuYXBwbHkobnVsbCwgZC5jb25jYXQocmV2ZXJzZSkpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFyZXZlcnNlKSBkZWxldGUgci5tYXJrZXI7XG4gICAgICAgICAgICAgICAgaWYgKHJldmVyc2UpIGRlbGV0ZSByLmdyb3VwSWQ7XG4gICAgICAgICAgICAgICAgaWYgKCFyZXZlcnNlKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChyLnR5cGUgPT09ICdzY2F0dGVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHIubW9kZSA9PT0gJ2xpbmVzJykgci5nZW9tZXRyeSA9ICdMaW5lUGxvdCc7IGVsc2UgaWYgKHIubW9kZSA9PT0gJ21hcmtlcnMnKSByLmdlb21ldHJ5ID0gJ0RvdFBsb3QnOyBlbHNlIGlmIChyLm1vZGUgPT09ICdsaW5lcyttYXJrZXJzJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZ2VvbWV0cnkgPSAnTGluZVBsb3QnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIuZG90VmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoci50eXBlID09PSAnYXJlYScpIHIuZ2VvbWV0cnkgPSAnQXJlYUNoYXJ0JzsgZWxzZSBpZiAoci50eXBlID09PSAnYmFyJykgci5nZW9tZXRyeSA9ICdCYXJDaGFydCc7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByLm1vZGU7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByLnR5cGU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHIuZ2VvbWV0cnkgPT09ICdMaW5lUGxvdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHIudHlwZSA9ICdzY2F0dGVyJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyLmRvdFZpc2libGUgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgci5kb3RWaXNpYmxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHIubW9kZSA9ICdsaW5lcyttYXJrZXJzJztcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSByLm1vZGUgPSAnbGluZXMnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHIuZ2VvbWV0cnkgPT09ICdEb3RQbG90Jykge1xuICAgICAgICAgICAgICAgICAgICAgICAgci50eXBlID0gJ3NjYXR0ZXInO1xuICAgICAgICAgICAgICAgICAgICAgICAgci5tb2RlID0gJ21hcmtlcnMnO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHIuZ2VvbWV0cnkgPT09ICdBcmVhQ2hhcnQnKSByLnR5cGUgPSAnYXJlYSc7IGVsc2UgaWYgKHIuZ2VvbWV0cnkgPT09ICdCYXJDaGFydCcpIHIudHlwZSA9ICdiYXInO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgci5nZW9tZXRyeTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIHI7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghcmV2ZXJzZSAmJiBfaW5wdXRDb25maWcubGF5b3V0ICYmIF9pbnB1dENvbmZpZy5sYXlvdXQuYmFybW9kZSA9PT0gJ3N0YWNrJykge1xuICAgICAgICAgICAgICAgIHZhciBkdXBsaWNhdGVzID0gwrUudXRpbC5kdXBsaWNhdGVzKG91dHB1dENvbmZpZy5kYXRhLm1hcChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBkLmdlb21ldHJ5O1xuICAgICAgICAgICAgICAgIH0pKTtcbiAgICAgICAgICAgICAgICBvdXRwdXRDb25maWcuZGF0YS5mb3JFYWNoKGZ1bmN0aW9uKGQsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGlkeCA9IGR1cGxpY2F0ZXMuaW5kZXhPZihkLmdlb21ldHJ5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCAhPSAtMSkgb3V0cHV0Q29uZmlnLmRhdGFbaV0uZ3JvdXBJZCA9IGlkeDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZiAoX2lucHV0Q29uZmlnLmxheW91dCkge1xuICAgICAgICAgICAgdmFyIHIgPSBleHRlbmREZWVwQWxsKHt9LCBfaW5wdXRDb25maWcubGF5b3V0KTtcbiAgICAgICAgICAgIHZhciB0b1RyYW5zbGF0ZSA9IFtcbiAgICAgICAgICAgICAgICBbIHIsIFsgJ3Bsb3RfYmdjb2xvcicgXSwgWyAnYmFja2dyb3VuZENvbG9yJyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLCBbICdzaG93bGVnZW5kJyBdLCBbICdzaG93TGVnZW5kJyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLCBbICdyYWRpYWxheGlzJyBdLCBbICdyYWRpYWxBeGlzJyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLCBbICdhbmd1bGFyYXhpcycgXSwgWyAnYW5ndWxhckF4aXMnIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIuYW5ndWxhcmF4aXMsIFsgJ3Nob3dsaW5lJyBdLCBbICdncmlkTGluZXNWaXNpYmxlJyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLmFuZ3VsYXJheGlzLCBbICdzaG93dGlja2xhYmVscycgXSwgWyAnbGFiZWxzVmlzaWJsZScgXSBdLFxuICAgICAgICAgICAgICAgIFsgci5hbmd1bGFyYXhpcywgWyAnbnRpY2tzJyBdLCBbICd0aWNrc0NvdW50JyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLmFuZ3VsYXJheGlzLCBbICd0aWNrb3JpZW50YXRpb24nIF0sIFsgJ3RpY2tPcmllbnRhdGlvbicgXSBdLFxuICAgICAgICAgICAgICAgIFsgci5hbmd1bGFyYXhpcywgWyAndGlja3N1ZmZpeCcgXSwgWyAndGlja3NTdWZmaXgnIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIuYW5ndWxhcmF4aXMsIFsgJ3JhbmdlJyBdLCBbICdkb21haW4nIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIuYW5ndWxhcmF4aXMsIFsgJ2VuZHBhZGRpbmcnIF0sIFsgJ2VuZFBhZGRpbmcnIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIucmFkaWFsYXhpcywgWyAnc2hvd2xpbmUnIF0sIFsgJ2dyaWRMaW5lc1Zpc2libGUnIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIucmFkaWFsYXhpcywgWyAndGlja29yaWVudGF0aW9uJyBdLCBbICd0aWNrT3JpZW50YXRpb24nIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIucmFkaWFsYXhpcywgWyAndGlja3N1ZmZpeCcgXSwgWyAndGlja3NTdWZmaXgnIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIucmFkaWFsYXhpcywgWyAncmFuZ2UnIF0sIFsgJ2RvbWFpbicgXSBdLFxuICAgICAgICAgICAgICAgIFsgci5hbmd1bGFyQXhpcywgWyAnc2hvd2xpbmUnIF0sIFsgJ2dyaWRMaW5lc1Zpc2libGUnIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIuYW5ndWxhckF4aXMsIFsgJ3Nob3d0aWNrbGFiZWxzJyBdLCBbICdsYWJlbHNWaXNpYmxlJyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLmFuZ3VsYXJBeGlzLCBbICdudGlja3MnIF0sIFsgJ3RpY2tzQ291bnQnIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIuYW5ndWxhckF4aXMsIFsgJ3RpY2tvcmllbnRhdGlvbicgXSwgWyAndGlja09yaWVudGF0aW9uJyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLmFuZ3VsYXJBeGlzLCBbICd0aWNrc3VmZml4JyBdLCBbICd0aWNrc1N1ZmZpeCcgXSBdLFxuICAgICAgICAgICAgICAgIFsgci5hbmd1bGFyQXhpcywgWyAncmFuZ2UnIF0sIFsgJ2RvbWFpbicgXSBdLFxuICAgICAgICAgICAgICAgIFsgci5hbmd1bGFyQXhpcywgWyAnZW5kcGFkZGluZycgXSwgWyAnZW5kUGFkZGluZycgXSBdLFxuICAgICAgICAgICAgICAgIFsgci5yYWRpYWxBeGlzLCBbICdzaG93bGluZScgXSwgWyAnZ3JpZExpbmVzVmlzaWJsZScgXSBdLFxuICAgICAgICAgICAgICAgIFsgci5yYWRpYWxBeGlzLCBbICd0aWNrb3JpZW50YXRpb24nIF0sIFsgJ3RpY2tPcmllbnRhdGlvbicgXSBdLFxuICAgICAgICAgICAgICAgIFsgci5yYWRpYWxBeGlzLCBbICd0aWNrc3VmZml4JyBdLCBbICd0aWNrc1N1ZmZpeCcgXSBdLFxuICAgICAgICAgICAgICAgIFsgci5yYWRpYWxBeGlzLCBbICdyYW5nZScgXSwgWyAnZG9tYWluJyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLmZvbnQsIFsgJ291dGxpbmVjb2xvcicgXSwgWyAnb3V0bGluZUNvbG9yJyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLmxlZ2VuZCwgWyAndHJhY2VvcmRlcicgXSwgWyAncmV2ZXJzZU9yZGVyJyBdIF0sXG4gICAgICAgICAgICAgICAgWyByLCBbICdsYWJlbG9mZnNldCcgXSwgWyAnbGFiZWxPZmZzZXQnIF0gXSxcbiAgICAgICAgICAgICAgICBbIHIsIFsgJ2RlZmF1bHRjb2xvcnJhbmdlJyBdLCBbICdkZWZhdWx0Q29sb3JSYW5nZScgXSBdXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgdG9UcmFuc2xhdGUuZm9yRWFjaChmdW5jdGlvbihkLCBpKSB7XG4gICAgICAgICAgICAgICAgwrUudXRpbC50cmFuc2xhdG9yLmFwcGx5KG51bGwsIGQuY29uY2F0KHJldmVyc2UpKTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoIXJldmVyc2UpIHtcbiAgICAgICAgICAgICAgICBpZiAoci5hbmd1bGFyQXhpcyAmJiB0eXBlb2Ygci5hbmd1bGFyQXhpcy50aWNrbGVuICE9PSAndW5kZWZpbmVkJykgci50aWNrTGVuZ3RoID0gci5hbmd1bGFyQXhpcy50aWNrbGVuO1xuICAgICAgICAgICAgICAgIGlmIChyLmFuZ3VsYXJBeGlzICYmIHR5cGVvZiByLmFuZ3VsYXJBeGlzLnRpY2tjb2xvciAhPT0gJ3VuZGVmaW5lZCcpIHIudGlja0NvbG9yID0gci5hbmd1bGFyQXhpcy50aWNrY29sb3I7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygci50aWNrTGVuZ3RoICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgICAgICByLmFuZ3VsYXJheGlzLnRpY2tsZW4gPSByLnRpY2tMZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSByLnRpY2tMZW5ndGg7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChyLnRpY2tDb2xvcikge1xuICAgICAgICAgICAgICAgICAgICByLmFuZ3VsYXJheGlzLnRpY2tjb2xvciA9IHIudGlja0NvbG9yO1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgci50aWNrQ29sb3I7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHIubGVnZW5kICYmIHR5cGVvZiByLmxlZ2VuZC5yZXZlcnNlT3JkZXIgIT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgICAgci5sZWdlbmQucmV2ZXJzZU9yZGVyID0gci5sZWdlbmQucmV2ZXJzZU9yZGVyICE9ICdub3JtYWwnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHIubGVnZW5kICYmIHR5cGVvZiByLmxlZ2VuZC50cmFjZW9yZGVyID09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICAgIHIubGVnZW5kLnRyYWNlb3JkZXIgPSByLmxlZ2VuZC50cmFjZW9yZGVyID8gJ3JldmVyc2VkJyA6ICdub3JtYWwnO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByLmxlZ2VuZC5yZXZlcnNlT3JkZXI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoci5tYXJnaW4gJiYgdHlwZW9mIHIubWFyZ2luLnQgIT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgc291cmNlID0gWyAndCcsICdyJywgJ2InLCAnbCcsICdwYWQnIF07XG4gICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IFsgJ3RvcCcsICdyaWdodCcsICdib3R0b20nLCAnbGVmdCcsICdwYWQnIF07XG4gICAgICAgICAgICAgICAgdmFyIG1hcmdpbiA9IHt9O1xuICAgICAgICAgICAgICAgIGQzLmVudHJpZXMoci5tYXJnaW4pLmZvckVhY2goZnVuY3Rpb24oZEIsIGlCKSB7XG4gICAgICAgICAgICAgICAgICAgIG1hcmdpblt0YXJnZXRbc291cmNlLmluZGV4T2YoZEIua2V5KV1dID0gZEIudmFsdWU7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgci5tYXJnaW4gPSBtYXJnaW47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByLm5lZWRzRW5kU3BhY2luZztcbiAgICAgICAgICAgICAgICBkZWxldGUgci5taW5vclRpY2tDb2xvcjtcbiAgICAgICAgICAgICAgICBkZWxldGUgci5taW5vclRpY2tzO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByLmFuZ3VsYXJheGlzLnRpY2tzQ291bnQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHIuYW5ndWxhcmF4aXMudGlja3NDb3VudDtcbiAgICAgICAgICAgICAgICBkZWxldGUgci5hbmd1bGFyYXhpcy50aWNrc1N0ZXA7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHIuYW5ndWxhcmF4aXMucmV3cml0ZVRpY2tzO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByLmFuZ3VsYXJheGlzLm50aWNrcztcbiAgICAgICAgICAgICAgICBkZWxldGUgci5yYWRpYWxheGlzLnRpY2tzQ291bnQ7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHIucmFkaWFsYXhpcy50aWNrc0NvdW50O1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByLnJhZGlhbGF4aXMudGlja3NTdGVwO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByLnJhZGlhbGF4aXMucmV3cml0ZVRpY2tzO1xuICAgICAgICAgICAgICAgIGRlbGV0ZSByLnJhZGlhbGF4aXMubnRpY2tzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb3V0cHV0Q29uZmlnLmxheW91dCA9IHI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dHB1dENvbmZpZztcbiAgICB9O1xuICAgIHJldHVybiBleHBvcnRzO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbi8qIGVzbGludC1kaXNhYmxlIG5ldy1jYXAgKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIExpYiA9IHJlcXVpcmUoJy4uLy4uLy4uL2xpYicpO1xudmFyIENvbG9yID0gcmVxdWlyZSgnLi4vLi4vLi4vY29tcG9uZW50cy9jb2xvcicpO1xuXG52YXIgbWljcm9wb2xhciA9IHJlcXVpcmUoJy4vbWljcm9wb2xhcicpO1xudmFyIFVuZG9NYW5hZ2VyID0gcmVxdWlyZSgnLi91bmRvX21hbmFnZXInKTtcbnZhciBleHRlbmREZWVwQWxsID0gTGliLmV4dGVuZERlZXBBbGw7XG5cbnZhciBtYW5hZ2VyID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxubWFuYWdlci5mcmFtZXdvcmsgPSBmdW5jdGlvbihfZ2QpIHtcbiAgICB2YXIgY29uZmlnLCBwcmV2aW91c0NvbmZpZ0Nsb25lLCBwbG90LCBjb252ZXJ0ZWRJbnB1dCwgY29udGFpbmVyO1xuICAgIHZhciB1bmRvTWFuYWdlciA9IG5ldyBVbmRvTWFuYWdlcigpO1xuXG4gICAgZnVuY3Rpb24gZXhwb3J0cyhfaW5wdXRDb25maWcsIF9jb250YWluZXIpIHtcbiAgICAgICAgaWYoX2NvbnRhaW5lcikgY29udGFpbmVyID0gX2NvbnRhaW5lcjtcbiAgICAgICAgZDMuc2VsZWN0KGQzLnNlbGVjdChjb250YWluZXIpLm5vZGUoKS5wYXJlbnROb2RlKS5zZWxlY3RBbGwoJy5zdmctY29udGFpbmVyPio6bm90KC5jaGFydC1yb290KScpLnJlbW92ZSgpO1xuXG4gICAgICAgIGNvbmZpZyA9ICghY29uZmlnKSA/XG4gICAgICAgICAgICBfaW5wdXRDb25maWcgOlxuICAgICAgICAgICAgZXh0ZW5kRGVlcEFsbChjb25maWcsIF9pbnB1dENvbmZpZyk7XG5cbiAgICAgICAgaWYoIXBsb3QpIHBsb3QgPSBtaWNyb3BvbGFyLkF4aXMoKTtcbiAgICAgICAgY29udmVydGVkSW5wdXQgPSBtaWNyb3BvbGFyLmFkYXB0ZXIucGxvdGx5KCkuY29udmVydChjb25maWcpO1xuICAgICAgICBwbG90LmNvbmZpZyhjb252ZXJ0ZWRJbnB1dCkucmVuZGVyKGNvbnRhaW5lcik7XG4gICAgICAgIF9nZC5kYXRhID0gY29uZmlnLmRhdGE7XG4gICAgICAgIF9nZC5sYXlvdXQgPSBjb25maWcubGF5b3V0O1xuICAgICAgICBtYW5hZ2VyLmZpbGxMYXlvdXQoX2dkKTtcbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG4gICAgZXhwb3J0cy5pc1BvbGFyID0gdHJ1ZTtcbiAgICBleHBvcnRzLnN2ZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gcGxvdC5zdmcoKTsgfTtcbiAgICBleHBvcnRzLmdldENvbmZpZyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gY29uZmlnOyB9O1xuICAgIGV4cG9ydHMuZ2V0TGl2ZUNvbmZpZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gbWljcm9wb2xhci5hZGFwdGVyLnBsb3RseSgpLmNvbnZlcnQocGxvdC5nZXRMaXZlQ29uZmlnKCksIHRydWUpO1xuICAgIH07XG4gICAgZXhwb3J0cy5nZXRMaXZlU2NhbGVzID0gZnVuY3Rpb24oKSB7IHJldHVybiB7dDogcGxvdC5hbmd1bGFyU2NhbGUoKSwgcjogcGxvdC5yYWRpYWxTY2FsZSgpfTsgfTtcbiAgICBleHBvcnRzLnNldFVuZG9Qb2ludCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAgIHZhciBjb25maWdDbG9uZSA9IG1pY3JvcG9sYXIudXRpbC5jbG9uZUpzb24oY29uZmlnKTtcbiAgICAgICAgKGZ1bmN0aW9uKF9jb25maWdDbG9uZSwgX3ByZXZpb3VzQ29uZmlnQ2xvbmUpIHtcbiAgICAgICAgICAgIHVuZG9NYW5hZ2VyLmFkZCh7XG4gICAgICAgICAgICAgICAgdW5kbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmKF9wcmV2aW91c0NvbmZpZ0Nsb25lKSB0aGF0KF9wcmV2aW91c0NvbmZpZ0Nsb25lKTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlZG86IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB0aGF0KF9jb25maWdDbG9uZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pKGNvbmZpZ0Nsb25lLCBwcmV2aW91c0NvbmZpZ0Nsb25lKTtcbiAgICAgICAgcHJldmlvdXNDb25maWdDbG9uZSA9IG1pY3JvcG9sYXIudXRpbC5jbG9uZUpzb24oY29uZmlnQ2xvbmUpO1xuICAgIH07XG4gICAgZXhwb3J0cy51bmRvID0gZnVuY3Rpb24oKSB7IHVuZG9NYW5hZ2VyLnVuZG8oKTsgfTtcbiAgICBleHBvcnRzLnJlZG8gPSBmdW5jdGlvbigpIHsgdW5kb01hbmFnZXIucmVkbygpOyB9O1xuICAgIHJldHVybiBleHBvcnRzO1xufTtcblxubWFuYWdlci5maWxsTGF5b3V0ID0gZnVuY3Rpb24oX2dkKSB7XG4gICAgdmFyIGNvbnRhaW5lciA9IGQzLnNlbGVjdChfZ2QpLnNlbGVjdEFsbCgnLnBsb3QtY29udGFpbmVyJyk7XG4gICAgdmFyIHBhcGVyRGl2ID0gY29udGFpbmVyLnNlbGVjdEFsbCgnLnN2Zy1jb250YWluZXInKTtcbiAgICB2YXIgcGFwZXIgPSBfZ2QuZnJhbWV3b3JrICYmIF9nZC5mcmFtZXdvcmsuc3ZnICYmIF9nZC5mcmFtZXdvcmsuc3ZnKCk7XG4gICAgdmFyIGRmbHRzID0ge1xuICAgICAgICB3aWR0aDogODAwLFxuICAgICAgICBoZWlnaHQ6IDYwMCxcbiAgICAgICAgcGFwZXJfYmdjb2xvcjogQ29sb3IuYmFja2dyb3VuZCxcbiAgICAgICAgX2NvbnRhaW5lcjogY29udGFpbmVyLFxuICAgICAgICBfcGFwZXJkaXY6IHBhcGVyRGl2LFxuICAgICAgICBfcGFwZXI6IHBhcGVyXG4gICAgfTtcblxuICAgIF9nZC5fZnVsbExheW91dCA9IGV4dGVuZERlZXBBbGwoZGZsdHMsIF9nZC5sYXlvdXQpO1xufTtcbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8gTW9kaWZpZWQgZnJvbSBodHRwczovL2dpdGh1Yi5jb20vQXJ0aHVyQ2xlbWVucy9KYXZhc2NyaXB0LVVuZG8tTWFuYWdlclxuLy8gQ29weXJpZ2h0IChjKSAyMDEwLTIwMTMgQXJ0aHVyIENsZW1lbnMsIGFydGh1ckB2aXNpYmxlYXJlYS5jb21cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gVW5kb01hbmFnZXIoKSB7XG4gICAgdmFyIHVuZG9Db21tYW5kcyA9IFtdO1xuICAgIHZhciBpbmRleCA9IC0xO1xuICAgIHZhciBpc0V4ZWN1dGluZyA9IGZhbHNlO1xuICAgIHZhciBjYWxsYmFjaztcblxuICAgIGZ1bmN0aW9uIGV4ZWN1dGUoY29tbWFuZCwgYWN0aW9uKSB7XG4gICAgICAgIGlmKCFjb21tYW5kKSByZXR1cm4gdGhpcztcblxuICAgICAgICBpc0V4ZWN1dGluZyA9IHRydWU7XG4gICAgICAgIGNvbW1hbmRbYWN0aW9uXSgpO1xuICAgICAgICBpc0V4ZWN1dGluZyA9IGZhbHNlO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGFkZDogZnVuY3Rpb24oY29tbWFuZCkge1xuICAgICAgICAgICAgaWYoaXNFeGVjdXRpbmcpIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgdW5kb0NvbW1hbmRzLnNwbGljZShpbmRleCArIDEsIHVuZG9Db21tYW5kcy5sZW5ndGggLSBpbmRleCk7XG4gICAgICAgICAgICB1bmRvQ29tbWFuZHMucHVzaChjb21tYW5kKTtcbiAgICAgICAgICAgIGluZGV4ID0gdW5kb0NvbW1hbmRzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0Q2FsbGJhY2s6IGZ1bmN0aW9uKGNhbGxiYWNrRnVuYykgeyBjYWxsYmFjayA9IGNhbGxiYWNrRnVuYzsgfSxcbiAgICAgICAgdW5kbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IHVuZG9Db21tYW5kc1tpbmRleF07XG4gICAgICAgICAgICBpZighY29tbWFuZCkgcmV0dXJuIHRoaXM7XG4gICAgICAgICAgICBleGVjdXRlKGNvbW1hbmQsICd1bmRvJyk7XG4gICAgICAgICAgICBpbmRleCAtPSAxO1xuICAgICAgICAgICAgaWYoY2FsbGJhY2spIGNhbGxiYWNrKGNvbW1hbmQudW5kbyk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfSxcbiAgICAgICAgcmVkbzogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgY29tbWFuZCA9IHVuZG9Db21tYW5kc1tpbmRleCArIDFdO1xuICAgICAgICAgICAgaWYoIWNvbW1hbmQpIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgZXhlY3V0ZShjb21tYW5kLCAncmVkbycpO1xuICAgICAgICAgICAgaW5kZXggKz0gMTtcbiAgICAgICAgICAgIGlmKGNhbGxiYWNrKSBjYWxsYmFjayhjb21tYW5kLnJlZG8pO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH0sXG4gICAgICAgIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHVuZG9Db21tYW5kcyA9IFtdO1xuICAgICAgICAgICAgaW5kZXggPSAtMTtcbiAgICAgICAgfSxcbiAgICAgICAgaGFzVW5kbzogZnVuY3Rpb24oKSB7IHJldHVybiBpbmRleCAhPT0gLTE7IH0sXG4gICAgICAgIGhhc1JlZG86IGZ1bmN0aW9uKCkgeyByZXR1cm4gaW5kZXggPCAodW5kb0NvbW1hbmRzLmxlbmd0aCAtIDEpOyB9LFxuICAgICAgICBnZXRDb21tYW5kczogZnVuY3Rpb24oKSB7IHJldHVybiB1bmRvQ29tbWFuZHM7IH0sXG4gICAgICAgIGdldFByZXZpb3VzQ29tbWFuZDogZnVuY3Rpb24oKSB7IHJldHVybiB1bmRvQ29tbWFuZHNbaW5kZXggLSAxXTsgfSxcbiAgICAgICAgZ2V0SW5kZXg6IGZ1bmN0aW9uKCkgeyByZXR1cm4gaW5kZXg7IH1cbiAgICB9O1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=