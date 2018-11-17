#!/bin/bash

. ./loadvariables.sh

# Install dependencies
cd ../front-end/customer2
npm install --save aws-amplify 
npm install --save aws-amplify-react #takes 1 min
npm install

# Modify mainURL in source
cd src/components/MainBody 
find ./ -type f -exec sed -i -e "s/CUSTOMERGOESHERE/customer2/g" {} \;
rm -f MainBody.js-e MainBody.css-e 
find ./ -type f -exec sed -i -e "s/DOMAINGOESHERE.com/$DOMAIN/g" {} \;
rm -f MainBody.js-e MainBody.css-e 
cd ../../../

# Build and Drop Build into Monolith Deployable
npm run-script build 
cp -vr build/ ../../monoliths/customer2/app/
cd ../../demos