var path = require("path");

module.exports = function(app) {

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/test.html"));
  });

  app.get("/home", function(req, res){
    if(req.cookies['type'] === "recruiter"){
      res.redirect("/recruiter");
    } else {
      res.redirect("/authorizeduser");
    }
  });

  app.get("/saved", function(req, res) {
    checkUser(req,res);
    res.sendFile(path.join(__dirname, "../public/saved.html"));
  });

  app.get("/recruiteraccount", function(req, res) {
    checkUser(req,res);
    res.sendFile(path.join(__dirname, "../public/recruiteraccount.html"));
  });

  app.get("/account", function(req, res) {
    checkUser(req,res);
    res.sendFile(path.join(__dirname, "../public/settings.html"));
  });

  app.get("/googletest", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/googlemapstest.html"));
  });

  app.get("/logout", function(req, res) {
    res.clearCookie('token');
    res.clearCookie('userid');
    res.clearCookie('email');
    res.clearCookie('type');
    res.sendFile(path.join(__dirname, "../public/logout.html"));
  });
}

function checkUser(req, res){
  if(req.cookies['token'] === undefined){
    res.redirect("/");
  }
}
