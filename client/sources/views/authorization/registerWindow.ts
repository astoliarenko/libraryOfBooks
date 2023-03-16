import {JetView} from "webix-jet";

import constants from "../../constants";
import { wrapInScrollView } from "../../helpers/usefulFunctions";
import generatePhonenumberTextInputConfig from "../..//helpers/inputs";

const formNames = {
	firstName: 'firstName',
	secondName: 'secondName',
	thirdName: 'thirdName',
	passportNumber: 'passportNumber',
	birthDate: 'birthDate',
	address: 'address',
	cardId: 'cardId',
	login: 'login',
	password: 'password',
	phone1: 'phone1',
	phone2: 'phone2',
	phone3: 'phone3',
	phone4: 'phone4'
}

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
							name: formNames.firstName,
							labelWidth
						},
						{
							view: "text",
							label: "Фамилия",
							name: formNames.secondName,
							labelWidth
						},
						{
							view: "text",
							label: "Отчество",
							name: formNames.thirdName,
							labelWidth
						},
						{
							view: "text",
							label: "Номер паспорта",
							name: formNames.passportNumber,
							labelWidth
						},
						{
							view: "datepicker",
							value: "",
							name: formNames.birthDate,
							label: "Дата рождения",
							timepicker: false,
							format: webix.Date.dateToStr(constants.DATE_FORMAT, false),
							labelWidth
						} as webix.ui.datepickerConfig,
						{
							view: "textarea",
							label: "Адрес",
							name: formNames.address,
							labelWidth
						},
						generatePhonenumberTextInputConfig("Телефон-1", formNames.phone1, labelWidth),
						generatePhonenumberTextInputConfig("Телефон-2", formNames.phone2, labelWidth),
						generatePhonenumberTextInputConfig("Телефон-3", formNames.phone3, labelWidth),
						generatePhonenumberTextInputConfig("Телефон-4", formNames.phone4, labelWidth),
						{
							view: "text",
							label: "Номер карточки",
							name: formNames.cardId,
							pattern: {mask:"##-##-##", allow:/[0-9]/g},
							labelWidth
						},
						{
							view: "text",
							label: "Логин",
							name: formNames.login,
							labelWidth
						},
						{
							view: "text",
							label: "Password",
							type: "password",
							name: formNames.password,
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
		} as webix.ui.formConfig;

		const ui = {
			localId: constants.AUTHORIZATION_VIEW.REGISTER.REGISTER_WINDOW_ID,
			view: "window",
			modal: true,
			head: {localId: constants.AUTHORIZATION_VIEW.REGISTER.HEADER_ID, template: "Зарегистрировать"},
			position: "center",
			body: {...wrapInScrollView('y', form), minHeight: 400}
		};

		return ui;
	}

	$$form(): webix.ui.form {
		return this.$$(constants.AUTHORIZATION_VIEW.REGISTER.FORM_ID) as unknown as webix.ui.form;
	}

	// eslint-disable-next-line consistent-return
	registerNewUser() {
		// eslint-disable-next-line no-console
		console.log("register new user");

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
}
