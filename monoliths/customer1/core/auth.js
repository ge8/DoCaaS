const dataAccess = require('./dataAccess');
const { tenant } = require("../core/tenant-info");
exports.service = async (req, res, next) => {
    try {
    let auth = req.headers.authorization;
    if (!auth) return res.status(401).send('Not Authorised');
    if (auth.length > 5 && auth.substring(0, 5) === "Basic") {
        // Basic Authentication
        let arr = Buffer.from(auth.substring(5).trim(), 'base64').toString().split(":");
        let username = arr[0], password = arr[1];
        let ok = await dataAccess.checkuser( tenant, username, password);
        if (ok) {
            next();
        } else {
            return res.status(401).send('Not Authorised');
        }
    } else {
        return res.status(401).send('Not Authorised');
    }
    } catch(err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}