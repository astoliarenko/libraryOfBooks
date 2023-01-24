const { DB } = require("../../constants");
const { scryptHash, key } = require("../../crypto/cryptoMy");
const constants = require("../../constants");
const repository = require("./auth.repository");

class authService {
	async registerUser(userData) {
		const user = (await repository.getUserByLogin(userData.login))[0];

		if (!user) {
			return {
				message: "User with the same name already exists",
				status: 400,
				success: false
			};
		}

		const hashPassword = await scryptHash(password, key);
		const defRole = DB.USERS.ROLES.READER;

		const newUser = await repository.addNewUser({
			username: userData.username,
			password: hashPassword,
			role: defRole
		});

		if (newUser) {
			return {
				message: "User is registered successfully",
				status: 201,
				success: true,
				userInfo: {
					username: newUser.userName,
					role: newUser.role
				}
			};
		}
		else {
			return {
				message: "Something went wrong",
				status: 500,
				success: false
			};
		}
	}

	async login(credentials) {
		const user = (await repository.getUserByLogin(credentials.username))[0];

		if (!user) {
			return {
				message: `User ${credentials.username} not found`,
				status: 404,
				success: false
			};
		}

		const hashPassword = await scryptHash(credentials.password, key);

		if (hashPassword !== user.password) {
			return {
				message: "Wrong password",
				status: 400,
				success: false
			};
		}

		const userInfo = (await repository.getUserById(user[DB.USERS.COLUMNS.USER_ID]))[0];

		if (userInfo) {
			const firstName = constants.DB.USERS_INFO.COLUMNS.FIRST_NAME;
			const lastName = constants.DB.USERS_INFO.COLUMNS.LAST_NAME;
			const roleId = constants.DB.USERS.COLUMNS.ROLE_ID;

			return {
				message: "Successfull login",
				status: 200,
				success: true,
				userInfo: {
					userName: `${userInfo[firstName] || "Alex"} ${userInfo[lastName] || "Malex"}`,
					roleId: user[roleId]
				}
			};
		}
		else {
			return {
				message: "Something went wrong",
				status: 500,
				success: false
			};
		}
	}
}

module.exports = new authService();