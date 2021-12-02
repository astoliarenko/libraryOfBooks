const {ROLES} = require("../../constants");
const {scryptHash, key} = require("../../crypto/cryptoMy");
const response = require("../../response");
const db = require("../../settings/db");
const util = require("util");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../../config");
const promisifyDbQuery = util.promisify(db.query.bind(db));

const generateAccessToken = (id, roles) => {
	const payload = {
		id,
		roles
	}
	return jwt.sign(payload, SECRET, {expiresIn: "24h"})
	// {expiresIn: "24h"} - столько будет "жить" токен
}

class authController {
	async registration(req, res) {
		try {
			const {username, password} = req.body;
			const users = await promisifyDbQuery(`SELECT * FROM \`users\` WHERE \`login\` = '${username}'`);

			if (users[0]) {
				return res.status(400).json({message: "Пользователь с таким именем уже существует"})
			}

			const hashPassword = await scryptHash(password, key);
			const defRole = ROLES.READER;
			await promisifyDbQuery(`INSERT INTO \`users\`(\`login\`, \`password\`, \`role_id\`) VALUES('${username}', '${hashPassword}', '${defRole}')`);
			res.status(200).json({message: "Пользователь успешно зарегистрирован"})
			// response.status(results, res);

		} catch (e) {
			console.log(e);
			res.status(400).json({message: "Registration error"});
		}
	}

	async login(req, res) {
		try {
			const {username, password} = req.body;
			console.log("USERNAME=", req.body);
			
			const user = await promisifyDbQuery(`SELECT * FROM \`users\` WHERE \`login\` = '${username}'`);

			if (!user[0]) {
				return res.status(400).json({message: `Пользователь ${username} не найден`});
			}

			const hashPassword = await scryptHash(password, key);

			if (hashPassword !== user[0].password) {
				return res.status(400).json({message: "Введен неверный пароль"});
			}

			const token = generateAccessToken(user[0].user_id, user[0].role_id);

			return res.json({token})

		} catch (e) {
			console.log(e);
			res.status(400).json({message: "Login error"});
		}
	}

	async getUsers(req, res) {
		try {
			const users = await promisifyDbQuery("SELECT * FROM `users`");
			res.json(users)
			
		} catch (e) {
			console.log(e);
			res.status(400).json({message: "get user error"});
		}
	}
}

module.exports = new authController();