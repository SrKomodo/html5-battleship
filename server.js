/* eslint-env node */
const express = require("express");

const app = express();
app.use(express.static("public"));

const http = require("http").Server(app);
const io = require("socket.io")(http);

const fs = require("fs");
fs.readdir(__dirname, (err, files) => {
  if (err) {
    console.log(err);
    throw err;
  }
  setInterval(() => {
    console.log("test");
    require("util").inspect(files);
  }, 5000);
});

http.listen(80, () => {
  console.log("app started on port 80");
});

io.on("connection", () => {
  console.log("a user connected");
});