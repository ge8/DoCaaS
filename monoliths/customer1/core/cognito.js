const jwt = require('jsonwebtoken');
const aws = require('aws-sdk');
const identityPool = process.env.IDENTITY_POOL_ID;
aws.config.region = process.env.AWS_REGION || "us-west-2";

exports.loginOK = async (authToken) => {
    try {
        let claims = jwt.decode(authToken);
        let pool = claims && claims.iss ? claims.iss.substring(8) : null;
        if (!pool) throw new Error("Configuration failure - request cannot be authorised");
        let logins = { [pool]:authToken };

        // Retrieve the IdentityID from Cognito IdentityPool
        let id = await getIdentityId(logins);

        // If the IdentityID is retrieved, then the JWT was accepted - otherwise, it was rejected!
        if (typeof id !== "undefined" && id !== null) {
            return true; // todo: Validate user is from correct customer + has paid bill etc...
        } else return false;
    } catch(e) {
        return false;
    }
}

async function getIdentityId(logins) {
    let idParams = {
        IdentityPoolId: identityPool, 
        Logins: logins
    };
    return new aws.CognitoIdentity().getId(idParams).promise()
            .then( identity => identity.IdentityId );
}
