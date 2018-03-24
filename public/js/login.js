$(document).ready(function() {
  $(".error").text("");

  $(document.body).on("keypress", "#loginEmail", function() {
    $(".error").text("");
  });

  $(document.body).on("keypress", "#loginPassword", function() {
    $(".error").text("");
  });

  $(document.body).on("click", "#registerbtn", function() {
    $(".error").text("");
  });

  $(document.body).on("click", "#loginbtn", function() {
    $(".error").text("");
  });

  $(document.body).on("click", "#recruiter-btn", function() {
    $(".error").text("");
  });

  $(document.body).on("click", "#loginModal #oktaLogin", function() {
    console.log("I'm here login");
    var newEmail = $("#loginModal #loginEmail").val().trim();
    var newPassword = $("#loginModal #loginPassword").val().trim();

    var newLogin = {
      email: newEmail,
      password: newPassword,
      userType: "jobsearcher"
    };

    userLogin(newLogin);
  });

  $(document.body).on("click", "#recruiterModal #recruiterSubmit", function() {
    console.log("recruiter login");
    var newEmail = $("#recruiterModal #loginEmail_r").val().trim();
    var newPassword = $("#recruiterModal #loginPassword_r").val().trim();

    var newLogin = {
      email: newEmail,
      password: newPassword,
      userType: "recruiter"
    };

    userLogin(newLogin);
  });

  function userLogin(loginObj) {
    var authClient = new OktaAuth({
      url: 'https://dev-975345.oktapreview.com',
      clientId: '0oaebzwcf9OKAHbHh0h7'
    });

    authClient.signIn({
        username: loginObj.email,
        password: loginObj.password
      })
      .then(function(transaction) {
        console.log(transaction);
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
        if(err.errorCode === "E0000004"){
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

  function getUserID(newLogin) {
    console.log("In User ID");
    console.log(newLogin);
    $.ajax({
      method: "GET",
      url: "/api/login",
      data: newLogin
    });
  }

});
