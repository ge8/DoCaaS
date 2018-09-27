# DoCaaS
Deck of Cards as a Service
 
Requirements for docaas-react:
npm install ajv
npm install --save reactstrap react react-dom
npm install jquery
npm install --save boostrap
npm i react-boostrap

Requirement:
Domain name imported into Route53.
S3 Bucket.

Set-up script (takes domain param)
Make Bucket with Static Website Hosting at index.html, Public Read.
Create public certificate in ACM in VIRGINIA! + Create CNAMEs in R53 to validate -> takes 1-2 minute.
Create web cloudfront distro + origin + viewer protocol redirect http to https + custom caching TTLs = 0 + custom SSL cert! TAKES AGES 10 minutes
R53 A ALIAS and CNAME record al cloudfront distro


pre-talk-init (takes domain param)



ReactJS deployment:
npm run-script build

aws s3 sync build/ s3://docaas --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete



Question for Adam - caching in browser? caching with cloudfront but origin changed!

---------
APIs
GET /path Header 
  (Authorization Basic user:password)
  (deckId:deckId)

API Response: {id:id cards:[cards]}