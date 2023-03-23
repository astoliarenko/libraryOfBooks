import { formInputs } from "./constants/commonConst";

const generatePhonenumberTextInputConfig = (label: string, name: string, labelWidth: number, additional?: webix.ui.textConfig) => {
	let config = {
		view: "text",
		label,
		name,
		labelWidth: labelWidth,
		pattern: {mask:"+### (##) ###-##-##", allow:/[0-9]/g},
		validate: (value) => {
			return value.length === formInputs.phoneNumberLength || value.length === 0;
		},
		...additional
	} as webix.ui.textConfig;

	if (additional) {
		config = {
			...config,
			...additional
		}
	}

	return config;
};

export default generatePhonenumberTextInputConfig;