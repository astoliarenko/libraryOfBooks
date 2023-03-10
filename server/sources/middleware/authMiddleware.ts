const jwt = require("jsonwebtoken");
import config from "../config";
import getCookie from "../helpers/usefulFunctions";
const SECRET = config.SECRET;
import constants from "../constants";

export default function (req, res, next) {
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
