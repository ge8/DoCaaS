



cd ../front-end/customer1
npm install
npm run-script build
cd build/static/js
find ./ -type f -exec sed -i -e "s/##CNAMEGOESHERE##/$CNAMEC1/g" {} \;
find ./ -type f -exec sed -i -e "s/CUSTOMERGOESHERE/customer1/g" {} \;
find ./ -type f -exec sed -i -e "s/DOMAINGOESHERE.com/$DOMAIN/g" {} \;
cd ../../../
cp -vr build/ ../../monoliths/customer1/app/
cd ../../demos