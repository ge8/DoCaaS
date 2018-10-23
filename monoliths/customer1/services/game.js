const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');
const { tenant } = require("../core/tenant-info");

// Example Game - highest card wins
exports.service = async (req, res) => {
    let deckName = req.get("deck") || req.query.deck;
    let players = Number.parseInt(req.get("players") || req.query.player || "2");
    if (debugLogging) console.log("Playing Demo Game with " + players + " players, using Deck " + deckName + " for tenant " + tenant);
    try {
        let deck = await dataAccess.getDeck(tenant, deckName);
        if (!deck) {
            return res.status(404).send('Deck ' + deckName + ' was not found!');
        }

        let currentScores = await dataAccess.getScores(tenant, deckName);
        if (!currentScores) {
            currentScores = [];
            for(var i = 0; i < players; i++) { currentScores.push(0); }
        }

        let result = {
            cards: [], 
            scores: currentScores,
            winner: -1
        };

        // Deal out a singe card to each player
        let highestCard = [ 0, 0, -1, "" ]; // suit, number, player
        for(var i = 0; i < players; i++) {
            let card = deck.cards.shift();
            deck.cards.push(card); // Put the taken card on the bottom of the deck
            result.cards.push(card);
            let suit = card.length == 2 ? card.charAt(1) : card.charAt(2);
            let suitIndex = suit === "S" ? 0 : suit === "C" ? 1 : suit === "D" ? 2 : 3;
            let cardNum = card.length == 2 ? card.charAt(0) : card.substring(0, 2);
            let cardIdx = 0;
            if (cardNum === "A") {
                cardIdx = 14;
            } else if (cardNum === "J") {
                cardIdx = 11;
            } else if (cardNum === "Q") {
                cardIdx = 12;
            } else if (cardNum === "K") {
                cardIdx = 13;
            } else {
                cardIdx = Number.parseInt(cardNum);
            }

            if (cardIdx > highestCard[1]) {
                highestCard = [ suitIndex, cardIdx, i, card ];
            } else if (cardIdx == highestCard[1]) {
                if (suitIndex > highestCard[0]) {
                    highestCard = [ suitIndex, cardIdx, i, card ];
                }
            }
        }

        // Record the winner + update the score for that player...
        result.winner = highestCard[2];
        result.scores[highestCard[2]]++;

        // Save the scores + the updated deck
        await dataAccess.saveDeck(tenant, deck);
        await dataAccess.saveScores(tenant, deckName, result.scores);

        return res.send(JSON.stringify(result));
    } catch(err) {
        console.error(err);
        return res.status(500).send("Failed to retrieve the deck!");
    }
}