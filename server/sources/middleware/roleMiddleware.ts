const jwt = require("jsonwebtoken");
import config from "../config";
import constants from "../constants";
import getCookie from "../helpers/usefulFunctions";

export default function (roles) {
	return function(req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}
	
		try {
			const token = getCookie(req.headers.cookie, constants.TOKEN_NAMES.ACCESS_TOKEN);

			if (!token) {
				return res.status(403).json({message: "Нет доступа"})
			}
	
			const {roles: userRoles} = jwt.verify(token, config.SECRET);
			const hasRole = roles.includes(userRoles);

			if (!hasRole) {
				return res.status(403).json({message: "Нет доступа"})
			}
			next();
	
		} catch (e) {
			console.log(e);
			return res.status(403).json({message: "Пользователь не авторизован"});
		}
	}
};