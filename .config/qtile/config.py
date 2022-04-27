# Copyright (c) 2010 Aldo Cortes1
# Copyright (c) 2010, 2014 dequis
# Copyright (c) 2012 Randall Ma
# Copyright (c) 2012-2014 Tycho Andersen
# Copyright (c) 2012 Craig Barnes
# Copyright (c) 2013 horsik
# Copyright (c) 2013 Tao Sauvage
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.

from libqtile import qtile
from libqtile import bar, layout, widget
from libqtile.config import Click, Drag, Group, Key, Match, Screen
from libqtile.lazy import lazy
from libqtile.utils import guess_terminal
import os
import owm
import subprocess
from libqtile import hook

#Importing owm
ww = owm.OpenWeatherMap(
    api_key="...",
    latitude=-25.2,
    longitude=-57.5,
    icon_font="Material Design Icons",
)

#Autostart apps
@hook.subscribe.startup
def autostart():
    home = os.path.expanduser('~/.config/qtile/autostart.sh')
    subprocess.run([home])

def open_rofi(qtile):
    qtile.cmd_spawn("~/.config/rofi/launchers/misc/launcher.sh")


mod = "mod4"
terminal = guess_terminal()

keys = [

    ###Setting media keys###

    Key([], "XF86AudioMute", lazy.spawn("amixer -q sset PCM toggle")),
    Key([], "XF86AudioLowerVolume", lazy.spawn("sh /home/angel/volume/volume.sh down")),
    Key([], "XF86AudioRaiseVolume", lazy.spawn("sh /home/angel/volume/volume.sh up")),
    Key([], "XF86AudioPlay", lazy.spawn("playerctl --player spotify play-pause")),
    Key([], "XF86AudioPrev", lazy.spawn("playerctl previous")),
    Key([], "XF86AudioNext", lazy.spawn("playerctl next")),



    # A list of available commands that can be bound to keys can be found
    # at https://docs.qtile.org/en/latest/manual/config/lazy.html
    # Switch between windows

    Key([mod], "h", lazy.layout.left(), desc="Move focus to left"),
    Key([mod], "l", lazy.layout.right(), desc="Move focus to right"),
    Key([mod], "j", lazy.layout.down(), desc="Move focus down"),
    Key([mod], "k", lazy.layout.up(), desc="Move focus up"),
    Key([mod], "space", lazy.layout.next(), desc="Move window focus to other window"),

    # Move windows between left/right columns or move up/down in current stack.
    # Moving out of range in Columns layout will create new column.

    Key([mod, "shift"], "h", lazy.layout.shuffle_left(), desc="Move window to the left"),
    Key([mod, "shift"], "l", lazy.layout.shuffle_right(), desc="Move window to the right"),
    Key([mod, "shift"], "j", lazy.layout.shuffle_down(), desc="Move window down"),
    Key([mod, "shift"], "k", lazy.layout.shuffle_up(), desc="Move window up"),

    # Grow windows. If current window is on the edge of screen and direction
    # will be to screen edge - window would shrink.

    Key([mod, "control"], "h", lazy.layout.grow_left(), desc="Grow window to the left"),
    Key([mod, "control"], "l", lazy.layout.grow_right(), desc="Grow window to the right"),
    Key([mod, "control"], "j", lazy.layout.grow_down(), desc="Grow window down"),
    Key([mod, "control"], "k", lazy.layout.grow_up(), desc="Grow window up"),
    Key([mod], "n", lazy.layout.normalize(), desc="Reset all window sizes"),

    # Toggle between split and unsplit sides of stack.
    # Split = all windows displayed
    # Unsplit = 1 window displayed, like Max layout, but still with
    # multiple stack panes

    Key(
        [mod, "shift"],
        "Return",
        lazy.layout.toggle_split(),
        desc="Toggle between split and unsplit sides of stack",
    ),

    Key([mod], "Return", lazy.spawn(terminal), desc="Launch terminal"),

    # Toggle between different layouts as defined below

    Key([mod], "Tab", lazy.next_layout(), desc="Toggle between layouts"),
    Key([mod], "w", lazy.window.kill(), desc="Kill focused window"),
    Key([mod, "control"], "r", lazy.reload_config(), desc="Reload the config"),
    Key([mod, "control"], "q", lazy.shutdown(), desc="Shutdown Qtile"),
    Key([], "Alt_L", lazy.spawn("rofi -show window"), desc="change window"),
    Key([], "F1", lazy.spawn("sh /home/angel/.config/rofi/powermenu/powermenu.sh"), desc="Shows emojis"),
    Key([mod], "p", lazy.spawn("rofi -show emoji"), desc="Shows emojis"),
    Key([mod], "r", lazy.spawn("sh /home/angel/.config/rofi/launchers/misc/launcher.sh"), desc="Spawn a command using a prompt widget"),
    Key([mod, "shift"], "s", lazy.spawn("sh /home/angel/.config/rofi/applets/applets/screenshot.sh") )
]

##### GROUPS #####

group_names = [("一", {'layout': 'max'}),
               ("二", {'layout': 'max'}),
               ("三", {'layout': 'max'}),
               ("四", {'layout': 'max'}),
               ("五", {'layout': 'max'}),
               ("六", {'layout': 'max'}),
               ("七", {'layout': 'max'})]

groups = [Group(name, **kwargs) for name, kwargs in group_names]

for i, (name, kwargs) in enumerate(group_names, 1):
    keys.append(Key([mod], str(i), lazy.group[name].toscreen()))        # Switch to another group
    keys.append(Key([mod, "shift"], str(i), lazy.window.togroup(name))) # Send current window to another group	

    ####mouse callbacks####
def clock_menu():
    qtile.cmd_spawn("sh /home/angel/.config/rofi/applets/applets/time.sh")

     ####colors####
bg = "#21232cbf"
bg_widget = "#80808000"
fg_group = "#737373"
fg = "#d9d9d9"
accent = "#ff0066"

layouts = [
    layout.Max(),
    layout.Columns(border_focus = accent , border_width = 1, margin = 4)
]

widget_defaults = dict(
    font="RobotoMono Nerd Font",
    fontsize=15,
    padding=5,
    opacity=0.4,
)
extension_defaults = widget_defaults.copy()





screens = [
    Screen(
        top=bar.Bar(    
            [
           
                widget.GroupBox(
                    block_highlight_text_color = "#000000",
                    fontsize = 18,
                    margin_x = 20,
                    highlight_method='line',
                    borderwidth = 0,
                    highlight_color = [accent, accent],
                    active = fg,
                    inactive = fg_group,
                ),

                widget.Spacer(length=20),

                widget.CurrentLayoutIcon(
                    foregrount = fg,
                    scale = 0.6,
                ),              
                widget.CurrentLayout(
                    foregrount = fg,
                    ),

                                


                widget.Spacer(
                    length = bar.STRETCH
                ),





                widget.Mpris2(
                    name='spotify',
                    objname="org.mpris.MediaPlayer2.spotify",
                    display_metadata=['xesam:title', 'xesam:artist'],
                    stop_pause_text = 'Player paused',
                    scroll_interval = 0.3,
                    update_interval = 1.0,
                ), 


                widget.Systray(padding = 17),
                widget.Spacer(length=25),

                widget.CheckUpdates(
                   update_interval = 180,
                   colour_no_updates = fg,
                   colour_have_updates = accent,
                   display_format = 'ﮮ{updates}',
                   distro = "Arch",
                   execute = "sudo pacman -Syu &",
                   fontsize = 17,
                   no_update_string = 'ﮮ',
                ),
                widget.Spacer(length = 10),

                widget.TextBox(text = "", fontsize = 17, mouse_callbacks = {'Button1': lazy.spawn("sh /home/angel/.config/rofi/applets/applets/network.sh")}),
                widget.Spacer(length = 10),

                widget.TextBox(text = "", fontsize = 17),
                widget.Spacer(length = 10),

                widget.TextBox(fontsize = 17, text = "", mouse_callbacks = {'Button1': lazy.spawn("sh /home/angel/.config/rofi/applets/applets/screenshot.sh")}),

                widget.Spacer(length=25),
                
                widget.Clock(
                    format="%I:%M %p",
                    foreground = fg,
                    mouse_callbacks = {'Button1': clock_menu},
                ),
                widget.Spacer(length=10),
                
                
            ], 24, background = bg),
    ),
]

# Drag floating layouts.
mouse = [
    Drag([mod], "Button1", lazy.window.set_position_floating(), start=lazy.window.get_position()),
    Drag([mod], "Button3", lazy.window.set_size_floating(), start=lazy.window.get_size()),
    Click([mod], "Button2", lazy.window.bring_to_front()),
]

dgroups_key_binder = None
dgroups_app_rules = []  # type: list
follow_mouse_focus = True
bring_front_click = False
cursor_warp = False
floating_layout = layout.Floating(
    border_width=0,
    float_rules=[
        # Run the utility of `xprop` to see the wm class and name of an X client.
        *layout.Floating.default_float_rules,
        Match(wm_class="confirmreset"),  # gitk
        Match(wm_class="makebranch"),  # gitk
        Match(wm_class="maketag"),  # gitk
        Match(wm_class="ssh-askpass"),  # ssh-askpass
        Match(title="branchdialog"),  # gitk
        Match(title="pinentry"),  # GPG key password entry
    ]
)
auto_fullscreen = True
focus_on_window_activation = "smart"
reconfigure_screens = True

# If things like steam games want to auto-minimize themselves when losing
# focus, should we respect this or not?
auto_minimize = True

# When using the Wayland backend, this can be used to configure input devices.
wl_input_rules = None

# XXX: Gasp! We're lying here. In fact, nobody really uses or cares about this
# string besides java UI toolkits; you can see several discussions on the
# mailing lists, GitHub issues, and other WM documentation that suggest setting
# this string if your java app doesn't work correctly. We may as well just lie
# and say that we're a working one by default.
#
# We choose LG3D to maximize irony: it is a 3D non-reparenting WM written in
# java that happens to be on java's whitelist.
wmname = "LG3D"
