var rest = require('../helpers/rest_helper');
var config = require('../../config/config.js');
var serversURL = config.restHost() + '/ioservers/';


var Server = function(settings){
	this.ID = settings.ID;
	this.IP = settings.IP;
	this.Port = settings.Port;
	this.Name = settings.Name;
	this.Description = settings.Description;
};

Server.all = function(callback){
	rest.getJSON(serversURL, function(err, resp, data) {
    callback(err, data);
  });
};


//xiongpanan add start 2016/4/18
Server.aboutInfo = function(callback) {
 rest.getJSON(serversURL+"aboutInfo", function(err, resp, data) {
    callback(err, data);
  });
};


//xiongpanan add end 2016/4/18
Server.create = function(params, callback) {
  rest.postData(serversURL+'create', params , function(err, resp, body) {
       if(!err)
		params.ID = body.ID;
	   callback(err, params);
  });
};

Server.update = function(params, callback) {
  var self = this;
  console.log(params);
  rest.postData(serversURL+params.ID+'/update',params, function(err, resp, body) {
//  rest.getJSON(serversURL+server_id+'/update', function(err, resp, body) {
//   callback(err, self);
    if (err) {
      callback(err);
    }else{
      callback(err, params);
    }
  });
};

Server.destroy = function(server_id, callback) {
  var self = this;
  rest.postData(serversURL+server_id+'/delete',{}, function(err, resp, body) {
   callback(err, self);
  });
};

Server.find = function(server_id, callback) {
  rest.getJSON(serversURL+server_id, function(err, resp, body) {
    callback(err, body);
  });
};

Server.restart = function(server_id, callback) {
  var self = this;
  rest.postData(serversURL + server_id + '/restart', {}, function(err, resp, body) {
    console.log(arguments);
    callback(err);
  });
};

module.exports.Server = Server;
