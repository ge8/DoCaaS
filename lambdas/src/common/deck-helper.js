const aws = require('aws-sdk');

class Helper {
    constructor(event) {
        this._event = event;
    }

    asPublicDeck(deck) {
        return { name:deck.name, cards:deck.cards };
    }

    async getDeck(name) {
        return this._callDeckDataAccess("get", { name:name });
    }
    async saveDeck(deck) {
        return this._callDeckDataAccess("save", { deck:deck });
    }
    async createDeck(name) {
        return this._callDeckDataAccess("create", { name:name });
    }

    get event() {
      return this._event;
    }

    get plan() {
        return this.event.requestContext.authorizer.plan;
    }

    getParam(name) {
        let val = this._event.queryStringParameters ? this._event.queryStringParameters[name] : null;
        if (!val && this._event.data && this._event.data[name]) {
            return this._event.data[name];
        } else return val;
    }

    async _callDeckDataAccess(method, params) {
        let data = {
            plan: this.plan,
            method: method,
            credentials: {
                accessKeyId: this.event.requestContext.authorizer.accessKeyId, 
                secretAccessKey: this.event.requestContext.authorizer.secretAccessKey, 
                sessionToken: this.event.requestContext.authorizer.sessionToken, 
                identityId: this.event.requestContext.authorizer.identityId
            },
            params: params
        }
        
        let lambda = new aws.Lambda();
        let invokeParams = {
                FunctionName: "DOCAAS_DeckDataAccess",
                InvocationType: "RequestResponse",
                LogType: "Tail",
                Payload: JSON.stringify(data)
           };
        let result = await lambda.invoke(invokeParams).promise();
        console.log("DA Result:", result);
        return JSON.parse(result.Payload);
    }
  }
  
module.exports.Helper = Helper;