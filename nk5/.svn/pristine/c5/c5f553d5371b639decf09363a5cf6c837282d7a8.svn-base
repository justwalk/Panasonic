var VariousSetting = require('../models/various_setting').VariousSetting;
var User = require('../models/User').User;

module.exports = function(socket) {
  socket.on('various_setting:read', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
    	var data = VariousSetting.readFile();
    	res(null, data);
    });
  });

 // wangxin add start 20160420
  socket.on('various_setting:create', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
      VariousSetting.writeFile(req);
    });
  });
// wangxin add end 20160420
};
