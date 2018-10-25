const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const dataAccess = require('../core/dataAccess');
const { tenant } = require("../core/tenant-info");

function dealAndChooseWinner(deck, currentScores) {
    let result = { cards: [], scores: currentScores, winner: -1 };

    // Deal out a singe card to each player
    let highCard = { player: -1, suit: "", suitIndex: -1, card: "", cardNum: "", cardIndex: -1 }
    for(var i = 0; i < currentScores.length; i++) {
        let card = deck.cards.shift();  // Take card off the top of the deck
        deck.cards.push(card);          // And then, put it on the bottom of the deck
        result.cards.push(card);
        let suit = card.length == 2 ? card.charAt(1) : card.charAt(2);
        let suitIndex = suit === "S" ? 0 : suit === "C" ? 1 : suit === "D" ? 2 : 3;
        let cardNum = card.length == 2 ? card.charAt(0) : card.substring(0, 2);
        let cardIdx = 0;
        if (cardNum === "A") cardIdx = 14;
        else if (cardNum === "J") cardIdx = 11;
        else if (cardNum === "Q") cardIdx = 12;
        else if (cardNum === "K") cardIdx = 13;
        else cardIdx = Number.parseInt(cardNum);

        // Check if highest card...
        let isHighest = false;
        if (cardIdx > highCard.cardIndex) isHighest = true;
        else if (cardIdx == highCard.cardIndex && suitIndex > highCard.suitIndex) isHighest = true;

        if (isHighest) {
            highCard.cardIndex = cardIdx;
            highCard.cardNum = cardNum;
            highCard.suit = suit;
            highCard.suitIndex = suitIndex;
            highCard.card = card;
            highCard.player = i;
        }
    }

    // Record the winner + update the score for that player...
    result.winner = highCard.player;
    result.scores[highCard.player]++;
    return result;
}

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
        if (!currentScores) currentScores = Array.from({length: players}, (v, i) => 0);

        let result = dealAndChooseWinner(deck, currentScores);

        // Save the scores + the updated deck
        await dataAccess.saveDeck(tenant, deck);
        await dataAccess.saveScores(tenant, deckName, result.scores);

        return res.send(JSON.stringify(result));
    } catch(err) {
        console.error(err);
        return res.status(500).send("Failed to retrieve the deck!");
    }
}