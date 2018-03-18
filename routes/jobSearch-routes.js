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
    console.log("You're about to create a user in sql");
    db.User.create({
      fullName: req.body.fullName,
      isRecruiter: req.body.isRecruiter,
      wantsRemote: req.body.wantsRemote,
      preferredLocation: req.body.preferredLocation,
      radius: req.body.radius,
      associatedJobs: req.body.associatedJobs,
      email: req.body.email,
      profilePicLink: req.body.profilePicLink,
      oktaNo: req.body.oktaNo
    })
  });

  app.put("/api/users", function(req, res) {
    console.log("You're about to UPDATE a user in sql");
    db.User.update({associatedJobs: "[4, 20]"}, {where: {id: 1}})
  });
};
