"use strict";

// импорт библиотеки
const express = require("express");
const fs = require("fs");


// запускаем сервер
const app = express();
const port = 5002;
app.listen(port);
console.log("Server on port " + port);

// заголовки для ответа
app.use(function (req, res, next) {
	res.header("Cache-Control", "no-cache, no-store, must-revalidate");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header("Access-Control-Allow-Origin", "*");
	next();
});

// загрузка тела
function loadBody(request, callback) {
	let body = [];
	request.on('data', (chunk) => {
		body.push(chunk);
	}).on('end', () => {
		body = Buffer.concat(body).toString();
		callback(body);
	});
}

// приём запроса
app.post("/insert/record", function (request, response) {
	loadBody(request, function (body) {
		const obj = JSON.parse(body);
		const type = obj.type;
		const price = obj.price;

		const fileName = "data.json";
		// Открываем файл и парсим.
		const objInfo = fs.readFileSync(fileName, "utf-8");
		const infoJson = JSON.parse(objInfo);
		infoJson.push({ type, price })
		fs.writeFileSync(fileName, JSON.stringify(infoJson, null, 4));

		const s = 4;
		response.end(JSON.stringify({
			answer: s
		}));
	});
});