import MainPage from "./mainPage";

import BooksModel from "models/books";

// reader can:
// registr,
// auth,
// order books,
// cancel order,
// see availible book copies,
// edit profile data
export default class Reader extends MainPage {
	constructor(app) {
		super(
			app,
			{
				listMenu: {
					data: [
						{id: "orderBook", value: "Order book", isDefaultPage: true},
						{id: "cancelOrder", value: "Cancel order"},
						{id: "profile", value: "Profile"}
					],
					folderName: "reader"
				}
			},
			{}
		)
	}

	init() {
		this.loadGenres();
	}

	async loadGenres() {
		const booksModel = BooksModel.getInstance();
		const res = await booksModel.getBookGenres();
		if (res.success) {
			booksModel.setGenresData(res.data);
		}
	}

	ready() {
		this.openDefaultPage();

		const user = this.app.getService("user");
		const userName = user.getUser()?.userName;

		if (userName) {
			this.setHeaderValue(`Hello reader ${userName}!`);
		}
	}
}
