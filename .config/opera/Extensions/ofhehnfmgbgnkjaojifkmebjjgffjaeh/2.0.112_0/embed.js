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
  function D() {
    chrome.storage.local.get({blockads:!0, blockadsexceptforsubs:!1, blockautoplay:!0, blockhfrformats:!1, blockwebmformats:!1, controlspeed:!0, controlspeedmousebutton:!1, controlvolume:!1, controlvolumemousebutton:!1, customcolors:{"--main-color":"#00adee", "--main-background":"#111111", "--second-background":"#181818", "--hover-background":"#232323", "--main-text":"#eff0f1", "--dimmer-text":"#cccccc", "--shadow":"#000000"}, customcssrules:"", customtheme:!1, darktheme:!1, defaultvolume:!1, disableautoplay:!1, 
    hidecardsendscreens:!1, hidechat:!1, hidecomments:!1, hiderelated:!1, ignoreplaylists:!0, ignorepopupplayer:!0, overridespeeds:!0, pauseforegroundtab:!1, pausevideos:!0, qualityembeds:"medium", qualityembedsfullscreen:"hd1080", qualityplaylists:"hd720", qualityvideos:"hd720", reversemousewheeldirection:!1, selectquality:!1, selectqualityfullscreenoff:!1, selectqualityfullscreenon:!1, speed:1, speedvariation:0.1, stopvideos:!1, theme:"default-dark", themevariant:"youtube-deep-dark.css", volume:50, 
    volumevariation:5, whitelist:""}, function(h) {
      var c = document.createElement("script");
      c.textContent = "(" + function(r) {
        document.dispatchEvent(new CustomEvent("efyt-update-preferences", {detail:{prefs:r}}));
      }.toString() + ")(" + JSON.stringify(h) + ")";
      document.head.appendChild(c);
      c.remove();
    });
  }
  chrome.runtime.onMessage.addListener(function(h, c, r) {
    "pause-video" === h.message && document.hidden && document.dispatchEvent(new Event("efyt-pause-video"));
  });
  chrome.storage.onChanged.addListener(D);
  document.addEventListener("efyt-get-preferences", D);
  document.addEventListener("efyt-pause-videos", function(h) {
    try {
      chrome.runtime.sendMessage({request:"pause-videos"});
    } catch (c) {
    }
  });
  var y = document.createElement("script");
  y.textContent = "(" + function(h, c, r) {
    if (!h.EnhancerForYouTube && !h.efyt) {
      h.efyt = !0;
      function t() {
        try {
          var e = d.getAvailableQualityLevels(), b = c.fullscreenElement ? a.qualityembedsfullscreen : a.qualityembeds;
          0 <= e.indexOf(b) ? d.setPlaybackQualityRange(b, b) : d.setPlaybackQualityRange(e[0], e[0]);
          z = !0;
        } catch (f) {
        }
      }
      function A() {
        q || (q = c.documentElement.querySelector(":scope > #detach-button-host"));
        q && (q.style.display = "none");
        l.style.display = "block";
        clearTimeout(E);
        E = setTimeout(function() {
          l.style.display = "none";
          q && (q.style.display = "");
        }, 1500);
      }
      function F() {
        var e = c.querySelector(".ytp-popup.ytp-contextmenu");
        e && 0 < e.getBoundingClientRect().height && (e.style.display = "none");
        c.body.classList.remove("ytp-contextmenu-hidden");
      }
      function G() {
        var e = c.createElement("style");
        e.type = "text/css";
        e.textContent = "#efyt-player-info{background-color:rgba(0,0,0,0.3);color:#fff;display:none;font-size:17px;left:0;padding:7px 0;position:absolute;text-align:center;top:0;width:100%;z-index:2147483647} body.ytp-contextmenu-hidden .ytp-contextmenu{visibility:hidden!important} .ytp-pause-overlay-hidden .ytp-pause-overlay{display:none!important}";
        c.head.appendChild(e);
        l = c.createElement("div");
        l.id = "efyt-player-info";
        d.appendChild(l);
        d.addEventListener("onStateChange", function(b) {
          1 !== b || !a.pausevideos || a.ignorepopupplayer || c.hidden || B || (B = !0, c.dispatchEvent(new Event("efyt-pause-videos")), setTimeout(function() {
            B = !1;
          }, 1000));
          1 !== b && 3 !== b || !a.selectquality || z || t();
          1 === b ? k.classList.add("ytp-pause-overlay-hidden") : 2 === b ? setTimeout(function() {
            d.classList.remove("ytp-expand-pause-overlay");
            k.classList.remove("ytp-pause-overlay-hidden");
          }, 1000) : 0 === b && (z = !1);
        });
        k.classList.add("ytp-pause-overlay-hidden");
        k.addEventListener("wheel", function(b) {
          if (!d.classList.contains("ytp-settings-shown") && !d.classList.contains("ytp-menu-shown")) {
            if (b.ctrlKey && a.controlspeed && (a.controlspeedmousebutton && u || !a.controlspeedmousebutton)) {
              b.preventDefault();
              try {
                if (a.overridespeeds) {
                  var f = g.playbackRate;
                  if (!a.reversemousewheeldirection && 0 < b.deltaY || a.reversemousewheeldirection && 0 > b.deltaY) {
                    f = parseFloat((f - a.speedvariation).toFixed(2)), 0 >= f && (f = a.speedvariation), g.playbackRate = f;
                  } else {
                    if (!a.reversemousewheeldirection && 0 > b.deltaY || a.reversemousewheeldirection && 0 < b.deltaY) {
                      f = parseFloat((f + a.speedvariation).toFixed(2)), g.playbackRate = f;
                    }
                  }
                } else {
                  var v = d.getAvailablePlaybackRates();
                  f = d.getPlaybackRate();
                  var w = v.indexOf(f);
                  (!a.reversemousewheeldirection && 0 < b.deltaY || a.reversemousewheeldirection && 0 > b.deltaY) && 0 < w ? (f = v[w - 1], d.setPlaybackRate(f)) : (!a.reversemousewheeldirection && 0 > b.deltaY || a.reversemousewheeldirection && 0 < b.deltaY) && w < v.length - 1 && (f = v[w + 1], d.setPlaybackRate(f));
                }
                n = !0;
                l.textContent = f + "x";
                A();
              } catch (I) {
              }
            } else {
              if (a.controlvolume && (a.controlvolumemousebutton && u || !a.controlvolumemousebutton)) {
                b.preventDefault();
                try {
                  var m = d.getVolume();
                  !a.reversemousewheeldirection && 0 < b.deltaY || a.reversemousewheeldirection && 0 > b.deltaY ? (m -= a.volumevariation, 0 > m && (m = 0)) : (m += a.volumevariation, 100 < m && (m = 100), d.isMuted() && d.unMute());
                  p = !0;
                  d.setVolume(m);
                  l.textContent = m;
                  A();
                } catch (I) {
                }
              }
            }
          }
        });
        k.addEventListener("mousedown", function(b) {
          2 === b.button && (a.controlvolumemousebutton || a.controlspeedmousebutton) && (u = !0, c.body.classList.add("ytp-contextmenu-hidden"));
        }, !0);
        k.addEventListener("mouseup", function(b) {
          2 === b.button && (a.controlvolumemousebutton || a.controlspeedmousebutton) && (u = !1, H ? p || n ? setTimeout(F, 500) : c.body.classList.remove("ytp-contextmenu-hidden") : (p || n ? (x = !0, setTimeout(F, 500)) : (x = !1, c.body.classList.remove("ytp-contextmenu-hidden")), p = n = !1));
        }, !0);
        k.addEventListener("mouseleave", function() {
          u = p = n = !1;
          c.body.classList.remove("ytp-contextmenu-hidden");
        });
        k.addEventListener("contextmenu", function(b) {
          if (H && (a.controlvolumemousebutton && p || a.controlspeedmousebutton && n)) {
            return b.stopPropagation(), b.preventDefault(), p = n = !1;
          }
          if ((a.controlvolumemousebutton || a.controlspeedmousebutton) && x) {
            return b.preventDefault(), x = !1;
          }
        }, !0);
        g.addEventListener("click", function(b) {
          if (b.ctrlKey) {
            b.preventDefault();
            try {
              var f = b.shiftKey ? 1 : a.speed;
              a.overridespeeds ? g.playbackRate = f : d.setPlaybackRate(f);
              l.textContent = f + "x";
              A();
            } catch (v) {
            }
          }
        });
        a.defaultvolume && d.setVolume(a.volume);
        a.overridespeeds ? (g.playbackRate = a.speed, g.defaultPlaybackRate = a.speed) : d.setPlaybackRate(a.speed);
      }
      c.addEventListener("efyt-update-preferences", function(e) {
        a = e.detail.prefs;
        d && (a.selectquality && t(), a.defaultvolume && d.setVolume(a.volume), a.overridespeeds ? (g.playbackRate = a.speed, g.defaultPlaybackRate = a.speed) : d.setPlaybackRate(a.speed));
      });
      c.addEventListener("efyt-pause-video", function(e) {
        a.ignorepopupplayer || d.pauseVideo();
      });
      var C;
      "onfullscreenchange" in c ? C = "fullscreenchange" : "onmozfullscreenchange" in c && (C = "mozfullscreenchange");
      c.addEventListener(C, function(e) {
        setTimeout(function() {
          d && c.fullscreenElement && a.selectquality && a.selectqualityfullscreenon ? t() : d && !c.fullscreenElement && a.selectquality && a.selectqualityfullscreenoff && t();
        }, 500);
      });
      var H = "Win32" === navigator.platform || "Win64" === navigator.platform, u = !1, n = !1, p = !1, z, B, x, E, l, g, q;
      try {
        var a = JSON.parse(localStorage.getItem("enhancer-for-youtube")) || {};
      } catch (e) {
        a = {}, r || c.dispatchEvent(new Event("efyt-get-preferences"));
      }
      r && c.dispatchEvent(new Event("efyt-get-preferences"));
      "undefined" === typeof a.controlspeed && (a.controlspeed = !0);
      "undefined" === typeof a.ignorepopupplayer && (a.ignorepopupplayer = !0);
      "undefined" === typeof a.overridespeeds && (a.overridespeeds = !0);
      "undefined" === typeof a.pausevideos && (a.pausevideos = !0);
      a.qualityembeds || (a.qualityembeds = "medium");
      a.qualityembedsfullscreen || (a.qualityembedsfullscreen = "hd1080");
      a.speed || (a.speed = 1);
      a.volume || (a.volume = 50);
      a.volumevariation || (a.volumevariation = 5);
      a.whitelist || (a.whitelist = "");
      if ("complete" === c.readyState) {
        if (g = c.querySelector(".html5-main-video")) {
          var d = g.parentNode.parentNode;
          var k = d.parentNode;
          G();
        } else {
          c.location.reload();
        }
      }
      HTMLVideoElement.prototype.play = function(e) {
        return function() {
          !this.hasAttribute("efyt") && this.classList.contains("html5-main-video") && (this.setAttribute("efyt", ""), g = this, d = this.parentNode.parentNode, k = d.parentNode, a.selectquality && t(), G());
          return e.apply(this, arguments);
        };
      }(HTMLVideoElement.prototype.play);
      h.MediaSource && (MediaSource.isTypeSupported = function(e) {
        return function(b) {
          return a.blockhfrformats && /framerate=([4-6]\d|\d{3,})/.test(b) || a.blockwebmformats && /video\/webm/.test(b) ? !1 : e(b);
        };
      }(MediaSource.isTypeSupported));
    }
  }.toString() + ")(window, document, " + chrome.extension.inIncognitoContext + ")";
  document.documentElement.appendChild(y);
  y.remove();
})();