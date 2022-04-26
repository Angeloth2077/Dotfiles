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
  function G() {
    chrome.storage.local.get({blockads:!0, blockadsexceptforsubs:!1, blockautoplay:!0, blockhfrformats:!1, blockwebmformats:!1, controlspeed:!0, controlspeedmousebutton:!1, controlvolume:!1, controlvolumemousebutton:!1, customcolors:{"--main-color":"#00adee", "--main-background":"#111111", "--second-background":"#181818", "--hover-background":"#232323", "--main-text":"#eff0f1", "--dimmer-text":"#cccccc", "--shadow":"#000000"}, customcssrules:"", customtheme:!1, darktheme:!1, defaultvolume:!1, disableautoplay:!1, 
    hidecardsendscreens:!1, hidechat:!1, hidecomments:!1, hiderelated:!1, ignoreplaylists:!0, ignorepopupplayer:!0, overridespeeds:!0, pauseforegroundtab:!1, pausevideos:!0, qualityembeds:"medium", qualityembedsfullscreen:"hd1080", qualityplaylists:"hd720", qualityvideos:"hd720", reversemousewheeldirection:!1, selectquality:!1, selectqualityfullscreenoff:!1, selectqualityfullscreenon:!1, speed:1, speedvariation:0.1, stopvideos:!1, theme:"default-dark", themevariant:"youtube-deep-dark.css", volume:50, 
    volumevariation:5, whitelist:""}, function(l) {
      var b = document.createElement("script");
      b.textContent = "(" + function(w) {
        document.dispatchEvent(new CustomEvent("efyt-update-preferences", {detail:{prefs:w}}));
      }.toString() + ")(" + JSON.stringify(l) + ")";
      document.head.appendChild(b);
      b.remove();
    });
  }
  chrome.storage.onChanged.addListener(G);
  document.addEventListener("efyt-get-preferences", G);
  var B = document.createElement("script");
  B.textContent = "(" + function(l, b, w, p) {
    if (!l.EnhancerForYouTube && !l.efyt) {
      function H() {
        var c = Date.now(), f = c + 2592000000;
        try {
          a.defaultvolume && (localStorage["yt-player-volume"] = sessionStorage["yt-player-volume"] = JSON.stringify({data:JSON.stringify({volume:a.volume, muted:!1}), creation:c, expiration:f})), a.selectquality && (localStorage["yt-player-quality"] = JSON.stringify({data:a[0 < location.href.indexOf("list=") ? "qualityplaylists" : "qualityvideos"], creation:c, expiration:f})), a.disableautoplay && (localStorage["yt.autonav::autonav_disabled"] = JSON.stringify({data:!0, creation:c, expiration:f}));
        } catch (d) {
        }
      }
      function C() {
        D++;
        var c = b.querySelector("#c4-player");
        if (c) {
          try {
            a.stopvideos ? c.stopVideo() : (c.playVideo(), c.pauseVideo(), c.querySelector(".ytp-spinner").style.display = "none");
          } catch (f) {
          }
        } else {
          20 > D && (I = setTimeout(C, 500));
        }
      }
      function J(c) {
        !q && a.stopvideos && 1 <= c && 3 >= c && (m.stopVideo(), m.checkTimestamp = !0);
      }
      function x(c) {
        q = !0;
        b.removeEventListener("keydown", x, !0);
        b.removeEventListener("mousedown", y, !0);
      }
      function y(c) {
        q = !0;
        b.removeEventListener("keydown", x, !0);
        b.removeEventListener("mousedown", y, !0);
      }
      b.addEventListener("efyt-update-preferences", function(c) {
        a = c.detail.prefs;
        H();
      });
      var q, I, D, m, z;
      try {
        var a = JSON.parse(localStorage.getItem("enhancer-for-youtube")) || {};
      } catch (c) {
        a = {}, p || b.dispatchEvent(new Event("efyt-get-preferences"));
      }
      p && b.dispatchEvent(new Event("efyt-get-preferences"));
      "undefined" === typeof a.blockads && (a.blockads = !0);
      "undefined" === typeof a.blockautoplay && (a.blockautoplay = !0);
      "undefined" === typeof a.pausevideos && (a.pausevideos = !0);
      "undefined" === typeof a.ignoreplaylists && (a.ignoreplaylists = !0);
      a.customcolors || (a.customcolors = {"--main-color":"#00adee", "--main-background":"#111111", "--second-background":"#181818", "--hover-background":"#232323", "--main-text":"#eff0f1", "--dimmer-text":"#cccccc", "--shadow":"#000000"});
      a.customcssrules || (a.customcssrules = "");
      a.theme || (a.theme = "default-dark");
      a.themevariant || (a.themevariant = "youtube-deep-dark.css");
      a.qualityvideos || (a.qualityvideos = "hd720");
      a.qualityplaylists || (a.qualityplaylists = "hd720");
      a.volume || (a.volume = 50);
      a.whitelist || (a.whitelist = "");
      H();
      if ("loading" === b.readyState && (a.blockads || p) && ("/watch" === location.pathname || /\/(shorts\/|live$)/.test(location.pathname))) {
        function c(f, d) {
          if (d = f.args) {
            var n = "" !== a.whitelist ? a.whitelist.split(",") : [], k = !1, A = "";
            if (d.raw_player_response && "object" === typeof d.raw_player_response) {
              var e = d.raw_player_response;
              try {
                -1 !== n.indexOf(e.videoDetails.author) && (k = !0), A = e.playbackTracking.videostatsPlaybackUrl.baseUrl;
              } catch (E) {
              }
              k || a.blockadsexceptforsubs && /subscribed=1/.test(A) || (delete e.playerAds, delete e.adPlacements);
            } else {
              if (d.player_response && "string" === typeof d.player_response) {
                e = JSON.parse(d.player_response);
                try {
                  -1 !== n.indexOf(e.videoDetails.author) && (k = !0);
                } catch (E) {
                }
                !e || k || a.blockadsexceptforsubs && /subscribed=1/.test(d.player_response) || (delete e.playerAds, delete e.adPlacements, d.player_response = JSON.stringify(e));
              }
            }
          }
          return f;
        }
        b.documentElement.addEventListener("load", function n(d) {
          l.yt && yt.player && yt.player.Application && 0 < Object.keys(yt.player.Application).length && (b.documentElement.removeEventListener("load", n, !0), yt.player.Application.create && (yt.player.Application.create = function(k) {
            return function(A, e, E) {
              "object" === typeof e && (e = c(e));
              return k.apply(this, arguments);
            };
          }(yt.player.Application.create)), yt.player.Application.createAlternate && (yt.player.Application.createAlternate = function(k) {
            return function(A, e, E) {
              "object" === typeof e && (e = c(e));
              return k.apply(this, arguments);
            };
          }(yt.player.Application.createAlternate)));
        }, !0);
      }
      if (a.darktheme && "default-dark" !== a.theme) {
        try {
          "custom" === a.theme ? (a.customcssrules = a.customtheme, a.customtheme = !0, a.theme = "default-dark") : /deep-dark(.*)\.css/.test(a.theme) && (a.themevariant = a.theme, a.theme = "youtube-deep-dark");
        } catch (c) {
        }
        if ("default-dark" !== a.theme) {
          if ("youtube-deep-dark" === a.theme) {
            var h = b.createElement("link");
            h.id = "efyt-theme-variables";
            h.rel = "stylesheet";
            h.href = w + "/vendor/themes/" + a.themevariant;
          } else {
            if ("youtube-deep-dark-custom" === a.theme) {
              h = b.createElement("style");
              h.type = "text/css";
              h.id = "efyt-theme-variables";
              p = [];
              var F;
              for ([F, r] of Object.entries(a.customcolors)) {
                if ("--shadow" === F) {
                  var t = r.replace("#", "");
                  var r = parseInt(t.substring(0, 2), 16);
                  var K = parseInt(t.substring(2, 4), 16);
                  t = parseInt(t.substring(4, 6), 16);
                  r = `0 1px .5px rgba(${r}, ${K}, ${t}, .2)`;
                }
                p.push(F + ":" + r);
              }
              h.textContent = ":root{" + p.join(";") + "}";
            }
          }
          var u = b.createElement("link");
          u.id = "efyt-theme";
          u.rel = "stylesheet";
          u.href = w + "/vendor/themes/youtube-deep-dark.material.css";
          b.head ? (b.head.appendChild(h), b.head.appendChild(u)) : b.documentElement.addEventListener("load", function d(f) {
            b.head && (b.documentElement.removeEventListener("load", d, !0), b.head.appendChild(h), b.head.appendChild(u));
          }, !0);
        }
      }
      if (a.customtheme) {
        var g = b.createElement("style");
        g.type = "text/css";
        g.id = "efyt-custom-theme";
        g.textContent = a.customcssrules;
        b.head ? b.head.appendChild(g) : b.documentElement.addEventListener("load", function d(f) {
          b.head && (b.documentElement.removeEventListener("load", d, !0), b.head.appendChild(g));
        }, !0);
      }
      if (a.hidechat || a.hidecomments || a.hiderelated) {
        g = b.createElement("style"), g.type = "text/css", g.id = "test", g.textContent = "html.efyt-hide-chat ytd-live-chat-frame, html.efyt-hide-comments ytd-item-section-renderer.ytd-comments, html.efyt-hide-related ytd-watch-next-secondary-results-renderer, html.efyt-hide-related #related-skeleton.ytd-watch-flexy, html.efyt-hide-related .html5-video-player .html5-endscreen {display: none !important}", b.head ? b.head.appendChild(g) : b.documentElement.addEventListener("load", function d(f) {
          b.head && (b.documentElement.removeEventListener("load", d, !0), b.head.appendChild(g));
        }, !0), a.hidechat && b.documentElement.classList.add("efyt-hide-chat"), a.hidecomments && b.documentElement.classList.add("efyt-hide-comments"), a.hiderelated && b.documentElement.classList.add("efyt-hide-related");
      }
      var v = "/watch" === location.pathname || /\/(shorts\/|live$)/.test(location.pathname) ? "watch" : /^\/(user|channel|c\/)/.test(location.pathname) ? "channel" : "browse";
      b.addEventListener("yt-navigate-start", function(c) {
        "channel" === c.detail.pageType || "watch" === c.detail.pageType ? (b.addEventListener("keydown", x, !0), b.addEventListener("mousedown", y, !0), v = c.detail.pageType, q = !1) : v = c.detail.pageType;
        clearTimeout(I);
      });
      b.addEventListener("yt-navigate-finish", function(c) {
        "channel" === v && (D = 0, b.hidden ? b.addEventListener("visibilitychange", function d() {
          b.removeEventListener("visibilitychange", d);
          setTimeout(C, 1000);
        }) : setTimeout(C, 1000));
      });
      HTMLVideoElement.prototype.play = function(c) {
        return function() {
          z || (z = b.querySelector("yt-playlist-manager"));
          if (!q && a.blockautoplay && ("watch" === v || "channel" === v || b.querySelector("ytd-app > ytd-miniplayer[active]")) && (b.hidden || a.pauseforegroundtab) && (z && z.currentPlaylistData_ && !a.ignoreplaylists || 0 > location.href.indexOf("list=") || !a.ignoreplaylists) && this.classList.contains("html5-main-video")) {
            m = this.parentNode.parentNode, a.pausevideos && this.setAttribute("pausevideos", ""), m.pauseVideo(), m.hasAttribute("onstatechange") || (m.setAttribute("onstatechange", ""), m.addEventListener("onStateChange", J));
          } else {
            return c.apply(this, arguments);
          }
        };
      }(HTMLVideoElement.prototype.play);
      l.MediaSource && (MediaSource.isTypeSupported = function(c) {
        return function(f) {
          return a.blockhfrformats && /framerate=([4-6]\d|\d{3,})/.test(f) || a.blockwebmformats && /video\/webm/.test(f) ? !1 : c(f);
        };
      }(MediaSource.isTypeSupported));
      b.addEventListener("keydown", x, !0);
      b.addEventListener("mousedown", y, !0);
      b.hidden || b.addEventListener("visibilitychange", function() {
        b.hidden && (q = !0);
      }, !0);
      b.addEventListener("DOMContentLoaded", function f() {
        b.removeEventListener("DOMContentLoaded", f);
        if (!l.Polymer && "default-dark" !== a.theme) {
          var d = b.head.querySelector("#efyt-theme-variables"), n = b.head.querySelector("#efyt-theme");
          n && b.head.removeChild(n);
          d && b.head.removeChild(d);
        }
      });
    }
  }.toString() + ')(window, document, "' + chrome.runtime.getURL("resources") + '", ' + chrome.extension.inIncognitoContext + ")";
  document.documentElement.appendChild(B);
  B.remove();
})();