const jwt = require("jsonwebtoken");
const { SECRET } = require("../config");
const getCookie = require("../helpers/usefulFunctions");
const constants = require("../constants");

module.exports = function (req, res, next) {
	if (req.method === "OPTIONS") {
		next();
	}

	try {
		const token = getCookie(req.headers.cookie, constants.TOKEN_NAMES.ACCESS_TOKEN);

		if (!token) {
			return res.status(403).json({ message: "Нет доступа" });
		}

		jwt.verify(token, SECRET);

		next();
	} catch (e) {
		console.log(e);
		return res.status(403).json({ message: "Пользователь не авторизован" });
	}
};
