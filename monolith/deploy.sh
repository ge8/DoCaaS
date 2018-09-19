#!/bin/bash

rm -f bundle.zip

zip -r bundle.zip *

scp bundle.zip ec2-user@10.1.10.165:

ssh 10.1.10.165 '
cd ~/app
echo "Killing Running Service"
killall node
echo "Extracting Updates"
unzip -o ../bundle.zip
echo "Launching Service for: Customer 1"
nohup node server/start-customer-1.js > customer-1.log 2>&1 &
echo "Launching Service for: Customer 2"
nohup node server/start-customer-2.js > customer-2.log 2>&1 &
echo "Deployment Complete!"
'
