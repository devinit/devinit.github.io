(self.webpackChunkdi_website=self.webpackChunkdi_website||[]).push([[8949,1941,5072],{7127:e=>{e.exports=function(e,t){var r=t[0],i=t[1],o=t[2],n=t[3],a=r+r,l=i+i,s=o+o,d=r*a,c=i*a,h=i*l,f=o*a,u=o*l,p=o*s,v=n*a,y=n*l,m=n*s;return e[0]=1-h-p,e[1]=c+m,e[2]=f-y,e[3]=0,e[4]=c-m,e[5]=1-d-p,e[6]=u+v,e[7]=0,e[8]=f+y,e[9]=u-v,e[10]=1-d-h,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,e}},44551:(e,t,r)=>{"use strict";var i=r(35924),o=r(97997),n=r(34141),a=r(69337),l=r(46493),s=r(44050),d=r(27961),c=r(82519),h=r(35531),f=r(23913),u=r(53522),p=r(77212).WEEKDAY_PATTERN,v=r(77212).HOUR_PATTERN;function y(e,t,r){function o(r,i){return n.coerce(e,t,l.rangebreaks,r,i)}if(o("enabled")){var a=o("bounds");if(a&&a.length>=2){var s,d,c="";if(2===a.length)for(s=0;s<2;s++)if(d=g(a[s])){c=p;break}var h=o("pattern",c);if(h===p)for(s=0;s<2;s++)(d=g(a[s]))&&(t.bounds[s]=a[s]=d-1);if(h)for(s=0;s<2;s++)switch(d=a[s],h){case p:if(!i(d))return void(t.enabled=!1);if((d=+d)!==Math.floor(d)||d<0||d>=7)return void(t.enabled=!1);t.bounds[s]=a[s]=d;break;case v:if(!i(d))return void(t.enabled=!1);if((d=+d)<0||d>24)return void(t.enabled=!1);t.bounds[s]=a[s]=d}if(!1===r.autorange){var f=r.range;if(f[0]<f[1]){if(a[0]<f[0]&&a[1]>f[1])return void(t.enabled=!1)}else if(a[0]>f[0]&&a[1]<f[1])return void(t.enabled=!1)}}else{var u=o("values");if(!u||!u.length)return void(t.enabled=!1);o("dvalue")}}}e.exports=function(e,t,r,i,v){var m=i.letter,g=i.font||{},b=i.splomStash||{},x=r("visible",!i.visibleDflt),w=t._template||{},T=t.type||w.type||"-";"date"===T&&o.getComponentMethod("calendars","handleDefaults")(e,t,"calendar",i.calendar),u(t,v);var _=!t.isValidRange(e.range);_&&i.reverseDflt&&(_="reversed"),!r("autorange",_)||"linear"!==T&&"-"!==T||r("rangemode"),r("range"),t.cleanRange(),h(e,t,r,i),"category"===T||i.noHover||r("hoverformat");var z=r("color"),k=z!==l.color.dflt?z:g.color,j=b.label||v._dfltTitle[m];if(c(e,t,r,T,i,{pass:1}),!x)return t;r("title.text",j),n.coerceFont(r,"title.font",{family:g.family,size:Math.round(1.2*g.size),color:k}),s(e,t,r,T),c(e,t,r,T,i,{pass:2}),d(e,t,r,i),f(e,t,r,{dfltColor:z,bgColor:i.bgColor,showGrid:i.showGrid,attributes:l}),(t.showline||t.ticks)&&r("mirror"),i.automargin&&r("automargin");var S,C="multicategory"===T;if(i.noTickson||"category"!==T&&!C||!t.ticks&&!t.showgrid||(C&&(S="boundaries"),r("tickson",S)),C&&r("showdividers")&&(r("dividercolor"),r("dividerwidth")),"date"===T)if(a(e,t,{name:"rangebreaks",inclusionAttr:"enabled",handleItemDefaults:y}),t.rangebreaks.length){for(var A=0;A<t.rangebreaks.length;A++)if(t.rangebreaks[A].pattern===p){t._hasDayOfWeekBreaks=!0;break}if(u(t,v),v._has("scattergl")||v._has("splom"))for(var D=0;D<i.data.length;D++){var M=i.data[D];"scattergl"!==M.type&&"splom"!==M.type||(M.visible=!1,n.warn(M.type+" traces do not work on axes with rangebreaks. Setting trace "+M.index+" to `visible: false`."))}}else delete t.rangebreaks;return t};var m={sun:1,mon:2,tue:3,wed:4,thu:5,fri:6,sat:7};function g(e){if("string"==typeof e)return m[e.substr(0,3).toLowerCase()]}},35531:e=>{"use strict";e.exports=function(e,t,r,i){if("category"===t.type){var o,n=e.categoryarray,a=Array.isArray(n)&&n.length>0;a&&(o="array");var l,s=r("categoryorder",o);"array"===s&&(l=r("categoryarray")),a||"array"!==s||(s=t.categoryorder="trace"),"trace"===s?t._initialCategories=[]:"array"===s?t._initialCategories=l.slice():(l=function(e,t){var r,i,o,n=t.dataAttr||e._id.charAt(0),a={};if(t.axData)r=t.axData;else for(r=[],i=0;i<t.data.length;i++){var l=t.data[i];l[n+"axis"]===e._id&&r.push(l)}for(i=0;i<r.length;i++){var s=r[i][n];for(o=0;o<s.length;o++){var d=s[o];null!=d&&(a[d]=1)}}return Object.keys(a)}(t,i).sort(),"category ascending"===s?t._initialCategories=l:"category descending"===s&&(t._initialCategories=l.reverse()))}}},23913:(e,t,r)=>{"use strict";var i=r(17621).mix,o=r(28604).lightFraction,n=r(34141);e.exports=function(e,t,r,a){var l=(a=a||{}).dfltColor;function s(r,i){return n.coerce2(e,t,a.attributes,r,i)}var d=s("linecolor",l),c=s("linewidth");r("showline",a.showLine||!!d||!!c)||(delete t.linecolor,delete t.linewidth);var h=s("gridcolor",i(l,a.bgColor,a.blend||o).toRgbString()),f=s("gridwidth");if(r("showgrid",a.showGrid||!!h||!!f)||(delete t.gridcolor,delete t.gridwidth),!a.noZeroLine){var u=s("zerolinecolor",l),p=s("zerolinewidth");r("zeroline",a.showGrid||!!u||!!p)||(delete t.zerolinecolor,delete t.zerolinewidth)}}},37322:(e,t,r)=>{"use strict";var i=r(97997).traceIs,o=r(16757);function n(e){return{v:"x",h:"y"}[e.orientation||"v"]}function a(e,t){var r=n(e),o=i(e,"box-violin"),a=i(e._fullInput||{},"candlestick");return o&&!a&&t===r&&void 0===e[r]&&void 0===e[r+"0"]}e.exports=function(e,t,r,l){"-"===r("type",(l.splomStash||{}).type)&&(function(e,t){if("-"===e.type){var r,l=e._id,s=l.charAt(0);-1!==l.indexOf("scene")&&(l=s);var d=function(e,t,r){for(var i=0;i<e.length;i++){var o=e[i];if("splom"===o.type&&o._length>0&&(o["_"+r+"axes"]||{})[t])return o;if((o[r+"axis"]||r)===t){if(a(o,r))return o;if((o[r]||[]).length||o[r+"0"])return o}}}(t,l,s);if(d)if("histogram"!==d.type||s!=={v:"y",h:"x"}[d.orientation||"v"]){var c=s+"calendar",h=d[c],f={noMultiCategory:!i(d,"cartesian")||i(d,"noMultiCategory")};if("box"===d.type&&d._hasPreCompStats&&s==={h:"x",v:"y"}[d.orientation||"v"]&&(f.noMultiCategory=!0),a(d,s)){var u=n(d),p=[];for(r=0;r<t.length;r++){var v=t[r];i(v,"box-violin")&&(v[s+"axis"]||s)===l&&(void 0!==v[u]?p.push(v[u][0]):void 0!==v.name?p.push(v.name):p.push("text"),v[c]!==h&&(h=void 0))}e.type=o(p,h,f)}else if("splom"===d.type){var y=d.dimensions[d._axesDim[l]];y.visible&&(e.type=o(y.values,h,f))}else e.type=o(d[s]||[d[s+"0"]],h,f)}else e.type="linear"}}(t,l.data),"-"===t.type?t.type="linear":e.type=t.type)}},72910:(e,t,r)=>{"use strict";var i=r(94867).extendFlat;t.Y=function(e,t){t=t||{};var r={valType:"info_array",role:"info",editType:(e=e||{}).editType,items:[{valType:"number",min:0,max:1,editType:e.editType},{valType:"number",min:0,max:1,editType:e.editType}],dflt:[0,1]},o=e.name?e.name+" ":"",n=e.trace?"trace ":"subplot ",a=t.description?" "+t.description:"",l={x:i({},r,{description:["Sets the horizontal domain of this ",o,n,"(in plot fraction).",a].join("")}),y:i({},r,{description:["Sets the vertical domain of this ",o,n,"(in plot fraction).",a].join("")}),editType:e.editType};return e.noGridCell||(l.row={valType:"integer",min:0,dflt:0,role:"info",editType:e.editType,description:["If there is a layout grid, use the domain ","for this row in the grid for this ",o,n,".",a].join("")},l.column={valType:"integer",min:0,dflt:0,role:"info",editType:e.editType,description:["If there is a layout grid, use the domain ","for this column in the grid for this ",o,n,".",a].join("")}),l},t.c=function(e,t,r,i){var o=i&&i.x||[0,1],n=i&&i.y||[0,1],a=t.grid;if(a){var l=r("domain.column");void 0!==l&&(l<a.columns?o=a._domains.x[l]:delete e.domain.column);var s=r("domain.row");void 0!==s&&(s<a.rows?n=a._domains.y[s]:delete e.domain.row)}var d=r("domain.x",o),c=r("domain.y",n);d[0]<d[1]||(e.domain.x=o.slice()),c[0]<c[1]||(e.domain.y=n.slice())}},80647:e=>{"use strict";function t(e,t){var r,i,o=[0,0,0,0];for(r=0;r<4;++r)for(i=0;i<4;++i)o[i]+=e[4*r+i]*t[r];return o}e.exports=function(e,r){return t(e.projection,t(e.view,t(e.model,[r[0],r[1],r[2],1])))}},68938:(e,t,r)=>{"use strict";var i=r(34141).maxRowLength;e.exports=function(e){var t,r,o,n,a,l,s,d,c=[],h={},f=[],u=e[0],p=[],v=[0,0,0],y=i(e);for(r=0;r<e.length;r++)for(t=p,p=u,u=e[r+1]||[],o=0;o<y;o++)void 0===p[o]&&((l=(void 0!==p[o-1]?1:0)+(void 0!==p[o+1]?1:0)+(void 0!==t[o]?1:0)+(void 0!==u[o]?1:0))?(0===r&&l++,0===o&&l++,r===e.length-1&&l++,o===p.length-1&&l++,l<4&&(h[[r,o]]=[r,o,l]),c.push([r,o,l])):f.push([r,o]));for(;f.length;){for(s={},d=!1,a=f.length-1;a>=0;a--)(l=((h[[(r=(n=f[a])[0])-1,o=n[1]]]||v)[2]+(h[[r+1,o]]||v)[2]+(h[[r,o-1]]||v)[2]+(h[[r,o+1]]||v)[2])/20)&&(s[n]=[r,o,l],f.splice(a,1),d=!0);if(!d)throw"findEmpties iterated with no new neighbors";for(n in s)h[n]=s[n],c.push(s[n])}return c.sort((function(e,t){return t[2]-e[2]}))}},37353:(e,t,r)=>{"use strict";var i=r(34141),o=[[-1,0],[1,0],[0,-1],[0,1]];function n(e){return.5-.25*Math.min(1,.5*e)}function a(e,t,r){var i,n,a,l,s,d,c,h,f,u,p,v,y,m=0;for(l=0;l<t.length;l++){for(n=(i=t[l])[0],a=i[1],p=e[n][a],u=0,f=0,s=0;s<4;s++)(c=e[n+(d=o[s])[0]])&&void 0!==(h=c[a+d[1]])&&(0===u?v=y=h:(v=Math.min(v,h),y=Math.max(y,h)),f++,u+=h);if(0===f)throw"iterateInterp2d order is wrong: no defined neighbors";e[n][a]=u/f,void 0===p?f<4&&(m=1):(e[n][a]=(1+r)*e[n][a]-r*p,y>v&&(m=Math.max(m,Math.abs(e[n][a]-p)/(y-v))))}return m}e.exports=function(e,t){var r,o=1;for(a(e,t),r=0;r<t.length&&!(t[r][2]<4);r++);for(t=t.slice(r),r=0;r<100&&o>.01;r++)o=a(e,t,n(o));return o>.01&&i.log("interp2d didn't converge quickly",o),e}},71698:(e,t,r)=>{"use strict";var i=r(57597),o=r(85088),n=r(88176).f,a=r(85485),l=r(94867).extendFlat,s=r(15716).overrideAll;function d(e){return{valType:"boolean",role:"info",dflt:!1,description:["Determines whether or not these contour lines are projected","on the",e,"plane.","If `highlight` is set to *true* (the default), the projected","lines are shown on hover.","If `show` is set to *true*, the projected lines are shown","in permanence."].join(" ")}}function c(e){return{show:{valType:"boolean",role:"info",dflt:!1,description:["Determines whether or not contour lines about the",e,"dimension are drawn."].join(" ")},start:{valType:"number",dflt:null,role:"style",editType:"plot",description:["Sets the starting contour level value.","Must be less than `contours.end`"].join(" ")},end:{valType:"number",dflt:null,role:"style",editType:"plot",description:["Sets the end contour level value.","Must be more than `contours.start`"].join(" ")},size:{valType:"number",dflt:null,min:0,role:"style",editType:"plot",description:["Sets the step between each contour level.","Must be positive."].join(" ")},project:{x:d("x"),y:d("y"),z:d("z")},color:{valType:"color",role:"style",dflt:i.defaultLine,description:"Sets the color of the contour lines."},usecolormap:{valType:"boolean",role:"info",dflt:!1,description:["An alternate to *color*.","Determines whether or not the contour lines are colored using","the trace *colorscale*."].join(" ")},width:{valType:"number",role:"style",min:1,max:16,dflt:2,description:"Sets the width of the contour lines."},highlight:{valType:"boolean",role:"info",dflt:!0,description:["Determines whether or not contour lines about the",e,"dimension are highlighted on hover."].join(" ")},highlightcolor:{valType:"color",role:"style",dflt:i.defaultLine,description:"Sets the color of the highlighted contour lines."},highlightwidth:{valType:"number",role:"style",min:1,max:16,dflt:2,description:"Sets the width of the highlighted contour lines."}}}var h=e.exports=s(l({z:{valType:"data_array",description:"Sets the z coordinates."},x:{valType:"data_array",description:"Sets the x coordinates."},y:{valType:"data_array",description:"Sets the y coordinates."},text:{valType:"string",role:"info",dflt:"",arrayOk:!0,description:["Sets the text elements associated with each z value.","If trace `hoverinfo` contains a *text* flag and *hovertext* is not set,","these elements will be seen in the hover labels."].join(" ")},hovertext:{valType:"string",role:"info",dflt:"",arrayOk:!0,description:"Same as `text`."},hovertemplate:n(),connectgaps:{valType:"boolean",dflt:!1,role:"info",editType:"calc",description:["Determines whether or not gaps","(i.e. {nan} or missing values)","in the `z` data are filled in."].join(" ")},surfacecolor:{valType:"data_array",description:["Sets the surface color values,","used for setting a color scale independent of `z`."].join(" ")}},o("",{colorAttr:"z or surfacecolor",showScaleDflt:!0,autoColorDflt:!1,editTypeOverride:"calc"}),{contours:{x:c("x"),y:c("y"),z:c("z")},hidesurface:{valType:"boolean",role:"info",dflt:!1,description:["Determines whether or not a surface is drawn.","For example, set `hidesurface` to *false*","`contours.x.show` to *true* and","`contours.y.show` to *true* to draw a wire frame plot."].join(" ")},lightposition:{x:{valType:"number",role:"style",min:-1e5,max:1e5,dflt:10,description:"Numeric vector, representing the X coordinate for each vertex."},y:{valType:"number",role:"style",min:-1e5,max:1e5,dflt:1e4,description:"Numeric vector, representing the Y coordinate for each vertex."},z:{valType:"number",role:"style",min:-1e5,max:1e5,dflt:0,description:"Numeric vector, representing the Z coordinate for each vertex."}},lighting:{ambient:{valType:"number",role:"style",min:0,max:1,dflt:.8,description:"Ambient light increases overall color visibility but can wash out the image."},diffuse:{valType:"number",role:"style",min:0,max:1,dflt:.8,description:"Represents the extent that incident rays are reflected in a range of angles."},specular:{valType:"number",role:"style",min:0,max:2,dflt:.05,description:"Represents the level that incident rays are reflected in a single direction, causing shine."},roughness:{valType:"number",role:"style",min:0,max:1,dflt:.5,description:"Alters specular reflection; the rougher the surface, the wider and less contrasty the shine."},fresnel:{valType:"number",role:"style",min:0,max:5,dflt:.2,description:["Represents the reflectance as a dependency of the viewing angle; e.g. paper is reflective","when viewing it from the edge of the paper (almost 90 degrees), causing shine."].join(" ")}},opacity:{valType:"number",role:"style",min:0,max:1,dflt:1,description:["Sets the opacity of the surface.","Please note that in the case of using high `opacity` values for example a value","greater than or equal to 0.5 on two surfaces (and 0.25 with four surfaces), an","overlay of multiple transparent surfaces may not perfectly be sorted in depth by the","webgl API. This behavior may be improved in the near future and is subject to change."].join(" ")},opacityscale:{valType:"any",role:"style",editType:"calc",description:["Sets the opacityscale."," The opacityscale must be an array containing"," arrays mapping a normalized value to an opacity value."," At minimum, a mapping for the lowest (0) and highest (1)"," values are required. For example,"," `[[0, 1], [0.5, 0.2], [1, 1]]` means that higher/lower values would have"," higher opacity values and those in the middle would be more transparent"," Alternatively, `opacityscale` may be a palette name string"," of the following list: 'min', 'max', 'extremes' and 'uniform'."," The default is 'uniform'."].join("")},_deprecated:{zauto:l({},o.zauto,{description:"Obsolete. Use `cauto` instead."}),zmin:l({},o.zmin,{description:"Obsolete. Use `cmin` instead."}),zmax:l({},o.zmax,{description:"Obsolete. Use `cmax` instead."})},hoverinfo:l({},a.hoverinfo),showlegend:l({},a.showlegend,{dflt:!1})}),"calc","nested");h.x.editType=h.y.editType=h.z.editType="calc+clearAxisTypes",h.transforms=void 0},41941:()=>{}}]);