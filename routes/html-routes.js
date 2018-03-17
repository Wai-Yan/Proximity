var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test.html"));
  });

  app.get("/search", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/results.html"));
  });

  app.get("/recruiter", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/recruiter.html"));
  });

  app.get("/googletest", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/googlemapstest.html"));
  });
}
