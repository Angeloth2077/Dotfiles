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
(function(c) {
  function g() {
    var b = {};
    this.name ? b[this.name] = this.value : b[this.id] = this.checked;
    chrome.storage.local.set(b);
  }
  function Da() {
    for (var b = [], d = 0; d < t.length; d++) {
      t[d].checked && b.push(t[d].id);
    }
    chrome.storage.local.set({controls:b});
    if (d = c.querySelector("#firefox-bug")) {
      d.classList[-1 !== b.indexOf("volume-booster") ? "remove" : "add"]("hidden");
    }
  }
  function oa() {
    for (var b = c.querySelectorAll('#customcolors input[type="color"'), d = {}, e = 0; e < b.length; e++) {
      d[b[e].name] = b[e].value;
    }
    chrome.storage.local.set({customcolors:d});
  }
  function pa() {
    fetch(`_locales/${p}/messages.json`).then(function(b) {
      return b.json();
    }).then(function(b) {
      B = b.locale_dir.message;
      c.documentElement.lang = p.replace("_", "-");
      c.body.dir = B;
      for (var d = w.length - 1; 0 <= d; d--) {
        w[d].textContent = b[w[d].dataset.text].message;
      }
      for (d = q.length - 1; 0 <= d; d--) {
        q[d].dataset.tooltip = b[q[d].dataset.message].message;
      }
      c.querySelector("#customcssrules").setAttribute("placeholder", b.custom_theme_instructions.message);
      c.querySelector("#customscript").setAttribute("placeholder", b.custom_script_instructions.message);
      chrome.storage.local.set({localecode:p, localedir:B});
    });
  }
  function L() {
    var b = c.querySelector("#channels");
    b.textContent = "";
    k.forEach(function(d) {
      var e = c.createElement("bdi"), n = c.createElement("span"), l = c.createElementNS("http://www.w3.org/2000/svg", "svg"), r = c.createElementNS("http://www.w3.org/2000/svg", "path");
      n.textContent = d;
      e.appendChild(n);
      l.setAttributeNS(null, "version", "1.1");
      l.setAttributeNS(null, "viewBox", "0 0 24 24");
      r.setAttributeNS(null, "d", "M0 0h24v24H0V0z");
      r.setAttributeNS(null, "fill", "none");
      l.appendChild(r);
      r = c.createElementNS("http://www.w3.org/2000/svg", "path");
      r.setAttributeNS(null, "d", "M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z");
      l.appendChild(r);
      l.addEventListener("click", Ea);
      e.appendChild(l);
      b.appendChild(e);
    });
  }
  function Ea() {
    k.splice(k.indexOf(this.parentNode.textContent), 1);
    chrome.storage.local.set({whitelist:k.toString()});
    L();
  }
  function qa(b) {
    c.body.classList.add("overflow-hidden");
    C.style.display = "block";
    b.style.display = "block";
    b.scrollTop = 0;
    C.classList.add("in");
    setTimeout(function() {
      c.body.classList.add("modal-open");
    }, 50);
  }
  function Fa(b) {
    c.body.classList.remove("modal-open");
    setTimeout(function() {
      b.style.display = "none";
      C.classList.add("fade");
      C.classList.remove("in");
      setTimeout(function() {
        C.style.display = "none";
        c.body.classList.remove("overflow-hidden");
      }, 300);
    }, 300);
  }
  var p = chrome.i18n.getMessage("locale_code"), B = chrome.i18n.getMessage("locale_dir"), w = c.querySelectorAll(".i18n"), C = c.querySelector("#modal-backdrop"), q = c.querySelectorAll(".player-control .info"), t, k, x = {blur:0, brightness:100, contrast:100, grayscale:0, huerotate:0, invert:0, saturate:100, sepia:0, applyvideofilters:!1, backgroundcolor:"#000000", backgroundopacity:85, blackbars:!1, blockads:!0, blockadsexceptforsubs:!1, blockautoplay:!0, blockhfrformats:!1, blockwebmformats:!1, 
  cinemamode:!1, cinemamodewideplayer:!0, controlbar:{active:!0, autohide:!1, centered:!0, position:"absolute", }, controls:"loop reverse-playlist volume-booster whitelist not-interested cards-end-screens cinema-mode size pop-up-player speed video-filters screenshot keyboard-shortcuts options".split(" "), controlsvisible:!1, controlspeed:!0, controlspeedmousebutton:!1, controlvolume:!1, controlvolumemousebutton:!1, customcolors:{"--main-color":"#00adee", "--main-background":"#111111", "--second-background":"#181818", 
  "--hover-background":"#232323", "--main-text":"#eff0f1", "--dimmer-text":"#cccccc", "--shadow":"#000000"}, customcssrules:"", customscript:"", customtheme:!1, darktheme:!1, date:0, defaultvolume:!1, disableautoplay:!1, executescript:!1, expanddescription:!1, filter:"none", hidecardsendscreens:!1, hidechat:!1, hidecomments:!1, hiderelated:!1, ignoreplaylists:!0, ignorepopupplayer:!0, localecode:p, localedir:B, message:!1, miniplayer:!0, miniplayerposition:"_top-left", miniplayersize:"_400x225", 
  newestcomments:!1, overridespeeds:!0, pauseforegroundtab:!1, pausevideos:!0, popuplayersize:"640x360", qualityembeds:"medium", qualityembedsfullscreen:"hd1080", qualityplaylists:"hd720", qualityplaylistsfullscreen:"hd1080", qualityvideos:"hd720", qualityvideosfullscreen:"hd1080", reload:!1, reversemousewheeldirection:!1, selectquality:!1, selectqualityfullscreenoff:!1, selectqualityfullscreenon:!1, speed:1, speedvariation:0.1, stopvideos:!1, theatermode:!1, theme:"default-dark", themevariant:"youtube-deep-dark.css", 
  update:0, volume:50, volumemultiplier:3, volumevariation:5, whitelist:"", wideplayer:!1, wideplayerviewport:!1};
  chrome.storage.local.get(x, function(b) {
    if (p === b.localecode) {
      c.documentElement.lang = p.replace("_", "-");
      c.body.dir = B;
      for (var d = w.length - 1; 0 <= d; d--) {
        w[d].textContent = chrome.i18n.getMessage(w[d].dataset.text);
      }
      for (d = q.length - 1; 0 <= d; d--) {
        q[d].dataset.tooltip = chrome.i18n.getMessage(q[d].dataset.message);
      }
      c.querySelector("#customcssrules").setAttribute("placeholder", chrome.i18n.getMessage("custom_theme_instructions"));
      c.querySelector("#customscript").setAttribute("placeholder", chrome.i18n.getMessage("custom_script_instructions"));
    } else {
      p = b.localecode, pa();
    }
    c.querySelectorAll("nav a").forEach(function(a) {
      a.addEventListener("focus", function() {
        this.parentNode.classList.add("focus");
      });
      a.addEventListener("blur", function() {
        this.parentNode.classList.remove("focus");
      });
    });
    c.querySelector("nav .donate a").addEventListener("click", function(a) {
      a.preventDefault();
      a = 0 > "bg cs da de el es et fi fr hr hu it lt lv nl pl pt_BR pt_PT ro sk sl sv".indexOf(chrome.i18n.getMessage("locale_code")) ? "USD" : "EUR";
      chrome.tabs.create({url:this.dataset.paypal.replace(/currency_code=[A-Z]+/, "currency_code=" + a), active:!0});
    });
    d = c.querySelector("#locale");
    d.value = p;
    d.addEventListener("change", function() {
      p = this.value;
      pa();
    });
    d.addEventListener("focus", function() {
      this.parentNode.classList.add("focus");
    });
    d.addEventListener("blur", function() {
      this.parentNode.classList.remove("focus");
    });
    "#blackbars #cinemamode #cinemamodewideplayer #reversemousewheeldirection #hidecardsendscreens #hidecomments #hidechat #hiderelated #wideplayer #wideplayerviewport #applyvideofilters #blockhfrformats #blockwebmformats #expanddescription #newestcomments #executescript".split(" ").forEach(function(a) {
      a = c.querySelector(a);
      a.checked = b[a.id];
      a.addEventListener("click", g);
    });
    c.querySelector("#keyboard-shortcuts-btn").addEventListener("click", function() {
      chrome.runtime.sendMessage({request:"configure-keyboard-shortcuts"});
    });
    t = c.querySelectorAll('.player-control input[type="checkbox"]');
    for (d = 0; d < t.length; d++) {
      t[d].checked = -1 < b.controls.indexOf(t[d].id) ? !0 : !1, t[d].addEventListener("click", Da);
    }
    if (d = c.querySelector("#firefox-bug")) {
      d.classList[-1 !== b.controls.indexOf("volume-booster") ? "remove" : "add"]("hidden");
    }
    q = c.querySelectorAll(".player-control .info");
    for (d = q.length - 1; 0 <= d; d--) {
      q[d].addEventListener("click", function(a) {
        a.preventDefault();
      });
    }
    var e = c.querySelectorAll('input[name="controlbaractive"]'), n = c.querySelector("#controlsvisible"), l = c.querySelector("#controlbarposition"), r = c.querySelector("#control-bar-centering"), D = c.querySelector("#controlbarcentered"), ra = c.querySelector("#control-bar-visibility"), E = c.querySelector("#controlbarautohide");
    for (d = 0; d < e.length; d++) {
      e[d].value === String(b.controlbar.active) && (e[d].checked = !0), e[d].addEventListener("click", function() {
        "false" === this.value ? (b.controlbar.active = !1, n.disabled = !1, l.disabled = !0, D.disabled = !0, E.disabled = !0) : (b.controlbar.active = !0, n.disabled = !0, l.disabled = !1, D.disabled = !1, E.disabled = !1);
        chrome.storage.local.set({controlbar:b.controlbar});
      });
    }
    n.checked = b.controlsvisible;
    n.disabled = b.controlbar.active;
    n.addEventListener("click", g);
    l.value = b.controlbar.position;
    l.disabled = !b.controlbar.active;
    l.addEventListener("change", function() {
      r.classList["absolute" === this.value ? "remove" : "add"]("hidden");
      ra.classList["fixed" === this.value ? "remove" : "add"]("hidden");
      b.controlbar.position = this.value;
      chrome.storage.local.set({controlbar:b.controlbar});
    });
    r.classList["absolute" === b.controlbar.position ? "remove" : "add"]("hidden");
    D.checked = b.controlbar.centered;
    D.disabled = !b.controlbar.active;
    D.addEventListener("click", function(a) {
      b.controlbar.centered = this.checked;
      chrome.storage.local.set({controlbar:b.controlbar});
    });
    ra.classList["fixed" === b.controlbar.position ? "remove" : "add"]("hidden");
    E.checked = b.controlbar.autohide;
    E.disabled = !b.controlbar.active;
    E.addEventListener("click", function(a) {
      b.controlbar.autohide = this.checked;
      chrome.storage.local.set({controlbar:b.controlbar});
    });
    d = c.querySelector("#backgroundcolor");
    e = c.querySelector("#backgroundopacity");
    var Ga = c.querySelector("#opacity"), Ha = c.querySelector("#cinemamode-background"), ea = function() {
      var a = b.backgroundcolor.replace("#", ""), h = parseInt(a.substring(0, 2), 16), f = parseInt(a.substring(2, 4), 16);
      a = parseInt(a.substring(4, 6), 16);
      Ga.textContent = b.backgroundopacity + "%";
      Ha.style.backgroundColor = `rgba(${h}, ${f}, ${a}, ${b.backgroundopacity / 100})`;
    };
    d.value = b.backgroundcolor;
    d.addEventListener("input", function() {
      b.backgroundcolor = this.value;
      ea();
      chrome.storage.local.set({backgroundcolor:this.value});
    });
    d.addEventListener("change", g);
    e.value = b.backgroundopacity;
    e.addEventListener("input", function() {
      b.backgroundopacity = Number(this.value);
      ea();
      chrome.storage.local.set({backgroundopacity:b.backgroundopacity});
    });
    ea();
    var F = c.querySelector("#playback-speed"), G = c.querySelector("#custom-playback-speed");
    d = c.querySelector("#overridespeeds");
    var M = c.querySelector("#speedvariation");
    e = c.querySelector("#defaultvolume");
    var N = c.querySelector("#volume"), sa = c.querySelector("#volume-preview"), y = c.querySelector("#volumemultiplier"), O = c.querySelector("#controlspeed"), P = c.querySelector("#controlspeedmousebutton"), ta = c.querySelector("#controlvolume"), Q = c.querySelector("#controlvolumemousebutton"), R = c.querySelector("#volumevariation"), ua = c.querySelector("#miniplayer"), S = c.querySelector("#miniplayersize"), T = c.querySelector("#miniplayerposition");
    F.value = b.overridespeeds ? 1 : b.speed;
    F.addEventListener("change", function() {
      chrome.storage.local.set({speed:parseFloat(this.value)});
    });
    G.value = b.overridespeeds ? b.speed : 1;
    G.addEventListener("change", function() {
      chrome.storage.local.set({speed:parseFloat(this.value)});
    });
    b.overridespeeds && (F.classList.add("hidden"), G.classList.remove("hidden"));
    d.checked = b.overridespeeds;
    d.addEventListener("click", function() {
      M.disabled = !this.checked;
      var a = c.querySelector("#playback-speed-label");
      a.classList.add("animated", "blink");
      setTimeout(function() {
        a.classList.remove("animated", "blink");
      }, 2400);
      F.classList.toggle("hidden");
      G.classList.toggle("hidden");
      chrome.storage.local.set({overridespeeds:this.checked, speed:parseFloat(this.checked ? G.value : F.value)});
    });
    M.value = b.speedvariation;
    M.disabled = !b.overridespeeds;
    M.addEventListener("change", function() {
      chrome.storage.local.set({speedvariation:parseFloat(this.value)});
    });
    O.checked = b.controlspeed;
    O.addEventListener("click", function() {
      P.disabled = !this.checked;
      chrome.storage.local.set({controlspeed:this.checked});
    });
    P.checked = b.controlspeedmousebutton;
    P.disabled = !b.controlspeed;
    P.addEventListener("click", g);
    e.checked = b.defaultvolume;
    e.addEventListener("click", function() {
      N.disabled = !this.checked;
      chrome.storage.local.set({defaultvolume:this.checked});
    });
    N.value = b.volume;
    N.disabled = !b.defaultvolume;
    N.addEventListener("input", function() {
      b.volume = Number(this.value);
      sa.textContent = b.volume;
      chrome.storage.local.set({volume:b.volume});
    });
    sa.textContent = b.volume;
    y.value = b.volumemultiplier;
    y.addEventListener("change", function() {
      chrome.storage.local.set({volumemultiplier:Number(this.value)});
    });
    ta.checked = b.controlvolume;
    ta.addEventListener("click", function() {
      Q.disabled = !this.checked;
      R.disabled = !this.checked;
      chrome.storage.local.set({controlvolume:this.checked});
    });
    Q.checked = b.controlvolumemousebutton;
    Q.disabled = !b.controlvolume;
    Q.addEventListener("click", g);
    R.value = b.volumevariation;
    R.disabled = !b.controlvolume;
    R.addEventListener("change", function() {
      chrome.storage.local.set({volumevariation:Number(this.value)});
    });
    y.value = b.volumemultiplier;
    y.addEventListener("change", function() {
      chrome.storage.local.set({volumemultiplier:Number(this.value)});
    });
    ua.checked = b.miniplayer;
    ua.addEventListener("click", function() {
      S.disabled = !this.checked;
      T.disabled = !this.checked;
      chrome.storage.local.set({miniplayer:this.checked});
    });
    S.value = b.miniplayersize;
    S.disabled = !b.miniplayer;
    S.addEventListener("change", g);
    T.value = b.miniplayerposition;
    T.disabled = !b.miniplayer;
    T.addEventListener("change", g);
    d = c.querySelector("#blockads");
    var U = c.querySelector("#blockadsexceptforsubs"), va = c.querySelector("#whitelist-section"), fa = c.querySelector("#channel"), wa = c.querySelector("#whitelist-channel-btn");
    (d.checked = b.blockads) && va.classList.remove("hidden");
    d.addEventListener("click", function() {
      U.disabled = !this.checked;
      va.classList.toggle("hidden");
      chrome.storage.local.set({blockads:this.checked});
    });
    U.checked = b.blockadsexceptforsubs;
    U.disabled = !b.blockads;
    U.addEventListener("click", g);
    fa.addEventListener("keydown", function(a) {
      13 === a.keyCode && wa.click();
    });
    k = "" !== b.whitelist ? b.whitelist.split(",") : [];
    0 < k.length && L();
    wa.addEventListener("click", function() {
      var a = fa.value.replace(/,/g, "").trim();
      if ("" !== a && 0 > k.indexOf(a)) {
        k.push(a);
        try {
          k.sort(function(h, f) {
            return h.localeCompare(f);
          });
        } catch (h) {
          k.sort();
        }
        chrome.storage.local.set({whitelist:k.toString()});
        L();
      }
      fa.value = "";
    });
    d = c.querySelector("#blockautoplay");
    var V = c.querySelector("#pauseforegroundtab"), W = c.querySelector("#ignoreplaylists"), X = c.querySelector("#stopvideos");
    d.checked = b.blockautoplay;
    d.addEventListener("click", function() {
      V.disabled = !this.checked;
      W.disabled = !this.checked;
      X.disabled = !this.checked;
      chrome.storage.local.set({blockautoplay:this.checked});
    });
    V.checked = b.pauseforegroundtab;
    V.disabled = !b.blockautoplay;
    V.addEventListener("click", g);
    W.checked = b.ignoreplaylists;
    W.disabled = !b.blockautoplay;
    W.addEventListener("click", g);
    X.checked = b.stopvideos;
    X.disabled = !b.blockautoplay;
    X.addEventListener("click", g);
    d = c.querySelector("#pausevideos");
    var Y = c.querySelector("#ignorepopupplayer");
    d.checked = b.pausevideos;
    d.addEventListener("click", function() {
      Y.disabled = !this.checked;
      chrome.storage.local.set({pausevideos:this.checked});
    });
    Y.checked = b.ignorepopupplayer;
    Y.disabled = !b.pausevideos;
    Y.addEventListener("click", g);
    d = c.querySelector("#disableautoplay");
    var xa = c.querySelector(".autoplay-toggle-button");
    d.checked = b.disableautoplay;
    xa.setAttribute("aria-checked", !b.disableautoplay);
    d.addEventListener("click", function() {
      xa.setAttribute("aria-checked", !this.checked);
      chrome.storage.local.set({disableautoplay:this.checked});
    });
    var ha = c.querySelector("#selectquality"), u = c.querySelector("#selectqualityfullscreenon"), H = c.querySelector("#selectqualityfullscreenoff"), Z = ["#qualityvideos", "#qualityplaylists", "#qualityembeds"], aa = ["#qualityvideosfullscreen", "#qualityplaylistsfullscreen", "#qualityembedsfullscreen"];
    ha.checked = b.selectquality;
    ha.addEventListener("click", function() {
      Z.forEach(function(a) {
        c.querySelector(a).disabled = !ha.checked;
      });
      u.disabled = !this.checked;
      this.checked ? (Z.forEach(function(a) {
        c.querySelector(a).disabled = !1;
      }), u.disabled = !1, u.checked && (aa.forEach(function(a) {
        c.querySelector(a).disabled = !1;
      }), H.disabled = !1)) : (Z.forEach(function(a) {
        c.querySelector(a).disabled = !0;
      }), u.disabled = !0, aa.forEach(function(a) {
        c.querySelector(a).disabled = !0;
      }), H.disabled = !0);
      chrome.storage.local.set({selectquality:this.checked});
    });
    Z.forEach(function(a) {
      a = c.querySelector(a);
      a.value = b[a.id];
      a.disabled = !b.selectquality;
      a.addEventListener("change", g);
    });
    u.checked = b.selectqualityfullscreenon;
    u.addEventListener("click", function() {
      aa.forEach(function(a) {
        c.querySelector(a).disabled = !u.checked;
      });
      H.disabled = !this.checked;
      chrome.storage.local.set({selectqualityfullscreenon:this.checked});
    });
    aa.forEach(function(a) {
      a = c.querySelector(a);
      a.value = b[a.id];
      a.disabled = !b.selectqualityfullscreenon;
      a.addEventListener("change", g);
    });
    H.checked = b.selectqualityfullscreenoff;
    H.addEventListener("click", g);
    d = c.querySelector("#popuplayersize");
    d.value = b.popuplayersize;
    d.addEventListener("change", g);
    d = c.querySelector("#theatermode");
    d.checked = b.theatermode;
    d.addEventListener("click", function() {
      chrome.cookies.set({url:"https://www.youtube.com/watch", name:"wide", value:this.checked ? "1" : "0", domain:".youtube.com", path:"/", expirationDate:Math.floor(Date.now() / 1000) + 31556926});
      chrome.storage.local.set({theatermode:this.checked});
    });
    var ba = c.querySelector("#darktheme"), v = c.querySelectorAll('input[name="theme"]'), I = c.querySelector("#themevariant"), ia = c.querySelector("#customcolors"), ja = c.querySelector("#reset-custom-colors");
    e = c.querySelector("#customtheme");
    var J = c.querySelector("#customcssrules");
    y = c.querySelector("#customcssrules-btn");
    var ca = c.querySelector("#customcssrules-checkmark");
    d = v.length - 1;
    ba.checked = b.darktheme;
    for (ba.addEventListener("click", function() {
      v.forEach(function(a) {
        a.disabled = !ba.checked;
      });
      I.disabled = this.checked ? "youtube-deep-dark" === c.querySelector('input[name="theme"]:checked').value ? !1 : !0 : !0;
      c.querySelectorAll('#customcolors input[type="color"]').forEach(function(a) {
        a.disabled = !ba.checked;
      });
      ja.disabled = !this.checked;
      chrome.storage.local.set({darktheme:this.checked});
    }); 0 <= d; d--) {
      v[d].value === b.theme && (v[d].checked = !0), v[d].disabled = !b.darktheme, v[d].addEventListener("click", g), v[d].addEventListener("click", function() {
        I.disabled = "youtube-deep-dark" === this.value ? !1 : !0;
        ia.classList["youtube-deep-dark-custom" === this.value ? "remove" : "add"]("hidden");
      });
    }
    I.value = b.themevariant;
    I.disabled = b.darktheme ? "youtube-deep-dark" === b.theme ? !1 : !0 : !0;
    I.addEventListener("change", g);
    ia.classList["youtube-deep-dark-custom" === b.theme ? "remove" : "add"]("hidden");
    var z = ia.querySelectorAll('input[type="color"');
    O = b.customcolors;
    for (d = z.length - 1; 0 <= d; d--) {
      z[d].disabled = !b.darktheme, z[d].value = O[z[d].name], z[d].addEventListener("change", oa);
    }
    ja.disabled = !b.darktheme;
    ja.addEventListener("click", function() {
      var a = x.customcolors;
      z.forEach(function(h) {
        h.value = a[h.name];
      });
      oa();
    });
    e.checked = b.customtheme;
    e.addEventListener("click", function() {
      J.parentNode.classList[this.checked ? "remove" : "add"]("hidden");
      chrome.storage.local.set({customtheme:this.checked});
    });
    J.value = b.customcssrules;
    J.parentNode.classList[b.customtheme ? "remove" : "add"]("hidden");
    J.addEventListener("focus", function() {
      ca.classList.remove("show");
    });
    y.addEventListener("click", function() {
      ca.classList.add("show");
      chrome.storage.local.set({customcssrules:J.value});
    });
    ca.addEventListener("animationend", function(a) {
      "checkmark-scale" === a.animationName && setTimeout(function() {
        ca.classList.remove("show");
      }, 1200);
    });
    var ka = c.querySelector("#customscript");
    d = c.querySelector("#customscript-btn");
    var da = c.querySelector("#customscript-checkmark");
    ka.value = b.customscript;
    ka.addEventListener("focus", function() {
      da.classList.remove("show");
    });
    d.addEventListener("click", function() {
      da.classList.add("show");
      chrome.storage.local.set({customscript:ka.value});
    });
    da.addEventListener("animationend", function(a) {
      "checkmark-scale" === a.animationName && setTimeout(function() {
        da.classList.remove("show");
      }, 1200);
    });
    d = c.querySelector("#export-modal-btn");
    e = c.querySelector("#import-modal-btn");
    var m = c.querySelector("#backup-modal"), ya = m.querySelector(".close-modal"), za = m.querySelector("#export-modal-content"), Aa = m.querySelector("#export-textarea"), Ba = m.querySelector("#import-modal-content"), la = m.querySelector("#import-error"), Ca = m.querySelector("#import-textarea"), ma = m.querySelector("#import-btn"), na = m.querySelector("#copy-to-clipboard-btn"), K = m.querySelector("#copy-to-clipboard-checkmark");
    d.addEventListener("click", function() {
      za.classList.remove("hidden");
      na.classList.remove("hidden");
      K.classList.remove("hidden");
      qa(m);
      chrome.storage.local.get(null, function(a) {
        var h = {};
        h.version = chrome.runtime.getManifest().version;
        h.settings = {};
        Object.keys(x).forEach(function(f) {
          h.settings[f] = "undefined" === typeof a[f] ? x[f] : a[f];
        });
        Aa.value = JSON.stringify(h);
      });
    });
    e.addEventListener("click", function() {
      Ba.classList.remove("hidden");
      ma.classList.remove("hidden");
      qa(m);
    });
    ya.addEventListener("click", function() {
      Fa(m);
      setTimeout(function() {
        za.classList.add("hidden");
        Ba.classList.add("hidden");
        la.classList.add("hidden");
        ma.classList.add("hidden");
        na.classList.add("hidden");
        K.classList.add("hidden");
        Ca.value = "";
      }, 600);
    });
    na.addEventListener("click", function(a) {
      Aa.select();
      c.execCommand("copy");
      K.classList.add("show");
    });
    K.addEventListener("animationend", function(a) {
      "checkmark-scale" === a.animationName && setTimeout(function() {
        K.classList.remove("show");
      }, 1200);
    });
    ma.addEventListener("click", function() {
      var a = Ca.value.trim(), h = {};
      if ("" !== a) {
        try {
          a = JSON.parse(a);
        } catch (A) {
          la.classList.remove("hidden");
          return;
        }
        if ("object" === typeof a.settings) {
          if (a.version && /2\.0\.103/.test(a.version)) {
            "default-light" === a.settings.theme ? a.settings.theme = "default-dark" : a.settings.darktheme = !0;
          } else {
            if (a.version && /2\.0\.(9|10[0-1])/.test(a.version)) {
              try {
                a.settings.customcolors = x.customcolors;
                a.settings.customcssrules = a.settings.customtheme;
                a.settings.customtheme = "custom" === a.settings.theme ? !0 : !1;
                "default" === a.settings.theme || "custom" === a.settings.theme ? (a.settings.themevariant = "youtube-deep-dark.css", a.settings.theme = "default-dark") : (a.settings.themevariant = a.settings.theme, a.settings.theme = "youtube-deep-dark", a.settings.darktheme = !0);
                var f = [];
                f.push("loop");
                f.push("reverse-playlist");
                0 <= a.settings.toolbarbuttons.indexOf("boost") && f.push("volume-booster");
                f.push("not-interested");
                0 <= a.settings.toolbarbuttons.indexOf("cinema") && f.push("cinema-mode");
                0 <= a.settings.toolbarbuttons.indexOf("resize") && f.push("size");
                f.push("pop-up-player");
                0 <= a.settings.toolbarbuttons.indexOf("slowdown") && f.push("speed-minus");
                f.push("speed");
                0 <= a.settings.toolbarbuttons.indexOf("speedup") && f.push("speed-plus");
                f.push("video-filters");
                f.push("screenshot");
                f.push("keyboard-shortcuts");
                0 <= a.settings.toolbarbuttons.indexOf("script") && f.push("custom-script");
                0 <= a.settings.toolbarbuttons.indexOf("options") && f.push("options");
                a.settings.controls = f;
                a.settings.applyvideofilters = a.settings.enablefilters;
                a.settings.blockads = a.settings.removeads;
                a.settings.blockautoplay = a.settings.autopausevideos;
                a.settings.customscript = a.settings.script;
                a.settings.hidecardsendscreens = a.settings.removeannotations;
                a.settings.miniplayer = a.settings.pinnedplayer;
                a.settings.miniplayerposition = a.settings.pinnedplayerposition;
                a.settings.miniplayersize = a.settings.pinnedplayersize;
                a.settings.qualityembeds = a.settings.quality2;
                a.settings.qualityembedsfullscreen = a.settings.quality1;
                a.settings.qualityplaylists = a.settings.quality1;
                a.settings.qualityplaylistsfullscreen = a.settings.quality1;
                a.settings.qualityvideos = a.settings.quality1;
                a.settings.qualityvideosfullscreen = a.settings.quality1;
                a.settings.stopvideos = a.settings.disablepreloading;
                delete a.settings.autofocusevents;
                delete a.settings.autopausevideos;
                delete a.settings.disablepreloading;
                delete a.settings.enablefilters;
                delete a.settings.permissions;
                delete a.settings.pinnedplayer;
                delete a.settings.pinnedplayerposition;
                delete a.settings.pinnedplayersize;
                delete a.settings.quality1;
                delete a.settings.quality2;
                delete a.settings.quality3;
                delete a.settings.quality4;
                delete a.settings.removeads;
                delete a.settings.removeannotations;
                delete a.settings.script;
                delete a.settings.slideeffect;
                delete a.settings.toolbarbackgroundcolor;
                delete a.settings.toolbarbordercolor;
                delete a.settings.toolbarbuttons;
                delete a.settings.toolbarcolor;
                delete a.settings.toolbarcoloractive;
                delete a.settings.toolbaropacity;
                delete a.settings.toolbartooltips;
                delete a.settings.transparency;
                delete a.settings.visitor_info1_live;
              } catch (A) {
              }
            }
          }
          Object.keys(a.settings).forEach(function(A) {
            typeof x[A] === typeof a.settings[A] && (h[A] = a.settings[A]);
          });
          chrome.storage.local.clear(function() {
            chrome.runtime.lastError && (c.documentElement.dataset.e = 1);
            chrome.storage.local.set(h, function() {
              window.scrollTo(0, 0);
              c.location.reload();
            });
          });
        } else {
          la.classList.remove("hidden");
        }
      }
    });
    c.addEventListener("keydown", function(a) {
      27 === a.keyCode && ya.click();
    });
  });
  chrome.storage.onChanged.addListener(function(b, d) {
    for (var e in b) {
      if ("undefined" !== typeof b[e].newValue) {
        if ("whitelist" === e && b[e].newValue !== k.toString()) {
          k = "" !== b[e].newValue ? b[e].newValue.split(",") : [], L();
        } else {
          if ("darktheme" === e && b[e].newValue !== c.querySelector("#darktheme").checked) {
            c.querySelector("#darktheme").click();
          } else {
            if ("theme" === e && b[e].newValue !== c.querySelector('input[name="theme"]:checked').value) {
              c.querySelector(`input[name="theme"][value="${b[e].newValue}"]`).checked = !0, c.querySelector("#themevariant").disabled = "youtube-deep-dark" === b[e].newValue ? !1 : !0, c.querySelector("#customcolors").classList["youtube-deep-dark-custom" === b[e].newValue ? "remove" : "add"]("hidden");
            } else {
              if ("customtheme" === e) {
                d = c.querySelector("#customtheme");
                var n = c.querySelector("#customcssrules");
                d.checked !== b[e].newValue && (d.checked = b[e].newValue, n.parentNode.classList[b[e].newValue ? "remove" : "add"]("hidden"));
              }
            }
          }
        }
      }
    }
  });
})(document);