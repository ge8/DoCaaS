# Demo2: What we'll do: Deploy a new API getting Isolation and Data Partitioning fixed once.
1. SAM Template: to deploy API + Lambda Authorizer + CORS (Manually Add COGNITO). (How long it takes?)
2. Standardise Service Offering: Lamda Authorizer: show output.
3. Data Partitioning: Create new IAM Role for default authentication in Cognito.
4. Standardise Service Offering: create Cognito attribute + Initialise customer 1 and two with plans + Add Authentication Policy/ Cognito_Poolname_ AUTH. Can I default a plan?
5. Main DoCaaS react app -> Flag to show buttons based on plan - Embed APIGW mainulr. Deploy... Show Silver user?
6. Update R53 record.

# Demo2




* Create IAM policies for Authenticated Cognito Users
```shell
aws iam create-policy --policy-name DynamoPolicyForAuthenticatedUsers --policy-document file://cognito-auth-policy1.json
aws iam create-policy --policy-name DefaultPolicyForAuthenticatedUsers --policy-document file://cognito-auth-policy2.json
```
* Create IAM Role in SAM template
