function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    console.log('hiding button...')
    document.getElementById('#signinButton').setAttribute('style', 'display: none');
  } else {
    console.log('Sign-in state: ' + authResult['error']);
    document.getElementById('#signinButton').setAttribute('style', 'display: show');    
  }
}