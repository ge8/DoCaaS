#!/bin/bash

REGION=us-west-2
BUCKET=docaas

aws cloudformation delete-stack --stack-name docaas
aws cloudformation wait stack-delete-complete --stack-name docaas

sam package --template-file demo2-template.yaml --s3-bucket $BUCKET --output-template-file packaged.yaml --region $REGION
sam deploy --template-file packaged.yaml --stack-name docaas --capabilities CAPABILITY_NAMED_IAM --region $REGION

rm -f packaged.yaml
