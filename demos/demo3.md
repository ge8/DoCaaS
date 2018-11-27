# Demo3: Break the monolith into Serverless Microservices
0. Go to your domain on the browser, login as customer1 and customer2, and copy Identity IDs & JWT token from the browser's console. Make sure to use incognito sessions or clear your browser's cache.
* Inspect the JWT tokens at jwt.io

1. Deploy New DynamoDBs
```shell
cd ../lambdas
./deploy-dynamos.sh
```

2. Inspect new Lambdas and compare them to the monoliths'.

3. Inspect and deploy SAM template
```shell
./deploy-demo3-SAM.sh
```

4. Data Migration
* Open the DynamoDB console and check out the existing decks and scores in the monolith's datastores.
* Populate Identity ID's into the script below and then run the script
```shell
cd ../migration

IDENTITYID1=xxxxxxxxxx IDENTITYID2=yyyyyyyyy node data-migration.js # Replace with actual Identity IDs
```

5. Use new app and check migrated decks and scores are working.

6. Prove customer2 can't access shuffle by execurting REST API calls with Insomnia.

