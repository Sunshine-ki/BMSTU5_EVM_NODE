"use strict";

// Основное отличие POST запросов от GET запросов:
// У POST запросов есть тело
// В методе POST параметры передаются не в URL, а в теле запроса.
// Оно указывается в вызове send(body).

// импортируем необходимые библиотеки
const express = require("express");
const fs = require("fs");

const ENCODING = "utf-8"
const fileName = "data/user.json";

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
		const mail = request.query.mail;
		let res = "Нет информации.";

		// Открываем файл и парсим.
		const objInfo = fs.readFileSync(fileName, "utf-8");
		const infoJson = JSON.parse(objInfo);

		// Проверяем наличие.
		for (let i in infoJson) {
			if (mail == infoJson[i].mail) {
				res = infoJson[i];
				break;
			}
		}

		response.end(JSON.stringify({
			result: JSON.stringify(res)
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
			// Файл, содержащий бд пользователей.

			// Получаем данные.
			const obj = JSON.parse(body);
			const mail = obj["mail"];
			const surname = obj["surname"];
			const phone_number = obj["phone_number"];

			// TODO: Ссылка на страницу назад!!!!!!!!!

			// Открываем файл и парсим.
			const objInfo = fs.readFileSync(fileName, "utf-8");
			const infoJson = JSON.parse(objInfo);

			// true - нужно добавить.
			// false - уже имеется юзер.
			let flag = true;
			// Текст, который увидит пользователь.
			let text = "";

			// Проверяем уникальность.
			for (let i in infoJson) {
				if (mail == infoJson[i].mail) {
					flag = false;
					text = "Данная почта уже имеется в системе!"
					break;
				}
				if (phone_number == infoJson[i].phone_number) {
					flag = false;
					text = "Данный номер уже имеется в системе!"
					break;
				}
			}

			// Если уникальный, добавляем в нашу БД.
			// И меняем сообщение на то, что инфа добавлена.
			if (flag) {
				infoJson.push({ mail, surname, phone_number })
				fs.writeFileSync(fileName, JSON.stringify(infoJson, null, 4));
				text = "Информация успешно добавлена!"
			}

			// Ответ запроса.
			response.end(JSON.stringify({
				result: text
			}));
		});
	});
}


main();