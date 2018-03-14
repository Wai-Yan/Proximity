
$(document).ready(function() {

  $("#addPost").on("click", function(event) {
    event.preventDefault();
    var jobTitInput = $("#jobTit");
    var jobDescInput = $("#jobDesc");
    var jobAdrsInput = $("#jobAdr");
    var jobStateInput = $("#jobState");
    var jobZipInput = $("#jobZip");

    var newPost = {
      jobTitle: jobTitInput.val().trim(),
      jobDescription: jobDescInput.val().trim(),
      address: jobAdrsInput.val().trim(),
      state: jobStateInput.val().trim(),
      zipCode: jobZipInput.val().trim()
    };

    if (newPost != {}) {
      submitPost(newPost);
      console.log(newPost);
    }
    
  function submitPost(newPost) {
    $.post("/api/posts", newPost, function() {
      window.location.href = "/";
    });
  }


  });
});
