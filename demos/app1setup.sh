#!/bin/bash
BUCKET=docaas
BUCKETC1=docaasc1
BUCKETC2=docaasc2
DOMAIN=estaba.net

CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names docaas-customer1-eb-env --no-include-deleted | jq --raw-output '.Environments[0].CNAME'`
CERTARN=`aws acm list-certificates | jq '.CertificateSummaryList [] | select(.DomainName=='$DOMAIN') .CertificateArn'`

cd ../monoliths/customer1
cd .ebextensions/
find securelistener-clb.config -type f -exec sed -i -e "s,##CERTARNGOESHERE##,$CERTARN,g" {} \;
rm -f securelistener-clb.config-e
cd ../../../demos


cd ../front-end/customer1
npm install
npm run-script build
cd build/static/js
find ./ -type f -exec sed -i -e "s/##CNAMEGOESHERE##/$CNAMEC1/g" {} \;
find ./ -type f -exec sed -i -e "s/CUSTOMERGOESHERE/customer1/g" {} \;
find ./ -type f -exec sed -i -e "s/DOMAINGOESHERE.com/$DOMAIN/g" {} \;
cd ../../../
cp -vr build/ ../../monoliths/customer1/app/
cd ../../monoliths/customer1
eb deploy docaas-customer1-eb-env
cd ../../demos