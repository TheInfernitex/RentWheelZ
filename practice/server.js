const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('./client.html', (err, data) => {
      if (err) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/get-file') {
    let body = '';
    
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      const fileName = JSON.parse(body).fileName;
      const filePath = path.join(__dirname, fileName);

      try {
        const fileData = fs.readFileSync(filePath);
        res.writeHead(200, { 'Content-Type': 'application/octet-stream' });
        res.end(fileData);
      } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('File not found');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3002, () => {
  console.log('Server listening on port 3002');
});

