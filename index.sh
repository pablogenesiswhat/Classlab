#!/bin/bash
# option = $1

case $1 in
  -p )
    echo "n" ;;
  create )
    node "./command/classroom/create.js" ;;
  * )
    echo "Not found"
    ;;
esac
