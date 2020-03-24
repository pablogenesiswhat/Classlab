#!/bin/bash
sudo "./config.sh" "init_env"
"./config.sh" "installDependencies"
sudo "./config.sh" "init_term"

echo ""
echo "-------------------------------------------------------"
echo "Please restart terminal for the changes to take effect."
echo "-------------------------------------------------------"
