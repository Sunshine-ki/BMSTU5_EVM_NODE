"use strict";

class Students {
	constructor() {
		this.arr = [];
	}

	add(id, group, arr_score) {
		if (!this.arr.find(elem => elem.id === id)) {
			let new_student = { group, id, arr_score };
			this.arr.push(new_student);
		}
	}

	log() {
		console.log(this.arr);
	}

	read(id) {
		return this.arr.find(elem => elem.id === id);
	}

	update(id, group, arr_score) {
		let student = this.read(id);
		if (student) {
			student.group = group;
			student.arr_score = arr_score;
		}
	}

	delete(id) {
		this.arr = this.arr.filter(elem =>
			elem.id !== id);
	}

	get_avg(id) {
		let student = this.read(id);
		if (!student)
			return;

		let len = student.arr_score.length;
		let sum = 0;
		for (let i = 0; i < len; i++)
			sum += student.arr_score[i];

		return len ? sum / len : 0;
	}

	get_info_group(group) {
		return this.arr.filter(elem => elem.group === group);
	}

	get_student_max_count_score(group) {
		let students = this.get_info_group(group);
		if (!students)
			return;
		let max = students[0];
		for (let i = 1; i < students.length; i++) {
			if (students[i].arr_score.length > max.arr_score.length)
				max = students[i];
		}
		return max
	}

	get_student_no_score() {
		return this.arr.filter(elem => elem.arr_score.length === 0);
	}
};

function test_students() {
	let students = new Students();

	students.add(123456, "UI7-43b", [5, 5, 5]);
	students.add(123456, "UI7-43b", [5, 5, 5]);

	students.add(123457, "UI7-43b", []);
	students.add(123451, "UI7-43b", [1, 5, 5, 2]);
	students.add(123000, "UI7-44b", [4, 3, 4]);
	students.add(123444, "UI7-45b", [5, 4, 5]);
	students.add(123442, "UI7-45b", [2, 3, 3]);
	students.add(123441, "UI7-42b", [2, 3, 5]);
	students.add(123443, "UI7-41b", [5, 2, 3]);

	students.log();

	console.log(students.read(123456));

	students.update(123441, "UI7-42b", [5, 5, 5]);
	students.log();

	students.delete(123442);
	students.log();

	console.log(students.get_avg(123441));
	console.log(students.get_info_group("UI7-43b"));

	console.log(students.get_student_max_count_score("UI7-43b"))
	console.log(students.get_student_no_score());
}

module.exports = { test_students }