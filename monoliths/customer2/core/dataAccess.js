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
    let data = { id:{ S:"deck-" + deck.name }, deck: { S:deck.name }, cards:{ L: [] } };
    deck.cards.forEach(card => {
        data.cards.L.push({ S:card });
    });
    return data;
}

function initDeck(name) {
    let deck = { name:name, cards:[ ] };
    let suffixes = [ "S", "C", "D", "H" ];  // Spades, Clubs, Diamons, Hearts
    let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];
    suffixes.forEach(suffix => {
        cards.forEach( card => {
            deck.cards.push(card+suffix);
        })
    })
    return deck;
}

exports.checkuser = async (tenantId, username, password) => {
    var params = {
        TableName: 'data-' + tenantId,
        Key: {
            'id': { S: 'user' }
        }
    };

    // Retrieve Deck from DDB
    return ddb.getItem(params).promise()
            .then(data =>{
                let dbUsername = data.Item.username.S;
                let dbPassword = data.Item.password.S;
                if (dbUsername.toLowerCase() === username.toLowerCase()
                    && dbPassword === password ) {
                    return true;
                } else {
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
            'id': { S: "deck-" + deckId }
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
    let item = fromDeck(deck);
    var params = {
        TableName: 'data-' + tenantId,

        ExpressionAttributeNames: {
         "#cards": "cards"
        }, 
        ExpressionAttributeValues: {
         ":cards": item.cards
        }, 
        Key: {
         "id": item.id
        }, 
        UpdateExpression: "SET #cards = :cards"
       };
       
    // update the cards in the deck
    return ddb.updateItem(params).promise();
}

exports.createDeck = async (tenantId, deckId) => {
    let deck = initDeck(deckId);

    var params = {
        TableName: 'data-' + tenantId,
        Item: fromDeck(deck)
    };
    
    // Put the item to DDB
    await ddb.putItem(params).promise();
    return deck;
}

exports.getScores = async (tenantId, deckId) => {
    var params = {
        TableName: 'data-' + tenantId,
        Key: {
            'id': { S: "deck-" + deckId }
        }
    };

    // Retrieve Deck from DDB
    return ddb.getItem(params).promise()
            .then(data => {
                if (data && data.Item && data.Item.scores) {
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
        'id': { S: "deck-" + deckId },
        scores: { L: [ ] }
    };

    scores.forEach(score => {
        item.scores.L.push({ "N": score.toString()});
    });

    var params = {
        TableName: 'data-' + tenantId,

        ExpressionAttributeNames: {
         "#SCORES": "scores"
        }, 
        ExpressionAttributeValues: {
         ":SCORES": item.scores
        }, 
        Key: {
         "id": item.id
        }, 
        UpdateExpression: "SET #SCORES = :SCORES"
       };
       
    // Save the item to DDB
    return ddb.updateItem(params).promise();
}