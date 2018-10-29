# Prep: 
* incognito on customer1.estaba.net
* Incognito on https://aws-amplify.github.io/
* VSC on front-end/customer1
* thisisnotgerardo’s gmail open

# Demo1:
* Show app: customer1.estaba.net
* I’ll create a Cognito User Pool & Modify my react app to start using it.


## Demo1
* Add amplify libraries into app
```shell
npm install --save aws-amplify 
npm install --save aws-amplify-react #takes 1 min
```
* Initialize Amplify
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
* Change state to LOGGED using Cognito's session info. App.js Lines 36-44

* Remove Previous Login Button. Header.js lines 27-29.

* Modify Backend code!

* Deploy App - takes 5 minutes.
```shell
cd ../../demos
./app1setup.sh
```
