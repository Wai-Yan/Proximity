var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var app = express();
var PORT = process.env.PORT || 8080;
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

// app.engine("handlebars", exphbs({ defaultLayout: "main" }));
// app.set("view engine", "handlebars");

// require("./routes/recruiterPost-routes.js")(app);
require("./routes/html-routes.js")(app);
require("./routes/jobSearch-routes.js")(app);

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
