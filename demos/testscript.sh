#!/bin/bash
# CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names prodA | jq --raw-output '.Environments[0].CNAME'`
# echo $CNAMEC1
DOMAIN=estaba.net

ZONEID=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN | jq --raw-output '.HostedZones[0].Id'`
echo $ZONEID


find r53.json -type f -exec sed -i -e "s/##SUBDOMAINGOESHERE##/customer1/g" {} \;
find r53.json -type f -exec sed -i -e "s/##DOMAINGOESHERE##/$DOMAIN/g" {} \;
aws route53 change-resource-record-sets --hosted-zone-id $ZONEID --change-batch file://r53.json 
