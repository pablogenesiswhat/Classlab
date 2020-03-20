#!/bin/bash


# -----------------------------------------------------------------------------
# Nodejs version check (v10.x required)
function installPackages() {
  mkdir credentials
  npm install
}
vNode=$(which node)
if [[ $vNode = "" ]];
  then
    echo "Please install nodejs v10.x visit: https://nodejs.org/es/download/package-manager/"
  else
    if [[ $(node -v) = v10* ]];
      then installPackages
      else echo "Please install nodejs v10.x visit: https://nodejs.org/es/download/package-manager/"
    fi
fi

# -----------------------------------------------------------------------------
# Providing GCP project
function activeApis() {
  gcloud services enable sheets.googleapis.com
  gcloud services enable classroom.googleapis.com
}

SDKGcloud=$(which gcloud)
if [[ $SDKGcloud = "" ]];
  then
    echo "Not found: Google SDK visit: https://cloud.google.com/sdk/docs/downloads-interactive?hl=es"
  else
    activeApis
fi
