var config = {};

// Port to listen on for incoming handler requests (1024-49151)
// Default: 16001
config.listen_port = 16001;

// Network address to listen on.
// Default: 127.0.0.1 
config.listen_address = "127.0.0.1";

// Agent secret. Handler must know this.
config.secret = "CHANGEME";

// Log level to use.
// 0 = Errors
// 1 = Warnings
// 2 = Information
// 3 = Debug
// 4 = Verbose Debug
// Default: 0
config.log_level = 0;

// Absolute path to log file 
// Default: /var/log/lucidyze/agent.log
config.log_file = "/var/log/lucidyze/agent.log";

module.exports = config;
