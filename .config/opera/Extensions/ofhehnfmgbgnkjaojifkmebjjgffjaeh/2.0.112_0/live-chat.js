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
(function() {
  function n() {
    var a = [], c;
    for ([c, e] of Object.entries(d.customcolors)) {
      if ("--shadow" === c) {
        var b = e.replace("#", "");
        var e = parseInt(b.substring(0, 2), 16);
        var m = parseInt(b.substring(2, 4), 16);
        b = parseInt(b.substring(4, 6), 16);
        e = `0 1px .5px rgba(${e}, ${m}, ${b}, .2)`;
      }
      a.push(c + ":" + e);
    }
    return ":root{" + a.join(";") + "}";
  }
  var p = document.createElement("script");
  p.textContent = "(" + function(a, c) {
    if (!window.efyt) {
      window.efyt = !0;
      var b = JSON.parse(localStorage.getItem("enhancer-for-youtube")) || {};
      b.customcolors || (b.customcolors = {"--main-color":"#00adee", "--main-background":"#111111", "--second-background":"#181818", "--hover-background":"#232323", "--main-text":"#eff0f1", "--dimmer-text":"#cccccc", "--shadow":"#000000"});
      b.customcssrules || (b.customcssrules = "");
      b.theme || (b.theme = "default-dark");
      b.themevariant || (b.themevariant = "youtube-deep-dark.css");
      if (b.darktheme && "default-dark" !== b.theme) {
        try {
          "custom" === b.theme ? (b.customcssrules = b.customtheme, b.customtheme = !0, b.theme = "default-dark") : /deep-dark(.*)\.css/.test(b.theme) && (b.themevariant = b.theme, b.theme = "youtube-deep-dark");
        } catch (v) {
        }
        if ("default-dark" !== b.theme) {
          if ("youtube-deep-dark" === b.theme) {
            var e = a.createElement("link");
            e.id = "efyt-theme-variables";
            e.rel = "stylesheet";
            e.href = c + "/vendor/themes/" + b.themevariant;
          } else {
            if ("youtube-deep-dark-custom" === b.theme) {
              e = a.createElement("style");
              e.type = "text/css";
              e.id = "efyt-theme-variables";
              var m = [], q;
              for ([q, g] of Object.entries(b.customcolors)) {
                if ("--shadow" === q) {
                  var h = g.replace("#", "");
                  var g = parseInt(h.substring(0, 2), 16);
                  var t = parseInt(h.substring(2, 4), 16);
                  h = parseInt(h.substring(4, 6), 16);
                  g = `0 1px .5px rgba(${g}, ${t}, ${h}, .2)`;
                }
                m.push(q + ":" + g);
              }
              e.textContent = ":root{" + m.join(";") + "}";
            }
          }
          var k = a.createElement("link");
          k.id = "efyt-theme";
          k.rel = "stylesheet";
          k.href = c + "/vendor/themes/youtube-deep-dark.material.css";
          a.head ? (a.head.appendChild(e), a.head.appendChild(k)) : a.documentElement.addEventListener("load", function r(u) {
            a.head && (a.documentElement.removeEventListener("load", r, !0), a.head.appendChild(e), a.head.appendChild(k));
          }, !0);
        }
      }
      if (b.customtheme) {
        var l = a.createElement("style");
        l.type = "text/css";
        l.id = "efyt-custom-theme";
        l.textContent = b.customcssrules;
        a.head ? a.head.appendChild(l) : a.documentElement.addEventListener("load", function r(u) {
          a.head && (a.documentElement.removeEventListener("load", r, !0), a.head.appendChild(l));
        }, !0);
      }
    }
  }.toString() + ')(document, "' + chrome.runtime.getURL("resources") + '")';
  document.documentElement.appendChild(p);
  p.remove();
  var f = chrome.runtime.getURL("resources"), d = {customcolors:{"--main-color":"#00adee", "--main-background":"#111111", "--second-background":"#181818", "--hover-background":"#232323", "--main-text":"#eff0f1", "--dimmer-text":"#cccccc", "--shadow":"#000000"}, customcssrules:"", customtheme:!1, darktheme:!1, theme:"default-dark", themevariant:"youtube-deep-dark.css"};
  chrome.storage.local.get(d, function(a) {
    d = a;
  });
  chrome.runtime.onMessage.addListener(function(a, c, b) {
    if ("preference-changed" === a.message) {
      switch(c = a.value, a.name) {
        case "customcolors":
          d.customcolors = c;
          if (a = document.head.querySelector("#efyt-theme-variables")) {
            a.textContent = n();
          }
          break;
        case "customcssrules":
          d.customcssrules = c;
          if (a = document.head.querySelector("#efyt-custom-theme")) {
            a.textContent = c, document.head.appendChild(a);
          }
          break;
        case "customtheme":
          d.customtheme = c;
          a = document.head.querySelector("#efyt-custom-theme");
          c && !a ? (a = document.createElement("style"), a.type = "text/css", a.id = "efyt-custom-theme", a.textContent = d.customcssrules, document.head.appendChild(a)) : !c && a && document.head.removeChild(a);
          break;
        case "darktheme":
          d.darktheme = c;
          a = document.head.querySelector("#efyt-theme-variables");
          b = document.head.querySelector("#efyt-theme");
          c ? "default-dark" === d.theme ? (b && document.head.removeChild(b), a && document.head.removeChild(a)) : "youtube-deep-dark" === d.theme ? (a && !a.hasAttribute("href") && (document.head.removeChild(a), a = !1), a || (a = document.createElement("link"), a.id = "efyt-theme-variables", a.rel = "stylesheet", a.href = f + "/vendor/themes/" + d.themevariant, document.head.appendChild(a)), b || (b = document.createElement("link"), b.id = "efyt-theme", b.rel = "stylesheet", b.href = f + "/vendor/themes/youtube-deep-dark.material.css", 
          document.head.appendChild(b)), d.customtheme && (a = document.head.querySelector("#efyt-custom-theme")) && document.head.appendChild(a)) : "youtube-deep-dark-custom" === d.theme && (a && a.hasAttribute("href") && (document.head.removeChild(a), a = !1), a || (a = document.createElement("style"), a.type = "text/css", a.id = "efyt-theme-variables", a.textContent = n(), document.head.appendChild(a)), b || (b = document.createElement("link"), b.id = "efyt-theme", b.rel = "stylesheet", b.href = 
          f + "/vendor/themes/youtube-deep-dark.material.css", document.head.appendChild(b)), d.customtheme && (a = document.head.querySelector("#efyt-custom-theme")) && document.head.appendChild(a)) : (b && document.head.removeChild(b), a && document.head.removeChild(a));
          break;
        case "theme":
          d.theme = c;
          a = document.head.querySelector("#efyt-theme-variables");
          b = document.head.querySelector("#efyt-theme");
          "default-dark" === c ? (b && document.head.removeChild(b), a && document.head.removeChild(a)) : "youtube-deep-dark" === c ? (a && !a.hasAttribute("href") && (document.head.removeChild(a), a = !1), a || (a = document.createElement("link"), a.id = "efyt-theme-variables", a.rel = "stylesheet", a.href = f + "/vendor/themes/" + d.themevariant, document.head.appendChild(a)), b || (b = document.createElement("link"), b.id = "efyt-theme", b.rel = "stylesheet", b.href = f + "/vendor/themes/youtube-deep-dark.material.css", 
          document.head.appendChild(b)), d.customtheme && (a = document.head.querySelector("#efyt-custom-theme")) && document.head.appendChild(a)) : "youtube-deep-dark-custom" === c && (a && a.hasAttribute("href") && (document.head.removeChild(a), a = !1), a || (a = document.createElement("style"), a.type = "text/css", a.id = "efyt-theme-variables", a.textContent = n(), document.head.appendChild(a)), b || (b = document.createElement("link"), b.id = "efyt-theme", b.rel = "stylesheet", b.href = f + 
          "/vendor/themes/youtube-deep-dark.material.css", document.head.appendChild(b)), d.customtheme && (a = document.head.querySelector("#efyt-custom-theme")) && document.head.appendChild(a));
          break;
        case "themevariant":
          d.themevariant = c, (a = document.head.querySelector("#efyt-theme-variables")) && a.hasAttribute("href") && (a.href = f + "/vendor/themes/" + c);
      }
    }
  });
})();