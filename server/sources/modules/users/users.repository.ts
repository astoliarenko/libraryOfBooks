import constants from "../../constants";
import promisePool from "../../settings/db";

import { userInfo } from "../interfaces/user";
import { ResultSetHeader } from "mysql2";


const DB = constants.DB;

class UsersRepository {
	async getUserInfoById(userId: number): Promise<[userInfo[] | [], any[]]> {
		return promisePool.query(`
			SELECT *
			FROM ${DB.USERS_INFO.NAME}
			WHERE ${DB.USERS.COLUMNS.USER_ID} = '${userId}'
		`);
	}

	async updateUserInfo(userInfo, userId: number): Promise<[ResultSetHeader, any]> {
		const keys = Object.keys(userInfo);

		let setValues = '';

		keys.forEach(key => {
			setValues += `${key} = '${userInfo[key]}',`
		});

		setValues = setValues.substring(0, setValues.length - 1);

		return promisePool.query(`
			UPDATE ${DB.USERS_INFO.NAME}
			SET ${setValues}
			WHERE ${DB.USERS_INFO.NAME}.${DB.USERS_INFO.COLUMNS.USER_ID} = ${userId}
		`);
	}
}

export default new UsersRepository();
