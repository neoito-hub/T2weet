var express = require("express");
var Twit = require("twit");
var config = require("./config");
var socketIo = require("socket.io");
var http = require("http");
var bodyParser = require("body-parser");
var cors = require("cors");
var track = ["firebase", "javascript", "java"];
var app = express();
var twit = new Twit(config.twitter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.post("/search", function (req, res) {
  stream.stop();
  stream = twit.stream("statuses/filter", {
    track: req.body.Query,
    language: "en",
  });
  stream.on("tweet", function (tweet) {
    io.emit("tweet", tweet);
  });
  res.send({ status: "ok" });
  res.end();
  console.log(track);
});

var server = http.createServer(app).listen(8080, function () {
  console.log("listening on port 8080");
});

const io = socketIo(server);

io.on("connection", (socket) => {
  console.log("New client connected");
});

var stream = twit.stream("statuses/filter", {
  track: track,
  language: "en",
});

stream.on("tweet", function (tweet) {
  io.emit("tweet", tweet);
});
