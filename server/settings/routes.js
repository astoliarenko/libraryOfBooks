const usersController = require("../modules/users/users.repository");
const authController = require("../modules/authorization/authorization.controller");
const booksController = require("../modules/books/books.controller");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

module.exports = (app) => {
	// eslint-disable-next-line global-require
	// const indexController = require("../controller/indexController");
	// eslint-disable-next-line global-require

	// Метод app.route() позволяет создавать обработчики маршрутов, образующие цепочки,
	// для пути маршрута. Поскольку путь указан в одном расположении, удобно создавать
	// модульные маршруты, чтобы минимизировать избыточность и количество опечаток

	// app.route("/").get(indexController.index);

	// app.route("/users").get(usersController.users);
	// app.route("/users/add").post(usersController.addNewUser);

	app.route("/auth/users").get(roleMiddleware(["1", "2"]), authController.getUsers);
	// app.route("/auth/users").get(authController.getUsers);
	app.route("/auth/registration").post(authController.registration);
	app.route("/auth/login").post(authController.login);

	app.route("/books/").get(booksController.getBooks);
};
