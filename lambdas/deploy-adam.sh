#!/bin/bash

REGION=ap-southeast-2
BUCKET=adams-s3

sam package --template-file docaastemplate.yaml --s3-bucket $BUCKET --output-template-file packaged.yaml --region $REGION
sam deploy --template-file packaged.yaml --stack-name docaas-cut-the-deck --capabilities CAPABILITY_IAM --region $REGION

rm -f packaged.yaml
