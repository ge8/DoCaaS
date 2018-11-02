# Deck of Cards as a Service (DoCaaS)
This is a asdasdasd

## Requirement -> An AWS account with:
* Domain name imported into Route53
* 3 x S3 Bucket in Oregon region (us-west-2)
* An IAM user with admin permissions.

##Setup
* Install machine requirements including the AWS CLI (Pyhton 3), the AWS EB CLI, the AWS Amplify CLI and the SAM CLI
```shell
npm install ajv
npm install --save reactstrap react react-dom
npm install jquery
npm install --save boostrap
npm i react-boostrap

pip3 install awscli --upgrade --user #does it install EB CLI?
npm install -g @aws-amplify/cli
```
* Configure the AWS CLI, Amplify CLI, and the EB CLI - follow prompts
```shell
aws configure #Set de default region to us-west-2 (Oregon)
amplify configure
eb init
```
* Write your DOMAIN, BUCKET, BUCKETC1 and BUCKETC2 names into the loadvariables.sh found in /demos
* Clone repo and run setup script
```shell
git clone https://github.com/ge8/docaas && cd docaas/demos
./acm #create and validate an ACM certificate
./setup-c1.sh #deploy customer 1 app + monolith
./setup-c2.sh #deploy customer 2 app + monolith
```

# Session details: GPSTEC405 - Optimize Your SaaS Offering with Serverless Microservices

In this hands-on session, we crack open the IDE and transform a SaaS web app comprised of several monolithic single-tenant environments into an efficient, scalable, and secure multi-tenant SaaS platform using ReactJS and NodeJS serverless microservices.

We use Amazon API Gateway and Amazon Cognito to simplify the operation and security of the service’s API and identity functionality. We enforce tenant isolation and data partitioning with OIDC’s JWT tokens. We leverage AWS SAM and AWS Amplify to simplify authoring, testing, debugging, and deploying serverless microservices, keeping operational burden to a minimum, maximizing developer productivity, and maintaining a great developer experience.

--------------------
Story, with live demos (level 400).
Focus: Architecture, Development, Security.
Not included: CI/CD

Theme: Speed of delivery (dev productivity)

Decision: Move to multitenant SaaS.

## Step 0 (Prepare)
Run prepare script
*	creates 2 monoliths (from repo) + ALB – with cfn (so that we can kill it with delete-stack after Demo 2)
*	Route53 script.
*	build and publish front-end (from repo)

## DEMO 1: Centralise Identity. Tech: Cognito over console, AWS Amplify. Why: Simplify, save time, secure.
*	Test app in monoliths: Visual and with Insomnia.
*	Show current App front-end code and back-end. 
*	Deploy Cognito (Console)
*	Modify Front-end App (Cognito for sign in/up with snippet)- Build + Publish
*	Modify Monoliths code (if basic auth or Cognito for sign in/up with snippet)
*	Push update somehow to monoliths. (how? CodeDeploy?)
*	Test New App

## DEMO 2: New Environment: Breaking the monoliths into Serverless Microservices with Standardised Offering and Identity Isolation. Tech: APIGW, Lambda, SAM, Why: Minimize Operational burden (Free Up Engineering Cycles), Dev Experience, Automated Onboarding.
* Standardized Service Offering into 2!
-	Bronze: Create, Get, Deal.
-	Silver: Create, Get, Deal, Shuffle.
* Create Token Manager: library to simplify user management. Show code.
* APIGW – with Authoriser + 4 Lambdas (existing) + 2 New Lambdas (Game + Deck)+ 2 Dynamos
*	Show SAM templates.
*	Talk about Authoriser Scopes (OIDC???)

## DEMO 3: Microservice Datastores + Data Partitioning + Migration.
*	IAM Roles wit leading key condition 
*	Customer 1 migration: Populate with a script – Customer 1 - Test.
*	Customer 2 migration: Populate with a script – Customer 2 - Test.
*	Test isolation!!!
*	Decommission monoliths.	Script to kill!

## DEMO 4: Launch a service offering and new serverless microservice. Tech: SAM author, test, debug. Why: Speed, save time, Developer Experience.
* Standardized Service Offering into 2!
-	Bronze: Create, Get, Deal.
-	Silver: Create, Get, Deal, Shuffle.
-	NEW Gold: Create, Get, Deal, Shuffle, Cut.
*	Deploy Lambda
*	Update APIGW.
*	Test New Feature


## Summary/Takeaways:
*	DevOps principles for Speed
*	From Monolith to Microservices
*	Benefits of Multi-tenant / Pool SaaS.
*	Simplify API Management.
*	Simplify user + isolation for Devs: Cognito
*	OIDC’s standard for isolation and data partitioning.
*	Serverless FTW
*	Infra as Code (SAM)
*	Author, Test, Debug Lamdba (SAM CLI)
*	AWS Amplify.
