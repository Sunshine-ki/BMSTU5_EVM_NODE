"use strict";

const fs = require("fs");

const express = require("express");

const path = require("path");

const ENCODING = "utf-8"

function LoadPage(app, path, file_name) {
	app.get(path, (request, response) => {
		const fileContent = fs.readFileSync(file_name, ENCODING);
		response.end(fileContent);
	});
}

function task1(app) {
	LoadPage(app, "/compare", "compare.html");

	app.get("/compare/result", (request, response) => {
		const a = request.query.a;
		const b = request.query.b;
		const c = request.query.c;

		const aInt = parseInt(a);
		const bInt = parseInt(b);
		const cInt = parseInt(c);

		if (!aInt || !bInt || !cInt) {
			response.end("Input error!");
			return;
		}

		const sInt = Math.max(aInt, bInt, cInt);

		response.end("Maximum number: " + sInt);
	});
}

function task2(app) {
	LoadPage(app, "/array_object", "array_object.html");

	app.get("/array_object/result", (request, response) => {
		const index = request.query.index;
		const indexInt = parseInt(index);
		if (!indexInt) {
			response.end("Input error!");
			return;
		}

		const PATH = path.join(__dirname, "..", "data", "task2.json");

		const array = JSON.parse(fs.readFileSync(PATH));

		if (indexInt < 0 || indexInt > array.length) {
			response.end("Index input error!");
			return;
		}

		response.end("Index = " + indexInt + "\nelement = " + array[indexInt - 1]);
	});
}

function task3(app) {
	LoadPage(app, "/generate_html", "generate_html.html");

	app.get("/generate_html/result", (request, response) => {
		const field_names = request.query.field_names;
		const address = request.query.address;

		response.end("field_names = " + field_names);
	});

}

function task4(app) {
	LoadPage(app, "/number_array", "number_array.html");

	app.get("/number_array/result", (request, response) => {
		const a = request.query.a;
		const b = request.query.b;
		const c = request.query.c;

		const aInt = parseInt(a);
		const bInt = parseInt(b);
		const cInt = parseInt(c);

		if (!aInt || !bInt || !cInt) {
			response.end("Input error!");
			return;
		}

		if (cInt < 0) {
			response.end("C must be positive!");
			return;
		}

		// s = ['aaa','bbb','ccc'].join(''); Это по памяти лучше
		// let num = cInt;
		// let result = "";
		// let step = cInt;

		// while (num < aInt)
		// 	num += step;

		// while (num <= bInt) {
		// 	result = result + num + " ";
		// 	num += step;
		// }

		let result = "";
		for (let num = aInt; num <= bInt; num++) {
			if (!(num % cInt)) {
				result = result + num + " ";
			}
		}

		response.end(result);
	});
}



function main() {
	const MAIN_FILE_NAME = "index.html"
	const app = express();
	const port = 5015;
	app.listen(port);

	LoadPage(app, "/", MAIN_FILE_NAME);

	task1(app);
	task2(app);
	task3(app);
	task4(app);

}

main();
