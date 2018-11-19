#!/bin/bash

REGION=us-west-2
BUCKET=docaas

sam package --template-file demo4-template.yaml --s3-bucket $BUCKET --output-template-file packaged.yaml --region $REGION
sam deploy --template-file packaged.yaml --stack-name docaas --capabilities CAPABILITY_NAMED_IAM --region $REGION

RESTAPI=`aws cloudformation describe-stacks --stack-name docaas --query "Stacks[0].Outputs[0].OutputValue" --output text`
aws apigateway update-stage --rest-api-id $RESTAPI --stage-name Prod

rm -f packaged.yaml
