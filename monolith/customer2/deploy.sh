#!/bin/bash

DEPLOY_HOST=10.1.10.165

### 

rm -f bundle.zip
zip -r bundle.zip *

scp bundle.zip ec2-user@$DEPLOY_HOST:

ssh $DEPLOY_HOST '
mkdir -p ~/app/customer2
cd ~/app/customer2
echo "Killing Running Service"
killall cutomer2
echo "Extracting Updates"
unzip -o ../bundle.zip
echo "Launching Service for: Customer 2"
nohup node server.js > customer-2.log 2>&1 &
echo "Deployment Complete!"
'