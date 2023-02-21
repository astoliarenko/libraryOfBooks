import {IJetApp, IJetView, JetView} from "webix-jet";
import { IBaseView } from "webix-jet/dist/types/interfaces";

import constants from "../../constants";

export default class SidebarView extends JetView {
	data: any;
	folderName: string;

	constructor(app: IJetApp, config: { listMenu: any; }) {
		super(app, {});
		this.data = config.listMenu.data;
		this.folderName = config.listMenu.folderName;
	}

	config() {
		return {
			css: "sidebar",
			view: "sidebar",
			localId: constants.IDs.SIDEBAR,
			data: this.data,
			activeTitle: false,
			borderless: true,
			width: 200,
			minHeight: 300,
			on: {
				onAfterSelect: (id?: string) => this.show(id)
			}
		};
	}

	$$sidebar(): webix.ui.sidebar {
		return this.$$(constants.IDs.SIDEBAR) as unknown as webix.ui.sidebar;
	}
}
