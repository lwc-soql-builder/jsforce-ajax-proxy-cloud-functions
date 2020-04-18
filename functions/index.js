const functions = require('firebase-functions');

const express = require('express');
const jsforceAjaxProxy = require('./proxy');
const app = express();

const region = functions.config().proxy.region || 'us-central1';
const allowedOrigin = functions.config().proxy.allowedOrigin;

app.all('/?*', jsforceAjaxProxy({
  enableCORS: true,
  allowedOrigin
}));

exports.proxy = functions.region(region).https.onRequest(app);
