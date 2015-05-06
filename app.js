/*jslint node: true */
"use strict";

/**
 * Module dependencies.
 */
var bodyParser = require('body-parser');
var accessLogStream;
var express = require('express'),
	path = require('path'),
	fs = require('fs'),
	//favicon = require('serve-favicon'),
	morgan = require('morgan'),
	http = require('http');

var app = express();

var session = function(request, response, next) {
	//useful place for adding stuff to the session.
	next();
};

	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());

	var methodOverride = require('method-override');
	app.use(express.static(path.join(__dirname, 'public')));


app.get('/', session, function(request, response) {
	response.sendFile(__dirname+'/index.html');
});

app.get('/simple', session, function(request, response) {
	response.sendFile(__dirname+'/public/simple/index.html');
});

app.get('/animated', session, function(request, response) {
	response.sendFile(__dirname+'/public/animated/animated.html');
});

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});



app.post('/tweetSearch', function(req,res){
	var searchString = req.body.search;
	console.log(searchString);
	search(searchString, function(results){
		console.log(results);	
		res.send(results);
	});
	
	
});
//Twitter search
		var search = function(searchString, callback) {

			var twitter = require('twitter');

			var client = new twitter({
				consumer_key: "7mxhEcnEpHbCEZL2fUoJ8cld3",
				consumer_secret: "APnoPquFx4YjIZR32vpfrydiGi05IBlpqc3cB132rv2oes9WO0",
				access_token_key: "861737564-7RydBknodZez0OBL9GwcmzFVsZLZWbS9Aywf1goe",
				access_token_secret: "vfVJfAVfn2yEyl418n9SlSl22YniuywNrtzwzgMSah4l0"
			});
			
			client.get('search/tweets', {q: encodeURIComponent(searchString)}, function(error, tweets, response){
			  if(error) throw error;
			  //console.log(tweets);  // The favorites. 
			  //console.log(response);  // Raw response object. 
				
				callback(tweets);
			}); 
		};