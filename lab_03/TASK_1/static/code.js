"use strict";

// onload - ф-ция которая выз. когда собрался HTML.
// window - это глобальной объект
window.onload = function () {
	// input fields
	const f1 = document.getElementById("field-first");
	const f2 = document.getElementById("field-second");
	const f3 = document.getElementById("field-phone_number");

	const f4 = document.getElementById("field-get-info");


	// button
	const btn = document.getElementById("sum-find-btn");

	const btnInfo = document.getElementById("get-info-find-btn");


	// label
	const label = document.getElementById("result-label");

	// ajax get
	function ajaxGet(urlString, callback) {
		let r = new XMLHttpRequest();
		r.open("GET", urlString, true);
		r.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
		r.send(null);
		r.onload = function () {
			callback(r.response);
		};
	};


	function ajaxPost(urlString, bodyString, callback) {
		let r = new XMLHttpRequest();
		r.open("POST", urlString, true);
		r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		r.send(bodyString);
		r.onload = function () {
			callback(r.response);
		}
	}


	// click event
	btn.onclick = function () {


		const a = f1.value;
		const b = f2.value;
		const c = f3.value;

		// const url = `/sum?a=${a}&b=${b}`;

		ajaxPost("/save/info", JSON.stringify({
			a, b, c
		}), function (answerString) {
			const answerObject = JSON.parse(answerString);
			const result = answerObject.result;
			label.innerHTML = `Ответ: ${result}`;

			// alert(result);
		});
	};

	btnInfo.onclick = function () {
		const a = f4.value;
		const b = f4.value;
		const url = `/sum?a=${a}&b=${b}`;

		ajaxGet(url, function (stringAnswer) {
			const objectAnswer = JSON.parse(stringAnswer);
			const result = objectAnswer.result;
			alert(result);
			// label.innerHTML = `Ответ: ${result}`;
		});
	}
};