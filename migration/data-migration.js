'use strict';
// import SDK
let AWS = require('aws-sdk');
// initialize dynamodb and cognito
let dynamodb = new AWS.DynamoDB({region:"us-west-2"});

let IDENTITY_ID_1 = process.env.IDENTITYID1;
let IDENTITY_ID_2 = process.env.IDENTITYID2;

migrateDecksAndGames("customer1", IDENTITY_ID_1);
migrateDecksAndGames("customer2", IDENTITY_ID_2);

function migrateDecksAndGames(customername, identityid) {
    // Scan customername's DB
    let params = {
        TableName: "data-" + customername
    };
    let ScanDynamo = dynamodb.scan(params).promise();
    ScanDynamo.then(function(data) {  
        // Iterate over all items
        data.Items.forEach( function (item) {
            // Check for decks
            if (item.id.S.substring(0,4) === "deck") {
                // Replace "deck" for <userid> and write decks to decks-master
                let ID = { S: identityid + item.id.S.slice(4) };
                let CARDS = { L: item.cards.L };
                let params = {
                    TableName: "decks-master",
                    Item: {"id": ID, "cards": CARDS},
                    ReturnConsumedCapacity: "TOTAL",
                };
                let PutToMaster = dynamodb.putItem(params).promise();
                PutToMaster.then(function(data) {
                    console.log (customername + " deck " + item.id.S.slice(4) + " has been written to games-master: " + ID.S);
                }).catch(function(err) {
                    console.log(err);
                });
                // If scores exits, write scores to games-master
                if (item.scores) {
                    let SCORES = { L: item.scores.L };
                    let params = {
                        TableName: "games-master",
                        Item: {"id": ID, "scores": SCORES},
                        ReturnConsumedCapacity: "TOTAL",
                    };
                    let PutToMaster = dynamodb.putItem(params).promise();
                    PutToMaster.then(function(data) {
                        console.log (customername + " score for deck " + item.id.S.slice(4) + " has been written to games-master: " + ID.S);
                    }).catch(function(err) {
                        console.log(err);
                    });
                }
            }       
        });
    }).catch(function(err) {
        console.log(err);
    });
}