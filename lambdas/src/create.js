const {isDebugLogging, Helper } = require('./common/helper');

exports.create_deck_handler = async (event, context, callback) => {
    try {
        if (isDebugLogging()) console.log("Event:", event);

        let helper = new Helper(event);
        let loginOK = await helper.aquireCredentials();

        if (!loginOK) return callback(null, { 'statusCode': 401, 'body': "Failed to authorize the request!" });
        let deckId = helper.getParam("deck");
    
        if (!deckId) {
            if (isDebugLogging()) console.log("Deck ID not provided!");
            return callback(null, { 'statusCode': 400, 'body': "Deck ID must be provided!" });
        } else if (isDebugLogging()) console.log("Creating Deck:", deckId);

        let deck = await helper.createDeck(deckId);
        if (!deck) return callback(null, { 'statusCode': 404, 'body': "Deck " + deckId + " not found" });
        callback(null, { 'statusCode': 200, 'body': JSON.stringify(deck.cards) });
    } catch (err) {
        console.log("Failed to Process Request with an \"" + err.code + "\" error:",err.message);
        if (isDebugLogging()) console.log(err.stack);
        callback(err.message, null);
    }
};
