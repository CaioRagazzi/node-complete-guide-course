const http = require("http");

let users = [{ name: "Caio" }, { name: "Aline" }];

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/" && method == "GET") {
    res.write("<html>");
    res.write("<head><title>Hello PAge</title></head>");
    res.write("<body><h1>Hello Friend</h1></body>");
    res.write(
      '<body><form action="/create-user" method="POST"><input type="text" name="user"></input><button>Send</button></form></body>'
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/users" && method == "GET") {
    res.write("<html>");
    res.write("<head><title>Users PAge</title></head>");
    users.forEach((user) => {
      res.write(`<body><ul><li>${user.name}</li></ul></body>`);
    });
    res.write("</html>");
    return res.end();
  }

  if (url === "/create-user" && method == "POST") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];
      users.push({ name: message });
    });

    res.statusCode = 302;
    res.setHeader("Location", "/");
    res.end();
  }
});

server.listen(3000);
