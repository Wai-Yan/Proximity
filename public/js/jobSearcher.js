$(document).ready(function() {

  function initializeRows(posts) {
    var latestPosts = posts.reverse();
    var rowsToAdd = [];
    for (var i = 0; i < 10; i++) {
      rowsToAdd.push(createNewRow(latestPosts[i]));
    }
    $("#recentJobs").append(rowsToAdd);
  }

  function getPosts() {
    $.get("/api/posts", function(data) {
      posts = data;
      initializeRows(posts);
      console.log(posts)
    });
  }

  function createNewRow(posts) {
    var tBody = $("tbody")
    var tRow = $("<tr>").addClass("jobRow")
    var titleTd = $("<td>").text(posts.jobTitle).addClass("jobData")
    var companyTd = $("<td>").text(posts.companyName).addClass("jobData")
    var cityTd = $("<td>").text(posts.city).addClass("jobData")
    var stateTd = $("<td>").text(posts.state).addClass("jobData")
    var applybtn = $("<td>").text("Apply").addClass("btn-apply").attr("id", "applyBtn")
    tRow.append(titleTd, companyTd, cityTd, stateTd, applybtn)
    tBody.append(tRow);
  }

  getPosts();

  $("#resultsPageTitleText").text("Your search results for " + "(variable)" + " jobs in " + "(variable)")

  $("#recruiter-btn").on("click", function() {
    console.log("registering button click")
    window.location = "/recruiter";
  })

  $( "#registerbtn" ).click(function() {
    createUser();
  });

  $(document.body).on("click", "#registerModal #oktaRegister", function() {
      //event.preventDefault();
      console.log("I'm here");
      var registerModal = $("#registerform");
      var newFirstname = $("#registerModal #firstname").val().trim();
      var newLastname = $("#registerModal #lastname").val().trim();
      var newPreferredLoc = $("#registerModal #preferredloc").val().trim();
      var newRadius = $("#radius").find(":selected").data("size");
      // var newRemote = $("#registerModal #remote");
      var newRemote = $('#remote').is(':checked');
      var newImage = $("#registerModal #imageUploadFile");

      console.log(newFirstname);
      console.log(newLastname);
      console.log(newPreferredLoc);
      console.log(newRadius);
      console.log(newRemote);

   });

  function createUser() {
    {
      console.log("createUser has been started");

      var newUser = {
        fullName: "Jack",
        isRecruiter: false,
        preferredLocation: "DC",
        radius: 5,
        associatedJobs: "[]",
        email: "kek@gmail.com",
        profilePicLink: "lol.com/picture.png"
      };
      $.ajax({
        method: "POST",
        url: "/api/users/",
        data: newUser
        });
    }
  }

  function starJob() {
    $.post("/api/people", function(data) {
      console.log(data);
    });
    console.log("You starred a job");
  }

  function unstarJob() {
    console.log("You unstarred a job");
  }
});
