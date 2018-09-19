const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');

exports.service = async (req, res) => {
    let tenant = req.get("tenant") || req.query.tenant;
    let deckId = req.get("deck") || req.query.deck;
    if (debugLogging) console.log("Taking top card from Deck " + deckId + " for tenant " + tenant);
    try {
        let deck = await dataAccess.getDeck(tenant, deckId);
        if (!deck) {
            return res.status(404).send('Deck ' + deckId + ' was not found!');
        }

        let count = parseInt(req.get("count") || req.query.count || "1");
        let cards = [];
        for (var i = 0; i < count; i++) {
            cards.push(deck.cards.shift())
        }

        dataAccess.saveDeck(tenant, deck);
        return res.send(JSON.stringify(cards));
    } catch(err) {
        console.error(err);
        return res.status(500).send("Failed to retrieve the deck!");
    }
}