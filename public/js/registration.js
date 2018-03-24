$(document).ready(function() {
  $(".error").text("");

  $(document.body).on("click", "#registerbtn", function() {
    $(".error").text("");
  });

  $(document.body).on("click", "#loginbtn", function() {
    $(".error").text("");
  });

  $(document.body).on("click", "#recruiter-btn", function() {
    $(".error").text("");
  });

  $(document.body).on("keypress", "#email_r", function() {
    console.log("Register Tab");
    $("#recruiterSubmit").addClass("bind-register-btn");
    $("#recruiterSubmit").removeClass("bind-login-btn");
    $(".error").text("");
  });

  $(document.body).on("keypress", "#loginEmail_r", function() {
    console.log("Register Tab");
    $("#recruiterSubmit").addClass("bind-login-btn");
    $("#recruiterSubmit").removeClass("bind-register-btn");
    $(".error").text("");
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
    var newCompanyName = "none";
    var newCompanyWebsite = "none";
    var newImage;

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
      companyname: newCompanyName,
      companywebsite: newCompanyWebsite,
      image: newImage
    };
    postRegistration(newRegistration, false);
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
    var newImage;

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
    postRegistration(newRegistration, true);
  });

  function postRegistration(newRegistration, isrecruiter) {
    console.log("postRegistration function");
    var userOktaId;

    $.post("/api/register", newRegistration).done(function(error, data) {
      console.log(data);
      if (data.hasOwnProperty('errorCauses')) {
        $(".error").text(error.errorCauses[0].errorSummary);
      } else {
        userOktaId = data.id;
        userLogin(newRegistration);
      }

      $('#registerModal').on('hidden.bs.modal', function() {
        console.log("reset form");
        $(this).find('form').trigger('reset');
        $(".error").text("");
      });
    }).
    then(function() {
      var newUser = {
        firstName: newFirstname,
        lastName: newLastname,
        isRecruiter: newIsRecruiter,
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
  }

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
          localStorage.setItem("id", transaction.user.id);
          localStorage.setItem("firstName", transaction.user.profile.firstName);
          var redirectURL;
          if(loginObj.userType === "recruiter"){
            redirectURL = 'https://immense-spire-42576.herokuapp.com/recruiter?token='+transaction.sessionToken+"&userid="+transaction.user.id+"&email="+loginObj.email+"&type="+loginObj.userType;
          } else {
            redirectURL = 'https://immense-spire-42576.herokuapp.com/authorizeduser?token='+transaction.sessionToken+"&userid="+transaction.user.id+"&email="+loginObj.email+"&type="+loginObj.userType;
          }
          sendUserInfo(transaction, loginObj.userType);
          authClient.session.setCookieAndRedirect(transaction.sessionToken, redirectURL);
        } else {
          throw 'We cannot handle the ' + transaction.status + ' status';
        }
      })
      .fail(function(err) {
        console.error(err);
        var errorMessage;
        if (err.errorCode === "E0000004") {
          errorMessage = "Invalid email or password.";
        } else {
          errorMessage = err.message;
        }
        $(".error").text(errorMessage);
      });
  }

  $( ".dropdown-content" ).find("p:first").text(localStorage.getItem("firstName"));

  function sendUserInfo(loginTransaction, userType){
    console.log("Line 79");
    console.log(loginTransaction);
    $(document.body).on("click", ".dropdown-content", function() {
      if(userType === "recruiter"){
        $("#firstname").val(data.firstName),
        $("#lastname").val(data.lastName),
        $("#email").val(data.email)
        $("#mobilephone").val(data.phoneNo),
        $("#companyname").val(data.companyName),
        $("#companysite").val(data.companySiteLink)
      } else {
        $("#firstname").val(data.firstName),
        $("#lastname").val(data.lastName),
        $("#email").val(data.email),
        $("#mobilephone").val(data.phoneNo)
      }
    });
  }

});
