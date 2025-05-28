#!/bin/bash
cd /home/kavia/workspace/code-generation/mixmaster-102939-b128bcb9/mixmaster_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

