"use strict";

// onload - функция, которая вызывается когда собрался HTML.
// window - это глобальной объект.
window.onload = function () {
	// Получаем (ссылку) на поля.
	const field_find_mail = document.getElementById("field-get-info");

	// Получаем кнопку, при нажатии на которую должна выдаваться информация.
	const btn_get_info = document.getElementById("get-info-btn");

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

	btn_get_info.onclick = function () {
		const find_mail = field_find_mail.value;

		const url = `/find?mail=${find_mail}`;

		ajaxGet(url, function (stringAnswer) {
			const objectAnswer = JSON.parse(stringAnswer);
			const result = objectAnswer.result;
			alert(result);
		});
	}
};