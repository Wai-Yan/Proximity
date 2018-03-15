$(document).ready(function() {

  $("#addPost").on("click", function(event) {
    event.preventDefault();
    var jobTitInput = $("#jobTit");
    var jobDescInput = $("#jobDesc");
    var jobAdrsInput = $("#jobAdr");
    var jobCityInput = $("#jobCity")
    var jobStateInput = $("#jobState");
    var jobZipInput = $("#jobZip");
    var lat;
    var long;

    googleMapsClient.geocode({
      address: "'" + jobAdrsInput.val().trim() + "," + " " + jobCityInput.val().trim() + "," + " " + jobStateInput.val().trim() + " " + jobZipInput.val().trim() + "'"
    }, function(err, response) {
      if (!err) {
        var res = (response.json.results);
        for (var i=0; i < res.length; i++) {
        console.log(res[i].geometry.location)
        lat = res[i].geometry.location.lat
        long = res[i].geometry.location.lng
        }
      }
    })

    var newPost = {
      jobTitle: jobTitInput.val().trim(),
      jobDescription: jobDescInput.val().trim(),
      address: jobAdrsInput.val().trim(),
      city: jobCityInput.val().trim(),
      state: jobStateInput.val().trim(),
      zipCode: jobZipInput.val().trim(),
      latitude: lat,
      longitude: long
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
