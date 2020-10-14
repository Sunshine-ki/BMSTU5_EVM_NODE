"use strict";

// Задание 2
// Создать сервер.
// В оперативной памяти на стороне сервера создать массив,
// в котором хранится информация о пользователях(логин, пароль, хобби, возраст).
// На основе cookie реализовать авторизацию пользователей.
// Реализовать возможность для авторизованного пользователя 
// просматривать информацию о себе.


// импортируем библиотеки
const express = require("express");
const cookieSession = require("cookie-session");
const fs = require("fs");

// Cookie - это набор переменных,
// передающихся при каждом HTTP запросе в формате ключ - значение

// Пытаемся войти с неправильным паролем:
// http://localhost:5000/api/sign_in?login=Alice&password=123
// Входим с правильным паролем:
// http://localhost:5000/api/sign_in?login=Alice&password=123456
// Получаем инфу о себе:
// http://localhost:5000/api/get_info
// Пытаемся еще раз авторизоваться 
// (Не получается, т.к. мы уже авторизованы):
// http://localhost:5000/api/sign_in?login=Nastya&password=654321
// Выходим из системы:
// http://localhost:5000/api/sign_out
// Пытаемся получить инфу о себе:
// http://localhost:5000/api/get_info
// Заходим через другого юзера:
// http://localhost:5000/api/sign_in?login=Nastya&password=654321
// Получаем инфу о себе:
// http://localhost:5000/api/get_info

function main() {
	// запускаем сервер
	const app = express();
	const port = 5000;
	app.listen(port);
	console.log(`Server on port ${port}`);

	// Работа с сессией.
	app.use(cookieSession({
		name: 'session',
		keys: ['hhh', 'qqq', 'vvv'],
		maxAge: 24 * 60 * 60 * 1000 * 365
	}));

	// Авторизация.
	// Принимает два параметра:
	// Логин и пароль.
	app.get("/api/sign_in", function (request, response) {
		// Если пользователь уже авторизован
		// То сообщаем ему об этом.
		if (request.session.login) {
			return response.end("You are sign in.");
		}

		// Получаем параметры запроса.
		const login = request.query.login;
		const password = request.query.password;

		// Проверяем существование.
		if (!login) return response.end("Login not set");
		if (!password) return response.end("password not set");


		// Если пользователь не авторизирован и 
		// Если такой пользователь есть в 
		// Нашем массиве, то выставляем для него cookie.
		const FILE_NAME = "data.json";
		const jsonString = fs.readFileSync(FILE_NAME, "utf-8");
		const obj = JSON.parse(jsonString);

		for (let i = 0; i < obj.length; i++) {
			if (obj[i].login === login && obj[i].password == password) {
				request.session.login = login;
				request.session.password = password;
				return response.end("Ok!");
			}
		}

		response.end("Invalid Login or password.");
	});

	// Получить данные.
	// Если пользователь авторизирован 
	// (Т.е. есть куки), то выдаем информацию о нем.
	app.get("/api/get_info", function (request, response) {
		// Получаем cookie пользователя.
		let login = request.session.login;
		let password = request.session.password;

		// Контролируем существование cookie.
		if (!login) return response.end("Not exists");
		if (!password) return response.end("Not exists");

		// Если пользователь авторизирован (cookie существуют)
		// То выдаем информацию о нем (из файла).
		const FILE_NAME = "data.json";
		const jsonString = fs.readFileSync(FILE_NAME, "utf-8");
		const obj = JSON.parse(jsonString);

		for (let i = 0; i < obj.length; i++) {
			if (obj[i].login === login && obj[i].password == password) {
				let answer = "Information:\nlogin:" + obj[i].login + "\nAge:" + obj[i].age +
					"\nHobby: " + obj[i].hobby;
				return response.end(answer);
			}
		}

		response.end("No information!");
	});

	// Выход из системы.
	app.get("/api/sign_out", function (request, response) {
		// Удалить все cookie.
		request.session = null;
		response.end("You are sign out!");
	});
}

main()


