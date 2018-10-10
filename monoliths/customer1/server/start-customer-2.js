const debugLogging = (process.env.DEBUG_LOGGING || "false") === "true";
const express = require('express')

const app = express()

// Shuffle Service - available to all customers
app.get('/healthcheck', require('../services/healthcheck').service);
app.get('/create', require('../services/create').service);
app.get('/get', require('../services/get').service);
app.get('/take', require('../services/take').service);

app.listen(3002, () => console.log('Customer 2: Service Started (On Port: 3002)'))