import constants from "../constants";

function status() {
	return webix.ajax().post(`${constants.URLs.SERVER}auth/status`)
		.then(res => res.json());
}

function login(user, pass, isRemember) {
	return	fetch(`${constants.URLs.SERVER}auth/login`, {
			method: "POST",
			// mode: 'no-cors', // no-cors, *cors, same-origin
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({username: user, password: pass})
		})
			.then((response) => response.json());
}

function logout() {
	return webix.ajax().post(`${constants.URLs.SERVER}auth/logout`)
		.then(res => res.json());
}

export default {status, login, logout}
