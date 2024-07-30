function handleError(err, req, res) {
    console.error(err);
    res.writeHead(500, { 'Content-Type': 'text/html' });
    res.end('<h1>500 - Internal Server Error</h1><p>Sorry, something went wrong on our end.</p>');
  }
  
  module.exports = { handleError };