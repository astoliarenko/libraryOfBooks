import { JetView } from "webix-jet";
import dataServiceNames from "../../constants/dataServiceNames";

export default class BaseView extends JetView {
	constructor(app, name, config = {}) {
		// @ts-ignore
		super(app, name, config);
	}

	_getCommonService() {
		return this["app"].getService(dataServiceNames.TRANSLATE_SERVICE);
	}
}
