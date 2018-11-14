const { Helper } = require('./common/deck-helper');

exports.create_deck_handler = async (event, context, callback) => {
    try {
        let helper = new Helper(event);

        // 1. Get deck name from Request
        let deckName = helper.getParam("deck");
        if (!deckName) return callback(null, helper.withCors({ 'statusCode': 400, 'body': "Deck name must be provided!" }));
        
        // 2. Create new deck in Data Access
        let deck = await helper.createDeck(deckName);
        if (!deck) return callback(null, helper.withCors({ 'statusCode': 404, 'body': "Deck " + deckName + " not found" }));

        // 3. Return deck
        callback(null, helper.withCors({ 'statusCode': 200, 'body': JSON.stringify(helper.asPublicDeck(deck)) }));
    } catch (err) {
        console.log("Failed to Process Request with an \"" + err.code + "\" error:",err.message);
        callback(err.message, null);
    }
};