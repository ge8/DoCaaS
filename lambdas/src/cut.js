const { Helper } = require('./common/helper');

exports.cut_deck_handler = async (event, context, callback) => {
    try {
        let helper = new Helper(event);
        let deckName = helper.getParam("deck");
    
        if (!deckName) return callback(null, { 'statusCode': 400, 'body': "Deck Name must be provided!" });
        
        let deck = await helper.getDeck(deckName);
        if (!deck) return callback(null, { 'statusCode': 404, 'body': "Deck " + deckName + " not found" });

        let index = (Math.random() * deck.cards.length).toFixed(0);
        deck.cards = deck.cards.slice(index).concat(deck.cards.slice(0, index));
        await helper.saveDeck(deck);
        
        callback(null, { 'statusCode': 200, 'body': JSON.stringify(helper.asPublicDeck(deck)) });
    } catch (err) {
        console.log("Failed to Process Request with an \"" + err.code + "\" error:",err.message);
        callback(null, { 'statusCode': 500, 'body': "Internal Error" });
    }
};
