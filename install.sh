#!/bin/bash
function init_term() {
  mv aliases_Classlab.sh /etc/profile.d/
  cd ..
  mv Classlab /opt/

  alias bomb="/opt/Classlab/bomb.sh"
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

  echo $idClient > .env
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

if [[ $(node -v) = v10* ]];
  then installPackages
  else echo "Please install nodejs v10.x visit: https://nodejs.org/es/download/package-manager/"
fi

init_term
init_env
