#!/bin/bash
#Script to set up the initial environment + apps

# Enter 3 buckets in us-west-2 (Oregon) and 1 domain name that's been imported your AWS account's R53.
BUCKET=docaas
BUCKETC1=docaasc1
BUCKETC2=docaasc2
DOMAIN=estaba.net

export ARTIFACT_BUCKET=$BUCKET
echo "Artifact Bucket: $BUCKET"
export ARTIFACT_BUCKETC1=$BUCKETC1
echo "Artifact Bucket: $BUCKETC1"
export ARTIFACT_BUCKETC2=$BUCKETC2
echo "Artifact Bucket: $BUCKETC2"
export ARTIFACT_DOMAIN=$DOMAIN
echo "Artifact Domain: $DOMAIN"


# Monolith 1 setup
echo "Creating Monolith 1"
cd monoliths/customer1
eb init --platform node.js --region us-west-2
eb create docaas-customer1-eb-env 
aws elasticbeanstalk update-environment --environment-name docaas-customer1-eb-env --option-settings "OptionName=NodeVersion, Namespace=aws:elasticbeanstalk:container:nodejs, Value=8.11.4"
CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names docaas-customer1-eb-env | jq --raw-output '.Environments[0].CNAME'`
echo "Monolith created"


# Front End 1 setup
echo "Publishing Monolith 1 App"
cd ../../front-end/customer1
npm install
npm run-script build
cd build/static/js
find ./ -type f -exec sed -i -e "s/##CNAMEGOESHERE##/$CNAMEC1/g" {} \;
aws s3 sync build/ s3://$BUCKETC1 --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete
aws s3 website s3://$BUCKETC1 --index-document index.html --error-document index.html
echo "Monolith 1 App Published"

echo "Adding record to R53"
ZONEID=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN | jq --raw-output '.HostedZones[0].Id'`
cd ../../../demos
find r53.json -type f -exec sed -i -e "s/##TARGETGOESHERE##/$CNAME1/g" {} \;
find r53.json -type f -exec sed -i -e "s/##DOMAINGOESHERE##/$DOMAIN/g" {} \;
aws route53 change-resource-record-sets --hosted-zone-id $ZONEID --change-batch file://r53c1.json 
echo "Record to R53 Added"

