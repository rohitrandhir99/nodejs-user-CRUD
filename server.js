// creating a server
// giving port number 4000
// running the server at localhost
const server = require('./app');

// port: 4000
const port = 4000;

server.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
