var redirect_init = function() {
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

	$.ajax({
            url: 'https://api.imgur.com/3/me',
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + params.access_token,
              Accept: 'application/json'
            },
            data: {
              image: localStorage.imageBase64,
              type: 'base64'
            },
            success: function(result) {
              alert(result);
            }
    });

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
}

$(document).ready(function() {
	redirect_init();
});