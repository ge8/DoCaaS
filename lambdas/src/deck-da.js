const { DAHelper } = require('./common/da-helper');

exports.deck_data_access = async (event, context, callback) => {
    try {
        console.log("Event:", event);
        let helper = new DAHelper(event);
        
        let loginOK = await helper.aquireCredentials();
        if (!loginOK) return callback("Not Authorized");

        let method = helper.method;
        let result;
        switch(method) {
            case "get": 
                result = await helper.getDeck(helper.params.name); break;
            case "create": 
                result = await helper.createDeck(helper.params.name); break;
            case "save": 
                result = await helper.saveDeck(helper.params.deck); break;
        }

        console.log("Result:", result);
        callback(null, result);
    } catch (err) {
        console.log("Failed to Process Request with an \"" + err.code + "\" error:",err.message);
        callback(err.message);
    }
};
