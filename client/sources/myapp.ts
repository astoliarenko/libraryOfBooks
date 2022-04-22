import {JetApp, EmptyRouter, HashRouter} from "webix-jet";

import User from "./customPlugins/User";
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
			views: {
				orderBook: "reader.orderBook",
				cancelOrder: "reader.cancelOrder",
				profile: "reader.profile"
			}
		};

		super({...defaults, ...config});

		this.use(
			User,
			{
				model: session,
				login: "/authorization",
				afterLogin: "/authorization"
			}
		);
	}
}

if (!BUILD_AS_MODULE) {
	// const token = localStorage.getItem("token"); or cookie
	// validate token (and handle response)

	webix.ready(() => {
		// @ts-ignore
		new MyApp().render();
		// webix.debug({events: true});
	});
}
