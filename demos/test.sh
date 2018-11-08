#!/bin/bash

. ./loadvariables.sh

A=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN --query "HostedZones[0].Id" --output text`
ZONEID=`echo $A | sed -e 's,/hostedzone/,,g'`
echo $ZONEID

