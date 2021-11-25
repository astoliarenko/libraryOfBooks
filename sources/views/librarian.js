import {JetView, plugins} from "webix-jet";

import constants from "../constants";

export default class UsersTableView extends JetView {
	config() {
		const usersList = {
			localId: constants,
			view: "list",
			// css: "",
			width: constants.CONTACTS_VIEW.LIST_WIDTH,
			select: true,
			template: this.renderContactListShortInfo,
			on: {
				onAfterSelect: id => this.show(`user?id=${id}`)
			}
		};

		const ui = {
			cols: [
				{
					css: "bg-white",
					rows: [
						usersList,
						{}
					]
				},
				{$subview: true}
			]
		};

		return ui;
	}
}
