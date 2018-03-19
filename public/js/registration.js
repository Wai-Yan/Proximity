//Get data from front end and connect to OKTA create users APIs in routes folder
$(document).ready(function() {
  //$("#password").password('toggle');
  $('#password').tooltip({'trigger':'focus', 'title': 'Password must be at least 8 characters, a lowercase letter, an uppercase letter, a number, no parts of your username.'});

  $(document.body).on("click", "#registerModal #oktaRegister", function() {
    //event.preventDefault();
    console.log("I'm here");
    //var registerModal = $("#registerform");
    var newFirstname = $("#registerModal #firstname").val().trim();
    var newLastname = $("#registerModal #lastname").val().trim();
    var newEmail = $("#registerModal #email").val().trim();
    var newPassword = $("#registerModal #password").val().trim();
    var newMobile = $("#registerModal #mobilephone").val().trim();
    var newPreferredLoc = $("#registerModal #preferredloc").val().trim();
    var newRadius = $("#registerModal #radius").find(':selected').data('size');
    var newRemote = $("#registerModal #remote").is(":checked");
    var newImage; // = $("#registerModal #userImageUploadFile");

    var newRegistration = {
      firstName: newFirstname,
      lastName: newLastname,
      email: newEmail,
      password: newPassword,
      mobilePhone: newMobile,
      ploc: newPreferredLoc,
      radius: newRadius,
      remote: newRemote,
      image: newImage
    };

    console.log(newRegistration);

    var userOktaId;

    $.post("/api/register", newRegistration).done(function(data) {

      if (data) {
        console.log(data);
        userOktaId = data.id;

        $("#successModal").modal("show");

      } else {
        alert("Oop! something went wrong. Please try again soon.");
      }

      $('#registerModal').on('hidden.bs.modal', function() {
        console.log("reset form");
        $(this).find('form').trigger('reset');
      });

      // $('#registerModal').is(':hidden', function() {
      //   console.log("reset form");
      //   $(this).find('form').trigger('reset');
      // });

    }).
    then(function() {

      var newUser = {
        fullName: newFirstname + " " + newLastname,
        isRecruiter: false,
        wantsRemote: newRemote,
        preferredLocation: newPreferredLoc,
        radius: newRadius,
        associatedJobs: "[1, 3, 5]",
        email: newEmail,
        oktaNo: userOktaId
      };

      // Send to DB
      $.ajax({
        method: "POST",
        url: "/api/users/",
        data: newUser
        });
    });
  });
});
