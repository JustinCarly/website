const countdown = require('countdown');
// import countdown from 'countdown';

export default class CountdownController {
	constructor() {
		//this.countdown = countdown;
		this.countDownDateISO = "2018-03-29T00:12:04Z"; //Date in UTC Time,
		this.clockRunning = false;
		this.clockPlaceholder;
		this.finishedCountdownText = "The Countdown has finished";
		this.targetDate = new Date(this.countDownDateISO);
		this.clock = null;
		this.process();
	}
	
	process() {
		$(document).ready(() => {
			this.clockPlaceholder = $("#clock-placeholder"); //Wait until document loaded to set this
			this.startCountdown();
		});
	}
	updateClock() {
		const cd = countdown(this.targetDate, null, countdown.DAYS | countdown.HOURS | countdown.MINUTES | countdown.SECONDS, 4);
		//Use this with odometer later and some styling to make it prettier.
		this.clockPlaceholder.text(cd.toString() + ' until ICO sale begins!');
		if (this.isCountdownEnd()) {
			this.endCountdown();
		}
	}
	
	startCountdown() {
		if (this.clockRunning === false) {
			if (this.isCountdownEnd()){
				this.endCountdown();
			}
			else {
				// start clock
				this.clock = setInterval(this.updateClock.bind(this), 1000);
				this.clockRunning = true;
			}
		}
	}
	
	endCountdown() {
		this.clockPlaceholder.text(this.finishedCountdownText);
		clearInterval(this.clock);
		this.clockRunning = false;
	}
	
	isCountdownEnd(){
		if (this.targetDate.getTime() < (new Date()).getTime()) {
			return true;
		}
		return false;
	}
}