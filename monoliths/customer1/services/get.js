const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');
const { tenant } = require("../core/tenant-info");

exports.service = async (req, res) => {
    // 1. Get deck name from Request
    let deckName = req.get("deck") || req.query.deck;

    // 2. Get Deck from Data Access
    try {
        let deck = await dataAccess.getDeck(tenant, deckName);
        if (!deck) {
            return res.status(404).send('Deck ' + deckName + ' was not found!');
        }

        // 3. Return Deck
        return res.send(JSON.stringify({ name:deck.name, cards:deck.cards }));
    } catch(err) {
        return res.status(500).send("Failed to retrieve the deck!");
    }
}