"use strict"
// отчет =  титульник + задание + код;
class Point {
	constructor(x, y) {
		this.set_data(x, y);
	}

	set_data(x, y) {
		this.x = x;
		this.y = y;
	}

	log() {
		console.log("X: ", this.x, "Y: ", this.y);
	}
}

class Line {
	constructor(x1, y1, x2, y2) {
		this.set_data(x1, y1, x2, y2);
	}

	set_data(x1, y1, x2, y2) {
		this.start_point = new Point(x1, y1);
		this.end_point = new Point(x2, y2);
	}

	get_distance() {
		const dx = this.start_point.x - this.end_point.x;
		const dy = this.start_point.y - this.end_point.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	log() {
		console.log("Начальная точка:");
		this.start_point.log();
		console.log("Конечная точка:");
		this.end_point.log();
	}
}

class Triangle {
	constructor(a, b, c) {
		this.set_data(a, b, c);
	}

	set_data(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
	}

	check_existence() {
		if ((this.a < this.b + this.c) &&
			(this.b < this.a + this.c) &&
			(this.c < this.b + this.a))
			return true;
		return false;
	}

	get_perimeter() {
		if (!this.check_existence())
			return;
		return this.a + this.b + this.c;
	}

	area() {
		if (!this.check_existence())
			return;
		let semi_perimeter = this.get_perimeter() / 2;
		return Math.sqrt(semi_perimeter * (semi_perimeter - this.a) *
			(semi_perimeter - this.b) * (semi_perimeter - this.c));
	}

	check_rectangular() {
		let EPS = 1e-5;
		if (!this.check_existence())
			return;
		let a = this.a, b = this.b, c = this.c;

		if ((a * a + b * b - c * c < EPS) ||
			(a * a + c * c - b * b < EPS) ||
			(c * c + b * b - a * a < EPS))
			return true;
		return false;
	}
}

function test_objects() {
	let point = new Point(10, 10);
	point.log();

	let line = new Line(0, 0, 3, 4);
	line.log();
	console.log(line.get_distance());

	let triangle = new Triangle(10, 10, 10);
	console.log(triangle.get_perimeter());
	console.log(triangle.area());
	console.log(triangle.get_perimeter());
	console.log(triangle.check_rectangular());

	let triangle2 = new Triangle(3, 4, 5);
	console.log(triangle2.check_rectangular());
}

module.exports = { test_objects };