const ringtone = new Audio('GoodMorningRingtone.mp3');
let timerSet = false;	// true or false
let leftTime = 0;

function setAlarm() {
	let hour = document.getElementById('input_hour').value;
	let minute = document.getElementById('input_minute').value;
	let setTime;
		
	if(hour == "" && minute == "") {
		document.getElementById('p_alert').style.display = "block";
		document.getElementById('p_alert').innerHTML = "최소 1분 이상 입력해 주세요.";
	} else if(minute > 59) {
		document.getElementById('p_alert').style.display = "block";
		document.getElementById('p_alert').innerHTML = "최대 59분까지 입력 가능합니다.";
	} else if(hour < 0 || minute < 0) {
		document.getElementById('p_alert').style.display = "block";
		document.getElementById('p_alert').innerHTML = "음수는 입력할 수 없습니다.";
	} else {
		document.getElementById('p_alert').innerHTML = "";
		document.getElementById('p_alert').style.display = "none";

		timerSet = true;	// 타이머 설정

		if(hour == "") {
			hour = 00;
		}
		if(minute == "") {
			minute = 00;
		}

		/* 필요없는 엘리먼트 숨김 */
		let elements = document.getElementsByClassName('input');
		for(let i = 0; i < elements.length; i++) {
			elements[i].style.display = "none";
		}
		document.getElementById('btn_set_timer').style.display = "none";

		/* 숨겨져 있던 엘리먼트 표시 */
		elements = document.getElementsByClassName('alarm_on');
		for(let i = 0; i < elements.length; i++) {
			elements[i].style.display = "inline";
		}
		
		/* 타이머 초기값 표시 */
		document.getElementById('span_alarm_hour').innerHTML = hour;
		document.getElementById('span_alarm_minute').innerHTML = minute;
		document.getElementById('span_alarm_second').innerHTML = 60;

		/* 입력받은 시간을 밀리초로 변환 */
		setTime = hour * 60 * 60 * 1000;
		setTime = setTime + (minute * 60 * 1000);

		let d = new Date();
		let currentTime = d.getTime();	// 현재 시각(ms)
		let alarmTime = currentTime + setTime;	// 알람 시각(ms)
		leftTime = (alarmTime - currentTime) / 1000	// 남은 시간(s)

		countLeftTime();
	}	
}

function countLeftTime() {
	let counter = setTimeout(countLeftTime, 1000);
	if(leftTime == 0) {
		clearTimeout(counter);
		ringAlarm();
		timerSet = false;
	} else if(timerSet == false) {
		clearTimeout(counter);
	} else {
		leftTime--;

		/* 남은 시간 계산하여 출력 */
		let hour = Math.floor(leftTime / 60 / 60);
		let minute = Math.floor(leftTime/ 60);
		let second = leftTime - (hour * 60 * 60) - (minute * 60);
		
		minute = (minute < 10) ? "0" + minute : minute;
		second = (second < 10) ? "0" + second : second;

		document.getElementById('span_alarm_hour').innerHTML = hour;
		document.getElementById('span_alarm_minute').innerHTML = minute;
		document.getElementById('span_alarm_second').innerHTML = second;
	}
}

function ringAlarm() {
	ringtone.play();

	document.getElementById('btn_cancel_alarm').style.display = "none";
	document.getElementById('btn_alarm_off').style.display = "inline";
}

function resetAlarm() {
	timerSet = false;

	/* 엘리먼트 원상복구 */
	let elements = document.getElementsByClassName('input');
	for(let i = 0; i < elements.length; i++) {
		elements[i].style.display = "inline";
	}
	document.getElementById('btn_set_timer').style.display = "inline";

	elements = document.getElementsByClassName('alarm_on');
	for(let i = 0; i < elements.length; i++) {
		elements[i].style.display = "none";
	}
}

function stopAlarm() {
	ringtone.pause();
	ringtone.currentTime = 0;

	/* 엘리먼트 원상복구 */
	let elements = document.getElementsByClassName('input');
	for(let i = 0; i < elements.length; i++) {
		elements[i].style.display = "inline";
	}
	document.getElementById('btn_set_timer').style.display = "inline";

	elements = document.getElementsByClassName('alarm_on');
	for(let i = 0; i < elements.length; i++) {
		elements[i].style.display = "none";
	}
	document.getElementById('btn_alarm_off').style.display = "none";
}

function startClock() {
	let d = new Date();
	document.getElementById('p_current_time').innerHTML = getCurrentDate(d) + " " + getCurrentTime(d);
	setTimeout(startClock, 1000);
}

function getCurrentDate(d) {	
	let year = d.getFullYear();
	let month = d.getMonth();
	let date = d.getDate();
	let days = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
	let day = days[d.getDay()];

	month = (month < 10) ? "0" + month : month;
	date = (date < 10) ? "0" + date : date;

	return year + "년 " + month + "월 " + date + "일 " + day;
}

function getCurrentTime(d) {
	let ampm = "오전";
	let hour = d.getHours();
	let minute = d.getMinutes();
	let second = d.getSeconds();

	if(hour > 12) {
		ampm = "오후";
		hour = hour - 12;
	}

	minute = (minute < 10) ? "0" + minute : minute;
	second = (second < 10) ? "0" + second : second;

	return ampm + " " + hour + "시 " + minute + "분 " + second + "초";
}