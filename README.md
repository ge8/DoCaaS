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

# GPSTEC405 - Optimize Your SaaS Offering with Serverless Microservices

In this hands-on session, we crack open the IDE and transform a SaaS web app comprised of several monolithic single-tenant environments into an efficient, scalable, and secure multi-tenant SaaS platform using ReactJS and NodeJS serverless microservices.

We use Amazon API Gateway and Amazon Cognito to simplify the operation and security of the service’s API and identity functionality. We enforce tenant isolation and data partitioning with OIDC’s JWT tokens. We leverage AWS SAM and AWS Amplify to simplify authoring, testing, debugging, and deploying serverless microservices, keeping operational burden to a minimum, maximizing developer productivity, and maintaining a great developer experience.

--------------------
Story, with live demos (level 400).
Focus: Architecture, Development, Security.
Not included: CI/CD

Theme: Speed of delivery (dev productivity)

Decision: Move to multitenant SaaS.

## Step 0 (Prepare)
•	Run prepare script
o	creates 2 monoliths (from repo) + ALB – with cfn (so that we can kill it with delete-stack after Demo 2)
o	Route53 script.
o	build and publish front-end (from repo)

## DEMO 1: Centralise Identity. Tech: Cognito over console, AWS Amplify. Why: Simplify, save time, secure.
•	Test app in monoliths: Visual and with Insomnia.
•	Show current App front-end code and back-end. 
•	Deploy Cognito (Console)
•	Modify Front-end App (Cognito for sign in/up with snippet)
o	Build + Publish
•	Modify Monoliths code (if basic auth or Cognito for sign in/up with snippet)
o	Push update somehow to monoliths. (how? CodeDeploy?)
•	Test New App

## DEMO 2: New Environment: Breaking the monoliths into Serverless Microservices with Standardised Offering and Identity Isolation. Tech: APIGW, Lambda, SAM, Why: Minimize Operational burden (Free Up Engineering Cycles), Dev Experience, Automated Onboarding.
•	Standardized Service Offering into 2!
o	Bronze: Create, Get, Deal.
o	Silver: Create, Get, Deal, Shuffle.
•	Create Token Manager: library to simplify user management.
o	Show code.
•	APIGW – with Authoriser + 4 Lambdas (existing) + 2 New Lambdas (Game + Deck)+ 2 Dynamos
o	Show SAM templates.
o	Talk about Authoriser Scopes (OIDC???)

## DEMO 3: Microservice Datastores + Data Partitioning + Migration.
•	IAM Roles 
•	Customer 1 migration: Populate with a script – Customer 1 - Test.
•	Customer 2 migration: Populate with a script – Customer 2 - Test.
•	Test isolation!!!
•	Decommission monoliths. 
o	Script to kill!

## DEMO 4: Launch a service offering and new serverless microservice. Tech: SAM author, test, debug. Why: Speed, save time, Developer Experience.
•	Standardized Service Offering into 2!
o	Bronze: Create, Get, Deal.
o	Silver: Create, Get, Deal, Shuffle.
o	NEW Gold: Create, Get, Deal, Shuffle, Cut.
•	Deploy Lambda
•	Update APIGW.
•	Test New Feature


Summary/Takeaways:
o	DevOps principles for Speed
o	From Monolith to Microservices
o	Benefits of Multi-tenant / Pool SaaS.
o	Simplify API Management.
o	Simplify user + isolation for Devs: Cognito
o	OIDC’s standard for isolation and data partitioning.
o	Serverless FTW
o	Infra as Code (SAM)
o	Author, Test, Debug Lamdba (SAM CLI)
o	AWS Amplify.
