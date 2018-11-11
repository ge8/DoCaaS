'use strict';
// import SDK
let AWS = require('aws-sdk');
// initialize dynamodb and cognito
let dynamodb = new AWS.DynamoDB({region:"us-west-2"});
let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({region:"us-west-2"});
let USER_POOL_ID = process.env.USERPOOLID


// Get <sub> for customer1.
let params = {
    UserPoolId: USER_POOL_ID, /* required */
    Username: 'customer1' /* required */
};
let GetUserSub = cognitoidentityserviceprovider.adminGetUser(params).promise();
GetUserSub.then(function(data) {
    let C1SUB = "";
    data.UserAttributes.forEach(function (element) {
        if (element.Name === "sub") {
            C1SUB = element.Value;
            console.log("C1SUB is: " + C1SUB);
        }
    })
    // Scan customer-1 DB
    let params = {
        TableName: "data-customer1"
    };
    let ScanDynamo = dynamodb.scan(params).promise();
    ScanDynamo.then(function(data) {    
        data.Items.forEach( function (item) {
            // Check for customer 1 Decks
            if (item.id.S.substring(0,4) === "deck") {
                // Replace "deck" for <sub> and write customer 1 decks to decks-master
                let ID = { S: C1SUB + item.id.S.slice(4) };
                let CARDS = { L: item.cards.L };
                let params = {
                    TableName: "decks-master",
                    Item: {"id": ID, "cards": CARDS},
                    ReturnConsumedCapacity: "TOTAL",
                };
                let PutToMaster = dynamodb.putItem(params).promise();
                PutToMaster.then(function(data) {
                    console.log ("Customer 1 item written to decks-master: " + ID.S);
                }).catch(function(err) {
                    console.log(err);
                });
                // If scores exits, write customer 1 scores to games-master
                if (item.scores) {
                    let SCORES = { L: item.scores.L };
                    let params = {
                        TableName: "games-master",
                        Item: {"id": ID, "scores": SCORES},
                        ReturnConsumedCapacity: "TOTAL",
                    };
                    let PutToMaster = dynamodb.putItem(params).promise();
                    PutToMaster.then(function(data) {
                        console.log ("Customer 1 item written to games-master: " + ID.S);
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
            }       
        });
    }).catch(function(err) {
        console.log(err);
    });
}).catch(function(err) {
    console.log(err);
});

// Get <sub> for customer2.
params = {
    UserPoolId: USER_POOL_ID, /* required */
    Username: 'customer2' /* required */
};
GetUserSub = cognitoidentityserviceprovider.adminGetUser(params).promise();
GetUserSub.then(function(data) {
    let C2SUB = "";
    data.UserAttributes.forEach(function (element) {
        if (element.Name === "sub") {
            C2SUB = element.Value;
            console.log("C2SUB is: " + C2SUB);
        }
    })
    // Scan customer-2 DB
    let params = {
        TableName: "data-customer2"
    };
    let ScanDynamo = dynamodb.scan(params).promise();
    ScanDynamo.then(function(data) {    
        data.Items.forEach( function (item) {
            // Check for customer 2 Decks
            if (item.id.S.substring(0,4) === "deck") {
                // Replace "deck" for <sub> and write customer 2 decks to decks-master
                let ID = { S: C2SUB + item.id.S.slice(4) };
                let CARDS = { L: item.cards.L };
                let params = {
                    TableName: "decks-master",
                    Item: {"id": ID, "cards": CARDS},
                    ReturnConsumedCapacity: "TOTAL",
                };
                let PutToMaster = dynamodb.putItem(params).promise();
                PutToMaster.then(function(data) {
                    console.log ("Customer 2 item written to decks-master: " + ID.S);
                }).catch(function(err) {
                    console.log(err);
                });
                // If scores exits, write customer 2 scores to games-master
                if (item.scores) {
                    let SCORES = { L: item.scores.L };
                    let params = {
                        TableName: "games-master",
                        Item: {"id": ID, "scores": SCORES},
                        ReturnConsumedCapacity: "TOTAL",
                    };
                    let PutToMaster = dynamodb.putItem(params).promise();
                    PutToMaster.then(function(data) {
                        console.log ("Customer 2 item written to games-master: " + ID.S);
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
            }       
        });
    }).catch(function(err) {
        console.log(err);
    });
}).catch(function(err) {
    console.log(err);
});