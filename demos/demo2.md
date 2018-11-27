# Demo2: Deploy a new API with Lambda Authorizer for access control, implement Data Partitioning, and abstract complexity with Lambda Authorizer's context.

1. SAM Template
* Get Cognito's Identity Pool ID into template
```shell
aws cognito-identity list-identity-pools --max-results 50
```
* Deploy API + Lambda Authorizer + CORS
```shell
cd ../lambdas
./deploy-demo2-SAM.sh
```

2. Inspect and test authoriser.js with SAM CLI
```shell
sam --version
sam validate --template demo2-template.yaml

# Add JWT token to auth-request.json from Demo1 local ITERM2
sam local invoke AuthoriserFunction -e auth-request.json --template demo2-template.yaml --skip-pull-image 
```
* Inspect output: principal, policy, context.

3. Data Partitioning
* Create IAM policies
```shell
aws iam create-policy --policy-name DoCaaSDynamoPolicyForAuthenticated --policy-document file://cognito-auth-policy1.json
aws iam create-policy --policy-name DoCaaSDefaultPolicyForAuthenticated --policy-document file://cognito-auth-policy2.json
```
* Attach the policies to Cognito's Auth Role + Create plan attribute + Set Customer1 and Customer2 with Silver and Bronze plans
```shell
./cognitosetup.sh
```

4. Add API endpoint to multi-tenant-app
```shell
aws cloudformation describe-stacks --stack-name docaas --query "Stacks[0].Outputs" 
```
* Build and Deploy to bucket.
```shell
cd ../multi-tenant-app
npm run-script build
aws s3 sync build/ s3://docaas --acl public-read-write #use your own S3 bucket
```
