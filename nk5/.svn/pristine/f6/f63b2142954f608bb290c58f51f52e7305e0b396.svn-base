var Menu = require('../models/menu').Menu;
var User = require('../models/User').User;


module.exports = function(socket) {
  
  socket.on('menus:read', function (req, res) {
User.checkAuthorization('admin', req, res, function() {
   console.log('menus:read');
   var computer_id=req.computer_id;
    var conditions = {};
    if(req.computer_id){
      conditions.computer_id = req.computer_id;
    }
    
    Menu.all({where: conditions}, function(error, menus) {
      res(null, menus,computer_id);
    });
	});
  });





  socket.on('menu:create', function(req, res) {
    console.log('menu:create');
    User.checkAuthorization('admin', req, res, function() {
    Menu.create(req, function(error, menuCopy) {
      if (!error) {
        console.log('menu:create emit', menuCopy);
        socket.emit('menus:create', menuCopy);
        socket.broadcast.emit('menus:create', menuCopy);
      }
      res(error, menuCopy);
    });
	});
  });

 //xiongpanan add start 2016/4/12
socket.on('menu:createMenu', function(req, res) {
    console.log('menu:createMenu');
    User.checkAuthorization('admin', req, res, function() {
    Menu.createMenu(req, function(error, menuCopy) {
      if (!error) {
        console.log('menu:createMenu emit', menuCopy);
        socket.emit('menus:createMenu', menuCopy);
        socket.broadcast.emit('menus:createMenu', menuCopy);
      }
      res(error, menuCopy);
    });
  });
  });
 //xiongpanan add end 2016/4/12

  socket.on('menu:update', function(req, res) {
    console.log('menu:update');
	User.checkAuthorization('admin', req, res, function() {
    Menu.find(req.id, function(error, menu) {
      if (!error) {
        menu.updateAttributes(req, function(error, menuCopy) {
          if (!error) {
            socket.emit('menus:update', menu);
            socket.broadcast.emit('menus:update', menu);
          }
          console.log('err', menu.errors);
          res(menu.errors, menu);
        });
      }
    });
	});
  });
  
  socket.on('menu:delete', function(req, res) {
    console.log('menu:delete');
    User.checkAuthorization('admin', req, res, function() {
    Menu.find(req.computer_id, req.id, function(error, menu) {
      console.log('menu found', menu);
      if (!error) {
        menu.destroy(function(err, menu) {
          if(!err){
            socket.emit('menus:delete', menu);
            socket.broadcast.emit('menus:delete', menu);
          }
          console.log('destroy called', menu);

          res(err, menu);
        });
      }else{
        res('Menu, not found', null);
      }
    });
	});
  });



 //xiongpanan add start 2016/4/12
socket.on('menu:setDefaultMenu', function(req, res) {
    console.log('menu:setDefaultMenu');
    User.checkAuthorization('admin', req, res, function() {
    Menu.setDefaultMenu(req.computer_id, req.id, function(error, menu) {
          if(!error){
            socket.emit('menus:setDefaultMenu', menu);
            socket.broadcast.emit('menus:setDefaultMenu', menu);
          }
        res(error, menu);
    });
  });
  });
 //xiongpanan add end 2016/4/12







};