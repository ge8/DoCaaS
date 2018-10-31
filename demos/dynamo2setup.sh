#!/bin/bash

. ./loadvariables.sh

cd ../monoliths/customer2/dynamo/
sam package --template-file dynamodb.yaml --s3-bucket $BUCKET --output-template-file packaged-dynamo.yaml
sam deploy --template-file packaged-dynamo.yaml --stack-name dynamo-customer2 --capabilities CAPABILITY_IAM
rm -f packaged-dynamo.yaml
aws dynamodb put-item --table-name data-customer2 --item file://item.json
cd ../../../demos