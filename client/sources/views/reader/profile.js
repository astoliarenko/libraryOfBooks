import {JetView} from "webix-jet";

import constants from "../../constants";
import userInfoColumns from "../../data/userInfoColumns";

export default class ProfileView extends JetView {
	config() {
		const labelWidth = 120;
		const formWidth = 800;

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
							cols: [
								{
									gravity: 1,
									rows: [
										{
											view: "text",
											label: "Имя",
											name: userInfoColumns.firstName,
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
											name: userInfoColumns.passportNumber,
											labelWidth
										},
										{
											view: "datepicker",
											value: "",
											name: userInfoColumns.birthDate,
											label: "Дата рождения",
											timepicker: false,
											format: webix.Date.dateToStr(constants.DATE_FORMAT),
											labelWidth
										},
										{
											view: "textarea",
											label: "Адрес",
											name: userInfoColumns.address,
											labelWidth
										}
									]
								},
								{
									gravity: 1,
									rows: [
										{
											view: "text",
											label: "Телефон-1",
											name: userInfoColumns.phoneNumber1,
											labelWidth
										},
										{
											view: "text",
											label: "Телефон-2",
											name: userInfoColumns.phoneNumber2,
											labelWidth
										},
										{
											view: "text",
											label: "Телефон-3",
											name: userInfoColumns.phoneNumber3,
											labelWidth
										},
										{
											view: "text",
											label: "Телефон-4",
											name: userInfoColumns.phoneNumber4,
											labelWidth
										}
									// {
									// 	view: "text",
									// 	label: "Логин",
									// 	name: "login",
									// 	labelWidth
									// },
									// {
									// 	view: "text",
									// 	label: "Password",
									// 	type: "password",
									// 	name: "password",
									// 	invalidMessage: "Ent. year between 1970 and cur.",
									// 	labelWidth
									// }
									]
								}
							]
						},
						{
							cols: [
								applyChangesBtn,
								{},
								cancelChangesBtn
							]
						}
					]
				}
			],
			rules: {
				firstName: webix.rules.isNotEmpty
			}
		};

		const ui = {
			type: "clean",
			cols: [
				form, {}
			]
		};

		return ui;
	}

	$$form() {
		return this.$$(constants.IDs.USER_INFO_FORM);
	}

	ready() {
		// booksCollection.waitData.then(() => {
		// 	const id = booksCollection.getFirstId();

		// 	if (id) {
		// 		this.dt.$$datatable().select(id);
		// 	}
		// });
	}

	applyChanges() {
		// const form = this.$$form();
	}
}
