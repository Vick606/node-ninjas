const http = require('http');
const fs = require('fs');
const path = require('path');
const { log } = require('./logger');
const { handleError } = require('./errorHandler');

const getNodeVersion = () => {
  return { version: process.version };
};

const server = http.createServer((req, res) => {
  try {
    log(`${req.method} ${req.url}`);

    if (req.url === '/api/version') {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(getNodeVersion()));
      return;
    }

    let filePath = '.' + req.url;
    if (filePath === './') {
      filePath = './index.html';
    } else if (filePath === './about') {
      filePath = './about.html';
    } else if (filePath === './contact-me') {
      filePath = './contact-me.html';
    }

    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = {
      '.html': 'text/html',
      '.css': 'text/css',
      '.js': 'text/javascript',
    }[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        if (error.code === 'ENOENT') {
          fs.readFile('./404.html', (error, content) => {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(content, 'utf-8');
          });
        } else {
          throw error;
        }
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
      }
    });
  } catch (err) {
    handleError(err, req, res);
  }
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});