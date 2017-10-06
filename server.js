/* eslint-env node */
const express = require("express");

const app = express();
app.use(express.static("public"));

const http = require("http").Server(app);
const io = require("socket.io")(http);

const fs = require("fs");
const path = require("path");
setInterval(() => {
  console.log(fs.readdir(__dirname));
  console.log(fs.readdir(path.join(__dirname, "public")));
}, 5000);

http.listen(80, () => {
  console.log("app started on port 80");
});

io.on("connection", () => {
  console.log("a user connected");
});