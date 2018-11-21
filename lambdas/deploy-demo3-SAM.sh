#!/bin/bash

. ./../demos/loadvariables.sh

sam package --template-file demo3-template.yaml --s3-bucket $BUCKET --output-template-file packaged.yaml --region $REGION
sam deploy --template-file packaged.yaml --stack-name docaas --capabilities CAPABILITY_NAMED_IAM --region $REGION

RESTAPI=`aws cloudformation describe-stacks --stack-name docaas --query "Stacks[0].Outputs[0].OutputValue" --output text`
DEPID=`aws apigateway create-deployment --rest-api-id $RESTAPI --stage-name Prod --query "id" --output text`
aws apigateway update-stage --rest-api-id $RESTAPI --stage-name Prod --patch-operations op='replace',path='/deploymentId',value=$DEPID

FUNCTION0=`aws lambda list-functions --query "Functions[0].FunctionName" --output text`
aws lambda invoke --function-name $FUNCTION0 delete.json >> delete2.json &
FUNCTION1=`aws lambda list-functions --query "Functions[1].FunctionName" --output text`
aws lambda invoke --function-name $FUNCTION1 delete.json >> delete2.json &
FUNCTION2=`aws lambda list-functions --query "Functions[2].FunctionName" --output text`
aws lambda invoke --function-name $FUNCTION2 delete.json >> delete2.json &
FUNCTION3=`aws lambda list-functions --query "Functions[3].FunctionName" --output text`
aws lambda invoke --function-name $FUNCTION3 delete.json >> delete2.json &
FUNCTION4=`aws lambda list-functions --query "Functions[4].FunctionName" --output text`
aws lambda invoke --function-name $FUNCTION4 delete.json >> delete2.json &
FUNCTION5=`aws lambda list-functions --query "Functions[5].FunctionName" --output text`
aws lambda invoke --function-name $FUNCTION5 delete.json >> delete2.json

rm -f packaged.yaml delete.json delete2.json
