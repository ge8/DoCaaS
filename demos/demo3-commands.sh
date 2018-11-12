





cd ../lambdas
./deploy-dynamos.sh









./deploy-demo3-SAM.sh









cd ../migration
aws cognito-idp list-user-pools --max-results 50

npm install aws-sdk
USERPOOLID=us-west-2_qHHyA8fae node data-migration.js # Replace us-west-2_qHHyA8fae with one from previous call








./c1addr53record.sh
./c2addr53record.sh
