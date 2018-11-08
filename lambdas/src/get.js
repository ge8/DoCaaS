const { Helper } = require('./common/deck-helper');

exports.get_deck_handler = async (event, context, callback) => {
    try {
        let helper = new Helper(event);
        
        // 1. Get deck name from Request
        let deckName = helper.getParam("deck");
        if (!deckName) return callback(null, { 'statusCode': 400, 'body': "Deck ID must be provided!" });
        
        // 2. Get Deck from Data Access
        let deck = await helper.getDeck(deckName);
        if (!deck) return callback(null, { 'statusCode': 404, 'body': "Deck " + deckName + " not found" });
        
        // 3. Return Deck
        callback(null, { 'statusCode': 200, 'body': JSON.stringify(helper.asPublicDeck(deck)) });
    } catch (err) {
        callback(err.message, null);
    }
};
