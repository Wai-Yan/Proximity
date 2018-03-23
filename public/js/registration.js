$(document).ready(function() {
  $(document.body).on("keypress", "#email_r", function() {
    console.log("Register Tab");
    $("#recruiterSubmit").addClass("bind-register-btn");
    $("#recruiterSubmit").removeClass("bind-login-btn");
  });

  $(document.body).on("keypress", "#loginEmail_r", function() {
    console.log("Register Tab");
    $("#recruiterSubmit").addClass("bind-login-btn");
    $("#recruiterSubmit").removeClass("bind-register-btn");
  });

  $(document.body).on("click", "#registerModal #oktaRegister", function() {
    console.log("I'm here");
    var newFirstname = $("#registerModal #firstname").val().trim();
    var newLastname = $("#registerModal #lastname").val().trim();
    var newEmail = $("#registerModal #email").val().trim();
    var newPassword = $("#registerModal #password").val().trim();
    var newMobile = $("#registerModal #mobilephone").val().trim();
    var newPreferredLoc = $("#registerModal #preferredloc").val().trim();
    var newRadius = $("#registerModal #radius").find(':selected').data('size');
    var newRemote = $("#registerModal #remote").is(":checked");
    var newUserType = "jobsearcher";
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
      userType: newUserType,
      image: newImage
    };

    console.log(newRegistration);

    var userOktaId;

    $.post("/api/register", newRegistration).done(function(data) {

      if (data) {
        if(data.id !== undefined || data.id !== null){
          userOktaId = data.id;
          userLogin(newRegistration);
        }
        //$("#successModal").modal("show");

      } else {
        alert("Oop! something went wrong. Please try again soon.");
      }

      $('#registerModal').on('hidden.bs.modal', function() {
        console.log("reset form");
        $(this).find('form').trigger('reset');
      });
    }).
    then(function() {
      var newUser = {
        firstName: newFirstname,
        lastName: newLastname,
        isRecruiter: false,
        wantsRemote: newRemote,
        preferredLocation: newPreferredLoc,
        radius: newRadius,
        associatedJobs: "[]",
        phoneNo: newMobile,
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

  $(document.body).on("click", ".bind-register-btn", function() {
    console.log("I'm here - Recruiter");
    var newFirstname = $("#recruiterModal #firstname_r").val().trim();
    var newLastname = $("#recruiterModal #lastname_r").val().trim();
    var newEmail = $("#recruiterModal #email_r").val().trim();
    var newPassword = $("#recruiterModal #password_r").val().trim();
    var newMobile = $("#recruiterModal #mobilephone_r").val().trim();
    var newCompanyName = $("#recruiterModal #companyname").val().trim();
    var newCompanyWebsite = $("#recruiterModal #companywebsite").val().trim();
    var newUserType = "recruiter";
    var newImage; // = getUserImage();

    var newRegistration = {
      firstName: newFirstname,
      lastName: newLastname,
      email: newEmail,
      password: newPassword,
      mobilePhone: newMobile,
      companyname: newCompanyName,
      companywebsite: newCompanyWebsite,
      userType: newUserType,
      image: newImage
    };

    console.log(newRegistration);

    $.post("/api/register", newRegistration).done(function(data) {
      console.log(data);
      if (data) {
        console.log("Back from Register");
        if(data.id !== undefined || data.id !== null){
          userOktaId = data.id;
          userLogin(newRegistration);
        }

      } else {
        alert("Oop! something went wrong. Please try again soon.");
      }

      $('#recruiterModal').on('hidden.bs.modal', function() {
        console.log("reset form");
        $(this).find('form').trigger('reset');
      });
    }).
    then(function() {
      var newUser = {
        firstName: newFirstname,
        lastName: newLastname,
        isRecruiter: true,
        wantsRemote: newRemote,
        preferredLocation: newPreferredLoc,
        radius: newRadius,
        associatedJobs: "[]",
        phoneNo: newMobile,
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

  function userLogin(loginObj) {
    var authClient = new OktaAuth({
      url: 'https://dev-975345.oktapreview.com',
      clientId: '0oaebzwcf9OKAHbHh0h7'
    });

    console.log(loginObj.email);
    console.log(loginObj.password);

    authClient.signIn({
        username: loginObj.email,
        password: loginObj.password
      })
      .then(function(transaction) {
        if (transaction.status === 'SUCCESS') {
          console.log(transaction.user.profile.firstName);
          console.log("usertype", loginObj.userType);
          console.log(loginObj.userType === "recruiter");
          var redirectURL;
          if(loginObj.userType === "recruiter"){
            redirectURL = 'http://localhost:8080/recruiter?token='+transaction.sessionToken+"&userid="+transaction.user.id+"&email="+loginObj.email+"&type="+loginObj.userType;
          } else {
            redirectURL = 'http://localhost:8080/authorizeduser?token='+transaction.sessionToken+"&userid="+transaction.user.id+"&email="+loginObj.email+"&type="+loginObj.userType;
          }
          //addProfileName(transaction.user.profile.firstName);
          //$( ".dropdown-content" ).find("p").text("HI").attr("value");
          console.log("URL", redirectURL);
          authClient.session.setCookieAndRedirect(transaction.sessionToken, redirectURL); // Sets a cookie on redirect
        } else {
          throw 'We cannot handle the ' + transaction.status + ' status';
        }
      })
      .fail(function(err) {
        console.error(err);
      });
  }

});
