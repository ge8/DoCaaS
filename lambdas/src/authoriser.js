'use strict';
const DEBUG_LOGGING = (process.env.DEBUG_LOGGING || "false") === "true";
const { DAHelper } = require('./common/deck-da-helper');
const { AuthPolicy } = require('./common/auth-policy');
const jwt = require('jsonwebtoken');
const ALLOWED_RESOURCES = {
    "bronze": ["/create", "/get"],
    "silver": ["/create", "/get", "/shuffle", "/game"], 
    "gold": ["/create", "/get", "/shuffle", "/cut", "/game"]
}

exports.authorise_request = async (event, context, callback) => {
    if (DEBUG_LOGGING) {
        console.log("Event:", event);
        console.log('Client token:', event.authorizationToken);
        console.log('Method ARN:', event.methodArn);
    }

    // validate the incoming token
    let helper = new DAHelper(event);
    let loginCredentials;
    try {
        loginCredentials = await helper.aquireCredentials();
    } catch(e) {
        console.log("Invalid Login Credentials.", e);
    }

    if (!loginCredentials) return callback("Not Authorized");

    // Token is valid, so we can trust the claims
    let claims = jwt.decode(helper.jwt.trim());
    if (DEBUG_LOGGING) console.log("Claims:", claims);

    // Grab the plan attribute - this will define which methods are allowed for this user
    let plan = claims["custom:plan"];
    if (!plan) callback("No subscription plan - please purchase a subscription first");

    
    // build apiOptions for the AuthPolicy
    //  "arn:aws:execute-api:<regionId>:<accountId>:<apiId>/<stage>/<method>/<resourcePath>"
    const apiOptions = {};
    const tmp = event.methodArn.split(':');
    const apiGatewayArnTmp = tmp[5].split('/');
    const awsAccountId = tmp[4];
    apiOptions.region = tmp[3];
    apiOptions.restApiId = apiGatewayArnTmp[0];
    apiOptions.stage = apiGatewayArnTmp[1];
    
    const policy = new AuthPolicy(claims.sub, awsAccountId, apiOptions);
    let allowed = ALLOWED_RESOURCES[plan];  // Grab the paths that are allowed for this users' plan
    if (!allowed) {
        policy.denyAllMethods();
    } else {
        allowed.forEach(path => {
            policy.allowMethod(AuthPolicy.HttpVerb.ALL, path);
        });
    }

    // finally, build the policy and exit the function
    const authResponse = policy.build();
    authResponse.context = {
        plan: plan,
        sub: claims.sub, 
        accessKeyId: helper.credentials.accessKeyId, 
        secretAccessKey: helper.credentials.secretAccessKey, 
        sessionToken: helper.credentials.sessionToken, 
        identityId: helper.credentials.id
    };
    
    if (DEBUG_LOGGING) console.log("Auth Response:", JSON.stringify(authResponse));
    callback(null, authResponse);
};
 