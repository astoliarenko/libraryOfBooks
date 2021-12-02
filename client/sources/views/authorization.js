import {JetView} from "webix-jet";

import constants from "../constants";
import RegisterWindowView from "./authorization/registerWindow";

export default class AutorizationView extends JetView {
	config() {
		const inputMargin = 10;
		const formMaxWidth = 400;
		const formMinWidth = 300;
		const btnMinWidth = 125;
		const checkboxTrue = "remember";
		const checkboxFalse = "notremember";

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
			minWidth: btnMinWidth,
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
			checkValue: checkboxTrue,
			uncheckValue: checkboxFalse
		};

		const form = {
			view: "form",
			localId: constants.AUTHORIZATION_VIEW.VIEW_IDS.FORM_ID,
			maxWidth: formMaxWidth,
			minWidth: formMinWidth,
			elements: [
				{view: "template", template: "Authorization", type: "section"},
				{
					margin: inputMargin,
					rows: [
						{
							view: "text",
							label: "Login",
							name: "login",
							invalidMessage: "Login must not be empty"
						},
						{
							view: "text",
							label: "Password",
							type: "password",
							name: "password",
							invalidMessage: "Password must be 4-8 characters"
						}
					]
				},
				{cols: [btnLogIn, {}, btnClearForm]},
				checkbox,
				{cols: [{}, btnRegisterNewUser, {}]},
			],
			rules: {
				login: webix.rules.isNotEmpty,
				password: value => value.length >= 4 && value.length <= 8
			},
			on: {
				onSubmit: () => this.authorizeUser()
			}
		};

		const ui = {
			cols: [
				{},
				{
					rows: [
						form,
						{}
					]
				},
				{}
			]
		};

		return ui;
	}

	authorizeUser() {
		// eslint-disable-next-line no-console
		if (!this.form.validate()) return;

		// eslint-disable-next-line no-console
		console.log("authorize...");

		const formValues = this.form.getValues();
		console.log("state=", formValues.State);
		const data = {username: formValues.login, password: formValues.password};

		fetch('http://localhost:3500/auth/login', {
			method: 'POST',
			// mode: 'no-cors', // no-cors, *cors, same-origin
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data) // body data type must match "Content-Type" header
		})
			.then((response) => response.json())
			.then((token) => {
				if (formValues.State === "remember") {
					//сохранить токен в localstorage
					localStorage.setItem("token", token);
					console.log("TOKEN=", token);
					console.log("TOKEN was saved=", localStorage.getItem("token"));
					console.log("TOKEN was saved=", localStorage["token"]);
				}
			});
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
