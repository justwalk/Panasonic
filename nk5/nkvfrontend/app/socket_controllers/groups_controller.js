var Group = require('../models/group').Group;
var User = require('../models/User').User;


module.exports = function(socket) {
  
  socket.on('groups:read', function (req, res) {
    User.checkAuthorization('teacher', req, res, function() {
	Group.all(function(error, groups) {
      console.log('groupps', groups);
      res(error, groups);
    });
	});
  });
  
  socket.on('group:create', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
	Group.create(req, function(error, groupCopy) {
      if (!error) {
        socket.emit('groups:create', groupCopy);
        socket.broadcast.emit('groups:create', groupCopy);
      }
      res(error, groupCopy);
    });
	});
  });

  socket.on('group:delete', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
	Group.find(req.id, function(error, group) {
      group.destroy(function(error) {
        if (!error) {
         socket.emit('group/' + group.id + ':delete', group);
         socket.broadcast.emit('group/' + group.id + ':delete', group);
         res(null, group);
        }
      });
    });
	});
  });
  
};