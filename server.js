require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var googleMapsClient = require('@google/maps').createClient({
  key: process.env.GMAP_KEY
});
var app = express();
var PORT = process.env.PORT || 8080;

//model related 'db' initializors commented out until functionality added to "./models" .js files
var db = require("./models");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});

googleMapsClient.geocode({
  address: '1600 Amphitheatre Parkway, Mountain View, CA'
}, function(err, response) {
  if (!err) {
    var res = (response.json.results);
    for (var i=0; i < res.length; i++) {
    console.log(res[i].geometry.location)
    }
  }
})
