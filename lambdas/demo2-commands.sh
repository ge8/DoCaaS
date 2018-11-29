




# SAM Template
aws cognito-identity list-identity-pools --max-results 50

cd ../lambdas
./deploy-demo2-SAM.sh









# Lambda Authorizer









sam --version
sam validate --template demo2-template.yaml

# Add JWT token to auth-request.json from Demo1 local ITERM2 + Option+Shift+F
sam local invoke AuthoriserFunction -e auth-request.json --template demo2-template.yaml --skip-pull-image 






# Data Partitioning
aws iam create-policy --policy-name DoCaaSDynamoPolicyForAuthenticated --policy-document file://cognito-auth-policy1.json
aws iam create-policy --policy-name DoCaaSDefaultPolicyForAuthenticated --policy-document file://cognito-auth-policy2.json

./cognitosetup.sh







# Add API endpoint to multi-tenant-app
aws cloudformation describe-stacks --stack-name docaas --query "Stacks[0].Outputs" 

cd ../multi-tenant-app
npm run-script build
aws s3 sync build/ s3://docaas --acl public-read-write



