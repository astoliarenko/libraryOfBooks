module.exports = function getCookie(cookieObj, name) {
	let cookie = {};

	cookieObj.split(";").forEach((el) => {
		let [k, v] = el.split("=");

		cookie[k.trim()] = v;
	});

	return cookie[name];
}
