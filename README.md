# JSforce AJAX Proxy for Cloud Functions

In this project, [JSforce AJAX Proxy](https://github.com/jsforce/jsforce-ajax-proxy) runs in Cloud Functions.

There is the follwoing change from JSforce AJAX Proxy. Therefore, I do not use JSforce AJAX Proxy directly. 

* Added `Sforce-Call-Options` and `Sforce-Query-Options` in `Access-Control-Allow-Headers`

## Usage

```
$ cd functions
$ firebase use <alias or project_id>
$ firebase functions:config:set proxy.region="asia-northeast1,us-central1" proxy.allowed_origin="https://lwc-soql-builder.github.io"
$ firebase deploy --only functions
```

When you start the proxy as shown in the above example, you can access the proxy with the following two URLs.

* `https://asia-northeast1-<project alias>.cloudfunctions.net/asia_northeast1/proxy/`
* `https://us-central1-<project alias>.cloudfunctions.net/us_central1/proxy/`