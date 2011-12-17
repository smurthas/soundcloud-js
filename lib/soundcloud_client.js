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
    var oAuth = new OAuth(key, secret, _soundcloud_api_url);
    oAuth.getOAuthAccessToken(code, {
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code'
    },
    callback);
};

module.exports = CLIENT;
