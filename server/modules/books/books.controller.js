const {scryptHash, key} = require("../../crypto/cryptoMy");
const response = require("../../response");
const db = require("../../settings/db");
const util = require("util");
const promisifyDbQuery = util.promisify(db.query.bind(db));

class booksController {
	async addNewBook(req, res) {
		try {
			const {book_title} = req.body;

			db.query(`SELECT * FROM \`books\` WHERE \`book_title\` = '${book_title}'`, (err, row, fields) => {
				if (err) console.log("ошибка в запросе на сущ книгу", err);
				else {
					if (row[0]) {
						return res.status(400).json({message: "Книга с таким именем уже существует"})
					}

					response.status(row, res);
				}
			});

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

	async getBooks(req, res) {
		try {
			const books = await promisifyDbQuery("SELECT * FROM `books`");

			res.json(books);
		} catch (e) {
			console.log(e);

			res.status(400).json({
				message: "get books error",
			});
		}
	}
}

module.exports = new booksController();