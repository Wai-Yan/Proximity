$(document).ready(function() {
  $(document.body).on("click", "#loginModal #oktaLogin", function() {
    console.log("I'm here login");
    var newEmail = $("#loginModal #loginEmail").val().trim();
    var newPassword = $("#loginModal #loginPassword").val().trim();

    var newLogin = {
      email: newEmail,
      password: newPassword,
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
    };

    userLogin(newLogin);
  });


  function userLogin(loginObj) {
    // Bootstrap the AuthJS Client
    var authClient = new OktaAuth({
      url: 'https://dev-975345.oktapreview.com',
      clientId: '0oaebzwcf9OKAHbHh0h7',
      redirectUri: 'http://localhost:8080/authorizeduser'
    });
    // Attempt to retrieve ID Token from Token Manager
    var idToken = authClient.tokenManager.get('idToken');
    console.log("idToken " + idToken);
    // If ID Token exists, return it in console.log
    if (idToken) {
      console.log(`hi ${idToken.claims.email}!`);

      // If ID Token isn't found, try to parse it from the current URL
    } else if (location.hash) {
      authClient.token.parseFromUrl()
        .then(idToken => {
          console.log(`hi ${idToken.claims.email}!`);
          // Store parsed token in Token Manager
          authClient.tokenManager.add('idToken', idToken);
          console.log(idToken);
        });
    } else {
      // You're not logged in, you need a sessionToken
      var username = loginObj.email;
      var password = loginObj.password;

      authClient.signIn({
          username,
          password
        })
        .then(res => {
          console.log(res);
          if (res.status === 'SUCCESS') {
            authClient.token.getWithRedirect({
              sessionToken: res.sessionToken,
              responseType: 'id_token'
            });
          }
        });
    }
  }

  

});
