#!/bin/bash



cd ../monoliths/customer1
eb init --platform node.js --region us-west-2
CERTARN=`aws acm request-certificate --domain-name estaba.net --subject-alternative-names *.estaba.net --validation-method DNS | jq --raw-output '.CertificateArn'`
cd .ebextensions/
find securelistener-clb.config  -type f -exec sed -i -e "s/##CERTARNGOESHERE##/$CERTARN/g" {} \;
rm -f securelistener-clb.config-e
cd ..
eb create docaas-customer1-eb-env 
aws elasticbeanstalk update-environment --environment-name docaas-customer1-eb-env --option-settings "OptionName=NodeVersion, Namespace=aws:elasticbeanstalk:container:nodejs, Value=8.11.4"
CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names docaas-customer1-eb-env --no-include-deleted | jq --raw-output '.Environments[0].CNAME'`
echo "CNAMEC1 is $CNAMEC1"
cd ../../demos
