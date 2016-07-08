/**
 * Module dependencies.
 */

var express = require('express'),
    path    = require('path');
require('express-resource');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  //this is the root folder for views
  app.set('views', path.join(__dirname, "app/views"));

  //this is the template engine that we are using
  app.set('view engine', 'ejs');

  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({ secret: 'your secret here' }));
  app.use(app.router);

});
app.post('/netkaleido/PutLog.ashx',function(req,res){
  console.log('####/ n e t k a l e i d o/P u t L o g . a s h x######### ')
  console.log(req.query);
  console.log(req.body);
  var Log =require('./app/models/log.js').Log;
  req.body.host_name=req.body.host;
  req.body.process_id=req.body.pid;
  req.body.user_name=req.body.username;
  Log.create(req.body,function(error, logCopy) {
    if(error){
        res.json(error);
      }else{
          res.json(logCopy);
      }
  });
  
});

app.post('/netkaleido/PutStatus.ashx',function(req,res){
   console.log('####/n e t k a l e i d o / P u t S t a t u s . a s h x######### ')
  console.log(req.query);
  console.log(req.body);
  var ComputerInfo =require('./app/models/computerinfo.js').ComputerInfo;
   ComputerInfo.saveDB(req.body,function(error, computerinfoCopy) {
        if(error){
          res.json(error);
        }else{
           res.json(computerinfoCopy);
        }
   });
  
});
app.get('/logs/download',function(req,res,next){
 if(req.query.id){
  var config=require('./config/config.js');
    var fs = require('fs');
    var db = require('./config/db.js');
    var TaskLogFile=db.TaskLogFile;
    
    TaskLogFile.all({where: {taskid:req.query.id},order:'folder ASC'},function(error, data) {
      if(data.length>0){
         var Promise = require('bluebird');
          var promise = new Promise(function(resolve ,reject){
            data.forEach(function(taskLogfile,index){
                fs.exists(config.readlogPath(taskLogfile.folder,"Task-"+req.query.id), function( exists ){
                  if(exists){
                    var content = fs.readFileSync(config.readlogPath(taskLogfile.folder,"Task-"+req.query.id),'utf-8');
                    if(index == 0){
                      fs.writeFileSync(config.logPath("Task-"+req.query.id),'');
                    }
                    fs.appendFileSync(config.logPath("Task-"+req.query.id),content);
                    if(index == data.length-1){
                      resolve();
                    }
                  }else{
                    res.end('no file!');
                  }
                });
              });
          });

          promise.then(function(){
            fs.exists(config.logPath("Task-"+req.query.id),function(exists){
              if(exists){
                var pdf=fs.createReadStream(config.logPath("Task-"+req.query.id),{ encoding: 'utf8' });
                res.writeHead(200, {
                  'Content-Type': 'application/force-download',
                  'Content-Disposition': 'attachment; filename=Task-'+req.query.id+'.txt',
                });
                pdf.pipe(res);
              }
            })
          });
      }
    });
  }else{
    res.end('no taskID!');
  }
});

var io = require('socket.io').listen(app);

// io.configure('production', function(){
//   io.disable('browser client cache');
//   io.set('browser client expires', 0);

//   io.set('transports', [
//     'websocket'
//   , 'flashsocket'
//   , 'htmlfile'
//   , 'xhr-polling'
//   , 'jsonp-polling'
//   ]);
// });

io.sockets.on('connection', function (socket) {
	require('./config/socket_router')(socket);
});

// Start the alive connection with the CGI
// var Alive = require('./app/models/alive').Alive;
// Alive.startListening(io.sockets);

// Start the task scheduler
var Task = require('./app/models/task').Task;
Task.startScheduler()

app.configure('development', function(){
  app.use(express.static(path.join(__dirname + '/public')));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.static(path.join(__dirname + '/public')));
  app.use(express.errorHandler());
});

// Config Loading
// require('./config/config.js');
// Routes Loading
require('./config/routes.js')(app);
require('./config/config').existsPath();
require('./config/config').createExistsPath();
// if it is running in IIS it will use the env.PORT
app.listen(process.env.PORT || 3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

//var rabbit = require('./app/helpers/rabbitmq_helper.js');
//rabbit.listeningCPUInfo();

require('./app/helpers/alive').startAlive(io);


