module.exports = {
	DB: {
		USERS: {
			NAME: "users",
			COLUMNS: {
				ROLE_ID: "id_role",
				PASSWORD: "password",
				LOGIN: "login",
				USER_ID: "id_user"
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
			COLUMNS: {
				FIRST_NAME: "first_name",
				LAST_NAME: "last_name"
			}
		}
	},
	TOKEN_NAMES: {
		ACCESS_TOKEN: "access_token"
	}
};
