'use strict';
exports.handle_request = async (event, context, callback) => {
    var origin = event.headers.origin || event.headers.Origin;
    var requestHeaders = event.headers["access-control-request-headers"] || event.headers["Access-Control-Request-Headers"];
    callback(null, {
        statusCode:'200',
        body: "",
        headers: {
            'Access-Control-Max-Age': '900',
            'Access-Control-Allow-Headers': requestHeaders,
            'Access-Control-Allow-Origin': origin,
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Methods': 'GET,POST,PUT,OPTIONS'
        }
    });
};
 