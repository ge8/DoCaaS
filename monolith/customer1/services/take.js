const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');
const { tenant } = require("../core/tenant-info");

exports.service = async (req, res) => {
    let deckName = req.get("deck") || req.query.deck;
    if (debugLogging) console.log("Taking top card from Deck " + deckName + " for tenant " + tenant);
    try {
        let deck = await dataAccess.getDeck(tenant, deckName);
        if (!deck) {
            return res.status(404).send('Deck ' + deckName + ' was not found!');
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