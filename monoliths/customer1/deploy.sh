#!/bin/bash

DEPLOY_HOST=10.1.10.165

### 

rm -f bundle.zip
zip -r bundle.zip *

scp bundle.zip ec2-user@$DEPLOY_HOST:

ssh $DEPLOY_HOST '
mkdir -p ~/app/customer1
cd ~/app/customer1
echo "Killing Running Service"
killall cutomer1
echo "Extracting Updates"
unzip -o ../bundle.zip
echo "Launching Service for: Customer 1"
nohup node server.js > customer-1.log 2>&1 &
echo "Deployment Complete!"
'