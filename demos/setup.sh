#Script to set up the initial environment + apps

# Takes a domain name imported into R53 and an S3 bucket
BUCKET=docaas
DOMAIN=estaba.net

export ARTIFACT_BUCKET=$BUCKET
export ARTIFACT_DOMAIN=$DOMAIN
echo "Artifact Bucket: $BUCKET"
echo "Artifact Domain: $DOMAIN"

# AWS Set Up 
##Enable Static Website Hosting at index.html, Public Read.
##Create public certificate in ACM in VIRGINIA! + Create CNAMEs in R53 to validate certificate -> takes 1-2 minute.
##Create web cloudfront distro + origin + viewer protocol redirect http to https + custom caching TTLs = 0 + custom SSL cert! TAKES AGES 10 minutes
##Point R53 A ALIAS and CNAME (www) record to cloudfront distro

# Deploy React App
git clone https://github.com/ge8/docaas
cd docaas-react
npm run-script build
aws s3 sync build/ s3://$BUCKET --grants read=uri=http://acs.amazonaws.com/groups/global/AllUsers --delete

# Deploy 2 Monoliths 


