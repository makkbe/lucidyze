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
server.listen(c_listen_port, c_listen_address);

server.on('connection', function(socket) {
  socket = new JsonSocket(socket);
  socket.on('message', function(message) {
    switch (message.command) {
      case 'uptime':
        var uptime = os.uptime();
        socket.sendMessage({ 
          command: 'uptime',
          secret: config.secret,
          response: { 
            value: uptime,
            unit: 'seconds'
          }
        });
        break;
      case 'load':
        break;
      default:
        break;
    }
  });
});