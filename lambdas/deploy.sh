#!/bin/bash

REGION=us-west-2
BUCKET=docaas

aws cloudformation delete-stack --stack-name docaas-test
sam package --template-file test.yaml --s3-bucket $BUCKET --output-template-file packaged.yaml --region $REGION
sam deploy --template-file packaged.yaml --stack-name docaas-test --capabilities CAPABILITY_NAMED_IAM --region $REGION

rm -f packaged.yaml