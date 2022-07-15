const http = require("http");
const topEarners = require("./src/routes/top-earner.route");
const hostname = "localhost";
const port = 3000;

const app = http.createServer((req, res) => {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS, POST, GET",
    "Access-Control-Max-Age": 2592000,
    "Content-Type": "text/html",
  };
  res.writeHead(200, headers);
  if (req.url === "/top-earner") {
    topEarners(req, res, headers);
  } else {
    res.end("Try again with /top-earner");
  }
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
