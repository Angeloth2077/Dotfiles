#!/bin/sh
picom --experimental-backends -b
udo timedatectl set-ntp 1
nitrogen --restore
xinput set-prop 'Logitech G502 HERO Gaming Mouse' 'libinput Accel Speed' -0.4
udiskie &
flameshot &
