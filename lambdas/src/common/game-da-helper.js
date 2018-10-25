const identityPool = process.env.IDENTITY_POOL_ID || 'ap-southeast-2:5b205dba-4e2f-4382-abf3-907d6eb119eb';
const { getScores, saveScores } = require('./game-dataAccess');
const jwt = require('jsonwebtoken');

class DAHelper {
    constructor(event) {
        this._event = event;
    }

    get event() {
      return this._event;
    }

    get method() {
        return this.event.method;
    }

    get params() {
        return this.event.params;
    }

    get dynamoDbClient() {
        return new this._aws.DynamoDB();
    }

    get jwt() {
        return this.event.jwt || this.event.authorizationToken || this.event.headers.Authorization;
    }

    get claims() {
        return this.event.claims || jwt.decode(this.jwt);
    }

    get plan() {
        return this.claims["custom:plan"];
    }

    get role() {
        return this.claims["cognito:preferred_role"];
    }

    async getScores(deckName) {
        console.log("GetScores");
        return getScores(this.dynamoDbClient, this._identityId, deckName);
    }
    async saveScores(deckName, scores) {
        return saveScores(this.dynamoDbClient, this._identityId, deckName, scores);
    }
    
    async aquireCredentials() {
        this._aws = require('aws-sdk');
        this._aws.config.region = process.env.AWS_REGION || "ap-southeast-2";
        if (this.event && this.event.credentials && this.event.credentials.accessKeyId) {
            // Access Keys have been provided in the request - use them!
            console.log("Using provided access keys...");
            this._aws.config.credentials = new this._aws.Credentials(this.event.credentials.accessKeyId, this.event.credentials.secretAccessKey, this.event.credentials.sessionToken);
            this._identityId = this.event.credentials.identityId;
            return true;
        } else {
            console.log("Acquiring new access keys...");
            
            this._creds = await loadCredentials(this._aws, this.claims, this.jwt);
            if (!this._creds) {
                console.log("Failed to load credentials");
                return false;
            }
            console.log("Retrieved Credentials:", this._creds);
            this._identityId = this._creds.id;
            return true;
        }
    }
  }
  
module.exports.DAHelper = DAHelper;
  



async function loadCredentials(AWS, claims, idJWT) {
    return new Promise( async (resolve, reject) => {
        // Grab the PoolID from the issuer
        let pool = process.env.USER_POOL_ID || (claims && claims.iss ? claims.iss.substring(8) : null);
        if (!pool) throw new Error("Configuration failure - request cannot be authorised");

        // And setup the logins object with the ID Token for the pool
        let logins = {};
        logins[pool] = idJWT;

        // Retrieve the IdentityID (required for knowing how to query the DDB!)
        let id = await getIdentityId(AWS, logins);

        // Configure AWS to use the CognitoIdentityCredentials
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: identityPool,
            IdentityId: id, 
            Logins: logins
        });

        // And then, explicitly obtain the Credentials...
        AWS.config.credentials.get(function(){
            var accessKeyId = AWS.config.credentials.accessKeyId;
            var secretAccessKey = AWS.config.credentials.secretAccessKey;
            var sessionToken = AWS.config.credentials.sessionToken;
            resolve({ accessKeyId, secretAccessKey, sessionToken, id } );   // Returning the Credentials + Identity ID
        });        
    });
}

async function getIdentityId(AWS, logins) {
    const cognitoidentity = new AWS.CognitoIdentity();
    let idParams = {
        IdentityPoolId: identityPool, 
        Logins: logins
    };
    return cognitoidentity.getId(idParams).promise()
            .then( identity => {
                return identity.IdentityId;
            });
}
