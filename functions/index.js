const functions = require('firebase-functions');

const express = require('express');
const jsforceAjaxProxy = require('./proxy');
const app = express();

function regions() {
  if (functions.config().proxy.region) {
    return functions.config().proxy.region.split(',');
  }
  return ['us-central1'];
}

const allowedOrigin = functions.config().proxy.allowedOrigin;

app.all('/proxy/?*', jsforceAjaxProxy({
  enableCORS: true,
  allowedOrigin
}));

regions().forEach(region => {
  exports[region.replace(/-/g, '_')] = functions.region(region).https.onRequest(app);
});
