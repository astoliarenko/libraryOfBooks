import {JetView} from "webix-jet";

import constants from "../constants";

export default class BookWindowView extends JetView {
	config() {
		const btnWidth = 150;
		const labelWidth = 120;
		const formWidth = 400;

		const btnAddNewBook = {
			view: "button",
			width: btnWidth,
			label: "Add new book",
			css: "webix_primary",
			click: () => this.addNewBook()
		};

		const btnCancel = {
			view: "button",
			width: btnWidth,
			value: "Cancel",
			click: () => this.hideWindow()
		};

		const form = {
			view: "form",
			localId: constants.AUTHORIZATION_VIEW.REGISTER.FORM_ID,
			width: formWidth,
			elements: [
				{
					rows: [
						{
							view: "text",
							label: "Название",
							name: "book_title",
							labelWidth
						},
						{
							view: "text",
							label: "Photo",
							name: "cover_photo",
							labelWidth
						},
						{
							view: "text",
							label: "Жанры",
							name: "genres",
							labelWidth
						},
						{
							view: "text",
							label: "Номер паспорта",
							name: "thirdName",
							labelWidth
						},
						{
							view: "datepicker",
							value: "",
							name: "year_of_publishing",
							label: "Год издания",
							timepicker: false,
							format: webix.Date.dateToStr(constants.YEAR_FORMAT, false),
							labelWidth
						},
						{
							view: "textarea",
							label: "Адрес",
							name: "address",
							labelWidth
						},
						{
							view: "text",
							label: "Телефон-1",
							name: "phone1",
							labelWidth
						},
						{
							view: "text",
							label: "Телефон-2",
							name: "phone2",
							labelWidth
						},
						{
							view: "text",
							label: "Телефон-3",
							name: "phone3",
							labelWidth
						},
						{
							view: "text",
							label: "Телефон-4",
							name: "phone4",
							labelWidth
						},
						{
							view: "text",
							label: "Номер карточки",
							name: "number_111",
							labelWidth
						},
						{
							view: "text",
							label: "Логин",
							name: "login",
							labelWidth
						},
						{
							view: "text",
							label: "Password",
							type: "password",
							name: "password",
							invalidMessage: "Ent. year between 1970 and cur.",
							labelWidth
						},
						{
							cols: [
								btnAddNewBook,
								{},
								btnCancel
							]
						}
					]
				}
			],
			rules: {
				secondName: webix.rules.isNotEmpty,
				number_111: webix.rules.isNotEmpty
			}
		};

		const ui = {
			localId: constants.AUTHORIZATION_VIEW.REGISTER.REGISTER_WINDOW_ID,
			view: "window",
			modal: true,
			head: {localId: constants.AUTHORIZATION_VIEW.REGISTER.HEADER_ID, template: "Зарегистрировать"},
			position: "center",
			body: form
		};

		return ui;
	}

	// eslint-disable-next-line consistent-return
	addNewBook() {
		console.log("add new book");

		this.hideWindow();
	}

	hideWindow() {
		const form = this.$$form();

		form.clear();
		form.clearValidation();
		// @ts-ignore
		this.getRoot().hide();
	}

	showWindow() {
		// @ts-ignore
		this.getRoot().show();
	}

	$$form(): webix.ui.form {
		return this.$$(constants.AUTHORIZATION_VIEW.REGISTER.FORM_ID) as webix.ui.form;
	}
}
