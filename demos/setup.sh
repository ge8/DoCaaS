#Script to set up the initial environment + apps

# Takes a domain name imported into R53 and an S3 bucket
BUCKET=docaas
export ARTIFACT_BUCKET=$BUCKET
echo "Artifact Bucket: $BUCKET"

BUCKETC1=docaasc1
export ARTIFACT_BUCKETC1=$BUCKETC1
echo "Artifact Bucket: $BUCKETC1"

BUCKETC2=docaasc2
export ARTIFACT_BUCKETC2=$BUCKETC2
echo "Artifact Bucket: $BUCKETC2"

DOMAIN=estaba.net
export ARTIFACT_DOMAIN=$DOMAIN
echo "Artifact Domain: $DOMAIN"

# AWS Monoliths setup
## Create 2 EC2 instances (cust 1 and Cust 2)
## deploy monolith/customer1 on EC2-1, and monolith/customer2 on EC2-2
## git clone https://github.com/ge8/docaas
## cd docaas-react
## npm run-script build
## aws s3 sync build/ s3://$BUCKET --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete


## Create 2 ALBs with ACM (Cust 1 and Cust 2) - Output ALB1 and ALB2.
### Create a load balancer using CreateLoadBalancer .
### Create a target group using CreateTargetGroup .
### Register targets for the target group using RegisterTargets .
### Create one or more listeners for your load balancer using CreateListener 



# AWS front-end setup
git clone https://github.com/ge8/docaas
cd front-end/customer1 #yet to be created!
npm run-script build
aws s3 sync build/ s3://$BUCKETc1 --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete

cd ../customer2
npm run-script build #yet to be created!
aws s3 sync build/ s3://$BUCKETc2 --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete








##Enable Static Website Hosting at index.html, Public Read.
##Create public certificate in ACM in VIRGINIA! + Create CNAMEs in R53 to validate certificate -> takes 1-2 minute.
##Create web cloudfront distro + origin + viewer protocol redirect http to https + custom caching TTLs = 0 + custom SSL cert! TAKES AGES 10 minutes
##Point R53 A ALIAS and CNAME (www) record to cloudfront distro





