/*! (C) Copyright 2020 LanguageTooler GmbH. All rights reserved. */
function wait(t=25,e=null){return new Promise((n=>setTimeout((()=>n(e)),t)))}function setAnimationFrameTimeout(t,e){let n=null,o=!1;const r=window.setTimeout((()=>{o||(n=window.requestAnimationFrame((()=>t())))}),e);return{destroy:()=>{o=!0,window.clearTimeout(r),n&&window.cancelAnimationFrame(n)}}}function setAnimationFrameInterval(t,e){let n=null,o=!1;const r=()=>{n=setAnimationFrameTimeout((()=>{o||(t(),r())}),e)};return r(),{destroy:()=>{o=!0,n&&(n.destroy(),n=null)}}}function translateElement(t,e){"string"==typeof t&&(t=document.querySelector(t)),"string"==typeof e&&(e={key:e}),e.isHTML?t.innerHTML=i18nManager.getMessage(e.key,e.interpolations):e.attr?t[e.attr]=i18nManager.getMessage(e.key,e.interpolations):t.textContent=i18nManager.getMessage(e.key,e.interpolations)}function translateSection(t){Array.from(t.querySelectorAll("[data-t]")).forEach((t=>{translateElement(t,t.getAttribute("data-t"))})),Array.from(t.querySelectorAll("[data-t-placeholder]")).forEach((t=>{translateElement(t,{key:t.getAttribute("data-t-placeholder"),attr:"placeholder"})})),Array.from(t.querySelectorAll("[data-t-html]")).forEach((t=>{translateElement(t,{key:t.getAttribute("data-t-html"),isHTML:!0})})),Array.from(t.querySelectorAll("[data-t-title]")).forEach((t=>{translateElement(t,{key:t.getAttribute("data-t-title"),attr:"title"})})),Array.from(t.querySelectorAll("[data-t-attr]")).forEach((t=>{const[e,n]=(t=>{const e=String(t.getAttribute("data-t-attr"));try{const t=JSON.parse(e);if((t=>Array.isArray(t)&&"string"==typeof t[0]&&"string"==typeof t[1]&&2===t.length)(t))return t;throw Error()}catch(t){return["",""]}})(t);e&&n&&translateElement(t,{key:n,attr:e})}))}function isRectsEqual(t,e){return t.top===e.top&&t.right===e.right&&t.bottom===e.bottom&&t.left===e.left}function isRectContainsRect(t,e){return t.left<=e.left&&t.right>=e.right&&t.top<=e.top&&t.bottom>=e.bottom}function isRectsIntersect(t,e){return!(t.left>e.right||t.right<e.left||t.top>e.bottom||t.bottom<e.top)}function isPointInsideRect(t,e,n=0){return"object"==typeof e&&(n=e.y,e=e.x),t.left<=e&&e<=t.right&&t.top<=n&&n<=t.bottom}function resizeBox(t,e,n){return Object.assign({},t,{right:t.left+e,bottom:t.top+n,width:e,height:n})}function moveBox(t,e,n){return Object.assign({},t,{top:t.top+n,right:t.right+e,bottom:t.bottom+n,left:t.left+e})}function createContainerElement(t,e){const n=t.createElement(e);return n.setAttribute("contenteditable","false"),navigator.userAgent.includes("Mac OS")&&n.classList.add("lt--mac-os"),BrowserDetector.isThunderbird()&&n.classList.add("lt--thunderbird"),n}function contains(t,e){return"object"==typeof e?t!==e&&t.contains(e):t instanceof Element&&!!t.querySelector(e)}function closestElement(t,e){if(t.closest)return t.closest(e);{let n=t;for(;n;){if(n.matches(e))return n;n=n.parentElement}}return null}function getCommonParent(t,e){let n=t.parentElement;for(;n;){if(contains(n,e))return n;n=n.parentElement}return null}function hasTextNodeChildWithContent(t){return Array.from(t.childNodes).some((t=>Boolean(t.nodeType===Node.TEXT_NODE&&t.nodeValue&&t.nodeValue.trim())))}function getFrameElement(t){return t.frameElement}function isScrollable(t){const e=window.getComputedStyle(t);return"auto"===e.overflowY||"scroll"===e.overflowY}function hasFirefoxDesignMode(t){return Boolean(t.ownerDocument&&"on"===t.ownerDocument.designMode&&"read-write"===t.ownerDocument.defaultView.getComputedStyle(t)["-moz-user-modify"])}function hasFocus(t){return t.matches(":focus")||"BODY"===t.nodeName&&hasFirefoxDesignMode(t)&&t.ownerDocument.hasFocus()}const getVisibleTopAndBottom=(()=>{const t=(t,e,n,o)=>{const r=t.ownerDocument;let i=r.elementFromPoint(n,o);if(!i)return!1;if(t===i||t.contains(i))return!0;if(!e.length)return!1;const a=e.find((t=>t.contains(i)));return a&&(i=r.elementsFromPoint(n,o).find((t=>!a.contains(t)))||null),Boolean(i&&(t===i||t.contains(i)))};return(e,n,o,r)=>{const i=n.getPaddingBox(e,!1);if(i.bottom<0||i.top>o)return{top:0,bottom:i.height};let a=[];r&&(a=Array.from(e.ownerDocument.querySelectorAll(r)));let s=i.left+Math.round(i.width/100*33);const c=Math.max(i.top,0);let l=c;for(;;){if(t(e,a,s,l)){if(l===c)break;for(;l--;)if(!t(e,a,s,l)){l++;break}break}if(l===i.bottom)break;l=Math.min(i.bottom,l+6)}const u=Math.min(i.bottom,o);let d=u;for(;;){if(t(e,a,s,d-1)){if(d===u)break;for(;d++<u;)if(!t(e,a,s,d-1)){d--;break}break}if(d===l)break;d=Math.max(l,d-6)}return{top:Math.round(Math.max(0,l-i.top)),bottom:Math.round(Math.max(0,d-i.top))}}})();function isVisible(t){return(t.offsetWidth>0||t.offsetHeight>0)&&"hidden"!==new DomMeasurement(document).getStyle(t,"visibility")}function fadeOut(t,e){let n=1;const o=new DomMeasurement(t.ownerDocument),r=setAnimationFrameInterval((()=>{if(n-=.08,n<=0)return r.destroy(),void(e&&e());o.setStyles(t,{opacity:n+" !important"})}),16)}function fadeOutAndRemove(t,e){let n=1;const o=new DomMeasurement(t.ownerDocument),r=setAnimationFrameInterval((()=>{if(n-=.08,n<=0)return t.remove(),r.destroy(),void(e&&e());o.setStyles(t,{opacity:n+" !important"})}),16)}function hasDarkBackground(t){let e=20,n=t;for(;--e;){const t=window.getComputedStyle(n);if(t.backgroundImage&&"none"!==t.backgroundImage)return!1;const e=t.backgroundColor;if(e&&"transparent"!==e&&getColorOpacity(e)>=.25)return getColorLuminosity(e)<=35;if(!n.parentElement)return!1;n=n.parentElement}return!1}function dispatchCustomEvent(t,e,n={}){const o=new CustomEvent(e,{detail:n,cancelable:!0});return t.dispatchEvent(o)}function simulatePaste(t,e,n){if(BrowserDetector.isFirefox()||BrowserDetector.isThunderbird()){const n=new ClipboardEvent("paste",{bubbles:!0,data:e,dataType:"text/plain"});return t.dispatchEvent(n)}{const o=new ClipboardEvent("paste",{clipboardData:new DataTransfer,bubbles:!0});return o.clipboardData.setData("text/plain",e),n&&o.clipboardData.setData("text/html",n),t.dispatchEvent(o)}}function addUseCaptureEvent(t,e,n){const o=t instanceof HTMLDocument?t:t.ownerDocument,r=e=>{const o=e.composedPath?e.composedPath():[e.target];if(!o[0])return;const r=o[0];(isElementNode(r)||isTextNode(r))&&t.contains(r)&&n(e)};return o.defaultView.addEventListener(e,r,!0),{destroy(){o.defaultView.removeEventListener(e,r,!0)}}}function observeScrollableAncestors(t,e){const n=new DomMeasurement(t.ownerDocument);const o=function(t){const e=[];let o=t.parentElement;for(;o&&o!==document.body&&o!==document.documentElement;){const t=n.getStyles(o,["overflow-x","overflow-y"]),r=t["overflow-x"],i=t["overflow-y"];"auto"!==i&&"scroll"!==i&&"auto"!==r&&"scroll"!==r||e.push(o),o=o.parentElement}return e}(t);let r=!1;const i=()=>{r||(r=!0,window.requestAnimationFrame((()=>{r=!1,e()})))};return o.forEach((t=>{t.addEventListener("scroll",i)})),{destroy(){o.forEach((t=>{t.removeEventListener("scroll",i)})),r=!0}}}const onElementDisabled=(()=>{let t;const e=[];return(n,o)=>{e.push({element:n,callback:o}),t=t||window.setInterval((()=>{const n=[];e.forEach((t=>{(t.element.readOnly||t.element.disabled||!isVisible(t.element))&&(n.push(t),t.callback(t.element))})),n.forEach((t=>{e.splice(e.indexOf(t),1)})),e.length||(clearInterval(t),t=null)}),600)}})(),onElementRemoved=(()=>{let t;const e=[];return(n,o)=>{e.push({element:n,callback:o}),t||(t=new MutationObserver((n=>{if(!n.some((t=>t.removedNodes.length>0)))return;const o=[];for(const t of e){!document.contains(t.element)&&(t.callback(t.element),o.push(t))}o.forEach((t=>{e.splice(e.indexOf(t),1)})),e.length||(t.disconnect(),t=null)})),t.observe(document.documentElement,{childList:!0,subtree:!0}))}})();function getRangeAtPoint(t){const e=document;if(e.caretRangeFromPoint)return e.caretRangeFromPoint(t.x,t.y);if(e.caretPositionFromPoint){const n=e.caretPositionFromPoint(t.x,t.y);if(!n||!n.offsetNode)return null;try{const t=new Range;return t.setStart(n.offsetNode,n.offset),t.setEnd(n.offsetNode,n.offset),t}catch(t){return null}}return null}function isSameRange(t,e){return!(!t||!e||t.startContainer!==e.startContainer||t.startOffset!==e.startOffset||t.endOffset!==e.endOffset||t.endContainer!==e.endContainer)}function getSelectedText(){const t=document.activeElement,e=t?t.tagName.toLowerCase():null;return"textarea"===e||"input"===e&&/^(?:text|search|password|tel|url)$/i.test(t.type)&&"number"==typeof t.selectionStart?t.value.slice(t.selectionStart,t.selectionEnd):window.getSelection&&window.getSelection()?window.getSelection().toString():""}function getSelectedHTML(){const t=document.activeElement,e=t?t.tagName.toLowerCase():null;if("textarea"===e||"input"===e&&/^(?:text|search|password|tel|url)$/i.test(t.type)&&"number"==typeof t.selectionStart)return;const n=window.getSelection();if(!n||0===n.rangeCount)return;const o=n.getRangeAt(0).cloneContents(),r=document.createElement("div");return r.appendChild(o),r.innerHTML}function isCEElement(t){return t instanceof HTMLElement&&(t.isContentEditable||"BODY"===t.nodeName&&hasFirefoxDesignMode(t))}function isFormElement(t){return isTextArea(t)||isTextInput(t)}function isTextArea(t){return t instanceof HTMLTextAreaElement}function isTextInput(t){return t instanceof HTMLInputElement&&("text"===t.type||"search"===t.type)}function isElementNode(t){return t.nodeType===Node.ELEMENT_NODE}function isTextNode(t){return t.nodeType===Node.TEXT_NODE}function loadStaticFile(t){return fetch(t).then((t=>t.text()))}function loadStylesheet(t){const e=document.createElement("link");e.rel="stylesheet",e.type="text/css",(document.head||document.body).appendChild(e)}function createStylesheet(t){const e=document.createElement("style");return e.type="text/css",e.appendChild(document.createTextNode(t)),(document.head||document.body).appendChild(e),e}function isLTAvailable(t){try{return t.document.documentElement.hasAttribute("data-lt-installed")}catch(t){}return!1}function isCssContentScriptsLoaded(t){const e=t.document.createElement("div");e.className="lt-test-element",t.document.documentElement.appendChild(e);const n="absolute"===t.getComputedStyle(e).position;return e.remove(),n}function openPopup(t,e,n,o=Date.now().toString()){const r=void 0!==window.screenLeft?window.screenLeft:window.screenX,i=void 0!==window.screenTop?window.screenTop:window.screenY,a=window.innerWidth?window.innerWidth:document.documentElement.clientWidth?document.documentElement.clientWidth:screen.width,s=window.innerHeight?window.innerHeight:document.documentElement.clientHeight?document.documentElement.clientHeight:screen.height,c=a/window.screen.availWidth,l=(a-e)/2/c+r,u=(s-n)/2/c+i;return window.open(t,o,`\n      scrollbars=yes,\n\t  resizable=yes,\n      width=${e/c},\n      height=${n/c},\n      top=${u},\n      left=${l}\n      `)}function dataURItoBlob(t){const e=atob(t.split(",")[1]),n=t.split(",")[0].split(":")[1].split(";")[0],o=new ArrayBuffer(e.length),r=new Uint8Array(o);for(let t=0;t<e.length;t++)r[t]=e.charCodeAt(t);return new Blob([o],{type:n})}const goToManagedLogin=function(){let t,e=null;const n=e=>{e.origin.match(/^chrome|moz|safari/)&&t(e.data)};return function(o,r){const i=window;let a=null;t=function(t){const[e,n]=JSON.parse(t);e&&n&&(s(),r(e,n))};const s=function(){e&&window.clearInterval(e),i.removeEventListener("message",n);try{browser.storage.local.remove("managedLoginCredentials")}catch(t){}try{a&&a.close()}catch(t){}};s(),e=window.setInterval((()=>{browser.storage.local.get("managedLoginCredentials").then((e=>{e.managedLoginCredentials&&t(e.managedLoginCredentials)})).catch((()=>null))}),400),i.addEventListener("message",n);const c=browser.runtime.getURL("/welcome/managedLoginRedirectUri.html"),l=o+(o.includes("?")?"&":"?")+"redirect_uri="+encodeURIComponent(c);a=openPopup(l,640,480)}}(),getAutoLoginUrl=function(t,e,n){let o=`https://languagetool.org/webextension/login?email=${encodeURIComponent(t)}&addon_token=${encodeURIComponent(e)}`;return n&&(o+=`&temp_text_id=${encodeURIComponent(n)}`),o},goToLogin=function(){let t,e=null;const n=e=>{t(e.data)};return function(o,r){const i=window;let a=null;t=function(t){const[e,n]=JSON.parse(t);e&&n&&(s(),r(e,n))};const s=function(){e&&window.clearInterval(e),i.removeEventListener("message",n);try{browser.storage.local.remove("loginCredentials")}catch(t){}try{a&&a.close()}catch(t){}};s(),e=window.setInterval((()=>{browser.storage.local.get("loginCredentials").then((e=>{e.loginCredentials&&t(e.loginCredentials)})).catch((()=>null))}),400),i.addEventListener("message",n);const c=browser.runtime.getURL("/welcome/loginRedirectUri.html"),l=o+(o.includes("?")?"&":"?")+"callback_uri="+encodeURIComponent(c);a=openPopup(l,640,480,"lt-login-"+Date.now())}}();let getColorOpacity,getColorLuminosity;function getHistoricPremiumErrors(t){const e=300;let n=0;const o=Date.now();let r=0;for(const i of t.hiddenErrors){const t=+new Date(i.day);if(o-t>864e6)break;if(r=t,n+=i.count,n>e){n=e;break}}let i=String(n);n>=e&&(i="300+");return{hiddenErrorsCount:n,hiddenErrorsCountStr:i,dayCount:Math.ceil((o-r)/1e3/60/60/24)}}function getPremiumUrl(t,e=0,n=0,o=0,r="",i){const a=[];return a.push(`pk_campaign=${encodeURIComponent(t)}`),i&&a.push(`textLang=${encodeURIComponent(i)}`),r&&a.push(`historicMatches=${encodeURIComponent(r)}`),e&&a.push(`grammarMatches=${encodeURIComponent(e)}`),o&&a.push(`punctuationMatches=${encodeURIComponent(o)}`),n&&a.push(`styleMatches=${encodeURIComponent(n)}`),"https://languagetool.org/premium?"+a.join("&")}function isErrorRuleIgnored(t,e){const n=LanguageManager.getPrimaryLanguageCode(t.language.code);return e.some((e=>!(e.id!==t.rule.id||"*"!==e.language&&e.language!==n)&&(!e.phrase||(!!(e.id.includes("TOO_LONG_SENTENCE")&&getStringSimilarity(e.phrase,t.originalPhrase)>.75)||e.phrase.toLowerCase()===t.originalPhrase.toLowerCase()))))}function isExtensionRuntimeError(t){return t.startsWith("Invocation of form runtime.connect(null, ) doesn't match definition runtime.connect")||t.startsWith("Extension context invalidated")}function isDraftJS(t){return Boolean(t.closest(".DraftEditor-editorContainer"))||/(facebook|messenger)\.com/.test(location.host)&&(t.hasAttribute("aria-describedBy")||["textfield","textbox"].includes(t.getAttribute("role")||""))&&t.hasAttribute("contenteditable")||!!t.querySelector("div[data-contents=true]")&&t.classList.contains("notranslate")}function isTinyMCE(t){return t.classList.contains("mce-content-body")||t.classList.contains("mceContentBody")}function isCKEditor(t){const e=t.classList.contains("cke_editable"),n="string"==typeof t.className&&t.className.includes("ck-editor_");return e||n}function isSlateEditor(t){return t.hasAttribute("data-slate-editor")}function isWriterDuet(t){return location.href.includes("writerduet.com")}function isQuillEditor(t){return t.classList.contains("ql-editor")}function isOpenXchangeEditor(t){return!!t.closest("[data-app-name='io.ox/office/text']")}function isProseMirror(t){return t.classList.contains("ProseMirror")}function isGutenberg(t){return t.classList.contains("editor-rich-text__editable")||t.classList.contains("block-editor-rich-text__editable")}function isTrixEditor(t){return"trix-editor"===t.nodeName.toLowerCase()}function isLTEditor(t){return t.classList.contains("lt-textarea__textarea")}function isCodeMirror(t){return t.classList.contains("CodeMirror-code")}function isGoogleDocsCanvas(t){return t.classList.contains("kix-canvas-tile-content")}function isHorde(t){return window!==window.parent&&t.ownerDocument&&t===t.ownerDocument.body&&t.ownerDocument.documentElement.isContentEditable&&t.classList.contains("cke_show_borders")}function isMedium(t){return location.host.includes("medium.com")&&"true"===t.getAttribute("g_editable")}function isWikpedia(t){return t.classList.contains("ve-ce-rootNode")}!function(){const t=/ /g,e=/^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{8})$/i,n=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})?$/i,o=/^#([0-9a-f])([0-9a-f])([0-9a-f])([0-9a-f])?$/i,r=/^rgba?\(/i,i=/^rgba?\((\d+),(\d+),(\d+)(?:,(\d*(?:\.\d+)?))?\)/i,a=/^hsla?\(/i,s=/^hsla?\(\d+,\d+%,(\d+)%(?:,(\d*(?:\.\d+)?))?\)/i;function c(t,e,n){const o=Math.max(t,e,n)/255,r=Math.min(t,e,n)/255;return Math.round((o+r)/2*100)}getColorOpacity=function(c){if("string"!=typeof c)return 3===c.length?1:c[3];if(c=c.replace(t,""),e.test(c)){const t=n.exec(c)||o.exec(c);if(t&&t[4])return parseInt(2===t[4].length?t[4]:t[4]+t[4],16)/255}else if(r.test(c)){const t=i.exec(c);if(t&&t[4])return+t[4]}else if(a.test(c)){const t=s.exec(c);if(t&&t[2])return+t[2]}return 1},getColorLuminosity=function(l){if("string"!=typeof l)return c(l[0],l[1],l[2]);if(l=l.replace(t,""),e.test(l)){const t=n.exec(l)||o.exec(l);if(t){return c(parseInt(2===t[1].length?t[1]:t[1]+t[1],16),parseInt(2===t[2].length?t[2]:t[2]+t[2],16),parseInt(2===t[3].length?t[3]:t[3]+t[3],16))}}else if(r.test(l)){const t=i.exec(l);if(t){return c(+t[1],+t[2],+t[3])}}else if(a.test(l)){const t=s.exec(l);if(t)return+t[1]}return 100}}(),"undefined"!=typeof module&&(module.exports.getColorOpacity=getColorOpacity,module.exports.getColorLuminosity=getColorLuminosity);