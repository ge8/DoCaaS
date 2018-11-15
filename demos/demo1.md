# Prep: 
* Incognito on customer1.estaba.net and customer2.estaba.net
* Incognito on https://aws-amplify.github.io/
* VSC on front-end/customer1
* demo1.md open in VSC
* thisisnotgerardo’s gmail open
* Close everything + WorkDocs + Google Drive
* Clean Desktop Up

# Demo1: What we'll do: Add Secure Sign Up Sign In to customer1.
1. Show app: customer1.estaba.net and customer2.estaba.net
2. Amplify: Create Cognito User Pool
3. Modify ReactJS to start using Cognito UI and standard flows
4. npm start - Show sign up/sign in
5. Modify NodeJS to check authentication using Cognito instead of Basic Auth.

# Demo1
* Initialize Amplify
```shell
amplify init # takes 1 min. Amplify Docs
```
* Create Amazon Cognito User Pool
```shell
amplify add auth #prompts
amplify push # "y" confirm then takes 3 min. Update Apps
```
* Configure App with Amplify
```js
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
```
* Add Cognito's Authenticator Component (withAuthenticator HOC) Go to "Using Components in React".
```js
import { withAuthenticator } from 'aws-amplify-react';
...
export default withAuthenticator(App);
```
* Using Cognito's session info instead of Basic Auth. Hide App.js Line 37 and unhide Lines 40-46. & Display Buttons based on plan attribute -> default to gold


* Remove Previous Login Button. Header.js lines 27-29.

* Modify Backend code. Hide Basic Auth Auth.js lines 11-16, unhide line 19. Explain cognito.js

* Test & Deploy App - takes 5 minutes.
```shell
npm install
npm start
cd ../../demos
./updateapp1withcognito.sh
```
