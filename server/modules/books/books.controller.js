const repository = require("./books.repository");

const modifyBooksData = (books) => {
	if (books.length) {
		return books.map((book) => {
			return {
				...book,
				author: `${book.first_name} ${book.last_name}`
			};
		});
	}
	else {
		return [];
	}	
};

class booksController {
	async addNewBook(req, res) {
		try {
			// TODO
		} catch (e) {
			console.log(e);
			res.status(400).json({message: "add new book error"});
		}
	}

	async getBooks(req, res) {
		try {
			const books = await repository.getAllBooks();

			if (books) {
				res.json(modifyBooksData(books));
			}
			else {
				res.status(400).json({
					message: "get books error",
				});
			}		
		} catch (e) {
			console.log(e);

			res.status(400).json({
				message: "get books error",
			});
		}
	}
}

module.exports = new booksController();