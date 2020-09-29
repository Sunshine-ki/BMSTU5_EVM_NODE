"use strict";


const readlineSync = require('readline-sync');
const fs = require("fs");
const { FILE } = require('dns');

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
	const N = readlineSync.question("Input N: ");

	let name;

	for (let i = 0; i < N; i++) {
		name = readlineSync.question("Input str: ");
	}


}

function main() {
	// TODO: В json добавить run task1, run task2 и тд... + тестики норм написать.
	task5();
}

main();