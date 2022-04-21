import {JetView} from "webix-jet";

import constants from "../../constants";

export default class HeaderView extends JetView {
	constructor(app, config) {
		super(app);
		this.headerTxt = config.headerName;
	}

	config() {
		const headerHeight = 80;
		const headerPadding = 13;

		const headerTxt = {
			template: this.headerTxt,
			type: "header",
			borderless: true,
			align: "left"
		};

		const btnLogOut = {
			view: "button",
			label: "Log out",
			type: "icon",
			icon: "wxi-user",
			height: 50,
			width: 100,
			click: () => {
				webix.confirm("Log out?")
					.then(() => {
						const user = this.app.getService("user");
						user.logout();
					})
					.fail(() => {
						webix.message("Cancel");
					});
			}
		};

		const ui = {
			localId: constants.IDs.HEADER,
			padding: headerPadding,
			css: "main-header",
			cols: [
				headerTxt,
				{},
				{
					borderless: true,
					rows: [{}, btnLogOut, {}]
				}
			],
			height: headerHeight,
			borderless: true
		};

		return ui;
	}

	$$header() {
		return this.$$(constants.IDs.HEADER);
	}
}
