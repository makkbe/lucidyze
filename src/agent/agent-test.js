#!/usr/bin/env node

// Configuration
var config = require('/etc/lucidyze/agent-config');
var c_listen_address = config.listen_address;
var c_listen_port = config.listen_port;

// Modules

var JsonSocket = require('json-socket');

JsonSocket.sendSingleMessageAndReceive(c_listen_port, c_listen_address, { command: 'register', parameters: [ { secret: 'mysecret' } ] }, function(err, message) {
    if (err) {
        //Something went wrong
        throw err;
    }
    
    console.log('Server said: '+ JSON.stringify(message));
});