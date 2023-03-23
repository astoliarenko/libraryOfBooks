import jwt from "jsonwebtoken";
import config from "../../config";
import constants from "../../constants";
import authService from "./auth.service";
import getCookie from "../../helpers/usefulFunctions";

const generateAccessToken = (id, role) => {
	const payload = {
		id,
		role, /* 1 role */
	};
	return jwt.sign(payload, config.SECRET, { expiresIn: "24h" });
	// {expiresIn: "24h"} - столько будет "жить" токен
};

class authController {
	async registration(req, res): Promise<void> {
		try {
			const newUserData = await authService.registerUser(req.body);

			if (newUserData.success) {
				const token = generateAccessToken(
					newUserData.userId,
					newUserData.userInfo.roleId
				);

				res.cookie(
					constants.TOKEN_NAMES.ACCESS_TOKEN,
					token
				);

				res.status(newUserData.status).json({
					message: newUserData.message,
					userInfo: newUserData.userInfo
				});
			}
			else {
				res.status(newUserData.status).json({
					message: newUserData.message,
				});
			}
		} catch (e) {
			console.log(e); /* TODO: delete */
			let message = "Registration error";
			let status = 500;
			if (e?.sqlMessage) {
				message = e.sqlMessage;
				status = 422;
			}

			res.status(status).json({
				message
			});
		}
	}

	async login(req, res): Promise<void> {
		try {
			const { username, password, isRemember } = req.body;
			let result;

			const loginRes = await authService.login({
				username,
				password
			});

			if (loginRes.success) {
				const token = generateAccessToken(
					loginRes.userInfo.userId,
					loginRes.userInfo.roleId
				);

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

				result = {
					message: loginRes.message,
					success: loginRes.success,
					userInfo: {
						userName: loginRes.userInfo.userName,
						roleId: loginRes.userInfo.roleId
					}
				};
			}
			else {
				result = {
					message: loginRes.message,
					success: false,
					field: loginRes.field
				}
			}

			res.status(loginRes.status).json(result);
		} catch (e) {
			console.log(e);
			res.status(500).json({ message: "Login error", success: false });
		}
	}

	async cookieLogin(req, res): Promise<void> {
		try {
			const reqCookies = req.headers.cookie;

			if (!reqCookies) {
				res.status(400).json(false);
			}
			else {
				const token = getCookie(reqCookies, constants.TOKEN_NAMES.ACCESS_TOKEN);
	
				if (token) {
					const userInfo = await authService.cookieLogin(token);
					if (userInfo.success) {
						res.status(200).json(userInfo);
					}
					else {
						res.status(400).json(userInfo);
					}
				}
				else res.status(400).json(false);
			}
		} catch (e) {
			console.log(e);
			res.status(400).json(false);
		}
	}
}

export default new authController();
