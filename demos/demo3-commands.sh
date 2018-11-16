





# Deploy New DynamoDBs
cd ../lambdas
./deploy-dynamos.sh







# Author new GET function








# Deploy SAM template
./deploy-demo3-SAM.sh









# Show new app for customer 1 and 2. Grab Identity IDs & JWT token







# Data Migration

cd ../migration
npm install aws-sdk

aws dynamodb scan --table-name data-customer1
aws dynamodb scan --table-name data-customer2
aws dynamodb scan --table-name decks-master
aws dynamodb scan --table-name games-master
IDENTITYID1=xxxxxxxxxx IDENTITYID2=yyyyyyyyy node data-migration.js # Replace with actual Identity IDs

aws dynamodb scan --table-name decks-master
aws dynamodb scan --table-name games-master







# Show New App @ estaba.net


# Prove customer2 can't access shuffle. # Insomnia



