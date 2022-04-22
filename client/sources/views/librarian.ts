import {JetView} from "webix-jet";

import constants from "../constants";

export default class UsersTableView extends JetView {
	config() {
		// авторизуется,
		// обновляет наличие книг,
		// смотрит профили читателей,
		// добавляет взятые книги читателям и снимает возвращенные книги с читателей,
		// пополняет БД новыми книгами,
		// удаляет старые книги.

		const usersList = {
			localId: constants,
			view: "list",
			// css: "",
			select: true,
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
