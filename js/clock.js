function signinCallback(authResult) {
  if (authResult['status']['signed_in']) {
    console.log('hiding button.. 3');
    console.log('Sign-in state: ' + authResult['error']); 
	$('#signinButton').hide();
    // var userId = '';
    // var myurl = "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=".concat(authResult.access_token);
    // var request1 = $.ajax({
    //     url: myurl,
    //     dataType: 'json'
    // });

    // request1.done(function(obj) {
    // 	var id = '309685935001-7t5gfbl8rabtm5am296j9n4ajkjffb9n.apps.googleusercontent.com';
    	
    // 	if (obj.audience == id) userId = obj.userId;
    // 	$('#signinButton').hide();
    // });

    // myurl = "https://www.googleapis.com/plus/v1/people/" + userId + "?access_token=" + authResult.access_token;
    // var request2 = $.ajax({
    //     url: myurl,
    //     dataType: 'json'
    // });
    
    // request2.done(function(obj) {
    //     $('#signinButton').append("Hello " + obj.displayName);
    // });

  } else {
    console.log('Sign-in state: ' + authResult['error']);
  }
}

var getTime = function() {
	//document.getElementById('clock').innerHTML = new Date().toLocaleTimeString();
	$('#clock').html(new Date().toLocaleTimeString());
	setTimeout(getTime, 1000);
}

var updateBackground = function(data) {
	var temp = data['daily']['data'][0]['temperatureMax']; 
	var icon;

	if (temp < 60) icon = 'cold';
	else if (temp >= 90) icon = 'hot';
	else if (temp >= 80) icon = 'warm';
	else if (temp >= 70) icon = 'nice';
	else icon = 'chilly';

	$('body').addClass(icon);

	console.log("Today's Max Temperature: " + temp);
}

var showAlarmPopup = function() {
	$('#mask').removeClass('hide');
	$('#popup').removeClass('hide');
}

var hideAlarmPopup = function() {
	$('#mask').addClass('hide');
	$('#popup').addClass('hide');
}

var deleteAlarm = function(event) {
    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.get(event.data.id, {
        success: function(result) {
           result.destroy({});
           $('#'+event.data.id).remove();
        },
    });
}

var insertAlarm = function(hours, mins, ampm, alarmName, id) {
	var newDiv = $('<div>').addClass('flexable');
	var nameDiv = $('<div>'+alarmName+'</div>').addClass('name');
	var timeDiv = $('<div>'+hours+':'+mins+':'+ampm+'</div>').addClass('time');
	var del = $("<input type='button' value='x' class='deletion''>").click({id: id}, deleteAlarm);
	newDiv.attr('id', id);

	newDiv.append(nameDiv);
	newDiv.append(timeDiv);
	newDiv.prepend(del);

	$('#alarms').append(newDiv);
}

var addAlarm = function() {
	var h, m, ampm, name;
	h = $('#hours option:selected').text(); 
	m = $('#mins option:selected').text(); 
	ampm = $('#ampm option:selected').text(); 
	name = $('#alarmName').val();

	var AlarmObject = Parse.Object.extend("Alarm");
    var alarmObject = new AlarmObject();
    alarmObject.save({"hours": h, 'mins': m, 'ampm': ampm, "alarmName": name}, {
        success: function(object) {
            insertAlarm(h, m, ampm, name, alarmObject.id);
            hideAlarmPopup();
        }
    });	
}

var getAllAlarms = function() {
	Parse.initialize('XKz9LmIyfMKHCM5QSiQdWGcx2neaOjF8AhNI2me9',
	 'bXQ318Qh1rxSmjO3ukb25kYCeiolsi8lC8tQnMTq');	

    var AlarmObject = Parse.Object.extend("Alarm");
    var query = new Parse.Query(AlarmObject);
    query.find({
        success: function(results) {
          for (var i = 0; i < results.length; i++) { 
             insertAlarm(results[i].get('hours'), results[i].get('mins'), results[i].get('ampm'), results[i].get('alarmName'), results[i].id);
          }
        }
    });
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
		getAllAlarms();
	});
}

getTemp();
setTimeout(getTime, 1000);


