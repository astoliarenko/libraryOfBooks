import MainPage from "./mainPage";

import UsersModel from "../models/users";
import pageViewNames from "../helpers/constants/pageViewNames";

// авторизуется,
// добавляет пользователей,
// редактирует их профили (параметры профилей),
// назначает библиотекарей,
// меняет роли пользователям
export default class Admin extends MainPage {
	constructor(app) {
		super(
			app,
			{
				listMenu: {
					data: pageViewNames.admin.views,
					folderName: "admin"
				}
			},
			{}
		)
	}

	init() {
		this.loadUsers();
	}

	async loadUsers() {
		const usersModel = UsersModel.getInstance();
		const res = await usersModel.getUserinfo();
		if (res.success) {
			console.log('data', res.data);
		}
		else {
			console.log('ERROR');
		}
	}

	ready() {
		this.openDefaultPage();

		const user = this.app.getService("user");
		const userName = user.getUser()?.userName;

		if (userName) {
			this.setHeaderValue(`Hello admin ${userName}!`);
		}
	}
}