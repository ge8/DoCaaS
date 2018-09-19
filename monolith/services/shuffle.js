const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');

function shuffle(arr, iterations) {
    for (let i = 0; i < iterations; i++) {
        // Randomly pick two cards...
        const j = Math.floor(Math.random() * arr.length);
        let k = Math.floor(Math.random() * arr.length);
        while(k == j) {
            k = Math.floor(Math.random() * arr.length);
        }

        // Then, swap them...
        [ arr[j], arr[k] ] = [ arr[k], arr[j] ];
    }
    return arr;
}

exports.service = async (req, res) => {
    let tenant = req.get("tenant") || req.query.tenant;
    let deckId = req.get("deck") || req.query.deck;
    if (debugLogging) console.log("Shuffling Deck " + deckId + " for tenant " + tenant);
    try {

        let deck = await dataAccess.getDeck(tenant, deckId);
        if (!deck) {
            return res.status(404).send('Deck ' + deckId + ' not found!');
        }

        
        if (debugLogging) console.log("\t [Initial] " + deck.cards);
        shuffle(deck.cards, 100);
        if (debugLogging) console.log("\t[Shuffled] " + deck.cards);
        dataAccess.saveDeck(tenant, deck);
        return res.send(JSON.stringify(deck.cards));
    } catch(err) {
        console.error(err);
        return res.status(500).send("Failed to shuffle the deck!");
    }
}