import {JetView} from "webix-jet";

import constants from "../../constants";
import { formInputs } from "../../helpers/constants/commonConst";
import { wrapInScrollView, getDate } from "../../helpers/usefulFunctions";
import generatePhonenumberTextInputConfig from "../../helpers/inputs";
import AuthModel from "../../models/authModel";
import ProgressBar from "../../helpers/progressBar";

const formNames = {
	firstName: 'first_name',
	secondName: 'last_name',
	thirdName: 'third_name',
	passportNumber: 'passport_number',
	birthDate: 'birthday',
	address: 'address',
	login: 'login',
	password: 'password',
	phone1: 'phone_1',
	phone2: 'phone_2',
	phone3: 'phone_3',
	phone4: 'phone_4'
};
const phoneNumberLength = formInputs.phoneNumberLength;

export default class RegisterWindowView extends JetView {
	private progressBar: ProgressBar;

	private formView: webix.ui.form;

	config() {
		const root = this;
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
							pattern: {mask:"##-#######"},
							required: true,
							invalidMessage: "Two capital letters + 7 digits",
							validate: (value: string) => {
								const regExp = /^[A-Z]{2}\d{7}/g;
								return regExp.test(value);
							}
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
							onTimedKeyPress() {
								if (this.getValue().length === phoneNumberLength) {
									root.$$form.queryView({name: formNames.phone2}).show();
								}
							}
						}, required: true}),
						generatePhonenumberTextInputConfig("Телефон-2", formNames.phone2, labelWidth, {hidden: true, on: {
							onTimedKeyPress() {
								if (this.getValue().length === phoneNumberLength) {
									root.$$form.queryView({name: formNames.phone3}).show();
								}
							}
						}}),
						generatePhonenumberTextInputConfig("Телефон-3", formNames.phone3, labelWidth, {hidden: true, on: {
							onTimedKeyPress() {
								if (this.getValue().length === phoneNumberLength) {
									root.$$form.queryView({name: formNames.phone4}).show();
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
							labelWidth,
							required: true
						}
					]
				}
			],
			rules: {
				[formNames.firstName]: webix.rules.isNotEmpty,
				[formNames.secondName]: webix.rules.isNotEmpty,
				[formNames.login]: webix.rules.isNotEmpty,
				[formNames.password]: webix.rules.isNotEmpty,
				[formNames.phone1]: (value) => {
					const form = this.$$form;

					if (value.length === phoneNumberLength
						|| form.queryView({name: formNames.phone2}).getValue().length === phoneNumberLength
						|| form.queryView({name: formNames.phone3}).getValue().length === phoneNumberLength
						|| form.queryView({name: formNames.phone4}).getValue().length === phoneNumberLength
					) {
						return true;
					}
					else {
						form.markInvalid(formNames.phone1, "Type minimum one phone number");
						// form.queryView({name: formNames.phone1}).markInvalid()
						return false;
					}
				},
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

	init(view) {
		this.progressBar = new ProgressBar(view);
	}

	get $$form(): webix.ui.form {
		if (!this.formView) {
			this.formView = this.$$(constants.AUTHORIZATION_VIEW.REGISTER.FORM_ID) as unknown as webix.ui.form;
		}
		return this.formView;
	}

	// eslint-disable-next-line consistent-return
	async registerNewUser() {
		this.progressBar.showProgress();
		// eslint-disable-next-line no-console
		console.log("register new user");

		const authModel = AuthModel.getInstance();

		const form = this.$$form;

		if (form.isDirty() && form.validate()) {
			const values = form.getValues();
			const copyValues = webix.copy(values);

			for (let key in copyValues) {
				if (!copyValues[key]) {
					delete copyValues[key];
				}
				else if (key.indexOf('phone') !== -1) {
					delete copyValues[key];
				}
			}

			if (copyValues.birthday) {
				copyValues.birthday = getDate(copyValues.birthday);
			}

			const phones = [];
			for(let i = 1; i <= 4; i++) {
				const phoneValue = values[`phone_${i}`];
				if (phoneValue) {
					phones.push(phoneValue);
				}
			}
			const uniquePhones = new Set(phones);

			copyValues.phoneNumbers = Array.from(uniquePhones);

			// const mockValues = {
			// 	first_name: 'Alex',
			// 	last_name: 'Malex',
			// 	passport_number: 'BM11111111',
			// 	// birthday: '2000-01-01',
			// 	birthday: 1231231,
			// 	// phone_1: '375331112233',
			// 	// phone_2: '375331112233',
			// 	phoneNumbers: ['375331112233', '375331112233'],
			// 	login: 'librarian',
			// 	password: 'librarian'
			// }

			const res = await authModel.registrationNewUser(copyValues);

			if (res.success) {
				this.hideWindow();
				const user = this.app.getService("user");

				user.cookieLogin().catch((e) => {
					// eslint-disable-next-line no-console
					console.log(e);
				});
			}
			else if (res.errorFields) {
				form.markInvalid(res.errorFields[0], res.data.message);
			}
		}

		this.progressBar.hideProgress();

		
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

	private generateNameTextInputConfig(label: string, name: string, isRequired: boolean, labelWidth: number, additioanalConfig?: webix.ui.textConfig) {
		return {
			view: "text",
			label,
			name,
			labelWidth,
			required: isRequired,
			attributes: {maxlength: 30},
			...additioanalConfig
		} as webix.ui.textConfig
	}
}
