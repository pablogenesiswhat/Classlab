#!/bin/bash

sudo "./config.sh"

export Classlab="/opt/Classlab"
alias bomb="$Classlab/bomb.sh"

"$Classlab/bomb.sh" init
