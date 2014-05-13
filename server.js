#!/bin/env node
//  OpenShift sample Node application
var http = require('http');
var express = require('express'); // Express
var app = express(); // Express application instance
var idregex = /[A-Za-z0-9].{2,15}/; // A simple regex for PSN id's // TODO: Make it more accurate and fancy

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

http.createServer(function (req, res) {
	var addr = "unknown";
	var out = "";
	if (req.headers.hasOwnProperty('x-forwarded-for')) {
		addr = req.headers['x-forwarded-for'];
	} else if (req.headers.hasOwnProperty('remote-addr')){
		addr = req.headers['remote-addr'];
	}

	if (req.headers.hasOwnProperty('accept')) {
		if (req.headers['accept'].toLowerCase() == "application/json") {
			  res.writeHead(200, {'Content-Type': 'application/json'});
			  res.end(JSON.stringify({'ip': addr}, null, 4) + "\n");			
			  return ;
		}
	}

  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write("Welcome to Node.js on OpenShift!\n\n");
  res.end("Your IP address seems to be " + addr + "\n");
}).listen(port, ipaddr);
console.log("Server running at http://" + ipaddr + ":" + port + "/");

// Taken from Express site, this takes /{{id}}/ parameter
app.param(function(name, fn){	
	if (fn instanceof RegExp) {
		return function(req, res, next, val){
			var captures;
			if (captures = fn.exec(String(val))) {
				req.params[name] = captures;
				next();
			} 
			else {
				next('route');
			}
		}
	}
});

// Gets the ID owner's profile information and returns the JSON object.
app.get('/PSN/:id', function(req, res){ 
	/*gumerPSN.getProfile(req.params.id, function(error, profileData) {
		if (!error) {
			res.send(profileData)
		}
		else {
			if (profileData.error.code == 2105356) {	// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: profileData
				})
			}
		}
	})*/
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end("getProfile OK\n");
})
// Gets the ID owner's trophy (first 100) information and returns the JSON object.
app.get('/PSN/:id/trophies', function(req, res){ 
	/*gumerPSN.getTrophies(req.params.id, "m", 0, 100, function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	})*/
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end("getTrophies OK\n");
})
// Gets the ID owner's trophies for the given game title including all DLC's
app.get('/PSN/:id/trophies/:npCommID', function(req, res){ 
	/*gumerPSN.getGameTrophies(req.params.id, req.params.npCommID, '', function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	})*/
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end("getGameTrophies OK\n");
})
// Gets the ID owner's trophies for the given game title including all DLC's
app.get('/PSN/:id/trophies/:npCommID/groups', function(req, res){ 
	/*gumerPSN.getGameTrophyGroups(req.params.id, req.params.npCommID, function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	})*/
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end("getGameTrophyGroups OK\n");
})
// Gets the ID owner's trophies for the given game title for the given group (DLC)
app.get('/PSN/:id/trophies/:npCommID/groups/:groupID', function(req, res){ 
	/*gumerPSN.getGameTrophies(req.params.id, req.params.npCommID, req.params.groupID, function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	})*/
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end("getGameTrophies OK\n");
})
// Gets the info for the given DLC or game's default trophy
app.get('/PSN/:id/trophies/:npCommID/:trophyID', function(req, res){ 
	/*gumerPSN.getTrophy(req.params.id, req.params.npCommID, '', req.params.trophyID, function(error, trophyData) {
		if (!error) {
			res.send(trophyData)
		}
		else {
			if (trophyData.error.code == 2105356) {		// User not found code
				res.send({
					error: true, message: "PSN ID not found"
				})
			}
			else {
				res.send({
					error: true, message: "Something went terribly wrong, submit an issue on GitHub please!", response: trophyData
				})
			}
		}
	})*/
	res.writeHead(200, {'Content-Type': 'text/plain'});
  	res.end("getTrophy OK\n");
})
// We listen in the port 3000
app.listen(port, ipaddr); 
