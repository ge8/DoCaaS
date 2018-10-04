const debugLogging = process.env.DEBUG_LOGGING || "false" === "true";
module.exports.isDebugLogging = function() {
    return debugLogging;
}

class Helper {
    constructor(event) {
        this._event = event;
        this._jwt = this.event.headers.Authorization || this.event.headers.authorization;
        this._claims = this.event.requestContext.authorizer.claims;
        this._aws = require('aws-sdk');
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

    get jwt() {
        return this._jwt;
    }

    get claims() {
        return this._claims;
    }

    get plan() {
        return this._claims["custom:plan"];
    }

    get role() {
        return this._claims["cognito:preferred_role"];
    }

    getParam(name) {
        let val = this._event.queryStringParameters ? this._event.queryStringParameters[name] : null;
        if (!val && this._event.data && this._event.data[name]) {
            return this._event.data[name];
        } else return val;
    }

    async _callDeckDataAccess(method, params) {
        let data = {
            jwt: this.jwt, 
            claims: this.claims, 
            plan: this.plan,
            method: method,
            params: params
        }
        let lambda = new this._aws.Lambda();
        let invokeParams = {
                ClientContext: "DOCAAS",
                FunctionName: "DOCAAS_DeckDataAccess",
                InvocationType: "RequestResponse",
                LogType: "Tail",
                Payload: JSON.stringify(data)
           };
        let result = await lambda.invoke(invokeParams).promise();
        return JSON.parse(result.Payload);
    }
  }
  
module.exports.Helper = Helper;