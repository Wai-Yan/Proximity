$(document).ready(function() {
  var authClient = new OktaAuth({
    url: 'https://dev-975345.oktapreview.com',
    clientId: '0oaebzwcf9OKAHbHh0h7',
    redirectUri: 'http://localhost:8080'
  });

  authClient.signOut()
    .then(function() {
      console.log('successfully logged out');
      window.location.href = 'http://localhost:8080';
    })
    .fail(function(err) {
      console.error(err);
      window.location.href = 'http://localhost:8080';
    });

  localStorage.clear();
});
