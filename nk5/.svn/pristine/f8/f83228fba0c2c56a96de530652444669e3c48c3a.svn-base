var config = require('../../config/config.js');
var cron = require('cron');
var fs = require('fs'); 

VariousSetting = {};

 // wangxin add start 20160420
VariousSetting.writeFile=function(data){
	var datastring = "";
	for(var i in data){
		datastring = datastring + i + '=' + data[i] + '\r\n'
	};
	fs.writeFile(config.confPath(),datastring,function(err){
		if(err){
			throw err;
		}
	})
}
// wangxin add end 20160420
VariousSetting.readFile=function(){
    var content = fs.readFileSync(config.confPath(),'utf-8');
    var regexjing = /\s*(#+)/;   //#start
	var regexkong = /\s*=\s*/;   
	var keyvalue = {};
	var arr_case = null;
	var regexline = /.+/g;
	while(arr_case=regexline.exec(content)) { //检索content是否包含#符号
		if (!regexjing.test(arr_case))        //只要不包含#，赋值对象
			keyvalue[arr_case.toString().split(regexkong)[0]] = arr_case.toString().split(regexkong)[1];
	}
	console.log('keyvalue',keyvalue);
	return keyvalue;
}
 
module.exports.VariousSetting = VariousSetting;