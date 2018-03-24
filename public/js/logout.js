$(document).ready(function() {
  var authClient = new OktaAuth({
    url: 'https://dev-975345.oktapreview.com',
    clientId: '0oaebzwcf9OKAHbHh0h7',
    redirectUri: 'https://immense-spire-42576.herokuapp.com/'
  });

  authClient.signOut()
    .then(function() {
      console.log('successfully logged out');
      window.location.href = 'https://immense-spire-42576.herokuapp.com/';
    })
    .fail(function(err) {
      console.error(err);
      window.location.href = 'https://immense-spire-42576.herokuapp.com/';
    });

  localStorage.clear();
});
