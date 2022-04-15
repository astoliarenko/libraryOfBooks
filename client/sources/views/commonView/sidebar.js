import {JetView} from "webix-jet";

import constants from "../../constants";

export default class SidebarView extends JetView {
	constructor(app, config) {
		super(app);
		this.data = config.listMenu.data;
		this.folderName = config.listMenu.folderName;
	}

	config() {
		return {
			view: "sidebar",
			localId: constants.IDs.SIDEBAR,
			data: this.data,
			activeTitle: false,
			borderless: true,
			width: 250,
			minHeight: 300,
			on: {
				onAfterSelect: (id) => {
					if (id) {
						this.show(`${this.folderName}.${id}`);
					}
				}
			}
		};
	}

	$$sidebar() {
		return this.$$(constants.IDs.SIDEBAR);
	}
}
