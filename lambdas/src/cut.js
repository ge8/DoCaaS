const { Helper } = require('./common/deck-helper');

exports.cut_deck_handler = async (event, context, callback) => {
    try {
        let helper = new Helper(event);

        // 1. Get deck name from Request
        let deckName = helper.getParam("deck");
        if (!deckName) return callback(null, helper.withCors({ 'statusCode': 400, 'body': "Deck Name must be provided!" }));
        
        // 2. Get deck from Data Access
        let deck = await helper.getDeck(deckName);
        if (!deck) return callback(null, helper.withCors({ 'statusCode': 404, 'body': "Deck " + deckName + " not found" }));

        // 3. Cut deck + save to Data Access
        let index = (Math.random() * deck.cards.length).toFixed(0);
        deck.cards = deck.cards.slice(index).concat(deck.cards.slice(0, index));
        await helper.saveDeck(deck);
        
        // 4. Return updated Deck
        callback(null, helper.withCors({ 'statusCode': 200, 'body': JSON.stringify(helper.asPublicDeck(deck)) }));
    } catch (err) {
        callback(err, null);
    }
};
