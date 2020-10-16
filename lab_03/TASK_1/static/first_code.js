"use strict";

// onload - функция, которая вызывается когда собрался HTML.
// window - это глобальной объект.
window.onload = function () {
	// Получаем (ссылку) на поля.
	const field_mail = document.getElementById("field-mail");
	const field_surname = document.getElementById("field-surname");
	const field_phone_number = document.getElementById("field-phone_number");

	// Получаем кнопку, при нажатии на которую должна добавляться информация.
	const btn_add_info = document.getElementById("add-info-btn");

	// Метка, на которой будет отображен результат добваления (Добавилось/Не добавилось).
	const label = document.getElementById("result-label");

	function ajaxPost(urlString, bodyString, callback) {
		let r = new XMLHttpRequest();
		r.open("POST", urlString, true);
		r.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
		r.send(bodyString);
		r.onload = function () {
			callback(r.response);
		}
	}

	// Событие: нажали на кнопку.
	btn_add_info.onclick = function () {
		const mail = field_mail.value;
		const surname = field_surname.value;
		const phone_number = field_phone_number.value;

		// Создаем POST запрос. 
		// В тело предаем mail, surname, phone_number.
		ajaxPost("/save/info", JSON.stringify({
			mail, surname, phone_number
		}), function (answerString) {
			const answerObject = JSON.parse(answerString);
			const result = answerObject.result;
			label.innerHTML = result;
		});
	};
};