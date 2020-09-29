"use strict";

const readlineSync = require('readline-sync');
const fs = require("fs");

function task1() {
	const FILE_NAME = "data/task1.txt";

	const N = readlineSync.question("Input N: ");
	const arr = [];
	let line;

	for (let i = 0; i < N; i++) {
		line = readlineSync.question("Input str: ");
		if (!(line.length & 1))
			arr.push(line);
	}

	const jsonStr = JSON.stringify(arr, null, 4);

	fs.writeFileSync(FILE_NAME, jsonStr);
}

function countVowels(str) {
	const vowels = 'aeiou';
	let count = 0;
	let arr = str.toLowerCase().split('');

	for (let i = 0; i < arr.length; i++) {
		if (vowels.indexOf(arr[i]) !== -1) {
			count++;
		}
	}

	return count;
}

function task2() {
	const FILE_NAME = "data/task2.txt";

	const contentFile = fs.readFileSync(FILE_NAME, "utf-8");
	const obj = JSON.parse(contentFile);

	console.log(contentFile);

	for (let i = 0; i < obj.length; i++) {
		if (countVowels(obj[i]) === obj[i].length)
			console.log(obj[i]);
	}
}

function task3() {
	// Расширение файлов.
	const extension = readlineSync.question("Input extension: ");
	// Имя папки.
	const folder = readlineSync.question("Input the folder's name: ");

	let files;

	if (!fs.existsSync(folder)) {
		console.log("Error!\nThe folder does not exist!");
		return;
	}

	files = fs.readdirSync(folder);

	for (let i = 0; i < files.length; i++) {
		let file = files[i].split('.');
		if (file[file.length - 1] === extension) {
			let contentFile = fs.readFileSync(folder + "/" + files[i], "utf-8");
			console.log(contentFile);
		}
	}
}

function recursionTask(folder) {
	// По заданию сказано, что все файлы в формате txt
	// Если будут файлы с другим форматом, то сломается программа.
	// (потому что рекурсивная функция попытается открыть этот файл, так
	// как будет думать: 'всё что не txt - значит папка').
	if (!fs.existsSync(folder)) {
		console.log("Error!\nFolder does not exist!");
		return;
	}

	let files = fs.readdirSync(folder);
	let contentFile;

	for (let i = 0; i < files.length; i++) {
		let file = files[i].split('.');
		if (file[file.length - 1] === "txt") {
			contentFile = fs.readFileSync(folder + "/" + files[i], "utf-8");
			if (contentFile.length < 11) {
				console.log("Path: ", folder + "/" + files[i]);
			}
			// console.log(contentFile, "\n");
		}
		else {
			recursionTask(folder + "/" + files[i]);
		}
	}
}

function task4() {
	const folder = readlineSync.question("Input the folder's name: ");
	recursionTask(folder);
}

function task5() {
	const FILE_NAME = "data/task5.txt"
	const N = readlineSync.question("Input N: ");
	let name;

	// Очищаем старое содержимое файла (если было)
	fs.writeFileSync(FILE_NAME, "");
	for (let i = 0; i < N; i++) {
		name = readlineSync.question("Input str: ");
		if (!fs.existsSync(name)) {
			console.log("Error!\nThe folder does not exist!");
			return;
		}
		let contentFile = fs.readFileSync(name, "utf-8");
		fs.appendFileSync(FILE_NAME, contentFile);
	}
}

function task6() {
	// TODO: what?
}


function max_branch(obj) {
	if (typeof (obj) !== "object")
		return
	// console.log(typeof (obj))
	let temp;
	for (let field in obj) {
		console.log(field)
		console.log(typeof (field))
	}
}

function task7() {
	// data/task7.txt
	const file_name = readlineSync.question("Input file name: ");
	const jsonString = fs.readFileSync(file_name, "utf-8");
	console.log(jsonString)

	const obj = JSON.parse(jsonString);
	console.log(obj);
	max_branch(obj)

}

module.exports = { task1, task2, task3, task4, task5, task6, task7 };
