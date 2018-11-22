#!/bin/bash

# Get the IDENTITYPOOLID and USERPOOLID
cd ../multi-tenant-app/amplify/backend/
A=`grep "IdentityPoolId" amplify-meta.json`
IDENTITYPOOLID=`echo "{ $A \"t\":1 }" | jq ".IdentityPoolId" --raw-output`
echo "The Identity Pool Id is: $IDENTITYPOOLID"

A=`grep "UserPoolId" amplify-meta.json`
USERPOOLID=`echo "{ $A \"t\":1 }" | jq ".UserPoolId" --raw-output`
echo "The User Pool Id is: $USERPOOLID"
cd ../../../lambdas

# Get the IDENTITYPOOLID Auth Role
ROLENAMEAUTH=`aws cognito-identity get-identity-pool-roles --identity-pool-id $IDENTITYPOOLID --query 'Roles.authenticated' --output text `
echo "The Authenticated Role ARN is: $USERPOOLID"

# Get AWS Account
AWSACCOUNT=`aws sts get-caller-identity --output text --query 'Account'`
echo "The AWS Account is: $AWSACCOUNT"

#Get Cognito Clients
CLIENT1=`aws cognito-idp list-user-pool-clients --user-pool-id $USERPOOLID --max-results 50 --query 'UserPoolClients[0].ClientId' --output text`
echo "The Cognito Client1 is: $CLIENT1"
CLIENT2=`aws cognito-idp list-user-pool-clients --user-pool-id $USERPOOLID --max-results 50 --query 'UserPoolClients[1].ClientId' --output text`
echo "The Cognito Client2 is: $CLIENT2"

# Get RoleNameAuth
INPUT=`aws cognito-identity get-identity-pool-roles --identity-pool-id $IDENTITYPOOLID --query "Roles.authenticated" --output text`
ROLENAMEAUTH=${INPUT#*/}   # remove prefix ending in "/"
echo $ROLENAMEAUTH


# Attach 2 policies to Authenticated Role
aws iam attach-role-policy --role-name $ROLENAMEAUTH --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDynamoPolicyForAuthenticated
aws iam attach-role-policy --role-name $ROLENAMEAUTH --policy-arn arn:aws:iam::$AWSACCOUNT:policy/DoCaaSDefaultPolicyForAuthenticated

# Create Cognito attribute "plan"
aws cognito-idp add-custom-attributes --user-pool-id $USERPOOLID --custom-attributes Name=plan,AttributeDataType=String

# # Make "plan" attribute readable by clients
# aws cognito-idp update-user-pool-client --user-pool-id $USERPOOLID --client-id $CLIENT1 --read-attributes "custom:plan"
# aws cognito-idp update-user-pool-client --user-pool-id $USERPOOLID --client-id $CLIENT2 --read-attributes "custom:plan"

# Add silver plan to customer1
aws cognito-idp admin-update-user-attributes --user-pool-id $USERPOOLID --username customer1 --user-attributes Name=custom:plan,Value=silver
aws cognito-idp admin-user-global-sign-out --user-pool-id $USERPOOLID --username customer1

# Create customer2 with bronze plan and HolaHola1! temporary password.
aws cognito-idp admin-create-user --user-pool-id $USERPOOLID --username customer2 --user-attributes Name=email,Value=thisisnotgerardosemail+1@gmail.com Name=email_verified,Value=true Name=custom:plan,Value=bronze --temporary-password HolaHola1!