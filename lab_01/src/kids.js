"use strict";

class Kids {
	constructor() {
		this.arr = [];
	}

	add(surname, age) {
		// function func(elem) {
		// 	return elem.surname === surname;
		// }
		if (!this.arr.find(elem => elem.surname == surname)) {
			let new_kid = { surname, age }; // { surname: surname, age : age }
			this.arr.push(new_kid);
		}
	}

	log() {
		for (let i = 0; i < this.arr.length; i++)
			console.log(this.arr[i].surname, " ", this.arr[i].age);
		console.log("\n")
	}

	read(surname) {
		return this.arr.find(elem => elem.surname == surname);
		// for (let i = 0; i < this.arr.length; i++)
		// 	if (this.arr[i].surname === surname)
		// 		return this.arr[i];
		// return ""
	}

	update(surname, new_age, new_surname = false) {
		for (let i = 0; i < this.arr.length; i++) {
			if (this.arr[i].surname === surname) {
				this.arr[i].age = new_age;
				if (new_surname && !this.arr.find(elem => elem.surname == new_surname))
					this.arr[i].surname = new_surname;
				return;
			}
		}
	}

	delete(surname) {
		this.arr = this.arr.filter(elem =>
			elem.surname !== surname);
	}

	get_avg() {
		let sum = 0;
		let len = this.arr.length;
		for (let i = 0; i < len; i++)
			sum += this.arr[i].age;
		return len ? sum / len : 0;
	}

	get_eldest() {
		let len = this.arr.length;
		if (!len)
			return;
		let max = this.arr[0];
		for (let i = 1; i < len; i++) {
			if (this.arr[i].age > max.age)
				max = this.arr[i];
		}
		return max;
	}

	get_age_range(begin, end) {
		return this.arr.filter(elem => elem.age >= begin
			&& elem.age <= end);
	}

	get_surname_letter(letter) {
		return this.arr.filter(elem => elem.surname.charAt(0) === letter);
	}

	get_surname_len(len) {
		return this.arr.filter(elem => elem.surname.length > len)
	}

	get_surname_volwels() {
		const VOWELS = ['A', 'E', 'I', 'O', 'U'];
		return this.arr.filter(elem => VOWELS.indexOf(elem.surname.charAt(0).toUpperCase()) != -1)
	}
};

function test_kids() {
	let child = new Kids();
	child.add("Sukocheva", 2);
	child.add("Sukocheva", 3);
	child.add("Namestnik", 1);
	child.add("Vinogradov", 4);
	child.add("Volkov", 3);
	child.add("Orbitov", 7);


	child.log();

	console.log(child.read("Sukocheva"));
	child.update("Sukocheva", 4)
	console.log(child.read("Sukocheva"));

	child.log();
	child.delete("Vinogradov");
	child.log();

	child.read("Sukocheva")

	console.log(child.get_avg());
	console.log(child.get_eldest())

	console.log(child.get_age_range(1, 3))
	console.log(child.get_surname_letter('S'));

	console.log(child.get_surname_len(6));

	console.log(child.get_surname_volwels());
}

module.exports = { test_kids };