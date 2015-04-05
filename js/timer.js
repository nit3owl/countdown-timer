var hoursText = document.getElementById('hours');
var minutesText = document.getElementById('minutes');
var secondsText = document.getElementById('seconds');
var startStop = document.getElementById('startStop');
var seconds = 0;
var minutes = 0;
var hours = 0;
var interval;

function count() {
	seconds--;
	if(seconds < 1){
		seconds = 59;
		minutes--;
		if(minutes < 0){
			minutes = 59;
			hours--;
			if(hours < 0){
				resetTimer();
				startStop.onclick = resetTimer;
				$(".btn-default").prop('disabled', true);							
				interval = setInterval(expired, 1000);
			}
			else
				hoursText.innerHTML = hours <= 9 ? "0" + hours : hours;
		}
		minutesText.innerHTML = minutes <= 9 ? "0" + minutes : minutes;
	}
	secondsText.innerHTML = seconds <= 9 ? "0" + seconds : seconds;
}
function startTimer(e) {
	$(".startStopBtn").blur();
	$(".btn-default").prop('disabled', true);							
	startStop.onclick = stopTimer;
	if(seconds > 59){
		seconds = seconds % 60;
		secondsText.innerHTML = seconds <= 9 ? "0" + seconds : seconds;
		minutes++;
		minutesText.innerHTML = minutes <= 9 ? "0" + minutes : minutes;
	}
	if(minutes > 59){
		minutes = minutes % 60;
		minutesText.innerHTML = minutes <= 9 ? "0" + minutes : minutes;
		hours++;
		hoursText.innerHTML = hours <= 9 ? "0" + hours : hours;
	}
	interval = setInterval(count, 1000);
}
function stopTimer(){
	$(".startStopBtn").blur();
	clearInterval(interval);
	startStop.onclick = startTimer;
}

function resetTimer () {
	$(".startStopBtn").blur();
	stopTimer();
	hours = 0;
	minutes = 0;
	seconds = 0;
	hoursText.innerHTML = "00";
	minutesText.innerHTML = "00";
	secondsText.innerHTML = "00";
	$("#time").removeClass("expired");
	$(".btn-default").prop('disabled', false);
}
function expired(){		
	$("#time").toggleClass("expired");
}

$(document).ready(function(){
	$(".btn-default").click(function(){
		var that = $(this);
		
		seconds = seconds * 10 + parseInt(that.val());
		tsec = Math.floor(seconds / 100);
		seconds = seconds % 100;
		minutes = minutes * 10 + tsec;
		tmin = Math.floor(minutes / 100);
		minutes = minutes % 100;
		if((hours * 10 + tmin) > 99 ){								
			hours = hours % 100;
		}
		else{		
			hours = hours * 10 + tmin;
		}
		if(hours > 9)
			$(".btn-default").prop('disabled', true);							
		
		secondsText.innerHTML = seconds <= 9 ? "0" + seconds : seconds;
		minutesText.innerHTML = minutes <= 9 ? "0" + minutes : minutes;
		hoursText.innerHTML = hours <= 9 ? "0" + hours : hours;
	});

	$(":button").click(function(){
		$(":button").blur();
	});
});	
