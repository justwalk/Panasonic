var Task = require('../models/task').Task;


exports.index = function(req, res){
	Task.all({}, function(err, tasks){
    res.send(tasks);
	});
};

exports.show = function(req, res){
  console.log(req.params.log);
  Task.find(req.params.log, function(err, task){
    res.send('<h1>Status</h1><br/>'+task.last_run_log);
  });
};