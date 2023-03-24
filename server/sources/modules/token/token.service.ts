import jwt from "jsonwebtoken";
import config from "../../config";
import { JwtPayload } from "jsonwebtoken";

interface myJwtPayload extends JwtPayload {
	id: number,
	role: number
}

export default class TokenService {
	static generateAccessToken(id: number, role: number) {
		const payload = {
			id,
			role, /* 1 role */
		};
		return jwt.sign(payload, config.SECRET, { expiresIn: "24h" });
		// {expiresIn: "24h"} - столько будет "жить" токен
	}

	static getInfoFromToken(token: string) {
		try {
			const tokenInfo = jwt.verify(token, config.SECRET) as myJwtPayload;
			return tokenInfo;
		}
		catch(e) {
			console.log('tokenError', e);
			throw(e);
		}
	}
}