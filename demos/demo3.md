# Demo3: Break the monolith into Serverless Microservices
1. Deploy New DynamoDBs
```shell
cd ../lambdas
./deploy-dynamos.sh
```

2. Author new GET function. *How to test, debug?*

3. Deploy SAM template
```shell
./deploy-demo3-SAM.sh
```

4. Show new app for customer 1 and 2. Grab Identity IDs 
* Grab a token from browser and show them in jwt.io

5. Run Data Migration script
```shell
cd ../migration
npm install aws-sdk

aws dynamodb scan --table-name data-customer1
aws dynamodb scan --table-name data-customer2
aws dynamodb scan --table-name decks-master
aws dynamodb scan --table-name games-master
IDENTITYID1=xxxxxxxxxx IDENTITYID2=yyyyyyyyy node data-migration.js # Replace with actual Identity IDs

aws dynamodb scan --table-name decks-master
aws dynamodb scan --table-name games-master
```

5. Show new apps
