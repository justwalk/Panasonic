var logfile = require('../models/logfileread').logFile;
var User = require('../models/User').User;

module.exports = function(socket) {
  socket.on('logfile:read', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
    	logfile.readLogFile(res);
    });
  });
};
