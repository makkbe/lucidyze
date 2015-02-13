#!/usr/bin/env node

var Agent = require('./agent');
var mcastserver = require('dgram').createSocket('udp4');
 
mcastserver.on('listening', function() {
  mcastserver.setBroadcast(true);
  mcastserver.addMembership('236.2.3.6');
});

mcastserver.on('message', function(message, rinfo) {
  var jsonmessage = JSON.parse(message);
  
  if (jsonmessage.message === 'announcement') {
	  var agent = new Agent(jsonmessage);
	  agent.getCommands();
/*
	  var agentname = jsonmessage.agent
    var agentsecret = jsonmessage.secret;
    var agentversion = jsonmessage.version;
    var agentip = jsonmessage.address;
    var agentport = jsonmessage.port;
    
    console.log("Agent " + agentname + " at " + agentip + ":" + agentport + " running v" + agentversion + " has announced itself with secret " + agentsecret);
    
    getCommands(agentip, agentport, agentsecret);
*/
  }
});
 
mcastserver.bind(50005);

