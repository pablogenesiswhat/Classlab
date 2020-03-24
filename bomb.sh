#!/bin/bash
# -----------------------------------------------------------------------------
# options in functions
function create() {
  node $Classlab/command/classroom/create.js
}

function login() {
  node $Classlab/command/login.js
}

function help() {
  cat $Classlab/.help
}

# -----------------------------------------------------------------------------
# component option to validate
start=$(which $1)

# Start functions
if [[ $start = " " || $start = "" ]];
  then
    help
  else
    $1
fi
