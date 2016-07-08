var Group = require('../models/group').Group;

exports.index = function(req, res){
    Group.all({}, function(err, groups){
      console.log(groups)
      res.json(groups);
    });
};

exports.new = function(req, res){
    res.json('new group');
};

exports.create = function(req, res){
    var group = new Group(req.body);
    console.log(Group.tableName);
    group.save(function(err, groupCopy) {
      if (!err) {
        res.json(group);        
      }else {
        res.json(group.errors, 422);
      };
    });
};

exports.show = function(req, res){
    Group.find(req.params.group, function(group){
      res.json(group);
    })
};

exports.edit = function(req, res){
    res.json('edit group ' + req.params.group);
};

exports.update = function(req, res){
    res.json('update group ' + req.params.group);
};

exports.destroy = function(req, res){
    Group.find(req.params.group, function(group) {
      group.destroy(function(message) {
        console.log(message);
      })
    });
};
