function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    console.log('hiding button...0');
    // $('#signinButton').css('style', 'display: none');
    document.getElementById('signinButton').setAttribute('style', 'display: none');
    console.log('Sign-in state: ' + authResult['error']); 

  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}