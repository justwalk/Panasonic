var config = require('../../config/config.js');
var aliveUrl = config.restHost()+'/alive';
var http = require('http');
var Computer = require('../models/computer').Computer;


Alive = {};

var options = {
  host: '192.168.1.163',
  path: '/cgi-bin/cgi.exe/alive',
  port: 8080
};

// var clarinet = require('clarinet');
// var parseStream = clarinet.createStream();

Alive.startListening = function(sockets) {
  var received = '';
  console.log('Alive started listening');

  http.get(options, function(resp) {
    resp.on('data', function(data) {
      received +=data;
      var chunk = received.split('\n');
      if (chunk.length>1) {
        var event = JSON.parse(chunk[0].toString('utf-8'));
        Alive.sendEvent(event, sockets);
        received = chunk[1];
      }
      // try{
      // }catch(err){
      //   // console.log('miss, need more data', err)
      // }
    });
  }).on('error', function(error) {
    console.log('Alive Connection has an error:', error);
    console.log('Reconnecting...');
    Alive.startListening(sockets);
  });
};

Alive.sendEvent = function(event, sockets) {
  if (event.Type != 'HEARTBEAT') {
    console.log('alive event', event);
  }
  if (event.Contents.Computer || event.Contents.Information) {
    var computerid = event.Contents.Computer || event.Contents.Information.Computer;
    if (computerid) {
      console.log('OnlineOffline event triggered.');
      Computer.find(computerid, function(err, computer) {
        sockets.emit('computers:update', computer);
      });
    }
  }
};

// parseStream.on('data',function(data) {
//   console.log('json stream', data)
// })

module.exports.Alive = Alive;