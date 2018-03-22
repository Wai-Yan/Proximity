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

  app.get("/api/favs", function(req, res) {
    console.log("SIR LIONHART YO");
    console.log(req.query.wantedJobs);

    db.Post.findAll({where : {id: req.query.wantedJobs}})
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/users/:id", function(req, res) {

    db.User.findOne({
      where: {
        oktaNo: req.params.id
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
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      isRecruiter: req.body.isRecruiter,
      wantsRemote: req.body.wantsRemote,
      preferredLocation: req.body.preferredLocation,
      radius: req.body.radius,
      associatedJobs: req.body.associatedJobs,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      profilePicLink: gravId,
      oktaNo: req.body.oktaNo
    }).then(function() {
        res.json(gravId);
    });
  });

  app.put("/api/users", function(req, res) {

    console.log("You're about to UPDATE a user in sql");   

    var updatedPropertiesOnly = {};

    for (var key in req.body) {
       if (req.body.hasOwnProperty(key)) {
          updatedPropertiesOnly[key] = req.body[key];
       }
    }

    console.log(updatedPropertiesOnly);

    db.User.update(updatedPropertiesOnly, {where: {id: 1}});
  });

  app.put("/api/users/star", function(req, res) {

    console.log("You're about to change a job's STAR STATUS");   
    console.log(req.body.id);
    var newList = "[" + req.body.id + "]";

    db.User.update({associatedJobs: newList}, {where: {oktaId: req.body.id}});
  });
};