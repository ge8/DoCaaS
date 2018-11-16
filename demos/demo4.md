# Demo4: What we'll do: New Plan + Cut microservice.
1. Upgrade customer 1 plan to gold by modifying CUP attribute.
```shell
aws cognito-idp list-user-pools --max-results 50

aws cognito-idp admin-update-user-attributes --user-pool-id USERPOOLID --username customer1 --user-attributes Name=custom:plan,Value=gold #Change USERPOOLID with the one from previous call.
```

2. Update Lambda Authorizer with gold plan.

3. Author Cut Lambda

4. Add Cut Lambda to SAM Template and deploy
```shell
cd ../lambdas
./deploy-demo4-SAM.sh
```

5. Add Cut Button to App and deploy.
```shell
cd ../multi-tenant-app
npm run-script build
aws s3 sync build/ s3://docaas --acl public-read-write #use your own S3 bucket
```

6. Show new button in action.