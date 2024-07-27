#!/bin/bash

function self-help() {
  # Docker
  echo 'dlist'
  # Heroku
  echo 'heroku-logs'
  echo 'heroku-open'
  echo 'heroku-restart'
  # Install
  echo 'install-dotnet'
  echo 'install-go'
  echo 'install-jenkins'
  echo 'install-nginx'
  echo 'install-sdkman'
  echo 'install-typescript'
  # Pip
  echo 'pip-install'
  # Terraform
  echo 'tf'
  echo 'tf-init'
  echo 'tf-apply'
  echo 'tf-destroy'
  echo 'tf-fmt'
  echo 'tf-validate'
  echo 'tf-show'
  echo 'tf-state-list'
  echo 'tf-output'
  # Update
  echo 'update-apt'
  echo 'update-brew'
  echo 'update-yarn'
  echo 'update-yum'
  # Utils
  echo 'go-build'
  echo 'kill-port'
}

alias self-version='echo "HIEU - 0.0.1"'

# Docker

alias dlist='docker ps -a'
alias dc='docker-compose'
alias dkillall='docker kill $(docker ps -q)'
alias drmall='docker rm $(docker ps -a -q)'
alias drmiall='docker rmi $(docker images -q)'

# Heroku

alias heroku-logs='heroku logs --tail --app '
alias heroku-open='heroku apps:open --app '
alias heroku-restart='heroku ps:restart web.1 --app '

# Install

# install-dotnet
function install-dotnet() {
  wget https://packages.microsoft.com/config/ubuntu/20.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
  sudo dpkg -i packages-microsoft-prod.deb
  sudo apt-get update
  sudo apt-get install dotnet-sdk-5.0 -y
}

# install-go
function install-go() {
  go get -v golang.org/x/tools/gopls
  go get -v github.com/uudashr/gopkgs/v2/cmd/gopkgs
  go get -v github.com/ramya-rao-a/go-outline
  go get -v github.com/cweill/gotests/gotests
  go get -v github.com/fatih/gomodifytags
  go get -v github.com/josharian/impl
  go get -v github.com/haya14busa/goplay/cmd/goplay
  go get -v github.com/go-delve/delve/cmd/dlv
  go get -v github.com/go-delve/delve/cmd/dlv@master
  go get -v honnef.co/go/tools/cmd/staticcheck
  go get -v golang.org/x/tools/gopls
}

# install-jenkins
function install-jenkins() {
  # Add the key to your system
  wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
  # Add a Jenkins apt repository entry
  sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list'
  # Update your local package index
  sudo apt-get update
  # Install Jenkins
  sudo apt-get install jenkins -y
}

# install-nginx
function install-nginx() {
  if [$1 == 'amazon']; then
    install-terraform-amazon
  else
    install-terraform-ubuntu
  fi
}

# install-nginx-amazon
function install-nginx-amazon() {
  sudo yum install epel-release
  sudo yum install nginx
}

function install-nginx-ubuntu() {
  sudo apt-get update
  sudo apt-get install nginx -y
  ps aux | grep nginx
}

function install-sdkman() {
  ## Download install script
  wget -O sdk.install.sh 'https://get.sdkman.io'
  ## Run install script
  bash sdk.install.sh
  ## Set up PATH
  source ~/.sdkman/bin/sdkman-init.sh
}

function install-terraform() {
  if [$1 == 'amazon']; then
    install-terraform-amazon
  elif [$1 == 'macox']; then
    install-terraform-macox
  else
    install-terraform-ubuntu
  fi
}

function install-terraform-amazon() {
  # Install yum-config-manager to manage your repositories.
  sudo yum install -y yum-utils
  # Use yum-config-manager to add the official HashiCorp Linux repository.
  sudo yum-config-manager --add-repo https://rpm.releases.hashicorp.com/AmazonLinux/hashicorp.repo
  # Install
  sudo yum -y install terraform
  # Verify the installation
  terraform -v
}

function install-terraform-macox() {
  # First, install the HashiCorp tap, a repository of all our Homebrew packages.
  brew tap hashicorp/tap
  # Now, install Terraform with hashicorp/tap/terraform.
  brew install hashicorp/tap/terraform
  # To update to the latest version of Terraform, first update Homebrew.
  brew update
  # Then, run the upgrade command to download and use the latest Terraform version.
  brew upgrade hashicorp/tap/terraform
  # Verify the installation
  terraform -v
}

function install-terraform-ubuntu() {
  sudo apt-get update && sudo apt-get install -y gnupg software-properties-common curl
  # Add the HashiCorp GPG key.
  curl -fsSL https://apt.releases.hashicorp.com/gpg | sudo apt-key add -
  # Add the official HashiCorp Linux repository.
  sudo apt-add-repository 'deb [arch=amd64] https://apt.releases.hashicorp.com $(lsb_release -cs) main'
  # Update to add the repository, and install the Terraform CLI.
  sudo apt-get update && sudo apt-get install terraform
  # Verify the installation
  terraform -help
}

alias install-typescript='sudo npm install -g @types/node ts-node typescript'

# Terraform

alias tf='terraform'
alias tf-init='terraform init '
alias tf-apply='terraform apply '
alias tf-destroy='terraform destroy '
alias tf-fmt='terraform fmt '
alias tf-validate='terraform validate '
alias tf-show='terraform show '
alias tf-state-list='terraform state list '
alias tf-output='terraform output '

# Update

function update-apt() {
  sudo apt-get update
  sudo apt autoremove
}

function brew-update {
  brew update
  brew upgrade
  brew cleanup
}

function update-yarn() {
  yarn global upgrade --latest
  yarn global list
}

function update-yum() {
  yum update
  yum autoremove
}

# Util

function go-build() {
  go build -o $1
}

function kill-port() {
  sudo lsof -i tcp:$1
}

# Git

function gcloneall() {
  username="hieudoanm"
  folders=(
    "hieudoanm"
    "hieudoanm.github.io"
  )
  for folder in "${folders[@]}"
  do
    echo "----- $folder -----";
    git clone git@github.com:$username/$folder.git
  done
}

function gcommitall() {
  for folder in $(ls -d */)
  do
    if [ -d "$folder" ]; then
        echo "----- $folder -----";
        cd $folder;
        git add -A;
        git status;
        git commit -m '$1';
        git push
        cd ..;
    fi
  done
}

function gpullall() {
  for folder in $(ls -d */)
  do
    if [ -d "$folder" ]; then
      echo "----- $folder -----";
      cd $folder;
      git checkout master;
      git fetch origin master;
      git pull origin master;
      cd ..;
    fi
  done
}

function gcurrent() {
  echo `git branch | sed -n '/\* /s///p'`
}

# gpushtag <tag-name>
function gpushtag() {
  git checkout main
  git tag -a $1 -m 'v$1'
  git push origin $1
}

# gtags <filter-string>
function gtags() {
  TAGS=`git tag | grep $1`
  echo $TAGS
}

# gtagdelete <branch-name>
function gdeltag() {
  git tag -d $1
  git push origin :refs/tags/$1
}

# gfetch <branch-name>
function gfetch() {
  git fetch --prune origin $1
}

# gpull <branch-name>
# function gpull() {
#   git pull --prune origin $1
# }

# gpush <branch-name>
# function gpush() {
#   BRANCH=$(gcurrent)
#   echo 'Current git branch $BRANCH'
#   git push origin $BRANCH
# }

# gpushf <branch-name>
function gpushf() {
  BRANCH=$(gcurrent)
  echo "Current git branch $BRANCH"
  git push origin $BRANCH -f
}

# gbranch <branch-name>
function gbranch() {
  git branch $1
  git checkout $1
  git push --set-upstream origin $1
}

# gdelbranch <branch-name>
function gdelbranch() {
  git branch -d $1
  git branch -D $1
  git push origin -d -f $1
}

# gstashrebase
function gstashrebase() {
  BRANCH=$(gcurrent)
  echo "Current git branch $BRANCH"
  git stash
  git checkout master
  git pull origin master
  git checkout $BRANCH
  git rebase master
  git stash apply
}

# greset
function greset() {
  git reset --hard
  git clean -df
}

# grebase <branch-name>
function grebase() {
  DEST_BRANCH=$1
  BRANCH=$(gcurrent)
  git checkout $DEST_BRANCH
  git pull --rebase origin $DEST_BRANCH
  git checkout $BRANCH
  git rebase $DEST_BRANCH
}

# gmerge <branch-name>
function gmerge() {
  DEST_BRANCH=$1
  BRANCH=$(gcurrent)
  git checkout $DEST_BRANCH
  git merge --squash $BRANCH
  git commit -m "Merge branch $BRANCH"
  git push origin $DEST_BRANCH
}

# gclrhst <branch-name>
function gclrhst() {
	CURRENT=$(git rev-parse --abbrev-ref HEAD)
	echo $CURRENT
  BRANCH=${1:-"$CURRENT"}
	echo $BRANCH
  git checkout --orphan new-$BRANCH # create a temporary branch
  git add -A  # Add all files and commit them
  git commit -m 'initial'
  git branch -D $BRANCH # Deletes the master branch
  git branch -m $BRANCH # Rename the current branch to master
  git push -f --set-upstream origin $BRANCH # Force push master branch to Git server
}

# gremoteupdate
function gremoteupdate() {
  git remote -v
	git remote set-url origin "$1"
	git remote -v
}

# Aliases for git commands
alias ga='git add'
alias gco='git commit -am'
alias gclean="git clean -df"
alias gdh="git diff HEAD"
alias gs="git status"
alias gl="git log --graph --decorate --oneline"
alias gpull='git branch | sed -n "/\* /s///p" | xargs git pull --rebase origin'
alias gsall="find /path/to/project -maxdepth 1 -mindepth 1 -type d -exec sh -c '(echo {} && cd {} && git status -s && echo)' \;"
alias gpush='git branch | sed -n "/\* /s///p" | xargs git push origin --follow-tags'
alias gb='git branch --sort=-committerdate | head -10'
alias gc='git checkout'
alias gcm='git checkout master'
alias gt='git tag'
alias gpushdocker='/usr/local/bin/tag-increment && git branch | sed -n "/\* /s///p" | xargs git push origin --follow-tags'
alias glog="git log --graph --decorate --oneline"
alias gsetemaillocal="git config --local user.email "
alias gsetnamelocal="git config --local user.name "
alias gsetemailglobal="git config --global user.email "
alias gsetnameglobal="git config --global user.name "

# Python3

# pylock
function pylock() {
  python3 -m pigar generate
  python3 -m pipenv lock
}

# pyinstall
function pyinstall() {
  python3 -m pip install $1 --no-cache-dir -r requirements.txt
  python3 -m pipenv install
}

alias pylint='python3 -m pylint $(git ls-files "*.py")'

# window

alias cls='clear'
alias rst='reset'

# openssl

alias hex='openssl rand -hex 32'
