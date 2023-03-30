import {JetView, IJetApp} from "webix-jet";

import Header from "./commonView/header";
import Sidebar from "./commonView/sidebar";
import sidebarConfig from "../interfaces/sideBarConfig";
import headerConfig from "../interfaces/headerConfig";

export default class MainPage extends JetView {
	private sidebar: Sidebar;
	private header: Header;
	private sidebarConfig: sidebarConfig;
	private headerConfig: headerConfig;

	constructor(
		app: IJetApp,
		sidebarConfig: sidebarConfig,
		headerConfig: headerConfig
	) {
		super(app, {});

		this.sidebarConfig = sidebarConfig;
		this.headerConfig = headerConfig;
	}

	config() {
		this.sidebar = new Sidebar(this.app, this.sidebarConfig);
		this.header = new Header(this.app, this.headerConfig);

		const ui = {
			type: "clean",
			cols: [this.sidebar, {type: "clean", rows: [this.header, {$subview: true}]}]
		};

		return ui;
	}

	public headerView() {
		return this.header.$$header;
	}

	public sidebarView() {
		return this.sidebar.$$sidebar;
	}

	public openDefaultPage() {
		const defaultPage = this.sidebarConfig.listMenu.data.find(pageInfo => pageInfo.isDefaultPage);

		this.sidebar.$$sidebar.select(defaultPage.id);
	}

	public setHeaderValue(value: string) {
		this.header.setHeaderValue(value);
	}
}