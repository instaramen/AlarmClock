function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    console.log('Sign-in state: ' + authResult['error']); 
    console.log('hiding button...4');
    // $('#signinButton').css('style', 'display: none');
    document.getElementById('signinButton').setAttribute('style', 'display: none');
  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}