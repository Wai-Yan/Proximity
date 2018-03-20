var db = require("../models");
var gravatar = require("gravatar");

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

  // app.get("/api/posts/search?q=", function(req, res) {
  //   db.Post.findAll({
  //     where: {
  //       q: {
  //         $like: "%" + req.query.jobTitle + "%"
  //       }
  //       },
  //       logging: console.log
  //   }).then(function(dbPost) {
  //     res.json(dbPost);
  //   });
  // });

  // search routes
  app.get("/api/results", function(req, res) {
    db.Post.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.post("/api/results", function(req, res) {
    db.Post.create(req.body).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/results/:jobTitle", function(req, res) {
    db.Post.findAll({
      where: {
        jobTitle: {
          $like: "%" + req.params.jobTitle + "%"
        }
        },
        logging: console.log
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  // user routes
  app.get("/api/users", function(req, res) {
    db.Post.findAll({})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  // User Creation Routes
  app.post("/api/users", function(req, res) {

    var gravId = (gravatar.url(req.body.email)).slice(2);

    db.User.create({
      fullName: req.body.fullName,
      isRecruiter: req.body.isRecruiter,
      wantsRemote: req.body.wantsRemote,
      preferredLocation: req.body.preferredLocation,
      radius: req.body.radius,
      associatedJobs: req.body.associatedJobs,
      email: req.body.email,
      profilePicLink: gravId,
      oktaNo: req.body.oktaNo
    }).then(function() {
        res.json(gravId);
    });
  });

  app.put("/api/users", function(req, res) {
    console.log("You're about to UPDATE a user in sql");
    db.User.update({associatedJobs: "[4, 20]"}, {where: {id: 1}})
  });
};
