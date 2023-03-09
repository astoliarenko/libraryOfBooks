const db = require("../../settings/db");
// const util = require("util");
// const promisifyDbQuery = util.promisify(db.query.bind(db));
const constants = require("../../constants");
const dbNames = constants.DB;

class BooksRepository {
	async getAllBooks() {
		return db.query(`
			SELECT books.*, authors.*, GROUP_CONCAT(genre.${dbNames.BOOKS_GENRE.COLUMNS.ID_GENRE}) AS 'genres'
			FROM ${dbNames.BOOKS.NAME} AS books
			LEFT JOIN ${dbNames.AUTHORS.NAME} AS authors
			ON books.${dbNames.BOOKS.COLUMNS.ID_AUTHOR} = authors.${dbNames.AUTHORS.COLUMNS.ID}
			LEFT JOIN ${dbNames.BOOKS_GENRE.NAME} AS genre
			ON books.${dbNames.BOOKS.COLUMNS.ID} = genre.id_book
			GROUP BY books.${dbNames.BOOKS.COLUMNS.ID}
		`);
	}

	async getBookGenres() {
		return db.query(`
			SELECT *
			FROM ${dbNames.GENRES.NAME}
		`);
	}
}

module.exports = new BooksRepository();