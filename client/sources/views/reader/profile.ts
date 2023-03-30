import {JetView} from "webix-jet";

import { wrapInScrollView, getDate } from "../../helpers/usefulFunctions";
import { formInputNames } from "../../helpers/constants/commonConst";
import ProgressBar from "../../helpers/progressBar";
import UsersModel from "../../models/users";
import ProfileForm from "../../components/profileForm";

const formNames = formInputNames.userInfo;
const formLayoutId = 'formLayout';

export default class ProfileView extends JetView {
	private progressBar: ProgressBar;

	private phoneNumbers: string[];

	private formView: webix.ui.form;

	private form: ProfileForm;

	private unmodifiedFormValues: webix.obj;

	config() {
		const labelWidth = 120;
		const formWidth = 400;

		const applyChangesBtn = {
			view: "button",
			label: "Apply",
			type: "icon",
			css: "webix_primary",
			icon: "wxi-check",
			height: 50,
			width: 100,
			click: () => {
				webix.confirm("Apply changes?")
					.then(() => {
						this.applyChanges();
					})
					// @ts-ignore
					.fail(() => {});
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
						this.cancelChanges();
					})
					// @ts-ignore
					.fail(() => {
					});
			}
		};

		this.form = new ProfileForm(
			this.app,
			{},
			"update",
			{},
			{labelWidth},
			{}
		);

		const ui = {
			type: "clean",
			rows: [
				wrapInScrollView('xy', {
					rows: [
						{
							localId: formLayoutId,
							cols: [
								this.form, {}
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

	private get $$form(): webix.ui.form {
		return this.form.$$form;
	}

	private get $$formLayout() {
		return this.$$(formLayoutId) as unknown as webix.ui.layout;
	}

	init() {
		this.progressBar = new ProgressBar(this.$$formLayout);
	}

	async ready() {
		this.progressBar.showProgress();

		const model = UsersModel.getInstance();
		const res = await model.getUserinfo();

		if (res.success && res.data) {
			const dataCopy = webix.copy(res.data);
			if (dataCopy.birthday) {
				dataCopy.birthday = new Date(dataCopy.birthday);
			}

			this.phoneNumbers = this.getPhooneNumbersArray(dataCopy);

			this.unmodifiedFormValues = dataCopy;

			this.$$form.setValues(dataCopy);
		}
		this.progressBar.hideProgress();
	}

	private getPhooneNumbersArray(data: {[key: string]: any}): string[] {
		const keys = Object.keys(data);
		const phonesArr = [];

		keys.forEach(key => {
			if (key.indexOf('phone') !== -1 && data[key]) {
				phonesArr.push(data[key]);
			}
		});

		return phonesArr;
	}

	private async applyChanges() {
		this.progressBar.showProgress();

		const form = this.$$form;

		if (form.isDirty() && form.validate()) {
			const values = form.getDirtyValues();
			if (values[formNames.birthDate]) {
				values[formNames.birthDate] = getDate(values[formNames.birthDate]);
			}

			const model = UsersModel.getInstance();
			const res = await model.updateUserinfo(values);

			if (res.success) {
				form.setDirty(false);
				this.unmodifiedFormValues = form.getValues();
			}
		}

		this.progressBar.hideProgress();
	}

	private cancelChanges() {
		const form = this.$$form;
		form.clearValidation();
		form.setValues(this.unmodifiedFormValues, true);
		form.setDirty(false);
	}
}
