var x = 0;
var device = 0;
var timer = 0;
var timerInterval;
var time = document.querySelector('.timer');

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i
    .test(navigator.userAgent)) {

    document.querySelector(".help").innerHTML = "Tap the screen to start, stop or restart the timer";
    document.querySelector(".help").style.bottom = "150px";
    device = 1;
}

document.querySelector("body").onclick = function() {
  if (device === 1) {
		if(x === 0) {
			x = 1;
			start();
		}
		else if (x == 1) {
			x = 2;
			stop();
		}
		else {
			x = 0;
			timer = 0;
			time.innerHTML = "00:00:00:000";
		}
	}
}

document.addEventListener('keydown', function(e) {
	if (e.which === 32 && device === 0) {
		if(x === 0) {
			x = 1;
			start();
		}
		else if (x == 1) {
			x = 2;
			stop();
		}
		else {
			x = 0;
			timer = 0;
			time.innerHTML = "00:00:00:000";
		}
	}
});

function start() {
  stop();
  timerInterval = setInterval(function() {
  timer += 1/60;
  msVal = Math.floor((timer - Math.floor(timer))*1000);
  secondVal = zero_first_format(Math.floor(timer) - Math.floor(timer/60) * 60);
  minuteVal = zero_first_format(Math.floor(timer/60)%60);
  hourVal = zero_first_format(Math.floor(timer/60/60));
  time.innerHTML = hourVal + ":" + minuteVal + ":" + secondVal + ":"+msVal;
  }, 1000/60);
}

function stop() {
  clearInterval(timerInterval);
}

function zero_first_format(value)
{
	if (value < 10)
	{
		value='0'+value;
	}
	return value;
}

function date_time()
{
	var current_datetime = new Date();
	var hours = zero_first_format(current_datetime.getHours());
	var minutes = zero_first_format(current_datetime.getMinutes());
	var seconds = zero_first_format(current_datetime.getSeconds());

	return hours + ":" + minutes + ":" + seconds;
}

function date_day() {
	var current_datetime = new Date();
	var hours = current_datetime.getHours();

	if(hours >= 22 || hours < 6) {
		return "Night";
	} else {
		return "Day";
	}
}

setInterval(function () {
        document.querySelector(".time").innerHTML = date_time();
        document.querySelector(".day").innerHTML = date_day();
}, 1000);