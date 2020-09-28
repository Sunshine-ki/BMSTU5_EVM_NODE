"use strict";

const FILE_NAME = "data/test.txt";

const readlineSync = require('readline-sync');
const fs = require("fs");
const { FILE } = require('dns');

function task1() {
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
	// Адрес папки.
	const folder = readlineSync.question("Input folder: ");

	let files;

	if (!fs.existsSync(folder)) {
		console.log("Error!\nFolder does not exist!");
		return;
	}

	files = fs.readdirSync(folder);

	for (let i = 0; i < files.length; i++) {
		let file = files[i].split('.');
		if (file[file.length - 1] === extension) {
			let contentFile = fs.readFileSync(files[i], "utf-8");
			console.log(contentFile);
		}
	}


}

function main() {
	task3();
}

main();