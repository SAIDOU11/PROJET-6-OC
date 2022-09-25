const http = require("http");
const app = require("./app");
const PORT = 3000;

app.set(PORT);

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
