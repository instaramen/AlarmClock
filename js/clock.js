
var getTime = function() {
	//document.getElementById('clock').innerHTML = new Date().toLocaleTimeString();
	$('#clock').html(new Date().toLocaleTimeString());
	setTimeout(getTime, 1000);
}

var updateBackground = function(data) {
	var temp = data['daily'].temperatureMax; 
	var icon;

	if (temp < 60) icon = 'cold';
	else if (temp >= 90) icon = 'hot';
	else if (temp >= 80) icon = 'warm';
	else if (temp >= 70) icon = 'nice';
	else icon = 'chilly';

	$('body').addClass(icon);
}

var getTemp = function() {
	var key = '361ead2f6a85c726334fc78f16c74e19';
	var link = 'https://api.forecast.io/forecast/'+key+'/35.300399,-120.662362?callback=?';
	$(document).ready(function() {
		$.getJSON (link, function(data) {
			$('#forecastLabel').html(data['daily'].summary);			
			$('#forecastIcon').attr('src', 'img/'+data['daily'].icon+'.png');
			updateBackground(data);
		});
	});
}

var showAlarmPopup = function() {
	$('#mask').removeClass('hide');
	$('#popup').removeClass('hide');
}

var hideAlarmPopup = function() {
	$('#mask').addClass('hide');
	$('#popup').addClass('hide');
}

var insertAlarm = function(hours, mins, ampm, alarmName) {
	var newDiv = $('<div>').addClass('flexable');
	newDiv = newDiv.append('<div>').addClass('name').html(alarmName);
	newDiv = newDiv.append('<div>').addClass('time').html(hours+':'+mins+':'+ampm);
	$('#alarms').append(newDiv);
}

var addAlarm = function() {
	var h, m, ampm, name;
	h = $('#hours option:selected').text(); 
	m = $('#mins option:selected').text(); 
	ampm = $('#ampm option:selected').text(); 
	name = $('#alarmName').text();

	insertAlarm(h, m, ampm, name);
}

getTemp();
setTimeout(getTime, 1000);


