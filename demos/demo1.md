# Prep: 
* Incognito on customer1.estaba.net and customer2.estaba.net
* Incognito on https://aws-amplify.github.io/
* Firefox incognito ready
* Iterm2 at lambdas
* VSC on docaas
* demo1.md open in VSC
* thisisnotgerardo’s gmail open
* Close everything + WorkDocs + Google Drive
* Clean Desktop Up

# Demo1: What we'll do: Add Secure Sign Up Sign In to customer1.
0. Show app: customer1.estaba.net and customer2.estaba.net

1. New multi-tenant app
* Copy customer1's app.
```shell
rsync -ax --exclude 'node_modules' front-end/customer1 ../docaas
```
* Name: multi-tenant-app
* Modify homepage in package.json with https://estaba.net # Use your domain
* Replace "customer1" with "Welcome to our new DoCaaS App" in index.js

2. Amplify: Create Cognito User Pool
* Initialize Amplify
```shell
amplify init # takes 1 min. Amplify Docs
```
* Create Amazon Cognito User Pool
```shell
amplify add auth #prompts
amplify push # "y" confirm then takes 3 min. Update Apps
```

3. Amplify: Configure App with Cognito
* Import libraries
```js
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
```
* Import withAuthenticator HOC.
```js
import { withAuthenticator } from 'aws-amplify-react';
...
export default withAuthenticator(App);
```
* Using Cognito's session info instead of Basic Auth. Hide App.js Line 37 and unhide Lines 40-46. & Display Buttons based on plan attribute -> default to gold
* Remove Previous Login Button. Header.js lines 27-29.
* Test App & Create customer1 in Cognito
```shell
npm install
npm start #Grab JWT token for demo2
```
* Build and Deploy to bucket.
```shell
npm run-script build
aws s3 sync build/ s3://docaas --acl public-read-write #use your own S3 bucket
```
