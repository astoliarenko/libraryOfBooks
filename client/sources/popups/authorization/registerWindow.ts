import {JetView} from "webix-jet";

import constants from "../../constants";
import { formInputs, formInputNames } from "../../helpers/constants/commonConst";
import { wrapInScrollView, getDate } from "../../helpers/usefulFunctions";
import AuthModel from "../../models/authModel";
import ProgressBar from "../../helpers/progressBar";
import ProfileForm from "../..//components/profileForm";

const formNames = formInputNames.userInfo;
const phoneNumberLength = formInputs.phoneNumberLength;

export default class RegisterWindowView extends JetView {
	private progressBar: ProgressBar;

	private form: ProfileForm;

	config() {
		const btnWidth = 150;
		const labelWidth = 160;
		const windowWidth = 400;

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

		this.form = new ProfileForm(
			this.app,
			{},
			"registration",
			{},
			{labelWidth},
			{
				[formNames.phone1]: (value: string) => {
					debugger;
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
			}
		);

		const ui = {
			localId: constants.AUTHORIZATION_VIEW.REGISTER.REGISTER_WINDOW_ID,
			view: "window",
			modal: true,
			width: windowWidth,
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
						...wrapInScrollView('y', this.form), minHeight: 400
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

	// ready() {
	// 	const myForm = this.$$form;
	// 	debugger;
	// }

	get $$form(): webix.ui.form {
		return this.form.$$form;
	}

	// eslint-disable-next-line consistent-return
	async registerNewUser() {
		this.progressBar.showProgress();
		// eslint-disable-next-line no-console
		console.log("register new user");

		const authModel = AuthModel.getInstance();

		const form = this.$$form;

		if (form.validate()) {
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
		this.windowView.hide();
	}

	private clearForm() {
		const form = this.$$form;

		form.clear();
		form.clearValidation();
	}

	private get windowView() {
		return this.getRoot() as unknown as webix.ui.window;
	}

	showWindow() {
		// @ts-ignore
		this.windowView.show();
	}
}
