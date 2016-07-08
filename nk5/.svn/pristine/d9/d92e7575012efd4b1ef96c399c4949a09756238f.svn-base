var Home = require('../models/home').Home;
var User = require('../models/User').User;

module.exports = function(socket) {
	socket.on('home:read', function(req, res) {
		User.checkAuthorization('admin', req, res, function() {
			Home.get(function(err, data) {
				res(err, data);
			});
		});
	})
}