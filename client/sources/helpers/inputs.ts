import { formInputs } from "./constants/commonConst";

const generatePhonenumberTextInputConfig = (label: string, name: string, additionalConfig?: webix.ui.textConfig) => {
	let config = {
		view: "text",
		label,
		name,
		pattern: {mask:"+### (##) ###-##-##", allow:/[0-9]/g},
		validate: (value) => {
			return value.length === formInputs.phoneNumberLength || value.length === 0;
		},
		...additionalConfig
	} as webix.ui.textConfig;

	if (additionalConfig) {
		config = {
			...config,
			...additionalConfig
		}
	}

	return config;
};

export default generatePhonenumberTextInputConfig;