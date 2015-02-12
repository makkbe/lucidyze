#!/usr/bin/env node

var mcastserver = require('dgram').createSocket('udp4');
var JsonSocket = require('json-socket');
 
mcastserver.on('listening', function() {
  mcastserver.setBroadcast(true);
  mcastserver.addMembership('236.2.3.6');
});

mcastserver.on('message', function(message, rinfo) {
  var jsonmessage = JSON.parse(message);
  
  if (jsonmessage.lucidyze == 'agent') {
    var agentsecret = jsonmessage.secret;
    var agentversion = jsonmessage.version;
    var agentip = rinfo.address;
    var agentport = jsonmessage.port;
    
    console.log("Agent at " + agentip + ":" + agentport + " running v" + agentversion + " has announced itself with secret " + agentsecret);
    
    getCommands(agentip, agentport, agentsecret);
  }
});
 
mcastserver.bind(50005);

function getCommands(agentip, agentport, agentsecret) {
  JsonSocket.sendSingleMessageAndReceive(agentport, agentip, {
    secret: agentsecret,
    command: 'commands' }, function(err, message) {
      console.log('Agent said: '+ JSON.stringify(message));
    }
  );
}