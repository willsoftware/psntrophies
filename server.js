#!/bin/env node
//  OpenShift sample Node application
var http = require('http');

//Get the environment variables we need.
var ipaddr  = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port    = process.env.OPENSHIFT_NODEJS_PORT || 8080;

var 
	 gumerPSN 	= require('./psn')		// Gumer Playstation module
	,express 	= require('express')	// Express
	,app 		= express()				// Express application instance
	,idregex 	= /[A-Za-z0-9].{2,15}/ 	// A simple regex for PSN id's // TODO: Make it more accurate and fancy
;

console.log('Starting gPSN');

gumerPSN.init({		// Our PSN Module, we have to start it once. - irkinsander
	debug:		true				// Let's set it true, it's still in early development. So, report everything that goes wrong please.
	,email:		"willsoftware@outlook.com"		// A valid PSN/SCE account (can be new one) // TODO: Using the user's credentials to do this.
	,password:	"#PSNTrophies"		// Account's password, du'h
	,npLanguage:	"en"			// The language the trophy's name and description will shown as
	,region: 		"us"			// The server region that will push data
});

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
