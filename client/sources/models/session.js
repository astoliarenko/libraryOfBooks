const serverUrl = "http://localhost:3500/";

function status() {
	return webix.ajax().post(`${serverUrl}auth/status`)
		.then(res => res.json());
}

function login(user, pass) {
	// return webix.ajax().post(`${serverUrl}auth/login`, {user, pass})
	// 	.then(res => res.json());

	return	fetch(`${serverUrl}auth/login`, {
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
	return webix.ajax().post(`${serverUrl}auth/logout`)
		.then(res => res.json());
}

export default {status, login, logout}
