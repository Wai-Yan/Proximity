//Connect to OKTA create users API
var request = require("request");

module.exports = function(app) {
  app.post("/api/register", function(req, res) {
    console.log(req.body);
    var apiKey = "00BDMYORT6f82bU5kvP5TDTzxc_-7iN45zC4msNvjK";
    var registerBody = {
      "profile": {
        "firstName": req.body.firstName,
         "lastName": req.body.lastName,
         "email": req.body.email,
         "login": req.body.email,
         "mobilePhone": req.body.mobilePhone,
         "userType": req.body.userType,
         "organization": req.body.companyname,
         "profileUrl": req.body.companywebsite
      },
      "credentials": {
        "password": {
          "value": req.body.password
        }
      }
    }

    request({
      method: "POST",
      url: "https://dev-975345.oktapreview.com/api/v1/users?activate=true",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "SSWS " + apiKey
      },
      body: JSON.stringify(registerBody)
    }, function(error, response, body) {
      if (error) {
        console.error(error);
        return res.send(error);
      }
      res.send(JSON.parse(body));

      // var dbObj = {
      //   id: json.id,
      //   firstname: req.body.firstName,
      //   lastname: req.body.lastName,
      //   email: req.body.email
      // };
      // res.json(dbObj);
    })
  });
}
