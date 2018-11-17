




# Show new app for customer 1 and 2. Grab Identity IDs & JWT token








# Deploy New DynamoDBs
cd ../lambdas
./deploy-dynamos.h







# Author new GET function








# Deploy SAM template
./deploy-demo3-SAM.sh








# Data Migration

cd ../migration

IDENTITYID1=xxxxxxxxxxxxx IDENTITYID2=yyyyyyyyyy node data-migration.js # Replace with actual Identity IDs







# Show New App @ estaba.net


# Prove customer2 can't access shuffle. # Insomnia



