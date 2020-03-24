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
# Providing GCP project
function init() {
  SDKGcloud=$(which gcloud)
  if [[ $SDKGcloud = "" ]];
    then
      echo "Not found: Google SDK visit: https://cloud.google.com/sdk/docs/downloads-interactive?hl=es"
    else
      gcloud services enable sheets.googleapis.com
      gcloud services enable classroom.googleapis.com
  fi
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
