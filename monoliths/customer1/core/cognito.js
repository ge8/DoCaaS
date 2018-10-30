const identityPool = process.env.IDENTITY_POOL_ID || 'ap-southeast-2:5b205dba-4e2f-4382-abf3-907d6eb119eb';
const jwt = require('jsonwebtoken');
let aws = require('aws-sdk');
aws.config.region = process.env.AWS_REGION || "us-west-2";

exports.loginOK = async (authToken) => {
    return await testJWT(jwt.decode(authToken), authToken);
}

async function testJWT(claims, idJWT) {
    try {
        let pool = process.env.USER_POOL_ID || (claims && claims.iss ? claims.iss.substring(8) : null);
        if (!pool) throw new Error("Configuration failure - request cannot be authorised");

        // And setup the logins object with the ID Token for the pool
        let logins = {};
        logins[pool] = idJWT;

        // Retrieve the IdentityID
        let id = await getIdentityId(logins);
        // If the IdentityID is retrieved, then the JWT was accepted - otherwise, it was rejected!
        return (typeof id !== "undefined" && id !== null);
    } catch(e) {
        console.log("Bad Login Token:", e.message);
        return false;
    }
}

async function getIdentityId(logins) {
    const cognitoidentity = new aws.CognitoIdentity();
    let idParams = {
        IdentityPoolId: identityPool, 
        Logins: logins
    };
    return cognitoidentity.getId(idParams).promise()
            .then( identity => {
                return identity.IdentityId;
            });
}
