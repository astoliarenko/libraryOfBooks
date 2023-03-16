import constants from "../../constants";
import { scryptHash, key } from "../../crypto/cryptoMy";
import authRepository from "./auth.repository";
import config from "../../config";
const jwt = require("jsonwebtoken");

const DB = constants.DB;

class authService {
	async registerUser(userData) {
		const user = (await authRepository.getUserByLogin(userData.login))[0];

		if (!user) {
			return {
				message: "User with the same name already exists",
				status: 400,
				success: false
			};
		}

		const hashPassword = await scryptHash(userData.password, key);
		const defRole = DB.USERS.ROLES.READER;

		const newUser = await authRepository.addNewUser({
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
		const userCredentials = (await authRepository.getUserByLogin(credentials.username))[0][0];

		if (!userCredentials) {
			return {
				message: `User ${credentials.username} not found`,
				status: 404,
				success: false,
				field: 'login'
			};
		}

		const hashPassword = await scryptHash(credentials.password, key);

		if (hashPassword !== userCredentials.password) {
			return {
				message: "Wrong password",
				status: 400,
				success: false,
				field: 'password'
			};
		}

		const userInfo = (await authRepository.getUserById(userCredentials.id_user))[0][0];

		if (userInfo) {
			return {
				message: "Successfull login",
				status: 200,
				success: true,
				userInfo: {
					userName: `${userInfo.first_name || "Alex"} ${userInfo.last_name || "Malex"}`,
					roleId: userCredentials.id_role,
					userId: userCredentials.id_user
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

	async cookieLogin(token) {
		const info = jwt.verify(token, config.SECRET);
		const res: {success: boolean, userInfo?: any, message?: string} = {success: false};

		if (info) {
			const userCredentials = (await authRepository.getUserById(info.id))[0][0];

			if (userCredentials) {
				res.userInfo = {
					roleId: info.role,
					userName: `${userCredentials.first_name} ${userCredentials.last_name}`
				}
				res.success = true;
			}
			else {
				res.message = 'User is not exist';
			}

		}
		else {
			res.message = 'not valid token';
		}

		return res;
	}
}

export default new authService();