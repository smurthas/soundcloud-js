var querystring = require('querystring')
  , OAuth = require("oauth").OAuth2
  , request = require('request');

var CLIENT = {}
  , _soundcloud_api_url = 'https://api.soundcloud.com';

/* gets the authorize url
 *
 * @param {Object} options
 * @return {String}
 */
CLIENT.getAuthorizeUrl = function(options) {
    return 'https://soundcloud.com/connect?' + (options ? querystring.stringify(options) : '');
};

/* Does an API call to facebook and callbacks
 * when the result is available.
 *
 * @param {String} method
 * @param {String} path
 * @param {Object} params
 * @param {Function} callback
 * @return {Request}
 */
CLIENT.apiCall = function(method, path, params, callback) {
    callback = callback || function() {};
    return request({method: method, uri: _soundcloud_api_url + path + '?' + querystring.stringify(params), json:true}, callback);
};

/* Does an API call to facebook and returns
 * the request stream.
 *
 * @param {String} key
 * @param {String} secret
 * @param {String} code
 * @param {String} redirect_uri
 * @param {Function} callback
 */
CLIENT.getAccessToken = function(client_id, client_secret, code, redirect_uri, callback) {
    var postData = {
        client_id:client_id,
        client_secret:client_secret,
        grant_type:'authorization_code',
        redirect_uri:redirect_uri,
        code:code
    }
    request.post({uri:_soundcloud_api_url + '/oauth2/token', 
                  body: querystring.stringify(postData), 
                  headers : {'Content-Type' : 'application/x-www-form-urlencoded'}},
        function(err, resp, body) {
            if(err) return callback(err, body);
            try {
                body = JSON.parse(body);
            } catch(err) { 
                return callback(err, body);
            }
            callback(err, body);
        }
    );
};

module.exports = CLIENT;
