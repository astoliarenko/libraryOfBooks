import {JetView} from "webix-jet";

import booksCollection from "../../collections/booksDataCollections";
// import constants from "../../constants";
import booksColumns from "../../data/booksColumns";
import DatatableView from "../commonView/datatable";
import BooksModel from "models/books";
import { wrapInScrollView } from "../../helpers/usefulFunctions";

export default class OrderBookView extends JetView {
	dt: any;
	booksData: any;

	config() {
		const fullInfoWidth = 500;

		const dtConfig = {
			columns: [
				{ id: "order", header: { content: "masterCheckbox", contentId: "mc1" }, width: 50, template: "{common.checkbox()}" },
				{ id: booksColumns.title, header: "Title", minWidth: 150, sort: "string", fillspace: true },
				{ id: booksColumns.author, header: "Author", minWidth: 150, sort: "string", fillspace: true },
				{ id: booksColumns.avalibleCopies, header: "Copies", width: 100, sort: "string" },
				{ id: booksColumns.genres, header: "Genres", minWidth: 150, fillspace: true },
				{ id: booksColumns.pages, header: "Pages", wminWidthidth: 100, sort: "int", fillspace: true }
			],
			// data: booksCollection,
			select: true,
			tooltip: true,
			scrollX: true,
			minWidth: 500,
			on: {
				onAfterSelect: (data) => {
					const fullInfo = this.$$("fullInfoId") as unknown as webix.ui.template;
					fullInfo.parse(this.dt.$$datatable.getItem(data.id), "json");
				}
				// onCheck: (id) => {
				// }
			}
		} as unknown as webix.ui.datatableConfig;

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
								<span><strong>Publishing house:</strong> ${data[booksColumns.publishingHouse]}</span>
								<span><strong>Coutry of publication:</strong> ${data[booksColumns.countryOfPublication]}</span>
								<span><strong>Year of publishing:</strong> ${data[booksColumns.yearOfPublishing]}</span>
							</div>
							<div class="books-info__right-column">
								<img src="img/witcherPicture.jpg" alt="book">
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

		return wrapInScrollView('x', ui);
	}

	loadAllBooks() {
		const booksModel = BooksModel.getInstance();
		return booksModel.getAllBooks();
	}

	async ready() {
		const books = await this.loadAllBooks();

		if (books.success && books.data.length) {
			const table = this.dt.$$datatable;
			table.parse(books.data,  'json', true);
			table.select(table.getFirstId());
		}
	}
}
