# Demo2: What we'll do: Deploy a new API getting Isolation and Data Partitioning fixed once.

1. SAM Template: to deploy API + Lambda Authorizer + CORS
* Get Cognito's Identity Pool ID into template and deploy it template
```shell
aws cognito-identity list-identity-pools --max-results 50

cd ../lambdas/src
npm install
cd ../
./deploy-demo2-SAM.sh
```

2. Lambda Authorizer.
```shell
sam --version
sam validate --template demo2-template.yaml

# Add JWT token to auth-request.json from Demo1 local ITERM2
sam local invoke AuthoriserFunction -e auth-request.json --template demo2-template.yaml --skip-pull-image 
sam local invoke AuthoriserFunction -e auth-request.json --template demo2-template.yaml -d 5858 --skip-pull-image 
```

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
