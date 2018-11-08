'use strict';
const jwt = require('jsonwebtoken');
const { AuthPolicy } = require('./common/auth-policy'); // Provided by AWS
const IDENTITY_POOL_ID = process.env.IDENTITY_POOL_ID;

// Set of Resources allowed, mapped by Plan
const ALLOWED_RESOURCES = {
    "bronze": ["/create", "/get"],
    "silver": ["/create", "/get", "/shuffle", "/game"],
    "gold": ["/create", "/get", "/shuffle","cut", "/game"],
}

exports.authorise_request = async (event, context, callback) => {
    // Decode the JWT and grab the claims - these claims cannot be trusted until after validating with cognito
    console.log("Event:", event);
    let claims = jwt.decode(event.authorizationToken);

    let loginCredentials = await loadCredentials(claims, event.authorizationToken);
    if (!loginCredentials) return callback("Not Authorized");
    
    // Grab the plan attribute - this will define which methods are allowed for this user
    let plan = claims["custom:plan"] || "silver"; // default plan when no plan has been specified for the customer
    
    // Create + Configure API Policy
    const policy = initialiseAuthPolicy(event.methodArn, claims.sub);
    let allowed = ALLOWED_RESOURCES[plan];  // Grab the paths that are allowed for this users' plan
    if (!allowed) policy.denyAllMethods();
    else {
        allowed.forEach(path => {
            policy.allowMethod(AuthPolicy.HttpVerb.ALL, path);
        });
    }

    // Build the policy + add Context
    const authResponse = policy.build();
    authResponse.context = {
        plan: plan,
        sub: claims.sub, 
        accessKeyId: loginCredentials.accessKeyId, 
        secretAccessKey: loginCredentials.secretAccessKey, 
        sessionToken: loginCredentials.sessionToken, 
        identityId: loginCredentials.id
    };
    
    callback(null, authResponse);
};

function initialiseAuthPolicy(methodArn, sub) {
    //  Makeup of a Method ARN: arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>
    const apiOptions = {};
    const tmp = methodArn.split(':');
    const apiGatewayArnTmp = tmp[5].split('/');
    const awsAccountId = tmp[4];
    apiOptions.region = tmp[3];
    apiOptions.restApiId = apiGatewayArnTmp[0];
    apiOptions.stage = apiGatewayArnTmp[1];
    return new AuthPolicy(sub, awsAccountId, apiOptions);
}
async function loadCredentials(claims, idJWT) {
    return new Promise( async (resolve, reject) => {
        let AWS = require('aws-sdk');
        AWS.config.region = process.env.AWS_REGION || "ap-southeast-2";

        // Grab the issuer to test the token against (use issuer from )
        let issuer = process.env.USER_POOL_ID || (claims && claims.iss ? claims.iss.substring(8) : null);
        if (!issuer) throw new Error("Configuration failure - request cannot be authorised");

        // Logins Object, required by cognito
        let logins = { [issuer]:idJWT };

        // Retrieve the IdentityID (required by the Cognito Identity Credentials provider)
        let id = await getIdentityId(AWS, logins);

        // Configure AWS to use the CognitoIdentityCredentials
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IDENTITY_POOL_ID,
            IdentityId: id, 
            Logins: logins
        });

        // Explicitly obtain the Credentials - as we'll be providing them in the authorizer context...
        AWS.config.credentials.get(function(){
            var accessKeyId = AWS.config.credentials.accessKeyId;
            var secretAccessKey = AWS.config.credentials.secretAccessKey;
            var sessionToken = AWS.config.credentials.sessionToken;
            resolve({ accessKeyId, secretAccessKey, sessionToken, id } );   // Returning both the Credentials + Identity ID
        });        
    });
}

async function getIdentityId(AWS, logins) {
    const cognitoidentity = new AWS.CognitoIdentity();
    let idParams = {
        IdentityPoolId: IDENTITY_POOL_ID, 
        Logins: logins
    };
    return cognitoidentity.getId(idParams).promise()
            .then( identity => {
                return identity.IdentityId;
            });
}
