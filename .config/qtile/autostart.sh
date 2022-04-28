#!/bin/sh
picom --experimental-backends -b
setxkbmap -option caps:swapescape
udo timedatectl set-ntp 1
xinput set-prop 'Logitech G502 HERO Gaming Mouse' 'libinput Accel Speed' -0.5
udiskie &
variety &
