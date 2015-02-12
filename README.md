# lucidyze
A Node.js based server monitoring system built with simplicity in mind. Lucidyze is in pre Alpha stage of development.

Lucidyze aims to provide a simple yet powerful way of keeping track of your servers' health with minimal setup and configuration.

## Design
Lucidyze consists of two parts, called Agents and Handlers.

Agents are lightweight daemons running on servers (or other devices) that you wish to monitor. Agents announce their presence and capabilities to the Handler.

The Handler is the main application, responsible of registering Agents and monitoring their health based on the capabilities they support. The Handler will provide a simplistic web UI for viewing and managing Agents and their health.



