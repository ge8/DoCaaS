





cd ../lambdas
./deploy-dynamos.sh









./deploy-demo3-SAM.sh







# Show new app for customer 1 and 2. Grab Identity IDs 







cd ../migration
npm install aws-sdk
IDENTITYID1=xxxxxxxxxx IDENTITYID2=yyyyyyyyy node data-migration.js # Replace with actual Identity IDs







./c1addr53record.sh
./c2addr53record.sh
