var request = require("request");
var path = require("path");

require('dotenv').config();

module.exports = function(app) {

  app.get("/authorizeduser", function(req, res) {
      //console.log("process.env.apiKey "+ process.env.apiKey);
      console.log("Start");
      console.log("okta-oauth-state: "+ req.cookies['okta-oauth-state']);

      if(req.cookies['okta-oauth-state'] !== undefined){
        res.sendFile(path.join(__dirname, '../public/authorizeduser.html'));
      } else {
        res.sendFile(path.join(__dirname, '../public/test.html'));
      }
  });

}
