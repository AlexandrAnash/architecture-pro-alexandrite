const http = require('http');

const PORT = 8080;
const SERVICE_B_URL = process.env.SERVICE_B_URL || 'http://service-b:8080';

function callServiceB() {
  return new Promise((resolve, reject) => {
    http
      .get(SERVICE_B_URL, (response) => {
        let body = '';
        response.on('data', (chunk) => { body += chunk; });
        response.on('end', () => resolve(body));
      })
      .on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  try {
    const answerFromB = await callServiceB();
    res.end(`service-a -> ${answerFromB}`);
  } catch (error) {
    res.statusCode = 502;
    res.end(`service-b unavailable: ${error.message}\n`);
  }
});

server.listen(PORT, () => console.log(`service-a listening on ${PORT}`));