import { JetView } from "webix-jet";

import constants from "../constants";
import RegisterWindowView from "./authorization/registerWindow";

export default class AutorizationView extends JetView {
	config() {
		const inputMargin = 10;
		const formMaxWidth = 400;
		const formMinWidth = 300;
		const btnMinWidth = 125;
		const checkboxTrue = true;
		const checkboxFalse = false;

		const btnClearForm = {
			view: "button",
			label: "Clear",
			click: () => this.clearForm(),
		};

		const btnLogIn = {
			view: "button",
			label: "Log in",
			css: "webix_primary",
			click: () => this.authorizeUser(),
		};

		const btnRegisterNewUser = {
			view: "button",
			minWidth: btnMinWidth,
			label: "Register now",
			css: "webix_primary",
			click: () => this.window.showWindow(),
		};

		const checkbox = {
			view: "checkbox",
			css: "cursor-pointer",
			// localId: ,
			label: "Remember",
			name: "State",
			checkValue: checkboxTrue,
			uncheckValue: checkboxFalse,
		};

		const form = {
			view: "form",
			localId: constants.AUTHORIZATION_VIEW.VIEW_IDS.FORM_ID,
			maxWidth: formMaxWidth,
			minWidth: formMinWidth,
			elements: [
				{ view: "template", template: "Authorization", type: "section" },
				{
					margin: inputMargin,
					rows: [
						{
							view: "text",
							label: "Login",
							name: "login",
							invalidMessage: "Login must not be empty",
						},
						{
							view: "text",
							label: "Password",
							type: "password",
							name: "password",
							invalidMessage: "Password must be 4-8 characters",
						},
					],
				},
				{ cols: [btnLogIn, {}, btnClearForm] },
				checkbox,
				{ cols: [{}, btnRegisterNewUser, {}] },
			],
			rules: {
				login: webix.rules.isNotEmpty,
				password: (value) => value.length >= 4 && value.length <= 8,
			},
			on: {
				onSubmit: () => this.authorizeUser(),
			},
		};

		const ui = {
			cols: [
				{},
				{
					rows: [form, {}],
				},
				{},
			],
		};

		return ui;
	}

	$$form() {
		return this.$$(constants.AUTHORIZATION_VIEW.VIEW_IDS.FORM_ID);
	}

	authorizeUser() {
		const form = this.$$form();

		const user = this.app.getService("user");

		debugger;

		if (!form.validate()) return;

		console.log("authorize...");

		const formValues = form.getValues();

		this.rememberCredits = formValues.State;

		const data = {
			username: formValues.login,
			password: formValues.password,
		};

		debugger;

		user.login(data.username, data.password)
			.catch(function(e) {
			console.log(e);
			// show validation

			// webix.html.removeCss(ui.$view, "invalid_login");
			// form.elements.pass.focus();
			// webix.delay(function(){
			// 	webix.html.addCss(ui.$view, "invalid_login");
			// });
		});

	}

	clearForm() {
		const form = this.$$form();

		form.clear();
		form.clearValidation();
	}

	init() {
		this.window = this.ui(RegisterWindowView);

		this.on(this.app, "app:user:login", (res) => {
			console.log("token - ", res.token);

			if (this.rememberCredits) localStorage.setItem("token", res.token);

			this.window.hideWindow();
		});
	}
}
