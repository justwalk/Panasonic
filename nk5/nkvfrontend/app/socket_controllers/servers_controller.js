var Server = require('../models/server').Server,
config = require('../../config/config');
var User = require('../models/User').User;



module.exports = function(socket) {
  
  socket.on('servers:read', function (req, res) {
  User.checkAuthorization('admin', req, res, function() {
    Server.all(function(error, servers) {
      res(error, servers);
    });
	});
  });
  
  socket.on('server:create', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      Server.create(req, function(error, serverCopy) {
        if (!error) {
          socket.emit('servers:create', serverCopy);
          socket.broadcast.emit('servers:create', serverCopy);        
        };
        res(error, serverCopy)
      });    
    });
  });


//xiongpanan add start 2016/4/18
  socket.on('servers:aboutInfo', function (req, res) {
   
    User.checkAuthorization('admin', req, res, function() {
      Server.aboutInfo(function(error, serverInfo) {
            res(null, serverInfo);
      });
    });
  });
//xiongpanan add end 2016/4/18



  
  socket.on('server:update', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      Server.update(req, function(error,serverCopy) {
        if(!error){
          socket.emit('servers:update', serverCopy);
          socket.broadcast.emit('servers:update', serverCopy);
        }
        res(error, serverCopy);
      });
    });
  });

  socket.on('server:delete', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      Server.destroy(req.ID, function(error) {
        if(!error){
          socket.emit('servers:delete', {ID: req.ID});
          socket.broadcast.emit('servers:delete', {ID: req.ID});
        }
        res(error, req);
      });
    });
  });

  socket.on('server:restart', function(req, res) {
    console.log(arguments);
    User.checkAuthorization('admin', req, res, function() {
        Server.restart(req.ID, function(error) {
          if (!error) {
            socket.emit('server:restart', {ID: req.ID});
            socket.broadcast.emit('server:restart', {ID: req.ID});
          } 
          console.log(res);
          if (res) res(error, req);
        });
    });
  });
  
};
