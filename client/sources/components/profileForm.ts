import {IJetApp, JetView} from "webix-jet";
import constants from "../constants";
import { formInputNames, formInputs } from "../helpers/constants/commonConst";
import generatePhonenumberTextInputConfig from "../helpers/inputs";

const formNames = formInputNames.userInfo;
const phoneNumberLength = formInputs.phoneNumberLength;

export default class ProfileForm extends JetView {
	private additioanalConfig: webix.ui.formConfig;

	private elementsConfig: { [key: string]: any };

	private type: "registration" | "update";

	private rules: { [key: string]: any };

	private formNames = formNames;

	private formView: webix.ui.form;

	constructor(
		app: IJetApp,
		{},
		type: "registration" | "update",
		additioanalConfig: webix.ui.formConfig,
		elementsConfig: { [key: string]: any },
		rules: any
	) {
		super(app, {});

		this.additioanalConfig = additioanalConfig;
		this.elementsConfig = elementsConfig;
		this.type = type;
		this.rules = rules;
	}

	config() {
		const root = this;

		const elements = [
			{
				rows: [
					this.generateNameTextInputConfig(
						"Имя",
						formNames.firstName,
						true
					),
					this.generateNameTextInputConfig(
						"Фамилия",
						formNames.secondName,
						true
					),
					this.generateNameTextInputConfig(
						"Отчество",
						formNames.thirdName,
						false
					),
					{
						view: "text",
						label: "Номер паспорта",
						name: formNames.passportNumber,
						pattern: {mask:"##-#######"},
						required: true,
						invalidMessage: "Two capital letters + 7 digits",
						validate: (value: string) => {
							const regExp = /^[A-Z]{2}\d{7}/g;
							return regExp.test(value);
						},
						disabled: this.type === "update"
					} as webix.ui.textConfig,
					{
						view: "datepicker",
						value: "",
						name: formNames.birthDate,
						label: "Дата рождения",
						timepicker: false,
						format: webix.Date.dateToStr(constants.DATE_FORMAT, false),
					} as webix.ui.datepickerConfig,
					{
						view: "textarea",
						label: "Адрес",
						name: formNames.address,
						attributes: {maxlength: 120}
					},
					generatePhonenumberTextInputConfig(
						"Телефон-1",
						formNames.phone1,
						this.type === "registration" ? {
							on: {
								onTimedKeyPress() {
									if (this.getValue().length === phoneNumberLength) {	
										root.$$form.queryView({name: formNames.phone2}).show();
									}
								}
							},
							required: true
						} : {}
					),
					generatePhonenumberTextInputConfig(
						"Телефон-2",
						formNames.phone2,
						this.type === "registration" ? {
							on: {
								onTimedKeyPress() {
									if (this.getValue().length === phoneNumberLength) {	
										root.$$form.queryView({name: formNames.phone3}).show();
									}
								}
							},
							hidden: true
						} : {}
					),
					generatePhonenumberTextInputConfig(
						"Телефон-3",
						formNames.phone3,
						this.type === "registration" ? {
							on: {
								onTimedKeyPress() {
									if (this.getValue().length === phoneNumberLength) {	
										root.$$form.queryView({name: formNames.phone4}).show();
									}
								}
							},
							hidden: true
						} : {}
					),
					generatePhonenumberTextInputConfig(
						"Телефон-4",
						formNames.phone4,
						this.type === "registration" ? {hidden: true} : {}
					),
				]
			}
		];

		if (this.type === "registration") {
			elements[0].rows.push({
				view: "text",
				label: "Логин",
				name: formNames.login,
				required: true
			} as webix.ui.textConfig, {
				view: "text",
				label: "Password",
				type: "password",
				name: formNames.password,
				required: true
			} as webix.ui.textConfig);
		}
		else if (this.type === "update") {
			elements[0].rows.unshift({
				view: "text",
				label: "Номер карточки",
				name: formNames.cardId,
				pattern: {mask:"##-##-##", allow:/[0-9]/g},
				disabled: true
			} as webix.ui.textConfig);
		}

		const form = {
			view: "form",
			borderless: true,
			padding: {top: 18, left: 17, right: 18, bottom: 7},
			elementsConfig: {
				labelWidth: this.elementsConfig.labelWidth
			},
			elements,
			rules: {
				[formNames.firstName]: webix.rules.isNotEmpty,
				[formNames.secondName]: webix.rules.isNotEmpty,
				[formNames.phone1]: (value: string) => {
					const form = this.$$form;

					if (value.length === phoneNumberLength
						|| form.getValues()[formNames.phone2].length === phoneNumberLength
						|| form.getValues()[formNames.phone3].length === phoneNumberLength
						|| form.getValues()[formNames.phone4].length === phoneNumberLength
					) {
						return true;
					}
					else {
						form.markInvalid(formNames.phone1, "Type minimum one phone number");
						return false;
					}
				},
				...this.rules
			},
			...this.additioanalConfig
		} as webix.ui.formConfig;

		return form;
	}

	init(view) {
		this.formView = view as webix.ui.form;
	}

	public get $$form() {
		return this.formView;
	}

	public get inputNames() {
		return this.formNames;
	}

	private generateNameTextInputConfig(label: string, name: string, isRequired: boolean, additioanalConfig?: webix.ui.textConfig): webix.ui.textConfig {
		return {
			view: "text",
			label,
			name,
			required: isRequired,
			attributes: {maxlength: 30},
			...additioanalConfig
		};
	}
}
