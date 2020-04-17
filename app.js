var express = require("express");
var app = express();
var request = require("request");
app.use(express.static("public"));
app.listen(3000, function () {
  console.log("Server has started");
});
app.set("view engine", "ejs");

app.get("*", function (req, res) {
  request("https://covid-india-cases.herokuapp.com/states/", function (
    error,
    response,
    body
  ) {
    let data = JSON.parse(body);
    res.render("info", { data: data });
  });
});

app.get("/stateSearch", function (req, res) {
  var stateName = req.query.stateName;

  request("https://covid-india-cases.herokuapp.com/statetimeline/", function (
    error,
    response,
    body
  ) {
    var stateData = JSON.parse(body);
    res.render("stateInfo", { stateData: stateData, stateName: stateName });
  });
});
