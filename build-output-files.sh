#!/bin/bash
set -e

if [ -z "$BASH_SOURCE[0]" ]; then
  scriptDir=`dirname "$(readlink -f "$0")"`
else
  scriptDir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
fi

importStatementRegex="^import "
libFolder="${scriptDir}/dist/lib"
targetFileJs=${libFolder}/index.js
targetFileTypes=${libFolder}/index.d.js

# Put all imports on top of the file, then the rest
cat ${libFolder}/*.js | grep -e ${importStatementRegex} | sort -u > ${targetFileJs}
cat ${libFolder}/*.js | grep -e ${importStatementRegex} -v >> ${targetFileJs}

# Just bundle all types
cat ${libFolder}/*.d.ts | grep -e ${importStatementRegex} | sort -u > ${targetFileTypes}
cat ${libFolder}/*.d.ts | grep -e ${importStatementRegex} -v >> ${targetFileTypes}
