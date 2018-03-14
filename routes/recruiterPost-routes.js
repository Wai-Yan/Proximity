
app.post("/api/posts", function(req, res) {
  console.log(req.body);
  db.Post.create({
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription,
    address: req.body.address,
    state: req.body.state,
    zipCode: req.body.zipCode
  })
    .then(function(dbPost) {
      res.json(dbPost);
    });
});
