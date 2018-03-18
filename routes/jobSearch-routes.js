var db = require("../models");

module.exports = function(app) {

  // Job Listing routes
  app.get("/api/posts", function(req, res) {
    db.Post.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/posts", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({
      where: {
        id: req.params.id
      },
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/users", function(req, res) {
    db.Post.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // User Creation Routes
  app.post("/api/users", function(req, res) {
    console.log("You got into the route");
  //   // create takes an argument of an object describing the item we want to
  //   // insert into our table. In this case we just we pass in an object with a text
  //   // and complete property (req.body)
    db.User.create({
      fullName: req.body.fullName,
      isRecruiter: req.body.isRecruiter,
      preferredLocation: req.body.preferredLocation,
      radius: req.body.radius,
      associatedJobs: req.body.associatedJobs,
      email: req.body.email,
      profilePicLink: req.body.profilePicLink
    })
  });
};
