$(document).ready(function() {

  var resultsArr = [];

  // initalize the latest jobs list
  getPosts();


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
    for (var i = 0; i < 4; i++) {
      rowsToAdd.push(createNewRow(latestPosts[i]));
    }
    $("#recentJobs").append(rowsToAdd);
  }

  // print all results that match the query
  function initializeResultsRows(results) {
    var latestResults = results.reverse();
    console.log(latestResults)
    var resultsToAdd = [];
    console.log("here is the array" + resultsToAdd)
    for (var i = 0; i < latestResults.length; i++) {
      resultsToAdd.push(createNewRow(latestResults[i]));
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

  function createNewRow(posts) {
    var tBody = $("tbody")
    var tRow = $("<tr>").addClass("jobRow")
    var titleTd = $("<td>").text(posts.jobTitle)
    var star = $("<td>")
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
    var empty = true;
    var starbtn = $('<p />', {
      class: "star",
      on: {
        click: function() {
          if (empty) {
            starbtn.removeClass("star")
            starbtn.addClass("checkedStar")
            empty = false;
            // then store
          } else {
            starbtn.removeClass("checkedStar")
            console.log("getting here")
            starbtn.addClass("star")
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


  // need to include conditional if logged in
  // $("#recruiter-btn").on("click", function() {
  //   console.log("registering button click");
  //   window.location = "/recruiter";
  // })

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
  //
  $(".recruiter-login-text").on("click", function() {
    starJob();
  })

  function starJob() {
    $.ajax({
      url: '/api/users',
      type: 'PUT'
    });

  }

  function unstarJob() {
    console.log("You unstarred a job");
  }
});
