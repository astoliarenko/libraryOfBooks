function getCookie(name) {
	let cookie = {};

	document.cookie.split(";").forEach((el) => {
		let [k, v] = el.split("=");

		cookie[k.trim()] = v;
	});

	return cookie[name];
}

export default getCookie;
