"use strict";

const obj = {};

obj.x = 17
obj.y = -45

console.log(obj);

const jsonStr = JSON.stringify(obj);
console.log(jsonStr);

// const boy = { name: "George" };
// const girl = { name: "Ann" };

// boy.pair = girl;
// girl.pair = boy;

// console.log(boy);
// // const jsonString = JSON.stringify(boy); // !!! ERROR;

// // FILE
// const fs = require("fs");

// fs.writeFileSync("data/test.txt", "Alice");
// console.log("Create File OK");

// const contentFile = fs.readFileSync("data/test.txt", "utf-8");
// console.log(contentFile);

// // Read.
const readlineSync = require('readline-sync');

let a = readlineSync.question("Input A:");
let b = readlineSync.question("Input B:");

const result = parseInt(a) + parseInt(b);
console.log(result);