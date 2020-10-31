"use strict";

// Запуск:
// npm start 1 2 3 4 5 6 7 8 9

// импортируем библиотеку
const execSync = require('child_process').execSync;

// Начиная со второго аргумента
// Идут наши параметры (ранее пути идут)
const MY_ARG = 2
const OPTIONS = { encoding: 'utf8' };

// Функция, для считывания аргументов
// Переданных в командной строке.
function readArgv(array) {
	let i = MY_ARG;

	while (process.argv[i])
		array.push(parseInt(process.argv[i++]));

	return array;
}

// Функция, вызывающая дочерний процесс
// Для каждого элемента из массива array.
// Дочерний процесс в свою очередь
// Считает факториал числа.
function arrayFactorial(array) {
	let cmd;

	for (let i in array) {
		// console.log(array[i]);
		cmd = `node factorial ${array[i]}`
		console.log(execSync(cmd, OPTIONS))
	}
}


function main() {
	let array = [];
	readArgv(array);
	arrayFactorial(array);
}

main();