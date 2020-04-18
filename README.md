# JSforce AJAX Proxy for Cloud Functions

In this project, [JSforce AJAX Proxy](https://github.com/jsforce/jsforce-ajax-proxy) runs in Cloud Functions.

There is the follwoing change from JSforce AJAX Proxy. Therefore, I do not use JSforce AJAX Proxy directly. 

* Added `Sforce-Call-Options` in `Access-Control-Allow-Headers`

## Usage

```
$ cd functions
$ firebase use <project_id>
$ firebase functions:config:set proxy.region="asia-northeast1" proxy.allowed_origin="<origin>"
$ firebase deploy --only functions
```