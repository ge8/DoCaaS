# Prep: 
* Incognito on customer1.estaba.net and customer2.estaba.net
* Incognito on https://aws-amplify.github.io/
* VSC on front-end/customer1
* thisisnotgerardo’s gmail open
* Login for customer 2.

# Demo2: What we'll do: Deploy a new API getting Isolation and Data Partitioning fixed once.
1. Standardise Service Offering: create Cognito attribute + Initialise customer 1 and two with plans.
2. SAM Template: to deploy API + Lambda Authorizer + CORS
3. Lamda Authorizer: show output.
4. Data Partitioning: IAM Role for default authentication in Cognito.

# Demo2
<!-- * Initialize Amplify
```shell
amplify init #prompts + takes 1 min
```
* Create Amazon Cognito User Pool
```shell
amplify add auth #prompts
amplify push #takes 3 min: Go through Amplify Docs.
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
* Using Cognito's session info instead of Basic Auth. Hide App.js Line 37 and unhide Lines 40-46

* Remove Previous Login Button. Header.js lines 27-29.

* Modify Backend code. Hide Basic Auth Auth.js lines 11-16, unhide line 19. Explain cognito.js

* Deploy App - takes 5 minutes.
```shell
cd ../../demos
./updateapp1withcognito.sh
``` -->
