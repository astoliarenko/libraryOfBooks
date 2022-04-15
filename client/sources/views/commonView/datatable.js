import {JetView} from "webix-jet";

import constants from "../../constants";

export default class DatatableView extends JetView {
	constructor(app, config) {
		super(app);
		this.dtConfig = config;
	}

	config() {
		const DT_PAGER_ID = "dtPagerId";

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
					${common.last(obj)}
					${common.next(obj)}
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
					height: 100,
					type: "clean",
					paddingX: 8,
					paddingY: 7,
					rows: [{}, dtPager, {}]
				}
			]
		};

		return ui;
	}

	$$datatable() {
		return this.$$(constants.IDs.DATATABLE);
	}

	setData(data) {
		this.$$datatable().sync(data);
	}
}
