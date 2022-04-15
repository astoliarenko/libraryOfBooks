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
			select: true,
			on: {
				onAfterSelect: (data) => {
					this.$$("fullInfoId").parse(booksCollection.getItem(data.id));
				}
			}
		};

		this.dt = new DatatableView(this.app, dtConfig);

		const searchInput = {
			view: "search",
			placeholder: "Search..",
			width: 300,
			height: 30
		};

		const fullInfoTemplate = {
			css: "full-book-info",
			view: "template",
			localId: "fullInfoId",
			width: 200,
			template: (data) => {
				const html = `
					<div class="books-info">
						<div class="books-info__header">${data[booksColumns.title]}</div>
						<div class="books-info__left-column">
							<span>Author: ${data[booksColumns.author]}</span>
							<span>Genres: ${data[booksColumns.genres]}</span>
							<span>Publishing house: ${data[booksColumns.publishing_house]}</span>
							<span>Coutry of publication: ${data[booksColumns.country_of_publication]}</span>
							<span>Year of publishing: ${data[booksColumns.yearOfPublishing]}</span>
						</div>
						<div class="books-info__right-column">
							<img src="sources/img/witcherPicture.jpg" alt="book">
						</div>
					</div>
				`;

				return html;
			}
		};

		const ui = {
			type: "clean",
			rows: [
				{
					type: "clean",
					cols: [searchInput, {}]
				},
				{
					type: "clean",
					cols: [this.dt, fullInfoTemplate]
				}
			]
		};

		return ui;
	}

	ready() {
		booksCollection.waitData.then(() => {
			const id = booksCollection.getFirstId();

			if (id) {
				this.dt.$$datatable().select(id);
			}
		});
	}
}
