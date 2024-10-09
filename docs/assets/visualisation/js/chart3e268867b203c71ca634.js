(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_surface_attributes_js"],{

/***/ "./node_modules/plotly.js/src/traces/surface/attributes.js":
/*!*****************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/surface/attributes.js ***!
  \*****************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/



var Color = __webpack_require__(/*! ../../components/color */ "./node_modules/plotly.js/src/components/color/index.js");
var colorScaleAttrs = __webpack_require__(/*! ../../components/colorscale/attributes */ "./node_modules/plotly.js/src/components/colorscale/attributes.js");
var hovertemplateAttrs = __webpack_require__(/*! ../../plots/template_attributes */ "./node_modules/plotly.js/src/plots/template_attributes.js").hovertemplateAttrs;
var baseAttrs = __webpack_require__(/*! ../../plots/attributes */ "./node_modules/plotly.js/src/plots/attributes.js");

var extendFlat = __webpack_require__(/*! ../../lib/extend */ "./node_modules/plotly.js/src/lib/extend.js").extendFlat;
var overrideAll = __webpack_require__(/*! ../../plot_api/edit_types */ "./node_modules/plotly.js/src/plot_api/edit_types.js").overrideAll;

function makeContourProjAttr(axLetter) {
    return {
        valType: 'boolean',
        role: 'info',
        dflt: false,
        description: [
            'Determines whether or not these contour lines are projected',
            'on the', axLetter, 'plane.',
            'If `highlight` is set to *true* (the default), the projected',
            'lines are shown on hover.',
            'If `show` is set to *true*, the projected lines are shown',
            'in permanence.'
        ].join(' ')
    };
}

function makeContourAttr(axLetter) {
    return {
        show: {
            valType: 'boolean',
            role: 'info',
            dflt: false,
            description: [
                'Determines whether or not contour lines about the', axLetter,
                'dimension are drawn.'
            ].join(' ')
        },
        start: {
            valType: 'number',
            dflt: null,
            role: 'style',
            editType: 'plot',
         // impliedEdits: {'^autocontour': false},
            description: [
                'Sets the starting contour level value.',
                'Must be less than `contours.end`'
            ].join(' ')
        },
        end: {
            valType: 'number',
            dflt: null,
            role: 'style',
            editType: 'plot',
         // impliedEdits: {'^autocontour': false},
            description: [
                'Sets the end contour level value.',
                'Must be more than `contours.start`'
            ].join(' ')
        },
        size: {
            valType: 'number',
            dflt: null,
            min: 0,
            role: 'style',
            editType: 'plot',
         // impliedEdits: {'^autocontour': false},
            description: [
                'Sets the step between each contour level.',
                'Must be positive.'
            ].join(' ')
        },
        project: {
            x: makeContourProjAttr('x'),
            y: makeContourProjAttr('y'),
            z: makeContourProjAttr('z')
        },
        color: {
            valType: 'color',
            role: 'style',
            dflt: Color.defaultLine,
            description: 'Sets the color of the contour lines.'
        },
        usecolormap: {
            valType: 'boolean',
            role: 'info',
            dflt: false,
            description: [
                'An alternate to *color*.',
                'Determines whether or not the contour lines are colored using',
                'the trace *colorscale*.'
            ].join(' ')
        },
        width: {
            valType: 'number',
            role: 'style',
            min: 1,
            max: 16,
            dflt: 2,
            description: 'Sets the width of the contour lines.'
        },
        highlight: {
            valType: 'boolean',
            role: 'info',
            dflt: true,
            description: [
                'Determines whether or not contour lines about the', axLetter,
                'dimension are highlighted on hover.'
            ].join(' ')
        },
        highlightcolor: {
            valType: 'color',
            role: 'style',
            dflt: Color.defaultLine,
            description: 'Sets the color of the highlighted contour lines.'
        },
        highlightwidth: {
            valType: 'number',
            role: 'style',
            min: 1,
            max: 16,
            dflt: 2,
            description: 'Sets the width of the highlighted contour lines.'
        }
    };
}

var attrs = module.exports = overrideAll(extendFlat({
    z: {
        valType: 'data_array',
        description: 'Sets the z coordinates.'
    },
    x: {
        valType: 'data_array',
        description: 'Sets the x coordinates.'
    },
    y: {
        valType: 'data_array',
        description: 'Sets the y coordinates.'
    },

    text: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        description: [
            'Sets the text elements associated with each z value.',
            'If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,',
            'these elements will be seen in the hover labels.'
        ].join(' ')
    },
    hovertext: {
        valType: 'string',
        role: 'info',
        dflt: '',
        arrayOk: true,
        description: 'Same as `text`.'
    },
    hovertemplate: hovertemplateAttrs(),

    connectgaps: {
        valType: 'boolean',
        dflt: false,
        role: 'info',
        editType: 'calc',
        description: [
            'Determines whether or not gaps',
            '(i.e. {nan} or missing values)',
            'in the `z` data are filled in.'
        ].join(' ')
    },

    surfacecolor: {
        valType: 'data_array',
        description: [
            'Sets the surface color values,',
            'used for setting a color scale independent of `z`.'
        ].join(' ')
    },
},

colorScaleAttrs('', {
    colorAttr: 'z or surfacecolor',
    showScaleDflt: true,
    autoColorDflt: false,
    editTypeOverride: 'calc'
}), {
    contours: {
        x: makeContourAttr('x'),
        y: makeContourAttr('y'),
        z: makeContourAttr('z')
    },
    hidesurface: {
        valType: 'boolean',
        role: 'info',
        dflt: false,
        description: [
            'Determines whether or not a surface is drawn.',
            'For example, set `hidesurface` to *false*',
            '`contours.x.show` to *true* and',
            '`contours.y.show` to *true* to draw a wire frame plot.'
        ].join(' ')
    },

    lightposition: {
        x: {
            valType: 'number',
            role: 'style',
            min: -1e5,
            max: 1e5,
            dflt: 10,
            description: 'Numeric vector, representing the X coordinate for each vertex.'
        },
        y: {
            valType: 'number',
            role: 'style',
            min: -1e5,
            max: 1e5,
            dflt: 1e4,
            description: 'Numeric vector, representing the Y coordinate for each vertex.'
        },
        z: {
            valType: 'number',
            role: 'style',
            min: -1e5,
            max: 1e5,
            dflt: 0,
            description: 'Numeric vector, representing the Z coordinate for each vertex.'
        }
    },

    lighting: {
        ambient: {
            valType: 'number',
            role: 'style',
            min: 0.00,
            max: 1.0,
            dflt: 0.8,
            description: 'Ambient light increases overall color visibility but can wash out the image.'
        },
        diffuse: {
            valType: 'number',
            role: 'style',
            min: 0.00,
            max: 1.00,
            dflt: 0.8,
            description: 'Represents the extent that incident rays are reflected in a range of angles.'
        },
        specular: {
            valType: 'number',
            role: 'style',
            min: 0.00,
            max: 2.00,
            dflt: 0.05,
            description: 'Represents the level that incident rays are reflected in a single direction, causing shine.'
        },
        roughness: {
            valType: 'number',
            role: 'style',
            min: 0.00,
            max: 1.00,
            dflt: 0.5,
            description: 'Alters specular reflection; the rougher the surface, the wider and less contrasty the shine.'
        },
        fresnel: {
            valType: 'number',
            role: 'style',
            min: 0.00,
            max: 5.00,
            dflt: 0.2,
            description: [
                'Represents the reflectance as a dependency of the viewing angle; e.g. paper is reflective',
                'when viewing it from the edge of the paper (almost 90 degrees), causing shine.'
            ].join(' ')
        }
    },

    opacity: {
        valType: 'number',
        role: 'style',
        min: 0,
        max: 1,
        dflt: 1,
        description: [
            'Sets the opacity of the surface.',
            'Please note that in the case of using high `opacity` values for example a value',
            'greater than or equal to 0.5 on two surfaces (and 0.25 with four surfaces), an',
            'overlay of multiple transparent surfaces may not perfectly be sorted in depth by the',
            'webgl API. This behavior may be improved in the near future and is subject to change.'
        ].join(' ')
    },

    opacityscale: {
        valType: 'any',
        role: 'style',
        editType: 'calc',
        description: [
            'Sets the opacityscale.',
            ' The opacityscale must be an array containing',
            ' arrays mapping a normalized value to an opacity value.',
            ' At minimum, a mapping for the lowest (0) and highest (1)',
            ' values are required. For example,',
            ' `[[0, 1], [0.5, 0.2], [1, 1]]` means that higher/lower values would have',
            ' higher opacity values and those in the middle would be more transparent',
            ' Alternatively, `opacityscale` may be a palette name string',
            ' of the following list: \'min\', \'max\', \'extremes\' and \'uniform\'.',
            ' The default is \'uniform\'.'
        ].join('')
    },

    _deprecated: {
        zauto: extendFlat({}, colorScaleAttrs.zauto, {
            description: 'Obsolete. Use `cauto` instead.'
        }),
        zmin: extendFlat({}, colorScaleAttrs.zmin, {
            description: 'Obsolete. Use `cmin` instead.'
        }),
        zmax: extendFlat({}, colorScaleAttrs.zmax, {
            description: 'Obsolete. Use `cmax` instead.'
        })
    },

    hoverinfo: extendFlat({}, baseAttrs.hoverinfo),
    showlegend: extendFlat({}, baseAttrs.showlegend, {dflt: false}),
}), 'calc', 'nested');

attrs.x.editType = attrs.y.editType = attrs.z.editType = 'calc+clearAxisTypes';
attrs.transforms = undefined;


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL3N1cmZhY2UvYXR0cmlidXRlcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsc0ZBQXdCO0FBQzVDLHNCQUFzQixtQkFBTyxDQUFDLGdIQUF3QztBQUN0RSx5QkFBeUIsMElBQTZEO0FBQ3RGLGdCQUFnQixtQkFBTyxDQUFDLGdGQUF3Qjs7QUFFaEQsaUJBQWlCLG9HQUFzQztBQUN2RCxrQkFBa0IsdUhBQWdEOztBQUVsRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixzQkFBc0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQixzQkFBc0I7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkJBQTJCLHNCQUFzQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLElBQUk7QUFDeEI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0EsU0FBUztBQUNULDJCQUEyQjtBQUMzQjtBQUNBLFNBQVM7QUFDVCwyQkFBMkI7QUFDM0I7QUFDQSxTQUFTO0FBQ1QsS0FBSzs7QUFFTCw0QkFBNEI7QUFDNUIsNkJBQTZCLHlCQUF5QixZQUFZO0FBQ2xFLENBQUM7O0FBRUQ7QUFDQSIsImZpbGUiOiJjaGFydDNlMjY4ODY3YjIwM2M3MWNhNjM0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4qIENvcHlyaWdodCAyMDEyLTIwMjAsIFBsb3RseSwgSW5jLlxuKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuKlxuKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiogTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuKi9cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgQ29sb3IgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yJyk7XG52YXIgY29sb3JTY2FsZUF0dHJzID0gcmVxdWlyZSgnLi4vLi4vY29tcG9uZW50cy9jb2xvcnNjYWxlL2F0dHJpYnV0ZXMnKTtcbnZhciBob3ZlcnRlbXBsYXRlQXR0cnMgPSByZXF1aXJlKCcuLi8uLi9wbG90cy90ZW1wbGF0ZV9hdHRyaWJ1dGVzJykuaG92ZXJ0ZW1wbGF0ZUF0dHJzO1xudmFyIGJhc2VBdHRycyA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RzL2F0dHJpYnV0ZXMnKTtcblxudmFyIGV4dGVuZEZsYXQgPSByZXF1aXJlKCcuLi8uLi9saWIvZXh0ZW5kJykuZXh0ZW5kRmxhdDtcbnZhciBvdmVycmlkZUFsbCA9IHJlcXVpcmUoJy4uLy4uL3Bsb3RfYXBpL2VkaXRfdHlwZXMnKS5vdmVycmlkZUFsbDtcblxuZnVuY3Rpb24gbWFrZUNvbnRvdXJQcm9qQXR0cihheExldHRlcikge1xuICAgIHJldHVybiB7XG4gICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdEZXRlcm1pbmVzIHdoZXRoZXIgb3Igbm90IHRoZXNlIGNvbnRvdXIgbGluZXMgYXJlIHByb2plY3RlZCcsXG4gICAgICAgICAgICAnb24gdGhlJywgYXhMZXR0ZXIsICdwbGFuZS4nLFxuICAgICAgICAgICAgJ0lmIGBoaWdobGlnaHRgIGlzIHNldCB0byAqdHJ1ZSogKHRoZSBkZWZhdWx0KSwgdGhlIHByb2plY3RlZCcsXG4gICAgICAgICAgICAnbGluZXMgYXJlIHNob3duIG9uIGhvdmVyLicsXG4gICAgICAgICAgICAnSWYgYHNob3dgIGlzIHNldCB0byAqdHJ1ZSosIHRoZSBwcm9qZWN0ZWQgbGluZXMgYXJlIHNob3duJyxcbiAgICAgICAgICAgICdpbiBwZXJtYW5lbmNlLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBtYWtlQ29udG91ckF0dHIoYXhMZXR0ZXIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBzaG93OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgICAgICBkZmx0OiBmYWxzZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgY29udG91ciBsaW5lcyBhYm91dCB0aGUnLCBheExldHRlcixcbiAgICAgICAgICAgICAgICAnZGltZW5zaW9uIGFyZSBkcmF3bi4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBzdGFydDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBkZmx0OiBudWxsLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAvLyBpbXBsaWVkRWRpdHM6IHsnXmF1dG9jb250b3VyJzogZmFsc2V9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgc3RhcnRpbmcgY29udG91ciBsZXZlbCB2YWx1ZS4nLFxuICAgICAgICAgICAgICAgICdNdXN0IGJlIGxlc3MgdGhhbiBgY29udG91cnMuZW5kYCdcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIGVuZDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBkZmx0OiBudWxsLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIGVkaXRUeXBlOiAncGxvdCcsXG4gICAgICAgICAvLyBpbXBsaWVkRWRpdHM6IHsnXmF1dG9jb250b3VyJzogZmFsc2V9LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnU2V0cyB0aGUgZW5kIGNvbnRvdXIgbGV2ZWwgdmFsdWUuJyxcbiAgICAgICAgICAgICAgICAnTXVzdCBiZSBtb3JlIHRoYW4gYGNvbnRvdXJzLnN0YXJ0YCdcbiAgICAgICAgICAgIF0uam9pbignICcpXG4gICAgICAgIH0sXG4gICAgICAgIHNpemU6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgZGZsdDogbnVsbCxcbiAgICAgICAgICAgIG1pbjogMCxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBlZGl0VHlwZTogJ3Bsb3QnLFxuICAgICAgICAgLy8gaW1wbGllZEVkaXRzOiB7J15hdXRvY29udG91cic6IGZhbHNlfSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1NldHMgdGhlIHN0ZXAgYmV0d2VlbiBlYWNoIGNvbnRvdXIgbGV2ZWwuJyxcbiAgICAgICAgICAgICAgICAnTXVzdCBiZSBwb3NpdGl2ZS4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBwcm9qZWN0OiB7XG4gICAgICAgICAgICB4OiBtYWtlQ29udG91clByb2pBdHRyKCd4JyksXG4gICAgICAgICAgICB5OiBtYWtlQ29udG91clByb2pBdHRyKCd5JyksXG4gICAgICAgICAgICB6OiBtYWtlQ29udG91clByb2pBdHRyKCd6JylcbiAgICAgICAgfSxcbiAgICAgICAgY29sb3I6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgZGZsdDogQ29sb3IuZGVmYXVsdExpbmUsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIGNvbG9yIG9mIHRoZSBjb250b3VyIGxpbmVzLidcbiAgICAgICAgfSxcbiAgICAgICAgdXNlY29sb3JtYXA6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICAgICAnQW4gYWx0ZXJuYXRlIHRvICpjb2xvciouJyxcbiAgICAgICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCB0aGUgY29udG91ciBsaW5lcyBhcmUgY29sb3JlZCB1c2luZycsXG4gICAgICAgICAgICAgICAgJ3RoZSB0cmFjZSAqY29sb3JzY2FsZSouJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfSxcbiAgICAgICAgd2lkdGg6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMSxcbiAgICAgICAgICAgIG1heDogMTYsXG4gICAgICAgICAgICBkZmx0OiAyLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB3aWR0aCBvZiB0aGUgY29udG91ciBsaW5lcy4nXG4gICAgICAgIH0sXG4gICAgICAgIGhpZ2hsaWdodDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICAgICAgcm9sZTogJ2luZm8nLFxuICAgICAgICAgICAgZGZsdDogdHJ1ZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgY29udG91ciBsaW5lcyBhYm91dCB0aGUnLCBheExldHRlcixcbiAgICAgICAgICAgICAgICAnZGltZW5zaW9uIGFyZSBoaWdobGlnaHRlZCBvbiBob3Zlci4nXG4gICAgICAgICAgICBdLmpvaW4oJyAnKVxuICAgICAgICB9LFxuICAgICAgICBoaWdobGlnaHRjb2xvcjoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ2NvbG9yJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBkZmx0OiBDb2xvci5kZWZhdWx0TGluZSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgY29sb3Igb2YgdGhlIGhpZ2hsaWdodGVkIGNvbnRvdXIgbGluZXMuJ1xuICAgICAgICB9LFxuICAgICAgICBoaWdobGlnaHR3aWR0aDoge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgbWluOiAxLFxuICAgICAgICAgICAgbWF4OiAxNixcbiAgICAgICAgICAgIGRmbHQ6IDIsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHdpZHRoIG9mIHRoZSBoaWdobGlnaHRlZCBjb250b3VyIGxpbmVzLidcbiAgICAgICAgfVxuICAgIH07XG59XG5cbnZhciBhdHRycyA9IG1vZHVsZS5leHBvcnRzID0gb3ZlcnJpZGVBbGwoZXh0ZW5kRmxhdCh7XG4gICAgejoge1xuICAgICAgICB2YWxUeXBlOiAnZGF0YV9hcnJheScsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2V0cyB0aGUgeiBjb29yZGluYXRlcy4nXG4gICAgfSxcbiAgICB4OiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdTZXRzIHRoZSB4IGNvb3JkaW5hdGVzLidcbiAgICB9LFxuICAgIHk6IHtcbiAgICAgICAgdmFsVHlwZTogJ2RhdGFfYXJyYXknLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ1NldHMgdGhlIHkgY29vcmRpbmF0ZXMuJ1xuICAgIH0sXG5cbiAgICB0ZXh0OiB7XG4gICAgICAgIHZhbFR5cGU6ICdzdHJpbmcnLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6ICcnLFxuICAgICAgICBhcnJheU9rOiB0cnVlLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ1NldHMgdGhlIHRleHQgZWxlbWVudHMgYXNzb2NpYXRlZCB3aXRoIGVhY2ggeiB2YWx1ZS4nLFxuICAgICAgICAgICAgJ0lmIHRyYWNlIGBob3ZlcmluZm9gIGNvbnRhaW5zIGEgKnRleHQqIGZsYWcgYW5kICpob3ZlcnRleHQqIGlzIG5vdCBzZXQsJyxcbiAgICAgICAgICAgICd0aGVzZSBlbGVtZW50cyB3aWxsIGJlIHNlZW4gaW4gdGhlIGhvdmVyIGxhYmVscy4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcbiAgICBob3ZlcnRleHQ6IHtcbiAgICAgICAgdmFsVHlwZTogJ3N0cmluZycsXG4gICAgICAgIHJvbGU6ICdpbmZvJyxcbiAgICAgICAgZGZsdDogJycsXG4gICAgICAgIGFycmF5T2s6IHRydWUsXG4gICAgICAgIGRlc2NyaXB0aW9uOiAnU2FtZSBhcyBgdGV4dGAuJ1xuICAgIH0sXG4gICAgaG92ZXJ0ZW1wbGF0ZTogaG92ZXJ0ZW1wbGF0ZUF0dHJzKCksXG5cbiAgICBjb25uZWN0Z2Fwczoge1xuICAgICAgICB2YWxUeXBlOiAnYm9vbGVhbicsXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGVkaXRUeXBlOiAnY2FsYycsXG4gICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAnRGV0ZXJtaW5lcyB3aGV0aGVyIG9yIG5vdCBnYXBzJyxcbiAgICAgICAgICAgICcoaS5lLiB7bmFufSBvciBtaXNzaW5nIHZhbHVlcyknLFxuICAgICAgICAgICAgJ2luIHRoZSBgemAgZGF0YSBhcmUgZmlsbGVkIGluLidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgc3VyZmFjZWNvbG9yOiB7XG4gICAgICAgIHZhbFR5cGU6ICdkYXRhX2FycmF5JyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBzdXJmYWNlIGNvbG9yIHZhbHVlcywnLFxuICAgICAgICAgICAgJ3VzZWQgZm9yIHNldHRpbmcgYSBjb2xvciBzY2FsZSBpbmRlcGVuZGVudCBvZiBgemAuJ1xuICAgICAgICBdLmpvaW4oJyAnKVxuICAgIH0sXG59LFxuXG5jb2xvclNjYWxlQXR0cnMoJycsIHtcbiAgICBjb2xvckF0dHI6ICd6IG9yIHN1cmZhY2Vjb2xvcicsXG4gICAgc2hvd1NjYWxlRGZsdDogdHJ1ZSxcbiAgICBhdXRvQ29sb3JEZmx0OiBmYWxzZSxcbiAgICBlZGl0VHlwZU92ZXJyaWRlOiAnY2FsYydcbn0pLCB7XG4gICAgY29udG91cnM6IHtcbiAgICAgICAgeDogbWFrZUNvbnRvdXJBdHRyKCd4JyksXG4gICAgICAgIHk6IG1ha2VDb250b3VyQXR0cigneScpLFxuICAgICAgICB6OiBtYWtlQ29udG91ckF0dHIoJ3onKVxuICAgIH0sXG4gICAgaGlkZXN1cmZhY2U6IHtcbiAgICAgICAgdmFsVHlwZTogJ2Jvb2xlYW4nLFxuICAgICAgICByb2xlOiAnaW5mbycsXG4gICAgICAgIGRmbHQ6IGZhbHNlLFxuICAgICAgICBkZXNjcmlwdGlvbjogW1xuICAgICAgICAgICAgJ0RldGVybWluZXMgd2hldGhlciBvciBub3QgYSBzdXJmYWNlIGlzIGRyYXduLicsXG4gICAgICAgICAgICAnRm9yIGV4YW1wbGUsIHNldCBgaGlkZXN1cmZhY2VgIHRvICpmYWxzZSonLFxuICAgICAgICAgICAgJ2Bjb250b3Vycy54LnNob3dgIHRvICp0cnVlKiBhbmQnLFxuICAgICAgICAgICAgJ2Bjb250b3Vycy55LnNob3dgIHRvICp0cnVlKiB0byBkcmF3IGEgd2lyZSBmcmFtZSBwbG90LidcbiAgICAgICAgXS5qb2luKCcgJylcbiAgICB9LFxuXG4gICAgbGlnaHRwb3NpdGlvbjoge1xuICAgICAgICB4OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IC0xZTUsXG4gICAgICAgICAgICBtYXg6IDFlNSxcbiAgICAgICAgICAgIGRmbHQ6IDEwLFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdOdW1lcmljIHZlY3RvciwgcmVwcmVzZW50aW5nIHRoZSBYIGNvb3JkaW5hdGUgZm9yIGVhY2ggdmVydGV4LidcbiAgICAgICAgfSxcbiAgICAgICAgeToge1xuICAgICAgICAgICAgdmFsVHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICAgICAgbWluOiAtMWU1LFxuICAgICAgICAgICAgbWF4OiAxZTUsXG4gICAgICAgICAgICBkZmx0OiAxZTQsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ051bWVyaWMgdmVjdG9yLCByZXByZXNlbnRpbmcgdGhlIFkgY29vcmRpbmF0ZSBmb3IgZWFjaCB2ZXJ0ZXguJ1xuICAgICAgICB9LFxuICAgICAgICB6OiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IC0xZTUsXG4gICAgICAgICAgICBtYXg6IDFlNSxcbiAgICAgICAgICAgIGRmbHQ6IDAsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ051bWVyaWMgdmVjdG9yLCByZXByZXNlbnRpbmcgdGhlIFogY29vcmRpbmF0ZSBmb3IgZWFjaCB2ZXJ0ZXguJ1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGxpZ2h0aW5nOiB7XG4gICAgICAgIGFtYmllbnQ6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMC4wMCxcbiAgICAgICAgICAgIG1heDogMS4wLFxuICAgICAgICAgICAgZGZsdDogMC44LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBbWJpZW50IGxpZ2h0IGluY3JlYXNlcyBvdmVyYWxsIGNvbG9yIHZpc2liaWxpdHkgYnV0IGNhbiB3YXNoIG91dCB0aGUgaW1hZ2UuJ1xuICAgICAgICB9LFxuICAgICAgICBkaWZmdXNlOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IDAuMDAsXG4gICAgICAgICAgICBtYXg6IDEuMDAsXG4gICAgICAgICAgICBkZmx0OiAwLjgsXG4gICAgICAgICAgICBkZXNjcmlwdGlvbjogJ1JlcHJlc2VudHMgdGhlIGV4dGVudCB0aGF0IGluY2lkZW50IHJheXMgYXJlIHJlZmxlY3RlZCBpbiBhIHJhbmdlIG9mIGFuZ2xlcy4nXG4gICAgICAgIH0sXG4gICAgICAgIHNwZWN1bGFyOiB7XG4gICAgICAgICAgICB2YWxUeXBlOiAnbnVtYmVyJyxcbiAgICAgICAgICAgIHJvbGU6ICdzdHlsZScsXG4gICAgICAgICAgICBtaW46IDAuMDAsXG4gICAgICAgICAgICBtYXg6IDIuMDAsXG4gICAgICAgICAgICBkZmx0OiAwLjA1LFxuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdSZXByZXNlbnRzIHRoZSBsZXZlbCB0aGF0IGluY2lkZW50IHJheXMgYXJlIHJlZmxlY3RlZCBpbiBhIHNpbmdsZSBkaXJlY3Rpb24sIGNhdXNpbmcgc2hpbmUuJ1xuICAgICAgICB9LFxuICAgICAgICByb3VnaG5lc3M6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMC4wMCxcbiAgICAgICAgICAgIG1heDogMS4wMCxcbiAgICAgICAgICAgIGRmbHQ6IDAuNSxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWx0ZXJzIHNwZWN1bGFyIHJlZmxlY3Rpb247IHRoZSByb3VnaGVyIHRoZSBzdXJmYWNlLCB0aGUgd2lkZXIgYW5kIGxlc3MgY29udHJhc3R5IHRoZSBzaGluZS4nXG4gICAgICAgIH0sXG4gICAgICAgIGZyZXNuZWw6IHtcbiAgICAgICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgICAgIG1pbjogMC4wMCxcbiAgICAgICAgICAgIG1heDogNS4wMCxcbiAgICAgICAgICAgIGRmbHQ6IDAuMixcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBbXG4gICAgICAgICAgICAgICAgJ1JlcHJlc2VudHMgdGhlIHJlZmxlY3RhbmNlIGFzIGEgZGVwZW5kZW5jeSBvZiB0aGUgdmlld2luZyBhbmdsZTsgZS5nLiBwYXBlciBpcyByZWZsZWN0aXZlJyxcbiAgICAgICAgICAgICAgICAnd2hlbiB2aWV3aW5nIGl0IGZyb20gdGhlIGVkZ2Ugb2YgdGhlIHBhcGVyIChhbG1vc3QgOTAgZGVncmVlcyksIGNhdXNpbmcgc2hpbmUuJ1xuICAgICAgICAgICAgXS5qb2luKCcgJylcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBvcGFjaXR5OiB7XG4gICAgICAgIHZhbFR5cGU6ICdudW1iZXInLFxuICAgICAgICByb2xlOiAnc3R5bGUnLFxuICAgICAgICBtaW46IDAsXG4gICAgICAgIG1heDogMSxcbiAgICAgICAgZGZsdDogMSxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBvcGFjaXR5IG9mIHRoZSBzdXJmYWNlLicsXG4gICAgICAgICAgICAnUGxlYXNlIG5vdGUgdGhhdCBpbiB0aGUgY2FzZSBvZiB1c2luZyBoaWdoIGBvcGFjaXR5YCB2YWx1ZXMgZm9yIGV4YW1wbGUgYSB2YWx1ZScsXG4gICAgICAgICAgICAnZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIDAuNSBvbiB0d28gc3VyZmFjZXMgKGFuZCAwLjI1IHdpdGggZm91ciBzdXJmYWNlcyksIGFuJyxcbiAgICAgICAgICAgICdvdmVybGF5IG9mIG11bHRpcGxlIHRyYW5zcGFyZW50IHN1cmZhY2VzIG1heSBub3QgcGVyZmVjdGx5IGJlIHNvcnRlZCBpbiBkZXB0aCBieSB0aGUnLFxuICAgICAgICAgICAgJ3dlYmdsIEFQSS4gVGhpcyBiZWhhdmlvciBtYXkgYmUgaW1wcm92ZWQgaW4gdGhlIG5lYXIgZnV0dXJlIGFuZCBpcyBzdWJqZWN0IHRvIGNoYW5nZS4nXG4gICAgICAgIF0uam9pbignICcpXG4gICAgfSxcblxuICAgIG9wYWNpdHlzY2FsZToge1xuICAgICAgICB2YWxUeXBlOiAnYW55JyxcbiAgICAgICAgcm9sZTogJ3N0eWxlJyxcbiAgICAgICAgZWRpdFR5cGU6ICdjYWxjJyxcbiAgICAgICAgZGVzY3JpcHRpb246IFtcbiAgICAgICAgICAgICdTZXRzIHRoZSBvcGFjaXR5c2NhbGUuJyxcbiAgICAgICAgICAgICcgVGhlIG9wYWNpdHlzY2FsZSBtdXN0IGJlIGFuIGFycmF5IGNvbnRhaW5pbmcnLFxuICAgICAgICAgICAgJyBhcnJheXMgbWFwcGluZyBhIG5vcm1hbGl6ZWQgdmFsdWUgdG8gYW4gb3BhY2l0eSB2YWx1ZS4nLFxuICAgICAgICAgICAgJyBBdCBtaW5pbXVtLCBhIG1hcHBpbmcgZm9yIHRoZSBsb3dlc3QgKDApIGFuZCBoaWdoZXN0ICgxKScsXG4gICAgICAgICAgICAnIHZhbHVlcyBhcmUgcmVxdWlyZWQuIEZvciBleGFtcGxlLCcsXG4gICAgICAgICAgICAnIGBbWzAsIDFdLCBbMC41LCAwLjJdLCBbMSwgMV1dYCBtZWFucyB0aGF0IGhpZ2hlci9sb3dlciB2YWx1ZXMgd291bGQgaGF2ZScsXG4gICAgICAgICAgICAnIGhpZ2hlciBvcGFjaXR5IHZhbHVlcyBhbmQgdGhvc2UgaW4gdGhlIG1pZGRsZSB3b3VsZCBiZSBtb3JlIHRyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICcgQWx0ZXJuYXRpdmVseSwgYG9wYWNpdHlzY2FsZWAgbWF5IGJlIGEgcGFsZXR0ZSBuYW1lIHN0cmluZycsXG4gICAgICAgICAgICAnIG9mIHRoZSBmb2xsb3dpbmcgbGlzdDogXFwnbWluXFwnLCBcXCdtYXhcXCcsIFxcJ2V4dHJlbWVzXFwnIGFuZCBcXCd1bmlmb3JtXFwnLicsXG4gICAgICAgICAgICAnIFRoZSBkZWZhdWx0IGlzIFxcJ3VuaWZvcm1cXCcuJ1xuICAgICAgICBdLmpvaW4oJycpXG4gICAgfSxcblxuICAgIF9kZXByZWNhdGVkOiB7XG4gICAgICAgIHphdXRvOiBleHRlbmRGbGF0KHt9LCBjb2xvclNjYWxlQXR0cnMuemF1dG8sIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnT2Jzb2xldGUuIFVzZSBgY2F1dG9gIGluc3RlYWQuJ1xuICAgICAgICB9KSxcbiAgICAgICAgem1pbjogZXh0ZW5kRmxhdCh7fSwgY29sb3JTY2FsZUF0dHJzLnptaW4sIHtcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnT2Jzb2xldGUuIFVzZSBgY21pbmAgaW5zdGVhZC4nXG4gICAgICAgIH0pLFxuICAgICAgICB6bWF4OiBleHRlbmRGbGF0KHt9LCBjb2xvclNjYWxlQXR0cnMuem1heCwge1xuICAgICAgICAgICAgZGVzY3JpcHRpb246ICdPYnNvbGV0ZS4gVXNlIGBjbWF4YCBpbnN0ZWFkLidcbiAgICAgICAgfSlcbiAgICB9LFxuXG4gICAgaG92ZXJpbmZvOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuaG92ZXJpbmZvKSxcbiAgICBzaG93bGVnZW5kOiBleHRlbmRGbGF0KHt9LCBiYXNlQXR0cnMuc2hvd2xlZ2VuZCwge2RmbHQ6IGZhbHNlfSksXG59KSwgJ2NhbGMnLCAnbmVzdGVkJyk7XG5cbmF0dHJzLnguZWRpdFR5cGUgPSBhdHRycy55LmVkaXRUeXBlID0gYXR0cnMuei5lZGl0VHlwZSA9ICdjYWxjK2NsZWFyQXhpc1R5cGVzJztcbmF0dHJzLnRyYW5zZm9ybXMgPSB1bmRlZmluZWQ7XG4iXSwic291cmNlUm9vdCI6IiJ9