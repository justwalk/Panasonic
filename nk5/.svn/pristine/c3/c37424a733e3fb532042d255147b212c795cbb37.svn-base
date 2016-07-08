var config = require('../../config/config');
var rest   = require('../helpers/rest_helper');
//var ComputerInfo = require('../models/computerinfo').ComputerInfo;

var request = require('request');
var byline = require('byline');
var Iconv  = require('iconv').Iconv;

var toutf = new Iconv('CP932', 'UTF-8//TRANSLIT//IGNORE');

var alive = config.restHost() + '/alive';

function throttle(fn, threshhold, scope) {
  threshhold = threshhold || (threshhold = 250);
  var last,
      deferTimer;
  return function () {
    var context = scope || this;

    var now = +(new Date()),
        args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(function () {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;
      fn.apply(context, args);
    }
  };
}

var toolsComputer = function(id) {
	return config.restHost() + '/computers/' + id + '/tools';
};

var runningClients = {};
var runningClientTools = {};
var clientToolsDebounce = {};

function clientToolsStarted(id) {
	console.log('Client tools for ' + id + ' came online');

	if(!runningClients[id]) {
		console.log('But computer is not online');
		return;
	}

	runningClientTools[id] = (new Date()).getTime();
}

function startAlive(io) { 
	var req = request(alive);
	var stream = byline(req);
	var restart = false;
	var lastUpdate = (new Date()).getTime();

	stream.on('data', function(data) {
		var line;
		try {
			line = toutf.convert(data).toString();
			var event = JSON.parse(line)

			io.sockets.emit('osv-event', event);
			
			if(event.Type === 'ComputerAlive') {
				if(runningClients[event.ID]) {
					// nothing to do
				} else {
					//console.log("event####################################");
					//console.log(event);
					console.log('Client ' + event.ID + ' came online');
					var timer = setInterval(function() {
						var now = (new Date()).getTime();
						if(now > runningClients[event.ID] + 30000) {
							console.log('Client ' + event.ID + ' sent offline');

							clearInterval(timer);
							delete runningClients[event.ID];
							delete runningClientTools[event.ID];
							delete clientToolsDebounce[event.ID];
						}
					}, 1000);
				}

				runningClients[event.ID] = (new Date()).getTime();

				if(runningClientTools[event.ID]) {
					delete clientToolsDebounce[event.ID];
				} else {
					if(clientToolsDebounce[event.ID]) {
						// nothing to do
					} else {
						clientToolsDebounce[event.ID] = throttle(function () {
							console.log('Start client tools on ' + event.ID);
							rest.getToolJSON(toolsComputer(event.ID), function(err, resp, js) {
								if(err)
									console.log("Failed to start client tools");
							});
						}, 10000);
					}

					//console.log('throttle alive ' + event.ID);
					clientToolsDebounce[event.ID]();
				}
				var nowTime = (new Date()).getTime(); 
				if(nowTime > lastUpdate+20000){
					require('../models/computerinfo').ComputerInfo.saveAlive(event,function(error,data){
						if(data){
							console.log('alive',error)
						}else{
							console.log('alive',data)
						}
					})
					lastUpdate = nowTime;
				}
			}

			console.info(event.Type, event.ID);
		}
		catch(err) {
			console.error(err, line);
			req.emit('error', 'invalid JSON');
		}
	});

	stream.on('error', function(err) {
		console.error(err);
		if(!restart) startAlive(io);
		restart = true;
	});

	req.on('error', function(err) {
		console.error(err);
		if(!restart) startAlive(io);
		restart = true;
	});
}

exports.startAlive = startAlive;
exports.clientToolsStarted = clientToolsStarted;