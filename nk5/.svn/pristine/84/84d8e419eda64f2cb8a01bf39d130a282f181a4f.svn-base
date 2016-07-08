var config = require('../../config/config');
var settingsURL  = config.restHost() + '/settings';
var http = require('http');
var rest = require('../helpers/rest_helper');


Settings = {};

Settings.get = function(callback) {
  rest.getJSON(settingsURL, function(err, resp, data) {
  	console.log(data);
    callback(err, data);
  });
};

Settings.update = function(req, callback) {
  rest.postData(settingsURL + '/update', req, callback);
};

module.exports.Settings = Settings;
