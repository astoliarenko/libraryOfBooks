import { IJetApp } from "webix-jet";
import rolesData from "../data/rolesData";

interface UserConfig {
	login: string,
	logout: string,
	afterLogout?: string,
	ping?: number,
	model: any,
	user?: any,
	public?: any
}

export default function User(
	app: IJetApp,
	view: any,
	config: UserConfig
): void {
	const login = config.login;
	const logout = config.logout;
	const afterLogout = config.afterLogout;
	const ping = config.ping || 5 * 60 * 1000;
	const model = config.model;
	let user = config.user;

	// type BooleanOrPromise<T extends true | false | undefined> = T extends true
	// 	? Promise<void>
	// 	: boolean;
	const loginUser = (data) => {
		user = data.userInfo;

		app.callEvent("app:user:login", [user]);

		switch (user.roleId) { /* TODO: uncomment code */
		// case 1:
		// 	app.show(rolesData["1"]);
		// 	break;
		// case 2:
		// 	app.show(rolesData["3"]);
		// 	break;
		default:
			app.show(rolesData["2"]); /* 2 - reader for test*/
			break;
		}
	};

	const service = {
		getUser() {
			return user;
		},
		// getStatus <T extends true | false>(server?: T): BooleanOrPromise<T> {
		getStatus(server?: boolean): any {
			if (!server) {
				return user !== null;
			}

			return model.status().catch(() => null).then((data) => {
				user = data;
			});
		},
		login(name, pass, isRemember): Promise<void> {
			return model.login(name, pass, isRemember).then((data) => {
				if (data.success) {
					loginUser(data);
				}
				else {
					webix.message({type: "error", text: data.message});
					return data.field;
				}
				if (!data) {
					throw new Error("Access denied");
				}
			});
		},
		cookieLogin() {
			return model.cookieLogin().then((data) => {
				if (data.success) {
					loginUser(data);
				}
				else {
					webix.message({type: "error", text: data.message});
				}
				if (!data) {
					throw new Error("Access denied");
				}
			});
		},
		logout() {
			user = null;
			// return model.logout().then((res) => {
			// 	app.callEvent("app:user:logout", []);

			// 	document.cookie = "access_token=; max-age: -1";

			// 	return res;
			// });
			app.callEvent("app:user:logout", []);

			document.cookie = "access_token=; max-age: -1";

			app.show(afterLogout);
		}
	};

	function canNavigate(url, obj): void {
		if (url === logout) {
			service.logout();
			obj.redirect = afterLogout;
		}
		else if (url !== login && !service.getStatus()) {
			obj.redirect = login;
		}
	}

	app.setService("user", service);

	app.attachEvent("app:guard", (url, _$root, obj) => {
		if (config.public && config.public(url)) {
			return true;
		}

		// debugger;

		if (typeof user === "undefined") {
			obj.confirm = service.getStatus(true).then(() => canNavigate(url, obj));
		}

		return canNavigate(url, obj);
	});

	if (ping) {
		setInterval(() => service.getStatus(true), ping);
	}
}
