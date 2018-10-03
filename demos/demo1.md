## Demo1
* Add amplify libraries into app
```shell
npm install --save aws-amplify #takes seconds
npm install --save aws-amplify-react #takes seconds
```
* Initialize Amplify
```shell
amplify init #prompts + 10 seconds
```
* Create Amazon Cognito User Pool
```shell
amplify add auth #prompts
amplify push #takes about 1 min+?
```
* Configure App with Amplify
```js
import Amplify, { Auth } from 'aws-amplify';
import aws_exports from './aws-exports';
Amplify.configure(aws_exports);
```
* Add Cognito's Authenticator Component (withAuthenticator HOC) Go to **Using Components in React**.
```js
import { withAuthenticator } from 'aws-amplify-react';
...
export default withAuthenticator(App);
```

* Remove Previous Login Button. Header.js lines 31-33.

* Change state to LOGGED using Cognito's session info. App.js Lines 31-39
