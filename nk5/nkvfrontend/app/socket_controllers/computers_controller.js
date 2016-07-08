var Computer = require('../models/computer').Computer;
var User = require('../models/User').User;

module.exports = function(socket) {
  
  socket.on('computers:read', function (req, res) {
    User.checkAuthorization('teacher', req, res, function() {
    	var conditions = {};
      if(req.group_id){
        conditions.group_id = req.group_id;
      }

      Computer.all({where: conditions}, function(error, computers) {
        res(null, computers);
      });
    });
  });

  socket.on('computer:read', function(req, res) {
    User.checkAuthorization('teacher', req, res, function() {
      Computer.find(req.computer_id, function(err, computer) {
        res(null,computer);
      });
    });  
  });
  //新增方法 重写方法
  socket.on('computer:readRewrite', function(req, res) {
    User.checkAuthorization('teacher', req, res, function() {
      Computer.findRewrite(req.computer_id, function(err, computer) {
        res(null,computer);
      });
    });
  });

  socket.on('computer:create', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      Computer.create(req, function(error, computerCopy) {
        console.log('compresponse', error, computerCopy, computerCopy && computerCopy.error);
        if (!error) {
          socket.emit('computers:create', computerCopy);
          socket.broadcast.emit('computers:create', computerCopy);
        }
        res(error, computerCopy);
      });
  	});
  });

  socket.on('computer:update', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      console.log("computer:update======Computer.find========开始=======","==========req.id========"+req.id);
    Computer.find(req.id, function(error, computer) {
      console.log("computer:update======Computer.find========返回值=======","======error========"+error);
      if (!error) {
        computer.updateAttributes(req, function(error, computerCopy) {
          console.log('upd,', error);
          if (!error) {
            socket.emit('computers:update', computerCopy);
            socket.broadcast.emit('computers:update', computerCopy);
          }
          console.log('err', computer.errors);
          res(error, computerCopy);
        });
      }else{
        res('Computer not found', null);
      }
    });
	});
  });
  
  socket.on('computer:delete', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
    Computer.find(req.id, function(error, computer) {
      if (!error) {
        computer.destroy(function(err, computer) {
          if(!err){
            socket.emit('computers:delete', computer);
            socket.broadcast.emit('computers:delete', computer);
          }
          console.log('destroy called', computer);

          res(error, computer);
        });
      }else{
        res('Computer, not found', null);
      }
    });
	});
  });
};