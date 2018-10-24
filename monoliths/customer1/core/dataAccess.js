const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION || "us-west-2" });
const ddb = new AWS.DynamoDB();

function toDeck(data) {
    if (!data) return null;
    let deck = { name:data.Item.deck.S, cards:[] };
    data.Item.cards.L.forEach(card => {
        deck.cards.push(card.S);
    });
    return deck;
}

function fromDeck(deck) {
    if (!deck) return null;
    let data = { key:{ S:"deck-" + deck.name }, deck: { S:deck.name }, cards:{ L: [] } };
    deck.cards.forEach(card => {
        data.cards.L.push({ S:card });
    });
    return data;
}

function initDeck(name) {
    let deck = { name:name, cards:[ ] };
    let prefixes = [ "S", "C", "D", "H" ];  // Spades, Clubs, Diamons, Hearts
    let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];
    prefixes.forEach(prefix => {
        cards.forEach( card => {
            deck.cards.push(card+prefix);
        })
    })
    return deck;
}

exports.checkuser = async (tenantId, username, password) => {
    var params = {
        TableName: 'data-' + tenantId,
        Key: {
            'partition-key': { S: 'user' }
        }
    };

    console.log ("DB Params - Key :" + params.Key["partition-key"].S)
    console.log ("DB Params - TableName :" + params.TableName)

    // Retrieve Deck from DDB
    return ddb.getItem(params).promise()
            .then(data =>{
                let dbUsername = data.Item.username.S;
                let dbPassword = data.Item.password.S;
                console.log("ddbusername is:" + dbUsername);
                console.log("ddbpassword is:" + dbPassword);
                if (dbUsername.toLowerCase() === username.toLowerCase()
                    && dbPassword === password ) {
                        console.log("Exiting at 1")
                    return true;
                } else {
                    console.log("Exiting at 2")
                    return false;
                }
            })
            .catch(err => {
                console.log("Error: " + err)
                if (err.code === "ResourceNotFoundException") {
                    // Item doesn't exist!
                    return false;   // No Username/Password in the database
                } else throw err;
            });
}

exports.getDeck = async (tenantId, deckId) => {
    var params = {
        TableName: 'data-' + tenantId,
        Key: {
            'partition-key': { S: "deck-" + deckId }
        }
    };

    // Retrieve Deck from DDB
    return ddb.getItem(params).promise()
            .then(data => toDeck(data))
            .catch(err => {
                if (err.code === "ResourceNotFoundException") {
                    // Item doesn't exist!
                    return null;
                } else throw err;
            });
}

exports.saveDeck = async (tenantId, deck) => {
    var params = {
        TableName: 'data-' + tenantId,
        Item: fromDeck(deck)
    };
    
    // Save the item to DDB
    return ddb.putItem(params).promise();
}

exports.createDeck = async (tenantId, deckId) => {
    let deck = initDeck(deckId);
    await exports.saveDeck(tenantId, deck);
    return deck;
}

exports.getScores = async (tenantId, deckId) => {
    var params = {
        TableName: 'data-' + tenantId,
        Key: {
            'partition-key': { S: "game-" + deckId }
        }
    };

    // Retrieve Deck from DDB
    return ddb.getItem(params).promise()
            .then(data => {
                if (data && data.Item) {
                    let scores = [];
                    data.Item.scores.L.forEach(score => {
                        scores.push(Number.parseInt(score.N));
                    });
                    return scores;
                } else return null;
            })
            .catch(err => {
                if (err.code === "ResourceNotFoundException") {
                    // Item doesn't exist!
                    return null;
                } else throw err;
            });
}

exports.saveScores = async (tenantId, deckId, scores) => {
    let item = {
        'partition-key': { S: "game-" + deckId },
        deck: { S: deckId },
        scores: { L: [ ] }
    };

    scores.forEach(score => {
        item.scores.L.push({ "N": score.toString()});
    });

    var params = {
        TableName: 'data-' + tenantId,
        Item: item
    };
    
    // Save the item to DDB
    return ddb.putItem(params).promise();
}