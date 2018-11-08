# Demo2: What we'll do: Deploy a new API getting Isolation and Data Partitioning fixed once.
1. SAM Template: to deploy API + Lambda Authorizer + CORS (Manually Add COGNITO). (1 min)
2. Standardise Service Offering: Lamda Authorizer: show output.
3. Data Partitioning: Create new IAM Role for default authentication in Cognito.
4. Standardise Service Offering: create Cognito attribute + Initialise customer 1 and two with plans + Add Authentication Policy/ Cognito_Poolname_ AUTH. Can I default a plan?
5. Main DoCaaS react app -> Flag to show buttons based on plan - Embed APIGW mainulr. Deploy...
6. Update R53 record for A record.
7. Show Customer2 user (reset password)

# Demo2
* Get Cognito's Identity Pool ID into template and deploy it template
```shell
aws cognito-identity list-identity-pools --max-results 50
./deploy-scaffolding.sh
```


* Create IAM policies
```shell
aws iam create-policy --policy-name DoCaaSDynamoPolicyForAuthenticated --policy-document file://cognito-auth-policy1.json
aws iam create-policy --policy-name DoCaaSDefaultPolicyForAuthenticated --policy-document file://cognito-auth-policy2.json
```
* Attach the policies to Cognito's Auth Role + Create plan attribute + Set Customer1 and Customer2 with Silver and Bronze plans
```shell
./cognitosetup.sh
```