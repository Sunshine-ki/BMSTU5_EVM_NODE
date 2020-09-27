"use strict"

const TIME_FIRST = 2000
const TIME_SECOND = 1000

function timer() {
	let a = 1;

	let funcFirst = () => {
		console.log(a++);
		if (a > 10) {
			clearInterval(interval1);
			interval2 = setInterval(funcSecond, TIME_SECOND)
		}
	}

	let funcSecond = () => {
		console.log(a++);
		if (a > 20) {
			clearInterval(interval2);
			a = 1;
			interval1 = setInterval(funcSecond, TIME_FIRST)
		}
	}

	let interval1 = setInterval(funcFirst, TIME_FIRST), interval2;
}

module.exports = { timer };