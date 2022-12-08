// const usersController = require("../modules/users/users.repository");
const authController = require("../modules/authorization/authorization.controller");
const booksController = require("../modules/books/books.controller");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const { DB } = require("../constants");
const roles = DB.USERS.ROLES;

module.exports = (app) => {
	// Метод app.route() позволяет создавать обработчики маршрутов, образующие цепочки,
	// для пути маршрута. Поскольку путь указан в одном расположении, удобно создавать
	// модульные маршруты, чтобы минимизировать избыточность и количество опечаток

	app.route("/auth/user").post(authController.getUserFromToken);
	app.route("/auth/users").get(
		roleMiddleware([roles.ADMIN, roles.LIBRARIAN]),
		authController.getUsers
	);
	app.route("/auth/registration").post(authController.registration);
	app.route("/auth/login").post(authController.login);
	app.route("/books").get(
		// admin is for test, he will be removed in feature
		roleMiddleware([roles.READER, roles.LIBRARIAN, roles.ADMIN]),
		booksController.getBooks
	);
	app.route("/auth/status").get((req, res) => {
		res.send(true);
	});
};
