#!/bin/bash

# Brew

function brew-update() {
  brew update
  brew upgrade
  brew cleanup
}
