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
	// cardId: 'cardId',
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
		const labelWidth = 160;
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
			value: "Clear",
			click: () => this.clearForm()
		};

		const form = {
			view: "form",
			localId: constants.AUTHORIZATION_VIEW.REGISTER.FORM_ID,
			width: formWidth,
			padding: {top: 18, left: 17, right: 18, bottom: 7},
			elements: [
				{
					rows: [
						this.generateNameTextInputConfig(
							"Имя",
							formNames.firstName,
							true,
							labelWidth
						),
						this.generateNameTextInputConfig(
							"Фамилия",
							formNames.secondName,
							true,
							labelWidth
						),
						this.generateNameTextInputConfig(
							"Отчество",
							formNames.thirdName,
							false,
							labelWidth
						),
						{
							view: "text",
							label: "Номер паспорта",
							name: formNames.passportNumber,
							labelWidth,
							pattern: {mask:"##-#######", allow:/[0-9]/g},
							required: true
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
							labelWidth,
							attributes: {maxlength: 120}
						},
						generatePhonenumberTextInputConfig("Телефон-1", formNames.phone1, labelWidth, {on: {
							onChange: (newValue, oldValue) => {
								if (newValue.length === 12) {
									this.$$form.queryView({name: formNames.phone2}).show();
								}
							}
						}}),
						generatePhonenumberTextInputConfig("Телефон-2", formNames.phone2, labelWidth, {hidden: true, on: {
							onChange: (newValue, oldValue) => {
								if (newValue.length === 12) {
									this.$$form.queryView({name: formNames.phone3}).show();
								}
							}
						}}),
						generatePhonenumberTextInputConfig("Телефон-3", formNames.phone3, labelWidth, {hidden: true, on: {
							onChange: (newValue, oldValue) => {
								if (newValue.length === 12) {
									this.$$form.queryView({name: formNames.phone4}).show();
								}
							}
						}}),
						generatePhonenumberTextInputConfig("Телефон-4", formNames.phone4, labelWidth, {hidden: true}),
						// {
						// 	view: "text",
						// 	label: "Номер карточки",
						// 	name: formNames.cardId,
						// 	pattern: {mask:"##-##-##", allow:/[0-9]/g},
						// 	labelWidth,
						// 	required: true
						// },
						{
							view: "text",
							label: "Логин",
							name: formNames.login,
							labelWidth,
							required: true
						},
						{
							view: "text",
							label: "Password",
							type: "password",
							name: formNames.password,
							invalidMessage: "Ent. year between 1970 and cur.",
							labelWidth,
							required: true
						}
					]
				}
			],
			rules: {
				[formNames.firstName]: webix.rules.isNotEmpty,
				[formNames.secondName]: webix.rules.isNotEmpty
			}
		} as webix.ui.formConfig;

		const ui = {
			localId: constants.AUTHORIZATION_VIEW.REGISTER.REGISTER_WINDOW_ID,
			view: "window",
			modal: true,
			head: {
				type: 'clean',
				cols: [
					{
						localId: constants.AUTHORIZATION_VIEW.REGISTER.HEADER_ID,
						template: "Зарегистрировать",
						width: 200
					},
					{},
					{
						view: "icon",
						icon: "wxi-close",
						click: () => {
							this.hideWindow();
						}
					}
				]
			},
			position: "center",
			body: {
				rows: [
					{
						...wrapInScrollView('y', form), minHeight: 400
					},
					{
						padding: {top: 18, left: 17, right: 18, bottom: 17},
						cols: [
							btnRegisterNewUser,
							{},
							btnCancel
					]
					}
				]
			}
		};

		return ui;
	}

	get $$form(): webix.ui.form {
		return this.$$(constants.AUTHORIZATION_VIEW.REGISTER.FORM_ID) as unknown as webix.ui.form;
	}

	// eslint-disable-next-line consistent-return
	registerNewUser() {
		// eslint-disable-next-line no-console
		console.log("register new user");

		const form = this.$$form;
		const values = form.getValues();

		this.hideWindow();
	}

	hideWindow() {
		this.clearForm();
		// @ts-ignore
		this.getRoot().hide();
	}

	private clearForm() {
		const form = this.$$form;

		form.clear();
		form.clearValidation();

		form.queryView({name: formNames.phone2}).hide();
		form.queryView({name: formNames.phone3}).hide();
		form.queryView({name: formNames.phone4}).hide();
	}

	showWindow() {
		// @ts-ignore
		this.getRoot().show();
	}

	private generateNameTextInputConfig(label: string, name: string, isRequired: boolean, labelWidth: number) {
		return {
			view: "text",
			label,
			name,
			labelWidth,
			required: isRequired,
			attributes: {maxlength: 30}
		} as webix.ui.textConfig
	}
}
