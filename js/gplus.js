function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    console.log('Sign-in state: ' + authResult['error']); 
    console.log('Sign-in state: ' + authResult['status']);           
    console.log('hiding button...2');
    $('#signinButton').css('style', 'display: none');
  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}