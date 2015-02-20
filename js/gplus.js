function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    console.log('hiding button...2');
    $('#signinButton').css('style', 'display: none');
    // document.getElementById('signinButton').setAttribute('style', 'display: none');
    console.log('Sign-in state: ' + authResult['error']); 
	if (authResult['error'] == undefined){
        gapi.client.load('plus','v1', loadProfile);  // Trigger request to get the email address.
    } else {
        console.log('An error occurred');
    }


  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}

function loadProfile(){
    var request = gapi.client.plus.people.get( {'userId' : 'me'} );
    request.execute(loadProfileCallback);
}

function loadProfileCallback(obj) {
    profile = obj;
    email = obj['emails'].filter(function(v) {
        return v.type === 'account'; // Filter out the primary email
    })[0].value; // get the email from the filtered results, should always be defined.
    $('#name').html(email);
}