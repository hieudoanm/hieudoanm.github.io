#!/bin/bash

# MacOS

# Brew

function brew-update() {
  brew update
  brew upgrade
  brew cleanup
}

function print-env() {
  lines=$(printenv);
  IFS=$'\n' sorted=$(sort <<< "${lines[*]}");
  unset IFS;
  printf "%s" "${sorted[@]}";
}

alias delete-ds-store="find . -name ".DS_Store" -delete"
alias kill-port='sudo lsof -i tcp:'
alias hex='openssl rand -hex 32'
