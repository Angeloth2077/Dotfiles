/*! (C) Copyright 2020 LanguageTooler GmbH. All rights reserved. */
class DomMeasurement{constructor(t=document){this._window=t.defaultView,this._document=t,this.clearCache()}_getElementCache(t){let e=this._elementCache.get(t);return e||(e={},this._elementCache.set(t,e)),e}clearCache(){this._documentVisibleBox=null,this._documentGap=null,this._documentScroll=null,this._elementCache=new WeakMap}_contains(t,e){return t&&t!==e&&t.contains(e)}_getComputedStyle(t,e,o){let i,n;return"object"==typeof e?(i=e,n=""):(i=o,n=e),i.computedStyle||(i.computedStyle=new Map),i.computedStyle.has(n)||i.computedStyle.set(n,this._window.getComputedStyle(t,n||null)),i.computedStyle.get(n)}getComputedStyle(t,e=""){return this._getComputedStyle(t,e,this._getElementCache(t))}_getComputedStyleMap(t,e){return t.computedStyleMap?(e.computedStyleMap||(e.computedStyleMap=t.computedStyleMap()),e.computedStyleMap):null}getComputedStyleMap(t){return this._getComputedStyleMap(t,this._getElementCache(t))}getInlineStyle(t,e){return t.style.getPropertyValue(e)}getStyle(t,e,o=""){return this.getStyles(t,[e],o)[e]}getStyles(t,e,o=""){let i=null,n={};const r=this._getElementCache(t);for(const s of e)if(i=i||this._getComputedStyle(t,o,r),"line-height"===s||"lineHeight"===s)n[s]=this.getInlineStyle(t,s)||i[s]||"";else if("font"!==s||i[s])n[s]="zoom"===s?i[s]||"1":i[s]||"";else{const e=i["font-style"],o=i["font-variant"],r=i["font-weight"],l=i["font-size"],h=this.getInlineStyle(t,"line-height")||i["line-height"]||"",c=i["font-family"];n[s]=`${e} ${o} ${r} ${l} ${h?"/ "+h:""} ${c}`}return n}getExactStyle(t,e){return this.getExactStyles(t,[e])[e]}getExactStyles(t,e){const o=this._getElementCache(t),i=this._getComputedStyleMap(t,o);if(i){const t={};for(const o of e){const e=i.get(o);e?"number"==typeof(n=e).value&&"string"==typeof n.unit?"number"===e.unit?t[o]=e.value.toString():t[o]=e.value+e.unit:t[o]=e.toString():t[o]=""}return t}return this.getStyles(t,e);var n}setStyles(t,e,o=!1){Array.isArray(t)||(t=[t]);for(const i of t)for(const t in e){let n=e[t].trim();const r=o||DomMeasurement.IMPORTANT_REG_EXP.test(n);n=n.replace(DomMeasurement.IMPORTANT_REG_EXP,""),i.style.setProperty(t,n,r?"important":"")}}copyStyles(t,e,o,i=!1){const n=this.getStyles(t,o);this.setStyles(e,n,i)}resetStyles(t,e,o=!1){Array.isArray(t)||(t=[t]);let i="";for(const t in e){let n=e[t].trim();o&&!DomMeasurement.IMPORTANT_REG_EXP.test(n)&&(n+=" !important"),i+=`${t}: ${n};`}for(const e of t)e.style.cssText=i}removeStyle(t,e){Array.isArray(t)||(t=[t]),this.removeStyles(t,[e])}removeStyles(t,e){Array.isArray(t)||(t=[t]);for(const o of t)for(const t of e)o.style.removeProperty(t)}_getBoundingClientRect(t,e){return e.boundingClientRect||(e.boundingClientRect=deepClone(t.getBoundingClientRect())),e.boundingClientRect}_getBorderBox(t,e,o,i){const n="borderBox"+(e?"WithScroll":"")+(o?"WithScale":"");if(!i[n]){const r=this._getBoundingClientRect(t,i);let{top:s,left:l,width:h,height:c}=r;if(o){const e=this.getZoom(t);s*=e,l*=e,h*=e,c*=e}else{const e=this._getScaleFactor(t,i);h/=e.x,c/=e.y}if(e){const e=this.getDocumentScroll();if(s+=e.top,l+=e.left,this._document.body&&this._contains(this._document.body,t)){const t=this.getDocumentGap();s-=t.top,l-=t.left}}i[n]={top:s,right:l+h,bottom:s+c,left:l,width:h,height:c}}return i[n]}getBorderBox(t,e=!0,o=!0){return this._getBorderBox(t,e,o,this._getElementCache(t))}_getPaddingBox(t,e,o,i){const n="paddingBox"+(e?"WithScroll":"")+(o?"WithScale":"");if(!i[n]){let{top:r,left:s,width:l,height:h}=this._getBorderBox(t,e,o,i),c={x:1,y:1};o&&(c=this._getScaleFactor(t,i));const d=o?this._getZoom(t,i):1,m=this._getComputedStyle(t,i),a=(parseFloat(m["border-top-width"])||0)*c.y*d,u=(parseFloat(m["border-right-width"])||0)*c.x*d,g=(parseFloat(m["border-bottom-width"])||0)*c.y*d,p=(parseFloat(m["border-left-width"])||0)*c.x*d;let _=0,f=0;if("BackCompat"!==this._document.compatMode||t!==this._document.body||t!==this._document.scrollingElement){const e=t.clientWidth*c.x*d,o=t.clientHeight*c.y*d;_=l-p-e-u,f=h-a-o-g,_<1&&(_=0),f<1&&(f=0)}r+=a,s+=p,l=l-p-_-u,h=h-a-f-g,this._isRTL(t,i)&&(s+=_),i[n]={top:r,right:s+l,bottom:r+h,left:s,width:l,height:h,border:{top:a,right:u,bottom:g,left:p}}}return i[n]}getPaddingBox(t,e=!0,o=!0){return this._getPaddingBox(t,e,o,this._getElementCache(t))}_getContentBox(t,e,o,i){const n="contentBox"+(e?"WithScroll":"")+(o?"WithScale":"");if(!i[n]){let{top:r,left:s,width:l,height:h,border:c}=this._getPaddingBox(t,e,o,i),d={x:1,y:1};o&&(d=this._getScaleFactor(t,i));const m=o?this._getZoom(t,i):1,a=this._getComputedStyle(t,i),u=(parseFloat(a["padding-top"])||0)*d.y*m,g=(parseFloat(a["padding-right"])||0)*d.x*m,p=(parseFloat(a["padding-bottom"])||0)*d.y*m,_=(parseFloat(a["padding-left"])||0)*d.x*m;r+=u,s+=_,l=l-_-g,h=h-u-p,i[n]={top:r,right:s+l,bottom:r+h,left:s,width:l,height:h,border:c,padding:{top:u,right:g,bottom:p,left:_}}}return i[n]}getContentBox(t,e=!0,o=!0){return this._getContentBox(t,e,o,this._getElementCache(t))}_getScrollDimensions(t,e,o){const i="scrollDimensions"+(e?"WithScale":"");if(!o[i]){let n=t.scrollWidth,r=t.scrollHeight;if(e){const e=this._getScaleFactor(t,o),i=this._getZoom(t,o);n=n*e.x*i,r=r*e.y*i}o[i]={width:n,height:r}}return o[i]}getScrollDimensions(t,e=!0){return this._getScrollDimensions(t,e,this._getElementCache(t))}_getScrollPosition(t,e,o,i){const n="scrollPosition"+(e?"WithScale":"")+(o?"WithZoom":"");if(!i[n]){let r={x:1,y:1};e&&(r=this._getScaleFactor(t,i));const s=o?this._getZoom(t,i):1,l=t===this._document.body&&"BackCompat"===this._document.compatMode,h=l?0:t.scrollTop*r.y*s,c=l?0:t.scrollLeft*r.x*s;i[n]={top:h,left:c}}return i[n]}getScrollPosition(t,e=!0,o=e){return this._getScrollPosition(t,e,o,this._getElementCache(t))}getScaleFactor(t){return this._getScaleFactor(t,this._getElementCache(t))}_getScaleFactor(t,e){if(void 0===e.scaleFactor){if(t instanceof SVGElement){if(BrowserDetector.isFirefox()||BrowserDetector.isThunderbird())return{x:1,y:1};let e=1;const o=t.getAttribute("transform")||"",i=/scale\((\d+(\.\d+)?)\)/.exec(o);return i&&(e=+i[1]),{x:e,y:e}}{const o=this._getBoundingClientRect(t,e),i=t.offsetWidth,n=t.offsetHeight;e.scaleFactor={x:1,y:1},o.width>0&&i>0&&Math.abs(o.width-i)>1&&(e.scaleFactor.x=o.width/i),o.height>0&&n>0&&Math.abs(o.height-n)>1&&(e.scaleFactor.y=o.height/n)}}return e.scaleFactor}_getZoom(t,e){if(BrowserDetector.isFirefox()||BrowserDetector.isThunderbird())return 1;if("number"!=typeof e.zoom){let o=1,i=t;for(;i&&i!==this._document.documentElement;){o*=+this.getStyle(i,"zoom"),i=i.parentElement}e.zoom=o}return e.zoom}getZoom(t){return this._getZoom(t,this._getElementCache(t))}_getStackingContextWithZIndex(t){const e=this.getComputedStyle(t),o=parseInt(e.zIndex||"");if(isNaN(o))return null;if(e.position&&DomMeasurement.NON_STATIC_POSITIONS.indexOf(e.position)>-1)return{zIndex:o};if(t.parentElement){const e=this.getComputedStyle(t.parentElement);if("flex"===e.display||"grid"===e.display)return{zIndex:o}}return null}getZIndex(t,e=this._document.documentElement){let o="auto",i=t;if(!i.ownerDocument)return"auto";const n=i.ownerDocument.defaultView.Element,r=i.ownerDocument.defaultView.ShadowRoot;for(;i&&i!==this._document&&i!==e&&i instanceof n;){const t=this._getStackingContextWithZIndex(i);t&&(o=t.zIndex),i=i.parentNode instanceof r?i.parentNode.host:i.parentElement}return o}_isRTL(t,e){return"boolean"!=typeof e.isRTL&&(e.isRTL="rtl"===this.getStyle(t,"direction")),e.isRTL}isRTL(t){return this._isRTL(t,this._getElementCache(t))}isStackingContext(t){const e=this.getComputedStyle(t);return!!(e.position&&DomMeasurement.NON_STATIC_POSITIONS.indexOf(e.position)>-1)||("none"!==e.transform||"none"!==e.filter||"none"!==e.clipPath||"none"!==e.perspective||Number(e.opacity)<1)}_getTextClientRects(t){const e=this._document.createRange();return e.setStart(t.node,t.start),e.setEnd(t.node,t.end),Array.from(e.getClientRects())}getTextBoundingBoxes(t,e,o=!0){Array.isArray(t)||(t=[t]);let i=[],n=0,r=0;if(o){const t=this.getDocumentScroll();if(n+=t.top,r+=t.left,this._document.body&&this._contains(this._document.body,e)){const t=this.getDocumentGap();n-=t.top,r-=t.left}}for(const e of t)try{const t=this._getTextClientRects(e);for(const e of t){if(e.width<DomMeasurement.MIN_TEXT_BOX_WIDTH)continue;const t=i[i.length-1],o=e.top+n,s=e.right+r,l=e.bottom+n,h=e.left+r,c=e.width,d=e.height;t&&t.right===h&&t.top===o&&t.bottom===l&&t.height===d?(t.right=s,t.width=t.width+c):i.push({top:o,right:s,bottom:l,left:h,width:c,height:d})}}catch(t){}return i}getRelativeTextBoundingBoxes(t,e,o=this.getScrollPosition(e)){Array.isArray(t)||(t=[t]);let i=[];const n=this.getPaddingBox(e,!1,!1),r=n.left-o.left,s=n.top-o.top;for(const e of t)try{const t=this._getTextClientRects(e);for(const e of t){if(e.width<DomMeasurement.MIN_TEXT_BOX_WIDTH)continue;const t=i[i.length-1],o=e.top-s,n=e.right-r,l=e.bottom-s,h=e.left-r,c=e.width,d=e.height;t&&t.right===h&&t.top===o&&t.bottom===l&&t.height===d?(t.right=n,t.width=t.width+c):i.push({top:o,right:n,bottom:l,left:h,width:c,height:d})}}catch(t){console.error("LT range error",t)}const l=this.getScaleFactor(e);for(const t of i)t.top=Math.round(t.top/l.y),t.right=Math.round(t.right/l.x),t.bottom=Math.round(t.bottom/l.y),t.left=Math.round(t.left/l.x),t.width=t.right-t.left,t.height=t.bottom-t.top;return i}getRelativeTextBoundingBox(t,e){const o=this.getRelativeTextBoundingBoxes(t,e),i=Math.min(...o.map((t=>t.top))),n=Math.max(...o.map((t=>t.right))),r=Math.max(...o.map((t=>t.bottom))),s=Math.min(...o.map((t=>t.left)));return{top:i,right:n,bottom:r,left:s,width:n-s,height:r-i}}_hasRelativePosition(t,e){const o=this._getComputedStyle(t,e).position||"static";return DomMeasurement.NON_STATIC_POSITIONS.indexOf(o)>-1}getDocumentGap(){if(!this._documentGap&&(this._documentGap={top:0,left:0},this._document.body&&this._hasRelativePosition(this._document.body,this._getElementCache(this._document.body)))){const t=this.getBorderBox(this._document.documentElement),e=this.getBorderBox(this._document.body);let o=this._document.documentElement.offsetTop,i=this._document.documentElement.offsetLeft;if(BrowserDetector.isFirefox()||BrowserDetector.isThunderbird()){let t=null;0===o&&(t=this.getComputedStyle(this._document.documentElement),o=parseInt(t["margin-top"])||0),0===i&&(t=t||this.getComputedStyle(this._document.documentElement),i=parseInt(t["margin-left"])||0)}const n=e.top-t.top+o,r=e.left-t.left+i,s=this.getComputedStyle(this._document.body),l=parseFloat(s["border-top-width"])||0,h=parseFloat(s["border-left-width"])||0;this._documentGap={top:n+l,left:r+h}}return this._documentGap}getDocumentVisibleBox(){if(!this._documentVisibleBox){const t=this.getDocumentScroll();let e=this._document.documentElement.clientHeight,o=this._document.documentElement.clientWidth;BrowserDetector.isThunderbird()&&(e=window.innerHeight,o=window.innerWidth),this._documentVisibleBox={top:t.top,right:t.left+o,bottom:t.top+e,left:t.left,width:o,height:e}}return this._documentVisibleBox}getDocumentScroll(){if(!this._documentScroll){const t=this._document.documentElement&&this._document.documentElement.scrollTop||this._document.body&&this._document.body.scrollTop||0,e=this._document.documentElement&&this._document.documentElement.scrollLeft||this._document.body&&this._document.body.scrollLeft||0;this._documentScroll={top:t,left:e}}return this._documentScroll}}DomMeasurement.IMPORTANT_REG_EXP=/!important$/,DomMeasurement.TRANSFORM_MATRIX_REG_EXP=/(?:matrix|scale)\(([\d\.]+),/,DomMeasurement.NON_STATIC_POSITIONS=["relative","fixed","absolute","sticky"],DomMeasurement.MIN_TEXT_BOX_WIDTH=.1;