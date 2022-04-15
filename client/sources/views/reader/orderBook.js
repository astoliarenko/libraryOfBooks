import {JetView} from "webix-jet";

import booksCollection from "../../collections/booksDataCollections";
// import constants from "../../constants";
import booksColumns from "../../data/booksColumns";
import DatatableView from "../commonView/datatable";

export default class OrderBookView extends JetView {
	config() {
		const dtConfig = {
			columns: [
				{id: booksColumns.title, header: "", width: 50, sort: "string", fillspace: true},
				{id: booksColumns.author, header: {content: "masterCheckbox", contentId: "mc1"}, width: 50, template: "{common.checkbox()}"},
				{id: booksColumns.avalibleCopies, header: "Availible copies", width: 200, sort: "string"},
				{id: booksColumns.genres, header: "Genres", width: 80, fillspace: true},
				{id: booksColumns.pages, header: "Pages", width: 100, sort: "int"}
			],
			data: booksCollection,
			select: true
		};

		const dt = new DatatableView(this.app, dtConfig);

		const searchInput = {height: 30};

		const ui = {
			type: "clean",
			rows: [
				{
					type: "clean",
					cols: [searchInput, {}]
				},
				{
					type: "clean",
					cols: [dt, {width: 200}]
				}
			]
		};

		return ui;
	}
}
