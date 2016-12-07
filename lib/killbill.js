var btoa, XMLHttpRequest;

if (typeof require !== 'undefined') {
  btoa = require("btoa");
  XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}

(function(exports){
  exports.BASE_RESOURCE = '/1.0/kb';

  exports.settings = {
    url: 'http://127.0.0.1:8080',
    username: 'admin',
    password: 'password',
    apiKey: 'bob',
    apiSecret: 'lazar'
  };

  exports._merge = function(obj1, obj2) {
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
  }

  exports._get = function(uri, params, options, callback) {
    exports._request('GET', uri, exports._merge({ params: params }, options), callback)
  };

  exports._post = function(uri, body, params, options, callback) {
    exports._request('POST', uri, exports._merge({ params: params, body: body }, options), callback)
  };

  exports._put = function(uri, body, params, options, callback) {
    exports._request('PUT', uri, exports._merge({ params: params, body: body }, options), callback)
  };

  exports._delete = function(uri, params, options, callback) {
    exports._request('DELETE', uri, exports._merge({ params: params }, options), callback)
  };

  exports._request = function(method, relativeUri, options, callback) {
    // Build URL
    var url = exports.settings.url + relativeUri;
    if (options.params) {
      var pairs = [];
      for (var prop in options.params) {
        if (!options.params.hasOwnProperty(prop)) {
          continue;
        }
        pairs.push(encodeURIComponent(prop) + '=' + encodeURIComponent(options.params[prop]));
      }

      if (pairs.length > 0) {
        url = url + '?' + pairs.join('&');
      }
    }

    return exports._requestWithAbsoluteUri(method, url, options, callback);
  }

  exports._requestWithAbsoluteUri = function(method, absoluteUri, options, callback) {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState == 4) {
        if (callback === undefined) {
          return;
        }

        if (xmlhttp.status >= 200 && xmlhttp.status < 300) {
          var attributes = {
            paginationMaxNbRecords: xmlhttp.getResponseHeader('X-Killbill-Pagination-MaxNbRecords'),
            paginationTotalNbRecords: xmlhttp.getResponseHeader('X-Killbill-Pagination-TotalNbRecords'),
            paginationNextPage: xmlhttp.getResponseHeader('X-Killbill-Pagination-NextPageUri'),

            location: xmlhttp.getResponseHeader('Location')
          }

          if (xmlhttp.status == 201 && attributes.location) {
            exports._requestWithAbsoluteUri('GET', attributes.location, options, callback);
          } else {
            if(xmlhttp.responseText) {
              callback(null, JSON.parse(xmlhttp.responseText), attributes);
            }
            else {
              callback(null, null, attributes);
            }
          }
        } else if (xmlhttp.status == 401) {
          var error = new Error("Unauthorized");
          callback(error, null);
        } else {
          var errorMsg = xmlhttp.responseText;
          if (!errorMsg) {
            errorMsg = "No response from server";
          } else {
            try {
              var errorParsed = JSON.parse(xmlhttp.responseText);
              if (errorParsed['message']) {
                errorMsg = errorParsed['message'];
              }
            } catch (e) {}
          }

          var error = new Error(errorMsg);
          callback(error, null);
        }
      }
    }

    xmlhttp.open(method, absoluteUri, true);

    // Use basic auth, if needed
    if (exports.settings.username !== undefined && exports.settings.password !== undefined) {
      var token = exports.settings.username + ':' + exports.settings.password;
      var hash = btoa(token);
      xmlhttp.setRequestHeader('Authorization', 'Basic ' + hash);
    }

    // Setup tenant headers, if needed
    if (exports.settings.apiKey !== undefined && exports.settings.apiSecret !== undefined) {
      xmlhttp.setRequestHeader('X-Killbill-ApiKey', exports.settings.apiKey);
      xmlhttp.setRequestHeader('X-Killbill-ApiSecret', exports.settings.apiSecret);
    }

    // Setup audit headers, if needed
    if (options.user) {
      xmlhttp.setRequestHeader('X-Killbill-CreatedBy', options.user);
    }
    if (options.reason) {
      xmlhttp.setRequestHeader('X-Killbill-Reason', options.reason);
    }
    if (options.comment) {
      xmlhttp.setRequestHeader('X-Killbill-Comment', options.comment);
    }

    xmlhttp.setRequestHeader('Accept', 'application/json')
    xmlhttp.setRequestHeader('Content-Type', 'application/json')

    // See http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader()-method
    //xmlhttp.setRequestHeader('User-Agent', 'killbill/1.0 JS')

    xmlhttp.send(JSON.stringify(options.body));
  }
})(typeof exports === 'undefined'? this['K']={}: exports);