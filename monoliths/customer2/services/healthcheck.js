const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";

exports.service = async (req, res) => {
    if (debugLogging) console.log("Performing Healthcheck");
    try {
        return res.status(200).send('OK');
    } catch(err) {
        console.error(err);
        return res.status(500).send("healthcheck failure!");
    }
}