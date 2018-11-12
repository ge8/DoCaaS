#!/bin/bash

. ./loadvariables.sh

ROLENAMEAUTH=customer1-20181111211422-authRole

AWSACCOUNT=`aws sts get-caller-identity --output text --query 'Account'`
echo "The AWS Account is: $AWSACCOUNT"


# Attach 2 policies to Authenticated Role
aws iam detach-role-policy --role-name $ROLENAMEAUTH --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDynamoPolicyForAuthenticated
aws iam detach-role-policy --role-name $ROLENAMEAUTH --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDefaultPolicyForAuthenticated
