const { DB } = require("../../constants");
const { scryptHash, key } = require("../../crypto/cryptoMy");
const response = require("../../response");
const db = require("../../settings/db");
const util = require("util");
const jwt = require("jsonwebtoken");
const { SECRET } = require("../../config");
const constants = require("../../constants");
const promisifyDbQuery = util.promisify(db.query.bind(db));

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
			const users = await promisifyDbQuery(
				`SELECT * FROM \`${DB.USERS.NAME}\` WHERE \`${DB.USERS.COLUMNS.LOGIN}\` = '${username}'`
			);

			if (users[0]) {
				return res.status(400).json({
					message: "Пользователь с таким именем уже существует",
				});
			}

			const hashPassword = await scryptHash(password, key);
			const defRole = DB.USERS.ROLES.READER;
			await promisifyDbQuery(
				`INSERT INTO \`${DB.USERS.NAME}\`(\`${DB.USERS.COLUMNS.LOGIN}\`, \`${DB.USERS.COLUMNS.PASSWORD}\`, 
				\`${DB.USERS.COLUMNS.ROLE_ID}\`) VALUES('${username}', '${hashPassword}', '${defRole}')`
			);
			res.status(200).json({
				message: "Пользователь успешно зарегистрирован",
			});
			// response.status(results, res);
		} catch (e) {
			console.log(e);
			res.status(400).json({
				message: "Registration error",
			});
		}
	}

	async login(req, res) {
		try {
			const { username, password, isRemember } = req.body;
			// show username and isRemember
			console.log("isRemember - ", isRemember, "USERNAME=", req.body);

			const user = await promisifyDbQuery(
				`SELECT * FROM \`${DB.USERS.NAME}\` WHERE \`${DB.USERS.COLUMNS.LOGIN}\` = '${username}'`
			);

			if (!user[0]) {
				return res.status(400).json({
					message: `Пользователь ${username} не найден`,
				});
			}

			const hashPassword = await scryptHash(password, key);

			if (hashPassword !== user[0].password) {
				return res.status(400).json({ message: "Введен неверный пароль" });
			}

			const userInfo = await promisifyDbQuery(
				`SELECT * FROM \`${DB.USERS_INFO.NAME}\` WHERE \`${DB.USERS.COLUMNS.USER_ID}\` = '${user[0][DB.USERS.COLUMNS.USER_ID]}'`
			);

			const token = generateAccessToken(user[0][DB.USERS.COLUMNS.USER_ID], user[0][DB.USERS.COLUMNS.ROLE_ID]);

			res.cookie(
				constants.TOKEN_NAMES.ACCESS_TOKEN,
				token,
				isRemember ? {
					maxAge: 3600000 * 8,
					// 8 hours
					// secure: false,
					// httpOnly: true
				} : {});

			const firstName = constants.DB.USERS_INFO.COLUMNS.FIRST_NAME;
			const lastName = constants.DB.USERS_INFO.COLUMNS.LAST_NAME;

			return res.json({ userName: `${userInfo[0][firstName] || "Alex"} ${userInfo[0][lastName] || "Malex"}`, roleId: user[0].role_id});
		} catch (e) {
			console.log(e);
			res.status(400).json({ message: "Login error" });
		}
	}

	async getUsers(req, res) {
		try {
			const users = await promisifyDbQuery(
				`SELECT * FROM \`${DB.USERS.NAME}\``
			);
			res.json(users);
		} catch (e) {
			console.log(e);
			res.status(400).json({
				message: "get user error",
			});
		}
	}

	async getUserFromToken(req, res) {
		try {
			const { token } = req.body;

			// const token = res.headers.cookie
			const decodedData = jwt.verify(token, SECRET);

			// need to get firstName and lastName from users table
			// const user = await promisifyDbQuery(
			// 	`SELECT * FROM \`${DB.USERS.NAME}\` WHERE \`${DB.USERS.COLUMNS.LOGIN}\` = '${username}'`
			// );

			// if (!user[0]) {
			// 	return res.status(400).json({
			// 		message: `Пользователь ${username} не найден`,
			// 	});
			// }

			res.json(decodedData);
		} catch (e) {
			console.log(e);
			res.status(400).json({
				message: "get user from token error",
			});
		}
	}
}

module.exports = new authController();
