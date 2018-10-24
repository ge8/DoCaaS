#!/bin/bash
BUCKET=docaas

cd ../monoliths/customer1/dynamo/
sam package --template-file dyanmodb.yaml --s3-bucket $ARTIFACT_BUCKET --output-template-file packaged-dynamo.yaml
sam deploy --template-file packaged-dynamo.yaml --stack-name dynamo-customer1 --capabilities CAPABILITY_IAM
cd ../../../demos