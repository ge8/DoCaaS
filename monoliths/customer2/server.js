const express = require('express')
const app = express()
const auth = require('./core/auth').service;
const { port, tenant } = require("./core/tenant-info");

// Enable Cors
app.use(function(req, res, next) {
    var origin = event.headers.origin || event.headers.Origin;
    var requestHeaders = event.headers["access-control-request-headers"] || event.headers["Access-Control-Request-Headers"];
    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

// Setup Routes
app.get('/', require('./services/redirect-to-app').service);
app.get('/healthcheck', require('./services/healthcheck').service);
app.get('/create', auth, require('./services/create').service);
app.get('/get', auth, require('./services/get').service);
// app.get('/shuffle', auth, require('./services/shuffle').service);
app.get('/take', auth, require('./services/take').service);
app.get('/game', auth, require('./services/game').service);

app.listen(port, () => console.log(tenant + ': Service Started (On Port: ' + port + ')'));