$(document).ready(function() {

$("#resultsRecreuiterPageTitleText").text("Your posted jobs")

function initializeRows(posts) {
  var latestPosts = posts.reverse();
  var rowsToAdd = [];
  for (var i = 0; i < posts.length; i++) {
    rowsToAdd.push(createNewRow(latestPosts[i]));
  }
  $("#postedJobs").append(rowsToAdd);
}

function getPosts() {
  $.get("/api/posts", function(data) {
    posts = data;
    initializeRows(posts);
    console.log(posts)
  });
}

function createNewRow(posts) {
  var date = moment(posts.created_at).format('MM/DD/YYYY');
  var tBody = $("tbody")
  var tRow = $("<tr>").addClass("jobRow")
  var titleTd = $("<td>").text(posts.jobTitle).addClass("jobData")
  var descriptionTd = $("<td>").text(posts.jobDescription).addClass("jobData description-td")
  var createdDateTd = $("<td>").text(date).addClass("jobData padding-table-left")
  var viewbtn = $("<td>").text("View").addClass("btn-view").attr("id", "viewBtn")
  tRow.append(titleTd, descriptionTd, createdDateTd, viewbtn)
  tBody.append(tRow);
}

getPosts();

// $("#addNewJob").on("click", function() {
//
// })

})
