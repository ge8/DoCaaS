# Demo3: What we'll do: Break the monolith into Serverless Microservices
0. Deploy Two new Dynamo
1. Author GET function. *How to test, debug?*
2. SAM Template: Microservices. (Deploy first, then explain... How long does deploy take?)
3. Data Migration: show+run script for datastore migration per customer. (TTD)
4. Test success with Insomnia. Try to have C1 access C2. (Adam to explain)
5. Migration: DNS change to redirect customer1.xxx to xxx.com 

# Demo3
0. Deploy New DynamoDBs
```shell
cd ../lambdas
./deploy-dynamos.sh
```

1. Deploy new template
```shell
./deploy-demo3-SAM.sh
```


3. Run Data Migration script
```shell
cd ../migration
aws cognito-idp list-user-pools --max-results 50
npm install aws-sdk
USERPOOLID=us-west-2_qHHyA8fae node data-migration.js # Replace us-west-2_qHHyA8fae with one from previous call
```

5. R53 update
```shell
./c1addr53record.sh
./c2addr53record.sh
```