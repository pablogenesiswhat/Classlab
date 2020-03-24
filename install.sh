#!/bin/bash
export Classlab="/opt/Classlab"
alias bomb="$Classlab/bomb.sh"

sudo "./config.sh" init_env
"./config.sh" installDependencies
sudo "./config.sh" init_env

init_term
