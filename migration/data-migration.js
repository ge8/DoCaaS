'use strict';
// import SDK
var AWS = require('aws-sdk');
// initialize dynamodb and cognito
var dynamodb = new AWS.DynamoDB({region:"us-west-2"});
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({region:"us-west-2"});
var USER_POOL_ID = process.env.USERPOOLID

// Get <sub> for customer1. Parameters: customer1 & COGNITOPOOLID 
var params = {
    UserPoolId: USER_POOL_ID, /* required */
    Username: 'customer1' /* required */
    };
    cognitoidentityserviceprovider.adminGetUser(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else {
            console.log(data);           // successful response
            data.UserAttributes.forEach(function (element) {
                if (element.Name === "sub") {
                    var C1SUB = element.Value;
                    console.log(C1SUB);
                }
            })
        }

    });



dynamodb.batchGetItem(params, function (err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });