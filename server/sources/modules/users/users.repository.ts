import { scryptHash, key } from "../../crypto/cryptoMy";
import response from "../../response";
import promisePool from "../../settings/db";

exports.users = (req, res) => {
	// eslint-disable-next-line no-unused-vars
	promisePool.query("SELECT * FROM `users`", (err, rows, fields) => {
		// eslint-disable-next-line no-console
		if (err) console.log(err);
		else response(rows, res);
	});
};

exports.addNewUser = async (req, res) => {
	// req.query.password захэшировать
	try {
		const hash = await scryptHash(req.query.password, key);
		const sql = `INSERT INTO \`users\`(\`login\`, \`password\`, \`role_id\`) VALUES('${req.query.login}', '${hash}', '${req.query.role_id}')`;
		promisePool.query(sql, (err, results) => {
			// eslint-disable-next-line no-console
			if (err) console.log("ошибка", err);
			else response(results, res);
		});
	}
	catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
	}
};