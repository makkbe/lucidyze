var JsonSocket = require('json-socket');

var Agent = function Agent(options) {
	this.agentname = options.agent
  this.agentsecret = options.secret;
	this.agentversion = options.version;
	this.agentip = options.address;
	this.agentport = options.port;
}

Agent.prototype.getCommands = function getCommands() {
  JsonSocket.sendSingleMessageAndReceive(this.agentport, this.agentip, {
    secret: this.agentsecret,
    command: 'commands' }, function(err, message) {
      console.log('Agent said: '+ JSON.stringify(message));
    }
  );
}

module.exports = Agent;