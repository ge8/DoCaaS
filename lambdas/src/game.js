const { Helper } = require('./common/game-helper');
const { Helper:DeckHelper } = require('./common/deck-helper');

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

exports.demo_game_handler = async (event, context, callback) => {
    try {
        console.log("Event:", event);
        let helper = new Helper(event);
        let deckHelper = new DeckHelper(event);

        // 1. Get deck name from Request
        let deckName = helper.getParam("deck");
        if (!deckName) return callback(null, { 'statusCode': 400, 'body': "Deck ID must be provided!" });
        
        // 2. Get No. players from Request
        let players = Number.parseInt(helper.getParam("players") || "2");

        // 3. Get deck from Data Access
        let deck = await deckHelper.getDeck(deckName);
        if (!deck) return callback(null, { 'statusCode': 404, 'body': "Deck " + deckName + " not found" });

        // 4. Get current scores from Data Access
        let currentScores = await helper.getScores(deckName);
        if (!currentScores) currentScores = Array.from({length: players}, (v, i) => 0);
        
        // 5. Play Game Round
        let result = dealAndChooseWinner(deck, currentScores);

        // 6. Save the scores + the updated deck to Data Access
        await deckHelper.saveDeck(deck);
        await helper.saveScores(deckName, result.scores);

        // 7. Return Result of Game round
        callback(null, { 'statusCode': 200, 'body': JSON.stringify(result) });
    } catch (err) {
        console.log("Failed to Process Request:",err);
        callback(err.message, null);
    }
};
