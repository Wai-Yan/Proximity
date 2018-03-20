//Get data from front end and connect to OKTA create users APIs in routes folder
$(document).ready(function() {
  $(document.body).on("click", "#loginModal #oktaLogin", function() {
    console.log("I'm here login");
    var newEmail = $("#loginModal #loginEmail").val().trim();
    var newPassword = $("#loginModal #loginPassword").val().trim();

    var newLogin = {
      email: newEmail,
      password: newPassword,
    };

    // Bootstrap the AuthJS Client
    var authClient = new OktaAuth({
      url: 'https://dev-975345.oktapreview.com',
      clientId: '0oaebzwcf9OKAHbHh0h7',
      redirectUri: 'http://localhost:8080/authorizeduser'
    });
    // Attempt to retrieve ID Token from Token Manager
    var idToken = authClient.tokenManager.get('idToken');
    console.log("Line 22" + idToken);
    // If ID Token exists, return it in console.log
    if (idToken) {
      console.log(`hi ${idToken.claims.email}!`);

      // If ID Token isn't found, try to parse it from the current URL
    } else if (location.hash) {
      console.log("Line 28");
      authClient.token.parseFromUrl()
        .then(idToken => {
          console.log(`hi ${idToken.claims.email}!`);
          // Store parsed token in Token Manager
          authClient.tokenManager.add('idToken', idToken);
          console.log(idToken);
        });
    } else {
      // You're not logged in, you need a sessionToken
      var username = newEmail;
      var password = newPassword;
      console.log("Line 38");

      authClient.signIn({
          username,
          password
        })
        .then(res => {
          console.log(res);
          if (res.status === 'SUCCESS') {
            authClient.token.getWithRedirect({
              sessionToken: res.sessionToken,
              responseType: 'id_token',
            });
          }
        });
    }
  });
});
