import {JetView} from "webix-jet";

import constants from "../constants";
import RegisterWindowView from "./authorization/registerWindow";

export default class AutorizationView extends JetView {
	config() {
		const inputMargin = 10;
		const formMaxWidth = 400;

		const btnClearForm = {
			view: "button",
			label: "Clear",
			click: () => this.clearForm()
		};

		const btnLogIn = {
			view: "button",
			label: "Log in",
			css: "webix_primary",
			click: () => this.authorizeUser()
		};

		const btnRegisterNewUser = {
			view: "button",
			label: "Register now",
			css: "webix_primary",
			click: () => this.window.showWindow()
		};

		const checkbox = {
			view: "checkbox",
			css: "cursor-pointer",
			// localId: ,
			label: "Remember",
			name: "State",
			checkValue: "Close",
			uncheckValue: "Open"
		};

		const form = {
			view: "form",
			localId: constants.AUTHORIZATION_VIEW.VIEW_IDS.FORM_ID,
			maxWidth: formMaxWidth,
			elements: [
				{view: "template", template: "Authorization", type: "section"},
				{
					margin: inputMargin,
					rows: [
						{
							view: "text",
							label: "Login",
							name: "login",
							invalidMessage: "Title must not be empty"
						},
						{
							view: "text",
							label: "Password",
							type: "password",
							name: "password",
							invalidMessage: "Ent. year between 1970 and cur."
						}
					]
				}
			],
			rules: {
				login: webix.rules.isNotEmpty,
				password: webix.rules.isNotEmpty
			}
		};

		const ui = {
			cols: [
				{},
				{
					rows: [
						form,
						{cols: [btnLogIn, {}, btnClearForm]},
						checkbox,
						{cols: [{}, btnRegisterNewUser, {}]},
						{}
					]
				}
			]
		};

		return ui;
	}

	authorizeUser() {
		// eslint-disable-next-line no-console
		console.log("authorize...");

		// const formValues = this.form.getValues();


		// захешировать пароль
		// проверить логин и пароль с данными в бд, если такие существуют то получить id пользователя
		// и открыть ЕМУ доступ в зависимости от его роли
		// в ином случае написать что логин или пароль неверны и очистить инпут пароля

		// const viewName = user;
		// this.show(`${viewName}?id=${id}`);
	}

	clearForm() {
		this.form.clear();
		this.form.clearValidation();
		// this.getRoot().hide();
	}

	init() {
		this.form = this.$$(constants.AUTHORIZATION_VIEW.VIEW_IDS.FORM_ID);
		this.window = this.ui(RegisterWindowView);
	}
}
