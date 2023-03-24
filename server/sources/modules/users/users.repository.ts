import constants from "../../constants";
import promisePool from "../../settings/db";

import { userInfo } from "../interfaces/user";


const DB = constants.DB;

class UsersRepository {
	async getUserInfoById(userId: number): Promise<[userInfo[] | [], any[]]> {
		return promisePool.query(`
			SELECT *
			FROM ${DB.USERS_INFO.NAME}
			WHERE ${DB.USERS.COLUMNS.USER_ID} = '${userId}'
		`);
	}
}

export default new UsersRepository();
