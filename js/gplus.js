function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    // Update the app to reflect a signed in user
    console.log('Sign-in state: ' + authResult['error']);    
    console.log('hiding button...2');
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}