import rolesData from "../data/rolesData";

export default function User(app, _view, config) {
	config = config || {};

	const login = config.login || "/login";
	const logout = config.logout || "/logout";
	const afterLogout = config.afterLogout || "/login";
	const ping = config.ping || 5 * 60 * 1000;
	const model = config.model;
	let user = config.user;

	const service = {
		getUser() {
			return user;
		},

		getStatus(server) {
			if (!server) {
				return user !== null;
			}

			return model.status().catch(() => null).then((data) => {
				user = data;
			});
		},
		login(name, pass, isRemember) {
			return model.login(name, pass, isRemember).then((data) => {
				user = data;
				if (!data) {
					throw new Error("Access denied");
				}

				app.callEvent("app:user:login", [user]);

				switch (user.roleId) {
					// case 1:
					// 	app.show(rolesData["1"]);
					// 	break;
					// case 2:
					// 	app.show(rolesData["3"]);
					// 	break;
					default:
						app.show(rolesData["2"]);
						break;
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
		}
	};

	function canNavigate(url, obj) {
		if (url === logout) {
			service.logout();
			obj.redirect = afterLogout;
		}
		else if (url !== login && !service.getStatus(true)) {
			obj.redirect = login;
		}
	}

	app.setService("user", service);

	app.attachEvent("app:guard", (url, _$root, obj) => {
		if (config.public && config.public(url)) {
			return true;
		}

		if (typeof user === "undefined") {
			obj.confirm = service.getStatus(true).then(() => canNavigate(url, obj));
		}

		return canNavigate(url, obj);
	});

	if (ping) {
		setInterval(() => service.getStatus(true), ping);
	}
}
