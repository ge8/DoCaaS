


cd ../monoliths/customer1
eb init --platform node.js --region us-west-2
eb create docaas-customer1-eb-env 
aws elasticbeanstalk update-environment --environment-name docaas-customer1-eb-env --option-settings "OptionName=NodeVersion, Namespace=aws:elasticbeanstalk:container:nodejs, Value=8.11.4"
CNAMEC1=`aws elasticbeanstalk describe-environments --environment-names docaas-customer1-eb-env --no-include-deleted | jq --raw-output '.Environments[0].CNAME'`
echo "CNAMEC1 is $CNAMEC1"
cd ../../demos
