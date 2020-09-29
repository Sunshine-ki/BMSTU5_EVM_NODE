// Активируем строгий режим программирования.
// Нельзя работать с переменной, пока она явно не объявлена через let.
"use strict";

const kids = require("./kids");
const students = require("./students");
const points = require("./points");

function main() {
	kids.test_kids();
	students.test_students();
	points.test_points();
}

main();