var Pack = require('../../config/db.js').Pack;
var rest   = require('../helpers/rest_helper');
var config = require('../../config/config.js');

Pack.all = function(options, callback) {
  
  var packsURL = config.restHost() + '/computers/'+options.where.computer_id+'/menus/'+options.where.menu_id+'/packs/';
  rest.getJSON(packsURL, function(err, resp, body) {
    if(err)
		return callback(err);
    callback(err, Pack.arrayFromCGI(body, options.where.computer_id));
  });
};

Pack.find = function(computer_id, menu_id, pack_id, callback) {
  var packURL = config.restHost() + '/computers/' + computer_id + '/menus/' + menu_id + '/packs/' + pack_id;
  console.log('Pack:find:'+packURL);
  rest.getJSON(packURL, function(err, resp, body) {
    if(err)
		callback(err);
	else {
		var pack = Pack.fromCGI(body, computer_id);
		callback(err, pack);
	}
  });
};

Pack.create = function(params, callback) {
  var packsURL = config.restHost() + '/computers/'+params.computer_id+'/menus/'+params.menu+'/packs/';
  params.state = 'UndoReady';  //Wondering what to do with these attributes ??
  params.order = 0;           //Wondering what to do with these attributes ??
  rest.postData(packsURL+'create', Pack.toCGI(params) , function(err, resp, body) {
    if (!err) {
      params.name = body.ID;
      params.id = body.ID;
      callback(null, params);
    }else{
      callback(err);
    }
    
  });
};

//xiongpanan add start 2016/4/19
Pack.setPack = function(params, callback) {
  var packsURL = config.restHost() + '/computers/'+params.computer_id+'/menus/'+params.menu_id+'/packs/'+params.pack_id+'/';
  
  rest.postData(packsURL+'setPack', Pack.toCGI(params) , function(err, resp, body) {
    if (!err) {
      params.name = body.ID;
      params.id = body.ID;
      callback(null, params);
    }else{
      callback(err);
    }
    
  });
};
//xiongpanan add end 2016/4/19

//xiongpanan add start 2016/4/22
Pack.updateBootMenuPack = function(param, callback) {
  var url = config.restHost() + '/computers/'+ param.computer_id +'/menus/'+param.menu+'/packs/'+param.id+'/updateBootMenuPack';
    params = {};
    params.Mode = param.mode;
    params.ExitUpdateMode = false;
    if (param.action == 'save_update_mode') {
      params.ExitUpdateMode = true;
       params.Description = "111111";
    }

  rest.postData(url, params, function(err, resp, body) {
     if (!err) {
      callback(null, params);
    }else{
      callback(err);
    }
    });
};

//xiongpanan add end 2016/4/22

Pack.startUpdate = function(param, callback) {
  var url = config.restHost() + '/computers/'+ param.computer_id +'/menus/'+param.menu+'/packs/'+param.id+'/startUpdate';
    params = {};
    params.computerId = param.computer_id; 
    params.menu_id = param.menu;
    params.timeOut = param.startUpCheckTime;
    params.mac_address = param.mac_address;
    params.Mode = param.mode;
  rest.postData(url, params, function(err, resp, body) {
     if (!err) {
      callback(null, params);
    }else{
      callback(err);
    }
    });
};








Pack.prototype.destroy = function(callback) {
  var self = this;
  var packsURL = config.restHost() + '/computers/'+self.computer_id+'/menus/'+self.menu+'/packs/';
  rest.postData(packsURL+this.id+'/delete',{}, function(err, resp, body) {
   callback(err, self);
  });
};


Pack.toCGI = function(pack) {
  var mappedPack = {};
  for (var attribute in mapping) {
    mappedPack[attribute] = pack[mapping[attribute]];
  }
  console.log('pack, mappedpack', pack, mappedPack);
  return mappedPack;
};

Pack.arrayFromCGI = function(packs, computer_id) {
  var mappedPacks = [];
  packs.forEach(function(pack) {
    mappedPacks.push(Pack.fromCGI(pack, computer_id));
  });
  return mappedPacks;
};

Pack.fromCGI = function(pack, computer_id) {
  var mappedPack = new Pack();
  for (var item in  mapping) {
    mappedPack[mapping[item]] = pack[item];
  }
  mappedPack.computer_id = computer_id;
  return mappedPack;
};


var mapping = {
  'ID':'id',
  'Name':'name',
  'Menu':'menu',
  'PackMode':'state',
  'PackType': 'type'
};

module.exports.Pack = Pack;