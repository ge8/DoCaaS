const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";

function toDeck(data) {
    if (!data || !data.Item) return null;
    let deck = { id:data.Item.id.S, name:data.Item.deck.S, cards:[] };
    data.Item.cards.L.forEach(card => {
        deck.cards.push(card.S);
    });
    return deck;
}

function fromDeck(deck, tenantId) {
    if (!deck) return null;
    let data = { id:{S:deck.id}, tenant:{S:tenantId}, deck: { S:deck.name }, cards:{ L: [] } };
    deck.cards.forEach(card => {
        data.cards.L.push({ S:card });
    });
    return data;
}

function initDeck(name, tenantId) {
    let deck = { id:tenantId + "-" + name, name:name, tenant:tenantId, cards:[ "TJ" ] };
    let suffixes = [ "S", "C", "D", "H" ];  // Spades, Clubs, Diamons, Hearts
    let cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K" ];
    suffixes.forEach(suffix => {
        cards.forEach( card => {
            deck.cards.push(card+suffix);
        })
    })
    return deck;
}

exports.getDeck = async (ddb, tenantId, deckId) => {
    var params = {
        TableName: 'decks-master',
        Key: {
            'id': { S: tenantId + '-' + deckId }
        }
    };

    // Retrieve Deck from DDB
    // console.log("Retrieving Deck:", params);
    return ddb.getItem(params).promise()
            .then(data => toDeck(data))
            .catch(err => {
                if (err.code === "ResourceNotFoundException") {
                    // Item doesn't exist!
                    return null;
                } else throw err;
            });
}

exports.saveDeck = async (ddb, tenantId, deck) => {
    var params = {
        TableName: 'decks-master',
        Item: fromDeck(deck, tenantId)
    };
    
    // Save the item to DDB
    // console.log("Saving Deck:", params);
    return ddb.putItem(params).promise();
}

exports.createDeck = async (ddb, tenantId, deckId) => {
    let deck = initDeck(deckId, tenantId);
    await exports.saveDeck(ddb, tenantId, deck);
    return deck;
}