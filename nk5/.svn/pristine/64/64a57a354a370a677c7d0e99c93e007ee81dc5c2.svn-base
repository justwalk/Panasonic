var Group = require('../../config/db.js').Group;
var rest = require('../helpers/rest_helper');
var config = require('../../config/config.js');
var groupsURL = config.restHost() + '/groups/';


Group.validatesPresenceOf('name');

Group.all = function(callback) {
  rest.getJSON(groupsURL, function(err, resp, body){
    if(err)
		callback(err);
	else
		callback(err, Group.arrayFromCGI(body));
  });
};

Group.find = function(group_id, callback) {
  rest.getJSON(groupsURL+group_id, function(err, resp, body) {
    if(err)
		callback(err);
	else {
		var group = Group.fromCGI(body);
		callback(err, group);
	}
  });
};

Group.create = function(params, callback) {
  var group = Group.toCGI(params);
  rest.postData(groupsURL+'create', group, function(err, resp, body) {
    if (!err) {
		group = Group.fromCGI(group);
      group.id = body.ID;
      callback(null, group);
    } else {
		callback(err);
	}
  });
};

Group.prototype.destroy = function(callback) {
  var self = this;
  rest.postData(groupsURL+self.id+'/delete',{}, function(err, resp, body) {
    if (body.error) {
      return callback(body, self);
    }
    return callback(err, self);
  });
};

var mapping = {
  'ID': 'id',
  'Name': 'name',
};

Group.arrayFromCGI = function(groups) {
  var mappedGroups = [];
  groups.forEach(function(group) {
    mappedGroups.push(Group.fromCGI(group));
  });
  return mappedGroups;
};

Group.fromCGI = function(group) {
  var mappedGroup = new Group();
  for (var item in  mapping) {
    mappedGroup[mapping[item]] = group[item];
  }
  return mappedGroup;
};

Group.toCGI = function(group) {
  var mappedGroup = {};
  for (var attribute in mapping) {
    mappedGroup[attribute] = group[mapping[attribute]];
  }
  return mappedGroup;
};


module.exports.Group = Group;
