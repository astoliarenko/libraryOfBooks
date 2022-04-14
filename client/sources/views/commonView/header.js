import {JetView} from "webix-jet";

import constants from "../../constants";

export default class HeaderView extends JetView {
	constructor(app, config) {
		super(app);
		this.headerTxt = config.headerName;
	}

	config() {
		const headerTxt = {
			template: this.headerTxt,
			type: "header",
			borderless: true,
			width: 210,
			align: "left"
		};

		const btnLogOut = {
			view: "button",
			label: "Log out",
			type: "iconTop",
			icon: "wxi-user",
			height: 50,
			width: 100
		};

		const ui = {
			localId: constants.IDs.HEADER,
			padding: 13,
			cols: [
				headerTxt,
				{},
				btnLogOut
			],
			height: 100,
			borderless: true
		};

		return ui;
	}

	$$header() {
		return this.$$(constants.IDs.HEADER);
	}
}
