#!/bin/bash

# Docker

alias dlist='docker ps -a'
alias dc='docker compose'
alias dkillall='docker kill $(docker ps -q)'
alias drmall='docker rm $(docker ps -a -q)'
alias drmiall='docker rmi $(docker images -q)'
