$(document).ready(function() {

  $('body').tooltip({
    selector: '[class="checkedStar"]'
  });

  function initializeRows(posts) {
    var latestSaves = posts.reverse();
    var rowsToAdd = [];
    for (var i = 0; i < posts.length; i++) {
      rowsToAdd.push(createNewRow(latestSaves[i]));
    }
    $("#savedJobs").append(rowsToAdd);
  }

  // get posts that have been saved
  function getPosts() {
    $.get("/api/posts", function(data) {
      posts = data;
      initializeRows(posts);
      console.log(posts)
    });
  }

  function createNewRow(posts) {
    // var date = moment(posts.created_at).format('MM/DD/YYYY');
    var tBody = $("tbody")
    var tRow = $("<tr>").addClass("jobRow")
    var titleTd = $("<td>").text(posts.jobTitle)
    var starTd = $("<td>")
    var starbtn = $("<p>", {
      class: "checkedStar",
      "data-toggle": "tooltip",
      "data-placement": "left",
      "title": "Click to unfavorite and remove from list",
      on: {
        click: function() {
          // call function to remove from the favorites list. delete post.id

        }
      }
    })
    starTd.append(starbtn)
    var companyTd = $("<td>").text(posts.companyName)
    var descriptionTd = $("<td>").text(posts.jobDescription).addClass("description-td overflow")
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
    viewbtn.append(btn)
    // var applybtn = $("<td>").text("View").addClass("btn-apply").attr("id", "applyBtn")
    tRow.append(titleTd, starTd, companyTd, descriptionTd, viewbtn)
    tBody.append(tRow);
  }

  // click action for view to pop up with modal on the job info
  function displayPost(id) {
    console.log("hi")
    queryURL = 'http://localhost:8080/api/posts/' + id
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

  getPosts();

})
