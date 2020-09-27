"use strict";

class Points {
	constructor() {
		this.arr = [];
	}

	add(name_point, x, y) {
		if (!this.arr.find(elem => elem.name_point === name_point)) {
			let new_point = { name_point, x, y };
			this.arr.push(new_point);
		}
	}

	log() {
		console.log(this.arr);
	}

	read(name_point) {
		return this.arr.find(elem => elem.name_point === name_point);
	}

	update(name_point, x, y) {
		let point = this.read(name_point);
		if (point) {
			point.x = x;
			point.y = y;
		}
	}

	delete(name_point) {
		this.arr = this.arr.filter(elem =>
			elem.name_point !== name_point);
	}

	get_distance(p1, p2) {
		let dx = p1.x - p2.x;
		let dy = p1.y - p2.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	max_distance() {
		if (this.arr.length < 2)
			return;

		let len = this.arr.length;
		let p1 = this.arr[0];
		let p2 = this.arr[1];
		let min_dist = this.get_distance(p1, p2), current_dist;
		console.log(min_dist);

		for (let i = 0; i < len - 1; i++)
			for (let j = i + 1; j < len; j++) {
				current_dist = this.get_distance(this.arr[i], this.arr[j]);
				if (current_dist < min_dist)
					min_dist = current_dist;
			}

		return min_dist;
	}

	// Получение точек, находящихся от заданной точки на расстоянии,
	// не превышающем заданную константу
	get_points_less(point, max_len) {
		return this.arr.filter(elem =>
			this.get_distance(point, elem) <= max_len);
	}

	// axis: 0-x, 1-y;
	// direction: 0-'+', 1-'-';  
	get_points_axis(axis, direction) {
		let func;

		if (!axis && !direction)
			func = p => p.x > 0;
		else if (!axis && direction)
			func = p => p.x < 0;
		else if (!direction)
			func = p => p.y > 0;
		else
			func = p => p.y < 0;

		return this.arr.filter(func);
	}
	get_points_inside_rectangle(min_x, max_x, min_y, max_y) {
		return this.arr.filter(p =>
			p.x > min_x && p.x < max_x &&
			p.y > min_y && p.y < max_y);
	}
}

function test_points() {
	let points = new Points();
	points.add("p", 0, 0);
	points.add("p0", 3, 4);
	points.add("p1", 1, 1);
	points.add("p2", 10, 10);
	points.add("p3", 1, 10);
	points.add("p4", 10, 1);
	points.add("p5", 12, 0);
	points.add("p6", -12, 1);
	points.add("p7", 12, -1);

	points.log();

	console.log(points.read("p1"));
	console.log(points.read("p3"));
	console.log(points.read("p13"));
	console.log(points.read("p5"));

	points.update("p5", 100, 12);
	points.log();
	points.delete("p5")
	points.log();

	console.log(points.max_distance());

	let p = points.read("p"); // 0, 0
	console.log(points.get_points_less(p, 5));

	console.log("Points:\n")
	points.log();
	console.log("axis X-:\n", points.get_points_axis(0, 1));
	console.log("axis Y-:\n", points.get_points_axis(1, 1));

	console.log("rectangle: -10, 10, -10, 10\n", points.get_points_inside_rectangle(-10, 10, -10, 10));
}

module.exports = { test_points };
