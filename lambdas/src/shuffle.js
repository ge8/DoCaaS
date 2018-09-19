const {isDebugLogging, Helper } = require('./common/helper');

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
        if (isDebugLogging()) console.log("Event:", event);

        let helper = new Helper(event);
        let loginOK = await helper.aquireCredentials();

        if (!loginOK) callback(null, { 'statusCode': 401, 'body': "Failed to authorize the request!" });
        let deckId = helper.getParam("deck");
    
        if (!deckId) {
            if (isDebugLogging()) console.log("Deck ID not provided!");
            return callback(null, { 'statusCode': 400, 'body': "Deck ID must be provided!" });
        } else if (isDebugLogging()) console.log("Shuffling Deck:", deckId);

        let deck = await helper.getDeck(deckId);
        shuffle(deck.cards, 100);
        helper.saveDeck(deck);
        
        if (!deck) return callback(null, { 'statusCode': 404, 'body': "Deck " + deckId + " not found" });
        callback(null, { 'statusCode': 200, 'body': JSON.stringify(deck.cards) });
    } catch (err) {
        console.log("Failed to Process Request with an \"" + err.code + "\" error:",err.message);
        if (isDebugLogging()) console.log(err.stack);
        callback(err.message, null);
    }
};
