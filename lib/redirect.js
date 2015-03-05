var redirect_init = function() {
	var access_token = '';
	var expires_in;
	var token_type;
	var refresh_token;
	var account_username;

	// First, parse the query string
	var params = {}, queryString = location.hash.substring(1),
	    regex = /([^&=]+)=([^&]*)/g, m;
	while (m = regex.exec(queryString)) {
	  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	// And send the token over to the server
	var req = new XMLHttpRequest();
	// consider using POST so query isn't logged
	req.open('GET', 'https://' + window.location.host + '/catchtoken?' + queryString, true);
	req.onreadystatechange = function (e) {
	  if (req.readyState == 4) {
	     if(req.status == 200){ 
	       window.location = params['state'];
	       window.open('https://api.imgur.com/3/account/me');
	   	 }
	  	 else if(req.status == 400) {
	     	alert('There was an error processing the token.')
		 }
	  	else {
	    	alert('something else other than 200 was returned')
	  	}
	  }
	};
	req.send(null);

	access_token = params.access_token;	
	expires_in = params.expires_in;
	token_type = params.token_type;
	refresh_token = params.refresh_token;
	account_username = params.account_username;

	$.get('https://api.imgur.com/3/account/'+account_username, function(acct) {
		alert(acct);
	});
}

$(document).ready(function() {
	redirect_init();
});