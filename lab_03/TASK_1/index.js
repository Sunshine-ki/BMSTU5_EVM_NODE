"use strict";

// Основное отличие POST запросов от GET запросов:
// У POST запросов есть тело
// В методе POST параметры передаются не в URL, а в теле запроса.
// Оно указывается в вызове send(body).

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

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

	// Получение суммы чисел.
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




// "use strict";

// // импортируем библиотеку
// const express = require("express");

// // запускаем сервер
// const app = express();
// const port = 5000;
// app.listen(port);
// console.log(`Server on port ${port}`);

// // отправка статических файлов
// const way = __dirname + "/static";
// app.use(express.static(way));

// // заголовки в ответ клиенту
// app.use(function (req, res, next) {
// 	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
// 	res.header("Access-Control-Allow-Origin", "*");
// 	next();
// });

// // получение суммы чисел
// app.get("/sum", function (request, response) {
// 	const a = request.query.a;
// 	const b = request.query.b;
// 	const s = parseInt(a) + parseInt(b);
// 	response.end(JSON.stringify({
// 		result: s
// 	}));
// });