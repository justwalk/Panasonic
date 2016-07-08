var rest = require('../helpers/rest_helper');
var config = require('../../config/config.js');
var base_disksURL = config.restHost() + '/disks/';


var BaseDisk = function(settings){
  if (settings) {
    this.id = settings.id;
    this.name = settings.name;
    this.description = settings.description;
  }
};

BaseDisk.getServers = function(callback) {
  rest.getJSON(config.restHost()+'/ioservers', function(err, resp, body) {
    callback(err, body);
  });
};

var addChildren = function(array, child) {
	for(var key in child.Children)
		addChildren(array, child.Children[key]);
	
	array.push(child);
};

BaseDisk.getDisks = function(ioserver, callback) {
    var baseDisksURL = config.restHost()+'/ioservers/'+ioserver.ID+'/disks/';
    console.log(baseDisksURL);
    rest.getJSON(baseDisksURL, function(err, resp, body) {
      ioserver.disks = [];
	  
	  for(var key in body)
		addChildren(ioserver.disks, body[key]);
	  
      callback(err, ioserver);
    });
};

BaseDisk.all = function(options, callback) {
  var self = this;
  self.allDisks = [];
  BaseDisk.getServers(function(err, ioservers) {
	if(err)
		 return callback(err);
    var waiting = ioservers.length;
    
    ioservers.forEach(function(ioserver) {
      BaseDisk.getDisks(ioserver, function(err, ioserver) {
	    if(err) {
			return callback(err);
		}
        self.allDisks.push(ioserver);
        waiting --;
        if (!waiting) {
          callback(null, self.allDisks);
        }
      });
    });
  });
};

BaseDisk.find = function(IOServer, base_disk_id, callback) {
  rest.getJSON(config.restHost()+'/ioservers/'+IOServer+'/disks/', function(err, resp, body) {
    if(err)
		callback(err);
	else {
		var basedisk = BaseDisk.fromCGI(body);
		console.log('basedisk', basedisk, body);
		callback(err, basedisk);
	}
  });
};


BaseDisk.create = function(params, callback) {
  var baseDisksURL = config.restHost()+'/ioservers/'+params.IOServer+'/disks/';
  console.log('BaseDisk.toCGI', params, 'url', baseDisksURL+'create');
  rest.postData(baseDisksURL+'create', params , function(err, resp, body) {
    console.log('BaseDisk create', err, body);
    if (err) {
      callback(err);
    }else{
      params.ID = body.ID;
      callback(err, params);
    }
  });
};

BaseDisk.update = function(params, callback) {
  var baseDisksURL = config.restHost()+'/ioservers/'+params.IOServer+'/disks/'+params.ID;
  rest.postData(baseDisksURL+'/update', params , function(err, resp, body) {
    console.log('BaseDisk update', err, body);
    if (err) {
      callback(err);
    }else{
      callback(err, params);
    }
  });
};

BaseDisk.destroy = function(params, callback) {
  var self = this;
  //console.log('BaseDisk.destroy',params)
  var baseDisksURL = config.restHost()+'/ioservers/'+params.IOServer+'/disks/'+params.ID;
  rest.postData(baseDisksURL+'/delete', params , function(err, resp, body) {
   // console.log('BaseDisk delete', err)
    if (err) {
      callback(err);
    }else{
      callback(err, params);
    }
  });
};


BaseDisk.toCGI = function(menu) {
  var mappedBaseDisk = {};
  for (var attribute in mapping) {
    mappedBaseDisk[attribute] = menu[mapping[attribute]];
  }
  return mappedBaseDisk;
};

BaseDisk.arrayFromCGI = function(base_disks, computer_id) {
  var mappedBaseDisks = [];
  base_disks.forEach(function(base_disk) {
    mappedBaseDisks.push(BaseDisk.fromCGI(base_disk, computer_id));
  });
  return mappedBaseDisks;
};

BaseDisk.fromCGI = function(base_disk, computer_id) {
  var mappedBaseDisk = new BaseDisk();
  for (var item in  mapping) {
    mappedBaseDisk[mapping[item]] = base_disk[item];
  }
  mappedBaseDisk.computer_id = computer_id;
  return mappedBaseDisk;
};

var mapping = {
  'ID':'id',
  'Name':'name',
  'Parent':'parent',
  'CacheDisk':'cache_disk',
  'Type':'type',
  'Size':'size',
  'CacheSize':'cache_size',
  'Version':'version',
  'MaxSnapshot':'max_snapshot',
  'MaxExportDiskSize':'max_export_disk_size',
  'IOServer':'io_server_id',
  'Pack':'pack',
  'Format':'format',
  'Chilren':'children',
  'SyncType':'sync_type',
  'SyncDay':'sync_day',
  'SyncHour':'sync_hour',
  'SyncSpeed':'sync_speed',
  'Checkval':'checkval'
};

module.exports.BaseDisk = BaseDisk;