#!/bin/bash
# -----------------------------------------------------------------------------
# options in functions
function create() {
  node "$Classlab/command/classroom/create.js"
}

function login() {
  node "$Classlab/command/login.js"
}

function help() {
  cat "$Classlab/.help"
}

function init() {
  sudo "$Classlab/config.sh" "init_env"
}

function update() {
  git fetch
}

# -----------------------------------------------------------------------------
# component option to validate
start=$(which $1)

# Start functions
if [[ $start = " " ]];
  then
    ""
  else
    $1
fi
