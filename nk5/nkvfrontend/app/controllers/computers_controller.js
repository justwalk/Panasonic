var model = require('../models/computer')
var util = require('util');

exports.index = function(req, res){
  var conditions = {};
  if(req.param('group_id')){
    conditions.where = req.param('group_id');
  }
	model.Computer.all(conditions, function(err, computers){
    res.send(computers);
	});
};

exports.new = function(req, res){
  res.send('new computer');
};

exports.create = function(req, res){
  res.send('create computer');
};

exports.show = function(req, res){
    model.Computer.find(req.params.computer, function(computer){
		  res.send(computer);
	 });
};

exports.edit = function(req, res){
    res.send('edit computer ' + req.params.computer);
};

exports.update = function(req, res){
    model.Computer.command(req.params.computer,   req.body.COMID, function(err, resp, body){
        res.send('update computer with COMID'  + req.body.COMID);
        console.log('computer update with => ' + req.body.COMID);
        console.log(err);
        console.log(resp.statusCode);
    });
};

exports.destroy = function(req, res){
    res.send('destroy computer ' + req.params.computer);
};

exports.load = function(req, res) {
    console.log('load hit');
};