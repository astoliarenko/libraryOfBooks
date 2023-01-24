const db = require("../../settings/db");
const util = require("util");
const promisifyDbQuery = util.promisify(db.query.bind(db));

class BooksRepository {
	async getAllBooks() {
		// TODO: get all info
		// return promisifyDbQuery(`
		// 	SELECT *
		// 	FROM \`books\`
		// 	LEFT JOIN \`authors\`
		// 	ON \`books.id_author\` = \`authors.id_author\`
		// `);

		return promisifyDbQuery(`
			SELECT *
			FROM \`books\`
		`);
	}
}

module.exports = new BooksRepository();