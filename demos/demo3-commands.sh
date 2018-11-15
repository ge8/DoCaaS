





cd ../lambdas
./deploy-dynamos.sh









./deploy-demo3-SAM.sh







# Current endpoint for app.







cd ../migration
npm install aws-sdk
IDENTITYID=us-west-2_qHHyA8fae CUSTOMER=customer1 node data-migration.js # Replace with actual Identity ID for customer 1








./c1addr53record.sh
./c2addr53record.sh
