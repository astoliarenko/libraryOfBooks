import MainPage from "./mainPage";
import pageViewNames from "../helpers/constants/pageViewNames";

import BooksModel from "../models/books";

// авторизуется,
// обновляет наличие книг,
// смотрит профили читателей,
// добавляет взятые книги читателям и снимает возвращенные книги с читателей,
// пополняет БД новыми книгами,
// удаляет старые книги.
export default class Librarian extends MainPage {
	constructor(app) {
		super(
			app,
			{
				listMenu: {
					data: pageViewNames.librarian.views,
					folderName: "librarian"
				}
			},
			{}
		)
	}

	init() {
		this.loadUsers();
	}

	async loadUsers() {
		const booksModel = BooksModel.getInstance();
		const res = await booksModel.getAllBooks();
		if (res.success) {
			console.log('data', res.data);
		}
		else {
			console.log('ERROR');
		}
	}

	ready() {
		this.openDefaultPage();

		const user = this.app.getService("user");
		const userName = user.getUser()?.userName;

		if (userName) {
			this.setHeaderValue(`Hello librarian ${userName}!`);
		}
	}
}
