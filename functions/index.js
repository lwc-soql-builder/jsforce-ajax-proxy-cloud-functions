const functions = require('firebase-functions');

const jsforceAjaxProxy = require('./proxy');

function regions() {
  if (functions.config().proxy.region) {
    return functions.config().proxy.region.split(',');
  }
  return ['us-central1'];
}

const allowedOrigin = functions.config().proxy.allowed_origin;

const proxy = jsforceAjaxProxy({
  enableCORS: true,
  allowedOrigin
});

regions().forEach(region => {
  exports[region.replace(/-/g, '_')] = functions.region(region).https.onRequest(proxy);
});
