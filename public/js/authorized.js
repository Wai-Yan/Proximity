$(document).ready(function() {
  $( ".dropdown-content" ).find("p:first").text(localStorage.getItem("firstName"));

  fillGravatar();

  function fillGravatar() {

    var id = localStorage.getItem("id");

    $.get("/api/users/" + id, function(data) {

      $(".dropbtn").css('background-image', 'url("https://' + data.profilePicLink + '")');
    });
  }
});
