import {JetView} from "webix-jet";

import constants from "../constants";
import rolesData from "../data/rolesData";
import RegisterWindowView from "./authorization/registerWindow";
import { getCookieItem } from "../helpers/storages/localAndSessionStorage";
import AuthModel from "../models/authModel";

export default class AutorizationView extends JetView {
	isRememberCredits: boolean;
	registrationWindow: any;

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
			click: () => this.registrationWindow.showWindow()
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
				{cols: [{}, btnRegisterNewUser, {}]}
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
					rows: [form, {}]
				},
				{}
			]
		};

		return ui;
	}

	$$form(): webix.ui.form {
		return this.$$(constants.AUTHORIZATION_VIEW.VIEW_IDS.FORM_ID) as unknown as webix.ui.form;
	}

	async authorizeUser() {
		const form = this.$$form();

		const user = this.app.getService("user");

		if (!form.validate()) return;

		const formValues = form.getValues();

		this.isRememberCredits = formValues.State;

		const data = {
			username: formValues.login,
			password: formValues.password
		};

		const authModel = AuthModel.getInstance();

		// authModel.loginUser();

		user.login(data.username, data.password, this.isRememberCredits)
			.then(field => {
				if (field) {
					const form = this.$$form();

					if (field === 'login') {
						form.markInvalid(field, 'Wrong username');
					}
					else if (field === 'password') {
						form.markInvalid(field, 'Wrong password');
					}
				}
			})
			.catch((e) => {
				// eslint-disable-next-line no-console
				console.log(e);
			});
	}

	clearForm() {
		const form = this.$$form();
 
		form.clear();
		form.clearValidation();
	}

	init() {
		this.registrationWindow = this.ui(RegisterWindowView);

		if (getCookieItem(constants.COOKIE_NAMES.accsessToken)) {
			const user = this.app.getService("user");

			user.cookieLogin().catch((e) => {
				// eslint-disable-next-line no-console
				console.log(e);
			});
		}
	}
}
