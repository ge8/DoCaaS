#!/bin/bash

. ./loadvariables.sh

# Enable Website hosting BUCKET public
aws s3 website s3://$BUCKET --index-document index.html --error-document index.html


ZONEID=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN --query "HostedZones[0].Id" --output text`
echo "Zone ID is $ZONEID"

CERTARN=`aws acm list-certificates --query "CertificateSummaryList[0].CertificateArn" --output text`
echo "Cert ARN is $CERTARN"


aws cloudformation delete-stack --stack-name docaas-cfn-a-record
aws cloudformation wait stack-delete-complete --stack-name docaas

aws cloudformation deploy --template-file docaas-cfn+A-record.yaml --stack-name docaas-cfn-a-record --capabilities CAPABILITY_NAMED_IAM --region $REGION --parameter-overrides DomainName=$DOMAIN ZoneID=$ZONEID AcmCertificateArn=$CERTARN BucketName=$BUCKET

##### NOT WORKING!!