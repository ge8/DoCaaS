#!/bin/bash

. ./loadvariables.sh

DISTRIBUTION="testtest.net"

A=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN --query "HostedZones[0].Id" --output text`
ZONEID=`echo $A | sed -e 's,/hostedzone/,,g'`
echo "Zone ID is $ZONEID"

cp r53-a.json r53-a-mod.json
find r53-a-mod.json -type f -exec sed -i -e "s/DISTRIBUTIONENDPOINT/$DISTRIBUTION/g" {} \;
find r53-a-mod.json -type f -exec sed -i -e "s/DOMAINGOESHERE/$DOMAIN/g" {} \;
aws route53 change-resource-record-sets --hosted-zone-id $ZONEID --change-batch file://r53-a-mod.json
rm -f r53-a-mod.json r53-a-mod.json-e 
echo "Record to R53 Added"

