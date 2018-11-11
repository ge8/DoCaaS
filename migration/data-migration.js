'use strict';
// import SDK
let AWS = require('aws-sdk');
// initialize dynamodb and cognito
let dynamodb = new AWS.DynamoDB({region:"us-west-2"});
let cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider({region:"us-west-2"});
let USER_POOL_ID = process.env.USERPOOLID


// Get <sub> for customer1. Parameters: customer1 & COGNITOPOOLID 
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

    // Put Customer 1 C1DECKS and C2DECKS into Decks and Games
    let params = {
        TableName: "data-customer1"
    };
    let ScanDynamo = dynamodb.scan(params).promise();
    ScanDynamo.then(function(data) {
    
        console.log(data.Items);           // successful response
    
        data.Items.forEach( function (item) {
            // Check for Decks
            if (item.id.S.substring(0,4) === "deck") {
                console.log("Found: " + item.id.S.slice(4));
                let ID = { S: C1SUB + item.id.S.slice(4) };
                let CARDS = { L: item.cards.L };
                console.log( ID );
                console.log( CARDS );
                console.log({"id": ID, "cards": CARDS});
                // Write to decks-master
                let params = {
                    TableName: "decks-master",
                    Item: {"id": ID, "cards": CARDS},
                    ReturnConsumedCapacity: "TOTAL",
                };
                let PutToMaster = dynamodb.putItem(params).promise();
                PutToMaster.then(function(data) {
                    console.log ("Successful item written to decks-master: " + data);
                }).catch(function(err) {
                    console.log(err);
                });
            


                // Check for Games for this Deck.


            } 
            
            
            
        });
    
    }).catch(function(err) {
        console.log(err);
    });
    


}).catch(function(err) {
    console.log(err);
});

