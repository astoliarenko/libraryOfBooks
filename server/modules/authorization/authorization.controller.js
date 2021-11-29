const {scryptHash, key} = require("../../crypto/cryptoMy");
const response = require("../../response");
const db = require("../../settings/db");

class authController {
	async registration(req, res) {
		try {
			const {username, password} = req.body;

			// let candidate;
			db.query(`SELECT * FROM \`users\` WHERE \`login\` = '${username}'`, (err, row, fields) => {
				// eslint-disable-next-line no-console
				if (err) console.log("ошибка в запросе на сущ польз", err);
				else {
					if (row[0]) {
						return res.status(400).json({message: "Пользователь с таким именем уже существует"})
					}
					// console.log(candidate);
					//то шо надо, те находит пользователя
					response.status(row, res);
				}
			});
			// console.log(candidate);
			// undefined
			// if (candidate) {
			// 	return res.status(400).json({message: "Пользователь с таким именем уже существует"})
			// }
			const hashPassword = await scryptHash(password, key);
			const defRole = 1;
			// const sql = `INSERT INTO \`users\`(\`login\`, \`password\`, \`role_id\`) VALUES('${req.query.login}', '${hashPassword}', '${defRole}')`;
			const sql = `INSERT INTO \`users\`(\`login\`, \`password\`, \`role_id\`) VALUES('${username}', '${hashPassword}', '${defRole}')`;
			db.query(sql, (err, results) => {
				// eslint-disable-next-line no-console
				if (err) console.log("ошибка", err);
				else response.status(results, res);
			});
			return res.json({message: "Пользователь успешно зарегистрирован"});
		} catch (e) {
			console.log(e);
			res.status(400).json({message: "Registration error"});
		}
	}

	async login(req, res) {
		try {

		} catch (e) {
			console.log(e);
			res.status(400).json({message: "Login error"});
		}
	}

	async getUsers(req, res) {
		try {
			db.query("SELECT * FROM `users`", (err, rows, fields) => {
				// eslint-disable-next-line no-console
				if (err) console.log(err);
				else response.status(rows, res);
			});
		} catch (e) {

		}
	}
}

module.exports = new authController();