var request = require("request");
var path = require("path");

require('dotenv').config();

module.exports = function(app) {

  app.get("/authorizeduser", function(req, res) {
    console.log("Start Job Searcher Authorization");
    if (Object.keys(req.query).length !== 0) {
      res.cookie('token', req.query.token);
      res.cookie('userid', req.query.userid);
      res.cookie('userid', req.query.email);
      res.cookie('type', req.query.type);
    }
    res.sendFile(path.join(__dirname, '../public/authorizeduser.html'));
  });

  app.get("/recruiter", function(req, res) {
    console.log("Start Recruiter Authorization");
    if (Object.keys(req.query).length !== 0) {
      res.cookie('token', req.query.token);
      res.cookie('userid', req.query.userid);
      res.cookie('userid', req.query.email);
      res.cookie('type', req.query.type);
    }
    res.sendFile(path.join(__dirname, '../public/recruiter.html'));
  });

  app.get("/api/login", function(req, res) {
    var apiKey = "00BDMYORT6f82bU5kvP5TDTzxc_-7iN45zC4msNvjK";
    console.log("You got into the route");
    console.log(req.query);
    var email = req.query.email;
    console.log("email", email);

    request({
      method: "GET",
      url: "https://dev-975345.oktapreview.com/api/v1/users/" + email,
      headers: {
        "Content-Type": "application/json",
        "Authorization": "SSWS " + apiKey
      }
    }, function(error, response, body) {
      if (error) {
        console.error(error);
        return res.send(500, "Server Error");
      }

      var json = JSON.parse(body);
      res.json(json);

    });
  });
}
