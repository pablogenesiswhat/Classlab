#!/bin/bash
sudo "./config.sh" "init_env"
mkdir credentials && npm install

gcloud services enable sheets.googleapis.com
gcloud services enable classroom.googleapis.com

sudo "./config.sh" "init_term"

echo ""
echo "-------------------------------------------------------"
echo "Please restart terminal for the changes to take effect."
echo "-------------------------------------------------------"
