var redirect_init = function() {
	// First, parse the query string
	var params = {}, queryString = location.hash.substring(1),
	    regex = /([^&=]+)=([^&]*)/g, m;
	while (m = regex.exec(queryString)) {
	  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	$.ajax({
            url: 'https://api.imgur.com/3/account',
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
}

$(document).ready(function() {
	redirect_init();
});