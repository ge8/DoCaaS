const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');
const { tenant } = require("../core/tenant-info");

exports.service = async (req, res) => {
    let deckName = req.get("deck") || req.query.deck;
    if (debugLogging) console.log("Retrieving Deck " + deckName + " for tenant " + tenant);
    try {
        let deck = await dataAccess.getDeck(tenant, deckName);
        if (!deck) {
            return res.status(404).send('Deck ' + deckName + ' was not found!');
        }

        return res.send(JSON.stringify({ name:deck.name, cards:deck.cards }));
    } catch(err) {
        console.error(err);
        return res.status(500).send("Failed to retrieve the deck!");
    }
}