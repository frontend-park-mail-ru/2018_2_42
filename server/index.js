const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const filePath = req.url === '/' ? 'public/index.html' : `public/${req.url}`;

  fs.readFile(filePath, (err, file) => {
    if (err) {
      res.statusCode = 404;
      res.write('404');
      res.end();
      return;
    }

    res.write(file);
    res.end();
  });
});

server.listen(8081);