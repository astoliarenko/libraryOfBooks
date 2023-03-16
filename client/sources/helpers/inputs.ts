const generatePhonenumberTextInputConfig = (label: string, name: string, labelWidth?: number) => {
	return {
		view: "text",
		label,
		name,
		labelWidth: labelWidth ? labelWidth : 200,
		pattern: {mask:"+### (##) ###-##-##", allow:/[0-9]/g}
	} as webix.ui.textConfig;
};

export default generatePhonenumberTextInputConfig;