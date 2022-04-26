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
  function p() {
    chrome.windows.getAll({populate:!0}, function(b) {
      b.forEach(function(a) {
        a.tabs.forEach(function(c) {
          chrome.tabs.executeScript(c.id, {file:"init.js"}, function(h) {
            chrome.runtime.lastError && (document.documentElement.dataset.e = 1);
          });
        });
      });
    });
  }
  function q(b) {
    chrome.windows.getAll({populate:!0}, function(a) {
      a.forEach(function(c) {
        c.tabs.forEach(function(h) {
          chrome.tabs.sendMessage(h.id, b, function(k) {
            chrome.runtime.lastError && (document.documentElement.dataset.e = 1);
          });
        });
      });
    });
  }
  function r(b) {
    chrome.cookies.get({url:"https://www.youtube.com", name:"PREF"}, function(a) {
      a = a ? a.value.split("&") : [];
      if (b.autoplay) {
        var c = a.findIndex(function(h) {
          return /f5=[\w\d]+/.test(h);
        });
        -1 === c && (c = a.length);
        a[c] = b.autoplay;
      }
      0 < a.length && chrome.cookies.set({url:"https://www.youtube.com", name:"PREF", value:a.join("&"), domain:".youtube.com", path:"/", expirationDate:Math.floor(Date.now() / 1000) + 31556926});
    });
  }
  chrome.runtime.onInstalled.addListener(function(b) {
    "install" === b.reason ? (chrome.runtime.openOptionsPage(), chrome.tabs.create({url:"https://www.mrfdev.com/event?n=install&b=opera&e=enhancer-for-youtube&v=" + chrome.runtime.getManifest().version, active:!0}), m = Date.now(), chrome.storage.local.set({date:m}), p()) : "update" === b.reason && /2\.0\.103/.test(b.previousVersion) ? chrome.storage.local.get({theme:"default-light"}, function(a) {
      "default-light" === a.theme ? a.theme = "default-dark" : a.darktheme = !0;
      a.controlbar = {active:!1, autohide:!1, centered:!0, position:"absolute", };
      a.update = Date.now();
      a.message = !0;
      a.reload = !0;
      chrome.storage.local.set(a);
    }) : "update" === b.reason && /2\.0\.(9|10[0-1])/.test(b.previousVersion) && chrome.storage.local.get({autopausevideos:!0, customtheme:"", disablepreloading:!1, enablefilters:!1, pinnedplayer:!0, pinnedplayerposition:"_top-left", pinnedplayersize:"_400x225", quality1:"hd1080", quality2:"hd720", removeads:!1, removeannotations:!1, slideeffect:!1, theme:"default", toolbarbuttons:"clean,cinema,resize,detach,boost,loop,slowdown,speed,speedup,filters,script", script:""}, function(a) {
      a.customcolors = {"--main-color":"#00adee", "--main-background":"#111111", "--second-background":"#181818", "--hover-background":"#232323", "--main-text":"#eff0f1", "--dimmer-text":"#cccccc", "--shadow":"#000000"};
      a.customcssrules = a.customtheme;
      a.customtheme = "custom" === a.theme ? !0 : !1;
      "default" === a.theme || "custom" === a.theme ? (a.themevariant = "youtube-deep-dark.css", a.theme = "default-dark") : (a.themevariant = a.theme, a.theme = "youtube-deep-dark", a.darktheme = !0);
      a.controlbar = {active:!0, autohide:a.slideeffect, centered:!0, position:"fixed", };
      delete a.slideeffect;
      a.controls = [];
      a.controls.push("loop");
      a.controls.push("reverse-playlist");
      0 <= a.toolbarbuttons.indexOf("boost") && a.controls.push("volume-booster");
      a.controls.push("whitelist");
      a.controls.push("not-interested");
      a.controls.push("cards-end-screens");
      0 <= a.toolbarbuttons.indexOf("cinema") && a.controls.push("cinema-mode");
      0 <= a.toolbarbuttons.indexOf("resize") && a.controls.push("size");
      a.controls.push("pop-up-player");
      0 <= a.toolbarbuttons.indexOf("slowdown") && a.controls.push("speed-minus");
      a.controls.push("speed");
      0 <= a.toolbarbuttons.indexOf("speedup") && a.controls.push("speed-plus");
      a.controls.push("video-filters");
      a.controls.push("screenshot");
      a.controls.push("keyboard-shortcuts");
      0 <= a.toolbarbuttons.indexOf("script") && a.controls.push("custom-script");
      0 <= a.toolbarbuttons.indexOf("options") && a.controls.push("options");
      delete a.toolbarbuttons;
      a.applyvideofilters = a.enablefilters;
      delete a.enablefilters;
      a.blockads = a.removeads;
      delete a.removeads;
      a.blockautoplay = a.autopausevideos;
      delete a.autopausevideos;
      a.customscript = a.script;
      delete a.script;
      a.hidecardsendscreens = a.removeannotations;
      delete a.removeannotations;
      a.miniplayer = a.pinnedplayer;
      delete a.pinnedplayer;
      a.miniplayerposition = a.pinnedplayerposition;
      delete a.pinnedplayerposition;
      a.miniplayersize = a.pinnedplayersize;
      delete a.pinnedplayersize;
      a.qualityembeds = a.quality2;
      a.qualityembedsfullscreen = a.quality1;
      a.qualityplaylists = a.quality1;
      a.qualityplaylistsfullscreen = a.quality1;
      a.qualityvideos = a.quality1;
      a.qualityvideosfullscreen = a.quality1;
      delete a.quality1;
      delete a.quality2;
      a.stopvideos = a.disablepreloading;
      delete a.disablepreloading;
      a.update = Date.now();
      a.message = !0;
      a.reload = !0;
      chrome.storage.local.set(a);
      chrome.storage.local.remove("autofocusevents autopausevideos disablepreloading enablefilters permissions pinnedplayer pinnedplayerposition pinnedplayersize quality1 quality2 quality3 quality4 removeads removeannotations script slideeffect toolbarbackgroundcolor toolbarbordercolor toolbarbuttons toolbarcolor toolbarcoloractive toolbaropacity toolbartooltips transparency visitor_info1_live".split(" "));
    });
    "update" === b.reason && p();
  });
  chrome.runtime.setUninstallURL("https://www.mrfdev.com/event?n=uninstall&b=opera&e=enhancer-for-youtube&v=" + chrome.runtime.getManifest().version + "&d=" + m + "-" + Date.now());
  chrome.runtime.onMessage.addListener(function(b, a, c) {
    c = b.request;
    if ("get-messages" === c) {
      var h = chrome.i18n.getMessage("locale_code"), k = "add_to_whitelist boost_volume brightness cinema_mode color_inversion contrast custom_script expand flip_horizontally flip_vertically gaussian_blur grayscale hue_rotation keyboard_shortcuts loop loop_end loop_start message options pop_up_player remove_ads remove_from_whitelist reset reverse_playlist saturation screenshot sepia shrink skip_ads speed stop toggle_visibility video_filters".split(" ");
      chrome.storage.local.get({localecode:h}, function(d) {
        var e = {};
        if (h === d.localecode) {
          for (d = k.length - 1; 0 <= d; d--) {
            e[k[d]] = chrome.i18n.getMessage(k[d]);
          }
          chrome.tabs.sendMessage(a.tab.id, {message:"set-messages", messages:e}, function(g) {
            chrome.runtime.lastError && (document.documentElement.dataset.e = 1);
          });
        } else {
          fetch(`_locales/${d.localecode}/messages.json`).then(function(g) {
            return g.json();
          }).then(function(g) {
            for (var f = k.length - 1; 0 <= f; f--) {
              e[k[f]] = g[k[f]].message;
            }
            chrome.tabs.sendMessage(a.tab.id, {message:"set-messages", messages:e}, function(u) {
              chrome.runtime.lastError && (document.documentElement.dataset.e = 1);
            });
          });
        }
      });
      n && (n = !1, chrome.tabs.query({url:"https://www.youtube.com/*", windowType:"normal"}, function(d) {
        if (0 < d.length) {
          for (var e = d[0].index + 1, g = d[0].windowId, f = d.length - 1; 0 <= f; f--) {
            d[f].active && (e = d[f].index + 1, g = d[f].windowId);
          }
          chrome.tabs.create({url:"options.html", windowId:g, index:e, active:!1});
          chrome.storage.local.remove("openOptionsPage");
        }
      }));
    } else {
      if ("pause-videos" === c) {
        q({message:"pause-video"});
      } else {
        if ("set-cookie" === c) {
          chrome.cookies.set({url:b.url, name:b.name, value:b.value, domain:".youtube.com", path:"/", expirationDate:Math.floor(Date.now() / 1000) + 31556926});
        } else {
          if ("pop-up-player" === c) {
            c = "https://www.youtube.com/pop-up-player/";
            var t = l.popuplayersize.split("x");
            b.playlist ? (window.playlist = b.params, c += b.params.videos[b.params.index] + "?autoplay=0&playlist") : c += b.params;
            chrome.windows.create({url:c, type:"popup", height:parseInt(t[1], 10) + 9 + 30, width:parseInt(t[0], 10) + 16, incognito:b.incognito, focused:!0}, function(d) {
              chrome.windows.update(d.id, {drawAttention:!0});
            });
          } else {
            "playlist" === c ? chrome.tabs.sendMessage(a.tab.id, {message:"playlist", playlist:window.playlist}, function(d) {
              chrome.runtime.lastError && (document.documentElement.dataset.e = 1);
              delete window.playlist;
            }) : "configure-keyboard-shortcuts" === c ? chrome.tabs.create({url:"opera://settings/keyboardShortcuts", active:!0}) : "keyboard-shortcuts" === c ? chrome.tabs.create({url:"https://www.mrfdev.com/youtube-keyboard-shortcuts", active:!0}) : "always-on-top" === c ? chrome.tabs.create({url:"https://www.mrfdev.com/always-on-top", active:!0}) : "content-scripts" === c ? (chrome.tabs.executeScript(a.tab.id, {file:"start.js"}), chrome.tabs.executeScript(a.tab.id, {file:"content.js"})) : "custom-script" === 
            c ? chrome.storage.local.get({customscript:""}, function(d) {
              chrome.tabs.sendMessage(a.tab.id, {message:"custom-script", customscript:d.customscript}, function(e) {
                chrome.runtime.lastError && (document.documentElement.dataset.e = 1);
              });
            }) : "whitelist" === c ? chrome.storage.local.get({whitelist:""}, function(d) {
              d = "" !== d.whitelist ? d.whitelist.split(",") : [];
              var e = b.channel.replace(/,/g, "").trim();
              if ("add" === b.action && 0 > d.indexOf(e)) {
                d.push(e);
                try {
                  d.sort(function(g, f) {
                    return g.localeCompare(f);
                  });
                } catch (g) {
                  d.sort();
                }
              } else {
                "remove" === b.action && (e = d.indexOf(e), -1 !== e && d.splice(e, 1));
              }
              chrome.storage.local.set({whitelist:d.toString()});
            }) : "dark-theme-off" === c ? chrome.storage.local.get({darktheme:!1}, function(d) {
              d.darktheme && chrome.storage.local.set({darktheme:!1});
            }) : "options-page" === c ? chrome.runtime.openOptionsPage() : "message-page" === c && chrome.storage.local.set({message:!1}, function() {
              chrome.runtime.openOptionsPage();
              /2\.0\.104/.test(chrome.runtime.getManifest().version) ? chrome.tabs.create({url:"update.html", active:!0}) : chrome.tabs.create({url:"message.html", active:!0});
            });
          }
        }
      }
    }
  });
  chrome.storage.onChanged.addListener(function(b, a) {
    for (var c in b) {
      "undefined" !== typeof b[c].newValue && ("customscript" !== c && "popuplayersize" !== c && q({message:"preference-changed", name:c, value:b[c].newValue}), "disableautoplay" === c ? r({autoplay:!0 === b[c].newValue ? "f5=30000" : "f5=20000"}) : "popuplayersize" === c && (l.popuplayersize = b[c].newValue));
    }
  });
  chrome.commands.onCommand.addListener(function(b) {
    var a = {"c070-toggle-loop":"loop", "c080-stop-video":"stop", "c090-reverse-playlist":"reverse-playlist", "c100-toggle-volume-booster":"volume-booster", "c110-whitelist":"whitelist", "c120-clear-ads":"not-interested", "c130-toggle-annotations":"cards-end-screens", "c140-toggle-cinema-mode":"cinema-mode", "c150-toggle-player-size":"size", "c160-center-video-player":"size", "c170-pop-up-player":"pop-up-player", "c180-decrease-speed":"speed-minus", "c190-increase-speed":"speed-plus", "c200-default-speed":"speed", 
    "c210-normal-speed":"speed", "c220-toggle-video-filters":"video-filters", "c230-flip-horizontally":"flip-horizontally", "c240-flip-vertically":"flip-vertically", "c250-take-screenshot":"screenshot", "c260-keyboard-shortcuts":"keyboard-shortcuts", "c270-custom-script":"custom-script"};
    switch(b) {
      case "c000-options-page":
        chrome.runtime.openOptionsPage();
        break;
      case "c020-theme-youtube-dark":
        chrome.storage.local.set({darktheme:!0, theme:"default-dark"});
        break;
      case "c030-theme-youtube-deep-dark":
        chrome.storage.local.set({darktheme:!0, theme:"youtube-deep-dark"});
        break;
      case "c040-theme-youtube-deep-dark-custom":
        chrome.storage.local.set({darktheme:!0, theme:"youtube-deep-dark-custom"});
        break;
      case "c050-theme-custom-theme":
        chrome.storage.local.get({customtheme:!1}, function(c) {
          chrome.storage.local.set({customtheme:!c.customtheme});
        });
        break;
      default:
        chrome.tabs.query({lastFocusedWindow:!0, active:!0}, function(c) {
          chrome.tabs.sendMessage(c[0].id, {message:"command", command:b, control:a[b] ? a[b] : ""}, function(h) {
            chrome.runtime.lastError && (document.documentElement.dataset.e = 1);
          });
        });
    }
  });
  chrome.browserAction.onClicked.addListener(function(b) {
    chrome.runtime.openOptionsPage();
  });
  var m, l = {date:Date.now(), disableautoplay:!1, popuplayersize:"640x360", theatermode:!1};
  chrome.storage.local.get(l, function(b) {
    l = b;
    m = l.date;
    l.disableautoplay && r({autoplay:"f5=30000"});
    l.theatermode && chrome.cookies.set({url:"https://www.youtube.com", name:"wide", value:"1", domain:".youtube.com", path:"/", expirationDate:Math.floor(Date.now() / 1000) + 31556926});
  });
  var n;
  chrome.storage.local.get({openOptionsPage:!1}, function(b) {
    n = b.openOptionsPage;
  });
})();