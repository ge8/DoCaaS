#!/bin/bash
# BUCKET=docaas

cd ../monoliths/customer1/dynamo/
sam package --template-file dynamodb.yaml --s3-bucket $BUCKET --output-template-file packaged-dynamo.yaml
sam deploy --template-file packaged-dynamo.yaml --stack-name dynamo-customer1 --capabilities CAPABILITY_IAM
rm -f packaged-dynamo.yaml
aws dynamodb put-item --table-name data-customer1 --item file://item.json
cd ../../../demos