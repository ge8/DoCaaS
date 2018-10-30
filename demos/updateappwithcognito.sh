#!/bin/bash

. ./loadvariables.sh

CERTARN='no value'
CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names docaas-customer1-eb-env --no-include-deleted | jq --raw-output '.Environments[0].CNAME'`
CERTARN=`aws acm list-certificates | jq --arg DOMAIN "$DOMAIN" '.CertificateSummaryList [] | select(.DomainName==$DOMAIN) .CertificateArn'`
echo $CERTARN

cd ../monoliths/customer1
cd .ebextensions/
find securelistener-clb.config -type f -exec sed -i -e "s,##CERTARNGOESHERE##,$CERTARN,g" {} \;
rm -f securelistener-clb.config-e
cd ../../../demos


cd ../front-end/customer1
npm install
npm run-script build
cd build/static/js #modify build
find ./ -type f -exec sed -i -e "s/CUSTOMERGOESHERE/customer1/g" {} \;
find ./ -type f -exec sed -i -e "s/DOMAINGOESHERE.com/$DOMAIN/g" {} \;
cd ../../../
cp -vr build/ ../../monoliths/customer1/app/

cd src/components/MainBody #modify source
find ./ -type f -exec sed -i -e "s/CUSTOMERGOESHERE/customer1/g" {} \;
find ./ -type f -exec sed -i -e "s/DOMAINGOESHERE.com/$DOMAIN/g" {} \;
cd ../../../

# Update env variable for COGNITO
cd amplify/backend/
A=`grep "IdentityPoolId" amplify-meta.json`
B=`echo "{ $A \"t\":1 }" | jq ".IdentityPoolId" --raw-output`
echo "The Identity Pool Id is: $B"
cd ../../
cd ../../monoliths/customer1/.ebextensions
find variable.config -type f -exec sed -i -e "s,IDENTITYPOOLGOESHERE,$B,g" {} \;
rm -f securelistener-clb.config-e
cd ..

eb deploy docaas-customer1-eb-env
cd ../../demos