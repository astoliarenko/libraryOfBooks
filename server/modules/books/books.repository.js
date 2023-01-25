const db = require("../../settings/db");
const util = require("util");
const promisifyDbQuery = util.promisify(db.query.bind(db));
const constants = require("../../constants");
const dbNames = constants.DB;

class BooksRepository {
	async getAllBooks() {
		return promisifyDbQuery(`
			SELECT *
			FROM ${dbNames.BOOKS.NAME} AS books
			LEFT JOIN ${dbNames.AUTHORS.NAME} AS authors
			ON books.${dbNames.BOOKS.COLUMNS.ID_AUTHOR} = authors.${dbNames.AUTHORS.COLUMNS.ID}
		`);
	}
}

module.exports = new BooksRepository();