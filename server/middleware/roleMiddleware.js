const jwt = require("jsonwebtoken");
const {SECRET} = require("../config");

module.exports = function (roles) {
	return function(req, res, next) {
		if (req.method === "OPTIONS") {
			next();
		}
	
		try {
			const token = req.headers.authorization.split(" ")[1];
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