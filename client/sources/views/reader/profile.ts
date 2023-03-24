import {JetView} from "webix-jet";

import constants from "../../constants";
import { wrapInScrollView } from "../../helpers/usefulFunctions";
import { formInputNames } from "../../helpers/constants/commonConst";
import ProgressBar from "../../helpers/progressBar";

const formNames = formInputNames.userInfo;
const formLayoutId = 'formLayout';

export default class ProfileView extends JetView {
	private progressBar: ProgressBar;

	private formView: webix.ui.form;

	config() {
		const labelWidth = 120;
		const formWidth = 400;

		const applyChangesBtn = {
			view: "button",
			label: "Apply",
			type: "icon",
			icon: "wxi-check",
			height: 50,
			width: 100,
			click: () => {
				webix.confirm("Apply changes?")
					.then(() => {
						this.applyChanges();
						webix.message("Apply", "info");
					})
					// @ts-ignore
					.fail(() => {
						webix.message("Cancel", "error");
					});
			}
		};

		const cancelChangesBtn = {
			view: "button",
			label: "Cancel",
			type: "icon",
			icon: "wxi-close",
			height: 50,
			width: 100,
			click: () => {
				webix.confirm("Cancel changes?")
					.then(() => {
						webix.message("Cancel", "info");
					})
					// @ts-ignore
					.fail(() => {
						webix.message("Cancel", "error");
					});
			}
		};

		const form = {
			view: "form",
			borderless: true,
			localId: constants.IDs.USER_INFO_FORM,
			width: formWidth,
			elementsConfig: {
				margin: 10
			},
			elements: [
				{
					rows: [
						{
							view: "text",
							label: "Номер карточки",
							name: formNames.cardId,
							labelWidth
						},
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
						},
						{
							view: "textarea",
							label: "Адрес",
							name: formNames.address,
							labelWidth
						},
						{
							view: "text",
							label: "Телефон-1",
							name: formNames.phone1,
							labelWidth
						},
						{
							view: "text",
							label: "Телефон-2",
							name: formNames.phone2,
							labelWidth
						},
						{
							view: "text",
							label: "Телефон-3",
							name: formNames.phone3,
							labelWidth
						},
						{
							view: "text",
							label: "Телефон-4",
							name: formNames.phone4,
							labelWidth
						}
					// {
					// 	view: "text",
					// 	label: "Логин",
					//  name: formNames.login,
					// 	labelWidth
					// },
					// {
					// 	view: "text",
					// 	label: "Password",
					// 	type: "password",
					// 	name: formNames.password,
					// 	invalidMessage: "Ent. year between 1970 and cur.",
					// 	labelWidth
					// }
					]
				}
			],
			rules: {
				firstName: webix.rules.isNotEmpty
			}
		};

		const ui = {
			type: "clean",
			rows: [
				wrapInScrollView('xy', {
					rows: [
						{
							localId: formLayoutId,
							cols: [
								form, {}
							]
						},
						{}
					]
				}),
				{
					padding: 20,
					cols: [
						applyChangesBtn,
						{},
						cancelChangesBtn
					]
				}
			]
		};

		return ui;
	}

	get $$form() {
		if (!this.formView) {
			this.formView = this.$$(constants.IDs.USER_INFO_FORM) as unknown as webix.ui.form;
		}
		return this.formView;
	}

	get $$formLayout() {
		return this.$$(formLayoutId) as unknown as webix.ui.layout;
	}

	init() {
		this.progressBar = new ProgressBar(this.$$formLayout);
	}

	ready() {
		this.progressBar.showProgress();
	}

	applyChanges() {
		// const form = this.$$form();
	}
}
