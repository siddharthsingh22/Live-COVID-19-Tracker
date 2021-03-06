var express = require("express");
var app = express();
var request = require("request");
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.listen(process.env.PORT || 3000, function () {
  console.log("Server has started");
});
app.set("view engine", "ejs");

app.get("/", function (req, res) {
  request("https://api.covid19india.org/data.json", function (
    error,
    response,
    body,
    headers
  ) {
    let lastModified = response.headers["last-modified"];
    let data = JSON.parse(body);
    res.render("countryInfo", { data: data, lastModified: lastModified });
  });
});

app.get("/stateSearch", function (req, res) {
  var stateName = req.query.stateName;
  console.log(stateName);
  request("https://covid-india-cases.herokuapp.com/statetimeline/", function (
    error,
    response,
    body
  ) {
    let stateData = JSON.parse(body);
    res.render("stateInfo", {
      stateData: stateData,
      stateName: stateName,
    });
  });
});

app.post("/stateSearch/districtSearch", function (req, res) {
  var districtName = req.body.districtName;
  console.log(districtName);

  request("https://api.covid19india.org/v2/state_district_wise.json", function (
    error,
    respose,
    body
  ) {
    var districtWiseData = JSON.parse(body);

    res.render("districtInfo", {
      districtWiseData: districtWiseData,
      districtName: districtName,
    });
  });
});
