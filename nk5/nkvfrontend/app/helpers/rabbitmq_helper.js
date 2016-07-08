var amqp = require('amqp');

var connection = amqp.createConnection({url: 'amqp://192.168.1.163'}, {defaultExchangeName: 'topic_logs'});

function listeningCPUInfo(){
	connection.on('ready', function(){
	    var exchange = connection.exchange('topic_logs', {type: 'topic', contentType:'application/octet-stream'},function(ex) {
	        console.log('exchange created:', ex.name);
	        var queue = connection.queue('nodejs_queue', {durable: true, contentType:'application/octet-stream'}, function (q) {
	            console.log('queue created:', q.name);
	            queue.bind('topic_logs', 'db.update.cpuinfo');
	            queue.subscribe({ack: true}, function(message, headers, deliveryInfo){
				console.log('Got a message with routing key ' + deliveryInfo.routingKey);
	                console.log(JSON.parse(message.data));
	                queue.shift();
	            });
	        });
	    });
	});
}

module.exports.listeningCPUInfo = listeningCPUInfo;
