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
(function(w, c, Wc, S, Xc) {
  if (!w.EnhancerForYouTube && !w.efyt.loaded) {
    w.efyt.loaded = Xc;
    function Ha() {
      var a = "Win32" === navigator.platform || "Win64" === navigator.platform;
      n && (n.removeEventListener("mouseenter", Qb), n.removeEventListener("mouseleave", Rb), n.removeEventListener("mousedown", Sb, !0), n.removeEventListener("mouseup", a ? Tb : Ub, !0), n.removeEventListener("contextmenu", a ? Vb : Wb, !0), n.removeEventListener("wheel", Xb));
      g && (g.removeEventListener("onStateChange", Yb), g.removeEventListener("onAdStateChange", Zb), g.removeEventListener("onVideoDataChange", qb), g.removeEventListener("onPlaybackRateChange", $b), g.removeEventListener("SIZE_CLICKED", ac));
      l && l.removeEventListener("click", bc);
      ab = B = n = g = l = Ra = Sa = !1;
      if (rb()) {
        if (ab = "watch", B = !0, g = c.querySelector("#movie_player")) {
          try {
            L = g.getVideoData().author;
          } catch (d) {
            (L = c.querySelector("ytd-channel-name yt-formatted-string.ytd-channel-name")) && (L = L.textContent.trim());
          }
        } else {
          L = "";
        }
      } else {
        if (/^\/(user|channel|c\/)/.test(location.pathname)) {
          if (ab = "channel", g = c.querySelector("#c4-player")) {
            try {
              L = g.getVideoData().author;
            } catch (d) {
              (L = c.querySelector("ytd-channel-name yt-formatted-string.ytd-channel-name")) && (L = L.textContent.trim());
            }
          } else {
            L = "";
          }
        }
      }
      if (ab && g && t) {
        if (Yc(), n) {
          g.addEventListener("onStateChange", Yb);
          g.addEventListener("onAdStateChange", Zb);
          g.addEventListener("onVideoDataChange", qb);
          g.addEventListener("onPlaybackRateChange", $b);
          g.addEventListener("SIZE_CLICKED", ac);
          (l = g.querySelector("video.html5-main-video")) && l.addEventListener("click", bc);
          g.hasAttribute("efyt") || (g.setAttribute("efyt", ""), b.blackbars && g.classList.add("efyt-black-bars"), b.defaultvolume && g.setVolume(b.volume), b.hidecardsendscreens ? sb() : qb({type:"dataupdated"}));
          !p && "movie_player" === g.id && g.querySelector(".ytp-chrome-controls .ytp-right-controls") && (n && (Zc(), c.dispatchEvent(new Event("efyt-get-messages"))), setTimeout(function() {
            b.disableautoplay && g && cc(!0);
            b.controlbar.active && t && !t.playerUnavailable && c.documentElement.classList.remove("efyt-player-unavailable");
            var d = c.documentElement.querySelector(":scope > div");
            let e;
            d && (null == (e = d.shadowRoot) ? 0 : e.querySelector(".vivaldi-picture-in-picture-container")) && (sa = d, d.classList.add("vivaldi-pip-btn"));
          }, 3000));
          try {
            g.querySelector(".ytp-time-display.ytp-live") && (E = 1), l && b.overridespeeds ? (l.playbackRate = E, l.defaultPlaybackRate = E) : g.setPlaybackRate(E), g.efytPlaybackRate = E;
          } catch (d) {
          }
          if (B) {
            b.selectquality && Ia();
            if (b.theatermode && t && !t.theater && !t.playerUnavailable) {
              try {
                t.theaterModeChanged_(!0);
              } catch (d) {
              }
              setTimeout(Ta, 500);
            }
            b.cinemamode ? (tb(), !b.cinemamodewideplayer && b.wideplayer && da("large")) : b.wideplayer && da("large");
            b.miniplayer && (ub(), c.body.classList.add(b.miniplayersize, b.miniplayerposition));
            "" !== L && -1 !== b.controls.indexOf("whitelist") && p && vb();
            c.documentElement.classList[b.hidechat ? "add" : "remove"]("efyt-hide-chat");
            c.documentElement.classList[b.hidecomments ? "add" : "remove"]("efyt-hide-comments");
            c.documentElement.classList[b.hiderelated ? "add" : "remove"]("efyt-hide-related");
            if (b.controlbar.active) {
              c.documentElement.classList[t && t.playerUnavailable || ka && (!ka.hasAttribute("hidden") || ka.clientHeight === g.clientHeight) ? "add" : "remove"]("efyt-player-unavailable");
            }
          }
          g.querySelector("#efyt-player-info") || (c.querySelector("#efyt-player-info") || (Y = c.createElement("div"), Y.id = "efyt-player-info"), g.appendChild(Y));
          b.applyvideofilters && l && (l.style.filter = b.filter);
        } else {
          setTimeout(Ha, 500);
        }
      }
    }
    function Yb(a) {
      0 < a && (F && !F.hidden && (l.loop = !0), Ra = !1, n.querySelectorAll("button#efyt-not-interested").forEach(function(d) {
        d.dataset.tooltip = y.remove_ads;
      }));
      if (1 === a) {
        b.pausevideos && !c.hidden && (!Ja || l && l.hasAttribute("pausevideos")) && (Ja = !0, c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"pause-videos"}})), setTimeout(function() {
          Ja = !1;
        }, 1000), l && l.removeAttribute("pausevideos"));
        g.checkTimestamp && (delete g.checkTimestamp, (a = c.location.href.match(/&t=(\d+)s?/)) && g.getCurrentTime() < a[1] && g.seekTo(parseInt(a[1], 10)));
        if (g.restorePlaybackRate) {
          delete g.restorePlaybackRate;
          try {
            b.overridespeeds ? l.playbackRate = g.efytPlaybackRate : g.setPlaybackRate(g.efytPlaybackRate);
          } catch (d) {
          }
        }
        b.selectquality && !Sa && Ia();
      } else {
        0 === a && B ? setTimeout(function() {
          g.classList.contains("ended-mode") && (Z.value = Z.max);
        }, 500) : 5 === a && (g.checkTimestamp = !0);
      }
    }
    function Zb(a) {
      if (0 < a && (g.restorePlaybackRate = !0, F && !F.hidden && (l.loop = !1), !b.blockads)) {
        var d = y.skip_ads, e = g.getPlayerResponse().adPlacements;
        e && (e = JSON.stringify(e).match(/skippableRenderer":{"skipButtonRenderer":{"message":{"text":"([^"]+)/)) && (d = e[1]);
        n.querySelectorAll("button#efyt-not-interested").forEach(function(f) {
          f.dataset.tooltip = d;
        });
      }
      1 === a ? (!b.pausevideos || c.hidden || Ja || b.blockads || (Ja = !0, c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"pause-videos"}})), setTimeout(function() {
        Ja = !1;
      }, 1000)), g.classList.remove("not-interested"), b.blockads && !Ra && 0 > Ka.indexOf(L) && B && Ua()) : 0 === a && (Ra && (a = g.querySelector("button.ytp-ad-skip-button")) && a.click(), n.querySelectorAll("button#efyt-not-interested").forEach(function(f) {
        f.dataset.tooltip = y.remove_ads;
      }));
    }
    function Ua() {
      var a = g.querySelector("button.ytp-ad-skip-button");
      a ? (a.click(), g.classList.add("not-interested")) : g.querySelector(".ytp-ad-player-overlay") ? Number.isFinite(l.duration) ? (Ra = !0, l.currentTime = l.duration - 0.5, l.paused && g.playVideo(), setTimeout(Ua, 1000)) : setTimeout(Ua, 100) : (g.classList.add("not-interested"), g.classList.remove("ytp-ad-overlay-open"));
    }
    function qb(a) {
      if ("dataupdated" === a.type && B && g) {
        if (a = g.querySelector(".ytp-cards-button")) {
          a = w.getComputedStyle(a).getPropertyValue("display"), "inline-block" !== a && "none" !== a || b.hidecardsendscreens ? b.hidecardsendscreens && sb() : dc();
        }
        -1 !== b.controls.indexOf("reverse-playlist") && O && n && n.querySelectorAll("button#efyt-reverse-playlist").forEach(function(d) {
          d.hidden = !O.currentPlaylistData_;
        });
        if (b.expanddescription) {
          try {
            c.querySelector("ytd-video-secondary-info-renderer tp-yt-paper-button.ytd-expander#more").click();
          } catch (d) {
          }
        }
        c.documentElement.classList[t.playerUnavailable ? "add" : "remove"]("efyt-player-unavailable");
      }
    }
    function sb() {
      var a = g.querySelector("#efyt-cards-end-screens");
      if (a) {
        a.querySelector("path").setAttributeNS(null, "d", a.dataset.off);
        g.setAttribute("annotations-module", 0);
        try {
          g.unloadModule("annotations_module");
        } catch (d) {
        }
      }
    }
    function dc() {
      var a = g.querySelector("#efyt-cards-end-screens");
      if (a) {
        a.querySelector("path").setAttributeNS(null, "d", a.dataset.on);
        g.setAttribute("annotations-module", 1);
        try {
          g.loadModule("annotations_module");
        } catch (d) {
        }
      }
    }
    function $b(a) {
      "number" === typeof a && (E = a);
    }
    function Rb() {
      ea = !0;
      clearInterval(ec);
      La = xa = ya = !1;
      c.body.classList.remove("ytp-contextmenu-hidden");
    }
    function Qb() {
      ea = !0;
      ec = setInterval(function() {
        try {
          (c.activeElement.classList.contains("ytp-progress-bar") || c.activeElement.classList.contains("ytp-volume-panel")) && za();
        } catch (a) {
        }
      }, 3000);
    }
    function rb() {
      return "/watch" === location.pathname || /\/(shorts\/|live$)/.test(location.pathname);
    }
    function bb() {
      return 0 < c.location.href.indexOf("list=");
    }
    function Yc() {
      if (n = B ? c.querySelector("#player-container.ytd-watch-flexy") : c.querySelector("#player-container.ytd-channel-video-player-renderer")) {
        var a = "Win32" === navigator.platform || "Win64" === navigator.platform;
        n.addEventListener("mouseenter", Qb);
        n.addEventListener("mouseleave", Rb);
        n.addEventListener("mousedown", Sb, !0);
        n.addEventListener("mouseup", a ? Tb : Ub, !0);
        n.addEventListener("contextmenu", a ? Vb : Wb, !0);
        n.addEventListener("wheel", Xb);
        b.miniplayer && ub();
      }
    }
    function za() {
      try {
        c.activeElement.blur(), g.focus({preventScroll:!0});
      } catch (a) {
      }
    }
    function wb() {
      var a = b.backgroundcolor.replace("#", ""), d = parseInt(a.substring(0, 2), 16), e = parseInt(a.substring(2, 4), 16);
      a = parseInt(a.substring(4, 6), 16);
      var f = c.createElement("style");
      f.type = "text/css";
      f.textContent = `body.efyt-cinema-mode .html5-video-player:not(.efyt-black-bars){background-color: rgba(${d}, ${e}, ${a}, ${b.backgroundopacity / 100})}'`;
      c.head.appendChild(f);
    }
    function $c() {
      setTimeout(function() {
        try {
          if (!c.body.classList.contains("efyt-mini-player")) {
            var a = n.clientHeight, d = l.clientHeight;
            g.clientHeight !== a ? (g.style.width = n.clientWidth, g.style.height = a, g.style.width = "", g.style.height = "") : d !== a && (l.style.width = n.clientWidth, l.style.height = a, l.style.top = "");
          }
        } catch (e) {
        }
      }, 50);
    }
    function ub() {
      w.IntersectionObserver && n && !n.hasAttribute("io") && (n.setAttribute("io", ""), xb = new IntersectionObserver(function(a) {
        if ((0 === a[0].intersectionRatio && !c.body.classList.contains("efyt-mini-player") && 0 < w.scrollY || 0 < a[0].intersectionRatio && 0.12 > a[0].intersectionRatio) && w.scrollY > n.offsetHeight - 100 && rb()) {
          if (!g || !g.classList.contains("ended-mode")) {
            l && l.addEventListener("timeupdate", fc);
            c.body.classList.add("efyt-mini-player");
            try {
              l.style.top = "";
            } catch (d) {
            }
          }
        } else {
          0 !== a[0].intersectionRatio && (l && l.removeEventListener("timeupdate", fc), c.body.classList.remove("efyt-mini-player"), w.dispatchEvent(new Event("resize")), $c());
        }
      }, {threshold:0.12}), xb.observe(n));
    }
    function Ma() {
      var a = c.documentElement.clientWidth, d = c.documentElement.clientHeight;
      if (a !== Aa || d !== Ba) {
        Aa = a;
        Ba = d;
        var e = w.innerWidth, f = c.querySelector("ytd-masthead"), h = f ? f.clientHeight : 56;
        f = h;
        if (b.controlvolume && !b.controlvolumemousebutton || b.controlbar.active && "fixed" === b.controlbar.position && !b.controlbar.autohide) {
          f += 36;
        }
        if (parseInt((d - f) * T, 10) > a) {
          f = a;
          var m = parseInt(f / T, 10);
          d = f;
          var k = m;
          Va = !1;
        } else {
          m = parseInt(d - f, 10), f = parseInt(m * T, 10), e = parseInt((d - 2 * h) * T, 10), k = w.screen.height === d ? d - 12 : d, d = parseInt(k * T, 10), Va = !0;
        }
        h = parseInt(e / T, 10);
        var C = parseInt((a - f) / 2, 10);
        var N = parseInt((a - e) / 2, 10);
        a = parseInt((a - d) / 2, 10);
        a = `body.efyt-wide-player ytd-watch-flexy[theater]:not([fullscreen]) #player-theater-container,body.efyt-wide-player ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) video.html5-main-video,body.efyt-wide-player ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) .ytp-iv-video-content{height:${m}px !important}body.efyt-wide-player.viewport:not(.efyt-mini-player) ytd-watch-flexy[theater]:not([fullscreen]) #player-theater-container,body.efyt-wide-player.viewport:not(.efyt-mini-player) ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) video.html5-main-video,body.efyt-wide-player.viewport:not(.efyt-mini-player) ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) .ytp-iv-video-content{height:${k}px !important}body.efyt-wide-player ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) video.html5-main-video,body.efyt-wide-player ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) .ytp-iv-video-content{width:${f}px !important;left:${C}px !important}body.efyt-wide-player.viewport:not(.efyt-mini-player) ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) video.html5-main-video,body.efyt-wide-player.viewport:not(.efyt-mini-player) ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) .ytp-iv-video-content{width:${d}px !important;left:${a}px !important}body.efyt-cinema-mode.efyt-wide-player ytd-watch-flexy[theater]:not([fullscreen]) #player-theater-container,body.efyt-cinema-mode.efyt-wide-player ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) video.html5-main-video,body.efyt-cinema-mode.efyt-wide-player ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) .ytp-iv-video-content{height:${h}px !important}body.efyt-cinema-mode.efyt-wide-player ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) video.html5-main-video,body.efyt-cinema-mode.efyt-wide-player ytd-watch-flexy[theater] #movie_player:not(.ytp-fullscreen) .ytp-iv-video-content{width:${e}px !important;left:${N}px !important}`;
        Na ? Na.textContent = a : (Na = c.createElement("style"), Na.type = "text/css", Na.textContent = a, c.head.appendChild(Na));
        Ca = !0;
        c.body.classList.contains("efyt-wide-player") && (w.removeEventListener("resize", yb), w.dispatchEvent(new Event("resize")), w.addEventListener("resize", yb));
      }
    }
    function ad(a) {
      a.preventDefault();
      a.stopPropagation();
      /speed/.test(this.id) ? G.textContent = `${this.dataset.tooltip} (${E}x)` : G.textContent = this.dataset.tooltip;
      G.style.left = this.offsetLeft + this.clientWidth / 2 + "px";
      G.classList.add("visible");
    }
    function bd(a) {
      a.preventDefault();
      a.stopPropagation();
      G.classList.remove("visible");
    }
    function gc() {
      zb.dispatchEvent(new Event("mouseover"));
      zb.dispatchEvent(new Event("mouseout"));
      Wa || (Wa = g.querySelector(".ytp-tooltip:not(.ytp-efyt-tooltip)"));
      Wa && "" !== Wa.style.top && (/speed/.test(this.id) ? U.textContent = `${this.dataset.tooltip} (${E}x)` : U.textContent = this.dataset.tooltip, aa.style.display = "block", aa.style.top = Wa.style.top, "efyt-loop" === this.id && 0 === b.controls.indexOf("loop") || "efyt-stop" === this.id && 0 === b.controls.indexOf("stop") || "efyt-reverse-playlist" === this.id && 0 === b.controls.indexOf("reverse-playlist") ? aa.style.left = this.parentNode.parentNode.parentNode.offsetLeft + "px" : aa.style.left = 
      ("ytp-efyt-controls" === this.parentNode.id ? this.parentNode.parentNode.parentNode.parentNode.offsetLeft : this.parentNode.parentNode.parentNode.offsetLeft) + this.offsetLeft + this.offsetWidth / 2 - aa.getBoundingClientRect().width / 2 + "px");
    }
    function cb() {
      aa && (aa.style.display = "none");
    }
    function cd(a, d, e) {
      var f = c.createElement("button"), h = c.createElementNS("http://www.w3.org/2000/svg", "svg"), m = c.createElementNS("http://www.w3.org/2000/svg", "path");
      "reverse-playlist" === a ? -1 !== b.controls.indexOf(a) ? f.hidden = O ? !O.currentPlaylistData_ : g && g.getPlaylistId ? !g.getPlaylistId() : !0 : f.hidden = !0 : f.hidden = -1 !== b.controls.indexOf(a) ? !1 : !0;
      h.setAttributeNS(null, "version", "1.1");
      h.setAttributeNS(null, "viewBox", "0 0 36 36");
      h.setAttributeNS(null, "height", "100%");
      h.setAttributeNS(null, "width", "100%");
      m.setAttributeNS(null, "id", "efyt-" + a);
      m.setAttributeNS(null, "d", d);
      m.setAttributeNS(null, "fill", "var(--efyt-control-bar-color)");
      e && m.setAttributeNS(null, "transform", e);
      h.appendChild(m);
      f.appendChild(h);
      f.addEventListener("mouseover", ad, !0);
      f.addEventListener("mouseout", bd, !0);
      f.addEventListener("click", function() {
        this.blur();
      });
      return f;
    }
    function H(a, d, e) {
      var f = c.createElement("button"), h = c.createElementNS("http://www.w3.org/2000/svg", "use"), m = c.createElementNS("http://www.w3.org/2000/svg", "svg"), k = c.createElementNS("http://www.w3.org/2000/svg", "path");
      f.className = "ytp-button ytp-efyt-button";
      "reverse-playlist" === a ? -1 !== b.controls.indexOf(a) ? f.hidden = O ? !O.currentPlaylistData_ : g && g.getPlaylistId ? !g.getPlaylistId() : !0 : f.hidden = !0 : f.hidden = -1 !== b.controls.indexOf(a) ? !1 : !0;
      m.setAttributeNS(null, "version", "1.1");
      m.setAttributeNS(null, "viewBox", "0 0 36 36");
      m.setAttributeNS(null, "height", "100%");
      m.setAttributeNS(null, "width", "100%");
      h.setAttribute("class", "ytp-svg-shadow");
      h.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#ytp-efyt-" + a);
      k.setAttributeNS(null, "id", "ytp-efyt-" + a);
      k.setAttributeNS(null, "d", d);
      k.setAttributeNS(null, "fill", "#fff");
      e && k.setAttributeNS(null, "transform", e);
      m.appendChild(h);
      m.appendChild(k);
      f.appendChild(m);
      f.addEventListener("mouseover", gc);
      f.addEventListener("mouseout", cb);
      a = cd(a, d, e);
      return [f, a];
    }
    function Zc() {
      zb = g.querySelector(".ytp-settings-button");
      U = c.createElement("span");
      U.className = "ytp-tooltip-text";
      var a = c.createElement("div");
      a.appendChild(U);
      a.className = "ytp-tooltip-text-wrapper";
      aa = c.createElement("div");
      aa.appendChild(a);
      aa.className = "ytp-tooltip ytp-efyt-tooltip";
      aa.style.display = "none";
      g.appendChild(aa);
      var d = c.createDocumentFragment();
      a = H("loop", "m 13,13 h 10 v 3 l 4,-4 -4,-4 v 3 H 11 v 6 h 2 z M 23,23 H 13 v -3 l -4,4 4,4 v -3 h 12 v -6 h -2 z");
      a[0].id = a[1].id = "efyt-loop";
      a[0].dataset.message = a[1].dataset.message = "loop";
      a[0].addEventListener("click", hc);
      a[1].addEventListener("click", hc);
      a[0].addEventListener("contextmenu", ic, !0);
      a[1].addEventListener("contextmenu", ic, !0);
      d.appendChild(a[0]);
      var e = H("stop", "M 9.9999997,10 H 26 V 26 H 9.9999997 Z");
      e[0].id = e[1].id = "efyt-stop";
      e[0].dataset.message = e[1].dataset.message = "stop";
      e[0].addEventListener("click", jc);
      e[1].addEventListener("click", jc);
      d.appendChild(e[0]);
      var f = H("reverse-playlist", "M 12,11 V 23 H 9 l 4,4 4,-4 H 14 V 13 11 Z m 11,-2 -4,4 h 3 v 10 2 h 2 V 13 h 3 z");
      f[0].id = f[1].id = "efyt-reverse-playlist";
      f[0].dataset.message = f[1].dataset.message = "reverse_playlist";
      f[0].addEventListener("click", kc);
      f[1].addEventListener("click", kc);
      f[0].addEventListener("contextmenu", lc, !0);
      f[1].addEventListener("contextmenu", lc, !0);
      d.appendChild(f[0]);
      var h = g.querySelector(".ytp-left-controls");
      h && h.insertBefore(d, h.firstChild);
      var m = H("volume-booster", "M 8.5 9 C 6.195898 11.304103 4.7695312 14.486564 4.7695312 18 C 4.7695312 21.513437 6.195898 24.695899 8.5 27 L 9.8496094 25.650391 C 7.8892134 23.689995 6.6796875 20.978784 6.6796875 18 C 6.6796875 15.021216 7.8892134 12.310004 9.8496094 10.349609 L 8.5 9 z M 27.5 9 L 26.150391 10.349609 C 28.110787 12.310004 29.320313 15.021216 29.320312 18 C 29.320312 20.978784 28.110787 23.689995 26.150391 25.650391 L 27.5 27 C 29.804102 24.695899 31.230469 21.513437 31.230469 18 C 31.230469 14.486564 29.804102 11.304103 27.5 9 z M 18.800781 10 L 14 19.599609 L 17.199219 19.599609 L 17.199219 26 L 22 16.400391 L 18.800781 16.400391 L 18.800781 10 z M 11.699219 11.699219 C 10.082529 13.31591 9.0898437 15.54314 9.0898438 18 C 9.0898438 20.45686 10.082529 22.684091 11.699219 24.300781 L 13.048828 22.951172 C 11.775844 21.678187 10.998047 19.934936 10.998047 18 C 10.998047 16.065064 11.788574 14.321814 13.048828 13.048828 L 11.699219 11.699219 z M 24.300781 11.699219 L 22.951172 13.048828 C 24.211427 14.321814 25.001953 16.065064 25.001953 18 C 25.001953 19.934936 24.211427 21.678187 22.951172 22.951172 L 24.300781 24.300781 C 25.917473 22.684091 26.910156 20.45686 26.910156 18 C 26.910156 15.54314 25.917473 13.31591 24.300781 11.699219 z M 18.384766 11.726562 L 18.384766 16.853516 L 21.298828 16.853516 L 17.615234 24.273438 L 17.615234 19.146484 L 14.755859 19.146484 L 18.384766 11.726562 z");
      m[0].id = m[1].id = "efyt-volume-booster";
      m[0].dataset.message = m[1].dataset.message = "boost_volume";
      m[0].dataset.on = m[1].dataset.on = "M 18.799896,16.4 V 10 l -4.8,9.6 h 3.2 V 26 l 4.8,-9.6 z m -7.101273,7.901273 1.349363,-1.349363 C 11.775002,21.678925 10.998482,19.934936 10.998482,18 c 0,-1.934936 0.789249,-3.678925 2.049504,-4.951911 L 11.698623,11.698726 C 10.081933,13.315417 9.089005,15.543139 9.089005,18 c 0,2.456859 0.992928,4.684583 2.609618,6.301273 z M 25.001311,18 c 0,1.934936 -0.789252,3.678925 -2.049506,4.95191 l 1.349363,1.349363 C 25.917859,22.684583 26.910787,20.456859 26.910787,18 c 0,-2.456861 -0.992928,-4.684583 -2.609619,-6.301274 l -1.349363,1.349363 C 24.212059,14.321075 25.001311,16.065064 25.001311,18 Z M 6.679373,18 c 0,-2.978784 1.209334,-5.69024 3.169731,-7.650635 L 8.499741,9 c -2.304102,2.304102 -3.729845,5.486563 -3.729845,9 0,3.513437 1.425743,6.695898 3.729845,9 L 9.849104,25.650636 C 7.888707,23.69024 6.679373,20.978784 6.679373,18 Z m 24.550731,0 c 0,-3.513437 -1.425742,-6.695898 -3.729845,-9 l -1.349363,1.349365 c 1.960395,1.960395 3.169731,4.671851 3.169731,7.650635 0,2.978784 -1.209336,5.69024 -3.169731,7.650636 L 27.500259,27 c 2.304103,-2.304102 3.729845,-5.486563 3.729845,-9 z";
      m[0].dataset.off = m[1].dataset.off = "M 8.5 9 C 6.195898 11.304103 4.7695312 14.486564 4.7695312 18 C 4.7695312 21.513437 6.195898 24.695899 8.5 27 L 9.8496094 25.650391 C 7.8892134 23.689995 6.6796875 20.978784 6.6796875 18 C 6.6796875 15.021216 7.8892134 12.310004 9.8496094 10.349609 L 8.5 9 z M 27.5 9 L 26.150391 10.349609 C 28.110787 12.310004 29.320313 15.021216 29.320312 18 C 29.320312 20.978784 28.110787 23.689995 26.150391 25.650391 L 27.5 27 C 29.804102 24.695899 31.230469 21.513437 31.230469 18 C 31.230469 14.486564 29.804102 11.304103 27.5 9 z M 18.800781 10 L 14 19.599609 L 17.199219 19.599609 L 17.199219 26 L 22 16.400391 L 18.800781 16.400391 L 18.800781 10 z M 11.699219 11.699219 C 10.082529 13.31591 9.0898437 15.54314 9.0898438 18 C 9.0898438 20.45686 10.082529 22.684091 11.699219 24.300781 L 13.048828 22.951172 C 11.775844 21.678187 10.998047 19.934936 10.998047 18 C 10.998047 16.065064 11.788574 14.321814 13.048828 13.048828 L 11.699219 11.699219 z M 24.300781 11.699219 L 22.951172 13.048828 C 24.211427 14.321814 25.001953 16.065064 25.001953 18 C 25.001953 19.934936 24.211427 21.678187 22.951172 22.951172 L 24.300781 24.300781 C 25.917473 22.684091 26.910156 20.45686 26.910156 18 C 26.910156 15.54314 25.917473 13.31591 24.300781 11.699219 z M 18.384766 11.726562 L 18.384766 16.853516 L 21.298828 16.853516 L 17.615234 24.273438 L 17.615234 19.146484 L 14.755859 19.146484 L 18.384766 11.726562 z";
      m[0].addEventListener("click", mc);
      m[1].addEventListener("click", mc);
      d = g.querySelector(".ytp-volume-area");
      h && d && h.insertBefore(m[0], d.nextSibling);
      d = c.createDocumentFragment();
      h = H("new-message", "M 29.362501,8 H 6.6374995 V 26.18 H 29.3625 Z m -2.2725,4.545 L 18,18.226251 8.9099995,12.545 V 10.2725 L 18,15.95375 27.090001,10.2725 Z")[0];
      h.id = "efyt-new-message";
      h.hidden = !b.message;
      h.dataset.message = "message";
      h.addEventListener("click", function() {
        c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"message-page"}}));
        g.pauseVideo();
        c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"pause-videos"}}));
      });
      d.appendChild(h);
      var k = c.createElement("span");
      k.id = "ytp-efyt-controls";
      k.style.display = "none";
      localStorage.getItem("efyt-controls-visible") && k.classList.add("visible");
      var C = H("controls-button", "m 10.823624,14.695941 c -1.315669,0 -2.392125,1.076456 -2.392125,2.392125 0,1.315668 1.076456,2.392125 2.392125,2.392125 1.315669,0 2.392125,-1.076457 2.392125,-2.392125 0,-1.315669 -1.076456,-2.392125 -2.392125,-2.392125 z m 14.35275,0 c -1.315669,0 -2.392125,1.076456 -2.392125,2.392125 0,1.315668 1.076456,2.392125 2.392125,2.392125 1.315669,0 2.392125,-1.076457 2.392125,-2.392125 0,-1.315669 -1.076456,-2.392125 -2.392125,-2.392125 z m -7.176375,0 c -1.315669,0 -2.392125,1.076456 -2.392125,2.392125 0,1.315668 1.076456,2.392125 2.392125,2.392125 1.315669,0 2.392125,-1.076457 2.392125,-2.392125 0,-1.315669 -1.076456,-2.392125 -2.392125,-2.392125 z")[0];
      C.id = "efyt-controls-button";
      C.hidden = !1;
      C.classList.remove("ytp-efyt-button");
      C.addEventListener("click", function() {
        k.classList.toggle("visible");
        k.classList.contains("visible") ? localStorage.setItem("efyt-controls-visible", !0) : localStorage.removeItem("efyt-controls-visible");
        k.querySelectorAll(".ytp-efyt-button").forEach(function(V) {
          k.classList.contains("visible") ? V.removeAttribute("tabindex") : V.tabIndex = -1;
        });
      });
      C.removeEventListener("mouseover", gc);
      C.removeEventListener("mouseout", cb);
      k.appendChild(C);
      h = H("options", "m 17.215778,7.9998438 -0.121201,1.8617668 a 7.2941366,7.2941366 0 0 0 -2.61169,0.8471364 l -1.19138,-1.433778 -0.19737,0.143504 -0.437247,0.3173086 -0.436823,0.3177284 -0.197372,0.143504 0.993587,1.573917 a 7.2941366,7.2941366 0 0 0 -1.611792,2.223684 l -1.8070586,-0.459551 -0.075748,0.231879 -0.1666512,0.513838 -0.1670707,0.513838 -0.075329,0.232299 1.7271025,0.688064 a 7.2941366,7.2941366 0 0 0 -0.133827,1.374862 7.2941366,7.2941366 0 0 0 0.136352,1.374021 l -1.7296275,0.689325 0.075329,0.231879 0.1670707,0.513837 0.1666512,0.513838 0.075748,0.231877 1.8066396,-0.459549 a 7.2941366,7.2941366 0 0 0 1.614314,2.220318 l -0.99569,1.577282 0.197372,0.143505 0.436823,0.31773 0.437247,0.317306 0.19737,0.143506 1.187172,-1.42831 a 7.2941366,7.2941366 0 0 0 2.615898,0.844193 l 0.121201,1.859242 h 0.244084 0.53993 0.540349 0.244083 l 0.1212,-1.861768 a 7.2941366,7.2941366 0 0 0 2.611271,-0.847137 l 1.1918,1.43378 0.197372,-0.143506 0.437244,-0.317306 0.436827,-0.31773 0.19737,-0.143505 -0.993589,-1.573917 a 7.2941366,7.2941366 0 0 0 1.611792,-2.223683 l 1.807059,0.459549 0.07575,-0.231878 0.166648,-0.513837 0.16707,-0.513838 0.07533,-0.231879 -1.727521,-0.688483 a 7.2941366,7.2941366 0 0 0 0.134246,-1.374863 7.2941366,7.2941366 0 0 0 -0.13635,-1.37402 l 1.729625,-0.688905 -0.07533,-0.232299 -0.16707,-0.513838 -0.166648,-0.513838 -0.07575,-0.231879 -1.806636,0.459551 A 7.2941366,7.2941366 0 0 0 22.981616,11.774298 L 23.977308,10.197014 23.779938,10.05351 23.343111,9.7357816 22.905867,9.418473 22.708495,9.274969 21.521325,10.703277 A 7.2941366,7.2941366 0 0 0 18.905424,9.8590851 l -0.1212,-1.8592413 h -0.244083 -0.540349 -0.53993 z m 0.784434,3.9903412 a 5.0996903,5.0996903 0 0 1 5.099659,5.099659 5.0996903,5.0996903 0 0 1 -5.099659,5.09966 5.0996903,5.0996903 0 0 1 -5.100078,-5.09966 5.0996903,5.0996903 0 0 1 5.100078,-5.099659 z m 0,1.292801 a 3.8068902,3.8068902 0 0 0 -3.807279,3.806858 3.8068902,3.8068902 0 0 0 3.807279,3.80686 3.8068902,3.8068902 0 0 0 3.806859,-3.80686 3.8068902,3.8068902 0 0 0 -3.806859,-3.806858 z m 0,0.804632 a 3.0021577,3.0021577 0 0 1 3.001804,3.002226 3.0021577,3.0021577 0 0 1 -3.001804,3.002225 3.0021577,3.0021577 0 0 1 -3.002226,-3.002225 3.0021577,3.0021577 0 0 1 3.002226,-3.002226 z");
      h[0].id = h[1].id = "efyt-options";
      h[0].dataset.message = h[1].dataset.message = "options";
      h[0].addEventListener("click", nc);
      h[1].addEventListener("click", nc);
      h[1].addEventListener("contextmenu", ba);
      k.appendChild(h[0]);
      var N = H("custom-script", "m 19.658,22.84 5.75,-5.75 -5.75,-5.75 1.75,-1.7499999 7.5,7.4999999 -7.5,7.5 z m -3.316,0 -5.75,-5.75 5.75,-5.75 -1.75,-1.7499999 -7.5,7.4999999 7.5,7.5 z");
      N[0].id = N[1].id = "efyt-custom-script";
      N[0].dataset.message = N[1].dataset.message = "custom_script";
      N[0].addEventListener("click", oc);
      N[1].addEventListener("click", oc);
      N[1].addEventListener("contextmenu", ba);
      k.appendChild(N[0]);
      var M = H("keyboard-shortcuts", "m 24.492861,11.895714 h 2.597142 v 2.597143 h -2.597142 z m 0,3.895714 h 2.597142 v 2.597144 h -2.597142 z m -3.895714,-3.895714 h 2.597143 v 2.597143 h -2.597143 z m 0,3.895714 h 2.597143 v 2.597144 h -2.597143 z m -7.791429,3.895715 H 23.19429 v 2.597143 H 12.805718 Z M 8.9100043,11.895714 h 2.5971427 v 2.597143 H 8.9100043 Z m 0,3.895714 h 2.5971427 v 2.597144 H 8.9100043 Z m 3.8957137,0 h 2.597143 v 2.597144 h -2.597143 z m 0,-3.895714 h 2.597143 v 2.597143 h -2.597143 z m 3.895715,3.895714 h 2.597142 v 2.597144 h -2.597142 z m 0,-3.895714 h 2.597142 v 2.597143 H 16.701433 Z M 7.6113281,8 C 6.1828991,8 5.0273437,9.1692275 5.0273438,10.597656 l -0.013672,12.984375 c 0,1.428429 1.1692272,2.597657 2.5976562,2.597657 H 28.388672 c 1.428429,0 2.597656,-1.169228 2.597656,-2.597657 V 10.597656 C 30.986328,9.1692274 29.817101,8 28.388672,8 Z M 8.7617188,9.8496094 H 27.238281 c 1.27016,0 2.308594,0.9307206 2.308594,2.0683596 v 10.341797 c 0,1.13764 -1.038434,2.068359 -2.308594,2.068359 H 8.7617188 c -1.2701601,0 -2.3085938,-0.930719 -2.3085938,-2.068359 l 0.011719,-10.341797 c -10e-8,-1.137639 1.026715,-2.0683596 2.296875,-2.0683596 z");
      M[0].id = M[1].id = "efyt-keyboard-shortcuts";
      M[0].dataset.message = M[1].dataset.message = "keyboard_shortcuts";
      M[0].addEventListener("click", Xa);
      M[1].addEventListener("click", Xa);
      M[1].addEventListener("contextmenu", ba);
      k.appendChild(M[0]);
      var la = H("screenshot", "M 26.079999,10.02 H 22.878298 L 21.029999,8 h -6.06 l -1.8483,2.02 H 9.9200015 c -1.111,0 -2.02,0.909 -2.02,2.02 v 12.12 c 0,1.111 0.909,2.02 2.02,2.02 H 26.079999 c 1.111,0 2.019999,-0.909 2.019999,-2.02 V 12.04 c 0,-1.111 -0.909,-2.02 -2.019999,-2.02 z m 0,14.14 H 9.9200015 V 12.04 h 4.0904965 l 1.8483,-2.02 h 4.2824 l 1.8483,2.02 h 4.0905 z m -8.08,-11.11 c -2.7876,0 -5.05,2.2624 -5.05,5.05 0,2.7876 2.2624,5.05 5.05,5.05 2.7876,0 5.049999,-2.2624 5.049999,-5.05 0,-2.7876 -2.262399,-5.05 -5.049999,-5.05 z m 0,8.08 c -1.6665,0 -3.03,-1.3635 -3.03,-3.03 0,-1.6665 1.3635,-3.03 3.03,-3.03 1.6665,0 3.03,1.3635 3.03,3.03 0,1.6665 -1.3635,3.03 -3.03,3.03 z");
      la[0].id = la[1].id = "efyt-screenshot";
      la[0].dataset.message = la[1].dataset.message = "screenshot";
      la[0].addEventListener("click", pc);
      la[1].addEventListener("click", pc);
      la[1].addEventListener("contextmenu", ba);
      k.appendChild(la[0]);
      var ma = H("flip-vertically", "m 8.897825,20.136232 v 2.022705 h 2.022705 v -2.022705 z m 12.136233,4.04541 v 2.022707 h 2.022705 v -2.022707 z m 6.068116,-16.181643 -18.204349,0 v 6.068116 h 2.022705 v -4.045411 l 14.158938,0 v 4.045411 h 2.022706 z m 0,16.181643 h -2.022706 v 2.022707 h 2.022706 z M 6.87512,16.090821 v 2.022706 h 22.24976 v -2.022706 z m 6.068116,8.090821 v 2.022707 h 2.022706 v -2.022707 z m 12.136232,-4.04541 v 2.022705 h 2.022706 v -2.022705 z m -8.090822,4.04541 v 2.022707 h 2.022706 v -2.022707 z m -8.090821,0 v 2.022707 h 2.022705 v -2.022707 z");
      ma[0].id = ma[1].id = "efyt-flip-vertically";
      ma[0].dataset.message = ma[1].dataset.message = "flip_vertically";
      ma[0].addEventListener("click", db);
      ma[1].addEventListener("click", db);
      ma[1].addEventListener("contextmenu", ba);
      k.appendChild(ma[0]);
      var na = H("flip-horizontally", "m 21.034058,26.204349 h 2.022705 v -2.022705 h -2.022705 z m 4.04541,-12.136233 h 2.022707 V 12.045411 H 25.079468 Z M 8.897825,8 v 18.204349 h 6.068116 V 24.181644 H 10.92053 V 10.022706 h 4.045411 V 8 Z m 16.181643,0 v 2.022706 h 2.022707 V 8 Z m -8.090821,20.227054 h 2.022706 V 5.9772944 h -2.022706 z m 8.090821,-6.068116 h 2.022707 v -2.022706 h -2.022707 z m -4.04541,-12.136232 h 2.022705 V 8 h -2.022705 z m 4.04541,8.090822 h 2.022707 v -2.022706 h -2.022707 z m 0,8.090821 h 2.022707 v -2.022705 h -2.022707 z");
      na[0].id = na[1].id = "efyt-flip-horizontally";
      na[0].dataset.message = na[1].dataset.message = "flip_horizontally";
      na[0].addEventListener("click", db);
      na[1].addEventListener("click", db);
      na[1].addEventListener("contextmenu", ba);
      k.appendChild(na[0]);
      var ha = H("video-filters", "m 22.899051,15.920251 -1.037187,2.272983 -1.037186,-2.272983 -2.272983,-1.037187 2.272983,-1.037186 1.037186,-2.272983 1.037187,2.272983 2.272983,1.037186 z m -6.278288,3.65222 -1.379238,3.034322 -1.379237,-3.034322 -3.034322,-1.379237 3.034322,-1.379237 1.379237,-3.034323 1.379238,3.034323 3.034322,1.379237 z M 5.390625,8 v 18.179688 h 25.21875 V 8 Z m 2.0195312,2.009766 H 28.589844 V 24.169922 H 7.4101562 Z");
      ha[0].id = ha[1].id = "efyt-video-filters";
      ha[0].dataset.message = ha[1].dataset.message = "video_filters";
      ha[0].addEventListener("click", qc);
      ha[1].addEventListener("click", qc);
      ha[0].addEventListener("contextmenu", rc, !0);
      ha[1].addEventListener("contextmenu", rc, !0);
      k.appendChild(ha[0]);
      var oa = H("speed-plus", "m 11.494141,8 c -2.6853634,0 -4.8652346,2.17987 -4.8652348,4.865234 0,2.685363 2.1798714,4.865235 4.8652348,4.865235 2.685364,0 4.865234,-2.179872 4.865234,-4.865235 C 16.359375,10.17987 14.179505,8 11.494141,8 Z m -0.679688,1.4609375 h 1.359375 v 2.7246095 h 2.722656 v 1.359375 h -2.722656 v 2.722656 H 10.814453 V 13.544922 H 8.0917969 v -1.359375 h 2.7226561 z m 6.865235,-1.4550784 a 11.389523,11.389523 0 0 0 -1.66211,0.185547 c 0.60671,0.587327 1.100701,1.289573 1.44336,2.0742189 a 9.1116182,9.1116182 0 0 1 4.597656,0.9375 l 2.107422,-1.4003909 a 11.389523,11.389523 0 0 0 -6.486328,-1.796875 z m 8.365234,3.2773439 -9.667969,6.445313 a 2.2779046,2.2779046 0 0 0 0,3.224609 2.2779046,2.2779046 0 0 0 3.222656,0 z m 1.492187,1.867188 -0.0098,0.01172 -1.402344,2.107422 a 9.1116182,9.1116182 0 0 1 -0.25,8.632813 H 10.089844 A 9.1116182,9.1116182 0 0 1 8.8925783,18.830078 C 8.1084503,18.487267 7.4072416,17.993284 6.8203125,17.386719 a 11.389523,11.389523 0 0 0 1.3105468,7.654297 2.2779046,2.2779046 0 0 0 1.9589847,1.138672 h 15.773437 a 2.2779046,2.2779046 0 0 0 1.982422,-1.138672 11.389523,11.389523 0 0 0 -0.308594,-11.890625 z");
      oa[0].id = oa[1].id = "efyt-speed-plus";
      oa[0].dataset.message = oa[1].dataset.message = "speed";
      oa[0].addEventListener("click", sc);
      oa[1].addEventListener("click", sc);
      oa[1].addEventListener("contextmenu", ba);
      k.appendChild(oa[0]);
      var ca = H("speed", "m 27.526463,13.161756 -1.400912,2.107062 a 9.1116182,9.1116182 0 0 1 -0.250569,8.633258 H 10.089103 A 9.1116182,9.1116182 0 0 1 22.059491,11.202758 L 24.166553,9.8018471 A 11.389523,11.389523 0 0 0 8.1301049,25.041029 2.2779046,2.2779046 0 0 0 10.089103,26.179981 H 25.863592 A 2.2779046,2.2779046 0 0 0 27.845369,25.041029 11.389523,11.389523 0 0 0 27.537852,13.150367 Z M 16.376119,20.95219 a 2.2779046,2.2779046 0 0 0 3.223235,0 l 6.446471,-9.669705 -9.669706,6.44647 a 2.2779046,2.2779046 0 0 0 0,3.223235 z");
      ca[0].id = ca[1].id = "efyt-speed";
      ca[0].dataset.message = ca[1].dataset.message = "speed";
      ca[0].addEventListener("click", tc);
      ca[1].addEventListener("click", tc);
      ca[0].addEventListener("wheel", uc, !0);
      ca[1].addEventListener("wheel", uc, !0);
      ca[0].addEventListener("contextmenu", Ab, !0);
      ca[1].addEventListener("contextmenu", Ab, !0);
      k.appendChild(ca[0]);
      var pa = H("speed-minus", "M 24.505859 8 C 21.820495 8 19.640625 10.17987 19.640625 12.865234 C 19.640625 15.550597 21.820495 17.730469 24.505859 17.730469 C 27.191222 17.730469 29.371094 15.550597 29.371094 12.865234 C 29.371094 10.17987 27.191222 8 24.505859 8 z M 18.320312 8.0058594 A 11.389523 11.389523 0 0 0 11.833984 9.8027344 L 13.941406 11.203125 A 9.1116182 9.1116182 0 0 1 18.539062 10.265625 C 18.881721 9.48098 19.375712 8.7787333 19.982422 8.1914062 A 11.389523 11.389523 0 0 0 18.320312 8.0058594 z M 9.9550781 11.283203 L 16.400391 20.953125 A 2.2779046 2.2779046 0 0 0 19.623047 20.953125 A 2.2779046 2.2779046 0 0 0 19.623047 17.728516 L 9.9550781 11.283203 z M 21.103516 12.185547 L 23.826172 12.185547 L 25.185547 12.185547 L 26.738281 12.185547 L 27.908203 12.185547 L 27.908203 13.544922 L 25.455078 13.544922 L 25.185547 13.544922 L 23.826172 13.544922 L 23.367188 13.544922 L 21.103516 13.544922 L 21.103516 12.185547 z M 8.4628906 13.150391 A 11.389523 11.389523 0 0 0 8.1542969 25.041016 A 2.2779046 2.2779046 0 0 0 10.136719 26.179688 L 25.910156 26.179688 A 2.2779046 2.2779046 0 0 0 27.869141 25.041016 A 11.389523 11.389523 0 0 0 29.179688 17.386719 C 28.592758 17.993284 27.89155 18.487267 27.107422 18.830078 A 9.1116182 9.1116182 0 0 1 25.910156 23.902344 L 10.125 23.902344 A 9.1116182 9.1116182 0 0 1 9.875 15.269531 L 8.4726562 13.162109 L 8.4628906 13.150391 z ");
      pa[0].id = pa[1].id = "efyt-speed-minus";
      pa[0].dataset.message = pa[1].dataset.message = "speed";
      pa[0].addEventListener("click", vc);
      pa[1].addEventListener("click", vc);
      pa[1].addEventListener("contextmenu", ba);
      k.appendChild(pa[0]);
      var ia = H("pop-up-player", "m 21.554375,7.9999999 h 2.02 V 10.02 h -2.02 z m 4.04,0 h 2.02 V 10.02 h -2.02 z M 5.394375,16.08 h 2.02 v 2.02 h -2.02 z m 0,-4.04 h 2.02 v 2.02 h -2.02 z m 0,8.08 h 2.02 v 2.02 h -2.02 z m 12.12,-12.1200001 h 2.02 V 10.02 h -2.02 z M 30.605625,26.18 H 9.434375 V 12.04 h 21.17125 z m -2.02,-12.12 h -17.13125 v 10.1 h 17.13125 z M 13.474375,7.9999999 h 2.02 V 10.02 h -2.02 z m -4.04,0 h 2.02 V 10.02 h -2.02 z m -4.04,0 h 2.02 V 10.02 h -2.02 z");
      ia[0].id = ia[1].id = "efyt-pop-up-player";
      ia[0].dataset.message = ia[1].dataset.message = "pop_up_player";
      ia[0].addEventListener("click", wc);
      ia[1].addEventListener("click", wc);
      ia[0].addEventListener("contextmenu", xc, !0);
      ia[1].addEventListener("contextmenu", xc, !0);
      k.appendChild(ia[0]);
      var Q = H("size", "M 5.390625,7.9999999 V 26.179687 h 25.21875 V 7.9999999 Z M 7.410156,10.009766 H 28.589844 V 24.169922 H 7.410156 Z m 4.040294,4.050342 h 3.029835 V 12.040219 H 9.430562 v 5.049722 h 2.019888 z m 15.118897,3.029833 h -2.019888 v 3.029834 h -3.029834 v 2.019889 h 5.049722 z");
      Q[0].id = Q[1].id = "efyt-size";
      Q[0].dataset.message = Q[1].dataset.message = "expand";
      Q[0].dataset.expand = Q[1].dataset.expand = "M 5.390625,7.9999999 V 26.179687 h 25.21875 V 7.9999999 Z M 7.410156,10.009766 H 28.589844 V 24.169922 H 7.410156 Z m 4.040294,4.050342 h 3.029835 V 12.040219 H 9.430562 v 5.049722 h 2.019888 z m 15.118897,3.029833 h -2.019888 v 3.029834 h -3.029834 v 2.019889 h 5.049722 z";
      Q[0].dataset.shrink = Q[1].dataset.shrink = "m 5.390625,8 v 18.179687 h 25.21875 V 8 Z m 2.019531,2.009765 H 28.589844 V 24.169922 H 7.410156 Z M 19.45325,22.331983 h 1.762511 V 19.688214 H 23.85953 V 17.925702 H 19.45325 Z M 14.784019,14.491472 H 12.14025 v 1.762512 h 4.406281 v -4.40628 h -1.762512 z m 0,5.196743 H 12.14025 v -1.762512 h 4.406281 v 4.40628 h -1.762512 z m 4.669231,-7.840512 h 1.762511 v 2.643769 h 2.643769 v 1.762512 h -4.40628 z";
      Q[0].addEventListener("click", yc);
      Q[1].addEventListener("click", yc);
      Q[0].addEventListener("contextmenu", Bb, !0);
      Q[1].addEventListener("contextmenu", Bb, !0);
      k.appendChild(Q[0]);
      var qa = H("cinema-mode", "m 8,8.1430084 c -1.375,0 -2.4882814,1.125 -2.4882812,2.4999996 L 5.5,23.679025 c 0,1.375 1.125,2.5 2.4999999,2.5 H 28 c 1.375,0 2.5,-1.125 2.5,-2.5 V 7.9999999 h -5 L 28,11.75 h -3.75 l -2.5,-3.7500001 h -2.5 L 21.75,11.75 H 18 L 15.5,7.9999999 H 13 L 15.5,11.75 H 11.75 L 9.2500001,8.1430084 Z M 7.7714843,14.017578 H 28.207031 v 9.856759 H 7.7714843 Z");
      qa[0].id = qa[1].id = "efyt-cinema-mode";
      qa[0].dataset.message = qa[1].dataset.message = "cinema_mode";
      qa[0].addEventListener("click", zc);
      qa[1].addEventListener("click", zc);
      qa[1].addEventListener("contextmenu", ba);
      k.appendChild(qa[0]);
      var W = H("cards-end-screens", b.hidecardsendscreens ? "m 16.333008,13.997071 -1.191407,1.201172 2.265625,2.265625 c -1.377916,1.082045 -2.470175,2.518256 -3.121094,4.183593 1.462453,3.711076 5.072089,6.339844 9.298829,6.339844 1.284929,0 2.511765,-0.251825 3.644531,-0.691406 l 0.691406,0.691406 1.19336,-1.193359 z m 7.251953,1.310547 c -1.073592,0 -2.104021,0.169644 -3.076172,0.482421 l 1.833984,1.833985 c 0.397314,-0.118349 0.81106,-0.203125 1.242188,-0.203125 2.333161,0 4.228515,1.893401 4.228515,4.226562 0,0.431127 -0.08478,0.845516 -0.203125,1.234375 l 2.585938,2.587891 c 1.175034,-1.039778 2.10421,-2.342265 2.6875,-3.830078 -1.462452,-3.702623 -5.072088,-6.332031 -9.298828,-6.332031 z m 0.279297,3.830078 2.232421,2.232422 c -0.126803,-1.183487 -1.057388,-2.105619 -2.232421,-2.232422 z m -4.091797,0.701172 1.328125,1.328125 c -0.02536,0.152163 -0.05078,0.311398 -0.05078,0.480468 0,1.403277 1.131879,2.53711 2.535157,2.53711 0.16907,0 0.321805,-0.02674 0.482421,-0.06055 l 1.328126,1.328125 c -0.549476,0.270511 -1.159629,0.421875 -1.810547,0.421875 -2.33316,0 -4.226563,-1.893403 -4.226563,-4.226563 0,-0.650919 0.152005,-1.267571 0.414063,-1.808593 z M 3.1162108,8.0126954 V 26.19043 H 12.522155 V 23.918946 H 5.3876952 V 10.28418 H 25.836914 v 2.857422 h 2.273437 V 8.0126954 Z" : 
      "m 23.585753,15.31167 c -4.224201,0 -7.831669,2.627453 -9.293243,6.336303 1.461574,3.708847 5.069042,6.3363 9.293243,6.3363 4.224201,0 7.831669,-2.627453 9.293242,-6.3363 -1.461573,-3.70885 -5.069041,-6.336303 -9.293242,-6.336303 z m 0,10.560503 c -2.331759,0 -4.224201,-1.892442 -4.224201,-4.2242 0,-2.331759 1.892442,-4.224202 4.224201,-4.224202 2.331758,0 4.224201,1.892443 4.224201,4.224202 0,2.331758 -1.892443,4.2242 -4.224201,4.2242 z m 0,-6.758721 c -1.402435,0 -2.534521,1.132087 -2.534521,2.534521 0,1.402434 1.132086,2.53452 2.534521,2.53452 1.402434,0 2.53452,-1.132086 2.53452,-2.53452 0,-1.402434 -1.132086,-2.534521 -2.53452,-2.534521 z M 7.5464614,12.108004 h 8.9170356 v 3.889561 H 7.5464614 Z M 12.520348,23.921535 H 5.3932636 V 10.287985 H 25.843588 v 2.855964 h 2.272258 V 8.0157271 H 3.1210054 V 26.193793 h 9.3993426 z m -0.66097,-3.803731 a 2.1564575,2.1564575 0 0 1 -2.1564585,2.156458 2.1564575,2.1564575 0 0 1 -2.1564581,-2.156458 2.1564575,2.1564575 0 0 1 2.1564581,-2.156458 2.1564575,2.1564575 0 0 1 2.1564585,2.156458 z");
      W[0].id = W[1].id = "efyt-cards-end-screens";
      W[0].dataset.message = W[1].dataset.message = "toggle_visibility";
      W[0].dataset.on = W[1].dataset.on = "m 23.585753,15.31167 c -4.224201,0 -7.831669,2.627453 -9.293243,6.336303 1.461574,3.708847 5.069042,6.3363 9.293243,6.3363 4.224201,0 7.831669,-2.627453 9.293242,-6.3363 -1.461573,-3.70885 -5.069041,-6.336303 -9.293242,-6.336303 z m 0,10.560503 c -2.331759,0 -4.224201,-1.892442 -4.224201,-4.2242 0,-2.331759 1.892442,-4.224202 4.224201,-4.224202 2.331758,0 4.224201,1.892443 4.224201,4.224202 0,2.331758 -1.892443,4.2242 -4.224201,4.2242 z m 0,-6.758721 c -1.402435,0 -2.534521,1.132087 -2.534521,2.534521 0,1.402434 1.132086,2.53452 2.534521,2.53452 1.402434,0 2.53452,-1.132086 2.53452,-2.53452 0,-1.402434 -1.132086,-2.534521 -2.53452,-2.534521 z M 7.5464614,12.108004 h 8.9170356 v 3.889561 H 7.5464614 Z M 12.520348,23.921535 H 5.3932636 V 10.287985 H 25.843588 v 2.855964 h 2.272258 V 8.0157271 H 3.1210054 V 26.193793 h 9.3993426 z m -0.66097,-3.803731 a 2.1564575,2.1564575 0 0 1 -2.1564585,2.156458 2.1564575,2.1564575 0 0 1 -2.1564581,-2.156458 2.1564575,2.1564575 0 0 1 2.1564581,-2.156458 2.1564575,2.1564575 0 0 1 2.1564585,2.156458 z";
      W[0].dataset.off = W[1].dataset.off = "m 16.333008,13.997071 -1.191407,1.201172 2.265625,2.265625 c -1.377916,1.082045 -2.470175,2.518256 -3.121094,4.183593 1.462453,3.711076 5.072089,6.339844 9.298829,6.339844 1.284929,0 2.511765,-0.251825 3.644531,-0.691406 l 0.691406,0.691406 1.19336,-1.193359 z m 7.251953,1.310547 c -1.073592,0 -2.104021,0.169644 -3.076172,0.482421 l 1.833984,1.833985 c 0.397314,-0.118349 0.81106,-0.203125 1.242188,-0.203125 2.333161,0 4.228515,1.893401 4.228515,4.226562 0,0.431127 -0.08478,0.845516 -0.203125,1.234375 l 2.585938,2.587891 c 1.175034,-1.039778 2.10421,-2.342265 2.6875,-3.830078 -1.462452,-3.702623 -5.072088,-6.332031 -9.298828,-6.332031 z m 0.279297,3.830078 2.232421,2.232422 c -0.126803,-1.183487 -1.057388,-2.105619 -2.232421,-2.232422 z m -4.091797,0.701172 1.328125,1.328125 c -0.02536,0.152163 -0.05078,0.311398 -0.05078,0.480468 0,1.403277 1.131879,2.53711 2.535157,2.53711 0.16907,0 0.321805,-0.02674 0.482421,-0.06055 l 1.328126,1.328125 c -0.549476,0.270511 -1.159629,0.421875 -1.810547,0.421875 -2.33316,0 -4.226563,-1.893403 -4.226563,-4.226563 0,-0.650919 0.152005,-1.267571 0.414063,-1.808593 z M 3.1162108,8.0126954 V 26.19043 H 12.522155 V 23.918946 H 5.3876952 V 10.28418 H 25.836914 v 2.857422 h 2.273437 V 8.0126954 Z";
      W[0].addEventListener("click", Ac);
      W[1].addEventListener("click", Ac);
      W[1].addEventListener("contextmenu", ba);
      k.appendChild(W[0]);
      var ra = H("not-interested", "M 16.180125,26.178066 V 23.905807 H 6.8638711 V 10.272258 H 27.314195 v 2.850303 h 2.272258 V 8.0000001 H 4.5916129 V 26.178066 Z M 25.05636,15.295943 c -3.506321,0 -6.35203,2.845709 -6.35203,6.352029 0,3.506319 2.845709,6.352027 6.35203,6.352027 3.506319,0 6.352026,-2.845708 6.352026,-6.352027 0,-3.50632 -2.845707,-6.352029 -6.352026,-6.352029 z m -5.081625,6.352029 c 0,-2.807597 2.274028,-5.081624 5.081625,-5.081624 1.175123,0 2.254969,0.400178 3.112495,1.073493 l -7.120625,7.120625 c -0.673316,-0.857524 -1.073494,-1.937369 -1.073495,-3.112494 z m 5.081625,5.081621 c -1.175126,0 -2.254972,-0.400176 -3.112496,-1.07349 l 7.120627,-7.120627 c 0.673313,0.857524 1.07349,1.93737 1.07349,3.112496 0,2.807597 -2.274026,5.081621 -5.081621,5.081621 z M 19.063879,15.034555 q 0,-0.244758 -0.17277,-0.374336 -0.17277,-0.132457 -0.621973,-0.276432 -0.449202,-0.146855 -0.711237,-0.28795 -0.714117,-0.385854 -0.714117,-1.039501 0,-0.339782 0.190046,-0.604696 0.192928,-0.267794 0.549986,-0.417528 0.359938,-0.149734 0.806261,-0.149734 0.449203,0 0.800503,0.164131 0.351298,0.161253 0.544226,0.457841 0.195806,0.29659 0.195806,0.673805 h -0.863851 q 0,-0.287951 -0.181409,-0.446324 -0.181408,-0.161252 -0.509672,-0.161252 -0.316746,0 -0.492395,0.135337 -0.17565,0.132457 -0.17565,0.351299 0,0.204445 0.204445,0.342661 0.207324,0.138216 0.607575,0.259155 0.737153,0.221723 1.074055,0.549986 0.336902,0.328263 0.336902,0.817779 0,0.544226 -0.411769,0.855213 -0.411769,0.308107 -1.108609,0.308107 -0.483757,0 -0.881128,-0.17565 -0.397372,-0.178529 -0.607576,-0.486637 -0.207324,-0.308107 -0.207324,-0.714117 h 0.86673 q 0,0.693961 0.829298,0.693961 0.308107,0 0.480877,-0.123818 0.17277,-0.126699 0.17277,-0.3513 z m -6.208675,1.09997 v -4.192558 h 1.290018 q 0.552865,0 0.98767,0.250518 0.437684,0.247636 0.682442,0.708357 0.244758,0.457842 0.244758,1.042381 v 0.192927 q 0,0.584539 -0.241878,1.0395 -0.238999,0.454963 -0.676683,0.705479 -0.437686,0.250517 -0.98767,0.253396 z m 0.863851,-3.492838 v 2.798878 h 0.417529 q 0.506792,0 0.774586,-0.331143 0.267794,-0.331143 0.273553,-0.947357 v -0.221721 q 0,-0.63925 -0.264915,-0.967514 -0.264913,-0.331143 -0.774586,-0.331143 z m -2.87072,2.628987 H 9.3337166 L 9.0457662,16.134525 H 8.1272044 l 1.5606912,-4.192558 h 0.8005014 l 1.56933,4.192558 h -0.918562 z m -1.2813786,-0.69972 h 1.0481386 l -0.526949,-1.569329 z");
      ra[0].id = ra[1].id = "efyt-not-interested";
      ra[0].dataset.message = ra[1].dataset.message = "remove_ads";
      ra[0].addEventListener("click", Ua);
      ra[1].addEventListener("click", Ua);
      ra[1].addEventListener("contextmenu", ba);
      k.appendChild(ra[0]);
      var J = "m 27.56842,14.925603 -6.879695,-0.593242 -2.688726,-6.334295 -2.688726,6.343863 -6.8796947,0.583674 5.2243577,4.525863 -1.569221,6.7266 5.913284,-3.569021 5.913284,3.569021 -1.559652,-6.7266 z m -9.568421,5.894147 -3.597726,2.172032 0.956842,-4.095284 -3.176716,-2.755706 4.190968,-0.3636 1.626632,-3.856073 1.6362,3.865642 4.190969,0.3636 -3.176716,2.755705 0.956842,4.095284 z", Bc = "add", Cc = "add_to_whitelist";
      -1 !== Ka.indexOf(L) && (J = "M 18,22.609045 23.913284,26.178066 22.344063,19.451465 27.56842,14.925603 20.688726,14.341929 18,7.998066 l -2.688727,6.343863 -6.8796943,0.583674 5.2243583,4.525862 -1.569221,6.726601 z", Bc = "remove", Cc = "remove_from_whitelist");
      J = H("whitelist", J);
      J[0].id = J[1].id = "efyt-whitelist";
      J[0].dataset.message = J[1].dataset.message = Cc;
      J[0].dataset.action = J[1].dataset.action = Bc;
      J[0].dataset.add = J[1].dataset.add = "m 27.56842,14.925603 -6.879695,-0.593242 -2.688726,-6.334295 -2.688726,6.343863 -6.8796947,0.583674 5.2243577,4.525863 -1.569221,6.7266 5.913284,-3.569021 5.913284,3.569021 -1.559652,-6.7266 z m -9.568421,5.894147 -3.597726,2.172032 0.956842,-4.095284 -3.176716,-2.755706 4.190968,-0.3636 1.626632,-3.856073 1.6362,3.865642 4.190969,0.3636 -3.176716,2.755705 0.956842,4.095284 z";
      J[0].dataset.remove = J[1].dataset.remove = "M 18,22.609045 23.913284,26.178066 22.344063,19.451465 27.56842,14.925603 20.688726,14.341929 18,7.998066 l -2.688727,6.343863 -6.8796943,0.583674 5.2243583,4.525862 -1.569221,6.726601 z";
      J[0].addEventListener("click", Dc);
      J[1].addEventListener("click", Dc);
      J[1].addEventListener("contextmenu", ba);
      k.appendChild(J[0]);
      1 >= k.querySelectorAll(".ytp-efyt-button:not(#efyt-controls-button):not([hidden])").length && (C.hidden = !0);
      k.classList.contains("visible") || k.querySelectorAll(".ytp-efyt-button").forEach(function(V) {
        V.tabIndex = -1;
      });
      d.appendChild(k);
      (C = g.querySelector(".ytp-right-controls")) && C.insertBefore(d, C.firstChild);
      p = c.createElement("div");
      p.className = "efyt-control-bar";
      p.style.display = "none";
      b.controlbar.autohide && "fixed" === b.controlbar.position && p.classList.add("auto-hide");
      b.controlbar.centered && p.classList.add("centered");
      p.appendChild(a[1]);
      p.appendChild(e[1]);
      p.appendChild(f[1]);
      p.appendChild(m[1]);
      p.appendChild(J[1]);
      p.appendChild(ra[1]);
      p.appendChild(W[1]);
      p.appendChild(qa[1]);
      p.appendChild(Q[1]);
      p.appendChild(ia[1]);
      p.appendChild(pa[1]);
      p.appendChild(ca[1]);
      p.appendChild(oa[1]);
      p.appendChild(ha[1]);
      p.appendChild(na[1]);
      p.appendChild(ma[1]);
      p.appendChild(la[1]);
      p.appendChild(M[1]);
      p.appendChild(N[1]);
      p.appendChild(h[1]);
      p.addEventListener("mouseenter", function(V) {
        V.preventDefault();
        V.stopPropagation();
      }, !0);
      p.addEventListener("mouseleave", function(V) {
        V.preventDefault();
        V.stopPropagation();
      }, !0);
      p.addEventListener("mousemove", function(V) {
        c.fullscreenElement || (V.preventDefault(), V.stopPropagation());
      }, !0);
      G = c.createElement("div");
      G.className = "efyt-control-bar-tooltip";
      p.appendChild(G);
      "fixed" === b.controlbar.position ? g.appendChild(p) : (b.controlbar.active && c.documentElement.classList.add("efyt-control-bar-position-absolute"), n.appendChild(p));
      setTimeout(function() {
        k.removeAttribute("style");
        p.removeAttribute("style");
      }, 1000);
    }
    function hc() {
      F ? F.hidden ? eb() : Cb() : (Ec(), eb());
      ta();
    }
    function ic(a) {
      a.preventDefault();
      a.stopPropagation();
      a = parseInt(g.getCurrentTime(), 10);
      F ? F.hidden ? eb(a) : Cb() : (Ec(), eb(a));
      ta();
      return !1;
    }
    function jc() {
      g.stopVideo();
      ja = !0;
    }
    function kc() {
      Db(!0, !1);
    }
    function lc(a) {
      a.preventDefault();
      a.stopPropagation();
      ja = !0;
      Db(!0, !0);
      return !1;
    }
    function mc() {
      if (l) {
        if (!Da) {
          var a = new (w.AudioContext || w.webkitAudioContext), d = a.createMediaElementSource(l);
          Da = a.createGain();
          d.connect(Da);
          Da.connect(a.destination);
        }
        this.classList.contains("active") ? Da.gain.value = 1 : Da.gain.value = b.volumemultiplier;
        n.querySelectorAll("button#efyt-volume-booster").forEach(function(e) {
          e.classList.contains("active") ? (e.classList.remove("active"), e.querySelector("path").setAttributeNS(null, "d", e.dataset.off)) : (e.classList.add("active"), e.querySelector("path").setAttributeNS(null, "d", e.dataset.on));
        });
      }
    }
    function vb() {
      n.querySelectorAll("button#efyt-whitelist").forEach(function(a) {
        -1 !== Ka.indexOf(L) && "add" === a.dataset.action ? (a.dataset.action = "remove", a.dataset.tooltip = y.remove_from_whitelist, a.querySelector("path").setAttributeNS(null, "d", a.dataset.remove)) : 0 > Ka.indexOf(L) && "remove" === a.dataset.action && (a.dataset.action = "add", a.dataset.tooltip = y.add_to_whitelist, a.querySelector("path").setAttributeNS(null, "d", a.dataset.add));
      });
    }
    function Dc() {
      if (B) {
        c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"whitelist", action:this.dataset.action, channel:L}}));
        var a = "add" === this.dataset.action ? y.remove_from_whitelist : y.add_to_whitelist;
        U.textContent = a;
        G.textContent = a;
        n.querySelectorAll("button#efyt-whitelist").forEach(function(d) {
          "add" === d.dataset.action ? (d.dataset.action = "remove", d.dataset.tooltip = y.remove_from_whitelist, d.querySelector("path").setAttributeNS(null, "d", d.dataset.remove)) : (d.dataset.action = "add", d.dataset.tooltip = y.add_to_whitelist, d.querySelector("path").setAttributeNS(null, "d", d.dataset.add));
        });
      }
    }
    function Ac() {
      var a = g.getAttribute("annotations-module");
      "1" === a ? (g.setAttribute("annotations-module", 0), this.querySelector("path").setAttributeNS(null, "d", this.dataset.off), g.unloadModule("annotations_module")) : (g.setAttribute("annotations-module", 1), this.querySelector("path").setAttributeNS(null, "d", this.dataset.on), g.loadModule("annotations_module"));
      n.querySelectorAll("button#efyt-cards-end-screens").forEach(function(d) {
        d.querySelector("path").setAttributeNS(null, "d", "1" === a ? d.dataset.off : d.dataset.on);
      });
    }
    function zc() {
      c.body.classList.contains("efyt-cinema-mode") ? Eb() : tb();
    }
    function yc() {
      c.body.classList.contains("efyt-wide-player") && c.body.classList.contains("efyt-mini-player") || (c.body.classList.contains("efyt-mini-player") && (c.body.classList.remove("efyt-mini-player"), w.scrollTo(0, 0)), da());
    }
    function Bb(a) {
      a.preventDefault();
      a.stopPropagation();
      a = c.querySelector("ytd-masthead");
      try {
        w.scrollTo(w.scrollX, n.getBoundingClientRect().top - (c.body.classList.contains("viewport") ? 0 : a ? a.clientHeight : 56) + w.scrollY);
      } catch (d) {
      }
      return !1;
    }
    function wc() {
      Fc(!1);
    }
    function xc(a) {
      a.preventDefault();
      a.stopPropagation();
      ja = !0;
      Fc(!0);
      return !1;
    }
    function vc() {
      fb({deltaY:b.reversemousewheeldirection ? -1 : 1, preventDefault:function() {
      }, stopPropagation:function() {
      }});
      U.textContent = `${y.speed} (${E}x)`;
      G.textContent = `${y.speed} (${E}x)`;
    }
    function tc(a) {
      Gc(a);
      U.textContent = `${y.speed} (${E}x)`;
      G.textContent = `${y.speed} (${E}x)`;
    }
    function uc(a) {
      fb(a);
      U.textContent = `${y.speed} (${E}x)`;
      G.textContent = `${y.speed} (${E}x)`;
    }
    function Ab(a) {
      a.preventDefault();
      a.stopPropagation();
      E = 1;
      try {
        b.overridespeeds ? l.playbackRate = 1 : g.setPlaybackRate(1), Y.textContent = "1x", gb(), U.textContent = `${y.speed} (1x)`, G.textContent = `${y.speed} (1x)`, g.efytPlaybackRate = 1;
      } catch (d) {
      }
    }
    function sc() {
      fb({deltaY:b.reversemousewheeldirection ? 1 : -1, preventDefault:function() {
      }, stopPropagation:function() {
      }});
      U.textContent = `${y.speed} (${E}x)`;
      G.textContent = `${y.speed} (${E}x)`;
    }
    function qc() {
      D ? (D.classList.remove("hidden"), D.hidden ? (D.hidden = !1, l.style.filter = b.filter, ta()) : (D.hidden = !0, l.style.filter = ""), this && !b.controlbar.active && this.focus()) : (dd(), ta());
    }
    function rc(a) {
      a.preventDefault();
      a.stopPropagation();
      D && D.classList.toggle("hidden");
    }
    function db() {
      g.classList.toggle(this.id);
    }
    function pc() {
      if (B && g && l) {
        var a = c.createElement("canvas"), d = a.getContext("2d"), e = l.clientWidth, f = l.clientHeight, h = function(m) {
          var k = Math.floor(m / 3600), C = Math.floor(m % 3600 / 60);
          m = Math.floor(m % 3600 % 60);
          return (0 < k ? k + "h" : "") + (0 < C ? (0 < k && 10 > C ? "0" : "") + C + "m" : 0 < k && 0 === C ? "00m" : "0m") + (10 > m ? "0" : "") + m + "s";
        }(parseInt(g.getCurrentTime(), 10));
        a.width = e;
        a.height = f;
        d.drawImage(l, 0, 0, e, f);
        a.toBlob(function(m) {
          var k = g.getVideoData(), C = k.author.replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, " ").trim(), N = k.title.replace(/[\\/:*?"<>|]+/g, "").replace(/\s+/g, " ").trim();
          k = k.video_id;
          var M = c.createElement("a");
          M.href = URL.createObjectURL(m);
          M.download = `${C} - ${N} [${k} - ${e}x${f} - ${h}].png`;
          M.click();
          URL.revokeObjectURL(M.href);
        });
      }
    }
    function oc() {
      c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"custom-script"}}));
    }
    function nc() {
      c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"options-page"}}));
    }
    function ba(a) {
      a.preventDefault();
      a.stopPropagation();
      return !1;
    }
    function ed(a) {
      clearTimeout(hb);
      b[a.name] = Number(a.value);
      a.nextElementSibling.textContent = b[a.name];
      a = [];
      0 < b.blur && a.push("blur(" + b.blur + "px)");
      100 !== b.brightness && a.push("brightness(" + b.brightness + "%)");
      100 !== b.contrast && a.push("contrast(" + b.contrast + "%)");
      0 < b.grayscale && a.push("grayscale(" + b.grayscale + "%)");
      0 < b.huerotate && a.push("hue-rotate(" + b.huerotate + "deg)");
      0 < b.invert && a.push("invert(" + b.invert + "%)");
      100 !== b.saturate && a.push("saturate(" + b.saturate + "%)");
      0 < b.sepia && a.push("sepia(" + b.sepia + "%)");
      b.filter = 0 < a.length ? a.join(" ") : "none";
      l.style.filter = b.filter;
      hb = setTimeout(function() {
        c.dispatchEvent(new CustomEvent("efyt-save-video-filters", {detail:{filter:b.filter}}));
      }, 500);
    }
    function ua(a, d, e, f, h, m, k) {
      var C = c.createElement("label");
      C.setAttribute("for", d);
      C.dataset.message = a;
      C.textContent = y[a];
      a = c.createElement("input");
      a.type = "range";
      a.id = a.name = d;
      a.min = e;
      a.max = f;
      a.step = h;
      a.dataset.default = m;
      a.value = k;
      a.addEventListener("input", function() {
        this.style.background = "linear-gradient(to right,var(--main-color,#f00)0%,var(--main-color,#f00)" + 100 / this.max * this.value + "%,#fff " + 100 / this.max * this.value + "%,#fff 100%)";
        ed(this);
      });
      a.style.background = "linear-gradient(to right,var(--main-color,#f00)0%,var(--main-color,#f00)" + 100 / f * k + "%,#fff " + 100 / f * k + "%,#fff 100%)";
      d = c.createElement("span");
      d.textContent = k;
      k = c.createElement("div");
      k.className = "efyt-video-filter";
      k.appendChild(C);
      k.appendChild(a);
      k.appendChild(d);
      return k;
    }
    function dd() {
      D = c.createElement("div");
      D.id = "efyt-video-filters-panel";
      D.hidden = !1;
      D.addEventListener("mousemove", ta);
      var a = ua("gaussian_blur", "blur", 0, 50, 1, 0, b.blur);
      D.appendChild(a);
      a = ua("brightness", "brightness", 0, 200, 1, 100, b.brightness);
      D.appendChild(a);
      a = ua("contrast", "contrast", 0, 200, 1, 100, b.contrast);
      D.appendChild(a);
      a = ua("grayscale", "grayscale", 0, 100, 1, 0, b.grayscale);
      D.appendChild(a);
      a = ua("hue_rotation", "huerotate", 0, 360, 1, 0, b.huerotate);
      D.appendChild(a);
      a = ua("color_inversion", "invert", 0, 100, 1, 0, b.invert);
      D.appendChild(a);
      a = ua("saturation", "saturate", 0, 200, 1, 100, b.saturate);
      D.appendChild(a);
      a = ua("sepia", "sepia", 0, 100, 1, 0, b.sepia);
      D.appendChild(a);
      a = c.createElement("button");
      a.dataset.message = "reset";
      a.textContent = y.reset;
      a.addEventListener("click", function(d) {
        d.preventDefault();
        "#blur #brightness #contrast #grayscale #huerotate #invert #saturate #sepia".split(" ").forEach(function(e) {
          e = D.querySelector(e);
          e.value = e.dataset.default;
          e.dispatchEvent(new Event("input"));
        });
      });
      D.appendChild(a);
      (a = g.querySelector(".ytp-chrome-top")) && a.appendChild(D);
      l.style.filter = b.filter;
    }
    function Xa() {
      c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"keyboard-shortcuts"}}));
    }
    function ta() {
      try {
        g.wakeUpControls();
      } catch (a) {
      }
    }
    function Hc() {
      Ya || g.classList.contains("ad-interrupting") || !(l.currentTime >= Fb - 0.2 || l.currentTime < Oa) || g.seekTo(Oa);
    }
    function ib(a) {
      return {h:Math.floor(a / 3600), m:Math.floor(a % 3600 / 60), s:Math.floor(a % 3600 % 60)};
    }
    function Gb() {
      "start-hours" === this.name ? u.value == q.value && 0 == v.value && 0 == A.value ? (u.value = Number(q.value) - 1, r.value = 59, z.value = 59) : (r.value = 0, z.value = 0) : "start-minutes" === this.name ? (-1 == r.value ? 0 < u.value ? (u.value = Number(u.value) - 1, r.value = 59) : (u.value = 0, r.value = 0) : 60 == r.value && (u.value < q.value ? (u.value = Number(u.value) + 1, r.value = 0) : u.value = q.value), z.value = 0, r.value == v.value && 0 == A.value && (r.value = Number(r.value) - 
      1, z.value = 59)) : "start-seconds" === this.name && (-1 == z.value ? 0 < r.value ? (r.value = Number(r.value) - 1, z.value = 59) : 0 == r.value && 0 < u.value ? (u.value = Number(u.value) - 1, r.value = 59, z.value = 59) : z.value = 0 : 60 == z.value && (59 == r.value ? (u.value = Number(u.value) + 1, u.value > q.value ? (u.value = q.value, r.value = 59, z.value = 59) : (r.value = 0, z.value = 0)) : u.value == q.value && r.value == v.value ? z.value = 59 : (r.value = Number(r.value) + 1, z.value = 
      0)));
      Oa = 3600 * u.value + 60 * r.value + Number(z.value);
      Hb();
      ta();
      Ya || g.seekTo(Oa);
    }
    function Ib() {
      var a = ib(jb);
      "end-hours" === this.name ? q.value == u.value ? (v.value = r.value, A.value = Number(z.value) + 1) : (v.value = 0, A.value = 0) : "end-minutes" === this.name ? (-1 == v.value ? 0 < q.value ? (q.value = Number(q.value) - 1, v.value = 59) : (q.value = 0, v.value = 0) : 60 == v.value && (q.value = q.value < a.h ? Number(q.value) + 1 : a.h, v.value = 0), q.value == u.value && v.value == r.value ? (A.value = Number(z.value) + 1, 60 == A.value && (z.value = 58, A.value = 59)) : A.value = 0) : "end-seconds" === 
      this.name && (-1 == A.value ? 0 < v.value ? (v.value = Number(v.value) - 1, A.value = 59) : 0 == v.value && 0 < q.value && q.value > u.value ? (q.value = Number(q.value) - 1, v.value = 59, A.value = 59) : A.value = 0 : 60 == A.value && (59 == v.value ? (q.value = Number(q.value) + 1, q.value > a.h ? (q.value = a.h, v.value = 59, A.value = 59) : (v.value = 0, A.value = 0)) : q.value == a.h && v.value == a.m ? A.value = 59 : (v.value = Number(v.value) + 1, A.value = 0)));
      Fb = 3600 * q.value + 60 * v.value + Number(A.value);
      Hb();
      ta();
    }
    function Hb() {
      var a = ib(jb);
      u.max = q.value;
      r.min = 0 < u.value ? -1 : 0;
      r.max = 0 == a.h && Number(r.value) + 1 == v.value && 59 == z.value && 0 == A.value ? r.value : u.value == q.value ? v.value : Number(u.value) + 1 == q.value && 0 == v.value && 0 == A.value ? 59 : 60;
      z.min = 0 == u.value && 0 == r.value ? 0 : -1;
      z.max = 0 != a.h && u.value != q.value || Number(r.value) + 1 != v.value || 59 != z.value || 0 != A.value ? Number(u.value) + 1 == q.value && 59 == r.value && 0 == v.value && 59 == z.value && 0 == A.value ? 59 : u.value == q.value && r.value == v.value ? Number(A.value) - 1 : 60 : 59;
      q.min = Number(u.value) + 1 == q.value && 59 == r.value && 59 == z.value ? q.value : u.value;
      q.max = a.h;
      v.min = 0 == a.h && Number(r.value) + 1 == v.value && 59 == z.value && 0 == A.value ? v.value : 59 == r.value ? 0 : u.value == q.value && r.value == v.value ? r.value : -1;
      v.max = q.value == a.h ? a.m : 60;
      A.min = 59 == z.value ? 0 : u.value == q.value && r.value == v.value ? Number(z.value) + 1 : -1;
      A.max = q.value == a.h && v.value == a.m ? a.s : 60;
    }
    function Cb() {
      l && (l.loop = !1, l.removeEventListener("timeupdate", Hc), F.hidden = !0);
    }
    function eb(a) {
      if (l) {
        jb = Fb = parseInt(g.getDuration(), 10);
        Oa = 0;
        var d = ib(jb);
        a ? (a = ib(a), u.value = a.h, r.value = a.m, z.value = a.s, Oa = 3600 * a.h + 60 * a.m + a.s) : (u.value = 0, r.value = 0, z.value = 0);
        q.value = d.h;
        v.value = d.m;
        A.value = d.s;
        Hb();
        0 === d.h ? (u.parentNode.hidden = q.parentNode.hidden = !0, 0 === d.m && (r.parentNode.hidden = v.parentNode.hidden = !0)) : (u.parentNode.removeAttribute("hidden"), q.parentNode.removeAttribute("hidden"), 0 < d.m && (r.parentNode.removeAttribute("hidden"), v.parentNode.removeAttribute("hidden")));
        l.addEventListener("timeupdate", Hc);
        F.hidden = !1;
        g.classList.contains("ad-interrupting") || (l.loop = !0);
        Ya = !1;
        F.querySelector(".toggle-checkbox").setAttribute("aria-checked", "true");
      }
    }
    function Ec() {
      F = c.createElement("div");
      F.id = "efyt-loop-panel";
      F.hidden = !0;
      F.addEventListener("mousemove", ta);
      var a = c.createElement("div"), d = c.createElement("span");
      d.dataset.message = "loop_start";
      d.textContent = y.loop_start;
      a.appendChild(d);
      d = c.createElement("label");
      d.className = "hours";
      u = c.createElement("input");
      u.type = "number";
      u.name = "start-hours";
      u.min = 0;
      u.addEventListener("input", Gb);
      u.addEventListener("focus", function(e) {
        this.select();
      });
      u.addEventListener("keydown", function(e) {
        e.stopPropagation();
      }, !0);
      d.appendChild(u);
      a.appendChild(d);
      d = c.createElement("label");
      d.className = "minutes";
      r = c.createElement("input");
      r.type = "number";
      r.name = "start-minutes";
      r.addEventListener("input", Gb);
      r.addEventListener("focus", function(e) {
        this.select();
      });
      r.addEventListener("keydown", function(e) {
        e.stopPropagation();
      }, !0);
      d.appendChild(r);
      a.appendChild(d);
      d = c.createElement("label");
      d.className = "seconds";
      z = c.createElement("input");
      z.type = "number";
      z.name = "start-seconds";
      z.addEventListener("input", Gb);
      z.addEventListener("focus", function(e) {
        this.select();
      });
      z.addEventListener("keydown", function(e) {
        e.stopPropagation();
      }, !0);
      d.appendChild(z);
      a.appendChild(d);
      F.appendChild(a);
      a = c.createElement("div");
      d = c.createElement("span");
      d.dataset.message = "loop_end";
      d.textContent = y.loop_end;
      a.appendChild(d);
      d = c.createElement("label");
      d.className = "hours";
      q = c.createElement("input");
      q.type = "number";
      q.name = "end-hours";
      q.addEventListener("input", Ib);
      q.addEventListener("focus", function(e) {
        this.select();
      });
      q.addEventListener("keydown", function(e) {
        e.stopPropagation();
      }, !0);
      d.appendChild(q);
      a.appendChild(d);
      d = c.createElement("label");
      d.className = "minutes";
      v = c.createElement("input");
      v.type = "number";
      v.name = "end-minutes";
      v.addEventListener("input", Ib);
      v.addEventListener("focus", function(e) {
        this.select();
      });
      v.addEventListener("keydown", function(e) {
        e.stopPropagation();
      }, !0);
      d.appendChild(v);
      a.appendChild(d);
      d = c.createElement("label");
      d.className = "seconds";
      A = c.createElement("input");
      A.type = "number";
      A.name = "end-seconds";
      A.addEventListener("input", Ib);
      A.addEventListener("focus", function(e) {
        this.select();
      });
      A.addEventListener("keydown", function(e) {
        e.stopPropagation();
      }, !0);
      d.appendChild(A);
      a.appendChild(d);
      F.appendChild(a);
      a = c.createElement("div");
      a.className = "toggle-checkbox";
      a.setAttribute("aria-checked", "true");
      a.addEventListener("click", function() {
        "true" === this.getAttribute("aria-checked") ? (Ya = !0, l.loop = !1, this.setAttribute("aria-checked", "false")) : (Ya = !1, l.loop = !0, this.setAttribute("aria-checked", "true"));
      });
      F.appendChild(a);
      (a = g.querySelector(".ytp-chrome-bottom .ytp-progress-bar-container")) && a.insertBefore(F, a.firstChild);
    }
    function Fc(a) {
      try {
        if (g.getPlaylist() && c.querySelector("ytd-playlist-panel-renderer.ytd-watch-flexy:not([hidden])")) {
          Db(!1, a);
        } else {
          g.pauseVideo();
          var d = g.getVideoData().video_id + "?autoplay=1", e = g.getCurrentTime();
          e && (d += "&start=" + parseInt(e, 10));
          c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"pop-up-player", params:d, playlist:!1}}));
          a && g.stopVideo();
        }
      } catch (f) {
      }
    }
    function Db(a, d) {
      try {
        g.pauseVideo();
        var e = g.getPlaylist();
        a && e.reverse();
        c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"pop-up-player", params:{videos:e, index:e.indexOf(g.getVideoData().video_id), start:parseInt(g.getCurrentTime(), 10)}, playlist:!0}}));
        d && g.stopVideo();
      } catch (f) {
      }
    }
    function Xb(a) {
      if (!g.classList.contains("ytp-settings-shown") && !g.classList.contains("ytp-menu-shown") && "INPUT" !== a.target.nodeName) {
        if (a.ctrlKey && b.controlspeed && (!b.controlspeedmousebutton || La) && "BUTTON" !== a.target.nodeName) {
          fb(a);
        } else {
          if (!(a.ctrlKey || !b.controlvolume || b.controlvolumemousebutton && !La || B && b.controlbar.active && ("BUTTON" === a.target.nodeName && a.target.parentNode.classList.contains("efyt-control-bar") || "svg" === a.target.nodeName && a.target.parentNode.parentNode.classList.contains("efyt-control-bar") || "path" === a.target.nodeName && a.target.parentNode.parentNode.parentNode.classList.contains("efyt-control-bar")))) {
            a.preventDefault();
            try {
              var d = g.getVolume();
              !b.reversemousewheeldirection && 0 < a.deltaY || b.reversemousewheeldirection && 0 > a.deltaY ? (d -= b.volumevariation, 0 > d && (d = 0)) : (d += b.volumevariation, 100 < d && (d = 100), g.isMuted() && g.unMute());
              xa = !0;
              g.setVolume(d);
              Y.textContent = d;
              gb();
              b.defaultvolume && (b.volume = d);
              var e = Date.now();
              a = e + 2592000000;
              localStorage["yt-player-volume"] = sessionStorage["yt-player-volume"] = JSON.stringify({data:JSON.stringify({volume:d, muted:!1}), creation:e, expiration:a});
            } catch (f) {
            }
          }
        }
      }
    }
    function fb(a) {
      a.preventDefault();
      a.stopPropagation();
      try {
        if (b.overridespeeds) {
          var d = l.playbackRate;
          if (!b.reversemousewheeldirection && 0 < a.deltaY || b.reversemousewheeldirection && 0 > a.deltaY) {
            d = parseFloat((d - b.speedvariation).toFixed(2)), 0 >= d && (d = b.speedvariation), l.playbackRate = d;
          } else {
            if (!b.reversemousewheeldirection && 0 > a.deltaY || b.reversemousewheeldirection && 0 < a.deltaY) {
              d = parseFloat((d + b.speedvariation).toFixed(2)), l.playbackRate = d;
            }
          }
        } else {
          var e = g.getAvailablePlaybackRates();
          d = g.getPlaybackRate();
          var f = e.indexOf(d);
          (!b.reversemousewheeldirection && 0 < a.deltaY || b.reversemousewheeldirection && 0 > a.deltaY) && 0 < f ? (d = e[f - 1], g.setPlaybackRate(d)) : (!b.reversemousewheeldirection && 0 > a.deltaY || b.reversemousewheeldirection && 0 < a.deltaY) && f < e.length - 1 && (d = e[f + 1], g.setPlaybackRate(d));
        }
        E = d;
        ya = !0;
        Y.textContent = d + "x";
        gb();
        g.efytPlaybackRate = d;
      } catch (h) {
      }
      za();
    }
    function fc() {
      try {
        Z.max = l.duration, Z.value = l.currentTime;
      } catch (a) {
      }
    }
    function gb() {
      if (!sa) {
        var a = c.documentElement.querySelector(":scope > div");
        if (a) {
          if ("detach-button-host" === a.id) {
            sa = a;
          } else {
            let d;
            if (null == (d = a.shadowRoot) ? 0 : d.querySelector(".vivaldi-picture-in-picture-container")) {
              sa = a, a.classList.add("vivaldi-pip-btn");
            }
          }
        }
      }
      sa && !g.classList.contains("ytp-fullscreen") && (sa.style.display = "none");
      Y.style.display = "block";
      clearTimeout(Ic);
      Ic = setTimeout(function() {
        Y.style.display = "none";
        sa && !g.classList.contains("ytp-fullscreen") && (sa.style.display = "");
      }, 1500);
    }
    function Gc(a) {
      a.preventDefault();
      E = b.speed;
      try {
        b.overridespeeds ? l.playbackRate = E : g.setPlaybackRate(E), Y.textContent = E + "x", gb(), g.efytPlaybackRate = E;
      } catch (d) {
      }
      za();
    }
    function Jc(a) {
      ea = !0;
      va = !1;
      c.removeEventListener("keydown", Jc, !0);
    }
    function Jb(a) {
      27 === a.keyCode && g && !g.classList.contains("ytp-fullscreen") && !g.classList.contains("ytp-settings-shown") && R && (a = c.querySelector(".ytp-popup.ytp-contextmenu"), a && 0 < a.getBoundingClientRect().height || (c.removeEventListener("keydown", Jb), R.click()));
    }
    function ac() {
      c.body.classList.contains("efyt-wide-player") && kb();
      setTimeout(Ta, 500);
    }
    function bc(a) {
      a.ctrlKey && a.shiftKey ? Ab(a) : a.ctrlKey && Gc(a);
    }
    function kb() {
      c.body.classList.remove("efyt-wide-player", "viewport", "_viewport_");
      n && n.querySelectorAll("button#efyt-size").forEach(function(a) {
        a.querySelector("path").setAttributeNS(null, "d", a.dataset.expand);
        a.dataset.tooltip = y.expand;
      });
      U.textContent = y.expand;
      G.textContent = y.expand;
    }
    function da(a) {
      if (t && g && !c.body.classList.contains("no-scroll") && !t.hasAttribute("fullscreen") && !c.documentElement.hasAttribute("fullscreen") && !c.documentElement.hasAttribute("hide-scrollbar") && (!ka || ka.hasAttribute("hidden") && ka.clientHeight !== g.clientHeight)) {
        try {
          var d = c.body.classList.contains("efyt-wide-player");
          if ("large" === a || !a && !d) {
            Kb = t.theater && !d;
            var e = g.getVideoAspectRatio();
            e !== T && (T = e, Ca = Aa = Ba = !1);
            Ca || Ma();
            t.theater || t.theaterModeChanged_(!0);
            c.body.classList.add("efyt-wide-player");
            b.wideplayerviewport && Va && (c.body.classList.contains("efyt-cinema-mode") ? c.body.classList.add("_viewport_") : (c.body.classList.add("viewport"), setTimeout(function() {
              var f = X.querySelector("ytd-masthead");
              w.scrollTo(w.scrollX, (0 < g.getBoundingClientRect().top ? g.getBoundingClientRect().top : f ? f.clientHeight : 56) + w.scrollY);
            }, 0 < c.location.href.indexOf("list=") ? 1000 : 100)));
            Kb || b.theatermode || setTimeout(function() {
              c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"set-cookie", url:c.location.href, name:"wide", value:"0"}}));
            }, 500);
            n.querySelectorAll("button#efyt-size").forEach(function(f) {
              f.querySelector("path").setAttributeNS(null, "d", f.dataset.shrink);
              f.dataset.tooltip = y.shrink;
            });
            U.textContent = y.shrink;
            G.textContent = y.shrink;
          } else {
            if ("default" === a || !a && d) {
              Kb || (t.theaterModeChanged_(!1), setTimeout(Ta, 500)), kb();
            }
          }
          cb();
          Y && (Y.style.display = "none");
        } catch (f) {
        }
        w.dispatchEvent(new Event("resize"));
      }
    }
    function Ta() {
      b.theatermode && c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"set-cookie", url:c.location.href, name:"wide", value:"1"}}));
    }
    function Ia() {
      try {
        var a = g.getAvailableQualityLevels(), d = bb() ? b.qualityplaylists : b.qualityvideos;
        c.fullscreenElement && b.selectqualityfullscreenon && (d = bb() ? b.qualityplaylistsfullscreen : b.qualityvideosfullscreen);
        0 <= a.indexOf(d) ? g.setPlaybackQualityRange(d, d) : g.setPlaybackQualityRange(a[0], a[0]);
        Sa = !0;
      } catch (e) {
      }
    }
    function Kc() {
      var a = c.querySelector(".ytp-popup.ytp-contextmenu");
      a && 0 < a.getBoundingClientRect().height && (a.style.display = "none");
      c.body.classList.remove("ytp-contextmenu-hidden");
    }
    function Sb(a) {
      ea = !0;
      va = !1;
      2 === a.button && (b.controlvolumemousebutton || b.controlspeedmousebutton) && (La = !0, c.body.classList.add("ytp-contextmenu-hidden"));
    }
    function Tb(a) {
      ea = !0;
      va = !1;
      2 === a.button && (b.controlvolumemousebutton || b.controlspeedmousebutton) && (La = !1, xa || ya ? setTimeout(Kc, 500) : c.body.classList.remove("ytp-contextmenu-hidden"));
    }
    function Ub(a) {
      ea = !0;
      va = !1;
      2 === a.button && (b.controlvolumemousebutton || b.controlspeedmousebutton) && (La = !1, xa || ya ? (lb = !0, setTimeout(Kc, 500)) : (lb = !1, c.body.classList.remove("ytp-contextmenu-hidden")), xa = ya = !1);
    }
    function Vb(a) {
      if (b.controlvolumemousebutton && xa || b.controlspeedmousebutton && ya) {
        return a.stopPropagation(), a.preventDefault(), xa = ya = !1;
      }
    }
    function Wb(a) {
      if ((b.controlvolumemousebutton || b.controlspeedmousebutton) && lb) {
        return a.preventDefault(), lb = !1;
      }
    }
    function Eb() {
      c.body.classList.contains("no-scroll") || t && t.hasAttribute("fullscreen") || c.documentElement.hasAttribute("hide-scrollbar") || c.documentElement.hasAttribute("fullscreen") || (c.removeEventListener("keydown", Jb), c.body.classList.remove("efyt-cinema-mode"), !b.wideplayer && b.cinemamodewideplayer && c.body.classList.contains("efyt-wide-player") ? da("default") : c.body.classList.contains("_viewport_") && (c.body.classList.remove("_viewport_"), b.wideplayerviewport && Va && c.body.classList.contains("efyt-wide-player") && 
      (c.body.classList.add("viewport"), g && w.scrollTo(w.scrollX, g.getBoundingClientRect().top + w.scrollY))));
    }
    function tb() {
      c.body.classList.contains("no-scroll") || t && t.hasAttribute("fullscreen") || c.documentElement.hasAttribute("hide-scrollbar") || c.documentElement.hasAttribute("fullscreen") || (c.body.classList.remove("efyt-mini-player"), c.body.classList.contains("viewport") && (c.body.classList.remove("viewport"), c.body.classList.add("_viewport_")), w.scrollTo(0, 0), R.classList.remove("no-transition"), R.addEventListener("transitionend", function d() {
        R.removeEventListener("transitionend", d);
        R.classList.add("no-transition");
      }), c.body.classList.add("efyt-cinema-mode"), c.addEventListener("keydown", Jb), b.cinemamodewideplayer && da("large"));
    }
    function cc(a) {
      var d = g.querySelector(".ytp-autonav-toggle-button");
      d && (a && "true" === d.getAttribute("aria-checked") || !a && "false" === d.getAttribute("aria-checked")) && d.click();
    }
    function Lc(a) {
      var d = a.querySelector("yt-sort-filter-sub-menu-renderer a.yt-dropdown-menu:last-of-type");
      !d || d.hasAttribute("efyt") || d.hasAttribute("aria-selected") && "false" !== d.getAttribute("aria-selected") ? d || setTimeout(Lc, 1000, a) : (d.setAttribute("efyt", ""), d.click());
    }
    function fd() {
      try {
        for (var a = P.querySelectorAll('#contents #content-text a.yt-simple-endpoint[href*="v=' + g.getVideoData().video_id + '"][href*="&t="]:not([efyt])'), d = 0; d < a.length; d++) {
          a[d].setAttribute("efyt", ""), a[d].addEventListener("click", gd, !0);
        }
      } catch (e) {
      }
    }
    function gd(a) {
      c.body.classList.contains("efyt-mini-player") && (a.preventDefault(), a.stopPropagation(), g.seekTo(parseInt(this.href.match(/&t=(\d+)s?/)[1], 10)));
    }
    function K() {
      localStorage.setItem("enhancer-for-youtube", JSON.stringify({blockads:b.blockads, blockadsexceptforsubs:b.blockadsexceptforsubs, blockautoplay:b.blockautoplay, blockhfrformats:b.blockhfrformats, blockwebmformats:b.blockwebmformats, controlspeed:b.controlspeed, controlspeedmousebutton:b.controlspeedmousebutton, controlvolume:b.controlvolume, controlvolumemousebutton:b.controlvolumemousebutton, customcolors:b.customcolors, customcssrules:b.customcssrules, customtheme:b.customtheme, darktheme:b.darktheme, 
      defaultvolume:b.defaultvolume, disableautoplay:b.disableautoplay, hidecardsendscreens:b.hidecardsendscreens, hidechat:b.hidechat, hidecomments:b.hidecomments, hiderelated:b.hiderelated, ignoreplaylists:b.ignoreplaylists, ignorepopupplayer:b.ignorepopupplayer, overridespeeds:b.overridespeeds, pauseforegroundtab:b.pauseforegroundtab, pausevideos:b.pausevideos, qualityembeds:b.qualityembeds, qualityembedsfullscreen:b.qualityembedsfullscreen, qualityplaylists:b.qualityplaylists, qualityvideos:b.qualityvideos, 
      reversemousewheeldirection:b.reversemousewheeldirection, selectquality:b.selectquality, selectqualityfullscreenoff:b.selectqualityfullscreenoff, selectqualityfullscreenon:b.selectqualityfullscreenon, speed:b.speed, speedvariation:b.speedvariation, stopvideos:b.stopvideos, theme:b.theme, themevariant:b.themevariant, volume:b.volume, volumevariation:b.volumevariation, whitelist:b.whitelist}));
      c.dispatchEvent(new Event("efyt-local-storage-changed"));
    }
    function Lb(a) {
      var d = !1, e = "";
      try {
        if (-1 !== Ka.indexOf(a.videoDetails.author)) {
          return d = !0, ja = !1, a;
        }
        e = a.playbackTracking.videostatsPlaybackUrl.baseUrl;
      } catch (f) {
      }
      d || b.blockadsexceptforsubs && /subscribed=1/.test(e) || (delete a.playerAds, delete a.adPlacements);
      return a;
    }
    function yb(a) {
      clearTimeout(hb);
      hb = setTimeout(Ma, 500);
    }
    function Pa() {
      var a = [], d;
      for ([d, f] of Object.entries(b.customcolors)) {
        if ("--shadow" === d) {
          var e = f.replace("#", "");
          var f = parseInt(e.substring(0, 2), 16);
          var h = parseInt(e.substring(2, 4), 16);
          e = parseInt(e.substring(4, 6), 16);
          f = `0 1px .5px rgba(${f}, ${h}, ${e}, .2)`;
        }
        a.push(d + ":" + f);
      }
      return ":root{" + a.join(";") + "}";
    }
    function mb() {
      if (wa) {
        var a = !1;
        c.body.classList.add("efyt-topbar-menu-hidden");
        var d = c.querySelector("#avatar-btn.ytd-topbar-menu-button-renderer");
        d ? (d.click(), a = !0) : c.querySelectorAll("ytd-topbar-menu-button-renderer").forEach(function(e) {
          let f, h;
          "MORE_VERT" === (null == e ? void 0 : null == (f = e.data) ? void 0 : null == (h = f.icon) ? void 0 : h.iconType) && (e.click(), a = !0);
        });
        setTimeout(function() {
          a ? (wa = !1, c.body.classList.remove("efyt-topbar-menu-hidden")) : mb();
        }, 2000);
      } else {
        c.body.classList.remove("efyt-topbar-menu-hidden");
      }
    }
    function hd() {
      var a = !1;
      c.querySelectorAll('ytd-compact-link-renderer[compact-link-style="compact-link-style-type-selection-menu"]').forEach(function(d) {
        let e, f, h, m, k;
        "TOGGLE_DARK_THEME_DEVICE" === (null == d ? void 0 : null == (e = d.data) ? void 0 : null == (f = e.serviceEndpoint) ? void 0 : null == (h = f.signalServiceEndpoint) ? void 0 : null == (m = h.actions[0]) ? void 0 : null == (k = m.signalAction) ? void 0 : k.signal) && (d.click(), a = !0);
      });
      a || (wa = "TOGGLE_DARK_THEME_DEVICE", mb());
    }
    function Za() {
      var a = !1;
      c.querySelectorAll('ytd-compact-link-renderer[compact-link-style="compact-link-style-type-selection-menu"]').forEach(function(d) {
        let e, f, h, m, k;
        "TOGGLE_DARK_THEME_ON" === (null == d ? void 0 : null == (e = d.data) ? void 0 : null == (f = e.serviceEndpoint) ? void 0 : null == (h = f.signalServiceEndpoint) ? void 0 : null == (m = h.actions[0]) ? void 0 : null == (k = m.signalAction) ? void 0 : k.signal) && (d.click(), a = !0);
      });
      a || (wa = "TOGGLE_DARK_THEME_ON", mb());
    }
    function Mc() {
      var a = !1;
      c.querySelectorAll('ytd-compact-link-renderer[compact-link-style="compact-link-style-type-selection-menu"]').forEach(function(d) {
        let e, f, h, m, k;
        "TOGGLE_DARK_THEME_OFF" === (null == d ? void 0 : null == (e = d.data) ? void 0 : null == (f = e.serviceEndpoint) ? void 0 : null == (h = f.signalServiceEndpoint) ? void 0 : null == (m = h.actions[0]) ? void 0 : null == (k = m.signalAction) ? void 0 : k.signal) && (d.click(), a = !0);
      });
      a || (wa = "TOGGLE_DARK_THEME_OFF", mb());
    }
    function Nc() {
      X.addEventListener("yt-action", function(a) {
        switch(a.detail.actionName) {
          case "yt-miniplayer-active":
            ja = b.blockads;
            break;
          case "yt-activate-miniplayer-from-watch-action":
            (X.fullscreen_ || X.fullscreen) && p && b.controlbar.active && (g && "fixed" === b.controlbar.position ? (g.appendChild(p), G.classList.remove("ytp-tooltip")) : n && "absolute" === b.controlbar.position && n.classList.remove("efyt-control-bar-centered"));
            break;
          case "yt-fullscreen-change-action":
            !0 === a.detail.args[0] && b.selectquality && b.selectqualityfullscreenon ? Ia() : !1 === a.detail.args[0] && b.selectquality && b.selectqualityfullscreenoff && Ia();
            !1 === a.detail.args[0] && c.body.classList.contains("viewport") && Bb({preventDefault:function() {
            }, stopPropagation:function() {
            }});
            if (B && b.controlbar.active) {
              if (g && "fixed" === b.controlbar.position) {
                !0 === a.detail.args[0] ? ((a = g.querySelector(".ytp-chrome-controls")) && a.appendChild(p), G.classList.add("ytp-tooltip")) : (g.appendChild(p), G.classList.remove("ytp-tooltip"));
              } else {
                if (n && "absolute" === b.controlbar.position) {
                  n.classList[!0 === a.detail.args[0] ? "add" : "remove"]("efyt-control-bar-centered");
                }
              }
            }
            break;
          case "yt-signal-action-toggle-dark-theme-off":
            c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"dark-theme-off"}}));
            break;
          case "yt-signal-action-toggle-dark-theme-device":
            X.hasAttribute("efyt-toggle-dark-theme-device") ? X.removeAttribute("efyt-toggle-dark-theme-device") : (X.setAttribute("efyt-toggle-dark-theme-device", ""), setTimeout(hd, 1000)), c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"dark-theme-off"}}));
        }
      });
      /^en\-?/.test(c.documentElement.lang) && (X.onOpenHotkeyDialog = Xa);
    }
    function Oc() {
      t && t.updatePlayerElementLocation_ && (t.updatePlayerElementLocation_ = function(e) {
        return function() {
          va && !ea && setTimeout(function() {
            da("large");
          }, 500);
          return e.apply(this, arguments);
        };
      }(t.updatePlayerElementLocation_));
      t && t.updatePlayerElementLocation && (t.updatePlayerElementLocation = function(e) {
        return function() {
          va && !ea && setTimeout(function() {
            da("large");
          }, 500);
          return e.apply(this, arguments);
        };
      }(t.updatePlayerElementLocation));
      t && t.videoHeightToWidthRatioChanged_ && (t.videoHeightToWidthRatioChanged_ = function(e) {
        return function() {
          var f = e.apply(this, arguments);
          g && g.getVideoAspectRatio && (T = g.getVideoAspectRatio(), Ca = Aa = Ba = !1, Ma());
          return f;
        };
      }(t.videoHeightToWidthRatioChanged_));
      t && t.videoHeightToWidthRatioChanged && (t.videoHeightToWidthRatioChanged = function(e) {
        return function() {
          var f = e.apply(this, arguments);
          g && g.getVideoAspectRatio && (T = g.getVideoAspectRatio(), Ca = Aa = Ba = !1, Ma());
          return f;
        };
      }(t.videoHeightToWidthRatioChanged));
      let a, d;
      t && (null == (a = t.playerEvents_) ? 0 : null == (d = a.map_) ? 0 : d.onStateChange) && (t.playerEvents_.map_.onStateChange = function(e) {
        return function() {
          if (0 !== arguments[0]) {
            return e.apply(this, arguments);
          }
        };
      }(t.playerEvents_.map_.onStateChange));
    }
    function Pc() {
      (new MutationObserver(function(a) {
        a.forEach(function(d) {
          if (null !== d.addedNodes && 0 < d.addedNodes.length && (ja = b.blockads, wa)) {
            for (var e = d.addedNodes.length - 1; 0 <= e; e--) {
              if ("YTD-TOGGLE-THEME-COMPACT-LINK-RENDERER" === d.addedNodes[e].nodeName) {
                d.addedNodes[e].click();
              } else {
                let f, h, m, k, C, N, M;
                if ("YTD-COMPACT-LINK-RENDERER" === d.addedNodes[e].nodeName && "compact-link-style-type-selection-menu" === (null == (f = d.addedNodes[e]) ? void 0 : f.compactLinkStyle) && (null == (h = d.addedNodes[e]) ? void 0 : null == (m = h.data) ? void 0 : null == (k = m.serviceEndpoint) ? void 0 : null == (C = k.signalServiceEndpoint) ? void 0 : null == (N = C.actions[0]) ? void 0 : null == (M = N.signalAction) ? void 0 : M.signal) === wa) {
                  wa = !1;
                  d.addedNodes[e].click();
                  c.body.classList.remove("efyt-topbar-menu-hidden");
                  break;
                }
              }
            }
          }
        });
      })).observe(nb, {childList:!0, subtree:!0});
    }
    function ob() {
      P.setAttribute("efyt", "");
      P.addEventListener("data-changed", function(a) {
        b.newestcomments && a.detail.path && "data.header" === a.detail.path ? setTimeout(Lc, 500, a.target) : !a.detail.path || "data.contents" !== a.detail.path && "data.contents.splices" !== a.detail.path || setTimeout(fd, 2000);
      });
    }
    function Qc() {
      pb.addEventListener("yt-action", function(a) {
        "yt-miniplayer-active-changed-action" === a.detail.actionName && !0 === a.detail.args[0] && (X.fullscreen_ || X.fullscreen) && p && b.controlbar.active && (g && "fixed" === b.controlbar.position ? (g.appendChild(p), G.classList.remove("ytp-tooltip")) : n && "absolute" === b.controlbar.position && n.classList.remove("efyt-control-bar-centered"));
      });
    }
    function Rc() {
      Ea && Ea.getTimeSinceActive && (Ea.getTimeSinceActive = function(a) {
        return function() {
          return 1000;
        };
      }(Ea.getTimeSinceActive));
    }
    function Sc() {
      I && I.onKeyDownEvent_ && (I.onKeyDownEvent_ = function(a) {
        return function() {
          var d = arguments[0];
          if (191 === d.keyCode && d.shiftKey && !this.ignoreKeyEvent_(d)) {
            Xa();
          } else {
            return a.apply(this, arguments);
          }
        };
      }(I.onKeyDownEvent_));
      I && I.onKeyDownEvent && (I.onKeyDownEvent = function(a) {
        return function() {
          var d = arguments[0];
          if (191 === d.keyCode && d.shiftKey && !this.ignoreKeyEvent_(d)) {
            Xa();
          } else {
            return a.apply(this, arguments);
          }
        };
      }(I.onKeyDownEvent));
      I && I.toggleTheaterMode_ && (I.toggleTheaterMode_ = function(a) {
        return function() {
          va = !1;
          var d = a.apply(this, arguments);
          c.body.classList.contains("efyt-wide-player") && kb();
          setTimeout(Ta, 500);
          return d;
        };
      }(I.toggleTheaterMode_));
      I && I.toggleTheaterMode && (I.toggleTheaterMode = function(a) {
        return function() {
          va = !1;
          var d = a.apply(this, arguments);
          c.body.classList.contains("efyt-wide-player") && kb();
          setTimeout(Ta, 500);
          return d;
        };
      }(I.toggleTheaterMode));
    }
    function Tc() {
      O.addEventListener("yt-playlist-data-updated", function(a) {
        -1 !== b.controls.indexOf("reverse-playlist") && n && n.querySelectorAll("button#efyt-reverse-playlist").forEach(function(d) {
          d.hidden = !O.currentPlaylistData_;
        });
      });
    }
    var b = JSON.parse(Wc), y = {}, X = c.querySelector("ytd-app"), t = c.querySelector("ytd-watch-flexy"), Ea = c.querySelector("yt-activity-manager"), O = c.querySelector("yt-playlist-manager"), I = c.querySelector("yt-hotkey-manager"), pb = c.querySelector("ytd-miniplayer"), P = c.querySelector("ytd-comments"), nb = c.querySelector("ytd-popup-container"), ka = c.querySelector("yt-playability-error-supported-renderers"), n, g, l, zb, Wa, aa, U, p, G, sa, Y, D, F, u, r, z, q, v, A, jb, Oa, Fb, Ya, 
    Da, ea, ya, xa, La, Ja, xb, Na, Ca, Va, Aa, Ba, T, Ra, lb, ab, B, ec, hb, Ic, Kb, Sa, L, Ka = "" !== b.whitelist ? b.whitelist.split(",") : [], ja = b.blockads, E = b.speed, va = b.wideplayer || b.cinemamode && b.cinemamodewideplayer, wa, Uc = new MutationObserver(function(a) {
      var d;
      a: for (d of a) {
        if (null !== d.addedNodes && 0 < d.addedNodes.length) {
          for (a = d.addedNodes.length - 1; 0 <= a; a--) {
            if ("YTD-APP" === d.addedNodes[a].nodeName ? (X = d.addedNodes[a], Nc(), "default-dark" !== b.theme || c.documentElement.hasAttribute("dark") || Za()) : "YTD-WATCH-FLEXY" === d.addedNodes[a].nodeName ? (t = d.addedNodes[a], Ha(), Oc(), ka = t.querySelector("yt-playability-error-supported-renderers"), (P = t.querySelector("ytd-comments")) && ob()) : "YT-ACTIVITY-MANAGER" === d.addedNodes[a].nodeName ? (Ea = d.addedNodes[a], Rc()) : "YT-PLAYLIST-MANAGER" === d.addedNodes[a].nodeName ? (O = 
            d.addedNodes[a], Tc()) : "YT-HOTKEY-MANAGER" === d.addedNodes[a].nodeName ? (I = d.addedNodes[a], Sc()) : "YTD-MINIPLAYER" === d.addedNodes[a].nodeName ? (pb = d.addedNodes[a], Qc()) : "YTD-POPUP-CONTAINER" === d.addedNodes[a].nodeName ? (nb = d.addedNodes[a], Pc()) : "YTD-COMMENTS" === d.addedNodes[a].nodeName ? (P = d.addedNodes[a], ob()) : "YTD-ITEM-SECTION-RENDERER" === d.addedNodes[a].nodeName && d.addedNodes[a].classList.contains("ytd-comments") && !P ? (P = c.querySelector("ytd-comments")) && 
            ob() : "YT-PLAYABILITY-ERROR-SUPPORTED-RENDERERS" === d.addedNodes[a].nodeName && (ka = d.addedNodes[a]), X && t && Ea && O && I && pb && nb && P && ka) {
              Uc.disconnect();
              break a;
            }
          }
        }
      }
    });
    Uc.observe(c.body, {childList:!0, subtree:!0});
    var Mb = c.createElement("link");
    Mb.rel = "stylesheet";
    Mb.href = S + "/youtube-polymer.css";
    c.head.appendChild(Mb);
    var Nb = c.createElement("style");
    Nb.type = "text/css";
    Nb.textContent = "#efyt-background{background-color:" + b.backgroundcolor + "}body.efyt-cinema-mode #efyt-background{opacity:" + b.backgroundopacity / 100 + ";visibility:visible}";
    c.head.appendChild(Nb);
    wb();
    var $a = c.createDocumentFragment();
    var R = c.createElement("div");
    R.id = "efyt-background";
    R.classList.add("no-transition");
    R.addEventListener("click", function() {
      Eb();
    });
    $a.appendChild(R);
    var Z = c.createElement("progress");
    Z.id = "efyt-progress";
    Z.max = 1;
    Z.value = 0;
    Z.addEventListener("click", function(a) {
      l && (l.currentTime = Math.floor((a.pageX - this.offsetLeft) * this.max / this.offsetWidth));
      za();
    });
    Z.addEventListener("mouseenter", function() {
      Fa.classList.add("visible");
    });
    Z.addEventListener("mouseleave", function() {
      Fa.classList.remove("visible");
    });
    Z.addEventListener("mousemove", function(a) {
      if (l) {
        var d = Fa, e = Math.floor((a.pageX - this.offsetLeft) * this.max / this.offsetWidth);
        e = Number(e);
        var f = Math.floor(e / 3600), h = Math.floor(e % 3600 / 60);
        e = Math.floor(e % 3600 % 60);
        d.textContent = (0 < f ? f + ":" : "") + (0 < h ? (0 < f && 10 > h ? "0" : "") + h + ":" : "0:") + (10 > e ? "0" : "") + e;
        Fa.style.left = a.pageX - Fa.getBoundingClientRect().width / 2 + "px";
      }
    });
    $a.appendChild(Z);
    var Fa = c.createElement("div");
    Fa.id = "efyt-progress-tooltip";
    $a.appendChild(Fa);
    var Ob = c.createElement("div"), Ga = c.createElementNS("http://www.w3.org/2000/svg", "svg"), Vc = c.createElementNS("http://www.w3.org/2000/svg", "path");
    Ob.id = "efyt-close-mini-player";
    Ga.setAttributeNS(null, "version", "1.1");
    Ga.setAttributeNS(null, "viewBox", "0 0 24 24");
    Ga.setAttributeNS(null, "height", "100%");
    Ga.setAttributeNS(null, "width", "100%");
    Vc.setAttributeNS(null, "d", "M 12,2 C 6.47,2 2,6.47 2,12 2,17.53 6.47,22 12,22 17.53,22 22,17.53 22,12 22,6.47 17.53,2 12,2 Z M 17,15.59 15.59,17 12,13.41 8.41,17 7,15.59 10.59,12 7,8.41 8.41,7 12,10.59 15.59,7 17,8.41 13.41,12 Z");
    Ga.appendChild(Vc);
    Ga.addEventListener("click", function() {
      c.body.classList.remove("efyt-mini-player");
    });
    Ob.appendChild(Ga);
    $a.appendChild(Ob);
    c.body.appendChild($a);
    JSON.parse = function(a) {
      return function(d, e) {
        if (ja) {
          var f = a.apply(this, arguments);
          if (/playerResponse/.test(d)) {
            if ("object" === typeof f.playerResponse) {
              f.playerResponse = Lb(f.playerResponse);
            } else {
              if (Array.isArray(f)) {
                for (var h = f.length - 1; 0 <= h; h--) {
                  "object" === typeof f[h].playerResponse && (f[h].playerResponse = Lb(f[h].playerResponse));
                }
              }
            }
          } else {
            /playerAds/.test(d) && "object" === typeof f.playerAds && (f = Lb(f));
          }
          return f;
        }
        return a.apply(this, arguments);
      };
    }(JSON.parse);
    c.addEventListener("yt-history-load", function(a) {
      ea = !1;
      ja = b.blockads;
      P && b.newestcomments && (a = P.querySelector("yt-sort-filter-sub-menu-renderer a.yt-dropdown-menu:last-of-type")) && a.removeAttribute("efyt");
    });
    c.addEventListener("yt-navigate-start", function(a) {
      ea = !1;
      if ("watch" === a.detail.pageType || /^\/(watch|shorts)/.test(a.detail.url)) {
        ja = b.blockads;
      }
      P && b.newestcomments && (a = P.querySelector("yt-sort-filter-sub-menu-renderer a.yt-dropdown-menu:last-of-type")) && a.removeAttribute("efyt");
    }, !0);
    c.addEventListener("yt-page-data-fetched", function(a) {
      ea = !1;
      "watch" !== a.detail.pageData.page && (c.body.classList.contains("efyt-cinema-mode") && (c.body.classList.add("_cinema_"), c.body.classList.remove("efyt-cinema-mode")), p && (p.hidden = !0), F && !F.hidden && Cb());
      g && g.classList.remove("not-interested");
      c.body.classList.remove("efyt-mini-player");
    }, !0);
    c.addEventListener("yt-navigate-finish", function(a) {
      c.addEventListener("keydown", Jc, !0);
      Ha();
      if ("watch" === a.detail.pageType || B) {
        !0 === a.detail.fromHistory && P && b.newestcomments && (a = P.querySelector("yt-sort-filter-sub-menu-renderer a.yt-dropdown-menu:last-of-type")) && a.setAttribute("efyt", "");
        c.body.classList.contains("masthead-position-fixed") && c.body.classList.remove("masthead-position-fixed");
        c.body.classList.contains("_cinema_") && (c.body.classList.add("efyt-cinema-mode"), c.body.classList.remove("_cinema_"));
        p && p.removeAttribute("hidden");
        c.body.classList.contains("efyt-wide-player") && setTimeout(function() {
          w.dispatchEvent(new Event("resize"));
          c.body.classList.contains("viewport") && g && w.scrollTo(w.scrollX, g.getBoundingClientRect().top + w.scrollY);
        }, 1000);
        -1 !== b.controls.indexOf("reverse-playlist") && n && O && n.querySelectorAll("button#efyt-reverse-playlist").forEach(function(d) {
          d.hidden = !O.currentPlaylistData_;
        });
        if (b.expanddescription) {
          try {
            c.querySelector("ytd-video-secondary-info-renderer tp-yt-paper-button.ytd-expander#more").click();
          } catch (d) {
          }
        }
        za();
      } else {
        B || (c.body.classList.contains("efyt-wide-player") && c.body.classList.add("masthead-position-fixed"), "channel" === a.detail.pageType && w.dispatchEvent(new Event("resize")));
      }
    });
    X && Nc();
    t && Oc();
    nb && Pc();
    P && ob();
    pb && Qc();
    Ea && Rc();
    I && Sc();
    O && Tc();
    c.hidden ? c.addEventListener("visibilitychange", function d() {
      c.removeEventListener("visibilitychange", d);
      Ha();
    }) : Ha();
    w.addEventListener("load", function e() {
      w.removeEventListener("load", e);
      g || Ha();
    });
    b.controlsvisible && c.documentElement.classList.add("efyt-controls-visible");
    b.controlbar.active && c.documentElement.classList.add("efyt-control-bar-visible");
    b.executescript && c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"custom-script"}}));
    if (b.darktheme && "default-dark" === b.theme && !c.documentElement.hasAttribute("dark")) {
      Za();
    } else {
      if (b.darktheme && "default-dark" !== b.theme) {
        c.documentElement.hasAttribute("dark") || Za();
        var x = c.head.querySelector("#efyt-theme-variables"), fa = c.head.querySelector("#efyt-theme");
        if (x && "youtube-deep-dark" === b.theme && !x.hasAttribute("href")) {
          c.head.removeChild(x), x = c.createElement("link"), x.id = "efyt-theme-variables", x.rel = "stylesheet", x.href = S + "/vendor/themes/" + b.themevariant, c.head.appendChild(x);
        } else {
          if (x && "youtube-deep-dark" === b.theme && 0 > x.href.indexOf(b.themevariant)) {
            x.href = S + "/vendor/themes/" + b.themevariant;
          } else {
            if (x && "youtube-deep-dark-custom" === b.theme && x.hasAttribute("href")) {
              c.head.removeChild(x), x = c.createElement("style"), x.type = "text/css", x.id = "efyt-theme-variables", x.textContent = Pa(), c.head.appendChild(x);
            } else {
              if (x && "youtube-deep-dark-custom" === b.theme) {
                try {
                  0 > localStorage.getItem("enhancer-for-youtube").indexOf(JSON.stringify(b.customcolors)) && (x.textContent = Pa());
                } catch (e) {
                }
              }
            }
          }
        }
        fa ? fa && 0 > fa.href.indexOf("material") && (fa.href = S + "/vendor/themes/youtube-deep-dark.material.css") : (x || "youtube-deep-dark" !== b.theme ? x || "youtube-deep-dark-custom" !== b.theme || (x = c.createElement("style"), x.type = "text/css", x.id = "efyt-theme-variables", x.textContent = Pa(), c.head.appendChild(x)) : (x = c.createElement("link"), x.id = "efyt-theme-variables", x.rel = "stylesheet", x.href = S + "/vendor/themes/" + b.themevariant, c.head.appendChild(x)), fa = c.createElement("link"), 
        fa.id = "efyt-theme", fa.rel = "stylesheet", fa.href = S + "/vendor/themes/youtube-deep-dark.material.css", c.head.appendChild(fa));
      } else {
        b.darktheme || (x = c.head.querySelector("#efyt-theme-variables"), (fa = c.head.querySelector("#efyt-theme")) && c.head.removeChild(fa), x && c.head.removeChild(x));
      }
    }
    if (b.customtheme && !c.head.querySelector("#efyt-custom-theme")) {
      var Qa = c.createElement("style");
      Qa.type = "text/css";
      Qa.id = "efyt-custom-theme";
      Qa.textContent = b.customcssrules;
      c.head.appendChild(Qa);
    } else {
      b.customtheme || (Qa = c.head.querySelector("#efyt-custom-theme")) && c.head.removeChild(Qa);
    }
    c.addEventListener("efyt-pause-video", function(e) {
      try {
        g.pauseVideo();
      } catch (f) {
      }
    });
    c.addEventListener("efyt-command", function(e) {
      var f = JSON.parse(e.detail);
      e = f.command;
      f = "button#efyt-" + f.control;
      switch(e) {
        case "c010-theme-youtube-light":
          Mc();
          break;
        case "c400-comments-visibility":
          c.documentElement.classList.toggle("efyt-hide-comments");
          break;
        case "c410-related-videos-visibility":
          c.documentElement.classList.toggle("efyt-hide-related");
      }
      if (rb()) {
        try {
          switch(e) {
            case "c060-focus-video-player":
              za();
              break;
            case "c070-toggle-loop":
            case "c080-stop-video":
            case "c090-reverse-playlist":
            case "c100-toggle-volume-booster":
            case "c110-whitelist":
            case "c120-clear-ads":
            case "c130-toggle-annotations":
            case "c140-toggle-cinema-mode":
            case "c150-toggle-player-size":
              g.querySelector(f).click();
              break;
            case "c160-center-video-player":
              g.querySelector(f).dispatchEvent(new Event("contextmenu"));
              break;
            case "c170-pop-up-player":
            case "c180-decrease-speed":
            case "c190-increase-speed":
            case "c200-default-speed":
              g.querySelector(f).click();
              break;
            case "c210-normal-speed":
              g.querySelector(f).dispatchEvent(new Event("contextmenu"));
              break;
            case "c220-toggle-video-filters":
            case "c230-flip-horizontally":
            case "c240-flip-vertically":
            case "c250-take-screenshot":
            case "c260-keyboard-shortcuts":
            case "c270-custom-script":
              g.querySelector(f).click();
              break;
            case "c280-picture-in-picture":
              (async function() {
                l.hasAttribute("efyt-pip") ? c.exitPictureInPicture() : (await l.requestPictureInPicture(), l.setAttribute("efyt-pip", ""), l.addEventListener("leavepictureinpicture", function() {
                  l.removeAttribute("efyt-pip");
                }, {once:!0}));
              })();
              break;
            case "c290-quality-highres":
            case "c300-quality-hd2880":
            case "c310-quality-hd2160":
            case "c320-quality-hd1440":
            case "c330-quality-hd1080":
            case "c340-quality-hd720":
            case "c350-quality-large":
            case "c360-quality-medium":
            case "c370-quality-small":
            case "c380-quality-tiny":
            case "c390-quality-auto":
              var h = e.split("-")[2];
              g.setPlaybackQualityRange(h, h);
          }
          "c060-focus-video-player" !== e && za();
        } catch (m) {
        }
      }
    });
    c.addEventListener("efyt-set-messages", function(e) {
      y = JSON.parse(e.detail).messages;
      c.querySelectorAll(".ytp-efyt-button, .efyt-control-bar button").forEach(function(f) {
        f.dataset.tooltip = "efyt-new-message" === f.id ? y[f.dataset.message] + " - Enhancer for YouTube\u2122" : "efyt-keyboard-shortcuts" === f.id ? y[f.dataset.message] + ("Win32" === navigator.platform || "Win64" === navigator.platform ? " \ud83d\uddd7" : "") : y[f.dataset.message];
      });
      F && F.querySelectorAll("[data-message]").forEach(function(f) {
        f.textContent = y[f.dataset.message];
      });
      D && D.querySelectorAll("[data-message]").forEach(function(f) {
        f.textContent = y[f.dataset.message];
      });
    });
    c.addEventListener("efyt-preference-changed", function(e) {
      var f = JSON.parse(e.detail);
      e = f.value;
      switch(f.name) {
        case "blockadsexceptforsubs":
        case "blockautoplay":
        case "blockhfrformats":
        case "blockwebmformats":
        case "controlspeed":
        case "controlspeedmousebutton":
        case "ignoreplaylists":
        case "ignorepopupplayer":
        case "overridespeeds":
        case "pauseforegroundtab":
        case "pausevideos":
        case "reversemousewheeldirection":
        case "speedvariation":
        case "stopvideos":
        case "volumevariation":
          b[f.name] = e;
          K();
          break;
        case "applyvideofilters":
          b.applyvideofilters = e;
          B && l && (l.style.filter = e ? b.filter : "");
          break;
        case "backgroundcolor":
          b.backgroundcolor = e;
          R && (R.style.backgroundColor = e);
          wb();
          break;
        case "backgroundopacity":
          b.backgroundopacity = e;
          R && (R.style.opacity = e / 100);
          wb();
          break;
        case "blackbars":
          b.blackbars = e;
          if (g) {
            g.classList[e ? "add" : "remove"]("efyt-black-bars");
          }
          break;
        case "blockads":
          b.blockads = e;
          K();
          ja = e;
          break;
        case "blur":
        case "brightness":
        case "contrast":
        case "grayscale":
        case "huerotate":
        case "invert":
        case "saturate":
        case "sepia":
          c.hidden && (b[f.name] = e, D && (f = D.querySelector("#" + f.name), f.value = e, f.nextElementSibling.textContent = e, f.style.background = "linear-gradient(to right,var(--main-color,#f00)0%,var(--main-color,#f00)" + 100 / f.max * f.value + "%,#fff " + 100 / f.max * f.value + "%,#fff 100%)"));
          break;
        case "cinemamode":
          b.cinemamode = e;
          B && (e ? tb() : Eb());
          break;
        case "cinemamodewideplayer":
          b.cinemamodewideplayer = e;
          B && c.body.classList.contains("efyt-cinema-mode") && (e ? da("large") : da("default"));
          break;
        case "controlbar":
          c.documentElement.classList[e.active ? "add" : "remove"]("efyt-control-bar-visible");
          e.active && "fixed" !== e.position || c.documentElement.classList.remove("efyt-control-bar-position-absolute");
          if (p && (p.classList[e.autohide ? "add" : "remove"]("auto-hide"), p.classList[e.centered ? "add" : "remove"]("centered"), e.active && B && g && n)) {
            if ("fixed" === e.position) {
              if (c.fullscreenElement) {
                if (f = g.querySelector(".ytp-chrome-controls")) {
                  f.appendChild(p), G.classList.add("ytp-tooltip");
                }
              } else {
                g.appendChild(p), G.classList.remove("ytp-tooltip");
              }
              c.documentElement.classList.remove("efyt-control-bar-position-absolute");
            } else {
              c.documentElement.classList.add("efyt-control-bar-position-absolute"), n.appendChild(p), p.classList.remove("auto-hide");
            }
          }
          b.controlbar = e;
          B && g && g.getVideoAspectRatio ? (T = g.getVideoAspectRatio(), Ca = Aa = Ba = !1, Ma()) : !B && c.body.classList.contains("efyt-wide-player") && (T = 0);
          break;
        case "controls":
          b.controls = e;
          c.querySelectorAll(".ytp-efyt-button:not(#efyt-new-message), .efyt-control-bar button").forEach(function(m) {
            var k = m.id.split("efyt-")[1];
            "reverse-playlist" === k && -1 !== b.controls.indexOf(k) ? O ? m.hidden = !O.currentPlaylistData_ : g && g.getPlaylistId && (m.hidden = !g.getPlaylistId()) : m.hidden = -1 !== b.controls.indexOf(k) ? !1 : !0;
          });
          B && g && p && -1 !== b.controls.indexOf("whitelist") && vb();
          if (e = c.querySelector("#efyt-controls-button")) {
            1 < c.querySelectorAll("#ytp-efyt-controls .ytp-efyt-button:not(#efyt-controls-button):not([hidden])").length ? e.removeAttribute("hidden") : e.hidden = !0;
          }
          break;
        case "controlsvisible":
          b.controlsvisible = e;
          c.documentElement.classList[e ? "add" : "remove"]("efyt-controls-visible");
          break;
        case "controlvolume":
        case "controlvolumemousebutton":
          b[f.name] = e;
          g && g.getVideoAspectRatio && (T = g.getVideoAspectRatio(), Ca = Aa = Ba = !1, Ma());
          break;
        case "customcolors":
          b.customcolors = e;
          K();
          if (f = c.head.querySelector("#efyt-theme-variables")) {
            f.textContent = Pa();
          }
          break;
        case "customcssrules":
          b.customcssrules = e;
          K();
          if (f = c.head.querySelector("#efyt-custom-theme")) {
            f.textContent = e, c.head.appendChild(f);
          }
          break;
        case "customtheme":
          b.customtheme = e;
          K();
          f = c.head.querySelector("#efyt-custom-theme");
          e && !f ? (f = c.createElement("style"), f.type = "text/css", f.id = "efyt-custom-theme", f.textContent = b.customcssrules, c.head.appendChild(f)) : !e && f && c.head.removeChild(f);
          break;
        case "darktheme":
          b.darktheme = e;
          K();
          f = c.head.querySelector("#efyt-theme-variables");
          var h = c.head.querySelector("#efyt-theme");
          e ? (Za(), "default-dark" === b.theme ? (h && c.head.removeChild(h), f && c.head.removeChild(f)) : "youtube-deep-dark" === b.theme ? (f && !f.hasAttribute("href") && (c.head.removeChild(f), f = !1), f || (f = c.createElement("link"), f.id = "efyt-theme-variables", f.rel = "stylesheet", f.href = S + "/vendor/themes/" + b.themevariant, c.head.appendChild(f)), h || (h = c.createElement("link"), h.id = "efyt-theme", h.rel = "stylesheet", h.href = S + "/vendor/themes/youtube-deep-dark.material.css", 
          c.head.appendChild(h)), b.customtheme && (f = c.head.querySelector("#efyt-custom-theme")) && c.head.appendChild(f)) : "youtube-deep-dark-custom" === b.theme && (f && f.hasAttribute("href") && (c.head.removeChild(f), f = !1), f || (f = c.createElement("style"), f.type = "text/css", f.id = "efyt-theme-variables", f.textContent = Pa(), c.head.appendChild(f)), h || (h = c.createElement("link"), h.id = "efyt-theme", h.rel = "stylesheet", h.href = S + "/vendor/themes/youtube-deep-dark.material.css", 
          c.head.appendChild(h)), b.customtheme && (f = c.head.querySelector("#efyt-custom-theme")) && c.head.appendChild(f))) : (h && c.head.removeChild(h), f && c.head.removeChild(f), Mc());
          break;
        case "defaultvolume":
          b.defaultvolume = e;
          K();
          try {
            e && g.setVolume(b.volume);
          } catch (m) {
          }
          break;
        case "disableautoplay":
          b.disableautoplay = e;
          K();
          g && "movie_player" === g.id && cc(e);
          break;
        case "executescript":
          b.executescript = e;
          b.executescript && c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"custom-script"}}));
          break;
        case "expanddescription":
          b.expanddescription = e;
          try {
            B && c.querySelector("ytd-video-secondary-info-renderer tp-yt-paper-button.ytd-expander#" + (e ? "more" : "less")).click();
          } catch (m) {
          }
          break;
        case "filter":
          b.filter = e;
          D && !D.hidden && B && l && (l.style.filter = e);
          break;
        case "hidecardsendscreens":
          b.hidecardsendscreens = e;
          K();
          B && (e ? sb() : dc());
          break;
        case "hidechat":
          b.hidechat = e;
          c.documentElement.classList[e ? "add" : "remove"]("efyt-hide-chat");
          break;
        case "hidecomments":
          b.hidecomments = e;
          c.documentElement.classList[e ? "add" : "remove"]("efyt-hide-comments");
          break;
        case "hiderelated":
          b.hiderelated = e;
          c.documentElement.classList[e ? "add" : "remove"]("efyt-hide-related");
          break;
        case "localecode":
          c.dispatchEvent(new Event("efyt-get-messages"));
          break;
        case "message":
          b.message = e;
          if (f = c.querySelector("#efyt-new-message")) {
            f.hidden = !e;
          }
          break;
        case "miniplayer":
          b.miniplayer = e;
          n && n.removeAttribute("io");
          if (e) {
            c.body.classList.add(b.miniplayersize, b.miniplayerposition), B && ub();
          } else {
            try {
              c.body.classList.remove("efyt-mini-player", b.miniplayersize, b.miniplayerposition), xb.disconnect();
            } catch (m) {
            }
          }
          break;
        case "miniplayerposition":
          c.body.classList.add(e);
          c.body.classList.remove(b.miniplayerposition);
          b.miniplayerposition = e;
          break;
        case "miniplayersize":
          c.body.classList.add(e);
          c.body.classList.remove(b.miniplayersize);
          b.miniplayersize = e;
          break;
        case "newestcomments":
          b.newestcomments = e;
          break;
        case "qualityembeds":
        case "qualityembedsfullscreen":
          b[f.name] = e;
          K();
          break;
        case "qualityplaylists":
        case "qualityplaylistsfullscreen":
        case "qualityvideos":
        case "qualityvideosfullscreen":
        case "selectquality":
          b[f.name] = e;
          K();
          (B || bb()) && b.selectquality && g && (Sa = !1, Ia());
          break;
        case "selectqualityfullscreenoff":
          b.selectqualityfullscreenoff = e;
          K();
          break;
        case "selectqualityfullscreenon":
          b.selectqualityfullscreenon = e;
          K();
          (B || bb()) && b.selectquality && e && g && c.fullscreenElement && (Sa = !1, Ia());
          break;
        case "speed":
          b.speed = E = e;
          K();
          try {
            l && b.overridespeeds ? (l.playbackRate = e, l.defaultPlaybackRate = e) : g.setPlaybackRate(e), g.efytPlaybackRate = e;
          } catch (m) {
          }
          break;
        case "theatermode":
          b.theatermode = e;
          if (B && t && !t.playerUnavailable) {
            try {
              e ? g.querySelector('.ytp-right-controls path[d="m 28,11 0,14 -20,0 0,-14 z m -18,2 16,0 0,10 -16,0 0,-10 z"]').parentNode.parentNode.click() : g.querySelector('.ytp-right-controls path[d="m 26,13 0,10 -16,0 0,-10 z m -14,2 12,0 0,6 -12,0 0,-6 z"]').parentNode.parentNode.click(), c.dispatchEvent(new CustomEvent("efyt-message", {detail:{request:"set-cookie", url:c.location.href, name:"wide", value:e ? "1" : "0"}}));
            } catch (m) {
            }
          }
          break;
        case "theme":
          b.theme = e;
          K();
          b.darktheme && (c.documentElement.hasAttribute("dark") || Za(), f = c.head.querySelector("#efyt-theme-variables"), h = c.head.querySelector("#efyt-theme"), "default-dark" === e ? (h && c.head.removeChild(h), f && c.head.removeChild(f)) : "youtube-deep-dark" === e ? (f && !f.hasAttribute("href") && (c.head.removeChild(f), f = !1), f || (f = c.createElement("link"), f.id = "efyt-theme-variables", f.rel = "stylesheet", f.href = S + "/vendor/themes/" + b.themevariant, c.head.appendChild(f)), 
          h || (h = c.createElement("link"), h.id = "efyt-theme", h.rel = "stylesheet", h.href = S + "/vendor/themes/youtube-deep-dark.material.css", c.head.appendChild(h)), b.customtheme && (f = c.head.querySelector("#efyt-custom-theme")) && c.head.appendChild(f)) : "youtube-deep-dark-custom" === e && (f && f.hasAttribute("href") && (c.head.removeChild(f), f = !1), f || (f = c.createElement("style"), f.type = "text/css", f.id = "efyt-theme-variables", f.textContent = Pa(), c.head.appendChild(f)), 
          h || (h = c.createElement("link"), h.id = "efyt-theme", h.rel = "stylesheet", h.href = S + "/vendor/themes/youtube-deep-dark.material.css", c.head.appendChild(h)), b.customtheme && (f = c.head.querySelector("#efyt-custom-theme")) && c.head.appendChild(f)));
          break;
        case "themevariant":
          b.themevariant = e;
          K();
          (f = c.head.querySelector("#efyt-theme-variables")) && f.hasAttribute("href") && (f.href = S + "/vendor/themes/" + e);
          break;
        case "volume":
          b.volume = e;
          K();
          try {
            g.setVolume(e);
          } catch (m) {
          }
          f = Date.now();
          h = f + 2592000000;
          localStorage["yt-player-volume"] = sessionStorage["yt-player-volume"] = JSON.stringify({data:JSON.stringify({volume:e, muted:!1}), creation:f, expiration:h});
          break;
        case "volumemultiplier":
          b.volumemultiplier = e;
          c.querySelector("#efyt-volume-booster.active") && (Da.gain.value = e);
          break;
        case "whitelist":
          b.whitelist = e;
          K();
          Ka = "" !== e ? e.split(",") : [];
          B && g && p && "" !== L && -1 !== b.controls.indexOf("whitelist") && vb();
          break;
        case "wideplayer":
          b.wideplayer = e;
          B && (e ? da("large") : c.body.classList.contains("efyt-wide-player") && da("default"));
          break;
        case "wideplayerviewport":
          (b.wideplayerviewport = e, e) ? e && Va && (c.body.classList.contains("efyt-wide-player") && c.body.classList.contains("efyt-cinema-mode") ? c.body.classList.add("_viewport_") : c.body.classList.contains("efyt-wide-player") && (c.body.classList.add("viewport"), setTimeout(function() {
            g && w.scrollTo(w.scrollX, g.getBoundingClientRect().top + w.scrollY);
          }, 80))) : (c.body.classList.remove("viewport", "_viewport_"), c.body.classList.contains("efyt-wide-player") && w.scrollTo(w.scrollX, 0));
      }
    });
    w.addEventListener("resize", yb);
    var Pb;
    "onfullscreenchange" in c ? Pb = "fullscreenchange" : "onmozfullscreenchange" in c && (Pb = "mozfullscreenchange");
    c.addEventListener(Pb, function(e) {
      setTimeout(function() {
        c.body.classList.contains("efyt-wide-player") && w.dispatchEvent(new Event("resize"));
        Y.style.display = "none";
        cb();
      }, 500);
    });
    setInterval(function() {
      w._lact = Date.now();
    }, 10000);
  } else {
    if (w.EnhancerForYouTube || w.efyt.reload) {
      c.dispatchEvent(new Event("efyt-reload-message")), b = w.efyt.prefs, localStorage.setItem("enhancer-for-youtube", JSON.stringify({blockads:b.blockads, blockadsexceptforsubs:b.blockadsexceptforsubs, blockautoplay:b.blockautoplay, blockhfrformats:b.blockhfrformats, blockwebmformats:b.blockwebmformats, controlspeed:b.controlspeed, controlspeedmousebutton:b.controlspeedmousebutton, controlvolume:b.controlvolume, controlvolumemousebutton:b.controlvolumemousebutton, customcolors:b.customcolors, customcssrules:b.customcssrules, 
      customtheme:b.customtheme, darktheme:b.darktheme, defaultvolume:b.defaultvolume, disableautoplay:b.disableautoplay, hidecardsendscreens:b.hidecardsendscreens, hidechat:b.hidechat, hidecomments:b.hidecomments, hiderelated:b.hiderelated, ignoreplaylists:b.ignoreplaylists, ignorepopupplayer:b.ignorepopupplayer, overridespeeds:b.overridespeeds, pauseforegroundtab:b.pauseforegroundtab, pausevideos:b.pausevideos, qualityembeds:b.qualityembeds, qualityembedsfullscreen:b.qualityembedsfullscreen, qualityplaylists:b.qualityplaylists, 
      qualityvideos:b.qualityvideos, reversemousewheeldirection:b.reversemousewheeldirection, selectquality:b.selectquality, selectqualityfullscreenoff:b.selectqualityfullscreenoff, selectqualityfullscreenon:b.selectqualityfullscreenon, speed:b.speed, speedvariation:b.speedvariation, stopvideos:b.stopvideos, theme:b.theme, themevariant:b.themevariant, volume:b.volume, volumevariation:b.volumevariation, whitelist:b.whitelist}));
    }
  }
})(window, document, JSON.stringify(efyt.prefs), efyt.resources, efyt.version);