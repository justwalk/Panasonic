var fs = require('fs');

exports.update = function(req, res){
	require('./config/config').checkPass(req, res, function() {
		fs.writeFile('public/message.txt', req.params.msg, function(err) {
			if(err)
				res.send(err);
			else
				res.send('done');
		});
	});
};

exports.show = function(req, res){
	fs.readFile('public/message.txt', 'utf8', function(err, data) {
		if(err)
			res.send(err);
		else {
			res.send(data);
		}
	});
};
