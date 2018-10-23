#!/bin/bash
#run at demos/
BUCKET=docaas
BUCKETC1=docaasc1
BUCKETC2=docaasc2
DOMAIN=estaba.net

CERTARN=`aws acm request-certificate --domain-name estaba.net --subject-alternative-names *.estaba.net --validation-method DNS | jq --raw-output '.CertificateArn'`
echo $CERTARN
sleep 5

DOMAINNAME1=`aws acm describe-certificate --certificate-arn $CERTARN | jq --raw-output '.Certificate.DomainValidationOptions[0].DomainName'`
NAMECNAME1=`aws acm describe-certificate --certificate-arn $CERTARN | jq --raw-output '.Certificate.DomainValidationOptions[0].ResourceRecord.Name'`
VALUECNAME1=`aws acm describe-certificate --certificate-arn $CERTARN | jq --raw-output '.Certificate.DomainValidationOptions[0].ResourceRecord.Value'`
echo $DOMAINNAME1
echo $NAMECNAME1
echo $VALUECNAME1

ZONEID=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN | jq --raw-output '.HostedZones[0].Id'`
echo "ZONEID is $ZONEID"
cp r53acm1.json r53acm1-mod.json
find r53acm1-mod.json -type f -exec sed -i -e "s/##TARGETGOESHERE##/$VALUECNAME1/g" {} \;
find r53acm1-mod.json -type f -exec sed -i -e "s/##DOMAINGOESHERE##/$NAMECNAME1/g" {} \;
aws route53 change-resource-record-sets --hosted-zone-id $ZONEID --change-batch file://r53acm1-mod.json
rm -f r53acm1-mod.json r53acm1-mod.json-e 

DOMAINNAME1=`aws acm describe-certificate --certificate-arn $CERTARN | jq --raw-output '.Certificate.DomainValidationOptions[1].DomainName'`
NAMECNAME1=`aws acm describe-certificate --certificate-arn $CERTARN | jq --raw-output '.Certificate.DomainValidationOptions[1].ResourceRecord.Name'`
VALUECNAME1=`aws acm describe-certificate --certificate-arn $CERTARN | jq --raw-output '.Certificate.DomainValidationOptions[1].ResourceRecord.Value'`
echo $DOMAINNAME1
echo $NAMECNAME1
echo $VALUECNAME1

ZONEID=`aws route53 list-hosted-zones-by-name --dns-name $DOMAIN | jq --raw-output '.HostedZones[0].Id'`
echo "ZONEID is $ZONEID"
cp r53acm1.json r53acm1-mod.json
find r53acm1-mod.json -type f -exec sed -i -e "s/##TARGETGOESHERE##/$VALUECNAME1/g" {} \;
find r53acm1-mod.json -type f -exec sed -i -e "s/##DOMAINGOESHERE##/$NAMECNAME1/g" {} \;
aws route53 change-resource-record-sets --hosted-zone-id $ZONEID --change-batch file://r53acm1-mod.json
rm -f r53acm1-mod.json r53acm1-mod.json-e 
