var redirect_init = function() {
	// First, parse the query string
	var params = {}, queryString = location.hash.substring(1),
	    regex = /([^&=]+)=([^&]*)/g, m;
	while (m = regex.exec(queryString)) {
	  params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	$.ajax({
      url: 'https://api.imgur.com/3/account/me',
      method: 'GET',
      headers: {
         Authorization: 'Bearer ' + params.access_token,
         Accept: 'application/json'
      },
      success: function(result) {
         window.opener.updateImgur(result.data.url);
         window.close();
      },
      error: function(error) {
         alert("Failed: " + error.data.error);
      }
    });
}

$(document).ready(function() {
	redirect_init();
});