import {JetView} from "webix-jet";

import HeaderView from "./commonView/header";
import SidebarView from "./commonView/sidebar";

// reader:
// регистрируется,
// авторизуется,
// заказывает книги,
// отзывает заказ книг,
// смотрит наличие доступных книг,
// заполняет свои личные данные в ЛК
export default class ReaderView extends JetView {
	config() {
		this.userName = this.app.getService("user").getUser().userName;

		const sidebarConfig = {
			listMenu: {
				data: [
					{id: "orderBook", value: "Order book", url: "orderBook"},
					{id: "cancelOrder", value: "Cancel order", url: "cancelOrder"},
					{id: "profile", value: "Profile", url: "profile"}
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

	ready() {
		this.sidebar.$$sidebar().select("orderBook");
	}
}
