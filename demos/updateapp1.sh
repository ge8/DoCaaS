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
find ./ -type f -exec sed -i -e "s/DOMAINGOESHERE.com/$DOMAIN/g" {} \;
cd ../../../

# Build and Drop Build into Monolith Deployable
npm run-script build
cp -vr build/ ../../monoliths/customer1/app/

# Deploy & Update BEanstalk env
cd ../../monoliths/customer1/
eb init --platform node.js --region us-west-2
CERTARN='no value'
CERTARN=`aws acm list-certificates | jq --arg DOMAIN "$DOMAIN" '.CertificateSummaryList [] | select(.DomainName==$DOMAIN) .CertificateArn'`
echo $CERTARN
cd .ebextensions/
find alb-secure-listener.config -type f -exec sed -i -e "s,CERTARNGOESHERE,$CERTARN,g" {} \;
rm -f alb-secure-listener.config-e
cd ..
eb deploy docaas-customer1-eb-env
cd ../../demos


