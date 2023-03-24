import {JetApp, EmptyRouter, HashRouter} from "webix-jet";

import User from "./customPlugins/User";
import "./styles/app.css";
import "./styles/datatable.scss";
import "./styles/common.scss";
import fetchApiService from "models/fetchApiService";
import { events } from "./helpers/constants/commonConst";
import AuthModel from "models/authModel";
import BooksModel from "models/books";
import { IJetApp } from "webix-jet";

export default class MyApp extends JetApp {
	constructor(config = {}) {
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
				login: "/authorization",
				logout: "/logout", /* TODO: change logic */
				afterLogout: "/authorization"
			}
		);
	}
}

if (!BUILD_AS_MODULE) {
	// const token = localStorage.getItem("token"); or cookie
	// validate token (and handle response)
	const app = new MyApp();

	const setAppSettings = (app) => {
		app.use(fetchApiService, {});
		// app.attachEvent(events.app.appGuard, (url, point, nav) => {
		// 	console.log('guard url', nav);
		// });

		const setAppInstanceForModels = (app: IJetApp) => {
			const models = [
				AuthModel,
				BooksModel
			];
			models.forEach((model) => {
				model.getInstance().setAppInstance(app);
			});
		};

		setAppInstanceForModels(app);
	}

	webix.ready(() => {
		setAppSettings(app);
		app.render();
		// @ts-ignore
		// webix.debug({events: true});
	});
}
