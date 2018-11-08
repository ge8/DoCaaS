
exports.getScores = async (ddb, tenantId, deckId) => {
    var params = {
        TableName: 'games-master',
        Key: {
            'id': { S:tenantId + "-" + deckId }
        }
    };

    // Retrieve Deck from DDB
    return ddb.getItem(params).promise()
            .then(data => {
                if (data && data.Item) {
                    let scores = [];
                    data.Item.scores.L.forEach(score => {
                        scores.push(Number.parseInt(score.N));
                    });
                    return scores;
                } else return null;
            })
            .catch(err => {
                if (err.code === "ResourceNotFoundException") {
                    // Item doesn't exist!
                    return null;
                } else throw err;
            });
}

exports.saveScores = async (ddb, tenantId, deckId, scores) => {
    let item = {
        'id': { S:tenantId + "-" + deckId },
        deck: { S: deckId },
        scores: { L: [ ] }
    };

    console.log("Scores:", scores);
    scores.forEach(score => {
        item.scores.L.push({ "N": score.toString()});
    });

    var params = {
        TableName: 'games-master',
        Item: item
    };
    
    // Save the item to DDB
    return ddb.putItem(params).promise();
}