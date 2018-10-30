const dataAccess = require('./dataAccess');
const cognitoAuth = require('./cognito');

const { tenant } = require("./tenant-info");
exports.service = async (req, res, next) => {
    try {
        let ok = false, auth = req.headers.authorization;
        if (!auth) return res.status(401).send('Not Authorised');

        // BASIC Auth:
        if (auth.length > 5 && auth.substring(0, 5) === "Basic") {
            // Basic Authentication
            let arr = Buffer.from(auth.substring(5).trim(), 'base64').toString().split(":");
            let username = arr[0], password = arr[1];
            ok = await dataAccess.checkuser( tenant, username, password);
        }

        // Cognito Auth:
        // ok = await cognitoAuth.loginOK(auth);

        if (ok) next();
        else return res.status(401).send('Not Authorised');
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}