"use strict";

const readlineSync = require('readline-sync');

const tasks = require("./tasks");
const constants = require("./constants");

function main() {
	console.log(constants.TASKS_TEXT)
	const answer = readlineSync.question(constants.GREEN + "\n\nTask: ");

	if (answer > 7 || answer < 1) {
		console.log(constants.RED + "Error. Bad number.")
		return;
	}

	tasks['task' + answer]()
}

main();