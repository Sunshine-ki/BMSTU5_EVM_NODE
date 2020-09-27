// Данная строка не позволяет использовать переменные без объявления
"use strict";
// 0. bool
let aaa = '';
let bbb = !!aaa;
console.log(bbb);

// PYTHON

// 1. Можно хранить что угодно, как угодно, где угодно:)
let array = [1, '1', [2, 'hello']];

// 2. Все сложные типы данных - ссылки (в питоне были только списки, здесь - массивы (хотя это больше похоже на питоновские списки) + объекты (см. JAVASCRIPT))
let copy = array;
let old = array[0];
copy[0] = 11;
console.log("Было:", old, "\nСтало:", array[0]);

// 3. Функциям тоже по большому счету все равно, чем питаться:)

function sum(a, b = 12) {
    return a && b ? a + b : 0;
}

console.log(sum(1, 2));
console.log(sum("hello ", "world"))
console.log(sum(1))

// 4. Описание строк
let my_string = 'в одних кавычках' + "в двойных:)" + `oh my`

// Лучше юзать charAt, а не [].
let s = "abcdefgh";
let c = s.charAt(5);

// 5. Выполнение программы (имеется в виду, что будет исполнено все по мере чтения файла. Нет функции main (можно написать самому, но сами понимаете..))




// C++

// 1. Синтаксис циклов, функций, условий, комментариев

/**
 * Да, я многострочный
 * комментарий на ЖС
 */
let a = 5;


if (a < 10) {
    for (let i = 0; i < a; i++)
        console.log("В цикле без фигурных скобок)");

    for (let i = 0; i < a; i++) {
        console.log("В цикле с фигурными скобками)");
    }
} else if (a > 15) {
    let i = a;
    while (i > 15) {
        console.log(i);
        i--;
    }
}

// 2. Области видимости

{
    let tmp = 12;
}
//console.log(tmp); // FIXME: не работает


// 3. Классы (ну не прям, но похожи по синтаксису, внутри устроены чуть иначе)

class MyFirstClass {
    // a = 11;
    // b = 12;
    // c = 2134;
    // Приватное поле с #
    // #d = 'private';

    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    log() {
        console.log(this.a, this.b);
    }

    // bad_log = function () {
    //     console.log(this.a, this.b, this.c);
    //     return this.#d;
    // }
}

let obj = new MyFirstClass(1, 2);
obj.log();
// obj.bad_log();


// JAVASCRIPT

// 1. Сравнение
// '==' как бы проверяет только значение, в то время как '===' еще и тип (по большому счету это все)
console.log("'1' == 1? -", '1' == 1);
console.log("'1' === 1? -", '1' === 1);


// 2. В качестве false могут быть значения: null, 0, false, undefined. '', [] - не дают false в условии

const arr = [];
if (arr) // Чтобы проверить массив на пустоту, нужно делать это явно: arr.length === 0
    console.log("arr is truthy");

// 3. Стрелочные функции

const arrow_func = (arg1, arg2) => arg1 + arg2;

const advanced_arrow_func = (a1, a2) => {
    a1 *= 2;
    return a1 + a2;
}

// ЧТО?!

class MyClass {
    // a = 12;
    constructor() { };

    f2() {
        console.log(this);
    }

    f1(func) {
        func();
    }
};

const new_obj = new MyClass();

const my_function = () => {
    console.log("Inside f");
    console.log(this);
}
new_obj.f1(my_function);

const my_function2 = function () {
    console.log("Inside f2");
    console.log(this);
}
new_obj.f1(my_function2);

my_function();

// 3. Деструктуризация

// Деструктуризация объекта
const t = { name: 'Alice', lastName: 'Sukocheva', age: 20, sex: true }
const { name: n, age, ...other } = t;
console.log(n, age);
console.log(other);

// Деструктуризация массива
const new_arr = [1, 2, 3];
/*
 * хочу:
 * a1 = new_arr[0]
 * a2 = new_arr[1]
 * a3 = new_arr[2]
 *
 * и могу сделать так:
 * let [a1, a2, a3] = new_arr;
 */

// во второй пишется весь оставшийся массив
let [a1, ...a2] = new_arr;
console.log(a1, a2);


// ТУТ ЖЕ ВАЖНО ОЧЕНЬ !!!!!
// КОПИРОВАНИЕ МАССИВА

const source = [1, 2, 3];
const dest = [...source]; // поверхностное копирование! не копирует массивы внутри массивов
dest[0] = 999;

console.log(source); // ага, не сломалось...


let tmp = 12;
{
    let tmp = 33;
    console.log(tmp); // 33
}
console.log(tmp); // 12

// 4. красивые методы на колбеках

let ar = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const function_2 = (x) => x * x;
// map возвращает новый массив!!!
const new_a = ar.map(function_2);
//const new_a = ar.map((x) => x * x); // можно убрать скобки у списка аргументов, если аргумент один
console.log(ar);
console.log(new_a);

//пока не об этом, но пиркол, да
// доп. приколы колбеков
//const cb = () => console.log("timer!");
//setTimeout(cb, 2000);

const new_a2 = ar.filter((elem) => elem % 2 == 1);
console.log(new_a2);


// строки в тильдочках

const var1 = 20.99999, var2 = 'Alice';

console.log(`Hello, my name is ${var2} and I am ${var1}`);

// импорты/экспорты
const module2 = require("./module"); // module2 === module.exports из ./module
// module2 === print1, если module.exports в module.js = print1;

module2.print1();
module2.print2();
