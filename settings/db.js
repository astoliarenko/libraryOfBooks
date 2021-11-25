const mysql = require("mysql");

const connection = mysql.createConnection({
	// host: "127.0.0.1",
	host: "localhost",
	// localhost = 127.0.0.1
	port: 3306,
	// port: "",
	user: "root",
	password: "",
	database: "booksdb"
});

connection.connect((err) => {
	// eslint-disable-next-line no-console
	if (err) return console.log("Ошибка подключения к БД!", err);
	// eslint-disable-next-line no-console
	return console.log("Подключение успешно!");
});

module.exports = connection;
