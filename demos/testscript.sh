#!/bin/bash
CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names prodA | jq --raw-output '.Environments[0].CNAME'`
echo $CNAMEC1