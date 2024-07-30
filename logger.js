const fs = require('fs');

function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `${timestamp} - ${message}\n`;
  
  fs.appendFile('server.log', logMessage, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
}

module.exports = { log };