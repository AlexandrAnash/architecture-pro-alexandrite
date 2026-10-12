const http = require('http');

const PORT = 8080;

const server = http.createServer((req, res) => {
  console.log('service-b got traceparent:', req.headers['traceparent']);
  res.end('Hello from service-b\n');
});

server.listen(PORT, () => console.log(`service-b listening on ${PORT}`));