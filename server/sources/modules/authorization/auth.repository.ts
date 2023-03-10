import constants from "../../constants";
import promisePool from "../../settings/db";
const DB = constants.DB;

class AuthorizationRepository {
	async getUserByLogin(login) {
		return promisePool.query(`
			SELECT *
			FROM \`${DB.USERS.NAME}\`
			WHERE \`${DB.USERS.COLUMNS.LOGIN}\` = '${login}'
		`);
	}

	async getUserById(userId) {
		return promisePool.query(`
			SELECT *
			FROM \`${DB.USERS_INFO.NAME}\`
			WHERE \`${DB.USERS.COLUMNS.USER_ID}\` = '${userId}'
		`);
	}

	async addNewUser(userData) {
		return promisePool.query(`
			INSERT INTO \`${DB.USERS.NAME}\`
			(\`${DB.USERS.COLUMNS.LOGIN}\`, \`${DB.USERS.COLUMNS.PASSWORD}\`, \`${DB.USERS.COLUMNS.ROLE_ID}\`)
			VALUES('${userData.username}', '${userData.password}', '${userData.role}')
		`);
	}
}

export default new AuthorizationRepository();