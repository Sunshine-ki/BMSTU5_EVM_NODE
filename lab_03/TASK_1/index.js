"use strict";

// Основное отличие POST запросов от GET запросов:
// У POST запросов есть тело
// В методе POST параметры передаются не в URL, а в теле запроса.
// Оно указывается в вызове send(body).

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

const ENCODING = "utf-8"

// Запуск:
// http://localhost:5000/page.html

function main() {
	// Запускаем сервер.
	const app = express();
	const port = 5000;
	app.listen(port);
	console.log(`Server on port ${port}`);

	// Отправка статических файлов.
	const way = __dirname + "/static";
	app.use(express.static(way));

	// Получение информации.
	// Это GET запрос он получает 
	// В url некоторые аргументы.
	// Не имеет тела.
	app.get("/find", function (request, response) {

		// TODO: Тут открыть файл, найти человека
		// (Или не найти) и вернуть найденное значение 
		// (или сообщение, что человека нет).

		console.log("Я как бы тут")

		const mail = request.query.mail;

		response.end(JSON.stringify({
			result: mail
		}));
	});

	app.get("/get_info", (_request, response) => {
		const fileContent = fs.readFileSync("static/" + "get_info.html", ENCODING);
		response.end(fileContent);
	});


	// body
	// Тут получаем данные тела.
	function loadBody(request, callback) {
		let body = [];
		request.on('data', (chunk) => {
			body.push(chunk);
		}).on('end', () => {
			body = Buffer.concat(body).toString();
			callback(body);
		});
	}

	// it is post
	app.post("/save/info", function (request, response) {
		loadBody(request, function (body) {

			const obj = JSON.parse(body);

			// TODO: тут сделать проверку на уникальность
			// И результатом отправлять "Добавилось" или "Не добавилось"
			// + css пофиксить 

			const mail = obj["mail"];
			const surname = obj["surname"];
			const phone_number = obj["phone_number"];

			// console.log("Я тут " + a + " " + b + " " + c)

			const contentString = `A: ${mail} B: ${surname} C: ${phone_number}`;
			fs.writeFileSync("file.txt", contentString);
			response.end(JSON.stringify({
				result: "Save content ok"
			}));
		});
	});
}


main();