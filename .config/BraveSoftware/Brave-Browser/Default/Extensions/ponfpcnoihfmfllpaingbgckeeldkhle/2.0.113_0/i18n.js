/*
##
##  Enhancer for YouTube™
##  =====================
##
##  Author: Maxime RF <https://www.mrfdev.com>
##
##  This file is protected by copyright laws and international copyright
##  treaties, as well as other intellectual property laws and treaties.
##
##  All rights not expressly granted to you are retained by the author.
##  Read the license.txt file for more details.
##
##  © MRFDEV.com - All Rights Reserved
##
*/
(function(c){function u(){c.body.classList.add("overflow-hidden");g.style.display="block";f.style.display="block";f.scrollTop=0;g.classList.add("in");setTimeout(function(){c.body.classList.add("modal-open")},50)}function v(){c.body.classList.remove("modal-open");setTimeout(function(){f.style.display="none";g.classList.add("fade");g.classList.remove("in");setTimeout(function(){g.style.display="none";c.body.classList.remove("overflow-hidden")},300)},300)}var l,p,w="am bn et fil gu kn ml mr sr sw ta te".split(" "),
q={ca:["color","contrast","controls","sepia","videos"],cs:["stop"],da:["loop","support","backup","sepia"],de:"autoplay backup export import loop_start playlists screenshot sepia stop videos".split(" "),el:["theme"],es:["color","sepia"],es_419:["color","sepia","videos"],fr:["options","support","volume","stop","message"],hr:["autoplay","mini_player","save","video_player"],id:"autoplay backup gaussian_blur reset screenshot sepia stop volume".split(" "),it:"backup loop mini_player playlists reset screenshot sepia volume".split(" "),
ms:["import","sepia"],nl:"autoplay filters support contrast sepia variant volume".split(" "),no:["loop_start","sepia","variant"],pl:["sepia"],pt_BR:["backup","loop","mini_player","playlists","volume"],pt_PT:["backup","volume"],ro:["backup","gaussian_blur","contrast","sepia"],sl:["sepia"],sk:["message"],sv:["loop","support","sepia","variant"],vi:["videos"]},x=c.querySelectorAll("nav a"),y=c.querySelector("nav .donate a"),h=c.querySelector("#locale"),d=c.querySelectorAll("[contenteditable]"),m=c.querySelector("#generate-code-btn"),
g=c.querySelector("#modal-backdrop"),f=c.querySelector("#modal"),z=f.querySelector(".modal-title"),r=f.querySelector(".close-modal"),t=f.querySelector("#code"),A=f.querySelector("#copy-to-clipboard-btn"),n=f.querySelector("#copy-to-clipboard-checkmark");x.forEach(function(a){a.addEventListener("focus",function(){this.parentNode.classList.add("focus")});a.addEventListener("blur",function(){this.parentNode.classList.remove("focus")})});y.addEventListener("click",function(a){a.preventDefault();a=0>"bg cs da de el es et fi fr hr hu it lt lv nl pl pt_BR pt_PT ro sk sl sv".indexOf(chrome.i18n.getMessage("locale_code"))?
"USD":"EUR";chrome.tabs.create({url:this.dataset.paypal.replace(/currency_code=[A-Z]+/,"currency_code="+a),active:!0})});h.addEventListener("change",function(){l=h.options[h.selectedIndex].dataset.dir;p=h.options[h.selectedIndex].textContent;if(""===this.value||0<=w.indexOf(this.value)){for(var a=d.length-1;0<=a;a--)d[a].textContent="",d[a].dir="ltr";m.disabled=""===this.value?!0:!1}else fetch(`_locales/${this.value}/messages.json`).then(function(b){return b.json()}).then(function(b){for(var e=d.length-
1,k;0<=e;e--)k=b[d[e].id].message,"en_US"===b.locale_code.message||"en_GB"===b.locale_code.message?d[e].innerText=k:k!==d[e].previousElementSibling.innerText||q[b.locale_code.message]&&0<=q[b.locale_code.message].indexOf(d[e].id)?d[e].innerText=k:d[e].textContent="",d[e].dir=l;m.disabled=!1})});c.querySelector("#description").addEventListener("keyup",function(){132<this.textContent.length&&(this.textContent=this.textContent.substr(0,132),this.blur())});m.addEventListener("click",function(){var a=
{},b=c.querySelector("#locale").value;if(""!==b){a.locale_code={message:b};a.locale_dir={message:l};b=0;for(var e;b<d.length;b++)e=d[b].innerText.trim(),""===e&&(e=d[b].previousElementSibling.innerText),a[d[b].id]={message:e};z.textContent=`${p} Translation - Enhancer for YouTube\u2122`;t.value=JSON.stringify(a).replace(/^\{/,"{\n    ").replace(/":\{"/gm,'": {"').replace(/":"/gm,'": "').replace(/"\},"/gm,'"},\n    "').replace(/\}$/,"\n}");u()}});r.addEventListener("click",function(){v()});A.addEventListener("click",
function(a){t.select();c.execCommand("copy");n.classList.add("show")});n.addEventListener("animationend",function(a){"checkmark-scale"===a.animationName&&setTimeout(function(){n.classList.remove("show")},1200)});c.addEventListener("keydown",function(a){27===a.keyCode&&r.click()})})(document);