(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_components_annotations_attributes_js"],{

/***/ "./node_modules/plotly.js/src/components/annotations/arrow_paths.js":
/*!**************************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/annotations/arrow_paths.js ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



/**
 * All paths are tuned for maximum scalability of the arrowhead,
 * ie throughout arrowwidth=0.3..3 the head is joined smoothly
 * to the line, with the line coming from the left and ending at (0, 0).
 *
 * `backoff` is the distance to move the arrowhead and the end of the line,
 * in order that the arrowhead points to the desired place, either at
 * the tip of the arrow or (in the case of circle or square)
 * the center of the symbol.
 *
 * `noRotate`, if truthy, says that this arrowhead should not rotate with the
 * arrow. That's the case for squares, which should always be straight, and
 * circles, for which it's irrelevant.
 */

module.exports = [
    // no arrow
    {
        path: '',
        backoff: 0
    },
    // wide with flat back
    {
        path: 'M-2.4,-3V3L0.6,0Z',
        backoff: 0.6
    },
    // narrower with flat back
    {
        path: 'M-3.7,-2.5V2.5L1.3,0Z',
        backoff: 1.3
    },
    // barbed
    {
        path: 'M-4.45,-3L-1.65,-0.2V0.2L-4.45,3L1.55,0Z',
        backoff: 1.55
    },
    // wide line-drawn
    {
        path: 'M-2.2,-2.2L-0.2,-0.2V0.2L-2.2,2.2L-1.4,3L1.6,0L-1.4,-3Z',
        backoff: 1.6
    },
    // narrower line-drawn
    {
        path: 'M-4.4,-2.1L-0.6,-0.2V0.2L-4.4,2.1L-4,3L2,0L-4,-3Z',
        backoff: 2
    },
    // circle
    {
        path: 'M2,0A2,2 0 1,1 0,-2A2,2 0 0,1 2,0Z',
        backoff: 0,
        noRotate: true
    },
    // square
    {
        path: 'M2,2V-2H-2V2Z',
        backoff: 0,
        noRotate: true
    }
];


/***/ }),

/***/ "./node_modules/plotly.js/src/components/annotations/attributes.js":
/*!*************************************************************************!*\
  !*** ./node_modules/plotly.js/src/components/annotations/attributes.js ***!
  \*************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var ARROWPATHS = __webpack_require__(/*! ./arrow_paths */ "./node_modules/plotly.js/src/components/annotations/arrow_paths.js");
var fontAttrs = __webpack_require__(/*! ../../plots/font_attributes */ "./node_modules/plotly.js/src/plots/font_attributes.js");
var cartesianConstants = __webpack_require__(/*! ../../plots/cartesian/constants */ "./node_modules/plotly.js/src/plots/cartesian/constants.js");
var templatedArray = __webpack_require__(/*! ../../plot_api/plot_template */ "./node_modules/plotly.js/src/plot_api/plot_template.js").templatedArray;


module.exports = templatedArray('annotation', {
    visible: {
        valType: 'boolean',
        role: 'info',
        dflt: true,
        editType: 'calc+arraydraw',
        description: [
            'Determines whether or not this annotation is visible.'
        ].join(' ')
    },

    text: {
        valType: 'string',
        role: 'info',
        editType: 'calc+arraydraw',
        description: [
            'Sets the text associated with this annotation.',
            'Plotly uses a subset of HTML tags to do things like',
            'newline (<br>), bold (<b></b>), italics (<i></i>),',
            'hyperlinks (<a href=\'...\'></a>). Tags <em>, <sup>, <sub>',
            '<span> are also supported.'
        ].join(' ')
    },
    textangle: {
        valType: 'angle',
        dflt: 0,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Sets the angle at which the `text` is drawn',
            'with respect to the horizontal.'
        ].join(' ')
    },
    font: fontAttrs({
        editType: 'calc+arraydraw',
        colorEditType: 'arraydraw',
        description: 'Sets the annotation text font.'
    }),
    width: {
        valType: 'number',
        min: 1,
        dflt: null,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Sets an explicit width for the text box. null (default) lets the',
            'text set the box width. Wider text will be clipped.',
            'There is no automatic wrapping; use <br> to start a new line.'
        ].join(' ')
    },
    height: {
        valType: 'number',
        min: 1,
        dflt: null,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Sets an explicit height for the text box. null (default) lets the',
            'text set the box height. Taller text will be clipped.'
        ].join(' ')
    },
    opacity: {
        valType: 'number',
        min: 0,
        max: 1,
        dflt: 1,
        role: 'style',
        editType: 'arraydraw',
        description: 'Sets the opacity of the annotation (text + arrow).'
    },
    align: {
        valType: 'enumerated',
        values: ['left', 'center', 'right'],
        dflt: 'center',
        role: 'style',
        editType: 'arraydraw',
        description: [
            'Sets the horizontal alignment of the `text` within the box.',
            'Has an effect only if `text` spans two or more lines',
            '(i.e. `text` contains one or more <br> HTML tags) or if an',
            'explicit width is set to override the text width.'
        ].join(' ')
    },
    valign: {
        valType: 'enumerated',
        values: ['top', 'middle', 'bottom'],
        dflt: 'middle',
        role: 'style',
        editType: 'arraydraw',
        description: [
            'Sets the vertical alignment of the `text` within the box.',
            'Has an effect only if an explicit height is set to override',
            'the text height.'
        ].join(' ')
    },
    bgcolor: {
        valType: 'color',
        dflt: 'rgba(0,0,0,0)',
        role: 'style',
        editType: 'arraydraw',
        description: 'Sets the background color of the annotation.'
    },
    bordercolor: {
        valType: 'color',
        dflt: 'rgba(0,0,0,0)',
        role: 'style',
        editType: 'arraydraw',
        description: [
            'Sets the color of the border enclosing the annotation `text`.'
        ].join(' ')
    },
    borderpad: {
        valType: 'number',
        min: 0,
        dflt: 1,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Sets the padding (in px) between the `text`',
            'and the enclosing border.'
        ].join(' ')
    },
    borderwidth: {
        valType: 'number',
        min: 0,
        dflt: 1,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Sets the width (in px) of the border enclosing',
            'the annotation `text`.'
        ].join(' ')
    },
    // arrow
    showarrow: {
        valType: 'boolean',
        dflt: true,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Determines whether or not the annotation is drawn with an arrow.',
            'If *true*, `text` is placed near the arrow\'s tail.',
            'If *false*, `text` lines up with the `x` and `y` provided.'
        ].join(' ')
    },
    arrowcolor: {
        valType: 'color',
        role: 'style',
        editType: 'arraydraw',
        description: 'Sets the color of the annotation arrow.'
    },
    arrowhead: {
        valType: 'integer',
        min: 0,
        max: ARROWPATHS.length,
        dflt: 1,
        role: 'style',
        editType: 'arraydraw',
        description: 'Sets the end annotation arrow head style.'
    },
    startarrowhead: {
        valType: 'integer',
        min: 0,
        max: ARROWPATHS.length,
        dflt: 1,
        role: 'style',
        editType: 'arraydraw',
        description: 'Sets the start annotation arrow head style.'
    },
    arrowside: {
        valType: 'flaglist',
        flags: ['end', 'start'],
        extras: ['none'],
        dflt: 'end',
        role: 'style',
        editType: 'arraydraw',
        description: 'Sets the annotation arrow head position.'
    },
    arrowsize: {
        valType: 'number',
        min: 0.3,
        dflt: 1,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Sets the size of the end annotation arrow head, relative to `arrowwidth`.',
            'A value of 1 (default) gives a head about 3x as wide as the line.'
        ].join(' ')
    },
    startarrowsize: {
        valType: 'number',
        min: 0.3,
        dflt: 1,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Sets the size of the start annotation arrow head, relative to `arrowwidth`.',
            'A value of 1 (default) gives a head about 3x as wide as the line.'
        ].join(' ')
    },
    arrowwidth: {
        valType: 'number',
        min: 0.1,
        role: 'style',
        editType: 'calc+arraydraw',
        description: 'Sets the width (in px) of annotation arrow line.'
    },
    standoff: {
        valType: 'number',
        min: 0,
        dflt: 0,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Sets a distance, in pixels, to move the end arrowhead away from the',
            'position it is pointing at, for example to point at the edge of',
            'a marker independent of zoom. Note that this shortens the arrow',
            'from the `ax` / `ay` vector, in contrast to `xshift` / `yshift`',
            'which moves everything by this amount.'
        ].join(' ')
    },
    startstandoff: {
        valType: 'number',
        min: 0,
        dflt: 0,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Sets a distance, in pixels, to move the start arrowhead away from the',
            'position it is pointing at, for example to point at the edge of',
            'a marker independent of zoom. Note that this shortens the arrow',
            'from the `ax` / `ay` vector, in contrast to `xshift` / `yshift`',
            'which moves everything by this amount.'
        ].join(' ')
    },
    ax: {
        valType: 'any',
        role: 'info',
        editType: 'calc+arraydraw',
        description: [
            'Sets the x component of the arrow tail about the arrow head.',
            'If `axref` is `pixel`, a positive (negative) ',
            'component corresponds to an arrow pointing',
            'from right to left (left to right).',
            'If `axref` is an axis, this is an absolute value on that axis,',
            'like `x`, NOT a relative value.'
        ].join(' ')
    },
    ay: {
        valType: 'any',
        role: 'info',
        editType: 'calc+arraydraw',
        description: [
            'Sets the y component of the arrow tail about the arrow head.',
            'If `ayref` is `pixel`, a positive (negative) ',
            'component corresponds to an arrow pointing',
            'from bottom to top (top to bottom).',
            'If `ayref` is an axis, this is an absolute value on that axis,',
            'like `y`, NOT a relative value.'
        ].join(' ')
    },
    axref: {
        valType: 'enumerated',
        dflt: 'pixel',
        values: [
            'pixel',
            cartesianConstants.idRegex.x.toString()
        ],
        role: 'info',
        editType: 'calc',
        description: [
            'Indicates in what terms the tail of the annotation (ax,ay) ',
            'is specified. If `pixel`, `ax` is a relative offset in pixels ',
            'from `x`. If set to an x axis id (e.g. *x* or *x2*), `ax` is ',
            'specified in the same terms as that axis. This is useful ',
            'for trendline annotations which should continue to indicate ',
            'the correct trend when zoomed.'
        ].join(' ')
    },
    ayref: {
        valType: 'enumerated',
        dflt: 'pixel',
        values: [
            'pixel',
            cartesianConstants.idRegex.y.toString()
        ],
        role: 'info',
        editType: 'calc',
        description: [
            'Indicates in what terms the tail of the annotation (ax,ay) ',
            'is specified. If `pixel`, `ay` is a relative offset in pixels ',
            'from `y`. If set to a y axis id (e.g. *y* or *y2*), `ay` is ',
            'specified in the same terms as that axis. This is useful ',
            'for trendline annotations which should continue to indicate ',
            'the correct trend when zoomed.'
        ].join(' ')
    },
    // positioning
    xref: {
        valType: 'enumerated',
        values: [
            'paper',
            cartesianConstants.idRegex.x.toString()
        ],
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the annotation\'s x coordinate axis.',
            'If set to an x axis id (e.g. *x* or *x2*), the `x` position',
            'refers to an x coordinate',
            'If set to *paper*, the `x` position refers to the distance from',
            'the left side of the plotting area in normalized coordinates',
            'where 0 (1) corresponds to the left (right) side.'
        ].join(' ')
    },
    x: {
        valType: 'any',
        role: 'info',
        editType: 'calc+arraydraw',
        description: [
            'Sets the annotation\'s x position.',
            'If the axis `type` is *log*, then you must take the',
            'log of your desired range.',
            'If the axis `type` is *date*, it should be date strings,',
            'like date data, though Date objects and unix milliseconds',
            'will be accepted and converted to strings.',
            'If the axis `type` is *category*, it should be numbers,',
            'using the scale where each category is assigned a serial',
            'number from zero in the order it appears.'
        ].join(' ')
    },
    xanchor: {
        valType: 'enumerated',
        values: ['auto', 'left', 'center', 'right'],
        dflt: 'auto',
        role: 'info',
        editType: 'calc+arraydraw',
        description: [
            'Sets the text box\'s horizontal position anchor',
            'This anchor binds the `x` position to the *left*, *center*',
            'or *right* of the annotation.',
            'For example, if `x` is set to 1, `xref` to *paper* and',
            '`xanchor` to *right* then the right-most portion of the',
            'annotation lines up with the right-most edge of the',
            'plotting area.',
            'If *auto*, the anchor is equivalent to *center* for',
            'data-referenced annotations or if there is an arrow,',
            'whereas for paper-referenced with no arrow, the anchor picked',
            'corresponds to the closest side.'
        ].join(' ')
    },
    xshift: {
        valType: 'number',
        dflt: 0,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Shifts the position of the whole annotation and arrow to the',
            'right (positive) or left (negative) by this many pixels.'
        ].join(' ')
    },
    yref: {
        valType: 'enumerated',
        values: [
            'paper',
            cartesianConstants.idRegex.y.toString()
        ],
        role: 'info',
        editType: 'calc',
        description: [
            'Sets the annotation\'s y coordinate axis.',
            'If set to an y axis id (e.g. *y* or *y2*), the `y` position',
            'refers to an y coordinate',
            'If set to *paper*, the `y` position refers to the distance from',
            'the bottom of the plotting area in normalized coordinates',
            'where 0 (1) corresponds to the bottom (top).'
        ].join(' ')
    },
    y: {
        valType: 'any',
        role: 'info',
        editType: 'calc+arraydraw',
        description: [
            'Sets the annotation\'s y position.',
            'If the axis `type` is *log*, then you must take the',
            'log of your desired range.',
            'If the axis `type` is *date*, it should be date strings,',
            'like date data, though Date objects and unix milliseconds',
            'will be accepted and converted to strings.',
            'If the axis `type` is *category*, it should be numbers,',
            'using the scale where each category is assigned a serial',
            'number from zero in the order it appears.'
        ].join(' ')
    },
    yanchor: {
        valType: 'enumerated',
        values: ['auto', 'top', 'middle', 'bottom'],
        dflt: 'auto',
        role: 'info',
        editType: 'calc+arraydraw',
        description: [
            'Sets the text box\'s vertical position anchor',
            'This anchor binds the `y` position to the *top*, *middle*',
            'or *bottom* of the annotation.',
            'For example, if `y` is set to 1, `yref` to *paper* and',
            '`yanchor` to *top* then the top-most portion of the',
            'annotation lines up with the top-most edge of the',
            'plotting area.',
            'If *auto*, the anchor is equivalent to *middle* for',
            'data-referenced annotations or if there is an arrow,',
            'whereas for paper-referenced with no arrow, the anchor picked',
            'corresponds to the closest side.'
        ].join(' ')
    },
    yshift: {
        valType: 'number',
        dflt: 0,
        role: 'style',
        editType: 'calc+arraydraw',
        description: [
            'Shifts the position of the whole annotation and arrow up',
            '(positive) or down (negative) by this many pixels.'
        ].join(' ')
    },
    clicktoshow: {
        valType: 'enumerated',
        values: [false, 'onoff', 'onout'],
        dflt: false,
        role: 'style',
        editType: 'arraydraw',
        description: [
            'Makes this annotation respond to clicks on the plot.',
            'If you click a data point that exactly matches the `x` and `y`',
            'values of this annotation, and it is hidden (visible: false),',
            'it will appear. In *onoff* mode, you must click the same point',
            'again to make it disappear, so if you click multiple points,',
            'you can show multiple annotations. In *onout* mode, a click',
            'anywhere else in the plot (on another data point or not) will',
            'hide this annotation.',
            'If you need to show/hide this annotation in response to different',
            '`x` or `y` values, you can set `xclick` and/or `yclick`. This is',
            'useful for example to label the side of a bar. To label markers',
            'though, `standoff` is preferred over `xclick` and `yclick`.'
        ].join(' ')
    },
    xclick: {
        valType: 'any',
        role: 'info',
        editType: 'arraydraw',
        description: [
            'Toggle this annotation when clicking a data point whose `x` value',
            'is `xclick` rather than the annotation\'s `x` value.'
        ].join(' ')
    },
    yclick: {
        valType: 'any',
        role: 'info',
        editType: 'arraydraw',
        description: [
            'Toggle this annotation when clicking a data point whose `y` value',
            'is `yclick` rather than the annotation\'s `y` value.'
        ].join(' ')
    },
    hovertext: {
        valType: 'string',
        role: 'info',
        editType: 'arraydraw',
        description: [
            'Sets text to appear when hovering over this annotation.',
            'If omitted or blank, no hover label will appear.'
        ].join(' ')
    },
    hoverlabel: {
        bgcolor: {
            valType: 'color',
            role: 'style',
            editType: 'arraydraw',
            description: [
                'Sets the background color of the hover label.',
                'By default uses the annotation\'s `bgcolor` made opaque,',
                'or white if it was transparent.'
            ].join(' ')
        },
        bordercolor: {
            valType: 'color',
            role: 'style',
            editType: 'arraydraw',
            description: [
                'Sets the border color of the hover label.',
                'By default uses either dark grey or white, for maximum',
                'contrast with `hoverlabel.bgcolor`.'
            ].join(' ')
        },
        font: fontAttrs({
            editType: 'arraydraw',
            description: [
                'Sets the hover label text font.',
                'By default uses the global hover font and size,',
                'with color from `hoverlabel.bordercolor`.'
            ].join(' ')
        }),
        editType: 'arraydraw'
    },
    captureevents: {
        valType: 'boolean',
        role: 'info',
        editType: 'arraydraw',
        description: [
            'Determines whether the annotation text box captures mouse move',
            'and click events, or allows those events to pass through to data',
            'points in the plot that may be behind the annotation. By default',
            '`captureevents` is *false* unless `hovertext` is provided.',
            'If you use the event `plotly_clickannotation` without `hovertext`',
            'you must explicitly enable `captureevents`.'
        ].join(' ')
    },
    editType: 'calc',

    _deprecated: {
        ref: {
            valType: 'string',
            role: 'info',
            editType: 'calc',
            description: [
                'Obsolete. Set `xref` and `yref` separately instead.'
            ].join(' ')
        }
    }
});


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29tcG9uZW50cy9hbm5vdGF0aW9ucy9hcnJvd19wYXRocy5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvY29tcG9uZW50cy9hbm5vdGF0aW9ucy9hdHRyaWJ1dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRWE7O0FBRWIsaUJBQWlCLG1CQUFPLENBQUMseUZBQWU7QUFDeEMsZ0JBQWdCLG1CQUFPLENBQUMsMEZBQTZCO0FBQ3JELHlCQUF5QixtQkFBTyxDQUFDLGtHQUFpQztBQUNsRSxxQkFBcUIsZ0lBQXNEOzs7QUFHM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEM7QUFDNUM7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJmaWxlIjoiY2hhcnQ3MDE2YzVmOTFhZGE5N2JkNTY3OC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cbid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBBbGwgcGF0aHMgYXJlIHR1bmVkIGZvciBtYXhpbXVtIHNjYWxhYmlsaXR5IG9mIHRoZSBhcnJvd2hlYWQsXG4gKiBpZSB0aHJvdWdob3V0IGFycm93d2lkdGg9MC4zLi4zIHRoZSBoZWFkIGlzIGpvaW5lZCBzbW9vdGhseVxuICogdG8gdGhlIGxpbmUsIHdpdGggdGhlIGxpbmUgY29taW5nIGZyb20gdGhlIGxlZnQgYW5kIGVuZGluZyBhdCAoMCwgMCkuXG4gKlxuICogYGJhY2tvZmZgIGlzIHRoZSBkaXN0YW5jZSB0byBtb3ZlIHRoZSBhcnJvd2hlYWQgYW5kIHRoZSBlbmQgb2YgdGhlIGxpbmUsXG4gKiBpbiBvcmRlciB0aGF0IHRoZSBhcnJvd2hlYWQgcG9pbnRzIHRvIHRoZSBkZXNpcmVkIHBsYWNlLCBlaXRoZXIgYXRcbiAqIHRoZSB0aXAgb2YgdGhlIGFycm93IG9yIChpbiB0aGUgY2FzZSBvZiBjaXJjbGUgb3Igc3F1YXJlKVxuICogdGhlIGNlbnRlciBvZiB0aGUgc3ltYm9sLlxuICpcbiAqIGBub1JvdGF0ZWAsIGlmIHRydXRoeSwgc2F5cyB0aGF0IHRoaXMgYXJyb3doZWFkIHNob3VsZCBub3Qgcm90YXRlIHdpdGggdGhlXG4gKiBhcnJvdy4gVGhhdCdzIHRoZSBjYXNlIGZvciBzcXVhcmVzLCB3aGljaCBzaG91bGQgYWx3YXlzIGJlIHN0cmFpZ2h0LCBhbmRcbiAqIGNpcmNsZXMsIGZvciB3aGljaCBpdCdzIGlycmVsZXZhbnQuXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBbXG4gICAgLy8gbm8gYXJyb3dcbiAgICB7XG4gICAgICAgIHBhdGg6ICcnLFxuICAgICAgICBiYWNrb2ZmOiAwXG4gICAgfSxcbiAgICAvLyB3aWRlIHdpdGggZmxhdCBiYWNrXG4gICAge1xuICAgICAgICBwYXRoOiAnTS0yLjQsLTNWM0wwLjYsMFonLFxuICAgICAgICBiYWNrb2ZmOiAwLjZcbiAgICB9LFxuICAgIC8vIG5hcnJvd2VyIHdpdGggZmxhdCBiYWNrXG4gICAge1xuICAgICAgICBwYXRoOiAnTS0zLjcsLTIuNVYyLjVMMS4zLDBaJyxcbiAgICAgICAgYmFja29mZjogMS4zXG4gICAgfSxcbiAgICAvLyBiYXJiZWRcbiAgICB7XG4gICAgICAgIHBhdGg6ICdNLTQuNDUsLTNMLTEuNjUsLTAuMlYwLjJMLTQuNDUsM0wxLjU1LDBaJyxcbiAgICAgICAgYmFja29mZjogMS41NVxuICAgIH0sXG4gICAgLy8gd2lkZSBsaW5lLWRyYXduXG4gICAge1xuICAgICAgICBwYXRoOiAnTS0yLjIsLTIuMkwtMC4yLC0wLjJWMC4yTC0yLjIsMi4yTC0xLjQsM0wxLjYsMEwtMS40LC0zWicsXG4gICAgICAgIGJhY2tvZmY6IDEuNlxuICAgIH0sXG4gICAgLy8gbmFycm93ZXIgbGluZS1kcmF3blxuICAgIHtcbiAgICAgICAgcGF0aDogJ00tNC40LC0yLjFMLTAuNiwtMC4yVjAuMkwtNC40LDIuMUwtNCwzTDIsMEwtNCwtM1onLFxuICAgICAgICBiYWNrb2ZmOiAyXG4gICAgfSxcbiAgICAvLyBjaXJjbGVcbiAgICB7XG4gICAgICAgIHBhdGg6ICdNMiwwQTIsMiAwIDEsMSAwLC0yQTIsMiAwIDAsMSAyLDBaJyxcbiAgICAgICAgYmFja29mZjogMCxcbiAgICAgICAgbm9Sb3RhdGU6IHRydWVcbiAgICB9LFxuICAgIC8vIHNxdWFyZVxuICAgIHtcbiAgICAgICAgcGF0aDogJ00yLDJWLTJILTJWMlonLFxuICAgICAgICBiYWNrb2ZmOiAwLFxuICAgICAgICBub1JvdGF0ZTogdHJ1ZVxuICAgIH1cbl07XG4iLCIvKipcbiogQ29weXJpZ2h0IDIwMTItMjAyMCwgUGxvdGx5LCBJbmMuXG4qIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4qXG4qIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuKiBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4qL1xuXG4ndXNlIHN0cmljdCc7XG5cbnZhciBBUlJPV1BBVEhTID0gcmVxdWlyZSgnLi9hcnJvd19wYXRocycpO1xudmFyIGZvbnRBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2ZvbnRfYXR0cmlidXRlcycpO1xudmFyIGNhcnRlc2lhbkNvbnN0YW50cyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2NhcnRlc2lhbi9jb25zdGFudHMnKTtcbnZhciB0ZW1wbGF0ZWRBcnJheSA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL3Bsb3RfdGVtcGxhdGUnKS50ZW1wbGF0ZWRBcnJheTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHRlbXBsYXRlZEFycmF5KCdhbm5vdGF0aW9uJywge1xuICAgIHZpc2libGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6IHRydWUsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgdGhpcyBhbm5vdGF0aW9uIGlzIHZpc2libGUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG5cbiAgICB0ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHRleHQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgYW5ub3RhdGlvbi4nLFxuICAgICAgICAgICAgJ1Bsb3RseSB1c2VzIGEgc3Vic2V0IG9mIEhUTUwgdGFncyB0byBkbyB0aGluZ3MgbGlrZScsXG4gICAgICAgICAgICAnbmV3bGluZSAoPGJyPiksIGJvbGQgKDxiPjwvYj4pLCBpdGFsaWNzICg8aT48L2k+KSwnLFxuICAgICAgICAgICAgJ2h5cGVybGlua3MgKDxhIGhyZWY9XFwnLi4uXFwnPjwvYT4pLiBUYWdzIDxlbT4sIDxzdXA+LCA8c3ViPicsXG4gICAgICAgICAgICAnPHNwYW4+IGFyZSBhbHNvIHN1cHBvcnRlZC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB0ZXh0YW5nbGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2FuZ2xlJyxcbiAgICAgICAgZGZsdDogMCxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYW5nbGUgYXQgd2hpY2ggdGhlIGB0ZXh0YCBpcyBkcmF3bicsXG4gICAgICAgICAgICAnd2l0aCByZXNwZWN0IHRvIHRoZSBob3Jpem9udGFsLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGZvbnQ6IGZvbnRBdHRycyh7XG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBjb2xvckVkaXRUeXBlOiAnYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSBhbm5vdGF0aW9uIHRleHQgZm9udC4nXG4gICAgfSksXG4gICAgd2lkdGg6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMSxcbiAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyBhbiBleHBsaWNpdCB3aWR0aCBmb3IgdGhlIHRleHQgYm94LiBudWxsIChkZWZhdWx0KSBsZXRzIHRoZScsXG4gICAgICAgICAgICAndGV4dCBzZXQgdGhlIGJveCB3aWR0aC4gV2lkZXIgdGV4dCB3aWxsIGJlIGNsaXBwZWQuJyxcbiAgICAgICAgICAgICdUaGVyZSBpcyBubyBhdXRvbWF0aWMgd3JhcHBpbmc7IHVzZSA8YnI+IHRvIHN0YXJ0IGEgbmV3IGxpbmUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgaGVpZ2h0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDEsXG4gICAgICAgIGRmbHQ6IG51bGwsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgYW4gZXhwbGljaXQgaGVpZ2h0IGZvciB0aGUgdGV4dCBib3guIG51bGwgKGRlZmF1bHQpIGxldHMgdGhlJyxcbiAgICAgICAgICAgICd0ZXh0IHNldCB0aGUgYm94IGhlaWdodC4gVGFsbGVyIHRleHQgd2lsbCBiZSBjbGlwcGVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIG9wYWNpdHk6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiAxLFxuICAgICAgICBkZmx0OiAxLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgb3BhY2l0eSBvZiB0aGUgYW5ub3RhdGlvbiAodGV4dCArIGFycm93KS4nXG4gICAgfSxcbiAgICBhbGlnbjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogWydsZWZ0JywgJ2NlbnRlcicsICdyaWdodCddLFxuICAgICAgICBkZmx0OiAnY2VudGVyJyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdhcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGhvcml6b250YWwgYWxpZ25tZW50IG9mIHRoZSBgdGV4dGAgd2l0aGluIHRoZSBib3guJyxcbiAgICAgICAgICAgICdIYXMgYW4gZWZmZWN0IG9ubHkgaWYgYHRleHRgIHNwYW5zIHR3byBvciBtb3JlIGxpbmVzJyxcbiAgICAgICAgICAgICcoaS5lLiBgdGV4dGAgY29udGFpbnMgb25lIG9yIG1vcmUgPGJyPiBIVE1MIHRhZ3MpIG9yIGlmIGFuJyxcbiAgICAgICAgICAgICdleHBsaWNpdCB3aWR0aCBpcyBzZXQgdG8gb3ZlcnJpZGUgdGhlIHRleHQgd2lkdGguJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgdmFsaWduOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ3RvcCcsICdtaWRkbGUnLCAnYm90dG9tJ10sXG4gICAgICAgIGRmbHQ6ICdtaWRkbGUnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgdmVydGljYWwgYWxpZ25tZW50IG9mIHRoZSBgdGV4dGAgd2l0aGluIHRoZSBib3guJyxcbiAgICAgICAgICAgICdIYXMgYW4gZWZmZWN0IG9ubHkgaWYgYW4gZXhwbGljaXQgaGVpZ2h0IGlzIHNldCB0byBvdmVycmlkZScsXG4gICAgICAgICAgICAndGhlIHRleHQgaGVpZ2h0LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGJnY29sb3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgZGZsdDogJ3JnYmEoMCwwLDAsMCknLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgYW5ub3RhdGlvbi4nXG4gICAgfSxcbiAgICBib3JkZXJjb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICBkZmx0OiAncmdiYSgwLDAsMCwwKScsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBjb2xvciBvZiB0aGUgYm9yZGVyIGVuY2xvc2luZyB0aGUgYW5ub3RhdGlvbiBgdGV4dGAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYm9yZGVycGFkOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHBhZGRpbmcgKGluIHB4KSBiZXR3ZWVuIHRoZSBgdGV4dGAnLFxuICAgICAgICAgICAgJ2FuZCB0aGUgZW5jbG9zaW5nIGJvcmRlci4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBib3JkZXJ3aWR0aDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBkZmx0OiAxLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSB3aWR0aCAoaW4gcHgpIG9mIHRoZSBib3JkZXIgZW5jbG9zaW5nJyxcbiAgICAgICAgICAgICd0aGUgYW5ub3RhdGlvbiBgdGV4dGAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgLy8gYXJyb3dcbiAgICBzaG93YXJyb3c6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICBkZmx0OiB0cnVlLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBhbm5vdGF0aW9uIGlzIGRyYXduIHdpdGggYW4gYXJyb3cuJyxcbiAgICAgICAgICAgICdJZiAqdHJ1ZSosIGB0ZXh0YCBpcyBwbGFjZWQgbmVhciB0aGUgYXJyb3dcXCdzIHRhaWwuJyxcbiAgICAgICAgICAgICdJZiAqZmFsc2UqLCBgdGV4dGAgbGluZXMgdXAgd2l0aCB0aGUgYHhgIGFuZCBgeWAgcHJvdmlkZWQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYXJyb3djb2xvcjoge1xuICAgICAgICB2YWxUeXBlOiAnY29sb3InLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29sb3Igb2YgdGhlIGFubm90YXRpb24gYXJyb3cuJ1xuICAgIH0sXG4gICAgYXJyb3doZWFkOiB7XG4gICAgICAgIHZhbFR5cGU6ICdpbnRlZ2VyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBtYXg6IEFSUk9XUEFUSFMubGVuZ3RoLFxuICAgICAgICBkZmx0OiAxLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgZW5kIGFubm90YXRpb24gYXJyb3cgaGVhZCBzdHlsZS4nXG4gICAgfSxcbiAgICBzdGFydGFycm93aGVhZDoge1xuICAgICAgICB2YWxUeXBlOiAnaW50ZWdlcicsXG4gICAgICAgIG1pbjogMCxcbiAgICAgICAgbWF4OiBBUlJPV1BBVEhTLmxlbmd0aCxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdhcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHN0YXJ0IGFubm90YXRpb24gYXJyb3cgaGVhZCBzdHlsZS4nXG4gICAgfSxcbiAgICBhcnJvd3NpZGU6IHtcbiAgICAgICAgdmFsVHlwZTogJ2ZsYWdsaXN0JyxcbiAgICAgICAgZmxhZ3M6IFsnZW5kJywgJ3N0YXJ0J10sXG4gICAgICAgIGV4dHJhczogWydub25lJ10sXG4gICAgICAgIGRmbHQ6ICdlbmQnLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgYW5ub3RhdGlvbiBhcnJvdyBoZWFkIHBvc2l0aW9uLidcbiAgICB9LFxuICAgIGFycm93c2l6ZToge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLjMsXG4gICAgICAgIGRmbHQ6IDEsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHNpemUgb2YgdGhlIGVuZCBhbm5vdGF0aW9uIGFycm93IGhlYWQsIHJlbGF0aXZlIHRvIGBhcnJvd3dpZHRoYC4nLFxuICAgICAgICAgICAgJ0EgdmFsdWUgb2YgMSAoZGVmYXVsdCkgZ2l2ZXMgYSBoZWFkIGFib3V0IDN4IGFzIHdpZGUgYXMgdGhlIGxpbmUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgc3RhcnRhcnJvd3NpemU6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIG1pbjogMC4zLFxuICAgICAgICBkZmx0OiAxLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBzaXplIG9mIHRoZSBzdGFydCBhbm5vdGF0aW9uIGFycm93IGhlYWQsIHJlbGF0aXZlIHRvIGBhcnJvd3dpZHRoYC4nLFxuICAgICAgICAgICAgJ0EgdmFsdWUgb2YgMSAoZGVmYXVsdCkgZ2l2ZXMgYSBoZWFkIGFib3V0IDN4IGFzIHdpZGUgYXMgdGhlIGxpbmUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYXJyb3d3aWR0aDoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLjEsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHdpZHRoIChpbiBweCkgb2YgYW5ub3RhdGlvbiBhcnJvdyBsaW5lLidcbiAgICB9LFxuICAgIHN0YW5kb2ZmOiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIGRmbHQ6IDAsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgYSBkaXN0YW5jZSwgaW4gcGl4ZWxzLCB0byBtb3ZlIHRoZSBlbmQgYXJyb3doZWFkIGF3YXkgZnJvbSB0aGUnLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uIGl0IGlzIHBvaW50aW5nIGF0LCBmb3IgZXhhbXBsZSB0byBwb2ludCBhdCB0aGUgZWRnZSBvZicsXG4gICAgICAgICAgICAnYSBtYXJrZXIgaW5kZXBlbmRlbnQgb2Ygem9vbS4gTm90ZSB0aGF0IHRoaXMgc2hvcnRlbnMgdGhlIGFycm93JyxcbiAgICAgICAgICAgICdmcm9tIHRoZSBgYXhgIC8gYGF5YCB2ZWN0b3IsIGluIGNvbnRyYXN0IHRvIGB4c2hpZnRgIC8gYHlzaGlmdGAnLFxuICAgICAgICAgICAgJ3doaWNoIG1vdmVzIGV2ZXJ5dGhpbmcgYnkgdGhpcyBhbW91bnQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgc3RhcnRzdGFuZG9mZjoge1xuICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgbWluOiAwLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIGEgZGlzdGFuY2UsIGluIHBpeGVscywgdG8gbW92ZSB0aGUgc3RhcnQgYXJyb3doZWFkIGF3YXkgZnJvbSB0aGUnLFxuICAgICAgICAgICAgJ3Bvc2l0aW9uIGl0IGlzIHBvaW50aW5nIGF0LCBmb3IgZXhhbXBsZSB0byBwb2ludCBhdCB0aGUgZWRnZSBvZicsXG4gICAgICAgICAgICAnYSBtYXJrZXIgaW5kZXBlbmRlbnQgb2Ygem9vbS4gTm90ZSB0aGF0IHRoaXMgc2hvcnRlbnMgdGhlIGFycm93JyxcbiAgICAgICAgICAgICdmcm9tIHRoZSBgYXhgIC8gYGF5YCB2ZWN0b3IsIGluIGNvbnRyYXN0IHRvIGB4c2hpZnRgIC8gYHlzaGlmdGAnLFxuICAgICAgICAgICAgJ3doaWNoIG1vdmVzIGV2ZXJ5dGhpbmcgYnkgdGhpcyBhbW91bnQuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYXg6IHtcbiAgICAgICAgdmFsVHlwZTogJ2FueScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgeCBjb21wb25lbnQgb2YgdGhlIGFycm93IHRhaWwgYWJvdXQgdGhlIGFycm93IGhlYWQuJyxcbiAgICAgICAgICAgICdJZiBgYXhyZWZgIGlzIGBwaXhlbGAsIGEgcG9zaXRpdmUgKG5lZ2F0aXZlKSAnLFxuICAgICAgICAgICAgJ2NvbXBvbmVudCBjb3JyZXNwb25kcyB0byBhbiBhcnJvdyBwb2ludGluZycsXG4gICAgICAgICAgICAnZnJvbSByaWdodCB0byBsZWZ0IChsZWZ0IHRvIHJpZ2h0KS4nLFxuICAgICAgICAgICAgJ0lmIGBheHJlZmAgaXMgYW4gYXhpcywgdGhpcyBpcyBhbiBhYnNvbHV0ZSB2YWx1ZSBvbiB0aGF0IGF4aXMsJyxcbiAgICAgICAgICAgICdsaWtlIGB4YCwgTk9UIGEgcmVsYXRpdmUgdmFsdWUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYXk6IHtcbiAgICAgICAgdmFsVHlwZTogJ2FueScsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgeSBjb21wb25lbnQgb2YgdGhlIGFycm93IHRhaWwgYWJvdXQgdGhlIGFycm93IGhlYWQuJyxcbiAgICAgICAgICAgICdJZiBgYXlyZWZgIGlzIGBwaXhlbGAsIGEgcG9zaXRpdmUgKG5lZ2F0aXZlKSAnLFxuICAgICAgICAgICAgJ2NvbXBvbmVudCBjb3JyZXNwb25kcyB0byBhbiBhcnJvdyBwb2ludGluZycsXG4gICAgICAgICAgICAnZnJvbSBib3R0b20gdG8gdG9wICh0b3AgdG8gYm90dG9tKS4nLFxuICAgICAgICAgICAgJ0lmIGBheXJlZmAgaXMgYW4gYXhpcywgdGhpcyBpcyBhbiBhYnNvbHV0ZSB2YWx1ZSBvbiB0aGF0IGF4aXMsJyxcbiAgICAgICAgICAgICdsaWtlIGB5YCwgTk9UIGEgcmVsYXRpdmUgdmFsdWUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgYXhyZWY6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICBkZmx0OiAncGl4ZWwnLFxuICAgICAgICB2YWx1ZXM6IFtcbiAgICAgICAgICAgICdwaXhlbCcsXG4gICAgICAgICAgICBjYXJ0ZXNpYW5Db25zdGFudHMuaWRSZWdleC54LnRvU3RyaW5nKClcbiAgICAgICAgXSxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0luZGljYXRlcyBpbiB3aGF0IHRlcm1zIHRoZSB0YWlsIG9mIHRoZSBhbm5vdGF0aW9uIChheCxheSkgJyxcbiAgICAgICAgICAgICdpcyBzcGVjaWZpZWQuIElmIGBwaXhlbGAsIGBheGAgaXMgYSByZWxhdGl2ZSBvZmZzZXQgaW4gcGl4ZWxzICcsXG4gICAgICAgICAgICAnZnJvbSBgeGAuIElmIHNldCB0byBhbiB4IGF4aXMgaWQgKGUuZy4gKngqIG9yICp4MiopLCBgYXhgIGlzICcsXG4gICAgICAgICAgICAnc3BlY2lmaWVkIGluIHRoZSBzYW1lIHRlcm1zIGFzIHRoYXQgYXhpcy4gVGhpcyBpcyB1c2VmdWwgJyxcbiAgICAgICAgICAgICdmb3IgdHJlbmRsaW5lIGFubm90YXRpb25zIHdoaWNoIHNob3VsZCBjb250aW51ZSB0byBpbmRpY2F0ZSAnLFxuICAgICAgICAgICAgJ3RoZSBjb3JyZWN0IHRyZW5kIHdoZW4gem9vbWVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGF5cmVmOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgZGZsdDogJ3BpeGVsJyxcbiAgICAgICAgdmFsdWVzOiBbXG4gICAgICAgICAgICAncGl4ZWwnLFxuICAgICAgICAgICAgY2FydGVzaWFuQ29uc3RhbnRzLmlkUmVnZXgueS50b1N0cmluZygpXG4gICAgICAgIF0sXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdJbmRpY2F0ZXMgaW4gd2hhdCB0ZXJtcyB0aGUgdGFpbCBvZiB0aGUgYW5ub3RhdGlvbiAoYXgsYXkpICcsXG4gICAgICAgICAgICAnaXMgc3BlY2lmaWVkLiBJZiBgcGl4ZWxgLCBgYXlgIGlzIGEgcmVsYXRpdmUgb2Zmc2V0IGluIHBpeGVscyAnLFxuICAgICAgICAgICAgJ2Zyb20gYHlgLiBJZiBzZXQgdG8gYSB5IGF4aXMgaWQgKGUuZy4gKnkqIG9yICp5MiopLCBgYXlgIGlzICcsXG4gICAgICAgICAgICAnc3BlY2lmaWVkIGluIHRoZSBzYW1lIHRlcm1zIGFzIHRoYXQgYXhpcy4gVGhpcyBpcyB1c2VmdWwgJyxcbiAgICAgICAgICAgICdmb3IgdHJlbmRsaW5lIGFubm90YXRpb25zIHdoaWNoIHNob3VsZCBjb250aW51ZSB0byBpbmRpY2F0ZSAnLFxuICAgICAgICAgICAgJ3RoZSBjb3JyZWN0IHRyZW5kIHdoZW4gem9vbWVkLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIC8vIHBvc2l0aW9uaW5nXG4gICAgeHJlZjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgJ3BhcGVyJyxcbiAgICAgICAgICAgIGNhcnRlc2lhbkNvbnN0YW50cy5pZFJlZ2V4LngudG9TdHJpbmcoKVxuICAgICAgICBdLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYW5ub3RhdGlvblxcJ3MgeCBjb29yZGluYXRlIGF4aXMuJyxcbiAgICAgICAgICAgICdJZiBzZXQgdG8gYW4geCBheGlzIGlkIChlLmcuICp4KiBvciAqeDIqKSwgdGhlIGB4YCBwb3NpdGlvbicsXG4gICAgICAgICAgICAncmVmZXJzIHRvIGFuIHggY29vcmRpbmF0ZScsXG4gICAgICAgICAgICAnSWYgc2V0IHRvICpwYXBlciosIHRoZSBgeGAgcG9zaXRpb24gcmVmZXJzIHRvIHRoZSBkaXN0YW5jZSBmcm9tJyxcbiAgICAgICAgICAgICd0aGUgbGVmdCBzaWRlIG9mIHRoZSBwbG90dGluZyBhcmVhIGluIG5vcm1hbGl6ZWQgY29vcmRpbmF0ZXMnLFxuICAgICAgICAgICAgJ3doZXJlIDAgKDEpIGNvcnJlc3BvbmRzIHRvIHRoZSBsZWZ0IChyaWdodCkgc2lkZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB4OiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIGFubm90YXRpb25cXCdzIHggcG9zaXRpb24uJyxcbiAgICAgICAgICAgICdJZiB0aGUgYXhpcyBgdHlwZWAgaXMgKmxvZyosIHRoZW4geW91IG11c3QgdGFrZSB0aGUnLFxuICAgICAgICAgICAgJ2xvZyBvZiB5b3VyIGRlc2lyZWQgcmFuZ2UuJyxcbiAgICAgICAgICAgICdJZiB0aGUgYXhpcyBgdHlwZWAgaXMgKmRhdGUqLCBpdCBzaG91bGQgYmUgZGF0ZSBzdHJpbmdzLCcsXG4gICAgICAgICAgICAnbGlrZSBkYXRlIGRhdGEsIHRob3VnaCBEYXRlIG9iamVjdHMgYW5kIHVuaXggbWlsbGlzZWNvbmRzJyxcbiAgICAgICAgICAgICd3aWxsIGJlIGFjY2VwdGVkIGFuZCBjb252ZXJ0ZWQgdG8gc3RyaW5ncy4nLFxuICAgICAgICAgICAgJ0lmIHRoZSBheGlzIGB0eXBlYCBpcyAqY2F0ZWdvcnkqLCBpdCBzaG91bGQgYmUgbnVtYmVycywnLFxuICAgICAgICAgICAgJ3VzaW5nIHRoZSBzY2FsZSB3aGVyZSBlYWNoIGNhdGVnb3J5IGlzIGFzc2lnbmVkIGEgc2VyaWFsJyxcbiAgICAgICAgICAgICdudW1iZXIgZnJvbSB6ZXJvIGluIHRoZSBvcmRlciBpdCBhcHBlYXJzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHhhbmNob3I6IHtcbiAgICAgICAgdmFsVHlwZTogJ2VudW1lcmF0ZWQnLFxuICAgICAgICB2YWx1ZXM6IFsnYXV0bycsICdsZWZ0JywgJ2NlbnRlcicsICdyaWdodCddLFxuICAgICAgICBkZmx0OiAnYXV0bycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjK2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgdGV4dCBib3hcXCdzIGhvcml6b250YWwgcG9zaXRpb24gYW5jaG9yJyxcbiAgICAgICAgICAgICdUaGlzIGFuY2hvciBiaW5kcyB0aGUgYHhgIHBvc2l0aW9uIHRvIHRoZSAqbGVmdCosICpjZW50ZXIqJyxcbiAgICAgICAgICAgICdvciAqcmlnaHQqIG9mIHRoZSBhbm5vdGF0aW9uLicsXG4gICAgICAgICAgICAnRm9yIGV4YW1wbGUsIGlmIGB4YCBpcyBzZXQgdG8gMSwgYHhyZWZgIHRvICpwYXBlciogYW5kJyxcbiAgICAgICAgICAgICdgeGFuY2hvcmAgdG8gKnJpZ2h0KiB0aGVuIHRoZSByaWdodC1tb3N0IHBvcnRpb24gb2YgdGhlJyxcbiAgICAgICAgICAgICdhbm5vdGF0aW9uIGxpbmVzIHVwIHdpdGggdGhlIHJpZ2h0LW1vc3QgZWRnZSBvZiB0aGUnLFxuICAgICAgICAgICAgJ3Bsb3R0aW5nIGFyZWEuJyxcbiAgICAgICAgICAgICdJZiAqYXV0byosIHRoZSBhbmNob3IgaXMgZXF1aXZhbGVudCB0byAqY2VudGVyKiBmb3InLFxuICAgICAgICAgICAgJ2RhdGEtcmVmZXJlbmNlZCBhbm5vdGF0aW9ucyBvciBpZiB0aGVyZSBpcyBhbiBhcnJvdywnLFxuICAgICAgICAgICAgJ3doZXJlYXMgZm9yIHBhcGVyLXJlZmVyZW5jZWQgd2l0aCBubyBhcnJvdywgdGhlIGFuY2hvciBwaWNrZWQnLFxuICAgICAgICAgICAgJ2NvcnJlc3BvbmRzIHRvIHRoZSBjbG9zZXN0IHNpZGUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeHNoaWZ0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICBkZmx0OiAwLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTaGlmdHMgdGhlIHBvc2l0aW9uIG9mIHRoZSB3aG9sZSBhbm5vdGF0aW9uIGFuZCBhcnJvdyB0byB0aGUnLFxuICAgICAgICAgICAgJ3JpZ2h0IChwb3NpdGl2ZSkgb3IgbGVmdCAobmVnYXRpdmUpIGJ5IHRoaXMgbWFueSBwaXhlbHMuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeXJlZjoge1xuICAgICAgICB2YWxUeXBlOiAnZW51bWVyYXRlZCcsXG4gICAgICAgIHZhbHVlczogW1xuICAgICAgICAgICAgJ3BhcGVyJyxcbiAgICAgICAgICAgIGNhcnRlc2lhbkNvbnN0YW50cy5pZFJlZ2V4LnkudG9TdHJpbmcoKVxuICAgICAgICBdLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnU2V0cyB0aGUgYW5ub3RhdGlvblxcJ3MgeSBjb29yZGluYXRlIGF4aXMuJyxcbiAgICAgICAgICAgICdJZiBzZXQgdG8gYW4geSBheGlzIGlkIChlLmcuICp5KiBvciAqeTIqKSwgdGhlIGB5YCBwb3NpdGlvbicsXG4gICAgICAgICAgICAncmVmZXJzIHRvIGFuIHkgY29vcmRpbmF0ZScsXG4gICAgICAgICAgICAnSWYgc2V0IHRvICpwYXBlciosIHRoZSBgeWAgcG9zaXRpb24gcmVmZXJzIHRvIHRoZSBkaXN0YW5jZSBmcm9tJyxcbiAgICAgICAgICAgICd0aGUgYm90dG9tIG9mIHRoZSBwbG90dGluZyBhcmVhIGluIG5vcm1hbGl6ZWQgY29vcmRpbmF0ZXMnLFxuICAgICAgICAgICAgJ3doZXJlIDAgKDEpIGNvcnJlc3BvbmRzIHRvIHRoZSBib3R0b20gKHRvcCkuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeToge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2NhbGMrYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBhbm5vdGF0aW9uXFwncyB5IHBvc2l0aW9uLicsXG4gICAgICAgICAgICAnSWYgdGhlIGF4aXMgYHR5cGVgIGlzICpsb2cqLCB0aGVuIHlvdSBtdXN0IHRha2UgdGhlJyxcbiAgICAgICAgICAgICdsb2cgb2YgeW91ciBkZXNpcmVkIHJhbmdlLicsXG4gICAgICAgICAgICAnSWYgdGhlIGF4aXMgYHR5cGVgIGlzICpkYXRlKiwgaXQgc2hvdWxkIGJlIGRhdGUgc3RyaW5ncywnLFxuICAgICAgICAgICAgJ2xpa2UgZGF0ZSBkYXRhLCB0aG91Z2ggRGF0ZSBvYmplY3RzIGFuZCB1bml4IG1pbGxpc2Vjb25kcycsXG4gICAgICAgICAgICAnd2lsbCBiZSBhY2NlcHRlZCBhbmQgY29udmVydGVkIHRvIHN0cmluZ3MuJyxcbiAgICAgICAgICAgICdJZiB0aGUgYXhpcyBgdHlwZWAgaXMgKmNhdGVnb3J5KiwgaXQgc2hvdWxkIGJlIG51bWJlcnMsJyxcbiAgICAgICAgICAgICd1c2luZyB0aGUgc2NhbGUgd2hlcmUgZWFjaCBjYXRlZ29yeSBpcyBhc3NpZ25lZCBhIHNlcmlhbCcsXG4gICAgICAgICAgICAnbnVtYmVyIGZyb20gemVybyBpbiB0aGUgb3JkZXIgaXQgYXBwZWFycy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5YW5jaG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbJ2F1dG8nLCAndG9wJywgJ21pZGRsZScsICdib3R0b20nXSxcbiAgICAgICAgZGZsdDogJ2F1dG8nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHRleHQgYm94XFwncyB2ZXJ0aWNhbCBwb3NpdGlvbiBhbmNob3InLFxuICAgICAgICAgICAgJ1RoaXMgYW5jaG9yIGJpbmRzIHRoZSBgeWAgcG9zaXRpb24gdG8gdGhlICp0b3AqLCAqbWlkZGxlKicsXG4gICAgICAgICAgICAnb3IgKmJvdHRvbSogb2YgdGhlIGFubm90YXRpb24uJyxcbiAgICAgICAgICAgICdGb3IgZXhhbXBsZSwgaWYgYHlgIGlzIHNldCB0byAxLCBgeXJlZmAgdG8gKnBhcGVyKiBhbmQnLFxuICAgICAgICAgICAgJ2B5YW5jaG9yYCB0byAqdG9wKiB0aGVuIHRoZSB0b3AtbW9zdCBwb3J0aW9uIG9mIHRoZScsXG4gICAgICAgICAgICAnYW5ub3RhdGlvbiBsaW5lcyB1cCB3aXRoIHRoZSB0b3AtbW9zdCBlZGdlIG9mIHRoZScsXG4gICAgICAgICAgICAncGxvdHRpbmcgYXJlYS4nLFxuICAgICAgICAgICAgJ0lmICphdXRvKiwgdGhlIGFuY2hvciBpcyBlcXVpdmFsZW50IHRvICptaWRkbGUqIGZvcicsXG4gICAgICAgICAgICAnZGF0YS1yZWZlcmVuY2VkIGFubm90YXRpb25zIG9yIGlmIHRoZXJlIGlzIGFuIGFycm93LCcsXG4gICAgICAgICAgICAnd2hlcmVhcyBmb3IgcGFwZXItcmVmZXJlbmNlZCB3aXRoIG5vIGFycm93LCB0aGUgYW5jaG9yIHBpY2tlZCcsXG4gICAgICAgICAgICAnY29ycmVzcG9uZHMgdG8gdGhlIGNsb3Nlc3Qgc2lkZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICB5c2hpZnQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgIGRmbHQ6IDAsXG4gICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYythcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NoaWZ0cyB0aGUgcG9zaXRpb24gb2YgdGhlIHdob2xlIGFubm90YXRpb24gYW5kIGFycm93IHVwJyxcbiAgICAgICAgICAgICcocG9zaXRpdmUpIG9yIGRvd24gKG5lZ2F0aXZlKSBieSB0aGlzIG1hbnkgcGl4ZWxzLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGNsaWNrdG9zaG93OiB7XG4gICAgICAgIHZhbFR5cGU6ICdlbnVtZXJhdGVkJyxcbiAgICAgICAgdmFsdWVzOiBbZmFsc2UsICdvbm9mZicsICdvbm91dCddLFxuICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdhcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ01ha2VzIHRoaXMgYW5ub3RhdGlvbiByZXNwb25kIHRvIGNsaWNrcyBvbiB0aGUgcGxvdC4nLFxuICAgICAgICAgICAgJ0lmIHlvdSBjbGljayBhIGRhdGEgcG9pbnQgdGhhdCBleGFjdGx5IG1hdGNoZXMgdGhlIGB4YCBhbmQgYHlgJyxcbiAgICAgICAgICAgICd2YWx1ZXMgb2YgdGhpcyBhbm5vdGF0aW9uLCBhbmQgaXQgaXMgaGlkZGVuICh2aXNpYmxlOiBmYWxzZSksJyxcbiAgICAgICAgICAgICdpdCB3aWxsIGFwcGVhci4gSW4gKm9ub2ZmKiBtb2RlLCB5b3UgbXVzdCBjbGljayB0aGUgc2FtZSBwb2ludCcsXG4gICAgICAgICAgICAnYWdhaW4gdG8gbWFrZSBpdCBkaXNhcHBlYXIsIHNvIGlmIHlvdSBjbGljayBtdWx0aXBsZSBwb2ludHMsJyxcbiAgICAgICAgICAgICd5b3UgY2FuIHNob3cgbXVsdGlwbGUgYW5ub3RhdGlvbnMuIEluICpvbm91dCogbW9kZSwgYSBjbGljaycsXG4gICAgICAgICAgICAnYW55d2hlcmUgZWxzZSBpbiB0aGUgcGxvdCAob24gYW5vdGhlciBkYXRhIHBvaW50IG9yIG5vdCkgd2lsbCcsXG4gICAgICAgICAgICAnaGlkZSB0aGlzIGFubm90YXRpb24uJyxcbiAgICAgICAgICAgICdJZiB5b3UgbmVlZCB0byBzaG93L2hpZGUgdGhpcyBhbm5vdGF0aW9uIGluIHJlc3BvbnNlIHRvIGRpZmZlcmVudCcsXG4gICAgICAgICAgICAnYHhgIG9yIGB5YCB2YWx1ZXMsIHlvdSBjYW4gc2V0IGB4Y2xpY2tgIGFuZC9vciBgeWNsaWNrYC4gVGhpcyBpcycsXG4gICAgICAgICAgICAndXNlZnVsIGZvciBleGFtcGxlIHRvIGxhYmVsIHRoZSBzaWRlIG9mIGEgYmFyLiBUbyBsYWJlbCBtYXJrZXJzJyxcbiAgICAgICAgICAgICd0aG91Z2gsIGBzdGFuZG9mZmAgaXMgcHJlZmVycmVkIG92ZXIgYHhjbGlja2AgYW5kIGB5Y2xpY2tgLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIHhjbGljazoge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnVG9nZ2xlIHRoaXMgYW5ub3RhdGlvbiB3aGVuIGNsaWNraW5nIGEgZGF0YSBwb2ludCB3aG9zZSBgeGAgdmFsdWUnLFxuICAgICAgICAgICAgJ2lzIGB4Y2xpY2tgIHJhdGhlciB0aGFuIHRoZSBhbm5vdGF0aW9uXFwncyBgeGAgdmFsdWUuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG4gICAgeWNsaWNrOiB7XG4gICAgICAgIHZhbFR5cGU6ICdhbnknLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdUb2dnbGUgdGhpcyBhbm5vdGF0aW9uIHdoZW4gY2xpY2tpbmcgYSBkYXRhIHBvaW50IHdob3NlIGB5YCB2YWx1ZScsXG4gICAgICAgICAgICAnaXMgYHljbGlja2AgcmF0aGVyIHRoYW4gdGhlIGFubm90YXRpb25cXCdzIGB5YCB2YWx1ZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBob3ZlcnRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZWRpdFR5cGU6ICdhcnJheWRyYXcnLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGV4dCB0byBhcHBlYXIgd2hlbiBob3ZlcmluZyBvdmVyIHRoaXMgYW5ub3RhdGlvbi4nLFxuICAgICAgICAgICAgJ0lmIG9taXR0ZWQgb3IgYmxhbmssIG5vIGhvdmVyIGxhYmVsIHdpbGwgYXBwZWFyLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuICAgIGhvdmVybGFiZWw6IHtcbiAgICAgICAgYmdjb2xvcjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBob3ZlciBsYWJlbC4nLFxuICAgICAgICAgICAgICAgICdCeSBkZWZhdWx0IHVzZXMgdGhlIGFubm90YXRpb25cXCdzIGBiZ2NvbG9yYCBtYWRlIG9wYXF1ZSwnLFxuICAgICAgICAgICAgICAgICdvciB3aGl0ZSBpZiBpdCB3YXMgdHJhbnNwYXJlbnQuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgYm9yZGVyY29sb3I6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZWRpdFR5cGU6ICdhcnJheWRyYXcnLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgYm9yZGVyIGNvbG9yIG9mIHRoZSBob3ZlciBsYWJlbC4nLFxuICAgICAgICAgICAgICAgICdCeSBkZWZhdWx0IHVzZXMgZWl0aGVyIGRhcmsgZ3JleSBvciB3aGl0ZSwgZm9yIG1heGltdW0nLFxuICAgICAgICAgICAgICAgICdjb250cmFzdCB3aXRoIGBob3ZlcmxhYmVsLmJnY29sb3JgLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGZvbnQ6IGZvbnRBdHRycyh7XG4gICAgICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdTZXRzIHRoZSBob3ZlciBsYWJlbCB0ZXh0IGZvbnQuJyxcbiAgICAgICAgICAgICAgICAnQnkgZGVmYXVsdCB1c2VzIHRoZSBnbG9iYWwgaG92ZXIgZm9udCBhbmQgc2l6ZSwnLFxuICAgICAgICAgICAgICAgICd3aXRoIGNvbG9yIGZyb20gYGhvdmVybGFiZWwuYm9yZGVyY29sb3JgLidcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0pLFxuICAgICAgICBlZGl0VHlwZTogJ2FycmF5ZHJhdydcbiAgICB9LFxuICAgIGNhcHR1cmVldmVudHM6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnYXJyYXlkcmF3JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHdoZXRoZXIgdGhlIGFubm90YXRpb24gdGV4dCBib3ggY2FwdHVyZXMgbW91c2UgbW92ZScsXG4gICAgICAgICAgICAnYW5kIGNsaWNrIGV2ZW50cywgb3IgYWxsb3dzIHRob3NlIGV2ZW50cyB0byBwYXNzIHRocm91Z2ggdG8gZGF0YScsXG4gICAgICAgICAgICAncG9pbnRzIGluIHRoZSBwbG90IHRoYXQgbWF5IGJlIGJlaGluZCB0aGUgYW5ub3RhdGlvbi4gQnkgZGVmYXVsdCcsXG4gICAgICAgICAgICAnYGNhcHR1cmVldmVudHNgIGlzICpmYWxzZSogdW5sZXNzIGBob3ZlcnRleHRgIGlzIHByb3ZpZGVkLicsXG4gICAgICAgICAgICAnSWYgeW91IHVzZSB0aGUgZXZlbnQgYHBsb3RseV9jbGlja2Fubm90YXRpb25gIHdpdGhvdXQgYGhvdmVydGV4dGAnLFxuICAgICAgICAgICAgJ3lvdSBtdXN0IGV4cGxpY2l0bHkgZW5hYmxlIGBjYXB0dXJlZXZlbnRzYC4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBlZGl0VHlwZTogJ2NhbGMnLFxuXG4gICAgX2RlcHJlY2F0ZWQ6IHtcbiAgICAgICAgcmVmOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnc3RyaW5nJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgICAgICdPYnNvbGV0ZS4gU2V0IGB4cmVmYCBhbmQgYHlyZWZgIHNlcGFyYXRlbHkgaW5zdGVhZC4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9XG4gICAgfVxufSk7XG4iXSwic291cmNlUm9vdCI6IiJ9