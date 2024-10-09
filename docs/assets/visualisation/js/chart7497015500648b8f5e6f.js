(self["webpackChunkdi_website"] = self["webpackChunkdi_website"] || []).push([["vendors-node_modules_plotly_js_src_traces_heatmap_plot_js-node_modules_plotly_js_src_traces_h-e11002"],{

/***/ "./node_modules/plotly.js/src/traces/heatmap/plot.js":
/*!***********************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/plot.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");
var tinycolor = __webpack_require__(/*! tinycolor2 */ "./node_modules/tinycolor2/tinycolor.js");

var Registry = __webpack_require__(/*! ../../registry */ "./node_modules/plotly.js/src/registry.js");
var Lib = __webpack_require__(/*! ../../lib */ "./node_modules/plotly.js/src/lib/index.js");
var makeColorScaleFuncFromTrace = __webpack_require__(/*! ../../components/colorscale */ "./node_modules/plotly.js/src/components/colorscale/index.js").makeColorScaleFuncFromTrace;
var xmlnsNamespaces = __webpack_require__(/*! ../../constants/xmlns_namespaces */ "./node_modules/plotly.js/src/constants/xmlns_namespaces.js");

module.exports = function(gd, plotinfo, cdheatmaps, heatmapLayer) {
    var xa = plotinfo.xaxis;
    var ya = plotinfo.yaxis;

    Lib.makeTraceGroups(heatmapLayer, cdheatmaps, 'hm').each(function(cd) {
        var plotGroup = d3.select(this);
        var cd0 = cd[0];
        var trace = cd0.trace;

        var z = cd0.z;
        var x = cd0.x;
        var y = cd0.y;
        var xc = cd0.xCenter;
        var yc = cd0.yCenter;
        var isContour = Registry.traceIs(trace, 'contour');
        var zsmooth = isContour ? 'best' : trace.zsmooth;

        // get z dims
        var m = z.length;
        var n = Lib.maxRowLength(z);
        var xrev = false;
        var yrev = false;

        var left, right, temp, top, bottom, i;

        // TODO: if there are multiple overlapping categorical heatmaps,
        // or if we allow category sorting, then the categories may not be
        // sequential... may need to reorder and/or expand z

        // Get edges of png in pixels (xa.c2p() maps axes coordinates to pixel coordinates)
        // figure out if either axis is reversed (y is usually reversed, in pixel coords)
        // also clip the image to maximum 50% outside the visible plot area
        // bigger image lets you pan more naturally, but slows performance.
        // TODO: use low-resolution images outside the visible plot for panning
        // these while loops find the first and last brick bounds that are defined
        // (in case of log of a negative)
        i = 0;
        while(left === undefined && i < x.length - 1) {
            left = xa.c2p(x[i]);
            i++;
        }
        i = x.length - 1;
        while(right === undefined && i > 0) {
            right = xa.c2p(x[i]);
            i--;
        }

        if(right < left) {
            temp = right;
            right = left;
            left = temp;
            xrev = true;
        }

        i = 0;
        while(top === undefined && i < y.length - 1) {
            top = ya.c2p(y[i]);
            i++;
        }
        i = y.length - 1;
        while(bottom === undefined && i > 0) {
            bottom = ya.c2p(y[i]);
            i--;
        }

        if(bottom < top) {
            temp = top;
            top = bottom;
            bottom = temp;
            yrev = true;
        }

        // for contours with heatmap fill, we generate the boundaries based on
        // brick centers but then use the brick edges for drawing the bricks
        if(isContour) {
            xc = x;
            yc = y;
            x = cd0.xfill;
            y = cd0.yfill;
        }

        // make an image that goes at most half a screen off either side, to keep
        // time reasonable when you zoom in. if zsmooth is true/fast, don't worry
        // about this, because zooming doesn't increase number of pixels
        // if zsmooth is best, don't include anything off screen because it takes too long
        if(zsmooth !== 'fast') {
            var extra = zsmooth === 'best' ? 0 : 0.5;
            left = Math.max(-extra * xa._length, left);
            right = Math.min((1 + extra) * xa._length, right);
            top = Math.max(-extra * ya._length, top);
            bottom = Math.min((1 + extra) * ya._length, bottom);
        }

        var imageWidth = Math.round(right - left);
        var imageHeight = Math.round(bottom - top);

        // setup image nodes

        // if image is entirely off-screen, don't even draw it
        var isOffScreen = (imageWidth <= 0 || imageHeight <= 0);

        if(isOffScreen) {
            var noImage = plotGroup.selectAll('image').data([]);
            noImage.exit().remove();
            return;
        }

        // generate image data

        var canvasW, canvasH;
        if(zsmooth === 'fast') {
            canvasW = n;
            canvasH = m;
        } else {
            canvasW = imageWidth;
            canvasH = imageHeight;
        }

        var canvas = document.createElement('canvas');
        canvas.width = canvasW;
        canvas.height = canvasH;
        var context = canvas.getContext('2d');

        var sclFunc = makeColorScaleFuncFromTrace(trace, {noNumericCheck: true, returnArray: true});

        // map brick boundaries to image pixels
        var xpx,
            ypx;
        if(zsmooth === 'fast') {
            xpx = xrev ?
                function(index) { return n - 1 - index; } :
                Lib.identity;
            ypx = yrev ?
                function(index) { return m - 1 - index; } :
                Lib.identity;
        } else {
            xpx = function(index) {
                return Lib.constrain(Math.round(xa.c2p(x[index]) - left),
                    0, imageWidth);
            };
            ypx = function(index) {
                return Lib.constrain(Math.round(ya.c2p(y[index]) - top),
                    0, imageHeight);
            };
        }

        // build the pixel map brick-by-brick
        // cruise through z-matrix row-by-row
        // build a brick at each z-matrix value
        var yi = ypx(0);
        var yb = [yi, yi];
        var xbi = xrev ? 0 : 1;
        var ybi = yrev ? 0 : 1;
        // for collecting an average luminosity of the heatmap
        var pixcount = 0;
        var rcount = 0;
        var gcount = 0;
        var bcount = 0;

        var xb, j, xi, v, row, c;

        function setColor(v, pixsize) {
            if(v !== undefined) {
                var c = sclFunc(v);
                c[0] = Math.round(c[0]);
                c[1] = Math.round(c[1]);
                c[2] = Math.round(c[2]);

                pixcount += pixsize;
                rcount += c[0] * pixsize;
                gcount += c[1] * pixsize;
                bcount += c[2] * pixsize;
                return c;
            }
            return [0, 0, 0, 0];
        }

        function interpColor(r0, r1, xinterp, yinterp) {
            var z00 = r0[xinterp.bin0];
            if(z00 === undefined) return setColor(undefined, 1);

            var z01 = r0[xinterp.bin1];
            var z10 = r1[xinterp.bin0];
            var z11 = r1[xinterp.bin1];
            var dx = (z01 - z00) || 0;
            var dy = (z10 - z00) || 0;
            var dxy;

            // the bilinear interpolation term needs different calculations
            // for all the different permutations of missing data
            // among the neighbors of the main point, to ensure
            // continuity across brick boundaries.
            if(z01 === undefined) {
                if(z11 === undefined) dxy = 0;
                else if(z10 === undefined) dxy = 2 * (z11 - z00);
                else dxy = (2 * z11 - z10 - z00) * 2 / 3;
            } else if(z11 === undefined) {
                if(z10 === undefined) dxy = 0;
                else dxy = (2 * z00 - z01 - z10) * 2 / 3;
            } else if(z10 === undefined) dxy = (2 * z11 - z01 - z00) * 2 / 3;
            else dxy = (z11 + z00 - z01 - z10);

            return setColor(z00 + xinterp.frac * dx + yinterp.frac * (dy + xinterp.frac * dxy));
        }

        if(zsmooth) { // best or fast, works fastest with imageData
            var pxIndex = 0;
            var pixels;

            try {
                pixels = new Uint8Array(imageWidth * imageHeight * 4);
            } catch(e) {
                pixels = new Array(imageWidth * imageHeight * 4);
            }

            if(zsmooth === 'best') {
                var xForPx = xc || x;
                var yForPx = yc || y;
                var xPixArray = new Array(xForPx.length);
                var yPixArray = new Array(yForPx.length);
                var xinterpArray = new Array(imageWidth);
                var findInterpX = xc ? findInterpFromCenters : findInterp;
                var findInterpY = yc ? findInterpFromCenters : findInterp;
                var yinterp, r0, r1;

                // first make arrays of x and y pixel locations of brick boundaries
                for(i = 0; i < xForPx.length; i++) xPixArray[i] = Math.round(xa.c2p(xForPx[i]) - left);
                for(i = 0; i < yForPx.length; i++) yPixArray[i] = Math.round(ya.c2p(yForPx[i]) - top);

                // then make arrays of interpolations
                // (bin0=closest, bin1=next, frac=fractional dist.)
                for(i = 0; i < imageWidth; i++) xinterpArray[i] = findInterpX(i, xPixArray);

                // now do the interpolations and fill the png
                for(j = 0; j < imageHeight; j++) {
                    yinterp = findInterpY(j, yPixArray);
                    r0 = z[yinterp.bin0];
                    r1 = z[yinterp.bin1];
                    for(i = 0; i < imageWidth; i++, pxIndex += 4) {
                        c = interpColor(r0, r1, xinterpArray[i], yinterp);
                        putColor(pixels, pxIndex, c);
                    }
                }
            } else { // zsmooth = fast
                for(j = 0; j < m; j++) {
                    row = z[j];
                    yb = ypx(j);
                    for(i = 0; i < imageWidth; i++) {
                        c = setColor(row[i], 1);
                        pxIndex = (yb * imageWidth + xpx(i)) * 4;
                        putColor(pixels, pxIndex, c);
                    }
                }
            }

            var imageData = context.createImageData(imageWidth, imageHeight);
            try {
                imageData.data.set(pixels);
            } catch(e) {
                var pxArray = imageData.data;
                var dlen = pxArray.length;
                for(j = 0; j < dlen; j ++) {
                    pxArray[j] = pixels[j];
                }
            }

            context.putImageData(imageData, 0, 0);
        } else { // zsmooth = false -> filling potentially large bricks works fastest with fillRect
            // gaps do not need to be exact integers, but if they *are* we will get
            // cleaner edges by rounding at least one edge
            var xGap = trace.xgap;
            var yGap = trace.ygap;
            var xGapLeft = Math.floor(xGap / 2);
            var yGapTop = Math.floor(yGap / 2);

            for(j = 0; j < m; j++) {
                row = z[j];
                yb.reverse();
                yb[ybi] = ypx(j + 1);
                if(yb[0] === yb[1] || yb[0] === undefined || yb[1] === undefined) {
                    continue;
                }
                xi = xpx(0);
                xb = [xi, xi];
                for(i = 0; i < n; i++) {
                    // build one color brick!
                    xb.reverse();
                    xb[xbi] = xpx(i + 1);
                    if(xb[0] === xb[1] || xb[0] === undefined || xb[1] === undefined) {
                        continue;
                    }
                    v = row[i];
                    c = setColor(v, (xb[1] - xb[0]) * (yb[1] - yb[0]));
                    context.fillStyle = 'rgba(' + c.join(',') + ')';

                    context.fillRect(xb[0] + xGapLeft, yb[0] + yGapTop,
                        xb[1] - xb[0] - xGap, yb[1] - yb[0] - yGap);
                }
            }
        }

        rcount = Math.round(rcount / pixcount);
        gcount = Math.round(gcount / pixcount);
        bcount = Math.round(bcount / pixcount);
        var avgColor = tinycolor('rgb(' + rcount + ',' + gcount + ',' + bcount + ')');

        gd._hmpixcount = (gd._hmpixcount||0) + pixcount;
        gd._hmlumcount = (gd._hmlumcount||0) + pixcount * avgColor.getLuminance();

        var image3 = plotGroup.selectAll('image')
            .data(cd);

        image3.enter().append('svg:image').attr({
            xmlns: xmlnsNamespaces.svg,
            preserveAspectRatio: 'none'
        });

        image3.attr({
            height: imageHeight,
            width: imageWidth,
            x: left,
            y: top,
            'xlink:href': canvas.toDataURL('image/png')
        });
    });
};

// get interpolated bin value. Returns {bin0:closest bin, frac:fractional dist to next, bin1:next bin}
function findInterp(pixel, pixArray) {
    var maxBin = pixArray.length - 2;
    var bin = Lib.constrain(Lib.findBin(pixel, pixArray), 0, maxBin);
    var pix0 = pixArray[bin];
    var pix1 = pixArray[bin + 1];
    var interp = Lib.constrain(bin + (pixel - pix0) / (pix1 - pix0) - 0.5, 0, maxBin);
    var bin0 = Math.round(interp);
    var frac = Math.abs(interp - bin0);

    if(!interp || interp === maxBin || !frac) {
        return {
            bin0: bin0,
            bin1: bin0,
            frac: 0
        };
    }
    return {
        bin0: bin0,
        frac: frac,
        bin1: Math.round(bin0 + frac / (interp - bin0))
    };
}

function findInterpFromCenters(pixel, centerPixArray) {
    var maxBin = centerPixArray.length - 1;
    var bin = Lib.constrain(Lib.findBin(pixel, centerPixArray), 0, maxBin);
    var pix0 = centerPixArray[bin];
    var pix1 = centerPixArray[bin + 1];
    var frac = ((pixel - pix0) / (pix1 - pix0)) || 0;
    if(frac <= 0) {
        return {
            bin0: bin,
            bin1: bin,
            frac: 0
        };
    }
    if(frac < 0.5) {
        return {
            bin0: bin,
            bin1: bin + 1,
            frac: frac
        };
    }
    return {
        bin0: bin + 1,
        bin1: bin,
        frac: 1 - frac
    };
}

function putColor(pixels, pxIndex, c) {
    pixels[pxIndex] = c[0];
    pixels[pxIndex + 1] = c[1];
    pixels[pxIndex + 2] = c[2];
    pixels[pxIndex + 3] = Math.round(c[3] * 255);
}


/***/ }),

/***/ "./node_modules/plotly.js/src/traces/heatmap/style.js":
/*!************************************************************!*\
  !*** ./node_modules/plotly.js/src/traces/heatmap/style.js ***!
  \************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/**
* Copyright 2012-2020, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/




var d3 = __webpack_require__(/*! d3 */ "./node_modules/d3/d3.js");

module.exports = function style(gd) {
    d3.select(gd).selectAll('.hm image')
        .style('opacity', function(d) {
            return d.trace.opacity;
        });
};


/***/ })

}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvcGxvdC5qcyIsIndlYnBhY2s6Ly9kaS13ZWJzaXRlLy4vbm9kZV9tb2R1bGVzL3Bsb3RseS5qcy9zcmMvdHJhY2VzL2hlYXRtYXAvc3R5bGUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxtQ0FBSTtBQUNyQixnQkFBZ0IsbUJBQU8sQ0FBQywwREFBWTs7QUFFcEMsZUFBZSxtQkFBTyxDQUFDLGdFQUFnQjtBQUN2QyxVQUFVLG1CQUFPLENBQUMsNERBQVc7QUFDN0Isa0NBQWtDLGlKQUFrRTtBQUNwRyxzQkFBc0IsbUJBQU8sQ0FBQyxvR0FBa0M7O0FBRWhFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwwREFBMEQsd0NBQXdDOztBQUVsRztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLHNCQUFzQixFQUFFO0FBQ3pEO0FBQ0E7QUFDQSxpQ0FBaUMsc0JBQXNCLEVBQUU7QUFDekQ7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBOztBQUVBLHFCQUFxQjtBQUNyQjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQkFBMEIsbUJBQW1CO0FBQzdDLDBCQUEwQixtQkFBbUI7O0FBRTdDO0FBQ0E7QUFDQSwwQkFBMEIsZ0JBQWdCOztBQUUxQztBQUNBLDBCQUEwQixpQkFBaUI7QUFDM0M7QUFDQTtBQUNBO0FBQ0EsOEJBQThCLGdCQUFnQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQiwwQkFBMEIsT0FBTztBQUNqQztBQUNBO0FBQ0EsOEJBQThCLGdCQUFnQjtBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSwwQkFBMEIsVUFBVTtBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHNCQUFzQixPQUFPO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsT0FBTztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBLHdDQUF3QztBQUN4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdhOztBQUViLFNBQVMsbUJBQU8sQ0FBQyxtQ0FBSTs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QiLCJmaWxlIjoiY2hhcnQ3NDk3MDE1NTAwNjQ4YjhmNWU2Zi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xudmFyIHRpbnljb2xvciA9IHJlcXVpcmUoJ3Rpbnljb2xvcjInKTtcblxudmFyIFJlZ2lzdHJ5ID0gcmVxdWlyZSgnLi4vLi4vcmVnaXN0cnknKTtcbnZhciBMaWIgPSByZXF1aXJlKCcuLi8uLi9saWInKTtcbnZhciBtYWtlQ29sb3JTY2FsZUZ1bmNGcm9tVHJhY2UgPSByZXF1aXJlKCcuLi8uLi9jb21wb25lbnRzL2NvbG9yc2NhbGUnKS5tYWtlQ29sb3JTY2FsZUZ1bmNGcm9tVHJhY2U7XG52YXIgeG1sbnNOYW1lc3BhY2VzID0gcmVxdWlyZSgnLi4vLi4vY29uc3RhbnRzL3htbG5zX25hbWVzcGFjZXMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihnZCwgcGxvdGluZm8sIGNkaGVhdG1hcHMsIGhlYXRtYXBMYXllcikge1xuICAgIHZhciB4YSA9IHBsb3RpbmZvLnhheGlzO1xuICAgIHZhciB5YSA9IHBsb3RpbmZvLnlheGlzO1xuXG4gICAgTGliLm1ha2VUcmFjZUdyb3VwcyhoZWF0bWFwTGF5ZXIsIGNkaGVhdG1hcHMsICdobScpLmVhY2goZnVuY3Rpb24oY2QpIHtcbiAgICAgICAgdmFyIHBsb3RHcm91cCA9IGQzLnNlbGVjdCh0aGlzKTtcbiAgICAgICAgdmFyIGNkMCA9IGNkWzBdO1xuICAgICAgICB2YXIgdHJhY2UgPSBjZDAudHJhY2U7XG5cbiAgICAgICAgdmFyIHogPSBjZDAuejtcbiAgICAgICAgdmFyIHggPSBjZDAueDtcbiAgICAgICAgdmFyIHkgPSBjZDAueTtcbiAgICAgICAgdmFyIHhjID0gY2QwLnhDZW50ZXI7XG4gICAgICAgIHZhciB5YyA9IGNkMC55Q2VudGVyO1xuICAgICAgICB2YXIgaXNDb250b3VyID0gUmVnaXN0cnkudHJhY2VJcyh0cmFjZSwgJ2NvbnRvdXInKTtcbiAgICAgICAgdmFyIHpzbW9vdGggPSBpc0NvbnRvdXIgPyAnYmVzdCcgOiB0cmFjZS56c21vb3RoO1xuXG4gICAgICAgIC8vIGdldCB6IGRpbXNcbiAgICAgICAgdmFyIG0gPSB6Lmxlbmd0aDtcbiAgICAgICAgdmFyIG4gPSBMaWIubWF4Um93TGVuZ3RoKHopO1xuICAgICAgICB2YXIgeHJldiA9IGZhbHNlO1xuICAgICAgICB2YXIgeXJldiA9IGZhbHNlO1xuXG4gICAgICAgIHZhciBsZWZ0LCByaWdodCwgdGVtcCwgdG9wLCBib3R0b20sIGk7XG5cbiAgICAgICAgLy8gVE9ETzogaWYgdGhlcmUgYXJlIG11bHRpcGxlIG92ZXJsYXBwaW5nIGNhdGVnb3JpY2FsIGhlYXRtYXBzLFxuICAgICAgICAvLyBvciBpZiB3ZSBhbGxvdyBjYXRlZ29yeSBzb3J0aW5nLCB0aGVuIHRoZSBjYXRlZ29yaWVzIG1heSBub3QgYmVcbiAgICAgICAgLy8gc2VxdWVudGlhbC4uLiBtYXkgbmVlZCB0byByZW9yZGVyIGFuZC9vciBleHBhbmQgelxuXG4gICAgICAgIC8vIEdldCBlZGdlcyBvZiBwbmcgaW4gcGl4ZWxzICh4YS5jMnAoKSBtYXBzIGF4ZXMgY29vcmRpbmF0ZXMgdG8gcGl4ZWwgY29vcmRpbmF0ZXMpXG4gICAgICAgIC8vIGZpZ3VyZSBvdXQgaWYgZWl0aGVyIGF4aXMgaXMgcmV2ZXJzZWQgKHkgaXMgdXN1YWxseSByZXZlcnNlZCwgaW4gcGl4ZWwgY29vcmRzKVxuICAgICAgICAvLyBhbHNvIGNsaXAgdGhlIGltYWdlIHRvIG1heGltdW0gNTAlIG91dHNpZGUgdGhlIHZpc2libGUgcGxvdCBhcmVhXG4gICAgICAgIC8vIGJpZ2dlciBpbWFnZSBsZXRzIHlvdSBwYW4gbW9yZSBuYXR1cmFsbHksIGJ1dCBzbG93cyBwZXJmb3JtYW5jZS5cbiAgICAgICAgLy8gVE9ETzogdXNlIGxvdy1yZXNvbHV0aW9uIGltYWdlcyBvdXRzaWRlIHRoZSB2aXNpYmxlIHBsb3QgZm9yIHBhbm5pbmdcbiAgICAgICAgLy8gdGhlc2Ugd2hpbGUgbG9vcHMgZmluZCB0aGUgZmlyc3QgYW5kIGxhc3QgYnJpY2sgYm91bmRzIHRoYXQgYXJlIGRlZmluZWRcbiAgICAgICAgLy8gKGluIGNhc2Ugb2YgbG9nIG9mIGEgbmVnYXRpdmUpXG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZShsZWZ0ID09PSB1bmRlZmluZWQgJiYgaSA8IHgubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgbGVmdCA9IHhhLmMycCh4W2ldKTtcbiAgICAgICAgICAgIGkrKztcbiAgICAgICAgfVxuICAgICAgICBpID0geC5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZShyaWdodCA9PT0gdW5kZWZpbmVkICYmIGkgPiAwKSB7XG4gICAgICAgICAgICByaWdodCA9IHhhLmMycCh4W2ldKTtcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHJpZ2h0IDwgbGVmdCkge1xuICAgICAgICAgICAgdGVtcCA9IHJpZ2h0O1xuICAgICAgICAgICAgcmlnaHQgPSBsZWZ0O1xuICAgICAgICAgICAgbGVmdCA9IHRlbXA7XG4gICAgICAgICAgICB4cmV2ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgPSAwO1xuICAgICAgICB3aGlsZSh0b3AgPT09IHVuZGVmaW5lZCAmJiBpIDwgeS5sZW5ndGggLSAxKSB7XG4gICAgICAgICAgICB0b3AgPSB5YS5jMnAoeVtpXSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cbiAgICAgICAgaSA9IHkubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUoYm90dG9tID09PSB1bmRlZmluZWQgJiYgaSA+IDApIHtcbiAgICAgICAgICAgIGJvdHRvbSA9IHlhLmMycCh5W2ldKTtcbiAgICAgICAgICAgIGktLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKGJvdHRvbSA8IHRvcCkge1xuICAgICAgICAgICAgdGVtcCA9IHRvcDtcbiAgICAgICAgICAgIHRvcCA9IGJvdHRvbTtcbiAgICAgICAgICAgIGJvdHRvbSA9IHRlbXA7XG4gICAgICAgICAgICB5cmV2ID0gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZvciBjb250b3VycyB3aXRoIGhlYXRtYXAgZmlsbCwgd2UgZ2VuZXJhdGUgdGhlIGJvdW5kYXJpZXMgYmFzZWQgb25cbiAgICAgICAgLy8gYnJpY2sgY2VudGVycyBidXQgdGhlbiB1c2UgdGhlIGJyaWNrIGVkZ2VzIGZvciBkcmF3aW5nIHRoZSBicmlja3NcbiAgICAgICAgaWYoaXNDb250b3VyKSB7XG4gICAgICAgICAgICB4YyA9IHg7XG4gICAgICAgICAgICB5YyA9IHk7XG4gICAgICAgICAgICB4ID0gY2QwLnhmaWxsO1xuICAgICAgICAgICAgeSA9IGNkMC55ZmlsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIG1ha2UgYW4gaW1hZ2UgdGhhdCBnb2VzIGF0IG1vc3QgaGFsZiBhIHNjcmVlbiBvZmYgZWl0aGVyIHNpZGUsIHRvIGtlZXBcbiAgICAgICAgLy8gdGltZSByZWFzb25hYmxlIHdoZW4geW91IHpvb20gaW4uIGlmIHpzbW9vdGggaXMgdHJ1ZS9mYXN0LCBkb24ndCB3b3JyeVxuICAgICAgICAvLyBhYm91dCB0aGlzLCBiZWNhdXNlIHpvb21pbmcgZG9lc24ndCBpbmNyZWFzZSBudW1iZXIgb2YgcGl4ZWxzXG4gICAgICAgIC8vIGlmIHpzbW9vdGggaXMgYmVzdCwgZG9uJ3QgaW5jbHVkZSBhbnl0aGluZyBvZmYgc2NyZWVuIGJlY2F1c2UgaXQgdGFrZXMgdG9vIGxvbmdcbiAgICAgICAgaWYoenNtb290aCAhPT0gJ2Zhc3QnKSB7XG4gICAgICAgICAgICB2YXIgZXh0cmEgPSB6c21vb3RoID09PSAnYmVzdCcgPyAwIDogMC41O1xuICAgICAgICAgICAgbGVmdCA9IE1hdGgubWF4KC1leHRyYSAqIHhhLl9sZW5ndGgsIGxlZnQpO1xuICAgICAgICAgICAgcmlnaHQgPSBNYXRoLm1pbigoMSArIGV4dHJhKSAqIHhhLl9sZW5ndGgsIHJpZ2h0KTtcbiAgICAgICAgICAgIHRvcCA9IE1hdGgubWF4KC1leHRyYSAqIHlhLl9sZW5ndGgsIHRvcCk7XG4gICAgICAgICAgICBib3R0b20gPSBNYXRoLm1pbigoMSArIGV4dHJhKSAqIHlhLl9sZW5ndGgsIGJvdHRvbSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgaW1hZ2VXaWR0aCA9IE1hdGgucm91bmQocmlnaHQgLSBsZWZ0KTtcbiAgICAgICAgdmFyIGltYWdlSGVpZ2h0ID0gTWF0aC5yb3VuZChib3R0b20gLSB0b3ApO1xuXG4gICAgICAgIC8vIHNldHVwIGltYWdlIG5vZGVzXG5cbiAgICAgICAgLy8gaWYgaW1hZ2UgaXMgZW50aXJlbHkgb2ZmLXNjcmVlbiwgZG9uJ3QgZXZlbiBkcmF3IGl0XG4gICAgICAgIHZhciBpc09mZlNjcmVlbiA9IChpbWFnZVdpZHRoIDw9IDAgfHwgaW1hZ2VIZWlnaHQgPD0gMCk7XG5cbiAgICAgICAgaWYoaXNPZmZTY3JlZW4pIHtcbiAgICAgICAgICAgIHZhciBub0ltYWdlID0gcGxvdEdyb3VwLnNlbGVjdEFsbCgnaW1hZ2UnKS5kYXRhKFtdKTtcbiAgICAgICAgICAgIG5vSW1hZ2UuZXhpdCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2VuZXJhdGUgaW1hZ2UgZGF0YVxuXG4gICAgICAgIHZhciBjYW52YXNXLCBjYW52YXNIO1xuICAgICAgICBpZih6c21vb3RoID09PSAnZmFzdCcpIHtcbiAgICAgICAgICAgIGNhbnZhc1cgPSBuO1xuICAgICAgICAgICAgY2FudmFzSCA9IG07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYW52YXNXID0gaW1hZ2VXaWR0aDtcbiAgICAgICAgICAgIGNhbnZhc0ggPSBpbWFnZUhlaWdodDtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgY2FudmFzLndpZHRoID0gY2FudmFzVztcbiAgICAgICAgY2FudmFzLmhlaWdodCA9IGNhbnZhc0g7XG4gICAgICAgIHZhciBjb250ZXh0ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICAgICAgdmFyIHNjbEZ1bmMgPSBtYWtlQ29sb3JTY2FsZUZ1bmNGcm9tVHJhY2UodHJhY2UsIHtub051bWVyaWNDaGVjazogdHJ1ZSwgcmV0dXJuQXJyYXk6IHRydWV9KTtcblxuICAgICAgICAvLyBtYXAgYnJpY2sgYm91bmRhcmllcyB0byBpbWFnZSBwaXhlbHNcbiAgICAgICAgdmFyIHhweCxcbiAgICAgICAgICAgIHlweDtcbiAgICAgICAgaWYoenNtb290aCA9PT0gJ2Zhc3QnKSB7XG4gICAgICAgICAgICB4cHggPSB4cmV2ID9cbiAgICAgICAgICAgICAgICBmdW5jdGlvbihpbmRleCkgeyByZXR1cm4gbiAtIDEgLSBpbmRleDsgfSA6XG4gICAgICAgICAgICAgICAgTGliLmlkZW50aXR5O1xuICAgICAgICAgICAgeXB4ID0geXJldiA/XG4gICAgICAgICAgICAgICAgZnVuY3Rpb24oaW5kZXgpIHsgcmV0dXJuIG0gLSAxIC0gaW5kZXg7IH0gOlxuICAgICAgICAgICAgICAgIExpYi5pZGVudGl0eTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHhweCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIExpYi5jb25zdHJhaW4oTWF0aC5yb3VuZCh4YS5jMnAoeFtpbmRleF0pIC0gbGVmdCksXG4gICAgICAgICAgICAgICAgICAgIDAsIGltYWdlV2lkdGgpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHlweCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIExpYi5jb25zdHJhaW4oTWF0aC5yb3VuZCh5YS5jMnAoeVtpbmRleF0pIC0gdG9wKSxcbiAgICAgICAgICAgICAgICAgICAgMCwgaW1hZ2VIZWlnaHQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGJ1aWxkIHRoZSBwaXhlbCBtYXAgYnJpY2stYnktYnJpY2tcbiAgICAgICAgLy8gY3J1aXNlIHRocm91Z2ggei1tYXRyaXggcm93LWJ5LXJvd1xuICAgICAgICAvLyBidWlsZCBhIGJyaWNrIGF0IGVhY2ggei1tYXRyaXggdmFsdWVcbiAgICAgICAgdmFyIHlpID0geXB4KDApO1xuICAgICAgICB2YXIgeWIgPSBbeWksIHlpXTtcbiAgICAgICAgdmFyIHhiaSA9IHhyZXYgPyAwIDogMTtcbiAgICAgICAgdmFyIHliaSA9IHlyZXYgPyAwIDogMTtcbiAgICAgICAgLy8gZm9yIGNvbGxlY3RpbmcgYW4gYXZlcmFnZSBsdW1pbm9zaXR5IG9mIHRoZSBoZWF0bWFwXG4gICAgICAgIHZhciBwaXhjb3VudCA9IDA7XG4gICAgICAgIHZhciByY291bnQgPSAwO1xuICAgICAgICB2YXIgZ2NvdW50ID0gMDtcbiAgICAgICAgdmFyIGJjb3VudCA9IDA7XG5cbiAgICAgICAgdmFyIHhiLCBqLCB4aSwgdiwgcm93LCBjO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldENvbG9yKHYsIHBpeHNpemUpIHtcbiAgICAgICAgICAgIGlmKHYgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhciBjID0gc2NsRnVuYyh2KTtcbiAgICAgICAgICAgICAgICBjWzBdID0gTWF0aC5yb3VuZChjWzBdKTtcbiAgICAgICAgICAgICAgICBjWzFdID0gTWF0aC5yb3VuZChjWzFdKTtcbiAgICAgICAgICAgICAgICBjWzJdID0gTWF0aC5yb3VuZChjWzJdKTtcblxuICAgICAgICAgICAgICAgIHBpeGNvdW50ICs9IHBpeHNpemU7XG4gICAgICAgICAgICAgICAgcmNvdW50ICs9IGNbMF0gKiBwaXhzaXplO1xuICAgICAgICAgICAgICAgIGdjb3VudCArPSBjWzFdICogcGl4c2l6ZTtcbiAgICAgICAgICAgICAgICBiY291bnQgKz0gY1syXSAqIHBpeHNpemU7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gWzAsIDAsIDAsIDBdO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW50ZXJwQ29sb3IocjAsIHIxLCB4aW50ZXJwLCB5aW50ZXJwKSB7XG4gICAgICAgICAgICB2YXIgejAwID0gcjBbeGludGVycC5iaW4wXTtcbiAgICAgICAgICAgIGlmKHowMCA9PT0gdW5kZWZpbmVkKSByZXR1cm4gc2V0Q29sb3IodW5kZWZpbmVkLCAxKTtcblxuICAgICAgICAgICAgdmFyIHowMSA9IHIwW3hpbnRlcnAuYmluMV07XG4gICAgICAgICAgICB2YXIgejEwID0gcjFbeGludGVycC5iaW4wXTtcbiAgICAgICAgICAgIHZhciB6MTEgPSByMVt4aW50ZXJwLmJpbjFdO1xuICAgICAgICAgICAgdmFyIGR4ID0gKHowMSAtIHowMCkgfHwgMDtcbiAgICAgICAgICAgIHZhciBkeSA9ICh6MTAgLSB6MDApIHx8IDA7XG4gICAgICAgICAgICB2YXIgZHh5O1xuXG4gICAgICAgICAgICAvLyB0aGUgYmlsaW5lYXIgaW50ZXJwb2xhdGlvbiB0ZXJtIG5lZWRzIGRpZmZlcmVudCBjYWxjdWxhdGlvbnNcbiAgICAgICAgICAgIC8vIGZvciBhbGwgdGhlIGRpZmZlcmVudCBwZXJtdXRhdGlvbnMgb2YgbWlzc2luZyBkYXRhXG4gICAgICAgICAgICAvLyBhbW9uZyB0aGUgbmVpZ2hib3JzIG9mIHRoZSBtYWluIHBvaW50LCB0byBlbnN1cmVcbiAgICAgICAgICAgIC8vIGNvbnRpbnVpdHkgYWNyb3NzIGJyaWNrIGJvdW5kYXJpZXMuXG4gICAgICAgICAgICBpZih6MDEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIGlmKHoxMSA9PT0gdW5kZWZpbmVkKSBkeHkgPSAwO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYoejEwID09PSB1bmRlZmluZWQpIGR4eSA9IDIgKiAoejExIC0gejAwKTtcbiAgICAgICAgICAgICAgICBlbHNlIGR4eSA9ICgyICogejExIC0gejEwIC0gejAwKSAqIDIgLyAzO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHoxMSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYoejEwID09PSB1bmRlZmluZWQpIGR4eSA9IDA7XG4gICAgICAgICAgICAgICAgZWxzZSBkeHkgPSAoMiAqIHowMCAtIHowMSAtIHoxMCkgKiAyIC8gMztcbiAgICAgICAgICAgIH0gZWxzZSBpZih6MTAgPT09IHVuZGVmaW5lZCkgZHh5ID0gKDIgKiB6MTEgLSB6MDEgLSB6MDApICogMiAvIDM7XG4gICAgICAgICAgICBlbHNlIGR4eSA9ICh6MTEgKyB6MDAgLSB6MDEgLSB6MTApO1xuXG4gICAgICAgICAgICByZXR1cm4gc2V0Q29sb3IoejAwICsgeGludGVycC5mcmFjICogZHggKyB5aW50ZXJwLmZyYWMgKiAoZHkgKyB4aW50ZXJwLmZyYWMgKiBkeHkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmKHpzbW9vdGgpIHsgLy8gYmVzdCBvciBmYXN0LCB3b3JrcyBmYXN0ZXN0IHdpdGggaW1hZ2VEYXRhXG4gICAgICAgICAgICB2YXIgcHhJbmRleCA9IDA7XG4gICAgICAgICAgICB2YXIgcGl4ZWxzO1xuXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHBpeGVscyA9IG5ldyBVaW50OEFycmF5KGltYWdlV2lkdGggKiBpbWFnZUhlaWdodCAqIDQpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgcGl4ZWxzID0gbmV3IEFycmF5KGltYWdlV2lkdGggKiBpbWFnZUhlaWdodCAqIDQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZih6c21vb3RoID09PSAnYmVzdCcpIHtcbiAgICAgICAgICAgICAgICB2YXIgeEZvclB4ID0geGMgfHwgeDtcbiAgICAgICAgICAgICAgICB2YXIgeUZvclB4ID0geWMgfHwgeTtcbiAgICAgICAgICAgICAgICB2YXIgeFBpeEFycmF5ID0gbmV3IEFycmF5KHhGb3JQeC5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIHZhciB5UGl4QXJyYXkgPSBuZXcgQXJyYXkoeUZvclB4Lmxlbmd0aCk7XG4gICAgICAgICAgICAgICAgdmFyIHhpbnRlcnBBcnJheSA9IG5ldyBBcnJheShpbWFnZVdpZHRoKTtcbiAgICAgICAgICAgICAgICB2YXIgZmluZEludGVycFggPSB4YyA/IGZpbmRJbnRlcnBGcm9tQ2VudGVycyA6IGZpbmRJbnRlcnA7XG4gICAgICAgICAgICAgICAgdmFyIGZpbmRJbnRlcnBZID0geWMgPyBmaW5kSW50ZXJwRnJvbUNlbnRlcnMgOiBmaW5kSW50ZXJwO1xuICAgICAgICAgICAgICAgIHZhciB5aW50ZXJwLCByMCwgcjE7XG5cbiAgICAgICAgICAgICAgICAvLyBmaXJzdCBtYWtlIGFycmF5cyBvZiB4IGFuZCB5IHBpeGVsIGxvY2F0aW9ucyBvZiBicmljayBib3VuZGFyaWVzXG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgeEZvclB4Lmxlbmd0aDsgaSsrKSB4UGl4QXJyYXlbaV0gPSBNYXRoLnJvdW5kKHhhLmMycCh4Rm9yUHhbaV0pIC0gbGVmdCk7XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgeUZvclB4Lmxlbmd0aDsgaSsrKSB5UGl4QXJyYXlbaV0gPSBNYXRoLnJvdW5kKHlhLmMycCh5Rm9yUHhbaV0pIC0gdG9wKTtcblxuICAgICAgICAgICAgICAgIC8vIHRoZW4gbWFrZSBhcnJheXMgb2YgaW50ZXJwb2xhdGlvbnNcbiAgICAgICAgICAgICAgICAvLyAoYmluMD1jbG9zZXN0LCBiaW4xPW5leHQsIGZyYWM9ZnJhY3Rpb25hbCBkaXN0LilcbiAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBpbWFnZVdpZHRoOyBpKyspIHhpbnRlcnBBcnJheVtpXSA9IGZpbmRJbnRlcnBYKGksIHhQaXhBcnJheSk7XG5cbiAgICAgICAgICAgICAgICAvLyBub3cgZG8gdGhlIGludGVycG9sYXRpb25zIGFuZCBmaWxsIHRoZSBwbmdcbiAgICAgICAgICAgICAgICBmb3IoaiA9IDA7IGogPCBpbWFnZUhlaWdodDsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHlpbnRlcnAgPSBmaW5kSW50ZXJwWShqLCB5UGl4QXJyYXkpO1xuICAgICAgICAgICAgICAgICAgICByMCA9IHpbeWludGVycC5iaW4wXTtcbiAgICAgICAgICAgICAgICAgICAgcjEgPSB6W3lpbnRlcnAuYmluMV07XG4gICAgICAgICAgICAgICAgICAgIGZvcihpID0gMDsgaSA8IGltYWdlV2lkdGg7IGkrKywgcHhJbmRleCArPSA0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjID0gaW50ZXJwQ29sb3IocjAsIHIxLCB4aW50ZXJwQXJyYXlbaV0sIHlpbnRlcnApO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHV0Q29sb3IocGl4ZWxzLCBweEluZGV4LCBjKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7IC8vIHpzbW9vdGggPSBmYXN0XG4gICAgICAgICAgICAgICAgZm9yKGogPSAwOyBqIDwgbTsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgIHJvdyA9IHpbal07XG4gICAgICAgICAgICAgICAgICAgIHliID0geXB4KGopO1xuICAgICAgICAgICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBpbWFnZVdpZHRoOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGMgPSBzZXRDb2xvcihyb3dbaV0sIDEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgcHhJbmRleCA9ICh5YiAqIGltYWdlV2lkdGggKyB4cHgoaSkpICogNDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1dENvbG9yKHBpeGVscywgcHhJbmRleCwgYyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBpbWFnZURhdGEgPSBjb250ZXh0LmNyZWF0ZUltYWdlRGF0YShpbWFnZVdpZHRoLCBpbWFnZUhlaWdodCk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGltYWdlRGF0YS5kYXRhLnNldChwaXhlbHMpO1xuICAgICAgICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgICAgICAgdmFyIHB4QXJyYXkgPSBpbWFnZURhdGEuZGF0YTtcbiAgICAgICAgICAgICAgICB2YXIgZGxlbiA9IHB4QXJyYXkubGVuZ3RoO1xuICAgICAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IGRsZW47IGogKyspIHtcbiAgICAgICAgICAgICAgICAgICAgcHhBcnJheVtqXSA9IHBpeGVsc1tqXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnRleHQucHV0SW1hZ2VEYXRhKGltYWdlRGF0YSwgMCwgMCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHpzbW9vdGggPSBmYWxzZSAtPiBmaWxsaW5nIHBvdGVudGlhbGx5IGxhcmdlIGJyaWNrcyB3b3JrcyBmYXN0ZXN0IHdpdGggZmlsbFJlY3RcbiAgICAgICAgICAgIC8vIGdhcHMgZG8gbm90IG5lZWQgdG8gYmUgZXhhY3QgaW50ZWdlcnMsIGJ1dCBpZiB0aGV5ICphcmUqIHdlIHdpbGwgZ2V0XG4gICAgICAgICAgICAvLyBjbGVhbmVyIGVkZ2VzIGJ5IHJvdW5kaW5nIGF0IGxlYXN0IG9uZSBlZGdlXG4gICAgICAgICAgICB2YXIgeEdhcCA9IHRyYWNlLnhnYXA7XG4gICAgICAgICAgICB2YXIgeUdhcCA9IHRyYWNlLnlnYXA7XG4gICAgICAgICAgICB2YXIgeEdhcExlZnQgPSBNYXRoLmZsb29yKHhHYXAgLyAyKTtcbiAgICAgICAgICAgIHZhciB5R2FwVG9wID0gTWF0aC5mbG9vcih5R2FwIC8gMik7XG5cbiAgICAgICAgICAgIGZvcihqID0gMDsgaiA8IG07IGorKykge1xuICAgICAgICAgICAgICAgIHJvdyA9IHpbal07XG4gICAgICAgICAgICAgICAgeWIucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgIHliW3liaV0gPSB5cHgoaiArIDEpO1xuICAgICAgICAgICAgICAgIGlmKHliWzBdID09PSB5YlsxXSB8fCB5YlswXSA9PT0gdW5kZWZpbmVkIHx8IHliWzFdID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHhpID0geHB4KDApO1xuICAgICAgICAgICAgICAgIHhiID0gW3hpLCB4aV07XG4gICAgICAgICAgICAgICAgZm9yKGkgPSAwOyBpIDwgbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGJ1aWxkIG9uZSBjb2xvciBicmljayFcbiAgICAgICAgICAgICAgICAgICAgeGIucmV2ZXJzZSgpO1xuICAgICAgICAgICAgICAgICAgICB4Ylt4YmldID0geHB4KGkgKyAxKTtcbiAgICAgICAgICAgICAgICAgICAgaWYoeGJbMF0gPT09IHhiWzFdIHx8IHhiWzBdID09PSB1bmRlZmluZWQgfHwgeGJbMV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdiA9IHJvd1tpXTtcbiAgICAgICAgICAgICAgICAgICAgYyA9IHNldENvbG9yKHYsICh4YlsxXSAtIHhiWzBdKSAqICh5YlsxXSAtIHliWzBdKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFN0eWxlID0gJ3JnYmEoJyArIGMuam9pbignLCcpICsgJyknO1xuXG4gICAgICAgICAgICAgICAgICAgIGNvbnRleHQuZmlsbFJlY3QoeGJbMF0gKyB4R2FwTGVmdCwgeWJbMF0gKyB5R2FwVG9wLFxuICAgICAgICAgICAgICAgICAgICAgICAgeGJbMV0gLSB4YlswXSAtIHhHYXAsIHliWzFdIC0geWJbMF0gLSB5R2FwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByY291bnQgPSBNYXRoLnJvdW5kKHJjb3VudCAvIHBpeGNvdW50KTtcbiAgICAgICAgZ2NvdW50ID0gTWF0aC5yb3VuZChnY291bnQgLyBwaXhjb3VudCk7XG4gICAgICAgIGJjb3VudCA9IE1hdGgucm91bmQoYmNvdW50IC8gcGl4Y291bnQpO1xuICAgICAgICB2YXIgYXZnQ29sb3IgPSB0aW55Y29sb3IoJ3JnYignICsgcmNvdW50ICsgJywnICsgZ2NvdW50ICsgJywnICsgYmNvdW50ICsgJyknKTtcblxuICAgICAgICBnZC5faG1waXhjb3VudCA9IChnZC5faG1waXhjb3VudHx8MCkgKyBwaXhjb3VudDtcbiAgICAgICAgZ2QuX2htbHVtY291bnQgPSAoZ2QuX2htbHVtY291bnR8fDApICsgcGl4Y291bnQgKiBhdmdDb2xvci5nZXRMdW1pbmFuY2UoKTtcblxuICAgICAgICB2YXIgaW1hZ2UzID0gcGxvdEdyb3VwLnNlbGVjdEFsbCgnaW1hZ2UnKVxuICAgICAgICAgICAgLmRhdGEoY2QpO1xuXG4gICAgICAgIGltYWdlMy5lbnRlcigpLmFwcGVuZCgnc3ZnOmltYWdlJykuYXR0cih7XG4gICAgICAgICAgICB4bWxuczogeG1sbnNOYW1lc3BhY2VzLnN2ZyxcbiAgICAgICAgICAgIHByZXNlcnZlQXNwZWN0UmF0aW86ICdub25lJ1xuICAgICAgICB9KTtcblxuICAgICAgICBpbWFnZTMuYXR0cih7XG4gICAgICAgICAgICBoZWlnaHQ6IGltYWdlSGVpZ2h0LFxuICAgICAgICAgICAgd2lkdGg6IGltYWdlV2lkdGgsXG4gICAgICAgICAgICB4OiBsZWZ0LFxuICAgICAgICAgICAgeTogdG9wLFxuICAgICAgICAgICAgJ3hsaW5rOmhyZWYnOiBjYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxuICAgICAgICB9KTtcbiAgICB9KTtcbn07XG5cbi8vIGdldCBpbnRlcnBvbGF0ZWQgYmluIHZhbHVlLiBSZXR1cm5zIHtiaW4wOmNsb3Nlc3QgYmluLCBmcmFjOmZyYWN0aW9uYWwgZGlzdCB0byBuZXh0LCBiaW4xOm5leHQgYmlufVxuZnVuY3Rpb24gZmluZEludGVycChwaXhlbCwgcGl4QXJyYXkpIHtcbiAgICB2YXIgbWF4QmluID0gcGl4QXJyYXkubGVuZ3RoIC0gMjtcbiAgICB2YXIgYmluID0gTGliLmNvbnN0cmFpbihMaWIuZmluZEJpbihwaXhlbCwgcGl4QXJyYXkpLCAwLCBtYXhCaW4pO1xuICAgIHZhciBwaXgwID0gcGl4QXJyYXlbYmluXTtcbiAgICB2YXIgcGl4MSA9IHBpeEFycmF5W2JpbiArIDFdO1xuICAgIHZhciBpbnRlcnAgPSBMaWIuY29uc3RyYWluKGJpbiArIChwaXhlbCAtIHBpeDApIC8gKHBpeDEgLSBwaXgwKSAtIDAuNSwgMCwgbWF4QmluKTtcbiAgICB2YXIgYmluMCA9IE1hdGgucm91bmQoaW50ZXJwKTtcbiAgICB2YXIgZnJhYyA9IE1hdGguYWJzKGludGVycCAtIGJpbjApO1xuXG4gICAgaWYoIWludGVycCB8fCBpbnRlcnAgPT09IG1heEJpbiB8fCAhZnJhYykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmluMDogYmluMCxcbiAgICAgICAgICAgIGJpbjE6IGJpbjAsXG4gICAgICAgICAgICBmcmFjOiAwXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIGJpbjA6IGJpbjAsXG4gICAgICAgIGZyYWM6IGZyYWMsXG4gICAgICAgIGJpbjE6IE1hdGgucm91bmQoYmluMCArIGZyYWMgLyAoaW50ZXJwIC0gYmluMCkpXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gZmluZEludGVycEZyb21DZW50ZXJzKHBpeGVsLCBjZW50ZXJQaXhBcnJheSkge1xuICAgIHZhciBtYXhCaW4gPSBjZW50ZXJQaXhBcnJheS5sZW5ndGggLSAxO1xuICAgIHZhciBiaW4gPSBMaWIuY29uc3RyYWluKExpYi5maW5kQmluKHBpeGVsLCBjZW50ZXJQaXhBcnJheSksIDAsIG1heEJpbik7XG4gICAgdmFyIHBpeDAgPSBjZW50ZXJQaXhBcnJheVtiaW5dO1xuICAgIHZhciBwaXgxID0gY2VudGVyUGl4QXJyYXlbYmluICsgMV07XG4gICAgdmFyIGZyYWMgPSAoKHBpeGVsIC0gcGl4MCkgLyAocGl4MSAtIHBpeDApKSB8fCAwO1xuICAgIGlmKGZyYWMgPD0gMCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmluMDogYmluLFxuICAgICAgICAgICAgYmluMTogYmluLFxuICAgICAgICAgICAgZnJhYzogMFxuICAgICAgICB9O1xuICAgIH1cbiAgICBpZihmcmFjIDwgMC41KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBiaW4wOiBiaW4sXG4gICAgICAgICAgICBiaW4xOiBiaW4gKyAxLFxuICAgICAgICAgICAgZnJhYzogZnJhY1xuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBiaW4wOiBiaW4gKyAxLFxuICAgICAgICBiaW4xOiBiaW4sXG4gICAgICAgIGZyYWM6IDEgLSBmcmFjXG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcHV0Q29sb3IocGl4ZWxzLCBweEluZGV4LCBjKSB7XG4gICAgcGl4ZWxzW3B4SW5kZXhdID0gY1swXTtcbiAgICBwaXhlbHNbcHhJbmRleCArIDFdID0gY1sxXTtcbiAgICBwaXhlbHNbcHhJbmRleCArIDJdID0gY1syXTtcbiAgICBwaXhlbHNbcHhJbmRleCArIDNdID0gTWF0aC5yb3VuZChjWzNdICogMjU1KTtcbn1cbiIsIi8qKlxuKiBDb3B5cmlnaHQgMjAxMi0yMDIwLCBQbG90bHksIEluYy5cbiogQWxsIHJpZ2h0cyByZXNlcnZlZC5cbipcbiogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXG4qIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiovXG5cblxuJ3VzZSBzdHJpY3QnO1xuXG52YXIgZDMgPSByZXF1aXJlKCdkMycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHN0eWxlKGdkKSB7XG4gICAgZDMuc2VsZWN0KGdkKS5zZWxlY3RBbGwoJy5obSBpbWFnZScpXG4gICAgICAgIC5zdHlsZSgnb3BhY2l0eScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnRyYWNlLm9wYWNpdHk7XG4gICAgICAgIH0pO1xufTtcbiJdLCJzb3VyY2VSb290IjoiIn0=