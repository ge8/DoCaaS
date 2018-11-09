#!/bin/bash

. ./loadvariables.sh

# Enable Website hosting BUCKET public
aws s3 website s3://$BUCKET --index-document index.html --error-document index.html


A=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN --query "HostedZones[0].Id" --output text`
ZONEID=`echo $A | sed -e 's,/hostedzone/,,g'`
echo "Zone ID is $ZONEID"

aws configure set default.region us-east-1
CERTARN=`aws acm list-certificates --query "CertificateSummaryList[0].CertificateArn" --output text`
echo "Cert ARN is $CERTARN"
aws configure set default.region $REGION


aws cloudformation delete-stack --stack-name docaas-cfn-a-record
aws cloudformation wait stack-delete-complete --stack-name docaas-cfn-a-record

aws cloudformation deploy --template-file docaas-cfn+A-record.yaml --stack-name docaas-cfn-a-record --capabilities CAPABILITY_NAMED_IAM --region $REGION --parameter-overrides DomainName=$DOMAIN AcmCertificateArn=$CERTARN BucketName=$BUCKET BucketWebsite="$BUCKET.s3-website-us-west-2.amazonaws.com"

# Query the DISTRIBUTION Endpoint
DISTRIBUTION=`aws cloudformation describe-stacks --stack-name docaas-cfn-a-record --query "Stacks[0].Outputs[0].OutputValue" --output text`

cp r53-a.json r53-a-mod.json
find r53-a-mod.json -type f -exec sed -i -e "s/DISTRIBUTIONENDPOINT/$DISTRIBUTION/g" {} \;
find r53-a-mod.json -type f -exec sed -i -e "s/DOMAINGOESHERE/$DOMAIN/g" {} \;
aws route53 change-resource-record-sets --hosted-zone-id $ZONEID --change-batch file://r53-a-mod.json
rm -f r53-a-mod.json r53-a-mod.json-e 
echo "Record to R53 Added"


