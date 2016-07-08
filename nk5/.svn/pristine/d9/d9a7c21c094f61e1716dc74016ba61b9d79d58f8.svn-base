var fs = require('fs');
var User = require('../models/User').User;
var config = require('../../config/config.js');

module.exports = function(socket) {
	
socket.on('message:read', function(req, res) {
	User.checkAuthorization('teacher', req, res, function() {
		fs.readFile(__dirname + '/../../public/message.txt', 'utf8', function(err, data) {
			 var dataArray=data.split('##|#_#|##');
			 if(dataArray.length>=3&&dataArray[1]&&dataArray[2]){
			 	var msg={msg:dataArray[0],modifyName:dataArray[1],modifyDate:dataArray[2]} 
			 	res(err, msg);
			 }else{
			 	var msg={msg:"no message ",modifyName:"",modifyDate:"1970-01-01 00:00:00"} 
			 	res(err, msg);
			 }
			
		});
	});
});
  
  socket.on('message:update', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
		if(typeof req.msg != 'undefined'&&req.isupdate){
			var data=req.msg+"##|#_#|##"+req.lastModifyName+"##|#_#|##"+req.lastModifyDate
			fs.writeFile(__dirname + '/../../public/message.txt', data, function(err) {
				res(err, 'done');
			});
		}else{
			res('missing parameter msg');
		}
	  });
  });
  
  var running = false;
  
  socket.on('message:backup', function(req, res) {
    User.checkAuthorization('admin', req, res, function() {
		
		if(running)
			res(-1);
			
		running = true;
		
		console.log('Starting backup ' + __dirname + '/../../../backup.bat');
		var spawn = require('child_process').spawn,
			backup = spawn(__dirname + '/../../../backup.bat', [], {cwd: __dirname + '/../../../'});
			
			var logerr = '';
			var logstd = '';
			
			backup.stdout.on('data', function(data) {logstd += data;});
			backup.stderr.on('data', function(data) {logerr += data;});
			
			backup.on('close', function(code) {
				running = false;
				if(code === 0)
					res(null, code);
				else
					res({stderr: logerr, stdout: logstd});
			});
	  });
  });

 };
