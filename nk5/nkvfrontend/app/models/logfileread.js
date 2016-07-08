var config = require('../../config/config.js');

var fs = require('fs'); 

var Iconv  = require('iconv').Iconv;

var toutf = new Iconv('CP932', 'UTF-8//TRANSLIT//IGNORE');

var byline = require('byline');

var logFile = {};

/*logFile.readStream=function(callback){
    fs.readFile(config.executeLogPath('executeLog'),'utf-8',function(err,data){
        if(err){
            callback(err,null)
        }
        else{
            var arr = data.trim().split('\n');
            arr.forEach(function(item,index){arr[index] = JSON.parse(item)});
            arr.sort(function(a,b){ return ((new Date(b.executeTime))-(new Date(a.executeTime)))});
            callback(null,arr);
        }
    });	  
}
*/
logFile.readLogFile = function(res){
    fs.stat(config.logPath('executeLog'),function(err,stats){
        if(err){
            res(null);
        }else{
            var stream = fs.createReadStream(config.logPath('executeLog'), {encoding:'utf8'});
            stream = byline.createStream(stream);
            var  arr = [];
            stream
            .on('data',function(streamLineData){
                var line;
                try{
                    line = toutf.convert(streamLineData).toString();
                    var lineObj = JSON.parse(line);
                    arr.push(lineObj);
                }catch(err){
                    res(null);
                }
            })
            .on('end',function(){
                arr.sort(function(a,b){
                    return ((new Date(b.executeTime))-(new Date(a.executeTime)));
                });
                res(null,arr);
            });
        }
    });
};
 
module.exports.logFile = logFile;