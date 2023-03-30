import {IJetApp, JetView} from "webix-jet";
import sidebarConfig from "../../interfaces/sideBarConfig";

import constants from "../../constants";

export default class Sidebar extends JetView {
	private data: any;
	private folderName: string;

	constructor(app: IJetApp, config: sidebarConfig) {
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

	public get $$sidebar() {
		return this.$$(constants.IDs.SIDEBAR) as unknown as webix.ui.sidebar;
	}
}
