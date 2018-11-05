# Demo4: What we'll do: New Plan + Cut microservice.
1. Update Lambda Authorizer with gold plan.
2. Upgrade customer 1 plan by modifying CUP attribute.
3. Author Cut Lambda
4. Add Cut Lambda to SAM Template
5. Deploy SAM Template.

# Demo4
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
