const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');

exports.service = async (req, res) => {
    let tenant = req.get("tenant") || req.query.tenant;
    let deckId = req.get("deck") || req.query.deck;
    if (debugLogging) console.log("Creating new Deck " + deckId + " for tenant " + tenant);
    try {
        let deck = await dataAccess.createDeck(tenant, deckId);
        if (!deck) {
            return res.status(500).send('Deck ' + deckId + ' could not be created!');
        }

        return res.send(JSON.stringify(deck.cards));
    } catch(err) {
        console.error(err);
        return res.status(500).send("Failed to create the deck!");
    }
}