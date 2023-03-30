import {JetApp, EmptyRouter, HashRouter} from "webix-jet";

import User from "./customPlugins/User";
import "./styles/app.css";
import "./styles/datatable.scss";
import "./styles/common.scss";
import fetchApiService from "models/fetchApiService";
import AuthModel from "models/authModel";
import BooksModel from "models/books";
import UsersModel from "models/users";
import { IJetApp } from "webix-jet";
import pageViewNames from "./helpers/constants/pageViewNames";

const adminPages = pageViewNames.admin;
const librarianPages = pageViewNames.librarian;
const readerPages = pageViewNames.reader;

export default class MyApp extends JetApp {
	constructor(config = {}) {
		const defaults = {
			id: APPNAME,
			version: VERSION,
			router: BUILD_AS_MODULE ? EmptyRouter : HashRouter,
			debug: !PRODUCTION,
			start: "/authorization",
			views: {
				[adminPages.views[0].id]: `${adminPages.name}.${adminPages.views[0].id}`,
				[adminPages.views[1].id]: `${adminPages.name}.${adminPages.views[1].id}`,
				[librarianPages.views[0].id]: `${librarianPages.name}.${librarianPages.views[0].id}`,
				[librarianPages.views[1].id]: `${librarianPages.name}.${librarianPages.views[1].id}`,
				[readerPages.views[0].id]: `${readerPages.name}.${readerPages.views[0].id}`,
				[readerPages.views[1].id]: `${readerPages.name}.${readerPages.views[1].id}`,
				[readerPages.views[2].id]: `${readerPages.name}.${readerPages.views[2].id}`,
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
				BooksModel,
				UsersModel
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
