#!/bin/bash
#Script to set up the initial environment + apps

# Takes a domain name imported into R53 and an S3 bucket
BUCKET=docaas
export ARTIFACT_BUCKET=$BUCKET
echo "Artifact Bucket: $BUCKET"

BUCKETC1=docaasc1
export ARTIFACT_BUCKETC1=$BUCKETC1
echo "Artifact Bucket: $BUCKETC1"

BUCKETC2=docaasc2
export ARTIFACT_BUCKETC2=$BUCKETC2
echo "Artifact Bucket: $BUCKETC2"

DOMAIN=estaba.net
export ARTIFACT_DOMAIN=$DOMAIN
echo "Artifact Domain: $DOMAIN"

# Clone Repo
git clone https://github.com/ge8/docaas

# Monolith 1 setup
cd monoliths/customer1
eb init --platform node.js --region us-west-2
eb create docaas-customer1-eb-env 
aws elasticbeanstalk update-environment --environment-name docaas-customer1-eb-env --option-settings "OptionName=NodeVersion, Namespace=aws:elasticbeanstalk:container:nodejs, Value=8.11.4"
CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names prodA | jq --raw-output '.Environments[0].CNAME'`

# Front End 1 setup
cd ../../front-end/customer1
npm run-script build
cd build/static/js
find ./ -type f -exec sed -i -e "s/##CNAMEC1GOESHERE##/$CNAMEC1/g" {} \;
aws s3 sync build/ s3://$BUCKETC1 --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete


# eb terminate customer1-dev --force


## git clone https://github.com/ge8/docaas
## cd docaas-react
npm run-script build
cd build/static/js
find ./ -type f -exec sed -i -e "s/##CNAMEC1GOESHERE##/$CNAMEC1/g" {} \;
aws s3 sync build/ s3://$BUCKETC1 --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete


