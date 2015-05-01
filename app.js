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