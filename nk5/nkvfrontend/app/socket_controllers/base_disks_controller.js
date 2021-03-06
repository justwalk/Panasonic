var BaseDisk = require('../models/base_disk').BaseDisk;
var User = require('../models/User').User;

module.exports = function(socket) {
  
  socket.on('base_disks:read', function (req, res) {
    User.checkAuthorization('admin', req, res, function() {
	var conditions = {};
    if(req.server_id){
      conditions.server_id = req.server_id;
    }
    BaseDisk.all({where: conditions}, function(error, base_disks) {
      res(error, base_disks);
    });
	});
  });

  socket.on('base_disk:create', function(req, res) {
  User.checkAuthorization('admin', req, res, function() {
    BaseDisk.create(req, function(error, base_diskCopy) {
      if (!error) {
        socket.emit('base_disks:create', base_diskCopy);
        socket.broadcast.emit('base_disks:create', base_diskCopy);
      }
      res(error, base_diskCopy);
    });
});
  });

  socket.on('base_disk:update', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      BaseDisk.update(req, function(error, base_diskCopy) {
        if (!error) {
          socket.emit('base_disks:update', base_diskCopy);
          socket.broadcast.emit('base_disks:update', base_diskCopy);
        }
        res(error, base_diskCopy);
      });
    });
  });
  
  socket.on('base_disk:delete', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      BaseDisk.destroy(req, function(error) {
        if(!error){
          socket.emit('base_disks:delete', {ID: req.ID});
          socket.broadcast.emit('base_disks:delete', {ID: req.ID});
      }
      res(error, req);
    });
	});
  });
  
};