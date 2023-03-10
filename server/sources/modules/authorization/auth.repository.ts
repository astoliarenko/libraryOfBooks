import constants from "../../constants";
import promisePool from "../../settings/db";
const DB = constants.DB;
interface userInfo {
	id_user: number,
	login: string,
	password: string,
	id_role: number
}

class AuthorizationRepository {
	async getUserByLogin(login: string): Promise<[userInfo[] | [], any[]]> {
		return promisePool.query(`
			SELECT *
			FROM \`${DB.USERS.NAME}\`
			WHERE \`${DB.USERS.COLUMNS.LOGIN}\` = '${login}'
		`);
	}

	async getUserById(userId: string): Promise<[userInfo[] | [], any[]]> {
		return promisePool.query(`
			SELECT *
			FROM \`${DB.USERS_INFO.NAME}\`
			WHERE \`${DB.USERS.COLUMNS.USER_ID}\` = '${userId}'
		`);
	}

	async addNewUser(userData: {username: string, password: string, role: number}): Promise<any> {
		return promisePool.query(`
			INSERT INTO \`${DB.USERS.NAME}\`
			(\`${DB.USERS.COLUMNS.LOGIN}\`, \`${DB.USERS.COLUMNS.PASSWORD}\`, \`${DB.USERS.COLUMNS.ROLE_ID}\`)
			VALUES('${userData.username}', '${userData.password}', '${userData.role}')
		`);
	}
}

export default new AuthorizationRepository();