var config = require('../../config/config.js');
var rest   = require('../helpers/rest_helper');

var homeURL = config.restHost()+'/ioservers';
var Home = {};

Home.get = function(callback) {
  rest.getJSON(homeURL, function(err, res, data) {
    callback(err, data);
  });
};

module.exports.Home = Home;