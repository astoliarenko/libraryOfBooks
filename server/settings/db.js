const mysql = require("mysql");

const connection = mysql.createConnection({
	// host: "127.0.0.1",
	host: "localhost",
	// localhost - default, можно не указывать
	// localhost = 127.0.0.1
	port: 3306,
	//3306 - default, можно не указывать
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

// const query = (sqlQuery) => {
// 	return new Promise((resolve, reject) => {
// 		db.query(sqlQuery, (err, result, fields) => {
// 			if(err){
// 				reject(err);	
// 			}
// 			resolve({result, fields});
// 		});
// 	});
// }

module.exports = connection;
// module.exports = {
// 	query
// }
