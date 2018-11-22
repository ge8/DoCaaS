





# Update Lambda Authorizer with gold plan.









# Add Cut Button to App and deploy
cd ../multi-tenant-app
npm run-script build
aws s3 sync build/ s3://docaas --acl public-read-write
# Add Cut to SAM Template and deploy
cd ../lambdas
./deploy-demo4-SAM.sh







# Show template and Cut function









# Upgrade customer 1 plan to gold
aws cognito-idp list-user-pools --max-results 50

aws cognito-idp admin-update-user-attributes --user-pool-id XXXXXXXXXXXXXX --username customer1 --user-attributes Name=custom:plan,Value=gold
aws cognito-idp admin-user-global-sign-out --user-pool-id XXXXXXXXXXXXXX --username customer1








# Show new button in action.