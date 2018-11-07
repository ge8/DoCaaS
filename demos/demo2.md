# Demo2: What we'll do: Deploy a new API getting Isolation and Data Partitioning fixed once.
1. Data Partitioning: Create new IAM Role for default authentication in Cognito.
2. Standardise Service Offering: create Cognito attribute + Initialise customer 1 and two with plans + Add Authentication Policy/ Cognito_Poolname_ AUTH.
3. SAM Template: to deploy API + Lambda Authorizer + CORS (Manually Add COGNITO)
4. Lamda Authorizer: show output.
(Pre-deployed?)

# Demo2
* Create IAM policies for Authenticated Cognito Users
```shell
aws iam create-policy --policy-name DynamoPolicyForAuthenticatedUsers --policy-document file://cognito-auth-policy1.json
aws iam create-policy --policy-name DefaultPolicyForAuthenticatedUsers --policy-document file://cognito-auth-policy2.json
```
* Create IAM Role in SAM template
