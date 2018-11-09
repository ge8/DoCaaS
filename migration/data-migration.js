'use strict';
// import SDK
var AWS = require('aws-sdk');
// initialize dynamodb and cognito
var dynamodb = new AWS.DynamoDB({region:"us-west-2"});
var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({region:"us-west-2"});
var USER_POOL_ID = process.env.USERPOOLID

// Get <sub> for customer1. Parameters: customer1 & COGNITOPOOLID 
var params1 = {
    UserPoolId: USER_POOL_ID, /* required */
    Username: 'customer1' /* required */
    };
cognitoidentityserviceprovider.adminGetUser(params1, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        data.UserAttributes.forEach(function (element) {
            if (element.Name === "sub") {
                var C1SUB = element.Value;
                console.log(C1SUB);
            }
        })
    }
}).promise();

// Get <sub> for customer2. Parameters: customer2 & COGNITOPOOLID 
var params2 = {
    UserPoolId: USER_POOL_ID, /* required */
    Username: 'customer2' /* required */
};
cognitoidentityserviceprovider.adminGetUser(params2, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        data.UserAttributes.forEach(function (element) {
            if (element.Name === "sub") {
                var C2SUB = element.Value;
                console.log(C2SUB);
            }
        })
    }
}).promise();

// Scan customer1 DB
var paramsscan = {
    TableName: "data-customer1",
};

dynamodb.scan(paramsscan, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
        console.log(data);           // successful response
        data.Items.forEach( function (element) {
            if (element.id.stringify().slice(0,3) === "deck") {
                DECKID = element.id.stringify().replace("deck-","");
                console.log("The Deck ID is" + DECKID);
            }
            
        });
    }
});



// Iterate over Items, modify them into two Items (Decks, Games).

// var params = {
//     Item: {
//         "id": { S: C1SUB + DECKID}
//       }
//     }, 
//     TableName: "decks-master"
//    };
//    dynamodb.putItem(params, function(err, data) {
//      if (err) console.log(err, err.stack); // an error occurred
//      else {
//         console.log(data);           // successful response

//      }
//    });


// Put into Decks and Games

