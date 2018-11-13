#!/bin/bash

REGION=us-west-2
BUCKET=docaas

sam package --template-file demo3-template.yaml --s3-bucket $BUCKET --output-template-file packaged.yaml --region $REGION
sam deploy --template-file packaged.yaml --stack-name docaas --capabilities CAPABILITY_NAMED_IAM --region $REGION

rm -f packaged.yaml
