module.exports = {
	DB: {
		USERS: {
			NAME: "users",
			FIELDS: {
				ROLE_ID: "role_id",
				PASSWORD: "password",
				LOGIN: "login",
			},
			ROLES: {
				READER: 3,
				LIBRARIAN: 2,
				ADMIN: 1,
			},
		},
		BOOKS: {
			NAME: "books",
		}
	},
	TOKEN_NAMES: {
		ACCESS_TOKEN: "access_token"
	}
};
