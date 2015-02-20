function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    console.log('hiding button...4');
    $('#signinButton').css('style', 'display: none');
    // document.getElementById('signinButton').setAttribute('style', 'display: none');
    console.log('Sign-in state: ' + authResult['error']); 
	if (authResult['error'] == undefined){
        gapi.client.load('plus','v1');  // Trigger request to get the email address.
    } else {
        console.log('An error occurred');
    }


  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}