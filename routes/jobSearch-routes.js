var db = require("../models");

module.exports = function(app) {

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

  // app.get("/api/users", function(req, res) {
  //   db.User.findAll({})
  //     .then(function(dbPost) {
  //       console.log(dbPost);
  //     });
  // });

  app.post("/api/people", function(req, res) {
    db.Post.create({
      fullName: "Barack Obama",
      isRecruiter: false,
      preferredLocation: "San Francisco",
      radius: 5,
      associatedJobs: "[1, 2, 3]",
      profilePicLink: "picture.com/me.png"
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });
};
