import {JetView, IJetApp} from "webix-jet";

import constants from "../../constants";
import headerConfig from "../../interfaces/headerConfig";

const headerTemplateId = 'headerTemplate';
export default class Header extends JetView {
	headerTxt: string;

	constructor(app: IJetApp, config: headerConfig) {
		super(app, {});
		this.headerTxt = config.headerName;
	}

	config() {
		const headerHeight = 80;
		const headerPadding = 13;

		const headerTxt = {
			localId: headerTemplateId,
			template: this.headerTxt ? this.headerTxt : 'Unknown',
			type: "header",
			borderless: true,
			align: "left"
		} as webix.ui.templateConfig;

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
					// @ts-ignore
					.fail(() => {
						webix.message("Cancel");
					});
			}
		} as webix.ui.buttonConfig;

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
		} as webix.ui.layoutConfig;

		return ui;
	}

	public get $$header() {
		return this.$$(constants.IDs.HEADER) as unknown as webix.ui.layout;
	}

	public setHeaderValue(value: string) {
		const headerTemplate = this.$$(headerTemplateId) as unknown as webix.ui.template;

		headerTemplate.define('template', value);
		headerTemplate.refresh();
	}
}
