# DoCaaS
Deck of Cards as a Service
 
## Machine requirements for docaas-react: (Review which one is installing globally or inside project)
```shell
npm install ajv
npm install --save reactstrap react react-dom
npm install jquery
npm install --save boostrap
npm i react-boostrap
npm install -g create-react-app
```

## AWS Requirement:
* Domain name imported into Route53
* S3 Bucket

## Set-up Script 
### AWS
* Set-up script (takes domain and S3 bucket param)
* Enable Static Website Hosting at index.html, Public Read.
* Create public certificate in ACM in VIRGINIA! + Create CNAMEs in R53 to validate certificate -> takes 1-2 minute.
* Create web cloudfront distro + origin + viewer protocol redirect http to https + custom caching TTLs = 0 + custom SSL cert! TAKES AGES 10 minutes
* Point R53 A ALIAS and CNAME (www) record to cloudfront distro

### React App - clone, build, deploy
* move into directory for app.
* git clone https://github.com/ge8/docaas
* cd docaas-react
* npm run-script build
* aws s3 sync build/ s3://docaas --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete

## ReactJS build and deploy:
```shell
npm run-script build
aws s3 sync build/ s3://docaas --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete
```

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

# Questions!
* Caching in browser? caching with cloudfront but origin changed!
* Review which npms are installing globally or inside project

# APIs Convention
GET /path Header 
  (Authorization Basic user:password)
  (deckId:deckId)

API Response: {id:id cards:[cards]}