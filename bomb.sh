#!/bin/bash
# -----------------------------------------------------------------------------
# options in functions
function create() {
  node "./command/classroom/create.js"
}

function login() {
  node "./command/login.js"
}
# -----------------------------------------------------------------------------
# component option to validate
start=$(which $1)

# Start functions
if [[ $start = " " ]];
  then
    echo "Invalid option"
  else
    $1
fi
