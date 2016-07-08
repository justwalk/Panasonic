var config = require('../../config/config');
var rest   = require('../helpers/rest_helper');
var User = require('../models/User').User;

module.exports = function(socket) {
  socket.on('channels:read', function(req, res) {
    //console.log('channels:read##################');
    User.checkAuthorization('admin', req, res, function() {
      rest.getJSON(config.restHost()+'/ioservers/'+req.server_id+'/channels', function(err, resp, body) {
          res(err,body);
      });
     });
  });

  socket.on('channel:create', function(req, res) {
    //console.log('channel:create##################');
    User.checkAuthorization('admin', req, res, function() {
      rest.postData(config.restHost()+'/ioservers/'+req.Server+'/channels/create',{Port:req.Port,IP:req.IP}, function(err, resp, body) {
        res(err,body);
      });
    });
  });

  socket.on('channel:delete', function(req, res) {
    //console.log('channel:delete##################');
    User.checkAuthorization('admin', req, res, function() {
      rest.postData(config.restHost()+'/ioservers/'+req.Server+'/channels/'+req.ID+'/delete',{}, function(err, resp, body) {
        res(err,body);
      });
    });
  });

};