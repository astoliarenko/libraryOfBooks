const { DB } = require("../../constants");
const db = require("../../settings/db");
const util = require("util");
const promisifyDbQuery = util.promisify(db.query.bind(db));

class AuthorizationRepository {
	async getUserByLogin(login) {
		return promisifyDbQuery(`
			SELECT *
			FROM \`${DB.USERS.NAME}\`
			WHERE \`${DB.USERS.COLUMNS.LOGIN}\` = '${login}'
		`);
	}

	async getUserById(userId) {
		return promisifyDbQuery(`
			SELECT *
			FROM \`${DB.USERS_INFO.NAME}\`
			WHERE \`${DB.USERS.COLUMNS.USER_ID}\` = '${userId}'
		`);
	}

	async addNewUser(userData) {
		return promisifyDbQuery(`
			INSERT INTO \`${DB.USERS.NAME}\`
			(\`${DB.USERS.COLUMNS.LOGIN}\`, \`${DB.USERS.COLUMNS.PASSWORD}\`, \`${DB.USERS.COLUMNS.ROLE_ID}\`)
			VALUES('${userData.username}', '${userData.password}', '${userData.role}')
		`);
	}
}

module.exports = new AuthorizationRepository();