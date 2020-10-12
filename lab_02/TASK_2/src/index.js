"use strict";

const path = require("path");
const tasks = require("./tasks");
const express = require("express");

// const { nextTick } = require("process");


function main() {
	const MAIN_FILE_NAME = "index.html"
	const app = express();
	const port = 5015;
	app.listen(port);

	app.use(express.static(path.join(__dirname, '..', 'public')));

	tasks.LoadPage(app, "/", MAIN_FILE_NAME);

	// for (let i = 1; i <= 4; i++)
	// 	tasks['task' + i]()
	console.log(`Server on port ${port}`);

	tasks.task1(app);
	tasks.task2(app);
	tasks.task3(app);
	tasks.task4(app);
}

main();
