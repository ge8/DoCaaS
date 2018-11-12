# Demo4: What we'll do: New Plan + Cut microservice.
1. Update Lambda Authorizer with gold plan.
2. Author Cut Lambda
3. Add Cut Lambda to SAM Template
4. Deploy SAM Template.
5. Add Cut Button to App and deploy.
6. Upgrade customer 1 plan by modifying CUP attribute.
7. Show new button in action.

# Demo4


4. Deploy new template
```shell
cd ../lambdas
./deploy-demo4-SAM.sh
```

5. Build and Deploy App to bucket.
```shell
cd ../docaas-app
npm install
npm run-script build
aws s3 sync build/ s3://estaba --acl public-read-write #Use your own bucket instead of estaba
```
6. Make customer 1 plan=gold
```shell
aws cognito-idp list-user-pools --max-results 50
aws cognito-idp admin-update-user-attributes --user-pool-id USERPOOLID --username customer1 --user-attributes Name=custom:plan,Value=gold #Change USERPOOLID with the one from previous call.
```
