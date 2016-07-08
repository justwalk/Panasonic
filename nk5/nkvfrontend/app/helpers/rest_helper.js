var http = require('http');
var client = require('request');
var Iconv  = require('iconv').Iconv;

//var toutf = new Iconv('SHIFT-JIS', 'UTF-8//TRANSLIT//IGNORE');
var toutf = new Iconv('CP932', 'UTF-8//TRANSLIT//IGNORE');
var toshift = new Iconv('UTF-8', 'CP932//TRANSLIT//IGNORE');

/**
 * getJSON:  REST get request returning JSON object(s)
 * @param options: http options object
 * @param callback: callback to pass the results JSON object(s) back
 */
function getJSON(url, callback){
    client.get(url, {encoding: null}, function(err, resp, body){
		body = toutf.convert(body).toString()

		console.log('url:', url)
		//console.log('data:', data)
		console.log('err:', err)
		console.log('body:', body)
		console.log('status:', resp.statusCode)

		if(err) {
			console.log('Error:', err);
			callback(err);
			return;
		}

		if(body) {
			var parsed = JSON.parse(body.replace(/\\/g, '\\'));
			if(typeof parsed === 'object' && parsed.error) {
				console.log('Error from CGI:', parsed.error);
				callback(parsed);
				return;
			}
		}

		if(resp.statusCode!=200) {
			console.log('Error:', err);
			callback(body);
			return;
		}

		callback(err, null, parsed);
    });

};


var querify = function(data) {
	var buffers = [];
	for(key in data)
		if(data[key] !== undefined)
			buffers.push(toshift.convert( key + '=' + data[key] + '&'));

	return buffers.length ? Buffer.concat(buffers) : new Buffer(10);
}

function postData(url, data, callback){

  var reqbody = querify(data);

  var params = {body:reqbody};
	client.post(url, params, function(err, resp, body){
		console.log('url:', url);
		console.log('data:', data);
		console.log('err:', err);
		console.log('body:', body);
		console.log('status:', resp.statusCode);

		if(err) {
			console.log('Error:', err);
			err = {error: err};
			callback(err);
			return;
		}
		if(body) {
			var parsed = JSON.parse(body.replace(/\\/g, '\\\\'));
			if(typeof parsed === 'object' && parsed.error) {
				console.log('Error from CGI:', parsed.error);
				callback(parsed);
				return;
			}
			if(resp.statusCode!=200) {
				console.log('Error:', err);
				callback(body);
				return;
			}

			callback(err, null, parsed);
		}
	});
}
function postAlive(url, data, callback){

  var reqbody = querify(data);

  var params = {body:reqbody};
	client.post(url, params, function(err, resp, body){
		console.log('url:', url);
		console.log('data:', data);
		console.log('err:', err);
		console.log('body:', body);
		console.log('status:', resp.statusCode);

		if(err) {
			console.log('Error:', err);
			err = {error: err};
			callback(err);
			return;
		}
		if(body) {
			try{
				var parsed = JSON.parse(body.replace(/\\/g, '\\\\'));
			}catch(e) {
				callback({error:'500 Internal Server Error'}, null, null);
				return;
			}
			
			if(typeof parsed === 'object' && parsed.error) {
				console.log('Error from CGI:', parsed.error);
				callback(parsed);
				return;
			}
			if(resp.statusCode!=200) {
				console.log('Error:', err);
				callback(body);
				return;
			}

			callback(err, null, parsed);
		}
	});
}

function getToolJSON(url, callback){
    client.get(url, {encoding: null}, function(err, resp, body){
		body = toutf.convert(body).toString()

		console.log('url:', url)
		//console.log('data:', data)
		console.log('err:', err)
		console.log('body:', body)
		console.log('status:', resp.statusCode)

		if(err) {
			console.log('Error:', err);
			callback(err);
			return;
		}

		if(body) {
			try{
				var parsed = JSON.parse(body.replace(/\\/g, '\\\\'));
			}catch(e) {
				callback({error:'500 Internal Server Error'}, null, null);
				return;
			}
			if(typeof parsed === 'object' && parsed.error) {
				console.log('Error from CGI:', parsed.error);
				callback(parsed);
				return;
			}
		}

		if(resp.statusCode!=200) {
			console.log('Error:', err);
			callback(body);
			return;
		}

		callback(err, null, parsed);
    });

};

module.exports.getJSON = getJSON;
module.exports.postData = postData;
module.exports.postAlive = postAlive;
module.exports.getToolJSON = getToolJSON;
