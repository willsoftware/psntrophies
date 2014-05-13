#!/bin/env node

var gumerPSN = require('gumer-psn'); // Gumer Playstation module
var express = require('express'); // Express
var app = express(); // Express application instance
var idregex = /[A-Za-z0-9].{2,15}/; // A simple regex for PSN id's // TODO: Make it more accurate and fancy

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

gumerPSN.init({		// Our PSN Module, we have to start it once. - irkinsander
	debug:		true				// Let's set it true, it's still in early development. So, report everything that goes wrong please.
	,email:		"willsoftware@outlook.com"		// A valid PSN/SCE account (can be new one) // TODO: Using the user's credentials to do this.
	,password:	"#PSNTrophies"		// Account's password, du'h
	,npLanguage:	"en"			// The language the trophy's name and description will shown as
	,region: 		"us"			// The server region that will push data
});

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
	gumerPSN.getProfile(req.params.id, function(error, profileData) {
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
	})
	//res.writeHead(200, {'Content-Type': 'text/plain'});
  	//res.end("getProfile OK\n");
})
// Gets the ID owner's trophy (first 100) information and returns the JSON object.
app.get('/PSN/:id/trophies', function(req, res){ 
	gumerPSN.getTrophies(req.params.id, "m", 0, 100, function(error, trophyData) {
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
	})
	//res.writeHead(200, {'Content-Type': 'text/plain'});
  	//res.end("getTrophies OK\n");
})
// Gets the ID owner's trophies for the given game title including all DLC's
app.get('/PSN/:id/trophies/:npCommID', function(req, res){ 
	gumerPSN.getGameTrophies(req.params.id, req.params.npCommID, '', function(error, trophyData) {
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
	})
	//res.writeHead(200, {'Content-Type': 'text/plain'});
  	//res.end("getGameTrophies OK\n");
})
// Gets the ID owner's trophies for the given game title including all DLC's
app.get('/PSN/:id/trophies/:npCommID/groups', function(req, res){ 
	gumerPSN.getGameTrophyGroups(req.params.id, req.params.npCommID, function(error, trophyData) {
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
	})
	//res.writeHead(200, {'Content-Type': 'text/plain'});
  	//res.end("getGameTrophyGroups OK\n");
})
// Gets the ID owner's trophies for the given game title for the given group (DLC)
app.get('/PSN/:id/trophies/:npCommID/groups/:groupID', function(req, res){ 
	gumerPSN.getGameTrophies(req.params.id, req.params.npCommID, req.params.groupID, function(error, trophyData) {
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
	})
	//res.writeHead(200, {'Content-Type': 'text/plain'});
  	//res.end("getGameTrophies OK\n");
})
// Gets the info for the given DLC or game's default trophy
app.get('/PSN/:id/trophies/:npCommID/:trophyID', function(req, res){ 
	gumerPSN.getTrophy(req.params.id, req.params.npCommID, '', req.params.trophyID, function(error, trophyData) {
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
	})
	//res.writeHead(200, {'Content-Type': 'text/plain'});
  	//res.end("getTrophy OK\n");
})
// We listen in the port 3000
app.listen(port, ipaddr); 
