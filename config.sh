#!/bin/bash
function init_term() {
  cp aliases_Classlab.sh /etc/profile.d/
  cd ..
  mv Classlab /opt/

  alias bomb="/opt/Classlab/bomb.sh"
}

# -----------------------------------------------------------------------------
# -----------------------------------------------------------------------------
function init_env() {
  echo ""
  echo "Go to the https://console.cloud.google.com/apis/credentials/oauthclient"
  echo "Select Other in Type of application and click on the save button."
  echo ""
  echo "----------------------------------------------------------------------"
  echo "See Image https://raw.githubusercontent.com/pablogenesiswhat/Classlab/master/IMG/OAuth_client.PNG"
  echo "----------------------------------------------------------------------"
  echo ""

  read -p "Paste your client id: " idClient
  read -p "Paste your secret client: " secretClient

  idClient="CLIENT_ID=$idClient"
  secretClient="CLIENT_SECRET=$secretClient"

  echo $idClient > /opt/Classlab/.env
  echo $secretClient >> /opt/Classlab/.env
}

$1
