#!/bin/bash

. ./loadvariables.sh

cd ../monoliths/customer2
eb init --platform node.js --region us-west-2

CERTARN='no value'
CERTARN=`aws acm list-certificates | jq --arg DOMAIN "$DOMAIN" '.CertificateSummaryList [] | select(.DomainName==$DOMAIN) .CertificateArn'`
echo $CERTARN

cd .ebextensions/
find securelistener-clb.config -type f -exec sed -i -e "s,##CERTARNGOESHERE##,$CERTARN,g" {} \;
rm -f securelistener-clb.config-e
cd ..
eb create docaas-customer2-eb-env 
cd ../../demos
