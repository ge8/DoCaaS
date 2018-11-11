# Demo2: What we'll do: Deploy a new API getting Isolation and Data Partitioning fixed once.
1. SAM Template: to deploy API + Lambda Authorizer + CORS (Manually Add COGNITO). (1 min)
2. Lambda Authorizer: show output.
3. Data Partitioning: Create new IAM Role for default authentication in Cognito.
4. Standardise Service Offering: create Cognito attribute + Initialise customer 1 and two with plans + Add Authentication Policy/ Cognito_Poolname_ AUTH. 
5. Main DoCaaS react app -> Flag to show buttons based on plan - Embed APIGW mainulr. Deploy.
6. Show Customer2 user (reset password)
7. Grab a token from browser and show them in jwt.io

# Demo2 - us-west-2:710e892d-fb08-4ed2-bfba-413d4d0d2927
1. Get Cognito's Identity Pool ID into template and deploy it template
```shell
aws cognito-identity list-identity-pools --max-results 50
./deploy-demo2-SAM.sh
```


3. Create IAM policies
```shell
aws iam create-policy --policy-name DoCaaSDynamoPolicyForAuthenticated --policy-document file://cognito-auth-policy1.json
aws iam create-policy --policy-name DoCaaSDefaultPolicyForAuthenticated --policy-document file://cognito-auth-policy2.json
```
4. Attach the policies to Cognito's Auth Role + Create plan attribute + Set Customer1 and Customer2 with Silver and Bronze plans
```shell
./cognitosetup.sh
```

5. Modify mainURL in MainBody.js with APIGW endpoing & and homepage in package.json with https://DOMAIN
* Display Buttons based on plan attribute
* Build and Deploy to bucket.
```shell
npm install
npm run-script build
aws s3 sync build/ s3://$BUCKET --acl public-read-write
```
