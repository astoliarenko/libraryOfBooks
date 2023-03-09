const { DB } = require("../../constants");
const db = require("../../settings/db");

class AuthorizationRepository {
	async getUserByLogin(login) {
		return db.query(`
			SELECT *
			FROM \`${DB.USERS.NAME}\`
			WHERE \`${DB.USERS.COLUMNS.LOGIN}\` = '${login}'
		`);
	}

	async getUserById(userId) {
		return db.query(`
			SELECT *
			FROM \`${DB.USERS_INFO.NAME}\`
			WHERE \`${DB.USERS.COLUMNS.USER_ID}\` = '${userId}'
		`);
	}

	async addNewUser(userData) {
		return db.query(`
			INSERT INTO \`${DB.USERS.NAME}\`
			(\`${DB.USERS.COLUMNS.LOGIN}\`, \`${DB.USERS.COLUMNS.PASSWORD}\`, \`${DB.USERS.COLUMNS.ROLE_ID}\`)
			VALUES('${userData.username}', '${userData.password}', '${userData.role}')
		`);
	}
}

module.exports = new AuthorizationRepository();