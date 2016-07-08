var Pack = require('../models/pack').Pack;
var User = require('../models/User').User;


module.exports = function(socket) {
  
  socket.on('packs:read', function (req, res) {
    User.checkAuthorization('admin', req, res, function() {
	var conditions = {};
  var computer_id = req.computer_id;
  var menu_id = req.menu_id;
    if(req.computer_id && req.menu_id){
      conditions.computer_id = req.computer_id;
      conditions.menu_id = req.menu_id;
    }

    Pack.all({where: conditions}, function(error, packs) {
      res(null, packs,computer_id,menu_id);
    });
	});
  });

  socket.on('pack:create', function(req, res) {
    console.log('pack:create', req);
    User.checkAuthorization('admin', req, res, function() {
    Pack.create(req, function(error, packCopy) {
      if (!error) {
        socket.emit('packs:create', packCopy);
        socket.broadcast.emit('packs:create', packCopy);
      }
      res(error, packCopy);
    });
	});
  });

  socket.on('pack:update', function(req, res) {
    console.log('pack:update');
	User.checkAuthorization('admin', req, res, function() {
   Pack.find(req.id, function(error, pack) {
      if (!error) {
        pack.updateAttributes(req, function(error, packCopy) {
          if (!error) {
            socket.emit('packs:update', pack);
            socket.broadcast.emit('packs:update', pack);
          }
          console.log('err', pack.errors);
          res(pack.errors, pack);
        });
      }
    });
	});
  });



//xiongpanan add start 2016/4/22
    socket.on('pack:updateBootMenuPack', function(req, res) {
    console.log('pack:updateBootMenuPack');
  User.checkAuthorization('admin', req, res, function() {
   Pack.find(req.computer_id, req.menu,  req.id, function(error, pack) {
      if (!error) {
        Pack.updateBootMenuPack(req, function(error, packCopy) {
          if (!error) {
            socket.emit('packs:updateBootMenuPack', pack);
            socket.broadcast.emit('packs:updateBootMenuPack', pack); 
          }else{
             res({error:"SDKError"}, pack);
          }
          //console.log('err', );
         
        });
      }
    });
  });
  });
//xiongpanan add end 2016/4/22  
socket.on('pack:startUpdate', function(req, res) {
    console.log('pack:startUpdate');
  User.checkAuthorization('admin', req, res, function() {
   Pack.find(req.computer_id, req.menu,  req.id, function(error, pack) {
      if (!error) {
        Pack.updateBootMenuPack(req, function(error, packCopy) {
          if (!error) {
            socket.emit('packs:startUpdate', pack);
            socket.broadcast.emit('packs:startUpdate', pack); 
          }else{
             res({error:"SDKError"}, pack);
          }
          //console.log('err', );
         
        });
      }
    });
  });
  });




  socket.on('pack:updateBootMenuPack', function(req, res) {
    console.log('pack:updateBootMenuPack');
  User.checkAuthorization('admin', req, res, function() {
   Pack.find(req.computer_id, req.menu,  req.id, function(error, pack) {
      if (!error) {
        Pack.updateBootMenuPack(req, function(error, packCopy) {
          if (!error) {
            socket.emit('packs:updateBootMenuPack', pack);
            socket.broadcast.emit('packs:updateBootMenuPack', pack); 
          }else{
             res({error:"SDKError"}, pack);
          }
          //console.log('err', );
         
        });
      }
    });
  });
  });

  
  socket.on('pack:delete', function(req, res) {
    console.log('pack:delete', req);
    User.checkAuthorization('admin', req, res, function() {
    Pack.find(req.computer_id, req.menu,  req.id, function(error, pack) {
      console.log('pack found', pack);
      if (!error) {
        pack.destroy(function(err, pack) {
          if(!err){
            socket.emit('packs:delete', pack);
            socket.broadcast.emit('packs:delete', pack);
          }
          res(err, pack);
        });
      }else{
        res('Pack, not found', null);
      }
    });
	});
  });

//xiongpanan add start 2016/4/19
  socket.on('pack:setPack', function(req, res) {
    console.log('pack:setPack', req);
    User.checkAuthorization('admin', req, res, function() {
    Pack.setPack(req, function(error, packCopy) {
      if (!error) {
        socket.emit('packs:setPack', packCopy);
        socket.broadcast.emit('packs:setPack', packCopy);
      }
      res(error, packCopy);
    });
  });
  });

//xiongpanan add end 2016/4/19

};