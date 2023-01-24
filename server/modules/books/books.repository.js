const db = require("../../settings/db");
const util = require("util");
const promisifyDbQuery = util.promisify(db.query.bind(db));

class BooksRepository {
	async getAllBooks() {
		return promisifyDbQuery(`
			SELECT *
			FROM \`books\`
			LEFT JOIN \`authors\`
			ON \`books.id_author\` = \`authors.id_author\`
		`);
	}
}

module.exports = new BooksRepository();