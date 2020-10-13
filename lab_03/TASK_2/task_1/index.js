"use strict";

// Импорт библиотек.
const express = require("express");
// Импорт библиотеки для работы с файлами.
const fs = require("fs");

// Задание 1:
// Создать сервер.
// В оперативной памяти на стороне сервера
// создать массив, в котором хранится информация о
// компьютерных играх(название игры, описание игры, 
// возрастные ограничения).
// Создать страницу с помощью шаблонизатора.
// В url передаётся параметр возраст(целое число).
// Необходимо отображать на этой странице только те игры,
// у которых возрастное ограничение меньше, чем переданное в url значение.

// Запуск:
// http://localhost:5000/page/pupils?age=10


function main() {
	// запускаем сервер
	const app = express();
	const port = 5000;
	app.listen(port);
	console.log(`Server on port ${port}`);

	// Активируем шаблонизатор.
	app.set("view engine", "hbs");

	// Выдаем страницу с массивом игр, у которых возрастное
	// Ограничение младше, чем то, которое передано в url.
	app.get("/page/pupils", function (request, response) {
		// Получаем возраст,введенный пользователем из url.
		let age = request.query.age;
		age = parseInt(age);
		// Если корявый url пришел, сообщаем обо этом и выходим из метода.
		if (!age) {
			response.end("Age input error!");
			return
		}

		// Открываем файл с играми.
		const FILE_NAME = __dirname + "/game.json";
		const contentFile = fs.readFileSync(FILE_NAME, "utf-8");
		const gamesArray = JSON.parse(contentFile);
		// Создаем результирующий массив,
		// В котором будут удовлетворяющие условию игры. 
		const resultArray = [];

		// Пробегаемся по всем имеющимся играм.
		for (let i = 0; i < gamesArray.length; i++) {
			// Если удовлетворяет условию 
			// Добавляем в результурующий массив.
			if (gamesArray[i].age_limit < age)
				resultArray.push(gamesArray[i])
		}
		// Создаем объект, которые подставится в шаблонизатор.
		const infoObject = {
			// Описание.
			descriptionValue: "Games list:",
			// Массив игр.
			gamesArray: resultArray
		};

		response.render("pageGames.hbs", infoObject);
	});
}

main()