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
			COLUMNS: {
				ID: "id_book",
				ID_AUTHOR: "id_author"
			}
		},
		BOOKS_GENRE: {
			NAME: "books_genre",
			COLUMNS: {
				ID_GENRE: "id_genre"
			}
		},
		GENRES: {
			NAME: "genres"
		},
		USERS_INFO: {
			NAME: "users_info",
			COLUMNS: {
				TITLE: "book_title",
				FIRST_NAME: "first_name",
				LAST_NAME: "last_name"
			}
		},
		AUTHORS: {
			NAME: "authors",
			COLUMNS: {
				ID: "id_author",
				FIRST_NAME: "first_name",
				LAST_NAME: "last_name"
			}
		}
	},
	TOKEN_NAMES: {
		ACCESS_TOKEN: "access_token"
	}
};
