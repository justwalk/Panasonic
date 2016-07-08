var computerInfo = require('../../config/db.js').ComputerInfo;
var User = require('../models/User').User;


module.exports = function(socket) {
	socket.on('computerInfos:read', function (req, res) {

		User.checkAuthorization('admin', req, res, function() {
			
			computerInfo.all(function(err, computerInfos) {
				 res(err, computerInfos);
			});
		});
	});
};