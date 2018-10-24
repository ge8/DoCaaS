#!/bin/bash

BUCKET=docaas
BUCKETC1=docaasc1
BUCKETC2=docaasc2
DOMAIN=estaba.net

CERTARN='no value'
CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names docaas-customer1-eb-env --no-include-deleted | jq --raw-output '.Environments[0].CNAME'`

CERTARN=`aws acm list-certificates | jq --arg DOMAIN "$DOMAIN" '.CertificateSummaryList [] | select(.DomainName==$DOMAIN) .CertificateArn'`

echo $CERTARN
