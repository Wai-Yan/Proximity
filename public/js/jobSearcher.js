$(document).ready(function() {

  var resultsArr = [];

  // initalize the latest jobs list
  getPosts();

  // Retrieve their saved jobs
  getTheirFavs();

  // hide map at default
  $("#mapview").hide();

  // hide map on click of list view
  $("#listviewclick").on("click", function() {
    $("#mapview").hide();
    $("#listview").show();
  })

  // hide list on click of map view
  $("#mapviewclick").on("click", function() {
    $("#mapview").show();
    $("#listview").hide();
  })

  //grab value upon hitting submit button
  $("#sendSearch").on("click", function(event) {
    event.preventDefault();
    var keywordInput = $("#keywordVal").val().trim();
    // var qstring= keywordInput.replace(/ /g,"+");
    // console.log("this is the query string" + qstring)
    getResults(keywordInput);
    // ("#keywordVal").val("")
  });


  // print latest ten items to rows in the table
  function initializeRows(posts) {
    var latestPosts = posts.reverse();
    var rowsToAdd = [];
    var saved = localStorage.getItem("theirJobs");
    saved = saved.split(',').map(Number);

    for (var i = 0; i < 4; i++) {
      rowsToAdd.push(createNewRow(latestPosts[i], saved));
    }
    $("#recentJobs").append(rowsToAdd);
  }

  // print all results that match the query
  function initializeResultsRows(results) {
    var latestResults = results.reverse();
    console.log(latestResults)
    var resultsToAdd = [];
    console.log("here is the array" + resultsToAdd)
    var saved = localStorage.getItem("theirJobs");
    saved = saved.split(',').map(Number);
    for (var i = 0; i < latestResults.length; i++) {
      resultsToAdd.push(createNewRow(latestResults[i]), saved);
    }
    console.log("new array" + JSON.stringify(resultsToAdd))
    $("#recentJobs").append(resultsToAdd);
  }

  // get all posts with no limit on the query
  function getPosts() {
    $.get("/api/posts", function(data) {
      posts = data;
      initializeRows(posts);
      console.log(posts)
    });
    $("#latestJobsText").text("Latest jobs")
  }

  // get posts based on the queries entered
  function getResults(keywordInput) {
    queryURL = "/api/results/" + keywordInput
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(results) {
      $(".jobRow").remove()
      initializeResultsRows(results)
      // pagination(results)
      console.log(results)
    });
    $("#sectionResultsTitle").text("Your search results for " + keywordInput + " jobs in " + "(variable)")
  }

  function createNewRow(posts, savedJobs) {
    var tBody = $("tbody")
    var tRow = $("<tr>").addClass("jobRow")
    var titleTd = $("<td>").text(posts.jobTitle)
    var star = $("<td id='" + posts.id + "'>")
    var companyTd = $("<td>").text(posts.companyName)
    var cityTd = $("<td>").text(posts.city)
    var stateTd = $("<td>").text(posts.state)
    var viewbtn = $("<td>")
    var btn = $('<input />', {
      type: "button",
      value: "View",
      class: "btn-viewPost",
      "data-toggle": "modal",
      "data-target": "#viewJobPostInfo",
      on: {
        click: function() {
          // console.log ( posts.id );
          displayPost(posts.id)
        }
      }
    })

    var empty;
    // Check whether or not this specific job is in user's saved jobs
    if (savedJobs.includes(posts.id)) {
      console.log("This job should be starred");
      empty = false;
    }

    else {
      empty = true;
    }

    // Make row a seperate function
    // Create row in dom, then 

    // When clicked check state if on, turn off
    // if off turn on

    // Rework the way you build the rows to make it simpler
    // Function that takes specific 

    // var empty = true;
    var starbtn = $('<p />', {
      class: "star",
      on: {
        click: function() {
          if (empty) {
            var clickedJobId = $(this).parent().attr("id");
            starbtn.removeClass("star")
            starbtn.addClass("checkedStar")
            starJob(clickedJkbobId)

            empty = false;
            // then store
          } else {
            starbtn.removeClass("checkedStar")
            starbtn.addClass("star")
            unstarJob()
            empty = true;
            // then remove
          }
        }
      }
    })
    viewbtn.append(btn)
    star.append(starbtn)
    tRow.append(titleTd, star, companyTd, cityTd, stateTd, viewbtn)
    tBody.append(tRow);
  }

  // click action for view to pop up with modal on the job info
  function displayPost(id) {
    queryURL = "api/posts/" + id
    console.log(queryURL)
    $.ajax({
      url: queryURL,
      method: "GET",
    }).done(function(results) {
      console.log(results)
      var applybtn = $('<input />', {
        type: "button",
        value: "Apply",
        class: "apply-btn",
        on: {
          click: function() {
            window.open(postLink, '_blank');
            // window.open("http://www.facebook.com", '_blank');
            console.log("click to go to url")
          }
        }
      })
      $("#viewJobPostTitle").text(results.jobTitle)
      $("#apply-btn-area").html(applybtn)
      // var jbTit = results.jobTitle
      var cmpName = results.companyName
      var jobDesc = results.jobDescription
      var jobQual = results.jobQualification
      var addInfo = results.additionalInfo
      var adr1 = results.address
      var adr2 = results.city
      var adr3 = results.state
      var adr4 = results.zipCode
      var fullAddress = adr1 + " " + adr2 + " " + adr3 + " " + adr4
      var createdAt = results.created_at
      var updatedAt = results.updated_at

      var placeDetailsModal = ('<div>' + cmpName + '<br>' + '<br>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Qualifications: </h5>' + jobQual + '<br>' + '<br>' + '<h5>Additional Information: </h5>' + addInfo + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');

      var noQualDetailsModal = ('<div>' + cmpName + '<br>' + '<br>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Additional Information: </h5>' + addInfo + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');

      var noAddInfoDetailsModal = ('<div>' + cmpName + '<br>' + '<br>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Qualifications: </h5>' + jobQual + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');

      var noQualorInfoDetailsModal = ('<div>' + cmpName + '<br>' + '<br>' + '<h5>Job Description: </h5>' + jobDesc + '<br>' + '<br>' + '<h5>Job Address: </h5>' + adr1 + '<br>' + adr2 + ', ' + adr3 + ' ' + adr4 + '</div>');

      if (addInfo === undefined && jobQual === undefined) {
        $(".job-view-body").html(noQualorInfoDetailsModal)
      } else if (addInfo === undefined) {
        $(".job-view-body").html(noAddInfoDetailsModal)
      } else if (jobQual === undefined) {
        $(".job-view-body").html(noQualDetailsModal)
      } else {
        $(".job-view-body").html(placeDetailsModal)
      }
    })
  };

  function getTheirFavs() {
    var id = localStorage.getItem("id");
    var personalPostings;

    $.get("/api/users/" + id, function(data) {

      personalPostings = JSON.parse("[" + data.associatedJobs + "]");
      personalPostings = personalPostings[0];

      localStorage.setItem("theirJobs", personalPostings);
    })
  }

  // need to include conditional if logged in
  // $("#recruiter-btn").on("click", function() {
  //   console.log("registering button click");
  //   window.location = "/recruiter";
  // })

  $(".checkedStar").on("click", function() {
    unstarJob();

  // pagination function
  //   var table =  $('#myTable');
  // var b = (array of objects from the result)
  // var max_size=b.length;
  // var sta = 0;
  // var elements_per_page = 4;
  // var limit = elements_per_page;
  // goFun(sta,limit);
  // function goFun(sta,limit) {
  //  for (var i =sta ; i < limit; i++) {
  //
  //    var $nr = $('<tr><td>A-' + b[i]['play_id'] + '</td><td>B-' + b[i]['question1']  + '</td></tr>');
  //    table.append($nr);
  //  }
  //  }
  //  $('#nextValue').click(function(){
  //
  //  var next = limit;
  //  if(max_size>=next) {
  //  limit = limit+elements_per_page;
  //  table.empty();
  //  goFun(next,limit);
  //  }
  //  });
  //  $('#PreeValue').click(function(){
  //  var pre = limit-(2*elements_per_page);
  //  if(pre>=0) {
  //  limit = limit-elements_per_page;
  //  table.empty();
  //  goFun(pre,limit);
  //  }
  //  });
  //
  // });
  //
  })

  function starJob(jobId) {

    console.log("You're about to star a job! Hopefully");

    var currentSaved = localStorage.getItem("theirJobs");

    console.log(currentSaved);

    // if (!currentSaved) {
    //   currentSaved = [jobId];
    //   console.log(currentSaved);
    //   localStorage.setItem("theirJobs", currentSaved);
    // }

    // else {
    //   console.log(typeof currentSaved);
    //   var madeArray = currentSaved;
    //   console.log(madeArray);
    //   console.log("This is the type of the array you made " + typeof madeArray);


    //   currentSaved.push(jobId);
    //   localStorage.setItem("theirJobs", currentSaved);
    // }

    // var request = {
    //   newJob: ,
    //   id: localStorage.getItem("id")
    // }
  
    // $.ajax({
    //   url: '/api/star',
    //   type: 'PUT',
    //   data: request
    // });

  }

  function unstarJob(id) {
    console.log("You've unstarred a job");
    // var request = {
    //   id: id,
    //   newJob: localStorage.getItem("theirJobs"),
    //   okta: localStorage.getItem("id")
    // }

    // $.ajax({
    //   url: '/api/star',
    //   type: 'PUT',
    //   data: request
    // });
  }

  fillGravatar();

  function fillGravatar() {

    var id = localStorage.getItem("id")

    $.get("/api/users/" + id, function(data) {

      $(".dropbtn").css('background-image', 'url("https://' + data.profilePicLink + '")');
    });
  }
});
