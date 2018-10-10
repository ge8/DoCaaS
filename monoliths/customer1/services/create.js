const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');
const { tenant } = require("../core/tenant-info");

exports.service = async (req, res) => {
    let deckName = req.get("deck") || req.query.deck;
    if (debugLogging) console.log("Creating new Deck " + deckName + " for tenant " + tenant);
    try {
        let deck = await dataAccess.createDeck(tenant, deckName);
        if (!deck) {
            return res.status(500).send('Deck ' + deckName + ' could not be created!');
        }

        return res.send(JSON.stringify({ name:deck.name, cards:deck.cards }));
    } catch(err) {
        console.error(err);
        return res.status(500).send("Failed to create the deck!");
    }
}