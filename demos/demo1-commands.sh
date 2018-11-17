



# customer1.estaba.net and customer2.estaba.net







# New multi-tenant app
rsync -ax --exclude 'node_modules' front-end/customer1 ../docaas







# Amplify: Create Cognito User Pool
cd multi-tenant-app
amplify init 







amplify add auth 
amplify push







# Amplify: Configure App with Cognito








# Test App & Create customer1 in Cognito
npm install
npm start # leave open








# Deploy
npm run-script build
aws s3 sync build/ s3://docaas --acl public-read-write #use your own S3 bucket



