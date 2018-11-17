#!/bin/bash

. ./loadvariables.sh

# Install dependencies
cd ../front-end/customer1
npm install --save aws-amplify 
npm install --save aws-amplify-react #takes 1 min
npm install

# Modify mainURL in source
cd src/components/MainBody #modify source
find ./ -type f -exec sed -i -e "s/CUSTOMERGOESHERE/customer1/g" {} \;
rm -f MainBody.js-e MainBody.css-e 
find ./ -type f -exec sed -i -e "s/DOMAINGOESHERE.com/$DOMAIN/g" {} \;
rm -f MainBody.js-e MainBody.css-e 
cd ../../../

# Build and Drop Build into Monolith Deployable
npm run-script build
cp -vr build/ ../../monoliths/customer1/app/
cd ../../demos