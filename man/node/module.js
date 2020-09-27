"use strict";

function print1() {
    console.log("hello from print1")
};
const print2 = () => console.log("hello from print2");

// module.exports - это объект, который затем можно подключить в другие файлы через
// функцию require
//module.exports = { 
    //print1: print1,
    //print2: print2
//};
module.exports = { print1, print2 };
