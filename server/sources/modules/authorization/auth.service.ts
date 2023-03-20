import constants from "../../constants";
import { scryptHash, key } from "../../crypto/cryptoMy";
import authRepository from "./auth.repository";
import config from "../../config";
const jwt = require("jsonwebtoken");

const DB = constants.DB;

interface userInfo {
	login: string,
	password: string,
	first_name: string,
	last_name: string,
	third_name?: string,
	birthday?: string,
	adress?: string,
	passport_number: number,
	phoneNumbers: string[]
}

class authService {
	async registerUser(userData: userInfo) {
		const {phoneNumbers, ...userDataCopy} = userData;
		const user = (await authRepository.getUserByLogin(userData.login))[0][0];

		if (user) {
			return {
				message: "User with the same login already exists",
				status: 400,
				field: 'login',
				success: false
			};
		}

		const users = (await authRepository.getAllUsers())[0];

		if (users.length) {
			const userIsUnique = !users.some((userInfo: any) => {
				return userInfo.passport_number === userData.passport_number;
			});

			if (!userIsUnique) {
				return {
					message: "User with the same passport already registered",
					status: 400,
					field: 'passport',
					success: false
				};
			}
		}

		const hashPassword = await scryptHash(userData.password, key);
		const defRole = DB.USERS.ROLES.READER;

		const phones = {};

		phoneNumbers.forEach((number, index) => {
			phones[`phone_${index + 1}`] = number;
		});

		const newUser = await authRepository.addNewUser({
			...userDataCopy,
			password: hashPassword,
			id_role: defRole,
			...phones
		});

		if (newUser) {
			return {
				message: "User is registered successfully",
				status: 201,
				success: true,
				userInfo: {
					userName: `${newUser[0][0].first_name} ${newUser[0][0].last_name}`,
					roleId: defRole,
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

	async login(credentials: {username: string, password: string}) {
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

	async cookieLogin(token: string) {
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