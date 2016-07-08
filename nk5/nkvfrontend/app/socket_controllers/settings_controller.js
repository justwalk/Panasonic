var Settings = require('../models/settings').Settings;
var User = require('../models/User').User;

module.exports = function(socket) {
  socket.on('settings:read', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      Settings.get(function(err, data) {
        res(err, data);
      });
    });
  });

  socket.on('settings:update', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      if(req.OldPassWD&&req.PassWD!=req.OldPassWD){
          res({'error': 'Invalid password'}, null);
      }else{
         Settings.update(req, function(err, data) {
          res(err, data);
      });
      }
     
    });
  });

};