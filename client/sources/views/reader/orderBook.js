import {JetView} from "webix-jet";

import booksCollection from "../../collections/booksDataCollections";
// import constants from "../../constants";
import booksColumns from "../../data/booksColumns";
import DatatableView from "../commonView/datatable";

export default class OrderBookView extends JetView {
	config() {
		const fullInfoWidth = 500;

		const dtConfig = {
			columns: [
				{id: booksColumns.title, header: "", width: 50, sort: "string", fillspace: true},
				{id: booksColumns.author, header: {content: "masterCheckbox", contentId: "mc1"}, width: 50, template: "{common.checkbox()}"},
				{id: booksColumns.avalibleCopies, header: "Copies", width: 100, sort: "string"},
				{id: booksColumns.genres, header: "Genres", width: 150},
				{id: booksColumns.pages, header: "Pages", width: 100, sort: "int"}
			],
			data: booksCollection,
			select: true,
			on: {
				onAfterSelect: (data) => {
					this.$$("fullInfoId").parse(booksCollection.getItem(data.id));
				}
				// onCheck: (id) => {
				// }
			}
		};

		this.dt = new DatatableView(this.app, dtConfig);

		const btnOrderAllSelected = {
			view: "button",
			label: "Order all",
			type: "icon",
			icon: "wxi-download",
			width: 120
		};

		const btnCancelOrder = {
			view: "button",
			label: "Cancel order",
			type: "icon",
			icon: "wxi-close-circle",
			height: 50,
			width: 150
		};

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
			width: fullInfoWidth,
			template: (data) => {
				const html = `
					<div class="books-info">
						<div class="books-info__header">${data[booksColumns.title]}</div>
						<div class="books-info__content">
							<div class="books-info__left-column">
								<span><strong>Author:</strong> ${data[booksColumns.author]}</span>
								<span><strong>Genres:</strong> ${data[booksColumns.genres]}</span>
								<span><strong>Publishing house:</strong> ${data[booksColumns.publishing_house]}</span>
								<span><strong>Coutry of publication:</strong> ${data[booksColumns.country_of_publication]}</span>
								<span><strong>Year of publishing:</strong> ${data[booksColumns.yearOfPublishing]}</span>
							</div>
							<div class="books-info__right-column">
								<img src="sources/img/witcherPicture.jpg" alt="book">
							</div>
						</div>
					</div>
				`;

				return html;
			}
		};

		const ui = {
			type: "space",
			rows: [
				{
					type: "clean",
					cols: [searchInput, {}, btnOrderAllSelected, btnCancelOrder]
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
