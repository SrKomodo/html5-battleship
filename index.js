/* eslint-env node */
const express = require("express");

const app = express();
app.use(express.static("public"));

const http = require("http").Server(app);
const io = require("socket.io")(http);

http.listen(80, () => {
  console.log("app started on port 80");
});

io.on("connection", () => {
  console.log("a user connected");
});