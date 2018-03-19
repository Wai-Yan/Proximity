var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test.html"));
  });

  app.get("/saved", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/saved.html"));
  });

  app.get("/recruiter", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/recruiter.html"));
  });

  app.get("/recruiteraccount", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/recruiteraccount.html"));
  });

  app.get("/account", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/settings.html"));
  });

  app.get("/googletest", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/googlemapstest.html"));
  });
}
