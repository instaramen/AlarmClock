function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    console.log('Sign-in state: ' + authResult['error']);    
    console.log('hiding button...5')
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    $('logoutButton').removeClass('hide');    
  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}

function render() {
  var clientid = '309685935001-h38m2dmetejda1pj7992jifqla67a78e';

  var additionalParams = {
    'clientid' : clientid + '.apps.googleusercontent.com',
    'scope' : 'https://www.googleapis.com/auth/plus.login',
    'requestvisibleactions' : 'http://schema.org/AddAction',
    'cookiepolicy' : 'single_host_origin',
    'callback' : 'signinCallback',
    'theme': 'dark'
  };

  gapi.signin.render('signinButton', additionalParams);
}