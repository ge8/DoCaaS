





cd ../lambdas
./deploy-dynamos.sh









./deploy-demo3-SAM.sh







# Show new app for customer 1 and 2. Grab Identity IDs. No API calls yet.






aws dynamodb scan --table-name data-customer1
aws dynamodb scan --table-name data-customer2
aws dynamodb scan --table-name decks-master
aws dynamodb scan --table-name games-master
cd ../migration
npm install aws-sdk
IDENTITYID1=us-west-2:96da80e9-2301-4a45-8dfd-bae7529d5994 IDENTITYID2=us-west-2:dc286725-0a0e-42fb-a5d2-db95e42cc1b8 node data-migration.js # Replace with actual Identity IDs

aws dynamodb scan --table-name decks-master
aws dynamodb scan --table-name games-master






./c1addr53record.sh
./c2addr53record.sh
