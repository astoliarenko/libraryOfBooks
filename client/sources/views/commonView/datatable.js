import {JetView} from "webix-jet";

import constants from "../../constants";

export default class DatatableView extends JetView {
	constructor(app, config) {
		super(app);
		this.dtConfig = config;
	}

	config() {
		const DT_PAGER_ID = String(webix.uid());
		// const DT_PAGER_ID = "myPagerId";

		const dtPager = {
			height: 32,
			view: "pager",
			id: DT_PAGER_ID,
			size: 10,
			group: 5,
			template: (obj, common) => {
				const pager = `
					${common.prev(obj)}
					${common.pages(obj)}
					${common.next(obj)}
					${common.last(obj)}
				`;

				return pager;
			}
		};

		const dt = {
			localId: constants.IDs.DATATABLE,
			css: "custom-datatable",
			view: "datatable",
			scrollX: false,
			rowHeight: 40,
			headerRowHeight: 50,
			borderless: true,
			pager: DT_PAGER_ID,
			...this.dtConfig
		};

		const ui = {
			type: "clean",
			rows: [
				dt,
				{
					type: "clean",
					paddingX: 8,
					paddingY: 7,
					cols: [{}, dtPager, {}]
				}
			]
		};

		return ui;
	}

	$$datatable() {
		return this.$$(constants.IDs.DATATABLE);
	}
}
