# Demo1: Create new multi-tenant app and add Cognito to customer1.
0. Check out existing single tenant apps: customer1.<yourdomain> and customer2.<yourdomain>. Create a handful of decks and games for both customers.
* Explore front-end code and monolith code.

1. Create the new multi-tenant app
* Copy customer1's app.
```shell
rsync -ax --exclude 'node_modules' front-end/customer1 ../docaas
mv customer1 multi-tenant-app && cd multi-tenant-app && npm install

```
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
amplify push # "y" confirm then takes 3 min.
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
* Using Cognito's session info instead of Basic Auth. Hide App.js' two basic auth lines and unhide cognito's lines.
* Remove Previous Login Button. Header.js lines 27-29.
* Test App & Create customer1 in Cognito
```shell
npm start #Grab JWT token for demo2
```
* Build and Deploy to bucket.
```shell
npm run-script build
aws s3 sync build/ s3://docaas --acl public-read-write #use your own S3 bucket
```
