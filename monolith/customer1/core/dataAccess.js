const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const AWS = require('aws-sdk');
AWS.config.update({ region: process.env.AWS_REGION || "ap-southeast-2" });
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
    let data = { deck: { S:deck.name }, cards:{ L: [] } };
    deck.cards.forEach(card => {
        data.cards.L.push({ S:card });
    });
    return data;
}

function initDeck(name) {
    let deck = { name:name, cards:[ "TJ" ] };
    let prefixes = [ "S", "C", "D", "H" ];  // Spades, Clubs, Diamons, Hearts
    let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];
    prefixes.forEach(prefix => {
        cards.forEach( card => {
            deck.cards.push(card+prefix);
        })
    })
    return deck;
}

exports.getDeck = async (tenantId, deckId) => {
    var params = {
        TableName: 'decks-' + tenantId,
        Key: {
            'deck': { S: deckId }
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
        TableName: 'decks-' + tenantId,
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