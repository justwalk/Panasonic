var http = require('http');
var fs = require('fs');


restHost = function(){

	return 'http://192.168.1.224:5000/nkv';

};

createdlogFolder=function(){
	return 'c:\\nkv\\log\\'+getNowFormatDate()+'\\';
}

logFolder=function(){
	return 'c:\\nkv\\log\\';
}
executeLogFolder=function(){

	var logName="executeLog";
	
	return logPath(logName);
}

getNowFormatDate=function () {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = year + month + strDate;
           
    return currentdate;
}

logPath=function(fileName){
	return logFolder()+fileName+".txt";
}

createLogPath=function(fileName){
	return createdlogFolder()+fileName+".txt";
}

readlogPath=function(dateTime,fileName){
	return 'c:\\nkv\\log\\'+dateTime+"\\"+fileName+".txt";
}

readlogDir = function(){
	return 'c:\\nkv\\log\\'+getNowFormatDate();
}

var password;

uiPassword = function(ret){
    if(typeof password === 'undefined' || password === null)

		fs.readFile('C:\\NKV\\bootmgr.ip', 'utf8', function(err, data) {

			if(err) {
				console.log(err);
				ret(err);
			} else {
				var lines = data.split('\n');
				while(lines[lines.length - 1] === '')
					lines.splice(-1, 1);
				password =[lines[lines.length - 2], lines[lines.length - 1]];
				ret(password);
			}
		});
	else{
		ret(password);
	}
};

/*checkPass = function(needs, req, res, fct) {
	if(typeof res === 'undefined' || res === null)
		console.log('Missing res');
	else if(typeof req === 'undefined' || req === null)
		res('Missing req', null);
	else if(typeof req.password === 'undefined' || req.password === null)
		res('Missing password', null);
	else if(typeof req.user === 'undefined' || req.user === null) {
		res('Missing user', null);
	} else {
		 require('../../config/db.js').User.all({where: {username: req.user,password: req.pass}},function(error, user) {
             if(user.length>0){
             	fct();
             }else{
             	res({'error': 'Invalid password'}, null);
             }
          });
	}

};*/
/*checkAuthorization=function(needs, req, res, fct) {
	if(typeof res === 'undefined' || res === null)
		console.log('Missing res');
	else if(typeof req === 'undefined' || req === null)
		res('Missing req', null);
	else if(typeof req.password === 'undefined' || req.password === null)
		res('Missing password', null);
	else if(typeof req.user === 'undefined' || req.user === null) {
		res('Missing user', null);
	} else if(needs===0){
		 User.all({where: {username: req.user,password: req.pass}},function(error, user) {
             if(user.length>0){
             	fct();
             }else{
             	res({'error': 'Invalid password'}, null);
             }
          });
	}else{
		User.all({where: {username: req.user,password: req.pass}},function(error, user) {
             if(user.length>0){
             	fct();
             }else{
             	res({'error': 'Invalid password'}, null);
             }
          });
	}*/
existsPath=function(){
	if (!fs.existsSync(logFolder())) {
	      fs.mkdirSync(logFolder());
	     console.log('logFolder created');
	  }
}

createExistsPath=function(){
	if (!fs.existsSync(createdlogFolder())) {
	      fs.mkdirSync(createdlogFolder());
	     //console.log('logFolder created');
	  }
}

confPath=function(){
	return  __dirname+'/NetKaleido.conf';
}

existsConfPath=function(){
	if (!fs.existsSync(confPath())) {
	      fs.mkdirSync(confPath());
	}
}


module.exports.restHost = restHost;
module.exports.uiPassword = uiPassword;
//module.exports.checkPass = checkPass;
module.exports.logPath = logPath;
module.exports.logFolder = logFolder;

module.exports.existsPath = existsPath;
module.exports.createdlogFolder = createdlogFolder;
module.exports.createExistsPath = createExistsPath;
module.exports.confPath = confPath;
module.exports.existsConfPath = existsConfPath;
module.exports.readlogPath = readlogPath;
module.exports.createLogPath = createLogPath;
module.exports.readlogDir = readlogDir;