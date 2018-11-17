#!/bin/bash

. ./loadvariables.sh

# Get User Pool ID
cd ..
A=`grep "IdentityPoolId" multi-tenant-app/amplify/backend/amplify-meta.json`
IDENTITYPOOLID=`echo "{ $A \"t\":1 }" | jq ".IdentityPoolId" --raw-output`
echo "The Identity Pool Id is: $IDENTITYPOOLID"
sleep 5

# manually discard all changes in local repo (deletes all new local files and changes)
git reset --hard HEAD
git clean -fdx
git pull && cd demos

# Get RoleNameAuth
INPUT=`aws cognito-identity get-identity-pool-roles --identity-pool-id $IDENTITYPOOLID --query "Roles.authenticated" --output text`
ROLENAMEAUTH=${INPUT#*/}   # remove prefix ending in "/"
echo $ROLENAMEAUTH

# Attach 2 policies to Authenticated Role
AWSACCOUNT=`aws sts get-caller-identity --output text --query 'Account'`
echo "The AWS Account is: $AWSACCOUNT"

aws iam detach-role-policy --role-name $ROLENAMEAUTH --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDynamoPolicyForAuthenticated
aws iam detach-role-policy --role-name $ROLENAMEAUTH --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDefaultPolicyForAuthenticated


# delete Amplify Stack
A=`aws cloudformation list-stacks --stack-status-filter UPDATE_COMPLETE | grep '"StackName": "multitenantapp'`
echo $A
STACKNAME=`echo "{ $A \"t\":1 }" | jq ".StackName" --raw-output`
echo "Amplify's Stack Name to delete is: $STACKNAME"
aws cloudformation delete-stack --stack-name $STACKNAME

# Delete docaas SAM stack 
aws cloudformation delete-stack --stack-name docaas

# Delete docaas-dynamos stack
aws cloudformation delete-stack --stack-name docaas-dynamos

# Confirm cfn deleted with Amplify STACK!!
aws cloudformation wait stack-delete-complete --stack-name docaas-dynamos
aws cloudformation wait stack-delete-complete --stack-name docaas
aws cloudformation wait stack-delete-complete --stack-name $STACKNAME

# delete IAM policies DefaultPolicyForAuthenticatedUsers and DynamoPolicyForAuthenticatedUsers
aws iam delete-policy --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDynamoPolicyForAuthenticated
aws iam delete-policy --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDefaultPolicyForAuthenticated

echo "Everything's been reset"


