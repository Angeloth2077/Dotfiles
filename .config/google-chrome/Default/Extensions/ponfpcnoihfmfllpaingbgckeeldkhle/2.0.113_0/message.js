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
(function(b){var c=0>"bg cs da de el es et fi fr hr hu it lt lv nl pl pt_BR pt_PT ro sk sl sv".indexOf(chrome.i18n.getMessage("locale_code"))?"USD":"EUR";b.querySelectorAll("nav a").forEach(function(a){a.addEventListener("focus",function(){this.parentNode.classList.add("focus")});a.addEventListener("blur",function(){this.parentNode.classList.remove("focus")})});b.querySelector("nav .donate a").addEventListener("click",function(a){a.preventDefault();chrome.tabs.create({url:this.dataset.paypal.replace(/currency_code=[A-Z]+/,
"currency_code="+c),active:!0})});b.querySelectorAll("form .currency-code").forEach(function(a){a.value=c})})(document);