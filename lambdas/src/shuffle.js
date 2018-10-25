const {isDebugLogging, Helper } = require('./common/deck-helper');

function shuffle(arr, iterations) {
    for (let i = 0; i < iterations; i++) {
        // Randomly pick two cards...
        const j = Math.floor(Math.random() * arr.length);
        let k = Math.floor(Math.random() * arr.length);
        while(k == j) {
            k = Math.floor(Math.random() * arr.length);
        }

        // Then, swap them...
        [ arr[j], arr[k] ] = [ arr[k], arr[j] ];
    }
    return arr;
}

exports.shuffle_deck_handler = async (event, context, callback) => {
    try {
        let helper = new Helper(event);
        let deckName = helper.getParam("deck");
        if (!deckName) return callback(null, { 'statusCode': 400, 'body': "Deck ID must be provided!" });
        
        let deck = await helper.getDeck(deckName);
        if (!deck) return callback(null, { 'statusCode': 404, 'body': "Deck " + deckName + " not found" });
        
        let iterations = Number.parseInt(helper.getParam("iterations") || "100");
        shuffle(deck.cards, iterations);
        await helper.saveDeck(deck);
        
        callback(null, { 'statusCode': 200, 'body': JSON.stringify(helper.asPublicDeck(deck)) });
    } catch (err) {
        console.log("Failed to Process Request with an \"" + err.code + "\" error:",err.message);
        callback(err.message, null);
    }
};
