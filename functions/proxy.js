const request = require('request');

/**
 * Allowed request headers 
 */
const ALLOWED_HEADERS = [
  'Authorization',
  'Content-Type',
  'Content-Length',
  'Salesforceproxy-Endpoint',
  'X-Authorization',
  'X-SFDC-Session',
  'SOAPAction',
  'SForce-Auto-Assign',
  'If-Modified-Since',
  'X-User-Agent',
  'Sforce-Call-Options',
  'Sforce-Query-Options'
];

/**
 * Endpoint URL validation
 */
const SF_ENDPOINT_REGEXP =
  /^https:\/\/[a-zA-Z0-9.-]+\.(force|salesforce|cloudforce|database)\.com\//;

/**
 * Create middleware to proxy request to salesforce server
 */
module.exports = function(options) {

  options = options || {};

  return function(req, res) {
    if (options.enableCORS) {
      res.header('Access-Control-Allow-Origin', options.allowedOrigin || '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,PATCH,PUT,DELETE');
      res.header('Access-Control-Allow-Headers', ALLOWED_HEADERS.join(','));
      res.header('Access-Control-Expose-Headers', 'SForce-Limit-Info');
      if (req.method === 'OPTIONS') {
        res.end();
        return;
      }
    }
    const sfEndpoint = req.headers["salesforceproxy-endpoint"];
    if (!SF_ENDPOINT_REGEXP.test(sfEndpoint)) {
      res.send(400, "Proxying endpoint is not allowed. `salesforceproxy-endpoint` header must be a valid Salesforce domain: " + sfEndpoint);
      return;
    }
    let headers = {};
    ALLOWED_HEADERS.forEach(header => {
      header = header.toLowerCase();
      const value = req.headers[header]
      if (value) {
        const name = header === 'x-authorization' ? 'authorization' : header;
        headers[name] = req.headers[header];
      }
    });
    const params = {
      url: sfEndpoint || "https://login.salesforce.com//services/oauth2/token",
      method: req.method,
      headers: headers,
    };
    if (req.method !== 'GET' && req.body) {
      params.body = req.body;
    }
    request(params).pipe(res);
  }
};