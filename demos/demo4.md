# Demo4: Implement New Gold Plan + Cut Service
1. Add Cut Button to App and deploy.
```shell
cd ../multi-tenant-app
npm run-script build
aws s3 sync build/ s3://docaas --acl public-read-write #use your own S3 bucket
```

2. Add Gold plan to Lambda Authorizer, Create Cut function, and add API resources for "Cut" to SAM template
* Update Lambda Authorizer with gold plan that includes "/cut"
* Inspect cut.js function
* Inspect and Deploy updated SAM template with Cut lambda and API resources.
```shell
cd ../lambdas
./deploy-demo4-SAM.sh
```

3. Upgrade customer 1 plan to gold by modifying CUP attribute.
```shell
aws cognito-idp list-user-pools --max-results 50

aws cognito-idp admin-update-user-attributes --user-pool-id USERPOOLID --username customer1 --user-attributes Name=custom:plan,Value=gold #Change USERPOOLID with the one from previous call.
aws cognito-idp admin-user-global-sign-out --user-pool-id USERPOOLID --username customer1

```

4. Go to your domain in the browser and test your new service. Make sure to use incognito sessions or clear your browser's cache.