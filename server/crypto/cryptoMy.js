const crypto = require("crypto");
const fs = require("fs");
const util = require("util");
// const { createQuery } = require("./settings/db");
// const stringForEncr = "Привет МЕННН, как дела?";

const cipherData = fs.readFileSync(`${__dirname}/key.json`);
const {key, algorithm} = JSON.parse(cipherData);

// function encrypt(str) {
// 	const iv = crypto.randomBytes(8).toString("hex");
// 	const cipher = crypto.createCipheriv(algorithm, key, iv);

// 	let encrypted = cipher.update(str, "utf8", "hex");
// 	// 2ой пар - входные данные, третий - формат результата
// 	encrypted += cipher.final("hex");

// 	return `${encrypted}:${iv}`;
// }

// function decrypt(str) {
// 	const [encryptedStr, iv] = str.split(":");
// 	const decipher = crypto.createDecipheriv(algorithm, key, iv);

// 	let decrypted = decipher.update(encryptedStr, "hex", "utf8");
// 	decrypted += decipher.final("utf8");
// 	return decrypted;
// }

// const a = encrypt(stringForEncr);
// console.log(a);
// console.log(decrypt(a));

const strForHash = "12alex12";
let myHash;
// const hash = crypto.createHash("sha512").update(strForHash).digest("hex");

async function scryptHash(str, salt) {
	const saltInUse = salt || crypto.randomBytes(16).toString("hex");

	const hashBuffer = await util.promisify(crypto.scrypt)(str, saltInUse, 32);

	// return `${hashBuffer.toString("hex")}:${saltInUse}`;
	return `${hashBuffer.toString("hex")}`;
	// превращает функцию исп колбеки в функ на промисах
}


// scryptHash(strForHash, key)
// 	.then((hash) => {
// 		console.log("myHash=", hash);
// 	});
// console.log("myHash=", myHash);

async function scryptVerify(testString, hashAndSalt) {
	const [, salt] = hashAndSalt.split(":");
	return await scryptHash(testString, salt) === hashAndSalt;
}

// scryptVerify(strForHash, "cd68bc8683dce139222f4645f15f9ff5d512318c66c5f1797f2ba00581642a2f:ef0b288e086dcb995976370829755d36")
// 	.then(isValid => console.log("is valid& - ", isValid));

module.exports = {scryptHash, key, scryptVerify};
