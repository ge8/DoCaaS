#!/bin/bash

. ./loadvariables.sh

# manually discard all changes in local repo (deletes all new local files and changes)
cd ../
git reset --hard HEAD
git clean -fdx
cd demos/

# delete Amplify Stack
A=`aws cloudformation list-stacks --stack-status-filter CREATE_COMPLETE UPDATE_COMPLETE | grep '"StackName": "customer1'`
echo $A
STACKNAME=`echo "{ $A \"t\":1 }" | jq ".StackName" --raw-output`
echo "Amplify's Stack Name to delete is: $STACKNAME"
aws cloudformation delete-stack --stack-name $STACKNAME

# Delete docaas SAM stack 
aws cloudformation delete-stack --stack-name docaas

# Delete docaas-dynamos stack
aws cloudformation delete-stack --stack-name docaas-dynamos

# redeploy App1
./updateapp1.sh

# redeploy App2
./updateapp2.sh

# Modify R53 CNAME for customer1.xxx back to ElasticBeanstalk
CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names docaas-customer1-eb-env --no-include-deleted | jq --raw-output '.Environments[0].CNAME'`
echo "Updating C1 CNAME record on R53"
ZONEID=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN | jq --raw-output '.HostedZones[0].Id'`
echo "ZONEID is $ZONEID"
cp r53c1.json r53c1-mod.json
find r53c1-mod.json -type f -exec sed -i -e "s/##TARGETGOESHERE##/$CNAMEC1/g" {} \;
find r53c1-mod.json -type f -exec sed -i -e "s/##DOMAINGOESHERE##/$DOMAIN/g" {} \;
aws route53 change-resource-record-sets --hosted-zone-id $ZONEID --change-batch file://r53c1-mod.json
rm -f r53c1-mod.json r53c1-mod.json-e 
echo "C1 CNAME Record Updated from R53"

CNAMEC2=`aws elasticbeanstalk describe-environments --environment-names docaas-customer2-eb-env --no-include-deleted | jq --raw-output '.Environments[0].CNAME'`
echo "Updating C2 CNAME record on R53"
ZONEID=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN | jq --raw-output '.HostedZones[0].Id'`
echo "ZONEID is $ZONEID"
cp r53c2.json r53c2-mod.json
find r53c2-mod.json -type f -exec sed -i -e "s/##TARGETGOESHERE##/$CNAMEC2/g" {} \;
find r53c2-mod.json -type f -exec sed -i -e "s/##DOMAINGOESHERE##/$DOMAIN/g" {} \;
aws route53 change-resource-record-sets --hosted-zone-id $ZONEID --change-batch file://r53c2-mod.json
rm -f r53c2-mod.json r53c2-mod.json-e 
echo "C2 CNAME Record Updated from R53"

# Confirm cfn deleted with Amplify STACK!!
aws cloudformation wait stack-delete-complete --stack-name docaas-dynamos
aws cloudformation wait stack-delete-complete --stack-name docaas
aws cloudformation wait stack-delete-complete --stack-name customer1-20181106124851

# delete IAM policies DefaultPolicyForAuthenticatedUsers and DynamoPolicyForAuthenticatedUsers
AWSACCOUNT=`aws sts get-caller-identity --output text --query 'Account'`
echo "The AWS Account is: $AWSACCOUNT"
aws iam delete-policy --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDynamoPolicyForAuthenticated
aws iam delete-policy --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDefaultPolicyForAuthenticated




