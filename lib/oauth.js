var client_id = '7a1dbeba7d10442';
var client_secret = '4b93a0d12254004f1f475c00a155ab73e9c8b70d';

var imgur = 'https://api.imgur.com/oauth2/authorize?client_id=7a1dbeba7d10442&response_type=token&state=1234';
var oauth;

var init = function(auth) {
	oauth = auth;
}

var login = function() {
	$.get(imgur, function(data) {
		console.log("callback_function here");
		// window.open(imgur);
		window.open('https://api.imgur.com/3/account/me');
	});
}

$(document).ready(function() {
    init({'client_id':client_id, 'type':'token', 'callback':login});
});