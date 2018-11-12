



cd ../lambdas
./deploy-demo4-SAM.sh






cd docaas-app
npm install
npm run-script build
aws s3 sync build/ s3://estaba --acl public-read-write #Use your own bucket instead of estaba





aws cognito-idp list-user-pools --max-results 50
aws cognito-idp admin-update-user-attributes --user-pool-id $USERPOOLID --username customer1 --user-attributes Name=custom:plan,Value=gold #Change USERPOOLID with the one from previous call.


