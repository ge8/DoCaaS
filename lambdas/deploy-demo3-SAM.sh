#!/bin/bash

. ./../demos/loadvariables.sh

sam package --template-file demo3-template.yaml --s3-bucket $BUCKET --output-template-file packaged.yaml --region $REGION
sam deploy --template-file packaged.yaml --stack-name docaas --capabilities CAPABILITY_NAMED_IAM --region $REGION

RESTAPI=`aws cloudformation describe-stacks --stack-name docaas --query "Stacks[0].Outputs[0].OutputValue" --output text`
DEPID=`aws apigateway create-deployment --rest-api-id $RESTAPI --stage-name Prod --query "id" --output text`
aws apigateway update-stage --rest-api-id $RESTAPI --stage-name Prod --patch-operations op='replace',path='/deploymentId',value=$DEPID

# nohup aws lambda invoke Authorizer &
# nohup aws lambda invoke CORS &
# nohup aws lambda invoke Get &
# nohup aws lambda invoke Create &
# nohup aws lambda invoke Shuffle &
# nohup aws lambda invoke Game &

rm -f packaged.yaml
