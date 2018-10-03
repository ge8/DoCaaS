# DoCaaS
Deck of Cards as a Service
 
## Machine requirements for docaas-react: (Review which one is installing globally or inside project)
```shell
npm install ajv
npm install --save reactstrap react react-dom
npm install jquery
npm install --save boostrap
npm i react-boostrap
npm install -g @aws-amplify/cli
amplify configure
```

## AWS Requirement:
* Domain name imported into Route53
* S3 Bucket

## Set-up Demo: Sets up 2 monoliths on EC2, builds and deploy front-end app to public hosting S3 bucket with CloudFront and points domain name to app.
Run setup.sh script 


# Questions!
* Caching in browser? caching with cloudfront but origin changed!
* Review which npms are installing globally or inside project

# APIs Convention
GET /path Header 
  (Authorization Basic user:password)
  (deckId:deckId)

API Response: {id:id cards:[cards]}