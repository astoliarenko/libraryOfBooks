module.exports = {
	DB: {
		USERS: {
			NAME: "users",
			FIELDS: {
				ROLE_ID: "role_id",
				PASSWORD: "password",
				LOGIN: "login",
				USER_ID: "user_id"
			},
			ROLES: {
				READER: 3,
				LIBRARIAN: 2,
				ADMIN: 1,
			},
		},
		BOOKS: {
			NAME: "books",
		},
		USERS_INFO: {
			NAME: "users_info",
			FIELDS: {
				FIRST_NAME: "first_name",
				LAST_NAME: "last_name"
			}
		}
	},
	TOKEN_NAMES: {
		ACCESS_TOKEN: "access_token"
	}
};
