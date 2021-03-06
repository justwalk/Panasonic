var Menu = require('../../config/db.js').Menu;
var rest   = require('../helpers/rest_helper');
var config = require('../../config/config.js');

Menu.all = function(options, callback) {
  var menusURL = config.restHost() + '/computers/'+options.where.computer_id+'/menus/';
  rest.getJSON(menusURL, function(err, resp, body) {
    callback(err, Menu.arrayFromCGI(body, options.where.computer_id));
  });
};

Menu.find = function(computer_id, menu_id, callback) {
  var menuURL = config.restHost() + '/computers/' + computer_id + '/menus/' + menu_id;
  rest.getJSON(menuURL, function(err, resp, body) {
    if(err)
		callback(err);
	else {
		var menu = Menu.fromCGI(body, computer_id);
		callback(err, menu);
	}
  });
};

Menu.create = function(params, callback) {
  
  var menusURL = config.restHost() + '/computers/'+params.computer_id+'/menus/';
  console.log('menus blblbl', params, Menu.toCGI(params));
  rest.postData(menusURL+'create', Menu.toCGI(params) , function(err, resp, body) {
    if (!err) {
      params.id = body.ID;
      callback(null, params);
    }else{
      callback(err, params);
    }
    
  });
};

 //xiongpanan add start 2016/4/12
Menu.createMenu = function(params, callback) {
  
  var menusURL = config.restHost() + '/computers/'+params.computer_id+'/menus/';
  console.log('menus blblbl222', params, Menu.toCGI(params));
  rest.postData(menusURL+'createMenu', Menu.toCGI(params) , function(err, resp, body) {
    console.log(err);
    if (!err) {
      params.id = body.ID;
     
      callback(null, params);
    }else{
      callback(err, params);
    }
    
  });
};
 //xiongpanan add end 2016/4/12
Menu.prototype.destroy = function(callback) {
  var self = this;
  var menusURL = config.restHost() + '/computers/'+self.computer_id+'/menus/';
  
  rest.postData(menusURL+this.id+'/delete',{}, function(err, resp, body) {
    callback(err, body);
  });
};





 //xiongpanan add start 2016/4/12
Menu.setDefaultMenu = function(computer_id, menu_id, callback) {
  
  var menusURL = config.restHost() + '/computers/'+computer_id+'/menus/'+menu_id;
  console.log('menus blblbl222');
  rest.postData(menusURL+'/setDefaultMenu', {}, function(err, resp, body) {
  
    callback(err, body);
    
  });
};
 //xiongpanan add end 2016/4/12




Menu.toCGI = function(menu) {
  var mappedMenu = {};
  for (var attribute in mapping) {
    mappedMenu[attribute] = menu[mapping[attribute]];
  }
  return mappedMenu;
};

Menu.arrayFromCGI = function(menus, computer_id) {
  var mappedMenus = [];
  menus.forEach(function(menu) {
    mappedMenus.push(Menu.fromCGI(menu, computer_id));
  });
  return mappedMenus;
};

Menu.fromCGI = function(menu, computer_id) {
  var mappedMenu = new Menu();
  for (var item in  mapping) {
    mappedMenu[mapping[item]] = menu[item];
  }
  mappedMenu.computer_id = computer_id;
  return mappedMenu;
};

var mapping = {
  'ID':'id',
  'Name':'name',
  'Description':'description',
  'CacheSize':'cache_size',
  'Disabled':'disabled'
};

module.exports.Menu = Menu;