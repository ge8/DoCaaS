const { username, password } = require("./tenant-info");

exports.service = async (req, res, next) => {
    try {
    let auth = req.headers.authorization;
    if (!auth) return res.status(401).send('Not Authorised');
    if (auth.length > 5 && auth.substring(0, 5) === "Basic") {
        // Basic Authentication
        let arr = Buffer.from(auth.substring(5).trim(), 'base64').toString().split(":");
        if (arr[0].toLowerCase() === username.toLowerCase() && arr[1] === password) {
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