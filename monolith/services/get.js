const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');

exports.service = async (req, res) => {
    try{
        console.log("QueryString:\n", JSON.stringify(req.query, null, 2));
        console.log("Headers:\n",JSON.stringify(req.headers, null, 2));
    } catch(e) {
        console.log(e);
    }

    let tenant = req.get("tenant") || req.query.tenant;
    let deckId = req.get("deck") || req.query.deck;
    if (debugLogging) console.log("Retrieving Deck " + deckId + " for tenant " + tenant);
    try {
        let deck = await dataAccess.getDeck(tenant, deckId);
        if (!deck) {
            return res.status(404).send('Deck ' + deckId + ' was not found!');
        }

        return res.send(JSON.stringify(deck.cards));
    } catch(err) {
        console.error(err);
        return res.status(500).send("Failed to retrieve the deck!");
    }
}