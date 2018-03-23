$(document).ready(function() {

  fillGravatar();

  function fillGravatar() {

    var id = localStorage.getItem("id");

    $.get("/api/users/" + id, function(data) {

      $(".dropbtn").css('background-image', 'url("https://' + data.profilePicLink + '")');
    });
  }
});