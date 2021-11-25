import {JetView} from "webix-jet";

import constants from "../../constants";

export default class RegisterWindowView extends JetView {
	config() {
		const btnWidth = 150;
		const labelWidth = 120;
		const formWidth = 400;

		const btnRegisterNewUser = {
			view: "button",
			width: btnWidth,
			label: "Reg now",
			css: "webix_primary",
			click: () => this.registerNewUser()
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
							label: "Имя",
							name: "firstName",
							labelWidth
						},
						{
							view: "text",
							label: "Фамилия",
							name: "secondName",
							labelWidth
						},
						{
							view: "text",
							label: "Отчество",
							name: "thirdName",
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
							name: "DateObj",
							label: "Дата рождения",
							timepicker: false,
							format: webix.Date.dateToStr(constants.DATE_FORMAT),
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
								btnRegisterNewUser,
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
	registerNewUser() {
		// eslint-disable-next-line no-console
		console.log("register new user");

		this.hideWindow();
	}

	hideWindow() {
		this.form.clear();
		this.form.clearValidation();
		this.getRoot().hide();
	}

	showWindow() {
		this.getRoot().show();
	}

	init() {
		this.form = this.$$(constants.AUTHORIZATION_VIEW.REGISTER.FORM_ID);
	}
}
