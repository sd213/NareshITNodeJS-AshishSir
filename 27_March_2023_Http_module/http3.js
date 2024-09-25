const http = require("http");
const fs = require("fs");

// Create an HTTP server
const server = http.createServer((req, res) => {
  if (req.url === "/api/countries" && req.method === "GET") {
    fs.readFile("countries.json", "utf8", (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.end("Internal Server Error");
      } else {
        res.setHeader("Content-Type", "application/json");
        res.end(data);
      }
    });
  } else {
    res.statusCode = 404;
    res.end("Not Found");
  }
});

// Specify the port and hostname
const hostname = "127.0.0.1";
const port = 3000;

// Start the server
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
