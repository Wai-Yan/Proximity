$(document).ready(function() {

  function initializeRows(posts) {
    var latestPosts = posts.reverse();
    var rowsToAdd = [];
    for (var i = 0; i < 7; i++) {
      rowsToAdd.push(createNewRow(latestPosts[i]));
    }
    $("#recentJobs").append(rowsToAdd);
  }

  function getPosts() {
    $.get("/api/posts", function(data) {
      posts = data;
      initializeRows(posts);
      // displayPost(posts);
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
    var viewbtn = $("<td>")
    var btn = $('<input />', {
      type: 'button',
      value: 'View',
      class: 'btn-viewPost',
      on    : {
                 click:
                 function() {
                     console.log ( posts.id );
                 }
                 // displayPost()
              }
    })
    viewbtn.append(btn)
    tRow.append(titleTd, companyTd, cityTd, stateTd, viewbtn)
    tBody.append(tRow);
  }

  getPosts();

  /// click action for view to pop up with modal on the job info
  // function displayPost() {
  //   console.log("hi")
  //   queryURL = 'http://localhost:8080/api/posts/' + posts.id
  //   console.log(queryURL)
  //   $.ajax({
  //     url: queryURL,
  //     method: "GET",
  //   }).done(function(results) {
  //     console.log(results)
  //       // $("#markerName").empty()
  //       // $("#markerCheckins").empty()
  //       // $("#applyButton").empty()
  //       var jbTit = results.jobTitle
  //       var cmpName = results.companyName
  //       var jobDesc = results.jobDescription
  //       var adr1 = results.address
  //       var adr2 = results.city
  //       var adr3 = results.state
  //       var adr4 = results.zipCode
  //       var fullAddress = adr1 + " " + adr2 + " " + adr3 + " " + adr4
  //       var createdAt = results.created_at
  //       var updatedAt = results.updated_at
  //
  //       var placeDetailsModal = ('<div>'+ 'Company:' + cmpName + '<br>' + 'Job Description:'+ jobDesc + '<br>' + 'Job Address:'+ fullAddress + '<br>' +'Created At:'+ createdAt + '<br>' +'Updated At:'+ updatedAt+ '<br>' +'</div>');
  //       // $("#markerName").text('Job Title: ' + jbTit)
  //       // $("#markerCheckins").append(placeDetailsModal)
  //       // $("#applyButton").append('<button type="submit" id="apply" class="btn btn-success">Apply</button>')
  //       // jQuery.noConflict();
  //       // $("#markerModal").modal()
  //   })
  // };

  $("#resultsPageTitleText").text("Your search results for " + "(variable)" + " jobs in " + "(variable)")

  $("#recruiter-btn").on("click", function() {
    console.log("registering button click")
    window.location = "/recruiter";
  })

  $(".btn-success").click(function() {
    starJob();
  });

  function starJob() {
    $.post("/api/people", function(data) {
      console.log(data);
    });
    console.log("You starred a job");
  }

  function unstarJob() {
    console.log("You unstarred a job");
  }
})
