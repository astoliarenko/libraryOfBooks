import { JetApp, EmptyRouter, HashRouter, plugins  } from "webix-jet";
import "./styles/app.css";
import session from "./models/session";

export default class MyApp extends JetApp {
	constructor(config) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: !PRODUCTION,
			start: "/authorization",
		};

		super({ ...defaults, ...config });

		this.use( plugins.User, { model : session, login: "/authorization" });
	}
}

if (!BUILD_AS_MODULE) {
	webix.ready(() => {
		new MyApp().render()
		// webix.debug({events: true});
	});
}
