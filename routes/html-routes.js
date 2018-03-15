var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test.html"));
  });

  app.get("/googletest", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/googlemapstest.html"));
  });
}
