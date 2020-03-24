#!/bin/bash
function init_term() {
  x="alias bomb='"
  path=$(pwd)
  slash="/bomb.sh'"

  bomba=$x$path$slash

  ter1=$(which bash)

  if [[ $ter1 = *bash ]];
    then
      echo $bomba >> ~/.bashrc
      source ~/.bashrc
  fi
}

# -----------------------------------------------------------------------------
# -----------------------------------------------------------------------------
function init_env() {
  echo "Go to the https://console.cloud.google.com/apis/credentials/oauthclient"
  echo "Select Other in Type of application and click on the save button."

  read -p "Paste your client id: " idClient
  read -p "Paste your secret client: " secretClient

  idClient="CLIENT_ID=$idClient"
  secretClient="CLIENT_SECRET=$secretClient"

  echo $idClient >> .env
  echo $secretClient >> .env
}

# -----------------------------------------------------------------------------
# Nodejs version check (v10.x required)
function installPackages() {
  mkdir credentials
  npm install

  init_term
  # echo /etc/profile << $bomb
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

init_term
init_env
