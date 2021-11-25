import {JetView} from "webix-jet";

import constants from "../constants";

export default class UsersTableView extends JetView {
	config() {
		const dt = {
			view: "datatable",
			hover: "myHover",
			localId: constants,
			columns: []
		};

		return dt;
	}
}
