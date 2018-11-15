# Demo3: What we'll do: Break the monolith into Serverless Microservices
0. Deploy Two new Dynamo
1. Author GET function. *How to test, debug?*
2. SAM Template: Microservices. (Deploy first, then explain... How long does deploy take?)
3. Show existing endpoing for app for customer1. Grab Identity ID from console.
4. Data Migration: show+run script for datastore migration per customer. (TTD)
5. Test success with Insomnia. Try to have C1 access C2. (Adam to explain)
6. Migration: DNS change to redirect customer1.xxx to xxx.com 

# Demo3
0. Deploy New DynamoDBs
```shell
cd ../lambdas
./deploy-dynamos.sh
```

1. Deploy new template
```shell
aws cognito-identity list-identity-pools --max-results 50
./deploy-demo3-SAM.sh
```

3. Show new app for customer 1 and 2. Grab Identity IDs 

4. Run Data Migration script
```shell
cd ../migration
npm install aws-sdk
IDENTITYID1=xxxxxxxxxx IDENTITYID2=yyyyyyyyy node data-migration.js # Replace with actual Identity IDs
```

5. R53 update
```shell
./c1addr53record.sh
./c2addr53record.sh
```

6. Show 2 apps
