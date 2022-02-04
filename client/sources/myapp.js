/* eslint-disable no-undef */
import { JetApp, EmptyRouter, HashRouter } from "webix-jet";
import "./styles/app.css";

// async function checkToken(token) {
// 	const res = await fetch("http://localhost:3500/auth/user", {
// 		method: "POST",
// 		// mode: 'no-cors', // no-cors, *cors, same-origin
// 		headers: {
// 			"Content-Type": "application/json",
// 		},
// 		body: JSON.stringify(token), // body data type must match "Content-Type" header
// 	});
// 	// .then((response) => response.json())
// 	// .then(({ token }) => {
// 	// 	console.log("token was saved");
// 	// 	// нужно достать роль из токена чтобы открыть какое-то вью
// 	// 	debugger;
// 	// 	if (formValues.State === "remember") {
// 	// 		//сохранить токен в localstorage
// 	// 		localStorage.setItem("token", token);
// 	// 		console.log("token was saved");
// 	// 	}
// 	// });
// 	return await res.json();
// }

export default class MyApp extends JetApp {
	constructor(config) {
		let startPage = "/authorization";

		// const token = localStorage.getItem("token");
		// debugger;
		// if (token) {
		// 	const res = checkToken(token);
		// 	if (res) {
		// 		startPage = res;
		// 	}
		// 	// запрос на сервер и проверка на валидность токена
		// 	// если все ок, тогда в проперти "start" записать нужный путь
		// }

		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: !PRODUCTION,
			start: "/authorization",
		};

		super({ ...defaults, ...config });
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => new MyApp().render());
}
