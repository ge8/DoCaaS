




# SAM Template
aws cognito-identity list-identity-pools --max-results 50

cd ../lambdas/src
npm install
cd ../
./deploy-demo2-SAM.sh









# Lambda Authorizer







# Data Partitioning
aws iam create-policy --policy-name DoCaaSDynamoPolicyForAuthenticated --policy-document file://cognito-auth-policy1.json
aws iam create-policy --policy-name DoCaaSDefaultPolicyForAuthenticated --policy-document file://cognito-auth-policy2.json

./cognitosetup.sh







# Add API endpoint to multi-tenant-app
aws cloudformation describe-stacks --stack-name docaas --query "Stacks[0].Outputs" 

cd ../multi-tenant-app
npm run-script build
aws s3 sync build/ s3://docaas --acl public-read-write



