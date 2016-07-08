var log = require('../../config/db.js').Log;
var User = require('../models/User').User;


module.exports = function(socket) {
	socket.on('logs:read', function (req, res) {
		User.checkAuthorization('admin', req, res, function() {
			log.all(function(err, logs) {
				 res(err, logs);
			});
		});
	});
};