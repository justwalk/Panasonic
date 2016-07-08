var process = require('../../config/db.js').Process;
var process_event = require('../../config/db.js').ProcessEvent;
var session = require('../../config/db.js').Session;

exports.save = {
	index: function(req, res){
		console.log('process req');
		for(var key in req.body) {
			req.query[key] = req.body[key];
		}

		process.all({where: {id: req.query.id}}, function(err, data) {
			if(err)
				res.send(500, err);
			else {
				if(data.length === 0) {
					process.create(req.query, function(err, data) {
						if(err)
							res.send(500, err);
						else
							res.send(data);
					});
				} else {
					var existing = data[0];
					existing.updateAttributes(req.query, function(err, data) {
						if(err)
							res.send(500, err);
						else
							res.send(data);
					});
				}
			}
		});
	}
};

exports.log = {
	index: function(req, res){
		console.log('process event req');
		for(var key in req.body) {
			req.query[key] = req.body[key];
		}

		req.query.Time = new Date();

		process_event.create(req.query, function(err, data) {
			if(err)
				res.send(500, err);
			else
				res.send(data);
		});
	}
};

exports.session = {
	index: function(req, res){
		console.log('session req');
		for(var key in req.body) {
			req.query[key] = req.body[key];
		}

		req.query.Time = new Date();

		session.create(req.query, function(err, data) {
			if(err)
				res.send(500, err);
			else
				res.send(data);
		});
	}
};

var clientToolsStarted = require('../helpers/alive').clientToolsStarted;

exports.alive = {
	index: function(req, res){
		console.log('alive event');
		for(var key in req.body) {
			req.query[key] = req.body[key];
		}

		clientToolsStarted(req.query.ID);
	}
};