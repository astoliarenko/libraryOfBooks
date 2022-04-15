const jwt = require("jsonwebtoken");
const {SECRET} = require("../config");
const constants = require("../constants");
const getCookie = require("../helpers/usefulFunctions");

module.exports = function (roles) {
	return function(req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}
	
		try {
			const token = getCookie(req.headers.cookie, constants.TOKEN_NAMES.ACCESS_TOKEN);

			if (!token) {
				return res.status(403).json({message: "Нет доступа"})
			}
	
			const {roles: userRoles} = jwt.verify(token, SECRET);
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