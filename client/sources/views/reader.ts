import {JetView} from "webix-jet";

import HeaderView from "./commonView/header";
import SidebarView from "./commonView/sidebar";
import BooksModel from "models/books";

// reader can:
// registr,
// auth,
// order books,
// cancel order,
// see availible book copies,
// edit profile data
export default class ReaderView extends JetView {
	userName: string;
	sidebar: any;
	header: any;

	config() {
		this.userName = this.app.getService("user").getUser()?.userName;

		const sidebarConfig = {
			listMenu: {
				data: [
					{id: "orderBook", value: "Order book"},
					{id: "cancelOrder", value: "Cancel order"},
					{id: "profile", value: "Profile"}
				],
				folderName: "reader"
			}
		};

		this.sidebar = new SidebarView(this.app, sidebarConfig);
		this.header = new HeaderView(this.app, {headerName: this.userName ? `Hello ${this.userName}!` : "Hello reader!"});

		const ui = {
			type: "clean",
			cols: [this.sidebar, {type: "clean", rows: [this.header, {$subview: true}]}]
		};

		return ui;
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
		this.sidebar.$$sidebar().select("orderBook");
	}
}
