const { DB } = require("../../constants");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config");
const constants = require("../../constants");
const authService = require("./auth.service");

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles,
	};
	return jwt.sign(payload, SECRET, { expiresIn: "24h" });
	// {expiresIn: "24h"} - столько будет "жить" токен
};

class authController {
	async registration(req, res) {
		try {
			const { username, password } = req.body;
			const newUserData = await authService.registerUser({ username, password });

			if (newUserData.success) {
				res.status(newUserData.status).json({
					message: newUserData.message,
				});
			}
			else {
				res.status(newUserData.status).json({
					message: newUserData.message,
				});
			}
		} catch (e) {
			console.log(e); /* TODO: delete */

			res.status(400).json({
				message: "Registration error",
			});
		}
	}

	async login(req, res) {
		try {
			const { username, password, isRemember } = req.body;

			const user = await authService.login({
				username,
				password
			});

			if (user.success) {
				const token = generateAccessToken(user[DB.USERS.COLUMNS.USER_ID], user[DB.USERS.COLUMNS.ROLE_ID]);

				res.cookie(
					constants.TOKEN_NAMES.ACCESS_TOKEN,
					token,
					isRemember
						? {
							maxAge: 3600000 * 8,
							// 8 hours
							// secure: false,
							// httpOnly: true
						}
						: {}
				);

				res.status(user.status).json({
					message: user.message,
					userInfo: user.userInfo
				});
			}
			else {
				res.status(user.status).json({
					message: user.message,
				});
			}
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Login error" });
		}
	}

	// async getUsers(req, res) {
	// 	try {
	// 		const users = await promisifyDbQuery(
	// 			`SELECT * FROM \`${DB.USERS.NAME}\``
	// 		);
	// 		res.json(users);
	// 	} catch (e) {
	// 		console.log(e);
	// 		res.status(400).json({
	// 			message: "get user error",
	// 		});
	// 	}
	// }

	// async getUserFromToken(req, res) {
	// 	try {
	// 		const { token } = req.body;

	// 		// const token = res.headers.cookie
	// 		const decodedData = jwt.verify(token, SECRET);

	// 		// need to get firstName and lastName from users table
	// 		// const user = await promisifyDbQuery(
	// 		// 	`SELECT * FROM \`${DB.USERS.NAME}\` WHERE \`${DB.USERS.COLUMNS.LOGIN}\` = '${username}'`
	// 		// );

	// 		// if (!user[0]) {
	// 		// 	return res.status(400).json({
	// 		// 		message: `Пользователь ${username} не найден`,
	// 		// 	});
	// 		// }

	// 		res.json(decodedData);
	// 	} catch (e) {
	// 		console.log(e);
	// 		res.status(400).json({
	// 			message: "get user from token error",
	// 		});
	// 	}
	// }
}

module.exports = new authController();
