#!/usr/bin/env node

// Configuration
var lucidyze_dir = '../../config/';
var lucidyze_version = '0.0.1';

var config = require(lucidyze_dir + 'agent-config');

// Modules
var net = require('net'),
  JsonSocket = require('json-socket');
var os = require('os');
var dgram = require('dgram');

//console.log(JSON.stringify(os.networkInterfaces()));

var mcastsocket = dgram.createSocket('udp4');

function sendAnnouncement() {
	var message = new Buffer(JSON.stringify({ message: 'announcement', agent: os.hostname(), version: lucidyze_version, address: config.listen_address, port: config.listen_port, secret: config.secret } ));
	mcastsocket.send(message, 0, message.length, 50005, '236.2.3.6');
}

setInterval(sendAnnouncement, 5000);

var server = net.createServer();
server.listen(config.listen_port, config.listen_address);

server.on('connection', function(socket) {
  socket = new JsonSocket(socket);
  socket.on('message', function(message) {
    if (message.secret != config.secret) {
      socket.sendMessage({ 
        error: 'Invalid secret!'          
      });
    } else {
      switch (message.command) {
  	    case 'commands':
          socket.sendMessage({
            command: 'commands',
            response: [
              {
                command: 'uptime',
                parameters: 'none',
                description: 'System uptime in seconds',
                response: {
                  type: 'numeric',
                  unit: 'seconds' 
                }             
              },
              {
                command: 'loadavg',
                parameters: 'none',
                description: 'System load average',
                response: {
                  type: '[numeric]',
                  unit: 'none'
                }
              },
              {
                command: 'totalmem',
                parameters: 'none',
                description: 'Total system memory in bytes',
                response: {
                  type: 'numeric',
                  unit: 'bytes'
                }
              },
              {
                command: 'freemem',
                parameters: 'none',
                description: 'Free system memory in bytes',
                response: {
                  type: 'numeric',
                  unit: 'bytes'
                }
              },
              {
                command: 'hostname',
                parameters: 'none',
                description: 'System hostname',
                response: {
                  type: 'string',
                  unit: 'none'
                }
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
            error: 'Unknown command!'          
          });   
          break;
      }
    }
  });
});