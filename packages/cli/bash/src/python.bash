
#!/bin/bash

# Python

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
