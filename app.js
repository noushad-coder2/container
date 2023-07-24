const fs = require('fs');
const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', chunk => {
      data += chunk;
    });

    req.on('end', () => {
      const name = JSON.parse(data).name;
      const time = new Date().toISOString();

      const entry = `${time}: ${name}\n`;

      fs.appendFile('names.txt', entry, err => {
        if (err) {
          console.error('Error writing to file:', err);
        }
      });

      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('Data saved successfully!\n');
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method not allowed!\n');
  }
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
