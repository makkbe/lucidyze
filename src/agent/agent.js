#!/usr/bin/env node

// Configuration
var config = require('/etc/lucidyze/agent-config');
var c_listen_address = config.listen_address;
var c_listen_port = config.listen_port;

// Modules
var net = require('net'),
  JsonSocket = require('json-socket');
var os = require('os');

var server = net.createServer();
server.listen(config.listen_port, config.listen_address);

server.on('connection', function(socket) {
  socket = new JsonSocket(socket);
  socket.on('message', function(message) {
    switch (message.command) {
	    case 'commands':
	    	socket.sendMessage({
		    	command: 'commands',
		    	response: [
			    	{
				    	command: 'uptime',
				    	parameters: 'none',
							description: 'System uptime in seconds',
							value: 'numeric',
							unit: 'seconds'
			    	},
			    	{
				    	command: 'loadavg',
				    	parameters: 'none',
							description: 'System load average',
							value: '[numeric]',
							unit: ''
			    	},
			    	{
				    	command: 'totalmem',
				    	parameters: 'none',
							description: 'Total system memory in bytes',
							value: 'numeric',
							unit: 'bytes'
			    	},
			    	{
				    	command: 'freemem',
				    	parameters: 'none',
							description: 'Free system memory in bytes',
							value: 'numeric',
							unit: 'bytes'
			    	},
			    	{
				    	command: 'hostname',
				    	parameters: 'none',
							description: 'System hostname',
							value: 'string',
							unit: ''
			    	}
		    	]
	    	});
				break;
      case 'uptime':
        var uptime = os.uptime();
        socket.sendMessage({ 
          command: 'uptime',
          response: { 
            value: uptime
          }
        });
        break;
      case 'loadavg':
      	var load = os.loadavg();
        socket.sendMessage({ 
          command: 'loadavg',
          response: { 
            value: load
          }
        });      	
        break;
      case 'totalmem':
     		var mem = os.totalmem();
     		socket.sendMessage({ 
          command: 'totalmem',
          response: { 
            value: mem
          }
        });      	
        break;
      case 'freemem':
     		var mem = os.freemem();
     		socket.sendMessage({ 
          command: 'freemem',
          response: { 
            value: mem
          }
        });      	
        break;
      case 'hostname':
     		var name = os.hostname();
     		socket.sendMessage({ 
          command: 'hostname',
          response: { 
            value: name
          }
        });      	
        break;        
      default:
      	socket.sendMessage({ 
          command: 'unknown',
          response: { 
            error: "Error: unknown command!"
          }
        });   
        break;
    }
  });
});