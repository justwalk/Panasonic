var fs = require('fs'),
    util = require('util');

	module.exports = function(app) {
    // Adding the main Resources
    // app.all("*", checkAuthentication);
	app.get('/LogApplication', require('../app/controllers/application').log.index);
	app.get('/Application', require('../app/controllers/application').save.index);
	app.get('/Session', require('../app/controllers/application').session.index);
	app.get('/Alive', require('../app/controllers/application').alive.index);

	app.post('/LogApplication', require('../app/controllers/application').log.index);
	app.post('/Application', require('../app/controllers/application').save.index);
	app.post('/Session', require('../app/controllers/application').session.index);
	app.post('/Alive', require('../app/controllers/application').alive.index);
};

var checkAuthentication = function(req, res, next) {
    console.log(req.url.match(/^\/sessions\/new/));
    if(!req.url.match(/^\/sessions\/new/)){
        res.redirect('/sessions/new?redir='+req.url);
    }else{
        next();
    }
};