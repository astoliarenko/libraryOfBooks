import {JetView} from "webix-jet";

import HeaderView from "./commonView/header";
import SidebarView from "./commonView/sidebar";

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

	ready() {
		this.sidebar.$$sidebar().select("orderBook");
	}
}
