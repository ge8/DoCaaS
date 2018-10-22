const express = require('express')
const app = express()
const auth = require('./core/auth').service;
const { port, tenant } = require("./core/tenant-info");

// Setup Routes
app.get('/healthcheck', require('./services/redirect-to-app').service);
app.get('/healthcheck', require('./services/healthcheck').service);
app.get('/create', auth, require('./services/create').service);
app.get('/get', auth, require('./services/get').service);
app.get('/shuffle', auth, require('./services/shuffle').service);
app.get('/take', auth, require('./services/take').service);

app.listen(port, () => console.log(tenant + ': Service Started (On Port: ' + port + ')'));