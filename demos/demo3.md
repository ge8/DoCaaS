# Demo3: What we'll do: Break the monolith into Serverless Microservices
1. Author GET function. *How to test, debug?*
2. SAM Template: Microservices. (Deploy first, then explain)
3. Test with Insomnia.
4. Migration: show+run script for datastore migration per customer.
5. Migration: DNS change. 
6. Test with Insomina. (Test Data Partitioning, Isolation)

# Demo3
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
