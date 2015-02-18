function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    console.log('hiding button...')
    $('#signinButton').attr('style', 'display: none');
  } else {
    console.log('Sign-in state: ' + authResult['error']);
    $('#signinButton').attr('style', 'display: show');    
  }
}