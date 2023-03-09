import constants from "../constants";

function status() {
	// @ts-ignore
	return webix.ajax().get(`${constants.URLs.SERVER}auth/status`)
		.then(res => res.json());
}

function login(user, pass, isRemember) {
	return	fetch(`${constants.URLs.SERVER}auth/login`, {
		method: "POST",
		// mode: 'no-cors', // no-cors, *cors, same-origin
		credentials: "include", // omit, same-origin*
		// mode: 'no-cors',
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify({username: user, password: pass, isRemember})
	})
		.then(res => res.json());
}

function cookieLogin() {
	return	fetch(`${constants.URLs.SERVER}auth/login`, {
		method: "GET",
		// mode: 'no-cors', // no-cors, *cors, same-origin
		credentials: "include", // omit, same-origin*
		// mode: 'no-cors',
		headers: {
			"Content-Type": "application/json"
		}
	})
		.then(res => res.json());
}

function logout() {
	// @ts-ignore
	return webix.ajax().post(`${constants.URLs.SERVER}auth/logout`)
		.then(res => res.json());
}

export default {status, login, logout, cookieLogin};
