const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

// routes
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/about", function(req, res) {
  res.sendFile(__dirname + "/about.html");
});

app.get("/docs", function(req, res) {
  res.sendFile(__dirname + "/docs.html");
});

app.listen(80, function() {
  console.log("Listening on port 80");
});
