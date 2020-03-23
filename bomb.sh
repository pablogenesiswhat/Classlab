#!/bin/bash
# -----------------------------------------------------------------------------
# options in functions
function create() {
  node "./command/classroom/create.js"
}

function login() {
  node "./command/login.js"
}

function help() {
  cat ./.help
}
# -----------------------------------------------------------------------------
# component option to validate
start=$(which $1)

# Start functions
if [[ $start = "" ]];
  then
    help
  else
    $1
fi
